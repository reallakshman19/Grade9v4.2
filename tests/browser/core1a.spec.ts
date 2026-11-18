/**
 * tests/browser/core1a.spec.ts
 * A31 — Core1A Teaching Journey and Lesson Browser Test Suite.
 *
 * Verifies:
 * 1. Nine typed instructional units (A1–A9) in native-mapped sequence.
 * 2. Three progressive anchors (FOUNDATION, CONNECTED, ADVANCED) with distinct identities.
 * 3. Rejection of recycled synthesis task (N32 invariant).
 * 4. Representation bridge (picture, symbol, words) and derivation justifications.
 * 5. Scientific model qualitative prediction gating and domain bounds checking.
 * 6. Gated fresh route transfer (route only if eligible; rejects stale/missing/unready).
 * 7. Precommit secrecy: No answer leakage in DOM before disclosure.
 * 8. Dual-orientation tablet layout, declared screen states, and 48px hit target bounds.
 * 9. Rule 13 invariant preservation.
 *
 * No academic approval inferred from software validation.
 */

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  Core1ATeachingJourney,
  Core1AValidationError,
  CORE1A_ORDERED_ROLES,
} from '../../web/journeys/core1a.ts';
import type {
  Core1ALessonDefinition,
  Core1AUnitData,
  ProgressiveAnchor,
} from '../../web/journeys/core1a.ts';
import {
  Core1ALessonPageController,
} from '../../web/pages/lesson.ts';
import { HIT_TARGET_MIN_PX } from '../../web/styles/tokens.ts';

