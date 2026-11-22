/**
 * tests/runtime/router_extension.spec.ts
 * Verifies canonical route extension, URI decoding, fail-closed handling,
 * and AppRegistry schema validation.
 */

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import { Router } from '../../web/app/router.ts';
import {
  DEFAULT_APP_REGISTRY,
  validateRegistrySnapshot,
} from '../../web/runtime/registry/index.ts';

describe('Router Canonical Extension & URI Decoding', () => {
  const router = new Router({ useHash: true });

  it('matches HOME route for / and /home and hash variations', () => {
    assert.equal(router.match('/').type, 'HOME');
    assert.equal(router.match('/home').type, 'HOME');
    assert.equal(router.match('#/').type, 'HOME');
    assert.equal(router.match('#/home').type, 'HOME');
    assert.equal(router.match('/#/home').type, 'HOME');
  });

  it('matches COMPETITIVE route and decodes colon-bearing examId', () => {
    const match1 = router.match('/competitive/exam%3Ansejs');
    assert.equal(match1.type, 'COMPETITIVE');
    assert.equal(match1.params.examId, 'exam:nsejs');

    const match2 = router.match('#/competitive/ioqm');
    assert.equal(match2.type, 'COMPETITIVE');
    assert.equal(match2.params.examId, 'ioqm');
  });

  it('matches PRACTICE paper route and decodes paperId', () => {
    const match = router.match('/practice/paper%3Ansejs-2024-mock-1');
    assert.equal(match.type, 'PRACTICE');
    assert.equal(match.params.paperId, 'paper:nsejs-2024-mock-1');
  });

  it('matches LAB route and decodes labId', () => {
    const match = router.match('/labs/lab%3Acircles-master');
    assert.equal(match.type, 'LAB');
    assert.equal(match.params.labId, 'lab:circles-master');
  });

  it('matches TOPIC_TAB route with four parameters', () => {
    const match = router.match('/subject/physics/topic/wpe/learn-try');
    assert.equal(match.type, 'TOPIC_TAB');
    assert.equal(match.params.subjectId, 'physics');
    assert.equal(match.params.topicId, 'wpe');
    assert.equal(match.params.tab, 'learn-try');
  });

  it('matches PERSONAL route and default or scoped tab', () => {
    const match1 = router.match('/personal');
    assert.equal(match1.type, 'PERSONAL');
    assert.equal(match1.params.tab, 'overview');

    const match2 = router.match('/personal/mistakes');
    assert.equal(match2.type, 'PERSONAL');
    assert.equal(match2.params.tab, 'mistakes');
  });

  it('fails closed on malformed percent-encoding or illegal characters', () => {
    assert.equal(router.match('/competitive/%ZZ').type, 'NOT_FOUND');
    assert.equal(router.match('/subject/../../secret').type, 'NOT_FOUND');
    assert.equal(router.match('/unknown/path/here').type, 'NOT_FOUND');
  });
});

describe('AppRegistry Snapshot Validation', () => {
  it('validates default platform registry snapshot with zero errors', () => {
    const res = validateRegistrySnapshot(DEFAULT_APP_REGISTRY);
    assert.equal(res.valid, true, `Validation errors found: ${res.errors.join(', ')}`);
    assert.equal(res.errors.length, 0);
  });

  it('rejects invalid identifier format in registry descriptor', () => {
    const badSnapshot = {
      ...DEFAULT_APP_REGISTRY,
      subjects: [
        {
          ...DEFAULT_APP_REGISTRY.subjects[0],
          id: 'bad id with spaces',
        },
      ],
    };
    const res = validateRegistrySnapshot(badSnapshot);
    assert.equal(res.valid, false);
    assert.ok(res.errors.some((e) => e.includes('Invalid ID format')));
  });

  it('rejects duplicate descriptor IDs', () => {
    const badSnapshot = {
      ...DEFAULT_APP_REGISTRY,
      subjects: [
        DEFAULT_APP_REGISTRY.subjects[0],
        DEFAULT_APP_REGISTRY.subjects[0],
      ],
    };
    const res = validateRegistrySnapshot(badSnapshot);
    assert.equal(res.valid, false);
    assert.ok(res.errors.some((e) => e.includes('Duplicate ID detected')));
  });

  it('rejects dangling subject references from topics', () => {
    const badSnapshot = {
      ...DEFAULT_APP_REGISTRY,
      topics: [
        {
          ...DEFAULT_APP_REGISTRY.topics[0],
          subjectId: 'subject:non-existent',
        },
      ],
    };
    const res = validateRegistrySnapshot(badSnapshot);
    assert.equal(res.valid, false);
    assert.ok(res.errors.some((e) => e.includes('References non-existent subjectId')));
  });
});
