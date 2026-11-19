/**
 * tests/browser/reasoning.spec.ts
 * Workpack A53: QRT curriculum and cell navigation browser and contract tests.
 *
 * Verifies:
 * 1. 28-cell QRT matrix structure (7 operations x 4 demand bands D1-D4).
 * 2. Distinct cell states (EMPTY, PENDING_REVIEW, UNAVAILABLE, VERIFIED_SYNTHETIC).
 * 3. Candidate containment: candidate cells are NEVER labeled as verified.
 * 4. C06 v1.1 constraints: main task required, >=2 distinct instances, no instance-main collision.
 * 5. Reviewed cell navigation with exact refs, main task link, and instance task links.
 * 6. Dual responsive layouts: Landscape 2D keyboard-accessible table and Portrait linear list.
 * 7. 48px minimum touch hit target compliance.
 * 8. Prohibition of progress-to-mastery claims (Rule 13 invariant).
 * 9. Zero reserved answer or solution leakage.
 * 10. Real Chromium headless rendering: XSS defense and layout verification.
 *
 * No academic approval inferred from software validation.
 */

import { it } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { chromium } from 'playwright-core';

function getChromiumExecutable(): string | undefined {
  if (process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE && existsSync(process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE)) {
    return process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE;
  }
  const fallback = 'C:/Users/reall/AppData/Local/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-win64/chrome-headless-shell.exe';
  if (existsSync(fallback)) {
    return fallback;
  }
  return undefined;
}

import type { ReasoningCell, Ref } from '../../web/runtime/types.ts';
import {
  ReasoningMatrixComponent,
  evaluateCellState,
  validateC06,
  QRT_OPERATIONS,
  DEMAND_BANDS,
  type QrtOperation,
  type DemandBand,
} from '../../web/components/reasoning-matrix.ts';
import { ReasoningPageController } from '../../web/pages/reasoning.ts';

function makeRef(type: string, id: string, revision: number = 1): Ref {
  return {
    type: type as any,
    id,
    revision,
    sha256: 'a'.repeat(64),
  };
}

function makeReasoningCell(overrides: Partial<ReasoningCell> = {}): ReasoningCell {
  return {
    schema_version: 'g9-reasoning-cell/1',
    cell_id: 'cell:physics:kin:apply-d2',
    subject_id: 'PHYSICS',
    topic_ref: makeRef('CONCEPT', 'concept:kinematics:velocity'),
    operation: 'APPLY',
    demand_band: 'D2',
    native_contract_ref: makeRef('WARRANT', 'warrant:kinematics:v2'),
    instances: [
      makeRef('QUESTION', 'que:physics:kin:apply-inst-1'),
      makeRef('QUESTION', 'que:physics:kin:apply-inst-2'),
    ] as any,
    main: makeRef('QUESTION', 'que:physics:kin:apply-main') as any,
    status: 'SYNTHETIC',
    c06_v11: true,
    ...overrides,
  };
}

// =====================================================================
// 1. Matrix Grid & Structure Tests
// =====================================================================

it('matrix defines exact 28 cells spanning 7 operations and 4 demand bands', () => {
  assert.equal(QRT_OPERATIONS.length, 7);
  assert.deepEqual(QRT_OPERATIONS, [
    'RETRIEVE',
    'EXPLAIN',
    'APPLY',
    'MODEL',
    'REPRESENT',
    'SYNTHESIZE',
    'JUSTIFY',
  ]);

  assert.equal(DEMAND_BANDS.length, 4);
  assert.deepEqual(DEMAND_BANDS, ['D1', 'D2', 'D3', 'D4']);

  const matrix = new ReasoningMatrixComponent({ cells: [] });
  const summary = matrix.getSummary();
  assert.equal(summary.total, 28);
  assert.equal(summary.empty, 28);
  assert.equal(summary.populated, 0);
});

