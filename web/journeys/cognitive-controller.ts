// A49 R2 correction of PR #47. All progression and disclosure derive from A48 replay.
// No confirmExposureSaved/confirmSourceReturn switches, no synthetic success.
// The trusted authority resolves exact reviewed asset/task/release/permission bindings.
import type {Attempt,Checkpoint,CognitiveEvent,CognitiveSnapshot,DisclosureCapability,JourneyKey,Ref,Session,WorkArtifact,Kind} from '../runtime/types.ts';
import type {StorageDriver} from '../runtime/storage.ts';
import {DefaultCognitiveStore} from '../runtime/cognitive-store.ts';
import {sameRef,computeSha256} from '../runtime/loader.ts';
import {refOk} from '../runtime/progress.ts';
import {permittedStage} from '../runtime/cognitive-policy.ts';
export interface ControllerConfig{readonly journey:JourneyKey;readonly sessionId:string;readonly originSessionId?:string}
export interface ReviewedTaskContext {
  readonly releaseId:string;readonly task:Ref;readonly boundaryTask:Ref;
  readonly firstReference:Ref;readonly boundaryReference:Ref;
  readonly firstFields:Readonly<Record<string,Kind>>;readonly boundaryFields:Readonly<Record<string,Kind>>;
  readonly moves:readonly string[];
}
export interface CognitiveAuthority{
  // Trusted release bootstrap supplies the reviewed task context, never learner flags.
  reviewedContext(journey:JourneyKey,session:Session):Promise<ReviewedTaskContext|null>;
  liveRevision(session:Session):Promise<string>;
  allowed(journey:JourneyKey,session:Session,capability:DisclosureCapability,asset:Ref):Promise<boolean>;
  boundaryAllowed(journey:JourneyKey,boundary:Ref):Promise<boolean>;
}
export class ControllerError extends Error{readonly code:string;constructor(code:string){super(code);this.code=code;this.name='ControllerError';}}
export class CognitiveController{
  private readonly config:ControllerConfig;private readonly store:DefaultCognitiveStore;private readonly driver:StorageDriver;private readonly authority:CognitiveAuthority;
  constructor(config:ControllerConfig,store:DefaultCognitiveStore,driver:StorageDriver,authority:CognitiveAuthority){this.config=structuredClone(config);this.store=store;this.driver=driver;this.authority=authority;}
  private async session():Promise<Session>{
    const s=await this.driver.get<Session>('sessions',this.config.sessionId);
    const j=this.config.journey;
    if(!s||s.releaseId!==j.releaseId||!sameRef(s.item,j.task)||s.mode==='SIMULATED_EXAM'||!s.contentRevision||s.contentRevision!==await this.authority.liveRevision(s))throw new ControllerError('SESSION_OR_EXAM_POLICY_BLOCKED');
    return s;
  }
  private async context(session:Session):Promise<ReviewedTaskContext>{
    const j=this.config.journey,x=await this.authority.reviewedContext(j,session);
    if(!x||x.releaseId!==j.releaseId||!sameRef(x.task,j.task)||!refOk(x.boundaryTask)||!['QUESTION','FRESH_TASK'].includes(x.boundaryTask.type)||x.boundaryTask.id===j.task.id||!refOk(x.firstReference)||!refOk(x.boundaryReference)||x.firstReference.type!=='SOLUTION'||x.boundaryReference.type!=='SOLUTION'||!Object.keys(x.firstFields).length||!Object.keys(x.boundaryFields).length||!x.moves.length||new Set(x.moves).size!==x.moves.length)throw new ControllerError('REVIEWED_CONTEXT_REQUIRED');
    return structuredClone(x);
  }
  async describeBinding(){const session=await this.session(),context=await this.context(session),originId=this.config.originSessionId??session.id,origin=await this.driver.get<Session>('sessions',originId);if(!origin||origin.releaseId!==session.releaseId||origin.mode==='SIMULATED_EXAM'||!origin.contentRevision||origin.contentRevision!==await this.authority.liveRevision(origin)||originId!==session.id&&(!session.origin||!sameRef(session.origin,origin.item)))throw new ControllerError('ORIGIN_NOT_AUTHORIZED');return {session,context,origin,journey:structuredClone(this.config.journey)};}
  async begin():Promise<CognitiveSnapshot>{const e=await this.describeBinding();return this.store.begin(e.journey,e.origin.id);}
  private assetPermitted(ctx:ReviewedTaskContext,snap:Pick<CognitiveSnapshot,'stage'>,cap:DisclosureCapability,asset:Ref):boolean{
    if(!refOk(asset))return false;
    if(sameRef(asset,ctx.boundaryReference)&&cap!=='BOUNDARY_REFERENCE')return false;
    if(ctx.task.type==='FRESH_TASK'&&sameRef(asset,ctx.firstReference)&&!['REFERENCE_SOLUTION','SHOW_REASONING_CRUX'].includes(cap))return false;
    if(sameRef(asset,ctx.boundaryTask)&&!['BOUNDARY_TEST','COMPLETE'].includes(snap.stage))return false;
    if(cap==='VIEW_STIMULUS'&&asset.type==='SOLUTION')return false;
    return true;
  }
  async canRequest(cap:DisclosureCapability,asset:Ref,checkpoint:Checkpoint):Promise<boolean>{try{const e=await this.readEvidence(checkpoint);return ['H1','H2','H3','READ_ANCHOR','MODEL_AUTO_CALCULATE','MODEL_MANIPULATE'].includes(cap)&&this.assetPermitted(e.context,e.snapshot,cap,asset)&&permittedStage(e.snapshot,e.session.mode,cap)&&await this.authority.allowed(e.snapshot.journey,e.session,cap,asset);}catch{return false;}}
  async readEvidence(checkpoint?:Checkpoint){const binding=await this.describeBinding(),e=await this.store.readForDisclosure(binding.journey,checkpoint);if(e.meta.origin?.sessionId!==binding.origin.id||!sameRef(e.meta.origin.ref,binding.origin.item))throw new ControllerError('ORIGIN_NOT_AUTHORIZED');return {...e,context:binding.context,session:binding.session,origin:binding.origin};}
  async readProtectedText(cap:DisclosureCapability,asset:Ref,checkpoint:Checkpoint,load:(asset:Ref)=>Promise<Uint8Array>,exposureId?:string):Promise<string|null>{
    const ref=structuredClone(asset),cp=structuredClone(checkpoint);if(['EDIT_WORK','SOURCE_RETURN'].includes(cap)||!refOk(ref)||!await this.canDisplay(cap,ref,cp,exposureId))return null;
    try{const bytes=Uint8Array.from(await load(structuredClone(ref)));if(!bytes.length||bytes.length>2000000||await computeSha256(bytes)!==ref.sha256||!await this.canDisplay(cap,ref,cp,exposureId))return null;return new TextDecoder('utf-8',{fatal:true}).decode(bytes);}catch{return null;}
  }
  async snapshot(checkpoint:Checkpoint):Promise<CognitiveSnapshot>{await this.session();return this.store.replayForDisclosure(this.config.journey,checkpoint);}
  async commit(event:CognitiveEvent,checkpoint:Checkpoint,work:readonly WorkArtifact[],attempt?:Attempt,expectedDraftRevision?:number):Promise<CognitiveSnapshot>{
    const s=await this.session(),j=this.config.journey,ctx=await this.context(s);
    if(event.journey_id!==j.journeyId||event.task_instance_id!==j.taskInstanceId||event.release_id!==j.releaseId||!sameRef(event.task_ref,j.task))throw new ControllerError('EVENT_IDENTITY_MISMATCH');
    const fieldsMatch=(responses:Readonly<Record<string,{kind:string}>>,fields:Readonly<Record<string,Kind>>)=>Object.keys(responses).length===Object.keys(fields).length&&Object.keys(fields).every(k=>Object.hasOwn(responses,k)&&responses[k].kind===fields[k]);
    if(event.event_type==='FIRST_COMMITTED'&&!fieldsMatch(event.payload.responses,ctx.firstFields))throw new ControllerError('FIRST_FIELDS_NOT_AUTHORIZED');
    if(event.event_type==='RECONSTRUCTION_COMMITTED'&&(!sameRef(event.payload.reference_ref,ctx.firstReference)||Object.keys(event.payload.comparison).length!==ctx.moves.length||!ctx.moves.every(k=>Object.hasOwn(event.payload.comparison,k))))throw new ControllerError('RECONSTRUCTION_NOT_AUTHORIZED');
    if(event.event_type==='DIAGNOSIS_COMMITTED'&&![...ctx.moves,'UNSURE','NO_DIVERGENCE'].includes(event.payload.move_id))throw new ControllerError('DIAGNOSIS_NOT_AUTHORIZED');
    if(event.event_type==='BOUNDARY_COMMITTED'&&(!sameRef(event.payload.boundary_task_ref,ctx.boundaryTask)||!fieldsMatch(event.payload.responses,ctx.boundaryFields)))throw new ControllerError('BOUNDARY_NOT_AUTHORIZED');
    if(event.event_type==='BOUNDARY_FEEDBACK_VIEWED'&&!sameRef(event.payload.reference_ref,ctx.boundaryReference))throw new ControllerError('BOUNDARY_REFERENCE_NOT_AUTHORIZED');
    if(event.event_type==='FIRST_COMMITTED'&&attempt?.sessionId!==s.id)throw new ControllerError('FIRST_ATTEMPT_SESSION_MISMATCH');
    if(event.event_type==='BOUNDARY_COMMITTED'){
      const boundary=attempt&&await this.driver.get<Session>('sessions',attempt.sessionId);
      if(!boundary||boundary.mode==='SIMULATED_EXAM'||boundary.releaseId!==j.releaseId||!sameRef(boundary.item,event.payload.boundary_task_ref)||!boundary.contentRevision||boundary.contentRevision!==await this.authority.liveRevision(boundary)||!await this.authority.boundaryAllowed(j,event.payload.boundary_task_ref))throw new ControllerError('BOUNDARY_NOT_AUTHORIZED');
    }
    if(event.event_type==='HELP_EXPOSED'&&(!this.assetPermitted(ctx,{stage:'ATTEMPT'},event.payload.capability,event.payload.asset_ref)||!await this.authority.allowed(j,s,event.payload.capability,event.payload.asset_ref)))throw new ControllerError('HELP_NOT_AUTHORIZED');
    if(event.event_type==='RECONSTRUCTION_COMMITTED'&&!await this.authority.allowed(j,s,'REFERENCE_SOLUTION',event.payload.reference_ref))throw new ControllerError('REFERENCE_NOT_AUTHORIZED');
    if(event.event_type==='BOUNDARY_FEEDBACK_VIEWED'&&!await this.authority.allowed(j,s,'BOUNDARY_REFERENCE',event.payload.reference_ref))throw new ControllerError('BOUNDARY_REFERENCE_NOT_AUTHORIZED');
    if(event.event_type==='SOURCE_RETURNED'&&!await this.authority.allowed(j,s,'SOURCE_RETURN',event.payload.origin_ref))throw new ControllerError('SOURCE_RETURN_NOT_AUTHORIZED');
    if(attempt&&(attempt.cognitive?.originSessionId!==s.id&&event.event_type==='FIRST_COMMITTED')){
      const existing=await this.store.readForDisclosure(j,checkpoint);if(existing.meta.origin?.sessionId!==attempt.cognitive?.originSessionId)throw new ControllerError('ORIGIN_NOT_AUTHORIZED');
    }
    // A48 commits attempt + event together; no interruption window between the two writes.
    return this.store.append(event,j,checkpoint,work,attempt,expectedDraftRevision);
  }
  async canDisplay(cap:DisclosureCapability,asset:Ref,checkpoint:Checkpoint,exposureId?:string):Promise<boolean>{
    try{
      const evidence=await this.readEvidence(checkpoint),snap=evidence.snapshot,s=evidence.session,j=snap.journey,ctx=evidence.context;
      if(!this.assetPermitted(ctx,snap,cap,asset)||!permittedStage(snap,s.mode,cap)||!await this.authority.allowed(j,s,cap,asset))return false;
      if((cap==='REFERENCE_SOLUTION'||cap==='SHOW_REASONING_CRUX')&&!sameRef(asset,ctx.firstReference)||cap==='BOUNDARY_REFERENCE'&&!sameRef(asset,ctx.boundaryReference))return false;
      if(['H1','H2','H3','READ_ANCHOR','MODEL_AUTO_CALCULATE','MODEL_MANIPULATE'].includes(cap))return evidence.events.some(e=>e.event_type==='HELP_EXPOSED'&&e.event_id===exposureId&&e.payload.capability===cap&&sameRef(e.payload.asset_ref,asset));
      if(cap==='SOURCE_RETURN')return evidence.events.some(e=>e.event_type==='SOURCE_RETURNED'&&sameRef(e.payload.origin_ref,asset));
      return true;
    }catch{return false;}
  }
  async retry(checkpoint:Checkpoint,next:JourneyKey):Promise<CognitiveSnapshot>{await this.session();return this.store.retry(this.config.journey,checkpoint,next);}
}
export function createCognitiveController(config:ControllerConfig,store:DefaultCognitiveStore,driver:StorageDriver,authority:CognitiveAuthority):CognitiveController{return new CognitiveController(config,store,driver,authority);}
