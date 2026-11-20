import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { Core2BTransferPageController, createDefaultChangedDemandTask } from '../../web/pages/transfer-changed-demand.ts';

describe('Gate P5-G5: Core 2B Changed-Demand Transfer & Rubric Authority', () => {
  it('initializes with verified prior anchor reference and sealed post-attempt rubric', () => {
    const task = createDefaultChangedDemandTask();
    const controller = new Core2BTransferPageController({ taskDefinition: task });

    const state = controller.getViewState();
    assert.equal(state.task.code, 'PHYS-WPE-XFER-01');
    assert.equal(state.task.dimension, 'CONSTRAINT_MUTATION');
    assert.equal(state.task.priorAnchorRef.id, 'question:phys-wpe-01');
    assert.equal(state.committed, false);
    assert.equal(state.rubricDisclosed, false);

    const html = controller.render();
    assert.match(html, /Pre-Commit Secrecy Active/);
    assert.match(html, /Full answer rubric, parameter analysis, and transfer takeaways remain strictly sealed/);
    assert.doesNotMatch(html, /Verified Answer Rubric:/);
  });

  it('rejects rubric disclosure prior to transfer attempt commitment', () => {
    const controller = new Core2BTransferPageController();
    assert.equal(controller.isCommitted(), false);

    // Attempting to disclose rubric before commitment fails closed
    const ok = controller.requestRubricDisclosure();
    assert.equal(ok, false);
    assert.equal(controller.isRubricDisclosed(), false);

    const html = controller.render();
    assert.doesNotMatch(html, /Verified Answer Rubric:/);
  });

  it('authorizes rubric and transfer takeaway disclosure only after irreversible commitment', () => {
    const controller = new Core2BTransferPageController();

    // Fill transfer working and response
    controller.setWorkingNote('dv/dt = 0 => 2.0 * 9.8 = 0.08 * v_term^2 => v_term = sqrt(245) = 15.65 m/s');
    controller.setResponse('15.65');

    // Commit transfer attempt
    const committed = controller.commitTransferAttempt();
    assert.equal(committed, true);
    assert.equal(controller.isCommitted(), true);

    // Prior to clicking disclose, the rubric is not yet displayed in DOM
    let html = controller.render();
    assert.match(html, /Transfer Attempt Successfully Committed/);
    assert.doesNotMatch(html, /Verified Answer Rubric:/);

    // Request rubric disclosure
    const disclosed = controller.requestRubricDisclosure();
    assert.equal(disclosed, true);
    assert.equal(controller.isRubricDisclosed(), true);

    // Rubric steps and takeaway are now visible
    html = controller.render();
    assert.match(html, /Verified Answer Rubric:/);
    assert.match(html, /Set net vertical force to zero for terminal condition/);
    assert.match(html, /v_term = sqrt\(\(m \* g\) \/ c_d\)/);
    assert.match(html, /Conceptual Transfer Takeaway/);
    assert.match(html, /Constraint Mutation Takeaway/);
  });

  it('preserves exact return route navigation target', () => {
    const returnRoute = '#/subject/physics/topic/wpe/questions';
    const controller = new Core2BTransferPageController({ returnRoute });
    assert.equal(controller.getReturnRoute(), returnRoute);
  });
});
