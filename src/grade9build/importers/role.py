"""Core role and blueprint migration adapter."""
from __future__ import annotations

from typing import Any, Dict, Optional

from .base import BaseImporter, ImporterError


class CoreRoleImporter(BaseImporter):
    """Imports legacy role configurations into Six-Core and native blueprint mappings."""

    ALLOWED_ROLES = {
        "CORE1",
        "CORE1A",
        "CORE1B",
        "CORE2A",
        "CORE2B",
        "CORE3",
        "EXPLORER",
    }

    ALLOWED_BLUEPRINTS = {
        "BP-CORE1-ORIENTATION@1.1.0",
        "BP-CORE1A-CONSTRUCTION@1.8.0",
        "BP-CORE1B-RECONSTRUCTION@1.8.0",
        "BP-CORE2A-CRUX@1.1.0",
        "BP-CORE2B-DECIDE@1.1.0",
        "BP-CORE3-TRANSFERS@1.0.0",
        "BP-EXPLORER-SANDBOX@1.1.0",
    }

    def import_role_configuration(
        self,
        role_id: str,
        blueprint_id: str,
        layout_mode: str,
        slot_bindings: Dict[str, Any],
        source_path: str,
        json_pointer: str,
        raw_source: Optional[Dict[str, Any]] = None,
    ) -> Dict[str, Any]:
        """Import a role mapping into a platform-compliant envelope."""
        if role_id not in self.ALLOWED_ROLES:
            raise ImporterError(f"Unauthorized role '{role_id}'. Allowed roles: {self.ALLOWED_ROLES}")

        if blueprint_id not in self.ALLOWED_BLUEPRINTS:
            raise ImporterError(
                f"Unauthorized blueprint '{blueprint_id}'. Allowed blueprints: {self.ALLOWED_BLUEPRINTS}"
            )

        # Invariant: CORE1 never accepts source question as authority
        if role_id == "CORE1":
            if slot_bindings.get("source_question_authority") or slot_bindings.get("uses_source_question"):
                raise ImporterError("CORE1 role must never accept source question as authority")

        raw_data = raw_source or {
            "role_id": role_id,
            "blueprint_id": blueprint_id,
            "layout_mode": layout_mode,
            "slot_bindings": slot_bindings,
        }

        raw_hash = self.compute_raw_hash(raw_data)
        canonical_digest = self.compute_canonical_digest(raw_data)
        occurrence_id = f"{source_path}#{json_pointer}"

        envelope = self.build_envelope_scaffold(
            occurrence_id=occurrence_id,
            legacy_alias=role_id,
            source_path=source_path,
            json_pointer=json_pointer,
            raw_source_hash=raw_hash,
            canonical_digest=canonical_digest,
        )

        envelope["payload"] = {
            "role": role_id,
            "blueprint_id": blueprint_id,
            "layout_mode": layout_mode,
            "slot_bindings": slot_bindings,
            "mode_conflict": "UNRESOLVED_PENDING_OWNER_DECISION",
        }

        return envelope
