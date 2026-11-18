/**
 * web/pages/transfer.ts
 * A32 — Core1B Fresh Transfer interactive page controller and dual-orientation tablet view.
 *
 * Implements:
 * - Route: /challenge/:id
 * - Six-stage cognitive sequence:
 *   PREDICT -> ATTEMPT -> RECONSTRUCT -> DIAGNOSE -> REPAIR -> BOUNDARY_TEST -> COMPLETE
 * - Actions:
 *   respond, submit, repair, return, predict, commit-first, compare, diagnose,
 *   commit-boundary, return-source
 * - Declared screen states:
 *   "populated", "loading", "error", "pending review", "stale origin",
 *   "save blocked", "stale event", "assisted", "boundary locked"
 * - Dual-orientation tablet layout (Landscape split view & Portrait stacked flow)
 * - 48px minimum touch hitbox on all interactive elements
 * - Preserved session without destructive reset on reload/rotate
 *
 * No academic approval inferred from software validation.
 */

import { HIT_TARGET_MIN_PX } from '../styles/tokens.ts';
import {
  Core1BTransferJourney,
  TRANSFER_ORDERED_STAGES,
} from '../journeys/core1b.ts';
import type {
  TransferStage,
  HintItem,
  Core1BTransferDefinition,
  Core1BDraft,
} from '../journeys/core1b.ts';

export type DisplayOrientation = 'LANDSCAPE' | 'PORTRAIT';

export type TransferScreenState =
  | 'loading'
  | 'error'
  | 'populated'
  | 'pending review'
  | 'stale origin'
  | 'save blocked'
  | 'stale event'
  | 'assisted'
  | 'boundary locked';

export interface TransferPageConfig {
  readonly transferDefinition?: Core1BTransferDefinition;
  readonly orientation?: DisplayOrientation;
  readonly initialState?: TransferScreenState;
  readonly errorMessage?: string;
}

export interface TransferPageViewState {
  readonly screenState: TransferScreenState;
  readonly journeyId: string;
  readonly currentStage: TransferStage;
  readonly orientation: DisplayOrientation;
  readonly isAssisted: boolean;
  readonly isFirstAttemptCommitted: boolean;
  readonly isBoundaryCommitted: boolean;
  readonly exposedHints: readonly HintItem[];
  readonly originId: string;
  readonly minHitTargetPx: number;
}

export class Core1BTransferPageController {
  private journey: Core1BTransferJourney | null = null;
  private rawDefinition: Core1BTransferDefinition | null = null;
  private screenState: TransferScreenState = 'populated';
  private errorMessage: string | null = null;
  private orientation: DisplayOrientation = 'LANDSCAPE';

  constructor(config: TransferPageConfig) {
    this.orientation = config.orientation || 'LANDSCAPE';

    if (config.initialState) {
      this.screenState = config.initialState;
      this.errorMessage = config.errorMessage || null;
    }

    if (config.transferDefinition) {
      this.rawDefinition = config.transferDefinition;
      try {
        this.journey = new Core1BTransferJourney(config.transferDefinition);
        if (!config.initialState) {
          this.refreshScreenState();
        }
      } catch (err: any) {
        this.screenState = 'error';
        this.errorMessage = err.message || 'Initialization failed';
      }
    } else if (!config.initialState) {
      this.screenState = 'loading';
    }
  }

  private refreshScreenState(): void {
    if (!this.journey) {
      this.screenState = 'loading';
      return;
    }

    const def = this.journey.getDefinition();

    if (def.status === 'PENDING_REVIEW') {
      this.screenState = 'pending review';
      return;
    }

    if (def.status === 'STALE') {
      this.screenState = 'stale origin';
      return;
    }

    if (this.journey.isAssistedAttempt()) {
      this.screenState = 'assisted';
      return;
    }

    if (this.journey.getStage() === 'BOUNDARY_TEST' && !this.journey.isBoundaryCommitted()) {
      this.screenState = 'boundary locked';
      return;
    }

    this.screenState = 'populated';
  }

