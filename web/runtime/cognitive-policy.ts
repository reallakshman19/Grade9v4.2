/**
 * web/runtime/cognitive-policy.ts
 * A49 – Six-stage cognitive policy engine
 *
 * Implements the exact transition matrix, disclosure rules, ordered hint
 * exposure (H1→H2→H3), exposure transaction guard, boundary commitment
 * separation, source return authorization, and exam precedence rules.
 *
 * Stages (in order): PREDICT → ATTEMPT → RECONSTRUCT → DIAGNOSE → REPAIR
 *                    → BOUNDARY_TEST → COMPLETE
 *
 * No academic approval inferred from software validation.
 */

import type { CognitiveStage, CognitiveEventType } from "./types.ts";
import type { SessionMode } from "./session.ts";

// ---------------------------------------------------------------------------
// Transition matrix
// ---------------------------------------------------------------------------

/**
 * Legal forward transitions between cognitive stages.
 * Only entries in this map are permitted; any other transition is ILLEGAL.
 */
export const LEGAL_TRANSITIONS: ReadonlyMap<CognitiveStage, readonly CognitiveStage[]> = new Map([
  ["PREDICT",        ["ATTEMPT"]],
  ["ATTEMPT",        ["RECONSTRUCT"]],
  ["RECONSTRUCT",    ["DIAGNOSE"]],
  ["DIAGNOSE",       ["REPAIR"]],
  ["REPAIR",         ["BOUNDARY_TEST"]],
  ["BOUNDARY_TEST",  ["COMPLETE"]],
  ["COMPLETE",       []],
]);

/**
 * Event types that drive each stage transition.
 * Maps the arriving event_type to the stage it unlocks.
 */
export const EVENT_STAGE_MAP: ReadonlyMap<CognitiveEventType, CognitiveStage> = new Map([
  ["PREDICTION_COMMITTED",    "ATTEMPT"],
  ["FIRST_COMMITTED",         "RECONSTRUCT"],
  ["RECONSTRUCTION_COMMITTED","DIAGNOSE"],
  ["DIAGNOSIS_COMMITTED",     "REPAIR"],
  ["REPAIR_COMMITTED",        "BOUNDARY_TEST"],
  ["BOUNDARY_COMMITTED",      "COMPLETE"],
]);

// ---------------------------------------------------------------------------
// Hint ordering
// ---------------------------------------------------------------------------

export type HintLevel = "H1" | "H2" | "H3";

/** Ordered hint sequence — must be exposed in this order, never skipped. */
export const HINT_ORDER: readonly HintLevel[] = ["H1", "H2", "H3"];

export interface HintState {
  readonly exposedLevels: readonly HintLevel[];
}

/**
 * Returns the next hint level that may be exposed, or null if all exposed.
 * H1 must precede H2, H2 must precede H3.
 */
export function nextPermittedHint(state: HintState): HintLevel | null {
  for (const level of HINT_ORDER) {
    if (!state.exposedLevels.includes(level)) return level;
  }
  return null;
}

/**
 * Validates that a hint request follows the ordered sequence.
 * Returns an error string on violation, null on success.
 */
export function validateHintRequest(
  state: HintState,
  requested: HintLevel
): string | null {
  const next = nextPermittedHint(state);
  if (next === null) {
    return `All hints already exposed; no further hint permitted`;
  }
  if (requested !== next) {
    return `H1→H2→H3 order violated: next permitted is ${next}, requested ${requested}`;
  }
  return null;
}

// ---------------------------------------------------------------------------
// Policy verdict types
// ---------------------------------------------------------------------------

export type CognitivePolicyVerdict = "PERMITTED" | "BLOCKED";

export interface CognitivePolicyReport {
  readonly verdict: CognitivePolicyVerdict;
  readonly reason: string;
  readonly rule: string;
}

// ---------------------------------------------------------------------------
// Policy context
// ---------------------------------------------------------------------------

