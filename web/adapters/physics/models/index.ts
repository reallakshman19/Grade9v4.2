/**
 * web/adapters/physics/models/index.ts
 * A50 — Physics scientific models module exports.
 *
 * Exports:
 * - Model parameter and output contracts
 * - Harmonic potential energy well model with turning points and conservation
 * - Thirteen WPE synthetic oracle model evaluators
 *
 * No academic approval inferred from software validation.
 */

export * from './types.ts';
export * from './energy-well.ts';
export * from './wpe-oracles.ts';
