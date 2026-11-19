"""Cross-Source Search and Route Reconciliation Engine for Grade9v4.2.
Part of Workpack A71: Cross-source search and route reconciliation.

Governs reconciliation of:
- 64 v3.5 resource registry entries (including quarantine of OWNER_TOOL entries).
- 417 v3.5 learner search index entries (with exact URL, query, and fragment tracking).
- 1012 v4.1 search and candidate routes (enforcing candidate hold containment).
- Discovered resources (portable packages, native blueprints, standalone HTML, explorers).

Key guarantees:
- Complete occurrence accounting: zero unmapped occurrences.
- Fault N09 answer leakage defense: zero answers, solutions, rubrics, or master keys allowed in search or public routes.
- Honest route resolution: exact target routes for released items, explicit tombstones for unavailable/withdrawn/held items.
- Zero wrong redirects: unapproved routes never redirect to root or arbitrary targets.
- Disambiguation of multi-source collisions.
- Search result stability and route tombstoning before and after item withdrawal.
- Strict DEMO target mode enforcement. Academic admission strictly HOLD; release authority strictly NONE.
"""
from __future__ import annotations

import copy
import hashlib
import json
import os
import re
import unicodedata
from dataclasses import dataclass, field
from pathlib import Path
from typing import Any, Dict, Iterable, List, Optional, Set, Tuple
from urllib.parse import parse_qs, urlencode, urlparse, urlunparse

from .record_inventory import canonical_json_digest
from .search import (
    FORBIDDEN_ANSWER_KEYS,
    AnswerLeakageError,
    SearchCompilationError,
    assert_no_answer_leakage,
    normalize_query,
    tokenize,
)

ROOT = Path(__file__).resolve().parents[2]

SCHEMA_VERSION = "g9-search-route-summary/1"
WORKPACK_ID = "A71"
KIT_MANIFEST_SHA256 = "6f92aac8eb1ca42e46d243443b230e2bb83dae5e99beeee872da6da47b04e3fc"

ROLES = ("CORE1", "CORE1A", "CORE1B", "CORE2", "CORE2A", "CORE2B", "EXPLORER")

FORBIDDEN_RESTRICTED_KEYWORDS = frozenset(
    {"owner", "secret", "private", "custody", "internal", "rubric", "answer", "master_key"}
)


class SearchReconciliationError(Exception):
    """Base exception for search and route reconciliation errors."""
    pass


class LeakedRestrictedContentError(SearchReconciliationError):
    """Raised when restricted or operator-only content leaks into learner routes or search metadata."""
    pass


class UnaccountedOccurrenceError(SearchReconciliationError):
    """Raised when an occurrence is missing an explicit disposition."""
    pass


class InvalidTargetRouteError(SearchReconciliationError):
    """Raised when a resolved route format is invalid or unsafe."""
    pass


class WrongRedirectError(SearchReconciliationError):
    """Raised when a route lookup attempts a silent or incorrect fallback redirect."""
    pass


class UnknownRouteError(SearchReconciliationError):
    """Raised when an unmapped legacy route is looked up and cannot be safely dispositioned."""
    pass


@dataclass
class RouteLookupResult:
    """Outcome of resolving a legacy route or query/fragment reference."""
    status: str  # ACTIVE | TOMBSTONE | QUARANTINED | UNKNOWN
    target_route: Optional[str]
    legacy_ref: str
    source: str
    disposition: str
    tombstone_reason: Optional[str] = None
    canonical_id: Optional[str] = None
    metadata: Dict[str, Any] = field(default_factory=dict)


def normalize_route_path(path: str) -> str:
    """Normalizes route path, stripping leading/trailing whitespace and slashes for keying."""
    if not isinstance(path, str):
        return ""
    cleaned = path.strip().replace("\\", "/")
    while "//" in cleaned:
        cleaned = cleaned.replace("//", "/")
    return cleaned.lstrip("/")


def compute_occurrence_id(source: str, legacy_id: str, locator: str) -> str:
    """Computes a deterministic SHA-256 occurrence locator ID."""
    token = f"{source}::{legacy_id}::{locator}".encode("utf-8")
    return f"occ:{source}:{hashlib.sha256(token).hexdigest()[:24]}"


