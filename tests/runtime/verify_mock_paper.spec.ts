import assert from 'node:assert/strict';
import { test } from 'node:test';
import { createNsejsPaperWorkspaceConfig, createAuthorizedNsejsPaperSession } from '../../web/runtime/nsejs-session.ts';
import { DEFAULT_APP_REGISTRY } from '../../web/runtime/registry/index.ts';

test('NSEJS Mock Paper 1 Integration Verification', async (t) => {
  await t.test('Registry descriptor is ACTIVE with 180 marks', () => {
    const paper = DEFAULT_APP_REGISTRY.papers.find((p) => p.id === 'paper:nsejs-2024-mock-1');
    assert.ok(paper, 'NSEJS Mock Paper 1 must exist in registry');
    assert.equal(paper.availability, 'AVAILABLE');
    assert.equal(paper.totalMarks, 180);
    assert.equal(paper.questionCount, 60);
    assert.equal(paper.scoringPolicy.positiveMarksPerQuestion, 3);
    assert.equal(paper.scoringPolicy.negativeMarksPerQuestion, 1);
  });

  await t.test('60 questions are fully authored across Physics, Chemistry, Biology', () => {
    const cfg = createNsejsPaperWorkspaceConfig();
    assert.equal(cfg.parts.length, 60);

    const phys = cfg.parts.filter((p) => p.sectionId === 'sec-nsejs-physics');
    const chem = cfg.parts.filter((p) => p.sectionId === 'sec-nsejs-chemistry');
    const bio = cfg.parts.filter((p) => p.sectionId === 'sec-nsejs-biology');

    assert.equal(phys.length, 20, '20 Physics questions required');
    assert.equal(chem.length, 20, '20 Chemistry questions required');
    assert.equal(bio.length, 20, '20 Biology questions required');

    for (let i = 0; i < 60; i++) {
      const part = cfg.parts[i];
      assert.ok(part.promptHtml.includes('<ul>') && part.promptHtml.includes('<li>'), `Part ${i + 1} must include styled MCQ options`);
      assert.ok(part.promptHtml.includes('Question ' + (i + 1)), `Part ${i + 1} must include question title`);
      assert.ok(part.maxPoints === 3, `Part ${i + 1} must carry 3 marks`);
      assert.ok(part.responseKind === 'SINGLE_CHOICE', `Part ${i + 1} must be SINGLE_CHOICE`);
    }
  });

  await t.test('Archives stale cached sessions without PAPER_STATE_MISMATCH', async () => {
    const { createStorageDriver } = await import('../../web/runtime/storage.ts');
    const driver = createStorageDriver({ dbName: 'test_stale_mismatch_db', preferMemory: true });
    const releaseId = 'rel-nsejs-2024-v1';
    const sessionId = `ses:${releaseId}:paper:nsejs-2024-mock-1:diagnostic_learner`;
    
    // Inject a simulated stale session with an outdated definition sha256
    await driver.put('sessions', sessionId, {
      id: sessionId,
      releaseId,
      item: { type: 'QUESTION', id: 'task:nsejs-2024-mock-1', revision: 1, sha256: '0'.repeat(64) },
      mode: 'SIMULATED_EXAM',
      origin: { type: 'PAPER', id: 'paper:nsejs-2024-mock-1', revision: 1, sha256: 'deadbeef'.repeat(8) },
      deadlineAt: new Date(Date.now() + 7200000).toISOString(),
      attemptIds: [`att:${sessionId}:1`],
      draftId: sessionId,
    });

    // Authorize a fresh versioned run, preserving the mismatched old record for forensic recovery
    const { config, binding } = await createAuthorizedNsejsPaperSession('diagnostic_learner', driver);
    const { PaperWorkspaceController } = await import('../../web/pages/paper.ts');
    const controller = new PaperWorkspaceController(config, binding);
    await controller.restore(); // Must NOT throw PAPER_STATE_MISMATCH

    assert.equal(controller.getViewState().ready, true);
    assert.equal(controller.getViewState().isCommitted, false);
  });
});
