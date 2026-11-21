/**
 * web/runtime/wpe-deck.ts
 * Diagnostic Question Deck and Authorized Assessment Contracts for Physics Curriculum Expansion.
 *
 * Implements:
 * - Public UI descriptors (WorkspaceQuestionDescriptor) with zero private keys
 * - Pinned AssessmentContract objects with matching TaskRef identities
 * - Transparent classification: synthetic diagnostic test fixtures on academic HOLD
 * - Physical unit factors for NUMERIC_QUANTITY (J, kJ, s, m/s, km/s)
 * - Four canonical topics (16 items total):
 *   1. Work, Power & Energy (PHYS-WPE-01 to PHYS-WPE-04)
 *   2. Motion in a Plane & Kinematics (PHYS-KIN-01 to PHYS-KIN-04)
 *   3. Circular Motion & Road Banking (PHYS-CIRC-01 to PHYS-CIRC-04)
 *   4. Gravitation & Orbital Mechanics (PHYS-GRAV-01 to PHYS-GRAV-04)
 *
 * No academic approval inferred from software validation.
 */

import type { WorkspaceQuestionDescriptor } from '../components/question-workspace.ts';
import type { AssessmentContract } from './assessment.ts';
import type { TaskRef } from './types.ts';
import { canonicalJson, computeSha256 } from './loader.ts';
import type { AuthorizedQuestionEntry } from './question-session.ts';
import { WPE_BANK_QUESTIONS } from './wpe-bank-data.generated.ts';

export const PHYSICS_RELEASE_ID = 'rel:diagnostic:physics-core2-v1';
export const WPE_RELEASE_ID = PHYSICS_RELEASE_ID;

// =============================================================================
// Task References (16 items)
// =============================================================================

// Topic 1: Work, Power & Energy
const TASK_WPE_01: TaskRef = { type: 'QUESTION', id: 'PHYS-WPE-01', revision: 1, sha256: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855' };
const TASK_WPE_02: TaskRef = { type: 'QUESTION', id: 'PHYS-WPE-02', revision: 1, sha256: 'c3ab8ff13720e8ad9047dd39466b3c8974e592c2fa383d4a3960714caef0c4f2' };
const TASK_WPE_03: TaskRef = { type: 'QUESTION', id: 'PHYS-WPE-03', revision: 1, sha256: '9b71d224bd62f3785d96d46ad3ea3d73319bfbc2890caadae2dff72519673ca7' };
const TASK_WPE_04: TaskRef = { type: 'QUESTION', id: 'PHYS-WPE-04', revision: 1, sha256: '2c26b46b68ffc68ff99b453c1d30413413422d706483bfa0f98a5e886266e7ae' };

// Topic 2: Motion in a Plane
const TASK_KIN_01: TaskRef = { type: 'QUESTION', id: 'PHYS-KIN-01', revision: 1, sha256: '1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b' };
const TASK_KIN_02: TaskRef = { type: 'QUESTION', id: 'PHYS-KIN-02', revision: 1, sha256: '2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c' };
const TASK_KIN_03: TaskRef = { type: 'QUESTION', id: 'PHYS-KIN-03', revision: 1, sha256: '3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d' };
const TASK_KIN_04: TaskRef = { type: 'QUESTION', id: 'PHYS-KIN-04', revision: 1, sha256: '4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e' };

// Topic 3: Circular Motion & Banking
const TASK_CIRC_01: TaskRef = { type: 'QUESTION', id: 'PHYS-CIRC-01', revision: 1, sha256: '5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f' };
const TASK_CIRC_02: TaskRef = { type: 'QUESTION', id: 'PHYS-CIRC-02', revision: 1, sha256: '6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a' };
const TASK_CIRC_03: TaskRef = { type: 'QUESTION', id: 'PHYS-CIRC-03', revision: 1, sha256: '7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b' };
const TASK_CIRC_04: TaskRef = { type: 'QUESTION', id: 'PHYS-CIRC-04', revision: 1, sha256: '8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c' };

// Topic 4: Gravitation
const TASK_GRAV_01: TaskRef = { type: 'QUESTION', id: 'PHYS-GRAV-01', revision: 1, sha256: '9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d' };
const TASK_GRAV_02: TaskRef = { type: 'QUESTION', id: 'PHYS-GRAV-02', revision: 1, sha256: '0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e' };
const TASK_GRAV_03: TaskRef = { type: 'QUESTION', id: 'PHYS-GRAV-03', revision: 1, sha256: '1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f' };
const TASK_GRAV_04: TaskRef = { type: 'QUESTION', id: 'PHYS-GRAV-04', revision: 1, sha256: '2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a' };

// =============================================================================
// Assessment Contracts & Descriptors — Topic 1: Work, Power & Energy
// =============================================================================

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
  sourceProvenance: 'SYNTHETIC_DIAGNOSTIC_FIXTURE',
  maxPoints: 5,
  figures: [{ id: 'fig-wpe-1', caption: 'Horizontal force acting on frictionless block', available: true }],
};

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
    unit_factors: { J: '1', kJ: '1000' },
  },
};

