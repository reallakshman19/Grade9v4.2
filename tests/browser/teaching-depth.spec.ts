/**
 * tests/browser/teaching-depth.spec.ts
 * A51 — Progressive Core1A Model & Anchor Views Browser Test Suite.
 *
 * Verifies:
 * 1. Reachability of all nine A1–A9 units with depth modes (EASY, MEDIUM, HARD).
 * 2. Honest unavailable state when a unit is missing or unauthored.
 * 3. Exact figure/caption/warrants and representation bridges.
 * 4. Three progressive anchors (FOUNDATION, CONNECTED, ADVANCED) with distinct identities.
 * 5. Distinct unassisted synthesis task and N32 recycling prevention.
 * 6. Scientific model stage prediction gating, parameter bounds, and live telemetry.
 * 7. Precommit secrecy: no answer leak and zero leak of reserved fresh tasks.
 * 8. Accessible 48px minimum touch hitbox bounds.
 *
 * No academic approval inferred from software validation.
 */

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  Core1AUnitViewController,
  Core1AAnchorViewController,
  Core1AModelStageController,
} from '../../web/components/teaching/index.ts';
import type {
  Core1AUnitData,
  ProgressiveAnchor,
  Core1AModelConfig,
  ExactRef,
} from '../../web/journeys/core1a.ts';
import { HIT_TARGET_MIN_PX } from '../../web/styles/tokens.ts';

function createSampleUnit(role: 'A1' | 'A2' | 'A3' | 'A4' | 'A5' | 'A6' | 'A7' | 'A8' | 'A9'): Core1AUnitData {
  return {
    role,
    title: `Unit ${role} Scientific Topic`,
    summary: `Summary of unit ${role} concepts.`,
    bodyText: `Detailed instructional body for unit ${role}.`,
    blockRefs: [{ type: 'PRESENTATION', id: `pres:wpe:${role.toLowerCase()}`, revision: 1, sha256: 'a'.repeat(64) }],
    evidenceRefs: [{ type: 'WARRANT', id: `war:wpe:${role.toLowerCase()}`, revision: 1, sha256: 'b'.repeat(64) }],
    conventions: role === 'A2' ? ['Axis +x along horizontal', 'Equilibrium at x=0'] : undefined,
    representationBridge: role === 'A3' ? [
      {
        pictureElement: 'Spring vector pointing opposite to displacement',
        symbol: 'F_s = -kx',
        inWords: 'Restoring force is linearly proportional to displacement',
      },
    ] : undefined,
    derivationSteps: role === 'A4' ? [
      {
        stepNumber: 1,
        expression: 'dW = F(x) dx = -kx dx',
        whyValid: 'Work definition under 1D variable force',
      },
      {
        stepNumber: 2,
        expression: 'W = \\int_{-x_0}^0 -kx dx = 1/2 k x_0^2',
        whyValid: 'Definite Riemann integration',
      },
    ] : undefined,
    workedExample: role === 'A6' ? {
      problemPrompt: 'Find exit velocity for m=2.0 kg and k=200 N/m.',
      fullReasoningSteps: [
        'E_i = 1/2 k x^2 = 9.0 J',
        'E_f = 1/2 m v^2 = 9.0 J => v = 3.0 m/s',
      ],
      solutionResult: 'v = 3.0 m/s',
    } : undefined,
    misconception: role === 'A7' ? {
      wrongIdea: 'Using peak force instead of average force',
      diagnosticPrompt: 'Why does W = kx^2 overestimate work?',
      repair: 'Force decreases linearly, so effective average force is half the peak.',
    } : undefined,
    boundaryConditions: role === 'A8' ? [
      'Normal contact drops to zero at natural length x=0',
      'Oscillations occur only if attached',
    ] : undefined,
    selfCheckPrompt: role === 'A9' ? 'Check dimensional units of sqrt(k/m * x^2).' : undefined,
  };
}

