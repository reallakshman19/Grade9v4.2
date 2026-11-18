/**
 * tests/runtime/session.test.ts
 * A19 – Tests for Session lifecycle and Policy engine
 *
 * Covers: N15 (exam hints blocked), N21 (double submit),
 * timeout, recovery return, stale revision rejection, reload timer accuracy,
 * save failure blocks correctness reveal and solution display.
 *
 * No academic approval inferred from software validation.
 */

import { describe, it } from "node:test";
import assert from "node:assert/strict";

import {
  createSession,
  SessionError,
} from "../../web/runtime/session.ts";

import type { SessionConfig, AttemptRecord } from "../../web/runtime/session.ts";

import {
  checkHintPermission,
  checkCorrectnessReveal,
  checkSolutionDisplay,
  checkRevisionStaleness,
  checkSubmissionWindow,
  evaluatePolicy,
} from "../../web/runtime/policy.ts";

import type { PolicyContext } from "../../web/runtime/policy.ts";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function makeConfig(overrides: Partial<SessionConfig> = {}): SessionConfig {
  return {
    sessionId: "sess-001",
    mode: "PRACTICE",
    contentRevision: "rev-abc123",
    ...overrides,
  };
}

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// ---------------------------------------------------------------------------
// Session lifecycle
// ---------------------------------------------------------------------------

describe("Session – creation and state", () => {
  it("starts in CREATED state", () => {
    const s = createSession(makeConfig());
    assert.equal(s.getState(), "CREATED");
  });

  it("transitions to ACTIVE on start()", () => {
    const s = createSession(makeConfig());
    s.start();
    assert.equal(s.getState(), "ACTIVE");
  });

  it("records startedAt after start()", () => {
    const before = Date.now();
    const s = createSession(makeConfig());
    s.start();
    const snap = s.snapshot();
    assert.ok(snap.startedAt !== null);
    assert.ok(snap.startedAt >= before);
  });

  it("throws when start() called twice", () => {
    const s = createSession(makeConfig());
    s.start();
    assert.throws(
      () => s.start(),
      (e: unknown) => e instanceof SessionError && e.code === "INVALID_TRANSITION"
    );
  });

  it("completes from ACTIVE state", () => {
    const s = createSession(makeConfig());
    s.start();
    s.complete();
    assert.equal(s.getState(), "COMPLETED");
  });

  it("throws complete() when not ACTIVE", () => {
    const s = createSession(makeConfig());
    assert.throws(
      () => s.complete(),
      (e: unknown) => e instanceof SessionError && e.code === "INVALID_TRANSITION"
    );
  });
});

// ---------------------------------------------------------------------------
// Cursor and attempts
// ---------------------------------------------------------------------------

describe("Session – cursor and attempts", () => {
  it("advances cursor from 0 to 1", () => {
    const s = createSession(makeConfig());
    s.start();
    const idx = s.advanceCursor();
    assert.equal(idx, 1);
    assert.equal(s.snapshot().cursorIndex, 1);
  });

  it("throws cursor advance in non-ACTIVE state", () => {
    const s = createSession(makeConfig());
    assert.throws(
      () => s.advanceCursor(),
      (e: unknown) => e instanceof SessionError && e.code === "INVALID_STATE"
    );
  });

  it("appends a valid attempt record", () => {
    const s = createSession(makeConfig());
    s.start();
    const record: AttemptRecord = { questionId: "q1", attemptId: "a1", committedAt: Date.now() };
    s.appendAttempt(record);
    const snap = s.snapshot();
    assert.equal(snap.attempts.length, 1);
    assert.equal(snap.attempts[0].questionId, "q1");
  });

  it("throws when attempt recorded in non-ACTIVE state", () => {
    const s = createSession(makeConfig());
    assert.throws(
      () => s.appendAttempt({ questionId: "q1", attemptId: "a1", committedAt: Date.now() }),
      (e: unknown) => e instanceof SessionError && e.code === "INVALID_STATE"
    );
  });
});

