/**
 * tests/runtime/question_session.spec.ts
 * Gates P3-G2, P3-G3, P3-G4 — Core 2 Assessment Authority, Durability, and Secrecy Tests.
 *
 * Verifies:
 * - P3-G2: Authority verification (exact TaskRef match, rejection of forged digests/unauthorized injection)
 * - P3-G3: Durable persistence, draft roundtrip, commit conflict prevention, transaction rollback
 * - P3-G4: Honest disclosure bounds (unreviewed yields null points, HOLD yields HOLD_UNGRADED, zero pre-commit answer leaks)
 *
 * No academic approval inferred from software validation.
 */

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { MemoryStorageDriver, StorageError } from '../../web/runtime/storage.ts';
import {
  createAuthorizedQuestionSession,
  type AuthorizedQuestionEntry,
} from '../../web/runtime/question-session.ts';
import {
  WPE_RELEASE_ID,
  DESCRIPTOR_WPE_01,
  DESCRIPTOR_WPE_04,
  CONTRACT_WPE_01,
  CONTRACT_WPE_04,
  getAuthorizedWpeEntry,
} from '../../web/runtime/wpe-deck.ts';
import { createQuestionWorkspace } from '../../web/components/question-workspace.ts';
import type { TaskRef } from '../../web/runtime/types.ts';

describe('Gate P3-G2 — Authority Verification & Anti-Injection', () => {
  it('rejects assessment contract with mismatched digest', async () => {
    const entry = await getAuthorizedWpeEntry('PHYS-WPE-01');
    const forgedEntry: AuthorizedQuestionEntry = {
      ...entry,
      assessment: {
        ...entry.assessment,
        sha256: '0'.repeat(64), // Forged digest
      },
    };
    await assert.rejects(
      async () => createAuthorizedQuestionSession(WPE_RELEASE_ID, forgedEntry, 'learner_test', new MemoryStorageDriver()),
      /ASSESSMENT_DIGEST_MISMATCH/
    );
  });

  it('rejects assessment contract referencing foreign task', async () => {
    const entry = await getAuthorizedWpeEntry('PHYS-WPE-01');
    const foreignTask: TaskRef = {
      type: 'QUESTION',
      id: 'FOREIGN-TASK-99',
      revision: 1,
      sha256: '1'.repeat(64),
    };
    const forgedEntry: AuthorizedQuestionEntry = {
      ...entry,
      task: foreignTask,
    };
    await assert.rejects(
      async () => createAuthorizedQuestionSession(WPE_RELEASE_ID, forgedEntry, 'learner_test', new MemoryStorageDriver()),
      /ASSESSMENT_TASK_MISMATCH/
    );
  });

  it('rejects missing or invalid contract revision', async () => {
    const entry = await getAuthorizedWpeEntry('PHYS-WPE-01');
    const invalidEntry: any = {
      ...entry,
      contract: {
        ...entry.contract,
        revision: null, // Invalid revision
      },
    };
    await assert.rejects(
      async () => createAuthorizedQuestionSession(WPE_RELEASE_ID, invalidEntry, 'learner_test', new MemoryStorageDriver()),
      /INVALID_ASSESSMENT_REVISION/
    );
  });
});

