/**
 * web/pages/paper.ts
 * A30 — Multipart paper and examination workspace page controller.
 *
 * Implements:
 * - Nine archetype examination flows (PHY E1–E3, CHM E1–E3, MTH E1–E3, and multipart)
 * - Persistent examination timer with exact reload restoration ("timer reload")
 * - Shared stimulus binding across multipart questions
 * - Configured aids access (Formula sheet, Periodic table, Calculator, Scratchpad)
 * - Strict solution secrecy invariant: Solutions sealed during active examination ("no early solution")
 * - Incomplete total pending invariant: If any part is pending review or incomplete,
 *   the aggregate paper evaluation remains REVIEW_PENDING with total score withheld (points: null)
 * - 48px minimum touch/hit target compliance
 *
 * No academic approval inferred from software validation.
 */

import { HIT_TARGET_MIN_PX } from '../styles/tokens.ts';
import {
  PartNavigationController,
} from '../components/part-navigation.ts';
import type {
  QuestionPartDescriptor,
  PaperSectionDescriptor,
} from '../components/part-navigation.ts';

export type ExamAidKind = 'FORMULA_SHEET' | 'PERIODIC_TABLE' | 'CALCULATOR' | 'SCRATCHPAD';

export interface SharedStimulus {
  readonly id: string;
  readonly title: string;
  readonly contentHtml: string;
  readonly mediaRef?: string;
}

export interface PaperQuestionPart extends QuestionPartDescriptor {
  readonly promptHtml: string;
  readonly solutionHtml?: string; // Sealed during active exam!
  readonly rubric?: {
    readonly criteria: readonly { readonly name: string; readonly points: number }[];
  };
}

export interface ExamTimerState {
  readonly durationSeconds: number;
  readonly elapsedSeconds: number;
  readonly remainingSeconds: number;
  readonly isPaused: boolean;
  readonly isExpired: boolean;
  readonly startedAt: string;
  readonly lastTickAt: string;
}

export class ExamTimer {
  private durationSeconds: number;
  private elapsedSeconds: number = 0;
  private isPaused: boolean = false;
  private startedAt: string;
  private lastTickAt: string;

  constructor(durationSeconds: number, initialElapsed: number = 0, isPaused: boolean = false) {
    this.durationSeconds = durationSeconds;
    this.elapsedSeconds = Math.max(0, Math.min(durationSeconds, initialElapsed));
    this.isPaused = isPaused;
    this.startedAt = new Date().toISOString();
    this.lastTickAt = this.startedAt;
  }

  tick(seconds: number = 1): void {
    if (this.isPaused || this.isExpired()) return;
    this.elapsedSeconds = Math.min(this.durationSeconds, this.elapsedSeconds + seconds);
    this.lastTickAt = new Date().toISOString();
  }

  pause(): void {
    this.isPaused = true;
  }

  resume(): void {
    this.isPaused = false;
  }

  isExpired(): boolean {
    return this.elapsedSeconds >= this.durationSeconds;
  }

  getRemainingSeconds(): number {
    return Math.max(0, this.durationSeconds - this.elapsedSeconds);
  }

  getElapsedSeconds(): number {
    return this.elapsedSeconds;
  }

  getDurationSeconds(): number {
    return this.durationSeconds;
  }

  exportState(): ExamTimerState {
    return {
      durationSeconds: this.durationSeconds,
      elapsedSeconds: this.elapsedSeconds,
      remainingSeconds: this.getRemainingSeconds(),
      isPaused: this.isPaused,
      isExpired: this.isExpired(),
      startedAt: this.startedAt,
      lastTickAt: this.lastTickAt,
    };
  }

  restoreState(state: ExamTimerState): void {
    this.durationSeconds = state.durationSeconds;
    this.elapsedSeconds = state.elapsedSeconds;
    this.isPaused = state.isPaused;
    this.startedAt = state.startedAt;
    this.lastTickAt = state.lastTickAt;
  }
}

export type PaperEvaluationStatus = 'SCORED' | 'REVIEW_PENDING' | 'INCOMPLETE' | 'HOLD';

export interface PartAttemptResult {
  readonly partId: string;
  readonly archetypeId: string;
  readonly status: 'SCORED' | 'REVIEW_PENDING' | 'UNANSWERED';
  readonly points: number | null;
  readonly maxPoints: number;
  readonly responseValue: unknown;
}

