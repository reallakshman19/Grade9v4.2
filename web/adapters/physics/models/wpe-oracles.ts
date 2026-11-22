/**
 * web/adapters/physics/models/wpe-oracles.ts
 * A50/A54 — Bounded WPE diagnostic model adapters; not complete R3/R4 parity.
 *
 * Implements:
 * - 1. MULTIFORCE_LEDGER: Signed work terms and net work calculation.
 * - 2. SPRING_CONTACT: Stored spring energy, friction dissipation, and stopping distance.
 * - 3. CONSTANT_POWER: Kinetic energy accumulation under constant power and final speed.
 * - 4. DISTRIBUTED_MASS: Center of mass work to hoist uniform rope/chain.
 * - 5. GRAPH_OPERATION: Triangular area integration and conservative force F = -dU/dx.
 * - 6. VERTICAL_CIRCLE: Energy conservation on vertical loop, top string tension, and taut condition.
 * - 7. POTENTIAL_WELLS: Piecewise potential well barrier crossing and accessible domain indices.
 * - 8. SPRING_PROJECTILE_TRANSITION: Spring launch across friction surface followed by projectile range.
 * - 9. RADIAL_FORCE_POTENTIAL: Central force potential integration, orbital kinetic energy, and total energy.
 * - 10. INSTANTANEOUS_POWER: Vector dot product power P = F · v.
 * - 11. CONVEYOR_MOMENTUM_POWER: Mass-rate steady state force, kinetic energy rate, and motor power.
 * - 12. DISSIPATIVE_BOUNCES: Coefficient of restitution velocity drop and mechanical energy loss.
 * - 13. SPRING_CONTROLLED_VARIABLE: Fixed-force versus fixed-extension spring energy comparison.
 *
 * No academic approval inferred from software validation.
 */

import { ValueError } from './energy-well.ts';
import type { ScientificModelAdapter, ModelValidationResult } from './types.ts';

