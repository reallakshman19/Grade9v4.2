/**
 * web/components/proof.ts
 * A27 — Mathematical proof and symbolic workspace component controller.
 *
 * Implements:
 * - Given / Goal / Lemmas formulation pane
 * - Step-by-step equation and proof assertions
 * - Gated alternative approaches
 * - Exact draft restoration with zero data loss
 * - Strict pedagogical invariant: Arbitrary proof is NEVER auto-graded;
 *   MATH E1–E3 evaluations default to REVIEW_PENDING with score withheld.
 * - 48px minimum hit target size on all interactive triggers.
 *
 * No academic approval inferred from software validation.
 */

import {canonicalJson,computeSha256} from '../runtime/loader.ts';
import {validateResponse} from '../runtime/response.ts';
import type {WorkArtifact,Json,Response} from '../runtime/types.ts';
import { HIT_TARGET_MIN_PX } from '../styles/tokens.ts';
import {
  ProofStepManager,
  createProofStepManager,
} from '../adapters/mathematics/steps.ts';
import {
  parseSymbolicExpression,
} from '../adapters/mathematics/symbolic.ts';
import type {
  MathExamArchetype,
  ProofLemma,
  ProofApproach,
  ProofStep,
  MathematicalProofDraft,
  ProofEvaluation,
} from '../adapters/mathematics/types.ts';

export interface ProofWorkspaceConfig {
  readonly archetype: MathExamArchetype;
  readonly givenStatements: readonly string[];
  readonly goalStatement: string;
  readonly availableLemmas?: readonly ProofLemma[];
  readonly approaches?: readonly ProofApproach[];
  readonly initialSteps?: readonly ProofStep[];
}

export interface ProofWorkspaceViewState {
  readonly archetype: MathExamArchetype;
  readonly givenStatements: readonly string[];
  readonly goalStatement: string;
  readonly availableLemmas: readonly ProofLemma[];
  readonly approaches: readonly ProofApproach[];
  readonly selectedApproachId: string | null;
  readonly steps: readonly ProofStep[];
  readonly isComplete: boolean;
  readonly evaluation: ProofEvaluation | null;
  readonly minHitTargetPx: number;
}

export class ProofWorkspaceController {
  private archetype: MathExamArchetype;
  private givenStatements: string[];
  private goalStatement: string;
  private availableLemmas: ProofLemma[];
  private approaches: ProofApproach[];
  private selectedApproachId: string | null = null;
  private stepManager: ProofStepManager;
  private scratchpadNote: string = '';
  private revision: number = 1;
  private evaluation: ProofEvaluation | null = null;

  constructor(config: ProofWorkspaceConfig) {
    this.archetype = config.archetype;
    this.givenStatements = [...config.givenStatements];
    this.goalStatement = config.goalStatement;
    this.availableLemmas=structuredClone(config.availableLemmas||[]) as ProofLemma[];
    this.approaches=(config.approaches||[]).map(a=>a.isGated?{...a,isUnlocked:false,strategySummary:''}:{...a});
    this.stepManager = createProofStepManager(config.initialSteps);

    if (this.approaches.length > 0) {
      const unlocked = this.approaches.find((a) => !a.isGated || a.isUnlocked);
      this.selectedApproachId = unlocked ? unlocked.id : null;
    }
  }

  // ---------------------------------------------------------------------------
  // Step Actions
  // ---------------------------------------------------------------------------

  addStep(assertion: string, justification: string = '', lemmaRefs: readonly string[] = []): ProofStep {
    if(!lemmaRefs.every(id=>this.availableLemmas.some(l=>l.id===id)))throw Error('Unknown lemma');this.evaluation=null;this.revision++;
    return this.stepManager.addStep(assertion, justification, lemmaRefs);
  }

  updateStep(id: string, updates: Partial<Pick<ProofStep, 'assertion' | 'justification' | 'lemmaRefs'>>): boolean {
    if(updates.lemmaRefs&&!updates.lemmaRefs.every((id:string)=>this.availableLemmas.some(l=>l.id===id)))return false;
    const ok = this.stepManager.updateStep(id, updates);
    if (ok){this.evaluation=null;this.revision++;}
    return ok;
  }

  removeStep(id: string): boolean {
    const ok = this.stepManager.removeStep(id);
    if (ok){this.evaluation=null;this.revision++;}
    return ok;
  }

  getSteps(): readonly ProofStep[] {
    return this.stepManager.getSteps();
  }

  // ---------------------------------------------------------------------------
  // Alternative Approaches
  // ---------------------------------------------------------------------------

  getApproaches(): readonly ProofApproach[] {
    return structuredClone(this.approaches);
  }