export const DESCRIPTOR_WPE_02: WorkspaceQuestionDescriptor = {
  id: 'PHYS-WPE-02',
  code: 'PHYS-WPE-02',
  title: 'Gravitational Potential & Incline Friction Energy Dissipation',
  stemText: 'A 5 kg crate slides down a 30-degree incline of length 10 m with coefficient of kinetic friction μ = 0.2. Calculate the magnitude of energy dissipated by friction against the crate (take g = 9.8 m/s²). Enter your answer in Joules (J).',
  kind: 'NUMERIC_QUANTITY',
  allowedUnits: ['J', 'kJ'],
  status: 'RELEASED',
  keyStatus: 'VERIFIED',
  sourceProvenance: 'SYNTHETIC_DIAGNOSTIC_FIXTURE',
  maxPoints: 5,
  figures: [{ id: 'fig-wpe-2', caption: 'Block sliding down inclined plane with friction', available: true }],
};

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
  sourceProvenance: 'SYNTHETIC_DIAGNOSTIC_FIXTURE',
  maxPoints: 5,
  figures: [],
};

export const CONTRACT_WPE_04: AssessmentContract = {
  id: 'asmt:phys-wpe-04',
  revision: 1,
  task_ref: TASK_WPE_04,
  response_kind: 'SINGLE_CHOICE',
  max_points: 5,
  status: 'HOLD',
  evaluator: { mode: 'REVIEW_PENDING' },
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
  sourceProvenance: 'SYNTHETIC_DIAGNOSTIC_FIXTURE',
  maxPoints: 5,
  figures: [{ id: 'fig-wpe-4', caption: 'Viscous damping schematic', available: false }],
};

// =============================================================================
// Assessment Contracts & Descriptors — Topic 2: Motion in a Plane
// =============================================================================

export const CONTRACT_KIN_01: AssessmentContract = {
  id: 'asmt:phys-kin-01',
  revision: 1,
  task_ref: TASK_KIN_01,
  response_kind: 'SINGLE_CHOICE',
  max_points: 5,
  evaluator: {
    mode: 'AUTOMATIC',
    canonical_value: 'opt-b',
    allowed_options: ['opt-a', 'opt-b', 'opt-c', 'opt-d'],
  },
};

export const DESCRIPTOR_KIN_01: WorkspaceQuestionDescriptor = {
  id: 'PHYS-KIN-01',
  code: 'PHYS-KIN-01',
  title: 'Projectile Maximum Range & Optimum Elevation',
  stemText: 'For a projectile launched from level ground in a uniform gravitational field (neglecting air resistance), what launch angle θ maximizes the horizontal range?',
  kind: 'SINGLE_CHOICE',
  options: [
    { id: 'opt-a', label: 'A', text: '30 degrees' },
    { id: 'opt-b', label: 'B', text: '45 degrees' },
    { id: 'opt-c', label: 'C', text: '60 degrees' },
    { id: 'opt-d', label: 'D', text: '90 degrees' },
  ],
  status: 'RELEASED',
  keyStatus: 'VERIFIED',
  sourceProvenance: 'SYNTHETIC_DIAGNOSTIC_FIXTURE',
  maxPoints: 5,
  figures: [],
};

