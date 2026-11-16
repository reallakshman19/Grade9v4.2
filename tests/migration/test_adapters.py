import copy,hashlib,json,sys,unittest
from pathlib import Path
ROOT=Path(__file__).resolve().parents[2];sys.path.insert(0,str(ROOT/'src'))
from grade9build.importers import QuestionImporter,CoreRoleImporter,ImporterError,MissingFigureError,UnknownRouteError
from grade9build.reconcile import RouteLedger,ReconciliationEngine
from grade9build.graph import ObjectGraphValidator
class AdapterTests(unittest.TestCase):
 def args(self,data):
  raw=json.dumps({'records':[data],'meta':{'unicode':'Δ'}},ensure_ascii=False).encode()
  return dict(snapshot_id='test:'+'1'*40,source_path='bank.json',raw_bytes=raw,expected_sha256=hashlib.sha256(raw).hexdigest(),json_pointer='/records/0',collection_paths=['/records'],synthetic=True)
 def test_end_to_end(self):
  x={'id':'Q1','stem':'½mv²','options':[{'id':'A','text':'α'}],'answer':{'status':'VERIFIED','value':'A'},'op':None,'unknown':{'x/y':[]}}
  a=QuestionImporter('TEST_267').import_question(**self.args(x));o=a['objects'][-1];self.assertEqual(o['payload']['raw_record'],x);self.assertEqual(o['payload']['candidate_claims']['assessment']['status'],'HOLD');self.assertEqual(o['payload']['candidate_claims']['qrt']['raw_claims'],{'op':None});self.assertEqual(a['field_audit']['unmapped_leaves'],0);self.assertEqual(ObjectGraphValidator(True).validate_graph(a['objects']),2)
  self.assertEqual(ReconciliationEngine.generate_public_safe_projection([a])['projections'],[])
 def test_figures(self):
  data=b'<svg/>';x={'source_figures':[{'id':'f','mandatory':True,'content_sha256':hashlib.sha256(data).hexdigest(),'caption':'retain'}],'figures':[{'id':'g','mandatory':False,'caption':'also retain'}]};imp=QuestionImporter('TEST_A')
  for assets in ({},{'f':b'wrong'}):
   with self.assertRaises(MissingFigureError):imp.import_question(available_assets=assets,**self.args(x))
  a=imp.import_question(available_assets={'f':data},**self.args(x));self.assertEqual(a['objects'][-1]['payload']['raw_record'],x);self.assertEqual(len(a['objects'][-1]['payload']['candidate_claims']['figure_claims']),2)
 def test_real_import_blocked(self):
  args=self.args({'id':'Q1'});args['synthetic']=False
  with self.assertRaises(ImporterError):QuestionImporter('LEGACY_267').import_question(**args)
 def test_native_route_binding(self):
  ledger=RouteLedger();mapping=json.loads((ROOT/'docs/architecture/native-blueprint-map.json').read_text());self.assertEqual(len(mapping['blueprints']),7)
  for b in mapping['blueprints']:
   raw={'role_id':b['target_role'],'blueprint_id':b['blueprint_id'],'layout_mode':b['layout_mode'],'slot_bindings':{s['id']:'synthetic' for s in b['native_slots'] if s['required']}}
   a=CoreRoleImporter('TEST_ROLE').import_role_configuration(**self.args(raw));self.assertEqual(a['objects'][-1]['payload']['candidate_claims']['role'],b['target_role'])
   self.assertEqual(ledger.resolve_route('/blueprints/'+b['target_role'].lower())['blueprint_id'],b['blueprint_id'])
  with self.assertRaises(UnknownRouteError):ledger.resolve_route('/blueprints/core3')
  bad={'role_id':'CORE3','blueprint_id':'BP-CORE1-ORIENTATION@1.1.0','layout_mode':'READING_ORIENTATION','slot_bindings':{}}
  with self.assertRaises(ImporterError):CoreRoleImporter('TEST_ROLE').import_role_configuration(**self.args(bad))
 def test_portable_packages(self):
  ledger=RouteLedger();self.assertEqual({r['package_id'] for r in ledger.data['portable_packages']},{'portable-long-division','portable-redox-electron-equivalence','portable-integration-riemann','portable-motion-shared-clock'})
 def test_promotion_blocked(self):
  a=QuestionImporter('TEST_A').import_question(**self.args({'id':'Q1'}));a['objects'][-1]['payload']['candidate_claims']['assessment']['status']='VERIFIED'
  with self.assertRaises(ImporterError):ReconciliationEngine.audit_candidate_claims(a)
