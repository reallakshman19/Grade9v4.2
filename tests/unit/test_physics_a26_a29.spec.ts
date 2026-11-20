/**
 * tests/unit/test_physics_a26_a29.spec.ts
 * Unit verification suite for Workpack A26 (Stylus Ink) and Workpack A29 (Experimental & Graph).
 *
 * Verifies:
 * - A29 Least-squares linear regression edge cases (n < 2, vertical lines, horizontal lines, n=2 degrees of freedom)
 * - A29 Quadrature uncertainty propagation
 * - A29 Pedagogical invariant: points: null, status: 'REVIEW_PENDING', LAB_COMPETENCE_DISCLAIMER
 * - A29 Tab transitions and draft serialization roundtrip
 * - A26 InkEngine isotropic scaling SVG export across tablet orientations
 * - A26 Fault N19 pointer cancel stroke isolation
 * - A26 Fault N27 virtual keyboard scroll padding and control reachability
 * - A26 Work artifact generation
 *
 * No academic approval inferred from software validation.
 */

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import {
  computeBestFitLine,
  propagateQuadratureUncertainty,
  computeDataBounds,
} from '../../web/adapters/physics/calculations.ts';
import {
  ExperimentWorkspaceController,
} from '../../web/components/experiment.ts';
import {
  LAB_COMPETENCE_DISCLAIMER,
} from '../../web/adapters/physics/types.ts';
import {
  createInkEngine,
  InkEngine,
} from '../../web/runtime/ink.ts';
import {
  createScratchpad,
  ScratchpadController,
} from '../../web/components/workspace/scratchpad.ts';

// =============================================================================
// Workpack A29: Numerical Regression & Uncertainty Tests
// =============================================================================

describe('Workpack A29 — Least-Squares Regression & Uncertainty Propagation', () => {
  it('returns null for insufficient or invalid data points (n < 2 or non-finite)', () => {
    assert.equal(computeBestFitLine([]), null);
    assert.equal(computeBestFitLine([{ x: 1, y: 2 }]), null);
    assert.equal(computeBestFitLine([{ x: 1, y: 2 }, { x: NaN, y: 4 }]), null);
    assert.equal(computeBestFitLine([{ x: 1, y: 2 }, { x: 3, y: Infinity }]), null);
  });

  it('handles vertical line (collinear vertical points, identical x) fail-closed without division by zero', () => {
    const verticalPoints = [
      { x: 5, y: 1 },
      { x: 5, y: 2 },
      { x: 5, y: 3 },
    ];
    assert.equal(computeBestFitLine(verticalPoints), null);
  });

  it('handles horizontal line (identical y, yy=0) fail-closed', () => {
    const horizontalPoints = [
      { x: 1, y: 4 },
      { x: 2, y: 4 },
      { x: 3, y: 4 },
    ];
    assert.equal(computeBestFitLine(horizontalPoints), null);
  });

  it('computes exact best-fit line for n=2 points without uncertainty calculation (n-2 = 0 degrees of freedom)', () => {
    const twoPoints = [
      { x: 0, y: 1 },
      { x: 2, y: 5 },
    ];
    const fit = computeBestFitLine(twoPoints);
    assert.ok(fit !== null);
    assert.equal(fit.slope, 2.0);
    assert.equal(fit.intercept, 1.0);
    assert.equal(fit.rSquared, 1.0);
    assert.equal(fit.slopeUncertainty, undefined);
    assert.equal(fit.interceptUncertainty, undefined);
  });

  it('computes slope, intercept, rSquared, and standard errors for n > 2 points', () => {
    // Pendulum data: L (m) vs T^2 (s^2) where T^2 = (4*pi^2/g) * L approx 4.02 * L
    const pendulumData = [
      { x: 0.2, y: 0.81 },
      { x: 0.4, y: 1.62 },
      { x: 0.6, y: 2.41 },
      { x: 0.8, y: 3.23 },
      { x: 1.0, y: 4.02 },
    ];
    const fit = computeBestFitLine(pendulumData);
    assert.ok(fit !== null);
    assert.ok(Math.abs(fit.slope - 4.02) < 0.05);
    assert.ok(Math.abs(fit.intercept) < 0.05);
    assert.ok(fit.rSquared > 0.999);
    assert.ok(fit.slopeUncertainty !== undefined && fit.slopeUncertainty > 0);
    assert.ok(fit.interceptUncertainty !== undefined && fit.interceptUncertainty > 0);
  });

  it('propagates quadrature uncertainty using Math.hypot', () => {
    const u = [3.0, 4.0];
    const total = propagateQuadratureUncertainty(u);
    assert.equal(total, 5.0);

    const u3 = [1.0, 2.0, 2.0];
    const total3 = propagateQuadratureUncertainty(u3);
    assert.equal(total3, 3.0);
  });

  it('throws on invalid or negative measurement uncertainties', () => {
    assert.throws(() => propagateQuadratureUncertainty([-1, 2]));
    assert.throws(() => propagateQuadratureUncertainty([1, NaN]));
  });

  it('computes coordinate bounds with margin fraction', () => {
    const pts = [
      { x: 1, y: 2, xUncertainty: 0.1, yUncertainty: 0.2 },
      { x: 5, y: 10, xUncertainty: 0.1, yUncertainty: 0.2 },
    ];
    const bounds = computeDataBounds(pts, 0.1);
    assert.ok(bounds.xMin < 0.9);
    assert.ok(bounds.xMax > 5.1);
    assert.ok(bounds.yMin < 1.8);
    assert.ok(bounds.yMax > 10.2);
  });
});

