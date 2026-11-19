/**
 * tests/browser/core2b.spec.ts
 * A68 — Test suite for Core2B changed-demand application transfer.
 *
 * Verifies:
 * - BP-CORE2B-TRANSFER@1.1.0 compliance
 * - Prior exposure and taught capability closure (missing lineage / untaught capabilities blocked)
 * - Protected DECIDE move withheld pre-attempt
 * - Safe scaffolds isolation (rejection of scaffolds that collapse transfer demand)
 * - Durable commitment: first attempt is immutable; mutation leaks rejected
 * - Save failure blocks reveal (atomic persistence gate)
 * - Multi-factor rubric without automatic human grading
 * - Independent boundary and diagnostic repair route
 * - Dual-orientation tablet layout and 48px touch hit target ergonomics
 *
 * No academic approval inferred from software validation.
 */

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import {
  CORE2B_BLUEPRINT_ID,
  Core2BTransferJourney,
} from '../../web/journeys/core2b.ts';
import type {
  Core2BTransferDefinition,
  LearnerCapabilityProfile,
  DurableStoragePort,
  CommittedAttempt,
} from '../../web/journeys/core2b.ts';
import {
  Core2BApplicationTransferPageController,
} from '../../web/pages/application-transfer.ts';
import { HIT_TARGET_MIN_PX } from '../../web/styles/tokens.ts';

function createSampleTransferDefinition(overrides: Partial<Core2BTransferDefinition['task']> = {}): Core2BTransferDefinition {
  return {
    journeyId: 'journey-transfer-wpe-01',
    topicId: 'PHYS-TOPIC-WPE',
    status: 'CANDIDATE',
    task: {
      taskId: 'task-core2b-wpe-001',
      title: 'Work-Energy Theorem with Non-Zero Initial Velocity & Variable Friction',
      stem: 'A block of mass 2.0 kg moves along a rough horizontal plane with an initial speed of 5.0 m/s. The friction coefficient increases linearly with distance x as mu(x) = 0.10 * x. Determine the stopping distance.',
      stemSha256: 'a1b2c3d4e5f67890abcdef1234567890abcdef1234567890abcdef1234567890',
      lineage: {
        anchorTaskId: 'task-core1b-wpe-anchor-01',
        anchorSha256: 'fedcba0987654321fedcba0987654321fedcba0987654321fedcba0987654321',
        requiredCapabilityIds: ['CAP-WPE-WORK-INTEGRAL', 'CAP-WPE-ENERGY-THEOREM'],
        dimension: 'CONSTRAINT_MUTATION',
        statement: 'Transition from constant friction to position-dependent variable friction integral with non-zero initial kinetic energy.',
        isCoverStoryOnly: false,
      },
      protectedMove: {
        id: 'pm-wpe-01',
        description: 'Integral boundary selection with non-zero initial kinetic energy',
        crucialDecision: 'Integrate mu(x)*m*g from 0 to s and equate to (1/2)*m*v0^2 instead of zero initial state',
        withheldPreAttempt: true,
        revealedPostAttemptExplanation: 'The essential change from the anchor problem was establishing that net work is Delta K = 0 - (1/2)*m*v0^2, requiring the variable friction force integral to equate to the initial kinetic energy.',
      },
      scaffolds: [
        {
          id: 'scaff-1',
          level: 'ORIENTATION',
          title: 'Variable Force Reminder',
          hintText: 'Recall that work done by a position-dependent force requires integration: W = int(F(x), dx).',
          collapsesTransferDemand: false,
        },
        {
          id: 'scaff-2',
          level: 'CLARIFICATION',
          title: 'Work-Kinetic Energy Balance',
          hintText: 'Net work equals the change in kinetic energy: W_net = K_f - K_i.',
          collapsesTransferDemand: false,
        },
      ],
      rubric: [
        {
          id: 'rubric-1',
          criterionText: 'Formulates work integral for variable friction correctly',
          maxPoints: 2,
          acceptableVariations: ['int(0.1*x*m*g, dx)', '0.5 * 0.1 * m * g * s^2'],
          diagnosticMisconceptions: ['Used constant friction formula W = mu*m*g*s without integration'],
        },
        {
          id: 'rubric-2',
          criterionText: 'Applies Work-Energy Theorem with non-zero initial speed',
          maxPoints: 2,
          acceptableVariations: ['-W_friction = 0 - 0.5*m*v_0^2', 'W_net = Delta K'],
          diagnosticMisconceptions: ['Assumed initial speed was zero', 'Omitted negative sign on resistive work'],
        },
        {
          id: 'rubric-3',
          criterionText: 'Solves quadratic stopping distance accurately',
          maxPoints: 1,
          acceptableVariations: ['s = sqrt(v_0^2 / (0.1*g)) = sqrt(25 / 0.98) ~= 5.05 m'],
          diagnosticMisconceptions: ['Arithmetic error', 'Dimensionally inconsistent power of distance'],
        },
      ],
      fullSolutionSteps: [
        '1. Express friction force: F_f(x) = mu(x) * N = (0.10 * x) * (m * g).',
        '2. Compute work done by friction from 0 to s: W_f = - int_0^s 0.10 * m * g * x dx = - 0.05 * m * g * s^2.',
        '3. Apply work-energy theorem: W_net = Delta K => - 0.05 * m * g * s^2 = 0 - 0.5 * m * v_0^2.',
        '4. Simplify: 0.05 * g * s^2 = 0.5 * v_0^2 => s^2 = v_0^2 / (0.10 * g).',
        '5. Substitute values: s = sqrt(25 / 0.981) ~= 5.05 m.',
      ],
      repairRoute: {
        repairId: 'repair-wpe-friction-integral',
        diagnosticFocus: 'Position-dependent work integration',
        targetMisconception: 'Applying constant force formula to spatially varying friction',
        remediationTaskRef: 'task-core1a-variable-force-work',
        isIndependentBoundaryPreserved: true,
      },
      ...overrides,
    },
  };
}

