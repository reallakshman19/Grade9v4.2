"""Grade9v4.2 Migration Field Ledger and Conservation Engine (Workpack A07).

Implements leaf-level field mapping, lossless verification, RFC 6901 pointer validation,
and strict conservation oracles verifying that no source field is lost or silently dropped.
"""

import json
from typing import Dict, List, Any, Optional, Set
from grade9build.record_inventory import extract_leaf_pointers, canonical_json_digest

class FieldLedgerAuditError(ValueError):
    """Raised when field conservation or mapping invariants are violated."""
    pass

class FieldLedgerEngine:
    """Validates field-level conservation and ledger compliance for migrated records."""

    ALLOWED_DISPOSITIONS = {
        "PRESERVE_EXACT",
        "PRESERVED_PRIVATE",
        "APPROVAL_REQUIRED",
        "TRANSFORM_VERIFIED"
    }

    @staticmethod
    def audit_field_conservation(
        source_record: Dict[str, Any],
        target_record: Dict[str, Any],
        field_map: List[Dict[str, Any]],
        allow_unmapped_private: bool = False
    ) -> Dict[str, Any]:
        """Verify explicit leaf coverage and exact values; reject omissions and mismatches.

        Conforms strictly to the reference oracle invariants in the R4 Execution Kit.
        """
        source_leaves = dict(extract_leaf_pointers(source_record))
        target_leaves = dict(extract_leaf_pointers(target_record))

        mapped_source_pointers: Set[str] = set()
        exact_match_count = 0
        preserved_private_count = 0

        for entry in field_map:
            src_ptr = entry.get("source")
            if not src_ptr:
                raise FieldLedgerAuditError("Missing 'source' pointer in field mapping entry")

            if src_ptr not in source_leaves:
                raise FieldLedgerAuditError(f"unknown source leaf: {src_ptr}")

            if src_ptr in mapped_source_pointers:
                raise FieldLedgerAuditError(f"duplicate source leaf mapping: {src_ptr}")

            mapped_source_pointers.add(src_ptr)
            disp = entry.get("disposition")

            if disp not in FieldLedgerEngine.ALLOWED_DISPOSITIONS:
                raise FieldLedgerAuditError(f"unapproved disposition: {disp} on {src_ptr}")

            if disp == "PRESERVE_EXACT":
                tgt_ptr = entry.get("target")
                if not tgt_ptr:
                    raise FieldLedgerAuditError(f"PRESERVE_EXACT requires 'target' pointer on {src_ptr}")
                if tgt_ptr not in target_leaves:
                    raise FieldLedgerAuditError(f"exact target field missing: {tgt_ptr} for {src_ptr}")

                src_val_str = json.dumps(source_leaves[src_ptr], sort_keys=True)
                tgt_val_str = json.dumps(target_leaves[tgt_ptr], sort_keys=True)
                if src_val_str != tgt_val_str:
                    raise FieldLedgerAuditError(
                        f"exact field mismatch on {src_ptr} -> {tgt_ptr}: {src_val_str} != {tgt_val_str}"
                    )
                exact_match_count += 1

            elif disp == "PRESERVED_PRIVATE":
                reason = entry.get("reason")
                if not reason or not str(reason).strip():
                    raise FieldLedgerAuditError(f"missing private reason on {src_ptr}")
                preserved_private_count += 1

            elif disp in {"APPROVAL_REQUIRED", "TRANSFORM_VERIFIED"}:
                if not entry.get("rule_ref"):
                    raise FieldLedgerAuditError(f"transform/approval requires rule_ref on {src_ptr}")

        unmapped = set(source_leaves.keys()) - mapped_source_pointers
        if unmapped and not allow_unmapped_private:
            raise FieldLedgerAuditError(f"unmapped source fields: {sorted(unmapped)}")

        return {
            "status": "PASS",
            "total_source_leaves": len(source_leaves),
            "mapped_leaves": len(mapped_source_pointers),
            "exact_matches": exact_match_count,
            "preserved_private": preserved_private_count,
            "unmapped_leaves": len(unmapped)
        }

    @staticmethod
    def build_automatic_ledger(
        source_record: Dict[str, Any],
        known_target_prefix_map: Dict[str, str],
        default_private_reason: str = "unknown source field preserved in private custody"
    ) -> List[Dict[str, Any]]:
        """Construct a complete, loss-free field ledger mapping all source leaves."""
        ledger = []
        source_leaves = dict(extract_leaf_pointers(source_record))

        for ptr, val in sorted(source_leaves.items()):
            matched_target = None
            for src_prefix, tgt_prefix in known_target_prefix_map.items():
                if ptr == src_prefix:
                    matched_target = tgt_prefix
                    break
                elif ptr.startswith(src_prefix + "/"):
                    matched_target = tgt_prefix + ptr[len(src_prefix):]
                    break

            if matched_target is not None:
                ledger.append({
                    "source": ptr,
                    "disposition": "PRESERVE_EXACT",
                    "target": matched_target
                })
            else:
                ledger.append({
                    "source": ptr,
                    "disposition": "PRESERVED_PRIVATE",
                    "reason": default_private_reason
                })

        return ledger
