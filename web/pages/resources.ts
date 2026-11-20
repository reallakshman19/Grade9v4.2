/**
 * web/pages/resources.ts
 * A63 — Resource launcher page controller
 *
 * Manages the resource list page: displays eligible resources, validates
 * selections, and delegates to the ApplicationHostController for isolated
 * launch. Enforces that only eligible (non-HOLD, non-restricted) resources
 * may be launched. Provides safe return and rotation support.
 *
 * No academic approval inferred from software validation.
 */

import { createApplicationHost, ApplicationHostController } from "../application-host/index.ts";
import type { ApplicationHostConfig, HostState } from "../application-host/index.ts";
import type { Orientation } from "../application-host/bridge.ts";

// ---------------------------------------------------------------------------
// Resource descriptor
// ---------------------------------------------------------------------------

export interface Resource {
  /** Stable identifier (e.g. "res-phys-wpe-01") */
  id: string;
  /** Display title */
  title: string;
  /** Fully-qualified URL on an isolated origin */
  url: string;
  /** Expected origin for bridge validation */
  origin: string;
  /** Eligibility: only "ELIGIBLE" resources may be launched */
  eligibility: "ELIGIBLE" | "HOLD" | "RESTRICTED" | "STALE";
  /** Optional content description */
  description?: string;
}

// ---------------------------------------------------------------------------
// Launch result
// ---------------------------------------------------------------------------

export type LaunchOutcome =
  | "LAUNCHED"
  | "REJECTED_HOLD"
  | "REJECTED_RESTRICTED"
  | "REJECTED_STALE"
  | "REJECTED_UNKNOWN"
  | "REJECTED_SAME_ORIGIN"
  | "ALREADY_ACTIVE"
  | "REJECTED_UNAUTHORIZED";

export interface LaunchResult {
  outcome: LaunchOutcome;
  resourceId: string;
  reason: string;
}

// ---------------------------------------------------------------------------
// Resources page controller
// ---------------------------------------------------------------------------

export class ResourcesPageController {
  private resources: Resource[] = [];
  private activeHost: ApplicationHostController | null = null;
  private activeResourceId: string | null = null;
  private currentOrigin: string;
  private readonly authorize:(resource:Readonly<Resource>)=>boolean;

  /**
   * @param currentOrigin The host shell's own origin (e.g. "https://app.grade9.local")
   *   Used to reject any resource URL that shares the same origin.
   */
  constructor(currentOrigin: string,authorize:(resource:Readonly<Resource>)=>boolean=()=>false) {
    this.currentOrigin = currentOrigin;this.authorize=authorize;
  }

  // ---------------------------------------------------------------------------
  // Resource registry
  // ---------------------------------------------------------------------------

  loadResources(resources: Resource[]): void {
    if(new Set(resources.map(r=>r.id)).size!==resources.length)throw Error('Duplicate resource identity');this.resources=resources.map(r=>Object.freeze({...r}));
  }

  getResources(): readonly Resource[] {
    return [...this.resources];
  }

  getEligibleResources(): readonly Resource[] {
    return this.resources.filter((r) => r.eligibility === "ELIGIBLE"&&this.authorize(r));
  }

  findResource(id: string): Resource | undefined {
    return this.resources.find((r) => r.id === id);
  }

  // ---------------------------------------------------------------------------
  // Launch
  // ---------------------------------------------------------------------------