function createSampleLearnerProfile(overrides: Partial<LearnerCapabilityProfile> = {}): LearnerCapabilityProfile {
  return {
    learnerId: 'learner-test-01',
    taughtCapabilityIds: ['CAP-WPE-WORK-INTEGRAL', 'CAP-WPE-ENERGY-THEOREM'],
    priorExposures: ['task-core1b-wpe-anchor-01'],
    ...overrides,
  };
}

describe('A68 Core2B Journey: Lineage & Capability Closure Gates', () => {
  it('instantiates valid Core2B transfer journey when capability closure is satisfied', () => {
    const def = createSampleTransferDefinition();
    const profile = createSampleLearnerProfile();
    const journey = new Core2BTransferJourney(def, profile);

    assert.equal(CORE2B_BLUEPRINT_ID, 'BP-CORE2B-TRANSFER@1.1.0');
    assert.equal(journey.getState().phase, 'PRE_ATTEMPT');
    assert.equal(journey.getState().isProtectedMoveWithheld, true);
    assert.equal(journey.getState().isAttemptCommitted, false);
    assert.equal(journey.getState().academicAdmission, 'HOLD');
    assert.equal(journey.getState().releaseAuthority, 'NONE');
    assert.equal(journey.getState().gradingAuthority, 'NO_AUTOMATIC_HUMAN_GRADING');
  });

  it('fails closed when prerequisite capability is untaught', () => {
    const def = createSampleTransferDefinition();
    // Learner is missing CAP-WPE-WORK-INTEGRAL
    const profile = createSampleLearnerProfile({
      taughtCapabilityIds: ['CAP-WPE-ENERGY-THEOREM'],
    });

    const closure = Core2BTransferJourney.verifyCapabilityClosure(def.task.lineage, profile);
    assert.equal(closure.isEligible, false);
    assert.equal(closure.reason, 'UNTAUGHT_CAPABILITY_BLOCKED');
    assert.deepEqual(closure.missingCapabilities, ['CAP-WPE-WORK-INTEGRAL']);

    assert.throws(
      () => new Core2BTransferJourney(def, profile),
      /TRANSFER_INELIGIBLE: UNTAUGHT_CAPABILITY_BLOCKED/,
    );
  });

  it('fails closed when prior anchor lineage is missing', () => {
    const def = createSampleTransferDefinition({
      lineage: {
        anchorTaskId: '',
        anchorSha256: '',
        requiredCapabilityIds: ['CAP-WPE-WORK-INTEGRAL', 'CAP-WPE-ENERGY-THEOREM'],
        dimension: 'CONSTRAINT_MUTATION',
        statement: 'No lineage anchor',
        isCoverStoryOnly: false,
      },
    });
    const profile = createSampleLearnerProfile();

    const closure = Core2BTransferJourney.verifyCapabilityClosure(def.task.lineage, profile);
    assert.equal(closure.isEligible, false);
    assert.equal(closure.reason, 'MISSING_LINEAGE_BLOCKED');

    assert.throws(
      () => new Core2BTransferJourney(def, profile),
      /TRANSFER_INELIGIBLE: MISSING_LINEAGE_BLOCKED/,
    );
  });

  it('strictly rejects transfer claim derived from cover story only', () => {
    const def = createSampleTransferDefinition({
      lineage: {
        anchorTaskId: 'task-core1b-wpe-anchor-01',
        anchorSha256: 'fedcba0987654321fedcba0987654321fedcba0987654321fedcba0987654321',
        requiredCapabilityIds: ['CAP-WPE-WORK-INTEGRAL', 'CAP-WPE-ENERGY-THEOREM'],
        dimension: 'CONSTRAINT_MUTATION',
        statement: 'Superficial skinning change',
        isCoverStoryOnly: true,
      },
    });
    const profile = createSampleLearnerProfile();

    const closure = Core2BTransferJourney.verifyCapabilityClosure(def.task.lineage, profile);
    assert.equal(closure.isEligible, false);
    assert.equal(closure.reason, 'COVER_STORY_ONLY_REJECTED');

    assert.throws(
      () => new Core2BTransferJourney(def, profile),
      /TRANSFER_INELIGIBLE: COVER_STORY_ONLY_REJECTED/,
    );
  });
});

