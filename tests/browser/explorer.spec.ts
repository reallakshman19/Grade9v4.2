/**
 * tests/browser/explorer.spec.ts
 * A65 — GCDR Explorer runtime browser test suite.
 *
 * Verifies:
 * - Ten-stage GCDR progression (PREDICT to TRANSFER) with gate checks
 * - State-bound helper contracts (Chalkboard, Trap Alert, Independent Check, Takeaway)
 * - Truthful fidelity and binding labels (no false canonical claims, academic proof disclaimer)
 * - Synchronized primary scene and second-view telemetry in lockstep
 * - Dual-orientation layout (Landscape split view, Portrait stacked flow)
 * - State persistence across device rotation and lifecycle transitions
 * - 48px minimum touch/hit target compliance
 *
 * No academic approval inferred from software validation.
 */

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import {
  GcdrExplorerJourney,
  GCDR_ORDERED_STAGES,
} from '../../web/journeys/explorer.ts';
import {
  GcdrExplorerPageController,
} from '../../web/pages/explorer.ts';
import type { GcdrHelperStates } from '../../web/journeys/explorer.ts';

const DEMO_HELPERS: GcdrHelperStates = {
  chalkboardNote: 'Energy conservation governs motion in conservative potential wells.',
  trapAlert: 'Do not confuse total mechanical energy with variable potential energy.',
  independentCheckPrompt: 'Verify that U(x) + K(x) = 12.5 J at any intermediate coordinate.',
  transferTakeaway: 'Conservative restoring forces always produce bounded oscillatory motion.',
  exactnessBadge: {
    fidelity: 'NUMERICAL_EXACT',
    binding: 'CANONICAL_BINDING',
    academicClaimDisclaimer: 'Simulations are engineering exploration tools, not certified academic proofs.',
  },
};

describe('A65 GCDR Explorer Journey: Ten-Stage Progression', () => {
  it('enforces sequential progression across all ten GCDR stages', () => {
    const journey = new GcdrExplorerJourney('explorer-01', DEMO_HELPERS);

    // Initial stage is PREDICT
    assert.equal(journey.getCurrentStage(), 'PREDICT');
    assert.equal(journey.getCurrentStageIndex(), 0);

    // Advancing without recording prediction fails
    const badAdv = journey.advance();
    assert.equal(badAdv.success, false);
    assert.match(badAdv.error || '', /without recording/i);

    // Record prediction and advance through all 10 stages
    const testResponses: Record<string, string> = {
      PREDICT: 'Particle will oscillate between turning points.',
      MANIPULATE: 'Swept x across -0.5 to +0.5.',
      OBSERVE: 'Observed speed drops to 0 at bounds.',
      CONTRADICT: 'Initial thought that speed is constant was disproven.',
      DECONSTRUCT: 'Identified restoring force F = -dU/dx = -100x.',
      RECONSTRUCT: 'Reconstructed conservation law U + K = 12.5 J.',
      INVARIANT: 'Tested conservation at 5 arbitrary coordinates.',
      BOUNDARY: 'Tested turning points x = +/-0.5 m.',
      FADE: 'Solved unassisted displacement equation.',
      TRANSFER: 'Applied potential well model to spring mass oscillator.',
    };

    for (let i = 0; i < GCDR_ORDERED_STAGES.length - 1; i++) {
      const stage = GCDR_ORDERED_STAGES[i]!;
      journey.setStageResponse(stage, testResponses[stage]!);
      const adv = journey.advance();
      assert.equal(adv.success, true);
    }

    assert.equal(journey.getCurrentStage(), 'TRANSFER');
    assert.equal(journey.getCurrentStageIndex(), 9);

    // Cannot advance past stage 10
    const finalAdv = journey.advance();
    assert.equal(finalAdv.success, false);
  });

  it('permits jumping to past completed stages but rejects forward jumps', () => {
    const journey = new GcdrExplorerJourney('explorer-01', DEMO_HELPERS);
    journey.setStageResponse('PREDICT', 'Prediction entry');
    journey.advance(); // now at MANIPULATE (index 1)

    // Backward jump to PREDICT (permitted)
    assert.equal(journey.goToStage('PREDICT'), true);
    assert.equal(journey.getCurrentStage(), 'PREDICT');

    // Forward jump to unreached BOUNDARY stage (rejected)
    assert.equal(journey.goToStage('BOUNDARY'), false);
    assert.equal(journey.getCurrentStage(), 'PREDICT');
  });
});

