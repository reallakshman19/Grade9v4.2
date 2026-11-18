// A48: exact journey/checkpoint binding, schema payload validation, immutable replay.
import type { CognitiveEvent,CognitiveSnapshot,CognitiveStage,WorkArtifact,Ref,JourneyKey,Checkpoint,Attempt,Session } from './types.ts';
import type { CognitiveStore } from './contracts.ts';
import { type StorageDriver,type TransactionContext,createStorageDriver } from './storage.ts';
import { canonicalJson,computeSha256,sameRef } from './loader.ts';
import { validateResponse,findDuplicateKeyInJson } from './response.ts';
import { DefaultProgressStore,type ExportDataPayload } from './progress.ts';
import type { DraftRecord } from './storage.ts';
export const COGNITIVE_EVENT_SCHEMA_VERSION='g9-cognitive-event/2';
const HISTORICAL_INSTANCE_VERSION='g9-cognitive-event/1';
export const COGNITIVE_EXPORT_VERSION='g9-cognitive-export/2.0';
export class CognitiveStoreError extends Error {readonly code:string;constructor(code:string,message:string){super(message+' ('+code+')');this.name='CognitiveStoreError';this.code=code;}}
export interface QuarantineRecord{readonly id:string;readonly journeyId:string;readonly event:CognitiveEvent;readonly reason:string;readonly recordedAt:string;}
export interface JourneyMeta{readonly journey:JourneyKey;readonly parentJourney:JourneyKey|null;readonly parentCheckpoint:Checkpoint|null;readonly origin?:{readonly sessionId:string;readonly ref:Ref;readonly cursor:number};readonly imported?:boolean;}
const guard=(ok:unknown,code:string,message:string)=>{if(!ok)throw new CognitiveStoreError(code,message);};
const equal=(a:unknown,b:unknown)=>a===undefined||b===undefined?a===b:canonicalJson(a)===canonicalJson(b);
const identity=(e:CognitiveEvent):JourneyKey=>({journeyId:e.journey_id,taskInstanceId:e.task_instance_id,task:e.task_ref,releaseId:e.release_id});
const sameJourney=(a:JourneyKey,b:JourneyKey)=>a.journeyId===b.journeyId&&a.taskInstanceId===b.taskInstanceId&&a.releaseId===b.releaseId&&sameRef(a.task,b.task);
const str=(v:unknown)=>typeof v==='string'&&v.trim().length>0;
const record=(v:unknown):v is Record<string,unknown>=>!!v&&typeof v==='object'&&!Array.isArray(v);
const strings=(v:unknown)=>Array.isArray(v)&&v.every(str)&&new Set(v).size===v.length;
const refOk=(r:unknown)=>record(r)&&Object.keys(r).sort().join(',')==='id,revision,sha256,type'&&str(r.id)&&typeof r.type==='string'&&['SOURCE','OCCURRENCE','QUESTION','ASSESSMENT','WARRANT','QRT','CONSTRUCTION','LESSON','FRESH_TASK','SOLUTION','RELATIONSHIP','PRESENTATION','CONCEPT','ASSET','PROGRAMME','EXAM_EDITION','PAPER','STIMULUS','APPROVAL','RELEASE','SUBJECT_PROFILE'].includes(r.type)&&Number.isSafeInteger(r.revision)&&Number(r.revision)>0&&typeof r.sha256==='string'&&/^[a-f0-9]{64}$/.test(r.sha256);
const responseMap=(r:unknown)=>{if(!record(r)||Object.keys(r).length===0)return false;try{for(const x of Object.values(r))validateResponse(x);return true;}catch{return false;}};
const payloadRules:Record<string,Record<string,(v:unknown)=>unknown>>={
 PREDICTION_COMMITTED:{prediction:str,artifact_ids:strings},
 HELP_EXPOSED:{capability:v=>['H1','H2','H3','READ_ANCHOR','MODEL_AUTO_CALCULATE','MODEL_MANIPULATE'].includes(String(v)),asset_ref:refOk,ordinal:v=>Number.isSafeInteger(v)&&Number(v)>0},
 FIRST_COMMITTED:{responses:responseMap,work:strings,help_event_ids:strings},
 RECONSTRUCTION_COMMITTED:{first_event_id:str,comparison:v=>record(v)&&Object.keys(v).length>0&&Object.values(v).every(record),reference_ref:refOk},
 DIAGNOSIS_COMMITTED:{move_id:str,why:str},
 REPAIR_COMMITTED:{first_event_id:str,work:v=>strings(v)&&Array.isArray(v)&&v.length>0,why:str},
 BOUNDARY_COMMITTED:{boundary_task_ref:refOk,responses:responseMap,work:strings,help_event_ids:strings},
 BOUNDARY_FEEDBACK_VIEWED:{boundary_event_id:str,reference_ref:refOk},
 SOURCE_RETURNED:{origin_session_id:str,origin_ref:refOk,cursor:v=>Number.isSafeInteger(v)&&Number(v)>=0}
};
function validateEvent(e:CognitiveEvent):void{
 guard(record(e)&&Object.keys(e).sort().join(',')==='at,event_id,event_type,journey_id,payload,previous_sha256,release_id,schema_version,sequence,task_instance_id,task_ref'&&[COGNITIVE_EVENT_SCHEMA_VERSION,HISTORICAL_INSTANCE_VERSION].includes(e.schema_version)&&str(e.event_id)&&str(e.journey_id)&&str(e.release_id)&&str(e.task_instance_id)&&refOk(e.task_ref)&&Number.isSafeInteger(e.sequence)&&e.sequence>0&&str(e.at)&&Number.isFinite(Date.parse(e.at))&&/(Z|\+00:00)$/.test(e.at)&&(e.sequence===1?e.previous_sha256===null:typeof e.previous_sha256==='string'&&/^[a-f0-9]{64}$/.test(e.previous_sha256)),'INVALID_EVENT_SCHEMA','Invalid event header');
 const rules=Object.hasOwn(payloadRules,e.event_type)?payloadRules[e.event_type]:undefined;
 guard(rules&&record(e.payload)&&Object.keys(e.payload).sort().join(',')===Object.keys(rules).sort().join(',')&&Object.entries(rules).every(([k,fn])=>fn((e.payload as unknown as Record<string,unknown>)[k])),'INVALID_EVENT_SCHEMA','Invalid event payload');
}
export async function computeEventHash(event:CognitiveEvent):Promise<string>{validateEvent(event);return computeSha256(canonicalJson(event));}
export function createGenesisSnapshot(journey:JourneyKey):CognitiveSnapshot{return {journey:structuredClone(journey),checkpoint:{sequence:0,sha256:null},stage:'PREDICT',firstAttemptId:null,boundaryAttemptId:null,assisted:false,lastHash:null,eventIds:[]};}
export function applyEventToSnapshot(current:CognitiveSnapshot,event:CognitiveEvent,eventHash:string):CognitiveSnapshot{
 let stage:CognitiveStage=current.stage,first=current.firstAttemptId,boundary=current.boundaryAttemptId,assisted=current.assisted;
 const requireStage=(s:CognitiveStage)=>guard(stage===s,'INVALID_STAGE','Expected '+s+', found '+stage);
 switch(event.event_type){
 case 'PREDICTION_COMMITTED':requireStage('PREDICT');stage='ATTEMPT';break;
 case 'HELP_EXPOSED':guard(stage==='ATTEMPT','INVALID_STAGE','Help requires prediction and an open first attempt');assisted=true;break;
 case 'FIRST_COMMITTED':requireStage('ATTEMPT');first=event.event_id;stage='RECONSTRUCT';break;
 case 'RECONSTRUCTION_COMMITTED':requireStage('RECONSTRUCT');guard(event.payload.first_event_id===first,'INVALID_LINEAGE','Wrong first event');stage='DIAGNOSE';break;
 case 'DIAGNOSIS_COMMITTED':requireStage('DIAGNOSE');stage='REPAIR';break;
 case 'REPAIR_COMMITTED':requireStage('REPAIR');guard(event.payload.first_event_id===first,'INVALID_LINEAGE','Wrong first event');stage='BOUNDARY_TEST';break;
 case 'BOUNDARY_COMMITTED':requireStage('BOUNDARY_TEST');guard(!boundary&&!sameRef(event.payload.boundary_task_ref,event.task_ref),'INVALID_LINEAGE','Boundary must be distinct and committed once');boundary=event.event_id;break;
 case 'BOUNDARY_FEEDBACK_VIEWED':requireStage('BOUNDARY_TEST');guard(!!boundary&&event.payload.boundary_event_id===boundary,'INVALID_LINEAGE','Boundary commit required');stage='COMPLETE';break;
 case 'SOURCE_RETURNED':requireStage('COMPLETE');break;
 }
 return {...current,stage,firstAttemptId:first,boundaryAttemptId:boundary,assisted,lastHash:eventHash,checkpoint:{sequence:event.sequence,sha256:eventHash},eventIds:[...current.eventIds,event.event_id]};
}
async function rebuild(events:readonly CognitiveEvent[],journey:JourneyKey):Promise<CognitiveSnapshot>{
 let snap=createGenesisSnapshot(journey);const help:string[]=[];let hint=0,returned=false,previousTime=-Infinity;
 for(const e of [...events].sort((a,b)=>a.sequence-b.sequence)){
   validateEvent(e);guard(sameJourney(identity(e),journey)&&e.sequence===snap.checkpoint.sequence+1&&e.previous_sha256===snap.lastHash&&!snap.eventIds.includes(e.event_id),'CORRUPT_CHAIN','Identity, sequence or previous hash mismatch');
   const at=Date.parse(e.at);guard(at>=previousTime,'INVALID_LINEAGE','Reversed event chronology');previousTime=at;
   if(e.event_type==='HELP_EXPOSED'){guard(e.payload.ordinal===help.length+1,'INVALID_LINEAGE','Wrong help ordinal');if(['H1','H2','H3'].includes(e.payload.capability)){guard(e.payload.capability===['H1','H2','H3'][hint],'INVALID_LINEAGE','Hint sequence');hint++;}help.push(e.event_id);}
   if(e.event_type==='FIRST_COMMITTED'||e.event_type==='BOUNDARY_COMMITTED')guard(equal(e.payload.help_event_ids,e.event_type==='FIRST_COMMITTED'?help:[]),'INVALID_LINEAGE','Help lineage mismatch');
   if(e.event_type==='SOURCE_RETURNED'){guard(!returned,'INVALID_LINEAGE','Source return already committed');returned=true;}
   snap=applyEventToSnapshot(snap,e,await computeEventHash(e));
 }
 return snap;
}
const EVIDENCE_STORES=['artifacts','cognitive_journeys','cognitive_event_ids','cognitive_event_work','cognitive_work_digest','cognitive_artifact_owner','cognitive_event_attempt','cognitive_attempt_event','cognitive_instances','attempts','attempt_authority','sessions','artifact_owners','drafts'] as const;
const workIds=(e:CognitiveEvent):readonly string[]=>e.event_type==='PREDICTION_COMMITTED'?e.payload.artifact_ids:e.event_type==='FIRST_COMMITTED'||e.event_type==='REPAIR_COMMITTED'||e.event_type==='BOUNDARY_COMMITTED'?e.payload.work:[];
const isCommit=(e:CognitiveEvent)=>e.event_type==='FIRST_COMMITTED'||e.event_type==='BOUNDARY_COMMITTED';
function validArtifact(a:WorkArtifact){try{return record(a)&&Object.keys(a).sort().join(',')==='id,kind,value,version'&&str(a.id)&&a.version===1&&['NOTE','EQUATION','INK','TABLE','GRAPH','STRUCTURE','ATTACHMENT'].includes(a.kind)&&canonicalJson(a.value)!==undefined;}catch{return false;}}
function originOf(a:Attempt){const l=a.cognitive;guard(l,'INVALID_LINEAGE','Missing cognitive lineage');return {sessionId:l!.originSessionId,ref:l!.originRef,cursor:l!.originCursor};}
async function checkAttempt(tx:TransactionContext,e:CognitiveEvent,a:Attempt,meta:JourneyMeta,firstId:string|null):Promise<void>{
  guard(e.event_type==='FIRST_COMMITTED'||e.event_type==='BOUNDARY_COMMITTED','INVALID_LINEAGE','Not a commitment');
  if(e.event_type!=='FIRST_COMMITTED'&&e.event_type!=='BOUNDARY_COMMITTED')return;
  const item=e.event_type==='FIRST_COMMITTED'?e.task_ref:e.payload.boundary_task_ref;
  const l=a.cognitive;
  guard(l&&sameJourney(l.journey,meta.journey)&&a.releaseId===e.release_id&&sameRef(a.item,item)&&sameRef(l.journey.task,e.task_ref)&&l.firstAttemptId===(e.event_type==='FIRST_COMMITTED'?null:firstId)&&equal(l.parentJourney,meta.parentJourney),'INVALID_LINEAGE','Attempt journey, task or retry differs');
  guard(a.response.kind==='MULTIPART'&&equal(a.response.value,e.payload.responses)&&equal(a.hintIds,e.payload.help_event_ids)&&equal(a.work.map(w=>w.id),e.payload.work)&&Date.parse(a.submittedAt)<=Date.parse(e.at),'INVALID_LINEAGE','Attempt response, help, work or time differs');
  const session=await tx.get<Session>('sessions',a.sessionId);
  guard(session&&session.releaseId===a.releaseId&&sameRef(session.item,item)&&session.attemptIds.includes(a.id)&&session.mode!=='SIMULATED_EXAM','INVALID_LINEAGE','Missing or ineligible durable session');
  guard(meta.origin&&equal(originOf(a),meta.origin),'INVALID_LINEAGE','Attempt origin differs');
  const origin=await tx.get<Session>('sessions',meta.origin!.sessionId);
  guard(origin&&origin.releaseId===e.release_id&&sameRef(origin.item,meta.origin!.ref),'INVALID_LINEAGE','Original session missing or stale');
  const authority=await tx.get<string>('attempt_authority',a.id);
  guard(authority==='LOCAL_VERIFIED_SCORE'||meta.imported&&authority==='IMPORTED_UNAUTHENTICATED','INVALID_LINEAGE','Attempt lacks qualified durable provenance');
}
async function verifyEvidence(tx:TransactionContext,events:readonly CognitiveEvent[],meta:JourneyMeta):Promise<void>{
  guard(await tx.get('cognitive_instances',meta.journey.taskInstanceId)===meta.journey.journeyId,'INVALID_LINEAGE','Instance owner differs');
  let firstId:string|null=null;
  for(const e of [...events].sort((a,b)=>a.sequence-b.sequence)){
    guard(equal(await tx.get('cognitive_event_ids',e.event_id),e),'CORRUPT_CHAIN','Event index mismatch');
    const ids=workIds(e),linked=await tx.get<readonly string[]>('cognitive_event_work',e.event_id);
    guard(linked&&equal(linked,ids),'INVALID_LINEAGE','Missing event work relationship');
    const digests=await tx.get<readonly string[]>('cognitive_work_digest',e.event_id);
    guard(digests&&digests.length===ids.length,'INVALID_LINEAGE','Missing artifact digest');
    for(let i=0;i<ids.length;i++){const a=await tx.get<WorkArtifact>('artifacts',ids[i]);guard(a&&validArtifact(a)&&await tx.get('cognitive_artifact_owner',ids[i])===meta.journey.journeyId&&await computeSha256(canonicalJson(a))===digests![i],'INVALID_LINEAGE','Missing, changed or foreign work artifact');}
    if(isCommit(e)){
      const binding=await tx.get<{id:string;sha256:string}>('cognitive_event_attempt',e.event_id);
      guard(binding&&await tx.get('cognitive_attempt_event',binding.id)===e.event_id,'INVALID_LINEAGE','No durable attempt binding');
      const a=await tx.get<Attempt>('attempts',binding!.id);
      guard(a&&await computeSha256(canonicalJson(a))===binding!.sha256,'INVALID_LINEAGE','Missing or changed attempt');
      await checkAttempt(tx,e,a!,meta,firstId);
      for(const art of a!.work)guard(equal(await tx.get('artifacts',art.id),art)&&await tx.get('artifact_owners',art.id)===a!.sessionId,'INVALID_LINEAGE','Attempt artifact changed');
      if(e.event_type==='FIRST_COMMITTED')firstId=a!.id;
    }
    if(e.event_type==='SOURCE_RETURNED')guard(meta.origin&&e.payload.origin_session_id===meta.origin.sessionId&&sameRef(e.payload.origin_ref,meta.origin.ref)&&e.payload.cursor===meta.origin.cursor,'INVALID_LINEAGE','Wrong original source return');
  }
}
interface ArchivedEvent {readonly event:CognitiveEvent;readonly workDigests:readonly string[];readonly attempt:{readonly id:string;readonly sha256:string}|null}
interface ArchivedJourney {readonly meta:JourneyMeta;readonly checkpoint:Checkpoint;readonly events:readonly ArchivedEvent[]}
interface CognitiveArchive {readonly progress:ExportDataPayload;readonly journeys:readonly ArchivedJourney[]}
async function verifyRetry(tx:TransactionContext,meta:JourneyMeta,seen=new Set<string>()):Promise<void>{
  const id=meta.journey.journeyId;guard(!seen.has(id),'INVALID_LINEAGE','Retry cycle');seen.add(id);
  if(!meta.parentJourney){guard(meta.parentCheckpoint===null,'INVALID_LINEAGE','Unexpected parent checkpoint');return;}
  const parent=await tx.get<JourneyMeta>('cognitive_journeys',meta.parentJourney.journeyId);
  guard(parent&&sameJourney(parent.journey,meta.parentJourney)&&meta.parentCheckpoint&&sameRef(parent.journey.task,meta.journey.task)&&parent.journey.releaseId===meta.journey.releaseId&&parent.journey.taskInstanceId!==meta.journey.taskInstanceId,'INVALID_LINEAGE','Retry parent missing or mismatched');
  const events=await tx.getAll<CognitiveEvent>('cog_events:'+parent!.journey.journeyId);
  const prefix=events.filter(e=>e.sequence<=meta.parentCheckpoint!.sequence);
  const snapshot=await rebuild(prefix,parent!.journey);
  guard(equal(snapshot.checkpoint,meta.parentCheckpoint),'INVALID_LINEAGE','Retry parent prefix changed');
  await verifyEvidence(tx,prefix,parent!);await verifyRetry(tx,parent!,seen);
}
export class DefaultCognitiveStore implements CognitiveStore {
 private readonly driver:StorageDriver;
 private readonly progress:DefaultProgressStore;
 constructor(driver:StorageDriver=createStorageDriver(),progress?:DefaultProgressStore){this.driver=driver;this.progress=progress??new DefaultProgressStore(driver);}
 private async names(journeyIds:readonly string[]=[]):Promise<string[]>{const metas=await this.driver.getAll<JourneyMeta>('cognitive_journeys');return [...new Set([...EVIDENCE_STORES,...[...journeyIds,...metas.map(m=>m.journey.journeyId)].flatMap(id=>['cog_events:'+id,'cog_snap:'+id])])];}
 async append(event:CognitiveEvent,expected:JourneyKey,checkpoint:Checkpoint,work:readonly WorkArtifact[],attempt?:Attempt):Promise<CognitiveSnapshot>{
   event=structuredClone(event);expected=structuredClone(expected);checkpoint=structuredClone(checkpoint);work=structuredClone(work);attempt=attempt&&structuredClone(attempt);
   validateEvent(event);guard(sameJourney(identity(event),expected),'IDENTITY_MISMATCH','Wrong journey, task, instance or release');
   const id=expected.journeyId,eventsKey='cog_events:'+id,snapKey='cog_snap:'+id;
   try{return await this.driver.transaction(await this.names([id]),'readwrite',async tx=>{
     let meta=await tx.get<JourneyMeta>('cognitive_journeys',id);
     if(meta)guard(sameJourney(meta.journey,expected)&&!meta.imported,'IDENTITY_MISMATCH','Stored journey differs or imported history is read-only');
     const events=await tx.getAll<CognitiveEvent>(eventsKey);
     const current=await rebuild(events,expected);
     guard(!events.length||meta,'CORRUPT_CHAIN','Missing journey metadata');if(meta){await verifyEvidence(tx,events,meta);await verifyRetry(tx,meta);}
     const stored=await tx.get<CognitiveSnapshot>(snapKey,id);
     guard(!events.length||stored&&equal(stored,current),'CORRUPT_CHAIN','Missing or divergent stored checkpoint');
     const duplicate=await tx.get<CognitiveEvent>('cognitive_event_ids',event.event_id);
     if(duplicate){guard(equal(duplicate,event),'EVENT_ID_COLLISION','Duplicate event ID differs');guard(current.eventIds.includes(event.event_id),'IDENTITY_MISMATCH','Event belongs to another journey');const linked=await tx.get<readonly string[]>('cognitive_event_work',event.event_id);guard(equal(linked??[],work.map(a=>a.id)),'RECORD_CONFLICT','Duplicate event work differs');for(const a of work)guard(equal(await tx.get('artifacts',a.id),a),'RECORD_CONFLICT','Duplicate artifact differs');if(attempt){const binding=await tx.get<{id:string;sha256:string}>('cognitive_event_attempt',event.event_id);guard(binding&&binding.id===attempt.id&&binding.sha256===await computeSha256(canonicalJson(attempt)),'RECORD_CONFLICT','Duplicate commitment attempt differs');}return current;}
     guard(equal(checkpoint,current.checkpoint),'STALE_HASH','Expected checkpoint differs');
     guard(event.sequence===current.checkpoint.sequence+1,'CHAIN_DIVERGENCE','Sequence gap');
     guard(event.previous_sha256===current.lastHash,'STALE_HASH','Previous hash differs');
     const updated=await rebuild([...events,event],expected);
     const required=workIds(event);
     guard(equal(work.map(a=>a.id),required)&&new Set(required).size===required.length,'INVALID_LINEAGE','Attached work must equal event references');
     const owner=await tx.get<string>('cognitive_instances',expected.taskInstanceId);
     guard(!owner||owner===id,'INVALID_LINEAGE','Task instance belongs to another journey');
     if(!meta)meta={journey:expected,parentJourney:null,parentCheckpoint:null};
     if(isCommit(event)){
       guard(attempt&&equal(attempt.work,work),'INVALID_LINEAGE','Commit requires corresponding attempt and work');
       if(!meta.origin)meta={...meta,origin:originOf(attempt!)};
       const origin=await tx.get<Session>('sessions',meta.origin!.sessionId);
       guard(origin&&(current.firstAttemptId!==null||origin.cursor===meta.origin!.cursor),'INVALID_LINEAGE','Origin cursor must match at initial commitment');
       await this.progress.commitAttempt(tx,attempt!);
       const first=current.firstAttemptId?await tx.get<{id:string}>('cognitive_event_attempt',current.firstAttemptId):undefined;
       await checkAttempt(tx,event,attempt!,meta,first?.id??null);
       guard(!(await tx.get('cognitive_attempt_event',attempt!.id)),'INVALID_LINEAGE','Attempt already used by another commitment');
       await tx.put('cognitive_event_attempt',event.event_id,{id:attempt!.id,sha256:await computeSha256(canonicalJson(attempt))});
       await tx.put('cognitive_attempt_event',attempt!.id,event.event_id);
     }else guard(!attempt,'INVALID_LINEAGE','Attempt only belongs to a commitment');
     const digests:string[]=[];
     for(const a of work){guard(validArtifact(a),'INVALID_EVENT_SCHEMA','Invalid artifact');const old=await tx.get<WorkArtifact>('artifacts',a.id);guard(!old||equal(old,a),'RECORD_CONFLICT','Immutable artifact conflict');const own=await tx.get<string>('cognitive_artifact_owner',a.id);guard(!own||own===id,'INVALID_LINEAGE','Cross-journey artifact');if(event.event_type==='REPAIR_COMMITTED'||event.event_type==='BOUNDARY_COMMITTED')guard(!own,'INVALID_LINEAGE','Repair and boundary require new work IDs');if(!old)await tx.put('artifacts',a.id,a);await tx.put('cognitive_artifact_owner',a.id,id);digests.push(await computeSha256(canonicalJson(a)));}
     await tx.put('cognitive_instances',expected.taskInstanceId,id);
     await tx.put('cognitive_journeys',id,meta);
     await tx.put('cognitive_event_work',event.event_id,required);await tx.put('cognitive_work_digest',event.event_id,digests);await tx.put(eventsKey,String(event.sequence),event);await tx.put('cognitive_event_ids',event.event_id,event);
     await verifyEvidence(tx,[...events,event],meta);
     await tx.put(snapKey,id,updated);return updated;
   });}catch(e){if(e instanceof CognitiveStoreError){try{const q:QuarantineRecord={id:crypto.randomUUID(),journeyId:id,event,reason:e.message,recordedAt:new Date().toISOString()};await this.driver.put('cognitive_quarantine',q.id,q);}catch{}}throw e;}
 }
 async replay(journey:JourneyKey,expectedCheckpoint:Checkpoint):Promise<CognitiveSnapshot>{
   const id=journey.journeyId,key='cog_events:'+id,snapKey='cog_snap:'+id;
   return this.driver.transaction(await this.names([id]),'readonly',async tx=>{
     const meta=await tx.get<JourneyMeta>('cognitive_journeys',id);guard(meta&&sameJourney(meta.journey,journey),'IDENTITY_MISMATCH','Missing or wrong replay identity');
     const events=await tx.getAll<CognitiveEvent>(key);const snap=await rebuild(events,journey);await verifyEvidence(tx,events,meta!);await verifyRetry(tx,meta!);
     guard(equal(snap.checkpoint,expectedCheckpoint),'STALE_HASH','Replay checkpoint mismatch');
     const stored=await tx.get<CognitiveSnapshot>(snapKey,id);guard(!events.length||stored&&equal(stored,snap),'CORRUPT_CHAIN','Missing or divergent stored snapshot');return snap;
   });
 }
 async retry(parent:JourneyKey,checkpoint:Checkpoint,next:JourneyKey):Promise<CognitiveSnapshot>{
   guard(parent.journeyId!==next.journeyId&&parent.taskInstanceId!==next.taskInstanceId&&sameRef(parent.task,next.task)&&parent.releaseId===next.releaseId,'IDENTITY_MISMATCH','Retry requires new journey and instance for same task and release');
   const key='cog_events:'+parent.journeyId;
   return this.driver.transaction(await this.names([parent.journeyId,next.journeyId]),'readwrite',async tx=>{
     const meta=await tx.get<JourneyMeta>('cognitive_journeys',parent.journeyId);guard(meta&&sameJourney(meta.journey,parent),'JOURNEY_NOT_FOUND','Parent not found');
     const events=await tx.getAll<CognitiveEvent>(key);const snap=await rebuild(events,parent);await verifyEvidence(tx,events,meta!);await verifyRetry(tx,meta!);guard(!meta!.imported&&equal(snap.checkpoint,checkpoint),'STALE_HASH','Parent checkpoint mismatch or imported history');
     guard(!(await tx.get('cognitive_journeys',next.journeyId))&&!(await tx.get('cognitive_instances',next.taskInstanceId)),'EVENT_ID_COLLISION','Retry journey or instance already exists');await tx.put('cognitive_instances',next.taskInstanceId,next.journeyId);
     await tx.put('cognitive_journeys',next.journeyId,{journey:next,parentJourney:parent,parentCheckpoint:checkpoint} satisfies JourneyMeta);return createGenesisSnapshot(next);
   });
 }
 // R4 original v1 has no task instance; preserve exact input, original hashes, and quarantine.
 // A migration cannot invent the missing durable attempts or source identity.
 async quarantineLegacy(raw:string):Promise<{id:string;disposition:'QUARANTINED';reason:string}>{
   guard(!findDuplicateKeyInJson(raw),'INVALID_EVENT_SCHEMA','Duplicate legacy JSON key');
   const original:unknown=JSON.parse(raw);guard(Array.isArray(original)&&original.length>0,'INVALID_EVENT_SCHEMA','Expected original event array');
   const events=original as Record<string,unknown>[];let last:string|null=null;const hashes:string[]=[];
   const first=events[0];const seen=new Set<unknown>();
   for(let i=0;i<events.length;i++){
     const e=events[i];guard(record(e)&&e.schema_version===HISTORICAL_INSTANCE_VERSION&&!Object.hasOwn(e,'task_instance_id')&&e.sequence===i+1&&e.previous_sha256===last&&e.journey_id===first.journey_id&&e.release_id===first.release_id&&equal(e.task_ref,first.task_ref)&&!seen.has(e.event_id),'CORRUPT_CHAIN','Invalid original legacy chain');
     // Validate the original payload with a temporary schema-only sentinel, never persist it as identity.
     validateEvent({...e,task_instance_id:'SCHEMA_VALIDATION_ONLY'} as unknown as CognitiveEvent);
     seen.add(e.event_id);last=await computeSha256(canonicalJson(e));hashes.push(last);
   }
   const id=await computeSha256(raw),reason='ORIGINAL_R4_INSTANCE_AND_DURABLE_ATTEMPT_AUTHORITY_NOT_ESTABLISHED';
   const entry={id,raw,originalHashes:hashes,disposition:'QUARANTINED' as const,reason};
   await this.driver.transaction(['cognitive_legacy_quarantine'],'readwrite',async tx=>{const old=await tx.get('cognitive_legacy_quarantine',id);guard(!old||equal(old,entry),'RECORD_CONFLICT','Legacy evidence conflict');if(!old)await tx.put('cognitive_legacy_quarantine',id,entry);});
   return {id,disposition:'QUARANTINED',reason};
 }
 async readForDisclosure(journey:JourneyKey,checkpoint:Checkpoint):Promise<{snapshot:CognitiveSnapshot;events:readonly CognitiveEvent[];meta:JourneyMeta}>{
   const id=journey.journeyId;
   return this.driver.transaction(await this.names([id]),'readonly',async tx=>{
     const meta=await tx.get<JourneyMeta>('cognitive_journeys',id);
     guard(meta&&!meta.imported&&sameJourney(meta.journey,journey),'INVALID_LINEAGE','Missing live journey or imported history');
     const events=await tx.getAll<CognitiveEvent>('cog_events:'+id),snap=await rebuild(events,journey);
     const stored=await tx.get<CognitiveSnapshot>('cog_snap:'+id,id);
     guard(equal(snap.checkpoint,checkpoint)&&(!events.length||stored&&equal(stored,snap)),'STALE_HASH','Missing or stale disclosure checkpoint');
     await verifyEvidence(tx,events,meta!);await verifyRetry(tx,meta!);
     return {snapshot:snap,events:[...events].sort((a,b)=>a.sequence-b.sequence),meta:meta!};
   });
 }
 async replayForDisclosure(journey:JourneyKey,checkpoint:Checkpoint):Promise<CognitiveSnapshot>{return (await this.readForDisclosure(journey,checkpoint)).snapshot;}
 async exportAll():Promise<Blob>{
   const names=await this.names();
   const data=await this.driver.transaction(names,'readonly',async tx=>{
     const metas=await tx.getAll<JourneyMeta>('cognitive_journeys'),journeys:ArchivedJourney[]=[];
     for(const meta of metas){
       const id=meta.journey.journeyId,events=await tx.getAll<CognitiveEvent>('cog_events:'+id);
       const snap=await rebuild(events,meta.journey);await verifyEvidence(tx,events,meta);await verifyRetry(tx,meta);
       const stored=await tx.get<CognitiveSnapshot>('cog_snap:'+id,id);guard(!events.length||stored&&equal(stored,snap),'CORRUPT_CHAIN','Missing or stale snapshot');
       const entries:ArchivedEvent[]=[];for(const event of [...events].sort((a,b)=>a.sequence-b.sequence)){
         const workDigests=await tx.get<readonly string[]>('cognitive_work_digest',event.event_id);
         guard(workDigests,'INVALID_LINEAGE','Missing work digests');
         entries.push({event,workDigests:workDigests!,attempt:(await tx.get<ArchivedEvent['attempt']>('cognitive_event_attempt',event.event_id))??null});
       }
       journeys.push({meta,checkpoint:snap.checkpoint,events:entries});
     }
     const progress:ExportDataPayload={sessions:await tx.getAll<Session>('sessions'),drafts:await tx.getAll<DraftRecord>('drafts'),attempts:await tx.getAll<Attempt>('attempts'),artifacts:await tx.getAll<WorkArtifact>('artifacts')};
     return {progress,journeys} satisfies CognitiveArchive;
   });
   return new Blob([JSON.stringify({schema_version:COGNITIVE_EXPORT_VERSION,checksum:await computeSha256(canonicalJson(data)),data})],{type:'application/json'});
 }
 async importVerified(blob:Blob):Promise<void>{
   const raw=await blob.text();guard(!findDuplicateKeyInJson(raw),'INVALID_EVENT_SCHEMA','Duplicate archive key');
   const bundle=JSON.parse(raw) as {schema_version:string;checksum:string;data:CognitiveArchive};
   guard(bundle.schema_version===COGNITIVE_EXPORT_VERSION&&record(bundle.data)&&Array.isArray(bundle.data.journeys)&&await computeSha256(canonicalJson(bundle.data))===bundle.checksum,'INVALID_EVENT_SCHEMA','Invalid archive checksum or format');
   const data=bundle.data;const ids=data.journeys.map(j=>j.meta.journey.journeyId);
   guard(new Set(ids).size===ids.length&&ids.every(str),'INVALID_LINEAGE','Duplicate or invalid journey');
   await this.driver.transaction(await this.names(ids),'readwrite',async tx=>{
     for(const name of EVIDENCE_STORES.filter(n=>n.startsWith('cognitive_')))guard((await tx.getAll(name)).length===0,'RECORD_CONFLICT','Restore requires empty cognitive stores');
     await this.progress.restoreEmpty(tx,data.progress);
     for(const entry of data.journeys){
       const meta:JourneyMeta={...entry.meta,imported:true};
       const j=meta.journey;guard(str(j.journeyId)&&str(j.taskInstanceId)&&str(j.releaseId)&&refOk(j.task)&&!(await tx.get('cognitive_instances',j.taskInstanceId)),'INVALID_LINEAGE','Invalid or duplicate task instance');
       guard((await tx.getAll('cog_events:'+j.journeyId)).length===0&&!(await tx.get('cog_snap:'+j.journeyId,j.journeyId)),'RECORD_CONFLICT','Restore target already has events');
       await tx.put('cognitive_journeys',j.journeyId,meta);await tx.put('cognitive_instances',j.taskInstanceId,j.journeyId);
       for(const e of entry.events){
         const event=e.event;validateEvent(event);guard(!(await tx.get('cognitive_event_ids',event.event_id)),'EVENT_ID_COLLISION','Duplicate archive event');
         const work=workIds(event);guard(Array.isArray(e.workDigests)&&work.length===e.workDigests.length,'INVALID_LINEAGE','Missing work digest');
         for(const id of work){const own=await tx.get<string>('cognitive_artifact_owner',id);guard(!own||own===j.journeyId,'INVALID_LINEAGE','Cross-journey archive work');await tx.put('cognitive_artifact_owner',id,j.journeyId);}
         if(isCommit(event)){guard(e.attempt&&!(await tx.get('cognitive_attempt_event',e.attempt.id)),'INVALID_LINEAGE','Missing or reused attempt');await tx.put('cognitive_event_attempt',event.event_id,e.attempt);await tx.put('cognitive_attempt_event',e.attempt!.id,event.event_id);}else guard(e.attempt===null,'INVALID_LINEAGE','Unexpected attempt binding');
         await tx.put('cog_events:'+j.journeyId,String(event.sequence),event);await tx.put('cognitive_event_ids',event.event_id,event);await tx.put('cognitive_event_work',event.event_id,work);await tx.put('cognitive_work_digest',event.event_id,e.workDigests);
       }
       const events=entry.events.map(e=>e.event),snap=await rebuild(events,j);
       guard(equal(snap.checkpoint,entry.checkpoint),'STALE_HASH','Archive checkpoint differs');await tx.put('cog_snap:'+j.journeyId,j.journeyId,snap);
     }
     for(const entry of data.journeys){const meta=await tx.get<JourneyMeta>('cognitive_journeys',entry.meta.journey.journeyId);await verifyEvidence(tx,entry.events.map(e=>e.event),meta!);await verifyRetry(tx,meta!);}
   });
 }
 async getQuarantinedEvents(journeyId?:string):Promise<readonly QuarantineRecord[]>{const all=await this.driver.getAll<QuarantineRecord>('cognitive_quarantine');return journeyId?all.filter(q=>q.journeyId===journeyId):all;}
}
