/**
 * web/pages/topic.ts
 * A22 / A73 — Topic Screen Controller & 4-Tab Workspace Mount.
 *
 * Implements:
 * - Dynamic topic detail and real item counts
 * - Four canonical workspace tabs (Question Bank, Learn & Try, Explorer, Standalone Labs)
 * - Seamless mounting of Core 1A (A25/A31), Core 1B (A26/A32), Core 2 (A24), Explorer (A30/A65)
 * - Standalone Energy Well physics model simulation (A50/A54)
 * - Safe return context and 12.7" tablet touch ergonomics (48px min, 56px primary)
 *
 * No academic approval inferred from software validation.
 */

import { ALL_SIX_CORE_ROLES } from './home.ts';
import type { CoreRoleEntry } from './home.ts';
import { escapeHtml } from '../runtime/rendering.ts';
import { HIT_TARGET_MIN_PX, HIT_TARGET_PRIMARY_PX } from '../styles/tokens.ts';
import { QuestionPageController, mountQuestionPage } from './question.ts';
import { Core1ALessonPageController, mountCore1ALesson, createDefaultLesson } from './lesson.ts';
import { Core1BTransferPageController, mountCore1BTransfer, createDefaultTransferDefinition } from './transfer.ts';
import { Core1OrientationPageController, mountCore1Orientation } from './orientation.ts';
import { Core2ASupportedPageController, mountCore2ASupported } from './supported-practice.ts';
import { Core2BTransferPageController, mountCore2BTransfer } from './transfer-changed-demand.ts';
import { GcdrExplorerPageController, mountGcdrExplorer } from './explorer.ts';
import { WPE_DIAGNOSTIC_DECK, PHYSICS_DIAGNOSTIC_DECK, getAuthorizedWpeEntry, getAuthorizedPhysicsEntry, WPE_RELEASE_ID } from '../runtime/wpe-deck.ts';
import { createAuthorizedQuestionSession } from '../runtime/question-session.ts';
import { createAuthorizedTransferSession } from '../runtime/wpe-transfer.ts';
import { HarmonicEnergyWellAdapter } from '../adapters/physics/models/energy-well.ts';
import { ProofWorkspaceController, mountProofWorkspace } from '../components/proof.ts';
import { CirclesMasterController, mountCirclesMaster } from './circles-master.ts';
import { PortableWorkbenchController } from '../applications/portable/component.ts';
import { RIEMANN_SUMS_PACKAGE, LONG_DIVISION_PACKAGE } from '../runtime/math-packages.ts';
import { ChemicalWorkWorkspaceController, mountChemicalWorkspace } from '../components/chemical-work.ts';
import { RedoxAdaptiveController, mountRedoxAdaptive } from './redox-adaptive.ts';
import { TitrationSimulatorController, mountTitrationSimulator } from './titration.ts';
import { REDOX_ELECTRON_EQUIVALENCE_PACKAGE } from '../runtime/chem-packages.ts';
import { MotionPlaneController, mountMotionPlane } from './motion-plane.ts';
import { MOTION_SHARED_CLOCK_PACKAGE } from '../runtime/physics-packages.ts';
import { ScratchpadController, mountScratchpadWorkspace } from '../components/workspace/scratchpad.ts';
import { mountExperimentLab } from './resources.ts';

// ---------------------------------------------------------------------------
// Mathematics Topic Question Decks
// ---------------------------------------------------------------------------

export const MATH_POLYNOMIALS_DECK = [
  {
    id: 'poly-01',
    code: 'POL-01',
    title: "Vieta's Formulas for Cubic Roots",
    kind: 'INTEGER' as const,
    keyStatus: 'VERIFIED' as const,
    maxPoints: 3,
    status: 'RELEASED' as const,
    stemText: 'Let P(x) = x³ - 6x² + 11x - 6 = 0 have roots α, β, γ. Evaluate the sum of pairwise products αβ + βγ + γα.',
    explanationHtml: 'By Vieta\'s formulas for a cubic ax³ + bx² + cx + d = 0, the sum of pairwise products of roots is c/a = 11/1 = 11.',
  },
  {
    id: 'poly-02',
    code: 'POL-02',
    title: 'Integer Root Theorem Application',
    kind: 'INTEGER' as const,
    keyStatus: 'VERIFIED' as const,
    maxPoints: 3,
    status: 'RELEASED' as const,
    stemText: 'Find the largest real integer root of the cubic polynomial P(x) = x³ - 3x² - 4x + 12 = 0.',
    explanationHtml: 'Factoring by grouping: x²(x - 3) - 4(x - 3) = (x² - 4)(x - 3) = (x - 2)(x + 2)(x - 3) = 0. The integer roots are -2, 2, 3. The largest is 3.',
  },
  {
    id: 'poly-03',
    code: 'POL-03',
    title: 'Polynomial Remainder Theorem',
    kind: 'INTEGER' as const,
    keyStatus: 'VERIFIED' as const,
    maxPoints: 4,
    status: 'RELEASED' as const,
    stemText: 'Evaluate the remainder when P(x) = x⁴ - 2x³ + 3x² - 4x + 5 is divided by (x - 2).',
    explanationHtml: 'By the Remainder Theorem, R = P(2) = 2⁴ - 2(2³) + 3(2²) - 4(2) + 5 = 16 - 16 + 12 - 8 + 5 = 9.',
  },
  {
    id: 'poly-04',
    code: 'POL-04',
    title: 'Symmetric Sum of Reciprocal Roots',
    kind: 'INTEGER' as const,
    keyStatus: 'VERIFIED' as const,
    maxPoints: 5,
    status: 'RELEASED' as const,
    stemText: 'Let a, b, c be roots of x³ - 7x + 2 = 0. Evaluate the value of 10 * (1/a + 1/b + 1/c).',
    explanationHtml: '1/a + 1/b + 1/c = (ab + bc + ca)/(abc). By Vieta: ab + bc + ca = -7, abc = -2. So 1/a + 1/b + 1/c = -7 / -2 = 3.5. Multiplying by 10 yields 35.',
  },
];

export const MATH_EUCLID_DECK = [
  {
    id: 'geom-01',
    code: 'GEO-01',
    title: 'Inscribed Angle in Semicircle',
    kind: 'INTEGER' as const,
    keyStatus: 'VERIFIED' as const,
    maxPoints: 2,
    status: 'RELEASED' as const,
    stemText: 'In a circle with diameter AB, point C lies on the circumference. If ∠CAB = 35°, evaluate the measure of ∠ABC in degrees.',
    explanationHtml: 'By Thales’s Theorem, the angle in a semicircle ∠ACB = 90°. In triangle ABC, ∠ABC = 180° - 90° - 35° = 55°.',
  },
  {
    id: 'geom-02',
    code: 'GEO-02',
    title: 'Power of a Point: Tangent-Secant',
    kind: 'INTEGER' as const,
    keyStatus: 'VERIFIED' as const,
    maxPoints: 3,
    status: 'RELEASED' as const,
    stemText: 'From an external point P, tangent segment PT and secant PAB are drawn. If PA = 4 and AB = 5, find the length of PT.',
    explanationHtml: 'By the Power of a Point theorem: PT² = PA * PB = 4 * (4 + 5) = 4 * 9 = 36. Thus PT = 6.',
  },
  {
    id: 'geom-03',
    code: 'GEO-03',
    title: 'Cyclic Quadrilateral Opposite Angles',
    kind: 'INTEGER' as const,
    keyStatus: 'VERIFIED' as const,
    maxPoints: 3,
    status: 'RELEASED' as const,
    stemText: 'In cyclic quadrilateral ABCD, ∠DAB = 74°. Find the measure of opposite angle ∠BCD in degrees.',
    explanationHtml: 'Opposite angles of a cyclic quadrilateral sum to 180°. ∠BCD = 180° - 74° = 106°.',
  },
  {
    id: 'geom-04',
    code: 'GEO-04',
    title: 'Chord Distance from Center',
    kind: 'INTEGER' as const,
    keyStatus: 'VERIFIED' as const,
    maxPoints: 4,
    status: 'RELEASED' as const,
    stemText: 'A chord of length 16 is drawn in a circle of radius 10. Find the perpendicular distance from the center to the chord.',
    explanationHtml: 'Perpendicular from center bisects the chord into halves of length 8. By Pythagorean theorem: d² = r² - (chord/2)² = 10² - 8² = 100 - 64 = 36. Distance d = 6.',
  },
];

