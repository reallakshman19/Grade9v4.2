// A48: exact journey/checkpoint binding, schema payload validation, immutable replay.
import type { CognitiveEvent,CognitiveSnapshot,CognitiveStage,WorkArtifact,Ref,JourneyKey,Checkpoint } from './types.ts';
import type { CognitiveStore } from './contracts.ts';
import { type StorageDriver,type TransactionContext,createStorageDriver } from './storage.ts';
import { canonicalJson,computeSha256,sameRef } from './loader.ts';
import { validateResponse } from './response.ts';
export const COGNITIVE_EVENT_SCHEMA_VERSION='g9-cognitive-event/1';
export const COGNITIVE_EXPORT_VERSION='g9-cognitive-export/1.0';
export class CognitiveStoreError extends Error {readonly code:string;constructor(code:string,message:string){super(message+' ('+code+')');this.name='CognitiveStoreError';this.code=code;}}
export interface QuarantineRecord{readonly id:string;readonly journeyId:string;readonly event:CognitiveEvent;readonly reason:string;readonly recordedAt:string;}
export interface JourneyMeta{readonly journey:JourneyKey;readonly parentJourney:JourneyKey|null;readonly parentCheckpoint:Checkpoint|null;}
const guard=(ok:unknown,code:string,message:string)=>{if(!ok)throw new CognitiveStoreError(code,message);};
const equal=(a:unknown,b:unknown)=>canonicalJson(a)===canonicalJson(b);
const identity=(e:CognitiveEvent):JourneyKey=>({journeyId:e.journey_id,taskInstanceId:e.task_instance_id,task:e.task_ref,releaseId:e.release_id});
const sameJourney=(a:JourneyKey,b:JourneyKey)=>a.journeyId===b.journeyId&&a.taskInstanceId===b.taskInstanceId&&a.releaseId===b.releaseId&&sameRef(a.task,b.task);
const str=(v:unknown)=>typeof v==='string'&&v.length>0;
const record=(v:unknown):v is Record<string,unknown>=>!!v&&typeof v==='object'&&!Array.isArray(v);
const strings=(v:unknown)=>Array.isArray(v)&&v.every(str)&&new Set(v).size===v.length;
const refOk=(r:unknown)=>record(r)&&Object.keys(r).sort().join(',')==='id,revision,sha256,type'&&str(r.id)&&typeof r.type==='string'&&Number.isSafeInteger(r.revision)&&Number(r.revision)>0&&typeof r.sha256==='string'&&/^[a-f0-9]{64}$/.test(r.sha256);
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
 guard(record(e)&&Object.keys(e).sort().join(',')==='at,event_id,event_type,journey_id,payload,previous_sha256,release_id,schema_version,sequence,task_instance_id,task_ref'&&e.schema_version===COGNITIVE_EVENT_SCHEMA_VERSION&&str(e.event_id)&&str(e.journey_id)&&str(e.release_id)&&str(e.task_instance_id)&&refOk(e.task_ref)&&Number.isSafeInteger(e.sequence)&&e.sequence>0&&str(e.at)&&Number.isFinite(Date.parse(e.at))&&/(Z|\+00:00)$/.test(e.at)&&(e.sequence===1?e.previous_sha256===null:typeof e.previous_sha256==='string'&&/^[a-f0-9]{64}$/.test(e.previous_sha256)),'INVALID_EVENT_SCHEMA','Invalid event header');
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
 case 'HELP_EXPOSED':guard(stage!=='COMPLETE','INVALID_STAGE','Completed journey');assisted=true;break;
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
 let snap=createGenesisSnapshot(journey);const help=new Set<string>(),boundaryHelp=new Set<string>();
 for(const e of [...events].sort((a,b)=>a.sequence-b.sequence)){
   validateEvent(e);guard(sameJourney(identity(e),journey)&&e.sequence===snap.checkpoint.sequence+1&&e.previous_sha256===snap.lastHash&&!snap.eventIds.includes(e.event_id),'CORRUPT_CHAIN','Identity, sequence or previous hash mismatch');
   if(e.event_type==='HELP_EXPOSED'){guard(e.payload.ordinal===help.size+1,'INVALID_LINEAGE','Wrong help ordinal');help.add(e.event_id);if(snap.stage==='BOUNDARY_TEST')boundaryHelp.add(e.event_id);}
   if(e.event_type==='FIRST_COMMITTED'||e.event_type==='BOUNDARY_COMMITTED'){const scoped=e.event_type==='FIRST_COMMITTED'?help:boundaryHelp;guard(e.payload.help_event_ids.every(id=>scoped.has(id))&&e.payload.help_event_ids.length===scoped.size,'INVALID_LINEAGE','Help lineage mismatch');}
   snap=applyEventToSnapshot(snap,e,await computeEventHash(e));
 }
 return snap;
}
export class DefaultCognitiveStore implements CognitiveStore {
 private readonly driver:StorageDriver;
 constructor(driver:StorageDriver=createStorageDriver()){this.driver=driver;}
 async append(event:CognitiveEvent,expected:JourneyKey,checkpoint:Checkpoint,work:readonly WorkArtifact[]):Promise<CognitiveSnapshot>{
   validateEvent(event);guard(sameJourney(identity(event),expected),'IDENTITY_MISMATCH','Wrong journey, task, instance or release');
   const id=expected.journeyId,eventsKey='cog_events:'+id,snapKey='cog_snap:'+id;
   try{return await this.driver.transaction([eventsKey,snapKey,'artifacts','cognitive_journeys','cognitive_event_ids','cognitive_event_work'],'readwrite',async tx=>{
     const meta=await tx.get<JourneyMeta>('cognitive_journeys',id);
     if(meta)guard(sameJourney(meta.journey,expected),'IDENTITY_MISMATCH','Stored journey differs');
     const events=await tx.getAll<CognitiveEvent>(eventsKey);
     const current=await rebuild(events,expected);
     const stored=await tx.get<CognitiveSnapshot>(snapKey,id);
     if(stored)guard(equal(stored,current),'CORRUPT_CHAIN','Stored checkpoint diverges');
     const duplicate=await tx.get<CognitiveEvent>('cognitive_event_ids',event.event_id);
     if(duplicate){guard(equal(duplicate,event),'EVENT_ID_COLLISION','Duplicate event ID differs');guard(current.eventIds.includes(event.event_id),'IDENTITY_MISMATCH','Event belongs to another journey');const linked=await tx.get<readonly string[]>('cognitive_event_work',event.event_id);guard(equal(linked??[],work.map(a=>a.id)),'RECORD_CONFLICT','Duplicate event work differs');for(const a of work)guard(equal(await tx.get('artifacts',a.id),a),'RECORD_CONFLICT','Duplicate artifact differs');return current;}
     guard(equal(checkpoint,current.checkpoint),'STALE_HASH','Expected checkpoint differs');
     guard(event.sequence===current.checkpoint.sequence+1,'CHAIN_DIVERGENCE','Sequence gap');
     guard(event.previous_sha256===current.lastHash,'STALE_HASH','Previous hash differs');
     const updated=await rebuild([...events,event],expected);
     const required=event.event_type==='PREDICTION_COMMITTED'?event.payload.artifact_ids:[];
     guard(new Set(work.map(a=>a.id)).size===work.length,'INVALID_LINEAGE','Duplicate attached artifact');
     for(const a of work){guard(str(a.id)&&a.version===1&&['NOTE','EQUATION','INK','TABLE','GRAPH','STRUCTURE','ATTACHMENT'].includes(a.kind),'INVALID_EVENT_SCHEMA','Invalid artifact');const old=await tx.get<WorkArtifact>('artifacts',a.id);guard(!old||equal(old,a),'RECORD_CONFLICT','Immutable artifact conflict');if(!old)await tx.put('artifacts',a.id,a);}
     for(const key of required)guard(await tx.get('artifacts',key),'INVALID_LINEAGE','Missing work artifact');
     if(!meta)await tx.put('cognitive_journeys',id,{journey:expected,parentJourney:null,parentCheckpoint:null} satisfies JourneyMeta);
     await tx.put('cognitive_event_work',event.event_id,work.map(a=>a.id));await tx.put(eventsKey,String(event.sequence),event);await tx.put('cognitive_event_ids',event.event_id,event);await tx.put(snapKey,id,updated);return updated;
   });}catch(e){if(e instanceof CognitiveStoreError){try{const q:QuarantineRecord={id:crypto.randomUUID(),journeyId:id,event,reason:e.message,recordedAt:new Date().toISOString()};await this.driver.put('cognitive_quarantine',q.id,q);}catch{}}throw e;}
 }
 async replay(journey:JourneyKey,expectedCheckpoint:Checkpoint):Promise<CognitiveSnapshot>{
   const id=journey.journeyId,key='cog_events:'+id,snapKey='cog_snap:'+id;
   return this.driver.transaction([key,snapKey,'cognitive_journeys'],'readonly',async tx=>{
     const meta=await tx.get<JourneyMeta>('cognitive_journeys',id);if(meta)guard(sameJourney(meta.journey,journey),'IDENTITY_MISMATCH','Wrong replay identity');
     const snap=await rebuild(await tx.getAll<CognitiveEvent>(key),journey);
     guard(equal(snap.checkpoint,expectedCheckpoint),'STALE_HASH','Replay checkpoint mismatch');
     const stored=await tx.get<CognitiveSnapshot>(snapKey,id);if(stored)guard(equal(stored,snap),'CORRUPT_CHAIN','Stored snapshot mismatch');return snap;
   });
 }
 async retry(parent:JourneyKey,checkpoint:Checkpoint,next:JourneyKey):Promise<CognitiveSnapshot>{
   guard(parent.journeyId!==next.journeyId&&parent.taskInstanceId!==next.taskInstanceId&&sameRef(parent.task,next.task)&&parent.releaseId===next.releaseId,'IDENTITY_MISMATCH','Retry requires new journey and instance for same task and release');
   const key='cog_events:'+parent.journeyId;
   return this.driver.transaction([key,'cognitive_journeys'],'readwrite',async tx=>{
     const meta=await tx.get<JourneyMeta>('cognitive_journeys',parent.journeyId);guard(meta&&sameJourney(meta.journey,parent),'JOURNEY_NOT_FOUND','Parent not found');
     const snap=await rebuild(await tx.getAll<CognitiveEvent>(key),parent);guard(equal(snap.checkpoint,checkpoint),'STALE_HASH','Parent checkpoint mismatch');
     guard(!(await tx.get('cognitive_journeys',next.journeyId)),'EVENT_ID_COLLISION','Retry already exists');
     await tx.put('cognitive_journeys',next.journeyId,{journey:next,parentJourney:parent,parentCheckpoint:checkpoint} satisfies JourneyMeta);return createGenesisSnapshot(next);
   });
 }
 async getQuarantinedEvents(journeyId?:string):Promise<readonly QuarantineRecord[]>{const all=await this.driver.getAll<QuarantineRecord>('cognitive_quarantine');return journeyId?all.filter(q=>q.journeyId===journeyId):all;}
}