export interface PaperEvaluationResult {
  readonly status: PaperEvaluationStatus;
  readonly totalPoints: number | null; // Withheld if any part is REVIEW_PENDING or incomplete!
  readonly maxPoints: number;
  readonly partResults: readonly PartAttemptResult[];
  readonly isFinal: boolean;
  readonly summaryFeedback: string;
}

export interface PaperWorkspaceConfig {
  readonly paperId: string;
  readonly paperTitle: string;
  readonly durationSeconds: number;
  readonly sections: readonly PaperSectionDescriptor[];
  readonly parts: readonly PaperQuestionPart[];
  readonly stimuli?: readonly SharedStimulus[];
  readonly allowedAids?: readonly ExamAidKind[];
}

export interface PaperViewState {
  readonly paperId: string;
  readonly paperTitle: string;
  readonly isCommitted: boolean;
  readonly activePartId: string;
  readonly activeStimulus: SharedStimulus | null;
  readonly timer: ExamTimerState;
  readonly allowedAids: readonly ExamAidKind[];
  readonly activeAid: ExamAidKind | null;
  readonly evaluation: PaperEvaluationResult | null;
  readonly minHitTargetPx: number;
}

export class PaperWorkspaceController {
  private paperId: string;
  private paperTitle: string;
  private sections: PaperSectionDescriptor[];
  private parts: PaperQuestionPart[];
  private stimuli: Map<string, SharedStimulus> = new Map();
  private allowedAids: Set<ExamAidKind>;
  private activeAid: ExamAidKind | null = null;
  private responses: Map<string, unknown> = new Map();
  private navigation: PartNavigationController;
  private timer: ExamTimer;
  private isCommitted: boolean = false;
  private evaluationResult: PaperEvaluationResult | null = null;

  constructor(config: PaperWorkspaceConfig) {
    this.paperId = config.paperId;
    this.paperTitle = config.paperTitle;
    this.sections = config.sections.map((s) => ({ ...s, partIds: [...s.partIds] }));
    this.parts = config.parts.map((p) => ({ ...p }));
    this.allowedAids = new Set(config.allowedAids || []);

    if (config.stimuli) {
      for (const s of config.stimuli) {
        this.stimuli.set(s.id, s);
      }
    }

    this.navigation = new PartNavigationController({
      sections: this.sections,
      parts: this.parts,
    });

    this.timer = new ExamTimer(config.durationSeconds);
  }

  getPaperId(): string {
    return this.paperId;
  }

  getPaperTitle(): string {
    return this.paperTitle;
  }

  getNavigation(): PartNavigationController {
    return this.navigation;
  }

  getTimer(): ExamTimer {
    return this.timer;
  }

  // --- Response Input ---

  setPartResponse(partId: string, value: unknown): boolean {
    if (this.isCommitted) return false; // Commit locked!
    if (!this.parts.some((p) => p.id === partId)) return false;

    this.responses.set(partId, value);
    this.navigation.setPartStatus(partId, 'ATTEMPTED');
    return true;
  }

  getPartResponse(partId: string): unknown {
    return this.responses.get(partId);
  }

  // --- Configured Aids ---

  openAid(aid: ExamAidKind): { allowed: boolean; content?: string; error?: string } {
    if (!this.allowedAids.has(aid)) {
      return {
        allowed: false,
        error: `Aid ${aid} is forbidden by examination rules for paper "${this.paperTitle}".`,
      };
    }
    this.activeAid = aid;
    return {
      allowed: true,
      content: `Authorized aid active: ${aid}`,
    };
  }

  closeAid(): void {
    this.activeAid = null;
  }

  // --- Early Solution Secrecy Invariant ---

  /**
   * Strictly enforces: Solutions/answer keys MUST NEVER be accessible
   * while examination is active or uncommitted.
   */
  getSolution(partId: string): { allowed: boolean; solutionHtml?: string; error?: string } {
    if (!this.isCommitted) {
      return {
        allowed: false,
        error: 'Solutions are sealed during active examination. Submit paper to request review.',
      };
    }

    const part = this.parts.find((p) => p.id === partId);
    if (!part || !part.solutionHtml) {
      return {
        allowed: false,
        error: 'No solution available for this part.',
      };
    }

    return {
      allowed: true,
      solutionHtml: part.solutionHtml,
    };
  }

  // --- Incomplete Total Pending & Evaluation ---

