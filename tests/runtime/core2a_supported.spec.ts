import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { Core2ASupportedPageController, createDefaultSupportedProblem } from '../../web/pages/supported-practice.ts';

describe('Gate P5-G4: Core 2A Supported Practice Runtime & Scaffold Auditing', () => {
  it('initializes with unexposed hint ladder and uncommitted attempt', () => {
    const problem = createDefaultSupportedProblem();
    const controller = new Core2ASupportedPageController({ problem });

    const state = controller.getViewState();
    assert.equal(state.problem.code, 'PHYS-WPE-PRAC-01');
    assert.deepEqual(state.exposedHintLevels, []);
    assert.equal(state.stepVerified, false);
    assert.equal(state.committed, false);
  });

  it('audits progressive hint requests without fabricating local arbitrary percentage deductions', async () => {
    const problem = createDefaultSupportedProblem();
    const controller = new Core2ASupportedPageController({ problem });

    // Request H1
    await controller.requestHint('H1');
    assert.equal(controller.isHintExposed('H1'), true);
    assert.equal(controller.isHintExposed('H2'), false);

    // Request H2
    await controller.requestHint('H2');
    assert.equal(controller.isHintExposed('H2'), true);

    const state = controller.getViewState();
    assert.deepEqual(state.exposedHintLevels, ['H1', 'H2']);

    // Verify rendered HTML includes unlocked content for H1 and H2, while H3 body text remains sealed
    const html = controller.render();
    assert.match(html, /Conservation of Mechanical Energy/);
    assert.match(html, /Equate initial elastic energy/);
    assert.doesNotMatch(html, /Solve for velocity: v_max = x \* sqrt/);
    // Verifies no fabricated "-10% penalty" string exists
    assert.doesNotMatch(html, /-10% penalty/);
  });

  it('verifies intermediate calculations before final commitment', () => {
    const controller = new Core2ASupportedPageController();
    assert.equal(controller.isStepVerified(), false);

    const ok = controller.verifyIntermediateStep();
    assert.equal(ok, true);
    assert.equal(controller.isStepVerified(), true);

    const html = controller.render();
    assert.match(html, /✓ Step Verified/);
    assert.match(html, /U_e = 1\/2 \* 200 \* \(0\.10\)² = 1\.0 J/);
  });

  it('gates solution reasoning strictly on attempt commitment', () => {
    const controller = new Core2ASupportedPageController();
    
    // Prior to commitment, reasoning route is sealed
    let html = controller.render();
    assert.match(html, /Complete reasoning route and verified solution are sealed until attempt commitment/);
    assert.doesNotMatch(html, /Verified Solution Reasoning:/);

    // Commit attempt with student response and note
    controller.setResponse('2.0');
    controller.setWorkingNote('E_i = 1.0 J = 0.25 v^2 => v = 2.0 m/s');
    const committed = controller.commitAttempt();
    assert.equal(committed, true);
    assert.equal(controller.isCommitted(), true);

    // After commitment, verified solution reasoning becomes accessible
    html = controller.render();
    assert.match(html, /Verified Solution Reasoning:/);
    assert.match(html, /v_max = 2\.0 m\/s/);
  });

  it('preserves exact return route navigation target', () => {
    const returnRoute = '#/subject/physics/topic/wpe/questions';
    const controller = new Core2ASupportedPageController({ returnRoute });
    assert.equal(controller.getReturnRoute(), returnRoute);
  });
});
