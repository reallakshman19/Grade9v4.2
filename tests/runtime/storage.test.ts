// Unit and contract tests for IndexedDB Persistence, Storage Driver, and ProgressStore (Workpack A18).
// Verifies Refresh, Quota, Duplicate Import, Invalid Checksum, Conflicts, and "No Fake Saved".
// Engineering validation: "No academic approval inferred from software validation."

import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import {
  StorageError,
  MemoryStorageDriver,
  type DraftRecord,
} from '../../web/runtime/storage.ts';
import {
  DefaultProgressStore,
  STORAGE_EXPORT_VERSION,
  LEGACY_EXPORT_VERSION,
  computeSha256,
  type ExportBundle,
} from '../../web/runtime/progress.ts';
import type { Session, Attempt, WorkArtifact, Response } from '../../web/runtime/types.ts';

function makeTestSession(id = 'ses:test:01'): Session {
  return {
    id,
    releaseId: 'rel:synthetic:demo:2026',
    item: {
      type: 'QUESTION',
      id: 'que:physics:wpe:01',
      revision: 1,
      sha256: 'a'.repeat(64),
    },
    origin: null,
    returnRoute: '/topic/wpe',
    mode: 'PRACTICE',
    cursor: 0,
    attemptIds: [],
    draftId: null,
  };
}

function makeTestAttempt(id = 'att:test:01', sessionId = 'ses:test:01'): Attempt {
  return {
    id,
    sessionId,
    item: {
      type: 'QUESTION',
      id: 'que:physics:wpe:01',
      revision: 1,
      sha256: 'a'.repeat(64),
    },
    releaseId: 'rel:synthetic:demo:2026',
    response: {
      kind: 'NUMERIC_QUANTITY',
      value: { decimal: '50', unit: 'J' },
    },
    work: [
      {
        id: 'art:calc:01',
        kind: 'NOTE',
        version: 1,
        value: 'Work = Force * Distance = 10 * 5 = 50J',
      },
    ],
    hintIds: [],
    cognitive: null,
    submittedAt: '2026-11-17T12:00:00Z',
    grade: {
      status: 'SCORED',
      points: 2,
      maxPoints: 2,
      reasonCode: 'CORRECT_QUANTITY',
    },
  };
}

describe('StorageDriver & Transaction Isolation', () => {
  let driver: MemoryStorageDriver;

  beforeEach(() => {
    driver = new MemoryStorageDriver();
  });

  it('performs basic put, get, delete, and getAll operations', async () => {
    await driver.put('items', 'k1', { name: 'Alpha' });
    await driver.put('items', 'k2', { name: 'Beta' });

    const item1 = await driver.get<{ name: string }>('items', 'k1');
    assert.equal(item1?.name, 'Alpha');

    const all = await driver.getAll<{ name: string }>('items');
    assert.equal(all.length, 2);

    await driver.delete('items', 'k1');
    const deleted = await driver.get('items', 'k1');
    assert.equal(deleted, undefined);
  });

  it('rolls back all store modifications when a transaction fails', async () => {
    await driver.put('store_a', 'init', { val: 1 });
    await driver.put('store_b', 'init', { val: 2 });

    await assert.rejects(
      async () => {
        await driver.transaction(['store_a', 'store_b'], 'readwrite', async (tx) => {
          await tx.put('store_a', 'mod', { val: 99 });
          await tx.put('store_b', 'mod', { val: 99 });
          throw new Error('Simulated transaction failure');
        });
      },
      /Simulated transaction failure/
    );

    // Verify rollback: 'mod' keys should NOT exist in either store
    const aMod = await driver.get('store_a', 'mod');
    const bMod = await driver.get('store_b', 'mod');
    assert.equal(aMod, undefined);
    assert.equal(bMod, undefined);

    // Initial state intact
    assert.notEqual(await driver.get('store_a', 'init'), undefined);
    assert.notEqual(await driver.get('store_b', 'init'), undefined);
  });
});

