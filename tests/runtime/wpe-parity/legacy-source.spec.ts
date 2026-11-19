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
test('A54 exact source conveyor moving arrival, speed-dependent feed and energy ledger',()=>{
 const g=P['WPE-C07'].guide,f=P['WPE-C07'].fresh;
 const check=(o:any,values:any[])=>[o.mass_rate,o.force,o.motor_power,o.kinetic_rate,o.heat_rate].forEach((v,i)=>eq(v,values[i]));
 check(evaluate('CONVEYOR_MOMENTUM_POWER',{mass_rate:g.mass_flow_kg_s,speed:g.belt_speed_m_s,incoming_speed:g.incoming_speed_m_s}),[g.mass_flow_kg_s,g.force_n,g.motor_power_w,g.kinetic_gain_w,g.slip_heat_w]);
 const same=evaluate('CONVEYOR_MOMENTUM_POWER',{mass_rate:g.mass_flow_kg_s,speed:g.belt_speed_m_s,incoming_speed:g.boundary_incoming_speed_m_s});eq(same.force,g.boundary_pickup_force_n);
 const o=evaluate('CONVEYOR_MOMENTUM_POWER',{mass_rate:g.variable_feeder_flow_kg_s,speed:g.variable_feeder_speed_m_s});eq(o.motor_power,g.variable_feeder_power_w);
 const p={flow_coefficient:f.flow_coefficient_kg_m,speed:f.belt_speed_m_s,incoming_speed:f.incoming_speed_m_s};
 check(evaluate('CONVEYOR_MOMENTUM_POWER',p),[f.mass_flow_kg_s,f.force_n,f.motor_power_w,f.kinetic_gain_w,f.slip_heat_w]);
 check(evaluate('CONVEYOR_MOMENTUM_POWER',{...p,speed:f.boundary_belt_speed_m_s}),[f.boundary_mass_flow_kg_s,f.boundary_force_n,f.boundary_motor_power_w,f.boundary_kinetic_gain_w,f.boundary_slip_heat_w]);
});
test('A54 exact source repeated bounces, changed first retention and finite travel',()=>{
 const g=E['WPE-E04'].guide,f=E['WPE-E04'].fresh;
 const check=(p:any,heights:number[],distance:number,ratio:number)=>{
  const o=evaluate('DISSIPATIVE_BOUNCES',p);
  for(let i=0;i<heights.length;i++)eq(o.rebound_heights[i],heights[i]);
  eq(o.total_distance,distance);eq(o.first_speed_ratio,ratio);
 };
 check({initial_height:g.initial_height_m,first_retention:g.retained_energy_fraction,later_retention:g.retained_energy_fraction},g.first_three_rebound_heights_m,g.total_distance_m,g.speed_ratio);
 check({initial_height:f.initial_height_m,first_retention:f.first_impact_retention,later_retention:f.later_impact_retention},f.first_three_rebound_heights_m,f.total_distance_m,f.first_speed_ratio);
 const b=evaluate('DISSIPATIVE_BOUNCES',{initial_height:f.initial_height_m,first_retention:f.boundary_all_impacts_retention,later_retention:f.boundary_all_impacts_retention});
 eq(b.total_distance,f.boundary_total_distance_m);
});

