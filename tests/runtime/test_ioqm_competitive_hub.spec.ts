import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  createCompetitiveExamScreen,
  mountCompetitiveExam,
  CompetitiveExamScreenController,
} from '../../web/pages/competitive.ts';

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

describe('Gate P6-G3: IOQM Competitive Hub & Historical Format Evolution', () => {
  it('correctly provides official Junior Olympiad profile with MTA / HBCSE conducting details', () => {
    const controller = createCompetitiveExamScreen('exam:ioqm');
    const state = controller.getViewState();

    assert.equal(state.status, 'AVAILABLE'); // Available for diagnostic navigation
    assert.ok(state.exam);
    assert.equal(state.exam.code, 'IOQM');
    assert.equal(state.exam.title, 'Indian Olympiad Qualifier in Mathematics');
    assert.equal(state.exam.conductingBody, 'MTA / HBCSE');
    assert.equal(state.exam.category, 'JUNIOR_OLYMPIAD');
    assert.equal(state.selectedYear, 2024);
  });

  it('allows tab switching between Algebra, Geometry, Number Theory, and Combinatorics', () => {
    const controller = createCompetitiveExamScreen('exam:ioqm');
    assert.equal(controller.getSyllabusTab(), 'algebra');

    controller.setSyllabusTab('geometry');
    assert.equal(controller.getSyllabusTab(), 'geometry');

    controller.setSyllabusTab('number-theory');
    assert.equal(controller.getSyllabusTab(), 'number-theory');

    controller.setSyllabusTab('combinatorics');
    assert.equal(controller.getSyllabusTab(), 'combinatorics');
  });

  it('renders historical format evolution differentiating 2020 (8/13/9) from 2024 (10/10/10)', () => {
    const root = new MockElement() as any;
    const controller = createCompetitiveExamScreen('exam:ioqm');
    const m = mountCompetitiveExam(root, controller);

    assert.match(root.innerHTML, /2024–2025 Format \(Current\)/);
    assert.match(root.innerHTML, /Section A: 10 questions × 2 marks = 20 pts/);
    assert.match(root.innerHTML, /Section B: 10 questions × 3 marks = 30 pts/);
    assert.match(root.innerHTML, /Section C: 10 questions × 5 marks = 50 pts/);

    assert.match(root.innerHTML, /2020–2021 Format/);
    assert.match(root.innerHTML, /Section A: 8 questions × 2 marks = 16 pts/);
    assert.match(root.innerHTML, /Section B: 13 questions × 3 marks = 39 pts/);
    assert.match(root.innerHTML, /Section C: 9 questions × 5 marks = 45 pts/);

    assert.match(root.innerHTML, /2022 Format \(PRMO Hybrid\)/);

    m.dispose();
  });

  it('catalogues past examination archive (2020-2024) under strict HOLD status', () => {
    const root = new MockElement() as any;
    const controller = createCompetitiveExamScreen('exam:ioqm');
    const m = mountCompetitiveExam(root, controller);

    assert.match(root.innerHTML, /Historical Paper Archive \(2020–2024\)/);
    assert.match(root.innerHTML, /Original past examination papers are catalogued under <strong>HOLD<\/strong>/);
    assert.match(root.innerHTML, /2024 Past Paper/);
    assert.match(root.innerHTML, /2020 Past Paper/);

    m.dispose();
  });

  it('badges Challenge Paper A explicitly as Authored Mock with 180 min timer and prohibited calculators', () => {
    const root = new MockElement() as any;
    const controller = createCompetitiveExamScreen('exam:ioqm');
    const m = mountCompetitiveExam(root, controller);

    assert.match(root.innerHTML, /IOQM 3-Hour Challenge Paper A/);
    assert.match(root.innerHTML, /Authored Mock/);
    assert.match(root.innerHTML, /⏱ Duration: <strong>180 Mins<\/strong>/);
    assert.match(root.innerHTML, /📋 Questions: <strong>30 Parts<\/strong>/);
    assert.match(root.innerHTML, /⭐ Marks: <strong>100<\/strong>/);
    assert.match(root.innerHTML, /🚫 Calculators: <strong>Strictly Prohibited<\/strong>/);

    m.dispose();
  });
});
