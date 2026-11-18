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

import type {CognitiveController} from '../journeys/cognitive-controller.ts';
import type {Checkpoint,Ref} from './types.ts';
import {refOk} from './progress.ts';
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
      const raw=createWpeModelAdapter(fam,fam.replace(/_/g,' '));const adapter=fam==='POTENTIAL_WELLS'?{...raw,family:'SAMPLED_POTENTIAL_WELLS'}:raw;
      this.register(adapter);
    }
  }

  register(adapter: ScientificModelAdapter): void {
    if(this.adaptersById.has(adapter.id)||this.adaptersByFamily.has(adapter.family))throw Error('Duplicate model identity');
    const copy=Object.freeze({...adapter,id:adapter.id,family:adapter.family,name:adapter.name,description:adapter.description,parameters:Object.freeze(adapter.parameters.map(p=>Object.freeze({...p}))),outputs:Object.freeze(adapter.outputs.map(p=>Object.freeze({...p}))),validate:adapter.validate.bind(adapter),evaluate:adapter.evaluate.bind(adapter)});
    this.adaptersById.set(copy.id,copy);this.adaptersByFamily.set(copy.family,copy);
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

    // Stage and capability arrays are presentation hints, never receipts.
    return {modelId:adapter.id,isMasked:true,outputs:null,stage,reason:'Outputs withheld pending exact durable A49 exposure.',validation};
  }
  // Explicit synthetic engineering calculation; not a learner disclosure or academic result.
  evaluateDiagnostic(id:string,params:Record<string,any>){
    const adapter=this.get(id)||this.getByFamily(id);if(!adapter)throw Error('Unknown model');
    const copy=structuredClone(params),v=adapter.validate(copy);if(!v.isValid)throw Error(v.errors.join('; '));
    return adapter.evaluate(copy);
  }
  async evaluateAuthorized(id:string,params:Record<string,any>,binding:{controller:CognitiveController;asset:Ref;checkpoint:Checkpoint;exposureId:string;modelId:string}):Promise<PolicyFilteredEvaluationResult>{
    const copy=structuredClone(params),masked=this.evaluateWithPolicy(id,copy);
    // Trusted bootstrap binds the reviewed model asset ID to the exact adapter.
    if(!masked.validation.isValid||id!==binding.modelId||!refOk(binding.asset)||binding.asset.type!=='ASSET'||binding.asset.id!==id||!await binding.controller.canDisplay('MODEL_AUTO_CALCULATE',binding.asset,binding.checkpoint,binding.exposureId))return masked;
    try{return {...masked,isMasked:false,outputs:this.evaluateDiagnostic(id,copy),reason:'Durable A49 exposure'};}catch{return {...masked,validation:{isValid:false,errors:['Invalid model calculation']}};}

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