describe('A68 Core2B Journey: Protected DECIDE Move & Scaffold Isolation', () => {
  it('strictly rejects pre-attempt exposure of protected move', () => {
    const def = createSampleTransferDefinition({
      protectedMove: {
        id: 'pm-invalid',
        description: 'Leaked move',
        crucialDecision: 'Leaked decision',
        withheldPreAttempt: false, // VIOLATION
        revealedPostAttemptExplanation: 'Explanation',
      },
    });
    const profile = createSampleLearnerProfile();

    assert.throws(
      () => new Core2BTransferJourney(def, profile),
      /PROTECTED_MOVE_DISCLOSED_PRE_ATTEMPT/,
    );
  });

  it('strictly rejects pre-attempt scaffold that collapses transfer demand', () => {
    const def = createSampleTransferDefinition({
      scaffolds: [
        {
          id: 'collapsing-scaffold',
          level: 'STRUCTURE',
          title: 'Direct Answer Formula',
          hintText: 'Just use s = sqrt(v0^2 / (0.1*g))',
          collapsesTransferDemand: true, // VIOLATION
        },
      ],
    });
    const profile = createSampleLearnerProfile();

    assert.throws(
      () => new Core2BTransferJourney(def, profile),
      /METHOD_OR_ANSWER_SUPPORT_THAT_COLLAPSES_TRANSFER/,
    );
  });

  it('permits safe scaffolds that do not collapse transfer demand', () => {
    const def = createSampleTransferDefinition();
    const profile = createSampleLearnerProfile();
    const journey = new Core2BTransferJourney(def, profile);

    const scaffolds = journey.selectScaffold('ORIENTATION');
    assert.equal(scaffolds.length, 1);
    assert.equal(scaffolds[0].level, 'ORIENTATION');
    assert.equal(scaffolds[0].collapsesTransferDemand, false);
    assert.equal(journey.getState().activeScaffoldLevel, 'ORIENTATION');
  });
});

describe('A68 Core2B Journey: Durable Commitment & First Attempt Immutability', () => {
  it('commits first attempt with deterministic hash and enforces immutability', async () => {
    const def = createSampleTransferDefinition();
    const profile = createSampleLearnerProfile();
    const journey = new Core2BTransferJourney(def, profile);

    // Update draft
    journey.updateDraft('W_f = int(0.1*x*m*g, dx); W_net = Delta K', 's = sqrt(v0^2 / (0.1*g))');

    // Commit attempt
    const committed = await journey.commitAttempt();
    assert.equal(committed.initialWorkingText, 'W_f = int(0.1*x*m*g, dx); W_net = Delta K');
    assert.equal(committed.initialSymbolicDraft, 's = sqrt(v0^2 / (0.1*g))');
    assert.ok(committed.committedSha256.length > 0);
    assert.equal(journey.getState().isAttemptCommitted, true);

    // Attempting to mutate committed attempt throws IMMUTABLE_ATTEMPT_LOCKED
    assert.throws(
      () => journey.updateDraft('Changed working text', 'new formula'),
      /IMMUTABLE_ATTEMPT_LOCKED/,
    );

    // Attempting to commit again throws IMMUTABLE_ATTEMPT_LOCKED
    await assert.rejects(
      async () => journey.commitAttempt(),
      /IMMUTABLE_ATTEMPT_LOCKED/,
    );
  });

  it('rejects committing an empty attempt', async () => {
    const def = createSampleTransferDefinition();
    const profile = createSampleLearnerProfile();
    const journey = new Core2BTransferJourney(def, profile);

    await assert.rejects(
      async () => journey.commitAttempt(),
      /EMPTY_ATTEMPT_REJECTED/,
    );
  });
});

