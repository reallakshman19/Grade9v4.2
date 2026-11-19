import {test} from 'node:test';
import assert from 'node:assert/strict';
import {evaluateWpeModel as evaluate,validateWpeModel} from '../../web/adapters/physics/models/wpe-oracles.ts';
import {defaultCapabilityRegistry} from '../../web/runtime/capabilities.ts';
import {RESPONSE_KINDS} from '../../web/runtime/response.ts';
test('sampled two-well barrier must match a unique separating peak; equality is not traversal',()=>{
 const base={positions:[-3,-2,0,2,3],potential:[10,1,7,1,10],barrier:7};
 assert.deepEqual(evaluate('POTENTIAL_WELLS',{...base,energy:6}),{accessible_indices:[1,3],crossing:false});
 assert.equal(evaluate('POTENTIAL_WELLS',{...base,energy:7}).crossing,false);
 assert.equal(evaluate('POTENTIAL_WELLS',{...base,energy:8}).crossing,true);
 for(const barrier of [1,6,8,10]){const p={...base,barrier,energy:6};assert(!validateWpeModel('POTENTIAL_WELLS',p).isValid);assert.throws(()=>evaluate('POTENTIAL_WELLS',p));}
 assert.throws(()=>evaluate('POTENTIAL_WELLS',{positions:[0,1,2,3,4],potential:[0,4,0,5,0],barrier:5,energy:6}));
 assert.equal(evaluate('POTENTIAL_WELLS',{positions:[0,1,2,3],potential:[0,4,4,0],barrier:4,energy:5}).crossing,true);
});
test('all response-kind handlers are registered; multipart structure and malformed child tested (not R4 archetype acceptance)',()=>{
 assert.equal(RESPONSE_KINDS.length,13);
 assert.deepEqual([...defaultCapabilityRegistry.getRegisteredKinds()].sort(),[...RESPONSE_KINDS].sort());
 const cap=defaultCapabilityRegistry.get('MULTIPART')!;
 assert(cap.validate({a:{kind:'INTEGER',value:'7'},b:{kind:'SINGLE_CHOICE',value:'choice-a'}}).ok);
 assert(!cap.validate({a:{kind:'INTEGER',value:'not an integer'}}).ok);
 assert(!cap.validate({}).ok);
});
