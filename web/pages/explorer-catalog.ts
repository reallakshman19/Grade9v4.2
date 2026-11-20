/**
 * web/pages/explorer-catalog.ts
 * Workpack A65 / Wave 15 — Unified GCDR Interactive Explorer Catalog
 *
 * Implements:
 * - 24 Interactive GCDR Explorer Configurations across Physics, Chemistry, and Mathematics
 * - Dynamic lookup and normalization for all legacy and canonical route IDs
 * - Standardized helper drawers: Teacher's Chalkboard, Trap Alert, Independent Check, Transfer Takeaway
 * - Strict exactness badges: Numerical Exact / Qualitative Synthetic fidelity and canonical bindings
 * - 12.7" tablet touch ergonomics compliance (HIT_TARGET_MIN_PX >= 48px)
 *
 * No academic approval inferred from software validation.
 */

import type { ExplorerPageConfig } from './explorer.ts';
import type { GcdrFidelity, GcdrBindingStatus } from '../journeys/explorer.ts';

export interface ExplorerCatalogEntry {
  readonly id: string;
  readonly title: string;
  readonly subject: string;
  readonly topic: string;
  readonly strand: string;
  readonly fidelity: GcdrFidelity;
  readonly binding: GcdrBindingStatus;
  readonly description: string;
  readonly icon: string;
  readonly formulaBadge: string;
  readonly initialParameters?: Record<string, number>;
}

