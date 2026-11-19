/**
 * tests/runtime/wpe-parity/models.spec.ts
 * Workpack A54: WPE 13 Analytical Model Oracles and Domain Verification Suite.
 *
 * Verifies:
 * 1. Exact mathematical calculations for all 13 WPE model families:
 *    - MULTIFORCE_LEDGER
 *    - SPRING_CONTACT
 *    - CONSTANT_POWER
 *    - DISTRIBUTED_MASS
 *    - GRAPH_OPERATION
 *    - VERTICAL_CIRCLE
 *    - POTENTIAL_WELLS
 *    - SPRING_PROJECTILE_TRANSITION
 *    - RADIAL_FORCE_POTENTIAL
 *    - INSTANTANEOUS_POWER
 *    - CONVEYOR_MOMENTUM_POWER
 *    - DISSIPATIVE_BOUNCES
 *    - SPRING_CONTROLLED_VARIABLE
 * 2. Harmonic energy well turning points, equilibrium, conservation (U + K = 12.5 J).
 * 3. Domain boundaries and strict rejection of NaN, Infinity, and out-of-bound inputs.
 * 4. Pure analytical functions without eval() or runtime code injection.
 *
 * No academic approval inferred from software validation.
 * academic_admission: HOLD
 * release_authority: NONE
 */

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import {
  calculateEnergyWell,
  HarmonicEnergyWellAdapter,
  ValueError,
} from '../../../web/adapters/physics/models/energy-well.ts';

import {
  evaluateWpeModel,
} from '../../../web/adapters/physics/models/wpe-oracles.ts';

function isClose(a: number, b: number, tol = 1e-6): boolean {
  return Math.abs(a - b) <= tol;
}