// ---------------------------------------------------------------------------
// N21 – double submit
// ---------------------------------------------------------------------------

describe("N21 – double submit rejected (one attempt event)", () => {
  it("rejects second appendAttempt for same questionId", () => {
    const s = createSession(makeConfig());
    s.start();
    s.appendAttempt({ questionId: "q5", attemptId: "a5a", committedAt: Date.now() });
    assert.throws(
      () => s.appendAttempt({ questionId: "q5", attemptId: "a5b", committedAt: Date.now() }),
      (e: unknown) => e instanceof SessionError && e.code === "DUPLICATE_ATTEMPT"
    );
    // Exactly one attempt remains
    assert.equal(s.snapshot().attempts.length, 1);
  });

  it("allows attempts for different questionIds", () => {
    const s = createSession(makeConfig());
    s.start();
    s.appendAttempt({ questionId: "q1", attemptId: "a1", committedAt: Date.now() });
    s.appendAttempt({ questionId: "q2", attemptId: "a2", committedAt: Date.now() });
    assert.equal(s.snapshot().attempts.length, 2);
  });
});

// ---------------------------------------------------------------------------
// N15 – hints disabled in SIMULATED_EXAM
// ---------------------------------------------------------------------------

describe("N15 – timed exam hints produce no disclosure", () => {
  it("hintsPermitted() returns false for SIMULATED_EXAM", () => {
    const s = createSession(makeConfig({ mode: "SIMULATED_EXAM" }));
    s.start();
    assert.equal(s.hintsPermitted(), false);
  });

  it("hintsPermitted() returns true for LEARN", () => {
    const s = createSession(makeConfig({ mode: "LEARN" }));
    s.start();
    assert.equal(s.hintsPermitted(), true);
  });

  it("hintsPermitted() returns true for PRACTICE", () => {
    const s = createSession(makeConfig({ mode: "PRACTICE" }));
    s.start();
    assert.equal(s.hintsPermitted(), true);
  });

  it("checkHintPermission BLOCKED for SIMULATED_EXAM", () => {
    const r = checkHintPermission({ mode: "SIMULATED_EXAM" });
    assert.equal(r.verdict, "BLOCKED");
    assert.equal(r.rule, "P1_NO_HINTS_IN_EXAM");
    assert.ok(r.reason.includes("N15"));
  });

  it("checkHintPermission PERMITTED for PRACTICE", () => {
    const r = checkHintPermission({ mode: "PRACTICE" });
    assert.equal(r.verdict, "PERMITTED");
  });
});

// ---------------------------------------------------------------------------
// Save-before-disclosure policy
// ---------------------------------------------------------------------------

describe("Policy – save failure blocks correctness and solution", () => {
  it("disclosurePermittedBeforeSave() always returns false", () => {
    const s = createSession(makeConfig());
    s.start();
    assert.equal(s.disclosurePermittedBeforeSave(), false);
  });

  it("checkCorrectnessReveal BLOCKED when saveCommitted=false", () => {
    const r = checkCorrectnessReveal({ saveCommitted: false });
    assert.equal(r.verdict, "BLOCKED");
    assert.equal(r.rule, "P2_SAVE_BEFORE_CORRECTNESS");
    assert.ok(r.reason.includes("Save failure blocks correctness"));
  });

  it("checkCorrectnessReveal PERMITTED when saveCommitted=true", () => {
    const r = checkCorrectnessReveal({ saveCommitted: true });
    assert.equal(r.verdict, "PERMITTED");
  });

  it("checkSolutionDisplay BLOCKED when saveCommitted=false", () => {
    const r = checkSolutionDisplay({ saveCommitted: false });
    assert.equal(r.verdict, "BLOCKED");
    assert.equal(r.rule, "P3_SAVE_BEFORE_SOLUTION");
    assert.ok(r.reason.includes("Save failure blocks solution"));
  });

  it("checkSolutionDisplay PERMITTED when saveCommitted=true", () => {
    const r = checkSolutionDisplay({ saveCommitted: true });
    assert.equal(r.verdict, "PERMITTED");
  });
});

