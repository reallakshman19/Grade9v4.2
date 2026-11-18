/**
 * web/components/question-workspace.ts
 * A24 — Question workspace split-pane layout and interaction controller.
 *
 * Implements:
 * - Shared problem stimulus & response/scratchpad split-pane
 * - Rotation awareness (landscape: side-by-side; portrait: stacked)
 * - Progressive hint disclosure policy
 * - Commit lock upon final submission
 * - Core2 fault handling: missing figures, ambiguous/conditional/dropped/unverified keys
 * - Strict prohibition of score claims on HOLD questions
 * - Hit target sizing (48px min, 56px primary submit)
 *
 * No academic approval inferred from software validation.
 */

import { HIT_TARGET_MIN_PX, HIT_TARGET_PRIMARY_PX } from '../styles/tokens.ts';
import type {
  ResponseKind,
  ResponseValue,
  SubmissionStatus,
  EvaluationResult,
  KeyEvaluationStatus,
} from './response/types.ts';

export interface QuestionFigure {
  readonly id: string;
  readonly caption: string;
  readonly available: boolean;
  readonly contentSha256?: string;
  readonly sourceUrl?: string;
}

export interface QuestionHint {
  readonly id: string;
  readonly text: string;
  readonly penaltyPercent: number;
}

export interface WorkspaceQuestionDescriptor {
  readonly id: string;
  readonly code: string;
  readonly title: string;
  readonly stemText: string;
  readonly kind: ResponseKind;
  readonly options?: readonly any[];
  readonly allowedUnits?: readonly string[];
  readonly figures?: readonly QuestionFigure[];
  readonly hints?: readonly QuestionHint[];
  readonly status: 'RELEASED' | 'WITHDRAWN' | 'HOLD';
  readonly keyStatus: KeyEvaluationStatus;
  readonly correctKey?: unknown;
  readonly maxPoints?: number;
}

export interface WorkspaceLayoutState {
  readonly orientation: 'LANDSCAPE' | 'PORTRAIT' | 'COMPACT';
  readonly splitDirection: 'ROW' | 'COLUMN';
  readonly problemPaneWidthPercent: number;
  readonly workPaneWidthPercent: number;
}

export interface QuestionWorkspaceViewState {
  readonly question: WorkspaceQuestionDescriptor;
  readonly submissionStatus: SubmissionStatus;
  readonly layout: WorkspaceLayoutState;
  readonly unlockedHintCount: number;
  readonly totalHintsCount: number;
  readonly currentHints: readonly QuestionHint[];
  readonly missingFigures: readonly QuestionFigure[];
  readonly hasMissingFigures: boolean;
  readonly keyStatus: KeyEvaluationStatus;
  readonly evaluation: EvaluationResult | null;
  readonly canSubmit: boolean;
  readonly isLocked: boolean;
  readonly hitTargetMinPx: number;
  readonly hitTargetPrimaryPx: number;
}

export class QuestionWorkspaceController {
  private question: WorkspaceQuestionDescriptor;
  private submissionStatus: SubmissionStatus = 'UNANSWERED';
  private currentResponse: ResponseValue | null = null;
  private orientation: 'LANDSCAPE' | 'PORTRAIT' | 'COMPACT' = 'LANDSCAPE';
  private unlockedHintCount: number = 0;
  private evaluation: EvaluationResult | null = null;

  constructor(
    question: WorkspaceQuestionDescriptor,
    initialOrientation: 'LANDSCAPE' | 'PORTRAIT' | 'COMPACT' = 'LANDSCAPE'
  ) {
    this.question = question;
    this.orientation = initialOrientation;
  }

  setOrientation(orientation: 'LANDSCAPE' | 'PORTRAIT' | 'COMPACT'): void {
    this.orientation = orientation;
  }

  updateResponse(response: ResponseValue): void {
    if (this.submissionStatus === 'COMMITTED_LOCKED') return;
    this.currentResponse = response;
    if (this.submissionStatus === 'UNANSWERED') {
      this.submissionStatus = 'DRAFT_SAVED';
    }
  }

  saveDraft(): void {
    if (this.submissionStatus === 'COMMITTED_LOCKED') return;
    this.submissionStatus = 'DRAFT_SAVED';
  }

  unlockNextHint(): boolean {
    const hints = this.question.hints || [];
    if (this.unlockedHintCount < hints.length) {
      this.unlockedHintCount++;
      return true;
    }
    return false;
  }

  submit(): EvaluationResult {
    if (this.submissionStatus === 'COMMITTED_LOCKED' && this.evaluation) {
      return this.evaluation;
    }

    this.submissionStatus = 'COMMITTED_LOCKED';
    this.evaluation = this.evaluateResponse();
    return this.evaluation;
  }

