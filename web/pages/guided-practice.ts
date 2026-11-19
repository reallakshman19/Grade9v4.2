/**
 * web/pages/guided-practice.ts
 * A67 — Core2A Guided Practice Page Controller and Dual-Orientation Tablet View.
 *
 * Implements:
 * - Route: /guided/:id
 * - Actions: select-support, reveal-familiar-crux, self-check, repair
 * - Declared screen states: "populated", "loading", "error", "unknown learner", "no eligible route"
 * - Source vs authored scaffolds, explicit application crux, independent verification check
 * - Dual-orientation tablet layout (Landscape split view & Portrait vertical view)
 * - 48px minimum touch hitbox on all interactive elements
 * - Rule 13 invariant preservation
 *
 * No academic approval inferred from software validation.
 */

import { HIT_TARGET_MIN_PX } from '../styles/tokens.ts';
import {
  Core2ASupportedJourney,
} from '../journeys/core2a.ts';
import type {
  SupportLevel,
  Core2APracticeDefinition,
  Core2APracticeDraft,
} from '../journeys/core2a.ts';

export type DisplayOrientation = 'LANDSCAPE' | 'PORTRAIT';

export type GuidedPracticeScreenState =
  | 'loading'
  | 'error'
  | 'populated'
  | 'unknown learner'
  | 'no eligible route';

export interface GuidedPracticePageConfig {
  readonly practiceDefinition?: Core2APracticeDefinition;
  readonly orientation?: DisplayOrientation;
  readonly initialState?: GuidedPracticeScreenState;
  readonly errorMessage?: string;
}

export interface GuidedPracticePageViewState {
  readonly screenState: GuidedPracticeScreenState;
  readonly journeyId: string;
  readonly taskId: string;
  readonly familyTitle: string;
  readonly selectedSupport: SupportLevel;
  readonly isCruxRevealed: boolean;
  readonly isCheckExecuted: boolean;
  readonly checkResultValid: boolean | null;
  readonly isRepairApplied: boolean;
  readonly orientation: DisplayOrientation;
  readonly minHitTargetPx: number;
}

export class Core2AGuidedPracticePageController {
  private journey: Core2ASupportedJourney | null = null;
  private screenState: GuidedPracticeScreenState = 'populated';
  private errorMessage: string | null = null;
  private orientation: DisplayOrientation = 'LANDSCAPE';
  private checkFeedback: string = '';

  constructor(config: GuidedPracticePageConfig) {
    this.orientation = config.orientation || 'LANDSCAPE';

    if (config.initialState) {
      this.screenState = config.initialState;
      this.errorMessage = config.errorMessage || null;
    }

    if (config.practiceDefinition) {
      try {
        this.journey = new Core2ASupportedJourney(config.practiceDefinition);
        if (!config.initialState) {
          this.refreshScreenState();
        }
      } catch (err: any) {
        this.screenState = 'error';
        this.errorMessage = err.message || 'Initialization failed';
      }
    } else if (!config.initialState) {
      this.screenState = 'error';
      this.errorMessage = 'Missing practice definition';
    }
  }

  private refreshScreenState(): void {
    if (!this.journey) {
      this.screenState = 'error';
      return;
    }

    const def = this.journey.getDefinition();

    if (!def.isRouteEligible) {
      this.screenState = 'no eligible route';
      return;
    }

    if (def.learnerKnowledgeStatus === 'UNKNOWN_KNOWLEDGE') {
      this.screenState = 'unknown learner';
      return;
    }

    this.screenState = 'populated';
  }

  // --- Actions ---

  /**
   * Action: 'select-support'
   * Choose scaffolding tier (MINIMAL, MODERATE, FULL_SCAFFOLD).
   */
  actionSelectSupport(level: SupportLevel): void {
    if (!this.journey) throw new Error('Journey not loaded');
    this.journey.setSupportLevel(level);
  }

  /**
   * Action: 'reveal-familiar-crux'
   * Disclose the explicit inferential application crux.
   */
  actionRevealFamiliarCrux(): boolean {
    if (!this.journey) throw new Error('Journey not loaded');
    return this.journey.revealFamiliarCrux();
  }

  /**
   * Action: 'self-check'
   * Run independent verification check on working.
   */
  actionSelfCheck(workingText?: string): { readonly valid: boolean; readonly feedback: string } {
    if (!this.journey) throw new Error('Journey not loaded');
    if (workingText) {
      this.journey.updateWorking(workingText);
    }
    const result = this.journey.executeSelfCheck();
    this.checkFeedback = result.feedback;
    return result;
  }

