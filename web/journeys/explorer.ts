/**
 * web/journeys/explorer.ts
 * A65 — GCDR (Guided Conceptual Discovery & Reconstruction) Explorer Journey Runtime.
 *
 * Implements:
 * - Native blueprint BP-EXPLORER-GCDR@1.0.0
 * - Ten ordered cognitive exploration stages:
 *   1. PREDICT
 *   2. MANIPULATE
 *   3. OBSERVE
 *   4. CONTRADICT
 *   5. DECONSTRUCT
 *   6. RECONSTRUCT
 *   7. INVARIANT
 *   8. BOUNDARY
 *   9. FADE
 *   10. TRANSFER
 * - State-bound helper contracts:
 *   Teacher's Chalkboard, Trap Alert, Independent Check, Transfer Takeaway, Exactness Badge
 * - Truthful fidelity and binding labels:
 *   CANONICAL_BINDING, PARTIAL_BINDING, UNBOUND_EXTENSION
 * - Strict pedagogical invariant: Simulations are NEVER badged as academic proof.
 * - No answer leakage before learner commitment.
 *
 * No academic approval inferred from software validation.
 */

export const GCDR_BLUEPRINT_ID = 'BP-EXPLORER-GCDR@1.0.0';

export type GcdrStage =
  | 'PREDICT'
  | 'MANIPULATE'
  | 'OBSERVE'
  | 'CONTRADICT'
  | 'DECONSTRUCT'
  | 'RECONSTRUCT'
  | 'INVARIANT'
  | 'BOUNDARY'
  | 'FADE'
  | 'TRANSFER';

export const GCDR_ORDERED_STAGES: readonly GcdrStage[] = [
  'PREDICT',
  'MANIPULATE',
  'OBSERVE',
  'CONTRADICT',
  'DECONSTRUCT',
  'RECONSTRUCT',
  'INVARIANT',
  'BOUNDARY',
  'FADE',
  'TRANSFER',
] as const;

export type GcdrFidelity = 'NUMERICAL_EXACT' | 'QUALITATIVE_SYNTHETIC' | 'APPROXIMATE';

export type GcdrBindingStatus = 'CANONICAL_BINDING' | 'PARTIAL_BINDING' | 'UNBOUND_EXTENSION';

export interface ExactnessBadge {
  readonly fidelity: GcdrFidelity;
  readonly binding: GcdrBindingStatus;
  readonly academicClaimDisclaimer: string;
}

export interface GcdrHelperStates {
  readonly chalkboardNote?: string;
  readonly trapAlert?: string;
  readonly independentCheckPrompt?: string;
  readonly transferTakeaway?: string;
  readonly exactnessBadge: ExactnessBadge;
}

export interface GcdrStageContext {
  readonly stage: GcdrStage;
  readonly title: string;
  readonly instructions: string;
  readonly requiredAction: string;
  readonly allowedHelpers: readonly ('CHALKBOARD' | 'TRAP_ALERT' | 'INDEPENDENT_CHECK' | 'TAKEAWAY')[];
}

export const GCDR_STAGE_DEFINITIONS: Readonly<Record<GcdrStage, GcdrStageContext>> = {
  PREDICT: {
    stage: 'PREDICT',
    title: '1. Predict Outcome',
    instructions: 'Formulate qualitative and quantitative expectations before running model parameters.',
    requiredAction: 'ENTER_PREDICTION',
    allowedHelpers: ['CHALKBOARD'],
  },
  MANIPULATE: {
    stage: 'MANIPULATE',
    title: '2. Interactive Manipulation',
    instructions: 'Vary system parameters across bounded domain to explore behavior.',
    requiredAction: 'ADJUST_PARAMETERS',
    allowedHelpers: ['CHALKBOARD'],
  },
  OBSERVE: {
    stage: 'OBSERVE',
    title: '3. Empirical Observation',
    instructions: 'Inspect live quantities and synchronized second-view telemetry.',
    requiredAction: 'LOG_OBSERVATION',
    allowedHelpers: ['CHALKBOARD'],
  },
  CONTRADICT: {
    stage: 'CONTRADICT',
    title: '4. Cognitive Contradiction',
    instructions: 'Identify divergences between initial intuition and observed physical constraints.',
    requiredAction: 'RECORD_CONTRADICTION',
    allowedHelpers: ['CHALKBOARD', 'TRAP_ALERT'],
  },
  DECONSTRUCT: {
    stage: 'DECONSTRUCT',
    title: '5. Model Deconstruction',
    instructions: 'Isolate underlying physical mechanisms, active forces, or state variables.',
    requiredAction: 'ISOLATE_MECHANISM',
    allowedHelpers: ['CHALKBOARD', 'TRAP_ALERT'],
  },
  RECONSTRUCT: {
    stage: 'RECONSTRUCT',
    title: '6. Principled Reconstruction',
    instructions: 'Rebuild the complete governing equation or derivation step-by-step.',
    requiredAction: 'RECONSTRUCT_DERIVATION',
    allowedHelpers: ['CHALKBOARD', 'TRAP_ALERT', 'INDEPENDENT_CHECK'],
  },
  INVARIANT: {
    stage: 'INVARIANT',
    title: '7. Physical Invariant Analysis',
    instructions: 'Verify conserved quantities (energy, momentum, mass) across state transitions.',
    requiredAction: 'TEST_CONSERVATION',
    allowedHelpers: ['CHALKBOARD', 'INDEPENDENT_CHECK'],
  },
  BOUNDARY: {
    stage: 'BOUNDARY',
    title: '8. Boundary Case Testing',
    instructions: 'Evaluate system behavior at extreme limits (zero, infinity, critical thresholds).',
    requiredAction: 'TEST_LIMITS',
    allowedHelpers: ['CHALKBOARD', 'INDEPENDENT_CHECK'],
  },
  FADE: {
    stage: 'FADE',
    title: '9. Scaffold Fading',
    instructions: 'Solve an unguided target problem without intermediate telemetry assistance.',
    requiredAction: 'SOLVE_UNSCAFFOLDED',
    allowedHelpers: ['CHALKBOARD'],
  },
  TRANSFER: {
    stage: 'TRANSFER',
    title: '10. General Transfer',
    instructions: 'Apply the underlying physical principles to an entirely fresh domain context.',
    requiredAction: 'APPLY_TRANSFER',
    allowedHelpers: ['CHALKBOARD', 'TAKEAWAY'],
  },
};