  private evaluateResponse(): EvaluationResult {
    const maxPoints = this.question.maxPoints ?? 1;

    // 1. Invariant: HOLD questions NEVER claim positive score
    if (this.question.status === 'HOLD') {
      return {
        status: 'HOLD_UNGRADED',
        rawPoints: null,
        maxPoints,
        keyStatus: this.question.keyStatus,
        academicHold: true,
        reasonCode: 'QUESTION_ON_ACADEMIC_HOLD',
        explanationHtml: 'This question is currently under academic review; score is not claimed.',
      };
    }

    // 2. Unverified, ambiguous, dropped, or conditional keys: NEVER claim verified score
    if (this.question.keyStatus !== 'VERIFIED') {
      return {
        status: 'REVIEW_PENDING',
        rawPoints: null,
        maxPoints,
        keyStatus: this.question.keyStatus,
        academicHold: false,
        reasonCode: `KEY_${this.question.keyStatus}`,
        explanationHtml: `Answer key status is ${this.question.keyStatus}. Response recorded pending review.`,
      };
    }

    // 3. Simple verification of selected choice against correctKey
    let isCorrect = false;
    if (this.currentResponse) {
      if (this.currentResponse.kind === 'SINGLE_CHOICE') {
        isCorrect = this.currentResponse.selectedOptionId === this.question.correctKey;
      } else if (this.currentResponse.kind === 'MULTIPLE_CHOICE') {
        const expected = Array.isArray(this.question.correctKey) ? this.question.correctKey : [];
        const selected = this.currentResponse.selectedOptionIds;
        isCorrect =
          expected.length === selected.length &&
          expected.every((id: string) => selected.includes(id));
      } else if (this.currentResponse.kind === 'NUMERIC_QUANTITY') {
        const qVal = this.currentResponse.quantity;
        const target = this.question.correctKey as any;
        if (qVal && target && typeof target.magnitude === 'number') {
          const diff = Math.abs(qVal.magnitude - target.magnitude);
          const tolerance = (target.magnitude * (target.tolerancePercent || 1)) / 100;
          isCorrect = diff <= tolerance && qVal.unit === target.unit;
        }
      }
    }

    // Deduct hint penalties if any
    let points = isCorrect ? maxPoints : 0;
    if (isCorrect && this.unlockedHintCount > 0 && this.question.hints) {
      const totalPenaltyPercent = this.question.hints
        .slice(0, this.unlockedHintCount)
        .reduce((sum, h) => sum + h.penaltyPercent, 0);
      const penaltyMultiplier = Math.max(0, (100 - totalPenaltyPercent) / 100);
      points = Number((points * penaltyMultiplier).toFixed(2));
    }

    return {
      status: isCorrect ? 'CORRECT' : 'INCORRECT',
      rawPoints: points,
      maxPoints,
      keyStatus: 'VERIFIED',
      academicHold: false,
      reasonCode: isCorrect ? 'ANSWER_VERIFIED_CORRECT' : 'ANSWER_INCORRECT',
      explanationHtml: isCorrect
        ? 'Well done! Solution verified against syllabus specification.'
        : 'Incorrect. Please review the underlying principles and hints.',
    };
  }

  getViewState(): QuestionWorkspaceViewState {
    const allFigures = this.question.figures || [];
    const missingFigures = allFigures.filter((f) => !f.available);
    const hints = this.question.hints || [];
    const currentHints = hints.slice(0, this.unlockedHintCount);

    const isLandscape = this.orientation === 'LANDSCAPE';
    const layout: WorkspaceLayoutState = {
      orientation: this.orientation,
      splitDirection: isLandscape ? 'ROW' : 'COLUMN',
      problemPaneWidthPercent: isLandscape ? 50 : 100,
      workPaneWidthPercent: isLandscape ? 50 : 100,
    };

    const isLocked = this.submissionStatus === 'COMMITTED_LOCKED';
    const canSubmit = !isLocked && this.currentResponse !== null;

    return {
      question: this.question,
      submissionStatus: this.submissionStatus,
      layout,
      unlockedHintCount: this.unlockedHintCount,
      totalHintsCount: hints.length,
      currentHints,
      missingFigures,
      hasMissingFigures: missingFigures.length > 0,
      keyStatus: this.question.keyStatus,
      evaluation: this.evaluation,
      canSubmit,
      isLocked,
      hitTargetMinPx: HIT_TARGET_MIN_PX,
      hitTargetPrimaryPx: HIT_TARGET_PRIMARY_PX,
    };
  }
}

export function createQuestionWorkspace(
  question: WorkspaceQuestionDescriptor,
  orientation?: 'LANDSCAPE' | 'PORTRAIT' | 'COMPACT'
): QuestionWorkspaceController {
  return new QuestionWorkspaceController(question, orientation);
}
