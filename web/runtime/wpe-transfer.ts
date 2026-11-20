/**
 * web/runtime/wpe-transfer.ts
 * Authorized Transfer Session and Cognitive Binding for Core 1B (Physics WPE).
 *
 * Implements:
 * - A32/A49/A52 authorized cognitive binding
 * - Dual-task multipart contracts (Fresh task A and Boundary task B)
 * - Persistent storage with DefaultCognitiveStore and DefaultProgressStore
 *
 * No academic approval inferred from software validation.
 */

import { createStorageDriver, type StorageDriver } from './storage.ts';
import { DefaultProgressStore } from './progress.ts';
import { DefaultCognitiveStore } from './cognitive-store.ts';
import { CognitiveController, type CognitiveAuthority } from '../journeys/cognitive-controller.ts';
import { StandardAssessmentEngine, SCORING_VERSION, type AssessmentContract } from './assessment.ts';
import { canonicalJson, computeSha256, sameRef } from './loader.ts';
import { transferDefinitionDigest, type Core1BTransferDefinition, type TransferBinding } from '../journeys/core1b.ts';
import type { Ref, TaskRef, Session, JourneyKey, Response } from './types.ts';

const ref = <T extends Ref['type']>(type: T, id: string, sha256 = 'a'.repeat(64)): Ref<T> => ({
  type,
  id,
  revision: 1,
  sha256,
});

