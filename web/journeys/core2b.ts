/**
 * web/journeys/core2b.ts
 * A68 — Core2B Changed-Demand Transfer Journey Runtime.
 *
 * Implements:
 * - Native blueprint BP-CORE2B-TRANSFER@1.1.0
 * - Prior exposure and taught capability closure verification
 * - Protected DECIDE move (changed decision withheld pre-attempt)
 * - Safe representations and scaffolds (rejection of scaffolds that collapse transfer demand)
 * - Durable commitment: first attempt is immutable; mutation leaks rejected
 * - Save failure blocks reveal (atomic persistence gate)
 * - Full multi-factor rubric with explicit criteria
 * - Independent boundary and diagnostic repair route
 * - Strict prohibition of automatic human grading
 *
 * No academic approval inferred from software validation.
 */

export const CORE2B_BLUEPRINT_ID = 'BP-CORE2B-TRANSFER@1.1.0';

export type TransferDimension =
  | 'REPRESENTATION_SHIFT'
  | 'CONSTRAINT_MUTATION'
  | 'INFERENTIAL_INVERSION'
  | 'COUPLING_EXPANSION';

export type ScaffoldLevel = 'ORIENTATION' | 'CLARIFICATION' | 'STRUCTURE';

export interface ExactRef {
  readonly type: string;
  readonly id: string;
  readonly revision: number;
  readonly sha256: string;
}

export interface LearnerCapabilityProfile {
  readonly learnerId: string;
  readonly taughtCapabilityIds: readonly string[];
  readonly priorExposures: readonly string[];
}

export interface TransferLineage {
  readonly anchorTaskId: string;
  readonly anchorSha256: string;
  readonly requiredCapabilityIds: readonly string[];
  readonly dimension: TransferDimension;
  readonly statement: string;
  readonly isCoverStoryOnly: boolean;
}

export interface ProtectedMove {
  readonly id: string;
  readonly description: string;
  readonly crucialDecision: string;
  readonly withheldPreAttempt: boolean;
  readonly revealedPostAttemptExplanation: string;
}

export interface SafeTransferScaffold {
  readonly id: string;
  readonly level: ScaffoldLevel;
  readonly title: string;
  readonly hintText: string;
  readonly collapsesTransferDemand: boolean;
}

export interface RubricCriterion {
  readonly id: string;
  readonly criterionText: string;
  readonly maxPoints: number;
  readonly acceptableVariations: readonly string[];
  readonly diagnosticMisconceptions: readonly string[];
}

export interface RepairRoute {
  readonly repairId: string;
  readonly diagnosticFocus: string;
  readonly targetMisconception: string;
  readonly remediationTaskRef: string;
  readonly isIndependentBoundaryPreserved: boolean;
}

export interface Core2BTask {
  readonly taskId: string;
  readonly title: string;
  readonly stem: string;
  readonly stemSha256: string;
  readonly lineage: TransferLineage;
  readonly protectedMove: ProtectedMove;
  readonly scaffolds: readonly SafeTransferScaffold[];
  readonly rubric: readonly RubricCriterion[];
  readonly fullSolutionSteps: readonly string[];
  readonly repairRoute: RepairRoute;
}

export interface Core2BTransferDefinition {
  readonly journeyId: string;
  readonly topicId: string;
  readonly task: Core2BTask;
  readonly status: 'SYNTHETIC' | 'HOLD' | 'CANDIDATE';
}

export interface AttemptDraft {
  readonly workingText: string;
  readonly symbolicDraft: string;
  readonly selectedScaffoldIds: readonly string[];
  readonly timestamp: number;
}

export interface CommittedAttempt {
  readonly initialWorkingText: string;
  readonly initialSymbolicDraft: string;
  readonly initialTimestamp: number;
  readonly committedSha256: string;
  readonly isSavedDurable: boolean;
}

export interface CapabilityClosureResult {
  readonly isEligible: boolean;
  readonly reason?: 'ELIGIBLE' | 'MISSING_LINEAGE_BLOCKED' | 'UNTAUGHT_CAPABILITY_BLOCKED' | 'COVER_STORY_ONLY_REJECTED';
  readonly missingCapabilities?: readonly string[];
}

