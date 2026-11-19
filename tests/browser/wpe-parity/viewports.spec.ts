import {it} from 'node:test';
import assert from 'node:assert/strict';
import {chromium} from 'playwright-core';
import {createServer} from 'vite';
it('A54 actual transfer DOM across seven canonical viewports, durable save reload and revocation',{timeout:60000},async()=>{
 const server=await createServer({server:{host:'127.0.0.1',port:0,strictPort:true}});await server.listen();const addr=server.httpServer!.address();assert(addr&&typeof addr!=='string');const browser=await chromium.launch({headless:true});
 try{
  const page=await browser.newPage(),url='http://127.0.0.1:'+addr.port+'/',path='/@fs/'+process.cwd()+'/tests/fixtures/wave9-synthetic.ts',name='a54-'+Date.now();
  await page.goto(url);
  const init=(initialize:boolean)=>page.evaluate(async({path,name,initialize})=>{
   const {fixture}=await import(path),{IndexedDBStorageDriver}=await import('/runtime/storage.ts' as string),{createWave9WorkspaceHost}=await import('/pages/wave9-workspace.ts' as string),{Router}=await import('/app/router.ts' as string);
   const driver=new IndexedDBStorageDriver({dbName:name}),x=await fixture('CORE2B','4',driver,initialize),a=await x.compose();
   const host=await createWave9WorkspaceHost(document.getElementById('app')!,new Router(),x.c,x.digest,{driver,progress:x.progress,live:x.live,load:x.load,engine:x.f.binding.engine,definition:x.f.definition});
   (window as any).a54={x,a,host,driver};return host.open(host.href());
  },{path,name,initialize});
  assert(await init(true));await page.locator('select').selectOption('0');await page.locator('[data-action=predict]').click();await page.locator('[data-field=a]').fill('7');await page.locator('[data-field=b]').fill('Independent response');await page.locator('[data-field=working]').fill('Durable working');
  let controls=0;for(const [width,height] of [[1366,854],[854,1366],[1000,1600],[1600,1000],[800,1280],[1280,800],[390,844]]){
   await page.setViewportSize({width,height});const r=await page.evaluate(()=>{const nodes=[...document.querySelectorAll('.g9-w9 button,.g9-w9 input:not([type=hidden]),.g9-w9 textarea,.g9-w9 select')];return {overflow:document.documentElement.scrollWidth>innerWidth,count:nodes.length,targets:nodes.every(n=>{const r=n.getBoundingClientRect();return r.width>=48&&r.height>=48;})};});assert(!r.overflow&&r.targets&&r.count>0);controls+=r.count;
   assert.equal(await page.locator('[data-field=working]').inputValue(),'Durable working');assert(!/REVIEWED_FIRST_REFERENCE|REVIEWED_BOUNDARY_STIMULUS|REVIEWED_BOUNDARY_REFERENCE|SECRET_EMBEDDED/.test(await page.content()));
  }
  await page.locator('[data-action=save]').click();await page.waitForFunction(()=>!(document.querySelector('[data-action=save]') as HTMLButtonElement)?.disabled);
  await page.evaluate(async()=>{await (window as any).a54.driver.close();});await page.reload();assert(await init(false));
  await page.locator('[data-field=working]').waitFor();assert.equal(await page.locator('[data-field=working]').inputValue(),'Durable working');
  await page.locator('[data-action=commit]').click();await page.getByText('REVIEWED_FIRST_REFERENCE',{exact:true}).waitFor();
  const evidence=await page.evaluate(async()=>{const {a,x}= (window as any).a54;const e=await a.controller.readEvidence();x.revoke();return {attempts:e.attempts.length,stage:e.snapshot.stage};});assert.equal(evidence.attempts,1);
  await page.evaluate(async()=>{const {host}= (window as any).a54;await host.open(host.href());});assert.equal(await page.locator('[data-protected]').count(),0);
  console.log('A54 actual rendered transfer: '+JSON.stringify({viewports:7,controlObservations:controls,durableReload:true,precommitDOMDisclosure:false}));
 }finally{await browser.close();await server.close();}
});
