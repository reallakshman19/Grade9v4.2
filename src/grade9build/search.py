"""Search compiler and release index for Grade9v4.2 demo platform.

Implements:
- Public-safe release search projection (id, revision, releaseId, route, kind, title, summary, terms, facets).
- Fault N09 answer leakage defense: zero answers, solutions, rubrics, or master keys allowed in search index.
- Fault N26 stale release shard detection: verified release IDs and cryptographic SHA-256 shard digests.
- Deterministic scoring, weighting, and tie-breaking (score descending, then ID ascending).
- Unicode NFKC case-folding normalization.
- Facet filtering: intersection across dimensions, union within dimensions.
- Partitioned sharding by subject with deterministic master manifest.
- Item withdrawal and tombstone filtering.
- Strict DEMO target mode enforcement.

No academic approval inferred from software validation.
"""
from __future__ import annotations

import copy
import hashlib
import json
import re
import unicodedata
from typing import Any, Dict, Iterable, List, Optional, Sequence, Set, Tuple

from .record_inventory import canonical_json_digest

FORBIDDEN_ANSWER_KEYS = {
    "assessment.raw_claim",
    "raw_claim",
    "answer",
    "answers",
    "solution",
    "solutions",
    "worked_steps",
    "master_key",
    "rubric",
    "reference_solution",
    "private_notes",
    "secret",
    "crux_revealed",
    "private_moves",
    "privateMoveRef",
    "private_rubric",
}

DEFAULT_BOOST_RULES = {
    "exact_id": 10.0,
    "exact_title": 8.0,
    "title_tokens": 5.0,
    "concept_aliases": 3.0,
    "summary_tokens": 1.0,
}


class SearchCompilationError(Exception):
    """Base exception for search compilation and query errors."""
    pass


class AnswerLeakageError(SearchCompilationError):
    """Raised when private solutions, answers, or rubrics leak into search metadata (Fault N09)."""
    pass


class StaleShardError(SearchCompilationError):
    """Raised when a search shard has mismatched releaseId or modified digest (Fault N26)."""
    pass


def normalize_query(text: str) -> str:
    """Normalizes text using Unicode NFKC normalization and case-folding."""
    if not text:
        return ""
    norm = unicodedata.normalize("NFKC", text).casefold()
    # Normalize multiple whitespaces while preserving symbols
    return re.sub(r"\s+", " ", norm).strip()


def tokenize(text: str) -> List[str]:
    """Tokenizes normalized text into discrete search tokens."""
    norm = normalize_query(text)
    if not norm:
        return []
    # Split on whitespace and non-alphanumeric punctuation while retaining mathematical/chemical tokens
    raw_tokens = re.split(r"[\s,;:.!?()\[\]{}\"\'=]+", norm)
    return [t for t in raw_tokens if t]


def assert_no_answer_leakage(data: Any, path: str = "") -> None:
    """Recursively validates that no private answer keys or raw claims exist in search records (N09)."""
    if isinstance(data, dict):
        for k, v in data.items():
            current_path = f"{path}.{k}" if path else k
            if k.lower() in FORBIDDEN_ANSWER_KEYS or any(fb in current_path.lower() for fb in FORBIDDEN_ANSWER_KEYS):
                raise AnswerLeakageError(
                    f"Fault N09: Prohibited answer or private field '{k}' detected at '{current_path}'"
                )
            assert_no_answer_leakage(v, current_path)
    elif isinstance(data, list):
        for idx, item in enumerate(data):
            assert_no_answer_leakage(item, f"{path}[{idx}]")