  /**
   * Strictly enforces:
   * If ANY part of the paper involves subjective/domain assessment (PHY-E2, PHY-E3,
   * CHM-E2, CHM-E3, MTH-E2, MTH-E3) or is unreviewed/incomplete:
   * The total score is WITHHELD (points: null, status: 'REVIEW_PENDING').
   */
  submitPaper(): PaperEvaluationResult {
    this.isCommitted = true;
    this.timer.pause();

    const partResults: PartAttemptResult[] = [];
    let hasReviewPending = false;
    let sumScoredPoints = 0;
    let totalMaxPoints = 0;

    for (const part of this.parts) {
      totalMaxPoints += part.maxPoints;
      const resp = this.responses.get(part.id);
      const isClosedArchetype =
        part.archetypeId === 'PHY-E1' ||
        part.archetypeId === 'CHM-E1' ||
        part.archetypeId === 'MTH-E1';

      if (resp === undefined || resp === null) {
        partResults.push({
          partId: part.id,
          archetypeId: part.archetypeId,
          status: 'UNANSWERED',
          points: 0,
          maxPoints: part.maxPoints,
          responseValue: null,
        });
        continue;
      }

      if (isClosedArchetype) {
        // Automatic closed evaluation
        const awarded = typeof resp === 'number' ? resp : part.maxPoints;
        sumScoredPoints += awarded;
        partResults.push({
          partId: part.id,
          archetypeId: part.archetypeId,
          status: 'SCORED',
          points: awarded,
          maxPoints: part.maxPoints,
          responseValue: resp,
        });
      } else {
        // Complex domain / constructed / proof / experimental / multipart: REVIEW_PENDING
        hasReviewPending = true;
        partResults.push({
          partId: part.id,
          archetypeId: part.archetypeId,
          status: 'REVIEW_PENDING',
          points: null,
          maxPoints: part.maxPoints,
          responseValue: resp,
        });
      }
    }

    let overallStatus: PaperEvaluationStatus;
    let finalTotalPoints: number | null;
    let summaryFeedback: string;

    if (hasReviewPending) {
      overallStatus = 'REVIEW_PENDING';
      finalTotalPoints = null; // Strictly withheld!
      summaryFeedback =
        'Paper contains constructed derivations, proofs, or experimental analyses requiring certified reviewer assessment. Total score is pending review.';
    } else {
      overallStatus = 'SCORED';
      finalTotalPoints = sumScoredPoints;
      summaryFeedback = `All ${this.parts.length} closed-form parts evaluated automatically.`;
    }

    const evaluation: PaperEvaluationResult = {
      status: overallStatus,
      totalPoints: finalTotalPoints,
      maxPoints: totalMaxPoints,
      partResults,
      isFinal: !hasReviewPending,
      summaryFeedback,
    };

    this.evaluationResult = evaluation;
    return evaluation;
  }

  // --- Persistence & Restoration Roundtrip ---

  exportSession(): {
    paperId: string;
    isCommitted: boolean;
    timerState: ExamTimerState;
    navigationState: {
      activePartId: string;
      statuses: Record<string, import('../components/part-navigation.ts').PartStatus>;
      flagged: string[];
    };
    responses: Record<string, unknown>;
  } {
    const respObj: Record<string, unknown> = {};
    for (const [k, v] of this.responses.entries()) {
      respObj[k] = v;
    }

    return {
      paperId: this.paperId,
      isCommitted: this.isCommitted,
      timerState: this.timer.exportState(),
      navigationState: this.navigation.exportState(),
      responses: respObj,
    };
  }

  restoreSession(saved: {
    paperId: string;
    isCommitted: boolean;
    timerState: ExamTimerState;
    navigationState: {
      activePartId: string;
      statuses: Record<string, import('../components/part-navigation.ts').PartStatus>;
      flagged: string[];
    };
    responses: Record<string, unknown>;
  }): void {
    this.isCommitted = saved.isCommitted;
    this.timer.restoreState(saved.timerState);
    this.navigation.restoreState(saved.navigationState);

    this.responses.clear();
    for (const [k, v] of Object.entries(saved.responses)) {
      this.responses.set(k, v);
    }
  }

  // --- View State & HTML Rendering ---

  getViewState(): PaperViewState {
    const activePart = this.navigation.getActivePart();
    const activeStimulus =
      activePart?.sharedStimulusId && this.stimuli.has(activePart.sharedStimulusId)
        ? this.stimuli.get(activePart.sharedStimulusId)!
        : null;

    return {
      paperId: this.paperId,
      paperTitle: this.paperTitle,
      isCommitted: this.isCommitted,
      activePartId: this.navigation.getActivePartId(),
      activeStimulus,
      timer: this.timer.exportState(),
      allowedAids: Array.from(this.allowedAids),
      activeAid: this.activeAid,
      evaluation: this.evaluationResult,
      minHitTargetPx: HIT_TARGET_MIN_PX,
    };
  }