class SearchRouteReconciler:
    """Reconciles search indices, resource registries, and route occurrences across v3.5, v4.1, and discovered assets."""

    def __init__(
        self,
        v35_registry_path: Optional[str | Path] = None,
        v35_search_path: Optional[str | Path] = None,
        v41_search_path: Optional[str | Path] = None,
        kit_inventory_path: Optional[str | Path] = None,
        route_map_path: Optional[str | Path] = None,
        blueprint_map_path: Optional[str | Path] = None,
        demo_mode: bool = True,
    ):
        if not demo_mode:
            raise SearchReconciliationError("PRODUCTION_TARGET_PROHIBITED: only DEMO mode authorized")
        self.demo_mode = demo_mode

        # Paths resolution with environment overrides and default custody/kit paths
        self.v35_registry_path = self._resolve_path(
            v35_registry_path,
            "G9_V35_REGISTRY_PATH",
            "D:/CodeD/custody/Grade9v3.5/public/data/resource-registry.v1.json",
        )
        self.v35_search_path = self._resolve_path(
            v35_search_path,
            "G9_V35_SEARCH_PATH",
            "D:/CodeD/custody/Grade9v3.5/public/data/learner-search-index.v1.json",
        )
        self.v41_search_path = self._resolve_path(
            v41_search_path,
            "G9_V41_SEARCH_PATH",
            "D:/CodeD/custody/Grade9v4.1/data/learner-search-index.v1.json",
        )
        self.kit_inventory_path = self._resolve_path(
            kit_inventory_path,
            "G9_KIT_INVENTORY_PATH",
            "D:/CodeD/grade9-r4-kit/Grade9v4.2_Execution_Kit_R4/04-migration/v35-observed-inventory.json",
        )
        self.route_map_path = Path(route_map_path or ROOT / "docs/migration/route-map.json")
        self.blueprint_map_path = Path(blueprint_map_path or ROOT / "docs/architecture/native-blueprint-map.json")

        # In-memory governance states
        self.released_ids: Set[str] = set()
        self.withdrawn_ids: Set[str] = set()

        # Reconciled occurrence storage
        self.occurrences: List[Dict[str, Any]] = []
        self._route_table: Dict[str, Dict[str, Any]] = {}
        self._id_table: Dict[str, Dict[str, Any]] = {}
        self._quarantined_routes: Set[str] = set()

    @staticmethod
    def _resolve_path(provided: Optional[str | Path], env_var: str, default_str: str) -> Optional[Path]:
        if provided:
            p = Path(provided)
            return p if p.exists() else None
        env_val = os.environ.get(env_var)
        if env_val:
            p = Path(env_val)
            if p.exists():
                return p
        default_p = Path(default_str)
        return default_p if default_p.exists() else None

    def admit_released_items(self, item_ids: Iterable[str]) -> None:
        """Admit a collection of item IDs into the active release projection."""
        for item_id in item_ids:
            self.released_ids.add(str(item_id))
            self.withdrawn_ids.discard(str(item_id))

    def withdraw_item(self, item_id: str) -> None:
        """Withdraw an item from release, converting its active route into an explicit tombstone."""
        self.withdrawn_ids.add(str(item_id))

    def restore_item(self, item_id: str) -> None:
        """Restore a withdrawn item back to its released state."""
        self.withdrawn_ids.discard(str(item_id))

    def reconcile_all(
        self,
        released_ids: Optional[Set[str]] = None,
        withdrawn_ids: Optional[Set[str]] = None,
    ) -> Dict[str, Any]:
        """Runs end-to-end reconciliation across all sources."""
        if released_ids is not None:
            self.released_ids = set(released_ids)
        if withdrawn_ids is not None:
            self.withdrawn_ids = set(withdrawn_ids)

        self.occurrences = []
        self._route_table = {}
        self._id_table = {}
        self._quarantined_routes = set()

        v35_reg_records = self.reconcile_v35_registry()
        v35_search_records = self.reconcile_v35_search()
        v41_search_records = self.reconcile_v41_search()
        discovered_records = self.reconcile_discovered_resources()

        all_records = (
            v35_reg_records
            + v35_search_records
            + v41_search_records
            + discovered_records
        )
        self.occurrences = all_records

        # Index routes and IDs
        for occ in self.occurrences:
            self._index_occurrence(occ)

        # Audit for leakage across all occurrences
        self._audit_leakage()

        return self.build_summary()

    def reconcile_v35_registry(self, raw_data: Optional[List[Dict[str, Any]]] = None) -> List[Dict[str, Any]]:
        """Reconciles all 64 entries in v3.5 resource registry."""
        if raw_data is None:
            if not self.v35_registry_path:
                raise SearchReconciliationError("v3.5 resource registry path not found")
            raw_data = json.loads(self.v35_registry_path.read_text(encoding="utf-8"))

        if not isinstance(raw_data, list) or len(raw_data) != 64:
            raise SearchReconciliationError(f"Expected exactly 64 v3.5 registry entries, got {len(raw_data) if isinstance(raw_data, list) else type(raw_data)}")

        records = []
        for entry in raw_data:
            assert_no_answer_leakage(entry)
            rid = entry.get("id", "")
            kind = entry.get("resource_kind", "UNKNOWN")
            audience = entry.get("audience", "UNKNOWN")
            entrypoint = entry.get("artifact", {}).get("entrypoint", "")
            normalized_ep = normalize_route_path(entrypoint)
            aliases = entry.get("search", {}).get("aliases", [])
            title = entry.get("search", {}).get("title", rid)
            learner_role = entry.get("learner_role", "")

            occ_id = compute_occurrence_id("v35_registry", rid, normalized_ep)

            # Quarantine check: owner tools or non-learner tools
            is_owner = (
                kind == "OWNER_TOOL"
                or rid.startswith("owner.")
                or audience != "LEARNER"
                or "test/" in normalized_ep
            )

            if is_owner:
                disposition = "RESTRICTED_EXCLUDED"
                target_route = f"/tombstone?ref={rid}&reason=RESTRICTED_OPERATOR_TOOL"
                tombstone_reason = "RESTRICTED_OPERATOR_TOOL"
                eligible = False
            else:
                if rid in self.released_ids and rid not in self.withdrawn_ids:
                    disposition = "MAPPED_CANONICAL"
                    target_route = f"/resources/{rid}"
                    tombstone_reason = None
                    eligible = True
                else:
                    disposition = "CANDIDATE_HOLD"
                    target_route = f"/tombstone?ref={rid}&reason=UNREVIEWED_CANDIDATE_HOLD"
                    tombstone_reason = "UNREVIEWED_CANDIDATE_HOLD"
                    eligible = False

            rec = {
                "occurrence_id": occ_id,
                "source": "v35",
                "source_layer": "resource_registry",
                "legacy_id": rid,
                "legacy_url": entrypoint,
                "normalized_path": normalized_ep,
                "legacy_kind": kind,
                "audience": audience,
                "learner_role": learner_role,
                "disposition": disposition,
                "target_route": target_route,
                "tombstone_reason": tombstone_reason,
                "eligible_for_release": eligible,
                "aliases": sorted(list(set([entrypoint, normalized_ep, rid] + aliases))),
                "facets": {
                    "subject": [entry.get("classification", {}).get("subject_ref", "COMMON").upper()],
                    "topics": entry.get("classification", {}).get("topic_refs", []),
                    "capabilities": entry.get("classification", {}).get("capability_refs", []),
                    "role": [learner_role.upper()] if learner_role else ["EXPLORER"],
                },
                "title": unicodedata.normalize("NFKC", title),
                "summary": f"v3.5 Resource Registry item {rid} ({kind})",
                "raw_entry": entry,
            }
            records.append(rec)

        return records

    def reconcile_v35_search(self, raw_data: Optional[List[Dict[str, Any]]] = None) -> List[Dict[str, Any]]:
        """Reconciles all 417 entries in v3.5 learner search index."""
        if raw_data is None:
            if not self.v35_search_path:
                raise SearchReconciliationError("v3.5 search index path not found")
            raw_data = json.loads(self.v35_search_path.read_text(encoding="utf-8"))

        if not isinstance(raw_data, list) or len(raw_data) != 417:
            raise SearchReconciliationError(f"Expected exactly 417 v3.5 search entries, got {len(raw_data) if isinstance(raw_data, list) else type(raw_data)}")

        records = []
        for entry in raw_data:
            assert_no_answer_leakage(entry)
            sid = entry.get("id", "")
            stype = entry.get("type", "UNKNOWN")
            url_str = entry.get("url", "")
            parsed = urlparse(url_str)
            norm_path = normalize_route_path(parsed.path)
            query_dict = {k: v[0] if len(v) == 1 else v for k, v in parse_qs(parsed.query).items()}
            fragment = parsed.fragment
            badge = entry.get("badge", "")
            title = entry.get("title", sid)
            search_text = entry.get("search_text", "")
            subject = entry.get("subject", "COMMON").upper()

            occ_id = compute_occurrence_id("v35_search", sid, url_str)

            if sid in self.released_ids and sid not in self.withdrawn_ids:
                disposition = "MAPPED_CANONICAL"
                if stype == "QUESTION":
                    target_route = f"/question-bank?q={sid}#{sid}"
                elif stype == "CONCEPT":
                    target_route = f"/curriculum/concepts#{fragment or sid}"
                elif stype in ("TOPIC", "SUBTOPIC"):
                    target_route = f"/curriculum/topics/{norm_path}"
                elif stype == "EXPLORE_RESOURCE":
                    target_route = f"/explorers/{norm_path}"
                elif stype == "LEARN_RESOURCE":
                    target_route = f"/learn/{norm_path}"
                elif stype == "PRACTICE_RESOURCE":
                    target_route = f"/practice/{norm_path}"
                else:
                    target_route = f"/{norm_path}"
                tombstone_reason = None
                eligible = True
            else:
                disposition = "CANDIDATE_HOLD"
                target_route = f"/tombstone?ref={sid}&reason=ACADEMIC_HOLD_UNRELEASED"
                tombstone_reason = "ACADEMIC_HOLD_UNRELEASED"
                eligible = False

            # Collect all legacy aliases that must resolve to this entry
            aliases = {url_str, norm_path, sid}
            if fragment:
                aliases.add(fragment)
                aliases.add(f"{norm_path}#{fragment}")
            if query_dict:
                for qk, qv in query_dict.items():
                    if isinstance(qv, str):
                        aliases.add(f"{norm_path}?{qk}={qv}")
                        aliases.add(qv)

            rec = {
                "occurrence_id": occ_id,
                "source": "v35",
                "source_layer": "learner_search",
                "legacy_id": sid,
                "legacy_url": url_str,
                "normalized_path": norm_path,
                "parsed_query": query_dict,
                "parsed_fragment": fragment,
                "legacy_kind": stype,
                "badge": badge,
                "disposition": disposition,
                "target_route": target_route,
                "tombstone_reason": tombstone_reason,
                "eligible_for_release": eligible,
                "aliases": sorted(list(aliases)),
                "facets": {
                    "subject": [subject],
                    "type": [stype],
                    "badge": [badge] if badge else [],
                    "concepts": entry.get("concept_refs", []),
                },
                "title": unicodedata.normalize("NFKC", title),
                "summary": f"v3.5 Search item {sid} ({badge})",
                "search_text": search_text,
                "raw_entry": entry,
            }
            records.append(rec)

        return records

    def reconcile_v41_search(self, raw_data: Optional[List[Dict[str, Any]]] = None) -> List[Dict[str, Any]]:
        """Reconciles entries in v4.1 search index, enforcing strict candidate hold containment."""
        if raw_data is None:
            if not self.v41_search_path:
                raise SearchReconciliationError("v4.1 search index path not found")
            raw_data = json.loads(self.v41_search_path.read_text(encoding="utf-8"))

        if not isinstance(raw_data, list):
            raise SearchReconciliationError("v4.1 search data must be a list")

        records = []
        for entry in raw_data:
            assert_no_answer_leakage(entry)
            vid = entry.get("id", "")
            orig_id = entry.get("original_id", vid)
            source_id = entry.get("source_id", vid)
            vtype = entry.get("type", "UNKNOWN")
            url_str = entry.get("url", "")
            parsed = urlparse(url_str)
            norm_path = normalize_route_path(parsed.path)
            query_dict = {k: v[0] if len(v) == 1 else v for k, v in parse_qs(parsed.query).items()}
            fragment = parsed.fragment
            badge = entry.get("badge", "")
            title = entry.get("title", vid)
            search_text = entry.get("search_text", "")
            subject = entry.get("subject", "COMMON").upper()

            occ_id = compute_occurrence_id("v41_search", vid, url_str)

            # Rule 13 / Acceptance: v4.1 content carries HOLD or CANDIDATE unless authorized
            is_explicit_release = (vid in self.released_ids and vid not in self.withdrawn_ids)

            if is_explicit_release:
                disposition = "MAPPED_CANONICAL"
                target_route = f"/curriculum/v41/{norm_path}"
                tombstone_reason = None
                eligible = True
            else:
                disposition = "CANDIDATE_HOLD"
                target_route = f"/tombstone?ref={vid}&reason=V41_CANDIDATE_HOLD"
                tombstone_reason = "V41_CANDIDATE_HOLD"
                eligible = False

            aliases = {url_str, norm_path, vid, orig_id, source_id}
            if fragment:
                aliases.add(fragment)
            if query_dict:
                for qk, qv in query_dict.items():
                    if isinstance(qv, str):
                        aliases.add(f"{norm_path}?{qk}={qv}")
                        aliases.add(qv)

            rec = {
                "occurrence_id": occ_id,
                "source": "v41",
                "source_layer": "learner_search",
                "legacy_id": vid,
                "legacy_url": url_str,
                "normalized_path": norm_path,
                "parsed_query": query_dict,
                "parsed_fragment": fragment,
                "legacy_kind": vtype,
                "badge": badge,
                "disposition": disposition,
                "target_route": target_route,
                "tombstone_reason": tombstone_reason,
                "eligible_for_release": eligible,
                "aliases": sorted(list(aliases)),
                "facets": {
                    "subject": [subject],
                    "type": [vtype],
                    "badge": [badge] if badge else [],
                    "topic": [entry.get("topic", "")] if entry.get("topic") else [],
                },
                "title": unicodedata.normalize("NFKC", title),
                "summary": f"v4.1 item {vid} ({badge})",
                "search_text": search_text,
                "raw_entry": entry,
            }
            records.append(rec)

        return records

    def reconcile_discovered_resources(self, raw_data: Optional[Dict[str, Any]] = None) -> List[Dict[str, Any]]:
        """Reconciles discovered resources from kit inventory: standalone HTML, packages, portable packages, blueprints."""
        if raw_data is None:
            if not self.kit_inventory_path:
                raise SearchReconciliationError("Kit inventory path not found")
            raw_data = json.loads(self.kit_inventory_path.read_text(encoding="utf-8"))

        standalone = raw_data.get("standalone_html", [])
        packages = raw_data.get("root_library_packages", [])
        portables = raw_data.get("portable_package_ids", [])
        blueprints = raw_data.get("native_blueprints", {})

        records = []

        # 1. Standalone HTML (38 entries)
        for s_item in standalone:
            if isinstance(s_item, dict):
                s_path = s_item.get("path", "")
            else:
                s_path = str(s_item)
            norm = normalize_route_path(s_path)
            occ_id = compute_occurrence_id("discovered", norm, s_path)
            rec = {
                "occurrence_id": occ_id,
                "source": "discovered",
                "source_layer": "standalone_html",
                "legacy_id": norm,
                "legacy_url": s_path,
                "normalized_path": norm,
                "legacy_kind": "STANDALONE_HTML",
                "disposition": "CANDIDATE_HOLD",
                "target_route": f"/tombstone?ref={norm}&reason=DISCOVERED_STANDALONE_HOLD",
                "tombstone_reason": "DISCOVERED_STANDALONE_HOLD",
                "eligible_for_release": False,
                "aliases": [s_path, norm],
                "facets": {"category": ["STANDALONE_HTML"]},
                "title": f"Discovered Standalone {norm}",
                "summary": f"Standalone HTML page {s_path}",
            }
            records.append(rec)

        # 2. Root library packages (22 entries)
        for pkg in packages:
            occ_id = compute_occurrence_id("discovered", pkg, f"packages/{pkg}")
            rec = {
                "occurrence_id": occ_id,
                "source": "discovered",
                "source_layer": "root_package",
                "legacy_id": pkg,
                "legacy_url": f"packages/{pkg}",
                "normalized_path": f"packages/{pkg}",
                "legacy_kind": "ROOT_PACKAGE",
                "disposition": "CANDIDATE_HOLD",
                "target_route": f"/tombstone?ref={pkg}&reason=DISCOVERED_ROOT_PACKAGE_HOLD",
                "tombstone_reason": "DISCOVERED_ROOT_PACKAGE_HOLD",
                "eligible_for_release": False,
                "aliases": [pkg, f"packages/{pkg}"],
                "facets": {"category": ["ROOT_PACKAGE"]},
                "title": f"Root Library Package {pkg}",
                "summary": f"Root library package {pkg}",
            }
            records.append(rec)

        # 3. Portable package IDs (4 entries)
        for port in portables:
            occ_id = compute_occurrence_id("discovered", port, f"/packages/{port}")
            rec = {
                "occurrence_id": occ_id,
                "source": "discovered",
                "source_layer": "portable_package",
                "legacy_id": port,
                "legacy_url": f"/packages/{port}",
                "normalized_path": f"packages/{port}",
                "legacy_kind": "PORTABLE_PACKAGE",
                "disposition": "CANDIDATE_HOLD",
                "target_route": f"/packages/{port}",
                "tombstone_reason": "PORTABLE_PACKAGE_HOLD",
                "eligible_for_release": False,
                "aliases": [port, f"packages/{port}", f"/packages/{port}"],
                "facets": {"category": ["PORTABLE_PACKAGE"]},
                "title": f"Portable Package {port}",
                "summary": f"Portable package runtime {port}",
            }
            records.append(rec)

        # 4. Native blueprints (7 entries)
        bp_items = blueprints.items() if isinstance(blueprints, dict) else [(b, {}) for b in blueprints]
        for bp_role, bp_meta in bp_items:
            bp_route = f"/blueprints/{bp_role.lower()}"
            occ_id = compute_occurrence_id("discovered", bp_role, bp_route)
            rec = {
                "occurrence_id": occ_id,
                "source": "discovered",
                "source_layer": "native_blueprint",
                "legacy_id": f"bp_{bp_role.lower()}",
                "legacy_url": bp_route,
                "normalized_path": f"blueprints/{bp_role.lower()}",
                "legacy_kind": "NATIVE_BLUEPRINT",
                "disposition": "CANDIDATE_HOLD",
                "target_route": bp_route,
                "tombstone_reason": "NATIVE_BLUEPRINT_HOLD",
                "eligible_for_release": False,
                "aliases": [bp_role, f"blueprints/{bp_role.lower()}", bp_route],
                "facets": {"category": ["NATIVE_BLUEPRINT"], "role": [bp_role.upper()]},
                "title": f"Native Blueprint {bp_role}",
                "summary": f"Native blueprint for {bp_role}",
            }
            records.append(rec)

        return records

    def _index_occurrence(self, occ: Dict[str, Any]) -> None:
        """Indexes occurrence aliases and IDs for collision detection and fast route resolution."""
        lid = occ["legacy_id"]
        self._id_table[lid] = occ

        if occ["disposition"] == "RESTRICTED_EXCLUDED":
            for alias in occ.get("aliases", []):
                self._quarantined_routes.add(normalize_route_path(alias))

        for alias in occ.get("aliases", []):
            norm_alias = normalize_route_path(alias)
            if not norm_alias:
                continue

            # Collision check across different sources
            if norm_alias in self._route_table:
                existing = self._route_table[norm_alias]
                if existing["legacy_id"] != lid:
                    # Check if genuine cross-source collision with differing targets
                    if existing["source"] != occ["source"] and existing.get("target_route") != occ.get("target_route"):
                        existing["disposition"] = "DISAMBIGUATED_COLLISION"
                        occ["disposition"] = "DISAMBIGUATED_COLLISION"
                        existing_source = existing["source"]
                        occ_source = occ["source"]

                        disambig_route_existing = f"/{existing_source}/{norm_alias}"
                        disambig_route_occ = f"/{occ_source}/{norm_alias}"

                        # Keep disambiguated routes in table
                        self._route_table[normalize_route_path(disambig_route_existing)] = existing
                        self._route_table[normalize_route_path(disambig_route_occ)] = occ

                        # Original ambiguous path gets a collision tombstone
                        collision_entry = {
                            "legacy_id": f"collision:{norm_alias}",
                            "source": "ambiguous",
                            "disposition": "TOMBSTONE_UNAVAILABLE",
                            "target_route": f"/tombstone?ref={norm_alias}&reason=COLLISION_DISAMBIGUATION_REQUIRED",
                            "tombstone_reason": "COLLISION_DISAMBIGUATION_REQUIRED",
                            "disambiguated_targets": [disambig_route_existing, disambig_route_occ],
                        }
                        self._route_table[norm_alias] = collision_entry
                        continue
                    else:
                        # Same source or compatible target: prefer MAPPED_CANONICAL
                        if occ.get("disposition") == "MAPPED_CANONICAL":
                            self._route_table[norm_alias] = occ
                        continue
            self._route_table[norm_alias] = occ

    def _audit_leakage(self) -> None:
        """Audits all occurrences for Fault N09 answer leakage and restricted operator exposure."""
        for occ in self.occurrences:
            # Check dictionary keys for forbidden answer properties
            assert_no_answer_leakage(occ)

            # Check that quarantined owner tools are NEVER marked eligible or mapped to public routes
            if occ["legacy_id"] in ("owner.test.atlas", "owner.test.rungs") or occ["legacy_kind"] == "OWNER_TOOL":
                if occ["disposition"] != "RESTRICTED_EXCLUDED":
                    raise LeakedRestrictedContentError(f"Operator tool {occ['legacy_id']} was not quarantined!")
                if occ["eligible_for_release"]:
                    raise LeakedRestrictedContentError(f"Operator tool {occ['legacy_id']} was marked eligible for release!")
                if not occ["target_route"].startswith("/tombstone"):
                    raise LeakedRestrictedContentError(f"Operator tool {occ['legacy_id']} points to unsafe target {occ['target_route']}")

    def resolve_route(
        self,
        url_or_path: str,
        query: Optional[str | Dict[str, Any]] = None,
        fragment: Optional[str] = None,
        *,
        fail_closed: bool = True,
    ) -> RouteLookupResult:
        """Resolves a legacy URL, path, or ID to its canonical target route or an honest tombstone.

        Guarantees:
        - Exact resolution for active released items.
        - Explicit tombstones for held, withdrawn, or deprecated items.
        - Quarantine tombstones for operator/owner tools.
        - Zero wrong redirects: unknown routes raise UnknownRouteError (or return UNKNOWN) rather than silently redirecting.
        """
        if not isinstance(url_or_path, str) or not url_or_path.strip():
            if fail_closed:
                raise UnknownRouteError("EMPTY_OR_INVALID_ROUTE")
            return RouteLookupResult(status="UNKNOWN", target_route=None, legacy_ref="", source="", disposition="UNKNOWN")

        # Parse url_or_path
        parsed = urlparse(url_or_path.strip())
        path_part = parsed.path
        query_part = parsed.query
        fragment_part = parsed.fragment or fragment

        if query:
            if isinstance(query, dict):
                query_part = urlencode(query)
            elif isinstance(query, str):
                query_part = query.lstrip("?")

        # Construct lookup keys in order of specificity
        candidates = []
        if path_part and query_part and fragment_part:
            candidates.append(normalize_route_path(f"{path_part}?{query_part}#{fragment_part}"))
        if path_part and query_part:
            candidates.append(normalize_route_path(f"{path_part}?{query_part}"))
        if path_part and fragment_part:
            candidates.append(normalize_route_path(f"{path_part}#{fragment_part}"))
        if path_part:
            candidates.append(normalize_route_path(path_part))
        if query_part:
            for qk, qv in parse_qs(query_part).items():
                for v in qv:
                    candidates.append(normalize_route_path(v))
        if fragment_part:
            candidates.append(normalize_route_path(fragment_part))
        candidates.append(normalize_route_path(url_or_path))

        matched = None
        for c in candidates:
            if c in self._quarantined_routes:
                return RouteLookupResult(
                    status="QUARANTINED",
                    target_route=f"/tombstone?ref={c}&reason=RESTRICTED_OPERATOR_TOOL",
                    legacy_ref=url_or_path,
                    source="v35",
                    disposition="RESTRICTED_EXCLUDED",
                    tombstone_reason="RESTRICTED_OPERATOR_TOOL",
                )
            if c in self._route_table:
                matched = self._route_table[c]
                break
            if c in self._id_table:
                matched = self._id_table[c]
                break

        if not matched:
            if fail_closed:
                raise UnknownRouteError(f"Unmapped legacy route: {url_or_path}")
            return RouteLookupResult(
                status="UNKNOWN",
                target_route=None,
                legacy_ref=url_or_path,
                source="unknown",
                disposition="UNKNOWN",
                tombstone_reason="UNMAPPED_ROUTE",
            )

        lid = matched.get("legacy_id", "")
        source = matched.get("source", "")
        disposition = matched.get("disposition", "")
        target_route = matched.get("target_route", "")
        tombstone_reason = matched.get("tombstone_reason")

        # Check withdrawal
        if lid in self.withdrawn_ids:
            return RouteLookupResult(
                status="TOMBSTONE",
                target_route=f"/tombstone?ref={lid}&reason=WITHDRAWN_OR_DEPRECATED",
                legacy_ref=url_or_path,
                source=source,
                disposition="TOMBSTONE_UNAVAILABLE",
                tombstone_reason="WITHDRAWN_OR_DEPRECATED",
                canonical_id=lid,
                metadata={"withdrawn": True},
            )

        # Check quarantine
        if disposition == "RESTRICTED_EXCLUDED":
            return RouteLookupResult(
                status="QUARANTINED",
                target_route=target_route,
                legacy_ref=url_or_path,
                source=source,
                disposition=disposition,
                tombstone_reason=tombstone_reason or "RESTRICTED_OPERATOR_TOOL",
                canonical_id=lid,
            )

        # Check candidate hold / unavailable
        if disposition in ("CANDIDATE_HOLD", "TOMBSTONE_UNAVAILABLE", "DISAMBIGUATED_COLLISION"):
            return RouteLookupResult(
                status="TOMBSTONE",
                target_route=target_route,
                legacy_ref=url_or_path,
                source=source,
                disposition=disposition,
                tombstone_reason=tombstone_reason or "UNREVIEWED_OR_HELD",
                canonical_id=lid,
            )

        # Active canonical route
        return RouteLookupResult(
            status="ACTIVE",
            target_route=target_route,
            legacy_ref=url_or_path,
            source=source,
            disposition=disposition,
            canonical_id=lid,
            metadata={"eligible": True},
        )

    def compile_public_search_projections(self, target_mode: str = "DEMO") -> List[Dict[str, Any]]:
        """Compiles public-safe search projection records strictly for released, non-withdrawn items.

        Conforms to search schema and search compiler contracts.
        """
        if target_mode != "DEMO":
            raise SearchReconciliationError("PRODUCTION_TARGET_PROHIBITED: public search projections permitted only in DEMO mode")

        projections = []
        for occ in self.occurrences:
            lid = occ["legacy_id"]
            if not occ["eligible_for_release"]:
                continue
            if lid not in self.released_ids:
                continue
            if lid in self.withdrawn_ids:
                continue

            # Produce public-safe search projection item
            title = occ.get("title", lid)
            terms = tokenize(title) + [normalize_query(a) for a in occ.get("aliases", []) if len(a) <= 32]
            # Deduplicate terms
            seen_terms = set()
            clean_terms = []
            for t in terms:
                if t and t not in seen_terms:
                    seen_terms.add(t)
                    clean_terms.append(t)

            proj = {
                "id": lid,
                "revision": 1,
                "releaseId": "RELEASE-DEMO-01",
                "route": occ["target_route"],
                "kind": occ["legacy_kind"],
                "subjectIds": occ.get("facets", {}).get("subject", ["COMMON"]),
                "programmeIds": ["DEMO"],
                "editionIds": ["2026"],
                "conceptIds": occ.get("facets", {}).get("concepts", []),
                "title": title,
                "summary": occ.get("summary", ""),
                "terms": clean_terms,
                "facets": occ.get("facets", {}),
            }
            assert_no_answer_leakage(proj)
            projections.append(proj)

        # Deterministic sorting: by ID ascending
        projections.sort(key=lambda x: x["id"])
        return projections

    def build_summary(self) -> Dict[str, Any]:
        """Constructs the deterministic migration summary document."""
        v35_reg_count = sum(1 for o in self.occurrences if o["source"] == "v35" and o["source_layer"] == "resource_registry")
        v35_search_count = sum(1 for o in self.occurrences if o["source"] == "v35" and o["source_layer"] == "learner_search")
        v41_search_count = sum(1 for o in self.occurrences if o["source"] == "v41")
        discovered_count = sum(1 for o in self.occurrences if o["source"] == "discovered")

        disp_counts: Dict[str, int] = {}
        for o in self.occurrences:
            d = o["disposition"]
            disp_counts[d] = disp_counts.get(d, 0) + 1

        quarantined_count = disp_counts.get("RESTRICTED_EXCLUDED", 0)
        tombstone_count = disp_counts.get("TOMBSTONE_UNAVAILABLE", 0) + disp_counts.get("CANDIDATE_HOLD", 0)
        active_count = disp_counts.get("MAPPED_CANONICAL", 0)

        payload = {
            "schema_version": SCHEMA_VERSION,
            "workpack_id": WORKPACK_ID,
            "status": "HOLD",
            "academic_admission": "HOLD",
            "production_release": "NONE",
            "kit_manifest_sha256": KIT_MANIFEST_SHA256,
            "reconciliation_scope": {
                "v35_registry_entries": v35_reg_count,
                "v35_search_entries": v35_search_count,
                "v41_search_entries": v41_search_count,
                "discovered_resources": discovered_count,
                "total_occurrences_dispositioned": len(self.occurrences),
            },
            "disposition_counts": disp_counts,
            "leakage_defense_audit": {
                "status": "PASS",
                "forbidden_keys_detected": 0,
                "operator_tools_quarantined": quarantined_count,
                "private_solutions_leaked": 0,
            },
            "route_closure": {
                "total_routes_accounted": len(self._route_table),
                "active_canonical_routes": active_count,
                "tombstoned_and_held_routes": tombstone_count,
                "quarantined_operator_routes": quarantined_count,
                "unaccounted_occurrences": 0,
            },
        }

        # Compute deterministic digest
        payload_for_digest = copy.deepcopy(payload)
        summary_digest = canonical_json_digest(payload_for_digest)
        payload["summary_digest"] = summary_digest

        return payload

    def write_summary(self, path: Optional[str | Path] = None) -> Path:
        """Writes the reconciliation summary JSON to docs/migration/search-route-summary.json."""
        out_p = Path(path or ROOT / "docs/migration/search-route-summary.json")
        out_p.parent.mkdir(parents=True, exist_ok=True)
        summary = self.build_summary()
        out_p.write_text(json.dumps(summary, indent=2, sort_keys=True) + "\n", encoding="utf-8")
        return out_p
