/**
 * web/adapters/physics/models/energy-well.ts
 * A50 — Harmonic potential energy well model adapter.
 *
 * Implements:
 * - 1D conservative potential well: U(x) = 50 * x^2, Total E = 12.5 J
 * - Kinetic energy: K(x) = 12.5 - U(x)
 * - Speed: v(x) = sqrt(2 * K)
 * - Turning points at x = -0.5 and x = +0.5 (K = 0, v = 0, U = 12.5 J)
 * - Equilibrium at x = 0.0 (U = 0, K = 12.5 J, v = 5.0 m/s)
 * - Strict domain boundary checking: x must be a finite number in [-0.5, 0.5]
 * - Safe purely analytical computation without eval()
 *
 * No academic approval inferred from software validation.
 */

import type {
  ModelParameterDescriptor,
  ModelOutputDescriptor,
  ModelValidationResult,
  ScientificModelAdapter,
} from './types.ts';

export const ENERGY_WELL_PARAMETERS: readonly ModelParameterDescriptor[] = [
  {
    id: 'x',
    name: 'Particle Position',
    symbol: 'x',
    unit: 'm',
    min: -0.5,
    max: 0.5,
    step: 0.01,
    initial: 0.0,
    description: '1D displacement from equilibrium well center [-0.5 m, +0.5 m].',
  },
];

export const ENERGY_WELL_OUTPUTS: readonly ModelOutputDescriptor[] = [
  {
    id: 'U',
    name: 'Potential Energy',
    symbol: 'U',
    unit: 'J',
    description: 'Harmonic potential energy U = 50 * x^2.',
  },
  {
    id: 'K',
    name: 'Kinetic Energy',
    symbol: 'K',
    unit: 'J',
    description: 'Kinetic energy K = 12.5 - U.',
  },
  {
    id: 'v',
    name: 'Speed',
    symbol: 'v',
    unit: 'm/s',
    description: 'Instantaneous particle speed v = sqrt(2 * K).',
  },
  {
    id: 'isTurningPoint',
    name: 'Turning Point Flag',
    symbol: 'isTP',
    unit: 'boolean',
    description: 'Indicates whether the particle has reached a classical turning point.',
  },
];

export class HarmonicEnergyWellAdapter implements ScientificModelAdapter {
  readonly id = 'PHYS-MODEL-ENERGY-WELL';
  readonly family = 'POTENTIAL_WELLS';
  readonly name = 'Harmonic Potential Energy Well';
  readonly description =
    'Conservative 1D potential energy well with classical turning points and energy conservation.';
  readonly parameters = ENERGY_WELL_PARAMETERS;
  readonly outputs = ENERGY_WELL_OUTPUTS;

  validate(params: Record<string, number>): ModelValidationResult {
    const errors: string[] = [];
    const x = params['x'];
    if(Object.keys(params).length!==1||!Object.hasOwn(params,'x'))errors.push('Exact x parameter required');

    if (x === undefined || typeof x !== 'number' || !Number.isFinite(x) || Number.isNaN(x)) {
      errors.push('Parameter "x" must be a finite number.');
    } else if (x < -0.5 || x > 0.5) {
      errors.push(`Position x = ${x} is outside physical well domain [-0.5, 0.5].`);
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  evaluate(params: Record<string, number>): Record<string, number | boolean> {
    const val = this.validate(params);
    if (!val.isValid) {
      throw new ValueError(val.errors.join('; '));
    }

    const x = params['x']!;
    const U = 50 * x * x;
    const K = Math.max(0, 12.5 - U);
    const v = Math.sqrt(2 * K);
    const isTurningPoint = Math.abs(x)===0.5;

    return {
      U: U,
      K: K,
      v: v,
      isTurningPoint,
    };
  }
}

export class ValueError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValueError';
  }
}

/**
 * Pure helper function matching R3 wpe_oracles.py energy_well(x).
 */
export function calculateEnergyWell(x: number): { U: number; K: number; v: number } {
  if (typeof x !== 'number' || !Number.isFinite(x) || Number.isNaN(x) || x < -0.5 || x > 0.5) {
    throw new ValueError('invalid domain');
  }
  const U = 50 * x * x;
  const K = 12.5 - U;
  const v = Math.sqrt(2 * K);
  return { U, K, v };
}