it('matrix correctly maps cells by operation and demand band coordinates', () => {
  const cell1 = makeReasoningCell({ cell_id: 'cell:apply:d2', operation: 'APPLY', demand_band: 'D2' });
  const cell2 = makeReasoningCell({ cell_id: 'cell:model:d3', operation: 'MODEL', demand_band: 'D3' });

  const matrix = new ReasoningMatrixComponent({ cells: [cell1, cell2] });
  assert.equal(matrix.getCell('APPLY', 'D2')?.cell_id, 'cell:apply:d2');
  assert.equal(matrix.getCell('MODEL', 'D3')?.cell_id, 'cell:model:d3');
  assert.equal(matrix.getCell('RETRIEVE', 'D1'), null);

  const summary = matrix.getSummary();
  assert.equal(summary.total, 28);
  assert.equal(summary.populated, 2);
  assert.equal(summary.verified, 2);
  assert.equal(summary.empty, 26);
});

// =====================================================================
// 2. Distinct Cell States & Candidate Containment
// =====================================================================

it('evaluates distinct visual/behavioral states: EMPTY, PENDING_REVIEW, UNAVAILABLE, VERIFIED_SYNTHETIC', () => {
  // Empty
  assert.equal(evaluateCellState(null), 'EMPTY');
  assert.equal(evaluateCellState(undefined), 'EMPTY');

  // Synthetic Verified
  const syntheticCell = makeReasoningCell({ status: 'SYNTHETIC' });
  assert.equal(evaluateCellState(syntheticCell), 'VERIFIED_SYNTHETIC');

  // Candidate (Pending Review)
  const candidateCell = makeReasoningCell({ status: 'CANDIDATE' });
  assert.equal(evaluateCellState(candidateCell), 'PENDING_REVIEW');

  // Hold (Pending Review)
  const holdCell = makeReasoningCell({ status: 'HOLD' });
  assert.equal(evaluateCellState(holdCell), 'PENDING_REVIEW');

  // Unavailable due to C06 failure
  const invalidCell = makeReasoningCell({ c06_v11: true, main: null });
  assert.equal(evaluateCellState(invalidCell), 'UNAVAILABLE');
});

it('never labels candidate or hold cells as verified in UI or state', () => {
  const candidateCell = makeReasoningCell({
    cell_id: 'cell:unverified:01',
    status: 'CANDIDATE',
  });

  const controller = new ReasoningPageController({
    cells: [candidateCell],
    initialSelectedCellId: 'cell:unverified:01',
  });

  const state = controller.getViewState();
  assert.equal(state.selectedCellState, 'PENDING_REVIEW');

  const html = controller.renderHtml();
  // Must indicate unverified/pending review
  assert(html.includes('Pending Review') || html.includes('Unverified'));
  assert(html.includes('Candidate / Pending External Review (Unverified)'));

  // Must not label candidate as "Synthetic Verified"
  assert(!html.includes('status-badge synthetic'));
});

// =====================================================================
// 3. Strict C06 v1.1 Constraint Validation
// =====================================================================

it('enforces C06 v1.1: requires main task and minimum 2 instances when c06_v11 is true', () => {
  // Missing main
  const noMain = makeReasoningCell({ c06_v11: true, main: null });
  const val1 = validateC06(noMain);
  assert.equal(val1.valid, false);
  assert(val1.errors.some(e => e.includes('C06_MISSING_MAIN')));

  // < 2 instances
  const oneInstance = makeReasoningCell({
    c06_v11: true,
    instances: [makeRef('QUESTION', 'que:inst:1')] as any,
  });
  const val2 = validateC06(oneInstance);
  assert.equal(val2.valid, false);
  assert(val2.errors.some(e => e.includes('C06_MIN_INSTANCES')));

  // Valid C06
  const valid = makeReasoningCell({ c06_v11: true });
  const val3 = validateC06(valid);
  assert.equal(val3.valid, true);
  assert.equal(val3.errors.length, 0);
});

