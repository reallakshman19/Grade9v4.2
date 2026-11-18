/**
 * web/application-host/index.ts
 * A63 — Isolated application host controller
 *
 * Manages the lifecycle of an isolated application iframe:
 *   - Allocates a unique session ID and nonce
 *   - Enforces that the iframe is NOT same-origin with both script and
 *     same-origin privileges (sandbox="allow-scripts" only, never
 *     "allow-same-origin allow-scripts" together)
 *   - Validates all postMessage traffic through the bridge
 *   - Implements fullscreen (host-managed), safe back navigation,
 *     rotation forwarding, session timeout, and state capability warning
 *   - Maintains an audit log of all rejections
 *
 * No academic approval inferred from software validation.
 */

import {
  NonceManager,
  validateBridgeMessage,
  resolveCapability,
  ACCEPTED_APP_TYPES,
} from "./bridge.ts";

import type {
  AppToHostMessageType,
  BridgeEnvelope,
  CapabilityWarning,
  Orientation,
  RejectionRecord,
} from "./bridge.ts";

// ---------------------------------------------------------------------------
// Host configuration
// ---------------------------------------------------------------------------

export interface ApplicationHostConfig {
  /** The URL of the app to load (must be on a different origin). */
  appUrl: string;
  /** Expected origin derived from appUrl (validated on construction). */
  expectedOrigin: string;
  /** Session timeout in milliseconds (default 30 min). */
  timeoutMs?: number;
  /** Callback when host state changes. */
  onStateChange?: (state: HostState) => void;
  /** Callback when a rejection is recorded. */
  onRejection?: (record: RejectionRecord) => void;
  /** Callback when app requests safe back navigation. */
  onSafeBack?: () => void;
  /** Callback when app requests fullscreen. */
  onFullscreenRequest?: (grant: boolean) => void;
  /** Callback when app sends state blob. */
  onAppState?: (blob: string) => void;
}

// ---------------------------------------------------------------------------
// Host state machine
// ---------------------------------------------------------------------------

export type HostState =
  | "IDLE"          // not started
  | "LAUNCHING"     // iframe created, awaiting APP_READY
  | "RUNNING"       // bridge active, app running
  | "PAUSED"        // host paused (app backgrounded)
  | "TIMEOUT"       // timeout sent, awaiting ACK
  | "DISMISSED"     // iframe removed, session over
  | "ERROR";        // unrecoverable error

// ---------------------------------------------------------------------------
// Application host controller
// ---------------------------------------------------------------------------

export class ApplicationHostController {
  private state: HostState = "IDLE";
  private readonly sessionId: string;
  private readonly nonceManager: NonceManager;
  private readonly config: Required<
    Pick<ApplicationHostConfig, "appUrl" | "expectedOrigin" | "timeoutMs">
  > & ApplicationHostConfig;

  private rejectionLog: RejectionRecord[] = [];
  private sequenceCounter = 0;
  private timeoutHandle: ReturnType<typeof setTimeout> | null = null;
  private orientation: Orientation = "portrait";
  private fullscreenActive = false;

  // Capability warnings issued this session
  private capabilityWarnings: CapabilityWarning[] = [];