describe('A68 Core2B Journey: Save Failure Blocks Reveal & Diagnostic Repair', () => {
  it('blocks reveal when durable storage persistence fails', async () => {
    const def = createSampleTransferDefinition();
    const profile = createSampleLearnerProfile();
    const journey = new Core2BTransferJourney(def, profile);

    journey.updateDraft('My initial attempt', 'Formula');

    // Storage mock that simulates failure
    const failingStorage: DurableStoragePort = {
      saveCommittedAttempt: async () => ({ success: false, error: 'DISK_WRITE_FAILURE' }),
    };

    // Attempting commit with failing storage throws persistence error and marks unsaved
    await assert.rejects(
      async () => journey.commitAttempt(failingStorage),
      /SAVE_FAILURE_PERSISTENCE_ERROR/,
    );

    assert.equal(journey.getState().isAttemptCommitted, true);
    assert.equal(journey.getState().isSaved, false);

    // Calling revealSolution MUST throw SAVE_FAILURE_BLOCKS_REVEAL
    assert.throws(
      () => journey.revealSolution(),
      /SAVE_FAILURE_BLOCKS_REVEAL/,
    );
  });

  it('blocks reveal if attempt has not been committed', () => {
    const def = createSampleTransferDefinition();
    const profile = createSampleLearnerProfile();
    const journey = new Core2BTransferJourney(def, profile);

    assert.throws(
      () => journey.revealSolution(),
      /ATTEMPT_REQUIRED_BEFORE_REVEAL/,
    );
  });

  it('reveals rubric and protected decision when attempt is committed and saved', async () => {
    const def = createSampleTransferDefinition();
    const profile = createSampleLearnerProfile();
    const journey = new Core2BTransferJourney(def, profile);

    journey.updateDraft('Legitimate student attempt', 'v0^2 / 0.1g');

    const successfulStorage: DurableStoragePort = {
      saveCommittedAttempt: async () => ({ success: true }),
    };

    await journey.commitAttempt(successfulStorage);
    const reveal = journey.revealSolution();

    assert.ok(reveal.protectedDecisionReview.includes('The essential change'));
    assert.equal(reveal.rubric.length, 3);
    assert.equal(reveal.solutionSteps.length, 5);
    assert.equal(journey.getState().phase, 'REVEALED');
    assert.equal(journey.getState().isProtectedMoveWithheld, false);
    assert.equal(journey.getState().isSolutionRevealed, true);
  });

  it('engages diagnostic repair and verifies independent boundary task preservation', async () => {
    const def = createSampleTransferDefinition();
    const profile = createSampleLearnerProfile();
    const journey = new Core2BTransferJourney(def, profile);

    journey.updateDraft('Attempt', 'Formula');
    await journey.commitAttempt();
    journey.revealSolution();

    const repair = journey.engageRepair();
    assert.equal(repair.repairId, 'repair-wpe-friction-integral');
    assert.equal(repair.isIndependentBoundaryPreserved, true);
    assert.equal(journey.getState().phase, 'REPAIR_ENGAGED');
  });

  it('strictly rejects repair route if independent boundary is violated', async () => {
    const def = createSampleTransferDefinition({
      repairRoute: {
        repairId: 'compromised-repair',
        diagnosticFocus: 'Focus',
        targetMisconception: 'Misconception',
        remediationTaskRef: 'task-ref',
        isIndependentBoundaryPreserved: false, // VIOLATION
      },
    });
    const profile = createSampleLearnerProfile();
    const journey = new Core2BTransferJourney(def, profile);

    journey.updateDraft('Attempt', 'Formula');
    await journey.commitAttempt();
    journey.revealSolution();

    assert.throws(
      () => journey.engageRepair(),
      /BOUNDARY_INTEGRITY_VIOLATION/,
    );
  });
});