it('rejects duplicate instances under C06 constraint', () => {
  const duplicateInstances = makeReasoningCell({
    instances: [
      makeRef('QUESTION', 'que:same:id'),
      makeRef('QUESTION', 'que:same:id'),
    ] as any,
  });
  const val = validateC06(duplicateInstances);
  assert.equal(val.valid, false);
  assert(val.errors.some(e => e.includes('C06_DUPLICATE_INSTANCE')));
});

it('rejects collision where main task is also listed in instances', () => {
  const mainCollision = makeReasoningCell({
    main: makeRef('QUESTION', 'que:colliding:id') as any,
    instances: [
      makeRef('QUESTION', 'que:colliding:id'),
      makeRef('QUESTION', 'que:other:id'),
    ] as any,
  });
  const val = validateC06(mainCollision);
  assert.equal(val.valid, false);
  assert(val.errors.some(e => e.includes('C06_MAIN_INSTANCE_ALIAS')));
});

// =====================================================================
// 4. Keyboard Navigation & Table Grid
// =====================================================================

it('supports 2D keyboard navigation across operations and demand bands in table grid', () => {
  const matrix = new ReasoningMatrixComponent({ cells: [] });
  assert.deepEqual(matrix.getFocusedCoord(), { operation: 'RETRIEVE', demandBand: 'D1' });

  // Down moves down operations
  assert.equal(matrix.handleKeyDown('ArrowDown'), true);
  assert.deepEqual(matrix.getFocusedCoord(), { operation: 'EXPLAIN', demandBand: 'D1' });

  // Right moves right across demand bands
  assert.equal(matrix.handleKeyDown('ArrowRight'), true);
  assert.deepEqual(matrix.getFocusedCoord(), { operation: 'EXPLAIN', demandBand: 'D2' });

  // Up moves up operations
  assert.equal(matrix.handleKeyDown('ArrowUp'), true);
  assert.deepEqual(matrix.getFocusedCoord(), { operation: 'RETRIEVE', demandBand: 'D2' });

  // Left moves left across demand bands
  assert.equal(matrix.handleKeyDown('ArrowLeft'), true);
  assert.deepEqual(matrix.getFocusedCoord(), { operation: 'RETRIEVE', demandBand: 'D1' });

  // Non-navigation key returns false
  assert.equal(matrix.handleKeyDown('Tab'), false);
});

// =====================================================================
// 5. Dual Responsive Layouts (Landscape vs Portrait)
// =====================================================================

it('renders landscape 2D table grid with role=grid and portrait linear list with role=list', () => {
  const cell = makeReasoningCell();
  const controller = new ReasoningPageController({
    cells: [cell],
    orientation: 'LANDSCAPE',
  });

  const landscapeHtml = controller.renderHtml();
  assert(landscapeHtml.includes('data-layout="landscape"'));
  assert(landscapeHtml.includes('role="grid"'));
  assert(landscapeHtml.includes('role="gridcell"'));

  controller.setOrientation('PORTRAIT');
  const portraitHtml = controller.renderHtml();
  assert(portraitHtml.includes('data-layout="portrait"'));
  assert(portraitHtml.includes('class="qrt-portrait-view"'));
  assert(portraitHtml.includes('class="qrt-operation-group"'));
  assert(portraitHtml.includes('role="list"'));
});

// =====================================================================
// 6. Exact Refs, Task Links, and Navigation Actions
// =====================================================================

