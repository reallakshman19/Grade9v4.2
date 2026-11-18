import {it} from 'node:test';
import assert from 'node:assert/strict';
import {chromium} from 'playwright-core';
import {createServer} from 'vite';
import {MemoryStorageDriver,StorageError} from '../../web/runtime/storage.ts';
import {Core1BTransferJourney} from '../../web/journeys/core1b.ts';
import {Core1BTransferPageController} from '../../web/pages/transfer.ts';
import {canonicalJson,computeSha256} from '../../web/runtime/loader.ts';
import type {Attempt,Ref} from '../../web/runtime/types.ts';
import {artifact,firstResponses,boundaryResponses,setupTransfer,throughFirst,throughRepair} from '../fixtures/wave8-synthetic.ts';
it('durable nine-event journey, exact protected bytes, qualified first/boundary grade and original source return',async()=>{
 const f=await setupTransfer(),j=f.make();await j.start();assert.equal(await j.getTaskASolution(),null);assert.equal(await j.readBoundaryStimulus(),null);assert(!JSON.stringify(j.getDefinition()).includes('SECRET'));await assert.rejects(j.requestHint(),/ILLEGAL_STAGE/);
 await j.predict(0);assert.equal(j.getPrediction().isExpected,null);j.setResponses(firstResponses,[artifact('work:first')]);await j.saveDraft();const hint=await j.requestHint();assert.equal(hint.text,'REVIEWED_HINT_ONE');assert.equal(await j.readHint('H1'),'REVIEWED_HINT_ONE');const resumed=f.make();await resumed.restore();assert.deepEqual(resumed.getResponses(),firstResponses);await resumed.commitFirstAttempt();assert.equal(resumed.getStage(),'RECONSTRUCT');assert.equal(await resumed.getTaskASolution(),'REVIEWED_FIRST_REFERENCE');const original=await resumed.readOriginalAttempt();assert.equal(original?.grade.status,'REVIEW_PENDING');assert.equal(original?.grade.parts?.a.points,1);assert.equal(original?.hintIds.length,1);
 await throughRepair(resumed);assert.equal(await resumed.readBoundaryStimulus(),'REVIEWED_BOUNDARY_STIMULUS');assert.equal(await resumed.getTaskBSolution(),null);resumed.setResponses(boundaryResponses,[artifact('work:boundary')]);await resumed.saveDraft();const fresh=f.make();await fresh.restore();assert.deepEqual(fresh.getResponses(),boundaryResponses);await fresh.commitBoundaryAttempt();assert.equal(fresh.getStage(),'BOUNDARY_TEST');assert.equal(await fresh.getTaskBSolution(),null);assert.equal(await fresh.viewBoundaryFeedback(),'REVIEWED_BOUNDARY_REFERENCE');assert.equal(fresh.getStage(),'COMPLETE');assert.equal(await fresh.getTaskBSolution(),'REVIEWED_BOUNDARY_REFERENCE');const returned=await fresh.returnToSource();assert.deepEqual(returned,{sessionId:f.os.id,ref:f.os.item,cursor:f.os.cursor});assert.deepEqual(await f.driver.get('sessions',f.os.id),f.os);assert.equal((await fresh.readHistory()).length,9);assert.equal((await f.driver.getAll('attempts')).length,2);assert.equal(canonicalJson(await fresh.readOriginalAttempt()),canonicalJson(original));await assert.rejects(fresh.returnToSource(),/SOURCE_ALREADY_RETURNED/);
});
it('rejects stale draft CAS and atomically rolls back first and boundary commitments',async()=>{
 const d=new MemoryStorageDriver(),f=await setupTransfer(d),j=f.make();await j.start();await j.predict(0);j.setResponses(firstResponses,[artifact('work:first')]);await j.saveDraft();const stale=f.make(),fresh=f.make();await stale.restore();await fresh.restore();fresh.setResponses({...firstResponses,a:{kind:'INTEGER',value:'6'}},[artifact('work:first')]);await fresh.saveDraft();await assert.rejects(stale.commitFirstAttempt(),/Stale draft revision/);assert.equal((await d.getAll('attempts')).length,0);
 d.setFailureHook((store,op)=>store.startsWith('cog_events:')&&op==='put'?new StorageError('TRANSACTION_ABORTED','injected'):null);await assert.rejects(fresh.commitFirstAttempt());assert.equal((await d.getAll('attempts')).length,0);assert.equal((await f.progress.loadDraft(f.as.id))?.revision,2);assert.equal(fresh.isFirstAttemptCommitted(),false);await assert.rejects(fresh.getTaskASolution());d.setFailureHook(null);await fresh.restore();await fresh.commitFirstAttempt();await throughRepair(fresh);
 fresh.setResponses(boundaryResponses,[artifact('work:boundary')]);await fresh.saveDraft();d.setFailureHook((store,op)=>store.startsWith('cog_events:')&&op==='put'?new StorageError('TRANSACTION_ABORTED','injected'):null);await assert.rejects(fresh.commitBoundaryAttempt());assert.equal((await d.getAll('attempts')).length,1);assert(await f.progress.loadDraft(f.bs.id));assert.equal(fresh.isBoundaryCommitted(),false);d.setFailureHook(null);await fresh.restore();await fresh.commitBoundaryAttempt();await fresh.viewBoundaryFeedback();assert.equal((await d.getAll('attempts')).length,2);
});
it('wrong asset bytes, stale origin, unbound or forged snapshot fail closed',async()=>{
 const f=await setupTransfer(),j=f.make();await j.start();await j.predict(0);const unbound=new Core1BTransferJourney(f.definition);await assert.rejects(unbound.start());assert.throws(()=>unbound.restoreDraft({journeyId:f.key.journeyId,checkpoint:{sequence:9,sha256:'f'.repeat(64)},responses:firstResponses,work:[],revision:1}));f.bytes.set('asset:hint:h1',new TextEncoder().encode('tampered'));await assert.rejects(j.requestHint(),/INTEGRITY/);await j.restore();assert.equal((await j.readHistory()).length,1);assert.equal(j.isAssistedAttempt(),false);await f.driver.put('sessions',f.os.id,{...f.os,contentRevision:'stale'});await assert.rejects(j.restore(),/ORIGIN_NOT_AUTHORIZED/);
});
it('actual Chromium: unbound page escapes labels and never renders embedded answers',async()=>{const f=await setupTransfer(),c=new Core1BTransferPageController({transferDefinition:{...f.definition,freshTaskA:{...f.definition.freshTaskA,title:'<img src=x onerror=alert(1)>'}}});const b=await chromium.launch({headless:true});try{const p=await b.newPage();await p.setContent(c.render());assert.equal(await p.locator('img,[onerror]').count(),0);assert(!c.render().includes('SECRET'));assert.equal(await p.locator('[data-action=predict]').isDisabled(),true);}finally{await b.close();}});
it('actual Chromium IndexedDB: commit rollback and recovery, boundary persistence, source return',{timeout:60000},async()=>{
 const server=await createServer({server:{host:'127.0.0.1',port:0,strictPort:true}});await server.listen();const addr=server.httpServer!.address();assert(addr&&typeof addr!=='string');
 const browser=await chromium.launch({headless:true});try{const page=await browser.newPage();await page.goto('http://127.0.0.1:'+addr.port+'/');
 const path='/@fs/'+process.cwd()+'/tests/fixtures/wave8-synthetic.ts',name='wave8:'+Date.now();
 const run=async(action:string)=>page.evaluate(async({path,name,action})=>{
  const {setupTransfer,firstResponses,boundaryResponses,artifact,throughRepair}=await import(path);const storagePath='/runtime/storage.ts';const {IndexedDBStorageDriver}=await import(storagePath);const d=new IndexedDBStorageDriver({dbName:name});const f=await setupTransfer(d,action==='initialize'),j=f.make();
  try{if(action==='initialize'){await j.start();await j.predict(0);j.setResponses(firstResponses,[artifact('work:first')]);await j.saveDraft();return {stage:j.getStage()};}
   await j.restore();if(action==='first'){const t=d.transaction.bind(d);d.transaction=(names:any,mode:any,op:any)=>t(names,mode,async(tx:any)=>op({...tx,put:async(store:string,key:string,value:any)=>{if(store.startsWith('cog_events:'))throw Error('injected after attempt write');return tx.put(store,key,value);}}));let rejected=false;try{await j.commitFirstAttempt();}catch{rejected=true;}d.transaction=t;const rollback=rejected&&!(await d.getAll('attempts')).length&&!!await f.progress.loadDraft(f.as.id);await j.restore();await j.commitFirstAttempt();await throughRepair(j);j.setResponses(boundaryResponses,[artifact('work:boundary')]);await j.saveDraft();return {rollback,stage:j.getStage()};}
   if(action==='boundary'){const restored=j.getResponses().c.value==='8';await j.commitBoundaryAttempt();await j.viewBoundaryFeedback();const source=await j.returnToSource();return {restored,source:source.sessionId,attempts:(await d.getAll('attempts')).length};}
   return {stage:j.getStage(),returned:j.isSourceReturned(),first:await j.getTaskASolution(),boundary:await j.getTaskBSolution(),origin:(await d.get('sessions',f.os.id)).cursor};
  }finally{await d.close();}
 },{path,name,action});
 assert.deepEqual(await run('initialize'),{stage:'ATTEMPT'});await page.reload();assert.deepEqual(await run('first'),{rollback:true,stage:'BOUNDARY_TEST'});await page.reload();assert.deepEqual(await run('boundary'),{restored:true,source:'session:origin',attempts:2});await page.reload();assert.deepEqual(await run('verify'),{stage:'COMPLETE',returned:true,first:'REVIEWED_FIRST_REFERENCE',boundary:'REVIEWED_BOUNDARY_REFERENCE',origin:7});
 }finally{await browser.close();await server.close();}
});

