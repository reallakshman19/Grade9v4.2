/**
 * web/journeys/core1a.ts
 * A31 — Core1A Teaching Journey Runtime.
 *
 * Implements:
 * - Native blueprint BP-TEACHING-CORE1A@1.0.0
 * - Nine ordered instructional roles (A1 through A9):
 *   A1: Phenomenon / Orientation
 *   A2: Prerequisite Conventions (axes, signs, reference states, domains)
 *   A3: Physical Model & Representation Bridge (picture, symbols, words)
 *   A4: Law, Derivations & Conditions (inferential jumps, why_valid steps)
 *   A5: Scientific Simulation / Read the Model
 *   A6: Reasoning Construction & Completed Worked Example
 *   A7: Misconception Alert & Diagnostic Repair
 *   A8: Boundary & Changed Conditions
 *   A9: Synthesis Task & Reflection
 * - Three distinct progressive anchors:
 *   FOUNDATION, CONNECTED, ADVANCED
 * - Rejection of recycled synthesis task (N32 invariant)
 * - Scientific interactive model prediction & observation gating
 * - Fresh task route eligibility gating: route only if eligible!
 *   (Gated on lesson validity, completed units, non-stale status)
 * - Strict pedagogical precommit masking: no answer leakage
 * - Full draft serialization for tablet session recovery
 *
 * No academic approval inferred from software validation.
 */

export const CORE1A_BLUEPRINT_ID = 'BP-TEACHING-CORE1A@1.0.0';

export type Core1ARole = 'A1' | 'A2' | 'A3' | 'A4' | 'A5' | 'A6' | 'A7' | 'A8' | 'A9';

export const CORE1A_ORDERED_ROLES: readonly Core1ARole[] = [
  'A1',
  'A2',
  'A3',
  'A4',
  'A5',
  'A6',
  'A7',
  'A8',
  'A9',
] as const;

export type IntrinsicDepthBadge = 'EASY' | 'MEDIUM' | 'HARD';

export type AnchorLevel = 'FOUNDATION' | 'CONNECTED' | 'ADVANCED';

export const ANCHOR_LEVELS: readonly AnchorLevel[] = [
  'FOUNDATION',
  'CONNECTED',
  'ADVANCED',
] as const;

export interface ExactRef {
  readonly type: string;
  readonly id: string;
  readonly revision: number;
  readonly sha256: string;
}

export interface RepresentationCorrespondence {
  readonly pictureElement: string;
  readonly symbol: string;
  readonly inWords: string;
}

export interface DerivationStep {
  readonly stepNumber: number;
  readonly expression: string;
  readonly whyValid: string;
  readonly sourceRef?: string;
}

export interface MisconceptionItem {
  readonly wrongIdea: string;
  readonly diagnosticPrompt: string;
  readonly diagnosticOptions?: readonly string[];
  readonly repair: string;
}

export interface Core1AUnitData {
  readonly role: Core1ARole;
  readonly title: string;
  readonly summary: string;
  readonly bodyText: string;
  readonly blockRefs: readonly ExactRef[];
  readonly evidenceRefs: readonly ExactRef[];
  readonly conventions?: readonly string[];
  readonly representationBridge?: readonly RepresentationCorrespondence[];
  readonly derivationSteps?: readonly DerivationStep[];
  readonly workedExample?: {
    readonly problemPrompt: string;
    readonly fullReasoningSteps: readonly string[];
    readonly solutionResult: string;
  };
  readonly misconception?: MisconceptionItem;
  readonly boundaryConditions?: readonly string[];
  readonly selfCheckPrompt?: string;
}

export interface ProgressiveAnchor {
  readonly level: AnchorLevel;
  readonly taskRef: ExactRef;
  readonly title: string;
  readonly prompt: string;
  readonly solutionRef: ExactRef;
  readonly solutionSteps: readonly string[];
  readonly warrantRefs: readonly ExactRef[];
}

export interface Core1AModelConfig {
  readonly modelId: string;
  readonly modelName: string;
  readonly defaultParameters: Record<string, number>;
  readonly parameterBounds: Record<string, { readonly min: number; readonly max: number }>;
  readonly qualitativePredictionPrompt: string;
  readonly predictionOptions: readonly string[];
  readonly expectedPredictionIndex: number;
  readonly observationNote: string;
}

