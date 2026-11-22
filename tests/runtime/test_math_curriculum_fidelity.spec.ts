import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  MATH_POLYNOMIALS_TOPIC,
  MATH_EUCLID_TOPIC,
  MATH_RIEMANN_TOPIC,
  MATH_POLYNOMIALS_DECK,
  MATH_EUCLID_DECK,
  MATH_RIEMANN_DECK,
  createTopicScreen,
} from '../../web/pages/topic.ts';
import { createSubjectScreen } from '../../web/pages/subject.ts';
import type { SubjectDetail } from '../../web/pages/subject.ts';
import { QuestionPageController } from '../../web/pages/question.ts';

const MATHEMATICS_SUBJECT_FIXTURE: SubjectDetail = {
  id: 'mathematics',
  code: 'MATHEMATICS',
  name: 'Mathematics',
  description: 'Foundations of Mathematics, Algebra, Euclidean Geometry, and Real Analysis',
  status: 'HOLD',
  academicAdmission: 'HOLD',
  diagnosticAuthorized: true,
  topics: [
    {
      id: 'polynomials',
      code: 'POLYNOMIALS',
      title: 'Polynomials & Real Numbers',
      strand: 'Algebra',
      itemCount: 4,
      status: 'HOLD',
      academicAdmission: 'HOLD',
      diagnosticAuthorized: true,
      hasExplorer: true,
    },
    {
      id: 'euclid-geometry',
      code: 'EUCLID',
      title: 'Euclidean Geometry & Proofs',
      strand: 'Geometry',
      itemCount: 4,
      status: 'HOLD',
      academicAdmission: 'HOLD',
      diagnosticAuthorized: true,
      hasExplorer: true,
    },
    {
      id: 'riemann',
      code: 'RIEMANN',
      title: 'Foundations of Real Analysis & Calculus',
      strand: 'Analysis',
      itemCount: 3,
      status: 'HOLD',
      academicAdmission: 'HOLD',
      diagnosticAuthorized: true,
      hasExplorer: true,
    },
  ],
};

describe('Gate P6-G1: Mathematics Curriculum & Multi-Topic Workspaces', () => {
  it('registers Subject Mathematics with five-level status separation allowing diagnostic exploration', () => {
    const controller = createSubjectScreen(MATHEMATICS_SUBJECT_FIXTURE);
    const state = controller.getViewState();

    assert.equal(state.status, 'POPULATED');
    assert.equal(state.subject?.code, 'MATHEMATICS');
    assert.equal(state.subject?.academicAdmission, 'HOLD');
    assert.equal(state.subject?.diagnosticAuthorized, true);
    assert.equal(state.visibleTopics.length, 3);
    assert.equal(state.totalItemCount, 11);
  });

  it('supports strand filtering across Algebra, Geometry, and Analysis strands', () => {
    const controller = createSubjectScreen(MATHEMATICS_SUBJECT_FIXTURE);

    controller.setStrandFilter('Algebra');
    let state = controller.getViewState();
    assert.equal(state.visibleTopics.length, 1);
    assert.equal(state.visibleTopics[0].code, 'POLYNOMIALS');

    controller.setStrandFilter('Geometry');
    state = controller.getViewState();
    assert.equal(state.visibleTopics.length, 1);
    assert.equal(state.visibleTopics[0].code, 'EUCLID');

    controller.setStrandFilter('Analysis');
    state = controller.getViewState();
    assert.equal(state.visibleTopics.length, 1);
    assert.equal(state.visibleTopics[0].code, 'RIEMANN');

    controller.setStrandFilter(null);
    state = controller.getViewState();
    assert.equal(state.visibleTopics.length, 3);
  });

  it('provides all 3 authentic Mathematics topic descriptors with verified question decks', () => {
    assert.equal(MATH_POLYNOMIALS_TOPIC.code, 'POLYNOMIALS');
    assert.equal(MATH_POLYNOMIALS_TOPIC.verifiedQuestionCount, 4);
    assert.equal(MATH_POLYNOMIALS_DECK.length, 4);

    assert.equal(MATH_EUCLID_TOPIC.code, 'EUCLID');
    assert.equal(MATH_EUCLID_TOPIC.verifiedQuestionCount, 4);
    assert.equal(MATH_EUCLID_DECK.length, 4);

    assert.equal(MATH_RIEMANN_TOPIC.code, 'RIEMANN');
    assert.equal(MATH_RIEMANN_TOPIC.verifiedQuestionCount, 3);
    assert.equal(MATH_RIEMANN_DECK.length, 3);
  });

  it('initializes TopicScreenController for Mathematics topics without throwing', () => {
    const polyCtrl = createTopicScreen(MATH_POLYNOMIALS_TOPIC);
    const polyState = polyCtrl.getViewState();
    assert.equal(polyState.status, 'POPULATED');
    assert.equal(polyState.topic?.code, 'POLYNOMIALS');
    assert.equal(polyState.topic?.subjectCode, 'MATHEMATICS');

    const euclidCtrl = createTopicScreen(MATH_EUCLID_TOPIC);
    const euclidState = euclidCtrl.getViewState();
    assert.equal(euclidState.status, 'POPULATED');
    assert.equal(euclidState.topic?.code, 'EUCLID');

    const riemannCtrl = createTopicScreen(MATH_RIEMANN_TOPIC);
    const riemannState = riemannCtrl.getViewState();
    assert.equal(riemannState.status, 'POPULATED');
    assert.equal(riemannState.topic?.code, 'RIEMANN');
  });
});

describe('Gate P6-G2: Mathematics Assessment Secrecy & Rubric Invariants', () => {
  it('enforces pre-commit secrecy across all Mathematics problem decks', () => {
    const allQuestions = [...MATH_POLYNOMIALS_DECK, ...MATH_EUCLID_DECK, ...MATH_RIEMANN_DECK];

    for (const q of allQuestions) {
      assert.equal(q.status, 'RELEASED');
      assert.equal(q.keyStatus, 'VERIFIED');
      assert.ok(q.stemText.length > 10);
      assert.ok(q.explanationHtml.length > 10);
      // Ensure no raw unhashed master answers leaked in prompt stem
      assert.doesNotMatch(q.stemText, /Answer is/i);
      assert.doesNotMatch(q.stemText, /Correct answer/i);
    }
  });

  it('mounts Mathematics question in QuestionPageController with score withheld prior to commitment', () => {
    const q = MATH_POLYNOMIALS_DECK[0];
    const qController = new QuestionPageController('mathematics', 'polynomials');
    qController.loadQuestion(q as any);

    const state = qController.getViewState();
    assert.equal(state.pageStatus, 'INTERACTIVE');
    assert.equal(state.workspaceState?.question?.id, q.id);
    assert.equal(state.evaluation, null); // Score withheld
    assert.equal(state.workspaceState?.isLocked, false);
  });
});
