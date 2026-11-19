import {canonicalJson,computeSha256,sameRef} from '../runtime/loader.ts';
import {refOk,DefaultProgressStore} from '../runtime/progress.ts';
import {validateResponse} from '../runtime/response.ts';
import {StandardAssessmentEngine,SCORING_VERSION} from '../runtime/assessment.ts';
import type {StorageDriver} from '../runtime/storage.ts';
import type {Attempt,Checkpoint,CognitiveEvent,CognitiveEventType,CognitivePayloads,CognitiveLineage,JourneyKey,JsonObject,Ref,Response,Session,TaskRef,WorkArtifact} from '../runtime/types.ts';
import {CognitiveController} from './cognitive-controller.ts';
import {computeEventHash} from '../runtime/cognitive-store.ts';
/**
 * web/journeys/core1b.ts
 * A32 — Core1B Fresh Transfer Journey Runtime.
 *
 * Implements:
 * - Native six-stage cognitive sequence:
 *   1. PREDICT       — Qualitative prediction before attempting
 *   2. ATTEMPT       — Unassisted attempt on Task A (Fresh Task)
 *   3. RECONSTRUCT   — Structured comparison against canonical reasoning
 *   4. DIAGNOSE      — Analysis of mistake patterns / misconception rules
 *   5. REPAIR        — Conceptual repair formulation
 *   6. BOUNDARY_TEST — Changed-condition evaluation on Task B (Boundary Task)
 *   -> COMPLETE      — Return to origin source with preserved session
 * - Strict Task A / Task B separation (Task A = Fresh, Task B = Boundary)
 * - Ordered hint exposure (H1 -> H2 -> H3) with exposure transaction tracking
 * - Precommit masking: solutions and comparison keys denied prior to commit-first
 * - Boundary draft persistence without destructive reset
 * - Non-destructive session preservation and event replay
 * - Rule 13 invariant preservation
 *
 * No academic approval inferred from software validation.
 */

export const CORE1B_BLUEPRINT_ID = 'BP-TRANSFER-CORE1B@1.0.0';

export type TransferStage =
  | 'PREDICT'
  | 'ATTEMPT'
  | 'RECONSTRUCT'
  | 'DIAGNOSE'
  | 'REPAIR'
  | 'BOUNDARY_TEST'
  | 'COMPLETE';

export const TRANSFER_ORDERED_STAGES: readonly TransferStage[] = [
  'PREDICT',
  'ATTEMPT',
  'RECONSTRUCT',
  'DIAGNOSE',
  'REPAIR',
  'BOUNDARY_TEST',
  'COMPLETE',
] as const;

export type HintLevel = 'H1' | 'H2' | 'H3';
export const ORDERED_HINTS: readonly HintLevel[] = ['H1', 'H2', 'H3'] as const;

export interface ExactRef {
  readonly type: string;
  readonly id: string;
  readonly revision: number;
  readonly sha256: string;
}

export interface TaskDefinition {
  readonly taskRef: ExactRef;
  readonly title: string;
  readonly prompt: string;
  readonly conditions: readonly string[];
  readonly solutionRef: ExactRef;
  readonly solutionSteps: readonly string[];
  readonly targetNumeric?: {
    readonly value: number;
    readonly unit: string;
    readonly tolerance: number;
  };
}

export interface HintItem {
  readonly level: HintLevel;
  readonly assetRef: ExactRef;
  readonly text: string;
  readonly guidance: string;
}

export interface DiagnosticRule {
  readonly code: string;
  readonly label: string;
  readonly misconceptionDescription: string;
  readonly correctiveGuidance: string;
}

export interface Core1BTransferDefinition {
  readonly journeyId: string;
  readonly originRef: ExactRef;
  readonly freshTaskA: TaskDefinition;
  readonly boundaryTaskB: TaskDefinition;
  readonly hints: readonly HintItem[];
  readonly diagnosticRules: readonly DiagnosticRule[];
  readonly qualitativePredictionPrompt: string;
  readonly predictionOptions: readonly string[];
  readonly expectedPredictionIndex: number;
  readonly status: 'SYNTHETIC' | 'HOLD' | 'CANDIDATE' | 'STALE' | 'PENDING_REVIEW';
}


