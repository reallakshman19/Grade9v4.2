import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  CirclesMasterController,
  mountCirclesMaster,
  CIRCLES_50_CORPUS,
} from '../../web/pages/circles-master.ts';

// Minimal mock element for Node.js unit testing of DOM rendering
class MockElement {
  innerHTML: string = '';
  private listeners: Record<string, Function[]> = {};

  querySelector<T = any>(_sel: string): T | null {
    return null;
  }

  querySelectorAll<T = any>(_sel: string): T[] {
    return [];
  }

  addEventListener(event: string, fn: Function) {
    this.listeners[event] = this.listeners[event] || [];
    this.listeners[event].push(fn);
  }

  replaceChildren() {
    this.innerHTML = '';
  }
}

describe('Gate P6-G6: Circles Master Migration Parity & Fault N09 Key Defense', () => {
  it('reconstructs complete 50-card Circles corpus across 4 cognitive bands', () => {
    assert.equal(CIRCLES_50_CORPUS.length, 50);

    const bands = new Set(CIRCLES_50_CORPUS.map((c) => c.band));
    assert.ok(bands.has('D1')); // Recall
    assert.ok(bands.has('D2')); // Application
    assert.ok(bands.has('D3')); // Analysis
    assert.ok(bands.has('D4')); // Synthesis/Olympiad

    // Exactly 50 IDs from circ-01 to circ-50
    for (let i = 1; i <= 50; i++) {
      const qid = `circ-${i.toString().padStart(2, '0')}`;
      const found = CIRCLES_50_CORPUS.find((c) => c.id === qid);
      assert.ok(found, `Missing card ${qid}`);
      assert.equal(found.options.length, 4);
    }
  });

  it('enforces Fault N09 Key Defense: Zero data-correct or solution leaks in learner DOM prior to commitment', () => {
    const root = new MockElement() as any;
    const controller = new CirclesMasterController();
    const m = mountCirclesMaster(root, controller);

    // Fault N09 Critical Defense Invariant:
    // Ensure that NO element in rendered HTML carries data-correct attributes
    assert.doesNotMatch(root.innerHTML, /data-correct/);
    assert.doesNotMatch(root.innerHTML, /data-correct-choice/);
    assert.doesNotMatch(root.innerHTML, /data-answer-key/);

    m.dispose();
  });

  it('filters question cards by cognitive demand band (all, D1, D2, D3, D4)', () => {
    const controller = new CirclesMasterController();

    controller.setFilter('D1');
    assert.equal(controller.getFilter(), 'D1');
    assert.ok(controller.getVisibleCards().every((c) => c.band === 'D1'));

    controller.setFilter('D2');
    assert.equal(controller.getFilter(), 'D2');
    assert.ok(controller.getVisibleCards().every((c) => c.band === 'D2'));

    controller.setFilter('D3');
    assert.equal(controller.getFilter(), 'D3');
    assert.ok(controller.getVisibleCards().every((c) => c.band === 'D3'));

    controller.setFilter('D4');
    assert.equal(controller.getFilter(), 'D4');
    assert.ok(controller.getVisibleCards().every((c) => c.band === 'D4'));

    controller.setFilter('all');
    assert.equal(controller.getVisibleCards().length, 50);
  });

  it('filters questions by keyword search query', () => {
    const controller = new CirclesMasterController();

    controller.setSearchQuery('semicircle');
    const semicircleCards = controller.getVisibleCards();
    assert.ok(semicircleCards.length > 0);
    assert.ok(semicircleCards.every((c) => c.title.toLowerCase().includes('semicircle') || c.promptHtml.toLowerCase().includes('semicircle')));

    controller.setSearchQuery('tangent');
    const tangentCards = controller.getVisibleCards();
    assert.ok(tangentCards.length > 0);

    controller.setSearchQuery('');
    assert.equal(controller.getVisibleCards().length, 50);
  });

  it('tracks user attempts and score telemetry correctly with post-commit disclosure', () => {
    const controller = new CirclesMasterController();
    assert.equal(controller.getAttemptedCount(), 0);
    assert.equal(controller.getCorrectCount(), 0);

    // Submit an option
    const qid = 'circ-01';
    controller.selectOption(qid, 'opt-A');

    assert.equal(controller.getAttemptedCount(), 1);
    assert.equal(controller.getResponse(qid), 'opt-A');

    const isCorr = controller.isCorrect(qid);
    assert.equal(typeof isCorr, 'boolean');
  });

  it('manages coordinate circle geometry parameters (radius, center)', () => {
    const controller = new CirclesMasterController();
    controller.setCircleGeometry(7, 2, -3);

    const geom = controller.getCircleGeometry();
    assert.equal(geom.radius, 7);
    assert.equal(geom.centerX, 2);
    assert.equal(geom.centerY, -3);
  });
});
