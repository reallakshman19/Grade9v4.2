import {it} from 'node:test';
import assert from 'node:assert/strict';
import {DefaultCognitiveStore,computeEventHash,createGenesisSnapshot} from '../../web/runtime/cognitive-store.ts';
import {MemoryStorageDriver,StorageError} from '../../web/runtime/storage.ts';
import {canonicalJson,computeSha256} from '../../web/runtime/loader.ts';
import {DefaultProgressStore} from '../../web/runtime/progress.ts';
import type {Attempt,Session,CognitiveEvent,JourneyKey,Ref,Checkpoint,WorkArtifact} from '../../web/runtime/types.ts';
const task:Ref={type:'QUESTION',id:'que:physics:wpe:01',revision:1,sha256:'a'.repeat(64)};
const journey=(id='jrn:01'):JourneyKey=>({journeyId:id,taskInstanceId:'instance:'+id,task,releaseId:'RELEASE-DEMO-01'});
const zero:Checkpoint={sequence:0,sha256:null};
const artifact:WorkArtifact={id:'work:1',kind:'NOTE',version:1,value:'repair reasoning'};
function event(j:JourneyKey,cp:Checkpoint,type:CognitiveEvent['event_type'],payload:unknown):CognitiveEvent{return {schema_version:'g9-cognitive-event/1',event_id:j.journeyId+':event:'+(cp.sequence+1),journey_id:j.journeyId,release_id:j.releaseId,task_instance_id:j.taskInstanceId,task_ref:j.task,sequence:cp.sequence+1,previous_sha256:cp.sha256,event_type:type,payload,at:'2026-11-17T12:00:00Z'} as CognitiveEvent;}
const pred=(j:JourneyKey)=>event(j,zero,'PREDICTION_COMMITTED',{prediction:'prediction',artifact_ids:[]});
const response={a:{kind:'INTEGER',value:'1'}};
const first=(j:JourneyKey,cp:Checkpoint)=>event(j,cp,'FIRST_COMMITTED',{responses:response,work:[],help_event_ids:[]});
// Synthetic reviewed fixture authority, never a production bootstrap.
const assessmentRef={type:'ASSESSMENT' as const,id:'assessment:synthetic',revision:1,sha256:'c'.repeat(64)};
function store(d:MemoryStorageDriver){return new DefaultCognitiveStore(d,new DefaultProgressStore(d,async a=>a.assessmentRef?.sha256===assessmentRef.sha256&&a.scoringVersion==='g9-scoring/1.1'&&a.grade.status==='REVIEW_PENDING'&&a.grade.points===null));}
async function attemptFor(d:MemoryStorageDriver,j:JourneyKey,e:CognitiveEvent,w:readonly WorkArtifact[],firstId:string|null=null):Promise<Attempt>{
 if(e.event_type!=='FIRST_COMMITTED'&&e.event_type!=='BOUNDARY_COMMITTED')throw Error('not commitment');
 const item=e.event_type==='FIRST_COMMITTED'?j.task:e.payload.boundary_task_ref,sessionId=j.journeyId+(e.event_type==='FIRST_COMMITTED'?':first':':boundary');
 const session:Session={id:sessionId,releaseId:j.releaseId,item,mode:'PRACTICE',origin:null,returnRoute:null,cursor:0,attemptIds:[],draftId:null};
 await d.put('sessions',sessionId,session);
 return {id:e.event_id+':attempt',sessionId,releaseId:j.releaseId,item,response:{kind:'MULTIPART',value:e.payload.responses},work:w,hintIds:e.payload.help_event_ids,submittedAt:e.at,grade:{status:'REVIEW_PENDING',points:null,maxPoints:0,reasonCode:'MANUAL_REVIEW_REQUIRED'},assessmentRef,scoringVersion:'g9-scoring/1.1',cognitive:{journey:j,firstAttemptId:firstId,parentJourney:null,originSessionId:j.journeyId+':first',originRef:j.task,originCursor:0}};
}
it('executes complete canonical stage sequence and replays exact checkpoint',async()=>{
 const d=new MemoryStorageDriver(),s=store(d),j=journey();let snap=await s.append(pred(j),j,zero,[]);
 const append=async(type:CognitiveEvent['event_type'],p:unknown,w:readonly WorkArtifact[]=[])=>{const e=event(j,snap.checkpoint,type,p);const a=type==='FIRST_COMMITTED'||type==='BOUNDARY_COMMITTED'?await attemptFor(d,j,e,w,type==='BOUNDARY_COMMITTED'?snap.firstAttemptId+':attempt':null):undefined;snap=await s.append(e,j,snap.checkpoint,w,a);};
 await append('HELP_EXPOSED',{capability:'H1',asset_ref:task,ordinal:1});assert.equal(snap.assisted,true);
 await append('FIRST_COMMITTED',{responses:response,work:[],help_event_ids:[snap.eventIds[1]]});const f=snap.firstAttemptId;assert.equal(snap.stage,'RECONSTRUCT');
 await append('RECONSTRUCTION_COMMITTED',{first_event_id:f,comparison:{a:{ok:true}},reference_ref:task});await append('DIAGNOSIS_COMMITTED',{move_id:'m1',why:'reason'});
 await append('REPAIR_COMMITTED',{first_event_id:f,work:[artifact.id],why:'repair'},[artifact]);
 const boundaryWork:WorkArtifact={id:'work:boundary',kind:'NOTE',version:1,value:'boundary reasoning'};
 await append('BOUNDARY_COMMITTED',{boundary_task_ref:{...task,id:'que:boundary'},responses:response,work:[boundaryWork.id],help_event_ids:[]},[boundaryWork]);
 await append('BOUNDARY_FEEDBACK_VIEWED',{boundary_event_id:snap.boundaryAttemptId,reference_ref:task});assert.equal(snap.stage,'COMPLETE');assert.equal(snap.eventIds.length,8);
 assert.deepEqual(await store(d).replay(j,snap.checkpoint),snap);
 const blob=await s.exportAll(),fresh=new MemoryStorageDriver(),restored=store(fresh);await restored.importVerified(blob);assert.deepEqual(await restored.replay(j,snap.checkpoint),snap);await assert.rejects(restored.replayForDisclosure(j,snap.checkpoint));
});
it('binds task_instance_id and every event header in the hash',async()=>{const j=journey(),e=pred(j);assert.notEqual(await computeEventHash(e),await computeEventHash({...e,task_instance_id:'different'}));});
it('refuses wrong journey identity and out-of-order stage',async()=>{const s=new DefaultCognitiveStore(new MemoryStorageDriver()),j=journey();await assert.rejects(s.append(pred(j),{...j,releaseId:'other'},zero,[]),/IDENTITY_MISMATCH/);await assert.rejects(s.append(first(j,zero),j,zero,[]),/INVALID_STAGE/);});
it('rejects malformed payload and missing task instance',async()=>{const s=new DefaultCognitiveStore(new MemoryStorageDriver()),j=journey();await assert.rejects(s.append({...pred(j),task_instance_id:''},j,zero,[]),/INVALID_EVENT_SCHEMA/);await assert.rejects(s.append(event(j,zero,'PREDICTION_COMMITTED',{}),j,zero,[]),/INVALID_EVENT_SCHEMA/);});
it('rolls back failed writes without unlocking',async()=>{const d=new MemoryStorageDriver(),s=store(d),j=journey();const a=await s.append(pred(j),j,zero,[]);const e=first(j,a.checkpoint),att=await attemptFor(d,j,e,[]);d.setFailureHook((k,act)=>k.startsWith('cog_events:')&&act==='put'?new StorageError('TRANSACTION_ABORTED','test'):null);await assert.rejects(s.append(e,j,a.checkpoint,[],att),/TRANSACTION_ABORTED/);d.setFailureHook(null);assert.equal(await d.get('attempts',att.id),undefined);assert.deepEqual(await s.replay(j,a.checkpoint),a);});
it('idempotence compares every header; divergent ID quarantined',async()=>{const d=new MemoryStorageDriver(),s=new DefaultCognitiveStore(d),j=journey(),e=pred(j);const a=await s.append(e,j,zero,[]);assert.deepEqual(await s.append(e,j,zero,[]),a);await assert.rejects(s.append({...e,at:'2026-11-17T13:00:00Z'},j,zero,[]),/EVENT_ID_COLLISION/);assert.equal((await s.getQuarantinedEvents(j.journeyId)).length,1);});
it('rejects stale previous hash and sequence gaps without altering chain',async()=>{const s=new DefaultCognitiveStore(new MemoryStorageDriver()),j=journey(),a=await s.append(pred(j),j,zero,[]);const e=first(j,a.checkpoint);await assert.rejects(s.append({...e,previous_sha256:'b'.repeat(64)},j,a.checkpoint,[]),/STALE_HASH/);await assert.rejects(s.append({...e,sequence:3},j,a.checkpoint,[]),/CHAIN_DIVERGENCE/);assert.deepEqual(await s.replay(j,a.checkpoint),a);});
it('rejects foreign replay and stale checkpoint',async()=>{const s=new DefaultCognitiveStore(new MemoryStorageDriver()),j=journey(),a=await s.append(pred(j),j,zero,[]);await assert.rejects(s.replay({...j,taskInstanceId:'foreign'},a.checkpoint),/IDENTITY_MISMATCH/);await assert.rejects(s.replay(j,zero),/STALE_HASH/);});
it('retry preserves parent provenance across child genesis',async()=>{const d=new MemoryStorageDriver(),s=store(d),p=journey(),c=journey('jrn:child');const a=await s.append(pred(p),p,zero,[]);const e=first(p,a.checkpoint),att=await attemptFor(d,p,e,[]);const b=await s.append(e,p,a.checkpoint,[],att);assert.deepEqual(await s.retry(p,b.checkpoint,c),createGenesisSnapshot(c));await s.append(pred(c),c,zero,[]);const meta=await d.get<any>('cognitive_journeys',c.journeyId);assert.deepEqual(meta.parentJourney,p);assert.deepEqual(meta.parentCheckpoint,b.checkpoint);assert.deepEqual(await s.replay(p,b.checkpoint),b);});
it('rejects boundary feedback without boundary commitment',async()=>{const s=new DefaultCognitiveStore(new MemoryStorageDriver()),j=journey(),a=await s.append(pred(j),j,zero,[]);await assert.rejects(s.append(event(j,a.checkpoint,'BOUNDARY_FEEDBACK_VIEWED',{boundary_event_id:'forged',reference_ref:task}),j,a.checkpoint,[]),/INVALID_STAGE/);});
it('rejects concurrent conflicting appends',async()=>{const s=new DefaultCognitiveStore(new MemoryStorageDriver()),j=journey(),e=pred(j);const outcomes=await Promise.allSettled([s.append(e,j,zero,[]),s.append({...e,event_id:'different'},j,zero,[])]);assert.equal(outcomes.filter(x=>x.status==='fulfilled').length,1);});