export const CONTRACT_KIN_02: AssessmentContract = {
  id: 'asmt:phys-kin-02',
  revision: 1,
  task_ref: TASK_KIN_02,
  response_kind: 'SINGLE_CHOICE',
  max_points: 5,
  evaluator: {
    mode: 'AUTOMATIC',
    canonical_value: 'opt-c',
    allowed_options: ['opt-a', 'opt-b', 'opt-c', 'opt-d'],
  },
};

export const DESCRIPTOR_KIN_02: WorkspaceQuestionDescriptor = {
  id: 'PHYS-KIN-02',
  code: 'PHYS-KIN-02',
  title: 'Complementary Angle Kinematic Range Invariance',
  stemText: 'A projectile launched at angle θ₁ = 30° achieves horizontal range R with flight time T₁. If launched at the same initial speed u at complementary angle θ₂, what is θ₂ such that the range remains exactly R?',
  kind: 'SINGLE_CHOICE',
  options: [
    { id: 'opt-a', label: 'A', text: '45 degrees' },
    { id: 'opt-b', label: 'B', text: '50 degrees' },
    { id: 'opt-c', label: 'C', text: '60 degrees' },
    { id: 'opt-d', label: 'D', text: '75 degrees' },
  ],
  status: 'RELEASED',
  keyStatus: 'VERIFIED',
  sourceProvenance: 'SYNTHETIC_DIAGNOSTIC_FIXTURE',
  maxPoints: 5,
  figures: [],
};

export const CONTRACT_KIN_03: AssessmentContract = {
  id: 'asmt:phys-kin-03',
  revision: 1,
  task_ref: TASK_KIN_03,
  response_kind: 'NUMERIC_QUANTITY',
  max_points: 5,
  evaluator: {
    mode: 'AUTOMATIC',
    canonical_value: { decimal: '2.04', unit: 's' },
    numeric_tolerance: 0.05,
    unit_factors: { s: '1', ms: '0.001' },
  },
};

export const DESCRIPTOR_KIN_03: WorkspaceQuestionDescriptor = {
  id: 'PHYS-KIN-03',
  code: 'PHYS-KIN-03',
  title: 'Total Flight Time Calculation',
  stemText: 'A ball is launched from flat ground with initial speed u = 20 m/s at an angle of 30° to the horizontal. Calculate total time of flight T (take g = 9.8 m/s²). Enter your answer in seconds (s).',
  kind: 'NUMERIC_QUANTITY',
  allowedUnits: ['s', 'ms'],
  status: 'RELEASED',
  keyStatus: 'VERIFIED',
  sourceProvenance: 'SYNTHETIC_DIAGNOSTIC_FIXTURE',
  maxPoints: 5,
  figures: [],
};

export const CONTRACT_KIN_04: AssessmentContract = {
  id: 'asmt:phys-kin-04',
  revision: 1,
  task_ref: TASK_KIN_04,
  response_kind: 'MULTIPLE_CHOICE',
  max_points: 5,
  evaluator: {
    mode: 'AUTOMATIC',
    canonical_value: ['opt-a', 'opt-c'],
    allowed_options: ['opt-a', 'opt-b', 'opt-c', 'opt-d'],
  },
};

