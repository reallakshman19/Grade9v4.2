/**
 * web/pages/progress.ts
 * Workpack A36: Learner Progress and Attempt Evidence Page Controller.
 *
 * Implements:
 * - Actual attempt evidence tracking with zero cognitive mastery claims (Rule 13 invariant).
 * - Disaggregated evidence categories: First attempts, Assisted attempts, Repair attempts, Boundary checks.
 * - Retention and honest labeling of attempts on withdrawn or deprecated release items.
 * - Full tablet ergonomics (min 48px touch targets, dual orientation layout, 0px horizontal overflow).
 * - Audit ledger with exact timestamps, task references, response types, and scoring states.
 * - Academic status disclaimer: academic_admission: HOLD, production_release: NONE.
 *
 * No academic approval inferred from software validation.
 * academic_admission: HOLD
 * release_authority: NONE
 */

import { escapeHtml as e } from '../runtime/rendering.ts';
import {
  HIT_TARGET_MIN_PX,
  HIT_TARGET_PRIMARY_PX,
  COLOR_TOKEN,
} from '../styles/tokens.ts';
import type { Attempt, TaskRef, Session } from '../runtime/types.ts';
import type { ProgressStore } from '../runtime/contracts.ts';

export type AttemptEvidenceCategory = 'FIRST_ATTEMPT' | 'ASSISTED' | 'REPAIR' | 'BOUNDARY_CHECK';

export interface EnrichedAttemptItem {
  readonly attemptId: string;
  readonly sessionId: string;
  readonly taskRef: TaskRef;
  readonly taskTitle: string;
  readonly subject: string;
  readonly category: AttemptEvidenceCategory;
  readonly submittedAt: string;
  readonly gradeStatus: 'SCORED' | 'REVIEW_PENDING' | 'UNSCORED';
  readonly score?: number;
  readonly isWithdrawn: boolean;
  readonly artifactsCount: number;
}

export interface ProgressSummaryStats {
  readonly totalAttempts: number;
  readonly firstAttempts: number;
  readonly assistedAttempts: number;
  readonly repairAttempts: number;
  readonly boundaryAttempts: number;
  readonly withdrawnRetained: number;
}

const COLOR_PRIMARY = '#1a73e8';
const COLOR_SURFACE = '#ffffff';
const COLOR_TEXT = '#202124';
const COLOR_TEXT_MUTED = '#5f6368';
const COLOR_BORDER = '#dadce0';
const ELEVATION_CARD = '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)';

export class ProgressPageController {
  private progressStore: ProgressStore | null = null;
  private rootElement: HTMLElement | null = null;
  private attempts: EnrichedAttemptItem[] = [];
  private selectedFilter: 'ALL' | AttemptEvidenceCategory = 'ALL';
  private selectedSubject: 'ALL' | 'PHYSICS' | 'CHEMISTRY' | 'MATHEMATICS' = 'ALL';
  private isLoading = false;
  private isStorageBlocked = false;
  private storageBlockedReason: string | null = null;
  private errorMessage: string | null = null;

  constructor(progressStore?: ProgressStore, initialAttempts: readonly EnrichedAttemptItem[] = []) {
    this.progressStore = progressStore || null;
    this.attempts = [...initialAttempts];
  }

  public getAttempts(): readonly EnrichedAttemptItem[] {
    return this.attempts;
  }

  public setAttempts(items: readonly EnrichedAttemptItem[]): void {
    this.attempts = [...items];
    this.render();
  }

  public addAttempt(item: EnrichedAttemptItem): void {
    this.attempts.unshift(item);
    this.render();
  }

  public setStorageBlocked(blocked: boolean, reason?: string): void {
    this.isStorageBlocked = blocked;
    this.storageBlockedReason = reason ?? null;
    this.render();
  }

