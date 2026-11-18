/**
 * web/pages/explorer.ts
 * A65 — GCDR Explorer interactive page controller and dual-orientation tablet view.
 *
 * Implements:
 * - Ten-stage GCDR progression rail (Predict to Transfer)
 * - Synchronized Primary Scene and Second View (live telemetry)
 * - State-bound helper drawers (Teacher's Chalkboard, Trap Alert, Independent Check, Takeaway)
 * - Truthful Exactness Badge (declares fidelity, binding status, and academic proof disclaimer)
 * - Dual-orientation layout (Landscape split-screen and Portrait stacked flow)
 * - Strict solution secrecy: No answer leakage during early exploration stages
 * - 48px minimum touch/hit target compliance
 *
 * No academic approval inferred from software validation.
 */

import { HIT_TARGET_MIN_PX } from '../styles/tokens.ts';
import {
  GcdrExplorerJourney,
  GCDR_ORDERED_STAGES,
} from '../journeys/explorer.ts';
import type {
  GcdrStage,
  GcdrHelperStates,
  GcdrExplorerDraft,
} from '../journeys/explorer.ts';

export type DisplayOrientation = 'LANDSCAPE' | 'PORTRAIT';

export interface ExplorerPageConfig {
  readonly explorerId: string;
  readonly title: string;
  readonly subject: string;
  readonly topic: string;
  readonly helpers: GcdrHelperStates;
  readonly initialParameters?: Record<string, number>;
  readonly orientation?: DisplayOrientation;
}

export interface ExplorerPageViewState {
  readonly explorerId: string;
  readonly title: string;
  readonly currentStage: GcdrStage;
  readonly currentStageIndex: number;
  readonly orientation: DisplayOrientation;
  readonly parameters: Record<string, number>;
  readonly telemetry: {
    readonly potentialEnergy: number;
    readonly kineticEnergy: number;
    readonly speed: number;
    readonly isTurningPoint: boolean;
  };
  readonly activeHelpers: readonly string[];
  readonly exactnessBadge: GcdrHelperStates['exactnessBadge'];
  readonly minHitTargetPx: number;
}

export class GcdrExplorerPageController {
  private journey: GcdrExplorerJourney;
  private title: string;
  private subject: string;
  private topic: string;
  private orientation: DisplayOrientation = 'LANDSCAPE';
  private activeHelperDrawer: 'CHALKBOARD' | 'TRAP_ALERT' | 'INDEPENDENT_CHECK' | 'TAKEAWAY' | null = null;

  constructor(config: ExplorerPageConfig) {
    this.title = config.title;
    this.subject = config.subject;
    this.topic = config.topic;
    this.orientation = config.orientation || 'LANDSCAPE';

    this.journey = new GcdrExplorerJourney(
      config.explorerId,
      config.helpers,
      config.initialParameters || { x: 0.0 }
    );
  }

  getJourney(): GcdrExplorerJourney {
    return this.journey;
  }

  getOrientation(): DisplayOrientation {
    return this.orientation;
  }

  setOrientation(orientation: DisplayOrientation): void {
    this.orientation = orientation;
  }

  toggleHelperDrawer(helper: 'CHALKBOARD' | 'TRAP_ALERT' | 'INDEPENDENT_CHECK' | 'TAKEAWAY'): void {
    if (this.activeHelperDrawer === helper) {
      this.activeHelperDrawer = null;
    } else {
      this.activeHelperDrawer = helper;
    }
  }

  getActiveHelperDrawer(): string | null {
    return this.activeHelperDrawer;
  }

  // --- Telemetry Computation (Harmonic Potential Well) ---

  getTelemetry(): {
    potentialEnergy: number;
    kineticEnergy: number;
    speed: number;
    isTurningPoint: boolean;
  } {
    const x = this.journey.getModelParameters()['x'] ?? 0.0;
    const clampedX = Math.max(-0.5, Math.min(0.5, x));
    const U = 50 * clampedX * clampedX;
    const K = Math.max(0, 12.5 - U);
    const speed = Math.sqrt(2 * K);
    const isTurningPoint = Math.abs(Math.abs(clampedX) - 0.5) < 1e-4;

    return {
      potentialEnergy: Math.round(U * 1000) / 1000,
      kineticEnergy: Math.round(K * 1000) / 1000,
      speed: Math.round(speed * 1000) / 1000,
      isTurningPoint,
    };
  }

  // --- State Roundtrip ---

