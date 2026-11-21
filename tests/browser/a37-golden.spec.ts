import {it} from 'node:test';
import assert from 'node:assert/strict';
import {chromium} from 'playwright-core';
import {createServer} from 'vite';
import {searchFixture} from '../fixtures/search-wire.ts';
it('A37 Golden actual shared-store QRT/search/source/transfer/return/reattempt/progress/backup journey',{timeout:60000},async()=>{
 const wire=searchFixture().actual,server=await createServer({server:{host:'127.0.0.1',port:0,strictPort:true}});await server.listen();const addr=server.httpServer!.address();assert(addr&&typeof addr!=='string');
 const browser=await chromium.launch({headless:true});try{
  const page=await browser.newPage({viewport:{width:1600,height:1000}}),origin='http://127.0.0.1:'+addr.port,requests:string[]=[],responses:number[]=[];
  page.on('request',r=>{if(r.url().startsWith(origin+'/'))requests.push(r.url());});page.on('response',r=>{if(r.url().startsWith(origin+'/'))responses.push(r.status());});
  await page.goto(origin+'/test-host.html');
  await page.evaluate(async({wire,path})=>{const {mountGolden}=await import(path);(window as any).golden=await mountGolden(document.getElementById('app')!,wire,'golden-'+Date.now());},{wire,path:'/ @fs/'.replace(' ','')+process.cwd()+'/tests/fixtures/a37-golden.ts'});
  await page.locator('[data-coord="APPLY:D2"]').click();await page.getByRole('button',{name:'Open main question'}).click();await page.getByText('Source question',{exact:true}).waitFor();
  await page.evaluate(()=> (window as any).golden.openSearch());
  await page.locator('[data-search]').fill('energy');await page.locator('[data-action=search]').click();await page.locator('[data-action=open-question]').click();
  await page.getByText('Source question',{exact:true}).waitFor();await page.getByLabel('Choose response').selectOption('A');await page.locator('[data-golden=source-commit]').click();await page.getByText('Source result: INCORRECT').waitFor();
  const original=await page.evaluate(async()=>{const {x,originalId}= (window as any).golden;return x.progress.committedAttempt(x.f.os.id,originalId);});assert(original);
  await page.locator('[data-golden=recovery]').click();await page.locator('[data-action=predict]').waitFor();
  const absent=async(...strings:string[])=>{const html=await page.content();for(const s of strings)assert(!html.includes(s),s+' leaked');};
  await absent('REVIEWED_FIRST_REFERENCE','REVIEWED_BOUNDARY_STIMULUS','REVIEWED_BOUNDARY_REFERENCE','SECRET_EMBEDDED');
  await page.locator('select').selectOption('0');await page.locator('[data-action=predict]').click();await page.locator('[data-field=a]').fill('7');await page.locator('[data-field=b]').fill('Independent response');await page.locator('[data-field=working]').fill('Independent work');
  for(const [width,height] of [[1600,1000],[1000,1600],[390,844]]){await page.setViewportSize({width,height});const v=await page.evaluate(()=>({overflow:document.documentElement.scrollWidth>innerWidth,targets:[...document.querySelectorAll('.g9-w9 button,.g9-w9 input:not([type=hidden]),.g9-w9 textarea')].every(n=>{const r=n.getBoundingClientRect();return r.width>=48&&r.height>=48;})}));assert.deepEqual(v,{overflow:false,targets:true});assert.equal(await page.locator('[data-field=a]').inputValue(),'7');}
  await page.locator('[data-action=hint]').click();await page.getByText('REVIEWED_HINT_ONE',{exact:true}).waitFor();await absent('REVIEWED_FIRST_REFERENCE','REVIEWED_BOUNDARY_STIMULUS');
  await page.locator('[data-action=commit]').click();await page.getByText('REVIEWED_FIRST_REFERENCE',{exact:true}).waitFor();await absent('REVIEWED_BOUNDARY_STIMULUS');
  await page.locator('textarea').nth(0).fill('Comparison one');await page.locator('textarea').nth(1).fill('Comparison two');await page.locator('[data-action=compare]').click();await page.locator('[data-action=diagnose]').waitFor();
  await page.locator('select').selectOption('2');await page.locator('textarea').fill('Learner diagnosis');await page.locator('[data-action=diagnose]').click();await page.locator('[data-action=repair]').waitFor();
  await page.locator('textarea').nth(0).fill('Repair reasoning');await page.locator('textarea').nth(1).fill('Repair work');await page.locator('[data-action=repair]').click();await page.getByText('REVIEWED_BOUNDARY_STIMULUS',{exact:true}).waitFor();await absent('REVIEWED_FIRST_REFERENCE','REVIEWED_BOUNDARY_REFERENCE');
  await page.locator('[data-field=c]').fill('8');await page.locator('[data-field=working]').fill('Separate boundary work');await page.locator('[data-action=commit]').click();await page.locator('[data-action=boundary-feedback]').waitFor();await absent('REVIEWED_BOUNDARY_REFERENCE');
  await page.locator('[data-action=boundary-feedback]').click();await page.getByText('REVIEWED_BOUNDARY_REFERENCE',{exact:true}).waitFor();await page.locator('[data-action=return-source]').click();await page.getByText(/Source return recorded/).waitFor();await page.locator('[data-action=open-source]').click();await page.getByText('Synthetic returned source at original cursor',{exact:true}).waitFor();await page.locator('[data-golden=retry]').click();await page.getByText('Source reattempt',{exact:true}).waitFor();await page.getByLabel('Choose response').selectOption('B');await page.locator('[data-golden=source-commit]').click();await page.getByText('Source result: CORRECT').waitFor();
  const snapshot=await page.evaluate(()=> (window as any).golden.snapshot());
  assert.deepEqual(snapshot.original,original);assert.equal(snapshot.retry.grade.reasonCode,'CORRECT_CHOICE');assert.notEqual(snapshot.retry.sessionId,original.sessionId);assert.deepEqual(snapshot.retry.item,original.item);assert.equal(snapshot.count,6);
  assert.deepEqual(snapshot.events,['PREDICTION_COMMITTED','HELP_EXPOSED','FIRST_COMMITTED','RECONSTRUCTION_COMMITTED','DIAGNOSIS_COMMITTED','REPAIR_COMMITTED','BOUNDARY_COMMITTED','BOUNDARY_FEEDBACK_VIEWED','SOURCE_RETURNED']);
  assert.equal(snapshot.checkpoint.sequence,9);assert.equal(snapshot.origin.cursor,7);assert.equal(snapshot.origin.sessionId,original.sessionId);assert.deepEqual(snapshot.origin.ref,original.item);
  await page.locator('[data-golden=personal]').click();await page.getByText('ASSISTED: 1',{exact:true}).waitFor();await page.getByText('REPAIR: 1',{exact:true}).waitFor();await page.getByText('BOUNDARY CHECK: 1',{exact:true}).waitFor();await page.getByText('ORDINARY ATTEMPT: 4',{exact:true}).waitFor();
  await page.locator('[data-tab=mistakes]').click();await page.getByText('INCORRECT_CHOICE',{exact:true}).waitFor();await page.getByText('Repair recorded — correctness not inferred.').waitFor();
  const backup=await page.evaluate(()=> (window as any).golden.backup());assert.deepEqual(backup.receipt,{attempts:6,journeys:1});assert.equal(backup.historical,6);assert.equal(backup.verified,false);assert.deepEqual(backup.original,original);
  const routed=await page.evaluate(()=> (window as any).golden.routed);assert(routed.includes('/search'));assert(routed.includes('/question/demo%3Aq%3A001'));assert(routed.some((p:string)=>p.startsWith('/role/CORE2B/')));assert(routed.some((p:string)=>p.startsWith('/role/CORE2/')));
  assert(requests.length>10);assert(responses.some(s=>s===200));assert(requests.some(u=>u.includes('/runtime/search-worker.ts')));assert(requests.some(u=>u.includes('/pages/wave9-workspace.ts')));
  console.log('A37 Golden executed receipt',JSON.stringify({events:snapshot.events.length,attempts:snapshot.count,restoredHistorical:backup.historical,httpRequests:requests.length,viewports:3,sourceReattempt:'SCORED',academicAdmission:'HOLD'}));
 }finally{await browser.close();await server.close();}
});
