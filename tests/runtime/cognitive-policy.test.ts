import {it} from 'node:test';
import assert from 'node:assert/strict';
import {MemoryStorageDriver} from '../../web/runtime/storage.ts';
import {DefaultProgressStore} from '../../web/runtime/progress.ts';
import {DefaultCognitiveStore} from '../../web/runtime/cognitive-store.ts';
import {CognitiveController,type CognitiveAuthority,type ReviewedTaskContext} from '../../web/journeys/cognitive-controller.ts';
import {StandardAssessmentEngine,SCORING_VERSION,type AssessmentContract} from '../../web/runtime/assessment.ts';
import {canonicalJson,computeSha256,sameRef} from '../../web/runtime/loader.ts';
import type {Attempt,Session,TaskRef,Ref,CognitiveEvent,Checkpoint,JourneyKey,WorkArtifact,Response,CognitiveDraftLineage} from '../../web/runtime/types.ts';
const task:TaskRef={type:'QUESTION',id:'que:policy:first',revision:1,sha256:'a'.repeat(64)},boundary:TaskRef={...task,type:'FRESH_TASK',id:'que:policy:boundary'};
const firstReference:Ref={...task,type:'SOLUTION',id:'solution:first'},boundaryReference:Ref={...task,type:'SOLUTION',id:'solution:boundary'},hint:Ref={...task,type:'ASSET',id:'asset:hint'},releaseId='RELEASE-DEMO-01',at='2026-11-17T12:00:00Z';
const journey:JourneyKey={journeyId:'jrn:policy:r3',taskInstanceId:'inst:policy:r3',releaseId,task};
const context:ReviewedTaskContext={releaseId,task,boundaryTask:boundary,firstReference,boundaryReference,firstFields:{a:'INTEGER'},boundaryFields:{b:'INTEGER'},moves:['move:one']};
const zero:Checkpoint={sequence:0,sha256:null};
const answer:Response={kind:'MULTIPART',value:{a:{kind:'INTEGER',value:'7'}}},boundaryAnswer:Response={kind:'MULTIPART',value:{b:{kind:'INTEGER',value:'8'}}};
const session=(item:TaskRef,id:string,mode:Session['mode']='PRACTICE'):Session=>({id,releaseId,item,mode,contentRevision:'r3',deadlineAt:mode==='SIMULATED_EXAM'?'2099-01-01T00:00:00Z':null,origin:null,returnRoute:null,cursor:4,attemptIds:[],draftId:null});
async function fixture(mode:Session['mode']='PRACTICE'){
 const d=new MemoryStorageDriver();
 const a=session(task,'ses:policy:first',mode),b=session(boundary,'ses:policy:boundary');
 await d.put('sessions',a.id,a);await d.put('sessions',b.id,b);
 const contracts:AssessmentContract[]=[task,boundary].map((t,i)=>({id:'asmt:policy:'+i,revision:1,task_ref:t,response_kind:'MULTIPART',max_points:1,evaluator:{mode:'REVIEW_PENDING'}}));
 const refs=await Promise.all(contracts.map(async c=>({type:'ASSESSMENT' as const,id:c.id,revision:1,sha256:await computeSha256(canonicalJson(c))})));
 const engine=new StandardAssessmentEngine(refs.map((assessment,i)=>({assessment,task:contracts[i].task_ref as TaskRef})));
 for(let i=0;i<2;i++)await engine.registerContract(contracts[i],refs[i]);
 const p=new DefaultProgressStore(d,async x=>{const i=refs.findIndex(r=>sameRef(r,x.assessmentRef!));return i>=0&&sameRef(contracts[i].task_ref,x.item)&&x.releaseId===releaseId&&x.scoringVersion===SCORING_VERSION&&canonicalJson(x.grade)===canonicalJson(await engine.evaluate(x.response,refs[i],'PRACTICE',x.item as TaskRef));});
 const s=new DefaultCognitiveStore(d,p);
 const auth:CognitiveAuthority={liveRevision:async()=> 'r3',reviewedContext:async()=>context,allowed:async(_j,_s,cap,asset)=>cap==='H1'?sameRef(asset,hint):cap==='REFERENCE_SOLUTION'?sameRef(asset,firstReference):cap==='BOUNDARY_REFERENCE'?sameRef(asset,boundaryReference):cap==='SOURCE_RETURN'?sameRef(asset,task):false,boundaryAllowed:async(_j,ref)=>sameRef(ref,boundary)};
 const controller=new CognitiveController({journey,sessionId:a.id},s,d,auth);
 const makeAttempt=async(i:number,e:CognitiveEvent,work:readonly WorkArtifact[],firstId:string|null,help:readonly string[]):Promise<Attempt>=>{
  const ses=i?b:a,response=i?boundaryAnswer:answer;
  return {id:e.event_id+':attempt',sessionId:ses.id,releaseId,item:ses.item,response,work,hintIds:help,submittedAt:at,grade:await engine.evaluate(response,refs[i],'PRACTICE',ses.item as TaskRef),assessmentRef:refs[i],scoringVersion:SCORING_VERSION,cognitive:{journey,firstAttemptId:firstId,parentJourney:null,originSessionId:a.id,originRef:task,originCursor:a.cursor}};
 };
 return {d,p,s,auth,controller,a,b,makeAttempt};
}
function event(cp:Checkpoint,type:CognitiveEvent['event_type'],payload:unknown):CognitiveEvent{return {schema_version:'g9-cognitive-event/2',event_id:'evt:policy:'+String(cp.sequence+1),journey_id:journey.journeyId,task_instance_id:journey.taskInstanceId,release_id:releaseId,task_ref:task,sequence:cp.sequence+1,previous_sha256:cp.sha256,event_type:type,payload,at} as CognitiveEvent;}
it('A49 exact contextual authorization, both durable commitments and source return',async()=>{
 const {d,p,s,controller,a,b,makeAttempt}=await fixture();let snap=await controller.begin();
 const append=async(type:CognitiveEvent['event_type'],payload:unknown,work:readonly WorkArtifact[]=[],attempt?:Attempt)=>{snap=await controller.commit(event(snap.checkpoint,type,payload),snap.checkpoint,work,attempt);};
 assert.equal(await controller.canDisplay('REFERENCE_SOLUTION',firstReference,snap.checkpoint),false);
 await append('PREDICTION_COMMITTED',{prediction:'UNSURE',artifact_ids:[]});
 await assert.rejects(append('HELP_EXPOSED',{capability:'H2',asset_ref:hint,ordinal:1}),/HELP_NOT_AUTHORIZED/);
 const h=event(snap.checkpoint,'HELP_EXPOSED',{capability:'H1',asset_ref:hint,ordinal:1});assert.equal(await controller.canDisplay('H1',hint,snap.checkpoint,h.event_id),false);
 snap=await controller.commit(h,snap.checkpoint,[]);assert.equal(await controller.canDisplay('H1',hint,snap.checkpoint,h.event_id),true);
 await assert.rejects(append('FIRST_COMMITTED',{responses:{wrong:{kind:'INTEGER',value:'7'}},work:[],help_event_ids:[h.event_id]}),/FIRST_FIELDS_NOT_AUTHORIZED/);
 const e=event(snap.checkpoint,'FIRST_COMMITTED',{responses:answer.value,work:[],help_event_ids:[h.event_id]}),first=await makeAttempt(0,e,[],null,[h.event_id]);
 snap=await controller.commit(e,snap.checkpoint,[],first);
 assert.equal(await controller.canDisplay('REFERENCE_SOLUTION',firstReference,snap.checkpoint),true);assert.equal(await controller.canDisplay('REFERENCE_SOLUTION',boundaryReference,snap.checkpoint),false);
 await assert.rejects(append('RECONSTRUCTION_COMMITTED',{first_event_id:e.event_id,comparison:{wrong:{}},reference_ref:firstReference}),/RECONSTRUCTION_NOT_AUTHORIZED/);
 await append('RECONSTRUCTION_COMMITTED',{first_event_id:e.event_id,comparison:{'move:one':{aligned:false}},reference_ref:firstReference});
 await assert.rejects(append('DIAGNOSIS_COMMITTED',{move_id:'foreign',why:'reason'}),/DIAGNOSIS_NOT_AUTHORIZED/);await append('DIAGNOSIS_COMMITTED',{move_id:'UNSURE',why:'unsure'});
 const repair:WorkArtifact={id:'art:repair:policy',kind:'NOTE',version:1,value:'repair'};
 const lineage:CognitiveDraftLineage={...first.cognitive!,firstAttemptId:first.id,stage:snap.stage,checkpoint:snap.checkpoint};
 const saved=(await d.get<Session>('sessions',a.id))!;await p.saveDraft(saved,{kind:'CONSTRUCTED_RESPONSE',value:'repair'},[repair],0,lineage);assert.deepEqual((await p.loadDraft(a.id))?.cognitive,lineage);
 await append('REPAIR_COMMITTED',{first_event_id:e.event_id,work:[repair.id],why:'repair'},[repair]);
 // The active draft is the boundary draft; earlier repair text is already committed.
 const w:WorkArtifact={id:'art:boundary:policy',kind:'NOTE',version:1,value:'boundary'};
 const bl:CognitiveDraftLineage={...lineage,stage:snap.stage,checkpoint:snap.checkpoint};
 await p.saveDraft(b,boundaryAnswer,[w],0,bl);assert.deepEqual((await p.loadDraft(b.id))?.cognitive,bl);
 const be=event(snap.checkpoint,'BOUNDARY_COMMITTED',{boundary_task_ref:boundary,responses:boundaryAnswer.value,work:[w.id],help_event_ids:[]}),ba=await makeAttempt(1,be,[w],first.id,[]);
 assert.equal(await controller.canDisplay('BOUNDARY_REFERENCE',boundaryReference,snap.checkpoint),false);
 snap=await controller.commit(be,snap.checkpoint,[w],ba);assert.equal(await controller.canDisplay('BOUNDARY_REFERENCE',boundaryReference,snap.checkpoint),true);
 await append('BOUNDARY_FEEDBACK_VIEWED',{boundary_event_id:be.event_id,reference_ref:boundaryReference});
 await assert.rejects(append('SOURCE_RETURNED',{origin_session_id:b.id,origin_ref:task,cursor:4}),/Wrong original source return/);
 const re=event(snap.checkpoint,'SOURCE_RETURNED',{origin_session_id:a.id,origin_ref:task,cursor:4});snap=await controller.commit(re,snap.checkpoint,[]);
 assert.equal(await controller.canDisplay('SOURCE_RETURN',task,snap.checkpoint),true);assert.equal((await controller.commit(re,{sequence:re.sequence-1,sha256:re.previous_sha256},[])).checkpoint.sha256,snap.checkpoint.sha256);
 assert.equal((await d.getAll('attempts')).length,2);assert.equal((await s.replay(journey,snap.checkpoint)).stage,'COMPLETE');
 const historical=await p.loadDraft(a.id);assert.equal(historical?.cognitiveStale,true);assert.deepEqual(historical?.cognitive,lineage);
 const archive=await s.exportAll(),fresh=new MemoryStorageDriver(),restored=new DefaultCognitiveStore(fresh,new DefaultProgressStore(fresh));await restored.importVerified(archive);assert.equal((await restored.replay(journey,snap.checkpoint)).stage,'COMPLETE');const oldDraft=await new DefaultProgressStore(fresh).loadDraft(a.id);assert.deepEqual(oldDraft?.cognitive,lineage);assert.equal(oldDraft?.cognitiveStale,true);
});
it('A49 denies exam and unreviewed task context before durable changes',async()=>{
 const f=await fixture('SIMULATED_EXAM');await assert.rejects(f.controller.begin(),/SESSION_OR_EXAM_POLICY_BLOCKED/);assert.equal(await f.controller.canDisplay('H1',hint,zero,'evt:1'),false);
 const p=await fixture(),bad=new CognitiveController({journey,sessionId:p.a.id},p.s,p.d,{...p.auth,reviewedContext:async()=>null});
 await assert.rejects(bad.begin(),/REVIEWED_CONTEXT_REQUIRED/);assert.equal((await p.d.getAll('cognitive_journeys')).length,0);
});
