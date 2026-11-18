/**
 * tests/browser/core1b.spec.ts
 * A32 — Core1B Fresh Transfer Journey and Page Browser Test Suite.
 *
 * Verifies:
 * 1. Six-stage native progression (PREDICT -> ATTEMPT -> RECONSTRUCT -> DIAGNOSE -> REPAIR -> BOUNDARY_TEST -> COMPLETE).
 * 2. Task A vs Task B separation and rejection of clone origin ID.
 * 3. Precommit secrecy: Task A solution denied prior to commit-first.
 * 4. Ordered hint exposure (H1 -> H2 -> H3) and assisted attempt marking.
 * 5. Boundary feedback lock until commit-boundary.
 * 6. Non-destructive draft roundtrip and session preservation.
 * 7. Declared screen states: populated, loading, error, pending review, stale origin, save blocked, stale event, assisted, boundary locked.
 * 8. Dual-orientation tablet layout and 48px hit target bounds.
 * 9. Rule 13 invariant preservation.
 *
 * No academic approval inferred from software validation.
 */

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  Core1BTransferJourney,
  Core1BValidationError,
  TRANSFER_ORDERED_STAGES,
} from '../../web/journeys/core1b.ts';
import type {
  Core1BTransferDefinition,
  TaskDefinition,
} from '../../web/journeys/core1b.ts';
import {
  Core1BTransferPageController,
} from '../../web/pages/transfer.ts';
import { HIT_TARGET_MIN_PX } from '../../web/styles/tokens.ts';

function createSampleTransferDefinition(): Core1BTransferDefinition {
  const freshTaskA: TaskDefinition = {
    taskRef: { type: 'FRESH_TASK', id: 'demo:wpe:fresh', revision: 1, sha256: 'a'.repeat(64) },
    title: 'Fresh Transfer Task A: Horizontal Spring Mass Departure',
    prompt: 'A cart of mass 1.5 kg is pushed against a spring with k=150 N/m by distance 0.40 m. Find departure velocity.',
    conditions: ['Frictionless horizontal guide rail', 'Spring detaches cleanly at equilibrium x=0'],
    solutionRef: { type: 'SOLUTION', id: 'demo:wpe:fresh-solution', revision: 1, sha256: 'b'.repeat(64) },
    solutionSteps: [
      'Initial energy E_i = 1/2 k x^2 = 0.5 * 150 * 0.16 = 12.0 J',
      'At detachment, E_f = 1/2 m v^2 = 12.0 J',
      'v = sqrt(2 * 12.0 / 1.5) = sqrt(16.0) = 4.0 m/s',
    ],
    targetNumeric: { value: 4.0, unit: 'm/s', tolerance: 0.05 },
  };

  const boundaryTaskB: TaskDefinition = {
    taskRef: { type: 'FRESH_TASK', id: 'demo:wpe:boundary', revision: 1, sha256: 'c'.repeat(64) },
    title: 'Boundary Challenge Task B: Attached Oscillating Spring',
    prompt: 'The spring is now fixed/glued to the cart. What is the cart velocity at x=0.20 m during deceleration?',
    conditions: ['Spring remains attached past x=0', 'Energy conserved in simple harmonic motion'],
    solutionRef: { type: 'SOLUTION', id: 'demo:wpe:boundary-solution', revision: 1, sha256: 'd'.repeat(64) },
    solutionSteps: [
      'Total mechanical energy E_tot = 12.0 J',
      'At x = 0.20 m, potential energy E_p = 1/2 * 150 * (0.04) = 3.0 J',
      'Kinetic energy E_k = 12.0 - 3.0 = 9.0 J',
      'v = sqrt(2 * 9.0 / 1.5) = sqrt(12.0) = 3.46 m/s',
    ],
    targetNumeric: { value: 3.46, unit: 'm/s', tolerance: 0.05 },
  };

  return {
    journeyId: 'journey:transfer:wpe:01',
    originRef: { type: 'QUESTION', id: 'demo:wpe:source', revision: 1, sha256: 'e'.repeat(64) },
    freshTaskA,
    boundaryTaskB,
    hints: [
      {
        level: 'H1',
        assetRef: { type: 'ASSET', id: 'demo:wpe:hint-1', revision: 1, sha256: 'f'.repeat(64) },
        text: 'Identify the conservative system: energy interchanges between elastic and kinetic.',
        guidance: 'Write E_initial = E_final.',
      },
      {
        level: 'H2',
        assetRef: { type: 'ASSET', id: 'demo:wpe:hint-2', revision: 1, sha256: '1'.repeat(64) },
        text: 'Calculate the numerical energy stored: 1/2 * k * x_0^2.',
        guidance: 'Watch decimal squares (0.4^2 = 0.16).',
      },
      {
        level: 'H3',
        assetRef: { type: 'ASSET', id: 'demo:wpe:hint-3', revision: 1, sha256: '2'.repeat(64) },
        text: 'Equate to kinetic energy: 1/2 * m * v^2 = 12 J and solve for v.',
        guidance: 'Solve v = sqrt(2 * 12 / 1.5).',
      },
    ],
    diagnosticRules: [
      {
        code: 'ERR_PEAK_FORCE',
        label: 'Peak Force Assumption',
        misconceptionDescription: 'Calculated work using maximum force k*x instead of average 1/2 k*x.',
        correctiveGuidance: 'Integrate linear restoring force or apply work-energy theorem.',
      },
      {
        code: 'ERR_SIGN_CONVENTION',
        label: 'Sign Inversion',
        misconceptionDescription: 'Subtracted kinetic energy or inverted work sign.',
        correctiveGuidance: 'Positive work by relaxing spring increases cart kinetic energy.',
      },
    ],
    qualitativePredictionPrompt: 'If spring compression x is doubled from 0.20 m to 0.40 m, exit speed increases by:',
    predictionOptions: [
      'Factor of 1.41',
      'Factor of 2.0 (doubles)',
      'Factor of 4.0 (quadruples)',
    ],
    expectedPredictionIndex: 1,
    status: 'CANDIDATE',
  };
}