export interface CognitivePolicyContext {
  readonly currentStage: CognitiveStage;
  readonly mode: SessionMode;
  /**
   * True when the exposure transaction (HELP_EXPOSED event) has been
   * durably committed to the cognitive store before disclosure is shown.
   */
  readonly exposureSaved: boolean;
  /**
   * True when the boundary attempt has been committed separately from
   * the main attempt — boundary commitment is a separate round-trip.
   */
  readonly boundaryCommitted: boolean;
  /**
   * True when the source (reference / anchor) has been officially returned
   * and committed; determines whether source-return disclosure is permitted.
   */
  readonly sourceReturned: boolean;
  /**
   * True when a first attempt has been committed (FIRST_COMMITTED).
   * Required before reference/anchor can be shown.
   */
  readonly firstAttemptCommitted: boolean;
  /** Hint state for the current task. */
  readonly hintState: HintState;
}

// ---------------------------------------------------------------------------
// Individual rule checkers
// ---------------------------------------------------------------------------

/**
 * CP1 – Stage transition guard.
 * The proposed target stage must appear in LEGAL_TRANSITIONS[currentStage].
 */
export function checkStageTransition(
  currentStage: CognitiveStage,
  targetStage: CognitiveStage
): CognitivePolicyReport {
  const permitted = LEGAL_TRANSITIONS.get(currentStage) ?? [];
  if ((permitted as readonly string[]).includes(targetStage)) {
    return {
      verdict: "PERMITTED",
      reason: `Transition ${currentStage} → ${targetStage} is legal`,
      rule: "CP1_STAGE_TRANSITION",
    };
  }
  return {
    verdict: "BLOCKED",
    reason: `Illegal transition: ${currentStage} → ${targetStage} is not in the transition matrix`,
    rule: "CP1_STAGE_TRANSITION",
  };
}

/**
 * CP2 – Pre-commit reference/anchor denial.
 * Reference and anchor (source) may not be shown before the first attempt
 * is committed. No unsupported bypass.
 */
export function checkReferenceAccess(
  ctx: Pick<CognitivePolicyContext, "firstAttemptCommitted">
): CognitivePolicyReport {
  if (!ctx.firstAttemptCommitted) {
    return {
      verdict: "BLOCKED",
      reason: "Reference/anchor denied: first attempt must be committed before source access",
      rule: "CP2_PRECOMMIT_REFERENCE_DENIAL",
    };
  }
  return {
    verdict: "PERMITTED",
    reason: "First attempt committed; reference/anchor access permitted",
    rule: "CP2_PRECOMMIT_REFERENCE_DENIAL",
  };
}

/**
 * CP3 – Hint order enforcement (H1 → H2 → H3).
 * Hints must be requested in order; skipping is blocked.
 * In SIMULATED_EXAM mode all hints are blocked (exam precedence).
 */
export function checkHintExposure(
  ctx: Pick<CognitivePolicyContext, "mode" | "hintState">,
  requested: HintLevel
): CognitivePolicyReport {
  if (ctx.mode === "SIMULATED_EXAM") {
    return {
      verdict: "BLOCKED",
      reason: "Exam precedence: hints are disabled in SIMULATED_EXAM mode",
      rule: "CP3_HINT_ORDER",
    };
  }
  const violation = validateHintRequest(ctx.hintState, requested);
  if (violation !== null) {
    return {
      verdict: "BLOCKED",
      reason: violation,
      rule: "CP3_HINT_ORDER",
    };
  }
  return {
    verdict: "PERMITTED",
    reason: `Hint ${requested} follows ordered sequence`,
    rule: "CP3_HINT_ORDER",
  };
}

/**
 * CP4 – Exposure transaction guard.
 * The HELP_EXPOSED event must be durably saved before the hint content
 * is revealed. Failed exposure save blocks display.
 */
export function checkExposureTransaction(
  ctx: Pick<CognitivePolicyContext, "exposureSaved">
): CognitivePolicyReport {
  if (!ctx.exposureSaved) {
    return {
      verdict: "BLOCKED",
      reason: "Failed exposure save: HELP_EXPOSED event must be committed before displaying hint content",
      rule: "CP4_EXPOSURE_TRANSACTION",
    };
  }
  return {
    verdict: "PERMITTED",
    reason: "Exposure event committed; hint display permitted",
    rule: "CP4_EXPOSURE_TRANSACTION",
  };
}

