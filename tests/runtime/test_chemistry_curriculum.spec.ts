/**
 * tests/runtime/test_chemistry_curriculum.spec.ts
 * Wave 12 — Unit Test Suite for Chemistry Curriculum, 14 Topic Adapters (C01–C14),
 * 84 Subtopics, 252 QRT Tasks, Authentic Question Bank, and Stoichiometry Workbench.
 *
 * Verifies:
 * - 14 Official Chemistry topic adapters (C01 to C14) across Foundation and Olympiad
 * - 84 Subtopics register with Core1A exposition, misconceptions, and deep dives
 * - 252 QRT Cognitive Demand tasks with wrongIdea, replacementRule, and checks
 * - 165 Authentic Chemistry Questions with Fault N09 Answer Isolation
 * - Reactive ChemistryCurriculumController state machine and filtering
 * - Stoichiometry & Atom Conservation Ledger math and balance verification
 */

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  CHEMISTRY_ADAPTERS,
  CHEMISTRY_SUBTOPICS,
  CHEMISTRY_QRT_TASKS,
  CHEMISTRY_AUTHENTIC_QUESTIONS,
  ChemistryCurriculumController,
  REACTION_PRESETS,
} from '../../web/pages/chemistry-curriculum.ts';

describe('Wave 12: Chemistry Curriculum & 14 Topic Adapters (C01–C14)', () => {
  it('1. Reconciles exactly 14 official Chemistry topic adapters across Foundation and Olympiad', () => {
    assert.equal(CHEMISTRY_ADAPTERS.length, 14, 'Must have exactly 14 adapters C01 to C14');

    const expectedAdapters = [
      { id: 'C01', tier: 'FOUNDATION', subtopics: 6, qrts: 18 },
      { id: 'C02', tier: 'FOUNDATION', subtopics: 7, qrts: 21 },
      { id: 'C03', tier: 'FOUNDATION', subtopics: 6, qrts: 18 },
      { id: 'C04', tier: 'FOUNDATION', subtopics: 6, qrts: 18 },
      { id: 'C05', tier: 'FOUNDATION', subtopics: 6, qrts: 18 },
      { id: 'C06', tier: 'FOUNDATION', subtopics: 6, qrts: 18 },
      { id: 'C07', tier: 'FOUNDATION', subtopics: 7, qrts: 21 },
      { id: 'C08', tier: 'OLYMPIAD', subtopics: 6, qrts: 18 },
      { id: 'C09', tier: 'OLYMPIAD', subtopics: 6, qrts: 18 },
      { id: 'C10', tier: 'OLYMPIAD', subtopics: 6, qrts: 18 },
      { id: 'C11', tier: 'OLYMPIAD', subtopics: 7, qrts: 21 },
      { id: 'C12', tier: 'OLYMPIAD', subtopics: 5, qrts: 15 },
      { id: 'C13', tier: 'OLYMPIAD', subtopics: 5, qrts: 15 },
      { id: 'C14', tier: 'OLYMPIAD', subtopics: 5, qrts: 15 },
    ];

    for (let i = 0; i < 14; i++) {
      const exp = expectedAdapters[i]!;
      const actual = CHEMISTRY_ADAPTERS[i]!;
      assert.equal(actual.id, exp.id);
      assert.equal(actual.tier, exp.tier);
      assert.equal(actual.subtopicCount, exp.subtopics);
      assert.equal(actual.qrtCount, exp.qrts);
      assert.ok(actual.title.length > 5, 'Title must be descriptive');
      assert.ok(actual.coreConcepts.length > 0, 'Must have core concepts');
    }
  });

  it('2. Registers all 84 subtopics with Core1A exposition, misconceptions, and deep dives', () => {
    assert.equal(CHEMISTRY_SUBTOPICS.length, 84, 'Must have exactly 84 subtopics');

    for (const st of CHEMISTRY_SUBTOPICS) {
      assert.ok(st.subtopicId.startsWith('CHEM-C'), `Subtopic ID must follow convention: ${st.subtopicId}`);
      assert.ok(st.title.length > 3, `Title missing for ${st.subtopicId}`);
      assert.ok(st.entryQuestion.length > 5, `Entry question missing for ${st.subtopicId}`);
      assert.ok(st.coreSummary.length > 10, `Core summary missing for ${st.subtopicId}`);
      assert.ok(st.misconception.length > 5, `Misconception missing for ${st.subtopicId}`);
      assert.ok(st.deepDive.length > 5, `Deep dive missing for ${st.subtopicId}`);
      assert.ok(st.qrtCount >= 3, `Must have at least 3 QRTs for ${st.subtopicId}`);
    }
  });

  it('3. Ingests all 252 QRT cognitive demand tasks with complete pedagogical slots', () => {
    assert.equal(CHEMISTRY_QRT_TASKS.length, 252, 'Must have exactly 252 QRT tasks');

    const validOps = new Set(['EXPLAIN', 'MODEL', 'JUSTIFY', 'REPRESENT', 'SYNTHESIZE', 'APPLY']);
    const validBands = new Set(['D1', 'D2', 'D3', 'D4']);

    for (const qrt of CHEMISTRY_QRT_TASKS) {
      assert.ok(qrt.instanceId.startsWith('C'), `Instance ID must follow convention: ${qrt.instanceId}`);
      assert.ok(validOps.has(qrt.primaryOperation), `Invalid op ${qrt.primaryOperation}`);
      assert.ok(validBands.has(qrt.band), `Invalid band ${qrt.band}`);
      assert.ok(qrt.studentTask.length > 5, `Task prompt missing for ${qrt.instanceId}`);
      assert.ok(qrt.wrongIdea.length > 5, `Wrong idea missing for ${qrt.instanceId}`);
      assert.ok(qrt.replacementRule.length > 5, `Replacement rule missing for ${qrt.instanceId}`);
      assert.ok(qrt.visualJob.length > 3, `Visual job missing for ${qrt.instanceId}`);
      assert.ok(qrt.independentCheck.length > 3, `Independent check missing for ${qrt.instanceId}`);
    }
  });

  it('4. Ingests 165 authentic Chemistry questions under Fault N09 answer isolation', () => {
    assert.equal(CHEMISTRY_AUTHENTIC_QUESTIONS.length, 165, 'Must have 165 authentic questions');

    for (const q of CHEMISTRY_AUTHENTIC_QUESTIONS) {
      assert.ok(q.id.length > 0, 'Question ID must be present');
      assert.ok(q.stem.length > 10, `Stem must be substantive for ${q.id}`);
      assert.equal(q.keyState, 'WITHHELD_CLIENT_SIDE_FAULT_N09', 'Fault N09 key state required');
      // Verify no answer key leakage
      assert.equal((q as Record<string, unknown>).answer, undefined, 'Raw answer key must not exist');
      assert.ok(q.hints.length > 0, `Hints required for ${q.id}`);
    }
  });

  it('5. ChemistryCurriculumController manages filters, search, and subtopic expansions', () => {
    const controller = new ChemistryCurriculumController();
    let updates = 0;
    const unsub = controller.subscribe(() => {
      updates++;
    });

    assert.equal(controller.getState().activeTab, 'adapters');
    assert.equal(controller.getState().tierFilter, 'ALL');

    controller.setActiveTab('subtopics');
    assert.equal(controller.getState().activeTab, 'subtopics');
    assert.equal(updates, 1);

    controller.setTierFilter('OLYMPIAD');
    assert.equal(controller.getState().tierFilter, 'OLYMPIAD');
    assert.equal(updates, 2);

    controller.selectAdapter('C08');
    assert.equal(controller.getState().selectedAdapterId, 'C08');
    assert.equal(updates, 3);

    controller.toggleSubtopicExpanded('CHEM-C08.01');
    assert.ok(controller.getState().expandedSubtopics.has('CHEM-C08.01'));
    assert.equal(updates, 4);

    controller.toggleSubtopicExpanded('CHEM-C08.01');
    assert.ok(!controller.getState().expandedSubtopics.has('CHEM-C08.01'));
    assert.equal(updates, 5);

    unsub();
  });

  it('6. Stoichiometry Workbench verifies atom conservation and balancing dynamics', () => {
    const controller = new ChemistryCurriculumController(null, 'workbench');
    assert.equal(controller.getState().activeReactionIndex, 0);

    const haber = REACTION_PRESETS[0]!;
    assert.equal(haber.id, 'haber');

    // Default Haber is 1 N2 + 1 H2 -> 1 NH3 (Unbalanced: 2 N vs 1 N, 2 H vs 3 H)
    assert.deepEqual(controller.getState().stoichCoefficients, [1, 1, 1]);

    // Apply auto balance: 1 N2 + 3 H2 -> 2 NH3
    controller.applyBalancedReaction();
    assert.deepEqual(controller.getState().stoichCoefficients, [1, 3, 2]);

    // Test coefficient adjust
    controller.adjustCoefficient(1, 1); // H2 becomes 4
    assert.deepEqual(controller.getState().stoichCoefficients, [1, 4, 2]);

    // Reset reaction
    controller.resetReaction();
    assert.deepEqual(controller.getState().stoichCoefficients, [1, 1, 1]);
  });
});