export interface GcdrExplorerDraft {
  readonly blueprintId: string;
  readonly explorerId: string;
  readonly currentStageIndex: number;
  readonly stageResponses: Record<string, string>;
  readonly modelParameters: Record<string, number>;
  readonly isCompleted: boolean;
  readonly revision: number;
  readonly lastModifiedAt: string;
}

export class GcdrExplorerJourney {
  readonly blueprintId = GCDR_BLUEPRINT_ID;
  private explorerId: string;
  private currentStageIndex: number = 0;
  private stageResponses: Map<GcdrStage, string> = new Map();
  private modelParameters: Record<string, number> = {};
  private helpers: GcdrHelperStates;
  private revision: number = 1;

  constructor(
    explorerId: string,
    helpers: GcdrHelperStates,
    initialParameters: Record<string, number> = {}
  ) {
    this.explorerId = explorerId;
    this.helpers = { ...helpers };
    this.modelParameters = { ...initialParameters };
  }

  getExplorerId(): string {
    return this.explorerId;
  }

  getCurrentStage(): GcdrStage {
    return GCDR_ORDERED_STAGES[this.currentStageIndex]!;
  }

  getCurrentStageIndex(): number {
    return this.currentStageIndex;
  }

  getCurrentStageDefinition(): GcdrStageContext {
    return GCDR_STAGE_DEFINITIONS[this.getCurrentStage()];
  }

  getHelpers(): GcdrHelperStates {
    return { ...this.helpers };
  }

  getModelParameters(): Record<string, number> {
    return { ...this.modelParameters };
  }

  setModelParameter(paramId: string, value: number): void {
    this.modelParameters[paramId] = value;
    this.revision++;
  }

  getStageResponse(stage: GcdrStage): string | null {
    return this.stageResponses.get(stage) || null;
  }

  setStageResponse(stage: GcdrStage, responseText: string): boolean {
    const trimmed = responseText.trim();
    if (!trimmed) return false;
    this.stageResponses.set(stage, trimmed);
    this.revision++;
    return true;
  }

  isStageCompleted(stage: GcdrStage): boolean {
    const idx = GCDR_ORDERED_STAGES.indexOf(stage);
    return idx < this.currentStageIndex || this.stageResponses.has(stage);
  }

  /**
   * Advances to next cognitive stage. Enforces that current stage action must be recorded.
   */
  advance(): { success: boolean; error?: string } {
    const current = this.getCurrentStage();
    const resp = this.stageResponses.get(current);

    if (!resp && current !== 'MANIPULATE' && current !== 'OBSERVE') {
      return {
        success: false,
        error: `Cannot advance past stage "${current}" without recording learner response/evidence.`,
      };
    }

    if (this.currentStageIndex >= GCDR_ORDERED_STAGES.length - 1) {
      return { success: false, error: 'Explorer journey already at final stage.' };
    }

    this.currentStageIndex++;
    this.revision++;
    return { success: true };
  }

  /**
   * Jumps to an already completed stage or the current active stage.
   */
  goToStage(stage: GcdrStage): boolean {
    const targetIdx = GCDR_ORDERED_STAGES.indexOf(stage);
    if (targetIdx === -1 || targetIdx > this.currentStageIndex) {
      return false; // Cannot jump forward past unreached stages!
    }
    this.currentStageIndex = targetIdx;
    this.revision++;
    return true;
  }

  exportDraft(): GcdrExplorerDraft {
    const stageResponses: Record<string, string> = {};
    for (const [k, v] of this.stageResponses.entries()) {
      stageResponses[k] = v;
    }

    return {
      blueprintId: this.blueprintId,
      explorerId: this.explorerId,
      currentStageIndex: this.currentStageIndex,
      stageResponses,
      modelParameters: { ...this.modelParameters },
      isCompleted: this.currentStageIndex >= GCDR_ORDERED_STAGES.length - 1,
      revision: this.revision,
      lastModifiedAt: new Date().toISOString(),
    };
  }

  restoreDraft(draft: GcdrExplorerDraft): void {
    if (draft.blueprintId !== this.blueprintId) {
      throw new Error(`Blueprint mismatch: expected ${this.blueprintId}, got ${draft.blueprintId}`);
    }
    this.explorerId = draft.explorerId;
    this.currentStageIndex = Math.max(0, Math.min(GCDR_ORDERED_STAGES.length - 1, draft.currentStageIndex));
    this.stageResponses.clear();
    for (const [k, v] of Object.entries(draft.stageResponses)) {
      this.stageResponses.set(k as GcdrStage, v);
    }
    this.modelParameters = { ...draft.modelParameters };
    this.revision = draft.revision + 1;
  }
}
