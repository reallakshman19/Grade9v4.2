// A54: synthetic oracle regression; exact legacy comparisons run separately.
import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {evaluateWpeModel,validateWpeModel} from '../../../web/adapters/physics/models/wpe-oracles.ts';
import {ModelRegistry} from '../../../web/runtime/models.ts';
const cases=JSON.parse(readFileSync('fixtures/synthetic/r4-wpe-model-cases.json','utf8')) as {family:string;inputs:Record<string,any>;expected:Record<string,any>}[];
function equal(a:any,b:any){if(typeof b==='number'){assert(Number.isFinite(a)&&Math.abs(a-b)<=1e-10*Math.max(1,Math.abs(b)));}else if(Array.isArray(b)){assert(Array.isArray(a)&&a.length===b.length);b.forEach((v,i)=>equal(a[i],v));}else assert.equal(a,b);}
for(const c of cases)test('A54 synthetic numerical '+c.family+'; registry and invalid input negatives',()=>{
 const registry=new ModelRegistry(),id='PHYS-WPE-'+c.family.replaceAll('_','-'),actual=evaluateWpeModel(c.family,c.inputs);
 assert.deepEqual(Object.keys(actual).sort(),Object.keys(c.expected).sort());
 for(const [k,v] of Object.entries(c.expected)){equal(actual[k],v);equal(registry.evaluateDiagnostic(id,c.inputs)[k],v);}
 for(const stage of ['PREDICT','ATTEMPT','RECONSTRUCT','DIAGNOSE','REPAIR','BOUNDARY_TEST','COMPLETE'] as const){
  const r=registry.evaluateWithPolicy(id,c.inputs,stage,['MODEL_AUTO_CALCULATE']);assert(r.isMasked);assert.equal(r.outputs,null);
 }
 for(const k of Object.keys(c.inputs)){
  const omitted={...c.inputs};delete omitted[k];assert(!validateWpeModel(c.family,omitted).isValid);assert.throws(()=>evaluateWpeModel(c.family,omitted));
  const bad={...c.inputs,[k]:Array.isArray(c.inputs[k])?[NaN]:Infinity};assert.throws(()=>evaluateWpeModel(c.family,bad));
 }
 assert.throws(()=>evaluateWpeModel(c.family,{...c.inputs,extra:1}));
});
test('A54 actual physical limit/unsupported-domain regressions',()=>{
 const ev=evaluateWpeModel;
 for(const distance of [1.25,2])assert.equal(ev('SPRING_CONTACT',{k:80,x:.25,m:1.25,friction:2,distance}).final_energy,0);
 assert.equal(ev('VERTICAL_CIRCLE',{m:2,g:10,r:1,bottom_v_squared:50}).taut,true);
 assert.equal(ev('VERTICAL_CIRCLE',{m:2,g:10,r:1,bottom_v_squared:49}).taut,false);
 for(const restitution of [0,1])equal(ev('DISSIPATIVE_BOUNCES',{mass:2,impact_speed:5,restitution}).energy_loss,25*(1-restitution**2));
 for(const [family,p] of [
 ['INSTANTANEOUS_POWER',{force:[1,2],velocity:[1]}],
 ['DISTRIBUTED_MASS',{density:2,g:10,initial:1,final:2}],
 ['POTENTIAL_WELLS',{energy:2,barrier:3,positions:[1,1],potential:[0,1]}],
 ['SPRING_PROJECTILE_TRANSITION',{k:1,x:1,friction:2,m:1,g:10,height:1}],
 ['RADIAL_FORCE_POTENTIAL',{break_radius:2,f0:1,r:1,f_at_r:1,mass:1}],
 ['CONVEYOR_MOMENTUM_POWER',{mass_rate:2,speed:4,incoming_speed:5}],
 ['DISSIPATIVE_BOUNCES',{mass:1,impact_speed:1,restitution:1.1}]
 ] as const)assert.throws(()=>ev(family,p));
 assert.throws(()=>ev('toString',{}));
});