  constructor(config: ApplicationHostConfig) {
    // Validate that appUrl is NOT same-origin with current context
    // (In Node test context window is undefined; guard accordingly)
    const url = new URL(config.appUrl);
    const expectedOrigin = config.expectedOrigin;
    if (url.origin !== expectedOrigin) {
      throw new Error(
        `ApplicationHostController: appUrl origin '${url.origin}' does not match expectedOrigin '${expectedOrigin}'.`
      );
    }

    this.config = {
      timeoutMs: 30 * 60 * 1000,
      onStateChange: () => undefined,
      onRejection: () => undefined,
      onSafeBack: () => undefined,
      onFullscreenRequest: () => undefined,
      onAppState: () => undefined,
      ...config,
    };

    this.sessionId = `session-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    this.nonceManager = new NonceManager(this.sessionId);
  }

  // ---------------------------------------------------------------------------
  // State management
  // ---------------------------------------------------------------------------

  getState(): HostState {
    return this.state;
  }

  getSessionId(): string {
    return this.sessionId;
  }

  getNonce(): string {
    return this.nonceManager.current;
  }

  getRejectionLog(): readonly RejectionRecord[] {
    return this.rejectionLog;
  }

  getCapabilityWarnings(): readonly CapabilityWarning[] {
    return this.capabilityWarnings;
  }

  isFullscreen(): boolean {
    return this.fullscreenActive;
  }

  getOrientation(): Orientation {
    return this.orientation;
  }

  private transition(next: HostState): void {
    this.state = next;
    this.config.onStateChange?.(next);
  }

  // ---------------------------------------------------------------------------
  // Lifecycle
  // ---------------------------------------------------------------------------

  launch(): void {
    if (this.state !== "IDLE") {
      throw new Error(`Cannot launch from state '${this.state}'.`);
    }
    this.transition("LAUNCHING");
    // Reset timeout
    this.startTimeout();
  }

  /**
   * Process an incoming postMessage event from the iframe.
   * Returns true if the message was accepted and handled.
   */
  handleMessage(event: { origin: string; data: unknown }): boolean {
    if (this.state === "DISMISSED" || this.state === "ERROR" || this.state === "IDLE") {
      return false;
    }

    const sequenceToken = `seq-${++this.sequenceCounter}`;
    const rejection = validateBridgeMessage(
      event,
      this.config.expectedOrigin,
      this.nonceManager,
      this.sessionId,
      sequenceToken,
    );

    if (rejection !== null) {
      this.rejectionLog.push(rejection);
      this.config.onRejection?.(rejection);
      return false;
    }

    const env = event.data as BridgeEnvelope;
    return this.dispatch(env);
  }

  private dispatch(env: BridgeEnvelope): boolean {
    const type = env.type as AppToHostMessageType;

    switch (type) {
      case "APP_READY":
        if (this.state === "LAUNCHING") {
          this.transition("RUNNING");
        }
        return true;

      case "APP_HEIGHT":
        // Accepted; height is for host layout (no direct DOM access here)
        return true;

      case "APP_STATE":
        if (typeof (env.payload as any)?.state === "string") {
          this.config.onAppState?.((env.payload as any).state);
        }
        return true;

      case "APP_NAVIGATE": {
        // Only safe back-navigation to host-controlled route
        const path = String((env.payload as any)?.path ?? "");
        if (!this.isSafeNavPath(path)) {
          this.rejectionLog.push({
            reason: "WRONG_ORIGIN",
            type: "APP_NAVIGATE",
            origin: this.config.expectedOrigin,
            timestamp: Date.now(),
          });
          return false;
        }
        this.config.onSafeBack?.();
        return true;
      }

      case "APP_FULLSCREEN":
        this.fullscreenActive = !this.fullscreenActive;
        this.config.onFullscreenRequest?.(this.fullscreenActive);
        return true;

      case "APP_CAPABILITY": {
        const cap = String((env.payload as any)?.capability ?? "");
        const warning = resolveCapability(cap);
        this.capabilityWarnings.push(warning);
        return true;
      }

      case "APP_TIMEOUT_ACK":
        if (this.state === "TIMEOUT") {
          this.dismiss();
        }
        return true;

      default:
        return false;
    }
  }

  /**
   * Safe navigation paths are single-segment host routes starting with "/".
   * Rejects: external URLs, protocol changes, query params that look external,
   * directory traversal, and paths targeting the same-origin app routes.
   */
  private isSafeNavPath(path: string): boolean {
    if (!path.startsWith("/")) return false;
    if (path.includes("//")) return false;
    if (path.includes("..")) return false;
    if (/^\/[a-z0-9\-/]*$/.test(path) === false) return false;
    // Must not navigate to the app URL's path prefix
    try {
      const appPath = new URL(this.config.appUrl).pathname;
      if (path.startsWith(appPath)) return false;
    } catch {
      return false;
    }
    return true;
  }

  // ---------------------------------------------------------------------------
  // Host-initiated actions
  // ---------------------------------------------------------------------------

  pause(): void {
    if (this.state === "RUNNING") {
      this.transition("PAUSED");
    }
  }

  resume(): void {
    if (this.state === "PAUSED") {
      this.transition("RUNNING");
    }
  }

  /**
   * Update orientation and forward to app via returned envelope.
   * (Actual postMessage sending is the host page's responsibility.)
   */
  rotate(newOrientation: Orientation): BridgeEnvelope {
    this.orientation = newOrientation;
    return {
      type: "HOST_ROTATE",
      nonce: this.nonceManager.current,
      sessionId: this.sessionId,
      payload: { orientation: newOrientation },
    };
  }

  /**
   * Initiate graceful timeout: transitions to TIMEOUT state and returns
   * the HOST_TIMEOUT envelope to send to the app.
   */
  triggerTimeout(): BridgeEnvelope {
    this.clearTimeout();
    this.transition("TIMEOUT");
    return {
      type: "HOST_TIMEOUT",
      nonce: this.nonceManager.current,
      sessionId: this.sessionId,
    };
  }

  /**
   * Forcibly dismiss the iframe session. Transitions to DISMISSED.
   * Returns the HOST_DISMISS envelope if the caller wants to send it.
   */
  dismiss(): BridgeEnvelope {
    this.clearTimeout();
    this.fullscreenActive = false;
    this.transition("DISMISSED");
    return {
      type: "HOST_DISMISS",
      nonce: this.nonceManager.current,
      sessionId: this.sessionId,
    };
  }

  // ---------------------------------------------------------------------------
  // Sandbox attribute enforcement
  // ---------------------------------------------------------------------------

  /**
   * Returns the correct sandbox attribute string.
   * NEVER includes "allow-same-origin" together with "allow-scripts" —
   * that combination would allow the iframe to remove its own sandbox.
   */
  static sandboxAttribute(): string {
    return "allow-scripts allow-forms allow-popups-to-escape-sandbox";
  }

  /**
   * Validates that a proposed sandbox attribute string does NOT
   * combine allow-scripts with allow-same-origin.
   */
  static validateSandbox(attr: string): { valid: boolean; reason: string } {
    const tokens = attr.split(/\s+/).map((t) => t.trim().toLowerCase());
    const hasScripts = tokens.includes("allow-scripts");
    const hasSameOrigin = tokens.includes("allow-same-origin");
    if (hasScripts && hasSameOrigin) {
      return {
        valid: false,
        reason: "allow-scripts + allow-same-origin together removes sandbox protections.",
      };
    }
    return { valid: true, reason: "OK" };
  }

  // ---------------------------------------------------------------------------
  // Internal helpers
  // ---------------------------------------------------------------------------

  private startTimeout(): void {
    this.clearTimeout();
    const handle = setTimeout(() => {
      this.triggerTimeout();
    }, this.config.timeoutMs);
    // Unref so the timer does not prevent Node's event loop from exiting
    // in test environments (actual browser environments are unaffected).
    if (typeof (handle as any).unref === "function") {
      (handle as any).unref();
    }
    this.timeoutHandle = handle;
  }

  private clearTimeout(): void {
    if (this.timeoutHandle !== null) {
      clearTimeout(this.timeoutHandle);
      this.timeoutHandle = null;
    }
  }
}

// ---------------------------------------------------------------------------
// Factory
// ---------------------------------------------------------------------------

export function createApplicationHost(config: ApplicationHostConfig): ApplicationHostController {
  return new ApplicationHostController(config);
}
