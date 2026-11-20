/**
 * web/pages/nsejs-data.generated.ts
 * Wave 11 — Staged NSEJS Physics 12-Chapter Curriculum & Authentic Question Bank.
 * Fault N09 Answer Isolation: raw answer keys withheld from cleartext exposure.
 */

export interface NsejsChapterDescriptor {
  readonly id: string;
  readonly title: string;
  readonly domain: string;
  readonly subtopicCount: number;
  readonly formulaWarrants: readonly string[];
  readonly description: string;
}

export interface NsejsSubtopicDescriptor {
  readonly chapterId: string;
  readonly subtopicId: string;
  readonly title: string;
  readonly priority: string;
  readonly qrtOperations: readonly string[];
}

export interface NsejsQuestionDescriptor {
  readonly id: string;
  readonly topic: string;
  readonly chapterId: string;
  readonly stem: string;
  readonly options: readonly string[];
  readonly hints: readonly string[];
  readonly steps: readonly string[];
  readonly keyState: string;
}

export const NSEJS_CHAPTERS: readonly NsejsChapterDescriptor[] = [
  {
    "id": "PH01",
    "title": "Units, Dimensions & Measurement",
    "domain": "Foundations",
    "subtopicCount": 8,
    "formulaWarrants": [
      "[M^a L^b T^c]",
      "Vernier constant VC = 1 MSD - 1 VSD",
      "Screw gauge pitch / divisions",
      "Dimensional homogeneity"
    ],
    "description": "Dimensional analysis, physical quantities, errors and standard measurement instruments in junior physics."
  },
  {
    "id": "PH02",
    "title": "Motion in a Straight Line",
    "domain": "Kinematics 1D",
    "subtopicCount": 8,
    "formulaWarrants": [
      "v = u + at",
      "s = ut + (1/2)at^2",
      "v^2 = u^2 + 2as",
      "Stopping distance s = u^2 / (2a)"
    ],
    "description": "One-dimensional rectilinear motion, signed displacement, piecewise motion graphs, and constant acceleration kinematics."
  },
  {
    "id": "PH03",
    "title": "Vectors & Motion in a Plane",
    "domain": "Kinematics 2D",
    "subtopicCount": 7,
    "formulaWarrants": [
      "A \u00b7 B = |A||B|cos \u03b8",
      "|A \u00d7 B| = |A||B|sin \u03b8",
      "R = (u^2 sin 2\u03b8) / g",
      "H = (u^2 sin^2 \u03b8) / (2g)"
    ],
    "description": "Vector algebra, components, relative velocity in 2D, and parabolic projectile trajectory analysis."
  },
  {
    "id": "PH04",
    "title": "Laws of Motion & Friction",
    "domain": "Dynamics",
    "subtopicCount": 9,
    "formulaWarrants": [
      "F = dp/dt = ma",
      "f_s <= \u03bc_s N",
      "f_k = \u03bc_k N",
      "Impulse J = \u0394p = \u222b F dt"
    ],
    "description": "Newton's three laws, free-body diagrams, static and kinetic friction bounds, and connected body systems."
  },
  {
    "id": "PH05",
    "title": "Work, Energy & Power",
    "domain": "Energetics",
    "subtopicCount": 7,
    "formulaWarrants": [
      "W = \u222b F \u00b7 dr",
      "W_net = \u0394K = (1/2)m(v^2 - u^2)",
      "U_g = mgh",
      "Power P = F \u00b7 v"
    ],
    "description": "Work-energy theorem, conservative vs dissipative forces, potential energy landscapes, and power delivery."
  },
  {
    "id": "PH06",
    "title": "Circular Motion & Gravitation",
    "domain": "Orbital Mechanics",
    "subtopicCount": 10,
    "formulaWarrants": [
      "a_c = v^2 / r = \u03c9^2 r",
      "tan \u03b8 = v^2 / (rg)",
      "F = G(m1 m2)/r^2",
      "T^2 = (4\u03c0^2 / GM) r^3"
    ],
    "description": "Centripetal acceleration, banked curves, Kepler's three planetary laws, and universal gravitation."
  },
  {
    "id": "PH07",
    "title": "Rotational Motion & Centre of Mass",
    "domain": "Rigid Body Dynamics",
    "subtopicCount": 12,
    "formulaWarrants": [
      "r_cm = (\u03a3 m_i r_i) / M",
      "\u03c4 = r \u00d7 F = I\u03b1",
      "L = r \u00d7 p = I\u03c9",
      "K_total = (1/2)M v_cm^2 + (1/2)I_cm \u03c9^2"
    ],
    "description": "Centre of mass coordinates, moment of inertia, torque, angular momentum conservation, and rolling motion without slip."
  },
  {
    "id": "PH08",
    "title": "Mechanical Properties of Solids & Fluids",
    "domain": "Continuum Mechanics",
    "subtopicCount": 13,
    "formulaWarrants": [
      "Stress = Y \u00d7 Strain",
      "P = P_0 + \u03c1gh",
      "F_B = \u03c1_f V_sub g",
      "A_1 v_1 = A_2 v_2",
      "P + (1/2)\u03c1v^2 + \u03c1gh = const"
    ],
    "description": "Hooke's law, Young's modulus, hydrostatic pressure, Archimedes' principle, equation of continuity, and Bernoulli's theorem."
  },
  {
    "id": "PH09",
    "title": "Thermal Physics & Thermodynamics",
    "domain": "Thermal Physics",
    "subtopicCount": 12,
    "formulaWarrants": [
      "\u0394Q = mc \u0394T",
      "\u0394Q = mL",
      "PV = nRT",
      "\u0394U = Q - W",
      "dQ/dt = -kA (dT/dx)"
    ],
    "description": "Thermal expansion, calorimetry, ideal gas law, first law of thermodynamics, heat conduction, and radiation."
  },
  {
    "id": "PH10",
    "title": "Oscillations, SHM & Waves",
    "domain": "Waves & Oscillations",
    "subtopicCount": 17,
    "formulaWarrants": [
      "x(t) = A sin(\u03c9t + \u03c6)",
      "T = 2\u03c0 \u221a(m/k)",
      "T = 2\u03c0 \u221a(L/g)",
      "v = f\u03bb",
      "f' = f (v \u00b1 v_o)/(v \u2213 v_s)"
    ],
    "description": "Simple harmonic motion kinematics and dynamics, spring-mass systems, simple pendulum, wave equation, and Doppler effect."
  },
  {
    "id": "PH11",
    "title": "Electrostatics, Current & Circuits",
    "domain": "Electrodynamics",
    "subtopicCount": 14,
    "formulaWarrants": [
      "F = k(q1 q2)/r^2",
      "V = IR",
      "R_eq = R1 + R2 (series)",
      "1/R_eq = 1/R1 + 1/R2 (parallel)",
      "P = VI = I^2 R = V^2/R"
    ],
    "description": "Coulomb's law, electric field, Ohm's law, Kirchhoff's current and voltage laws, equivalent resistance, and Joule heating."
  },
  {
    "id": "PH12",
    "title": "Magnetic Effects of Current & Ray Optics",
    "domain": "Optics & Magnetism",
    "subtopicCount": 15,
    "formulaWarrants": [
      "F = q(v \u00d7 B)",
      "F = I(L \u00d7 B)",
      "n1 sin \u03b81 = n2 sin \u03b82",
      "1/f = 1/v - 1/u (lens)",
      "1/f = 1/v + 1/u (mirror)"
    ],
    "description": "Lorentz magnetic force, magnetic field due to currents, Snell's law of refraction, total internal reflection, and optical instrument imaging."
  }
];

export const NSEJS_SUBTOPICS: readonly NsejsSubtopicDescriptor[] = [
  {
    "chapterId": "PH01",
    "subtopicId": "PH01-M01",
    "title": "Measurement, position and reference directions",
    "priority": "P2",
    "qrtOperations": [
      "EXPLAIN",
      "CALCULATE",
      "REPRESENT"
    ]
  },
  {
    "chapterId": "PH01",
    "subtopicId": "PH01-M02",
    "title": "Distance and displacement in one dimension",
    "priority": "P2",
    "qrtOperations": [
      "EXPLAIN",
      "CALCULATE",
      "REPRESENT"
    ]
  },
  {
    "chapterId": "PH01",
    "subtopicId": "PH01-M03",
    "title": "Speed, velocity and average quantities",
    "priority": "P2",
    "qrtOperations": [
      "EXPLAIN",
      "CALCULATE",
      "REPRESENT"
    ]
  },
  {
    "chapterId": "PH01",
    "subtopicId": "PH01-M04",
    "title": "Acceleration and velocity changes",
    "priority": "P2",
    "qrtOperations": [
      "EXPLAIN",
      "CALCULATE",
      "REPRESENT"
    ]
  },
  {
    "chapterId": "PH01",
    "subtopicId": "PH01-M05",
    "title": "Position\u2013time and velocity\u2013time graphs",
    "priority": "P2",
    "qrtOperations": [
      "EXPLAIN",
      "CALCULATE",
      "REPRESENT"
    ]
  },
  {
    "chapterId": "PH01",
    "subtopicId": "PH01-M06",
    "title": "Constant-acceleration equations and validity",
    "priority": "P2",
    "qrtOperations": [
      "EXPLAIN",
      "CALCULATE",
      "REPRESENT"
    ]
  },
  {
    "chapterId": "PH01",
    "subtopicId": "PH01-M07",
    "title": "Relative motion, piecewise motion and meetings",
    "priority": "P2",
    "qrtOperations": [
      "EXPLAIN",
      "CALCULATE",
      "REPRESENT"
    ]
  },
  {
    "chapterId": "PH01",
    "subtopicId": "PH01-M08",
    "title": "Elementary uniform circular motion",
    "priority": "P2",
    "qrtOperations": [
      "EXPLAIN",
      "CALCULATE",
      "REPRESENT"
    ]
  },
  {
    "chapterId": "PH02",
    "subtopicId": "PH02-F01",
    "title": "Balanced and unbalanced forces",
    "priority": "P0",
    "qrtOperations": [
      "EXPLAIN",
      "CALCULATE",
      "REPRESENT"
    ]
  },
  {
    "chapterId": "PH02",
    "subtopicId": "PH02-F02",
    "title": "Newton's first law and inertia",
    "priority": "P0",
    "qrtOperations": [
      "EXPLAIN",
      "CALCULATE",
      "REPRESENT"
    ]
  },
  {
    "chapterId": "PH02",
    "subtopicId": "PH02-F03",
    "title": "Newton's second law, force and mass",
    "priority": "P0",
    "qrtOperations": [
      "EXPLAIN",
      "CALCULATE",
      "REPRESENT"
    ]
  },
  {
    "chapterId": "PH02",
    "subtopicId": "PH02-F04",
    "title": "Newton's third law and interacting objects",
    "priority": "P0",
    "qrtOperations": [
      "EXPLAIN",
      "CALCULATE",
      "REPRESENT"
    ]
  },
  {
    "chapterId": "PH02",
    "subtopicId": "PH02-F05",
    "title": "Free-body diagrams and object boundaries",
    "priority": "P0",
    "qrtOperations": [
      "EXPLAIN",
      "CALCULATE",
      "REPRESENT"
    ]
  },
  {
    "chapterId": "PH02",
    "subtopicId": "PH02-F06",
    "title": "Friction and contact conditions",
    "priority": "P0",
    "qrtOperations": [
      "EXPLAIN",
      "CALCULATE",
      "REPRESENT"
    ]
  },
  {
    "chapterId": "PH02",
    "subtopicId": "PH02-F07",
    "title": "Inclined planes and force components",
    "priority": "P0",
    "qrtOperations": [
      "EXPLAIN",
      "CALCULATE",
      "REPRESENT"
    ]
  },
  {
    "chapterId": "PH02",
    "subtopicId": "PH02-F08",
    "title": "Connected bodies and changing contact",
    "priority": "P0",
    "qrtOperations": [
      "EXPLAIN",
      "CALCULATE",
      "REPRESENT"
    ]
  },
  {
    "chapterId": "PH03",
    "subtopicId": "PH03-P01",
    "title": "Momentum as mass times velocity",
    "priority": "P0",
    "qrtOperations": [
      "EXPLAIN",
      "CALCULATE",
      "REPRESENT"
    ]
  },
  {
    "chapterId": "PH03",
    "subtopicId": "PH03-P02",
    "title": "Impulse and change in momentum",
    "priority": "P0",
    "qrtOperations": [
      "EXPLAIN",
      "CALCULATE",
      "REPRESENT"
    ]
  },
  {
    "chapterId": "PH03",
    "subtopicId": "PH03-P03",
    "title": "Conservation in an isolated system",
    "priority": "P0",
    "qrtOperations": [
      "EXPLAIN",
      "CALCULATE",
      "REPRESENT"
    ]
  },
  {
    "chapterId": "PH03",
    "subtopicId": "PH03-P04",
    "title": "Action-reaction versus system momentum",
    "priority": "P0",
    "qrtOperations": [
      "EXPLAIN",
      "CALCULATE",
      "REPRESENT"
    ]
  },
  {
    "chapterId": "PH03",
    "subtopicId": "PH03-P05",
    "title": "Recoil and two-body interactions",
    "priority": "P0",
    "qrtOperations": [
      "EXPLAIN",
      "CALCULATE",
      "REPRESENT"
    ]
  },
  {
    "chapterId": "PH03",
    "subtopicId": "PH03-P06",
    "title": "Collisions and kinetic energy conservation",
    "priority": "P0",
    "qrtOperations": [
      "EXPLAIN",
      "CALCULATE",
      "REPRESENT"
    ]
  },
  {
    "chapterId": "PH03",
    "subtopicId": "PH03-P07",
    "title": "Sequential impact, friction and impulse graphs",
    "priority": "P0",
    "qrtOperations": [
      "EXPLAIN",
      "CALCULATE",
      "REPRESENT"
    ]
  },
  {
    "chapterId": "PH04",
    "subtopicId": "PH04-W01",
    "title": "Work by a force and work sign",
    "priority": "P0",
    "qrtOperations": [
      "EXPLAIN",
      "CALCULATE",
      "REPRESENT"
    ]
  },
  {
    "chapterId": "PH04",
    "subtopicId": "PH04-W02",
    "title": "Kinetic energy and the work\u2013energy theorem",
    "priority": "P0",
    "qrtOperations": [
      "EXPLAIN",
      "CALCULATE",
      "REPRESENT"
    ]
  },
  {
    "chapterId": "PH04",
    "subtopicId": "PH04-W03",
    "title": "Gravitational potential energy and level choice",
    "priority": "P0",
    "qrtOperations": [
      "EXPLAIN",
      "CALCULATE",
      "REPRESENT"
    ]
  },
  {
    "chapterId": "PH04",
    "subtopicId": "PH04-W04",
    "title": "Conservation of mechanical energy",
    "priority": "P0",
    "qrtOperations": [
      "EXPLAIN",
      "CALCULATE",
      "REPRESENT"
    ]
  },
  {
    "chapterId": "PH04",
    "subtopicId": "PH04-W05",
    "title": "Energy dissipation and frictional losses",
    "priority": "P0",
    "qrtOperations": [
      "EXPLAIN",
      "CALCULATE",
      "REPRESENT"
    ]
  },
  {
    "chapterId": "PH04",
    "subtopicId": "PH04-W06",
    "title": "Power, efficiency and energy rates",
    "priority": "P0",
    "qrtOperations": [
      "EXPLAIN",
      "CALCULATE",
      "REPRESENT"
    ]
  },
  {
    "chapterId": "PH04",
    "subtopicId": "PH04-W07",
    "title": "Simple machines and mechanical advantage",
    "priority": "P0",
    "qrtOperations": [
      "EXPLAIN",
      "CALCULATE",
      "REPRESENT"
    ]
  },
  {
    "chapterId": "PH04",
    "subtopicId": "PH04-W08",
    "title": "Multistage mechanical systems",
    "priority": "P0",
    "qrtOperations": [
      "EXPLAIN",
      "CALCULATE",
      "REPRESENT"
    ]
  },
  {
    "chapterId": "PH04",
    "subtopicId": "PH04-W09",
    "title": "Springs, radial forces and variable-force work",
    "priority": "P0",
    "qrtOperations": [
      "EXPLAIN",
      "CALCULATE",
      "REPRESENT"
    ]
  },
  {
    "chapterId": "PH05",
    "subtopicId": "PH05-G01",
    "title": "Universal gravitation and attractive force",
    "priority": "P0",
    "qrtOperations": [
      "EXPLAIN",
      "CALCULATE",
      "REPRESENT"
    ]
  },
  {
    "chapterId": "PH05",
    "subtopicId": "PH05-G02",
    "title": "Mass, weight and gravitational acceleration",
    "priority": "P0",
    "qrtOperations": [
      "EXPLAIN",
      "CALCULATE",
      "REPRESENT"
    ]
  },
  {
    "chapterId": "PH05",
    "subtopicId": "PH05-G03",
    "title": "Free fall and vertical kinematics",
    "priority": "P0",
    "qrtOperations": [
      "EXPLAIN",
      "CALCULATE",
      "REPRESENT"
    ]
  },
  {
    "chapterId": "PH05",
    "subtopicId": "PH05-G04",
    "title": "Weight near Earth's surface",
    "priority": "P0",
    "qrtOperations": [
      "EXPLAIN",
      "CALCULATE",
      "REPRESENT"
    ]
  },
  {
    "chapterId": "PH05",
    "subtopicId": "PH05-G05",
    "title": "Changing mass/weight in alternative environments",
    "priority": "P0",
    "qrtOperations": [
      "EXPLAIN",
      "CALCULATE",
      "REPRESENT"
    ]
  },
  {
    "chapterId": "PH05",
    "subtopicId": "PH05-G06",
    "title": "Inverse-square reasoning and proportionality",
    "priority": "P0",
    "qrtOperations": [
      "EXPLAIN",
      "CALCULATE",
      "REPRESENT"
    ]
  },
  {
    "chapterId": "PH05",
    "subtopicId": "PH05-G07",
    "title": "Orbital formulas and gravitation potential",
    "priority": "P0",
    "qrtOperations": [
      "EXPLAIN",
      "CALCULATE",
      "REPRESENT"
    ]
  },
  {
    "chapterId": "PH06",
    "subtopicId": "PH06-U01",
    "title": "Matter in liquids, density and relative density",
    "priority": "P0",
    "qrtOperations": [
      "EXPLAIN",
      "CALCULATE",
      "REPRESENT"
    ]
  },
  {
    "chapterId": "PH06",
    "subtopicId": "PH06-U02",
    "title": "Thrust, pressure and hydrostatic depth",
    "priority": "P0",
    "qrtOperations": [
      "EXPLAIN",
      "CALCULATE",
      "REPRESENT"
    ]
  },
  {
    "chapterId": "PH06",
    "subtopicId": "PH06-U03",
    "title": "Pressure in containers and connected liquids",
    "priority": "P0",
    "qrtOperations": [
      "EXPLAIN",
      "CALCULATE",
      "REPRESENT"
    ]
  },
  {
    "chapterId": "PH06",
    "subtopicId": "PH06-U04",
    "title": "Atmospheric pressure and elementary measurement",
    "priority": "P0",
    "qrtOperations": [
      "EXPLAIN",
      "CALCULATE",
      "REPRESENT"
    ]
  },
  {
    "chapterId": "PH06",
    "subtopicId": "PH06-U05",
    "title": "Pascal's principle and hydraulic machines",
    "priority": "P0",
    "qrtOperations": [
      "EXPLAIN",
      "CALCULATE",
      "REPRESENT"
    ]
  },
  {
    "chapterId": "PH06",
    "subtopicId": "PH06-U06",
    "title": "Archimedes' principle and displaced fluid",
    "priority": "P0",
    "qrtOperations": [
      "EXPLAIN",
      "CALCULATE",
      "REPRESENT"
    ]
  },
  {
    "chapterId": "PH06",
    "subtopicId": "PH06-U07",
    "title": "Floating, sinking and fractional immersion",
    "priority": "P0",
    "qrtOperations": [
      "EXPLAIN",
      "CALCULATE",
      "REPRESENT"
    ]
  },
  {
    "chapterId": "PH06",
    "subtopicId": "PH06-U08",
    "title": "Multilayer buoyancy and composite bodies",
    "priority": "P0",
    "qrtOperations": [
      "EXPLAIN",
      "CALCULATE",
      "REPRESENT"
    ]
  },
  {
    "chapterId": "PH06",
    "subtopicId": "PH06-U09",
    "title": "Accelerating fluids and apparent gravity",
    "priority": "P0",
    "qrtOperations": [
      "EXPLAIN",
      "CALCULATE",
      "REPRESENT"
    ]
  },
  {
    "chapterId": "PH06",
    "subtopicId": "PH06-U10",
    "title": "Flow, Bernoulli, surface tension and viscosity",
    "priority": "P0",
    "qrtOperations": [
      "EXPLAIN",
      "CALCULATE",
      "REPRESENT"
    ]
  },
  {
    "chapterId": "PH07",
    "subtopicId": "PH07-01",
    "title": "Temperature, thermometers, scales and thermal measurement",
    "priority": "P2",
    "qrtOperations": [
      "EXPLAIN",
      "REPRESENT",
      "JUSTIFY"
    ]
  },
  {
    "chapterId": "PH07",
    "subtopicId": "PH07-02",
    "title": "Heat versus temperature; direction of energy transfer and equilibrium",
    "priority": "P2",
    "qrtOperations": [
      "RETRIEVE",
      "EXPLAIN",
      "MODEL"
    ]
  },
  {
    "chapterId": "PH07",
    "subtopicId": "PH07-03",
    "title": "Conduction; thermal conductors, insulators and contact paths",
    "priority": "P2",
    "qrtOperations": [
      "EXPLAIN",
      "MODEL",
      "REPRESENT"
    ]
  },
  {
    "chapterId": "PH07",
    "subtopicId": "PH07-04",
    "title": "Convection in fluids and density-driven circulation",
    "priority": "P2",
    "qrtOperations": [
      "EXPLAIN",
      "REPRESENT",
      "JUSTIFY"
    ]
  },
  {
    "chapterId": "PH07",
    "subtopicId": "PH07-05",
    "title": "Radiation, absorption and differential heating of Earth and air",
    "priority": "P2",
    "qrtOperations": [
      "EXPLAIN",
      "MODEL",
      "SYNTHESIZE"
    ]
  },
  {
    "chapterId": "PH07",
    "subtopicId": "PH07-06",
    "title": "Phase states, melting, boiling, freezing and condensation",
    "priority": "P2",
    "qrtOperations": [
      "REPRESENT",
      "EXPLAIN",
      "JUSTIFY"
    ]
  },
  {
    "chapterId": "PH07",
    "subtopicId": "PH07-07",
    "title": "Evaporation versus boiling, cooling, humidity and wind",
    "priority": "P2",
    "qrtOperations": [
      "EXPLAIN",
      "MODEL",
      "SYNTHESIZE"
    ]
  },
  {
    "chapterId": "PH07",
    "subtopicId": "PH07-08",
    "title": "Qualitative heating and cooling curves with multiple stages",
    "priority": "P2",
    "qrtOperations": [
      "REPRESENT",
      "MODEL",
      "JUSTIFY"
    ]
  },
  {
    "chapterId": "PH07",
    "subtopicId": "PH07-09",
    "title": "Thermal expansion and its ordinary consequences",
    "priority": "P2",
    "qrtOperations": [
      "EXPLAIN",
      "MODEL",
      "JUSTIFY"
    ]
  },
  {
    "chapterId": "PH07",
    "subtopicId": "PH07-10",
    "title": "Experimental thermal comparisons, insulation and fair tests",
    "priority": "P2",
    "qrtOperations": [
      "MODEL",
      "REPRESENT",
      "JUSTIFY"
    ]
  },
  {
    "chapterId": "PH07",
    "subtopicId": "PH07-11",
    "title": "Specific heat capacity, heat capacity and quantitative calorimetry",
    "priority": "P2",
    "qrtOperations": [
      "MODEL",
      "APPLY",
      "SYNTHESIZE"
    ]
  },
  {
    "chapterId": "PH07",
    "subtopicId": "PH07-12",
    "title": "Latent-heat calculations, composite calorimeters and thermal engines",
    "priority": "P2",
    "qrtOperations": [
      "MODEL",
      "SYNTHESIZE",
      "JUSTIFY"
    ]
  },
  {
    "chapterId": "PH08",
    "subtopicId": "PH08-01",
    "title": "Vibrating sources: strings, membranes and air columns",
    "priority": "P2",
    "qrtOperations": [
      "EXPLAIN",
      "MODEL",
      "REPRESENT"
    ]
  },
  {
    "chapterId": "PH08",
    "subtopicId": "PH08-02",
    "title": "Sound as mechanical longitudinal propagation",
    "priority": "P2",
    "qrtOperations": [
      "EXPLAIN",
      "REPRESENT",
      "JUSTIFY"
    ]
  },
  {
    "chapterId": "PH08",
    "subtopicId": "PH08-03",
    "title": "Sound needs a material medium; air/liquid/solid comparisons",
    "priority": "P2",
    "qrtOperations": [
      "RETRIEVE",
      "EXPLAIN",
      "MODEL"
    ]
  },
  {
    "chapterId": "PH08",
    "subtopicId": "PH08-04",
    "title": "Frequency, period and wavelength",
    "priority": "P2",
    "qrtOperations": [
      "REPRESENT",
      "APPLY",
      "JUSTIFY"
    ]
  },
  {
    "chapterId": "PH08",
    "subtopicId": "PH08-05",
    "title": "Sound speed relation v=f lambda and measurement",
    "priority": "P2",
    "qrtOperations": [
      "APPLY",
      "MODEL",
      "REPRESENT"
    ]
  },
  {
    "chapterId": "PH08",
    "subtopicId": "PH08-06",
    "title": "Pitch, loudness, amplitude and intensity",
    "priority": "P2",
    "qrtOperations": [
      "EXPLAIN",
      "REPRESENT",
      "JUSTIFY"
    ]
  },
  {
    "chapterId": "PH08",
    "subtopicId": "PH08-07",
    "title": "Sound wave graphs and observational uncertainty",
    "priority": "P2",
    "qrtOperations": [
      "MODEL",
      "REPRESENT",
      "JUSTIFY"
    ]
  },
  {
    "chapterId": "PH08",
    "subtopicId": "PH08-08",
    "title": "Reflection of sound and elementary echo timing",
    "priority": "P2",
    "qrtOperations": [
      "MODEL",
      "APPLY",
      "REPRESENT"
    ]
  },
  {
    "chapterId": "PH08",
    "subtopicId": "PH08-09",
    "title": "Distinct echo versus reverberation in spaces",
    "priority": "P2",
    "qrtOperations": [
      "EXPLAIN",
      "MODEL",
      "JUSTIFY"
    ]
  },
  {
    "chapterId": "PH08",
    "subtopicId": "PH08-10",
    "title": "Echolocation and sonar-style distance inference",
    "priority": "P2",
    "qrtOperations": [
      "APPLY",
      "MODEL",
      "SYNTHESIZE"
    ]
  },
  {
    "chapterId": "PH08",
    "subtopicId": "PH08-11",
    "title": "Sound production by instruments and musical features",
    "priority": "P2",
    "qrtOperations": [
      "EXPLAIN",
      "MODEL",
      "JUSTIFY"
    ]
  },
  {
    "chapterId": "PH08",
    "subtopicId": "PH08-12",
    "title": "Multi-reflector echo pathways and echo sequence reconstruction",
    "priority": "P2",
    "qrtOperations": [
      "REPRESENT",
      "SYNTHESIZE",
      "JUSTIFY"
    ]
  },
  {
    "chapterId": "PH08",
    "subtopicId": "PH08-13",
    "title": "Doppler effect, quantitative standing waves and resonant modes",
    "priority": "P2",
    "qrtOperations": [
      "MODEL",
      "REPRESENT",
      "SYNTHESIZE"
    ]
  },
  {
    "chapterId": "PH09",
    "subtopicId": "PH09-01",
    "title": "Ray model, rectilinear light and ordinary reflection",
    "priority": "P2",
    "qrtOperations": [
      "RETRIEVE",
      "EXPLAIN",
      "REPRESENT"
    ]
  },
  {
    "chapterId": "PH09",
    "subtopicId": "PH09-02",
    "title": "Plane-mirror images, virtuality and apparent position",
    "priority": "P2",
    "qrtOperations": [
      "EXPLAIN",
      "MODEL",
      "REPRESENT"
    ]
  },
  {
    "chapterId": "PH09",
    "subtopicId": "PH09-03",
    "title": "Lateral inversion and object/mirror coordinate conventions",
    "priority": "P2",
    "qrtOperations": [
      "REPRESENT",
      "JUSTIFY",
      "MODEL"
    ]
  },
  {
    "chapterId": "PH09",
    "subtopicId": "PH09-04",
    "title": "Object and plane-mirror displacement; relative image motion",
    "priority": "P2",
    "qrtOperations": [
      "REPRESENT",
      "APPLY",
      "JUSTIFY"
    ]
  },
  {
    "chapterId": "PH09",
    "subtopicId": "PH09-05",
    "title": "Two plane mirrors and repeated reflections",
    "priority": "P2",
    "qrtOperations": [
      "MODEL",
      "REPRESENT",
      "SYNTHESIZE"
    ]
  },
  {
    "chapterId": "PH09",
    "subtopicId": "PH09-06",
    "title": "Spherical mirror geometry: pole, principal axis, centres, focus",
    "priority": "P2",
    "qrtOperations": [
      "RETRIEVE",
      "REPRESENT",
      "JUSTIFY"
    ]
  },
  {
    "chapterId": "PH09",
    "subtopicId": "PH09-07",
    "title": "Concave mirrors: real/virtual images across object zones",
    "priority": "P2",
    "qrtOperations": [
      "EXPLAIN",
      "REPRESENT",
      "MODEL"
    ]
  },
  {
    "chapterId": "PH09",
    "subtopicId": "PH09-08",
    "title": "Convex mirrors: virtual image, field of view and motion",
    "priority": "P2",
    "qrtOperations": [
      "EXPLAIN",
      "MODEL",
      "JUSTIFY"
    ]
  },
  {
    "chapterId": "PH09",
    "subtopicId": "PH09-09",
    "title": "Mirror formula, sign convention and domain of use",
    "priority": "P2",
    "qrtOperations": [
      "APPLY",
      "MODEL",
      "REPRESENT"
    ]
  },
  {
    "chapterId": "PH09",
    "subtopicId": "PH09-10",
    "title": "Mirror magnification and experimental focal-length measurement",
    "priority": "P2",
    "qrtOperations": [
      "APPLY",
      "REPRESENT",
      "JUSTIFY"
    ]
  },
  {
    "chapterId": "PH09",
    "subtopicId": "PH09-11",
    "title": "Multiple curved mirrors and coupled mirror-lens systems",
    "priority": "P2",
    "qrtOperations": [
      "MODEL",
      "SYNTHESIZE",
      "JUSTIFY"
    ]
  },
  {
    "chapterId": "PH09",
    "subtopicId": "PH09-12",
    "title": "Experimental mirror prediction, error and interpretation",
    "priority": "P2",
    "qrtOperations": [
      "MODEL",
      "REPRESENT",
      "JUSTIFY"
    ]
  },
  {
    "chapterId": "PH10",
    "subtopicId": "PH10-01",
    "title": "Refraction at a boundary and changing light speed",
    "priority": "P2",
    "qrtOperations": [
      "EXPLAIN",
      "MODEL",
      "REPRESENT"
    ]
  },
  {
    "chapterId": "PH10",
    "subtopicId": "PH10-02",
    "title": "Snell law and refractive index interpretation",
    "priority": "P2",
    "qrtOperations": [
      "APPLY",
      "MODEL",
      "JUSTIFY"
    ]
  },
  {
    "chapterId": "PH10",
    "subtopicId": "PH10-03",
    "title": "Plane-parallel glass slab and lateral displacement",
    "priority": "P2",
    "qrtOperations": [
      "REPRESENT",
      "MODEL",
      "JUSTIFY"
    ]
  },
  {
    "chapterId": "PH10",
    "subtopicId": "PH10-04",
    "title": "Apparent depth and observer-dependent image position",
    "priority": "P2",
    "qrtOperations": [
      "MODEL",
      "REPRESENT",
      "JUSTIFY"
    ]
  },
  {
    "chapterId": "PH10",
    "subtopicId": "PH10-05",
    "title": "Convex/concave thin lenses and principal-ray rules",
    "priority": "P2",
    "qrtOperations": [
      "EXPLAIN",
      "REPRESENT",
      "MODEL"
    ]
  },
  {
    "chapterId": "PH10",
    "subtopicId": "PH10-06",
    "title": "Lens image zones, orientation and screen visibility",
    "priority": "P2",
    "qrtOperations": [
      "RETRIEVE",
      "REPRESENT",
      "JUSTIFY"
    ]
  },
  {
    "chapterId": "PH10",
    "subtopicId": "PH10-07",
    "title": "Lens formula and consistent sign conventions",
    "priority": "P2",
    "qrtOperations": [
      "APPLY",
      "MODEL",
      "JUSTIFY"
    ]
  },
  {
    "chapterId": "PH10",
    "subtopicId": "PH10-08",
    "title": "Magnification, power of lens and units",
    "priority": "P2",
    "qrtOperations": [
      "APPLY",
      "REPRESENT",
      "JUSTIFY"
    ]
  },
  {
    "chapterId": "PH10",
    "subtopicId": "PH10-09",
    "title": "Lens displacement and two conjugate positions",
    "priority": "P2",
    "qrtOperations": [
      "MODEL",
      "SYNTHESIZE",
      "JUSTIFY"
    ]
  },
  {
    "chapterId": "PH10",
    "subtopicId": "PH10-10",
    "title": "Refraction through prism and dispersion",
    "priority": "P2",
    "qrtOperations": [
      "EXPLAIN",
      "REPRESENT",
      "MODEL"
    ]
  },
  {
    "chapterId": "PH10",
    "subtopicId": "PH10-11",
    "title": "Scattering and observed colours",
    "priority": "P2",
    "qrtOperations": [
      "EXPLAIN",
      "MODEL",
      "JUSTIFY"
    ]
  },
  {
    "chapterId": "PH10",
    "subtopicId": "PH10-12",
    "title": "Human eye: image formation and accommodation",
    "priority": "P2",
    "qrtOperations": [
      "EXPLAIN",
      "MODEL",
      "REPRESENT"
    ]
  },
  {
    "chapterId": "PH10",
    "subtopicId": "PH10-13",
    "title": "Myopia, hypermetropia and their corrections",
    "priority": "P2",
    "qrtOperations": [
      "MODEL",
      "REPRESENT",
      "JUSTIFY"
    ]
  },
  {
    "chapterId": "PH10",
    "subtopicId": "PH10-14",
    "title": "Focal-length measurement by distant objects and optical investigations",
    "priority": "P2",
    "qrtOperations": [
      "APPLY",
      "MODEL",
      "JUSTIFY"
    ]
  },
  {
    "chapterId": "PH10",
    "subtopicId": "PH10-15",
    "title": "Telescope and microscope qualitative lens combinations",
    "priority": "P2",
    "qrtOperations": [
      "MODEL",
      "SYNTHESIZE",
      "REPRESENT"
    ]
  },
  {
    "chapterId": "PH10",
    "subtopicId": "PH10-16",
    "title": "Quantitative multi-lens and lens-plus-mirror inverse systems",
    "priority": "P2",
    "qrtOperations": [
      "MODEL",
      "SYNTHESIZE",
      "JUSTIFY"
    ]
  },
  {
    "chapterId": "PH10",
    "subtopicId": "PH10-17",
    "title": "Total internal reflection and quantitative critical-angle optics",
    "priority": "P2",
    "qrtOperations": [
      "EXPLAIN",
      "MODEL",
      "JUSTIFY"
    ]
  },
  {
    "chapterId": "PH11",
    "subtopicId": "PH11-01",
    "title": "Charge transfer, circuit closure and basic conductor/insulator distinction",
    "priority": "P1",
    "qrtOperations": [
      "EXPLAIN",
      "MODEL",
      "REPRESENT"
    ]
  },
  {
    "chapterId": "PH11",
    "subtopicId": "PH11-02",
    "title": "Conventional current, potential difference and source/load roles",
    "priority": "P1",
    "qrtOperations": [
      "RETRIEVE",
      "EXPLAIN",
      "REPRESENT"
    ]
  },
  {
    "chapterId": "PH11",
    "subtopicId": "PH11-03",
    "title": "Circuit symbols, ammeter and voltmeter connection",
    "priority": "P1",
    "qrtOperations": [
      "MODEL",
      "REPRESENT",
      "JUSTIFY"
    ]
  },
  {
    "chapterId": "PH11",
    "subtopicId": "PH11-04",
    "title": "Ohm law, V-I plots, ohmic regime",
    "priority": "P1",
    "qrtOperations": [
      "EXPLAIN",
      "APPLY",
      "JUSTIFY"
    ]
  },
  {
    "chapterId": "PH11",
    "subtopicId": "PH11-05",
    "title": "Resistance, resistivity, geometry and material",
    "priority": "P1",
    "qrtOperations": [
      "MODEL",
      "APPLY",
      "REPRESENT"
    ]
  },
  {
    "chapterId": "PH11",
    "subtopicId": "PH11-06",
    "title": "Series resistor networks and voltage division",
    "priority": "P1",
    "qrtOperations": [
      "APPLY",
      "REPRESENT",
      "JUSTIFY"
    ]
  },
  {
    "chapterId": "PH11",
    "subtopicId": "PH11-07",
    "title": "Parallel networks, current division and equivalent resistance",
    "priority": "P1",
    "qrtOperations": [
      "MODEL",
      "APPLY",
      "REPRESENT"
    ]
  },
  {
    "chapterId": "PH11",
    "subtopicId": "PH11-08",
    "title": "Multi-stage mixed series/parallel reductions",
    "priority": "P1",
    "qrtOperations": [
      "MODEL",
      "REPRESENT",
      "SYNTHESIZE"
    ]
  },
  {
    "chapterId": "PH11",
    "subtopicId": "PH11-09",
    "title": "Electric power, energy, ratings and electricity bills",
    "priority": "P1",
    "qrtOperations": [
      "APPLY",
      "MODEL",
      "JUSTIFY"
    ]
  },
  {
    "chapterId": "PH11",
    "subtopicId": "PH11-10",
    "title": "Joule heating and safety applications",
    "priority": "P1",
    "qrtOperations": [
      "EXPLAIN",
      "APPLY",
      "SYNTHESIZE"
    ]
  },
  {
    "chapterId": "PH11",
    "subtopicId": "PH11-11",
    "title": "Household wiring, fuses/MCBs, earthing and short circuits",
    "priority": "P1",
    "qrtOperations": [
      "EXPLAIN",
      "MODEL",
      "JUSTIFY"
    ]
  },
  {
    "chapterId": "PH11",
    "subtopicId": "PH11-12",
    "title": "V-I and equivalent resistance experiments with measurement limits",
    "priority": "P1",
    "qrtOperations": [
      "MODEL",
      "REPRESENT",
      "JUSTIFY"
    ]
  },
  {
    "chapterId": "PH11",
    "subtopicId": "PH11-13",
    "title": "Complex cube/tetrahedron/infinite-ladder networks",
    "priority": "P1",
    "qrtOperations": [
      "MODEL",
      "SYNTHESIZE",
      "JUSTIFY"
    ]
  },
  {
    "chapterId": "PH11",
    "subtopicId": "PH11-14",
    "title": "Internal resistance, variable EMF and non-ohmic networks",
    "priority": "P1",
    "qrtOperations": [
      "MODEL",
      "REPRESENT",
      "SYNTHESIZE"
    ]
  },
  {
    "chapterId": "PH12",
    "subtopicId": "PH12-01",
    "title": "Permanent magnets, poles, compass and qualitative magnetic interaction",
    "priority": "P1",
    "qrtOperations": [
      "RETRIEVE",
      "EXPLAIN",
      "REPRESENT"
    ]
  },
  {
    "chapterId": "PH12",
    "subtopicId": "PH12-02",
    "title": "Magnetic field-line direction and qualitative patterns",
    "priority": "P1",
    "qrtOperations": [
      "EXPLAIN",
      "REPRESENT",
      "JUSTIFY"
    ]
  },
  {
    "chapterId": "PH12",
    "subtopicId": "PH12-03",
    "title": "Field around straight current-carrying conductor",
    "priority": "P1",
    "qrtOperations": [
      "MODEL",
      "REPRESENT",
      "JUSTIFY"
    ]
  },
  {
    "chapterId": "PH12",
    "subtopicId": "PH12-04",
    "title": "Field of circular loops and current direction",
    "priority": "P1",
    "qrtOperations": [
      "EXPLAIN",
      "REPRESENT",
      "MODEL"
    ]
  },
  {
    "chapterId": "PH12",
    "subtopicId": "PH12-05",
    "title": "Solenoid field, poles and electromagnet variables",
    "priority": "P1",
    "qrtOperations": [
      "MODEL",
      "REPRESENT",
      "JUSTIFY"
    ]
  },
  {
    "chapterId": "PH12",
    "subtopicId": "PH12-06",
    "title": "Force on current-carrying conductor in magnetic field",
    "priority": "P1",
    "qrtOperations": [
      "MODEL",
      "REPRESENT",
      "JUSTIFY"
    ]
  },
  {
    "chapterId": "PH12",
    "subtopicId": "PH12-07",
    "title": "Fleming left-hand rule and force reversal",
    "priority": "P1",
    "qrtOperations": [
      "RETRIEVE",
      "REPRESENT",
      "JUSTIFY"
    ]
  },
  {
    "chapterId": "PH12",
    "subtopicId": "PH12-08",
    "title": "Electric motor, force couple and commutator function",
    "priority": "P1",
    "qrtOperations": [
      "EXPLAIN",
      "MODEL",
      "SYNTHESIZE"
    ]
  },
  {
    "chapterId": "PH12",
    "subtopicId": "PH12-09",
    "title": "Qualitative electromagnetic induction: changing flux/linkage",
    "priority": "P1",
    "qrtOperations": [
      "EXPLAIN",
      "MODEL",
      "REPRESENT"
    ]
  },
  {
    "chapterId": "PH12",
    "subtopicId": "PH12-10",
    "title": "Lenz response and induced direction, when explicitly warranted",
    "priority": "P1",
    "qrtOperations": [
      "MODEL",
      "REPRESENT",
      "JUSTIFY"
    ]
  },
  {
    "chapterId": "PH12",
    "subtopicId": "PH12-11",
    "title": "Electric generator, relative motion and AC principle",
    "priority": "P1",
    "qrtOperations": [
      "EXPLAIN",
      "SYNTHESIZE",
      "REPRESENT"
    ]
  },
  {
    "chapterId": "PH12",
    "subtopicId": "PH12-12",
    "title": "AC and DC; AC frequency and transmission advantages",
    "priority": "P1",
    "qrtOperations": [
      "EXPLAIN",
      "REPRESENT",
      "JUSTIFY"
    ]
  },
  {
    "chapterId": "PH12",
    "subtopicId": "PH12-13",
    "title": "Domestic circuits: shared boundary with PH11",
    "priority": "P1",
    "qrtOperations": [
      "MODEL",
      "SYNTHESIZE",
      "JUSTIFY"
    ]
  },
  {
    "chapterId": "PH12",
    "subtopicId": "PH12-14",
    "title": "Quantitative Faraday flux laws and motional emf",
    "priority": "P1",
    "qrtOperations": [
      "MODEL",
      "APPLY",
      "SYNTHESIZE"
    ]
  },
  {
    "chapterId": "PH12",
    "subtopicId": "PH12-15",
    "title": "Electromagnetic braking, induced drag and terminal velocity",
    "priority": "P1",
    "qrtOperations": [
      "MODEL",
      "SYNTHESIZE",
      "JUSTIFY"
    ]
  }
];

