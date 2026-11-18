/**
 * web/journeys/core1b.ts
 * A32 — Core1B Fresh Transfer Journey Runtime.
 *
 * Implements:
 * - Native six-stage cognitive sequence:
 *   1. PREDICT       — Qualitative prediction before attempting
 *   2. ATTEMPT       — Unassisted attempt on Task A (Fresh Task)
 *   3. RECONSTRUCT   — Structured comparison against canonical reasoning
 *   4. DIAGNOSE      — Analysis of mistake patterns / misconception rules
 *   5. REPAIR        — Conceptual repair formulation
 *   6. BOUNDARY_TEST — Changed-condition evaluation on Task B (Boundary Task)
 *   -> COMPLETE      — Return to origin source with preserved session
 * - Strict Task A / Task B separation (Task A = Fresh, Task B = Boundary)
 * - Ordered hint exposure (H1 -> H2 -> H3) with exposure transaction tracking
 * - Precommit masking: solutions and comparison keys denied prior to commit-first
 * - Boundary draft persistence without destructive reset
 * - Non-destructive session preservation and event replay
 * - Rule 13 invariant preservation
 *
 * No academic approval inferred from software validation.
 */

export const CORE1B_BLUEPRINT_ID = 'BP-TRANSFER-CORE1B@1.0.0';

export type TransferStage =
  | 'PREDICT'
  | 'ATTEMPT'
  | 'RECONSTRUCT'
  | 'DIAGNOSE'
  | 'REPAIR'
  | 'BOUNDARY_TEST'
  | 'COMPLETE';

export const TRANSFER_ORDERED_STAGES: readonly TransferStage[] = [
  'PREDICT',
  'ATTEMPT',
  'RECONSTRUCT',
  'DIAGNOSE',
  'REPAIR',
  'BOUNDARY_TEST',
  'COMPLETE',
] as const;

export type HintLevel = 'H1' | 'H2' | 'H3';
export const ORDERED_HINTS: readonly HintLevel[] = ['H1', 'H2', 'H3'] as const;

export interface ExactRef {
  readonly type: string;
  readonly id: string;
  readonly revision: number;
  readonly sha256: string;
}

export interface TaskDefinition {
  readonly taskRef: ExactRef;
  readonly title: string;
  readonly prompt: string;
  readonly conditions: readonly string[];
  readonly solutionRef: ExactRef;
  readonly solutionSteps: readonly string[];
  readonly targetNumeric?: {
    readonly value: number;
    readonly unit: string;
    readonly tolerance: number;
  };
}

export interface HintItem {
  readonly level: HintLevel;
  readonly assetRef: ExactRef;
  readonly text: string;
  readonly guidance: string;
}

export interface DiagnosticRule {
  readonly code: string;
  readonly label: string;
  readonly misconceptionDescription: string;
  readonly correctiveGuidance: string;
}

export interface Core1BTransferDefinition {
  readonly journeyId: string;
  readonly originRef: ExactRef;
  readonly freshTaskA: TaskDefinition;
  readonly boundaryTaskB: TaskDefinition;
  readonly hints: readonly HintItem[];
  readonly diagnosticRules: readonly DiagnosticRule[];
  readonly qualitativePredictionPrompt: string;
  readonly predictionOptions: readonly string[];
  readonly expectedPredictionIndex: number;
  readonly status: 'SYNTHETIC' | 'HOLD' | 'CANDIDATE' | 'STALE' | 'PENDING_REVIEW';
}

export interface TransferEvent {
  readonly stage: TransferStage;
  readonly eventType: string;
  readonly timestamp: number;
  readonly payload: Record<string, unknown>;
}

export interface Core1BDraft {
  readonly journeyId: string;
  readonly currentStage: TransferStage;
  readonly predictionIndex: number | null;
  readonly taskAAttemptText: string;
  readonly taskANumericValue: number | null;
  readonly firstAttemptCommitted: boolean;
  readonly exposedHints: readonly HintLevel[];
  readonly isAssisted: boolean;
  readonly selectedDiagnosticCode: string | null;
  readonly repairExplanation: string;
  readonly taskBAttemptText: string;
  readonly taskBNumericValue: number | null;
  readonly boundaryCommitted: boolean;
  readonly sourceReturned: boolean;
  readonly events: readonly TransferEvent[];
}

export class Core1BValidationError extends Error {
  readonly code: string;
  constructor(code: string, message: string) {
    super(`${code}: ${message}`);
    this.name = 'Core1BValidationError';
    this.code = code;
  }
}

