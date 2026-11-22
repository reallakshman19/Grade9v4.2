import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { setupTransfer } from '../fixtures/wave8-synthetic.ts';
import { Core2ASupportedPageController } from '../../web/pages/supported-practice.ts';
import { Core2BTransferPageController } from '../../web/pages/transfer-changed-demand.ts';
import { QuestionPageController } from '../../web/pages/question.ts';

describe('Gate P5-G2: Role Authority & Precommit Secrecy Verification', () => {
  it('enforces precommit secrecy in Core 2: rubric and key withheld prior to commitment', () => {
    const qController = new QuestionPageController('phys', 'wpe');
    const question = {
      id: 'q-sec-01',
      code: 'PHYS-WPE-SEC',
      title: 'Secrecy Test Question',
      stemText: 'Test question stem',
      kind: 'SINGLE_CHOICE' as const,
      options: [{ id: 'opt-1', text: 'Option 1' }, { id: 'opt-2', text: 'Option 2' }],
      status: 'RELEASED' as const,
      keyStatus: 'VERIFIED' as const,
      maxPoints: 5,
    };
    qController.loadQuestion(question);

    const state = qController.getViewState();
    assert.equal(state.workspaceState?.isLocked, false);
    assert.equal(state.evaluation, null);

    // Rubric is sealed before commitment
    const html = qController.render();
    assert.doesNotMatch(html, /Solution Rubric/);
    assert.doesNotMatch(html, /Evaluator canonical value/);
  });

  it('enforces precommit secrecy in Core 2A: reasoning route sealed prior to commitment', () => {
    const c2a = new Core2ASupportedPageController();
    assert.equal(c2a.isCommitted(), false);

    const html = c2a.render();
    assert.match(html, /Complete reasoning route and verified solution are sealed until attempt commitment/);
    assert.doesNotMatch(html, /Verified Solution Reasoning:/);
  });

  it('enforces precommit secrecy in Core 2B: rubric sealed until transfer attempt commitment', () => {
    const c2b = new Core2BTransferPageController();
    assert.equal(c2b.isCommitted(), false);

    const html = c2b.render();
    assert.match(html, /Pre-Commit Secrecy Active/);
    assert.doesNotMatch(html, /Verified Answer Rubric:/);
  });

  it('enforces revocation defense in Core 1B: revoked asset access throws error or denies read', async () => {
    const f = await setupTransfer();
    const journey = f.make();
    await journey.start();
    await journey.predict(0);

    // Revoke authority
    f.setEnabled(false);

    // Requesting hint after revocation must throw HINT_NOT_AUTHORIZED
    await assert.rejects(async () => {
      await journey.requestHint();
    }, /HINT_NOT_AUTHORIZED/);
  });
});
