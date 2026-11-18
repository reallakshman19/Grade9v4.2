/**
 * web/pages/lesson.ts
 * A31 — Core1A Lesson interactive page controller and dual-orientation tablet view.
 *
 * Implements:
 * - Full A1–A9 native-mapped instructional units
 * - Three progressive anchors (FOUNDATION, CONNECTED, ADVANCED)
 * - Scientific model prediction and observation integration
 * - Gated fresh task route (route only if eligible)
 * - Declared screen states:
 *   "populated", "loading", "error", "no fresh task", "stale lesson",
 *   "missing unit", "invalid model domain", "no eligible fresh task"
 * - Dual-orientation tablet layout (Landscape split-pane & Portrait stacked view)
 * - 48px minimum touch hitbox on all interactive elements
 * - Rule 13 invariant preservation
 *
 * No academic approval inferred from software validation.
 */

import { HIT_TARGET_MIN_PX } from '../styles/tokens.ts';
import {
  Core1ATeachingJourney,
  CORE1A_ORDERED_ROLES,
  ANCHOR_LEVELS,
} from '../journeys/core1a.ts';
import type {
  Core1ARole,
  IntrinsicDepthBadge,
  AnchorLevel,
  Core1ALessonDefinition,
  Core1ADraft,
} from '../journeys/core1a.ts';

export type DisplayOrientation = 'LANDSCAPE' | 'PORTRAIT';

export type LessonScreenState =
  | 'loading'
  | 'error'
  | 'populated'
  | 'no fresh task'
  | 'stale lesson'
  | 'missing unit'
  | 'invalid model domain'
  | 'no eligible fresh task';

export interface LessonPageConfig {
  readonly lessonDefinition?: Core1ALessonDefinition;
  readonly orientation?: DisplayOrientation;
  readonly initialState?: LessonScreenState;
  readonly errorMessage?: string;
}

export interface LessonPageViewState {
  readonly screenState: LessonScreenState;
  readonly lessonId: string;
  readonly title: string;
  readonly subject: string;
  readonly topicId: string;
  readonly activeUnitRole: Core1ARole;
  readonly activeUnitTitle: string;
  readonly orientation: DisplayOrientation;
  readonly completedRoles: readonly Core1ARole[];
  readonly currentDepth: IntrinsicDepthBadge;
  readonly modelObserved: boolean;
  readonly modelPredicted: boolean;
  readonly modelFitValid: boolean;
  readonly canRouteFresh: boolean;
  readonly freshRouteRejectionReason: string | null;
  readonly minHitTargetPx: number;
}

export class Core1ALessonPageController {
  private journey: Core1ATeachingJourney | null = null;
  private rawDefinition: Core1ALessonDefinition | null = null;
  private screenState: LessonScreenState = 'populated';
  private errorMessage: string | null = null;
  private orientation: DisplayOrientation = 'LANDSCAPE';
  private activeAnchorTab: AnchorLevel = 'FOUNDATION';
  private modelFitStatusMessage: string = '';

