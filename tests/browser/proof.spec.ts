/**
 * tests/browser/proof.spec.ts
 * A27 — Mathematical proof and symbolic workspace specification tests.
 *
 * Verifies:
 * - MATH E1–E3 exam archetype support (IOQM, RMO/INMO, IMO)
 * - Mandatory invariant: Arbitrary proof is NEVER auto-graded; evaluations remain REVIEW_PENDING
 * - Given / Goal / Lemma formulation
 * - Gated alternative approaches
 * - Exact draft restoration with zero data loss
 * - Safe symbolic expression parsing without eval()
 * - Hit target minimum size (48px)
 *
 * No academic approval inferred from software validation.
 */

import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert/strict';

import {
  parseSymbolicExpression,
  tokenizeExpression,
  validateParentheses,
} from '../../web/adapters/mathematics/symbolic.ts';

import {
  createProofWorkspace,
  ProofWorkspaceController,
} from '../../web/components/proof.ts';
import type { ProofWorkspaceConfig } from '../../web/components/proof.ts';

// ---------------------------------------------------------------------------
// Test Fixtures
// ---------------------------------------------------------------------------

const SAMPLE_CONFIG: ProofWorkspaceConfig = {
  archetype: 'MATH_E3', // IMO international archetype
  givenStatements: [
    'Let ABC be an acute triangle with circumcircle \u03A9.',
    'Let H be the orthocenter of ABC.',
  ],
  goalStatement: 'Prove that the reflection of H across BC lies on \u03A9.',
  availableLemmas: [
    {
      id: 'lem-1',
      name: 'Angle Chase Lemma',
      statement: '\u2220BHC = 180\u00B0 - \u2220BAC',
      isStandardAxiom: false,
    },
    {
      id: 'lem-2',
      name: 'Cyclic Quadrilateral Converse',
      statement: 'Opposite angles summing to 180\u00B0 implies vertices lie on a circle.',
      isStandardAxiom: true,
    },
  ],
  approaches: [
    {
      id: 'app-angle-chase',
      name: 'Angle-Chasing Strategy',
      strategySummary: 'Derive cyclic quadrilateral properties via angle relations.',
      isGated: false,
      isUnlocked: true,
      hintsCount: 1,
    },
    {
      id: 'app-homothety',
      name: 'Euler Circle Homothety',
      strategySummary: 'Use homothety centered at H with ratio 2.',
      isGated: true,
      isUnlocked: false,
      hintsCount: 2,
    },
  ],
};

// ---------------------------------------------------------------------------
// Symbolic Expression Parser (Safe, No eval)
// ---------------------------------------------------------------------------

describe('Symbolic Algebra Parser — Safe Tokenization', () => {
  it('tokenizes and validates algebraic expressions without dynamic code execution', () => {
    const expr = parseSymbolicExpression('(x + 1)^2 - (x^2 + 2*x + 1)');
    assert.equal(expr.isValid, true);
    assert.deepEqual(expr.variables, ['x']);
    assert.ok(expr.normalized.length > 0);
  });

  it('rejects unbalanced parentheses cleanly', () => {
    const expr = parseSymbolicExpression('(a + b * (c - d)');
    assert.equal(expr.isValid, false);
    assert.ok(expr.error?.includes('Unbalanced parentheses'));
  });

  it('handles LaTeX command tokens safely', () => {
    const expr = parseSymbolicExpression('\\frac{a}{b} + \\sqrt{c}');
    assert.equal(expr.isValid, true);
    assert.deepEqual(expr.variables, ['a', 'b', 'c']);
  });
});

// ---------------------------------------------------------------------------
// Mandatory Pedagogical Invariant: Arbitrary Proof NEVER Auto-Graded
// ---------------------------------------------------------------------------

describe('Pedagogical Invariant — Proof Evaluation Policy', () => {
  it('evaluates MATH_E3 IMO proof as REVIEW_PENDING with score strictly withheld (points: null)', () => {
    const ws = createProofWorkspace(SAMPLE_CONFIG);

    ws.addStep('\u2220BHC = 180\u00B0 - \u2220A', 'Angle in orthic quadrilateral', ['lem-1']);
    ws.addStep('Reflection H\' across BC gives \u2220BH\'C = \u2220BHC = 180\u00B0 - \u2220A', 'Symmetry of reflection');
    ws.addStep('\u2220BH\'C + \u2220BAC = 180\u00B0, so H\' lies on circumcircle \u03A9', 'Cyclic criterion', ['lem-2']);

    const evaluation = ws.submitProof();

    // STRICT BOUNDS:
    assert.equal(evaluation.status, 'REVIEW_PENDING');
    assert.equal(evaluation.points, null); // Strictly null
    assert.equal(evaluation.isAutoGraded, false);
    assert.equal(evaluation.rubricScale, 'IMO_0_TO_7');
    assert.equal(evaluation.reasonCode, 'PROOF_PENDING_HUMAN_EVALUATION');
  });

  it('evaluates MATH_E2 proof as REVIEW_PENDING under HUMAN_RUBRIC scale', () => {
    const ws = createProofWorkspace({
      ...SAMPLE_CONFIG,
      archetype: 'MATH_E2',
    });

    ws.addStep('Base step', 'axiom');
    const evaluation = ws.submitProof();

    assert.equal(evaluation.status, 'REVIEW_PENDING');
    assert.equal(evaluation.points, null);
    assert.equal(evaluation.rubricScale, 'HUMAN_RUBRIC');
  });
});