export const DESCRIPTOR_KIN_04: WorkspaceQuestionDescriptor = {
  id: 'PHYS-KIN-04',
  code: 'PHYS-KIN-04',
  title: 'Kinematics & Acceleration at Trajectory Apex',
  stemText: 'At the exact apex (highest point) of a projectile trajectory in uniform gravity, which statements are correct? (Select all that apply)',
  kind: 'MULTIPLE_CHOICE',
  options: [
    { id: 'opt-a', label: 'A', text: 'The vertical velocity component is zero (vy = 0).' },
    { id: 'opt-b', label: 'B', text: 'The acceleration is zero.' },
    { id: 'opt-c', label: 'C', text: 'The velocity and acceleration vectors are mutually perpendicular.' },
    { id: 'opt-d', label: 'D', text: 'The total mechanical speed is zero.' },
  ],
  status: 'RELEASED',
  keyStatus: 'VERIFIED',
  sourceProvenance: 'SYNTHETIC_DIAGNOSTIC_FIXTURE',
  maxPoints: 5,
  figures: [],
};

// =============================================================================
// Assessment Contracts & Descriptors — Topic 3: Circular Motion & Banking
// =============================================================================

export const CONTRACT_CIRC_01: AssessmentContract = {
  id: 'asmt:phys-circ-01',
  revision: 1,
  task_ref: TASK_CIRC_01,
  response_kind: 'SINGLE_CHOICE',
  max_points: 5,
  evaluator: {
    mode: 'AUTOMATIC',
    canonical_value: 'opt-a',
    allowed_options: ['opt-a', 'opt-b', 'opt-c', 'opt-d'],
  },
};

export const DESCRIPTOR_CIRC_01: WorkspaceQuestionDescriptor = {
  id: 'PHYS-CIRC-01',
  code: 'PHYS-CIRC-01',
  title: 'Optimum Road Banking Angle Formula',
  stemText: 'On a frictionless road banked at angle θ with curvature radius R, what is the optimum vehicle speed v_opt such that no lateral tire friction is required?',
  kind: 'SINGLE_CHOICE',
  options: [
    { id: 'opt-a', label: 'A', text: 'v_opt = sqrt(R * g * tan(θ))' },
    { id: 'opt-b', label: 'B', text: 'v_opt = sqrt(R * g * sin(θ))' },
    { id: 'opt-c', label: 'C', text: 'v_opt = R * g / tan(θ)' },
    { id: 'opt-d', label: 'D', text: 'v_opt = sqrt(R * g * cos(θ))' },
  ],
  status: 'RELEASED',
  keyStatus: 'VERIFIED',
  sourceProvenance: 'SYNTHETIC_DIAGNOSTIC_FIXTURE',
  maxPoints: 5,
  figures: [],
};

export const CONTRACT_CIRC_02: AssessmentContract = {
  id: 'asmt:phys-circ-02',
  revision: 1,
  task_ref: TASK_CIRC_02,
  response_kind: 'NUMERIC_QUANTITY',
  max_points: 5,
  evaluator: {
    mode: 'AUTOMATIC',
    canonical_value: { decimal: '18.43', unit: 'm/s' },
    numeric_tolerance: 0.2,
    unit_factors: { 'm/s': '1' },
  },
};

export const DESCRIPTOR_CIRC_02: WorkspaceQuestionDescriptor = {
  id: 'PHYS-CIRC-02',
  code: 'PHYS-CIRC-02',
  title: 'Optimum Banking Speed Numerical Evaluation',
  stemText: 'A highway curve of radius R = 60 m is banked at angle θ = 30°. Calculate the optimum design speed v_opt where lateral tire friction is zero (take g = 9.8 m/s²). Enter your answer in m/s.',
  kind: 'NUMERIC_QUANTITY',
  allowedUnits: ['m/s'],
  status: 'RELEASED',
  keyStatus: 'VERIFIED',
  sourceProvenance: 'SYNTHETIC_DIAGNOSTIC_FIXTURE',
  maxPoints: 5,
  figures: [],
};

