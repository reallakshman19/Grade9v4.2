// A12 service boundaries; implementations must validate wire data, verify exact refs,
// enforce policy and transactional persistence. Types alone cannot establish trust.
import type {Ref,Kind,Response,ResponseOf,AutomaticKind,Grade,WorkArtifact,Session,SessionMode,Attempt,Draft,CognitiveDraftLineage,CognitiveStage,CognitiveEvent,CognitiveSnapshot,JourneyKey,Checkpoint,DisclosureCapability,TaskRef,Json,JsonObject,ModelProjection,ResourceIdentity,ResourceLaunch,ResourceProjection,ResourceRole,ExplorerStage} from './types';
export type Validation<T> = {readonly ok:true;readonly value:T}|{readonly ok:false;readonly reasonCode:string};
export interface Capability<K extends Kind> {
  readonly kind:K;
  validate(value:unknown):Validation<ResponseOf<K>>;
  mount(root:HTMLElement,value:ResponseOf<K>|null,onChange:(r:ResponseOf<K>)=>void):()=>void;
  readonly supportsOffline:boolean;
}
export type Evaluator<K extends Kind> = {readonly mode:'REVIEW_PENDING';readonly rubric_ref?:string|null}|(K extends AutomaticKind?{readonly mode:'AUTOMATIC';readonly canonical_value:ResponseOf<K>['value'];readonly numeric_tolerance?:K extends 'NUMERIC_QUANTITY'?number|null:null;readonly rubric_ref?:string|null}:never);
export interface AssessmentEngine {evaluate(response:Response,assessment:Ref<'ASSESSMENT'>,mode:SessionMode,task:TaskRef):Promise<Grade>}
export interface ProgressStore {saveDraft(session:Session,response:Response,artifacts:readonly WorkArtifact[],expectedRevision?:number,cognitive?:CognitiveDraftLineage|null):Promise<void>;loadDraft(sessionId:string):Promise<Draft|null>;appendAttempt(attempt:Attempt):Promise<void>;committedAttempt(sessionId:string,attemptId:string):Promise<Attempt|null>;exportAll():Promise<Blob>;importVerified(blob:Blob):Promise<void>}
export interface RelationService {outbound(ref:Ref,kinds:readonly string[]):Promise<readonly Ref[]>;inbound(ref:Ref,kinds:readonly string[]):Promise<readonly Ref[]>;resolveRecovery(ref:Ref,releaseId:string,evidence:unknown):Promise<{readonly eligibleRoutes:readonly Ref[];readonly relatedTopics:readonly Ref[];readonly reasonCode:string}>}
export interface CognitiveStore {
  begin(journey:JourneyKey,originSessionId:string):Promise<CognitiveSnapshot>;
  append(event:CognitiveEvent,expected:JourneyKey,checkpoint:Checkpoint,work:readonly WorkArtifact[],attempt?:Attempt):Promise<CognitiveSnapshot>;
  replay(journey:JourneyKey,expectedCheckpoint:Checkpoint):Promise<CognitiveSnapshot>;
  retry(parent:JourneyKey,expectedCheckpoint:Checkpoint,next:JourneyKey):Promise<CognitiveSnapshot>;
  replayForDisclosure(journey:JourneyKey,checkpoint:Checkpoint):Promise<CognitiveSnapshot>;
  exportAll():Promise<Blob>;importVerified(blob:Blob):Promise<void>;
  quarantineLegacy(raw:string):Promise<{id:string;disposition:'QUARANTINED';reason:string}>;
}
export interface DisclosureContext {readonly stage:CognitiveStage;readonly mode:SessionMode;readonly capability:DisclosureCapability;readonly journey:JourneyKey;readonly task:TaskRef;readonly checkpoint:Checkpoint;readonly firstEventId:string|null;readonly boundaryEventId:string|null;readonly reviewRef:Ref|null}
export interface DisclosureDecision {readonly schema_version:'g9-disclosure/1';readonly task_ref:TaskRef;readonly stage:CognitiveStage;readonly capability:DisclosureCapability;readonly allowed:boolean;readonly review_ref:Ref|null;readonly reason_code:string}
export interface DisclosurePolicy {allowed(ctx:DisclosureContext):DisclosureDecision}
export type ModelEvaluationResult = {readonly domainStatus:'VALID';readonly outputs:Readonly<Record<string,number>>;readonly representationState:Readonly<Record<string,Json>>}|{readonly domainStatus:'INVALID';readonly reasonCode:string};
export interface ScientificModelAdapter {readonly id:string;readonly version:string;readonly definition:ModelProjection;evaluate(params:Readonly<Record<string,number>>,context:DisclosureContext):ModelEvaluationResult}
export interface ResourceRegistry {
  resolve(identity:ResourceIdentity):Promise<Validation<ResourceProjection>>;
  eligibleForRole(id:string,role:ResourceRole,stage:CognitiveStage|ExplorerStage,identity:ResourceIdentity):Promise<boolean>;
}
export type GuestSnapshot = {readonly integration:'ISOLATED_HOST';readonly observation:JsonObject}|{readonly integration:'PORTABLE_ADAPTER';readonly state:JsonObject};
export interface LegacyHost {mount(root:HTMLElement,launch:ResourceLaunch):Promise<void>;snapshot():Promise<GuestSnapshot>;dispose():Promise<void>}