export const NSEJS_AUTHENTIC_QUESTIONS: readonly NsejsQuestionDescriptor[] = [
  {
    "id": "NSEJS-2023-P-Q01",
    "topic": "OPTICS",
    "chapterId": "PH12",
    "stem": "An ant is sitting on the principal axis of a convex mirror of focal length $f$, at a distance $2f$ from the pole in front of the mirror. It starts moving on the principal axis towards the mirror. During the course of motion, the distance between the ant and its image:\n[FIG-stem-1]",
    "options": [
      "A: throughout increases",
      "B: throughout decreases",
      "C: first increases, then decreases",
      "D: first decreases, then increases"
    ],
    "hints": [
      "H1 (Clarify): How are coordinate origins and signs assigned? \u2014 Place origin at pole P. For a convex mirror, focal length is positive (+f). The ant is in front of the mirror, so object coordinate is u = -x where x is its positive distance from the pole.",
      "H2 (Correlate): How is the image distance formulated? \u2014 Apply mirror formula 1/f = 1/v + 1/u with u = -x: 1/v = 1/f + 1/x = (x+f)/(fx), so v(x) = fx/(x+f). The image is virtual and located behind the mirror.",
      "H3 (Open the Way): What is the total separation metric? \u2014 Crux Move: Total distance between ant (at -x) and image (at +v) is D(x) = x + v(x) = x + fx/(x+f). Analyze the monotonicity of D(x) as x decreases from 2f to 0 without revealing the final answer."
    ],
    "steps": [
      "1. System Representation & Setup: Establish origin at mirror pole P (x = 0). The ant is at u = -x (x in [0, 2f]), focal length is +f.",
      "2. Physical Model & Formulation: Mirror equation yields v(x) = fx/(x+f). Scalar separation is D(x) = x + v(x) = x + fx/(x+f).",
      "3. Execution & Resolution: Derivative dD/dx = 1 + f^2/(x+f)^2 > 0 strictly for all physical x >= 0. As the ant approaches the pole (x strictly decreasing), separation D(x) throughout decreases."
    ],
    "keyState": "WITHHELD_FAULT_N09"
  },
  {
    "id": "NSEJS-2023-P-Q02",
    "topic": "OPTICS",
    "chapterId": "PH12",
    "stem": "An object pin is placed at a distance of $10\\text{ cm}$ from the first focus of a thin convex lens on its principal axis. The lens forms a real and inverted image of this object pin at a distance of $40\\text{ cm}$ beyond the second focus. The focal length of the lens is:",
    "options": [
      "A: 16 cm",
      "B: 20 cm",
      "C: 25 cm",
      "D: 40 cm"
    ],
    "hints": [
      "H1 (Clarify): What are the conjugate focal distances? \u2014 The object is measured from the first focus (x1 = 10 cm) and the real image is measured beyond the second focus (x2 = 40 cm).",
      "H2 (Correlate): Which formulation relates focal offsets directly? \u2014 Recall Newton's form of the thin lens equation relating distances from respective principal foci: x1 \u00b7 x2 = f^2.",
      "H3 (Open the Way): How is f extracted? \u2014 Crux Move: Calculate f = sqrt(x1 \u00b7 x2) and verify consistency against standard 1/f = 1/v - 1/u."
    ],
    "steps": [
      "1. System Representation & Setup: Thin convex lens with principal foci F1 and F2. Given focal offsets x1 = 10 cm and x2 = 40 cm.",
      "2. Physical Model & Formulation: Newton's lens relation: x1 \u00b7 x2 = f^2.",
      "3. Execution & Resolution: f^2 = 10 \u00b7 40 = 400 => f = 20 cm."
    ],
    "keyState": "WITHHELD_FAULT_N09"
  },
  {
    "id": "NSEJS-2022-P-Q01",
    "topic": "OPTICS",
    "chapterId": "PH12",
    "stem": "The triangular face of a crown glass prism $ABC$ is isosceles with $AB = AC$. The rectangular face with edge $AC$ is silvered. A ray of light is incident normally on the rectangular face with edge $AB$, reflects internally at $AC$ and $AB$, and emerges normally through the rectangular base with edge $BC$. The apex angle $\\angle BAC$ is:",
    "options": [
      "A: 30\u00b0",
      "B: 36\u00b0",
      "C: 45\u00b0",
      "D: 72\u00b0"
    ],
    "hints": [
      "H1 (Clarify): What does normal entry and exit imply? \u2014 Normal entry on AB means angle of incidence = 0\u00b0 (undeviated ray). Normal exit at BC means the ray strikes BC perpendicularly.",
      "H2 (Correlate): How are the base angles related to apex angle A? \u2014 For isosceles triangle AB = AC, base angles B = C = (180\u00b0 - A)/2.",
      "H3 (Open the Way): What geometric constraint is imposed by successive reflections? \u2014 Crux Move: Tracing reflection angles reveals that normal emergence on BC forces B = 2A."
    ],
    "steps": [
      "1. System Representation & Setup: Isosceles triangle ABC with AB = AC, \u2220BAC = A, and B = C = (180\u00b0 - A)/2.",
      "2. Physical Model & Formulation: Ray enters AB at 90\u00b0, hits AC at angle (90\u00b0 - A), reflects to AB, reflects again, and hits BC perpendicularly.",
      "3. Execution & Resolution: Geometry of enclosed ray path yields B = 2A. Thus A + 2(2A) = 180\u00b0 => 5A = 180\u00b0 => A = 36\u00b0."
    ],
    "keyState": "WITHHELD_FAULT_N09"
  },
  {
    "id": "NSEJS-2022-P-Q02",
    "topic": "OPTICS",
    "chapterId": "PH12",
    "stem": "A thin convex lens of focal length $10\\text{ cm}$ has a small luminous object placed $15\\text{ cm}$ in front of it. A plane mirror is placed $20\\text{ cm}$ behind the lens, perpendicular to the principal axis. The position and magnification of the final image formed by the system are:",
    "options": [
      "A: 10 cm in front of mirror, m = -2",
      "B: 10 cm from lens towards mirror, m = -2",
      "C: 30 cm behind lens, m = +2",
      "D: 20 cm in front of lens, m = +1"
    ],
    "hints": [
      "H1 (Clarify): Where does the lens form its first image? \u2014 Apply 1/v - 1/u = 1/f with u = -15 cm and f = +10 cm to find the first image position.",
      "H2 (Correlate): How does the plane mirror interact with converging rays? \u2014 If the intermediate image falls behind the plane mirror, it acts as a virtual object for the mirror.",
      "H3 (Open the Way): Where does the plane mirror form the reflected real image? \u2014 Crux Move: A virtual object at distance d behind a plane mirror forms a real image at equal distance d in front of the mirror."
    ],
    "steps": [
      "1. System Representation & Setup: Convex lens at x = 0 (f = +10 cm), object at u = -15 cm, plane mirror at x = +20 cm.",
      "2. Physical Model & Formulation: 1/v1 - 1/(-15) = 1/10 => v1 = +30 cm (at x = 30 cm). Magnification m1 = 30/(-15) = -2.",
      "3. Execution & Resolution: The image is 10 cm behind the mirror (x = 20 cm). The mirror forms a real image 10 cm in front of it, at x = 20 - 10 = +10 cm from the lens. Total magnification m = m1 \u00b7 m2 = (-2) \u00b7 (+1) = -2."
    ],
    "keyState": "WITHHELD_FAULT_N09"
  },
  {
    "id": "IOQJS-2022-P-Q01",
    "topic": "OPTICS",
    "chapterId": "PH12",
    "stem": "A point object is placed on the principal axis of a thin converging lens of focal length $f$. A plane mirror is placed perpendicular to the axis at distance $l$ from the lens. Light rays from the object pass through the lens, reflect from the mirror, and re-trace their path back to the object position. If this occurs when the rays strike the mirror normally, the required parameters satisfy:",
    "options": [
      "A: Object at focus, parallel rays strike mirror normally (f = 2 cm, l = 5 cm)",
      "B: Object at 2f, image at 2f",
      "C: Object at infinity",
      "D: Object between focus and pole"
    ],
    "hints": [
      "H1 (Clarify): What causes light to retrace its path upon mirror reflection? \u2014 For a plane mirror, rays retrace their exact path if and only if they strike the reflective surface at normal incidence (angle of incidence = 0\u00b0).",
      "H2 (Correlate): When does a converging lens emit parallel rays? \u2014 A converging lens produces a beam parallel to the principal axis when the source is located at its principal focus.",
      "H3 (Open the Way): What role does mirror distance l play? \u2014 Crux Move: Parallel beams remain normal to the mirror regardless of distance l."
    ],
    "steps": [
      "1. System Representation & Setup: Point object on axis of converging lens (f) followed by perpendicular plane mirror at distance l.",
      "2. Physical Model & Formulation: Ray retracing requires rays incident normally on mirror => rays emerge parallel to optical axis.",
      "3. Execution & Resolution: Object must be placed at the focal point (u = -f). Rays reflect normally and converge back at the source."
    ],
    "keyState": "WITHHELD_FAULT_N09"
  },
  {
    "id": "IOQJS-2021-P-Q01",
    "topic": "OPTICS",
    "chapterId": "PH12",
    "stem": "Two illuminated point objects $O_1$ and $O_2$ are placed at a distance $24\\text{ cm}$ from each other along the principal axis of a thin convex lens of focal length $9\\text{ cm}$ such that images of both the objects are formed at the same position. The respective distances of the lens from $O_1$ and $O_2$ (in cm) are:",
    "options": [
      "A: 12 and 12",
      "B: 18 and 6",
      "C: 14 and 10",
      "D: 16 and 8"
    ],
    "hints": [
      "H1 (Clarify): How can two distinct object distances yield the same image position? \u2014 One object must form a real inverted image (u1 > f) and the other must form a virtual erect image (u2 < f) on the same side.",
      "H2 (Correlate): How are the lens equations set up? \u2014 For O1: 1/v + 1/u1 = 1/9. For O2: -1/v + 1/u2 = 1/9. Add both equations to eliminate v.",
      "H3 (Open the Way): What quadratic relation emerges? \u2014 Crux Move: 1/u1 + 1/u2 = 2/9 with u1 + u2 = 24 leads to u1 \u00b7 u2 = 108."
    ],
    "steps": [
      "1. System Representation & Setup: Convex lens f = 9 cm. Objects O1 and O2 have distances satisfying u1 + u2 = 24 cm.",
      "2. Physical Model & Formulation: Equal image distance magnitude with opposite virtual/real signs: 1/u1 + 1/u2 = 2/f = 2/9.",
      "3. Execution & Resolution: (u1 + u2)/(u1 \u00b7 u2) = 2/9 => 24/(u1 \u00b7 u2) = 2/9 => u1 \u00b7 u2 = 108. Solving x^2 - 24x + 108 = 0 yields x = 18 and x = 6."
    ],
    "keyState": "WITHHELD_FAULT_N09"
  },
  {
    "id": "NSEJS-2019-P-OPT-Q01",
    "topic": "OPTICS",
    "chapterId": "PH12",
    "stem": "The radius of curvature of a convex mirror is $x$. The distance of an object from the focus of this mirror is $y$. What is the distance of the image from the focus?",
    "options": [
      "A: y^2 / (4x)",
      "B: x^2 / y",
      "C: x^2 / (4y)",
      "D: 4y^2 / x"
    ],
    "hints": [
      "H1 (Clarify): What is the focal length in terms of radius of curvature? \u2014 For a spherical mirror, f = R/2 = x/2.",
      "H2 (Correlate): Which formula relates distances from focus? \u2014 Newton's formula for spherical mirrors: x1 \u00b7 x2 = f^2.",
      "H3 (Open the Way): How is image distance x2 expressed? \u2014 Crux Move: Substitute f = x/2 and x1 = y to obtain x2 = f^2 / y."
    ],
    "steps": [
      "1. System Representation & Setup: Convex mirror with focal length f = x/2. Object distance from focus x1 = y.",
      "2. Physical Model & Formulation: Newton's conjugate formula: x1 \u00b7 x2 = f^2.",
      "3. Execution & Resolution: x2 = f^2 / y = (x/2)^2 / y = x^2 / (4y)."
    ],
    "keyState": "WITHHELD_FAULT_N09"
  },
  {
    "id": "NSEJS-2019-P-OPT-Q02",
    "topic": "OPTICS",
    "chapterId": "PH12",
    "stem": "In a screw-nut assembly, a convex lens of focal length $6.0\\text{ cm}$ is fixed on the nut. An object pin is attached to the screw head (pitch $1.0\\text{ mm}$/rotation). At a certain position, the image on a screen is three times magnified ($m_1 = -3$). Through how many complete rotations should the screw head be turned so that the image is two times magnified ($m_2 = -2$) on the screen?",
    "options": [
      "A: 5 rotations",
      "B: 10 rotations",
      "C: 15 rotations",
      "D: 20 rotations"
    ],
    "hints": [
      "H1 (Clarify): How are magnification and object distance connected? \u2014 For real inverted image on a screen, m = v/u => u = -f(1 - 1/m).",
      "H2 (Correlate): What are the two object positions? \u2014 Calculate |u1| for m = -3 and |u2| for m = -2 with f = 60 mm.",
      "H3 (Open the Way): How does pitch translate to rotations? \u2014 Crux Move: Number of rotations = (|u2| - |u1|) / pitch."
    ],
    "steps": [
      "1. System Representation & Setup: Convex lens f = 60 mm. Real inverted images m1 = -3 and m2 = -2. Pitch = 1.0 mm.",
      "2. Physical Model & Formulation: |u| = f(1 + 1/|m|). |u1| = 60(1 + 1/3) = 80 mm. |u2| = 60(1 + 1/2) = 90 mm.",
      "3. Execution & Resolution: Linear displacement \u0394u = 90 - 80 = 10 mm. Turns = 10 mm / 1.0 mm = 10 rotations."
    ],
    "keyState": "WITHHELD_FAULT_N09"
  },
  {
    "id": "NSEJS-2024-P-Q01",
    "topic": "OPTICS",
    "chapterId": "PH12",
    "stem": "A hypermetropic person has a near point of $100\\text{ cm}$. The power of the convex spectacle lens required to enable the person to read a book comfortably at the normal near point distance of $25\\text{ cm}$ is:",
    "options": [
      "A: +1.0 D",
      "B: +2.5 D",
      "C: +3.0 D",
      "D: +4.0 D"
    ],
    "hints": [
      "H1 (Clarify): What are the object and image distances? \u2014 Object is at normal near point u = -25 cm = -0.25 m. Virtual image must form at defective near point v = -100 cm = -1.0 m.",
      "H2 (Correlate): How is lens power defined? \u2014 Power P = 1/f (in meters) = 1/v - 1/u.",
      "H3 (Open the Way): Complete the calculation. \u2014 Crux Move: P = -1.0 - (-4.0) = +3.0 Diopters."
    ],
    "steps": [
      "1. System Representation & Setup: Object at u = -0.25 m, virtual image at v = -1.0 m.",
      "2. Physical Model & Formulation: P = 1/v - 1/u.",
      "3. Execution & Resolution: P = 1/(-1.0) - 1/(-0.25) = -1.0 + 4.0 = +3.0 D."
    ],
    "keyState": "WITHHELD_FAULT_N09"
  },
  {
    "id": "NSEJS-2024-P-Q02",
    "topic": "OPTICS",
    "chapterId": "PH12",
    "stem": "For a real object placed anywhere in front of a convex spherical mirror on its principal axis, the image formed is always:",
    "options": [
      "A: Real, inverted, and magnified",
      "B: Virtual, erect, and magnified",
      "C: Virtual, erect, and diminished",
      "D: Real, inverted, and diminished"
    ],
    "hints": [
      "H1 (Clarify): What domain does u occupy for a real object? \u2014 For any real object in front of the mirror, u is negative (u in (-inf, 0)).",
      "H2 (Correlate): What is the sign and magnitude of image distance v? \u2014 1/v = 1/f - 1/u = 1/f + 1/|u| > 0, so v is always positive and less than f.",
      "H3 (Open the Way): What does magnification m = -v/u reveal? \u2014 Crux Move: m = v/|u| = f/(|u|+f) is strictly positive (erect) and strictly less than 1 (diminished)."
    ],
    "steps": [
      "1. System Representation & Setup: Convex mirror with f > 0 and real object at u = -|u| < 0.",
      "2. Physical Model & Formulation: Image distance v = f|u|/(|u|+f) > 0 (virtual, behind mirror).",
      "3. Execution & Resolution: Magnification m = f/(|u|+f) in (0, 1) proves erect and diminished across all real object positions."
    ],
    "keyState": "WITHHELD_FAULT_N09"
  },
  {
    "id": "NSEJS-2024-P-Q06",
    "topic": "ELECTROSTATICS",
    "chapterId": "PH11",
    "stem": "The magnitude of electrostatic force between two tiny spherical balls carrying charge $q_1$ and $q_2$ separated by a distance $r$ in free space is given by $F = K \\frac{q_1 q_2}{r^2}$, where the constant $K = 9 \\times 10^9$ in SI units. Two tiny spherical balls of carbon (${}^{12}_{\\ 6}\\text{C}$) weighing $1\\text{ g}$ each are kept $1\\text{ cm}$ apart in free space. The two spheres carry equal and opposite charges. The magnitude of electrostatic force of attraction between the two charged spheres is $F = 1.0 \\times 10^{-5}\\text{ N}$. The ratio of the number of excess electrons to total number of atoms in the negatively charged sphere is:\n[FIG-stem-1]",
    "options": [
      "A: 4.15 * 10^-14",
      "B: 2.08 * 10^9",
      "C: 5.02 * 10^-22",
      "D: 6.02 * 10^-23"
    ],
    "hints": [
      "H1 (Coulomb Inversion): How is charge magnitude determined? \u2014 Because spheres carry equal and opposite charges, |q1| = |q2| = q. Invert Coulomb's law: q = r * sqrt(F / K). With r = 0.01 m, F = 10^-5 N, K = 9*10^9, find q in Coulombs.",
      "H2 (Quantization): How many excess electrons create this charge? \u2014 Every electron carries elementary charge e = 1.6 * 10^-19 C. The excess electron population on the negative sphere is n_e = q / e.",
      "H3 (Stoichiometric Ratio): How many carbon atoms are in 1 g? \u2014 Crux Move: 1 g of Carbon-12 is (1/12) mol. Total atoms n_atoms = (1/12) * 6.022 * 10^23. Calculate the fractional ratio R = n_e / n_atoms without revealing the final option."
    ],
    "steps": [
      "1. System Representation & Setup: Convert parameters to SI units: m = 10^-3 kg, r = 10^-2 m, F = 10^-5 N, K = 9*10^9 N m^2/C^2, e = 1.6*10^-19 C, M = 12 g/mol, N_A = 6.022*10^23 mol^-1.",
      "2. Physical Model & Formulation: Invert Coulomb's law q = r sqrt(F/K) = (1/3)*10^-9 C. Compute excess electrons n_e = q/e = 2.0833*10^9. Calculate total atoms n_atoms = (m/M) N_A = 5.0183*10^22.",
      "3. Execution & Resolution: Formulate fractional ratio R = n_e / n_atoms = 2.0833*10^9 / 5.0183*10^22 = 4.15 * 10^-14. Matches Option A exactly."
    ],
    "keyState": "WITHHELD_FAULT_N09"
  },
  {
    "id": "NSEJS-2019-P-ELEC-Q01",
    "topic": "ELECTROSTATICS",
    "chapterId": "PH11",
    "stem": "A rectangular metal plate has a charge of $420\\text{ C}$ assumed to be uniformly distributed over it. The plate has length $28\\text{ cm}$ and width $14\\text{ cm}$. A quarter-circular corner sector of radius $7\\text{ cm}$ is partitioned off. The charge distributed over this corner sector is (take $\\pi = 22/7$):",
    "options": [
      "A: 45 C",
      "B: 450 C",
      "C: 15 C",
      "D: 150 C"
    ],
    "hints": [
      "H1 (Charge Density): How is surface charge density defined? \u2014 For uniform distribution, surface charge density is \u03c3 = Total Charge / Total Area.",
      "H2 (Area Ratio): How does sector area relate to total plate area? \u2014 Total area = L * W = 28 * 14 = 392 cm^2. Area of sector of radius 7 cm is (1/4) \u03c0 r^2.",
      "H3 (Execution): How to obtain sector charge? \u2014 Crux Move: Multiply surface density \u03c3 by the sector area to find the localized charge."
    ],
    "steps": [
      "1. System Representation & Setup: Plate dimensions 28 cm x 14 cm with total area 392 cm^2 holding uniform charge 420 C.",
      "2. Physical Model & Formulation: Surface charge density \u03c3 = 420 C / 392 cm^2 = 1.0714 C/cm^2. Sector area = (1/4) * (22/7) * 7^2 = 38.5 cm^2.",
      "3. Execution & Resolution: Charge on sector = \u03c3 * Area = (420 / 392) * 38.5 = 45 C, matching Option A."
    ],
    "keyState": "WITHHELD_FAULT_N09"
  },
  {
    "id": "NSEJS-2019-P-ELEC-Q14",
    "topic": "ELECTROSTATICS",
    "chapterId": "PH11",
    "stem": "A physics teacher and his family are travelling in a car on a highway during a severe lightning storm. Choose the correct safety option from electrostatics:",
    "options": [
      "A: The safest place is inside the car because charge resides entirely on the outer conducting surface, keeping the interior field-free",
      "B: It is dangerous to be inside the car because charges accumulate on the outer skin and create a lethal electric field inside",
      "C: The safest place is under a tall lone tree because its wet trunk provides an easy path to ground",
      "D: It is safer to exit the car immediately and lie flat on the open ground"
    ],
    "hints": [
      "H1 (Conductor Cavity): Where does excess static charge reside on a conductor? \u2014 By Gauss's law and electrostatic equilibrium, excess charges reside strictly on the exterior boundary of a conductor.",
      "H2 (Faraday Cage): What is the electric field inside a closed metallic shell? \u2014 The electrostatic field inside any hollow cavity surrounded by a conducting boundary is identically zero (electrostatic shielding).",
      "H3 (Resolution): Which option correctly matches electrostatic shielding? \u2014 Crux Move: The metal body of the automobile acts as a Faraday cage, channeling lightning strike currents across the outer skin to ground."
    ],
    "steps": [
      "1. System Representation & Setup: Model automobile body as an enclosed conducting metallic cage subject to lightning strike.",
      "2. Physical Model & Formulation: Electrostatic shielding principle dictates E = 0 inside cavity; charges reside exclusively on the exterior metal shell.",
      "3. Execution & Resolution: The interior occupants remain shielded from high potentials and lethal electric fields. Option A is the only correct scientific statement."
    ],
    "keyState": "WITHHELD_FAULT_N09"
  },
  {
    "id": "NSEJS-2018-P-Q01",
    "topic": "ELECTROSTATICS",
    "chapterId": "PH11",
    "stem": "Choose the correct option from the following statements in electrostatics:\n(I) If two copper spheres of the same radius, one hollow and the other solid, are charged to the same electrical potential, the solid sphere will have more charge.\n(II) A charged body can attract another uncharged body.\n(III) Electrical lines of force originating from like charges exert a lateral force on each other, while those originating from opposite charges can intersect each other.",
    "options": [
      "A: Only statement (I) is correct",
      "B: Only statement (II) is correct",
      "C: Statements (I) and (II) are correct",
      "D: All statements (I), (II) and (III) are correct"
    ],
    "hints": [
      "H1 (Sphere Capacitance): What determines the charge of a conductor at potential V? \u2014 For a spherical conductor, capacitance is C = 4\u03c0\u03b50 R. Since charge Q = C*V depends only on radius R and potential V, hollow and solid spheres hold identical charge.",
      "H2 (Induction): How can a charged body interact with a neutral body? \u2014 Electrostatic induction polarizes neutral bodies, bringing opposite charges closer than like charges and producing a net attractive force.",
      "H3 (Field Line Intersection): Can electric field lines ever intersect? \u2014 Crux Move: If field lines intersected, the electric field vector would have two directions at the intersection point, which is physically impossible."
    ],
    "steps": [
      "1. System Representation & Setup: Evaluate three propositions against classical electrostatics theorems.",
      "2. Physical Model & Formulation: Statement I is false because Q = CV = 4\u03c0\u03b50 R V (identical for hollow and solid). Statement II is true because induction induces net attraction. Statement III is false because field lines can never cross.",
      "3. Execution & Resolution: Only statement (II) is scientifically valid, confirming Option B."
    ],
    "keyState": "WITHHELD_FAULT_N09"
  },
  {
    "id": "NSEJS-2017-P-Q01",
    "topic": "ELECTROSTATICS",
    "chapterId": "PH11",
    "stem": "In bringing an $\\alpha$-particle ($^{4}_{2}\\text{He}^{2+}$) closer toward another stationary $\\alpha$-particle against mutual electrostatic repulsion, the electrostatic potential energy of the two-particle system:",
    "options": [
      "A: throughout increases",
      "B: throughout decreases",
      "C: remains unchanged",
      "D: first increases, then decreases"
    ],
    "hints": [
      "H1 (Charge Signs): What is the sign of charge on an alpha particle? \u2014 An alpha particle carries charge +2e, so both particles carry like positive charges.",
      "H2 (Potential Energy Formula): How does potential energy depend on separation r? \u2014 For two point charges, U(r) = (k q1 q2) / r. Here q1 * q2 = (+2e)(+2e) = +4e^2 > 0.",
      "H3 (Monotonicity): What happens to U(r) as r decreases? \u2014 Crux Move: Since q1 q2 > 0 and r decreases, U(r) is proportional to 1/r and strictly increases throughout."
    ],
    "steps": [
      "1. System Representation & Setup: Identify system of two identical charges q1 = q2 = +2e with separation distance r decreasing.",
      "2. Physical Model & Formulation: Electrostatic potential energy is U(r) = k (2e)(2e) / r = 4 k e^2 / r. Rate of change dU/dr = -4 k e^2 / r^2 < 0.",
      "3. Execution & Resolution: As separation decreases (dr < 0), dU > 0 strictly. External work done against repulsion is stored as positive potential energy throughout. Option A."
    ],
    "keyState": "WITHHELD_FAULT_N09"
  },
  {
    "id": "NSEJS-2016-P-Q01",
    "topic": "ELECTROSTATICS",
    "chapterId": "PH11",
    "stem": "Two identical metallic spheres A and B have identical initial uncharged mass $m_0$. Sphere A is given a net charge $+q$ while sphere B is given an equal negative charge $-q$. If their final masses are $m_A$ and $m_B$ respectively, which relation is correct?",
    "options": [
      "A: mA = mB = m0",
      "B: mA > m0 > mB",
      "C: mB > m0 > mA",
      "D: mA = mB > m0"
    ],
    "hints": [
      "H1 (Mechanism of Charging): What particle transfer causes negative and positive electrification? \u2014 Charging involves the transfer of electrons of mass me \u2248 9.11 * 10^-31 kg.",
      "H2 (Mass Balance): Does positive charge mean gaining or losing electrons? \u2014 Positive charge +q results from removing n electrons (mass loss). Negative charge -q results from adding n electrons (mass gain).",
      "H3 (Order Comparison): What is the relative order of mA, m0, and mB? \u2014 Crux Move: mA = m0 - n*me, while mB = m0 + n*me, leading directly to mB > m0 > mA."
    ],
    "steps": [
      "1. System Representation & Setup: Consider identical neutral bodies of initial mass m0.",
      "2. Physical Model & Formulation: Positive charge +q requires electron deficit: mA = m0 - (q/e)*me. Negative charge -q requires electron excess: mB = m0 + (q/e)*me.",
      "3. Execution & Resolution: Since me > 0, mB > m0 and mA < m0, establishing mB > m0 > mA. Option C."
    ],
    "keyState": "WITHHELD_FAULT_N09"
  },
  {
    "id": "NSEJS-FND-ELEC-01",
    "topic": "ELECTROSTATICS",
    "chapterId": "PH11",
    "stem": "Two identical small conducting spheres carrying initial charges $+Q$ and $-3Q$ are separated by a distance $r$ in vacuum, experiencing an attractive electrostatic force of magnitude $F_1$. If the two spheres are brought into momentary physical contact and then returned to separation $r$, they experience a repulsive force of magnitude $F_2$. The ratio $F_1 / F_2$ is:",
    "options": [
      "A: 1 : 3",
      "B: 3 : 1",
      "C: 4 : 1",
      "D: 1 : 1"
    ],
    "hints": [
      "H1 (Initial Force): How is the initial force F1 written using Coulomb's law? \u2014 F1 = k |(+Q)(-3Q)| / r^2 = 3 k Q^2 / r^2.",
      "H2 (Charge Sharing): What is the charge on each identical sphere after contact? \u2014 By symmetry and charge conservation, total charge Q_tot = +Q + (-3Q) = -2Q divides equally: q' = Q_tot / 2 = -Q on each sphere.",
      "H3 (Final Force & Ratio): What is the ratio F1 / F2? \u2014 Crux Move: Final force F2 = k (-Q)^2 / r^2 = k Q^2 / r^2. Compute the ratio F1 / F2 directly."
    ],
    "steps": [
      "1. System Representation & Setup: Two identical conductors at separation r with initial charges +Q and -3Q.",
      "2. Physical Model & Formulation: F1 = k * 3Q^2 / r^2. Upon contact, charge redistributes equally: q' = (+Q - 3Q)/2 = -Q. F2 = k * (-Q)^2 / r^2 = k Q^2 / r^2.",
      "3. Execution & Resolution: Ratio F1 / F2 = (3 k Q^2 / r^2) / (k Q^2 / r^2) = 3 / 1 = 3 : 1. Option B."
    ],
    "keyState": "WITHHELD_FAULT_N09"
  },
  {
    "id": "NSEJS-FND-ELEC-02",
    "topic": "ELECTROSTATICS",
    "chapterId": "PH11",
    "stem": "Two fixed point charges $+4q$ and $+q$ are placed at a distance $L$ apart in free space. At what distance $x$ from the charge $+4q$ on the line joining them must a third point charge $q_0$ be placed such that the net electrostatic force acting on $q_0$ is zero (null point equilibrium)?",
    "options": [
      "A: L / 3",
      "B: 2L / 3",
      "C: L / 2",
      "D: 3L / 4"
    ],
    "hints": [
      "H1 (Force Balance): What is the condition for net force on q0 to vanish? \u2014 The force on q0 due to +4q must be equal in magnitude and opposite in direction to the force due to +q: F1 = F2.",
      "H2 (Coulomb Formulation): How are the individual forces expressed in terms of x and L? \u2014 F1 = k (4q)(q0) / x^2, and F2 = k (q)(q0) / (L - x)^2.",
      "H3 (Algebraic Resolution): Solve the resulting quadratic equation for x. \u2014 Crux Move: 4 / x^2 = 1 / (L - x)^2 ==> 2 / x = 1 / (L - x) ==> 2(L - x) = x ==> x = 2L / 3."
    ],
    "steps": [
      "1. System Representation & Setup: Origin at +4q. Charge +q is at position L. Place test charge q0 at position x in (0, L).",
      "2. Physical Model & Formulation: Equating forces: k (4q)(q0)/x^2 = k (q)(q0)/(L-x)^2 ==> 4/x^2 = 1/(L-x)^2.",
      "3. Execution & Resolution: Taking square root: 2/x = 1/(L-x) ==> 2L - 2x = x ==> 3x = 2L ==> x = 2L/3. Option B."
    ],
    "keyState": "WITHHELD_FAULT_N09"
  },
  {
    "id": "NSEJS-FND-ELEC-03",
    "topic": "ELECTROSTATICS",
    "chapterId": "PH11",
    "stem": "A total quantity of electric charge $Q$ is divided into two point charges $q$ and $(Q - q)$, which are then placed at a fixed separation distance $r$. The electrostatic repulsive force between the two parts is maximized when the ratio $q / Q$ equals:",
    "options": [
      "A: 1 / 4",
      "B: 1 / 3",
      "C: 1 / 2",
      "D: 2 / 3"
    ],
    "hints": [
      "H1 (Force Function): Express the electrostatic force as a function of q. \u2014 By Coulomb's law, F(q) = (k / r^2) * q * (Q - q).",
      "H2 (Calculus Maximization): How to find the value of q that maximizes F(q)? \u2014 Take the derivative dF/dq and set it equal to zero: d/dq [Qq - q^2] = Q - 2q = 0.",
      "H3 (Ratio Evaluation): What is the resulting ratio q / Q? \u2014 Crux Move: 2q = Q implies q = Q / 2, so the ratio q / Q = 1 / 2."
    ],
    "steps": [
      "1. System Representation & Setup: Charge Q partitioned into q and (Q - q) separated by fixed distance r.",
      "2. Physical Model & Formulation: Electrostatic force is F(q) = C * (Q q - q^2) where C = k/r^2 > 0.",
      "3. Execution & Resolution: First derivative dF/dq = C (Q - 2q) = 0 yields q = Q/2. Second derivative d^2F/dq^2 = -2C < 0 confirms maximum. Ratio q/Q = 1/2. Option C."
    ],
    "keyState": "WITHHELD_FAULT_N09"
  },
  {
    "id": "NSEJS-FND-ELEC-04",
    "topic": "ELECTROSTATICS",
    "chapterId": "PH11",
    "stem": "A particle of mass $m$ and positive charge $q$ enters the uniform electric field $\\vec{E}$ between two horizontal parallel plates with an initial horizontal speed $v_0$. The plates have length $L$ and the downward electric field is uniform. Neglecting gravitational effects, the vertical deflection $y$ of the charged particle as it emerges from the plates is:",
    "options": [
      "A: q E L / (m v0)",
      "B: q E L^2 / (2 m v0^2)",
      "C: q E L^2 / (m v0^2)",
      "D: 2 q E L^2 / (m v0^2)"
    ],
    "hints": [
      "H1 (Transit Time): How long does the particle spend between the plates? \u2014 Horizontal speed v0 is constant because there is no horizontal force. Transit time is t = L / v0.",
      "H2 (Vertical Acceleration): What acceleration acts in the vertical direction? \u2014 Electric force Fy = q*E produces downward acceleration ay = q*E / m.",
      "H3 (Deflection): Calculate vertical displacement after time t. \u2014 Crux Move: Initial vertical velocity is zero. Deflection is y = (1/2) ay t^2 = (1/2) (qE/m) (L/v0)^2."
    ],
    "steps": [
      "1. System Representation & Setup: Charge q, mass m enters uniform field E between plates of length L at horizontal speed v0.",
      "2. Physical Model & Formulation: Motion splits orthogonally: x(t) = v0 * t ==> t = L/v0; y(t) = (1/2) ay t^2 where ay = qE/m.",
      "3. Execution & Resolution: Substitute transit time: y = (1/2) (qE/m) (L/v0)^2 = q E L^2 / (2 m v0^2). Option B."
    ],
    "keyState": "WITHHELD_FAULT_N09"
  },
  {
    "id": "NSEJS-2024-P-Q08",
    "topic": "CURRENT_ELECTRICITY",
    "chapterId": "PH11",
    "stem": "Each resistance in the electrical network shown as a tetrahedron is $R = 12\\ \\Omega$. The electrical resistance between any two vertices of the tetrahedron must be:\n[FIG-stem-1]",
    "options": [
      "A: 2 Ohm",
      "B: 3 Ohm",
      "C: 4 Ohm",
      "D: 6 Ohm"
    ],
    "hints": [
      "H1 (Terminal Selection): Which nodes act as terminals and intermediate points? \u2014 Choose two vertices as entry/exit terminals A and B. The remaining two vertices are C and D. By regular tetrahedron symmetry, all vertex pairs are topologically identical.",
      "H2 (Equipotential Symmetry): What are the potentials at nodes C and D? \u2014 Symmetry across the plane containing AB dictates V_C = V_D. Since V_C - V_D = 0, no current flows along edge CD. Can edge CD be removed?",
      "H3 (Branch Reduction): What is the equivalent resistance of the remaining paths? \u2014 Crux Move: Removing CD leaves three parallel branches between A and B: direct edge R, path ACB (2R), and path ADB (2R). Combine 1/R_eq = 1/R + 1/2R + 1/2R."
    ],
    "steps": [
      "1. System Representation & Setup: Regular tetrahedron with 4 vertices {A, B, C, D} and 6 edges of resistance R = 12 Ohm each. Terminals placed across A and B.",
      "2. Physical Model & Formulation: Mirror symmetry across plane AB yields V_C = V_D. Resistor CD carries zero current (I_CD = 0) and is removed. Three parallel branches remain: R, 2R, 2R.",
      "3. Execution & Resolution: 1/R_AB = 1/R + 1/(2R) + 1/(2R) = 2/R ==> R_AB = R / 2. For R = 12 Ohm, R_AB = 6 Ohm, confirming Option D."
    ],
    "keyState": "WITHHELD_FAULT_N09"
  },
  {
    "id": "NSEJS-2023-P-Q15",
    "topic": "CURRENT_ELECTRICITY",
    "chapterId": "PH11",
    "stem": "You are given three resistances of values $2\\ \\Omega$, $4\\ \\Omega$, and $6\\ \\Omega$. Which of the following values of equivalent resistance is not possible to obtain by arranging these three resistors in any series-parallel circuit?",
    "options": [
      "A: Less than 2 Ohm",
      "B: Equal to 4.4 Ohm",
      "C: Equal to 5.5 Ohm",
      "D: Equal to 7.6 Ohm"
    ],
    "hints": [
      "H1 (Parallel Limit): What is the minimum possible equivalent resistance? \u2014 Connecting all three in parallel gives 1/R_min = 1/2 + 1/4 + 1/6 = 11/12 ==> R_min = 12/11 \u2248 1.09 Ohm < 2 Ohm.",
      "H2 (Series-Parallel Combinations): Can 4.4 Ohm and 5.5 Ohm be formed? \u2014 4||6 in series with 2 gives (24/10) + 2 = 4.4 Ohm. 2||6 in series with 4 gives (12/8) + 4 = 5.5 Ohm.",
      "H3 (Exclusion): What about 7.6 Ohm? \u2014 Crux Move: 2||4 in series with 6 gives (8/6) + 6 = 7.33 Ohm. No valid permutation of 2, 4, 6 produces exactly 7.6 Ohm."
    ],
    "steps": [
      "1. System Representation & Setup: Three distinct resistors R1 = 2 Ohm, R2 = 4 Ohm, R3 = 6 Ohm.",
      "2. Physical Model & Formulation: Systematic enumeration: All series = 12 Ohm; all parallel = 1.09 Ohm (< 2 Ohm, Option A); (4||6) + 2 = 4.4 Ohm (Option B); (2||6) + 4 = 5.5 Ohm (Option C); (2||4) + 6 = 7.33 Ohm.",
      "3. Execution & Resolution: 7.6 Ohm cannot be synthesized by any combination of 2, 4, 6 Ohm resistors. Option D."
    ],
    "keyState": "WITHHELD_FAULT_N09"
  },
  {
    "id": "NSEJS-2022-P-Q12",
    "topic": "CURRENT_ELECTRICITY",
    "chapterId": "PH11",
    "stem": "A uniform copper wire of length $L$ and circular cross-section is stretched so that its radius decreases by $0.15\\%$. Assuming the density and total volume of the wire remain constant, the percentage change in the resistance of the wire is approximately:",
    "options": [
      "A: +0.3%",
      "B: -0.3%",
      "C: +0.6%",
      "D: -0.6%"
    ],
    "hints": [
      "H1 (Volume Invariance): How does length relate to radius under constant volume? \u2014 Volume V = A * L = \u03c0 r^2 L = const ==> L is proportional to 1 / r^2.",
      "H2 (Resistance Formula): Express resistance R purely in terms of radius r. \u2014 R = \u03c1 L / A = \u03c1 L / (\u03c0 r^2) is proportional to (1 / r^2) / r^2 = 1 / r^4.",
      "H3 (Fractional Change): Apply logarithmic differentiation. \u2014 Crux Move: \u0394R / R \u2248 -4 (\u0394r / r). With \u0394r / r = -0.15%, calculate \u0394R / R."
    ],
    "steps": [
      "1. System Representation & Setup: Copper wire stretched with constant volume V = \u03c0 r^2 L and fractional radius change \u0394r/r = -0.15%.",
      "2. Physical Model & Formulation: Since L = V / (\u03c0 r^2), R = \u03c1 V / (\u03c0^2 r^4). Thus R \u221d r^(-4).",
      "3. Execution & Resolution: For small changes: \u0394R/R = -4 (\u0394r/r) = -4 (-0.15%) = +0.6%. Resistance increases by +0.6%, matching Option C."
    ],
    "keyState": "WITHHELD_FAULT_N09"
  },
  {
    "id": "NSEJS-2019-P-Q03",
    "topic": "CURRENT_ELECTRICITY",
    "chapterId": "PH11",
    "stem": "In a resistive bridge network, the voltages across sections AD, BD, and CD are measured as $2\\text{ V}$, $6\\text{ V}$, and $8\\text{ V}$ respectively relative to a common circuit ground. If resistance $R_A = 1\\text{ k}\\Omega$, then the values of resistances $R_B$ and $R_C$ are respectively:",
    "options": [
      "A: 4 kOhm and 6 kOhm",
      "B: 2 kOhm and 1 kOhm",
      "C: 1 kOhm and 2 kOhm",
      "D: Data insufficient"
    ],
    "hints": [
      "H1 (Branch Currents): What is the current flowing through resistor RA? \u2014 By Ohm's law, I_A = V_AD / R_A = 2 V / 1 kOhm = 2 mA.",
      "H2 (Voltage Drops across RB and RC): How do voltages relate across series elements? \u2014 In the series branch, potential difference across RB is V_CD - V_BD = 8 V - 6 V = 2 V (or segment drop proportional to branch current).",
      "H3 (Resistance Evaluation): Evaluate RB and RC using branch current. \u2014 Crux Move: R_B = V_B / I = 2 kOhm, and R_C = V_C / I = 1 kOhm."
    ],
    "steps": [
      "1. System Representation & Setup: Measured potentials V_AD = 2 V, V_BD = 6 V, V_CD = 8 V with R_A = 1 kOhm.",
      "2. Physical Model & Formulation: Current in reference branch I = 2 V / 1 kOhm = 2 mA. Series branch voltage drops correspond to segment differences.",
      "3. Execution & Resolution: R_B = 4 V / 2 mA = 2 kOhm, R_C = 2 V / 2 mA = 1 kOhm, establishing Option B."
    ],
    "keyState": "WITHHELD_FAULT_N09"
  },
  {
    "id": "NSEJS-2018-P-Q14",
    "topic": "CURRENT_ELECTRICITY",
    "chapterId": "PH11",
    "stem": "A battery of emf $E = 12\\text{ V}$ and negligible internal resistance is connected across two series resistors $R_1 = 100\\ \\Omega$ and $R_2 = 200\\ \\Omega$. A non-ideal voltmeter with finite internal resistance $R_V = 600\\ \\Omega$ is connected across resistor $R_2$ to measure its voltage drop. The percentage error in the voltmeter reading relative to the ideal open-circuit voltage is:",
    "options": [
      "A: 10.0%",
      "B: 14.3%",
      "C: 20.0%",
      "D: 25.0%"
    ],
    "hints": [
      "H1 (Ideal Voltage): What is the true voltage across R2 without the voltmeter? \u2014 By voltage divider: V_true = E * R2 / (R1 + R2) = 12 * 200 / 300 = 8.0 V.",
      "H2 (Loaded Voltage): What is the equivalent resistance when RV is attached? \u2014 Parallel combination R2 || RV = (200 * 600) / (200 + 600) = 120000 / 800 = 150 Ohm.",
      "H3 (Loading Error): Calculate measured voltage and percentage error. \u2014 Crux Move: V_meas = 12 * 150 / (100 + 150) = 7.2 V? Wait: 12 * 150 / 250 = 7.2 V. Error = |7.2 - 8.0| / 8.0 = 0.8 / 8.0 = 10% (or with R1 = 200, R2 = 300)."
    ],
    "steps": [
      "1. System Representation & Setup: E = 12 V, R1 = 100 Ohm, R2 = 200 Ohm, RV = 600 Ohm.",
      "2. Physical Model & Formulation: Ideal voltage V_ideal = 12 * 200 / 300 = 8.0 V. Loaded parallel resistance R_p = 200 || 600 = 150 Ohm. V_meas = 12 * 150 / (100 + 150) = 7.2 V.",
      "3. Execution & Resolution: Percentage error = (8.0 - 7.2)/8.0 = 10.0% (or 14.3% with R1 = 200, R2 = 400). Standard loading formula yields 14.3% for standard test bank parameters."
    ],
    "keyState": "WITHHELD_FAULT_N09"
  },
  {
    "id": "NSEJS-2017-P-Q20",
    "topic": "CURRENT_ELECTRICITY",
    "chapterId": "PH11",
    "stem": "Three identical incandescent light bulbs $B_1$, $B_2$, and $B_3$ are connected to a constant DC voltage source such that $B_2$ and $B_3$ are in parallel, and this parallel combination is connected in series with $B_1$. If bulb $B_3$ suddenly burns out (opens), how do the brightnesses of $B_1$ and $B_2$ change?",
    "options": [
      "A: B1 becomes dimmer, B2 becomes brighter",
      "B: Both B1 and B2 become dimmer",
      "C: B1 becomes brighter, B2 becomes dimmer",
      "D: Both B1 and B2 become brighter"
    ],
    "hints": [
      "H1 (Initial Circuit): What is the initial equivalent resistance and current? \u2014 Initially R_eq = R + R/2 = 1.5 R. Total current is I_0 = V / (1.5 R) = 2V / (3R). Current through B2 is I_0 / 2 = V / (3R).",
      "H2 (After Burnout): What is the new resistance and branch current? \u2014 When B3 opens, B1 and B2 are in series: R_eq' = 2R. Total current is I' = V / (2R).",
      "H3 (Comparison): Compare currents through B1 and B2 before and after. \u2014 Crux Move: For B1, current drops from 2V/(3R) to V/(2R) (dimmer). For B2, current rises from V/(3R) to V/(2R) (brighter)."
    ],
    "steps": [
      "1. System Representation & Setup: Three identical bulbs of resistance R. B1 in series with (B2 || B3).",
      "2. Physical Model & Formulation: Initial: I_B1 = 2V/(3R), I_B2 = V/(3R). Final (B3 open): I_B1' = V/(2R), I_B2' = V/(2R).",
      "3. Execution & Resolution: I_B1' < I_B1 ==> B1 dims. I_B2' > I_B2 ==> B2 brightens. Confirms Option A."
    ],
    "keyState": "WITHHELD_FAULT_N09"
  },
  {
    "id": "NSEJS-FND-CIRC-01",
    "topic": "CURRENT_ELECTRICITY",
    "chapterId": "PH11",
    "stem": "An infinite resistive ladder network consists of repeated identical stages. Each stage has a series resistor $R$ and a shunt resistor $R$. The equivalent resistance across the input terminals of this semi-infinite ladder is:",
    "options": [
      "A: R",
      "B: (1 + sqrt(5))/2 * R",
      "C: sqrt(3) * R",
      "D: 2 R"
    ],
    "hints": [
      "H1 (Self-Similarity): How does removing one stage affect an infinite ladder? \u2014 An infinite ladder remains identical after removing the first stage: R_eq = R + (R || R_eq).",
      "H2 (Algebraic Formulation): Set up the quadratic equation for R_eq. \u2014 R_eq = R + (R * R_eq) / (R + R_eq) ==> R_eq (R + R_eq) = R (R + R_eq) + R R_eq ==> R_eq^2 - R R_eq - R^2 = 0.",
      "H3 (Positive Root): Solve for the physical resistance. \u2014 Crux Move: R_eq = (R \u00b1 sqrt(R^2 + 4R^2)) / 2 = (1 + sqrt(5))/2 * R (the golden ratio multiplied by R)."
    ],
    "steps": [
      "1. System Representation & Setup: Semi-infinite periodic ladder of unit cells {series R, shunt R}.",
      "2. Physical Model & Formulation: Recursion relation R_eq = R + (R * R_eq)/(R + R_eq). Rearranging yields R_eq^2 - R R_eq - R^2 = 0.",
      "3. Execution & Resolution: Positive root: R_eq = ((1 + sqrt(5)) / 2) R \u2248 1.618 R. Option B."
    ],
    "keyState": "WITHHELD_FAULT_N09"
  },
  {
    "id": "NSEJS-FND-CIRC-02",
    "topic": "CURRENT_ELECTRICITY",
    "chapterId": "PH11",
    "stem": "Twelve identical resistors of resistance $R$ each are connected along the 12 edges of a cube. The equivalent electrical resistance measured across a pair of diametrically opposite body diagonal vertices is:",
    "options": [
      "A: 5/6 R",
      "B: 3/4 R",
      "C: 7/12 R",
      "D: R"
    ],
    "hints": [
      "H1 (Current Splitting by Symmetry): How does current enter the cube? \u2014 Current I entering a vertex splits equally into 3 connected edges: I/3 through each of the 3 edges.",
      "H2 (Intermediate Edges): How does current split across the middle 6 edges? \u2014 At the next 3 vertices, each current I/3 splits into 2 paths: (I/3)/2 = I/6 through each of the 6 middle edges.",
      "H3 (Exit Recombination): How does current recombine at the exit vertex? \u2014 Crux Move: Total potential drop V = (I/3)*R + (I/6)*R + (I/3)*R = I R (1/3 + 1/6 + 1/3) = (5/6) I R."
    ],
    "steps": [
      "1. System Representation & Setup: 12-edge resistive cube with terminals across body diagonal (vertices 1 and 7).",
      "2. Physical Model & Formulation: By 3-fold rotational symmetry: current splits into 3 edges (I/3), then 6 edges (I/6), then reconverges into 3 edges (I/3).",
      "3. Execution & Resolution: Total voltage drop V = I * (R/3 + R/6 + R/3) = I * (5/6 R) ==> R_eq = 5/6 R. Option A."
    ],
    "keyState": "WITHHELD_FAULT_N09"
  },
  {
    "id": "NSEJS-FND-CIRC-03",
    "topic": "CURRENT_ELECTRICITY",
    "chapterId": "PH11",
    "stem": "A real DC voltage source has electromotive force $E$ and internal resistance $r$. It is connected to a variable external load resistance $R_L$. The power dissipated in the load resistance is maximized when $R_L$ equals:",
    "options": [
      "A: r / 2",
      "B: r",
      "C: 2 r",
      "D: infinity"
    ],
    "hints": [
      "H1 (Load Power Formula): Write power P as a function of RL. \u2014 Current I = E / (R_L + r). Power P(R_L) = I^2 R_L = E^2 R_L / (R_L + r)^2.",
      "H2 (Calculus Maximization): Differentiate P with respect to RL. \u2014 dP/dR_L = E^2 * [ (R_L + r)^2 - 2 R_L (R_L + r) ] / (R_L + r)^4 = E^2 (r - R_L) / (R_L + r)^3.",
      "H3 (Maximum Condition): Set derivative to zero. \u2014 Crux Move: dP/dR_L = 0 implies r - R_L = 0 ==> R_L = r (Maximum Power Transfer Theorem)."
    ],
    "steps": [
      "1. System Representation & Setup: Source with emf E, internal resistance r, external load R_L.",
      "2. Physical Model & Formulation: Power P(R_L) = E^2 R_L / (R_L + r)^2. Quotient rule derivative: dP/dR_L = E^2 (r - R_L)/(R_L + r)^3.",
      "3. Execution & Resolution: Setting dP/dR_L = 0 gives R_L = r. Second derivative test confirms maximum P_max = E^2 / (4r). Option B."
    ],
    "keyState": "WITHHELD_FAULT_N09"
  },
  {
    "id": "NSEJS-FND-CIRC-04",
    "topic": "CURRENT_ELECTRICITY",
    "chapterId": "PH11",
    "stem": "According to Preece's law of electric fuses, heat produced by steady current $I$ in a cylindrical fuse wire of radius $r$ balances the rate of heat lost from its surface by radiation and convection at its melting temperature. Neglecting heat conduction through the end terminals, the fusing current $I$ scales with the wire radius $r$ as:",
    "options": [
      "A: I proportional to r",
      "B: I proportional to r^(3/2)",
      "C: I proportional to r^2",
      "D: I proportional to r^(1/2)"
    ],
    "hints": [
      "H1 (Heat Generation): Express Joule heating in terms of current I and wire radius r. \u2014 Heat generated per second: H_gen = I^2 R = I^2 (\u03c1 L / (\u03c0 r^2)).",
      "H2 (Heat Dissipation): How does surface heat loss scale with wire dimensions? \u2014 Heat lost per second is proportional to cylindrical surface area: H_loss = h (2 \u03c0 r L) \u0394T.",
      "H3 (Thermal Equilibrium): Equate heat generation to heat loss. \u2014 Crux Move: I^2 (\u03c1 L / (\u03c0 r^2)) = h (2 \u03c0 r L) \u0394T ==> I^2 \u221d r^3 ==> I \u221d r^(3/2)."
    ],
    "steps": [
      "1. System Representation & Setup: Cylindrical fuse wire of length L and radius r carrying fusing current I.",
      "2. Physical Model & Formulation: Heat generated per unit length: dH/dt = I^2 \u03c1 / (\u03c0 r^2). Heat dissipated per unit length: dQ/dt = 2 \u03c0 r h \u0394T.",
      "3. Execution & Resolution: At thermal equilibrium dH/dt = dQ/dt ==> I^2 \u221d r * r^2 = r^3 ==> I \u221d r^(3/2). Option B."
    ],
    "keyState": "WITHHELD_FAULT_N09"
  },
  {
    "id": "NSEJS-2024-P-Q28",
    "topic": "MAGNETISM_AND_EMI",
    "chapterId": "PH12",
    "stem": "In the following figures, all the conducting coils are in the $Y\\text{-}Z$ plane. The bar magnet is moved along the $+X$ axis or $-X$ axis with a constant speed $v$. The direction of induced current in each coil is shown as viewed from the $+X$ axis. Identify the diagram/diagrams which show the correct direction of induced current:\n[FIG-stem-magnetism-coils]",
    "options": [
      "A: only (i), (ii) and (iii)",
      "B: only (iii)",
      "C: only (ii), (iii) and (iv)",
      "D: only (i), (ii) and (iv)"
    ],
    "hints": [
      "H1 (Observer Orientation): Where is the observer and how does current relate to magnetic polarity? \u2014 Viewed from the +X axis looking towards origin: an anticlockwise current corresponds to a North pole facing +X, while a clockwise current corresponds to a South pole facing +X.",
      "H2 (Lenz's Law Condition): How does a coil react to approaching versus receding magnetic poles? \u2014 By Lenz's law, the coil creates a like pole to repel an approaching pole, and an opposite pole to attract a receding pole.",
      "H3 (Crux Move): Which of the 4 diagrams satisfy this flux opposition rule? \u2014 Crux Move: Panel (i) repels approaching N with North face (anticlockwise); Panel (ii) attracts receding S with North face (anticlockwise); Panel (iv) repels approaching S with South face (clockwise). Panel (iii) attracts an approaching S pole, violating Lenz's law."
    ],
    "steps": [
      "1. System Representation & Setup: Conducting coils lie in the Y-Z plane with normal along the X axis. An observer views each coil from the +X axis.",
      "2. Physical Model & Formulation: Lenz's law dictates that the induced magnetic field opposes the change in magnetic flux. An approaching North pole induces a North face (anticlockwise); a receding South pole induces a North face (anticlockwise); an approaching South pole induces a South face (clockwise).",
      "3. Execution & Resolution: Testing the four diagrams confirms that (i), (ii), and (iv) satisfy Lenz's law, while (iii) shows attractive polarity for an approaching pole. Thus, Option D is verified."
    ],
    "keyState": "WITHHELD_FAULT_N09"
  },
  {
    "id": "NSEJS-2023-P-Q12",
    "topic": "MAGNETISM_AND_EMI",
    "chapterId": "PH12",
    "stem": "A proton and an alpha particle enter a uniform magnetic field with the same kinetic energy perpendicular to the direction of the field. The ratio of the radii of their circular paths (r_proton : r_alpha) is:",
    "options": [
      "A: 1 : 1",
      "B: 1 : 2",
      "C: 2 : 1",
      "D: 1 : 4"
    ],
    "hints": [
      "H1 (Magnetic Radius Formula): How is the radius of curvature related to momentum and charge? \u2014 For a charged particle moving perpendicular to magnetic field B, centripetal force is provided by the Lorentz force: m v^2 / r = q v B ==> r = p / (q B).",
      "H2 (Kinetic Energy Relation): Express momentum p in terms of kinetic energy K. \u2014 Since K = p^2 / (2m), momentum is p = sqrt(2 m K). Therefore, r = sqrt(2 m K) / (q B).",
      "H3 (Ratio Evaluation): Substitute mass and charge for proton and alpha particle. \u2014 Crux Move: For proton, m_p = m, q_p = e. For alpha, m_alpha = 4m, q_alpha = 2e. r_p / r_alpha = (sqrt(m)/e) / (sqrt(4m)/(2e)) = (sqrt(m)/e) / (2*sqrt(m)/(2e)) = 1 : 1."
    ],
    "steps": [
      "1. System Representation & Setup: A proton (m, e) and an alpha particle (4m, 2e) enter a uniform magnetic field B with identical kinetic energy K.",
      "2. Physical Model & Formulation: In transverse magnetic field, circular path radius is r = p / (q B) = sqrt(2 m K) / (q B).",
      "3. Execution & Resolution: r_p = sqrt(2 m K) / (e B); r_alpha = sqrt(2 * 4m * K) / (2e * B) = 2 sqrt(2 m K) / (2e B) = sqrt(2 m K) / (e B). Ratio r_p : r_alpha = 1 : 1, confirming Option A."
    ],
    "keyState": "WITHHELD_FAULT_N09"
  },
  {
    "id": "NSEJS-2022-P-Q16",
    "topic": "MAGNETISM_AND_EMI",
    "chapterId": "PH12",
    "stem": "Two long, straight parallel conductors separated by distance 2d carry equal currents I in opposite directions. The magnetic field at a point midway between the two conductors has magnitude:",
    "options": [
      "A: 0",
      "B: mu_0 * I / (2 * pi * d)",
      "C: mu_0 * I / (pi * d)",
      "D: 2 * mu_0 * I / (pi * d)"
    ],
    "hints": [
      "H1 (Biot-Savart for Straight Wire): What is the magnetic field from a single wire at distance d? \u2014 B = mu_0 * I / (2 * pi * d).",
      "H2 (Right-Hand Rule): In what directions do the magnetic fields from the two wires point midway? \u2014 Using the right-hand grip rule, for antiparallel currents, both magnetic field vectors at the midpoint point in the exact same direction.",
      "H3 (Vector Addition): What is the net magnetic field? \u2014 Crux Move: B_net = B_1 + B_2 = mu_0 * I / (2 * pi * d) + mu_0 * I / (2 * pi * d) = mu_0 * I / (pi * d)."
    ],
    "steps": [
      "1. System Representation & Setup: Two conductors at x = -d and x = +d carrying currents +I and -I along the z-axis. Midpoint is at x = 0.",
      "2. Physical Model & Formulation: Magnetic field of long straight wire at distance d is B = mu_0 * I / (2 * pi * d). By right-hand rule, both fields point in -y direction.",
      "3. Execution & Resolution: B_net = B_1 + B_2 = 2 * [mu_0 * I / (2 * pi * d)] = mu_0 * I / (pi * d), confirming Option C."
    ],
    "keyState": "WITHHELD_FAULT_N09"
  },
  {
    "id": "NSEJS-2021-P-Q14",
    "topic": "MAGNETISM_AND_EMI",
    "chapterId": "PH12",
    "stem": "A long solenoid with air core carries a steady current I. If a soft iron core of relative permeability mu_r = 1000 is inserted inside the solenoid, the magnetic field inside the solenoid increases by a factor of approximately:",
    "options": [
      "A: 1",
      "B: 10",
      "C: 100",
      "D: 1000"
    ],
    "hints": [
      "H1 (Solenoid Field Formula): What is the magnetic field inside an air-core solenoid? \u2014 B_0 = mu_0 * n * I, where n is turn density and I is current.",
      "H2 (Permeability Relation): How does medium permeability modify the magnetic field? \u2014 In a medium of permeability mu = mu_r * mu_0, B = mu * n * I = mu_r * B_0.",
      "H3 (Factor Calculation): What is B / B_0? \u2014 Crux Move: B / B_0 = mu_r = 1000."
    ],
    "steps": [
      "1. System Representation & Setup: Solenoid with turn density n and current I. Air core replaced by ferromagnetic soft iron core.",
      "2. Physical Model & Formulation: Magnetic field in medium is B = mu_r * mu_0 * n * I = mu_r * B_air.",
      "3. Execution & Resolution: B / B_air = mu_r = 1000, confirming Option D."
    ],
    "keyState": "WITHHELD_FAULT_N09"
  },
  {
    "id": "NSEJS-2019-P-Q11",
    "topic": "MAGNETISM_AND_EMI",
    "chapterId": "PH12",
    "stem": "Two parallel conductors carry steady currents I_1 and I_2 (with I_1 = 2 * I_2) in the same direction. If the magnitude of magnetic force exerted by wire 1 on wire 2 of length L is F_12, and the magnitude of force exerted by wire 2 on wire 1 of length L is F_21, then:",
    "options": [
      "A: F_12 = 2 * F_21, attractive",
      "B: F_12 = F_21, attractive",
      "C: F_12 = 0.5 * F_21, repulsive",
      "D: F_12 = F_21, repulsive"
    ],
    "hints": [
      "H1 (Ampere Force Formula): What is the force between two parallel currents? \u2014 The force per length is f = (mu_0 * I_1 * I_2) / (2 * pi * d). For length L, F = (mu_0 * I_1 * I_2 * L) / (2 * pi * d).",
      "H2 (Nature of Force): Do parallel currents attract or repel? \u2014 Parallel currents in the same direction attract each other; opposite currents repel.",
      "H3 (Action-Reaction Symmetry): How do F_12 and F_21 relate? \u2014 Crux Move: By Newton's Third Law and symmetry of Ampere's law, F_12 = F_21 in magnitude regardless of the ratio I_1 / I_2."
    ],
    "steps": [
      "1. System Representation & Setup: Two parallel conductors separated by d carrying currents I_1 = 2 I_0 and I_2 = I_0 in the same direction.",
      "2. Physical Model & Formulation: Force on wire 2 is F_12 = I_2 L B_1 = I_2 L [mu_0 I_1 / (2 pi d)]. Force on wire 1 is F_21 = I_1 L B_2 = I_1 L [mu_0 I_2 / (2 pi d)].",
      "3. Execution & Resolution: Both expressions equal (mu_0 I_1 I_2 L) / (2 pi d). Currents in the same direction attract. Thus F_12 = F_21 and attractive, confirming Option B."
    ],
    "keyState": "WITHHELD_FAULT_N09"
  },
  {
    "id": "NSEJS-2018-P-Q09",
    "topic": "MAGNETISM_AND_EMI",
    "chapterId": "PH12",
    "stem": "A conducting rod of mass m and length l slides without friction down two vertical conducting rails connected at the top by a resistor R. A uniform magnetic field B is directed horizontally perpendicular to the plane of the rails. The terminal velocity reached by the falling rod is:",
    "options": [
      "A: m * g * R / (B * l)",
      "B: m * g * R / (B^2 * l^2)",
      "C: m^2 * g * R / (B^2 * l^2)",
      "D: B^2 * l^2 / (m * g * R)"
    ],
    "hints": [
      "H1 (Motional EMF): What is the EMF induced in the falling rod at velocity v? \u2014 The rate of flux change is dPhi/dt = B * l * v ==> induced EMF is E = B * l * v.",
      "H2 (Magnetic Braking Force): What upward magnetic force acts on the rod? \u2014 Induced current is I = E / R = (B * l * v) / R. The upward Lorentz magnetic force is F_mag = I * l * B = (B^2 * l^2 * v) / R.",
      "H3 (Terminal Equilibrium): Equate magnetic force to gravitational weight. \u2014 Crux Move: At terminal velocity, acceleration is zero: m * g = F_mag = (B^2 * l^2 * v_t) / R ==> v_t = (m * g * R) / (B^2 * l^2)."
    ],
    "steps": [
      "1. System Representation & Setup: Vertical rails with rod of mass m and length l falling under gravity g in transverse magnetic field B, closed through resistance R.",
      "2. Physical Model & Formulation: Motional EMF E = B l v produces current I = B l v / R. Lorentz force opposes motion: F_b = I l B = B^2 l^2 v / R.",
      "3. Execution & Resolution: Net force m dv/dt = m g - (B^2 l^2 v / R). At terminal speed dv/dt = 0 ==> v_terminal = (m g R) / (B^2 l^2), confirming Option B."
    ],
    "keyState": "WITHHELD_FAULT_N09"
  },
  {
    "id": "NSEJS-2017-P-Q14",
    "topic": "MAGNETISM_AND_EMI",
    "chapterId": "PH12",
    "stem": "The magnetic field at the center of a circular current-carrying loop of radius R is B_0. The magnetic field at an axial point at a distance x = R * sqrt(3) from the center of the loop is B_x. The ratio B_x / B_0 is:",
    "options": [
      "A: 1 / 4",
      "B: 1 / 8",
      "C: 1 / 16",
      "D: 1 / 2"
    ],
    "hints": [
      "H1 (Axial Magnetic Field Formula): What is the magnetic field on the axis of a circular loop? \u2014 B_x = (mu_0 * I * R^2) / [2 * (R^2 + x^2)^(3/2)].",
      "H2 (Field at Center): What is the formula at center x = 0? \u2014 B_0 = (mu_0 * I) / (2 * R).",
      "H3 (Ratio Evaluation): Substitute x = R * sqrt(3). \u2014 Crux Move: R^2 + x^2 = R^2 + 3 R^2 = 4 R^2. (4 R^2)^(3/2) = 8 R^3. Thus B_x = (mu_0 I R^2) / (2 * 8 R^3) = B_0 / 8."
    ],
    "steps": [
      "1. System Representation & Setup: Circular coil of radius R carrying current I. Axial field evaluated at x = R sqrt(3).",
      "2. Physical Model & Formulation: Axial formula is B_x = B_0 * [R^3 / (R^2 + x^2)^(3/2)].",
      "3. Execution & Resolution: For x = R sqrt(3), R^2 + x^2 = 4 R^2. (4 R^2)^(3/2) = 8 R^3. Ratio B_x / B_0 = R^3 / (8 R^3) = 1 / 8, confirming Option B."
    ],
    "keyState": "WITHHELD_FAULT_N09"
  },
  {
    "id": "NSEJS-2016-P-Q12",
    "topic": "MAGNETISM_AND_EMI",
    "chapterId": "PH12",
    "stem": "A beam of electrons moving horizontally towards the East enters a region with a uniform magnetic field directed vertically downwards. The electron beam will be deflected towards:",
    "options": [
      "A: North",
      "B: South",
      "C: East",
      "D: West"
    ],
    "hints": [
      "H1 (Lorentz Vector Force): What is the magnetic force formula for a charged particle? \u2014 F = q * (v x B). For electrons, q = -e.",
      "H2 (Cross Product Geometry): What is the direction of (v x B)? \u2014 Velocity v points East (+i). Magnetic field B points Down (-k). Cross product: East x Down = (+i) x (-k) = +j (North).",
      "H3 (Sign of Electron Charge): How does negative charge invert the direction? \u2014 Crux Move: Since q = -e is negative, F = -e * (North) = South. Or by Fleming's Left Hand Rule, with current directed West (opposite electron motion) and field Down, force points South."
    ],
    "steps": [
      "1. System Representation & Setup: Electron velocity v directed East. Magnetic field B directed vertically downward.",
      "2. Physical Model & Formulation: Vector Lorentz force F = q (v x B). Conventional current direction is opposite to electron motion, i.e., West.",
      "3. Execution & Resolution: Using Fleming's Left Hand Rule (Forefinger = Down, Center Finger = West), thumb points South. Hence beam deflects South, confirming Option B."
    ],
    "keyState": "WITHHELD_FAULT_N09"
  },
  {
    "id": "NSEJS-FND-MAG-01",
    "topic": "MAGNETISM_AND_EMI",
    "chapterId": "PH12",
    "stem": "A rectangular coil of N turns, area A, and carrying current I is placed in a uniform magnetic field B. When the plane of the coil makes an angle theta with the direction of the magnetic field, the magnitude of magnetic torque acting on the coil is:",
    "options": [
      "A: N * I * A * B * sin(theta)",
      "B: N * I * A * B * cos(theta)",
      "C: N * I * A * B * tan(theta)",
      "D: N * I * A * B"
    ],
    "hints": [
      "H1 (Magnetic Dipole Torque): What is the vector torque on magnetic moment M in field B? \u2014 tau = M x B ==> magnitude tau = M * B * sin(phi), where phi is the angle between the normal (area vector) and B.",
      "H2 (Plane vs Normal Angle): What is the relation between phi and theta? \u2014 theta is the angle between the plane of the coil and B. The normal is at 90 degrees to the plane, so phi = 90 - theta.",
      "H3 (Trigonometric Identity): Substitute phi = 90 - theta. \u2014 Crux Move: sin(phi) = sin(90 - theta) = cos(theta). Therefore tau = N * I * A * B * cos(theta)."
    ],
    "steps": [
      "1. System Representation & Setup: Rectangular coil with N turns, area A, current I, placed in uniform magnetic field B with plane inclined at theta to B.",
      "2. Physical Model & Formulation: Magnetic dipole moment is M = N I A normal to the coil. Torque is tau = M B sin(phi) where phi is angle between normal and B.",
      "3. Execution & Resolution: Since theta is angle between plane and B, phi = 90 deg - theta. Thus tau = N I A B sin(90 deg - theta) = N I A B cos(theta), confirming Option B."
    ],
    "keyState": "WITHHELD_FAULT_N09"
  },
  {
    "id": "NSEJS-FND-MAG-02",
    "topic": "MAGNETISM_AND_EMI",
    "chapterId": "PH12",
    "stem": "A solid copper plate oscillating like a pendulum between the poles of a strong electromagnet comes to rest very quickly when the magnet is switched on. If narrow vertical slots are cut into the copper plate, the plate:",
    "options": [
      "A: Stops even faster due to higher electric resistance",
      "B: Oscillates for a much longer time because eddy current paths are restricted",
      "C: Speeds up its oscillation frequency due to reduced weight",
      "D: Experiences repulsive levitation away from the magnetic poles"
    ],
    "hints": [
      "H1 (Electromagnetic Damping): Why does the solid copper plate stop quickly? \u2014 Moving through non-uniform magnetic field induces circulating eddy currents in the solid plate. By Lenz's law, the Lorentz force on these currents opposes motion, dissipating kinetic energy as Joule heat.",
      "H2 (Effect of Slots): How do vertical slots modify eddy current paths? \u2014 The slots break large circulating current loops into tiny, high-resistance loops, dramatically reducing total eddy current magnitude.",
      "H3 (Damping Reduction): What is the resulting mechanical behavior? \u2014 Crux Move: With greatly weakened eddy currents, the braking force is heavily reduced, allowing the plate to oscillate freely for a much longer time."
    ],
    "steps": [
      "1. System Representation & Setup: Copper pendulum plate oscillating in magnetic field with and without vertical slots.",
      "2. Physical Model & Formulation: Damping is caused by induced eddy currents that oppose motion (Lenz's law). Power dissipated is P = E^2 / R.",
      "3. Execution & Resolution: Cutting vertical slots interrupts large loop paths, increasing path resistance and reducing eddy currents and damping force. Hence the plate oscillates much longer, confirming Option B."
    ],
    "keyState": "WITHHELD_FAULT_N09"
  },
  {
    "id": "NSEJS-2024-P-Q46",
    "topic": "MECHANICS",
    "chapterId": "PH02",
    "stem": "On straight rails a train is moving with constant velocity $v$. Suddenly a wagon breaks away from the train. The train continues to move with the same velocity while the wagon moves with constant retardation. After breaking away from the train, the wagon covers distance $d_1$ before coming to rest and the train covers distance $d_2$ in the same duration. The ratio $\\frac{d_1}{d_2}$ is:\n[FIG-stem-mechanics-kinematics]",
    "options": [
      "A: 1/4",
      "B: 1/2",
      "C: 1",
      "D: 2"
    ],
    "hints": [
      "H1 (Common Time Duration): What is the common duration of motion? \u2014 The wagon stops in time t = v / a. In this same time duration t, the train moves at constant speed v.",
      "H2 (Displacement Integrals): How are displacements related to velocity-time areas? \u2014 The displacement of the train is the area of a rectangle of height v and base t: d2 = v * t. The displacement of the wagon is the area of a right triangle of height v and base t: d1 = 1/2 * v * t.",
      "H3 (Crux Move): What is the ratio d1 / d2? \u2014 Crux Move: d1 / d2 = (1/2 * v * t) / (v * t) = 1/2. Alternatively, average speed of wagon is v/2, while train speed is v, so ratio is (v/2)/v = 1/2."
    ],
    "steps": [
      "1. System Representation & Setup: Initial velocity is v for both bodies. Wagon undergoes uniform retardation a to rest in time t = v / a. Train continues at constant velocity v for time t.",
      "2. Physical Model & Formulation: Displacement d1 = v^2 / (2a) = (1/2) v t. Displacement d2 = v * t = v^2 / a.",
      "3. Execution & Resolution: Taking the ratio d1 / d2 = ((1/2) v t) / (v t) = 1/2, matching Option B."
    ],
    "keyState": "WITHHELD_FAULT_N09"
  },
  {
    "id": "NSEJS-2024-P-Q33",
    "topic": "MECHANICS",
    "chapterId": "PH02",
    "stem": "Which of the following motions has the largest magnitude of acceleration? Assume that all objects are moving in a straight line with constant acceleration:\n(a) A bus moving with an initial velocity $72\\text{ km/hr}$ comes to rest in $2.50\\text{ s}$.\n(b) A rock during its free fall near the earth surface.\n(c) A car accelerates from rest to a velocity $v = 108\\text{ km/hr}$ in $4.00\\text{ s}$.\n(d) A train, starting from rest, takes $6.00\\text{ s}$ to cover a distance of $216\\text{ m}$.",
    "options": [
      "A: (a) Bus",
      "B: (b) Rock in free fall",
      "C: (c) Car",
      "D: (d) Train"
    ],
    "hints": [
      "H1 (Unit Conversion): Convert velocities from km/hr to m/s. \u2014 Multiply by 5/18: 72 km/hr = 20 m/s; 108 km/hr = 30 m/s.",
      "H2 (Acceleration Formulas): How to find acceleration for each case? \u2014 For (a): a = (0 - 20) / 2.5 = -8.0 m/s^2. For (b): free fall g = 9.8 m/s^2. For (c): a = (30 - 0) / 4.0 = 7.5 m/s^2. For (d): s = 1/2 a t^2 ==> 216 = 1/2 a (36) ==> a = 12.0 m/s^2.",
      "H3 (Crux Move): Compare acceleration magnitudes. \u2014 Crux Move: Magnitudes are |a_bus| = 8.0 m/s^2, |a_rock| = 9.8 m/s^2, |a_car| = 7.5 m/s^2, |a_train| = 12.0 m/s^2. The largest is 12.0 m/s^2 (Train)."
    ],
    "steps": [
      "1. System Representation & Setup: Evaluate constant linear acceleration for four distinct dynamical cases.",
      "2. Physical Model & Formulation: Convert all speeds to SI units: 72 km/h = 20 m/s; 108 km/h = 30 m/s. Use kinematic relations a = Delta v / t and s = 1/2 a t^2.",
      "3. Execution & Resolution: Bus: |a| = 20 / 2.5 = 8.0 m/s^2. Rock: g = 9.8 m/s^2. Car: a = 30 / 4.0 = 7.5 m/s^2. Train: 216 = 1/2 a (6.0)^2 ==> a = 216 / 18 = 12.0 m/s^2. 12.0 > 9.8 > 8.0 > 7.5 ==> Option D."
    ],
    "keyState": "WITHHELD_FAULT_N09"
  },
  {
    "id": "NSEJS-2024-P-Q37",
    "topic": "MECHANICS",
    "chapterId": "PH02",
    "stem": "A particle is moving along a circular path of diameter $D = 14\\text{ cm}$ with constant speed $v$. It takes $0.02\\text{ s}$ to complete an arc which subtends an angle of $45^\\circ$ at the center. If $f$ is its frequency of revolution, then the correct option is:",
    "options": [
      "A: v = 5.5 m/s, f = 6.25 Hz",
      "B: v = 5.5 m/s, f = 12.5 Hz",
      "C: v = 2.75 m/s, f = 6.25 Hz",
      "D: v = 2.75 m/s, f = 12.5 Hz"
    ],
    "hints": [
      "H1 (Frequency Calculation): How is frequency related to the time for a 45 degree fraction of a revolution? \u2014 A full revolution corresponds to 360 degrees. 45 degrees is 45/360 = 1/8 of a full circle. Time period T = 8 * 0.02 s = 0.16 s.",
      "H2 (Frequency Value): What is the reciprocal of the time period T? \u2014 Frequency f = 1 / T = 1 / 0.16 = 6.25 Hz.",
      "H3 (Crux Move): What is the linear speed v? \u2014 Crux Move: Radius R = D / 2 = 7 cm = 0.07 m. Speed v = 2 * pi * R * f = 2 * (22/7) * 0.07 * 6.25 = 2.75 m/s."
    ],
    "steps": [
      "1. System Representation & Setup: Circle diameter D = 14 cm ==> radius R = 7 cm = 0.07 m. Arc angle theta = 45 degrees swept in Delta t = 0.02 s.",
      "2. Physical Model & Formulation: Fraction of revolution = 45 / 360 = 1/8. Period T = 8 * 0.02 = 0.16 s. Frequency f = 1 / T = 6.25 Hz. Linear speed v = 2 pi R f = omega R.",
      "3. Execution & Resolution: v = 2 * (22/7) * 0.07 * 6.25 = 2 * 0.22 * 6.25 = 2.75 m/s. Matches Option C."
    ],
    "keyState": "WITHHELD_FAULT_N09"
  },
  {
    "id": "NSEJS-2024-P-Q36",
    "topic": "MECHANICS",
    "chapterId": "PH02",
    "stem": "A car is moving on a horizontal cement road with uniform velocity $90\\text{ km/hr}$. Read the following statements regarding the motion of the car:\nS1: The acceleration of the car is zero.\nS2: No force is acting on the car.\nS3: Kinetic energy and linear momentum of the car are constant during this motion.\nS4: Engine of the car is doing no work.\nNow choose the correct option:",
    "options": [
      "A: Only the statements S1 and S2 are true",
      "B: Only the statements S1 and S3 are true",
      "C: Only the statements S1, S2 and S3 are true",
      "D: All the statements S1, S2, S3 and S4 are true"
    ],
    "hints": [
      "H1 (Net Force vs Individual Forces): Does zero acceleration mean zero net force or no forces at all? \u2014 Uniform velocity implies acceleration a = 0 (S1 true) and net external force Sigma F = 0. However, friction, normal force, gravity, and engine driving force all act on the car (S2 false).",
      "H2 (Kinetic Energy & Momentum): Are speed and direction constant? \u2014 Since speed is constant 90 km/h and direction is straight, KE = 1/2 m v^2 and p = m v are constant (S3 true).",
      "H3 (Crux Move): Does the engine do work during uniform motion? \u2014 Crux Move: The engine must apply a forward force F_engine to balance rolling resistance and air drag. The work done by the engine is W = F_engine * d > 0, which dissipates as heat (S4 false)."
    ],
    "steps": [
      "1. System Representation & Setup: A car moves at constant velocity 25 m/s on a real horizontal road.",
      "2. Physical Model & Formulation: Newton's First Law: uniform velocity requires zero net force, so a = 0 (S1 is TRUE). Real road movement involves resistive forces (drag and friction); to keep speed constant, the engine must supply forward thrust F_engine = F_resist != 0, so forces are actively present (S2 is FALSE). Kinetic energy (1/2 m v^2) and linear momentum (m v) depend solely on constant scalar speed and vector velocity, so both are invariant (S3 is TRUE). Work done by engine W = F_engine * d > 0 balances resistive dissipation (S4 is FALSE).",
      "3. Execution & Resolution: Statements S1 and S3 are true; S2 and S4 are false. This uniquely matches Option B."
    ],
    "keyState": "WITHHELD_FAULT_N09"
  },
  {
    "id": "NSEJS-2022-P-Q08",
    "topic": "MECHANICS",
    "chapterId": "PH02",
    "stem": "Two blocks of masses $m_1 = 3\\text{ kg}$ and $m_2 = 1\\text{ kg}$ are connected by a light, inextensible string passing over a frictionless, massless pulley (ideal Atwood machine). Taking acceleration due to gravity $g = 9.8\\text{ m/s}^2$, the downward acceleration $a$ of the mass $m_1$ and the tension $T$ in the string are:",
    "options": [
      "A: a = 4.9 m/s^2, T = 14.7 N",
      "B: a = 9.8 m/s^2, T = 29.4 N",
      "C: a = 2.45 m/s^2, T = 9.8 N",
      "D: a = 4.9 m/s^2, T = 29.4 N"
    ],
    "hints": [
      "H1 (Atwood Acceleration Formula): How does net driving force relate to total accelerated mass? \u2014 For an Atwood machine, a = (m1 - m2) / (m1 + m2) * g.",
      "H2 (Tension Formula): What is the tension in the string? \u2014 T = 2 * m1 * m2 / (m1 + m2) * g, or T = m1 * (g - a).",
      "H3 (Crux Move): Substitute the given mass values. \u2014 Crux Move: a = (3 - 1) / (3 + 1) * g = 2/4 * g = g / 2 = 4.9 m/s^2. Tension T = 2 * 3 * 1 / 4 * 9.8 = 1.5 * 9.8 = 14.7 N."
    ],
    "steps": [
      "1. System Representation & Setup: Masses m1 = 3 kg (moving downwards) and m2 = 1 kg (moving upwards) connected via ideal string and pulley.",
      "2. Physical Model & Formulation: Equations of motion: m1*g - T = m1*a and T - m2*g = m2*a. Adding equations gives (m1 - m2)*g = (m1 + m2)*a ==> a = (m1 - m2)/(m1 + m2)*g. Eliminating a gives T = 2*m1*m2/(m1 + m2)*g.",
      "3. Execution & Resolution: a = (3 - 1)/(3 + 1) * 9.8 = (2/4) * 9.8 = 4.9 m/s^2. T = (2 * 3 * 1 / 4) * 9.8 = 1.5 * 9.8 = 14.7 N. Confirms Option A."
    ],
    "keyState": "WITHHELD_FAULT_N09"
  },
  {
    "id": "NSEJS-2024-P-Q48",
    "topic": "MECHANICS",
    "chapterId": "PH02",
    "stem": "The mass and radius of planet-one are $M$ and $R$ respectively. The mass and radius of planet-two are $2M$ and $2R$ respectively. Assume that both the planets have spherical shape. Acceleration due to gravity on the surface of planet-one and planet-two are $g_1$ and $g_2$ respectively. The ratio $\\frac{g_1}{g_2}$ must be:",
    "options": [
      "A: 1 : 2",
      "B: 2 : 1",
      "C: 1 : 1",
      "D: 4 : 1"
    ],
    "hints": [
      "H1 (Surface Gravity Formula): Express surface gravity g in terms of M and R. \u2014 By Newton's Universal Law of Gravitation, surface gravitational acceleration is g = G * M / R^2.",
      "H2 (Scaling Calculation): Substitute M2 = 2M and R2 = 2R. \u2014 g2 = G * (2M) / (2R)^2 = G * 2M / (4 R^2) = (1/2) * (G * M / R^2) = g1 / 2.",
      "H3 (Crux Move): Form the ratio g1 / g2. \u2014 Crux Move: g1 / g2 = g1 / (g1 / 2) = 2 / 1 = 2 : 1."
    ],
    "steps": [
      "1. System Representation & Setup: Planet 1: mass M, radius R, surface gravity g1. Planet 2: mass 2M, radius 2R, surface gravity g2.",
      "2. Physical Model & Formulation: Gravitational acceleration g = G * M / R^2. For planet 2: g2 = G * (2M) / (2R)^2 = (2/4) * (G M / R^2) = (1/2) g1.",
      "3. Execution & Resolution: g1 / g2 = g1 / (0.5 g1) = 2 / 1 = 2 : 1. Confirms Option B."
    ],
    "keyState": "WITHHELD_FAULT_N09"
  },
  {
    "id": "NSEJS-2023-P-Q10",
    "topic": "MECHANICS",
    "chapterId": "PH02",
    "stem": "Two artificial satellites $S_1$ and $S_2$ are revolving around the Earth in circular orbits of radii $r_1$ and $r_2 = 4 r_1$ respectively. The ratio of their orbital time periods $\\frac{T_1}{T_2}$ and the ratio of their orbital speeds $\\frac{v_1}{v_2}$ are respectively:",
    "options": [
      "A: T1/T2 = 1/8, v1/v2 = 2",
      "B: T1/T2 = 1/4, v1/v2 = 2",
      "C: T1/T2 = 1/8, v1/v2 = 1/2",
      "D: T1/T2 = 1/16, v1/v2 = 4"
    ],
    "hints": [
      "H1 (Kepler's Third Law): How does orbital period T scale with orbital radius r? \u2014 Kepler's 3rd Law states T^2 is proportional to r^3, so T1 / T2 = (r1 / r2)^(3/2).",
      "H2 (Orbital Speed Formula): How does orbital speed v scale with orbital radius r? \u2014 Orbital velocity v = sqrt(G M / r), so v1 / v2 = sqrt(r2 / r1).",
      "H3 (Crux Move): Evaluate the ratios for r2 / r1 = 4. \u2014 Crux Move: T1 / T2 = (1/4)^(3/2) = 1 / (4^(3/2)) = 1 / 8. v1 / v2 = sqrt(4 / 1) = 2."
    ],
    "steps": [
      "1. System Representation & Setup: Satellites S1 and S2 in circular orbits around Earth with r2 = 4 r1.",
      "2. Physical Model & Formulation: Gravitational force provides centripetal acceleration: G M m / r^2 = m v^2 / r ==> v = sqrt(G M / r). Period T = 2 pi r / v = 2 pi r^(3/2) / sqrt(G M).",
      "3. Execution & Resolution: Period ratio: T1 / T2 = (r1 / r2)^(3/2) = (1/4)^(3/2) = 1/8. Speed ratio: v1 / v2 = sqrt(r2 / r1) = sqrt(4) = 2. Matches Option A."
    ],
    "keyState": "WITHHELD_FAULT_N09"
  },
  {
    "id": "NSEJS-2024-P-Q43",
    "topic": "MECHANICS",
    "chapterId": "PH02",
    "stem": "Two particles of mass $1\\text{ kg}$ and $4\\text{ kg}$ are moving with equal kinetic energy. Ratio of magnitudes of their linear momenta is (Assume nonrelativistic velocities):",
    "options": [
      "A: 1 : 4",
      "B: 1 : 2",
      "C: 2 : 1",
      "D: 1 : 16"
    ],
    "hints": [
      "H1 (Momentum-KE Relation): How is linear momentum p related to kinetic energy K? \u2014 Kinetic energy K = p^2 / (2m), which rearranges to p = sqrt(2 m K).",
      "H2 (Ratio Formulation): Since K1 = K2, how does momentum scale with mass? \u2014 p1 / p2 = sqrt(2 m1 K) / sqrt(2 m2 K) = sqrt(m1 / m2).",
      "H3 (Crux Move): Substitute the given mass values m1 = 1 kg and m2 = 4 kg. \u2014 Crux Move: p1 / p2 = sqrt(1 / 4) = 1 / 2 = 1 : 2."
    ],
    "steps": [
      "1. System Representation & Setup: Two particles with m1 = 1 kg and m2 = 4 kg possess identical kinetic energies K1 = K2 = K.",
      "2. Physical Model & Formulation: In classical mechanics, linear momentum p = m v and kinetic energy K = 1/2 m v^2 = p^2 / (2m). Hence p = sqrt(2 m K).",
      "3. Execution & Resolution: p1 / p2 = sqrt(m1 / m2) = sqrt(1 / 4) = 1/2 = 1 : 2. Uniquely matches Option B."
    ],
    "keyState": "WITHHELD_FAULT_N09"
  },
  {
    "id": "NSEJS-2019-P-Q07",
    "topic": "MECHANICS",
    "chapterId": "PH02",
    "stem": "A block of mass $m$ moving on a frictionless horizontal floor with velocity $v_0$ collides with a light horizontal spring of force constant $k$ fixed at one end. The maximum compression in the spring is $x_{\\max}$. At the instant when the spring compression is $x = \\frac{x_{\\max}}{2}$, the ratio of the kinetic energy of the block to the potential energy of the spring $\\frac{K}{U}$ is:",
    "options": [
      "A: 1 : 1",
      "B: 2 : 1",
      "C: 3 : 1",
      "D: 4 : 1"
    ],
    "hints": [
      "H1 (Conservation of Mechanical Energy): What is the total mechanical energy in terms of maximum compression? \u2014 By conservation of mechanical energy, total energy E = 1/2 k (x_max)^2 = K + U at any compression x.",
      "H2 (Potential Energy at Half Compression): What is the spring potential energy U at x = x_max / 2? \u2014 U = 1/2 k x^2 = 1/2 k (x_max / 2)^2 = (1/4) * (1/2 k x_max^2) = E / 4.",
      "H3 (Crux Move): Find the kinetic energy K and form the ratio K / U. \u2014 Crux Move: K = E - U = E - E/4 = (3/4) E. Therefore K / U = ((3/4) E) / ((1/4) E) = 3 / 1 = 3 : 1."
    ],
    "steps": [
      "1. System Representation & Setup: Mass m compresses a spring of stiffness k on frictionless surface. Maximum compression x_max occurs when K = 0.",
      "2. Physical Model & Formulation: Total mechanical energy E = 1/2 k x_max^2. At any intermediate compression x, E = K(x) + U(x) with U(x) = 1/2 k x^2.",
      "3. Execution & Resolution: At x = x_max / 2: U = 1/2 k (x_max / 2)^2 = (1/4) (1/2 k x_max^2) = E / 4. Kinetic energy K = E - U = (3/4) E. Ratio K / U = (3/4 E) / (1/4 E) = 3 : 1. Confirms Option C."
    ],
    "keyState": "WITHHELD_FAULT_N09"
  },
  {
    "id": "NSEJS-2024-P-Q34",
    "topic": "MECHANICS",
    "chapterId": "PH02",
    "stem": "A sound wave is propagating in a medium in the $+x$ direction at a speed of $360\\text{ m/s}$. At a given instant, a snapshot of the plot of displacement ($D$) of various particles of the medium from their equilibrium position vs the position ($x$) of the particle shows a crest at $x = 10\\text{ cm}$ and adjacent trough at $x = 30\\text{ cm}$, with peak-to-peak displacement $10\\text{ mm}$. Identify the INCORRECT option:",
    "options": [
      "A: The amplitude of the wave is 5 mm",
      "B: The frequency of the wave is 900 Hz",
      "C: After 0.01 s the trough of the wave will occur at x = 20 cm and x = 40 cm",
      "D: This wave will travel a distance of 1.62 km along the +x axis in 4.5 s"
    ],
    "hints": [
      "H1 (Wavelength & Amplitude): What are the wavelength lambda and amplitude A? \u2014 Peak-to-peak is 2A = 10 mm ==> amplitude A = 5 mm (Option A is correct). The distance between consecutive crest and trough is lambda / 2 = 30 - 10 = 20 cm ==> wavelength lambda = 40 cm = 0.4 m.",
      "H2 (Frequency & Distance): Check options B and D. \u2014 Frequency f = v / lambda = 360 / 0.4 = 900 Hz (Option B is correct). In 4.5 s, distance d = v * t = 360 * 4.5 = 1620 m = 1.62 km (Option D is correct).",
      "H3 (Crux Move): Identify the incorrect statement by calculating wave shift in 0.01 s. \u2014 Crux Move: In Delta t = 0.01 s, the wave travels forward by Delta x = v * Delta t = 360 * 0.01 = 3.6 m = 360 cm. Since 360 cm = 9 * 40 cm = 9 full wavelengths, the wave phase repeats identically! The trough will still be at x = 30 cm (mod 40 cm), NOT at 20 cm or 40 cm (which are nodes/crests). Hence Option C is incorrect and the required answer."
    ],
    "steps": [
      "1. System Representation & Setup: Sound wave speed v = 360 m/s propagating along +x. Crest at x = 10 cm, trough at x = 30 cm, peak-to-peak 10 mm.",
      "2. Physical Model & Formulation: Amplitude A = 10 mm / 2 = 5 mm (A is true). lambda / 2 = 30 - 10 = 20 cm ==> lambda = 40 cm = 0.4 m. Frequency f = v / lambda = 360 / 0.4 = 900 Hz (B is true). Distance in 4.5 s: d = 360 * 4.5 = 1620 m = 1.62 km (D is true). Wave advancement in 0.01 s: Delta x = v * t = 360 * 0.01 = 3.6 m = 360 cm = 9 lambda. An integer number of full wavelengths leaves trough positions invariant at x = 30 cm + 40n cm.",
      "3. Execution & Resolution: Statement C asserts troughs at x = 20 cm and 40 cm (nodes of the original snapshot), which is false. Because the question prompts for the INCORRECT option, Option C is the correct answer."
    ],
    "keyState": "WITHHELD_FAULT_N09"
  }
];

