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
const pin=(c:Wave9Catalog)=>computeSha256(canonicalJson(c));
async function fixture(role:Wave9Catalog['role'],answer='4'){
 const f=await setupTransfer(),b=await f.controller.describeBinding();
 const anchor=ref('QUESTION','question:wave9:anchor','b'.repeat(64)),check=ref('QUESTION','question:wave9:check','c'.repeat(64));
 const as:Session={...f.as,id:'session:wave9:anchor',item:anchor,attemptIds:[],draftId:null};
 const cs:Session={...f.as,id:'session:wave9:check',item:check,origin:f.first,attemptIds:[],draftId:null};
 for(const s of [as,cs])await f.driver.put('sessions',s.id,s);
 const contracts:AssessmentContract[]=[anchor,check].map((task_ref,i)=>({id:'asmt:wave9:'+i,revision:1,task_ref,response_kind:'INTEGER',max_points:1,evaluator:{mode:'AUTOMATIC',canonical_value:'4'}}));
 const refs=await Promise.all(contracts.map(async c=>ref('ASSESSMENT',c.id,await computeSha256(canonicalJson(c)))));
 const engine=new StandardAssessmentEngine(refs.map((assessment,i)=>({assessment,task:contracts[i].task_ref as TaskRef})));
 for(let i=0;i<2;i++)await engine.registerContract(contracts[i],refs[i]);
 const progress=new DefaultProgressStore(f.driver,async a=>{
  if(!a.assessmentRef||a.releaseId!==f.key.releaseId||a.scoringVersion!==SCORING_VERSION)return false;
  const e=refs.some(r=>sameRef(r,a.assessmentRef!))?engine:f.binding.engine;
  return canonicalJson(a.grade)===canonicalJson(await e.evaluate(a.response,a.assessmentRef,'PRACTICE',a.item as TaskRef));
 });
 for(const [i,s] of [as,cs].entries()){
  const response:Response={kind:'INTEGER',value:i===0?'4':answer};
  const a:Attempt={id:'att:wave9:'+i,sessionId:s.id,item:s.item,releaseId:s.releaseId,response,work:[artifact('work:wave9:'+i)],hintIds:[],submittedAt:new Date().toISOString(),grade:await engine.evaluate(response,refs[i],'PRACTICE',s.item as TaskRef),cognitive:null,assessmentRef:refs[i],scoringVersion:SCORING_VERSION};
  await progress.appendQualifiedAttempt(a,0);
 }
 const asset=async(id:string,value:unknown)=>{const bytes=new TextEncoder().encode(JSON.stringify(value));f.bytes.set(id,bytes);return ref('PRESENTATION',id,await computeSha256(bytes));};
 const presentation=await asset('presentation:wave9:en',{source:f.first,locale:'en-US',level:'FORMAL',text:'Synthetic public presentation',symbolsAndUnits:{x:'m'}});
 const orientation=await asset('presentation:wave9:orientation',{blueprint:CORE1_ORIENTATION_BLUEPRINT_ID,source:f.first,topicId:'topic:synthetic',blocks:Object.fromEntries(CORE1_ORIENTATION_BLOCKS.map(k=>[k,'Synthetic '+k]))});
 const hint=f.definition.hints[0].assetRef as Ref;
 const bind=(s:Session):SessionBinding=>({id:s.id,item:s.item,origin:s.origin,mode:'PRACTICE',contentRevision:'r1'});
 const c:Wave9Catalog={schema:'g9-wave9-authority/1',learnerId:'synthetic-learner',role,journey:f.key,sessionId:f.as.id,originSessionId:f.os.id,boundarySessionId:f.bs.id,context:b.context,
 sessions:[f.as,f.os,f.bs,...(role==='CORE2A'?[cs]:role==='CORE2B'?[as]:[])].map(bind),
 grants:[{capability:'VIEW_STIMULUS',asset:f.first},{capability:'VIEW_STIMULUS',asset:f.bs.item},{capability:'VIEW_STIMULUS',asset:presentation},{capability:'VIEW_STIMULUS',asset:orientation},{capability:'REFERENCE_SOLUTION',asset:f.firstRef},{capability:'BOUNDARY_REFERENCE',asset:f.boundaryRef},{capability:'SOURCE_RETURN',asset:f.os.item},{capability:'H1',asset:hint}],
 ...(role==='CORE2A'?{practice:{releaseId:f.key.releaseId,practiceSessionId:f.as.id,practiceTask:f.first as TaskRef,checkSessionId:cs.id,checkTask:check,assessment:refs[1],attemptId:'att:wave9:1',review:ref('APPROVAL','approval:synthetic:check')}}:{}),
 ...(role==='CORE2B'?{transfer:{sessionId:f.as.id,releaseId:f.key.releaseId,task:f.first,origin:f.os.item,anchor,anchorSessionId:as.id,anchorAttemptId:'att:wave9:0',boundary:f.bs.item,dimension:'CONSTRAINT_MUTATION' as const,review:ref('APPROVAL','approval:synthetic:transfer'),capabilities:[{id:'synthetic:capability',teaching:f.os.item as Ref<'LESSON'>,receipt:ref('APPROVAL','approval:synthetic:teaching')}],scaffolds:[{capability:'H1' as const,asset:hint}]}}:{})};
 const digest=await pin(c);let enabled=true,learner='synthetic-learner',reads=0;
 const live=async(s:{learnerId:string;releaseId:string;catalogSha256:string})=>enabled&&s.learnerId===learner&&s.releaseId===f.key.releaseId&&s.catalogSha256===digest;
 const load=async(r:Ref)=>{reads++;return f.binding.loadProtected(r);};
 const compose=(catalog:Wave9Catalog=c,pinned=digest)=>composeWave9(catalog,pinned,f.driver,progress,live,load);
 return {f,c,digest,compose,progress,presentation,orientation,as,cs,hint,reads:()=>reads,revoke:()=>{enabled=false;},switchLearner:()=>{learner='foreign-learner';}};
}
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
