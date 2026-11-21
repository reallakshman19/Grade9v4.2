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
  test(`${name}: expired and definition-mismatched history is archived`,async()=>{
    const driver=createStorageDriver({preferMemory:true});
    const first=await factory('learner',driver);
    const old=await first.binding.session.snapshot();
    await driver.put('sessions',old.id,{...old,deadlineAt:new Date(Date.now()-5000).toISOString()});
    await driver.put('drafts',old.id,{marker:'expired draft'});
    const renewed=await factory('learner',driver);
    const second=await renewed.binding.session.snapshot();
    assert.notEqual(second.id,old.id);
    assert.equal((await driver.get<{marker:string}>('drafts',old.id))?.marker,'expired draft');
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