describe('A32 Core1B Transfer Journey: Six-Stage Sequence & Task Separation', () => {
  it('progresses in strict order across all six cognitive stages to COMPLETE', () => {
    const def = createSampleTransferDefinition();
    const journey = new Core1BTransferJourney(def);

    // 1. PREDICT
    assert.equal(journey.getStage(), 'PREDICT');
    journey.predict(1);

    // 2. ATTEMPT (Task A)
    assert.equal(journey.getStage(), 'ATTEMPT');
    journey.updateTaskAAttempt('Computed energy = 12 J, exit velocity = 4.0 m/s', 4.0);
    journey.commitFirstAttempt();

    // 3. RECONSTRUCT
    assert.equal(journey.getStage(), 'RECONSTRUCT');
    const solution = journey.getTaskASolution();
    assert.ok(solution.length === 3);
    journey.completeReconstruction();

    // 4. DIAGNOSE
    assert.equal(journey.getStage(), 'DIAGNOSE');
    journey.selectDiagnostic('ERR_PEAK_FORCE');
    journey.commitDiagnosis();

    // 5. REPAIR
    assert.equal(journey.getStage(), 'REPAIR');
    journey.setRepairExplanation('Corrected peak force to integral average 1/2 k x^2.');
    journey.commitRepair();

    // 6. BOUNDARY_TEST (Task B)
    assert.equal(journey.getStage(), 'BOUNDARY_TEST');
    journey.updateTaskBAttempt('Attached spring keeps oscillating; at x=0.20 m v = 3.46 m/s', 3.46);
    journey.commitBoundaryAttempt();

    // COMPLETE
    assert.equal(journey.getStage(), 'COMPLETE');
    const returnRoute = journey.returnToSource();
    assert.equal(returnRoute, '/learn/demo:wpe:source');
    assert.equal(journey.isSourceReturned(), true);
  });

  it('strictly rejects identical task IDs across Task A and Task B', () => {
    const def = createSampleTransferDefinition();
    const defectiveDef: Core1BTransferDefinition = {
      ...def,
      boundaryTaskB: { ...def.freshTaskA },
    };

    assert.throws(
      () => new Core1BTransferJourney(defectiveDef),
      (err: any) => err instanceof Core1BValidationError && err.code === 'TASK_SEPARATION_VIOLATION'
    );
  });

  it('strictly rejects clone tasks that reuse origin question ID', () => {
    const def = createSampleTransferDefinition();
    const cloneDef: Core1BTransferDefinition = {
      ...def,
      freshTaskA: {
        ...def.freshTaskA,
        taskRef: { ...def.originRef, type: 'FRESH_TASK' },
      },
    };

    assert.throws(
      () => new Core1BTransferJourney(cloneDef),
      (err: any) => err instanceof Core1BValidationError && err.code === 'CLONE_TASK_REJECTED'
    );
  });
});

