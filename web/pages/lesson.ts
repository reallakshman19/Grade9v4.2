import {escapeHtml as e} from '../runtime/rendering.ts';
import {Core1ATeachingJourney,CORE1A_ORDERED_ROLES,ANCHOR_LEVELS,type Core1ALessonDefinition,type Core1ARole,type Core1ADraft,type AnchorLevel,type IntrinsicDepthBadge} from '../journeys/core1a.ts';
import {Core1AUnitViewController,Core1AAnchorViewController,Core1AModelStageController} from '../components/teaching/index.ts';
import { UNIFIED_QUESTION_DATABASE } from '../runtime/unified-question-database.ts';
import { recordActiveLearnerSession } from '../runtime/learner-activity.ts';
import { getDisciplinaryWarrant } from '../data/warrants-database.ts';

export type DisplayOrientation = 'LANDSCAPE' | 'PORTRAIT';
export type LessonScreenState = 'loading' | 'error' | 'populated' | 'no fresh task' | 'stale lesson' | 'missing unit' | 'invalid model domain' | 'no eligible fresh task';

export interface LessonPageConfig {
  readonly lessonDefinition?: Core1ALessonDefinition;
  readonly topicCode?: string;
  readonly orientation?: DisplayOrientation;
  readonly initialState?: LessonScreenState;
  readonly errorMessage?: string;
}

const ref = <T extends import('../runtime/types.ts').Ref['type']>(type: T, id: string): import('../runtime/types.ts').Ref<T> => ({
  type,
  id,
  revision: 1,
  sha256: 'a'.repeat(64)
});

