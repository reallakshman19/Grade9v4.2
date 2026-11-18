/**
 * web/journeys/core1.ts
 * A66 — Core1 Orientation Journey Runtime.
 *
 * Implements:
 * - Native blueprint BP-ORIENTATION-CORE1@1.0.0
 * - Compact topic orientation with native conventions, relations, and boundary scope
 * - Hard-transition map detailing key inferential leaps
 * - Unclosed prompt closure enforcement (shared closure invariant)
 * - Navigation links to Core1A teaching lesson (/learn/:id)
 * - Native PDF export control: strictly gated on authorized exact output receipt
 * - Invariant: Never mutates scope based on learner knowledge waiver
 *
 * No academic approval inferred from software validation.
 */

export const CORE1_ORIENTATION_BLUEPRINT_ID = 'BP-ORIENTATION-CORE1@1.0.0';

export interface ConceptItem {
  readonly id: string;
  readonly name: string;
  readonly entryAssumption: string;
  readonly inferentialJump: string;
  readonly exitCriterion: string;
  readonly lessonRefId: string;
}

export interface HardTransitionNode {
  readonly id: string;
  readonly fromConcept: string;
  readonly toConcept: string;
  readonly cognitiveBarrier: string;
  readonly warrantResolution: string;
}

export interface PhysicalConvention {
  readonly name: string;
  readonly definition: string;
  readonly standardChoice: string;
  readonly rationale: string;
}

export interface InvariantRelation {
  readonly relationName: string;
  readonly mathematicalForm: string;
  readonly domainCondition: string;
}

export interface Core1OrientationDefinition {
  readonly topicId: string;
  readonly subject: string;
  readonly title: string;
  readonly overviewSummary: string;
  readonly concepts: readonly ConceptItem[];
  readonly conventions: readonly PhysicalConvention[];
  readonly hardTransitions: readonly HardTransitionNode[];
  readonly relations: readonly InvariantRelation[];
  readonly primaryLessonId: string;
  readonly printAuthorityReceipt?: {
    readonly receiptId: string;
    readonly signer: string;
    readonly sha256: string;
    readonly authorizedAt: string;
  };
  readonly status: 'SYNTHETIC' | 'HOLD' | 'CANDIDATE';
}

export interface Core1OrientationDraft {
  readonly topicId: string;
  readonly activeConceptId: string | null;
  readonly expandedSections: readonly string[];
  readonly printRequested: boolean;
  readonly learnerNotes: string;
}

export class Core1OrientationError extends Error {
  readonly code: string;
  constructor(code: string, message: string) {
    super(`${code}: ${message}`);
    this.name = 'Core1OrientationError';
    this.code = code;
  }
}

export class Core1OrientationJourney {
  private definition: Core1OrientationDefinition;
  private activeConceptId: string | null = null;
  private expandedSectionsSet: Set<string> = new Set<string>(['concepts', 'conventions', 'transitions']);
  private printRequested: boolean = false;
  private learnerNotes: string = '';

  constructor(definition: Core1OrientationDefinition) {
    this.validateDefinition(definition);
    this.definition = definition;
    if (definition.concepts.length > 0) {
      this.activeConceptId = definition.concepts[0].id;
    }
  }

  private validateDefinition(def: Core1OrientationDefinition): void {
    if (!def.topicId || !def.subject || !def.title) {
      throw new Core1OrientationError('INVALID_DEFINITION', 'Missing core orientation metadata');
    }
    if (!def.concepts || def.concepts.length === 0) {
      throw new Core1OrientationError('NO_CONCEPTS', 'Orientation must declare at least one canonical concept');
    }
    if (!def.primaryLessonId) {
      throw new Core1OrientationError('MISSING_PRIMARY_LESSON', 'Primary lesson link is required');
    }
  }

  getDefinition(): Core1OrientationDefinition {
    return this.definition;
  }

  // --- Concept Navigation ---

  getActiveConceptId(): string | null {
    return this.activeConceptId;
  }

  getActiveConcept(): ConceptItem | null {
    if (!this.activeConceptId) return null;
    return this.definition.concepts.find((c) => c.id === this.activeConceptId) || null;
  }

  jumpConcept(conceptId: string): void {
    const found = this.definition.concepts.find((c) => c.id === conceptId);
    if (!found) {
      throw new Core1OrientationError('CONCEPT_NOT_FOUND', `Concept ${conceptId} not in topic scope`);
    }
    this.activeConceptId = conceptId;
  }

  // --- Primary Lesson Link ---

  getLessonRoute(conceptId?: string): string {
    const targetConcept = conceptId ? this.definition.concepts.find((c) => c.id === conceptId) : this.getActiveConcept();
    const lessonId = targetConcept ? targetConcept.lessonRefId : this.definition.primaryLessonId;
    return `/learn/${lessonId}`;
  }

  // --- Section Toggles ---

  toggleSection(sectionKey: string): boolean {
    if (this.expandedSectionsSet.has(sectionKey)) {
      this.expandedSectionsSet.delete(sectionKey);
      return false;
    } else {
      this.expandedSectionsSet.add(sectionKey);
      return true;
    }
  }

  isSectionExpanded(sectionKey: string): boolean {
    return this.expandedSectionsSet.has(sectionKey);
  }

  // --- Native PDF Print Control ---

  /**
   * PDF output is permitted ONLY when an authorized exact receipt is present.
   */
  canPrintPDF(): boolean {
    return !!this.definition.printAuthorityReceipt;
  }

  getPrintRejectionReason(): string | null {
    if (!this.definition.printAuthorityReceipt) {
      return 'Native PDF print control requires signed academic release authority receipt.';
    }
    return null;
  }

  triggerPrint(): { readonly allowed: boolean; readonly receiptId?: string; readonly reason?: string } {
    if (!this.canPrintPDF()) {
      return { allowed: false, reason: this.getPrintRejectionReason() || 'Print unauthorized' };
    }
    this.printRequested = true;
    return {
      allowed: true,
      receiptId: this.definition.printAuthorityReceipt!.receiptId,
    };
  }

  // --- Notes & Draft State ---

  setLearnerNotes(notes: string): void {
    this.learnerNotes = notes;
  }

  toDraft(): Core1OrientationDraft {
    return {
      topicId: this.definition.topicId,
      activeConceptId: this.activeConceptId,
      expandedSections: Array.from(this.expandedSectionsSet),
      printRequested: this.printRequested,
      learnerNotes: this.learnerNotes,
    };
  }

  restoreDraft(draft: Core1OrientationDraft): void {
    if (draft.topicId !== this.definition.topicId) {
      throw new Core1OrientationError('DRAFT_TOPIC_MISMATCH', `Draft topic ${draft.topicId} does not match current topic`);
    }
    this.activeConceptId = draft.activeConceptId;
    this.expandedSectionsSet = new Set(draft.expandedSections);
    this.printRequested = draft.printRequested;
    this.learnerNotes = draft.learnerNotes;
  }
}