export const MATH_RIEMANN_DECK = [
  {
    id: 'riem-01',
    code: 'RIE-01',
    title: 'Lower Darboux Sum for n=2',
    kind: 'INTEGER' as const,
    keyStatus: 'VERIFIED' as const,
    maxPoints: 3,
    status: 'RELEASED' as const,
    stemText: 'For f(x) = x² on [0, 1] with n = 2 equal intervals, evaluate 1000 * L(f, P_2).',
    explanationHtml: 'Subintervals are [0, 0.5] and [0.5, 1], Δx = 0.5. L(f, P_2) = (0² * 0.5) + (0.5² * 0.5) = 0 + 0.125 = 0.125. 1000 * 0.125 = 125.',
  },
  {
    id: 'riem-02',
    code: 'RIE-02',
    title: 'Upper Darboux Sum for n=2',
    kind: 'INTEGER' as const,
    keyStatus: 'VERIFIED' as const,
    maxPoints: 3,
    status: 'RELEASED' as const,
    stemText: 'For f(x) = x² on [0, 1] with n = 2 equal intervals, evaluate 1000 * U(f, P_2).',
    explanationHtml: 'Subintervals [0, 0.5] and [0.5, 1], Δx = 0.5. U(f, P_2) = (0.5² * 0.5) + (1.0² * 0.5) = 0.125 + 0.5 = 0.625. 1000 * 0.625 = 625.',
  },
  {
    id: 'riem-03',
    code: 'RIE-03',
    title: 'Monotonic Refinement Inequality',
    kind: 'INTEGER' as const,
    keyStatus: 'VERIFIED' as const,
    maxPoints: 4,
    status: 'RELEASED' as const,
    stemText: 'Evaluate the difference between U(f, P_2) and L(f, P_2) multiplied by 1000.',
    explanationHtml: 'U(f, P_2) - L(f, P_2) = 0.625 - 0.125 = 0.500. Multiplied by 1000 gives 500.',
  },
];

// ---------------------------------------------------------------------------
// Chemistry Topic Question Decks
// ---------------------------------------------------------------------------

export const CHEM_REDOX_DECK = [
  {
    id: 'chem-redox-01',
    code: 'RED-01',
    title: 'CrO5 Butterfly Peroxide Oxidation State',
    kind: 'INTEGER' as const,
    keyStatus: 'VERIFIED' as const,
    maxPoints: 3,
    status: 'RELEASED' as const,
    sourceProvenance: 'AUTHENTIC_SOURCE_PINNED' as const,
    sourceRef: 'Grade9v3.5:public/chemistry/redox/explorers/redox_reactions/adaptive-hard-concept-proof.html',
    stemText: 'Chromium(VI) oxide peroxide (CrO5) adopts a butterfly structure with four peroxide oxygen atoms and one oxo oxygen atom. Determine the formal oxidation state of chromium.',
    explanationHtml: 'Each peroxide oxygen has an oxidation state of -1 (4 x -1 = -4). The oxo oxygen has an oxidation state of -2. To balance the neutral CrO5 molecule: Oxidation State(Cr) + 4(-1) + (-2) = 0 => Oxidation State(Cr) = +6.',
  },
  {
    id: 'chem-redox-02',
    code: 'RED-02',
    title: 'Reaction-Dependent n-Factor of KMnO4',
    kind: 'INTEGER' as const,
    keyStatus: 'VERIFIED' as const,
    maxPoints: 3,
    status: 'RELEASED' as const,
    sourceProvenance: 'AUTHENTIC_SOURCE_PINNED' as const,
    sourceRef: 'Grade9v3.5:public/chemistry/redox/explorers/redox_reactions/adaptive-hard-concept-proof.html',
    stemText: 'In acidic aqueous solution (dilute H2SO4), potassium permanganate (KMnO4) is reduced to manganese(II) ions (Mn2+). Determine the valence factor (n-factor) of KMnO4.',
    explanationHtml: 'The reduction half-reaction is MnO4- + 8 H+ + 5 e- -> Mn2+ + 4 H2O. Manganese changes from +7 to +2, gaining 5 electrons per formula unit. Hence, the n-factor is 5.',
  },
  {
    id: 'chem-redox-03',
    code: 'RED-03',
    title: 'FeC2O4 to Dichromate Mole Ratio',
    kind: 'INTEGER' as const,
    keyStatus: 'VERIFIED' as const,
    maxPoints: 4,
    status: 'RELEASED' as const,
    sourceProvenance: 'AUTHENTIC_SOURCE_PINNED' as const,
    sourceRef: 'Grade9v3.5:public/chemistry/redox/explorers/redox_reactions/adaptive-hard-concept-proof.html',
    stemText: 'Ferrous oxalate (FeC2O4) is titrated against potassium dichromate (K2Cr2O7) in acidic medium. How many moles of FeC2O4 are oxidized by 1 mole of Cr2O7^2-?',
    explanationHtml: 'Each mole of FeC2O4 donates 3 electrons: Fe2+ -> Fe3+ + 1 e-, and C2O4^2- -> 2 CO2 + 2 e- (total 3 e-). Each mole of Cr2O7^2- accepts 6 electrons (2 Cr6+ -> 2 Cr3+). Therefore, 6 / 3 = 2 moles of FeC2O4 react per mole of Cr2O7^2-.',
  },
  {
    id: 'chem-redox-04',
    code: 'RED-04',
    title: 'Disproportionation of Manganate(VI)',
    kind: 'INTEGER' as const,
    keyStatus: 'VERIFIED' as const,
    maxPoints: 5,
    status: 'RELEASED' as const,
    sourceProvenance: 'SYNTHETIC_DIAGNOSTIC_FIXTURE' as const,
    sourceRef: 'synthetic:phase7-stoichiometry-fixtures',
    stemText: 'In acidic solution, 3 moles of manganate(VI) disproportionate: 3 MnO4^2- + 4 H+ -> 2 MnO4- + MnO2 + 2 H2O. Calculate the net change in oxidation state of the oxidized manganese species.',
    explanationHtml: 'Two moles of Mn(VI) are oxidized to Mn(VII), donating 1 electron each (net change = 1 per oxidized Mn atom). One mole of Mn(VI) is reduced to Mn(IV), accepting 2 electrons.',
  },
];

export const CHEM_BONDING_DECK = [
  {
    id: 'chem-bond-01',
    code: 'BND-01',
    title: 'VSEPR Molecular Geometry of Sulfur Tetrafluoride',
    kind: 'INTEGER' as const,
    keyStatus: 'VERIFIED' as const,
    maxPoints: 3,
    status: 'RELEASED' as const,
    sourceProvenance: 'SYNTHETIC_DIAGNOSTIC_FIXTURE' as const,
    sourceRef: 'synthetic:phase7-vsepr-fixtures',
    stemText: 'Sulfur tetrafluoride (SF4) has 5 electron domains around sulfur (4 bonding pairs, 1 lone pair). How many non-bonding lone pairs reside in the equatorial plane of the seesaw geometry?',
    explanationHtml: 'In trigonal bipyramidal electron geometry (sp3d), lone pairs occupy equatorial positions to minimize 90-degree lone pair-bonding pair repulsions. Thus, exactly 1 lone pair is in the equatorial plane.',
  },
  {
    id: 'chem-bond-02',
    code: 'BND-02',
    title: 'Valence Octet Expansion in Phosphorus Pentachloride',
    kind: 'INTEGER' as const,
    keyStatus: 'VERIFIED' as const,
    maxPoints: 3,
    status: 'RELEASED' as const,
    sourceProvenance: 'SYNTHETIC_DIAGNOSTIC_FIXTURE' as const,
    sourceRef: 'synthetic:phase7-vsepr-fixtures',
    stemText: 'Determine the total number of shared valence electrons surrounding the central phosphorus atom in gaseous PCl5.',
    explanationHtml: 'PCl5 forms 5 single P-Cl covalent bonds. With 2 shared electrons per single bond, phosphorus is surrounded by 5 x 2 = 10 valence electrons (an expanded octet utilizing 3d orbitals).',
  },
  {
    id: 'chem-bond-03',
    code: 'BND-03',
    title: 'Hybridization of Iodine Pentafluoride',
    kind: 'INTEGER' as const,
    keyStatus: 'VERIFIED' as const,
    maxPoints: 4,
    status: 'RELEASED' as const,
    sourceProvenance: 'SYNTHETIC_DIAGNOSTIC_FIXTURE' as const,
    sourceRef: 'synthetic:phase7-vsepr-fixtures',
    stemText: 'Iodine pentafluoride (IF5) has 5 bonding pairs and 1 lone pair on iodine. What is the steric number (number of hybrid orbitals) of the central iodine atom?',
    explanationHtml: 'Steric number = 5 bonding pairs + 1 lone pair = 6 electron domains, corresponding to octahedral electron geometry and sp3d2 hybridization. Steric number is 6.',
  },
  {
    id: 'chem-bond-04',
    code: 'BND-04',
    title: 'Dipole Moment Symmetry in Boron Trifluoride',
    kind: 'INTEGER' as const,
    keyStatus: 'VERIFIED' as const,
    maxPoints: 4,
    status: 'RELEASED' as const,
    sourceProvenance: 'SYNTHETIC_DIAGNOSTIC_FIXTURE' as const,
    sourceRef: 'synthetic:phase7-vsepr-fixtures',
    stemText: 'In BF3, three polar B-F bonds are oriented at 120 degrees in a trigonal planar geometry. What is the net molecular dipole moment in Debye units?',
    explanationHtml: 'By vector symmetry, the three bond dipole vectors cancel vectorially: sum(mu_i) = 0. Hence BF3 is completely nonpolar with net dipole moment 0 Debye.',
  },
];