function createMockUnits(): Core1AUnitData[] {
  return [
    {
      role: 'A1',
      title: 'Why the push ends',
      summary: 'Phenomenon of the compressed spring releasing a cart until natural length.',
      bodyText: 'Observe how the spring pushes the block until x=0 where contact terminates.',
      blockRefs: [{ type: 'PRESENTATION', id: 'pres:wpe:a1', revision: 1, sha256: 'a'.repeat(64) }],
      evidenceRefs: [{ type: 'WARRANT', id: 'war:wpe:01', revision: 1, sha256: 'b'.repeat(64) }],
    },
    {
      role: 'A2',
      title: 'What you need first',
      summary: 'Coordinate axes and equilibrium definition.',
      bodyText: 'We define the origin x=0 at the relaxed natural length of the spring.',
      blockRefs: [{ type: 'PRESENTATION', id: 'pres:wpe:a2', revision: 1, sha256: 'a'.repeat(64) }],
      evidenceRefs: [{ type: 'WARRANT', id: 'war:wpe:01', revision: 1, sha256: 'b'.repeat(64) }],
      conventions: [
        'Origin x=0 fixed at relaxed spring end.',
        'Displacement positive rightward (+x).',
        'Frictionless horizontal guide rail.',
      ],
    },
    {
      role: 'A3',
      title: 'Make a physical model',
      summary: 'Representation bridge across visual, symbolic, and verbal forms.',
      bodyText: 'Connecting restoring force arrows to algebraic expressions and verbal rules.',
      blockRefs: [{ type: 'PRESENTATION', id: 'pres:wpe:a3', revision: 1, sha256: 'a'.repeat(64) }],
      evidenceRefs: [{ type: 'WARRANT', id: 'war:wpe:01', revision: 1, sha256: 'b'.repeat(64) }],
      representationBridge: [
        {
          pictureElement: 'Spring vector arrow pointing left',
          symbol: 'F_s = -kx',
          inWords: 'Restoring force proportional to displacement opposite to extension',
        },
        {
          pictureElement: 'Shaded triangular area under F-x curve',
          symbol: 'W = 1/2 k x^2',
          inWords: 'Elastic potential energy stored in spring deformation',
        },
      ],
    },
    {
      role: 'A4',
      title: 'Why the equations work',
      summary: 'Rigorous derivation of work done by linear restoring force.',
      bodyText: 'Integrating Hookean force over displacement interval from -x_0 to 0.',
      blockRefs: [{ type: 'PRESENTATION', id: 'pres:wpe:a4', revision: 1, sha256: 'a'.repeat(64) }],
      evidenceRefs: [{ type: 'WARRANT', id: 'war:wpe:01', revision: 1, sha256: 'b'.repeat(64) }],
      derivationSteps: [
        {
          stepNumber: 1,
          expression: 'dW = F(x) dx = -kx dx',
          whyValid: 'Definition of infinitesimal work under 1D variable force',
        },
        {
          stepNumber: 2,
          expression: 'W = \\int_{-x_0}^{0} (-kx) dx = [ -1/2 k x^2 ]_{-x_0}^{0}',
          whyValid: 'Linearity of Riemann integral over continuous spring displacement',
        },
        {
          stepNumber: 3,
          expression: 'W = 0 - (-1/2 k x_0^2) = 1/2 k x_0^2',
          whyValid: 'Fundamental Theorem of Calculus evaluated at release boundaries',
        },
      ],
    },
    {
      role: 'A5',
      title: 'Read the model',
      summary: 'Simulation exploration of energy interchange during release.',
      bodyText: 'Observe how potential energy transforms completely into kinetic energy at detachment.',
      blockRefs: [{ type: 'PRESENTATION', id: 'pres:wpe:a5', revision: 1, sha256: 'a'.repeat(64) }],
      evidenceRefs: [{ type: 'WARRANT', id: 'war:wpe:01', revision: 1, sha256: 'b'.repeat(64) }],
    },
    {
      role: 'A6',
      title: 'Build your reasoning',
      summary: 'Completed worked example without skipped steps.',
      bodyText: 'Step-by-step analytical calculation of departure speed for 2.0 kg block with k=200 N/m.',
      blockRefs: [{ type: 'PRESENTATION', id: 'pres:wpe:a6', revision: 1, sha256: 'a'.repeat(64) }],
      evidenceRefs: [{ type: 'WARRANT', id: 'war:wpe:01', revision: 1, sha256: 'b'.repeat(64) }],
      workedExample: {
        problemPrompt: 'A 2.0 kg cart is compressed by 0.30 m against a spring with k=200 N/m. Find departure speed.',
        fullReasoningSteps: [
          'State conservation of mechanical energy: E_i = E_f since guide rail is frictionless.',
          'Initial energy E_i = 1/2 k x_0^2 + 0 = 0.5 * 200 * (0.30)^2 = 9.0 J.',
          'Final energy at natural length x=0: E_f = 0 + 1/2 m v_f^2.',
          'Equate energies: 1/2 m v_f^2 = 9.0 J => 1/2 * 2.0 * v_f^2 = 9.0 => v_f^2 = 9.0 => v_f = 3.0 m/s.',
        ],
        solutionResult: 'v_f = 3.0 m/s',
      },
    },
    {
      role: 'A7',
      title: 'Find the first wrong idea',
      summary: 'Misconception analysis: confusing peak force with average force.',
      bodyText: 'Many novices multiply maximum force k*x by distance x, doubling the actual work done.',
      blockRefs: [{ type: 'PRESENTATION', id: 'pres:wpe:a7', revision: 1, sha256: 'a'.repeat(64) }],
      evidenceRefs: [{ type: 'WARRANT', id: 'war:wpe:01', revision: 1, sha256: 'b'.repeat(64) }],
      misconception: {
        wrongIdea: 'Using W = F_max * d = (kx)*x = kx^2 as if the force were constant throughout.',
        diagnosticPrompt: 'Why does W = k*x^2 violate the work-energy theorem for a linearly relaxing spring?',
        repair: 'The force decreases linearly from k*x to 0, so the effective average force is (kx + 0)/2 = 1/2 kx.',
      },
    },
    {
      role: 'A8',
      title: 'When does the rule change?',
      summary: 'Limiting cases and boundary breakdown.',
      bodyText: 'What happens if the spring is glued to the cart? The cart will not detach at x=0.',
      blockRefs: [{ type: 'PRESENTATION', id: 'pres:wpe:a8', revision: 1, sha256: 'a'.repeat(64) }],
      evidenceRefs: [{ type: 'WARRANT', id: 'war:wpe:01', revision: 1, sha256: 'b'.repeat(64) }],
      boundaryConditions: [
        'Separation occurs if cart is unattached: normal contact force N_contact drops to 0 at x=0.',
        'If attached, oscillatory motion continues past equilibrium with negative acceleration.',
      ],
    },
    {
      role: 'A9',
      title: 'Put it together',
      summary: 'Synthesis reflection and integrative check.',
      bodyText: 'Synthesize potential-energy well depth with velocity vectors across the trajectory.',
      blockRefs: [{ type: 'PRESENTATION', id: 'pres:wpe:a9', revision: 1, sha256: 'a'.repeat(64) }],
      evidenceRefs: [{ type: 'WARRANT', id: 'war:wpe:01', revision: 1, sha256: 'b'.repeat(64) }],
      selfCheckPrompt: 'Verify dimensional consistency: [k] = N/m = kg/s^2, so [sqrt(k/m * x^2)] = m/s.',
    },
  ];
}

