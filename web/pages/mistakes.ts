/**
 * web/pages/mistakes.ts
 * Workpack A36: Mistakes and Diagnostic Repair Notebook Page Controller.
 *
 * Implements:
 * - Diagnostic notebook tracking misconceptions, calculation errors, and unit faults.
 * - Diagnostic comparison: initial learner response vs expected target vs diagnostic hint.
 * - Actionable recovery routing: "Review concept" (Core 1A), "Try fresh challenge" (Core 1B), "Practice again".
 * - Retention of historical mistake evidence across repairs (never deleting attempt logs).
 * - Full tablet ergonomics (min 48px touch targets, dual orientation layout, 0px horizontal overflow).
 *
 * No academic approval inferred from software validation.
 * academic_admission: HOLD
 * release_authority: NONE
 */

import { escapeHtml as e } from '../runtime/rendering.ts';
import {
  HIT_TARGET_MIN_PX,
  HIT_TARGET_PRIMARY_PX,
} from '../styles/tokens.ts';
import type { TaskRef } from '../runtime/types.ts';

export type MistakeFailureMode =
  | 'CALCULATION_ERROR'
  | 'SIGN_OR_UNIT_ERROR'
  | 'FORMULA_MISCONCEPTION'
  | 'BOUNDARY_OMISSION'
  | 'REPRESENTATION_ERROR';

export type MistakeStatus = 'UNRESOLVED' | 'REPAIRED';

export interface RecordedMistakeItem {
  readonly mistakeId: string;
  readonly taskRef: TaskRef;
  readonly taskTitle: string;
  readonly subject: string;
  readonly failureMode: MistakeFailureMode;
  readonly initialResponse: string;
  readonly diagnosticHint: string;
  readonly status: MistakeStatus;
  readonly recordedAt: string;
  readonly repairedAt?: string;
  readonly isWithdrawn?: boolean;
  readonly tombstoneNotice?: string;
  readonly recoveryRoutes: {
    readonly reviewConceptRoute: string;
    readonly freshChallengeRoute: string;
    readonly retryQuestionRoute: string;
  };
}

const COLOR_PRIMARY = '#1a73e8';
const COLOR_SURFACE = '#ffffff';
const COLOR_TEXT = '#202124';
const COLOR_TEXT_MUTED = '#5f6368';
const COLOR_BORDER = '#dadce0';
const COLOR_ERROR = '#d93025';
const COLOR_SUCCESS = '#137333';
const ELEVATION_CARD = '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)';

export class MistakesPageController {
  private rootElement: HTMLElement | null = null;
  private mistakes: RecordedMistakeItem[] = [];
  private activeStatusFilter: 'ALL' | MistakeStatus = 'ALL';
  private onNavigate?: (route: string) => void;

  constructor(
    initialMistakes: readonly RecordedMistakeItem[] = [],
    onNavigate?: (route: string) => void
  ) {
    this.mistakes = [...initialMistakes];
    this.onNavigate = onNavigate;
  }

  public getMistakes(): readonly RecordedMistakeItem[] {
    return this.mistakes;
  }

  public setMistakes(items: readonly RecordedMistakeItem[]): void {
    this.mistakes = [...items];
    this.render();
  }

  public addMistake(item: RecordedMistakeItem): void {
    const exists = this.mistakes.some((m) => m.mistakeId === item.mistakeId);
    if (!exists) {
      this.mistakes.unshift(item);
      this.render();
    }
  }

  public markRepaired(mistakeId: string, repairedAt = new Date().toISOString()): void {
    const idx = this.mistakes.findIndex((m) => m.mistakeId === mistakeId);
    if (idx !== -1) {
      const existing = this.mistakes[idx];
      this.mistakes[idx] = {
        ...existing,
        status: 'REPAIRED',
        repairedAt,
      };
      this.render();
    }
  }

  public mount(container: HTMLElement): void {
    this.rootElement = container;
    this.render();
  }

  public setStatusFilter(status: 'ALL' | MistakeStatus): void {
    this.activeStatusFilter = status;
    this.render();
  }