it('formats exact refs and provides valid route links to main and instance questions', () => {
  const cell = makeReasoningCell({
    cell_id: 'cell:model:motion',
    main: makeRef('QUESTION', 'que:main:01', 2) as any,
    instances: [
      makeRef('QUESTION', 'que:inst:01', 1),
      makeRef('QUESTION', 'que:inst:02', 1),
    ] as any,
  });

  const controller = new ReasoningPageController({
    cells: [cell],
    initialSelectedCellId: 'cell:model:motion',
  });

  assert.equal(controller.actionLaunchMain(), '/question/que:main:01');
  assert.equal(controller.actionLaunchInstance(0), '/question/que:inst:01');
  assert.equal(controller.actionLaunchInstance(1), '/question/que:inst:02');
  assert.equal(controller.actionLaunchInstance(2), null);

  const html = controller.renderHtml();
  assert(html.includes('/question/que:main:01'));
  assert(html.includes('/question/que:inst:01'));
  assert(html.includes('/question/que:inst:02'));
  assert(html.includes('QUESTION:que:main:01#r2'));
});

// =====================================================================
// 7. Prohibition of Progress-to-Mastery Claims & Rule 13 Invariant
// =====================================================================

it('strictly enforces Rule 13 invariant and disclaims cognitive mastery claims', () => {
  const controller = new ReasoningPageController({ cells: [makeReasoningCell()] });
  const html = controller.renderHtml();

  // Rule 13 phrase required
  assert(html.includes('No academic approval inferred from software validation.'));
  assert(html.includes('Diagnostic structural coverage only.'));

  // Disallow forbidden mastery claims
  for (const forbidden of ['Topic Mastered', '100% Mastery', 'Grade 9 Certified', 'Cognitive Mastery Score']) {
    assert(!html.includes(forbidden), `Forbidden mastery claim detected: ${forbidden}`);
  }
});

// =====================================================================
// 8. Zero Reserved Answer Leakage
// =====================================================================

it('ensures zero reserved answers, master keys, solutions, or private moves are leaked', () => {
  const cell = makeReasoningCell();
  const controller = new ReasoningPageController({ cells: [cell] });
  const html = controller.renderHtml();

  for (const leak of ['reference_solution', 'worked_steps', 'master_key', 'privateMoveRef', 'rubric_points']) {
    assert(!html.includes(leak), `Potential solution leakage detected: ${leak}`);
  }
});

// =====================================================================
// 9. Real Headless Chromium Playwright Tests
// =====================================================================

it('renders in headless Chromium with strict XSS sanitization and 48px hit target size', async () => {
  const hostileCell = makeReasoningCell({
    cell_id: 'cell:hostile:<script>alert(1)</script>',
    main: makeRef('QUESTION', 'que:<img src=x onerror=alert(1)>') as any,
  });

  const controller = new ReasoningPageController({
    topicTitle: 'Hostile <script>alert(2)</script>',
    cells: [hostileCell],
    initialSelectedCellId: hostileCell.cell_id,
  });

  const browser = await chromium.launch({ headless: true, executablePath: getChromiumExecutable() });
  try {
    const page = await browser.newPage();
    await page.setContent(controller.renderHtml());

    // Verify zero executable script injections
    assert.equal(await page.locator('script').count(), 0);
    assert.equal(await page.locator('img[onerror]').count(), 0);

    // Verify 28 cell buttons exist in table grid
    const cellButtons = page.locator('.qrt-cell-btn');
    assert.equal(await cellButtons.count(), 28);

    // Verify minimum 48px hit target dimensions on cell buttons
    const firstBtnBox = await cellButtons.first().boundingBox();
    assert(firstBtnBox !== null);
    assert(firstBtnBox.width >= 48, `Width ${firstBtnBox.width} < 48px`);
    assert(firstBtnBox.height >= 48, `Height ${firstBtnBox.height} < 48px`);

    // Verify orientation toggle button has >= 48px hit target
    const orientBtnBox = await page.locator('.orientation-toggle').boundingBox();
    assert(orientBtnBox !== null);
    assert(orientBtnBox.width >= 48, `Orientation button width ${orientBtnBox.width} < 48px`);
    assert(orientBtnBox.height >= 48, `Orientation button height ${orientBtnBox.height} < 48px`);

    // Verify Rule 13 banner visible
    assert(await page.locator('.rule13-banner').isVisible());
  } finally {
    await browser.close();
  }
});