function createGravitationLesson(): Core1ALessonDefinition {
  const roleTitles: Record<Core1ARole, { title: string; summary: string; bodyText: string }> = {
    A1: {
      title: 'Phenomenon: Central Inverse-Square Force & Planetary Orbits',
      summary: 'Why gravity acts along the line of centers with magnitude F = G M m / r².',
      bodyText: 'Gravitation is a universal mutual attraction between any two masses. The force acts along the line joining their centers of mass and falls off inversely with the square of the distance. Because it is a central force, the torque about the center of attraction is zero, which guarantees that angular momentum is strictly conserved and orbital motion is planar.'
    },
    A2: {
      title: 'Prerequisite Conventions: Spherical Coordinates & Infinity Reference',
      summary: 'Sign conventions, radial unit vectors, and zero potential reference at infinity.',
      bodyText: 'We use a radial coordinate r ≥ R measured from the center of the attracting body. The gravitational force vector is F = -G (M m / r²) r̂, where the negative sign denotes an attractive force pointing toward the origin. The standard reference state for gravitational potential energy is U(∞) = 0, which implies that potential energy is strictly negative for all finite separations: U(r) = -G M m / r.'
    },
    A3: {
      title: 'Representation Bridge: Field Lines to Gravitational Potential Well',
      summary: 'Connecting gravitational field intensity g(r) to potential gradient -dU/dr.',
      bodyText: 'The gravitational field g(r) = F/m is the gravitational force per unit mass. Field lines converge radially inward toward the mass center. The field intensity is the negative radial gradient of potential: g = -dV/dr. In an energy diagram, the potential well forms an attractive 1/r hyperbolic bowl, where bound states are trapped at negative total energy E < 0.'
    },
    A4: {
      title: 'Law & Conditions: Kepler\'s Three Laws & Centripetal Balance',
      summary: 'Derivation of orbital velocity v_o = √(GM/r) and harmonic law T² ∝ r³.',
      bodyText: 'For a circular orbit of radius r around mass M, gravity provides the necessary centripetal force: G M m / r² = m v² / r. Solving for orbital speed yields v_o = √(G M / r). The period of revolution is T = 2πr / v_o = 2π √(r³ / (G M)). Squaring both sides yields Kepler\'s Third Law: T² = (4π² / G M) r³, showing that period depends only on orbital semi-major axis and central mass.'
    },
    A5: {
      title: 'Scientific Simulation: Two-Body Energy States & Escape Trajectories',
      summary: 'Bound ellipses (E < 0), parabolic threshold (E = 0), and hyperbolic escape (E > 0).',
      bodyText: 'Total orbital energy is E = K + U = 0.5 m v² - G M m / r. For circular orbits, the Virial Theorem requires 2K + U = 0, so K = -0.5 U and total energy E = -0.5 G M m / r < 0. To escape to infinity with zero residual speed, total energy must reach E = 0: 0.5 m v_esc² - G M m / R = 0 => v_esc = √(2 G M / R) = √2 v_orbit.'
    },
    A6: {
      title: 'Reasoning Construction: Satellite Orbital Velocity & Period Worked Example',
      summary: 'Step-by-step calculation for an Earth satellite at 600 km altitude.',
      bodyText: 'Given Earth mass M = 5.972 × 10²⁴ kg and radius R = 6371 km. Orbital radius r = R + h = 6971 km. Orbital speed v_o = √(G M / r) = 7.56 km/s. Orbital period T = 2πr / v_o = 5790 s ≈ 96.5 minutes.'
    },
    A7: {
      title: 'Misconception Alert: Weightlessness vs Lack of Gravity',
      summary: 'Why astronauts float: free-fall in orbit, NOT absence of gravity.',
      bodyText: 'A common misconception is that gravity is zero in orbit. In fact, at 400 km altitude (ISS), gravity is still ~89% of its surface value (g ≈ 8.7 m/s²)! Astronauts float because both the spacecraft and their bodies are in continuous simultaneous free fall toward Earth, so the floor exerts zero normal contact force (N = 0).'
    },
    A8: {
      title: 'Boundary & Changed Demand: Escape Velocity vs Orbital Velocity',
      summary: 'Determining the kinetic threshold required to break gravitational binding.',
      bodyText: 'To leave Earth\'s gravitational well completely, kinetic energy must equal the depth of the potential well: 0.5 m v_e² = G M m / R => v_e = √(2 G M / R) = √2 v_orbit ≈ 11.2 km/s. If launch speed v < v_e, the trajectory remains a closed bound conic (ellipse); if v = v_e, it is a parabolic escape; if v > v_e, it is a hyperbolic trajectory with residual hyperbolic excess speed.'
    },
    A9: {
      title: 'Synthesis: Two-Body Gravitational Problem & Barycenter Orbit',
      summary: 'When both masses move around their common center of mass.',
      bodyText: 'When two celestial bodies of masses m₁ and m₂ interact gravitationally, both orbit their common center of mass (barycenter) with identical orbital period T. The system is equivalent to a single reduced mass μ = (m₁ m₂) / (m₁ + m₂) orbiting at separation r in a central field of total mass M = m₁ + m₂.'
    }
  };

  return {
    lessonRef: ref('LESSON', 'lesson:physics-gravitation'),
    constructionRef: ref('CONSTRUCTION', 'construction:physics-gravitation'),
    title: 'Gravitation & Orbital Mechanics: 5 Thinking Skills & Concept Construction',
    subject: 'PHYSICS',
    topicId: 'topic:gravitation',
    depthBadge: 'MEDIUM',
    status: 'HOLD',
    units: CORE1A_ORDERED_ROLES.map(role => ({
      role,
      title: roleTitles[role].title,
      summary: roleTitles[role].summary,
      bodyText: roleTitles[role].bodyText,
      blockRefs: [ref('SOURCE', 'source:' + role)],
      evidenceRefs: [ref('WARRANT', 'warrant:' + role)],
      conventions: role === 'A2' ? ['Radial coordinate r measured from center of mass', 'U(∞) = 0 reference datum at infinite separation', 'Gravitational force points strictly inward (-r̂)'] : undefined,
      representationBridge: role === 'A3' ? [
        { pictureElement: 'Converging radial field vectors g(r)', symbol: 'g(r)', inWords: 'Gravitational field intensity pointing toward mass center' },
        { pictureElement: 'Hyperbolic 1/r potential curve U(r)', symbol: 'U(r)', inWords: 'Negative gravitational potential well holding bound orbits' },
        { pictureElement: 'Tangential velocity vector v_t', symbol: 'v_o', inWords: 'Orbital velocity perpendicular to radial gravity vector' },
        { pictureElement: 'Inward centripetal acceleration vector', symbol: 'a_c', inWords: 'Produced purely by central gravitational attraction' }
      ] : undefined,
      derivationSteps: role === 'A4' ? [
        { stepNumber: 1, expression: 'F_g = G M m / r² = m (v²/r)', whyValid: 'Newton universal gravitation provides exact centripetal force for circular orbit' },
        { stepNumber: 2, expression: 'v_o = √(G M / r)', whyValid: 'Cancellation of satellite mass m and isolating tangential orbital speed' },
        { stepNumber: 3, expression: 'T = 2πr / v_o = 2π √(r³ / (G M)) => T² = (4π² / G M) r³', whyValid: 'Harmonic orbital relation deriving Kepler Third Law' }
      ] : undefined,
      boundaryConditions: role === 'A8' ? ['Total mechanical energy E < 0 for bound closed orbits', 'Parabolic escape velocity threshold E = 0', 'v_escape = √2 · v_orbit'] : undefined,
      selfCheckPrompt: role === 'A9' ? 'Self-Check: If Earth\'s mass were doubled while orbit radius remained fixed, by what factor would orbital speed change?' : undefined,
      ...(role === 'A6' ? {
        workedExample: {
          problemPrompt: 'A 500 kg weather satellite orbits Earth at altitude h = 600 km (R_E = 6400 km, M_E = 6.0 × 10²⁴ kg, G = 6.67 × 10⁻¹¹ N m²/kg²). Calculate orbital speed, orbital period, and total mechanical energy.',
          fullReasoningSteps: [
            '1. Orbital radius: r = R_E + h = 6400 km + 600 km = 7000 km = 7.0 × 10⁶ m.',
            '2. Orbital speed: v_o = √(G M / r) = √((6.67 × 10⁻¹¹ * 6.0 × 10²⁴) / (7.0 × 10⁶)) = √(5.717 × 10⁷) = 7561 m/s (7.56 km/s).',
            '3. Orbital period: T = 2πr / v_o = (2 * 3.1416 * 7.0 × 10⁶) / 7561 = 5817 s ≈ 96.9 minutes.',
            '4. Gravitational potential energy: U = -G M m / r = -(6.67 × 10⁻¹¹ * 6.0 × 10²⁴ * 500) / (7.0 × 10⁶) = -28.58 GJ.',
            '5. Kinetic energy: K = 0.5 * 500 * (7561)² = +14.29 GJ.',
            '6. Total mechanical energy: E = K + U = +14.29 GJ - 28.58 GJ = -14.29 GJ (Half of potential U, verifying Virial equilibrium).'
          ],
          solutionResult: 'v_o = 7.56 km/s, T = 96.9 min, E_total = -14.29 GJ (Bound circular orbit)'
        }
      } : {}),
      ...(role === 'A7' ? {
        misconception: {
          wrongIdea: 'Astronauts in orbit float because gravity does not exist in space (zero gravity).',
          diagnosticPrompt: 'The International Space Station orbits at 400 km altitude. Is Earth\'s gravity zero at this location?',
          repair: 'At 400 km, g = g_surface · (R/(R+h))² = 9.8 · (6400/6800)² = 8.68 m/s² (89% of surface gravity!). Sensation of weightlessness occurs because both spacecraft and astronaut are falling freely together at the same acceleration, so the contact reaction N = 0.'
        }
      } : {})
    })),
    anchors: [
      {
        level: 'FOUNDATION',
        taskRef: ref('QUESTION', 'question:anchor:grav-foundation'),
        title: 'Foundation Anchor: Surface Gravity Calculation',
        prompt: 'Calculate the acceleration due to gravity on the surface of a planet having twice the mass of Earth and twice Earth\'s radius (Earth g = 9.8 m/s²).',
        solutionRef: ref('SOLUTION', 'solution:anchor:grav-foundation'),
        solutionSteps: [
          '1. Formula for surface gravitational acceleration: g = G M / R².',
          '2. Scaling relation: g_planet = G (2M) / (2R)² = (2/4) * (G M / R²) = 0.5 * g_Earth.',
          '3. Evaluation: g_planet = 0.5 * 9.8 m/s² = 4.9 m/s².'
        ],
        warrantRefs: [ref('WARRANT', 'warrant:foundation')]
      },
      {
        level: 'CONNECTED',
        taskRef: ref('QUESTION', 'question:anchor:grav-connected'),
        title: 'Connected Anchor: Satellite Orbital Speed & Period',
        prompt: 'A communications satellite moves in a circular orbit of radius r around Earth. By what factor must its orbital radius increase for its period to quadruple (T_new = 4 T_old)?',
        solutionRef: ref('SOLUTION', 'solution:anchor:grav-connected'),
        solutionSteps: [
          '1. Apply Kepler\'s Third Law: T² ∝ r³ => (T₂/T₁)² = (r₂/r₁)³.',
          '2. Substitute T₂/T₁ = 4: 4² = 16 = (r₂/r₁)³.',
          '3. Solve for radius ratio: r₂/r₁ = 16^(1/3) = (2⁴)^(1/3) = 2^(4/3) ≈ 2.52.',
          '4. The orbital radius must increase by a factor of 2^(4/3) ≈ 2.52.'
        ],
        warrantRefs: [ref('WARRANT', 'warrant:connected')]
      },
      {
        level: 'ADVANCED',
        taskRef: ref('QUESTION', 'question:anchor:grav-advanced'),
        title: 'Advanced Anchor: Orbital Escape Energy Balance',
        prompt: 'Determine the additional kinetic energy that must be imparted to a circular orbit satellite of mass m and speed v_o to allow it to completely escape Earth\'s gravitational field.',
        solutionRef: ref('SOLUTION', 'solution:anchor:grav-advanced'),
        solutionSteps: [
          '1. In a circular orbit of radius r, kinetic energy is K_orbit = 0.5 m v_o² = 0.5 G M m / r, and potential energy is U = -G M m / r.',
          '2. Total mechanical energy in orbit: E_orbit = K + U = -0.5 G M m / r = -K_orbit.',
          '3. For complete escape to infinity, total energy must reach E_escape = 0 J.',
          '4. Additional energy required: ΔE = E_escape - E_orbit = 0 - (-K_orbit) = +K_orbit = 0.5 m v_o².',
          '5. This corresponds to boosting speed from v_o to v_esc = √2 v_o.'
        ],
        warrantRefs: [ref('WARRANT', 'warrant:advanced')]
      }
    ],
    modelConfig: {
      modelId: 'PHYS-MODEL-GRAVITATION-ORBIT',
      modelName: 'Keplerian Orbit Dynamics & Gravitational Field',
      defaultParameters: { altitude: 600 },
      parameterBounds: { altitude: { min: 200, max: 36000 } },
      qualitativePredictionPrompt: 'Predict whether satellite orbital speed v_o increases or decreases as orbital altitude increases.',
      predictionOptions: [
        'Orbital speed decreases because gravitational pull weakens inversely with distance (v_o = √(GM/r))',
        'Orbital speed increases because higher orbits require more total energy',
        'Orbital speed stays constant in vacuum'
      ],
      expectedPredictionIndex: 0,
      observationNote: 'Centripetal balance G M m / r² = m v² / r => v_o = √(G M / r). Speed is strictly inversely proportional to √r.'
    },
    synthesisTaskRef: ref('QUESTION', 'question:synthesis:gravitation'),
    synthesisTaskPrompt: 'Synthesize Newton\'s Universal Gravitation, Kepler\'s Laws, and energy conservation to deduce orbital transfer trajectories.',
    freshTaskRef: ref('FRESH_TASK', 'fresh:gravitation-01')
  };
}