  constructor(config: LessonPageConfig) {
    this.orientation = config.orientation || 'LANDSCAPE';

    if (config.initialState) {
      this.screenState = config.initialState;
      this.errorMessage = config.errorMessage || null;
    }

    if (config.lessonDefinition) {
      this.rawDefinition = config.lessonDefinition;
      try {
        this.journey = new Core1ATeachingJourney(config.lessonDefinition);
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

  // --- Screen State Maintenance ---

  private refreshScreenState(): void {
    if (!this.journey) {
      this.screenState = 'loading';
      return;
    }

    const lesson = this.journey.getLesson();

    if (lesson.status === 'STALE') {
      this.screenState = 'stale lesson';
      return;
    }

    if (lesson.units.length < 9) {
      this.screenState = 'missing unit';
      return;
    }

    if (!lesson.freshTaskRef) {
      this.screenState = 'no fresh task';
      return;
    }

    const fit = this.journey.checkModelFit();
    if (!fit.valid) {
      this.screenState = 'invalid model domain';
      return;
    }

    if (!this.journey.canRouteToFreshTransfer()) {
      const reason = this.journey.getFreshRouteRejectionReason();
      if (reason === 'no eligible fresh task') {
        // Populated screen, but fresh route disabled
        this.screenState = 'populated';
        return;
      }
    }

    this.screenState = 'populated';
  }

  // --- Actions ---

  /**
   * Action: 'section'
   * Navigate or jump to a specific A1..A9 unit.
   */
  actionSection(role: Core1ARole): void {
    if (!this.journey) {
      throw new Error('Lesson journey not loaded');
    }
    this.journey.selectSection(role);
    this.refreshScreenState();
  }

  /**
   * Action: 'example'
   * Toggle completed worked example full reasoning disclosure.
   */
  actionExample(role?: Core1ARole): boolean {
    if (!this.journey) {
      throw new Error('Lesson journey not loaded');
    }
    const targetRole = role || this.journey.getActiveRole();
    return this.journey.toggleWorkedExample(targetRole);
  }

  /**
   * Action: 'fresh task'
   * Request transfer route to fresh task journey. Returns target URL or throws/sets state.
   */
  actionFreshTask(): { readonly allowed: boolean; readonly route?: string; readonly reason?: string } {
    if (!this.journey) {
      return { allowed: false, reason: 'Lesson journey not loaded' };
    }

    if (!this.journey.canRouteToFreshTransfer()) {
      const reason = this.journey.getFreshRouteRejectionReason() || 'Ineligible';
      if (reason === 'no eligible fresh task') {
        this.screenState = 'no eligible fresh task';
      } else if (reason === 'stale lesson') {
        this.screenState = 'stale lesson';
      } else if (reason === 'no fresh task') {
        this.screenState = 'no fresh task';
      } else if (reason === 'missing unit') {
        this.screenState = 'missing unit';
      }
      return { allowed: false, reason };
    }

    return {
      allowed: true,
      route: this.journey.getFreshTransferRoute(),
    };
  }

  /**
   * Action: 'return'
   * Return to parent topic or home navigation.
   */
  actionReturn(): string {
    if (this.journey) {
      return `/topic/${this.journey.getLesson().topicId}`;
    }
    return '/home';
  }

  /**
   * Action: 'predict-model'
   * Submit learner prediction for interactive model before observing.
   */
  actionPredictModel(optionIndex: number): void {
    if (!this.journey) {
      throw new Error('Lesson journey not loaded');
    }
    this.journey.predictModel(optionIndex);
  }

  /**
   * Action: 'observe-model'
   * Observe interactive simulation model.
   */
  actionObserveModel(): void {
    if (!this.journey) {
      throw new Error('Lesson journey not loaded');
    }
    this.journey.observeModel();
    this.refreshScreenState();
  }

  /**
   * Action: 'depth'
   * Toggle/cycle intrinsic depth view (EASY -> MEDIUM -> HARD -> EASY).
   */
  actionDepth(explicitBadge?: IntrinsicDepthBadge): IntrinsicDepthBadge {
    if (!this.journey) {
      throw new Error('Lesson journey not loaded');
    }
    if (explicitBadge) {
      this.journey.setDepthView(explicitBadge);
      return explicitBadge;
    }
    const current = this.journey.getCurrentDepthView();
    const next: IntrinsicDepthBadge =
      current === 'EASY' ? 'MEDIUM' : current === 'MEDIUM' ? 'HARD' : 'EASY';
    this.journey.setDepthView(next);
    return next;
  }

  /**
   * Action: 'model-fit'
   * Validate model parameters against physical invariant bounds.
   */
  actionModelFit(): { readonly valid: boolean; readonly feedback: string } {
    if (!this.journey) {
      throw new Error('Lesson journey not loaded');
    }
    const fit = this.journey.checkModelFit();
    this.modelFitStatusMessage = fit.feedback;
    if (!fit.valid) {
      this.screenState = 'invalid model domain';
    } else if (this.screenState === 'invalid model domain') {
      this.screenState = 'populated';
    }
    return fit;
  }

  // --- Parameter Updates ---

  updateModelParameter(name: string, value: number): void {
    if (!this.journey) return;
    try {
      this.journey.updateModelParameter(name, value);
      const fit = this.journey.checkModelFit();
      if (!fit.valid) {
        this.screenState = 'invalid model domain';
      } else if (this.screenState === 'invalid model domain') {
        this.refreshScreenState();
      }
    } catch (_err) {
      this.screenState = 'invalid model domain';
    }
  }

  // --- Anchors ---

  selectAnchorTab(level: AnchorLevel): void {
    this.activeAnchorTab = level;
  }

  toggleAnchorSolution(level?: AnchorLevel): boolean {
    if (!this.journey) return false;
    const target = level || this.activeAnchorTab;
    return this.journey.toggleAnchorSolution(target);
  }

  // --- Display & Orientation ---

  setOrientation(orientation: DisplayOrientation): void {
    this.orientation = orientation;
  }

  getOrientation(): DisplayOrientation {
    return this.orientation;
  }

  // --- State Query & Persistence ---

  getViewState(): LessonPageViewState {
    if (!this.journey) {
      return {
        screenState: this.screenState,
        lessonId: '',
        title: 'Loading Lesson...',
        subject: '',
        topicId: '',
        activeUnitRole: 'A1',
        activeUnitTitle: '',
        orientation: this.orientation,
        completedRoles: [],
        currentDepth: 'MEDIUM',
        modelObserved: false,
        modelPredicted: false,
        modelFitValid: false,
        canRouteFresh: false,
        freshRouteRejectionReason: 'Lesson not loaded',
        minHitTargetPx: HIT_TARGET_MIN_PX,
      };
    }

    const lesson = this.journey.getLesson();
    const activeUnit = this.journey.getActiveUnit();
    const modelFit = this.journey.checkModelFit();

    return {
      screenState: this.screenState,
      lessonId: lesson.lessonRef.id,
      title: lesson.title,
      subject: lesson.subject,
      topicId: lesson.topicId,
      activeUnitRole: activeUnit.role,
      activeUnitTitle: activeUnit.title,
      orientation: this.orientation,
      completedRoles: this.journey.getCompletedRoles(),
      currentDepth: this.journey.getCurrentDepthView(),
      modelObserved: this.journey.isModelObserved(),
      modelPredicted: this.journey.getModelPrediction().index !== null,
      modelFitValid: modelFit.valid,
      canRouteFresh: this.journey.canRouteToFreshTransfer(),
      freshRouteRejectionReason: this.journey.getFreshRouteRejectionReason(),
      minHitTargetPx: HIT_TARGET_MIN_PX,
    };
  }

  toDraft(): Core1ADraft | null {
    return this.journey ? this.journey.toDraft() : null;
  }

  restoreDraft(draft: Core1ADraft): void {
    if (this.journey) {
      this.journey.restoreDraft(draft);
      this.refreshScreenState();
    }
  }

  // --- HTML Rendering ---

  render(): string {
    const state = this.getViewState();

    return `
<div class="g9-lesson-page ${this.orientation.toLowerCase()}" data-screen-state="${state.screenState}" style="min-width: 100%; box-sizing: border-box; overflow-x: hidden;">
  <!-- Accessibility & Tablet Layout Styles -->
  <style>
    .g9-lesson-page {
      font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      font-size: 16px;
      line-height: 1.5;
      color: #111827;
      background: #f9fafb;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }
    .g9-btn, .g9-tab-btn, .g9-action-btn {
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
    .g9-unit-nav-rail {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      background: #ffffff;
      padding: 12px;
      border-bottom: 1px solid #e5e7eb;
    }
    .g9-unit-nav-rail button[aria-selected="true"] {
      background: #2563eb;
      color: #ffffff;
      border: 1px solid #1d4ed8;
    }
    .g9-lesson-content-container {
      flex: 1;
      padding: 16px;
      display: flex;
      flex-direction: ${this.orientation === 'LANDSCAPE' ? 'row' : 'column'};
      gap: 20px;
    }
    .g9-lesson-main-pane {
      flex: 3;
      background: #ffffff;
      padding: 24px;
      border-radius: 12px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.05);
      border: 1px solid #e5e7eb;
    }
    .g9-lesson-side-pane {
      flex: 2;
      background: #ffffff;
      padding: 20px;
      border-radius: 12px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.05);
      border: 1px solid #e5e7eb;
    }
    .g9-banner {
      padding: 12px 16px;
      border-radius: 8px;
      margin-bottom: 16px;
      font-size: 14px;
    }
    .g9-banner-warning { background: #fffbeb; color: #92400e; border: 1px solid #fde68a; }
    .g9-banner-error { background: #fef2f2; color: #991b1b; border: 1px solid #fecaca; }
    .g9-banner-info { background: #eff6ff; color: #1e40af; border: 1px solid #bfdbfe; }
    .g9-derivation-box, .g9-misconception-box, .g9-worked-example-box {
      background: #f8fafc;
      border-left: 4px solid #3b82f6;
      padding: 16px;
      margin: 16px 0;
      border-radius: 4px;
    }
    .g9-misconception-box { border-left-color: #ef4444; background: #fff5f5; }
    .g9-worked-example-box { border-left-color: #10b981; background: #f0fdf4; }
  </style>

  <!-- Top App Shell & Navigation Header -->
  <header class="g9-lesson-header" style="background: #ffffff; border-bottom: 1px solid #e5e7eb; padding: 12px 20px; display: flex; justify-content: space-between; align-items: center;">
    <div>
      <span class="g9-subject-badge" style="font-size: 12px; font-weight: 700; color: #6b7280; text-transform: uppercase;">${state.subject || 'PHYSICS'} &bull; ${state.topicId || 'WPE'}</span>
      <h1 style="font-size: 22px; font-weight: 700; margin: 4px 0 0 0;">${state.title}</h1>
    </div>
    <div style="display: flex; gap: 12px; align-items: center;">
      <button class="g9-btn g9-action-btn" data-action="return" aria-label="Return to Topic" onclick="window.history.back()">
        &larr; Return
      </button>
      <button class="g9-btn g9-action-btn" data-action="depth" aria-label="Depth Badge: ${state.currentDepth}">
        Depth: ${state.currentDepth}
      </button>
      <button class="g9-btn g9-action-btn" data-action="fresh task" aria-label="Fresh Task Transfer" ${!state.canRouteFresh ? 'aria-disabled="true" style="opacity: 0.6;"' : ''}>
        Fresh Transfer &rarr;
      </button>
    </div>
  </header>

  <!-- Status / Alert Banners -->
  ${this.renderStatusBanners(state)}

  <!-- A1–A9 Progression Rail -->
  <nav class="g9-unit-nav-rail" aria-label="Core1A Instructional Units">
    ${CORE1A_ORDERED_ROLES.map((role) => {
      const isSelected = role === state.activeUnitRole;
      const isCompleted = state.completedRoles.includes(role);
      return `
      <button
        class="g9-tab-btn"
        role="tab"
        data-action="section"
        data-role="${role}"
        aria-selected="${isSelected ? 'true' : 'false'}"
        aria-label="Unit ${role}: ${isCompleted ? 'Completed' : 'Pending'}"
      >
        ${role} ${isCompleted ? '&#10003;' : ''}
      </button>`;
    }).join('')}
  </nav>

  <!-- Main Instructional Workspace -->
  <main class="g9-lesson-content-container">
    <div class="g9-lesson-main-pane">
      ${this.renderActiveUnitContent(state)}
    </div>

    <!-- Second View / Ancillary Pane: Scientific Model & Progressive Anchors -->
    <aside class="g9-lesson-side-pane">
      <section aria-labelledby="scientific-model-heading">
        <h2 id="scientific-model-heading" style="font-size: 18px; font-weight: 700; margin-top: 0;">Interactive Model</h2>
        ${this.renderModelWorkspace(state)}
      </section>

      <hr style="border: 0; border-top: 1px solid #e5e7eb; margin: 24px 0;" />

      <section aria-labelledby="anchors-heading">
        <h2 id="anchors-heading" style="font-size: 18px; font-weight: 700;">Progressive Anchors</h2>
        ${this.renderAnchorsDrawer()}
      </section>
    </aside>
  </main>

  <!-- Mandatory Footer & Rule 13 Invariant -->
  <footer style="background: #ffffff; border-top: 1px solid #e5e7eb; padding: 14px 20px; font-size: 13px; color: #6b7280; text-align: center;">
    <div>Core1A Declarative Instructional Delivery &bull; BP-TEACHING-CORE1A@1.0.0</div>
    <div style="font-weight: 600; color: #9ca3af; margin-top: 4px;">No academic approval inferred from software validation.</div>
  </footer>
</div>`;
  }

  private renderStatusBanners(state: LessonPageViewState): string {
    if (state.screenState === 'loading') {
      return `<div class="g9-banner g9-banner-info" role="status">Loading lesson components and assets...</div>`;
    }
    if (state.screenState === 'error') {
      return `<div class="g9-banner g9-banner-error" role="alert">Error: ${this.errorMessage || 'Unable to load lesson.'}</div>`;
    }
    if (state.screenState === 'stale lesson') {
      return `<div class="g9-banner g9-banner-warning" role="alert">Warning: This lesson is marked STALE and requires pedagogical re-qualification. Fresh task routing is disabled.</div>`;
    }
    if (state.screenState === 'missing unit') {
      return `<div class="g9-banner g9-banner-error" role="alert">Incomplete lesson: One or more required A1..A9 teaching units are missing.</div>`;
    }
    if (state.screenState === 'no fresh task') {
      return `<div class="g9-banner g9-banner-warning" role="alert">No fresh transfer task linked to this lesson. Fresh route is currently unavailable.</div>`;
    }
    if (state.screenState === 'invalid model domain') {
      return `<div class="g9-banner g9-banner-error" role="alert">Simulation Domain Error: Model parameter out of physical bounds. Adjust slider to continue.</div>`;
    }
    if (state.screenState === 'no eligible fresh task') {
      return `<div class="g9-banner g9-banner-info" role="status">Fresh transfer locked: Complete units A1 through A9 before attempting fresh transfer.</div>`;
    }
    return '';
  }

  private renderActiveUnitContent(state: LessonPageViewState): string {
    if (!this.journey) {
      return `<p>No unit content available.</p>`;
    }

    const unit = this.journey.getActiveUnit();
    const isWorkedExampleOpen = this.journey.isWorkedExampleRevealed(unit.role);

    return `
<article class="g9-unit-article">
  <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 2px solid #f3f4f6; padding-bottom: 8px;">
    <h2 style="font-size: 20px; font-weight: 700; margin: 0;">Unit ${unit.role}: ${unit.title}</h2>
    <span style="font-size: 13px; font-weight: 600; color: #4b5563;">Unit Role: ${unit.role}</span>
  </div>

  <p style="font-size: 16px; font-weight: 500; color: #374151; margin-top: 14px;">${unit.summary}</p>
  <div style="font-size: 15px; color: #1f2937; line-height: 1.6;">${unit.bodyText}</div>

  <!-- Prerequisite Conventions (A2) -->
  ${unit.conventions && unit.conventions.length > 0 ? `
    <div class="g9-conventions-box" style="margin-top: 16px; background: #f8fafc; padding: 14px; border-radius: 8px; border: 1px solid #e2e8f0;">
      <h3 style="font-size: 15px; font-weight: 700; margin-top: 0;">Declared Conventions</h3>
      <ul style="margin: 0; padding-left: 20px;">
        ${unit.conventions.map((c) => `<li>${c}</li>`).join('')}
      </ul>
    </div>` : ''}

  <!-- Representation Bridge (A3) -->
  ${unit.representationBridge && unit.representationBridge.length > 0 ? `
    <div class="g9-bridge-box" style="margin-top: 16px; background: #faf5ff; padding: 14px; border-radius: 8px; border: 1px solid #e9d5ff;">
      <h3 style="font-size: 15px; font-weight: 700; margin-top: 0; color: #6b21a8;">Representation Bridge</h3>
      <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; margin-top: 8px; font-size: 14px;">
        <div style="font-weight: 600; color: #581c87;">Picture Element</div>
        <div style="font-weight: 600; color: #581c87;">Symbolic Form</div>
        <div style="font-weight: 600; color: #581c87;">In Words</div>
        ${unit.representationBridge.map((b) => `
          <div>${b.pictureElement}</div>
          <code>${b.symbol}</code>
          <div>${b.inWords}</div>
        `).join('')}
      </div>
    </div>` : ''}

  <!-- Derivations with why_valid (A4) -->
  ${unit.derivationSteps && unit.derivationSteps.length > 0 ? `
    <div class="g9-derivation-box">
      <h3 style="font-size: 15px; font-weight: 700; margin-top: 0; color: #1d4ed8;">Derivation &amp; Physical Law</h3>
      <ol style="margin: 0; padding-left: 20px;">
        ${unit.derivationSteps.map((s) => `
          <li style="margin-bottom: 8px;">
            <strong>Step ${s.stepNumber}:</strong> <code>${s.expression}</code>
            <div style="font-size: 13px; color: #4b5563; margin-top: 2px;"><em>Justification:</em> ${s.whyValid}</div>
          </li>
        `).join('')}
      </ol>
    </div>` : ''}

  <!-- Worked Example (A6) with precommit secrecy toggle -->
  ${unit.workedExample ? `
    <div class="g9-worked-example-box">
      <h3 style="font-size: 15px; font-weight: 700; margin-top: 0; color: #047857;">Completed Worked Example</h3>
      <p style="margin: 8px 0;"><strong>Prompt:</strong> ${unit.workedExample.problemPrompt}</p>
      <button
        class="g9-btn g9-action-btn"
        data-action="example"
        aria-label="${isWorkedExampleOpen ? 'Hide' : 'Reveal'} Worked Example Steps"
        style="background: #10b981; color: #ffffff; border: 0;"
      >
        ${isWorkedExampleOpen ? 'Hide Reasoning' : 'Reveal Complete Reasoning'}
      </button>

      ${isWorkedExampleOpen ? `
        <div class="g9-worked-steps" style="margin-top: 12px; padding-top: 12px; border-top: 1px dashed #6ee7b7;">
          <h4 style="font-size: 14px; margin: 0 0 6px 0;">Full Inference Steps (No Skipped Steps):</h4>
          <ol style="margin: 0; padding-left: 20px;">
            ${unit.workedExample.fullReasoningSteps.map((st) => `<li>${st}</li>`).join('')}
          </ol>
          <div style="margin-top: 10px; font-weight: 700; color: #065f46;">Exit Solution: ${unit.workedExample.solutionResult}</div>
        </div>` : ''}
    </div>` : ''}

  <!-- Misconception Alert & Repair (A7) -->
  ${unit.misconception ? `
    <div class="g9-misconception-box">
      <h3 style="font-size: 15px; font-weight: 700; margin-top: 0; color: #b91c1c;">Plausible Wrong Path Alert</h3>
      <p style="margin: 4px 0;"><strong>Frequent Misconception:</strong> ${unit.misconception.wrongIdea}</p>
      <div style="margin: 8px 0; background: #ffffff; padding: 10px; border-radius: 6px; border: 1px solid #fca5a5;">
        <strong>Diagnostic Check:</strong> ${unit.misconception.diagnosticPrompt}
      </div>
      <p style="margin: 4px 0; color: #7f1d1d;"><strong>Repair:</strong> ${unit.misconception.repair}</p>
    </div>` : ''}

  <!-- Limiting Boundary Conditions (A8) -->
  ${unit.boundaryConditions && unit.boundaryConditions.length > 0 ? `
    <div class="g9-boundary-box" style="margin-top: 16px; background: #fffbeb; padding: 14px; border-radius: 8px; border: 1px solid #fde68a;">
      <h3 style="font-size: 15px; font-weight: 700; margin-top: 0; color: #b45309;">Boundary Conditions &amp; Limits</h3>
      <ul style="margin: 0; padding-left: 20px;">
        ${unit.boundaryConditions.map((b) => `<li>${b}</li>`).join('')}
      </ul>
    </div>` : ''}

  <!-- Self-Check / Synthesis (A9) -->
  ${unit.selfCheckPrompt ? `
    <div class="g9-selfcheck-box" style="margin-top: 16px; background: #eff6ff; padding: 14px; border-radius: 8px; border: 1px solid #bfdbfe;">
      <h3 style="font-size: 15px; font-weight: 700; margin-top: 0; color: #1e40af;">Unassisted Verification Check</h3>
      <p style="margin: 0;">${unit.selfCheckPrompt}</p>
    </div>` : ''}
</article>`;
  }

  private renderModelWorkspace(state: LessonPageViewState): string {
    if (!this.journey) return `<p>Model unavailable</p>`;

    const modelCfg = this.journey.getModelConfig();
    const prediction = this.journey.getModelPrediction();
    const isObserved = this.journey.isModelObserved();
    const params = this.journey.getModelParameters();

    return `
<div class="g9-model-workspace" style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 14px;">
  <div style="font-weight: 700; font-size: 15px; color: #1e293b;">${modelCfg.modelName}</div>

  <!-- Step 1: Qualitative Prediction (Precommit) -->
  <div style="margin-top: 12px; background: #ffffff; padding: 10px; border-radius: 6px; border: 1px solid #cbd5e1;">
    <div style="font-size: 13px; font-weight: 600; color: #475569;">1. Commit Qualitative Prediction:</div>
    <div style="font-size: 14px; margin: 4px 0 8px 0;">${modelCfg.qualitativePredictionPrompt}</div>
    <div style="display: flex; flex-direction: column; gap: 6px;">
      ${modelCfg.predictionOptions.map((opt, idx) => `
        <label style="display: flex; align-items: center; gap: 8px; min-height: ${HIT_TARGET_MIN_PX}px; cursor: pointer;">
          <input
            type="radio"
            name="model-prediction"
            value="${idx}"
            ${prediction.index === idx ? 'checked' : ''}
            data-action="predict-model"
            style="width: 20px; height: 20px;"
          />
          <span style="font-size: 14px;">${opt}</span>
        </label>
      `).join('')}
    </div>
  </div>

  <!-- Step 2: Interactive Controls & Observe Simulation -->
  <div style="margin-top: 12px;">
    <div style="font-size: 13px; font-weight: 600; color: #475569; margin-bottom: 6px;">2. Simulation Parameters:</div>
    ${Object.entries(modelCfg.parameterBounds).map(([key, bounds]) => {
      const val = params[key] !== undefined ? params[key] : bounds.min;
      return `
      <div style="margin-bottom: 8px;">
        <div style="display: flex; justify-content: space-between; font-size: 13px;">
          <span>${key}</span>
          <span>${val}</span>
        </div>
        <input
          type="range"
          min="${bounds.min}"
          max="${bounds.max}"
          step="0.1"
          value="${val}"
          aria-label="Parameter ${key}"
          style="width: 100%; min-height: 24px;"
        />
      </div>`;
    }).join('')}

    <div style="display: flex; gap: 8px; margin-top: 10px;">
      <button
        class="g9-btn g9-action-btn"
        data-action="observe-model"
        aria-label="Observe Model Simulation"
        style="flex: 1; background: #2563eb; color: #ffffff; border: 0;"
        ${prediction.index === null ? 'disabled style="opacity: 0.5;"' : ''}
      >
        Observe Simulation
      </button>
      <button
        class="g9-btn g9-action-btn"
        data-action="model-fit"
        aria-label="Check Model Fit"
        style="background: #e2e8f0; color: #1e293b; border: 1px solid #cbd5e1;"
      >
        Check Fit
      </button>
    </div>
  </div>

  <!-- Observation Feedback -->
  ${isObserved ? `
    <div class="g9-observation-box" style="margin-top: 12px; background: #ecfdf5; border: 1px solid #a7f3d0; padding: 10px; border-radius: 6px; font-size: 13px; color: #065f46;">
      <strong>Observation:</strong> ${modelCfg.observationNote}
    </div>` : ''}

  ${this.modelFitStatusMessage ? `
    <div class="g9-modelfit-box" style="margin-top: 8px; font-size: 12px; color: #4b5563;">
      <em>Model Fit:</em> ${this.modelFitStatusMessage}
    </div>` : ''}
</div>`;
  }

  private renderAnchorsDrawer(): string {
    if (!this.journey) return `<p>Anchors unavailable</p>`;

    const anchors = this.journey.getLesson().anchors;

    return `
<div class="g9-anchors-component">
  <div style="display: flex; gap: 6px; margin-bottom: 12px;">
    ${ANCHOR_LEVELS.map((lvl) => {
      const isSelected = lvl === this.activeAnchorTab;
      return `
      <button
        class="g9-tab-btn"
        role="tab"
        aria-selected="${isSelected ? 'true' : 'false'}"
        aria-label="Anchor Level ${lvl}"
        style="flex: 1; font-size: 12px; padding: 6px 10px; ${isSelected ? 'background: #4b5563; color: #ffffff;' : 'background: #f3f4f6;'}"
      >
        ${lvl}
      </button>`;
    }).join('')}
  </div>

  ${anchors.map((a) => {
    if (a.level !== this.activeAnchorTab) return '';
    const isRevealed = this.journey!.isAnchorSolutionRevealed(a.level);
    return `
    <div class="g9-anchor-card" style="background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 6px; padding: 12px;">
      <h3 style="font-size: 14px; font-weight: 700; margin: 0 0 6px 0;">${a.title}</h3>
      <p style="font-size: 13px; color: #374151; margin: 0 0 10px 0;">${a.prompt}</p>

      <button
        class="g9-btn g9-action-btn"
        aria-label="${isRevealed ? 'Hide' : 'Reveal'} Solution for ${a.level} Anchor"
        style="font-size: 12px; padding: 6px 12px; min-height: ${HIT_TARGET_MIN_PX}px; background: #6b7280; color: #ffffff; border: 0;"
      >
        ${isRevealed ? 'Hide Solution' : 'Reveal Solution'}
      </button>

      ${isRevealed ? `
        <div class="g9-anchor-solution" style="margin-top: 10px; padding-top: 10px; border-top: 1px dashed #d1d5db; font-size: 13px;">
          <strong>Anchor Solution Steps:</strong>
          <ol style="margin: 4px 0 0 0; padding-left: 20px;">
            ${a.solutionSteps.map((st) => `<li>${st}</li>`).join('')}
          </ol>
        </div>` : ''}
    </div>`;
  }).join('')}
</div>`;
  }
}