function calculate(
  family: string,
  params: Record<string, any>
): Record<string, any> {
  if (family === 'MULTIFORCE_LEDGER') {
    const works: number[] = params['works'] || [];
    const net = works.reduce((acc, w) => acc + w, 0);
    if(Object.hasOwn(params,'mass')){
      const endpoint = .5*params.mass*params.initial_speed**2+net;
      // Endpoint energy is necessary, not sufficient for intermediate path reachability.
      if(endpoint<0)return {net,endpoint_energy_feasible:false,energy_deficit:-endpoint};
      return {net,endpoint_energy_feasible:true,final_kinetic:endpoint,final_speed:Math.sqrt(2*endpoint/params.mass)};
    }
    return { net };
  }

  if (family === 'SPRING_CONTACT') {
    const k: number = params['k'];
    const x: number = params['x'];
    const friction: number = params['friction'];
    const distance: number = params['distance'];
    const release_energy = 0.5 * k * x * x;
    const final_energy = Math.max(0, release_energy - friction * distance);
    // A smooth track has no finite friction-induced stop. Never emit Infinity.
    const stopping=release_energy===0||friction>0;
    const boundary_distance=release_energy===0?0:friction>0?release_energy/friction:null;
    if(params.mode==='TWO_REGION'){
      const travelled=boundary_distance===null?distance:Math.min(distance,boundary_distance);
      const reaches_end=boundary_distance===null||distance<=boundary_distance;
      const friction_work=travelled===0||friction===0?0:-friction*travelled;
      const final_kinetic=Math.max(0,release_energy+friction_work);
      const phase={release_energy,release_speed:Math.sqrt(2*release_energy/params.m),friction_work,final_energy:final_kinetic,final_speed:Math.sqrt(2*final_kinetic/params.m),travelled,reaches_end};
      return stopping?{...phase,boundary_distance}:{...phase,stops:false};
    }
    if(boundary_distance===null)return {release_energy,final_energy,stops:false};
    return {release_energy,final_energy,boundary_distance};
  }

  if (family === 'CONSTANT_POWER') {
    const mass: number = params['mass'];
    const initial_speed: number = params['initial_speed'];
    const power: number = params['power'];
    const time: number = params['time'];
    const kinetic = 0.5 * mass * initial_speed * initial_speed + power * time;
    const speed = Math.sqrt((2 * kinetic) / mass);
    return { kinetic, speed };
  }

  if (family === 'DISTRIBUTED_MASS') {
    const density: number = params['density'];
    const g: number = params['g'];
    const initial: number = params['initial'];
    const final: number = params['final'];
    const lift_work = 0.5 * density * g * (initial * initial - final * final);
    return { lift_work };
  }

  if (family === 'GRAPH_OPERATION') {
    if(Object.hasOwn(params,'operation')){
      const {operation,span,start,end}=params;
      // Linear segment, signed ordinates; span is positive along the selected axis.
      switch(operation){
        case 'FORCE_POSITION_AREA':return {work:span*(start+end)/2};
        case 'FORCE_TIME_AREA':return {impulse:span*(start+end)/2};
        case 'POTENTIAL_POSITION_SLOPE':return {force:-(end-start)/span};
        case 'DISPLACEMENT_TIME_SLOPE':return {velocity:(end-start)/span};
      }
      throw new ValueError('Unknown graph axis operation');
    }
    const base: number = params['base'];
    const height: number = params['height'];
    const potential_delta: number = params['potential_delta'];
    const distance: number = params['distance'];
    const area = 0.5 * base * height;
    const force = -potential_delta / distance;
    return { area, force };
  }

  if (family === 'VERTICAL_CIRCLE') {
    const m: number = params['m'];
    const g: number = params['g'];
    const r: number = params['r'];
    const bottom_v_squared: number = params['bottom_v_squared'];
    const top_v_squared = bottom_v_squared - 4 * g * r;
    const top_tension = m * (top_v_squared / r - g);
    const taut = top_v_squared >= 0 && top_tension >= 0;
    return { top_v_squared, top_tension, taut };
  }

  if (family === 'POTENTIAL_WELLS') {
    const energy: number = params['energy'];
    const barrier: number = params['barrier'];
    const potential: number[] = params['potential'] || [];
    const accessible_indices: number[] = [];
    for (let i = 0; i < potential.length; i++) {
      if (potential[i]! <= energy) {
        accessible_indices.push(i);
      }
    }
    // The sampled two-well model reports energetic crossing above the barrier.
    // Equality at a smooth unstable maximum is not a traversing trajectory.
    const crossing = energy > barrier;
    return { accessible_indices, crossing };
  }

  if (family === 'SPRING_PROJECTILE_TRANSITION') {
    const k: number = params['k'];
    const x: number = params['x'];
    const friction: number = params['friction'];
    const m: number = params['m'];
    const g: number = params['g'];
    const height: number = params['height'];
    const launch_kinetic = 0.5 * k * x * x - friction * x;
    const speed = Math.sqrt((2 * launch_kinetic) / m);
    const time = Math.sqrt((2 * height) / g);
    const range = speed * time;
    return { launch_kinetic, speed, time, range };
  }

  if (family === 'RADIAL_FORCE_POTENTIAL') {
    const break_radius: number = params['break_radius'];
    const f0: number = params['f0'];
    const r: number = params['r'];
    const f_at_r: number = params['f_at_r'];
    const mass: number = params['mass'];
    const potential = break_radius * f0 + 0.5 * (r - break_radius) * (f0 + f_at_r);
    const v_squared = (r * f_at_r) / mass;
    const kinetic = 0.5 * mass * v_squared;
    const total = potential + kinetic;
    return { potential, v_squared, kinetic, total };
  }

  if (family === 'INSTANTANEOUS_POWER') {
    const force: number[] = params['force'] || [];
    const velocity: number[] = params['velocity'] || [];
    let power = 0;
    const len = Math.min(force.length, velocity.length);
    for (let i = 0; i < len; i++) {
      power += force[i]! * velocity[i]!;
    }
    return { power };
  }

  if (family === 'CONVEYOR_MOMENTUM_POWER') {
    const speed: number = params['speed'];
    const extended=Object.hasOwn(params,'incoming_speed');
    const incoming=extended?params.incoming_speed:0;
    const mass_rate=Object.hasOwn(params,'flow_coefficient')?params.flow_coefficient*speed:params.mass_rate;
    const delta=speed-incoming;
    const force=mass_rate*delta;
    const kinetic_rate=.5*mass_rate*delta*(speed+incoming);
    const motor_power=force*speed;
    const heat_rate=.5*mass_rate*delta*delta;
    return extended?{mass_rate,force,kinetic_rate,motor_power,heat_rate}:{force,kinetic_rate,motor_power};
  }

  if (family === 'DISSIPATIVE_BOUNCES') {
    if(Object.hasOwn(params,'initial_height')){
      const {initial_height,first_retention,later_retention}=params;
      const first=initial_height*first_retention;
      const heights=[first,first*later_retention,first*later_retention**2];
      // A non-decaying positive tail has no finite total distance and is rejected in validation.
      return {rebound_heights:heights,total_distance:initial_height+2*(first===0?0:first/(1-later_retention)),first_speed_ratio:Math.sqrt(first_retention)};
    }
    const mass: number = params['mass'];
    const impact_speed: number = params['impact_speed'];
    const restitution: number = params['restitution'];
    const rebound_speed = impact_speed * restitution;
    const energy_loss = 0.5 * mass * (impact_speed * impact_speed - rebound_speed * rebound_speed);
    return { rebound_speed, energy_loss };
  }

  if (family === 'SPRING_CONTROLLED_VARIABLE') {
    const k1: number = params['k1'];
    const k2: number = params['k2'];
    const force: number = params['force'];
    const extension: number = params['extension'];
    const fixed_force_energies = [
      (0.5 * force * force) / k1,
      (0.5 * force * force) / k2,
    ];
    const fixed_extension_energies = [
      0.5 * k1 * extension * extension,
      0.5 * k2 * extension * extension,
    ];
    return { fixed_force_energies, fixed_extension_energies };
  }

  throw new ValueError(`unknown model family: ${family}`);
}