describe('Draft Persistence & Session Refresh', () => {
  let driver: MemoryStorageDriver;
  let store: DefaultProgressStore;

  beforeEach(() => {
    driver = new MemoryStorageDriver();
    store = new DefaultProgressStore(driver);
  });

  it('saves and loads drafts with incremented revision numbers', async () => {
    const session = makeTestSession();
    const resp1: Response = { kind: 'INTEGER', value: '42' };
    const artifacts: WorkArtifact[] = [
      { id: 'art:note:1', kind: 'NOTE', version: 1, value: 'Thinking step 1' },
    ];

    // Save initial draft
    await store.saveDraft(session, resp1, artifacts);

    const loaded1 = await store.loadDraft(session.id);
    assert.notEqual(loaded1, null);
    assert.equal(loaded1?.sessionId, session.id);
    assert.equal(loaded1?.revision, 1);
    assert.equal((loaded1?.response as any).value, '42');
    assert.equal(loaded1?.artifacts.length, 1);

    // Save updated draft
    const resp2: Response = { kind: 'INTEGER', value: '45' };
    await store.saveDraft(session, resp2, artifacts);

    const loaded2 = await store.loadDraft(session.id);
    assert.equal(loaded2?.revision, 2);
    assert.equal((loaded2?.response as any).value, '45');
  });

  it('retains drafts across simulated page refresh / store re-instantiation', async () => {
    const session = makeTestSession('ses:refresh:01');
    const resp: Response = {
      kind: 'NUMERIC_QUANTITY',
      value: { decimal: '19.6', unit: 'm/s^2' },
    };

    await store.saveDraft(session, resp, []);

    // Create a new store instance referencing the underlying storage driver (simulating refresh)
    const freshStore = new DefaultProgressStore(driver);
    const restored = await freshStore.loadDraft('ses:refresh:01');

    assert.notEqual(restored, null);
    assert.equal(restored?.sessionId, 'ses:refresh:01');
    assert.equal((restored?.response as any).kind, 'NUMERIC_QUANTITY');
  });

  it('returns null when loading draft for non-existent session', async () => {
    const draft = await store.loadDraft('ses:nonexistent');
    assert.equal(draft, null);
  });
});

describe('Quota Enforcement & "No Fake Saved" (Fault N20)', () => {
  it('throws QUOTA_EXCEEDED and rolls back when storage size limit is hit', async () => {
    // Constrain driver to tiny 200 byte quota
    const driver = new MemoryStorageDriver({ quotaBytes: 200 });
    const store = new DefaultProgressStore(driver);

    const session = makeTestSession('ses:quota:01');
    const largeText = 'A'.repeat(500); // Exceeds 200 bytes
    const resp: Response = { kind: 'CONSTRUCTED_RESPONSE', value: largeText };

    await assert.rejects(
      async () => {
        await store.saveDraft(session, resp, []);
      },
      (err: unknown) => {
        assert(err instanceof StorageError);
        assert.equal(err.code, 'QUOTA_EXCEEDED');
        return true;
      }
    );

    // "No fake Saved": verify nothing was saved under the session ID
    const draft = await store.loadDraft('ses:quota:01');
    assert.equal(draft, null);
  });

  it('fails closed and stores nothing when underlying driver aborts during saveDraft', async () => {
    const driver = new MemoryStorageDriver();
    // Simulate database write failure hook
    driver.setFailureHook((storeName, action) => {
      if (storeName === 'drafts' && action === 'put') {
        return new StorageError('TRANSACTION_ABORTED', 'Injected I/O failure');
      }
      return null;
    });

    const store = new DefaultProgressStore(driver);
    const session = makeTestSession('ses:abort:01');
    const resp: Response = { kind: 'SINGLE_CHOICE', value: 'opt_a' };

    await assert.rejects(
      async () => {
        await store.saveDraft(session, resp, []);
      },
      (err: unknown) => err instanceof StorageError && err.code === 'TRANSACTION_ABORTED'
    );

    // Ensure state warning / no fake saved: draft must be null
    driver.setFailureHook(null);
    const draft = await store.loadDraft('ses:abort:01');
    assert.equal(draft, null);
  });
});

