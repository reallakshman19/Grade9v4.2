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

import {escapeHtml} from '../runtime/rendering.ts';
import {getModelRegistry} from '../runtime/models.ts';
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
  readonly telemetry: null | {
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
    this.orientation=config.orientation||'LANDSCAPE';if(!['LANDSCAPE','PORTRAIT'].includes(this.orientation))throw Error('Invalid orientation');

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
    if(!['LANDSCAPE','PORTRAIT'].includes(orientation))throw Error('Invalid orientation');this.orientation=orientation;
  }

  toggleHelperDrawer(helper: 'CHALKBOARD' | 'TRAP_ALERT' | 'INDEPENDENT_CHECK' | 'TAKEAWAY'): void {
    if(!this.journey.getCurrentStageDefinition().allowedHelpers.includes(helper)||helper!=='CHALKBOARD'){this.activeHelperDrawer=null;return;}
    if (this.activeHelperDrawer === helper) {
      this.activeHelperDrawer = null;
    } else {
      this.activeHelperDrawer = helper;
    }
  }

  getActiveHelperDrawer(): string | null {
    return this.activeHelperDrawer==='CHALKBOARD'&&this.journey.getCurrentStageDefinition().allowedHelpers.includes('CHALKBOARD')?this.activeHelperDrawer:null;
  }

  // --- Telemetry Computation (Harmonic Potential Well) ---

  // Local stage/draft state cannot authorize telemetry. An explicit A49 read
  // uses the exact model and current exposure checkpoint, never a stored success flag.
  getTelemetry():null{return null;}
  async readAuthorizedTelemetry(binding:Parameters<ReturnType<typeof getModelRegistry>['evaluateAuthorized']>[2]){
    const stage=this.journey.getCurrentStage();
    if(!['MANIPULATE','OBSERVE','CONTRADICT','DECONSTRUCT','RECONSTRUCT','INVARIANT','BOUNDARY'].includes(stage)||!this.journey.isStageCompleted('PREDICT'))return null;
    const before=this.journey.getModelParameters(),result=await getModelRegistry().evaluateAuthorized('PHYS-MODEL-ENERGY-WELL',before,binding);
    const o=result.outputs;if(result.isMasked||!o||this.journey.getCurrentStage()!==stage||this.journey.getModelParameters().x!==before.x)return null;
    return {potentialEnergy:o.U as number,kineticEnergy:o.K as number,speed:o.v as number,isTurningPoint:o.isTurningPoint as boolean};
  }

  // --- State Roundtrip ---

  exportState(): {
    orientation: DisplayOrientation;
    activeHelperDrawer: string | null;
    draft: GcdrExplorerDraft;
  } {
    return {
      orientation: this.orientation,
      activeHelperDrawer:this.getActiveHelperDrawer(),
      draft: this.journey.exportDraft(),
    };
  }

  restoreState(state: {
    orientation: DisplayOrientation;
    activeHelperDrawer: string | null;
    draft: GcdrExplorerDraft;
  }): void {
    if(!['LANDSCAPE','PORTRAIT'].includes(state.orientation)||state.activeHelperDrawer!==null&&state.activeHelperDrawer!=='CHALKBOARD')throw Error('Invalid view snapshot');this.journey.restoreDraft(state.draft);this.orientation=state.orientation;this.activeHelperDrawer=state.activeHelperDrawer;
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
      activeHelpers:stageDef.allowedHelpers.filter(h=>h==='CHALKBOARD'),
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
      const isPast=this.journey.isStageCompleted(st);
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
          aria-current="${isCurrent ? 'step' : 'false'}" ${idx>Math.min(this.journey.exportDraft().evidence.length,9)?'disabled':''}
        >
          ${isPast ? '✓ ' : ''}${st}
        </button>
      `;
    }).join('');

    const primarySceneSvg='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 220" role="img" aria-label="Model output withheld"><text x="20" y="40">Model output withheld</text></svg>';
    const secondViewHtml='<div class="gcdr-second-view">Telemetry withheld pending durable reviewed exposure.</div>';
    const helperButtons=state.activeHelpers.map(h=>'<button class="gcdr-helper-btn" data-helper="'+escapeHtml(h)+'" style="min-height:48px;min-width:48px">Teacher’s Chalkboard</button>').join('');
    const drawerContentHtml=this.getActiveHelperDrawer()==='CHALKBOARD'?'<div class="gcdr-drawer-chalkboard">Record your own reasoning and uncertainties. No reviewed helper content is available in this diagnostic.</div>':'';

    // 6. Truthful Exactness Badge
    const badge = state.exactnessBadge;
    const badgeHtml = `
      <div class="gcdr-exactness-badge" style="padding: 8px 12px; background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 11px; color: #475569; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 8px;">
        <div>
          Fidelity: <strong>${escapeHtml(String(badge.fidelity))}</strong> | Binding: <strong style="color: ${badge.binding === 'CANONICAL_BINDING' ? '#059669' : '#d97706'};">${escapeHtml(String(badge.binding))}</strong>
        </div>
        <div style="font-style: italic;">
          ${escapeHtml(String(badge.academicClaimDisclaimer))}
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
            <h1 style="margin: 0; font-size: 20px; color: #0f172a;">${escapeHtml(String(this.title))}</h1>
            <span style="font-size: 13px; color: #64748b;">${escapeHtml(String(this.subject.toUpperCase()))} / ${escapeHtml(String(this.topic.toUpperCase()))} (GCDR Blueprint)</span>
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
          <h2 style="margin: 0 0 6px 0; font-size: 16px; color: #1e293b;">${escapeHtml(String(stageDef.title))}</h2>
          <p style="margin: 0 0 12px 0; font-size: 14px; color: #475569;">${escapeHtml(String(stageDef.instructions))}</p>
          <div class="gcdr-learner-input-container" style="display: flex; gap: 8px;">
            <input
              id="gcdr-stage-input"
              type="text"
              placeholder="Record your derivation / observation for stage ${currentStage}..."
              value="${escapeHtml(String(this.journey.getStageResponse(currentStage) || ''))}"
              style="flex: 1; min-height: ${HIT_TARGET_MIN_PX}px; padding: 10px 14px; font-size: 15px; border: 1px solid #cbd5e1; border-radius: 6px;"
            />
            <button id="gcdr-advance-stage-btn" style="min-height: ${HIT_TARGET_MIN_PX}px; min-width: ${HIT_TARGET_MIN_PX}px; padding: 10px 20px; background: #2563eb; color: #ffffff; border: none; border-radius: 6px; font-weight: 600; cursor: pointer;">
              ${this.journey.isCompleted()?'Local transcript complete':'Advance Stage →'}
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
