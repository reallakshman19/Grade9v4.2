import {it} from 'node:test';
import assert from 'node:assert/strict';
import {chromium} from 'playwright-core';
import {createServer} from 'vite';
import {searchFixture} from '../fixtures/search-wire.ts';
it('A35 actual Python shard bytes, dedicated worker, search UI, facets, suggestion, stale reload and exact route',{timeout:60000},async()=>{
 const f=searchFixture(),server=await createServer({server:{host:'127.0.0.1',port:0,strictPort:true}});await server.listen();const addr=server.httpServer!.address();assert(addr&&typeof addr!=='string');
 const browser=await chromium.launch({headless:true});try{
  const page=await browser.newPage({viewport:{width:390,height:844}});await page.goto('http://127.0.0.1:'+addr.port+'/');
  let workers=0;page.on('worker',()=>{workers++;});let dialogs=0;page.on('dialog',async d=>{dialogs++;await d.dismiss();});
  await page.evaluate(async f=>{
   const {SearchEngine}=await import('/runtime/search.ts' as string),{ManifestLoader}=await import('/runtime/loader.ts' as string),{Router}=await import('/app/router.ts' as string),{UniversalSearchPageController}=await import('/pages/search.ts' as string);
   const state={active:true,wire:f.actual,corrupt:false};
   const make=async()=>{const w=state.wire,l=new ManifestLoader([{releaseId:w.pins.releaseId,digest:w.pins.releaseDigest}]),release=await l.loadFromData(w.release,w.pins.releaseDigest);return SearchEngine.open({pins:w.pins,releaseLoader:l,release,manifestBytes:w.manifest,loadShard:async(m:any)=>state.corrupt?w.shards[m.shard_id].replace('Diagnostic text','Tampered text'):w.shards[m.shard_id],live:async()=>state.active&&state.wire.pins.manifestDigest===w.pins.manifestDigest});};
   const router=new Router({basePath:'/grade9',useHash:true}),root=document.getElementById('app')!,host=new UniversalSearchPageController(root,router,make);(window as any).a35={state,host,router,make,f};await host.open(router.toHref('/search'));
  },f);
  await page.getByRole('button',{name:'Open diagnostic question'}).waitFor();assert(workers>=1);assert.equal(await page.locator('.g9-search img').count(),0);assert.equal(dialogs,0);
  await page.locator('[data-search]').fill('enrgy');await page.locator('[data-action=search]').click();await page.getByRole('button',{name:'Did you mean: energy?'}).click();await page.getByRole('button',{name:'Open diagnostic question'}).waitFor();
  await page.locator('[data-search]').fill('H');await page.getByRole('button',{name:'²',exact:true}).click();assert.equal(await page.locator('[data-search]').inputValue(),'H²');
  await page.locator('[data-search]').fill('ＳＴＲＡＳＳＥ');await page.locator('[data-action=search]').click();await page.getByRole('button',{name:'Open diagnostic question'}).waitFor();
  await page.locator('[data-facet=subject]').check();await page.getByRole('button',{name:'Open diagnostic question'}).waitFor();
  for(const [width,height] of [[390,844],[768,1024],[1024,768],[1366,768],[820,1180],[1180,820],[360,640]]){
   await page.setViewportSize({width,height});assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
   assert.equal(await page.evaluate(()=>Array.from(document.querySelectorAll('.g9-search button,.g9-search input[type=search],.g9-search label.facet')).every(n=>{const r=n.getBoundingClientRect();return r.height>=48&&r.width>=48;})),true);
  }
  await page.evaluate(()=>{(window as any).a35.state.active=false;});await page.locator('[data-action=open-question]').click();await page.getByText(/No cached results/).waitFor();assert.equal(await page.locator('article').count(),0);
  await page.evaluate(()=>{const s=(window as any).a35.state;s.active=true;s.corrupt=true;});await page.locator('[data-action=reload]').click();await page.getByText(/No cached results/).waitFor();
  await page.evaluate(()=>{const s=(window as any).a35.state;s.corrupt=false;s.wire=(window as any).a35.f.withdrawn;});await page.locator('[data-action=reload]').click();await page.getByText(/No matching reviewed/).waitFor();assert.equal(await page.locator('article').count(),0);
  await page.evaluate(async()=>{const {state,host,router,f}=(window as any).a35;state.wire=f.actual;await host.open(router.toHref('/search'));});await page.locator('[data-action=open-question]').click();await page.waitForFunction(()=> (window as any).a35.router.getCurrent().type==='QUESTION');
  assert.equal(await page.evaluate(()=> (window as any).a35.router.getCurrent().params.questionId),'demo:q:001');
  assert.equal(await page.locator('article').count(),0);
  // Scale exercise on synthetic 1493-record fixture, actual worker. No real corpus or device claim.
  const perf=await page.evaluate(async()=>{const {state,f,make}=(window as any).a35;state.wire=f.bench;const engine=await make();try{const times:number[]=[];for(let i=0;i<25;i++){const t=performance.now();const r=await engine.query({text:'energy',facets:{subject:['PHYSICS','CHEMISTRY']},limit:20});if(r.totalMatches!==996)throw Error('BENCH_COUNT');times.push(performance.now()-t);}times.sort((a,b)=>a-b);return {p95:times[Math.ceil(times.length*.95)-1],samples:times.length};}finally{engine.close();}});
  console.log('A35 synthetic 1493-record worker query p95 ms',JSON.stringify(perf));assert(perf.p95<200);
 }finally{await browser.close();await server.close();}
});
