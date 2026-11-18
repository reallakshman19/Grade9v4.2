/**
 * web/adapters/physics/models/wpe-oracles.ts
 * A50 — Thirteen WPE synthetic oracle model adapters matching exact R3/R4 parity.
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

export function evaluateWpeModel(
  family: string,
  params: Record<string, any>
): Record<string, any> {
  if (family === 'MULTIFORCE_LEDGER') {
    const works: number[] = params['works'] || [];
    const net = works.reduce((acc, w) => acc + w, 0);
    return { net };
  }

  if (family === 'SPRING_CONTACT') {
    const k: number = params['k'];
    const x: number = params['x'];
    const friction: number = params['friction'];
    const distance: number = params['distance'];
    const release_energy = 0.5 * k * x * x;
    const final_energy = Math.max(0, release_energy - friction * distance);
    const boundary_distance = release_energy / friction;
    return { release_energy, final_energy, boundary_distance };
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
    const crossing = energy >= barrier;
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
    const mass_rate: number = params['mass_rate'];
    const speed: number = params['speed'];
    const force = mass_rate * speed;
    const kinetic_rate = 0.5 * mass_rate * speed * speed;
    const motor_power = mass_rate * speed * speed;
    return { force, kinetic_rate, motor_power };
  }

  if (family === 'DISSIPATIVE_BOUNCES') {
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
    validate(_params: Record<string, number>): ModelValidationResult {
      return { isValid: true, errors: [] };
    },
    evaluate(params: Record<string, any>): Record<string, any> {
      return evaluateWpeModel(family, params);
    },
  };
}