export function createDefaultLesson(topicCode?: string): Core1ALessonDefinition {
  if (topicCode && topicCode.toLowerCase().includes('grav')) {
    return createGravitationLesson();
  }
  const roleTitles: Record<Core1ARole, { title: string; summary: string; bodyText: string }> = {
    A1: {
      title: 'Phenomenon: Work, Direction & Energy Transfer',
      summary: 'Deciding whether a force adds energy, removes energy, or does zero work (W = ∫ F · dr).',
      bodyText: 'A force does work on an object only when there is a component of displacement along the line of action of the force. If the force points in the direction of motion, work is positive and kinetic energy increases. If it opposes motion, work is negative and energy is removed. If the force is perpendicular to displacement (like the normal force on a flat track), the work done is exactly zero.'
    },
    A2: {
      title: 'Prerequisite Conventions: Coordinate Frames & Reference States',
      summary: 'Sign conventions, scalar dot products, and reference points for potential energy.',
      bodyText: 'We define reference coordinates where displacement Δx > 0 represents forward motion. For gravitational potential energy, U_g = mgh with U_g = 0 at the ground datum. For elastic potential energy, U_s = 0.5 * k * x^2 where x is displacement from the natural unstretched spring length.'
    },
    A3: {
      title: 'Representation Bridge: Free-Body Diagram to Energy Ledger',
      summary: 'Mapping individual force vectors to the four-force work ledger.',
      bodyText: 'To analyze a mechanical system like a cart on an incline: 1. Isolate the system boundary. 2. Identify every external force: motor thrust F, kinetic friction f, gravitational force mg, and normal reaction N. 3. Construct the signed work ledger: W_net = W_motor + W_f + W_g + W_N.'
    },
    A4: {
      title: 'Law & Conditions: Work-Kinetic Energy Theorem & Gradient Relation',
      summary: 'Derivation of W_net = ΔK and conservative force F = -dU/dx.',
      bodyText: 'Integrating Newton\'s Second Law along a spatial trajectory gives ∫ F_net dx = ∫ m v (dv/dx) dx = 0.5 * m * v_f^2 - 0.5 * m * v_i^2 = ΔK. For conservative fields, the work done along any closed loop is zero, defining potential energy U such that F = -dU/dx.'
    },
    A5: {
      title: 'Scientific Simulation: Reading One-Dimensional Potential Curves',
      summary: 'Potential landscapes, turning points, bound states, and equilibrium stability.',
      bodyText: 'Given an energy curve U(x), total mechanical energy E = K + U forms a horizontal line. Motion is physically accessible only where E >= U(x). The points where E = U(x) are turning points where speed v = 0. Local minima of U(x) represent points of stable equilibrium (dU/dx = 0, d^2U/dx^2 > 0).'
    },
    A6: {
      title: 'Reasoning Construction: Toy Cart Ramp Climb Worked Example',
      summary: 'Step-by-step energy ledger calculation for a 3 kg cart climbing a 2 m incline.',
      bodyText: 'Complete calculation of motor work (+30 J), friction loss (-6 J), and gravity work (-15 J), finding net work +9 J and final summit speed 2.45 m/s.'
    },
    A7: {
      title: 'Misconception Alert: Equal Momentum vs Equal Kinetic Energy',
      summary: 'Why equal momentum does NOT imply equal kinetic energy.',
      bodyText: 'A frequent error is assuming equal momentum means equal energy. Because K = p^2 / (2m), for two objects with identical momentum p, the lighter object has significantly greater kinetic energy.'
    },
    A8: {
      title: 'Boundary & Changed Demand: Insufficient Motor Thrust',
      summary: 'Evaluating the climb threshold when motor thrust drops to 10 N.',
      bodyText: 'What happens if motor thrust is reduced to 10 N? Over a hypothetical full climb, motor work would be only +20 J, while friction (-6 J) and gravity (-15 J) require -21 J. Net work would be -1 J. Since a cart starting from rest cannot have negative kinetic energy, the cart stops before reaching the summit.'
    },
    A9: {
      title: 'Synthesis: Coupled Two-Body Momentum & Energy Partition',
      summary: 'Energy partition between spring-released push-apart carts.',
      bodyText: 'When two carts of mass m1 and m2 are pushed apart by a compressed spring on a frictionless track, conservation of momentum gives p1 + p2 = 0 => |p1| = |p2| = p. The spring energy E_s = 0.5 * k * x^2 is partitioned as K1 / K2 = m2 / m1. The lighter cart receives the larger share of kinetic energy.'
    }
  };

  return {
    lessonRef: ref('LESSON', 'lesson:physics-wpe'),
    constructionRef: ref('CONSTRUCTION', 'construction:physics-wpe'),
    title: 'Work, Power and Energy: 5 Thinking Skills & Concept Construction',
    subject: 'PHYSICS',
    topicId: 'topic:wpe',
    depthBadge: 'MEDIUM',
    status: 'HOLD',
    units: CORE1A_ORDERED_ROLES.map(role => ({
      role,
      title: roleTitles[role].title,
      summary: roleTitles[role].summary,
      bodyText: roleTitles[role].bodyText,
      blockRefs: [ref('SOURCE', 'source:' + role)],
      evidenceRefs: [ref('WARRANT', 'warrant:' + role)],
      conventions: role === 'A2' ? ['+x is forwards rectilinear motion', 'Gravitational datum U_g = 0 at ground level', 'Normal force perpendicular to surface'] : undefined,
      representationBridge: role === 'A3' ? [
        { pictureElement: 'Motor thrust arrow along ramp', symbol: 'F_motor', inWords: 'Adds positive mechanical work (+30 J)' },
        { pictureElement: 'Friction vector opposing motion', symbol: 'f_k', inWords: 'Removes mechanical energy through dissipation (-6 J)' },
        { pictureElement: 'Downward gravity vector mg', symbol: 'W_g', inWords: 'Opposes height gain (-mgh = -15 J)' },
        { pictureElement: 'Perpendicular normal reaction', symbol: 'N', inWords: 'Does exactly zero work (W_N = 0 J)' }
      ] : undefined,
      derivationSteps: role === 'A4' ? [
        { stepNumber: 1, expression: 'W_net = ∫ F_net dx = ∫ m (dv/dt) dx = ∫ m v dv', whyValid: 'Newton Second Law transformed via chain rule dv/dt = v dv/dx' },
        { stepNumber: 2, expression: 'W_net = 0.5 * m * v_f^2 - 0.5 * m * v_i^2 = ΔK', whyValid: 'Direct definite integration from initial velocity v_i to final velocity v_f' },
        { stepNumber: 3, expression: 'F_cons = -dU/dx', whyValid: 'Definition of potential energy for conservative forces where work depends only on endpoints' }
      ] : undefined,
      boundaryConditions: role === 'A8' ? ['Kinetic energy K >= 0 everywhere', 'Cart halts when K(x) reaches exactly 0 J', 'Negative net work from rest is inaccessible'] : undefined,
      selfCheckPrompt: role === 'A9' ? 'Self-Check: Can a system of two interacting particles conserve total mechanical energy if non-conservative internal friction is present?' : undefined,
      ...(role === 'A6' ? {
        workedExample: {
          problemPrompt: 'A 3 kg toy cart climbs a 2 m ramp rising 0.5 m with 15 N motor thrust and 3 N opposing friction. Find net work and final speed from rest.',
          fullReasoningSteps: [
            '1. System: Cart. Normal force is perpendicular to incline so W_N = 0 J.',
            '2. Motor work W_motor = +15 N * 2 m = +30 J.',
            '3. Friction work W_f = -3 N * 2 m = -6 J.',
            '4. Gravity work W_g = -mgh = -3 kg * 10 m/s^2 * 0.5 m = -15 J.',
            '5. Net work W_net = +30 - 6 - 15 = +9 J.',
            '6. By Work-Energy Theorem: K_f = W_net = 9 J. 0.5 * 3 * v^2 = 9 => v^2 = 6 => v = 2.45 m/s.'
          ],
          solutionResult: 'W_net = +9.0 J, v_final = 2.45 m/s (Cart successfully reaches the top flag)'
        }
      } : {}),
      ...(role === 'A7' ? {
        misconception: {
          wrongIdea: 'Objects with equal momentum have the same kinetic energy, or normal force always does work.',
          diagnosticPrompt: 'A 2 kg cart and a 4 kg cart have the same momentum p = 8 kg m/s. Which cart has more kinetic energy?',
          repair: 'Using K = p^2 / (2m): Cart A has 8^2 / (2*2) = 16 J, while Cart B has 8^2 / (2*4) = 8 J. Cart A has twice the kinetic energy because its mass is half as large.'
        }
      } : {})
    })),
    anchors: (() => {
      if (topicCode) {
        const matches = UNIFIED_QUESTION_DATABASE.query({ topic: topicCode, pageSize: 20 });
        if (matches.items.length >= 3) {
          const qFound = matches.items.find(q => q.difficultyBand === 'D1') || matches.items[0];
          const qConn = matches.items.find(q => q.difficultyBand === 'D2' || q.difficultyBand === 'D3') || matches.items[1];
          const qAdv = matches.items.find(q => q.difficultyBand === 'D4') || matches.items[2];
          return [
            {
              level: 'FOUNDATION' as const,
              taskRef: ref('QUESTION', qFound.id),
              title: `Foundation Anchor: ${qFound.title}`,
              prompt: qFound.stem,
              solutionRef: ref('SOLUTION', `solution:${qFound.id}`),
              solutionSteps: qFound.steps && qFound.steps.length > 0 ? qFound.steps : ['Verify fundamental definition and baseline formula application.'],
              warrantRefs: [ref('WARRANT', 'warrant:foundation')]
            },
            {
              level: 'CONNECTED' as const,
              taskRef: ref('QUESTION', qConn.id),
              title: `Connected Anchor: ${qConn.title}`,
              prompt: qConn.stem,
              solutionRef: ref('SOLUTION', `solution:${qConn.id}`),
              solutionSteps: qConn.steps && qConn.steps.length > 0 ? qConn.steps : ['Isolate boundary constraints and solve coupled algebraic conditions.'],
              warrantRefs: [ref('WARRANT', 'warrant:connected')]
            },
            {
              level: 'ADVANCED' as const,
              taskRef: ref('QUESTION', qAdv.id),
              title: `Advanced Anchor: ${qAdv.title}`,
              prompt: qAdv.stem,
              solutionRef: ref('SOLUTION', `solution:${qAdv.id}`),
              solutionSteps: qAdv.steps && qAdv.steps.length > 0 ? qAdv.steps : ['Evaluate limiting conditions, extremal points, or dimensional constraints.'],
              warrantRefs: [ref('WARRANT', 'warrant:advanced')]
            }
          ];
        }
      }
      return [
        {
          level: 'FOUNDATION' as const,
          taskRef: ref('QUESTION', 'question:anchor:foundation'),
          title: 'Foundation Anchor: Constant Force Work Balance',
          prompt: 'Evaluate the work done by a constant 20 N horizontal force over a 5 m displacement on a frictionless surface.',
          solutionRef: ref('SOLUTION', 'solution:anchor:foundation'),
          solutionSteps: [
            '1. Applied force F = 20 N horizontally along displacement vector Δx = 5 m (θ = 0 rad).',
            '2. Definition of Work: W = F * d * cos(0°) = 20 N * 5 m * 1.0 = +100 J.',
            '3. Normal reaction N = mg and gravity mg act perpendicular to displacement (cos 90° = 0), doing 0 J work.',
            '4. Net work W_net = 100 J. By Work-Energy Theorem: ΔK = K_f - 0 = 100 J.'
          ],
          warrantRefs: [ref('WARRANT', 'warrant:foundation')]
        },
        {
          level: 'CONNECTED' as const,
          taskRef: ref('QUESTION', 'question:anchor:connected'),
          title: 'Connected Anchor: Incline Ledger with Sliding Friction',
          prompt: 'A 5 kg crate slides down a 30° incline of length 10 m with friction coefficient μ = 0.2. Calculate net work and final speed from rest.',
          solutionRef: ref('SOLUTION', 'solution:anchor:connected'),
          solutionSteps: [
            '1. Normal force balance: N = mg cos(30°) = 5 kg * 10 m/s² * 0.8660 = 43.30 N.',
            '2. Friction magnitude: f_k = μ_k * N = 0.2 * 43.30 N = 8.66 N.',
            '3. Dissipative friction work: W_f = -f_k * d = -8.66 N * 10 m = -86.6 J.',
            '4. Conservative gravity work: W_g = mgh = mg * (d sin 30°) = 5 * 10 * (10 * 0.5) = +250 J.',
            '5. Net work: W_net = W_g + W_f + W_N = 250 - 86.6 + 0 = +163.4 J.',
            '6. Summit speed from rest: 0.5 * m * v_f^2 = W_net => v_f = sqrt(2 * 163.4 / 5) = 8.08 m/s.'
          ],
          warrantRefs: [ref('WARRANT', 'warrant:connected')]
        },
        {
          level: 'ADVANCED' as const,
          taskRef: ref('QUESTION', 'question:anchor:advanced'),
          title: 'Advanced Anchor: Multi-Well Potential Barrier Crossing',
          prompt: 'A particle of mass m = 1 kg moves in potential U(x) = (x^2 - 4)^2 J. Determine turning points and barrier crossing condition at x = 0.',
          solutionRef: ref('SOLUTION', 'solution:anchor:advanced'),
          solutionSteps: [
            '1. Potential curve analysis: U(x) = (x² - 4)² J. Potential minima occur where x² = 4 => x = ±2 m, where U(±2) = 0 J.',
            '2. Central barrier maximum: Located at x = 0 m, where U(0) = (0 - 4)² = 16 J.',
            '3. Total mechanical energy invariance: E = K(x) + U(x) = constant. Kinetic energy constraint: K(x) >= 0.',
            '4. Classical turning points: Defined where K(x) = 0 => U(x) = E.',
            '5. Barrier crossing condition: To cross from the left well (x < 0) over the central crest (x = 0) into the right well (x > 0), total mechanical energy E must strictly exceed the barrier peak: E > 16 J.'
          ],
          warrantRefs: [ref('WARRANT', 'warrant:advanced')]
        }
      ];
    })(),
    modelConfig: {
      modelId: 'PHYS-MODEL-ENERGY-WELL',
      modelName: 'Potential Well Dynamics & Turning Points',
      defaultParameters: { x: 0 },
      parameterBounds: { x: { min: -3, max: 3 } },
      qualitativePredictionPrompt: 'Predict how kinetic energy K changes as displacement x moves from the well bottom (x = 2) toward the barrier (x = 0)',
      predictionOptions: [
        'K decreases as potential energy U increases, reaching minimum at the barrier peak',
        'K remains constant because total energy is conserved',
        'K increases linearly with displacement'
      ],
      expectedPredictionIndex: 0,
      observationNote: 'E = K + U(x) => K(x) = E - U(x). At turning points E = U(x) and K = 0.'
    },
    synthesisTaskRef: ref('QUESTION', 'question:synthesis:wpe'),
    synthesisTaskPrompt: 'Synthesize the conservation laws under coupled multi-force and non-conservative dissipation',
    freshTaskRef: ref('FRESH_TASK', 'fresh:wpe-01')
  };
}