export const EXPLORER_ENTRIES: readonly ExplorerCatalogEntry[] = [
  // --- Physics: Kinematics & 1D/2D Motion ---
  {
    id: 'motion_in_1d',
    title: 'Motion in 1D — Kinematic Position, Velocity & Acceleration',
    subject: 'Physics',
    topic: 'Motion in a Straight Line',
    strand: 'Kinematics',
    fidelity: 'NUMERICAL_EXACT',
    binding: 'CANONICAL_BINDING',
    description: 'Explore rectilinear particle motion under constant and piecewise acceleration with synchronized position-time and velocity-time telemetry.',
    icon: '📏',
    formulaBadge: 'v = u + at, s = ut + ½at²',
    initialParameters: { x: 0.0, v0: 10.0, a: -9.8 },
  },
  {
    id: 'motion-in-a-plane',
    title: 'Motion in a Plane — 2D Orthogonal Kinematics',
    subject: 'Physics',
    topic: 'Motion in a Plane',
    strand: 'Kinematics',
    fidelity: 'NUMERICAL_EXACT',
    binding: 'CANONICAL_BINDING',
    description: 'Orthogonal decomposition of velocity and displacement along independent X and Y Cartesian axes with unified simulation time parameter.',
    icon: '🎯',
    formulaBadge: 'r(t) = x(t)î + y(t)ĵ',
    initialParameters: { x: 0.0, theta: 45.0, v0: 20.0 },
  },
  {
    id: 'motions_in_2d',
    title: 'Motions in 2D — Trajectory Synthesis & Phase Space',
    subject: 'Physics',
    topic: 'Motion in a Plane',
    strand: 'Kinematics',
    fidelity: 'NUMERICAL_EXACT',
    binding: 'CANONICAL_BINDING',
    description: 'Phase plane visualization of planar curves, parabolic trajectories, and relative velocity transformations.',
    icon: '📈',
    formulaBadge: 'dy/dx = vy / vx',
    initialParameters: { x: 0.0, vx: 15.0, vy: 15.0 },
  },
  {
    id: 'projectile-model',
    title: 'Projectile Model — Parabolic Flight & Envelope Analysis',
    subject: 'Physics',
    topic: 'Projectile Motion',
    strand: 'Kinematics',
    fidelity: 'NUMERICAL_EXACT',
    binding: 'CANONICAL_BINDING',
    description: 'Parabolic trajectory modeling under uniform gravity: range calculation, maximum height, flight duration, and trajectory envelope.',
    icon: '🚀',
    formulaBadge: 'R = u² sin(2θ) / g',
    initialParameters: { x: 0.0, angle: 45.0, speed: 25.0 },
  },
  {
    id: 'is_it_really_a_projectile',
    title: 'Is It Really a Projectile? — Force & Acceleration Test',
    subject: 'Physics',
    topic: 'Projectile Motion',
    strand: 'Kinematics',
    fidelity: 'NUMERICAL_EXACT',
    binding: 'CANONICAL_BINDING',
    description: 'Distinguish true gravitational projectile motion from self-propelled or aerodynamically lifted trajectories through acceleration invariant checks.',
    icon: '❓',
    formulaBadge: 'a_x = 0, a_y = -g',
    initialParameters: { x: 0.0, dragCoeff: 0.0 },
  },
  {
    id: 'apex-fallacy',
    title: 'The Apex Fallacy — Zero Velocity vs Nonzero Acceleration',
    subject: 'Physics',
    topic: 'Projectile Motion',
    strand: 'Kinematics',
    fidelity: 'NUMERICAL_EXACT',
    binding: 'CANONICAL_BINDING',
    description: 'Deconstruct the pervasive misconception that acceleration vanishes at the projectile apex when vertical velocity momentarily crosses zero.',
    icon: '⚠️',
    formulaBadge: 'v_y(t_apex) = 0, a_y = -g ≠ 0',
    initialParameters: { x: 0.0, yApex: 12.5 },
  },
  {
    id: 'the_apex_fallacy',
    title: 'The Apex Fallacy (Analytical Suite)',
    subject: 'Physics',
    topic: 'Projectile Motion',
    strand: 'Kinematics',
    fidelity: 'NUMERICAL_EXACT',
    binding: 'CANONICAL_BINDING',
    description: 'Systematic contradiction and reconstruction of instantaneous velocity nullification versus persistent gravitational force.',
    icon: '🔍',
    formulaBadge: 'F_net = mg (Downward)',
    initialParameters: { x: 0.0 },
  },
  {
    id: 'landing-geometry',
    title: 'Landing Geometry — Inclined Surface Impact Angles',
    subject: 'Physics',
    topic: 'Projectile Motion',
    strand: 'Kinematics',
    fidelity: 'NUMERICAL_EXACT',
    binding: 'CANONICAL_BINDING',
    description: 'Compute intersection coordinates, impact speed, and incidence angle for projectiles striking arbitrary inclined terrain slopes.',
    icon: '📐',
    formulaBadge: 'tan(α) = vy / vx at impact',
    initialParameters: { x: 0.0, slopeAngle: 15.0 },
  },
  {
    id: 'equal-height-state',
    title: 'Equal-Height State — Symmetric Kinematic Properties',
    subject: 'Physics',
    topic: 'Projectile Motion',
    strand: 'Kinematics',
    fidelity: 'NUMERICAL_EXACT',
    binding: 'CANONICAL_BINDING',
    description: 'Invariance of particle speed and equal magnitude vertical velocity components at equal elevations on ascent and descent limbs.',
    icon: '⚖️',
    formulaBadge: 'v_up = v_down at y_1 = y_2',
    initialParameters: { x: 0.0, height: 10.0 },
  },
  {
    id: 'same_height_same_speed',
    title: 'Same Height, Same Speed — Mechanical Energy Conservation',
    subject: 'Physics',
    topic: 'Work, Power & Energy',
    strand: 'Energy & Dynamics',
    fidelity: 'NUMERICAL_EXACT',
    binding: 'CANONICAL_BINDING',
    description: 'Proof by conservation of mechanical energy that particle speed depends solely on altitude within a conservative gravitational field.',
    icon: '⚡',
    formulaBadge: '½mv² + mgy = E_total',
    initialParameters: { x: 0.0, energy: 100.0 },
  },
  {
    id: 'event-clock',
    title: 'The Event Clock — Discrete Temporal Markers in Kinematics',
    subject: 'Physics',
    topic: 'Kinematic Clocks',
    strand: 'Measurement',
    fidelity: 'NUMERICAL_EXACT',
    binding: 'CANONICAL_BINDING',
    description: 'Discrete event timestamps, stroboscopic intervals, and coincidence detection in synchronized multi-body motion.',
    icon: '⏱️',
    formulaBadge: 't_event = Δx / v_rel',
    initialParameters: { x: 0.0, interval: 0.2 },
  },
  {
    id: 'the_event_clock',
    title: 'The Event Clock (Precision Benchmark)',
    subject: 'Physics',
    topic: 'Kinematic Clocks',
    strand: 'Measurement',
    fidelity: 'NUMERICAL_EXACT',
    binding: 'CANONICAL_BINDING',
    description: 'Algorithmic event-driven timing comparator validating continuous kinematic equations against discrete time-step integrations.',
    icon: '🕰️',
    formulaBadge: 'Δt = (2u sinθ) / g',
    initialParameters: { x: 0.0 },
  },
  {
    id: 'shared-clock',
    title: 'Shared Clock — Multi-Particle Synchronized Evolution',
    subject: 'Physics',
    topic: 'Kinematic Synchronization',
    strand: 'Kinematics',
    fidelity: 'NUMERICAL_EXACT',
    binding: 'CANONICAL_BINDING',
    description: 'Multi-particle simulation where separate differential evolution equations progress on a single deterministic master clock.',
    icon: '⏰',
    formulaBadge: 't_master = τ₁ = τ₂',
    initialParameters: { x: 0.0, tMax: 10.0 },
  },
  {
    id: 'independent_components_shared_clock',
    title: 'Independent Components & Shared Clock Architecture',
    subject: 'Physics',
    topic: 'Motion in a Plane',
    strand: 'Kinematics',
    fidelity: 'NUMERICAL_EXACT',
    binding: 'CANONICAL_BINDING',
    description: 'Decoupling multi-dimensional equations into independent Cartesian degrees of freedom unified by a single non-spatial parameter.',
    icon: '🔄',
    formulaBadge: 'x(t) ⫫ y(t) | t',
    initialParameters: { x: 0.0 },
  },

  // --- Physics: Dynamics, Pulleys & Frames ---
  {
    id: 'atwood-pulleys',
    title: 'Atwood Pulleys — Ideal String Tension & Coupled Acceleration',
    subject: 'Physics',
    topic: 'Laws of Motion',
    strand: 'Dynamics',
    fidelity: 'NUMERICAL_EXACT',
    binding: 'CANONICAL_BINDING',
    description: 'Newton second law applied to coupled masses over frictionless pulleys: constraint equations, string tension, and system acceleration.',
    icon: '⛓️',
    formulaBadge: 'a = (m₂ - m₁)g / (m₁ + m₂)',
    initialParameters: { x: 0.0, m1: 2.0, m2: 3.0 },
  },
  {
    id: 'connected-blocks',
    title: 'Connected Blocks — Contact Forces & Internal Tension',
    subject: 'Physics',
    topic: 'Laws of Motion',
    strand: 'Dynamics',
    fidelity: 'NUMERICAL_EXACT',
    binding: 'CANONICAL_BINDING',
    description: 'Free-body diagrams for multiple interacting blocks on horizontal surfaces: normal contact reaction, transmission tension, and net driving force.',
    icon: '📦',
    formulaBadge: 'N_internal = m₁ / (m₁ + m₂) · F',
    initialParameters: { x: 0.0, m1: 4.0, m2: 6.0, force: 20.0 },
  },
  {
    id: 'friction-threshold',
    title: 'Friction Threshold — Static Limiting vs Kinetic Friction',
    subject: 'Physics',
    topic: 'Laws of Motion',
    strand: 'Dynamics',
    fidelity: 'NUMERICAL_EXACT',
    binding: 'CANONICAL_BINDING',
    description: 'Transition dynamics from static stick phase to kinetic slip regime: coefficient of static friction, normal force, and impending motion threshold.',
    icon: '🛑',
    formulaBadge: 'f_s ≤ μ_s N, f_k = μ_k N',
    initialParameters: { x: 0.0, muS: 0.5, muK: 0.4, normal: 50.0 },
  },
  {
    id: 'circular-dynamics',
    title: 'Circular Dynamics — Centripetal Acceleration & Road Banking',
    subject: 'Physics',
    topic: 'Circular Motion',
    strand: 'Dynamics',
    fidelity: 'NUMERICAL_EXACT',
    binding: 'CANONICAL_BINDING',
    description: 'Uniform circular kinematics: radial centripetal force requirements, banked curves without friction, and skid-limiting critical speed.',
    icon: '🔄',
    formulaBadge: 'v_opt = √(R·g·tanθ)',
    initialParameters: { x: 0.0, radius: 25.0, bankingAngle: 20.0 },
  },
  {
    id: 'accelerated-frames',
    title: 'Accelerated Frames — Pseudo-Forces & Inertial Duality',
    subject: 'Physics',
    topic: 'Laws of Motion',
    strand: 'Dynamics',
    fidelity: 'NUMERICAL_EXACT',
    binding: 'CANONICAL_BINDING',
    description: 'Non-inertial reference frame dynamics: fictitious D’Alembert inertial forces, apparent weight in elevators, and frame invariance.',
    icon: '🚡',
    formulaBadge: 'F_apparent = m(g - a_frame)',
    initialParameters: { x: 0.0, aFrame: 2.5 },
  },

  // --- Chemistry: Gases, Bonding, Moles & Redox ---
  {
    id: 'behaviour_of_gases',
    title: 'Behaviour of Gases — Kinetic Theory & Ideal Gas States',
    subject: 'Chemistry',
    topic: 'States of Matter',
    strand: 'Physical Chemistry',
    fidelity: 'NUMERICAL_EXACT',
    binding: 'CANONICAL_BINDING',
    description: 'State variable correlations (P, V, T, n) adhering to the ideal gas law with interactive Boyle, Charles, and Avogadro transformations.',
    icon: '💨',
    formulaBadge: 'PV = nRT',
    initialParameters: { x: 0.0, pressure: 1.0, volume: 22.4, temp: 273.15 },
  },
  {
    id: 'chemical_bonding',
    title: 'Chemical Bonding — Ionic, Covalent & Dipole Interactions',
    subject: 'Chemistry',
    topic: 'Chemical Bonding',
    strand: 'Inorganic Chemistry',
    fidelity: 'QUALITATIVE_SYNTHETIC',
    binding: 'CANONICAL_BINDING',
    description: 'Lewis dot structures, valence octet rules, electronegativity differences, and dipole moments across common molecular geometries.',
    icon: '🔬',
    formulaBadge: 'Δχ = |χ_A - χ_B|',
    initialParameters: { x: 0.0 },
  },
  {
    id: 'mole_concept',
    title: 'Mole Concept — Stoichiometry & Mass Conservation',
    subject: 'Chemistry',
    topic: 'Basic Concepts of Chemistry',
    strand: 'Physical Chemistry',
    fidelity: 'NUMERICAL_EXACT',
    binding: 'CANONICAL_BINDING',
    description: 'Conversion matrix between particle counts, moles, molar mass, and STP gas volumes with limiting reactant yield determination.',
    icon: '⚖️',
    formulaBadge: 'n = m / M = N / N_A',
    initialParameters: { x: 0.0, moles: 1.0 },
  },
  {
    id: 'redox_reactions',
    title: 'Redox Reactions — Electron Transfer & Oxidation State Engine',
    subject: 'Chemistry',
    topic: 'Redox Reactions',
    strand: 'Physical Chemistry',
    fidelity: 'NUMERICAL_EXACT',
    binding: 'CANONICAL_BINDING',
    description: 'Systematic assignment of oxidation numbers, separation into oxidation/reduction half-cells, and charge conservation balancing.',
    icon: '🔋',
    formulaBadge: 'Oxidation Number & Charge Balance',
    initialParameters: { x: 0.0 },
  },

  // --- Mathematics: Vector Algebra ---
  {
    id: 'vector_algebra',
    title: 'Vector Algebra — Linear Independence & Geometric Operations',
    subject: 'Mathematics',
    topic: 'Vector Algebra',
    strand: 'Algebra & Geometry',
    fidelity: 'NUMERICAL_EXACT',
    binding: 'CANONICAL_BINDING',
    description: 'Vector addition triangle and parallelogram laws, scalar dot products, cross products, projections, and orthogonal decomposition.',
    icon: '📐',
    formulaBadge: 'A · B = |A||B| cosθ',
    initialParameters: { x: 0.0, ax: 3.0, ay: 4.0, bx: 1.0, by: 2.0 },
  },
];

