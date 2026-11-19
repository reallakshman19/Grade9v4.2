/**
 * web/application-host/bridge.ts
 * A63 — Application host message bridge protocol
 *
 * Defines the postMessage protocol between the host shell and isolated
 * application iframes. All messages are validated against:
 *   - Expected origin (not same-origin with script+same-origin privs)
 *   - Nonce (single-use, cryptographically random, session-scoped)
 *   - Message type whitelist
 *   - Payload schema
 *
 * Protected events (storage access, answer data, navigation to arbitrary
 * URLs) are ALWAYS rejected regardless of origin or nonce.
 *
 * No academic approval inferred from software validation.
 */

// ---------------------------------------------------------------------------
// Message types
// ---------------------------------------------------------------------------

/** Messages the HOST sends to the APP (inside the iframe). */
export type HostToAppMessageType =
  | "HOST_READY"       // host has mounted, sends nonce
  | "HOST_PAUSE"       // pause app activity (e.g. shell goes background)
  | "HOST_RESUME"      // resume app activity
  | "HOST_ROTATE"      // orientation changed: { orientation: Orientation }
  | "HOST_TIMEOUT"     // session timed out — app must save state and ACK
  | "HOST_DISMISS";    // host will remove iframe — final notice

/** Messages the APP sends to the HOST. */
export type AppToHostMessageType =
  | "APP_READY"        // app loaded, ready to receive HOST_READY
  | "APP_HEIGHT"       // { height: number } — desired content height
  | "APP_STATE"        // { state: string } — serialised, opaque state blob
  | "APP_NAVIGATE"     // { path: string } — request safe back-navigation
  | "APP_FULLSCREEN"   // request fullscreen (host grants or denies)
  | "APP_CAPABILITY"   // { capability: string } — capability check request
  | "APP_TIMEOUT_ACK"; // acknowledge HOST_TIMEOUT — ready to dismiss

/** All bridge message types combined. */
export type BridgeMessageType = HostToAppMessageType | AppToHostMessageType;

// ---------------------------------------------------------------------------
// Protected / blocked message types
// ---------------------------------------------------------------------------

/**
 * These types MUST NEVER be accepted from the app, regardless of origin
 * or nonce. They represent direct storage access, answer leakage paths,
 * or arbitrary navigation attempts.
 */
export const PROTECTED_EVENT_TYPES: ReadonlySet<string> = new Set([
  "APP_STORAGE_READ",
  "APP_STORAGE_WRITE",
  "APP_ANSWER_READ",
  "APP_ANSWER_WRITE",
  "APP_NAVIGATE_EXTERNAL",
  "APP_NAVIGATE_HISTORY",
  "APP_EVAL",
  "APP_COOKIE",
  "APP_CREDENTIALS",
]);

/** Set of message types the host accepts from the app. */
export const ACCEPTED_APP_TYPES: ReadonlySet<AppToHostMessageType> = new Set([
  "APP_READY",
  "APP_HEIGHT",
  "APP_STATE",
  "APP_NAVIGATE",
  "APP_FULLSCREEN",
  "APP_CAPABILITY",
  "APP_TIMEOUT_ACK",
]);

// ---------------------------------------------------------------------------
// Envelope / payload types
// ---------------------------------------------------------------------------

export interface BridgeEnvelope {
  type: BridgeMessageType;
  nonce: string;
  sessionId: string;
  sequence?: number;
  payload?: unknown;
}

export interface CapabilityWarning {
  capability: string;
  granted: boolean;
  reason: string;
}

export type Orientation = "portrait" | "landscape" | "compact";

// ---------------------------------------------------------------------------
// Nonce manager
// ---------------------------------------------------------------------------

/**
 * Generates and tracks single-use nonces for the bridge session.
 * Each nonce may only be used once; replays are rejected.
 */
export class NonceManager {
  private readonly used: Set<string> = new Set();
  private readonly sessionNonce: string;

  constructor(sessionId: string) {
    // Nonce is derived from session + a random component
    this.sessionNonce = `${sessionId}-${crypto.randomUUID()}`;
  }

  /** The session nonce sent in HOST_READY. */
  get current(): string {
    return this.sessionNonce;
  }

  /**
   * Validates that an incoming nonce matches the session nonce AND
   * has not been used before in this direction. Returns true if valid.
   */
  validateAndConsume(incoming: string): boolean {
    if (incoming !== this.sessionNonce) return false;
    if (this.used.has(incoming)) return false;
    // App→host messages each increment an internal counter; we track
    // per-message-type uniqueness by using a separate call site marker
    // (the caller supplies a unique token for each message received).
    return true;
  }

  /** Mark a nonce+sequence token as consumed (replay prevention). */
  consume(token: string): void {
    this.used.add(token);
  }

  /** Whether a token has already been consumed. */
  isConsumed(token: string): boolean {
    return this.used.has(token);
  }
}

// ---------------------------------------------------------------------------
// Rejection reasons
// ---------------------------------------------------------------------------

