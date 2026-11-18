// A12 engineering contracts. Validate external bytes against the effective schemas;
// readonly is not persistence, authority, digest verification, or academic approval.
export type EntityType = 'SOURCE'|'OCCURRENCE'|'QUESTION'|'ASSESSMENT'|'WARRANT'|'QRT'|'CONSTRUCTION'|'LESSON'|'FRESH_TASK'|'SOLUTION'|'RELATIONSHIP'|'PRESENTATION'|'CONCEPT'|'ASSET'|'PROGRAMME'|'EXAM_EDITION'|'PAPER'|'STIMULUS'|'APPROVAL'|'RELEASE'|'SUBJECT_PROFILE';
export interface Ref<T extends EntityType = EntityType> {
  readonly type: T; readonly id: string; readonly revision: number; readonly sha256: string;
}
export type TaskRef = Ref<'QUESTION'|'FRESH_TASK'>;
export type Json = null|boolean|number|string|readonly Json[]|{readonly [key: string]: Json};
export type JsonObject = {readonly [key: string]: Json};
export interface SingleChoiceResponse {readonly kind:'SINGLE_CHOICE'; readonly value:string}
export interface MultipleChoiceResponse {readonly kind:'MULTIPLE_CHOICE'; readonly value:readonly string[]}
export interface IntegerResponse {readonly kind:'INTEGER'; readonly value:string}
export interface NumericQuantityResponse {readonly kind:'NUMERIC_QUANTITY'; readonly value:{readonly decimal:string; readonly unit:string}}
export interface SymbolicExpressionResponse {readonly kind:'SYMBOLIC_EXPRESSION'; readonly value:string}
export interface ConstructedResponse {readonly kind:'CONSTRUCTED_RESPONSE'; readonly value:string}
export interface MathematicalProofResponse {readonly kind:'MATHEMATICAL_PROOF'; readonly value:string}
export interface ChemicalStructureResponse {readonly kind:'CHEMICAL_STRUCTURE'; readonly value:{readonly format:string; readonly data:string}}
export interface ReactionMechanismResponse {readonly kind:'REACTION_MECHANISM'; readonly value:readonly string[]}
export interface DataTableResponse {readonly kind:'DATA_TABLE'; readonly value:readonly (readonly (string|null)[])[]}
export interface GraphResponse {readonly kind:'GRAPH'; readonly value:{readonly points:readonly (readonly [string,string])[]}}
export interface ExperimentAnalysisResponse {readonly kind:'EXPERIMENT_ANALYSIS'; readonly value:{readonly observations:readonly string[]; readonly conclusion:string}}
export interface MultipartResponse {readonly kind:'MULTIPART'; readonly value:Readonly<Record<string,Response>>}
export type Response = SingleChoiceResponse|MultipleChoiceResponse|IntegerResponse|NumericQuantityResponse|SymbolicExpressionResponse|ConstructedResponse|MathematicalProofResponse|ChemicalStructureResponse|ReactionMechanismResponse|DataTableResponse|GraphResponse|ExperimentAnalysisResponse|MultipartResponse;
export type Kind = Response['kind'];
export type ResponseOf<K extends Kind> = Extract<Response,{kind:K}>;
export type AutomaticKind = 'SINGLE_CHOICE'|'MULTIPLE_CHOICE'|'INTEGER'|'NUMERIC_QUANTITY';
export type GradeStatus = 'SCORED'|'REVIEW_PENDING'|'INVALID'|'UNSUPPORTED';
interface GradeCommon {readonly maxPoints:number; readonly reasonCode:string; readonly parts?:Readonly<Record<string,Grade>>}
export type Grade = GradeCommon & ({readonly status:'SCORED';readonly points:number}|{readonly status:Exclude<GradeStatus,'SCORED'>;readonly points:null});
export type ArtifactKind = 'NOTE'|'EQUATION'|'INK'|'TABLE'|'GRAPH'|'STRUCTURE'|'ATTACHMENT';
export interface WorkArtifact {readonly id:string; readonly kind:ArtifactKind; readonly version:1; readonly value:Json}
export type SessionMode = 'LEARN'|'PRACTICE'|'SIMULATED_EXAM';
export interface Session {readonly id:string; readonly releaseId:string; readonly item:Ref; readonly origin:Ref|null; readonly returnRoute:string|null; readonly mode:SessionMode; readonly deadlineAt?:string|null; readonly contentRevision?:string; readonly cursor:number; readonly attemptIds:readonly string[]; readonly draftId:string|null}
export interface JourneyKey {readonly journeyId:string; readonly taskInstanceId:string; readonly task:Ref; readonly releaseId:string}
export interface Checkpoint {readonly sequence:number; readonly sha256:string|null}
export interface CognitiveLineage {readonly journey:JourneyKey; readonly firstAttemptId:string|null; readonly parentJourney:JourneyKey|null; readonly originSessionId:string; readonly originRef:Ref; readonly originCursor:number}
export interface Attempt {readonly id:string; readonly sessionId:string; readonly item:Ref; readonly releaseId:string; readonly response:Response; readonly work:readonly WorkArtifact[]; readonly hintIds:readonly string[]; readonly submittedAt:string; readonly grade:Grade; readonly cognitive:CognitiveLineage|null; readonly assessmentRef?:Ref<'ASSESSMENT'>; readonly scoringVersion?:string}
export interface CognitiveDraftLineage extends CognitiveLineage {readonly stage:CognitiveStage;readonly checkpoint:Checkpoint}
export interface Draft {readonly session:Session; readonly response:Response; readonly artifacts:readonly WorkArtifact[]; readonly cognitive:CognitiveDraftLineage|null;readonly revision:number}
export type CognitiveStage = 'PREDICT'|'ATTEMPT'|'RECONSTRUCT'|'DIAGNOSE'|'REPAIR'|'BOUNDARY_TEST'|'COMPLETE';
export type HelpCapability = 'H1'|'H2'|'H3'|'READ_ANCHOR'|'MODEL_AUTO_CALCULATE'|'MODEL_MANIPULATE';
export interface CognitivePayloads {
  readonly PREDICTION_COMMITTED:{readonly prediction:string;readonly artifact_ids:readonly string[]};
  readonly HELP_EXPOSED:{readonly capability:HelpCapability;readonly asset_ref:Ref;readonly ordinal:number};
  readonly FIRST_COMMITTED:{readonly responses:Readonly<Record<string,Response>>;readonly work:readonly string[];readonly help_event_ids:readonly string[]};
  readonly RECONSTRUCTION_COMMITTED:{readonly first_event_id:string;readonly comparison:Readonly<Record<string,JsonObject>>;readonly reference_ref:Ref};
  readonly DIAGNOSIS_COMMITTED:{readonly move_id:string;readonly why:string};
  readonly REPAIR_COMMITTED:{readonly first_event_id:string;readonly work:readonly string[];readonly why:string};
  readonly BOUNDARY_COMMITTED:{readonly boundary_task_ref:Ref;readonly responses:Readonly<Record<string,Response>>;readonly work:readonly string[];readonly help_event_ids:readonly string[]};
  readonly BOUNDARY_FEEDBACK_VIEWED:{readonly boundary_event_id:string;readonly reference_ref:Ref};
  readonly SOURCE_RETURNED:{readonly origin_session_id:string;readonly origin_ref:Ref;readonly cursor:number};
}
export type CognitiveEventType = keyof CognitivePayloads;
interface EventEnvelope {readonly schema_version:'g9-cognitive-event/1'|'g9-cognitive-event/2';readonly event_id:string;readonly journey_id:string;readonly release_id:string;readonly task_instance_id:string;readonly task_ref:Ref;readonly sequence:number;readonly previous_sha256:string|null;readonly at:string}
export type CognitiveEvent = {[K in CognitiveEventType]: EventEnvelope & {readonly event_type:K;readonly payload:CognitivePayloads[K]}}[CognitiveEventType];
export interface CognitiveSnapshot {readonly journey:JourneyKey;readonly checkpoint:Checkpoint;readonly stage:CognitiveStage;readonly firstAttemptId:string|null;readonly boundaryAttemptId:string|null;readonly assisted:boolean;readonly lastHash:string|null;readonly eventIds:readonly string[]}
export interface ReasoningField {readonly id:string;readonly kind:Kind;readonly required:boolean;readonly promptRef:Ref;readonly privateMoveRef?:Ref}
export interface ReasoningCell {readonly schema_version:'g9-reasoning-cell/1';readonly cell_id:string;readonly subject_id:'PHYSICS'|'CHEMISTRY'|'MATHEMATICS'|'BIOLOGY';readonly topic_ref:Ref;readonly operation:'RETRIEVE'|'EXPLAIN'|'APPLY'|'MODEL'|'REPRESENT'|'SYNTHESIZE'|'JUSTIFY';readonly demand_band:'D1'|'D2'|'D3'|'D4';readonly native_contract_ref:Ref;readonly instances:readonly Ref<'QUESTION'|'FRESH_TASK'|'CONSTRUCTION'>[];readonly main:Ref<'QUESTION'|'FRESH_TASK'|'CONSTRUCTION'>|null;readonly status:'SYNTHETIC'|'HOLD'|'CANDIDATE';readonly c06_v11:boolean}
export type NativeCore = 'CORE1'|'CORE1A'|'CORE1B'|'CORE2'|'CORE2A'|'CORE2B';
export type ResourceRole = NativeCore|'EXPLORER';
export type ResourceKind = 'STRUCTURED_PRODUCT'|'QUESTION_COLLECTION'|'OPAQUE_APP'|'GUIDED_SESSION'|'CONVERTED_DOCUMENT'|'OWNER_TOOL'|'RUNTIME_HOST'|'PORTABLE_SCENE'|'NATIVE_COMPONENT';
export type ResourceIntegration = 'PRESERVED'|'ISOLATED_HOST'|'PORTABLE_ADAPTER'|'NATIVE_COMPONENT';
export interface ResourceIdentity {readonly resourceId:string;readonly revision:number;readonly sha256:string;readonly releaseId:string}
export interface ResourceLaunch extends ResourceIdentity {readonly sessionId:string;readonly origin:Ref|null;readonly returnRouteId:string|null}
export interface ResourceProjection {readonly schema_version:'g9-resource-projection/1';readonly resource_id:string;readonly revision:number;readonly kind:ResourceKind;readonly audience:'LEARNER'|'OWNER'|'LAB'|'INTERNAL';readonly title:string;readonly aliases:readonly string[];readonly subject_id:string;readonly topic_refs:readonly string[];readonly capability_refs:readonly string[];readonly core_roles:readonly ResourceRole[];readonly origins:readonly {readonly snapshot_id:string;readonly commit:string;readonly path:string;readonly sha256:string}[];readonly entrypoint:string|null;readonly integration:ResourceIntegration;readonly capabilities:readonly string[];readonly governance:{readonly rights:'HOLD'|'CLEARED';readonly academic:'HOLD'|'ADMITTED'|'NOT_APPLICABLE_REVIEWED';readonly technical:'UNTESTED'|'PASS'|'FAIL';readonly release:'HOLD'|'ELIGIBLE';readonly receipt_refs:readonly string[]};readonly search_visibility:'EXCLUDED'|'LEARNER'}
export type ExplorerStage = 'PREDICT'|'MANIPULATE'|'OBSERVE'|'CONTRADICT'|'DECONSTRUCT'|'RECONSTRUCT'|'INVARIANT'|'BOUNDARY'|'FADE'|'TRANSFER';
export interface ModelParameter {readonly id:string;readonly unit:string;readonly min:number;readonly max:number;readonly step:number;readonly initial:number}
export interface ModelProjection {readonly schema_version:'g9-model-projection/1';readonly id:string;readonly adapter_id:string;readonly adapter_version:string;readonly parameters:readonly ModelParameter[];readonly output_ids:readonly string[];readonly representation_ids:readonly string[];readonly warrant_refs:readonly Ref<'WARRANT'>[];readonly alt_text:string;readonly status:'SYNTHETIC'|'HOLD'|'CANDIDATE'}
export type DisclosureCapability = HelpCapability|'VIEW_STIMULUS'|'EDIT_WORK'|'REFERENCE_SOLUTION'|'BOUNDARY_REFERENCE'|'SOURCE_RETURN'|'SHOW_REASONING_CRUX';
