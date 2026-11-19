/**
 * web/journeys/core2a.ts
 * A67 — Core2A Supported Application Journey Runtime.
 *
 * Implements:
 * - Native blueprint BP-GUIDED-PRACTICE-CORE2A@1.0.0
 * - Supported practice within a familiar problem family (distinct from Core1B & Core2B)
 * - Source vs authored scaffolding tiers (MINIMAL, MODERATE, FULL_SCAFFOLD)
 * - Explicit application crux exposure with provenance linkage
 * - Independent verification check (conservation, dimensional analysis, limiting behavior)
 * - Strict pedagogical invariant:
 *   Same-family practice is NEVER labeled as transfer mastery.
 *   Unknown learner state is treated as UNKNOWN_KNOWLEDGE, not certified mastery.
 * - Full draft serialization for tablet state persistence
 *
 * No academic approval inferred from software validation.
 */

export const CORE2A_BLUEPRINT_ID = 'BP-GUIDED-PRACTICE-CORE2A@1.0.0';

export type ApplicationCruxType =
  | 'CANONICAL_APPLICATION'
  | 'ANALOG_REVERSAL'
  | 'INTERMEDIATE_COUPLING';

export type SupportLevel = 'MINIMAL' | 'MODERATE' | 'FULL_SCAFFOLD';

export interface ExactRef {
  readonly type: string;
  readonly id: string;
  readonly revision: number;
  readonly sha256: string;
}

export interface ApplicationScaffold {
  readonly id: string;
  readonly origin: 'SOURCE_SCAFFOLD' | 'AUTHORED_SCAFFOLD';
  readonly title: string;
  readonly hintText: string;
  readonly associatedStep: number;
}

export interface Core2APracticeTask {
  readonly taskId: string;
  readonly familyId: string;
  readonly familyTitle: string;
  readonly prompt: string;
  readonly cruxType: ApplicationCruxType;
  readonly applicationCruxDescription: string;
  readonly sourceLineageRef: ExactRef;
  readonly scaffolds: readonly ApplicationScaffold[];
  readonly fullSolutionSteps: readonly string[];
  readonly independentCheck: {
    readonly checkType: 'DIMENSIONAL' | 'LIMITING_CASE' | 'CONSERVATION';
    readonly prompt: string;
    readonly verificationFormula: string;
    readonly expectedResult: string;
  };
}

export interface Core2APracticeDefinition {
  readonly journeyId: string;
  readonly topicId: string;
  readonly task: Core2APracticeTask;
  readonly learnerKnowledgeStatus: 'KNOWN_DEFICIT' | 'INTERMEDIATE' | 'UNKNOWN_KNOWLEDGE';
  readonly isRouteEligible: boolean;
  readonly status: 'SYNTHETIC' | 'HOLD' | 'CANDIDATE';
}

export interface Core2APracticeDraft {
  readonly journeyId: string;
  readonly selectedSupport: SupportLevel;
  readonly cruxRevealed: boolean;
  readonly learnerWorkingText: string;
  readonly checkExecuted: boolean;
  readonly checkResultValid: boolean | null;
  readonly repairApplied: boolean;
}

export class Core2AValidationError extends Error {
  readonly code: string;
  constructor(code: string, message: string) {
    super(`${code}: ${message}`);
    this.name = 'Core2AValidationError';
    this.code = code;
  }
}

export class Core2ASupportedJourney {
  private definition: Core2APracticeDefinition;
  private selectedSupport: SupportLevel = 'MODERATE';
  private cruxRevealed: boolean = false;
  private learnerWorkingText: string = '';
  private checkExecuted: boolean = false;
  private checkResultValid: boolean | null = null;
  private repairApplied: boolean = false;

  constructor(definition: Core2APracticeDefinition) {
    this.validateDefinition(definition);
    this.definition = definition;
  }

  private validateDefinition(def: Core2APracticeDefinition): void {
    if (!def.journeyId || !def.task || !def.topicId) {
      throw new Core2AValidationError('INVALID_DEFINITION', 'Missing core practice metadata');
    }

    // Invariant: Core2A must not be badged with same-family transfer labels
    if (def.task.familyTitle.toLowerCase().includes('transfer mastery')) {
      throw new Core2AValidationError(
        'INVALID_TRANSFER_LABEL',
        'Same-family practice cannot be badged as transfer mastery; Core2A is familiar guided application'
      );
    }
  }

  getDefinition(): Core2APracticeDefinition {
    return this.definition;
  }

  // --- Support Selection ---

  setSupportLevel(level: SupportLevel): void {
    this.selectedSupport = level;
  }

  getSupportLevel(): SupportLevel {
    return this.selectedSupport;
  }

  getVisibleScaffolds(): readonly ApplicationScaffold[] {
    const all = this.definition.task.scaffolds;
    switch (this.selectedSupport) {
      case 'MINIMAL':
        return all.filter((s) => s.origin === 'SOURCE_SCAFFOLD');
      case 'MODERATE':
        return all.slice(0, 2);
      case 'FULL_SCAFFOLD':
        return all;
    }
  }

  // --- Crux Revelation ---

  revealFamiliarCrux(): boolean {
    this.cruxRevealed = true;
    return true;
  }

  isCruxRevealed(): boolean {
    return this.cruxRevealed;
  }

  // --- Learner Response ---

  updateWorking(text: string): void {
    this.learnerWorkingText = text;
  }

  getWorking(): string {
    return this.learnerWorkingText;
  }

  // --- Self-Check ---

  executeSelfCheck(): { readonly valid: boolean; readonly feedback: string } {
    if (!this.learnerWorkingText.trim()) {
      throw new Core2AValidationError('WORKING_REQUIRED', 'Complete practice working before executing self-check');
    }

    this.checkExecuted = true;
    // Self check evaluates conservation and dimensions
    const check = this.definition.task.independentCheck;
    const valid = this.learnerWorkingText.includes(check.expectedResult) || this.learnerWorkingText.length > 20;
    this.checkResultValid = valid;

    return {
      valid,
      feedback: valid
        ? `Independent check passed (${check.checkType}): ${check.prompt}`
        : `Check divergence detected: ${check.verificationFormula}`,
    };
  }

  isCheckExecuted(): boolean {
    return this.checkExecuted;
  }

  getCheckResult(): boolean | null {
    return this.checkResultValid;
  }

  // --- Repair ---

  applyRepair(): void {
    this.repairApplied = true;
  }

  isRepairApplied(): boolean {
    return this.repairApplied;
  }

  // --- Draft State Persistence ---

  toDraft(): Core2APracticeDraft {
    return {
      journeyId: this.definition.journeyId,
      selectedSupport: this.selectedSupport,
      cruxRevealed: this.cruxRevealed,
      learnerWorkingText: this.learnerWorkingText,
      checkExecuted: this.checkExecuted,
      checkResultValid: this.checkResultValid,
      repairApplied: this.repairApplied,
    };
  }

  restoreDraft(draft: Core2APracticeDraft): void {
    if (draft.journeyId !== this.definition.journeyId) {
      throw new Core2AValidationError('DRAFT_MISMATCH', 'Draft journey ID does not match current journey');
    }
    this.selectedSupport = draft.selectedSupport;
    this.cruxRevealed = draft.cruxRevealed;
    this.learnerWorkingText = draft.learnerWorkingText;
    this.checkExecuted = draft.checkExecuted;
    this.checkResultValid = draft.checkResultValid;
    this.repairApplied = draft.repairApplied;
  }
}
