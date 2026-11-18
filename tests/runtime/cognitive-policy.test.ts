/**
 * tests/runtime/cognitive-policy.test.ts
 * A49 – Tests for six-stage cognitive policy engine and controller
 *
 * Covers: every legal and illegal transition, pre-commit reference/anchor denial,
 * H1–H3 ordered hint exposure, failed exposure save guard, boundary feedback lock,
 * exam precedence (hints+diagnosis blocked), no unsupported diagnosis in exam mode,
 * source return authorization, full journey walk-through.
 *
 * No academic approval inferred from software validation.
 */

import { describe, it } from "node:test";
import assert from "node:assert/strict";

import {
  checkStageTransition,
  checkReferenceAccess,
  checkHintExposure,
  checkExposureTransaction,
  checkBoundaryFeedback,
  checkSourceReturn,
  checkDiagnosisPermission,
  evaluateCognitivePolicy,
  nextPermittedHint,
  validateHintRequest,
  LEGAL_TRANSITIONS,
  EVENT_STAGE_MAP,
} from "../../web/runtime/cognitive-policy.ts";

import type { CognitivePolicyContext, HintState } from "../../web/runtime/cognitive-policy.ts";
import type { CognitiveStage } from "../../web/runtime/types.ts";

import {
  createCognitiveController,
  ControllerError,
} from "../../web/journeys/cognitive-controller.ts";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function emptyHintState(): HintState {
  return { exposedLevels: [] };
}

function fullPolicyCtx(overrides: Partial<CognitivePolicyContext> = {}): CognitivePolicyContext {
  return {
    currentStage: "PREDICT",
    mode: "PRACTICE",
    exposureSaved: true,
    boundaryCommitted: true,
    sourceReturned: true,
    firstAttemptCommitted: true,
    hintState: emptyHintState(),
    ...overrides,
  };
}

// ---------------------------------------------------------------------------
// Transition matrix
// ---------------------------------------------------------------------------

describe("CP1 – Stage transition matrix", () => {
  const legalPairs: [CognitiveStage, CognitiveStage][] = [
    ["PREDICT",       "ATTEMPT"],
    ["ATTEMPT",       "RECONSTRUCT"],
    ["RECONSTRUCT",   "DIAGNOSE"],
    ["DIAGNOSE",      "REPAIR"],
    ["REPAIR",        "BOUNDARY_TEST"],
    ["BOUNDARY_TEST", "COMPLETE"],
  ];

  for (const [from, to] of legalPairs) {
    it(`PERMITTED: ${from} → ${to}`, () => {
      const r = checkStageTransition(from, to);
      assert.equal(r.verdict, "PERMITTED");
      assert.equal(r.rule, "CP1_STAGE_TRANSITION");
    });
  }

  it("BLOCKED: PREDICT → RECONSTRUCT (skip ATTEMPT)", () => {
    const r = checkStageTransition("PREDICT", "RECONSTRUCT");
    assert.equal(r.verdict, "BLOCKED");
    assert.ok(r.reason.includes("Illegal transition"));
  });

  it("BLOCKED: ATTEMPT → DIAGNOSE (skip RECONSTRUCT)", () => {
    const r = checkStageTransition("ATTEMPT", "DIAGNOSE");
    assert.equal(r.verdict, "BLOCKED");
  });

  it("BLOCKED: COMPLETE → PREDICT (backward)", () => {
    const r = checkStageTransition("COMPLETE", "PREDICT");
    assert.equal(r.verdict, "BLOCKED");
  });

  it("BLOCKED: BOUNDARY_TEST → ATTEMPT (backward)", () => {
    const r = checkStageTransition("BOUNDARY_TEST", "ATTEMPT");
    assert.equal(r.verdict, "BLOCKED");
  });

  it("BLOCKED: DIAGNOSE → BOUNDARY_TEST (skip REPAIR)", () => {
    const r = checkStageTransition("DIAGNOSE", "BOUNDARY_TEST");
    assert.equal(r.verdict, "BLOCKED");
  });

  it("BLOCKED: COMPLETE has no legal exits", () => {
    const exits = LEGAL_TRANSITIONS.get("COMPLETE");
    assert.deepEqual(exits, []);
    const r = checkStageTransition("COMPLETE", "PREDICT");
    assert.equal(r.verdict, "BLOCKED");
  });
});