  exportState(): {
    orientation: DisplayOrientation;
    activeHelperDrawer: string | null;
    draft: GcdrExplorerDraft;
  } {
    return {
      orientation: this.orientation,
      activeHelperDrawer: this.activeHelperDrawer,
      draft: this.journey.exportDraft(),
    };
  }

  restoreState(state: {
    orientation: DisplayOrientation;
    activeHelperDrawer: string | null;
    draft: GcdrExplorerDraft;
  }): void {
    this.orientation = state.orientation;
    this.activeHelperDrawer = state.activeHelperDrawer as any;
    this.journey.restoreDraft(state.draft);
  }

  // --- View State & HTML Rendering ---

  getViewState(): ExplorerPageViewState {
    const stageDef = this.journey.getCurrentStageDefinition();
    return {
      explorerId: this.journey.getExplorerId(),
      title: this.title,
      currentStage: this.journey.getCurrentStage(),
      currentStageIndex: this.journey.getCurrentStageIndex(),
      orientation: this.orientation,
      parameters: this.journey.getModelParameters(),
      telemetry: this.getTelemetry(),
      activeHelpers: stageDef.allowedHelpers,
      exactnessBadge: this.journey.getHelpers().exactnessBadge,
      minHitTargetPx: HIT_TARGET_MIN_PX,
    };
  }

