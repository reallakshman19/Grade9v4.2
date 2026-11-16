"""Route reconciliation and migration ledger verification."""
from __future__ import annotations

import copy
import json
from pathlib import Path
from typing import Any, Dict, List, Optional

from .importers.base import (
    UnknownRouteError,
    InvalidClaimStatusError,
)


class RouteLedger:
    """Ledger of discovered, active, and tombstoned routes enforcing fail-closed resolution."""

    def __init__(self, route_map_path: Optional[str | Path] = None) -> None:
        if route_map_path is None:
            # Default to docs/migration/route-map.json relative to repository root
            base_dir = Path(__file__).resolve().parent.parent.parent
            route_map_path = base_dir / "docs" / "migration" / "route-map.json"
        
        self.path = Path(route_map_path)
        if not self.path.exists():
            raise FileNotFoundError(f"Route map not found at {self.path}")

        with open(self.path, "r", encoding="utf-8") as f:
            self.data = json.load(f)

        self.blueprints = {b["route"]: b for b in self.data.get("blueprints", [])}
        self.packages = {p["route"]: p for p in self.data.get("portable_packages", [])}
        self.tombstones = {t["route"]: t for t in self.data.get("tombstones", [])}

    def resolve_route(self, route: str) -> Dict[str, Any]:
        """Resolve a route to its target metadata or tombstone record.
        
        Unknown routes fail closed immediately.
        """
        # 1. Check active blueprints
        if route in self.blueprints:
            res = copy.deepcopy(self.blueprints[route])
            res["route_type"] = "BLUEPRINT"
            return res

        # 2. Check portable packages
        if route in self.packages:
            res = copy.deepcopy(self.packages[route])
            res["route_type"] = "PACKAGE"
            return res

        # 3. Check tombstones
        if route in self.tombstones:
            res = copy.deepcopy(self.tombstones[route])
            res["route_type"] = "TOMBSTONE"
            return res

        # 4. Fail closed on unknown route
        raise UnknownRouteError(
            f"Route '{route}' is unregistered and unknown. Unregistered routes fail closed."
        )

    def is_tombstone(self, route: str) -> bool:
        """Check if a route has been tombstoned."""
        return route in self.tombstones

    def list_tombstones(self) -> List[Dict[str, Any]]:
        """Return all registered route tombstones."""
        return list(self.tombstones.values())


class ReconciliationEngine:
    """Reconciles candidate records against platform constraints and public projection limits."""

    @staticmethod
    def audit_candidate_claims(envelope: Dict[str, Any]) -> None:
        """Verify that candidate claims remain in raw HOLD status and have not been promoted."""
        if envelope.get("status") not in {"HOLD", "BLOCKED"}:
            raise InvalidClaimStatusError(
                f"Candidate envelope has invalid status '{envelope.get('status')}'. Must be HOLD or BLOCKED."
            )

        if envelope.get("academic_admission") != "HOLD":
            raise InvalidClaimStatusError(
                f"Candidate envelope has invalid academic_admission '{envelope.get('academic_admission')}'. Must be HOLD."
            )

        if envelope.get("production_release") != "NONE":
            raise InvalidClaimStatusError(
                f"Candidate envelope has invalid production_release '{envelope.get('production_release')}'. Must be NONE."
            )

        assessment = envelope.get("assessment", {})
        if assessment.get("claim_status") not in {None, "HOLD", "BLOCKED"}:
            raise InvalidClaimStatusError(
                f"Candidate assessment claim has invalid claim_status '{assessment.get('claim_status')}'. Must remain HOLD."
            )

    @staticmethod
    def generate_private_custody_report(envelopes: List[Dict[str, Any]]) -> Dict[str, Any]:
        """Aggregate full private audit report with exact lineage, pointers, and private fields."""
        return {
            "schema_version": "g9-private-custody-report/1.0",
            "status": "HOLD",
            "academic_admission": "HOLD",
            "production_release": "NONE",
            "total_records": len(envelopes),
            "records": [copy.deepcopy(e) for e in envelopes],
        }

    @staticmethod
    def generate_public_safe_projection(envelopes: List[Dict[str, Any]]) -> Dict[str, Any]:
        """Generate sanitized public projection withholding raw answers, confidential stems, and private fields (N09)."""
        safe_records = []
        for e in envelopes:
            safe_record = {
                "schema_version": e.get("schema_version"),
                "occurrence_id": e.get("identity", {}).get("occurrence_id"),
                "legacy_alias": e.get("identity", {}).get("legacy_alias"),
                "status": "HOLD",
                "academic_admission": "HOLD",
                "production_release": "NONE",
                "ui_freeze": "LOCKED_UNTIL_A61",
                "payload": {
                    # Filter out raw stem or answers if rights/answers are restricted
                    "options": [
                        {"id": opt.get("id"), "text": "[PROTECTED_OPTION]"}
                        if isinstance(opt, dict) else "[PROTECTED_OPTION]"
                        for opt in e.get("payload", {}).get("options", [])
                    ]
                },
                # Exclude private_raw_record and assessment raw answers
            }
            safe_records.append(safe_record)

        return {
            "schema_version": "g9-public-projection/1.0",
            "status": "HOLD",
            "academic_admission": "HOLD",
            "production_release": "NONE",
            "total_records": len(safe_records),
            "projections": safe_records,
        }