// ---------------------------------------------------------------------------
// Step Management & Proof Construction
// ---------------------------------------------------------------------------

describe('Proof Workspace — Step Building & Lemma Linking', () => {
  let ws: ProofWorkspaceController;

  beforeEach(() => {
    ws = createProofWorkspace(SAMPLE_CONFIG);
  });

  it('initializes with Given, Goal, and Lemmas', () => {
    const state = ws.getViewState();
    assert.equal(state.givenStatements.length, 2);
    assert.equal(state.goalStatement, 'Prove that the reflection of H across BC lies on \u03A9.');
    assert.equal(state.availableLemmas.length, 2);
    assert.equal(state.steps.length, 0);
  });

  it('adds, updates, and removes proof steps with sequential numbering', () => {
    const s1 = ws.addStep('Statement 1', 'Reason 1');
    assert.equal(s1.stepNumber, 1);

    const s2 = ws.addStep('Statement 2', 'Reason 2', ['lem-1']);
    assert.equal(s2.stepNumber, 2);
    assert.equal(ws.getSteps().length, 2);

    // Update step 1
    const updated = ws.updateStep(s1.id, { assertion: 'Refined Statement 1' });
    assert.equal(updated, true);
    assert.equal(ws.getSteps()[0].assertion, 'Refined Statement 1');

    // Remove step 1 -> step 2 becomes step 1
    ws.removeStep(s1.id);
    assert.equal(ws.getSteps().length, 1);
    assert.equal(ws.getSteps()[0].stepNumber, 1);
  });
});

// ---------------------------------------------------------------------------
// Gated Alternative Approaches
// ---------------------------------------------------------------------------

describe('Proof Workspace — Gated Alternative Approaches', () => {
  let ws: ProofWorkspaceController;

  beforeEach(() => {
    ws = createProofWorkspace(SAMPLE_CONFIG);
  });

  it('allows selecting unlocked approach', () => {
    const ok = ws.selectApproach('app-angle-chase');
    assert.equal(ok, true);
    assert.equal(ws.getViewState().selectedApproachId, 'app-angle-chase');
  });

  it('rejects selecting gated approach before it is unlocked', () => {
    const ok = ws.selectApproach('app-homothety');
    assert.equal(ok, false); // Gated and locked
    assert.notEqual(ws.getViewState().selectedApproachId, 'app-homothety');

    // Unlock approach
    ws.unlockApproach('app-homothety');
    const unlockedOk = ws.selectApproach('app-homothety');
    assert.equal(unlockedOk, true);
    assert.equal(ws.getViewState().selectedApproachId, 'app-homothety');
  });
});

// ---------------------------------------------------------------------------
// Draft Restoration & Zero Data Loss
// ---------------------------------------------------------------------------

describe('Proof Workspace — Draft Restoration', () => {
  it('exports and restores proof draft 100% identically', () => {
    const ws = createProofWorkspace(SAMPLE_CONFIG);

    ws.addStep('Step A', 'Justification A', ['lem-1']);
    ws.addStep('Step B', 'Justification B');

    const draft = ws.exportDraft();
    assert.equal(draft.steps.length, 2);
    assert.equal(draft.goalStatement, SAMPLE_CONFIG.goalStatement);

    // Create fresh workspace and import draft
    const freshWs = createProofWorkspace({
      archetype: 'MATH_E1',
      givenStatements: [],
      goalStatement: '',
    });

    freshWs.importDraft(draft);

    const restoredState = freshWs.getViewState();
    assert.equal(restoredState.archetype, 'MATH_E3');
    assert.equal(restoredState.steps.length, 2);
    assert.equal(restoredState.steps[0].assertion, 'Step A');
    assert.equal(restoredState.steps[0].lemmaRefs[0], 'lem-1');
    assert.equal(restoredState.steps[1].assertion, 'Step B');
  });

  it('meets 48px minimum hit target size on interactive controls', () => {
    const ws = createProofWorkspace(SAMPLE_CONFIG);
    assert.ok(ws.getViewState().minHitTargetPx >= 48);
  });
});