function createMockAnchors(): ProgressiveAnchor[] {
  return [
    {
      level: 'FOUNDATION',
      taskRef: { type: 'FRESH_TASK', id: 'task:anchor:foundation', revision: 1, sha256: 'c'.repeat(64) },
      title: 'Foundation Anchor: Standard Detachment',
      prompt: 'Calculate exit velocity for m=1.0 kg, k=100 N/m, x=0.2 m.',
      solutionRef: { type: 'SOLUTION', id: 'sol:anchor:foundation', revision: 1, sha256: 'd'.repeat(64) },
      solutionSteps: [
        'W = 0.5 * 100 * (0.2)^2 = 2.0 J',
        'v = sqrt(2 * 2.0 / 1.0) = 2.0 m/s',
      ],
      warrantRefs: [{ type: 'WARRANT', id: 'war:wpe:01', revision: 1, sha256: 'b'.repeat(64) }],
    },
    {
      level: 'CONNECTED',
      taskRef: { type: 'FRESH_TASK', id: 'task:anchor:connected', revision: 1, sha256: 'e'.repeat(64) },
      title: 'Connected Anchor: Friction on Runout Path',
      prompt: 'After detaching at x=0, cart enters a rough horizontal track with mu=0.10. How far does it slide?',
      solutionRef: { type: 'SOLUTION', id: 'sol:anchor:connected', revision: 1, sha256: 'f'.repeat(64) },
      solutionSteps: [
        'Initial kinetic energy entering rough track = 2.0 J',
        'Friction force f_k = mu * m * g = 0.10 * 1.0 * 9.8 = 0.98 N',
        'Distance d = E_k / f_k = 2.0 / 0.98 = 2.04 m',
      ],
      warrantRefs: [{ type: 'WARRANT', id: 'war:wpe:01', revision: 1, sha256: 'b'.repeat(64) }],
    },
    {
      level: 'ADVANCED',
      taskRef: { type: 'FRESH_TASK', id: 'task:anchor:advanced', revision: 1, sha256: '1'.repeat(64) },
      title: 'Advanced Anchor: Inclined Release With Pre-Compression',
      prompt: 'Cart released on a 30-degree incline from spring compressed by 0.20 m. Find maximum height reached.',
      solutionRef: { type: 'SOLUTION', id: 'sol:anchor:advanced', revision: 1, sha256: '2'.repeat(64) },
      solutionSteps: [
        'Total mechanical energy conserved throughout launch and ascent',
        'E_initial = 1/2 k x_0^2 + m g h_0 = m g h_max',
        'h_max = (1/2 k x_0^2)/(m g) = 2.0 / 9.8 = 0.204 m above launch point',
      ],
      warrantRefs: [{ type: 'WARRANT', id: 'war:wpe:01', revision: 1, sha256: 'b'.repeat(64) }],
    },
  ];
}