// =============================================================================
// Workpack A29: Controller & Strict Pedagogical Invariant Tests
// =============================================================================

describe('Workpack A29 — Controller & Pedagogical Invariants', () => {
  it('enforces pedagogical invariant: points: null, status: REVIEW_PENDING, and disclaimer', async () => {
    const ctrl = new ExperimentWorkspaceController({
      archetype: 'PHY_E3',
      title: 'Simple Pendulum Invariant Test',
      maxPoints: 10,
    });

    const evalResult = await ctrl.evaluate();
    assert.equal(evalResult.points, null);
    assert.equal(evalResult.maxPoints, 10);
    assert.equal(evalResult.status, 'REVIEW_PENDING');
    assert.ok(evalResult.feedback.includes('Experimental data tables, uncertainty bounds, and graph regression models require human domain evaluation'));

    const vs = ctrl.getViewState();
    assert.equal(vs.labCompetenceDisclaimer, LAB_COMPETENCE_DISCLAIMER);
    assert.equal(vs.evaluation?.status, 'REVIEW_PENDING');
    assert.equal(vs.evaluation?.points, null);
  });

  it('manages tab transitions across TABLE, GRAPH, APPARATUS, and OBSERVATIONS', () => {
    const ctrl = new ExperimentWorkspaceController({
      archetype: 'PHY_E3',
      title: 'Tab Navigation Test',
    });

    assert.equal(ctrl.getActiveTab(), 'TABLE');
    ctrl.setActiveTab('GRAPH');
    assert.equal(ctrl.getActiveTab(), 'GRAPH');
    ctrl.setActiveTab('APPARATUS');
    assert.equal(ctrl.getActiveTab(), 'APPARATUS');
    ctrl.setActiveTab('OBSERVATIONS');
    assert.equal(ctrl.getActiveTab(), 'OBSERVATIONS');
  });

  it('exports and restores draft state roundtrip without loss', () => {
    const ctrl = new ExperimentWorkspaceController({
      archetype: 'PHY_E3',
      title: 'Persistence Test',
      conclusion: 'Preliminary conclusion: Period squared is directly proportional to string length.',
    });

    const draft = ctrl.exportDraft();
    assert.equal(draft.conclusion, 'Preliminary conclusion: Period squared is directly proportional to string length.');

    const newCtrl = new ExperimentWorkspaceController({
      archetype: 'PHY_E3',
      title: 'Persistence Test',
    });
    newCtrl.restoreDraft(draft);
    assert.equal(newCtrl.getViewState().conclusion, draft.conclusion);
  });
});

// =============================================================================
// Workpack A26: Stylus Ink & Digital Scratchpad Tests
// =============================================================================

describe('Workpack A26 — Stylus Ink & Scratchpad Ergonomics', () => {
  it('exports isotropic SVG preserving aspect ratio across orientation shifts', () => {
    const ink = createInkEngine(1600, 1000);
    ink.pointerDown(400, 250);
    ink.pointerMove(800, 500);
    ink.pointerUp();

    const svgLandscape = ink.exportIsotropicSvg();
    assert.ok(svgLandscape.includes('viewBox="0 0 1600 1000"'));
    assert.ok(svgLandscape.includes('<path'));

    // Switch orientation to portrait
    ink.resizeViewport(1000, 1600);
    const svgPortrait = ink.exportIsotropicSvg();
    assert.ok(svgPortrait.includes('viewBox="0 0 1000 1600"'));
    assert.ok(svgPortrait.includes('<path'));
  });

  it('Fault N19: pointerCancel cleanly discards stroke buffer without corrupting completed strokes', () => {
    const ink = createInkEngine(800, 600);

    // Completed stroke 1
    ink.pointerDown(100, 100);
    ink.pointerMove(150, 150);
    ink.pointerUp();
    assert.equal(ink.getStrokes().length, 1);

    // Cancelled stroke 2 (e.g. palm contact or gestural interrupt)
    ink.pointerDown(200, 200);
    ink.pointerMove(250, 250);
    ink.pointerCancel();

    assert.equal(ink.isDrawing(), false);
    assert.equal(ink.getInProgressPoints().length, 0);
    assert.equal(ink.getStrokes().length, 1);
  });

  it('Fault N27: ScratchpadController calculates bottom scroll padding for virtual keyboard', () => {
    const pad = createScratchpad(800, 600);
    assert.equal(pad.getBottomPaddingPx(), 0);

    pad.setVirtualKeyboardHeight(320);
    assert.equal(pad.getBottomPaddingPx(), 336); // 320 + 16px safe margin

    pad.setVirtualKeyboardHeight(0);
    assert.equal(pad.getBottomPaddingPx(), 0);
  });

  it('controls reachable state is verifiable and toggleable', () => {
    const pad = createScratchpad(800, 600);
    assert.equal(pad.getViewState().isControlsReachable, false);

    pad.setControlsReachable(true);
    assert.equal(pad.getViewState().isControlsReachable, true);
  });

  it('generates well-formed WorkArtifact with INK kind', async () => {
    const pad = createScratchpad(800, 600);
    const ink = pad.getInkEngine();
    ink.pointerDown(50, 50);
    ink.pointerMove(100, 100);
    ink.pointerUp();

    const artifact = await pad.toWorkArtifact('session-test-01');
    assert.ok(artifact.id.startsWith('ink:'));
    assert.equal(artifact.kind, 'INK');
    assert.equal(artifact.version, 1);
    assert.ok(artifact.value !== undefined);
  });
});