// ---------------------------------------------------------------------------
// CP2 – Pre-commit reference/anchor denial
// ---------------------------------------------------------------------------

describe("CP2 – Pre-commit reference/anchor denial", () => {
  it("BLOCKED when firstAttemptCommitted=false", () => {
    const r = checkReferenceAccess({ firstAttemptCommitted: false });
    assert.equal(r.verdict, "BLOCKED");
    assert.equal(r.rule, "CP2_PRECOMMIT_REFERENCE_DENIAL");
    assert.ok(r.reason.includes("first attempt must be committed"));
  });

  it("PERMITTED when firstAttemptCommitted=true", () => {
    const r = checkReferenceAccess({ firstAttemptCommitted: true });
    assert.equal(r.verdict, "PERMITTED");
  });
});

// ---------------------------------------------------------------------------
// CP3 – H1→H2→H3 ordered hint exposure
// ---------------------------------------------------------------------------

describe("CP3 – Ordered hint exposure H1→H2→H3", () => {
  it("nextPermittedHint returns H1 when nothing exposed", () => {
    assert.equal(nextPermittedHint(emptyHintState()), "H1");
  });

  it("nextPermittedHint returns H2 after H1", () => {
    assert.equal(nextPermittedHint({ exposedLevels: ["H1"] }), "H2");
  });

  it("nextPermittedHint returns H3 after H1+H2", () => {
    assert.equal(nextPermittedHint({ exposedLevels: ["H1", "H2"] }), "H3");
  });

  it("nextPermittedHint returns null when all exposed", () => {
    assert.equal(nextPermittedHint({ exposedLevels: ["H1", "H2", "H3"] }), null);
  });

  it("validateHintRequest succeeds for H1 when nothing exposed", () => {
    assert.equal(validateHintRequest(emptyHintState(), "H1"), null);
  });

  it("validateHintRequest fails for H2 when nothing exposed (skip H1)", () => {
    const err = validateHintRequest(emptyHintState(), "H2");
    assert.ok(err !== null);
    assert.ok(err.includes("H1"));
  });

  it("validateHintRequest fails for H3 when only H1 exposed (skip H2)", () => {
    const err = validateHintRequest({ exposedLevels: ["H1"] }, "H3");
    assert.ok(err !== null);
    assert.ok(err.includes("H2"));
  });

  it("checkHintExposure BLOCKED in SIMULATED_EXAM for any hint", () => {
    const r = checkHintExposure({ mode: "SIMULATED_EXAM", hintState: emptyHintState() }, "H1");
    assert.equal(r.verdict, "BLOCKED");
    assert.equal(r.rule, "CP3_HINT_ORDER");
    assert.ok(r.reason.includes("Exam precedence"));
  });

  it("checkHintExposure BLOCKED for out-of-order H2 when H1 not exposed", () => {
    const r = checkHintExposure(
      { mode: "PRACTICE", hintState: emptyHintState() },
      "H2"
    );
    assert.equal(r.verdict, "BLOCKED");
  });

  it("checkHintExposure PERMITTED for H1 in PRACTICE mode", () => {
    const r = checkHintExposure(
      { mode: "PRACTICE", hintState: emptyHintState() },
      "H1"
    );
    assert.equal(r.verdict, "PERMITTED");
  });

  it("checkHintExposure PERMITTED for H2 after H1 in LEARN mode", () => {
    const r = checkHintExposure(
      { mode: "LEARN", hintState: { exposedLevels: ["H1"] } },
      "H2"
    );
    assert.equal(r.verdict, "PERMITTED");
  });
});

// ---------------------------------------------------------------------------
// CP4 – Exposure transaction guard
// ---------------------------------------------------------------------------

describe("CP4 – Exposure transaction (failed save blocks hint display)", () => {
  it("BLOCKED when exposureSaved=false", () => {
    const r = checkExposureTransaction({ exposureSaved: false });
    assert.equal(r.verdict, "BLOCKED");
    assert.equal(r.rule, "CP4_EXPOSURE_TRANSACTION");
    assert.ok(r.reason.includes("HELP_EXPOSED event must be committed"));
  });

  it("PERMITTED when exposureSaved=true", () => {
    const r = checkExposureTransaction({ exposureSaved: true });
    assert.equal(r.verdict, "PERMITTED");
  });
});

