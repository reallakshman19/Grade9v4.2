/**
 * web/adapters/chemistry/index.ts
 * A28 — Chemistry domain adapter module index.
 *
 * Exports:
 * - Chemistry exam archetypes and contracts (CHEM E1-E3)
 * - Safe SMILES & Hill formula parsers, validators, and SVG renderers
 * - Chemical reaction equation balancers and mechanism step progression
 * - Spectral representations and accessible tabular/screen-reader descriptions
 *
 * No academic approval inferred from software validation.
 */

export * from './types.ts';
export * from './structure.ts';
export * from './reactions.ts';
export * from './spectra.ts';

