/**
 * tests/runtime/test_nsejs_curriculum.spec.ts
 * Wave 11 — Unit Test Suite for NSEJS Physics Curriculum & Simulated Paper Session.
 *
 * Verifies:
 * - 12 Official Physics chapters (PH01 to PH12)
 * - 132 Syllabus subtopics with priority tiers and QRT cognitive demands
 * - Authentic 50-Question Bank (NSEJS-2023-P-Q01..Q50)
 * - 59 Circuit Practice Modules (NSEJS-CIRC-L1-Q01..Q59)
 * - Fault N09 Answer Isolation: No client-side raw key leakage
 * - NsejsCurriculumController filtering, search, and navigation
 * - createAuthorizedNsejsPaperSession contract and binding (60 parts, 180 points, 7200s timer)
 */

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  NSEJS_CHAPTERS,
  NSEJS_SUBTOPICS,
  NSEJS_AUTHENTIC_QUESTIONS,
  NSEJS_CIRCUIT_PRACTICE_QUESTIONS,
  createNsejsCurriculumController,
} from '../../web/pages/nsejs-curriculum.ts';
import {
  createAuthorizedNsejsPaperSession,
  createNsejsPaperWorkspaceConfig,
} from '../../web/runtime/nsejs-session.ts';
import { createStorageDriver } from '../../web/runtime/storage.ts';