it('direct A49 boundary read is sealed before repair; rehashed stored grades cannot authorize reference',async()=>{
 const f=await setupTransfer(),j=f.make();await j.start();const boundary=f.definition.boundaryTaskB.taskRef as Ref;
 let loads=0;const loader=async(ref:Ref)=>{loads++;return f.binding.loadProtected(ref);};
 assert.equal(await f.controller.readProtectedText('VIEW_STIMULUS',boundary,j.getCheckpoint()!,loader),null);assert.equal(loads,0);
 await j.predict(0);j.setResponses(firstResponses,[artifact('work:first')]);await j.commitFirstAttempt();assert.equal(await f.controller.readProtectedText('VIEW_STIMULUS',boundary,j.getCheckpoint()!,loader),null);assert.equal(loads,0);
 const original=(await j.readOriginalAttempt())!,event=(await j.readHistory()).find(e=>e.event_type==='FIRST_COMMITTED')!;
 const altered={...original,grade:{...original.grade,parts:{...original.grade.parts,a:{...original.grade.parts!.a,points:0}}}} as Attempt;
 await f.driver.put('attempts',original.id,altered);await f.driver.put('cognitive_event_attempt',event.event_id,{id:original.id,sha256:await computeSha256(canonicalJson(altered))});
 assert.equal(await f.controller.canDisplay('REFERENCE_SOLUTION',f.firstRef,j.getCheckpoint()!),false);
 assert.equal(await j.getTaskASolution(),null);await assert.rejects(j.restore(),/no longer qualifies/);
});