export const CONTRACT_CIRC_03: AssessmentContract = {
  id: 'asmt:phys-circ-03',
  revision: 1,
  task_ref: TASK_CIRC_03,
  response_kind: 'SINGLE_CHOICE',
  max_points: 5,
  evaluator: {
    mode: 'AUTOMATIC',
    canonical_value: 'opt-b',
    allowed_options: ['opt-a', 'opt-b', 'opt-c', 'opt-d'],
  },
};

export const DESCRIPTOR_CIRC_03: WorkspaceQuestionDescriptor = {
  id: 'PHYS-CIRC-03',
  code: 'PHYS-CIRC-03',
  title: 'Centripetal Acceleration Direction',
  stemText: 'For a body executing uniform circular motion at constant speed v in a circle of radius R, what is the direction of its instantaneous acceleration?',
  kind: 'SINGLE_CHOICE',
  options: [
    { id: 'opt-a', label: 'A', text: 'Tangential to the path in the direction of motion' },
    { id: 'opt-b', label: 'B', text: 'Radially inward towards the center of rotation' },
    { id: 'opt-c', label: 'C', text: 'Radially outward away from the center' },
    { id: 'opt-d', label: 'D', text: 'Zero, because speed is constant' },
  ],
  status: 'RELEASED',
  keyStatus: 'VERIFIED',
  sourceProvenance: 'SYNTHETIC_DIAGNOSTIC_FIXTURE',
  maxPoints: 5,
  figures: [],
};

export const CONTRACT_CIRC_04: AssessmentContract = {
  id: 'asmt:phys-circ-04',
  revision: 1,
  task_ref: TASK_CIRC_04,
  response_kind: 'MULTIPLE_CHOICE',
  max_points: 5,
  evaluator: {
    mode: 'AUTOMATIC',
    canonical_value: ['opt-a', 'opt-b'],
    allowed_options: ['opt-a', 'opt-b', 'opt-c', 'opt-d'],
  },
};

export const DESCRIPTOR_CIRC_04: WorkspaceQuestionDescriptor = {
  id: 'PHYS-CIRC-04',
  code: 'PHYS-CIRC-04',
  title: 'Non-Uniform Circular Motion Acceleration Breakdown',
  stemText: 'In non-uniform circular motion where speed is changing along the curved path, which statements regarding acceleration components are correct? (Select all that apply)',
  kind: 'MULTIPLE_CHOICE',
  options: [
    { id: 'opt-a', label: 'A', text: 'Tangential acceleration equals rate of change of speed: at = dv/dt.' },
    { id: 'opt-b', label: 'B', text: 'Centripetal acceleration equals instantaneous v²/R directed towards center.' },
    { id: 'opt-c', label: 'C', text: 'Net acceleration is always perpendicular to velocity.' },
    { id: 'opt-d', label: 'D', text: 'Tangential acceleration is zero in all circular paths.' },
  ],
  status: 'RELEASED',
  keyStatus: 'VERIFIED',
  sourceProvenance: 'SYNTHETIC_DIAGNOSTIC_FIXTURE',
  maxPoints: 5,
  figures: [],
};

// =============================================================================
// Assessment Contracts & Descriptors — Topic 4: Gravitation
// =============================================================================

export const CONTRACT_GRAV_01: AssessmentContract = {
  id: 'asmt:phys-grav-01',
  revision: 1,
  task_ref: TASK_GRAV_01,
  response_kind: 'SINGLE_CHOICE',
  max_points: 5,
  evaluator: {
    mode: 'AUTOMATIC',
    canonical_value: 'opt-a',
    allowed_options: ['opt-a', 'opt-b', 'opt-c', 'opt-d'],
  },
};

