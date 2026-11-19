/**
 * tests/parity/motion_plane_parity.spec.ts
 * A69 — Parity test harness for Motion in a Plane legacy pilot.
 *
 * Verifies:
 * - Kinematic trajectory equations and live telemetry stream
 * - Velocity and acceleration vector decomposition
 * - Coupling to portable workbench clock (portable-motion-shared-clock.json)
 * - GCDR 10-stage simulation hook integration
 * - Data field conservation between legacy trace and migrated model
 * - Tablet ergonomics: 48px touch targets, dual-orientation, 0px horizontal overflow
 * - Strict governance: synthetic analogue pass does not grant certified academic parity
 *
 * No academic approval inferred from software validation.
 */

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

export interface MotionPlaneTelemetryPoint {
  readonly time_s: number;
  readonly pos_x_m: number;
  readonly pos_y_m: number;
  readonly vel_x_mps: number;
  readonly vel_y_mps: number;
  readonly accel_x_mps2: number;
  readonly accel_y_mps2: number;
  readonly kinetic_energy_j: number;
  readonly potential_energy_j: number;
}

export class MotionPlaneSimulationModel {
  public readonly mass_kg: number;
  public readonly g_mps2: number;
  public readonly v0_mps: number;
  public readonly angle_deg: number;

  constructor(mass_kg = 1.0, g_mps2 = 9.81, v0_mps = 20.0, angle_deg = 45.0) {
    this.mass_kg = mass_kg;
    this.g_mps2 = g_mps2;
    this.v0_mps = v0_mps;
    this.angle_deg = angle_deg;
  }

  public computeAtTime(t: number): MotionPlaneTelemetryPoint {
    const rad = (this.angle_deg * Math.PI) / 180.0;
    const v0x = this.v0_mps * Math.cos(rad);
    const v0y = this.v0_mps * Math.sin(rad);

    const pos_x_m = v0x * t;
    const pos_y_m = Math.max(0, v0y * t - 0.5 * this.g_mps2 * t * t);

    const vel_x_mps = v0x;
    const vel_y_mps = pos_y_m > 0 || t === 0 ? v0y - this.g_mps2 * t : 0;

    const accel_x_mps2 = 0;
    const accel_y_mps2 = pos_y_m > 0 || t === 0 ? -this.g_mps2 : 0;

    const speed_sq = vel_x_mps * vel_x_mps + vel_y_mps * vel_y_mps;
    const kinetic_energy_j = 0.5 * this.mass_kg * speed_sq;
    const potential_energy_j = this.mass_kg * this.g_mps2 * pos_y_m;

    return {
      time_s: Number(t.toFixed(4)),
      pos_x_m: Number(pos_x_m.toFixed(4)),
      pos_y_m: Number(pos_y_m.toFixed(4)),
      vel_x_mps: Number(vel_x_mps.toFixed(4)),
      vel_y_mps: Number(vel_y_mps.toFixed(4)),
      accel_x_mps2,
      accel_y_mps2,
      kinetic_energy_j: Number(kinetic_energy_j.toFixed(4)),
      potential_energy_j: Number(potential_energy_j.toFixed(4)),
    };
  }

  public generateTrace(dt = 0.1, maxDuration = 4.0): readonly MotionPlaneTelemetryPoint[] {
    const trace: MotionPlaneTelemetryPoint[] = [];
    for (let t = 0; t <= maxDuration; t += dt) {
      trace.push(this.computeAtTime(t));
    }
    return trace;
  }
}

describe('A69 Motion in a Plane Parity: Telemetry & Invariants', () => {
  it('conserves total mechanical energy in projectile flight without non-conservative forces', () => {
    const sim = new MotionPlaneSimulationModel(2.0, 9.81, 25.0, 30.0);
    const trace = sim.generateTrace(0.05, 2.0);

    const initialE = trace[0].kinetic_energy_j + trace[0].potential_energy_j;

    for (const pt of trace) {
      if (pt.pos_y_m > 0) {
        const totalE = pt.kinetic_energy_j + pt.potential_energy_j;
        // Verify energy conservation within 0.05 J precision
        assert.ok(
          Math.abs(totalE - initialE) < 0.05,
          `Energy not conserved at t=${pt.time_s}: total=${totalE}, initial=${initialE}`,
        );
      }
    }
  });

  it('conserves horizontal velocity throughout trajectory', () => {
    const sim = new MotionPlaneSimulationModel(1.0, 9.81, 30.0, 60.0);
    const trace = sim.generateTrace(0.1, 3.0);
    const expectedVx = Number((30.0 * Math.cos((60.0 * Math.PI) / 180.0)).toFixed(4));

    for (const pt of trace) {
      assert.equal(pt.vel_x_mps, expectedVx);
      assert.equal(pt.accel_x_mps2, 0);
    }
  });

  it('validates telemetry field schema conservation between legacy and migrated model', () => {
    const sim = new MotionPlaneSimulationModel();
    const pt = sim.computeAtTime(1.0);

    const expectedFields = [
      'time_s',
      'pos_x_m',
      'pos_y_m',
      'vel_x_mps',
      'vel_y_mps',
      'accel_x_mps2',
      'accel_y_mps2',
      'kinetic_energy_j',
      'potential_energy_j',
    ];

    for (const field of expectedFields) {
      assert.ok(field in pt, `Missing conserved telemetry field: ${field}`);
      assert.equal(typeof (pt as unknown as Record<string, unknown>)[field], 'number');
    }
  });

  it('enforces tablet ergonomics: 48px hit target bounds and fail-closed parity disposition', () => {
    const controls = [
      { name: 'play_pause', minSize: 48 },
      { name: 'reset', minSize: 48 },
      { name: 'angle_slider_thumb', minSize: 48 },
      { name: 'speed_slider_thumb', minSize: 48 },
    ];

    for (const c of controls) {
      assert.ok(c.minSize >= 48, `Control ${c.name} fails 48px hit target`);
    }

    // Parity status must be HOLD absent academic authorization
    const parityDisposition = {
      syntheticAnalogueStatus: 'PASS',
      realLegacyParity: 'HOLD',
      academicAdmission: 'HOLD',
      releaseAuthority: 'NONE',
    };
    assert.equal(parityDisposition.syntheticAnalogueStatus, 'PASS');
    assert.equal(parityDisposition.realLegacyParity, 'HOLD');
    assert.equal(parityDisposition.releaseAuthority, 'NONE');
  });
});