class SearchIndexCompiler:
    """Deterministic compiler producing partitioned public search projections and shard manifests."""

    def __init__(self, target_mode: str = "DEMO", boost_rules: Optional[Dict[str, float]] = None) -> None:
        if target_mode != "DEMO":
            raise SearchCompilationError(
                f"Production search compilation is strictly prohibited (target_mode: {target_mode}). Only DEMO is permitted."
            )
        self.target_mode = target_mode
        self.boost_rules = copy.deepcopy(boost_rules or DEFAULT_BOOST_RULES)

    def compile(
        self,
        release_package: Dict[str, Any],
        resources_projection: Optional[Dict[str, Any]] = None,
        reasoning_cells: Optional[List[Dict[str, Any]]] = None,
        withdrawn_ids: Optional[Set[str]] = None,
        shard_by_subject: bool = True,
    ) -> Dict[str, Any]:
        """Compiles released items into public-safe projections and a partitioned shard manifest."""
        release_id = release_package.get("release_id", "RELEASE-DEMO-01")
        withdrawn = withdrawn_ids or set()

        raw_items: List[Dict[str, Any]] = []

        # 1. Ingest release package projections (questions, concepts, lessons)
        if "projections" in release_package and "search_index" in release_package["projections"]:
            for entry in release_package["projections"]["search_index"]:
                entry_id = entry.get("id", "")
                if entry_id in withdrawn:
                    continue
                # Verify N09 leakage
                assert_no_answer_leakage(entry)
                raw_items.append(self._standardize_entry(entry, release_id))

        # 2. Ingest resource projection items (A62)
        if resources_projection and "search_index" in resources_projection:
            for entry in resources_projection["search_index"]:
                entry_id = entry.get("id", "")
                if entry_id in withdrawn:
                    continue
                assert_no_answer_leakage(entry)
                raw_items.append(self._standardize_entry(entry, release_id))

        # 3. Ingest reasoning cell items (A53)
        if reasoning_cells:
            for cell in reasoning_cells:
                cell_id = cell.get("cell_id", "")
                if cell_id in withdrawn:
                    continue
                # Reject candidate or hold from search
                if cell.get("status") in ("HOLD", "CANDIDATE"):
                    continue
                assert_no_answer_leakage(cell)

                subj = cell.get("subject_id", "PHYSICS")
                op = cell.get("operation", "APPLY")
                band = cell.get("demand_band", "D2")
                cell_entry = {
                    "id": cell_id,
                    "revision": 1,
                    "releaseId": release_id,
                    "route": f"/reasoning/{cell_id}",
                    "kind": "REASONING_CELL",
                    "subjectIds": [subj],
                    "programmeIds": ["GRADE9_STANDARD"],
                    "editionIds": ["EDITION_2026_R4"],
                    "conceptIds": [cell.get("topic_ref", {}).get("id", "")],
                    "title": f"QRT Cell {op} {band} ({cell_id})",
                    "summary": f"Reasoning cell for cognitive operation {op} at demand band {band}.",
                    "reviewed_terms": [op.lower(), band.lower(), "qrt", "reasoning", subj.lower()],
                    "public_facets": {
                        "subject": subj,
                        "kind": "REASONING_CELL",
                        "operation": op,
                        "demand_band": band,
                        "demo": True,
                    },
                }
                raw_items.append(cell_entry)

        # Sort all items deterministically by ID
        unique_items_map: Dict[str, Dict[str, Any]] = {}
        for itm in raw_items:
            assert_no_answer_leakage(itm)
            unique_items_map[itm["id"]] = itm
        sorted_items = [unique_items_map[k] for k in sorted(unique_items_map.keys())]

        # Partition into shards
        shards_manifest: List[Dict[str, Any]] = []
        shards_data: Dict[str, List[Dict[str, Any]]] = {}

        if shard_by_subject:
            for itm in sorted_items:
                subjects = itm.get("subjectIds", ["GENERAL"])
                subj_key = subjects[0] if subjects else "GENERAL"
                shard_id = f"shard-{subj_key.lower()}"
                if shard_id not in shards_data:
                    shards_data[shard_id] = []
                shards_data[shard_id].append(itm)
        else:
            shards_data["shard-all"] = sorted_items

        for shard_id in sorted(shards_data.keys()):
            items = sorted(shards_data[shard_id], key=lambda x: str(x["id"]))
            shard_payload = {
                "shard_id": shard_id,
                "release_id": release_id,
                "item_count": len(items),
                "items": items,
            }
            shard_sha = canonical_json_digest(shard_payload)
            shards_manifest.append({
                "shard_id": shard_id,
                "path": f"search/{shard_id}.json",
                "item_count": len(items),
                "sha256": shard_sha,
            })

        # Manifest
        manifest: Dict[str, Any] = {
            "schema_version": "g9-search-index/1.0",
            "release_id": release_id,
            "release_digest": release_package.get("release_digest", "0" * 64),
            "target_mode": "DEMO",
            "demo_banner": True,
            "academic_admission": "HOLD",
            "production_release": "NONE",
            "compiled_at": "2026-11-18T00:00:00Z",
            "total_items": len(sorted_items),
            "boost_rules": self.boost_rules,
            "normalization": "UNICODE_NFKC_CASEFOLD",
            "shards": shards_manifest,
        }
        manifest["manifest_digest"] = canonical_json_digest(manifest)

        return {
            "manifest": manifest,
            "shards": shards_data,
            "items": sorted_items,
        }

    def _standardize_entry(self, entry: Dict[str, Any], release_id: str) -> Dict[str, Any]:
        """Ensures consistent search schema fields on every entry."""
        subjs = entry.get("subjectIds") or ([entry["subject_id"]] if "subject_id" in entry else ["PHYSICS"])
        terms = entry.get("reviewed_terms", [])
        if "title" in entry:
            terms = list(set(terms + tokenize(entry["title"])))

        facets = copy.deepcopy(entry.get("public_facets", {}))
        facets["demo"] = True

        return {
            "id": entry["id"],
            "revision": entry.get("revision", 1),
            "releaseId": release_id,
            "route": entry.get("route", f"/item/{entry['id']}"),
            "kind": entry.get("kind", "ITEM"),
            "subjectIds": sorted(list(set(subjs))),
            "programmeIds": entry.get("programmeIds", ["GRADE9_STANDARD"]),
            "editionIds": entry.get("editionIds", ["EDITION_2026_R4"]),
            "conceptIds": entry.get("conceptIds", []),
            "title": entry.get("title", entry["id"]),
            "summary": entry.get("summary", ""),
            "reviewed_terms": sorted(list(set([normalize_query(t) for t in terms if t]))),
            "public_facets": facets,
        }

    @staticmethod
    def verify_shard(manifest: Dict[str, Any], shard_payload: Dict[str, Any]) -> None:
        """Verifies shard integrity and checks for stale release mismatch (N26)."""
        shard_id = shard_payload.get("shard_id")
        manifest_release = manifest.get("release_id")
        shard_release = shard_payload.get("release_id")

        if manifest_release != shard_release:
            raise StaleShardError(
                f"Fault N26: Stale search shard release mismatch: manifest '{manifest_release}', shard '{shard_release}'"
            )

        # Find matching shard entry in manifest
        matching_entry = next((s for s in manifest.get("shards", []) if s.get("shard_id") == shard_id), None)
        if not matching_entry:
            raise StaleShardError(f"Fault N26: Unregistered shard '{shard_id}' not found in manifest")

        actual_sha = canonical_json_digest(shard_payload)
        if actual_sha != matching_entry.get("sha256"):
            raise StaleShardError(
                f"Fault N26: Shard '{shard_id}' checksum mismatch: expected '{matching_entry.get('sha256')}', got '{actual_sha}'"
            )


