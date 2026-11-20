import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { Router } from '../../web/app/router.ts';

describe('Gate P5-G6: Routing, Resource Resolution & Persistence Lineage', () => {
  const router = new Router({ useHash: true });

  it('matches canonical resource routes for all seven native roles', () => {
    const roles = ['CORE1', 'CORE1A', 'CORE1B', 'CORE2', 'CORE2A', 'CORE2B', 'EXPLORER'];
    for (const role of roles) {
      const match = router.match(`/role/${role}/res-${role.toLowerCase()}-01`);
      assert.equal(match.type, 'ROLE');
      assert.equal(match.params.coreRole, role);
      assert.equal(match.params.resourceId, `res-${role.toLowerCase()}-01`);
    }
  });

  it('matches all four canonical topic workspace tabs with subject and topic params', () => {
    const tabs = ['questions', 'learn-try', 'explorer', 'labs'];
    for (const tab of tabs) {
      const match = router.match(`/subject/physics/topic/wpe/${tab}`);
      assert.equal(match.type, 'TOPIC_TAB');
      assert.equal(match.params.subjectId, 'physics');
      assert.equal(match.params.topicId, 'wpe');
      assert.equal(match.params.tab, tab);
    }
  });

  it('preserves query parameters for contextual launches and return cursors', () => {
    const match = router.match('/subject/physics/topic/wpe/questions?qid=q-01&action=core2a&returnCursor=42');
    assert.equal(match.type, 'TOPIC_TAB');
    assert.equal(match.query.qid, 'q-01');
    assert.equal(match.query.action, 'core2a');
    assert.equal(match.query.returnCursor, '42');
  });

  it('generates base-aware hrefs without corrupted hash or double slashes', () => {
    const href = router.toHref('/role/CORE2B/xfer-01', { origin: 'topic:wpe' });
    assert.equal(href, '/#/role/CORE2B/xfer-01?origin=topic%3Awpe');
  });
});