/**
 * CP5 – Boundary commitment separation.
 * Boundary feedback may not be shown until the boundary attempt has been
 * committed in a separate round-trip (independent of the main attempt save).
 */
export function checkBoundaryFeedback(
  ctx: Pick<CognitivePolicyContext, "boundaryCommitted">
): CognitivePolicyReport {
  if (!ctx.boundaryCommitted) {
    return {
      verdict: "BLOCKED",
      reason: "Boundary feedback locked: BOUNDARY_COMMITTED event must precede feedback display",
      rule: "CP5_BOUNDARY_FEEDBACK_LOCK",
    };
  }
  return {
    verdict: "PERMITTED",
    reason: "Boundary attempt committed; feedback display permitted",
    rule: "CP5_BOUNDARY_FEEDBACK_LOCK",
  };
}

/**
 * CP6 – Source return authorization.
 * Source (reference) display after RECONSTRUCT requires sourceReturned=true.
 * No diagnosis without a committed source return.
 */
export function checkSourceReturn(
  ctx: Pick<CognitivePolicyContext, "sourceReturned">
): CognitivePolicyReport {
  if (!ctx.sourceReturned) {
    return {
      verdict: "BLOCKED",
      reason: "Source not returned: SOURCE_RETURNED event must be committed before diagnosis display",
      rule: "CP6_SOURCE_RETURN",
    };
  }
  return {
    verdict: "PERMITTED",
    reason: "Source returned; diagnosis display permitted",
    rule: "CP6_SOURCE_RETURN",
  };
}

/**
 * CP7 – No unsupported diagnosis in SIMULATED_EXAM mode.
 * Diagnosis (self-assessment, model answers) is blocked in exam mode.
 */
export function checkDiagnosisPermission(
  ctx: Pick<CognitivePolicyContext, "mode">
): CognitivePolicyReport {
  if (ctx.mode === "SIMULATED_EXAM") {
    return {
      verdict: "BLOCKED",
      reason: "Exam precedence: diagnosis/self-assessment is not supported in SIMULATED_EXAM mode",
      rule: "CP7_NO_EXAM_DIAGNOSIS",
    };
  }
  return {
    verdict: "PERMITTED",
    reason: "Diagnosis permitted in non-exam mode",
    rule: "CP7_NO_EXAM_DIAGNOSIS",
  };
}

// ---------------------------------------------------------------------------
// Composite policy result
// ---------------------------------------------------------------------------

export interface FullCognitivePolicyResult {
  readonly stageTransition: CognitivePolicyReport | null; // null when not checking a transition
  readonly referenceAccess: CognitivePolicyReport;
  readonly exposureTransaction: CognitivePolicyReport;
  readonly boundaryFeedback: CognitivePolicyReport;
  readonly sourceReturn: CognitivePolicyReport;
  readonly diagnosisPermission: CognitivePolicyReport;
  readonly allPermitted: boolean;
}

export function evaluateCognitivePolicy(
  ctx: CognitivePolicyContext,
  targetStage?: CognitiveStage
): FullCognitivePolicyResult {
  const stageTransition = targetStage !== undefined
    ? checkStageTransition(ctx.currentStage, targetStage)
    : null;
  const referenceAccess = checkReferenceAccess(ctx);
  const exposureTransaction = checkExposureTransaction(ctx);
  const boundaryFeedback = checkBoundaryFeedback(ctx);
  const sourceReturn = checkSourceReturn(ctx);
  const diagnosisPermission = checkDiagnosisPermission(ctx);

  const allPermitted =
    (stageTransition === null || stageTransition.verdict === "PERMITTED") &&
    referenceAccess.verdict === "PERMITTED" &&
    exposureTransaction.verdict === "PERMITTED" &&
    boundaryFeedback.verdict === "PERMITTED" &&
    sourceReturn.verdict === "PERMITTED" &&
    diagnosisPermission.verdict === "PERMITTED";

  return {
    stageTransition,
    referenceAccess,
    exposureTransaction,
    boundaryFeedback,
    sourceReturn,
    diagnosisPermission,
    allPermitted,
  };
}
