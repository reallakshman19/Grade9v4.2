/**
 * web/adapters/physics/models/types.ts
 * A50 — Scientific interactive model adapter contracts.
 *
 * Implements:
 * - Model parameter metadata (domain min/max/step/initial, units, symbols)
 * - Model output descriptors (keys, symbols, SI units)
 * - Pure ScientificModelAdapter interface without DOM or eval dependencies
 * - Mandatory invariant: Model outputs are policy-filtered and strictly
 *   withheld before learner commitment (no automatic output precommit).
 *
 * No academic approval inferred from software validation.
 */

export interface ModelParameterDescriptor {
  readonly id: string;
  readonly name: string;
  readonly symbol: string;
  readonly unit: string;
  readonly min: number;
  readonly max: number;
  readonly step: number;
  readonly initial: number;
  readonly description?: string;
}

export interface ModelOutputDescriptor {
  readonly id: string;
  readonly name: string;
  readonly symbol: string;
  readonly unit: string;
  readonly description?: string;
}

export interface ModelValidationResult {
  readonly isValid: boolean;
  readonly errors: readonly string[];
}

export interface ScientificModelAdapter {
  readonly id: string;
  readonly family: string;
  readonly name: string;
  readonly description: string;
  readonly parameters: readonly ModelParameterDescriptor[];
  readonly outputs: readonly ModelOutputDescriptor[];
  validate(params: Record<string, number>): ModelValidationResult;
  evaluate(params: Record<string, number>): Record<string, number | boolean | number[]>;
}

export interface ModelInteractionState {
  readonly modelId: string;
  readonly parameterValues: Record<string, number>;
  readonly isMasked: boolean;
  readonly revision: number;
  readonly lastModifiedAt: string;
}

