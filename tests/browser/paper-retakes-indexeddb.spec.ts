import assert from 'node:assert/strict';
import {test} from 'node:test';
import {chromium,type Page} from 'playwright-core';
import {createServer} from 'vite';

test('real IndexedDB: NSEJS and IOQM retakes preserve old drafts, reject stale-tab writes and recover active run after reload',{timeout:90000},async()=>{
  const server=await createServer({server:{host:'127.0.0.1',port:0,strictPort:true}});
  await server.listen();const address=server.httpServer!.address();assert(address&&typeof address!=='string');
  const browser=await chromium.launch({headless:true});
  try {
    for(const paper of ['NSEJS','IOQM'] as const){
      const context=await browser.newContext(),a=await context.newPage(),b=await context.newPage();
      await Promise.all([a.goto('http://127.0.0.1:'+address.port+'/test-host.html'),b.goto('http://127.0.0.1:'+address.port+'/test-host.html')]);
      const db='g9-paper-e2e-'+paper+'-'+Date.now();
      const begin=(page:Page,retake=false)=>page.evaluate(async({paper,db,retake})=>{
        const {IndexedDBStorageDriver}=await import('/runtime/storage.ts' as string);
        const {createAuthorizedNsejsPaperSession}=await import('/runtime/nsejs-session.ts' as string);
        const {createAuthorizedIoqmPaperSession}=await import('/runtime/ioqm-session.ts' as string);
        const driver=(window as any).testDriver??new IndexedDBStorageDriver({dbName:db});
        (window as any).testDriver=driver;
        const fn=paper==='NSEJS'?createAuthorizedNsejsPaperSession:createAuthorizedIoqmPaperSession;
        const result=await fn('same-learner',driver,retake);
        (window as any).testBinding=result.binding;
        const session=await result.binding.session.snapshot();
        return {id:session.id,attemptId:result.binding.attemptId};
      },{paper,db,retake});
      const first=await begin(a),second=await begin(b);
      assert.deepEqual(second,first);
      const draft=paper==='NSEJS'?{kind:'SINGLE_CHOICE',value:'B'}:{kind:'INTEGER',value:'07'};
      await a.evaluate(async draft=>{
        const bind=(window as any).testBinding;
        await bind.progress.saveDraft(await bind.session.snapshot(),draft,[],0);
      },draft);
      assert.equal(await b.evaluate(async()=>{
        const bind=(window as any).testBinding;
        return (await bind.progress.loadDraft((await bind.session.snapshot()).id))?.response?.value;
      }),draft.value);
      const next=await begin(a,true);
      assert.notEqual(next.id,first.id);assert.notEqual(next.attemptId,first.attemptId);
      const stale=await b.evaluate(async draft=>{
        const bind=(window as any).testBinding,s=await bind.session.snapshot();
        try{await bind.progress.saveDraft(s,draft,[],1);return 'ACCEPTED';}
        catch(e){return e instanceof Error?e.message:'ERROR';}
      },draft);
      assert.match(stale,/Exam session superseded|active-run pointer invalid/);
      const retained=await b.evaluate(async id=>{
        const d=(window as any).testDriver;
        return {session:!!await d.get('sessions',id),draft:!!await d.get('drafts',id)};
      },first.id);
      assert.deepEqual(retained,{session:true,draft:true});
      await a.reload();
      const resumed=await begin(a);
      assert.deepEqual(resumed,next,'Refresh must not reset the active run identity');
      await a.evaluate(async draft=>{
        const bind=(window as any).testBinding;
        await bind.progress.saveDraft(await bind.session.snapshot(),draft,[],0);
      },draft);
      assert.equal(await a.evaluate(async()=>{
        const bind=(window as any).testBinding;
        return (await bind.progress.loadDraft((await bind.session.snapshot()).id))?.response?.value;
      }),draft.value);
      await Promise.all([a,b].map(p=>p.evaluate(async()=>{await (window as any).testDriver?.close();})));
      await context.close();
    }
  }finally{await browser.close();await server.close();}
});
