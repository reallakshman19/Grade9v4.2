import {it} from 'node:test';
import assert from 'node:assert/strict';
import {chromium} from 'playwright-core';
import {createServer} from 'vite';
it('A36 Chromium personal pages, actual IndexedDB CAS, reload, responsive controls and backup export',{timeout:60000},async()=>{
 const server=await createServer({server:{host:'127.0.0.1',port:0,strictPort:true}});await server.listen();const addr=server.httpServer!.address();assert(addr&&typeof addr!=='string');const browser=await chromium.launch({headless:true});
 try{
  const context=await browser.newContext(),page=await context.newPage(),other=await context.newPage(),url='http://127.0.0.1:'+addr.port+'/',path='/@fs/'+process.cwd()+'/tests/fixtures/a36-synthetic.ts',db='a36-'+Date.now();
  await page.goto(url);await other.goto(url);
  await page.evaluate(async({path,db})=>{const {personalFixture}=await import(path),{IndexedDBStorageDriver}=await import('/runtime/storage.ts' as string),{createPersonalStudyHost}=await import('/pages/personal-study.ts' as string),{Router}=await import('/app/router.ts' as string);const driver=new IndexedDBStorageDriver({dbName:db}),f=await personalFixture(driver),s=await f.open(),router=new Router(),host=createPersonalStudyHost(document.getElementById('app')!,s,router);(window as any).a36={f,s,host,driver};await host.open();},{path,db});
  await page.getByText('ASSISTED: 1',{exact:true}).waitFor();await page.getByText('REPAIR: 1',{exact:true}).waitFor();
  await page.locator('[data-tab=mistakes]').click();await page.getByText('INCORRECT_INTEGER',{exact:true}).waitFor();await page.getByText('Repair recorded — correctness not inferred.').waitFor();
  await page.locator('[data-tab=bookmarks]').click();await page.locator('[data-action=bookmark-add]').click();await page.locator('textarea').waitFor();await page.locator('textarea').fill('my private note <img src=x>');await page.locator('[data-action=bookmark-save]').click();await page.waitForFunction(()=>!(document.querySelector('[data-action=bookmark-save]') as HTMLButtonElement)?.disabled);assert.equal(await page.locator('textarea').inputValue(),'my private note <img src=x>');assert.equal(await page.locator('.g9-personal img').count(),0);
  await page.locator('[data-tab=settings]').click();await page.getByText(/INDEXEDDB · WRITABLE/).waitFor();await page.locator('[data-action=font-up]').click();await page.getByText('Text scale: 1.05').waitFor();
  const stale=await other.evaluate(async({path,db})=>{const {personalFixture}=await import(path),{IndexedDBStorageDriver}=await import('/runtime/storage.ts' as string);const driver=new IndexedDBStorageDriver({dbName:db}),f=await personalFixture(driver,false),s=await f.open();const p=await s.profile();let rejected=false;try{await s.setFontStep(p.revision-1,20);}catch{rejected=true;}await driver.close();return {rejected,font:p.fontStep,notes:p.bookmarks[0].notes};},{path,db});
  assert.deepEqual(stale,{rejected:true,font:21,notes:'my private note <img src=x>'});
  for(const [width,height] of [[360,640],[390,844],[768,1024],[1024,768],[1366,768],[820,1180],[1180,820]]){await page.setViewportSize({width,height});assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);assert.equal(await page.evaluate(()=>Array.from(document.querySelectorAll('.g9-personal button')).every(n=>{const r=n.getBoundingClientRect();return r.width>=48&&r.height>=48;})),true);}
  const download=page.waitForEvent('download');await page.locator('[data-action=export-progress]').click();assert.equal((await download).suggestedFilename(),'grade9-progress.json');
  await page.locator('[data-tab=bookmarks]').click();await page.locator('textarea').waitFor();assert.equal(await page.locator('textarea').inputValue(),'my private note <img src=x>');
  await page.evaluate(()=>{(window as any).a36.f.revoke();});await page.locator('[data-action=bookmark-open]').click();await page.getByText(/Personal authorization unavailable/).waitFor();assert.equal(await page.locator('textarea').count(),0);
 }finally{await browser.close();await server.close();}
});