// Extract only numerical data at runtime from exact, separately checked-out
// author packs. No source prompt, answer key or native numerical fixture is copied
// into target files. A changed extraction fails closed instead of guessing.
const pack=(family:string)=>exact(prefix+family+'_LEARNING_PACK.md',pins[family]!);
function numbers(s:string,pattern:RegExp,count:number):number[]{
 const m=pattern.exec(s);assert(m&&m.length===count+1,'pinned source numerical extraction failed');
 const values=m.slice(1).map(Number);assert(values.every(Number.isFinite),'invalid source numeral');return values;
}
function sections(s:string){
 const guide=s.split('## Core1A')[1]?.split('## Core1B')[0];
 const fresh=s.split('## Core1B')[1]?.split('## Author-only reference')[0];
 const answer=s.split('## Author-only reference')[1];assert(guide&&fresh&&answer,'source sections missing');
 return {guide,fresh,answer};
}
test('A54 exact-source multi-force guide, fresh ramp and insufficient-energy boundary',()=>{
 const {guide,fresh,answer}=sections(pack('MULTIFORCE_LEDGER'));
 const [m,u,pull,friction,d]=numbers(guide,/A (\d+) kg box is already moving right at (\d+) m\/s[\s\S]*?constant (\d+) N force, while friction is (\d+) N[\s\S]*?travels (\d+) m/,5);
 const [net,k]=numbers(guide,/W_\{\\mathrm\{net\}\}=[^=]+=\+(\d+)\\text\{ J\}[\s\S]*?K_f=[^=]+=(\d+)\\text\{ J\}/,2);
 const a=evaluate('MULTIFORCE_LEDGER',{works:[pull*d,-friction*d,0,0],mass:m,initial_speed:u});eq(a.net,net);eq(a.final_kinetic,k);eq(a.final_speed,Math.sqrt(2*k/m));
 const [fm,fd,h,drive,drag,g]=numbers(fresh,/A (\d+) kg model scooter starts from rest at the bottom of a (\d+) m slope\. The top is ([\d.]+) m higher[\s\S]*?\*\*(\d+) N uphill\*\*[\s\S]*?\*\*(\d+) N downhill\*\*[\s\S]*?g=(\d+)\\text/,6);
 const [fn,fk]=numbers(answer,/W_\{\\mathrm\{net\}\}=[^=]+=\+(\d+)\\text\{ J\}[\s\S]*?K_f=(\d+)\\text\{ J\}/,2);
 const works=(force:number)=>[force*fd,-drag*fd,-fm*g*h,0];
 const o=evaluate('MULTIFORCE_LEDGER',{works:works(drive),mass:fm,initial_speed:0});eq(o.net,fn);eq(o.final_kinetic,fk);eq(o.final_speed,Math.sqrt(2*fk/fm));yes(o.endpoint_energy_feasible,true);
 const [boundary]=numbers(fresh,/drops from \*\*\d+ N to (\d+) N\*\*/,1);
 const [deficit]=numbers(answer,/total work would be -(\d+) J/,1);
 const b=evaluate('MULTIFORCE_LEDGER',{works:works(boundary),mass:fm,initial_speed:0});eq(b.net,-deficit);eq(b.energy_deficit,deficit);yes(b.endpoint_energy_feasible,false);assert(!Object.hasOwn(b,'final_speed'));
});
test('A54 exact-source unattached spring smooth release, rough strip and stopping boundary',()=>{
 const {guide,fresh,answer}=sections(pack('SPRING_CONTACT'));
 const [m,x,k]=numbers(guide,/A (\d+) kg cart starts at rest[\s\S]*?compressed by ([\d.]+) m\. The spring stiffness is (\d+) N\/m/,3);
 const [energy,speed]=numbers(guide,/K=(\d+)\\text\{ J\}[\s\S]*?giving \\\(v=(\d+)\\text/,2);
 const a=evaluate('SPRING_CONTACT',{mode:'TWO_REGION',m,x,k,friction:0,distance:1});eq(a.release_energy,energy);eq(a.release_speed,speed);eq(a.final_speed,speed);yes(a.reaches_end,true);yes(a.stops,false);
 const [fm,fk,fx,fd,fr]=numbers(fresh,/A (\d+) kg toy cart[\s\S]*?stiffness (\d+) N\/m compressed by ([\d.]+) m[\s\S]*?\*\*([\d.]+) m rough strip\*\*[\s\S]*?constant (\d+) N friction/,5);
 const [re,rs,fw,fe]=numbers(answer,/K_\{\\mathrm\{release\}\}=([\d.]+)\\text\{ J\}[\s\S]*?=\s*([\d.]+)\\text\{ m\/s\}[\s\S]*?W_f=[^=]+=-([\d.]+)\\text\{ J\}[\s\S]*?K_f=([\d.]+)\\text\{ J\}/,4);
 const p={mode:'TWO_REGION',m:fm,x:fx,k:fk,friction:fr,distance:fd};const o=evaluate('SPRING_CONTACT',p);
 eq(o.release_energy,re);eq(o.release_speed,rs);eq(o.friction_work,-fw);eq(o.final_energy,fe);eq(o.final_speed,Math.sqrt(2*fe/fm));yes(o.reaches_end,true);
 const [stop]=numbers(fresh,/strip's length to \*\*([\d.]+) m\*\*/,1);
 const b=evaluate('SPRING_CONTACT',{...p,distance:stop});eq(b.boundary_distance,stop);eq(b.final_speed,0);yes(b.reaches_end,true);
 const beyond=evaluate('SPRING_CONTACT',{...p,distance:stop*2});eq(beyond.travelled,stop);eq(beyond.final_speed,0);yes(beyond.reaches_end,false);
});
test('A54 exact-source graph axes, signed linear operations and selected interval',()=>{
 const {guide,fresh}=sections(pack('GRAPH_OPERATION'));const g=P['WPE-C05'].guide,f=P['WPE-C05'].fresh;
 const [force,x0,x1]=numbers(guide,/horizontal at \\\(\+(\d+)\\text\{ N\}\\\) from \\\(x=(\d+)\\\) to \\\(x=(\d+)\\text\{ m\}/,3);
 const graph=(operation:string,span:number,start:number,end:number)=>evaluate('GRAPH_OPERATION',{operation,span,start,end});
 eq(graph('FORCE_POSITION_AREA',x1-x0,force,force).work,g.force_rectangle_work_j);
 const points=(s:string,pattern:RegExp)=>numbers(s,pattern,4);
 const [a,u,b,v]=points(guide,/runs from \\\(\((\d+)\\text\{ m\},(\d+)\\text\{ J\}\)\\\) to \\\(\((\d+)\\text\{ m\},(\d+)\\text\{ J\}\)/);
 eq(graph('POTENTIAL_POSITION_SLOPE',b-a,u,v).force,g.potential_force_n);
 const [c,s0,d,s1]=points(guide,/runs from \\\(\((\d+)\\text\{ s\},(\d+)\\text\{ m\}\)\\\) to \\\(\((\d+)\\text\{ s\},(\d+)\\text\{ m\}\)/);
 eq(graph('DISPLACEMENT_TIME_SLOPE',d-c,s0,s1).velocity,g.displacement_time_velocity_m_s);
 const [r0,y0,r1,y1]=points(fresh,/from \\\(\(x=(\d+)\\text\{ m\},F_x=(\d+)\\text\{ N\}\)\\\) to \\\(\(x=(\d+)\\text\{ m\},F_x=(\d+)\\text\{ N\}\)/);
 eq(graph('FORCE_POSITION_AREA',r1-r0,y0,y1).work,f.force_position_triangle_work_j);
 eq(graph('FORCE_TIME_AREA',r1-r0,y0,y1).impulse,f.boundary_force_time_impulse_n_s);
 const [z0,p0,z1,p1]=points(fresh,/Potential rises linearly from \\\(\((\d+)\\text\{ m\},(\d+)\\text\{ J\}\)\\\) to \\\(\((\d+)\\text\{ m\},(\d+)\\text\{ J\}\)/);
 eq(graph('POTENTIAL_POSITION_SLOPE',z1-z0,p0,p1).force,f.potential_position_force_n);
 const [t0,q0,t1,q1,t2,q2]=numbers(fresh,/through \\\(\((\d+)\\text\{ s\},(\d+)\\text\{ m\}\)\\\), \\\(\((\d+)\\text\{ s\},(\d+)\\text\{ m\}\)\\\), \\\(\((\d+)\\text\{ s\},(\d+)\\text\{ m\}\)/,6);
 assert(t0<t1&&t1<t2);eq(graph('DISPLACEMENT_TIME_SLOPE',t2-t1,q1,q2).velocity,f.second_interval_velocity_m_s);
 console.log('A54 exact-source scalar/boolean comparisons: '+comparisons+'; 13-family bounded numerical overlap only; full parity NOT_GRANTED');
});