// ---------------------------------------------------------------------------
// CP5 – Boundary feedback lock
// ---------------------------------------------------------------------------

describe("CP5 – Boundary feedback lock (separate commitment)", () => {
  it("BLOCKED when boundaryCommitted=false", () => {
    const r = checkBoundaryFeedback({ boundaryCommitted: false });
    assert.equal(r.verdict, "BLOCKED");
    assert.equal(r.rule, "CP5_BOUNDARY_FEEDBACK_LOCK");
    assert.ok(r.reason.includes("BOUNDARY_COMMITTED"));
  });

  it("PERMITTED when boundaryCommitted=true", () => {
    const r = checkBoundaryFeedback({ boundaryCommitted: true });
    assert.equal(r.verdict, "PERMITTED");
  });
});

// ---------------------------------------------------------------------------
// CP6 – Source return authorization
// ---------------------------------------------------------------------------

describe("CP6 – Source return authorization", () => {
  it("BLOCKED when sourceReturned=false", () => {
    const r = checkSourceReturn({ sourceReturned: false });
    assert.equal(r.verdict, "BLOCKED");
    assert.equal(r.rule, "CP6_SOURCE_RETURN");
    assert.ok(r.reason.includes("SOURCE_RETURNED"));
  });

  it("PERMITTED when sourceReturned=true", () => {
    const r = checkSourceReturn({ sourceReturned: true });
    assert.equal(r.verdict, "PERMITTED");
  });
});

// ---------------------------------------------------------------------------
// CP7 – No diagnosis in SIMULATED_EXAM
// ---------------------------------------------------------------------------

describe("CP7 – No unsupported diagnosis in exam mode", () => {
  it("BLOCKED for SIMULATED_EXAM mode", () => {
    const r = checkDiagnosisPermission({ mode: "SIMULATED_EXAM" });
    assert.equal(r.verdict, "BLOCKED");
    assert.equal(r.rule, "CP7_NO_EXAM_DIAGNOSIS");
    assert.ok(r.reason.includes("SIMULATED_EXAM"));
  });

  it("PERMITTED for PRACTICE mode", () => {
    const r = checkDiagnosisPermission({ mode: "PRACTICE" });
    assert.equal(r.verdict, "PERMITTED");
  });

  it("PERMITTED for LEARN mode", () => {
    const r = checkDiagnosisPermission({ mode: "LEARN" });
    assert.equal(r.verdict, "PERMITTED");
  });
});

// ---------------------------------------------------------------------------
// Composite evaluateCognitivePolicy
// ---------------------------------------------------------------------------

describe("evaluateCognitivePolicy – composite evaluation", () => {
  it("allPermitted=true for clean PRACTICE context with valid transition", () => {
    const ctx = fullPolicyCtx({ currentStage: "PREDICT" });
    const result = evaluateCognitivePolicy(ctx, "ATTEMPT");
    assert.equal(result.allPermitted, true);
  });

  it("allPermitted=false when stageTransition is illegal", () => {
    const ctx = fullPolicyCtx({ currentStage: "PREDICT" });
    const result = evaluateCognitivePolicy(ctx, "DIAGNOSE");
    assert.equal(result.allPermitted, false);
    assert.equal(result.stageTransition?.verdict, "BLOCKED");
  });

  it("stageTransition is null when targetStage omitted", () => {
    const ctx = fullPolicyCtx();
    const result = evaluateCognitivePolicy(ctx);
    assert.equal(result.stageTransition, null);
  });

  it("allPermitted=false when SIMULATED_EXAM (diagnosis blocked)", () => {
    const ctx = fullPolicyCtx({ mode: "SIMULATED_EXAM" });
    const result = evaluateCognitivePolicy(ctx);
    assert.equal(result.allPermitted, false);
    assert.equal(result.diagnosisPermission.verdict, "BLOCKED");
  });

  it("allPermitted=false when exposureSaved=false", () => {
    const ctx = fullPolicyCtx({ exposureSaved: false });
    const result = evaluateCognitivePolicy(ctx);
    assert.equal(result.allPermitted, false);
    assert.equal(result.exposureTransaction.verdict, "BLOCKED");
  });
});

// ---------------------------------------------------------------------------
// EVENT_STAGE_MAP
// ---------------------------------------------------------------------------