  /**
   * Action: 'repair'
   * Apply guided correction after self-check failure.
   */
  actionRepair(): void {
    if (!this.journey) throw new Error('Journey not loaded');
    this.journey.applyRepair();
  }

  // --- Display & Orientation ---

  setOrientation(orientation: DisplayOrientation): void {
    this.orientation = orientation;
  }

  getOrientation(): DisplayOrientation {
    return this.orientation;
  }

  // --- View State & Persistence ---

  getViewState(): GuidedPracticePageViewState {
    if (!this.journey) {
      return {
        screenState: this.screenState,
        journeyId: '',
        taskId: '',
        familyTitle: 'Guided Practice Unavailable',
        selectedSupport: 'MODERATE',
        isCruxRevealed: false,
        isCheckExecuted: false,
        checkResultValid: null,
        isRepairApplied: false,
        orientation: this.orientation,
        minHitTargetPx: HIT_TARGET_MIN_PX,
      };
    }

    const def = this.journey.getDefinition();

    return {
      screenState: this.screenState,
      journeyId: def.journeyId,
      taskId: def.task.taskId,
      familyTitle: def.task.familyTitle,
      selectedSupport: this.journey.getSupportLevel(),
      isCruxRevealed: this.journey.isCruxRevealed(),
      isCheckExecuted: this.journey.isCheckExecuted(),
      checkResultValid: this.journey.getCheckResult(),
      isRepairApplied: this.journey.isRepairApplied(),
      orientation: this.orientation,
      minHitTargetPx: HIT_TARGET_MIN_PX,
    };
  }

  toDraft(): Core2APracticeDraft | null {
    return this.journey ? this.journey.toDraft() : null;
  }

  restoreDraft(draft: Core2APracticeDraft): void {
    if (this.journey) {
      this.journey.restoreDraft(draft);
      this.refreshScreenState();
    }
  }

  // --- HTML Rendering ---

  render(): string {
    const state = this.getViewState();

    return `
<div class="g9-guided-practice-page ${this.orientation.toLowerCase()}" data-screen-state="${state.screenState}" style="min-width: 100%; box-sizing: border-box; overflow-x: hidden; font-family: system-ui, sans-serif; background: #f8fafc; min-height: 100vh; display: flex; flex-direction: column;">
  <!-- Styling & Hit Targets -->
  <style>
    .g9-btn, .g9-support-btn, .g9-action-btn {
      min-height: ${HIT_TARGET_MIN_PX}px;
      min-width: ${HIT_TARGET_MIN_PX}px;
      box-sizing: border-box;
      padding: 10px 18px;
      font-size: 15px;
      font-weight: 600;
      border-radius: 8px;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      touch-action: manipulation;
    }
    .g9-guided-container {
      flex: 1;
      padding: 24px;
      display: flex;
      flex-direction: ${this.orientation === 'LANDSCAPE' ? 'row' : 'column'};
      gap: 20px;
    }
    .g9-guided-main {
      flex: 3;
      background: #ffffff;
      padding: 24px;
      border-radius: 12px;
      border: 1px solid #e2e8f0;
      box-shadow: 0 1px 3px rgba(0,0,0,0.05);
    }
    .g9-guided-side {
      flex: 2;
      background: #ffffff;
      padding: 20px;
      border-radius: 12px;
      border: 1px solid #e2e8f0;
      box-shadow: 0 1px 3px rgba(0,0,0,0.05);
    }
    .g9-banner {
      padding: 12px 18px;
      border-radius: 8px;
      margin: 16px 24px 0 24px;
      font-size: 14px;
    }
    .g9-banner-warning { background: #fffbeb; color: #92400e; border: 1px solid #fde68a; }
    .g9-banner-error { background: #fef2f2; color: #991b1b; border: 1px solid #fecaca; }
    .g9-banner-info { background: #eff6ff; color: #1e40af; border: 1px solid #bfdbfe; }
  </style>

  <!-- Top App Shell Header -->
  <header style="background: #ffffff; border-bottom: 1px solid #e2e8f0; padding: 14px 24px; display: flex; justify-content: space-between; align-items: center;">
    <div>
      <span style="font-size: 12px; font-weight: 700; color: #64748b; text-transform: uppercase;">Core2A &bull; Familiar Family Guided Practice</span>
      <h1 style="font-size: 20px; font-weight: 800; margin: 4px 0 0 0; color: #0f172a;">${state.familyTitle}</h1>
    </div>
    <div style="display: flex; gap: 8px;">
      <button class="g9-btn g9-action-btn" data-action="return" aria-label="Return to Curriculum" style="background: #f1f5f9; color: #334155; border: 1px solid #cbd5e1;">
        &larr; Return
      </button>
    </div>
  </header>

  <!-- Status Banners -->
  ${this.renderStatusBanners(state)}

  <!-- Workspace Body -->
  <main class="g9-guided-container">
    <div class="g9-guided-main">
      ${this.renderMainWorkspace(state)}
    </div>

    <!-- Sidebar: Scaffolding Controls & Crux Exposure -->
    <aside class="g9-guided-side">
      <section aria-labelledby="support-level-heading">
        <h3 id="support-level-heading" style="font-size: 16px; font-weight: 700; color: #0f172a; margin-top: 0;">Scaffolding Tier</h3>
        ${this.renderSupportSelector(state)}
      </section>

      <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 20px 0;" />

      <section aria-labelledby="crux-heading">
        <h3 id="crux-heading" style="font-size: 16px; font-weight: 700; color: #0f172a;">Application Crux</h3>
        ${this.renderCruxSection(state)}
      </section>
    </aside>
  </main>

  <!-- Mandatory Footer & Rule 13 Invariant -->
  <footer style="background: #ffffff; border-top: 1px solid #e2e8f0; padding: 14px 24px; font-size: 13px; color: #64748b; text-align: center;">
    <div>Core2A Supported Application &bull; BP-GUIDED-PRACTICE-CORE2A@1.0.0</div>
    <div style="font-weight: 600; color: #94a3b8; margin-top: 4px;">No academic approval inferred from software validation.</div>
  </footer>
</div>`;
  }

