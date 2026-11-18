/**
 * tests/runtime/legacy-import.spec.ts
 * A72 — Legacy learner-state export/import unit and integration tests.
 *
 * Verifies:
 * - Storage keys and old origins inventory
 * - Direct cross-origin access assertion
 * - Mandatory user authorization
 * - Dry-run mapping and option/revision checks
 * - Idempotency (no duplicate attempts, zero data loss on re-import)
 * - Pedagogical boundary: old history never promoted to protected evidence or mastery
 * - Unknown device data remains unknown
 * - Atomic rollback on transaction failure
 *
 * No academic approval inferred from software validation.
 */

import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert/strict';

import {
  isKnownLegacyOrigin,
  assertNoDirectCrossOriginAccess,
  classifyDevice,
  KNOWN_STORAGE_KEYS,
  dryRunMapping,
  normalizeAttempt,
  InMemoryTargetStore,
  LegacyStateImporter,
} from '../../web/runtime/legacy-import/index.ts';

import type {
  LegacyLearnerStateBundle,
  UserExportAuthorization,
  ValidatedItemDescriptor,
} from '../../web/runtime/legacy-import/types.ts';

// ---------------------------------------------------------------------------
// Test Fixtures
// ---------------------------------------------------------------------------

const VALID_ORIGIN = 'https://grade9-v35.local';
const HOST_ORIGIN = 'https://grade9-v42.local';

const VALID_AUTH: UserExportAuthorization = {
  consentGranted: true,
  authorizedAt: '2026-11-18T08:00:00.000Z',
  sourceOrigin: VALID_ORIGIN,
  deviceFingerprint: 'hw:tablet:samsung-12.7:dev01',
};

const SAMPLE_BUNDLE: LegacyLearnerStateBundle = {
  schema_version: 'g9-legacy-import/1.0',
  origin: VALID_ORIGIN,
  deviceId: 'device-tablet-01',
  exportedAt: '2026-11-18T08:01:00.000Z',
  sessions: [
    {
      id: 'ses-v35-001',
      startedAt: '2026-10-01T10:00:00.000Z',
      completedAt: '2026-10-01T10:30:00.000Z',
      topicId: 'PHYS-TOPIC-WPE',
    },
  ],
  attempts: [
    {
      id: 'att-v35-001',
      sessionId: 'ses-v35-001',
      itemId: 'ITEM-WPE-01',
      revision: 1,
      response: {
        kind: 'SINGLE_CHOICE',
        value: 'A',
        selectedOptionId: 'OPT-A',
      },
      submittedAt: '2026-10-01T10:15:00.000Z',
      mastery: true, // Legacy claims mastery; must be overridden
      isProtected: true, // Legacy claims protected; must be overridden
    },
    {
      id: 'att-v35-002',
      sessionId: 'ses-v35-001',
      itemId: 'ITEM-WPE-02',
      revision: 1,
      response: {
        kind: 'SINGLE_CHOICE',
        value: 'B',
        selectedOptionId: 'OPT-B',
      },
      submittedAt: '2026-10-01T10:25:00.000Z',
    },
  ],
  artifacts: [
    {
      id: 'art-001',
      type: 'STYLUS_DRAWING',
      content: '<svg>stylus path</svg>',
      createdAt: '2026-10-01T10:14:00.000Z',
    },
  ],
  rawStorageDump: {
    g9_v35_sessions: '{"count":1}',
    g9_v35_attempts: '{"count":2}',
  },
};

const ITEM_REGISTRY: ReadonlyMap<string, ValidatedItemDescriptor> = new Map([
  [
    'ITEM-WPE-01',
    {
      id: 'ITEM-WPE-01',
      revision: 1,
      validOptionIds: ['OPT-A', 'OPT-B', 'OPT-C', 'OPT-D'],
    },
  ],
  [
    'ITEM-WPE-02',
    {
      id: 'ITEM-WPE-02',
      revision: 1,
      validOptionIds: ['OPT-A', 'OPT-B', 'OPT-C'],
    },
  ],
]);

// ---------------------------------------------------------------------------
// Inventory and Origin Guards
// ---------------------------------------------------------------------------

