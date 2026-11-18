/**
 * web/journeys/cognitive-controller.ts
 * A49 – Six-stage cognitive journey controller
 *
 * Orchestrates the full six-stage cognitive sequence for a single task:
 *   PREDICT → ATTEMPT → RECONSTRUCT → DIAGNOSE → REPAIR → BOUNDARY_TEST → COMPLETE
 *
 * Enforces: ordered hint exposure (H1→H2→H3), exposure transaction,
 * boundary commitment separation, source return, exam precedence,
 * pre-commit reference/anchor denial, native-mapped sequence.
 *
 * No academic approval inferred from software validation.
 */

import type { CognitiveStage } from "../runtime/types.ts";
import type { SessionMode } from "../runtime/session.ts";

import {
  checkStageTransition,
  checkReferenceAccess,
  checkHintExposure,
  checkExposureTransaction,
  checkBoundaryFeedback,
  checkSourceReturn,
  checkDiagnosisPermission,
  nextPermittedHint,
  EVENT_STAGE_MAP,
} from "../runtime/cognitive-policy.ts";

import type { HintLevel, HintState, CognitivePolicyReport } from "../runtime/cognitive-policy.ts";

// ---------------------------------------------------------------------------
// Controller state
// ---------------------------------------------------------------------------

export interface ControllerConfig {
  readonly journeyId: string;
  readonly taskId: string;
  readonly mode: SessionMode;
}

export interface ControllerSnapshot {
  readonly journeyId: string;
  readonly taskId: string;
  readonly mode: SessionMode;
  readonly stage: CognitiveStage;
  readonly firstAttemptCommitted: boolean;
  readonly boundaryCommitted: boolean;
  readonly sourceReturned: boolean;
  readonly exposureSaved: boolean;
  readonly hintState: HintState;
  readonly eventLog: readonly ControllerEvent[];
}

export interface ControllerEvent {
  readonly type: string;
  readonly at: number;
  readonly payload: Readonly<Record<string, unknown>>;
}

// ---------------------------------------------------------------------------
// Controller errors
// ---------------------------------------------------------------------------

export class ControllerError extends Error {
  readonly code: string;
  constructor(code: string, message: string) {
    super(message);
    this.name = "ControllerError";
    this.code = code;
  }
}

// ---------------------------------------------------------------------------
// Policy context builder
// ---------------------------------------------------------------------------

function buildPolicyCtx(state: {
  stage: CognitiveStage;
  mode: SessionMode;
  exposureSaved: boolean;
  boundaryCommitted: boolean;
  sourceReturned: boolean;
  firstAttemptCommitted: boolean;
  hintState: HintState;
}) {
  return {
    currentStage: state.stage,
    mode: state.mode,
    exposureSaved: state.exposureSaved,
    boundaryCommitted: state.boundaryCommitted,
    sourceReturned: state.sourceReturned,
    firstAttemptCommitted: state.firstAttemptCommitted,
    hintState: state.hintState,
  };
}

// ---------------------------------------------------------------------------
// CognitiveController
// ---------------------------------------------------------------------------

export class CognitiveController {
  private readonly config: ControllerConfig;
  private stage: CognitiveStage = "PREDICT";
  private firstAttemptCommitted = false;
  private boundaryCommitted = false;
  private sourceReturned = false;
  private exposureSaved = false;
  private exposedHints: HintLevel[] = [];
  private readonly eventLog: ControllerEvent[] = [];

  constructor(config: ControllerConfig) {
    this.config = config;
  }

  // -------------------------------------------------------------------------
  // State
  // -------------------------------------------------------------------------

  currentStage(): CognitiveStage {
    return this.stage;
  }

  snapshot(): ControllerSnapshot {
    return {
      journeyId: this.config.journeyId,
      taskId: this.config.taskId,
      mode: this.config.mode,
      stage: this.stage,
      firstAttemptCommitted: this.firstAttemptCommitted,
      boundaryCommitted: this.boundaryCommitted,
      sourceReturned: this.sourceReturned,
      exposureSaved: this.exposureSaved,
      hintState: { exposedLevels: [...this.exposedHints] },
      eventLog: [...this.eventLog],
    };
  }

  private policyCtx() {
    return buildPolicyCtx({
      stage: this.stage,
      mode: this.config.mode,
      exposureSaved: this.exposureSaved,
      boundaryCommitted: this.boundaryCommitted,
      sourceReturned: this.sourceReturned,
      firstAttemptCommitted: this.firstAttemptCommitted,
      hintState: { exposedLevels: [...this.exposedHints] },
    });
  }

  private assertPermitted(report: CognitivePolicyReport, context: string): void {
    if (report.verdict !== "PERMITTED") {
      throw new ControllerError(
        report.rule,
        `${context}: ${report.reason}`
      );
    }
  }

  private log(type: string, payload: Record<string, unknown> = {}): void {
    this.eventLog.push({ type, at: Date.now(), payload });
  }

  // -------------------------------------------------------------------------
  // Stage transitions
  // -------------------------------------------------------------------------

  /**
   * Commits a prediction and advances to ATTEMPT stage.
   * Requires current stage = PREDICT.
   */
  commitPrediction(payload: Record<string, unknown>): void {
    this.assertPermitted(
      checkStageTransition(this.stage, "ATTEMPT"),
      "commitPrediction"
    );
    this.stage = "ATTEMPT";
    this.log("PREDICTION_COMMITTED", payload);
  }

