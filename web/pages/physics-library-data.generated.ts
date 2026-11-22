/**
 * web/pages/physics-library-data.generated.ts
 * Wave 13 — Staged STEM Library Packages (20 Physics + 2 Math = 22 Packages)
 * and 208 Authentic Library Questions.
 *
 * Fault N09 Answer Isolation: Raw keys strictly withheld client-side;
 * hints, hint ladders, and failure signal analysis provided for pedagogical mastery.
 */

export interface LibraryPackageDescriptor {
  readonly id: string;
  readonly title: string;
  readonly subject: 'PHYSICS' | 'MATHEMATICS';
  readonly domain: string;
  readonly scopeSummary: string;
  readonly questionCount: number;
  readonly microtopicsCount: number;
  readonly microtopics: readonly string[];
  readonly curriculumMappings: readonly string[];
  readonly status: string;
  readonly sourcePath: string;
}

export interface LibraryQuestionDescriptor {
  readonly id: string;
  readonly packageId: string;
  readonly subject: 'PHYSICS' | 'MATHEMATICS';
  readonly domain: string;
  readonly stem: string;
  readonly options: readonly string[];
  readonly hints: readonly string[];
  readonly hintLadder: readonly string[];
  readonly failureSignal: string;
  readonly difficulty: string;
  readonly keyState: string;
}

export const LIBRARY_PACKAGES: readonly LibraryPackageDescriptor[] = [
  {
    "id": "LIB-MATH-LINEAR-EQUATIONS",
    "title": "Linear equations in one unknown",
    "subject": "MATHEMATICS",
    "domain": "Algebra & Polynomials",
    "scopeSummary": "One-unknown linear equations over the rationals, built around the distinction between an exact solution and its decimal approximation. Authored to exercise this repository's Mathematics adapter end to end; no curated acceptance is claimed.",
    "questionCount": 32,
    "microtopicsCount": 7,
    "microtopics": [
      "An equation constrains an unknown",
      "Operations that preserve the solution set",
      "An exact solution is not its decimal approximation",
      "A linear equation in one variable is true only for its solutions: test a value by evaluating the LHS and the RHS",
      "Solving an equation with the variable on both sides: the same operation on both sides, and transposing a variable term like a number",
      "Reducing an equation to simpler form: opening brackets, combining like terms and clearing denominators before solving",
      "Linear equations in two variables: the form ax + by + c = 0, infinitely many solution pairs, and the straight-line graph"
    ],
    "curriculumMappings": [
      "{'board': 'CBSE', 'grade': 9, 'academic_year': '2026-27', 'track': 'STANDARD', 'scope_class': 'OWNER_EXTENSION', 'source_ref': 'SRC-MATH-AUTHOR', 'locator': 'Foundational one-variable solving assumed by the Linear Equations chapter; no exact board binding established', 'mapping_status': 'CANDIDATE'}"
    ],
    "status": "CANDIDATE",
    "sourcePath": "Mathematics/library/linear-equations.v1.json"
  },
  {
    "id": "LIB-MATH-POLYNOMIALS",
    "title": "Polynomial Algebra and Degree Constraints",
    "subject": "MATHEMATICS",
    "domain": "Algebra & Polynomials",
    "scopeSummary": "Canonical Mathematics Polynomials package with 29 independently validated NCERT Exemplar Unit 2 questions admitted to the production Question Bank; source record Ex 2.2 Q2(i) remains held for an official wording/key conflict, and 10 owner-supplied ISS55 competition questions remain CANDIDATE with production admission disabled pending Owner acceptance.",
    "questionCount": 39,
    "microtopicsCount": 10,
    "microtopics": [
      "Degree-Bounded Polynomial Identity and Difference Polynomials",
      "Interval Sign Charts and Root Multiplicity",
      "Auxiliary Variable Substitution and Real Domain Constraints",
      "Polynomial Form and Degree",
      "Polynomial Evaluation by Substitution",
      "Zeros of Elementary Polynomials",
      "Remainders and Linear Factors",
      "Elementary Polynomial Factorisation",
      "Standard Algebraic Identities in Polynomial Work",
      "Coefficients of Polynomial Terms"
    ],
    "curriculumMappings": [],
    "status": "CANDIDATE",
    "sourcePath": "Mathematics/library/polynomials.v1.json"
  },
  {
    "id": "LIB-PHY-ELEC-CURRENT-OHM-AUTHORED",
    "title": "Current electricity: charge-flow foundation",
    "subject": "PHYSICS",
    "domain": "Electricity & Circuits",
    "scopeSummary": "Author-created conceptual rungs for conserved steady charge flow and testing when a constant-resistance Ohmic model is supported. Drift, voltage-definition, equivalent-resistance, power and Kirchhoff equations remain unclaimed pending gate-owned relations.",
    "questionCount": 4,
    "microtopicsCount": 2,
    "microtopics": [
      "Charge flow is not consumed by a component",
      "Ohmic behavior is a tested model, not a permanent label"
    ],
    "curriculumMappings": [],
    "status": "CANDIDATE",
    "sourcePath": "Physics/library/phy-elec-current-ohm.v1.json"
  },
  {
    "id": "LIB-PHY-FLUID-BERNOULLI-EQUATION-AUTHORED",
    "title": "Fluid statics, buoyancy and Bernoulli flow",
    "subject": "PHYSICS",
    "domain": "Fluids & Hydrostatics",
    "scopeSummary": "Conceptual rung records for buoyancy, steady incompressible continuity, and qualitative Bernoulli reasoning; the hydrostatic entry equation and quantitative efflux/Venturi rung remain un-authored.",
    "questionCount": 0,
    "microtopicsCount": 3,
    "microtopics": [
      "Buoyant force follows displaced fluid",
      "Steady incompressible flow speeds up in a narrower section",
      "Pressure, speed and height trade along an ideal-flow path"
    ],
    "curriculumMappings": [],
    "status": "CANDIDATE",
    "sourcePath": "Physics/library/phy-fluid-bernoulli-equation.v1.json"
  },
  {
    "id": "LIB-PHY-GRAV-UNIVERSAL-LAW-AUTHORED",
    "title": "Universal gravitation, free fall and orbital motion",
    "subject": "PHYSICS",
    "domain": "Kinematics & Motion",
    "scopeSummary": "Grade-9 gravitation competency slice copied and adapted from the repository owner's richer prior Physics engineering corpus: mutual gravitation, inverse-square scaling, local gravitational acceleration/free fall, and mass-versus-weight. The adapted records are self-contained in Grade9V3; no cross-repository runtime/source link is retained. Gravitational-energy and orbital-angular-momentum records remain explicit extensions.",
    "questionCount": 1,
    "microtopicsCount": 6,
    "microtopics": [
      "Gravity is a persistent mutual attraction fixed by source-receiver geometry",
      "Universal gravitation: model scope, centre distance and inverse-square scaling",
      "Local gravitational acceleration: force per unit mass and free-fall mass independence",
      "Mass stays with the object; weight is its local gravitational force",
      "Gravitational binding uses a chosen zero of potential energy",
      "Central gravity conserves orbital angular momentum about the centre"
    ],
    "curriculumMappings": [],
    "status": "CANDIDATE",
    "sourcePath": "Physics/library/phy-grav-universal-law.v1.json"
  },
  {
    "id": "LIB-PHY-KIN-1D-MOTION-AUTHORED",
    "title": "One-dimensional motion",
    "subject": "PHYSICS",
    "domain": "Kinematics & Motion",
    "scopeSummary": "Authored Grade-9 Motion learning spine covering distance/displacement, average speed/velocity, velocity-versus-acceleration distinction, motion graphs, constant-acceleration equations and elementary uniform circular motion. Records remain CANDIDATE; no board-prescription authority is asserted until the repository's exact curriculum-binding mechanism is completed.",
    "questionCount": 19,
    "microtopicsCount": 7,
    "microtopics": [
      "Path travelled is not start-to-finish change",
      "Zero velocity at an instant does not mean zero acceleration",
      "Average speed and average velocity come from different totals",
      "Derive the constant-acceleration equations from one velocity-time graph",
      "Uniform circular motion keeps speed while velocity turns",
      "Motion graphs turn coordinate change into rate",
      "Circular dynamics: centripetal is a net-force role, not a new force"
    ],
    "curriculumMappings": [],
    "status": "CANDIDATE",
    "sourcePath": "Physics/library/phy-kin-1d-motion.v1.json"
  },
  {
    "id": "LIB-PHY-KIN-2D-MOTION-AUTHORED",
    "title": "Two-dimensional kinematics and projectile model",
    "subject": "PHYSICS",
    "domain": "Kinematics & Motion",
    "scopeSummary": "Owner-approved ExamSIDE question-demand slice for plane motion, now semantically decomposed for the Topic Atlas: one-frame/two-component motion, componentwise constant acceleration, and the gravity-only projectile model with explicit apex, same-height and horizontal/unequal-height event reasoning. Trajectory-equation derivation, drag, variable gravity, moving-launcher/relative-motion cases and advanced projectile geometry remain outside this bounded packet.",
    "questionCount": 15,
    "microtopicsCount": 3,
    "microtopics": [
      "Split one plane-motion event into independent x/y components with one clock",
      "Apply constant-acceleration kinematics component by component",
      "Select the gravity-only projectile model before using projectile consequences"
    ],
    "curriculumMappings": [],
    "status": "CANDIDATE",
    "sourcePath": "Physics/library/phy-kin-2d-motion.v1.json"
  },
  {
    "id": "LIB-PHY-MAG-FIELD-LORENTZ-AUTHORED",
    "title": "Magnetic fields and orientation reasoning",
    "subject": "PHYSICS",
    "domain": "Magnetism & Electrodynamics",
    "scopeSummary": "Author-created conceptual rungs for magnetic-field direction, oriented flux, and the distinction between magnetic redirection and speed change. Lorentz-force magnitude, induction and motional-emf equations remain outside this package pending gate-owned relations.",
    "questionCount": 0,
    "microtopicsCount": 3,
    "microtopics": [
      "One magnetic direction, several page marks",
      "Through-going field depends on surface orientation",
      "A perpendicular magnetic force redirects without speeding up"
    ],
    "curriculumMappings": [],
    "status": "CANDIDATE",
    "sourcePath": "Physics/library/phy-mag-field-lorentz.v1.json"
  },
  {
    "id": "LIB-PHY-NLM-FIRST-LAW-AUTHORED",
    "title": "Force and laws of motion",
    "subject": "PHYSICS",
    "domain": "Kinematics & Motion",
    "scopeSummary": "Authored Grade-9 Force and Laws of Motion spine covering balanced/unbalanced force reasoning, body-specific force ownership, qualitative and bounded quantitative friction, Newton's laws, and a small connected-body/ideal-string preparation slice; observer-frame/pseudo-force reasoning remains an explicit question-demand extension. Records remain CANDIDATE; no board-prescription authority is asserted by this package.",
    "questionCount": 52,
    "microtopicsCount": 11,
    "microtopics": [
      "Zero net force allows steady motion",
      "Nonzero forces can cancel",
      "A free-body diagram belongs to one chosen body",
      "An accelerating observer needs a declared pseudo-force convention",
      "Net force, not any one force, sets acceleration",
      "Friction opposes relative sliding at a contact",
      "Third-law partner forces act on different bodies",
      "Quantitative static and kinetic friction conditions",
      "Connected bodies and a justified common acceleration",
      "Ideal-string tension belongs to each body-specific FBD"
    ],
    "curriculumMappings": [],
    "status": "CANDIDATE",
    "sourcePath": "Physics/library/phy-nlm-first-law.v1.json"
  },
  {
    "id": "LIB-PHY-NLM-MOMENTUM-TRANSFER-AUTHORED",
    "title": "Momentum-transfer force rate",
    "subject": "PHYSICS",
    "domain": "Dynamics & Mechanics",
    "scopeSummary": "Explicit-demand Grade-9 Pinnacle preparation extension for force as momentum transferred per unit time in a repeated discrete ejection stream. It supports the owner-supplied ExamSIDE machine-gun demand without importing a general collision, impulse-integral, rocket-equation or variable-mass curriculum.",
    "questionCount": 10,
    "microtopicsCount": 1,
    "microtopics": [
      "Force from a steady stream of discrete momentum changes"
    ],
    "curriculumMappings": [],
    "status": "CANDIDATE",
    "sourcePath": "Physics/library/phy-nlm-momentum-transfer.v1.json"
  },
  {
    "id": "LIB-PHY-OPTICS-REFLECTION-MIRRORS-AUTHORED",
    "title": "Reflection and spherical mirrors",
    "subject": "PHYSICS",
    "domain": "Optics & Light",
    "scopeSummary": "Grade-10 reflection and spherical-mirror self-study spine: normal-referenced reflection, real/virtual image geometry, Cartesian optical signs, spherical-mirror principal-ray construction, signed mirror equation and signed magnification. Refraction/lenses and later optics remain outside this bounded slice.",
    "questionCount": 0,
    "microtopicsCount": 6,
    "microtopics": [
      "Measure reflection from the normal, not the surface",
      "Real and virtual describe how light paths meet",
      "Optical signs come from declared directions",
      "Principal rays are consistent shortcuts to one spherical-mirror image",
      "The mirror equation is a signed paraxial model of the ray geometry",
      "Signed magnification carries image size and orientation"
    ],
    "curriculumMappings": [],
    "status": "CANDIDATE",
    "sourcePath": "Physics/library/phy-optics-reflection-mirrors.v1.json"
  },
  {
    "id": "LIB-PHY-OPTICS-REFRACTION-LENSES-AUTHORED",
    "title": "Refraction and spherical lenses",
    "subject": "PHYSICS",
    "domain": "Optics & Light",
    "scopeSummary": "Grade-10 refraction and spherical-lens self-study spine: normal-based refraction, refractive index/Snell geometry, thin-lens principal-ray construction, signed lens equation, signed magnification and lens power. Human-eye correction, prism dispersion/scattering and later optics remain outside this bounded slice.",
    "questionCount": 0,
    "microtopicsCount": 6,
    "microtopics": [
      "Refraction begins with the normal and the two media",
      "Refractive index connects speed change to Snell geometry",
      "A thin lens image must be supported by independent principal rays",
      "Use the signed thin-lens equation only after the ray model fixes the geometry",
      "Lens magnification sign carries image orientation",
      "Lens power is signed inverse focal length in metres"
    ],
    "curriculumMappings": [],
    "status": "CANDIDATE",
    "sourcePath": "Physics/library/phy-optics-refraction-lenses.v1.json"
  },
  {
    "id": "LIB-PHY-OSC-SHM-WAVES-AUTHORED",
    "title": "Oscillation foundation: stable equilibrium",
    "subject": "PHYSICS",
    "domain": "Oscillations & Waves",
    "scopeSummary": "Author-created conceptual rungs for stable equilibrium and ideal-oscillator energy exchange. SHM kinematics, period scaling and wave-propagation equations remain outside the package pending gate-owned relations.",
    "questionCount": 4,
    "microtopicsCount": 2,
    "microtopics": [
      "Repetition is not enough: look for a stable equilibrium",
      "Energy trades twice during one displacement cycle"
    ],
    "curriculumMappings": [],
    "status": "CANDIDATE",
    "sourcePath": "Physics/library/phy-osc-shm-waves.v1.json"
  },
  {
    "id": "LIB-PHY-ROT-RIGID-BODY-AUTHORED",
    "title": "Rotational dynamics, angular momentum and rolling",
    "subject": "PHYSICS",
    "domain": "Dynamics & Mechanics",
    "scopeSummary": "Conceptual rung records for rotational inertia, origin-specific angular momentum, pure rolling kinematics, and qualitative rolling-energy partition; the quantitative torque rung remains un-authored.",
    "questionCount": 0,
    "microtopicsCount": 4,
    "microtopics": [
      "Mass distribution sets rotational inertia about an axis",
      "Angular momentum conservation belongs to a specified origin",
      "Pure rolling makes the contact point instantaneously at rest",
      "Mass distribution changes ideal rolling acceleration"
    ],
    "curriculumMappings": [],
    "status": "CANDIDATE",
    "sourcePath": "Physics/library/phy-rot-rigid-body.v1.json"
  },
  {
    "id": "LIB-PHY-SIMPLE-MACHINES-G9",
    "title": "Simple machines",
    "subject": "PHYSICS",
    "domain": "Dynamics & Mechanics",
    "scopeSummary": "Current Grade-9 Simple Machines spine covering effort/load tradeoffs, mechanical advantage, practical same-state load/effort measurement, and qualitative comparison of levers, pulleys and inclined planes. The package remains CANDIDATE and does not promote itself to curriculum authority.",
    "questionCount": 2,
    "microtopicsCount": 3,
    "microtopics": [
      "A machine trades force or direction for distance; it does not create work",
      "Mechanical advantage is a same-state load-to-effort force ratio",
      "Levers, pulleys and inclined planes realize different force-distance tradeoffs"
    ],
    "curriculumMappings": [],
    "status": "CANDIDATE",
    "sourcePath": "Physics/library/phy-simple-machines.v1.json"
  },
  {
    "id": "LIB-PHY-SOUND-G9",
    "title": "Sound",
    "subject": "PHYSICS",
    "domain": "Oscillations & Waves",
    "scopeSummary": "Grade-9 Sound spine copied and adapted from the repository owner's prior acoustics engineering corpus and localized to Grade9V3: vibrating source/medium, longitudinal compression-rarefaction propagation, wave quantities, perception, and reflected-sound timing. Donor readiness/curriculum authority is not inherited.",
    "questionCount": 5,
    "microtopicsCount": 5,
    "microtopics": [
      "Sound starts with vibration and travels through a material medium",
      "Sound propagates through a medium as longitudinal compressions and rarefactions",
      "Sound graphs separate amplitude, wavelength, period, frequency and speed",
      "Pitch, loudness and the approximate human audible range are different questions",
      "Reflected sound can form echoes, reverberation and echolocation cues"
    ],
    "curriculumMappings": [],
    "status": "CANDIDATE",
    "sourcePath": "Physics/library/phy-sound.v1.json"
  },
  {
    "id": "LIB-PHY-THERMO-FIRST-SECOND-LAW-AUTHORED",
    "title": "Thermodynamics and heat engines",
    "subject": "PHYSICS",
    "domain": "Thermodynamics",
    "scopeSummary": "Conceptual thermodynamics rung records for energy-role classification, state versus path dependence, cyclic pressure-volume reasoning, and second-law engine limits; the quantitative first-law sign equation remains un-authored.",
    "questionCount": 0,
    "microtopicsCount": 4,
    "microtopics": [
      "Internal energy is stored; heat and work are transfers",
      "Internal-energy change is fixed by endpoint states, not process path",
      "A complete cycle returns the state while its loop records net work",
      "Heat engines require heat rejection and obey a reservoir-temperature ceiling"
    ],
    "curriculumMappings": [],
    "status": "CANDIDATE",
    "sourcePath": "Physics/library/phy-thermo-first-second-law.v1.json"
  },
  {
    "id": "LIB-PHY-VEC-ADD-SUB-AUTHORED",
    "title": "Vector addition, subtraction and orientation",
    "subject": "PHYSICS",
    "domain": "Vector Mathematics",
    "scopeSummary": "Authored vector-operation slice for real Motion-in-a-Plane demand: component composition, resultant constraints, subtraction order, and magnitude-angle decomposition with an explicit boundary between generic vector resolution and later Motion-in-2D evolution. Dot product, cross product and inverse-direction recovery remain outside this bounded route.",
    "questionCount": 11,
    "microtopicsCount": 4,
    "microtopics": [
      "Impose a component constraint on a resultant",
      "Add vectors by corresponding signed components",
      "Operand order reverses a subtraction result",
      "Resolve magnitude-and-angle vectors into signed perpendicular components"
    ],
    "curriculumMappings": [],
    "status": "CANDIDATE",
    "sourcePath": "Physics/library/phy-vec-add-sub.v1.json"
  },
  {
    "id": "LIB-PHY-VEC-DIRECTION-UNIT-AUTHORED",
    "title": "Vector direction and unit representation",
    "subject": "PHYSICS",
    "domain": "Vector Mathematics",
    "scopeSummary": "Bounded Grade-9 Pinnacle preparation slice for 2-D vector notation, direction recovery from signed components, and unit-direction normalization. Owner-approved ExamSIDE Vector Algebra demand justifies the slice; dot product, scalar projection, cross product, 3-D vector algebra and calculus remain outside it.",
    "questionCount": 5,
    "microtopicsCount": 3,
    "microtopics": [
      "Translate signed components to i-hat/j-hat notation",
      "Recover direction from signed components",
      "Normalize a nonzero vector to unit direction"
    ],
    "curriculumMappings": [],
    "status": "CANDIDATE",
    "sourcePath": "Physics/library/phy-vector-direction-unit.v1.json"
  },
  {
    "id": "LIB-PHY-WORK-ENERGY-POWER-AUTHORED",
    "title": "Work, energy and power",
    "subject": "PHYSICS",
    "domain": "Work, Energy & Power",
    "scopeSummary": "Grade-9 Work, Energy and Power spine adapted from the repository owner's richer prior Physics engineering corpus and localized to Grade9V3. It preserves system-boundary energy accounting, signed work, kinetic/potential energy, conditional mechanical-energy conservation and power without inheriting donor readiness or curriculum authority.",
    "questionCount": 7,
    "microtopicsCount": 7,
    "microtopics": [
      "Only the along-path part of a force contributes to work",
      "Net work sign tracks kinetic-energy change",
      "Potential energy belongs only to endpoint-determined interactions",
      "Mechanical energy is constant only after the system and transfer account close",
      "Power is an energy-transfer rate, not the work itself",
      "Grade 9 work and mechanical-energy equations are one ledger",
      "Derive kinetic and raised-body potential energy from the work ledger"
    ],
    "curriculumMappings": [],
    "status": "CANDIDATE",
    "sourcePath": "Physics/library/phy-work-energy-power.v1.json"
  },
  {
    "id": "LIB-PHY-RELATIVE-MOTION-SEED",
    "title": "Relative velocity in a plane",
    "subject": "PHYSICS",
    "domain": "Kinematics & Motion",
    "scopeSummary": "Three substantive microtopic candidates for a Grade 9 Advanced plus labelled extension route; no learner products or curated acceptance supplied.",
    "questionCount": 1,
    "microtopicsCount": 4,
    "microtopics": [
      "A number alone does not say where something is",
      "Position measured from the other object",
      "From relative position to relative velocity",
      "Check direction, magnitude and observer reversal"
    ],
    "curriculumMappings": [
      "{'board': 'CBSE', 'grade': 9, 'academic_year': '2026-27', 'track': 'ADVANCED', 'scope_class': 'OWNER_EXTENSION', 'source_ref': 'SRC-CBSE-ADV', 'locator': 'Chapter 2 for background only; quantitative vector relative velocity is treated as extension', 'mapping_status': 'CANDIDATE'}"
    ],
    "status": "CANDIDATE",
    "sourcePath": "Physics/library/relative-motion.v1.json"
  },
  {
    "id": "LIB-PHY-VECTOR-REPRESENTATION-SEED",
    "title": "Vector representation and subtraction",
    "subject": "PHYSICS",
    "domain": "Vector Mathematics",
    "scopeSummary": "Vector-representation-and-subtraction microtopic candidates (MEDIUM), authored as the prerequisite bucket for LIB-PHY-RELATIVE-MOTION-SEED during the Grade 9 relative-motion vertical slice. No learner products or curated acceptance supplied by this record alone.",
    "questionCount": 1,
    "microtopicsCount": 4,
    "microtopics": [
      "Vector information versus magnitude-only information",
      "Choosing axes and keeping components signed",
      "Subtraction as addition of the reversed vector",
      "When the simple v_A/B = v_A - v_B relation needs frame qualification (research-boundary note)"
    ],
    "curriculumMappings": [
      "{'board': 'CBSE', 'grade': 9, 'academic_year': '2026-27', 'track': 'ADVANCED', 'scope_class': 'OWNER_EXTENSION', 'source_ref': 'SRC-CBSE-ADV', 'locator': 'Chapter 2 for background only; quantitative vector construction/subtraction is treated as extension', 'mapping_status': 'CANDIDATE'}"
    ],
    "status": "CANDIDATE",
    "sourcePath": "Physics/library/vector-representation.v1.json"
  }
];