  // --- Actions ---

  /**
   * Action: 'predict'
   * Commit qualitative prediction option index.
   */
  actionPredict(optionIndex: number): void {
    if (!this.journey) throw new Error('Transfer journey not loaded');
    this.journey.predict(optionIndex);
    this.refreshScreenState();
  }

  /**
   * Action: 'respond'
   * Update text or numeric input for current task (Task A in ATTEMPT, Task B in BOUNDARY_TEST).
   */
  actionRespond(text: string, numericVal?: number): void {
    if (!this.journey) throw new Error('Transfer journey not loaded');
    const stage = this.journey.getStage();
    if (stage === 'ATTEMPT') {
      this.journey.updateTaskAAttempt(text, numericVal);
    } else if (stage === 'BOUNDARY_TEST') {
      this.journey.updateTaskBAttempt(text, numericVal);
    } else if (stage === 'REPAIR') {
      this.journey.setRepairExplanation(text);
    }
  }

  /**
   * Action: 'commit-first' / 'submit'
   * Locks the first attempt on Task A before any solutions or reference comparisons are revealed.
   */
  actionCommitFirst(): void {
    if (!this.journey) throw new Error('Transfer journey not loaded');
    this.journey.commitFirstAttempt();
    this.refreshScreenState();
  }

  /**
   * Action: 'compare'
   * Acknowledge comparison in RECONSTRUCT stage and advance to DIAGNOSE.
   */
  actionCompare(): void {
    if (!this.journey) throw new Error('Transfer journey not loaded');
    this.journey.completeReconstruction();
    this.refreshScreenState();
  }

  /**
   * Action: 'diagnose'
   * Select diagnostic mistake category and commit.
   */
  actionDiagnose(code: string): void {
    if (!this.journey) throw new Error('Transfer journey not loaded');
    this.journey.selectDiagnostic(code);
    this.journey.commitDiagnosis();
    this.refreshScreenState();
  }

  /**
   * Action: 'repair'
   * Commit learner repair reasoning.
   */
  actionRepair(explanation?: string): void {
    if (!this.journey) throw new Error('Transfer journey not loaded');
    if (explanation) {
      this.journey.setRepairExplanation(explanation);
    }
    this.journey.commitRepair();
    this.refreshScreenState();
  }

  /**
   * Action: 'commit-boundary'
   * Locks the boundary attempt on Task B and advances to COMPLETE.
   */
  actionCommitBoundary(): void {
    if (!this.journey) throw new Error('Transfer journey not loaded');
    this.journey.commitBoundaryAttempt();
    this.refreshScreenState();
  }

  /**
   * Action: 'return-source'
   * Safely return to the origin lesson with preserved session.
   */
  actionReturnSource(): string {
    if (!this.journey) throw new Error('Transfer journey not loaded');
    return this.journey.returnToSource();
  }

  /**
   * Action: 'return'
   * General return to dashboard or previous screen.
   */
  actionReturn(): string {
    if (this.journey) {
      return `/learn/${this.journey.getDefinition().originRef.id}`;
    }
    return '/home';
  }

  /**
   * Request hint (H1, H2, H3).
   */
  requestHint(): HintItem {
    if (!this.journey) throw new Error('Transfer journey not loaded');
    const hint = this.journey.requestHint();
    this.refreshScreenState();
    return hint;
  }

  // --- Display & Orientation ---

  setOrientation(orientation: DisplayOrientation): void {
    this.orientation = orientation;
  }

  getOrientation(): DisplayOrientation {
    return this.orientation;
  }

  // --- State Query & Draft Roundtrip ---