  launch(
    resourceId: string,
    hostConfig?: Partial<ApplicationHostConfig>,
  ): LaunchResult {
    // Prevent double-launch
    if (this.activeHost !== null) {
      return { outcome: "ALREADY_ACTIVE", resourceId, reason: "A resource is already running. Dismiss it first." };
    }

    const resource = this.findResource(resourceId);
    if (!resource) {
      return { outcome: "REJECTED_UNKNOWN", resourceId, reason: "Resource not found in registry." };
    }

    // Eligibility gate
    if (resource.eligibility === "HOLD") {
      return { outcome: "REJECTED_HOLD", resourceId, reason: "Resource is on HOLD; academic review required before launch." };
    }
    if (resource.eligibility === "RESTRICTED") {
      return { outcome: "REJECTED_RESTRICTED", resourceId, reason: "Resource is restricted; not permitted for launch." };
    }
    if (resource.eligibility === "STALE") {
      return { outcome: "REJECTED_STALE", resourceId, reason: "Resource reference is stale; registry update required." };
    }

    // Same-origin rejection — MUST NOT load a same-origin resource in the
    // isolated host (would allow script+same-origin sandbox escape)
    let resourceOrigin: string;
    try {
      resourceOrigin = new URL(resource.url).origin;
    } catch {
      return { outcome: "REJECTED_UNKNOWN", resourceId, reason: "Resource URL is invalid." };
    }

    if (resourceOrigin === this.currentOrigin) {
      return { outcome: "REJECTED_SAME_ORIGIN", resourceId, reason: "Resource is same-origin; isolated host cannot load same-origin apps." };
    }

    // Verify resource.origin matches URL origin
    if (resource.origin !== resourceOrigin) {
      return { outcome: "REJECTED_UNKNOWN", resourceId, reason: "Resource origin field does not match URL origin." };
    }

    if(resource.eligibility!=='ELIGIBLE'||!this.authorize(resource))return {outcome:'REJECTED_UNAUTHORIZED',resourceId,reason:'No trusted resource authorization'};
    // Create and launch host
    const config: ApplicationHostConfig = {
      timeoutMs: 30 * 60 * 1000,
      ...hostConfig,
      appUrl: resource.url,
      expectedOrigin: resource.origin,
    };

    const host = createApplicationHost(config);
    host.launch();

    this.activeHost = host;
    this.activeResourceId = resource.id;

    return { outcome: "LAUNCHED", resourceId, reason: "Host launched successfully." };
  }

  // ---------------------------------------------------------------------------
  // Active host delegation
  // ---------------------------------------------------------------------------

  getActiveHost(): ApplicationHostController | null {
    return this.activeHost;
  }

  getActiveResourceId(): string | null {
    return this.activeResourceId;
  }

  /**
   * Process a postMessage from the active iframe.
   * Returns false if no active host or message rejected.
   */
  handleMessage(event: { origin: string; data: unknown;source?:MessageEventSource|null }): boolean {
    if (!this.activeHost) return false;
    return this.activeHost.handleMessage(event);
  }

  /**
   * Forward orientation change to active host.
   * Returns the envelope to send, or null if no active host.
   */
  rotate(orientation: Orientation): ReturnType<ApplicationHostController["rotate"]> | null {
    if (!this.activeHost) return null;
    return this.activeHost.rotate(orientation);
  }

  /**
   * Safely dismiss the active host and return to the resources list.
   * Returns the dismiss envelope (caller should postMessage to iframe).
   */
  safeReturn(): ReturnType<ApplicationHostController["dismiss"]> | null {
    if (!this.activeHost) return null;
    const envelope = this.activeHost.dismiss();
    this.activeHost = null;
    this.activeResourceId = null;
    return envelope;
  }

  /**
   * Returns the current host state, or null if no active host.
   */
  getHostState(): HostState | null {
    return this.activeHost?.getState() ?? null;
  }

  // ---------------------------------------------------------------------------
  // Sandbox enforcement
  // ---------------------------------------------------------------------------

  /**
   * Returns the correct iframe sandbox attribute for resource iframes.
   */
  static iframeSandbox(): string {
    return ApplicationHostController.sandboxAttribute();
  }

  /**
   * Validates a proposed sandbox string.
   */
  static validateSandbox(attr: string): { valid: boolean; reason: string } {
    return ApplicationHostController.validateSandbox(attr);
  }
}

// ---------------------------------------------------------------------------
// Factory
// ---------------------------------------------------------------------------

export function createResourcesPage(currentOrigin: string,authorize?:(resource:Readonly<Resource>)=>boolean): ResourcesPageController {
  return new ResourcesPageController(currentOrigin,authorize);
}

// ---------------------------------------------------------------------------
// Standalone Lab Host Mounting Function
// ---------------------------------------------------------------------------

