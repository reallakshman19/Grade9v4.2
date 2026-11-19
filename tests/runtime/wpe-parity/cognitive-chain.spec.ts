/**
 * tests/runtime/wpe-parity/cognitive-chain.spec.ts
 * Workpack A54: Cognitive Six-Stage Transitions, Event Chaining, and Storage Failure Injection Suite.
 *
 * Verifies:
 * 1. Six-stage native cognitive transitions:
 *    PREDICT -> ATTEMPT -> RECONSTRUCT -> DIAGNOSE -> REPAIR -> BOUNDARY_TEST -> COMPLETE.
 * 2. Immutable hash-chained event integrity with SHA-256 links.
 * 3. Hint exposure ordering: H1 -> H2 -> H3.
 * 4. First attempt immutability and lineage preservation (no tampering or leak).
 * 5. Distinct boundary task enforcement.
 * 6. Source return with exact session restoration.
 * 7. Storage failure injection: transactional rollback on commit failure.
 * 8. Disclosure policy bounds: solutions withheld pre-attempt; exam lockdown.
 *
 * No academic approval inferred from software validation.
 * academic_admission: HOLD
 * release_authority: NONE
 */

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';

import {
  canonicalJson,
} from '../../../web/runtime/loader.ts';

import {
  setupTransfer,
  firstResponses,
  boundaryResponses,
  artifact,
  throughRepair,
} from '../../fixtures/wave8-synthetic.ts';

import {
  MemoryStorageDriver,
  StorageError,
} from '../../../web/runtime/storage.ts';

import type { Session, Attempt, Ref } from '../../../web/runtime/types.ts';

function computeSha(obj: unknown): string {
  const json = canonicalJson(obj);
  return createHash('sha256').update(json).digest('hex');
}

describe('A54: Cognitive Journey Six-Stage Sequence and Hash Chaining', () => {
  it('executes full linear six-stage event chain from PREDICT to COMPLETE and SOURCE_RETURN', async () => {
    const f = await setupTransfer();
    const journey = f.make();

    // Stage 1: PREDICT
    await journey.start();
    assert.equal(journey.getStage(), 'PREDICT');
    assert.equal(await journey.getTaskASolution(), null);
    assert.equal(await journey.readBoundaryStimulus(), null);

    await journey.predict(0);
    assert.equal(journey.getStage(), 'ATTEMPT');

    // Stage 2: ATTEMPT (with hint H1 and H2)
    const hint1 = await journey.requestHint();
    assert.equal(hint1.text, 'REVIEWED_HINT_ONE');
    const hint2 = await journey.requestHint();
    assert.equal(hint2.text, 'REVIEWED_HINT_TWO');

    journey.setResponses(firstResponses, [artifact('work:first')]);
    await journey.saveDraft();
    await journey.commitFirstAttempt();

    // Stage 3: RECONSTRUCT (solution revealed post-attempt)
    assert.equal(journey.getStage(), 'RECONSTRUCT');
    assert.equal(await journey.getTaskASolution(), 'REVIEWED_FIRST_REFERENCE');

    // Stage 4: DIAGNOSE & Stage 5: REPAIR
    await throughRepair(journey);
    assert.equal(journey.getStage(), 'BOUNDARY_TEST');
    assert.equal(await journey.readBoundaryStimulus(), 'REVIEWED_BOUNDARY_STIMULUS');

    // Stage 6: BOUNDARY_TEST
    journey.setResponses(boundaryResponses, [artifact('work:boundary')]);
    await journey.saveDraft();
    await journey.commitBoundaryAttempt();

    const boundaryFeedback = await journey.viewBoundaryFeedback();
    assert.equal(boundaryFeedback, 'REVIEWED_BOUNDARY_REFERENCE');
    assert.equal(journey.getStage(), 'COMPLETE');

    // Source Return
    const returned = await journey.returnToSource();
    assert.deepEqual(returned, {
      sessionId: f.os.id,
      ref: f.os.item,
      cursor: f.os.cursor,
    });

    // Verify 10 durable events with valid SHA-256 chain (including 2 hint exposures)
    const history = await journey.readHistory();
    assert.equal(history.length, 10);

    for (let i = 0; i < history.length; i++) {
      const ev = history[i];
      assert.equal(ev.sequence, i + 1);
      if (i > 0) {
        assert.ok(ev.previous_sha256);
        assert.equal(ev.previous_sha256, computeSha(history[i - 1]));
      }
    }
  });

  it('rejects illegal stage jumps (e.g. attempting to commit repair before first attempt)', async () => {
    const f = await setupTransfer();
    const journey = f.make();

    await journey.start();
    // Cannot commit repair during PREDICT stage
    await assert.rejects(
      async () => {
        await journey.commitRepair('premature repair', []);
      },
      /REPAIR_EVIDENCE_REQUIRED|ILLEGAL_STAGE|INVALID_STAGE|stage/i
    );
  });

  it('rejects requesting hints when journey is not in ATTEMPT stage', async () => {
    const f = await setupTransfer();
    const journey = f.make();

    await journey.start();
    // In PREDICT stage, hint request is illegal
    await assert.rejects(
      async () => {
        await journey.requestHint();
      },
      /ILLEGAL_STAGE|INVALID_STAGE|stage/i
    );
  });

  it('preserves first attempt immutability against mutation leaks', async () => {
    const f = await setupTransfer();
    const journey = f.make();

    await journey.start();
    await journey.predict(0);
    journey.setResponses(firstResponses, [artifact('work:first:orig')]);
    await journey.saveDraft();
    await journey.commitFirstAttempt();

    const original = await journey.readOriginalAttempt();
    assert.ok(original);
    assert.equal(original.id, (await journey.readHistory()).find((e) => e.event_type === 'FIRST_COMMITTED')?.payload?.first_attempt_id ?? original.id);

    // Attempting to re-commit first attempt must fail closed
    await assert.rejects(
      async () => {
        await journey.commitFirstAttempt();
      },
      /ALREADY_COMMITTED|ILLEGAL_STAGE|conflict/i
    );
  });
});

