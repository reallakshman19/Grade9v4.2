import {it} from 'node:test';
import assert from 'node:assert/strict';
import {chromium} from 'playwright-core';
import {createServer} from 'vite';
it('W9-INT-03 actual Chromium: pinned routes, native slots, print hold, durable controls and rotation',{timeout:60000},async()=>{
 const server=await createServer({server:{host:'127.0.0.1',port:0,strictPort:true}});await server.listen();const addr=server.httpServer!.address();assert(addr&&typeof addr!=='string');
 const browser=await chromium.launch({headless:true});
 try{
  const page=await browser.newPage({viewport:{width:390,height:844}});await page.goto('http://127.0.0.1:'+addr.port+'/test-host.html');
  const fixturePath='/@fs/'+process.cwd()+'/tests/fixtures/wave9-synthetic.ts';
  const init=async(role:string)=>page.evaluate(async({fixturePath,role})=>{
   const {fixture}=await import(fixturePath);const {createWave9WorkspaceHost}=await import('/pages/wave9-workspace.ts' as string);const {Router}=await import('/app/router.ts' as string);
   const x=await fixture(role,role==='CORE2A'?'5':'4'),root=document.getElementById('app')!,router=new Router({basePath:'/grade9',useHash:true});
   const host=await createWave9WorkspaceHost(root,router,x.c,x.digest,{driver:x.f.driver,progress:x.progress,live:x.live,load:x.load,engine:x.f.binding.engine,definition:x.f.definition});
   (window as any).w9={x,host,router};return {rejected:!await host.open('/grade9/#/role/CORE2B/foreign'),opened:await host.open(host.href()),href:host.href()};
  },{fixturePath,role});
  assert.deepEqual(await init('CORE1'),{rejected:true,opened:true,href:'/grade9/#/role/CORE1/resource%3Awave9%3Acore1'});
  assert.equal(await page.locator('[data-slot=identity] h3').count(),2);assert.equal(await page.locator('[data-slot=orientation] h3').count(),7);
  const download=page.waitForEvent('download');await page.locator('[data-action=print-pdf]').click();assert.equal((await download).suggestedFilename(),'reviewed-orientation.pdf');
  await page.emulateMedia({media:'print'});assert.equal(await page.locator('[data-protected]').first().isVisible(),false);assert.equal(await page.locator('.w9-print-notice').isVisible(),true);await page.emulateMedia({media:'screen'});
  assert.equal((await init('CORE2A')).opened,true);
  assert(!await page.locator('body').innerText().then(s=>s.includes('SYNTHETIC_REVIEWED_CRUX')||s.includes('Qualified typed check passed')));
  await page.locator('textarea').fill('Initial prediction');await page.locator('[data-action=practice-predict]').click();await page.locator('[data-field=a]').waitFor();
  await page.locator('[data-field=a]').fill('7');await page.locator('[data-field=b]').fill('Practice reasoning');await page.locator('[data-field=working]').fill('Practice work');
  await page.locator('[data-presentation]').selectOption('1');await page.locator('[data-action=presentation]').click();await page.getByText('सिंथेटिक प्रस्तुति',{exact:true}).waitFor();assert.equal(await page.locator('[data-field=b]').inputValue(),'Practice reasoning');
  await page.locator('[data-presentation]').selectOption('2');await page.locator('[data-action=presentation]').click();await page.getByText('Synthetic intuition',{exact:true}).waitFor();assert.equal(await page.locator('[data-field=working]').inputValue(),'Practice work');
  await page.locator('[data-action=practice-hint]').click();await page.getByText('REVIEWED_HINT_ONE',{exact:true}).waitFor();assert.equal(await page.locator('[data-field=b]').inputValue(),'Practice reasoning');
  await page.locator('[data-action=practice-save]').click();await page.waitForFunction(()=>!(document.querySelector('[data-action=practice-save]') as HTMLButtonElement)?.disabled);
  await page.locator('[data-field=working]').fill('Edited practice work');
  await page.locator('[data-action=practice-commit]').click();await page.getByText('SYNTHETIC_REVIEWED_CRUX',{exact:true}).waitFor();assert.match(await page.locator('[data-slot=reasoning]').innerText(),/Qualified typed check diverged/);
  await page.locator('textarea').nth(0).fill('comparison one');await page.locator('textarea').nth(1).fill('comparison two');await page.locator('[data-action=practice-compare]').click();await page.locator('[data-action=practice-diagnose]').waitFor();
  await page.getByLabel('Divergence').selectOption('2');await page.locator('textarea').fill('Review mismatch');await page.locator('[data-action=practice-diagnose]').click();await page.locator('[data-action=practice-repair]').waitFor();
  await page.locator('textarea').nth(0).fill('Repair explanation');await page.locator('textarea').nth(1).fill('New practice working');await page.locator('[data-action=practice-repair]').click();await page.getByText('REVIEWED_BOUNDARY_STIMULUS',{exact:true}).waitFor();
  assert(!await page.locator('body').innerText().then(s=>s.includes('REVIEWED_FIRST_REFERENCE')||s.includes('SYNTHETIC_REVIEWED_CRUX')||s.includes('REVIEWED_BOUNDARY_REFERENCE')));
  await page.locator('[data-field=c]').fill('8');await page.locator('[data-field=working]').fill('Independent practice boundary work');
  const pad=page.locator('[data-ink]');await pad.scrollIntoViewIfNeeded();const rect=await pad.boundingBox();assert(rect);await page.mouse.move(rect.x+rect.width*.2,rect.y+rect.height*.2);await page.mouse.down();await page.mouse.move(rect.x+rect.width*.6,rect.y+rect.height*.6,{steps:5});await page.mouse.up();assert.equal(await pad.locator('polyline').count(),1);
  await page.locator('[data-action=practice-boundary-save]').click();await page.waitForFunction(()=>!(document.querySelector('[data-action=practice-boundary-save]') as HTMLButtonElement)?.disabled);assert.equal(await page.locator('[data-ink] polyline').count(),1);
  await page.locator('[data-action=practice-boundary-commit]').click();await page.locator('[data-action=practice-boundary-feedback]').waitFor();assert(!await page.locator('body').innerText().then(s=>s.includes('REVIEWED_BOUNDARY_REFERENCE')));
  await page.locator('[data-action=practice-boundary-feedback]').click();await page.getByText('REVIEWED_BOUNDARY_REFERENCE',{exact:true}).waitFor();
  assert.equal(await page.evaluate(async()=>{const {x}=(window as any).w9;const a=await x.f.driver.getAll('attempts');return a.filter((v:any)=>v.sessionId===x.f.bs.id&&v.work.some((w:any)=>w.kind==='INK')).length;}),1);
  assert.equal((await init('CORE2B')).opened,true);assert(!await page.locator('body').innerText().then(s=>s.includes('REVIEWED_FIRST_REFERENCE')||s.includes('REVIEWED_BOUNDARY_STIMULUS')||s.includes('SECRET')));
  await page.locator('select').selectOption('0');await page.locator('[data-action=predict]').click();await page.locator('[data-field=a]').waitFor();
  await page.locator('[data-field=a]').fill('7');await page.locator('[data-field=b]').fill('independent reasoning');await page.locator('[data-field=working]').fill('separate working');
  for(const [width,height] of [[390,844],[768,1024],[1024,768],[1366,768],[820,1180],[1180,820],[360,640]]){
   await page.setViewportSize({width,height});const m=await page.evaluate(()=>({overflow:document.documentElement.scrollWidth>innerWidth,targets:[...document.querySelectorAll('.g9-w9 button,.g9-w9 input:not([type=hidden]),.g9-w9 textarea')].every(n=>{const r=n.getBoundingClientRect();return r.height>=48&&r.width>=48;})}));assert.equal(m.overflow,false);assert.equal(m.targets,true);assert.equal(await page.locator('[data-field=a]').inputValue(),'7');
  }
  await page.locator('[data-action=save]').click();await page.waitForFunction(()=>!(document.querySelector('[data-action=save]') as HTMLButtonElement)?.disabled);assert.equal(await page.locator('[data-field=b]').inputValue(),'independent reasoning');
  await page.locator('[data-action=hint]').click();await page.getByText('REVIEWED_HINT_ONE',{exact:true}).waitFor();
  await page.locator('[data-action=commit]').click();await page.getByText('REVIEWED_FIRST_REFERENCE',{exact:true}).waitFor();assert(!await page.locator('body').innerText().then(s=>s.includes('REVIEWED_BOUNDARY_STIMULUS')));
  await page.locator('textarea').nth(0).fill('comparison one');await page.locator('textarea').nth(1).fill('comparison two');await page.locator('[data-action=compare]').click();await page.locator('[data-action=diagnose]').waitFor();
  await page.locator('select').selectOption('2');await page.locator('textarea').fill('check divergence');await page.locator('[data-action=diagnose]').click();await page.locator('[data-action=repair]').waitFor();
  await page.locator('textarea').nth(0).fill('repair explanation');await page.locator('textarea').nth(1).fill('repair working');await page.locator('[data-action=repair]').click();await page.getByText('REVIEWED_BOUNDARY_STIMULUS',{exact:true}).waitFor();
  await page.locator('[data-field=c]').fill('8');await page.locator('[data-field=working]').fill('boundary working');await page.locator('[data-action=commit]').click();await page.locator('[data-action=boundary-feedback]').waitFor();assert(!await page.locator('body').innerText().then(s=>s.includes('REVIEWED_BOUNDARY_REFERENCE')));
  await page.locator('[data-action=boundary-feedback]').click();await page.getByText('REVIEWED_BOUNDARY_REFERENCE',{exact:true}).waitFor();await page.locator('[data-action=return-source]').click();await page.getByText(/Source return recorded/).waitFor();await page.locator('[data-action=open-source]').click();await page.getByText('Synthetic returned source at original cursor',{exact:true}).waitFor();assert.equal(await page.evaluate(()=> (window as any).w9.router.getCurrent().params.resourceId),'resource:synthetic:origin');
  assert.equal(await page.evaluate(async()=>{const {x}=(window as any).w9;return (await x.f.driver.getAll('attempts')).length;}),4);
  assert.equal(await page.evaluate(async()=>{const {x,host}=(window as any).w9;x.revoke();return host.open(host.href());}),false);assert.equal(await page.locator('[data-protected]').count(),0);
   await page.evaluate(async()=>{const {structuredResponseEditor}=await import('/components/wave9-structured-editors.ts' as string);const root=document.getElementById('app')!;root.replaceChildren();const graph=structuredResponseEditor(root,'g','GRAPH'),table=structuredResponseEditor(root,'t','DATA_TABLE'),chem=structuredResponseEditor(root,'c','CHEMICAL_STRUCTURE'),mechanism=structuredResponseEditor(root,'m','REACTION_MECHANISM'),experiment=structuredResponseEditor(root,'e','EXPERIMENT_ANALYSIS');(window as any).readEditors=()=>[graph(),table(),chem(),mechanism(),experiment()];});
  const graph=page.locator('[data-editor=GRAPH]');await graph.getByLabel('Row 1 x').fill('0');await graph.getByLabel('Row 1 y').fill('2');await graph.getByRole('button',{name:'Add row'}).click();await graph.getByLabel('Row 2 x').fill('1');await graph.getByLabel('Row 2 y').fill('4');assert.equal(await graph.locator('circle').count(),2);
  const table=page.locator('[data-editor=DATA_TABLE]');await table.getByLabel('Row 1 column 1').fill('10');await table.getByRole('button',{name:'Add row'}).click();await table.getByLabel('Row 2 column 2').fill('20');
  const chem=page.locator('[data-editor=CHEMICAL_STRUCTURE]');await chem.getByLabel('Structure format').fill('FORMULA');await chem.getByLabel('Structure notation').fill('H2O');
  await page.locator('[data-editor=REACTION_MECHANISM]').getByLabel('Step 1').fill('step');
  const exp=page.locator('[data-editor=EXPERIMENT_ANALYSIS]');await exp.getByLabel('Observation 1').fill('Observed');await exp.getByLabel('Conclusion').fill('Conclusion');
  assert.deepEqual(await page.evaluate(()=> (window as any).readEditors()),[{kind:'GRAPH',value:{points:[['0','2'],['1','4']]}},{kind:'DATA_TABLE',value:[['10',null],[null,'20']]},{kind:'CHEMICAL_STRUCTURE',value:{format:'FORMULA',data:'H2O'}},{kind:'REACTION_MECHANISM',value:['step']},{kind:'EXPERIMENT_ANALYSIS',value:{observations:['Observed'],conclusion:'Conclusion'}}]);
 }finally{await browser.close();await server.close();}
});

