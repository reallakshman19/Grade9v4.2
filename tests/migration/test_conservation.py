import copy
import hashlib
import pytest
from grade9build.verify import ConservationChecker,ConservationVerificationError,CONSERVATION_COUNTERS
from grade9build.record_inventory import RecordInventoryEngine,canonical_json_digest,canonical_bytes

def fixture():
    raw=canonical_bytes([{"id":"same","answer":1},{"id":"same","answer":2}])
    inv=RecordInventoryEngine()
    rs=inv.extract_document(snapshot_id="synthetic:"+"a"*40,source_path="a.json",raw_bytes=raw,
                            expected_sha256=hashlib.sha256(raw).hexdigest(),population_id="test",collection_paths=[""])
    records=[r for r in rs if r.kind=="RECORD"]
    pin=canonical_json_digest([r.to_dict() for r in records])
    entries=[{"occurrence_id":r.occurrence_id,"record_digest":r.record_digest,"disposition":"PRESERVED_PRIVATE_HOLD"} for r in records]
    return records,pin,entries

def test_same_logical_id_is_two_exact_occurrences_and_omission_counted():
    records,pin,entries=fixture()
    c=ConservationChecker()
    assert c.audit_occurrence_ledger(records,entries,trusted_scope_digest=pin)=={"scope_occurrences":2,"accounted_private_hold":2,"unaccounted":0,"approved_mappings":0}
    assert c.audit_occurrence_ledger(records,entries[:1],trusted_scope_digest=pin)["unaccounted"]==1
    with pytest.raises(ConservationVerificationError,match="SCOPE_PIN"):
        c.audit_occurrence_ledger(records[:1],entries[:1],trusted_scope_digest=pin)

def test_duplicate_foreign_wrong_digest_or_unapproved_mapping_rejected():
    records,pin,entries=fixture();c=ConservationChecker()
    for bad in [entries+[entries[0]], [{**entries[0],"occurrence_id":"occ:foreign"}],
                [{**entries[0],"record_digest":"b"*64}],[{**entries[0],"disposition":"APPROVED"}]]:
        with pytest.raises(ConservationVerificationError):c.audit_occurrence_ledger(records,bad,trusted_scope_digest=pin)

def test_field_target_values_and_private_bytes_must_match_including_empty_and_null():
    c=ConservationChecker();source={"a/b":{"~":1},"empty":[],"null":None}
    ledger=[{"source":"/a~1b/~0","target":"/value","disposition":"PRESERVE_EXACT"},
            {"source":"/empty","reason":"private retained","disposition":"PRESERVED_PRIVATE"},
            {"source":"/null","reason":"private retained","disposition":"PRESERVED_PRIVATE"}]
    target={"value":1};private={"empty":[],"null":None}
    assert c.audit_field_conservation(source,target,ledger,private_record=private)["total_source_leaves"]==3
    for t,p,l in [({"value":2},private,ledger),(target,{"empty":{},"null":None},ledger),(target,None,ledger),(target,private,ledger[:2]),(target,private,ledger+[ledger[0]]),(target,private,[{**ledger[0],"disposition":"DROP"},*ledger[1:]])]:
        with pytest.raises(ConservationVerificationError):c.audit_field_conservation(source,t,l,private_record=p)

def test_zero_counters_or_self_asserted_summary_cannot_promote():
    c=ConservationChecker()
    held={"status":"HOLD","academic_admission":"HOLD","production_release":"NONE","ui_freeze":"NOT_GRANTED",
          "conservation_counters":{k:None for k in CONSERVATION_COUNTERS}}
    assert c.verify_conservation_summary(held,recomputed=held)
    fake=copy.deepcopy(held);fake["conservation_counters"]={k:0 for k in CONSERVATION_COUNTERS}
    with pytest.raises(ConservationVerificationError):c.verify_conservation_summary(fake,recomputed=held)
    with pytest.raises(ConservationVerificationError):c.verify_conservation_summary(fake,recomputed=fake)