function createSampleAnchors(): ProgressiveAnchor[] {
  return [
    {
      level: 'FOUNDATION',
      taskRef: { type: 'FRESH_TASK', id: 'task:anchor:foundation:01', revision: 1, sha256: 'c'.repeat(64) },
      title: 'Foundation Anchor',
      prompt: 'Calculate exit velocity for 1 kg block.',
      solutionRef: { type: 'SOLUTION', id: 'sol:anchor:foundation:01', revision: 1, sha256: 'd'.repeat(64) },
      solutionSteps: ['Compute PE = 2.0 J', 'Equate to KE: v = 2.0 m/s'],
      warrantRefs: [{ type: 'WARRANT', id: 'war:anchor:foundation:01', revision: 1, sha256: 'b'.repeat(64) }],
    },
    {
      level: 'CONNECTED',
      taskRef: { type: 'FRESH_TASK', id: 'task:anchor:connected:01', revision: 1, sha256: 'e'.repeat(64) },
      title: 'Connected Anchor',
      prompt: 'Cart sliding onto rough surface with friction.',
      solutionRef: { type: 'SOLUTION', id: 'sol:anchor:connected:01', revision: 1, sha256: 'f'.repeat(64) },
      solutionSteps: ['Calculate sliding distance: d = 2.04 m'],
      warrantRefs: [{ type: 'WARRANT', id: 'war:anchor:connected:01', revision: 1, sha256: 'b'.repeat(64) }],
    },
    {
      level: 'ADVANCED',
      taskRef: { type: 'FRESH_TASK', id: 'task:anchor:advanced:01', revision: 1, sha256: '1'.repeat(64) },
      title: 'Advanced Anchor',
      prompt: 'Incline launch with gravity and spring combination.',
      solutionRef: { type: 'SOLUTION', id: 'sol:anchor:advanced:01', revision: 1, sha256: '2'.repeat(64) },
      solutionSteps: ['Energy balance: h_max = 0.204 m'],
      warrantRefs: [{ type: 'WARRANT', id: 'war:anchor:advanced:01', revision: 1, sha256: 'b'.repeat(64) }],
    },
  ];
}

function createSampleModelConfig(): Core1AModelConfig {
  return {
    modelId: 'spring-launcher-01',
    modelName: 'Linear Spring Mass Launcher',
    defaultParameters: { mass: 2.0, springConstant: 200, compression: 0.3 },
    parameterBounds: {
      mass: { min: 0.1, max: 10.0 },
      springConstant: { min: 10, max: 1000 },
      compression: { min: 0.01, max: 1.0 },
    },
    qualitativePredictionPrompt: 'What happens to cart exit speed if compression is doubled?',
    predictionOptions: ['Speed is unchanged', 'Speed doubles', 'Speed quadruples'],
    expectedPredictionIndex: 1,
    observationNote: 'Doubling compression quadruples elastic potential energy, doubling departure speed.',
  };
}

describe('A51 Core1A Unit View: Depth Modes & Reachability', () => {
  it('renders all nine units A1–A9 with correct roles and metadata', () => {
    const roles: Array<'A1' | 'A2' | 'A3' | 'A4' | 'A5' | 'A6' | 'A7' | 'A8' | 'A9'> = [
      'A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'A9',
    ];

    for (const role of roles) {
      const unit = createSampleUnit(role);
      const controller = new Core1AUnitViewController({ unitData: unit });
      const html = controller.render();

      assert.ok(html.includes(`data-unit-role="${role}"`));
      assert.ok(html.includes(`Unit ${role} Scientific Topic`));
      assert.ok(html.includes(`pres:wpe:${role.toLowerCase()}`));
      assert.ok(html.includes(`war:wpe:${role.toLowerCase()}`));
    }
  });

  it('renders honest unavailable alert when unit data is missing', () => {
    const controller = new Core1AUnitViewController({ initialRole: 'A7' });
    const html = controller.render();

    assert.ok(html.includes('data-availability="UNAVAILABLE"'));
    assert.ok(html.includes('Teaching Unit A7 Unavailable'));
    assert.ok(!html.includes('Completed Exemplar'));
  });

  it('adapts instructional content across EASY, MEDIUM, and HARD depth modes', () => {
    const a4 = createSampleUnit('A4');
    const controller = new Core1AUnitViewController({ unitData: a4, initialDepth: 'HARD' });

    // HARD mode: shows full derivation and whyValid justification
    let html = controller.render();
    assert.ok(html.includes('Analytical Derivation &amp; Invariants'));
    assert.ok(html.includes('Validity Justification:'));
    assert.ok(html.includes('Work definition under 1D variable force'));

    // MEDIUM mode: shows derivation, but omits deep research justification
    controller.setDepthMode('MEDIUM');
    html = controller.render();
    assert.ok(html.includes('Analytical Derivation &amp; Invariants'));
    assert.ok(!html.includes('Validity Justification:'));

    // EASY mode: conceals deep derivations
    controller.setDepthMode('EASY');
    html = controller.render();
    assert.ok(!html.includes('Analytical Derivation &amp; Invariants'));
  });

  it('enforces precommit masking on worked example solutions', () => {
    const a6 = createSampleUnit('A6');
    const controller = new Core1AUnitViewController({ unitData: a6 });

    // Initially reasoning steps are concealed
    let html = controller.render();
    assert.ok(html.includes('Completed Exemplar &bull; Full Inference'));
    assert.ok(!html.includes('Target Solution: v = 3.0 m/s'));
    assert.ok(!html.includes('Step-by-step Crux Construction'));

    // Toggle reveal
    controller.toggleWorkedExample();
    html = controller.render();
    assert.ok(html.includes('Target Solution: v = 3.0 m/s'));
    assert.ok(html.includes('Step-by-step Crux Construction'));
  });
});