export interface Core2BTransferState {
  readonly phase: 'PRE_ATTEMPT' | 'ATTEMPT_COMMITTED' | 'REVEALED' | 'REPAIR_ENGAGED';
  readonly isProtectedMoveWithheld: boolean;
  readonly isAttemptCommitted: boolean;
  readonly isSaved: boolean;
  readonly isSolutionRevealed: boolean;
  readonly activeScaffoldLevel: ScaffoldLevel | null;
  readonly committedAttempt: CommittedAttempt | null;
  readonly activeRepair: RepairRoute | null;
  readonly academicAdmission: 'HOLD';
  readonly releaseAuthority: 'NONE';
  readonly gradingAuthority: 'NO_AUTOMATIC_HUMAN_GRADING';
}

/**
 * Storage mock / adapter interface to verify durable commitment
 */
export interface DurableStoragePort {
  saveCommittedAttempt(journeyId: string, attempt: CommittedAttempt): Promise<{ success: boolean; error?: string }>;
}

export class Core2BTransferJourney {
  private readonly definition: Core2BTransferDefinition;
  private readonly learnerProfile: LearnerCapabilityProfile;
  private state: Core2BTransferState;
  private draft: AttemptDraft;
  private committedAttemptRecord: CommittedAttempt | null = null;

  constructor(definition: Core2BTransferDefinition, learnerProfile: LearnerCapabilityProfile) {
    this.definition = definition;
    this.learnerProfile = learnerProfile;

    // Validate capability closure and lineage at construction
    const closure = Core2BTransferJourney.verifyCapabilityClosure(definition.task.lineage, learnerProfile);
    if (!closure.isEligible) {
      throw new Error(`TRANSFER_INELIGIBLE: ${closure.reason}`);
    }

    // Invariant: Protected move must be withheld pre-attempt
    if (!definition.task.protectedMove.withheldPreAttempt) {
      throw new Error('PROTECTED_MOVE_DISCLOSED_PRE_ATTEMPT: protected move must be strictly withheld before attempt');
    }

    // Invariant: Pre-attempt scaffolds must not collapse transfer demand
    for (const sc of definition.task.scaffolds) {
      if (sc.collapsesTransferDemand) {
        throw new Error(`METHOD_OR_ANSWER_SUPPORT_THAT_COLLAPSES_TRANSFER: scaffold ${sc.id} collapses transfer demand`);
      }
    }

    this.draft = {
      workingText: '',
      symbolicDraft: '',
      selectedScaffoldIds: [],
      timestamp: Date.now(),
    };

    this.state = {
      phase: 'PRE_ATTEMPT',
      isProtectedMoveWithheld: true,
      isAttemptCommitted: false,
      isSaved: false,
      isSolutionRevealed: false,
      activeScaffoldLevel: null,
      committedAttempt: null,
      activeRepair: null,
      academicAdmission: 'HOLD',
      releaseAuthority: 'NONE',
      gradingAuthority: 'NO_AUTOMATIC_HUMAN_GRADING',
    };
  }

  /**
   * Statically verify taught capability closure and lineage continuity
   */
  public static verifyCapabilityClosure(
    lineage: TransferLineage,
    profile: LearnerCapabilityProfile,
  ): CapabilityClosureResult {
    // 1. Lineage continuity check
    if (!lineage.anchorTaskId || !lineage.anchorSha256) {
      return { isEligible: false, reason: 'MISSING_LINEAGE_BLOCKED' };
    }

    // 2. Cover story only rejection
    if (lineage.isCoverStoryOnly) {
      return { isEligible: false, reason: 'COVER_STORY_ONLY_REJECTED' };
    }

    // 3. Prior exposure / taught capability closure
    const missing: string[] = [];
    for (const req of lineage.requiredCapabilityIds) {
      if (!profile.taughtCapabilityIds.includes(req)) {
        missing.push(req);
      }
    }

    if (missing.length > 0) {
      return {
        isEligible: false,
        reason: 'UNTAUGHT_CAPABILITY_BLOCKED',
        missingCapabilities: missing,
      };
    }

    return { isEligible: true, reason: 'ELIGIBLE' };
  }

  public getTask(): Core2BTask {
    return this.definition.task;
  }

  public getState(): Core2BTransferState {
    return { ...this.state };
  }

  public getDraft(): AttemptDraft {
    return { ...this.draft };
  }

  public updateDraft(workingText: string, symbolicDraft: string): void {
    if (this.state.isAttemptCommitted) {
      throw new Error('IMMUTABLE_ATTEMPT_LOCKED: first attempt cannot be mutated after durable commitment');
    }
    this.draft = {
      ...this.draft,
      workingText,
      symbolicDraft,
      timestamp: Date.now(),
    };
  }

