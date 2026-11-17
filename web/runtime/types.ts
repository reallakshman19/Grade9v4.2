// Proposed engineering interface, not native academic authority. Freeze after A05/A10.
// Conforms to Draft 2020-12 platform schemas, R3 cognitive-runtime, and R4 authority contracts.

export type EntityType =
  | 'QUESTION'
  | 'SOLUTION'
  | 'CONSTRUCTION'
  | 'PRESENTATION'
  | 'ASSET'
  | 'FRESH_TASK'
  | 'LESSON'
  | 'RELATIONSHIP'
  | 'WARRANT'
  | 'PROGRAMME'
  | 'EDITION'
  | 'RUBRIC'
  | 'EVALUATOR_POLICY'
  | 'REASONING_CELL'
  | 'SCIENTIFIC_MODEL'
  | 'DISCLOSURE_POLICY'
  | 'RESOURCE'
  | 'CATALOGUE_FACET'
  | 'EXAM_PAPER'
  | 'TOPIC'
  | 'CONCEPT';

export interface Ref {
  readonly type: EntityType | string;
  readonly id: string;
  readonly revision: number;
  readonly sha256: string;
}

export type Kind =
  | 'SINGLE_CHOICE'
  | 'MULTIPLE_CHOICE'
  | 'INTEGER'
  | 'NUMERIC_QUANTITY'
  | 'SYMBOLIC_EXPRESSION'
  | 'CONSTRUCTED_RESPONSE'
  | 'MATHEMATICAL_PROOF'
  | 'CHEMICAL_STRUCTURE'
  | 'REACTION_MECHANISM'
  | 'DATA_TABLE'
  | 'GRAPH'
  | 'EXPERIMENT_ANALYSIS'
  | 'MULTIPART';

export interface SingleChoiceResponse {
  readonly kind: 'SINGLE_CHOICE';
  readonly value: string;
}

export interface MultipleChoiceResponse {
  readonly kind: 'MULTIPLE_CHOICE';
  readonly value: readonly string[];
}

export interface IntegerResponse {
  readonly kind: 'INTEGER';
  readonly value: number;
}

export interface NumericQuantityResponse {
  readonly kind: 'NUMERIC_QUANTITY';
  readonly value: number;
  readonly unit: string;
}

export interface SymbolicExpressionResponse {
  readonly kind: 'SYMBOLIC_EXPRESSION';
  readonly value: string;
}

export interface ConstructedResponse {
  readonly kind: 'CONSTRUCTED_RESPONSE';
  readonly value: string;
}

export interface MathematicalProofResponse {
  readonly kind: 'MATHEMATICAL_PROOF';
  readonly value: string;
  readonly proofSteps?: readonly string[];
}

export interface ChemicalStructureResponse {
  readonly kind: 'CHEMICAL_STRUCTURE';
  readonly value: string;
}

export interface ReactionMechanismResponse {
  readonly kind: 'REACTION_MECHANISM';
  readonly value: unknown;
}

export interface DataTableResponse {
  readonly kind: 'DATA_TABLE';
  readonly value: ReadonlyArray<Readonly<Record<string, unknown>>>;
}

export interface GraphResponse {
  readonly kind: 'GRAPH';
  readonly value: unknown;
}

export interface ExperimentAnalysisResponse {
  readonly kind: 'EXPERIMENT_ANALYSIS';
  readonly value: unknown;
}

export interface MultipartResponse {
  readonly kind: 'MULTIPART';
  readonly parts: Readonly<Record<string, Response>>;
}

export type Response =
  | SingleChoiceResponse
  | MultipleChoiceResponse
  | IntegerResponse
  | NumericQuantityResponse
  | SymbolicExpressionResponse
  | ConstructedResponse
  | MathematicalProofResponse
  | ChemicalStructureResponse
  | ReactionMechanismResponse
  | DataTableResponse
  | GraphResponse
  | ExperimentAnalysisResponse
  | MultipartResponse;

export type GradeStatus = 'SCORED' | 'REVIEW_PENDING' | 'INVALID' | 'UNSUPPORTED';

export interface Grade {
  readonly status: GradeStatus;
  readonly points: number | null;
  readonly maxPoints: number;
  readonly reasonCode: string;
  readonly parts?: Readonly<Record<string, Grade>>;
}

