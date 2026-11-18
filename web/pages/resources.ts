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
