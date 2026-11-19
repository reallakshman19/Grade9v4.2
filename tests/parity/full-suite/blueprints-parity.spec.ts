// Source crosswalk only: not a mounted learner UI or an acceptance receipt.
import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {source,paths} from '../legacy_pilot_harness.spec.ts';
test('A73 exact native registry and proposed target crosswalk agree on all seven role contracts',()=>{
 const native=JSON.parse(source().read(paths.blueprints).toString('utf8'));
 const map=JSON.parse(readFileSync('docs/architecture/native-blueprint-map.json','utf8'));
 assert.equal(native.registry_version,map.registry_version);
 assert.equal(native.shell.id+'@'+native.shell.version,map.native_shell);
 assert.equal(native.blueprints.length,7);assert.equal(map.blueprints.length,7);
 for(const [i,b] of native.blueprints.entries()){
  const row=map.blueprints.find((x:any)=>x.blueprint_id===b.id+'@'+b.version);
  assert(row);assert(b.core_roles.includes(row.target_role));assert.equal(row.layout_mode,b.layout_family);
  assert.equal(row.source_pointer,'/blueprints/'+i);
  assert.deepEqual(row.native_slots,b.slots);
  for(const k of ['interaction_policy','representation_policy','responsive_policy','touch_policy','packaging_modes','forbidden','presentation_policy','route']){
   assert.deepEqual(row.native_policies[k],b[k],row.target_role+' '+k);
  }
  assert.equal(b.touch_policy.minimum_target_css_px,48);
  assert.equal(b.touch_policy.minimum_control_gap_css_px,8);
 }
 assert.equal(new Set(map.blueprints.map((x:any)=>x.target_role)).size,7);
 assert.equal(map.status,'HOLD');
});