describe("EVENT_STAGE_MAP – event-to-stage mapping", () => {
  it("PREDICTION_COMMITTED maps to ATTEMPT", () => {
    assert.equal(EVENT_STAGE_MAP.get("PREDICTION_COMMITTED"), "ATTEMPT");
  });
  it("FIRST_COMMITTED maps to RECONSTRUCT", () => {
    assert.equal(EVENT_STAGE_MAP.get("FIRST_COMMITTED"), "RECONSTRUCT");
  });
  it("RECONSTRUCTION_COMMITTED maps to DIAGNOSE", () => {
    assert.equal(EVENT_STAGE_MAP.get("RECONSTRUCTION_COMMITTED"), "DIAGNOSE");
  });
  it("DIAGNOSIS_COMMITTED maps to REPAIR", () => {
    assert.equal(EVENT_STAGE_MAP.get("DIAGNOSIS_COMMITTED"), "REPAIR");
  });
  it("REPAIR_COMMITTED maps to BOUNDARY_TEST", () => {
    assert.equal(EVENT_STAGE_MAP.get("REPAIR_COMMITTED"), "BOUNDARY_TEST");
  });
  it("BOUNDARY_COMMITTED maps to COMPLETE", () => {
    assert.equal(EVENT_STAGE_MAP.get("BOUNDARY_COMMITTED"), "COMPLETE");
  });
});

// ---------------------------------------------------------------------------
// CognitiveController – full journey walk-through
// ---------------------------------------------------------------------------

describe("CognitiveController – full six-stage journey", () => {
  it("walks all six stages in order", () => {
    const ctrl = createCognitiveController({
      journeyId: "j-001",
      taskId: "t-001",
      mode: "PRACTICE",
    });
    assert.equal(ctrl.currentStage(), "PREDICT");

    ctrl.commitPrediction({ prediction: "F=ma" });
    assert.equal(ctrl.currentStage(), "ATTEMPT");

    ctrl.commitFirstAttempt({ response: "10 N" });
    assert.equal(ctrl.currentStage(), "RECONSTRUCT");

    ctrl.confirmSourceReturn();
    ctrl.commitReconstruction({ reconstruction: "F=10N confirmed" });
    assert.equal(ctrl.currentStage(), "DIAGNOSE");

    ctrl.commitDiagnosis({ diagnosis: "unit error" });
    assert.equal(ctrl.currentStage(), "REPAIR");

    ctrl.commitRepair({ repaired: "F=10 N (corrected)" });
    assert.equal(ctrl.currentStage(), "BOUNDARY_TEST");

    ctrl.commitBoundary({ boundaryCase: "F=0" });
    assert.equal(ctrl.currentStage(), "COMPLETE");
  });

  it("throws when skipping stages (PREDICT → DIAGNOSE)", () => {
    const ctrl = createCognitiveController({
      journeyId: "j-002",
      taskId: "t-002",
      mode: "PRACTICE",
    });
    assert.throws(
      () => ctrl.commitDiagnosis({ diagnosis: "skip" }),
      (e: unknown) => e instanceof ControllerError && e.code === "CP1_STAGE_TRANSITION"
    );
  });

  it("throws commitReconstruction when sourceReturned=false", () => {
    const ctrl = createCognitiveController({
      journeyId: "j-003",
      taskId: "t-003",
      mode: "PRACTICE",
    });
    ctrl.commitPrediction({});
    ctrl.commitFirstAttempt({});
    // sourceReturned is false — should block
    assert.throws(
      () => ctrl.commitReconstruction({}),
      (e: unknown) => e instanceof ControllerError && e.code === "CP6_SOURCE_RETURN"
    );
  });

  it("throws commitDiagnosis in SIMULATED_EXAM mode", () => {
    const ctrl = createCognitiveController({
      journeyId: "j-004",
      taskId: "t-004",
      mode: "SIMULATED_EXAM",
    });
    ctrl.commitPrediction({});
    ctrl.commitFirstAttempt({});
    ctrl.confirmSourceReturn();
    ctrl.commitReconstruction({});
    assert.throws(
      () => ctrl.commitDiagnosis({}),
      (e: unknown) => e instanceof ControllerError && e.code === "CP7_NO_EXAM_DIAGNOSIS"
    );
  });
});

// ---------------------------------------------------------------------------
// CognitiveController – hint exposure
// ---------------------------------------------------------------------------