export class Core1ALessonPageController {
  private journey: Core1ATeachingJourney | null = null;
  private readonly rawDefinition: Core1ALessonDefinition | null = null;
  private orientation: DisplayOrientation = 'LANDSCAPE';
  private state: LessonScreenState = 'loading';
  private error = '';
  private anchor: AnchorLevel = 'FOUNDATION';
  private revealedSolutions: Set<AnchorLevel> = new Set();
  private isWorkedExampleOpen = false;
  private isRepairOpen = false;
  private modelObserved = false;
  private selectedPrediction: number | null = null;
  private modelParams: Record<string, number> = { x: 0 };

  constructor(config: LessonPageConfig = {}) {
    this.setOrientation(config.orientation ?? 'LANDSCAPE');
    const def = config.lessonDefinition ?? createDefaultLesson(config.topicCode);
    this.rawDefinition = def ?? null;

    if (def) {
      try {
        this.journey = new Core1ATeachingJourney(def);
        this.modelParams = structuredClone(def.modelConfig.defaultParameters);
        this.state = 'populated';
      } catch {
        this.state = 'error';
        this.error = 'Invalid lesson definition';
      }
    } else {
      this.state = config.initialState ?? 'loading';
    }
  }

  private j() {
    if (!this.journey) throw Error('Lesson unavailable');
    return this.journey;
  }

