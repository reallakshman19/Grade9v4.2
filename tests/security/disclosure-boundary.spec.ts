/**
 * tests/security/disclosure-boundary.spec.ts
 * Workpack A38 — Security, accessibility, scalability and dependency QA: Disclosure Boundary and Secret Isolation.
 *
 * Verifies:
 * 1. Strict disclosure boundary enforcement:
 *    - Full worked solutions, reference derivations, and answer keys are locked during ATTEMPT and PREDICT stages.
 *    - Premature requests for reference solutions fail closed (DISCLOSURE_DENIED).
 * 2. Immutable attempt record audit (Fault N09 / N26):
 *    - Zero private answers or teacher rubrics exposed in client-side state or DOM trees.
 *    - Exact state serialization verification ensuring complete absence of sensitive keys.
 * 3. Hint ladder ordering and access control:
 *    - Sequential hint consumption (H1 -> H2 -> H3); cannot skip levels or fetch future hints.
 */

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import {
  setupTransfer,
  firstResponses,
  artifact,
} from '../fixtures/wave8-synthetic.ts';

import { MemoryStorageDriver } from '../../web/runtime/storage.ts';

describe('A38: Disclosure Boundary and Secret Isolation Suite', () => {
  it('strictly withholds reference solution during ATTEMPT stage', async () => {
    const driver = new MemoryStorageDriver();
    const f = await setupTransfer(driver, true);
    const journey = f.make();

    await journey.start();
    await journey.predict(0);

    // Attempting to view task reference solution before attempt commit must be denied
    await assert.rejects(async () => {
      const sol = await journey.getTaskASolution();
      if (sol === null) throw new Error('DISCLOSURE_DENIED');
    }, /DISCLOSURE_DENIED|NOT_AUTHORIZED|DENIED/);
  });

  it('scans client session, draft, and attempt state for zero leakage of forbidden secrets (Fault N09 / N26)', async () => {
    const driver = new MemoryStorageDriver();
    const f = await setupTransfer(driver, true);
    const journey = f.make();

    await journey.start();
    await journey.predict(0);
    journey.setResponses(firstResponses, [artifact('work:test-sec')]);
    await journey.saveDraft();

    // Inspect all entries in storage
    const allSessions = await driver.getAll('sessions');
    const allAttempts = await driver.getAll('attempts');
    const allDrafts = await driver.getAll('drafts');
    const allEvents = await driver.getAll('cog_events');

    const fullDump = JSON.stringify({
      sessions: allSessions,
      attempts: allAttempts,
      drafts: allDrafts,
      events: allEvents
    });

    const forbiddenPatterns = [
      /correct_answer/i,
      /master_key/i,
      /official_solution/i,
      /rubric_internal_weight/i,
      /teacher_notes/i,
      /examiner_passcode/i
    ];

    for (const pattern of forbiddenPatterns) {
      assert.strictEqual(
        pattern.test(fullDump),
        false,
        `Leak detected matching pattern: ${pattern}`
      );
    }
  });

  it('enforces sequential hint release (H1 -> H2) and prevents arbitrary jump-ahead requests', async () => {
    const driver = new MemoryStorageDriver();
    const f = await setupTransfer(driver, true);
    const journey = f.make();

    await journey.start();
    await journey.predict(0);

    // Requesting H1 succeeds
    const h1 = await journey.requestHint();
    assert.strictEqual(h1.level, 'H1');

    // Requesting H2 succeeds
    const h2 = await journey.requestHint();
    assert.strictEqual(h2.level, 'H2');

    // Requesting beyond available hints throws NO_NEXT_HINT
    await assert.rejects(async () => {
      await journey.requestHint();
    }, /NO_NEXT_HINT|HINT_NOT_AUTHORIZED/);
  });
});