// ---------------------------------------------------------------------------
// Stale revision
// ---------------------------------------------------------------------------

describe("Policy – stale revision detection", () => {
  it("BLOCKED when session revision differs from live revision", () => {
    const r = checkRevisionStaleness({
      sessionRevision: "rev-old",
      liveRevision: "rev-new",
    });
    assert.equal(r.verdict, "BLOCKED");
    assert.equal(r.rule, "P4_STALE_REVISION");
    assert.ok(r.reason.includes("rev-old"));
    assert.ok(r.reason.includes("rev-new"));
  });

  it("PERMITTED when revisions match", () => {
    const r = checkRevisionStaleness({
      sessionRevision: "rev-123",
      liveRevision: "rev-123",
    });
    assert.equal(r.verdict, "PERMITTED");
  });
});

// ---------------------------------------------------------------------------
// Submission window (exam timeout)
// ---------------------------------------------------------------------------

describe("Policy – submission window after exam timeout", () => {
  it("BLOCKED when SIMULATED_EXAM and timed out", () => {
    const r = checkSubmissionWindow({ mode: "SIMULATED_EXAM", timedOut: true });
    assert.equal(r.verdict, "BLOCKED");
    assert.equal(r.rule, "P5_NO_LATE_EXAM_SUBMISSION");
  });

  it("PERMITTED when SIMULATED_EXAM and not timed out", () => {
    const r = checkSubmissionWindow({ mode: "SIMULATED_EXAM", timedOut: false });
    assert.equal(r.verdict, "PERMITTED");
  });

  it("PERMITTED when PRACTICE even if timed out flag is true", () => {
    const r = checkSubmissionWindow({ mode: "PRACTICE", timedOut: true });
    assert.equal(r.verdict, "PERMITTED");
  });
});

// ---------------------------------------------------------------------------
// Composite evaluatePolicy
// ---------------------------------------------------------------------------

describe("evaluatePolicy – composite checks", () => {
  it("allPermitted=true for clean PRACTICE session with save committed", () => {
    const ctx: PolicyContext = {
      mode: "PRACTICE",
      saveCommitted: true,
      sessionRevision: "rev-1",
      liveRevision: "rev-1",
      timedOut: false,
    };
    const result = evaluatePolicy(ctx);
    assert.equal(result.allPermitted, true);
  });

  it("allPermitted=false when exam mode (hints blocked)", () => {
    const ctx: PolicyContext = {
      mode: "SIMULATED_EXAM",
      saveCommitted: true,
      sessionRevision: "rev-1",
      liveRevision: "rev-1",
      timedOut: false,
    };
    const result = evaluatePolicy(ctx);
    assert.equal(result.allPermitted, false);
    assert.equal(result.hints.verdict, "BLOCKED");
  });

  it("allPermitted=false when save not committed", () => {
    const ctx: PolicyContext = {
      mode: "PRACTICE",
      saveCommitted: false,
      sessionRevision: "rev-1",
      liveRevision: "rev-1",
      timedOut: false,
    };
    const result = evaluatePolicy(ctx);
    assert.equal(result.allPermitted, false);
    assert.equal(result.correctnessReveal.verdict, "BLOCKED");
    assert.equal(result.solutionDisplay.verdict, "BLOCKED");
  });

  it("allPermitted=false when revision stale", () => {
    const ctx: PolicyContext = {
      mode: "PRACTICE",
      saveCommitted: true,
      sessionRevision: "rev-old",
      liveRevision: "rev-new",
      timedOut: false,
    };
    const result = evaluatePolicy(ctx);
    assert.equal(result.allPermitted, false);
    assert.equal(result.revisionStaleness.verdict, "BLOCKED");
  });
});

// ---------------------------------------------------------------------------
// Timeout
// ---------------------------------------------------------------------------