export interface TransferBinding{
 readonly controller:CognitiveController;readonly driver:StorageDriver;readonly progress:DefaultProgressStore;readonly engine:StandardAssessmentEngine;
 readonly definitionSha256:string;readonly boundarySessionId:string;readonly assessmentA:Ref<'ASSESSMENT'>;readonly assessmentB:Ref<'ASSESSMENT'>;
 readonly loadProtected:(ref:Ref)=>Promise<Uint8Array>;
}
type Evidence=Awaited<ReturnType<CognitiveController['readEvidence']>>;
export interface Core1BDraft{readonly journeyId:string;readonly checkpoint:Checkpoint;readonly responses:Readonly<Record<string,Response>>;readonly work:readonly WorkArtifact[];readonly revision:number}
const nonblank=(s:unknown):s is string=>typeof s==='string'&&s.trim().length>0&&s.length<=100000;
const task=(t:TaskDefinition):TaskDefinition=>{
 if(!refOk(t.taskRef)||!['QUESTION','FRESH_TASK'].includes(t.taskRef.type)||!refOk(t.solutionRef)||t.solutionRef.type!=='SOLUTION'||!nonblank(t.title)||!nonblank(t.prompt)||!Array.isArray(t.conditions)||!t.conditions.every(nonblank))throw Error('INVALID_TASK');
 return structuredClone({taskRef:t.taskRef,title:t.title,prompt:t.prompt,conditions:t.conditions,solutionRef:t.solutionRef,solutionSteps:[]});
};
export type PublicTransferDefinition=Omit<Core1BTransferDefinition,'expectedPredictionIndex'>;
export function publicTransfer(d:Core1BTransferDefinition):PublicTransferDefinition{
 if(!nonblank(d.journeyId)||!refOk(d.originRef)||!nonblank(d.qualitativePredictionPrompt)||!Array.isArray(d.predictionOptions)||d.predictionOptions.length<2||!d.predictionOptions.every(nonblank)||!['SYNTHETIC','HOLD','CANDIDATE','STALE','PENDING_REVIEW'].includes(d.status))throw Error('INVALID_DEFINITION');
 const a=task(d.freshTaskA),boundary=task(d.boundaryTaskB),b={...boundary,title:'Boundary task (sealed)',prompt:'',conditions:[]};
 if(a.taskRef.type!=='FRESH_TASK'||new Set([d.originRef.id,a.taskRef.id,b.taskRef.id]).size!==3||a.taskRef.sha256===b.taskRef.sha256)throw Error('TASK_SEPARATION_VIOLATION');
 if(!Array.isArray(d.hints)||d.hints.length>3||d.hints.some((h,i)=>h.level!==ORDERED_HINTS[i]||!refOk(h.assetRef))||new Set(d.hints.map(h=>h.assetRef.id)).size!==d.hints.length||!Array.isArray(d.diagnosticRules)||d.diagnosticRules.some(r=>!nonblank(r.code)||!nonblank(r.label))||new Set(d.diagnosticRules.map(r=>r.code)).size!==d.diagnosticRules.length)throw Error('INVALID_HELP_OR_DIAGNOSIS');
 return structuredClone({journeyId:d.journeyId,originRef:d.originRef,freshTaskA:a,boundaryTaskB:b,hints:d.hints.map(h=>({level:h.level,assetRef:h.assetRef,text:'',guidance:''})),diagnosticRules:d.diagnosticRules.map(r=>({code:r.code,label:r.label,misconceptionDescription:'',correctiveGuidance:''})),qualitativePredictionPrompt:d.qualitativePredictionPrompt,predictionOptions:d.predictionOptions,status:d.status});
}
export async function transferDefinitionDigest(d:Core1BTransferDefinition){return computeSha256(canonicalJson(publicTransfer(d)));}
export class Core1BValidationError extends Error{readonly code:string;constructor(code:string,message:string){super(code+': '+message);this.code=code;}}
export class Core1BTransferJourney{
 private readonly definition:PublicTransferDefinition;private readonly binding?:TransferBinding;private evidence:Evidence|null=null;private busy=false;private blocked=false;
 private responses:Record<string,Response>={};private work:readonly WorkArtifact[]=[];private draftRevision=0;
 constructor(d:Core1BTransferDefinition,binding?:TransferBinding){this.definition=publicTransfer(d);this.binding=binding&&{...binding,assessmentA:structuredClone(binding.assessmentA),assessmentB:structuredClone(binding.assessmentB)};}
 getDefinition(){return structuredClone(this.definition);}getStage():TransferStage{return this.evidence?.snapshot.stage??'PREDICT';}
 isReady(){return !!this.evidence&&!this.blocked&&!this.busy;}isBusy(){return this.busy;}isSaveBlocked(){return this.blocked;}
 isFirstAttemptCommitted(){return !!this.evidence?.snapshot.firstAttemptId;}isBoundaryCommitted(){return !!this.evidence?.snapshot.boundaryAttemptId;}isAssistedAttempt(){return !!this.evidence?.snapshot.assisted;}
 isSourceReturned(){return !!this.evidence?.events.some(e=>e.event_type==='SOURCE_RETURNED');}
 getExposedHints(){const ids=this.evidence?.events.filter(e=>e.event_type==='HELP_EXPOSED').map(e=>e.payload.asset_ref)??[];return this.definition.hints.filter(h=>ids.some(x=>sameRef(x,h.assetRef as Ref))).map(h=>structuredClone(h));}
 getCheckpoint(){return structuredClone(this.evidence?.snapshot.checkpoint??null);}
 private b(){if(!this.binding||this.definition.status==='STALE'||this.definition.status==='PENDING_REVIEW')throw Error('TRANSFER_NOT_AUTHORIZED');return this.binding;}
 private checkIdentity(j:JourneyKey,ctx:Evidence['context'],session:Session,origin:Session){
  const d=this.definition,b=this.b();
  const fieldsMatch=(ref:Ref<'ASSESSMENT'>,task:Ref,fields:Readonly<Record<string,string>>)=>{const p=b.engine.describeMultipart(ref,task as TaskRef);return !!p&&Object.keys(p).length===Object.keys(fields).length&&Object.keys(fields).every(k=>Object.hasOwn(p,k)&&p[k].kind===fields[k]);};
  if(!fieldsMatch(b.assessmentA,ctx.task,ctx.firstFields)||!fieldsMatch(b.assessmentB,ctx.boundaryTask,ctx.boundaryFields))throw Error('ASSESSMENT_FIELD_BINDING_MISMATCH');
  if(j.journeyId!==d.journeyId||!sameRef(ctx.task,d.freshTaskA.taskRef as Ref)||!sameRef(ctx.boundaryTask,d.boundaryTaskB.taskRef as Ref)||!sameRef(ctx.firstReference,d.freshTaskA.solutionRef as Ref)||!sameRef(ctx.boundaryReference,d.boundaryTaskB.solutionRef as Ref)||!sameRef(origin.item,d.originRef as Ref)||origin.id===session.id||!session.origin||!sameRef(session.origin,origin.item))throw Error('TRANSFER_BINDING_MISMATCH');
 }
 private async checked(cp?:Checkpoint):Promise<Evidence>{
  const b=this.b(),d=this.definition,e=await b.controller.readEvidence(cp);
  this.checkIdentity(e.snapshot.journey,e.context,e.session,e.origin);
  if(b.definitionSha256!==await computeSha256(canonicalJson(d))||e.snapshot.journey.journeyId!==d.journeyId||!sameRef(e.context.task,d.freshTaskA.taskRef as Ref)||!sameRef(e.context.boundaryTask,d.boundaryTaskB.taskRef as Ref)||!sameRef(e.context.firstReference,d.freshTaskA.solutionRef as Ref)||!sameRef(e.context.boundaryReference,d.boundaryTaskB.solutionRef as Ref)||!sameRef(e.origin.item,d.originRef as Ref)||e.origin.id===e.session.id||!e.session.origin||!sameRef(e.session.origin,e.origin.item)||!refOk(b.assessmentA)||!refOk(b.assessmentB)||b.assessmentA.type!=='ASSESSMENT'||b.assessmentB.type!=='ASSESSMENT')throw Error('TRANSFER_BINDING_MISMATCH');
  return e;
 }
 private async activeSession(e:Evidence):Promise<Session>{
  if(e.snapshot.stage!=='BOUNDARY_TEST')return e.session;
  const s=await this.b().driver.get<Session>('sessions',this.b().boundarySessionId);
  if(!s||s.id===e.session.id||s.id===e.origin.id||s.releaseId!==e.session.releaseId||s.mode==='SIMULATED_EXAM'||!sameRef(s.item,e.context.boundaryTask)||!s.origin||!sameRef(s.origin,e.origin.item)||!s.contentRevision)throw Error('BOUNDARY_SESSION_MISMATCH');return s;
 }
 private lineage(e:Evidence):CognitiveLineage{
  return {journey:e.snapshot.journey,firstAttemptId:e.attempts[0]?.id??null,parentJourney:e.meta.parentJourney,originSessionId:e.origin.id,originRef:e.origin.item,originCursor:e.meta.origin!.cursor};
 }
 private fields(e:Evidence){return e.snapshot.stage==='BOUNDARY_TEST'?e.context.boundaryFields:e.context.firstFields;}
 private editable(e:Evidence){return e.snapshot.stage==='ATTEMPT'||e.snapshot.stage==='BOUNDARY_TEST'&&!e.snapshot.boundaryAttemptId;}
 private map(values:unknown,e:Evidence):Record<string,Response>{
  const v=validateResponse({kind:'MULTIPART',value:values});if(v.kind!=='MULTIPART'||Object.keys(v.value).some(k=>!Object.hasOwn(this.fields(e),k)||v.value[k].kind!==this.fields(e)[k]))throw Error('INVALID_RESPONSE_FIELDS');return structuredClone(v.value);
 }
 private async loadDraft(e:Evidence){
  this.responses={};this.work=[];this.draftRevision=0;
  if(!this.editable(e))return;
  const session=await this.activeSession(e),d=await this.b().progress.loadDraft(session.id);if(!d)return;
  const l=d.cognitive,base=this.lineage(e);
  if(!l||l.stage!==e.snapshot.stage||canonicalJson({journey:l.journey,firstAttemptId:l.firstAttemptId,parentJourney:l.parentJourney,originSessionId:l.originSessionId,originRef:l.originRef,originCursor:l.originCursor})!==canonicalJson(base)||d.response.kind!=='MULTIPART'||d.session.id!==session.id)throw Error('FOREIGN_OR_STALE_DRAFT');
  // A help event can advance the checkpoint while the attempt stays open. Preserve
  // the older draft only if its hash is an actual prefix of this verified chain.
  const n=l.checkpoint.sequence;if(!Number.isSafeInteger(n)||n<0||n>e.events.length||l.checkpoint.sha256!==(n?await computeEventHash(e.events[n-1]):null))throw Error('DRAFT_PREFIX_MISMATCH');
  const values=this.map(d.response.value,e);const prefix=e.events.slice(0,n);const hasFirst=prefix.some(x=>x.event_type==='FIRST_COMMITTED'),hasRepair=prefix.some(x=>x.event_type==='REPAIR_COMMITTED'),hasBoundary=prefix.some(x=>x.event_type==='BOUNDARY_COMMITTED');if(l.stage==='ATTEMPT'&&(!prefix.some(x=>x.event_type==='PREDICTION_COMMITTED')||hasFirst)||l.stage==='BOUNDARY_TEST'&&(!hasRepair||hasBoundary))throw Error('DRAFT_STAGE_PREFIX_MISMATCH');
  this.responses=values;this.work=structuredClone(d.artifacts);this.draftRevision=d.revision;
 }
 async start(){if(this.busy)throw Error('BUSY');this.busy=true;try{const b=this.b();if(b.definitionSha256!==await computeSha256(canonicalJson(this.definition)))throw Error('TRANSFER_DEFINITION_MISMATCH');const before=await b.controller.describeBinding();this.checkIdentity(before.journey,before.context,before.session,before.origin);await b.controller.begin();const e=await this.checked();await this.loadDraft(e);this.evidence=e;this.blocked=false;}catch(err){this.blocked=true;throw err;}finally{this.busy=false;}}
 async restore(){if(this.busy)throw Error('BUSY');this.busy=true;try{const e=await this.checked();await this.loadDraft(e);this.evidence=e;this.blocked=false;}catch(err){this.blocked=true;throw err;}finally{this.busy=false;}}
 private local(){if(!this.isReady())throw Error('TRANSFER_NOT_READY');return this.evidence!;}
 setResponses(values:Readonly<Record<string,Response>>,work:readonly WorkArtifact[]=this.work){
  const e=this.local();if(!this.editable(e))throw Error('ATTEMPT_LOCKED');const next=this.map(values,e);
  if(!Array.isArray(work)||work.some(w=>!w||typeof w.id!=='string'||!w.id.trim()||w.version!==1)||new Set(work.map(w=>w.id)).size!==work.length)throw Error('INVALID_WORK');
  this.responses=next;this.work=structuredClone(work);
 }
 getResponses(){return structuredClone(this.responses);}getWork(){return structuredClone(this.work);}
 async saveDraft(){const e=this.local();if(!this.editable(e))throw Error('ATTEMPT_LOCKED');this.busy=true;try{const current=await this.checked(e.snapshot.checkpoint),session=await this.activeSession(current),response=validateResponse({kind:'MULTIPART',value:this.responses});await this.b().progress.saveDraft(session,response,this.work,this.draftRevision,{...this.lineage(current),stage:current.snapshot.stage,checkpoint:current.snapshot.checkpoint});this.draftRevision++;}catch(err){this.blocked=true;throw err;}finally{this.busy=false;}}
 private async append<K extends CognitiveEventType>(e:Evidence,type:K,payload:CognitivePayloads[K],work:readonly WorkArtifact[]=[],attempt?:Attempt,revision?:number){
  const j=e.snapshot.journey,cp=e.snapshot.checkpoint,at=new Date(Math.max(Date.now(),Date.parse(e.events.at(-1)?.at??'1970-01-01T00:00:00Z'),attempt?Date.parse(attempt.submittedAt):0)).toISOString();
  const event={schema_version:'g9-cognitive-event/2',event_id:'evt:'+crypto.randomUUID(),journey_id:j.journeyId,task_instance_id:j.taskInstanceId,release_id:j.releaseId,task_ref:j.task,sequence:cp.sequence+1,previous_sha256:cp.sha256,event_type:type,payload,at} as CognitiveEvent;
  const snap=await this.b().controller.commit(event,cp,work,attempt,revision);
  const next=await this.checked(snap.checkpoint);this.evidence=next;
  if(type==='FIRST_COMMITTED'||type==='BOUNDARY_COMMITTED'){this.responses={};this.work=[];this.draftRevision=0;}
  return {event,next};
 }
 private async act<T>(stage:TransferStage,fn:(e:Evidence)=>Promise<T>):Promise<T>{
  const prior=this.local();if(prior.snapshot.stage!==stage)throw Error('ILLEGAL_STAGE');this.busy=true;try{return await fn(await this.checked(prior.snapshot.checkpoint));}catch(err){this.blocked=true;throw err;}finally{this.busy=false;}
 }
 async predict(i:number,artifacts:readonly WorkArtifact[]=[]){if(!Number.isInteger(i)||i<0||i>=this.definition.predictionOptions.length)throw Error('INVALID_PREDICTION');return this.act('PREDICT',async e=>(await this.append(e,'PREDICTION_COMMITTED',{prediction:this.definition.predictionOptions[i],artifact_ids:artifacts.map(a=>a.id)},artifacts)).next.snapshot);}
 getPrediction(){const e=this.evidence?.events.find(e=>e.event_type==='PREDICTION_COMMITTED');return {index:e?this.definition.predictionOptions.indexOf(e.payload.prediction):null,optionText:e?.payload.prediction,isExpected:null};}
 private async bytes(ref:Ref){const bytes=Uint8Array.from(await this.b().loadProtected(structuredClone(ref)));if(!bytes.length||bytes.length>2000000||await computeSha256(bytes)!==ref.sha256)throw Error('PROTECTED_ASSET_INTEGRITY');new TextDecoder('utf-8',{fatal:true}).decode(bytes);return bytes;}
 async requestHint(){return this.act('ATTEMPT',async e=>{
  const used=e.events.filter(e=>e.event_type==='HELP_EXPOSED'),n=used.filter(e=>ORDERED_HINTS.includes(e.payload.capability as HintLevel)).length,h=this.definition.hints[n];if(!h)throw Error('NO_NEXT_HINT');
  const asset=h.assetRef as Ref;if(!await this.b().controller.canRequest(h.level,asset,e.snapshot.checkpoint))throw Error('HINT_NOT_AUTHORIZED');const bytes=await this.bytes(asset);
  const {event,next}=await this.append(e,'HELP_EXPOSED',{capability:h.level,asset_ref:asset,ordinal:used.length+1});
  const text=await this.b().controller.readProtectedText(h.level,asset,next.snapshot.checkpoint,async()=>bytes,event.event_id);if(text===null)throw Error('HINT_DISCLOSURE_DENIED');return {...h,text};
 });}
 async readHint(level:HintLevel){const e=this.local(),h=this.definition.hints.find(h=>h.level===level),ev=e.events.find(e=>e.event_type==='HELP_EXPOSED'&&e.payload.capability===level);if(!h||!ev)return null;return this.b().controller.readProtectedText(level,h.assetRef as Ref,e.snapshot.checkpoint,this.b().loadProtected,ev.event_id);}
 private async submit(stage:'ATTEMPT'|'BOUNDARY_TEST'){
  return this.act(stage,async e=>{
   if(!this.editable(e))throw Error('ATTEMPT_LOCKED');const session=await this.activeSession(e),response=validateResponse({kind:'MULTIPART',value:this.responses});
   if(response.kind!=='MULTIPART'||Object.keys(response.value).length!==Object.keys(this.fields(e)).length||!this.work.length)throw Error('INCOMPLETE_TYPED_RESPONSE_OR_WORK');
   const a=stage==='ATTEMPT'?this.b().assessmentA:this.b().assessmentB,grade=await this.b().engine.evaluate(response,a,session.mode,session.item as TaskRef);
   if(!['SCORED','REVIEW_PENDING'].includes(grade.status))throw Error('UNQUALIFIED_ASSESSMENT');
   const help=stage==='ATTEMPT'?e.events.filter(e=>e.event_type==='HELP_EXPOSED').map(e=>e.event_id):[];
   const attempt:Attempt={id:'att:'+crypto.randomUUID(),sessionId:session.id,item:session.item,releaseId:session.releaseId,response,work:structuredClone(this.work),hintIds:help,submittedAt:new Date().toISOString(),grade,assessmentRef:a,scoringVersion:SCORING_VERSION,cognitive:this.lineage(e)};
   const payload={responses:response.value,work:attempt.work.map(w=>w.id),help_event_ids:help};
   const x=stage==='ATTEMPT'?await this.append(e,'FIRST_COMMITTED',payload,attempt.work,attempt,this.draftRevision):await this.append(e,'BOUNDARY_COMMITTED',{...payload,boundary_task_ref:e.context.boundaryTask},attempt.work,attempt,this.draftRevision);
   return x.next.snapshot;
  });
 }
 commitFirstAttempt(){return this.submit('ATTEMPT');}commitBoundaryAttempt(){return this.submit('BOUNDARY_TEST');}
 async getTaskASolution(){const e=this.local();return this.b().controller.readProtectedText('REFERENCE_SOLUTION',e.context.firstReference,e.snapshot.checkpoint,this.b().loadProtected);}
 async completeReconstruction(comparison:Readonly<Record<string,JsonObject>>){
  return this.act('RECONSTRUCT',async e=>{if(!e.snapshot.firstAttemptId||Object.keys(comparison).length!==e.context.moves.length||e.context.moves.some(k=>!Object.hasOwn(comparison,k)||!comparison[k]||typeof comparison[k].observation!=='string'||!comparison[k].observation.trim()))throw Error('COMPARISON_REQUIRED');return (await this.append(e,'RECONSTRUCTION_COMMITTED',{first_event_id:e.snapshot.firstAttemptId,comparison,reference_ref:e.context.firstReference})).next.snapshot;});
 }
 async commitDiagnosis(moveId:string,why:string){if(!nonblank(why))throw Error('DIAGNOSIS_REASON_REQUIRED');return this.act('DIAGNOSE',async e=>(await this.append(e,'DIAGNOSIS_COMMITTED',{move_id:moveId,why})).next.snapshot);}
 async commitRepair(why:string,work:readonly WorkArtifact[]){if(!nonblank(why)||!work.length)throw Error('REPAIR_EVIDENCE_REQUIRED');return this.act('REPAIR',async e=>{const x=await this.append(e,'REPAIR_COMMITTED',{first_event_id:e.snapshot.firstAttemptId!,work:work.map(w=>w.id),why},work);await this.loadDraft(x.next);return x.next.snapshot;});}
 async viewBoundaryFeedback(){return this.act('BOUNDARY_TEST',async e=>{if(!e.snapshot.boundaryAttemptId)throw Error('BOUNDARY_COMMIT_REQUIRED');const ref=e.context.boundaryReference;if(!await this.b().controller.canDisplay('BOUNDARY_REFERENCE',ref,e.snapshot.checkpoint))throw Error('BOUNDARY_NOT_AUTHORIZED');const bytes=await this.bytes(ref);const {next}=await this.append(e,'BOUNDARY_FEEDBACK_VIEWED',{boundary_event_id:e.snapshot.boundaryAttemptId,reference_ref:ref});const text=await this.b().controller.readProtectedText('BOUNDARY_REFERENCE',ref,next.snapshot.checkpoint,async()=>bytes);if(text===null)throw Error('BOUNDARY_DISCLOSURE_DENIED');return text;});}
 async getTaskBSolution(){const e=this.local();if(!e.events.some(e=>e.event_type==='BOUNDARY_FEEDBACK_VIEWED'))return null;return this.b().controller.readProtectedText('BOUNDARY_REFERENCE',e.context.boundaryReference,e.snapshot.checkpoint,this.b().loadProtected);}
 async returnToSource(){return this.act('COMPLETE',async e=>{const origin=e.meta.origin!;if(e.events.some(e=>e.event_type==='SOURCE_RETURNED'))throw Error('SOURCE_ALREADY_RETURNED');const {next}=await this.append(e,'SOURCE_RETURNED',{origin_session_id:origin.sessionId,origin_ref:origin.ref,cursor:origin.cursor});if(!await this.b().controller.canDisplay('SOURCE_RETURN',origin.ref,next.snapshot.checkpoint))throw Error('SOURCE_RETURN_DENIED');return structuredClone(origin);});}
 async readBoundaryStimulus(){const e=this.local();if(e.snapshot.stage!=='BOUNDARY_TEST')return null;return this.b().controller.readProtectedText('VIEW_STIMULUS',e.context.boundaryTask,e.snapshot.checkpoint,this.b().loadProtected);}
 async readReviewMoves(){const e=this.local(),verified=await this.checked(e.snapshot.checkpoint);return verified.snapshot.firstAttemptId?[...verified.context.moves]:[];}
 async readOriginalAttempt(){const e=this.local(),verified=await this.checked(e.snapshot.checkpoint);return structuredClone(verified.attempts[0]??null);}
 async readHistory(){const e=this.local(),verified=await this.checked(e.snapshot.checkpoint);return structuredClone(verified.events);}
 toDraft():Core1BDraft|null{const e=this.evidence;return e&&this.editable(e)?{journeyId:this.definition.journeyId,checkpoint:structuredClone(e.snapshot.checkpoint),responses:this.getResponses(),work:this.getWork(),revision:this.draftRevision}:null;}
 restoreDraft(_d:Core1BDraft):never{throw Error('USE_DURABLE_RESTORE');}
}