export const CHEM_STOICHIOMETRY_DECK = [
  {
    id: 'chem-stoich-01',
    code: 'STC-01',
    title: 'Limiting Reactant in Ammonia Synthesis',
    kind: 'INTEGER' as const,
    keyStatus: 'VERIFIED' as const,
    maxPoints: 3,
    status: 'RELEASED' as const,
    sourceProvenance: 'SYNTHETIC_DIAGNOSTIC_FIXTURE' as const,
    sourceRef: 'synthetic:phase7-stoichiometry-fixtures',
    stemText: 'Nitrogen and hydrogen react according to N2 + 3 H2 -> 2 NH3. If 2 moles of N2 and 3 moles of H2 are supplied, how many moles of NH3 are produced assuming 100% yield?',
    explanationHtml: 'Stoichiometric ratio requires 3 moles of H2 per 1 mole of N2. For 2 moles of N2, 6 moles of H2 are needed. Since only 3 moles of H2 are available, H2 is the limiting reactant. 3 moles of H2 produce 2 moles of NH3.',
  },
  {
    id: 'chem-stoich-02',
    code: 'STC-02',
    title: 'Combustion Analysis of Hydrocarbon',
    kind: 'INTEGER' as const,
    keyStatus: 'VERIFIED' as const,
    maxPoints: 4,
    status: 'RELEASED' as const,
    sourceProvenance: 'SYNTHETIC_DIAGNOSTIC_FIXTURE' as const,
    sourceRef: 'synthetic:phase7-stoichiometry-fixtures',
    stemText: 'Complete combustion of 1 mole of hydrocarbon CxHy requires 5 moles of O2 and produces 3 moles of CO2 and 4 moles of H2O. What is the molar mass of CxHy in g/mol?',
    explanationHtml: 'From carbon balance: x = 3 (CO2). From hydrogen balance: y = 2 x 4 = 8 (H2O). The hydrocarbon is propane (C3H8). Molar mass = 3(12.011) + 8(1.008) = 36.033 + 8.064 = 44.097 ~= 44 g/mol.',
  },
  {
    id: 'chem-stoich-03',
    code: 'STC-03',
    title: 'Equivalence Point Volume in Acetic Acid Titration',
    kind: 'INTEGER' as const,
    keyStatus: 'VERIFIED' as const,
    maxPoints: 4,
    status: 'RELEASED' as const,
    sourceProvenance: 'SYNTHETIC_DIAGNOSTIC_FIXTURE' as const,
    sourceRef: 'synthetic:phase7-stoichiometry-fixtures',
    stemText: 'A 25.0 mL aliquot of 0.100 M CH3COOH is titrated with 0.100 M NaOH. How many mL of NaOH titrant are required to reach the stoichiometric equivalence point?',
    explanationHtml: 'At the equivalence point: C_a * V_a = C_b * V_b => 0.100 M * 25.0 mL = 0.100 M * V_b => V_b = 25.0 mL. Integer answer is 25.',
  },
  {
    id: 'chem-stoich-04',
    code: 'STC-04',
    title: 'Precipitation Reaction Yield',
    kind: 'INTEGER' as const,
    keyStatus: 'VERIFIED' as const,
    maxPoints: 5,
    status: 'RELEASED' as const,
    sourceProvenance: 'SYNTHETIC_DIAGNOSTIC_FIXTURE' as const,
    sourceRef: 'synthetic:phase7-stoichiometry-fixtures',
    stemText: 'Mixing aqueous solutions of 1 mole AgNO3 and 1 mole NaCl produces AgCl precipitate. If the experimental yield is 85%, how many percentage points below theoretical yield is this?',
    explanationHtml: 'Theoretical yield is 100%. The difference is 100% - 85% = 15 percentage points.',
  },
];

export interface TopicDetail {
  readonly id: string;
  readonly code: string;
  readonly title: string;
  readonly subjectId: string;
  readonly subjectCode: string;
  readonly strand?: string;
  readonly status: 'AVAILABLE' | 'HOLD';
  readonly verifiedQuestionCount: number;
  readonly interactiveModelCount: number;
  readonly resourceCount: number;
  readonly description?: string;
}

export const WPE_PHYSICS_TOPIC: TopicDetail = {
  id: 'wpe',
  code: 'WPE',
  title: 'Work, Power and Energy',
  subjectId: 'physics',
  subjectCode: 'PHYSICS',
  strand: 'Mechanics',
  status: 'AVAILABLE',
  verifiedQuestionCount: 4,
  interactiveModelCount: 3,
  resourceCount: 8,
  description: 'Work-energy theorem, conservative and non-conservative forces, potential energy functions, and power.',
};

export const PHY_MOTION_PLANE_TOPIC: TopicDetail = {
  id: 'motion-plane',
  code: 'MOTION_PLANE',
  title: 'Motion in a Plane & Kinematics',
  subjectId: 'physics',
  subjectCode: 'PHYSICS',
  strand: 'Mechanics',
  status: 'AVAILABLE',
  verifiedQuestionCount: 4,
  interactiveModelCount: 3,
  resourceCount: 8,
  description: 'Two-dimensional kinematics, vector components, parabolic trajectory, range invariance, and curved banking.',
};

export const PHY_CIRCULAR_BANKING_TOPIC: TopicDetail = {
  id: 'circular-banking',
  code: 'CIRCULAR_BANKING',
  title: 'Circular Motion & Road Banking',
  subjectId: 'physics',
  subjectCode: 'PHYSICS',
  strand: 'Mechanics',
  status: 'AVAILABLE',
  verifiedQuestionCount: 4,
  interactiveModelCount: 2,
  resourceCount: 6,
  description: 'Centripetal acceleration, normal reaction and friction forces on banked curves, optimal and skidding speeds.',
};

export const PHY_GRAVITATION_TOPIC: TopicDetail = {
  id: 'gravitation',
  code: 'GRAVITATION',
  title: 'Gravitation & Orbital Mechanics',
  subjectId: 'physics',
  subjectCode: 'PHYSICS',
  strand: 'Mechanics',
  status: 'AVAILABLE',
  verifiedQuestionCount: 4,
  interactiveModelCount: 2,
  resourceCount: 6,
  description: "Newton's law of universal gravitation, Kepler's laws, gravitational potential energy, and orbital velocity.",
};

export const MATH_POLYNOMIALS_TOPIC: TopicDetail = {
  id: 'polynomials',
  code: 'POLYNOMIALS',
  title: 'Polynomials & Real Numbers',
  subjectId: 'mathematics',
  subjectCode: 'MATHEMATICS',
  strand: 'Algebra',
  status: 'AVAILABLE',
  verifiedQuestionCount: 4,
  interactiveModelCount: 2,
  resourceCount: 6,
  description: 'Algebraic structures, polynomial division, factor theorem, and root isolation.',
};

export const MATH_EUCLID_TOPIC: TopicDetail = {
  id: 'euclid-geometry',
  code: 'EUCLID',
  title: 'Euclidean Geometry & Proofs',
  subjectId: 'mathematics',
  subjectCode: 'MATHEMATICS',
  strand: 'Geometry',
  status: 'AVAILABLE',
  verifiedQuestionCount: 4,
  interactiveModelCount: 3,
  resourceCount: 8,
  description: 'Axiomatic geometry, angle chasing, cyclic quadrilaterals, circle theorems, and deductive proofs.',
};

export const MATH_RIEMANN_TOPIC: TopicDetail = {
  id: 'riemann',
  code: 'RIEMANN',
  title: 'Foundations of Real Analysis & Calculus',
  subjectId: 'mathematics',
  subjectCode: 'MATHEMATICS',
  strand: 'Analysis',
  status: 'AVAILABLE',
  verifiedQuestionCount: 3,
  interactiveModelCount: 2,
  resourceCount: 5,
  description: 'Partitions, step functions, Darboux sums, and Riemann integrability of monotonic functions.',
};

export const CHEM_REDOX_TOPIC: TopicDetail = {
  id: 'chem-redox',
  code: 'CHEM_REDOX',
  title: 'Redox Reactions & Electron Transfer',
  subjectId: 'chemistry',
  subjectCode: 'CHEMISTRY',
  strand: 'Inorganic Chemistry',
  status: 'AVAILABLE',
  verifiedQuestionCount: 4,
  interactiveModelCount: 3,
  resourceCount: 8,
  description: 'Oxidation numbers, redox half-reactions, multi-centre electron transfer, and disproportionation equilibria.',
};

export const CHEM_BONDING_TOPIC: TopicDetail = {
  id: 'chem-bonding',
  code: 'CHEM_BONDING',
  title: 'Chemical Bonding & Molecular Structure',
  subjectId: 'chemistry',
  subjectCode: 'CHEMISTRY',
  strand: 'Inorganic Chemistry',
  status: 'AVAILABLE',
  verifiedQuestionCount: 4,
  interactiveModelCount: 2,
  resourceCount: 6,
  description: 'Lewis structures, VSEPR molecular geometry, octet expansion, hybridization, and electric dipole moments.',
};

export const CHEM_STOICHIOMETRY_TOPIC: TopicDetail = {
  id: 'chem-stoichiometry',
  code: 'CHEM_STOICHIOMETRY',
  title: 'Stoichiometry & Volumetric Analysis',
  subjectId: 'chemistry',
  subjectCode: 'CHEMISTRY',
  strand: 'Analytical Chemistry',
  status: 'AVAILABLE',
  verifiedQuestionCount: 4,
  interactiveModelCount: 2,
  resourceCount: 7,
  description: 'Stoichiometric proportions, limiting reagents, percent yields, and volumetric titration equilibria.',
};

