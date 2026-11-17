// Unit and contract tests for Immutable Cognitive Event Persistence (Workpack A48).
// Verifies atomic append, hash chains, stage transitions, injected save failure protection,
// repeat ID idempotence, quarantine of stale/conflicting events, and retry immutability.
// Engineering validation: "No academic approval inferred from software validation."

import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import {
  DefaultCognitiveStore,
  CognitiveStoreError,
  computeEventHash,
  createGenesisSnapshot,
  COGNITIVE_EVENT_SCHEMA_VERSION,
} from '../../web/runtime/cognitive-store.ts';
import { MemoryStorageDriver, StorageError } from '../../web/runtime/storage.ts';
import type { CognitiveEvent, Ref, WorkArtifact } from '../../web/runtime/types.ts';

function makeTaskRef(id = 'que:physics:wpe:01'): Ref {
  return {
    type: 'QUESTION',
    id,
    revision: 1,
    sha256: '4b76c8c4a1de2a8c3e414c778931215b22eb1fbc659422df563b78be05c1e5e2',
  };
}

function makeEvent(
  journeyId: string,
  sequence: number,
  eventType: any,
  previousSha256: string | null,
  payload: Record<string, unknown> = {}
): CognitiveEvent {
  return {
    schema_version: COGNITIVE_EVENT_SCHEMA_VERSION,
    event_id: `evt:${journeyId}:${sequence}`,
    journey_id: journeyId,
    release_id: 'rel:synthetic:demo:2026',
    task_ref: makeTaskRef(),
    sequence,
    previous_sha256: previousSha256,
    event_type: eventType,
    payload,
    at: new Date(Date.UTC(2026, 10, 17, 12, sequence)).toISOString(),
  };
}

describe('Cognitive Hash Chains & Stage Transitions', () => {
  let driver: MemoryStorageDriver;
  let store: DefaultCognitiveStore;

  beforeEach(() => {
    driver = new MemoryStorageDriver();
    store = new DefaultCognitiveStore(driver);
  });

  it('progresses through all canonical cognitive stages from genesis to completion', async () => {
    const journeyId = 'jrn:full:01';

    // 1. PREDICTION_COMMITTED (Genesis)
    const ev1 = makeEvent(journeyId, 1, 'PREDICTION_COMMITTED', null, {
      prediction: 'Cart rebounds with speed v',
    });
    const snap1 = await store.append(ev1, null);
    assert.equal(snap1.stage, 'ATTEMPT');
    assert.equal(snap1.assisted, false);
    assert.equal(snap1.firstAttemptId, null);
    assert.equal(snap1.eventIds.length, 1);
    const hash1 = await computeEventHash(ev1);
    assert.equal(snap1.lastHash, hash1);

    // 2. HELP_EXPOSED
    const ev2 = makeEvent(journeyId, 2, 'HELP_EXPOSED', hash1, { capability: 'H1' });
    const snap2 = await store.append(ev2, hash1);
    assert.equal(snap2.stage, 'ATTEMPT');
    assert.equal(snap2.assisted, true);
    const hash2 = await computeEventHash(ev2);
    assert.equal(snap2.lastHash, hash2);

    // 3. FIRST_COMMITTED (Advances stage to RECONSTRUCT, records firstAttemptId)
    const ev3 = makeEvent(journeyId, 3, 'FIRST_COMMITTED', hash2, {
      attempt_id: 'att:first:01',
    });
    const snap3 = await store.append(ev3, hash2);
    assert.equal(snap3.stage, 'RECONSTRUCT');
    assert.equal(snap3.firstAttemptId, 'att:first:01');
    const hash3 = await computeEventHash(ev3);

    // 4. RECONSTRUCTION_COMMITTED (Advances to DIAGNOSE)
    const ev4 = makeEvent(journeyId, 4, 'RECONSTRUCTION_COMMITTED', hash3, {});
    const snap4 = await store.append(ev4, hash3);
    assert.equal(snap4.stage, 'DIAGNOSE');
    const hash4 = await computeEventHash(ev4);

    // 5. DIAGNOSIS_COMMITTED (Advances to REPAIR)
    const ev5 = makeEvent(journeyId, 5, 'DIAGNOSIS_COMMITTED', hash4, {});
    const snap5 = await store.append(ev5, hash4);
    assert.equal(snap5.stage, 'REPAIR');
    const hash5 = await computeEventHash(ev5);

    // 6. REPAIR_COMMITTED (Advances to BOUNDARY_TEST)
    const ev6 = makeEvent(journeyId, 6, 'REPAIR_COMMITTED', hash5, {});
    const snap6 = await store.append(ev6, hash5);
    assert.equal(snap6.stage, 'BOUNDARY_TEST');
    const hash6 = await computeEventHash(ev6);

    // 7. BOUNDARY_COMMITTED (Records boundaryAttemptId)
    const ev7 = makeEvent(journeyId, 7, 'BOUNDARY_COMMITTED', hash6, {
      attempt_id: 'att:boundary:01',
    });
    const snap7 = await store.append(ev7, hash6);
    assert.equal(snap7.stage, 'BOUNDARY_TEST');
    assert.equal(snap7.boundaryAttemptId, 'att:boundary:01');
    const hash7 = await computeEventHash(ev7);

    // 8. BOUNDARY_FEEDBACK_VIEWED (Advances to COMPLETE)
    const ev8 = makeEvent(journeyId, 8, 'BOUNDARY_FEEDBACK_VIEWED', hash7, {});
    const snap8 = await store.append(ev8, hash7);
    assert.equal(snap8.stage, 'COMPLETE');
    assert.equal(snap8.eventIds.length, 8);
  });

  it('replays journey deterministically from genesis to tip, verifying all links', async () => {
    const journeyId = 'jrn:replay:01';
    const ev1 = makeEvent(journeyId, 1, 'PREDICTION_COMMITTED', null);
    await store.append(ev1, null);
    const hash1 = await computeEventHash(ev1);

    const ev2 = makeEvent(journeyId, 2, 'FIRST_COMMITTED', hash1, { attempt_id: 'att:rep:01' });
    await store.append(ev2, hash1);
    const hash2 = await computeEventHash(ev2);

    // Replay journey
    const replayed = await store.replay(journeyId, makeTaskRef(), 'rel:synthetic:demo:2026');
    assert.equal(replayed.stage, 'RECONSTRUCT');
    assert.equal(replayed.firstAttemptId, 'att:rep:01');
    assert.equal(replayed.lastHash, hash2);
    assert.equal(replayed.eventIds.length, 2);
  });
});

