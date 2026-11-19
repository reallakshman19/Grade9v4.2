/**
 * web/pages/application-transfer.ts
 * A68 — Core2B Changed-Demand Application Transfer Page Controller.
 *
 * Implements:
 * - Route: /transfer/:id
 * - Declared screen states:
 *   - "loading"
 *   - "error"
 *   - "missing-lineage"
 *   - "untaught-capability"
 *   - "attempt-phase"
 *   - "save-error"
 *   - "revealed-phase"
 *   - "repair-phase"
 * - Actions: update-draft, select-scaffold, commit-attempt, reveal-solution, request-repair, switch-orientation
 * - Protected DECIDE move withheld pre-attempt
 * - Durable commitment: attempt immutability & save-failure blocking
 * - Multi-factor rubric review without automatic human grading
 * - Independent boundary diagnostic repair
 * - Dual-orientation tablet layout (Landscape split & Portrait stacked)
 * - 48px minimum touch hitbox on all interactive elements
 * - Rule 13 invariant preservation
 *
 * No academic approval inferred from software validation.
 */

import { HIT_TARGET_MIN_PX } from '../styles/tokens.ts';
import {
  Core2BTransferJourney,
} from '../journeys/core2b.ts';
import type {
  Core2BTransferDefinition,
  LearnerCapabilityProfile,
  ScaffoldLevel,
  RepairRoute,
  RubricCriterion,
  DurableStoragePort,
} from '../journeys/core2b.ts';

export type DisplayOrientation = 'LANDSCAPE' | 'PORTRAIT';

export type ApplicationTransferScreenState =
  | 'loading'
  | 'error'
  | 'missing-lineage'
  | 'untaught-capability'
  | 'attempt-phase'
  | 'save-error'
  | 'revealed-phase'
  | 'repair-phase';

export interface ApplicationTransferPageConfig {
  readonly definition?: Core2BTransferDefinition;
  readonly learnerProfile?: LearnerCapabilityProfile;
  readonly orientation?: DisplayOrientation;
  readonly initialState?: ApplicationTransferScreenState;
  readonly errorMessage?: string;
  readonly storageService?: DurableStoragePort;
}

export interface ApplicationTransferViewState {
  readonly screenState: ApplicationTransferScreenState;
  readonly journeyId: string;
  readonly taskId: string;
  readonly taskTitle: string;
  readonly stem: string;
  readonly dimension: string;
  readonly transferStatement: string;
  readonly isProtectedMoveWithheld: boolean;
  readonly isAttemptCommitted: boolean;
  readonly isSaved: boolean;
  readonly isSolutionRevealed: boolean;
  readonly activeScaffoldLevel: ScaffoldLevel | null;
  readonly activeRepair: RepairRoute | null;
  readonly rubric: readonly RubricCriterion[];
  readonly orientation: DisplayOrientation;
  readonly minHitTargetPx: number;
}

export class Core2BApplicationTransferPageController {
  private journey: Core2BTransferJourney | null = null;
  private screenState: ApplicationTransferScreenState = 'attempt-phase';
  private errorMessage: string | null = null;
  private orientation: DisplayOrientation = 'LANDSCAPE';
  private readonly storageService?: DurableStoragePort;

  constructor(config: ApplicationTransferPageConfig) {
    this.orientation = config.orientation || 'LANDSCAPE';
    this.storageService = config.storageService;

    if (config.initialState) {
      this.screenState = config.initialState;
      this.errorMessage = config.errorMessage || null;
      return;
    }

    if (!config.definition || !config.learnerProfile) {
      this.screenState = 'error';
      this.errorMessage = 'Transfer definition and learner profile are required.';
      return;
    }

    // Check capability closure and lineage before instantiation
    const closure = Core2BTransferJourney.verifyCapabilityClosure(
      config.definition.task.lineage,
      config.learnerProfile,
    );

    if (!closure.isEligible) {
      if (closure.reason === 'MISSING_LINEAGE_BLOCKED') {
        this.screenState = 'missing-lineage';
        this.errorMessage = 'Prior anchor lineage or exposure missing. Transfer route blocked.';
        return;
      }
      if (closure.reason === 'UNTAUGHT_CAPABILITY_BLOCKED') {
        this.screenState = 'untaught-capability';
        this.errorMessage = `Prerequisite capability untaught: [${(closure.missingCapabilities || []).join(', ')}]. Transfer blocked.`;
        return;
      }
      if (closure.reason === 'COVER_STORY_ONLY_REJECTED') {
        this.screenState = 'error';
        this.errorMessage = 'Surface cover story change cannot certify changed-demand transfer.';
        return;
      }
    }

    try {
      this.journey = new Core2BTransferJourney(config.definition, config.learnerProfile);
      this.screenState = 'attempt-phase';
    } catch (err: unknown) {
      this.screenState = 'error';
      this.errorMessage = err instanceof Error ? err.message : String(err);
    }
  }