describe('Wave 11: NSEJS Physics Curriculum Register', () => {
  it('contains exactly 12 official Physics chapters (PH01 to PH12)', () => {
    assert.equal(NSEJS_CHAPTERS.length, 12);
    const expectedIds = [
      'PH01', 'PH02', 'PH03', 'PH04', 'PH05', 'PH06',
      'PH07', 'PH08', 'PH09', 'PH10', 'PH11', 'PH12',
    ];
    assert.deepEqual(NSEJS_CHAPTERS.map((c) => c.id), expectedIds);

    for (const ch of NSEJS_CHAPTERS) {
      assert.ok(ch.title.length > 5, `Chapter ${ch.id} must have a descriptive title`);
      assert.ok(ch.domain.length > 3, `Chapter ${ch.id} must have a domain`);
      assert.ok(ch.formulaWarrants.length >= 3, `Chapter ${ch.id} must have formula warrants`);
      assert.ok(ch.subtopicCount > 0, `Chapter ${ch.id} subtopic count must be positive`);
    }
  });

  it('contains exactly 132 syllabus subtopics matching official distribution', () => {
    assert.equal(NSEJS_SUBTOPICS.length, 132);

    const counts: Record<string, number> = {};
    for (const s of NSEJS_SUBTOPICS) {
      counts[s.chapterId] = (counts[s.chapterId] || 0) + 1;
      assert.ok(s.subtopicId.startsWith(s.chapterId), `Subtopic ID ${s.subtopicId} must start with ${s.chapterId}`);
      assert.ok(s.title.length > 0, `Subtopic ${s.subtopicId} must have a non-empty title`);
      assert.ok(['P0', 'P1', 'P2'].includes(s.priority), `Subtopic ${s.subtopicId} invalid priority: ${s.priority}`);
      assert.ok(s.qrtOperations.length > 0, `Subtopic ${s.subtopicId} must have QRT operations`);
    }

    const expectedCounts: Record<string, number> = {
      PH01: 8,
      PH02: 8,
      PH03: 7,
      PH04: 9,
      PH05: 7,
      PH06: 10,
      PH07: 12,
      PH08: 13,
      PH09: 12,
      PH10: 17,
      PH11: 14,
      PH12: 15,
    };

    assert.deepEqual(counts, expectedCounts);
  });

  it('contains 50 authentic questions satisfying Fault N09 Answer Isolation', () => {
    assert.equal(NSEJS_AUTHENTIC_QUESTIONS.length, 50);

    for (const q of NSEJS_AUTHENTIC_QUESTIONS) {
      assert.ok(q.id.length > 0);
      assert.ok(q.topic.length > 0);
      assert.ok(q.stem.length > 10, `Question ${q.id} stem too short`);
      assert.equal(q.options.length, 4, `Question ${q.id} must have 4 options`);
      assert.equal(q.keyState, 'WITHHELD_FAULT_N09', `Question ${q.id} key must be withheld client-side`);
      assert.ok(!('answer' in q), `Fault N09 violation: raw answer key present in question ${q.id}`);
      assert.ok(q.hints.length >= 1, `Question ${q.id} must have pedagogical hints`);
      assert.ok(q.steps.length >= 1, `Question ${q.id} must have decisive reasoning steps`);
    }
  });

  it('contains 59 circuit practice modules satisfying Fault N09 Answer Isolation', () => {
    assert.equal(NSEJS_CIRCUIT_PRACTICE_QUESTIONS.length, 59);

    for (const q of NSEJS_CIRCUIT_PRACTICE_QUESTIONS) {
      assert.ok(q.id.length > 0);
      assert.equal(q.chapterId, 'PH11');
      assert.equal(q.keyState, 'WITHHELD_FAULT_N09');
      assert.ok(!('answer' in q), `Fault N09 violation: raw answer key in circuit question ${q.id}`);
    }
  });

  it('controller supports chapter selection, priority filtering, and search', () => {
    const ctrl = createNsejsCurriculumController();

    // Default chapter
    assert.equal(ctrl.getSelectedChapter().id, 'PH01');
    assert.equal(ctrl.getSubtopics().length, 8);

    // Change chapter
    ctrl.setSelectedChapter('PH07');
    assert.equal(ctrl.getSelectedChapter().id, 'PH07');
    assert.equal(ctrl.getSubtopics().length, 12);

    // Filter by priority
    ctrl.setSubtopicFilter('P2');
    const p2Subs = ctrl.getSubtopics();
    assert.ok(p2Subs.length > 0);
    assert.ok(p2Subs.every((s) => s.priority === 'P2'));

    // Reset filter and search
    ctrl.setSubtopicFilter('ALL');
    ctrl.setSearchQuery('thermo');
    const searched = ctrl.getSubtopics('PH07');
    assert.ok(searched.length > 0);
    assert.ok(searched.every((s) => s.title.toLowerCase().includes('thermo') || s.subtopicId.toLowerCase().includes('thermo')));

    // Search questions
    ctrl.setSearchQuery('mirror');
    const matchedQs = ctrl.getQuestions();
    assert.ok(matchedQs.length > 0);

    // Toggle hint and step
    const qid = NSEJS_AUTHENTIC_QUESTIONS[0]!.id;
    assert.equal(ctrl.isHintExpanded(qid), false);
    ctrl.toggleHint(qid);
    assert.equal(ctrl.isHintExpanded(qid), true);
    ctrl.toggleHint(qid);
    assert.equal(ctrl.isHintExpanded(qid), false);
  });

  it('NSEJS 2-hour simulated paper session factory creates authorized 60-part contract', async () => {
    const cfg = createNsejsPaperWorkspaceConfig();
    assert.equal(cfg.paperId, 'paper:nsejs-2024-mock-1');
    assert.equal(cfg.durationSeconds, 7200); // 120 minutes
    assert.equal(cfg.sections.length, 3);
    assert.equal(cfg.parts.length, 60);

    // 20 Physics, 20 Chemistry, 20 Biology
    const secP = cfg.sections.find((s) => s.id === 'sec-nsejs-physics')!;
    const secC = cfg.sections.find((s) => s.id === 'sec-nsejs-chemistry')!;
    const secB = cfg.sections.find((s) => s.id === 'sec-nsejs-biology')!;
    assert.equal(secP.partIds.length, 20);
    assert.equal(secC.partIds.length, 20);
    assert.equal(secB.partIds.length, 20);

    const totalPoints = cfg.parts.reduce((sum, p) => sum + p.maxPoints, 0);
    assert.equal(totalPoints, 180);

    // Memory storage driver for session
    const driver = createStorageDriver({ dbName: 'test_nsejs_paper_db' });
    const { config, binding } = await createAuthorizedNsejsPaperSession('test_learner_11', driver);

    assert.equal(config.paperId, 'paper:nsejs-2024-mock-1');
    assert.equal(binding.paper.id, 'paper:nsejs-2024-mock-1');
    assert.ok(binding.definitionSha256.length === 64);
    assert.equal(binding.releaseId, 'rel-nsejs-2024-v1');

    const ses = await binding.session.snapshot();
    assert.equal(ses.mode, 'SIMULATED_EXAM');
    assert.equal(ses.item.id, 'task:nsejs-2024-mock-1');
  });
});