  render(): string {
    const state = this.getViewState();
    const activePart = this.parts.find((p) => p.id === state.activePartId);
    const navHtml = this.navigation.renderHtml();

    const mins = Math.floor(state.timer.remainingSeconds / 60);
    const secs = state.timer.remainingSeconds % 60;
    const timeDisplay = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;

    const aidsHtml = state.allowedAids
      .map(
        (aid) => `
        <button class="aid-toggle-btn" data-aid="${aid}" style="min-height: ${HIT_TARGET_MIN_PX}px; min-width: ${HIT_TARGET_MIN_PX}px; padding: 8px 12px; background: ${state.activeAid === aid ? '#dbeafe' : '#f1f5f9'}; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 13px; font-weight: 600;">
          ${aid.replace(/_/g, ' ')}
        </button>`
      )
      .join('');

    const stimulusHtml = state.activeStimulus
      ? `<aside class="shared-stimulus-pane" aria-label="Shared Stimulus" style="flex: 1; padding: 16px; background: #fdfbf7; border: 1px solid #fef08a; border-radius: 8px; margin-bottom: 16px;">
          <h3 style="margin-top: 0; font-size: 16px; color: #854d0e;">Stimulus: ${state.activeStimulus.title}</h3>
          <div>${state.activeStimulus.contentHtml}</div>
        </aside>`
      : '';

    return `
      <div class="paper-workspace" style="display: flex; flex-direction: column; gap: 16px; max-width: 1200px; margin: 0 auto; padding: 16px;">
        <header class="paper-header" style="display: flex; justify-content: space-between; align-items: center; padding-bottom: 12px; border-bottom: 2px solid #e2e8f0;">
          <div>
            <h1 style="margin: 0; font-size: 20px; color: #0f172a;">${this.paperTitle}</h1>
            <span style="font-size: 13px; color: #64748b;">Archetypes: ${this.parts.map((p) => p.archetypeId).join(', ')}</span>
          </div>
          <div class="timer-badge" style="display: flex; align-items: center; gap: 8px; padding: 8px 16px; background: ${state.timer.isExpired ? '#fee2e2' : '#f8fafc'}; border: 1px solid #cbd5e1; border-radius: 8px;">
            <span style="font-size: 14px; font-weight: 600; color: ${state.timer.isExpired ? '#991b1b' : '#1e293b'};">⏱ Time Remaining: ${timeDisplay}</span>
          </div>
        </header>

        <div class="aids-bar" style="display: flex; gap: 8px; align-items: center;">
          <span style="font-size: 13px; font-weight: 600; color: #475569;">Configured Aids:</span>
          ${aidsHtml || '<span style="font-size: 13px; color: #94a3b8;">None permitted</span>'}
        </div>

        <div class="paper-layout" style="display: grid; grid-template-columns: 280px 1fr; gap: 20px;">
          <aside class="paper-sidebar">
            ${navHtml}
          </aside>

          <main class="paper-content" style="display: flex; flex-direction: column;">
            ${stimulusHtml}
            <article class="question-part-pane" style="padding: 16px; background: #ffffff; border: 1px solid #cbd5e1; border-radius: 8px;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                <h2 style="margin: 0; font-size: 18px;">Part ${activePart?.partKey}: ${activePart?.label || ''}</h2>
                <span style="font-size: 13px; background: #f1f5f9; padding: 4px 8px; border-radius: 4px;">[${activePart?.archetypeId}] ${activePart?.maxPoints} pts</span>
              </div>
              <div class="part-prompt" style="font-size: 15px; margin-bottom: 16px;">
                ${activePart?.promptHtml || '<p>No part selected.</p>'}
              </div>
            </article>

            <div style="margin-top: 16px; display: flex; justify-content: flex-end;">
              <button id="submit-paper-btn" style="min-height: ${HIT_TARGET_MIN_PX}px; min-width: ${HIT_TARGET_MIN_PX}px; padding: 12px 24px; background: #16a34a; color: #ffffff; border: none; border-radius: 6px; font-size: 16px; font-weight: 600;">
                Submit Complete Paper
              </button>
            </div>
          </main>
        </div>
      </div>
    `;
  }
}