  actionSection(role: Core1ARole) {
    this.j().selectSection(role);
    this.isWorkedExampleOpen = false;
    this.isRepairOpen = false;
  }

  actionExample(role?: Core1ARole) {
    this.isWorkedExampleOpen = !this.isWorkedExampleOpen;
    return this.isWorkedExampleOpen;
  }

  toggleWorkedExample() {
    this.isWorkedExampleOpen = !this.isWorkedExampleOpen;
    return this.isWorkedExampleOpen;
  }

  toggleDiagnosticRepair() {
    this.isRepairOpen = !this.isRepairOpen;
    return this.isRepairOpen;
  }

  actionFreshTask() {
    if (this.rawDefinition?.status === 'SYNTHETIC') {
      return { allowed: false, reason: 'Synthetic test fixture' };
    }
    if (this.rawDefinition?.status === 'STALE') {
      return { allowed: false, reason: 'stale lesson' };
    }
    if (!this.rawDefinition?.freshTaskRef) {
      return { allowed: false, reason: 'no fresh task' };
    }
    return { allowed: true, route: this.getFreshTransferRoute() };
  }

  getFreshTransferRoute(): string {
    return `/transfer/${this.rawDefinition?.lessonRef.id || 'lesson:physics-wpe'}`;
  }

  actionReturn() {
    return '/home';
  }

