/**
 * web/runtime/models.ts
 * A50 — Scientific interactive model registry and policy-filtered runtime.
 *
 * Implements:
 * - Pure adapter registry for domain models without DOM or eval dependencies
 * - Parameter domain validation and error reporting
 * - Policy-filtered output disclosure: strictly enforces the invariant that
 *   automatic model calculations are masked during PREDICT and ATTEMPT stages
 *   ("no automatic output precommit") unless explicit disclosure is authorized.
 * - Out-of-the-box support for the Harmonic Energy Well and all 13 WPE oracle models.
 *
 * No academic approval inferred from software validation.
 */

import {
  HarmonicEnergyWellAdapter,
} from '../adapters/physics/models/energy-well.ts';
import {
  createWpeModelAdapter,
  evaluateWpeModel,
} from '../adapters/physics/models/wpe-oracles.ts';
import type {
  ScientificModelAdapter,
  ModelValidationResult,
} from '../adapters/physics/models/types.ts';

export type CognitiveStage =
  | 'PREDICT'
  | 'ATTEMPT'
  | 'RECONSTRUCT'
  | 'DIAGNOSE'
  | 'REPAIR'
  | 'BOUNDARY_TEST'
  | 'COMPLETE';

export interface PolicyFilteredEvaluationResult {
  readonly modelId: string;
  readonly isMasked: boolean;
  readonly outputs: Record<string, any> | null;
  readonly stage: CognitiveStage;
  readonly reason?: string;
  readonly validation: ModelValidationResult;
}

export class ModelRegistry {
  private adaptersById: Map<string, ScientificModelAdapter> = new Map();
  private adaptersByFamily: Map<string, ScientificModelAdapter> = new Map();

  constructor() {
    this.registerDefaults();
  }

  private registerDefaults(): void {
    // 1. Harmonic Energy Well
    const well = new HarmonicEnergyWellAdapter();
    this.register(well);

    // 2. Thirteen WPE Synthetic Oracle Models
    const wpeFamilies = [
      'MULTIFORCE_LEDGER',
      'SPRING_CONTACT',
      'CONSTANT_POWER',
      'DISTRIBUTED_MASS',
      'GRAPH_OPERATION',
      'VERTICAL_CIRCLE',
      'POTENTIAL_WELLS',
      'SPRING_PROJECTILE_TRANSITION',
      'RADIAL_FORCE_POTENTIAL',
      'INSTANTANEOUS_POWER',
      'CONVEYOR_MOMENTUM_POWER',
      'DISSIPATIVE_BOUNCES',
      'SPRING_CONTROLLED_VARIABLE',
    ];

    for (const fam of wpeFamilies) {
      const adapter = createWpeModelAdapter(fam, fam.replace(/_/g, ' '));
      this.register(adapter);
    }
  }

  register(adapter: ScientificModelAdapter): void {
    this.adaptersById.set(adapter.id, adapter);
    this.adaptersByFamily.set(adapter.family, adapter);
  }

  get(id: string): ScientificModelAdapter | null {
    return this.adaptersById.get(id) || null;
  }

  getByFamily(family: string): ScientificModelAdapter | null {
    return this.adaptersByFamily.get(family) || null;
  }

  getAll(): readonly ScientificModelAdapter[] {
    return Array.from(this.adaptersById.values());
  }

  /**
   * Strictly enforces the cognitive disclosure policy:
   * During PREDICT and ATTEMPT stages, automatic calculation outputs are MASKED
   * ("no automatic output precommit") unless MODEL_AUTO_CALCULATE is explicitly allowed.
   */
  evaluateWithPolicy(
    modelIdOrFamily: string,
    params: Record<string, any>,
    stage: CognitiveStage = 'ATTEMPT',
    allowedCapabilities: readonly string[] = []
  ): PolicyFilteredEvaluationResult {
    const adapter = this.get(modelIdOrFamily) || this.getByFamily(modelIdOrFamily);

    if (!adapter) {
      return {
        modelId: modelIdOrFamily,
        isMasked: true,
        outputs: null,
        stage,
        reason: `Model "${modelIdOrFamily}" not found in registry.`,
        validation: { isValid: false, errors: [`Model ${modelIdOrFamily} not found`] },
      };
    }

    const validation = adapter.validate(params);
    if (!validation.isValid) {
      return {
        modelId: adapter.id,
        isMasked: true,
        outputs: null,
        stage,
        reason: `Invalid parameter domain: ${validation.errors.join('; ')}`,
        validation,
      };
    }

    // Check disclosure policy
    const isPreCommitStage = stage === 'PREDICT' || stage === 'ATTEMPT';
    const isAutoCalculateAllowed = allowedCapabilities.includes('MODEL_AUTO_CALCULATE');

    if (isPreCommitStage && !isAutoCalculateAllowed) {
      return {
        modelId: adapter.id,
        isMasked: true,
        outputs: null,
        stage,
        reason: 'Automated model outputs are withheld during pre-commit stages to foster learner derivation.',
        validation,
      };
    }

    // Policy permits disclosure
    const outputs = adapter.evaluate(params);
    return {
      modelId: adapter.id,
      isMasked: false,
      outputs,
      stage,
      validation,
    };
  }
}

// Global registry singleton
let defaultRegistry: ModelRegistry | null = null;

export function getModelRegistry(): ModelRegistry {
  if (!defaultRegistry) {
    defaultRegistry = new ModelRegistry();
  }
  return defaultRegistry;
}