export const LIBRARY_QUESTIONS: readonly LibraryQuestionDescriptor[] = [
  {
    "id": "Q-MATH-LINEAR-01",
    "packageId": "LIB-MATH-LINEAR-EQUATIONS",
    "subject": "MATHEMATICS",
    "domain": "Algebra & Polynomials",
    "stem": "Solve 3x + 2 = 9 over the rationals. Give the exact solution and verify it.",
    "options": [],
    "hints": [
      "The equation is a claim about x, not an instruction. What single operation on both sides would leave x with nothing added to it?",
      "Take 2 off both sides first, then deal with the 3 that multiplies x. Say, for each step, why it can be undone."
    ],
    "hintLadder": [
      "Step 1: ORIENT",
      "Mark 2 and 3 on a number line. With x = 2 the left side is 8, too small; with x = 3 it is 11, too big. So the solution lies strictly between them and will not be a whole number.",
      "Step 3: FIRST_RELATION"
    ],
    "failureSignal": "Your final line reads 2.33 or 2.333: put it back in and 3x + 2 comes to 8.99 or 8.999, just short of 9, so the decimal fails the substitution that the fraction passes.",
    "difficulty": "{'band': 'D2', 'score': 4, 'components': {'concept_model_selection': 1, 'representation_translation': 0, 'reasoning_chain_length': 1, 'algebra_computational_load': 1, 'trap_exception_sensitivity': 1}, 'basis': 'Two-step linear equation requiring subtraction then non-zero division over rationals, distinguishing exact fractional solution from decimal approximation.'}",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-MATH-CONSTRAINT-1A",
    "packageId": "LIB-MATH-LINEAR-EQUATIONS",
    "subject": "MATHEMATICS",
    "domain": "Algebra & Polynomials",
    "stem": "The unknown x ranges over the rationals. Test x = 3 and x = 4 in 2x + 5 = 11. Which of them, if either, is a solution?",
    "options": [],
    "hints": [
      "Recall defining conservation relations and frame definitions."
    ],
    "hintLadder": [
      "1. Draw a schematic coordinate frame.",
      "2. State explicit balance equations."
    ],
    "failureSignal": "Check dimensional consistency and boundary behavior.",
    "difficulty": "MEDIUM",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-MATH-EXACT-1A",
    "packageId": "LIB-MATH-LINEAR-EQUATIONS",
    "subject": "MATHEMATICS",
    "domain": "Algebra & Polynomials",
    "stem": "Solve 6x \u2212 1 = 3 over the rationals. Give the exact solution, then decide whether 0.666 also satisfies the equation.",
    "options": [],
    "hints": [
      "Recall defining conservation relations and frame definitions."
    ],
    "hintLadder": [
      "1. Draw a schematic coordinate frame.",
      "2. State explicit balance equations."
    ],
    "failureSignal": "Check dimensional consistency and boundary behavior.",
    "difficulty": "MEDIUM",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-MATH-LINEAR-2B-01",
    "packageId": "LIB-MATH-LINEAR-EQUATIONS",
    "subject": "MATHEMATICS",
    "domain": "Algebra & Polynomials",
    "stem": "Solve 3(x \u2212 1) = 5 over the rationals. Give the exact solution and verify it in the original equation.",
    "options": [],
    "hints": [
      "Before touching the equation, say which operation was applied to x last: the subtraction inside the bracket, or the multiplication outside it?"
    ],
    "hintLadder": [
      "Step 1: ORIENT"
    ],
    "failureSignal": "You wrote 3x \u2212 1 = 5 and got x = 2: the 3 multiplied only the x, not the whole bracket, and 3(2 \u2212 1) = 3, not 5.",
    "difficulty": "{'band': 'D2', 'score': 4, 'components': {'concept_model_selection': 1, 'representation_translation': 0, 'reasoning_chain_length': 1, 'algebra_computational_load': 1, 'trap_exception_sensitivity': 1}, 'basis': 'Bracket-grouped linear equation requiring structural decision on operation undo order over rationals with verification in original equation.'}",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-MAT-LEQ-01-1A-EVALUATE-SIDES",
    "packageId": "LIB-MATH-LINEAR-EQUATIONS",
    "subject": "MATHEMATICS",
    "domain": "Algebra & Polynomials",
    "stem": "Evaluate both sides of 4x \u2212 3 = 2x + 5 at x = 4 and at x = 3, keeping the LHS and RHS as separate numbers. Which candidate is a solution?",
    "options": [],
    "hints": [
      "Recall defining conservation relations and frame definitions."
    ],
    "hintLadder": [
      "1. Draw a schematic coordinate frame.",
      "2. State explicit balance equations."
    ],
    "failureSignal": "Check dimensional consistency and boundary behavior.",
    "difficulty": "MEDIUM",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-MAT-LEQ-01-1A-ONE-VALUE-NOT-ALL",
    "packageId": "LIB-MATH-LINEAR-EQUATIONS",
    "subject": "MATHEMATICS",
    "domain": "Algebra & Polynomials",
    "stem": "Riya checks that x = 6 satisfies x + 4 = 10 and concludes that x + 4 = 10 is true for every number. Test x = 0 and decide whether she is right.",
    "options": [],
    "hints": [
      "Recall defining conservation relations and frame definitions."
    ],
    "hintLadder": [
      "1. Draw a schematic coordinate frame.",
      "2. State explicit balance equations."
    ],
    "failureSignal": "Check dimensional consistency and boundary behavior.",
    "difficulty": "MEDIUM",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-MAT-LEQ-01-EXEMPLAR8-Q6",
    "packageId": "LIB-MATH-LINEAR-EQUATIONS",
    "subject": "MATHEMATICS",
    "domain": "Algebra & Polynomials",
    "stem": "The value of x for which the expressions 3x \u2013 4 and 2x + 1 become equal is",
    "options": [
      "(a) \u20133",
      "(b) 0",
      "(c) 5",
      "(d) 1"
    ],
    "hints": [
      "Recall defining conservation relations and frame definitions."
    ],
    "hintLadder": [
      "Step 1: ORIENT",
      "Step 2: REPRESENT",
      "Step 3: FIRST_RELATION"
    ],
    "failureSignal": "You chose (a) \u20133: that comes from moving \u20134 across without changing its sign (x = 1 \u2013 4). At x = \u20133 the expressions are \u201313 and \u20135, which are not equal.",
    "difficulty": "MEDIUM",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-MAT-LEQ-01-EXEMPLAR8-Q17",
    "packageId": "LIB-MATH-LINEAR-EQUATIONS",
    "subject": "MATHEMATICS",
    "domain": "Algebra & Polynomials",
    "stem": "The solution of the equation 3x \u2013 4 = 1 \u2013 2x is _________.",
    "options": [],
    "hints": [
      "Recall defining conservation relations and frame definitions."
    ],
    "hintLadder": [
      "Step 1: ORIENT",
      "Step 2: REPRESENT",
      "Step 3: FIRST_RELATION"
    ],
    "failureSignal": "You wrote 5: that treats \u20132x as if it were +2x when collecting terms. At x = 5 the LHS is 11 but the RHS is 1 \u2013 10 = \u20139.",
    "difficulty": "MEDIUM",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-MAT-LEQ-01-EXEMPLAR8-Q20",
    "packageId": "LIB-MATH-LINEAR-EQUATIONS",
    "subject": "MATHEMATICS",
    "domain": "Algebra & Polynomials",
    "stem": "9x \u2013 _________ = \u201321 has the solution (\u20132)",
    "options": [],
    "hints": [
      "Recall defining conservation relations and frame definitions."
    ],
    "hintLadder": [
      "Step 1: ORIENT",
      "Step 2: REPRESENT",
      "Step 3: FIRST_RELATION"
    ],
    "failureSignal": "You wrote 39 (from 9 \u00d7 (\u20132) = +18) or \u20133 (dropping the minus in front of the blank). With 3, 9(\u20132) \u2013 3 = \u201321 exactly.",
    "difficulty": "MEDIUM",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-MAT-LEQ-02-1A-COLLECT-TERMS",
    "packageId": "LIB-MATH-LINEAR-EQUATIONS",
    "subject": "MATHEMATICS",
    "domain": "Algebra & Polynomials",
    "stem": "Solve 3y + 4 = 2y + 11. Write the operation you apply to both sides at each step.",
    "options": [],
    "hints": [
      "Recall defining conservation relations and frame definitions."
    ],
    "hintLadder": [
      "1. Draw a schematic coordinate frame.",
      "2. State explicit balance equations."
    ],
    "failureSignal": "Check dimensional consistency and boundary behavior.",
    "difficulty": "MEDIUM",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-MAT-LEQ-02-1A-DIVIDE-AND-CHECK",
    "packageId": "LIB-MATH-LINEAR-EQUATIONS",
    "subject": "MATHEMATICS",
    "domain": "Algebra & Polynomials",
    "stem": "Solve 7a \u2212 2 = 3a + 10 and check your answer in the original equation.",
    "options": [],
    "hints": [
      "Recall defining conservation relations and frame definitions."
    ],
    "hintLadder": [
      "1. Draw a schematic coordinate frame.",
      "2. State explicit balance equations."
    ],
    "failureSignal": "Check dimensional consistency and boundary behavior.",
    "difficulty": "MEDIUM",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-MAT-LEQ-02-NCERT8-EX2-1-Q1",
    "packageId": "LIB-MATH-LINEAR-EQUATIONS",
    "subject": "MATHEMATICS",
    "domain": "Algebra & Polynomials",
    "stem": "Solve the following equation and check your result: 3x = 2x + 18",
    "options": [],
    "hints": [
      "Recall defining conservation relations and frame definitions."
    ],
    "hintLadder": [
      "Step 1: ORIENT",
      "Step 2: REPRESENT",
      "Step 3: FIRST_RELATION"
    ],
    "failureSignal": "You wrote x = 18/5: moving 2x to the left without changing its sign gives 5x = 18. Check: 3(18/5) = 54/5, but 2(18/5) + 18 = 126/5.",
    "difficulty": "MEDIUM",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-MAT-LEQ-02-NCERT8-EX2-1-Q2",
    "packageId": "LIB-MATH-LINEAR-EQUATIONS",
    "subject": "MATHEMATICS",
    "domain": "Algebra & Polynomials",
    "stem": "Solve the following equation and check your result: 5t \u2013 3 = 3t \u2013 5",
    "options": [],
    "hints": [
      "Recall defining conservation relations and frame definitions."
    ],
    "hintLadder": [
      "Step 1: ORIENT",
      "Step 2: REPRESENT",
      "Step 3: FIRST_RELATION"
    ],
    "failureSignal": "You wrote t = 1: after subtracting 3t you wrote 2t = 5 \u2212 3 instead of \u22125 + 3. Check t = 1: the LHS is 2 but the RHS is \u22122.",
    "difficulty": "MEDIUM",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-MAT-LEQ-02-NCERT8-EX2-1-Q3",
    "packageId": "LIB-MATH-LINEAR-EQUATIONS",
    "subject": "MATHEMATICS",
    "domain": "Algebra & Polynomials",
    "stem": "Solve the following equation and check your result: 5x + 9 = 5 + 3x",
    "options": [],
    "hints": [
      "Recall defining conservation relations and frame definitions."
    ],
    "hintLadder": [
      "Step 1: ORIENT",
      "Step 2: REPRESENT",
      "Step 3: FIRST_RELATION"
    ],
    "failureSignal": "You wrote x = 7: moving 9 to the right as +9 gives 2x = 14. Check x = 7: the LHS is 44 but the RHS is 26.",
    "difficulty": "MEDIUM",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-MAT-LEQ-02-NCERT8-EX2-1-Q5",
    "packageId": "LIB-MATH-LINEAR-EQUATIONS",
    "subject": "MATHEMATICS",
    "domain": "Algebra & Polynomials",
    "stem": "Solve the following equation and check your result: 2x \u2013 1 = 14 \u2013 x",
    "options": [],
    "hints": [
      "Recall defining conservation relations and frame definitions."
    ],
    "hintLadder": [
      "Step 1: ORIENT",
      "Step 2: REPRESENT",
      "Step 3: FIRST_RELATION"
    ],
    "failureSignal": "You wrote x = 15: subtracting x (instead of adding it) gives 2x \u2212 x = 14 + 1. Check x = 15: the LHS is 29 but the RHS is \u22121.",
    "difficulty": "MEDIUM",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-MAT-LEQ-02-EXEMPLAR9-4-1-Q16",
    "packageId": "LIB-MATH-LINEAR-EQUATIONS",
    "subject": "MATHEMATICS",
    "domain": "Algebra & Polynomials",
    "stem": "If we multiply or divide both sides of a linear equation with a non-zero number, then the solution of the linear equation :",
    "options": [
      "(A) Changes",
      "(B) Remains the same",
      "(C) Changes in case of multiplication only",
      "(D) Changes in case of division only"
    ],
    "hints": [
      "Recall defining conservation relations and frame definitions."
    ],
    "hintLadder": [
      "Step 1: ORIENT",
      "Step 2: REPRESENT",
      "Step 3: FIRST_RELATION"
    ],
    "failureSignal": "You chose (C) or (D), treating one operation as changing the numbers and so the answer. Multiply 2x = 10 by 3: 6x = 30 still gives x = 5; divide by 2: x = 5 again.",
    "difficulty": "MEDIUM",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-MAT-LEQ-03-1A-OPEN-BRACKETS",
    "packageId": "LIB-MATH-LINEAR-EQUATIONS",
    "subject": "MATHEMATICS",
    "domain": "Algebra & Polynomials",
    "stem": "Open the brackets and combine like terms on each side of 4(x \u2212 3) \u2212 2(x \u2212 5) = 3(x \u2212 1), then solve.",
    "options": [],
    "hints": [
      "Recall defining conservation relations and frame definitions."
    ],
    "hintLadder": [
      "1. Draw a schematic coordinate frame.",
      "2. State explicit balance equations."
    ],
    "failureSignal": "Check dimensional consistency and boundary behavior.",
    "difficulty": "MEDIUM",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-MAT-LEQ-03-1A-CLEAR-DENOMINATORS",
    "packageId": "LIB-MATH-LINEAR-EQUATIONS",
    "subject": "MATHEMATICS",
    "domain": "Algebra & Polynomials",
    "stem": "Solve x/2 + x/3 = 10 by first multiplying both sides by the LCM of the denominators.",
    "options": [],
    "hints": [
      "Recall defining conservation relations and frame definitions."
    ],
    "hintLadder": [
      "1. Draw a schematic coordinate frame.",
      "2. State explicit balance equations."
    ],
    "failureSignal": "Check dimensional consistency and boundary behavior.",
    "difficulty": "MEDIUM",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-MAT-LEQ-03-1A-VARIABLE-VANISHES",
    "packageId": "LIB-MATH-LINEAR-EQUATIONS",
    "subject": "MATHEMATICS",
    "domain": "Algebra & Polynomials",
    "stem": "Reduce 2(3x \u2212 1) = 6x + 4 and 2(3x \u2212 1) = 6x \u2212 2. How many solutions does each equation have?",
    "options": [],
    "hints": [
      "Recall defining conservation relations and frame definitions."
    ],
    "hintLadder": [
      "1. Draw a schematic coordinate frame.",
      "2. State explicit balance equations."
    ],
    "failureSignal": "Check dimensional consistency and boundary behavior.",
    "difficulty": "MEDIUM",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-MAT-LEQ-03-NCERT8-EX2-2-Q7",
    "packageId": "LIB-MATH-LINEAR-EQUATIONS",
    "subject": "MATHEMATICS",
    "domain": "Algebra & Polynomials",
    "stem": "Simplify and solve the following linear equation: 3(t \u2013 3) = 5(2t + 1)",
    "options": [],
    "hints": [
      "Recall defining conservation relations and frame definitions."
    ],
    "hintLadder": [
      "Step 1: ORIENT",
      "Step 2: REPRESENT",
      "Step 3: FIRST_RELATION"
    ],
    "failureSignal": "You got t = \u221210/7: the 1 inside 5(2t + 1) was not multiplied by 5. Expanding fully gives 10t + 5, and t = \u22122 makes both sides \u221215.",
    "difficulty": "MEDIUM",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-MAT-LEQ-03-NCERT8-EX2-2-Q9",
    "packageId": "LIB-MATH-LINEAR-EQUATIONS",
    "subject": "MATHEMATICS",
    "domain": "Algebra & Polynomials",
    "stem": "Simplify and solve the following linear equation: 3(5z \u2013 7) \u2013 2(9z \u2013 11) = 4(8z \u2013 13) \u2013 17",
    "options": [],
    "hints": [
      "Recall defining conservation relations and frame definitions."
    ],
    "hintLadder": [
      "Step 1: ORIENT",
      "Step 2: REPRESENT",
      "Step 3: FIRST_RELATION"
    ],
    "failureSignal": "You got z = 26/35: \u22122(9z \u2212 11) was opened as \u221218z \u2212 22. The second cell is (\u22122)(\u221211) = +22, and z = 2 makes both sides \u22125.",
    "difficulty": "MEDIUM",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-MAT-LEQ-03-NCERT8-EX2-2-Q10",
    "packageId": "LIB-MATH-LINEAR-EQUATIONS",
    "subject": "MATHEMATICS",
    "domain": "Algebra & Polynomials",
    "stem": "Simplify and solve the following linear equation: 0.25(4f \u2013 3) = 0.05(10f \u2013 9)",
    "options": [],
    "hints": [
      "Recall defining conservation relations and frame definitions."
    ],
    "hintLadder": [
      "Step 1: ORIENT",
      "Step 2: REPRESENT",
      "Step 3: FIRST_RELATION"
    ],
    "failureSignal": "You got f = \u22122.4: 0.25 \u00d7 (\u22123) was taken as +0.75. Expanding correctly gives f \u2212 0.75 = 0.5f \u2212 0.45, and f = 0.6 makes both sides \u22120.15.",
    "difficulty": "MEDIUM",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-MAT-LEQ-03-EXEMPLAR8-Q58",
    "packageId": "LIB-MATH-LINEAR-EQUATIONS",
    "subject": "MATHEMATICS",
    "domain": "Algebra & Polynomials",
    "stem": "Solve the following equation: 8x \u2013 7 \u2013 3x = 6x \u2013 2x \u2013 3",
    "options": [],
    "hints": [
      "Recall defining conservation relations and frame definitions."
    ],
    "hintLadder": [
      "Step 1: ORIENT",
      "Step 2: REPRESENT",
      "Step 3: FIRST_RELATION"
    ],
    "failureSignal": "You got x = \u22124/3: 6x \u2212 2x was combined as 8x. Combining each side on its own gives 5x \u2212 7 = 4x \u2212 3, and x = 4 makes both sides 13.",
    "difficulty": "MEDIUM",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-MAT-LEQ-03-EXEMPLAR8-Q61",
    "packageId": "LIB-MATH-LINEAR-EQUATIONS",
    "subject": "MATHEMATICS",
    "domain": "Algebra & Polynomials",
    "stem": "Solve the following equation: 5(x \u2013 1) \u2013 2(x + 8) = 0",
    "options": [],
    "hints": [
      "Recall defining conservation relations and frame definitions."
    ],
    "hintLadder": [
      "Step 1: ORIENT",
      "Step 2: REPRESENT",
      "Step 3: FIRST_RELATION"
    ],
    "failureSignal": "You got x = \u221211/3: \u22122(x + 8) was opened as \u22122x + 16. The factor \u22122 times +8 is \u221216, and x = 7 gives 5(6) \u2212 2(15) = 0.",
    "difficulty": "MEDIUM",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-MAT-LEQ-04-1A-TEST-PAIRS",
    "packageId": "LIB-MATH-LINEAR-EQUATIONS",
    "subject": "MATHEMATICS",
    "domain": "Algebra & Polynomials",
    "stem": "Which of (2, 1), (1, 2) and (4, 0) are solutions of x + 2y = 4? Substitute each value in its own variable's place.",
    "options": [],
    "hints": [
      "Recall defining conservation relations and frame definitions."
    ],
    "hintLadder": [
      "1. Draw a schematic coordinate frame.",
      "2. State explicit balance equations."
    ],
    "failureSignal": "Check dimensional consistency and boundary behavior.",
    "difficulty": "MEDIUM",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-MAT-LEQ-04-1A-GENERATE-PAIRS",
    "packageId": "LIB-MATH-LINEAR-EQUATIONS",
    "subject": "MATHEMATICS",
    "domain": "Algebra & Polynomials",
    "stem": "Find four solutions of 2x + y = 5 by choosing x = 0, 1, 2 and 3. How many solutions does the equation have?",
    "options": [],
    "hints": [
      "Recall defining conservation relations and frame definitions."
    ],
    "hintLadder": [
      "1. Draw a schematic coordinate frame.",
      "2. State explicit balance equations."
    ],
    "failureSignal": "Check dimensional consistency and boundary behavior.",
    "difficulty": "MEDIUM",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-MAT-LEQ-04-1A-READ-THE-LINE",
    "packageId": "LIB-MATH-LINEAR-EQUATIONS",
    "subject": "MATHEMATICS",
    "domain": "Algebra & Polynomials",
    "stem": "Find where the graph of x \u2212 y = 2 cuts each axis, then decide whether the point (5, 3), which lies on that line, is a solution.",
    "options": [],
    "hints": [
      "Recall defining conservation relations and frame definitions."
    ],
    "hintLadder": [
      "1. Draw a schematic coordinate frame.",
      "2. State explicit balance equations."
    ],
    "failureSignal": "Check dimensional consistency and boundary behavior.",
    "difficulty": "MEDIUM",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-MAT-LEQ-04-EXEMPLAR9-4-1-Q1",
    "packageId": "LIB-MATH-LINEAR-EQUATIONS",
    "subject": "MATHEMATICS",
    "domain": "Algebra & Polynomials",
    "stem": "The linear equation 2x \u2013 5y = 7 has",
    "options": [
      "(A) A unique solution",
      "(B) Two solutions",
      "(C) Infinitely many solutions",
      "(D) No solution"
    ],
    "hints": [
      "Recall defining conservation relations and frame definitions."
    ],
    "hintLadder": [
      "Step 1: ORIENT",
      "Step 2: REPRESENT",
      "Step 3: FIRST_RELATION"
    ],
    "failureSignal": "You chose (A): one pair such as (1, \u22121) works, but so does (6, 1), and every other x gives its own y.",
    "difficulty": "MEDIUM",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-MAT-LEQ-04-EXEMPLAR9-4-1-Q3",
    "packageId": "LIB-MATH-LINEAR-EQUATIONS",
    "subject": "MATHEMATICS",
    "domain": "Algebra & Polynomials",
    "stem": "If (2, 0) is a solution of the linear equation 2x + 3y = k, then the value of k is",
    "options": [
      "(A) 4",
      "(B) 6",
      "(C) 5",
      "(D) 2"
    ],
    "hints": [
      "Recall defining conservation relations and frame definitions."
    ],
    "hintLadder": [
      "Step 1: ORIENT",
      "Step 2: REPRESENT",
      "Step 3: FIRST_RELATION"
    ],
    "failureSignal": "You chose (B) 6: that puts 2 in for y (3 \u00d7 2) instead of for x. With x = 2 and y = 0, 2(2) + 3(0) = 4.",
    "difficulty": "MEDIUM",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-MAT-LEQ-04-EXEMPLAR9-4-1-Q11",
    "packageId": "LIB-MATH-LINEAR-EQUATIONS",
    "subject": "MATHEMATICS",
    "domain": "Algebra & Polynomials",
    "stem": "x = 5, y = 2 is a solution of the linear equation",
    "options": [
      "(A) x + 2y = 7",
      "(B) 5x + 2y = 7",
      "(C) x + y = 7",
      "(D) 5x + y = 7"
    ],
    "hints": [
      "Recall defining conservation relations and frame definitions."
    ],
    "hintLadder": [
      "Step 1: ORIENT",
      "Step 2: REPRESENT",
      "Step 3: FIRST_RELATION"
    ],
    "failureSignal": "You chose (B) 5x + 2y = 7, matching 5 and 2 to the coefficients instead of substituting them: 5(5) + 2(2) = 29.",
    "difficulty": "MEDIUM",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-MAT-LEQ-04-EXEMPLAR9-4-2-Q1",
    "packageId": "LIB-MATH-LINEAR-EQUATIONS",
    "subject": "MATHEMATICS",
    "domain": "Algebra & Polynomials",
    "stem": "Write whether the following statement is True or False? Justify your answer: The point (0, 3) lies on the graph of the linear equation 3x + 4y = 12.",
    "options": [],
    "hints": [
      "Recall defining conservation relations and frame definitions."
    ],
    "hintLadder": [
      "Step 1: ORIENT",
      "Step 2: REPRESENT",
      "Step 3: FIRST_RELATION"
    ],
    "failureSignal": "You said False after substituting x = 3, y = 0 (reading the pair backwards): 9 is not 12. In (0, 3), x = 0 and y = 3, which gives 12.",
    "difficulty": "MEDIUM",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-MAT-LEQ-04-EXEMPLAR9-4-3-Q7",
    "packageId": "LIB-MATH-LINEAR-EQUATIONS",
    "subject": "MATHEMATICS",
    "domain": "Algebra & Polynomials",
    "stem": "How many solution(s) of the equation 2x + 1 = x \u2013 3 are there on the : (i) Number line (ii) Cartesian plane",
    "options": [],
    "hints": [
      "Recall defining conservation relations and frame definitions."
    ],
    "hintLadder": [
      "Step 1: ORIENT",
      "Step 2: REPRESENT",
      "Step 3: FIRST_RELATION"
    ],
    "failureSignal": "You answered one for both parts: on the Cartesian plane each solution is a point (x, y), and (\u22124, 0), (\u22124, 1), (\u22124, 2) all satisfy 2x + 1 = x \u2212 3 because y does not appear.",
    "difficulty": "MEDIUM",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-MAT-POLY-ISS55-01",
    "packageId": "LIB-MATH-POLYNOMIALS",
    "subject": "MATHEMATICS",
    "domain": "Algebra & Polynomials",
    "stem": "The polynomial $p_k(x)=x^3-3x^2+(k-4)x+12$ has factor $x-3$. Determine $k$, obtain a complete real factorisation and list the distinct real zeros. Give an independent check of the complete polynomial, not only the initially supplied factor.",
    "options": [],
    "hints": [
      "Recall defining conservation relations and frame definitions."
    ],
    "hintLadder": [
      "1. Draw a schematic coordinate frame.",
      "2. State explicit balance equations."
    ],
    "failureSignal": "Check dimensional consistency and boundary behavior.",
    "difficulty": "{'band': 'D3', 'score': 6, 'components': {'concept_model_selection': 1, 'representation_translation': 1, 'reasoning_chain_length': 2, 'algebra_computational_load': 1, 'trap_exception_sensitivity': 1}, 'basis': 'Multi-step coordinate application of Factor Theorem to determine unknown parameter k, complete factoring by grouping, and independent verification of all zeros.'}",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-MAT-POLY-ISS55-02",
    "packageId": "LIB-MATH-POLYNOMIALS",
    "subject": "MATHEMATICS",
    "domain": "Algebra & Polynomials",
    "stem": "A student claims that a cubic must have three distinct real zeros. Test this against $p(x)=x^3-4x^2+5x-2$ by factorising it. Distinguish distinct zeros from repeated factors, and use exact nearby test values to decide whether the sign changes at each zero.",
    "options": [],
    "hints": [
      "Recall defining conservation relations and frame definitions."
    ],
    "hintLadder": [
      "1. Draw a schematic coordinate frame.",
      "2. State explicit balance equations."
    ],
    "failureSignal": "Check dimensional consistency and boundary behavior.",
    "difficulty": "{'band': 'D3', 'score': 7, 'components': {'concept_model_selection': 2, 'representation_translation': 1, 'reasoning_chain_length': 2, 'algebra_computational_load': 1, 'trap_exception_sensitivity': 1}, 'basis': 'Refuting a student claim by factorising into repeated linear factors, distinguishing distinct zeros from multiplicity, and using nearby test points to deduce local sign constancy vs change.'}",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-MAT-POLY-ISS55-03",
    "packageId": "LIB-MATH-POLYNOMIALS",
    "subject": "MATHEMATICS",
    "domain": "Algebra & Polynomials",
    "stem": "A real polynomial $p$ has degree at most two and satisfies $p(0)=1$, $p(1)=3$ and $p(2)=7$. Construct it from these data. A further exact record claims $p(3)=14$: decide whether all four records are compatible with the degree bound and explain what has to be reconsidered if they are not.",
    "options": [],
    "hints": [
      "Recall defining conservation relations and frame definitions."
    ],
    "hintLadder": [
      "1. Draw a schematic coordinate frame.",
      "2. State explicit balance equations."
    ],
    "failureSignal": "Check dimensional consistency and boundary behavior.",
    "difficulty": "{'band': 'D3', 'score': 7, 'components': {'concept_model_selection': 2, 'representation_translation': 1, 'reasoning_chain_length': 2, 'algebra_computational_load': 1, 'trap_exception_sensitivity': 1}, 'basis': 'Constructing a unique quadratic from three points, evaluating a fourth point to expose incompatibility, and analyzing whether degree bound or data validity must be reconsidered.'}",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-MAT-POLY-ISS55-04",
    "packageId": "LIB-MATH-POLYNOMIALS",
    "subject": "MATHEMATICS",
    "domain": "Algebra & Polynomials",
    "stem": "A rectangular card has outer dimensions $(x+4)$ cm by $(x+2)$ cm. A square of side $x$ cm is cut out from its interior, with $x>0$. Construct the remaining-area polynomial and explain how its degree can differ from the degrees of the two component areas. Check your model at one admissible value.",
    "options": [],
    "hints": [
      "Recall defining conservation relations and frame definitions."
    ],
    "hintLadder": [
      "1. Draw a schematic coordinate frame.",
      "2. State explicit balance equations."
    ],
    "failureSignal": "Check dimensional consistency and boundary behavior.",
    "difficulty": "{'band': 'D3', 'score': 6, 'components': {'concept_model_selection': 1, 'representation_translation': 2, 'reasoning_chain_length': 1, 'algebra_computational_load': 1, 'trap_exception_sensitivity': 1}, 'basis': 'Translating physical card dimensions to algebraic areas, subtracting to find remaining area, explaining degree reduction via cancellation, and validating at an admissible value.'}",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-MAT-POLY-ISS55-05",
    "packageId": "LIB-MATH-POLYNOMIALS",
    "subject": "MATHEMATICS",
    "domain": "Algebra & Polynomials",
    "stem": "For $p(x)=x^3-6x^2+11x-6$, create a factored representation and a sign chart covering all real $x$, including the zeros. Explain how the chart follows from the signs of the individual factors rather than from an unverified sketch.",
    "options": [],
    "hints": [
      "Recall defining conservation relations and frame definitions."
    ],
    "hintLadder": [
      "1. Draw a schematic coordinate frame.",
      "2. State explicit balance equations."
    ],
    "failureSignal": "Check dimensional consistency and boundary behavior.",
    "difficulty": "{'band': 'D3', 'score': 7, 'components': {'concept_model_selection': 1, 'representation_translation': 2, 'reasoning_chain_length': 2, 'algebra_computational_load': 1, 'trap_exception_sensitivity': 1}, 'basis': 'Factoring a cubic into linear factors, partitioning R into open intervals and zero boundary points, and building a rigorous sign chart based on factor sign parity.'}",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-MAT-POLY-ISS55-06",
    "packageId": "LIB-MATH-POLYNOMIALS",
    "subject": "MATHEMATICS",
    "domain": "Algebra & Polynomials",
    "stem": "A monic cubic $p$ satisfies $p(1)=0$, $p(-1)=0$ and $p(2)=6$. Construct $p$ by coordinating the factor information and the remaining value condition. Check the result by an approach different from the one used to construct it.",
    "options": [],
    "hints": [
      "Recall defining conservation relations and frame definitions."
    ],
    "hintLadder": [
      "1. Draw a schematic coordinate frame.",
      "2. State explicit balance equations."
    ],
    "failureSignal": "Check dimensional consistency and boundary behavior.",
    "difficulty": "{'band': 'D3', 'score': 6, 'components': {'concept_model_selection': 1, 'representation_translation': 1, 'reasoning_chain_length': 2, 'algebra_computational_load': 1, 'trap_exception_sensitivity': 1}, 'basis': 'Synthesizing monic cubic degree, two zero conditions, and one value condition into a unique polynomial, then validating via an independent algebraic method.'}",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-MAT-POLY-ISS55-07",
    "packageId": "LIB-MATH-POLYNOMIALS",
    "subject": "MATHEMATICS",
    "domain": "Algebra & Polynomials",
    "stem": "A student knows only that a nonzero real polynomial has zeros $-1$ and $1$, and concludes that it must equal $c(x^2-1)$ for some nonzero constant $c$. Decide what really follows without a degree bound, give a counterexample to any unwarranted part, and identify the extra condition that makes the stated form valid.",
    "options": [],
    "hints": [
      "Recall defining conservation relations and frame definitions."
    ],
    "hintLadder": [
      "1. Draw a schematic coordinate frame.",
      "2. State explicit balance equations."
    ],
    "failureSignal": "Check dimensional consistency and boundary behavior.",
    "difficulty": "{'band': 'D3', 'score': 7, 'components': {'concept_model_selection': 2, 'representation_translation': 1, 'reasoning_chain_length': 2, 'algebra_computational_load': 0, 'trap_exception_sensitivity': 2}, 'basis': 'Distinguishing necessary implications of zero data from unwarranted degree assumptions, constructing a valid higher-degree counterexample, and stating the exact degree bound condition.'}",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-MAT-POLY-ISS55-08",
    "packageId": "LIB-MATH-POLYNOMIALS",
    "subject": "MATHEMATICS",
    "domain": "Algebra & Polynomials",
    "stem": "Two real polynomials $p$ and $q$ each have degree at most two and agree at three distinct real inputs. Prove or disprove that they agree everywhere. You may use the fact that a nonzero polynomial of degree at most two has at most two distinct real zeros; distinguish that fact from a claim about the zero polynomial.",
    "options": [],
    "hints": [
      "Recall defining conservation relations and frame definitions."
    ],
    "hintLadder": [
      "1. Draw a schematic coordinate frame.",
      "2. State explicit balance equations."
    ],
    "failureSignal": "Check dimensional consistency and boundary behavior.",
    "difficulty": "{'band': 'D3', 'score': 7, 'components': {'concept_model_selection': 2, 'representation_translation': 1, 'reasoning_chain_length': 2, 'algebra_computational_load': 0, 'trap_exception_sensitivity': 2}, 'basis': 'Formal proof of polynomial identity for degree <= 2 via difference polynomial d(x) = p(x) - q(x), applying root bound theorem by contradiction, and distinguishing non-zero polynomials from the zero polynomial.'}",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-MAT-POLY-ISS55-09",
    "packageId": "LIB-MATH-POLYNOMIALS",
    "subject": "MATHEMATICS",
    "domain": "Algebra & Polynomials",
    "stem": "For $p_a(x)=(a-1)x^3+(a+1)x^2-2x$, determine the parameter values for which $1$ is a zero and the parameter values for which the degree is less than three. Explain how the two conditions relate and whether the family can ever become the zero polynomial.",
    "options": [],
    "hints": [
      "Recall defining conservation relations and frame definitions."
    ],
    "hintLadder": [
      "1. Draw a schematic coordinate frame.",
      "2. State explicit balance equations."
    ],
    "failureSignal": "Check dimensional consistency and boundary behavior.",
    "difficulty": "{'band': 'D3', 'score': 7, 'components': {'concept_model_selection': 1, 'representation_translation': 1, 'reasoning_chain_length': 2, 'algebra_computational_load': 1, 'trap_exception_sensitivity': 2}, 'basis': 'Solving parameter conditions for zero existence and leading coefficient vanishing, explaining their mathematical connection, and proving that the family can never become the zero polynomial.'}",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-MAT-POLY-ISS55-10",
    "packageId": "LIB-MATH-POLYNOMIALS",
    "subject": "MATHEMATICS",
    "domain": "Algebra & Polynomials",
    "stem": "Find all real zeros of $p(x)=x^4-5x^2+4$ and $q(x)=x^4+4x^2+4$ by choosing a useful change of variable. State the condition imposed by that change of variable, check each accepted real zero, and explain why treating the new variable as an unrestricted real number can mislead. This is a competition extension; no general quartic formula is required.",
    "options": [],
    "hints": [
      "Recall defining conservation relations and frame definitions."
    ],
    "hintLadder": [
      "1. Draw a schematic coordinate frame.",
      "2. State explicit balance equations."
    ],
    "failureSignal": "Check dimensional consistency and boundary behavior.",
    "difficulty": "{'band': 'D3', 'score': 7, 'components': {'concept_model_selection': 2, 'representation_translation': 1, 'reasoning_chain_length': 2, 'algebra_computational_load': 0, 'trap_exception_sensitivity': 2}, 'basis': 'Selecting auxiliary substitution u = x^2, enforcing domain condition u >= 0 over reals, solving quadratics, rejecting negative roots, and explaining why unrestricted variables produce false real roots.'}",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-MAT-POLY-NCERT9-EX21-Q01",
    "packageId": "LIB-MATH-POLYNOMIALS",
    "subject": "MATHEMATICS",
    "domain": "Algebra & Polynomials",
    "stem": "Which of the following is a polynomial?",
    "options": [
      "(A) x\u00b2/2 - 2/x\u00b2",
      "(B) \u221a(2x) - 1",
      "(C) x\u00b2 + 3x^(3/2)/\u221ax",
      "(D) (x - 1)/(x + 1)"
    ],
    "hints": [
      "Recall defining conservation relations and frame definitions."
    ],
    "hintLadder": [
      "1. Draw a schematic coordinate frame.",
      "2. State explicit balance equations."
    ],
    "failureSignal": "Check dimensional consistency and boundary behavior.",
    "difficulty": "MEDIUM",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-MAT-POLY-NCERT9-EX21-Q02",
    "packageId": "LIB-MATH-POLYNOMIALS",
    "subject": "MATHEMATICS",
    "domain": "Algebra & Polynomials",
    "stem": "\u221a2 is a polynomial of degree",
    "options": [
      "(A) 2",
      "(B) 0",
      "(C) 1",
      "(D) 1/2"
    ],
    "hints": [
      "Recall defining conservation relations and frame definitions."
    ],
    "hintLadder": [
      "1. Draw a schematic coordinate frame.",
      "2. State explicit balance equations."
    ],
    "failureSignal": "Check dimensional consistency and boundary behavior.",
    "difficulty": "MEDIUM",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-MAT-POLY-NCERT9-EX21-Q03",
    "packageId": "LIB-MATH-POLYNOMIALS",
    "subject": "MATHEMATICS",
    "domain": "Algebra & Polynomials",
    "stem": "Degree of the polynomial 4x\u2074 + 0x\u00b3 + 0x\u2075 + 5x + 7 is",
    "options": [
      "(A) 4",
      "(B) 5",
      "(C) 3",
      "(D) 7"
    ],
    "hints": [
      "Recall defining conservation relations and frame definitions."
    ],
    "hintLadder": [
      "1. Draw a schematic coordinate frame.",
      "2. State explicit balance equations."
    ],
    "failureSignal": "Check dimensional consistency and boundary behavior.",
    "difficulty": "MEDIUM",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-MAT-POLY-NCERT9-EX21-Q04",
    "packageId": "LIB-MATH-POLYNOMIALS",
    "subject": "MATHEMATICS",
    "domain": "Algebra & Polynomials",
    "stem": "Degree of the zero polynomial is",
    "options": [
      "(A) 0",
      "(B) 1",
      "(C) Any natural number",
      "(D) Not defined"
    ],
    "hints": [
      "Recall defining conservation relations and frame definitions."
    ],
    "hintLadder": [
      "1. Draw a schematic coordinate frame.",
      "2. State explicit balance equations."
    ],
    "failureSignal": "Check dimensional consistency and boundary behavior.",
    "difficulty": "MEDIUM",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-MAT-POLY-NCERT9-EX21-Q05",
    "packageId": "LIB-MATH-POLYNOMIALS",
    "subject": "MATHEMATICS",
    "domain": "Algebra & Polynomials",
    "stem": "If p(x) = x\u00b2 - 2\u221a2x + 1, then p(2\u221a2) is equal to",
    "options": [
      "(A) 0",
      "(B) 1",
      "(C) 4\u221a2",
      "(D) 8\u221a2 + 1"
    ],
    "hints": [
      "Recall defining conservation relations and frame definitions."
    ],
    "hintLadder": [
      "1. Draw a schematic coordinate frame.",
      "2. State explicit balance equations."
    ],
    "failureSignal": "Check dimensional consistency and boundary behavior.",
    "difficulty": "MEDIUM",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-MAT-POLY-NCERT9-EX21-Q06",
    "packageId": "LIB-MATH-POLYNOMIALS",
    "subject": "MATHEMATICS",
    "domain": "Algebra & Polynomials",
    "stem": "The value of the polynomial 5x - 4x\u00b2 + 3, when x = -1 is",
    "options": [
      "(A) -6",
      "(B) 6",
      "(C) 2",
      "(D) -2"
    ],
    "hints": [
      "Recall defining conservation relations and frame definitions."
    ],
    "hintLadder": [
      "1. Draw a schematic coordinate frame.",
      "2. State explicit balance equations."
    ],
    "failureSignal": "Check dimensional consistency and boundary behavior.",
    "difficulty": "MEDIUM",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-MAT-POLY-NCERT9-EX21-Q07",
    "packageId": "LIB-MATH-POLYNOMIALS",
    "subject": "MATHEMATICS",
    "domain": "Algebra & Polynomials",
    "stem": "If p(x) = x + 3, then p(x) + p(-x) is equal to",
    "options": [
      "(A) 3",
      "(B) 2x",
      "(C) 0",
      "(D) 6"
    ],
    "hints": [
      "Recall defining conservation relations and frame definitions."
    ],
    "hintLadder": [
      "1. Draw a schematic coordinate frame.",
      "2. State explicit balance equations."
    ],
    "failureSignal": "Check dimensional consistency and boundary behavior.",
    "difficulty": "MEDIUM",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-MAT-POLY-NCERT9-EX21-Q08",
    "packageId": "LIB-MATH-POLYNOMIALS",
    "subject": "MATHEMATICS",
    "domain": "Algebra & Polynomials",
    "stem": "Zero of the zero polynomial is",
    "options": [
      "(A) 0",
      "(B) 1",
      "(C) Any real number",
      "(D) Not defined"
    ],
    "hints": [
      "Recall defining conservation relations and frame definitions."
    ],
    "hintLadder": [
      "1. Draw a schematic coordinate frame.",
      "2. State explicit balance equations."
    ],
    "failureSignal": "Check dimensional consistency and boundary behavior.",
    "difficulty": "MEDIUM",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-MAT-POLY-NCERT9-EX21-Q09",
    "packageId": "LIB-MATH-POLYNOMIALS",
    "subject": "MATHEMATICS",
    "domain": "Algebra & Polynomials",
    "stem": "Zero of the polynomial p(x) = 2x + 5 is",
    "options": [
      "(A) -2/5",
      "(B) -5/2",
      "(C) 2/5",
      "(D) 5/2"
    ],
    "hints": [
      "Recall defining conservation relations and frame definitions."
    ],
    "hintLadder": [
      "1. Draw a schematic coordinate frame.",
      "2. State explicit balance equations."
    ],
    "failureSignal": "Check dimensional consistency and boundary behavior.",
    "difficulty": "MEDIUM",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-MAT-POLY-NCERT9-EX21-Q10",
    "packageId": "LIB-MATH-POLYNOMIALS",
    "subject": "MATHEMATICS",
    "domain": "Algebra & Polynomials",
    "stem": "One of the zeroes of the polynomial 2x\u00b2 + 7x - 4 is",
    "options": [
      "(A) 2",
      "(B) 1/2",
      "(C) -1/2",
      "(D) -2"
    ],
    "hints": [
      "Recall defining conservation relations and frame definitions."
    ],
    "hintLadder": [
      "1. Draw a schematic coordinate frame.",
      "2. State explicit balance equations."
    ],
    "failureSignal": "Check dimensional consistency and boundary behavior.",
    "difficulty": "MEDIUM",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-MAT-POLY-NCERT9-EX21-Q11",
    "packageId": "LIB-MATH-POLYNOMIALS",
    "subject": "MATHEMATICS",
    "domain": "Algebra & Polynomials",
    "stem": "If x\u2075\u00b9 + 51 is divided by x + 1, the remainder is",
    "options": [
      "(A) 0",
      "(B) 1",
      "(C) 49",
      "(D) 50"
    ],
    "hints": [
      "Recall defining conservation relations and frame definitions."
    ],
    "hintLadder": [
      "1. Draw a schematic coordinate frame.",
      "2. State explicit balance equations."
    ],
    "failureSignal": "Check dimensional consistency and boundary behavior.",
    "difficulty": "MEDIUM",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-MAT-POLY-NCERT9-EX21-Q12",
    "packageId": "LIB-MATH-POLYNOMIALS",
    "subject": "MATHEMATICS",
    "domain": "Algebra & Polynomials",
    "stem": "If x + 1 is a factor of the polynomial 2x\u00b2 + kx, then the value of k is",
    "options": [
      "(A) -3",
      "(B) 4",
      "(C) 2",
      "(D) -2"
    ],
    "hints": [
      "Recall defining conservation relations and frame definitions."
    ],
    "hintLadder": [
      "1. Draw a schematic coordinate frame.",
      "2. State explicit balance equations."
    ],
    "failureSignal": "Check dimensional consistency and boundary behavior.",
    "difficulty": "MEDIUM",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-MAT-POLY-NCERT9-EX21-Q13",
    "packageId": "LIB-MATH-POLYNOMIALS",
    "subject": "MATHEMATICS",
    "domain": "Algebra & Polynomials",
    "stem": "x + 1 is a factor of the polynomial",
    "options": [
      "(A) x\u00b3 + x\u00b2 - x + 1",
      "(B) x\u00b3 + x\u00b2 + x + 1",
      "(C) x\u2074 + x\u00b3 + x\u00b2 + 1",
      "(D) x\u2074 + 3x\u00b3 + 3x\u00b2 + x + 1"
    ],
    "hints": [
      "Recall defining conservation relations and frame definitions."
    ],
    "hintLadder": [
      "1. Draw a schematic coordinate frame.",
      "2. State explicit balance equations."
    ],
    "failureSignal": "Check dimensional consistency and boundary behavior.",
    "difficulty": "MEDIUM",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-MAT-POLY-NCERT9-EX21-Q14",
    "packageId": "LIB-MATH-POLYNOMIALS",
    "subject": "MATHEMATICS",
    "domain": "Algebra & Polynomials",
    "stem": "One of the factors of (25x\u00b2 - 1) + (1 + 5x)\u00b2 is",
    "options": [
      "(A) 5 + x",
      "(B) 5 - x",
      "(C) 5x - 1",
      "(D) 10x"
    ],
    "hints": [
      "Recall defining conservation relations and frame definitions."
    ],
    "hintLadder": [
      "1. Draw a schematic coordinate frame.",
      "2. State explicit balance equations."
    ],
    "failureSignal": "Check dimensional consistency and boundary behavior.",
    "difficulty": "MEDIUM",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-MAT-POLY-NCERT9-EX21-Q15",
    "packageId": "LIB-MATH-POLYNOMIALS",
    "subject": "MATHEMATICS",
    "domain": "Algebra & Polynomials",
    "stem": "The value of 249\u00b2 - 248\u00b2 is",
    "options": [
      "(A) 1\u00b2",
      "(B) 477",
      "(C) 487",
      "(D) 497"
    ],
    "hints": [
      "Recall defining conservation relations and frame definitions."
    ],
    "hintLadder": [
      "1. Draw a schematic coordinate frame.",
      "2. State explicit balance equations."
    ],
    "failureSignal": "Check dimensional consistency and boundary behavior.",
    "difficulty": "MEDIUM",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-MAT-POLY-NCERT9-EX21-Q16",
    "packageId": "LIB-MATH-POLYNOMIALS",
    "subject": "MATHEMATICS",
    "domain": "Algebra & Polynomials",
    "stem": "The factorisation of 4x\u00b2 + 8x + 3 is",
    "options": [
      "(A) (x + 1) (x + 3)",
      "(B) (2x + 1) (2x + 3)",
      "(C) (2x + 2) (2x + 5)",
      "(D) (2x - 1) (2x - 3)"
    ],
    "hints": [
      "Recall defining conservation relations and frame definitions."
    ],
    "hintLadder": [
      "1. Draw a schematic coordinate frame.",
      "2. State explicit balance equations."
    ],
    "failureSignal": "Check dimensional consistency and boundary behavior.",
    "difficulty": "MEDIUM",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-MAT-POLY-NCERT9-EX21-Q17",
    "packageId": "LIB-MATH-POLYNOMIALS",
    "subject": "MATHEMATICS",
    "domain": "Algebra & Polynomials",
    "stem": "Which of the following is a factor of (x + y)\u00b3 - (x\u00b3 + y\u00b3)?",
    "options": [
      "(A) x\u00b2 + y\u00b2 + 2xy",
      "(B) x\u00b2 + y\u00b2 - xy",
      "(C) xy\u00b2",
      "(D) 3xy"
    ],
    "hints": [
      "Recall defining conservation relations and frame definitions."
    ],
    "hintLadder": [
      "1. Draw a schematic coordinate frame.",
      "2. State explicit balance equations."
    ],
    "failureSignal": "Check dimensional consistency and boundary behavior.",
    "difficulty": "MEDIUM",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-MAT-POLY-NCERT9-EX21-Q18",
    "packageId": "LIB-MATH-POLYNOMIALS",
    "subject": "MATHEMATICS",
    "domain": "Algebra & Polynomials",
    "stem": "The coefficient of x in the expansion of (x + 3)\u00b3 is",
    "options": [
      "(A) 1",
      "(B) 9",
      "(C) 18",
      "(D) 27"
    ],
    "hints": [
      "Recall defining conservation relations and frame definitions."
    ],
    "hintLadder": [
      "1. Draw a schematic coordinate frame.",
      "2. State explicit balance equations."
    ],
    "failureSignal": "Check dimensional consistency and boundary behavior.",
    "difficulty": "MEDIUM",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-MAT-POLY-NCERT9-EX21-Q19",
    "packageId": "LIB-MATH-POLYNOMIALS",
    "subject": "MATHEMATICS",
    "domain": "Algebra & Polynomials",
    "stem": "If x/y + y/x = -1 (x, y \u2260 0), the value of x\u00b3 - y\u00b3 is",
    "options": [
      "(A) 1",
      "(B) -1",
      "(C) 0",
      "(D) 1/2"
    ],
    "hints": [
      "Recall defining conservation relations and frame definitions."
    ],
    "hintLadder": [
      "1. Draw a schematic coordinate frame.",
      "2. State explicit balance equations."
    ],
    "failureSignal": "Check dimensional consistency and boundary behavior.",
    "difficulty": "MEDIUM",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-MAT-POLY-NCERT9-EX21-Q20",
    "packageId": "LIB-MATH-POLYNOMIALS",
    "subject": "MATHEMATICS",
    "domain": "Algebra & Polynomials",
    "stem": "If 49x\u00b2 - b = (7x + 1/2)(7x - 1/2), then the value of b is",
    "options": [
      "(A) 0",
      "(B) 1/\u221a2",
      "(C) 1/4",
      "(D) 1/2"
    ],
    "hints": [
      "Recall defining conservation relations and frame definitions."
    ],
    "hintLadder": [
      "1. Draw a schematic coordinate frame.",
      "2. State explicit balance equations."
    ],
    "failureSignal": "Check dimensional consistency and boundary behavior.",
    "difficulty": "MEDIUM",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-MAT-POLY-NCERT9-EX21-Q21",
    "packageId": "LIB-MATH-POLYNOMIALS",
    "subject": "MATHEMATICS",
    "domain": "Algebra & Polynomials",
    "stem": "If a + b + c = 0, then a\u00b3 + b\u00b3 + c\u00b3 is equal to",
    "options": [
      "(A) 0",
      "(B) abc",
      "(C) 3abc",
      "(D) 2abc"
    ],
    "hints": [
      "Recall defining conservation relations and frame definitions."
    ],
    "hintLadder": [
      "1. Draw a schematic coordinate frame.",
      "2. State explicit balance equations."
    ],
    "failureSignal": "Check dimensional consistency and boundary behavior.",
    "difficulty": "MEDIUM",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-MAT-POLY-NCERT9-EX22-Q01",
    "packageId": "LIB-MATH-POLYNOMIALS",
    "subject": "MATHEMATICS",
    "domain": "Algebra & Polynomials",
    "stem": "Which of the following expressions are polynomials? Justify your answer: (i) 1/x (ii) \u221ax + 2 (iii) x\u00b2 + 2x + 1 (iv) 1",
    "options": [],
    "hints": [
      "Recall defining conservation relations and frame definitions."
    ],
    "hintLadder": [
      "1. Draw a schematic coordinate frame.",
      "2. State explicit balance equations."
    ],
    "failureSignal": "Check dimensional consistency and boundary behavior.",
    "difficulty": "MEDIUM",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-MAT-POLY-NCERT9-EX22-Q02-II",
    "packageId": "LIB-MATH-POLYNOMIALS",
    "subject": "MATHEMATICS",
    "domain": "Algebra & Polynomials",
    "stem": "State whether the following statement is True or False? Justify your answer: Every polynomial is a binomial.",
    "options": [
      "True",
      "False"
    ],
    "hints": [
      "Recall defining conservation relations and frame definitions."
    ],
    "hintLadder": [
      "1. Draw a schematic coordinate frame.",
      "2. State explicit balance equations."
    ],
    "failureSignal": "Check dimensional consistency and boundary behavior.",
    "difficulty": "MEDIUM",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-MAT-POLY-NCERT9-EX22-Q02-IV",
    "packageId": "LIB-MATH-POLYNOMIALS",
    "subject": "MATHEMATICS",
    "domain": "Algebra & Polynomials",
    "stem": "State whether the following statement is True or False? Justify your answer: A polynomial cannot have more than one zero.",
    "options": [
      "True",
      "False"
    ],
    "hints": [
      "Recall defining conservation relations and frame definitions."
    ],
    "hintLadder": [
      "1. Draw a schematic coordinate frame.",
      "2. State explicit balance equations."
    ],
    "failureSignal": "Check dimensional consistency and boundary behavior.",
    "difficulty": "MEDIUM",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-MAT-POLY-NCERT9-EX23-Q01-I",
    "packageId": "LIB-MATH-POLYNOMIALS",
    "subject": "MATHEMATICS",
    "domain": "Algebra & Polynomials",
    "stem": "Find the degree of the polynomial: x\u2075 - x\u2074 + 3",
    "options": [],
    "hints": [
      "Recall defining conservation relations and frame definitions."
    ],
    "hintLadder": [
      "1. Draw a schematic coordinate frame.",
      "2. State explicit balance equations."
    ],
    "failureSignal": "Check dimensional consistency and boundary behavior.",
    "difficulty": "MEDIUM",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-MAT-POLY-NCERT9-EX23-Q01-II",
    "packageId": "LIB-MATH-POLYNOMIALS",
    "subject": "MATHEMATICS",
    "domain": "Algebra & Polynomials",
    "stem": "Find the degree of the polynomial: 2 - y\u00b2 - y\u00b3 + 2y\u2078",
    "options": [],
    "hints": [
      "Recall defining conservation relations and frame definitions."
    ],
    "hintLadder": [
      "1. Draw a schematic coordinate frame.",
      "2. State explicit balance equations."
    ],
    "failureSignal": "Check dimensional consistency and boundary behavior.",
    "difficulty": "MEDIUM",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-MAT-POLY-NCERT9-EX23-Q01-III",
    "packageId": "LIB-MATH-POLYNOMIALS",
    "subject": "MATHEMATICS",
    "domain": "Algebra & Polynomials",
    "stem": "Find the degree of the polynomial: 2",
    "options": [],
    "hints": [
      "Recall defining conservation relations and frame definitions."
    ],
    "hintLadder": [
      "1. Draw a schematic coordinate frame.",
      "2. State explicit balance equations."
    ],
    "failureSignal": "Check dimensional consistency and boundary behavior.",
    "difficulty": "MEDIUM",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-MAT-POLY-NCERT9-EX23-Q02-I",
    "packageId": "LIB-MATH-POLYNOMIALS",
    "subject": "MATHEMATICS",
    "domain": "Algebra & Polynomials",
    "stem": "Write the coefficient of x\u00b2 in the following: 2 + x\u00b2 + x",
    "options": [],
    "hints": [
      "Recall defining conservation relations and frame definitions."
    ],
    "hintLadder": [
      "1. Draw a schematic coordinate frame.",
      "2. State explicit balance equations."
    ],
    "failureSignal": "Check dimensional consistency and boundary behavior.",
    "difficulty": "MEDIUM",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-MAT-POLY-NCERT9-EX23-Q02-II",
    "packageId": "LIB-MATH-POLYNOMIALS",
    "subject": "MATHEMATICS",
    "domain": "Algebra & Polynomials",
    "stem": "Write the coefficient of x\u00b2 in the following: 2 - x\u00b2 + x\u00b3",
    "options": [],
    "hints": [
      "Recall defining conservation relations and frame definitions."
    ],
    "hintLadder": [
      "1. Draw a schematic coordinate frame.",
      "2. State explicit balance equations."
    ],
    "failureSignal": "Check dimensional consistency and boundary behavior.",
    "difficulty": "MEDIUM",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-ELEC-1A-CONSERVATION-01",
    "packageId": "LIB-PHY-ELEC-CURRENT-OHM-AUTHORED",
    "subject": "PHYSICS",
    "domain": "Electricity & Circuits",
    "stem": "A single-path circuit carries a steady current. A lamp is in the path. An ammeter placed before the lamp reads 0.5 A. What does an identical ammeter placed after the lamp read? Justify your answer without appealing to what the lamp does with energy.",
    "options": [],
    "hints": [
      "Recall defining conservation relations and frame definitions."
    ],
    "hintLadder": [
      "1. Draw a schematic coordinate frame.",
      "2. State explicit balance equations."
    ],
    "failureSignal": "Check dimensional consistency and boundary behavior.",
    "difficulty": "{'band': 'D1', 'score': 2, 'components': {'concept_model_selection': 1, 'representation_translation': 0, 'reasoning_chain_length': 1, 'algebra_computational_load': 0, 'trap_exception_sensitivity': 0}, 'basis': 'Direct application of charge conservation in a single steady path; no computation required.'}",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-ELEC-1A-OHMIC-01",
    "packageId": "LIB-PHY-ELEC-CURRENT-OHM-AUTHORED",
    "subject": "PHYSICS",
    "domain": "Electricity & Circuits",
    "stem": "A device is tested at three operating points under fixed conditions: (2 V, 1 A), (4 V, 2 A), (6 V, 3 A). Compute V/I for each pair. Does the data support one constant-resistance model? State the resistance if so.",
    "options": [],
    "hints": [
      "Recall defining conservation relations and frame definitions."
    ],
    "hintLadder": [
      "1. Draw a schematic coordinate frame.",
      "2. State explicit balance equations."
    ],
    "failureSignal": "Check dimensional consistency and boundary behavior.",
    "difficulty": "{'band': 'D1', 'score': 2, 'components': {'concept_model_selection': 1, 'representation_translation': 0, 'reasoning_chain_length': 1, 'algebra_computational_load': 0, 'trap_exception_sensitivity': 0}, 'basis': 'Direct ratio comparison across three pairs to decide constant-resistance model validity.'}",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-ELEC-2A-CONSERVATION-01",
    "packageId": "LIB-PHY-ELEC-CURRENT-OHM-AUTHORED",
    "subject": "PHYSICS",
    "domain": "Electricity & Circuits",
    "stem": "A battery drives a steady current through two resistors connected in series (single unbranched path). An ammeter between resistor 1 and resistor 2 reads 0.3 A. (a) State the current entering resistor 1 and the current leaving resistor 2. (b) A student claims the current leaving resistor 2 must be less than 0.3 A because resistor 2 \"uses up\" current. Identify the error in the student's reasoning.",
    "options": [],
    "hints": [
      "In a single path at steady state, does any component have a private store of charge?",
      "Apply the entry-exit boundary ledger to each resistor separately."
    ],
    "hintLadder": [
      "Step 1: ORIENT",
      "Step 2: REPRESENT"
    ],
    "failureSignal": "If your answer to (a) gives different currents before and after resistor 2, you are treating charge flow as something the resistor can absorb. Apply the conservation argument: in a steady single path, entry rate equals exit rate at every boundary.",
    "difficulty": "{'band': 'D2', 'score': 3, 'components': {'concept_model_selection': 1, 'representation_translation': 0, 'reasoning_chain_length': 1, 'algebra_computational_load': 0, 'trap_exception_sensitivity': 1}, 'basis': 'Applies charge conservation with two in-series components and requires diagnosing a misconception.'}",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-ELEC-2B-OHMIC-01",
    "packageId": "LIB-PHY-ELEC-CURRENT-OHM-AUTHORED",
    "subject": "PHYSICS",
    "domain": "Electricity & Circuits",
    "stem": "A device is tested at three temperature settings T1, T2, T3. Table T1 (2 V, 1 A; 4 V, 2 A; 6 V, 3 A): constant ratio. Table T2 (2 V, 1 A; 4 V, 1.6 A; 6 V, 3 A): ratio changes. Table T3 (2 V, 0.5 A; 4 V, 1 A; 6 V, 1.5 A): constant ratio, but a different constant than T1. (a) Which tables support a constant-resistance Ohmic model under their respective conditions? (b) A student says \"R = 2 \u03a9 because table T1 says so; that value applies to all three conditions.\" Identify the error and correct it.",
    "options": [],
    "hints": [
      "Test each table independently before comparing conditions.",
      "Compute V/I for every pair in T2 and look for a change in the ratio."
    ],
    "hintLadder": [
      "Step 1: ORIENT",
      "Step 2: REPRESENT"
    ],
    "failureSignal": "If you carried R=2 \u03a9 from T1 to T3 without re-testing, you made the condition-transfer error the problem asks you to diagnose. T3 must be tested independently; it gives R=4 \u03a9, not 2 \u03a9.",
    "difficulty": "{'band': 'D3', 'score': 6, 'components': {'concept_model_selection': 2, 'representation_translation': 1, 'reasoning_chain_length': 1, 'algebra_computational_load': 1, 'trap_exception_sensitivity': 1}, 'basis': 'Three-condition model test requiring independent ratio tests and an error diagnosis; T3 gives a different R than T1.'}",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-PHY-GRAV-2A-01",
    "packageId": "LIB-PHY-GRAV-UNIVERSAL-LAW-AUTHORED",
    "subject": "PHYSICS",
    "domain": "Kinematics & Motion",
    "stem": "Two separated bodies are shown with their centres marked. Draw the gravitational-force direction on each body and explain what changes if the body labels are exchanged.",
    "options": [],
    "hints": [
      "Start by asking yourself: What line is fixed by the positions of the two body centres?",
      "Treat gravity as an interaction pair: each body experiences a force directed toward the other along the same line."
    ],
    "hintLadder": [
      "Step 1: ORIENT",
      "Step 2: FIRST_RELATION"
    ],
    "failureSignal": "Check dimensional consistency and boundary behavior.",
    "difficulty": "{'band': 'D2', 'score': 3, 'components': {'concept_model_selection': 1, 'representation_translation': 1, 'reasoning_chain_length': 1, 'algebra_computational_load': 0, 'trap_exception_sensitivity': 0}, 'basis': \"Applies Newton's law of universal gravitation and third law to draw mutual attractive force vectors along the line connecting body centres.\"}",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-PHY-KIN-2A-01",
    "packageId": "LIB-PHY-KIN-1D-MOTION-AUTHORED",
    "subject": "PHYSICS",
    "domain": "Kinematics & Motion",
    "stem": "Route A leaves a marker and returns to it. Route B travels the same total amount but ends away from the marker. Without calculating a value, compare their distance and displacement.",
    "options": [],
    "hints": [
      "Start by asking yourself: Did the traveller move along any part of the path before returning?",
      "Count every part of the route for distance; compare only the start and finish for displacement, keeping the declared direction."
    ],
    "hintLadder": [
      "Step 1: ORIENT",
      "Step 2: FIRST_RELATION"
    ],
    "failureSignal": "Check dimensional consistency and boundary behavior.",
    "difficulty": "{'band': 'D1', 'score': 2, 'components': {'concept_model_selection': 1, 'representation_translation': 0, 'reasoning_chain_length': 1, 'algebra_computational_load': 0, 'trap_exception_sensitivity': 0}, 'basis': 'Qualitative comparison distinguishing path distance from net displacement for closed versus open paths.'}",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-PHY-KIN-2A-COV-02",
    "packageId": "LIB-PHY-KIN-1D-MOTION-AUTHORED",
    "subject": "PHYSICS",
    "domain": "Kinematics & Motion",
    "stem": "A trip covers 120 m of total path, finishes 40 m in the positive direction from its start, and lasts 20 s. Find the average speed and average velocity.",
    "options": [],
    "hints": [
      "Start by asking: What total quantity keeps every travelled leg even if the direction reverses?",
      "Build total distance and total time first. Only equal time weighting permits an unweighted arithmetic mean of speeds."
    ],
    "hintLadder": [
      "Step 1: ORIENT",
      "Step 2: FIRST_RELATION"
    ],
    "failureSignal": "Check dimensional consistency and boundary behavior.",
    "difficulty": "{'band': 'D1', 'score': 2, 'components': {'concept_model_selection': 1, 'representation_translation': 0, 'reasoning_chain_length': 1, 'algebra_computational_load': 0, 'trap_exception_sensitivity': 0}, 'basis': 'Direct calculation distinguishing average speed (total distance / time) from average velocity (displacement / time).'}",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-PHY-KIN-2A-COV-03",
    "packageId": "LIB-PHY-KIN-1D-MOTION-AUTHORED",
    "subject": "PHYSICS",
    "domain": "Kinematics & Motion",
    "stem": "A velocity-time graph is a straight segment from 5 m/s at t = 0 to 11 m/s at t = 3 s. Use the graph slope to identify a, use its rectangle-plus-triangle area to find displacement, and show how the same graph yields v = u + at, s = ut + 0.5at^2, and v^2 = u^2 + 2as.",
    "options": [],
    "hints": [
      "Start with the two graph invariants: slope is acceleration, and velocity-time area is displacement.",
      "Split the area into u t plus 1/2(v-u)t; then use the slope relation v-u=at."
    ],
    "hintLadder": [
      "Step 1: ORIENT",
      "Step 2: FIRST_RELATION"
    ],
    "failureSignal": "Check dimensional consistency and boundary behavior.",
    "difficulty": "{'band': 'D3', 'score': 6, 'components': {'concept_model_selection': 1, 'representation_translation': 2, 'reasoning_chain_length': 2, 'algebra_computational_load': 1, 'trap_exception_sensitivity': 0}, 'basis': 'Derives the three standard kinematic equations geometrically and analytically from the slope and area of a linear velocity-time graph.'}",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-PHY-KIN-2A-COV-04",
    "packageId": "LIB-PHY-KIN-1D-MOTION-AUTHORED",
    "subject": "PHYSICS",
    "domain": "Kinematics & Motion",
    "stem": "A runner moves uniformly around a circular track of radius 7 m and completes one revolution in 14 s. Find the speed, then state the qualitative directions of velocity and acceleration at any point.",
    "options": [],
    "hints": [
      "One complete revolution covers the circle circumference, 2 pi r.",
      "Divide that path length by the revolution period for the constant speed."
    ],
    "hintLadder": [
      "Step 1: ORIENT",
      "Step 2: FIRST_RELATION"
    ],
    "failureSignal": "Check dimensional consistency and boundary behavior.",
    "difficulty": "{'band': 'D2', 'score': 4, 'components': {'concept_model_selection': 1, 'representation_translation': 1, 'reasoning_chain_length': 1, 'algebra_computational_load': 0, 'trap_exception_sensitivity': 1}, 'basis': 'Computes circular speed from perimeter and period, identifying tangential velocity and inward centripetal acceleration.'}",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-PHY-KIN-2A-COV-05",
    "packageId": "LIB-PHY-KIN-1D-MOTION-AUTHORED",
    "subject": "PHYSICS",
    "domain": "Kinematics & Motion",
    "stem": "On a velocity-time graph, velocity changes from +3 m/s at 2 s to +5 m/s at 4 s. Find the average acceleration over that interval and state what a horizontal velocity-time segment would mean.",
    "options": [],
    "hints": [
      "Read the vertical axis first: this graph shows velocity, not position.",
      "Average acceleration is signed velocity change divided by elapsed time."
    ],
    "hintLadder": [
      "Step 1: ORIENT",
      "Step 2: FIRST_RELATION"
    ],
    "failureSignal": "Check dimensional consistency and boundary behavior.",
    "difficulty": "{'band': 'D2', 'score': 3, 'components': {'concept_model_selection': 1, 'representation_translation': 1, 'reasoning_chain_length': 1, 'algebra_computational_load': 0, 'trap_exception_sensitivity': 0}, 'basis': 'Calculates acceleration from velocity-time slope and interprets zero-slope horizontal segments as constant velocity.'}",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-PHY-KIN-PRACTICAL-13",
    "packageId": "LIB-PHY-KIN-1D-MOTION-AUTHORED",
    "subject": "PHYSICS",
    "domain": "Kinematics & Motion",
    "stem": "Design the inclined-plane motion practical needed to produce both a distance/position-time graph and a velocity-time graph. State what you measure, how you construct the two graphs, and what graph evidence would support approximately constant acceleration.",
    "options": [],
    "hints": [
      "Start with a table of time and position along the incline; both graphs must come from measured motion data.",
      "Use successive Delta x / Delta t values to build the velocity-time data before interpreting its slope."
    ],
    "hintLadder": [
      "Step 1: ORIENT",
      "Step 2: FIRST_RELATION"
    ],
    "failureSignal": "Check dimensional consistency and boundary behavior.",
    "difficulty": "{'band': 'D3', 'score': 7, 'components': {'concept_model_selection': 2, 'representation_translation': 2, 'reasoning_chain_length': 2, 'algebra_computational_load': 0, 'trap_exception_sensitivity': 1}, 'basis': 'Experimental design requiring instrument selection, measurement procedure, graphical construction, and constant-acceleration verification criteria.'}",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-PHY-KIN-VERT-2A-UPWARD-01",
    "packageId": "LIB-PHY-KIN-1D-MOTION-AUTHORED",
    "subject": "PHYSICS",
    "domain": "Kinematics & Motion",
    "stem": "A ball is projected vertically upward from a marked launch point with speed u. Choose upward as positive and treat the local gravitational acceleration magnitude g as constant. Derive the time to the highest point and the maximum height above the launch point.",
    "options": [],
    "hints": [
      "After choosing +up, which signed value must the downward gravitational acceleration have for the whole rise?",
      "At the top use v=0 as the event condition, then choose one relation for time and one that eliminates time for height."
    ],
    "hintLadder": [
      "Step 1: ORIENT",
      "Step 2: FIRST_RELATION"
    ],
    "failureSignal": "Check dimensional consistency and boundary behavior.",
    "difficulty": "{'band': 'D2', 'score': 4, 'components': {'concept_model_selection': 1, 'representation_translation': 1, 'reasoning_chain_length': 1, 'algebra_computational_load': 1, 'trap_exception_sensitivity': 0}, 'basis': 'Derives vertical apex time and maximum height symbolically under constant gravitational acceleration with upward sign convention.'}",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-PHY-KIN-VERT-2A-DROP-02",
    "packageId": "LIB-PHY-KIN-1D-MOTION-AUTHORED",
    "subject": "PHYSICS",
    "domain": "Kinematics & Motion",
    "stem": "A stone is released from rest at height h above the ground. Put the origin at the release point and choose upward as positive. Find the time to reach the ground and the signed velocity just before impact.",
    "options": [],
    "hints": [
      "With the origin at release and +up, what is the signed displacement of the ground?",
      "Use u=0, s=-h and a=-g; select the positive time root because the question asks for a future impact."
    ],
    "hintLadder": [
      "Step 1: ORIENT",
      "Step 2: FIRST_RELATION"
    ],
    "failureSignal": "Check dimensional consistency and boundary behavior.",
    "difficulty": "{'band': 'D2', 'score': 5, 'components': {'concept_model_selection': 1, 'representation_translation': 1, 'reasoning_chain_length': 1, 'algebra_computational_load': 1, 'trap_exception_sensitivity': 1}, 'basis': 'Calculates free-fall drop duration and downward signed impact velocity under an upward-positive coordinate convention.'}",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-PHY-KIN-VERT-2A-RETURN-03",
    "packageId": "LIB-PHY-KIN-1D-MOTION-AUTHORED",
    "subject": "PHYSICS",
    "domain": "Kinematics & Motion",
    "stem": "A ball is projected vertically upward from a marked point with speed u and later returns to the same point. Choose upward as positive. Find the nonzero return time, the signed return velocity, the whole-trip displacement, and the whole-trip distance.",
    "options": [],
    "hints": [
      "Returning to the launch point fixes the signed displacement, not the total path length.",
      "Set s=0 in the constant-acceleration displacement equation and keep the nonzero future-time root."
    ],
    "hintLadder": [
      "Step 1: ORIENT",
      "Step 2: FIRST_RELATION"
    ],
    "failureSignal": "Check dimensional consistency and boundary behavior.",
    "difficulty": "{'band': 'D2', 'score': 5, 'components': {'concept_model_selection': 1, 'representation_translation': 1, 'reasoning_chain_length': 1, 'algebra_computational_load': 1, 'trap_exception_sensitivity': 1}, 'basis': 'Evaluates symmetric round-trip projectile motion, distinguishing zero net displacement from non-zero total distance and finding return velocity.'}",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-PHY-KIN-VERT-2A-DOWN-AXIS-04",
    "packageId": "LIB-PHY-KIN-1D-MOTION-AUTHORED",
    "subject": "PHYSICS",
    "domain": "Kinematics & Motion",
    "stem": "A stone is released from rest h above the ground, but this time choose downward as positive and put the origin at the release point. Find the signed acceleration, ground displacement, time to impact and signed impact velocity.",
    "options": [],
    "hints": [
      "The sign of g follows the declared axis. Does downward gravity align with or oppose a downward-positive coordinate?",
      "Use s=+h and a=+g consistently; compare the final physical speed with the +up representation afterward."
    ],
    "hintLadder": [
      "Step 1: ORIENT",
      "Step 2: FIRST_RELATION"
    ],
    "failureSignal": "Check dimensional consistency and boundary behavior.",
    "difficulty": "{'band': 'D2', 'score': 5, 'components': {'concept_model_selection': 1, 'representation_translation': 1, 'reasoning_chain_length': 1, 'algebra_computational_load': 1, 'trap_exception_sensitivity': 1}, 'basis': 'Executes free-fall calculations under a downward-positive coordinate frame, verifying invariant physical time and downward vector sign.'}",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-PHY-KIN-VERT-2A-APEX-05",
    "packageId": "LIB-PHY-KIN-1D-MOTION-AUTHORED",
    "subject": "PHYSICS",
    "domain": "Kinematics & Motion",
    "stem": "A ball thrown vertically upward reaches its highest point. Choose upward as positive. State the instantaneous velocity and acceleration at the top, then describe the signs of velocity just before and just after that instant.",
    "options": [],
    "hints": [
      "Does the gravitational interaction disappear at the instant the velocity reaches zero?",
      "Compare velocity signs just before and after the top while keeping the gravitational acceleration direction fixed."
    ],
    "hintLadder": [
      "Step 1: ORIENT",
      "Step 2: FIRST_RELATION"
    ],
    "failureSignal": "Check dimensional consistency and boundary behavior.",
    "difficulty": "{'band': 'D2', 'score': 3, 'components': {'concept_model_selection': 1, 'representation_translation': 0, 'reasoning_chain_length': 1, 'algebra_computational_load': 0, 'trap_exception_sensitivity': 1}, 'basis': 'Targets the common misconception that acceleration vanishes at the apex when velocity is momentarily zero in vertical motion.'}",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-PHY-KIN-VERT-2B-REVERSED-AXIS-01",
    "packageId": "LIB-PHY-KIN-1D-MOTION-AUTHORED",
    "subject": "PHYSICS",
    "domain": "Kinematics & Motion",
    "stem": "A ball is physically launched upward with speed u from the origin, but a solver deliberately chooses downward as positive. Write the signed initial velocity and acceleration, derive the signed displacement to the highest point and the time to reach it, and show that the physical maximum height agrees with the usual +up calculation.",
    "options": [],
    "hints": [
      "With downward positive, what signs represent an upward initial velocity and a downward acceleration?",
      "Use the same apex condition v=0, then interpret a negative displacement as a physical point above the origin."
    ],
    "hintLadder": [
      "Step 1: ORIENT",
      "Step 2: FIRST_RELATION"
    ],
    "failureSignal": "Check dimensional consistency and boundary behavior.",
    "difficulty": "{'band': 'D3', 'score': 7, 'components': {'concept_model_selection': 2, 'representation_translation': 2, 'reasoning_chain_length': 1, 'algebra_computational_load': 1, 'trap_exception_sensitivity': 1}, 'basis': 'Demonstrates coordinate invariance by solving vertical launch with downward-positive axis, mapping negative velocity and positive g to physical peak height.'}",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-PHY-KIN-VERT-2B-BALCONY-02",
    "packageId": "LIB-PHY-KIN-1D-MOTION-AUTHORED",
    "subject": "PHYSICS",
    "domain": "Kinematics & Motion",
    "stem": "A ball is launched vertically upward from a balcony with speed u. The ground is H below the launch point. Put the origin at the balcony and choose upward as positive. Derive the future time at which the ball reaches the ground and the signed impact velocity.",
    "options": [],
    "hints": [
      "With the launch point as origin and +up, what signed displacement names the ground event?",
      "The displacement equation produces two algebraic roots; keep the one that represents a time after launch."
    ],
    "hintLadder": [
      "Step 1: ORIENT",
      "Step 2: FIRST_RELATION"
    ],
    "failureSignal": "Check dimensional consistency and boundary behavior.",
    "difficulty": "{'band': 'D3', 'score': 7, 'components': {'concept_model_selection': 2, 'representation_translation': 1, 'reasoning_chain_length': 2, 'algebra_computational_load': 1, 'trap_exception_sensitivity': 1}, 'basis': 'Solves asymmetric vertical launch from elevated height with displacement -H, selecting the positive physical quadratic root for time.'}",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-PHY-KIN-VERT-2B-SAME-HEIGHT-03",
    "packageId": "LIB-PHY-KIN-1D-MOTION-AUTHORED",
    "subject": "PHYSICS",
    "domain": "Kinematics & Motion",
    "stem": "A ball projected vertically upward with speed u passes a point h above the launch level once on the way up and once on the way down. Choose upward as positive. Compare the two velocities at that same height without first solving for the two times.",
    "options": [],
    "hints": [
      "At the two passages the displacement from launch is the same, but is the direction of motion the same?",
      "Use the relation containing v squared to get the common speed magnitude, then assign velocity signs from ascent versus descent."
    ],
    "hintLadder": [
      "Step 1: ORIENT",
      "Step 2: FIRST_RELATION"
    ],
    "failureSignal": "Check dimensional consistency and boundary behavior.",
    "difficulty": "{'band': 'D3', 'score': 6, 'components': {'concept_model_selection': 2, 'representation_translation': 1, 'reasoning_chain_length': 1, 'algebra_computational_load': 1, 'trap_exception_sensitivity': 1}, 'basis': 'Applies v^2 = u^2 - 2gh to prove that velocities at identical elevation have equal magnitude and opposite signs without solving for intermediate times.'}",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-PHY-KIN-VERT-2B-DIRECTION-SWITCH-04",
    "packageId": "LIB-PHY-KIN-1D-MOTION-AUTHORED",
    "subject": "PHYSICS",
    "domain": "Kinematics & Motion",
    "stem": "A solver chooses upward as positive for a vertical throw. They use a=-g until the ball reaches the top, then change to a=+g because the ball is moving downward. Decide whether this model change is valid and state the correct signed acceleration before, at and after the apex.",
    "options": [],
    "hints": [
      "Did either the positive axis or the physical direction of gravity change when the ball passed through the top?"
    ],
    "hintLadder": [
      "Step 1: ORIENT"
    ],
    "failureSignal": "Check dimensional consistency and boundary behavior.",
    "difficulty": "{'band': 'D2', 'score': 5, 'components': {'concept_model_selection': 2, 'representation_translation': 0, 'reasoning_chain_length': 1, 'algebra_computational_load': 0, 'trap_exception_sensitivity': 2}, 'basis': 'Diagnoses and refutes the erroneous convention-switching error where acceleration sign is falsely tied to instantaneous velocity direction.'}",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-PHY-KIN-VERT-2B-VT-GRAPH-05",
    "packageId": "LIB-PHY-KIN-1D-MOTION-AUTHORED",
    "subject": "PHYSICS",
    "domain": "Kinematics & Motion",
    "stem": "A ball is launched vertically upward from its starting level with speed u. Choose upward as positive. Describe the velocity-time graph from launch until the ball first returns to the launch level, and use the graph to identify the apex time and return time.",
    "options": [],
    "hints": [
      "With constant a=-g, what shape must a velocity-time graph have, and what does its slope represent?",
      "Use the zero crossing for the apex; for return to the starting level, the signed area under v(t) over the whole interval must be zero."
    ],
    "hintLadder": [
      "Step 1: ORIENT",
      "Step 2: FIRST_RELATION"
    ],
    "failureSignal": "Check dimensional consistency and boundary behavior.",
    "difficulty": "{'band': 'D3', 'score': 6, 'components': {'concept_model_selection': 1, 'representation_translation': 2, 'reasoning_chain_length': 1, 'algebra_computational_load': 1, 'trap_exception_sensitivity': 1}, 'basis': 'Constructs and interprets linear velocity-time graph crossing the time axis at the apex and using triangular area cancellation for round-trip return.'}",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-PHY-KIN-CIRC-2A-FORCE-ROLE-01",
    "packageId": "LIB-PHY-KIN-1D-MOTION-AUTHORED",
    "subject": "PHYSICS",
    "domain": "Kinematics & Motion",
    "stem": "A 2.0 kg mass moves at 4.0 m/s in a horizontal circle of radius 2.0 m on a single ideal string. In an inertial frame, identify the horizontal force arrow(s) on the mass and calculate the required inward net force.",
    "options": [],
    "hints": [
      "List physical agents before writing the radial equation.",
      "Use inward-positive Sigma F_r=m v^2/r."
    ],
    "hintLadder": [
      "Step 1: ORIENT",
      "Step 2: FIRST_RELATION"
    ],
    "failureSignal": "Check dimensional consistency and boundary behavior.",
    "difficulty": "{'band': 'D2', 'score': 4, 'components': {'concept_model_selection': 1, 'representation_translation': 1, 'reasoning_chain_length': 1, 'algebra_computational_load': 1, 'trap_exception_sensitivity': 0}, 'basis': 'Identifies string tension as the physical provider of centripetal acceleration in horizontal circular motion and computes mv^2/r.'}",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-PHY-KIN-CIRC-2B-FLAT-CURVE-02",
    "packageId": "LIB-PHY-KIN-1D-MOTION-AUTHORED",
    "subject": "PHYSICS",
    "domain": "Kinematics & Motion",
    "stem": "A 1000 kg car takes a flat circular curve of radius 50 m at 10 m/s. With mu_s=0.30 and g=10 m/s^2, decide whether static friction can supply the required inward force without slipping. Do not assume f_s=mu_s N unless the threshold is reached.",
    "options": [],
    "hints": [
      "First calculate the inward force the motion requires; only then compare it with the static-friction limit."
    ],
    "hintLadder": [
      "Step 1: ORIENT"
    ],
    "failureSignal": "Check dimensional consistency and boundary behavior.",
    "difficulty": "{'band': 'D3', 'score': 7, 'components': {'concept_model_selection': 2, 'representation_translation': 1, 'reasoning_chain_length': 2, 'algebra_computational_load': 1, 'trap_exception_sensitivity': 1}, 'basis': 'Compares required centripetal force against maximum static friction threshold, avoiding the trap of equating actual friction to maximum available friction.'}",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-PHY-KIN-CIRC-2B-VERTICAL-03",
    "packageId": "LIB-PHY-KIN-1D-MOTION-AUTHORED",
    "subject": "PHYSICS",
    "domain": "Kinematics & Motion",
    "stem": "A mass on a taut string moves in a vertical circle of radius r. Write the radial force equation at the top and at the bottom using inward positive at each point. Then obtain the minimum top speed for the just-taut boundary.",
    "options": [],
    "hints": [
      "Redraw the inward arrow separately at the top and bottom before assigning signs."
    ],
    "hintLadder": [
      "Step 1: ORIENT"
    ],
    "failureSignal": "Check dimensional consistency and boundary behavior.",
    "difficulty": "{'band': 'D3', 'score': 7, 'components': {'concept_model_selection': 2, 'representation_translation': 1, 'reasoning_chain_length': 2, 'algebra_computational_load': 1, 'trap_exception_sensitivity': 1}, 'basis': 'Formulates radial dynamic equilibrium at vertical circular extremes, setting tension T >= 0 at the top to derive critical speed sqrt(gr).'}",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-PHY-KIN-2D-1A-SHARED-CLOCK-01",
    "packageId": "LIB-PHY-KIN-2D-MOTION-AUTHORED",
    "subject": "PHYSICS",
    "domain": "Kinematics & Motion",
    "stem": "A drone flies in a frame with origin at its launch pad, +x east, +y up and t = 0 at launch. Its position is x(t) = 6t m and y(t) = (8t \u2212 t\u00b2) m. Find its position at t = 2 s, and decide whether the pair x(2 s), y(4 s) is a position the drone ever occupies.",
    "options": [],
    "hints": [
      "Recall defining conservation relations and frame definitions."
    ],
    "hintLadder": [
      "1. Draw a schematic coordinate frame.",
      "2. State explicit balance equations."
    ],
    "failureSignal": "Check dimensional consistency and boundary behavior.",
    "difficulty": "MEDIUM",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-PHY-KIN-2D-1A-CONSTANT-ACCEL-01",
    "packageId": "LIB-PHY-KIN-2D-MOTION-AUTHORED",
    "subject": "PHYSICS",
    "domain": "Kinematics & Motion",
    "stem": "A puck on a tilted air table starts at the origin with velocity (4 i + 6 j) m/s, and its acceleration is (0 i \u2212 2 j) m/s\u00b2 throughout. Using the table's x-y frame, decide which constant-acceleration equations apply on each axis, find when the puck is next at y = 0, and find its x-position and velocity at that instant.",
    "options": [],
    "hints": [
      "Recall defining conservation relations and frame definitions."
    ],
    "hintLadder": [
      "1. Draw a schematic coordinate frame.",
      "2. State explicit balance equations."
    ],
    "failureSignal": "Check dimensional consistency and boundary behavior.",
    "difficulty": "MEDIUM",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-PHY-KIN-PROJ-1A-MODEL-01",
    "packageId": "LIB-PHY-KIN-2D-MOTION-AUTHORED",
    "subject": "PHYSICS",
    "domain": "Kinematics & Motion",
    "stem": "A ball is thrown from a balcony with u_x = 8 m/s and u_y = 6 m/s. After release only gravity acts, and air resistance is negligible. Take +y upward and g = 10 m/s\u00b2. Decide whether the ideal projectile model applies, write its component relations, and find the ball's displacement and velocity 1 s after release.",
    "options": [],
    "hints": [
      "Recall defining conservation relations and frame definitions."
    ],
    "hintLadder": [
      "1. Draw a schematic coordinate frame.",
      "2. State explicit balance equations."
    ],
    "failureSignal": "Check dimensional consistency and boundary behavior.",
    "difficulty": "MEDIUM",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-PHY-KIN-PROJ-1A-EVENTS-01",
    "packageId": "LIB-PHY-KIN-2D-MOTION-AUTHORED",
    "subject": "PHYSICS",
    "domain": "Kinematics & Motion",
    "stem": "An ideal projectile is launched from level ground with u_x = 6 m/s and u_y = 15 m/s. Take +y upward and g = 10 m/s\u00b2. Name the component condition for each event, then find the time and height of the apex, and the time and range when it lands back at launch height.",
    "options": [],
    "hints": [
      "Recall defining conservation relations and frame definitions."
    ],
    "hintLadder": [
      "1. Draw a schematic coordinate frame.",
      "2. State explicit balance equations."
    ],
    "failureSignal": "Check dimensional consistency and boundary behavior.",
    "difficulty": "MEDIUM",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-PHY-KIN-PROJ-1A-UNEQUAL-01",
    "packageId": "LIB-PHY-KIN-2D-MOTION-AUTHORED",
    "subject": "PHYSICS",
    "domain": "Kinematics & Motion",
    "stem": "A ball is thrown from the edge of a roof 25 m above level ground with u_x = 5 m/s and u_y = 20 m/s. Take +y upward and g = 10 m/s\u00b2, and neglect air resistance. Find when it hits the ground, how far from the building it lands, and its impact velocity and speed.",
    "options": [],
    "hints": [
      "Recall defining conservation relations and frame definitions."
    ],
    "hintLadder": [
      "1. Draw a schematic coordinate frame.",
      "2. State explicit balance equations."
    ],
    "failureSignal": "Check dimensional consistency and boundary behavior.",
    "difficulty": "MEDIUM",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-PHY-KIN-2D-2A-SHARED-CLOCK-01",
    "packageId": "LIB-PHY-KIN-2D-MOTION-AUTHORED",
    "subject": "PHYSICS",
    "domain": "Kinematics & Motion",
    "stem": "A tracker reports x(t)=4t metres and y(t)=10-2t^2 metres for one particle in one fixed frame. Find the particle's position at t=2 s, and explain why x(2 s) may not be paired with y(3 s) to describe one position.",
    "options": [],
    "hints": [
      "What must be the same when x(t) and y(t) describe one particle at one instant?",
      "Evaluate both component functions at the requested t before pairing them."
    ],
    "hintLadder": [
      "Step 1: ORIENT",
      "Step 2: REPRESENT",
      "Step 3: FIRST_RELATION",
      "Step 4: CONNECT"
    ],
    "failureSignal": "Your position is (8, \u22128) m or (12, 2) m: one coordinate was read at t = 3 s (y(3) = \u22128 m, x(3) = 12 m) while the other used t = 2 s.",
    "difficulty": "{'band': 'D2', 'score': 4, 'components': {'concept_model_selection': 1, 'representation_translation': 1, 'reasoning_chain_length': 1, 'algebra_computational_load': 0, 'trap_exception_sensitivity': 1}, 'basis': 'Requires evaluating separate component trajectories at a common timestamp and justifying why coordinates from different times cannot define a state.'}",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-PHY-KIN-2D-2A-CONSTANT-ACCEL-02",
    "packageId": "LIB-PHY-KIN-2D-MOTION-AUTHORED",
    "subject": "PHYSICS",
    "domain": "Kinematics & Motion",
    "stem": "A particle starts with velocity (3 i + 4 j) m/s and has constant acceleration (2 i - 1 j) m/s^2 for 3 s. Find its velocity and displacement after 3 s.",
    "options": [],
    "hints": [
      "Write the x and y initial velocity and acceleration values separately before calculating.",
      "Apply the same 1D constant-acceleration relation independently on each axis using the common 3 s."
    ],
    "hintLadder": [
      "Step 1: ORIENT",
      "Step 2: REPRESENT",
      "Step 3: FIRST_RELATION",
      "Step 4: CONNECT"
    ],
    "failureSignal": "You got v = (9 i + 7 j) m/s or \u0394y = 16.5 m: the \u22121 m/s\u00b2 was used as +1, so the y-acceleration lost its sign.",
    "difficulty": "{'band': 'D2', 'score': 4, 'components': {'concept_model_selection': 1, 'representation_translation': 1, 'reasoning_chain_length': 1, 'algebra_computational_load': 1, 'trap_exception_sensitivity': 0}, 'basis': 'Applies two-dimensional constant-acceleration kinematic vector formulas component-wise over a 3-second interval.'}",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-PHY-KIN-2D-2A-PROJECTILE-APEX-03",
    "packageId": "LIB-PHY-KIN-2D-MOTION-AUTHORED",
    "subject": "PHYSICS",
    "domain": "Kinematics & Motion",
    "stem": "An ideal projectile is launched with already-resolved components u_x=12 m/s and u_y=20 m/s. Take +y upward and g=10 m/s^2. Find the time to the apex, the velocity at the apex, the acceleration at the apex, and the height gained above launch.",
    "options": [],
    "hints": [
      "Which component condition defines the apex?",
      "Set only v_y to zero, solve for the shared time, then evaluate the other requested quantities at that time."
    ],
    "hintLadder": [
      "Step 1: ORIENT",
      "Step 2: REPRESENT",
      "Step 3: FIRST_RELATION",
      "Step 4: CONNECT"
    ],
    "failureSignal": "Your apex line says the velocity or the acceleration is zero: only v_y vanishes there, so a zero speed at the top means the 12 m/s horizontal component was dropped, and a zero acceleration means gravity was switched off.",
    "difficulty": "{'band': 'D2', 'score': 5, 'components': {'concept_model_selection': 1, 'representation_translation': 1, 'reasoning_chain_length': 1, 'algebra_computational_load': 1, 'trap_exception_sensitivity': 1}, 'basis': 'Requires recognizing that vertical velocity vanishes at the apex while horizontal velocity and downward acceleration remain nonzero.'}",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-PHY-KIN-2D-2A-HORIZONTAL-LAUNCH-04",
    "packageId": "LIB-PHY-KIN-2D-MOTION-AUTHORED",
    "subject": "PHYSICS",
    "domain": "Kinematics & Motion",
    "stem": "A stone is launched horizontally at 15 m/s from a cliff 20 m above level ground. Take +y upward and g=10 m/s^2. Find the flight time, horizontal range and impact velocity.",
    "options": [],
    "hints": [
      "Which component equation contains the known 20 m drop?",
      "Find the common impact time from y first, then use that same time in x and in the velocity components."
    ],
    "hintLadder": [
      "Step 1: ORIENT",
      "Step 2: REPRESENT",
      "Step 3: FIRST_RELATION",
      "Step 4: CONNECT"
    ],
    "failureSignal": "Your fall time is about 1.41 s (range about 21 m): that is \u221a(h/g) with the \u00bd dropped. Or you wrote +20 = \u22125t\u00b2 and found no real root: the drop is \u0394y = \u221220 m. Or you used the same-height formula 2u_y/g and got 0 s: it does not apply to a fall from a cliff. \u221220 = \u22125t\u00b2 gives t = 2 s.",
    "difficulty": "{'band': 'D2', 'score': 5, 'components': {'concept_model_selection': 1, 'representation_translation': 1, 'reasoning_chain_length': 2, 'algebra_computational_load': 1, 'trap_exception_sensitivity': 0}, 'basis': 'Requires solving vertical free-fall time from a cliff, propagating flight time into horizontal range, and recombining orthogonal impact velocities.'}",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-PHY-KIN-2D-2A-SAME-HEIGHT-05",
    "packageId": "LIB-PHY-KIN-2D-MOTION-AUTHORED",
    "subject": "PHYSICS",
    "domain": "Kinematics & Motion",
    "stem": "An ideal projectile is launched and later lands at the same height with u_x=12 m/s, u_y=16 m/s and g=8 m/s^2. Find the total flight time, range and landing velocity.",
    "options": [],
    "hints": [
      "What vertical displacement condition is true at a same-height landing?",
      "Use Delta y=0 to obtain the nonzero landing time, then reuse that time in x and v_y."
    ],
    "hintLadder": [
      "Step 1: ORIENT",
      "Step 2: REPRESENT",
      "Step 3: FIRST_RELATION",
      "Step 4: CONNECT"
    ],
    "failureSignal": "Your flight time is 2 s and your range 24 m: 2 s is u_y/g, the time to the apex, which is half the flight; \u0394y = 0 has its non-zero root at 4 s.",
    "difficulty": "{'band': 'D2', 'score': 4, 'components': {'concept_model_selection': 1, 'representation_translation': 1, 'reasoning_chain_length': 1, 'algebra_computational_load': 1, 'trap_exception_sensitivity': 0}, 'basis': 'Calculates total symmetric flight time and range with nonstandard g, and determines landing velocity components.'}",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-PHY-KIN-2D-2B-REPRESENTATION-01",
    "packageId": "LIB-PHY-KIN-2D-MOTION-AUTHORED",
    "subject": "PHYSICS",
    "domain": "Kinematics & Motion",
    "stem": "A particle is described verbally: at t=0 it is at the origin, moving east at 6 m/s and north at 2 m/s; during the next interval its acceleration is 3 m/s^2 south and zero east-west. Without being given component equations, choose a coordinate convention and write the signed component state that should be used for later calculation.",
    "options": [],
    "hints": [
      "Before writing numbers, which two perpendicular positive directions will you declare?",
      "Translate each directional word into a sign only after that frame is fixed."
    ],
    "hintLadder": [
      "Step 1: ORIENT",
      "Step 2: REPRESENT",
      "Step 3: FIRST_RELATION"
    ],
    "failureSignal": "You wrote a_y = +3 m/s\u00b2: 'south' was read as a magnitude, not as the negative y direction when +y is north. Or you used a different t for the east and north columns.",
    "difficulty": "{'band': 'D2', 'score': 5, 'components': {'concept_model_selection': 1, 'representation_translation': 2, 'reasoning_chain_length': 1, 'algebra_computational_load': 0, 'trap_exception_sensitivity': 1}, 'basis': 'Translates verbal directional compass descriptions of velocity and acceleration into signed Cartesian components with explicit axis orientation.'}",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-PHY-KIN-2D-2B-MODEL-VALIDITY-02",
    "packageId": "LIB-PHY-KIN-2D-MOTION-AUTHORED",
    "subject": "PHYSICS",
    "domain": "Kinematics & Motion",
    "stem": "Two pucks glide on a level air table; use one x-y frame and one clock with t = 0 at the start. Puck A starts at the origin with velocity (4 i + 0 j) m/s and constant acceleration (0 i + 2 j) m/s\u00b2. Puck B starts at (12 i + 0 j) m with velocity (0 i + 2 j) m/s and no acceleration. Find where their paths cross, decide whether the pucks collide, and find the steady y-velocity B would need (same start, still unaccelerated) for a collision.",
    "options": [],
    "hints": [
      "Put both pucks in one frame on one clock: which four quantities describe the two pucks at a given t?",
      "Find every t at which the x-coordinates agree, then test the y-coordinates at exactly those times."
    ],
    "hintLadder": [
      "Step 1: ORIENT",
      "Step 2: REPRESENT",
      "Step 3: FIRST_RELATION"
    ],
    "failureSignal": "You answered 'yes, they collide at (12, 9) m' because the paths cross there: A is at that point at t = 3 s, but B only at t = 4.5 s. Or you paired the x-match time (3 s) with the y-match time (2 s) as though they were one event.",
    "difficulty": "{'band': 'D3', 'score': 7, 'components': {'concept_model_selection': 2, 'representation_translation': 1, 'reasoning_chain_length': 2, 'algebra_computational_load': 1, 'trap_exception_sensitivity': 1}, 'basis': 'Distinguishes geometric path crossing from spatial-temporal collision, requiring time-synchronized position evaluation and parameter adjustment.'}",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-PHY-KIN-2D-2B-UNEQUAL-HEIGHT-03",
    "packageId": "LIB-PHY-KIN-2D-MOTION-AUTHORED",
    "subject": "PHYSICS",
    "domain": "Kinematics & Motion",
    "stem": "An ideal projectile begins 15 m above level ground with u_x=10 m/s and u_y=10 m/s. A flat roof 18.75 m above the ground (3.75 m above the launch point) begins 8 m horizontally from the launch point and extends beyond 30 m. Take +y upward and g=10 m/s^2. When and where does the projectile land on the roof, and with what velocity? Do not assume launch and landing are at the same height.",
    "options": [],
    "hints": [
      "Where is the roof relative to the launch point, vertically and horizontally?",
      "Solve the vertical equation for every time the ball is at roof height, then find x at each of those times."
    ],
    "hintLadder": [
      "Step 1: ORIENT",
      "Step 2: REPRESENT",
      "Step 3: FIRST_RELATION"
    ],
    "failureSignal": "Your answer is t = 0.5 s at 5 m: that root is the ball rising through roof level before the roof begins at 8 m. Or you used the ground (\u0394y = \u221215 m) and got 3 s and 30 m: the roof is in the way.",
    "difficulty": "{'band': 'D3', 'score': 7, 'components': {'concept_model_selection': 2, 'representation_translation': 1, 'reasoning_chain_length': 2, 'algebra_computational_load': 1, 'trap_exception_sensitivity': 1}, 'basis': 'Solves quadratic vertical kinematics for an elevated boundary landing surface, verifying that the horizontal coordinate falls within the roof span.'}",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-PHY-KIN-2D-2B-PROJECTILE-VALIDITY-04",
    "packageId": "LIB-PHY-KIN-2D-MOTION-AUTHORED",
    "subject": "PHYSICS",
    "domain": "Kinematics & Motion",
    "stem": "A supply plane flies horizontally at a steady 50 m/s, 80 m above level ground, and releases a package. Air resistance on the package is negligible; take +y upward and g = 10 m/s\u00b2. In the ground frame, choose the model and the package's initial velocity. Then find how long the package falls, how far ahead of the release point it lands, and where the plane is when it lands.",
    "options": [],
    "hints": [
      "Which post-release assumption makes a_x=0 in the standard projectile model, and is it true here?"
    ],
    "hintLadder": [
      "Step 1: ORIENT",
      "Step 2: REPRESENT",
      "Step 3: FIRST_RELATION"
    ],
    "failureSignal": "You put the landing directly below the release point (x = 0), or behind the plane: that treats the package as starting from rest horizontally. At release it already moves at 50 m/s with the plane, and nothing slows it.",
    "difficulty": "{'band': 'D3', 'score': 7, 'components': {'concept_model_selection': 2, 'representation_translation': 1, 'reasoning_chain_length': 2, 'algebra_computational_load': 1, 'trap_exception_sensitivity': 1}, 'basis': 'Requires attributing horizontal carrier velocity to the released package, computing fall time and landing displacement, and tracking the moving carrier.'}",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-PHY-KIN-2D-2B-SAME-HEIGHT-VELOCITY-05",
    "packageId": "LIB-PHY-KIN-2D-MOTION-AUTHORED",
    "subject": "PHYSICS",
    "domain": "Kinematics & Motion",
    "stem": "A stone is thrown from the edge of a high cliff with u_x = 10 m/s and u_y = 20 m/s. Take +y upward, g = 10 m/s\u00b2, and neglect air resistance; the stone is still in the air at every instant asked about. When, and where relative to the launch point, is the stone's velocity directed 45\u00b0 below the horizontal? What is its speed then?",
    "options": [],
    "hints": [
      "During the flight, which velocity component changes and which stays fixed?",
      "Write the direction condition as a relation between v_x and v_y at one instant, then solve v_y(t) for that value."
    ],
    "hintLadder": [
      "Step 1: ORIENT",
      "Step 2: REPRESENT",
      "Step 3: FIRST_RELATION"
    ],
    "failureSignal": "You got t = 6 s: you made the displacement point 45\u00b0 below the horizontal (20t \u2212 5t\u00b2 = \u221210t), not the velocity. Or you got t = 2 s from v_y = 0: that is the apex, where the motion is horizontal.",
    "difficulty": "{'band': 'D3', 'score': 7, 'components': {'concept_model_selection': 2, 'representation_translation': 2, 'reasoning_chain_length': 2, 'algebra_computational_load': 1, 'trap_exception_sensitivity': 0}, 'basis': 'Relates velocity angle condition to component ratio v_y/v_x, solves for the corresponding instant and spatial displacement, and computes resultant speed.'}",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-PHY-NLM-1A-NET-ZERO-01",
    "packageId": "LIB-PHY-NLM-FIRST-LAW-AUTHORED",
    "subject": "PHYSICS",
    "domain": "Kinematics & Motion",
    "stem": "An ice-hockey puck of mass 0.2 kg slides across smooth ice at 4 m/s after the stick loses contact. Friction and air resistance are negligible. What horizontal forces act on it, what is its velocity 3 s later, and would a puck at rest on the same ice start moving?",
    "options": [],
    "hints": [
      "Recall defining conservation relations and frame definitions."
    ],
    "hintLadder": [
      "1. Draw a schematic coordinate frame.",
      "2. State explicit balance equations."
    ],
    "failureSignal": "Check dimensional consistency and boundary behavior.",
    "difficulty": "MEDIUM",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-PHY-NLM-1A-CANCEL-01",
    "packageId": "LIB-PHY-NLM-FIRST-LAW-AUTHORED",
    "subject": "PHYSICS",
    "domain": "Kinematics & Motion",
    "stem": "A 1.5 kg lamp hangs at rest from a ceiling cord. Take g = 10 m/s\u00b2 and up as positive. List each force on the lamp with its size, find the net force, and say what would happen if the cord were cut.",
    "options": [],
    "hints": [
      "Recall defining conservation relations and frame definitions."
    ],
    "hintLadder": [
      "1. Draw a schematic coordinate frame.",
      "2. State explicit balance equations."
    ],
    "failureSignal": "Check dimensional consistency and boundary behavior.",
    "difficulty": "MEDIUM",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-PHY-NLM-1A-FBD-OWNERSHIP-01",
    "packageId": "LIB-PHY-NLM-FIRST-LAW-AUTHORED",
    "subject": "PHYSICS",
    "domain": "Kinematics & Motion",
    "stem": "A 50 kg child stands on a 20 kg box that rests on the floor. Take g = 10 m/s\u00b2. Build the free-body inventory of the box: name each force, its agent, its direction and its size.",
    "options": [],
    "hints": [
      "Recall defining conservation relations and frame definitions."
    ],
    "hintLadder": [
      "1. Draw a schematic coordinate frame.",
      "2. State explicit balance equations."
    ],
    "failureSignal": "Check dimensional consistency and boundary behavior.",
    "difficulty": "MEDIUM",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-PHY-NLM-1A-ELEVATOR-FRAMES-01",
    "packageId": "LIB-PHY-NLM-FIRST-LAW-AUTHORED",
    "subject": "PHYSICS",
    "domain": "Kinematics & Motion",
    "stem": "A 60 kg person stands on a scale in a lift that accelerates upward at 2 m/s\u00b2. Take g = 10 m/s\u00b2 and up as positive. Find the scale reading using the ground frame, then again using the lift frame with a pseudo-force, and compare.",
    "options": [],
    "hints": [
      "Recall defining conservation relations and frame definitions."
    ],
    "hintLadder": [
      "1. Draw a schematic coordinate frame.",
      "2. State explicit balance equations."
    ],
    "failureSignal": "Check dimensional consistency and boundary behavior.",
    "difficulty": "MEDIUM",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-PHY-NLM-1A-SECOND-LAW-01",
    "packageId": "LIB-PHY-NLM-FIRST-LAW-AUTHORED",
    "subject": "PHYSICS",
    "domain": "Kinematics & Motion",
    "stem": "A 10 kg crate is pulled up a smooth ramp inclined at 30\u00b0 by a rope parallel to the ramp with a force of 70 N. Take g = 10 m/s\u00b2. Using axes along and perpendicular to the ramp, find the crate's acceleration and the normal force, and the pull that would give zero acceleration.",
    "options": [],
    "hints": [
      "Recall defining conservation relations and frame definitions."
    ],
    "hintLadder": [
      "1. Draw a schematic coordinate frame.",
      "2. State explicit balance equations."
    ],
    "failureSignal": "Check dimensional consistency and boundary behavior.",
    "difficulty": "MEDIUM",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-PHY-NLM-1A-THIRD-LAW-01",
    "packageId": "LIB-PHY-NLM-FIRST-LAW-AUTHORED",
    "subject": "PHYSICS",
    "domain": "Kinematics & Motion",
    "stem": "In space, a 70 kg astronaut pushes a 350 kg satellite with a force of 140 N. During the push, find the force on each body and each body's acceleration.",
    "options": [],
    "hints": [
      "Recall defining conservation relations and frame definitions."
    ],
    "hintLadder": [
      "1. Draw a schematic coordinate frame.",
      "2. State explicit balance equations."
    ],
    "failureSignal": "Check dimensional consistency and boundary behavior.",
    "difficulty": "MEDIUM",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-PHY-NLM-1A-FRICTION-DIRECTION-01",
    "packageId": "LIB-PHY-NLM-FIRST-LAW-AUTHORED",
    "subject": "PHYSICS",
    "domain": "Kinematics & Motion",
    "stem": "A book rests on a tray. A waiter first carries the tray at steady speed in a straight line, then speeds up forward; the book never slips. Find the friction force of the tray on the book in each stage, including whether it can be zero.",
    "options": [],
    "hints": [
      "Recall defining conservation relations and frame definitions."
    ],
    "hintLadder": [
      "1. Draw a schematic coordinate frame.",
      "2. State explicit balance equations."
    ],
    "failureSignal": "Check dimensional consistency and boundary behavior.",
    "difficulty": "MEDIUM",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-PHY-NLM-1A-FRICTION-TEST-01",
    "packageId": "LIB-PHY-NLM-FIRST-LAW-AUTHORED",
    "subject": "PHYSICS",
    "domain": "Kinematics & Motion",
    "stem": "A 4 kg box rests on a rough horizontal floor with \u03bc_s = 0.5 and \u03bc_k = 0.4. Take g = 10 m/s\u00b2. A horizontal pull of 15 N is applied, and in a second trial a pull of 25 N. For each trial decide whether the box stays at rest, and find the friction force and the acceleration.",
    "options": [],
    "hints": [
      "Recall defining conservation relations and frame definitions."
    ],
    "hintLadder": [
      "1. Draw a schematic coordinate frame.",
      "2. State explicit balance equations."
    ],
    "failureSignal": "Check dimensional consistency and boundary behavior.",
    "difficulty": "MEDIUM",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-PHY-NLM-1A-CONNECTED-BODIES-01",
    "packageId": "LIB-PHY-NLM-FIRST-LAW-AUTHORED",
    "subject": "PHYSICS",
    "domain": "Kinematics & Motion",
    "stem": "Blocks A (3 kg) and B (2 kg) touch on a smooth floor, A to the left of B. A 20 N force pushes A to the right into B, and a 5 N force pushes B to the left, back toward A. The blocks stay in contact. Write one Newton-II equation per block and solve for their acceleration and the contact force.",
    "options": [],
    "hints": [
      "Recall defining conservation relations and frame definitions."
    ],
    "hintLadder": [
      "1. Draw a schematic coordinate frame.",
      "2. State explicit balance equations."
    ],
    "failureSignal": "Check dimensional consistency and boundary behavior.",
    "difficulty": "MEDIUM",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-PHY-NLM-1A-SYSTEM-CHOICE-01",
    "packageId": "LIB-PHY-NLM-FIRST-LAW-AUTHORED",
    "subject": "PHYSICS",
    "domain": "Kinematics & Motion",
    "stem": "A 2 kg bucket hangs from a light rope tied under a 1 kg bucket. A second rope lifts the top bucket with a 45 N upward force. Take g = 10 m/s\u00b2 and up as positive. Choose a system to find the acceleration, then a different system to find the tension in the rope between the buckets.",
    "options": [],
    "hints": [
      "Recall defining conservation relations and frame definitions."
    ],
    "hintLadder": [
      "1. Draw a schematic coordinate frame.",
      "2. State explicit balance equations."
    ],
    "failureSignal": "Check dimensional consistency and boundary behavior.",
    "difficulty": "MEDIUM",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-PHY-NLM-1A-STRING-FBD-01",
    "packageId": "LIB-PHY-NLM-FIRST-LAW-AUTHORED",
    "subject": "PHYSICS",
    "domain": "Kinematics & Motion",
    "stem": "A light, taut, inextensible string runs from a 2 kg cart on a smooth table, over a frictionless light pulley at the table's edge, down to a 1 kg hanging mass. Take g = 10 m/s\u00b2. State the model that allows one tension T, list the forces on each body, and find the acceleration and T.",
    "options": [],
    "hints": [
      "Recall defining conservation relations and frame definitions."
    ],
    "hintLadder": [
      "1. Draw a schematic coordinate frame.",
      "2. State explicit balance equations."
    ],
    "failureSignal": "Check dimensional consistency and boundary behavior.",
    "difficulty": "MEDIUM",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-PHY-NLM-1A-TENSION-VALUE-01",
    "packageId": "LIB-PHY-NLM-FIRST-LAW-AUTHORED",
    "subject": "PHYSICS",
    "domain": "Kinematics & Motion",
    "stem": "A 2 kg lamp hangs from a light cord inside a lift. Take up as positive and g = 10 m/s\u00b2. Find the cord tension when the lift (a) moves up at steady speed, (b) accelerates upward at 2 m/s\u00b2, and (c) accelerates downward at 3 m/s\u00b2.",
    "options": [],
    "hints": [
      "Recall defining conservation relations and frame definitions."
    ],
    "hintLadder": [
      "1. Draw a schematic coordinate frame.",
      "2. State explicit balance equations."
    ],
    "failureSignal": "Check dimensional consistency and boundary behavior.",
    "difficulty": "MEDIUM",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-PHY-NLM-1A-STRING-LENGTH-01",
    "packageId": "LIB-PHY-NLM-FIRST-LAW-AUTHORED",
    "subject": "PHYSICS",
    "domain": "Kinematics & Motion",
    "stem": "One taut inextensible string passes over a fixed pulley and holds A and B. With y_A and y_B measured downward from the pulley along each segment, y_A = 1.2 m and y_B = 0.8 m. A then moves down by 0.3 m. Find B's new position, and B's velocity at an instant when A moves down at 0.5 m/s.",
    "options": [],
    "hints": [
      "Recall defining conservation relations and frame definitions."
    ],
    "hintLadder": [
      "1. Draw a schematic coordinate frame.",
      "2. State explicit balance equations."
    ],
    "failureSignal": "Check dimensional consistency and boundary behavior.",
    "difficulty": "MEDIUM",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-PHY-NLM-1A-CONSTRAINT-TENSION-01",
    "packageId": "LIB-PHY-NLM-FIRST-LAW-AUTHORED",
    "subject": "PHYSICS",
    "domain": "Kinematics & Motion",
    "stem": "Masses A (3 kg) and B (1 kg) hang from one light inextensible string over a fixed, frictionless, light pulley, with y_A and y_B measured downward from the pulley. Take g = 10 m/s\u00b2. Using a_A + a_B = 0 and one tension T, find a_A, a_B and T, and name the assumption each of those two relations rests on.",
    "options": [],
    "hints": [
      "Recall defining conservation relations and frame definitions."
    ],
    "hintLadder": [
      "1. Draw a schematic coordinate frame.",
      "2. State explicit balance equations."
    ],
    "failureSignal": "Check dimensional consistency and boundary behavior.",
    "difficulty": "MEDIUM",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-PHY-NLM-2A-COV-05",
    "packageId": "LIB-PHY-NLM-FIRST-LAW-AUTHORED",
    "subject": "PHYSICS",
    "domain": "Kinematics & Motion",
    "stem": "A 2.5 kg trolley on a level track is pulled forward with 9 N while a 4 N drag acts backward. Take forward as positive. Find its acceleration. Then the pull is removed while the trolley is still moving forward: find its acceleration now.",
    "options": [],
    "hints": [
      "Which forces act on the trolley along the track, and which way does each one point?",
      "Add the signed forces first, then divide the sum by the mass; after the pull is removed, only the drag is left in the sum."
    ],
    "hintLadder": [
      "Step 1: ORIENT",
      "Draw the trolley as a dot on a forward +x axis, with a 9 N arrow forward and a 4 N arrow backward; cross out the 9 N arrow for the second part.",
      "Step 3: FIRST_RELATION"
    ],
    "failureSignal": "You got 3.6 m/s\u00b2 (9 N alone) or 5.2 m/s\u00b2 (9 + 4): the drag opposes the pull, so F_net = 9 \u2212 4 = 5 N. Or you said the second acceleration is zero or forward because the trolley still moves forward: it points along the net force, which is now backward.",
    "difficulty": "{'band': 'D2', 'score': 4, 'components': {'concept_model_selection': 1, 'representation_translation': 0, 'reasoning_chain_length': 1, 'algebra_computational_load': 1, 'trap_exception_sensitivity': 1}, 'basis': 'Compare two signed-force states and recognize that removing the pull reverses acceleration while the trolley can still be moving forward.'}",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-PHY-NLM-2A-01",
    "packageId": "LIB-PHY-NLM-FIRST-LAW-AUTHORED",
    "subject": "PHYSICS",
    "domain": "Kinematics & Motion",
    "stem": "An 80 kg skydiver falls at a steady 50 m/s. Take g = 10 m/s\u00b2. Find the air resistance on the skydiver and the net force. Just after the parachute opens, the skydiver is still moving downward but slowing: is the net force then zero, upward or downward?",
    "options": [],
    "hints": [
      "During the steady fall, is the skydiver's velocity changing?",
      "Zero net force goes with an unchanging velocity, however large; a slowing fall is a change of velocity, so ask which way that change points."
    ],
    "hintLadder": [
      "Step 1: ORIENT",
      "Draw the skydiver twice, in the steady fall and just after the parachute opens, each with a velocity arrow and a separate net-force arrow. Leave the net-force arrow empty where the velocity is not changing.",
      "Step 3: FIRST_RELATION"
    ],
    "failureSignal": "You said the steady fall needs a net downward force because the skydiver is moving down, or that the net force stays downward after the parachute opens: the net force follows the change of velocity, not the velocity.",
    "difficulty": "{'band': 'D2', 'score': 4, 'components': {'concept_model_selection': 1, 'representation_translation': 0, 'reasoning_chain_length': 1, 'algebra_computational_load': 1, 'trap_exception_sensitivity': 1}, 'basis': 'Use steady fall to establish force balance, then reinterpret the net-force direction immediately after the parachute changes the motion.'}",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-PHY-NLM-2A-COV-02",
    "packageId": "LIB-PHY-NLM-FIRST-LAW-AUTHORED",
    "subject": "PHYSICS",
    "domain": "Kinematics & Motion",
    "stem": "A 2 kg book lies at rest on a table while a hand presses straight down on it with 5 N. Take g = 10 m/s\u00b2. List every force on the book with its agent and size, find the table's push, and state the net force and what it predicts about the book's velocity.",
    "options": [],
    "hints": [
      "Before adding anything, how many bodies touch or attract the book?",
      "List each force with its agent and signed size, then set the sum to match the book's acceleration, which is zero here."
    ],
    "hintLadder": [
      "Step 1: ORIENT",
      "Draw the book with three arrows at full length (Earth, hand, table) and write their signed sum beside it without erasing any arrow.",
      "Step 3: FIRST_RELATION"
    ],
    "failureSignal": "You gave the table's push as 20 N, the book's weight: the hand's 5 N press must also be balanced, so N = 25 N. Or you wrote that no forces act because the book is at rest.",
    "difficulty": "{'band': 'D2', 'score': 5, 'components': {'concept_model_selection': 1, 'representation_translation': 1, 'reasoning_chain_length': 1, 'algebra_computational_load': 1, 'trap_exception_sensitivity': 1}, 'basis': 'Build a body-owned force inventory, include the hand force in the normal balance, and close with the zero-net-force motion consequence.'}",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-PHY-NLM-2A-COV-03",
    "packageId": "LIB-PHY-NLM-FIRST-LAW-AUTHORED",
    "subject": "PHYSICS",
    "domain": "Kinematics & Motion",
    "stem": "A 0.1 kg magnet is stuck at rest on a vertical steel fridge door; the door's magnetic pull on it is 3 N. Take g = 10 m/s\u00b2. List every force on the magnet with its agent, direction and size. For each one, name its third-law partner and the body that partner acts on.",
    "options": [],
    "hints": [
      "Which single body are you describing first, and which bodies touch or attract it?",
      "For each force on the magnet, write 'X on magnet', then swap the names to get its partner 'magnet on X'. That partner goes on X's diagram."
    ],
    "hintLadder": [
      "Step 1: ORIENT",
      "Draw the magnet and the door as two separate outlines. Put each 'on magnet' arrow on the magnet and each partner on the door (or the Earth).",
      "Step 3: FIRST_RELATION"
    ],
    "failureSignal": "You named the normal push as the partner of the magnetic pull, or the friction as the partner of the weight: those pairs both act on the magnet, so they balance each other and are not third-law partners.",
    "difficulty": "{'band': 'D2', 'score': 5, 'components': {'concept_model_selection': 1, 'representation_translation': 2, 'reasoning_chain_length': 1, 'algebra_computational_load': 0, 'trap_exception_sensitivity': 1}, 'basis': 'Translate a contact situation into one-body force ownership and then identify the third-law partner of each interaction on the other body.'}",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-PHY-NLM-2A-COV-04",
    "packageId": "LIB-PHY-NLM-FIRST-LAW-AUTHORED",
    "subject": "PHYSICS",
    "domain": "Kinematics & Motion",
    "stem": "A 20 kg crate rides on the flat bed of a truck. The truck brakes, slowing at 3 m/s\u00b2, and the crate does not slip on the bed. Which way does friction from the bed act on the crate, and how large is it?",
    "options": [],
    "hints": [
      "Which two surfaces are in contact, and how is each moving while the truck brakes?",
      "The crate slows with the truck at 3 m/s\u00b2. Which single horizontal force on the crate gives it that acceleration, and what size does F = ma require?"
    ],
    "hintLadder": [
      "Step 1: ORIENT",
      "Draw the crate on the bed with a velocity arrow for each, and mark which way the crate would slide relative to the bed if the bed were slippery.",
      "Step 3: FIRST_RELATION"
    ],
    "failureSignal": "Your friction points forward, 'the way the crate is going', or is zero because nothing pushes the crate: the crate would slide forward relative to the slowing bed, so friction points backward, 60 N.",
    "difficulty": "{'band': 'D2', 'score': 5, 'components': {'concept_model_selection': 1, 'representation_translation': 1, 'reasoning_chain_length': 1, 'algebra_computational_load': 1, 'trap_exception_sensitivity': 1}, 'basis': \"Infer friction direction from the required crate acceleration during braking and compute its magnitude rather than opposing the crate's velocity by rule.\"}",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-PHY-NLM-2A-COV-06",
    "packageId": "LIB-PHY-NLM-FIRST-LAW-AUTHORED",
    "subject": "PHYSICS",
    "domain": "Kinematics & Motion",
    "stem": "A book rests on a table. Name the third-law partner of (a) the book's weight and (b) the table's upward push on the book. For each partner, say which body it acts on and which way it points.",
    "options": [],
    "hints": [
      "For each force on the book, which two bodies take part in that interaction?",
      "Swap agent and target: 'Earth on book' pairs with 'book on Earth', and 'table on book' pairs with 'book on table'."
    ],
    "hintLadder": [
      "Step 1: ORIENT",
      "Draw the book, the table and the Earth as three outlines, and label every arrow 'A on B'.",
      "Step 3: FIRST_RELATION"
    ],
    "failureSignal": "You named the table's upward push as the partner of the book's weight: both act on the book and come from different agents. The weight's partner is the book's pull on the Earth.",
    "difficulty": "{'band': 'D2', 'score': 4, 'components': {'concept_model_selection': 1, 'representation_translation': 1, 'reasoning_chain_length': 1, 'algebra_computational_load': 0, 'trap_exception_sensitivity': 1}, 'basis': 'Distinguish two forces on the book from their separate third-law partners and assign each partner to the correct other body.'}",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-PHY-NLM-PRACTICAL-12",
    "packageId": "LIB-PHY-NLM-FIRST-LAW-AUTHORED",
    "subject": "PHYSICS",
    "domain": "Kinematics & Motion",
    "stem": "Plan a trolley\u2013pulley\u2013hanging-mass experiment to verify Newton\u2019s second law. Describe one controlled variation that tests the effect of net force at fixed system mass, what you measure, and what result would support F_net = m a.",
    "options": [],
    "hints": [
      "To test the effect of force, do not let total moving mass become a second uncontrolled variable.",
      "Transfer masses between the trolley and hanger, then compare corrected net force with measured acceleration."
    ],
    "hintLadder": [
      "Step 1: ORIENT",
      "Sketch the trolley on the bench, the string over the pulley and the hanger, and draw one boundary around trolley plus hanger: the mass inside it must stay fixed.",
      "Step 3: FIRST_RELATION"
    ],
    "failureSignal": "Your plan adds new masses to the hanger from outside: then the driving force and the moving mass both change, so a change in acceleration cannot be put down to force alone.",
    "difficulty": "{'band': 'D3', 'score': 7, 'components': {'concept_model_selection': 2, 'representation_translation': 2, 'reasoning_chain_length': 2, 'algebra_computational_load': 0, 'trap_exception_sensitivity': 1}, 'basis': 'Design a controlled Newton-II experiment, identify measured quantities and controls, and state an evidential result rather than merely calculating a supplied case.'}",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-PHY-NLM-2A-FRICTION-THRESHOLD-01",
    "packageId": "LIB-PHY-NLM-FIRST-LAW-AUTHORED",
    "subject": "PHYSICS",
    "domain": "Kinematics & Motion",
    "stem": "A small block of mass m rests on a larger block of mass M. The floor under the larger block is smooth. A horizontal force F is applied to the larger block. The coefficient of static friction between the blocks is mu_s. Derive the largest value of F for which the two blocks can move together without slipping.",
    "options": [],
    "hints": [
      "First suppose the blocks do not slip. What acceleration would the two-block system then have?",
      "Now isolate only the upper block. What horizontal force must accelerate it at that same rate? Compare that required friction with the static limit."
    ],
    "hintLadder": [
      "Step 1: ORIENT",
      "Draw one diagram for each block. On the upper block the only horizontal force is the friction from the lower block; on the lower block, F and the partner of that friction.",
      "Step 3: FIRST_RELATION"
    ],
    "failureSignal": "Your answer is F_max = \u03bc_s m g: that is the friction limit itself, but F must accelerate both blocks, so the limit is scaled up by (M + m)/m.",
    "difficulty": "{'band': 'D3', 'score': 7, 'components': {'concept_model_selection': 1, 'representation_translation': 1, 'reasoning_chain_length': 2, 'algebra_computational_load': 2, 'trap_exception_sensitivity': 1}, 'basis': 'Derive a common acceleration, determine the friction demand on the upper block, and compare that demand with the static limit to obtain a symbolic threshold.'}",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-PHY-NLM-2A-CONNECTED-02",
    "packageId": "LIB-PHY-NLM-FIRST-LAW-AUTHORED",
    "subject": "PHYSICS",
    "domain": "Kinematics & Motion",
    "stem": "Two blocks A and B of masses m_A and m_B remain in contact on a smooth horizontal floor. A horizontal force F pushes A toward B, and the contact is maintained. Derive their common acceleration and the magnitude of the contact force exerted by A on B.",
    "options": [],
    "hints": [
      "What physical condition lets you use one acceleration for both blocks?",
      "Find the acceleration from the combined system first. Then isolate B; do not cancel the contact force from B's own equation."
    ],
    "hintLadder": [
      "Step 1: ORIENT",
      "Draw A and B as two separate diagrams with the contact pair between them, then draw one dashed outline around both blocks.",
      "Step 3: FIRST_RELATION"
    ],
    "failureSignal": "Your contact force equals F: the push on A is not passed to B undiminished, because part of F accelerates A itself; B needs only m_B a.",
    "difficulty": "{'band': 'D2', 'score': 5, 'components': {'concept_model_selection': 1, 'representation_translation': 1, 'reasoning_chain_length': 2, 'algebra_computational_load': 1, 'trap_exception_sensitivity': 0}, 'basis': 'Use the whole system for common acceleration and then isolate one block to obtain the internal contact force.'}",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-PHY-NLM-2A-IDEAL-STRING-03",
    "packageId": "LIB-PHY-NLM-FIRST-LAW-AUTHORED",
    "subject": "PHYSICS",
    "domain": "Kinematics & Motion",
    "stem": "Two carts A and B of masses m_A and m_B are connected by one taut massless inextensible string on a smooth horizontal track. A horizontal force F pulls cart A away from B along the string. Derive the common acceleration and the string tension. Then name one model change that would make equal tension throughout the connector no longer guaranteed.",
    "options": [],
    "hints": [
      "State the connector model before using one symbol T. What does taut and inextensible imply about the two cart accelerations?",
      "Use the whole two-cart system to find a, then isolate B to find the tension acting on B."
    ],
    "hintLadder": [
      "Step 1: ORIENT",
      "Draw cart A and cart B separately. Put the string's pull on each, along the string away from that cart, and give both the symbol T only after naming the ideal-string assumptions.",
      "Step 3: FIRST_RELATION"
    ],
    "failureSignal": "Your tension equals F: the string has only to accelerate cart B, so T = m_B a, which is less than F.",
    "difficulty": "{'band': 'D3', 'score': 6, 'components': {'concept_model_selection': 1, 'representation_translation': 1, 'reasoning_chain_length': 2, 'algebra_computational_load': 1, 'trap_exception_sensitivity': 1}, 'basis': 'Use the declared ideal-string model for common acceleration and equal tension, then identify a model change that invalidates equal tension.'}",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-PHY-NLM-2A-FIXED-PULLEY-04",
    "packageId": "LIB-PHY-NLM-FIRST-LAW-AUTHORED",
    "subject": "PHYSICS",
    "domain": "Kinematics & Motion",
    "stem": "A cart on a table is tied to a light inextensible string that runs over a fixed pulley at the table's edge and down to a hanging mass. Let x be the cart's distance from the pulley along the table and y the hanging mass's depth below the pulley, both measured away from the pulley. Now x = 0.9 m and y = 0.5 m. (a) Write the string-length relation. (b) The hanging mass reaches the floor when y = 1.3 m. How far is the cart from the pulley then? (c) At an instant when the cart moves toward the pulley at 0.3 m/s and is speeding up at 1.2 m/s\u00b2, give the hanging mass's signed velocity and acceleration in these coordinates, and say which way it moves.",
    "options": [],
    "hints": [
      "Which two straight parts of the string change length when the cart moves?",
      "Write their sum with the values now. When the cart moves toward the pulley, which way does x change, and what must y do?"
    ],
    "hintLadder": [
      "Step 1: ORIENT",
      "Sketch the table, pulley and hanging mass. Mark x along the table and y down from the pulley, each with an arrow pointing away from the pulley.",
      "Step 3: FIRST_RELATION"
    ],
    "failureSignal": "You gave the hanging mass a velocity of \u22120.3 m/s, or a horizontal velocity: the string turns at the pulley, so the mass moves down, and in away-from-pulley coordinates y grows as x shrinks.",
    "difficulty": "{'band': 'D3', 'score': 7, 'components': {'concept_model_selection': 1, 'representation_translation': 2, 'reasoning_chain_length': 2, 'algebra_computational_load': 1, 'trap_exception_sensitivity': 1}, 'basis': 'Translate one fixed-string geometry into length, velocity and acceleration constraints while keeping the coordinate signs consistent.'}",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-PHY-NLM-2A-FRAME-CHOICE-07",
    "packageId": "LIB-PHY-NLM-FIRST-LAW-AUTHORED",
    "subject": "PHYSICS",
    "domain": "Kinematics & Motion",
    "stem": "A delivery van accelerates forward along a straight, level road at 2 m/s\u00b2. A passenger holds a 0.2 kg apple still, 1.25 m above the van's floor, and lets go. Ignore air resistance and take g = 10 m/s\u00b2. (a) Seen from the roadside, which horizontal forces act on the apple after release, and what does its horizontal velocity do? (b) Seen from inside the van, what pseudo-force (size and direction) must the passenger add, and what horizontal acceleration does it give the apple? (c) Where does the apple land relative to the point on the floor directly below the release point? Show that both descriptions give the same answer.",
    "options": [],
    "hints": [
      "After release, does anything touch the apple? Which forces act on it, and in which directions?",
      "The fall time is the same for both observers. For each observer, write the horizontal acceleration of the apple, and of the floor, during that time."
    ],
    "hintLadder": [
      "Step 1: ORIENT",
      "Draw the apple twice, once as the roadside observer sees it and once as the passenger sees it, each with only the forces that observer uses and an arrow for that observer's own acceleration.",
      "Step 3: FIRST_RELATION"
    ],
    "failureSignal": "You had the apple land directly below the release point: that is true only if the van keeps a steady velocity. While the van accelerates, the floor gains 0.25 m on the apple during the 0.5 s fall. Or you gave the apple a backward physical force in the roadside account: nothing touches it after release.",
    "difficulty": "{'band': 'D4', 'score': 9, 'components': {'concept_model_selection': 2, 'representation_translation': 2, 'reasoning_chain_length': 2, 'algebra_computational_load': 1, 'trap_exception_sensitivity': 2}, 'basis': 'Reconcile inertial-roadside and accelerating-van descriptions, including the pseudo-force representation, and show both predict the same landing point.'}",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-PHY-NLM-2B-FRICTION-STATE-01",
    "packageId": "LIB-PHY-NLM-FIRST-LAW-AUTHORED",
    "subject": "PHYSICS",
    "domain": "Kinematics & Motion",
    "stem": "A 10 kg crate rests on a rough horizontal floor with \u03bc_s = 0.75; take g = 10 m/s\u00b2. A rope on the crate can be pulled horizontally, at 37\u00b0 above the horizontal, or at 53\u00b0 above the horizontal (sin 37\u00b0 = cos 53\u00b0 = 0.6, cos 37\u00b0 = sin 53\u00b0 = 0.8). For each direction, find the smallest pull that starts the crate sliding. A worker can pull with at most 61 N: in which of the three directions can the worker start the crate?",
    "options": [],
    "hints": [
      "At the smallest pull that starts the crate, what contact state is the crate in, and what does that say about the friction?",
      "Write N from the vertical balance with P still unknown; then compare the friction the crate needs with \u03bc_s N."
    ],
    "hintLadder": [
      "Step 1: ORIENT",
      "Draw the crate for one direction with its weight, N, the pull split into horizontal and vertical parts, and a friction arrow labelled f. Keep the pull as P, not a number.",
      "Step 3: FIRST_RELATION"
    ],
    "failureSignal": "You found 75 N for every direction because you kept N = mg = 100 N: the upward part of the pull lightens the contact. Or you chose 53\u00b0 because it lightens the contact most: its horizontal part shrinks faster, so it needs 62.5 N, more than the 60 N at 37\u00b0.",
    "difficulty": "{'band': 'D3', 'score': 7, 'components': {'concept_model_selection': 2, 'representation_translation': 1, 'reasoning_chain_length': 2, 'algebra_computational_load': 1, 'trap_exception_sensitivity': 1}, 'basis': 'The pull is an unknown threshold that also changes the normal reaction, and three directions must be compared before the feasible choice is made.'}",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-PHY-NLM-2B-CONNECTED-SYSTEM-02",
    "packageId": "LIB-PHY-NLM-FIRST-LAW-AUTHORED",
    "subject": "PHYSICS",
    "domain": "Kinematics & Motion",
    "stem": "Three carts touch in a line on a level track: A (3 kg) at the back, then B (2 kg), then C (1 kg) at the front. A 30 N push acts on A toward the front. Cart B has a sticking wheel that drags on the track with a 6 N friction force; A and C roll freely. Find the acceleration of the train and the contact force at each of its two joints, A-B and B-C.",
    "options": [],
    "hints": [
      "How many different contact forces does a three-cart train have, and which forces act on it from outside?",
      "Get a from the whole train, then cut at one joint and write Newton II for the part on one side, including every external force on that part."
    ],
    "hintLadder": [
      "Step 1: ORIENT",
      "Draw the train with a dashed cut at the A-B joint and another at the B-C joint, and list the external forces on each side of each cut.",
      "Step 3: FIRST_RELATION"
    ],
    "failureSignal": "You got 15 N and 5 N from the mass-fraction rule, (m_B + m_C)F/M and m_C F/M: that rule ignores the 6 N drag on B. Or you gave one contact force for the whole train.",
    "difficulty": "{'band': 'D3', 'score': 6, 'components': {'concept_model_selection': 1, 'representation_translation': 2, 'reasoning_chain_length': 1, 'algebra_computational_load': 1, 'trap_exception_sensitivity': 1}, 'basis': 'The whole-system acceleration and two internal contact forces require deliberate system cuts while an interior drag invalidates a mass-fraction shortcut.'}",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-PHY-NLM-2B-STRING-MODEL-03",
    "packageId": "LIB-PHY-NLM-FIRST-LAW-AUTHORED",
    "subject": "PHYSICS",
    "domain": "Kinematics & Motion",
    "stem": "A 2 kg block hangs from the lower end of a uniform rope of mass 1 kg. A hand pulls the top of the rope so that the rope and block accelerate upward at 2 m/s\u00b2. Take g = 10 m/s\u00b2 and up as positive. A student writes one tension T for the whole rope. Decide whether that is licensed here, and find the tension at the top, at the middle and at the bottom of the rope.",
    "options": [],
    "hints": [
      "What property of a string lets you use one symbol T all along it, and does this rope have it?",
      "If you imagine cutting the rope at some height, what must the tension there hold up and accelerate?"
    ],
    "hintLadder": [
      "Step 1: ORIENT",
      "Draw the block and rope with dashed cuts at the bottom, middle and top, and for each cut circle everything below it.",
      "Step 3: FIRST_RELATION"
    ],
    "failureSignal": "You used one T = 24 N (from the block alone) or T = 36 N everywhere: the rope's own mass needs force too, so the tension grows from 24 N at the bottom to 36 N at the top.",
    "difficulty": "{'band': 'D3', 'score': 6, 'components': {'concept_model_selection': 2, 'representation_translation': 1, 'reasoning_chain_length': 1, 'algebra_computational_load': 1, 'trap_exception_sensitivity': 1}, 'basis': 'The learner must reject the massless-string equal-tension model and compute tension from the mass carried below each rope section.'}",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-PHY-NLM-2B-PULLEY-REPRESENTATION-04",
    "packageId": "LIB-PHY-NLM-FIRST-LAW-AUTHORED",
    "subject": "PHYSICS",
    "domain": "Kinematics & Motion",
    "stem": "A diagram is replaced by this verbal description: one taut inextensible string passes over one fixed pulley, with mass A on the left end and mass B on the right end. Coordinates x_A and x_B are both defined positive upward. Before writing any Newton-II equations, construct the string-length relation and derive the signed acceleration relation in these coordinates. If A accelerates upward at 2 m/s\u00b2, what is B's signed acceleration?",
    "options": [],
    "hints": [
      "Write the actual length of each vertical string segment in terms of its upward coordinate; do not start with an acceleration formula.",
      "Once the total length is constant, differentiate the same signed coordinate relation rather than changing conventions midway."
    ],
    "hintLadder": [
      "Step 1: ORIENT",
      "Sketch the fixed pulley at height h_P, both masses below it, and mark each segment's length as the gap between the mass and the pulley.",
      "Step 3: FIRST_RELATION"
    ],
    "failureSignal": "You wrote x_A \u2212 x_B = constant (or a_A = a_B), or copied y_A + y_B = constant without writing what each segment length is in upward coordinates.",
    "difficulty": "{'band': 'D3', 'score': 6, 'components': {'concept_model_selection': 1, 'representation_translation': 2, 'reasoning_chain_length': 1, 'algebra_computational_load': 1, 'trap_exception_sensitivity': 1}, 'basis': 'A verbal fixed-pulley geometry and upward-positive coordinates must be translated into a signed length relation and differentiated twice.'}",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-PHY-NLM-2B-FRAME-SELECTION-05",
    "packageId": "LIB-PHY-NLM-FIRST-LAW-AUTHORED",
    "subject": "PHYSICS",
    "domain": "Kinematics & Motion",
    "stem": "A 0.2 kg bob hangs from a string tied to the roof of a car that accelerates horizontally to the right at 7.5 m/s\u00b2; the bob hangs steady relative to the car. Take g = 10 m/s\u00b2. A student wants the bob to be at rest in the chosen coordinates. Decide which observer makes that possible and what extra term that observer needs. Then find the string's angle from the vertical and its tension, and check both with the roadside frame.",
    "options": [],
    "hints": [
      "Which observer sees the bob stationary after the transient, and is that observer accelerating?",
      "Changing the observer does not create a new physical agent; any extra term must be tied to the observer description itself."
    ],
    "hintLadder": [
      "Step 1: ORIENT",
      "Draw the bob twice, once for the car observer (at rest, with a pseudo-force arrow) and once for the roadside observer (accelerating, no pseudo-force).",
      "Step 3: FIRST_RELATION"
    ],
    "failureSignal": "You added the 1.5 N pseudo-force in the roadside frame too, and then found the bob accelerating twice as hard, or you tilted the bob forward: in the car frame the pseudo-force points backward, so the bob hangs back at 37\u00b0.",
    "difficulty": "{'band': 'D3', 'score': 7, 'components': {'concept_model_selection': 2, 'representation_translation': 2, 'reasoning_chain_length': 1, 'algebra_computational_load': 1, 'trap_exception_sensitivity': 1}, 'basis': 'The response selects an accelerating frame, introduces the correct pseudo-force, and reconciles angle and tension with the inertial-frame description.'}",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-PHY-NLM-2A-FRICTION-ZERO-08",
    "packageId": "LIB-PHY-NLM-FIRST-LAW-AUTHORED",
    "subject": "PHYSICS",
    "domain": "Kinematics & Motion",
    "stem": "A crate rests on a rough horizontal floor. No horizontal force acts on it, and there is no tendency for the crate to slide relative to the floor. What is the friction force on the crate?",
    "options": [],
    "hints": [
      "Ask what relative sliding or slip tendency would appear at the contact if friction were absent.",
      "If no tangential force is required to prevent relative sliding, the friction value need not be nonzero."
    ],
    "hintLadder": [
      "Step 1: ORIENT",
      "Sketch the crate and list every horizontal force you can name. If the list is empty, ask what a friction force would have to balance.",
      "Step 3: FIRST_RELATION"
    ],
    "failureSignal": "You gave a non-zero friction such as \u03bc_s mg: nothing pushes the crate sideways, so there is no slip tendency and nothing for friction to oppose.",
    "difficulty": "{'band': 'D1', 'score': 2, 'components': {'concept_model_selection': 1, 'representation_translation': 0, 'reasoning_chain_length': 0, 'algebra_computational_load': 0, 'trap_exception_sensitivity': 1}, 'basis': 'Recognize the zero-demand boundary of static friction on a rough contact instead of assigning a nonzero friction merely because the surface is rough.'}",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-PHY-NLM-2A-FRICTION-STATIC-09",
    "packageId": "LIB-PHY-NLM-FIRST-LAW-AUTHORED",
    "subject": "PHYSICS",
    "domain": "Kinematics & Motion",
    "stem": "A 5 kg block rests on a rough horizontal floor. A 12 N horizontal pull is applied, but the block remains at rest. The coefficient of static friction is 0.6 and take g=10 m/s^2. Find the actual static friction and its limiting value.",
    "options": [],
    "hints": [
      "Because the block remains at rest, what horizontal force must friction balance?",
      "Find the required static friction first; compare it with mu_s N only afterward."
    ],
    "hintLadder": [
      "Step 1: ORIENT",
      "Draw the block with the 12 N pull, a friction arrow opposite it, the weight and the normal force. Label the friction f, not \u03bc_s N.",
      "Step 3: FIRST_RELATION"
    ],
    "failureSignal": "Your friction is 30 N: that is the most static friction can give, but a block at rest under a 12 N pull needs only 12 N; 30 N would drive it backward.",
    "difficulty": "{'band': 'D2', 'score': 4, 'components': {'concept_model_selection': 1, 'representation_translation': 0, 'reasoning_chain_length': 1, 'algebra_computational_load': 1, 'trap_exception_sensitivity': 1}, 'basis': 'Distinguish the actual static-friction demand from its maximum value and compute both for a stated rest condition.'}",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-PHY-NLM-2A-FRICTION-KINETIC-10",
    "packageId": "LIB-PHY-NLM-FIRST-LAW-AUTHORED",
    "subject": "PHYSICS",
    "domain": "Kinematics & Motion",
    "stem": "A 5 kg block is already sliding to the right on a horizontal floor. A constant 18 N horizontal force pulls it to the right. The coefficient of kinetic friction is 0.20 and take g=10 m/s^2. Find the acceleration.",
    "options": [],
    "hints": [
      "The contact state is already given: which friction model belongs to established sliding?",
      "Find N first, then f_k=mu_k N, set its direction opposite the sliding, and apply Newton II."
    ],
    "hintLadder": [
      "Step 1: ORIENT",
      "Draw the sliding block with the 18 N pull to the right, its weight and normal force, and a kinetic-friction arrow pointing opposite the sliding.",
      "Step 3: FIRST_RELATION"
    ],
    "failureSignal": "Your acceleration is 3.6 m/s\u00b2 (18/5, friction left out) or 5.6 m/s\u00b2 (friction added to the pull): kinetic friction of 10 N acts against the sliding and must be subtracted.",
    "difficulty": "{'band': 'D1', 'score': 2, 'components': {'concept_model_selection': 0, 'representation_translation': 0, 'reasoning_chain_length': 1, 'algebra_computational_load': 1, 'trap_exception_sensitivity': 0}, 'basis': 'Sliding is already established, so apply the kinetic-friction magnitude and Newton II directly with no contact-state decision left to make.'}",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-PHY-NLM-2B-FRICTION-WALKING-02",
    "packageId": "LIB-PHY-NLM-FIRST-LAW-AUTHORED",
    "subject": "PHYSICS",
    "domain": "Kinematics & Motion",
    "stem": "A 60 kg person stands on a 20 kg plank that rests on frictionless ice. The person starts to walk forward, accelerating at 0.5 m/s\u00b2 relative to the ice, and the shoes do not slip on the plank. Find the direction and size of the friction on the person's shoes, then the horizontal force on the plank and the plank's acceleration.",
    "options": [],
    "hints": [
      "At the shoe-plank contact, which way would the shoe slide across the plank if the plank were perfectly slippery?",
      "Friction on the shoe opposes that; the plank gets the partner of that friction, and nothing else pushes it sideways."
    ],
    "hintLadder": [
      "Step 1: ORIENT",
      "Draw the person and the plank as separate outlines, with the friction on the shoe on one and its partner on the other.",
      "Step 3: FIRST_RELATION"
    ],
    "failureSignal": "You said the plank stays still, or moves forward with the walker: the plank is pushed only by the partner of the shoe's friction, 30 N backward, so it slides backward at 1.5 m/s\u00b2.",
    "difficulty": "{'band': 'D3', 'score': 6, 'components': {'concept_model_selection': 2, 'representation_translation': 2, 'reasoning_chain_length': 1, 'algebra_computational_load': 1, 'trap_exception_sensitivity': 0}, 'basis': 'Static friction direction on the walker must be inferred from the required acceleration and its third-law partner transferred to the plank.'}",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-PHY-NLM-2B-FRICTION-ZERO-03",
    "packageId": "LIB-PHY-NLM-FIRST-LAW-AUTHORED",
    "subject": "PHYSICS",
    "domain": "Kinematics & Motion",
    "stem": "A 50 kg crate stands on the rough floor of a lift (\u03bc_s = 0.4) while the lift accelerates upward at 2 m/s\u00b2. Take g = 10 m/s\u00b2. Find the normal force on the crate and the friction force on it.",
    "options": [],
    "hints": [
      "Which way does the crate accelerate, and along which direction does friction act at a floor contact?",
      "Does anything try to make the crate slide across the floor?"
    ],
    "hintLadder": [
      "Step 1: ORIENT",
      "Draw the crate with its weight and the floor's push, and a dashed horizontal line where friction would act; mark the lift's acceleration arrow.",
      "Step 3: FIRST_RELATION"
    ],
    "failureSignal": "You wrote f = \u03bc_s N = 240 N (or 200 N from \u03bc_s mg): that is only the limit. Nothing asks the crate to slide sideways, so the friction is zero.",
    "difficulty": "{'band': 'D2', 'score': 4, 'components': {'concept_model_selection': 2, 'representation_translation': 1, 'reasoning_chain_length': 0, 'algebra_computational_load': 1, 'trap_exception_sensitivity': 0}, 'basis': 'Vertical lift acceleration changes the normal reaction while the tangential friction demand remains independently zero.'}",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-PHY-NLM-2B-FRICTION-ANGLED-THRESHOLD-04",
    "packageId": "LIB-PHY-NLM-FIRST-LAW-AUTHORED",
    "subject": "PHYSICS",
    "domain": "Kinematics & Motion",
    "stem": "A block of mass m is pushed on a rough horizontal floor by a force P directed at an angle theta below the horizontal. The coefficient of static friction is mu_s. Derive the largest P for which the block can remain at rest. Then show that for steep enough push angles no P at all can start the block, and find that angle for mu_s = 0.5.",
    "options": [],
    "hints": [
      "Before using any friction limit, how does the downward component of the applied force change the normal reaction?",
      "At the largest no-slip force, the static inequality is exactly at its boundary; combine that threshold with the vertical force balance."
    ],
    "hintLadder": [
      "Step 1: ORIENT",
      "Draw the block with P pointing down at theta, resolve it, and write N and the friction need beside the diagram before any inequality.",
      "Step 3: FIRST_RELATION"
    ],
    "failureSignal": "You divided by cos \u03b8 \u2212 \u03bc_s sin \u03b8 without checking its sign, and reported a negative or infinite P_max at steep angles. When tan \u03b8 \u2265 1/\u03bc_s the push presses the block down faster than it pushes it along, and no P can start it.",
    "difficulty": "{'band': 'D4', 'score': 8, 'components': {'concept_model_selection': 2, 'representation_translation': 2, 'reasoning_chain_length': 2, 'algebra_computational_load': 1, 'trap_exception_sensitivity': 1}, 'basis': 'The derivation must retain the sign of cos(theta)-mu_s sin(theta), identify the branch where no finite push initiates sliding, and evaluate the critical angle.'}",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-PHY-NLM-2B-FRICTION-TOP-BLOCK-05",
    "packageId": "LIB-PHY-NLM-FIRST-LAW-AUTHORED",
    "subject": "PHYSICS",
    "domain": "Kinematics & Motion",
    "stem": "A 2 kg block rests on a 4 kg block on a smooth floor. A horizontal force F acts on the upper block. Between the blocks \u03bc_s = 0.3 and \u03bc_k = 0.2; take g = 10 m/s\u00b2. Find the largest F for which the blocks move together, and then the acceleration of each block when F = 12 N.",
    "options": [],
    "hints": [
      "If the blocks move together, which block needs friction to keep up, and how large can that friction be?",
      "Once F passes the limit, write a separate Newton-II equation for each block, with \u03bc_k N at the interface opposing the relative slip on each."
    ],
    "hintLadder": [
      "Step 1: ORIENT",
      "Draw the two blocks apart, with the friction on the upper block and its partner on the lower block.",
      "Step 3: FIRST_RELATION"
    ],
    "failureSignal": "You kept one acceleration, 12/6 = 2 m/s\u00b2, at F = 12 N: that needs 8 N of friction on the lower block, above the 6 N limit, so the blocks slip and move at 4 m/s\u00b2 and 1 m/s\u00b2.",
    "difficulty": "{'band': 'D3', 'score': 7, 'components': {'concept_model_selection': 2, 'representation_translation': 1, 'reasoning_chain_length': 2, 'algebra_computational_load': 1, 'trap_exception_sensitivity': 1}, 'basis': 'The response finds the shared-motion threshold, detects that the given force crosses it, then switches to kinetic friction and separate accelerations.'}",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-PHY-NLM-2A-CONNECTED-CONSTRAINT-11",
    "packageId": "LIB-PHY-NLM-FIRST-LAW-AUTHORED",
    "subject": "PHYSICS",
    "domain": "Kinematics & Motion",
    "stem": "Blocks A and B are side by side on a smooth horizontal floor, with A to the left of B and no adhesive connection. Compare two cases. In case 1 a horizontal force pushes A to the right into B and contact is maintained. In case 2 the same force pulls A to the left, away from B. In which case may one common horizontal acceleration be imposed, and why?",
    "options": [],
    "hints": [
      "What physical condition must stay active before equal acceleration can be imposed?",
      "Ask whether an ordinary contact normal can keep acting when A tries to move away from B."
    ],
    "hintLadder": [
      "Step 1: ORIENT",
      "For each case, draw the two blocks and an arrow for how the force moves A. Mark whether A presses into B or moves away from it.",
      "Step 3: FIRST_RELATION"
    ],
    "failureSignal": "You gave both cases the acceleration F/(m_A + m_B): in case 2 that would need an ordinary contact to pull B along, and a contact can only push.",
    "difficulty": "{'band': 'D3', 'score': 6, 'components': {'concept_model_selection': 2, 'representation_translation': 1, 'reasoning_chain_length': 1, 'algebra_computational_load': 0, 'trap_exception_sensitivity': 2}, 'basis': 'Decide whether contact can enforce a common acceleration in pushing versus separating cases, using the fact that an ordinary normal force cannot pull.'}",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-PHY-NLM-2A-ATWOOD-12",
    "packageId": "LIB-PHY-NLM-FIRST-LAW-AUTHORED",
    "subject": "PHYSICS",
    "domain": "Kinematics & Motion",
    "stem": "Masses m_A and m_B, with m_B > m_A, hang from the two ends of one taut massless inextensible string over one fixed frictionless massless pulley. Derive the acceleration magnitude a and the common string tension T. State explicitly why T is not equal to either hanging weight during the acceleration.",
    "options": [],
    "hints": [
      "Separate the two claims you need: what fixes the acceleration relationship, and what licenses one common tension magnitude?",
      "Write one signed Newton-II equation for each mass, then add the equations to eliminate T."
    ],
    "hintLadder": [
      "Step 1: ORIENT",
      "Draw one diagram per mass, with the tension up and the weight down on each, and mark A's acceleration up and B's down.",
      "Step 3: FIRST_RELATION"
    ],
    "failureSignal": "Your tension is m_A g or m_B g: while the masses accelerate, the string pulls A harder than A's weight and pulls B less than B's weight.",
    "difficulty": "{'band': 'D3', 'score': 7, 'components': {'concept_model_selection': 1, 'representation_translation': 1, 'reasoning_chain_length': 2, 'algebra_computational_load': 2, 'trap_exception_sensitivity': 1}, 'basis': 'Combine the fixed-string acceleration constraint with two body equations to derive acceleration and tension, then explain why neither weight equals the tension.'}",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-PHY-NLM-2B-CONTACT-LOSS-06",
    "packageId": "LIB-PHY-NLM-FIRST-LAW-AUTHORED",
    "subject": "PHYSICS",
    "domain": "Kinematics & Motion",
    "stem": "Blocks A (2 kg) and B (3 kg) touch on a smooth floor, A behind B. A 10 N force pushes A forward, into B, and at the same time a force F pulls B forward. For F = 10 N and for F = 30 N, decide whether the blocks stay in contact, and find the accelerations.",
    "options": [],
    "hints": [
      "What can a contact between two unglued blocks do, and what can it never do?",
      "If you assume the blocks move together, what would the contact force on A have to be, and is that possible?"
    ],
    "hintLadder": [
      "Step 1: ORIENT",
      "Draw A and B apart, each with its applied force and the contact force from the other, labelled N with its direction fixed as a push.",
      "Step 3: FIRST_RELATION"
    ],
    "failureSignal": "You wrote a = 40/5 = 8 m/s\u00b2 for both blocks at F = 30 N: that needs the contact to pull A forward with 6 N, which it cannot do, so B pulls away.",
    "difficulty": "{'band': 'D3', 'score': 7, 'components': {'concept_model_selection': 2, 'representation_translation': 1, 'reasoning_chain_length': 2, 'algebra_computational_load': 1, 'trap_exception_sensitivity': 1}, 'basis': 'A trial common-acceleration model must be tested for a physically admissible normal force before the separated-body model is selected.'}",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-PHY-NLM-2B-CONSTRAINT-VS-TENSION-07",
    "packageId": "LIB-PHY-NLM-FIRST-LAW-AUTHORED",
    "subject": "PHYSICS",
    "domain": "Kinematics & Motion",
    "stem": "Masses A (3 kg) and B (1 kg) hang from one light inextensible string that does not slip on a fixed pulley with appreciable rotational inertia; no rotational law is supplied. y_A and y_B are measured downward from the pulley, and g = 10 m/s\u00b2. A is measured to accelerate downward at 4 m/s\u00b2. Decide which of a_A + a_B = 0 and T_A = T_B can still be used, find a_B, and find the tension in each segment.",
    "options": [],
    "hints": [
      "Which of the two relations comes from the string's length, and which from the pulley being ideal?",
      "If the two tensions may differ, what does each hanging mass's own motion tell you about the tension on it?"
    ],
    "hintLadder": [
      "Step 1: ORIENT",
      "Draw A and B separately, each with its own tension arrow labelled T_A or T_B, and write the length relation beside the pulley.",
      "Step 3: FIRST_RELATION"
    ],
    "failureSignal": "You used one T = 15 N from the ideal Atwood result, or dropped a_A + a_B = 0 along with equal tension: the length relation still holds, but the two tensions, 18 N and 14 N, differ.",
    "difficulty": "{'band': 'D3', 'score': 7, 'components': {'concept_model_selection': 2, 'representation_translation': 2, 'reasoning_chain_length': 1, 'algebra_computational_load': 1, 'trap_exception_sensitivity': 1}, 'basis': 'The fixed string still constrains acceleration while pulley inertia invalidates equal tension, separating geometry from force-transmission assumptions.'}",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-PHY-NLM-INCLINE-2A-SMOOTH-01",
    "packageId": "LIB-PHY-NLM-FIRST-LAW-AUTHORED",
    "subject": "PHYSICS",
    "domain": "Kinematics & Motion",
    "stem": "A block of mass m is released from rest on a smooth fixed plane inclined at angle theta above the horizontal. Choose axes that make the contact constraint simple, determine the normal reaction, and find the block's acceleration along the plane.",
    "options": [],
    "hints": [
      "Which axis choice turns maintained contact into one simple acceleration statement?",
      "With axes parallel/perpendicular to the plane, resolve weight before writing the two signed Newton-II equations."
    ],
    "hintLadder": [
      "Step 1: ORIENT",
      "Draw the block on the plane with one axis along the slope and one perpendicular to it, and mark only the weight and the normal force.",
      "Step 3: FIRST_RELATION"
    ],
    "failureSignal": "You wrote N = mg or a = g: the plane supports only the perpendicular part of the weight, mg cos \u03b8, and only mg sin \u03b8 drives the block along it.",
    "difficulty": "{'band': 'D2', 'score': 4, 'components': {'concept_model_selection': 1, 'representation_translation': 1, 'reasoning_chain_length': 1, 'algebra_computational_load': 1, 'trap_exception_sensitivity': 0}, 'basis': 'Choose contact-aligned axes, resolve weight, and use perpendicular and tangential Newton-II equations for a smooth incline.'}",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-PHY-NLM-INCLINE-2A-STATIC-02",
    "packageId": "LIB-PHY-NLM-FIRST-LAW-AUTHORED",
    "subject": "PHYSICS",
    "domain": "Kinematics & Motion",
    "stem": "A block rests on a rough fixed plane inclined at angle theta. The coefficient of static friction is mu_s. Determine the friction required for rest and derive the condition under which the static state is possible.",
    "options": [],
    "hints": [
      "First ask which way the block would tend to slip if friction vanished.",
      "Find N from the perpendicular equation, solve the friction required for rest, then compare that requirement with mu_s N."
    ],
    "hintLadder": [
      "Step 1: ORIENT",
      "Step 2: REPRESENT",
      "Step 3: FIRST_RELATION",
      "Step 4: CONNECT",
      "Step 5: CONNECT"
    ],
    "failureSignal": "You set the friction to \u03bc_s mg cos \u03b8 at the start: that is only its limit. Rest needs mg sin \u03b8, and that need is what gets compared with the limit.",
    "difficulty": "{'band': 'D3', 'score': 7, 'components': {'concept_model_selection': 1, 'representation_translation': 1, 'reasoning_chain_length': 2, 'algebra_computational_load': 1, 'trap_exception_sensitivity': 2}, 'basis': 'Find the friction required by a provisional rest model and separately test it against the static limit, preserving the distinction between demand and maximum.'}",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-PHY-NLM-INCLINE-2A-SLIDING-03",
    "packageId": "LIB-PHY-NLM-FIRST-LAW-AUTHORED",
    "subject": "PHYSICS",
    "domain": "Kinematics & Motion",
    "stem": "A block is already sliding down a rough fixed plane inclined at angle theta. The coefficient of kinetic friction is mu_k. Derive its acceleration along the plane.",
    "options": [],
    "hints": [
      "The block is already sliding down the plane; which way must the kinetic friction act at the contact?",
      "Use the perpendicular equation for N, then write the tangential net force with down the plane positive."
    ],
    "hintLadder": [
      "Step 1: ORIENT",
      "Draw the block with axes along and perpendicular to the plane, mark the sliding direction, and put kinetic friction opposite it.",
      "Step 3: FIRST_RELATION"
    ],
    "failureSignal": "Your acceleration is g(sin \u03b8 + \u03bc_k cos \u03b8): friction was added along the sliding, which would make the rough slope faster than a smooth one.",
    "difficulty": "{'band': 'D2', 'score': 4, 'components': {'concept_model_selection': 1, 'representation_translation': 1, 'reasoning_chain_length': 1, 'algebra_computational_load': 1, 'trap_exception_sensitivity': 0}, 'basis': 'With downward sliding already established, resolve the forces and apply the kinetic-friction model to derive the along-plane acceleration.'}",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-PHY-NLM-INCLINE-2A-HORIZONTAL-PUSH-04",
    "packageId": "LIB-PHY-NLM-FIRST-LAW-AUTHORED",
    "subject": "PHYSICS",
    "domain": "Kinematics & Motion",
    "stem": "A block of mass m is on a smooth fixed plane that rises to the right at angle theta above the horizontal. A horizontal force P pushes the block to the right. Determine the normal reaction and the acceleration along the plane.",
    "options": [],
    "hints": [
      "The horizontal applied force is not parallel to the plane. Which component presses into the plane and which acts along it?",
      "Resolve P and mg in the same plane-aligned axes, use a_perp=0 for N, then use the parallel equation for acceleration."
    ],
    "hintLadder": [
      "Step 1: ORIENT",
      "Draw the block with plane-aligned axes and the horizontal push P, and mark the angle between P and the slope before resolving anything.",
      "Step 3: FIRST_RELATION"
    ],
    "failureSignal": "You wrote N = mg cos \u03b8: the horizontal push also presses the block into the plane and adds P sin \u03b8 to the normal force.",
    "difficulty": "{'band': 'D3', 'score': 7, 'components': {'concept_model_selection': 1, 'representation_translation': 2, 'reasoning_chain_length': 2, 'algebra_computational_load': 1, 'trap_exception_sensitivity': 1}, 'basis': 'Resolve a horizontal applied force into incline-aligned components and carry both components into the normal-reaction and tangential-acceleration equations.'}",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-PHY-NLM-INCLINE-2A-FBD-COMPONENTS-05",
    "packageId": "LIB-PHY-NLM-FIRST-LAW-AUTHORED",
    "subject": "PHYSICS",
    "domain": "Kinematics & Motion",
    "stem": "A block slides down a smooth fixed incline. A student draws three downward-related force arrows on the same free-body diagram: mg vertically downward, mg sin(theta) down the plane, and mg cos(theta) into the plane. Diagnose the diagram and state how the weight should be represented when writing plane-aligned equations.",
    "options": [],
    "hints": [
      "Did choosing new axes create any new physical object acting on the block?",
      "Keep one gravity interaction; use either its original vector or its resolved components in a given equation representation, not both."
    ],
    "hintLadder": [
      "Step 1: ORIENT",
      "List the physical agents touching or attracting the block, one line each, before drawing any arrow: the number of lines is the number of forces.",
      "Step 3: FIRST_RELATION"
    ],
    "failureSignal": "You kept mg alongside mg sin \u03b8 and mg cos \u03b8, so the weight is drawn three times: once as mg and again as its two components. The components replace the weight; they do not join it.",
    "difficulty": "{'band': 'D3', 'score': 7, 'components': {'concept_model_selection': 2, 'representation_translation': 2, 'reasoning_chain_length': 1, 'algebra_computational_load': 0, 'trap_exception_sensitivity': 2}, 'basis': 'Diagnose double-counting on a free-body diagram by separating the physical weight force from its coordinate components.'}",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-PHY-NLM-INCLINE-2B-AXES-01",
    "packageId": "LIB-PHY-NLM-FIRST-LAW-AUTHORED",
    "subject": "PHYSICS",
    "domain": "Kinematics & Motion",
    "stem": "A 2 kg block slides down a smooth fixed 30\u00b0 incline that slopes down to the right. Take g = 10 m/s\u00b2. Student A uses axes along and perpendicular to the plane; Student B uses horizontal and vertical axes. Carry out Student B's solution: write the horizontal and vertical Newton-II equations, state in these axes the condition that keeps the block on the plane, and find N and the acceleration components. Show that the result agrees with Student A's a = g sin 30\u00b0.",
    "options": [],
    "hints": [
      "In horizontal and vertical axes, is either component of the block's acceleration zero?",
      "Write both equations with N resolved, then add the condition that the acceleration points along the slope."
    ],
    "hintLadder": [
      "Step 1: ORIENT",
      "Draw the block on the slope with horizontal and vertical axes, the normal force at 30\u00b0 from the vertical, and the acceleration arrow along the slope.",
      "Step 3: FIRST_RELATION"
    ],
    "failureSignal": "You set a_y = 0 (or a_x = 0) in Student B's axes: neither lab component vanishes, because the acceleration points along the slope. Or you set N = mg, which would need zero vertical acceleration.",
    "difficulty": "{'band': 'D3', 'score': 7, 'components': {'concept_model_selection': 2, 'representation_translation': 2, 'reasoning_chain_length': 1, 'algebra_computational_load': 2, 'trap_exception_sensitivity': 0}, 'basis': 'The incline is solved in horizontal/vertical axes, requiring the contact constraint to be expressed in those coordinates and reconciled with the plane-aligned result.'}",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-PHY-NLM-INCLINE-2B-FRICTION-DIRECTION-02",
    "packageId": "LIB-PHY-NLM-FIRST-LAW-AUTHORED",
    "subject": "PHYSICS",
    "domain": "Kinematics & Motion",
    "stem": "A 4 kg block rests on a rough fixed 30\u00b0 incline with \u03bc_s = 0.5; take g = 10 m/s\u00b2. A force P acts on it up the slope, parallel to the plane. In three trials P = 15 N, 20 N and 26 N, and the block stays at rest each time. In each trial find the direction and size of the static friction, without assuming it points uphill, and check that it is within the static limit.",
    "options": [],
    "hints": [
      "Temporarily remove friction from the model. Which way would the block tend to move in each trial?",
      "How does the push in each trial compare with the part of the weight that pulls down the slope?"
    ],
    "hintLadder": [
      "Step 1: ORIENT",
      "Draw the block on the slope three times, each with P up the slope, the 20 N down-slope part of the weight, and an empty friction arrow to be given a direction.",
      "Step 3: FIRST_RELATION"
    ],
    "failureSignal": "You drew friction up the slope in all three trials, and got 5 N, 0 and \u22126 N 'up': at 26 N the push beats the weight's pull down the slope, so the block would slide up and friction points down.",
    "difficulty": "{'band': 'D3', 'score': 6, 'components': {'concept_model_selection': 2, 'representation_translation': 1, 'reasoning_chain_length': 1, 'algebra_computational_load': 1, 'trap_exception_sensitivity': 1}, 'basis': 'Static friction is a signed required force that changes direction across three applied-force values, including a zero-friction reversal point.'}",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-PHY-NLM-INCLINE-2B-HORIZONTAL-THRESHOLD-03",
    "packageId": "LIB-PHY-NLM-FIRST-LAW-AUTHORED",
    "subject": "PHYSICS",
    "domain": "Kinematics & Motion",
    "stem": "A block of mass m is held at rest on a rough fixed plane that rises to the right at angle theta. A horizontal force P pushes to the right. The coefficient of static friction is mu_s. Derive the condition on P and theta for the block to be able to remain at rest.",
    "options": [],
    "hints": [
      "Which part of the horizontal force changes the contact normal, and which part changes the tangential force demand?",
      "Find N first, then solve the signed friction needed for rest before comparing its magnitude with the static limit."
    ],
    "hintLadder": [
      "Step 1: ORIENT",
      "Step 2: REPRESENT",
      "Step 3: FIRST_RELATION",
      "Step 4: CONNECT"
    ],
    "failureSignal": "You used N = mg cos \u03b8, or tested mg sin \u03b8 \u2212 P cos \u03b8 \u2264 \u03bc_s N without the absolute value: the push adds P sin \u03b8 to N, and for a large P the block would tend to slide up, so the need can be negative.",
    "difficulty": "{'band': 'D3', 'score': 7, 'components': {'concept_model_selection': 2, 'representation_translation': 2, 'reasoning_chain_length': 1, 'algebra_computational_load': 1, 'trap_exception_sensitivity': 1}, 'basis': 'The horizontal force changes both tangential demand and normal reaction, so a signed required friction and two-sided feasibility inequality are needed.'}",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-PHY-NLM-INCLINE-2B-COMPONENT-TRAP-04",
    "packageId": "LIB-PHY-NLM-FIRST-LAW-AUTHORED",
    "subject": "PHYSICS",
    "domain": "Kinematics & Motion",
    "stem": "A 2 kg block slides down the smooth face of a 5 kg wedge inclined at 30\u00b0. The wedge stays at rest on a rough floor. Its slope rises to the right, so the block slides down to the left. Take g = 10 m/s\u00b2. Build the free-body diagram of the wedge only, and find the floor's normal force and the floor's friction force on the wedge.",
    "options": [],
    "hints": [
      "Which bodies touch or attract the wedge? List them before drawing any arrow.",
      "Find the block's normal force from the block's own equation first, then put its partner on the wedge."
    ],
    "hintLadder": [
      "Step 1: ORIENT",
      "Draw the wedge alone, with a dashed outline where the block touches it, and one arrow for each body that touches or attracts the wedge.",
      "Step 3: FIRST_RELATION"
    ],
    "failureSignal": "You put the block's 20 N weight on the wedge and got 70 N from the floor with no floor friction: the block acts on the wedge only through its 17.3 N contact push at 30\u00b0 from the vertical, so the floor gives 65 N and must also supply 8.7 N of friction.",
    "difficulty": "{'band': 'D3', 'score': 6, 'components': {'concept_model_selection': 1, 'representation_translation': 2, 'reasoning_chain_length': 1, 'algebra_computational_load': 1, 'trap_exception_sensitivity': 1}, 'basis': \"The free-body diagram must be for the wedge alone; the block's contact force is then resolved before floor normal and friction are determined.\"}",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-PHY-NLM-INCLINE-2B-TIMING-05",
    "packageId": "LIB-PHY-NLM-FIRST-LAW-AUTHORED",
    "subject": "PHYSICS",
    "domain": "Kinematics & Motion",
    "stem": "A block starts from rest and travels the same distance s down the same incline of angle theta in two trials. On a smooth surface the time is t_0. On a rough surface the block slides throughout and the time is t > t_0. Assuming kinetic friction coefficient mu_k is constant, derive mu_k in terms of theta, t_0 and t. Evaluate mu_k for theta = 37\u00b0 (tan 37\u00b0 = 0.75) when t = 2t_0.",
    "options": [],
    "hints": [
      "The two trials cover the same distance from rest. What relation connects distance, constant acceleration and travel time in each trial?",
      "Express the rough acceleration from the friction model and the smooth acceleration from the no-friction model, then eliminate the common distance."
    ],
    "hintLadder": [
      "Step 1: ORIENT",
      "Sketch the same slope twice, smooth and rough, marking the same distance s from rest and the two times t_0 and t.",
      "Step 3: FIRST_RELATION"
    ],
    "failureSignal": "You wrote a/a_0 = t/t_0 or t_0/t: with s fixed, s = \u00bdat\u00b2 makes a proportional to 1/t\u00b2, so the ratio is t_0\u00b2/t\u00b2.",
    "difficulty": "{'band': 'D3', 'score': 7, 'components': {'concept_model_selection': 2, 'representation_translation': 1, 'reasoning_chain_length': 2, 'algebra_computational_load': 1, 'trap_exception_sensitivity': 1}, 'basis': 'Two force models are connected through equal-distance kinematics so the unknown distance can be eliminated and mu_k inferred from a time ratio.'}",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-PHY-NLM-MTR-2A-01",
    "packageId": "LIB-PHY-NLM-MOMENTUM-TRANSFER-AUTHORED",
    "subject": "PHYSICS",
    "domain": "Dynamics & Mechanics",
    "stem": "A fixed launcher processes identical pellets of mass m. In the laboratory frame each pellet enters moving in the positive direction with speed u and leaves in the same direction with speed v, where v > u. The steady processing rate is R pellets per second. Find the average force on the pellets, the interaction force on the launcher, and the external holding force required to keep the launcher fixed.",
    "options": [],
    "hints": [
      "Do not start with the pellet's final momentum. What is the change in momentum of one pellet in the chosen frame?",
      "Multiply the per-pellet momentum change by pellets per second, then keep the force on the pellets separate from the reaction on the launcher."
    ],
    "hintLadder": [
      "Step 1: ORIENT",
      "Step 2: FIRST_RELATION"
    ],
    "failureSignal": "Check dimensional consistency and boundary behavior.",
    "difficulty": "{'band': 'D2', 'score': 3, 'components': {'concept_model_selection': 1, 'representation_translation': 1, 'reasoning_chain_length': 1, 'algebra_computational_load': 0, 'trap_exception_sensitivity': 0}, 'basis': 'Symbolic evaluation of momentum change delta_p = m(v - u) and impulse delivered by a fixed launcher along a one-dimensional line.'}",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-PHY-NLM-MTR-2A-02",
    "packageId": "LIB-PHY-NLM-MOMENTUM-TRANSFER-AUTHORED",
    "subject": "PHYSICS",
    "domain": "Dynamics & Mechanics",
    "stem": "A launcher is held fixed and ejects 0.020 kg projectiles from rest at 8 projectiles per second. Each leaves at 300 m/s in the positive direction. Find the average force on the projectile stream, the average recoil force on the launcher, and the external holding force.",
    "options": [],
    "hints": [
      "First find the momentum change of one projectile in the declared laboratory frame.",
      "Convert the repeated identical changes into momentum gained each second, then assign the interaction-partner and holding-force directions to the correct bodies."
    ],
    "hintLadder": [
      "Step 1: ORIENT",
      "Step 2: FIRST_RELATION"
    ],
    "failureSignal": "Check dimensional consistency and boundary behavior.",
    "difficulty": "{'band': 'D2', 'score': 4, 'components': {'concept_model_selection': 1, 'representation_translation': 0, 'reasoning_chain_length': 1, 'algebra_computational_load': 1, 'trap_exception_sensitivity': 1}, 'basis': 'Calculates time-rate of momentum transfer F_avg = (delta_m / delta_t) * v for repeated ejections and applies third-law reaction force.'}",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-PHY-NLM-MTR-2A-03",
    "packageId": "LIB-PHY-NLM-MOMENTUM-TRANSFER-AUTHORED",
    "subject": "PHYSICS",
    "domain": "Dynamics & Mechanics",
    "stem": "During a 6.0 s interval, a fixed launcher processes 90 identical 0.010 kg pellets. In the laboratory frame each pellet enters at +20 m/s and leaves at +140 m/s. Find the average force on the pellet stream over the interval.",
    "options": [],
    "hints": [
      "The question gives a number of pellets over a time interval, not yet a rate in pellets per second.",
      "Compute R=n/Delta t, then multiply by the final-minus-initial momentum change of one pellet."
    ],
    "hintLadder": [
      "Step 1: ORIENT",
      "Step 2: FIRST_RELATION"
    ],
    "failureSignal": "Check dimensional consistency and boundary behavior.",
    "difficulty": "{'band': 'D2', 'score': 3, 'components': {'concept_model_selection': 1, 'representation_translation': 0, 'reasoning_chain_length': 1, 'algebra_computational_load': 1, 'trap_exception_sensitivity': 0}, 'basis': 'Computes stream momentum transfer rate from total particle count, individual delta_v, and duration.'}",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-PHY-NLM-MTR-2A-04",
    "packageId": "LIB-PHY-NLM-MOMENTUM-TRANSFER-AUTHORED",
    "subject": "PHYSICS",
    "domain": "Dynamics & Mechanics",
    "stem": "A fixed launcher ejects 0.050 kg projectiles to the left from rest at 5 projectiles per second. The coordinate axis is chosen positive to the right, and each projectile leaves with velocity -40 m/s. Give the signed average force on the projectile stream, the signed recoil force on the launcher, and the signed external holding force.",
    "options": [],
    "hints": [
      "Use the declared right-positive axis; do not silently replace the signed exit velocity by its speed.",
      "After finding the signed stream force, use body ownership to reverse the sign for launcher recoil and reverse it again for the holding force."
    ],
    "hintLadder": [
      "Step 1: ORIENT",
      "Step 2: FIRST_RELATION"
    ],
    "failureSignal": "Check dimensional consistency and boundary behavior.",
    "difficulty": "{'band': 'D2', 'score': 5, 'components': {'concept_model_selection': 1, 'representation_translation': 1, 'reasoning_chain_length': 1, 'algebra_computational_load': 1, 'trap_exception_sensitivity': 1}, 'basis': 'Tracks vector signs for leftward ejection under rightward-positive axis, distinguishing thrust on stream from external holding force.'}",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-PHY-NLM-MTR-2A-05",
    "packageId": "LIB-PHY-NLM-MOMENTUM-TRANSFER-AUTHORED",
    "subject": "PHYSICS",
    "domain": "Dynamics & Mechanics",
    "stem": "A held launcher ejects 120 identical 0.010 kg pellets from rest to +100 m/s during a 4.0 s interval. Compute the average force on the pellet stream. Then state whether this calculation proves that the instantaneous force is equal to that value at every moment of the 4.0 s interval.",
    "options": [],
    "hints": [
      "Separate the quantity determined by total momentum change divided by the full interval from the detailed force during one individual launch.",
      "Compute n/Delta t and the per-item Delta p for the average; do not invent a peak force without pulse-time data."
    ],
    "hintLadder": [
      "Step 1: ORIENT",
      "Step 2: FIRST_RELATION"
    ],
    "failureSignal": "Check dimensional consistency and boundary behavior.",
    "difficulty": "{'band': 'D2', 'score': 4, 'components': {'concept_model_selection': 1, 'representation_translation': 0, 'reasoning_chain_length': 1, 'algebra_computational_load': 1, 'trap_exception_sensitivity': 1}, 'basis': 'Applies burst rate of momentum ejection to determine external restraining force required for static launcher equilibrium.'}",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-PHY-NLM-MTR-2B-MODEL-01",
    "packageId": "LIB-PHY-NLM-MOMENTUM-TRANSFER-AUTHORED",
    "subject": "PHYSICS",
    "domain": "Dynamics & Mechanics",
    "stem": "A held launcher fires 0.004 kg projectiles from rest at 20 per second, each leaving at 500 m/s. No acceleration time or barrel length is supplied. A learner says the average holding force cannot be found because F=ma needs the projectile acceleration. Determine whether the requested average force is nevertheless fixed by the given information, and find it if it is.",
    "options": [],
    "hints": [
      "Which change for one projectile can be computed from its mass and initial/final velocities without knowing the duration of the launch?",
      "The question asks for a long-time average over many identical events, not the detailed force during one event."
    ],
    "hintLadder": [
      "Step 1: ORIENT",
      "Step 2: ORIENT"
    ],
    "failureSignal": "Check dimensional consistency and boundary behavior.",
    "difficulty": "{'band': 'D3', 'score': 6, 'components': {'concept_model_selection': 2, 'representation_translation': 0, 'reasoning_chain_length': 1, 'algebra_computational_load': 1, 'trap_exception_sensitivity': 2}, 'basis': 'Refutes dimensional mismatch error of confusing momentum with force, deriving the correct rate-of-change formulation.'}",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-PHY-NLM-MTR-2B-LOG-02",
    "packageId": "LIB-PHY-NLM-MOMENTUM-TRANSFER-AUTHORED",
    "subject": "PHYSICS",
    "domain": "Dynamics & Mechanics",
    "stem": "A test log records 600 identical projectiles during a 30 s run. Each has mass 5.0 g, enters the launcher at +50 m/s and leaves at +250 m/s. Convert the log into the quantities needed to determine the average holding force on a fixed launcher, and give that force.",
    "options": [],
    "hints": [
      "The log does not yet give the two quantities in the form used by the momentum-transfer relation: convert the count/time and the mass first.",
      "After the representation is in SI form, compute one item's final-minus-initial momentum and then the repeated-event average."
    ],
    "hintLadder": [
      "Step 1: ORIENT",
      "Step 2: FIRST_RELATION"
    ],
    "failureSignal": "Check dimensional consistency and boundary behavior.",
    "difficulty": "{'band': 'D3', 'score': 7, 'components': {'concept_model_selection': 2, 'representation_translation': 1, 'reasoning_chain_length': 2, 'algebra_computational_load': 1, 'trap_exception_sensitivity': 1}, 'basis': 'Handles velocity direction reversal (delta_v = -40 m/s) in continuous stream rate calculations, computing both stream impulse rate and holding force.'}",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-PHY-NLM-MTR-2B-SUPPORT-03",
    "packageId": "LIB-PHY-NLM-MOMENTUM-TRANSFER-AUTHORED",
    "subject": "PHYSICS",
    "domain": "Dynamics & Mechanics",
    "stem": "A launcher ejects projectiles to the left while the laboratory x-axis is positive to the right. From the repeated stream calculation, the launcher experiences an average recoil force of +12 N. The launcher is held fixed by a support. State (i) the force of the support on the launcher and (ii) the force of the launcher on the support, with signs, and explain why these two forces must not be confused.",
    "options": [],
    "hints": [
      "For the held launcher, which force must cancel the stated +12 N recoil in the launcher's own force sum?",
      "After identifying support-on-launcher, find its Newton-third-law partner by changing the body on which the force acts."
    ],
    "hintLadder": [
      "Step 1: ORIENT",
      "Step 2: FIRST_RELATION"
    ],
    "failureSignal": "Check dimensional consistency and boundary behavior.",
    "difficulty": "{'band': 'D3', 'score': 7, 'components': {'concept_model_selection': 2, 'representation_translation': 1, 'reasoning_chain_length': 2, 'algebra_computational_load': 1, 'trap_exception_sensitivity': 1}, 'basis': 'Multi-step vector force sign justification for rocket/launcher mount under counter-directional coordinate axis.'}",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-PHY-NLM-MTR-2B-ZERO-04",
    "packageId": "LIB-PHY-NLM-MOMENTUM-TRANSFER-AUTHORED",
    "subject": "PHYSICS",
    "domain": "Dynamics & Mechanics",
    "stem": "A device passes identical pellets through at a steady nonzero rate. In the chosen laboratory frame each pellet enters at +120 m/s and leaves at +120 m/s. A proposed shortcut says that because pellets emerge carrying momentum, the device must experience a nonzero average recoil equal to rate times m times 120 m/s. Decide whether that conclusion follows from the bounded momentum-transfer model.",
    "options": [],
    "hints": [
      "Compare the pellet's signed momentum before and after the device rather than looking only at what leaves."
    ],
    "hintLadder": [
      "Step 1: ORIENT"
    ],
    "failureSignal": "Check dimensional consistency and boundary behavior.",
    "difficulty": "{'band': 'D2', 'score': 5, 'components': {'concept_model_selection': 2, 'representation_translation': 0, 'reasoning_chain_length': 1, 'algebra_computational_load': 0, 'trap_exception_sensitivity': 2}, 'basis': 'Proves that steady nonzero mass flow with zero velocity change imparts zero net force, countering the intuition that mass flow implies thrust.'}",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-PHY-NLM-MTR-2B-AVERAGE-05",
    "packageId": "LIB-PHY-NLM-MOMENTUM-TRANSFER-AUTHORED",
    "subject": "PHYSICS",
    "domain": "Dynamics & Mechanics",
    "stem": "A repeated-launch calculation gives F_avg=30 N for a held launcher. A high-speed force sensor, however, shows short force pulses separated by intervals close to zero force. A learner says the sensor disproves the 30 N result because the force is not constantly 30 N. Decide whether the two observations are compatible and state what additional information would be needed to determine a peak force.",
    "options": [],
    "hints": [
      "Ask whether total momentum change divided by a long observation time specifies every value of the force inside that interval."
    ],
    "hintLadder": [
      "Step 1: ORIENT"
    ],
    "failureSignal": "Check dimensional consistency and boundary behavior.",
    "difficulty": "{'band': 'D3', 'score': 7, 'components': {'concept_model_selection': 2, 'representation_translation': 1, 'reasoning_chain_length': 2, 'algebra_computational_load': 0, 'trap_exception_sensitivity': 2}, 'basis': 'Reconciles continuous time-average force model with pulsed discrete physical interaction forces using impulse integration.'}",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-OSC-1A-EQUIL-01",
    "packageId": "LIB-PHY-OSC-SHM-WAVES-AUTHORED",
    "subject": "PHYSICS",
    "domain": "Oscillations & Waves",
    "stem": "A ball on a curved bowl repeatedly moves back and forth. (a) Mark the equilibrium position. (b) Describe the direction of the ball's tendency when displaced to the left and when displaced to the right of equilibrium. (c) Does this motion qualify as oscillation? Justify using the two-sided tendency test.",
    "options": [],
    "hints": [
      "Recall defining conservation relations and frame definitions."
    ],
    "hintLadder": [
      "1. Draw a schematic coordinate frame.",
      "2. State explicit balance equations."
    ],
    "failureSignal": "Check dimensional consistency and boundary behavior.",
    "difficulty": "{'band': 'D1', 'score': 2, 'components': {'concept_model_selection': 1, 'representation_translation': 0, 'reasoning_chain_length': 1, 'algebra_computational_load': 0, 'trap_exception_sensitivity': 0}, 'basis': 'Applies stable-equilibrium two-sided test to a simple bowl-and-ball system.'}",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-OSC-1A-ENERGY-01",
    "packageId": "LIB-PHY-OSC-SHM-WAVES-AUTHORED",
    "subject": "PHYSICS",
    "domain": "Oscillations & Waves",
    "stem": "An ideal pendulum is released from rest at its rightmost position. Using five ordered checkpoints (right turn, centre, left turn, centre, right turn), classify kinetic energy as HIGH or LOW and potential energy as HIGH or LOW at each checkpoint. How many times does kinetic energy reach a maximum in one complete displacement cycle?",
    "options": [],
    "hints": [
      "Recall defining conservation relations and frame definitions."
    ],
    "hintLadder": [
      "1. Draw a schematic coordinate frame.",
      "2. State explicit balance equations."
    ],
    "failureSignal": "Check dimensional consistency and boundary behavior.",
    "difficulty": "{'band': 'D1', 'score': 2, 'components': {'concept_model_selection': 1, 'representation_translation': 0, 'reasoning_chain_length': 1, 'algebra_computational_load': 0, 'trap_exception_sensitivity': 0}, 'basis': 'Applies five-checkpoint energy ledger to an ideal pendulum; no computation.'}",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-OSC-2A-EQUIL-01",
    "packageId": "LIB-PHY-OSC-SHM-WAVES-AUTHORED",
    "subject": "PHYSICS",
    "domain": "Oscillations & Waves",
    "stem": "Three motions are described: (P) A mass on a spring bouncing vertically. (Q) A planet orbiting a star in a circular path. (R) A ball in a bowl tilted so the surface curves upward on one side and downward on the other. Apply the two-sided stable-equilibrium test to each. Classify P, Q, R as oscillatory (organized around a stable equilibrium) or not.",
    "options": [],
    "hints": [
      "For each case, propose one position as the candidate equilibrium and test what happens on both sides.",
      "Reject any case where the tendency does not point inward from both displacement directions."
    ],
    "hintLadder": [
      "Step 1: ORIENT",
      "Step 2: REPRESENT"
    ],
    "failureSignal": "If you classified Q (circular orbit) as oscillatory, check whether the orbital path has one equilibrium position that produces an inward return tendency from both displacement directions.",
    "difficulty": "{'band': 'D2', 'score': 3, 'components': {'concept_model_selection': 1, 'representation_translation': 0, 'reasoning_chain_length': 1, 'algebra_computational_load': 0, 'trap_exception_sensitivity': 1}, 'basis': 'Multi-case stable-equilibrium classification requiring explicit two-sided test with one non-obvious rejection (circular orbit).'}",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-OSC-2B-ENERGY-01",
    "packageId": "LIB-PHY-OSC-SHM-WAVES-AUTHORED",
    "subject": "PHYSICS",
    "domain": "Oscillations & Waves",
    "stem": "An ideal pendulum is released from 5 cm to the right of equilibrium. A thin layer of air resistance then slows it gradually. (a) For the first complete swing (before significant energy loss), fill in a five-checkpoint energy table as in the ideal case. (b) After many swings, the amplitude has halved to 2.5 cm. State whether the energy state at the (new, smaller) turning points is the same HIGH/LOW classification as before. Explain why the total mechanical energy must have decreased. (c) A student says \"The total energy can never change in a pendulum.\" Identify the specific assumption that makes this claim false here.",
    "options": [],
    "hints": [
      "Part (a) uses the ideal model: apply the five-checkpoint table as practised.",
      "For part (b): smaller turning-point displacement means less stored PE; total mechanical energy can only stay constant with no losses."
    ],
    "hintLadder": [
      "Step 1: ORIENT",
      "Step 2: REPRESENT"
    ],
    "failureSignal": "If you said the total energy stays the same despite air resistance, you are applying the ideal-oscillator assumption to a non-ideal case. The boundary test in the Core1A material explicitly states that constant-total does not hold when a dissipative interaction is present.",
    "difficulty": "{'band': 'D3', 'score': 6, 'components': {'concept_model_selection': 2, 'representation_translation': 1, 'reasoning_chain_length': 1, 'algebra_computational_load': 0, 'trap_exception_sensitivity': 2}, 'basis': 'Ideal-to-non-ideal boundary: applies ideal model for one swing, diagnoses assumption failure over many swings, identifies violated model condition.'}",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-PHY-MACHINE-2A-01",
    "packageId": "LIB-PHY-SIMPLE-MACHINES-G9",
    "subject": "PHYSICS",
    "domain": "Dynamics & Mechanics",
    "stem": "A simple machine supports a 150 N load with a 50 N effort. Find the mechanical advantage and state what that number does not tell you.",
    "options": [],
    "hints": [
      "Put the load force in the numerator and effort force in the denominator."
    ],
    "hintLadder": [
      "Step 1: FIRST_RELATION"
    ],
    "failureSignal": "Check dimensional consistency and boundary behavior.",
    "difficulty": "{'band': 'D2', 'score': 3, 'components': {'concept_model_selection': 1, 'representation_translation': 0, 'reasoning_chain_length': 1, 'algebra_computational_load': 0, 'trap_exception_sensitivity': 1}, 'basis': 'Calculates actual mechanical advantage (Load / Effort) and explains why it does not reveal velocity ratio or frictional energy efficiency.'}",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-PHY-MACHINE-PRACTICAL-11",
    "packageId": "LIB-PHY-SIMPLE-MACHINES-G9",
    "subject": "PHYSICS",
    "domain": "Dynamics & Mechanics",
    "stem": "Plan a lever experiment to calculate mechanical advantage. State how you measure load and effort for one balanced/steady lever setting, how you calculate M.A., and one control needed for a fair comparison across settings.",
    "options": [],
    "hints": [
      "Load and effort must be measured for the same lever setting before forming the ratio.",
      "For a fair comparison, keep the load fixed while changing only the intended setup feature."
    ],
    "hintLadder": [
      "Step 1: ORIENT",
      "Step 2: FIRST_RELATION"
    ],
    "failureSignal": "Check dimensional consistency and boundary behavior.",
    "difficulty": "{'band': 'D3', 'score': 6, 'components': {'concept_model_selection': 2, 'representation_translation': 1, 'reasoning_chain_length': 2, 'algebra_computational_load': 0, 'trap_exception_sensitivity': 1}, 'basis': 'Experimental design to measure equilibrium forces on a balanced lever, compute mechanical advantage, and maintain fulcrum position control.'}",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-PHY-SOUND-2A-01",
    "packageId": "LIB-PHY-SOUND-G9",
    "subject": "PHYSICS",
    "domain": "Oscillations & Waves",
    "stem": "A spatial sound graph has adjacent positive peaks 1.7 m apart, and a time trace of the same wave at one location has adjacent positive peaks 0.005 s apart. The vertical amplitude is 1 cm. Identify wavelength, period and amplitude, then find frequency and wave speed.",
    "options": [],
    "hints": [
      "First identify which horizontal axis is position and which is time.",
      "Read lambda from spatial repeat distance and T from temporal repeat time; then use f=1/T and v=f lambda."
    ],
    "hintLadder": [
      "Step 1: ORIENT",
      "Step 2: FIRST_RELATION"
    ],
    "failureSignal": "Check dimensional consistency and boundary behavior.",
    "difficulty": "{'band': 'D2', 'score': 5, 'components': {'concept_model_selection': 1, 'representation_translation': 2, 'reasoning_chain_length': 1, 'algebra_computational_load': 1, 'trap_exception_sensitivity': 0}, 'basis': 'Extracts wavelength and period from spatial versus temporal wave profiles, and calculates frequency (1/T) and propagation speed (lambda*f).'}",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-PHY-SOUND-2A-COV-02",
    "packageId": "LIB-PHY-SOUND-G9",
    "subject": "PHYSICS",
    "domain": "Oscillations & Waves",
    "stem": "A bell rings inside a sealed chamber. Compare what happens to ordinary sound transmission as the air is gradually removed, while the bell itself can still vibrate.",
    "options": [],
    "hints": [
      "Start by asking: What object is vibrating?",
      "Track one small region of air: particles oscillate locally while the disturbance passes from neighbor to neighbor."
    ],
    "hintLadder": [
      "Step 1: ORIENT",
      "Step 2: FIRST_RELATION"
    ],
    "failureSignal": "Check dimensional consistency and boundary behavior.",
    "difficulty": "{'band': 'D1', 'score': 2, 'components': {'concept_model_selection': 1, 'representation_translation': 0, 'reasoning_chain_length': 1, 'algebra_computational_load': 0, 'trap_exception_sensitivity': 0}, 'basis': 'Applies the mechanical wave principle that sound requires a material medium to propagate, describing attenuation during evacuation.'}",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-PHY-SOUND-2A-COV-03",
    "packageId": "LIB-PHY-SOUND-G9",
    "subject": "PHYSICS",
    "domain": "Oscillations & Waves",
    "stem": "A compression in a sound wave travels to the right through air. Describe the motion of one marked air particle as the compression passes.",
    "options": [],
    "hints": [
      "Start by asking: What direction does the wave travel?",
      "Track the marked particle: it oscillates around its local equilibrium while successive compressions/rarefactions travel onward."
    ],
    "hintLadder": [
      "Step 1: ORIENT",
      "Step 2: FIRST_RELATION"
    ],
    "failureSignal": "Check dimensional consistency and boundary behavior.",
    "difficulty": "{'band': 'D2', 'score': 4, 'components': {'concept_model_selection': 1, 'representation_translation': 1, 'reasoning_chain_length': 1, 'algebra_computational_load': 0, 'trap_exception_sensitivity': 1}, 'basis': 'Distinguishes particle longitudinal oscillation about an equilibrium position from the rightward propagation of the compression pattern.'}",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-PHY-SOUND-2A-COV-04",
    "packageId": "LIB-PHY-SOUND-G9",
    "subject": "PHYSICS",
    "domain": "Oscillations & Waves",
    "stem": "Classify 10 Hz, 1,000 Hz and 25,000 Hz relative to the approximate usual human audible range, then state which physical quantity mainly tracks pitch for an audible tone.",
    "options": [],
    "hints": [
      "Treat 20 Hz and 20,000 Hz as approximate usual lower and upper bounds, not personal diagnostic thresholds.",
      "Pitch follows frequency for an audible tone; loudness is a separate sound-strength perception."
    ],
    "hintLadder": [
      "Step 1: ORIENT",
      "Step 2: FIRST_RELATION"
    ],
    "failureSignal": "Check dimensional consistency and boundary behavior.",
    "difficulty": "{'band': 'D1', 'score': 2, 'components': {'concept_model_selection': 1, 'representation_translation': 0, 'reasoning_chain_length': 1, 'algebra_computational_load': 0, 'trap_exception_sensitivity': 0}, 'basis': 'Classifies frequencies into infrasound, audible, and ultrasound based on the 20 Hz - 20 kHz threshold, identifying frequency with pitch.'}",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-PHY-SOUND-PRACTICAL-10",
    "packageId": "LIB-PHY-SOUND-G9",
    "subject": "PHYSICS",
    "domain": "Oscillations & Waves",
    "stem": "Design an experiment to determine the speed of one pulse along a stretched string or slinky. State the measured path length and time, the speed calculation, and how you would reduce timing error.",
    "options": [],
    "hints": [
      "The distance and time must describe the same pulse path.",
      "Repeat trials under the same tension, or time a longer path, to reduce the fraction of the result dominated by reaction time."
    ],
    "hintLadder": [
      "Step 1: ORIENT",
      "Step 2: FIRST_RELATION"
    ],
    "failureSignal": "Check dimensional consistency and boundary behavior.",
    "difficulty": "{'band': 'D3', 'score': 6, 'components': {'concept_model_selection': 2, 'representation_translation': 1, 'reasoning_chain_length': 2, 'algebra_computational_load': 0, 'trap_exception_sensitivity': 1}, 'basis': 'Experimental design for wave pulse velocity measurement including distance marking, timing controls, and error minimization via repeated reflections.'}",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-PHY-VECOPS-2A-01",
    "packageId": "LIB-PHY-VEC-ADD-SUB-AUTHORED",
    "subject": "PHYSICS",
    "domain": "Vector Mathematics",
    "stem": "Two labelled arrows A and B are shown, and a completed construction for A minus B points southeast. Without recalculating its length, describe the direction of B minus A and explain the check you used.",
    "options": [],
    "hints": [
      "Start by asking yourself: Which of the two original arrows is second in A minus B, and what does the construction do to that second arrow?",
      "Keep the same two inputs, swap only their order, and compare the two completed arrows from one start; the second points opposite the first."
    ],
    "hintLadder": [
      "Step 1: ORIENT",
      "Step 2: FIRST_RELATION"
    ],
    "failureSignal": "Check dimensional consistency and boundary behavior.",
    "difficulty": "{'band': 'D2', 'score': 3, 'components': {'concept_model_selection': 1, 'representation_translation': 1, 'reasoning_chain_length': 1, 'algebra_computational_load': 0, 'trap_exception_sensitivity': 0}, 'basis': 'Applies anti-commutativity of vector subtraction (B - A = -(A - B)) to reverse direction without recalculation.'}",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-PHY-VEC-DECOMP-2A-FROM-X-01",
    "packageId": "LIB-PHY-VEC-ADD-SUB-AUTHORED",
    "subject": "PHYSICS",
    "domain": "Vector Mathematics",
    "stem": "A vector has magnitude 20 and points 30 degrees above +x. Resolve it into signed x and y components.",
    "options": [],
    "hints": [
      "Which component is adjacent to the stated 30\u00b0 angle?",
      "Use cosine for the adjacent magnitude, sine for the opposite magnitude, then apply the quadrant signs."
    ],
    "hintLadder": [
      "Step 1: ORIENT",
      "Step 2: FIRST_RELATION"
    ],
    "failureSignal": "Check dimensional consistency and boundary behavior.",
    "difficulty": "{'band': 'D1', 'score': 2, 'components': {'concept_model_selection': 1, 'representation_translation': 1, 'reasoning_chain_length': 0, 'algebra_computational_load': 0, 'trap_exception_sensitivity': 0}, 'basis': 'Direct first-quadrant Cartesian decomposition using cosine for adjacent x and sine for opposite y.'}",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-PHY-VEC-DECOMP-2A-FROM-Y-02",
    "packageId": "LIB-PHY-VEC-ADD-SUB-AUTHORED",
    "subject": "PHYSICS",
    "domain": "Vector Mathematics",
    "stem": "A vector of magnitude 12 points 30 degrees to the right of +y. Resolve it into signed x and y components.",
    "options": [],
    "hints": [
      "The angle is measured from which axis?",
      "Assign cosine to the component adjacent to +y and sine to the opposite component."
    ],
    "hintLadder": [
      "Step 1: ORIENT",
      "Step 2: FIRST_RELATION"
    ],
    "failureSignal": "Check dimensional consistency and boundary behavior.",
    "difficulty": "{'band': 'D2', 'score': 4, 'components': {'concept_model_selection': 1, 'representation_translation': 1, 'reasoning_chain_length': 1, 'algebra_computational_load': 0, 'trap_exception_sensitivity': 1}, 'basis': 'Resolves vector components when angle is referenced from the vertical +y axis, avoiding rote cosine-with-x assignment.'}",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-PHY-VEC-DECOMP-2A-QUADRANT-II-03",
    "packageId": "LIB-PHY-VEC-ADD-SUB-AUTHORED",
    "subject": "PHYSICS",
    "domain": "Vector Mathematics",
    "stem": "A vector of magnitude 15 points 40 degrees above the -x direction. With +x right and +y up, resolve the vector into signed components.",
    "options": [],
    "hints": [
      "Before applying signs, which component magnitude is adjacent to the 40\u00b0 angle?",
      "After projecting magnitudes, use left/right and up/down relative to the declared axes for the signs."
    ],
    "hintLadder": [
      "Step 1: ORIENT",
      "Step 2: FIRST_RELATION"
    ],
    "failureSignal": "Check dimensional consistency and boundary behavior.",
    "difficulty": "{'band': 'D2', 'score': 4, 'components': {'concept_model_selection': 1, 'representation_translation': 1, 'reasoning_chain_length': 1, 'algebra_computational_load': 0, 'trap_exception_sensitivity': 1}, 'basis': 'Decomposes second-quadrant vector, requiring explicit negative sign assignment for the x-component.'}",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-PHY-VEC-DECOMP-2A-QUADRANT-IV-04",
    "packageId": "LIB-PHY-VEC-ADD-SUB-AUTHORED",
    "subject": "PHYSICS",
    "domain": "Vector Mathematics",
    "stem": "A vector of magnitude 18 points 25 degrees below +x. Resolve it into signed components.",
    "options": [],
    "hints": [
      "Which signs follow from 'below +x'?",
      "Project the magnitudes first, then attach + to x and - to y."
    ],
    "hintLadder": [
      "Step 1: ORIENT",
      "Step 2: FIRST_RELATION"
    ],
    "failureSignal": "Check dimensional consistency and boundary behavior.",
    "difficulty": "{'band': 'D2', 'score': 4, 'components': {'concept_model_selection': 1, 'representation_translation': 1, 'reasoning_chain_length': 1, 'algebra_computational_load': 0, 'trap_exception_sensitivity': 1}, 'basis': 'Decomposes fourth-quadrant vector, assigning positive x-component and negative y-component.'}",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-PHY-VEC-DECOMP-2A-INITIAL-STATE-05",
    "packageId": "LIB-PHY-VEC-ADD-SUB-AUTHORED",
    "subject": "PHYSICS",
    "domain": "Vector Mathematics",
    "stem": "A particle is launched with initial speed u at an angle theta above +x. Write only the signed initial velocity components needed by a later Motion-in-2D calculation, and state what this decomposition has not yet determined.",
    "options": [],
    "hints": [
      "What symbol should distinguish an initial velocity component from a later velocity component?",
      "Resolve the launch vector into u_x and u_y; stop before applying any time-evolution equation."
    ],
    "hintLadder": [
      "Step 1: ORIENT",
      "Step 2: FIRST_RELATION"
    ],
    "failureSignal": "Check dimensional consistency and boundary behavior.",
    "difficulty": "{'band': 'D2', 'score': 3, 'components': {'concept_model_selection': 1, 'representation_translation': 1, 'reasoning_chain_length': 1, 'algebra_computational_load': 0, 'trap_exception_sensitivity': 0}, 'basis': 'Symbolic decomposition of initial velocity into u*cos(theta) and u*sin(theta) for kinematic handoff.'}",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-PHY-VEC-DECOMP-2B-VERBAL-NW-01",
    "packageId": "LIB-PHY-VEC-ADD-SUB-AUTHORED",
    "subject": "PHYSICS",
    "domain": "Vector Mathematics",
    "stem": "A velocity vector has magnitude V and points northwest, 35 degrees west of north. Choose +x east and +y north, then write its signed components.",
    "options": [],
    "hints": [
      "Translate 'west of north' into an angle measured from which positive axis?"
    ],
    "hintLadder": [
      "Step 1: ORIENT"
    ],
    "failureSignal": "Check dimensional consistency and boundary behavior.",
    "difficulty": "{'band': 'D2', 'score': 5, 'components': {'concept_model_selection': 1, 'representation_translation': 2, 'reasoning_chain_length': 1, 'algebra_computational_load': 0, 'trap_exception_sensitivity': 1}, 'basis': 'Translates compass bearing (35 degrees west of north) into signed Cartesian components with -x and +y.'}",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-PHY-VEC-DECOMP-2B-ALREADY-COMPONENTS-02",
    "packageId": "LIB-PHY-VEC-ADD-SUB-AUTHORED",
    "subject": "PHYSICS",
    "domain": "Vector Mathematics",
    "stem": "A velocity is already given as v=(-6 i + 8 j) m/s. Before a later calculation, decide whether magnitude-angle trigonometric decomposition is required. Give one check on the supplied component representation.",
    "options": [],
    "hints": [
      "What representation is the vector already in, and what conversion would decomposition normally perform?"
    ],
    "hintLadder": [
      "Step 1: ORIENT"
    ],
    "failureSignal": "Check dimensional consistency and boundary behavior.",
    "difficulty": "{'band': 'D2', 'score': 3, 'components': {'concept_model_selection': 1, 'representation_translation': 1, 'reasoning_chain_length': 0, 'algebra_computational_load': 0, 'trap_exception_sensitivity': 1}, 'basis': 'Recognizes when a vector is already expressed in Cartesian components, avoiding redundant trigonometric decomposition.'}",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-PHY-VEC-DECOMP-2B-COMPLEMENTARY-ANGLES-03",
    "packageId": "LIB-PHY-VEC-ADD-SUB-AUTHORED",
    "subject": "PHYSICS",
    "domain": "Vector Mathematics",
    "stem": "The same first-quadrant vector of magnitude V is described once as 30 degrees above +x and once as 60 degrees to the right of +y. Show, without decimals, that both descriptions produce the same x and y components.",
    "options": [],
    "hints": [
      "Do the physical vector and axes change when the reference angle is described from the other perpendicular axis?",
      "Write both component pairs before using complementary-angle identities."
    ],
    "hintLadder": [
      "Step 1: ORIENT",
      "Step 2: FIRST_RELATION"
    ],
    "failureSignal": "Check dimensional consistency and boundary behavior.",
    "difficulty": "{'band': 'D2', 'score': 4, 'components': {'concept_model_selection': 1, 'representation_translation': 1, 'reasoning_chain_length': 1, 'algebra_computational_load': 1, 'trap_exception_sensitivity': 0}, 'basis': 'Uses complementary angle trigonometric identities (sin 30 = cos 60, cos 30 = sin 60) to show coordinate representation equivalence.'}",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-PHY-VEC-DECOMP-2B-FORCE-CONTEXT-04",
    "packageId": "LIB-PHY-VEC-ADD-SUB-AUTHORED",
    "subject": "PHYSICS",
    "domain": "Vector Mathematics",
    "stem": "A force of magnitude 50 N acts 37 degrees below +x. Resolve the force into signed Cartesian components. Do not use any motion equations.",
    "options": [],
    "hints": [
      "Which part of the task depends on this being a force rather than a velocity?",
      "Use the same projection geometry, preserve N as the component unit, and do not introduce kinematics."
    ],
    "hintLadder": [
      "Step 1: ORIENT",
      "Step 2: FIRST_RELATION"
    ],
    "failureSignal": "Check dimensional consistency and boundary behavior.",
    "difficulty": "{'band': 'D2', 'score': 4, 'components': {'concept_model_selection': 1, 'representation_translation': 1, 'reasoning_chain_length': 1, 'algebra_computational_load': 1, 'trap_exception_sensitivity': 0}, 'basis': 'Decomposes a force vector in a non-kinematic context into signed Cartesian components using 37-degree standard geometry.'}",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-PHY-VEC-DECOMP-2B-REVERSED-X-AXIS-05",
    "packageId": "LIB-PHY-VEC-ADD-SUB-AUTHORED",
    "subject": "PHYSICS",
    "domain": "Vector Mathematics",
    "stem": "A physical velocity of magnitude u points 20 degrees above east. A solver deliberately declares +x west and +y north. Resolve the velocity into signed components in that declared frame.",
    "options": [],
    "hints": [
      "Does choosing +x west change the physical vector, or only how its horizontal component is signed?"
    ],
    "hintLadder": [
      "Step 1: ORIENT"
    ],
    "failureSignal": "Check dimensional consistency and boundary behavior.",
    "difficulty": "{'band': 'D3', 'score': 6, 'components': {'concept_model_selection': 2, 'representation_translation': 2, 'reasoning_chain_length': 1, 'algebra_computational_load': 0, 'trap_exception_sensitivity': 1}, 'basis': 'Performs vector decomposition under an unconventional reversed frame orientation (+x west), mapping eastward physical direction to negative x.'}",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-VDU-1A-NOTATION-01",
    "packageId": "LIB-PHY-VEC-DIRECTION-UNIT-AUTHORED",
    "subject": "PHYSICS",
    "domain": "Vector Mathematics",
    "stem": "With +x declared to the right and +y declared upward, a vector has components v_x = 3 and v_y = \u22124. Write the vector in i-hat/j-hat notation. Then recover the component pair from that notation.",
    "options": [],
    "hints": [
      "Recall defining conservation relations and frame definitions."
    ],
    "hintLadder": [
      "1. Draw a schematic coordinate frame.",
      "2. State explicit balance equations."
    ],
    "failureSignal": "If your answer wrote a positive coefficient for j-hat despite v_y = \u22124, check the sign: j-hat names +y, so a component pointing against +y needs a negative coefficient.",
    "difficulty": "{'band': 'D1', 'score': 2, 'components': {'concept_model_selection': 0, 'representation_translation': 1, 'reasoning_chain_length': 1, 'algebra_computational_load': 0, 'trap_exception_sensitivity': 0}, 'basis': 'Notation translation with a negative y-component; requires preserving the negative coefficient of j-hat.'}",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-VDU-1A-DIRECTION-01",
    "packageId": "LIB-PHY-VEC-DIRECTION-UNIT-AUTHORED",
    "subject": "PHYSICS",
    "domain": "Vector Mathematics",
    "stem": "A vector has components v_x = \u22123 and v_y = 4 with +x to the right and +y upward. (a) State the quadrant the vector lies in from the component signs alone. (b) Write the acute reference-angle expression using positive component magnitudes. (c) State the directed angle from +x (standard 0\u00b0\u2013360\u00b0 convention).",
    "options": [],
    "hints": [
      "Recall defining conservation relations and frame definitions."
    ],
    "hintLadder": [
      "1. Draw a schematic coordinate frame.",
      "2. State explicit balance equations."
    ],
    "failureSignal": "If your directed angle is in quadrant I or III, recheck the component signs: v_x < 0 and v_y > 0 place the vector strictly in quadrant II.",
    "difficulty": "{'band': 'D2', 'score': 3, 'components': {'concept_model_selection': 1, 'representation_translation': 1, 'reasoning_chain_length': 1, 'algebra_computational_load': 0, 'trap_exception_sensitivity': 0}, 'basis': 'Two-stage direction recovery: quadrant from signs then acute reference angle placed in quadrant II.'}",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-VDU-1A-UNIT-01",
    "packageId": "LIB-PHY-VEC-DIRECTION-UNIT-AUTHORED",
    "subject": "PHYSICS",
    "domain": "Vector Mathematics",
    "stem": "A vector has components v_x = 3 and v_y = 4. (a) Compute its magnitude. (b) Write the unit-direction vector in component and i-hat/j-hat form. (c) Verify that the result has magnitude 1.",
    "options": [],
    "hints": [
      "Recall defining conservation relations and frame definitions."
    ],
    "hintLadder": [
      "1. Draw a schematic coordinate frame.",
      "2. State explicit balance equations."
    ],
    "failureSignal": "If your unit vector has components (3, 4) without division, you did not divide by the magnitude. Divide every signed component by 5.",
    "difficulty": "{'band': 'D2', 'score': 3, 'components': {'concept_model_selection': 1, 'representation_translation': 1, 'reasoning_chain_length': 1, 'algebra_computational_load': 0, 'trap_exception_sensitivity': 0}, 'basis': '3-4-5 normalization; requires magnitude-first, divide-both-components, verify-unit-magnitude sequence.'}",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-VDU-2A-NOTATION-01",
    "packageId": "LIB-PHY-VEC-DIRECTION-UNIT-AUTHORED",
    "subject": "PHYSICS",
    "domain": "Vector Mathematics",
    "stem": "A velocity vector is written as v = \u22125 i-hat + 0 j-hat m/s with +x to the right. (a) State the signed x- and y-components. (b) Describe the direction of the velocity in words. (c) Can this vector be normalized? If so, write the unit-direction vector.",
    "options": [],
    "hints": [
      "The y-component is 0: the vector lies exactly on an axis. What axis, and in which direction?",
      "Magnitude = sqrt(v_x\u00b2 + v_y\u00b2). Then divide both components by the same magnitude."
    ],
    "hintLadder": [
      "Step 1: ORIENT",
      "Step 2: REPRESENT"
    ],
    "failureSignal": "If your unit-direction answer was +i-hat instead of \u2212i-hat, check the sign: the x-component is \u22125, so dividing by magnitude 5 gives \u22121, not +1.",
    "difficulty": "{'band': 'D2', 'score': 3, 'components': {'concept_model_selection': 1, 'representation_translation': 1, 'reasoning_chain_length': 1, 'algebra_computational_load': 0, 'trap_exception_sensitivity': 0}, 'basis': 'Axis-aligned vector with a zero component and a negative non-zero component; normalization gives \u2212i-hat as a result that is easy to sign-flip incorrectly.'}",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-VDU-2B-DIRECTION-01",
    "packageId": "LIB-PHY-VEC-DIRECTION-UNIT-AUTHORED",
    "subject": "PHYSICS",
    "domain": "Vector Mathematics",
    "stem": "A velocity vector is given as v = \u22123 i-hat \u2212 3 j-hat m/s with +x to the right and +y upward. (a) State the quadrant and identify any symmetry between the component magnitudes. (b) Write the unit-direction vector for v. (c) Determine the acute reference angle and hence the directed angle from +x (0\u00b0\u2013360\u00b0 convention). (d) State whether the unit-direction vector you found and the directed angle describe the same direction. Justify.",
    "options": [],
    "hints": [
      "Both components are negative: identify the quadrant from signs before any calculation.",
      "Because |v_x| = |v_y|, the reference angle is arctan(1) = 45\u00b0. Which quadrant offset applies?"
    ],
    "hintLadder": [
      "Step 1: ORIENT",
      "Step 2: FIRST_RELATION"
    ],
    "failureSignal": "If your directed angle is 45\u00b0 (quadrant I result), you applied the reference angle without the quadrant offset. Both components are negative, placing the vector in quadrant III; the standard 0\u00b0\u2013360\u00b0 angle is 180\u00b0 + 45\u00b0 = 225\u00b0.",
    "difficulty": "{'band': 'D3', 'score': 6, 'components': {'concept_model_selection': 2, 'representation_translation': 2, 'reasoning_chain_length': 1, 'algebra_computational_load': 1, 'trap_exception_sensitivity': 0}, 'basis': 'Quadrant III with equal-magnitude components; requires normalization + direction recovery + representation reconciliation.'}",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-PHY-WEP-2A-01",
    "packageId": "LIB-PHY-WORK-ENERGY-POWER-AUTHORED",
    "subject": "PHYSICS",
    "domain": "Work, Energy & Power",
    "stem": "Three forces act separately during the same rightward displacement: one rightward, one upward, and one leftward. Classify the work sign in each case without calculating a magnitude.",
    "options": [],
    "hints": [
      "Start by asking yourself: Which way does the object actually move during the interval?",
      "Compare the force direction with the actual displacement direction; only the along-path contribution can produce work."
    ],
    "hintLadder": [
      "Step 1: ORIENT",
      "Step 2: FIRST_RELATION"
    ],
    "failureSignal": "Check dimensional consistency and boundary behavior.",
    "difficulty": "{'band': 'D1', 'score': 2, 'components': {'concept_model_selection': 1, 'representation_translation': 1, 'reasoning_chain_length': 0, 'algebra_computational_load': 0, 'trap_exception_sensitivity': 0}, 'basis': 'Classifies sign of work done based on angle between force and displacement vectors (0, 90, 180 degrees).'}",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-PHY-WEP-2A-COV-02",
    "packageId": "LIB-PHY-WORK-ENERGY-POWER-AUTHORED",
    "subject": "PHYSICS",
    "domain": "Work, Energy & Power",
    "stem": "For three otherwise comparable motions, the net work is described as positive, zero, and negative. State the corresponding direction of kinetic-energy change without calculating any energy value.",
    "options": [],
    "hints": [
      "Start by asking: During braking, is the force contribution along the motion or opposite it?",
      "Combine the work of all acting forces to obtain net work, then match its sign to whether kinetic energy increases, stays unchanged, or decreases."
    ],
    "hintLadder": [
      "Step 1: ORIENT",
      "Step 2: FIRST_RELATION"
    ],
    "failureSignal": "Check dimensional consistency and boundary behavior.",
    "difficulty": "{'band': 'D1', 'score': 1, 'components': {'concept_model_selection': 1, 'representation_translation': 0, 'reasoning_chain_length': 0, 'algebra_computational_load': 0, 'trap_exception_sensitivity': 0}, 'basis': 'Direct application of work-energy theorem W_net = delta_K to identify speeding up, steady speed, or slowing down.'}",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-PHY-WEP-2A-COV-03",
    "packageId": "LIB-PHY-WORK-ENERGY-POWER-AUTHORED",
    "subject": "PHYSICS",
    "domain": "Work, Energy & Power",
    "stem": "Two routes share the same start and finish heights. Gravity gives the same potential-energy change on both, while friction removes more energy on the longer route. Which interaction is eligible for endpoint-only potential-energy bookkeeping?",
    "options": [],
    "hints": [
      "Start by asking: If the start and finish heights are unchanged, what happens to the gravitational potential-energy change when the route bends?",
      "Use potential energy only for interactions whose energy change is fixed by endpoints; keep path-dependent friction as an explicit transfer."
    ],
    "hintLadder": [
      "Step 1: ORIENT",
      "Step 2: FIRST_RELATION"
    ],
    "failureSignal": "Check dimensional consistency and boundary behavior.",
    "difficulty": "{'band': 'D2', 'score': 3, 'components': {'concept_model_selection': 1, 'representation_translation': 0, 'reasoning_chain_length': 1, 'algebra_computational_load': 0, 'trap_exception_sensitivity': 1}, 'basis': 'Distinguishes conservative interactions (path-independent potential energy) from non-conservative dissipative path-dependent interactions.'}",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-PHY-WEP-2A-COV-04",
    "packageId": "LIB-PHY-WORK-ENERGY-POWER-AUTHORED",
    "subject": "PHYSICS",
    "domain": "Work, Energy & Power",
    "stem": "A machine transfers 120 J of work in 4 s. Find its average power. Then state whether that average alone is enough to know the instantaneous power halfway through the interval.",
    "options": [],
    "hints": [
      "Start by asking: What total energy transfer is fixed over the whole interval?",
      "Keep work fixed and divide by each machine's own elapsed time; power is a rate, not the transfer total."
    ],
    "hintLadder": [
      "Step 1: ORIENT",
      "Step 2: FIRST_RELATION"
    ],
    "failureSignal": "Check dimensional consistency and boundary behavior.",
    "difficulty": "{'band': 'D2', 'score': 3, 'components': {'concept_model_selection': 1, 'representation_translation': 0, 'reasoning_chain_length': 1, 'algebra_computational_load': 0, 'trap_exception_sensitivity': 1}, 'basis': 'Computes average power P = W/t and explains the distinction between interval-average and instantaneous rate of work.'}",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-PHY-WEP-2A-COV-05",
    "packageId": "LIB-PHY-WORK-ENERGY-POWER-AUTHORED",
    "subject": "PHYSICS",
    "domain": "Work, Energy & Power",
    "stem": "A 2 kg object moves at 3 m/s. Find its translational kinetic energy. Then state what additional condition is required before using K_i + U_i = K_f + U_f for a later motion.",
    "options": [],
    "hints": [
      "Start by asking: Which energy depends on motion in the declared frame?",
      "Inventory transfers first. Friction can move energy out of the mechanical account, so identical endpoints do not guarantee the same K + U ledger."
    ],
    "hintLadder": [
      "Step 1: ORIENT",
      "Step 2: FIRST_RELATION"
    ],
    "failureSignal": "Check dimensional consistency and boundary behavior.",
    "difficulty": "{'band': 'D2', 'score': 3, 'components': {'concept_model_selection': 1, 'representation_translation': 0, 'reasoning_chain_length': 1, 'algebra_computational_load': 0, 'trap_exception_sensitivity': 1}, 'basis': 'Calculates 0.5*m*v^2 and states the zero non-conservative work requirement for mechanical energy conservation.'}",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-PHY-WEP-2A-DERIV-01",
    "packageId": "LIB-PHY-WORK-ENERGY-POWER-AUTHORED",
    "subject": "PHYSICS",
    "domain": "Work, Energy & Power",
    "stem": "Do not quote the final formula. Starting from constant-force work, Newton's second law and the constant-acceleration relation v^2-u^2=2as, derive the kinetic-energy expression for motion from rest. Then show why slowly raising the same mass through height h near Earth's surface gives a gravitational potential-energy increase mgh.",
    "options": [],
    "hints": [
      "For kinetic energy, first write work as net force times displacement and replace net force with m a.",
      "Then use the no-time constant-acceleration relation to replace the product a s.",
      "For potential energy, make the lift slow enough that the applied force balances weight."
    ],
    "hintLadder": [
      "Step 1: ORIENT",
      "Step 2: FIRST_RELATION",
      "Step 3: FIRST_RELATION"
    ],
    "failureSignal": "Check dimensional consistency and boundary behavior.",
    "difficulty": "{'band': 'D3', 'score': 6, 'components': {'concept_model_selection': 1, 'representation_translation': 1, 'reasoning_chain_length': 2, 'algebra_computational_load': 1, 'trap_exception_sensitivity': 1}, 'basis': 'Derives kinetic energy formula from work and kinematic relations, and derives potential energy increase from quasi-static lifting work.'}",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-PHY-WEP-PRACTICAL-09",
    "packageId": "LIB-PHY-WORK-ENERGY-POWER-AUTHORED",
    "subject": "PHYSICS",
    "domain": "Work, Energy & Power",
    "stem": "Design a simple-pendulum investigation of mechanical-energy conservation. State what quantities you would compare between release and the lowest point, what ideal relation you expect, and how real losses would appear in the data.",
    "options": [],
    "hints": [
      "Choose the bottom as a convenient height reference and compare release energy with energy at the lowest point.",
      "The ideal equality is m g Delta h = 0.5 m v^2; real data should be compared with it, not forced to match it."
    ],
    "hintLadder": [
      "Step 1: ORIENT",
      "Step 2: FIRST_RELATION"
    ],
    "failureSignal": "Check dimensional consistency and boundary behavior.",
    "difficulty": "{'band': 'D3', 'score': 6, 'components': {'concept_model_selection': 2, 'representation_translation': 1, 'reasoning_chain_length': 2, 'algebra_computational_load': 0, 'trap_exception_sensitivity': 1}, 'basis': 'Experimental design comparing gravitational potential energy at release to kinetic energy at equilibrium, accounting for air resistance.'}",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-AUTHOR-REL-01",
    "packageId": "LIB-PHY-RELATIVE-MOTION-SEED",
    "subject": "PHYSICS",
    "domain": "Kinematics & Motion",
    "stem": "In a common east/north frame, A moves at (6,0) m/s and B at (0,8) m/s. Find the velocity of A relative to B. State its direction and magnitude.",
    "options": [],
    "hints": [
      "Relative to B means measured from B. Which of the two velocities is the one being subtracted?",
      "Subtract axis by axis before doing anything with lengths, and keep both signs; the magnitude is something you compute from the answer, not the answer itself."
    ],
    "hintLadder": [
      "Step 1: ORIENT",
      "Step 2: FIRST_RELATION"
    ],
    "failureSignal": "Check dimensional consistency and boundary behavior.",
    "difficulty": "{'band': 'D2', 'score': 5, 'components': {'concept_model_selection': 1, 'representation_translation': 1, 'reasoning_chain_length': 1, 'algebra_computational_load': 1, 'trap_exception_sensitivity': 1}, 'basis': 'Applies relative velocity vector subtraction v_A/B = v_A - v_B = (6, -8) m/s, computing Pythagorean magnitude (10 m/s) and bearing.'}",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "Q-PHY-VECREP-2A-01",
    "packageId": "LIB-PHY-VECTOR-REPRESENTATION-SEED",
    "subject": "PHYSICS",
    "domain": "Vector Mathematics",
    "stem": "Two directed arrows have the same length but point in opposite directions. Can the shared magnitude alone make them the same vector? Explain what information signed components preserve that magnitude does not.",
    "options": [],
    "hints": [
      "Separate the question 'how large?' from the question 'which way?'",
      "Ask what happens to component signs when a vector is reversed."
    ],
    "hintLadder": [
      "Step 1: ORIENT",
      "Step 2: FIRST_RELATION"
    ],
    "failureSignal": "Check dimensional consistency and boundary behavior.",
    "difficulty": "{'band': 'D2', 'score': 3, 'components': {'concept_model_selection': 1, 'representation_translation': 1, 'reasoning_chain_length': 1, 'algebra_computational_load': 0, 'trap_exception_sensitivity': 0}, 'basis': 'Explains why vector equality requires both equal magnitude and identical direction, and how signed components encode directional orientation.'}",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  }
];