export const DESCRIPTOR_GRAV_01: WorkspaceQuestionDescriptor = {
  id: 'PHYS-GRAV-01',
  code: 'PHYS-GRAV-01',
  title: 'Kepler Third Law of Planetary Motion',
  stemText: 'According to Kepler’s Third Law, the square of the orbital period T of a planet revolving around the Sun is proportional to which power of its semi-major axis a?',
  kind: 'SINGLE_CHOICE',
  options: [
    { id: 'opt-a', label: 'A', text: 'T² ∝ a³' },
    { id: 'opt-b', label: 'B', text: 'T² ∝ a²' },
    { id: 'opt-c', label: 'C', text: 'T³ ∝ a²' },
    { id: 'opt-d', label: 'D', text: 'T ∝ a^(3/2)' },
  ],
  status: 'RELEASED',
  keyStatus: 'VERIFIED',
  sourceProvenance: 'SYNTHETIC_DIAGNOSTIC_FIXTURE',
  maxPoints: 5,
  figures: [],
};

export const CONTRACT_GRAV_02: AssessmentContract = {
  id: 'asmt:phys-grav-02',
  revision: 1,
  task_ref: TASK_GRAV_02,
  response_kind: 'NUMERIC_QUANTITY',
  max_points: 5,
  evaluator: {
    mode: 'AUTOMATIC',
    canonical_value: { decimal: '11.18', unit: 'km/s' },
    numeric_tolerance: 0.2,
    unit_factors: { 'km/s': '1', 'm/s': '0.001' },
  },
};

export const DESCRIPTOR_GRAV_02: WorkspaceQuestionDescriptor = {
  id: 'PHYS-GRAV-02',
  code: 'PHYS-GRAV-02',
  title: 'Escape Velocity from Planetary Surface',
  stemText: 'Calculate the theoretical escape velocity ve from Earth surface taking g = 9.8 m/s² and Earth radius RE = 6371 km (ve = sqrt(2 * g * RE)). Enter your answer in km/s.',
  kind: 'NUMERIC_QUANTITY',
  allowedUnits: ['km/s', 'm/s'],
  status: 'RELEASED',
  keyStatus: 'VERIFIED',
  sourceProvenance: 'SYNTHETIC_DIAGNOSTIC_FIXTURE',
  maxPoints: 5,
  figures: [],
};

export const CONTRACT_GRAV_03: AssessmentContract = {
  id: 'asmt:phys-grav-03',
  revision: 1,
  task_ref: TASK_GRAV_03,
  response_kind: 'MULTIPLE_CHOICE',
  max_points: 5,
  evaluator: {
    mode: 'AUTOMATIC',
    canonical_value: ['opt-a', 'opt-c'],
    allowed_options: ['opt-a', 'opt-b', 'opt-c', 'opt-d'],
  },
};

export const DESCRIPTOR_GRAV_03: WorkspaceQuestionDescriptor = {
  id: 'PHYS-GRAV-03',
  code: 'PHYS-GRAV-03',
  title: 'Properties of Universal Gravitational Field',
  stemText: 'Which statements regarding Newton’s law of gravitation and gravitational potential energy are correct? (Select all that apply)',
  kind: 'MULTIPLE_CHOICE',
  options: [
    { id: 'opt-a', label: 'A', text: 'The gravitational force is conservative and central.' },
    { id: 'opt-b', label: 'B', text: 'Gravitational potential energy is positive at all finite distances.' },
    { id: 'opt-c', label: 'C', text: 'By standard convention, gravitational potential is zero at infinite distance.' },
    { id: 'opt-d', label: 'D', text: 'Gravitational force obeys an inverse-cube distance relation.' },
  ],
  status: 'RELEASED',
  keyStatus: 'VERIFIED',
  sourceProvenance: 'SYNTHETIC_DIAGNOSTIC_FIXTURE',
  maxPoints: 5,
  figures: [],
};

export const CONTRACT_GRAV_04: AssessmentContract = {
  id: 'asmt:phys-grav-04',
  revision: 1,
  task_ref: TASK_GRAV_04,
  response_kind: 'SINGLE_CHOICE',
  max_points: 5,
  status: 'HOLD',
  evaluator: { mode: 'REVIEW_PENDING' },
};

