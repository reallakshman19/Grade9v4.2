// Synthetic engineering integration only. No production academic data or approval.
import {test} from 'node:test';
import assert from 'node:assert/strict';
import {composeWave9,type Wave9Catalog,type SessionBinding} from '../../web/runtime/wave9-authority.ts';
import {computeSha256,canonicalJson,sameRef} from '../../web/runtime/loader.ts';
import {DefaultProgressStore} from '../../web/runtime/progress.ts';
import {StandardAssessmentEngine,SCORING_VERSION,type AssessmentContract} from '../../web/runtime/assessment.ts';
import {Core1BTransferJourney} from '../../web/journeys/core1b.ts';
import {CORE1_ORIENTATION_BLUEPRINT_ID,CORE1_ORIENTATION_BLOCKS} from '../../web/journeys/core1.ts';
import {setupTransfer,throughRepair,firstResponses,boundaryResponses,artifact,ref} from '../fixtures/wave8-synthetic.ts';
import type {Attempt,CognitiveEvent,Ref,Session,TaskRef,Response} from '../../web/runtime/types.ts';
import {fixture,pin} from '../fixtures/wave9-synthetic.ts';
test('W9-INT-02 exact pinned catalog, immutable clone and native presentation positive path',async()=>{
 const x=await fixture('CORE1');
 const altered=structuredClone(x.c);(altered as {learnerId:string}).learnerId='foreign';
 await assert.rejects(x.compose(altered),/CATALOG_PIN_MISMATCH/);
 const a=await x.compose(),s=await a.controller.begin(),cp=s.checkpoint;
 (x.c.grants as unknown[]).length=0;
 assert.equal((await a.presentation.read(x.presentation,'en-US','FORMAL',cp))?.text,'Synthetic public presentation');
 assert.equal(await a.presentation.read(x.presentation,'hi-IN','FORMAL',cp),null);
 assert.equal((await a.orientation!.read(x.orientation,cp))?.blueprint,CORE1_ORIENTATION_BLUEPRINT_ID);
 assert.equal(a.orientation!.canPrintPDF(),false);
 const n=x.reads();x.switchLearner();
 assert.equal(await a.orientation!.read(x.orientation,cp),null);assert.equal(x.reads(),n);
});
test('W9-INT-02 A67 correct and incorrect typed checks; stale independent session blocks',async()=>{
 for(const answer of ['4','5']){
  const x=await fixture('CORE2A',answer),a=await x.compose(),cp=(await a.controller.begin()).checkpoint;
  assert.deepEqual(await a.practice!.readIndependentCheck(cp),{status:answer==='4'?'CHECK_PASSED':'CHECK_DIVERGED',valid:answer==='4',mastery:false});
  const s=await x.f.driver.get<Session>('sessions',x.cs.id);
  await x.f.driver.put('sessions',x.cs.id,{...s!,contentRevision:'stale'});
  assert.equal((await a.practice!.readIndependentCheck(cp)).valid,null);
 }
});
test('W9-INT-02 A68 guarded A49 full durable path, stale checkpoints and independent boundary',async()=>{
 const x=await fixture('CORE2B'),a=await x.compose(),t=a.transfer!,f=x.f;
 let v=await t.begin();assert.equal(v.stage,'PREDICT');
 assert.equal(await t.readStimulus(v.checkpoint),'First task bytes');
 assert.equal(await t.readFirstReference(v.checkpoint),null);assert.equal(await t.readBoundaryReference(v.checkpoint),null);
 const cp=v.checkpoint,j=f.key;
 const ev:CognitiveEvent={schema_version:'g9-cognitive-event/2',event_id:'evt:wave9:predict',journey_id:j.journeyId,task_instance_id:j.taskInstanceId,release_id:j.releaseId,task_ref:j.task,sequence:cp.sequence+1,previous_sha256:cp.sha256,at:new Date().toISOString(),event_type:'PREDICTION_COMMITTED',payload:{prediction:'UNSURE',artifact_ids:[]}};
 v=await t.commit(ev,cp,[]);assert.equal(v.stage,'ATTEMPT');await assert.rejects(t.commit(ev,cp,[]));
 const journey=new Core1BTransferJourney(f.definition,{...f.binding,controller:a.controller,progress:x.progress});
 await journey.restore();
 const exposed=await journey.requestHint();assert.equal(exposed.text,'REVIEWED_HINT_ONE');
 // Raw A49 access cannot bypass the same catalog: H2 was never admitted.
 assert.equal(await a.controller.canRequest('H2',f.definition.hints[1].assetRef as Ref,journey.getCheckpoint()!),false);
 journey.setResponses(firstResponses,[artifact('work:wave9:first')]);await journey.saveDraft();await journey.commitFirstAttempt();
 const first=journey.getCheckpoint()!;assert.equal((await t.view(first)).firstCommitted,true);assert.equal(await t.readFirstReference(first),'REVIEWED_FIRST_REFERENCE');assert.equal(await t.readBoundaryReference(first),null);
 assert.equal(await t.readFirstReference(cp),null);
 await throughRepair(journey);assert.equal(await t.readStimulus(journey.getCheckpoint()!),'REVIEWED_BOUNDARY_STIMULUS');
 journey.setResponses(boundaryResponses,[artifact('work:wave9:boundary')]);await journey.saveDraft();await journey.commitBoundaryAttempt();
 assert.equal(await t.readBoundaryReference(journey.getCheckpoint()!),'REVIEWED_BOUNDARY_REFERENCE');assert.equal(await t.readSourceReturn(journey.getCheckpoint()!),null);
 await journey.viewBoundaryFeedback();await journey.returnToSource();
 const end=journey.getCheckpoint()!;assert.equal((await t.readSourceReturn(end))?.sessionId,f.os.id);
 x.revoke();assert.equal(await t.readBoundaryReference(end),null);assert.equal(await a.feedback.readFirstReference(end),null);await assert.rejects(t.view(end));
});
test('W9-INT-02 rejects nonmatching scaffold grants and missing anchor commitment',async()=>{
 const x=await fixture('CORE2B'),bad=structuredClone(x.c);
 (bad.grants as {capability:string;asset:Ref}[]).push({capability:'H2',asset:x.f.definition.hints[1].assetRef as Ref});
 await assert.rejects(x.compose(bad,await pin(bad)),/INVALID_TRANSFER_SCAFFOLD/);
 const a=await x.compose();await x.f.driver.delete('attempts','att:wave9:0');
 await assert.rejects(a.transfer!.begin());
});
