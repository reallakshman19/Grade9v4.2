/**
 * tests/runtime/test_nsejs_core2.spec.ts
 * Wave 14 Runtime Unit Tests — NSEJS Core 2 Multi-Disciplinary Question Bank & Governed Scope.
 */

import { describe, it } from 'node:test';
import assert from 'node:assert';
import {
  NSEJS_CORE2_MODULES,
  NSEJS_CORE2_QUESTIONS,
  NsejsCore2HubController,
} from '../../web/pages/nsejs-core2-hub.ts';

describe('Wave 14: NSEJS Core 2 Multi-Disciplinary Question Bank', () => {

  it('1. verifies 45 modules with exact disciplinary distribution', () => {
    assert.strictEqual(NSEJS_CORE2_MODULES.length, 45, 'Must have exactly 45 modules');

    const physModules = NSEJS_CORE2_MODULES.filter(m => m.subject === 'PHYSICS');
    const chemModules = NSEJS_CORE2_MODULES.filter(m => m.subject === 'CHEMISTRY');
    const bioModules = NSEJS_CORE2_MODULES.filter(m => m.subject === 'BIOLOGY');

    assert.strictEqual(physModules.length, 21, 'Must have 21 Physics modules');
    assert.strictEqual(chemModules.length, 13, 'Must have 13 Chemistry modules');
    assert.strictEqual(bioModules.length, 11, 'Must have 11 Biology modules');

    for (const m of NSEJS_CORE2_MODULES) {
      assert.ok(m.slug.length > 0, `Module ${m.slug} missing slug`);
      assert.ok(m.title.length > 0, `Module ${m.slug} missing title`);
      assert.ok(m.domain.length > 0, `Module ${m.slug} missing domain`);
      assert.ok(m.questionCount > 0, `Module ${m.slug} question count must be > 0`);
      assert.ok(m.sourceBankSha256.length > 0, `Module ${m.slug} missing sourceBankSha256`);
      assert.strictEqual(m.academicAdmission, 'HOLD', `Module ${m.slug} must be HOLD`);
      assert.strictEqual(m.diagnosticMode, 'AUTHORIZED', `Module ${m.slug} must be AUTHORIZED`);
    }
  });

  it('2. verifies 302 authentic candidate questions and Fault N09 Answer Isolation', () => {
    assert.strictEqual(NSEJS_CORE2_QUESTIONS.length, 302, 'Must have exactly 302 questions (267 QM + 35 Comp)');

    const physQuestions = NSEJS_CORE2_QUESTIONS.filter(q => q.subject === 'PHYSICS');
    const chemQuestions = NSEJS_CORE2_QUESTIONS.filter(q => q.subject === 'CHEMISTRY');
    const bioQuestions = NSEJS_CORE2_QUESTIONS.filter(q => q.subject === 'BIOLOGY');

    assert.strictEqual(physQuestions.length, 130, 'Must have 130 Physics questions (95 QM + 35 Comp)');
    assert.strictEqual(chemQuestions.length, 87, 'Must have 87 Chemistry questions');
    assert.strictEqual(bioQuestions.length, 85, 'Must have 85 Biology questions');

    const validOps = new Set(['MODEL', 'APPLY', 'EXPLAIN', 'JUSTIFY', 'REPRESENT', 'SYNTHESIZE', 'RETRIEVE']);

    for (const q of NSEJS_CORE2_QUESTIONS) {
      assert.ok(q.id.length > 0, 'Question must have id');
      assert.ok(q.uid.length > 0, 'Question must have uid');
      assert.ok(q.stem.length > 0, `Question ${q.id} must have stem`);
      assert.ok(q.options.length >= 2 || q.isCompetitive, `Question ${q.id} must have options or be a competitive numerical task`);
      assert.ok(validOps.has(q.qrtOp), `Question ${q.id} has invalid QRT op: ${q.qrtOp}`);
      assert.ok(q.hints.length >= 1, `Question ${q.id} must have diagnostic hints`);
      assert.ok(q.steps.length >= 1, `Question ${q.id} must have solution steps`);

      // Fault N09 Answer Isolation invariant: raw keys strictly withheld
      assert.strictEqual(q.keyState, 'WITHHELD_CLIENT_SIDE_FAULT_N09', `Question ${q.id} violated Fault N09`);
      assert.strictEqual((q as any).answer, undefined, `Question ${q.id} exposed raw cleartext answer`);
    }
  });

  it('3. verifies controller reactive state machine, filters, and disclosures', () => {
    const controller = new NsejsCore2HubController();

    let state = controller.getState();
    assert.strictEqual(state.activeTab, 'modules');
    assert.strictEqual(state.subjectFilter, 'ALL');

    // Filter by Physics
    controller.setSubjectFilter('PHYSICS');
    state = controller.getState();
    assert.strictEqual(state.subjectFilter, 'PHYSICS');

    // Filter by Chemistry
    controller.setSubjectFilter('CHEMISTRY');
    state = controller.getState();
    assert.strictEqual(state.subjectFilter, 'CHEMISTRY');

    // Filter by Biology
    controller.setSubjectFilter('BIOLOGY');
    state = controller.getState();
    assert.strictEqual(state.subjectFilter, 'BIOLOGY');

    // Switch to Questions tab and search
    controller.setTab('questions');
    controller.setSubjectFilter('ALL');
    controller.setSearchQuery('genetics');
    state = controller.getState();
    assert.strictEqual(state.searchQuery, 'genetics');

    // Filter by QRT op
    controller.setQrtFilter('MODEL');
    state = controller.getState();
    assert.strictEqual(state.qrtFilter, 'MODEL');

    // Select module
    controller.selectModule('bio-environment-resources-r1');
    assert.strictEqual(controller.getState().selectedModuleSlug, 'bio-environment-resources-r1');
    assert.strictEqual(controller.getState().activeTab, 'questions');

    // Disclose hints and steps
    const sampleQ = NSEJS_CORE2_QUESTIONS[0];
    controller.toggleHints(sampleQ.id);
    assert.ok(controller.getState().revealedHints.has(sampleQ.id));

    controller.toggleSteps(sampleQ.id);
    assert.ok(controller.getState().revealedSteps.has(sampleQ.id));

    // Select option
    controller.selectOption(sampleQ.id, sampleQ.options[0]);
    assert.strictEqual(controller.getState().selectedAnswers.get(sampleQ.id), sampleQ.options[0]);

    controller.dispose();
  });

  it('4. verifies interactive 15-question mixed sprint simulator lifecycle', () => {
    const controller = new NsejsCore2HubController();

    // Launch sprint
    controller.startSprint();
    const state = controller.getState();

    assert.strictEqual(state.sprintActive, true);
    assert.strictEqual(state.activeTab, 'sprint');
    assert.strictEqual(state.sprintQuestions.length, 15, 'Sprint must contain 15 questions');

    const physCount = state.sprintQuestions.filter(q => q.subject === 'PHYSICS').length;
    const chemCount = state.sprintQuestions.filter(q => q.subject === 'CHEMISTRY').length;
    const bioCount = state.sprintQuestions.filter(q => q.subject === 'BIOLOGY').length;

    assert.strictEqual(physCount, 5, 'Sprint must have 5 Physics questions');
    assert.strictEqual(chemCount, 5, 'Sprint must have 5 Chemistry questions');
    assert.strictEqual(bioCount, 5, 'Sprint must have 5 Biology questions');

    // Navigate sprint questions
    controller.setSprintIndex(5);
    assert.strictEqual(controller.getState().sprintIndex, 5);

    // Answer a question
    const q5 = state.sprintQuestions[5];
    controller.selectSprintAnswer(q5.id, q5.options[0]);
    assert.strictEqual(controller.getState().sprintUserAnswers.get(q5.id), q5.options[0]);

    // Submit sprint
    controller.submitSprint();
    assert.strictEqual(controller.getState().sprintSubmitted, true);

    // Exit sprint
    controller.exitSprint();
    assert.strictEqual(controller.getState().sprintActive, false);
    assert.strictEqual(controller.getState().activeTab, 'modules');

    controller.dispose();
  });
});