  private renderStatusBanners(state: GuidedPracticePageViewState): string {
    if (state.screenState === 'loading') {
      return `<div class="g9-banner g9-banner-info" role="status">Loading guided practice workspace...</div>`;
    }
    if (state.screenState === 'error') {
      return `<div class="g9-banner g9-banner-error" role="alert">Error: ${this.errorMessage || 'Unable to load practice.'}</div>`;
    }
    if (state.screenState === 'unknown learner') {
      return `<div class="g9-banner g9-banner-info" role="status">Diagnostic State: Unknown learner profile. Scaffolding defaulted to moderate guidance; practice progress recorded without premature mastery assumption.</div>`;
    }
    if (state.screenState === 'no eligible route') {
      return `<div class="g9-banner g9-banner-warning" role="alert">No Eligible Route: Prerequisite teaching units not completed. Complete Core1A units before starting guided practice.</div>`;
    }
    return '';
  }

  private renderMainWorkspace(state: GuidedPracticePageViewState): string {
    if (!this.journey) return `<p>Practice unavailable.</p>`;

    const task = this.journey.getDefinition().task;
    const isChecked = state.isCheckExecuted;

    return `
<div class="g9-practice-workspace">
  <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 2px solid #f1f5f9; padding-bottom: 8px; margin-bottom: 16px;">
    <h2 style="font-size: 18px; font-weight: 700; color: #1e293b; margin: 0;">Practice Problem</h2>
    <span style="font-size: 12px; font-weight: 600; color: #64748b;">Crux Type: ${task.cruxType}</span>
  </div>

  <p style="font-size: 15px; line-height: 1.6; color: #1e293b; margin-bottom: 20px;">
    ${task.prompt}
  </p>

  <!-- Learner Working Text Area -->
  <div style="margin-bottom: 16px;">
    <label for="practice-working-input" style="display: block; font-size: 14px; font-weight: 600; color: #334155; margin-bottom: 6px;">
      Your Guided Working &amp; Application Steps:
    </label>
    <textarea
      id="practice-working-input"
      rows="5"
      aria-label="Practice Working Input"
      placeholder="Apply energy conservation formula and solve for target quantity..."
      style="width: 100%; box-sizing: border-box; padding: 12px; font-size: 14px; border: 1px solid #cbd5e1; border-radius: 6px; font-family: monospace;"
    >${this.journey.getWorking()}</textarea>
  </div>

  <div style="display: flex; gap: 12px; align-items: center; margin-bottom: 20px;">
    <button
      class="g9-btn g9-action-btn"
      data-action="self-check"
      aria-label="Run Independent Verification Check"
      style="background: #2563eb; color: #ffffff; border: 0;"
    >
      Run Independent Self-Check &check;
    </button>
  </div>

  <!-- Check Feedback & Repair Prompt -->
  ${isChecked ? `
    <div class="g9-selfcheck-result" style="background: ${state.checkResultValid ? '#f0fdf4' : '#fffbeb'}; border: 1px solid ${state.checkResultValid ? '#bbf7d0' : '#fde68a'}; border-radius: 8px; padding: 16px; margin-bottom: 16px;">
      <h4 style="font-size: 14px; font-weight: 700; color: ${state.checkResultValid ? '#15803d' : '#b45309'}; margin: 0 0 6px 0;">
        ${state.checkResultValid ? 'Self-Check Verified' : 'Check Discrepancy'}
      </h4>
      <p style="font-size: 13px; margin: 0 0 10px 0; color: #334155;">${this.checkFeedback}</p>

      ${!state.checkResultValid ? `
        <button
          class="g9-btn g9-action-btn"
          data-action="repair"
          aria-label="Apply Guided Repair"
          style="background: #d97706; color: #ffffff; border: 0; padding: 8px 14px; font-size: 13px;"
        >
          Apply Guided Repair
        </button>` : ''}
    </div>` : ''}

  <!-- Complete Solution Steps (Disclosed after check or on request) -->
  ${state.isCheckExecuted && state.checkResultValid ? `
    <div class="g9-complete-solution" style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px;">
      <h4 style="font-size: 14px; font-weight: 700; color: #1e293b; margin: 0 0 8px 0;">Full Solution Steps:</h4>
      <ol style="margin: 0; padding-left: 20px; font-size: 14px; line-height: 1.6; color: #334155;">
        ${task.fullSolutionSteps.map((st) => `<li>${st}</li>`).join('')}
      </ol>
    </div>` : ''}
</div>`;
  }