export async function createAuthorizedTransferSession(
  customDriver?: StorageDriver
): Promise<{ definition: Core1BTransferDefinition; binding: TransferBinding }> {
  const driver = customDriver || createStorageDriver({ dbName: 'grade9_wpe_transfer' });
  const bytes = new Map<string, Uint8Array>();

  const asset = async <T extends Ref['type']>(type: T, id: string, text: string) => {
    const v = new TextEncoder().encode(text);
    bytes.set(id, v);
    return ref(type, id, await computeSha256(v));
  };

  const origin = ref('LESSON', 'lesson:wpe-origin');
  const first: TaskRef = await asset('FRESH_TASK', 'fresh:wpe:task:a', 'First transfer task bytes');
  const boundary: TaskRef = await asset('FRESH_TASK', 'fresh:wpe:task:b', 'Boundary transfer task bytes');
  const firstRef = await asset('SOLUTION', 'solution:wpe:task:a', 'Reviewed solution reference for A');
  const boundaryRef = await asset('SOLUTION', 'solution:wpe:task:b', 'Reviewed boundary solution reference for B');
  const hint1 = await asset('ASSET', 'asset:wpe:hint:h1', 'Normal force is perpendicular to incline');
  const hint2 = await asset('ASSET', 'asset:wpe:hint:h2', 'Work energy theorem balance');

  const releaseId = 'release:wpe:transfer:v1';
  const key: JourneyKey = {
    journeyId: 'journey:wpe-transfer',
    taskInstanceId: 'instance:wpe-transfer',
    releaseId,
    task: first,
  };

  const makeSession = (id: string, item: Ref, originRef: Ref | null): Session => ({
    id,
    item,
    releaseId,
    origin: originRef,
    mode: 'PRACTICE',
    contentRevision: 'r1',
    deadlineAt: null,
    returnRoute: '/subject/physics/topic/wpe/learn-try',
    cursor: 7,
    attemptIds: [],
    draftId: null,
  });

  const os = makeSession('session:wpe:origin', origin, null);
  const as = makeSession('session:wpe:first', first, origin);
  const bs = makeSession('session:wpe:boundary', boundary, origin);

  for (const s of [os, as, bs]) {
    const existing = await driver.get<Session>('sessions', s.id);
    if (!existing) await driver.put('sessions', s.id, s);
  }

  const definition: Core1BTransferDefinition = {
    journeyId: key.journeyId,
    originRef: origin,
    freshTaskA: {
      taskRef: first,
      title: 'Fresh Transfer Task A — Incline with Friction',
      prompt: 'A 5 kg crate slides down a 30-degree incline of length 10 m with friction coeff μ = 0.2. Calculate work done by friction.',
      conditions: ['Incline angle θ = 30°', 'Length d = 10 m', 'Friction coeff μ = 0.2'],
      solutionRef: firstRef,
      solutionSteps: ['Normal force N = mg cos(30°)', 'Friction f = μN', 'W = -f * d'],
      targetNumeric: { value: 84.87, unit: 'J', tolerance: 0.5 },
    },
    boundaryTaskB: {
      taskRef: boundary,
      title: 'Boundary Transfer Task B — Quadratic Drag',
      prompt: 'Verify energy conservation when quadratic aerodynamic drag is introduced.',
      conditions: ['Drag F_d = -c * v^2'],
      solutionRef: boundaryRef,
      solutionSteps: ['Integrate net work along the velocity trajectory'],
    },
    hints: [
      { level: 'H1', assetRef: hint1, text: 'Normal force is perpendicular to incline', guidance: 'Normal force is mg cos(θ)' },
      { level: 'H2', assetRef: hint2, text: 'Work energy theorem balance', guidance: 'W_net = ΔK' },
    ],
    diagnosticRules: [
      { code: 'move:normal-force', label: 'Normal Force Misconception', misconceptionDescription: 'Using mg instead of mg cos(θ)', correctiveGuidance: 'Project perpendicular to incline' },
    ],
    qualitativePredictionPrompt: 'Predict whether friction work increases or decreases as incline angle steepens',
    predictionOptions: ['Friction work decreases', 'Friction work increases', 'Friction work stays constant'],
    expectedPredictionIndex: 0,
    status: 'SYNTHETIC',
  };

  const firstFields = { a: 'INTEGER' as const, b: 'CONSTRUCTED_RESPONSE' as const };
  const boundaryFields = { c: 'INTEGER' as const };

  const sub = (id: string, t: TaskRef, kind: Response['kind'], value?: string): AssessmentContract => ({
    id,
    task_ref: t,
    response_kind: kind,
    max_points: 1,
    evaluator: value === undefined ? { mode: 'REVIEW_PENDING' } : { mode: 'AUTOMATIC', canonical_value: value },
  });

  const contracts: AssessmentContract[] = [
    {
      id: 'asmt:wpe-transfer:a',
      revision: 1,
      task_ref: first,
      response_kind: 'MULTIPART',
      max_points: 2,
      evaluator: { mode: 'REVIEW_PENDING' },
      parts: {
        a: sub('asmt:wpe:sub:a', first, 'INTEGER', '7'),
        b: sub('asmt:wpe:sub:b', first, 'CONSTRUCTED_RESPONSE'),
      },
    },
    {
      id: 'asmt:wpe-transfer:b',
      revision: 1,
      task_ref: boundary,
      response_kind: 'MULTIPART',
      max_points: 1,
      evaluator: { mode: 'REVIEW_PENDING' },
      parts: {
        c: sub('asmt:wpe:sub:c', boundary, 'INTEGER', '8'),
      },
    },
  ];

  const assessments = await Promise.all(
    contracts.map(async (c) => ref('ASSESSMENT', c.id, await computeSha256(canonicalJson(c))))
  );

  const engine = new StandardAssessmentEngine(
    assessments.map((assessment, i) => ({ assessment, task: contracts[i].task_ref as TaskRef }))
  );
  for (let i = 0; i < 2; i++) {
    await engine.registerContract(contracts[i], assessments[i]);
  }

  const progress = new DefaultProgressStore(driver, async (a) => {
    const i = assessments.findIndex((x) => !!a.assessmentRef && sameRef(a.assessmentRef, x));
    return (
      i >= 0 &&
      a.releaseId === releaseId &&
      a.scoringVersion === SCORING_VERSION &&
      sameRef(a.item, contracts[i].task_ref) &&
      canonicalJson(a.grade) === canonicalJson(await engine.evaluate(a.response, assessments[i], 'PRACTICE', a.item as TaskRef))
    );
  });

  const store = new DefaultCognitiveStore(driver, progress);

  const authority: CognitiveAuthority = {
    liveRevision: async () => 'r1',
    reviewedContext: async () => ({
      releaseId,
      task: first,
      boundaryTask: boundary,
      firstReference: firstRef,
      boundaryReference: boundaryRef,
      firstFields,
      boundaryFields,
      moves: ['move:normal-force'],
    }),
    allowed: async (_j, _s, cap, asset) =>
      (cap === 'H1' && sameRef(asset, hint1)) ||
      (cap === 'H2' && sameRef(asset, hint2)) ||
      (cap === 'REFERENCE_SOLUTION' && sameRef(asset, firstRef)) ||
      (cap === 'BOUNDARY_REFERENCE' && sameRef(asset, boundaryRef)) ||
      (cap === 'VIEW_STIMULUS' && sameRef(asset, boundary)) ||
      (cap === 'SOURCE_RETURN' && sameRef(asset, origin)),
    boundaryAllowed: async (_j, x) => sameRef(x, boundary),
  };

  const controller = new CognitiveController(
    { journey: key, sessionId: as.id, originSessionId: os.id },
    store,
    driver,
    authority
  );

  const binding: TransferBinding = {
    controller,
    driver,
    progress,
    engine,
    definitionSha256: await transferDefinitionDigest(definition),
    boundarySessionId: bs.id,
    assessmentA: assessments[0],
    assessmentB: assessments[1],
    loadProtected: async (a: Ref) => Uint8Array.from(bytes.get(a.id) ?? []),
  };

  return { definition, binding };
}
