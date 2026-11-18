import {it} from 'node:test';
import assert from 'node:assert/strict';
import {chromium} from 'playwright-core';
import {GCDR_ORDERED_STAGES,GcdrExplorerJourney,type GcdrHelperStates} from '../../web/journeys/explorer.ts';
import {GcdrExplorerPageController} from '../../web/pages/explorer.ts';
const helpers:GcdrHelperStates={chalkboardNote:'PROTECTED CHALKBOARD',trapAlert:'PROTECTED TRAP',independentCheckPrompt:'PROTECTED CHECK',transferTakeaway:'PROTECTED TAKEAWAY',exactnessBadge:{fidelity:'NUMERICAL_EXACT',binding:'CANONICAL_BINDING',academicClaimDisclaimer:'false proof claim'}};
const config={explorerId:'synthetic-explorer',title:'Synthetic energy well',subject:'Physics',topic:'WPE',helpers};
it('ten local stages require ordered evidence, actual parameter change, and transfer response',()=>{
 const j=new GcdrExplorerJourney(config.explorerId,helpers);
 assert.equal(j.getCurrentStage(),'PREDICT');assert.equal(j.setModelParameter('x',.2),false);assert.equal(j.setStageResponse('TRANSFER','future'),false);assert.equal(j.advance().success,false);
 assert(j.setStageResponse('PREDICT','UNSURE'));assert(j.advance().success);assert.equal(j.getCurrentStage(),'MANIPULATE');
 j.setStageResponse('MANIPULATE','changed');assert.equal(j.advance().success,false);assert.equal(j.setModelParameter('x',NaN),false);assert(j.setModelParameter('x',.3));assert(j.advance().success);
 for(const stage of GCDR_ORDERED_STAGES.slice(2,-1)){assert.equal(j.getCurrentStage(),stage);assert.equal(j.advance().success,false);assert(j.setStageResponse(stage,'recorded '+stage));assert(j.advance().success);}
 assert.equal(j.getCurrentStage(),'TRANSFER');assert.equal(j.isCompleted(),false);assert(j.setStageResponse('TRANSFER','transfer response'));assert(j.advance().success);assert(j.isCompleted());assert.equal(j.advance().success,false);
 assert(j.goToStage('PREDICT'));assert.equal(j.setStageResponse('PREDICT','replace'),false);assert(j.advance().success);assert(j.isCompleted());
});
it('local draft replay rejects foreign identity, missing prefix, false completion, invalid parameter and future response',()=>{
 const c=new GcdrExplorerPageController(config),j=c.getJourney();j.setStageResponse('PREDICT','prediction');j.advance();j.setModelParameter('x',-.25);j.setStageResponse('MANIPULATE','changed');j.advance();c.setOrientation('PORTRAIT');const saved=c.exportState();
 const fresh=new GcdrExplorerPageController(config);fresh.restoreState(saved);assert.equal(fresh.getOrientation(),'PORTRAIT');assert.equal(fresh.getJourney().getCurrentStage(),'OBSERVE');assert.equal(fresh.getJourney().getModelParameters().x,-.25);
 for(const bad of [{...saved.draft,explorerId:'foreign'},{...saved.draft,currentStageIndex:9},{...saved.draft,isCompleted:true},{...saved.draft,evidence:saved.draft.evidence.slice(1)},{...saved.draft,modelParameters:{x:NaN}},{...saved.draft,stageResponses:{...saved.draft.stageResponses,TRANSFER:'forged'}}])assert.throws(()=>fresh.restoreState({...saved,draft:bad}));
 assert.throws(()=>fresh.restoreState({...saved,activeHelperDrawer:'TAKEAWAY'}));
});
it('telemetry and every protected helper remain withheld; caller cannot claim canonical fidelity',()=>{
 const c=new GcdrExplorerPageController(config);assert.equal(c.getTelemetry(),null);assert.equal(c.getViewState().exactnessBadge.binding,'UNBOUND_EXTENSION');assert.equal(c.getViewState().exactnessBadge.fidelity,'QUALITATIVE_SYNTHETIC');
 c.toggleHelperDrawer('TAKEAWAY');assert.equal(c.getActiveHelperDrawer(),null);c.toggleHelperDrawer('CHALKBOARD');assert.equal(c.getActiveHelperDrawer(),'CHALKBOARD');
 const html=c.renderHtml();assert(!html.includes('PROTECTED'));assert(!html.includes('12.5'));assert(!html.includes('CANONICAL_BINDING'));assert(html.includes('Telemetry withheld'));assert(html.includes('min-height: 48px'));assert(html.includes('grid-template-columns: 1fr 1fr'));
 c.setOrientation('PORTRAIT');assert(c.renderHtml().includes('flex-direction: column'));
});
it('actual Chromium: hostile explorer title and learner response rendered inert, telemetry masked',async()=>{
 const c=new GcdrExplorerPageController({...config,title:'<img src=x onerror=alert(1)>'});c.getJourney().setStageResponse('PREDICT','"><img src=x onerror=alert(1)>');
 const b=await chromium.launch({headless:true});try{const p=await b.newPage();await p.setContent(c.renderHtml());assert.equal(await p.locator('img,[onerror]').count(),0);assert.equal(await p.locator('#gcdr-stage-input').inputValue(),'"><img src=x onerror=alert(1)>');assert.equal(await p.locator('.gcdr-second-view').textContent(),'Telemetry withheld pending durable reviewed exposure.');assert.equal(await p.locator('.gcdr-stage-step:disabled').count(),9);}finally{await b.close();}
});