  private renderSupportSelector(state: GuidedPracticePageViewState): string {
    const levels: SupportLevel[] = ['MINIMAL', 'MODERATE', 'FULL_SCAFFOLD'];

    return `
<div class="g9-support-selector" style="display: flex; gap: 6px; margin-bottom: 16px;">
  ${levels.map((lvl) => {
    const isSelected = lvl === state.selectedSupport;
    return `
    <button
      class="g9-support-btn"
      data-action="select-support"
      data-level="${lvl}"
      aria-selected="${isSelected ? 'true' : 'false'}"
      aria-label="Support Level ${lvl}"
      style="flex: 1; font-size: 12px; padding: 8px 10px; border-radius: 6px; border: 1px solid ${isSelected ? '#2563eb' : '#cbd5e1'}; background: ${isSelected ? '#2563eb' : '#ffffff'}; color: ${isSelected ? '#ffffff' : '#334155'};"
    >
      ${lvl}
    </button>`;
  }).join('')}
</div>

<!-- Visible Scaffolds -->
<div class="g9-scaffolds-list">
  ${this.journey ? this.journey.getVisibleScaffolds().map((sc) => `
    <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 12px; margin-bottom: 8px; font-size: 13px;">
      <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
        <span style="font-weight: 700; color: #1e293b;">${sc.title}</span>
        <span style="font-size: 11px; font-weight: 600; color: #64748b;">${sc.origin}</span>
      </div>
      <div style="color: #475569;">${sc.hintText}</div>
    </div>
  `).join('') : ''}
</div>`;
  }

  private renderCruxSection(state: GuidedPracticePageViewState): string {
    if (!this.journey) return `<p>Crux unavailable.</p>`;

    const task = this.journey.getDefinition().task;

    return `
<div class="g9-crux-section" style="background: #faf5ff; border: 1px solid #e9d5ff; border-radius: 8px; padding: 14px;">
  <div style="font-size: 13px; font-weight: 700; color: #6b21a8; margin-bottom: 6px;">
    Crux: ${task.cruxType}
  </div>

  ${!state.isCruxRevealed ? `
    <button
      class="g9-btn g9-action-btn"
      data-action="reveal-familiar-crux"
      aria-label="Reveal Familiar Application Crux"
      style="width: 100%; background: #7e22ce; color: #ffffff; border: 0; font-size: 13px;"
    >
      Reveal Application Crux
    </button>` : `
    <div class="g9-crux-explanation" style="font-size: 13px; color: #3b0764; line-height: 1.5;">
      ${task.applicationCruxDescription}
    </div>`}
</div>`;
  }
}
