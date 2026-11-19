"""Actual Legacy UI Behavior and Capability Inventory Engine.
Part of Workpack A58.
Parses, audits, and validates legacy UI capabilities, viewports, and native slots
without fabricating screenshot evidence.
"""
from __future__ import annotations
import copy
import hashlib
import json
import re
from pathlib import Path
from typing import Any, Dict, List, Optional, Set, Tuple

from jsonschema import Draft202012Validator, ValidationError

ROOT = Path(__file__).resolve().parents[2]
SCHEMAS = ROOT / "schemas/platform"

VIEWPORTS: Set[Tuple[int, int]] = {
    (1366, 854),
    (854, 1366),
    (1000, 1600),
    (1600, 1000),
    (800, 1280),
    (1280, 800),
    (390, 844),
}

CORE_ROLES: Set[str] = {
    "CORE1",
    "CORE1A",
    "CORE1B",
    "CORE2",
    "CORE2A",
    "CORE2B",
    "EXPLORER",
}

HEX64 = re.compile(r"^[0-9a-f]{64}$")


class UIAuditError(ValueError):
    """Raised on invalid UI audit data, missing required viewports, or unapproved exclusions."""
    pass


class UIAuditEngine:
    """Engine for processing and verifying legacy UI capability audits against R4 specifications."""

    def __init__(self, kit_schemas_dir=None, blueprint_registry_path=None):
        import os
        location = kit_schemas_dir or os.environ.get("G9_R4_KIT")
        if not location:
            raise UIAuditError("external R4 schema location required")
        path = Path(location) / "legacy-ui-audit.schema.json"
        if not path.is_file():
            path = Path(location) / "02-contracts/schemas/legacy-ui-audit.schema.json"
        if not path.is_file():
            raise UIAuditError("R4 schema missing; no inline fallback")
        raw = path.read_bytes()
        if hashlib.sha256(raw).hexdigest() != "fe934a5da0b4736b1d2e938a49615ad6df0bcfcb7cfa8b9e5272c5f12fc3f8d7":
            raise UIAuditError("R4 schema hash mismatch")
        self.audit_schema = json.loads(raw)
        Draft202012Validator.check_schema(self.audit_schema)
        self.validator = Draft202012Validator(self.audit_schema)
        native_path = Path(blueprint_registry_path or ROOT / "docs/architecture/native-blueprint-map.json")
        if not native_path.is_file():
            raise UIAuditError("A57 native blueprint map missing")
        native = json.loads(native_path.read_text(encoding="utf-8"))
        rows = native.get("blueprints", [])
        if native.get("registry_version") != "1.17.0" or native.get("workpack_id") != "A57" or len(rows) != 7:
            raise UIAuditError("unrecognized native blueprint registry")
        self.native = {}
        for row in rows:
            role = row.get("target_role")
            if role not in CORE_ROLES or role in self.native:
                raise UIAuditError("invalid native role")
            slots = {v["id"] for v in row.get("native_slots", [])}
            if not slots or not row.get("blueprint_id"):
                raise UIAuditError("invalid native slots")
            self.native[role] = (row["blueprint_id"], slots)
        if set(self.native) != CORE_ROLES:
            raise UIAuditError("missing native roles")

    @staticmethod
    def unique(rows, name):
        result = {}
        for row in rows:
            if not isinstance(row, dict):
                raise UIAuditError("non-object " + name)
            try:
                key = UIAuditEngine.context_key(row)
                hash(key)
            except (KeyError, TypeError) as exc:
                raise UIAuditError("invalid context key") from exc
            if key in result:
                raise UIAuditError("duplicate " + name + " context")
            result[key] = row
        return result

    @staticmethod
    def verify_bytes(root, name, digest):
        if root is None:
            raise UIAuditError("external source/evidence root required")
        if not isinstance(digest, str) or not HEX64.fullmatch(digest):
            raise UIAuditError("invalid evidence/source hash")
        try:
            base = Path(root).resolve(strict=True)
            relative = Path(name)
            if relative.is_absolute() or not relative.parts or ".." in relative.parts:
                raise UIAuditError("unsafe source/evidence path")
            target = base.joinpath(*relative.parts)
            if any(p.is_symlink() for p in (target, *target.parents) if p != base and base in p.parents):
                raise UIAuditError("symlink source/evidence")
            if not target.is_file() or not target.resolve().is_relative_to(base):
                raise UIAuditError("missing or unsafe source/evidence")
            if hashlib.sha256(target.read_bytes()).hexdigest() != digest:
                raise UIAuditError("source/evidence bytes do not match SHA256")
        except OSError as exc:
            raise UIAuditError("source/evidence inaccessible") from exc

    @staticmethod
    def context_key(row: Dict[str, Any]) -> Tuple[str, str, str]:
        return (row["snapshot_id"], row["path"], row["entry_context"])

    def validate_audit_row(
        self, audit_row, expected_scope, evidence_root=None,
        approved_exclusions=frozenset(), source_root=None,
    ):
        """Mechanical validation only; external scope authenticity is not established."""
        try:
            self.validator.validate(audit_row)
        except ValidationError as exc:
            raise UIAuditError("R4 schema violation: " + exc.message) from exc
        if self.context_key(audit_row) != self.context_key(expected_scope):
            raise UIAuditError("context mismatch")
        for field in ("source_sha256", "audience"):
            if audit_row[field] != expected_scope.get(field):
                raise UIAuditError("scope mismatch for " + field)
        if audit_row["audience"] == "UNKNOWN":
            raise UIAuditError("unknown audience")
        if audit_row["disposition"] == "EXCLUDED_APPROVED":
            decision = audit_row["decision_ref"]
            if not decision or decision not in approved_exclusions:
                raise UIAuditError("exclusion lacks verified external decision")
            return {"status": "EXCLUDED", "decision_ref": decision}
        if audit_row["disposition"] != "AUDITED":
            raise UIAuditError("blocked or invalid disposition")
        if not audit_row["dependencies_complete"] or audit_row["blockers"]:
            raise UIAuditError("incomplete dependencies or outstanding blockers")
        snapshot = audit_row["snapshot_id"]
        if not isinstance(snapshot, str) or "/" in snapshot or "\\" in snapshot or snapshot in (".", ".."):
            raise UIAuditError("invalid source snapshot")
        self.verify_bytes(source_root, snapshot + "/" + audit_row["path"],
                          audit_row["source_sha256"])
        viewports = [tuple(v) for v in audit_row["viewports"]]
        if not VIEWPORTS.issubset(set(viewports)):
            raise UIAuditError("missing mandatory viewport")
        screenshots = audit_row["screenshot_evidence"]
        shot_viewports = [tuple(v["viewport"]) for v in screenshots]
        if len(set(shot_viewports)) != len(shot_viewports) or set(shot_viewports) != set(viewports):
            raise UIAuditError("missing/duplicate viewport screenshot")
        for item in screenshots:
            self.verify_bytes(evidence_root, item["sha256"], item["sha256"])
        self.verify_bytes(evidence_root, audit_row["interaction_log_sha256"],
                          audit_row["interaction_log_sha256"])
        capabilities = audit_row["capabilities"]
        ids = [c["capability_id"] for c in capabilities]
        expected = expected_scope.get("capability_ids")
        if (not capabilities or not isinstance(expected, list) or
            len(expected) != len(set(expected)) or len(ids) != len(set(ids)) or
            set(ids) != set(expected)):
            raise UIAuditError("incomplete/duplicate independent capability enumeration")
        roles = expected_scope.get("target_roles")
        if (not isinstance(roles, list) or not roles or
            len(roles) != len(set(roles)) or not set(roles) <= CORE_ROLES):
            raise UIAuditError("missing native target roles in independent scope")
        allowed = set(expected_scope.get("permitted_slots", []))
        native_slots = set().union(*(self.native[r][1] for r in roles))
        if not allowed or not allowed <= native_slots:
            raise UIAuditError("unregistered native target slots")
        for cap in capabilities:
            self.verify_bytes(evidence_root, cap["evidence_sha256"],
                              cap["evidence_sha256"])
            if cap["native_slot"] not in allowed:
                raise UIAuditError("unmapped native slot")
            if cap["disposition"] != "SUPPORTED":
                if cap["disposition"] != "EXCLUDED_APPROVED" or cap["decision_ref"] not in approved_exclusions:
                    raise UIAuditError("unreviewed remediation/exclusion")
        return {"status": "AUDITED", "capabilities_count": len(capabilities),
                "viewports_verified": len(viewports), "authority": "NONE"}

    def generate_audit_summary(
        self,
        scope_rows: List[Dict[str, Any]],
        audit_rows: List[Dict[str, Any]],
        blueprint_map: Dict[str, str],
        approved_exclusions: Set[str] = frozenset(),
        evidence_root: Optional[Path] = None,
        source_root: Optional[Path] = None,
    ) -> Dict[str, Any]:
        """Mechanical check; summary does not certify real source/browser authority."""
        scope_map = self.unique(scope_rows, "scope")
        audit_map = self.unique(audit_rows, "audit")
        if not scope_map:
            raise UIAuditError("empty UI audit scope")

        if scope_map.keys() != audit_map.keys():
            missing = set(scope_map.keys()) - set(audit_map.keys())
            extra = set(audit_map.keys()) - set(scope_map.keys())
            raise UIAuditError(f"audit context mismatch: missing={missing}, extra={extra}")

        if set(blueprint_map) != CORE_ROLES or any(blueprint_map[r] != self.native[r][0] for r in CORE_ROLES):
            raise UIAuditError("blueprint IDs differ from pinned A57 registry")

        total_audited = 0
        total_excluded = 0
        capabilities_inventory: List[Dict[str, Any]] = []

        for key, expected in scope_map.items():
            row = audit_map[key]
            res = self.validate_audit_row(
                row,
                expected,
                evidence_root=evidence_root,
                approved_exclusions=approved_exclusions,
                source_root=source_root,
            )
            if res["status"] == "EXCLUDED":
                total_excluded += 1
            else:
                total_audited += 1
                for c in row.get("capabilities", []):
                    capabilities_inventory.append({
                        "context": list(key),
                        "capability_id": c["capability_id"],
                        "description": c.get("description", ""),
                        "native_slot": c["native_slot"],
                        "disposition": c["disposition"],
                    })

        summary = {
            "schema_version": "g9-ui-audit-summary/1",
            "workpack_id": "A58",
            "status": "HOLD",
            "academic_admission": "HOLD",
            "ui_implementation_freeze": "NOT_FROZEN",
            "production_release": "NONE",
            "kit_manifest_sha256": "6f92aac8eb1ca42e46d243443b230e2bb83dae5e99beeee872da6da47b04e3fc",
            "contexts_total": len(scope_map),
            "contexts_audited": total_audited,
            "contexts_excluded": total_excluded,
            "required_viewports": sorted([[w, h] for w, h in VIEWPORTS]),
            "native_blueprints_bound": len(blueprint_map),
            "evidence_scope": "CALLER_SUPPLIED_NOT_INDEPENDENTLY_AUTHENTICATED",
            "limitations": "Private browser traces, dynamic event logs, and screenshots remain in external hash-addressed storage. Public repository retains mechanical audit invariants and schema-conformant summary only. UI freeze requires independent review under Workpack A61.",
        }

        cap_map = {
            "schema_version": "g9-ui-capability-map/1",
            "workpack_id": "A58",
            "status": "HOLD",
            "academic_admission": "HOLD",
            "production_release": "NONE",
            "core_roles_covered": sorted(list(CORE_ROLES)),
            "capabilities": capabilities_inventory,
        }

        return {
            "summary": summary,
            "capability_map": cap_map,
        }