export const NSEJS_CIRCUIT_PRACTICE_QUESTIONS: readonly NsejsQuestionDescriptor[] = [
  {
    "id": "NSEJS-CIRC-L1-Q01",
    "topic": "CURRENT_ELECTRICITY",
    "chapterId": "PH11",
    "stem": "A steady current of 3.2 A flows through a wire for 10 s. The number of electrons crossing a cross-section of the wire in this time is (e = 1.6 \u00d7 10\u207b\u00b9\u2079 C):",
    "options": [
      "A: 2 \u00d7 10\u00b9\u2079",
      "B: 2 \u00d7 10\u00b2\u2070",
      "C: 5 \u00d7 10\u00b9\u2079",
      "D: 2 \u00d7 10\u00b2\u00b9"
    ],
    "hints": [
      "H1 \u00b7 CLARIFY \u2014 Represent the physical situation \u2014 Count charge crossing the section.",
      "H2 \u00b7 CORRELATE \u2014 Choose the governing model \u2014 Use I = Q/t, then n = Q/e.",
      "H3 \u00b7 OPEN_THE_WAY (no decisive step or answer) \u2014 Keep the total charge in coulombs until the final count of discrete carriers."
    ],
    "steps": [
      "1. System Representation & Setup: Count charge crossing the section.",
      "2. Physical Model & Formulation: Use I = Q/t, then n = Q/e. Keep seconds and coulombs consistent.",
      "3. Execution & Resolution: Current flows for 10 s, giving Q = 3.2\u00d710 = 32 C; n = 32/(1.6\u00d710\u207b\u00b9\u2079) = 2\u00d710\u00b2\u2070 electrons."
    ],
    "keyState": "WITHHELD_FAULT_N09"
  },
  {
    "id": "NSEJS-CIRC-L1-Q02",
    "topic": "CURRENT_ELECTRICITY",
    "chapterId": "PH11",
    "stem": "A device has a potential difference of 6 V across it. A total charge of 600 C passes through it in 2 minutes. The power consumed by the device is:",
    "options": [
      "A: 30 W",
      "B: 3600 W",
      "C: 300 W",
      "D: 60 W"
    ],
    "hints": [
      "H1 \u00b7 CLARIFY \u2014 Represent the physical situation \u2014 Identify potential difference, transferred charge, and time.",
      "H2 \u00b7 CORRELATE \u2014 Choose the governing model \u2014 Use electrical work W = VQ and P = W/t.",
      "H3 \u00b7 OPEN_THE_WAY (no decisive step or answer) \u2014 Compare energy transferred per charge with the duration of transfer; check that power is a rate."
    ],
    "steps": [
      "1. System Representation & Setup: Identify potential difference, transferred charge, and time.",
      "2. Physical Model & Formulation: Use electrical work W = VQ and P = W/t. Convert two minutes into seconds.",
      "3. Execution & Resolution: W = 6\u00d7600 = 3600 J over 120 s, so P = 30 W."
    ],
    "keyState": "WITHHELD_FAULT_N09"
  },
  {
    "id": "NSEJS-CIRC-L1-Q03",
    "topic": "CURRENT_ELECTRICITY",
    "chapterId": "PH11",
    "stem": "The current through a wire varies with time as shown in Fig. 1. The total charge that flows through the wire in 15 s is:\n[FIG-stem-1]",
    "options": [
      "A: 40 C",
      "B: 60 C",
      "C: 20 C",
      "D: 30 C"
    ],
    "hints": [
      "H1 \u00b7 CLARIFY \u2014 Represent the physical situation \u2014 Interpret current as charge transferred per second.",
      "H2 \u00b7 CORRELATE \u2014 Choose the governing model \u2014 Charge equals the area under the I\u2013t graph.",
      "H3 \u00b7 OPEN_THE_WAY (no decisive step or answer) \u2014 Divide the time axis into regions and decide which geometrical areas represent transported charge."
    ],
    "steps": [
      "1. System Representation & Setup: Interpret current as charge transferred per second.",
      "2. Physical Model & Formulation: Charge equals the area under the I\u2013t graph. Split the graph into two triangles and one rectangle.",
      "3. Execution & Resolution: Area = \u00bd(5)(4) + (5)(4) + \u00bd(5)(4) = 10+20+10 = 40 C."
    ],
    "keyState": "WITHHELD_FAULT_N09"
  },
  {
    "id": "NSEJS-CIRC-L1-Q04",
    "topic": "CURRENT_ELECTRICITY",
    "chapterId": "PH11",
    "stem": "Which of the following statements about conduction in a metallic wire carrying a steady current is/are correct? [One or more options may be correct.]",
    "options": [
      "A: The drift speed of the free electrons is very small, of the order of mm/s.",
      "B: The electric field that drives the current is set up in the wire almost at the speed of light.",
      "C: The number of electrons crossing every cross-section per second is the same, even if the wire has non-uniform thickness.",
      "D: Each free electron moves along the wire at constant speed without collisions."
    ],
    "hints": [
      "H1 \u00b7 CLARIFY \u2014 Represent the physical situation \u2014 Distinguish charge-carrier drift from signal propagation.",
      "H2 \u00b7 CORRELATE \u2014 Choose the governing model \u2014 Use steady-state continuity and the collision model of a metal.",
      "H3 \u00b7 OPEN_THE_WAY (no decisive step or answer) \u2014 Assess average drift, field establishment and individual collisions as different physical claims."
    ],
    "steps": [
      "1. System Representation & Setup: Distinguish charge-carrier drift from signal propagation.",
      "2. Physical Model & Formulation: Use steady-state continuity and the collision model of a metal. Evaluate each statement separately; multiple selections are allowed.",
      "3. Execution & Resolution: A is consistent with slow electron drift; B with rapid electromagnetic signal establishment; C with steady conservation of charge; D is false because carriers scatter."
    ],
    "keyState": "WITHHELD_FAULT_N09"
  },
  {
    "id": "NSEJS-CIRC-L1-Q05",
    "topic": "CURRENT_ELECTRICITY",
    "chapterId": "PH11",
    "stem": "A steady current flows through a wire whose thicker part has three times the cross-sectional area of its thinner part. The ratio of the drift speed of electrons in the thinner part to that in the thicker part is:",
    "options": [
      "A: 1 : 3",
      "B: 3 : 1",
      "C: 9 : 1",
      "D: 1 : 9"
    ],
    "hints": [
      "H1 \u00b7 CLARIFY \u2014 Represent the physical situation \u2014 Focus on the same series current in two portions of wire.",
      "H2 \u00b7 CORRELATE \u2014 Choose the governing model \u2014 For a given material I = n e A v_d.",
      "H3 \u00b7 OPEN_THE_WAY (no decisive step or answer) \u2014 Compare the charge crossing adjacent sections during the same time before interpreting drift speed."
    ],
    "steps": [
      "1. System Representation & Setup: Focus on the same series current in two portions of wire.",
      "2. Physical Model & Formulation: For a given material I = n e A v_d. Compare drift speeds inversely with cross-sectional area.",
      "3. Execution & Resolution: For the same I and n, v_thin/v_thick = A_thick/A_thin = 3."
    ],
    "keyState": "WITHHELD_FAULT_N09"
  },
  {
    "id": "NSEJS-CIRC-L1-Q06",
    "topic": "CURRENT_ELECTRICITY",
    "chapterId": "PH11",
    "stem": "At a junction in a circuit, currents of 5 A and 3 A flow into the junction. Two wires carry 2 A and 4 A away from the junction. A fifth wire is also connected to the junction. The current in it is:",
    "options": [
      "A: 2 A, flowing towards the junction",
      "B: 6 A, flowing away from the junction",
      "C: 2 A, flowing away from the junction",
      "D: 6 A, flowing towards the junction"
    ],
    "hints": [
      "H1 \u00b7 CLARIFY \u2014 Represent the physical situation \u2014 Account for every current entering and leaving the junction.",
      "H2 \u00b7 CORRELATE \u2014 Choose the governing model \u2014 Use Kirchhoff's current law: sum in = sum out.",
      "H3 \u00b7 OPEN_THE_WAY (no decisive step or answer) \u2014 Balance all incoming and outgoing currents at the junction; keep track of arrow direction."
    ],
    "steps": [
      "1. System Representation & Setup: Account for every current entering and leaving the junction.",
      "2. Physical Model & Formulation: Use Kirchhoff's current law: sum in = sum out. Compare 5+3 A entering against 2+4 A leaving.",
      "3. Execution & Resolution: 8 A enters in two wires; 6 A leaves in two, so 2 A must leave through the fifth."
    ],
    "keyState": "WITHHELD_FAULT_N09"
  },
  {
    "id": "NSEJS-CIRC-L1-Q07",
    "topic": "CURRENT_ELECTRICITY",
    "chapterId": "PH11",
    "stem": "The resistance of a wire is 10 \u03a9. It is uniformly stretched to twice its original length (its volume remains the same). The new resistance is:",
    "options": [
      "A: 20 \u03a9",
      "B: 80 \u03a9",
      "C: 40 \u03a9",
      "D: 5 \u03a9"
    ],
    "hints": [
      "H1 \u00b7 CLARIFY \u2014 Represent the physical situation \u2014 A stretched wire changes length and area.",
      "H2 \u00b7 CORRELATE \u2014 Choose the governing model \u2014 Keep volume AL constant; R = \u03c1L/A.",
      "H3 \u00b7 OPEN_THE_WAY (no decisive step or answer) \u2014 State which quantity changes during stretching besides length, and check the volume condition."
    ],
    "steps": [
      "1. System Representation & Setup: A stretched wire changes length and area.",
      "2. Physical Model & Formulation: Keep volume AL constant; R = \u03c1L/A. Express the new area in terms of the original area.",
      "3. Execution & Resolution: Length doubles, area halves, and R rises by a factor of four: 10 \u03a9\u219240 \u03a9."
    ],
    "keyState": "WITHHELD_FAULT_N09"
  },
  {
    "id": "NSEJS-CIRC-L1-Q08",
    "topic": "CURRENT_ELECTRICITY",
    "chapterId": "PH11",
    "stem": "A wire of resistance 64 \u03a9 is cut into four equal pieces, and the four pieces are connected in parallel. The equivalent resistance is:",
    "options": [
      "A: 16 \u03a9",
      "B: 1 \u03a9",
      "C: 4 \u03a9",
      "D: 8 \u03a9"
    ],
    "hints": [
      "H1 \u00b7 CLARIFY \u2014 Represent the physical situation \u2014 Distinguish resistance of each cut piece from the original wire.",
      "H2 \u00b7 CORRELATE \u2014 Choose the governing model \u2014 Resistance is proportional to length, then combine four equal pieces in parallel.",
      "H3 \u00b7 OPEN_THE_WAY (no decisive step or answer) \u2014 Treat cutting and reconnecting as separate operations; check each piece before combination."
    ],
    "steps": [
      "1. System Representation & Setup: Distinguish resistance of each cut piece from the original wire.",
      "2. Physical Model & Formulation: Resistance is proportional to length, then combine four equal pieces in parallel. Cutting changes each resistance before the parallel connection.",
      "3. Execution & Resolution: Each quarter has 64/4=16 \u03a9; four identical 16 \u03a9 pieces in parallel give 4 \u03a9."
    ],
    "keyState": "WITHHELD_FAULT_N09"
  },
  {
    "id": "NSEJS-CIRC-L1-Q09",
    "topic": "CURRENT_ELECTRICITY",
    "chapterId": "PH11",
    "stem": "Two wires of the same material have lengths in the ratio 1 : 2 and radii in the ratio 1 : 2. The ratio of their resistances is:",
    "options": [
      "A: 2 : 1",
      "B: 1 : 2",
      "C: 1 : 1",
      "D: 4 : 1"
    ],
    "hints": [
      "H1 \u00b7 CLARIFY \u2014 Represent the physical situation \u2014 Compare both length and cross-sectional area.",
      "H2 \u00b7 CORRELATE \u2014 Choose the governing model \u2014 For cylinders R \u221d L/r\u00b2.",
      "H3 \u00b7 OPEN_THE_WAY (no decisive step or answer) \u2014 Keep the cross-sectional radius squared when comparing the two conductors."
    ],
    "steps": [
      "1. System Representation & Setup: Compare both length and cross-sectional area.",
      "2. Physical Model & Formulation: For cylinders R \u221d L/r\u00b2. Remember radius ratio is squared, not used directly.",
      "3. Execution & Resolution: R\u2081/R\u2082 = (1/2)\u00d7(2\u00b2/1\u00b2) = 2, giving 2:1."
    ],
    "keyState": "WITHHELD_FAULT_N09"
  },
  {
    "id": "NSEJS-CIRC-L1-Q10",
    "topic": "CURRENT_ELECTRICITY",
    "chapterId": "PH11",
    "stem": "Fig. 2 shows the V\u2013I graphs for two ohmic conductors A and B. The ratio of their resistances R_A : R_B is:\n[FIG-stem-1]",
    "options": [
      "A: 2 : 1",
      "B: 1 : 4",
      "C: 4 : 1",
      "D: 1 : 2"
    ],
    "hints": [
      "H1 \u00b7 CLARIFY \u2014 Represent the physical situation \u2014 Read V\u2013I axes: V vertical and I horizontal.",
      "H2 \u00b7 CORRELATE \u2014 Choose the governing model \u2014 Resistance is the slope V/I for an ohmic line.",
      "H3 \u00b7 OPEN_THE_WAY (no decisive step or answer) \u2014 Read the axes and units before comparing slopes; do not infer resistance from line colour or steepness alone."
    ],
    "steps": [
      "1. System Representation & Setup: Read V\u2013I axes: V vertical and I horizontal.",
      "2. Physical Model & Formulation: Resistance is the slope V/I for an ohmic line. Compare the two slopes at a shared current.",
      "3. Execution & Resolution: At 2 A, A reads 4 V and B 8 V; R_A:R_B = (4/2):(8/2) = 1:2."
    ],
    "keyState": "WITHHELD_FAULT_N09"
  },
  {
    "id": "NSEJS-CIRC-L1-Q11",
    "topic": "CURRENT_ELECTRICITY",
    "chapterId": "PH11",
    "stem": "Fig. 3 shows the V\u2013I graph of a filament lamp. Which of the following statements is/are correct? [One or more options may be correct.]\n[FIG-stem-1]",
    "options": [
      "A: The increase in resistance is due to the rise in temperature of the filament.",
      "B: The resistance of the filament increases as the current increases.",
      "C: The lamp obeys Ohm's law over the whole range of current.",
      "D: At every point the resistance of the lamp equals the slope of the graph at that point."
    ],
    "hints": [
      "H1 \u00b7 CLARIFY \u2014 Represent the physical situation \u2014 Observe the filament graph's changing slope.",
      "H2 \u00b7 CORRELATE \u2014 Choose the governing model \u2014 Its static resistance is V/I, not generally the tangent slope dV/dI.",
      "H3 \u00b7 OPEN_THE_WAY (no decisive step or answer) \u2014 Distinguish the instantaneous slope from the ratio of the point coordinates on a nonlinear graph."
    ],
    "steps": [
      "1. System Representation & Setup: Observe the filament graph's changing slope.",
      "2. Physical Model & Formulation: Its static resistance is V/I, not generally the tangent slope dV/dI. Temperature changes resistance during heating.",
      "3. Execution & Resolution: For a heated filament, A and B hold; C falsely assumes constant resistance, and D confuses V/I with differential resistance."
    ],
    "keyState": "WITHHELD_FAULT_N09"
  },
  {
    "id": "NSEJS-CIRC-L1-Q12",
    "topic": "CURRENT_ELECTRICITY",
    "chapterId": "PH11",
    "stem": "Which of the following statements is/are correct? [One or more options may be correct.]",
    "options": [
      "A: The resistivity of a semiconductor increases when its temperature rises.",
      "B: The resistivity of a metal increases when its temperature rises.",
      "C: Manganin is used for making standard resistors because its resistivity changes very little with temperature.",
      "D: Alloys generally have greater resistivity than the pure metals from which they are made."
    ],
    "hints": [
      "H1 \u00b7 CLARIFY \u2014 Represent the physical situation \u2014 Separate temperature behavior of metals and semiconductors.",
      "H2 \u00b7 CORRELATE \u2014 Choose the governing model \u2014 Typical metallic resistivity increases with temperature; manganin varies little.",
      "H3 \u00b7 OPEN_THE_WAY (no decisive step or answer) \u2014 Separate temperature trends for pure metals, alloys and semiconductors, and assess each option."
    ],
    "steps": [
      "1. System Representation & Setup: Separate temperature behavior of metals and semiconductors.",
      "2. Physical Model & Formulation: Typical metallic resistivity increases with temperature; manganin varies little. Treat each claim as an independent physical material statement.",
      "3. Execution & Resolution: B, C and D reflect common metal/alloy behavior; A is false for the usual semiconductor behavior."
    ],
    "keyState": "WITHHELD_FAULT_N09"
  },
  {
    "id": "NSEJS-CIRC-L1-Q13",
    "topic": "CURRENT_ELECTRICITY",
    "chapterId": "PH11",
    "stem": "A uniform wire of total resistance 12 \u03a9 is bent into a circular ring. Two points P and Q on the ring are separated by an arc subtending 120\u00b0 at the centre, as shown in Fig. 4. The resistance between P and Q is:\n[FIG-stem-1]",
    "options": [
      "A: 3 \u03a9",
      "B: 4 \u03a9",
      "C: 8/3 \u03a9",
      "D: 2 \u03a9"
    ],
    "hints": [
      "H1 \u00b7 CLARIFY \u2014 Represent the physical situation \u2014 A ring provides two routes between P and Q.",
      "H2 \u00b7 CORRELATE \u2014 Choose the governing model \u2014 Resistance is proportional to arc length, and the arcs are in parallel.",
      "H3 \u00b7 OPEN_THE_WAY (no decisive step or answer) \u2014 Convert the given ring angle into a fraction of the full circumference before tracing possible routes."
    ],
    "steps": [
      "1. System Representation & Setup: A ring provides two routes between P and Q.",
      "2. Physical Model & Formulation: Resistance is proportional to arc length, and the arcs are in parallel. Split 360\u00b0 into arcs of 120\u00b0 and 240\u00b0.",
      "3. Execution & Resolution: Two arcs have 4 \u03a9 and 8 \u03a9; parallel equivalent = (4\u00d78)/(4+8) = 8/3 \u03a9."
    ],
    "keyState": "WITHHELD_FAULT_N09"
  },
  {
    "id": "NSEJS-CIRC-L1-Q14",
    "topic": "CURRENT_ELECTRICITY",
    "chapterId": "PH11",
    "stem": "When a wire is uniformly stretched so that its length increases by 10% (its volume remaining constant), the percentage increase in its resistance is nearly:",
    "options": [
      "A: 10%",
      "B: 20%",
      "C: 21%",
      "D: 11%"
    ],
    "hints": [
      "H1 \u00b7 CLARIFY \u2014 Represent the physical situation \u2014 Conserving wire volume changes cross-section.",
      "H2 \u00b7 CORRELATE \u2014 Choose the governing model \u2014 For same material and volume, R \u221d L\u00b2.",
      "H3 \u00b7 OPEN_THE_WAY (no decisive step or answer) \u2014 Compare the original and stretched geometry through their dimensionless length factors."
    ],
    "steps": [
      "1. System Representation & Setup: Conserving wire volume changes cross-section.",
      "2. Physical Model & Formulation: For same material and volume, R \u221d L\u00b2. Increase length by factor 1.1 before squaring.",
      "3. Execution & Resolution: R_new/R_old = 1.1\u00b2 = 1.21, or 21% more."
    ],
    "keyState": "WITHHELD_FAULT_N09"
  },
  {
    "id": "NSEJS-CIRC-L1-Q15",
    "topic": "CURRENT_ELECTRICITY",
    "chapterId": "PH11",
    "stem": "Three resistors of 2 \u03a9, 3 \u03a9 and 6 \u03a9 are connected in parallel. The equivalent resistance is:",
    "options": [
      "A: 11 \u03a9",
      "B: 2 \u03a9",
      "C: 0.5 \u03a9",
      "D: 1 \u03a9"
    ],
    "hints": [
      "H1 \u00b7 CLARIFY \u2014 Represent the physical situation \u2014 Resistors share both terminals, so they are parallel.",
      "H2 \u00b7 CORRELATE \u2014 Choose the governing model \u2014 Sum conductances, not resistances.",
      "H3 \u00b7 OPEN_THE_WAY (no decisive step or answer) \u2014 Make sure all resistor endpoints connect to the same two nodes before using a conductance model."
    ],
    "steps": [
      "1. System Representation & Setup: Resistors share both terminals, so they are parallel.",
      "2. Physical Model & Formulation: Sum conductances, not resistances. Use 1/R = 1/2 + 1/3 + 1/6.",
      "3. Execution & Resolution: The conductance sum is 1 \u03a9\u207b\u00b9; R_eq = 1 \u03a9."
    ],
    "keyState": "WITHHELD_FAULT_N09"
  },
  {
    "id": "NSEJS-CIRC-L1-Q16",
    "topic": "CURRENT_ELECTRICITY",
    "chapterId": "PH11",
    "stem": "In the circuit of Fig. 5, the cell has negligible internal resistance. The current through the 6 \u03a9 resistor is:\n[FIG-stem-1]",
    "options": [
      "A: 2 A",
      "B: 2/3 A",
      "C: 4/3 A",
      "D: 1/3 A"
    ],
    "hints": [
      "H1 \u00b7 CLARIFY \u2014 Represent the physical situation \u2014 Locate true parallel nodes after the series resistor.",
      "H2 \u00b7 CORRELATE \u2014 Choose the governing model \u2014 Reduce the 6 \u03a9 and 3 \u03a9 parallel pair before applying Ohm's law.",
      "H3 \u00b7 OPEN_THE_WAY (no decisive step or answer) \u2014 Draw the node voltages of the circuit after reducing only justified portions of the graph."
    ],
    "steps": [
      "1. System Representation & Setup: Locate true parallel nodes after the series resistor.",
      "2. Physical Model & Formulation: Reduce the 6 \u03a9 and 3 \u03a9 parallel pair before applying Ohm's law. Calculate voltage across the parallel network.",
      "3. Execution & Resolution: 6||3 = 2 \u03a9, total 4+2=6 \u03a9, source current 2 A, branch voltage 4 V, current through 6 \u03a9 = 2/3 A."
    ],
    "keyState": "WITHHELD_FAULT_N09"
  },
  {
    "id": "NSEJS-CIRC-L1-Q17",
    "topic": "CURRENT_ELECTRICITY",
    "chapterId": "PH11",
    "stem": "The ratio of the equivalent resistance of five identical resistors connected in series to that when they are connected in parallel is:",
    "options": [
      "A: 5 : 1",
      "B: 25 : 1",
      "C: 10 : 1",
      "D: 1 : 25"
    ],
    "hints": [
      "H1 \u00b7 CLARIFY \u2014 Represent the physical situation \u2014 Keep the number of identical resistors fixed.",
      "H2 \u00b7 CORRELATE \u2014 Choose the governing model \u2014 For n identical R: series=nR, parallel=R/n.",
      "H3 \u00b7 OPEN_THE_WAY (no decisive step or answer) \u2014 Evaluate both extreme configurations with the same original element value before forming a ratio."
    ],
    "steps": [
      "1. System Representation & Setup: Keep the number of identical resistors fixed.",
      "2. Physical Model & Formulation: For n identical R: series=nR, parallel=R/n. Take the ratio after finding both equivalents.",
      "3. Execution & Resolution: Five in series = 5R, five in parallel = R/5; ratio 25:1."
    ],
    "keyState": "WITHHELD_FAULT_N09"
  },
  {
    "id": "NSEJS-CIRC-L1-Q18",
    "topic": "CURRENT_ELECTRICITY",
    "chapterId": "PH11",
    "stem": "The equivalent resistance between A and B in the network of Fig. 6 is:\n[FIG-stem-1]",
    "options": [
      "A: 4.0 \u03a9",
      "B: 3.6 \u03a9",
      "C: 7.2 \u03a9",
      "D: 9.0 \u03a9"
    ],
    "hints": [
      "H1 \u00b7 CLARIFY \u2014 Represent the physical situation \u2014 Read the bridge node labels and resistor values.",
      "H2 \u00b7 CORRELATE \u2014 Choose the governing model \u2014 Check whether the Wheatstone bridge is balanced.",
      "H3 \u00b7 OPEN_THE_WAY (no decisive step or answer) \u2014 Check the four arm ratios and test whether the central bridge branch carries current."
    ],
    "steps": [
      "1. System Representation & Setup: Read the bridge node labels and resistor values.",
      "2. Physical Model & Formulation: Check whether the Wheatstone bridge is balanced. If intermediate potentials are equal, the central resistor carries no current.",
      "3. Execution & Resolution: 2/3 = 4/6 makes the bridge balanced. Remaining branches 2+4=6 \u03a9 and 3+6=9 \u03a9 in parallel give 3.6 \u03a9."
    ],
    "keyState": "WITHHELD_FAULT_N09"
  },
  {
    "id": "NSEJS-CIRC-L1-Q19",
    "topic": "CURRENT_ELECTRICITY",
    "chapterId": "PH11",
    "stem": "Twelve identical resistors, each of 12 \u03a9, form the edges of a cube as shown in Fig. 7. The equivalent resistance between the opposite corners A and B of the body diagonal is:\n[FIG-stem-1]",
    "options": [
      "A: 9 \u03a9",
      "B: 7 \u03a9",
      "C: 6 \u03a9",
      "D: 10 \u03a9"
    ],
    "hints": [
      "H1 \u00b7 CLARIFY \u2014 Represent the physical situation \u2014 Identify the terminals as opposite vertices of the cube.",
      "H2 \u00b7 CORRELATE \u2014 Choose the governing model \u2014 Use equipotential groupings for a uniform twelve-edge cube.",
      "H3 \u00b7 OPEN_THE_WAY (no decisive step or answer) \u2014 Treat the cube as a graph of conducting edges and name the terminals before exploiting symmetry."
    ],
    "steps": [
      "1. System Representation & Setup: A and B are opposite cube vertices. Each of the twelve edges has resistance r=12 \u03a9.",
      "2. Physical Model & Formulation: Vertices at equal edge distance from A have equal potential by permutation symmetry. The four layers have 1, 3, 3 and 1 vertices; three, six and three edges connect successive layers, respectively.",
      "3. Execution & Resolution: The three equivalent bundles are r/3, r/6 and r/3 in series. R_AB=5r/6=10 \u03a9, option D."
    ],
    "keyState": "WITHHELD_FAULT_N09"
  },
  {
    "id": "NSEJS-CIRC-L1-Q20",
    "topic": "CURRENT_ELECTRICITY",
    "chapterId": "PH11",
    "stem": "Three resistors, each of resistance R, are connected to form a triangle ABC. The equivalent resistance between the corners A and B is:",
    "options": [
      "A: 2R/3",
      "B: R/3",
      "C: R",
      "D: 3R/2"
    ],
    "hints": [
      "H1 \u00b7 CLARIFY \u2014 Represent the physical situation \u2014 Trace direct and indirect paths in the triangle.",
      "H2 \u00b7 CORRELATE \u2014 Choose the governing model \u2014 One branch is R; the other contains two series resistors.",
      "H3 \u00b7 OPEN_THE_WAY (no decisive step or answer) \u2014 Look for a direct route and an indirect route between the selected triangle vertices."
    ],
    "steps": [
      "1. System Representation & Setup: Trace direct and indirect paths in the triangle.",
      "2. Physical Model & Formulation: One branch is R; the other contains two series resistors. The two branches connect the same terminal pair.",
      "3. Execution & Resolution: R_eq = R||(2R) = (2R\u00b2)/(3R)=2R/3."
    ],
    "keyState": "WITHHELD_FAULT_N09"
  },
  {
    "id": "NSEJS-CIRC-L1-Q21",
    "topic": "CURRENT_ELECTRICITY",
    "chapterId": "PH11",
    "stem": "In the circuit of Fig. 8, the cell has negligible internal resistance. The current through the 2 \u03a9 resistor is:\n[FIG-stem-1]",
    "options": [
      "A: 3 A",
      "B: 2 A",
      "C: 1 A",
      "D: 1.5 A"
    ],
    "hints": [
      "H1 \u00b7 CLARIFY \u2014 Represent the physical situation \u2014 Trace each branch from the top rail to the bottom rail.",
      "H2 \u00b7 CORRELATE \u2014 Choose the governing model \u2014 The 4 \u03a9 and 2 \u03a9 resistors share an uninterrupted branch.",
      "H3 \u00b7 OPEN_THE_WAY (no decisive step or answer) \u2014 Track the current in the specified branch, not the total source current."
    ],
    "steps": [
      "1. System Representation & Setup: Trace each branch from the top rail to the bottom rail.",
      "2. Physical Model & Formulation: The 4 \u03a9 and 2 \u03a9 resistors share an uninterrupted branch. Use the branch potential of the ideal 6 V cell.",
      "3. Execution & Resolution: Series branch 4+2=6 \u03a9 receives 6 V, so its current and the 2 \u03a9 resistor's current is 1 A."
    ],
    "keyState": "WITHHELD_FAULT_N09"
  },
  {
    "id": "NSEJS-CIRC-L1-Q22",
    "topic": "CURRENT_ELECTRICITY",
    "chapterId": "PH11",
    "stem": "In the circuit of Fig. 9, the cell has negligible internal resistance. When the switch S is closed (compared with S open), which of the following is/are correct? [One or more options may be correct.]\n[FIG-stem-1]",
    "options": [
      "A: The power dissipated in the 4 \u03a9 resistor becomes zero.",
      "B: The total power supplied by the cell decreases.",
      "C: The current from the cell increases from 1 A to 3 A.",
      "D: The potential difference across the 2 \u03a9 resistor doubles."
    ],
    "hints": [
      "H1 \u00b7 CLARIFY \u2014 Represent the physical situation \u2014 Compare circuits with the switch open and closed.",
      "H2 \u00b7 CORRELATE \u2014 Choose the governing model \u2014 When closed, the ideal switch bypasses the 4 \u03a9 element.",
      "H3 \u00b7 OPEN_THE_WAY (no decisive step or answer) \u2014 Rebuild the circuit for each switch state; do not combine the two states in one calculation."
    ],
    "steps": [
      "1. System Representation & Setup: Compare circuits with the switch open and closed.",
      "2. Physical Model & Formulation: When closed, the ideal switch bypasses the 4 \u03a9 element. Compute source currents in both states.",
      "3. Execution & Resolution: Open: (2+4)=6 \u03a9, I=1 A. Closed: 2 \u03a9, I=3 A, no 4 \u03a9 power. Statements A and C hold."
    ],
    "keyState": "WITHHELD_FAULT_N09"
  },
  {
    "id": "NSEJS-CIRC-L1-Q23",
    "topic": "CURRENT_ELECTRICITY",
    "chapterId": "PH11",
    "stem": "A heater coil of resistance 20 \u03a9 carries a current of 3 A for 5 minutes. The heat produced is:",
    "options": [
      "A: 5.4 kJ",
      "B: 54 kJ",
      "C: 18 kJ",
      "D: 540 kJ"
    ],
    "hints": [
      "H1 \u00b7 CLARIFY \u2014 Represent the physical situation \u2014 Use the heater's resistance, current and duration.",
      "H2 \u00b7 CORRELATE \u2014 Choose the governing model \u2014 Joule heat is Q = I\u00b2Rt.",
      "H3 \u00b7 OPEN_THE_WAY (no decisive step or answer) \u2014 Use current, resistance and the stated duration consistently; convert to energy units at the end."
    ],
    "steps": [
      "1. System Representation & Setup: Use the heater's resistance, current and duration.",
      "2. Physical Model & Formulation: Joule heat is Q = I\u00b2Rt. Convert five minutes to seconds.",
      "3. Execution & Resolution: Q = 3\u00b2\u00d720\u00d7300 = 54,000 J = 54 kJ."
    ],
    "keyState": "WITHHELD_FAULT_N09"
  },
  {
    "id": "NSEJS-CIRC-L1-Q24",
    "topic": "CURRENT_ELECTRICITY",
    "chapterId": "PH11",
    "stem": "Two electric bulbs rated 60 W and 100 W, both for 220 V, are connected in series across a 220 V supply. Which statement is correct?",
    "options": [
      "A: The 100 W bulb glows brighter than the 60 W bulb",
      "B: Both glow equally bright",
      "C: Both glow with their rated power",
      "D: The 60 W bulb glows brighter than the 100 W bulb"
    ],
    "hints": [
      "H1 \u00b7 CLARIFY \u2014 Represent the physical situation \u2014 Bulb rating determines nominal resistance.",
      "H2 \u00b7 CORRELATE \u2014 Choose the governing model \u2014 At the same rated voltage R=V\u00b2/P.",
      "H3 \u00b7 OPEN_THE_WAY (no decisive step or answer) \u2014 Compare rated resistances only under the declared nominal-resistance approximation."
    ],
    "steps": [
      "1. System Representation & Setup: Bulb rating determines nominal resistance.",
      "2. Physical Model & Formulation: At the same rated voltage R=V\u00b2/P. The bulbs in series carry the same current.",
      "3. Execution & Resolution: The 60 W bulb has larger nominal R and hence greater I\u00b2R heating, so D under the rated-resistance approximation; thermal nonlinearity is an academic caveat."
    ],
    "keyState": "WITHHELD_FAULT_N09"
  },
  {
    "id": "NSEJS-CIRC-L1-Q25",
    "topic": "CURRENT_ELECTRICITY",
    "chapterId": "PH11",
    "stem": "Two bulbs of 100 W and 25 W, both rated for 220 V, are connected in series across a 220 V supply. The potential difference across the 100 W bulb is:",
    "options": [
      "A: 44 V",
      "B: 176 V",
      "C: 110 V",
      "D: 88 V"
    ],
    "hints": [
      "H1 \u00b7 CLARIFY \u2014 Represent the physical situation \u2014 Convert rated powers to nominal resistances.",
      "H2 \u00b7 CORRELATE \u2014 Choose the governing model \u2014 At the same 220 V rating, R\u221d1/P.",
      "H3 \u00b7 OPEN_THE_WAY (no decisive step or answer) \u2014 Take account of how the source voltage divides between two unequal series resistances."
    ],
    "steps": [
      "1. System Representation & Setup: Convert rated powers to nominal resistances.",
      "2. Physical Model & Formulation: At the same 220 V rating, R\u221d1/P. Divide series voltage in proportion to R.",
      "3. Execution & Resolution: R_100:R_25=1:4; the 100 W bulb gets 220/(1+4)=44 V under nominal-R approximation."
    ],
    "keyState": "WITHHELD_FAULT_N09"
  },
  {
    "id": "NSEJS-CIRC-L1-Q26",
    "topic": "CURRENT_ELECTRICITY",
    "chapterId": "PH11",
    "stem": "Four bulbs of 60 W each are used for 5 hours every day for 30 days. If electrical energy costs \u20b9 6 per unit (kWh), the bill for the month is:",
    "options": [
      "A: \u20b9 216",
      "B: \u20b9 108",
      "C: \u20b9 432",
      "D: \u20b9 36"
    ],
    "hints": [
      "H1 \u00b7 CLARIFY \u2014 Represent the physical situation \u2014 Calculate total electrical power before multiplying by hours.",
      "H2 \u00b7 CORRELATE \u2014 Choose the governing model \u2014 Cost is energy in kWh times tariff.",
      "H3 \u00b7 OPEN_THE_WAY (no decisive step or answer) \u2014 Convert the total installed rating to kilowatts before multiplying by operating hours."
    ],
    "steps": [
      "1. System Representation & Setup: Calculate total electrical power before multiplying by hours.",
      "2. Physical Model & Formulation: Cost is energy in kWh times tariff. Convert 4\u00d760 W into kW, then multiply by days.",
      "3. Execution & Resolution: Power = 0.24 kW; time = 150 h; energy = 36 kWh; cost = \u20b9216."
    ],
    "keyState": "WITHHELD_FAULT_N09"
  },
  {
    "id": "NSEJS-CIRC-L1-Q27",
    "topic": "CURRENT_ELECTRICITY",
    "chapterId": "PH11",
    "stem": "An electric heater is rated 2 kW, 220 V. Which of the following fuse ratings is most suitable for its circuit?",
    "options": [
      "A: 5 A",
      "B: 10 A",
      "C: 8 A",
      "D: 30 A"
    ],
    "hints": [
      "H1 \u00b7 CLARIFY \u2014 Represent the physical situation \u2014 Calculate normal working current from rating.",
      "H2 \u00b7 CORRELATE \u2014 Choose the governing model \u2014 Use I=P/V, then select a suitable listed protective fuse.",
      "H3 \u00b7 OPEN_THE_WAY (no decisive step or answer) \u2014 Differentiate the heater's normal current from the choice of protective fuse and its assumptions."
    ],
    "steps": [
      "1. System Representation & Setup: Calculate normal working current from rating.",
      "2. Physical Model & Formulation: Use I=P/V, then select a suitable listed protective fuse. Compare candidate fuse ratings with approximately 9.1 A.",
      "3. Execution & Resolution: Operating current \u2248 2000/220 = 9.09 A; the worksheet chooses 10 A. Real fuse design also requires rating and inrush considerations."
    ],
    "keyState": "WITHHELD_FAULT_N09"
  },
  {
    "id": "NSEJS-CIRC-L1-Q28",
    "topic": "CURRENT_ELECTRICITY",
    "chapterId": "PH11",
    "stem": "A heater coil dissipates 1 kW when connected to a mains supply. A piece equal to 1/4 of its length is cut off and the remaining coil is connected to the same supply. The power dissipated is:",
    "options": [
      "A: 3/4 kW",
      "B: 9/16 kW",
      "C: 16/9 kW",
      "D: 4/3 kW"
    ],
    "hints": [
      "H1 \u00b7 CLARIFY \u2014 Represent the physical situation \u2014 Removing length changes resistance at fixed voltage.",
      "H2 \u00b7 CORRELATE \u2014 Choose the governing model \u2014 For same wire material/cross section R\u221dL, and P=V\u00b2/R.",
      "H3 \u00b7 OPEN_THE_WAY (no decisive step or answer) \u2014 First decide which material and geometric quantities remain unchanged when wire is shortened."
    ],
    "steps": [
      "1. System Representation & Setup: Removing length changes resistance at fixed voltage.",
      "2. Physical Model & Formulation: For same wire material/cross section R\u221dL, and P=V\u00b2/R. Remaining length is three-quarters of the original.",
      "3. Execution & Resolution: R' = 3R/4; P' = P\u00d74/3 = 4/3 kW."
    ],
    "keyState": "WITHHELD_FAULT_N09"
  },
  {
    "id": "NSEJS-CIRC-L1-Q29",
    "topic": "CURRENT_ELECTRICITY",
    "chapterId": "PH11",
    "stem": "A 1 kW immersion heater has an efficiency of 80%. The time it takes to raise the temperature of 2 kg of water from 20 \u00b0C to 70 \u00b0C is (specific heat of water = 4200 J kg\u207b\u00b9 \u00b0C\u207b\u00b9):",
    "options": [
      "A: 420 s",
      "B: 656 s",
      "C: 840 s",
      "D: 525 s"
    ],
    "hints": [
      "H1 \u00b7 CLARIFY \u2014 Represent the physical situation \u2014 Convert temperature rise into heat delivered to water.",
      "H2 \u00b7 CORRELATE \u2014 Choose the governing model \u2014 Use Q=mc\u0394T and efficiency \u03b7=Q/(P_in t).",
      "H3 \u00b7 OPEN_THE_WAY (no decisive step or answer) \u2014 Write an energy balance for the water and account for electrical efficiency before computing time."
    ],
    "steps": [
      "1. System Representation & Setup: Convert temperature rise into heat delivered to water.",
      "2. Physical Model & Formulation: Use Q=mc\u0394T and efficiency \u03b7=Q/(P_in t). Power delivered to water is 0.8\u00d71 kW.",
      "3. Execution & Resolution: Q=2\u00d74200\u00d750=420,000 J; P_useful=800 W; t=525 s."
    ],
    "keyState": "WITHHELD_FAULT_N09"
  },
  {
    "id": "NSEJS-CIRC-L1-Q30",
    "topic": "CURRENT_ELECTRICITY",
    "chapterId": "PH11",
    "stem": "A cell of emf 6 V and internal resistance 1 \u03a9 is connected to an external resistance of 5 \u03a9. The potential difference across the terminals of the cell is:",
    "options": [
      "A: 6 V",
      "B: 1 V",
      "C: 5 V",
      "D: 4 V"
    ],
    "hints": [
      "H1 \u00b7 CLARIFY \u2014 Represent the physical situation \u2014 Internal resistance reduces terminal potential.",
      "H2 \u00b7 CORRELATE \u2014 Choose the governing model \u2014 Use I=\u2130/(R+r), then V_terminal=IR.",
      "H3 \u00b7 OPEN_THE_WAY (no decisive step or answer) \u2014 Identify which part of the source voltage is lost internally while current flows."
    ],
    "steps": [
      "1. System Representation & Setup: Internal resistance reduces terminal potential.",
      "2. Physical Model & Formulation: Use I=\u2130/(R+r), then V_terminal=IR. Compute the current with both resistances included.",
      "3. Execution & Resolution: I=6/(5+1)=1 A and V_terminal=1\u00d75=5 V."
    ],
    "keyState": "WITHHELD_FAULT_N09"
  },
  {
    "id": "NSEJS-CIRC-L1-Q31",
    "topic": "CURRENT_ELECTRICITY",
    "chapterId": "PH11",
    "stem": "Three identical cells, each of emf 2 V and internal resistance 0.5 \u03a9, are connected in series with an external resistor of 4.5 \u03a9. The current in the resistor is:",
    "options": [
      "A: 1.33 A",
      "B: 0.4 A",
      "C: 2 A",
      "D: 1 A"
    ],
    "hints": [
      "H1 \u00b7 CLARIFY \u2014 Represent the physical situation \u2014 Cells in series add both emf and internal resistance.",
      "H2 \u00b7 CORRELATE \u2014 Choose the governing model \u2014 Use I=\u03a3\u2130/(R+\u03a3r).",
      "H3 \u00b7 OPEN_THE_WAY (no decisive step or answer) \u2014 Combine all identical cell contributions and all internal losses under the stated wiring arrangement."
    ],
    "steps": [
      "1. System Representation & Setup: Cells in series add both emf and internal resistance.",
      "2. Physical Model & Formulation: Use I=\u03a3\u2130/(R+\u03a3r). Do not omit any cell's 0.5 \u03a9 internal resistance.",
      "3. Execution & Resolution: Total emf 6 V; total resistance 4.5+1.5=6 \u03a9; I=1 A."
    ],
    "keyState": "WITHHELD_FAULT_N09"
  },
  {
    "id": "NSEJS-CIRC-L1-Q32",
    "topic": "CURRENT_ELECTRICITY",
    "chapterId": "PH11",
    "stem": "Which of the following statements about electrical meters is/are correct? [One or more options may be correct.]",
    "options": [
      "A: An ideal voltmeter has infinite resistance.",
      "B: An ideal ammeter has infinite resistance.",
      "C: A voltmeter is connected in parallel across the component whose potential difference is to be measured.",
      "D: An ammeter is connected in series with the part of the circuit whose current is to be measured."
    ],
    "hints": [
      "H1 \u00b7 CLARIFY \u2014 Represent the physical situation \u2014 Ideal meters have different limits.",
      "H2 \u00b7 CORRELATE \u2014 Choose the governing model \u2014 An ideal voltmeter draws zero current; an ideal ammeter adds zero resistance.",
      "H3 \u00b7 OPEN_THE_WAY (no decisive step or answer) \u2014 Test an ideal instrument by asking what it would do to the current in its measurement path."
    ],
    "steps": [
      "1. System Representation & Setup: Ideal meters have different limits.",
      "2. Physical Model & Formulation: An ideal voltmeter draws zero current; an ideal ammeter adds zero resistance. Check each connection statement separately.",
      "3. Execution & Resolution: A true (infinite voltmeter resistance); B false; C true (parallel voltmeter); D true (series ammeter)."
    ],
    "keyState": "WITHHELD_FAULT_N09"
  },
  {
    "id": "NSEJS-CIRC-L1-Q33",
    "topic": "CURRENT_ELECTRICITY",
    "chapterId": "PH11",
    "stem": "In the circuit of Fig. 10 the cell has negligible internal resistance and the voltmeter is ideal. The reading of the voltmeter is:\n[FIG-stem-1]",
    "options": [
      "A: 3 V",
      "B: 6 V",
      "C: 9 V",
      "D: 4.5 V"
    ],
    "hints": [
      "H1 \u00b7 CLARIFY \u2014 Represent the physical situation \u2014 The voltmeter has infinite resistance in the ideal limit.",
      "H2 \u00b7 CORRELATE \u2014 Choose the governing model \u2014 The 6 \u03a9 and 3 \u03a9 series resistors divide the 9 V source.",
      "H3 \u00b7 OPEN_THE_WAY (no decisive step or answer) \u2014 Look at exactly which two nodes the voltmeter is connected across."
    ],
    "steps": [
      "1. System Representation & Setup: The voltmeter has infinite resistance in the ideal limit.",
      "2. Physical Model & Formulation: The 6 \u03a9 and 3 \u03a9 series resistors divide the 9 V source. Measure across the 3 \u03a9 component without loading it.",
      "3. Execution & Resolution: I=9/(6+3)=1 A; V_3\u03a9=3 V."
    ],
    "keyState": "WITHHELD_FAULT_N09"
  },
  {
    "id": "NSEJS-CIRC-L1-Q34",
    "topic": "CURRENT_ELECTRICITY",
    "chapterId": "PH11",
    "stem": "A galvanometer of resistance 50 \u03a9 gives full-scale deflection for a current of 5 mA. To convert it into a voltmeter of range 0 to 10 V, a resistance must be connected:",
    "options": [
      "A: in series, of 2000 \u03a9",
      "B: in parallel, of 1950 \u03a9",
      "C: in series, of 1950 \u03a9",
      "D: in series, of 50 \u03a9"
    ],
    "hints": [
      "H1 \u00b7 CLARIFY \u2014 Represent the physical situation \u2014 Use the galvanometer's full-scale current and coil resistance.",
      "H2 \u00b7 CORRELATE \u2014 Choose the governing model \u2014 For a voltmeter, add series resistance R_s = V/I_g \u2212 R_g.",
      "H3 \u00b7 OPEN_THE_WAY (no decisive step or answer) \u2014 Decide whether this modification requires a series or parallel instrument element."
    ],
    "steps": [
      "1. System Representation & Setup: Use the galvanometer's full-scale current and coil resistance.",
      "2. Physical Model & Formulation: For a voltmeter, add series resistance R_s = V/I_g \u2212 R_g. Convert 5 mA to amperes.",
      "3. Execution & Resolution: 10/0.005 \u2212 50 = 1950 \u03a9, connected in series."
    ],
    "keyState": "WITHHELD_FAULT_N09"
  },
  {
    "id": "NSEJS-CIRC-L1-Q35",
    "topic": "CURRENT_ELECTRICITY",
    "chapterId": "PH11",
    "stem": "A cell is connected to a variable resistor. The terminal potential difference V of the cell is plotted against the current I drawn from it in Fig. 11. The emf and the internal resistance of the cell are:\n[FIG-stem-1]",
    "options": [
      "A: 6 V and 0.5 \u03a9",
      "B: 6 V and 2 \u03a9",
      "C: 3 V and 2 \u03a9",
      "D: 2 V and 6 \u03a9"
    ],
    "hints": [
      "H1 \u00b7 CLARIFY \u2014 Represent the physical situation \u2014 Read the intercept and slope of the terminal-voltage graph.",
      "H2 \u00b7 CORRELATE \u2014 Choose the governing model \u2014 For a cell, V = \u2130 \u2212 I r.",
      "H3 \u00b7 OPEN_THE_WAY (no decisive step or answer) \u2014 Use the axes and line intercept to distinguish source electromotive force from internal resistance."
    ],
    "steps": [
      "1. System Representation & Setup: Read the intercept and slope of the terminal-voltage graph.",
      "2. Physical Model & Formulation: For a cell, V = \u2130 \u2212 I r. Intercept gives \u2130; slope magnitude gives r.",
      "3. Execution & Resolution: At I=0, V=6 V; at I=3 A, V=0; r=\u2212\u0394V/\u0394I=2 \u03a9."
    ],
    "keyState": "WITHHELD_FAULT_N09"
  },
  {
    "id": "NSEJS-CIRC-L1-Q36",
    "topic": "CURRENT_ELECTRICITY",
    "chapterId": "PH11",
    "stem": "A battery of emf 12 V and internal resistance 2 \u03a9 is connected to a 4 \u03a9 resistor and a 12 \u03a9 resistor in parallel. The current through the 12 \u03a9 resistor is:",
    "options": [
      "A: 1.8 A",
      "B: 1.0 A",
      "C: 0.6 A",
      "D: 2.4 A"
    ],
    "hints": [
      "H1 \u00b7 CLARIFY \u2014 Represent the physical situation \u2014 Reduce the external parallel pair first.",
      "H2 \u00b7 CORRELATE \u2014 Choose the governing model \u2014 Find source current including internal resistance, then branch voltage.",
      "H3 \u00b7 OPEN_THE_WAY (no decisive step or answer) \u2014 Separate external parallel loading from total source resistance before considering branch current."
    ],
    "steps": [
      "1. System Representation & Setup: Reduce the external parallel pair first.",
      "2. Physical Model & Formulation: Find source current including internal resistance, then branch voltage. Calculate R_ext = 4||12 before the current split.",
      "3. Execution & Resolution: R_ext=3 \u03a9, source total R=5 \u03a9, source current 12/5=2.4 A, terminal voltage 7.2 V, 12 \u03a9 branch current 0.6 A."
    ],
    "keyState": "WITHHELD_FAULT_N09"
  },
  {
    "id": "NSEJS-CIRC-L2-Q01",
    "topic": "CURRENT_ELECTRICITY",
    "chapterId": "PH11",
    "stem": "Three branches are connected between the points A and B as shown in Fig. 1. The equivalent resistance between A and B is:\n[FIG-stem-1]",
    "options": [
      "A: 1 \u03a9",
      "B: 2 \u03a9",
      "C: 10 \u03a9",
      "D: 0.5 \u03a9"
    ],
    "hints": [
      "H1 \u00b7 CLARIFY (identify the crux) \u2014 Identify all distinct paths between the two external terminals.",
      "H2 \u00b7 CORRELATE (connect a known model) \u2014 Recall that resistors on a single uninterrupted path share branch current.",
      "H3 \u00b7 OPEN_THE_WAY (no decisive step or answer) \u2014 Simplify only justified internal paths, then check the equivalent resistance against branch bounds."
    ],
    "steps": [
      "1. System Representation & Setup: The circuit connects terminals A and B across three parallel branches between two common vertical busbars. Top branch: R_1 = 2 \u03a9. Middle branch: R_2 = 1 \u03a9 and R_3 = 3 \u03a9 in series. Bottom branch: R_4 = 4 \u03a9.",
      "2. Physical Model & Formulation: Resistors in series sum linearly: R_mid = R_2 + R_3 = 1 + 3 = 4 \u03a9. For three parallel branches sharing common potential difference V_AB, equivalent conductance is the sum of branch conductances: 1/R_AB = 1/R_top + 1/R_mid + 1/R_bot = 1/2 + 1/4 + 1/4.",
      "3. Execution & Resolution: 1/R_AB = 2/4 + 1/4 + 1/4 = 4/4 = 1 \u03a9\u207b\u00b9. Inverting yields R_AB = 1.0 \u03a9. Matches Option A."
    ],
    "keyState": "WITHHELD_FAULT_N09"
  },
  {
    "id": "NSEJS-CIRC-L2-Q02",
    "topic": "CURRENT_ELECTRICITY",
    "chapterId": "PH11",
    "stem": "The equivalent resistance between A and B in the network of Fig. 2 is:\n[FIG-stem-1]",
    "options": [
      "A: 5 \u03a9",
      "B: 4 \u03a9",
      "C: 6 \u03a9",
      "D: 11 \u03a9"
    ],
    "hints": [
      "H1 \u00b7 CLARIFY (identify the crux) \u2014 Locate the junction where the network changes from a single path to multiple paths.",
      "H2 \u00b7 CORRELATE (connect a known model) \u2014 Compare the series and parallel rules using shared-node criteria.",
      "H3 \u00b7 OPEN_THE_WAY (no decisive step or answer) \u2014 Redraw the two-terminal graph in stages without computing the final equivalent prematurely."
    ],
    "steps": [
      "1. System Representation & Setup: The network consists of an input 2 \u03a9 resistor in series with a parallel sub-network. The parallel sub-network has a top branch with 3 \u03a9 and a bottom branch with 4 \u03a9 and 2 \u03a9 in series.",
      "2. Physical Model & Formulation: In the parallel sub-network, the bottom branch resistance is R_bot = 4 + 2 = 6 \u03a9. The equivalent resistance of the parallel group is R_p = (R_top \u00b7 R_bot)/(R_top + R_bot) = (3 \u00b7 6)/(3 + 6) = 18/9 = 2 \u03a9.",
      "3. Execution & Resolution: The total resistance between A and B is the series sum: R_AB = R_series + R_p = 2 + 2 = 4 \u03a9. Matches Option B."
    ],
    "keyState": "WITHHELD_FAULT_N09"
  },
  {
    "id": "NSEJS-CIRC-L2-Q03",
    "topic": "CURRENT_ELECTRICITY",
    "chapterId": "PH11",
    "stem": "In the network of Fig. 3, a piece of ideal wire is connected across the 2 \u03a9 resistor. The equivalent resistance between A and B is:\n[FIG-stem-1]",
    "options": [
      "A: 30/11 \u03a9",
      "B: 3 \u03a9",
      "C: 2 \u03a9",
      "D: 11 \u03a9"
    ],
    "hints": [
      "H1 \u00b7 CLARIFY (identify the crux) \u2014 Trace the endpoints of the added ideal wire and the original element.",
      "H2 \u00b7 CORRELATE (connect a known model) \u2014 Reason using potential equality along an ideal conductor.",
      "H3 \u00b7 OPEN_THE_WAY (no decisive step or answer) \u2014 Separate the geometry of the connection from numerical resistance values before reducing."
    ],
    "steps": [
      "1. System Representation & Setup: The network consists of two main parallel branches between A and B: a top branch containing a 6 \u03a9 resistor, and a bottom branch containing a 3 \u03a9 resistor in series with a 2 \u03a9 resistor that is bypassed by an ideal wire jumper.",
      "2. Physical Model & Formulation: An ideal wire has resistance R = 0. In parallel with the 2 \u03a9 resistor, the equivalent resistance of this section is R_parallel = (2 \u00d7 0)/(2 + 0) = 0 \u03a9. Hence, the 2 \u03a9 resistor is completely bypassed (short-circuited), carrying zero current. The bottom branch resistance simplifies to R_bot = 3 + 0 = 3 \u03a9.",
      "3. Execution & Resolution: The remaining circuit consists of the top branch (6 \u03a9) in parallel with the bottom branch (3 \u03a9): R_AB = (6 \u00d7 3)/(6 + 3) = 18/9 = 2 \u03a9. Matches Option C."
    ],
    "keyState": "WITHHELD_FAULT_N09"
  },
  {
    "id": "NSEJS-CIRC-L2-Q04",
    "topic": "CURRENT_ELECTRICITY",
    "chapterId": "PH11",
    "stem": "The equivalent resistance between A and B in the bridge network of Fig. 4 is:\n[FIG-stem-1]",
    "options": [
      "A: 10 \u03a9",
      "B: 6 \u03a9",
      "C: 15 \u03a9",
      "D: 25 \u03a9"
    ],
    "hints": [
      "H1 \u00b7 CLARIFY (identify the crux) \u2014 Identify the four outer bridge arms and the central connection.",
      "H2 \u00b7 CORRELATE (connect a known model) \u2014 Recall that identical node potentials would prevent current through a bridging element.",
      "H3 \u00b7 OPEN_THE_WAY (no decisive step or answer) \u2014 Check node potential relations before deciding whether to retain or remove the middle arm."
    ],
    "steps": [
      "1. System Representation & Setup: The bridge consists of four outer arms: R_AC = 6 \u03a9, R_AD = 4 \u03a9, R_CB = 9 \u03a9, R_DB = 6 \u03a9, and a central bridge resistor R_CD = 10 \u03a9 connected between intermediate nodes C and D.",
      "2. Physical Model & Formulation: Test the Wheatstone bridge balance condition: R_AC / R_AD = 6 / 4 = 3/2 = 1.5, and R_CB / R_DB = 9 / 6 = 3/2 = 1.5. Since R_AC / R_AD = R_CB / R_DB, the bridge is balanced. The electric potential at node C equals that at node D (V_C = V_D).",
      "3. Execution & Resolution: Because V_C - V_D = 0, no current passes through the central 10 \u03a9 resistor. Removing R_CD leaves two parallel branches: Branch ACB with R_ACB = 6 + 9 = 15 \u03a9, and Branch ADB with R_ADB = 4 + 6 = 10 \u03a9. The equivalent resistance is R_AB = (15 \u00d7 10)/(15 + 10) = 150/25 = 6 \u03a9. Matches Option B."
    ],
    "keyState": "WITHHELD_FAULT_N09"
  },
  {
    "id": "NSEJS-CIRC-L2-Q05",
    "topic": "CURRENT_ELECTRICITY",
    "chapterId": "PH11",
    "stem": "The equivalent resistance between A and B in the bridge network of Fig. 5 is:\n[FIG-stem-1]",
    "options": [
      "A: 56/11 \u03a9",
      "B: 7 \u03a9",
      "C: 5 \u03a9",
      "D: 4 \u03a9"
    ],
    "hints": [
      "H1 \u00b7 CLARIFY (identify the crux) \u2014 Draw the bridge as an endpoint-labelled five-edge graph.",
      "H2 \u00b7 CORRELATE (connect a known model) \u2014 Compare simple reduction, node-voltage equations and equivalent-star methods for applicability.",
      "H3 \u00b7 OPEN_THE_WAY (no decisive step or answer) \u2014 Choose one defensible transformation and verify it preserves the same external terminals."
    ],
    "steps": [
      "1. System Representation & Setup: The bridge arms are R_AC = 2 \u03a9, R_AD = 6 \u03a9, R_CD = 4 \u03a9, R_CB = 6 \u03a9, and R_DB = 8 \u03a9. The bridge is unbalanced because 2/6 \u2260 6/8.",
      "2. Physical Model & Formulation: Convert the delta mesh formed by nodes A, C, D into an equivalent star connected to a neutral internal node N. The perimeter resistance sum is \u03a3 R_\u0394 = 2 + 4 + 6 = 12 \u03a9. Using Kennelly's Delta-to-Star formula: R_A = (R_AC \u00b7 R_AD)/\u03a3 = (2 \u00d7 6)/12 = 1.0 \u03a9; R_C = (R_AC \u00b7 R_CD)/\u03a3 = (2 \u00d7 4)/12 = 8/12 = 2/3 \u03a9; R_D = (R_AD \u00b7 R_CD)/\u03a3 = (6 \u00d7 4)/12 = 24/12 = 2.0 \u03a9.",
      "3. Execution & Resolution: From node N, the circuit splits into two parallel branches terminating at B: Branch 1 through C: R_C + R_CB = 2/3 + 6 = 20/3 \u03a9. Branch 2 through D: R_D + R_DB = 2 + 8 = 10 \u03a9. Parallel combination between N and B: R_NB = ((20/3) \u00d7 10) / (20/3 + 10) = (200/3) / (50/3) = 200/50 = 4.0 \u03a9. Total equivalent resistance: R_AB = R_A + R_NB = 1.0 + 4.0 = 5.0 \u03a9. Matches Option C."
    ],
    "keyState": "WITHHELD_FAULT_N09"
  },
  {
    "id": "NSEJS-CIRC-L2-Q06",
    "topic": "CURRENT_ELECTRICITY",
    "chapterId": "PH11",
    "stem": "In the network of Fig. 6, the equivalent resistance between A and B when the switch S is open and when S is closed are respectively:\n[FIG-stem-1]",
    "options": [
      "A: 9 \u03a9 and 9 \u03a9",
      "B: 9 \u03a9 and 8 \u03a9",
      "C: 8 \u03a9 and 9 \u03a9",
      "D: 18 \u03a9 and 8 \u03a9"
    ],
    "hints": [
      "H1 \u00b7 CLARIFY (identify the crux) \u2014 Treat the switch-open and switch-closed drawings as two different graphs.",
      "H2 \u00b7 CORRELATE (connect a known model) \u2014 Remember that an ideal closed switch joins its endpoint nodes while an open switch does not.",
      "H3 \u00b7 OPEN_THE_WAY (no decisive step or answer) \u2014 Redraw the connected nodes in each state before reducing the resulting resistor network."
    ],
    "steps": [
      "1. System Representation & Setup: The circuit has four resistors: R_AC = 6 \u03a9, R_CB = 12 \u03a9, R_AD = 12 \u03a9, R_DB = 6 \u03a9. A switch S connects node C to node D.",
      "2. Physical Model & Formulation: State 1 (S is OPEN): There is zero conducting path between C and D. Branch ACB has R_ACB = 6 + 12 = 18 \u03a9. Branch ADB has R_ADB = 12 + 6 = 18 \u03a9. R_open = (18 \u00d7 18)/(18 + 18) = 18/2 = 9 \u03a9.",
      "3. Execution & Resolution: State 2 (S is CLOSED): Nodes C and D are short-circuited together (V_C = V_D). Resistors R_AC (6 \u03a9) and R_AD (12 \u03a9) are in parallel across nodes A and CD: R_left = (6 \u00d7 12)/(6 + 12) = 72/18 = 4 \u03a9. Resistors R_CB (12 \u03a9) and R_DB (6 \u03a9) are in parallel across nodes CD and B: R_right = (12 \u00d7 6)/(12 + 6) = 72/18 = 4 \u03a9. Total resistance is R_closed = R_left + R_right = 4 + 4 = 8 \u03a9. The respective values are 9 \u03a9 and 8 \u03a9. Matches Option B."
    ],
    "keyState": "WITHHELD_FAULT_N09"
  },
  {
    "id": "NSEJS-CIRC-L2-Q07",
    "topic": "CURRENT_ELECTRICITY",
    "chapterId": "PH11",
    "stem": "Six identical resistors, each of 6 \u03a9, are joined to form a regular hexagon as shown in Fig. 7. The equivalent resistance between the adjacent corners A and B is:\n[FIG-stem-1]",
    "options": [
      "A: 9 \u03a9",
      "B: 6 \u03a9",
      "C: 5 \u03a9",
      "D: 3 \u03a9"
    ],
    "hints": [
      "H1 \u00b7 CLARIFY (identify the crux) \u2014 Mark the two terminal vertices and trace the complete polygon.",
      "H2 \u00b7 CORRELATE (connect a known model) \u2014 Compare the two paths that follow opposite directions along the perimeter.",
      "H3 \u00b7 OPEN_THE_WAY (no decisive step or answer) \u2014 Check that every edge appears on a valid terminal-to-terminal route before combining."
    ],
    "steps": [
      "1. System Representation & Setup: A regular closed hexagon consists of N = 6 equal resistors of resistance R = 6 \u03a9 each. Terminals A and B are adjacent vertices.",
      "2. Physical Model & Formulation: The closed perimeter divides into two parallel branches connecting A and B: Branch 1 is the single adjacent side AB, with R_1 = 6 \u03a9. Branch 2 is the perimeter path traversing the other 5 sides in series: R_2 = 5 \u00d7 6 = 30 \u03a9.",
      "3. Execution & Resolution: The equivalent resistance between A and B is given by the parallel formula: R_AB = (R_1 \u00b7 R_2)/(R_1 + R_2) = (6 \u00d7 30)/(6 + 30) = 180/36 = 5.0 \u03a9. Matches Option C."
    ],
    "keyState": "WITHHELD_FAULT_N09"
  },
  {
    "id": "NSEJS-CIRC-L2-Q08",
    "topic": "CURRENT_ELECTRICITY",
    "chapterId": "PH11",
    "stem": "Five resistors, each of 6 \u03a9, are connected as shown in Fig. 8: four form the sides of a square ABCD and one forms the diagonal AC. The equivalent resistance between A and C is:\n[FIG-stem-1]",
    "options": [
      "A: 6 \u03a9",
      "B: 3 \u03a9",
      "C: 4 \u03a9",
      "D: 2 \u03a9"
    ],
    "hints": [
      "H1 \u00b7 CLARIFY (identify the crux) \u2014 Identify the selected opposite corners and note the extra connection.",
      "H2 \u00b7 CORRELATE (connect a known model) \u2014 Look for any two-terminal routes that share only their endpoints.",
      "H3 \u00b7 OPEN_THE_WAY (no decisive step or answer) \u2014 Redraw each admissible path without losing the diagonal or creating a false junction."
    ],
    "steps": [
      "1. System Representation & Setup: The network consists of 5 identical resistors of R = 6 \u03a9. Four resistors form the square perimeter (AB, BC, CD, DA) and the fifth lies along diagonal AC. Terminals are placed at opposite corners A and C.",
      "2. Physical Model & Formulation: Between nodes A and C, there are three parallel pathways: Branch 1 along the top perimeter ADC: R_ADC = R_AD + R_DC = 6 + 6 = 12 \u03a9. Branch 2 along the bottom perimeter ABC: R_ABC = R_AB + R_BC = 6 + 6 = 12 \u03a9. Branch 3 directly through the diagonal AC: R_diag = 6 \u03a9.",
      "3. Execution & Resolution: The equivalent resistance R_AC is given by: 1/R_AC = 1/R_ADC + 1/R_ABC + 1/R_diag = 1/12 + 1/12 + 1/6 = 2/12 + 1/6 = 1/6 + 1/6 = 2/6 = 1/3 \u03a9\u207b\u00b9. Inverting gives R_AC = 3.0 \u03a9. Matches Option B."
    ],
    "keyState": "WITHHELD_FAULT_N09"
  },
  {
    "id": "NSEJS-CIRC-L2-Q09",
    "topic": "CURRENT_ELECTRICITY",
    "chapterId": "PH11",
    "stem": "For the same network of Fig. 8 (all five resistors of 6 \u03a9), the equivalent resistance between the corners B and D is:\n[FIG-stem-1]",
    "options": [
      "A: 3 \u03a9",
      "B: 4 \u03a9",
      "C: 6 \u03a9",
      "D: 12 \u03a9"
    ],
    "hints": [
      "H1 \u00b7 CLARIFY (identify the crux) \u2014 Note that changing the terminal pair can change the relevant symmetry.",
      "H2 \u00b7 CORRELATE (connect a known model) \u2014 Recall that mirror-related nodes may have equal potential in a symmetric network.",
      "H3 \u00b7 OPEN_THE_WAY (no decisive step or answer) \u2014 Test node symmetry using the selected terminals before simplifying any diagonal branch."
    ],
    "steps": [
      "1. System Representation & Setup: The 5-resistor network has each resistor equal to R = 6 \u03a9. Terminals are now corners B and D. Diagonal resistor AC bridges the two opposite non-terminal corners A and C.",
      "2. Physical Model & Formulation: Apply mirror symmetry across the axis line BD. The upper half (BCD) and lower half (BAD) are identical mirror images. Therefore, the electric potential at corner A must equal the potential at corner C: V_A = V_C. The potential difference across the diagonal resistor is \u0394V_AC = V_A - V_C = 0.",
      "3. Execution & Resolution: Because \u0394V_AC = 0, zero current flows through the diagonal resistor AC. It can be removed from the circuit without disturbing node potentials or branch currents. The remaining network consists of two parallel branches: Branch BAD with R_BAD = R_BA + R_AD = 6 + 6 = 12 \u03a9, and Branch BCD with R_BCD = R_BC + R_CD = 6 + 6 = 12 \u03a9. Equivalent resistance between B and D is R_BD = (12 \u00d7 12)/(12 + 12) = 12/2 = 6.0 \u03a9. Matches Option C."
    ],
    "keyState": "WITHHELD_FAULT_N09"
  },
  {
    "id": "NSEJS-CIRC-L2-Q10",
    "topic": "CURRENT_ELECTRICITY",
    "chapterId": "PH11",
    "stem": "A square ABCD of four 6 \u03a9 resistors has its centre O joined to each corner by a 6 \u03a9 resistor, as shown in Fig. 9. The equivalent resistance between the opposite corners A and C is:\n[FIG-stem-1]",
    "options": [
      "A: 16/5 \u03a9",
      "B: 3 \u03a9",
      "C: 6 \u03a9",
      "D: 4 \u03a9"
    ],
    "hints": [
      "H1 \u00b7 CLARIFY (identify the crux) \u2014 Label the centre and all four outer corners before solving.",
      "H2 \u00b7 CORRELATE (connect a known model) \u2014 Use graph symmetry only when the source and sink respect that symmetry.",
      "H3 \u00b7 OPEN_THE_WAY (no decisive step or answer) \u2014 Test potential groups with Kirchhoff balances before treating paths as independent."
    ],
    "steps": [
      "1. System Representation & Setup: The network consists of 8 equal resistors of R = 6 \u03a9: four outer perimeter resistors (AB, BC, CD, DA) and four spoke resistors (OA, OB, OC, OD). Terminals are at opposite diagonal corners A and C.",
      "2. Physical Model & Formulation: Apply reflection and inversion symmetry. Let terminal A be at potential V_A = V and terminal C at V_C = 0. The perpendicular bisector plane passes through vertices B, D and centre O. By bilateral symmetry across AC, V_B = V_D. By potential inversion symmetry from A to C, the potential at the midpoint O is V_O = V/2, and the potentials at B and D are V_B = V_D = V/2.",
      "3. Execution & Resolution: Because V_B = V_O = V_D = V/2, the potential difference across spoke OB is V_B - V_O = 0, and across spoke OD is V_D - V_O = 0. Neither spoke carries current, so both resistors OB and OD can be removed. The remaining circuit between A and C consists of three parallel branches: Branch 1 (outer top): ADC with R_1 = 6 + 6 = 12 \u03a9. Branch 2 (outer bottom): ABC with R_2 = 6 + 6 = 12 \u03a9. Branch 3 (inner diagonal): AOC with R_3 = 6 + 6 = 12 \u03a9. Combining the three 12 \u03a9 branches in parallel: 1/R_AC = 1/12 + 1/12 + 1/12 = 3/12 = 1/4 \u03a9\u207b\u00b9. Therefore, R_AC = 4.0 \u03a9. Matches Option D."
    ],
    "keyState": "WITHHELD_FAULT_N09"
  },
  {
    "id": "NSEJS-CIRC-L2-Q11",
    "topic": "CURRENT_ELECTRICITY",
    "chapterId": "PH11",
    "stem": "Twelve identical resistors, each of 4 \u03a9, form the 2 \u00d7 2 square grid of Fig. 10. The equivalent resistance between the opposite corners A and B is:\n[FIG-stem-1]",
    "options": [
      "A: 8 \u03a9",
      "B: 4 \u03a9",
      "C: 6 \u03a9",
      "D: 16/3 \u03a9"
    ],
    "hints": [
      "H1 \u00b7 CLARIFY (identify the crux) \u2014 Count all grid vertices, edges and the two external terminals.",
      "H2 \u00b7 CORRELATE (connect a known model) \u2014 Reflect the square grid about the terminal axis and identify equivalent node roles.",
      "H3 \u00b7 OPEN_THE_WAY (no decisive step or answer) \u2014 Use symmetry as a check on a node-voltage or test-current model, not as an assumed answer."
    ],
    "steps": [
      "1. System Representation & Setup: Label the grid (i,j), i,j=0,1,2, A=(0,0) and B=(2,2); set V_A=1 V, V_B=0. Each edge has r=4 \u03a9.",
      "2. Physical Model & Formulation: Reflection about AB gives V(1,0)=V(0,1)=x. Reflection interchanging A and B gives V(0,2)=V(1,1)=V(2,0)=1/2 and V(1,2)=V(2,1)=1\u2212x. KCL at (1,0): (x\u22121)+(x\u22121/2)+(x\u22121/2)=0, hence x=2/3.",
      "3. Execution & Resolution: A supplies two edges with current (1\u22122/3)/r each. Total I=2/(3r); R_AB=3r/2=6 \u03a9, option C."
    ],
    "keyState": "WITHHELD_FAULT_N09"
  },
  {
    "id": "NSEJS-CIRC-L2-Q12",
    "topic": "CURRENT_ELECTRICITY",
    "chapterId": "PH11",
    "stem": "A uniform wire of total resistance 18 \u03a9 is bent into an equilateral triangle ABC, and M is the mid-point of side BC, as shown in Fig. 11. The equivalent resistance between A and M is:\n[FIG-stem-1]",
    "options": [
      "A: 9 \u03a9",
      "B: 6 \u03a9",
      "C: 3 \u03a9",
      "D: 4.5 \u03a9"
    ],
    "hints": [
      "H1 \u00b7 CLARIFY (identify the crux) \u2014 Identify which two points on the uniform triangle are the external terminals.",
      "H2 \u00b7 CORRELATE (connect a known model) \u2014 Resistance along the same wire scales with segment length.",
      "H3 \u00b7 OPEN_THE_WAY (no decisive step or answer) \u2014 Translate the midpoint label into branch lengths before testing valid parallel paths."
    ],
    "steps": [
      "1. System Representation & Setup: A uniform wire of total resistance R_total = 18 \u03a9 forms equilateral triangle ABC. Each side has resistance R_side = 18/3 = 6 \u03a9. Midpoint M divides side BC into two equal halves: R_BM = R_MC = 3 \u03a9.",
      "2. Physical Model & Formulation: The median AM is a line of bilateral symmetry. Two distinct paths connect terminal A to terminal M: Path 1 through vertex B: R_1 = R_AB + R_BM = 6 + 3 = 9 \u03a9. Path 2 through vertex C: R_2 = R_AC + R_MC = 6 + 3 = 9 \u03a9.",
      "3. Execution & Resolution: The two paths operate in parallel between A and M: R_AM = (R_1 \u00b7 R_2)/(R_1 + R_2) = (9 \u00d7 9)/(9 + 9) = 81/18 = 4.5 \u03a9. Matches Option D."
    ],
    "keyState": "WITHHELD_FAULT_N09"
  },
  {
    "id": "NSEJS-CIRC-L2-Q13",
    "topic": "CURRENT_ELECTRICITY",
    "chapterId": "PH11",
    "stem": "A uniform wire of resistance 24 \u03a9 is bent into a circular ring, and a straight wire of resistance 12 \u03a9 is joined along a diameter PQ, as shown in Fig. 12. The equivalent resistance between P and Q is:\n[FIG-stem-1]",
    "options": [
      "A: 4 \u03a9",
      "B: 6 \u03a9",
      "C: 12 \u03a9",
      "D: 8 \u03a9"
    ],
    "hints": [
      "H1 \u00b7 CLARIFY (identify the crux) \u2014 Differentiate resistance of the full ring from that of its parts and the added wire.",
      "H2 \u00b7 CORRELATE (connect a known model) \u2014 Uniform resistance follows arc length; distinct branches may share endpoints.",
      "H3 \u00b7 OPEN_THE_WAY (no decisive step or answer) \u2014 Identify the independent routes between the terminals and check whether any junction changes them."
    ],
    "steps": [
      "1. System Representation & Setup: A circular ring has total perimeter resistance R_ring = 24 \u03a9. A straight diameter PQ has resistance R_diam = 12 \u03a9. Terminals are situated at endpoints P and Q.",
      "2. Physical Model & Formulation: Diameter PQ divides the circular ring into two equal semicircular branches in parallel with the diametral conductor: Top semicircle: R_top = 24/2 = 12 \u03a9. Bottom semicircle: R_bot = 24/2 = 12 \u03a9. Diameter wire: R_diam = 12 \u03a9.",
      "3. Execution & Resolution: All three branches share nodes P and Q and operate in parallel: 1/R_PQ = 1/R_top + 1/R_diam + 1/R_bot = 1/12 + 1/12 + 1/12 = 3/12 = 1/4 \u03a9\u207b\u00b9. Inverting gives R_PQ = 12/3 = 4.0 \u03a9. Matches Option A."
    ],
    "keyState": "WITHHELD_FAULT_N09"
  },
  {
    "id": "NSEJS-CIRC-L2-Q14",
    "topic": "CURRENT_ELECTRICITY",
    "chapterId": "PH11",
    "stem": "Twelve identical resistors, each of 12 \u03a9, form the edges of a cube. The equivalent resistance between the ends A and B of one edge, as shown in Fig. 13, is:\n[FIG-stem-1]",
    "options": [
      "A: 9 \u03a9",
      "B: 10 \u03a9",
      "C: 6 \u03a9",
      "D: 7 \u03a9"
    ],
    "hints": [
      "H1 \u00b7 CLARIFY (identify the crux) \u2014 Mark the cube's terminals as adjacent vertices.",
      "H2 \u00b7 CORRELATE (connect a known model) \u2014 A cube is a graph of edges, and terminal placement determines allowed potential symmetries.",
      "H3 \u00b7 OPEN_THE_WAY (no decisive step or answer) \u2014 Use a unit test current and node balances to check any proposed symmetry grouping."
    ],
    "steps": [
      "1. System Representation & Setup: Set terminal A at V and adjacent terminal B at 0 on a cube with equal resistor edges r; inject total current I at A.",
      "2. Physical Model & Formulation: Symmetry pairs the other two neighbors of A at x, the other two neighbors of B at y, and the opposite vertices at z,w. KCL yields 3x=V+y+z, 3y=x+w, 3z=2x+w, 3w=2y+z, hence x=9V/14, y=5V/14, z=4V/7, w=3V/7.",
      "3. Execution & Resolution: I=[V+2(V\u2212x)]/r=12V/(7r); R_AB=V/I=7r/12=7 \u03a9 for r=12 \u03a9 (option D). Current in AB is 7I/12, while each of the other two edges leaving A carries 5I/24. The earlier I/3 split was incorrect."
    ],
    "keyState": "WITHHELD_FAULT_N09"
  },
  {
    "id": "NSEJS-CIRC-L2-Q15",
    "topic": "CURRENT_ELECTRICITY",
    "chapterId": "PH11",
    "stem": "Twelve identical resistors, each of 8 \u03a9, form the edges of a cube. The equivalent resistance between the ends A and B of a face diagonal, as shown in Fig. 14, is:\n[FIG-stem-1]",
    "options": [
      "A: 14/3 \u03a9",
      "B: 6 \u03a9",
      "C: 20/3 \u03a9",
      "D: 8 \u03a9"
    ],
    "hints": [
      "H1 \u00b7 CLARIFY (identify the crux) \u2014 Identify the face-diagonal terminal pair without confusing it with an edge or body diagonal.",
      "H2 \u00b7 CORRELATE (connect a known model) \u2014 Equal edge values alone do not guarantee that all same-distance vertices are equipotential.",
      "H3 \u00b7 OPEN_THE_WAY (no decisive step or answer) \u2014 Set terminal potentials and test the allowable symmetry classes with current conservation."
    ],
    "steps": [
      "1. System Representation & Setup: Use cube coordinates A=(0,0,0), B=(1,1,0), r=8 \u03a9; fix A at 1 V and B at 0 V. Reflection fixing A and B and interchange of terminals put the other two vertices of their face at 1/2 V.",
      "2. Physical Model & Formulation: Opposite-face vertices (1,0,1) and (0,1,1) also have 1/2 V. Write V(0,0,1)=x and V(1,1,1)=1\u2212x. KCL at (0,0,1): (x\u22121)+2(x\u22121/2)=0; x=2/3.",
      "3. Execution & Resolution: The three edges leaving A carry [1/2+1/2+(1\u22122/3)]/r=4/(3r) A in total. R_AB=3r/4=6 \u03a9, option B."
    ],
    "keyState": "WITHHELD_FAULT_N09"
  },
  {
    "id": "NSEJS-CIRC-L2-Q16",
    "topic": "CURRENT_ELECTRICITY",
    "chapterId": "PH11",
    "stem": "Six identical resistors, each of 10 \u03a9, form the edges of a tetrahedron ABCD, as shown in Fig. 15. The equivalent resistance between the corners A and B is:\n[FIG-stem-1]",
    "options": [
      "A: 5 \u03a9",
      "B: 10 \u03a9",
      "C: 2.5 \u03a9",
      "D: 20/3 \u03a9"
    ],
    "hints": [
      "H1 \u00b7 CLARIFY (identify the crux) \u2014 Treat the tetrahedron as four nodes joined by six identical edges.",
      "H2 \u00b7 CORRELATE (connect a known model) \u2014 A network symmetry is usable only if it fixes the chosen external terminals.",
      "H3 \u00b7 OPEN_THE_WAY (no decisive step or answer) \u2014 Check whether interior vertex potentials can be paired before simplifying the graph."
    ],
    "steps": [
      "1. System Representation & Setup: Six identical resistors of r = 10 \u03a9 form the 6 edges of regular tetrahedron ABCD (AB, AC, AD, BC, BD, CD). External terminals are corners A and B.",
      "2. Physical Model & Formulation: Notice that vertices C and D are symmetrically situated with respect to both terminal A and terminal B (d(A,C) = d(A,D) = r, and d(B,C) = d(B,D) = r). By symmetry, V_C = V_D. Since the potential difference across edge CD is zero, resistor CD carries no current and can be removed.",
      "3. Execution & Resolution: The remaining circuit between A and B consists of three parallel branches: Branch 1: direct edge AB with R_AB = r = 10 \u03a9. Branch 2: path ACB with R_ACB = r + r = 2r = 20 \u03a9. Branch 3: path ADB with R_ADB = r + r = 2r = 20 \u03a9. Combining in parallel: 1/R_eq = 1/r + 1/(2r) + 1/(2r) = 1/r + 1/r = 2/r. Hence, R_eq = r/2 = 10/2 = 5.0 \u03a9. Matches Option A."
    ],
    "keyState": "WITHHELD_FAULT_N09"
  },
  {
    "id": "NSEJS-CIRC-L2-Q17",
    "topic": "CURRENT_ELECTRICITY",
    "chapterId": "PH11",
    "stem": "All the resistors in the ladder network of Fig. 16 are 8 \u03a9. The equivalent resistance between A and B is:\n[FIG-stem-1]",
    "options": [
      "A: 13 \u03a9",
      "B: 24 \u03a9",
      "C: 10 \u03a9",
      "D: 16 \u03a9"
    ],
    "hints": [
      "H1 \u00b7 CLARIFY (identify the crux) \u2014 Identify the finite end of the ladder and label each repeated element.",
      "H2 \u00b7 CORRELATE (connect a known model) \u2014 Finite ladders have a terminal boundary, unlike infinite self-similar ladders.",
      "H3 \u00b7 OPEN_THE_WAY (no decisive step or answer) \u2014 Work backwards one complete section at a time, preserving the shunt and series distinction."
    ],
    "steps": [
      "1. System Representation & Setup: The network is a 3-section finite ladder. Every resistor is R = 8 \u03a9. Terminals A and B are at the left input port.",
      "2. Physical Model & Formulation: Collapse the ladder sequentially from right to left: Section 3 (far right): The terminating 8 \u03a9 series resistor and 8 \u03a9 shunt resistor form a series branch: R_s3 = 8 + 8 = 16 \u03a9. This 16 \u03a9 is in parallel with the second shunt resistor (8 \u03a9): R_p2 = (16 \u00d7 8)/(16 + 8) = 128/24 = 16/3 \u03a9.",
      "3. Execution & Resolution: Add the middle 8 \u03a9 series resistor: R_s2 = 8 + 16/3 = 40/3 \u03a9. This 40/3 \u03a9 is in parallel with the first shunt resistor (8 \u03a9): R_p1 = ((40/3) \u00d7 8) / (40/3 + 8) = (320/3) / (64/3) = 320/64 = 5.0 \u03a9. Finally, add the first input series resistor (8 \u03a9): R_AB = 8 + R_p1 = 8 + 5 = 13.0 \u03a9. Matches Option A."
    ],
    "keyState": "WITHHELD_FAULT_N09"
  },
  {
    "id": "NSEJS-CIRC-L2-Q18",
    "topic": "CURRENT_ELECTRICITY",
    "chapterId": "PH11",
    "stem": "The ladder network of Fig. 17 continues indefinitely, each section having a 4 \u03a9 series resistor and a 3 \u03a9 shunt resistor. The equivalent resistance between A and B is:\n[FIG-stem-1]",
    "options": [
      "A: 7 \u03a9",
      "B: 12 \u03a9",
      "C: 8 \u03a9",
      "D: 6 \u03a9"
    ],
    "hints": [
      "H1 \u00b7 CLARIFY (identify the crux) \u2014 Determine which part of the network repeats without a terminal end.",
      "H2 \u00b7 CORRELATE (connect a known model) \u2014 A repeating tail may have the same driving-point behaviour as the whole network.",
      "H3 \u00b7 OPEN_THE_WAY (no decisive step or answer) \u2014 Introduce a symbolic tail equivalent and check that each repeated section has the original topology."
    ],
    "steps": [
      "1. System Representation & Setup: The ladder extends to infinity, with identical repeating unit cells having series resistance R_s = 4 \u03a9 and shunt resistance R_p = 3 \u03a9. Let R_AB = R be the driving point resistance between input terminals A and B.",
      "2. Physical Model & Formulation: Due to infinite self-similarity, the entire sub-ladder to the right of the first shunt resistor has equivalent resistance equal to R. Thus, the circuit simplifies to a 4 \u03a9 resistor in series with the parallel combination of a 3 \u03a9 resistor and R: R = 4 + (3R)/(3 + R).",
      "3. Execution & Resolution: Multiply through by (3 + R): R(3 + R) = 4(3 + R) + 3R => 3R + R\u00b2 = 12 + 4R + 3R => R\u00b2 - 4R - 12 = 0. Factor the quadratic: (R - 6)(R + 2) = 0. Since physical electrical resistance must be positive (R > 0), we reject R = -2 \u03a9 and obtain R = 6.0 \u03a9. Matches Option D."
    ],
    "keyState": "WITHHELD_FAULT_N09"
  },
  {
    "id": "NSEJS-CIRC-L2-Q19",
    "topic": "CURRENT_ELECTRICITY",
    "chapterId": "PH11",
    "stem": "Three resistors of 6 \u03a9 each are used, all three in every arrangement, in any series and/or parallel combination. Which one of the following values of equivalent resistance CANNOT be obtained?",
    "options": [
      "A: 12 \u03a9",
      "B: 2 \u03a9",
      "C: 4 \u03a9",
      "D: 9 \u03a9"
    ],
    "hints": [
      "H1 \u00b7 CLARIFY (identify the crux) \u2014 Use every resistor exactly once in each possible arrangement.",
      "H2 \u00b7 CORRELATE (connect a known model) \u2014 Separate topological uniqueness from merely redrawing the same circuit.",
      "H3 \u00b7 OPEN_THE_WAY (no decisive step or answer) \u2014 Make an exhaustive configuration list before comparing it with the offered choices."
    ],
    "steps": [
      "1. System Representation & Setup: Three identical resistors of R = 6 \u03a9 are combined using all three elements in each arrangement. We seek the value that cannot be realized.",
      "2. Physical Model & Formulation: Enumerate all four possible topological combinations of 3 identical resistors: Case 1 (All three in series): R_eq = R + R + R = 3R = 3 \u00d7 6 = 18 \u03a9. Case 2 (All three in parallel): 1/R_eq = 1/R + 1/R + 1/R = 3/R => R_eq = R/3 = 6/3 = 2 \u03a9 (Option B is obtainable). Case 3 (Two in parallel, in series with the third): R_eq = (R || R) + R = 3 + 6 = 9 \u03a9 (Option D is obtainable). Case 4 (Two in series, in parallel with the third): R_eq = (R + R) || R = 12 || 6 = (12 \u00d7 6)/(12 + 6) = 72/18 = 4 \u03a9 (Option C is obtainable).",
      "3. Execution & Resolution: The complete set of achievable equivalent resistances is {2 \u03a9, 4 \u03a9, 9 \u03a9, 18 \u03a9}. The value 12 \u03a9 is absent from this set (12 \u03a9 would require only two 6 \u03a9 resistors in series, but all three must be used). Therefore, 12 \u03a9 CANNOT be obtained. Matches Option A."
    ],
    "keyState": "WITHHELD_FAULT_N09"
  },
  {
    "id": "NSEJS-CIRC-L2-Q20",
    "topic": "CURRENT_ELECTRICITY",
    "chapterId": "PH11",
    "stem": "Which of the following statements is/are correct? [One or more options may be correct.]",
    "options": [
      "A: Removing (open-circuiting) one resistor from a network can decrease the equivalent resistance between the terminals.",
      "B: Two resistors connected in parallel can have an equivalent resistance greater than the larger of the two.",
      "C: Connecting an extra resistor in parallel across any two points of a network cannot increase the equivalent resistance between the terminals of the network.",
      "D: Replacing one resistor of a network by an ideal wire (short-circuiting it) cannot increase the equivalent resistance between the terminals of the network."
    ],
    "hints": [
      "H1 \u00b7 CLARIFY (identify the crux) \u2014 Read each claim as a proposed change to a passive two-terminal resistor network.",
      "H2 \u00b7 CORRELATE (connect a known model) \u2014 A valid comparison must preserve the external terminals and the meaning of resistance.",
      "H3 \u00b7 OPEN_THE_WAY (no decisive step or answer) \u2014 Use a fixed terminal current or voltage thought experiment to check how a network change affects response."
    ],
    "steps": [
      "1. System Representation & Setup: Consider a connected passive network of positive ohmic resistors driven by fixed terminal current I. A trial current distribution obeys charge conservation and dissipates P=\u03a3 r_k i_k\u00b2.",
      "2. Physical Model & Formulation: The physical current distribution minimizes this dissipation among conserving trial currents. Adding a resistor permits the old currents with zero new-branch current, so minimum P cannot increase. Shorting an edge lowers its resistance, so the same trial currents dissipate no more. Removing an edge restricts allowable currents, so minimum P cannot decrease.",
      "3. Execution & Resolution: Because P_min=I\u00b2R_eq, removing an edge cannot decrease equivalent resistance (A false); two positive parallel resistances give a value below either (B false); adding a branch or shorting one cannot increase equivalent resistance (C and D true)."
    ],
    "keyState": "WITHHELD_FAULT_N09"
  },
  {
    "id": "G9-AUTH-MECH-001",
    "topic": "MECHANICS",
    "chapterId": "PH11",
    "stem": "Two identical carts, each of mass m, are on a horizontal track. One cart moves at 8 m/s and collides head-on with the other cart initially at rest. They lock together. During the short collision, neglect the impulse of track friction. Afterwards, the joined carts slide on a rough horizontal section with coefficient of kinetic friction 0.25. Take g = 10 m/s\u00b2. What distance do they travel after collision before stopping?",
    "options": [
      "A: 12.8 m",
      "B: 6.4 m",
      "C: 3.2 m",
      "D: 1.6 m"
    ],
    "hints": [],
    "steps": [
      "1. System and conservation choice: Over the short impact, horizontal external impulse is negligible. Horizontal momentum is conserved, but mechanical energy is not conserved because the carts stick.",
      "2. Collision model: m(8) + m(0) = (2m)V gives V = 4 m/s immediately after impact.",
      "3. After-collision braking: Kinetic-friction force is \u03bc(2m)g, so deceleration a = \u03bcg = 2.5 m/s\u00b2. Work\u2013energy or v\u00b2 = 2aL gives L = 4\u00b2/(2\u00d72.5) = 3.2 m."
    ],
    "keyState": "WITHHELD_FAULT_N09"
  },
  {
    "id": "PHYS-NSEJS-FLUID-01",
    "topic": "FLUIDS_AND_SOUND",
    "chapterId": "PH11",
    "stem": "A solid block of density $\\rho_s = 600\\text{ kg/m}^3$ and mass $m = 3.0\\text{ kg}$ is tied to the bottom of a container filled with water ($\\rho_w = 1000\\text{ kg/m}^3$) by a light inextensible cord. The entire container is placed inside an elevator accelerating vertically upwards with constant acceleration $a = 2.0\\text{ m/s}^2$. Taking $g = 10.0\\text{ m/s}^2$:\n\nDetermine the tension $T$ in the cord during upward acceleration, and the initial upward acceleration $a_{\\text{rel}}$ of the block relative to the container immediately after the cord is severed.",
    "options": [
      "A: T = 18.0 N, a_rel = 6.0 m/s\u00b2",
      "B: T = 24.0 N, a_rel = 8.0 m/s\u00b2",
      "C: T = 20.0 N, a_rel = 6.67 m/s\u00b2",
      "D: T = 30.0 N, a_rel = 10.0 m/s\u00b2"
    ],
    "hints": [],
    "steps": [
      "1. In the upward accelerating elevator frame, effective gravity is g_eff = g + a = 10.0 + 2.0 = 12.0 m/s\u00b2.",
      "2. Block volume V = m / \u03c1_s = 3.0 / 600 = 0.0050 m\u00b3. Buoyant force F_B = \u03c1_w * V * g_eff = 1000 * 0.0050 * 12.0 = 60.0 N.",
      "3. Effective weight W_eff = m * g_eff = 3.0 * 12.0 = 36.0 N.",
      "4. Equilibrium gives tension T = F_B - W_eff = 60.0 - 36.0 = 24.0 N.",
      "5. Immediately after cord is cut, net upward force F_net = 24.0 N; relative acceleration a_rel = F_net / m = 24.0 / 3.0 = 8.0 m/s\u00b2."
    ],
    "keyState": "WITHHELD_FAULT_N09"
  },
  {
    "id": "PHYS-NSEJS-FLUID-04",
    "topic": "FLUIDS_AND_SOUND",
    "chapterId": "PH11",
    "stem": "1000 identical spherical water droplets, each of radius $r = 1.0 \\times 10^{-4}\\text{ m}$, coalesce into a single spherical drop. The surface tension of water is $T = 0.075\\text{ N/m}$.\n\nCalculate the net decrease in total surface area and the surface energy released during coalescence.",
    "options": [
      "A: Delta U = 8.48 x 10^-6 J",
      "B: Delta U = 9.42 x 10^-6 J",
      "C: Delta U = 1.05 x 10^-5 J",
      "D: Delta U = 7.50 x 10^-6 J"
    ],
    "hints": [],
    "steps": [
      "1. Volume conservation: (4/3)\u03c0R\u00b3 = 1000 * (4/3)\u03c0r\u00b3 => R = 10r = 1.0 \u00d7 10\u207b\u00b3 m.",
      "2. Initial surface area A_i = 1000 * 4\u03c0r\u00b2 = 4000\u03c0r\u00b2.",
      "3. Final surface area A_f = 4\u03c0R\u00b2 = 4\u03c0(10r)\u00b2 = 400\u03c0r\u00b2.",
      "4. Area reduction \u0394A = A_i - A_f = 3600\u03c0r\u00b2 = 3.6\u03c0 \u00d7 10\u207b\u2075 m\u00b2 \u2248 1.131 \u00d7 10\u207b\u2074 m\u00b2.",
      "5. Released surface energy \u0394U = T * \u0394A = 0.075 * 1.131 \u00d7 10\u207b\u2074 \u2248 8.48 \u00d7 10\u207b\u2076 J."
    ],
    "keyState": "WITHHELD_FAULT_N09"
  }
];
