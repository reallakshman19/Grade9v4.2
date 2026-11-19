/**
 * tests/parity/full-suite/wpe-analytical-parity.spec.ts
 * Workpack A73 — Complete six-Core and legacy parity audit: 13 WPE Analytical Model Families.
 *
 * Verifies exact closed-form analytical solutions, energy conservation invariants,
 * boundary limits, and parameter validation across all 13 WPE model families:
 * 1. MULTIFORCE_LEDGER
 * 2. SPRING_CONTACT
 * 3. CONSTANT_POWER
 * 4. DISTRIBUTED_MASS
 * 5. GRAPH_OPERATION
 * 6. VERTICAL_CIRCLE
 * 7. POTENTIAL_WELLS
 * 8. SPRING_PROJECTILE_TRANSITION
 * 9. RADIAL_FORCE_POTENTIAL
 * 10. INSTANTANEOUS_POWER
 * 11. CONVEYOR_MOMENTUM_POWER
 * 12. DISSIPATIVE_BOUNCES
 * 13. SPRING_CONTROLLED_VARIABLE
 */

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { evaluateWpeModel } from '../../../web/adapters/physics/models/wpe-oracles.ts';

function isClose(a: number, b: number, tol = 1e-6): boolean {
  return Math.abs(a - b) <= tol;
}

describe('A73: 13 WPE Synthetic Analytical Models Parity Suite', () => {
  it('Family 1: MULTIFORCE_LEDGER computes signed sum of work terms', () => {
    const res = evaluateWpeModel('MULTIFORCE_LEDGER', { works: [100, -30, -20, 50] });
    assert.strictEqual(res['net'], 100);
  });

  it('Family 2: SPRING_CONTACT calculates release energy, dissipation, and boundary stopping distance', () => {
    const res = evaluateWpeModel('SPRING_CONTACT', { k: 200, x: 0.5, m: 1, friction: 5, distance: 3 });
    assert.strictEqual(res['release_energy'], 25);
    assert.strictEqual(res['final_energy'], 10);
    assert.strictEqual(res['boundary_distance'], 5);
  });

  it('Family 3: CONSTANT_POWER accumulates kinetic energy and derives final speed', () => {
    const res = evaluateWpeModel('CONSTANT_POWER', { mass: 2, initial_speed: 3, power: 8, time: 2 });
    assert.strictEqual(res['kinetic'], 25);
    assert.strictEqual(res['speed'], 5);
  });

  it('Family 4: DISTRIBUTED_MASS calculates center-of-mass work to hoist uniform hanging chain', () => {
    const res = evaluateWpeModel('DISTRIBUTED_MASS', { density: 2, g: 9.8, initial: 4, final: 0 });
    assert.ok(isClose(res['lift_work'], 156.8));
  });

  it('Family 5: GRAPH_OPERATION computes triangular area work and conservative force F = -dU/dx', () => {
    const res = evaluateWpeModel('GRAPH_OPERATION', { base: 4, height: 10, potential_delta: -30, distance: 5 });
    assert.strictEqual(res['area'], 20);
    assert.strictEqual(res['force'], 6);
  });

  it('Family 6: VERTICAL_CIRCLE calculates top velocity squared and string taut tension', () => {
    const res = evaluateWpeModel('VERTICAL_CIRCLE', { bottom_v_squared: 50, g: 10, r: 1, m: 2 });
    assert.strictEqual(res['top_v_squared'], 10);
    assert.strictEqual(res['top_tension'], 0);
    assert.strictEqual(res['taut'], true);
  });

  it('Family 7: POTENTIAL_WELLS checks barrier crossing and accessible domain indices', () => {
    const potential = [10, 20, 35, 50, 15];
    const positions = [0, 1, 2, 3, 4];
    const res = evaluateWpeModel('POTENTIAL_WELLS', { positions, potential, energy: 30, barrier: 45 });
    assert.deepStrictEqual(res['accessible_indices'], [0, 1, 4]);
    assert.strictEqual(res['crossing'], false);

    const resOver = evaluateWpeModel('POTENTIAL_WELLS', { positions, potential, energy: 50, barrier: 45 });
    assert.strictEqual(resOver['crossing'], true);
  });

  it('Family 8: SPRING_PROJECTILE_TRANSITION evaluates spring release, friction loss, launch speed, and flight range', () => {
    const res = evaluateWpeModel('SPRING_PROJECTILE_TRANSITION', { k: 1000, x: 0.2, friction: 20, m: 2, height: 4.9, g: 9.8 });
    assert.strictEqual(res['launch_kinetic'], 16);
    assert.strictEqual(res['speed'], 4);
    assert.ok(isClose(res['time'], 1.0));
    assert.ok(isClose(res['range'], 4.0));
  });

  it('Family 9: RADIAL_FORCE_POTENTIAL integrates piecewise central force potential and orbital kinetic energy', () => {
    const res = evaluateWpeModel('RADIAL_FORCE_POTENTIAL', { break_radius: 2, f0: 10, r: 4, f_at_r: 6, mass: 3 });
    assert.strictEqual(res['potential'], 36);
    assert.strictEqual(res['v_squared'], 8);
    assert.strictEqual(res['kinetic'], 12);
    assert.strictEqual(res['total'], 48);
  });

  it('Family 10: INSTANTANEOUS_POWER computes dot product of force and velocity vectors', () => {
    const res = evaluateWpeModel('INSTANTANEOUS_POWER', { force: [3, 4, -2], velocity: [2, -1, 5] });
    assert.strictEqual(res['power'], -8);
  });

  it('Family 11: CONVEYOR_MOMENTUM_POWER evaluates steady-state belt force, kinetic energy rate, and motor power', () => {
    const res = evaluateWpeModel('CONVEYOR_MOMENTUM_POWER', { mass_rate: 5, speed: 4 });
    assert.strictEqual(res['force'], 20);
    assert.strictEqual(res['kinetic_rate'], 40);
    assert.strictEqual(res['motor_power'], 80);
  });

  it('Family 12: DISSIPATIVE_BOUNCES derives restitution velocity and mechanical energy dissipation', () => {
    const res = evaluateWpeModel('DISSIPATIVE_BOUNCES', { impact_speed: 10, restitution: 0.8, mass: 2 });
    assert.strictEqual(res['rebound_speed'], 8);
    assert.strictEqual(res['energy_loss'], 36);
  });

  it('Family 13: SPRING_CONTROLLED_VARIABLE compares fixed-force vs fixed-extension spring energies', () => {
    const res = evaluateWpeModel('SPRING_CONTROLLED_VARIABLE', { force: 20, extension: 0.1, k1: 100, k2: 400 });
    assert.deepStrictEqual(res['fixed_force_energies'], [2, 0.5]);
    assert.deepStrictEqual(res['fixed_extension_energies'], [0.5, 2]);
  });

  it('strictly rejects unknown family or invalid parameter types', () => {
    assert.throws(() => {
      evaluateWpeModel('UNKNOWN_FAMILY', {});
    }, /Unknown family|ValueError/);

    assert.throws(() => {
      evaluateWpeModel('SPRING_CONTACT', { k: -200, x: 0.5 });
    }, /Unknown family or incorrect parameter keys|ValueError/);
  });
});

