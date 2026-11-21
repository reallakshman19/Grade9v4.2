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
import { escapeHtml, renderMathHtml } from '../runtime/rendering.ts';
import { HIT_TARGET_MIN_PX, HIT_TARGET_PRIMARY_PX } from '../styles/tokens.ts';
import { QuestionPageController, mountQuestionPage } from './question.ts';
import { Core1ALessonPageController, mountCore1ALesson, createDefaultLesson } from './lesson.ts';
import { Core1BTransferPageController, mountCore1BTransfer, createDefaultTransferDefinition } from './transfer.ts';
import { Core1OrientationPageController, mountCore1Orientation } from './orientation.ts';
import { Core2ASupportedPageController, mountCore2ASupported } from './supported-practice.ts';
import { Core2BTransferPageController, mountCore2BTransfer } from './transfer-changed-demand.ts';
import { GcdrExplorerPageController, mountGcdrExplorer } from './explorer.ts';
import { WPE_DIAGNOSTIC_DECK, PHYSICS_DIAGNOSTIC_DECK, getAuthorizedWpeEntry, getAuthorizedPhysicsEntry, WPE_RELEASE_ID, WPE_FULL_QUESTION_BANK } from '../runtime/wpe-deck.ts';
import { WpeCognitiveJourneyController, mountWpeCognitiveJourney, WPE_COGNITIVE_JOURNEYS } from '../journeys/wpe-cognitive-journeys.ts';
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
import { mountGasLawsWorkbench } from './workbenches/gas-laws.ts';
import { mountChemicalBondingWorkbench } from './workbenches/chemical-bonding.ts';
import { LinearCoordinatesController, mountLinearCoordinatesWorkbench } from './workbenches/linear-coordinates.ts';
import { VectorAlgebraController, mountVectorAlgebraWorkbench } from './workbenches/vector-algebra.ts';
import { ImoMasterController, mountImoMaster } from './imo-master.ts';
import { UNIFIED_QUESTION_DATABASE } from '../runtime/unified-question-database.ts';
import {
  mountWpeFoundationLesson,
  mountWpePracticeChallenge,
  mountWpeThinkingSkillsRunner,
  mountWpePh04CurricularUnits,
  mountWpeLearningPacksViewer
} from './wpe-pilot-components.ts';

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

export const MATH_COORD_GEOM_DECK = [
  {
    id: 'coord-01',
    code: 'COG-01',
    title: 'Distance between Points in Cartesian Plane',
    kind: 'INTEGER' as const,
    keyStatus: 'VERIFIED' as const,
    maxPoints: 3,
    status: 'RELEASED' as const,
    stemText: 'Find the Euclidean distance between points P(3, -2) and Q(-1, 1) in the 2D Cartesian plane.',
    explanationHtml: 'By the Euclidean distance formula: d = √[(3 - (-1))² + (-2 - 1)²] = √[4² + (-3)²] = √[16 + 9] = √25 = 5.',
  },
  {
    id: 'coord-02',
    code: 'COG-02',
    title: 'Quadrant Classification & Origin Telemetry',
    kind: 'INTEGER' as const,
    keyStatus: 'VERIFIED' as const,
    maxPoints: 3,
    status: 'RELEASED' as const,
    stemText: 'A point P in Quadrant II has coordinates (-7, 24). Determine its Euclidean distance from the origin (0, 0).',
    explanationHtml: 'Radius r = √[(-7)² + 24²] = √[49 + 576] = √625 = 25.',
  },
  {
    id: 'coord-03',
    code: 'COG-03',
    title: 'Collinearity Condition in Coordinate Geometry',
    kind: 'INTEGER' as const,
    keyStatus: 'VERIFIED' as const,
    maxPoints: 4,
    status: 'RELEASED' as const,
    stemText: 'For what value of k are the Cartesian points A(1, 2), B(3, 4), and C(5, k) collinear?',
    explanationHtml: 'Slope m_AB = (4 - 2)/(3 - 1) = 1. For collinearity, m_BC = (k - 4)/(5 - 3) = 1 ⇒ k - 4 = 2 ⇒ k = 6.',
  },
  {
    id: 'coord-04',
    code: 'COG-04',
    title: 'Midpoint Invariance & Diagonal Properties',
    kind: 'INTEGER' as const,
    keyStatus: 'VERIFIED' as const,
    maxPoints: 5,
    status: 'RELEASED' as const,
    stemText: 'If the midpoints of sides AB and AC of triangle ABC are (2, 3) and (4, 7), evaluate the squared length of side BC (value of BC²).',
    explanationHtml: 'By the Midpoint Theorem, BC = 2 × distance between midpoints = 2 × √[(4 - 2)² + (7 - 3)²] = 2 × √[4 + 16] = 2√20. BC² = 4 × 20 = 80.',
  },
];

export const MATH_THEORY_EQUATIONS_DECK = [
  {
    id: 'eq-01',
    code: 'THQ-01',
    title: 'Cubic Identity under Zero Sum Condition',
    kind: 'INTEGER' as const,
    keyStatus: 'VERIFIED' as const,
    maxPoints: 3,
    status: 'RELEASED' as const,
    stemText: 'If a + b + c = 0 with a = 3, b = -5, c = 2, evaluate the algebraic expression a³ + b³ + c³ - 3abc.',
    explanationHtml: 'The identity a³ + b³ + c³ - 3abc = (a + b + c)(a² + b² + c² - ab - bc - ca). When a + b + c = 0, the product vanishes identically to 0.',
  },
  {
    id: 'eq-02',
    code: 'THQ-02',
    title: 'Synthetic Division Remainder Invariant',
    kind: 'INTEGER' as const,
    keyStatus: 'VERIFIED' as const,
    maxPoints: 3,
    status: 'RELEASED' as const,
    stemText: 'Find the remainder when P(x) = 3x³ - 5x² + 2x - 8 is divided by (x - 2).',
    explanationHtml: 'By the Remainder Theorem: R = P(2) = 3(8) - 5(4) + 2(2) - 8 = 24 - 20 + 4 - 8 = 0.',
  },
  {
    id: 'eq-03',
    code: 'THQ-03',
    title: 'Quadratic Discriminant & Equal Roots',
    kind: 'INTEGER' as const,
    keyStatus: 'VERIFIED' as const,
    maxPoints: 4,
    status: 'RELEASED' as const,
    stemText: 'Find the value of k for which the quadratic equation x² - 2(k + 1)x + (k² + 3) = 0 has two equal real roots.',
    explanationHtml: 'For equal roots, Δ = 0 ⇒ 4(k + 1)² - 4(k² + 3) = 0 ⇒ k² + 2k + 1 - k² - 3 = 0 ⇒ 2k = 2 ⇒ k = 1.',
  },
  {
    id: 'eq-04',
    code: 'THQ-04',
    title: 'Sum of Cubes of Quadratic Roots',
    kind: 'INTEGER' as const,
    keyStatus: 'VERIFIED' as const,
    maxPoints: 5,
    status: 'RELEASED' as const,
    stemText: 'Let α and β be roots of the quadratic equation x² - 4x + 1 = 0. Evaluate the value of α³ + β³.',
    explanationHtml: 'By Vieta: α + β = 4, αβ = 1. Identity: α³ + β³ = (α + β)³ - 3αβ(α + β) = 4³ - 3(1)(4) = 64 - 12 = 52.',
  },
];

export const MATH_VECTORS_DECK = [
  {
    id: 'vec-01',
    code: 'VEC-01',
    title: 'Scalar Dot Product of 3D Vectors',
    kind: 'INTEGER' as const,
    keyStatus: 'VERIFIED' as const,
    maxPoints: 3,
    status: 'RELEASED' as const,
    stemText: 'Given vectors a = 2i + 3j - k and b = i - j + 2k, evaluate the absolute value |a · b|.',
    explanationHtml: 'a · b = (2)(1) + (3)(-1) + (-1)(2) = 2 - 3 - 2 = -3. Absolute value |a · b| = 3.',
  },
  {
    id: 'vec-02',
    code: 'VEC-02',
    title: 'Cross Product Area of Parallelogram',
    kind: 'INTEGER' as const,
    keyStatus: 'VERIFIED' as const,
    maxPoints: 4,
    status: 'RELEASED' as const,
    stemText: 'Find the squared magnitude |a × b|² for adjacent edge vectors a = 3i + j - 2k and b = i - 3j + 4k.',
    explanationHtml: 'a × b = -2i - 14j - 10k. Magnitude squared: |a × b|² = (-2)² + (-14)² + (-10)² = 4 + 196 + 100 = 300.',
  },
  {
    id: 'vec-03',
    code: 'VEC-03',
    title: 'Gram-Schmidt Scalar Projection',
    kind: 'INTEGER' as const,
    keyStatus: 'VERIFIED' as const,
    maxPoints: 4,
    status: 'RELEASED' as const,
    stemText: 'Let vector a = 3i + 4j and unit vector b = i. Compute the scalar projection of a onto b.',
    explanationHtml: 'Scalar projection = (a · b)/|b| = (3·1 + 4·0)/1 = 3.',
  },
  {
    id: 'vec-04',
    code: 'VEC-04',
    title: 'Volume of Parallelepiped via Scalar Triple Product',
    kind: 'INTEGER' as const,
    keyStatus: 'VERIFIED' as const,
    maxPoints: 5,
    status: 'RELEASED' as const,
    stemText: 'Find the volume of the parallelepiped with coterminous edges a = 2i - 3j + 4k, b = i + 2j - k, and c = 3i - j + 2k.',
    explanationHtml: 'V = |[a b c]| = |det([[2, -3, 4], [1, 2, -1], [3, -1, 2]])| = |2(3) - (-3)(5) + 4(-7)| = |6 + 15 - 28| = |-7| = 7 cubic units.',
  },
];

export const MATH_LINEAR_EQ_DECK = [
  {
    id: 'lineq-01',
    code: 'LEQ-01',
    title: 'Infinite Solutions Consistency Criterion',
    kind: 'INTEGER' as const,
    keyStatus: 'VERIFIED' as const,
    maxPoints: 3,
    status: 'RELEASED' as const,
    stemText: 'For what value of k will the 2-variable system 2x + ky = 1 and 4x + 6y = 2 have infinitely many solutions?',
    explanationHtml: 'For coincident lines, a₁/a₂ = b₁/b₂ = c₁/c₂ ⇒ 2/4 = k/6 = 1/2 ⇒ k = 3.',
  },
  {
    id: 'lineq-02',
    code: 'LEQ-02',
    title: 'Intersection Point Abscissa',
    kind: 'INTEGER' as const,
    keyStatus: 'VERIFIED' as const,
    maxPoints: 3,
    status: 'RELEASED' as const,
    stemText: 'Find the x-coordinate (abscissa) of the intersection point of lines 3x + 2y = 12 and x - y = 4.',
    explanationHtml: 'From second equation, y = x - 4. Substituting: 3x + 2(x - 4) = 12 ⇒ 5x - 8 = 12 ⇒ 5x = 20 ⇒ x = 4.',
  },
  {
    id: 'lineq-03',
    code: 'LEQ-03',
    title: 'Perimeter and Area Linear Constraint',
    kind: 'INTEGER' as const,
    keyStatus: 'VERIFIED' as const,
    maxPoints: 4,
    status: 'RELEASED' as const,
    stemText: 'The length of a rectangle exceeds twice its breadth by 3 cm. If its perimeter is 36 cm, find its area in square cm.',
    explanationHtml: 'Let breadth be b, length l = 2b + 3. Perimeter 2(l + b) = 36 ⇒ 3b + 3 = 18 ⇒ 3b = 15 ⇒ b = 5, l = 13. Area = 13 × 5 = 65.',
  },
  {
    id: 'lineq-04',
    code: 'LEQ-04',
    title: 'Coincident Line Parameter',
    kind: 'INTEGER' as const,
    keyStatus: 'VERIFIED' as const,
    maxPoints: 5,
    status: 'RELEASED' as const,
    stemText: 'If the linear equations 3x - 5y = 7 and kx - 10y = 14 represent the same straight line, find the value of k.',
    explanationHtml: 'Ratio condition: 3/k = (-5)/(-10) = 7/14 = 1/2 ⇒ k = 6.',
  },
];

