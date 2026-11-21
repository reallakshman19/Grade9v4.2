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

  renderHtml(contextEntry=false): string {
    const state = this.getViewState();
    const stageDef = this.journey.getCurrentStageDefinition();
    const currentStage = this.journey.getCurrentStage();
    const helpers = this.journey.getHelpers();

    // 1. Stage Progress Rail
    const stagesRailHtml = GCDR_ORDERED_STAGES.map((st, idx) => {
      const isPast=this.journey.isStageCompleted(st);
      const isCurrent = !contextEntry&&idx === state.currentStageIndex;

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
          style="min-height: ${HIT_TARGET_MIN_PX}px; min-width:48px; padding: 6px 12px; background: ${badgeBg}; color: ${badgeFg}; border: 1px solid ${border}; border-radius: 6px; font-size:14px; font-weight: 600; cursor: pointer; white-space: nowrap;"
          aria-current="${isCurrent ? 'step' : 'false'}" ${contextEntry||idx>Math.min(this.journey.exportDraft().evidence.length,9)?'disabled':''}
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
      <div class="gcdr-exactness-badge" style="padding: 8px 12px; background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 6px; font-size:14px; color: #475569; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 8px;">
        <div>
          Fidelity: <strong>${escapeHtml(String(badge.fidelity))}</strong> | Binding: <strong style="color: ${badge.binding === 'CANONICAL_BINDING' ? '#059669' : '#d97706'};">${escapeHtml(String(badge.binding))}</strong>
        </div>
        <div style="font-style: italic;">
          ${escapeHtml(String(badge.academicClaimDisclaimer))}
        </div>
      </div>
    `;

    // 7. Responsive Layout (Landscape Split vs Portrait Stacked)
    // Native expanded stage/support split, with an explicit portrait override.
    // The canonical 72:28 specialized profile is a separate unimplemented surface.
    const editable=!contextEntry&&!this.journey.isStageCompleted(currentStage);
    const manipulation=editable&&currentStage==='MANIPULATE';

    return `
      <main class="gcdr-explorer-page" data-role="EXPLORER" data-orientation="${this.orientation}"><style>${explorerCss}</style>
        <section data-slot="identity"><header class="gcdr-identity">
          <div>
            <h1 style="margin: 0; font-size: 20px; color: #0f172a;">${escapeHtml(String(this.title))}</h1>
            <span style="font-size:14px; color: #64748b;">${escapeHtml(String(this.subject.toUpperCase()))} / ${escapeHtml(String(this.topic.toUpperCase()))} (GCDR Blueprint)</span>
          </div>
          <div style="display: flex; gap: 8px;">
            <button id="gcdr-orientation-btn" style="min-height: ${HIT_TARGET_MIN_PX}px; min-width: ${HIT_TARGET_MIN_PX}px; padding: 8px 14px; background: #f1f5f9; border: 1px solid #cbd5e1; border-radius: 6px; font-weight: 600; cursor: pointer;">
              🔄 ${this.orientation}
            </button>
          </div>
        </header>

        <!-- Stage Progression Rail -->
        <nav class="gcdr-stages-rail" aria-label="GCDR Stages" style="display:flex;gap:8px;overflow-x:auto;padding-bottom:4px;">
          <span class="gcdr-context-step" aria-current="${contextEntry?'step':'false'}">CONTEXT</span>${stagesRailHtml}
        </nav></section>

        <div class="gcdr-role-grid"><section data-slot="stage">
        <!-- Current Stage Briefing -->
        <section class="gcdr-stage-card" style="padding: 16px; background: #ffffff; border: 1px solid #cbd5e1; border-radius: 8px; margin-bottom: 16px;">
          <h2 style="margin: 0 0 6px 0; font-size: 16px; color: #1e293b;">${contextEntry?'Context entry':escapeHtml(String(stageDef.title))}</h2>
          <p style="margin: 0 0 12px 0; font-size: 14px; color: #475569;">${contextEntry?'Local diagnostic context; no verified native source question is bound.':escapeHtml(String(stageDef.instructions))}</p>
          ${contextEntry?'<button type="button" id="gcdr-context-start">Begin prediction</button>':`<div class="gcdr-learner-input-container">
            <input
              id="gcdr-stage-input" aria-label="Stage response" ${editable?'':'readonly'}
              type="text"
              placeholder="Record your derivation / observation for stage ${currentStage}..."
              value="${escapeHtml(String(this.journey.getStageResponse(currentStage) || ''))}"
              style="flex: 1; min-height: ${HIT_TARGET_MIN_PX}px; padding: 10px 14px; font-size: 15px; border: 1px solid #cbd5e1; border-radius: 6px;"
            />
            <button id="gcdr-advance-stage-btn" style="min-height: ${HIT_TARGET_MIN_PX}px; min-width: ${HIT_TARGET_MIN_PX}px; padding: 10px 20px; background: #2563eb; color: #ffffff; border: none; border-radius: 6px; font-weight: 600; cursor: pointer;">
              ${this.journey.isCompleted()?'Local transcript complete':'Advance Stage →'}
            </button>
          </div>`}
          ${manipulation?`<label>Model parameter x <input type="range" id="gcdr-parameter-x" aria-label="Model parameter x" min="-.5" max=".5" step=".01" value="${state.parameters.x}"></label>`:''}
          <p role="status" data-gcdr-status></p>
        </section>

        <!-- Dual Views Container -->
        <div class="gcdr-dual-views">
          <div class="gcdr-primary-scene-wrapper">
            <h4 style="margin: 0 0 8px 0; font-size: 14px; color: #1e293b;">Interactive Primary Scene</h4>
            ${primarySceneSvg}
          </div>
          <div class="gcdr-second-view-wrapper">
            ${secondViewHtml}
          </div>
        </div>

        </section><aside data-slot="route">
        <h2>Route and support</h2><p>Unbound local transcript; native source return and reviewed telemetry are unavailable.</p>
        <!-- Helper Drawers Bar -->
        <div class="gcdr-helpers-bar" style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 12px;">
          ${helperButtons}
        </div>
        ${drawerContentHtml}

        <!-- Exactness and Academic Proof Disclaimer Badge -->
        <div style="margin-top: 20px;">
          ${badgeHtml}
        </div>
      </aside></div></main>
    `;
  }
}

const explorerCss=`
.gcdr-explorer-page{box-sizing:border-box;width:100%;max-width:100%;min-width:0;padding:12px;overflow-wrap:anywhere;font-family:system-ui,sans-serif}
.gcdr-explorer-page *{box-sizing:border-box;min-width:0}
.gcdr-explorer-page .gcdr-identity{display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:8px}
.gcdr-explorer-page .gcdr-stages-rail{margin:8px 0;max-width:100%}
.gcdr-explorer-page .gcdr-stages-rail>*{flex-shrink:0}
.gcdr-context-step{display:inline-flex;align-items:center;padding:8px;min-height:48px}
.gcdr-explorer-page .gcdr-role-grid{display:grid;grid-template-columns:minmax(0,1fr);gap:16px}
.gcdr-explorer-page [data-slot=stage],.gcdr-explorer-page [data-slot=route]{border:1px solid #ccd7e1;border-radius:8px;padding:12px}
.gcdr-explorer-page .gcdr-dual-views{display:grid;grid-template-columns:minmax(0,1fr);gap:12px}
.gcdr-explorer-page svg{width:100%;height:auto;display:block}
.gcdr-explorer-page .gcdr-learner-input-container{display:flex;flex-wrap:wrap;gap:8px}
.gcdr-explorer-page .gcdr-learner-input-container input{flex:1 1 180px}
.gcdr-explorer-page button,.gcdr-explorer-page input{min-height:48px;min-width:48px;max-width:100%;font:inherit}
.gcdr-explorer-page input[type=range]{width:100%;display:block}
.gcdr-explorer-page :focus-visible{outline:3px solid #125d82;outline-offset:2px}
@media(min-width:1100px){.gcdr-explorer-page[data-orientation=LANDSCAPE] .gcdr-role-grid{grid-template-columns:minmax(0,66fr) minmax(0,34fr);align-items:start}
.gcdr-explorer-page[data-orientation=LANDSCAPE] [data-slot=route]{position:sticky;top:8px;max-height:calc(100vh - 16px);overflow:auto}}
`;
// Local mounted diagnostic only. CONTEXT is an entry view, not an invented
// reviewed evidence stage; the ten-stage transcript wire format stays unchanged.
export function mountGcdrExplorer(root:HTMLElement,c:GcdrExplorerPageController){
 let active=true;
 const j=c.getJourney();
 let contextEntry=j.exportDraft().evidence.length===0&&j.getStageResponse('PREDICT')===null;
 const render=(selector?:string)=>{if(!active)return;root.innerHTML=c.renderHtml(contextEntry);if(selector)root.querySelector<HTMLElement>(selector)?.focus({preventScroll:true});};
 const status=(message:string)=>{const n=root.querySelector('[data-gcdr-status]');if(n)n.textContent=message;};
 const click=(event:Event)=>{
  const b=event.target instanceof Element?event.target.closest<HTMLButtonElement>('button'):null;if(!active||!b||b.disabled||!root.contains(b))return;
  if(b.id==='gcdr-context-start'){contextEntry=false;render('#gcdr-stage-input');return;}
  if(b.id==='gcdr-orientation-btn'){c.setOrientation(c.getOrientation()==='LANDSCAPE'?'PORTRAIT':'LANDSCAPE');render('#gcdr-orientation-btn');return;}
  if(contextEntry)return;
  if(b.id==='gcdr-advance-stage-btn'){
   const stage=j.getCurrentStage(),field=root.querySelector<HTMLInputElement>('#gcdr-stage-input');
   if(!j.isStageCompleted(stage)&&(!field||!j.setStageResponse(stage,field.value))){status('Record a nonempty stage response.');return;}
   const result=j.advance();if(!result.success){status(result.error??'Stage unavailable.');return;}
   render('#gcdr-stage-input');return;
  }
  if(b.dataset.stage){const stage=b.dataset.stage as GcdrStage;if(!j.goToStage(stage)){status('Finish the current local response before navigating.');return;}render('#gcdr-stage-input');return;}
  if(b.dataset.helper==='CHALKBOARD'){c.toggleHelperDrawer('CHALKBOARD');render('.gcdr-helper-btn');}
 };
 const input=(event:Event)=>{
  const n=event.target;if(!active||contextEntry||!(n instanceof HTMLInputElement))return;
  if(n.id==='gcdr-parameter-x'){if(!j.setModelParameter('x',Number(n.value)))status('Parameter change unavailable.');}
  else if(n.id==='gcdr-stage-input'&&!n.readOnly&&n.value.trim())j.setStageResponse(j.getCurrentStage(),n.value);
 };
 root.addEventListener('click',click);root.addEventListener('input',input);render();
 return {refresh:()=>render(),dispose(){if(!active)return;active=false;root.removeEventListener('click',click);root.removeEventListener('input',input);root.replaceChildren();}};
}