describe('Attempt Appending & Conflict Detection', () => {
  let driver: MemoryStorageDriver;
  let store: DefaultProgressStore;

  beforeEach(() => {
    driver = new MemoryStorageDriver();
    store = new DefaultProgressStore(driver);
  });

  it('appends attempt, stores work artifacts, and links to session attemptIds', async () => {
    const session = makeTestSession('ses:att:01');
    await driver.put('sessions', session.id, session);

    const attempt = makeTestAttempt('att:01', 'ses:att:01');
    await store.appendAttempt(attempt);

    const savedAttempt = await driver.get<Attempt>('attempts', 'att:01');
    assert.equal(savedAttempt?.id, 'att:01');
    assert.equal(savedAttempt?.grade.points, 2);

    const updatedSession = await driver.get<Session>('sessions', 'ses:att:01');
    assert(updatedSession?.attemptIds.includes('att:01'));

    const savedArtifact = await driver.get<WorkArtifact>('artifacts', 'art:calc:01');
    assert.equal(savedArtifact?.id, 'art:calc:01');
  });

  it('allows duplicate identical attempt append idempotently', async () => {
    const attempt = makeTestAttempt('att:dup:01', 'ses:dup:01');
    await driver.put('sessions',attempt.sessionId,makeTestSession(attempt.sessionId));

    await store.appendAttempt(attempt);
    // Second append of identical attempt should not throw
    await store.appendAttempt(attempt);

    const allAttempts = await driver.getAll<Attempt>('attempts');
    assert.equal(allAttempts.length, 1);
  });

  it('rejects conflicting attempt with same ID but different data with RECORD_CONFLICT', async () => {
    const attempt1 = makeTestAttempt('att:conf:01', 'ses:conf:01');
    await driver.put('sessions',attempt1.sessionId,makeTestSession(attempt1.sessionId));
    await store.appendAttempt(attempt1);

    const conflictingAttempt: Attempt = {
      ...attempt1,
      submittedAt: '2026-11-17T15:00:00Z', // Different timestamp
      response: { kind: 'NUMERIC_QUANTITY', value: { decimal: '99', unit: 'J' } },
    };

    await assert.rejects(
      async () => {
        await store.appendAttempt(conflictingAttempt);
      },
      (err: unknown) => {
        assert(err instanceof StorageError);
        assert.equal(err.code, 'RECORD_CONFLICT');
        return true;
      }
    );
  });
});