  public getScreenState(): ApplicationTransferScreenState {
    return this.screenState;
  }

  public getErrorMessage(): string | null {
    return this.errorMessage;
  }

  public getOrientation(): DisplayOrientation {
    return this.orientation;
  }

  public setOrientation(orientation: DisplayOrientation): void {
    this.orientation = orientation;
  }

  public updateDraft(workingText: string, symbolicDraft: string): void {
    if (!this.journey) return;
    this.journey.updateDraft(workingText, symbolicDraft);
  }

  public selectScaffold(level: ScaffoldLevel): void {
    if (!this.journey) return;
    this.journey.selectScaffold(level);
  }

  public async commitAttempt(): Promise<void> {
    if (!this.journey) return;
    try {
      await this.journey.commitAttempt(this.storageService);
      this.screenState = 'attempt-phase';
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      if (msg.includes('SAVE_FAILURE')) {
        this.screenState = 'save-error';
        this.errorMessage = msg;
      } else {
        throw err;
      }
    }
  }

  public revealSolution(): void {
    if (!this.journey) return;
    this.journey.revealSolution();
    this.screenState = 'revealed-phase';
  }

  public requestRepair(): RepairRoute {
    if (!this.journey) {
      throw new Error('NO_JOURNEY_LOADED');
    }
    const route = this.journey.engageRepair();
    this.screenState = 'repair-phase';
    return route;
  }

  public getViewState(): ApplicationTransferViewState {
    if (!this.journey) {
      return {
        screenState: this.screenState,
        journeyId: '',
        taskId: '',
        taskTitle: '',
        stem: '',
        dimension: '',
        transferStatement: '',
        isProtectedMoveWithheld: true,
        isAttemptCommitted: false,
        isSaved: false,
        isSolutionRevealed: false,
        activeScaffoldLevel: null,
        activeRepair: null,
        rubric: [],
        orientation: this.orientation,
        minHitTargetPx: HIT_TARGET_MIN_PX,
      };
    }

    const state = this.journey.getState();
    const task = this.journey.getTask();

    return {
      screenState: this.screenState,
      journeyId: task.taskId,
      taskId: task.taskId,
      taskTitle: task.title,
      stem: task.stem,
      dimension: task.lineage.dimension,
      transferStatement: task.lineage.statement,
      isProtectedMoveWithheld: state.isProtectedMoveWithheld,
      isAttemptCommitted: state.isAttemptCommitted,
      isSaved: state.isSaved,
      isSolutionRevealed: state.isSolutionRevealed,
      activeScaffoldLevel: state.activeScaffoldLevel,
      activeRepair: state.activeRepair,
      rubric: task.rubric,
      orientation: this.orientation,
      minHitTargetPx: HIT_TARGET_MIN_PX,
    };
  }

