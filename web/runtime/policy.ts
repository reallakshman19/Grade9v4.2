/**
 * web/runtime/policy.ts
 * A19 – Policy engine for session and assessment rules
 *
 * Enforces paper rules (exam mode), save-before-disclosure contract,
 * stale revision detection, and consent-bypass removal.
 *
 * No academic approval inferred from software validation.
 */

import type { SessionMode } from "./session.ts";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type PolicyVerdict = "PERMITTED" | "BLOCKED";

export interface PolicyContext {
  readonly mode: SessionMode;
  /** True when the current question's answer has been committed to storage. */
  readonly saveCommitted: boolean;
  /**
   * Revision hash the session was started with.
   * Must match the live content revision to be valid.
   */
  readonly sessionRevision: string;
  /** Current live content revision hash. */
  readonly liveRevision: string;
  /** True when the exam timer has elapsed. */
  readonly timedOut: boolean;
}

export interface PolicyReport {
  readonly verdict: PolicyVerdict;
  readonly reason: string;
  readonly rule: string;
}

// ---------------------------------------------------------------------------
// Individual rule checkers
// ---------------------------------------------------------------------------

/**
 * Rule P1 – Hints blocked in SIMULATED_EXAM mode (N15).
 * Timed exam hints must yield no disclosure.
 */
export function checkHintPermission(ctx: Pick<PolicyContext, "mode">): PolicyReport {
  if (ctx.mode === "SIMULATED_EXAM") {
    return {
      verdict: "BLOCKED",
      reason: "N15: hints are disabled in SIMULATED_EXAM mode; no disclosure permitted before submission",
      rule: "P1_NO_HINTS_IN_EXAM",
    };
  }
  return { verdict: "PERMITTED", reason: "Hints allowed in non-exam mode", rule: "P1_NO_HINTS_IN_EXAM" };
}

/**
 * Rule P2 – Correctness reveal requires a committed save.
 * No bypass for unsaved consent; transaction completion precedes disclosure.
 */
export function checkCorrectnessReveal(ctx: Pick<PolicyContext, "saveCommitted">): PolicyReport {
  if (!ctx.saveCommitted) {
    return {
      verdict: "BLOCKED",
      reason: "Save failure blocks correctness reveal; transaction must complete before disclosure",
      rule: "P2_SAVE_BEFORE_CORRECTNESS",
    };
  }
  return { verdict: "PERMITTED", reason: "Save committed; correctness reveal permitted", rule: "P2_SAVE_BEFORE_CORRECTNESS" };
}

/**
 * Rule P3 – Solution display requires a committed save.
 * Same constraint as correctness reveal; no workaround.
 */
export function checkSolutionDisplay(ctx: Pick<PolicyContext, "saveCommitted">): PolicyReport {
  if (!ctx.saveCommitted) {
    return {
      verdict: "BLOCKED",
      reason: "Save failure blocks solution display; transaction must complete before disclosure",
      rule: "P3_SAVE_BEFORE_SOLUTION",
    };
  }
  return { verdict: "PERMITTED", reason: "Save committed; solution display permitted", rule: "P3_SAVE_BEFORE_SOLUTION" };
}

/**
 * Rule P4 – Stale revision detection.
 * If the live content revision differs from the session's start revision,
 * the session is considered stale and must not be treated as current.
 */
export function checkRevisionStaleness(
  ctx: Pick<PolicyContext, "sessionRevision" | "liveRevision">
): PolicyReport {
  if (ctx.sessionRevision !== ctx.liveRevision) {
    return {
      verdict: "BLOCKED",
      reason: `Stale revision: session started with ${ctx.sessionRevision} but live content is ${ctx.liveRevision}`,
      rule: "P4_STALE_REVISION",
    };
  }
  return { verdict: "PERMITTED", reason: "Revision current", rule: "P4_STALE_REVISION" };
}

/**
 * Rule P5 – Submission blocked in SIMULATED_EXAM after timeout.
 * No late submission after the timer has expired.
 */
export function checkSubmissionWindow(
  ctx: Pick<PolicyContext, "mode" | "timedOut">
): PolicyReport {
  if (ctx.mode === "SIMULATED_EXAM" && ctx.timedOut) {
    return {
      verdict: "BLOCKED",
      reason: "Submission window closed: exam timer has expired",
      rule: "P5_NO_LATE_EXAM_SUBMISSION",
    };
  }
  return { verdict: "PERMITTED", reason: "Submission window open", rule: "P5_NO_LATE_EXAM_SUBMISSION" };
}

// ---------------------------------------------------------------------------
// Composite policy evaluator
// ---------------------------------------------------------------------------

export interface FullPolicyResult {
  readonly hints: PolicyReport;
  readonly correctnessReveal: PolicyReport;
  readonly solutionDisplay: PolicyReport;
  readonly revisionStaleness: PolicyReport;
  readonly submissionWindow: PolicyReport;
  /** True only when ALL checks are PERMITTED. */
  readonly allPermitted: boolean;
}

export function evaluatePolicy(ctx: PolicyContext): FullPolicyResult {
  const hints = checkHintPermission(ctx);
  const correctnessReveal = checkCorrectnessReveal(ctx);
  const solutionDisplay = checkSolutionDisplay(ctx);
  const revisionStaleness = checkRevisionStaleness(ctx);
  const submissionWindow = checkSubmissionWindow(ctx);

  const allPermitted =
    hints.verdict === "PERMITTED" &&
    correctnessReveal.verdict === "PERMITTED" &&
    solutionDisplay.verdict === "PERMITTED" &&
    revisionStaleness.verdict === "PERMITTED" &&
    submissionWindow.verdict === "PERMITTED";

  return {
    hints,
    correctnessReveal,
    solutionDisplay,
    revisionStaleness,
    submissionWindow,
    allPermitted,
  };
}
