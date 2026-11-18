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

import {MemoryStorageDriver} from '../../web/runtime/storage.ts';
import {DefaultCognitiveStore} from '../../web/runtime/cognitive-store.ts';
import {CognitiveController} from '../../web/journeys/cognitive-controller.ts';
import {sameRef} from '../../web/runtime/loader.ts';
import type {TaskRef,Ref,Session,JourneyKey,CognitiveEvent,Checkpoint} from '../../web/runtime/types.ts';
it('A65 governed telemetry needs local prediction and actual A49 event; faded stage masks',async()=>{
 const driver=new MemoryStorageDriver(),task:TaskRef={type:'QUESTION',id:'que:model:synthetic',revision:1,sha256:'a'.repeat(64)},boundary:TaskRef={...task,type:'FRESH_TASK',id:'que:model:boundary'},asset:Ref={type:'ASSET',id:'PHYS-MODEL-ENERGY-WELL',revision:1,sha256:'b'.repeat(64)};
 const firstReference:Ref={...task,type:'SOLUTION',id:'sol:model:first'},boundaryReference:Ref={...task,type:'SOLUTION',id:'sol:model:boundary'};
 const releaseId='rel:model:synthetic',journey:JourneyKey={journeyId:'journey:model',taskInstanceId:'inst:model',task,releaseId};
 const session:Session={id:'ses:model',item:task,releaseId,mode:'PRACTICE',contentRevision:'r1',origin:null,returnRoute:null,cursor:0,attemptIds:[],draftId:null};
 await driver.put('sessions',session.id,session);
 const authority={liveRevision:async()=> 'r1',reviewedContext:async()=>({releaseId,task,boundaryTask:boundary,firstReference,boundaryReference,firstFields:{a:'INTEGER' as const},boundaryFields:{a:'INTEGER' as const},moves:['m']}),allowed:async(_j:any,_s:any,cap:string,a:Ref)=>cap==='MODEL_AUTO_CALCULATE'&&sameRef(a,asset),boundaryAllowed:async()=>false};
 const controller=new CognitiveController({journey,sessionId:session.id},new DefaultCognitiveStore(driver),driver,authority);
 let snap=await controller.begin();
 const event=(cp:Checkpoint,type:CognitiveEvent['event_type'],payload:any):CognitiveEvent=>({schema_version:'g9-cognitive-event/2',event_id:'evt:model:'+String(cp.sequence+1),journey_id:journey.journeyId,task_instance_id:journey.taskInstanceId,release_id:releaseId,task_ref:task,sequence:cp.sequence+1,previous_sha256:cp.sha256,at:'2026-11-18T09:00:00Z',event_type:type,payload} as CognitiveEvent);
 const c=new GcdrExplorerPageController(config),j=c.getJourney(),binding={controller,asset,checkpoint:snap.checkpoint,exposureId:'evt:model:2',modelId:asset.id};
 assert.equal(await c.readAuthorizedTelemetry(binding),null);
 snap=await controller.commit(event(snap.checkpoint,'PREDICTION_COMMITTED',{prediction:'UNSURE',artifact_ids:[]}),snap.checkpoint,[]);
 const h=event(snap.checkpoint,'HELP_EXPOSED',{capability:'MODEL_AUTO_CALCULATE',asset_ref:asset,ordinal:1});const stale=snap.checkpoint;snap=await controller.commit(h,snap.checkpoint,[]);
 const valid={...binding,checkpoint:snap.checkpoint};assert.equal(await c.readAuthorizedTelemetry(valid),null);
 j.setStageResponse('PREDICT','UNSURE');j.advance();j.setModelParameter('x',.2);
 assert.equal(await c.readAuthorizedTelemetry({...valid,checkpoint:stale}),null);assert.ok(Math.abs((await c.readAuthorizedTelemetry(valid))!.potentialEnergy-2)<1e-12);
 j.setStageResponse('MANIPULATE','changed');j.advance();for(const stage of GCDR_ORDERED_STAGES.slice(2,8)){j.setStageResponse(stage,'recorded');j.advance();}
 assert.equal(j.getCurrentStage(),'FADE');assert.equal(await c.readAuthorizedTelemetry(valid),null);
});