  public getFilteredMistakes(): readonly RecordedMistakeItem[] {
    return this.mistakes.filter((m) => {
      if (this.activeStatusFilter !== 'ALL' && m.status !== this.activeStatusFilter) {
        return false;
      }
      return true;
    });
  }

  public render(): void {
    if (!this.rootElement) return;

    const minHit = `${HIT_TARGET_MIN_PX}px`;
    const primaryHit = `${HIT_TARGET_PRIMARY_PX}px`;
    const filtered = this.getFilteredMistakes();

    const unresolvedCount = this.mistakes.filter((m) => m.status === 'UNRESOLVED').length;
    const repairedCount = this.mistakes.filter((m) => m.status === 'REPAIRED').length;

    const filtersHtml = [
      { id: 'ALL', label: `All Mistakes (${this.mistakes.length})` },
      { id: 'UNRESOLVED', label: `Needs Repair (${unresolvedCount})` },
      { id: 'REPAIRED', label: `Repaired (${repairedCount})` },
    ]
      .map((f) => {
        const isSelected = this.activeStatusFilter === f.id;
        return `
          <button type="button" class="status-chip" data-status="${e(f.id)}" style="
            min-height: ${minHit};
            padding: 8px 16px;
            border-radius: 24px;
            border: 1px solid ${isSelected ? COLOR_PRIMARY : COLOR_BORDER};
            background-color: ${isSelected ? COLOR_PRIMARY : COLOR_SURFACE};
            color: ${isSelected ? '#ffffff' : COLOR_TEXT};
            font-size: 14px;
            font-weight: 500;
            cursor: pointer;
            display: inline-flex;
            align-items: center;
          ">${e(f.label)}</button>
        `;
      })
      .join('');

    const listHtml =
      filtered.length === 0
        ? `
          <div class="empty-mistakes-view" style="
            text-align: center;
            padding: 48px 16px;
            background-color: ${COLOR_SURFACE};
            border: 1px solid ${COLOR_BORDER};
            border-radius: 12px;
            margin: 16px 0;
          ">
            <h3 style="margin: 0 0 8px 0; font-size: 16px; color: ${COLOR_TEXT};">No mistakes recorded in this view</h3>
            <p style="margin: 0; color: ${COLOR_TEXT_MUTED}; font-size: 14px;">Great work! You have no unresolved misconceptions or calculation errors.</p>
          </div>
        `
        : filtered
            .map((item) => {
              const isRepaired = item.status === 'REPAIRED';
              const modeLabel = item.failureMode.replace(/_/g, ' ');

              return `
                <article class="mistake-card" data-mistake-id="${e(item.mistakeId)}" style="
                  background-color: ${COLOR_SURFACE};
                  border: 1px solid ${COLOR_BORDER};
                  border-radius: 12px;
                  padding: 16px;
                  box-shadow: ${ELEVATION_CARD};
                  display: flex;
                  flex-direction: column;
                  gap: 12px;
                ">
                  <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px;">
                    <div style="display: flex; gap: 8px; align-items: center;">
                      <span class="failure-mode-badge" style="
                        background-color: #fce8e6;
                        color: ${COLOR_ERROR};
                        font-size: 12px;
                        font-weight: 600;
                        padding: 4px 10px;
                        border-radius: 12px;
                      ">${e(modeLabel)}</span>
                      <span style="font-size: 12px; color: ${COLOR_TEXT_MUTED};">${e(item.subject)}</span>
                    </div>
                    <span class="status-indicator" style="
                      font-size: 12px;
                      font-weight: 600;
                      color: ${isRepaired ? COLOR_SUCCESS : COLOR_ERROR};
                    ">
                      ${isRepaired ? '✓ Repaired' : '● Needs Repair'}
                    </span>
                  </div>

                  <h4 style="margin: 0; font-size: 15px; color: ${COLOR_TEXT}; line-height: 1.4;">
                    ${e(item.taskTitle || item.taskRef.id)}
                  </h4>

                  ${
                    item.isWithdrawn
                      ? `
                    <div class="withdrawn-notice" style="
                      font-size: 12px;
                      color: #b06000;
                      background-color: #fff8e1;
                      border: 1px solid #ffe082;
                      border-radius: 6px;
                      padding: 6px 10px;
                    ">
                      ⚠️ Note: This challenge originated from an earlier release edition (withdrawn). Historical mistake evidence and diagnostic guidance are preserved.
                    </div>
                  `
                      : ''
                  }

                  <!-- Comparison Diagnostic View -->
                  <div style="
                    background: #f8f9fa;
                    border: 1px solid #e8eaed;
                    border-radius: 8px;
                    padding: 12px;
                    font-size: 13px;
                    display: flex;
                    flex-direction: column;
                    gap: 6px;
                  ">
                    <div><strong>Your Response:</strong> <span style="color: ${COLOR_ERROR}; font-family: monospace;">${e(item.initialResponse)}</span></div>
                    <div><strong>Diagnostic Guidance:</strong> <span style="color: #3c4043;">${e(item.diagnosticHint)}</span></div>
                  </div>

                  <!-- Actions Row -->
                  <div class="recovery-actions-row" style="
                    display: flex;
                    gap: 8px;
                    flex-wrap: wrap;
                    margin-top: 4px;
                  ">
                    <button type="button" class="action-btn review-concept-btn" data-route="${e(item.recoveryRoutes.reviewConceptRoute)}" style="
                      min-height: ${minHit};
                      padding: 0 16px;
                      background-color: #e8f0fe;
                      color: ${COLOR_PRIMARY};
                      border: 1px solid #c2e7ff;
                      border-radius: 8px;
                      font-size: 13px;
                      font-weight: 600;
                      cursor: pointer;
                    ">Learn the concept</button>

                    <button type="button" class="action-btn fresh-challenge-btn" data-route="${e(item.recoveryRoutes.freshChallengeRoute)}" style="
                      min-height: ${minHit};
                      padding: 0 16px;
                      background-color: #e6f4ea;
                      color: ${COLOR_SUCCESS};
                      border: 1px solid #ceead6;
                      border-radius: 8px;
                      font-size: 13px;
                      font-weight: 600;
                      cursor: pointer;
                    ">Try fresh challenge</button>

                    <button type="button" class="action-btn retry-btn" data-route="${e(item.recoveryRoutes.retryQuestionRoute)}" style="
                      min-height: ${minHit};
                      padding: 0 16px;
                      background-color: ${COLOR_SURFACE};
                      color: ${COLOR_TEXT};
                      border: 1px solid ${COLOR_BORDER};
                      border-radius: 8px;
                      font-size: 13px;
                      font-weight: 600;
                      cursor: pointer;
                    ">Practice again</button>
                  </div>
                </article>
              `;
            })
            .join('');

    this.rootElement.innerHTML = `
      <div class="mistakes-notebook-container" style="
        width: 100%;
        max-width: 1200px;
        margin: 0 auto;
        padding: 16px;
        box-sizing: border-box;
      ">
        <header style="margin-bottom: 24px;">
          <h2 style="margin: 0 0 8px 0; font-size: 24px; color: ${COLOR_TEXT};">Diagnostic & Repair Notebook</h2>
          <p style="margin: 0; color: ${COLOR_TEXT_MUTED}; font-size: 14px;">
            Review past challenge errors, analyze diagnostic comparisons, and practice fresh transfer tasks.
          </p>
        </header>

        <div class="status-filters-row" style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 16px;">
          ${filtersHtml}
        </div>

        <main class="mistakes-list" style="display: flex; flex-direction: column; gap: 12px;">
          ${listHtml}
        </main>
      </div>
    `;

    this.attachEventListeners();
  }

  private attachEventListeners(): void {
    if (!this.rootElement || typeof this.rootElement.querySelectorAll !== 'function') return;

    const chips = this.rootElement.querySelectorAll<HTMLButtonElement>('.status-chip');
    chips.forEach((chip) => {
      chip.addEventListener('click', () => {
        const status = chip.getAttribute('data-status') as 'ALL' | MistakeStatus;
        if (status) {
          this.setStatusFilter(status);
        }
      });
    });

    const actionBtns = this.rootElement.querySelectorAll<HTMLButtonElement>('.action-btn');
    actionBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const route = btn.getAttribute('data-route');
        if (route && this.onNavigate) {
          this.onNavigate(route);
        }
      });
    });
  }
}
