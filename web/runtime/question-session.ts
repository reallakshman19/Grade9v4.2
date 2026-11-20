/**
 * web/runtime/question-session.ts
 * A17/A18/A19/A24 — Release-bound, durable question session factory.
 *
 * Implements:
 * - Exact TaskRef and Ref<'ASSESSMENT'> preservation from release authority
 * - Strict verification: rejects missing/invalid revisions and forged SHA-256 digests
 * - Persistent storage binding via IndexedDBStorageDriver (createStorageDriver)
 * - Honest disclosure policy: unreviewed items yield DURABLE_COMMIT_REVIEW_PENDING with null points
 * - Deterministic, collision-free session and attempt identities
 * - Zero client-side answer key retention before verified commitment
 *
 * No academic approval inferred from software validation.
 */

import { createStorageDriver, type StorageDriver } from './storage.ts';
import { DefaultProgressStore } from './progress.ts';
import { Session as DurableSessionController } from './session.ts';
import { StandardAssessmentEngine, SCORING_VERSION, type AssessmentContract } from './assessment.ts';
import { canonicalJson, computeSha256, sameRef } from './loader.ts';
import type { Session, TaskRef, Ref } from './types.ts';
import type { WorkspaceBinding } from '../components/question-workspace.ts';

export interface AuthorizedQuestionEntry {
  readonly task: TaskRef;
  readonly assessment: Ref<'ASSESSMENT'>;
  readonly contract: AssessmentContract;
  readonly isReviewedForDisclosure?: boolean;
}

export async function createAuthorizedQuestionSession(
  releaseId: string,
  entry: AuthorizedQuestionEntry,
  learnerId: string = 'diagnostic_learner',
  customDriver?: StorageDriver
): Promise<WorkspaceBinding> {
  const { task, assessment, contract, isReviewedForDisclosure = false } = entry;

  // 1. Exact Task and Assessment Identity Checks
  if (!contract || !Number.isSafeInteger(contract.revision)) {
    throw new Error('INVALID_ASSESSMENT_REVISION');
  }
  if (!contract.task_ref || !sameRef(contract.task_ref, task)) {
    throw new Error('ASSESSMENT_TASK_MISMATCH');
  }
  if (assessment.type !== 'ASSESSMENT' || assessment.id !== contract.id || assessment.revision !== contract.revision) {
    throw new Error('ASSESSMENT_IDENTITY_MISMATCH');
  }
  const computedSha = await computeSha256(canonicalJson(contract));
  if (assessment.sha256 !== computedSha) {
    throw new Error('ASSESSMENT_DIGEST_MISMATCH');
  }

  // 2. Register with StandardAssessmentEngine
  // Engine allowlist must bind the exact authorized assessment and task pair
  const engine = new StandardAssessmentEngine([{ assessment, task }]);
  await engine.registerContract(contract, assessment);

  // 3. Initialize Persistent Storage Driver (IndexedDB in browser, fallback for Node/CI)
  const driver = customDriver || createStorageDriver({ dbName: 'grade9_wpe_runtime' });

  // 4. Stable, deterministic Session and Attempt Identity
  const sessionId = `ses:${releaseId}:${task.id}:${learnerId}`;
  const attemptId = `att:${sessionId}:1`;

  let ses = await driver.get<Session>('sessions', sessionId);
  if (!ses) {
    ses = {
      id: sessionId,
      releaseId,
      item: task,
      mode: 'PRACTICE',
      contentRevision: `rev:${task.revision}`,
      origin: { type: 'LESSON', id: 'lesson:wpe-origin', revision: 1, sha256: '0'.repeat(64) },
      returnRoute: '/subject/physics/topic/wpe/questions',
      cursor: 0,
      attemptIds: [],
      draftId: null,
    };
    await driver.put('sessions', sessionId, ses);
  }
  const currentSession: Session = ses;

  // 5. Progress Store with qualified attempt validation
  const progress = new DefaultProgressStore(
    driver,
    async (a) =>
      a.releaseId === releaseId &&
      sameRef(a.item, task) &&
      sameRef(a.assessmentRef!, assessment) &&
      a.scoringVersion === SCORING_VERSION &&
      canonicalJson(a.grade) === canonicalJson(await engine.evaluate(a.response, assessment, 'PRACTICE', task))
  );

  // 6. Durable Session Controller with honest disclosure policy
  const session = new DurableSessionController(
    { sessionId: currentSession.id, releaseId, item: task, mode: 'PRACTICE' },
    driver,
    progress,
    {
      liveRevision: async () => `rev:${task.revision}`,
      reviewedDisclosure: async () => isReviewedForDisclosure, // Honest review authority
    }
  );

  return {
    releaseId,
    task,
    assessment,
    attemptId,
    session,
    progress,
    engine,
  };
}
