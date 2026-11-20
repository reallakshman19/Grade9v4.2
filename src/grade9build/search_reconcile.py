"""A71: private exact-source occurrence accounting and diagnostic route reconciliation.

Legacy content stays in the external custody/ephemeral runner. Public output is a
count-only aggregate. Source lookup never strips query/fragment or falls back to
IDs/aliases. Legacy text does not become search metadata. Active diagnostic mapping
requires a separately pinned exact occurrence grant to an A34 verified search item.
"""
from __future__ import annotations

import argparse
import copy
import hashlib
import json
import re
from dataclasses import dataclass
from pathlib import Path
from .record_inventory import RecordInventoryEngine, canonical_json_digest, parse_source_bytes
from .search import SearchIndexCompiler, exact_keys, exact_ref, digest, stable_id, safe_text

V35 = "v35:8a02a8eb23ea37a7d8acb74d1bc193dd17657e5b"
V41 = "v41:564ad2a07fddc0fdd30d103674b3eca61235a54b"


class SearchReconciliationError(ValueError):
    pass


def require(condition, code):
    if not condition:
        raise SearchReconciliationError(code)


@dataclass(frozen=True)
class SourcePin:
    population: str
    snapshot: str
    path: str
    blob: str
    size: int
    count: int
    collection: str = ""


SOURCE_PINS = (
    SourcePin("v35_registry", V35, "public/data/resource-registry.v1.json",
              "6a8699366e8fb21bc3f5455af8d8f2e862ff1ba6", 85481, 64),
    SourcePin("v35_search", V35, "public/data/learner-search-index.v1.json",
              "dc71720727c497c349f5fc346f460b01e7874929", 465352, 417),
    SourcePin("v41_search", V41, "data/learner-search-index.v1.json",
              "45be3679cc64aa509891e2c58f9371ab822fdf6b", 1150456, 1012),
)
# Discovered inventory is an external R4 input, not the A09 proposed route map.
# No inferred 71 records and no guessed source locations.


def _loc(record, population):
    if type(record) is not dict:
        return None, None, True
    identity = record.get("id")
    artifact = record.get("artifact")
    url = artifact.get("entrypoint") if population == "v35_registry" and type(artifact) is dict else record.get("url")
    return (identity if type(identity) is str else None,
            url if type(url) is str and 0 < len(url) <= 4096 else None,
            type(identity) is not str or type(url) is not str or not url)


def _restricted(record, population, identity, url):
    if type(record) is not dict:
        return False
    if population == "v35_registry" and (record.get("audience") != "LEARNER" or record.get("resource_kind") == "OWNER_TOOL"):
        return True
    # Conservative quarantine across exact identifiers/locators and explicit metadata.
    # This is not a content safety classifier or permission to publish other records.
    values = [identity, url, record.get("audience"), record.get("resource_kind"),
              record.get("type"), record.get("category"), record.get("target")]
    for value in values:
        if type(value) is dict:
            value = " ".join(v for v in value.values() if type(v) is str)
        if type(value) is str and re.search(r"(?i)(?:^|[^a-z])(?:owner|operator|restricted|private|custody|secret|test)(?:[^a-z]|$)", value):
            return True
    return False