export interface Core1ALessonDefinition {
  readonly lessonRef: ExactRef;
  readonly constructionRef: ExactRef;
  readonly title: string;
  readonly subject: string;
  readonly topicId: string;
  readonly depthBadge: IntrinsicDepthBadge;
  readonly status: 'SYNTHETIC' | 'HOLD' | 'CANDIDATE' | 'STALE' | 'APPROVED';
  readonly units: readonly Core1AUnitData[];
  readonly anchors: readonly ProgressiveAnchor[];
  readonly modelConfig: Core1AModelConfig;
  readonly synthesisTaskRef: ExactRef;
  readonly synthesisTaskPrompt: string;
  readonly freshTaskRef?: ExactRef;
}

export interface Core1ADraft {
  readonly lessonId: string;
  readonly activeUnitRole: Core1ARole;
  readonly completedRoles: readonly Core1ARole[];
  readonly modelParameters: Record<string, number>;
  readonly modelPredictionIndex: number | null;
  readonly modelObserved: boolean;
  readonly revealedAnchorSolutions: readonly AnchorLevel[];
  readonly revealedWorkedExamples: readonly Core1ARole[];
  readonly depthView: IntrinsicDepthBadge;
  readonly learnerNotes: string;
}

export class Core1AValidationError extends Error {
  readonly code: string;
  constructor(code: string, message: string) {
    super(`${code}: ${message}`);
    this.name = 'Core1AValidationError';
    this.code = code;
  }
}

export class Core1ATeachingJourney {
  private lesson: Core1ALessonDefinition;
  private activeUnitRole: Core1ARole = 'A1';
  private completedRolesSet: Set<Core1ARole> = new Set<Core1ARole>();
  private modelParameters: Record<string, number> = {};
  private modelPredictionIndex: number | null = null;
  private modelObserved: boolean = false;
  private revealedAnchorSolutionsSet: Set<AnchorLevel> = new Set<AnchorLevel>();
  private revealedWorkedExamplesSet: Set<Core1ARole> = new Set<Core1ARole>();
  private currentDepthView: IntrinsicDepthBadge = 'MEDIUM';
  private learnerNotes: string = '';

  constructor(lesson: Core1ALessonDefinition) {
    this.validateLessonInvariants(lesson);
    this.lesson = lesson;
    this.currentDepthView = lesson.depthBadge;
    this.modelParameters = { ...lesson.modelConfig.defaultParameters };
    // Start with A1 completed as current active reading
    this.completedRolesSet.add('A1');
  }

  /**
   * Enforces semantic invariants for Core1A:
   * - Exactly 9 units A1 through A9 without omission or duplicates
   * - Exactly 3 progressive anchors (FOUNDATION, CONNECTED, ADVANCED)
   * - Anchor task IDs must be distinct
   * - Synthesis task ID must NOT recycle any anchor task ID (N32)
   */
  private validateLessonInvariants(lesson: Core1ALessonDefinition): void {
    if (!lesson.units || lesson.units.length !== 9) {
      throw new Core1AValidationError(
        'INVALID_UNIT_COUNT',
        `Expected exactly 9 units A1..A9, got ${lesson.units ? lesson.units.length : 0}`
      );
    }

    const roles = lesson.units.map((u) => u.role);
    for (const expectedRole of CORE1A_ORDERED_ROLES) {
      if (!roles.includes(expectedRole)) {
        throw new Core1AValidationError(
          'MISSING_TEACHING_ROLE',
          `Required teaching role ${expectedRole} is missing from lesson units`
        );
      }
    }

    const uniqueRoles = new Set(roles);
    if (uniqueRoles.size !== 9) {
      throw new Core1AValidationError(
        'DUPLICATE_TEACHING_ROLE',
        `Duplicate teaching roles detected in lesson units: ${roles.join(', ')}`
      );
    }

    if (!lesson.anchors || lesson.anchors.length !== 3) {
      throw new Core1AValidationError(
        'INVALID_ANCHOR_COUNT',
        `Expected exactly 3 anchors, got ${lesson.anchors ? lesson.anchors.length : 0}`
      );
    }

    const levels = lesson.anchors.map((a) => a.level);
    for (const expLevel of ANCHOR_LEVELS) {
      if (!levels.includes(expLevel)) {
        throw new Core1AValidationError(
          'MISSING_ANCHOR_LEVEL',
          `Missing progressive anchor level: ${expLevel}`
        );
      }
    }

    const anchorTaskIds = new Set<string>();
    for (const a of lesson.anchors) {
      if (anchorTaskIds.has(a.taskRef.id)) {
        throw new Core1AValidationError(
          'RECYCLED_ANCHOR_TASK',
          `Anchor task ref ID ${a.taskRef.id} is duplicated across anchors`
        );
      }
      anchorTaskIds.add(a.taskRef.id);
    }

    // N32 Invariant: Synthesis task cannot reuse any anchor task
    if (anchorTaskIds.has(lesson.synthesisTaskRef.id)) {
      throw new Core1AValidationError(
        'RECYCLED_SYNTHESIS_TASK',
        `Synthesis task ${lesson.synthesisTaskRef.id} recycled an anchor task ID (N32 violation)`
      );
    }
  }