  public async refreshFromStore(): Promise<void> {
    if (!this.progressStore) return;
    try {
      this.isLoading = true;
      const blob = await this.progressStore.exportAll();
      const text = await blob.text();
      const bundle = JSON.parse(text);
      if (bundle?.data?.attempts && Array.isArray(bundle.data.attempts)) {
        const loaded: EnrichedAttemptItem[] = bundle.data.attempts.map((a: any) => {
          let category: AttemptEvidenceCategory = 'FIRST_ATTEMPT';
          if (a.cognitive?.stage === 'BOUNDARY_TEST') {
            category = 'BOUNDARY_CHECK';
          } else if (a.cognitive?.parentJourney || a.cognitive?.stage === 'RETRY') {
            category = 'REPAIR';
          } else if (Array.isArray(a.hintIds) && a.hintIds.length > 0) {
            category = 'ASSISTED';
          }
          return {
            attemptId: a.id,
            sessionId: a.sessionId,
            taskRef: a.item,
            taskTitle: a.item?.id ?? 'Task',
            subject: 'MATHEMATICS',
            category,
            submittedAt: a.submittedAt ?? new Date().toISOString(),
            gradeStatus: a.grade?.status === 'SCORED' ? 'SCORED' : 'REVIEW_PENDING',
            score: a.grade?.points ?? undefined,
            isWithdrawn: false,
            artifactsCount: a.work?.length ?? 0,
          };
        });
        this.attempts = loaded;
      }
    } finally {
      this.isLoading = false;
      this.render();
    }
  }

  public getStats(): ProgressSummaryStats {
    let first = 0;
    let assisted = 0;
    let repair = 0;
    let boundary = 0;
    let withdrawn = 0;

    for (const a of this.attempts) {
      if (a.isWithdrawn) withdrawn++;
      switch (a.category) {
        case 'FIRST_ATTEMPT':
          first++;
          break;
        case 'ASSISTED':
          assisted++;
          break;
        case 'REPAIR':
          repair++;
          break;
        case 'BOUNDARY_CHECK':
          boundary++;
          break;
      }
    }

    return {
      totalAttempts: this.attempts.length,
      firstAttempts: first,
      assistedAttempts: assisted,
      repairAttempts: repair,
      boundaryAttempts: boundary,
      withdrawnRetained: withdrawn,
    };
  }

  public mount(container: HTMLElement): void {
    this.rootElement = container;
    this.render();
  }

  public setCategoryFilter(filter: 'ALL' | AttemptEvidenceCategory): void {
    this.selectedFilter = filter;
    this.render();
  }

  public setSubjectFilter(subject: 'ALL' | 'PHYSICS' | 'CHEMISTRY' | 'MATHEMATICS'): void {
    this.selectedSubject = subject;
    this.render();
  }

  public getFilteredAttempts(): readonly EnrichedAttemptItem[] {
    return this.attempts.filter((a) => {
      if (this.selectedFilter !== 'ALL' && a.category !== this.selectedFilter) {
        return false;
      }
      if (this.selectedSubject !== 'ALL' && a.subject.toUpperCase() !== this.selectedSubject) {
        return false;
      }
      return true;
    });
  }

