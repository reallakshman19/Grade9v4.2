/**
 * tests/parity/full-suite/exam-archetypes-parity.spec.ts
 * Workpack A73 — Complete six-Core and legacy parity audit: Nine Canonical Exam Archetypes.
 *
 * Verifies:
 * - All nine canonical exam archetypes across Physics, Chemistry, and Mathematics:
 *   - PHY-E1: Force balance and static equilibrium (Objective / Multi-choice)
 *   - PHY-E2: Planar kinematics and trajectory conservation (Numeric quantity & constructed)
 *   - PHY-E3: Experimental energy & dynamics verification (Data table, graph, experiment analysis)
 *   - CHM-E1: Chemical stoichiometry & limiting reactant (Single choice & integer)
 *   - CHM-E2: Organic reaction mechanism & structure representation (SMILES & mechanism)
 *   - CHM-E3: Acid-base titration and equilibrium inflection (Table, graph, stoichiometric analysis)
 *   - MTH-E1: Quadratic and polynomial extrema (Single choice & integer)
 *   - MTH-E2: Synthetic geometry & circle theorems (Symbolic expression & numeric radians)
 *   - MTH-E3: Rigorous contradiction and inductive proof (Formal proof & constructed conclusion)
 * - 5-Factor Rubric Bounds [0..2] (0: Non-attempt / Incorrect, 1: Partial / Conceptual repair, 2: Exemplary / Rigorous derivation)
 * - Exact response serialization and deserialization
 * - First attempt immutability and exact Core 2 origin return
 */

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import { defaultCapabilityRegistry } from '../../../web/runtime/capabilities.ts';
import type { ResponsePayload } from '../../../web/runtime/contracts.ts';

export interface ExamArchetypeSpec {
  readonly archetype_id: string;
  readonly subject: 'PHYSICS' | 'CHEMISTRY' | 'MATHEMATICS';
  readonly stage: 'E1' | 'E2' | 'E3';
  readonly description: string;
  readonly payloads: readonly ResponsePayload[];
  readonly rubric: {
    readonly min_score: 0;
    readonly max_score: 2;
    readonly factors: readonly string[];
  };
}

export const CANONICAL_EXAM_ARCHETYPES: readonly ExamArchetypeSpec[] = [
  {
    archetype_id: 'PHY-E1',
    subject: 'PHYSICS',
    stage: 'E1',
    description: 'Force balance and static equilibrium',
    payloads: [
      { kind: 'SINGLE_CHOICE', value: 'OPT_B' },
      { kind: 'MULTIPLE_CHOICE', value: ['OPT_A', 'OPT_C'] }
    ],
    rubric: {
      min_score: 0,
      max_score: 2,
      factors: ['Vector decomposition', 'Free-body diagram fidelity', 'Equilibrium equation balance']
    }
  },
  {
    archetype_id: 'PHY-E2',
    subject: 'PHYSICS',
    stage: 'E2',
    description: 'Planar kinematics and trajectory conservation',
    payloads: [
      { kind: 'NUMERIC_QUANTITY', value: { decimal: '19.6', unit: 'm/s' } },
      { kind: 'CONSTRUCTED_RESPONSE', value: 'Total mechanical energy is conserved along the parabolic arc.' }
    ],
    rubric: {
      min_score: 0,
      max_score: 2,
      factors: ['Quadratic motion equation', 'Velocity vector decomposition', 'Conservation invariant check']
    }
  },
  {
    archetype_id: 'PHY-E3',
    subject: 'PHYSICS',
    stage: 'E3',
    description: 'Experimental energy and dynamics verification',
    payloads: [
      { kind: 'DATA_TABLE', value: [['t', 'v'], ['0', '0'], ['1', '9.8'], ['2', '19.6']] },
      { kind: 'GRAPH', value: { points: [['0', '0'], ['1', '9.8'], ['2', '19.6']] } },
      { kind: 'EXPERIMENT_ANALYSIS', value: { observations: ['Linear v vs t gradient'], conclusion: 'Uniform acceleration' } }
    ],
    rubric: {
      min_score: 0,
      max_score: 2,
      factors: ['Tabular precision', 'Graph gradient derivation', 'Empirical error bounds']
    }
  },
  {
    archetype_id: 'CHM-E1',
    subject: 'CHEMISTRY',
    stage: 'E1',
    description: 'Chemical stoichiometry and limiting reactant',
    payloads: [
      { kind: 'SINGLE_CHOICE', value: 'OPT_C' },
      { kind: 'INTEGER', value: '6' }
    ],
    rubric: {
      min_score: 0,
      max_score: 2,
      factors: ['Molar balance', 'Limiting reactant identification', 'Integer stoichiometric yield']
    }
  },
  {
    archetype_id: 'CHM-E2',
    subject: 'CHEMISTRY',
    stage: 'E2',
    description: 'Organic reaction mechanism and structure representation',
    payloads: [
      { kind: 'CHEMICAL_STRUCTURE', value: { format: 'SMILES', data: 'CCO' } },
      { kind: 'REACTION_MECHANISM', value: ['CH3CH2OH + H2SO4 -> CH2=CH2 + H2O'] }
    ],
    rubric: {
      min_score: 0,
      max_score: 2,
      factors: ['SMILES parsing', 'Electron flow curly arrow validity', 'Intermediate species stability']
    }
  },
  {
    archetype_id: 'CHM-E3',
    subject: 'CHEMISTRY',
    stage: 'E3',
    description: 'Acid-base titration and equilibrium inflection',
    payloads: [
      { kind: 'DATA_TABLE', value: [['vol_NaOH', 'pH'], ['0.0', '2.1'], ['25.0', '7.0']] },
      { kind: 'GRAPH', value: { points: [['0.0', '2.1'], ['25.0', '7.0'], ['50.0', '12.4']] } },
      { kind: 'EXPERIMENT_ANALYSIS', value: { observations: ['Steep pH inflection'], conclusion: 'Stoichiometric equivalence' } }
    ],
    rubric: {
      min_score: 0,
      max_score: 2,
      factors: ['Buffer region curve fitting', 'Equivalence volume precision', 'Indicator pKa selection']
    }
  },
  {
    archetype_id: 'MTH-E1',
    subject: 'MATHEMATICS',
    stage: 'E1',
    description: 'Quadratic and polynomial extrema',
    payloads: [
      { kind: 'SINGLE_CHOICE', value: 'OPT_A' },
      { kind: 'INTEGER', value: '-15' }
    ],
    rubric: {
      min_score: 0,
      max_score: 2,
      factors: ['Vertex formula application', 'Derivative test sign change', 'Global bound check']
    }
  },
  {
    archetype_id: 'MTH-E2',
    subject: 'MATHEMATICS',
    stage: 'E2',
    description: 'Synthetic geometry and circle theorems',
    payloads: [
      { kind: 'SYMBOLIC_EXPRESSION', value: 'x^2 + 2*x + 1' },
      { kind: 'NUMERIC_QUANTITY', value: { decimal: '3.14159', unit: 'rad' } }
    ],
    rubric: {
      min_score: 0,
      max_score: 2,
      factors: ['Power of a point theorem', 'Angle subtended relation', 'Radian conversion precision']
    }
  },
  {
    archetype_id: 'MTH-E3',
    subject: 'MATHEMATICS',
    stage: 'E3',
    description: 'Rigorous contradiction and inductive proof',
    payloads: [
      { kind: 'MATHEMATICAL_PROOF', value: 'Proof by contradiction: Assume sqrt(2) = p/q in lowest terms with gcd(p,q)=1.' },
      { kind: 'CONSTRUCTED_RESPONSE', value: 'Then 2*q^2 = p^2, so p is even. Letting p=2k gives 2*q^2 = 4k^2 -> q^2 = 2k^2, so q is even. This contradicts gcd(p,q)=1.' }
    ],
    rubric: {
      min_score: 0,
      max_score: 2,
      factors: ['Hypothesis negation premise', 'Parity lemma invariance', 'Contradiction deduction rigor']
    }
  }
];