it('W9-INT-06 two actual Chromium tabs: one CAS commit, stale reader denied, restored state and revocation',{timeout:60000},async()=>{
 const server=await createServer({server:{host:'127.0.0.1',port:0,strictPort:true}});await server.listen();const addr=server.httpServer!.address();assert(addr&&typeof addr!=='string');
 const browser=await chromium.launch({headless:true});try{
  const ctx=await browser.newContext(),one=await ctx.newPage(),two=await ctx.newPage(),url='http://127.0.0.1:'+addr.port+'/',name='w9-cross-tab-'+Date.now(),path='/@fs/'+process.cwd()+'/tests/fixtures/wave9-synthetic.ts';
  await one.goto(url+'test-host.html');await two.goto(url+'test-host.html');
  const prepare=(page:typeof one,initialize:boolean)=>page.evaluate(async({path,name,initialize})=>{
   const {fixture}=await import(path),{IndexedDBStorageDriver}=await import('/runtime/storage.ts' as string),{SupportedPracticeWorkspace}=await import('/journeys/supported-practice.ts' as string);
   const driver=new IndexedDBStorageDriver({dbName:name}),x=await fixture('CORE2A','5',driver,initialize),a=await x.compose(),p=new SupportedPracticeWorkspace(a.controller,x.progress,x.f.binding.engine,x.f.binding.assessmentA,x.load,{driver,sessionId:x.f.bs.id,assessment:x.f.binding.assessmentB});
   (window as any).cross={x,a,p,driver};if(initialize){const cp=(await a.controller.begin()).checkpoint;await p.predict(cp,'prediction');}
   return (await a.controller.readEvidence()).snapshot.checkpoint;
  },{path,name,initialize});
  const first=await prepare(one,true),second=await prepare(two,false);assert.deepEqual(first,second);
  const save=await one.evaluate(async cp=>{const {p}=(window as any).cross;return p.save(cp,{a:{kind:'INTEGER',value:'7'},b:{kind:'CONSTRUCTED_RESPONSE',value:'work'}},[{id:'work:cross:one',kind:'NOTE',version:1,value:'one'}],0);},first);assert.equal(save.revision,1);
  const stale=await two.evaluate(async cp=>{const {p}=(window as any).cross;try{await p.save(cp,{a:{kind:'INTEGER',value:'7'},b:{kind:'CONSTRUCTED_RESPONSE',value:'work'}},[{id:'work:cross:two',kind:'NOTE',version:1,value:'two'}],0);return false;}catch{return true;}},second);assert.equal(stale,true);
  const commit=(page:typeof one)=>page.evaluate(async cp=>{const {p}=(window as any).cross;try{const d=await p.draft(cp);await p.commit(cp,d.responses,d.work,d.revision);return true;}catch{return false;}},first);
  const outcomes=await Promise.all([commit(one),commit(two)]);assert.equal(outcomes.filter(Boolean).length,1);
  const result=await two.evaluate(async cp=>{const {a,x,driver}=(window as any).cross;const before=await a.feedback.readFirstReference(cp),fresh=await a.controller.readEvidence(),text=await a.feedback.readFirstReference(fresh.snapshot.checkpoint),n=(await driver.getAll('attempts')).filter((v:any)=>v.sessionId===x.f.as.id).length;x.revoke();return {before,text,n,revoked:await a.feedback.readFirstReference(fresh.snapshot.checkpoint)};},first);
  assert.deepEqual(result,{before:null,text:'REVIEWED_FIRST_REFERENCE',n:1,revoked:null});
  for(const p of [one,two])await p.evaluate(async()=>{await (window as any).cross.driver.close();});
 }finally{await browser.close();await server.close();}
});
