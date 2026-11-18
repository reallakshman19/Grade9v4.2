/**
 * web/runtime/session.ts
 * A19 – Session and assessment policy controller
 *
 * Manages session lifecycle: creation, state transitions, cursor advance,
 * attempt append linkage, timer start/stop, session mode enforcement, paper
 * rules, and recovery return routing.
 *
 * No academic approval inferred from software validation.
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type SessionMode = "LEARN" | "PRACTICE" | "SIMULATED_EXAM";
export type SessionState = "CREATED" | "ACTIVE" | "TIMED_OUT" | "COMPLETED" | "RECOVERY";

export interface SessionConfig {
  readonly sessionId: string;
  readonly mode: SessionMode;
  /** Duration in milliseconds; undefined means no timer. */
  readonly durationMs?: number;
  /** Revision hash of the content set loaded for this session. */
  readonly contentRevision: string;
}

export interface AttemptRecord {
  readonly questionId: string;
  readonly attemptId: string;
  readonly committedAt: number;
}

export interface SessionSnapshot {
  readonly sessionId: string;
  readonly mode: SessionMode;
  readonly state: SessionState;
  readonly contentRevision: string;
  readonly cursorIndex: number;
  readonly attempts: readonly AttemptRecord[];
  readonly startedAt: number | null;
  readonly endedAt: number | null;
  readonly remainingMs: number | null;
}

export interface SessionResult {
  readonly sessionId: string;
  readonly state: SessionState;
  readonly recoveryRoute: string | null;
}

// ---------------------------------------------------------------------------
// Errors
// ---------------------------------------------------------------------------

export class SessionError extends Error {
  readonly code: string;
  constructor(code: string, message: string) {
    super(message);
    this.name = "SessionError";
    this.code = code;
  }
}

// ---------------------------------------------------------------------------
// Session
// ---------------------------------------------------------------------------

export class Session {
  private readonly config: SessionConfig;
  private state: SessionState = "CREATED";
  private cursorIndex = 0;
  private readonly attempts: AttemptRecord[] = [];
  private startedAt: number | null = null;
  private endedAt: number | null = null;
  private timerHandle: ReturnType<typeof setTimeout> | null = null;
  private elapsedAtPause = 0;
  private timerStartWall: number | null = null;
  private timerExpiredAt: number | null = null;
  private onTimeoutCallback: (() => void) | null = null;

  constructor(config: SessionConfig) {
    this.config = config;
  }

  // -------------------------------------------------------------------------
  // State
  // -------------------------------------------------------------------------

  getState(): SessionState {
    return this.state;
  }

  snapshot(): SessionSnapshot {
    return {
      sessionId: this.config.sessionId,
      mode: this.config.mode,
      state: this.state,
      contentRevision: this.config.contentRevision,
      cursorIndex: this.cursorIndex,
      attempts: [...this.attempts],
      startedAt: this.startedAt,
      endedAt: this.endedAt,
      remainingMs: this._computeRemainingMs(),
    };
  }

  private _computeRemainingMs(): number | null {
    if (this.config.durationMs === undefined) return null;
    if (this.timerExpiredAt !== null) return 0;
    const elapsed = this.elapsedAtPause +
      (this.timerStartWall !== null ? Date.now() - this.timerStartWall : 0);
    const remaining = this.config.durationMs - elapsed;
    return Math.max(0, remaining);
  }

  // -------------------------------------------------------------------------
  // Lifecycle
  // -------------------------------------------------------------------------

  start(onTimeout?: () => void): void {
    if (this.state !== "CREATED") {
      throw new SessionError("INVALID_TRANSITION", `Cannot start session in state ${this.state}`);
    }
    this.state = "ACTIVE";
    this.startedAt = Date.now();
    this.onTimeoutCallback = onTimeout ?? null;
    this._startTimer();
  }

  private _startTimer(): void {
    if (this.config.durationMs === undefined) return;
    const remaining = this._computeRemainingMs();
    if (remaining === null || remaining <= 0) {
      this._handleTimeout();
      return;
    }
    this.timerStartWall = Date.now();
    this.timerHandle = setTimeout(() => {
      this.timerStartWall = null;
      this._handleTimeout();
    }, remaining);
  }

