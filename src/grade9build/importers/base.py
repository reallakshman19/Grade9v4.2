"""Source-first synthetic adapter; real custody admission is not authorized by this candidate."""
import copy, hashlib
from ..record_inventory import (RecordInventoryEngine, exact_ref, make_envelope, validate_identity, canonical_json_digest)
from ..field_ledger import FieldLedgerEngine
from ..graph import ObjectGraphValidator
class ImporterError(ValueError): pass
class MissingFigureError(ImporterError): pass
class DefaultClassificationForbiddenError(ImporterError): pass
class InvalidClaimStatusError(ImporterError): pass
class UnknownRouteError(ImporterError): pass

class BaseImporter:
    def __init__(self, population_id):
        if not isinstance(population_id,str) or not population_id: raise ImporterError("explicit population required")
        self.population_id=population_id
    @staticmethod
    def compute_raw_hash(data):
        if not isinstance(data,bytes): raise ImporterError("original bytes required")
        return hashlib.sha256(data).hexdigest()
    @staticmethod
    def compute_canonical_digest(data): return canonical_json_digest(data)
    def prepare(self, *, snapshot_id, source_path, raw_bytes, expected_sha256, json_pointer, collection_paths, synthetic, expected_blob_sha=None):
        if synthetic is not True or not self.population_id.startswith("TEST_"):
            raise ImporterError("real-source import HOLD; only explicitly synthetic TEST_ populations authorized")
        inventory=RecordInventoryEngine()
        records=inventory.extract_document(snapshot_id=snapshot_id,source_path=source_path,raw_bytes=raw_bytes,expected_sha256=expected_sha256,population_id=self.population_id,collection_paths=collection_paths,expected_blob_sha=expected_blob_sha)
        matches=[r for r in records if r.record_locator==json_pointer]
        if len(matches)!=1: raise ImporterError("record locator was not independently enumerated")
        r=matches[0]
        source=make_envelope("SOURCE","src:"+canonical_json_digest([snapshot_id,source_path,expected_sha256]),{"snapshot_id":snapshot_id,"path":source_path,"raw_sha256":expected_sha256,"git_blob":r.source_blob_sha,"byte_count":len(raw_bytes)},status="SYNTHETIC")
        raw=r.payload
        aliases=[str(raw["id"])] if isinstance(raw,dict) and raw.get("id") is not None else []
        identity=validate_identity({"logical_id":None,"occurrence_id":r.occurrence_id,"snapshot_id":snapshot_id,"source_path":source_path,"record_locator":json_pointer,"legacy_aliases":aliases,"source_ref":exact_ref(source),"record_digest":r.record_digest,"merge_decision":{"decision_type":"UNMERGED","authority_ref":None,"related_occurrences":[]},"status":"SYNTHETIC"})
        return source,r,identity
    def finish(self,source,r,identity,claims):
        # Private occurrence is not a canonical QUESTION; raw claims remain HOLD.
        occurrence=make_envelope("OCCURRENCE",r.occurrence_id,{"identity":identity,"population_id":self.population_id,"raw_record":r.payload,"candidate_claims":copy.deepcopy(claims),"academic_admission":"HOLD","production_release":"NONE"},lineage=[exact_ref(source)],status="SYNTHETIC")
        ledger=FieldLedgerEngine.build_automatic_ledger(r.payload,{"":"/payload/raw_record"})
        audit=FieldLedgerEngine.audit_field_conservation(r.payload,occurrence,ledger)
        ObjectGraphValidator(demo_mode=True).validate_graph([source,occurrence])
        return {"status":"HOLD","academic_admission":"HOLD","production_release":"NONE","objects":[source,occurrence],"field_map":ledger,"field_audit":audit,"record_locator":r.record_locator,"source_sha256":r.source_sha256,"record_digest":r.record_digest}