  actionPredictModel(i: number) {
    this.selectedPrediction = i;
    try {
      this.j().predictModel(i);
    } catch {}
  }

  actionObserveModel() {
    this.modelObserved = true;
    return true;
  }

  actionDepth(d?: IntrinsicDepthBadge) {
    const j = this.j();
    const cur = j.getCurrentDepthView();
    const next = d ?? (cur === 'EASY' ? 'MEDIUM' : cur === 'MEDIUM' ? 'HARD' : 'EASY');
    j.setDepthView(next);
    return next;
  }

  actionModelFit() {
    return this.j().checkModelFit();
  }

  updateModelParameter(k: string, v: number) {
    this.modelParams[k] = v;
    try {
      this.j().updateModelParameter(k, v);
    } catch {}
  }

  getModelTelemetry() {
    const x = this.modelParams.x ?? 0;
    const u = Math.pow(Math.pow(x, 2) - 4, 2);
    const totalE = 16.0;
    const k = Math.max(0, totalE - u);
    const f = -4 * x * (Math.pow(x, 2) - 4);
    const v = Math.sqrt(2 * k);
    let state = 'CLIMBING BARRIER';
    if (Math.abs(Math.abs(x) - 2) < 0.15) state = 'WELL BOTTOM (MAX SPEED)';
    else if (Math.abs(x) < 0.15) state = 'BARRIER PEAK (K ≈ 0)';
    else if (u > totalE) state = 'CLASSICALLY FORBIDDEN';
    return { position: x, potentialEnergy: u, kineticEnergy: k, totalEnergy: totalE, force: f, velocity: v, dynamicState: state };
  }

  selectAnchorTab(level: AnchorLevel) {
    if (!ANCHOR_LEVELS.includes(level)) throw Error('Invalid anchor');
    this.anchor = level;
  }

  toggleAnchorSolution(level?: AnchorLevel) {
    const target = level ?? this.anchor;
    if (this.revealedSolutions.has(target)) {
      this.revealedSolutions.delete(target);
      return false;
    } else {
      this.revealedSolutions.add(target);
      return true;
    }
  }

