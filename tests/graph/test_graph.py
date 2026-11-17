import copy,json,os,sys,unittest
from pathlib import Path
ROOT=Path(__file__).resolve().parents[2];sys.path.insert(0,str(ROOT/'src'))
from grade9build.graph import ObjectGraphValidator,GraphValidationError,compute_object_digest
def make_envelope(kind,id_,payload,*,dependencies=(),status="HOLD"):
 return {"schema_version":"engineering-projection/1","type":kind,"id":id_,"revision":1,"subject_id":None,"payload":payload,"dependencies":list(dependencies),"source_lineage_refs":[],"status":status}
def exact_ref(o):return {**{k:o[k] for k in ("type","id","revision")},"sha256":compute_object_digest(o)}
class GraphTests(unittest.TestCase):
 def fixture(self,n):return json.loads((Path(os.environ['G9_R4_KIT'])/'06-acceptance/fixtures'/n).read_text())
 def test_reference_graphs(self):
  self.assertEqual(ObjectGraphValidator(True).validate_graph(self.fixture('graph.json')),8)
  self.assertEqual(ObjectGraphValidator(True).validate_graph(self.fixture('wpe-vertical-slice.json')['objects']),33)
 def test_unknown_schema(self):
  with self.assertRaises(GraphValidationError):ObjectGraphValidator().validate_graph([{'type':'UNKNOWN','id':'bad:001','status':'CANDIDATE'}])
 def test_unicode_digest_and_tamper(self):
  q=make_envelope('QUESTION','question:001',{'stem':'ΔE = ½mv²'},status='SYNTHETIC'); a=make_envelope('ASSESSMENT','assessment:001',{'question':exact_ref(q)},dependencies=[exact_ref(q)],status='SYNTHETIC')
  self.assertEqual(ObjectGraphValidator(True).validate_graph([q,a]),2);q['payload']['stem']='ΔE = mv²'
  with self.assertRaisesRegex(GraphValidationError,'stale digest'):ObjectGraphValidator(True).validate_graph([q,a])
 def test_wrong_payload_ref_and_extra_type(self):
  q=make_envelope('QUESTION','question:001',{},status='SYNTHETIC');q2=make_envelope('QUESTION','question:002',{},status='SYNTHETIC');l=make_envelope('CONCEPT','concept:001',{},status='SYNTHETIC')
  a=make_envelope('ASSESSMENT','assessment:001',{'question':exact_ref(q2)},dependencies=[exact_ref(q)],status='SYNTHETIC')
  with self.assertRaisesRegex(GraphValidationError,'payload reference'):ObjectGraphValidator(True).validate_graph([q,q2,a])
  a['payload']['question']=exact_ref(q);a['dependencies'].append(exact_ref(l))
  with self.assertRaisesRegex(GraphValidationError,'typed edge'):ObjectGraphValidator(True).validate_graph([q,l,a])
 def test_untrusted_approval(self):
  x=make_envelope('APPROVAL','approval:001',{'author':'x','reviewer':'x'})
  with self.assertRaises(GraphValidationError):ObjectGraphValidator().validate_graph([x])
 def test_unrelated_and_duplicate(self):
  g=self.fixture('graph.json');g.append(make_envelope('QUESTION','question:unrelated',{},status='SYNTHETIC'));self.assertEqual(ObjectGraphValidator(True).validate_graph(g),9)
  with self.assertRaises(GraphValidationError):ObjectGraphValidator(True).validate_graph(g+[g[0]])