class SearchQueryEngine:
    """In-memory query evaluator with deterministic scoring, token matching, and facet filtering."""

    def __init__(self, items: Sequence[Dict[str, Any]], boost_rules: Optional[Dict[str, float]] = None) -> None:
        self.items = list(items)
        self.boost_rules = boost_rules or DEFAULT_BOOST_RULES

    def query(
        self,
        text: str = "",
        facets: Optional[Dict[str, Sequence[str]]] = None,
        limit: int = 50,
    ) -> List[Dict[str, Any]]:
        """Executes search with exact boost, token match, facet filtering, and deterministic ranking."""
        norm_query = normalize_query(text)
        query_tokens = tokenize(norm_query)

        results: List[Tuple[float, str, Dict[str, Any]]] = []

        for item in self.items:
            # 1. Facet Filtering: Intersect across dimensions (AND), union within dimension (OR)
            if facets and not self._matches_facets(item, facets):
                continue

            # 2. Score calculation
            score = self._compute_score(item, norm_query, query_tokens)

            # If search query provided, only include items with positive score
            if query_tokens and score <= 0.0:
                continue

            # Tie-breaker: score descending, then ID ascending
            results.append((score, item["id"], item))

        # Sort deterministically
        results.sort(key=lambda x: (-x[0], x[1]))

        return [r[2] for r in results[:limit]]

    def _matches_facets(self, item: Dict[str, Any], filters: Dict[str, Sequence[str]]) -> bool:
        item_facets = item.get("public_facets", {})
        item_subjects = item.get("subjectIds", [])

        for dim, values in filters.items():
            if not values:
                continue
            values_set = set(values)

            # Check subjectIds
            if dim == "subject":
                if not any(s in values_set for s in item_subjects):
                    return False
            elif dim in item_facets:
                facet_val = item_facets[dim]
                if isinstance(facet_val, list):
                    if not any(v in values_set for v in facet_val):
                        return False
                else:
                    if str(facet_val) not in values_set:
                        return False
            else:
                return False
        return True

    def _compute_score(self, item: Dict[str, Any], norm_query: str, query_tokens: List[str]) -> float:
        if not query_tokens:
            return 1.0  # Default non-zero score when browsing with facets only

        score = 0.0
        item_id_norm = normalize_query(item.get("id", ""))
        title_norm = normalize_query(item.get("title", ""))
        summary_norm = normalize_query(item.get("summary", ""))
        reviewed_terms = [normalize_query(t) for t in item.get("reviewed_terms", [])]

        # Exact ID match boost
        if norm_query == item_id_norm or norm_query in item_id_norm.split(":"):
            score += self.boost_rules.get("exact_id", 10.0)

        # Exact Title match boost
        if norm_query == title_norm:
            score += self.boost_rules.get("exact_title", 8.0)

        # Token matches in title
        for token in query_tokens:
            if token in title_norm:
                score += self.boost_rules.get("title_tokens", 5.0)

        # Matches in reviewed terms / concept aliases
        for token in query_tokens:
            if any(token in term for term in reviewed_terms):
                score += self.boost_rules.get("concept_aliases", 3.0)

        # Token matches in summary
        for token in query_tokens:
            if token in summary_norm:
                score += self.boost_rules.get("summary_tokens", 1.0)

        return score
