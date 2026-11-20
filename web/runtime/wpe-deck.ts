/**
 * web/runtime/wpe-deck.ts
 * Diagnostic Question Deck and Authorized Assessment Contracts for Physics WPE.
 *
 * Implements:
 * - Public UI descriptors (WorkspaceQuestionDescriptor) with zero private keys
 * - Pinned AssessmentContract objects with matching TaskRef identities
 * - Explicit distinction between synthetic diagnostic fixtures and authentic questions on HOLD
 * - Physical unit factors for NUMERIC_QUANTITY (J, kJ, m/s)
 *
 * No academic approval inferred from software validation.
 */

import type { WorkspaceQuestionDescriptor } from '../components/question-workspace.ts';
import type { AssessmentContract } from './assessment.ts';
import type { TaskRef, Ref } from './types.ts';
import { canonicalJson, computeSha256 } from './loader.ts';
import type { AuthorizedQuestionEntry } from './question-session.ts';

export const WPE_RELEASE_ID = 'rel:diagnostic:wpe-core2-v1';

// Exact Task References
const TASK_WPE_01: TaskRef = {
  type: 'QUESTION',
  id: 'PHYS-WPE-01',
  revision: 1,
  sha256: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
};

const TASK_WPE_02: TaskRef = {
  type: 'QUESTION',
  id: 'PHYS-WPE-02',
  revision: 1,
  sha256: 'c3ab8ff13720e8ad9047dd39466b3c8974e592c2fa383d4a3960714caef0c4f2',
};

const TASK_WPE_03: TaskRef = {
  type: 'QUESTION',
  id: 'PHYS-WPE-03',
  revision: 1,
  sha256: '9b71d224bd62f3785d96d46ad3ea3d73319bfbc2890caadae2dff72519673ca7',
};

const TASK_WPE_04: TaskRef = {
  type: 'QUESTION',
  id: 'PHYS-WPE-04',
  revision: 1,
  sha256: '2c26b46b68ffc68ff99b453c1d30413413422d706483bfa0f98a5e886266e7ae',
};

// 1. PHYS-WPE-01: Single Choice (5 pts) — Synthetic Diagnostic Item
export const CONTRACT_WPE_01: AssessmentContract = {
  id: 'asmt:phys-wpe-01',
  revision: 1,
  task_ref: TASK_WPE_01,
  response_kind: 'SINGLE_CHOICE',
  max_points: 5,
  evaluator: {
    mode: 'AUTOMATIC',
    canonical_value: 'opt-b',
    allowed_options: ['opt-a', 'opt-b', 'opt-c', 'opt-d'],
  },
};

export const DESCRIPTOR_WPE_01: WorkspaceQuestionDescriptor = {
  id: 'PHYS-WPE-01',
  code: 'PHYS-WPE-01',
  title: 'Work and Kinetic Energy Balance',
  stemText: 'A constant horizontal force F = 20 N acts on a block of mass m = 4 kg over a displacement d = 5 m on a frictionless horizontal plane. What is the final velocity of the block starting from rest?',
  kind: 'SINGLE_CHOICE',
  options: [
    { id: 'opt-a', label: 'A', text: '5.0 m/s' },
    { id: 'opt-b', label: 'B', text: '7.07 m/s (sqrt(50))' },
    { id: 'opt-c', label: 'C', text: '10.0 m/s' },
    { id: 'opt-d', label: 'D', text: '25.0 m/s' },
  ],
  status: 'RELEASED',
  keyStatus: 'VERIFIED',
  maxPoints: 5,
  figures: [{ id: 'fig-wpe-1', caption: 'Horizontal force acting on frictionless block', available: true }],
};

// 2. PHYS-WPE-02: Numeric Quantity (5 pts) — Synthetic Diagnostic Item
export const CONTRACT_WPE_02: AssessmentContract = {
  id: 'asmt:phys-wpe-02',
  revision: 1,
  task_ref: TASK_WPE_02,
  response_kind: 'NUMERIC_QUANTITY',
  max_points: 5,
  evaluator: {
    mode: 'AUTOMATIC',
    canonical_value: { decimal: '84.87', unit: 'J' },
    numeric_tolerance: 0.5,
    unit_factors: {
      J: '1',
      kJ: '1000',
    },
  },
};

export const DESCRIPTOR_WPE_02: WorkspaceQuestionDescriptor = {
  id: 'PHYS-WPE-02',
  code: 'PHYS-WPE-02',
  title: 'Gravitational Potential & Incline Friction',
  stemText: 'A 5 kg crate slides down a 30-degree incline of length 10 m with coefficient of kinetic friction μ = 0.2. Calculate the total work done by friction against the crate (take g = 9.8 m/s²). Enter your answer in Joules (J).',
  kind: 'NUMERIC_QUANTITY',
  allowedUnits: ['J', 'kJ'],
  status: 'RELEASED',
  keyStatus: 'VERIFIED',
  maxPoints: 5,
  figures: [{ id: 'fig-wpe-2', caption: 'Block sliding down inclined plane with friction', available: true }],
};