describe('Export, Import, Checksum Verification & Duplicate Protection (Fault L19)', () => {
  let driver: MemoryStorageDriver;
  let store: DefaultProgressStore;

  beforeEach(() => {
    driver = new MemoryStorageDriver();
    store = new DefaultProgressStore(driver);
  });

  it('exports all records into an integrity-checked JSON Blob', async () => {
    const session = makeTestSession('ses:exp:01');
    await driver.put('sessions', session.id, session);
    const attempt = makeTestAttempt('att:exp:01', 'ses:exp:01');
    await store.appendAttempt(attempt);

    const blob = await store.exportAll();
    assert.equal(blob.type, 'application/json');

    const text = await blob.text();
    const bundle: ExportBundle = JSON.parse(text);

    assert.equal(bundle.schema_version, STORAGE_EXPORT_VERSION);
    assert(bundle.checksum.length === 64);
    assert.equal(bundle.data.sessions.length, 1);
    assert.equal(bundle.data.attempts.length, 1);
  });

  it('imports valid export blob successfully into fresh store', async () => {
    const session = makeTestSession('ses:imp:01');
    await driver.put('sessions', session.id, session);
    const attempt = makeTestAttempt('att:imp:01', 'ses:imp:01');
    await store.appendAttempt(attempt);

    const exportBlob = await store.exportAll();

    // Import into clean second store
    const freshDriver = new MemoryStorageDriver();
    const freshStore = new DefaultProgressStore(freshDriver);

    await freshStore.importVerified(exportBlob);

    const importedAttempts = await freshDriver.getAll<Attempt>('attempts');
    assert.equal(importedAttempts.length, 1);
    assert.equal(importedAttempts[0].id, 'att:imp:01');
  });

  it('rejects tampered export bundle with INVALID_CHECKSUM', async () => {
    const session = makeTestSession('ses:tamp:01');
    await driver.put('sessions', session.id, session);
    const attempt = makeTestAttempt('att:tamp:01', 'ses:tamp:01');
    await store.appendAttempt(attempt);

    const blob = await store.exportAll();
    const bundle: ExportBundle = JSON.parse(await blob.text());

    // Tamper with data without recomputing checksum
    const tamperedBundle = {
      ...bundle,
      data: {
        ...bundle.data,
        attempts: [
          {
            ...bundle.data.attempts[0],
            grade: { ...bundle.data.attempts[0].grade, points: 999 }, // Fabricated score
          },
        ],
      },
    };

    const tamperedBlob = new Blob([JSON.stringify(tamperedBundle)], { type: 'application/json' });

    await assert.rejects(
      async () => {
        await store.importVerified(tamperedBlob);
      },
      (err: unknown) => {
        assert(err instanceof StorageError);
        assert.equal(err.code, 'INVALID_CHECKSUM');
        return true;
      }
    );
  });

  it('rejects unsupported schema version with UNSUPPORTED_SCHEMA_VERSION', async () => {
    const invalidBundle = {
      schema_version: 'g9-future-schema/9.9',
      checksum: '0'.repeat(64),
      data: {},
    };
    const blob = new Blob([JSON.stringify(invalidBundle)], { type: 'application/json' });

    await assert.rejects(
      async () => {
        await store.importVerified(blob);
      },
      (err: unknown) => err instanceof StorageError && err.code === 'UNSUPPORTED_SCHEMA_VERSION'
    );
  });

  it('Fault L19: duplicate browser data imported twice produces no duplicate records', async () => {
    const session = makeTestSession('ses:l19:01');
    await driver.put('sessions', session.id, session);
    const attempt = makeTestAttempt('att:l19:01', 'ses:l19:01');
    await store.appendAttempt(attempt);

    const exportBlob = await store.exportAll();

    const targetDriver = new MemoryStorageDriver();
    const targetStore = new DefaultProgressStore(targetDriver);

    // First import
    await targetStore.importVerified(exportBlob);
    const firstCount = (await targetDriver.getAll<Attempt>('attempts')).length;
    assert.equal(firstCount, 1);

    // Second import (duplicate import)
    await targetStore.importVerified(exportBlob);
    const secondCount = (await targetDriver.getAll<Attempt>('attempts')).length;

    // Must be exactly 1: zero duplicate records created
    assert.equal(secondCount, 1);
  });

  it('migrates legacy export payload into modern storage representation', async () => {
    const legacyPayload = {
      export_version: LEGACY_EXPORT_VERSION,
      legacy: true,
      sessions: [
        {
          ...makeTestSession('ses:legacy:01'), attemptIds:['att:legacy:01'],
        },
      ],
      attempts: [
        {
          ...makeTestAttempt('att:legacy:01','ses:legacy:01'),
          response: { kind: 'SINGLE_CHOICE', value: 'B' },
          submittedAt: '2025-01-01T00:00:00Z',
          grade: { status: 'SCORED', points: 1, maxPoints: 1, reasonCode: 'CORRECT' },
        },
      ],
    };

    const legacyBlob = new Blob([JSON.stringify(legacyPayload)], { type: 'application/json' });

    await store.importVerified(legacyBlob);

    const migratedAttempts = await driver.getAll<Attempt>('attempts');
    assert.equal(migratedAttempts.length, 1);
    assert.equal(migratedAttempts[0].id, 'att:legacy:01');
    assert.equal(migratedAttempts[0].sessionId, 'ses:legacy:01');
  });
});

it('serializes concurrent draft revisions and rejects altered immutable grade',async()=>{const driver=new MemoryStorageDriver(),store=new DefaultProgressStore(driver),session=makeTestSession();await Promise.all([store.saveDraft(session,{kind:'INTEGER',value:'1'},[]),store.saveDraft(session,{kind:'INTEGER',value:'2'},[])]);assert.equal((await store.loadDraft(session.id))?.revision,2);const a=makeTestAttempt();await store.appendAttempt(a);assert.equal(await store.loadDraft(session.id),null);await assert.rejects(store.appendAttempt({...a,grade:{...a.grade,points:0} as any}),/RECORD_CONFLICT/);});
it('refuses writes in readonly memory transactions',async()=>{const d=new MemoryStorageDriver();await assert.rejects(d.transaction(['x'],'readonly',tx=>tx.put('x','a',1)),/TRANSACTION_SCOPE/);assert.equal(await d.get('x','a'),undefined);});