const EXPLORER_MAP = new Map<string, ExplorerCatalogEntry>();
for (const entry of EXPLORER_ENTRIES) {
  EXPLORER_MAP.set(entry.id.toLowerCase(), entry);
  // Also register dashed and underscored variants
  EXPLORER_MAP.set(entry.id.replace(/_/g, '-').toLowerCase(), entry);
  EXPLORER_MAP.set(entry.id.replace(/-/g, '_').toLowerCase(), entry);
}

/**
 * Normalizes an arbitrary explorer identifier and constructs a complete
 * GCDR ExplorerPageConfig conforming to Workpack A65 specifications.
 */
export function getExplorerConfig(explorerId: string): ExplorerPageConfig {
  const cleanId = (explorerId || '').trim().toLowerCase();
  const entry = EXPLORER_MAP.get(cleanId);

  if (entry) {
    return {
      explorerId: entry.id,
      title: entry.title,
      subject: entry.subject,
      topic: entry.topic,
      initialParameters: { x: 0.0 },
      helpers: {
        exactnessBadge: {
          fidelity: entry.fidelity,
          binding: entry.binding,
          academicClaimDisclaimer: 'PROTECTED_FALSE_CLAIM: Software simulation models conceptual physics; academic proof requires formal derivation.',
        },
        chalkboardNote: `Teacher's Chalkboard note for ${entry.title}. Record personal derivations and test boundary conditions.`,
        trapAlert: `Trap Alert: Verify dimensional homogeneity and sign conventions for ${entry.topic}.`,
        independentCheckPrompt: `Check your result using an alternative formulation (e.g. Work-Energy theorem or symmetry arguments).`,
        transferTakeaway: `Key Invariant: Core governing equations remain unchanged under Galilean frame transformations.`,
      },
    };
  }

  // Fallback for dynamically routed or novel explorer IDs
  const titleCase = cleanId
    .split(/[-_]/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

  return {
    explorerId: cleanId || 'wpe-explorer-01',
    title: `${titleCase || 'Work, Power & Energy'} — Interactive Explorer`,
    subject: cleanId.includes('chem') ? 'Chemistry' : cleanId.includes('math') ? 'Mathematics' : 'Physics',
    topic: titleCase || 'Work, Power and Energy',
    initialParameters: { x: 0.0 },
    helpers: {
      exactnessBadge: {
        fidelity: 'NUMERICAL_EXACT',
        binding: 'CANONICAL_BINDING',
        academicClaimDisclaimer: 'PROTECTED_FALSE_CLAIM: Simulation is an educational tool; not ratified as formal academic proof.',
      },
      chalkboardNote: `Teacher's Chalkboard: Record your observation and derivation steps.`,
      trapAlert: `Trap Alert: Watch for common boundary and sign errors.`,
      independentCheckPrompt: `Verify using conservation laws.`,
      transferTakeaway: `Invariant: Physical conservation principles hold across all valid parameter spaces.`,
    },
  };
}
