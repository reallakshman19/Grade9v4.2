"""v3.5 Native Package, Registry, and Component Migration Adapter.
Part of Workpack A70: Dual-source canonical migration adapters.
Private/synthetic execution only. Real-source migration remains HOLD.
"""
from __future__ import annotations
import copy
import hashlib
import json
import re
from pathlib import Path
from typing import Any, Dict, List, Optional, Tuple

from .field_ledger import FieldLedgerEngine
from .graph import ObjectGraphValidator
from .record_inventory import (
    RecordInventoryEngine,
    canonical_json_digest,
    exact_ref,
    make_envelope,
    validate_identity,
    parse_source_bytes,
)

ROOT = Path(__file__).resolve().parents[2]


class V35MigrationError(ValueError):
    """Raised on invalid v3.5 migration inputs, unverified claims, or scope violations."""
    pass


class V35MigrationEngine:
    """Migrates native v3.5 package structures, resource registry entries, and portable packages."""

    def __init__(self, population_id: str = "TEST_V35", blueprint_map_path: Optional[str | Path] = None):
        if not isinstance(population_id, str) or not population_id:
            raise V35MigrationError("explicit population_id required")
        if not population_id.startswith("TEST_"):
            raise V35MigrationError("real v3.5 import HOLD; only synthetic TEST_ populations authorized")
        self.population_id = population_id

        bp_path = Path(blueprint_map_path or ROOT / "docs/architecture/native-blueprint-map.json")
        if bp_path.is_file():
            self.blueprint_map = json.loads(bp_path.read_text(encoding="utf-8"))
        else:
            self.blueprint_map = {"blueprints": []}

    @staticmethod
    def compute_sha256(data: bytes) -> str:
        if not isinstance(data, bytes):
            raise V35MigrationError("bytes required for digest computation")
        return hashlib.sha256(data).hexdigest()

    def migrate_library_package(
        self,
        *,
        snapshot_id: str,
        source_path: str,
        raw_bytes: bytes,
        expected_sha256: str,
        synthetic: bool = True,
    ) -> Dict[str, Any]:
        """Migrates a v3.5 root library package JSON file preserving package fields and Six-Core roles."""
        if synthetic is not True:
            raise V35MigrationError("real-source import HOLD; synthetic=True required")

        actual_sha = self.compute_sha256(raw_bytes)
        if actual_sha != expected_sha256:
            raise V35MigrationError(f"SHA-256 mismatch for {source_path}: expected {expected_sha256}, got {actual_sha}")

        try:
            raw_data = parse_source_bytes(raw_bytes)
        except Exception as e:
            raise V35MigrationError(f"invalid JSON in {source_path}: {e}")

        if not isinstance(raw_data, dict):
            raise V35MigrationError(f"package root must be JSON object: {source_path}")

        source_id = "src:v35:" + canonical_json_digest([snapshot_id, source_path, expected_sha256])[:32]
        source_env = make_envelope(
            "SOURCE",
            source_id,
            {
                "snapshot_id": snapshot_id,
                "path": source_path,
                "raw_sha256": expected_sha256,
                "byte_count": len(raw_bytes),
                "source_family": "v35_library_package",
            },
            status="SYNTHETIC",
        )

        objects = [source_env]
        package_id = raw_data.get("package_id") or raw_data.get("id") or Path(source_path).stem
        if not re.fullmatch(r"^[A-Za-z][A-Za-z0-9._:-]{2,127}$", str(package_id)):
            package_id = f"pkg:{canonical_json_digest(package_id)[:32]}"

        # Extract roles, scaffolds, and hints
        roles_extracted = []
        raw_roles = raw_data.get("roles") or raw_data.get("core_roles") or {}
        if isinstance(raw_roles, list):
            raw_roles = {f"role_{i}": r for i, r in enumerate(raw_roles)}

        for r_name, r_cfg in raw_roles.items():
            if not isinstance(r_cfg, dict):
                continue
            role_id = r_cfg.get("target_role") or r_cfg.get("role_id")
            bp_id = r_cfg.get("blueprint_id")
            layout = r_cfg.get("layout_mode")

            matching_bps = [
                b for b in self.blueprint_map["blueprints"]
                if b["target_role"] == role_id and b["blueprint_id"] == bp_id and b["layout_mode"] == layout
            ]
            role_status = "HOLD" if not matching_bps else "SYNTHETIC"

            roles_extracted.append({
                "role_key": r_name,
                "role_id": role_id,
                "blueprint_id": bp_id,
                "layout_mode": layout,
                "slots": r_cfg.get("slot_bindings", {}),
                "status": role_status,
            })

        hints = raw_data.get("source_hints", [])
        scaffolds = raw_data.get("authored_scaffolds", [])

        # Conforming deterministic occurrence ID
        record_locator = ""
        locator = [snapshot_id, source_path, record_locator]
        occ_id = "occ:" + canonical_json_digest(locator)

        identity_record = {
            "logical_id": str(package_id),
            "occurrence_id": occ_id,
            "snapshot_id": snapshot_id,
            "source_path": source_path,
            "record_locator": record_locator,
            "legacy_aliases": [str(x) for x in [raw_data.get("id"), raw_data.get("package_id")] if x],
            "source_ref": exact_ref(source_env),
            "record_digest": canonical_json_digest(raw_data),
            "merge_decision": {
                "decision_type": "UNMERGED",
                "authority_ref": None,
                "related_occurrences": [],
            },
            "status": "SYNTHETIC",
        }
        validated_identity = validate_identity(identity_record)

        occ_payload = {
            "identity": validated_identity,
            "population_id": self.population_id,
            "package_id": str(package_id),
            "title": raw_data.get("title", ""),
            "subject": raw_data.get("subject"),
            "roles": roles_extracted,
            "source_hints": hints,
            "authored_scaffolds": scaffolds,
            "raw_record": raw_data,
            "candidate_claims": {
                "status": "HOLD",
                "qrt_authority": "NONE",
                "academic_admission": "HOLD",
                "production_release": "NONE",
            },
        }

        occ_env = make_envelope(
            "OCCURRENCE",
            occ_id,
            occ_payload,
            lineage=[exact_ref(source_env)],
            status="SYNTHETIC",
        )
        objects.append(occ_env)

        ledger = FieldLedgerEngine.build_automatic_ledger(raw_data, {"": "/payload/raw_record"})
        audit = FieldLedgerEngine.audit_field_conservation(raw_data, occ_env, ledger)

        ObjectGraphValidator(demo_mode=True).validate_graph(objects)

        return {
            "status": "HOLD",
            "academic_admission": "HOLD",
            "production_release": "NONE",
            "package_id": package_id,
            "objects": objects,
            "field_map": ledger,
            "field_audit": audit,
            "source_sha256": expected_sha256,
            "record_digest": canonical_json_digest(raw_data),
        }

    def migrate_registry_entry(
        self,
        *,
        snapshot_id: str,
        source_path: str,
        entry: Dict[str, Any],
        raw_bytes: bytes,
        synthetic: bool = True,
    ) -> Dict[str, Any]:
        """Migrates an observed v3.5 resource registry entry into a canonical envelope."""
        if synthetic is not True:
            raise V35MigrationError("real-source import HOLD; synthetic=True required")
        if not isinstance(entry, dict):
            raise V35MigrationError("entry must be object")

        resource_id = entry.get("resource_id") or entry.get("id")
        if not resource_id:
            raise V35MigrationError("resource_id required")

        kind = entry.get("kind")
        valid_kinds = {
            "OPAQUE_APP",
            "STRUCTURED_PRODUCT",
            "QUESTION_COLLECTION",
            "OWNER_TOOL",
            "GUIDED_SESSION",
            "PORTABLE_SCENE",
            "NATIVE_COMPONENT",
        }
        if kind not in valid_kinds:
            raise V35MigrationError(f"unrecognized resource kind: {kind}")

        # A separate entry dict cannot be trusted against unrelated bytes.
        try:
            source_entry = parse_source_bytes(raw_bytes)
        except (ValueError, UnicodeDecodeError) as e:
            raise V35MigrationError("invalid registry source bytes") from e
        if source_entry != entry:
            raise V35MigrationError("registry entry differs from supplied source bytes")
        source_sha = self.compute_sha256(raw_bytes)
        source_env = make_envelope(
            "SOURCE",
            "src:v35:reg:" + canonical_json_digest([snapshot_id, source_path, source_sha])[:32],
            {
                "snapshot_id": snapshot_id,
                "path": source_path,
                "raw_sha256": source_sha,
                "byte_count": len(raw_bytes),
                "source_family": "v35_registry",
            },
            status="SYNTHETIC",
        )

        record_locator = f"/{resource_id}"
        locator = [snapshot_id, source_path, record_locator]
        res_occ_id = "occ:" + canonical_json_digest(locator)

        identity_record = {
            "logical_id": str(resource_id),
            "occurrence_id": res_occ_id,
            "snapshot_id": snapshot_id,
            "source_path": source_path,
            "record_locator": record_locator,
            "legacy_aliases": [str(resource_id)],
            "source_ref": exact_ref(source_env),
            "record_digest": canonical_json_digest(entry),
            "merge_decision": {
                "decision_type": "UNMERGED",
                "authority_ref": None,
                "related_occurrences": [],
            },
            "status": "SYNTHETIC",
        }
        validated_identity = validate_identity(identity_record)

        payload = {
            "identity": validated_identity,
            "population_id": self.population_id,
            "resource_id": str(resource_id),
            "kind": kind,
            "entrypoint": entry.get("entrypoint"),
            "learner_role": entry.get("learner_role", "EXPLORER"),
            "audience": entry.get("audience", "STUDENT"),
            "raw_record": entry,
            "candidate_claims": {
                "status": "HOLD",
                "academic_admission": "HOLD",
                "production_release": "NONE",
            },
        }

        occ_env = make_envelope(
            "OCCURRENCE",
            res_occ_id,
            payload,
            lineage=[exact_ref(source_env)],
            status="SYNTHETIC",
        )

        ledger = FieldLedgerEngine.build_automatic_ledger(entry, {"": "/payload/raw_record"})
        audit = FieldLedgerEngine.audit_field_conservation(entry, occ_env, ledger)

        objects = [source_env, occ_env]
        ObjectGraphValidator(demo_mode=True).validate_graph(objects)

        return {
            "status": "HOLD",
            "resource_id": resource_id,
            "objects": objects,
            "field_map": ledger,
            "field_audit": audit,
        }

    def migrate_portable_package(
        self,
        *,
        package_id: str,
        raw_manifest: Dict[str, Any],
        synthetic: bool = True,
    ) -> Dict[str, Any]:
        """Validates and packages a portable v3.5 package without executable inputs."""
        if synthetic is not True:
            raise V35MigrationError("real-source import HOLD; synthetic=True required")

        allowed_portable = {
            "portable-long-division",
            "portable-redox-electron-equivalence",
            "portable-integration-riemann",
            "portable-motion-shared-clock",
        }
        if package_id not in allowed_portable:
            raise V35MigrationError(f"unregistered portable package ID: {package_id}")

        if not isinstance(raw_manifest, dict):
            raise V35MigrationError("portable package manifest must be JSON object")

        if raw_manifest.get("package_id") != package_id:
            raise V35MigrationError("portable package ID mismatch")
        def contains_executable(item):
            if isinstance(item, dict):
                if {"executable", "scripts", "script", "javascript", "code"} & set(item):
                    return True
                return any(contains_executable(v) for v in item.values())
            if isinstance(item, list):
                return any(contains_executable(v) for v in item)
            return False
        if contains_executable(raw_manifest):
            raise V35MigrationError("nested executable input forbidden")

        snapshot_id = "v35:8a02a8eb23ea37a7d8acb74d1bc193dd17657e5b"
        source_path = f"portable/{package_id}/manifest.json"
        raw_bytes = json.dumps(raw_manifest, sort_keys=True, separators=(",", ":")).encode("utf-8")
        raw_sha = hashlib.sha256(raw_bytes).hexdigest()

        source_env = make_envelope(
            "SOURCE",
            f"src:portable:{package_id}",
            {
                "snapshot_id": snapshot_id,
                "path": source_path,
                "raw_sha256": raw_sha,
                "byte_count": len(raw_bytes),
                "source_family": "portable_package",
            },
            status="SYNTHETIC",
        )

        record_locator = ""
        locator = [snapshot_id, source_path, record_locator]
        occ_id = "occ:" + canonical_json_digest(locator)

        identity_record = {
            "logical_id": package_id,
            "occurrence_id": occ_id,
            "snapshot_id": snapshot_id,
            "source_path": source_path,
            "record_locator": record_locator,
            "legacy_aliases": [package_id],
            "source_ref": exact_ref(source_env),
            "record_digest": canonical_json_digest(raw_manifest),
            "merge_decision": {
                "decision_type": "UNMERGED",
                "authority_ref": None,
                "related_occurrences": [],
            },
            "status": "SYNTHETIC",
        }
        validated_identity = validate_identity(identity_record)

        occ_env = make_envelope(
            "OCCURRENCE",
            occ_id,
            {
                "identity": validated_identity,
                "population_id": self.population_id,
                "package_id": package_id,
                "raw_record": raw_manifest,
                "candidate_claims": {
                    "status": "HOLD",
                    "portable": True,
                    "executable_input": False,
                    "academic_admission": "HOLD",
                    "production_release": "NONE",
                },
            },
            lineage=[exact_ref(source_env)],
            status="SYNTHETIC",
        )

        objects = [source_env, occ_env]
        ObjectGraphValidator(demo_mode=True).validate_graph(objects)

        return {
            "status": "HOLD",
            "package_id": package_id,
            "objects": objects,
            "portable": True,
        }