export type ArtifactKind =
  | 'NOTE'
  | 'EQUATION'
  | 'INK'
  | 'TABLE'
  | 'GRAPH'
  | 'STRUCTURE'
  | 'ATTACHMENT';

export interface WorkArtifact {
  readonly id: string;
  readonly kind: ArtifactKind;
  readonly version: 1;
  readonly value: unknown;
}

export type SessionMode = 'LEARN' | 'PRACTICE' | 'SIMULATED_EXAM';

export interface Session {
  readonly id: string;
  readonly releaseId: string;
  readonly item: Ref;
  readonly origin: Ref | null;
  readonly returnRoute: string | null;
  readonly mode: SessionMode;
  readonly cursor: number;
  readonly attemptIds: readonly string[];
  readonly draftId: string | null;
}

export interface Attempt {
  readonly id: string;
  readonly sessionId: string;
  readonly item: Ref;
  readonly releaseId: string;
  readonly response: Response;
  readonly work: readonly WorkArtifact[];
  readonly hintIds: readonly string[];
  readonly submittedAt: string;
  readonly grade: Grade;
}

// R3 additions: cognitive-runtime.md controls transitions, not UI buttons.
export type CognitiveStage =
  | 'PREDICT'
  | 'ATTEMPT'
  | 'RECONSTRUCT'
  | 'DIAGNOSE'
  | 'REPAIR'
  | 'BOUNDARY_TEST'
  | 'COMPLETE';

export type CognitiveEventType =
  | 'PREDICTION_COMMITTED'
  | 'HELP_EXPOSED'
  | 'FIRST_COMMITTED'
  | 'RECONSTRUCTION_COMMITTED'
  | 'DIAGNOSIS_COMMITTED'
  | 'REPAIR_COMMITTED'
  | 'BOUNDARY_COMMITTED'
  | 'BOUNDARY_FEEDBACK_VIEWED'
  | 'SOURCE_RETURNED';

export interface CognitiveEvent {
  readonly schema_version: 'g9-cognitive-event/1';
  readonly event_id: string;
  readonly journey_id: string;
  readonly release_id: string;
  readonly task_ref: Ref;
  readonly sequence: number;
  readonly previous_sha256: string | null;
  readonly event_type: CognitiveEventType;
  readonly payload: Readonly<Record<string, unknown>>;
  readonly at: string;
}

export interface CognitiveSnapshot {
  readonly stage: CognitiveStage;
  readonly firstAttemptId: string | null;
  readonly boundaryAttemptId: string | null;
  readonly assisted: boolean;
  readonly lastHash: string | null;
  readonly eventIds: readonly string[];
}

export interface ReasoningField {
  readonly id: string;
  readonly kind: Kind;
  readonly required: boolean;
  readonly promptRef: Ref;
  readonly privateMoveRef?: Ref;
}

// R4 engineering projections. Reconcile exact native schemas first; no approval authority.
export type NativeCore =
  | 'CORE1'
  | 'CORE1A'
  | 'CORE1B'
  | 'CORE2'
  | 'CORE2A'
  | 'CORE2B'
  | 'CORE3';

export type ResourceKind =
  | 'STRUCTURED_PRODUCT'
  | 'QUESTION_COLLECTION'
  | 'OPAQUE_APP'
  | 'GUIDED_SESSION'
  | 'CONVERTED_DOCUMENT'
  | 'OWNER_TOOL'
  | 'RUNTIME_HOST'
  | 'PORTABLE_SCENE'
  | 'NATIVE_COMPONENT';

export interface ResourceLaunch {
  readonly resourceId: string;
  readonly revision: number;
  readonly releaseId: string;
  readonly sessionId: string;
  readonly origin: Ref | null;
  readonly returnRouteId: string | null;
}

export type ExplorerStage =
  | 'PREDICT'
  | 'MANIPULATE'
  | 'OBSERVE'
  | 'CONTRADICT'
  | 'DECONSTRUCT'
  | 'RECONSTRUCT'
  | 'INVARIANT'
  | 'BOUNDARY'
  | 'FADE'
  | 'TRANSFER';
