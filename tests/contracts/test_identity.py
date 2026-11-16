import copy,json,sys,unittest
from pathlib import Path
from jsonschema import Draft202012Validator, ValidationError
ROOT=Path(__file__).resolve().parents[2];sys.path.insert(0,str(ROOT/'src'))
import hashlib
def occurrence_id(snapshot,path,pointer):return "occ:"+hashlib.sha256(json.dumps([snapshot,path,pointer],ensure_ascii=False,sort_keys=True,separators=(",", ":"),allow_nan=False).encode()).hexdigest()
def make_envelope(kind,id_,payload,*,status):return {"schema_version":"engineering-projection/1","type":kind,"id":id_,"revision":1,"subject_id":None,"payload":payload,"dependencies":[],"source_lineage_refs":[],"status":status}
def exact_ref(o):return {**{k:o[k] for k in ("type","id","revision")},"sha256":hashlib.sha256(json.dumps(o,ensure_ascii=False,sort_keys=True,separators=(",", ":"),allow_nan=False).encode()).hexdigest()}
def validate_identity(r):
 Draft202012Validator(json.loads((ROOT/'schemas/platform/identity.schema.json').read_text())).validate(r);return r
class IdentityTests(unittest.TestCase):
 def setUp(self):
  self.snap='test:'+ '1'*40; self.src=make_envelope('SOURCE','src:synthetic',{},status='SYNTHETIC')
  self.r={'logical_id':None,'occurrence_id':occurrence_id(self.snap,'bank.json','/0'),'snapshot_id':self.snap,'source_path':'bank.json','record_locator':'/0','legacy_aliases':['Q1'],'source_ref':exact_ref(self.src),'record_digest':'a'*64,'merge_decision':{'decision_type':'UNMERGED','authority_ref':None,'related_occurrences':[]},'status':'HOLD'}
 def test_valid(self): self.assertEqual(validate_identity(self.r),self.r)
 def test_snapshot_collision(self): self.assertNotEqual(self.r['occurrence_id'],occurrence_id('test:'+'2'*40,'bank.json','/0'))
 def test_unapproved_merge(self):
  r=copy.deepcopy(self.r);r['merge_decision']['decision_type']='APPROVED_MERGE'
  with self.assertRaises(ValidationError):validate_identity(r)
 def test_active_forbidden(self):
  r=copy.deepcopy(self.r);r['status']='ACTIVE'
  with self.assertRaises(ValidationError):validate_identity(r)
 def test_unassigned_only(self):
  r=copy.deepcopy(self.r);r['logical_id']='question:001'
  with self.assertRaises(ValidationError):validate_identity(r)
 def test_actual_schema(self):
  s=json.loads((ROOT/'schemas/platform/exact-ref.schema.json').read_text());v=Draft202012Validator(s)
  v.validate(exact_ref(self.src))
  for k,bad in [('revision',True),('sha256','a'*63),('type','CORE3'),('id','bad/id')]:
   r=exact_ref(self.src);r[k]=bad
   with self.assertRaises(ValidationError):v.validate(r)