  // --- Navigation & Section Actions ---

  getActiveRole(): Core1ARole {
    return this.activeUnitRole;
  }

  getActiveUnit(): Core1AUnitData {
    const unit = this.lesson.units.find((u) => u.role === this.activeUnitRole);
    if (!unit) {
      throw new Core1AValidationError('UNIT_NOT_FOUND', `Unit ${this.activeUnitRole} not found`);
    }
    return unit;
  }

  selectSection(role: Core1ARole): void {
    if (!CORE1A_ORDERED_ROLES.includes(role)) {
      throw new Core1AValidationError('INVALID_ROLE', `Role ${role} is not a valid Core1A role`);
    }
    this.activeUnitRole = role;
    this.completedRolesSet.add(role);
  }

  nextSection(): Core1ARole {
    const currentIndex = CORE1A_ORDERED_ROLES.indexOf(this.activeUnitRole);
    if (currentIndex < CORE1A_ORDERED_ROLES.length - 1) {
      const nextRole = CORE1A_ORDERED_ROLES[currentIndex + 1];
      this.selectSection(nextRole);
      return nextRole;
    }
    return this.activeUnitRole;
  }

  previousSection(): Core1ARole {
    const currentIndex = CORE1A_ORDERED_ROLES.indexOf(this.activeUnitRole);
    if (currentIndex > 0) {
      const prevRole = CORE1A_ORDERED_ROLES[currentIndex - 1];
      this.selectSection(prevRole);
      return prevRole;
    }
    return this.activeUnitRole;
  }

  isRoleCompleted(role: Core1ARole): boolean {
    return this.completedRolesSet.has(role);
  }

  getCompletedRoles(): readonly Core1ARole[] {
    return Array.from(this.completedRolesSet);
  }

  // --- Depth Control ---

  getDepthBadge(): IntrinsicDepthBadge {
    return this.lesson.depthBadge;
  }

  getCurrentDepthView(): IntrinsicDepthBadge {
    return this.currentDepthView;
  }

  setDepthView(badge: IntrinsicDepthBadge): void {
    this.currentDepthView = badge;
  }

  // --- Model Interaction (A5) ---

  getModelConfig(): Core1AModelConfig {
    return this.lesson.modelConfig;
  }

  getModelParameters(): Record<string, number> {
    return { ...this.modelParameters };
  }

  updateModelParameter(name: string, value: number): void {
    const bounds = this.lesson.modelConfig.parameterBounds[name];
    if (bounds) {
      if (value < bounds.min || value > bounds.max) {
        throw new Core1AValidationError(
          'INVALID_MODEL_DOMAIN',
          `Parameter ${name}=${value} is outside domain bounds [${bounds.min}, ${bounds.max}]`
        );
      }
    }
    this.modelParameters[name] = value;
  }

  predictModel(optionIndex: number): void {
    if (
      optionIndex < 0 ||
      optionIndex >= this.lesson.modelConfig.predictionOptions.length
    ) {
      throw new Core1AValidationError(
        'INVALID_PREDICTION_INDEX',
        `Option index ${optionIndex} is invalid`
      );
    }
    this.modelPredictionIndex = optionIndex;
  }

  getModelPrediction(): { readonly index: number | null; readonly isCorrect: boolean } {
    if (this.modelPredictionIndex === null) {
      return { index: null, isCorrect: false };
    }
    return {
      index: this.modelPredictionIndex,
      isCorrect: this.modelPredictionIndex === this.lesson.modelConfig.expectedPredictionIndex,
    };
  }

  observeModel(): void {
    if (this.modelPredictionIndex === null) {
      throw new Core1AValidationError(
        'PREDICTION_REQUIRED',
        'Learner must commit qualitative prediction before observing model simulation'
      );
    }
    this.modelObserved = true;
    this.completedRolesSet.add('A5');
  }

  isModelObserved(): boolean {
    return this.modelObserved;
  }

  checkModelFit(): { readonly valid: boolean; readonly feedback: string } {
    for (const [key, bounds] of Object.entries(this.lesson.modelConfig.parameterBounds)) {
      const val = this.modelParameters[key];
      if (val === undefined || val < bounds.min || val > bounds.max) {
        return {
          valid: false,
          feedback: `Domain bound exceeded on ${key}: ${val} not in [${bounds.min}, ${bounds.max}]`,
        };
      }
    }
    return {
      valid: true,
      feedback: 'All parameters satisfy physical invariant domain constraints.',
    };
  }