  setOrientation(o: DisplayOrientation) {
    if (!['LANDSCAPE', 'PORTRAIT'].includes(o)) throw Error('Invalid orientation');
    this.orientation = o;
  }

  getOrientation() {
    return this.orientation;
  }

  toDraft() {
    return this.journey?.toDraft() ?? null;
  }

  restoreDraft(d: Core1ADraft) {
    this.j().restoreDraft(d);
  }

  getViewState() {
    const j = this.journey;
    const l = j?.getLesson();
    return {
      screenState: l?.status === 'STALE' ? 'stale lesson' : this.state,
      lessonId: l?.lessonRef.id ?? '',
      title: l?.title ?? 'Lesson unavailable',
      subject: l?.subject ?? '',
      topicId: l?.topicId ?? '',
      activeUnitRole: j?.getActiveRole() ?? 'A1',
      activeUnitTitle: j?.getActiveUnit().title ?? '',
      orientation: this.orientation,
      completedRoles: j?.getCompletedRoles() ?? [],
      visitedRoles: j?.getVisitedRoles() ?? [],
      currentDepth: j?.getCurrentDepthView() ?? 'MEDIUM',
      modelObserved: this.modelObserved,
      modelPredicted: this.selectedPrediction !== null,
      modelFitValid: j?.checkModelFit().valid ?? false,
      canRouteFresh: this.actionFreshTask().allowed,
      freshRouteRejectionReason: j?.getFreshRouteRejectionReason() ?? 'Lesson unavailable',
      minHitTargetPx: 48
    };
  }

  render() {
    const s = this.getViewState();
    if (!this.journey) return '<section role="status">' + e(this.error || s.title) + '</section>';

    const j = this.journey;
    const l = j.getLesson();
    const active = s.activeUnitRole;

    // Use rawDefinition units/anchors to expose candidate educational derivations
    const activeRawUnit = this.rawDefinition?.units.find(u => u.role === active) || j.getActiveUnit();
    const rawAnchors = this.rawDefinition?.anchors || l.anchors;

    const u = new Core1AUnitViewController({
      unitData: activeRawUnit,
      initialDepth: j.getCurrentDepthView(),
      allowCandidateExamples: true
    });
    if (this.isWorkedExampleOpen) u.toggleWorkedExample();
    if (this.isRepairOpen) u.toggleDiagnosticRepair();

    const a = new Core1AAnchorViewController({
      anchors: rawAnchors,
      synthesisTaskRef: l.synthesisTaskRef,
      synthesisTaskPrompt: l.synthesisTaskPrompt,
      initialLevel: this.anchor,
      allowCandidateSolutions: true
    });
    for (const rev of this.revealedSolutions) {
      if (!a.isSolutionRevealed(rev)) a.toggleSolution(rev);
    }

    const m = new Core1AModelStageController(
      {
        ...l.modelConfig,
        defaultParameters: this.modelParams
      },
      j.getCurrentDepthView()
    );
    if (this.selectedPrediction !== null) m.predict(this.selectedPrediction);
    if (this.modelObserved) {
      try { m.observe(true); } catch {}
    }

    const identity = ['A1', 'A2'].includes(active);
    const construction = ['A3', 'A4', 'A5', 'A6'].includes(active);

    return `
      <main class="g9-lesson-page" data-orientation="${s.orientation}" data-role="CORE1A">
        <style>${lessonCss}</style>
        <section data-slot="identity">
          <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;margin-bottom:8px;">
            <h1 style="margin:0;font-size:1.6rem;color:#0f172a;">${e(l.title)}</h1>
            <span style="font-size:0.8rem;padding:3px 10px;border-radius:4px;background:#e0f2fe;color:#0369a1;font-weight:700;">
              SUBJECT: ${e(l.subject)} · TOPIC: ${e(l.topicId)}
            </span>
          </div>
          <p style="margin:0 0 12px 0;color:#64748b;font-size:0.92rem;">
            Interactive Concept Construction Workspace · [Engineering Candidate Release · Academic Admission HOLD]
          </p>
          <nav aria-label="Teaching sections">
            ${CORE1A_ORDERED_ROLES.map(role => `
              <button type="button" data-role="${role}" aria-pressed="${active === role}">
                ${role}
              </button>
            `).join('')}
          </nav>
          <nav aria-label="Explanation depth">
            ${(['EASY', 'MEDIUM', 'HARD'] as const).map(d => `
              <button type="button" data-depth="${d}" aria-pressed="${s.currentDepth === d}">
                ${d} Depth
              </button>
            `).join('')}
          </nav>
          ${identity ? u.render() : ''}
        </section>

        <section data-slot="construction">
          <h2>Construction</h2>
          ${construction ? u.render() : ''}
          ${m.render()}
          ${a.render(false)}
        </section>

        <section data-slot="repair_closure">
          <h2>Repair and closure</h2>
          ${!identity && !construction ? u.render() : ''}
          ${a.renderSynthesis()}
          <div style="margin-top:20px;padding-top:16px;border-top:1px solid #e2e8f0;display:flex;align-items:center;gap:12px;flex-wrap:wrap;">
            <button type="button" data-action="fresh-transfer" style="min-height:48px;padding:10px 24px;background:#059669;color:#ffffff;border:none;border-radius:6px;font-weight:700;font-size:1rem;cursor:pointer;display:inline-flex;align-items:center;gap:8px;">
              🚀 Proceed to Fresh Transfer Challenge (Core 1B) ➔
            </button>
            <span style="font-size:0.85rem;color:#64748b;">
              Unseen isomorphic verification test
            </span>
          </div>
        </section>

        <p role="status" data-lesson-status style="font-size:0.9rem;font-weight:600;color:#0369a1;margin-top:10px;"></p>
      </main>
    `;
  }
}

export type LessonPageViewState = ReturnType<Core1ALessonPageController['getViewState']>;

