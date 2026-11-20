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
