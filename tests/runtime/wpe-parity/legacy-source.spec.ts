// Run only after exact read-only legacy checkout. No source values logged,
 // no source JS/Python executed, no legacy content copied into the target.
import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {execFileSync} from 'node:child_process';
import {join} from 'node:path';
import {evaluateWpeModel as evaluate} from '../../../web/adapters/physics/models/wpe-oracles.ts';
const root=process.env.G9_WPE_LEGACY_ROOT;
if(!root)throw Error('G9_WPE_LEGACY_ROOT required for exact-source comparison');
const prefix='WPE_Source_to_Core1A_Concept/learning-bridge/';
const pins:Record<string,string>={
 MULTIFORCE_LEDGER:'ee4fb95f4528e8fc2bd2c43719406f414f315be2',SPRING_CONTACT:'56ac029f37bc805acbdc296b2f3d55ebdc53b0ca',
 CONSTANT_POWER:'46794134580e69654318325b9e8247cb1fc24d18',DISTRIBUTED_MASS:'78097c0c64319a0dcc949da445fb67e6add1afcc',
 GRAPH_OPERATION:'0649efda3c2cef0c77b258d8a8ac15421cdfb7ed',VERTICAL_CIRCLE:'33e5bd5a7111c95e01c33dc38eee930e9739a3e2',
 CONVEYOR_MOMENTUM_POWER:'5e967434d72f3222efe9ba2675980720f94eff1d',SPRING_CONTROLLED_VARIABLE:'d90dda5d33fe90f09d1b567f4ae605546d882d0b',
 POTENTIAL_WELLS:'09c390ae63ae2679668981a948a80d04e8f0a698',INSTANTANEOUS_POWER:'774ae362a4f7f255c7231fe0398e38884041878f',
 SPRING_PROJECTILE_TRANSITION:'866de59ca3ffec38a854c77a91a6fe95053dd4fa',DISSIPATIVE_BOUNCES:'be3f103a058c9fb504bc7beeb49fa4df2396ab18',
 RADIAL_FORCE_POTENTIAL:'546c4a9078cb639097acfdea019c5d098054bc52'};