describe('A68 Core2B Page Controller: Tablet Ergonomics & Screen States', () => {
  it('renders attempt-phase with minimum 48px hit targets and Rule 13 banner', () => {
    const def = createSampleTransferDefinition();
    const profile = createSampleLearnerProfile();
    const controller = new Core2BApplicationTransferPageController({
      definition: def,
      learnerProfile: profile,
      orientation: 'LANDSCAPE',
    });

    assert.equal(controller.getScreenState(), 'attempt-phase');
    const html = controller.renderToHTML();

    assert.ok(html.includes('No academic approval inferred from software validation.'));
    assert.ok(html.includes('Core2B Changed-Demand Transfer'));
    assert.ok(html.includes('CONSTRAINT_MUTATION'));
    assert.ok(html.includes('Protected Decision Withheld Until Attempt Committed'));
    assert.ok(html.includes(`min-height: ${HIT_TARGET_MIN_PX}px`));
    assert.ok(html.includes(`min-width: ${HIT_TARGET_MIN_PX}px`));
  });

  it('supports dual-orientation layout switching without draft loss', () => {
    const def = createSampleTransferDefinition();
    const profile = createSampleLearnerProfile();
    const controller = new Core2BApplicationTransferPageController({
      definition: def,
      learnerProfile: profile,
      orientation: 'LANDSCAPE',
    });

    controller.updateDraft('Working in landscape', 'Formula L');
    assert.equal(controller.getOrientation(), 'LANDSCAPE');

    // Switch to portrait
    controller.setOrientation('PORTRAIT');
    assert.equal(controller.getOrientation(), 'PORTRAIT');
    const portraitHtml = controller.renderToHTML();
    assert.ok(portraitHtml.includes('orientation-portrait'));
    assert.ok(portraitHtml.includes('transfer-layout portrait'));

    // Switch back to landscape
    controller.setOrientation('LANDSCAPE');
    assert.equal(controller.getOrientation(), 'LANDSCAPE');
    const landscapeHtml = controller.renderToHTML();
    assert.ok(landscapeHtml.includes('orientation-landscape'));
    assert.ok(landscapeHtml.includes('transfer-layout landscape'));
  });

  it('renders declared blocked states: missing-lineage, untaught-capability, and save-error', () => {
    // Missing lineage
    const missingLineageCtrl = new Core2BApplicationTransferPageController({
      definition: createSampleTransferDefinition({
        lineage: {
          anchorTaskId: '',
          anchorSha256: '',
          requiredCapabilityIds: ['CAP-WPE-WORK-INTEGRAL'],
          dimension: 'CONSTRAINT_MUTATION',
          statement: 'Missing',
          isCoverStoryOnly: false,
        },
      }),
      learnerProfile: createSampleLearnerProfile(),
    });
    assert.equal(missingLineageCtrl.getScreenState(), 'missing-lineage');
    const mlHtml = missingLineageCtrl.renderToHTML();
    assert.ok(mlHtml.includes('Transfer Blocked: Missing Lineage'));
    assert.ok(mlHtml.includes(`min-height: ${HIT_TARGET_MIN_PX}px`));

    // Untaught capability
    const untaughtCtrl = new Core2BApplicationTransferPageController({
      definition: createSampleTransferDefinition(),
      learnerProfile: createSampleLearnerProfile({ taughtCapabilityIds: [] }),
    });
    assert.equal(untaughtCtrl.getScreenState(), 'untaught-capability');
    const ucHtml = untaughtCtrl.renderToHTML();
    assert.ok(ucHtml.includes('Transfer Blocked: Untaught Capability'));

    // Save error state
    const saveErrorCtrl = new Core2BApplicationTransferPageController({
      initialState: 'save-error',
      errorMessage: 'Storage write failed.',
    });
    assert.equal(saveErrorCtrl.getScreenState(), 'save-error');
    const seHtml = saveErrorCtrl.renderToHTML();
    assert.ok(seHtml.includes('Durable Commitment Failed'));
    assert.ok(seHtml.includes('Storage write failed.'));
  });

  it('renders revealed-phase with multi-factor rubric and diagnostic repair action', async () => {
    const def = createSampleTransferDefinition();
    const profile = createSampleLearnerProfile();
    const controller = new Core2BApplicationTransferPageController({
      definition: def,
      learnerProfile: profile,
    });

    controller.updateDraft('Student work', 's = 5.05m');
    await controller.commitAttempt();
    controller.revealSolution();

    assert.equal(controller.getScreenState(), 'revealed-phase');
    const html = controller.renderToHTML();

    assert.ok(html.includes('Evaluation Rubric (Criterion-Referenced)'));
    assert.ok(html.includes('Note: No automatic human grading.'));
    assert.ok(html.includes('Formulates work integral for variable friction correctly'));
    assert.ok(html.includes('Engage Diagnostic Repair'));

    // Request repair
    const repair = controller.requestRepair();
    assert.equal(repair.repairId, 'repair-wpe-friction-integral');
    assert.equal(controller.getScreenState(), 'repair-phase');
  });
});