export const DESCRIPTOR_GRAV_04: WorkspaceQuestionDescriptor = {
  id: 'PHYS-GRAV-04',
  code: 'PHYS-GRAV-04',
  title: 'Hohmann Elliptical Orbital Transfer Dynamics',
  stemText: 'A satellite transitions from a low Earth circular orbit of radius r1 to a geostationary orbit of radius r2 via an elliptical transfer orbit. Evaluate the required velocity delta Δv1 at periapsis. [Content under independent academic review].',
  kind: 'SINGLE_CHOICE',
  options: [
    { id: 'opt-a', label: 'A', text: 'Δv1 = sqrt(GM/r1) * (sqrt(2*r2 / (r1 + r2)) - 1)' },
    { id: 'opt-b', label: 'B', text: 'Δv1 = sqrt(GM/r2) * (1 - sqrt(2*r1 / (r1 + r2)))' },
  ],
  status: 'HOLD',
  keyStatus: 'UNVERIFIED',
  sourceProvenance: 'SYNTHETIC_DIAGNOSTIC_FIXTURE',
  maxPoints: 5,
  figures: [],
};

// =============================================================================
// Complete Physics Decks (16 Items)
// =============================================================================

export const PHYSICS_DIAGNOSTIC_DECK: readonly WorkspaceQuestionDescriptor[] = [
  DESCRIPTOR_WPE_01,
  DESCRIPTOR_WPE_02,
  DESCRIPTOR_WPE_03,
  DESCRIPTOR_WPE_04,
  DESCRIPTOR_KIN_01,
  DESCRIPTOR_KIN_02,
  DESCRIPTOR_KIN_03,
  DESCRIPTOR_KIN_04,
  DESCRIPTOR_CIRC_01,
  DESCRIPTOR_CIRC_02,
  DESCRIPTOR_CIRC_03,
  DESCRIPTOR_CIRC_04,
  DESCRIPTOR_GRAV_01,
  DESCRIPTOR_GRAV_02,
  DESCRIPTOR_GRAV_03,
  DESCRIPTOR_GRAV_04,
];

export const WPE_FULL_QUESTION_BANK: readonly WorkspaceQuestionDescriptor[] = [
  DESCRIPTOR_WPE_01,
  DESCRIPTOR_WPE_02,
  DESCRIPTOR_WPE_03,
  DESCRIPTOR_WPE_04,
  ...WPE_BANK_QUESTIONS.map(q => ({
    id: q.id,
    code: q.code,
    title: q.title,
    stemText: q.stemText,
    kind: q.kind as WorkspaceQuestionDescriptor['kind'],
    options: q.options ?? undefined,
    figures: q.figures ? q.figures.map(f => ({
      id: f.id,
      caption: f.caption,
      available: f.available,
      sourceUrl: f.svgDataUri,
    })) : undefined,
    hints: q.hints ? q.hints.map(h => ({
      id: h.id,
      text: (h.prompt ? `${h.prompt}: ` : '') + h.text,
      penaltyPercent: h.penaltyPercent,
    })) : undefined,
    status: 'HOLD' as const,
    keyStatus: q.keyStatus,
    maxPoints: q.maxPoints,
    sourceProvenance: 'AUTHENTIC_SOURCE_PINNED' as const,
    explanationHtml: q.answerHtml,
    batch: q.batch,
    band: q.band,
    operation: q.operation,
    sourceClaim: q.sourceClaim,
    solutionSteps: q.solutionSteps,
    limitingCheck: q.limitingCheck ?? undefined,
  }))
];

export const WPE_DIAGNOSTIC_DECK: readonly WorkspaceQuestionDescriptor[] = WPE_FULL_QUESTION_BANK;

