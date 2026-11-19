
import {it} from 'node:test';
import assert from 'node:assert/strict';
import {chromium} from 'playwright-core';
import {createServer} from 'vite';
const sizes=[[1366,854],[854,1366],[1000,1600],[1600,1000],[800,1280],[1280,800],[390,844]];
function geometry(root:string){
 const view=document.querySelector(root)!;
 const slots=[...view.querySelectorAll<HTMLElement>('[data-slot]')].map(n=>({slot:n.dataset.slot!,rect:n.getBoundingClientRect().toJSON()}));
 const controls=[...view.querySelectorAll<HTMLElement>('button,input:not([type=hidden]),textarea,select')].filter(n=>n.getClientRects().length>0);
 return {slots,overflow:document.documentElement.scrollWidth>innerWidth,controls:controls.length,undersized:controls.filter(n=>{const r=n.getBoundingClientRect();return r.width<48||r.height<48;}).map(n=>n.outerHTML.slice(0,140))};
}
it('A73 mounted Core1A single-pane diagnostic: nine section actions, anchors, parameters and depth across seven viewport sizes',{timeout:60000},async()=>{
 const server=await createServer({server:{host:'127.0.0.1',port:0,strictPort:true}});await server.listen();const addr=server.httpServer!.address();assert(addr&&typeof addr!=='string');const browser=await chromium.launch({headless:true});
 try{
 const page=await browser.newPage();await page.goto('http://127.0.0.1:'+addr.port+'/');
 await page.evaluate(async path=>{const {lesson}=await import(path),{Core1ALessonPageController,mountCore1ALesson}=await import('/pages/lesson.ts' as string);const c=new Core1ALessonPageController({lessonDefinition:lesson()});const mount=mountCore1ALesson(document.getElementById('app')!,c);(window as any).a73={c,mount};},'/@fs/'+process.cwd()+'/tests/fixtures/wave8-synthetic.ts');
 for(let i=1;i<=9;i++){await page.locator('button[data-role=A'+i+']').click();assert.equal(await page.locator('.g9-unit-view').getAttribute('data-role'),'A'+i);}
 await page.locator('button[data-level=ADVANCED]').click();assert.equal(await page.locator('.g9-anchors-component h3').first().textContent(),'ADVANCED');
 await page.locator('button[data-depth=HARD]').click();await page.locator('input[name=prediction]').nth(1).check();await page.locator('[data-parameter=x]').fill('0.25');
 let count=0;
 for(const [width,height] of sizes){await page.setViewportSize({width,height});const g=await page.evaluate(geometry,'.g9-lesson-page');assert(!g.overflow,JSON.stringify(g));assert.deepEqual(g.undersized,[]);assert.deepEqual(g.slots.map(s=>s.slot),['identity','construction','repair_closure']);assert(g.slots.slice(1).every((s,i)=>s.rect.top>=g.slots[i]!.rect.bottom&&Math.abs(s.rect.width-g.slots[i]!.rect.width)<1));count+=g.controls;assert.equal(await page.locator('[data-parameter=x]').inputValue(),'0.25');await page.locator('button[data-role=A9]').click({trial:true});}
 const draft=await page.evaluate(()=> (window as any).a73.c.toDraft());assert.equal(draft.modelPredictionIndex,1);assert.equal(draft.modelParameters.x,.25);assert.equal(draft.depthView,'HARD');assert.deepEqual(draft.completedRoles,[]);assert(!/SECRET_/.test(await page.content()));
 await page.evaluate(()=> (window as any).a73.mount.dispose());assert.equal(await page.locator('.g9-lesson-page').count(),0);
 console.log('A73 Core1A mounted diagnostic: '+JSON.stringify({viewports:7,controlObservations:count,visited:9,scope:'LOCAL_UNREVIEWED'}));
 }finally{await browser.close();await server.close();}
});
it('A73 mounted Explorer context, local route, responsive stage/support geometry and replay',{timeout:60000},async()=>{
 const server=await createServer({server:{host:'127.0.0.1',port:0,strictPort:true}});await server.listen();const addr=server.httpServer!.address();assert(addr&&typeof addr!=='string');const browser=await chromium.launch({headless:true});
 try{
 const page=await browser.newPage();await page.goto('http://127.0.0.1:'+addr.port+'/');
 await page.evaluate(async()=>{const {GcdrExplorerPageController,mountGcdrExplorer}=await import('/pages/explorer.ts' as string);const config={explorerId:'a73-local',title:'Synthetic exploration',subject:'Physics',topic:'WPE',helpers:{exactnessBadge:{fidelity:'NUMERICAL_EXACT',binding:'CANONICAL_BINDING',academicClaimDisclaimer:'PROTECTED_FALSE_CLAIM'},chalkboardNote:'PROTECTED_HELPER'}};const c=new GcdrExplorerPageController(config);const mount=mountGcdrExplorer(document.getElementById('app')!,c);(window as any).a73={c,mount,config};});
 assert.equal(await page.locator('.gcdr-context-step').getAttribute('aria-current'),'step');assert.equal(await page.locator('#gcdr-stage-input').count(),0);await page.locator('#gcdr-context-start').click();
 await page.locator('#gcdr-advance-stage-btn').click();assert.match(await page.locator('[data-gcdr-status]').innerText(),/nonempty/);
 await page.locator('#gcdr-stage-input').fill('Independent prediction');await page.locator('#gcdr-advance-stage-btn').click();assert.equal(await page.locator('.gcdr-stage-step.active').getAttribute('data-stage'),'MANIPULATE');
 await page.locator('#gcdr-stage-input').fill('Manipulation evidence');await page.locator('#gcdr-advance-stage-btn').click();assert.match(await page.locator('[data-gcdr-status]').innerText(),/changed model parameter/);await page.locator('#gcdr-parameter-x').fill('0.25');
 let count=0;
 for(const [width,height] of sizes){await page.setViewportSize({width,height});const g=await page.evaluate(geometry,'.gcdr-explorer-page');assert(!g.overflow,JSON.stringify(g));assert.deepEqual(g.undersized,[]);assert.deepEqual(g.slots.map(s=>s.slot),['identity','stage','route']);const [,a,b]=g.slots;assert(a&&b);if(width>=1100){assert(Math.abs(a.rect.width/(a.rect.width+b.rect.width)-.66)<.005);assert(Math.abs(a.rect.top-b.rect.top)<1);}else assert(b.rect.top>=a.rect.bottom);count+=g.controls;assert.equal(await page.locator('#gcdr-stage-input').inputValue(),'Manipulation evidence');assert.equal(await page.locator('#gcdr-parameter-x').inputValue(),'0.25');await page.locator('#gcdr-advance-stage-btn').click({trial:true});}
 await page.locator('#gcdr-advance-stage-btn').click();assert.equal(await page.locator('.gcdr-stage-step.active').getAttribute('data-stage'),'OBSERVE');
 await page.locator('.gcdr-helper-btn').click();assert.match(await page.locator('.gcdr-drawer-chalkboard').innerText(),/No reviewed helper/);
 const saved=await page.evaluate(()=> (window as any).a73.c.exportState());await page.evaluate(async saved=>{const {GcdrExplorerPageController,mountGcdrExplorer}=await import('/pages/explorer.ts' as string);const w=(window as any).a73;w.mount.dispose();w.c=new GcdrExplorerPageController(w.config);w.c.restoreState(saved);w.mount=mountGcdrExplorer(document.getElementById('app')!,w.c);},saved);
 assert.equal(await page.locator('.gcdr-stage-step.active').getAttribute('data-stage'),'OBSERVE');
 for(const stage of ['OBSERVE','CONTRADICT','DECONSTRUCT','RECONSTRUCT','INVARIANT','BOUNDARY','FADE','TRANSFER']){assert.equal(await page.locator('.gcdr-stage-step.active').getAttribute('data-stage'),stage);await page.locator('#gcdr-stage-input').fill('Local response '+stage);await page.locator('#gcdr-advance-stage-btn').click();}
 assert.equal(await page.evaluate(()=> (window as any).a73.c.getJourney().isCompleted()),true);assert(!/PROTECTED_HELPER|PROTECTED_FALSE_CLAIM|CANONICAL_BINDING/.test(await page.content()));assert.match(await page.locator('.gcdr-second-view').innerText(),/withheld/);
 console.log('A73 Explorer mounted diagnostic: '+JSON.stringify({viewports:7,controlObservations:count,localStages:10,contextEntry:true,scope:'LOCAL_UNBOUND'}));
 }finally{await browser.close();await server.close();}
});