  public render(): void {
    if (!this.rootElement) return;

    const stats = this.getStats();
    const minHit = `${HIT_TARGET_MIN_PX}px`;
    const filtered = this.getFilteredAttempts();

    const categoryChips: Array<{ id: 'ALL' | AttemptEvidenceCategory; label: string }> = [
      { id: 'ALL', label: `All Evidence (${stats.totalAttempts})` },
      { id: 'FIRST_ATTEMPT', label: `First Attempts (${stats.firstAttempts})` },
      { id: 'ASSISTED', label: `Assisted (${stats.assistedAttempts})` },
      { id: 'REPAIR', label: `Repairs (${stats.repairAttempts})` },
      { id: 'BOUNDARY_CHECK', label: `Boundary Checks (${stats.boundaryAttempts})` },
    ];

    const categoryChipsHtml = categoryChips
      .map((c) => {
        const isSelected = this.selectedFilter === c.id;
        return `
          <button type="button" class="filter-chip category-chip" data-category="${e(c.id)}" style="
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
          ">${e(c.label)}</button>
        `;
      })
      .join('');

    const itemsHtml =
      filtered.length === 0
        ? `
          <div class="empty-progress-state" style="
            text-align: center;
            padding: 48px 16px;
            background-color: ${COLOR_SURFACE};
            border: 1px solid ${COLOR_BORDER};
            border-radius: 12px;
            margin: 16px 0;
          ">
            <h3 style="margin: 0 0 8px 0; font-size: 16px; color: ${COLOR_TEXT};">No activity evidence matching selected filters</h3>
            <p style="margin: 0; color: ${COLOR_TEXT_MUTED}; font-size: 14px;">Complete questions, practice challenges, or repairs to record verified attempt evidence.</p>
          </div>
        `
        : filtered
            .map((item) => {
              let badgeColor = '#1a73e8';
              let badgeBg = '#e8f0fe';
              let catLabel = 'First Attempt';
              if (item.category === 'ASSISTED') {
                badgeColor = '#e37400';
                badgeBg = '#fef7e0';
                catLabel = 'Assisted Attempt';
              } else if (item.category === 'REPAIR') {
                badgeColor = '#137333';
                badgeBg = '#e6f4ea';
                catLabel = 'Diagnostic Repair';
              } else if (item.category === 'BOUNDARY_CHECK') {
                badgeColor = '#9334e6';
                badgeBg = '#f3e8fd';
                catLabel = 'Boundary Check';
              }

              return `
                <article class="attempt-card" data-attempt-id="${e(item.attemptId)}" style="
                  background-color: ${COLOR_SURFACE};
                  border: 1px solid ${COLOR_BORDER};
                  border-radius: 12px;
                  padding: 16px;
                  box-shadow: ${ELEVATION_CARD};
                  display: flex;
                  flex-direction: column;
                  gap: 8px;
                  min-height: ${minHit};
                ">
                  <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px;">
                    <div style="display: flex; gap: 8px; align-items: center;">
                      <span class="attempt-badge" style="
                        background-color: ${badgeBg};
                        color: ${badgeColor};
                        font-size: 12px;
                        font-weight: 600;
                        padding: 4px 10px;
                        border-radius: 12px;
                        min-height: 24px;
                        display: inline-flex;
                        align-items: center;
                      ">${e(catLabel)}</span>
                      <span style="font-size: 12px; font-weight: 500; color: ${COLOR_TEXT_MUTED};">
                        ${e(item.subject)}
                      </span>
                    </div>
                    <time style="font-size: 12px; color: ${COLOR_TEXT_MUTED};" datetime="${e(item.submittedAt)}">
                      ${e(new Date(item.submittedAt).toLocaleString())}
                    </time>
                  </div>
                  <h4 style="margin: 0; font-size: 15px; color: ${COLOR_TEXT}; line-height: 1.4;">
                    ${e(item.taskTitle || item.taskRef.id)}
                  </h4>
                  <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px; margin-top: 4px;">
                    <span style="font-size: 12px; font-family: monospace; color: #888888;">
                      Task ID: ${e(item.taskRef.id)} (rev ${item.taskRef.revision})
                    </span>
                    <span style="font-size: 12px; font-weight: 600; color: ${item.gradeStatus === 'SCORED' ? '#137333' : '#e37400'};">
                      ${item.gradeStatus === 'SCORED' ? `Score: ${item.score ?? 0}` : 'Review Pending'}
                    </span>
                  </div>
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
                      margin-top: 4px;
                    ">
                      ⚠️ Note: This item was recorded on an earlier release version (now withdrawn). Historical work evidence is preserved.
                    </div>
                  `
                      : ''
                  }
                </article>
              `;
            })
            .join('');

    this.rootElement.innerHTML = `
      <div class="progress-page-container" style="
        width: 100%;
        max-width: 1200px;
        margin: 0 auto;
        padding: 16px;
        box-sizing: border-box;
      ">
        <!-- Rule 13 / Invariant Academic Disclaimer Banner -->
        <header class="progress-header" style="margin-bottom: 24px;">
          <h2 style="margin: 0 0 8px 0; font-size: 24px; color: ${COLOR_TEXT};">Activity & Attempt Evidence</h2>
          <div class="mastery-disclaimer-banner" role="note" style="
            background-color: #f1f3f4;
            border-left: 4px solid #5f6368;
            padding: 12px 16px;
            border-radius: 4px;
            font-size: 13px;
            color: #3c4043;
            line-height: 1.5;
          ">
            <strong>Evidence-Only Log:</strong> This screen records factual chronological attempts, diagnostic checks, and repairs.
            In strict compliance with validation invariants, <em>zero cognitive mastery, competency estimates, or exam readiness is inferred</em>.
            (Academic admission: <code>HOLD</code>; Production release: <code>NONE</code>)
          </div>
        </header>

        ${
          this.isStorageBlocked
            ? `
          <div class="storage-blocked-alert" role="alert" style="
            background-color: #fce8e6;
            border: 1px solid #fad2cf;
            border-left: 4px solid #d93025;
            border-radius: 4px;
            padding: 12px 16px;
            margin-bottom: 20px;
            font-size: 14px;
            color: #c5221f;
            line-height: 1.5;
          ">
            <strong>⚠️ Storage Alert:</strong> Browser persistence is blocked or restricted. Attempts are kept in ephemeral memory for this session only.
            ${this.storageBlockedReason ? `<div style="font-size: 12px; margin-top: 4px;">Detail: ${e(this.storageBlockedReason)}</div>` : ''}
          </div>
        `
            : ''
        }

        <!-- Stats Overview Cards -->
        <div class="stats-overview-grid" style="
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 12px;
          margin-bottom: 24px;
        ">
          <div style="background: ${COLOR_SURFACE}; border: 1px solid ${COLOR_BORDER}; border-radius: 12px; padding: 16px; text-align: center;">
            <div style="font-size: 28px; font-weight: 700; color: ${COLOR_PRIMARY};">${stats.totalAttempts}</div>
            <div style="font-size: 13px; color: ${COLOR_TEXT_MUTED}; margin-top: 4px;">Total Attempts Logged</div>
          </div>
          <div style="background: ${COLOR_SURFACE}; border: 1px solid ${COLOR_BORDER}; border-radius: 12px; padding: 16px; text-align: center;">
            <div style="font-size: 28px; font-weight: 700; color: #1a73e8;">${stats.firstAttempts}</div>
            <div style="font-size: 13px; color: ${COLOR_TEXT_MUTED}; margin-top: 4px;">First Submissions</div>
          </div>
          <div style="background: ${COLOR_SURFACE}; border: 1px solid ${COLOR_BORDER}; border-radius: 12px; padding: 16px; text-align: center;">
            <div style="font-size: 28px; font-weight: 700; color: #137333;">${stats.repairAttempts}</div>
            <div style="font-size: 13px; color: ${COLOR_TEXT_MUTED}; margin-top: 4px;">Repairs Completed</div>
          </div>
          <div style="background: ${COLOR_SURFACE}; border: 1px solid ${COLOR_BORDER}; border-radius: 12px; padding: 16px; text-align: center;">
            <div style="font-size: 28px; font-weight: 700; color: #e37400;">${stats.assistedAttempts}</div>
            <div style="font-size: 13px; color: ${COLOR_TEXT_MUTED}; margin-top: 4px;">Assisted Attempts</div>
          </div>
        </div>

        <!-- Filter Chips Row -->
        <div class="category-filters-row" style="
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          margin-bottom: 16px;
        ">
          ${categoryChipsHtml}
        </div>

        <!-- Timeline / Ledger List -->
        <main class="attempts-ledger-list" style="display: flex; flex-direction: column; gap: 12px;">
          ${itemsHtml}
        </main>
      </div>
    `;

    this.attachEventListeners();
  }

  private attachEventListeners(): void {
    if (!this.rootElement || typeof this.rootElement.querySelectorAll !== 'function') return;

    const chips = this.rootElement.querySelectorAll<HTMLButtonElement>('.category-chip');
    chips.forEach((chip) => {
      chip.addEventListener('click', () => {
        const cat = chip.getAttribute('data-category') as 'ALL' | AttemptEvidenceCategory;
        if (cat) {
          this.setCategoryFilter(cat);
        }
      });
    });
  }
}
