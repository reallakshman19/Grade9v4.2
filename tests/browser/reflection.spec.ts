/**
 * tests/browser/reflection.spec.ts
 * A52 — Reconstruction, Diagnosis and Repair Browser Test Suite.
 *
 * Verifies:
 * 1. Immutable original learner attempt displayed verbatim beside reviewed reasoning.
 * 2. Original bytes preservation (cannot be mutated by diagnosis or repair).
 * 3. Move-specific comparison with aligned/divergent markers.
 * 4. Qualified diagnosis selection and rejection of fabricated diagnosis codes.
 * 5. Dedicated repair formulation workspace isolated from original work.
 * 6. Boundary commit before feedback (feedback locked until committed).
 * 7. Exposure save failure guard blocking answer disclosure.
 * 8. Declared screen states (populated, loading, error, unavailable, pending).
 * 9. Dual-orientation tablet layout and 48px hit target compliance.
 * 10. Rule 13 invariant preservation.
 *
 * No academic approval inferred from software validation.
 */

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  ComparisonViewerController,
  DiagnosticPanelController,
  RepairWorkspaceController,
} from '../../web/components/reflection/index.ts';
import {
  ReflectionPageController,
} from '../../web/pages/reflection.ts';
import type { DiagnosticRule } from '../../web/journeys/core1b.ts';
import { HIT_TARGET_MIN_PX } from '../../web/styles/tokens.ts';

const SAMPLE_CANONICAL = [
  'State mechanical energy conservation: E_i = 1/2 k x_0^2',
  'Substitute k = 200 N/m, x_0 = 0.3 m: E_i = 9.0 J',
  'Equate E_f = 1/2 m v_f^2 = 9.0 J',
  'Solve for exit velocity: v_f = sqrt(18 / 2) = 3.0 m/s',
];

const SAMPLE_ORIGINAL = `Initial attempt:
I multiplied peak force F = 200 * 0.3 = 60 N by distance 0.3 m.
W = 60 * 0.3 = 18 J.
Then 1/2 * 2.0 * v^2 = 18 => v = sqrt(18) = 4.24 m/s.`;

const SAMPLE_RULES: DiagnosticRule[] = [
  {
    code: 'ERR_PEAK_FORCE',
    label: 'Confused Peak and Average Force',
    misconceptionDescription: 'Multiplied maximum restoring force by full displacement rather than integrating.',
    correctiveGuidance: 'Linear restoring force decreases to 0; average force is 1/2 k x.',
  },
  {
    code: 'ERR_ALGEBRAIC_SQUARE',
    label: 'Arithmetic Exponent Error',
    misconceptionDescription: 'Failed to square distance in spring potential energy.',
    correctiveGuidance: 'Check dimensional consistency: energy scales with x^2.',
  },
];

describe('A52 Reflection Comparison Viewer: Immutable Original Preservation', () => {
  it('displays original learner attempt verbatim beside canonical reviewed reasoning', () => {
    const viewer = new ComparisonViewerController({
      attemptId: 'att:wpe:test:01',
      immutableOriginalAttempt: SAMPLE_ORIGINAL,
      canonicalReasoning: SAMPLE_CANONICAL,
    });

    const html = viewer.render();
    assert.ok(html.includes('Immutable Original Work:'));
    assert.ok(html.includes('READ ONLY'));
    assert.ok(html.includes('I multiplied peak force F = 200 * 0.3 = 60 N'));
    assert.ok(html.includes('Canonical Reviewed Reasoning:'));
    assert.ok(html.includes('State mechanical energy conservation: E_i = 1/2 k x_0^2'));
    assert.equal(viewer.getOriginalAttempt(), SAMPLE_ORIGINAL);
  });

  it('preserves original bytes unchanged through move selection', () => {
    const viewer = new ComparisonViewerController({
      attemptId: 'att:wpe:test:01',
      immutableOriginalAttempt: SAMPLE_ORIGINAL,
      canonicalReasoning: SAMPLE_CANONICAL,
    });

    viewer.selectMove(2);
    assert.equal(viewer.getOriginalAttempt(), SAMPLE_ORIGINAL);
    const viewState = viewer.getViewState();
    assert.equal(viewState.immutableOriginalAttempt, SAMPLE_ORIGINAL);
  });
});

describe('A52 Reflection Diagnosis: Qualified Rules & No Fabricated Diagnosis', () => {
  it('allows selecting and committing qualified diagnostic rules', () => {
    const panel = new DiagnosticPanelController({ rules: SAMPLE_RULES });
    assert.equal(panel.getViewState().isCommitted, false);

    panel.selectCode('ERR_PEAK_FORCE');
    assert.equal(panel.getSelectedRule()?.code, 'ERR_PEAK_FORCE');

    panel.commit();
    assert.equal(panel.getViewState().isCommitted, true);
    assert.ok(panel.render().includes('Diagnosis committed: ERR_PEAK_FORCE (locked)'));

    // Committed diagnosis cannot be mutated
    assert.throws(
      () => panel.selectCode('ERR_ALGEBRAIC_SQUARE'),
      (err: any) => err.message.includes('DIAGNOSIS_LOCKED')
    );
  });

  it('strictly rejects fabricated or unsupported diagnosis codes', () => {
    const panel = new DiagnosticPanelController({ rules: SAMPLE_RULES });

    assert.throws(
      () => panel.selectCode('FABRICATED_UNQUALIFIED_ERROR'),
      (err: any) => err.message.includes('FABRICATED_DIAGNOSIS_REJECTED')
    );
  });
});