  /**
   * Render HTML string for tablet webview presentation
   */
  public renderToHTML(): string {
    const vs = this.getViewState();

    if (vs.screenState === 'loading') {
      return `<div class="transfer-screen loading" data-state="loading"><p>Loading changed-demand transfer challenge...</p></div>`;
    }

    if (vs.screenState === 'missing-lineage') {
      return `<div class="transfer-screen blocked" data-state="missing-lineage">
        <h2>Transfer Blocked: Missing Lineage</h2>
        <p class="error-msg">${this.errorMessage || 'Prior anchor exposure missing.'}</p>
        <button class="nav-back-btn" style="min-height: ${HIT_TARGET_MIN_PX}px; min-width: ${HIT_TARGET_MIN_PX}px;">Return to Anchor</button>
      </div>`;
    }

    if (vs.screenState === 'untaught-capability') {
      return `<div class="transfer-screen blocked" data-state="untaught-capability">
        <h2>Transfer Blocked: Untaught Capability</h2>
        <p class="error-msg">${this.errorMessage || 'Required prerequisite capabilities have not been taught.'}</p>
        <button class="nav-back-btn" style="min-height: ${HIT_TARGET_MIN_PX}px; min-width: ${HIT_TARGET_MIN_PX}px;">Return to Learning Path</button>
      </div>`;
    }

    if (vs.screenState === 'save-error') {
      return `<div class="transfer-screen error" data-state="save-error">
        <h2>Durable Commitment Failed</h2>
        <p class="error-msg">${this.errorMessage || 'Storage persistence failed. Reveal is blocked.'}</p>
        <button class="retry-save-btn" style="min-height: ${HIT_TARGET_MIN_PX}px; min-width: ${HIT_TARGET_MIN_PX}px;">Retry Save</button>
      </div>`;
    }

    if (vs.screenState === 'error') {
      return `<div class="transfer-screen error" data-state="error">
        <h2>Transfer Route Error</h2>
        <p class="error-msg">${this.errorMessage || 'Unknown error occurred.'}</p>
      </div>`;
    }

    const orientationClass = vs.orientation.toLowerCase();

    return `
      <div class="application-transfer-workspace orientation-${orientationClass}" data-orientation="${vs.orientation}" data-screen-state="${vs.screenState}">
        <header class="transfer-header">
          <span class="topic-tag">Core2B Changed-Demand Transfer</span>
          <h1 class="task-title">${vs.taskTitle}</h1>
          <div class="dimension-badge">${vs.dimension}</div>
          <div class="rule13-banner">No academic approval inferred from software validation.</div>
        </header>

        <main class="transfer-layout ${orientationClass}">
          <section class="stem-and-work-pane">
            <article class="transfer-stem">
              <h3>Problem Challenge</h3>
              <p>${vs.stem}</p>
              <div class="change-demand-notice">
                <strong>Changed Demand:</strong> ${vs.transferStatement}
              </div>
            </article>

            <div class="workspace-inputs">
              <textarea class="learner-working-area" placeholder="Enter your reasoning and formulation..." style="min-height: 120px;"></textarea>
              <input class="symbolic-draft-input" placeholder="Symbolic derivation..." style="min-height: ${HIT_TARGET_MIN_PX}px;" />
            </div>

            <div class="action-toolbar">
              <button class="action-btn commit-btn" style="min-height: ${HIT_TARGET_MIN_PX}px; min-width: ${HIT_TARGET_MIN_PX}px;" ${vs.isAttemptCommitted ? 'disabled' : ''}>
                ${vs.isAttemptCommitted ? 'Attempt Committed' : 'Commit First Attempt'}
              </button>
              ${
                vs.isAttemptCommitted && !vs.isSolutionRevealed
                  ? `<button class="action-btn reveal-btn" style="min-height: ${HIT_TARGET_MIN_PX}px; min-width: ${HIT_TARGET_MIN_PX}px;">Reveal Rubric & Solution</button>`
                  : ''
              }
            </div>
          </section>

          <aside class="transfer-support-pane">
            <div class="scaffold-controls">
              <h4>Safe Scaffolds</h4>
              <button class="scaffold-tab" data-level="ORIENTATION" style="min-height: ${HIT_TARGET_MIN_PX}px; min-width: ${HIT_TARGET_MIN_PX}px;">Orientation</button>
              <button class="scaffold-tab" data-level="CLARIFICATION" style="min-height: ${HIT_TARGET_MIN_PX}px; min-width: ${HIT_TARGET_MIN_PX}px;">Clarification</button>
              <button class="scaffold-tab" data-level="STRUCTURE" style="min-height: ${HIT_TARGET_MIN_PX}px; min-width: ${HIT_TARGET_MIN_PX}px;">Structure</button>
            </div>

            ${
              vs.isProtectedMoveWithheld
                ? `<div class="protected-decide-guard">
                    <span class="lock-icon">🔒</span>
                    <p>Protected Decision Withheld Until Attempt Committed</p>
                   </div>`
                : `<div class="protected-decide-review">
                    <h4>Protected Decision Review</h4>
                    <p>The pivotal move in this transfer challenge was correctly choosing the coordinate axis and non-zero velocity boundary.</p>
                   </div>`
            }

            ${
              vs.isSolutionRevealed
                ? `<div class="rubric-review-pane">
                    <h4>Evaluation Rubric (Criterion-Referenced)</h4>
                    <p class="grading-note">Note: No automatic human grading. Compare your committed attempt to the rubric.</p>
                    <ul class="rubric-list">
                      ${vs.rubric.map((r) => `<li><strong>${r.criterionText}</strong> (Max ${r.maxPoints} pts)</li>`).join('')}
                    </ul>
                    <button class="action-btn repair-btn" style="min-height: ${HIT_TARGET_MIN_PX}px; min-width: ${HIT_TARGET_MIN_PX}px;">Engage Diagnostic Repair</button>
                   </div>`
                : ''
            }
          </aside>
        </main>
      </div>
    `.trim();
  }
}

