import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  RIEMANN_SUMS_PACKAGE,
  LONG_DIVISION_PACKAGE,
  analyticalLowerDarbouxSum,
  analyticalUpperDarbouxSum,
  EXACT_RIEMANN_INTEGRAL,
} from '../../web/runtime/math-packages.ts';
import { validatePortablePackage } from '../../web/applications/portable/validator.ts';
import { PortableWorkbenchController } from '../../web/applications/portable/component.ts';

describe('Gate P6-G7: Declarative Portable Workbenches (DEC-A59) Conformance', () => {
  it('validates Riemann Sums package under all 15 fail-closed rules of validatePortablePackage', () => {
    const result = validatePortablePackage(RIEMANN_SUMS_PACKAGE);
    assert.equal(result.isValid, true, `Validation failed: ${result.errors.join(', ')}`);
    assert.equal(result.errors.length, 0);

    assert.equal(RIEMANN_SUMS_PACKAGE.id, 'portable-integration-riemann');
    assert.equal(RIEMANN_SUMS_PACKAGE.scene.grids.length, 1);
    assert.equal(RIEMANN_SUMS_PACKAGE.adapter.rules.length, 2);
  });

  it('validates Long Division package under all 15 fail-closed rules of validatePortablePackage', () => {
    const result = validatePortablePackage(LONG_DIVISION_PACKAGE);
    assert.equal(result.isValid, true, `Validation failed: ${result.errors.join(', ')}`);
    assert.equal(result.errors.length, 0);

    assert.equal(LONG_DIVISION_PACKAGE.id, 'portable-long-division');
    assert.equal(LONG_DIVISION_PACKAGE.scene.grids.length, 1);
    assert.equal(LONG_DIVISION_PACKAGE.adapter.rules.length, 2);
  });

  it('evaluates analytical Darboux sums verifying monotonic convergence to 1/3', () => {
    // Exact integral
    assert.equal(EXACT_RIEMANN_INTEGRAL, 1 / 3);

    // For n=2
    const L2 = analyticalLowerDarbouxSum(2);
    const U2 = analyticalUpperDarbouxSum(2);
    assert.equal(L2, (1 * 3) / (6 * 4)); // 3/24 = 0.125
    assert.equal(U2, (3 * 5) / (6 * 4)); // 15/24 = 0.625
    assert.ok(L2 < EXACT_RIEMANN_INTEGRAL);
    assert.ok(U2 > EXACT_RIEMANN_INTEGRAL);
    assert.equal(U2 - L2, 0.5);

    // For n=4
    const L4 = analyticalLowerDarbouxSum(4);
    const U4 = analyticalUpperDarbouxSum(4);
    assert.equal(L4, (3 * 7) / (6 * 16)); // 21/96 = 0.21875
    assert.equal(U4, (5 * 9) / (6 * 16)); // 45/96 = 0.46875

    // For n=8
    const L8 = analyticalLowerDarbouxSum(8);
    const U8 = analyticalUpperDarbouxSum(8);

    // Strict monotonic refinement: L2 < L4 < L8 < 1/3 < U8 < U4 < U2
    assert.ok(L2 < L4, 'L2 < L4');
    assert.ok(L4 < L8, 'L4 < L8');
    assert.ok(L8 < EXACT_RIEMANN_INTEGRAL, 'L8 < 1/3');
    assert.ok(EXACT_RIEMANN_INTEGRAL < U8, '1/3 < U8');
    assert.ok(U8 < U4, 'U8 < U4');
    assert.ok(U4 < U2, 'U4 < U2');

    // The refinement gap strictly decreases
    assert.ok(U4 - L4 < U2 - L2, 'Gap n=4 is strictly smaller than Gap n=2');
    assert.ok(U8 - L8 < U4 - L4, 'Gap n=8 is strictly smaller than Gap n=4');
  });

  it('applies Riemann Sum partition refinement transformations using PortableWorkbenchController', () => {
    const controller = new PortableWorkbenchController(RIEMANN_SUMS_PACKAGE);
    const initialHtml = controller.renderHtml();

    assert.match(initialHtml, /portable-workbench-panel/);
    assert.match(initialHtml, /Riemann Sum — Partition Refinement and Area Bound/);
    assert.match(initialHtml, /darboux-grid/);

    // Apply rule: refine to n=4
    const res1 = controller.applyTransformation('rule-refine-n4');
    assert.equal(res1.outcome, 'ACCEPT');

    // Apply rule: refine to n=8
    const res2 = controller.applyTransformation('rule-refine-n8');
    assert.equal(res2.outcome, 'ACCEPT');

    const updatedHtml = controller.renderHtml();
    assert.match(updatedHtml, /ACCEPT/);
  });

  it('executes multi-step arithmetic long division transformations verifying final quotient 123', () => {
    const controller = new PortableWorkbenchController(LONG_DIVISION_PACKAGE);
    const initialHtml = controller.renderHtml();

    assert.match(initialHtml, /Long Division — Multi-Step Arithmetic Scaffold/);
    assert.match(initialHtml, /tableau-grid/);

    // Step 1: divide hundreds (400 / 4 = 100)
    const res1 = controller.applyTransformation('rule-first-quotient-digit');
    assert.equal(res1.outcome, 'ACCEPT');

    // Step 2: divide tens (80 / 4 = 20)
    const res2 = controller.applyTransformation('rule-second-quotient-digit');
    assert.equal(res2.outcome, 'ACCEPT');

    // Verify rotation handling without state destruction
    controller.rotate(90);
    const state = controller.exportState();
    assert.equal(state.rotationDegrees, 90);

    const freshController = new PortableWorkbenchController(LONG_DIVISION_PACKAGE);
    freshController.restoreState(state);
    assert.equal(freshController.exportState().rotationDegrees, 90);
  });
});