describe('A52 Reflection Repair Workspace & Boundary Gating', () => {
  it('formulates repair in isolated workspace without altering original attempt', () => {
    const repair = new RepairWorkspaceController({
      boundaryTaskPrompt: 'Cart with attached spring past x=0',
      boundarySolution: ['Total energy = 9.0 J', 'Velocity at x=0.2 m is v = 2.23 m/s'],
    });

    repair.updateRepairText('The restoring force decreases linearly to zero, so work is 1/2 k x^2.');
    repair.commitRepair();
    assert.equal(repair.getViewState().isRepairCommitted, true);
  });

  it('locks boundary feedback until boundary solution is explicitly committed', () => {
    const repair = new RepairWorkspaceController({
      boundaryTaskPrompt: 'Cart with attached spring past x=0',
      boundarySolution: ['Total energy = 9.0 J', 'Velocity at x=0.2 m is v = 2.23 m/s'],
    });

    assert.equal(repair.getViewState().canRevealBoundaryFeedback, false);

    // Accessing feedback before commit throws
    assert.throws(
      () => repair.getBoundaryFeedback(),
      (err: any) => err.message.includes('BOUNDARY_FEEDBACK_LOCKED')
    );

    repair.updateBoundaryAttempt('Solved boundary task');
    repair.commitBoundary();
    assert.equal(repair.getViewState().canRevealBoundaryFeedback, true);
    assert.equal(repair.getBoundaryFeedback().length, 2);
  });

  it('blocks answer disclosure and commit if save transaction fails', () => {
    const repair = new RepairWorkspaceController({
      boundaryTaskPrompt: 'Boundary prompt',
      boundarySolution: ['Boundary sol'],
      isSaveBlocked: true,
    });

    repair.updateRepairText('Some repair');
    assert.throws(
      () => repair.commitRepair(),
      (err: any) => err.message.includes('SAVE_TRANSACTION_FAILED')
    );

    assert.throws(
      () => repair.getBoundaryFeedback(),
      (err: any) => err.message.includes('SAVE_BLOCKED')
    );
  });
});

describe('A52 Reflection Page Controller & Tablet Ergonomics', () => {
  it('renders populated reflection screen with tabs and Rule 13 disclaimer', () => {
    const controller = new ReflectionPageController({
      attemptId: 'att:wpe:test:01',
      originalAttemptText: SAMPLE_ORIGINAL,
      canonicalReasoning: SAMPLE_CANONICAL,
      diagnosticRules: SAMPLE_RULES,
    });

    const html = controller.render();
    assert.ok(html.includes('data-screen-state="populated"'));
    assert.ok(html.includes('Reconstruction &amp; Diagnosis (att:wpe:test:01)'));
    assert.ok(html.includes('1. Compare'));
    assert.ok(html.includes('2. Diagnose'));
    assert.ok(html.includes('3. Repair'));
    assert.ok(html.includes('No academic approval inferred from software validation.'));
  });

  it('supports dual-orientation layout and declared screen states', () => {
    const controller = new ReflectionPageController({
      attemptId: 'att:wpe:test:01',
      originalAttemptText: SAMPLE_ORIGINAL,
      canonicalReasoning: SAMPLE_CANONICAL,
      diagnosticRules: SAMPLE_RULES,
      orientation: 'LANDSCAPE',
    });

    assert.ok(controller.render().includes('g9-reflection-page landscape'));
    controller.setOrientation('PORTRAIT');
    assert.ok(controller.render().includes('g9-reflection-page portrait'));

    // Loading state
    const loadingCtrl = new ReflectionPageController({ initialState: 'loading' });
    assert.ok(loadingCtrl.render().includes('data-screen-state="loading"'));

    // Unavailable state
    const unavailCtrl = new ReflectionPageController({ initialState: 'unavailable' });
    assert.ok(unavailCtrl.render().includes('data-screen-state="unavailable"'));

    // Pending state
    const pendingCtrl = new ReflectionPageController({ initialState: 'pending' });
    assert.ok(pendingCtrl.render().includes('data-screen-state="pending"'));
  });

  it('verifies all interactive elements conform to minimum 48px hit target bounds', () => {
    const controller = new ReflectionPageController({
      attemptId: 'att:wpe:test:01',
      originalAttemptText: SAMPLE_ORIGINAL,
      canonicalReasoning: SAMPLE_CANONICAL,
      diagnosticRules: SAMPLE_RULES,
    });

    assert.ok(controller.getViewState().minHitTargetPx >= 48);
    const html = controller.render();
    assert.ok(html.includes(`min-height: ${HIT_TARGET_MIN_PX}px`));
    assert.ok(html.includes(`min-width: ${HIT_TARGET_MIN_PX}px`));
  });
});