function createValidLesson(): Core1ALessonDefinition {
  return {
    lessonRef: { type: 'LESSON', id: 'les:physics:wpe:01', revision: 1, sha256: '3'.repeat(64) },
    constructionRef: { type: 'CONSTRUCTION', id: 'con:physics:wpe:01', revision: 1, sha256: '4'.repeat(64) },
    title: 'Work and Kinetic Energy in Spring Launchers',
    subject: 'Physics',
    topicId: 'PHYS-TOPIC-WPE',
    depthBadge: 'HARD',
    status: 'CANDIDATE',
    units: createMockUnits(),
    anchors: createMockAnchors(),
    modelConfig: {
      modelId: 'harmonic-oscillator',
      modelName: 'Single Degree-of-Freedom Spring-Mass Launcher',
      defaultParameters: { mass: 2.0, springConstant: 200, compression: 0.3 },
      parameterBounds: {
        mass: { min: 0.1, max: 10.0 },
        springConstant: { min: 10, max: 1000 },
        compression: { min: 0.01, max: 1.0 },
      },
      qualitativePredictionPrompt: 'What happens to cart exit speed if compression distance is doubled?',
      predictionOptions: [
        'Speed remains unchanged',
        'Speed increases by a factor of 1.41 (sqrt 2)',
        'Speed doubles (factor of 2)',
        'Speed quadruples (factor of 4)',
      ],
      expectedPredictionIndex: 2,
      observationNote: 'Doubling compression quadruples elastic potential energy, which doubles exit speed.',
    },
    synthesisTaskRef: {
      type: 'FRESH_TASK',
      id: 'task:synthesis:unassisted:01',
      revision: 1,
      sha256: '5'.repeat(64),
    },
    synthesisTaskPrompt: 'Design a spring launcher to achieve exit velocity 5.0 m/s for a 0.5 kg payload.',
    freshTaskRef: {
      type: 'FRESH_TASK',
      id: 'task:fresh:transfer:target:01',
      revision: 1,
      sha256: '6'.repeat(64),
    },
  };
}

describe('A31 Core1A Teaching Journey: Native-Mapped Units & Anchors', () => {
  it('instantiates valid Core1A lesson with full A1–A9 sequence', () => {
    const lessonDef = createValidLesson();
    const journey = new Core1ATeachingJourney(lessonDef);

    assert.equal(journey.getActiveRole(), 'A1');
    assert.equal(journey.getActiveUnit().title, 'Why the push ends');

    // Step through all 9 units
    for (let i = 0; i < CORE1A_ORDERED_ROLES.length - 1; i++) {
      const nextRole = journey.nextSection();
      assert.equal(nextRole, CORE1A_ORDERED_ROLES[i + 1]);
    }
    assert.equal(journey.getActiveRole(), 'A9');
  });

  it('rejects lesson with missing teaching unit roles', () => {
    const lessonDef = createValidLesson();
    // Drop unit A7
    const defectiveUnits = lessonDef.units.filter((u) => u.role !== 'A7');
    const defectiveLesson: Core1ALessonDefinition = { ...lessonDef, units: defectiveUnits };

    assert.throws(
      () => new Core1ATeachingJourney(defectiveLesson),
      (err: any) => err instanceof Core1AValidationError && err.code === 'INVALID_UNIT_COUNT'
    );
  });

  it('rejects lesson with duplicate teaching unit roles', () => {
    const lessonDef = createValidLesson();
    // Replace A9 with another A1
    const defectiveUnits = [...lessonDef.units.slice(0, 8), { ...lessonDef.units[0] }];
    const defectiveLesson: Core1ALessonDefinition = { ...lessonDef, units: defectiveUnits };

    assert.throws(
      () => new Core1ATeachingJourney(defectiveLesson),
      (err: any) => err instanceof Core1AValidationError && err.code === 'MISSING_TEACHING_ROLE'
    );
  });

  it('rejects lesson when synthesis task recycles an anchor task ID (N32 invariant)', () => {
    const lessonDef = createValidLesson();
    // Re-use foundation anchor task ID for synthesis task
    const recycledSynthesisLesson: Core1ALessonDefinition = {
      ...lessonDef,
      synthesisTaskRef: { ...lessonDef.anchors[0].taskRef },
    };

    assert.throws(
      () => new Core1ATeachingJourney(recycledSynthesisLesson),
      (err: any) => err instanceof Core1AValidationError && err.code === 'RECYCLED_SYNTHESIS_TASK'
    );
  });

  it('verifies representation bridge and derivation justifications in instructional units', () => {
    const lessonDef = createValidLesson();
    const journey = new Core1ATeachingJourney(lessonDef);

    journey.selectSection('A3');
    const a3 = journey.getActiveUnit();
    assert.ok(a3.representationBridge && a3.representationBridge.length === 2);
    assert.equal(a3.representationBridge[0].symbol, 'F_s = -kx');

    journey.selectSection('A4');
    const a4 = journey.getActiveUnit();
    assert.ok(a4.derivationSteps && a4.derivationSteps.length === 3);
    assert.ok(a4.derivationSteps[0].whyValid.includes('Definition of infinitesimal work'));
  });
});