describe('Gate P3-G3 — Commitment & Durable Persistence', () => {
  it('saves and restores drafts across session re-instantiation', async () => {
    const driver = new MemoryStorageDriver();
    const entry = await getAuthorizedWpeEntry('PHYS-WPE-01');
    const binding1 = await createAuthorizedQuestionSession(WPE_RELEASE_ID, entry, 'learner_42', driver);

    const ws1 = createQuestionWorkspace(DESCRIPTOR_WPE_01, 'LANDSCAPE', binding1);
    ws1.updateResponse({ kind: 'SINGLE_CHOICE', selectedOptionId: 'opt-b' });
    assert.equal(ws1.getViewState().submissionStatus, 'DIRTY');
    await ws1.saveDraft();
    assert.equal(ws1.getViewState().submissionStatus, 'DRAFT_SAVED');

    // Simulate page reload / new binding with same persistent driver and identity
    const binding2 = await createAuthorizedQuestionSession(WPE_RELEASE_ID, entry, 'learner_42', driver);
    const ws2 = createQuestionWorkspace(DESCRIPTOR_WPE_01, 'LANDSCAPE', binding2);
    await ws2.restore();

    assert.equal(ws2.getViewState().submissionStatus, 'DRAFT_SAVED');
    assert.equal(ws2.getViewState().canSubmit, true);
  });

  it('enforces commit lock and rejects conflicting second attempt', async () => {
    const driver = new MemoryStorageDriver();
    const entry = await getAuthorizedWpeEntry('PHYS-WPE-01');
    const binding = await createAuthorizedQuestionSession(WPE_RELEASE_ID, entry, 'learner_commit_lock', driver);

    const ws = createQuestionWorkspace(DESCRIPTOR_WPE_01, 'LANDSCAPE', binding);
    ws.updateResponse({ kind: 'SINGLE_CHOICE', selectedOptionId: 'opt-b' });

    // Submit attempt
    const evalResult = await ws.submit();
    assert.equal(ws.getViewState().isLocked, true);
    assert.equal(ws.getViewState().submissionStatus, 'COMMITTED_LOCKED');
    assert.equal(evalResult.status, 'CORRECT');

    // Attempt mutation while locked -> silently ignored
    ws.updateResponse({ kind: 'SINGLE_CHOICE', selectedOptionId: 'opt-a' });
    assert.equal(ws.getViewState().submissionStatus, 'COMMITTED_LOCKED');

    // Calling submit again returns cached committed evaluation without creating conflict
    const cachedResult = await ws.submit();
    assert.equal(cachedResult.status, 'CORRECT');
  });

  it('rolls back cleanly on storage transaction failure hook without phantom commits', async () => {
    const driver = new MemoryStorageDriver();
    const entry = await getAuthorizedWpeEntry('PHYS-WPE-01');
    const binding = await createAuthorizedQuestionSession(WPE_RELEASE_ID, entry, 'learner_rollback', driver);

    // Inject failure hook on attempts store
    driver.setFailureHook((store, action) => {
      if (store === 'attempts' && action === 'put') {
        return new StorageError('SIMULATED_TRANSACTION_FAILURE', 'Storage write aborted');
      }
      return null;
    });

    const ws = createQuestionWorkspace(DESCRIPTOR_WPE_01, 'LANDSCAPE', binding);
    ws.updateResponse({ kind: 'SINGLE_CHOICE', selectedOptionId: 'opt-b' });

    // Submit must fail closed and re-raise error
    await assert.rejects(async () => ws.submit(), /Storage write aborted/);

    // Workspace is not locked into phantom commit
    assert.equal(ws.getViewState().isLocked, false);
    assert.equal(ws.getViewState().submissionStatus, 'DIRTY');
  });
});

describe('Gate P3-G4 — Disclosure Bounds & Pre-Commit Secrecy', () => {
  it('unreviewed diagnostic source yields REVIEW_PENDING with null points', async () => {
    const driver = new MemoryStorageDriver();
    const entry = await getAuthorizedWpeEntry('PHYS-WPE-01');
    // Force unreviewed authority
    const unreviewedEntry: AuthorizedQuestionEntry = {
      ...entry,
      isReviewedForDisclosure: false,
    };
    const binding = await createAuthorizedQuestionSession(WPE_RELEASE_ID, unreviewedEntry, 'learner_unreviewed', driver);

    const ws = createQuestionWorkspace(DESCRIPTOR_WPE_01, 'LANDSCAPE', binding);
    ws.updateResponse({ kind: 'SINGLE_CHOICE', selectedOptionId: 'opt-b' });
    const result = await ws.submit();

    // Under disclosurePolicy(), unreviewed items must yield REVIEW_PENDING with points: null
    assert.equal(result.status, 'REVIEW_PENDING');
    assert.equal(result.rawPoints, null);
    assert.equal(result.reasonCode, 'DURABLE_COMMIT_REVIEW_PENDING');
  });

  it('academic HOLD question evaluates to HOLD_UNGRADED with null points', async () => {
    const driver = new MemoryStorageDriver();
    const entry = await getAuthorizedWpeEntry('PHYS-WPE-04');
    const binding = await createAuthorizedQuestionSession(WPE_RELEASE_ID, entry, 'learner_hold', driver);

    const ws = createQuestionWorkspace(DESCRIPTOR_WPE_04, 'LANDSCAPE', binding);
    ws.updateResponse({ kind: 'SINGLE_CHOICE', selectedOptionId: 'opt-a' });
    const result = await ws.submit();

    // Academic HOLD question NEVER awards points or claims mastery
    assert.equal(result.status, 'HOLD_UNGRADED');
    assert.equal(result.academicHold, true);
    assert.equal(result.rawPoints, null);
    assert.equal(result.reasonCode, 'QUESTION_ON_ACADEMIC_HOLD');
  });

  it('public descriptors contain zero private master answer keys or rubrics', () => {
    for (const desc of [DESCRIPTOR_WPE_01, DESCRIPTOR_WPE_04]) {
      const keys = Object.keys(desc);
      assert.equal(keys.includes('correctKey'), false);
      assert.equal(keys.includes('answer'), false);
      assert.equal(keys.includes('solution'), false);
      assert.equal(keys.includes('rubric'), false);
      assert.equal(keys.includes('marking_scheme'), false);
    }
  });
});
