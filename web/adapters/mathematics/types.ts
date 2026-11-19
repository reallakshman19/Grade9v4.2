/**
 * web/adapters/mathematics/types.ts
 * A27 — Mathematics proof and symbolic workspace contracts.
 *
 * Implements:
 * - MATH-E1, MATH-E2, MATH-E3 exam archetypes (IOQM, RMO/INMO, IMO)
 * - Given / Goal / Lemma proof formulation
 * - Gated alternative approaches
 * - Mandatory invariant: Arbitrary mathematical proofs are NEVER auto-graded;
 *   evaluations remain REVIEW_PENDING with score claims withheld.
 *
 * No academic approval inferred from software validation.
 */

export type MathExamArchetype = 'MATH_E1' | 'MATH_E2' | 'MATH_E3';

export interface ProofLemma {
  readonly id: string;
  readonly name: string;
  readonly statement: string;
  readonly isStandardAxiom: boolean;
}

export interface ProofApproach {
  readonly id: string;
  readonly name: string;
  readonly strategySummary: string;
  readonly isGated: boolean;
  readonly isUnlocked: boolean;
  readonly hintsCount: number;
}

export interface ProofStep {
  readonly id: string;
  readonly stepNumber: number;
  readonly assertion: string;
  readonly justification: string;
  readonly lemmaRefs: readonly string[];
}

export interface MathematicalProofDraft {
  readonly archetype: MathExamArchetype;
  readonly givenStatements: readonly string[];
  readonly goalStatement: string;
  readonly availableLemmas: readonly ProofLemma[];
  readonly selectedApproachId: string | null;
  readonly steps: readonly ProofStep[];
  readonly symbolicScratchpad?: string;
  readonly revision: number;
  readonly lastModifiedAt: string;
}

export interface SymbolicExpressionValue {
  readonly rawInput: string;
  readonly normalized: string;
  readonly variables: readonly string[];
  readonly isValid: boolean;
  readonly error?: string;
}

export interface ProofEvaluation {
  readonly status: 'REVIEW_PENDING';
  readonly points: null; // Strictly withheld pending human rubric review
  readonly rubricScale: 'EXACT_INTEGER' | 'HUMAN_RUBRIC' | 'IMO_0_TO_7';
  readonly isAutoGraded: false;
  readonly reasonCode: 'PROOF_PENDING_HUMAN_EVALUATION';
  readonly feedbackHtml: string;
}