// ---------------------------------------------------------------------------
// 1. All 13 WPE Model Families
// ---------------------------------------------------------------------------
describe('A54: 13 WPE Synthetic Analytical Models', () => {
  it('Family 1: MULTIFORCE_LEDGER computes signed sum of work terms', () => {
    const res = evaluateWpeModel('MULTIFORCE_LEDGER', { works: [100, -30, -20, 50] });
    assert.equal(res['net'], 100);
  });

  it('Family 2: SPRING_CONTACT calculates release energy, dissipation, and boundary stopping distance', () => {
    // k = 200 N/m, x = 0.5 m, m = 1 kg -> E = 0.5 * 200 * 0.25 = 25 J. friction = 5 N, distance = 3 m -> work_friction = 15 J. final_energy = 10 J. boundary_distance = 25 / 5 = 5 m.
    const res = evaluateWpeModel('SPRING_CONTACT', { k: 200, x: 0.5, m: 1, friction: 5, distance: 3 });
    assert.equal(res['release_energy'], 25);
    assert.equal(res['final_energy'], 10);
    assert.equal(res['boundary_distance'], 5);
  });

  it('Family 3: CONSTANT_POWER accumulates kinetic energy and derives final speed', () => {
    // mass = 2 kg, initial_speed = 3 m/s (K_0 = 9 J), power = 8 W, time = 2 s -> delta_K = 16 J. K_f = 25 J -> v_f = 5 m/s.
    const res = evaluateWpeModel('CONSTANT_POWER', { mass: 2, initial_speed: 3, power: 8, time: 2 });
    assert.equal(res['kinetic'], 25);
    assert.equal(res['speed'], 5);
  });

  it('Family 4: DISTRIBUTED_MASS calculates center-of-mass work to hoist uniform hanging chain', () => {
    // density = 2 kg/m, g = 9.8, initial length = 4 m, final length = 0 m -> lift_work = 0.5 * 2 * 9.8 * 16 = 156.8 J
    const res = evaluateWpeModel('DISTRIBUTED_MASS', { density: 2, g: 9.8, initial: 4, final: 0 });
    assert.ok(isClose(res['lift_work'], 156.8));
  });

  it('Family 5: GRAPH_OPERATION computes triangular area work and conservative force F = -dU/dx', () => {
    // base = 4 m, height = 10 N -> area = 20 J. potential_delta = -30 J, distance = 5 m -> force = -(-30) / 5 = 6 N
    const res = evaluateWpeModel('GRAPH_OPERATION', { base: 4, height: 10, potential_delta: -30, distance: 5 });
    assert.equal(res['area'], 20);
    assert.equal(res['force'], 6);
  });

  it('Family 6: VERTICAL_CIRCLE calculates top velocity squared and string taut tension', () => {
    // bottom_v_squared = 50, g = 10, r = 1 -> top_v_squared = 50 - 40 = 10 (>= 0). m = 2 -> T = 2 * (10/1 - 10) = 0 N (taut critical)
    const res = evaluateWpeModel('VERTICAL_CIRCLE', { bottom_v_squared: 50, g: 10, r: 1, m: 2 });
    assert.equal(res['top_v_squared'], 10);
    assert.equal(res['top_tension'], 0);
    assert.equal(res['taut'], true);
  });

  it('Family 7: POTENTIAL_WELLS checks barrier crossing and accessible domain indices', () => {
    const potential = [10, 20, 35, 50, 15];
    const positions = [0, 1, 2, 3, 4];
    const res = evaluateWpeModel('POTENTIAL_WELLS', { positions, potential, energy: 30, barrier: 45 });
    assert.deepEqual(res['accessible_indices'], [0, 1, 4]);
    assert.equal(res['crossing'], false);

    const resOver = evaluateWpeModel('POTENTIAL_WELLS', { positions, potential, energy: 50, barrier: 45 });
    assert.equal(resOver['crossing'], true);
  });

  it('Family 8: SPRING_PROJECTILE_TRANSITION evaluates spring release, friction loss, launch speed, and flight range', () => {
    // k = 1000, x = 0.2 -> E = 20 J. friction = 20 N * 0.2 m = 4 J -> K = 16 J. m = 2 -> v = 4 m/s. height = 4.9 m, g = 9.8 -> t = 1 s -> range = 4 m.
    const res = evaluateWpeModel('SPRING_PROJECTILE_TRANSITION', { k: 1000, x: 0.2, friction: 20, m: 2, height: 4.9, g: 9.8 });
    assert.equal(res['launch_kinetic'], 16);
    assert.equal(res['speed'], 4);
    assert.ok(isClose(res['time'], 1.0));
    assert.ok(isClose(res['range'], 4.0));
  });

  it('Family 9: RADIAL_FORCE_POTENTIAL integrates piecewise central force potential and orbital kinetic energy', () => {
    // break_radius = 2, f0 = 10, r = 4, f_at_r = 6, mass = 3
    // U = 2 * 10 + 0.5 * 2 * 16 = 20 + 16 = 36. v2 = 4 * 6 / 3 = 8. K = 0.5 * 3 * 8 = 12. total = 48.
    const res = evaluateWpeModel('RADIAL_FORCE_POTENTIAL', { break_radius: 2, f0: 10, r: 4, f_at_r: 6, mass: 3 });
    assert.equal(res['potential'], 36);
    assert.equal(res['v_squared'], 8);
    assert.equal(res['kinetic'], 12);
    assert.equal(res['total'], 48);
  });

  it('Family 10: INSTANTANEOUS_POWER computes dot product of force and velocity vectors', () => {
    // F = [3, 4, -2], v = [2, -1, 5] -> P = 6 - 4 - 10 = -8 W
    const res = evaluateWpeModel('INSTANTANEOUS_POWER', { force: [3, 4, -2], velocity: [2, -1, 5] });
    assert.equal(res['power'], -8);
  });

  it('Family 11: CONVEYOR_MOMENTUM_POWER evaluates steady-state belt force, kinetic energy rate, and motor power', () => {
    // mass_rate = 5 kg/s, speed = 4 m/s -> force = 20 N, kinetic_rate = 0.5 * 5 * 16 = 40 W, motor_power = 5 * 16 = 80 W
    const res = evaluateWpeModel('CONVEYOR_MOMENTUM_POWER', { mass_rate: 5, speed: 4 });
    assert.equal(res['force'], 20);
    assert.equal(res['kinetic_rate'], 40);
    assert.equal(res['motor_power'], 80);
  });

  it('Family 12: DISSIPATIVE_BOUNCES derives restitution velocity and mechanical energy dissipation', () => {
    // impact_speed = 10 m/s, restitution = 0.8 -> rebound = 8 m/s. mass = 2 kg -> initial_K = 100 J, final_K = 64 J -> loss = 36 J
    const res = evaluateWpeModel('DISSIPATIVE_BOUNCES', { impact_speed: 10, restitution: 0.8, mass: 2 });
    assert.equal(res['rebound_speed'], 8);
    assert.equal(res['energy_loss'], 36);
  });

  it('Family 13: SPRING_CONTROLLED_VARIABLE compares fixed-force vs fixed-extension spring energies', () => {
    // force = 20 N, extension = 0.1 m, k1 = 100 N/m, k2 = 400 N/m
    // fixed_force_energies: 0.5 * 400 / 100 = 2 J, 0.5 * 400 / 400 = 0.5 J
    // fixed_extension_energies: 0.5 * 100 * 0.01 = 0.5 J, 0.5 * 400 * 0.01 = 2 J
    const res = evaluateWpeModel('SPRING_CONTROLLED_VARIABLE', { force: 20, extension: 0.1, k1: 100, k2: 400 });
    assert.deepEqual(res['fixed_force_energies'], [2, 0.5]);
    assert.deepEqual(res['fixed_extension_energies'], [0.5, 2]);
  });
});

