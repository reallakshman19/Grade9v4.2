import {it} from 'node:test';
import assert from 'node:assert/strict';
import {chromium} from 'playwright-core';
import {createServer} from 'vite';
it('W9-INT-03 actual Chromium: pinned routes, native slots, print hold, durable controls and rotation',{timeout:60000},async()=>{
 const server=await createServer({server:{host:'127.0.0.1',port:0,strictPort:true}});await server.listen();const addr=server.httpServer!.address();assert(addr&&typeof addr!=='string');
 const browser=await chromium.launch({headless:true});
 try{
  const page=await browser.newPage({viewport:{width:390,height:844}});await page.goto('http://127.0.0.1:'+addr.port+'/');
  const fixturePath='/@fs/'+process.cwd()+'/tests/fixtures/wave9-synthetic.ts';
  const init=async(role:string)=>page.evaluate(async({fixturePath,role})=>{
   const {fixture}=await import(fixturePath);const {createWave9WorkspaceHost}=await import('/pages/wave9-workspace.ts' as string);const {Router}=await import('/app/router.ts' as string);
   const x=await fixture(role),root=document.getElementById('app')!,router=new Router({basePath:'/grade9',useHash:true});
   const host=await createWave9WorkspaceHost(root,router,x.c,x.digest,{driver:x.f.driver,progress:x.progress,live:x.live,load:x.load,engine:x.f.binding.engine,definition:x.f.definition});
   (window as any).w9={x,host,router};return {rejected:!await host.open('/grade9/#/role/CORE2B/foreign'),opened:await host.open(host.href()),href:host.href()};
  },{fixturePath,role});
  assert.deepEqual(await init('CORE1'),{rejected:true,opened:true,href:'/grade9/#/role/CORE1/resource%3Awave9%3Acore1'});
  assert.equal(await page.locator('[data-slot=identity] h3').count(),2);assert.equal(await page.locator('[data-slot=orientation] h3').count(),7);
  await page.emulateMedia({media:'print'});assert.equal(await page.locator('[data-protected]').first().isVisible(),false);assert.equal(await page.locator('.w9-print-notice').isVisible(),true);await page.emulateMedia({media:'screen'});
  assert.equal((await init('CORE2A')).opened,true);
  assert(!await page.locator('body').innerText().then(s=>s.includes('SYNTHETIC_REVIEWED_CRUX')||s.includes('Qualified typed check passed')));
  await page.locator('textarea').fill('Initial prediction');await page.locator('[data-action=practice-predict]').click();await page.locator('[data-field=a]').waitFor();
  await page.locator('[data-field=a]').fill('7');await page.locator('[data-field=b]').fill('Practice reasoning');await page.locator('[data-field=working]').fill('Practice work');
  await page.locator('[data-action=practice-hint]').click();await page.getByText('REVIEWED_HINT_ONE',{exact:true}).waitFor();assert.equal(await page.locator('[data-field=b]').inputValue(),'Practice reasoning');
  await page.locator('[data-action=practice-save]').click();await page.waitForFunction(()=>!(document.querySelector('[data-action=practice-save]') as HTMLButtonElement)?.disabled);
  await page.locator('[data-field=working]').fill('Edited practice work');
  await page.locator('[data-action=practice-commit]').click();await page.getByText('SYNTHETIC_REVIEWED_CRUX',{exact:true}).waitFor();assert.match(await page.locator('[data-slot=reasoning]').innerText(),/Qualified typed check passed/);
  assert.equal((await init('CORE2B')).opened,true);assert(!await page.locator('body').innerText().then(s=>s.includes('REVIEWED_FIRST_REFERENCE')||s.includes('REVIEWED_BOUNDARY_STIMULUS')||s.includes('SECRET')));
  await page.locator('select').selectOption('0');await page.locator('[data-action=predict]').click();await page.locator('[data-field=a]').waitFor();
  await page.locator('[data-field=a]').fill('7');await page.locator('[data-field=b]').fill('independent reasoning');await page.locator('[data-field=working]').fill('separate working');
  for(const [width,height] of [[390,844],[768,1024],[1024,768],[1366,768],[820,1180],[1180,820],[360,640]]){
   await page.setViewportSize({width,height});const m=await page.evaluate(()=>({overflow:document.documentElement.scrollWidth>innerWidth,targets:[...document.querySelectorAll('.g9-w9 button,.g9-w9 input,.g9-w9 textarea')].every(n=>{const r=n.getBoundingClientRect();return r.height>=48&&r.width>=48;})}));assert.equal(m.overflow,false);assert.equal(m.targets,true);assert.equal(await page.locator('[data-field=a]').inputValue(),'7');
  }
  await page.locator('[data-action=save]').click();await page.waitForFunction(()=>!(document.querySelector('[data-action=save]') as HTMLButtonElement)?.disabled);assert.equal(await page.locator('[data-field=b]').inputValue(),'independent reasoning');
  await page.locator('[data-action=hint]').click();await page.getByText('REVIEWED_HINT_ONE',{exact:true}).waitFor();
  await page.locator('[data-action=commit]').click();await page.getByText('REVIEWED_FIRST_REFERENCE',{exact:true}).waitFor();assert(!await page.locator('body').innerText().then(s=>s.includes('REVIEWED_BOUNDARY_STIMULUS')));
  await page.locator('textarea').nth(0).fill('comparison one');await page.locator('textarea').nth(1).fill('comparison two');await page.locator('[data-action=compare]').click();await page.locator('[data-action=diagnose]').waitFor();
  await page.locator('select').selectOption('2');await page.locator('textarea').fill('check divergence');await page.locator('[data-action=diagnose]').click();await page.locator('[data-action=repair]').waitFor();
  await page.locator('textarea').nth(0).fill('repair explanation');await page.locator('textarea').nth(1).fill('repair working');await page.locator('[data-action=repair]').click();await page.getByText('REVIEWED_BOUNDARY_STIMULUS',{exact:true}).waitFor();
  await page.locator('[data-field=c]').fill('8');await page.locator('[data-field=working]').fill('boundary working');await page.locator('[data-action=commit]').click();await page.locator('[data-action=boundary-feedback]').waitFor();assert(!await page.locator('body').innerText().then(s=>s.includes('REVIEWED_BOUNDARY_REFERENCE')));
  await page.locator('[data-action=boundary-feedback]').click();await page.getByText('REVIEWED_BOUNDARY_REFERENCE',{exact:true}).waitFor();await page.locator('[data-action=return-source]').click();await page.getByText(/Source return recorded/).waitFor();await page.locator('[data-action=open-source]').click();await page.getByText(/Authorized source route selected/).waitFor();assert.equal(await page.evaluate(()=> (window as any).w9.router.getCurrent().params.resourceId),'resource:synthetic:origin');
  assert.equal(await page.evaluate(async()=>{const {x}=(window as any).w9;return (await x.f.driver.getAll('attempts')).length;}),4);
  assert.equal(await page.evaluate(async()=>{const {x,host}=(window as any).w9;x.revoke();return host.open(host.href());}),false);assert.equal(await page.locator('[data-protected]').count(),0);
 }finally{await browser.close();await server.close();}
});
