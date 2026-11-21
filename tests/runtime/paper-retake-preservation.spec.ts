import {test} from 'node:test';
import assert from 'node:assert/strict';
import {MemoryStorageDriver} from '../../web/runtime/storage.ts';
import {paperBaseSessionId,activePaperSessionId,beginFreshPaperAttempt} from '../../web/runtime/paper-attempts.ts';
import {createAuthorizedNsejsPaperSession} from '../../web/runtime/nsejs-session.ts';
import {createAuthorizedIoqmPaperSession} from '../../web/runtime/ioqm-session.ts';
import {PaperWorkspaceController} from '../../web/pages/paper.ts';

test('retake is generation-scoped and leaves prior NSEJS answers, draft and committed receipt intact', async () => {
  const driver = new MemoryStorageDriver();
  const learner = 'roi-nsejs';
  const original = await createAuthorizedNsejsPaperSession(learner,driver);
  const first = await original.binding.session.snapshot();
  const controller = new PaperWorkspaceController(original.config,original.binding);
  await controller.restore();
  assert.equal(controller.setPartResponse(original.config.parts[0].id,{kind:'SINGLE_CHOICE',value:'A'}),true);
  await controller.saveDraft();
  const oldDraft = await driver.get('drafts',first.id);
  assert.ok(oldDraft,'draft must exist before retake');

  const base = paperBaseSessionId('rel-nsejs-2024-v1',original.config.paperId,learner);
  const nextId = await beginFreshPaperAttempt(driver,base);
  assert.equal(nextId,base+':retake:1');
  assert.equal(await activePaperSessionId(driver,base),nextId);
  const second = await createAuthorizedNsejsPaperSession(learner,driver);
  const secondRecord = await second.binding.session.snapshot();
  assert.equal(secondRecord.id,nextId);
  assert.deepEqual(secondRecord.attemptIds,[]);
  const secondController = new PaperWorkspaceController(second.config,second.binding);
  await secondController.restore();
  assert.equal(secondController.getPartResponse(original.config.parts[0].id),undefined);
  assert.deepEqual(await driver.get('drafts',first.id),oldDraft,'retake must not destroy prior draft');
  assert.deepEqual(await driver.get('sessions',first.id),first,'original session retained');

  for(const part of second.config.parts) {
    assert.equal(secondController.setPartResponse(part.id,{kind:'SINGLE_CHOICE',value:'A'}),true);
  }
  await secondController.saveDraft();
  await secondController.submitPaper();
  const secondAttempt = second.binding.attemptId;
  assert.ok(await driver.get('attempts',secondAttempt),'submitted attempt stored');
  const thirdId = await beginFreshPaperAttempt(driver,base);
  assert.equal(thirdId,base+':retake:2');
  const third = await createAuthorizedNsejsPaperSession(learner,driver);
  assert.equal((await third.binding.session.snapshot()).id,thirdId);
  assert.ok(await driver.get('attempts',secondAttempt),'prior committed attempt survives second retake');
  assert.ok(await driver.get('sessions',secondRecord.id),'prior committed session survives second retake');
});

test('expired IOQM session and draft are kept for read-only review instead of silently discarded',async()=>{
  const driver=new MemoryStorageDriver();
  const learner='roi-ioqm';
  const first=await createAuthorizedIoqmPaperSession(learner,driver);
  const s=await first.binding.session.snapshot();
  const expired={...s,deadlineAt:new Date(Date.now()-1000).toISOString()};
  await driver.put('sessions',s.id,expired);
  const retained=await createAuthorizedIoqmPaperSession(learner,driver);
  assert.equal((await retained.binding.session.snapshot()).id,s.id);
  assert.deepEqual(await driver.get('sessions',s.id),expired);
  const base=paperBaseSessionId('rel-ioqm-2024-v1',first.config.paperId,learner);
  await beginFreshPaperAttempt(driver,base);
  const fresh=await createAuthorizedIoqmPaperSession(learner,driver);
  assert.equal((await fresh.binding.session.snapshot()).id,base+':retake:1');
  assert.ok(await driver.get('sessions',s.id),'expired prior session still exists');
});

test('paper retake pointer rejects malformed or foreign generations without touching existing work',async()=>{
  const driver=new MemoryStorageDriver();
  const base=paperBaseSessionId('rel-nsejs-2024-v1','paper:nsejs-2024-mock-1','other');
  assert.equal(await activePaperSessionId(driver,base),base);
  await driver.put('paper_active_sessions',base,{generation:1,sessionId:'unrelated-learner-session'});
  await assert.rejects(()=>activePaperSessionId(driver,base),/PAPER_SESSION_POINTER_CORRUPT/);
  await assert.rejects(()=>beginFreshPaperAttempt(driver,base),/PAPER_SESSION_POINTER_CORRUPT/);
});