// ---------------------------------------------------------------------------
// 2. Harmonic Energy Well Adapter & Limit Verification
// ---------------------------------------------------------------------------
describe('A54: Harmonic Energy Well Limits and Domain Invariants', () => {
  const adapter = new HarmonicEnergyWellAdapter();

  it('maintains strict mechanical energy conservation U(x) + K(x) = 12.5 J across domain', () => {
    const testPoints = [-0.5, -0.25, 0.0, 0.25, 0.5];
    for (const x of testPoints) {
      const res = calculateEnergyWell(x);
      assert.ok(isClose(res.U + res.K, 12.5), `Energy balance violated at x = ${x}`);
      assert.ok(isClose(0.5 * res.v * res.v, res.K), `Kinetic formula violated at x = ${x}`);
    }
  });

  it('computes exact turning points at x = +/- 0.5 where v = 0 and K = 0', () => {
    const neg = calculateEnergyWell(-0.5);
    assert.equal(neg.U, 12.5);
    assert.equal(neg.K, 0);
    assert.equal(neg.v, 0);

    const pos = calculateEnergyWell(0.5);
    assert.equal(pos.U, 12.5);
    assert.equal(pos.K, 0);
    assert.equal(pos.v, 0);
  });

  it('computes minimum potential well at x = 0 where U = 0 and v = 5.0 m/s', () => {
    const eq = calculateEnergyWell(0.0);
    assert.equal(eq.U, 0);
    assert.equal(eq.K, 12.5);
    assert.equal(eq.v, 5.0);
  });

  it('rejects out-of-domain inputs, NaN, Infinity, and non-numeric types', () => {
    const invalidInputs = [0.51, -0.51, NaN, Infinity, -Infinity, '0.0', true, null, undefined];
    for (const bad of invalidInputs) {
      assert.throws(() => calculateEnergyWell(bad as any), ValueError);
    }
  });

  it('rejects unknown model family name with ValueError', () => {
    assert.throws(() => evaluateWpeModel('UNKNOWN_ORACLE_FAMILY', {}), ValueError);
  });
});
