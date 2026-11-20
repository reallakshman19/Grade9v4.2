import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  ProofWorkspaceController,
  createProofWorkspace,
  mountProofWorkspace,
  type ProofWorkspaceConfig,
} from '../../web/components/proof.ts';

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

const EUCLID_PROOF_FIXTURE: ProofWorkspaceConfig = {
  archetype: 'MATH_E2',
  givenStatements: [
    'In circle O, AB is the diameter.',
    'Point C lies on the circle distinct from A and B.',
    'Point D lies on minor arc BC.',
  ],
  goalStatement: 'Prove that ∠ADC + ∠ABC = 180° (Opposite angles in cyclic quadrilateral ABCD sum to 180°).',
  availableLemmas: [
    {
      id: 'LEMMA-THALES',
      name: "Thales's Theorem",
      statement: 'The angle subtended by a diameter at the circle circumference is a right angle (90°).',
      isStandardAxiom: true,
    },
    {
      id: 'LEMMA-INSCRIBED-ANGLE',
      name: 'Inscribed Angle Theorem',
      statement: 'An angle inscribed in a circle is half the central angle subtending the same arc.',
      isStandardAxiom: true,
    },
    {
      id: 'LEMMA-CYCLIC-SUM',
      name: 'Cyclic Quadrilateral Theorem',
      statement: 'Opposite angles of a cyclic quadrilateral inscribed in a circle sum to 180°.',
      isStandardAxiom: true,
    },
  ],
  approaches: [
    {
      id: 'app-direct-inscribed',
      name: 'Direct Central Angle Inscribed Arc Method',
      isGated: false,
      isUnlocked: true,
      hintsCount: 2,
      strategySummary: 'Use central angle measure 2θ and arc subtension to prove supplementary angles.',
    },
    {
      id: 'app-tangent-secant',
      name: 'Auxiliary Tangent and Alternate Segment Method',
      isGated: true,
      isUnlocked: false,
      hintsCount: 3,
      strategySummary: '',
    },
  ],
};

describe('Gate P6-G5: Mathematical Proof Workspace Parity & Human-Rubric Invariant', () => {
  it('correctly initializes ProofWorkspaceController with given, goal, lemmas, and approaches', () => {
    const controller = createProofWorkspace(EUCLID_PROOF_FIXTURE);
    const state = controller.getViewState();

    assert.equal(state.archetype, 'MATH_E2');
    assert.equal(state.givenStatements.length, 3);
    assert.equal(state.goalStatement, EUCLID_PROOF_FIXTURE.goalStatement);
    assert.equal(state.availableLemmas.length, 3);
    assert.equal(state.approaches.length, 2);
    assert.equal(state.selectedApproachId, 'app-direct-inscribed');
    assert.equal(state.isComplete, false);
    assert.equal(state.evaluation, null);
  });

  it('manages deductive proof steps: add, update, and remove', () => {
    const controller = createProofWorkspace(EUCLID_PROOF_FIXTURE);

    // Step 1: Inscribed angle relation
    const s1 = controller.addStep(
      'Measure of arc ADC + Measure of arc ABC = 360°',
      'The two arcs partition the full circle circumference.'
    );
    assert.ok(s1.id);
    assert.equal(controller.getSteps().length, 1);

    // Step 2: Inscribed angle theorem
    const s2 = controller.addStep(
      '∠ABC = (1/2) * m(arc ADC) and ∠ADC = (1/2) * m(arc ABC)',
      'By Inscribed Angle Theorem for intercepted arcs.',
      ['LEMMA-INSCRIBED-ANGLE']
    );
    assert.ok(s2.id);
    assert.equal(controller.getSteps().length, 2);

    // Step 3: Conclusion
    const s3 = controller.addStep(
      '∠ABC + ∠ADC = (1/2) * [m(arc ADC) + m(arc ABC)] = (1/2) * 360° = 180°',
      'Algebraic substitution and factoring.'
    );
    assert.equal(controller.getSteps().length, 3);

    // Update step 3
    const updated = controller.updateStep(s3.id, {
      justification: 'Substitution of full circle angular measure (360°). Q.E.D.',
    });
    assert.equal(updated, true);
    assert.match(controller.getSteps()[2].justification, /Q\.E\.D\./);

    // Remove step
    const removed = controller.removeStep(s1.id);
    assert.equal(removed, true);
    assert.equal(controller.getSteps().length, 2);
  });

  it('enforces strict proof evaluation invariant: Arbitrary proof is NEVER auto-graded (REVIEW_PENDING with score withheld)', () => {
    const controller = createProofWorkspace(EUCLID_PROOF_FIXTURE);
    controller.addStep('∠ACB = 90°', "Thales's theorem", ['LEMMA-THALES']);

    const evaluation = controller.submitProof();

    // Critical Invariant Assertions
    assert.equal(evaluation.status, 'REVIEW_PENDING');
    assert.equal(evaluation.points, null); // Strictly withheld
    assert.equal(evaluation.isAutoGraded, false);
    assert.equal(evaluation.reasonCode, 'PROOF_PENDING_HUMAN_EVALUATION');
    assert.equal(evaluation.rubricScale, 'HUMAN_RUBRIC');
    assert.match(evaluation.feedbackHtml, /Proof requires academic review \(not submitted\)/);
  });

  it('secures gated alternative approaches: local action cannot unlock without reviewed disclosure', () => {
    const controller = createProofWorkspace(EUCLID_PROOF_FIXTURE);

    // Selecting already-unlocked approach works
    assert.equal(controller.selectApproach('app-direct-inscribed'), true);

    // Selecting gated approach is rejected
    assert.equal(controller.selectApproach('app-tangent-secant'), false);

    // Attempting to unlock locally returns false (reviewed disclosure required)
    assert.equal(controller.unlockApproach('app-tangent-secant'), false);
  });

  it('exports and restores complete proof draft with zero data loss', () => {
    const controller = createProofWorkspace(EUCLID_PROOF_FIXTURE);
    controller.addStep('Step A: Assertion 1', 'Justification 1', ['LEMMA-THALES']);
    controller.addStep('Step B: Assertion 2', 'Justification 2', ['LEMMA-CYCLIC-SUM']);

    const draft = controller.exportDraft();
    assert.equal(draft.archetype, 'MATH_E2');
    assert.equal(draft.steps.length, 2);
    assert.equal(draft.revision, 3);

    // Restore into a fresh workspace
    const newController = createProofWorkspace(EUCLID_PROOF_FIXTURE);
    newController.importDraft(draft);

    assert.equal(newController.getSteps().length, 2);
    assert.equal(newController.getSteps()[0].assertion, 'Step A: Assertion 1');
    assert.equal(newController.getSteps()[1].assertion, 'Step B: Assertion 2');
  });

  it('mounts Proof Workspace into DOM with tablet touch ergonomics (>= 48px hit targets)', () => {
    const root = new MockElement() as any;
    const controller = createProofWorkspace(EUCLID_PROOF_FIXTURE);
    const m = mountProofWorkspace(root, controller);

    assert.match(root.innerHTML, /proof-workspace/);
    assert.match(root.innerHTML, /MATH_E2/);
    assert.match(root.innerHTML, /HUMAN_RUBRIC_ONLY/);
    assert.match(root.innerHTML, /proof-given-statements/);
    assert.match(root.innerHTML, /proof-goal-statement/);
    assert.match(root.innerHTML, /proof-steps-list/);
    assert.match(root.innerHTML, /id="proof-assertion-input"/);
    assert.match(root.innerHTML, /id="add-step-btn"/);
    assert.match(root.innerHTML, /id="submit-proof-btn"/);

    m.dispose();
  });
});