export class Core1BTransferJourney {
  private definition: Core1BTransferDefinition;
  private currentStage: TransferStage = 'PREDICT';
  private predictionIndex: number | null = null;
  private taskAAttemptText: string = '';
  private taskANumericValue: number | null = null;
  private firstAttemptCommitted: boolean = false;
  private exposedHintsSet: Set<HintLevel> = new Set<HintLevel>();
  private isAssisted: boolean = false;
  private selectedDiagnosticCode: string | null = null;
  private repairExplanation: string = '';
  private taskBAttemptText: string = '';
  private taskBNumericValue: number | null = null;
  private boundaryCommitted: boolean = false;
  private sourceReturned: boolean = false;
  private eventHistory: TransferEvent[] = [];

  constructor(definition: Core1BTransferDefinition) {
    this.validateDefinition(definition);
    this.definition = definition;
    this.recordEvent('PREDICT', 'JOURNEY_INITIALIZED', { journeyId: definition.journeyId });
  }

  private validateDefinition(def: Core1BTransferDefinition): void {
    if (!def.journeyId || !def.originRef || !def.freshTaskA || !def.boundaryTaskB) {
      throw new Core1BValidationError('INVALID_DEFINITION', 'Missing core transfer definitions');
    }

    // Task A and Task B must be distinct tasks (separation of fresh vs boundary condition)
    if (def.freshTaskA.taskRef.id === def.boundaryTaskB.taskRef.id) {
      throw new Core1BValidationError(
        'TASK_SEPARATION_VIOLATION',
        `Task A and Task B cannot share task ID: ${def.freshTaskA.taskRef.id}`
      );
    }

    // Fresh task must not be an identical clone of origin
    if (def.freshTaskA.taskRef.id === def.originRef.id) {
      throw new Core1BValidationError(
        'CLONE_TASK_REJECTED',
        `Fresh task cannot reuse origin question ID: ${def.originRef.id}`
      );
    }
  }

  private recordEvent(stage: TransferStage, eventType: string, payload: Record<string, unknown>): void {
    this.eventHistory.push({
      stage,
      eventType,
      timestamp: Date.now(),
      payload,
    });
  }

  // --- Stage Progression Query ---

  getStage(): TransferStage {
    return this.currentStage;
  }

  getDefinition(): Core1BTransferDefinition {
    return this.definition;
  }

  // --- Stage 1: PREDICT ---

  predict(optionIndex: number): void {
    if (this.currentStage !== 'PREDICT') {
      throw new Core1BValidationError('ILLEGAL_STAGE', `Cannot predict in stage ${this.currentStage}`);
    }
    if (optionIndex < 0 || optionIndex >= this.definition.predictionOptions.length) {
      throw new Core1BValidationError('INVALID_PREDICTION', `Option index ${optionIndex} is out of bounds`);
    }
    this.predictionIndex = optionIndex;
    this.recordEvent('PREDICT', 'PREDICTION_COMMITTED', { optionIndex });
    this.currentStage = 'ATTEMPT';
  }

  getPrediction(): { readonly index: number | null; readonly optionText?: string; readonly isExpected: boolean } {
    if (this.predictionIndex === null) {
      return { index: null, isExpected: false };
    }
    return {
      index: this.predictionIndex,
      optionText: this.definition.predictionOptions[this.predictionIndex],
      isExpected: this.predictionIndex === this.definition.expectedPredictionIndex,
    };
  }

  // --- Stage 2: ATTEMPT (Task A) ---

  updateTaskAAttempt(text: string, numericVal?: number): void {
    if (this.firstAttemptCommitted) {
      throw new Core1BValidationError('ATTEMPT_ALREADY_COMMITTED', 'Task A attempt is already locked');
    }
    this.taskAAttemptText = text;
    if (numericVal !== undefined) {
      this.taskANumericValue = numericVal;
    }
  }

