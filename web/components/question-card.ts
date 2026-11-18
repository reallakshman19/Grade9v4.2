/**
 * web/components/question-card.ts
 * A23 — Question bank card representation and actions.
 *
 * Enforces:
 * - Pure public card view: ZERO private metadata (no answers, no internal custody paths).
 * - Explicit attemptability: withdrawn or HOLD questions cannot be launched.
 * - Minimum 48px hit target size for interactive action triggers.
 *
 * No academic approval inferred from software validation.
 */

import { HIT_TARGET_MIN_PX } from '../styles/tokens.ts';
import type { QuestionDifficulty } from './filter-panel.ts';

export type QuestionReleaseStatus = 'RELEASED' | 'WITHDRAWN' | 'HOLD';

export interface PublicQuestionSummary {
  readonly id: string;
  readonly code: string;
  readonly stemPreview: string;
  readonly subjectCode: string;
  readonly topicCode: string;
  readonly difficulty: QuestionDifficulty;
  readonly role: string;
  readonly status: QuestionReleaseStatus;
  readonly maxPoints: number;
}

export interface QuestionCardViewState {
  readonly summary: PublicQuestionSummary;
  readonly isAttemptable: boolean;
  readonly workspacePath: string;
  readonly statusBadgeText: string;
  readonly minHitTargetPx: number;
}

/**
 * Strips any internal, custody, or answer fields to produce a safe public summary.
 */
export function sanitizePublicQuestionSummary(raw: any): PublicQuestionSummary {
  return {
    id: String(raw.id || raw.itemId || 'unknown-id'),
    code: String(raw.code || raw.id || 'Q'),
    stemPreview: String(raw.stem || raw.stemPreview || raw.text || '').slice(0, 150),
    subjectCode: String(raw.subjectCode || raw.subject || 'PHYS').toUpperCase(),
    topicCode: String(raw.topicCode || raw.topic || 'WPE').toUpperCase(),
    difficulty: (raw.difficulty || 'FOUNDATION') as QuestionDifficulty,
    role: String(raw.role || 'CORE1A').toUpperCase(),
    status: (raw.status === 'WITHDRAWN' || raw.status === 'HOLD' ? raw.status : 'RELEASED') as QuestionReleaseStatus,
    maxPoints: typeof raw.maxPoints === 'number' ? raw.maxPoints : 1,
  };
}

export class QuestionCardController {
  private summary: PublicQuestionSummary;

  constructor(rawQuestion: any) {
    this.summary = sanitizePublicQuestionSummary(rawQuestion);
  }

  getSummary(): PublicQuestionSummary {
    return this.summary;
  }

  isAttemptable(): boolean {
    return this.summary.status === 'RELEASED';
  }

  getViewState(): QuestionCardViewState {
    const isAttemptable = this.isAttemptable();
    const subject = this.summary.subjectCode.toLowerCase();
    const topic = this.summary.topicCode.toLowerCase();
    const id = encodeURIComponent(this.summary.id);

    return {
      summary: this.summary,
      isAttemptable,
      workspacePath: `/workspace/${subject}/${topic}/${id}`,
      statusBadgeText: this.summary.status,
      minHitTargetPx: HIT_TARGET_MIN_PX,
    };
  }
}

export function createQuestionCard(rawQuestion: any): QuestionCardController {
  return new QuestionCardController(rawQuestion);
}
