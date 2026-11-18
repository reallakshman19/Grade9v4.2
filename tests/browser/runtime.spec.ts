import {it} from 'node:test';
import assert from 'node:assert/strict';
import {chromium} from 'playwright-core';
import {createServer} from 'vite';
it('real browser IndexedDB supports dynamic cognitive stores, async hashing, refresh and rollback',async()=>{
 const server=await createServer({server:{host:'127.0.0.1',port:0,strictPort:true}});await server.listen();
 const address=server.httpServer!.address();assert(address&&typeof address!=='string');
 const browser=await chromium.launch({headless:true});
 try{
  const page=await browser.newPage();
  await page.goto('http://127.0.0.1:'+address.port+'/');
  const result=await page.evaluate(async()=>{
   const storagePath='/runtime/storage.ts', cognitivePath='/runtime/cognitive-store.ts', capabilityPath='/runtime/capabilities.ts';
   const {IndexedDBStorageDriver}=await import(storagePath);
   const {DefaultCognitiveStore}=await import(cognitivePath);
   const {createStandardCapability}=await import(capabilityPath);
   const mount=document.createElement('div');document.body.appendChild(mount);let emitted:any=null;
   const dispose=createStandardCapability('INTEGER').mount(mount,null,(r:any)=>{emitted=r;});const input=mount.querySelector('input')!;input.value='bad';input.dispatchEvent(new Event('input'));const invalid=input.getAttribute('aria-invalid')==='true'&&emitted===null;input.value='42';input.dispatchEvent(new Event('input'));const valid=emitted?.value==='42';dispose();const disposed=mount.childElementCount===0;mount.remove();
   const dbName='g9-browser-'+crypto.randomUUID();const d=new IndexedDBStorageDriver({dbName});
   const j={journeyId:'browser:journey',taskInstanceId:'browser:instance',releaseId:'RELEASE-DEMO-01',task:{type:'QUESTION',id:'que:browser',revision:1,sha256:'a'.repeat(64)}};
   const e={schema_version:'g9-cognitive-event/1',event_id:'evt:browser:1',journey_id:j.journeyId,task_instance_id:j.taskInstanceId,release_id:j.releaseId,task_ref:j.task,sequence:1,previous_sha256:null,event_type:'PREDICTION_COMMITTED',payload:{prediction:'prediction',artifact_ids:[]},at:'2026-11-17T12:00:00Z'};
   const s=new DefaultCognitiveStore(d),snap=await s.append(e,j,{sequence:0,sha256:null},[]);
   await d.close();const fresh=new IndexedDBStorageDriver({dbName});const replay=await new DefaultCognitiveStore(fresh).replay(j,snap.checkpoint);
   let aborted=false;try{await fresh.transaction(['a','b'],'readwrite',async(tx:any)=>{await tx.put('a','x',1);await crypto.subtle.digest('SHA-256',new Uint8Array([1]));await tx.put('b','x',2);throw new Error('rollback');});}catch{aborted=true;}
   const missing=(await fresh.get('a','x'))===undefined&&(await fresh.get('b','x'))===undefined;
   await fresh.close();indexedDB.deleteDatabase(dbName);
   return {stage:replay.stage,hash:replay.lastHash,aborted,missing,invalid,valid,disposed};
  });
  assert.equal(result.stage,'ATTEMPT');assert.match(result.hash,/^[a-f0-9]{64}$/);assert(result.aborted&&result.missing);assert(result.invalid&&result.valid&&result.disposed);
 }finally{await browser.close();await server.close();}
});

it('two tabs share a durable draft CAS and reject stale writes after reload',async()=>{
 const server=await createServer({server:{host:'127.0.0.1',port:0,strictPort:true}});await server.listen();
 const address=server.httpServer!.address();assert(address&&typeof address!=='string');
 const browser=await chromium.launch({headless:true});
 try{
  const ctx=await browser.newContext(),a=await ctx.newPage(),b=await ctx.newPage(),url='http://127.0.0.1:'+address.port+'/';
  await Promise.all([a.goto(url),b.goto(url)]);
  const name='g9-two-tabs-'+Date.now();
  const write=async (page:typeof a,value:string,revision:number)=>page.evaluate(async({name,value,revision})=>{
   const storagePath='/runtime/storage.ts',progressPath='/runtime/progress.ts';
   const {IndexedDBStorageDriver}=await import(storagePath),{DefaultProgressStore}=await import(progressPath);
   const d=new IndexedDBStorageDriver({dbName:name});try{
    const s=new DefaultProgressStore(d),session={id:'ses:tab',releaseId:'rel:tab',item:{type:'QUESTION',id:'que:tab',revision:1,sha256:'a'.repeat(64)},origin:null,returnRoute:null,mode:'PRACTICE',cursor:0,attemptIds:[],draftId:null};
    await s.saveDraft(session,{kind:'INTEGER',value},[],revision);return true;
   }catch{return false;}finally{await d.close();}
  },{name,value,revision});
  assert.equal(await write(a,'1',0),true);
  const outcome=await Promise.all([write(a,'2',1),write(b,'3',1)]);assert.equal(outcome.filter(Boolean).length,1);
  await b.reload();assert.equal(await write(b,'4',1),false);assert.equal(await write(b,'5',2),true);
  await ctx.close();
 }finally{await browser.close();await server.close();}
});