  // --- Solution & Worked Example Disclosure Controls ---

  toggleWorkedExample(role: Core1ARole): boolean {
    if (this.revealedWorkedExamplesSet.has(role)) {
      this.revealedWorkedExamplesSet.delete(role);
      return false;
    } else {
      this.revealedWorkedExamplesSet.add(role);
      return true;
    }
  }

  isWorkedExampleRevealed(role: Core1ARole): boolean {
    return this.revealedWorkedExamplesSet.has(role);
  }

  toggleAnchorSolution(level: AnchorLevel): boolean {
    if (this.revealedAnchorSolutionsSet.has(level)) {
      this.revealedAnchorSolutionsSet.delete(level);
      return false;
    } else {
      this.revealedAnchorSolutionsSet.add(level);
      return true;
    }
  }

  isAnchorSolutionRevealed(level: AnchorLevel): boolean {
    return this.revealedAnchorSolutionsSet.has(level);
  }

  // --- Fresh Task Transfer Eligibility Gate ---

  /**
   * Route to fresh transfer is strictly conditioned:
   * 1. Lesson status must NOT be STALE or REJECTED.
   * 2. All 9 units A1 through A9 must be defined and present.
   * 3. Fresh task reference must be present.
   * 4. Learner must have reviewed all instructional units (or minimum sequence up to synthesis A9).
   */
  canRouteToFreshTransfer(): boolean {
    return this.getFreshRouteRejectionReason() === null;
  }

  getFreshRouteRejectionReason(): string | null {
    if (this.lesson.status === 'STALE') {
      return 'stale lesson';
    }
    if (this.lesson.status === 'REJECTED') {
      return 'lesson rejected by academic audit';
    }
    if (this.lesson.units.length < 9) {
      return 'missing unit';
    }
    if (!this.lesson.freshTaskRef) {
      return 'no fresh task';
    }
    // Learner must have engaged with core instructional units (at minimum A1..A6 and A9)
    const requiredPrereqRoles: Core1ARole[] = ['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A9'];
    for (const req of requiredPrereqRoles) {
      if (!this.completedRolesSet.has(req)) {
        return 'no eligible fresh task';
      }
    }
    return null;
  }

  getFreshTransferRoute(): string {
    const reason = this.getFreshRouteRejectionReason();
    if (reason !== null) {
      throw new Core1AValidationError('FRESH_TRANSFER_INELIGIBLE', `Cannot route to fresh transfer: ${reason}`);
    }
    return `/transfer/${this.lesson.lessonRef.id}`;
  }

  // --- Notes & Draft Persistence ---

  setLearnerNotes(notes: string): void {
    this.learnerNotes = notes;
  }

  getLearnerNotes(): string {
    return this.learnerNotes;
  }

  toDraft(): Core1ADraft {
    return {
      lessonId: this.lesson.lessonRef.id,
      activeUnitRole: this.activeUnitRole,
      completedRoles: Array.from(this.completedRolesSet),
      modelParameters: { ...this.modelParameters },
      modelPredictionIndex: this.modelPredictionIndex,
      modelObserved: this.modelObserved,
      revealedAnchorSolutions: Array.from(this.revealedAnchorSolutionsSet),
      revealedWorkedExamples: Array.from(this.revealedWorkedExamplesSet),
      depthView: this.currentDepthView,
      learnerNotes: this.learnerNotes,
    };
  }

  restoreDraft(draft: Core1ADraft): void {
    if (draft.lessonId !== this.lesson.lessonRef.id) {
      throw new Core1AValidationError(
        'DRAFT_LESSON_MISMATCH',
        `Draft lessonId ${draft.lessonId} does not match current lesson ${this.lesson.lessonRef.id}`
      );
    }
    this.activeUnitRole = draft.activeUnitRole;
    this.completedRolesSet = new Set(draft.completedRoles);
    this.modelParameters = { ...draft.modelParameters };
    this.modelPredictionIndex = draft.modelPredictionIndex;
    this.modelObserved = draft.modelObserved;
    this.revealedAnchorSolutionsSet = new Set(draft.revealedAnchorSolutions);
    this.revealedWorkedExamplesSet = new Set(draft.revealedWorkedExamples);
    this.currentDepthView = draft.depthView;
    this.learnerNotes = draft.learnerNotes;
  }

  getLesson(): Core1ALessonDefinition {
    return this.lesson;
  }
}