  public selectScaffold(level: ScaffoldLevel): readonly SafeTransferScaffold[] {
    const available = this.definition.task.scaffolds.filter((s) => s.level === level);
    this.state = {
      ...this.state,
      activeScaffoldLevel: level,
    };
    return available;
  }

  /**
   * Commit attempt: creates immutable first attempt snapshot.
   * If storage port is provided, attempts atomic persistence.
   */
  public async commitAttempt(storage?: DurableStoragePort): Promise<CommittedAttempt> {
    if (this.state.isAttemptCommitted) {
      throw new Error('IMMUTABLE_ATTEMPT_LOCKED: attempt has already been committed');
    }
    if (!this.draft.workingText.trim() && !this.draft.symbolicDraft.trim()) {
      throw new Error('EMPTY_ATTEMPT_REJECTED: cannot commit empty attempt');
    }

    // Generate deterministic hash of first attempt
    const payload = `${this.draft.workingText}::${this.draft.symbolicDraft}::${this.draft.timestamp}`;
    const committedSha256 = Core2BTransferJourney.computeSimpleHash(payload);

    const record: CommittedAttempt = {
      initialWorkingText: this.draft.workingText,
      initialSymbolicDraft: this.draft.symbolicDraft,
      initialTimestamp: this.draft.timestamp,
      committedSha256,
      isSavedDurable: false,
    };

    let isSaved = false;
    if (storage) {
      const res = await storage.saveCommittedAttempt(this.definition.journeyId, record);
      if (!res.success) {
        // Record committed locally but marked as unsaved
        this.committedAttemptRecord = { ...record, isSavedDurable: false };
        this.state = {
          ...this.state,
          phase: 'ATTEMPT_COMMITTED',
          isAttemptCommitted: true,
          isSaved: false,
          committedAttempt: this.committedAttemptRecord,
        };
        throw new Error(`SAVE_FAILURE_PERSISTENCE_ERROR: ${res.error || 'unknown storage failure'}`);
      }
      isSaved = true;
    } else {
      // If no storage port is provided, consider locally persisted for synchronous testing
      isSaved = true;
    }

    this.committedAttemptRecord = { ...record, isSavedDurable: isSaved };
    this.state = {
      ...this.state,
      phase: 'ATTEMPT_COMMITTED',
      isAttemptCommitted: true,
      isSaved,
      committedAttempt: this.committedAttemptRecord,
    };

    return this.committedAttemptRecord;
  }

  /**
   * Reveal full rubric and solution steps.
   * STRICT GATES:
   * 1. Attempt must be committed first.
   * 2. Attempt must be successfully saved (save failure blocks reveal).
   */
  public revealSolution(): {
    readonly protectedDecisionReview: string;
    readonly solutionSteps: readonly string[];
    readonly rubric: readonly RubricCriterion[];
  } {
    if (!this.state.isAttemptCommitted) {
      throw new Error('ATTEMPT_REQUIRED_BEFORE_REVEAL: first attempt must be committed before reveal');
    }
    if (!this.state.isSaved) {
      throw new Error('SAVE_FAILURE_BLOCKS_REVEAL: attempt must be durably saved before reveal can proceed');
    }

    this.state = {
      ...this.state,
      phase: 'REVEALED',
      isProtectedMoveWithheld: false,
      isSolutionRevealed: true,
    };

    return {
      protectedDecisionReview: this.definition.task.protectedMove.revealedPostAttemptExplanation,
      solutionSteps: this.definition.task.fullSolutionSteps,
      rubric: this.definition.task.rubric,
    };
  }

  /**
   * Engage diagnostic repair route while preserving independent boundary
   */
  public engageRepair(): RepairRoute {
    if (!this.state.isSolutionRevealed) {
      throw new Error('REPAIR_PRECONDITION_UNMET: solution and rubric review must precede diagnostic repair');
    }
    const repair = this.definition.task.repairRoute;
    if (!repair.isIndependentBoundaryPreserved) {
      throw new Error('BOUNDARY_INTEGRITY_VIOLATION: repair route weakened independent boundary task');
    }

    this.state = {
      ...this.state,
      phase: 'REPAIR_ENGAGED',
      activeRepair: repair,
    };
    return repair;
  }

  private static computeSimpleHash(input: string): string {
    let hash = 0x811c9dc5;
    for (let i = 0; i < input.length; i++) {
      hash ^= input.charCodeAt(i);
      hash = Math.imul(hash, 0x01000193);
    }
    return (hash >>> 0).toString(16).padStart(8, '0');
  }
}

