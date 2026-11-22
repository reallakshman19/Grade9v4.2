/**
 * web/data/warrants-database.ts
 *
 * Disciplinary Warrant Database for Grade9 Curriculum Engineering.
 * Provides formal epistemic warrants across Physics, Mathematics, Chemistry, and Biology.
 * Each warrant formalizes:
 * - Governing law or model
 * - Exact mathematical formulation
 * - Physical and boundary assumptions
 * - Domain of validity
 * - Coordinate and sign conventions
 * - Counterexample/failure witnesses
 * - Disciplinary explanation
 *
 * Candidate status: [Engineering Candidate · Academic Admission HOLD]
 */

export interface DisciplinaryWarrant {
  readonly id: string;
  readonly discipline: 'PHYSICS' | 'MATHEMATICS' | 'CHEMISTRY' | 'BIOLOGY';
  readonly title: string;
  readonly lawOrModel: string;
  readonly mathematicalFormula: string;
  readonly assumptions: readonly string[];
  readonly validityDomain: string;
  readonly signConventions: string;
  readonly counterexampleWitness: string;
  readonly explanation: string;
}

export const DISCIPLINARY_WARRANTS_REGISTRY: Record<string, DisciplinaryWarrant> = {
  'warrant:foundation': {
    id: 'warrant:foundation',
    discipline: 'PHYSICS',
    title: 'Constant Force Work-Displacement Theorem',
    lawOrModel: 'Definition of Work for Constant Vector Force',
    mathematicalFormula: 'W = \\vec{F} \\cdot \\Delta\\vec{r} = F \\cdot d \\cdot \\cos(\\theta)',
    assumptions: [
      'Force vector F is constant in magnitude and direction across the displacement interval [0, d]',
      'Displacement is rectilinear along 1D coordinate axis (x-axis)',
      'Point particle or non-deformable rigid body (zero non-conservative internal degrees of freedom)',
      'Frictionless horizontal plane (μ = 0, normal reaction N = mg perpendicular to motion)'
    ],
    validityDomain: 'Classical non-relativistic Newtonian mechanics (v ≪ c), macroscopic scales',
    signConventions: 'Displacement along +x is positive; force vector parallel to displacement (θ = 0 rad, cos θ = +1) does positive work (+W), transferring energy into kinetic energy',
    counterexampleWitness: 'If force varies with position F(x), the simple product fails and requires line integral W = ∫ F(x) dx; if force is perpendicular (θ = 90°), work is identically zero regardless of displacement magnitude',
    explanation: 'Direct scalar evaluation of force along the action line. Because the surface is frictionless and force is horizontal, normal force and gravity do zero work, yielding W_net = W_F = 20 N × 5 m = 100 J.'
  },
  'warrant:connected': {
    id: 'warrant:connected',
    discipline: 'PHYSICS',
    title: 'Inclined Plane Four-Force Energy Ledger with Kinetic Dissipation',
    lawOrModel: 'Work-Kinetic Energy Theorem with Non-Conservative Friction',
    mathematicalFormula: 'W_{\\text{net}} = W_g + W_f + W_N = \\Delta K = \\frac{1}{2} m v_f^2',
    assumptions: [
      'Constant dry kinetic Coulomb friction coefficient μ_k = 0.2',
      'Rigid planar incline inclined at angle θ = 30° above horizontal',
      'Uniform gravitational field g = 10 m/s²',
      'Normal reaction remains strictly perpendicular to the incline plane at all times (W_N = 0)'
    ],
    validityDomain: 'Macroscopic sliding body without rolling or hydrodynamic air resistance',
    signConventions: 'Downwards along incline is taken as positive displacement; gravity does positive work (+mg h); friction directly opposes instantaneous velocity (-f_k d)',
    counterexampleWitness: 'If incline angle changes or velocity reaches static threshold (v = 0), Coulomb kinetic model breaks down and requires static friction bounds (f_s ≤ μ_s N)',
    explanation: 'Balances conservative gravitational energy input against dissipative friction work: N = mg cos(30°) = 43.30 N, f_k = 8.66 N, W_f = -86.6 J, W_g = +250 J, W_net = +163.4 J, giving summit velocity v_f = 8.08 m/s.'
  },
  'warrant:advanced': {
    id: 'warrant:advanced',
    discipline: 'PHYSICS',
    title: 'Nonlinear Potential Landscape Gradient & Barrier Crossing',
    lawOrModel: 'Conservative Force Potential Energy Gradient Relation',
    mathematicalFormula: 'F(x) = -\\frac{dU}{dx}, \\quad E = K(x) + U(x) = \\text{constant}',
    assumptions: [
      'Single degree of freedom (1D rectilinear coordinate x)',
      'Conservative field with differentiable double-well potential U(x) = (x² - 4)²',
      'Total mechanical energy E is strictly conserved across entire trajectory',
      'Kinetic energy cannot be negative (K ≥ 0 condition for classically accessible spatial regions)'
    ],
    validityDomain: 'Isolated 1D conservative potential well, no quantum tunneling (classical limit)',
    signConventions: 'Force points toward decreasing potential (-dU/dx); equilibrium points occur where dU/dx = 0 (minima stable, maxima unstable)',
    counterexampleWitness: 'At E < 16 J, the barrier peak at x = 0 (U(0) = 16 J) is classically impenetrable; the particle is bound within one well and cannot cross to the other',
    explanation: 'Determines turning points where E = U(x) (K = 0) and establishes that barrier crossing from left to right well requires total mechanical energy strictly exceeding 16 J.'
  },
  'warrant:A1': {
    id: 'warrant:A1',
    discipline: 'PHYSICS',
    title: 'Line Integral Definition of Mechanical Work',
    lawOrModel: 'Spatial Integral of Force Vector',
    mathematicalFormula: 'W = \\int_{r_i}^{r_f} \\vec{F} \\cdot d\\vec{r}',
    assumptions: ['Continuous trajectory in 3D Euclidean space', 'Inertial frame of reference'],
    validityDomain: 'Classical Newtonian Mechanics',
    signConventions: 'Positive work when force has component along velocity; negative when opposing; zero when perpendicular',
    counterexampleWitness: 'Centripetal forces in uniform circular motion do zero work despite large force magnitude',
    explanation: 'Establishes whether a force transfers energy into or out of a particle system.'
  },
  'warrant:A2': {
    id: 'warrant:A2',
    discipline: 'PHYSICS',
    title: 'Reference Frames & Potential Energy Datums',
    lawOrModel: 'Potential Energy Relative to Reference State',
    mathematicalFormula: 'U(\\vec{r}) = -\\int_{r_0}^{\\vec{r}} \\vec{F}_{\\text{cons}} \\cdot d\\vec{r}',
    assumptions: ['Conservative force field', 'Arbitrary zero-reference datum r_0'],
    validityDomain: 'Conservative vector fields',
    signConventions: 'U_g = mgh relative to ground datum; U_s = 0.5 k x² relative to unstretched spring',
    counterexampleWitness: 'Absolute value of potential energy has no physical meaning; only potential differences ΔU are measurable',
    explanation: 'Defines coordinate frames and reference points needed for consistent energy accounting.'
  },
  'warrant:A3': {
    id: 'warrant:A3',
    discipline: 'PHYSICS',
    title: 'Free-Body Diagram to Energy Ledger Correspondence',
    lawOrModel: 'Superposition of Work Across External Forces',
    mathematicalFormula: 'W_{\\text{net}} = \\sum_{i} W_i = \\sum_{i} \\int \\vec{F}_i \\cdot d\\vec{r}',
    assumptions: ['Isolated system boundary', 'All external forces identified'],
    validityDomain: 'Multi-force mechanical systems',
    signConventions: 'Each individual work term is signed based on its own dot product with displacement',
    counterexampleWitness: 'Omitting an external force (such as normal force on curved tracks) corrupts net work balance',
    explanation: 'Bridges visual vector free-body diagrams into an algebraic scalar energy ledger.'
  },
  'warrant:A4': {
    id: 'warrant:A4',
    discipline: 'PHYSICS',
    title: 'Work-Kinetic Energy Theorem & Potential Gradient',
    lawOrModel: 'Newton\'s Second Law Spatial Integration',
    mathematicalFormula: 'W_{\\text{net}} = \\Delta K = \\frac{1}{2} m v_f^2 - \\frac{1}{2} m v_i^2, \\quad F = -\\frac{dU}{dx}',
    assumptions: ['Inertial frame', 'Particle or non-deformable rigid body', 'Conservative potential'],
    validityDomain: 'Classical kinematics and dynamics',
    signConventions: 'Net positive work increases kinetic energy; force points along negative potential gradient',
    counterexampleWitness: 'Deformable objects (like cars in inelastic crashes) convert work into internal thermal energy, modifying pure particle theorem',
    explanation: 'Directly relates net work to change in kinetic energy and links force to the spatial gradient of potential energy.'
  },
  'warrant:A5': {
    id: 'warrant:A5',
    discipline: 'PHYSICS',
    title: 'Potential Landscape & Classical Turning Point Condition',
    lawOrModel: 'Energy Invariance and Bound State Accessibility',
    mathematicalFormula: 'E = K + U(x) \\ge U(x) \\implies K(x) \\ge 0',
    assumptions: ['Conservative 1D system', 'Constant total mechanical energy E'],
    validityDomain: 'Conservative 1D potential wells',
    signConventions: 'Motion bounded between turning points where E = U(x)',
    counterexampleWitness: 'Regions where U(x) > E have K < 0 and are classically forbidden (zero probability)',
    explanation: 'Determines accessible regions of motion, turning points, and stable vs unstable equilibria from potential curves.'
  },
  'warrant:A6': {
    id: 'warrant:A6',
    discipline: 'PHYSICS',
    title: 'Multi-Force Incline Climb Reasoning Construction',
    lawOrModel: 'Coupled Work-Energy Calculation',
    mathematicalFormula: 'W_{\\text{net}} = W_{\\text{motor}} + W_f + W_g + W_N = \\Delta K',
    assumptions: ['Constant motor thrust F = 15 N', 'Friction f = 3 N', 'Mass m = 3 kg, ramp length 2 m, height 0.5 m'],
    validityDomain: 'Planar incline kinematics',
    signConventions: 'Motor thrust positive (+30 J), friction negative (-6 J), gravity negative (-15 J), normal zero (0 J)',
    counterexampleWitness: 'If thrust falls below resistive sum, cart decelerates or fails to summit',
    explanation: 'Step-by-step evaluation of the 4-force ledger yielding net work +9 J and summit speed 2.45 m/s.'
  },
  'warrant:A7': {
    id: 'warrant:A7',
    discipline: 'PHYSICS',
    title: 'Momentum vs Kinetic Energy Quadratic Scaling',
    lawOrModel: 'Kinetic Energy in Terms of Momentum',
    mathematicalFormula: 'K = \\frac{p^2}{2m}',
    assumptions: ['Non-relativistic velocities (v ≪ c)'],
    validityDomain: 'Classical mechanics',
    signConventions: 'Kinetic energy is strictly non-negative; momentum is a signed vector',
    counterexampleWitness: 'Two bodies with identical momentum |p| have kinetic energies inversely proportional to their masses (K₁/K₂ = m₂/m₁)',
    explanation: 'Resolves common misconception: equal momentum does NOT imply equal energy; the lighter object carries greater kinetic energy.'
  },
  'warrant:A8': {
    id: 'warrant:A8',
    discipline: 'PHYSICS',
    title: 'Boundary & Climb Inaccessibility Invariant',
    lawOrModel: 'Non-Negative Kinetic Energy Constraint',
    mathematicalFormula: 'K_f = K_i + W_{\\text{net}} \\ge 0',
    assumptions: ['Initial speed from rest (K_i = 0)', 'Reduced motor thrust F = 10 N'],
    validityDomain: 'Classical dynamics',
    signConventions: 'Negative net work from rest would require K < 0, which is physically impossible',
    counterexampleWitness: 'A hypothetical full climb with F = 10 N yields W_net = -1 J; hence cart halts before summit',
    explanation: 'Demonstrates physical boundary conditions when applied forces are insufficient to satisfy the energy requirement.'
  },
  'warrant:A9': {
    id: 'warrant:A9',
    discipline: 'PHYSICS',
    title: 'Coupled Two-Body Push-Apart Energy Partition',
    lawOrModel: 'Momentum Conservation with Spring Release',
    mathematicalFormula: 'p_1 + p_2 = 0 \\implies |p_1| = |p_2|, \\quad \\frac{K_1}{K_2} = \\frac{m_2}{m_1}',
    assumptions: ['Isolated two-body system on frictionless track', 'Spring energy stored E_s = 0.5 k x²'],
    validityDomain: 'Isolated two-body conservative push-apart',
    signConventions: 'Carts move in opposite directions; kinetic energy is positive for both',
    counterexampleWitness: 'If track has unequal friction, momentum is not conserved and partition ratio shifts',
    explanation: 'Proves how stored potential energy is partitioned inversely proportional to mass between coupled bodies.'
  }
};

export function getDisciplinaryWarrant(id: string): DisciplinaryWarrant | null {
  return DISCIPLINARY_WARRANTS_REGISTRY[id] || null;
}