import {readFileSync} from 'node:fs';
it('verifies A11 pinned hashes and rejects incomplete live evidence',async()=>{
 const f=JSON.parse(readFileSync('fixtures/synthetic/session.synthetic.json','utf8'));
 const j:JourneyKey={journeyId:f.journey_id,taskInstanceId:f.task_instance_id,releaseId:f.release_id,task:f.task_ref};
 const s=new DefaultCognitiveStore(new MemoryStorageDriver());let snap=createGenesisSnapshot(j);
 let previous:string|null=null;for(const e of f.history){assert.equal(e.previous_sha256,previous);previous=await computeEventHash(e);}
 assert.equal(f.history.length,f.event_count);assert.equal(previous,f.chain_head_sha256);
 await assert.rejects(async()=>{for(const e of f.history)snap=await s.append(e,j,snap.checkpoint,[]);},/INVALID_LINEAGE/);
});

it('Stage4: strict timestamps, task type and exact reference grammar',async()=>{
 const e=pred(journey());
 for(const at of ['2026-02-30T00:00:00Z','November 18 2026 Z','2026-11-17T24:00:00Z'])await assert.rejects(computeEventHash({...e,at}),/INVALID_EVENT_SCHEMA/);
 await assert.rejects(computeEventHash({...e,task_ref:{...task,id:'?invalid id!'}}),/INVALID_EVENT_SCHEMA/);
 await assert.rejects(computeEventHash({...e,task_ref:{...task,type:'SOLUTION'}}),/INVALID_EVENT_SCHEMA/);
 assert.match(await computeEventHash({...e,at:'2024-02-29T00:00:00.12Z'}),/^[0-9a-f]{64}$/);
});
it('Stage4: reject coherently rehashed archive with omitted journey',async()=>{
 const d=new MemoryStorageDriver(),s=store(d),j=journey();const p=await s.append(pred(j),j,zero,[]),e=first(j,p.checkpoint),a=await attemptFor(d,j,e,[]);
 await s.append(e,j,p.checkpoint,[],a);
 const bundle=JSON.parse(await (await s.exportAll()).text());bundle.data.journeys=[];bundle.checksum=await computeSha256(canonicalJson(bundle.data));
 const fresh=new MemoryStorageDriver();await assert.rejects(store(fresh).importVerified(new Blob([JSON.stringify(bundle)])),/missing event/);
 assert.equal((await fresh.getAll('attempts')).length,0);assert.equal((await fresh.getAll('sessions')).length,0);
});
it('Stage4: retry preserves original origin and rejects alternate origin commitment',async()=>{
 const d=new MemoryStorageDriver(),s=store(d),p=journey(),j=journey('jrn:retry');
 const a=await s.append(pred(p),p,zero,[]),e=first(p,a.checkpoint),att=await attemptFor(d,p,e,[]);const b=await s.append(e,p,a.checkpoint,[],att);
 await s.retry(p,b.checkpoint,j);const c=await s.append(pred(j),j,zero,[]),ne=first(j,c.checkpoint),wrong=await attemptFor(d,j,ne,[]);
 const lineage={...wrong.cognitive!,parentJourney:p};
 await assert.rejects(s.append(ne,j,c.checkpoint,[],{...wrong,cognitive:lineage}),/origin differs/);
 assert.equal(await d.get('attempts',wrong.id),undefined);
 const right={...wrong,cognitive:{...lineage,originSessionId:att.cognitive!.originSessionId,originRef:att.cognitive!.originRef,originCursor:att.cognitive!.originCursor}};
 assert.equal((await s.append(ne,j,c.checkpoint,[],right)).stage,'RECONSTRUCT');
});
it('Stage4: prediction draft restores its exact stage, lineage and revision',async()=>{
 const d=new MemoryStorageDriver(),s=store(d),j=journey(),session:Session={id:'ses:draft',releaseId:j.releaseId,item:j.task,mode:'PRACTICE',origin:null,returnRoute:null,cursor:4,attemptIds:[],draftId:null};
 await d.put('sessions',session.id,session);
 const snap=await s.begin(j,session.id);
 const lineage={journey:j,firstAttemptId:null,parentJourney:null,originSessionId:session.id,originRef:session.item,originCursor:4,stage:snap.stage,checkpoint:snap.checkpoint};
 const p=new DefaultProgressStore(d),response={kind:'CONSTRUCTED_RESPONSE' as const,value:'unsure'};
 await p.saveDraft(session,response,[],0,lineage);assert.deepEqual((await new DefaultProgressStore(d).loadDraft(session.id))?.cognitive,lineage);
 const blob=await s.exportAll(),fresh=new MemoryStorageDriver();await store(fresh).importVerified(blob);
 assert.deepEqual((await new DefaultProgressStore(fresh).loadDraft(session.id))?.cognitive,lineage);
 await assert.rejects(p.saveDraft(session,response,[],1,{...lineage,stage:'REPAIR'}),/stale cognitive draft/);
});