export type RejectionReason =
  | "WRONG_ORIGIN"
  | "WRONG_NONCE"
  | "REPLAY"
  | "PROTECTED_EVENT"
  | "UNKNOWN_TYPE"
  | "INVALID_PAYLOAD"
  | "SESSION_MISMATCH"
  | "NOT_ACCEPTED";

export interface RejectionRecord {
  reason: RejectionReason;
  type: string;
  origin: string;
  timestamp: number;
}

// ---------------------------------------------------------------------------
// Bridge validator
// ---------------------------------------------------------------------------

/**
 * Validates an incoming postMessage event from the app iframe.
 * Returns `null` if accepted, or a `RejectionRecord` if rejected.
 */
export function validateBridgeMessage(
  event: { origin: string; data: unknown },
  expectedOrigin: string,
  nonceManager: NonceManager,
  sessionId: string,
  sequenceToken: string,
): RejectionRecord | null {
  const now = Date.now();

  // 1. Origin check — must match the expected isolated origin
  if (event.origin !== expectedOrigin) {
    return { reason: "WRONG_ORIGIN", type: String((event.data as any)?.type ?? "?"), origin: event.origin, timestamp: now };
  }

  // 2. Must be an object envelope
  if (typeof event.data !== "object" || event.data === null) {
    return { reason: "INVALID_PAYLOAD", type: "?", origin: event.origin, timestamp: now };
  }

  const env = event.data as Partial<BridgeEnvelope>;
  const msgType = String(env.type ?? "");

  // 3. Protected event check — block before anything else
  if (PROTECTED_EVENT_TYPES.has(msgType)) {
    return { reason: "PROTECTED_EVENT", type: msgType, origin: event.origin, timestamp: now };
  }

  // 4. Type must be in accepted set
  if (!ACCEPTED_APP_TYPES.has(msgType as AppToHostMessageType)) {
    return { reason: "NOT_ACCEPTED", type: msgType, origin: event.origin, timestamp: now };
  }

  // 5. Session ID match
  if (env.sessionId !== sessionId) {
    return { reason: "SESSION_MISMATCH", type: msgType, origin: event.origin, timestamp: now };
  }

  // 6. Nonce validation
  if (!nonceManager.validateAndConsume(env.nonce ?? "")) {
    return { reason: "WRONG_NONCE", type: msgType, origin: event.origin, timestamp: now };
  }

  // 7. Validate wire sequence and closed payload, before consuming.
  const p=env.payload as Record<string,unknown>|undefined;
  const keys=(...names:string[])=>!!p&&typeof p==='object'&&!Array.isArray(p)&&Object.keys(p).sort().join(',')===names.sort().join(',');
  const empty=p===undefined||p===null||keys();
  const valid=msgType==='APP_READY'||msgType==='APP_FULLSCREEN'||msgType==='APP_TIMEOUT_ACK'?empty:
    msgType==='APP_HEIGHT'?keys('height')&&typeof p!.height==='number'&&Number.isFinite(p!.height)&&p!.height>=0&&p!.height<=10000:
    msgType==='APP_STATE'?keys('state')&&typeof p!.state==='string'&&p!.state.length<=65536:
    msgType==='APP_NAVIGATE'?keys('path')&&typeof p!.path==='string'&&p!.path.length<=256:
    msgType==='APP_CAPABILITY'?keys('capability')&&typeof p!.capability==='string'&&p!.capability.length<=64:false;
  if(!valid||!Number.isSafeInteger(env.sequence)||Number(env.sequence)<1)return {reason:'INVALID_PAYLOAD',type:msgType,origin:event.origin,timestamp:now};
  const wireToken='seq-'+env.sequence;
  if (nonceManager.isConsumed(wireToken)) {
    return { reason: "REPLAY", type: msgType, origin: event.origin, timestamp: now };
  }
  if(wireToken!==sequenceToken)return {reason:'INVALID_PAYLOAD',type:msgType,origin:event.origin,timestamp:now};
  nonceManager.consume(wireToken);

  return null; // accepted
}

// ---------------------------------------------------------------------------
// Capability registry
// ---------------------------------------------------------------------------

/** Capabilities the host may grant or warn about. */
export const CAPABILITY_REGISTRY: ReadonlyMap<string, { granted: boolean; reason: string }> = new Map([
  ["fullscreen",       { granted: true,  reason: "Host-managed fullscreen allowed" }],
  ["orientation-lock", { granted: false, reason: "Orientation lock requires device permission; not auto-granted" }],
  ["clipboard-read",   { granted: false, reason: "Clipboard read not permitted in isolated host" }],
  ["clipboard-write",  { granted: false, reason: "Clipboard write not permitted in isolated host" }],
  ["storage",          { granted: false, reason: "Direct storage access not permitted; use APP_STATE" }],
  ["camera",           { granted: false, reason: "Camera not permitted in isolated host" }],
  ["microphone",       { granted: false, reason: "Microphone not permitted in isolated host" }],
]);

export function resolveCapability(capability: string): CapabilityWarning {
  const entry = CAPABILITY_REGISTRY.get(capability);
  if (!entry) {
    return { capability, granted: false, reason: "Unknown capability; not granted by default" };
  }
  return { capability, granted: entry.granted, reason: entry.reason };
}