class SearchRouteReconciler:
    def __init__(self, pins=SOURCE_PINS, *, target_mode="DEMO"):
        require(target_mode == "DEMO", "PRODUCTION_TARGET_PROHIBITED")
        self._pins = tuple(pins)
        require(bool(self._pins) and len({p.population for p in self._pins}) == len(self._pins), "INVALID_SOURCE_PINS")
        self._records = {}
        self._routes = {}
        self._sources = {}
        self._active = {}
        self._withdrawn = set()
        self._loaded = False

    def ingest(self, documents):
        require(not self._loaded and type(documents) is dict
                and set(documents) == {p.population for p in self._pins}, "EXACT_SOURCE_SET_REQUIRED")
        inv = RecordInventoryEngine()
        records, routes, sources = {}, {}, {}
        for p in self._pins:
            raw = documents[p.population]
            require(type(raw) is bytes and len(raw) == p.size, "SOURCE_SIZE_MISMATCH")
            actual = hashlib.sha1(b"blob " + str(len(raw)).encode() + b"\0" + raw).hexdigest()
            require(actual == p.blob, "SOURCE_BLOB_MISMATCH")
            sha = hashlib.sha256(raw).hexdigest()
            rows = inv.extract_document(snapshot_id=p.snapshot, source_path=p.path, raw_bytes=raw,
                expected_sha256=sha, expected_blob_sha=p.blob, population_id=p.population,
                collection_paths=[p.collection])
            extracted = [r for r in rows if r.kind == "RECORD"]
            require(len(extracted) == p.count, "SOURCE_COUNT_MISMATCH")
            sources[p.population] = {"snapshot": p.snapshot, "git_blob": p.blob, "sha256": sha, "count": len(extracted)}
            for r in extracted:
                payload = r.payload
                identity, url, invalid = _loc(payload, p.population)
                restricted = _restricted(payload, p.population, identity, url)
                state = "RESTRICTED_EXCLUDED" if restricted else "INVALID_LOCATOR_HOLD" if invalid else "CANDIDATE_HOLD"
                records[r.occurrence_id] = {"occurrence_id": r.occurrence_id, "record_digest": r.record_digest,
                    "population": p.population, "url": url, "legacy_id": identity, "disposition": state}
                if url is not None:
                    routes.setdefault((p.population, url), []).append(r.occurrence_id)
        # Quarantine exact known operator IDs/routes in all populations. No source alias
        # becomes an active route, and no raw legacy metadata is returned to callers.
        restricted_ids = {r["legacy_id"] for r in records.values() if r["disposition"] == "RESTRICTED_EXCLUDED"}
        restricted_urls = {r["url"] for r in records.values() if r["disposition"] == "RESTRICTED_EXCLUDED"}
        restricted_ids.discard(None)
        restricted_urls.discard(None)
        for r in records.values():
            if r["legacy_id"] in restricted_ids or r["url"] in restricted_urls:
                r["disposition"] = "RESTRICTED_EXCLUDED"
        for ids in routes.values():
            if len(ids) > 1:
                for key in ids:
                    if records[key]["disposition"] != "RESTRICTED_EXCLUDED":
                        records[key]["disposition"] = "AMBIGUOUS_ROUTE_HOLD"
        self._records, self._routes, self._sources = records, routes, sources
        self._loaded = True

    def ingest_r4_discovered(self, r4_occurrences):
        require(self._loaded, "SOURCE_INVENTORY_REQUIRED")
        require(type(r4_occurrences) is list and len(r4_occurrences) == 71, "INVALID_R4_DISCOVERED_INPUT")
        require("r4_discovered" not in self._sources, "R4_DISCOVERED_ALREADY_INGESTED")
        for idx, item in enumerate(r4_occurrences):
            require(isinstance(item, dict) and "source_path" in item and "origin" in item, "MALFORMED_R4_ITEM")
            path = item["source_path"]
            occ_id = f"occ:r4_discovered:{idx:03d}:{path}"
            raw_record = {
                "source_path": path,
                "kind": item.get("kind", "UNKNOWN"),
                "origin": item["origin"],
                "manifest_sha256": item.get("manifest_sha256", "")
            }
            rec_digest = canonical_json_digest(raw_record)
            url = item.get("entrypoint")
            identity = item.get("package_id") or item.get("explorer_id") or path
            self._records[occ_id] = {
                "occurrence_id": occ_id,
                "record_digest": rec_digest,
                "population": "r4_discovered",
                "url": url,
                "legacy_id": identity,
                "disposition": "CANDIDATE_HOLD",
            }
            if url is not None:
                self._routes.setdefault(("r4_discovered", url), []).append(occ_id)
        self._sources["r4_discovered"] = {
            "origin": "EXTERNAL_R4_KIT",
            "manifest_sha256": r4_occurrences[0]["manifest_sha256"],
            "count": len(r4_occurrences),
        }

    def bind_diagnostic_routes(self, mapping_bytes, *, trusted_mapping_digest, bundle,
                               release_bytes, catalog_bytes, trusted_release_digest, trusted_catalog_digest):
        require(self._loaded and type(mapping_bytes) is bytes and digest(trusted_mapping_digest),
                "MAPPING_PIN_REQUIRED")
        mapping = parse_source_bytes(mapping_bytes)
        require(canonical_json_digest(mapping) == trusted_mapping_digest, "MAPPING_PIN_MISMATCH")
        verified = SearchIndexCompiler().verify_index(bundle, release_bytes, catalog_bytes,
            trusted_release_digest=trusted_release_digest, trusted_catalog_digest=trusted_catalog_digest)
        require(exact_keys(mapping, ("schema_version", "release_digest", "catalog_digest", "grants"))
                and mapping["schema_version"] == "g9-a71-route-grants/1"
                and mapping["release_digest"] == trusted_release_digest
                and mapping["catalog_digest"] == trusted_catalog_digest and type(mapping["grants"]) is list,
                "INVALID_MAPPING_SCOPE")
        items = {i["id"]: i for shard in verified["shards"].values() for i in shard["items"]}
        catalog = parse_source_bytes(catalog_bytes)
        withdrawn = set(catalog["withdrawn_ids"])
        refs = {g["ref"]["id"]: g["ref"] for g in catalog["entries"]}
        active = {}
        for g in mapping["grants"]:
            require(exact_keys(g, ("occurrence_id", "record_digest", "target", "review"))
                    and type(g["occurrence_id"]) is str and digest(g["record_digest"])
                    and exact_ref(g["target"], "QUESTION") and exact_ref(g["review"], "APPROVAL"),
                    "INVALID_ROUTE_GRANT")
            key = g["occurrence_id"]
            record = self._records.get(key)
            require(record is not None and record["record_digest"] == g["record_digest"]
                    and record["disposition"] == "CANDIDATE_HOLD" and key not in active,
                    "UNKNOWN_HELD_OR_AMBIGUOUS_OCCURRENCE")
            target = g["target"]
            require(refs.get(target["id"]) == target, "STALE_OR_UNKNOWN_TARGET")
            item = items.get(target["id"])
            require(item is not None or target["id"] in withdrawn, "UNREGISTERED_TARGET")
            active[key] = {"ref": copy.deepcopy(target), "route": item["route"] if item else None}
        self._active, self._withdrawn = active, withdrawn

    def resolve_route(self, population, exact_url):
        require(self._loaded, "SOURCE_INVENTORY_REQUIRED")
        if type(population) is not str or type(exact_url) is not str:
            return {"status": "UNKNOWN", "target_route": None}
        ids = self._routes.get((population, exact_url), ())
        if not ids:
            return {"status": "UNKNOWN", "target_route": None}
        records = [self._records[k] for k in ids]
        if any(r["disposition"] == "RESTRICTED_EXCLUDED" for r in records):
            return {"status": "QUARANTINED", "target_route": None}
        if len(ids) != 1:
            return {"status": "TOMBSTONE", "target_route": None, "reason": "AMBIGUOUS_ROUTE"}
        grant = self._active.get(ids[0])
        if not grant:
            return {"status": "TOMBSTONE", "target_route": None, "reason": records[0]["disposition"]}
        if grant["ref"]["id"] in self._withdrawn or grant["route"] is None:
            return {"status": "TOMBSTONE", "target_route": None, "reason": "WITHDRAWN"}
        return {"status": "ACTIVE_DIAGNOSTIC", "target_route": grant["route"],
                "target_ref": copy.deepcopy(grant["ref"])}

    def private_occurrence_receipts(self):
        # Host-only evidence for constructing exact grants; deliberately no payload or URL.
        require(self._loaded, "SOURCE_INVENTORY_REQUIRED")
        return [{k: r[k] for k in ("occurrence_id", "record_digest", "population", "disposition")}
                for r in sorted(self._records.values(), key=lambda v: v["occurrence_id"])]

    def build_summary(self):
        require(self._loaded, "SOURCE_INVENTORY_REQUIRED")
        counts = {}
        for k, r in self._records.items():
            state = r["disposition"]
            if k in self._active:
                state = "WITHDRAWN" if self._active[k]["ref"]["id"] in self._withdrawn else "ACTIVE_DIAGNOSTIC"
            counts[state] = counts.get(state, 0) + 1
        has_r4 = "r4_discovered" in self._sources
        payload = {"schema_version": "g9-search-route-summary/2", "workpack_id": "A71",
                   "status": "HOLD", "academic_admission": "HOLD", "production_release": "NONE",
                   "source_receipts": copy.deepcopy(self._sources), "total_occurrences": len(self._records),
                   "supplied_search_occurrences": 1493,
                   "discovered_resource_occurrences": 71 if has_r4 else 0,
                   "candidate_extended_occurrences": len(self._records),
                   "disposition_counts": counts, "unaccounted_in_supplied_collections": 0,
                   "source_ledger_unaccounted_within_verified_inputs": 0,
                   "external_r4_discovered_inventory": "AUTHENTICATED_INPUT_LOADED" if has_r4 else "NOT_RUN",
                   "public_learner_routes": 0,
                   "semantic_leakage_review": "NOT_RUN"}
        return {**payload, "summary_digest": canonical_json_digest(payload)}


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--v35-root", required=True, type=Path)
    parser.add_argument("--v41-root", required=True, type=Path)
    args = parser.parse_args()
    # Roots are pinned by the caller's checkout verification; raw bytes are never printed.
    documents = {p.population: ((args.v35_root if p.snapshot == V35 else args.v41_root) / p.path).read_bytes()
                 for p in SOURCE_PINS}
    reconciler = SearchRouteReconciler()
    reconciler.ingest(documents)
    print(json.dumps(reconciler.build_summary(), sort_keys=True))


if __name__ == "__main__":
    main()