describe('Injected Save Failure & No Stage Unlock', () => {
  it('rolls back completely on save failure: stage remains previous and no unlock occurs', async () => {
    const driver = new MemoryStorageDriver();
    const store = new DefaultCognitiveStore(driver);
    const journeyId = 'jrn:fail:01';

    // 1. Successfully commit prediction -> stage becomes ATTEMPT
    const ev1 = makeEvent(journeyId, 1, 'PREDICTION_COMMITTED', null);
    const snap1 = await store.append(ev1, null);
    assert.equal(snap1.stage, 'ATTEMPT');
    const hash1 = await computeEventHash(ev1);

    // 2. Inject failure on FIRST_COMMITTED
    driver.setFailureHook((storeKey, action) => {
      if (storeKey.includes(journeyId) && action === 'put') {
        return new StorageError('TRANSACTION_ABORTED', 'Injected storage crash');
      }
      return null;
    });

    const ev2 = makeEvent(journeyId, 2, 'FIRST_COMMITTED', hash1, { attempt_id: 'att:failed' });

    await assert.rejects(
      async () => {
        await store.append(ev2, hash1);
      },
      (err: unknown) => err instanceof StorageError && err.code === 'TRANSACTION_ABORTED'
    );

    // 3. Clear hook and verify state: MUST NOT UNLOCK!
    driver.setFailureHook(null);
    const replayed = await store.replay(journeyId, makeTaskRef(), 'rel:synthetic:demo:2026');

    // Stage MUST be ATTEMPT (previous state), NOT RECONSTRUCT!
    assert.equal(replayed.stage, 'ATTEMPT');
    assert.equal(replayed.firstAttemptId, null);
    assert.equal(replayed.lastHash, hash1);
    assert.equal(replayed.eventIds.length, 1);
  });
});

describe('Repeat ID No Duplicate & Collision Quarantine', () => {
  let driver: MemoryStorageDriver;
  let store: DefaultCognitiveStore;

  beforeEach(() => {
    driver = new MemoryStorageDriver();
    store = new DefaultCognitiveStore(driver);
  });

  it('handles repeat identical event ID idempotently without appending duplicates', async () => {
    const journeyId = 'jrn:dup:01';
    const ev1 = makeEvent(journeyId, 1, 'PREDICTION_COMMITTED', null);

    const snap1 = await store.append(ev1, null);
    // Append the exact same event again
    const snap2 = await store.append(ev1, null);

    assert.equal(snap1.lastHash, snap2.lastHash);
    assert.equal(snap2.eventIds.length, 1); // No duplicate entry!
  });

  it('quarantines and rejects repeat event ID with differing content', async () => {
    const journeyId = 'jrn:dup:02';
    const ev1 = makeEvent(journeyId, 1, 'PREDICTION_COMMITTED', null, { val: 'Original' });
    await store.append(ev1, null);

    // Conflicting event using same event_id
    const conflictingEvent: CognitiveEvent = {
      ...ev1,
      payload: { val: 'Tampered' },
    };

    await assert.rejects(
      async () => {
        await store.append(conflictingEvent, null);
      },
      (err: unknown) => {
        assert(err instanceof CognitiveStoreError);
        assert.equal(err.code, 'EVENT_ID_COLLISION');
        return true;
      }
    );

    // Verify event was quarantined
    const quarantined = await store.getQuarantinedEvents(journeyId);
    assert.equal(quarantined.length, 1);
    assert.equal(quarantined[0].event.event_id, ev1.event_id);
    assert(quarantined[0].reason.includes('differing content'));
  });
});