  requestHint(): HintItem {
    if (this.currentStage !== 'ATTEMPT') {
      throw new Core1BValidationError('ILLEGAL_HINT_STAGE', `Hints only accessible during ATTEMPT stage`);
    }

    // Determine next required hint level in H1 -> H2 -> H3 order
    let nextLevel: HintLevel | null = null;
    for (const h of ORDERED_HINTS) {
      if (!this.exposedHintsSet.has(h)) {
        nextLevel = h;
        break;
      }
    }

    if (!nextLevel) {
      throw new Core1BValidationError('ALL_HINTS_EXPOSED', 'All available hints have already been revealed');
    }

    const hintItem = this.definition.hints.find((item) => item.level === nextLevel);
    if (!hintItem) {
      throw new Core1BValidationError('HINT_NOT_FOUND', `Hint ${nextLevel} not found in definition`);
    }

    this.exposedHintsSet.add(nextLevel);
    this.isAssisted = true;
    this.recordEvent('ATTEMPT', 'HINT_EXPOSED', { level: nextLevel, hintId: hintItem.assetRef.id });
    return hintItem;
  }

  getExposedHints(): readonly HintItem[] {
    return this.definition.hints.filter((h) => this.exposedHintsSet.has(h.level));
  }

  isAssistedAttempt(): boolean {
    return this.isAssisted;
  }

  commitFirstAttempt(): void {
    if (this.currentStage !== 'ATTEMPT') {
      throw new Core1BValidationError('ILLEGAL_STAGE', `Cannot commit first attempt in stage ${this.currentStage}`);
    }
    if (!this.taskAAttemptText.trim() && this.taskANumericValue === null) {
      throw new Core1BValidationError('EMPTY_ATTEMPT', 'Learner must provide reasoning or answer before committing');
    }

    this.firstAttemptCommitted = true;
    this.recordEvent('ATTEMPT', 'FIRST_COMMITTED', {
      textLength: this.taskAAttemptText.length,
      numericVal: this.taskANumericValue,
      assisted: this.isAssisted,
    });
    this.currentStage = 'RECONSTRUCT';
  }

  isFirstAttemptCommitted(): boolean {
    return this.firstAttemptCommitted;
  }

  // --- Stage 3: RECONSTRUCT ---

  getTaskASolution(): readonly string[] {
    if (!this.firstAttemptCommitted) {
      throw new Core1BValidationError(
        'PRECOMMIT_SECRECY_DENIED',
        'Cannot access reference solution before committing initial attempt'
      );
    }
    return this.definition.freshTaskA.solutionSteps;
  }

  completeReconstruction(): void {
    if (this.currentStage !== 'RECONSTRUCT') {
      throw new Core1BValidationError('ILLEGAL_STAGE', `Cannot advance from ${this.currentStage}`);
    }
    this.recordEvent('RECONSTRUCT', 'RECONSTRUCTION_COMMITTED', {});
    this.currentStage = 'DIAGNOSE';
  }

  // --- Stage 4: DIAGNOSE ---

  selectDiagnostic(code: string): void {
    if (this.currentStage !== 'DIAGNOSE') {
      throw new Core1BValidationError('ILLEGAL_STAGE', `Cannot diagnose in stage ${this.currentStage}`);
    }
    const rule = this.definition.diagnosticRules.find((r) => r.code === code);
    if (!rule) {
      throw new Core1BValidationError('INVALID_DIAGNOSTIC_CODE', `Unknown diagnostic rule code: ${code}`);
    }
    this.selectedDiagnosticCode = code;
  }

  commitDiagnosis(): void {
    if (this.currentStage !== 'DIAGNOSE') {
      throw new Core1BValidationError('ILLEGAL_STAGE', `Cannot commit diagnosis in stage ${this.currentStage}`);
    }
    if (!this.selectedDiagnosticCode) {
      throw new Core1BValidationError('DIAGNOSIS_REQUIRED', 'Learner must select a diagnostic classification');
    }
    this.recordEvent('DIAGNOSE', 'DIAGNOSIS_COMMITTED', { code: this.selectedDiagnosticCode });
    this.currentStage = 'REPAIR';
  }

  getSelectedDiagnostic(): DiagnosticRule | null {
    if (!this.selectedDiagnosticCode) return null;
    return this.definition.diagnosticRules.find((r) => r.code === this.selectedDiagnosticCode) || null;
  }

  // --- Stage 5: REPAIR ---

  setRepairExplanation(explanation: string): void {
    this.repairExplanation = explanation;
  }

  commitRepair(): void {
    if (this.currentStage !== 'REPAIR') {
      throw new Core1BValidationError('ILLEGAL_STAGE', `Cannot commit repair in stage ${this.currentStage}`);
    }
    if (!this.repairExplanation.trim()) {
      throw new Core1BValidationError('REPAIR_EXPLANATION_REQUIRED', 'Learner must provide repair explanation');
    }
    this.recordEvent('REPAIR', 'REPAIR_COMMITTED', { explanationLength: this.repairExplanation.length });
    this.currentStage = 'BOUNDARY_TEST';
  }