import { mountCirclesMaster, CirclesMasterController } from './circles-master.ts';
import { PortableWorkbenchController } from '../applications/portable/component.ts';
import { RIEMANN_SUMS_PACKAGE, LONG_DIVISION_PACKAGE } from '../runtime/math-packages.ts';
import { REDOX_ELECTRON_EQUIVALENCE_PACKAGE } from '../runtime/chem-packages.ts';
import { RedoxAdaptiveController, mountRedoxAdaptive } from './redox-adaptive.ts';
import { TitrationSimulatorController, mountTitrationSimulator } from './titration.ts';
import { MotionPlaneController, mountMotionPlane } from './motion-plane.ts';
import { MOTION_SHARED_CLOCK_PACKAGE } from '../runtime/physics-packages.ts';
import { ExperimentWorkspaceController } from '../components/experiment.ts';
import { mountMotionSuite } from './workbenches/motion-suite.ts';
import { mountVectorAlgebraWorkbench } from './workbenches/vector-algebra.ts';
import { mountFluidPressureWorkbench } from './workbenches/fluid-pressure.ts';
import { mountGasLawsWorkbench } from './workbenches/gas-laws.ts';
import { mountChemicalBondingWorkbench } from './workbenches/chemical-bonding.ts';
import { mountMoleConceptWorkbench } from './workbenches/mole-concept.ts';
import { mountLinearCoordinatesWorkbench } from './workbenches/linear-coordinates.ts';
import type { PortableWorkbenchPackage } from '../applications/portable/types.ts';
import { HIT_TARGET_MIN_PX, HIT_TARGET_PRIMARY_PX } from '../styles/tokens.ts';
import { escapeHtml } from '../runtime/rendering.ts';

function mountPortableLab(
  root: HTMLElement,
  pkg: PortableWorkbenchPackage,
  labTitle: string,
  returnRoute: string,
  onNavigate?: (route: string) => void
): { dispose: () => void } {
  let active = true;
  const ctrl = new PortableWorkbenchController(pkg);

  const render = () => {
    if (!active) return;
    const workbenchHtml = ctrl.renderHtml();

    root.innerHTML = `
      <div class="portable-lab-host" style="display:flex;flex-direction:column;gap:1.5rem;max-width:1400px;margin:0 auto;padding:1.5rem;box-sizing:border-box;">
        
        <!-- Header -->
        <header style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:1rem;padding-bottom:1rem;border-bottom:2px solid #e2e8f0;">
          <div>
            <div style="display:flex;gap:8px;font-size:0.9rem;color:#64748b;margin-bottom:0.25rem;">
              <a href="#/home" style="color:#0284c7;text-decoration:none;font-weight:600;">Home</a> &gt; 
              <span>Standalone Workbench</span>
            </div>
            <h1 style="margin:0;font-size:1.85rem;font-weight:800;color:#0f172a;">🔬 ${escapeHtml(labTitle)}</h1>
            <p style="margin:0.25rem 0 0;color:#475569;font-size:1rem;">A64 / DEC-A59 Declarative Portable Workbench</p>
          </div>
          
          <div style="display:flex;gap:10px;align-items:center;">
            <button type="button" id="btn-rotate-pkg" style="min-height:${HIT_TARGET_MIN_PX}px;padding:8px 16px;background:#f1f5f9;color:#0f172a;border:1px solid #cbd5e1;border-radius:6px;cursor:pointer;font-weight:700;">🔄 Rotate 90°</button>
            <button type="button" id="btn-return-topic" style="min-height:${HIT_TARGET_MIN_PX}px;padding:8px 16px;background:#0f172a;color:white;border:none;border-radius:6px;cursor:pointer;font-weight:700;">← Return</button>
          </div>
        </header>

        <!-- Diagnostic Mode Banner -->
        <div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:8px;padding:0.75rem 1.25rem;display:flex;align-items:center;gap:12px;">
          <span style="font-size:1.25rem;">ℹ️</span>
          <div style="font-size:0.95rem;color:#1e40af;">
            <strong>DEC-A59 Compatibility Decision · Academic Status: HOLD</strong> — Reuses exact verified declarative package schemas. State transitions are purely mathematical and declarative.
          </div>
        </div>

        <!-- Rendered Workbench -->
        <div id="workbench-container" style="background:#ffffff;border:1px solid #cbd5e1;border-radius:12px;padding:1.5rem;box-shadow:0 1px 3px rgba(0,0,0,0.05);">
          ${workbenchHtml}
        </div>
      </div>
    `;

    bindEvents();
  };

  const bindEvents = () => {
    root.querySelector<HTMLButtonElement>('#btn-return-topic')?.addEventListener('click', () => {
      if (onNavigate) onNavigate(returnRoute.replace(/^#/, ''));
      else window.location.hash = returnRoute;
    });

    root.querySelector<HTMLButtonElement>('#btn-rotate-pkg')?.addEventListener('click', () => {
      ctrl.rotate(90);
      render();
    });

    // Rule Buttons in Workbench
    root.querySelectorAll<HTMLButtonElement>('.portable-rule-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const ruleId = btn.dataset.ruleId;
        if (ruleId) {
          ctrl.applyTransformation(ruleId);
          render();
        }
      });
    });

    // Projection Pills selection
    root.querySelectorAll<HTMLElement>('.portable-projection-pill').forEach((pill) => {
      pill.addEventListener('click', () => {
        const entRef = pill.dataset.entityRef;
        if (entRef) {
          ctrl.getAdapter().setActiveEntityId(entRef);
          render();
        }
      });
    });
  };

  render();

  return {
    dispose: () => {
      active = false;
      root.replaceChildren();
    },
  };
}