const git=(...args:string[])=>execFileSync('git',['--no-replace-objects','-C',root,...args],{encoding:'utf8'}).trim();
function exact(path:string,blob:string){const raw=readFileSync(join(root,path));assert(createHash('sha1').update('blob '+raw.length+'\0').update(raw).digest('hex')===blob,'source blob mismatch');return raw.toString('utf8');}
assert(git('rev-parse','HEAD')==='564ad2a07fddc0fdd30d103674b3eca61235a54b');
assert(git('rev-parse','HEAD^{tree}')==='703ee4d6ffcd0021a1dc1f8fda1cec61e149d149');
assert(git('status','--porcelain','--untracked-files=no')==='');
const bridge=JSON.parse(exact(prefix+'P0_P1_CONSTRUCTION_BRIDGE.json','255683fa36b2df733838f23a8b86b804aa812b8e'));
const src=JSON.parse(exact('physics/wpe/learn-challenge-source-map.json','b7e8449419e68398b8440c527ef5a05cbe2af811'));
const P=bridge.solution_checks,E=bridge.extension_solution_checks;
let comparisons=0;
function eq(a:number,b:number){assert(typeof a==='number'&&typeof b==='number'&&Number.isFinite(a)&&Number.isFinite(b)&&Math.abs(a-b)<=1e-10*Math.max(1,Math.abs(b)),'source numerical comparison failed');comparisons++;}
function yes(a:boolean,b:boolean){assert(a===b,'source boolean comparison failed');comparisons++;}
test('A54 all thirteen exact legacy author packs and six-stage source contract, zero admissions',()=>{
 assert(Object.keys(pins).length===13);assert(bridge.constructions.length===8&&bridge.extensions_backlog.length===5);
 assert(bridge.native_admissions===0&&bridge.owner_approval===false&&bridge.qrt_approval===false);
 assert(src.auth.native_core1a==='NOT_ACCEPTED'&&src.auth.native_core1b==='NOT_ACCEPTED');
 assert(src.auth.qrt==='NOT_RUN'&&src.auth.owner==='PENDING');
 assert(bridge.core1b_contract.join(',')==='PREDICT,ATTEMPT,RECONSTRUCT,DIAGNOSE,REPAIR,BOUNDARY_TEST');
 const names=[...bridge.constructions.map((v:any)=>v.first_pair),...bridge.extensions_backlog.map((v:any)=>v.pack)];
 assert(names.length===13&&new Set(names).size===13);
 for(const [family,blob] of Object.entries(pins)){
  const filename=family+'_LEARNING_PACK.md';assert(names.includes(filename));
  const pack=exact(prefix+filename,blob);
  assert(pack.includes('## Core1A')&&pack.includes('## Core1B')&&pack.includes('Author-only reference')&&[1,2,3,4,5,6].every(i=>pack.includes('### 0'+i)),'pack structure mismatch');
 }
 console.log('A54 exact legacy source inventory: 13 author packs, 8+5, zero admissions');
});
test('A54 exact source numerical overlap: constant power, distributed mass, vertical circle, spring control',()=>{
 let f=P['WPE-C03'].fresh;
 for(const g of [P['WPE-C03'].guide,f])for(let i=0;i<g.time_s.length;i++){const o=evaluate('CONSTANT_POWER',{mass:g.mass_kg,initial_speed:g.initial_m_s,power:g.power_w,time:g.time_s[i]});eq(o.speed,g.speed_m_s[i]);if(g.kinetic_j)eq(o.kinetic,g.kinetic_j[i]);}
 eq(evaluate('CONSTANT_POWER',{mass:f.mass_kg,initial_speed:f.initial_m_s,power:f.boundary_power_w,time:f.boundary_time_s}).speed,f.boundary_speed_m_s);
 for(const g of [P['WPE-C04'].guide,P['WPE-C04'].fresh]){const p={density:g.mass_kg/g.length_m,g:10,initial:g.initial_hanging_m,final:g.final_hanging_m};eq(evaluate('DISTRIBUTED_MASS',p).lift_work,g.lift_work_j);if(g.boundary_final_hanging_m!==undefined)eq(evaluate('DISTRIBUTED_MASS',{...p,final:g.boundary_final_hanging_m}).lift_work,g.boundary_lift_work_j);}
 const g=P['WPE-C06'].guide;f=P['WPE-C06'].fresh;
 eq(evaluate('VERTICAL_CIRCLE',{m:g.mass_kg,g:10,r:g.radius_m,bottom_v_squared:g.bottom_speed_squared}).top_tension,g.top_tension_n);
 const p={m:f.mass_kg,g:10,r:f.radius_m,bottom_v_squared:f.bottom_speed_m_s**2},o=evaluate('VERTICAL_CIRCLE',p);eq(o.top_v_squared,f.top_speed_squared);eq(o.top_tension,f.top_tension_n);yes(o.taut,f.taut_string_possible);
 const b=evaluate('VERTICAL_CIRCLE',{...p,bottom_v_squared:f.boundary_bottom_speed_m_s**2});eq(b.top_v_squared,f.boundary_top_speed_squared);eq(b.top_tension,f.boundary_top_tension_n);
 for(const g of [P['WPE-C08'].guide,P['WPE-C08'].fresh]){const [k1,k2]=g.derived_k_n_m??[g.spring_a_k_n_m,g.spring_b_k_n_m],p={k1,k2,force:g.equal_final_force_n,extension:g.equal_extension_m},o=evaluate('SPRING_CONTROLLED_VARIABLE',p);for(let i=0;i<2;i++){eq(o.fixed_force_energies[i],g.force_energy_j[i]);eq(o.fixed_extension_energies[i],g.extension_energy_j[i]);if(g.boundary_force_n!==undefined)eq(evaluate('SPRING_CONTROLLED_VARIABLE',{...p,force:g.boundary_force_n}).fixed_force_energies[i],g.boundary_force_energy_j[i]);}}
});
test('A54 exact source numerical overlap: sampled wells, instantaneous power, launch, single bounce, radial force',()=>{
 let f=E['WPE-E01'].fresh;const positions=[-2,0,2],potential=positions.map(q=>(q*q-4)**2);
 yes(evaluate('POTENTIAL_WELLS',{energy:f.total_energy_j,barrier:f.barrier_u_j,positions,potential}).crossing,f.crossing_possible);
 yes(evaluate('POTENTIAL_WELLS',{energy:f.boundary_total_energy_j,barrier:f.barrier_u_j,positions,potential}).crossing,true);
 f=E['WPE-E02'].fresh;
 // Legacy drag entries are already signed components, not magnitudes.
 const force=[f.motor_right_n+f.drag_left_n,f.drag_back_n];
 eq(evaluate('INSTANTANEOUS_POWER',{force,velocity:[f.v_right_m_s,f.v_forward_m_s]}).power,f.net_power_w);
 eq(evaluate('INSTANTANEOUS_POWER',{force,velocity:[f.boundary_v_right_m_s,f.boundary_v_forward_m_s]}).power,f.boundary_net_power_w);
 f=E['WPE-E03'].fresh;
 const p={k:f.spring_k_n_m,x:f.compression_m,friction:f.contact_friction_n,m:f.mass_kg,g:f.gravity_m_s2,height:f.height_m},o=evaluate('SPRING_PROJECTILE_TRANSITION',p);
 eq(o.launch_kinetic,f.launch_kinetic_j);eq(o.speed,f.launch_speed_m_s);eq(o.time,f.flight_time_s);eq(o.range,f.range_m);
 const b=evaluate('SPRING_PROJECTILE_TRANSITION',{...p,friction:f.boundary_friction_n});eq(b.speed,f.boundary_launch_speed_m_s);eq(b.time,f.boundary_flight_time_s);eq(b.range,f.boundary_range_m);
 f=E['WPE-E04'].fresh;
 const impact=Math.sqrt(2*10*f.initial_height_m),bounce=evaluate('DISSIPATIVE_BOUNCES',{mass:1,impact_speed:impact,restitution:Math.sqrt(f.first_impact_retention)});
 eq(bounce.rebound_speed/impact,f.first_speed_ratio);eq(bounce.rebound_speed**2/20,f.first_three_rebound_heights_m[0]);
 const g=E['WPE-E05'].guide;f=E['WPE-E05'].fresh;
 const a=evaluate('RADIAL_FORCE_POTENTIAL',{break_radius:0,f0:g.inward_force_magnitude_n,r:g.circular_radius_m,f_at_r:g.inward_force_magnitude_n,mass:g.mass_kg});eq(a.potential,g.potential_energy_j);eq(a.v_squared,g.speed_squared_m2_s2);eq(a.kinetic,g.kinetic_energy_j);eq(a.total,g.total_energy_j);
 const r={break_radius:f.inner_radius_m,f0:f.inner_force_n,r:f.orbit_radius_m,f_at_r:f.local_inward_force_n,mass:f.mass_kg};
 const v=evaluate('RADIAL_FORCE_POTENTIAL',r);eq(v.potential,f.potential_energy_j);eq(v.v_squared,f.speed_squared_m2_s2);eq(v.kinetic,f.kinetic_energy_j);eq(v.total,f.total_energy_j);
 const w=evaluate('RADIAL_FORCE_POTENTIAL',{...r,r:f.boundary_radius_m,f_at_r:f.boundary_local_inward_force_n});eq(w.potential,f.boundary_potential_energy_j);eq(w.v_squared,f.boundary_speed_squared_m2_s2);eq(w.kinetic,f.boundary_kinetic_energy_j);eq(w.total,f.boundary_total_energy_j);
});
test('A54 exact source conveyor stationary subset; nonzero arrival is explicitly unsupported',()=>{
 const g=P['WPE-C07'].guide,f=P['WPE-C07'].fresh;
 const o=evaluate('CONVEYOR_MOMENTUM_POWER',{mass_rate:g.variable_feeder_flow_kg_s,speed:g.variable_feeder_speed_m_s});eq(o.motor_power,g.variable_feeder_power_w);
 assert(f.incoming_speed_m_s>0,'source regime changed');
 assert.throws(()=>evaluate('CONVEYOR_MOMENTUM_POWER',{mass_rate:f.mass_flow_kg_s,speed:f.belt_speed_m_s,incoming_speed:f.incoming_speed_m_s}));
 console.log('A54 exact-source scalar/boolean comparisons: '+comparisons+'; 10 families bounded overlap; full parity NOT_GRANTED');
});
