// Runtime service contracts and subsystem interfaces.
// Governs storage, cognitive transitions, evaluation, disclosure, and application bridging.

import type {
  Ref,
  Kind,
  Response,
  Grade,
  WorkArtifact,
  Session,
  SessionMode,
  Attempt,
  CognitiveStage,
  CognitiveEvent,
  CognitiveSnapshot,
  NativeCore,
  ResourceLaunch,
} from './types';

export interface Capability {
  readonly kind: Kind;
  validate(value: unknown): Response;
  mount(
    root: HTMLElement,
    value: Response | null,
    onChange: (r: Response) => void
  ): () => void;
  readonly supportsOffline: boolean;
}

export interface AssessmentEngine {
  evaluate(
    response: Response,
    assessment: Ref,
    mode: SessionMode
  ): Promise<Grade>;
}

export interface ProgressStore {
  saveDraft(
    session: Session,
    response: Response,
    artifacts: readonly WorkArtifact[]
  ): Promise<void>;
  loadDraft(sessionId: string): Promise<unknown>;
  appendAttempt(attempt: Attempt): Promise<void>;
  exportAll(): Promise<Blob>;
  importVerified(blob: Blob): Promise<void>;
}

export interface RelationService {
  outbound(ref: Ref, kinds: readonly string[]): Promise<readonly Ref[]>;
  inbound(ref: Ref, kinds: readonly string[]): Promise<readonly Ref[]>;
  resolveRecovery(
    ref: Ref,
    releaseId: string,
    evidence: unknown
  ): Promise<{
    readonly eligibleRoutes: readonly Ref[];
    readonly relatedTopics: readonly Ref[];
    readonly reasonCode: string;
  }>;
}

export interface CognitiveStore {
  append(
    event: CognitiveEvent,
    expectedPreviousSha256: string | null,
    work: readonly WorkArtifact[]
  ): Promise<CognitiveSnapshot>;
  replay(
    journeyId: string,
    task: Ref,
    releaseId: string
  ): Promise<CognitiveSnapshot>;
  retry(parentJourneyId: string): Promise<string>;
}

export interface DisclosureContext {
  readonly stage: CognitiveStage;
  readonly mode: SessionMode;
  readonly capability: string;
  readonly firstCommitted: boolean;
  readonly boundaryCommitted: boolean;
  readonly reviewRef: Ref | null;
}

export interface DisclosurePolicy {
  allowed(ctx: DisclosureContext): boolean;
}

export interface ModelEvaluationResult {
  readonly outputs: Readonly<Record<string, number>>;
  readonly representationState: unknown;
  readonly domainStatus: 'VALID' | 'INVALID';
}

export interface ScientificModelAdapter {
  readonly id: string;
  readonly version: string;
  evaluate(params: Readonly<Record<string, number>>): ModelEvaluationResult;
}

export interface ResourceRegistry {
  resolve(id: string, revision: number, releaseId: string): Promise<unknown>;
  eligibleForRole(
    id: string,
    role: NativeCore | 'EXPLORER',
    stage: string
  ): Promise<boolean>;
}

export interface LegacyHost {
  mount(root: HTMLElement, launch: ResourceLaunch): Promise<void>;
  snapshot(): Promise<unknown>;
  dispose(): Promise<void>;
}