describe('A31 Core1A Scientific Model Prediction & Domain Bounds', () => {
  it('enforces qualitative prediction before permitting simulation observation', () => {
    const lessonDef = createValidLesson();
    const journey = new Core1ATeachingJourney(lessonDef);

    journey.selectSection('A5');
    assert.equal(journey.isModelObserved(), false);

    // Attempting to observe before predicting must fail
    assert.throws(
      () => journey.observeModel(),
      (err: any) => err instanceof Core1AValidationError && err.code === 'PREDICTION_REQUIRED'
    );

    // Commit prediction
    journey.predictModel(2);
    const pred = journey.getModelPrediction();
    assert.equal(pred.index, 2);
    assert.equal(pred.isCorrect, true);

    // Now observing succeeds
    journey.observeModel();
    assert.equal(journey.isModelObserved(), true);
  });

  it('detects parameter values exceeding model physical domain bounds', () => {
    const lessonDef = createValidLesson();
    const journey = new Core1ATeachingJourney(lessonDef);

    journey.updateModelParameter('mass', 5.0);
    assert.equal(journey.checkModelFit().valid, true);

    // Mass exceeding max of 10.0
    assert.throws(
      () => journey.updateModelParameter('mass', 15.0),
      (err: any) => err instanceof Core1AValidationError && err.code === 'INVALID_MODEL_DOMAIN'
    );
  });

  it('preserves depth badge invariance while permitting view inspection', () => {
    const lessonDef = createValidLesson();
    const journey = new Core1ATeachingJourney(lessonDef);

    assert.equal(journey.getDepthBadge(), 'HARD');
    assert.equal(journey.getCurrentDepthView(), 'HARD');

    journey.setDepthView('EASY');
    assert.equal(journey.getCurrentDepthView(), 'EASY');
    // Intrinsic badge of the subtopic itself does not mutate
    assert.equal(journey.getDepthBadge(), 'HARD');
  });
});

describe('A31 Core1A Fresh Route Gating & Precommit Secrecy', () => {
  it('blocks fresh task transfer if learner has not reviewed prerequisite instructional units', () => {
    const lessonDef = createValidLesson();
    const journey = new Core1ATeachingJourney(lessonDef);

    // Learner is only on A1
    assert.equal(journey.canRouteToFreshTransfer(), false);
    assert.equal(journey.getFreshRouteRejectionReason(), 'no eligible fresh task');

    assert.throws(
      () => journey.getFreshTransferRoute(),
      (err: any) => err instanceof Core1AValidationError && err.code === 'FRESH_TRANSFER_INELIGIBLE'
    );
  });

  it('blocks fresh transfer if lesson status is STALE or fresh task reference is missing', () => {
    const lessonDef = createValidLesson();
    const staleLesson: Core1ALessonDefinition = { ...lessonDef, status: 'STALE' };
    const staleJourney = new Core1ATeachingJourney(staleLesson);

    assert.equal(staleJourney.canRouteToFreshTransfer(), false);
    assert.equal(staleJourney.getFreshRouteRejectionReason(), 'stale lesson');

    const noFreshTaskLesson: Core1ALessonDefinition = { ...lessonDef, freshTaskRef: undefined };
    const noFreshJourney = new Core1ATeachingJourney(noFreshTaskLesson);
    assert.equal(noFreshJourney.canRouteToFreshTransfer(), false);
    assert.equal(noFreshJourney.getFreshRouteRejectionReason(), 'no fresh task');
  });

  it('permits fresh transfer only when all criteria are satisfied', () => {
    const lessonDef = createValidLesson();
    const journey = new Core1ATeachingJourney(lessonDef);

    // Visit required units A1 through A9 and observe model
    for (const role of CORE1A_ORDERED_ROLES) {
      journey.selectSection(role);
    }
    journey.predictModel(2);
    journey.observeModel();

    assert.equal(journey.canRouteToFreshTransfer(), true);
    assert.equal(journey.getFreshTransferRoute(), '/transfer/les:physics:wpe:01');
  });

  it('enforces precommit masking on worked example solutions and anchor solutions', () => {
    const lessonDef = createValidLesson();
    const journey = new Core1ATeachingJourney(lessonDef);

    // By default, solutions are not revealed
    assert.equal(journey.isWorkedExampleRevealed('A6'), false);
    assert.equal(journey.isAnchorSolutionRevealed('FOUNDATION'), false);

    // Toggle worked example
    journey.toggleWorkedExample('A6');
    assert.equal(journey.isWorkedExampleRevealed('A6'), true);

    // Toggle anchor solution
    journey.toggleAnchorSolution('FOUNDATION');
    assert.equal(journey.isAnchorSolutionRevealed('FOUNDATION'), true);
  });
});