export const MATH_IMO_GRADE9_DECK = [
  {
    id: 'imo-g9-01',
    code: 'IMO-G9-01',
    title: 'Three-step number chain',
    kind: 'EXPLANATION_REQUIRED' as const,
    keyStatus: 'VERIFIED' as const,
    maxPoints: 5,
    status: 'RELEASED' as const,
    sourceProvenance: 'AUTHENTIC_SOURCE_PINNED' as const,
    sourceRef: 'SOF-IMO-G09-ORIGINAL-PRACTICE-001',
    stemText: 'A student claims that multiplying any three consecutive positive integers always gives a multiple of 6. Prove or disprove the claim for every positive starting integer n, without checking only sample values.',
    explanationHtml: 'Among any three consecutive integers n, n+1, n+2, at least one is divisible by 2 and exactly one is divisible by 3. Since gcd(2,3)=1, their product n(n+1)(n+2) is always divisible by 2 x 3 = 6.',
  },
  {
    id: 'imo-g9-02',
    code: 'IMO-G9-02',
    title: 'Compass notes to coordinates',
    kind: 'INTEGER' as const,
    keyStatus: 'VERIFIED' as const,
    maxPoints: 4,
    status: 'RELEASED' as const,
    sourceProvenance: 'AUTHENTIC_SOURCE_PINNED' as const,
    sourceRef: 'SOF-IMO-G09-ORIGINAL-PRACTICE-002',
    stemText: 'On a map, east is the positive x-direction and north is the positive y-direction. A location is described as 4 kilometres west and 3 kilometres north of the origin. Express its distance from the origin in kilometres.',
    explanationHtml: 'The ordered pair is (-4, 3). The Euclidean distance from origin is sqrt((-4)^2 + 3^2) = sqrt(16 + 9) = sqrt(25) = 5 km.',
  },
  {
    id: 'imo-g9-03',
    code: 'IMO-G9-03',
    title: 'Two movable triangle peaks',
    kind: 'INTEGER' as const,
    keyStatus: 'VERIFIED' as const,
    maxPoints: 4,
    status: 'RELEASED' as const,
    sourceProvenance: 'AUTHENTIC_SOURCE_PINNED' as const,
    sourceRef: 'SOF-IMO-G09-ORIGINAL-PRACTICE-003',
    stemText: 'Triangles ABC and ABD share a 12 cm base AB. The perpendicular distance from C to line AB is 7 cm, and the perpendicular distance from D to that line is also 7 cm. What is the area of triangle ABC in square centimetres?',
    explanationHtml: 'Area of a triangle = (1/2) * base * height = (1/2) * 12 cm * 7 cm = 42 cm^2. Both triangles have the exact same area because they share the same base and height between parallel lines.',
  },
  {
    id: 'imo-g9-04',
    code: 'IMO-G9-04',
    title: 'Ribbon around a cylindrical drum',
    kind: 'INTEGER' as const,
    keyStatus: 'VERIFIED' as const,
    maxPoints: 4,
    status: 'RELEASED' as const,
    sourceProvenance: 'AUTHENTIC_SOURCE_PINNED' as const,
    sourceRef: 'SOF-IMO-G09-ORIGINAL-PRACTICE-004',
    stemText: 'A cylindrical festival drum has radius 7 cm and height 20 cm. A decorator covers only the curved side of the drum with one layer of sheet material, leaving both circular ends uncovered. Using pi=22/7, calculate the required sheet area in square centimetres.',
    explanationHtml: 'Curved surface area CSA = 2 * pi * r * h = 2 * (22/7) * 7 * 20 = 2 * 22 * 20 = 880 cm^2.',
  },
  {
    id: 'imo-g9-05',
    code: 'IMO-G9-05',
    title: 'A decreasing data table',
    kind: 'INTEGER' as const,
    keyStatus: 'VERIFIED' as const,
    maxPoints: 4,
    status: 'RELEASED' as const,
    sourceProvenance: 'AUTHENTIC_SOURCE_PINNED' as const,
    sourceRef: 'SOF-IMO-G09-ORIGINAL-PRACTICE-005',
    stemText: 'A relation is recorded by four paired measurements: when x is -2, 0, 2, 4, the corresponding y-values are 9, 5, 1, -3. Express the pattern as y = mx + c, then find x when y = -9.',
    explanationHtml: 'Slope m = (5 - 9)/(0 - (-2)) = -4/2 = -2. Intercept c = 5 when x = 0, so y = -2x + 5. When y = -9: -9 = -2x + 5 => -14 = -2x => x = 7.',
  },
  {
    id: 'imo-g9-06',
    code: 'IMO-G9-06',
    title: 'Booklet and poster printing costs',
    kind: 'INTEGER' as const,
    keyStatus: 'VERIFIED' as const,
    maxPoints: 4,
    status: 'RELEASED' as const,
    sourceProvenance: 'AUTHENTIC_SOURCE_PINNED' as const,
    sourceRef: 'SOF-IMO-G09-ORIGINAL-PRACTICE-006',
    stemText: 'At a student-run print shop, 4 bound booklets and 3 poster cards cost 159 rupees. A different order of 2 bound booklets and 5 poster cards costs 181 rupees. Find the cost of an order containing 3 booklets and 2 poster cards in rupees.',
    explanationHtml: 'Let b = booklet cost, p = poster cost. 4b + 3p = 159; 2b + 5p = 181 => 4b + 10p = 362. Subtracting gives 7p = 203 => p = 29. 2b = 181 - 5(29) = 181 - 145 = 36 => b = 18. Cost of 3 booklets and 2 posters = 3(18) + 2(29) = 54 + 58 = 112 rupees.',
  },
  {
    id: 'imo-g9-07',
    code: 'IMO-G9-07',
    title: 'Reflect and move a triangle',
    kind: 'INTEGER' as const,
    keyStatus: 'VERIFIED' as const,
    maxPoints: 4,
    status: 'RELEASED' as const,
    sourceProvenance: 'AUTHENTIC_SOURCE_PINNED' as const,
    sourceRef: 'SOF-IMO-G09-ORIGINAL-PRACTICE-007',
    stemText: 'Triangle PQR has vertices P=(-2,1), Q=(3,1), and R=(0,4). Reflect it across the y-axis, then translate every reflected point 4 units right and 2 units down. What is the area of the transformed triangle in square units?',
    explanationHtml: 'Rigid motions (reflection and translation) are isometries and strictly preserve area. Base PQ lies on y=1 from x=-2 to x=3, so length = 5. Height from R(0,4) to y=1 is 3. Area = (1/2) * 5 * 3 = 7.5. The area is invariant under reflection and translation.',
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
  verifiedQuestionCount: 78,
  interactiveModelCount: 5,
  resourceCount: 21,
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

export const PHY_FLUIDS_TOPIC: TopicDetail = {
  id: 'fluids',
  code: 'FLUIDS',
  title: 'Thrust & Hydrostatic Pressure',
  subjectId: 'physics',
  subjectCode: 'PHYSICS',
  strand: 'Fluid Mechanics',
  status: 'AVAILABLE',
  verifiedQuestionCount: 4,
  interactiveModelCount: 2,
  resourceCount: 6,
  description: 'Hydrostatic pressure, Pascal hydraulic multiplier, atmospheric pressure, and Archimedes buoyancy principle.',
};

export const PHY_MOTION_1D_TOPIC: TopicDetail = {
  id: 'motion-1d',
  code: 'MOTION_1D',
  title: 'Motion in One Dimension',
  subjectId: 'physics',
  subjectCode: 'PHYSICS',
  strand: 'Kinematics',
  status: 'AVAILABLE',
  verifiedQuestionCount: 4,
  interactiveModelCount: 3,
  resourceCount: 8,
  description: 'Rectilinear kinematics under uniform and varying acceleration, free-fall under gravity, and area integrals.',
};

export const PHY_NLM_TOPIC: TopicDetail = {
  id: 'nlm',
  code: 'NLM',
  title: "Newton's Laws of Motion",
  subjectId: 'physics',
  subjectCode: 'PHYSICS',
  strand: 'Dynamics',
  status: 'AVAILABLE',
  verifiedQuestionCount: 4,
  interactiveModelCount: 3,
  resourceCount: 8,
  description: "Inertial reference frames, momentum transfer, connected body dynamics, Atwood pulleys, and friction thresholds.",
};

export const PHY_VECTORS_TOPIC: TopicDetail = {
  id: 'vectors',
  code: 'VECTORS',
  title: 'Vector Methods in Physics',
  subjectId: 'physics',
  subjectCode: 'PHYSICS',
  strand: 'Mathematical Physics',
  status: 'AVAILABLE',
  verifiedQuestionCount: 4,
  interactiveModelCount: 2,
  resourceCount: 6,
  description: 'Vector addition, head-to-tail resolution, dot and cross products, orthogonal Cartesian decomposition, and 3D projections.',
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

export const MATH_COORD_GEOM_TOPIC: TopicDetail = {
  id: 'coordinate-geometry',
  code: 'COORD_GEOM',
  title: 'Coordinate Geometry & Cartesian Plane',
  subjectId: 'mathematics',
  subjectCode: 'MATHEMATICS',
  strand: 'Geometry',
  status: 'AVAILABLE',
  verifiedQuestionCount: 4,
  interactiveModelCount: 2,
  resourceCount: 6,
  description: 'Cartesian coordinates, orthogonal projections, quadrants, distance formula, collinearity, and 2D linear systems.',
};

export const MATH_THEORY_EQUATIONS_TOPIC: TopicDetail = {
  id: 'theory-of-equations',
  code: 'THEORY_EQUATIONS',
  title: 'Theory of Equations & Roots',
  subjectId: 'mathematics',
  subjectCode: 'MATHEMATICS',
  strand: 'Algebra',
  status: 'AVAILABLE',
  verifiedQuestionCount: 4,
  interactiveModelCount: 2,
  resourceCount: 6,
  description: 'Polynomial roots, Vieta relations, remainder theorem, synthetic division, and cubic symmetric identities.',
};

export const MATH_VECTORS_TOPIC: TopicDetail = {
  id: 'vectors',
  code: 'VECTORS',
  title: 'Mathematical Vectors & Spatial Geometry',
  subjectId: 'mathematics',
  subjectCode: 'MATHEMATICS',
  strand: 'Geometry',
  status: 'AVAILABLE',
  verifiedQuestionCount: 4,
  interactiveModelCount: 3,
  resourceCount: 8,
  description: 'Cartesian vectors in 3D, dot and cross products, Gram-Schmidt orthogonal projections, and JEE Main geometry problems.',
};

export const MATH_LINEAR_EQ_TOPIC: TopicDetail = {
  id: 'linear-equations',
  code: 'LINEAR_EQ',
  title: 'Linear Equations in Two Variables',
  subjectId: 'mathematics',
  subjectCode: 'MATHEMATICS',
  strand: 'Algebra',
  status: 'AVAILABLE',
  verifiedQuestionCount: 4,
  interactiveModelCount: 2,
  resourceCount: 6,
  description: 'Linear equations in two variables, graphical intersection solutions, consistency criteria, and perimeter/area constraints.',
};

export const MATH_IMO_GRADE9_TOPIC: TopicDetail = {
  id: 'imo-grade9',
  code: 'IMO_GRADE9',
  title: 'IMO Grade 9 · Questions by Topic',
  subjectId: 'mathematics',
  subjectCode: 'MATHEMATICS',
  strand: 'Olympiad Mathematics',
  status: 'AVAILABLE',
  verifiedQuestionCount: 75,
  interactiveModelCount: 4,
  resourceCount: 15,
  description: 'Browse 68 original-paper question references across 15 strands by topic, plus 7 fully written AI-authored draft practice questions.',
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

export const CHEM_GASES_TOPIC: TopicDetail = {
  id: 'chem-gases',
  code: 'CHEM_GASES',
  title: 'Behaviour of Gases & Real Gases',
  subjectId: 'chemistry',
  subjectCode: 'CHEMISTRY',
  strand: 'Physical Chemistry',
  status: 'AVAILABLE',
  verifiedQuestionCount: 4,
  interactiveModelCount: 2,
  resourceCount: 6,
  description: 'Kinetic theory of gases, Maxwell-Boltzmann distributions, van der Waals excluded volume, compressibility Z, and Andrews isotherms.',
};

export const BIO_LIVING_WORLD_TOPIC: TopicDetail = {
  id: 'living_world',
  code: 'LIVING_WORLD',
  title: 'Cell Biology & Molecular Genetics',
  subjectId: 'biology',
  subjectCode: 'BIOLOGY',
  strand: 'Cell & Molecular Biology',
  status: 'AVAILABLE',
  verifiedQuestionCount: 36,
  interactiveModelCount: 2,
  resourceCount: 4,
  description: 'Endomembrane systems, mitochondria, nucleic acid architecture, central dogma of molecular genetics, viral capsids, envelope glycoproteins, and Baltimore replication schemes.',
};

export const BIO_LIFE_PROCESSES_TOPIC: TopicDetail = {
  id: 'life_processes',
  code: 'LIFE_PROCESSES',
  title: 'Life Processes & Nephron Physiology',
  subjectId: 'biology',
  subjectCode: 'BIOLOGY',
  strand: 'Human Physiology',
  status: 'AVAILABLE',
  verifiedQuestionCount: 25,
  interactiveModelCount: 2,
  resourceCount: 4,
  description: 'C3/C4 photosynthesis pathways, cellular respiration (glycolysis, Krebs), xylem/phloem vascular transport, human cardiac cycles, and nephron counter-current exchange excretion.',
};

export const BIO_COORDINATION_TOPIC: TopicDetail = {
  id: 'coordination',
  code: 'COORDINATION',
  title: 'Control & Endocrine Coordination / Immunology',
  subjectId: 'biology',
  subjectCode: 'BIOLOGY',
  strand: 'Systems & Regulation',
  status: 'AVAILABLE',
  verifiedQuestionCount: 15,
  interactiveModelCount: 2,
  resourceCount: 4,
  description: 'Action potentials, synaptic transmission, reflex arcs, plant phytohormones (auxin, gibberellin, ABA), pituitary-hypothalamic endocrine feedback, and vertebrate immune defense.',
};

export const BIO_GENETICS_TOPIC: TopicDetail = {
  id: 'genetics',
  code: 'GENETICS',
  title: 'Reproduction & Mendelian Heredity',
  subjectId: 'biology',
  subjectCode: 'BIOLOGY',
  strand: 'Genetics & Evolution',
  status: 'AVAILABLE',
  verifiedQuestionCount: 23,
  interactiveModelCount: 2,
  resourceCount: 4,
  description: 'Mitosis, meiosis, Mendel\'s monohybrid/dihybrid ratios, law of segregation, sex determination, sex-linked recessive traits, and pedigree charting.',
};

export const BIO_ENVIRONMENT_TOPIC: TopicDetail = {
  id: 'environment',
  code: 'ENVIRONMENT',
  title: 'Ecology & Ecosystem Resources',
  subjectId: 'biology',
  subjectCode: 'BIOLOGY',
  strand: 'Ecology & Environment',
  status: 'AVAILABLE',
  verifiedQuestionCount: 20,
  interactiveModelCount: 2,
  resourceCount: 4,
  description: 'Food chains, 10% ecological efficiency, inverted marine biomass pyramids, biomagnification, biogeochemical carbon/nitrogen cycles, and biodiversity conservation.',
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
      explorerRoute: `/explorer?topic=${topicCode}`,
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

function getFluidsStudyHtml(): string {
  return `
    <div style="background:#ffffff;border:1px solid #cbd5e1;border-radius:12px;padding:1.5rem;box-shadow:0 1px 3px rgba(0,0,0,0.05);">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:12px;margin-bottom:1.25rem;border-bottom:1px solid #e2e8f0;padding-bottom:1rem;">
        <div>
          <div style="display:flex;gap:6px;margin-bottom:6px;">
            <span style="font-size:0.8rem;font-weight:800;background:#e0f2fe;color:#0369a1;padding:2px 8px;border-radius:4px;">CORE 1A THEORY</span>
            <span style="font-size:0.8rem;font-weight:800;background:#dcfce7;color:#166534;padding:2px 8px;border-radius:4px;">6 CONCEPT UNITS</span>
          </div>
          <h2 style="margin:0 0 0.25rem;font-size:1.45rem;font-weight:800;color:#0f172a;">🌊 Thrust &amp; Hydrostatic Pressure Study Guide</h2>
          <p style="color:#64748b;margin:0;font-size:0.95rem;">Rigorous mathematical derivations, normal equilibrium conditions, pressure scaling, and fluid statics.</p>
        </div>
        <div style="display:flex;gap:8px;flex-wrap:wrap;">
          <a href="./physics/fluids/index.html" style="min-height:${HIT_TARGET_MIN_PX}px;padding:8px 16px;background:#0284c7;color:white;text-decoration:none;border-radius:6px;font-weight:700;display:inline-flex;align-items:center;">⚡ Full Workspace App →</a>
          <a href="./standalone/practice/core1a-physics-thrust-pressure-tablet.html" style="min-height:${HIT_TARGET_MIN_PX}px;padding:8px 16px;background:#0f172a;color:#38bdf8;text-decoration:none;border:1px solid #38bdf8;border-radius:6px;font-weight:700;display:inline-flex;align-items:center;">📖 Fullscreen Tablet App →</a>
        </div>
      </div>

      <!-- Unit 1 -->
      <div style="border:1px solid #e2e8f0;border-radius:8px;padding:1.2rem;margin-bottom:1rem;background:#f8fafc;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
          <span style="font-size:0.8rem;font-weight:800;color:#0284c7;">UNIT 1 · INTERFACE CONTACT</span>
          <code style="font-size:0.9rem;background:#e0f2fe;color:#0369a1;padding:2px 6px;border-radius:4px;">R = √(N² + f²)</code>
        </div>
        <h3 style="margin:0 0 6px;font-size:1.15rem;font-weight:700;color:#0f172a;">Thrust Belongs to a Chosen Interface, Not an Isolated Force Arrow</h3>
        <p style="margin:0 0 8px;color:#475569;font-size:0.92rem;line-height:1.5;">
          Thrust at a solid contact is strictly the <strong>normal (perpendicular) component N</strong> of the contact reaction. When the surface is rough, it simultaneously exerts a tangential friction component f. The vector resultant <strong>R = √(N² + f²)</strong> is the total contact force, not the thrust alone.
        </p>
        <div style="background:#eff6ff;border-left:3px solid #3b82f6;padding:8px 12px;border-radius:0 6px 6px 0;font-size:0.88rem;color:#1e3a8a;">
          <strong>Anchor Problem (INJSO 2016 Q32A):</strong> Boxes P (4kg) and Q (8kg) pushed at constant speed on rough table. Normal thrust on Q: N_Q = 80 N; friction f_Q = 48 N; total table reaction R_Q = √(80² + 48²) = 93.3 N at 59.0° above horizontal.
        </div>
      </div>

      <!-- Unit 2 -->
      <div style="border:1px solid #e2e8f0;border-radius:8px;padding:1.2rem;margin-bottom:1rem;background:#f8fafc;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
          <span style="font-size:0.8rem;font-weight:800;color:#0284c7;">UNIT 2 · DYNAMICS</span>
          <code style="font-size:0.9rem;background:#e0f2fe;color:#0369a1;padding:2px 6px;border-radius:4px;">ΣF⊥ = m·a⊥ ⇒ N = mg - F·sinθ</code>
        </div>
        <h3 style="margin:0 0 6px;font-size:1.15rem;font-weight:700;color:#0f172a;">N = mg is a Conditional Result, Not the Definition of Thrust</h3>
        <p style="margin:0 0 8px;color:#475569;font-size:0.92rem;line-height:1.5;">
          Normal force is an adjustable constraint force derived from the complete perpendicular balance equation. For a body subject to an upward oblique pull F at angle θ: <strong>N = mg - F·sinθ</strong>. Contact is maintained only while N ≥ 0; if algebra requires N &lt; 0, contact is lost and N = 0.
        </p>
      </div>

      <!-- Unit 3 -->
      <div style="border:1px solid #e2e8f0;border-radius:8px;padding:1.2rem;margin-bottom:1rem;background:#f8fafc;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
          <span style="font-size:0.8rem;font-weight:800;color:#0284c7;">UNIT 3 · DEFINITION</span>
          <code style="font-size:0.9rem;background:#e0f2fe;color:#0369a1;padding:2px 6px;border-radius:4px;">P_avg = F⊥ / A_actual</code>
        </div>
        <h3 style="margin:0 0 6px;font-size:1.15rem;font-weight:700;color:#0f172a;">Average Pressure Depends on Total Normal Thrust and Actual Loaded Area</h3>
        <p style="margin:0 0 8px;color:#475569;font-size:0.92rem;line-height:1.5;">
          Pressure is a scalar defined as normal compressive force divided by actual physical contact area. 1 Pascal = 1 N/m². A solid cylinder of mass 15 kg and radius 5 cm exerts average floor pressure P = (15 × 9.8) / (π × 0.05²) = 18.7 kPa.
        </p>
      </div>

      <!-- Unit 4 -->
      <div style="border:1px solid #e2e8f0;border-radius:8px;padding:1.2rem;margin-bottom:1rem;background:#f8fafc;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
          <span style="font-size:0.8rem;font-weight:800;color:#0284c7;">UNIT 4 · SCALING ANALYSIS</span>
          <code style="font-size:0.9rem;background:#e0f2fe;color:#0369a1;padding:2px 6px;border-radius:4px;">Weight ∝ L³, Area ∝ L² ⇒ P ∝ L</code>
        </div>
        <h3 style="margin:0 0 6px;font-size:1.15rem;font-weight:700;color:#0f172a;">Similar Objects Make Weight and Contact Area Scale with Different Powers</h3>
        <p style="margin:0 0 8px;color:#475569;font-size:0.92rem;line-height:1.5;">
          Under geometric scaling by linear factor λ: volume and weight scale as λ³, whereas contact surface area scales as λ². Consequently, contact pressure scales linearly: <strong>P ∝ L</strong>. A cube of side 2L exerts exactly twice the floor pressure of a same-density cube of side L (INJSO 2012 Q39).
        </p>
      </div>

      <!-- Unit 5 & 6 -->
      <div style="border:1px solid #e2e8f0;border-radius:8px;padding:1.2rem;margin-bottom:1rem;background:#f8fafc;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
          <span style="font-size:0.8rem;font-weight:800;color:#0284c7;">UNIT 5 &amp; 6 · HYDROSTATICS &amp; GAS LAWS</span>
          <code style="font-size:0.9rem;background:#e0f2fe;color:#0369a1;padding:2px 6px;border-radius:4px;">P_abs = P_atm + ρ·g·h &nbsp;|&nbsp; P₁V₁ = P₂V₂</code>
        </div>
        <h3 style="margin:0 0 6px;font-size:1.15rem;font-weight:700;color:#0f172a;">Depth Adds Gauge Pressure; Gas Laws Need Absolute Pressure</h3>
        <p style="margin:0 0 8px;color:#475569;font-size:0.92rem;line-height:1.5;">
          In a static fluid of density ρ at depth h: Gauge pressure = ρgh, Absolute pressure = P_atm + ρgh. When coupling hydrostatics to Boyle's law (e.g. rising bubbles), you <em>must</em> use P_abs. At depth 20m in water (P_atm = 10⁵ Pa, ρ = 1000 kg/m³), P₁ = 10⁵ + 2×10⁵ = 3×10⁵ Pa; at surface P₂ = 10⁵ Pa, so bubble volume triples (V₂ = 3V₁).
        </p>
      </div>

      <div style="display:flex;gap:10px;justify-content:flex-end;margin-top:1rem;">
        <button type="button" onclick="window.location.hash='#/bank?subject=Physics&topic=fluids'" style="min-height:${HIT_TARGET_MIN_PX}px;padding:10px 18px;background:#0284c7;color:white;border:none;border-radius:6px;font-weight:700;cursor:pointer;">
          🎯 Practice Fluids Questions in Question Bank →
        </button>
      </div>
    </div>
  `;
}

function getMotion1DStudyHtml(): string {
  return `
    <div style="background:#ffffff;border:1px solid #cbd5e1;border-radius:12px;padding:1.5rem;box-shadow:0 1px 3px rgba(0,0,0,0.05);">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:12px;margin-bottom:1.25rem;border-bottom:1px solid #e2e8f0;padding-bottom:1rem;">
        <div>
          <div style="display:flex;gap:6px;margin-bottom:6px;">
            <span style="font-size:0.8rem;font-weight:800;background:#e0f2fe;color:#0369a1;padding:2px 8px;border-radius:4px;">CORE 1A THEORY</span>
            <span style="font-size:0.8rem;font-weight:800;background:#dcfce7;color:#166534;padding:2px 8px;border-radius:4px;">6 CONCEPT UNITS</span>
          </div>
          <h2 style="margin:0 0 0.25rem;font-size:1.45rem;font-weight:800;color:#0f172a;">🏎️ Motion in One Dimension Study Guide</h2>
          <p style="color:#64748b;margin:0;font-size:0.95rem;">Rectilinear kinematics, parameter elimination, free fall symmetries, and calculus area translation.</p>
        </div>
        <div style="display:flex;gap:8px;flex-wrap:wrap;">
          <a href="./physics/motion-1d/index.html" style="min-height:${HIT_TARGET_MIN_PX}px;padding:8px 16px;background:#0284c7;color:white;text-decoration:none;border-radius:6px;font-weight:700;display:inline-flex;align-items:center;">⚡ Full Workspace App →</a>
          <a href="./physics/motion-1d/explorers/motion_in_1d/index.html" style="min-height:${HIT_TARGET_MIN_PX}px;padding:8px 16px;background:#0f172a;color:#38bdf8;text-decoration:none;border:1px solid #38bdf8;border-radius:6px;font-weight:700;display:inline-flex;align-items:center;">⚡ Interactive Suite →</a>
          <a href="./standalone/practice/core1a-motion-1d-straight-line-tablet.html" style="min-height:${HIT_TARGET_MIN_PX}px;padding:8px 16px;background:#f1f5f9;color:#0f172a;text-decoration:none;border:1px solid #cbd5e1;border-radius:6px;font-weight:700;display:inline-flex;align-items:center;">📖 Tablet App →</a>
        </div>
      </div>

      <!-- Unit 1 -->
      <div style="border:1px solid #e2e8f0;border-radius:8px;padding:1.2rem;margin-bottom:1rem;background:#f8fafc;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
          <span style="font-size:0.8rem;font-weight:800;color:#0284c7;">UNIT 1 · KINEMATICS</span>
          <code style="font-size:0.9rem;background:#e0f2fe;color:#0369a1;padding:2px 6px;border-radius:4px;">Δx = x_f - x_i &nbsp;|&nbsp; s = ∫|v|dt ≥ |Δx|</code>
        </div>
        <h3 style="margin:0 0 6px;font-size:1.15rem;font-weight:700;color:#0f172a;">Distance vs. Displacement &amp; Path Reversal Criteria</h3>
        <p style="margin:0 0 8px;color:#475569;font-size:0.92rem;line-height:1.5;">
          Unidirectional motion preserves s = |Δx|. The exact instant velocity reverses sign (v = 0), distance continues monotonically increasing while net displacement subtracts. Particle starting at 0, moving to +8m then reversing to +2m covers distance 14m but net displacement +2m.
        </p>
      </div>

      <!-- Unit 2 -->
      <div style="border:1px solid #e2e8f0;border-radius:8px;padding:1.2rem;margin-bottom:1rem;background:#f8fafc;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
          <span style="font-size:0.8rem;font-weight:800;color:#0284c7;">UNIT 2 · RATES</span>
          <code style="font-size:0.9rem;background:#e0f2fe;color:#0369a1;padding:2px 6px;border-radius:4px;">v_time = (v₁+v₂)/2 &nbsp;|&nbsp; v_dist = 2v₁v₂/(v₁+v₂)</code>
        </div>
        <h3 style="margin:0 0 6px;font-size:1.15rem;font-weight:700;color:#0f172a;">Average Speed: Equal-Time Arithmetic vs. Equal-Distance Harmonic Mean</h3>
        <p style="margin:0 0 8px;color:#475569;font-size:0.92rem;line-height:1.5;">
          Equal-distance weighting creates the harmonic mean: traveling at 40 km/h and returning at 60 km/h yields average speed 2×40×60/(40+60) = 48 km/h (NOT 50 km/h!), because more time is spent traversing the distance at the slower rate.
        </p>
      </div>

      <!-- Unit 3 & 4 -->
      <div style="border:1px solid #e2e8f0;border-radius:8px;padding:1.2rem;margin-bottom:1rem;background:#f8fafc;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
          <span style="font-size:0.8rem;font-weight:800;color:#0284c7;">UNIT 3 &amp; 4 · EQUATIONS &amp; FREE FALL</span>
          <code style="font-size:0.9rem;background:#e0f2fe;color:#0369a1;padding:2px 6px;border-radius:4px;">v² = u² + 2as &nbsp;|&nbsp; H_max = u²/(2g) &nbsp;|&nbsp; s_n = u + ½a(2n-1)</code>
        </div>
        <h3 style="margin:0 0 6px;font-size:1.15rem;font-weight:700;color:#0f172a;">Kinematic Parameter Elimination &amp; Vertical Reversal Invariance</h3>
        <p style="margin:0 0 8px;color:#475569;font-size:0.92rem;line-height:1.5;">
          Under gravity (a = -g), apex velocity is momentarily zero (v = 0), but acceleration remains -g! Galileo's law of odd numbers: from rest, distances in successive seconds scale as 1 : 3 : 5 : 7.
        </p>
      </div>

      <!-- Unit 5 & 6 -->
      <div style="border:1px solid #e2e8f0;border-radius:8px;padding:1.2rem;margin-bottom:1rem;background:#f8fafc;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
          <span style="font-size:0.8rem;font-weight:800;color:#0284c7;">UNIT 5 &amp; 6 · CALCULUS &amp; BRAKING</span>
          <code style="font-size:0.9rem;background:#e0f2fe;color:#0369a1;padding:2px 6px;border-radius:4px;">Area under v-t = Δx &nbsp;|&nbsp; d_stop = u·t_r + u²/(2a)</code>
        </div>
        <h3 style="margin:0 0 6px;font-size:1.15rem;font-weight:700;color:#0f172a;">Calculus Graphical Translation &amp; Quadratic Braking Envelope</h3>
        <p style="margin:0 0 8px;color:#475569;font-size:0.92rem;line-height:1.5;">
          Slope of position-time gives v(t); slope of v-t gives a(t). Bounded area under v-t gives net displacement Δx. Vehicle stopping distance has linear thinking lag u·t_r and quadratic braking skid u²/(2a).
        </p>
      </div>

      <div style="display:flex;gap:10px;justify-content:flex-end;margin-top:1rem;">
        <button type="button" onclick="window.location.hash='#/bank?subject=Physics&topic=motion-1d'" style="min-height:${HIT_TARGET_MIN_PX}px;padding:10px 18px;background:#0284c7;color:white;border:none;border-radius:6px;font-weight:700;cursor:pointer;">
          🎯 Practice Motion 1D in Question Bank →
        </button>
      </div>
    </div>
  `;
}

function getNlmStudyHtml(): string {
  return `
    <div style="background:#ffffff;border:1px solid #cbd5e1;border-radius:12px;padding:1.5rem;box-shadow:0 1px 3px rgba(0,0,0,0.05);">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:12px;margin-bottom:1.25rem;border-bottom:1px solid #e2e8f0;padding-bottom:1rem;">
        <div>
          <div style="display:flex;gap:6px;margin-bottom:6px;">
            <span style="font-size:0.8rem;font-weight:800;background:#e0f2fe;color:#0369a1;padding:2px 8px;border-radius:4px;">CORE 1A THEORY</span>
            <span style="font-size:0.8rem;font-weight:800;background:#dcfce7;color:#166534;padding:2px 8px;border-radius:4px;">6 CONCEPT UNITS</span>
          </div>
          <h2 style="margin:0 0 0.25rem;font-size:1.45rem;font-weight:800;color:#0f172a;">⚖️ Newton's Laws of Motion Study Guide</h2>
          <p style="color:#64748b;margin:0;font-size:0.95rem;">First law inertial frames, FBD isolation, Atwood constraints, momentum impulse, and stick-slip friction thresholds.</p>
        </div>
        <div style="display:flex;gap:8px;flex-wrap:wrap;">
          <a href="./physics/nlm/index.html" style="min-height:${HIT_TARGET_MIN_PX}px;padding:8px 16px;background:#0284c7;color:white;text-decoration:none;border-radius:6px;font-weight:700;display:inline-flex;align-items:center;">⚡ Full Workspace App →</a>
          <a href="./physics/nlm/explorers/atwood-pulleys/index.html" style="min-height:${HIT_TARGET_MIN_PX}px;padding:8px 16px;background:#0f172a;color:#38bdf8;text-decoration:none;border:1px solid #38bdf8;border-radius:6px;font-weight:700;display:inline-flex;align-items:center;">⚡ Atwood Machine Suite →</a>
          <a href="./standalone/practice/core1a-physics-nlm-tablet.html" style="min-height:${HIT_TARGET_MIN_PX}px;padding:8px 16px;background:#f1f5f9;color:#0f172a;text-decoration:none;border:1px solid #cbd5e1;border-radius:6px;font-weight:700;display:inline-flex;align-items:center;">📖 Tablet App →</a>
        </div>
      </div>

      <!-- Unit 1 & 2 -->
      <div style="border:1px solid #e2e8f0;border-radius:8px;padding:1.2rem;margin-bottom:1rem;background:#f8fafc;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
          <span style="font-size:0.8rem;font-weight:800;color:#0284c7;">UNIT 1 &amp; 2 · INERTIAL FRAMES &amp; FBD</span>
          <code style="font-size:0.9rem;background:#e0f2fe;color:#0369a1;padding:2px 6px;border-radius:4px;">ΣF_ext = 0 ⇔ v = const &nbsp;|&nbsp; N = mg cosθ</code>
        </div>
        <h3 style="margin:0 0 6px;font-size:1.15rem;font-weight:700;color:#0f172a;">First Law Foundations &amp; System Isolation Rules</h3>
        <p style="margin:0 0 8px;color:#475569;font-size:0.92rem;line-height:1.5;">
          Motion does not require force; force causes change in velocity. Free body diagrams must draw ONLY external forces acting ON the isolated body. Normal force N is not automatically mg; on an incline N = mg cosθ, and in an elevator N = m(g ± a).
        </p>
      </div>

      <!-- Unit 3 & 4 -->
      <div style="border:1px solid #e2e8f0;border-radius:8px;padding:1.2rem;margin-bottom:1rem;background:#f8fafc;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
          <span style="font-size:0.8rem;font-weight:800;color:#0284c7;">UNIT 3 &amp; 4 · NEWTON II &amp; IMPULSE</span>
          <code style="font-size:0.9rem;background:#e0f2fe;color:#0369a1;padding:2px 6px;border-radius:4px;">a = (m₂-m₁)g/(m₁+m₂) &nbsp;|&nbsp; J = Δp = F_avg · Δt</code>
        </div>
        <h3 style="margin:0 0 6px;font-size:1.15rem;font-weight:700;color:#0f172a;">Atwood Pulley Constraints &amp; Momentum Impulse Theorem</h3>
        <p style="margin:0 0 8px;color:#475569;font-size:0.92rem;line-height:1.5;">
          Taut string constraint requires equal acceleration magnitude for both blocks. String tension T = 2m₁m₂g/(m₁+m₂) is strictly less than the heavier weight m₂g. Momentum is a signed vector; rebounding doubles impulse Δp = 2mu, demanding prolonged impact time Δt to reduce peak force.
        </p>
      </div>

      <!-- Unit 5 & 6 -->
      <div style="border:1px solid #e2e8f0;border-radius:8px;padding:1.2rem;margin-bottom:1rem;background:#f8fafc;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
          <span style="font-size:0.8rem;font-weight:800;color:#0284c7;">UNIT 5 &amp; 6 · THIRD LAW &amp; FRICTION</span>
          <code style="font-size:0.9rem;background:#e0f2fe;color:#0369a1;padding:2px 6px;border-radius:4px;">F_{AB} = -F_{BA} &nbsp;|&nbsp; f_s ≤ μ_s N, f_k = μ_k N</code>
        </div>
        <h3 style="margin:0 0 6px;font-size:1.15rem;font-weight:700;color:#0f172a;">Action-Reaction Pairs &amp; The Stick-Slip Friction Threshold</h3>
        <p style="margin:0 0 8px;color:#475569;font-size:0.92rem;line-height:1.5;">
          Third law pairs act simultaneously on two DIFFERENT bodies and never cancel on a single FBD. Static friction is self-adjusting (f_s = F_applied) up to limiting threshold f_lim = μ_s N. Once slip begins, friction drops to constant kinetic value f_k = μ_k N.
        </p>
      </div>

      <div style="display:flex;gap:10px;justify-content:flex-end;margin-top:1rem;">
        <button type="button" onclick="window.location.hash='#/bank?subject=Physics&topic=nlm'" style="min-height:${HIT_TARGET_MIN_PX}px;padding:10px 18px;background:#0284c7;color:white;border:none;border-radius:6px;font-weight:700;cursor:pointer;">
          🎯 Practice NLM in Question Bank →
        </button>
      </div>
    </div>
  `;
}

function getVectorsStudyHtml(): string {
  return `
    <div style="background:#ffffff;border:1px solid #cbd5e1;border-radius:12px;padding:1.5rem;box-shadow:0 1px 3px rgba(0,0,0,0.05);">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:12px;margin-bottom:1.25rem;border-bottom:1px solid #e2e8f0;padding-bottom:1rem;">
        <div>
          <div style="display:flex;gap:6px;margin-bottom:6px;">
            <span style="font-size:0.8rem;font-weight:800;background:#e0f2fe;color:#0369a1;padding:2px 8px;border-radius:4px;">CORE 1A THEORY</span>
            <span style="font-size:0.8rem;font-weight:800;background:#dcfce7;color:#166534;padding:2px 8px;border-radius:4px;">6 CONCEPT UNITS</span>
          </div>
          <h2 style="margin:0 0 0.25rem;font-size:1.45rem;font-weight:800;color:#0f172a;">📐 Vector Methods in Physics Study Guide</h2>
          <p style="color:#64748b;margin:0;font-size:0.95rem;">Geometric vector laws, Cartesian unit vectors, dot products, cross products, and physical invariance.</p>
        </div>
        <div style="display:flex;gap:8px;flex-wrap:wrap;">
          <a href="./physics/vectors/index.html" style="min-height:${HIT_TARGET_MIN_PX}px;padding:8px 16px;background:#0284c7;color:white;text-decoration:none;border-radius:6px;font-weight:700;display:inline-flex;align-items:center;">⚡ Full Workspace App →</a>
          <a href="./standalone/practice/vector-algebra-3d-master-suite.html" style="min-height:${HIT_TARGET_MIN_PX}px;padding:8px 16px;background:#0f172a;color:#38bdf8;text-decoration:none;border:1px solid #38bdf8;border-radius:6px;font-weight:700;display:inline-flex;align-items:center;">⚡ 3D Master Suite →</a>
          <a href="./standalone/practice/core1a-physics-vectors-tablet.html" style="min-height:${HIT_TARGET_MIN_PX}px;padding:8px 16px;background:#f1f5f9;color:#0f172a;text-decoration:none;border:1px solid #cbd5e1;border-radius:6px;font-weight:700;display:inline-flex;align-items:center;">📖 Tablet App →</a>
        </div>
      </div>

      <!-- Unit 1 & 2 -->
      <div style="border:1px solid #e2e8f0;border-radius:8px;padding:1.2rem;margin-bottom:1rem;background:#f8fafc;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
          <span style="font-size:0.8rem;font-weight:800;color:#0284c7;">UNIT 1 &amp; 2 · FOUNDATIONS &amp; ADDITION</span>
          <code style="font-size:0.9rem;background:#e0f2fe;color:#0369a1;padding:2px 6px;border-radius:4px;">R = √(A² + B² + 2AB cosθ)</code>
        </div>
        <h3 style="margin:0 0 6px;font-size:1.15rem;font-weight:700;color:#0f172a;">Scalars vs. Vectors &amp; The Parallelogram Addition Law</h3>
        <p style="margin:0 0 8px;color:#475569;font-size:0.92rem;line-height:1.5;">
          A quantity is a vector only if it obeys the parallelogram addition law (current has direction but is a scalar!). Resultant magnitude ranges between |A - B| (at 180°) and A + B (at 0°). Two equal vectors of magnitude F at 120° yield a resultant of EXACTLY F at 60°.
        </p>
      </div>

      <!-- Unit 3 & 4 -->
      <div style="border:1px solid #e2e8f0;border-radius:8px;padding:1.2rem;margin-bottom:1rem;background:#f8fafc;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
          <span style="font-size:0.8rem;font-weight:800;color:#0284c7;">UNIT 3 &amp; 4 · CARTESIAN RESOLUTION &amp; SUBTRACTION</span>
          <code style="font-size:0.9rem;background:#e0f2fe;color:#0369a1;padding:2px 6px;border-radius:4px;">A = A_x î + A_y ĵ &nbsp;|&nbsp; |Δv| = 2v sin(θ/2)</code>
        </div>
        <h3 style="margin:0 0 6px;font-size:1.15rem;font-weight:700;color:#0f172a;">Orthogonal Unit Vectors &amp; Vector State Subtraction</h3>
        <p style="margin:0 0 8px;color:#475569;font-size:0.92rem;line-height:1.5;">
          Resolving into Cartesian components converts complex geometric trigonometry into simple scalar arithmetic: R_x = Σ A_ix, R_y = Σ A_iy. A car turning a 90° corner at constant 20 m/s experiences a velocity change of magnitude √(20² + 20²) = 28.28 m/s!
        </p>
      </div>

      <!-- Unit 5 & 6 -->
      <div style="border:1px solid #e2e8f0;border-radius:8px;padding:1.2rem;margin-bottom:1rem;background:#f8fafc;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
          <span style="font-size:0.8rem;font-weight:800;color:#0284c7;">UNIT 5 &amp; 6 · PRODUCTS</span>
          <code style="font-size:0.9rem;background:#e0f2fe;color:#0369a1;padding:2px 6px;border-radius:4px;">A · B = AB cosθ &nbsp;|&nbsp; τ = r × F = (AB sinθ) n̂</code>
        </div>
        <h3 style="margin:0 0 6px;font-size:1.15rem;font-weight:700;color:#0f172a;">Dot Product Projections &amp; Cross Product Torque Vectors</h3>
        <p style="margin:0 0 8px;color:#475569;font-size:0.92rem;line-height:1.5;">
          The dot product yields a scalar measuring alignment (W = F · d = 0 for perpendicular forces). The cross product yields a vector strictly perpendicular to the plane (r × F = -(F × r)), defining torque and angular momentum via the right-hand screw rule.
        </p>
      </div>

      <div style="display:flex;gap:10px;justify-content:flex-end;margin-top:1rem;">
        <button type="button" onclick="window.location.hash='#/bank?subject=Physics&topic=vectors'" style="min-height:${HIT_TARGET_MIN_PX}px;padding:10px 18px;background:#0284c7;color:white;border:none;border-radius:6px;font-weight:700;cursor:pointer;">
          🎯 Practice Vectors in Question Bank →
        </button>
      </div>
    </div>
  `;
}

function getGravitationStudyHtml(): string {
  return `
    <div style="background:#ffffff;border:1px solid #cbd5e1;border-radius:12px;padding:1.5rem;box-shadow:0 1px 3px rgba(0,0,0,0.05);">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:12px;margin-bottom:1.25rem;border-bottom:1px solid #e2e8f0;padding-bottom:1rem;">
        <div>
          <div style="display:flex;gap:6px;margin-bottom:6px;">
            <span style="font-size:0.8rem;font-weight:800;background:#e0f2fe;color:#0369a1;padding:2px 8px;border-radius:4px;">CORE 1A THEORY</span>
            <span style="font-size:0.8rem;font-weight:800;background:#dcfce7;color:#166534;padding:2px 8px;border-radius:4px;">6 CONCEPT UNITS</span>
          </div>
          <h2 style="margin:0 0 0.25rem;font-size:1.45rem;font-weight:800;color:#0f172a;">🪐 Gravitation &amp; Orbital Mechanics Study Guide</h2>
          <p style="color:#64748b;margin:0;font-size:0.95rem;">Newton's universal gravitation, Kepler's orbital laws, gravitational field intensity, and escape velocity dynamics.</p>
        </div>
        <div style="display:flex;gap:8px;flex-wrap:wrap;">
          <button type="button" id="btn-grav-tab4-shortcut" style="min-height:${HIT_TARGET_MIN_PX}px;padding:8px 16px;background:#0284c7;color:white;border:none;border-radius:6px;font-weight:700;cursor:pointer;">⚡ Open Orbital Labs Workbench →</button>
        </div>
      </div>

      <!-- Unit 1 & 2 -->
      <div style="border:1px solid #e2e8f0;border-radius:8px;padding:1.2rem;margin-bottom:1rem;background:#f8fafc;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
          <span style="font-size:0.8rem;font-weight:800;color:#0284c7;">UNIT 1 &amp; 2 · INVERSE-SQUARE LAW &amp; SHELL THEOREM</span>
          <code style="font-size:0.9rem;background:#e0f2fe;color:#0369a1;padding:2px 6px;border-radius:4px;">F_g = G·M·m / r² &nbsp;|&nbsp; g(r) = -G·M / r² r̂</code>
        </div>
        <h3 style="margin:0 0 6px;font-size:1.15rem;font-weight:700;color:#0f172a;">Newton's Law of Universal Gravitation &amp; Spherical Symmetry</h3>
        <p style="margin:0 0 8px;color:#475569;font-size:0.92rem;line-height:1.5;">
          Gravitation acts along the line connecting centers of mass. By Gauss's Law / Newton's Shell Theorem, a spherically symmetric body attracts external bodies as if all mass were concentrated at its geometric center. Inside a uniform spherical shell, the net gravitational force is identically zero everywhere.
        </p>
        <div style="background:#eff6ff;border-left:3px solid #3b82f6;padding:8px 12px;border-radius:0 6px 6px 0;font-size:0.88rem;color:#1e3a8a;">
          <strong>Surface Gravity Scaling:</strong> g = G M / R². For a planet with mass 2M and radius 2R, g_planet = G(2M)/(2R)² = 0.5 g_Earth.
        </div>
      </div>

      <!-- Unit 3 & 4 -->
      <div style="border:1px solid #e2e8f0;border-radius:8px;padding:1.2rem;margin-bottom:1rem;background:#f8fafc;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
          <span style="font-size:0.8rem;font-weight:800;color:#0284c7;">UNIT 3 &amp; 4 · POTENTIAL WELL &amp; SATELLITE ORBITS</span>
          <code style="font-size:0.9rem;background:#e0f2fe;color:#0369a1;padding:2px 6px;border-radius:4px;">U(r) = -G·M·m / r &nbsp;|&nbsp; v_o = √(G·M / r)</code>
        </div>
        <h3 style="margin:0 0 6px;font-size:1.15rem;font-weight:700;color:#0f172a;">Gravitational Potential Energy &amp; Centripetal Equilibrium</h3>
        <p style="margin:0 0 8px;color:#475569;font-size:0.92rem;line-height:1.5;">
          Because gravity is conservative and attractive, U(r) is negative everywhere relative to the datum U(∞) = 0. In a circular orbit of radius r, centripetal acceleration is supplied entirely by gravity: G M m / r² = m v² / r => v_o = √(G M / r). By the Virial Theorem: 2K + U = 0, so total mechanical energy is E = -K = 0.5 U = -G M m / (2r) &lt; 0.
        </p>
      </div>

      <!-- Unit 5 & 6 -->
      <div style="border:1px solid #e2e8f0;border-radius:8px;padding:1.2rem;margin-bottom:1rem;background:#f8fafc;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
          <span style="font-size:0.8rem;font-weight:800;color:#0284c7;">UNIT 5 &amp; 6 · KEPLER'S LAWS &amp; ESCAPE VELOCITY</span>
          <code style="font-size:0.9rem;background:#e0f2fe;color:#0369a1;padding:2px 6px;border-radius:4px;">T² = (4π² / G M) r³ &nbsp;|&nbsp; v_e = √(2G·M / R) = √2 v_o</code>
        </div>
        <h3 style="margin:0 0 6px;font-size:1.15rem;font-weight:700;color:#0f172a;">Orbital Harmonic Law &amp; Parabolic Escape Threshold</h3>
        <p style="margin:0 0 8px;color:#475569;font-size:0.92rem;line-height:1.5;">
          Kepler's Third Law states that the square of the orbital period T is directly proportional to the cube of the orbital radius: T² ∝ r³. To break gravitational binding completely and reach infinity with non-negative kinetic energy, total mechanical energy must satisfy E ≥ 0: 0.5 m v_e² - G M m / R = 0 => v_e = √(2 G M / R) ≈ 11.2 km/s for Earth.
        </p>
      </div>

      <div style="display:flex;gap:10px;justify-content:flex-end;margin-top:1rem;">
        <button type="button" onclick="window.location.hash='#/bank?subject=Physics&topic=gravitation'" style="min-height:${HIT_TARGET_MIN_PX}px;padding:10px 18px;background:#0284c7;color:white;border:none;border-radius:6px;font-weight:700;cursor:pointer;">
          🎯 Practice Gravitation in Question Bank →
        </button>
      </div>
    </div>
  `;
}

function mountGravitationLabsWorkbench(container: HTMLElement): { dispose: () => void } {
  let altitudeKm = 600;
  let satMassKg = 1000;
  const R_E = 6371; // km
  const M_E = 5.972e24; // kg
  const G = 6.6743e-11; // N m^2 / kg^2
  const GM = 3.986e14; // m^3 / s^2

  const renderWorkbench = () => {
    const rKm = R_E + altitudeKm;
    const rM = rKm * 1000;
    const vMps = Math.sqrt(GM / rM);
    const vKmph = vMps / 1000;
    const vEscKmph = Math.sqrt(2) * vKmph;
    const periodSec = 2 * Math.PI * Math.sqrt(Math.pow(rM, 3) / GM);
    const periodMin = periodSec / 60;
    const gLocal = GM / Math.pow(rM, 2);
    const Fg = satMassKg * gLocal;
    const uGj = (-G * M_E * satMassKg / rM) / 1e9;
    const kGj = (0.5 * satMassKg * Math.pow(vMps, 2)) / 1e9;
    const eGj = kGj + uGj;

    const orbitRadiusPx = 45 + (altitudeKm / 36000) * 110;
    const satX = 220 + orbitRadiusPx;
    const satY = 160;

    container.innerHTML = `
      <div class="g9-labs-workbench" style="background:#f8fafc;border:1px solid #cbd5e1;border-radius:8px;padding:1.5rem;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem;flex-wrap:wrap;gap:8px;">
          <div>
            <h2 style="margin:0;font-size:1.35rem;font-weight:700;color:#0f172a;">Keplerian Orbital Mechanics &amp; Gravitational Field Workbench</h2>
            <p style="margin:2px 0 0;font-size:0.95rem;color:#64748b;">Central Inverse-Square Potential: U(r) = -G·M·m/r | Orbital Speed: v_o = √(G·M/r)</p>
          </div>
          <span style="font-size:0.875rem;font-weight:700;color:#0284c7;background:#e0f2fe;padding:2px 8px;border-radius:4px;">A50 / A54 Model</span>
        </div>

        <!-- Interactive SVG Canvas: Orbital Geometry & Vector Field -->
        <div style="background:#ffffff;border:1px solid #e2e8f0;border-radius:8px;padding:1.25rem;margin-bottom:1.5rem;">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.75rem;flex-wrap:wrap;gap:8px;">
            <h3 style="margin:0;font-size:1.15rem;font-weight:700;color:#0f172a;">Orbital Trajectory &amp; Force Vector Balance</h3>
            <div style="display:flex;gap:12px;font-size:0.875rem;font-weight:600;flex-wrap:wrap;">
              <span style="color:#0284c7;">● Orbit Path r = ${rKm.toFixed(0)} km</span>
              <span style="color:#10b981;">▲ Tangential Velocity v_o = ${vKmph.toFixed(2)} km/s</span>
              <span style="color:#ef4444;">◀ Centripetal Gravity g = ${gLocal.toFixed(2)} m/s²</span>
            </div>
          </div>

          <svg viewBox="0 0 600 320" style="width:100%;height:auto;display:block;background:#090d16;border:1px solid #1e293b;border-radius:6px;" aria-label="Keplerian Orbit Trajectory and Field Balance">
            <!-- Grid lines -->
            <line x1="20" y1="160" x2="420" y2="160" stroke="#1e293b" stroke-dasharray="3,3" />
            <line x1="220" y1="20" x2="220" y2="300" stroke="#1e293b" stroke-dasharray="3,3" />

            <!-- Orbit circle -->
            <circle cx="220" cy="160" r="${orbitRadiusPx.toFixed(1)}" fill="none" stroke="#0284c7" stroke-width="2" stroke-dasharray="4,4" />

            <!-- Central Earth -->
            <circle cx="220" cy="160" r="45" fill="url(#earthGradient)" stroke="#38bdf8" stroke-width="2" />
            <text x="220" y="165" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="700">Earth</text>
            <text x="220" y="180" text-anchor="middle" fill="#94a3b8" font-size="10">R = 6,371 km</text>

            <!-- Satellite Point -->
            <circle cx="${satX.toFixed(1)}" cy="${satY.toFixed(1)}" r="7" fill="#f59e0b" stroke="#ffffff" stroke-width="2" />
            
            <!-- Tangential Velocity Vector -->
            <line x1="${satX.toFixed(1)}" y1="${satY.toFixed(1)}" x2="${satX.toFixed(1)}" y2="${(satY - 45).toFixed(1)}" stroke="#10b981" stroke-width="3" marker-end="url(#arrowGreen)" />
            <text x="${(satX + 8).toFixed(1)}" y="${(satY - 25).toFixed(1)}" fill="#10b981" font-size="12" font-weight="700">v_o = ${vKmph.toFixed(2)} km/s</text>

            <!-- Centripetal Gravitational Force Vector -->
            <line x1="${satX.toFixed(1)}" y1="${satY.toFixed(1)}" x2="${(satX - 45).toFixed(1)}" y2="${satY.toFixed(1)}" stroke="#ef4444" stroke-width="3" marker-end="url(#arrowRed)" />
            <text x="${(satX - 50).toFixed(1)}" y="${(satY + 16).toFixed(1)}" fill="#ef4444" font-size="11" font-weight="700">F_g = ${Fg.toFixed(0)} N</text>

            <!-- Energy Ledger on right side -->
            <rect x="440" y="20" width="145" height="280" fill="#0f172a" rx="6" stroke="#334155" />
            <text x="512" y="42" text-anchor="middle" fill="#cbd5e1" font-size="11" font-weight="700">Energy Ledger (GJ)</text>
            <text x="450" y="70" fill="#38bdf8" font-size="11">Kinetic K: +${kGj.toFixed(2)}</text>
            <text x="450" y="95" fill="#f87171" font-size="11">Potential U: ${uGj.toFixed(2)}</text>
            <line x1="450" y1="108" x2="575" y2="108" stroke="#475569" />
            <text x="450" y="125" fill="#facc15" font-size="11" font-weight="700">Total E: ${eGj.toFixed(2)}</text>
            <text x="450" y="145" fill="#94a3b8" font-size="10">(E &lt; 0 Bound Orbit)</text>

            <text x="450" y="180" fill="#a78bfa" font-size="11" font-weight="700">Escape Speed:</text>
            <text x="450" y="198" fill="#e2e8f0" font-size="12">v_e = ${vEscKmph.toFixed(2)} km/s</text>

            <text x="450" y="230" fill="#67e8f9" font-size="11" font-weight="700">Period T:</text>
            <text x="450" y="248" fill="#e2e8f0" font-size="12">${periodMin < 120 ? periodMin.toFixed(1) + ' min' : (periodMin / 60).toFixed(1) + ' hrs'}</text>

            <defs>
              <radialGradient id="earthGradient" cx="40%" cy="40%" r="60%">
                <stop offset="0%" stop-color="#38bdf8" />
                <stop offset="50%" stop-color="#0284c7" />
                <stop offset="100%" stop-color="#0f172a" />
              </radialGradient>
              <marker id="arrowGreen" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#10b981" />
              </marker>
              <marker id="arrowRed" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#ef4444" />
              </marker>
            </defs>
          </svg>
        </div>

        <!-- Interactive Parameter Sliders & Analytical Controls -->
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:1rem;margin-bottom:1.5rem;">
          <div style="background:#ffffff;border:1px solid #e2e8f0;border-radius:8px;padding:1.25rem;">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.5rem;">
              <label for="grav-alt-slider" style="font-weight:700;color:#0f172a;font-size:0.95rem;">Orbital Altitude (h):</label>
              <span id="grav-alt-val" style="font-weight:800;color:#0284c7;font-size:1.05rem;">${altitudeKm.toLocaleString()} km</span>
            </div>
            <input type="range" id="grav-alt-slider" min="200" max="36000" step="100" value="${altitudeKm}" style="width:100%;min-height:${HIT_TARGET_MIN_PX}px;cursor:pointer;">
            <div style="display:flex;justify-content:space-between;font-size:0.8rem;color:#64748b;margin-top:4px;">
              <span>200 km (LEO)</span>
              <span>2,000 km (MEO)</span>
              <span>35,786 km (GEO)</span>
            </div>
          </div>

          <div style="background:#ffffff;border:1px solid #e2e8f0;border-radius:8px;padding:1.25rem;">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.5rem;">
              <label for="grav-mass-slider" style="font-weight:700;color:#0f172a;font-size:0.95rem;">Satellite Mass (m):</label>
              <span id="grav-mass-val" style="font-weight:800;color:#0284c7;font-size:1.05rem;">${satMassKg.toLocaleString()} kg</span>
            </div>
            <input type="range" id="grav-mass-slider" min="100" max="5000" step="50" value="${satMassKg}" style="width:100%;min-height:${HIT_TARGET_MIN_PX}px;cursor:pointer;">
            <div style="display:flex;justify-content:space-between;font-size:0.8rem;color:#64748b;margin-top:4px;">
              <span>100 kg (Cubesat)</span>
              <span>1,000 kg (Observer)</span>
              <span>5,000 kg (Comms)</span>
            </div>
          </div>
        </div>

        <!-- Analytical Derivation Cards -->
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:0.75rem;">
          <div style="background:#ffffff;border:1px solid #e2e8f0;border-radius:6px;padding:1rem;">
            <span style="font-size:0.8rem;font-weight:700;color:#64748b;">ORBITAL VELOCITY</span>
            <div style="font-size:1.25rem;font-weight:800;color:#0f172a;margin:4px 0;">${vKmph.toFixed(2)} km/s</div>
            <span style="font-size:0.8rem;color:#0284c7;">v_o = √(G·M / r)</span>
          </div>
          <div style="background:#ffffff;border:1px solid #e2e8f0;border-radius:6px;padding:1rem;">
            <span style="font-size:0.8rem;font-weight:700;color:#64748b;">ORBITAL PERIOD</span>
            <div style="font-size:1.25rem;font-weight:800;color:#0f172a;margin:4px 0;">${periodMin < 120 ? periodMin.toFixed(1) + ' min' : (periodMin / 60).toFixed(1) + ' hrs'}</div>
            <span style="font-size:0.8rem;color:#0284c7;">T = 2π √(r³ / GM)</span>
          </div>
          <div style="background:#ffffff;border:1px solid #e2e8f0;border-radius:6px;padding:1rem;">
            <span style="font-size:0.8rem;font-weight:700;color:#64748b;">ESCAPE VELOCITY</span>
            <div style="font-size:1.25rem;font-weight:800;color:#0f172a;margin:4px 0;">${vEscKmph.toFixed(2)} km/s</div>
            <span style="font-size:0.8rem;color:#0284c7;">v_e = √2 · v_o</span>
          </div>
          <div style="background:#ffffff;border:1px solid #e2e8f0;border-radius:6px;padding:1rem;">
            <span style="font-size:0.8rem;font-weight:700;color:#64748b;">GRAVITY ACCELERATION</span>
            <div style="font-size:1.25rem;font-weight:800;color:#0f172a;margin:4px 0;">${gLocal.toFixed(2)} m/s²</div>
            <span style="font-size:0.8rem;color:#0284c7;">g(h) = g_0 (R/r)²</span>
          </div>
        </div>
      </div>
    `;

    container.querySelector('#grav-alt-slider')?.addEventListener('input', (ev) => {
      altitudeKm = Number((ev.target as HTMLInputElement).value);
      renderWorkbench();
    });
    container.querySelector('#grav-mass-slider')?.addEventListener('input', (ev) => {
      satMassKg = Number((ev.target as HTMLInputElement).value);
      renderWorkbench();
    });
  };

  renderWorkbench();
  return { dispose: () => {} };
}




export function mountGeneticsLabsWorkbench(container: HTMLElement): { dispose: () => void } {
  let parent1 = 'Bb';
  let parent2 = 'Bb';
  let trials = 100;

  const render = () => {
    // Punnett 2x2
    const g1 = [parent1[0], parent1[1]];
    const g2 = [parent2[0], parent2[1]];
    const combos = [
      g1[0] + g2[0], g1[0] + g2[1],
      g1[1] + g2[0], g1[1] + g2[1]
    ].map(s => s.split('').sort().join('')); // e.g. BB, Bb, bb

    const bbCount = combos.filter(c => c === 'BB').length;
    const hetCount = combos.filter(c => c === 'Bb' || c === 'bB').length;
    const recCount = combos.filter(c => c === 'bb').length;
    const domRatio = ((bbCount + hetCount) / 4) * 100;
    const recRatio = (recCount / 4) * 100;

    container.innerHTML = `
      <div class="g9-labs-workbench" style="background:#f8fafc;border:1px solid #cbd5e1;border-radius:8px;padding:1.5rem;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem;flex-wrap:wrap;gap:8px;">
          <div>
            <h2 style="margin:0;font-size:1.35rem;font-weight:700;color:#0f172a;">Mendelian Genetics &amp; Punnett Square Simulator</h2>
            <p style="margin:2px 0 0;font-size:0.95rem;color:#64748b;">Allele Segregation &amp; Dihybrid Transmission | Dominant (B) vs Recessive (b)</p>
          </div>
          <span style="font-size:0.875rem;font-weight:700;color:#047857;background:#d1fae5;padding:2px 8px;border-radius:4px;">A50 / A54 Model</span>
        </div>

        <div style="background:#ffffff;border:1px solid #e2e8f0;border-radius:8px;padding:1.25rem;margin-bottom:1.5rem;">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.75rem;flex-wrap:wrap;gap:8px;">
            <h3 style="margin:0;font-size:1.15rem;font-weight:700;color:#0f172a;">Punnett Cross: ${parent1} × ${parent2}</h3>
            <div style="display:flex;gap:12px;font-size:0.875rem;font-weight:600;">
              <span style="color:#047857;">● Dominant Phenotype: ${domRatio.toFixed(0)}%</span>
              <span style="color:#d97706;">● Recessive Phenotype: ${recRatio.toFixed(0)}%</span>
            </div>
          </div>

          <svg viewBox="0 0 600 240" style="width:100%;max-height:260px;background:#0f172a;border-radius:6px;display:block;">
            <!-- Grid Lines -->
            <rect x="180" y="40" width="240" height="160" fill="#1e293b" stroke="#334155" stroke-width="2" rx="6"/>
            <line x1="300" y1="40" x2="300" y2="200" stroke="#475569" stroke-width="2"/>
            <line x1="180" y1="120" x2="420" y2="120" stroke="#475569" stroke-width="2"/>

            <!-- Parent 1 Gametes (Top) -->
            <text x="240" y="30" fill="#38bdf8" font-size="16" font-weight="800" text-anchor="middle" font-family="sans-serif">${g1[0]}</text>
            <text x="360" y="30" fill="#38bdf8" font-size="16" font-weight="800" text-anchor="middle" font-family="sans-serif">${g1[1]}</text>

            <!-- Parent 2 Gametes (Left) -->
            <text x="160" y="85" fill="#f43f5e" font-size="16" font-weight="800" text-anchor="middle" font-family="sans-serif">${g2[0]}</text>
            <text x="160" y="165" fill="#f43f5e" font-size="16" font-weight="800" text-anchor="middle" font-family="sans-serif">${g2[1]}</text>

            <!-- Four Quadrants -->
            <rect x="185" y="45" width="110" height="70" fill="${combos[0] === 'bb' ? '#78350f' : '#065f46'}" rx="4"/>
            <text x="240" y="88" fill="#ffffff" font-size="18" font-weight="800" text-anchor="middle" font-family="sans-serif">${g1[0]}${g2[0]}</text>

            <rect x="305" y="45" width="110" height="70" fill="${combos[1] === 'bb' ? '#78350f' : '#065f46'}" rx="4"/>
            <text x="360" y="88" fill="#ffffff" font-size="18" font-weight="800" text-anchor="middle" font-family="sans-serif">${g1[1]}${g2[0]}</text>

            <rect x="185" y="125" width="110" height="70" fill="${combos[2] === 'bb' ? '#78350f' : '#065f46'}" rx="4"/>
            <text x="240" y="168" fill="#ffffff" font-size="18" font-weight="800" text-anchor="middle" font-family="sans-serif">${g1[0]}${g2[1]}</text>

            <rect x="305" y="125" width="110" height="70" fill="${combos[3] === 'bb' ? '#78350f' : '#065f46'}" rx="4"/>
            <text x="360" y="168" fill="#ffffff" font-size="18" font-weight="800" text-anchor="middle" font-family="sans-serif">${g1[1]}${g2[1]}</text>
          </svg>
        </div>

        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:1rem;margin-bottom:1.5rem;">
          <div style="background:#ffffff;border:1px solid #e2e8f0;border-radius:8px;padding:1.25rem;">
            <label style="display:flex;flex-direction:column;gap:6px;font-weight:700;color:#0f172a;margin-bottom:10px;">
              Parent 1 Genotype:
              <select id="sel-p1" style="min-height:48px;padding:8px 12px;border:1px solid #cbd5e1;border-radius:6px;font-weight:700;">
                <option value="BB" ${parent1 === 'BB' ? 'selected' : ''}>BB (Homozygous Dominant)</option>
                <option value="Bb" ${parent1 === 'Bb' ? 'selected' : ''}>Bb (Heterozygous)</option>
                <option value="bb" ${parent1 === 'bb' ? 'selected' : ''}>bb (Homozygous Recessive)</option>
              </select>
            </label>
            <label style="display:flex;flex-direction:column;gap:6px;font-weight:700;color:#0f172a;">
              Parent 2 Genotype:
              <select id="sel-p2" style="min-height:48px;padding:8px 12px;border:1px solid #cbd5e1;border-radius:6px;font-weight:700;">
                <option value="BB" ${parent2 === 'BB' ? 'selected' : ''}>BB (Homozygous Dominant)</option>
                <option value="Bb" ${parent2 === 'Bb' ? 'selected' : ''}>Bb (Heterozygous)</option>
                <option value="bb" ${parent2 === 'bb' ? 'selected' : ''}>bb (Homozygous Recessive)</option>
              </select>
            </label>
          </div>

          <div style="background:#ffffff;border:1px solid #e2e8f0;border-radius:8px;padding:1.25rem;">
            <h4 style="margin:0 0 8px 0;font-size:1rem;color:#0f172a;">Genotypic Frequency Ledger</h4>
            <div style="font-size:0.95rem;line-height:1.6;color:#334155;">
              <div>• BB Frequency: <strong>${bbCount}/4 (${(bbCount * 25).toFixed(0)}%)</strong></div>
              <div>• Bb Frequency: <strong>${hetCount}/4 (${(hetCount * 25).toFixed(0)}%)</strong></div>
              <div>• bb Frequency: <strong>${recCount}/4 (${(recCount * 25).toFixed(0)}%)</strong></div>
              <div style="margin-top:6px;padding-top:6px;border-top:1px dashed #cbd5e1;color:#047857;font-weight:700;">
                ✓ Classical Mendelian Expectation: ${bbCount}:${hetCount}:${recCount}
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    container.querySelector('#sel-p1')?.addEventListener('change', (e: Event) => {
      parent1 = (e.target as HTMLSelectElement).value;
      render();
    });
    container.querySelector('#sel-p2')?.addEventListener('change', (e: Event) => {
      parent2 = (e.target as HTMLSelectElement).value;
      render();
    });
  };

  render();
  return { dispose: () => {} };
}

export function mountLifeProcessesLabsWorkbench(container: HTMLElement): { dispose: () => void } {
  let lightIntensity = 60;
  let tempC = 25;

  const render = () => {
    // Photosynthesis rate: Michaelis-Menten light curve * bell-shaped temperature curve
    const lightFactor = lightIntensity / (30 + lightIntensity);
    const tempFactor = Math.max(0, 1 - Math.pow((tempC - 30) / 20, 2));
    const rate = 100 * lightFactor * tempFactor;
    const bubbleCount = Math.round(rate / 5);

    container.innerHTML = `
      <div class="g9-labs-workbench" style="background:#f8fafc;border:1px solid #cbd5e1;border-radius:8px;padding:1.5rem;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem;flex-wrap:wrap;gap:8px;">
          <div>
            <h2 style="margin:0;font-size:1.35rem;font-weight:700;color:#0f172a;">Photosynthesis &amp; Enzyme Kinetics Simulator</h2>
            <p style="margin:2px 0 0;font-size:0.95rem;color:#64748b;">Light-Dependent Phase &amp; Thermal Denaturation | Rate = f(Light, Temp, CO₂)</p>
          </div>
          <span style="font-size:0.875rem;font-weight:700;color:#047857;background:#d1fae5;padding:2px 8px;border-radius:4px;">A50 / A54 Model</span>
        </div>

        <div style="background:#ffffff;border:1px solid #e2e8f0;border-radius:8px;padding:1.25rem;margin-bottom:1.5rem;">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.75rem;flex-wrap:wrap;gap:8px;">
            <h3 style="margin:0;font-size:1.15rem;font-weight:700;color:#0f172a;">Hydrilla Plant Oxygen Production Chamber</h3>
            <div style="display:flex;gap:12px;font-size:0.875rem;font-weight:600;">
              <span style="color:#0284c7;">● O₂ Bubble Rate: ${bubbleCount} bubbles/min</span>
              <span style="color:#10b981;">▲ Photosynthetic Output: ${rate.toFixed(1)}%</span>
            </div>
          </div>

          <svg viewBox="0 0 600 240" style="width:100%;max-height:260px;background:#0f172a;border-radius:6px;display:block;">
            <!-- Beaker with Water -->
            <rect x="180" y="50" width="240" height="160" fill="#0284c7" fill-opacity="0.25" stroke="#38bdf8" stroke-width="2" rx="4"/>
            <!-- Funnel & Test Tube -->
            <polygon points="260,190 340,190 310,120 290,120" fill="#047857" fill-opacity="0.4" stroke="#10b981" stroke-width="2"/>
            <rect x="290" y="40" width="20" height="90" fill="#ffffff" fill-opacity="0.2" stroke="#e2e8f0" stroke-width="2"/>

            <!-- Oxygen Bubbles -->
            ${Array.from({ length: Math.min(15, bubbleCount) }).map((_, i) => `
              <circle cx="${295 + (i % 3) * 5}" cy="${110 - i * 5}" r="3" fill="#38bdf8" fill-opacity="0.8"/>
            `).join('')}

            <!-- Light Source Lamp -->
            <circle cx="80" cy="70" r="25" fill="#facc15" fill-opacity="${lightIntensity / 100}" stroke="#facc15" stroke-width="3"/>
            <text x="80" y="115" fill="#facc15" font-size="11" font-weight="700" text-anchor="middle" font-family="sans-serif">Lamp (${lightIntensity}%)</text>
            <line x1="110" y1="70" x2="180" y2="100" stroke="#facc15" stroke-width="2" stroke-dasharray="4,3" stroke-opacity="${lightIntensity / 100}"/>
          </svg>
        </div>

        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:1rem;">
          <div style="background:#ffffff;border:1px solid #e2e8f0;border-radius:8px;padding:1.25rem;">
            <label style="display:flex;flex-direction:column;gap:6px;font-size:0.9rem;font-weight:700;color:#0f172a;margin-bottom:12px;">
              <span>Light Intensity: <strong style="color:#d97706;">${lightIntensity}%</strong></span>
              <input type="range" id="rng-light" min="0" max="100" step="5" value="${lightIntensity}" style="min-height:48px;"/>
            </label>
            <label style="display:flex;flex-direction:column;gap:6px;font-size:0.9rem;font-weight:700;color:#0f172a;">
              <span>Temperature: <strong style="color:#0284c7;">${tempC}°C</strong> (Optimum: 30°C)</span>
              <input type="range" id="rng-temp" min="10" max="50" step="1" value="${tempC}" style="min-height:48px;"/>
            </label>
          </div>

          <div style="background:#ffffff;border:1px solid #e2e8f0;border-radius:8px;padding:1.25rem;">
            <h4 style="margin:0 0 8px 0;font-size:1rem;color:#0f172a;">Biochemical Law Ledger</h4>
            <div style="font-size:0.95rem;line-height:1.6;color:#334155;">
              <div>• Limiting Factor: <strong>${lightIntensity < 40 ? 'Light Intensity' : tempC > 40 ? 'Thermal Denaturation' : 'CO₂ Substrate'}</strong></div>
              <div>• Enzyme State: <strong>${tempC > 42 ? 'Denatured (Inactive)' : tempC < 15 ? 'Sub-optimal (Slow)' : 'Active Conformation'}</strong></div>
              <div style="margin-top:6px;padding-top:6px;border-top:1px dashed #cbd5e1;color:#047857;font-weight:700;">
                ✓ Net Photosynthesis Equation: 6CO₂ + 6H₂O ➔ C₆H₁₂O₆ + 6O₂
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    container.querySelector('#rng-light')?.addEventListener('input', (e: Event) => {
      lightIntensity = Number((e.target as HTMLInputElement).value);
      render();
    });
    container.querySelector('#rng-temp')?.addEventListener('input', (e: Event) => {
      tempC = Number((e.target as HTMLInputElement).value);
      render();
    });
  };

  render();
  return { dispose: () => {} };
}

export function mountGeneralBioLabsWorkbench(container: HTMLElement): { dispose: () => void } {
  return mountGeneticsLabsWorkbench(container);
}

export function mountGeneralChemistryWorkbench(container: HTMLElement): { dispose: () => void } {
  return mountGasLawsWorkbench(container);
}

export function mountGeneralMathematicsWorkbench(container: HTMLElement, onNavigate?: (href: string) => void): { dispose: () => void } {
  const cc = new CirclesMasterController();
  return mountCirclesMaster(container, cc, onNavigate);
}

export function mountFluidsLabsWorkbench(container: HTMLElement): { dispose: () => void } {
  let depthM = 5.0;
  let density = 1000; // kg/m3 (Fresh Water)
  let subVolM3 = 0.05; // m3
  const g = 9.8;
  const P0 = 101.325; // kPa

  const renderWorkbench = () => {
    const pGauge = (density * g * depthM) / 1000; // kPa
    const pAbs = P0 + pGauge; // kPa
    const fbN = density * g * subVolM3; // N
    const blockDensity = 2700; // kg/m3 (Aluminium)
    const blockMass = blockDensity * subVolM3; // kg
    const blockWeight = blockMass * g; // N
    const fApparent = Math.max(0, blockWeight - fbN);

    // SVG visual coordinates
    const fluidH = 180;
    const blockDepthY = 60 + Math.min(120, (depthM / 25) * 120);

    container.innerHTML = `
      <div class="g9-labs-workbench" style="background:#f8fafc;border:1px solid #cbd5e1;border-radius:8px;padding:1.5rem;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem;flex-wrap:wrap;gap:8px;">
          <div>
            <h2 style="margin:0;font-size:1.35rem;font-weight:700;color:#0f172a;">Hydrostatic Pressure &amp; Archimedes Buoyancy Workbench</h2>
            <p style="margin:2px 0 0;font-size:0.95rem;color:#64748b;">Fluid statics: P = P₀ + ρ·g·h | Buoyant Force F_b = ρ_fluid · g · V_sub</p>
          </div>
          <span style="font-size:0.875rem;font-weight:700;color:#0284c7;background:#e0f2fe;padding:2px 8px;border-radius:4px;">A50 / A54 Model</span>
        </div>

        <div style="background:#ffffff;border:1px solid #e2e8f0;border-radius:8px;padding:1.25rem;margin-bottom:1.5rem;">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.75rem;flex-wrap:wrap;gap:8px;">
            <h3 style="margin:0;font-size:1.15rem;font-weight:700;color:#0f172a;">Fluid Column &amp; Submerged Body Equilibrium</h3>
            <div style="display:flex;gap:12px;font-size:0.875rem;font-weight:600;">
              <span style="color:#0284c7;">● Depth h = ${depthM.toFixed(1)} m</span>
              <span style="color:#10b981;">▲ Buoyancy F_b = ${fbN.toFixed(1)} N</span>
              <span style="color:#ef4444;">▼ Weight W = ${blockWeight.toFixed(1)} N</span>
            </div>
          </div>

          <svg viewBox="0 0 600 240" style="width:100%;max-height:260px;background:#0f172a;border-radius:6px;display:block;">
            <!-- Fluid Tank -->
            <rect x="100" y="40" width="400" height="180" fill="#0369a1" fill-opacity="0.35" stroke="#38bdf8" stroke-width="2" rx="4"/>
            <!-- Free Surface -->
            <line x1="100" y1="40" x2="500" y2="40" stroke="#38bdf8" stroke-width="3" stroke-dasharray="4,2"/>
            <text x="510" y="45" fill="#38bdf8" font-size="12" font-family="sans-serif">P₀ = 101.3 kPa</text>

            <!-- Depth Ruler Line -->
            <line x1="130" y1="40" x2="130" y2="${blockDepthY}" stroke="#facc15" stroke-width="2" stroke-dasharray="3,3"/>
            <text x="140" y="${(40 + blockDepthY) / 2}" fill="#facc15" font-size="12" font-weight="700" font-family="sans-serif">h = ${depthM.toFixed(1)} m</text>

            <!-- Submerged Block -->
            <rect x="270" y="${blockDepthY - 20}" width="60" height="40" fill="#94a3b8" stroke="#f1f5f9" stroke-width="2" rx="4"/>
            <text x="300" y="${blockDepthY + 4}" fill="#0f172a" font-size="11" font-weight="800" text-anchor="middle" font-family="sans-serif">V_sub</text>

            <!-- Vectors -->
            <line x1="300" y1="${blockDepthY - 20}" x2="300" y2="${blockDepthY - 20 - Math.min(50, fbN / 50)}" stroke="#10b981" stroke-width="3" marker-end="url(#arrowGreenF)"/>
            <line x1="300" y1="${blockDepthY + 20}" x2="300" y2="${blockDepthY + 20 + Math.min(50, blockWeight / 50)}" stroke="#ef4444" stroke-width="3" marker-end="url(#arrowRedF)"/>

            <defs>
              <marker id="arrowGreenF" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#10b981" />
              </marker>
              <marker id="arrowRedF" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#ef4444" />
              </marker>
            </defs>
          </svg>
        </div>

        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:1rem;margin-bottom:1.5rem;">
          <div style="background:#ffffff;border:1px solid #e2e8f0;border-radius:8px;padding:1.25rem;">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.5rem;">
              <label for="fluids-depth-slider" style="font-weight:700;color:#0f172a;font-size:0.95rem;">Submersion Depth (h):</label>
              <span style="font-weight:800;color:#0284c7;font-size:1.05rem;">${depthM.toFixed(1)} m</span>
            </div>
            <input type="range" id="fluids-depth-slider" min="0" max="25" step="0.5" value="${depthM}" style="width:100%;min-height:${HIT_TARGET_MIN_PX}px;cursor:pointer;">
            <div style="display:flex;justify-content:space-between;font-size:0.8rem;color:#64748b;margin-top:4px;">
              <span>0 m (Surface)</span>
              <span>12.5 m</span>
              <span>25.0 m</span>
            </div>
          </div>

          <div style="background:#ffffff;border:1px solid #e2e8f0;border-radius:8px;padding:1.25rem;">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.5rem;">
              <label for="fluids-density-slider" style="font-weight:700;color:#0f172a;font-size:0.95rem;">Fluid Density (ρ):</label>
              <span style="font-weight:800;color:#0284c7;font-size:1.05rem;">${density.toLocaleString()} kg/m³</span>
            </div>
            <input type="range" id="fluids-density-slider" min="800" max="13600" step="100" value="${density}" style="width:100%;min-height:${HIT_TARGET_MIN_PX}px;cursor:pointer;">
            <div style="display:flex;justify-content:space-between;font-size:0.8rem;color:#64748b;margin-top:4px;">
              <span>800 (Oil)</span>
              <span>1,000 (Water)</span>
              <span>13,600 (Mercury)</span>
            </div>
          </div>
        </div>

        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:0.75rem;">
          <div style="background:#ffffff;border:1px solid #e2e8f0;border-radius:6px;padding:1rem;">
            <span style="font-size:0.8rem;font-weight:700;color:#64748b;">GAUGE PRESSURE</span>
            <div style="font-size:1.25rem;font-weight:800;color:#0f172a;margin:4px 0;">${pGauge.toFixed(2)} kPa</div>
            <span style="font-size:0.8rem;color:#0284c7;">P_gauge = ρ · g · h</span>
          </div>
          <div style="background:#ffffff;border:1px solid #e2e8f0;border-radius:6px;padding:1rem;">
            <span style="font-size:0.8rem;font-weight:700;color:#64748b;">ABSOLUTE PRESSURE</span>
            <div style="font-size:1.25rem;font-weight:800;color:#0f172a;margin:4px 0;">${pAbs.toFixed(2)} kPa</div>
            <span style="font-size:0.8rem;color:#0284c7;">P_abs = P₀ + ρ·g·h</span>
          </div>
          <div style="background:#ffffff;border:1px solid #e2e8f0;border-radius:6px;padding:1rem;">
            <span style="font-size:0.8rem;font-weight:700;color:#64748b;">BUOYANT FORCE</span>
            <div style="font-size:1.25rem;font-weight:800;color:#0f172a;margin:4px 0;">${fbN.toFixed(1)} N</div>
            <span style="font-size:0.8rem;color:#0284c7;">F_b = ρ · g · V_sub</span>
          </div>
          <div style="background:#ffffff;border:1px solid #e2e8f0;border-radius:6px;padding:1rem;">
            <span style="font-size:0.8rem;font-weight:700;color:#64748b;">APPARENT WEIGHT</span>
            <div style="font-size:1.25rem;font-weight:800;color:#0f172a;margin:4px 0;">${fApparent.toFixed(1)} N</div>
            <span style="font-size:0.8rem;color:#0284c7;">W_app = W - F_b</span>
          </div>
        </div>
      </div>
    `;

    container.querySelector('#fluids-depth-slider')?.addEventListener('input', (ev) => {
      depthM = Number((ev.target as HTMLInputElement).value);
      renderWorkbench();
    });
    container.querySelector('#fluids-density-slider')?.addEventListener('input', (ev) => {
      density = Number((ev.target as HTMLInputElement).value);
      renderWorkbench();
    });
  };

  renderWorkbench();
  return { dispose: () => {} };
}

export function mountMotion1dLabsWorkbench(container: HTMLElement): { dispose: () => void } {
  let u = 10.0; // m/s
  let a = -2.5; // m/s2
  let t = 4.0; // s

  const renderWorkbench = () => {
    const v = u + a * t;
    const s = u * t + 0.5 * a * t * t;
    const vSquared = Math.max(0, u * u + 2 * a * s);
    const specWork = 0.5 * (v * v - u * u);

    // SVG coordinates
    const trackWidth = 500;
    const cartX = 300 + Math.max(-250, Math.min(250, s * 4));

    container.innerHTML = `
      <div class="g9-labs-workbench" style="background:#f8fafc;border:1px solid #cbd5e1;border-radius:8px;padding:1.5rem;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem;flex-wrap:wrap;gap:8px;">
          <div>
            <h2 style="margin:0;font-size:1.35rem;font-weight:700;color:#0f172a;">1D Constant Acceleration Kinematics Workbench</h2>
            <p style="margin:2px 0 0;font-size:0.95rem;color:#64748b;">Rectilinear motion: v = u + a·t | s = u·t + ½·a·t² | v² = u² + 2·a·s</p>
          </div>
          <span style="font-size:0.875rem;font-weight:700;color:#0284c7;background:#e0f2fe;padding:2px 8px;border-radius:4px;">A50 / A54 Model</span>
        </div>

        <div style="background:#ffffff;border:1px solid #e2e8f0;border-radius:8px;padding:1.25rem;margin-bottom:1.5rem;">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.75rem;flex-wrap:wrap;gap:8px;">
            <h3 style="margin:0;font-size:1.15rem;font-weight:700;color:#0f172a;">Track Position &amp; Instantaneous Velocity Vector</h3>
            <div style="display:flex;gap:12px;font-size:0.875rem;font-weight:600;">
              <span style="color:#0284c7;">● Displacement s = ${s.toFixed(2)} m</span>
              <span style="color:#10b981;">➔ Velocity v = ${v.toFixed(2)} m/s</span>
              <span style="color:#ec4899;">➔ Acceleration a = ${a.toFixed(2)} m/s²</span>
            </div>
          </div>

          <svg viewBox="0 0 600 200" style="width:100%;max-height:220px;background:#0f172a;border-radius:6px;display:block;">
            <!-- Ground Track -->
            <line x1="50" y1="150" x2="550" y2="150" stroke="#475569" stroke-width="4"/>
            <!-- Track Markings -->
            <line x1="300" y1="140" x2="300" y2="160" stroke="#facc15" stroke-width="2"/>
            <text x="300" y="175" fill="#facc15" font-size="11" font-weight="700" text-anchor="middle" font-family="sans-serif">x = 0</text>
            <line x1="175" y1="145" x2="175" y2="155" stroke="#64748b" stroke-width="1"/>
            <line x1="425" y1="145" x2="425" y2="155" stroke="#64748b" stroke-width="1"/>

            <!-- Moving Cart -->
            <rect x="${cartX - 30}" y="115" width="60" height="30" fill="#0284c7" stroke="#38bdf8" stroke-width="2" rx="4"/>
            <circle cx="${cartX - 18}" cy="148" r="5" fill="#f1f5f9"/>
            <circle cx="${cartX + 18}" cy="148" r="5" fill="#f1f5f9"/>
            <text x="${cartX}" y="134" fill="#ffffff" font-size="11" font-weight="800" text-anchor="middle" font-family="sans-serif">m = 1 kg</text>

            <!-- Velocity Vector -->
            ${v !== 0 ? `
              <line x1="${cartX}" y1="100" x2="${cartX + Math.max(-80, Math.min(80, v * 4))}" y2="100" stroke="#10b981" stroke-width="3" marker-end="url(#arrowGreenM)"/>
              <text x="${cartX + (v > 0 ? 15 : -15)}" y="92" fill="#10b981" font-size="11" font-weight="700" text-anchor="middle" font-family="sans-serif">v = ${v.toFixed(1)} m/s</text>
            ` : ''}

            <defs>
              <marker id="arrowGreenM" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#10b981" />
              </marker>
            </defs>
          </svg>
        </div>

        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:1rem;margin-bottom:1.5rem;">
          <div style="background:#ffffff;border:1px solid #e2e8f0;border-radius:8px;padding:1.25rem;">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.5rem;">
              <label for="m1d-u-slider" style="font-weight:700;color:#0f172a;font-size:0.95rem;">Initial Velocity (u):</label>
              <span style="font-weight:800;color:#0284c7;font-size:1.05rem;">${u.toFixed(1)} m/s</span>
            </div>
            <input type="range" id="m1d-u-slider" min="-20" max="20" step="1" value="${u}" style="width:100%;min-height:${HIT_TARGET_MIN_PX}px;cursor:pointer;">
            <div style="display:flex;justify-content:space-between;font-size:0.8rem;color:#64748b;margin-top:4px;">
              <span>-20 m/s</span>
              <span>0 m/s</span>
              <span>+20 m/s</span>
            </div>
          </div>

          <div style="background:#ffffff;border:1px solid #e2e8f0;border-radius:8px;padding:1.25rem;">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.5rem;">
              <label for="m1d-a-slider" style="font-weight:700;color:#0f172a;font-size:0.95rem;">Acceleration (a):</label>
              <span style="font-weight:800;color:#ec4899;font-size:1.05rem;">${a.toFixed(1)} m/s²</span>
            </div>
            <input type="range" id="m1d-a-slider" min="-10" max="10" step="0.5" value="${a}" style="width:100%;min-height:${HIT_TARGET_MIN_PX}px;cursor:pointer;">
            <div style="display:flex;justify-content:space-between;font-size:0.8rem;color:#64748b;margin-top:4px;">
              <span>-10 m/s²</span>
              <span>0 m/s²</span>
              <span>+10 m/s²</span>
            </div>
          </div>

          <div style="background:#ffffff;border:1px solid #e2e8f0;border-radius:8px;padding:1.25rem;">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.5rem;">
              <label for="m1d-t-slider" style="font-weight:700;color:#0f172a;font-size:0.95rem;">Time Elapsed (t):</label>
              <span style="font-weight:800;color:#0284c7;font-size:1.05rem;">${t.toFixed(1)} s</span>
            </div>
            <input type="range" id="m1d-t-slider" min="0" max="10" step="0.2" value="${t}" style="width:100%;min-height:${HIT_TARGET_MIN_PX}px;cursor:pointer;">
            <div style="display:flex;justify-content:space-between;font-size:0.8rem;color:#64748b;margin-top:4px;">
              <span>0 s</span>
              <span>5 s</span>
              <span>10 s</span>
            </div>
          </div>
        </div>

        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:0.75rem;">
          <div style="background:#ffffff;border:1px solid #e2e8f0;border-radius:6px;padding:1rem;">
            <span style="font-size:0.8rem;font-weight:700;color:#64748b;">FINAL VELOCITY</span>
            <div style="font-size:1.25rem;font-weight:800;color:#0f172a;margin:4px 0;">${v.toFixed(2)} m/s</div>
            <span style="font-size:0.8rem;color:#0284c7;">v = u + a · t</span>
          </div>
          <div style="background:#ffffff;border:1px solid #e2e8f0;border-radius:6px;padding:1rem;">
            <span style="font-size:0.8rem;font-weight:700;color:#64748b;">DISPLACEMENT</span>
            <div style="font-size:1.25rem;font-weight:800;color:#0f172a;margin:4px 0;">${s.toFixed(2)} m</div>
            <span style="font-size:0.8rem;color:#0284c7;">s = u·t + ½·a·t²</span>
          </div>
          <div style="background:#ffffff;border:1px solid #e2e8f0;border-radius:6px;padding:1rem;">
            <span style="font-size:0.8rem;font-weight:700;color:#64748b;">WORK PER UNIT MASS</span>
            <div style="font-size:1.25rem;font-weight:800;color:#0f172a;margin:4px 0;">${specWork.toFixed(2)} J/kg</div>
            <span style="font-size:0.8rem;color:#0284c7;">Δk = ½(v² - u²)</span>
          </div>
          <div style="background:#ffffff;border:1px solid #e2e8f0;border-radius:6px;padding:1rem;">
            <span style="font-size:0.8rem;font-weight:700;color:#64748b;">DIRECTION OF MOTION</span>
            <div style="font-size:1.25rem;font-weight:800;color:#0f172a;margin:4px 0;">${v > 0 ? 'Forward (+x)' : v < 0 ? 'Backward (-x)' : 'Instantaneous Rest'}</div>
            <span style="font-size:0.8rem;color:#0284c7;">Sign of v(t)</span>
          </div>
        </div>
      </div>
    `;

    container.querySelector('#m1d-u-slider')?.addEventListener('input', (ev) => {
      u = Number((ev.target as HTMLInputElement).value);
      renderWorkbench();
    });
    container.querySelector('#m1d-a-slider')?.addEventListener('input', (ev) => {
      a = Number((ev.target as HTMLInputElement).value);
      renderWorkbench();
    });
    container.querySelector('#m1d-t-slider')?.addEventListener('input', (ev) => {
      t = Number((ev.target as HTMLInputElement).value);
      renderWorkbench();
    });
  };

  renderWorkbench();
  return { dispose: () => {} };
}

export function mountNlmLabsWorkbench(container: HTMLElement): { dispose: () => void } {
  let m1 = 4.0; // kg
  let m2 = 6.0; // kg
  const g = 9.8;

  const renderWorkbench = () => {
    const totalMass = m1 + m2;
    const netDrivingForce = Math.abs(m2 - m1) * g;
    const accel = (Math.abs(m2 - m1) / totalMass) * g;
    const tension = (2 * m1 * m2 * g) / totalMass;

    // SVG coordinates
    const leftY = 80 + (m1 > m2 ? 40 : -20);
    const rightY = 80 + (m2 > m1 ? 40 : -20);

    container.innerHTML = `
      <div class="g9-labs-workbench" style="background:#f8fafc;border:1px solid #cbd5e1;border-radius:8px;padding:1.5rem;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem;flex-wrap:wrap;gap:8px;">
          <div>
            <h2 style="margin:0;font-size:1.35rem;font-weight:700;color:#0f172a;">Newton's Second Law &amp; Atwood Machine Workbench</h2>
            <p style="margin:2px 0 0;font-size:0.95rem;color:#64748b;">Pulley Dynamics: a = |m₂ - m₁|·g / (m₁ + m₂) | Tension T = 2·m₁·m₂·g / (m₁ + m₂)</p>
          </div>
          <span style="font-size:0.875rem;font-weight:700;color:#0284c7;background:#e0f2fe;padding:2px 8px;border-radius:4px;">A50 / A54 Model</span>
        </div>

        <div style="background:#ffffff;border:1px solid #e2e8f0;border-radius:8px;padding:1.25rem;margin-bottom:1.5rem;">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.75rem;flex-wrap:wrap;gap:8px;">
            <h3 style="margin:0;font-size:1.15rem;font-weight:700;color:#0f172a;">Pulley Force Balance &amp; Accelerating Inertia</h3>
            <div style="display:flex;gap:12px;font-size:0.875rem;font-weight:600;">
              <span style="color:#0284c7;">● String Tension T = ${tension.toFixed(2)} N</span>
              <span style="color:#10b981;">➔ Accel a = ${accel.toFixed(2)} m/s²</span>
              <span style="color:#ef4444;">▼ Net Driving Force = ${netDrivingForce.toFixed(2)} N</span>
            </div>
          </div>

          <svg viewBox="0 0 600 240" style="width:100%;max-height:260px;background:#0f172a;border-radius:6px;display:block;">
            <!-- Ceiling Support -->
            <rect x="250" y="10" width="100" height="8" fill="#475569"/>
            <line x1="300" y1="18" x2="300" y2="40" stroke="#94a3b8" stroke-width="4"/>

            <!-- Pulley Disc -->
            <circle cx="300" cy="55" r="25" fill="#334155" stroke="#38bdf8" stroke-width="3"/>
            <circle cx="300" cy="55" r="6" fill="#f1f5f9"/>

            <!-- Suspended Strings -->
            <line x1="275" y1="55" x2="275" y2="${leftY}" stroke="#e2e8f0" stroke-width="2"/>
            <line x1="325" y1="55" x2="325" y2="${rightY}" stroke="#e2e8f0" stroke-width="2"/>

            <!-- Left Mass (m1) -->
            <rect x="255" y="${leftY}" width="40" height="35" fill="#0284c7" stroke="#38bdf8" stroke-width="2" rx="4"/>
            <text x="275" y="${leftY + 22}" fill="#ffffff" font-size="11" font-weight="800" text-anchor="middle" font-family="sans-serif">m₁=${m1}k</text>
            <!-- Tension & Gravity Vectors for m1 -->
            <line x1="275" y1="${leftY}" x2="275" y2="${leftY - 25}" stroke="#38bdf8" stroke-width="2.5" marker-end="url(#arrowCyanNLM)"/>
            <line x1="275" y1="${leftY + 35}" x2="275" y2="${leftY + 35 + Math.min(40, m1 * 4)}" stroke="#ef4444" stroke-width="2.5" marker-end="url(#arrowRedNLM)"/>

            <!-- Right Mass (m2) -->
            <rect x="305" y="${rightY}" width="40" height="35" fill="#0369a1" stroke="#38bdf8" stroke-width="2" rx="4"/>
            <text x="325" y="${rightY + 22}" fill="#ffffff" font-size="11" font-weight="800" text-anchor="middle" font-family="sans-serif">m₂=${m2}k</text>
            <!-- Tension & Gravity Vectors for m2 -->
            <line x1="325" y1="${rightY}" x2="325" y2="${rightY - 25}" stroke="#38bdf8" stroke-width="2.5" marker-end="url(#arrowCyanNLM)"/>
            <line x1="325" y1="${rightY + 35}" x2="325" y2="${rightY + 35 + Math.min(40, m2 * 4)}" stroke="#ef4444" stroke-width="2.5" marker-end="url(#arrowRedNLM)"/>

            <defs>
              <marker id="arrowCyanNLM" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#38bdf8" />
              </marker>
              <marker id="arrowRedNLM" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#ef4444" />
              </marker>
            </defs>
          </svg>
        </div>

        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:1rem;margin-bottom:1.5rem;">
          <div style="background:#ffffff;border:1px solid #e2e8f0;border-radius:8px;padding:1.25rem;">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.5rem;">
              <label for="nlm-m1-slider" style="font-weight:700;color:#0f172a;font-size:0.95rem;">Mass 1 (m₁):</label>
              <span style="font-weight:800;color:#0284c7;font-size:1.05rem;">${m1.toFixed(1)} kg</span>
            </div>
            <input type="range" id="nlm-m1-slider" min="1" max="20" step="0.5" value="${m1}" style="width:100%;min-height:${HIT_TARGET_MIN_PX}px;cursor:pointer;">
            <div style="display:flex;justify-content:space-between;font-size:0.8rem;color:#64748b;margin-top:4px;">
              <span>1 kg</span>
              <span>10 kg</span>
              <span>20 kg</span>
            </div>
          </div>

          <div style="background:#ffffff;border:1px solid #e2e8f0;border-radius:8px;padding:1.25rem;">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.5rem;">
              <label for="nlm-m2-slider" style="font-weight:700;color:#0f172a;font-size:0.95rem;">Mass 2 (m₂):</label>
              <span style="font-weight:800;color:#0284c7;font-size:1.05rem;">${m2.toFixed(1)} kg</span>
            </div>
            <input type="range" id="nlm-m2-slider" min="1" max="20" step="0.5" value="${m2}" style="width:100%;min-height:${HIT_TARGET_MIN_PX}px;cursor:pointer;">
            <div style="display:flex;justify-content:space-between;font-size:0.8rem;color:#64748b;margin-top:4px;">
              <span>1 kg</span>
              <span>10 kg</span>
              <span>20 kg</span>
            </div>
          </div>
        </div>

        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:0.75rem;">
          <div style="background:#ffffff;border:1px solid #e2e8f0;border-radius:6px;padding:1rem;">
            <span style="font-size:0.8rem;font-weight:700;color:#64748b;">SYSTEM ACCELERATION</span>
            <div style="font-size:1.25rem;font-weight:800;color:#0f172a;margin:4px 0;">${accel.toFixed(2)} m/s²</div>
            <span style="font-size:0.8rem;color:#0284c7;">a = |m₂-m₁|·g / (m₁+m₂)</span>
          </div>
          <div style="background:#ffffff;border:1px solid #e2e8f0;border-radius:6px;padding:1rem;">
            <span style="font-size:0.8rem;font-weight:700;color:#64748b;">STRING TENSION</span>
            <div style="font-size:1.25rem;font-weight:800;color:#0f172a;margin:4px 0;">${tension.toFixed(2)} N</div>
            <span style="font-size:0.8rem;color:#0284c7;">T = 2·m₁·m₂·g / (m₁+m₂)</span>
          </div>
          <div style="background:#ffffff;border:1px solid #e2e8f0;border-radius:6px;padding:1rem;">
            <span style="font-size:0.8rem;font-weight:700;color:#64748b;">TOTAL INERTIA</span>
            <div style="font-size:1.25rem;font-weight:800;color:#0f172a;margin:4px 0;">${totalMass.toFixed(1)} kg</div>
            <span style="font-size:0.8rem;color:#0284c7;">M_tot = m₁ + m₂</span>
          </div>
          <div style="background:#ffffff;border:1px solid #e2e8f0;border-radius:6px;padding:1rem;">
            <span style="font-size:0.8rem;font-weight:700;color:#64748b;">MOTION REGIME</span>
            <div style="font-size:1.25rem;font-weight:800;color:#0f172a;margin:4px 0;">${m1 === m2 ? 'Static Equilibrium (a=0)' : m2 > m1 ? 'm₂ Descends, m₁ Ascends' : 'm₁ Descends, m₂ Ascends'}</div>
            <span style="font-size:0.8rem;color:#0284c7;">Unbalanced torque</span>
          </div>
        </div>
      </div>
    `;

    container.querySelector('#nlm-m1-slider')?.addEventListener('input', (ev) => {
      m1 = Number((ev.target as HTMLInputElement).value);
      renderWorkbench();
    });
    container.querySelector('#nlm-m2-slider')?.addEventListener('input', (ev) => {
      m2 = Number((ev.target as HTMLInputElement).value);
      renderWorkbench();
    });
  };

  renderWorkbench();
  return { dispose: () => {} };
}

export function mountCircularBankingLabsWorkbench(container: HTMLElement): { dispose: () => void } {
  let R = 80; // m
  let thetaDeg = 20; // degrees
  let mu = 0.20;
  const g = 9.8;

  const renderWorkbench = () => {
    const thetaRad = (thetaDeg * Math.PI) / 180;
    const tanTheta = Math.tan(thetaRad);
    const vDesignMs = Math.sqrt(R * g * tanTheta);
    const vDesignKmh = vDesignMs * 3.6;

    const denomMax = 1 - mu * tanTheta;
    const vMaxMs = denomMax > 0 ? Math.sqrt(R * g * ((tanTheta + mu) / denomMax)) : Infinity;
    const vMaxKmh = Number.isFinite(vMaxMs) ? vMaxMs * 3.6 : 999;

    const denomMin = 1 + mu * tanTheta;
    const vMinMs = tanTheta > mu ? Math.sqrt(R * g * ((tanTheta - mu) / denomMin)) : 0;
    const vMinKmh = vMinMs * 3.6;

    container.innerHTML = `
      <div class="g9-labs-workbench" style="background:#f8fafc;border:1px solid #cbd5e1;border-radius:8px;padding:1.5rem;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem;flex-wrap:wrap;gap:8px;">
          <div>
            <h2 style="margin:0;font-size:1.35rem;font-weight:700;color:#0f172a;">Banked Roadway &amp; Centripetal Dynamics Workbench</h2>
            <p style="margin:2px 0 0;font-size:0.95rem;color:#64748b;">Circular motion on banked curve: v_design = √(R·g·tanθ) | Friction threshold balance</p>
          </div>
          <span style="font-size:0.875rem;font-weight:700;color:#0284c7;background:#e0f2fe;padding:2px 8px;border-radius:4px;">A50 / A54 Model</span>
        </div>

        <div style="background:#ffffff;border:1px solid #e2e8f0;border-radius:8px;padding:1.25rem;margin-bottom:1.5rem;">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.75rem;flex-wrap:wrap;gap:8px;">
            <h3 style="margin:0;font-size:1.15rem;font-weight:700;color:#0f172a;">Incline Geometry &amp; Vector Equilibrium</h3>
            <div style="display:flex;gap:12px;font-size:0.875rem;font-weight:600;">
              <span style="color:#0284c7;">● Design Speed = ${vDesignKmh.toFixed(1)} km/h</span>
              <span style="color:#10b981;">▲ Max Safe = ${vMaxKmh > 500 ? 'No Upper Limit' : vMaxKmh.toFixed(1) + ' km/h'}</span>
              <span style="color:#f59e0b;">▼ Min Safe = ${vMinKmh.toFixed(1)} km/h</span>
            </div>
          </div>

          <svg viewBox="0 0 600 220" style="width:100%;max-height:240px;background:#0f172a;border-radius:6px;display:block;">
            <!-- Banked Road Wedge -->
            <polygon points="100,180 500,180 500,${180 - Math.min(100, Math.tan(thetaRad) * 400)}" fill="#1e293b" stroke="#38bdf8" stroke-width="2"/>
            <!-- Angle Arc -->
            <path d="M 160,180 A 60,60 0 0,0 ${100 + 60 * Math.cos(thetaRad)},${180 - 60 * Math.sin(thetaRad)}" fill="none" stroke="#facc15" stroke-width="2"/>
            <text x="175" y="172" fill="#facc15" font-size="12" font-weight="700" font-family="sans-serif">θ = ${thetaDeg}°</text>

            <!-- Vehicle on Incline -->
            <g transform="translate(320, ${180 - Math.tan(thetaRad) * 220}) rotate(${-thetaDeg})">
              <rect x="-25" y="-20" width="50" height="20" fill="#0284c7" stroke="#38bdf8" stroke-width="2" rx="3"/>
              <!-- Normal Force Vector (perpendicular to road) -->
              <line x1="0" y1="-20" x2="0" y2="-70" stroke="#10b981" stroke-width="3" marker-end="url(#arrowGreenCB)"/>
              <text x="5" y="-55" fill="#10b981" font-size="11" font-weight="700" font-family="sans-serif">N</text>
            </g>

            <defs>
              <marker id="arrowGreenCB" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#10b981" />
              </marker>
            </defs>
          </svg>
        </div>

        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:1rem;margin-bottom:1.5rem;">
          <div style="background:#ffffff;border:1px solid #e2e8f0;border-radius:8px;padding:1.25rem;">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.5rem;">
              <label for="cb-r-slider" style="font-weight:700;color:#0f172a;font-size:0.95rem;">Curve Radius (R):</label>
              <span style="font-weight:800;color:#0284c7;font-size:1.05rem;">${R} m</span>
            </div>
            <input type="range" id="cb-r-slider" min="20" max="200" step="5" value="${R}" style="width:100%;min-height:${HIT_TARGET_MIN_PX}px;cursor:pointer;">
            <div style="display:flex;justify-content:space-between;font-size:0.8rem;color:#64748b;margin-top:4px;">
              <span>20 m (Tight)</span>
              <span>100 m</span>
              <span>200 m (Highway)</span>
            </div>
          </div>

          <div style="background:#ffffff;border:1px solid #e2e8f0;border-radius:8px;padding:1.25rem;">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.5rem;">
              <label for="cb-theta-slider" style="font-weight:700;color:#0f172a;font-size:0.95rem;">Banking Angle (θ):</label>
              <span style="font-weight:800;color:#0284c7;font-size:1.05rem;">${thetaDeg}°</span>
            </div>
            <input type="range" id="cb-theta-slider" min="5" max="45" step="1" value="${thetaDeg}" style="width:100%;min-height:${HIT_TARGET_MIN_PX}px;cursor:pointer;">
            <div style="display:flex;justify-content:space-between;font-size:0.8rem;color:#64748b;margin-top:4px;">
              <span>5° (Gentle)</span>
              <span>20°</span>
              <span>45° (Steep)</span>
            </div>
          </div>

          <div style="background:#ffffff;border:1px solid #e2e8f0;border-radius:8px;padding:1.25rem;">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.5rem;">
              <label for="cb-mu-slider" style="font-weight:700;color:#0f172a;font-size:0.95rem;">Friction Coeff (μ):</label>
              <span style="font-weight:800;color:#0284c7;font-size:1.05rem;">${mu.toFixed(2)}</span>
            </div>
            <input type="range" id="cb-mu-slider" min="0" max="0.8" step="0.05" value="${mu}" style="width:100%;min-height:${HIT_TARGET_MIN_PX}px;cursor:pointer;">
            <div style="display:flex;justify-content:space-between;font-size:0.8rem;color:#64748b;margin-top:4px;">
              <span>0.00 (Ice)</span>
              <span>0.20 (Wet)</span>
              <span>0.80 (Dry)</span>
            </div>
          </div>
        </div>

        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:0.75rem;">
          <div style="background:#ffffff;border:1px solid #e2e8f0;border-radius:6px;padding:1rem;">
            <span style="font-size:0.8rem;font-weight:700;color:#64748b;">DESIGN SPEED (NO FRICTION)</span>
            <div style="font-size:1.25rem;font-weight:800;color:#0f172a;margin:4px 0;">${vDesignKmh.toFixed(1)} km/h</div>
            <span style="font-size:0.8rem;color:#0284c7;">v_opt = √(R·g·tanθ)</span>
          </div>
          <div style="background:#ffffff;border:1px solid #e2e8f0;border-radius:6px;padding:1rem;">
            <span style="font-size:0.8rem;font-weight:700;color:#64748b;">MAX SAFE SPEED</span>
            <div style="font-size:1.25rem;font-weight:800;color:#0f172a;margin:4px 0;">${vMaxKmh > 500 ? 'Unlimited' : vMaxKmh.toFixed(1) + ' km/h'}</div>
            <span style="font-size:0.8rem;color:#0284c7;">v_max with static friction</span>
          </div>
          <div style="background:#ffffff;border:1px solid #e2e8f0;border-radius:6px;padding:1rem;">
            <span style="font-size:0.8rem;font-weight:700;color:#64748b;">MINIMUM SAFE SPEED</span>
            <div style="font-size:1.25rem;font-weight:800;color:#0f172a;margin:4px 0;">${vMinKmh.toFixed(1)} km/h</div>
            <span style="font-size:0.8rem;color:#0284c7;">Prevents inward sliding</span>
          </div>
          <div style="background:#ffffff;border:1px solid #e2e8f0;border-radius:6px;padding:1rem;">
            <span style="font-size:0.8rem;font-weight:700;color:#64748b;">CENTRIPETAL FORCE PROVIDER</span>
            <div style="font-size:1.25rem;font-weight:800;color:#0f172a;margin:4px 0;">N · sin(θ)</div>
            <span style="font-size:0.8rem;color:#0284c7;">Horizontal normal component</span>
          </div>
        </div>
      </div>
    `;

    container.querySelector('#cb-r-slider')?.addEventListener('input', (ev) => {
      R = Number((ev.target as HTMLInputElement).value);
      renderWorkbench();
    });
    container.querySelector('#cb-theta-slider')?.addEventListener('input', (ev) => {
      thetaDeg = Number((ev.target as HTMLInputElement).value);
      renderWorkbench();
    });
    container.querySelector('#cb-mu-slider')?.addEventListener('input', (ev) => {
      mu = Number((ev.target as HTMLInputElement).value);
      renderWorkbench();
    });
  };

  renderWorkbench();
  return { dispose: () => {} };
}


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
  let learnTrySubRole: 'FOUNDATION' | 'THINKING_SKILLS' | 'PRACTICE' | 'CORE1A' | 'PH04' | 'CORE1B' | 'LEARNING_PACKS' | 'CORE1' = 'CORE1A';
  let energyWellDisplacement = 0.0;
  let currentTab = ['questions', 'learn-try', 'explorer', 'labs'].includes(activeTab) ? activeTab : 'questions';
  let selectedWpeBatch: string = 'ALL';
  let questionSearchQuery: string = '';

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
    const isBio = topic.subjectCode.toUpperCase() === 'BIOLOGY' || topic.subjectCode.toUpperCase() === 'BIO' || topic.subjectId.toLowerCase() === 'biology';
    const subjName = isChem ? 'Chemistry' : isMath ? 'Mathematics' : isBio ? 'Biology' : 'Physics';
    const subjRoute = isChem ? '#/subject/chemistry' : isMath ? '#/subject/mathematics' : isBio ? '#/subject/biology' : '#/subject/physics';
    const subjEmoji = isChem ? '🧪 ' : isMath ? '📐 ' : isBio ? '🧬 ' : '⚛️ ';

    root.innerHTML = `
      <div class="g9-topic-workspace" style="background:#ffffff;border:1px solid #e2e8f0;border-radius:12px;padding:1.5rem;max-width:100%;box-sizing:border-box;font-family:var(--g9-font-family,system-ui,-apple-system,sans-serif);font-size:16px;">
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
              <span style="font-size:0.875rem;font-weight:800;color:#0369a1;background:#e0f2fe;padding:2px 8px;border-radius:4px;">${escapeHtml(topic.code)}</span>
              <span class="g9-status-badge" style="font-size:0.875rem;font-weight:700;color:#b45309;background:#fef3c7;padding:2px 8px;border-radius:4px;">Candidate Practice · Rule 13 HOLD</span>
              <span style="font-size:0.875rem;font-weight:600;color:#475569;">12.7" Tablet Workspace</span>
            </div>
            <h1 class="topic-workspace-title" style="margin:0;font-size:1.85rem;font-weight:800;color:#0f172a;">${subjEmoji}${subjName}: ${escapeHtml(topic.title)}</h1>
            <p style="margin:0.25rem 0 0;font-size:1rem;color:#64748b;">Unified workspace across all 7 native curriculum roles</p>
          </div>
          <button type="button" id="g9-return-subject-btn" style="min-height:${HIT_TARGET_MIN_PX}px;padding:8px 16px;background:#f8fafc;color:#0f172a;border:1px solid #cbd5e1;border-radius:6px;cursor:pointer;font-weight:600;font-size:0.95rem;">← Back to ${subjName}</button>
        </div>

        ${topic.code === 'WPE' ? `
        <!-- WPE Chapter Gateway Banner (Zero Iframes · Rule 13 HOLD) -->
        <div class="g9-wpe-gateway-banner" style="background:linear-gradient(135deg,#f0f9ff 0%,#e0f2fe 100%);border:1px solid #bae6fd;border-radius:10px;padding:1.25rem;margin-bottom:1.5rem;box-shadow:0 1px 3px rgba(0,0,0,0.04);">
          <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:1rem;margin-bottom:1rem;">
            <div>
              <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;">
                <span style="background:#0284c7;color:#ffffff;font-size:0.875rem;font-weight:800;padding:2px 8px;border-radius:4px;">CHAPTER GATEWAY</span>
                <span style="background:#fef3c7;color:#b45309;font-size:0.875rem;font-weight:700;padding:2px 8px;border-radius:4px;">Academic HOLD (Rule 13)</span>
                <span style="font-size:0.875rem;color:#0369a1;font-weight:600;">100% Native TypeScript · Zero Iframes</span>
              </div>
              <h2 style="margin:0;font-size:1.35rem;font-weight:800;color:#0c4a6e;">Work, Power &amp; Energy Comprehensive Adoption Suite</h2>
              <p style="margin:0.25rem 0 0;font-size:0.95rem;color:#0369a1;max-width:820px;line-height:1.5;">
                Fully adopted from Grade9v4.0: 78 questions across 5 difficulty batches &amp; authentic PYQs, 42 vector SVG schematics, 5 authored thinking skills (Learn → Challenge), and 21 canonical 6-stage cognitive transfer journeys.
              </p>
            </div>
            <div style="display:flex;gap:8px;align-items:center;font-size:0.875rem;color:#075985;background:#ffffff;padding:8px 14px;border-radius:8px;border:1px solid #cbd5e1;box-shadow:0 1px 2px rgba(0,0,0,0.03);">
              <span>📋 <strong>78</strong> Questions</span> · 
              <span>💡 <strong>21</strong> Journeys</span> · 
              <span>🖼️ <strong>42</strong> SVGs</span>
            </div>
          </div>

          <div style="display:flex;gap:8px;flex-wrap:wrap;">
            <button type="button" id="g9-gw-btn-guided" data-gateway-action="goto-guided" style="min-height:${HIT_TARGET_MIN_PX}px;padding:8px 16px;background:#0284c7;color:#ffffff;border:none;border-radius:6px;font-weight:700;font-size:0.9rem;cursor:pointer;">
              🚀 1. Guided Path (Core 1A: 9 Units)
            </button>
            <button type="button" id="g9-gw-btn-journeys" data-gateway-action="goto-journeys" style="min-height:${HIT_TARGET_MIN_PX}px;padding:8px 16px;background:#ffffff;color:#0284c7;border:1px solid #0284c7;border-radius:6px;font-weight:700;font-size:0.9rem;cursor:pointer;">
              ⚡ 2. 21 Cognitive Journeys (Core 1B)
            </button>
            <button type="button" id="g9-gw-btn-all" data-gateway-action="goto-deck-all" style="min-height:${HIT_TARGET_MIN_PX}px;padding:8px 16px;background:#ffffff;color:#0f172a;border:1px solid #cbd5e1;border-radius:6px;font-weight:600;font-size:0.9rem;cursor:pointer;">
              📋 3. Full Question Bank (All 78)
            </button>
            <button type="button" id="g9-gw-btn-b1" data-gateway-action="goto-deck-b1" style="min-height:${HIT_TARGET_MIN_PX}px;padding:8px 16px;background:#ffffff;color:#0f172a;border:1px solid #cbd5e1;border-radius:6px;font-weight:600;font-size:0.9rem;cursor:pointer;">
              🎯 4. Foundation Batches (B1/B2)
            </button>
            <button type="button" id="g9-gw-btn-b5" data-gateway-action="goto-deck-b5" style="min-height:${HIT_TARGET_MIN_PX}px;padding:8px 16px;background:#ffffff;color:#0f172a;border:1px solid #cbd5e1;border-radius:6px;font-weight:600;font-size:0.9rem;cursor:pointer;">
              🏆 5. Advanced / Olympiad (B4/B5)
            </button>
            <button type="button" id="g9-gw-btn-explorer" data-gateway-action="goto-explorer" style="min-height:${HIT_TARGET_MIN_PX}px;padding:8px 16px;background:#ffffff;color:#0f172a;border:1px solid #cbd5e1;border-radius:6px;font-weight:600;font-size:0.9rem;cursor:pointer;">
              🔬 6. Energy Well Explorer
            </button>
          </div>
        </div>
        ` : ''}

        <!-- 4 Canonical Workspace Tabs -->
        <div class="g9-topic-tabs-bar" style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:1.5rem;border-bottom:2px solid #e2e8f0;padding-bottom:12px;" role="tablist">
          <button type="button" id="g9-tab-btn-questions" data-tab="questions" role="tab" aria-selected="${currentTab === 'questions'}" style="min-height:${HIT_TARGET_MIN_PX}px;padding:10px 18px;background:${currentTab === 'questions' ? '#0284c7' : '#f1f5f9'};color:${currentTab === 'questions' ? '#ffffff' : '#0f172a'};border:none;border-radius:6px;font-weight:700;font-size:0.95rem;cursor:pointer;">1. 📋 Question Bank (Core 2)</button>
          <button type="button" id="g9-tab-btn-learn-try" data-tab="learn-try" role="tab" aria-selected="${currentTab === 'learn-try'}" style="min-height:${HIT_TARGET_MIN_PX}px;padding:10px 18px;background:${currentTab === 'learn-try' ? '#0284c7' : '#f1f5f9'};color:${currentTab === 'learn-try' ? '#ffffff' : '#0f172a'};border:none;border-radius:6px;font-weight:700;font-size:0.95rem;cursor:pointer;">2. 💡 Learn &amp; Try (Core 1A / 1B)</button>
          <button type="button" id="g9-tab-btn-explorer" data-tab="explorer" role="tab" aria-selected="${currentTab === 'explorer'}" style="min-height:${HIT_TARGET_MIN_PX}px;padding:10px 18px;background:${currentTab === 'explorer' ? '#0284c7' : '#f1f5f9'};color:${currentTab === 'explorer' ? '#ffffff' : '#0f172a'};border:none;border-radius:6px;font-weight:700;font-size:0.95rem;cursor:pointer;">3. 🔬 Explorer Simulation</button>
          <button type="button" id="g9-tab-btn-labs" data-tab="labs" role="tab" aria-selected="${currentTab === 'labs'}" style="min-height:${HIT_TARGET_MIN_PX}px;padding:10px 18px;background:${currentTab === 'labs' ? '#0284c7' : '#f1f5f9'};color:${currentTab === 'labs' ? '#ffffff' : '#0f172a'};border:none;border-radius:6px;font-weight:700;font-size:0.95rem;cursor:pointer;">4. 🧰 Standalone Labs</button>
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
    else if (topic.code === 'WPE') deck = WPE_FULL_QUESTION_BANK;
    else if (topic.code === 'POLYNOMIALS') deck = MATH_POLYNOMIALS_DECK;
    else if (topic.code === 'EUCLID') deck = MATH_EUCLID_DECK;
    else if (topic.code === 'RIEMANN') deck = MATH_RIEMANN_DECK;
    else if (topic.code === 'COORD_GEOM') deck = MATH_COORD_GEOM_DECK;
    else if (topic.code === 'THEORY_EQUATIONS') deck = MATH_THEORY_EQUATIONS_DECK;
    else if (topic.code === 'VECTORS') deck = MATH_VECTORS_DECK;
    else if (topic.code === 'LINEAR_EQ') deck = MATH_LINEAR_EQ_DECK;
    else if (topic.code === 'IMO_GRADE9') deck = MATH_IMO_GRADE9_DECK;
    else if (topic.code === 'CHEM_REDOX') deck = CHEM_REDOX_DECK;
    else if (topic.code === 'CHEM_BONDING') deck = CHEM_BONDING_DECK;
    else if (topic.code === 'CHEM_STOICHIOMETRY') deck = CHEM_STOICHIOMETRY_DECK;

    // Check unified database for dynamically registered topic questions
    const dbResults = UNIFIED_QUESTION_DATABASE.query({
      subject: topic.subjectCode,
      topic: topic.code,
      pageSize: 50,
    });
    if (deck.length === 0 && dbResults.items.length > 0) {
      deck = dbResults.items.map(entry => ({
        id: entry.id,
        code: entry.code,
        title: entry.title,
        stemText: entry.stem,
        kind: entry.kind,
        status: entry.status,
        maxPoints: entry.maxPoints,
        keyStatus: 'VERIFIED',
        operation: entry.qrtDemand,
        exam: entry.exam,
        difficulty: entry.difficultyBand,
        sourceProvenance: 'AUTHENTIC_SOURCE_PINNED',
      }));
    }

    const renderQuestionCardHtml = (q: any) => `
      <div class="question-card g9-topic-question-card" style="border:1px solid #cbd5e1;border-radius:8px;padding:1.25rem;background:#ffffff;display:flex;flex-direction:column;justify-content:space-between;box-shadow:0 1px 3px rgba(0,0,0,0.05);">
        <div>
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;flex-wrap:wrap;gap:4px;">
            <span style="font-size:0.875rem;font-weight:800;color:#0284c7;background:#e0f2fe;padding:2px 8px;border-radius:4px;">${escapeHtml(q.code)}</span>
            <div style="display:flex;gap:4px;align-items:center;flex-wrap:wrap;">
              ${q.batch ? `<span style="font-size:0.875rem;font-weight:700;color:#0369a1;background:#e0f2fe;padding:2px 6px;border-radius:4px;">${escapeHtml(q.batch)}</span>` : ''}
              ${q.sourceProvenance === 'AUTHENTIC_SOURCE_PINNED' ? `<span style="font-size:0.875rem;font-weight:700;color:#047857;background:#d1fae5;padding:2px 6px;border-radius:4px;">Authentic (v3.5)</span>` : ''}
              ${q.sourceProvenance === 'SYNTHETIC_DIAGNOSTIC_FIXTURE' ? `<span style="font-size:0.875rem;font-weight:700;color:#0369a1;background:#e0f2fe;padding:2px 6px;border-radius:4px;">SYNTHETIC_DIAGNOSTIC_FIXTURE</span>` : ''}
              <span class="g9-status-badge" style="font-size:0.875rem;font-weight:700;color:#b45309;background:#fef3c7;padding:2px 8px;border-radius:4px;">Candidate Practice · Rule 13 HOLD</span>
            </div>
          </div>

          ${q.figures && q.figures.length && q.figures[0].sourceUrl ? `
            <div style="margin-bottom:10px;height:120px;border:1px solid #e2e8f0;border-radius:6px;background:#f8fafc;display:flex;align-items:center;justify-content:center;overflow:hidden;">
              <img src="${q.figures[0].sourceUrl}" alt="${escapeHtml(q.figures[0].caption || 'Schematic Diagram')}" style="max-height:110px;max-width:100%;object-fit:contain;">
            </div>
          ` : ''}

          <h3 style="margin:0 0 0.5rem;font-size:1.15rem;font-weight:700;color:#0f172a;">${escapeHtml(q.title)}</h3>
          <div style="margin:0 0 1rem;font-size:0.95rem;color:#475569;line-height:1.5;">${renderMathHtml(escapeHtml(q.stemText.slice(0, 120)))}...</div>
          <div style="display:flex;gap:6px;font-size:0.875rem;color:#64748b;margin-bottom:1rem;flex-wrap:wrap;">
            <span style="background:#f1f5f9;padding:2px 6px;border-radius:4px;">Kind: ${escapeHtml(q.kind)}</span>
            <span style="background:#f1f5f9;padding:2px 6px;border-radius:4px;">Max: ${q.maxPoints ?? 5} pts</span>
            ${q.operation ? `<span style="background:#fef3c7;color:#92400e;padding:2px 6px;border-radius:4px;font-weight:600;">Op: ${escapeHtml(q.operation)}</span>` : ''}
            ${q.figures && q.figures.length ? `<span style="background:#ecfdf5;color:#065f46;padding:2px 6px;border-radius:4px;">🖼️ Vector SVG</span>` : ''}
          </div>
        </div>
        <div style="display:flex;flex-direction:column;gap:8px;">
          <button type="button" data-action="open-question" data-mode="CORE2" data-qid="${escapeHtml(q.id)}" style="min-height:${HIT_TARGET_MIN_PX}px;padding:8px 14px;background:#0284c7;color:white;border:none;border-radius:6px;cursor:pointer;font-weight:700;font-size:0.95rem;">Launch Question (Core 2) →</button>
          <div style="display:flex;gap:8px;flex-wrap:wrap;">
            <button type="button" data-action="open-question" data-mode="CORE2A" data-qid="${escapeHtml(q.id)}" style="flex:1;min-height:${HIT_TARGET_MIN_PX}px;padding:6px 12px;background:#f8fafc;color:#0369a1;border:1px solid #cbd5e1;border-radius:6px;cursor:pointer;font-weight:600;font-size:0.875rem;">Core 2A: Practice</button>
            <button type="button" data-action="open-question" data-mode="CORE2B" data-qid="${escapeHtml(q.id)}" style="flex:1;min-height:${HIT_TARGET_MIN_PX}px;padding:6px 12px;background:#fdf4ff;color:#7e22ce;border:1px solid #e9d5ff;border-radius:6px;cursor:pointer;font-weight:600;font-size:0.875rem;">Core 2B: Transfer</button>
          </div>
        </div>
      </div>
    `;

    if (!selectedQuestionId) {
      let displayDeck = deck;
      if (topic.code === 'WPE') {
        if (selectedWpeBatch !== 'ALL') {
          if (selectedWpeBatch === 'DIAGNOSTIC') {
            displayDeck = displayDeck.filter(q => (q as any).sourceProvenance === 'SYNTHETIC_DIAGNOSTIC_FIXTURE');
          } else if (selectedWpeBatch === 'Textbook') {
            displayDeck = displayDeck.filter(q => (q as any).batch === 'TEXTBOOK' || (q as any).batch === 'Textbook' || (q as any).batch === 'CONTROL');
          } else {
            displayDeck = displayDeck.filter(q => (q as any).batch === selectedWpeBatch);
          }
        }
        if (questionSearchQuery.trim()) {
          const ql = questionSearchQuery.toLowerCase();
          displayDeck = displayDeck.filter(q =>
            q.title.toLowerCase().includes(ql) ||
            q.code.toLowerCase().includes(ql) ||
            q.stemText.toLowerCase().includes(ql)
          );
        }
      }

      // Render Question Deck Selection
      container.innerHTML = `
        <div class="g9-question-deck">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem;flex-wrap:wrap;gap:8px;">
            <h2 style="margin:0;font-size:1.35rem;font-weight:700;color:#0f172a;">${escapeHtml(topic.title)} Problem Deck <span id="g9-deck-count">(${displayDeck.length} Items)</span></h2>
            <span style="font-size:0.875rem;color:#64748b;">Commitment required before evaluation · Zero pre-commit leakage</span>
          </div>

          ${topic.code === 'WPE' ? `
          <!-- WPE Batch Filter Bar -->
          <div class="g9-wpe-batch-filters" style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:1.25rem;align-items:center;">
            <span style="font-size:0.875rem;font-weight:700;color:#475569;margin-right:4px;">Filter Batch:</span>
            <button type="button" data-batch-filter="ALL" style="min-height:${HIT_TARGET_MIN_PX}px;padding:6px 12px;background:${selectedWpeBatch === 'ALL' ? '#0284c7' : '#f1f5f9'};color:${selectedWpeBatch === 'ALL' ? '#ffffff' : '#0f172a'};border:1px solid #cbd5e1;border-radius:6px;cursor:pointer;font-weight:700;font-size:0.875rem;">All (78)</button>
            <button type="button" data-batch-filter="B1" style="min-height:${HIT_TARGET_MIN_PX}px;padding:6px 12px;background:${selectedWpeBatch === 'B1' ? '#0284c7' : '#f1f5f9'};color:${selectedWpeBatch === 'B1' ? '#ffffff' : '#0f172a'};border:1px solid #cbd5e1;border-radius:6px;cursor:pointer;font-weight:700;font-size:0.875rem;">B1: Foundation (13)</button>
            <button type="button" data-batch-filter="B2" style="min-height:${HIT_TARGET_MIN_PX}px;padding:6px 12px;background:${selectedWpeBatch === 'B2' ? '#0284c7' : '#f1f5f9'};color:${selectedWpeBatch === 'B2' ? '#ffffff' : '#0f172a'};border:1px solid #cbd5e1;border-radius:6px;cursor:pointer;font-weight:700;font-size:0.875rem;">B2: Friction (13)</button>
            <button type="button" data-batch-filter="B3" style="min-height:${HIT_TARGET_MIN_PX}px;padding:6px 12px;background:${selectedWpeBatch === 'B3' ? '#0284c7' : '#f1f5f9'};color:${selectedWpeBatch === 'B3' ? '#ffffff' : '#0f172a'};border:1px solid #cbd5e1;border-radius:6px;cursor:pointer;font-weight:700;font-size:0.875rem;">B3: Work-Energy (14)</button>
            <button type="button" data-batch-filter="B4" style="min-height:${HIT_TARGET_MIN_PX}px;padding:6px 12px;background:${selectedWpeBatch === 'B4' ? '#0284c7' : '#f1f5f9'};color:${selectedWpeBatch === 'B4' ? '#ffffff' : '#0f172a'};border:1px solid #cbd5e1;border-radius:6px;cursor:pointer;font-weight:700;font-size:0.875rem;">B4: Potential Curves (15)</button>
            <button type="button" data-batch-filter="B5" style="min-height:${HIT_TARGET_MIN_PX}px;padding:6px 12px;background:${selectedWpeBatch === 'B5' ? '#0284c7' : '#f1f5f9'};color:${selectedWpeBatch === 'B5' ? '#ffffff' : '#0f172a'};border:1px solid #cbd5e1;border-radius:6px;cursor:pointer;font-weight:700;font-size:0.875rem;">B5: Olympiad (10)</button>
            <button type="button" data-batch-filter="Textbook" style="min-height:${HIT_TARGET_MIN_PX}px;padding:6px 12px;background:${selectedWpeBatch === 'Textbook' ? '#0284c7' : '#f1f5f9'};color:${selectedWpeBatch === 'Textbook' ? '#ffffff' : '#0f172a'};border:1px solid #cbd5e1;border-radius:6px;cursor:pointer;font-weight:700;font-size:0.875rem;">Textbook / PYQ (9)</button>
            <button type="button" data-batch-filter="DIAGNOSTIC" style="min-height:${HIT_TARGET_MIN_PX}px;padding:6px 12px;background:${selectedWpeBatch === 'DIAGNOSTIC' ? '#0284c7' : '#f1f5f9'};color:${selectedWpeBatch === 'DIAGNOSTIC' ? '#ffffff' : '#0f172a'};border:1px solid #cbd5e1;border-radius:6px;cursor:pointer;font-weight:700;font-size:0.875rem;">Diagnostic (4)</button>
            <input type="text" id="g9-question-search" placeholder="Search questions..." value="${escapeHtml(questionSearchQuery)}" style="min-height:${HIT_TARGET_MIN_PX}px;padding:6px 12px;border:1px solid #cbd5e1;border-radius:6px;font-size:0.875rem;margin-left:auto;min-width:180px;">
          </div>
          ` : ''}

          <div class="g9-questions-grid" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,320px),1fr));gap:1rem;">
            ${displayDeck.map(q => renderQuestionCardHtml(q)).join('')}
          </div>
        </div>
      `;

      // Live search input listener
      const searchInput = container.querySelector<HTMLInputElement>('#g9-question-search');
      if (searchInput) {
        searchInput.addEventListener('input', () => {
          questionSearchQuery = searchInput.value;
          const grid = container.querySelector<HTMLElement>('.g9-questions-grid');
          const countSpan = container.querySelector<HTMLElement>('#g9-deck-count');
          if (grid) {
            let activeDeck = deck;
            if (topic.code === 'WPE') {
              if (selectedWpeBatch !== 'ALL') {
                if (selectedWpeBatch === 'DIAGNOSTIC') {
                  activeDeck = activeDeck.filter(q => (q as any).sourceProvenance === 'SYNTHETIC_DIAGNOSTIC_FIXTURE');
                } else if (selectedWpeBatch === 'Textbook') {
                  activeDeck = activeDeck.filter(q => (q as any).batch === 'TEXTBOOK' || (q as any).batch === 'Textbook' || (q as any).batch === 'CONTROL');
                } else {
                  activeDeck = activeDeck.filter(q => (q as any).batch === selectedWpeBatch);
                }
              }
              if (questionSearchQuery.trim()) {
                const ql = questionSearchQuery.toLowerCase();
                activeDeck = activeDeck.filter(q =>
                  q.title.toLowerCase().includes(ql) ||
                  q.code.toLowerCase().includes(ql) ||
                  q.stemText.toLowerCase().includes(ql)
                );
              }
            }
            if (countSpan) countSpan.textContent = `(${activeDeck.length} Items)`;
            grid.innerHTML = activeDeck.map(q => renderQuestionCardHtml(q)).join('');
          }
        });
      }
    } else {
      // Mount Active Question Workspace with Mode Switcher
      container.innerHTML = `
        <div style="margin-bottom:1.25rem;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;">
          <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;">
            <button type="button" id="g9-back-deck-btn" style="min-height:${HIT_TARGET_MIN_PX}px;padding:8px 16px;background:#f8fafc;color:#0f172a;border:1px solid #cbd5e1;border-radius:6px;cursor:pointer;font-weight:600;">← Back to ${escapeHtml(topic.title)} Question Deck</button>
            <div style="display:flex;gap:6px;background:#f1f5f9;padding:4px;border-radius:6px;" role="group" aria-label="Question Mode">
              <button type="button" data-switch-qmode="CORE2" style="min-height:${HIT_TARGET_MIN_PX}px;padding:6px 12px;background:${activeQuestionMode === 'CORE2' ? '#0284c7' : 'transparent'};color:${activeQuestionMode === 'CORE2' ? '#ffffff' : '#0f172a'};border:none;border-radius:4px;cursor:pointer;font-weight:700;font-size:0.875rem;">Core 2: Question</button>
              <button type="button" data-switch-qmode="CORE2A" style="min-height:${HIT_TARGET_MIN_PX}px;padding:6px 12px;background:${activeQuestionMode === 'CORE2A' ? '#0284c7' : 'transparent'};color:${activeQuestionMode === 'CORE2A' ? '#ffffff' : '#0f172a'};border:none;border-radius:4px;cursor:pointer;font-weight:700;font-size:0.875rem;">Core 2A: Supported</button>
              <button type="button" data-switch-qmode="CORE2B" style="min-height:${HIT_TARGET_MIN_PX}px;padding:6px 12px;background:${activeQuestionMode === 'CORE2B' ? '#0284c7' : 'transparent'};color:${activeQuestionMode === 'CORE2B' ? '#ffffff' : '#0f172a'};border:none;border-radius:4px;cursor:pointer;font-weight:700;font-size:0.875rem;">Core 2B: Transfer</button>
            </div>
          </div>
          <span style="font-size:0.875rem;color:#64748b;">Durable Session Bound (IndexedDB)</span>
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
    const isWpeTopic = topic.code === 'WPE' || topic.id.toLowerCase().includes('wpe');

    container.innerHTML = `
      <div class="g9-learn-try-hub">
        <!-- 3-Role Segmented Selector (Learn & Try Family) -->
        <div style="display:flex;gap:8px;margin-bottom:1.5rem;flex-wrap:wrap;" role="tablist" aria-label="Learn & Try Subroles">
          <button type="button" data-subrole="CORE1" style="min-height:${HIT_TARGET_MIN_PX}px;padding:8px 16px;background:${learnTrySubRole === 'CORE1' ? '#0284c7' : '#f8fafc'};color:${learnTrySubRole === 'CORE1' ? '#ffffff' : '#0f172a'};border:1px solid #cbd5e1;border-radius:6px;cursor:pointer;font-weight:700;">1. Core 1: Reading Orientation</button>
          <button type="button" data-subrole="CORE1A" style="min-height:${HIT_TARGET_MIN_PX}px;padding:8px 16px;background:${learnTrySubRole === 'CORE1A' ? '#0284c7' : '#f8fafc'};color:${learnTrySubRole === 'CORE1A' ? '#ffffff' : '#0f172a'};border:1px solid #cbd5e1;border-radius:6px;cursor:pointer;font-weight:700;">2. Core 1A: Concept Construction (${topic.code === 'WPE' ? '9 Units · 5 Skills' : '9 Units'})</button>
          <button type="button" data-subrole="CORE1B" style="min-height:${HIT_TARGET_MIN_PX}px;padding:8px 16px;background:${learnTrySubRole === 'CORE1B' ? '#0284c7' : '#f8fafc'};color:${learnTrySubRole === 'CORE1B' ? '#ffffff' : '#0f172a'};border:1px solid #cbd5e1;border-radius:6px;cursor:pointer;font-weight:700;">3. Core 1B: ${topic.code === 'EUCLID' ? 'Deductive Proof Workspace (A27)' : isChemTopic ? 'Chemical Representation Workspace (A28)' : 'Phenomenological Reconstruction & Stylus Ink Workspace (A26)'}</button>
        </div>

        <div id="g9-learn-try-mount-root"></div>
      </div>
    `;

    const subRoot = container.querySelector<HTMLElement>('#g9-learn-try-mount-root')!;

    if (isWpeTopic && learnTrySubRole === 'FOUNDATION') {
      const m = mountWpeFoundationLesson(subRoot, onNavigate);
      activeSubDisposer = () => m.dispose();
      return;
    }
    if (isWpeTopic && learnTrySubRole === 'THINKING_SKILLS') {
      const m = mountWpeThinkingSkillsRunner(subRoot, onNavigate);
      activeSubDisposer = () => m.dispose();
      return;
    }
    if (isWpeTopic && learnTrySubRole === 'PRACTICE') {
      const m = mountWpePracticeChallenge(subRoot, onNavigate);
      activeSubDisposer = () => m.dispose();
      return;
    }
    if (isWpeTopic && learnTrySubRole === 'PH04') {
      const m = mountWpePh04CurricularUnits(subRoot, onNavigate);
      activeSubDisposer = () => m.dispose();
      return;
    }
    if (isWpeTopic && learnTrySubRole === 'LEARNING_PACKS') {
      const m = mountWpeLearningPacksViewer(subRoot, onNavigate);
      activeSubDisposer = () => m.dispose();
      return;
    }

    if (isMathTopic && learnTrySubRole === 'CORE1B') {
      if (topic.code === 'EUCLID') {
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
      } else if (topic.code === 'VECTORS') {
        const c = new VectorAlgebraController();
        const m = mountVectorAlgebraWorkbench(subRoot, c, onNavigate);
        activeSubDisposer = () => m.dispose();
      } else if (topic.code === 'RIEMANN') {
        const pwc = new PortableWorkbenchController(RIEMANN_SUMS_PACKAGE);
        const m = pwc.mount(subRoot);
        activeSubDisposer = () => m.dispose();
      } else if (topic.code === 'IMO_GRADE9') {
        const c = new ImoMasterController();
        const m = mountImoMaster(subRoot, c, onNavigate);
        activeSubDisposer = () => m.dispose();
      } else {
        // POLYNOMIALS, COORD_GEOM, LINEAR_EQ, THEORY_EQUATIONS
        const c = new LinearCoordinatesController();
        const m = mountLinearCoordinatesWorkbench(subRoot, c, onNavigate);
        activeSubDisposer = () => m.dispose();
      }
    } else if (isChemTopic && learnTrySubRole === 'CORE1B') {
      // Mount Chemical Representation Workspace (A28) inside Core 1B Journey
      const chemController = new ChemicalWorkWorkspaceController({
        archetype: 'CHEM_E2',
        initialStructure: {
          format: 'FORMULA',
          data: topic.code === 'CHEM_REDOX' ? 'CrO5' : topic.code === 'CHEM_BONDING' ? 'SF4' : topic.code === 'CHEM_GASES' ? 'CO2' : 'CH3COOH',
          accessibleLabel: '',
        },
        initialEquation: topic.code === 'CHEM_REDOX'
          ? 'Fe2+ + Ce4+ -> Fe3+ + Ce3+'
          : topic.code === 'CHEM_STOICHIOMETRY'
          ? 'CH3COOH + NaOH -> CH3COONa + H2O'
          : topic.code === 'CHEM_GASES'
          ? 'CH4 + 2O2 -> CO2 + 2H2O'
          : 'PCl3 + Cl2 -> PCl5',
      });
      const m = mountChemicalWorkspace(subRoot, chemController, onNavigate);
      activeSubDisposer = () => m.dispose();
    } else if (learnTrySubRole === 'CORE1') {
      const c = new Core1OrientationPageController({ returnRoute: `#/subject/${topic.subjectCode.toLowerCase()}/topic/${topic.code.toLowerCase()}/learn-try` });
      const m = mountCore1Orientation(subRoot, c);
      activeSubDisposer = () => m.dispose();
    } else if (learnTrySubRole === 'CORE1B') {
      if (topic.code === 'WPE') {
        subRoot.innerHTML = `
          <div style="display:flex;flex-direction:column;gap:1.5rem;">
            <div id="g9-wpe-cognitive-journey-slot" class="g9-transfer-page"></div>
            <div style="border-top:1px solid #e2e8f0;padding-top:1.5rem;">
              <h3 style="margin:0 0 0.5rem;font-size:1.15rem;font-weight:700;color:#0f172a;">A26 Stylus Digital Ink &amp; Working Scratchpad</h3>
              <p style="margin:0 0 1rem;font-size:0.9rem;color:#64748b;">Use finger or stylus to sketch free-body diagrams, coordinate axes, and preliminary algebra during cognitive transfer.</p>
              <div id="g9-core1b-ink-slot"></div>
            </div>
          </div>
        `;
        const journeySlot = subRoot.querySelector<HTMLElement>('#g9-wpe-cognitive-journey-slot')!;
        const inkSlot = subRoot.querySelector<HTMLElement>('#g9-core1b-ink-slot')!;

        const scratchpadCtrl = new ScratchpadController(800, 360);
        const inkMount = mountScratchpadWorkspace(inkSlot, scratchpadCtrl, onNavigate);

        const journeyCtrl = new WpeCognitiveJourneyController();
        const jmMount = mountWpeCognitiveJourney(journeySlot, journeyCtrl, onNavigate);

        activeSubDisposer = () => {
          inkMount.dispose();
          jmMount.dispose();
        };
      } else {
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
          await c.initializeSession();
          const m = mountCore1BTransfer(transferSlot, c);
          transferDisposer = () => m.dispose();
        }).catch(err => {
          console.warn('Topic Core 1B transfer session error:', err);
        });

        activeSubDisposer = () => {
          inkMount.dispose();
          if (transferDisposer) transferDisposer();
        };
      }
    } else if (isChemTopic && learnTrySubRole === 'CORE1A') {
      let derivationPath = './chemistry/redox/core1a.html';
      let derivationTitle = 'Redox Reactions & Electron Transfer';
      if (topic.code === 'CHEM_BONDING') {
        derivationPath = './chemistry/bonding/core1a.html';
        derivationTitle = 'Chemical Bonding & Molecular Structure';
      } else if (topic.code === 'CHEM_GASES') {
        derivationPath = './chemistry/gases/core1a.html';
        derivationTitle = 'Behaviour of Gases & Thermodynamics';
      } else if (topic.code === 'CHEM_STOICHIOMETRY') {
        derivationPath = './chemistry/some-basic-concepts/core1a.html';
        derivationTitle = 'Mole Concept & Stoichiometry';
      }

      const getChemCore1AContent = (code: string): string => {
        if (code === 'CHEM_REDOX') {
          return `
            <div class="core1a-derivation-body" style="display:flex;flex-direction:column;gap:1.25rem;line-height:1.6;color:#1e293b;">
              <div style="background:#f1f5f9;border-left:4px solid #0284c7;padding:1rem;border-radius:0 8px 8px 0;">
                <h3 style="margin:0 0 0.5rem;font-size:1.15rem;color:#0f172a;font-weight:700;">1. Fundamental Oxidation Number Priority Ladder</h3>
                <p style="margin:0 0 0.5rem;font-size:0.95rem;">
                  An oxidation state is the hypothetical charge an atom would possess if all bonds to different elements were 100% ionic. Hierarchy rules strictly dictate priority:
                </p>
                <ul style="margin:0;padding-left:1.25rem;font-size:0.9rem;">
                  <li><strong>Rule 1 (Elemental Invariant):</strong> Atoms in elementary form (P₄, S₈, O₂, Cl₂) have oxidation state <strong>0</strong>.</li>
                  <li><strong>Rule 2 (Fluorine Absolute):</strong> Fluorine is always <strong>-1</strong> in all chemical compounds.</li>
                  <li><strong>Rule 3 (Alkali & Alkaline Earth):</strong> Group 1 metals are always <strong>+1</strong>; Group 2 metals are always <strong>+2</strong>.</li>
                  <li><strong>Rule 4 (Hydrogen):</strong> Hydrogen is <strong>+1</strong> with non-metals (HCl, H₂O) and <strong>-1</strong> with active metals (NaH, CaH₂).</li>
                  <li><strong>Rule 5 (Oxygen Hierarchy):</strong> Oxygen is <strong>-2</strong> in oxides, <strong>-1</strong> in peroxides (H₂O₂, BaO₂), <strong>-½</strong> in superoxides (KO₂), and <strong>+2</strong> in OF₂.</li>
                  <li><strong>Rule 6 (Sum Rule):</strong> Algebraic sum of oxidation numbers must equal net species charge: ∑ OS = q.</li>
                </ul>
              </div>

              <div style="background:#f8fafc;border:1px solid #cbd5e1;padding:1rem;border-radius:8px;">
                <h3 style="margin:0 0 0.5rem;font-size:1.15rem;color:#0f172a;font-weight:700;">2. Disproportionation & Comproportionation Mechanism</h3>
                <p style="margin:0 0 0.5rem;font-size:0.95rem;">
                  In <em>disproportionation</em>, an element in an intermediate oxidation state simultaneously undergoes self-oxidation and self-reduction into higher and lower states:
                </p>
                <div style="background:#ffffff;border:1px solid #e2e8f0;padding:0.75rem 1rem;border-radius:6px;font-family:var(--g9-font-mono, monospace);font-size:0.95rem;margin-bottom:0.5rem;">
                  2 H₂O₂ (O at -1) ───► 2 H₂O (O at -2, reduction) + O₂ (O at 0, oxidation)
                </div>
                <p style="margin:0;font-size:0.9rem;color:#475569;">
                  <em>Comproportionation</em> is the reverse process: two distinct species containing the same element in different oxidation states react to yield a single species with an intermediate state (e.g., IO₃⁻ (+5) + 5 I⁻ (-1) + 6 H⁺ ──► 3 I₂ (0) + 3 H₂O).
                </p>
              </div>

              <div style="background:#fef2f2;border:1px solid #fecaca;padding:1rem;border-radius:8px;">
                <h3 style="margin:0 0 0.5rem;font-size:1.15rem;color:#991b1b;font-weight:700;">3. Diagnostic Misconceptions & IIT-JEE Traps</h3>
                <table style="width:100%;border-collapse:collapse;font-size:0.9rem;text-align:left;">
                  <thead>
                    <tr style="border-bottom:2px solid #f87171;">
                      <th style="padding:6px 8px;color:#991b1b;">Student Misconception</th>
                      <th style="padding:6px 8px;color:#991b1b;">Scientific Reality & Decisive Principle</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style="border-bottom:1px solid #fecaca;">
                      <td style="padding:6px 8px;font-weight:600;">Assuming uniform oxidation numbers for non-equivalent atoms</td>
                      <td style="padding:6px 8px;">In polythionates like S₄O₆²⁻, the central S-S atoms have OS = 0, while terminal sulfonate atoms have OS = +5. The average is +2.5, but authentic individual atoms are 0 and +5.</td>
                    </tr>
                    <tr>
                      <td style="padding:6px 8px;font-weight:600;">Equating oxidation number with formal charge</td>
                      <td style="padding:6px 8px;">Formal charge assumes equal sharing of bonding electrons; oxidation number assumes 100% transfer of bonding electrons to the more electronegative partner.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          `;
        } else if (code === 'CHEM_BONDING') {
          return `
            <div class="core1a-derivation-body" style="display:flex;flex-direction:column;gap:1.25rem;line-height:1.6;color:#1e293b;">
              <div style="background:#f1f5f9;border-left:4px solid #0284c7;padding:1rem;border-radius:0 8px 8px 0;">
                <h3 style="margin:0 0 0.5rem;font-size:1.15rem;color:#0f172a;font-weight:700;">1. 4-Step VSEPR Molecular Geometry Protocol</h3>
                <ol style="margin:0;padding-left:1.25rem;font-size:0.9rem;">
                  <li><strong>Total Valence Pool:</strong> Calculate V_total = ∑ V_atoms - q_cation + q_anion.</li>
                  <li><strong>Skeleton Construction:</strong> Place the least electronegative atom in the center and connect ligands via single σ-bonds.</li>
                  <li><strong>Steric Number (SN):</strong> Count total electron domains: SN = (Number of bonded atoms) + (Lone pairs on central atom).</li>
                  <li><strong>Domain Geometry vs Molecular Shape:</strong> Electron repulsion order: <strong>lp-lp &gt; lp-bp &gt; bp-bp</strong>. Lone pairs compress adjacent bond angles (e.g., CH₄: 109.5°, NH₃: 107.0°, H₂O: 104.5°).</li>
                </ol>
              </div>

              <div style="background:#f8fafc;border:1px solid #cbd5e1;padding:1rem;border-radius:8px;">
                <h3 style="margin:0 0 0.5rem;font-size:1.15rem;color:#0f172a;font-weight:700;">2. Canonical Steric Geometry Mapping</h3>
                <table style="width:100%;border-collapse:collapse;font-size:0.875rem;text-align:left;">
                  <thead>
                    <tr style="border-bottom:2px solid #94a3b8;background:#e2e8f0;">
                      <th style="padding:6px 8px;">SN</th>
                      <th style="padding:6px 8px;">Bond Pairs</th>
                      <th style="padding:6px 8px;">Lone Pairs</th>
                      <th style="padding:6px 8px;">Molecular Shape</th>
                      <th style="padding:6px 8px;">Ideal Angle</th>
                      <th style="padding:6px 8px;">Exemplar</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style="border-bottom:1px solid #e2e8f0;"><td>2</td><td>2</td><td>0</td><td>Linear</td><td>180°</td><td>BeCl₂, CO₂</td></tr>
                    <tr style="border-bottom:1px solid #e2e8f0;"><td>3</td><td>3</td><td>0</td><td>Trigonal Planar</td><td>120°</td><td>BF₃, SO₃</td></tr>
                    <tr style="border-bottom:1px solid #e2e8f0;"><td>3</td><td>2</td><td>1</td><td>Bent / Angular</td><td>&lt; 120° (119°)</td><td>SO₂, O₃</td></tr>
                    <tr style="border-bottom:1px solid #e2e8f0;"><td>4</td><td>4</td><td>0</td><td>Tetrahedral</td><td>109.5°</td><td>CH₄, CCl₄</td></tr>
                    <tr style="border-bottom:1px solid #e2e8f0;"><td>4</td><td>3</td><td>1</td><td>Trigonal Pyramidal</td><td>107.0°</td><td>NH₃, PCl₃</td></tr>
                    <tr style="border-bottom:1px solid #e2e8f0;"><td>4</td><td>2</td><td>2</td><td>Bent / V-Shaped</td><td>104.5°</td><td>H₂O, H₂S</td></tr>
                    <tr style="border-bottom:1px solid #e2e8f0;"><td>5</td><td>5</td><td>0</td><td>Trigonal Bipyramidal</td><td>120° (eq), 90° (ax)</td><td>PCl₅</td></tr>
                    <tr style="border-bottom:1px solid #e2e8f0;"><td>5</td><td>4</td><td>1</td><td>See-Saw</td><td>&lt; 120°, &lt; 90°</td><td>SF₄</td></tr>
                    <tr style="border-bottom:1px solid #e2e8f0;"><td>5</td><td>2</td><td>3</td><td>Linear</td><td>180°</td><td>XeF₂, I₃⁻</td></tr>
                    <tr><td>6</td><td>6</td><td>0</td><td>Octahedral</td><td>90°</td><td>SF₆</td></tr>
                  </tbody>
                </table>
              </div>

              <div style="background:#fef2f2;border:1px solid #fecaca;padding:1rem;border-radius:8px;">
                <h3 style="margin:0 0 0.5rem;font-size:1.15rem;color:#991b1b;font-weight:700;">3. Dipole Moment Vector Algebra: NH₃ vs NF₃</h3>
                <p style="margin:0;font-size:0.9rem;color:#334155;">
                  In NH₃, nitrogen is more electronegative than hydrogen (3.0 vs 2.1), so N-H bond dipoles add constructively in the same direction as the lone pair dipole, resulting in a large net dipole (μ = 1.47 D). In NF₃, fluorine is more electronegative than nitrogen (4.0 vs 3.0), so N-F bond dipoles point downward away from the central atom, largely canceling the upward lone pair dipole and giving an exceptionally small net dipole (μ = 0.24 D).
                </p>
              </div>
            </div>
          `;
        } else if (code === 'CHEM_STOICHIOMETRY') {
          return `
            <div class="core1a-derivation-body" style="display:flex;flex-direction:column;gap:1.25rem;line-height:1.6;color:#1e293b;">
              <div style="background:#f1f5f9;border-left:4px solid #0284c7;padding:1rem;border-radius:0 8px 8px 0;">
                <h3 style="margin:0 0 0.5rem;font-size:1.15rem;color:#0f172a;font-weight:700;">1. The Universal Mole Bridge Hub</h3>
                <p style="margin:0 0 0.5rem;font-size:0.95rem;">
                  A mole is defined as the amount of substance containing exactly 6.02214076 × 10²³ elementary entities (N_A). All quantitative stoichiometric calculations traverse this bridge:
                </p>
                <div style="background:#ffffff;border:1px solid #cbd5e1;padding:0.75rem 1rem;border-radius:6px;font-family:var(--g9-font-mono, monospace);font-size:0.95rem;">
                  n = mass (g) / Molar mass (g/mol) = Number of entities (N) / N_A = Gas Volume at STP (L) / 22.4 L
                </div>
              </div>

              <div style="background:#f8fafc;border:1px solid #cbd5e1;padding:1rem;border-radius:8px;">
                <h3 style="margin:0 0 0.5rem;font-size:1.15rem;color:#0f172a;font-weight:700;">2. Solution Concentration Metrics</h3>
                <ul style="margin:0;padding-left:1.25rem;font-size:0.9rem;">
                  <li><strong>Molarity (M):</strong> M = moles of solute / volume of solution in liters (mol/L). <em>Temperature dependent.</em></li>
                  <li><strong>Molality (m):</strong> m = moles of solute / mass of solvent in kilograms (mol/kg). <em>Temperature independent.</em></li>
                  <li><strong>Mole Fraction (X_A):</strong> X_A = n_A / (n_A + n_B), where ∑ X_i = 1.0.</li>
                  <li><strong>Dilution Equation:</strong> M₁ V₁ = M₂ V₂ (conservation of total solute moles).</li>
                </ul>
              </div>

              <div style="background:#fef2f2;border:1px solid #fecaca;padding:1rem;border-radius:8px;">
                <h3 style="margin:0 0 0.5rem;font-size:1.15rem;color:#991b1b;font-weight:700;">3. Limiting Reagent Determination Algorithm</h3>
                <p style="margin:0 0 0.5rem;font-size:0.9rem;color:#334155;">
                  Given reaction: a A + b B ──► c C + d D.
                </p>
                <ol style="margin:0;padding-left:1.25rem;font-size:0.9rem;">
                  <li>Convert given quantities of all reactants into moles (n_A, n_B).</li>
                  <li>Compute the stoichiometric capacity quotient: Q_A = n_A / a and Q_B = n_B / b.</li>
                  <li>The reactant with the <strong>strictly smaller quotient</strong> is the Limiting Reagent (LR). All theoretical product yields and reactant consumptions must be calculated strictly from this limiting reactant.</li>
                </ol>
              </div>
            </div>
          `;
        } else if (code === 'CHEM_GASES') {
          return `
            <div class="core1a-derivation-body" style="display:flex;flex-direction:column;gap:1.25rem;line-height:1.6;color:#1e293b;">
              <div style="background:#f1f5f9;border-left:4px solid #0284c7;padding:1rem;border-radius:0 8px 8px 0;">
                <h3 style="margin:0 0 0.5rem;font-size:1.15rem;color:#0f172a;font-weight:700;">1. Kinetic Molecular Theory & Speed Distributions</h3>
                <p style="margin:0 0 0.5rem;font-size:0.95rem;">
                  The ideal gas equation PV = nRT derives from microscopic mechanical impacts of point particles. The Maxwell-Boltzmann distribution defines three fundamental characteristic speeds:
                </p>
                <ul style="margin:0;padding-left:1.25rem;font-size:0.9rem;">
                  <li><strong>Most Probable Speed (v_mp):</strong> v_mp = √(2RT / M) ≈ 1.414 √(RT/M)</li>
                  <li><strong>Average Speed (v_avg):</strong> v_avg = √(8RT / πM) ≈ 1.596 √(RT/M)</li>
                  <li><strong>Root Mean Square Speed (v_rms):</strong> v_rms = √(3RT / M) ≈ 1.732 √(RT/M)</li>
                  <li><strong>Canonical Speed Hierarchy:</strong> v_mp &lt; v_avg &lt; v_rms (Ratio: 1 : 1.128 : 1.224).</li>
                </ul>
              </div>

              <div style="background:#f8fafc;border:1px solid #cbd5e1;padding:1rem;border-radius:8px;">
                <h3 style="margin:0 0 0.5rem;font-size:1.15rem;color:#0f172a;font-weight:700;">2. Real Gases: The van der Waals Equation</h3>
                <p style="margin:0 0 0.5rem;font-size:0.95rem;">
                  Real gases deviate from ideality due to molecular volume and intermolecular attractions:
                </p>
                <div style="background:#ffffff;border:1px solid #cbd5e1;padding:0.75rem 1rem;border-radius:6px;font-family:var(--g9-font-mono, monospace);font-size:0.95rem;margin-bottom:0.5rem;">
                  (P + a n² / V²) (V - n b) = n R T
                </div>
                <ul style="margin:0;padding-left:1.25rem;font-size:0.9rem;">
                  <li><strong>Parameter a (units: atm·L²·mol⁻²):</strong> Measures the magnitude of intermolecular attractive forces. Higher 'a' means greater liquefiability.</li>
                  <li><strong>Parameter b (units: L·mol⁻¹):</strong> Excluded volume of finite molecular cores; b = 4 N_A v_molecule.</li>
                  <li><strong>Compressibility Factor (Z):</strong> Z = PV / nRT. At low pressure, Z ≈ 1 - a/(RTV) &lt; 1 (attractive forces dominate). At high pressure, Z ≈ 1 + Pb/(RT) &gt; 1 (repulsive excluded volume dominates).</li>
                </ul>
              </div>

              <div style="background:#fef2f2;border:1px solid #fecaca;padding:1rem;border-radius:8px;">
                <h3 style="margin:0 0 0.5rem;font-size:1.15rem;color:#991b1b;font-weight:700;">3. Critical State Constants & Liquefaction</h3>
                <p style="margin:0;font-size:0.9rem;color:#334155;">
                  According to Andrews isotherms, a gas cannot be liquefied at temperatures above its critical temperature T_c regardless of applied pressure: T_c = 8a / (27Rb), P_c = a / (27b²), V_c = 3b. At the critical point, Z_c = P_c V_c / (R T_c) = 3/8 = 0.375 for all van der Waals gases.
                </p>
              </div>
            </div>
          `;
        }
        return '';
      };

      subRoot.innerHTML = `
        <div class="chem-core1a-panel" style="background:#ffffff;border:1px solid #cbd5e1;border-radius:12px;padding:1.5rem;box-shadow:0 1px 3px rgba(0,0,0,0.05);">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem;flex-wrap:wrap;gap:10px;">
            <div>
              <span style="font-size:0.875rem;font-weight:800;background:#e0f2fe;color:#0369a1;padding:3px 8px;border-radius:4px;">CORE 1A CONCEPT CONSTRUCTION</span>
              <h2 style="margin:0.5rem 0 0;font-size:1.5rem;font-weight:800;color:#0f172a;">${escapeHtml(derivationTitle)}: Core 1A Derivation</h2>
            </div>
            <button type="button" id="btn-open-core1a-doc" style="min-height:${HIT_TARGET_MIN_PX}px;padding:8px 18px;background:#0284c7;color:white;border:none;border-radius:6px;font-weight:700;cursor:pointer;">
              📖 Open Standalone Core 1A Document (v3.5) →
            </button>
          </div>

          <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:1.25rem;margin-bottom:1.25rem;">
            ${getChemCore1AContent(topic.code)}
          </div>

          <div style="display:flex;gap:12px;flex-wrap:wrap;">
            <button type="button" id="btn-try-simulation" style="min-height:${HIT_TARGET_MIN_PX}px;padding:10px 20px;background:#0f172a;color:white;border:none;border-radius:6px;font-weight:700;cursor:pointer;">
              ⚡ Launch Interactive Simulation Suite →
            </button>
            <button type="button" id="btn-goto-core1b" style="min-height:${HIT_TARGET_MIN_PX}px;padding:10px 20px;background:#f1f5f9;color:#0f172a;border:1px solid #cbd5e1;border-radius:6px;font-weight:700;cursor:pointer;">
              Proceed to Core 1B (Chemical Representation) →
            </button>
          </div>
        </div>
      `;

      subRoot.querySelector('#btn-open-core1a-doc')?.addEventListener('click', () => {
        window.location.href = derivationPath;
      });
      subRoot.querySelector('#btn-try-simulation')?.addEventListener('click', () => {
        const tabsBar = root.querySelector('.g9-topic-tabs-bar');
        const expBtn = tabsBar?.querySelector<HTMLButtonElement>('button[data-tab="explorer"]');
        if (expBtn) expBtn.click();
      });
      subRoot.querySelector('#btn-goto-core1b')?.addEventListener('click', () => {
        const bBtn = container.querySelector<HTMLButtonElement>('button[data-subrole="CORE1B"]');
        if (bBtn) bBtn.click();
      });
      activeSubDisposer = () => {};
      return;
    } else if (isMathTopic && learnTrySubRole === 'CORE1A') {
      let derivationPath = './mathematics/polynomials/core1a.html';
      let derivationTitle = 'Polynomials, Remainder & Factor Theorems';
      if (topic.code === 'COORD_GEOM') {
        derivationPath = './mathematics/coordinate-geometry/core1a.html';
        derivationTitle = 'Cartesian Coordinates & Orthogonal Projections';
      } else if (topic.code === 'EUCLID') {
        derivationPath = './mathematics/euclids-geometry/core1a.html';
        derivationTitle = "Euclid's Geometry, Circles & Cyclic Quadrilaterals";
      } else if (topic.code === 'THEORY_EQUATIONS') {
        derivationPath = './mathematics/theory-of-equations/core1a.html';
        derivationTitle = 'Theory of Equations & Quadratic Roots';
      } else if (topic.code === 'VECTORS') {
        derivationPath = './mathematics/vectors/core1a.html';
        derivationTitle = 'Vector Algebra & 3D Spatial Geometry';
      } else if (topic.code === 'LINEAR_EQ') {
        derivationPath = './mathematics/linear-equations/index.html';
        derivationTitle = 'Linear Equations in Two Variables';
      } else if (topic.code === 'RIEMANN') {
        derivationPath = '#/labs/riemann-sums';
        derivationTitle = 'Riemann Sums, Partition Refinement & Integration';
      } else if (topic.code === 'IMO_GRADE9') {
        derivationPath = './mathematics/imo-grade9/index.html';
        derivationTitle = 'Olympiad Inequalities & Competitive Mathematics';
      }

      const getMathCore1AContent = (code: string): string => {
        if (code === 'POLYNOMIALS') {
          return `
            <div class="core1a-derivation-body" style="display:flex;flex-direction:column;gap:1.25rem;line-height:1.6;color:#1e293b;">
              <div style="background:#f1f5f9;border-left:4px solid #0284c7;padding:1rem;border-radius:0 8px 8px 0;">
                <h3 style="margin:0 0 0.5rem;font-size:1.15rem;color:#0f172a;font-weight:700;">1. Degree Classification & Monic Polynomials</h3>
                <p style="margin:0 0 0.5rem;font-size:0.95rem;">
                  A polynomial in one variable x is an expression of the form P(x) = a_n x^n + a_{n-1} x^{n-1} + ... + a_1 x + a_0, where non-zero a_n is the leading coefficient.
                </p>
                <ul style="margin:0;padding-left:1.25rem;font-size:0.9rem;">
                  <li><strong>Degree invariant:</strong> deg(P) = n if a_n ≠ 0. The degree of any non-zero constant polynomial is 0. The zero polynomial 0 has an undefined degree.</li>
                  <li><strong>Standard classification:</strong> Linear (deg 1), Quadratic (deg 2), Cubic (deg 3), Quartic (deg 4).</li>
                  <li><strong>Fundamental Theorem of Algebra:</strong> Every non-zero polynomial of degree n has exactly n complex roots (counted with multiplicity).</li>
                </ul>
              </div>

              <div style="background:#f8fafc;border:1px solid #cbd5e1;padding:1rem;border-radius:8px;">
                <h3 style="margin:0 0 0.5rem;font-size:1.15rem;color:#0f172a;font-weight:700;">2. Remainder Theorem & Factor Theorem</h3>
                <p style="margin:0 0 0.5rem;font-size:0.95rem;">
                  If a polynomial P(x) is divided by a monic linear divisor (x - a), the remainder is the scalar value P(a):
                </p>
                <div style="background:#ffffff;border:1px solid #cbd5e1;padding:0.75rem 1rem;border-radius:6px;font-family:var(--g9-font-mono, monospace);font-size:0.95rem;margin-bottom:0.5rem;">
                  P(x) = (x - a) Q(x) + R &nbsp;⟹&nbsp; P(a) = (a - a) Q(a) + R = R
                </div>
                <ul style="margin:0;padding-left:1.25rem;font-size:0.9rem;">
                  <li><strong>Factor Theorem:</strong> (x - a) is a factor of P(x) if and only if P(a) = 0.</li>
                  <li><strong>Rational Root Theorem:</strong> For integer polynomial P(x), any rational root p/q in lowest terms satisfies p | a_0 and q | a_n.</li>
                </ul>
              </div>

              <div style="background:#fef2f2;border:1px solid #fecaca;padding:1rem;border-radius:8px;">
                <h3 style="margin:0 0 0.5rem;font-size:1.15rem;color:#991b1b;font-weight:700;">3. Cyclic Symmetric Algebraic Identities</h3>
                <p style="margin:0 0 0.5rem;font-size:0.9rem;color:#334155;">
                  The central identity of Olympiad & Grade 9 Algebra:
                </p>
                <div style="background:#ffffff;border:1px solid #fecaca;padding:0.75rem 1rem;border-radius:6px;font-family:var(--g9-font-mono, monospace);font-size:0.9rem;margin-bottom:0.5rem;">
                  x³ + y³ + z³ - 3xyz = (x + y + z)(x² + y² + z² - xy - yz - zx) = ½(x + y + z)[(x - y)² + (y - z)² + (z - x)²]
                </div>
                <p style="margin:0;font-size:0.9rem;color:#334155;">
                  <strong>Vanishing Invariant:</strong> If x + y + z = 0, then x³ + y³ + z³ = 3xyz identically.
                </p>
              </div>
            </div>
          `;
        } else if (code === 'COORD_GEOM') {
          return `
            <div class="core1a-derivation-body" style="display:flex;flex-direction:column;gap:1.25rem;line-height:1.6;color:#1e293b;">
              <div style="background:#f1f5f9;border-left:4px solid #0284c7;padding:1rem;border-radius:0 8px 8px 0;">
                <h3 style="margin:0 0 0.5rem;font-size:1.15rem;color:#0f172a;font-weight:700;">1. Cartesian Coordinate Reference Frame</h3>
                <p style="margin:0 0 0.5rem;font-size:0.95rem;">
                  A Cartesian plane is constructed by two perpendicular real lines intersecting at the Origin O(0,0).
                </p>
                <ul style="margin:0;padding-left:1.25rem;font-size:0.9rem;">
                  <li><strong>Abscissa (x):</strong> Directed distance of point P from the vertical y-axis. Positive to the right, negative to the left.</li>
                  <li><strong>Ordinate (y):</strong> Directed distance of point P from the horizontal x-axis. Positive upward, negative downward.</li>
                  <li><strong>Axis Invariants:</strong> Every point on the x-axis has ordinate y = 0. Every point on the y-axis has abscissa x = 0.</li>
                </ul>
              </div>

              <div style="background:#f8fafc;border:1px solid #cbd5e1;padding:1rem;border-radius:8px;">
                <h3 style="margin:0 0 0.5rem;font-size:1.15rem;color:#0f172a;font-weight:700;">2. Four Quadrants Sign Invariants</h3>
                <table style="width:100%;border-collapse:collapse;font-size:0.875rem;text-align:left;">
                  <thead>
                    <tr style="border-bottom:2px solid #94a3b8;background:#e2e8f0;">
                      <th style="padding:6px 8px;">Quadrant</th>
                      <th style="padding:6px 8px;">Abscissa (x)</th>
                      <th style="padding:6px 8px;">Ordinate (y)</th>
                      <th style="padding:6px 8px;">Coordinate Form</th>
                      <th style="padding:6px 8px;">Exemplar</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style="border-bottom:1px solid #e2e8f0;"><td>Quadrant I</td><td>x > 0 (+)</td><td>y > 0 (+)</td><td>(+, +)</td><td>(3, 5)</td></tr>
                    <tr style="border-bottom:1px solid #e2e8f0;"><td>Quadrant II</td><td>x < 0 (-)</td><td>y > 0 (+)</td><td>(-, +)</td><td>(-4, 2)</td></tr>
                    <tr style="border-bottom:1px solid #e2e8f0;"><td>Quadrant III</td><td>x < 0 (-)</td><td>y < 0 (-)</td><td>(-, -)</td><td>(-2, -7)</td></tr>
                    <tr><td>Quadrant IV</td><td>x > 0 (+)</td><td>y < 0 (-)</td><td>(+, -)</td><td>(6, -3)</td></tr>
                  </tbody>
                </table>
              </div>

              <div style="background:#fef2f2;border:1px solid #fecaca;padding:1rem;border-radius:8px;">
                <h3 style="margin:0 0 0.5rem;font-size:1.15rem;color:#991b1b;font-weight:700;">3. Metric Distance & Section Theorem</h3>
                <p style="margin:0 0 0.5rem;font-size:0.9rem;color:#334155;">
                  Pythagorean Euclidean distance between P(x₁, y₁) and Q(x₂, y₂):
                </p>
                <div style="background:#ffffff;border:1px solid #fecaca;padding:0.75rem 1rem;border-radius:6px;font-family:var(--g9-font-mono, monospace);font-size:0.9rem;margin-bottom:0.5rem;">
                  d(P, Q) = √[(x₂ - x₁)² + (y₂ - y₁)²]
                </div>
                <p style="margin:0;font-size:0.9rem;color:#334155;">
                  Internal division section formula for ratio m:n: R = ((m x₂ + n x₁)/(m + n), (m y₂ + n y₁)/(m + n)). Midpoint formula occurs when m:n = 1:1.
                </p>
              </div>
            </div>
          `;
        } else if (code === 'EUCLID') {
          return `
            <div class="core1a-derivation-body" style="display:flex;flex-direction:column;gap:1.25rem;line-height:1.6;color:#1e293b;">
              <div style="background:#f1f5f9;border-left:4px solid #0284c7;padding:1rem;border-radius:0 8px 8px 0;">
                <h3 style="margin:0 0 0.5rem;font-size:1.15rem;color:#0f172a;font-weight:700;">1. Euclid's Axiomatic Foundations & Postulates</h3>
                <p style="margin:0 0 0.5rem;font-size:0.95rem;">
                  Euclidean deductive geometry rests on undefined primitives (point, line, plane) and unproven intuitive truths:
                </p>
                <ul style="margin:0;padding-left:1.25rem;font-size:0.9rem;">
                  <li><strong>Axiom 1:</strong> Things which are equal to the same thing are equal to one another (Transitivity).</li>
                  <li><strong>Axiom 2 & 3:</strong> If equals are added to/subtracted from equals, the wholes/remainders are equal.</li>
                  <li><strong>Axiom 4:</strong> Things which coincide with one another are equal to one another.</li>
                  <li><strong>Postulate 5 (Parallel Postulate):</strong> If a straight line falling on two straight lines makes interior angles on the same side less than two right angles, the two lines intersect on that side. Playfair's equivalent: Given line L and external point P, exactly one parallel to L passes through P.</li>
                </ul>
              </div>

              <div style="background:#f8fafc;border:1px solid #cbd5e1;padding:1rem;border-radius:8px;">
                <h3 style="margin:0 0 0.5rem;font-size:1.15rem;color:#0f172a;font-weight:700;">2. Inscribed Angle Theorem & Thales's Theorem</h3>
                <p style="margin:0 0 0.5rem;font-size:0.95rem;">
                  The angle subtended by an arc at the center of a circle is twice the angle subtended by it at any point on the remaining part of the circle:
                </p>
                <div style="background:#ffffff;border:1px solid #cbd5e1;padding:0.75rem 1rem;border-radius:6px;font-family:var(--g9-font-mono, monospace);font-size:0.95rem;margin-bottom:0.5rem;">
                  ∠AOB = 2 × ∠APB &nbsp;⟹&nbsp; ∠APB = ½ ∠AOB
                </div>
                <ul style="margin:0;padding-left:1.25rem;font-size:0.9rem;">
                  <li><strong>Angles in the same segment:</strong> All angles subtended by the same arc in the same segment are equal.</li>
                  <li><strong>Thales's Theorem:</strong> An angle inscribed in a semicircle is a right angle (90°), since the central straight angle is 180°.</li>
                </ul>
              </div>

              <div style="background:#fef2f2;border:1px solid #fecaca;padding:1rem;border-radius:8px;">
                <h3 style="margin:0 0 0.5rem;font-size:1.15rem;color:#991b1b;font-weight:700;">3. Cyclic Quadrilaterals & Tangent Orthogonality</h3>
                <ul style="margin:0;padding-left:1.25rem;font-size:0.9rem;color:#334155;">
                  <li><strong>Cyclic Quadrilateral Theorem:</strong> The opposite angles of a cyclic quadrilateral inscribed in a circle sum to 180°: ∠A + ∠C = 180° and ∠B + ∠D = 180°.</li>
                  <li><strong>Tangent Orthogonality:</strong> The tangent at any point P of a circle is perpendicular to the radius OP through the point of contact: OP ⊥ PT.</li>
                  <li><strong>Equilateral Tangent Lengths:</strong> The lengths of tangents drawn from an external point P to a circle are equal: PA = PB.</li>
                </ul>
              </div>
            </div>
          `;
        } else if (code === 'THEORY_EQUATIONS') {
          return `
            <div class="core1a-derivation-body" style="display:flex;flex-direction:column;gap:1.25rem;line-height:1.6;color:#1e293b;">
              <div style="background:#f1f5f9;border-left:4px solid #0284c7;padding:1rem;border-radius:0 8px 8px 0;">
                <h3 style="margin:0 0 0.5rem;font-size:1.15rem;color:#0f172a;font-weight:700;">1. Canonical Quadratic Form & The Discriminant</h3>
                <p style="margin:0 0 0.5rem;font-size:0.95rem;">
                  For a real quadratic equation ax² + bx + c = 0 with a ≠ 0, completing the square gives the quadratic formula x = (-b ± √Δ) / (2a), where the discriminant Δ = b² - 4ac governs the nature of roots:
                </p>
                <ul style="margin:0;padding-left:1.25rem;font-size:0.9rem;">
                  <li><strong>Δ > 0:</strong> Two distinct real roots. If a,b,c ∈ ℚ and Δ is a perfect square, roots are rational; otherwise conjugate irrationals.</li>
                  <li><strong>Δ = 0:</strong> Two real and coincident roots: α = β = -b / (2a). The parabola touches the x-axis.</li>
                  <li><strong>Δ < 0:</strong> No real roots; two strictly complex conjugate roots α, β = u ± iv (v ≠ 0).</li>
                </ul>
              </div>

              <div style="background:#f8fafc;border:1px solid #cbd5e1;padding:1rem;border-radius:8px;">
                <h3 style="margin:0 0 0.5rem;font-size:1.15rem;color:#0f172a;font-weight:700;">2. Vieta's Symmetric Root Relations</h3>
                <p style="margin:0 0 0.5rem;font-size:0.95rem;">
                  If α and β are the roots of ax² + bx + c = 0:
                </p>
                <div style="background:#ffffff;border:1px solid #cbd5e1;padding:0.75rem 1rem;border-radius:6px;font-family:var(--g9-font-mono, monospace);font-size:0.95rem;margin-bottom:0.5rem;">
                  Sum of roots: α + β = -b / a &nbsp;|&nbsp; Product of roots: α · β = c / a
                </div>
                <ul style="margin:0;padding-left:1.25rem;font-size:0.9rem;">
                  <li><strong>Difference of roots:</strong> |α - β| = √[(α + β)² - 4αβ] = √Δ / |a|.</li>
                  <li><strong>Reconstruction of equation:</strong> x² - (α + β) x + αβ = 0.</li>
                  <li><strong>Sum of squares:</strong> α² + β² = (α + β)² - 2αβ = (b² - 2ac) / a².</li>
                </ul>
              </div>

              <div style="background:#fef2f2;border:1px solid #fecaca;padding:1rem;border-radius:8px;">
                <h3 style="margin:0 0 0.5rem;font-size:1.15rem;color:#991b1b;font-weight:700;">3. Common Root Condition (Bézout Resultant)</h3>
                <p style="margin:0;font-size:0.9rem;color:#334155;">
                  Two quadratic equations a₁ x² + b₁ x + c₁ = 0 and a₂ x² + b₂ x + c₂ = 0 possess a common root if and only if:
                  <br><strong>(c₁ a₂ - c₂ a₁)² = (a₁ b₂ - a₂ b₁)(b₁ c₂ - b₂ c₁)</strong>.
                  <br>If both roots are common, coefficients are strictly proportional: a₁/a₂ = b₁/b₂ = c₁/c₂.
                </p>
              </div>
            </div>
          `;
        } else if (code === 'VECTORS') {
          return `
            <div class="core1a-derivation-body" style="display:flex;flex-direction:column;gap:1.25rem;line-height:1.6;color:#1e293b;">
              <div style="background:#f1f5f9;border-left:4px solid #0284c7;padding:1rem;border-radius:0 8px 8px 0;">
                <h3 style="margin:0 0 0.5rem;font-size:1.15rem;color:#0f172a;font-weight:700;">1. Vector Representation & 3D Spatial Geometry</h3>
                <p style="margin:0 0 0.5rem;font-size:0.95rem;">
                  A vector v in ℝ³ is an ordered triplet (v_x, v_y, v_z) represented in the orthonormal basis {î, ĵ, k̂} as v = v_x î + v_y ĵ + v_z k̂.
                </p>
                <ul style="margin:0;padding-left:1.25rem;font-size:0.9rem;">
                  <li><strong>Magnitude (Norm):</strong> ||v|| = √(v_x² + v_y² + v_z²). A unit vector is v̂ = v / ||v||.</li>
                  <li><strong>Direction Cosines:</strong> l = cos α, m = cos β, n = cos γ, satisfying the fundamental identity l² + m² + n² = 1.</li>
                  <li><strong>Linear Combination:</strong> Collinearity of vectors a and b ⟺ a = λ b for scalar λ ≠ 0.</li>
                </ul>
              </div>

              <div style="background:#f8fafc;border:1px solid #cbd5e1;padding:1rem;border-radius:8px;">
                <h3 style="margin:0 0 0.5rem;font-size:1.15rem;color:#0f172a;font-weight:700;">2. Scalar (Dot) Product & Projections</h3>
                <p style="margin:0 0 0.5rem;font-size:0.95rem;">
                  The dot product maps two vectors to a scalar: a · b = ||a|| ||b|| cos θ = a_x b_x + a_y b_y + a_z b_z.
                </p>
                <ul style="margin:0;padding-left:1.25rem;font-size:0.9rem;">
                  <li><strong>Orthogonality Criterion:</strong> Two non-zero vectors a and b are perpendicular ⟺ a · b = 0.</li>
                  <li><strong>Scalar Projection:</strong> The orthogonal projection of a onto b is proj_b(a) = (a · b) / ||b||.</li>
                  <li><strong>Vector Projection:</strong> proj_vec_b(a) = ((a · b) / ||b||²) b.</li>
                </ul>
              </div>

              <div style="background:#fef2f2;border:1px solid #fecaca;padding:1rem;border-radius:8px;">
                <h3 style="margin:0 0 0.5rem;font-size:1.15rem;color:#991b1b;font-weight:700;">3. Vector (Cross) Product & Area Invariant</h3>
                <p style="margin:0 0 0.5rem;font-size:0.9rem;color:#334155;">
                  The cross product produces a vector orthogonal to both operands: a × b = ||a|| ||b|| sin θ n̂.
                </p>
                <ul style="margin:0;padding-left:1.25rem;font-size:0.9rem;color:#334155;">
                  <li><strong>Anticommutativity:</strong> a × b = -(b × a). Non-associative: a × (b × c) ≠ (a × b) × c.</li>
                  <li><strong>Geometric Area:</strong> The area of the parallelogram formed by a and b is ||a × b||. Triangle area = ½ ||a × b||.</li>
                  <li><strong>Scalar Triple Product:</strong> [a b c] = a · (b × c) gives the signed volume of the parallelepiped. Vectors are coplanar ⟺ [a b c] = 0.</li>
                </ul>
              </div>
            </div>
          `;
        } else if (code === 'LINEAR_EQ') {
          return `
            <div class="core1a-derivation-body" style="display:flex;flex-direction:column;gap:1.25rem;line-height:1.6;color:#1e293b;">
              <div style="background:#f1f5f9;border-left:4px solid #0284c7;padding:1rem;border-radius:0 8px 8px 0;">
                <h3 style="margin:0 0 0.5rem;font-size:1.15rem;color:#0f172a;font-weight:700;">1. General Linear Equation in Two Variables</h3>
                <p style="margin:0 0 0.5rem;font-size:0.95rem;">
                  An equation of the form ax + by + c = 0, where a, b, c ∈ ℝ and a² + b² ≠ 0, defines a unique straight line in the Cartesian plane.
                </p>
                <ul style="margin:0;padding-left:1.25rem;font-size:0.9rem;">
                  <li><strong>Solution Set:</strong> Any ordered pair (x₀, y₀) satisfying a x₀ + b y₀ + c = 0 is a point on the line. A single linear equation has infinitely many solutions.</li>
                  <li><strong>Slope-Intercept Form:</strong> y = mx + c', where m = -a/b is the slope and c' = -c/b is the y-intercept.</li>
                  <li><strong>Intercept Form:</strong> x/p + y/q = 1, where p = -c/a is the x-intercept and q = -c/b is the y-intercept. Area of triangle with axes = ½ |p q|.</li>
                </ul>
              </div>

              <div style="background:#f8fafc;border:1px solid #cbd5e1;padding:1rem;border-radius:8px;">
                <h3 style="margin:0 0 0.5rem;font-size:1.15rem;color:#0f172a;font-weight:700;">2. Consistency & Solvability of Linear Systems</h3>
                <p style="margin:0 0 0.5rem;font-size:0.95rem;">
                  For a system of two lines a₁ x + b₁ y + c₁ = 0 and a₂ x + b₂ y + c₂ = 0:
                </p>
                <table style="width:100%;border-collapse:collapse;font-size:0.875rem;text-align:left;">
                  <thead>
                    <tr style="border-bottom:2px solid #94a3b8;background:#e2e8f0;">
                      <th style="padding:6px 8px;">Ratio Test</th>
                      <th style="padding:6px 8px;">Geometric Configuration</th>
                      <th style="padding:6px 8px;">Number of Solutions</th>
                      <th style="padding:6px 8px;">System Consistency</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style="border-bottom:1px solid #e2e8f0;"><td>a₁/a₂ ≠ b₁/b₂</td><td>Intersecting Lines</td><td>Unique Solution</td><td>Consistent & Independent</td></tr>
                    <tr style="border-bottom:1px solid #e2e8f0;"><td>a₁/a₂ = b₁/b₂ = c₁/c₂</td><td>Coincident (Identical) Lines</td><td>Infinitely Many</td><td>Consistent & Dependent</td></tr>
                    <tr><td>a₁/a₂ = b₁/b₂ ≠ c₁/c₂</td><td>Strictly Parallel Lines</td><td>No Solution (Zero)</td><td>Inconsistent</td></tr>
                  </tbody>
                </table>
              </div>

              <div style="background:#fef2f2;border:1px solid #fecaca;padding:1rem;border-radius:8px;">
                <h3 style="margin:0 0 0.5rem;font-size:1.15rem;color:#991b1b;font-weight:700;">3. Algebraic Resolution Protocols</h3>
                <ul style="margin:0;padding-left:1.25rem;font-size:0.9rem;color:#334155;">
                  <li><strong>Substitution Method:</strong> Express one variable in terms of the other from equation 1 and substitute into equation 2.</li>
                  <li><strong>Elimination Method:</strong> Multiply by scaling constants so the coefficients of one variable become additive inverses.</li>
                  <li><strong>Cramer's Determinant Rule:</strong> x = D_x / D, y = D_y / D, where D = a₁ b₂ - a₂ b₂ ≠ 0.</li>
                </ul>
              </div>
            </div>
          `;
        } else if (code === 'RIEMANN') {
          return `
            <div class="core1a-derivation-body" style="display:flex;flex-direction:column;gap:1.25rem;line-height:1.6;color:#1e293b;">
              <div style="background:#f1f5f9;border-left:4px solid #0284c7;padding:1rem;border-radius:0 8px 8px 0;">
                <h3 style="margin:0 0 0.5rem;font-size:1.15rem;color:#0f172a;font-weight:700;">1. Partition of Interval & Darboux Bounds</h3>
                <p style="margin:0 0 0.5rem;font-size:0.95rem;">
                  Let f: [a, b] → ℝ be a bounded function. A partition P is a finite ordered set {a = x₀ < x₁ < ... < x_n = b} with subintervals I_k = [x_{k-1}, x_k] of width Δx_k = x_k - x_{k-1}.
                </p>
                <ul style="margin:0;padding-left:1.25rem;font-size:0.9rem;">
                  <li><strong>Lower Darboux Sum:</strong> L(f, P) = ∑_{k=1}^n m_k Δx_k, where m_k = inf_{x ∈ I_k} f(x).</li>
                  <li><strong>Upper Darboux Sum:</strong> U(f, P) = ∑_{k=1}^n M_k Δx_k, where M_k = sup_{x ∈ I_k} f(x).</li>
                  <li><strong>Fundamental Invariant:</strong> For any partition P, L(f, P) ≤ U(f, P).</li>
                </ul>
              </div>

              <div style="background:#f8fafc;border:1px solid #cbd5e1;padding:1rem;border-radius:8px;">
                <h3 style="margin:0 0 0.5rem;font-size:1.15rem;color:#0f172a;font-weight:700;">2. Partition Refinement & Convergence</h3>
                <p style="margin:0 0 0.5rem;font-size:0.95rem;">
                  If P' is a refinement of P (i.e., P ⊆ P'):
                </p>
                <div style="background:#ffffff;border:1px solid #cbd5e1;padding:0.75rem 1rem;border-radius:6px;font-family:var(--g9-font-mono, monospace);font-size:0.95rem;margin-bottom:0.5rem;">
                  L(f, P) ≤ L(f, P') ≤ U(f, P') ≤ U(f, P)
                </div>
                <p style="margin:0;font-size:0.9rem;color:#334155;">
                  <strong>Riemann Integrability Criterion:</strong> f is Riemann integrable on [a, b] ⟺ for every ε > 0, there exists a partition P such that U(f, P) - L(f, P) < ε.
                </p>
              </div>

              <div style="background:#fef2f2;border:1px solid #fecaca;padding:1rem;border-radius:8px;">
                <h3 style="margin:0 0 0.5rem;font-size:1.15rem;color:#991b1b;font-weight:700;">3. Classical Numerical Quadrature Schemes</h3>
                <ul style="margin:0;padding-left:1.25rem;font-size:0.9rem;color:#334155;">
                  <li><strong>Left & Right Riemann Sums:</strong> Evaluated at left endpoint (x_{k-1}) or right endpoint (x_k) of each subinterval. Error O(1/n).</li>
                  <li><strong>Midpoint Rule:</strong> Evaluated at center point c_k = (x_{k-1} + x_k)/2. Error O(1/n²).</li>
                  <li><strong>Trapezoidal Rule:</strong> Approximates area as trapezoids: T_n = (Δx / 2) [f(x₀) + 2 f(x₁) + ... + 2 f(x_{n-1}) + f(x_n)]. Error O(1/n²).</li>
                </ul>
              </div>
            </div>
          `;
        } else if (code === 'IMO_GRADE9') {
          return `
            <div class="core1a-derivation-body" style="display:flex;flex-direction:column;gap:1.25rem;line-height:1.6;color:#1e293b;">
              <div style="background:#f1f5f9;border-left:4px solid #0284c7;padding:1rem;border-radius:0 8px 8px 0;">
                <h3 style="margin:0 0 0.5rem;font-size:1.15rem;color:#0f172a;font-weight:700;">1. Classical Olympiad Inequalities</h3>
                <p style="margin:0 0 0.5rem;font-size:0.95rem;">
                  Pivotal inequalities underpinning international and national olympiad competitions:
                </p>
                <ul style="margin:0;padding-left:1.25rem;font-size:0.9rem;">
                  <li><strong>AM-GM Inequality:</strong> For any non-negative real numbers x₁, x₂, ..., x_n: (x₁ + x₂ + ... + x_n) / n ≥ (x₁ x₂ ... x_n)^{1/n}, with equality if and only if x₁ = x₂ = ... = x_n.</li>
                  <li><strong>Cauchy-Schwarz Inequality:</strong> (∑ a_i²) (∑ b_i²) ≥ (∑ a_i b_i)², with equality ⟺ a_i / b_i = constant for all i.</li>
                  <li><strong>Nesbitt's Inequality:</strong> For positive a, b, c: a/(b+c) + b/(c+a) + c/(a+b) ≥ 3/2.</li>
                </ul>
              </div>

              <div style="background:#f8fafc;border:1px solid #cbd5e1;padding:1rem;border-radius:8px;">
                <h3 style="margin:0 0 0.5rem;font-size:1.15rem;color:#0f172a;font-weight:700;">2. Number Theory & Modular Arithmetic</h3>
                <p style="margin:0 0 0.5rem;font-size:0.95rem;">
                  Divisibility invariants and modular congruence principles:
                </p>
                <ul style="margin:0;padding-left:1.25rem;font-size:0.9rem;">
                  <li><strong>Euclidean Algorithm & Bézout's Identity:</strong> gcd(a, b) = gcd(b, a mod b). There exist integers x, y such that a x + b y = gcd(a, b).</li>
                  <li><strong>Fermat's Little Theorem:</strong> If p is a prime and gcd(a, p) = 1, then a^{p-1} ≡ 1 (mod p).</li>
                  <li><strong>Chinese Remainder Theorem:</strong> If m₁, m₂, ..., m_k are pairwise coprime, the system x ≡ a_i (mod m_i) has a unique solution modulo M = ∏ m_i.</li>
                </ul>
              </div>

              <div style="background:#fef2f2;border:1px solid #fecaca;padding:1rem;border-radius:8px;">
                <h3 style="margin:0 0 0.5rem;font-size:1.15rem;color:#991b1b;font-weight:700;">3. Combinatorial Reasoning & Invariants</h3>
                <ul style="margin:0;padding-left:1.25rem;font-size:0.9rem;color:#334155;">
                  <li><strong>Pigeonhole Principle (Dirichlet):</strong> If n items are put into m containers with n > m, at least one container must contain at least ⌈n/m⌉ items.</li>
                  <li><strong>Monovariant & Invariant Principle:</strong> In discrete processes, track quantities that remain strictly invariant (parity, modulo) or strictly monotone.</li>
                  <li><strong>Double Counting:</strong> Counting a set of elements or edges in two different ways establishes unexpected identities or inequalities.</li>
                </ul>
              </div>
            </div>
          `;
        }
        return `
          <div class="core1a-derivation-body" style="padding:1rem;background:#f8fafc;border-radius:8px;">
            <p style="margin:0;color:#334155;">Curricular concept construction invariants and formal derivations for Grade 9 Mathematics.</p>
          </div>
        `;
      };

      subRoot.innerHTML = `
        <div class="math-core1a-panel" style="background:#ffffff;border:1px solid #cbd5e1;border-radius:12px;padding:1.5rem;box-shadow:0 1px 3px rgba(0,0,0,0.05);">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem;flex-wrap:wrap;gap:10px;">
            <div>
              <span style="font-size:0.875rem;font-weight:800;background:#e0f2fe;color:#0369a1;padding:3px 8px;border-radius:4px;">CORE 1A CONCEPT CONSTRUCTION</span>
              <h2 style="margin:0.5rem 0 0;font-size:1.5rem;font-weight:800;color:#0f172a;">${escapeHtml(derivationTitle)}: Core 1A Derivation</h2>
            </div>
            <button type="button" id="btn-open-math-core1a-doc" style="min-height:${HIT_TARGET_MIN_PX}px;padding:8px 18px;background:#0284c7;color:white;border:none;border-radius:6px;font-weight:700;cursor:pointer;">
              📖 Open Standalone Core 1A Document (v3.5) →
            </button>
          </div>

          <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:1.25rem;margin-bottom:1.25rem;">
            ${getMathCore1AContent(topic.code)}
          </div>

          <div style="display:flex;gap:12px;flex-wrap:wrap;">
            <button type="button" id="btn-try-math-simulation" style="min-height:${HIT_TARGET_MIN_PX}px;padding:10px 20px;background:#0f172a;color:white;border:none;border-radius:6px;font-weight:700;cursor:pointer;">
              ⚡ Launch Interactive Simulation Suite →
            </button>
            <button type="button" id="btn-goto-math-core1b" style="min-height:${HIT_TARGET_MIN_PX}px;padding:10px 20px;background:#f1f5f9;color:#0f172a;border:1px solid #cbd5e1;border-radius:6px;font-weight:700;cursor:pointer;">
              Proceed to Core 1B (Deductive Transfer &amp; Proof) →
            </button>
          </div>
        </div>
      `;

      subRoot.querySelector('#btn-open-math-core1a-doc')?.addEventListener('click', () => {
        if (derivationPath.startsWith('#')) {
          if (onNavigate) onNavigate(derivationPath.slice(1));
          else window.location.hash = derivationPath;
        } else {
          window.location.href = derivationPath;
        }
      });
      subRoot.querySelector('#btn-try-math-simulation')?.addEventListener('click', () => {
        const tabsBar = root.querySelector('.g9-topic-tabs-bar');
        const expBtn = tabsBar?.querySelector<HTMLButtonElement>('button[data-tab="explorer"]');
        if (expBtn) expBtn.click();
      });
      subRoot.querySelector('#btn-goto-math-core1b')?.addEventListener('click', () => {
        const bBtn = container.querySelector<HTMLButtonElement>('button[data-subrole="CORE1B"]');
        if (bBtn) bBtn.click();
      });
      activeSubDisposer = () => {};
      return;
    } else {
      // Default: Core 1A
      const lessonDef = createDefaultLesson(topic.code);
      const c = new Core1ALessonPageController({ lessonDefinition: lessonDef, topicCode: topic.code });
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
      container.innerHTML = `
        <div style="display:flex;justify-content:space-between;align-items:center;background:#0f172a;color:white;padding:12px 18px;border-radius:8px;margin-bottom:1rem;flex-wrap:wrap;gap:8px;">
          <div>
            <strong>Redox Reactions &amp; Electrochemistry Master Suite</strong> · 9 Canvases (ExamSIDE PYQs, Conveyor, Daniell Cell)
          </div>
          <button type="button" id="btn-topic-launch-redox" style="min-height:${HIT_TARGET_MIN_PX}px;padding:8px 16px;background:#0284c7;color:white;border:none;border-radius:6px;font-weight:700;cursor:pointer;">
            ⚡ Launch Full Master Suite (Standalone) →
          </button>
        </div>
        <div id="g9-chem-submount"></div>
      `;
      container.querySelector('#btn-topic-launch-redox')?.addEventListener('click', () => {
        window.location.href = './chemistry/redox/explorers/redox_reactions/index.html';
      });
      const subSlot = container.querySelector<HTMLElement>('#g9-chem-submount')!;
      const c = new RedoxAdaptiveController();
      const m = mountRedoxAdaptive(subSlot, c, onNavigate);
      activeSubDisposer = () => m.dispose();
      return;
    }

    if (topic.code === 'CHEM_STOICHIOMETRY') {
      container.innerHTML = `
        <div style="display:flex;justify-content:space-between;align-items:center;background:#0f172a;color:white;padding:12px 18px;border-radius:8px;margin-bottom:1rem;flex-wrap:wrap;gap:8px;">
          <div>
            <strong>Mole Concept &amp; Stoichiometry Master Suite</strong> · 7 Canvases (Mole Scale, Limiting Reagent, Eudiometry)
          </div>
          <button type="button" id="btn-topic-launch-mole" style="min-height:${HIT_TARGET_MIN_PX}px;padding:8px 16px;background:#0284c7;color:white;border:none;border-radius:6px;font-weight:700;cursor:pointer;">
            ⚡ Launch Full Master Suite (Standalone) →
          </button>
        </div>
        <div id="g9-chem-submount"></div>
      `;
      container.querySelector('#btn-topic-launch-mole')?.addEventListener('click', () => {
        window.location.href = './chemistry/some-basic-concepts/explorers/mole_concept/index.html';
      });
      const subSlot = container.querySelector<HTMLElement>('#g9-chem-submount')!;
      const c = new TitrationSimulatorController();
      const m = mountTitrationSimulator(subSlot, c, onNavigate);
      activeSubDisposer = () => m.dispose();
      return;
    }

    if (topic.code === 'CHEM_BONDING') {
      container.innerHTML = `
        <div style="display:flex;justify-content:space-between;align-items:center;background:#0f172a;color:white;padding:12px 18px;border-radius:8px;margin-bottom:1rem;flex-wrap:wrap;gap:8px;">
          <div>
            <strong>Chemical Bonding &amp; Molecular Structure 3D Suite</strong> · 7 Canvases (3D VSEPR, Vectorial Dipoles, MOT)
          </div>
          <button type="button" id="btn-topic-launch-bonding" style="min-height:${HIT_TARGET_MIN_PX}px;padding:8px 16px;background:#0284c7;color:white;border:none;border-radius:6px;font-weight:700;cursor:pointer;">
            ⚡ Launch Full Master Suite (Standalone) →
          </button>
        </div>
        <div id="g9-chem-submount"></div>
      `;
      container.querySelector('#btn-topic-launch-bonding')?.addEventListener('click', () => {
        window.location.href = './chemistry/bonding/explorers/chemical_bonding/index.html';
      });
      const subSlot = container.querySelector<HTMLElement>('#g9-chem-submount')!;
      const m = mountChemicalBondingWorkbench(subSlot, undefined, onNavigate);
      activeSubDisposer = () => m.dispose();
      return;
    }

    if (topic.code === 'CHEM_GASES') {
      container.innerHTML = `
        <div style="display:flex;justify-content:space-between;align-items:center;background:#0f172a;color:white;padding:12px 18px;border-radius:8px;margin-bottom:1rem;flex-wrap:wrap;gap:8px;">
          <div>
            <strong>Behaviour of Gases &amp; Real Gases Master Suite</strong> · 7 Canvases (Piston Engine, Maxwell Curve, Z vs P)
          </div>
          <button type="button" id="btn-topic-launch-gases" style="min-height:${HIT_TARGET_MIN_PX}px;padding:8px 16px;background:#0284c7;color:white;border:none;border-radius:6px;font-weight:700;cursor:pointer;">
            ⚡ Launch Full Master Suite (Standalone) →
          </button>
        </div>
        <div id="g9-chem-submount"></div>
      `;
      container.querySelector('#btn-topic-launch-gases')?.addEventListener('click', () => {
        window.location.href = './chemistry/gases/explorers/behaviour_of_gases/index.html';
      });
      const subSlot = container.querySelector<HTMLElement>('#g9-chem-submount')!;
      const m = mountGasLawsWorkbench(subSlot, undefined, onNavigate);
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
      const c = new CirclesMasterController();
      const m = mountCirclesMaster(container, c, onNavigate);
      activeSubDisposer = () => m.dispose();
      return;
    }

    if (topic.subjectCode === 'MATHEMATICS' && topic.code === 'VECTORS') {
      const c = new VectorAlgebraController();
      const m = mountVectorAlgebraWorkbench(container, c, onNavigate);
      activeSubDisposer = () => m.dispose();
      return;
    }

    if (topic.code === 'COORD_GEOM' || topic.code === 'LINEAR_EQ' || topic.code === 'THEORY_EQUATIONS') {
      const c = new LinearCoordinatesController();
      const m = mountLinearCoordinatesWorkbench(container, c, onNavigate);
      activeSubDisposer = () => m.dispose();
      return;
    }

    if (topic.code === 'IMO_GRADE9') {
      const c = new ImoMasterController();
      const m = mountImoMaster(container, c, onNavigate);
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

    if (topic.code === 'GRAVITATION' || topic.id === 'gravitation') {
      container.innerHTML = getGravitationStudyHtml();
      container.querySelector('#btn-grav-tab4-shortcut')?.addEventListener('click', () => {
        const tabsBar = root.querySelector('.g9-topic-tabs-bar');
        const labsBtn = tabsBar?.querySelector<HTMLButtonElement>('button[data-tab="labs"]');
        if (labsBtn) labsBtn.click();
      });
      return;
    }

    if (topic.code === 'FLUIDS') {
      container.innerHTML = getFluidsStudyHtml();
      return;
    }

    if (topic.code === 'MOTION_1D') {
      container.innerHTML = getMotion1DStudyHtml();
      return;
    }

    if (topic.code === 'NLM') {
      container.innerHTML = getNlmStudyHtml();
      return;
    }

    if (topic.code === 'VECTORS') {
      container.innerHTML = getVectorsStudyHtml();
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
  // Tab 4: Standalone Labs (Harmonic Potential Well Analytical Workbench)
  // -------------------------------------------------------------------------
  const mountLabsTab = (container: HTMLElement) => {
    const topic = controller.getViewState().topic || WPE_PHYSICS_TOPIC;
    const isMathTopic = topic.subjectCode.toUpperCase() === 'MATHEMATICS' || topic.subjectId.toLowerCase() === 'mathematics';
    const isChemTopic = topic.subjectCode.toUpperCase() === 'CHEMISTRY' || topic.subjectId.toLowerCase() === 'chemistry';
    const isBioTopic = topic.subjectCode.toUpperCase() === 'BIOLOGY' || topic.subjectCode.toUpperCase() === 'BIO' || topic.subjectId.toLowerCase() === 'biology';

    // 0. Biology Labs
    if (isBioTopic) {
      if (topic.code === 'BIO_GENETICS' || topic.id?.includes('genet')) {
        const w = mountGeneticsLabsWorkbench(container);
        activeSubDisposer = () => w.dispose();
        return;
      }
      if (topic.code === 'BIO_LIFE_PROCESSES' || topic.id?.includes('life')) {
        const w = mountLifeProcessesLabsWorkbench(container);
        activeSubDisposer = () => w.dispose();
        return;
      }
      const w = mountGeneralBioLabsWorkbench(container);
      activeSubDisposer = () => w.dispose();
      return;
    }

    // 1. Chemistry Labs
    if (isChemTopic) {
      if (topic.code === 'CHEM_GASES') {
        const w = mountGasLawsWorkbench(container);
        activeSubDisposer = () => w.dispose();
        return;
      }
      if (topic.code === 'CHEM_BONDING') {
        const w = mountChemicalBondingWorkbench(container);
        activeSubDisposer = () => w.dispose();
        return;
      }
      if (topic.code === 'CHEM_REDOX') {
        const pwc = new PortableWorkbenchController(REDOX_ELECTRON_EQUIVALENCE_PACKAGE);
        const m = pwc.mount(container);
        activeSubDisposer = () => m.dispose();
        return;
      }
      if (topic.code === 'CHEM_STOICHIOMETRY') {
        const tc = new TitrationSimulatorController();
        const m = mountTitrationSimulator(container, tc);
        activeSubDisposer = () => m.dispose();
        return;
      }
      const w = mountGeneralChemistryWorkbench(container);
      activeSubDisposer = () => w.dispose();
      return;
    }

    // 2. Mathematics Labs
    if (isMathTopic) {
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
      if (topic.code === 'EUCLID') {
        const cc = new CirclesMasterController();
        const m = mountCirclesMaster(container, cc, onNavigate);
        activeSubDisposer = () => m.dispose();
        return;
      }
      if (topic.code === 'VECTORS') {
        const vc = new VectorAlgebraController();
        const m = mountVectorAlgebraWorkbench(container, vc, onNavigate);
        activeSubDisposer = () => m.dispose();
        return;
      }
      if (topic.code === 'IMO_GRADE9') {
        const ic = new ImoMasterController();
        const m = mountImoMaster(container, ic, onNavigate);
        activeSubDisposer = () => m.dispose();
        return;
      }
      if (topic.code === 'COORD_GEOM' || topic.code === 'LINEAR_EQ' || topic.code === 'THEORY_EQUATIONS') {
        const lc = new LinearCoordinatesController();
        const m = mountLinearCoordinatesWorkbench(container, lc, onNavigate);
        activeSubDisposer = () => m.dispose();
        return;
      }
      const m = mountGeneralMathematicsWorkbench(container, onNavigate);
      activeSubDisposer = () => m.dispose();
      return;
    }

    // 3. Physics Labs
    if (topic.code === 'GRAVITATION' || topic.id === 'gravitation') {
      const w = mountGravitationLabsWorkbench(container);
      activeSubDisposer = () => w.dispose();
      return;
    }
    if (topic.code === 'FLUIDS' || topic.id === 'fluids') {
      const w = mountFluidsLabsWorkbench(container);
      activeSubDisposer = () => w.dispose();
      return;
    }
    if (topic.code === 'MOTION_1D' || topic.id === 'motion-1d') {
      const w = mountMotion1dLabsWorkbench(container);
      activeSubDisposer = () => w.dispose();
      return;
    }
    if (topic.code === 'NLM' || topic.id === 'nlm') {
      const w = mountNlmLabsWorkbench(container);
      activeSubDisposer = () => w.dispose();
      return;
    }
    if (topic.code === 'CIRCULAR_BANKING' || topic.id === 'circular-banking') {
      const w = mountCircularBankingLabsWorkbench(container);
      activeSubDisposer = () => w.dispose();
      return;
    }
    if (topic.code === 'MOTION_PLANE' || topic.id === 'motion-plane') {
      const pwc = new PortableWorkbenchController(MOTION_SHARED_CLOCK_PACKAGE);
      const m = pwc.mount(container);
      activeSubDisposer = () => m.dispose();
      return;
    }
    if (topic.code === 'VECTORS') {
      const vc = new VectorAlgebraController();
      const m = mountVectorAlgebraWorkbench(container, vc, onNavigate);
      activeSubDisposer = () => m.dispose();
      return;
    }

    // Default Physics Topic: WPE Harmonic Potential Well
    const adapter = new HarmonicEnergyWellAdapter();
    const result = adapter.evaluate({ x: energyWellDisplacement });

    const parabolaPoints: string[] = [];
    for (let xi = -55; xi <= 55; xi += 2) {
      const xVal = xi / 100;
      const px = 300 + xVal * 300;
      const py = 210 - (50 * xVal * xVal) * 10;
      parabolaPoints.push(`${px.toFixed(1)},${py.toFixed(1)}`);
    }
    const parabolaPath = `M ${parabolaPoints.join(' L ')}`;
    const parabolaAreaPath = `M 135,210 L ${parabolaPoints.join(' L ')} L 465,210 Z`;
    const initBx = (300 + energyWellDisplacement * 300).toFixed(1);
    const initBy = (210 - (50 * energyWellDisplacement * energyWellDisplacement) * 10).toFixed(1);
    const initUPct = Math.min(100, Math.max(0, (Number(result.U) / 12.5) * 100)).toFixed(1);
    const initKPct = (100 - Number(initUPct)).toFixed(1);

    container.innerHTML = `
      <div class="g9-labs-workbench" style="background:#f8fafc;border:1px solid #cbd5e1;border-radius:8px;padding:1.5rem;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem;flex-wrap:wrap;gap:8px;">
          <div>
            <h2 style="margin:0;font-size:1.35rem;font-weight:700;color:#0f172a;">Harmonic Potential Well Workbench</h2>
            <p style="margin:2px 0 0;font-size:0.95rem;color:#64748b;">Conservative 1D potential well: U(x) = 50 * x² J | Total Mechanical Energy E = 12.5 J</p>
          </div>
          <span style="font-size:0.875rem;font-weight:700;color:#0284c7;background:#e0f2fe;padding:2px 8px;border-radius:4px;">A50 / A54 Model</span>
        </div>

        <!-- Interactive Potential Energy Well SVG Curve & Real-Time Bead Visualizer -->
        <div style="background:#ffffff;border:1px solid #e2e8f0;border-radius:8px;padding:1.25rem;margin-bottom:1.5rem;">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.75rem;flex-wrap:wrap;gap:8px;">
            <h3 style="margin:0;font-size:1.15rem;font-weight:700;color:#0f172a;">Potential Well Geometry &amp; Energy Dynamics</h3>
            <div style="display:flex;gap:12px;font-size:0.875rem;font-weight:600;flex-wrap:wrap;">
              <span style="color:#2563eb;">● Potential U(x) = 50·x²</span>
              <span style="color:#dc2626;">--- Total Energy E = 12.5 J</span>
              <span style="color:#059669;">■ Kinetic K(x) = E - U(x)</span>
            </div>
          </div>

          <div style="width:100%;max-width:700px;margin:0 auto;overflow:hidden;">
            <svg viewBox="0 0 600 250" style="width:100%;height:auto;display:block;background:#f8fafc;border:1px solid #e2e8f0;border-radius:6px;" aria-label="Harmonic Potential Well Curve U(x) = 50x^2 and Energy Level E = 12.5 J">
              <!-- Parabola shaded area -->
              <path d="${parabolaAreaPath}" fill="rgba(37,99,235,0.06)" />
              
              <!-- Parabola curve -->
              <path d="${parabolaPath}" fill="none" stroke="#2563eb" stroke-width="3" />
              
              <!-- Total Energy E line -->
              <line x1="80" y1="85" x2="520" y2="85" stroke="#dc2626" stroke-width="2" stroke-dasharray="6,4" />
              <text x="85" y="78" fill="#dc2626" font-size="12" font-weight="700">Total Mechanical Energy E = 12.5 J</text>
              
              <!-- Turning Points Markers -->
              <line x1="150" y1="85" x2="150" y2="210" stroke="#ef4444" stroke-width="1.5" stroke-dasharray="4,4" />
              <circle cx="150" cy="85" r="5" fill="#ef4444" />
              <text x="150" y="226" text-anchor="middle" fill="#ef4444" font-size="11" font-weight="700">-0.5m (TP)</text>
              
              <line x1="450" y1="85" x2="450" y2="210" stroke="#ef4444" stroke-width="1.5" stroke-dasharray="4,4" />
              <circle cx="450" cy="85" r="5" fill="#ef4444" />
              <text x="450" y="226" text-anchor="middle" fill="#ef4444" font-size="11" font-weight="700">+0.5m (TP)</text>

              <!-- Equilibrium Center Guide -->
              <line x1="300" y1="40" x2="300" y2="210" stroke="#cbd5e1" stroke-width="1" stroke-dasharray="2,2" />
              <text x="300" y="226" text-anchor="middle" fill="#64748b" font-size="11" font-weight="600">x = 0 (Eq)</text>

              <!-- Coordinate Axes -->
              <line x1="60" y1="210" x2="540" y2="210" stroke="#475569" stroke-width="1.5" />
              <text x="545" y="214" fill="#475569" font-size="12" font-weight="700">x (m)</text>
              <line x1="300" y1="30" x2="300" y2="210" stroke="#94a3b8" stroke-width="1.5" />
              <text x="300" y="22" text-anchor="middle" fill="#2563eb" font-size="12" font-weight="700">U(x) (J)</text>

              <!-- Dynamic Particle Bead and Drop Line -->
              <line id="g9-well-bead-drop" x1="${initBx}" y1="${initBy}" x2="${initBx}" y2="210" stroke="#2563eb" stroke-width="1.5" stroke-dasharray="3,3" />
              <circle id="g9-well-bead" cx="${initBx}" cy="${initBy}" r="8" fill="#2563eb" stroke="#ffffff" stroke-width="2.5" />
              <text id="g9-well-bead-label" x="${initBx}" y="${(Number(initBy) - 12).toFixed(1)}" text-anchor="middle" font-size="12" font-weight="800" fill="#1e40af">x = ${energyWellDisplacement.toFixed(2)}m</text>
            </svg>

            <!-- Stacked Energy Allocation Bar -->
            <div style="margin-top:10px;">
              <div style="display:flex;justify-content:space-between;font-size:0.875rem;font-weight:700;margin-bottom:4px;">
                <span id="g9-well-bar-u-text" style="color:#2563eb;">U: ${Number(result.U).toFixed(1)} J (${initUPct}%)</span>
                <span id="g9-well-bar-k-text" style="color:#059669;">K: ${Number(result.K).toFixed(1)} J (${initKPct}%)</span>
              </div>
              <div style="display:flex;height:20px;border-radius:6px;overflow:hidden;background:#e2e8f0;border:1px solid #cbd5e1;">
                <div id="g9-well-bar-u" style="width:${initUPct}%;background:#2563eb;transition:width 0.1s ease;"></div>
                <div id="g9-well-bar-k" style="width:${initKPct}%;background:#059669;transition:width 0.1s ease;"></div>
              </div>
            </div>
          </div>
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
              <button type="button" id="g9-well-set-left-tp" style="min-height:${HIT_TARGET_MIN_PX}px;padding:6px 12px;background:#f1f5f9;border:1px solid #cbd5e1;border-radius:6px;cursor:pointer;font-size:0.875rem;">Left TP (-0.5m)</button>
              <button type="button" id="g9-well-set-center" style="min-height:${HIT_TARGET_MIN_PX}px;padding:6px 12px;background:#f1f5f9;border:1px solid #cbd5e1;border-radius:6px;cursor:pointer;font-size:0.875rem;">Equilibrium (0.0m)</button>
              <button type="button" id="g9-well-set-right-tp" style="min-height:${HIT_TARGET_MIN_PX}px;padding:6px 12px;background:#f1f5f9;border:1px solid #cbd5e1;border-radius:6px;cursor:pointer;font-size:0.875rem;">Right TP (+0.5m)</button>
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

      // Update SVG Bead and Energy Bar
      const bx = 300 + newX * 300;
      const by = 210 - (50 * newX * newX) * 10;
      const bead = container.querySelector('#g9-well-bead');
      const beadDrop = container.querySelector('#g9-well-bead-drop');
      const beadLabel = container.querySelector('#g9-well-bead-label');
      const barU = container.querySelector<HTMLElement>('#g9-well-bar-u');
      const barK = container.querySelector<HTMLElement>('#g9-well-bar-k');
      const barUText = container.querySelector<HTMLElement>('#g9-well-bar-u-text');
      const barKText = container.querySelector<HTMLElement>('#g9-well-bar-k-text');

      if (bead) {
        bead.setAttribute('cx', bx.toFixed(1));
        bead.setAttribute('cy', by.toFixed(1));
      }
      if (beadDrop) {
        beadDrop.setAttribute('x1', bx.toFixed(1));
        beadDrop.setAttribute('y1', by.toFixed(1));
        beadDrop.setAttribute('x2', bx.toFixed(1));
      }
      if (beadLabel) {
        beadLabel.setAttribute('x', bx.toFixed(1));
        beadLabel.setAttribute('y', (by - 12).toFixed(1));
        beadLabel.textContent = `x = ${newX.toFixed(2)}m`;
      }
      if (barU && barK) {
        const numU = Number(res.U);
        const numK = Number(res.K);
        const uPct = Math.min(100, Math.max(0, (numU / 12.5) * 100));
        const kPct = 100 - uPct;
        barU.style.width = `${uPct.toFixed(1)}%`;
        barK.style.width = `${kPct.toFixed(1)}%`;
        if (barUText) barUText.textContent = `U: ${numU.toFixed(1)} J (${uPct.toFixed(0)}%)`;
        if (barKText) barKText.textContent = `K: ${numK.toFixed(1)} J (${kPct.toFixed(0)}%)`;
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
      currentTab = tab;
      const dest = `/subject/${topic.subjectCode.toLowerCase()}/topic/${topic.code.toLowerCase()}/${tab}`;
      if (onNavigate) {
        onNavigate(dest);
      } else {
        window.location.hash = '#' + dest;
      }
      renderShell();
      return;
    }

    // WPE Gateway Quick Discovery Actions
    const gwBtn = target.closest<HTMLButtonElement>('[data-gateway-action]');
    if (gwBtn && gwBtn.dataset.gatewayAction) {
      const act = gwBtn.dataset.gatewayAction;
      selectedQuestionId = null;
      if (act === 'goto-guided') {
        currentTab = 'learn-try';
        learnTrySubRole = 'CORE1A';
      } else if (act === 'goto-journeys') {
        currentTab = 'learn-try';
        learnTrySubRole = 'CORE1B';
      } else if (act === 'goto-deck-all') {
        currentTab = 'questions';
        selectedWpeBatch = 'ALL';
      } else if (act === 'goto-deck-b1') {
        currentTab = 'questions';
        selectedWpeBatch = 'B1';
      } else if (act === 'goto-deck-b5') {
        currentTab = 'questions';
        selectedWpeBatch = 'B5';
      } else if (act === 'goto-explorer') {
        currentTab = 'explorer';
      }
      renderShell();
      return;
    }

    // WPE Batch Filter Pills
    const batchBtn = target.closest<HTMLButtonElement>('[data-batch-filter]');
    if (batchBtn && batchBtn.dataset.batchFilter) {
      selectedWpeBatch = batchBtn.dataset.batchFilter;
      renderShell();
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
