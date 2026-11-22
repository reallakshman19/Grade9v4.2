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
  readonly subject?: string;
  readonly topicCode: string;
  readonly topic?: string;
  readonly difficulty: QuestionDifficulty;
  readonly role: string;
  readonly status: QuestionReleaseStatus;
  readonly maxPoints: number;
  readonly title?: string;
  readonly exam?: string;
  readonly year?: number;
  readonly paper?: string;
  readonly difficultyBand?: string;
  readonly qrtDemand?: string;
  readonly hints?: readonly string[];
  readonly steps?: readonly string[];
  readonly check?: string;
  readonly trapWarning?: string;
  readonly primaryCapabilityRef?: string;
  readonly options?: readonly { readonly id: string; readonly text: string }[];
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
    stemPreview: raw.status==='RELEASED'?String(raw.stem || raw.stemPreview || '').slice(0,300):'',
    subjectCode: String(raw.subjectCode || raw.subject || 'PHYS').toUpperCase(),
    subject: raw.subject ? String(raw.subject) : (raw.subjectCode === 'MATH' ? 'Mathematics' : raw.subjectCode === 'CHEM' ? 'Chemistry' : raw.subjectCode === 'BIO' ? 'Biology' : 'Physics'),
    topicCode: String(raw.topicCode || raw.topic || 'WPE').toUpperCase(),
    topic: raw.topic ? String(raw.topic) : undefined,
    difficulty: (raw.difficulty || (raw.difficultyBand === 'D1' ? 'FOUNDATION' : raw.difficultyBand === 'D2' ? 'INTERMEDIATE' : raw.difficultyBand === 'D3' ? 'ADVANCED' : 'OLYMPIAD')) as QuestionDifficulty,
    role: String(raw.role || (raw.isCompetitive ? 'CORE2' : 'CORE1A')).toUpperCase(),
    status: (raw.status === 'RELEASED' || raw.status === 'WITHDRAWN' ? raw.status : 'HOLD') as QuestionReleaseStatus,
    maxPoints: raw.status==='RELEASED'&&typeof raw.maxPoints==='number'&&Number.isFinite(raw.maxPoints)&&raw.maxPoints>=0?raw.maxPoints:0,
    title: raw.title ? String(raw.title) : undefined,
    exam: raw.exam ? String(raw.exam) : undefined,
    year: typeof raw.year === 'number' ? raw.year : undefined,
    paper: raw.paper ? String(raw.paper) : undefined,
    difficultyBand: raw.difficultyBand ? String(raw.difficultyBand) : undefined,
    qrtDemand: raw.qrtDemand ? String(raw.qrtDemand) : undefined,
    hints: Array.isArray(raw.hints) ? raw.hints.map(String) : undefined,
    steps: Array.isArray(raw.steps) ? raw.steps.map(String) : undefined,
    check: raw.check ? String(raw.check) : undefined,
    trapWarning: raw.trapWarning ? String(raw.trapWarning) : undefined,
    primaryCapabilityRef: raw.primaryCapabilityRef ? String(raw.primaryCapabilityRef) : undefined,
    options: Array.isArray(raw.options) ? raw.options.map((o: any) => ({ id: String(o.id || ''), text: String(o.text || '') })) : undefined,
  };
}

export class QuestionCardController {
  private summary: PublicQuestionSummary;
  private readonly authorized:(item:PublicQuestionSummary)=>boolean;

  constructor(rawQuestion: any,authorized:(item:PublicQuestionSummary)=>boolean=()=>false) {
    this.authorized=authorized;
    this.summary = Object.freeze(sanitizePublicQuestionSummary(rawQuestion));
  }

  getSummary(): PublicQuestionSummary {
    return this.summary;
  }

  isAttemptable(): boolean {
    return this.summary.status === 'RELEASED'&&/^[A-Za-z][A-Za-z0-9._:-]{2,127}$/.test(this.summary.id)&&this.authorized(this.summary);
  }

  getViewState(): QuestionCardViewState {
    const isAttemptable = this.isAttemptable();
    const subject = this.summary.subjectCode.toLowerCase();
    const topic = this.summary.topicCode.toLowerCase();
    const id = encodeURIComponent(this.summary.id);

    return {
      summary: this.summary,
      isAttemptable,
      workspacePath: isAttemptable?`/workspace/${subject}/${topic}/${id}`:'',
      statusBadgeText: this.summary.status,
      minHitTargetPx: HIT_TARGET_MIN_PX,
    };
  }
}

export function createQuestionCard(rawQuestion: any,authorized?:(item:PublicQuestionSummary)=>boolean): QuestionCardController {
  return new QuestionCardController(rawQuestion,authorized);
}