  getViewState(): TransferPageViewState {
    if (!this.journey) {
      return {
        screenState: this.screenState,
        journeyId: '',
        currentStage: 'PREDICT',
        orientation: this.orientation,
        isAssisted: false,
        isFirstAttemptCommitted: false,
        isBoundaryCommitted: false,
        exposedHints: [],
        originId: '',
        minHitTargetPx: HIT_TARGET_MIN_PX,
      };
    }

    const def = this.journey.getDefinition();

    return {
      screenState: this.screenState,
      journeyId: def.journeyId,
      currentStage: this.journey.getStage(),
      orientation: this.orientation,
      isAssisted: this.journey.isAssistedAttempt(),
      isFirstAttemptCommitted: this.journey.isFirstAttemptCommitted(),
      isBoundaryCommitted: this.journey.isBoundaryCommitted(),
      exposedHints: this.journey.getExposedHints(),
      originId: def.originRef.id,
      minHitTargetPx: HIT_TARGET_MIN_PX,
    };
  }

  toDraft(): Core1BDraft | null {
    return this.journey ? this.journey.toDraft() : null;
  }

  restoreDraft(draft: Core1BDraft): void {
    if (this.journey) {
      this.journey.restoreDraft(draft);
      this.refreshScreenState();
    }
  }

  // --- HTML Rendering ---

  render(): string {
    const state = this.getViewState();

    return `
<div class="g9-transfer-page ${this.orientation.toLowerCase()}" data-screen-state="${state.screenState}" data-stage="${state.currentStage}" style="min-width: 100%; box-sizing: border-box; overflow-x: hidden; font-family: system-ui, sans-serif; background: #f8fafc; min-height: 100vh; display: flex; flex-direction: column;">
  <!-- Styling & Hit Targets -->
  <style>
    .g9-btn, .g9-stage-pill, .g9-action-btn {
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
    .g9-stage-rail {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      background: #ffffff;
      padding: 12px 20px;
      border-bottom: 1px solid #e2e8f0;
    }
    .g9-stage-pill[aria-current="step"] {
      background: #2563eb;
      color: #ffffff;
      border: 1px solid #1d4ed8;
    }
    .g9-transfer-workspace {
      flex: 1;
      padding: 20px;
      display: flex;
      flex-direction: ${this.orientation === 'LANDSCAPE' ? 'row' : 'column'};
      gap: 20px;
    }
    .g9-transfer-main-pane {
      flex: 3;
      background: #ffffff;
      padding: 24px;
      border-radius: 12px;
      border: 1px solid #e2e8f0;
      box-shadow: 0 1px 3px rgba(0,0,0,0.05);
    }
    .g9-transfer-side-pane {
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
      margin: 16px 20px 0 20px;
      font-size: 14px;
    }
    .g9-banner-warning { background: #fffbeb; color: #92400e; border: 1px solid #fde68a; }
    .g9-banner-error { background: #fef2f2; color: #991b1b; border: 1px solid #fecaca; }
    .g9-banner-info { background: #eff6ff; color: #1e40af; border: 1px solid #bfdbfe; }
    .g9-banner-assisted { background: #fef3c7; color: #78350f; border: 1px solid #fcd34d; }
  </style>

  <!-- Top App Shell -->
  <header style="background: #ffffff; border-bottom: 1px solid #e2e8f0; padding: 14px 24px; display: flex; justify-content: space-between; align-items: center;">
    <div>
      <span style="font-size: 12px; font-weight: 700; color: #64748b; text-transform: uppercase;">Fresh Transfer Challenge &bull; Core1B</span>
      <h1 style="font-size: 20px; font-weight: 800; margin: 4px 0 0 0; color: #0f172a;">${this.journey ? this.journey.getDefinition().freshTaskA.title : 'Transfer Challenge'}</h1>
    </div>
    <div style="display: flex; gap: 10px; align-items: center;">
      <button class="g9-btn g9-action-btn" data-action="return" aria-label="Return to Topic" style="background: #f1f5f9; color: #334155; border: 1px solid #cbd5e1;">
        &larr; Return
      </button>
      ${state.currentStage === 'COMPLETE' ? `
        <button class="g9-btn g9-action-btn" data-action="return-source" aria-label="Return to Origin Lesson" style="background: #10b981; color: #ffffff; border: 0;">
          Return to Source &check;
        </button>` : ''}
    </div>
  </header>

  <!-- Screen State Banners -->
  ${this.renderStatusBanners(state)}

  <!-- Six-Stage Navigation Rail -->
  <nav class="g9-stage-rail" aria-label="Six Cognitive Stages">
    ${TRANSFER_ORDERED_STAGES.filter((s) => s !== 'COMPLETE').map((st, idx) => {
      const isCurrent = st === state.currentStage;
      return `
      <div
        class="g9-stage-pill"
        aria-current="${isCurrent ? 'step' : 'false'}"
        aria-label="Stage ${idx + 1}: ${st}"
        style="padding: 8px 14px; font-size: 13px; font-weight: 700; border-radius: 6px; border: 1px solid ${isCurrent ? '#2563eb' : '#e2e8f0'}; background: ${isCurrent ? '#2563eb' : '#ffffff'}; color: ${isCurrent ? '#ffffff' : '#64748b'};"
      >
        ${idx + 1}. ${st}
      </div>`;
    }).join('')}
  </nav>

  <!-- Main Body Content Workspace -->
  <main class="g9-transfer-workspace">
    <div class="g9-transfer-main-pane">
      ${this.renderStageContent(state)}
    </div>

    <!-- Ancillary Side Pane: Hint Panel & Diagnostic Ledger -->
    <aside class="g9-transfer-side-pane">
      <section aria-labelledby="hints-heading">
        <h3 id="hints-heading" style="font-size: 16px; font-weight: 700; color: #0f172a; margin-top: 0;">Ordered Hints (H1 &ndash; H3)</h3>
        ${this.renderHintsPanel(state)}
      </section>

      <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 24px 0;" />

      <section aria-labelledby="taskb-heading">
        <h3 id="taskb-heading" style="font-size: 16px; font-weight: 700; color: #0f172a;">Task B &bull; Boundary Condition</h3>
        ${this.renderTaskBSummary(state)}
      </section>
    </aside>
  </main>

  <!-- Mandatory Footer & Rule 13 Invariant -->
  <footer style="background: #ffffff; border-top: 1px solid #e2e8f0; padding: 14px 24px; font-size: 13px; color: #64748b; text-align: center;">
    <div>Core1B Cognitive Transfer Pipeline &bull; BP-TRANSFER-CORE1B@1.0.0</div>
    <div style="font-weight: 600; color: #94a3b8; margin-top: 4px;">No academic approval inferred from software validation.</div>
  </footer>
</div>`;
  }