export function mountExperimentLab(
  root: HTMLElement,
  onNavigate?: (route: string) => void
): { dispose: () => void } {
  let active = true;
  const ctrl = new ExperimentWorkspaceController({
    archetype: 'PHY_E3',
    title: 'Workpack A29: Simple Pendulum — Gravity Measurement & Least-Squares Regression',
    apparatus: [
      { id: 'app-bob', name: 'Spherical Pendulum Bob', type: 'PENDULUM_BOB', specifications: 'Brass bob mass m = 50 g', uncertaintyResolution: '±0.1 g', accessibleDescription: 'Solid brass spherical bob with attachment hook' },
      { id: 'app-thread', name: 'Inextensible Fine Thread', type: 'THREAD', specifications: 'Braided nylon thread, negligible mass', uncertaintyResolution: 'negligible elongation', accessibleDescription: 'Inextensible suspension thread' },
      { id: 'app-rule', name: 'Precision Meter Rule', type: 'METER_RULE', specifications: 'Length 1.0 m calibrated at 20°C', uncertaintyResolution: '±1 mm', accessibleDescription: 'Calibrated wooden metric scale' },
      { id: 'app-timer', name: 'Digital Electronic Stopwatch', type: 'STOPWATCH', specifications: 'Quartz timer with lap memory', uncertaintyResolution: '±0.01 s', accessibleDescription: 'Digital electronic timer with high-contrast display' },
    ],
    table: {
      columns: [
        { id: 'col-l', name: 'Length (L)', symbol: 'L', unit: 'm', isIndependent: true, uncertainty: 0.001 },
        { id: 'col-t', name: 'Periodic Time Squared (T²)', symbol: 'T²', unit: 's²', isIndependent: false, uncertainty: 0.02 },
      ],
      rows: [
        { 'col-l': 0.2, 'col-t': 0.81 },
        { 'col-l': 0.4, 'col-t': 1.62 },
        { 'col-l': 0.6, 'col-t': 2.41 },
        { 'col-l': 0.8, 'col-t': 3.23 },
        { 'col-l': 1.0, 'col-t': 4.02 },
      ],
    },
    graph: {
      xAxis: { label: 'Length', symbol: 'L', unit: 'm', min: 0, max: 1.2 },
      yAxis: { label: 'Periodic Time Squared', symbol: 'T²', unit: 's²', min: 0, max: 5.0 },
    },
  });

  const render = () => {
    if (!active) return;
    root.innerHTML = `
      <div class="standalone-lab-container g9-experiment-lab" style="display:flex;flex-direction:column;gap:1.5rem;max-width:1400px;margin:0 auto;padding:1.5rem;box-sizing:border-box;">
        <header style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:1rem;padding-bottom:1.25rem;border-bottom:2px solid #e2e8f0;">
          <div>
            <div style="display:flex;gap:8px;font-size:0.9rem;color:#64748b;margin-bottom:0.25rem;">
              <a href="#/home" style="color:#0284c7;text-decoration:none;font-weight:600;">Home</a> &gt; 
              <a href="#/subject/physics" style="color:#0284c7;text-decoration:none;font-weight:600;">Physics</a> &gt; 
              <span>Experimental &amp; Graph Workspace</span>
            </div>
            <h1 style="margin:0;font-size:1.85rem;font-weight:800;color:#0f172a;">📊 Simple Pendulum Gravity Measurement</h1>
            <p style="margin:0.25rem 0 0;color:#475569;font-size:1rem;">Workpack A29 Experimental Data Modeling &amp; Least-Squares Regression</p>
          </div>
          <button type="button" id="btn-return-topic" style="min-height:${HIT_TARGET_MIN_PX}px;padding:8px 16px;background:#0f172a;color:white;border:none;border-radius:6px;cursor:pointer;font-weight:700;">← Return to Physics</button>
        </header>

        <div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:8px;padding:0.75rem 1.25rem;display:flex;align-items:center;gap:12px;">
          <span style="font-size:1.25rem;">ℹ️</span>
          <div style="font-size:0.95rem;color:#1e40af;">
            <strong>Workpack A29 · Pedagogical Invariant</strong> — Experimental design and least-squares regression derivations require human domain evaluation. Score is withheld (points: null, REVIEW_PENDING).
          </div>
        </div>

        <div id="experiment-content" style="background:#ffffff;border:1px solid #cbd5e1;border-radius:12px;padding:1.5rem;box-shadow:0 1px 3px rgba(0,0,0,0.05);">
          ${ctrl.render()}
        </div>

        <div style="display:flex;justify-content:space-between;align-items:center;margin-top:1.5rem;padding-top:1rem;border-top:1px solid #e2e8f0;flex-wrap:wrap;gap:8px;">
          <button type="button" id="btn-evaluate-experiment" style="min-height:${HIT_TARGET_MIN_PX}px;padding:10px 20px;background:#0284c7;color:white;border:none;border-radius:6px;font-weight:700;cursor:pointer;">
            Submit for Domain Review
          </button>
          <span style="font-size:0.85rem;color:#64748b;">Human Domain Evaluation Required</span>
        </div>
        <div id="experiment-evaluation-slot"></div>
      </div>
    `;

    bindEvents();
  };

  const bindEvents = () => {
    root.querySelector<HTMLButtonElement>('#btn-return-topic')?.addEventListener('click', () => {
      if (onNavigate) onNavigate('subject/physics');
      else window.location.hash = '#/subject/physics';
    });

    root.querySelectorAll<HTMLButtonElement>('.exp-tab-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const tab = btn.dataset.tab as any;
        if (tab) {
          ctrl.setActiveTab(tab);
          render();
        }
      });
    });

    root.querySelector<HTMLButtonElement>('#btn-evaluate-experiment')?.addEventListener('click', () => {
      const evalResult = ctrl.evaluate();
      const evalSlot = root.querySelector('#experiment-evaluation-slot');
      if (evalSlot) {
        evalSlot.innerHTML = `
          <div class="experiment-evaluation-panel" style="margin-top:1rem;padding:1rem;background:#fef3c7;border:1px solid #fde68a;border-radius:8px;">
            <div style="display:flex;gap:8px;align-items:center;margin-bottom:6px;">
              <span style="font-weight:800;color:#92400e;">Status: ${escapeHtml(evalResult.status)}</span>
              <span style="font-size:0.85rem;color:#78350f;">(Score withheld, points: ${evalResult.points})</span>
            </div>
            <p style="margin:0;font-size:0.9rem;color:#78350f;">${escapeHtml(evalResult.feedback)}</p>
          </div>
        `;
      }
    });
  };

  render();

  return {
    dispose: () => {
      active = false;
      root.replaceChildren();
    },
  };
}