describe('Conflict & Stale Hash Quarantine', () => {
  let driver: MemoryStorageDriver;
  let store: DefaultCognitiveStore;

  beforeEach(() => {
    driver = new MemoryStorageDriver();
    store = new DefaultCognitiveStore(driver);
  });

  it('quarantines event with stale previous hash and protects valid chain', async () => {
    const journeyId = 'jrn:stale:01';
    const ev1 = makeEvent(journeyId, 1, 'PREDICTION_COMMITTED', null);
    await store.append(ev1, null);

    // Fake/stale previous hash
    const fakePrevHash = 'f'.repeat(64);
    const staleEv = makeEvent(journeyId, 2, 'HELP_EXPOSED', fakePrevHash);

    await assert.rejects(
      async () => {
        await store.append(staleEv, fakePrevHash);
      },
      (err: unknown) => {
        assert(err instanceof CognitiveStoreError);
        assert.equal(err.code, 'STALE_HASH');
        return true;
      }
    );

    // Verify quarantine entry created
    const quarantined = await store.getQuarantinedEvents(journeyId);
    assert.equal(quarantined.length, 1);
    assert.equal(quarantined[0].event.event_id, staleEv.event_id);

    // Chain remains pristine with 1 event
    const replayed = await store.replay(journeyId, makeTaskRef(), 'rel:synthetic:demo:2026');
    assert.equal(replayed.eventIds.length, 1);
  });

  it('quarantines event with sequence gap (sequence > expected)', async () => {
    const journeyId = 'jrn:gap:01';
    const ev1 = makeEvent(journeyId, 1, 'PREDICTION_COMMITTED', null);
    await store.append(ev1, null);
    const hash1 = await computeEventHash(ev1);

    // Skip sequence 2 and try appending sequence 3
    const gapEv = makeEvent(journeyId, 3, 'FIRST_COMMITTED', hash1);

    await assert.rejects(
      async () => {
        await store.append(gapEv, hash1);
      },
      (err: unknown) => {
        assert(err instanceof CognitiveStoreError);
        assert.equal(err.code, 'CHAIN_DIVERGENCE');
        return true;
      }
    );

    const quarantined = await store.getQuarantinedEvents(journeyId);
    assert.equal(quarantined.length, 1);
    assert(quarantined[0].reason.includes('Sequence gap'));
  });
});

describe('Retry Immutability & Provenance Isolation', () => {
  it('retry creates child journey while keeping parent journey firstAttemptId immutable', async () => {
    const driver = new MemoryStorageDriver();
    const store = new DefaultCognitiveStore(driver);
    const parentId = 'jrn:parent:01';

    // Parent completes prediction and first commit
    const ev1 = makeEvent(parentId, 1, 'PREDICTION_COMMITTED', null);
    await store.append(ev1, null);
    const hash1 = await computeEventHash(ev1);

    const ev2 = makeEvent(parentId, 2, 'FIRST_COMMITTED', hash1, {
      attempt_id: 'att:parent:first',
    });
    await store.append(ev2, hash1);

    // Spawning a retry
    const retryJourneyId = await store.retry(parentId);
    assert(retryJourneyId.startsWith(parentId));
    assert.notEqual(retryJourneyId, parentId);

    // Child journey starts its own fresh sequence
    const childEv1 = makeEvent(retryJourneyId, 1, 'PREDICTION_COMMITTED', null);
    const childSnap = await store.append(childEv1, null);
    assert.equal(childSnap.stage, 'ATTEMPT');

    // CRITICAL: Parent journey's first attempt MUST remain immutable and preserved
    const parentReplay = await store.replay(parentId, makeTaskRef(), 'rel:synthetic:demo:2026');
    assert.equal(parentReplay.stage, 'RECONSTRUCT');
    assert.equal(parentReplay.firstAttemptId, 'att:parent:first');
  });
});

describe('Rotate / Refresh State Restitution', () => {
  it('recovers verified journey snapshot across fresh store instances referencing the same driver', async () => {
    const driver = new MemoryStorageDriver();
    const store1 = new DefaultCognitiveStore(driver);
    const journeyId = 'jrn:refresh:01';

    const ev1 = makeEvent(journeyId, 1, 'PREDICTION_COMMITTED', null);
    await store1.append(ev1, null);
    const hash1 = await computeEventHash(ev1);

    const ev2 = makeEvent(journeyId, 2, 'FIRST_COMMITTED', hash1, { attempt_id: 'att:ref:01' });
    await store1.append(ev2, hash1);
    const hash2 = await computeEventHash(ev2);

    // Simulate page reload or device rotation: instantiate brand new store instance
    const store2 = new DefaultCognitiveStore(driver);
    const restored = await store2.replay(journeyId, makeTaskRef(), 'rel:synthetic:demo:2026');

    assert.equal(restored.stage, 'RECONSTRUCT');
    assert.equal(restored.firstAttemptId, 'att:ref:01');
    assert.equal(restored.lastHash, hash2);
    assert.equal(restored.eventIds.length, 2);
  });
});