  private renderStatusBanners(state: TransferPageViewState): string {
    if (state.screenState === 'loading') {
      return `<div class="g9-banner g9-banner-info" role="status">Loading fresh transfer challenge...</div>`;
    }
    if (state.screenState === 'error') {
      return `<div class="g9-banner g9-banner-error" role="alert">Error: ${this.errorMessage || 'Failed to load transfer challenge.'}</div>`;
    }
    if (state.screenState === 'pending review') {
      return `<div class="g9-banner g9-banner-warning" role="alert">Challenge Pending Review: This fresh task candidate has not completed formal academic review.</div>`;
    }
    if (state.screenState === 'stale origin') {
      return `<div class="g9-banner g9-banner-warning" role="alert">Stale Origin Question: The underlying origin source has been updated. Fresh transfer requires re-qualification.</div>`;
    }
    if (state.screenState === 'save blocked') {
      return `<div class="g9-banner g9-banner-error" role="alert">Save Blocked: Exposure save transaction failed. Learner progress halted to avoid unrecorded attempts.</div>`;
    }
    if (state.screenState === 'stale event') {
      return `<div class="g9-banner g9-banner-error" role="alert">Replay Desynchronization: Event timestamp discontinuity detected.</div>`;
    }
    if (state.screenState === 'assisted') {
      return `<div class="g9-banner g9-banner-assisted" role="status">Assisted Attempt Mode: Hint revealed. Outcome scored as assisted transfer.</div>`;
    }
    if (state.screenState === 'boundary locked') {
      return `<div class="g9-banner g9-banner-info" role="status">Boundary Evaluation Locked: Commit your boundary solution to unlock canonical reasoning.</div>`;
    }
    return '';
  }

