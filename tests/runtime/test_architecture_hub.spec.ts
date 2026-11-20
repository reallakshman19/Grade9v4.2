import { it, describe } from 'node:test';
import assert from 'node:assert/strict';
import { Router } from '../../web/app/router.ts';
import { ARCHITECTURE_DOCS, BLUEPRINT_CARDS, ArchitecturePageController } from '../../web/pages/architecture.ts';

describe('Architecture Hub & Router Parity Tests', () => {
  it('router correctly matches /architecture and /architecture/:docId routes', () => {
    const router = new Router({ useHash: true });

    const matchRoot = router.match('/architecture');
    assert.equal(matchRoot.type, 'ARCHITECTURE');
    assert.equal(matchRoot.params.docId, '');

    const matchDoc = router.match('/architecture/core1ab-guide');
    assert.equal(matchDoc.type, 'ARCHITECTURE');
    assert.equal(matchDoc.params.docId, 'core1ab-guide');

    const matchGuidebook = router.match('/architecture/guidebook');
    assert.equal(matchGuidebook.type, 'ARCHITECTURE');
    assert.equal(matchGuidebook.params.docId, 'guidebook');
  });

  it('ARCHITECTURE_DOCS contains all authentic v4.1 core documents', () => {
    assert.equal(ARCHITECTURE_DOCS.length, 5);
    const ids = ARCHITECTURE_DOCS.map(d => d.id);
    assert.ok(ids.includes('core1ab-guide'));
    assert.ok(ids.includes('guidebook'));
    assert.ok(ids.includes('pipeline-benchmarks'));
    assert.ok(ids.includes('production-checklist'));
    assert.ok(ids.includes('review-guide'));

    for (const doc of ARCHITECTURE_DOCS) {
      assert.ok(doc.title.length > 5);
      assert.ok(doc.sourcePath.startsWith('architecture/'));
      assert.ok(doc.summaryHtml.length > 20);
    }
  });

  it('BLUEPRINT_CARDS enumerates all 9 learning blueprint stages', () => {
    assert.equal(BLUEPRINT_CARDS.length, 9);
    const titles = BLUEPRINT_CARDS.map(b => b.title);
    assert.deepEqual(titles, [
      'GOVERNANCE',
      'SOURCE',
      'DEMANDS',
      'QRT',
      'SUBJECT',
      'CORE',
      'CHECKS',
      'CONTEXT',
      'EVIDENCE',
    ]);
  });

  it('ArchitecturePageController manages document selection state', () => {
    const ctrl = new ArchitecturePageController();
    assert.equal(ctrl.getActiveDoc(), null);

    ctrl.selectDoc('core1ab-guide');
    const doc = ctrl.getActiveDoc();
    assert.ok(doc);
    assert.equal(doc.id, 'core1ab-guide');
    assert.equal(doc.category, 'GUIDE');

    ctrl.selectDoc(null);
    assert.equal(ctrl.getActiveDoc(), null);
  });
});