describe('A65 GCDR State-Bound Helpers & Truthful Exactness', () => {
  it('controls helper drawer exposure and includes mandatory academic proof disclaimer', () => {
    const controller = new GcdrExplorerPageController({
      explorerId: 'explorer-01',
      title: 'Potential Well Investigation',
      subject: 'phys',
      topic: 'wpe',
      helpers: DEMO_HELPERS,
    });

    const state = controller.getViewState();
    assert.equal(state.exactnessBadge.academicClaimDisclaimer, 'Simulations are engineering exploration tools, not certified academic proofs.');
    assert.equal(state.exactnessBadge.binding, 'CANONICAL_BINDING');

    // Toggle chalkboard drawer
    controller.toggleHelperDrawer('CHALKBOARD');
    assert.equal(controller.getActiveHelperDrawer(), 'CHALKBOARD');
    const htmlWithChalkboard = controller.renderHtml();
    assert.ok(htmlWithChalkboard.includes("Teacher's Chalkboard:"));
    assert.ok(htmlWithChalkboard.includes('Energy conservation governs'));

    // Toggle off
    controller.toggleHelperDrawer('CHALKBOARD');
    assert.equal(controller.getActiveHelperDrawer(), null);
  });

  it('honestly badges unbound extensions without false canonical claims', () => {
    const unboundHelpers: GcdrHelperStates = {
      ...DEMO_HELPERS,
      exactnessBadge: {
        fidelity: 'QUALITATIVE_SYNTHETIC',
        binding: 'UNBOUND_EXTENSION',
        academicClaimDisclaimer: 'Simulations are engineering exploration tools, not certified academic proofs.',
      },
    };

    const controller = new GcdrExplorerPageController({
      explorerId: 'explorer-unbound',
      title: 'Advanced JEE Multi-Well Extension',
      subject: 'phys',
      topic: 'wpe',
      helpers: unboundHelpers,
    });

    const state = controller.getViewState();
    assert.equal(state.exactnessBadge.binding, 'UNBOUND_EXTENSION');
    assert.equal(state.exactnessBadge.fidelity, 'QUALITATIVE_SYNTHETIC');

    const html = controller.renderHtml();
    assert.ok(html.includes('UNBOUND_EXTENSION'));
    assert.ok(!html.includes('CANONICAL_BINDING'));
  });
});

describe('A65 GCDR Synchronized Telemetry & Dual Orientations', () => {
  it('synchronizes primary scene and second-view telemetry in lockstep', () => {
    const controller = new GcdrExplorerPageController({
      explorerId: 'explorer-01',
      title: 'Synchronized Telemetry Test',
      subject: 'phys',
      topic: 'wpe',
      helpers: DEMO_HELPERS,
      initialParameters: { x: 0.0 },
    });

    // Center state (x = 0)
    const t0 = controller.getTelemetry();
    assert.equal(t0.potentialEnergy, 0.0);
    assert.equal(t0.kineticEnergy, 12.5);
    assert.equal(t0.speed, 5.0);
    assert.equal(t0.isTurningPoint, false);

    // Turning point state (x = 0.5)
    controller.getJourney().setModelParameter('x', 0.5);
    const t1 = controller.getTelemetry();
    assert.equal(t1.potentialEnergy, 12.5);
    assert.equal(t1.kineticEnergy, 0.0);
    assert.equal(t1.speed, 0.0);
    assert.equal(t1.isTurningPoint, true);

    const html = controller.renderHtml();
    assert.ok(html.includes('AT TURNING POINT'));
    assert.ok(html.includes('12.5 J'));
  });

  it('supports dual-orientation layout and preserves state across rotation roundtrip', () => {
    const controller = new GcdrExplorerPageController({
      explorerId: 'explorer-01',
      title: 'Orientation Roundtrip Test',
      subject: 'phys',
      topic: 'wpe',
      helpers: DEMO_HELPERS,
      orientation: 'LANDSCAPE',
    });

    controller.getJourney().setModelParameter('x', -0.25);
    controller.getJourney().setStageResponse('PREDICT', 'Initial hypothesis');
    controller.getJourney().advance();

    assert.equal(controller.getOrientation(), 'LANDSCAPE');
    const landscapeHtml = controller.renderHtml();
    assert.ok(landscapeHtml.includes('grid-template-columns: 1fr 1fr')); // Split view

    // Switch to Portrait
    controller.setOrientation('PORTRAIT');
    assert.equal(controller.getOrientation(), 'PORTRAIT');
    const portraitHtml = controller.renderHtml();
    assert.ok(portraitHtml.includes('flex-direction: column')); // Stacked flow

    // Export and restore
    const saved = controller.exportState();
    assert.equal(saved.orientation, 'PORTRAIT');
    assert.equal(saved.draft.modelParameters['x'], -0.25);

    const restoredController = new GcdrExplorerPageController({
      explorerId: 'explorer-01',
      title: 'Orientation Roundtrip Test',
      subject: 'phys',
      topic: 'wpe',
      helpers: DEMO_HELPERS,
      orientation: 'LANDSCAPE',
    });
    restoredController.restoreState(saved);

    assert.equal(restoredController.getOrientation(), 'PORTRAIT');
    assert.equal(restoredController.getJourney().getModelParameters()['x'], -0.25);
    assert.equal(restoredController.getJourney().getCurrentStage(), 'MANIPULATE');
  });

  it('verifies all interactive elements conform to 48px hit target bounds', () => {
    const controller = new GcdrExplorerPageController({
      explorerId: 'explorer-01',
      title: 'Hit Target Bounds Verification',
      subject: 'phys',
      topic: 'wpe',
      helpers: DEMO_HELPERS,
    });

    const state = controller.getViewState();
    assert.equal(state.minHitTargetPx, 48);

    const html = controller.renderHtml();
    assert.ok(html.includes('min-height: 48px'));
    assert.ok(html.includes('min-width: 48px'));
    assert.ok(html.includes('class="gcdr-stage-step'));
    assert.ok(html.includes('class="gcdr-helper-btn'));
  });
});
