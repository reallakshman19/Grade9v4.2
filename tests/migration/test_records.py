import hashlib,json,os,sys,unittest
from pathlib import Path
ROOT=Path(__file__).resolve().parents[2];sys.path.insert(0,str(ROOT/'src'))
from grade9build.record_inventory import RecordInventoryEngine, extract_leaf_pointers, canonical_json_digest, resolve_pointer
from grade9build.field_ledger import FieldLedgerEngine, FieldLedgerAuditError
class RecordTests(unittest.TestCase):
 def extract(self,e,data,paths,snapshot='test:'+'1'*40,pop='TEST_A'):
  raw=data if isinstance(data,bytes) else json.dumps(data,ensure_ascii=False).encode()
  return e.extract_document(snapshot_id=snapshot,source_path='bank.json',raw_bytes=raw,expected_sha256=hashlib.sha256(raw).hexdigest(),population_id=pop,collection_paths=paths)
 def test_all_collections_and_metadata(self):
  data={'questions':[],'items':[{'id':'a'}],'records':[{'id':'b'}],'meta':{'x/y~':[]}}
  r=self.extract(RecordInventoryEngine(),data,['/questions','/items','/records'])
  self.assertEqual([x.record_locator for x in r],['','/items/0','/records/0']);self.assertEqual(r[0].payload,data)
  self.assertEqual(r[0].get_leaf_map()['/meta/x~1y~0'],[])
  for x in r:self.assertEqual(x.payload,resolve_pointer(data,x.record_locator))
 def test_population_distinct(self):
  e=RecordInventoryEngine();a=self.extract(e,[1]*267,[''],pop='TEST_267');b=self.extract(e,[1]*288,[''],snapshot='test:'+'2'*40,pop='TEST_288')
  self.assertEqual(sum(x.kind=='RECORD' for x in a),267);self.assertEqual(sum(x.kind=='RECORD' for x in b),288);self.assertEqual(len({x.occurrence_id for x in e.records}),557)
  with self.assertRaises(ValueError):self.extract(e,[1]*267,[''],pop='TEST_267')
 def test_source_bytes_and_duplicates(self):
  for raw in (b'{"x":1,"x":2}',b'{"x":NaN}'):
   with self.assertRaises(ValueError):self.extract(RecordInventoryEngine(),raw,[])
  with self.assertRaises(ValueError):RecordInventoryEngine().extract_document(snapshot_id='test:'+'1'*40,source_path='bank.json',raw_bytes=b'{}',expected_sha256='0'*64,population_id='TEST',collection_paths=[])
 def test_private_proof_and_transform(self):
  s={'x':1};m=[{'source':'/x','disposition':'PRESERVED_PRIVATE','reason':'private'}]
  with self.assertRaises(FieldLedgerAuditError):FieldLedgerEngine.audit_field_conservation(s,{},m)
  self.assertEqual(FieldLedgerEngine.audit_field_conservation(s,{},m,private_record=s)['mapped_leaves'],1)
  for ledger in ([],[{'source':'/x','disposition':'TRANSFORM_VERIFIED','rule_ref':'invented'}],[{'source':'/x','disposition':'PRESERVE_EXACT','target':'/x'}]):
   with self.assertRaises(FieldLedgerAuditError):FieldLedgerEngine.audit_field_conservation(s,{'x':2},ledger)
 def test_root_empty_and_null(self):
  for s in ({},[],None):
   t={'raw':s};m=FieldLedgerEngine.build_automatic_ledger(s,{'':'/raw'})
   self.assertEqual(FieldLedgerEngine.audit_field_conservation(s,t,m)['mapped_leaves'],1)
 def test_reference_field_fixture(self):
  kit=Path(os.environ['G9_R4_KIT']);f=json.loads((kit/'06-acceptance/fixtures/field-conservation.json').read_text())
  a=FieldLedgerEngine.audit_field_conservation(f['source'],f['target'],f['field_map'],private_record=f['source']);self.assertEqual(a['mapped_leaves'],8)