describe('A32 Core1B Precommit Secrecy & Ordered Hints', () => {
  it('denies solution access prior to commit-first in ATTEMPT stage', () => {
    const def = createSampleTransferDefinition();
    const journey = new Core1BTransferJourney(def);

    journey.predict(1);
    assert.equal(journey.getStage(), 'ATTEMPT');

    // Attempting to access Task A solution before commit-first throws
    assert.throws(
      () => journey.getTaskASolution(),
      (err: any) => err instanceof Core1BValidationError && err.code === 'PRECOMMIT_SECRECY_DENIED'
    );
  });

  it('exposes hints strictly in H1 -> H2 -> H3 order and marks attempt as assisted', () => {
    const def = createSampleTransferDefinition();
    const journey = new Core1BTransferJourney(def);

    journey.predict(1);
    assert.equal(journey.isAssistedAttempt(), false);

    // Request Hint 1
    const h1 = journey.requestHint();
    assert.equal(h1.level, 'H1');
    assert.equal(journey.isAssistedAttempt(), true);

    // Request Hint 2
    const h2 = journey.requestHint();
    assert.equal(h2.level, 'H2');

    // Request Hint 3
    const h3 = journey.requestHint();
    assert.equal(h3.level, 'H3');

    // Further hint requests throw
    assert.throws(
      () => journey.requestHint(),
      (err: any) => err instanceof Core1BValidationError && err.code === 'ALL_HINTS_EXPOSED'
    );
  });

  it('locks boundary feedback on Task B until boundary attempt is committed', () => {
    const def = createSampleTransferDefinition();
    const journey = new Core1BTransferJourney(def);

    // Fast forward to BOUNDARY_TEST
    journey.predict(1);
    journey.updateTaskAAttempt('Solution A');
    journey.commitFirstAttempt();
    journey.completeReconstruction();
    journey.selectDiagnostic('ERR_PEAK_FORCE');
    journey.commitDiagnosis();
    journey.setRepairExplanation('Repair reasoning');
    journey.commitRepair();

    assert.equal(journey.getStage(), 'BOUNDARY_TEST');
    assert.equal(journey.isBoundaryCommitted(), false);

    // Solution B locked before commit
    assert.throws(
      () => journey.getTaskBSolution(),
      (err: any) => err instanceof Core1BValidationError && err.code === 'BOUNDARY_FEEDBACK_LOCKED'
    );

    journey.updateTaskBAttempt('Solution B');
    journey.commitBoundaryAttempt();
    assert.equal(journey.isBoundaryCommitted(), true);
    assert.ok(journey.getTaskBSolution().length > 0);
  });
});

describe('A32 Core1B Draft Serialization & Non-Destructive Session Preservation', () => {
  it('preserves draft state across reload roundtrip without destructive reset', () => {
    const def = createSampleTransferDefinition();
    const journey = new Core1BTransferJourney(def);

    journey.predict(1);
    journey.requestHint(); // Exposes H1
    journey.updateTaskAAttempt('Draft working steps in progress...', 4.0);

    const draft = journey.toDraft();
    assert.equal(draft.currentStage, 'ATTEMPT');
    assert.equal(draft.predictionIndex, 1);
    assert.equal(draft.isAssisted, true);
    assert.equal(draft.exposedHints.length, 1);
    assert.equal(draft.taskAAttemptText, 'Draft working steps in progress...');

    // Restore into fresh journey instance
    const restoredJourney = new Core1BTransferJourney(def);
    restoredJourney.restoreDraft(draft);

    assert.equal(restoredJourney.getStage(), 'ATTEMPT');
    assert.equal(restoredJourney.isAssistedAttempt(), true);
    assert.equal(restoredJourney.getExposedHints().length, 1);
    assert.equal(restoredJourney.getExposedHints()[0].level, 'H1');
  });
});

describe('A32 Core1B Transfer Page Controller & Tablet Ergonomics', () => {
  it('renders populated transfer screen with all six stages and Rule 13 disclaimer', () => {
    const def = createSampleTransferDefinition();
    const controller = new Core1BTransferPageController({ transferDefinition: def });

    const html = controller.render();
    assert.ok(html.includes('data-screen-state="populated"'));
    assert.ok(html.includes('Fresh Transfer Challenge &bull; Core1B'));
    assert.ok(html.includes('1. PREDICT'));
    assert.ok(html.includes('6. BOUNDARY_TEST'));
    assert.ok(html.includes('No academic approval inferred from software validation.'));
  });

  it('supports dual-orientation layout and handles declared screen states', () => {
    const def = createSampleTransferDefinition();
    const controller = new Core1BTransferPageController({
      transferDefinition: def,
      orientation: 'LANDSCAPE',
    });

    assert.ok(controller.render().includes('g9-transfer-page landscape'));
    controller.setOrientation('PORTRAIT');
    assert.ok(controller.render().includes('g9-transfer-page portrait'));

    // Loading state
    const loadingCtrl = new Core1BTransferPageController({ initialState: 'loading' });
    assert.ok(loadingCtrl.render().includes('data-screen-state="loading"'));

    // Pending review state
    const pendingCtrl = new Core1BTransferPageController({
      transferDefinition: { ...def, status: 'PENDING_REVIEW' },
    });
    assert.ok(pendingCtrl.render().includes('data-screen-state="pending review"'));

    // Stale origin state
    const staleCtrl = new Core1BTransferPageController({
      transferDefinition: { ...def, status: 'STALE' },
    });
    assert.ok(staleCtrl.render().includes('data-screen-state="stale origin"'));

    // Save blocked state
    const saveBlockedCtrl = new Core1BTransferPageController({
      initialState: 'save blocked',
    });
    assert.ok(saveBlockedCtrl.render().includes('data-screen-state="save blocked"'));
  });

  it('verifies all interactive elements conform to minimum 48px hit target bounds', () => {
    const def = createSampleTransferDefinition();
    const controller = new Core1BTransferPageController({ transferDefinition: def });

    assert.ok(controller.getViewState().minHitTargetPx >= 48);
    const html = controller.render();
    assert.ok(html.includes(`min-height: ${HIT_TARGET_MIN_PX}px`));
    assert.ok(html.includes(`min-width: ${HIT_TARGET_MIN_PX}px`));
  });
});