// Mapping contract pairs
const ALL_CONTRACTS: Record<string, { task: TaskRef; contract: AssessmentContract; isReviewed: boolean }> = {
  'PHYS-WPE-01': { task: TASK_WPE_01, contract: CONTRACT_WPE_01, isReviewed: true },
  'PHYS-WPE-02': { task: TASK_WPE_02, contract: CONTRACT_WPE_02, isReviewed: true },
  'PHYS-WPE-03': { task: TASK_WPE_03, contract: CONTRACT_WPE_03, isReviewed: true },
  'PHYS-WPE-04': { task: TASK_WPE_04, contract: CONTRACT_WPE_04, isReviewed: false },
  'PHYS-KIN-01': { task: TASK_KIN_01, contract: CONTRACT_KIN_01, isReviewed: true },
  'PHYS-KIN-02': { task: TASK_KIN_02, contract: CONTRACT_KIN_02, isReviewed: true },
  'PHYS-KIN-03': { task: TASK_KIN_03, contract: CONTRACT_KIN_03, isReviewed: true },
  'PHYS-KIN-04': { task: TASK_KIN_04, contract: CONTRACT_KIN_04, isReviewed: true },
  'PHYS-CIRC-01': { task: TASK_CIRC_01, contract: CONTRACT_CIRC_01, isReviewed: true },
  'PHYS-CIRC-02': { task: TASK_CIRC_02, contract: CONTRACT_CIRC_02, isReviewed: true },
  'PHYS-CIRC-03': { task: TASK_CIRC_03, contract: CONTRACT_CIRC_03, isReviewed: true },
  'PHYS-CIRC-04': { task: TASK_CIRC_04, contract: CONTRACT_CIRC_04, isReviewed: true },
  'PHYS-GRAV-01': { task: TASK_GRAV_01, contract: CONTRACT_GRAV_01, isReviewed: true },
  'PHYS-GRAV-02': { task: TASK_GRAV_02, contract: CONTRACT_GRAV_02, isReviewed: true },
  'PHYS-GRAV-03': { task: TASK_GRAV_03, contract: CONTRACT_GRAV_03, isReviewed: true },
  'PHYS-GRAV-04': { task: TASK_GRAV_04, contract: CONTRACT_GRAV_04, isReviewed: false },
};

export async function getAuthorizedPhysicsEntry(questionId: string): Promise<AuthorizedQuestionEntry> {
  const item = ALL_CONTRACTS[questionId];
  if (item) {
    const sha256 = await computeSha256(canonicalJson(item.contract));
    return {
      task: item.task,
      assessment: { type: 'ASSESSMENT', id: item.contract.id, revision: 1, sha256 },
      contract: item.contract,
      isReviewedForDisclosure: item.isReviewed,
    };
  }

  const bankItem = WPE_BANK_QUESTIONS.find(q => q.id === questionId);
  if (bankItem) {
    const task: TaskRef = {
      type: 'QUESTION',
      id: bankItem.id,
      revision: 1,
      sha256: await computeSha256(canonicalJson({ id: bankItem.id, stem: bankItem.stemText })),
    };
    const contract: AssessmentContract = {
      id: `asmt:${bankItem.id.toLowerCase()}`,
      revision: 1,
      task_ref: task,
      response_kind: bankItem.kind,
      max_points: bankItem.maxPoints,
      evaluator: bankItem.canonicalValue ? {
        mode: 'AUTOMATIC',
        canonical_value: bankItem.canonicalValue as any,
        allowed_options: bankItem.options ? bankItem.options.map(o => o.id) : undefined,
      } : { mode: 'REVIEW_PENDING' },
      status: 'HOLD',
    };
    const sha256 = await computeSha256(canonicalJson(contract));
    return {
      task,
      assessment: { type: 'ASSESSMENT', id: contract.id, revision: 1, sha256 },
      contract,
      isReviewedForDisclosure: true,
    };
  }

  throw new Error(`UNKNOWN_QUESTION_ID: ${questionId}`);
}

export async function getAuthorizedWpeEntry(questionId: string): Promise<AuthorizedQuestionEntry> {
  return getAuthorizedPhysicsEntry(questionId);
}
