"""Dual-Source Reconciliation Engine across v3.5 and v4.1.
Part of Workpack A70: Dual-source canonical migration adapters.
Enforces non-destructive custody, no version-number priority, and lossless lineage.
"""
from __future__ import annotations
import copy
import json
import re
from pathlib import Path
from typing import Any, Dict, List, Optional, Tuple, Set

from .field_ledger import FieldLedgerEngine
from .graph import ObjectGraphValidator
from .record_inventory import (
    canonical_json_digest,
    exact_ref,
    make_envelope,
    validate_identity,
    occurrence_id,
)

ROOT = Path(__file__).resolve().parents[2]

V35_SNAPSHOT = "v35:8a02a8eb23ea37a7d8acb74d1bc193dd17657e5b"
V41_SNAPSHOT = "v41:564ad2a07fddc0fdd30d103674b3eca61235a54b"


class ReconciliationConflictError(ValueError):
    """Raised when an unresolvable or illegal dual-source conflict occurs."""
    pass


class DualSourceReconciliationEngine:
    """Reconciles v3.5 and v4.1 records, components, and routes without prioritizing version numbers."""

    def __init__(self, demo_mode: bool = True):
        self.demo_mode = demo_mode
        self.graph_validator = ObjectGraphValidator(demo_mode=self.demo_mode)

    @staticmethod
    def extract_leaves(obj: Any, prefix: str = "") -> Dict[str, Any]:
        """Extracts leaf JSON pointers and values."""
        leaves = {}
        if isinstance(obj, dict):
            if not obj:
                leaves[prefix or "/"] = {}
            for k, v in obj.items():
                p = f"{prefix}/{k.replace('~', '~0').replace('/', '~1')}"
                leaves.update(DualSourceReconciliationEngine.extract_leaves(v, p))
        elif isinstance(obj, list):
            if not obj:
                leaves[prefix or "/"] = []
            for i, v in enumerate(obj):
                p = f"{prefix}/{i}"
                leaves.update(DualSourceReconciliationEngine.extract_leaves(v, p))
        else:
            leaves[prefix or "/"] = obj
        return leaves

    def reconcile_records(
        self,
        v35_records: List[Dict[str, Any]],
        v41_records: List[Dict[str, Any]],
        *,
        synthetic: bool = True,
    ) -> Dict[str, Any]:
        """Reconciles records from v3.5 and v4.1 preserving field conservation and conflicts in custody."""
        if synthetic is not True:
            raise ReconciliationConflictError("real-source reconciliation HOLD; synthetic=True required")

        objects: List[Dict[str, Any]] = []
        conflicts: List[Dict[str, Any]] = []
        reconciled_identities: List[Dict[str, Any]] = []

        v35_map: Dict[str, Dict[str, Any]] = {}
        for r in v35_records:
            lid = r.get("logical_id") or r.get("id") or r.get("occurrence_id")
            if not lid:
                raise ReconciliationConflictError("record missing logical/occurrence identifier")
            if not isinstance(r, dict) or not isinstance(lid, str) or not lid.strip():
                raise ReconciliationConflictError("invalid v3.5 identity")
            if lid in v35_map:
                raise ReconciliationConflictError(f"duplicate v3.5 logical ID: {lid}")
            v35_map[lid] = copy.deepcopy(r)

        v41_map: Dict[str, Dict[str, Any]] = {}
        for r in v41_records:
            lid = r.get("logical_id") or r.get("id") or r.get("occurrence_id")
            if not lid:
                raise ReconciliationConflictError("record missing logical/occurrence identifier")
            if not isinstance(r, dict) or not isinstance(lid, str) or not lid.strip():
                raise ReconciliationConflictError("invalid v4.1 identity")
            if lid in v41_map:
                raise ReconciliationConflictError(f"duplicate v4.1 logical ID: {lid}")
            v41_map[lid] = copy.deepcopy(r)

        all_ids = sorted(set(v35_map.keys()) | set(v41_map.keys()))

        for lid in all_ids:
            r35 = v35_map.get(lid)
            r41 = v41_map.get(lid)

            # Synthetic identifiers cannot use a colliding lossy path slug.
            fingerprint = canonical_json_digest(lid)
            path_lid = re.sub(r"[^A-Za-z0-9._-]", "_", lid)[:60] + "-" + fingerprint[:16]
            safe_id = "item_" + fingerprint[:24]

            # Case 1: Record exists only in v3.5
            if r35 and not r41:
                src_path = f"records/v35/{path_lid}.json"
                src_env = make_envelope(
                    "SOURCE",
                    f"src:v35:{safe_id}",
                    {"snapshot_id": V35_SNAPSHOT, "path": src_path, "raw": r35},
                    status="SYNTHETIC",
                )
                loc = [V35_SNAPSHOT, src_path, ""]
                occ_id = occurrence_id(V35_SNAPSHOT, src_path, "")
                identity = validate_identity({
                    "logical_id": safe_id,
                    "occurrence_id": occ_id,
                    "snapshot_id": V35_SNAPSHOT,
                    "source_path": src_path,
                    "record_locator": "",
                    "legacy_aliases": [safe_id],
                    "source_ref": exact_ref(src_env),
                    "record_digest": canonical_json_digest(r35),
                    "merge_decision": {"decision_type": "UNMERGED", "authority_ref": None, "related_occurrences": []},
                    "status": "SYNTHETIC",
                })
                occ_env = make_envelope(
                    "OCCURRENCE",
                    occ_id,
                    {"identity": identity, "snapshot": "v35", "raw_record": r35, "status": "HOLD"},
                    lineage=[exact_ref(src_env)],
                    status="SYNTHETIC",
                )
                objects.extend([src_env, occ_env])
                reconciled_identities.append({"logical_id": lid, "status": "V35_ONLY", "ref": exact_ref(occ_env)})

            # Case 2: Record exists only in v4.1
            elif r41 and not r35:
                src_path = f"records/v41/{path_lid}.json"
                src_env = make_envelope(
                    "SOURCE",
                    f"src:v41:{safe_id}",
                    {"snapshot_id": V41_SNAPSHOT, "path": src_path, "raw": r41},
                    status="SYNTHETIC",
                )
                loc = [V41_SNAPSHOT, src_path, ""]
                occ_id = occurrence_id(V41_SNAPSHOT, src_path, "")
                identity = validate_identity({
                    "logical_id": safe_id,
                    "occurrence_id": occ_id,
                    "snapshot_id": V41_SNAPSHOT,
                    "source_path": src_path,
                    "record_locator": "",
                    "legacy_aliases": [safe_id],
                    "source_ref": exact_ref(src_env),
                    "record_digest": canonical_json_digest(r41),
                    "merge_decision": {"decision_type": "UNMERGED", "authority_ref": None, "related_occurrences": []},
                    "status": "SYNTHETIC",
                })
                occ_env = make_envelope(
                    "OCCURRENCE",
                    occ_id,
                    {"identity": identity, "snapshot": "v41", "raw_record": r41, "status": "HOLD"},
                    lineage=[exact_ref(src_env)],
                    status="SYNTHETIC",
                )
                objects.extend([src_env, occ_env])
                reconciled_identities.append({"logical_id": lid, "status": "V41_ONLY", "ref": exact_ref(occ_env)})

            # Case 3: Record exists in both sources
            else:
                src_path_35 = f"records/v35/{path_lid}.json"
                src_path_41 = f"records/v41/{path_lid}.json"
                src35 = make_envelope(
                    "SOURCE",
                    f"src:v35:{safe_id}",
                    {"snapshot_id": V35_SNAPSHOT, "path": src_path_35, "raw": r35},
                    status="SYNTHETIC",
                )
                src41 = make_envelope(
                    "SOURCE",
                    f"src:v41:{safe_id}",
                    {"snapshot_id": V41_SNAPSHOT, "path": src_path_41, "raw": r41},
                    status="SYNTHETIC",
                )
                objects.extend([src35, src41])

                digest35 = canonical_json_digest(r35)
                digest41 = canonical_json_digest(r41)

                # Canonical JSON equality cannot prove original-byte equality.
                # Retain both synthetic occurrences pending external custody evidence.
                canonical_equal = digest35 == digest41
                occ_id_35 = occurrence_id(V35_SNAPSHOT, src_path_35, "")
                id35 = validate_identity({
                    "logical_id": None,
                    "occurrence_id": occ_id_35,
                    "snapshot_id": V35_SNAPSHOT,
                    "source_path": src_path_35,
                    "record_locator": "",
                    "legacy_aliases": [safe_id],
                    "source_ref": exact_ref(src35),
                    "record_digest": digest35,
                    "merge_decision": {"decision_type": "HOLD_CONFLICT", "authority_ref": None, "related_occurrences": []},
                    "status": "HOLD",
                })
                occ35 = make_envelope(
                    "OCCURRENCE",
                    occ_id_35,
                    {"identity": id35, "snapshot": "v35", "raw_record": r35, "status": "HOLD"},
                    lineage=[exact_ref(src35)],
                    status="SYNTHETIC",
                )

                occ_id_41 = occurrence_id(V41_SNAPSHOT, src_path_41, "")
                id41 = validate_identity({
                    "logical_id": None,
                    "occurrence_id": occ_id_41,
                    "snapshot_id": V41_SNAPSHOT,
                    "source_path": src_path_41,
                    "record_locator": "",
                    "legacy_aliases": [safe_id],
                    "source_ref": exact_ref(src41),
                    "record_digest": digest41,
                    "merge_decision": {"decision_type": "HOLD_CONFLICT", "authority_ref": None, "related_occurrences": []},
                    "status": "HOLD",
                })
                occ41 = make_envelope(
                    "OCCURRENCE",
                    occ_id_41,
                    {"identity": id41, "snapshot": "v41", "raw_record": r41, "status": "HOLD"},
                    lineage=[exact_ref(src41)],
                    status="SYNTHETIC",
                )
                objects.extend([occ35, occ41])

                leaves35 = self.extract_leaves(r35)
                leaves41 = self.extract_leaves(r41)
                discrepant_keys = sorted(
                    set(k for k in (set(leaves35.keys()) | set(leaves41.keys()))
                        if leaves35.get(k) != leaves41.get(k))
                )

                rel_id = f"rel:conflict:{canonical_json_digest([safe_id, exact_ref(occ35)['sha256'], exact_ref(occ41)['sha256']])[:32]}"
                conflict_env = make_envelope(
                    "RELATIONSHIP",
                    rel_id,
                    {
                        "relationship_type": "DUAL_SOURCE_CANONICAL_EQUAL_UNVERIFIED" if canonical_equal else "DUAL_SOURCE_DISCREPANCY",
                        "from": exact_ref(occ35),
                        "to": exact_ref(occ41),
                        "logical_id": safe_id,
                        "discrepant_pointers": discrepant_keys,
                        "resolution": "HOLD_ORIGINAL_BYTES_UNVERIFIED" if canonical_equal else "HOLD_PENDING_INDEPENDENT_REVIEW",
                        "version_priority_applied": False,
                        "status": "HOLD",
                    },
                    dependencies=[exact_ref(occ35), exact_ref(occ41)],
                    lineage=[exact_ref(src35), exact_ref(src41)],
                    status="SYNTHETIC",
                )
                objects.append(conflict_env)
                if not canonical_equal:
                    conflicts.append({
                        "logical_id": lid,
                        "discrepant_pointers": discrepant_keys,
                        "relationship_ref": exact_ref(conflict_env),
                    })
                reconciled_identities.append({
                    "logical_id": lid,
                    "status": "CANONICAL_EQUAL_HELD" if canonical_equal else "CONFLICT_HELD",
                    "conflict_ref": exact_ref(conflict_env),
                })

        self.graph_validator.validate_graph(objects)

        return {
            "status": "HOLD",
            "academic_admission": "HOLD",
            "production_release": "NONE",
            "total_records_processed": len(all_ids),
            "identical_matches": 0,
            "canonical_equal_held": sum(1 for r in reconciled_identities if r["status"] == "CANONICAL_EQUAL_HELD"),
            "conflicts_held": len(conflicts),
            "objects": objects,
            "conflicts": conflicts,
            "reconciled_identities": reconciled_identities,
        }

    def reconcile_routes(self, v35_routes, v41_routes):
        """Retain both provenance contexts; reject duplicate and reserved paths."""
        if not isinstance(v35_routes, list) or not isinstance(v41_routes, list):
            raise ReconciliationConflictError("route collections must be arrays")
        for origin, rows in (("v35", v35_routes), ("v41", v41_routes)):
            seen = set()
            for row in rows:
                if not isinstance(row, dict):
                    raise ReconciliationConflictError(origin + " route must be an object")
                path = row.get("route")
                if (not isinstance(path, str) or not path.startswith("/") or path == "/"
                    or "//" in path or ".." in path.split("/")
                    or path.startswith("/v35/") or path.startswith("/v41/")):
                    raise ReconciliationConflictError("invalid or reserved route")
                if path in seen:
                    raise ReconciliationConflictError("duplicate route in " + origin + ": " + path)
                seen.add(path)
        left = {x["route"]: copy.deepcopy(x) for x in v35_routes}
        right = {x["route"]: copy.deepcopy(x) for x in v41_routes}
        routes, collisions = {}, []
        for path in sorted(set(left) | set(right)):
            a, b = left.get(path), right.get(path)
            if a is None:
                routes[path] = {**b, "context_origin": "v41", "status": "HOLD"}
            elif b is None:
                routes[path] = {**a, "context_origin": "v35", "status": "HOLD"}
            elif a == b:
                routes[path] = {"route": path, "route_type": "shared_route_held",
                                "source_variants": {"v35": a, "v41": b}, "status": "HOLD"}
            else:
                dst35, dst41 = "/v35" + path, "/v41" + path
                routes[dst35] = {**a, "route": dst35, "legacy_route": path,
                                 "context_origin": "v35", "status": "HOLD"}
                routes[dst41] = {**b, "route": dst41, "legacy_route": path,
                                 "context_origin": "v41", "status": "HOLD"}
                routes[path] = {"route": path, "route_type": "collision_tombstone",
                                "collision_status": "HOLD",
                                "disambiguated_routes": [dst35, dst41], "status": "HOLD"}
                collisions.append({"route": path, "v35_binding": a, "v41_binding": b,
                                   "resolution": "CONTEXT_DISAMBIGUATION_REQUIRED", "status": "HOLD"})
        return {"status": "HOLD", "total_routes": len(routes),
                "collisions_disambiguated": len(collisions), "routes": routes,
                "collisions": collisions}