describe('Legacy Inventory and Origin Security', () => {
  it('recognizes known historical Grade9 deployment origins', () => {
    assert.equal(isKnownLegacyOrigin('https://grade9-v35.local'), true);
    assert.equal(isKnownLegacyOrigin('https://grade9-v41.local'), true);
    assert.equal(isKnownLegacyOrigin('http://localhost:8080'), true);
    assert.equal(isKnownLegacyOrigin('https://untrusted-attacker.com'), false);
  });

  it('contains expected legacy storage keys', () => {
    assert.equal(KNOWN_STORAGE_KEYS.has('g9_v35_sessions'), true);
    assert.equal(KNOWN_STORAGE_KEYS.has('g9_v35_attempts'), true);
    assert.equal(KNOWN_STORAGE_KEYS.has('g9_v35_scratchpad'), true);
    assert.equal(KNOWN_STORAGE_KEYS.has('g9_v41_learner_state'), true);
  });

  it('forbids direct cross-origin access', () => {
    assert.throws(
      () => assertNoDirectCrossOriginAccess('https://grade9-v35.local', 'https://grade9-v42.local'),
      /SECURITY_VIOLATION/
    );
  });
});

// ---------------------------------------------------------------------------
// Device Trust Classification
// ---------------------------------------------------------------------------

describe('Device Trust Classification', () => {
  it('leaves unknown device data classified as UNKNOWN_DEVICE', () => {
    const trust = classifyDevice('unknown-hardware-id', new Set(['trusted-dev-01']));
    assert.equal(trust, 'UNKNOWN_DEVICE');
  });

  it('recognizes known devices when present in trusted registry', () => {
    const trust = classifyDevice('trusted-dev-01', new Set(['trusted-dev-01']));
    assert.equal(trust, 'KNOWN_DEVICE');
  });

  it('handles missing deviceId by returning UNKNOWN_DEVICE', () => {
    assert.equal(classifyDevice(undefined), 'UNKNOWN_DEVICE');
  });
});

// ---------------------------------------------------------------------------
// Pedagogical Invariant: Old History is NOT Protected Evidence or Mastery
// ---------------------------------------------------------------------------

describe('Pedagogical Bounds and Invariants', () => {
  it('locks normalized attempts to REVIEW_PENDING and never grants mastery or protected evidence', () => {
    const normalized = normalizeAttempt(
      SAMPLE_BUNDLE.attempts![0],
      'ses-v35-001',
      'KNOWN_DEVICE',
      0
    );

    assert.equal(normalized.isProtectedEvidence, false);
    assert.equal(normalized.masteryEligible, false);
    assert.equal(normalized.grade.status, 'REVIEW_PENDING');
    assert.equal(normalized.grade.points, null);
    assert.equal(normalized.grade.reasonCode, 'MIGRATED_FROM_LEGACY');
  });
});

// ---------------------------------------------------------------------------
// Dry Run Mapping
// ---------------------------------------------------------------------------

describe('Dry-Run Mapping and Validation', () => {
  it('validates compliant legacy bundle cleanly', () => {
    const report = dryRunMapping(
      SAMPLE_BUNDLE,
      VALID_AUTH,
      new Set(),
      ITEM_REGISTRY,
      new Set(['device-tablet-01'])
    );

    assert.equal(report.valid, true);
    assert.equal(report.totalSessions, 1);
    assert.equal(report.totalAttempts, 2);
    assert.equal(report.totalArtifacts, 1);
    assert.equal(report.mappedAttempts, 2);
    assert.equal(report.duplicateAttempts, 0);
    assert.equal(report.deviceTrust, 'KNOWN_DEVICE');
    assert.equal(report.issues.length, 0);
  });

  it('fails dry-run when user consent is withheld', () => {
    const unauth: UserExportAuthorization = { ...VALID_AUTH, consentGranted: false };
    const report = dryRunMapping(SAMPLE_BUNDLE, unauth, new Set(), ITEM_REGISTRY);

    assert.equal(report.valid, false);
    assert.ok(report.issues.some((i) => i.code === 'MALFORMED_RECORD'));
  });

  it('fails dry-run when bundle origin is unknown', () => {
    const badOriginBundle: LegacyLearnerStateBundle = {
      ...SAMPLE_BUNDLE,
      origin: 'https://evil.external.org',
    };
    const report = dryRunMapping(badOriginBundle, VALID_AUTH, new Set(), ITEM_REGISTRY);

    assert.equal(report.valid, false);
    assert.ok(report.issues.some((i) => i.code === 'UNKNOWN_ORIGIN'));
  });

  it('flags invalid option selections against target item registry', () => {
    const badOptionBundle: LegacyLearnerStateBundle = {
      ...SAMPLE_BUNDLE,
      attempts: [
        {
          itemId: 'ITEM-WPE-01',
          response: { kind: 'SINGLE_CHOICE', value: 'Z', selectedOptionId: 'OPT-Z' },
        },
      ],
    };

    const report = dryRunMapping(badOptionBundle, VALID_AUTH, new Set(), ITEM_REGISTRY);
    assert.equal(report.valid, false);
    assert.ok(report.issues.some((i) => i.code === 'INVALID_OPTION'));
  });

  it('flags stale item revision', () => {
    const staleRevisionBundle: LegacyLearnerStateBundle = {
      ...SAMPLE_BUNDLE,
      attempts: [
        {
          itemId: 'ITEM-WPE-01',
          revision: 99,
          response: { kind: 'SINGLE_CHOICE', value: 'A', selectedOptionId: 'OPT-A' },
        },
      ],
    };

    const report = dryRunMapping(staleRevisionBundle, VALID_AUTH, new Set(), ITEM_REGISTRY);
    assert.equal(report.valid, false);
    assert.ok(report.issues.some((i) => i.code === 'STALE_REVISION'));
  });
});

