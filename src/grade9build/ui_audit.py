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

    def __init__(self, kit_schemas_dir: Optional[str | Path] = None):
        schema_path = None
        candidates = [
            Path(kit_schemas_dir or "") if kit_schemas_dir else None,
            Path("d:/CodeD/grade9-r4-kit/Grade9v4.2_Execution_Kit_R4/02-contracts/schemas"),
            ROOT.parents[0] / "grade9-r4-kit/Grade9v4.2_Execution_Kit_R4/02-contracts/schemas",
        ]
        for c in candidates:
            if c and (c / "legacy-ui-audit.schema.json").is_file():
                schema_path = c / "legacy-ui-audit.schema.json"
                break

        if schema_path and schema_path.is_file():
            self.audit_schema = json.loads(schema_path.read_text(encoding="utf-8"))
        else:
            # Fallback inline schema matching R4 specification
            self.audit_schema = {
                "type": "object",
                "additionalProperties": False,
                "required": [
                    "snapshot_id",
                    "path",
                    "source_sha256",
                    "entry_context",
                    "audience",
                    "disposition",
                    "dependencies_complete",
                    "viewports",
                    "screenshot_evidence",
                    "interaction_log_sha256",
                    "capabilities",
                    "blockers",
                    "decision_ref",
                ],
            }
        self.validator = Draft202012Validator(self.audit_schema)

    @staticmethod
    def context_key(row: Dict[str, Any]) -> Tuple[str, str, str]:
        return (row["snapshot_id"], row["path"], row["entry_context"])

    def validate_audit_row(
        self,
        audit_row: Dict[str, Any],
        expected_scope: Dict[str, Any],
        evidence_root: Optional[Path] = None,
        approved_exclusions: Set[str] = frozenset(),
    ) -> Dict[str, Any]:
        """Validates a single observed UI audit row against an independently enumerated scope record."""
        try:
            self.validator.validate(audit_row)
        except ValidationError as e:
            raise UIAuditError(f"UI audit schema validation failed: {e.message}") from e

        # Match key fields with expected scope
        for k in ("source_sha256", "audience"):
            if audit_row.get(k) != expected_scope.get(k):
                raise UIAuditError(f"scope mismatch for {k}: expected {expected_scope.get(k)}, got {audit_row.get(k)}")

        if audit_row.get("audience") == "UNKNOWN":
            raise UIAuditError("audience cannot be UNKNOWN")

        disposition = audit_row.get("disposition")

        # Case 1: Approved exclusion
        if disposition == "EXCLUDED_APPROVED":
            d_ref = audit_row.get("decision_ref")
            if not d_ref or d_ref not in approved_exclusions:
                raise UIAuditError(f"unapproved exclusion decision_ref: {d_ref}")
            return {
                "status": "EXCLUDED",
                "disposition": disposition,
                "decision_ref": d_ref,
            }

        # Case 2: Audited
        if disposition != "AUDITED":
            raise UIAuditError(f"invalid disposition: {disposition}")

        if not audit_row.get("dependencies_complete"):
            raise UIAuditError("incomplete dependencies in audited UI")

        if audit_row.get("blockers"):
            raise UIAuditError(f"unresolved UI audit blockers: {audit_row['blockers']}")

        # Verify viewports: must contain all 7 mandatory viewports
        row_viewports = {tuple(v) for v in audit_row.get("viewports", [])}
        missing_vps = VIEWPORTS - row_viewports
        if missing_vps:
            raise UIAuditError(f"missing required viewports: {sorted(missing_vps)}")

        # Verify screenshot evidence matches viewports exactly
        screenshots = audit_row.get("screenshot_evidence", [])
        sc_vps = {tuple(s["viewport"]): s["sha256"] for s in screenshots}
        if len(sc_vps) != len(screenshots):
            raise UIAuditError("duplicate viewport in screenshot evidence")
        if not VIEWPORTS.issubset(set(sc_vps.keys())):
            raise UIAuditError("screenshot evidence does not cover all required viewports")

        # Verify evidence files on disk if evidence_root is provided
        if evidence_root:
            all_digests = list(sc_vps.values())
            if audit_row.get("interaction_log_sha256"):
                all_digests.append(audit_row["interaction_log_sha256"])
            for d in all_digests:
                if not HEX64.fullmatch(d):
                    raise UIAuditError(f"invalid evidence digest: {d}")
                fpath = evidence_root / d
                if not fpath.is_file():
                    raise UIAuditError(f"evidence file missing: {d}")

        # Verify capabilities
        caps = audit_row.get("capabilities", [])
        if not caps:
            raise UIAuditError("empty capability inventory in audited row")

        cap_ids = [c["capability_id"] for c in caps]
        if len(cap_ids) != len(set(cap_ids)):
            raise UIAuditError("duplicate capability_id in capabilities")

        expected_cap_ids = expected_scope.get("capability_ids", [])
        if set(cap_ids) != set(expected_cap_ids):
            raise UIAuditError(f"capability mismatch: expected {expected_cap_ids}, got {cap_ids}")

        permitted_slots = set(expected_scope.get("permitted_slots", []))
        for c in caps:
            if c.get("native_slot") not in permitted_slots:
                raise UIAuditError(f"unmapped native slot: {c.get('native_slot')} not in {permitted_slots}")
            if c.get("disposition") not in ("SUPPORTED", "EXCLUDED_APPROVED"):
                raise UIAuditError(f"unsupported capability disposition: {c.get('disposition')}")
            if c.get("disposition") == "EXCLUDED_APPROVED":
                if c.get("decision_ref") not in approved_exclusions:
                    raise UIAuditError(f"unapproved capability exclusion: {c.get('decision_ref')}")

        return {
            "status": "AUDITED",
            "capabilities_count": len(caps),
            "viewports_verified": len(row_viewports),
        }

    def generate_audit_summary(
        self,
        scope_rows: List[Dict[str, Any]],
        audit_rows: List[Dict[str, Any]],
        blueprint_map: Dict[str, str],
        approved_exclusions: Set[str] = frozenset(),
        evidence_root: Optional[Path] = None,
    ) -> Dict[str, Any]:
        """Validates all scope rows and produces the public-safe summary and capability map."""
        scope_map = {self.context_key(r): r for r in scope_rows}
        audit_map = {self.context_key(r): r for r in audit_rows}

        if scope_map.keys() != audit_map.keys():
            missing = set(scope_map.keys()) - set(audit_map.keys())
            extra = set(audit_map.keys()) - set(scope_map.keys())
            raise UIAuditError(f"audit context mismatch: missing={missing}, extra={extra}")

        missing_roles = CORE_ROLES - set(blueprint_map.keys())
        if missing_roles:
            raise UIAuditError(f"missing native blueprint mapping for roles: {missing_roles}")

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
