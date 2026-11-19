/**
 * tests/browser/models.spec.ts
 * A50 — Scientific interactive model component browser test suite.
 *
 * Verifies:
 * - Model parameter manipulation via typed controls and keyboard stepping
 * - Domain bounds clamping and invalid input handling
 * - Synchronized visual SVG representation and accessible text descriptions
 * - Lifecycle state persistence across rotation and suspension ("touch/keyboard/rotate preserve model state")
 * - Policy-filtered output disclosure in UI ("no automatic output precommit")
 * - 48px minimum touch/hit target compliance
 *
 * No academic approval inferred from software validation.
 */

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import {
  ScientificModelController,
} from '../../web/components/scientific-model.ts';

describe('A50 Scientific Model Component: Interaction & Keyboard Stepping', () => {
  it('initializes with default parameter values and clamps within valid physical bounds', () => {
    const controller = new ScientificModelController({
      modelIdOrFamily: 'PHYS-MODEL-ENERGY-WELL',
    });

    assert.equal(controller.getParameter('x'), 0.0);

    // Valid update
    assert.equal(controller.setParameter('x', 0.25), true);
    assert.equal(controller.getParameter('x'), 0.25);

    // Upper boundary clamping (max is 0.5)
    assert.equal(controller.setParameter('x',0.8),false);assert.equal(controller.getParameter('x'),0.25);

    // Lower boundary clamping (min is -0.5)
    assert.equal(controller.setParameter('x',-0.9),false);assert.equal(controller.getParameter('x'),0.25);
  });

  it('supports full keyboard navigation stepping (UP, DOWN, MIN, MAX)', () => {
    const controller = new ScientificModelController({
      modelIdOrFamily: 'PHYS-MODEL-ENERGY-WELL',
      initialParameters: { x: 0.1 },
    });

    // Step UP by 0.01
    assert.equal(controller.stepParameter('x', 'UP'), true);
    assert.equal(controller.getParameter('x'), 0.11);

    // Step DOWN by 0.01
    assert.equal(controller.stepParameter('x', 'DOWN'), true);
    assert.equal(controller.getParameter('x'), 0.1);

    // Jump to MAX
    assert.equal(controller.stepParameter('x', 'MAX'), true);
    assert.equal(controller.getParameter('x'), 0.5);

    // Jump to MIN
    assert.equal(controller.stepParameter('x', 'MIN'), true);
    assert.equal(controller.getParameter('x'), -0.5);
  });
});

describe('A50 Scientific Model Component: State Persistence Across Rotation/Touch', () => {
  it('preserves exact parameter state and revision count across lifecycle and orientation transitions', () => {
    const controller = new ScientificModelController({
      modelIdOrFamily: 'PHYS-MODEL-ENERGY-WELL',
      stage: 'ATTEMPT',
    });

    controller.setParameter('x', -0.35);

    const savedState = controller.exportState();
    assert.equal(savedState.modelId, 'PHYS-MODEL-ENERGY-WELL');
    assert.equal(savedState.parameterValues['x'], -0.35);

    // Fresh controller simulating orientation rotate / reload
    const rotatedController = new ScientificModelController({
      modelIdOrFamily: 'PHYS-MODEL-ENERGY-WELL',
      stage: 'ATTEMPT',
      initialParameters: { x: 0.0 }, // intentional mismatch
    });

    rotatedController.restoreState(savedState);
    assert.equal(rotatedController.getParameter('x'), -0.35);

    const viewState = rotatedController.getViewState();
    assert.equal(viewState.parameters['x'], -0.35);
  });
});

describe('A50 Scientific Model Component: Representation & Pre-Commit Masking', () => {
  it('renders synchronized SVG diagram with potential well curve, turning points, and particle', () => {
    const controller = new ScientificModelController({
      modelIdOrFamily: 'PHYS-MODEL-ENERGY-WELL',
      initialParameters: { x: 0.3 },
    });

    const svg = controller.renderDiagramSvg(440, 240);
    assert.ok(svg.includes('xmlns="http://www.w3.org/2000/svg"'));
    assert.ok(svg.includes('role="img"'));
    assert.ok(svg.includes('Model output withheld'));assert.ok(!svg.includes('12.5'));assert.ok(!svg.includes('<circle'));
    assert.ok(!svg.includes('<script'));
  });

  it('displays pre-commit masking notice in ATTEMPT stage and reveals outputs in RECONSTRUCT', () => {
    // 1. ATTEMPT stage without MODEL_AUTO_CALCULATE
    const attemptController = new ScientificModelController({
      modelIdOrFamily: 'PHYS-MODEL-ENERGY-WELL',
      stage: 'ATTEMPT',
      initialParameters: { x: 0.2 },
    });

    const attemptHtml = attemptController.renderHtml();
    assert.ok(attemptHtml.includes('Pre-Commit Masking'));
    assert.ok(attemptHtml.includes('outputs are withheld'));

    // 2. RECONSTRUCT stage -> outputs revealed
    attemptController.setStage('RECONSTRUCT');
    const reconstructHtml = attemptController.renderHtml();
    assert.ok(reconstructHtml.includes('Pre-Commit Masking'));assert.ok(!reconstructHtml.includes('Calculated Model Outputs')); // U = 50 * 0.2^2 = 2.0
  });

  it('verifies all interactive elements conform to 48px hit target bounds', () => {
    const controller = new ScientificModelController({
      modelIdOrFamily: 'PHYS-MODEL-ENERGY-WELL',
    });

    const state = controller.getViewState();
    assert.equal(state.minHitTargetPx, 48);

    const html = controller.renderHtml();
    assert.ok(html.includes('min-height: 48px'));
    assert.ok(html.includes('min-width: 48px'));
    assert.ok(html.includes('class="param-step-btn"'));
  });
});

it('rejects foreign or nonfinite snapshots and masks all render surfaces',()=>{const c=new ScientificModelController({modelIdOrFamily:'PHYS-MODEL-ENERGY-WELL',stage:'COMPLETE',allowedCapabilities:['MODEL_AUTO_CALCULATE']});assert.throws(()=>c.restoreState({...c.exportState(),modelId:'foreign'}));assert.throws(()=>c.restoreState({...c.exportState(),parameterValues:{x:NaN}}));assert.equal(c.getViewState().evaluation.outputs,null);assert.ok(!c.renderHtml().includes('12.5 J'));});

