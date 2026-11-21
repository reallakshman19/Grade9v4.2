import {it} from 'node:test';
import assert from 'node:assert/strict';
import {chromium,type Page} from 'playwright-core';
import {createServer} from 'vite';
import {searchFixture} from '../fixtures/search-wire.ts';
const views=[[1366,854],[854,1366],[1600,1000],[1000,1600],[1280,800],[800,1280],[390,844]];
async function audit(page:Page,selector:string){
 let controls=0,minContrast=Infinity;
 for(const [width,height] of views){
  await page.setViewportSize({width,height});
  const result=await page.evaluate(selector=>{
   const root=document.querySelector(selector)!;
   const visible=(n:Element)=>{const s=getComputedStyle(n),r=n.getBoundingClientRect();return s.display!=='none'&&s.visibility!=='hidden'&&r.width>0&&r.height>0;};
   const targets=Array.from(root.querySelectorAll<HTMLElement>('button,select,input:not([type=hidden]):not([type=checkbox]),textarea,label.facet')).filter(visible);
   const bad=targets.filter(n=>{const r=n.getBoundingClientRect();return r.width<47.99||r.height<47.99;}).map(n=>n.textContent?.slice(0,30)||n.getAttribute('data-field')||n.tagName);
   const unnamed=targets.filter(n=>!(n.getAttribute('aria-label')?.trim()||n.getAttribute('aria-labelledby')||n instanceof HTMLButtonElement&&n.textContent?.trim()||n instanceof HTMLLabelElement&&n.textContent?.trim()||'labels' in n&&(n as HTMLInputElement).labels?.length)).map(n=>n.tagName);
   const rgb=(s:string)=>s.match(/[\d.]+/g)?.map(Number)??[];
   const lum=(v:number[])=>v.slice(0,3).map(c=>{const x=c/255;return x<=.04045?x/12.92:((x+.055)/1.055)**2.4;}).reduce((n,x,i)=>n+x*[.2126,.7152,.0722][i],0);
   const contrast=(n:Element)=>{let e:Element|null=n,bg:number[]=[];while(e){bg=rgb(getComputedStyle(e).backgroundColor);if(bg.length===3||bg[3]===1)break;e=e.parentElement;}if(!e)bg=[255,255,255];const fg=rgb(getComputedStyle(n).color);const a=lum(fg),b=lum(bg);return (Math.max(a,b)+.05)/(Math.min(a,b)+.05);};
   const textNodes=Array.from(root.querySelectorAll('p,h1,h2,h3,button')).filter(n=>visible(n)&&n.textContent?.trim()&&!(n as HTMLButtonElement).disabled);
   return {overflow:document.documentElement.scrollWidth-document.documentElement.clientWidth,bad,unnamed,count:targets.length,contrast:Math.min(...textNodes.map(contrast))};
  },selector);
  assert(result.count>0);assert(result.overflow<=0,JSON.stringify({selector,width,result}));assert.deepEqual(result.bad,[],JSON.stringify({selector,width,result}));assert.deepEqual(result.unnamed,[],JSON.stringify({selector,width,result}));assert(result.contrast>=4.5,JSON.stringify({selector,width,result}));controls+=result.count;minContrast=Math.min(minContrast,result.contrast);
 }
 return {surface:selector,viewports:views.length,controlObservations:controls,minContrast};
}
it('A38 real rendered QRT/search/transfer/personal controls at canonical viewports, contrast and keyboard',{timeout:60000},async()=>{
 const server=await createServer({server:{host:'127.0.0.1',port:0,strictPort:true}});await server.listen();const addr=server.httpServer!.address();assert(addr&&typeof addr!=='string');const browser=await chromium.launch({headless:true});
 try{const p=await browser.newPage();await p.goto('http://127.0.0.1:'+addr.port+'/test-host.html');const path='/@fs/'+process.cwd()+'/tests/fixtures/',f=searchFixture().actual;
 await p.evaluate(async({path,f})=>{const {mountGolden}=await import(path+'a37-golden.ts');(window as any).g=await mountGolden(document.getElementById('app')!,f,'a38-golden-'+Date.now());},{path,f});
 const results=[await audit(p,'.g9-a53')];
 await p.locator('[data-coord="RETRIEVE:D1"]').focus();await p.keyboard.press('ArrowRight');assert.equal(await p.locator(':focus').getAttribute('data-coord'),'RETRIEVE:D2');
 await p.evaluate(()=> (window as any).g.openSearch());await p.locator('[data-action=open-question]').waitFor();results.push(await audit(p,'.g9-search'));
 assert(await p.locator('[data-action=search]').evaluate(n=>n.getBoundingClientRect().height>=56));
 await p.locator('[data-search]').focus();await p.keyboard.press('Tab');assert.equal(await p.locator(':focus').getAttribute('data-action'),'search');await p.keyboard.press('Enter');await p.locator('[data-action=open-question]').waitFor();
 await p.locator('[data-action=open-question]').click();await p.getByLabel('Choose response').selectOption('A');await p.locator('[data-golden=source-commit]').click();await p.locator('[data-golden=recovery]').click();await p.locator('[data-action=predict]').waitFor();await p.locator('select').selectOption('0');await p.locator('[data-action=predict]').click();await p.locator('[data-field=a]').waitFor();
 results.push(await audit(p,'.g9-w9'));assert(await p.locator('[data-action=commit]').evaluate(n=>n.getBoundingClientRect().height>=56));
 await p.evaluate(async path=>{const {personalFixture}=await import(path+'a36-synthetic.ts'),{createPersonalStudyHost}=await import('/pages/personal-study.ts' as string),{Router}=await import('/app/router.ts' as string);const f=await personalFixture(),s=await f.open(),host=createPersonalStudyHost(document.getElementById('app')!,s,new Router());await host.open('settings');},path);
 await p.getByText('Settings and storage').waitFor();results.push(await audit(p,'.g9-personal'));
 await p.locator('[data-action=font-up]').focus();await p.keyboard.press('Enter');await p.getByText('Text scale: 1.05').waitFor();
 console.log('A38 rendered accessibility observations',JSON.stringify(results));
 }finally{await browser.close();await server.close();}
});
it('A38 actual compiler wire 10k worker queries and IndexedDB write/read transaction benchmark',{timeout:60000},async()=>{
 const w=searchFixture(true).bench,server=await createServer({server:{host:'127.0.0.1',port:0,strictPort:true}});await server.listen();const addr=server.httpServer!.address();assert(addr&&typeof addr!=='string');const browser=await chromium.launch({headless:true});
 try{const p=await browser.newPage();await p.goto('http://127.0.0.1:'+addr.port+'/');let workers=0;p.on('worker',()=>workers++);
 const metrics=await p.evaluate(async w=>{
  const {ManifestLoader}=await import('/runtime/loader.ts' as string),{SearchEngine}=await import('/runtime/search.ts' as string),{IndexedDBStorageDriver}=await import('/runtime/storage.ts' as string);
  const l=new ManifestLoader([{releaseId:w.pins.releaseId,digest:w.pins.releaseDigest}]),t=performance.now(),release=await l.loadFromData(w.release,w.pins.releaseDigest),e=await SearchEngine.open({pins:w.pins,releaseLoader:l,release,manifestBytes:w.manifest,loadShard:async(m:any)=>w.shards[m.shard_id],live:async()=>true}),ingestion=performance.now()-t;
  try{const times:number[]=[];for(let i=0;i<25;i++){const start=performance.now(),r=await e.query({text:'energy',facets:{subject:['PHYSICS']},limit:20});if(r.totalMatches!==3334||r.results.length!==20)throw Error('WRONG_COUNT');times.push(performance.now()-start);}times.sort((a,b)=>a-b);
   const driver=new IndexedDBStorageDriver({dbName:'a38-perf-'+Date.now()}),start=performance.now();
   await driver.transaction(['a38_bench'],'readwrite',async(tx:any)=>{for(let i=0;i<500;i++)await tx.put('a38_bench','row:'+i,{i});});const writes=performance.now()-start,count=(await driver.getAll('a38_bench')).length;await driver.close();
   return {records:10000,ingestionMs:ingestion,p95Ms:times[Math.ceil(times.length*.95)-1],samples:25,indexedDBBatchWrites:count,indexedDBBatchMs:writes};
  }finally{e.close();}
 },w);
 assert(workers>0);assert.equal(metrics.indexedDBBatchWrites,500);assert(metrics.p95Ms<200);assert(metrics.ingestionMs<30000);console.log('A38 synthetic scale receipt',JSON.stringify(metrics));
 }finally{await browser.close();await server.close();}
});
