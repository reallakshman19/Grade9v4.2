"""Fail-closed leaf conservation; transformations require a future external verifier."""
from .record_inventory import extract_leaf_pointers, canonical_bytes

class FieldLedgerAuditError(ValueError): pass

class FieldLedgerEngine:
    @staticmethod
    def audit_field_conservation(source_record, target_record, field_map, *, private_record=None):
        source=dict(extract_leaf_pointers(source_record)); target=dict(extract_leaf_pointers(target_record))
        private=dict(extract_leaf_pointers(private_record)) if private_record is not None else {}
        seen=set(); destinations=set(); counts={"PRESERVE_EXACT":0,"PRESERVED_PRIVATE":0}
        for row in field_map:
            ptr=row.get("source"); disp=row.get("disposition")
            if ptr not in source or ptr in seen: raise FieldLedgerAuditError("unknown or duplicate source leaf: "+str(ptr))
            seen.add(ptr)
            if disp=="PRESERVE_EXACT":
                dst=row.get("target")
                if dst not in target or dst in destinations or canonical_bytes(source[ptr])!=canonical_bytes(target[dst]):
                    raise FieldLedgerAuditError("missing, duplicate or unequal target leaf: "+str(dst))
                destinations.add(dst)
            elif disp=="PRESERVED_PRIVATE":
                if not isinstance(row.get("reason"),str) or not row["reason"].strip() or ptr not in private or canonical_bytes(private[ptr])!=canonical_bytes(source[ptr]):
                    raise FieldLedgerAuditError("unproved private preservation: "+str(ptr))
            else: raise FieldLedgerAuditError("unapproved transform or disposition: "+str(disp))
            counts[disp]+=1
        if seen!=set(source): raise FieldLedgerAuditError("unmapped source fields: "+str(sorted(set(source)-seen)))
        return {"status":"PASS","total_source_leaves":len(source),"mapped_leaves":len(seen),"exact_matches":counts["PRESERVE_EXACT"],"preserved_private":counts["PRESERVED_PRIVATE"],"unmapped_leaves":0}
    @staticmethod
    def build_automatic_ledger(source_record, known_target_prefix_map, default_private_reason="retained in exact private record"):
        rows=[]
        for ptr,_ in extract_leaf_pointers(source_record):
            matched=[k for k in known_target_prefix_map if ptr==k or ptr.startswith(k+"/")]
            if len(matched)>1: raise FieldLedgerAuditError("ambiguous field mapping: "+ptr)
            if matched:
                k=matched[0]; rows.append({"source":ptr,"disposition":"PRESERVE_EXACT","target":known_target_prefix_map[k]+ptr[len(k):]})
            else: rows.append({"source":ptr,"disposition":"PRESERVED_PRIVATE","reason":default_private_reason})
        return rows
