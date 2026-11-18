/**
 * web/pages/question.ts
 * A24 — Question interactive page controller.
 *
 * Implements:
 * - Dynamic question loading and workspace binding
 * - Session state progression (LOADING, INTERACTIVE, SUBMITTED, HOLD_LOCKED, ERROR)
 * - Reviewed feedback display with explanation and scoring breakdown
 * - Safe return and back-stack integration
 *
 * No academic approval inferred from software validation.
 */

import {
  createQuestionWorkspace,
  QuestionWorkspaceController,
} from '../components/question-workspace.ts';
import type {
  WorkspaceQuestionDescriptor,
  QuestionWorkspaceViewState,
} from '../components/question-workspace.ts';
import type { EvaluationResult } from '../components/response/types.ts';

export type QuestionPageStatus =
  | 'LOADING'
  | 'INTERACTIVE'
  | 'EVALUATING'
  | 'FEEDBACK_SHOWN'
  | 'HOLD_LOCKED'
  | 'ERROR';

export interface QuestionPageViewState {
  readonly pageStatus: QuestionPageStatus;
  readonly workspaceState: QuestionWorkspaceViewState | null;
  readonly evaluation: EvaluationResult | null;
  readonly returnRoute: string;
  readonly errorMessage?: string;
}

export class QuestionPageController {
  private workspace: QuestionWorkspaceController | null = null;
  private status: QuestionPageStatus = 'LOADING';
  private evaluationResult: EvaluationResult | null = null;
  private subjectCode: string;
  private topicCode: string;

  constructor(subjectCode: string = 'phys', topicCode: string = 'wpe') {
    this.subjectCode = subjectCode;
    this.topicCode = topicCode;
  }

  loadQuestion(question: WorkspaceQuestionDescriptor): void {
    this.workspace = createQuestionWorkspace(question);
    if (question.status === 'HOLD') {
      this.status = 'HOLD_LOCKED';
    } else {
      this.status = 'INTERACTIVE';
    }
  }

  setError(message: string): void {
    this.workspace = null;
    this.status = 'ERROR';
  }

  getWorkspace(): QuestionWorkspaceController | null {
    return this.workspace;
  }

  submit(): EvaluationResult | null {
    if (!this.workspace) return null;
    this.status = 'EVALUATING';
    const result = this.workspace.submit();
    this.evaluationResult = result;
    this.status = 'FEEDBACK_SHOWN';
    return result;
  }

  getViewState(): QuestionPageViewState {
    const returnRoute = `/topic/${this.subjectCode.toLowerCase()}/${this.topicCode.toLowerCase()}`;
    return {
      pageStatus: this.status,
      workspaceState: this.workspace ? this.workspace.getViewState() : null,
      evaluation: this.evaluationResult,
      returnRoute,
    };
  }
}

export function createQuestionPage(
  subjectCode?: string,
  topicCode?: string
): QuestionPageController {
  return new QuestionPageController(subjectCode, topicCode);
}