  private renderStageContent(state: TransferPageViewState): string {
    if (!this.journey) return `<p>Transfer unavailable.</p>`;

    const def = this.journey.getDefinition();

    switch (state.currentStage) {
      case 'PREDICT':
        return `
<div class="g9-stage-view" data-stage="PREDICT">
  <h2 style="font-size: 18px; font-weight: 700; color: #1e293b; margin-top: 0;">Stage 1: Qualitative Prediction</h2>
  <p style="font-size: 15px; color: #334155; margin-bottom: 16px;">${def.qualitativePredictionPrompt}</p>

  <div style="display: flex; flex-direction: column; gap: 10px; margin-bottom: 20px;">
    ${def.predictionOptions.map((opt, idx) => `
      <label style="display: flex; align-items: center; gap: 12px; min-height: ${HIT_TARGET_MIN_PX}px; padding: 10px 14px; background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 8px; cursor: pointer;">
        <input type="radio" name="transfer-prediction" value="${idx}" data-action="predict" style="width: 20px; height: 20px;" />
        <span style="font-size: 15px; font-weight: 500; color: #1e293b;">${opt}</span>
      </label>
    `).join('')}
  </div>

  <button
    class="g9-btn g9-action-btn"
    data-action="predict"
    aria-label="Commit Prediction and Advance to Attempt"
    style="background: #2563eb; color: #ffffff; border: 0;"
  >
    Commit Prediction &rarr;
  </button>
</div>`;

      case 'ATTEMPT':
        return `
<div class="g9-stage-view" data-stage="ATTEMPT">
  <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 2px solid #f1f5f9; padding-bottom: 8px; margin-bottom: 16px;">
    <h2 style="font-size: 18px; font-weight: 700; color: #1e293b; margin: 0;">Stage 2: Unassisted Attempt &bull; Task A</h2>
    <span style="font-size: 12px; font-weight: 600; color: #64748b;">Ref: ${def.freshTaskA.taskRef.id}</span>
  </div>

  <p style="font-size: 15px; line-height: 1.6; color: #1e293b; margin-bottom: 16px;">
    ${def.freshTaskA.prompt}
  </p>

  <div style="margin-bottom: 16px;">
    <label for="task-a-input" style="display: block; font-size: 14px; font-weight: 600; color: #334155; margin-bottom: 6px;">Your Working / Derivation:</label>
    <textarea
      id="task-a-input"
      rows="4"
      aria-label="Task A Derivation Working"
      data-action="respond"
      placeholder="Formulate your derivation steps before submitting..."
      style="width: 100%; box-sizing: border-box; padding: 12px; font-size: 14px; border: 1px solid #cbd5e1; border-radius: 6px; font-family: monospace;"
    ></textarea>
  </div>

  <div style="display: flex; gap: 12px; align-items: center;">
    <button
      class="g9-btn g9-action-btn"
      data-action="commit-first"
      aria-label="Commit First Attempt (Locks Initial Response)"
      style="background: #2563eb; color: #ffffff; border: 0;"
    >
      Commit First Attempt &check;
    </button>
  </div>
</div>`;

      case 'RECONSTRUCT':
        return `
<div class="g9-stage-view" data-stage="RECONSTRUCT">
  <h2 style="font-size: 18px; font-weight: 700; color: #1e293b; margin-top: 0;">Stage 3: Reconstruction &bull; Reference Comparison</h2>
  <p style="font-size: 14px; color: #475569; margin-bottom: 16px;">Compare your committed solution against the canonical step-by-step derivation:</p>

  <div class="g9-canonical-solution" style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 16px; margin-bottom: 20px;">
    <h3 style="font-size: 14px; font-weight: 700; color: #15803d; margin: 0 0 8px 0;">Canonical Solution Path:</h3>
    <ol style="margin: 0; padding-left: 20px; font-size: 14px; line-height: 1.6; color: #14532d;">
      ${def.freshTaskA.solutionSteps.map((st) => `<li>${st}</li>`).join('')}
    </ol>
  </div>

  <button
    class="g9-btn g9-action-btn"
    data-action="compare"
    aria-label="Acknowledge Comparison and Proceed to Diagnosis"
    style="background: #2563eb; color: #ffffff; border: 0;"
  >
    Proceed to Error Diagnosis &rarr;
  </button>
</div>`;

      case 'DIAGNOSE':
        return `
<div class="g9-stage-view" data-stage="DIAGNOSE">
  <h2 style="font-size: 18px; font-weight: 700; color: #1e293b; margin-top: 0;">Stage 4: Misconception Diagnosis</h2>
  <p style="font-size: 14px; color: #475569; margin-bottom: 16px;">Classify any discrepancies between your reasoning and the canonical solution:</p>

  <div style="display: flex; flex-direction: column; gap: 10px; margin-bottom: 20px;">
    ${def.diagnosticRules.map((rule) => `
      <label style="display: flex; align-items: flex-start; gap: 10px; min-height: ${HIT_TARGET_MIN_PX}px; padding: 12px; background: #fff5f5; border: 1px solid #fecaca; border-radius: 8px; cursor: pointer;">
        <input type="radio" name="diagnostic-code" value="${rule.code}" data-action="diagnose" style="width: 20px; height: 20px; margin-top: 2px;" />
        <div>
          <div style="font-size: 14px; font-weight: 700; color: #991b1b;">${rule.label} (<code>${rule.code}</code>)</div>
          <div style="font-size: 13px; color: #7f1d1d; margin-top: 2px;">${rule.misconceptionDescription}</div>
        </div>
      </label>
    `).join('')}
  </div>

  <button
    class="g9-btn g9-action-btn"
    data-action="diagnose"
    aria-label="Commit Diagnosis"
    style="background: #b91c1c; color: #ffffff; border: 0;"
  >
    Commit Diagnosis &rarr;
  </button>
</div>`;

      case 'REPAIR':
        return `
<div class="g9-stage-view" data-stage="REPAIR">
  <h2 style="font-size: 18px; font-weight: 700; color: #1e293b; margin-top: 0;">Stage 5: Conceptual Repair Formulation</h2>
  <p style="font-size: 14px; color: #475569; margin-bottom: 16px;">Articulate how you correct the identified misconception:</p>

  <textarea
    id="repair-input"
    rows="4"
    aria-label="Repair Explanation"
    data-action="repair"
    placeholder="Explain why the initial premise failed and how the valid physical invariant applies..."
    style="width: 100%; box-sizing: border-box; padding: 12px; font-size: 14px; border: 1px solid #cbd5e1; border-radius: 6px; margin-bottom: 16px;"
  ></textarea>

  <button
    class="g9-btn g9-action-btn"
    data-action="repair"
    aria-label="Commit Repair and Advance to Boundary Test"
    style="background: #15803d; color: #ffffff; border: 0;"
  >
    Commit Repair &rarr;
  </button>
</div>`;

      case 'BOUNDARY_TEST':
        return `
<div class="g9-stage-view" data-stage="BOUNDARY_TEST">
  <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 2px solid #f1f5f9; padding-bottom: 8px; margin-bottom: 16px;">
    <h2 style="font-size: 18px; font-weight: 700; color: #1e293b; margin: 0;">Stage 6: Boundary Condition Transfer &bull; Task B</h2>
    <span style="font-size: 12px; font-weight: 600; color: #64748b;">Ref: ${def.boundaryTaskB.taskRef.id}</span>
  </div>

  <p style="font-size: 15px; line-height: 1.6; color: #1e293b; margin-bottom: 16px;">
    ${def.boundaryTaskB.prompt}
  </p>

  <div style="margin-bottom: 16px;">
    <label for="task-b-input" style="display: block; font-size: 14px; font-weight: 600; color: #334155; margin-bottom: 6px;">Your Boundary Derivation:</label>
    <textarea
      id="task-b-input"
      rows="4"
      aria-label="Task B Working"
      data-action="respond"
      placeholder="Solve the changed-condition boundary challenge..."
      style="width: 100%; box-sizing: border-box; padding: 12px; font-size: 14px; border: 1px solid #cbd5e1; border-radius: 6px; font-family: monospace;"
    ></textarea>
  </div>

  <button
    class="g9-btn g9-action-btn"
    data-action="commit-boundary"
    aria-label="Commit Boundary Attempt"
    style="background: #2563eb; color: #ffffff; border: 0;"
  >
    Commit Boundary Attempt &check;
  </button>
</div>`;

      case 'COMPLETE':
        return `
<div class="g9-stage-view" data-stage="COMPLETE" style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 24px; text-align: center;">
  <span style="font-size: 36px; color: #16a34a;">&#10003;</span>
  <h2 style="font-size: 20px; font-weight: 800; color: #14532d; margin: 8px 0;">Transfer Sequence Complete</h2>
  <p style="font-size: 15px; color: #166534; max-width: 500px; margin: 0 auto 20px auto;">
    You have completed all six stages of the fresh transfer pipeline. Both Task A and Task B boundary attempts have been committed to session custody.
  </p>
  <button
    class="g9-btn g9-action-btn"
    data-action="return-source"
    aria-label="Return to Origin Lesson"
    style="background: #15803d; color: #ffffff; border: 0; padding: 12px 24px; font-size: 16px;"
  >
    Return to Source Lesson &rarr;
  </button>
</div>`;
    }
  }