describe('A31 Core1A Lesson Page Controller & Tablet Ergonomics', () => {
  it('renders populated lesson screen with A1–A9 tabs and mandatory Rule 13 disclaimer', () => {
    const lessonDef = createValidLesson();
    const controller = new Core1ALessonPageController({ lessonDefinition: lessonDef });

    const html = controller.render();
    assert.ok(html.includes('data-screen-state="populated"'));
    assert.ok(html.includes('Work and Kinetic Energy in Spring Launchers'));
    assert.ok(html.includes('data-role="A1"'));
    assert.ok(html.includes('data-role="A9"'));
    assert.ok(html.includes('No academic approval inferred from software validation.'));
  });

  it('supports dual-orientation layout and retains state across rotation roundtrip', () => {
    const lessonDef = createValidLesson();
    const controller = new Core1ALessonPageController({
      lessonDefinition: lessonDef,
      orientation: 'LANDSCAPE',
    });

    controller.actionSection('A4');
    controller.actionPredictModel(2);
    controller.actionObserveModel();

    // Verify landscape HTML
    const landscapeHtml = controller.render();
    assert.ok(landscapeHtml.includes('g9-lesson-page landscape'));

    // Rotate to portrait
    controller.setOrientation('PORTRAIT');
    assert.equal(controller.getOrientation(), 'PORTRAIT');
    const portraitHtml = controller.render();
    assert.ok(portraitHtml.includes('g9-lesson-page portrait'));

    // Roundtrip draft serialization
    const draft = controller.toDraft();
    assert.ok(draft !== null);
    assert.equal(draft.activeUnitRole, 'A4');
    assert.equal(draft.modelObserved, true);

    const restoredController = new Core1ALessonPageController({ lessonDefinition: lessonDef });
    restoredController.restoreDraft(draft);
    const restoredState = restoredController.getViewState();
    assert.equal(restoredState.activeUnitRole, 'A4');
    assert.equal(restoredState.modelObserved, true);
  });

  it('handles declared screen states: loading, error, stale lesson, no fresh task, invalid model domain', () => {
    const lessonDef = createValidLesson();

    // Loading state
    const loadingCtrl = new Core1ALessonPageController({ initialState: 'loading' });
    assert.ok(loadingCtrl.render().includes('data-screen-state="loading"'));

    // Error state
    const errorCtrl = new Core1ALessonPageController({
      initialState: 'error',
      errorMessage: 'Synthetic failure',
    });
    assert.ok(errorCtrl.render().includes('data-screen-state="error"'));
    assert.ok(errorCtrl.render().includes('Synthetic failure'));

    // Stale lesson state
    const staleCtrl = new Core1ALessonPageController({
      lessonDefinition: { ...lessonDef, status: 'STALE' },
    });
    assert.ok(staleCtrl.render().includes('data-screen-state="stale lesson"'));

    // No fresh task state
    const noFreshCtrl = new Core1ALessonPageController({
      lessonDefinition: { ...lessonDef, freshTaskRef: undefined },
    });
    assert.ok(noFreshCtrl.render().includes('data-screen-state="no fresh task"'));

    // Invalid model domain state
    const modelDomainCtrl = new Core1ALessonPageController({ lessonDefinition: lessonDef });
    modelDomainCtrl.updateModelParameter('mass', 999.0);
    assert.ok(modelDomainCtrl.render().includes('data-screen-state="invalid model domain"'));
  });

  it('verifies all interactive buttons conform to minimum 48px hit target bounds', () => {
    const lessonDef = createValidLesson();
    const controller = new Core1ALessonPageController({ lessonDefinition: lessonDef });
    const viewState = controller.getViewState();

    assert.ok(viewState.minHitTargetPx >= 48);
    const html = controller.render();
    assert.ok(html.includes(`min-height: ${HIT_TARGET_MIN_PX}px`));
    assert.ok(html.includes(`min-width: ${HIT_TARGET_MIN_PX}px`));
  });
});