  selectApproach(approachId: string): boolean {
    const app = this.approaches.find((a) => a.id === approachId);
    if (!app) return false;
    if (app.isGated && !app.isUnlocked) {
      return false; // Gated approach cannot be selected until unlocked
    }
    this.selectedApproachId = approachId;
    this.revision++;
    return true;
  }

  unlockApproach(approachId: string): boolean {
    // No local action can authorize a gated strategy. A49 must provide reviewed disclosure.
    return false;
  }

  // ---------------------------------------------------------------------------
  // Evaluation Policy (Mandatory Invariant: Never auto-grade arbitrary proofs)
  // ---------------------------------------------------------------------------

  submitProof(): ProofEvaluation {
    let rubricScale: 'EXACT_INTEGER' | 'HUMAN_RUBRIC' | 'IMO_0_TO_7';

    switch (this.archetype) {
      case 'MATH_E1':
        rubricScale = 'EXACT_INTEGER';
        break;
      case 'MATH_E2':
        rubricScale = 'HUMAN_RUBRIC';
        break;
      case 'MATH_E3':
        rubricScale = 'IMO_0_TO_7';
        break;
      default:
        rubricScale = 'HUMAN_RUBRIC';
    }

    // MANDATORY INVARIANT: Proof evaluation is strictly REVIEW_PENDING, zero automated points.
    this.evaluation = {
      status: 'REVIEW_PENDING',
      points: null,
      rubricScale,
      isAutoGraded: false,
      reasonCode: 'PROOF_PENDING_HUMAN_EVALUATION',
      feedbackHtml:
        `<div class="proof-evaluation-banner" role="status">` +
        `<strong>Proof requires academic review (not submitted):</strong> Mathematical arguments must be independently verified by certified examiners under the ${rubricScale} scale.` +
        `</div>`,
    };

    return this.evaluation;
  }

  // ---------------------------------------------------------------------------
  // Draft Serialization and Restoration
  // ---------------------------------------------------------------------------

  exportDraft(): MathematicalProofDraft {
    return {
      archetype: this.archetype,
      givenStatements: [...this.givenStatements],
      goalStatement: this.goalStatement,
      availableLemmas: structuredClone(this.availableLemmas),
      selectedApproachId: this.selectedApproachId,
      steps: [...this.stepManager.getSteps()],
      symbolicScratchpad: this.scratchpadNote,
      revision: this.revision,
      lastModifiedAt: new Date().toISOString(),
    };
  }

  importDraft(draft: MathematicalProofDraft): void {
    if(draft.archetype!==this.archetype||canonicalJson(draft.givenStatements)!==canonicalJson(this.givenStatements)||draft.goalStatement!==this.goalStatement||canonicalJson(draft.availableLemmas)!==canonicalJson(this.availableLemmas)||!Number.isSafeInteger(draft.revision)||draft.revision<1||!Array.isArray(draft.steps)||!draft.steps.every(s=>s.lemmaRefs.every((id:string)=>this.availableLemmas.some(l=>l.id===id)))||draft.selectedApproachId!==null&&!this.approaches.some(a=>a.id===draft.selectedApproachId&&!a.isGated))throw Error('Foreign or invalid proof draft');
    const next=createProofStepManager(draft.steps);
    this.selectedApproachId=draft.selectedApproachId;this.stepManager=next;this.scratchpadNote=draft.symbolicScratchpad||'';this.revision=draft.revision;this.evaluation=null;
  }
  toResponse():Response{
    const steps=this.stepManager.getSteps();
    if(!steps.length||steps.some(s=>!s.assertion.trim()))throw Error('Incomplete proof');
    return validateResponse({kind:'MATHEMATICAL_PROOF',value:steps.map(s=>s.assertion+(s.justification?' — '+s.justification:'')).join('\n')});
  }
  async toWorkArtifact(sessionId:string):Promise<WorkArtifact>{
    if(!sessionId.trim())throw Error('Session identity required');
    const value={steps:this.stepManager.getSteps(),symbolicScratchpad:this.scratchpadNote,selectedApproachId:this.selectedApproachId};
    return {id:'proof:'+await computeSha256(canonicalJson({sessionId,value})),kind:'NOTE',version:1,value:value as unknown as Json};
  }

  getViewState(): ProofWorkspaceViewState {
    return {
      archetype: this.archetype,
      givenStatements: [...this.givenStatements],
      goalStatement: this.goalStatement,
      availableLemmas: structuredClone(this.availableLemmas),
      approaches: this.getApproaches(),
      selectedApproachId: this.selectedApproachId,
      steps: this.stepManager.getSteps(),
      isComplete: this.stepManager.getSteps().length > 0,
      evaluation: structuredClone(this.evaluation),
      minHitTargetPx: HIT_TARGET_MIN_PX,
    };
  }
}

export function createProofWorkspace(config: ProofWorkspaceConfig): ProofWorkspaceController {
  return new ProofWorkspaceController(config);
}

