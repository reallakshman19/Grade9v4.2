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

test('signed ledger endpoint feasibility and frictionless contact preserve physical boundaries',()=>{
 assert.deepEqual(evaluate('MULTIFORCE_LEDGER',{works:[15,-4,-2,0],mass:2,initial_speed:2}),{net:9,endpoint_energy_feasible:true,final_kinetic:13,final_speed:Math.sqrt(13)});
 assert.deepEqual(evaluate('MULTIFORCE_LEDGER',{works:[-6],mass:2,initial_speed:1}),{net:-6,endpoint_energy_feasible:false,energy_deficit:5});
 const p={k:50,x:.4,m:2,friction:0,distance:9};
 const o=evaluate('SPRING_CONTACT',p);assert.equal(o.stops,false);assert.equal(o.final_energy,o.release_energy);assert(!Object.hasOwn(o,'boundary_distance'));
 assert.equal(evaluate('SPRING_CONTACT',{...p,x:0}).boundary_distance,0);
 assert.throws(()=>evaluate('SPRING_CONTACT',{...p,friction:-1}));
 assert.throws(()=>evaluate('MULTIFORCE_LEDGER',{works:[1],mass:0,initial_speed:1}));
});
test('axis-specific signed graph area and slope distinguish work, impulse, force and velocity',()=>{
 const p={span:5,start:-3,end:-3};
 assert.deepEqual(evaluate('GRAPH_OPERATION',{...p,operation:'FORCE_POSITION_AREA'}),{work:-15});
 assert.deepEqual(evaluate('GRAPH_OPERATION',{...p,end:1,operation:'FORCE_TIME_AREA'}),{impulse:-5});
 assert.deepEqual(evaluate('GRAPH_OPERATION',{span:4,start:1,end:9,operation:'POTENTIAL_POSITION_SLOPE'}),{force:-2});
 assert.deepEqual(evaluate('GRAPH_OPERATION',{span:2,start:9,end:3,operation:'DISPLACEMENT_TIME_SLOPE'}),{velocity:-3});
 for(const bad of [{...p,operation:'UNKNOWN'},{...p,span:0,operation:'FORCE_POSITION_AREA'},{...p,end:Infinity,operation:'FORCE_TIME_AREA'},{...p,operation:'FORCE_POSITION_AREA',extra:1}])assert.throws(()=>evaluate('GRAPH_OPERATION',bad));
});
test('conveyor moving pickup closes momentum and energy and rejects unsupported regimes',()=>{
 const p={speed:6,incoming_speed:2,flow_coefficient:.5};
 assert.deepEqual(evaluate('CONVEYOR_MOMENTUM_POWER',p),{mass_rate:3,force:12,kinetic_rate:48,motor_power:72,heat_rate:24});
 assert.deepEqual(evaluate('CONVEYOR_MOMENTUM_POWER',{...p,incoming_speed:6}),{mass_rate:3,force:0,kinetic_rate:0,motor_power:0,heat_rate:0});
 for(const bad of [{...p,incoming_speed:7},{...p,incoming_speed:-1},{...p,mass_rate:3},{...p,flow_coefficient:-1}])assert.throws(()=>evaluate('CONVEYOR_MOMENTUM_POWER',bad));
});
test('repeated bounce energy retention differs from speed ratio; divergent tails fail closed',()=>{
 const p={initial_height:4,first_retention:.5,later_retention:.25};
 assert.deepEqual(evaluate('DISSIPATIVE_BOUNCES',p),{rebound_heights:[2,.5,.125],total_distance:4+4/.75,first_speed_ratio:Math.sqrt(.5)});
 assert.deepEqual(evaluate('DISSIPATIVE_BOUNCES',{...p,first_retention:0,later_retention:1}),{rebound_heights:[0,0,0],total_distance:4,first_speed_ratio:0});
 for(const bad of [{...p,later_retention:1},{...p,first_retention:1.1},{...p,initial_height:-1},{...p,restitution:.5}])assert.throws(()=>evaluate('DISSIPATIVE_BOUNCES',bad));
});

test('two-region spring tracks actual travelled distance, signed friction work and endpoint feasibility',()=>{
 const p={mode:'TWO_REGION',k:80,x:.5,m:2,friction:4,distance:1};
 assert.deepEqual(evaluate('SPRING_CONTACT',p),{release_energy:10,release_speed:Math.sqrt(10),friction_work:-4,final_energy:6,final_speed:Math.sqrt(6),travelled:1,reaches_end:true,boundary_distance:2.5});
 const stopped=evaluate('SPRING_CONTACT',{...p,distance:3});assert.equal(stopped.travelled,2.5);assert.equal(stopped.friction_work,-10);assert.equal(stopped.final_speed,0);assert.equal(stopped.reaches_end,false);
 const at=evaluate('SPRING_CONTACT',{...p,distance:2.5});assert.equal(at.reaches_end,true);assert.equal(at.final_speed,0);
 const smooth=evaluate('SPRING_CONTACT',{...p,friction:0,distance:3});assert.equal(smooth.final_speed,smooth.release_speed);assert.equal(smooth.friction_work,0);assert.equal(smooth.stops,false);
 const rest=evaluate('SPRING_CONTACT',{...p,x:0,friction:0});assert.equal(rest.travelled,0);assert.equal(rest.reaches_end,false);
 for(const bad of [{...p,mode:'unknown'},{...p,extra:1},{...p,m:0},{...p,friction:-1}])assert.throws(()=>evaluate('SPRING_CONTACT',bad));
});
