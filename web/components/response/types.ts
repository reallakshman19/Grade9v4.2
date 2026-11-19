/**
 * web/components/response/types.ts
 * A24 — Objective response types, inputs, evaluation states, and policy bounds.
 *
 * Implements:
 * - Single-choice, multiple-choice, and numeric quantity response formats
 * - Strict commit lock (no mutation after submission)
 * - Safe handling of ambiguous, conditional, dropped, or unverified keys
 * - No score claim on HOLD questions
 *
 * No academic approval inferred from software validation.
 */

export type ResponseKind = 'SINGLE_CHOICE' | 'MULTIPLE_CHOICE' | 'NUMERIC_QUANTITY';

export interface ChoiceOption {
  readonly id: string;
  readonly label: string;
  readonly text: string;
  readonly figureRef?: string;
}

export interface NumericQuantityValue {
  readonly magnitude: number;
  readonly decimal?: string; // Exact learner token; required for grading.
  readonly unit: string;
  readonly tolerancePercent?: number;
}

export type ResponseValue =
  | { readonly kind: 'SINGLE_CHOICE'; readonly selectedOptionId: string | null }
  | { readonly kind: 'MULTIPLE_CHOICE'; readonly selectedOptionIds: readonly string[] }
  | { readonly kind: 'NUMERIC_QUANTITY'; readonly quantity: NumericQuantityValue | null };

export type SubmissionStatus =
  | 'UNANSWERED'
  | 'DIRTY'
  | 'DRAFT_SAVED'
  | 'SUBMITTING'
  | 'COMMITTED_LOCKED';

export type KeyEvaluationStatus =
  | 'VERIFIED'
  | 'UNVERIFIED'
  | 'AMBIGUOUS'
  | 'CONDITIONAL'
  | 'DROPPED';

export type ResponseGradeStatus =
  | 'CORRECT'
  | 'INCORRECT'
  | 'PARTIAL'
  | 'INVALID'
  | 'REVIEW_PENDING'
  | 'HOLD_UNGRADED';

export interface EvaluationResult {
  readonly status: ResponseGradeStatus;
  readonly rawPoints: number | null;
  readonly maxPoints: number;
  readonly feedbackHtml?: string;
  readonly explanationHtml?: string;
  readonly keyStatus: KeyEvaluationStatus;
  readonly academicHold: boolean;
  readonly reasonCode: string;
}

export interface ResponseInputController<T extends ResponseValue> {
  getValue(): T;
  setValue(value: T): void;
  isAnswered(): boolean;
  setLocked(locked: boolean): void;
  isLocked(): boolean;
  reset(): void;
}