  /**
   * Commits the first attempt and advances to RECONSTRUCT stage.
   * Requires current stage = ATTEMPT.
   */
  commitFirstAttempt(payload: Record<string, unknown>): void {
    this.assertPermitted(
      checkStageTransition(this.stage, "RECONSTRUCT"),
      "commitFirstAttempt"
    );
    this.firstAttemptCommitted = true;
    this.stage = "RECONSTRUCT";
    this.log("FIRST_COMMITTED", payload);
  }

  /**
   * Commits the reconstruction and advances to DIAGNOSE stage.
   * Requires current stage = RECONSTRUCT AND source has been returned.
   */
  commitReconstruction(payload: Record<string, unknown>): void {
    this.assertPermitted(
      checkStageTransition(this.stage, "DIAGNOSE"),
      "commitReconstruction"
    );
    this.assertPermitted(
      checkSourceReturn(this.policyCtx()),
      "commitReconstruction"
    );
    this.stage = "DIAGNOSE";
    this.log("RECONSTRUCTION_COMMITTED", payload);
  }

  /**
   * Commits the diagnosis and advances to REPAIR stage.
   * Requires current stage = DIAGNOSE; blocked in SIMULATED_EXAM mode.
   */
  commitDiagnosis(payload: Record<string, unknown>): void {
    this.assertPermitted(
      checkStageTransition(this.stage, "REPAIR"),
      "commitDiagnosis"
    );
    this.assertPermitted(
      checkDiagnosisPermission(this.policyCtx()),
      "commitDiagnosis"
    );
    this.stage = "REPAIR";
    this.log("DIAGNOSIS_COMMITTED", payload);
  }

  /**
   * Commits the repair and advances to BOUNDARY_TEST stage.
   * Requires current stage = REPAIR.
   */
  commitRepair(payload: Record<string, unknown>): void {
    this.assertPermitted(
      checkStageTransition(this.stage, "BOUNDARY_TEST"),
      "commitRepair"
    );
    this.stage = "BOUNDARY_TEST";
    this.log("REPAIR_COMMITTED", payload);
  }

  /**
   * Commits the boundary attempt — separate round-trip from main attempt.
   * Advances to COMPLETE stage.
   */
  commitBoundary(payload: Record<string, unknown>): void {
    this.assertPermitted(
      checkStageTransition(this.stage, "COMPLETE"),
      "commitBoundary"
    );
    this.boundaryCommitted = true;
    this.stage = "COMPLETE";
    this.log("BOUNDARY_COMMITTED", payload);
  }

  // -------------------------------------------------------------------------
  // Hint exposure
  // -------------------------------------------------------------------------

  /**
   * Request exposure of a hint at the given level.
   * Enforces H1→H2→H3 order. The exposure transaction (HELP_EXPOSED event)
   * must be recorded as saved before display is allowed — call
   * confirmExposureSaved() after the store write completes.
   */
  requestHint(level: HintLevel): void {
    this.assertPermitted(
      checkHintExposure(this.policyCtx(), level),
      `requestHint(${level})`
    );
    // Mark as unsaved until confirmExposureSaved() is called
    this.exposureSaved = false;
    this.exposedHints.push(level);
    this.log("HELP_EXPOSED", { level, saved: false });
  }

  /**
   * Called by the store layer after the HELP_EXPOSED event has been
   * durably committed. Only after this call may the hint content be shown.
   */
  confirmExposureSaved(): void {
    this.exposureSaved = true;
    this.log("EXPOSURE_SAVE_CONFIRMED", {});
  }

  /**
   * Check whether the latest hint content may be displayed.
   * Returns the policy report — caller must check verdict = PERMITTED.
   */
  canDisplayHint(): CognitivePolicyReport {
    return checkExposureTransaction(this.policyCtx());
  }

  // -------------------------------------------------------------------------
  // Reference / anchor access
  // -------------------------------------------------------------------------

  /**
   * Check whether reference/anchor material may be shown.
   * Blocked before the first attempt is committed.
   */
  canAccessReference(): CognitivePolicyReport {
    return checkReferenceAccess(this.policyCtx());
  }

  // -------------------------------------------------------------------------
  // Source return
  // -------------------------------------------------------------------------

  /**
   * Records that the source has been officially returned (SOURCE_RETURNED
   * event durably committed). Required before RECONSTRUCT → DIAGNOSE.
   */
  confirmSourceReturn(): void {
    this.sourceReturned = true;
    this.log("SOURCE_RETURNED", {});
  }

  /**
   * Check whether source return is confirmed.
   */
  canProceedAfterSourceReturn(): CognitivePolicyReport {
    return checkSourceReturn(this.policyCtx());
  }

  // -------------------------------------------------------------------------
  // Boundary feedback
  // -------------------------------------------------------------------------

  /**
   * Check whether boundary feedback may be displayed.
   * Requires boundaryCommitted = true.
   */
  canDisplayBoundaryFeedback(): CognitivePolicyReport {
    return checkBoundaryFeedback(this.policyCtx());
  }

  // -------------------------------------------------------------------------
  // Diagnosis permission
  // -------------------------------------------------------------------------

  /**
   * Check whether diagnosis/self-assessment is permitted.
   * Blocked in SIMULATED_EXAM mode.
   */
  canPerformDiagnosis(): CognitivePolicyReport {
    return checkDiagnosisPermission(this.policyCtx());
  }
}

// ---------------------------------------------------------------------------
// Factory
// ---------------------------------------------------------------------------

export function createCognitiveController(config: ControllerConfig): CognitiveController {
  return new CognitiveController(config);
}