export interface TopicViewState {
  readonly status: 'LOADING' | 'POPULATED' | 'UNAVAILABLE';
  readonly topic: TopicDetail | null;
  readonly coreRoleActions: readonly CoreRoleEntry[];
  readonly explorerRoute: string;
  readonly resourceCatalogueRoute: string;
  readonly reason?: string;
}

export class TopicScreenController {
  private topic: TopicDetail | null = null;
  private state: TopicViewState = {
    status: 'LOADING',
    topic: null,
    coreRoleActions: [],
    explorerRoute: '/explorer',
    resourceCatalogueRoute: '/resources',
  };

  constructor(initialTopic?: TopicDetail) {
    if (initialTopic) {
      this.loadTopic(initialTopic);
    } else {
      this.state = {
        status: 'LOADING',
        topic: null,
        coreRoleActions: [],
        explorerRoute: '/explorer',
        resourceCatalogueRoute: '/resources',
      };
    }
  }

  loadTopic(topic: TopicDetail): void {
    this.topic = structuredClone(topic);
    this.updateState();
  }

  setUnavailable(reason: string): void {
    this.topic = null;
    this.state = {
      status: 'UNAVAILABLE',
      topic: null,
      coreRoleActions: [],
      explorerRoute: '/explorer',
      resourceCatalogueRoute: '/resources',
      reason,
    };
  }

  getViewState(): TopicViewState {
    return this.state;
  }

  private updateState(): void {
    if (!this.topic) {
      this.state = {
        status: 'UNAVAILABLE',
        topic: null,
        coreRoleActions: [],
        explorerRoute: '/explorer',
        resourceCatalogueRoute: '/resources',
        reason: 'No topic loaded.',
      };
      return;
    }

    if (this.topic.status !== 'AVAILABLE') {
      this.state = {
        status: 'UNAVAILABLE',
        topic: this.topic,
        coreRoleActions: [],
        explorerRoute: '/explorer',
        resourceCatalogueRoute: '/resources',
        reason: `Topic '${this.topic.title}' is on HOLD pending independent academic qualification.`,
      };
      return;
    }

    const topicCode = this.topic.code.toLowerCase();
    const subjectCode = this.topic.subjectCode.toLowerCase();

    const coreRoleActions = ALL_SIX_CORE_ROLES.map((r) => ({
      ...r,
      path: `/topic/${subjectCode}/${topicCode}/${r.role.toLowerCase()}`,
    }));

    this.state = {
      status: 'POPULATED',
      topic: this.topic,
      coreRoleActions,
      explorerRoute: `/subject/${subjectCode}/topic/${topicCode}/explorer`,
      resourceCatalogueRoute: `/resources?topic=${topicCode}`,
    };
  }
}

export function createTopicScreen(topic?: TopicDetail): TopicScreenController {
  return new TopicScreenController(topic);
}

export interface TopicWorkspaceMountResult {
  dispose: () => void;
  refresh: () => void;
}

/**
 * Mounts the production-grade 4-tab Topic Workspace for Physics WPE.
 */