const lessonCss = `
.g9-lesson-page{box-sizing:border-box;width:100%;max-width:100%;min-width:0;display:flex;flex-direction:column;gap:20px;overflow-wrap:anywhere;font:inherit}
.g9-lesson-page *{box-sizing:border-box;min-width:0}
.g9-lesson-page [data-slot]{width:100%;padding:18px;border:1px solid #cbd5e1;background:#ffffff;border-radius:10px;box-shadow:0 1px 3px rgba(0,0,0,0.05)}
.g9-lesson-page nav{display:flex;flex-wrap:wrap;gap:8px;margin:10px 0}
.g9-lesson-page button,.g9-lesson-page input{min-height:48px;min-width:48px;max-width:100%;font:inherit}
.g9-lesson-page button{padding:8px 14px;border-radius:6px;border:1px solid #cbd5e1;background:#ffffff;color:#1e293b;cursor:pointer;font-weight:600;white-space:normal;overflow-wrap:anywhere}
.g9-lesson-page button:hover{background:#f8fafc;border-color:#94a3b8}
.g9-lesson-page button[aria-pressed=true]{background:#0284c7;color:#ffffff;border-color:#0284c7;outline:2px solid #0284c7;outline-offset:1px}
.g9-lesson-page .g9-model-stage-component label{display:flex;align-items:center;gap:8px;min-height:48px;margin:8px 0;flex-wrap:wrap}
.g9-lesson-page input[type=range]{flex:1 1 140px}
.g9-lesson-page :focus-visible{outline:3px solid #0284c7;outline-offset:2px}
.g9-lesson-page p,.g9-lesson-page li{white-space:pre-wrap;overflow-wrap:anywhere}
`;

export function mountCore1ALesson(root: HTMLElement, c: Core1ALessonPageController) {
  let active = true;

  const syncLearnerSession = () => {
    try {
      const vs = c.getViewState();
      const roleIdx = CORE1A_ORDERED_ROLES.indexOf(vs.activeUnitRole as any);
      const progress = Math.min(100, Math.max(15, Math.round(((roleIdx + 1) / CORE1A_ORDERED_ROLES.length) * 100)));
      const rawTopic = vs.topicId?.toLowerCase() || 'wpe';
      const cleanTopic = rawTopic.startsWith('topic:') ? rawTopic : 'topic:' + rawTopic;
      recordActiveLearnerSession({
        sessionId: vs.lessonId || 'session:wpe-core1a',
        subjectId: 'subject:' + (vs.subject?.toLowerCase() || 'physics'),
        topicId: cleanTopic,
        title: vs.title || 'Physics — Work, Power & Energy (Core 1A)',
        route: '/learning/core1a',
        progressPercent: progress,
        lastActiveAt: new Date().toISOString(),
        statusText: `Section ${vs.activeUnitRole}: ${vs.activeUnitTitle}`,
        role: 'CORE1A',
      });
    } catch {}
  };

  const render = (focus?: { key: string; value: string }) => {
    if (!active) return;
    root.innerHTML = c.render();
    syncLearnerSession();
    if (focus) {
      const nodes = root.querySelectorAll<HTMLElement>('button');
      for (const n of nodes) {
        if (n.getAttribute(focus.key) === focus.value) {
          n.focus({ preventScroll: true });
          break;
        }
      }
    }
  };

  const status = (message: string) => {
    const n = root.querySelector('[data-lesson-status]');
    if (n) n.textContent = message;
  };

  const click = (event: Event) => {
    const b = event.target instanceof Element ? event.target.closest<HTMLButtonElement>('button') : null;
    if (!active || !b || b.disabled || !root.contains(b)) return;

    try {
      if (b.dataset.role) {
        c.actionSection(b.dataset.role as Core1ARole);
        render({ key: 'data-role', value: b.dataset.role });
      } else if (b.dataset.level) {
        c.selectAnchorTab(b.dataset.level as AnchorLevel);
        render({ key: 'data-level', value: b.dataset.level });
      } else if (b.dataset.depth) {
        c.actionDepth(b.dataset.depth as IntrinsicDepthBadge);
        render({ key: 'data-depth', value: b.dataset.depth });
      } else if (b.dataset.action === 'toggle-anchor-solution') {
        c.toggleAnchorSolution(b.dataset.level as AnchorLevel);
        render();
      } else if (b.dataset.action === 'toggle-worked-example') {
        c.toggleWorkedExample();
        render();
      } else if (b.dataset.action === 'toggle-diagnostic-repair') {
        c.toggleDiagnosticRepair();
        render();
      } else if (b.dataset.action === 'observe-model') {
        c.actionObserveModel();
        render();
        status('Scientific simulation observed. Quantitative telemetry and potential energy landscape active.');
      } else if (b.dataset.action === 'fresh-transfer') {
        const route = c.getFreshTransferRoute();
        window.location.hash = '#' + route;
      }
    } catch {
      status('Invalid diagnostic control.');
    }
  };

  const input = (event: Event) => {
    const n = event.target;
    if (!active || !(n instanceof HTMLInputElement) || !root.contains(n)) return;

    try {
      if (n.type === 'radio' && n.name === 'prediction' && n.checked) {
        c.actionPredictModel(Number(n.value));
        render();
        status(`Prediction ${Number(n.value) + 1} recorded. Click "Test Prediction & Observe Simulation" to evaluate.`);
      } else if (n.type === 'range' && n.dataset.parameter) {
        const val = Number(n.value);
        c.updateModelParameter(n.dataset.parameter, val);
        render();
        const t = c.getModelTelemetry();
        if (t) {
          status(`Position x = ${t.position.toFixed(2)} m · Potential U(x) = ${t.potentialEnergy.toFixed(2)} J · Kinetic K(x) = ${t.kineticEnergy.toFixed(2)} J · Speed v = ${t.velocity.toFixed(2)} m/s (${t.dynamicState})`);
        }
      }
    } catch {
      status('Invalid diagnostic input.');
    }
  };

  root.addEventListener('click', click);
  root.addEventListener('input', input);
  root.addEventListener('change', input);
  render();

  return {
    refresh: () => render(),
    dispose() {
      if (!active) return;
      active = false;
      root.removeEventListener('click', click);
      root.removeEventListener('input', input);
      root.removeEventListener('change', input);
      root.replaceChildren();
    }
  };
}