  private renderHintsPanel(state: TransferPageViewState): string {
    if (!this.journey) return `<p>Hints unavailable.</p>`;

    const hints = this.journey.getDefinition().hints;
    const canRequestHint = state.currentStage === 'ATTEMPT' && state.exposedHints.length < hints.length;

    return `
<div class="g9-hints-panel">
  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
    <span style="font-size: 13px; color: #64748b;">Revealed: ${state.exposedHints.length} of ${hints.length}</span>
    <button
      class="g9-btn g9-action-btn"
      data-action="request-hint"
      aria-label="Request Next Scaffolding Hint"
      style="min-height: ${HIT_TARGET_MIN_PX}px; padding: 6px 12px; font-size: 13px; background: #f59e0b; color: #ffffff; border: 0; border-radius: 6px; cursor: pointer;"
      ${!canRequestHint ? 'disabled style="opacity: 0.5;"' : ''}
    >
      Request Hint
    </button>
  </div>

  ${state.exposedHints.length === 0 ? `
    <div style="font-size: 13px; color: #94a3b8; font-style: italic;">No hints exposed. First attempt unassisted.</div>` : ''}

  ${state.exposedHints.map((h) => `
    <div class="g9-hint-item" style="background: #fffbeb; border: 1px solid #fde68a; border-radius: 6px; padding: 10px; margin-bottom: 8px;">
      <div style="font-size: 12px; font-weight: 700; color: #b45309;">${h.level} &bull; Scaffold</div>
      <div style="font-size: 13px; color: #78350f; margin-top: 2px;">${h.text}</div>
    </div>
  `).join('')}
</div>`;
  }

  private renderTaskBSummary(state: TransferPageViewState): string {
    if (!this.journey) return `<p>Task B unavailable.</p>`;
    const taskB = this.journey.getDefinition().boundaryTaskB;
    const isUnlocked = state.currentStage === 'BOUNDARY_TEST' || state.currentStage === 'COMPLETE';

    return `
<div class="g9-taskb-summary" style="background: ${isUnlocked ? '#ffffff' : '#f8fafc'}; border: 1px solid #e2e8f0; border-radius: 6px; padding: 12px; font-size: 13px;">
  <div style="font-weight: 700; color: #1e293b;">${taskB.title}</div>
  <div style="color: #64748b; margin-top: 4px;">${isUnlocked ? taskB.prompt : 'Task B is locked until Stage 6 (Boundary Test).'}</div>
</div>`;
  }
}