// ---------------------------------------------------------------------------
// Idempotency and Deduplication
// ---------------------------------------------------------------------------

describe('Importer Idempotency and Deduplication', () => {
  let store: InMemoryTargetStore;
  let importer: LegacyStateImporter;

  beforeEach(() => {
    store = new InMemoryTargetStore();
    importer = new LegacyStateImporter(store, HOST_ORIGIN);
  });

  it('performs first import successfully', async () => {
    const result = await importer.importBundle(SAMPLE_BUNDLE, VALID_AUTH, {
      itemRegistry: ITEM_REGISTRY,
    });

    assert.equal(result.success, true);
    assert.equal(result.dryRun, false);
    assert.equal(result.importedSessionsCount, 1);
    assert.equal(result.importedAttemptsCount, 2);
    assert.equal(result.importedArtifactsCount, 1);
    assert.equal(result.duplicateAttemptsCount, 0);

    const attemptsInStore = await store.getAllAttempts();
    assert.equal(attemptsInStore.length, 2);
  });

  it('guarantees duplicate import results in zero newly created attempts and zero data loss', async () => {
    // 1st import
    const firstResult = await importer.importBundle(SAMPLE_BUNDLE, VALID_AUTH, {
      itemRegistry: ITEM_REGISTRY,
    });
    assert.equal(firstResult.success, true);
    assert.equal(firstResult.importedAttemptsCount, 2);

    // 2nd import (identical bundle)
    const secondResult = await importer.importBundle(SAMPLE_BUNDLE, VALID_AUTH, {
      itemRegistry: ITEM_REGISTRY,
    });
    assert.equal(secondResult.success, true);
    assert.equal(secondResult.importedAttemptsCount, 0); // zero duplicates created
    assert.equal(secondResult.duplicateAttemptsCount, 2); // all 2 recognized as existing

    // Store still contains exactly 2 attempts without loss
    const attemptsInStore = await store.getAllAttempts();
    assert.equal(attemptsInStore.length, 2);
  });
});

// ---------------------------------------------------------------------------
// Atomic Rollback
// ---------------------------------------------------------------------------

describe('Atomic Rollback on Failure', () => {
  it('reverts all changes if an exception occurs mid-transaction', async () => {
    const store = new InMemoryTargetStore();
    const importer = new LegacyStateImporter(store, HOST_ORIGIN);

    // Run import with simulated failure on 2nd attempt insertion
    const result = await importer.importBundle(SAMPLE_BUNDLE, VALID_AUTH, {
      itemRegistry: ITEM_REGISTRY,
      simulateFailureDuringImport: true,
    });

    assert.equal(result.success, false);
    assert.equal(result.rollbackOccurred, true);
    assert.ok(result.error?.includes('SIMULATED_TRANSACTION_CRASH_DURING_IMPORT'));

    // Store MUST be completely clean (no partial sessions, attempts, or artifacts)
    const attempts = await store.getAllAttempts();
    assert.equal(attempts.length, 0);

    const session = await store.getSession('ses-v35-001');
    assert.equal(session, undefined);

    const artifact = await store.getArtifact('art-001');
    assert.equal(artifact, undefined);
  });
});