describe("Session – timer and timeout", () => {
  it("triggers timeout callback after durationMs", async () => {
    let timedOut = false;
    const s = createSession(makeConfig({ durationMs: 50 }));
    s.start(() => { timedOut = true; });
    await sleep(80);
    assert.equal(timedOut, true);
    assert.equal(s.getState(), "TIMED_OUT");
  });

  it("snapshot remainingMs decreases over time", async () => {
    const s = createSession(makeConfig({ durationMs: 500 }));
    s.start();
    const snap1 = s.snapshot();
    await sleep(60);
    const snap2 = s.snapshot();
    assert.ok(snap1.remainingMs !== null && snap2.remainingMs !== null);
    assert.ok(snap2.remainingMs < snap1.remainingMs);
    s.complete();
  });

  it("remainingMs is null when no durationMs configured", () => {
    const s = createSession(makeConfig());
    s.start();
    assert.equal(s.snapshot().remainingMs, null);
    s.complete();
  });

  it("pause and resume timer – elapsed time stops during pause", async () => {
    const s = createSession(makeConfig({ durationMs: 1000 }));
    s.start();
    await sleep(50);
    s.pauseTimer();
    const snapPaused = s.snapshot();
    await sleep(100); // time passes while paused
    const snapStill = s.snapshot();
    // remaining should not decrease while paused
    assert.ok(snapPaused.remainingMs !== null && snapStill.remainingMs !== null);
    // Allow small floating tolerance: should be within 20ms
    assert.ok(Math.abs(snapPaused.remainingMs - snapStill.remainingMs) < 20);
    s.resumeTimer();
    await sleep(30);
    const snapResumed = s.snapshot();
    assert.ok(snapResumed.remainingMs !== null);
    assert.ok(snapResumed.remainingMs < (snapStill.remainingMs ?? 0));
    s.complete();
  });

  it("throws pauseTimer when not ACTIVE", () => {
    const s = createSession(makeConfig({ durationMs: 500 }));
    assert.throws(
      () => s.pauseTimer(),
      (e: unknown) => e instanceof SessionError && e.code === "INVALID_STATE"
    );
  });

  it("throws resumeTimer when not ACTIVE", () => {
    const s = createSession(makeConfig({ durationMs: 500 }));
    assert.throws(
      () => s.resumeTimer(),
      (e: unknown) => e instanceof SessionError && e.code === "INVALID_STATE"
    );
  });
});

// ---------------------------------------------------------------------------
// Recovery return
// ---------------------------------------------------------------------------

describe("Session – recovery return routing", () => {
  it("recover() transitions ACTIVE to RECOVERY state", () => {
    const s = createSession(makeConfig());
    s.start();
    const result = s.recover();
    assert.equal(s.getState(), "RECOVERY");
    assert.equal(result.state, "RECOVERY");
  });

  it("recovery route contains sessionId and cursor index", () => {
    const s = createSession(makeConfig({ sessionId: "sess-recover-01" }));
    s.start();
    s.advanceCursor();
    s.advanceCursor();
    const result = s.recover();
    assert.ok(result.recoveryRoute !== null);
    assert.ok((result.recoveryRoute ?? "").includes("sess-recover-01"));
    assert.ok((result.recoveryRoute ?? "").includes("2")); // cursor at 2
  });

  it("recover() on TIMED_OUT session also succeeds", async () => {
    let timedOut = false;
    const s = createSession(makeConfig({ durationMs: 30 }));
    s.start(() => { timedOut = true; });
    await sleep(60);
    assert.equal(s.getState(), "TIMED_OUT");
    const result = s.recover();
    assert.equal(result.state, "RECOVERY");
  });

  it("recover() throws from COMPLETED state", () => {
    const s = createSession(makeConfig());
    s.start();
    s.complete();
    assert.throws(
      () => s.recover(),
      (e: unknown) => e instanceof SessionError && e.code === "INVALID_TRANSITION"
    );
  });
});