export function mountStandaloneLab(
  root: HTMLElement,
  rawLabId: string,
  onNavigate?: (route: string) => void
): { dispose: () => void } {
  const labId = (rawLabId || '').toLowerCase();

  if (labId.includes('circles')) {
    const c = new CirclesMasterController();
    return mountCirclesMaster(root, c, onNavigate);
  }

  if (labId.includes('linear-coordinates') || labId === 'lab:linear-coordinates') {
    return mountLinearCoordinatesWorkbench(root, undefined, onNavigate);
  }

  if (labId.includes('riemann')) {
    return mountPortableLab(
      root,
      RIEMANN_SUMS_PACKAGE,
      'Riemann Sums — Partition Refinement Workbench',
      '#/subject/mathematics/topic/riemann/labs',
      onNavigate
    );
  }

  if (labId.includes('division') || labId.includes('long-division')) {
    return mountPortableLab(
      root,
      LONG_DIVISION_PACKAGE,
      'Long Division — Multi-Step Arithmetic Scaffold',
      '#/subject/mathematics/topic/polynomials/labs',
      onNavigate
    );
  }

  if (labId.includes('redox-adaptive') || labId === 'lab:redox-adaptive') {
    const c = new RedoxAdaptiveController();
    return mountRedoxAdaptive(root, c, onNavigate);
  }

  if (labId.includes('redox-equivalence') || labId === 'lab:redox-equivalence') {
    return mountPortableLab(
      root,
      REDOX_ELECTRON_EQUIVALENCE_PACKAGE,
      'Redox Electron Equivalence — Portable Proof Workbench',
      '#/subject/chemistry/topic/chem-redox/labs',
      onNavigate
    );
  }

  if (labId.includes('titrat') || labId === 'lab:titration-simulator') {
    const c = new TitrationSimulatorController();
    return mountTitrationSimulator(root, c, onNavigate);
  }

  if (labId.includes('gas-laws') || labId.includes('gases') || labId === 'lab:gas-laws-suite') {
    return mountGasLawsWorkbench(root, undefined, onNavigate);
  }

  if (labId.includes('chemical-bonding') || labId.includes('bonding-atlas') || labId === 'lab:chemical-bonding-atlas') {
    return mountChemicalBondingWorkbench(root, undefined, onNavigate);
  }

  if (labId.includes('mole-concept') || labId.includes('stoichiometr') || labId === 'lab:mole-concept-reactor') {
    return mountMoleConceptWorkbench(root, undefined, onNavigate);
  }

  if (labId.includes('motion-1d-suite') || labId === 'lab:motion-1d-suite') {
    return mountMotionSuite(root, undefined, onNavigate);
  }

  if (labId.includes('vector-algebra') || labId === 'lab:vector-algebra-3d') {
    return mountVectorAlgebraWorkbench(root, undefined, onNavigate);
  }

  if (labId.includes('fluid-pressure') || labId.includes('thrust') || labId === 'lab:fluid-pressure-thrust') {
    return mountFluidPressureWorkbench(root, undefined, onNavigate);
  }

  if (labId.includes('motion-in-a-plane') || labId === 'lab:motion-in-a-plane') {
    const c = new MotionPlaneController();
    return mountMotionPlane(root, c, onNavigate);
  }

  if (labId.includes('motion-shared-clock') || labId === 'lab:motion-shared-clock') {
    return mountPortableLab(
      root,
      MOTION_SHARED_CLOCK_PACKAGE,
      'Motion Shared Clock — Independent Components Workbench',
      '#/subject/physics/topic/circular-banking/labs',
      onNavigate
    );
  }

  if (labId.includes('experiment-graph') || labId.includes('experimental-graph-workspace') || labId === 'lab:experiment-graph') {
    return mountExperimentLab(root, onNavigate);
  }

  // Fallback for generic or unmapped labs
  root.innerHTML = `
    <div style="padding:2rem;text-align:center;color:#64748b;background:#ffffff;border-radius:12px;margin:2rem auto;max-width:800px;">
      <h2>Standalone Lab: ${escapeHtml(rawLabId)}</h2>
      <p>Lab descriptor is on HOLD pending technical package binding.</p>
      <button type="button" onclick="window.location.hash='#/home'" style="min-height:${HIT_TARGET_PRIMARY_PX}px;padding:12px 24px;background:#0f172a;color:white;border:none;border-radius:8px;font-weight:700;cursor:pointer;">← Return to Curriculum Home</button>
    </div>
  `;
  return {
    dispose: () => {
      root.replaceChildren();
    },
  };
}