  getRepairExplanation(): string {
    return this.repairExplanation;
  }

  // --- Stage 6: BOUNDARY_TEST (Task B) ---

  updateTaskBAttempt(text: string, numericVal?: number): void {
    if (this.boundaryCommitted) {
      throw new Core1BValidationError('BOUNDARY_ALREADY_COMMITTED', 'Boundary work is locked after commitment');
    }
    this.taskBAttemptText = text;
    if (numericVal !== undefined) {
      this.taskBNumericValue = numericVal;
    }
  }

  commitBoundaryAttempt(): void {
    if (this.currentStage !== 'BOUNDARY_TEST') {
      throw new Core1BValidationError('ILLEGAL_STAGE', `Cannot commit boundary in stage ${this.currentStage}`);
    }
    if (!this.taskBAttemptText.trim() && this.taskBNumericValue === null) {
      throw new Core1BValidationError('EMPTY_BOUNDARY_ATTEMPT', 'Learner must solve boundary test before commit');
    }
    this.boundaryCommitted = true;
    this.recordEvent('BOUNDARY_TEST', 'BOUNDARY_COMMITTED', {
      textLength: this.taskBAttemptText.length,
      numericVal: this.taskBNumericValue,
    });
    this.currentStage = 'COMPLETE';
  }

  isBoundaryCommitted(): boolean {
    return this.boundaryCommitted;
  }

  getTaskBSolution(): readonly string[] {
    if (!this.boundaryCommitted) {
      throw new Core1BValidationError(
        'BOUNDARY_FEEDBACK_LOCKED',
        'Boundary solution is locked until boundary attempt is committed'
      );
    }
    return this.definition.boundaryTaskB.solutionSteps;
  }

  // --- Return to Source ---

  returnToSource(): string {
    if (this.currentStage !== 'COMPLETE') {
      throw new Core1BValidationError(
        'JOURNEY_INCOMPLETE',
        'Complete all six cognitive stages before returning to source'
      );
    }
    this.sourceReturned = true;
    this.recordEvent('COMPLETE', 'SOURCE_RETURNED', { originId: this.definition.originRef.id });
    return `/learn/${this.definition.originRef.id}`;
  }

  isSourceReturned(): boolean {
    return this.sourceReturned;
  }

  // --- Draft State Persistence ---

  toDraft(): Core1BDraft {
    return {
      journeyId: this.definition.journeyId,
      currentStage: this.currentStage,
      predictionIndex: this.predictionIndex,
      taskAAttemptText: this.taskAAttemptText,
      taskANumericValue: this.taskANumericValue,
      firstAttemptCommitted: this.firstAttemptCommitted,
      exposedHints: Array.from(this.exposedHintsSet),
      isAssisted: this.isAssisted,
      selectedDiagnosticCode: this.selectedDiagnosticCode,
      repairExplanation: this.repairExplanation,
      taskBAttemptText: this.taskBAttemptText,
      taskBNumericValue: this.taskBNumericValue,
      boundaryCommitted: this.boundaryCommitted,
      sourceReturned: this.sourceReturned,
      events: [...this.eventHistory],
    };
  }

  restoreDraft(draft: Core1BDraft): void {
    if (draft.journeyId !== this.definition.journeyId) {
      throw new Core1BValidationError('DRAFT_MISMATCH', `Draft journeyId does not match current journey`);
    }
    this.currentStage = draft.currentStage;
    this.predictionIndex = draft.predictionIndex;
    this.taskAAttemptText = draft.taskAAttemptText;
    this.taskANumericValue = draft.taskANumericValue;
    this.firstAttemptCommitted = draft.firstAttemptCommitted;
    this.exposedHintsSet = new Set(draft.exposedHints);
    this.isAssisted = draft.isAssisted;
    this.selectedDiagnosticCode = draft.selectedDiagnosticCode;
    this.repairExplanation = draft.repairExplanation;
    this.taskBAttemptText = draft.taskBAttemptText;
    this.taskBNumericValue = draft.taskBNumericValue;
    this.boundaryCommitted = draft.boundaryCommitted;
    this.sourceReturned = draft.sourceReturned;
    this.eventHistory = [...draft.events];
  }
}