export function mountTopicWorkspace(
  root: HTMLElement,
  controller: TopicScreenController,
  activeTab: string = 'questions',
  onNavigate?: (route: string) => void
): TopicWorkspaceMountResult {
  let active = true;
  let activeSubDisposer: (() => void) | null = null;
  let selectedQuestionId: string | null = null;
  let activeQuestionMode: 'CORE2' | 'CORE2A' | 'CORE2B' = 'CORE2';
  let learnTrySubRole: 'CORE1' | 'CORE1A' | 'CORE1B' = 'CORE1A';
  let energyWellDisplacement = 0.0;

  const currentTab = ['questions', 'learn-try', 'explorer', 'labs'].includes(activeTab) ? activeTab : 'questions';

  const cleanupSub = () => {
    if (activeSubDisposer) {
      try { activeSubDisposer(); } catch {}
      activeSubDisposer = null;
    }
  };

  const renderShell = () => {
    if (!active) return;
    cleanupSub();

    const state = controller.getViewState();
    const topic = state.topic || WPE_PHYSICS_TOPIC;
    const isMath = topic.subjectCode.toUpperCase() === 'MATHEMATICS' || topic.subjectId.toLowerCase() === 'mathematics';
    const isChem = topic.subjectCode.toUpperCase() === 'CHEMISTRY' || topic.subjectId.toLowerCase() === 'chemistry';
    const subjName = isChem ? 'Chemistry' : isMath ? 'Mathematics' : 'Physics';
    const subjRoute = isChem ? '#/subject/chemistry' : isMath ? '#/subject/mathematics' : '#/subject/physics';
    const subjEmoji = isChem ? '🧪 ' : isMath ? '📐 ' : '⚛️ ';

    root.innerHTML = `
      <div class="g9-topic-workspace" style="background:#ffffff;border:1px solid #e2e8f0;border-radius:12px;padding:1.5rem;max-width:100%;box-sizing:border-box;font-family:system-ui,-apple-system,sans-serif;">
        <!-- Breadcrumb Navigation -->
        <nav aria-label="Breadcrumb" style="display:flex;gap:8px;font-size:0.95rem;color:#64748b;margin-bottom:1rem;flex-wrap:wrap;">
          <a href="#/home" style="color:#0284c7;text-decoration:none;font-weight:600;min-height:36px;display:inline-flex;align-items:center;">Home</a> &gt; 
          <a href="${subjRoute}" style="color:#0284c7;text-decoration:none;font-weight:600;min-height:36px;display:inline-flex;align-items:center;">${subjName}</a> &gt; 
          <span style="font-weight:600;color:#0f172a;min-height:36px;display:inline-flex;align-items:center;">Topic: ${escapeHtml(topic.title)}</span>
        </nav>

        <!-- Topic Header -->
        <div style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:1rem;margin-bottom:1.25rem;padding-bottom:1rem;border-bottom:1px solid #e2e8f0;">
          <div>
            <div style="display:flex;align-items:center;gap:10px;margin-bottom:4px;">
              <span style="font-size:0.8rem;font-weight:800;color:#0369a1;background:#e0f2fe;padding:2px 8px;border-radius:4px;">${escapeHtml(topic.code)}</span>
              <span style="font-size:0.8rem;font-weight:700;color:#047857;background:#d1fae5;padding:2px 8px;border-radius:4px;">${escapeHtml(topic.status)}</span>
              <span style="font-size:0.8rem;font-weight:600;color:#475569;">12.7" Tablet Workspace</span>
            </div>
            <h1 class="topic-workspace-title" style="margin:0;font-size:1.85rem;font-weight:800;color:#0f172a;">${subjEmoji}${subjName}: ${escapeHtml(topic.title)}</h1>
            <p style="margin:0.25rem 0 0;font-size:1rem;color:#64748b;">Unified workspace across all 7 native curriculum roles</p>
          </div>
          <button type="button" id="g9-return-subject-btn" style="min-height:${HIT_TARGET_MIN_PX}px;padding:8px 16px;background:#f8fafc;color:#0f172a;border:1px solid #cbd5e1;border-radius:6px;cursor:pointer;font-weight:600;font-size:0.95rem;">← Back to ${subjName}</button>
        </div>

        <!-- 4 Canonical Workspace Tabs -->
        <div class="g9-topic-tabs-bar" style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:1.5rem;border-bottom:2px solid #e2e8f0;padding-bottom:12px;" role="tablist">
          <button type="button" data-tab="questions" style="min-height:${HIT_TARGET_MIN_PX}px;padding:10px 18px;background:${currentTab === 'questions' ? '#0284c7' : '#f1f5f9'};color:${currentTab === 'questions' ? '#ffffff' : '#0f172a'};border:none;border-radius:6px;font-weight:700;font-size:0.95rem;cursor:pointer;">1. 📋 Question Bank (Core 2)</button>
          <button type="button" data-tab="learn-try" style="min-height:${HIT_TARGET_MIN_PX}px;padding:10px 18px;background:${currentTab === 'learn-try' ? '#0284c7' : '#f1f5f9'};color:${currentTab === 'learn-try' ? '#ffffff' : '#0f172a'};border:none;border-radius:6px;font-weight:700;font-size:0.95rem;cursor:pointer;">2. 💡 Learn &amp; Try (Core 1A / 1B)</button>
          <button type="button" data-tab="explorer" style="min-height:${HIT_TARGET_MIN_PX}px;padding:10px 18px;background:${currentTab === 'explorer' ? '#0284c7' : '#f1f5f9'};color:${currentTab === 'explorer' ? '#ffffff' : '#0f172a'};border:none;border-radius:6px;font-weight:700;font-size:0.95rem;cursor:pointer;">3. 🔬 Explorer Simulation</button>
          <button type="button" data-tab="labs" style="min-height:${HIT_TARGET_MIN_PX}px;padding:10px 18px;background:${currentTab === 'labs' ? '#0284c7' : '#f1f5f9'};color:${currentTab === 'labs' ? '#ffffff' : '#0f172a'};border:none;border-radius:6px;font-weight:700;font-size:0.95rem;cursor:pointer;">4. 🧰 Standalone Labs</button>
        </div>

        <!-- Active Tab Content Container -->
        <div id="g9-tab-slot" style="min-height:480px;width:100%;box-sizing:border-box;"></div>
      </div>
    `;

    // Mount content of active tab
    const slot = root.querySelector<HTMLElement>('#g9-tab-slot');
    if (!slot) return;

    if (currentTab === 'questions') {
      mountQuestionBankTab(slot);
    } else if (currentTab === 'learn-try') {
      mountLearnTryTab(slot);
    } else if (currentTab === 'explorer') {
      mountExplorerTab(slot);
    } else if (currentTab === 'labs') {
      mountLabsTab(slot);
    }
  };

  // -------------------------------------------------------------------------
  // Tab 1: Question Bank (Core 2 / 2A / 2B)
  // -------------------------------------------------------------------------
  const mountQuestionBankTab = (container: HTMLElement) => {
    const topic = controller.getViewState().topic || WPE_PHYSICS_TOPIC;
    let deck: readonly any[] = WPE_DIAGNOSTIC_DECK;
    if (topic.code === 'MOTION_PLANE') deck = PHYSICS_DIAGNOSTIC_DECK.filter(q => q.id.startsWith('PHYS-KIN'));
    else if (topic.code === 'CIRCULAR_BANKING') deck = PHYSICS_DIAGNOSTIC_DECK.filter(q => q.id.startsWith('PHYS-CIRC'));
    else if (topic.code === 'GRAVITATION') deck = PHYSICS_DIAGNOSTIC_DECK.filter(q => q.id.startsWith('PHYS-GRAV'));
    else if (topic.code === 'WPE') deck = PHYSICS_DIAGNOSTIC_DECK.filter(q => q.id.startsWith('PHYS-WPE'));
    else if (topic.code === 'POLYNOMIALS') deck = MATH_POLYNOMIALS_DECK;
    else if (topic.code === 'EUCLID') deck = MATH_EUCLID_DECK;
    else if (topic.code === 'RIEMANN') deck = MATH_RIEMANN_DECK;
    else if (topic.code === 'CHEM_REDOX') deck = CHEM_REDOX_DECK;
    else if (topic.code === 'CHEM_BONDING') deck = CHEM_BONDING_DECK;
    else if (topic.code === 'CHEM_STOICHIOMETRY') deck = CHEM_STOICHIOMETRY_DECK;

    if (!selectedQuestionId) {
      // Render Question Deck Selection
      container.innerHTML = `
        <div class="g9-question-deck">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem;flex-wrap:wrap;gap:8px;">
            <h2 style="margin:0;font-size:1.35rem;font-weight:700;color:#0f172a;">${escapeHtml(topic.title)} Problem Deck (${deck.length} Items)</h2>
            <span style="font-size:0.85rem;color:#64748b;">Commitment required before evaluation · Zero pre-commit leakage</span>
          </div>

          <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,320px),1fr));gap:1rem;">
            ${deck.map(q => `
              <div style="border:1px solid #cbd5e1;border-radius:8px;padding:1.25rem;background:#ffffff;display:flex;flex-direction:column;justify-content:space-between;box-shadow:0 1px 3px rgba(0,0,0,0.05);">
                <div>
                  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
                    <span style="font-size:0.8rem;font-weight:800;color:#0284c7;background:#e0f2fe;padding:2px 8px;border-radius:4px;">${escapeHtml(q.code)}</span>
                    <div style="display:flex;gap:4px;align-items:center;">
                      ${(q as any).sourceProvenance === 'AUTHENTIC_SOURCE_PINNED' ? `<span style="font-size:0.75rem;font-weight:700;color:#047857;background:#d1fae5;padding:2px 6px;border-radius:4px;">Authentic (v3.5)</span>` : ''}
                      ${(q as any).sourceProvenance === 'SYNTHETIC_DIAGNOSTIC_FIXTURE' ? `<span style="font-size:0.75rem;font-weight:700;color:#0369a1;background:#e0f2fe;padding:2px 6px;border-radius:4px;">SYNTHETIC_DIAGNOSTIC_FIXTURE</span>` : ''}
                      <span style="font-size:0.75rem;font-weight:700;color:${q.status === 'RELEASED' ? '#047857' : '#b45309'};background:${q.status === 'RELEASED' ? '#d1fae5' : '#fef3c7'};padding:2px 8px;border-radius:4px;">${escapeHtml(q.status)}</span>
                    </div>
                  </div>
                  <h3 style="margin:0 0 0.5rem;font-size:1.15rem;font-weight:700;color:#0f172a;">${escapeHtml(q.title)}</h3>
                  <p style="margin:0 0 1rem;font-size:0.95rem;color:#475569;line-height:1.4;">${escapeHtml(q.stemText.slice(0, 120))}...</p>
                  <div style="display:flex;gap:6px;font-size:0.8rem;color:#64748b;margin-bottom:1rem;flex-wrap:wrap;">
                    <span style="background:#f1f5f9;padding:2px 6px;border-radius:4px;">Kind: ${escapeHtml(q.kind)}</span>
                    <span style="background:#f1f5f9;padding:2px 6px;border-radius:4px;">Max: ${q.maxPoints ?? 5} pts</span>
                    ${(q as any).figures && (q as any).figures.length ? `<span style="background:#f1f5f9;padding:2px 6px;border-radius:4px;">🖼️ Figure</span>` : ''}
                  </div>
                </div>
                <div style="display:flex;flex-direction:column;gap:8px;">
                  <button type="button" data-action="open-question" data-mode="CORE2" data-qid="${escapeHtml(q.id)}" style="min-height:${HIT_TARGET_MIN_PX}px;padding:8px 14px;background:#0284c7;color:white;border:none;border-radius:6px;cursor:pointer;font-weight:700;font-size:0.95rem;">Launch Question (Core 2) →</button>
                  <div style="display:flex;gap:8px;flex-wrap:wrap;">
                    <button type="button" data-action="open-question" data-mode="CORE2A" data-qid="${escapeHtml(q.id)}" style="flex:1;min-height:${HIT_TARGET_MIN_PX}px;padding:6px 12px;background:#f8fafc;color:#0369a1;border:1px solid #cbd5e1;border-radius:6px;cursor:pointer;font-weight:600;font-size:0.85rem;">Core 2A: Practice</button>
                    <button type="button" data-action="open-question" data-mode="CORE2B" data-qid="${escapeHtml(q.id)}" style="flex:1;min-height:${HIT_TARGET_MIN_PX}px;padding:6px 12px;background:#fdf4ff;color:#7e22ce;border:1px solid #e9d5ff;border-radius:6px;cursor:pointer;font-weight:600;font-size:0.85rem;">Core 2B: Transfer</button>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    } else {
      // Mount Active Question Workspace with Mode Switcher
      container.innerHTML = `
        <div style="margin-bottom:1.25rem;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;">
          <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;">
            <button type="button" id="g9-back-deck-btn" style="min-height:${HIT_TARGET_MIN_PX}px;padding:8px 16px;background:#f8fafc;color:#0f172a;border:1px solid #cbd5e1;border-radius:6px;cursor:pointer;font-weight:600;">← Back to ${escapeHtml(topic.title)} Question Deck</button>
            <div style="display:flex;gap:6px;background:#f1f5f9;padding:4px;border-radius:6px;" role="group" aria-label="Question Mode">
              <button type="button" data-switch-qmode="CORE2" style="min-height:${HIT_TARGET_MIN_PX}px;padding:6px 12px;background:${activeQuestionMode === 'CORE2' ? '#0284c7' : 'transparent'};color:${activeQuestionMode === 'CORE2' ? '#ffffff' : '#0f172a'};border:none;border-radius:4px;cursor:pointer;font-weight:700;font-size:0.85rem;">Core 2: Question</button>
              <button type="button" data-switch-qmode="CORE2A" style="min-height:${HIT_TARGET_MIN_PX}px;padding:6px 12px;background:${activeQuestionMode === 'CORE2A' ? '#0284c7' : 'transparent'};color:${activeQuestionMode === 'CORE2A' ? '#ffffff' : '#0f172a'};border:none;border-radius:4px;cursor:pointer;font-weight:700;font-size:0.85rem;">Core 2A: Supported</button>
              <button type="button" data-switch-qmode="CORE2B" style="min-height:${HIT_TARGET_MIN_PX}px;padding:6px 12px;background:${activeQuestionMode === 'CORE2B' ? '#0284c7' : 'transparent'};color:${activeQuestionMode === 'CORE2B' ? '#ffffff' : '#0f172a'};border:none;border-radius:4px;cursor:pointer;font-weight:700;font-size:0.85rem;">Core 2B: Transfer</button>
            </div>
          </div>
          <span style="font-size:0.85rem;color:#64748b;">Durable Session Bound (IndexedDB)</span>
        </div>
        <div id="g9-question-mount-root"></div>
      `;

      const qRoot = container.querySelector<HTMLElement>('#g9-question-mount-root')!;
      const isMathTopic = topic.subjectCode.toUpperCase() === 'MATHEMATICS' || topic.subjectId.toLowerCase() === 'mathematics';
      const isChemTopic = topic.subjectCode.toUpperCase() === 'CHEMISTRY' || topic.subjectId.toLowerCase() === 'chemistry';

      if (activeQuestionMode === 'CORE2A') {
        const c = new Core2ASupportedPageController({ returnRoute: `#/subject/${topic.subjectCode.toLowerCase()}/topic/${topic.code.toLowerCase()}/questions` });
        const m = mountCore2ASupported(qRoot, c);
        activeSubDisposer = () => m.dispose();
      } else if (activeQuestionMode === 'CORE2B') {
        const c = new Core2BTransferPageController({ returnRoute: `#/subject/${topic.subjectCode.toLowerCase()}/topic/${topic.code.toLowerCase()}/questions` });
        const m = mountCore2BTransfer(qRoot, c);
        activeSubDisposer = () => m.dispose();
      } else {
        const qController = new QuestionPageController(topic.subjectCode.toLowerCase(), topic.code.toLowerCase());
        const qDesc = deck.find(q => q.id === selectedQuestionId) || deck[0];

        if (isMathTopic || isChemTopic) {
          qController.loadQuestion(qDesc);
          const m = mountQuestionPage(qRoot, qController);
          activeSubDisposer = () => m.dispose();
        } else {
          // Authorize question session asynchronously for Physics topics
          void (async () => {
            try {
              const entry = await getAuthorizedPhysicsEntry(selectedQuestionId!);
              const binding = await createAuthorizedQuestionSession(WPE_RELEASE_ID, entry);
              qController.loadQuestion(qDesc, binding);
              const m = mountQuestionPage(qRoot, qController);
              activeSubDisposer = () => m.dispose();
            } catch (e: any) {
              qController.loadQuestion(qDesc);
              const m = mountQuestionPage(qRoot, qController);
              activeSubDisposer = () => m.dispose();
            }
          })();
        }
      }
    }
  };

  // -------------------------------------------------------------------------
  // Tab 2: Learn & Try (Core 1 / 1A / 1B)
  // -------------------------------------------------------------------------
  const mountLearnTryTab = (container: HTMLElement) => {
    const topic = controller.getViewState().topic || WPE_PHYSICS_TOPIC;
    const isMathTopic = topic.subjectCode.toUpperCase() === 'MATHEMATICS' || topic.subjectId.toLowerCase() === 'mathematics';
    const isChemTopic = topic.subjectCode.toUpperCase() === 'CHEMISTRY' || topic.subjectId.toLowerCase() === 'chemistry';

    container.innerHTML = `
      <div class="g9-learn-try-hub">
        <!-- 3-Role Segmented Selector (Learn & Try Family) -->
        <div style="display:flex;gap:8px;margin-bottom:1.5rem;flex-wrap:wrap;" role="tablist" aria-label="Learn & Try Subroles">
          <button type="button" data-subrole="CORE1" style="min-height:${HIT_TARGET_MIN_PX}px;padding:8px 16px;background:${learnTrySubRole === 'CORE1' ? '#0284c7' : '#f8fafc'};color:${learnTrySubRole === 'CORE1' ? '#ffffff' : '#0f172a'};border:1px solid #cbd5e1;border-radius:6px;cursor:pointer;font-weight:700;">1. Core 1: Reading Orientation</button>
          <button type="button" data-subrole="CORE1A" style="min-height:${HIT_TARGET_MIN_PX}px;padding:8px 16px;background:${learnTrySubRole === 'CORE1A' ? '#0284c7' : '#f8fafc'};color:${learnTrySubRole === 'CORE1A' ? '#ffffff' : '#0f172a'};border:1px solid #cbd5e1;border-radius:6px;cursor:pointer;font-weight:700;">2. Core 1A: Concept Construction (9 Units)</button>
          <button type="button" data-subrole="CORE1B" style="min-height:${HIT_TARGET_MIN_PX}px;padding:8px 16px;background:${learnTrySubRole === 'CORE1B' ? '#0284c7' : '#f8fafc'};color:${learnTrySubRole === 'CORE1B' ? '#ffffff' : '#0f172a'};border:1px solid #cbd5e1;border-radius:6px;cursor:pointer;font-weight:700;">3. Core 1B: ${topic.code === 'EUCLID' ? 'Deductive Proof Workspace (A27)' : isChemTopic ? 'Chemical Representation Workspace (A28)' : 'Reconstruction & Stylus Ink Workspace (A26)'}</button>
        </div>

        <div id="g9-learn-try-mount-root"></div>
      </div>
    `;

    const subRoot = container.querySelector<HTMLElement>('#g9-learn-try-mount-root')!;

    if (isMathTopic && topic.code === 'EUCLID' && learnTrySubRole === 'CORE1B') {
      // Mount Euclidean Geometry Proof Workspace (A27)
      const proofController = new ProofWorkspaceController({
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
      });
      const m = mountProofWorkspace(subRoot, proofController, onNavigate);
      activeSubDisposer = () => m.dispose();
    } else if (isChemTopic && learnTrySubRole === 'CORE1B') {
      // Mount Chemical Representation Workspace (A28) inside Core 1B Journey
      const chemController = new ChemicalWorkWorkspaceController({
        archetype: 'CHEM_E2',
        initialStructure: {
          format: 'FORMULA',
          data: topic.code === 'CHEM_REDOX' ? 'CrO5' : topic.code === 'CHEM_BONDING' ? 'SF4' : 'CH3COOH',
          accessibleLabel: '',
        },
        initialEquation: topic.code === 'CHEM_REDOX'
          ? 'Fe2+ + Ce4+ -> Fe3+ + Ce3+'
          : topic.code === 'CHEM_STOICHIOMETRY'
          ? 'CH3COOH + NaOH -> CH3COONa + H2O'
          : 'PCl3 + Cl2 -> PCl5',
      });
      const m = mountChemicalWorkspace(subRoot, chemController, onNavigate);
      activeSubDisposer = () => m.dispose();
    } else if (learnTrySubRole === 'CORE1') {
      const c = new Core1OrientationPageController({ returnRoute: `#/subject/${topic.subjectCode.toLowerCase()}/topic/${topic.code.toLowerCase()}/learn-try` });
      const m = mountCore1Orientation(subRoot, c);
      activeSubDisposer = () => m.dispose();
    } else if (learnTrySubRole === 'CORE1B') {
      subRoot.innerHTML = `
        <div style="display:flex;flex-direction:column;gap:1.5rem;">
          <div id="g9-core1b-transfer-slot"></div>
          <div id="g9-core1b-ink-slot"></div>
        </div>
      `;
      const transferSlot = subRoot.querySelector<HTMLElement>('#g9-core1b-transfer-slot')!;
      const inkSlot = subRoot.querySelector<HTMLElement>('#g9-core1b-ink-slot')!;

      // Mount A26 Stylus Digital Ink Workspace
      const scratchpadCtrl = new ScratchpadController(800, 400);
      const inkMount = mountScratchpadWorkspace(inkSlot, scratchpadCtrl, onNavigate);

      // Mount Core 1B 7-Stage Transfer Journey
      let transferDisposer: (() => void) | null = null;
      void createAuthorizedTransferSession().then(async ({ definition, binding }) => {
        const c = new Core1BTransferPageController({ transferDefinition: definition, binding });
        await c.start();
        const m = mountCore1BTransfer(transferSlot, c);
        transferDisposer = () => m.dispose();
      });

      activeSubDisposer = () => {
        inkMount.dispose();
        if (transferDisposer) transferDisposer();
      };
    } else {
      // Default: Core 1A
      const lessonDef = createDefaultLesson();
      const c = new Core1ALessonPageController({ lessonDefinition: lessonDef });
      const m = mountCore1ALesson(subRoot, c);
      activeSubDisposer = () => m.dispose();
    }
  };

  // -------------------------------------------------------------------------
  // Tab 3: Explorer Simulation
  // -------------------------------------------------------------------------
  const mountExplorerTab = (container: HTMLElement) => {
    const topic = controller.getViewState().topic || WPE_PHYSICS_TOPIC;

    if (topic.code === 'CHEM_REDOX') {
      const c = new RedoxAdaptiveController();
      const m = mountRedoxAdaptive(container, c, onNavigate);
      activeSubDisposer = () => m.dispose();
      return;
    }

    if (topic.code === 'CHEM_STOICHIOMETRY') {
      const c = new TitrationSimulatorController();
      const m = mountTitrationSimulator(container, c, onNavigate);
      activeSubDisposer = () => m.dispose();
      return;
    }

    if (topic.code === 'CHEM_BONDING') {
      const c = new ChemicalWorkWorkspaceController({
        archetype: 'CHEM_E2',
        initialStructure: { format: 'FORMULA', data: 'SF4', accessibleLabel: '' },
        initialEquation: 'PCl3 + Cl2 -> PCl5',
      });
      const m = mountChemicalWorkspace(container, c, onNavigate);
      activeSubDisposer = () => m.dispose();
      return;
    }

    if (topic.code === 'RIEMANN') {
      const pwc = new PortableWorkbenchController(RIEMANN_SUMS_PACKAGE);
      const m = pwc.mount(container);
      activeSubDisposer = () => m.dispose();
      return;
    }

    if (topic.code === 'EUCLID') {
      container.innerHTML = `
        <div class="g9-explorer-hub" style="background:#f8fafc;border:1px solid #cbd5e1;border-radius:8px;padding:1.5rem;">
          <h2 style="margin:0 0 0.5rem;font-size:1.35rem;color:#0f172a;">Euclidean Circle Geometry &amp; Tangent Explorer</h2>
          <p style="margin:0 0 1rem;font-size:0.95rem;color:#64748b;">Interactive coordinate plane visualizing circle tangents, secants, and power of a point.</p>
          <div style="background:#ffffff;border:1px solid #e2e8f0;border-radius:8px;padding:1.25rem;text-align:center;">
            <svg id="euclid-explorer-svg" viewBox="0 0 400 300" style="max-width:100%;height:auto;border:1px solid #e2e8f0;border-radius:6px;background:#f8fafc;" aria-label="Euclidean Circle Diagram">
              <circle cx="200" cy="150" r="80" stroke="#0284c7" stroke-width="3" fill="#e0f2fe" fill-opacity="0.2"/>
              <line x1="50" y1="150" x2="350" y2="150" stroke="#94a3b8" stroke-dasharray="4"/>
              <line x1="200" y1="20" x2="200" y2="280" stroke="#94a3b8" stroke-dasharray="4"/>
              <circle cx="200" cy="150" r="4" fill="#0f172a"/>
              <text x="208" y="145" font-size="14" font-weight="700" fill="#0f172a">O (0,0)</text>
              <line x1="120" y1="150" x2="280" y2="150" stroke="#0f172a" stroke-width="2"/>
              <text x="110" y="170" font-size="14" font-weight="700" fill="#0f172a">A</text>
              <text x="285" y="170" font-size="14" font-weight="700" fill="#0f172a">B</text>
              <!-- Inscribed angle point C -->
              <circle cx="240" cy="80.7" r="4" fill="#dc2626"/>
              <text x="245" y="75" font-size="14" font-weight="700" fill="#dc2626">C</text>
              <line x1="120" y1="150" x2="240" y2="80.7" stroke="#dc2626" stroke-width="1.5"/>
              <line x1="280" y1="150" x2="240" y2="80.7" stroke="#dc2626" stroke-width="1.5"/>
            </svg>
            <div style="margin-top:1rem;color:#334155;font-size:0.95rem;">
              Thales's Theorem Verification: ∠ACB is inscribed in semicircle AB, subtending 180° arc. Measure: <strong>∠ACB = 90.0°</strong>
            </div>
          </div>
        </div>
      `;
      return;
    }

    if (topic.code === 'POLYNOMIALS') {
      const pwc = new PortableWorkbenchController(LONG_DIVISION_PACKAGE);
      const m = pwc.mount(container);
      activeSubDisposer = () => m.dispose();
      return;
    }

    if (topic.code === 'MOTION_PLANE') {
      const c = new MotionPlaneController();
      const m = mountMotionPlane(container, c, onNavigate);
      activeSubDisposer = () => m.dispose();
      return;
    }

    if (topic.code === 'CIRCULAR_BANKING') {
      const pwc = new PortableWorkbenchController(MOTION_SHARED_CLOCK_PACKAGE);
      const m = pwc.mount(container);
      activeSubDisposer = () => m.dispose();
      return;
    }

    if (topic.code === 'GRAVITATION') {
      const m = mountExperimentLab(container, onNavigate);
      activeSubDisposer = () => m.dispose();
      return;
    }

    // Default Physics Explorer (GCDR 10-Stage)
    container.innerHTML = `
      <div class="g9-explorer-hub">
        <div id="g9-explorer-mount-root"></div>
      </div>
    `;
    const subRoot = container.querySelector<HTMLElement>('#g9-explorer-mount-root')!;
    const c = new GcdrExplorerPageController({
      explorerId: 'wpe-explorer-01',
      title: 'Work, Power & Energy — Interactive GCDR Explorer',
      subject: 'Physics',
      topic: 'Work, Power and Energy',
      helpers: {
        exactnessBadge: {
          fidelity: 'NUMERICAL_EXACT',
          binding: 'CANONICAL_BINDING',
          academicClaimDisclaimer: 'PROTECTED_FALSE_CLAIM',
        },
        chalkboardNote: 'Energy conservation principle: ΔE_mech = W_nonconservative',
      },
    });
    const m = mountGcdrExplorer(subRoot, c);
    activeSubDisposer = () => m.dispose();
  };

  // -------------------------------------------------------------------------
  // Tab 4: Standalone Labs
  // -------------------------------------------------------------------------
  const mountLabsTab = (container: HTMLElement) => {
    const topic = controller.getViewState().topic || WPE_PHYSICS_TOPIC;

    if (topic.code === 'CHEM_REDOX') {
      container.innerHTML = `
        <div class="g9-chem-labs-hub" style="margin-bottom:1rem;">
          <div style="display:flex;gap:8px;margin-bottom:1rem;flex-wrap:wrap;" role="tablist">
            <button type="button" id="btn-lab-redox-adaptive" style="min-height:${HIT_TARGET_MIN_PX}px;padding:8px 16px;background:#0284c7;color:white;border:none;border-radius:6px;font-weight:700;cursor:pointer;">Redox Adaptive Hard-Concept (A69 Pilot 2)</button>
            <button type="button" id="btn-lab-redox-portable" style="min-height:${HIT_TARGET_MIN_PX}px;padding:8px 16px;background:#f1f5f9;color:#0f172a;border:1px solid #cbd5e1;border-radius:6px;font-weight:700;cursor:pointer;">Redox Electron Equivalence (Portable)</button>
          </div>
          <div id="g9-chem-lab-subslot"></div>
        </div>
      `;
      const subSlot = container.querySelector<HTMLElement>('#g9-chem-lab-subslot')!;
      let labDisposer: (() => void) | null = null;
      const mountAdaptive = () => {
        if (labDisposer) labDisposer();
        const c = new RedoxAdaptiveController();
        const m = mountRedoxAdaptive(subSlot, c, onNavigate);
        labDisposer = () => m.dispose();
      };
      const mountPortable = () => {
        if (labDisposer) labDisposer();
        const pwc = new PortableWorkbenchController(REDOX_ELECTRON_EQUIVALENCE_PACKAGE);
        const m = pwc.mount(subSlot);
        labDisposer = () => m.dispose();
      };
      container.querySelector('#btn-lab-redox-adaptive')?.addEventListener('click', (e) => {
        (e.target as HTMLElement).style.background = '#0284c7';
        (e.target as HTMLElement).style.color = '#ffffff';
        const pBtn = container.querySelector<HTMLButtonElement>('#btn-lab-redox-portable');
        if (pBtn) { pBtn.style.background = '#f1f5f9'; pBtn.style.color = '#0f172a'; }
        mountAdaptive();
      });
      container.querySelector('#btn-lab-redox-portable')?.addEventListener('click', (e) => {
        (e.target as HTMLElement).style.background = '#0284c7';
        (e.target as HTMLElement).style.color = '#ffffff';
        const aBtn = container.querySelector<HTMLButtonElement>('#btn-lab-redox-adaptive');
        if (aBtn) { aBtn.style.background = '#f1f5f9'; aBtn.style.color = '#0f172a'; }
        mountPortable();
      });
      mountAdaptive();
      activeSubDisposer = () => { if (labDisposer) labDisposer(); };
      return;
    }

    if (topic.code === 'CHEM_STOICHIOMETRY') {
      const c = new TitrationSimulatorController();
      const m = mountTitrationSimulator(container, c, onNavigate);
      activeSubDisposer = () => m.dispose();
      return;
    }

    if (topic.code === 'CHEM_BONDING') {
      const c = new ChemicalWorkWorkspaceController({
        archetype: 'CHEM_E2',
        initialStructure: { format: 'FORMULA', data: 'SF4', accessibleLabel: '' },
      });
      const m = mountChemicalWorkspace(container, c, onNavigate);
      activeSubDisposer = () => m.dispose();
      return;
    }

    if (topic.code === 'EUCLID') {
      const c = new CirclesMasterController();
      const m = mountCirclesMaster(container, c, onNavigate);
      activeSubDisposer = () => m.dispose();
      return;
    }

    if (topic.code === 'RIEMANN') {
      const pwc = new PortableWorkbenchController(RIEMANN_SUMS_PACKAGE);
      const m = pwc.mount(container);
      activeSubDisposer = () => m.dispose();
      return;
    }

    if (topic.code === 'POLYNOMIALS') {
      const pwc = new PortableWorkbenchController(LONG_DIVISION_PACKAGE);
      const m = pwc.mount(container);
      activeSubDisposer = () => m.dispose();
      return;
    }

    if (topic.code === 'MOTION_PLANE') {
      const c = new MotionPlaneController();
      const m = mountMotionPlane(container, c, onNavigate);
      activeSubDisposer = () => m.dispose();
      return;
    }

    if (topic.code === 'CIRCULAR_BANKING') {
      const pwc = new PortableWorkbenchController(MOTION_SHARED_CLOCK_PACKAGE);
      const m = pwc.mount(container);
      activeSubDisposer = () => m.dispose();
      return;
    }

    if (topic.code === 'GRAVITATION') {
      const m = mountExperimentLab(container, onNavigate);
      activeSubDisposer = () => m.dispose();
      return;
    }

    // Physics Harmonic Potential Well
    const adapter = new HarmonicEnergyWellAdapter();
    const result = adapter.evaluate({ x: energyWellDisplacement });

    container.innerHTML = `
      <div class="g9-labs-workbench" style="background:#f8fafc;border:1px solid #cbd5e1;border-radius:8px;padding:1.5rem;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem;flex-wrap:wrap;gap:8px;">
          <div>
            <h2 style="margin:0;font-size:1.35rem;font-weight:700;color:#0f172a;">Harmonic Potential Well Workbench</h2>
            <p style="margin:2px 0 0;font-size:0.95rem;color:#64748b;">Conservative 1D potential well: U(x) = 50 * x² J | Total Mechanical Energy E = 12.5 J</p>
          </div>
          <span style="font-size:0.8rem;font-weight:700;color:#0284c7;background:#e0f2fe;padding:2px 8px;border-radius:4px;">A50 / A54 Model</span>
        </div>

        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,320px),1fr));gap:1.5rem;align-items:start;">
          <!-- Interactive Parameter Controls -->
          <div style="background:#ffffff;border:1px solid #e2e8f0;border-radius:8px;padding:1.25rem;">
            <h3 style="margin:0 0 1rem;font-size:1.1rem;color:#0f172a;">Displacement Parameter (x)</h3>
            <label style="display:block;margin-bottom:8px;font-size:0.95rem;color:#334155;">
              Particle Position: <strong id="g9-well-x-val">${energyWellDisplacement.toFixed(2)} m</strong>
            </label>
            <input type="range" id="g9-well-x-slider" min="-0.5" max="0.5" step="0.01" value="${energyWellDisplacement}" style="width:100%;min-height:${HIT_TARGET_MIN_PX}px;margin-bottom:12px;cursor:pointer;">
            
            <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:8px;">
              <button type="button" id="g9-well-set-left-tp" style="min-height:${HIT_TARGET_MIN_PX}px;padding:6px 12px;background:#f1f5f9;border:1px solid #cbd5e1;border-radius:6px;cursor:pointer;font-size:0.85rem;">Left TP (-0.5m)</button>
              <button type="button" id="g9-well-set-center" style="min-height:${HIT_TARGET_MIN_PX}px;padding:6px 12px;background:#f1f5f9;border:1px solid #cbd5e1;border-radius:6px;cursor:pointer;font-size:0.85rem;">Equilibrium (0.0m)</button>
              <button type="button" id="g9-well-set-right-tp" style="min-height:${HIT_TARGET_MIN_PX}px;padding:6px 12px;background:#f1f5f9;border:1px solid #cbd5e1;border-radius:6px;cursor:pointer;font-size:0.85rem;">Right TP (+0.5m)</button>
            </div>
          </div>

          <!-- Analytical Telemetry Display -->
          <div style="background:#ffffff;border:1px solid #e2e8f0;border-radius:8px;padding:1.25rem;">
            <h3 style="margin:0 0 1rem;font-size:1.1rem;color:#0f172a;">Analytical Energy Telemetry</h3>
            <div style="display:flex;flex-direction:column;gap:10px;">
              <div style="display:flex;justify-content:space-between;padding:8px 12px;background:#f8fafc;border-radius:6px;">
                <span>Potential Energy U(x):</span>
                <strong id="g9-well-u" style="color:#2563eb;">${Number(result.U).toFixed(2)} J</strong>
              </div>
              <div style="display:flex;justify-content:space-between;padding:8px 12px;background:#f8fafc;border-radius:6px;">
                <span>Kinetic Energy K(x):</span>
                <strong id="g9-well-k" style="color:#059669;">${Number(result.K).toFixed(2)} J</strong>
              </div>
              <div style="display:flex;justify-content:space-between;padding:8px 12px;background:#f8fafc;border-radius:6px;">
                <span>Particle Speed v(x):</span>
                <strong id="g9-well-v" style="color:#7c3aed;">${Number(result.v).toFixed(2)} m/s</strong>
              </div>
              <div style="display:flex;justify-content:space-between;padding:8px 12px;background:#f8fafc;border-radius:6px;">
                <span>At Turning Point:</span>
                <strong id="g9-well-tp" style="color:${result.isTurningPoint ? '#dc2626' : '#64748b'};">${result.isTurningPoint ? 'YES (Speed = 0)' : 'NO'}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    const slider = container.querySelector<HTMLInputElement>('#g9-well-x-slider');
    const xVal = container.querySelector<HTMLElement>('#g9-well-x-val');
    const uVal = container.querySelector<HTMLElement>('#g9-well-u');
    const kVal = container.querySelector<HTMLElement>('#g9-well-k');
    const vVal = container.querySelector<HTMLElement>('#g9-well-v');
    const tpVal = container.querySelector<HTMLElement>('#g9-well-tp');

    const updateWell = (newX: number) => {
      energyWellDisplacement = newX;
      if (slider) slider.value = String(newX);
      if (xVal) xVal.textContent = `${newX.toFixed(2)} m`;
      const res = adapter.evaluate({ x: newX });
      if (uVal) uVal.textContent = `${Number(res.U).toFixed(2)} J`;
      if (kVal) kVal.textContent = `${Number(res.K).toFixed(2)} J`;
      if (vVal) vVal.textContent = `${Number(res.v).toFixed(2)} m/s`;
      if (tpVal) {
        tpVal.textContent = res.isTurningPoint ? 'YES (Speed = 0)' : 'NO';
        tpVal.style.color = res.isTurningPoint ? '#dc2626' : '#64748b';
      }
    };

    if (slider) {
      slider.addEventListener('input', () => updateWell(Number(slider.value)));
    }
    container.querySelector('#g9-well-set-left-tp')?.addEventListener('click', () => updateWell(-0.5));
    container.querySelector('#g9-well-set-center')?.addEventListener('click', () => updateWell(0.0));
    container.querySelector('#g9-well-set-right-tp')?.addEventListener('click', () => updateWell(0.5));
  };

  // Global click delegator
  const handleClick = (e: MouseEvent) => {
    const target = e.target as HTMLElement | null;
    if (!target || !active) return;

    const topic = controller.getViewState().topic || WPE_PHYSICS_TOPIC;
    const isMathTopic = topic.subjectCode.toUpperCase() === 'MATHEMATICS' || topic.subjectId.toLowerCase() === 'mathematics';
    const isChemTopic = topic.subjectCode.toUpperCase() === 'CHEMISTRY' || topic.subjectId.toLowerCase() === 'chemistry';
    const subjRoute = isChemTopic ? '#/subject/chemistry' : isMathTopic ? '#/subject/mathematics' : '#/subject/physics';

    // Tab Bar click (scoped to main topic tabs bar)
    const tabBtn = target.closest<HTMLButtonElement>('.g9-topic-tabs-bar [data-tab]');
    if (tabBtn && tabBtn.dataset.tab) {
      const tab = tabBtn.dataset.tab;
      selectedQuestionId = null; // Return to deck on tab change
      const dest = `/subject/${topic.subjectCode.toLowerCase()}/topic/${topic.code.toLowerCase()}/${tab}`;
      if (onNavigate) {
        onNavigate(dest);
      } else {
        window.location.hash = '#' + dest;
      }
      return;
    }

    // Launch Question Workspace
    const openQBtn = target.closest<HTMLButtonElement>('[data-action=open-question]');
    if (openQBtn && openQBtn.dataset.qid) {
      selectedQuestionId = openQBtn.dataset.qid;
      activeQuestionMode = (openQBtn.dataset.mode as any) || 'CORE2';
      renderShell();
      return;
    }

    // Switch Question Workspace Mode (CORE2 / CORE2A / CORE2B)
    const switchModeBtn = target.closest<HTMLButtonElement>('[data-switch-qmode]');
    if (switchModeBtn && switchModeBtn.dataset.switchQmode) {
      activeQuestionMode = switchModeBtn.dataset.switchQmode as any;
      renderShell();
      return;
    }

    // Back to Question Deck
    if (target.id === 'g9-back-deck-btn') {
      selectedQuestionId = null;
      renderShell();
      return;
    }

    // Return to Subject
    if (target.id === 'g9-return-subject-btn') {
      if (onNavigate) {
        onNavigate(subjRoute.slice(1));
      } else {
        window.location.hash = subjRoute;
      }
      return;
    }

    // Sub-role selection in Learn & Try
    const subBtn = target.closest<HTMLButtonElement>('[data-subrole]');
    if (subBtn && subBtn.dataset.subrole) {
      learnTrySubRole = subBtn.dataset.subrole as any;
      renderShell();
      return;
    }
  };

  root.addEventListener('click', handleClick);
  renderShell();

  return {
    refresh: () => renderShell(),
    dispose() {
      if (!active) return;
      active = false;
      cleanupSub();
      root.removeEventListener('click', handleClick);
      root.replaceChildren();
    },
  };
}
