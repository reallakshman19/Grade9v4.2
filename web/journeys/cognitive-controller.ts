// A49 R2 correction of PR #47. All progression and disclosure derive from A48 replay.
// No confirmExposureSaved/confirmSourceReturn switches, no synthetic success.
// The trusted authority resolves exact reviewed asset/task/release/permission bindings.
import type {Attempt,Checkpoint,CognitiveEvent,CognitiveSnapshot,DisclosureCapability,JourneyKey,Ref,Session,WorkArtifact} from '../runtime/types.ts';
import type {StorageDriver} from '../runtime/storage.ts';
import {DefaultCognitiveStore} from '../runtime/cognitive-store.ts';
import {sameRef} from '../runtime/loader.ts';
import {permittedStage} from '../runtime/cognitive-policy.ts';
export interface ControllerConfig{readonly journey:JourneyKey;readonly sessionId:string}
export interface CognitiveAuthority{
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
  async begin():Promise<CognitiveSnapshot>{const s=await this.session();return this.store.begin(this.config.journey,s.id);}
  async snapshot(checkpoint:Checkpoint):Promise<CognitiveSnapshot>{await this.session();return this.store.replayForDisclosure(this.config.journey,checkpoint);}
  async commit(event:CognitiveEvent,checkpoint:Checkpoint,work:readonly WorkArtifact[],attempt?:Attempt):Promise<CognitiveSnapshot>{
    const s=await this.session(),j=this.config.journey;
    if(event.journey_id!==j.journeyId||event.task_instance_id!==j.taskInstanceId||event.release_id!==j.releaseId||!sameRef(event.task_ref,j.task))throw new ControllerError('EVENT_IDENTITY_MISMATCH');
    if(event.event_type==='FIRST_COMMITTED'&&attempt?.sessionId!==s.id)throw new ControllerError('FIRST_ATTEMPT_SESSION_MISMATCH');
    if(event.event_type==='BOUNDARY_COMMITTED'){
      const boundary=attempt&&await this.driver.get<Session>('sessions',attempt.sessionId);
      if(!boundary||boundary.mode==='SIMULATED_EXAM'||boundary.releaseId!==j.releaseId||!sameRef(boundary.item,event.payload.boundary_task_ref)||!boundary.contentRevision||boundary.contentRevision!==await this.authority.liveRevision(boundary)||!await this.authority.boundaryAllowed(j,event.payload.boundary_task_ref))throw new ControllerError('BOUNDARY_NOT_AUTHORIZED');
    }
    if(event.event_type==='HELP_EXPOSED'&&!await this.authority.allowed(j,s,event.payload.capability,event.payload.asset_ref))throw new ControllerError('HELP_NOT_AUTHORIZED');
    if(event.event_type==='RECONSTRUCTION_COMMITTED'&&!await this.authority.allowed(j,s,'REFERENCE_SOLUTION',event.payload.reference_ref))throw new ControllerError('REFERENCE_NOT_AUTHORIZED');
    if(event.event_type==='BOUNDARY_FEEDBACK_VIEWED'&&!await this.authority.allowed(j,s,'BOUNDARY_REFERENCE',event.payload.reference_ref))throw new ControllerError('BOUNDARY_REFERENCE_NOT_AUTHORIZED');
    if(event.event_type==='SOURCE_RETURNED'&&!await this.authority.allowed(j,s,'SOURCE_RETURN',event.payload.origin_ref))throw new ControllerError('SOURCE_RETURN_NOT_AUTHORIZED');
    if(attempt&&(attempt.cognitive?.originSessionId!==s.id&&event.event_type==='FIRST_COMMITTED')){
      const existing=await this.store.readForDisclosure(j,checkpoint);if(existing.meta.origin?.sessionId!==attempt.cognitive?.originSessionId)throw new ControllerError('ORIGIN_NOT_AUTHORIZED');
    }
    // A48 commits attempt + event together; no interruption window between the two writes.
    return this.store.append(event,j,checkpoint,work,attempt);
  }
  async canDisplay(cap:DisclosureCapability,asset:Ref,checkpoint:Checkpoint,exposureId?:string):Promise<boolean>{
    try{
      const s=await this.session(),j=this.config.journey;
      const evidence=await this.store.readForDisclosure(j,checkpoint),snap=evidence.snapshot;
      if(!permittedStage(snap,s.mode,cap)||!await this.authority.allowed(j,s,cap,asset))return false;
      if(['H1','H2','H3','READ_ANCHOR','MODEL_AUTO_CALCULATE','MODEL_MANIPULATE'].includes(cap))return evidence.events.some(e=>e.event_type==='HELP_EXPOSED'&&e.event_id===exposureId&&e.payload.capability===cap&&sameRef(e.payload.asset_ref,asset));
      if(cap==='SOURCE_RETURN')return evidence.events.some(e=>e.event_type==='SOURCE_RETURNED'&&sameRef(e.payload.origin_ref,asset));
      return true;
    }catch{return false;}
  }
  async retry(checkpoint:Checkpoint,next:JourneyKey):Promise<CognitiveSnapshot>{await this.session();return this.store.retry(this.config.journey,checkpoint,next);}
}
export function createCognitiveController(config:ControllerConfig,store:DefaultCognitiveStore,driver:StorageDriver,authority:CognitiveAuthority):CognitiveController{return new CognitiveController(config,store,driver,authority);}