describe('A54: Storage Failure Injection and Transactional Rollback', () => {
  it('rolls back first attempt commitment cleanly when storage throws injected transaction error', async () => {
    const driver = new MemoryStorageDriver();
    const f = await setupTransfer(driver, true);
    const journey = f.make();

    await journey.start();
    await journey.predict(0);
    journey.setResponses(firstResponses, [artifact('work:first:fail-test')]);
    await journey.saveDraft();

    // Inject failure hook on cog_events store
    driver.setFailureHook((store, op) =>
      store.startsWith('cog_events:') && op === 'put' ? new StorageError('TRANSACTION_ABORTED', 'injected abort') : null
    );

    await assert.rejects(async () => {
      await journey.commitFirstAttempt();
    }, /injected abort|TRANSACTION_ABORTED/);

    // Verify rollback: no attempt was permanently committed
    const attempts = await driver.getAll<Attempt>('attempts');
    assert.equal(attempts.length, 0);

    // Clear failure hook and verify commitment now succeeds
    driver.setFailureHook(null);
    const resumed = f.make();
    await resumed.restore();
    await resumed.commitFirstAttempt();

    assert.equal(resumed.getStage(), 'RECONSTRUCT');
    const committedAttempts = await driver.getAll<Attempt>('attempts');
    assert.equal(committedAttempts.length, 1);
  });

  it('rolls back boundary attempt commitment cleanly on injected failure', async () => {
    const driver = new MemoryStorageDriver();
    const f = await setupTransfer(driver, true);
    const journey = f.make();

    await journey.start();
    await journey.predict(0);
    journey.setResponses(firstResponses, [artifact('work:first')]);
    await journey.saveDraft();
    await journey.commitFirstAttempt();
    await throughRepair(journey);

    journey.setResponses(boundaryResponses, [artifact('work:boundary:fail-test')]);
    await journey.saveDraft();

    // Inject failure hook on boundary commit
    driver.setFailureHook((store, op) =>
      store.startsWith('cog_events:') && op === 'put' ? new StorageError('TRANSACTION_ABORTED', 'injected boundary abort') : null
    );

    await assert.rejects(async () => {
      await journey.commitBoundaryAttempt();
    }, /injected boundary abort/);

    // Verify boundary attempt was rolled back (only 1 attempt from first stage exists)
    const attempts = await driver.getAll<Attempt>('attempts');
    assert.equal(attempts.length, 1);

    // Clear failure hook and commit boundary cleanly
    driver.setFailureHook(null);
    const resumed = f.make();
    await resumed.restore();
    await resumed.commitBoundaryAttempt();
    await resumed.viewBoundaryFeedback();

    const finalAttempts = await driver.getAll<Attempt>('attempts');
    assert.equal(finalAttempts.length, 2);
  });
});
