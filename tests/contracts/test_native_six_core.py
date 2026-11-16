"""Source-backed A57 checks; exact source comparison requires authorized v3.5 Git custody."""
import json, os, subprocess, unittest
from pathlib import Path
ROOT=Path(__file__).resolve().parents[2]
PIN='8a02a8eb23ea37a7d8acb74d1bc193dd17657e5b'
TREE='c00cd1dc4ce65d5e8602de133d07e30a4934ad6a'
ROLES={'CORE1','CORE1A','CORE1B','CORE2','CORE2A','CORE2B'}
def read_map(name):return json.loads((ROOT/'docs/architecture'/name).read_text())
class NativeTests(unittest.TestCase):
 def setUp(self):
  self.roles=read_map('native-six-core-map.json');self.bp=read_map('native-blueprint-map.json')
 def test_role_and_component_coverage(self):
  self.assertEqual(set(self.roles['roles']),ROLES)
  self.assertEqual({b['target_role'] for b in self.bp['blueprints']},ROLES|{'EXPLORER'})
  self.assertEqual(self.roles['governing_pins']['v35_tree'],TREE)
  self.assertEqual(self.roles['governing_pins']['v41_tree'],'703ee4d6ffcd0021a1dc1f8fda1cec61e149d149')
  self.assertEqual(self.roles['status'],'HOLD');self.assertEqual(self.bp['status'],'HOLD')
  by_role={b['target_role']:b for b in self.bp['blueprints']}
  for role,entry in self.roles['roles'].items():
   b=by_role[role]; self.assertEqual(entry['template']['web_blueprint_ref'],b['blueprint_id'])
   self.assertEqual([r['block'] for r in entry['block_bindings']],[x['id'] for x in entry['template']['ordered_blocks']])
   for r in entry['block_bindings']:
    self.assertEqual(r['native_slots'],[s['id'] for s in b['native_slots'] if r['block'] in s['accepts_blocks']])
   self.assertEqual({r['component_id'] for r in b['component_bindings']},{c['id'] for c in b['native_components']})
  self.assertEqual(len(by_role['CORE1A']['native_components']),17);self.assertEqual(len(by_role['CORE2']['native_components']),15);self.assertEqual(len(by_role['EXPLORER']['native_components']),18)
 def test_native_source_replay(self):
  path=os.environ.get('G9_V35_ROOT')
  if not path:self.skipTest('NOT_RUN: G9_V35_ROOT must identify authorized source Git custody')
  def git(*args):return subprocess.check_output(['git','-C',path,*args])
  self.assertEqual(git('rev-parse',PIN+'^{tree}').decode().strip(),TREE)
  def source(p):return git('show',PIN+':'+p).decode('utf-8')
  import re
  def fenced(p,tag):return json.loads(re.search(r'```'+tag+r'\s*\n([\s\S]*?)```',source(p)).group(1))
  reg=json.loads(source('Shared/web/interactive-page-blueprints.v1.json'))
  templates=fenced('Shared/roles/LEARNER-PRODUCT-TEMPLATES.md','core-templates');auth=fenced('Shared/roles/CORE-AUTHORITY-CONTRACT.md','core-authority')
  self.assertEqual(self.roles['native_authority'],auth)
  self.assertEqual(set(self.roles['roles']),set(templates['roles']))
  for role,r in self.roles['roles'].items():self.assertEqual(r['template'],templates['roles'][role]);self.assertEqual(r['authority'],auth['roles'][role])
  self.assertEqual(self.bp['shell_fields'],sorted(reg['shell']))
  self.assertEqual(self.bp['component_policy_fields'],sorted(reg['component_policy']))
  self.assertEqual(len(self.bp['blueprints']),len(reg['blueprints']))
  for i,(r,b) in enumerate(zip(self.bp['blueprints'],reg['blueprints'])):
   self.assertEqual(r['source_pointer'],'/blueprints/'+str(i));self.assertEqual(r['blueprint_id'],b['id']+'@'+b['version']);self.assertEqual(r['native_slots'],b['slots'])
   self.assertEqual(r['native_components'],[{k:c[k] for k in ('id','slot','level','compact_order') if k in c} for c in b.get('components',[])])
   self.assertEqual(r['native_field_names'],sorted(b))
   for j,c in enumerate(b.get('components',[])):self.assertEqual(r['component_bindings'][j]['native_fields'],sorted(c))
   for k in ('interaction_policy','responsive_policy','touch_policy','representation_policy'):self.assertEqual(r['native_policies'][k],b[k])