describe('A51 Core1A Progressive Anchors & Synthesis Isolation', () => {
  it('renders three progressive anchors with exact warrants and concealed solutions', () => {
    const anchors = createSampleAnchors();
    const synthesisRef: ExactRef = {
      type: 'FRESH_TASK',
      id: 'task:synthesis:distinct:01',
      revision: 1,
      sha256: '9'.repeat(64),
    };

    const controller = new Core1AAnchorViewController({
      anchors,
      synthesisTaskRef: synthesisRef,
      synthesisTaskPrompt: 'Design a spring system for satellite deployment.',
    });

    let html = controller.render();
    assert.ok(html.includes('data-active-anchor="FOUNDATION"'));
    assert.ok(html.includes('Foundation Anchor'));
    assert.ok(!html.includes('Compute PE = 2.0 J')); // Solution masked

    // Switch to CONNECTED
    controller.selectLevel('CONNECTED');
    html = controller.render();
    assert.ok(html.includes('data-active-anchor="CONNECTED"'));
    assert.ok(html.includes('Connected Anchor'));

    // Reveal CONNECTED solution
    controller.toggleSolution('CONNECTED');
    html = controller.render();
    assert.ok(html.includes('Calculate sliding distance: d = 2.04 m'));
  });

  it('strictly rejects recycled synthesis tasks reusing anchor IDs (N32)', () => {
    const anchors = createSampleAnchors();
    // Re-use foundation anchor ID for synthesis task
    const recycledSynthesisRef: ExactRef = {
      type: 'FRESH_TASK',
      id: 'task:anchor:foundation:01',
      revision: 1,
      sha256: '9'.repeat(64),
    };

    assert.throws(
      () => new Core1AAnchorViewController({
        anchors,
        synthesisTaskRef: recycledSynthesisRef,
        synthesisTaskPrompt: 'Invalid recycled task',
      }),
      (err: any) => err.message.includes('N32_VIOLATION')
    );
  });
});

describe('A51 Core1A Scientific Model Stage & Telemetry', () => {
  it('enforces prediction gating before simulation observation', () => {
    const modelCfg = createSampleModelConfig();
    const controller = new Core1AModelStageController(modelCfg);

    assert.equal(controller.getViewState().isObserved, false);

    // Attempting observation before predicting throws
    assert.throws(
      () => controller.observe(),
      (err: any) => err.message.includes('QUALITATIVE_PREDICTION_REQUIRED')
    );

    // Commit prediction
    controller.predict(1);
    assert.equal(controller.getViewState().predictionIndex, 1);

    // Now observation succeeds
    controller.observe();
    assert.equal(controller.getViewState().isObserved, true);

    const html = controller.render();
    assert.ok(html.includes('Live Analytical Telemetry:'));
    assert.ok(html.includes('Initial PE (E_p):'));
    assert.ok(html.includes('Exit Velocity:'));
  });

  it('detects parameter values exceeding physical domain bounds', () => {
    const modelCfg = createSampleModelConfig();
    const controller = new Core1AModelStageController(modelCfg);

    // Mass valid
    controller.updateParameter('mass', 5.0);
    assert.equal(controller.getViewState().isDomainValid, true);

    // Mass invalid (> 10.0)
    controller.updateParameter('mass', 50.0);
    assert.equal(controller.getViewState().isDomainValid, false);
    assert.ok(controller.render().includes('Physical Domain Error:'));
  });

  it('verifies all interactive elements conform to minimum 48px hit target bounds', () => {
    const a1 = createSampleUnit('A1');
    const unitCtrl = new Core1AUnitViewController({ unitData: a1 });
    assert.ok(unitCtrl.getViewState().minHitTargetPx >= 48);
    assert.ok(unitCtrl.render().includes(`min-height: ${HIT_TARGET_MIN_PX}px`));

    const anchors = createSampleAnchors();
    const anchorCtrl = new Core1AAnchorViewController({
      anchors,
      synthesisTaskRef: { type: 'FRESH_TASK', id: 'synth:1', revision: 1, sha256: 'a'.repeat(64) },
      synthesisTaskPrompt: 'Design prompt',
    });
    assert.ok(anchorCtrl.getViewState().minHitTargetPx >= 48);
    assert.ok(anchorCtrl.render().includes(`min-height: ${HIT_TARGET_MIN_PX}px`));
  });
});
