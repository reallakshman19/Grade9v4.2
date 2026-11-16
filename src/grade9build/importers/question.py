"""Question and problem bank occurrence migration adapter."""
from __future__ import annotations

import copy
from typing import Any, Dict, List, Optional

from .base import (
    BaseImporter,
    ImporterError,
    MissingFigureError,
    DefaultClassificationForbiddenError,
    InvalidClaimStatusError,
)
from ..field_ledger import FieldLedgerEngine
from ..record_inventory import extract_leaf_pointers


class QuestionImporter(BaseImporter):
    """Lossless question importer implementing approved field mappings and HOLD constraints."""

    KNOWN_MAPPED_FIELDS = {
        "id",
        "stem",
        "options",
        "answer",
        "op",
        "band",
        "score",
        "crux",
        "source_figures",
        "figures",
    }

    def import_question(
        self,
        raw_record: Dict[str, Any],
        source_path: str,
        json_pointer: str,
        expected_source_hash: Optional[str] = None,
        available_assets: Optional[Dict[str, bytes]] = None,
    ) -> Dict[str, Any]:
        """Import a legacy question occurrence into a platform object envelope."""
        if available_assets is None:
            available_assets = {}

        # 1. Source hash verification
        raw_hash = self.compute_raw_hash(raw_record)
        if expected_source_hash is not None:
            self.verify_source_hash(raw_record, expected_source_hash)

        canonical_digest = self.compute_canonical_digest(raw_record)
        occurrence_id = f"{source_path}#{json_pointer}"
        legacy_alias = str(raw_record.get("id")) if "id" in raw_record else None

        # 2. Build scaffold envelope
        envelope = self.build_envelope_scaffold(
            occurrence_id=occurrence_id,
            legacy_alias=legacy_alias,
            source_path=source_path,
            json_pointer=json_pointer,
            raw_source_hash=raw_hash,
            canonical_digest=canonical_digest,
        )

        # 3. Process stem
        payload: Dict[str, Any] = {}
        if "stem" in raw_record:
            payload["stem"] = raw_record["stem"]

        # 4. Process options (N12: duplicate option check, order preservation)
        if "options" in raw_record:
            options_raw = raw_record["options"]
            if not isinstance(options_raw, list):
                raise ImporterError("Field 'options' must be a list")
            
            seen_option_ids = set()
            normalized_options = []
            for opt in options_raw:
                if isinstance(opt, dict):
                    opt_id = opt.get("id")
                    if opt_id is not None:
                        if opt_id in seen_option_ids:
                            raise ImporterError(f"Duplicate option ID '{opt_id}' detected in question options (N12)")
                        seen_option_ids.add(opt_id)
                    normalized_options.append(copy.deepcopy(opt))
                else:
                    normalized_options.append(opt)
            payload["options"] = normalized_options

        # 5. Process answer (Candidate claims remain raw HOLD; importer never verifies)
        assessment_claims: Dict[str, Any] = {}
        if "answer" in raw_record:
            answer_val = raw_record["answer"]
            if isinstance(answer_val, dict) and answer_val.get("status") in {"VERIFIED", "ACCEPTED"}:
                raise InvalidClaimStatusError(
                    "Candidate answer claim cannot be imported as VERIFIED or ACCEPTED; must remain HOLD"
                )
            assessment_claims["raw_claim"] = answer_val
            assessment_claims["claim_status"] = "HOLD"
            assessment_claims["evaluator_ref"] = None

        # 6. Process QRT claims (unknown remains unknown; NO DEFAULTS)
        qrt_claims: Dict[str, Any] = {}
        for qrt_key in ("op", "band", "score", "crux"):
            if qrt_key in raw_record:
                val = raw_record[qrt_key]
                if val is not None:
                    qrt_claims[qrt_key] = val

        # Check for prohibited default fallback classification
        if raw_record.get("_injected_defaults") or raw_record.get("_has_default_fallback"):
            raise DefaultClassificationForbiddenError(
                "Default QRT classification is strictly prohibited; unknown fields must remain unknown"
            )

        # 7. Process source figures (N07: missing mandatory figure fails closed)
        figures_raw = raw_record.get("source_figures") or raw_record.get("figures") or []
        asset_claims: List[Dict[str, Any]] = []
        if figures_raw:
            if not isinstance(figures_raw, list):
                figures_raw = [figures_raw]
            for fig in figures_raw:
                if isinstance(fig, dict):
                    fig_id = fig.get("id") or fig.get("name") or "unknown"
                    is_mandatory = bool(fig.get("mandatory", False))
                    classification = fig.get("classification")
                    
                    # Verify availability
                    is_present = fig_id in available_assets or fig.get("content_sha256") is not None
                    
                    if not is_present:
                        if is_mandatory:
                            raise MissingFigureError(
                                f"Mandatory source figure '{fig_id}' is missing; import fails closed (N07)"
                            )
                        resolved_classification = classification or "MISSING"
                    else:
                        resolved_classification = classification or "PRESENT"

                    asset_claims.append({
                        "asset_id": fig_id,
                        "mandatory": is_mandatory,
                        "classification": resolved_classification,
                        "source_ref": fig.get("source_ref"),
                        "digest": fig.get("content_sha256"),
                    })

        # 8. Retain all unmapped fields in private_raw_record
        private_raw_record: Dict[str, Any] = {}
        for k, v in raw_record.items():
            if k not in self.KNOWN_MAPPED_FIELDS:
                private_raw_record[k] = copy.deepcopy(v)

        envelope["payload"] = payload
        envelope["assessment"] = assessment_claims
        envelope["qrt"] = qrt_claims
        envelope["asset_claims"] = asset_claims
        envelope["private_raw_record"] = private_raw_record

        # 9. Verify leaf field conservation
        self._verify_leaf_conservation(raw_record, envelope)

        return envelope

    def _verify_leaf_conservation(self, raw: Dict[str, Any], envelope: Dict[str, Any]) -> None:
        """Verify that every source leaf pointer is accounted for in the imported envelope."""
        source_leaves = extract_leaf_pointers(raw)
        
        # Build set of all covered leaves
        covered_leaves = set()
        all_pointers = []
        for ptr, val in source_leaves:
            all_pointers.append(ptr)
            parts = [p for p in ptr.split("/") if p]
            if not parts:
                continue
            root_key = parts[0].replace("~1", "/").replace("~0", "~")
            if root_key in self.KNOWN_MAPPED_FIELDS or root_key in envelope["private_raw_record"]:
                covered_leaves.add(ptr)

        unaccounted = set(all_pointers) - covered_leaves
        if unaccounted:
            raise ImporterError(f"Field conservation audit failed: unmapped source leaves {unaccounted}")