// 3. PHYS-WPE-03: Multiple Choice (5 pts) — Synthetic Diagnostic Item
export const CONTRACT_WPE_03: AssessmentContract = {
  id: 'asmt:phys-wpe-03',
  revision: 1,
  task_ref: TASK_WPE_03,
  response_kind: 'MULTIPLE_CHOICE',
  max_points: 5,
  evaluator: {
    mode: 'AUTOMATIC',
    canonical_value: ['opt-a', 'opt-c'],
    allowed_options: ['opt-a', 'opt-b', 'opt-c', 'opt-d'],
  },
};

export const DESCRIPTOR_WPE_03: WorkspaceQuestionDescriptor = {
  id: 'PHYS-WPE-03',
  code: 'PHYS-WPE-03',
  title: 'Conservative Forces & Energy Conservation Principles',
  stemText: 'Which of the following statements regarding conservative force fields and kinetic energy are correct? (Select all that apply)',
  kind: 'MULTIPLE_CHOICE',
  options: [
    { id: 'opt-a', label: 'A', text: 'Work done by a conservative force on a closed path is zero.' },
    { id: 'opt-b', label: 'B', text: 'Frictional dissipation preserves mechanical energy.' },
    { id: 'opt-c', label: 'C', text: 'The force equals the negative gradient of potential energy (F = -∇U).' },
    { id: 'opt-d', label: 'D', text: 'Kinetic energy depends on the direction of velocity.' },
  ],
  status: 'RELEASED',
  keyStatus: 'VERIFIED',
  maxPoints: 5,
  figures: [],
};

// 4. PHYS-WPE-04: Authentic Item on Academic HOLD
export const CONTRACT_WPE_04: AssessmentContract = {
  id: 'asmt:phys-wpe-04',
  revision: 1,
  task_ref: TASK_WPE_04,
  response_kind: 'SINGLE_CHOICE',
  max_points: 5,
  status: 'HOLD',
  evaluator: {
    mode: 'REVIEW_PENDING',
  },
};

export const DESCRIPTOR_WPE_04: WorkspaceQuestionDescriptor = {
  id: 'PHYS-WPE-04',
  code: 'PHYS-WPE-04',
  title: 'Non-Conservative Variable Drag Dynamics',
  stemText: 'A particle moves in a viscous medium where retarding force is proportional to instantaneous velocity F = -b*v. Evaluate energy loss across displacement interval [x1, x2]. [Content under independent academic review].',
  kind: 'SINGLE_CHOICE',
  options: [
    { id: 'opt-a', label: 'A', text: 'Loss = b * v_avg * Δx' },
    { id: 'opt-b', label: 'B', text: 'Loss = 0.5 * m * v_init^2' },
  ],
  status: 'HOLD',
  keyStatus: 'UNVERIFIED',
  maxPoints: 5,
  figures: [{ id: 'fig-wpe-4', caption: 'Viscous damping schematic', available: false }],
};

export const WPE_DIAGNOSTIC_DECK: readonly WorkspaceQuestionDescriptor[] = [
  DESCRIPTOR_WPE_01,
  DESCRIPTOR_WPE_02,
  DESCRIPTOR_WPE_03,
  DESCRIPTOR_WPE_04,
];

export async function getAuthorizedWpeEntry(questionId: string): Promise<AuthorizedQuestionEntry> {
  switch (questionId) {
    case 'PHYS-WPE-01': {
      const sha256 = await computeSha256(canonicalJson(CONTRACT_WPE_01));
      return {
        task: TASK_WPE_01,
        assessment: { type: 'ASSESSMENT', id: CONTRACT_WPE_01.id, revision: 1, sha256 },
        contract: CONTRACT_WPE_01,
        isReviewedForDisclosure: true, // Authorized synthetic verification test fixture
      };
    }
    case 'PHYS-WPE-02': {
      const sha256 = await computeSha256(canonicalJson(CONTRACT_WPE_02));
      return {
        task: TASK_WPE_02,
        assessment: { type: 'ASSESSMENT', id: CONTRACT_WPE_02.id, revision: 1, sha256 },
        contract: CONTRACT_WPE_02,
        isReviewedForDisclosure: true, // Authorized synthetic verification test fixture
      };
    }
    case 'PHYS-WPE-03': {
      const sha256 = await computeSha256(canonicalJson(CONTRACT_WPE_03));
      return {
        task: TASK_WPE_03,
        assessment: { type: 'ASSESSMENT', id: CONTRACT_WPE_03.id, revision: 1, sha256 },
        contract: CONTRACT_WPE_03,
        isReviewedForDisclosure: true, // Authorized synthetic verification test fixture
      };
    }
    case 'PHYS-WPE-04': {
      const sha256 = await computeSha256(canonicalJson(CONTRACT_WPE_04));
      return {
        task: TASK_WPE_04,
        assessment: { type: 'ASSESSMENT', id: CONTRACT_WPE_04.id, revision: 1, sha256 },
        contract: CONTRACT_WPE_04,
        isReviewedForDisclosure: false, // Academic HOLD: disclosure prohibited
      };
    }
    default:
      throw new Error(`UNKNOWN_QUESTION_ID: ${questionId}`);
  }
}
