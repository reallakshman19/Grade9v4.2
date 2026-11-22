import assert from 'node:assert/strict';
import {test} from 'node:test';
import {createStorageDriver} from '../../web/runtime/storage.ts';
import {createAuthorizedNsejsPaperSession} from '../../web/runtime/nsejs-session.ts';
import {createAuthorizedIoqmPaperSession} from '../../web/runtime/ioqm-session.ts';
import {PaperWorkspaceController} from '../../web/pages/paper.ts';

for(const [name,factory] of [
  ['NSEJS',createAuthorizedNsejsPaperSession],
  ['IOQM',createAuthorizedIoqmPaperSession],
] as const){
  test(`${name}: retake retains committed history and unrelated sessions`,async()=>{
    const driver=createStorageDriver({preferMemory:true});
    const first=await factory('learner1',driver);
    const old=await first.binding.session.snapshot();
    await driver.put('sessions',old.id,{...old,attemptIds:[first.binding.attemptId]});
    await driver.put('attempts',first.binding.attemptId,{marker:'prior submission'});
    await driver.put('drafts',old.id,{marker:'prior draft'});
    await driver.put('sessions','other-learner',{marker:'other learner'});
    const next=await factory('learner1',driver,true);
    const fresh=await next.binding.session.snapshot();
    assert.notEqual(fresh.id,old.id);
    assert.notEqual(next.binding.attemptId,first.binding.attemptId);
    assert.deepEqual(fresh.attemptIds,[]);
    assert.equal((await driver.get<{marker:string}>('attempts',first.binding.attemptId))?.marker,'prior submission');
    assert.equal((await driver.get<{marker:string}>('drafts',old.id))?.marker,'prior draft');
    assert.equal((await driver.get<{marker:string}>('sessions','other-learner'))?.marker,'other learner');
    assert.equal((await driver.get<{attemptIds:string[]}>('sessions',old.id))?.attemptIds[0],first.binding.attemptId);
    assert.equal((await (await factory('learner1',driver)).binding.session.snapshot()).id,fresh.id);
    assert.notEqual((await (await factory('learner2',driver)).binding.session.snapshot()).id,fresh.id);
  });
  test(`${name}: expiry is read-only until explicit retake; mismatched history is archived`,async()=>{
    const driver=createStorageDriver({preferMemory:true});
    const first=await factory('learner',driver);
    const old=await first.binding.session.snapshot();
    await driver.put('sessions',old.id,{...old,deadlineAt:new Date(Date.now()-5000).toISOString()});
    await driver.put('drafts',old.id,{marker:'expired draft'});
    const reopened=await factory('learner',driver);
    assert.equal((await reopened.binding.session.snapshot()).id,old.id,'Expired session must remain active for read-only viewing');
    assert.equal((await driver.get<{marker:string}>('drafts',old.id))?.marker,'expired draft');
    const renewed=await factory('learner',driver,true); // only explicit retake rotates the active run
    const second=await renewed.binding.session.snapshot();
    assert.notEqual(second.id,old.id);
    const tampered={...second,origin:{...second.origin!,sha256:'0'.repeat(64)}};
    await driver.put('sessions',second.id,tampered);
    const fresh=await factory('learner',driver);
    assert.notEqual((await fresh.binding.session.snapshot()).id,second.id);
    assert.deepEqual(await driver.get('sessions',second.id),tampered);
  });
  test(`${name}: corrupt active pointer fails closed without deletion`,async()=>{
    const driver=createStorageDriver({preferMemory:true});
    const first=await factory('learner',driver);
    const old=await first.binding.session.snapshot();
    await driver.put('paper_active_runs',old.id,{schema:'g9-paper-active-run/1',sequence:4,sessionId:old.id+':run:2'});
    await assert.rejects(factory('learner',driver),/PAPER_RUN_POINTER_INVALID/);
    assert.deepEqual(await driver.get('sessions',old.id),old);
  });
}
for(const [name,factory] of [
  ['NSEJS',createAuthorizedNsejsPaperSession],
  ['IOQM',createAuthorizedIoqmPaperSession],
] as const){
  test(`${name}: archived run cannot accept stale-tab drafts after retake`,async()=>{
    const driver=createStorageDriver({preferMemory:true});
    const oldBinding=await factory('two-tab-learner',driver),old=await oldBinding.binding.session.snapshot();
    const response=name==='NSEJS'
      ? {kind:'SINGLE_CHOICE' as const,value:'A'}
      : {kind:'INTEGER' as const,value:'07'};
    await oldBinding.binding.progress.saveDraft(old,response,[],0);
    const current=await factory('two-tab-learner',driver,true),fresh=await current.binding.session.snapshot();
    await assert.rejects(
      oldBinding.binding.progress.saveDraft(old,response,[],1),
      /Exam session superseded/
    );
    assert(await oldBinding.binding.progress.loadDraft(old.id),'Old draft must remain readable');
    await current.binding.progress.saveDraft(fresh,response,[],0);
    assert(await current.binding.progress.loadDraft(fresh.id),'New run must accept its own draft');
    assert.notEqual(old.id,fresh.id);
  });
}
for(const [name,factory] of [
  ['NSEJS',createAuthorizedNsejsPaperSession],
  ['IOQM',createAuthorizedIoqmPaperSession],
] as const){
  test(`${name}: progress archive preserves historical exam runs but never fabricates current-run authority`,async()=>{
    const driver=createStorageDriver({preferMemory:true});
    const first=await factory('archive-user',driver),s0=await first.binding.session.snapshot();
    const response=name==='NSEJS'
      ? {kind:'SINGLE_CHOICE' as const,value:'A'}
      : {kind:'INTEGER' as const,value:'07'};
    await first.binding.progress.saveDraft(s0,response,[],0);
    const next=await factory('archive-user',driver,true),s1=await next.binding.session.snapshot();
    await next.binding.progress.saveDraft(s1,response,[],0);
    const archive=await next.binding.progress.exportAll();

    const importedDriver=createStorageDriver({preferMemory:true});
    const {DefaultProgressStore}=await import('../../web/runtime/progress.ts');
    const imported=new DefaultProgressStore(importedDriver);
    await imported.importVerified(archive);
    assert.equal(await importedDriver.get('paper_active_runs',s0.id),undefined,
      'Historical archive cannot forge a new active-run authorization');
    assert(await imported.loadDraft(s0.id));
    assert(await imported.loadDraft(s1.id));
    await assert.rejects(factory('archive-user',importedDriver),/PAPER_ARCHIVED_HISTORY_RETAKE_REQUIRED/,
      'Reopening imported history must not silently pick a different prior run');
    const resumed=await factory('archive-user',importedDriver,true),s2=await resumed.binding.session.snapshot();
    assert.notEqual(s2.id,s0.id);assert.notEqual(s2.id,s1.id);
    assert(await imported.loadDraft(s0.id));assert(await imported.loadDraft(s1.id));
    assert.equal((await (await factory('archive-user',importedDriver)).binding.session.snapshot()).id,s2.id);
  });
}
test('clearing a selected answer changes dirty status without private state access',async()=>{
  const driver=createStorageDriver({preferMemory:true});
  const {config,binding}=await createAuthorizedNsejsPaperSession('learner',driver);
  const controller=new PaperWorkspaceController(config,binding);
  await controller.restore();
  const part=config.parts[0].id;
  assert.equal(controller.setPartResponse(part,{kind:'SINGLE_CHOICE',value:'A'}),true);
  assert.equal(controller.clearPartResponse(part),true);
  assert.equal(controller.getPartResponse(part),undefined);
  assert.equal(controller.getViewState().dirty,true);
});