// Engineering domains deliberately follow the pinned oracle assumptions.
const specs:Record<string,Record<string,'signed'|'positive'|'nonnegative'|'ratio'|'vector'>>={
 MULTIFORCE_LEDGER:{works:'vector'},SPRING_CONTACT:{k:'positive',x:'nonnegative',m:'positive',friction:'nonnegative',distance:'nonnegative'},
 CONSTANT_POWER:{mass:'positive',initial_speed:'nonnegative',power:'nonnegative',time:'nonnegative'},
 DISTRIBUTED_MASS:{density:'positive',g:'positive',initial:'nonnegative',final:'nonnegative'},
 GRAPH_OPERATION:{base:'positive',height:'signed',potential_delta:'signed',distance:'positive'},
 VERTICAL_CIRCLE:{m:'positive',g:'positive',r:'positive',bottom_v_squared:'nonnegative'},
 POTENTIAL_WELLS:{energy:'signed',barrier:'signed',positions:'vector',potential:'vector'},
 SPRING_PROJECTILE_TRANSITION:{k:'positive',x:'positive',friction:'nonnegative',m:'positive',g:'positive',height:'nonnegative'},
 RADIAL_FORCE_POTENTIAL:{break_radius:'nonnegative',f0:'positive',r:'positive',f_at_r:'positive',mass:'positive'},
 INSTANTANEOUS_POWER:{force:'vector',velocity:'vector'},CONVEYOR_MOMENTUM_POWER:{mass_rate:'nonnegative',speed:'nonnegative'},
 DISSIPATIVE_BOUNCES:{mass:'positive',impact_speed:'nonnegative',restitution:'ratio'},
 SPRING_CONTROLLED_VARIABLE:{k1:'positive',k2:'positive',force:'signed',extension:'signed'}
};
const finite=(x:unknown):x is number=>typeof x==='number'&&Number.isFinite(x)&&Math.abs(x)<=1e100;
export function validateWpeModel(family:string,p:Record<string,any>):ModelValidationResult{
 let spec=Object.hasOwn(specs,family)?specs[family]:null;
 const fail=(error:string)=>({isValid:false,errors:[error]});
 if(!spec||!p||typeof p!=='object'||Array.isArray(p))return fail('Unknown family or incorrect parameter keys');
 // Explicit disjoint variants preserve original synthetic wire shapes. No generic optional-key bypass.
 const exact=(keys:string[])=>Object.keys(p).length===keys.length&&keys.every(k=>Object.hasOwn(p,k));
 if(family==='GRAPH_OPERATION'&&Object.hasOwn(p,'operation')){
  if(!exact(['operation','span','start','end'])||!['FORCE_POSITION_AREA','FORCE_TIME_AREA','POTENTIAL_POSITION_SLOPE','DISPLACEMENT_TIME_SLOPE'].includes(p.operation)||!finite(p.span)||p.span<=0||!finite(p.start)||!finite(p.end))return fail('Invalid graph axes or linear segment');
  return {isValid:true,errors:[]};
 }
 if(family==='SPRING_CONTACT'&&Object.hasOwn(p,'mode')){
  if(p.mode!=='TWO_REGION'||!exact(['mode','k','x','m','friction','distance']))return fail('Invalid two-region spring parameters');
  const {mode,...numeric}=p;
  return validateWpeModel(family,numeric);
 }
 if(family==='MULTIFORCE_LEDGER'&&Object.hasOwn(p,'mass'))spec={works:'vector',mass:'positive',initial_speed:'nonnegative'};
 if(family==='CONVEYOR_MOMENTUM_POWER'&&Object.hasOwn(p,'incoming_speed')){
  spec=Object.hasOwn(p,'flow_coefficient')?{speed:'nonnegative',incoming_speed:'nonnegative',flow_coefficient:'nonnegative'}:{mass_rate:'nonnegative',speed:'nonnegative',incoming_speed:'nonnegative'};
 }
 if(family==='DISSIPATIVE_BOUNCES'&&Object.hasOwn(p,'initial_height'))spec={initial_height:'nonnegative',first_retention:'ratio',later_retention:'ratio'};
 if(!exact(Object.keys(spec)))return fail('Unknown family or incorrect parameter keys');
 for(const [k,t] of Object.entries(spec)){const v=p[k];if(t==='vector'){if(!Array.isArray(v)||!v.length||v.length>4096||!Array.from(v).every(finite))return fail('Invalid vector: '+k);}
 else if(!finite(v)||t==='positive'&&v<=0||t==='nonnegative'&&v<0||t==='ratio'&&(v<0||v>1))return fail('Invalid domain: '+k);}
 if(family==='DISTRIBUTED_MASS'&&p.final>p.initial||family==='RADIAL_FORCE_POTENTIAL'&&p.r<p.break_radius||family==='SPRING_PROJECTILE_TRANSITION'&&.5*p.k*p.x*p.x-p.friction*p.x<=0)return fail('Unsupported physical regime');
 if(family==='CONVEYOR_MOMENTUM_POWER'&&Object.hasOwn(p,'incoming_speed')&&p.incoming_speed>p.speed)return fail('Incoming material must not exceed belt speed in pickup model');
 if(family==='DISSIPATIVE_BOUNCES'&&Object.hasOwn(p,'initial_height')&&p.later_retention===1&&p.initial_height>0&&p.first_retention>0)return fail('Non-decaying rebounds have no finite total distance');
 if(family==='INSTANTANEOUS_POWER'&&(p.force.length!==p.velocity.length||p.force.length>3))return fail('Vector dimensions differ or exceed 3');
 if(family==='POTENTIAL_WELLS'){
  if(p.positions.length!==p.potential.length||p.positions.length<3||p.positions.some((x:number,i:number)=>i>0&&x<=p.positions[i-1]))return fail('Invalid sampled potential coordinates');
  // One separating sampled peak (including a plateau) must be present. Do not
  // infer a continuous potential or accept caller-selected barrier metadata.
  const u=p.potential as number[],peaks:number[]=[];
  for(let i=1;i<u.length-1;){let j=i;while(j+1<u.length&&u[j+1]===u[i])j++;
   if(j<u.length-1&&u[i]!>u[i-1]!&&u[j]!>u[j+1]!)peaks.push(u[i]!);
   i=j+1;
  }
  if(peaks.length!==1||peaks[0]!==p.barrier)return fail('Unsupported or inconsistent sampled separating barrier');
 }
 return {isValid:true,errors:[]};
}
export function evaluateWpeModel(family:string,p:Record<string,any>):Record<string,any>{
 const v=validateWpeModel(family,p);if(!v.isValid)throw new ValueError(v.errors.join('; '));
 const result=calculate(family,p);if(Object.values(result).some(x=>typeof x==='boolean'?false:Array.isArray(x)?!x.every(Number.isFinite):!Number.isFinite(x)))throw new ValueError('Non-finite model output');
 return result;
}

/**
 * Creates a generic ScientificModelAdapter wrapping one of the 13 WPE model families.
 */
export function createWpeModelAdapter(family: string, name: string): ScientificModelAdapter {
  return {
    id: `PHYS-WPE-${family.replace(/_/g, '-')}`,
    family,
    name,
    description: `Scientific computational model for ${name} (${family}).`,
    parameters: [],
    outputs: [],
    validate(params: Record<string, number>): ModelValidationResult {
      return validateWpeModel(family,params);
    },
    evaluate(params: Record<string, any>): Record<string, any> {
      return evaluateWpeModel(family, params);
    },
  };
}