  renderHtml(): string {
    const state = this.getViewState();
    const stageDef = this.journey.getCurrentStageDefinition();
    const currentStage = this.journey.getCurrentStage();
    const helpers = this.journey.getHelpers();

    // 1. Stage Progress Rail
    const stagesRailHtml = GCDR_ORDERED_STAGES.map((st, idx) => {
      const isPast = idx < state.currentStageIndex;
      const isCurrent = idx === state.currentStageIndex;

      let badgeBg = '#f1f5f9';
      let badgeFg = '#64748b';
      let border = '#cbd5e1';

      if (isCurrent) {
        badgeBg = '#2563eb';
        badgeFg = '#ffffff';
        border = '#1d4ed8';
      } else if (isPast) {
        badgeBg = '#dcfce7';
        badgeFg = '#166534';
        border = '#86efac';
      }

      return `
        <button
          class="gcdr-stage-step ${isCurrent ? 'active' : ''}"
          data-stage="${st}"
          data-index="${idx}"
          style="min-height: ${HIT_TARGET_MIN_PX}px; padding: 6px 12px; background: ${badgeBg}; color: ${badgeFg}; border: 1px solid ${border}; border-radius: 6px; font-size: 12px; font-weight: 600; cursor: pointer; white-space: nowrap;"
          aria-current="${isCurrent ? 'step' : 'false'}"
        >
          ${isPast ? '✓ ' : ''}${st}
        </button>
      `;
    }).join('');

    // 2. Primary Scene SVG (Harmonic Potential Well)
    const x = state.parameters['x'] ?? 0;
    const toScreenX = (px: number) => 40 + ((px + 0.5) / 1.0) * 320;
    const toScreenY = (pu: number) => 180 - (pu / 14.0) * 140;

    const curvePoints: string[] = [];
    for (let i = -50; i <= 50; i++) {
      const cx = i / 100;
      curvePoints.push(`${toScreenX(cx).toFixed(1)},${toScreenY(50 * cx * cx).toFixed(1)}`);
    }

    const primarySceneSvg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 220" width="100%" height="220" role="img" aria-label="Harmonic Potential Well Interactive Scene">
        <rect width="100%" height="100%" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5" rx="8" />
        <polyline fill="none" stroke="#2563eb" stroke-width="3" points="${curvePoints.join(' ')}" />
        <circle cx="${toScreenX(x).toFixed(1)}" cy="${toScreenY(50 * x * x).toFixed(1)}" r="7" fill="#dc2626" stroke="#ffffff" stroke-width="2" />
        <line x1="${toScreenX(-0.5).toFixed(1)}" y1="20" x2="${toScreenX(-0.5).toFixed(1)}" y2="180" stroke="#f87171" stroke-dasharray="4,4" />
        <line x1="${toScreenX(0.5).toFixed(1)}" y1="20" x2="${toScreenX(0.5).toFixed(1)}" y2="180" stroke="#f87171" stroke-dasharray="4,4" />
        <text x="${toScreenX(0)}" y="205" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" fill="#64748b">x = ${x.toFixed(2)} m</text>
      </svg>
    `;

    // 3. Second View Telemetry Panel
    const secondViewHtml = `
      <div class="gcdr-second-view" style="padding: 16px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px;">
        <h4 style="margin: 0 0 12px 0; font-size: 14px; color: #1e293b;">Live Telemetry (Second View)</h4>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-size: 13px;">
          <div style="background: #ffffff; padding: 8px; border-radius: 4px; border: 1px solid #e2e8f0;">
            <span style="color: #64748b;">Potential Energy U:</span><br/>
            <strong style="color: #2563eb; font-size: 16px;">${state.telemetry.potentialEnergy} J</strong>
          </div>
          <div style="background: #ffffff; padding: 8px; border-radius: 4px; border: 1px solid #e2e8f0;">
            <span style="color: #64748b;">Kinetic Energy K:</span><br/>
            <strong style="color: #10b981; font-size: 16px;">${state.telemetry.kineticEnergy} J</strong>
          </div>
          <div style="background: #ffffff; padding: 8px; border-radius: 4px; border: 1px solid #e2e8f0;">
            <span style="color: #64748b;">Particle Speed v:</span><br/>
            <strong style="color: #0f172a; font-size: 16px;">${state.telemetry.speed} m/s</strong>
          </div>
          <div style="background: #ffffff; padding: 8px; border-radius: 4px; border: 1px solid #e2e8f0;">
            <span style="color: #64748b;">Turning Point:</span><br/>
            <strong style="color: ${state.telemetry.isTurningPoint ? '#dc2626' : '#64748b'}; font-size: 14px;">
              ${state.telemetry.isTurningPoint ? '⚡ AT TURNING POINT' : 'Normal Trajectory'}
            </strong>
          </div>
        </div>
      </div>
    `;

    // 4. State-Bound Helpers Bar
    const helperButtons = stageDef.allowedHelpers.map((h) => {
      let label = '';
      if (h === 'CHALKBOARD') label = "Teacher's Chalkboard";
      else if (h === 'TRAP_ALERT') label = '⚠️ Trap Alert';
      else if (h === 'INDEPENDENT_CHECK') label = '🔍 Independent Check';
      else if (h === 'TAKEAWAY') label = '💡 Transfer Takeaway';

      const isActive = this.activeHelperDrawer === h;
      return `
        <button
          class="gcdr-helper-btn"
          data-helper="${h}"
          style="min-height: ${HIT_TARGET_MIN_PX}px; min-width: ${HIT_TARGET_MIN_PX}px; padding: 8px 14px; background: ${isActive ? '#dbeafe' : '#ffffff'}; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 13px; font-weight: 600; cursor: pointer;"
        >
          ${label}
        </button>
      `;
    }).join('');

    // 5. Active Helper Drawer Content
    let drawerContentHtml = '';
    if (this.activeHelperDrawer === 'CHALKBOARD' && helpers.chalkboardNote) {
      drawerContentHtml = `
        <div class="gcdr-drawer-chalkboard" style="padding: 12px 16px; background: #fdfbf7; border: 1px solid #fef08a; border-radius: 6px; margin-top: 12px; font-size: 14px;">
          <strong>Teacher's Chalkboard:</strong> ${helpers.chalkboardNote}
        </div>
      `;
    } else if (this.activeHelperDrawer === 'TRAP_ALERT' && helpers.trapAlert) {
      drawerContentHtml = `
        <div class="gcdr-drawer-trap-alert" style="padding: 12px 16px; background: #fef2f2; border: 1px solid #fecaca; border-radius: 6px; margin-top: 12px; font-size: 14px; color: #991b1b;">
          <strong>Misconception Alert:</strong> ${helpers.trapAlert}
        </div>
      `;
    } else if (this.activeHelperDrawer === 'INDEPENDENT_CHECK' && helpers.independentCheckPrompt) {
      drawerContentHtml = `
        <div class="gcdr-drawer-check" style="padding: 12px 16px; background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 6px; margin-top: 12px; font-size: 14px; color: #166534;">
          <strong>Independent Verification:</strong> ${helpers.independentCheckPrompt}
        </div>
      `;
    } else if (this.activeHelperDrawer === 'TAKEAWAY' && helpers.transferTakeaway) {
      drawerContentHtml = `
        <div class="gcdr-drawer-takeaway" style="padding: 12px 16px; background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 6px; margin-top: 12px; font-size: 14px; color: #1e40af;">
          <strong>Transfer Takeaway:</strong> ${helpers.transferTakeaway}
        </div>
      `;
    }

    // 6. Truthful Exactness Badge
    const badge = state.exactnessBadge;
    const badgeHtml = `
      <div class="gcdr-exactness-badge" style="padding: 8px 12px; background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 11px; color: #475569; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 8px;">
        <div>
          Fidelity: <strong>${badge.fidelity}</strong> | Binding: <strong style="color: ${badge.binding === 'CANONICAL_BINDING' ? '#059669' : '#d97706'};">${badge.binding}</strong>
        </div>
        <div style="font-style: italic;">
          ${badge.academicClaimDisclaimer}
        </div>
      </div>
    `;

    // 7. Responsive Layout (Landscape Split vs Portrait Stacked)
    const isLandscape = this.orientation === 'LANDSCAPE';
    const mainLayoutGrid = isLandscape
      ? 'display: grid; grid-template-columns: 1fr 1fr; gap: 20px;'
      : 'display: flex; flex-direction: column; gap: 16px;';

    return `
      <div class="gcdr-explorer-page" data-orientation="${this.orientation}" style="max-width: 1200px; margin: 0 auto; padding: 16px; font-family: system-ui, sans-serif;">
        <header style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; padding-bottom: 12px; border-bottom: 2px solid #e2e8f0;">
          <div>
            <h1 style="margin: 0; font-size: 20px; color: #0f172a;">${this.title}</h1>
            <span style="font-size: 13px; color: #64748b;">${this.subject.toUpperCase()} / ${this.topic.toUpperCase()} (GCDR Blueprint)</span>
          </div>
          <div style="display: flex; gap: 8px;">
            <button id="gcdr-orientation-btn" style="min-height: ${HIT_TARGET_MIN_PX}px; min-width: ${HIT_TARGET_MIN_PX}px; padding: 8px 14px; background: #f1f5f9; border: 1px solid #cbd5e1; border-radius: 6px; font-weight: 600; cursor: pointer;">
              🔄 ${this.orientation}
            </button>
          </div>
        </header>

        <!-- Stage Progression Rail -->
        <nav class="gcdr-stages-rail" aria-label="GCDR Stages" style="display: flex; gap: 6px; overflow-x: auto; padding-bottom: 12px; margin-bottom: 16px;">
          ${stagesRailHtml}
        </nav>

        <!-- Current Stage Briefing -->
        <section class="gcdr-stage-card" style="padding: 16px; background: #ffffff; border: 1px solid #cbd5e1; border-radius: 8px; margin-bottom: 16px;">
          <h2 style="margin: 0 0 6px 0; font-size: 16px; color: #1e293b;">${stageDef.title}</h2>
          <p style="margin: 0 0 12px 0; font-size: 14px; color: #475569;">${stageDef.instructions}</p>
          <div class="gcdr-learner-input-container" style="display: flex; gap: 8px;">
            <input
              id="gcdr-stage-input"
              type="text"
              placeholder="Record your derivation / observation for stage ${currentStage}..."
              value="${this.journey.getStageResponse(currentStage) || ''}"
              style="flex: 1; min-height: ${HIT_TARGET_MIN_PX}px; padding: 10px 14px; font-size: 15px; border: 1px solid #cbd5e1; border-radius: 6px;"
            />
            <button id="gcdr-advance-stage-btn" style="min-height: ${HIT_TARGET_MIN_PX}px; min-width: ${HIT_TARGET_MIN_PX}px; padding: 10px 20px; background: #2563eb; color: #ffffff; border: none; border-radius: 6px; font-weight: 600; cursor: pointer;">
              Advance Stage →
            </button>
          </div>
        </section>

        <!-- Dual Views Container -->
        <div class="gcdr-dual-views" style="${mainLayoutGrid} margin-bottom: 16px;">
          <div class="gcdr-primary-scene-wrapper">
            <h4 style="margin: 0 0 8px 0; font-size: 14px; color: #1e293b;">Interactive Primary Scene</h4>
            ${primarySceneSvg}
          </div>
          <div class="gcdr-second-view-wrapper">
            ${secondViewHtml}
          </div>
        </div>

        <!-- Helper Drawers Bar -->
        <div class="gcdr-helpers-bar" style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 12px;">
          ${helperButtons}
        </div>
        ${drawerContentHtml}

        <!-- Exactness and Academic Proof Disclaimer Badge -->
        <div style="margin-top: 20px;">
          ${badgeHtml}
        </div>
      </div>
    `;
  }
}
