// W9-INT-04: supported application uses the existing A49/A48/A18 path.
// This is a host-only adapter. Pinned assessment and support grants are supplied by the trusted catalog.
import {CognitiveController} from './cognitive-controller.ts';
import {DefaultProgressStore} from '../runtime/progress.ts';
import {StandardAssessmentEngine,SCORING_VERSION} from '../runtime/assessment.ts';
import {canonicalJson,computeSha256,sameRef} from '../runtime/loader.ts';
import {computeEventHash} from '../runtime/cognitive-store.ts';
import {validateResponse} from '../runtime/response.ts';
import type {AssetLoader} from '../runtime/presentation.ts';
import type {Attempt,Checkpoint,CognitiveEvent,CognitiveEventType,CognitivePayloads,CognitiveLineage,Ref,TaskRef,Response,WorkArtifact,HelpCapability,JsonObject} from '../runtime/types.ts';
type Evidence=Awaited<ReturnType<CognitiveController['readEvidence']>>;
export class SupportedPracticeWorkspace {
 readonly #c:CognitiveController;readonly #p:DefaultProgressStore;readonly #engine:StandardAssessmentEngine;readonly #assessment:Ref<'ASSESSMENT'>;readonly #load:AssetLoader;
 constructor(c:CognitiveController,p:DefaultProgressStore,engine:StandardAssessmentEngine,assessment:Ref<'ASSESSMENT'>,load:AssetLoader){this.#c=c;this.#p=p;this.#engine=engine;this.#assessment=structuredClone(assessment);this.#load=load;}
 #lineage(e:Evidence):CognitiveLineage{const o=e.meta.origin;if(!o)throw Error('ORIGIN_REQUIRED');return {journey:e.snapshot.journey,firstAttemptId:null,parentJourney:e.meta.parentJourney,originSessionId:o.sessionId,originRef:o.ref,originCursor:o.cursor};}
 async #evidence(cp?:Checkpoint){const e=await this.#c.readEvidence(cp);const f=this.#engine.describeMultipart(this.#assessment,e.context.task as TaskRef);if(!f||Object.keys(f).length!==Object.keys(e.context.firstFields).length||Object.keys(f).some(k=>!Object.hasOwn(e.context.firstFields,k)||f[k].kind!==e.context.firstFields[k]))throw Error('PRACTICE_ASSESSMENT_MISMATCH');return e;}
 #typed(e:Evidence,values:Readonly<Record<string,Response>>){const r=validateResponse({kind:'MULTIPART',value:values});if(r.kind!=='MULTIPART'||Object.keys(r.value).length!==Object.keys(e.context.firstFields).length||Object.keys(r.value).some(k=>!Object.hasOwn(e.context.firstFields,k)||r.value[k].kind!==e.context.firstFields[k]))throw Error('PRACTICE_FIELDS_MISMATCH');return r;}
 async #append<K extends CognitiveEventType>(e:Evidence,type:K,payload:CognitivePayloads[K],work:readonly WorkArtifact[]=[],attempt?:Attempt,revision?:number){
  const j=e.snapshot.journey,cp=e.snapshot.checkpoint,at=new Date(Math.max(Date.now(),Date.parse(e.events.at(-1)?.at??'1970-01-01T00:00:00Z'),attempt?Date.parse(attempt.submittedAt):0)).toISOString();
  const event={schema_version:'g9-cognitive-event/2',event_id:'evt:'+crypto.randomUUID(),journey_id:j.journeyId,task_instance_id:j.taskInstanceId,release_id:j.releaseId,task_ref:j.task,sequence:cp.sequence+1,previous_sha256:cp.sha256,event_type:type,payload,at} as CognitiveEvent;
  const snap=await this.#c.commit(event,cp,work,attempt,revision);return {event,verified:await this.#evidence(snap.checkpoint)};
 }
 async draft(cp:Checkpoint){
  const e=await this.#evidence(cp);if(e.snapshot.stage!=='ATTEMPT')return null;
  const d=await this.#p.loadDraft(e.session.id);if(!d)return null;
  const l=d.cognitive,o=this.#lineage(e);
  if(!l||l.stage!=='ATTEMPT'||d.response.kind!=='MULTIPART'||canonicalJson({journey:l.journey,firstAttemptId:l.firstAttemptId,parentJourney:l.parentJourney,originSessionId:l.originSessionId,originRef:l.originRef,originCursor:l.originCursor})!==canonicalJson(o)||d.session.id!==e.session.id||!sameRef(d.session.item,e.session.item))throw Error('PRACTICE_DRAFT_LINEAGE');
  const n=l.checkpoint.sequence;if(!Number.isSafeInteger(n)||n<1||n>e.events.length||l.checkpoint.sha256!==await computeEventHash(e.events[n-1])||e.events.slice(0,n).some(v=>v.event_type==='FIRST_COMMITTED')||!e.events.slice(0,n).some(v=>v.event_type==='PREDICTION_COMMITTED'))throw Error('PRACTICE_DRAFT_PREFIX');
  return {responses:structuredClone(d.response.value),work:structuredClone(d.artifacts),revision:d.revision};
 }
 async predict(cp:Checkpoint,text:string){const e=await this.#evidence(cp);if(e.snapshot.stage!=='PREDICT'||!text.trim())throw Error('PREDICTION_REQUIRED');return this.#append(e,'PREDICTION_COMMITTED',{prediction:text,artifact_ids:[]});}
 async save(cp:Checkpoint,values:Readonly<Record<string,Response>>,work:readonly WorkArtifact[],revision:number){
  const e=await this.#evidence(cp);if(e.snapshot.stage!=='ATTEMPT'||!work.length)throw Error('PRACTICE_NOT_EDITABLE');
  await this.#p.saveDraft(e.session,this.#typed(e,values),work,revision,{...this.#lineage(e),stage:'ATTEMPT',checkpoint:e.snapshot.checkpoint});
  const d=await this.draft(cp);if(!d||d.revision!==revision+1)throw Error('PRACTICE_SAVE_NOT_VERIFIED');return d;
 }
 async commit(cp:Checkpoint,values:Readonly<Record<string,Response>>,work:readonly WorkArtifact[],revision:number){
  const e=await this.#evidence(cp);if(e.snapshot.stage!=='ATTEMPT'||!work.length)throw Error('PRACTICE_NOT_EDITABLE');
  const response=this.#typed(e,values),grade=await this.#engine.evaluate(response,this.#assessment,e.session.mode,e.session.item as TaskRef);
  if(!['SCORED','REVIEW_PENDING'].includes(grade.status))throw Error('UNQUALIFIED_ASSESSMENT');
  const help=e.events.filter(v=>v.event_type==='HELP_EXPOSED').map(v=>v.event_id);
  const attempt:Attempt={id:'att:'+crypto.randomUUID(),sessionId:e.session.id,item:e.session.item,releaseId:e.session.releaseId,response,work:structuredClone(work),hintIds:help,submittedAt:new Date().toISOString(),grade,assessmentRef:this.#assessment,scoringVersion:SCORING_VERSION,cognitive:this.#lineage(e)};
  return this.#append(e,'FIRST_COMMITTED',{responses:response.value,work:work.map(w=>w.id),help_event_ids:help},work,attempt,revision);
 }
 async request(cp:Checkpoint,capability:HelpCapability,asset:Ref){
  const e=await this.#evidence(cp);if(!await this.#c.canRequest(capability,asset,cp))throw Error('SUPPORT_NOT_AUTHORIZED');
  const bytes=Uint8Array.from(await this.#load(structuredClone(asset)));if(!bytes.length||bytes.length>2000000||await computeSha256(bytes)!==asset.sha256)throw Error('SUPPORT_INTEGRITY');
  new TextDecoder('utf-8',{fatal:true}).decode(bytes);
  const {event,verified}=await this.#append(e,'HELP_EXPOSED',{capability,asset_ref:asset,ordinal:e.events.filter(v=>v.event_type==='HELP_EXPOSED').length+1});
  const text=await this.#c.readProtectedText(capability,asset,verified.snapshot.checkpoint,async()=>bytes,event.event_id);if(text===null)throw Error('SUPPORT_NOT_VERIFIED');return text;
 }
 async readSupport(cp:Checkpoint){const e=await this.#evidence(cp),result:string[]=[];for(const v of e.events)if(v.event_type==='HELP_EXPOSED'){const t=await this.#c.readProtectedText(v.payload.capability,v.payload.asset_ref,cp,this.#load,v.event_id);if(t!==null)result.push(t);}return result;}
 async original(cp:Checkpoint){const e=await this.#evidence(cp);return e.snapshot.firstAttemptId?structuredClone(e.attempts[0]??null):null;}
 async moves(cp:Checkpoint){const e=await this.#evidence(cp);return e.snapshot.firstAttemptId?[...e.context.moves]:[];}
 async compare(cp:Checkpoint,comparison:Readonly<Record<string,JsonObject>>){
  const e=await this.#evidence(cp);
  if(e.snapshot.stage!=='RECONSTRUCT'||!e.snapshot.firstAttemptId||Object.keys(comparison).length!==e.context.moves.length||e.context.moves.some(k=>!Object.hasOwn(comparison,k)||typeof comparison[k]?.observation!=='string'||!(comparison[k].observation as string).trim()))throw Error('PRACTICE_COMPARISON_REQUIRED');
  return this.#append(e,'RECONSTRUCTION_COMMITTED',{first_event_id:e.snapshot.firstAttemptId,comparison,reference_ref:e.context.firstReference});
 }
 async diagnose(cp:Checkpoint,move:string,why:string){const e=await this.#evidence(cp);if(e.snapshot.stage!=='DIAGNOSE'||!why.trim())throw Error('PRACTICE_DIAGNOSIS_REQUIRED');return this.#append(e,'DIAGNOSIS_COMMITTED',{move_id:move,why});}
 async repair(cp:Checkpoint,why:string,work:readonly WorkArtifact[]){const e=await this.#evidence(cp);if(e.snapshot.stage!=='REPAIR'||!e.snapshot.firstAttemptId||!why.trim()||!work.length)throw Error('PRACTICE_REPAIR_REQUIRED');return this.#append(e,'REPAIR_COMMITTED',{first_event_id:e.snapshot.firstAttemptId,why,work:work.map(w=>w.id)},work);}
 async readCrux(cp:Checkpoint){const e=await this.#evidence(cp);return e.context.reasoningCrux?this.#c.readProtectedText('SHOW_REASONING_CRUX',e.context.reasoningCrux,cp,this.#load):null;}
 async readReference(cp:Checkpoint){const e=await this.#evidence(cp);return this.#c.readProtectedText('REFERENCE_SOLUTION',e.context.firstReference,cp,this.#load);}
}