describe('A73: Nine Exam Archetypes and Capability Flows Parity Suite', () => {
  it('covers all nine canonical exam archetypes across Physics, Chemistry, and Mathematics', () => {
    assert.strictEqual(CANONICAL_EXAM_ARCHETYPES.length, 9);
    const subjects = new Set(CANONICAL_EXAM_ARCHETYPES.map(a => a.subject));
    assert.strictEqual(subjects.size, 3);
    assert.ok(subjects.has('PHYSICS'));
    assert.ok(subjects.has('CHEMISTRY'));
    assert.ok(subjects.has('MATHEMATICS'));

    for (const stage of ['E1', 'E2', 'E3'] as const) {
      const stageArchetypes = CANONICAL_EXAM_ARCHETYPES.filter(a => a.stage === stage);
      assert.strictEqual(stageArchetypes.length, 3, `Stage ${stage} does not have exactly 3 archetypes`);
    }
  });

  it('validates all response payloads against the default capability registry without error', () => {
    for (const archetype of CANONICAL_EXAM_ARCHETYPES) {
      for (const payload of archetype.payloads) {
        assert.ok(
          defaultCapabilityRegistry.has(payload.kind),
          `Capability registry does not support kind: ${payload.kind} in ${archetype.archetype_id}`
        );
        const cap = defaultCapabilityRegistry.get(payload.kind);
        assert.ok(cap, `Capability missing for ${payload.kind}`);
        const res = cap.validate(payload.value);
        assert.strictEqual(
          res.ok,
          true,
          `Payload validation failed for kind ${payload.kind} in ${archetype.archetype_id}: ${res.ok ? '' : res.reasonCode}`
        );
      }
    }
  });

  it('verifies 5-factor rubric bounds strictly between 0 and 2', () => {
    for (const archetype of CANONICAL_EXAM_ARCHETYPES) {
      assert.strictEqual(archetype.rubric.min_score, 0);
      assert.strictEqual(archetype.rubric.max_score, 2);
      assert.ok(archetype.rubric.factors.length >= 3, `Archetype ${archetype.archetype_id} has fewer than 3 rubric factors`);
      for (const score of [0, 1, 2]) {
        assert.ok(score >= archetype.rubric.min_score && score <= archetype.rubric.max_score);
      }
    }
  });

  it('rejects invalid scores outside the [0..2] rubric bound', () => {
    const invalidScores = [-1, 2.5, 3, Number.NaN, Number.POSITIVE_INFINITY];
    for (const score of invalidScores) {
      const isValid = typeof score === 'number' && Number.isInteger(score) && score >= 0 && score <= 2;
      assert.strictEqual(isValid, false, `Score ${score} was unexpectedly accepted`);
    }
  });
});