describe("CognitiveController – hint exposure (H1→H2→H3)", () => {
  it("requestHint H1 succeeds; canDisplayHint BLOCKED before confirmExposureSaved", () => {
    const ctrl = createCognitiveController({
      journeyId: "j-h01",
      taskId: "t-h01",
      mode: "PRACTICE",
    });
    ctrl.requestHint("H1");
    // exposureSaved is false until confirmExposureSaved()
    const display = ctrl.canDisplayHint();
    assert.equal(display.verdict, "BLOCKED");
  });

  it("canDisplayHint PERMITTED after confirmExposureSaved", () => {
    const ctrl = createCognitiveController({
      journeyId: "j-h02",
      taskId: "t-h02",
      mode: "PRACTICE",
    });
    ctrl.requestHint("H1");
    ctrl.confirmExposureSaved();
    const display = ctrl.canDisplayHint();
    assert.equal(display.verdict, "PERMITTED");
  });

  it("requestHint H2 before H1 throws (order violation)", () => {
    const ctrl = createCognitiveController({
      journeyId: "j-h03",
      taskId: "t-h03",
      mode: "PRACTICE",
    });
    assert.throws(
      () => ctrl.requestHint("H2"),
      (e: unknown) => e instanceof ControllerError && e.code === "CP3_HINT_ORDER"
    );
  });

  it("requestHint throws in SIMULATED_EXAM mode (exam precedence)", () => {
    const ctrl = createCognitiveController({
      journeyId: "j-h04",
      taskId: "t-h04",
      mode: "SIMULATED_EXAM",
    });
    assert.throws(
      () => ctrl.requestHint("H1"),
      (e: unknown) => e instanceof ControllerError && e.code === "CP3_HINT_ORDER"
    );
  });

  it("H1→H2→H3 full sequence completes correctly", () => {
    const ctrl = createCognitiveController({
      journeyId: "j-h05",
      taskId: "t-h05",
      mode: "LEARN",
    });
    ctrl.requestHint("H1"); ctrl.confirmExposureSaved();
    ctrl.requestHint("H2"); ctrl.confirmExposureSaved();
    ctrl.requestHint("H3"); ctrl.confirmExposureSaved();
    const snap = ctrl.snapshot();
    assert.deepEqual(snap.hintState.exposedLevels, ["H1", "H2", "H3"]);
  });
});

// ---------------------------------------------------------------------------
// CognitiveController – reference and boundary
// ---------------------------------------------------------------------------

describe("CognitiveController – reference access and boundary feedback", () => {
  it("canAccessReference BLOCKED before firstAttemptCommitted", () => {
    const ctrl = createCognitiveController({
      journeyId: "j-r01",
      taskId: "t-r01",
      mode: "PRACTICE",
    });
    const r = ctrl.canAccessReference();
    assert.equal(r.verdict, "BLOCKED");
  });

  it("canAccessReference PERMITTED after commitFirstAttempt", () => {
    const ctrl = createCognitiveController({
      journeyId: "j-r02",
      taskId: "t-r02",
      mode: "PRACTICE",
    });
    ctrl.commitPrediction({});
    ctrl.commitFirstAttempt({});
    const r = ctrl.canAccessReference();
    assert.equal(r.verdict, "PERMITTED");
  });

  it("canDisplayBoundaryFeedback BLOCKED before commitBoundary", () => {
    const ctrl = createCognitiveController({
      journeyId: "j-b01",
      taskId: "t-b01",
      mode: "PRACTICE",
    });
    const r = ctrl.canDisplayBoundaryFeedback();
    assert.equal(r.verdict, "BLOCKED");
  });

  it("canDisplayBoundaryFeedback PERMITTED after commitBoundary", () => {
    const ctrl = createCognitiveController({
      journeyId: "j-b02",
      taskId: "t-b02",
      mode: "PRACTICE",
    });
    ctrl.commitPrediction({});
    ctrl.commitFirstAttempt({});
    ctrl.confirmSourceReturn();
    ctrl.commitReconstruction({});
    ctrl.commitDiagnosis({});
    ctrl.commitRepair({});
    ctrl.commitBoundary({});
    const r = ctrl.canDisplayBoundaryFeedback();
    assert.equal(r.verdict, "PERMITTED");
  });
});