  private _stopTimer(): void {
    if (this.timerHandle !== null) {
      clearTimeout(this.timerHandle);
      this.timerHandle = null;
    }
    if (this.timerStartWall !== null) {
      this.elapsedAtPause += Date.now() - this.timerStartWall;
      this.timerStartWall = null;
    }
  }

  private _handleTimeout(): void {
    if (this.state !== "ACTIVE") return;
    this.timerExpiredAt = Date.now();
    this.state = "TIMED_OUT";
    this.endedAt = this.timerExpiredAt;
    if (this.onTimeoutCallback) {
      this.onTimeoutCallback();
    }
  }

  /**
   * Pause the session timer (e.g., during a save round-trip).
   * State remains ACTIVE; timer is frozen.
   */
  pauseTimer(): void {
    if (this.state !== "ACTIVE") {
      throw new SessionError("INVALID_STATE", `Cannot pause timer in state ${this.state}`);
    }
    this._stopTimer();
  }

  /**
   * Resume the session timer after a pause.
   */
  resumeTimer(): void {
    if (this.state !== "ACTIVE") {
      throw new SessionError("INVALID_STATE", `Cannot resume timer in state ${this.state}`);
    }
    this._startTimer();
  }

  /**
   * Complete the session normally.
   */
  complete(): void {
    if (this.state !== "ACTIVE") {
      throw new SessionError("INVALID_TRANSITION", `Cannot complete session in state ${this.state}`);
    }
    this._stopTimer();
    this.state = "COMPLETED";
    this.endedAt = Date.now();
  }

  /**
   * Transition to RECOVERY state (e.g., reload after crash).
   * Returns the recovery route token.
   */
  recover(): SessionResult {
    if (this.state !== "ACTIVE" && this.state !== "TIMED_OUT") {
      throw new SessionError("INVALID_TRANSITION", `Cannot recover session in state ${this.state}`);
    }
    this._stopTimer();
    this.state = "RECOVERY";
    this.endedAt = Date.now();
    return {
      sessionId: this.config.sessionId,
      state: "RECOVERY",
      recoveryRoute: `recovery://${this.config.sessionId}/${this.cursorIndex}`,
    };
  }

  // -------------------------------------------------------------------------
  // Cursor and attempts
  // -------------------------------------------------------------------------

  /**
   * Advance the cursor to the next question index.
   * Only allowed in ACTIVE state.
   */
  advanceCursor(): number {
    if (this.state !== "ACTIVE") {
      throw new SessionError("INVALID_STATE", `Cannot advance cursor in state ${this.state}`);
    }
    this.cursorIndex += 1;
    return this.cursorIndex;
  }

  /**
   * Append a committed attempt record for a question.
   * Idempotent per questionId — a second append for the same questionId is
   * rejected (N21: double submit yields one attempt event).
   */
  appendAttempt(record: AttemptRecord): void {
    if (this.state !== "ACTIVE") {
      throw new SessionError("INVALID_STATE", `Cannot record attempt in state ${this.state}`);
    }
    const existing = this.attempts.find(a => a.questionId === record.questionId);
    if (existing) {
      throw new SessionError(
        "DUPLICATE_ATTEMPT",
        `N21: attempt for question ${record.questionId} already recorded; double submit rejected`
      );
    }
    this.attempts.push(record);
  }

  // -------------------------------------------------------------------------
  // Policy queries (delegated to paper-rule awareness)
  // -------------------------------------------------------------------------

  /**
   * Returns true if hints are permitted for the current session mode.
   * N15: hints are explicitly disabled in SIMULATED_EXAM mode.
   */
  hintsPermitted(): boolean {
    return this.config.mode !== "SIMULATED_EXAM";
  }

  /**
   * Returns true if the session allows disclosure (correctness reveal /
   * solution display) BEFORE a committed save.
   * Policy: disclosure is never permitted without a committed transaction.
   */
  disclosurePermittedBeforeSave(): boolean {
    return false; // Always blocked; caller must confirm save first.
  }
}

// ---------------------------------------------------------------------------
// Factory
// ---------------------------------------------------------------------------

export function createSession(config: SessionConfig): Session {
  return new Session(config);
}
