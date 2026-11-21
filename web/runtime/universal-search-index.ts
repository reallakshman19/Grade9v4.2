/**
 * web/runtime/universal-search-index.ts
 * Grade9 STEM Universal Search Index & Engine
 * Full 416-item offline indexed corpus: 310 Questions, 61 Tablets, 44 Topics & Concepts.
 * Sub-50ms instant fuzzy token search with multi-tier relevance scoring.
 */

export interface UniversalSearchDoc {
  readonly id: string;
  readonly title: string;
  readonly subtitle: string;
  readonly category: 'question' | 'tablet' | 'curriculum' | 'other';
  readonly type: string;
  readonly badge: string;
  readonly route: string;
  readonly breadcrumb: string;
  readonly search_text: string;
}

export interface UniversalSearchCounts {
  readonly all: number;
  readonly question: number;
  readonly tablet: number;
  readonly curriculum: number;
}

export interface UniversalSearchResponse {
  readonly query: string;
  readonly category: string;
  readonly totalMatches: number;
  readonly executionTimeMs: number;
  readonly counts: UniversalSearchCounts;
  readonly results: readonly UniversalSearchDoc[];
}

export function normalizeSearchTerm(v: string): string {
  return String(v || '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
}

/**
 * Full 416-Item Unified STEM Corpus
 */
export const UNIVERSAL_SEARCH_CORPUS: readonly UniversalSearchDoc[] = Object.freeze([
  {
    "id": "CONCEPT-CHEM-REDOX-OX",
    "title": "Redox Reactions & Oxidation States",
    "subtitle": "Chemistry · Redox · Concept",
    "category": "curriculum",
    "type": "CONCEPT",
    "badge": "CONCEPT",
    "route": "#/subject/chemistry/topic/redox",
    "breadcrumb": "Chemistry · Redox · Concept",
    "search_text": "Redox Reactions Oxidation States formal charge electron loss gain disproportionation balancing"
  },
  {
    "id": "SUBTOPIC-MATH-EQUATION-REDUCING",
    "title": "Reducing an equation to simpler form: opening brackets, combining like terms and clearing denominators before solving",
    "subtitle": "Mathematics · Subtopic Capability · 5 Questions",
    "category": "curriculum",
    "type": "SUBTOPIC",
    "badge": "SUBTOPIC",
    "route": "#/subject/mathematics/topic/polynomials",
    "breadcrumb": "Mathematics · Subtopic Capability · 5 Questions",
    "search_text": "Reducing an equation to simpler form opening brackets combining like terms clearing denominators linear equations algebra"
  },
  {
    "id": "TOPIC-CHEM-REDOX",
    "title": "Redox Reactions",
    "subtitle": "Chemistry · Curriculum Topic · 46 Questions",
    "category": "curriculum",
    "type": "TOPIC",
    "badge": "TOPIC",
    "route": "#/subject/chemistry/topic/redox",
    "breadcrumb": "Chemistry · Curriculum Topic · 46 Questions",
    "search_text": "Redox Reactions oxidation reduction electron transfer oxidation states chemistry curriculum topic 46 questions"
  },
  {
    "id": "CONCEPT-MATH-COORD-GEOM",
    "title": "Math Coordinate Geometry",
    "subtitle": "Mathematics · Coordinate Geometry · Concept",
    "category": "curriculum",
    "type": "CONCEPT",
    "badge": "CONCEPT",
    "route": "#/subject/mathematics/topic/coord-geom",
    "breadcrumb": "Mathematics · Coordinate Geometry · Concept",
    "search_text": "Math Coordinate Geometry Cartesian coordinates distance formula section formula collinearity slope intercepts"
  },
  {
    "id": "PORTAL-STEM-OVERVIEW",
    "title": "Grade9 STEM Unified Learning Platform & Question Browser",
    "subtitle": "Cross-Disciplinary · Unified STEM Curriculum Portal · 416 Resources",
    "category": "other",
    "type": "PAGE",
    "badge": "PORTAL",
    "route": "#/home",
    "breadcrumb": "Grade9 STEM · Platform Overview",
    "search_text": "Grade9 STEM Unified Learning Platform Question Browser portal home overview"
  },
  {
    "id": "TOPIC-CHEM-BONDING",
    "title": "Chemical Bonding & Molecular Structure",
    "subtitle": "Chemistry · Curriculum Topic · 30 Questions",
    "category": "curriculum",
    "type": "TOPIC",
    "badge": "TOPIC",
    "route": "#/subject/chemistry/topic/bonding",
    "breadcrumb": "Chemistry · Curriculum Topic · 30 Questions",
    "search_text": "Chemical Bonding Molecular Structure VSEPR hybridization ionic covalent chemistry curriculum topic 30 questions"
  },
  {
    "id": "TOPIC-CHEM-GASES",
    "title": "Behaviour of Gases & Kinetic Theory",
    "subtitle": "Chemistry · Curriculum Topic · 30 Questions",
    "category": "curriculum",
    "type": "TOPIC",
    "badge": "TOPIC",
    "route": "#/subject/chemistry/topic/gases",
    "breadcrumb": "Chemistry · Curriculum Topic · 30 Questions",
    "search_text": "Behaviour of Gases Kinetic Theory ideal gas Boyle Charles Graham effusion chemistry curriculum topic 30 questions"
  },
  {
    "id": "TOPIC-CHEM-MOLE",
    "title": "Mole Concept & Stoichiometry",
    "subtitle": "Chemistry · Curriculum Topic · 30 Questions",
    "category": "curriculum",
    "type": "TOPIC",
    "badge": "TOPIC",
    "route": "#/subject/chemistry/topic/stoichiometry",
    "breadcrumb": "Chemistry · Curriculum Topic · 30 Questions",
    "search_text": "Mole Concept Stoichiometry molar mass Avogadro molarity molality chemistry curriculum topic 30 questions"
  },
  {
    "id": "TOPIC-PHYS-WPE",
    "title": "Work, Power & Energy",
    "subtitle": "Physics · Curriculum Topic · 74 Questions",
    "category": "curriculum",
    "type": "TOPIC",
    "badge": "TOPIC",
    "route": "#/subject/physics/topic/wpe",
    "breadcrumb": "Physics · Curriculum Topic · 74 Questions",
    "search_text": "Work Power Energy kinetic potential mechanical conservation theorem spring mass physics curriculum topic 74 questions"
  },
  {
    "id": "TOPIC-PHYS-PLANE",
    "title": "Motion in a Plane & Kinematics",
    "subtitle": "Physics · Curriculum Topic · 104 Questions",
    "category": "curriculum",
    "type": "TOPIC",
    "badge": "TOPIC",
    "route": "#/subject/physics/topic/motion-plane",
    "breadcrumb": "Physics · Curriculum Topic · 104 Questions",
    "search_text": "Motion in a Plane Kinematics projectile 2D trajectory parabolic river boat physics curriculum topic 104 questions"
  },
  {
    "id": "TOPIC-PHYS-1D",
    "title": "Motion in 1D & Rectilinear Mechanics",
    "subtitle": "Physics · Curriculum Topic · 25 Questions",
    "category": "curriculum",
    "type": "TOPIC",
    "badge": "TOPIC",
    "route": "#/subject/physics/topic/motion-1d",
    "breadcrumb": "Physics · Curriculum Topic · 25 Questions",
    "search_text": "Motion in 1D Rectilinear Mechanics velocity acceleration displacement calculus kinematics physics curriculum topic 25 questions"
  },
  {
    "id": "TOPIC-PHYS-CIRCULAR",
    "title": "Uniform Circular Motion & Banking",
    "subtitle": "Physics · Curriculum Topic · 16 Questions",
    "category": "curriculum",
    "type": "TOPIC",
    "badge": "TOPIC",
    "route": "#/subject/physics/topic/circular",
    "breadcrumb": "Physics · Curriculum Topic · 16 Questions",
    "search_text": "Uniform Circular Motion Banking centripetal acceleration angular velocity physics curriculum topic 16 questions"
  },
  {
    "id": "TOPIC-PHYS-NLM",
    "title": "Newton's Laws of Motion & Friction",
    "subtitle": "Physics · Curriculum Topic · 22 Questions",
    "category": "curriculum",
    "type": "TOPIC",
    "badge": "TOPIC",
    "route": "#/subject/physics/topic/nlm",
    "breadcrumb": "Physics · Curriculum Topic · 22 Questions",
    "search_text": "Newton Laws of Motion Friction limiting friction normal force free body diagram physics curriculum topic 22 questions"
  },
  {
    "id": "TOPIC-PHYS-FLUIDS",
    "title": "Fluids & Hydrostatic Pressure",
    "subtitle": "Physics · Curriculum Topic · 18 Questions",
    "category": "curriculum",
    "type": "TOPIC",
    "badge": "TOPIC",
    "route": "#/subject/physics/topic/fluids",
    "breadcrumb": "Physics · Curriculum Topic · 18 Questions",
    "search_text": "Fluids Hydrostatic Pressure Archimedes Pascal hydraulic thrust buoyancy density physics curriculum topic 18 questions"
  },
  {
    "id": "TOPIC-MATH-EUCLID",
    "title": "Euclid's Geometry & Circles Master",
    "subtitle": "Mathematics · Curriculum Topic · 50 Questions",
    "category": "curriculum",
    "type": "TOPIC",
    "badge": "TOPIC",
    "route": "#/subject/mathematics/topic/euclid",
    "breadcrumb": "Mathematics · Curriculum Topic · 50 Questions",
    "search_text": "Euclid Geometry Circles Master tangents secants cyclic quadrilaterals chords mathematics curriculum topic 50 questions"
  },
  {
    "id": "TOPIC-MATH-RIEMANN",
    "title": "Riemann Sums & Area Under Curves",
    "subtitle": "Mathematics · Curriculum Topic · 15 Questions",
    "category": "curriculum",
    "type": "TOPIC",
    "badge": "TOPIC",
    "route": "#/subject/mathematics/topic/riemann",
    "breadcrumb": "Mathematics · Curriculum Topic · 15 Questions",
    "search_text": "Riemann Sums Area Under Curves definite integral partition Darboux calculus mathematics curriculum topic 15 questions"
  },
  {
    "id": "TOPIC-MATH-POLY",
    "title": "Theory of Equations & Polynomials",
    "subtitle": "Mathematics · Curriculum Topic · 20 Questions",
    "category": "curriculum",
    "type": "TOPIC",
    "badge": "TOPIC",
    "route": "#/subject/mathematics/topic/polynomials",
    "breadcrumb": "Mathematics · Curriculum Topic · 20 Questions",
    "search_text": "Theory of Equations Polynomials roots coefficients Vieta remainder theorem algebra mathematics curriculum topic 20 questions"
  },
  {
    "id": "TOPIC-MATH-COORD",
    "title": "Coordinate Geometry & Cartesian Plane",
    "subtitle": "Mathematics · Curriculum Topic · 25 Questions",
    "category": "curriculum",
    "type": "TOPIC",
    "badge": "TOPIC",
    "route": "#/subject/mathematics/topic/coord-geom",
    "breadcrumb": "Mathematics · Curriculum Topic · 25 Questions",
    "search_text": "Coordinate Geometry Cartesian Plane distance section slope lines circles locus mathematics curriculum topic 25 questions"
  },
  {
    "id": "TOPIC-MATH-VECTORS",
    "title": "Mathematical Vectors & Spatial Geometry",
    "subtitle": "Mathematics · Curriculum Topic · 20 Questions",
    "category": "curriculum",
    "type": "TOPIC",
    "badge": "TOPIC",
    "route": "#/subject/mathematics/topic/vectors",
    "breadcrumb": "Mathematics · Curriculum Topic · 20 Questions",
    "search_text": "Mathematical Vectors Spatial Geometry dot cross scalar triple product 3D geometry mathematics curriculum topic 20 questions"
  },
  {
    "id": "CONCEPT-CHEM-BONDING-VSEPR",
    "title": "Chemical Bonding: VSEPR & Hybridization Geometry",
    "subtitle": "Chemistry · Chemical Bonding · Concept",
    "category": "curriculum",
    "type": "CONCEPT",
    "badge": "CONCEPT",
    "route": "#/subject/chemistry/topic/bonding",
    "breadcrumb": "Chemistry · Chemical Bonding · Concept",
    "search_text": "Chemical Bonding VSEPR Hybridization Geometry lone pair bond pair repulsion sp sp2 sp3 molecular shapes"
  },
  {
    "id": "CONCEPT-CHEM-GAS-LAWS",
    "title": "Ideal Gas Equation & Graham Diffusion Kinetics",
    "subtitle": "Chemistry · Gases · Concept",
    "category": "curriculum",
    "type": "CONCEPT",
    "badge": "CONCEPT",
    "route": "#/subject/chemistry/topic/gases",
    "breadcrumb": "Chemistry · Gases · Concept",
    "search_text": "Ideal Gas Equation Graham Diffusion Kinetics PV=nRT rms velocity effusion rates temperature pressure"
  },
  {
    "id": "CONCEPT-CHEM-STOICH-MOLARITY",
    "title": "Molarity, Molality & Dilution Law Stoichiometry",
    "subtitle": "Chemistry · Stoichiometry · Concept",
    "category": "curriculum",
    "type": "CONCEPT",
    "badge": "CONCEPT",
    "route": "#/subject/chemistry/topic/stoichiometry",
    "breadcrumb": "Chemistry · Stoichiometry · Concept",
    "search_text": "Molarity Molality Dilution Law Stoichiometry mole fraction concentration normality limiting reagent"
  },
  {
    "id": "CONCEPT-PHYS-WPE-THEOREM",
    "title": "Work-Energy Theorem in Non-Inertial Reference Frames",
    "subtitle": "Physics · Work, Power & Energy · Concept",
    "category": "curriculum",
    "type": "CONCEPT",
    "badge": "CONCEPT",
    "route": "#/subject/physics/topic/wpe",
    "breadcrumb": "Physics · Work, Power & Energy · Concept",
    "search_text": "Work-Energy Theorem Non-Inertial Reference Frames pseudo work kinetic energy integral conservative potential"
  },
  {
    "id": "CONCEPT-PHYS-PLANE-TRAJECTORY",
    "title": "Projectile Trajectory Equation & Angle Optimization",
    "subtitle": "Physics · Motion in 2D · Concept",
    "category": "curriculum",
    "type": "CONCEPT",
    "badge": "CONCEPT",
    "route": "#/subject/physics/topic/motion-plane",
    "breadcrumb": "Physics · Motion in 2D · Concept",
    "search_text": "Projectile Trajectory Equation Angle Optimization maximum range height flight time parabolic kinematics"
  },
  {
    "id": "CONCEPT-PHYS-PLANE-RELATIVE",
    "title": "Relative Velocity Vector Frames & Shortest Path Crossing",
    "subtitle": "Physics · Kinematics · Concept",
    "category": "curriculum",
    "type": "CONCEPT",
    "badge": "CONCEPT",
    "route": "#/subject/physics/topic/motion-plane",
    "breadcrumb": "Physics · Kinematics · Concept",
    "search_text": "Relative Velocity Vector Frames Shortest Path Crossing river swimmer wind airplane interception kinematics"
  },
  {
    "id": "CONCEPT-PHYS-CIRCULAR-BANKING",
    "title": "Circular Motion Curve Banking & Critical Velocity Bounds",
    "subtitle": "Physics · Circular Dynamics · Concept",
    "category": "curriculum",
    "type": "CONCEPT",
    "badge": "CONCEPT",
    "route": "#/subject/physics/topic/circular",
    "breadcrumb": "Physics · Circular Dynamics · Concept",
    "search_text": "Circular Motion Curve Banking Critical Velocity Bounds friction normal force skidding turning radius"
  },
  {
    "id": "CONCEPT-PHYS-NLM-FRICTION",
    "title": "Limiting Friction, Static Friction & Incline Angle Equilibrium",
    "subtitle": "Physics · Newton Laws · Concept",
    "category": "curriculum",
    "type": "CONCEPT",
    "badge": "CONCEPT",
    "route": "#/subject/physics/topic/nlm",
    "breadcrumb": "Physics · Newton Laws · Concept",
    "search_text": "Limiting Friction Static Friction Incline Angle Equilibrium coefficient of friction angle of repose block wedge"
  },
  {
    "id": "CONCEPT-PHYS-FLUID-PASCAL",
    "title": "Pascal's Law & Hydraulic Force Multiplication",
    "subtitle": "Physics · Fluids · Concept",
    "category": "curriculum",
    "type": "CONCEPT",
    "badge": "CONCEPT",
    "route": "#/subject/physics/topic/fluids",
    "breadcrumb": "Physics · Fluids · Concept",
    "search_text": "Pascals Law Hydraulic Force Multiplication mechanical advantage piston liquid pressure incompressible"
  },
  {
    "id": "CONCEPT-PHYS-FLUID-ARCHIMEDES",
    "title": "Archimedes Principle & Floatation Equilibrium",
    "subtitle": "Physics · Fluids · Concept",
    "category": "curriculum",
    "type": "CONCEPT",
    "badge": "CONCEPT",
    "route": "#/subject/physics/topic/fluids",
    "breadcrumb": "Physics · Fluids · Concept",
    "search_text": "Archimedes Principle Floatation Equilibrium buoyant force submerged volume liquid density apparent weight"
  },
  {
    "id": "CONCEPT-MATH-CIRCLES-CENTRE-ANGLE",
    "title": "Circles Invariant: Subtended Angle at Centre Doubled at Arc",
    "subtitle": "Mathematics · Circles · Concept",
    "category": "curriculum",
    "type": "CONCEPT",
    "badge": "CONCEPT",
    "route": "#/labs/lab:circles-master",
    "breadcrumb": "Mathematics · Circles · Concept",
    "search_text": "Circles Invariant Subtended Angle Centre Circumference chord arc theorem geometry"
  },
  {
    "id": "CONCEPT-MATH-CIRCLES-TANGENT-RAD",
    "title": "Circles Invariant: Tangent Line Perpendicular to Contact Radius",
    "subtitle": "Mathematics · Circles · Concept",
    "category": "curriculum",
    "type": "CONCEPT",
    "badge": "CONCEPT",
    "route": "#/labs/lab:circles-master",
    "breadcrumb": "Mathematics · Circles · Concept",
    "search_text": "Circles Invariant Tangent Line Perpendicular Contact Radius 90 degrees normal point of contact"
  },
  {
    "id": "CONCEPT-MATH-CIRCLES-EXT-TANGENTS",
    "title": "Circles Invariant: Equal Length Tangents from External Point",
    "subtitle": "Mathematics · Circles · Concept",
    "category": "curriculum",
    "type": "CONCEPT",
    "badge": "CONCEPT",
    "route": "#/labs/lab:circles-master",
    "breadcrumb": "Mathematics · Circles · Concept",
    "search_text": "Circles Invariant Equal Length Tangents External Point PA PB congruency power of a point"
  },
  {
    "id": "CONCEPT-MATH-CIRCLES-CYCLIC-QUAD",
    "title": "Circles Invariant: Supplementary Opposite Angles in Cyclic Quad",
    "subtitle": "Mathematics · Circles · Concept",
    "category": "curriculum",
    "type": "CONCEPT",
    "badge": "CONCEPT",
    "route": "#/labs/lab:circles-master",
    "breadcrumb": "Mathematics · Circles · Concept",
    "search_text": "Circles Invariant Supplementary Opposite Angles Cyclic Quad 180 degrees concyclic vertices"
  },
  {
    "id": "CONCEPT-MATH-CIRCLES-CHORD-PRODUCT",
    "title": "Circles Invariant: Intersecting Chords Segment Product Theorem",
    "subtitle": "Mathematics · Circles · Concept",
    "category": "curriculum",
    "type": "CONCEPT",
    "badge": "CONCEPT",
    "route": "#/labs/lab:circles-master",
    "breadcrumb": "Mathematics · Circles · Concept",
    "search_text": "Circles Invariant Intersecting Chords Segment Product Theorem PA*PB=PC*PD power of a point secant"
  },
  {
    "id": "CONCEPT-MATH-CIRCLES-PTOLEMY",
    "title": "Circles Invariant: Ptolemy's Diagonal Product Theorem",
    "subtitle": "Mathematics · Circles · Concept",
    "category": "curriculum",
    "type": "CONCEPT",
    "badge": "CONCEPT",
    "route": "#/labs/lab:circles-master",
    "breadcrumb": "Mathematics · Circles · Concept",
    "search_text": "Circles Invariant Ptolemy Diagonal Product Theorem AC*BD = AB*CD + BC*AD cyclic quadrilateral olympiad"
  },
  {
    "id": "CONCEPT-MATH-RIEMANN-DARBOUX",
    "title": "Riemann Integral: Upper and Lower Darboux Refinement",
    "subtitle": "Mathematics · Riemann Sums · Concept",
    "category": "curriculum",
    "type": "CONCEPT",
    "badge": "CONCEPT",
    "route": "#/labs/lab:riemann-sums",
    "breadcrumb": "Mathematics · Riemann Sums · Concept",
    "search_text": "Riemann Integral Upper Lower Darboux Refinement partition subintervals infimum supremum definite integral"
  },
  {
    "id": "CONCEPT-MATH-VECTOR-DOT",
    "title": "Vector Algebra: Dot Product & Orthogonal Projection",
    "subtitle": "Mathematics · Vectors · Concept",
    "category": "curriculum",
    "type": "CONCEPT",
    "badge": "CONCEPT",
    "route": "#/labs/lab:vector-algebra-3d",
    "breadcrumb": "Mathematics · Vectors · Concept",
    "search_text": "Vector Algebra Dot Product Orthogonal Projection scalar product magnitude direction cosine angle"
  },
  {
    "id": "CONCEPT-MATH-VECTOR-CROSS",
    "title": "Vector Algebra: Cross Product & Parallelogram Area Invariant",
    "subtitle": "Mathematics · Vectors · Concept",
    "category": "curriculum",
    "type": "CONCEPT",
    "badge": "CONCEPT",
    "route": "#/labs/lab:vector-algebra-3d",
    "breadcrumb": "Mathematics · Vectors · Concept",
    "search_text": "Vector Algebra Cross Product Parallelogram Area Invariant right hand rule normal vector torque"
  },
  {
    "id": "CONCEPT-MATH-LINEAR-SYSTEMS",
    "title": "Linear Systems Elimination & Determinant Consistency",
    "subtitle": "Mathematics · Linear Equations · Concept",
    "category": "curriculum",
    "type": "CONCEPT",
    "badge": "CONCEPT",
    "route": "#/labs/lab:linear-coordinates",
    "breadcrumb": "Mathematics · Linear Equations · Concept",
    "search_text": "Linear Systems Elimination Determinant Consistency Cramer rule matrix elimination unique infinite no solution"
  },
  {
    "id": "CONCEPT-CHEM-TITRATION-CURVE",
    "title": "Acid-Base Titration Curves & Indicator Equivalence",
    "subtitle": "Chemistry · Titration · Concept",
    "category": "curriculum",
    "type": "CONCEPT",
    "badge": "CONCEPT",
    "route": "#/labs/lab:titration-simulator",
    "breadcrumb": "Chemistry · Titration · Concept",
    "search_text": "Acid-Base Titration Curves Indicator Equivalence neutralization pH endpoint phenolphthalein burette"
  },
  {
    "id": "CONCEPT-CHEM-REDOX-HALF-CELL",
    "title": "Electrochemical Half-Cells & Nernst Equation EMF",
    "subtitle": "Chemistry · Redox · Concept",
    "category": "curriculum",
    "type": "CONCEPT",
    "badge": "CONCEPT",
    "route": "#/labs/lab:redox-adaptive",
    "breadcrumb": "Chemistry · Redox · Concept",
    "search_text": "Electrochemical Half-Cells Nernst Equation EMF reduction potential galvanic cell anode cathode standard potential"
  },
  {
    "id": "CONCEPT-CHEM-MOLECULAR-GEOM",
    "title": "Molecular Geometry: Trigonal Bipyramidal & Octahedral States",
    "subtitle": "Chemistry · Bonding · Concept",
    "category": "curriculum",
    "type": "CONCEPT",
    "badge": "CONCEPT",
    "route": "#/labs/lab:chemical-bonding-atlas",
    "breadcrumb": "Chemistry · Bonding · Concept",
    "search_text": "Molecular Geometry Trigonal Bipyramidal Octahedral SF6 PCl5 axial equatorial lone pairs repulsion"
  },
  {
    "id": "CONCEPT-BIO-GENETICS-RATIOS",
    "title": "Mendelian Genetics: Monohybrid & Dihybrid Segregation Ratios",
    "subtitle": "Biology · Genetics · Concept",
    "category": "curriculum",
    "type": "CONCEPT",
    "badge": "CONCEPT",
    "route": "#/subject/biology/topic/genetics",
    "breadcrumb": "Biology · Genetics · Concept",
    "search_text": "Mendelian Genetics Monohybrid Dihybrid Segregation Ratios 3:1 9:3:3:1 dominant recessive Punnett square"
  },
  {
    "id": "CONCEPT-BIO-NEPHRON-COUNTERCURRENT",
    "title": "Nephron Physiology: Countercurrent Exchange & Osmoregulation",
    "subtitle": "Biology · Nephron · Concept",
    "category": "curriculum",
    "type": "CONCEPT",
    "badge": "CONCEPT",
    "route": "#/subject/biology/topic/nephron",
    "breadcrumb": "Biology · Nephron · Concept",
    "search_text": "Nephron Physiology Countercurrent Exchange Osmoregulation loop of Henle glomerulus filtration medullary gradient"
  },
  {
    "id": "CONCEPT-MATH-IOQM-INVARIANTS",
    "title": "IOQM Olympiad Algebra & Cyclic Symmetry Invariants",
    "subtitle": "Mathematics · IOQM Competitive · Concept",
    "category": "curriculum",
    "type": "CONCEPT",
    "badge": "CONCEPT",
    "route": "#/competitive/exam:ioqm",
    "breadcrumb": "Mathematics · IOQM Competitive · Concept",
    "search_text": "IOQM Olympiad Algebra Cyclic Symmetry Invariants AM-GM Cauchy-Schwarz factorization prime divisibility"
  },
  {
    "id": "LAB-CIRCLES-MASTER",
    "title": "Circles Master Workbench",
    "subtitle": "Mathematics · Euclidean Geometry, Tangents & Cyclic Quadrilaterals",
    "category": "tablet",
    "type": "LAB",
    "badge": "LAB",
    "route": "#/labs/lab:circles-master",
    "breadcrumb": "Mathematics · Standalone Lab · 50 Cards",
    "search_text": "Circles Master Workbench Euclidean Geometry Tangents Cyclic Quadrilaterals IMO D1 D2 D3 D4 chords"
  },
  {
    "id": "LAB-LINEAR-COORD",
    "title": "Linear Coordinates & Polynomials Suite",
    "subtitle": "Mathematics · Coordinate Geometry & Polynomial Identities",
    "category": "tablet",
    "type": "LAB",
    "badge": "LAB",
    "route": "#/labs/lab:linear-coordinates",
    "breadcrumb": "Mathematics · Standalone Lab · Linear Coordinates",
    "search_text": "Linear Coordinates Polynomials Suite Coordinate Geometry Polynomial Identities systems lines solver"
  },
  {
    "id": "LAB-RIEMANN-SUMS",
    "title": "Riemann Sums Partition Workbench",
    "subtitle": "Mathematics · Partition Refinement & Darboux Integral Explorer",
    "category": "tablet",
    "type": "LAB",
    "badge": "LAB",
    "route": "#/labs/lab:riemann-sums",
    "breadcrumb": "Mathematics · Standalone Lab · Riemann Sums",
    "search_text": "Riemann Sums Partition Workbench Partition Refinement Darboux Integral Explorer calculus definite integral area"
  },
  {
    "id": "LAB-LONG-DIVISION",
    "title": "Polynomial Long Division Scaffold",
    "subtitle": "Mathematics · Step-by-Step Polynomial Division & Factor Theorem",
    "category": "tablet",
    "type": "LAB",
    "badge": "LAB",
    "route": "#/labs/lab:long-division",
    "breadcrumb": "Mathematics · Standalone Lab · Long Division",
    "search_text": "Polynomial Long Division Scaffold Step-by-Step Polynomial Division Factor Theorem quotient remainder synthetic"
  },
  {
    "id": "LAB-MOTION-PLANE",
    "title": "Motion in a Plane Suite (Pilot 3)",
    "subtitle": "Physics · 2D Kinematics, Projectile & Velocity Vectors",
    "category": "tablet",
    "type": "LAB",
    "badge": "LAB",
    "route": "#/labs/lab:motion-in-a-plane",
    "breadcrumb": "Physics · Standalone Lab · 2D Motion",
    "search_text": "Motion in a Plane Suite Pilot 3 2D Kinematics Projectile Velocity Vectors parabolic trajectory vector"
  },
  {
    "id": "LAB-MOTION-1D",
    "title": "Motion 1D Kinematics Suite",
    "subtitle": "Physics · Rectilinear Equations & Accelerated Motion",
    "category": "tablet",
    "type": "LAB",
    "badge": "LAB",
    "route": "#/labs/lab:motion-1d-suite",
    "breadcrumb": "Physics · Standalone Lab · Motion 1D",
    "search_text": "Motion 1D Kinematics Suite Rectilinear Equations Accelerated Motion velocity time graph acceleration"
  },
  {
    "id": "LAB-VECTOR-3D",
    "title": "Vector Algebra · 3D Spatial Master Suite",
    "subtitle": "Mathematics · 3D Cartesian Coordinates & Spatial Vector Operations",
    "category": "tablet",
    "type": "LAB",
    "badge": "LAB",
    "route": "#/labs/lab:vector-algebra-3d",
    "breadcrumb": "Mathematics · Standalone Lab · Vector 3D",
    "search_text": "Vector Algebra 3D Spatial Master Suite 3D Cartesian Coordinates Spatial Vector Operations dot cross product normal"
  },
  {
    "id": "LAB-FLUID-PRESSURE",
    "title": "Fluid Pressure & Hydrostatic Thrust Suite",
    "subtitle": "Physics · Hydrostatic Mechanics, Pascal's Principle & Manometers",
    "category": "tablet",
    "type": "LAB",
    "badge": "LAB",
    "route": "#/labs/lab:fluid-pressure-thrust",
    "breadcrumb": "Physics · Standalone Lab · Fluids",
    "search_text": "Fluid Pressure Hydrostatic Thrust Suite Hydrostatic Mechanics Pascals Principle Manometers depth liquid density"
  },
  {
    "id": "LAB-EXPERIMENT-GRAPH",
    "title": "Experimental Graph Workspace",
    "subtitle": "Cross-Disciplinary · Scientific Data Plotting & Linear Regression",
    "category": "tablet",
    "type": "LAB",
    "badge": "LAB",
    "route": "#/labs/lab:experiment-graph",
    "breadcrumb": "Cross-Disciplinary · Standalone Lab · Data Plotting",
    "search_text": "Experimental Graph Workspace Scientific Data Plotting Linear Regression slope intercept scatter physics chem data"
  },
  {
    "id": "LAB-MOTION-SHARED-CLOCK",
    "title": "Motion Shared-Clock Kinematics Suite",
    "subtitle": "Physics · Two-Body Relative Kinematics with Synchronized Time Clock",
    "category": "tablet",
    "type": "LAB",
    "badge": "LAB",
    "route": "#/labs/lab:motion-shared-clock",
    "breadcrumb": "Physics · Standalone Lab · Shared Clock",
    "search_text": "Motion Shared-Clock Kinematics Suite Two-Body Relative Kinematics Synchronized Time Clock collision chase meeting"
  },
  {
    "id": "LAB-GAS-LAWS",
    "title": "Gas Laws & Kinetic Theory Suite",
    "subtitle": "Chemistry · Boyle, Charles, Avogadro & Ideal Gas Simulator",
    "category": "tablet",
    "type": "LAB",
    "badge": "LAB",
    "route": "#/labs/lab:gas-laws-suite",
    "breadcrumb": "Chemistry · Standalone Lab · Gas Laws",
    "search_text": "Gas Laws Kinetic Theory Suite Boyle Charles Avogadro Ideal Gas Simulator PV=nRT isotherms pressure volume"
  },
  {
    "id": "LAB-CHEMICAL-BONDING",
    "title": "Chemical Bonding Atlas & VSEPR Suite",
    "subtitle": "Chemistry · Molecular Geometry, Lone Pairs & Electron Repulsion",
    "category": "tablet",
    "type": "LAB",
    "badge": "LAB",
    "route": "#/labs/lab:chemical-bonding-atlas",
    "breadcrumb": "Chemistry · Standalone Lab · Bonding Atlas",
    "search_text": "Chemical Bonding Atlas VSEPR Suite Molecular Geometry Lone Pairs Electron Repulsion 3D molecular shapes hybridization"
  },
  {
    "id": "LAB-MOLE-REACTOR",
    "title": "Mole Concept & Stoichiometry Reactor",
    "subtitle": "Chemistry · Mass, Mole, Particle & Limiting Reagent Conversions",
    "category": "tablet",
    "type": "LAB",
    "badge": "LAB",
    "route": "#/labs/lab:mole-concept-reactor",
    "breadcrumb": "Chemistry · Standalone Lab · Stoichiometry",
    "search_text": "Mole Concept Stoichiometry Reactor Mass Mole Particle Limiting Reagent Conversions grams moles volume reactor"
  },
  {
    "id": "LAB-REDOX-ADAPTIVE",
    "title": "Redox Adaptive Mastery Suite",
    "subtitle": "Chemistry · Dynamic Oxidation States, Balancing & Half-Reactions",
    "category": "tablet",
    "type": "LAB",
    "badge": "LAB",
    "route": "#/labs/lab:redox-adaptive",
    "breadcrumb": "Chemistry · Standalone Lab · Redox Adaptive",
    "search_text": "Redox Adaptive Mastery Suite Dynamic Oxidation States Balancing Half-Reactions electron transfer reduction oxidation"
  },
  {
    "id": "LAB-REDOX-EQUIV",
    "title": "Redox Equivalence & Titration Engine",
    "subtitle": "Chemistry · Oxidation-Reduction Titrations, Normality & Indicators",
    "category": "tablet",
    "type": "LAB",
    "badge": "LAB",
    "route": "#/labs/lab:redox-equivalence",
    "breadcrumb": "Chemistry · Standalone Lab · Redox Equivalence",
    "search_text": "Redox Equivalence Titration Engine Oxidation-Reduction Titrations Normality Indicators KMnO4 dichromate"
  },
  {
    "id": "LAB-TITRATION-SIM",
    "title": "Titration Simulator & Equivalence Workbench",
    "subtitle": "Chemistry · Quantitative Volumetric Neutralization & pH Curves",
    "category": "tablet",
    "type": "LAB",
    "badge": "LAB",
    "route": "#/labs/lab:titration-simulator",
    "breadcrumb": "Chemistry · Standalone Lab · Titration Simulator",
    "search_text": "Titration Simulator Equivalence Workbench Quantitative Volumetric Neutralization pH Curves acid base burette endpoint"
  },
  {
    "id": "LAB-IMO-MASTER",
    "title": "IMO Olympiad Mathematics Master Suite",
    "subtitle": "Mathematics · High-Demand Olympiad Problems & Proof Workspaces",
    "category": "tablet",
    "type": "LAB",
    "badge": "LAB",
    "route": "#/labs/lab:imo-master",
    "breadcrumb": "Mathematics · Standalone Lab · IMO Master",
    "search_text": "IMO Olympiad Mathematics Master Suite High-Demand Olympiad Problems Proof Workspaces geometry algebra number theory"
  },
  {
    "id": "LAB-CIRCULAR-DYNAMICS",
    "title": "Circular Dynamics & Road Banking Simulator",
    "subtitle": "Physics · Centripetal Force, Friction & Safe Banking Angles",
    "category": "tablet",
    "type": "LAB",
    "badge": "LAB",
    "route": "#/labs/lab:circular-dynamics",
    "breadcrumb": "Physics · Standalone Lab · Circular Dynamics",
    "search_text": "Circular Dynamics Road Banking Simulator Centripetal Force Friction Safe Banking Angles curve turning vehicle"
  },
  {
    "id": "LAB-NEWTON-FRICTION",
    "title": "Newton's Laws & Friction Stage",
    "subtitle": "Physics · Multi-Body Coupled Pulleys, Incline & Limiting Friction",
    "category": "tablet",
    "type": "LAB",
    "badge": "LAB",
    "route": "#/labs/lab:newton-laws",
    "breadcrumb": "Physics · Standalone Lab · Newton Laws",
    "search_text": "Newtons Laws Friction Stage Multi-Body Coupled Pulleys Incline Limiting Friction Atwood machine normal force"
  },
  {
    "id": "LAB-SPECTROSCOPY",
    "title": "Atomic Spectroscopy & Energy Transitions Workbench",
    "subtitle": "Chemistry · Bohr Orbit Radii, Rydberg Equation & Photon Wavelengths",
    "category": "tablet",
    "type": "LAB",
    "badge": "LAB",
    "route": "#/labs/lab:spectroscopy",
    "breadcrumb": "Chemistry · Standalone Lab · Spectroscopy",
    "search_text": "Atomic Spectroscopy Energy Transitions Workbench Bohr Orbit Radii Rydberg Equation Photon Wavelengths hydrogen spectrum"
  },
  {
    "id": "LAB-PROOF-WORKSPACE",
    "title": "Formal Proof Workspace & Deductive Canvas",
    "subtitle": "Mathematics · Olympiad Mathematical Logic & Step Justification",
    "category": "tablet",
    "type": "LAB",
    "badge": "LAB",
    "route": "#/proof",
    "breadcrumb": "Mathematics · Standalone Lab · Proof Workspace",
    "search_text": "Formal Proof Workspace Deductive Canvas Olympiad Mathematical Logic Step Justification axioms lemmas QED"
  },
  {
    "id": "CORE1A-TABLET-1",
    "title": "WPE Spring-Mass Oscillator Tablet",
    "subtitle": "Physics · WPE · Core 1A Tablet",
    "category": "tablet",
    "type": "CORE_1A",
    "badge": "CORE 1A",
    "route": "#/subject/physics/topic/wpe",
    "breadcrumb": "Physics · WPE · Core 1A Tablet",
    "search_text": "WPE Spring-Mass Oscillator Tablet Physics · WPE · Core 1A Tablet spring energy conservation hooks law oscillation core 1a physical construction interactive tablet"
  },
  {
    "id": "CORE1A-TABLET-2",
    "title": "WPE Conveyor Moving Belt Tablet",
    "subtitle": "Physics · WPE · Core 1A Tablet",
    "category": "tablet",
    "type": "CORE_1A",
    "badge": "CORE 1A",
    "route": "#/subject/physics/topic/wpe",
    "breadcrumb": "Physics · WPE · Core 1A Tablet",
    "search_text": "WPE Conveyor Moving Belt Tablet Physics · WPE · Core 1A Tablet conveyor belt momentum friction sliding kinetic core 1a physical construction interactive tablet"
  },
  {
    "id": "CORE1A-TABLET-3",
    "title": "WPE Repeated Inelastic Bounce Tablet",
    "subtitle": "Physics · WPE · Core 1A Tablet",
    "category": "tablet",
    "type": "CORE_1A",
    "badge": "CORE 1A",
    "route": "#/subject/physics/topic/wpe",
    "breadcrumb": "Physics · WPE · Core 1A Tablet",
    "search_text": "WPE Repeated Inelastic Bounce Tablet Physics · WPE · Core 1A Tablet bounce coefficient of restitution height energy loss core 1a physical construction interactive tablet"
  },
  {
    "id": "CORE1A-TABLET-4",
    "title": "Kinematics Projectile Vector Tablet",
    "subtitle": "Physics · Motion 2D · Core 1A Tablet",
    "category": "tablet",
    "type": "CORE_1A",
    "badge": "CORE 1A",
    "route": "#/subject/physics/topic/wpe",
    "breadcrumb": "Physics · Motion 2D · Core 1A Tablet",
    "search_text": "Kinematics Projectile Vector Tablet Physics · Motion 2D · Core 1A Tablet projectile trajectory launch angle velocity components core 1a physical construction interactive tablet"
  },
  {
    "id": "CORE1A-TABLET-5",
    "title": "Kinematics River Swimmer Tablet",
    "subtitle": "Physics · Motion 2D · Core 1A Tablet",
    "category": "tablet",
    "type": "CORE_1A",
    "badge": "CORE 1A",
    "route": "#/subject/physics/topic/wpe",
    "breadcrumb": "Physics · Motion 2D · Core 1A Tablet",
    "search_text": "Kinematics River Swimmer Tablet Physics · Motion 2D · Core 1A Tablet river swimmer drift shortest time downstream upstream core 1a physical construction interactive tablet"
  },
  {
    "id": "CORE1A-TABLET-6",
    "title": "Circular Motion Banking Angle Tablet",
    "subtitle": "Physics · Circular · Core 1A Tablet",
    "category": "tablet",
    "type": "CORE_1A",
    "badge": "CORE 1A",
    "route": "#/subject/physics/topic/wpe",
    "breadcrumb": "Physics · Circular · Core 1A Tablet",
    "search_text": "Circular Motion Banking Angle Tablet Physics · Circular · Core 1A Tablet banked curve friction centripetal road car angle core 1a physical construction interactive tablet"
  },
  {
    "id": "CORE1A-TABLET-7",
    "title": "Coupled Two-Body Atwood Tablet",
    "subtitle": "Physics · NLM · Core 1A Tablet",
    "category": "tablet",
    "type": "CORE_1A",
    "badge": "CORE 1A",
    "route": "#/subject/physics/topic/wpe",
    "breadcrumb": "Physics · NLM · Core 1A Tablet",
    "search_text": "Coupled Two-Body Atwood Tablet Physics · NLM · Core 1A Tablet pulley tension string mass acceleration atwood core 1a physical construction interactive tablet"
  },
  {
    "id": "CORE1A-TABLET-8",
    "title": "Hydrostatic U-Tube Manometer Tablet",
    "subtitle": "Physics · Fluids · Core 1A Tablet",
    "category": "tablet",
    "type": "CORE_1A",
    "badge": "CORE 1A",
    "route": "#/subject/physics/topic/wpe",
    "breadcrumb": "Physics · Fluids · Core 1A Tablet",
    "search_text": "Hydrostatic U-Tube Manometer Tablet Physics · Fluids · Core 1A Tablet manometer column liquid height immiscible fluids density core 1a physical construction interactive tablet"
  },
  {
    "id": "CORE1A-TABLET-9",
    "title": "Hydraulic Lift Pascal Force Tablet",
    "subtitle": "Physics · Fluids · Core 1A Tablet",
    "category": "tablet",
    "type": "CORE_1A",
    "badge": "CORE 1A",
    "route": "#/subject/physics/topic/wpe",
    "breadcrumb": "Physics · Fluids · Core 1A Tablet",
    "search_text": "Hydraulic Lift Pascal Force Tablet Physics · Fluids · Core 1A Tablet hydraulic jack piston area pressure mechanical gain core 1a physical construction interactive tablet"
  },
  {
    "id": "CORE1A-TABLET-10",
    "title": "Gas Laws Isotherm Expansion Tablet",
    "subtitle": "Chemistry · Gases · Core 1A Tablet",
    "category": "tablet",
    "type": "CORE_1A",
    "badge": "CORE 1A",
    "route": "#/subject/physics/topic/wpe",
    "breadcrumb": "Chemistry · Gases · Core 1A Tablet",
    "search_text": "Gas Laws Isotherm Expansion Tablet Chemistry · Gases · Core 1A Tablet isothermal adiabatic expansion PV diagram gas cylinder core 1a physical construction interactive tablet"
  },
  {
    "id": "CORE1A-TABLET-11",
    "title": "Graham Effusion Velocity Ratio Tablet",
    "subtitle": "Chemistry · Gases · Core 1A Tablet",
    "category": "tablet",
    "type": "CORE_1A",
    "badge": "CORE 1A",
    "route": "#/subject/physics/topic/wpe",
    "breadcrumb": "Chemistry · Gases · Core 1A Tablet",
    "search_text": "Graham Effusion Velocity Ratio Tablet Chemistry · Gases · Core 1A Tablet effusion pinhole diffusion rate molar mass ratio core 1a physical construction interactive tablet"
  },
  {
    "id": "CORE1A-TABLET-12",
    "title": "VSEPR Molecular Geometry Tablet",
    "subtitle": "Chemistry · Bonding · Core 1A Tablet",
    "category": "tablet",
    "type": "CORE_1A",
    "badge": "CORE 1A",
    "route": "#/subject/physics/topic/wpe",
    "breadcrumb": "Chemistry · Bonding · Core 1A Tablet",
    "search_text": "VSEPR Molecular Geometry Tablet Chemistry · Bonding · Core 1A Tablet lone pairs electron repulsion 3D molecular bonds core 1a physical construction interactive tablet"
  },
  {
    "id": "CORE1A-TABLET-13",
    "title": "Redox Galvanic Half-Cell Tablet",
    "subtitle": "Chemistry · Redox · Core 1A Tablet",
    "category": "tablet",
    "type": "CORE_1A",
    "badge": "CORE 1A",
    "route": "#/subject/physics/topic/wpe",
    "breadcrumb": "Chemistry · Redox · Core 1A Tablet",
    "search_text": "Redox Galvanic Half-Cell Tablet Chemistry · Redox · Core 1A Tablet galvanic voltaic cell salt bridge anode cathode emf core 1a physical construction interactive tablet"
  },
  {
    "id": "CORE1A-TABLET-14",
    "title": "Acid-Base Burette Titration Tablet",
    "subtitle": "Chemistry · Titration · Core 1A Tablet",
    "category": "tablet",
    "type": "CORE_1A",
    "badge": "CORE 1A",
    "route": "#/subject/physics/topic/wpe",
    "breadcrumb": "Chemistry · Titration · Core 1A Tablet",
    "search_text": "Acid-Base Burette Titration Tablet Chemistry · Titration · Core 1A Tablet titration curve neutralization indicator endpoint burette core 1a physical construction interactive tablet"
  },
  {
    "id": "CORE1A-TABLET-15",
    "title": "Stoichiometry Limiting Reagent Tablet",
    "subtitle": "Chemistry · Stoichiometry · Core 1A Tablet",
    "category": "tablet",
    "type": "CORE_1A",
    "badge": "CORE 1A",
    "route": "#/subject/physics/topic/wpe",
    "breadcrumb": "Chemistry · Stoichiometry · Core 1A Tablet",
    "search_text": "Stoichiometry Limiting Reagent Tablet Chemistry · Stoichiometry · Core 1A Tablet limiting reactant excess theoretical yield moles core 1a physical construction interactive tablet"
  },
  {
    "id": "CORE1A-TABLET-16",
    "title": "Circles Centre & Inscribed Arc Tablet",
    "subtitle": "Mathematics · Circles · Core 1A Tablet",
    "category": "tablet",
    "type": "CORE_1A",
    "badge": "CORE 1A",
    "route": "#/subject/physics/topic/wpe",
    "breadcrumb": "Mathematics · Circles · Core 1A Tablet",
    "search_text": "Circles Centre & Inscribed Arc Tablet Mathematics · Circles · Core 1A Tablet subtended angle centre circumference arc diameter core 1a physical construction interactive tablet"
  },
  {
    "id": "CORE1A-TABLET-17",
    "title": "Circles Tangent From External Point Tablet",
    "subtitle": "Mathematics · Circles · Core 1A Tablet",
    "category": "tablet",
    "type": "CORE_1A",
    "badge": "CORE 1A",
    "route": "#/subject/physics/topic/wpe",
    "breadcrumb": "Mathematics · Circles · Core 1A Tablet",
    "search_text": "Circles Tangent From External Point Tablet Mathematics · Circles · Core 1A Tablet tangents external point equal lengths radius normal core 1a physical construction interactive tablet"
  },
  {
    "id": "CORE1A-TABLET-18",
    "title": "Cyclic Quadrilateral Invariant Tablet",
    "subtitle": "Mathematics · Circles · Core 1A Tablet",
    "category": "tablet",
    "type": "CORE_1A",
    "badge": "CORE 1A",
    "route": "#/subject/physics/topic/wpe",
    "breadcrumb": "Mathematics · Circles · Core 1A Tablet",
    "search_text": "Cyclic Quadrilateral Invariant Tablet Mathematics · Circles · Core 1A Tablet cyclic quadrilateral opposite angles concyclic circle core 1a physical construction interactive tablet"
  },
  {
    "id": "CORE1A-TABLET-19",
    "title": "Polynomial Synthetic Division Tablet",
    "subtitle": "Mathematics · Polynomials · Core 1A Tablet",
    "category": "tablet",
    "type": "CORE_1A",
    "badge": "CORE 1A",
    "route": "#/subject/physics/topic/wpe",
    "breadcrumb": "Mathematics · Polynomials · Core 1A Tablet",
    "search_text": "Polynomial Synthetic Division Tablet Mathematics · Polynomials · Core 1A Tablet polynomial division factor theorem remainder roots core 1a physical construction interactive tablet"
  },
  {
    "id": "CORE1A-TABLET-20",
    "title": "Riemann Partition Refinement Tablet",
    "subtitle": "Mathematics · Riemann · Core 1A Tablet",
    "category": "tablet",
    "type": "CORE_1A",
    "badge": "CORE 1A",
    "route": "#/subject/physics/topic/wpe",
    "breadcrumb": "Mathematics · Riemann · Core 1A Tablet",
    "search_text": "Riemann Partition Refinement Tablet Mathematics · Riemann · Core 1A Tablet riemann sum upper lower darboux rectangles calculus core 1a physical construction interactive tablet"
  },
  {
    "id": "CORE2-TABLET-1",
    "title": "WPE Spring-Mass Supported Practice Tablet",
    "subtitle": "Physics · WPE · Core 2A Tablet",
    "category": "tablet",
    "type": "CORE_2",
    "badge": "CORE 2",
    "route": "#/subject/physics/topic/wpe",
    "breadcrumb": "Physics · WPE · Core 2A Tablet",
    "search_text": "WPE Spring-Mass Supported Practice Tablet Physics · WPE · Core 2A Tablet spring mass supported hints intermediate verification core 2 practice transfer assessment tablet"
  },
  {
    "id": "CORE2-TABLET-2",
    "title": "WPE Changed-Demand Transfer Tablet",
    "subtitle": "Physics · WPE · Core 2B Tablet",
    "category": "tablet",
    "type": "CORE_2",
    "badge": "CORE 2",
    "route": "#/subject/physics/topic/wpe",
    "breadcrumb": "Physics · WPE · Core 2B Tablet",
    "search_text": "WPE Changed-Demand Transfer Tablet Physics · WPE · Core 2B Tablet two well barrier friction perturbation transfer rubric core 2 practice transfer assessment tablet"
  },
  {
    "id": "CORE2-TABLET-3",
    "title": "Kinematics Projectile Supported Practice",
    "subtitle": "Physics · Motion 2D · Core 2A Tablet",
    "category": "tablet",
    "type": "CORE_2",
    "badge": "CORE 2",
    "route": "#/subject/physics/topic/wpe",
    "breadcrumb": "Physics · Motion 2D · Core 2A Tablet",
    "search_text": "Kinematics Projectile Supported Practice Physics · Motion 2D · Core 2A Tablet projectile trajectory hint ladder scaffolded calculation core 2 practice transfer assessment tablet"
  },
  {
    "id": "CORE2-TABLET-4",
    "title": "Kinematics Moving Incline Transfer Tablet",
    "subtitle": "Physics · Motion 2D · Core 2B Tablet",
    "category": "tablet",
    "type": "CORE_2",
    "badge": "CORE 2",
    "route": "#/subject/physics/topic/wpe",
    "breadcrumb": "Physics · Motion 2D · Core 2B Tablet",
    "search_text": "Kinematics Moving Incline Transfer Tablet Physics · Motion 2D · Core 2B Tablet inclined plane launch changed demand transfer reasoning core 2 practice transfer assessment tablet"
  },
  {
    "id": "CORE2-TABLET-5",
    "title": "Circular Motion Critical Speed Practice",
    "subtitle": "Physics · Circular · Core 2A Tablet",
    "category": "tablet",
    "type": "CORE_2",
    "badge": "CORE 2",
    "route": "#/subject/physics/topic/wpe",
    "breadcrumb": "Physics · Circular · Core 2A Tablet",
    "search_text": "Circular Motion Critical Speed Practice Physics · Circular · Core 2A Tablet centripetal minimum velocity vertical circle loop core 2 practice transfer assessment tablet"
  },
  {
    "id": "CORE2-TABLET-6",
    "title": "Circular Track Transfer Rubric Tablet",
    "subtitle": "Physics · Circular · Core 2B Tablet",
    "category": "tablet",
    "type": "CORE_2",
    "badge": "CORE 2",
    "route": "#/subject/physics/topic/wpe",
    "breadcrumb": "Physics · Circular · Core 2B Tablet",
    "search_text": "Circular Track Transfer Rubric Tablet Physics · Circular · Core 2B Tablet non-uniform circular motion transfer uncommitted rubric core 2 practice transfer assessment tablet"
  },
  {
    "id": "CORE2-TABLET-7",
    "title": "Atwood Coupled Accelerated Practice",
    "subtitle": "Physics · NLM · Core 2A Tablet",
    "category": "tablet",
    "type": "CORE_2",
    "badge": "CORE 2",
    "route": "#/subject/physics/topic/wpe",
    "breadcrumb": "Physics · NLM · Core 2A Tablet",
    "search_text": "Atwood Coupled Accelerated Practice Physics · NLM · Core 2A Tablet pulley system hint ladder tension computation core 2 practice transfer assessment tablet"
  },
  {
    "id": "CORE2-TABLET-8",
    "title": "Friction Block on Wedge Transfer Tablet",
    "subtitle": "Physics · NLM · Core 2B Tablet",
    "category": "tablet",
    "type": "CORE_2",
    "badge": "CORE 2",
    "route": "#/subject/physics/topic/wpe",
    "breadcrumb": "Physics · NLM · Core 2B Tablet",
    "search_text": "Friction Block on Wedge Transfer Tablet Physics · NLM · Core 2B Tablet wedge acceleration friction threshold transfer problem core 2 practice transfer assessment tablet"
  },
  {
    "id": "CORE2-TABLET-9",
    "title": "Hydrostatic Manometer Supported Practice",
    "subtitle": "Physics · Fluids · Core 2A Tablet",
    "category": "tablet",
    "type": "CORE_2",
    "badge": "CORE 2",
    "route": "#/subject/physics/topic/wpe",
    "breadcrumb": "Physics · Fluids · Core 2A Tablet",
    "search_text": "Hydrostatic Manometer Supported Practice Physics · Fluids · Core 2A Tablet two liquid manometer height calculation hints core 2 practice transfer assessment tablet"
  },
  {
    "id": "CORE2-TABLET-10",
    "title": "Hydraulic Energy Conservation Transfer",
    "subtitle": "Physics · Fluids · Core 2B Tablet",
    "category": "tablet",
    "type": "CORE_2",
    "badge": "CORE 2",
    "route": "#/subject/physics/topic/wpe",
    "breadcrumb": "Physics · Fluids · Core 2B Tablet",
    "search_text": "Hydraulic Energy Conservation Transfer Physics · Fluids · Core 2B Tablet hydraulic power input output work transfer rubric core 2 practice transfer assessment tablet"
  },
  {
    "id": "CORE2-TABLET-11",
    "title": "Gas Laws Molar Expansion Practice Tablet",
    "subtitle": "Chemistry · Gases · Core 2A Tablet",
    "category": "tablet",
    "type": "CORE_2",
    "badge": "CORE 2",
    "route": "#/subject/physics/topic/wpe",
    "breadcrumb": "Chemistry · Gases · Core 2A Tablet",
    "search_text": "Gas Laws Molar Expansion Practice Tablet Chemistry · Gases · Core 2A Tablet gas piston variable temperature pressure hints core 2 practice transfer assessment tablet"
  },
  {
    "id": "CORE2-TABLET-12",
    "title": "Non-Ideal Gas Virial Transfer Tablet",
    "subtitle": "Chemistry · Gases · Core 2B Tablet",
    "category": "tablet",
    "type": "CORE_2",
    "badge": "CORE 2",
    "route": "#/subject/physics/topic/wpe",
    "breadcrumb": "Chemistry · Gases · Core 2B Tablet",
    "search_text": "Non-Ideal Gas Virial Transfer Tablet Chemistry · Gases · Core 2B Tablet van der waals deviation transfer changed demand core 2 practice transfer assessment tablet"
  },
  {
    "id": "CORE2-TABLET-13",
    "title": "Chemical Bonding Dipole Moment Practice",
    "subtitle": "Chemistry · Bonding · Core 2A Tablet",
    "category": "tablet",
    "type": "CORE_2",
    "badge": "CORE 2",
    "route": "#/subject/physics/topic/wpe",
    "breadcrumb": "Chemistry · Bonding · Core 2A Tablet",
    "search_text": "Chemical Bonding Dipole Moment Practice Chemistry · Bonding · Core 2A Tablet electronegativity net dipole moment cancellation core 2 practice transfer assessment tablet"
  },
  {
    "id": "CORE2-TABLET-14",
    "title": "Molecular Orbital Paramagnetism Transfer",
    "subtitle": "Chemistry · Bonding · Core 2B Tablet",
    "category": "tablet",
    "type": "CORE_2",
    "badge": "CORE 2",
    "route": "#/subject/physics/topic/wpe",
    "breadcrumb": "Chemistry · Bonding · Core 2B Tablet",
    "search_text": "Molecular Orbital Paramagnetism Transfer Chemistry · Bonding · Core 2B Tablet oxygen nitrogen MO energy level diagram transfer core 2 practice transfer assessment tablet"
  },
  {
    "id": "CORE2-TABLET-15",
    "title": "Redox Permanganate Titration Practice",
    "subtitle": "Chemistry · Redox · Core 2A Tablet",
    "category": "tablet",
    "type": "CORE_2",
    "badge": "CORE 2",
    "route": "#/subject/physics/topic/wpe",
    "breadcrumb": "Chemistry · Redox · Core 2A Tablet",
    "search_text": "Redox Permanganate Titration Practice Chemistry · Redox · Core 2A Tablet acidic medium kmno4 balancing stoichiometry hints core 2 practice transfer assessment tablet"
  },
  {
    "id": "CORE2-TABLET-16",
    "title": "Disproportionation Battery Transfer Tablet",
    "subtitle": "Chemistry · Redox · Core 2B Tablet",
    "category": "tablet",
    "type": "CORE_2",
    "badge": "CORE 2",
    "route": "#/subject/physics/topic/wpe",
    "breadcrumb": "Chemistry · Redox · Core 2B Tablet",
    "search_text": "Disproportionation Battery Transfer Tablet Chemistry · Redox · Core 2B Tablet fuel cell transfer demand sealed assessment rubric core 2 practice transfer assessment tablet"
  },
  {
    "id": "CORE2-TABLET-17",
    "title": "Circles Chord Product Supported Practice",
    "subtitle": "Mathematics · Circles · Core 2A Tablet",
    "category": "tablet",
    "type": "CORE_2",
    "badge": "CORE 2",
    "route": "#/subject/physics/topic/wpe",
    "breadcrumb": "Mathematics · Circles · Core 2A Tablet",
    "search_text": "Circles Chord Product Supported Practice Mathematics · Circles · Core 2A Tablet intersecting secants power point circle hints core 2 practice transfer assessment tablet"
  },
  {
    "id": "CORE2-TABLET-18",
    "title": "Ptolemy Cyclic Quad Olympiad Transfer",
    "subtitle": "Mathematics · Circles · Core 2B Tablet",
    "category": "tablet",
    "type": "CORE_2",
    "badge": "CORE 2",
    "route": "#/subject/physics/topic/wpe",
    "breadcrumb": "Mathematics · Circles · Core 2B Tablet",
    "search_text": "Ptolemy Cyclic Quad Olympiad Transfer Mathematics · Circles · Core 2B Tablet casey theorem degenerate ptolemy transfer rubric core 2 practice transfer assessment tablet"
  },
  {
    "id": "CORE2-TABLET-19",
    "title": "Polynomial Vieta Roots Supported Practice",
    "subtitle": "Mathematics · Polynomials · Core 2A Tablet",
    "category": "tablet",
    "type": "CORE_2",
    "badge": "CORE 2",
    "route": "#/subject/physics/topic/wpe",
    "breadcrumb": "Mathematics · Polynomials · Core 2A Tablet",
    "search_text": "Polynomial Vieta Roots Supported Practice Mathematics · Polynomials · Core 2A Tablet symmetric sum roots cubic equation hints core 2 practice transfer assessment tablet"
  },
  {
    "id": "CORE2-TABLET-20",
    "title": "Riemann Trapezoidal Error Transfer Tablet",
    "subtitle": "Mathematics · Riemann · Core 2B Tablet",
    "category": "tablet",
    "type": "CORE_2",
    "badge": "CORE 2",
    "route": "#/subject/physics/topic/wpe",
    "breadcrumb": "Mathematics · Riemann · Core 2B Tablet",
    "search_text": "Riemann Trapezoidal Error Transfer Tablet Mathematics · Riemann · Core 2B Tablet trapezoid simpson rule bounding transfer takeaway core 2 practice transfer assessment tablet"
  },
  {
    "id": "Q-PHY-WPE-B1-01",
    "title": "Q-PHY-WPE-B1-01: EX-M2 — APPLY (D2) · APPLY (D2)",
    "subtitle": "Physics · Work, Power & Energy · B1 · JEE Main 2026 (Online) 6th April Evening Shift · EX-M2 · APPLY · D2",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/question/Q-PHY-WPE-B1-01",
    "breadcrumb": "Physics · Work, Power & Energy · D2",
    "search_text": "Q-PHY-WPE-B1-01 Q-PHY-WPE-B1-01 EX-M2 — APPLY (D2) The velocity at which 6 kg mass (shown in figure) strikes the ground when it is released from a height of 6 m above the ground is ____ m/s . Assume pulley is massless and string is light and inextensible. (Take g=10m/s^(2) ) [FIG-stem-1] JEE Main 2026 (Online) 6th April Evening Shift · EX-M2 · APPLY · D2 Physics Work Power Energy"
  },
  {
    "id": "Q-PHY-WPE-B1-03",
    "title": "Q-PHY-WPE-B1-03: EX-M6 — JUSTIFY (D4) · JUSTIFY (D4)",
    "subtitle": "Physics · Work, Power & Energy · B1 · JEE Main 2026 (Online) 23rd January Evening Shift · EX-M6 · JUSTIFY · D4",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/question/Q-PHY-WPE-B1-03",
    "breadcrumb": "Physics · Work, Power & Energy · D4",
    "search_text": "Q-PHY-WPE-B1-03 Q-PHY-WPE-B1-03 EX-M6 — JUSTIFY (D4) A bead 𝑃 sliding on a frictionless semi-circular string (𝐴𝐶𝐵) and it is at point 𝑆 at 𝑡=0 and at this instant the horizontal component of its velocity is 𝑣 . Another bead 𝑄 of the same mass as 𝑃 is ejected from point 𝐴 at 𝑡=0 along the horizontal string 𝐴𝐵 , with the speed 𝑣 , friction between the beads and the respective strings may be neglected in both cases. Let 𝑡_𝑃 and 𝑡_𝑄 be the respective times taken by beads 𝑃 and 𝑄 to reach the point 𝐵 , then the relation between 𝑡_𝑃 and 𝑡_𝑄 is [FIG-stem-1] JEE Main 2026 (Online) 23rd January Evening Shift · EX-M6 · JUSTIFY · D4 Physics Work Power Energy"
  },
  {
    "id": "Q-PHY-WPE-B1-04",
    "title": "Q-PHY-WPE-B1-04: EX-M7 — APPLY (D2) · APPLY (D2)",
    "subtitle": "Physics · Work, Power & Energy · B1 · JEE Main 2026 (Online) 23rd January Morning Shift · EX-M7 · APPLY · D2",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/question/Q-PHY-WPE-B1-04",
    "breadcrumb": "Physics · Work, Power & Energy · D2",
    "search_text": "Q-PHY-WPE-B1-04 Q-PHY-WPE-B1-04 EX-M7 — APPLY (D2) An object is projected with kinetic energy 𝐾 from a point 𝐴 at an angle 60^(∘) with the horizontal. The ratio of the difference in kinetic energies at points 𝐵 and 𝐶 to that at point 𝐴 (see figure), in the absence of air friction is : [FIG-stem-1] JEE Main 2026 (Online) 23rd January Morning Shift · EX-M7 · APPLY · D2 Physics Work Power Energy"
  },
  {
    "id": "Q-PHY-WPE-B1-05",
    "title": "Q-PHY-WPE-B1-05: EX-M8 — APPLY (D2) · APPLY (D2)",
    "subtitle": "Physics · Work, Power & Energy · B1 · JEE Main 2026 (Online) 23rd January Morning Shift · EX-M8 · APPLY · D2",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/question/Q-PHY-WPE-B1-05",
    "breadcrumb": "Physics · Work, Power & Energy · D2",
    "search_text": "Q-PHY-WPE-B1-05 Q-PHY-WPE-B1-05 EX-M8 — APPLY (D2) Two blocks with masses 100 g and 200 g are attached to the ends of springs 𝐴 and 𝐵 as shown in figure. The energy stored in 𝐴 is 𝐸 . The energy stored in 𝐵 , when spring constants 𝑘_𝐴,𝑘_𝐵 of 𝐴 and 𝐵 , respectively satisfy the relation 4𝑘_𝐴=3𝑘_𝐵 , is : [FIG-stem-1] JEE Main 2026 (Online) 23rd January Morning Shift · EX-M8 · APPLY · D2 Physics Work Power Energy"
  },
  {
    "id": "Q-PHY-WPE-B1-06",
    "title": "Q-PHY-WPE-B1-06: EX-M11 — REPRESENT (D2) · REPRESENT (D2)",
    "subtitle": "Physics · Work, Power & Energy · B1 · JEE Main 2026 (Online) 21st January Morning Shift · EX-M11 · REPRESENT · D2",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/question/Q-PHY-WPE-B1-06",
    "breadcrumb": "Physics · Work, Power & Energy · D2",
    "search_text": "Q-PHY-WPE-B1-06 Q-PHY-WPE-B1-06 EX-M11 — REPRESENT (D2) Potential energy ( 𝑉 ) versus distance ( 𝑥 ) is given by the graph. Rank various regions as per the magnitudes of the force ( 𝐹 ) acting on a particle from high to low. [FIG-stem-1] JEE Main 2026 (Online) 21st January Morning Shift · EX-M11 · REPRESENT · D2 Physics Work Power Energy"
  },
  {
    "id": "Q-PHY-WPE-B1-07",
    "title": "Q-PHY-WPE-B1-07: EX-M14 — APPLY (D2) · APPLY (D2)",
    "subtitle": "Physics · Work, Power & Energy · B1 · JEE Main 2025 (Online) 4th April Evening Shift · EX-M14 · APPLY · D2",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/question/Q-PHY-WPE-B1-07",
    "breadcrumb": "Physics · Work, Power & Energy · D2",
    "search_text": "Q-PHY-WPE-B1-07 Q-PHY-WPE-B1-07 EX-M14 — APPLY (D2) A block of mass 25 kg is pulled along a horizontal surface by a force at an angle 45^(∘) with the horizontal. The friction coefficient between the block and the surface is 0.25 . The block travels at a uniform velocity. The work done by the applied force during a displacement of 5 m of the block is : JEE Main 2025 (Online) 4th April Evening Shift · EX-M14 · APPLY · D2 Physics Work Power Energy"
  },
  {
    "id": "Q-PHY-WPE-B1-08",
    "title": "Q-PHY-WPE-B1-08: EX-M16 — MODEL (D3) · MODEL (D3)",
    "subtitle": "Physics · Work, Power & Energy · B1 · JEE Main 2025 (Online) 29th January Evening Shift · EX-M16 · MODEL · D3",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/question/Q-PHY-WPE-B1-08",
    "breadcrumb": "Physics · Work, Power & Energy · D3",
    "search_text": "Q-PHY-WPE-B1-08 Q-PHY-WPE-B1-08 EX-M16 — MODEL (D3) A sand dropper drops sand of mass m(t) on a conveyer belt at a rate proportional to the square root of speed (v) of the belt, i.e., (𝑑𝑚)/(𝑑𝑡)∝√(𝑣) . If P is the power delivered to run the belt at constant speed then which of the following relationship is true? JEE Main 2025 (Online) 29th January Evening Shift · EX-M16 · MODEL · D3 Physics Work Power Energy"
  },
  {
    "id": "Q-PHY-WPE-B1-09",
    "title": "Q-PHY-WPE-B1-09: EX-M18 — MODEL (D4) · MODEL (D4)",
    "subtitle": "Physics · Work, Power & Energy · B1 · JEE Main 2025 (Online) 28th January Morning Shift · EX-M18 · MODEL · D4",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/question/Q-PHY-WPE-B1-09",
    "breadcrumb": "Physics · Work, Power & Energy · D4",
    "search_text": "Q-PHY-WPE-B1-09 Q-PHY-WPE-B1-09 EX-M18 — MODEL (D4) A bead of mass ' 𝑚 ' slides without friction on the wall of a vertical circular hoop of radius ' 𝑅 ' as shown in figure. The bead moves under the combined action of gravity and a massless spring (k) attached to the bottom of the hoop. The equilibrium length of the spring is ' 𝑅 '. If the bead is released from top of the hoop with (negligible) zero initial speed, velocity of bead, when the length of spring becomes ' 𝑅 ', would be (spring constant is ' 𝑘 ', 𝑔 is acceleration due to gravity) [FIG-stem-1] JEE Main 2025 (Online) 28th January Morning Shift · EX-M18 · MODEL · D4 Physics Work Power Energy"
  },
  {
    "id": "Q-PHY-WPE-B1-10",
    "title": "Q-PHY-WPE-B1-10: EX-M24 — APPLY (D4) · APPLY (D4)",
    "subtitle": "Physics · Work, Power & Energy · B1 · JEE Main 2024 (Online) 8th April Evening Shift · EX-M24 · APPLY · D4",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/question/Q-PHY-WPE-B1-10",
    "breadcrumb": "Physics · Work, Power & Energy · D4",
    "search_text": "Q-PHY-WPE-B1-10 Q-PHY-WPE-B1-10 EX-M24 — APPLY (D4) [FIG-stem-1] A block is simply released from the top of an inclined plane as shown in the figure above. The maximum compression in the spring when the block hits the spring is : JEE Main 2024 (Online) 8th April Evening Shift · EX-M24 · APPLY · D4 Physics Work Power Energy"
  },
  {
    "id": "Q-PHY-WPE-B1-12",
    "title": "Q-PHY-WPE-B1-12: EX-M36 — APPLY (D2) · APPLY (D2)",
    "subtitle": "Physics · Work, Power & Energy · B1 · JEE Main 2024 (Online) 29th January Evening Shift · EX-M36 · APPLY · D2",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/question/Q-PHY-WPE-B1-12",
    "breadcrumb": "Physics · Work, Power & Energy · D2",
    "search_text": "Q-PHY-WPE-B1-12 Q-PHY-WPE-B1-12 EX-M36 — APPLY (D2) A bob of mass ' 𝑚 ' is suspended by a light string of length ' 𝐿 '. It is imparted a minimum horizontal velocity at the lowest point 𝐴 such that it just completes half circle reaching the top most position B. The ratio of kinetic energies ((𝐾.𝐸)_𝐴)/((𝐾.𝐸)_𝐵) is : [FIG-stem-1] JEE Main 2024 (Online) 29th January Evening Shift · EX-M36 · APPLY · D2 Physics Work Power Energy"
  },
  {
    "id": "Q-PHY-WPE-B1-13",
    "title": "Q-PHY-WPE-B1-13: EX-M47 — RETRIEVE (D1) · RETRIEVE (D1)",
    "subtitle": "Physics · Work, Power & Energy · B1 · JEE Main 2022 (Online) 29th July Morning Shift · EX-M47 · RETRIEVE · D1",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/question/Q-PHY-WPE-B1-13",
    "breadcrumb": "Physics · Work, Power & Energy · D1",
    "search_text": "Q-PHY-WPE-B1-13 Q-PHY-WPE-B1-13 EX-M47 — RETRIEVE (D1) A ball is projected with kinetic energy E, at an angle of 60^(∘) to the horizontal. The kinetic energy of this ball at the highest point of its flight will become : JEE Main 2022 (Online) 29th July Morning Shift · EX-M47 · RETRIEVE · D1 Physics Work Power Energy"
  },
  {
    "id": "Q-PHY-WPE-B1-14",
    "title": "Q-PHY-WPE-B1-14: EX-M49 — APPLY (D2) · APPLY (D2)",
    "subtitle": "Physics · Work, Power & Energy · B1 · JEE Main 2022 (Online) 27th July Morning Shift · EX-M49 · APPLY · D2",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/question/Q-PHY-WPE-B1-14",
    "breadcrumb": "Physics · Work, Power & Energy · D2",
    "search_text": "Q-PHY-WPE-B1-14 Q-PHY-WPE-B1-14 EX-M49 — APPLY (D2) Sand is being dropped from a stationary dropper at a rate of 0.5kgs^(−1) on a conveyor belt moving with a velocity of 5ms^(−1) . The power needed to keep the belt moving with the same velocity will be : JEE Main 2022 (Online) 27th July Morning Shift · EX-M49 · APPLY · D2 Physics Work Power Energy"
  },
  {
    "id": "Q-PHY-WPE-B1-15",
    "title": "Q-PHY-WPE-B1-15: EX-M50 — APPLY (D2) · APPLY (D2)",
    "subtitle": "Physics · Work, Power & Energy · B1 · JEE Main 2022 (Online) 26th July Morning Shift · EX-M50 · APPLY · D2",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/question/Q-PHY-WPE-B1-15",
    "breadcrumb": "Physics · Work, Power & Energy · D2",
    "search_text": "Q-PHY-WPE-B1-15 Q-PHY-WPE-B1-15 EX-M50 — APPLY (D2) As per the given figure, two blocks each of mass 250g are connected to a spring of spring constant 2Nm^(−1) . If both are given velocity 𝑣 in opposite directions, then maximum elongation of the spring is : [FIG-stem-1] JEE Main 2022 (Online) 26th July Morning Shift · EX-M50 · APPLY · D2 Physics Work Power Energy"
  },
  {
    "id": "Q-PHY-WPE-B2-16",
    "title": "Q-PHY-WPE-B2-16: EX-M56 — REPRESENT (D2) · REPRESENT (D2)",
    "subtitle": "Physics · Work, Power & Energy · B2 · JEE Main 2022 (Online) 26th June Evening Shift · EX-M56 · REPRESENT · D2",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/question/Q-PHY-WPE-B2-16",
    "breadcrumb": "Physics · Work, Power & Energy · D2",
    "search_text": "Q-PHY-WPE-B2-16 Q-PHY-WPE-B2-16 EX-M56 — REPRESENT (D2) Arrange the four graphs in descending order of total work done; where W1, W2, W3 and W4 are the work done corresponding to figure a, b, c and d respectively. [FIG-stem-1] [FIG-stem-2] [FIG-stem-3] [FIG-stem-4] JEE Main 2022 (Online) 26th June Evening Shift · EX-M56 · REPRESENT · D2 Physics Work Power Energy"
  },
  {
    "id": "Q-PHY-WPE-B2-17",
    "title": "Q-PHY-WPE-B2-17: EX-M61 — EXPLAIN (D2) · EXPLAIN (D2)",
    "subtitle": "Physics · Work, Power & Energy · B2 · JEE Main 2021 (Online) 27th July Evening Shift · EX-M61 · EXPLAIN · D2",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/question/Q-PHY-WPE-B2-17",
    "breadcrumb": "Physics · Work, Power & Energy · D2",
    "search_text": "Q-PHY-WPE-B2-17 Q-PHY-WPE-B2-17 EX-M61 — EXPLAIN (D2) Given below is the plot of a potential energy function U(x) for a system, in which a particle is in one dimensional motion, while a conservative force F(x) acts on it. Suppose that Emech = 8 J, the incorrect statement for this system is : [FIG-stem-1] [ where K.E. = kinetic energy ] JEE Main 2021 (Online) 27th July Evening Shift · EX-M61 · EXPLAIN · D2 Physics Work Power Energy"
  },
  {
    "id": "Q-PHY-WPE-B2-18",
    "title": "Q-PHY-WPE-B2-18: EX-M62 — MODEL (D3) · MODEL (D3)",
    "subtitle": "Physics · Work, Power & Energy · B2 · JEE Main 2021 (Online) 27th July Evening Shift · EX-M62 · MODEL · D3",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/question/Q-PHY-WPE-B2-18",
    "breadcrumb": "Physics · Work, Power & Energy · D3",
    "search_text": "Q-PHY-WPE-B2-18 Q-PHY-WPE-B2-18 EX-M62 — MODEL (D3) An automobile of mass 'm' accelerates starting from origin and initially at rest, while the engine supplies constant power P. The position is given as a function of time by : JEE Main 2021 (Online) 27th July Evening Shift · EX-M62 · MODEL · D3 Physics Work Power Energy"
  },
  {
    "id": "Q-PHY-WPE-B2-20",
    "title": "Q-PHY-WPE-B2-20: EX-M65 — APPLY (D2) · APPLY (D2)",
    "subtitle": "Physics · Work, Power & Energy · B2 · JEE Main 2021 (Online) 18th March Morning Shift · EX-M65 · APPLY · D2",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/question/Q-PHY-WPE-B2-20",
    "breadcrumb": "Physics · Work, Power & Energy · D2",
    "search_text": "Q-PHY-WPE-B2-20 Q-PHY-WPE-B2-20 EX-M65 — APPLY (D2) A constant power delivering machine has towed a box, which was initially at rest, along a horizontal straight line. The distance moved by the box in time 't' is proportional to :- JEE Main 2021 (Online) 18th March Morning Shift · EX-M65 · APPLY · D2 Physics Work Power Energy"
  },
  {
    "id": "Q-PHY-WPE-B2-21",
    "title": "Q-PHY-WPE-B2-21: EX-M68 — APPLY (D2) · APPLY (D2)",
    "subtitle": "Physics · Work, Power & Energy · B2 · JEE Main 2020 (Online) 4th September Evening Slot · EX-M68 · APPLY · D2",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/question/Q-PHY-WPE-B2-21",
    "breadcrumb": "Physics · Work, Power & Energy · D2",
    "search_text": "Q-PHY-WPE-B2-21 Q-PHY-WPE-B2-21 EX-M68 — APPLY (D2) A person pushes a box on a rough horizontal platform surface. He applies a force of 200 N over a distance of 15 m. Thereafter, he gets progressively tired and his applied force reduces linearly with distance to 100 N. The total distance through which the box has been moved is 30 m. What is the work done by the person during the total movement of the box? JEE Main 2020 (Online) 4th September Evening Slot · EX-M68 · APPLY · D2 Physics Work Power Energy"
  },
  {
    "id": "Q-PHY-WPE-B2-22",
    "title": "Q-PHY-WPE-B2-22: EX-M69 — REPRESENT (D2) · REPRESENT (D2)",
    "subtitle": "Physics · Work, Power & Energy · B2 · JEE Main 2020 (Online) 3rd September Evening Slot · EX-M69 · REPRESENT · D2",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/question/Q-PHY-WPE-B2-22",
    "breadcrumb": "Physics · Work, Power & Energy · D2",
    "search_text": "Q-PHY-WPE-B2-22 Q-PHY-WPE-B2-22 EX-M69 — REPRESENT (D2) A particle is moving unidirectionally on a horizontal plane under the action of a constant power supplying energy source. The displacement (s) - time (t) graph that describes the motion of the particle is (graphs are drawn schematically and are not to scale) : JEE Main 2020 (Online) 3rd September Evening Slot · EX-M69 · REPRESENT · D2 Physics Work Power Energy"
  },
  {
    "id": "Q-PHY-WPE-B2-23",
    "title": "Q-PHY-WPE-B2-23: EX-M73 — APPLY (D3) · APPLY (D3)",
    "subtitle": "Physics · Work, Power & Energy · B2 · JEE Main 2019 (Online) 9th April Morning Slot · EX-M73 · APPLY · D3",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/question/Q-PHY-WPE-B2-23",
    "breadcrumb": "Physics · Work, Power & Energy · D3",
    "search_text": "Q-PHY-WPE-B2-23 Q-PHY-WPE-B2-23 EX-M73 — APPLY (D3) A uniform cable of mass 'M' and length 'L' is placed on a horizontal surface such that its (1/n)th part is hanging below the edge of the surface. To lift the hanging part of the cable upto the surface, the work done should be : JEE Main 2019 (Online) 9th April Morning Slot · EX-M73 · APPLY · D3 Physics Work Power Energy"
  },
  {
    "id": "Q-PHY-WPE-B2-24",
    "title": "Q-PHY-WPE-B2-24: EX-M74 — APPLY (D2) · APPLY (D2)",
    "subtitle": "Physics · Work, Power & Energy · B2 · JEE Main 2019 (Online) 8th April Morning Slot · EX-M74 · APPLY · D2",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/question/Q-PHY-WPE-B2-24",
    "breadcrumb": "Physics · Work, Power & Energy · D2",
    "search_text": "Q-PHY-WPE-B2-24 Q-PHY-WPE-B2-24 EX-M74 — APPLY (D2) A particle moves in one dimension from rest under the influence of a force that varies with the distance travelled by the particle as shown in the figure. The kinetic energy of the particle after it has travelled 3m is : [FIG-stem-1] JEE Main 2019 (Online) 8th April Morning Slot · EX-M74 · APPLY · D2 Physics Work Power Energy"
  },
  {
    "id": "Q-PHY-WPE-B2-25",
    "title": "Q-PHY-WPE-B2-25: EX-M76 — APPLY (D2) · APPLY (D2)",
    "subtitle": "Physics · Work, Power & Energy · B2 · JEE Main 2019 (Online) 10th January Morning Slot · EX-M76 · APPLY · D2",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/question/Q-PHY-WPE-B2-25",
    "breadcrumb": "Physics · Work, Power & Energy · D2",
    "search_text": "Q-PHY-WPE-B2-25 Q-PHY-WPE-B2-25 EX-M76 — APPLY (D2) A block of mass m is kept on a platform which starts from rest with constant acceleration g/2 upward, as shown in figure. Work done by normal reaction on block in time t is - [FIG-stem-1] JEE Main 2019 (Online) 10th January Morning Slot · EX-M76 · APPLY · D2 Physics Work Power Energy"
  },
  {
    "id": "Q-PHY-WPE-B2-26",
    "title": "Q-PHY-WPE-B2-26: EX-M78 — APPLY (D2) · APPLY (D2)",
    "subtitle": "Physics · Work, Power & Energy · B2 · JEE Main 2019 (Online) 9th January Morning Slot · EX-M78 · APPLY · D2",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/question/Q-PHY-WPE-B2-26",
    "breadcrumb": "Physics · Work, Power & Energy · D2",
    "search_text": "Q-PHY-WPE-B2-26 Q-PHY-WPE-B2-26 EX-M78 — APPLY (D2) A block of mass m, lying on a smooth horizontal surface, is attached to a spring (of negligible mass) of spring constant k. The other end of the spring is fixed, as shown in the figure. The block is initially at rest in its equilibrium position. If now the block is pulled with a constant force F, the maximum speed of the block is : [FIG-stem-1] JEE Main 2019 (Online) 9th January Morning Slot · EX-M78 · APPLY · D2 Physics Work Power Energy"
  },
  {
    "id": "Q-PHY-WPE-B2-27",
    "title": "Q-PHY-WPE-B2-27: EX-M79 — APPLY (D3) · APPLY (D3)",
    "subtitle": "Physics · Work, Power & Energy · B2 · JEE Main 2018 (Online) 16th April Morning Slot · EX-M79 · APPLY · D3",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/question/Q-PHY-WPE-B2-27",
    "breadcrumb": "Physics · Work, Power & Energy · D3",
    "search_text": "Q-PHY-WPE-B2-27 Q-PHY-WPE-B2-27 EX-M79 — APPLY (D3) A body of mass m starts moving from rest along x-axis so that its velocity varies as 𝜐=𝑎√(𝑠) where a is a constant and s is the distance covered by the body. The total work done by all the forces acting on the body in the first t seconds after the start of the motion is : JEE Main 2018 (Online) 16th April Morning Slot · EX-M79 · APPLY · D3 Physics Work Power Energy"
  },
  {
    "id": "Q-PHY-WPE-B2-28",
    "title": "Q-PHY-WPE-B2-28: EX-M82 — APPLY (D3) · APPLY (D3)",
    "subtitle": "Physics · Work, Power & Energy · B2 · JEE Main 2017 (Online) 8th April Morning Slot · EX-M82 · APPLY · D3",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/question/Q-PHY-WPE-B2-28",
    "breadcrumb": "Physics · Work, Power & Energy · D3",
    "search_text": "Q-PHY-WPE-B2-28 Q-PHY-WPE-B2-28 EX-M82 — APPLY (D3) An object is dropped from a height h from the ground. Every time it hits the ground it loses 50% of its kinetic energy. The total distance covered as t → ∞ is : JEE Main 2017 (Online) 8th April Morning Slot · EX-M82 · APPLY · D3 Physics Work Power Energy"
  },
  {
    "id": "Q-PHY-WPE-B2-30",
    "title": "Q-PHY-WPE-B2-30: EX-M85 — APPLY (D2) · APPLY (D2)",
    "subtitle": "Physics · Work, Power & Energy · B2 · JEE Main 2016 (Online) 10th April Morning Slot · EX-M85 · APPLY · D2",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/question/Q-PHY-WPE-B2-30",
    "breadcrumb": "Physics · Work, Power & Energy · D2",
    "search_text": "Q-PHY-WPE-B2-30 Q-PHY-WPE-B2-30 EX-M85 — APPLY (D2) Velocity-time graph for a body of mass 10 kg is shown in figure. Work-done on the body in first two seconds of the motion is : [FIG-stem-1] JEE Main 2016 (Online) 10th April Morning Slot · EX-M85 · APPLY · D2 Physics Work Power Energy"
  },
  {
    "id": "Q-PHY-WPE-B3-31",
    "title": "Q-PHY-WPE-B3-31: EX-M89 — SYNTHESIZE (D3) · SYNTHESIZE (D3)",
    "subtitle": "Physics · Work, Power & Energy · B3 · JEE Main 2015 (Online) 11th April Morning Slot · EX-M89 · SYNTHESIZE · D3",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/question/Q-PHY-WPE-B3-31",
    "breadcrumb": "Physics · Work, Power & Energy · D3",
    "search_text": "Q-PHY-WPE-B3-31 Q-PHY-WPE-B3-31 EX-M89 — SYNTHESIZE (D3) A particle is moving in a circle of radius r under the action of a force F = 𝛼 r2 which is directed towards center of the circle. Total mechanical energy (kinetic energy + potential energy) of the particle is (take potential energy = 0 for r = 0) : JEE Main 2015 (Online) 11th April Morning Slot · EX-M89 · SYNTHESIZE · D3 Physics Work Power Energy"
  },
  {
    "id": "Q-PHY-WPE-B3-32",
    "title": "Q-PHY-WPE-B3-32: EX-M90 — APPLY (D2) · APPLY (D2)",
    "subtitle": "Physics · Work, Power & Energy · B3 · JEE Main 2015 (Online) 10th April Morning Slot · EX-M90 · APPLY · D2",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/question/Q-PHY-WPE-B3-32",
    "breadcrumb": "Physics · Work, Power & Energy · D2",
    "search_text": "Q-PHY-WPE-B3-32 Q-PHY-WPE-B3-32 EX-M90 — APPLY (D2) A block of mass m = 0.1 kg is connected to a spring of unknown spring constant k. It is compressed to a distance x from its equilibrium position and released from rest. After approaching half the distance ((𝑥)/(2)) from equilibrium position, it hits another block and comes to rest momentarily, while the other block moves with a velocity 3 ms − 1 . The total initial energy of the spring is : JEE Main 2015 (Online) 10th April Morning Slot · EX-M90 · APPLY · D2 Physics Work Power Energy"
  },
  {
    "id": "Q-PHY-WPE-B3-33",
    "title": "Q-PHY-WPE-B3-33: EX-M92 — MODEL (D2) · MODEL (D2)",
    "subtitle": "Physics · Work, Power & Energy · B3 · JEE Main 2014 (Online) 12th April Morning Slot · EX-M92 · MODEL · D2",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/question/Q-PHY-WPE-B3-33",
    "breadcrumb": "Physics · Work, Power & Energy · D2",
    "search_text": "Q-PHY-WPE-B3-33 Q-PHY-WPE-B3-33 EX-M92 — MODEL (D2) A spring of unstretched length 𝑙 has a mass m with one end fixed to a rigid support. Assuming spring to be made of a uniform wire, the kinetic energy possessed by it if its free end is pulled with uniform velocity 𝑣 is : JEE Main 2014 (Online) 12th April Morning Slot · EX-M92 · MODEL · D2 Physics Work Power Energy"
  },
  {
    "id": "Q-PHY-WPE-B3-34",
    "title": "Q-PHY-WPE-B3-34: EX-M96 — RETRIEVE (D2) · RETRIEVE (D2)",
    "subtitle": "Physics · Work, Power & Energy · B3 · JEE Main 2013 (Online) 25th April Morning Slot · EX-M96 · RETRIEVE · D2",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/question/Q-PHY-WPE-B3-34",
    "breadcrumb": "Physics · Work, Power & Energy · D2",
    "search_text": "Q-PHY-WPE-B3-34 Q-PHY-WPE-B3-34 EX-M96 — RETRIEVE (D2) A wind-powered generator converts wind energy into electrical energy. Assume that the generator converts a fixed fraction of the wind energy intercepted by its blades into electrical energy. For wind speed 𝑣 , the electrical power output will be most likely proportional to JEE Main 2013 (Online) 25th April Morning Slot · EX-M96 · RETRIEVE · D2 Physics Work Power Energy"
  },
  {
    "id": "Q-PHY-WPE-B3-35",
    "title": "Q-PHY-WPE-B3-35: EX-M97 — SYNTHESIZE (D3) · SYNTHESIZE (D3)",
    "subtitle": "Physics · Work, Power & Energy · B3 · JEE Main 2013 (Online) 23th April Morning Slot · EX-M97 · SYNTHESIZE · D3",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/question/Q-PHY-WPE-B3-35",
    "breadcrumb": "Physics · Work, Power & Energy · D3",
    "search_text": "Q-PHY-WPE-B3-35 Q-PHY-WPE-B3-35 EX-M97 — SYNTHESIZE (D3) A 70 kg man leaps vertically into the air from a crouching position. To take the leap the man pushes the ground with a constant force F to raise himself. The center of gravity rises by 0.5 m before he leaps. After the leap the c.g. rises by another 1 m. The maximum power delivered by the muscles is : (Take g = 10 ms ^(−2) ) JEE Main 2013 (Online) 23th April Morning Slot · EX-M97 · SYNTHESIZE · D3 Physics Work Power Energy"
  },
  {
    "id": "Q-PHY-WPE-B3-36",
    "title": "Q-PHY-WPE-B3-36: EX-M98 — APPLY (D2) · APPLY (D2)",
    "subtitle": "Physics · Work, Power & Energy · B3 · JEE Main 2013 (Online) 9th April Morning Slot · EX-M98 · APPLY · D2",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/question/Q-PHY-WPE-B3-36",
    "breadcrumb": "Physics · Work, Power & Energy · D2",
    "search_text": "Q-PHY-WPE-B3-36 Q-PHY-WPE-B3-36 EX-M98 — APPLY (D2) Two springs of force constants 300 N/m (Spring A) and 400 N/m (Spring B) are joined together in series. The combination is compressed by 8.75 cm. The ratio of energy stored in A and B is (𝐸𝐴)/(𝐸𝐵) . Then (𝐸𝐴)/(𝐸𝐵) is equal to: JEE Main 2013 (Online) 9th April Morning Slot · EX-M98 · APPLY · D2 Physics Work Power Energy"
  },
  {
    "id": "Q-PHY-WPE-B3-37",
    "title": "Q-PHY-WPE-B3-37: EX-M101 — JUSTIFY (D1) · JUSTIFY (D1)",
    "subtitle": "Physics · Work, Power & Energy · B3 · AIEEE 2012 · EX-M101 · JUSTIFY · D1",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/question/Q-PHY-WPE-B3-37",
    "breadcrumb": "Physics · Work, Power & Energy · D1",
    "search_text": "Q-PHY-WPE-B3-37 Q-PHY-WPE-B3-37 EX-M101 — JUSTIFY (D1) This question has Statement 1 and Statement 2. Of the four choices given after the Statements, choose the one that best describes the two Statements. If two springs 𝑆_1 and 𝑆_2 of force constants 𝑘_1 and 𝑘_2 , respectively, are stretched by the same force, it is found that more work is done on spring 𝑆_1 than on spring 𝑆_2 . STATEMENT 1: If stretched by the same amount, work done on 𝑆_1 is more than that on 𝑆_2 STATEMENT 2: 𝑘_1<𝑘_2 AIEEE 2012 · EX-M101 · JUSTIFY · D1 Physics Work Power Energy"
  },
  {
    "id": "Q-PHY-WPE-B3-38",
    "title": "Q-PHY-WPE-B3-38: EX-M105 — APPLY (D2) · APPLY (D2)",
    "subtitle": "Physics · Work, Power & Energy · B3 · AIEEE 2007 · EX-M105 · APPLY · D2",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/question/Q-PHY-WPE-B3-38",
    "breadcrumb": "Physics · Work, Power & Energy · D2",
    "search_text": "Q-PHY-WPE-B3-38 Q-PHY-WPE-B3-38 EX-M105 — APPLY (D2) A 2 𝑘𝑔 block slides on a horizontal floor with a speed of 4𝑚/𝑠. It strikes an uncompressed spring and compresses it till the block is motionless. The kinetic friction force is 15𝑁 and spring constant is 10,000 𝑁/𝑚. The spring compresses by AIEEE 2007 · EX-M105 · APPLY · D2 Physics Work Power Energy"
  },
  {
    "id": "Q-PHY-WPE-B3-39",
    "title": "Q-PHY-WPE-B3-39: EX-M106 — MODEL (D2) · MODEL (D2)",
    "subtitle": "Physics · Work, Power & Energy · B3 · AIEEE 2006 · EX-M106 · MODEL · D2",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/question/Q-PHY-WPE-B3-39",
    "breadcrumb": "Physics · Work, Power & Energy · D2",
    "search_text": "Q-PHY-WPE-B3-39 Q-PHY-WPE-B3-39 EX-M106 — MODEL (D2) A mass of 𝑀 𝑘𝑔 is suspended by a weightless string. The horizontal force that is required to displace it until the string makes an angle of 45^(∘) with the initial vertical direction is AIEEE 2006 · EX-M106 · MODEL · D2 Physics Work Power Energy"
  },
  {
    "id": "Q-PHY-WPE-B3-40",
    "title": "Q-PHY-WPE-B3-40: EX-M109 — SYNTHESIZE (D3) · SYNTHESIZE (D3)",
    "subtitle": "Physics · Work, Power & Energy · B3 · AIEEE 2006 · EX-M109 · SYNTHESIZE · D3",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/question/Q-PHY-WPE-B3-40",
    "breadcrumb": "Physics · Work, Power & Energy · D3",
    "search_text": "Q-PHY-WPE-B3-40 Q-PHY-WPE-B3-40 EX-M109 — SYNTHESIZE (D3) The potential energy of a 1 𝑘𝑔 particle free to move along the 𝑥 -axis is given by 𝑉(𝑥)=((𝑥^(4))/(4)−(𝑥^(2))/(2))𝐽 . The total mechanical energy of the particle is 2𝐽. Then, the maximum speed (in 𝑚/𝑠 ) is AIEEE 2006 · EX-M109 · SYNTHESIZE · D3 Physics Work Power Energy"
  },
  {
    "id": "Q-PHY-WPE-B3-41",
    "title": "Q-PHY-WPE-B3-41: EX-M111 — APPLY (D2) · APPLY (D2)",
    "subtitle": "Physics · Work, Power & Energy · B3 · AIEEE 2005 · EX-M111 · APPLY · D2",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/question/Q-PHY-WPE-B3-41",
    "breadcrumb": "Physics · Work, Power & Energy · D2",
    "search_text": "Q-PHY-WPE-B3-41 Q-PHY-WPE-B3-41 EX-M111 — APPLY (D2) The upper half of an inclined plane with inclination 𝜙 is perfectly smooth while the lower half is rough. A body starting from rest at the top will again come to rest at the bottom if the coefficient of friction for the lower half is given by AIEEE 2005 · EX-M111 · APPLY · D2 Physics Work Power Energy"
  },
  {
    "id": "Q-PHY-WPE-B3-43",
    "title": "Q-PHY-WPE-B3-43: EX-N8 — APPLY (D2) · APPLY (D2)",
    "subtitle": "Physics · Work, Power & Energy · B3 · JEE Main 2023 (Online) 11th April Evening Shift · EX-N8 · APPLY · D2",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/question/Q-PHY-WPE-B3-43",
    "breadcrumb": "Physics · Work, Power & Energy · D2",
    "search_text": "Q-PHY-WPE-B3-43 Q-PHY-WPE-B3-43 EX-N8 — APPLY (D2) A block of mass 5kg starting from rest is pulled up on a smooth inclined plane making an angle of 30^(∘) with horizontal with an effective acceleration of 1ms^(−2) . The power delivered by the pulling force at 𝑡=10s from the start is ___________ W. [use g=10ms^(−2) ] (calculate the nearest integer value) JEE Main 2023 (Online) 11th April Evening Shift · EX-N8 · APPLY · D2 Physics Work Power Energy"
  },
  {
    "id": "Q-PHY-WPE-B3-44",
    "title": "Q-PHY-WPE-B3-44: EX-N11 — APPLY (D2) · APPLY (D2)",
    "subtitle": "Physics · Work, Power & Energy · B3 · JEE Main 2023 (Online) 10th April Morning Shift · EX-N11 · APPLY · D2",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/question/Q-PHY-WPE-B3-44",
    "breadcrumb": "Physics · Work, Power & Energy · D2",
    "search_text": "Q-PHY-WPE-B3-44 Q-PHY-WPE-B3-44 EX-N11 — APPLY (D2) A closed circular tube of average radius 15 cm, whose inner walls are rough, is kept in vertical plane. A block of mass 1 kg just fits inside the tube. The speed of block is 22 m/s, when it is introduced at the top of tube. After completing five oscillations, the block stops at the bottom region of tube. The work done by the tube on the block is __________ J. (Given g = 10 m/s ^(2) ). [FIG-stem-1] JEE Main 2023 (Online) 10th April Morning Shift · EX-N11 · APPLY · D2 Physics Work Power Energy"
  },
  {
    "id": "Q-PHY-WPE-B3-45",
    "title": "Q-PHY-WPE-B3-45: EX-N19 — APPLY (D2) · APPLY (D2)",
    "subtitle": "Physics · Work, Power & Energy · B3 · JEE Main 2023 (Online) 30th January Evening Shift · EX-N19 · APPLY · D2",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/question/Q-PHY-WPE-B3-45",
    "breadcrumb": "Physics · Work, Power & Energy · D2",
    "search_text": "Q-PHY-WPE-B3-45 Q-PHY-WPE-B3-45 EX-N19 — APPLY (D2) A body of mass 2kg is initially at rest. It starts moving unidirectionally under the influence of a source of constant power P. Its displacement in 4s is (1)/(3)𝛼^(2)√(𝑃)m . The value of 𝛼 will be ______. JEE Main 2023 (Online) 30th January Evening Shift · EX-N19 · APPLY · D2 Physics Work Power Energy"
  },
  {
    "id": "Q-PHY-WPE-B4-46",
    "title": "Q-PHY-WPE-B4-46: EX-N21 — MODEL (D2) · MODEL (D2)",
    "subtitle": "Physics · Work, Power & Energy · B4 · JEE Main 2023 (Online) 25th January Morning Shift · EX-N21 · MODEL · D2",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/question/Q-PHY-WPE-B4-46",
    "breadcrumb": "Physics · Work, Power & Energy · D2",
    "search_text": "Q-PHY-WPE-B4-46 Q-PHY-WPE-B4-46 EX-N21 — MODEL (D2) An object of mass 'm' initially at rest on a smooth horizontal plane starts moving under the action of force F = 2N. In the process of its linear motion, the angle 𝜃 (as shown in figure) between the direction of force and horizontal varies as 𝜃=k𝑥 , where k is a constant and 𝑥 is the distance covered by the object from its initial position. The expression of kinetic energy of the object will be 𝐸=(𝑛)/(𝑘)sin⁡𝜃 . The value of n is ___________. [FIG-stem-1] JEE Main 2023 (Online) 25th January Morning Shift · EX-N21 · MODEL · D2 Physics Work Power Energy"
  },
  {
    "id": "Q-PHY-WPE-B4-47",
    "title": "Q-PHY-WPE-B4-47: EX-N27 — APPLY (D2) · APPLY (D2)",
    "subtitle": "Physics · Work, Power & Energy · B4 · JEE Main 2021 (Online) 1st September Evening Shift · EX-N27 · APPLY · D2",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/question/Q-PHY-WPE-B4-47",
    "breadcrumb": "Physics · Work, Power & Energy · D2",
    "search_text": "Q-PHY-WPE-B4-47 Q-PHY-WPE-B4-47 EX-N27 — APPLY (D2) An engine is attached to a wagon through a shock absorber of length 1.5 m. The system with a total mass of 40,000 kg is moving with a speed of 72 kmh − 1 when the brakes are applied to bring it to rest. In the process of the system being brought to rest, the spring of the shock absorber gets compressed by 1.0 m. If 90% of energy of the wagon is lost due to friction, the spring constant is ____________ × 105 N/m. JEE Main 2021 (Online) 1st September Evening Shift · EX-N27 · APPLY · D2 Physics Work Power Energy"
  },
  {
    "id": "Q-PHY-WPE-B4-48",
    "title": "Q-PHY-WPE-B4-48: EX-N30 — MODEL (D2) · MODEL (D2)",
    "subtitle": "Physics · Work, Power & Energy · B4 · JEE Main 2021 (Online) 26th August Morning Shift · EX-N30 · MODEL · D2",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/question/Q-PHY-WPE-B4-48",
    "breadcrumb": "Physics · Work, Power & Energy · D2",
    "search_text": "Q-PHY-WPE-B4-48 Q-PHY-WPE-B4-48 EX-N30 — MODEL (D2) A uniform chain of length 3 meter and mass 3 kg overhangs a smooth table with 2 meter lying on the table. If k is the kinetic energy of the chain in joule as it completely slips off the table, then the value of k is ................. . (Take g = 10 m/s2) JEE Main 2021 (Online) 26th August Morning Shift · EX-N30 · MODEL · D2 Physics Work Power Energy"
  },
  {
    "id": "Q-PHY-WPE-B4-49",
    "title": "Q-PHY-WPE-B4-49: EX-N31 — SYNTHESIZE (D3) · SYNTHESIZE (D3)",
    "subtitle": "Physics · Work, Power & Energy · B4 · JEE Main 2021 (Online) 27th July Evening Shift · EX-N31 · SYNTHESIZE · D3",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/question/Q-PHY-WPE-B4-49",
    "breadcrumb": "Physics · Work, Power & Energy · D3",
    "search_text": "Q-PHY-WPE-B4-49 Q-PHY-WPE-B4-49 EX-N31 — SYNTHESIZE (D3) A small block slides down from the top of hemisphere of radius R = 3 m as shown in the figure. The height 'h' at which the block will lose contact with the surface of the sphere is __________ m.(Assume there is no friction between the block and the hemisphere) [FIG-stem-1] JEE Main 2021 (Online) 27th July Evening Shift · EX-N31 · SYNTHESIZE · D3 Physics Work Power Energy"
  },
  {
    "id": "Q-PHY-WPE-B4-50",
    "title": "Q-PHY-WPE-B4-50: EX-N34 — SYNTHESIZE (D3) · SYNTHESIZE (D3)",
    "subtitle": "Physics · Work, Power & Energy · B4 · JEE Main 2021 (Online) 20th July Morning Shift · EX-N34 · SYNTHESIZE · D3",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/question/Q-PHY-WPE-B4-50",
    "breadcrumb": "Physics · Work, Power & Energy · D3",
    "search_text": "Q-PHY-WPE-B4-50 Q-PHY-WPE-B4-50 EX-N34 — SYNTHESIZE (D3) In a spring gun having spring constant 100 N/m a small ball 'B' of mass 100 g is put in its barrel (as shown in figure) by compressing the spring through 0.05 m. There should be a box placed at a distance 'd' on the ground so that the ball falls in it. If the ball leaves the gun horizontally at a height of 2 m above the ground. The value of d is _________ m. (g = 10 m/s2). [FIG-stem-1] JEE Main 2021 (Online) 20th July Morning Shift · EX-N34 · SYNTHESIZE · D3 Physics Work Power Energy"
  },
  {
    "id": "Q-PHY-WPE-B4-51",
    "title": "Q-PHY-WPE-B4-51: EX-N38 — APPLY (D2) · APPLY (D2)",
    "subtitle": "Physics · Work, Power & Energy · B4 · JEE Main 2020 (Online) 5th September Evening Slot · EX-N38 · APPLY · D2",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/question/Q-PHY-WPE-B4-51",
    "breadcrumb": "Physics · Work, Power & Energy · D2",
    "search_text": "Q-PHY-WPE-B4-51 Q-PHY-WPE-B4-51 EX-N38 — APPLY (D2) A body of mass 2 kg is driven by an engine delivering a constant power of 1 J/s. The body starts from rest and moves in a straight line. After 9 seconds, the body has moved a distance (in m) _______. JEE Main 2020 (Online) 5th September Evening Slot · EX-N38 · APPLY · D2 Physics Work Power Energy"
  },
  {
    "id": "Q-PHY-WPE-B4-52",
    "title": "Q-PHY-WPE-B4-52: EX-N39 — SYNTHESIZE (D3) · SYNTHESIZE (D3)",
    "subtitle": "Physics · Work, Power & Energy · B4 · JEE Main 2020 (Online) 3rd September Evening Slot · EX-N39 · SYNTHESIZE · D3",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/question/Q-PHY-WPE-B4-52",
    "breadcrumb": "Physics · Work, Power & Energy · D3",
    "search_text": "Q-PHY-WPE-B4-52 Q-PHY-WPE-B4-52 EX-N39 — SYNTHESIZE (D3) A block starts moving up an inclined plane of inclination 30o with an initial velocity of v0 . It comes back to its initial position with velocity (𝑣_0)/(2) . The value of the coefficient of kinetic friction between the block and the inclined plane is close to (𝐼)/(1000) . The nearest integer to I is____. JEE Main 2020 (Online) 3rd September Evening Slot · EX-N39 · SYNTHESIZE · D3 Physics Work Power Energy"
  },
  {
    "id": "Q-PHY-WPE-B4-53",
    "title": "Q-PHY-WPE-B4-53: EX-N42 — APPLY (D2) · APPLY (D2)",
    "subtitle": "Physics · Work, Power & Energy · B4 · JEE Main 2020 (Online) 7th January Morning Slot · EX-N42 · APPLY · D2",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/question/Q-PHY-WPE-B4-53",
    "breadcrumb": "Physics · Work, Power & Energy · D2",
    "search_text": "Q-PHY-WPE-B4-53 Q-PHY-WPE-B4-53 EX-N42 — APPLY (D2) A particle (m = 1 kg) slides down a frictionless track (AOC) starting from rest at a point A (height 2 m). After reaching C, the particle continues to move freely in air as a projectile. When it reaches its highest point P (height 1 m), the kinetic energy of the particle (in J) is : (Figure drawn is schematic and not to scale; take g = 10 ms-2) [FIG-stem-1] JEE Main 2020 (Online) 7th January Morning Slot · EX-N42 · APPLY · D2 Physics Work Power Energy"
  },
  {
    "id": "Q-PHY-WPE-B4-54",
    "title": "Q-PHY-WPE-B4-54: AN-1 — JUSTIFY (D2) · JUSTIFY (D2)",
    "subtitle": "Physics · Work, Power & Energy · B4 · JEE Main 2023 (Online), 29 January, Evening Shift · AN-1 · JUSTIFY · D2",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/question/Q-PHY-WPE-B4-54",
    "breadcrumb": "Physics · Work, Power & Energy · D2",
    "search_text": "Q-PHY-WPE-B4-54 Q-PHY-WPE-B4-54 AN-1 — JUSTIFY (D2) Identify the correct statements from the following:\nA. Work done by a man in lifting a bucket out of a well by means of a rope tied to the bucket is negative.\nB. Work done by gravitational force in lifting a bucket out of a well by a rope tied to the bucket is negative.\nC. Work done by friction on a body sliding down an inclined plane is positive.\nD. Work done by an applied force on a body moving on a rough horizontal plane with uniform velocity is zero.\nE. Work done by the air resistance on an oscillating pendulum is negative. JEE Main 2023 (Online), 29 January, Evening Shift · AN-1 · JUSTIFY · D2 Physics Work Power Energy"
  },
  {
    "id": "Q-PHY-WPE-B4-55",
    "title": "Q-PHY-WPE-B4-55: AN-2 — JUSTIFY (D2) · JUSTIFY (D2)",
    "subtitle": "Physics · Work, Power & Energy · B4 · JEE Main 2026 (Online), 22 January, Evening Shift · AN-2 · JUSTIFY · D2",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/question/Q-PHY-WPE-B4-55",
    "breadcrumb": "Physics · Work, Power & Energy · D2",
    "search_text": "Q-PHY-WPE-B4-55 Q-PHY-WPE-B4-55 AN-2 — JUSTIFY (D2) Given below are two statements:\nStatement I: An object moves from position r₁ to position r₂ under a conservative force field F⃗. The work done by the force is W = −∫(r₁→r₂) F⃗·dr⃗.\nStatement II: Any object moving from one location to another location can follow infinite number of paths. Therefore, the amount of work done by the object changes with the path it follows for a conservative force. JEE Main 2026 (Online), 22 January, Evening Shift · AN-2 · JUSTIFY · D2 Physics Work Power Energy"
  },
  {
    "id": "Q-PHY-WPE-B4-56",
    "title": "Q-PHY-WPE-B4-56: AN-3 — JUSTIFY (D1) · JUSTIFY (D1)",
    "subtitle": "Physics · Work, Power & Energy · B4 · JEE Main 2025 (Online), 28 January, Morning Shift · AN-3 · JUSTIFY · D1",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/question/Q-PHY-WPE-B4-56",
    "breadcrumb": "Physics · Work, Power & Energy · D1",
    "search_text": "Q-PHY-WPE-B4-56 Q-PHY-WPE-B4-56 AN-3 — JUSTIFY (D1) Assertion A: In a central force field, the work done is independent of the path chosen.\nReason R: Every force encountered in mechanics does not have an associated potential energy. JEE Main 2025 (Online), 28 January, Morning Shift · AN-3 · JUSTIFY · D1 Physics Work Power Energy"
  },
  {
    "id": "Q-PHY-WPE-B4-57",
    "title": "Q-PHY-WPE-B4-57: AN-5 — EXPLAIN (D1) · EXPLAIN (D1)",
    "subtitle": "Physics · Work, Power & Energy · B4 · AIEEE 2004 · AN-5 · EXPLAIN · D1",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/question/Q-PHY-WPE-B4-57",
    "breadcrumb": "Physics · Work, Power & Energy · D1",
    "search_text": "Q-PHY-WPE-B4-57 Q-PHY-WPE-B4-57 AN-5 — EXPLAIN (D1) A particle is acted upon by a force of constant magnitude which is always perpendicular to the velocity of the particle, the motion of the particles takes place in a plane. It follows that AIEEE 2004 · AN-5 · EXPLAIN · D1 Physics Work Power Energy"
  },
  {
    "id": "Q-PHY-WPE-B4-58",
    "title": "Q-PHY-WPE-B4-58: AN-6 — RETRIEVE (D1) · RETRIEVE (D1)",
    "subtitle": "Physics · Work, Power & Energy · B4 · JEE Main 2025 (Online), 7 April, Evening Shift · AN-6 · RETRIEVE · D1",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/question/Q-PHY-WPE-B4-58",
    "breadcrumb": "Physics · Work, Power & Energy · D1",
    "search_text": "Q-PHY-WPE-B4-58 Q-PHY-WPE-B4-58 AN-6 — RETRIEVE (D1) Which one of the following forces cannot be expressed in terms of potential energy? JEE Main 2025 (Online), 7 April, Evening Shift · AN-6 · RETRIEVE · D1 Physics Work Power Energy"
  },
  {
    "id": "Q-PHY-WPE-B4-59",
    "title": "Q-PHY-WPE-B4-59: JEE-2026-04-04-S1-Q46 — APPLY (D2) · APPLY (D2)",
    "subtitle": "Physics · Work, Power & Energy · B4 · JEE Main 2026 Session 2 / 2026-04-04 / Shift 1 (Morning) · JEE-2026-04-04-S1-Q46 · APPLY · D2",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/question/Q-PHY-WPE-B4-59",
    "breadcrumb": "Physics · Work, Power & Energy · D2",
    "search_text": "Q-PHY-WPE-B4-59 Q-PHY-WPE-B4-59 JEE-2026-04-04-S1-Q46 — APPLY (D2) A 1 kg block subjected to two simultaneous forces (2i^ + 3j^ + 4k^) N and (3i^ - j^ - 2k^) N is moved a distance of 25 m along (3i^ - 4j^) direction. The work done in this process is _____ J. JEE Main 2026 Session 2 / 2026-04-04 / Shift 1 (Morning) · JEE-2026-04-04-S1-Q46 · APPLY · D2 Physics Work Power Energy"
  },
  {
    "id": "Q-PHY-WPE-B4-60",
    "title": "Q-PHY-WPE-B4-60: JEE-2026-04-06-S2-Q29 — APPLY (D2) · APPLY (D2)",
    "subtitle": "Physics · Work, Power & Energy · B4 · JEE Main 2026 Session 2 / 2026-04-06 / Shift 2 (Evening) · JEE-2026-04-06-S2-Q29 · APPLY · D2",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/question/Q-PHY-WPE-B4-60",
    "breadcrumb": "Physics · Work, Power & Energy · D2",
    "search_text": "Q-PHY-WPE-B4-60 Q-PHY-WPE-B4-60 JEE-2026-04-06-S2-Q29 — APPLY (D2) A body of mass 1 kg moves along a straight line with a velocity v = 2x^2. The work done by the body during displacement from x = 0 to 5 m is _____ J. JEE Main 2026 Session 2 / 2026-04-06 / Shift 2 (Evening) · JEE-2026-04-06-S2-Q29 · APPLY · D2 Physics Work Power Energy"
  },
  {
    "id": "Q-PHY-WPE-B5-61",
    "title": "Q-PHY-WPE-B5-61: JEE-2026-04-06-S1-Q28 — APPLY (D2) · APPLY (D2)",
    "subtitle": "Physics · Work, Power & Energy · B5 · JEE Main 2026 Session 2 / 2026-04-06 / Shift 1 (Morning) · JEE-2026-04-06-S1-Q28 · APPLY · D2",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/question/Q-PHY-WPE-B5-61",
    "breadcrumb": "Physics · Work, Power & Energy · D2",
    "search_text": "Q-PHY-WPE-B5-61 Q-PHY-WPE-B5-61 JEE-2026-04-06-S1-Q28 — APPLY (D2) The rain drop of mass 1 g, starts with zero velocity from a height of 1 km. It hits the ground with a speed of 5 m/s. The work done by the unknown resistive force is _____ J. (take g = 10 m/s^2) JEE Main 2026 Session 2 / 2026-04-06 / Shift 1 (Morning) · JEE-2026-04-06-S1-Q28 · APPLY · D2 Physics Work Power Energy"
  },
  {
    "id": "Q-PHY-WPE-B5-62",
    "title": "Q-PHY-WPE-B5-62: JEE-2026-04-02-S2-Q31 — APPLY (D2) · APPLY (D2)",
    "subtitle": "Physics · Work, Power & Energy · B5 · JEE Main 2026 Session 2 / 2026-04-02 / Shift 2 (Evening) · JEE-2026-04-02-S2-Q31 · APPLY · D2",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/question/Q-PHY-WPE-B5-62",
    "breadcrumb": "Physics · Work, Power & Energy · D2",
    "search_text": "Q-PHY-WPE-B5-62 Q-PHY-WPE-B5-62 JEE-2026-04-02-S2-Q31 — APPLY (D2) If a body of mass 1 kg falls on the earth from infinity, it attains velocity (v) and kinetic energy (k) on reaching the surface of earth. The values of v and k respectively are _____ . (Take radius of earth to be 6400 km and g = 9.8 m/s^2) JEE Main 2026 Session 2 / 2026-04-02 / Shift 2 (Evening) · JEE-2026-04-02-S2-Q31 · APPLY · D2 Physics Work Power Energy"
  },
  {
    "id": "Q-PHY-WPE-B5-63",
    "title": "Q-PHY-WPE-B5-63: JEE-2026-04-04-S1-Q49 — APPLY (D2) · APPLY (D2)",
    "subtitle": "Physics · Work, Power & Energy · B5 · JEE Main 2026 Session 2 / 2026-04-04 / Shift 1 (Morning) · JEE-2026-04-04-S1-Q49 · APPLY · D2",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/question/Q-PHY-WPE-B5-63",
    "breadcrumb": "Physics · Work, Power & Energy · D2",
    "search_text": "Q-PHY-WPE-B5-63 Q-PHY-WPE-B5-63 JEE-2026-04-04-S1-Q49 — APPLY (D2) A body of mass 2 kg begins to move under the influence of time dependent force F^ = (2t i^ + 6t^2 j^) N, where i^ and j^ are unit vectors along x and y-axis respectively. The power produced by the force at t = 2 s is _____ W. JEE Main 2026 Session 2 / 2026-04-04 / Shift 1 (Morning) · JEE-2026-04-04-S1-Q49 · APPLY · D2 Physics Work Power Energy"
  },
  {
    "id": "Q-PHY-WPE-B5-64",
    "title": "Q-PHY-WPE-B5-64: WEP07-02 — SYNTHESIZE (D3) · SYNTHESIZE (D3)",
    "subtitle": "Physics · Work, Power & Energy · B5 · NSEP 2024 code 61 Q32 · WEP07-02 · SYNTHESIZE · D3",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/question/Q-PHY-WPE-B5-64",
    "breadcrumb": "Physics · Work, Power & Energy · D3",
    "search_text": "Q-PHY-WPE-B5-64 Q-PHY-WPE-B5-64 WEP07-02 — SYNTHESIZE (D3) A uniform flexible chain of length L and linear mass density lambda is held stationary on a smooth horizontal tabletop with an initial length y_0 hanging vertically over the edge. It is released from rest. Find the speed of the chain at the instant the entire chain becomes completely vertical (just leaving the edge). NSEP 2024 code 61 Q32 · WEP07-02 · SYNTHESIZE · D3 Physics Work Power Energy"
  },
  {
    "id": "Q-PHY-WPE-B5-65",
    "title": "Q-PHY-WPE-B5-65: WEP07-03 — APPLY (D2) · APPLY (D2)",
    "subtitle": "Physics · Work, Power & Energy · B5 · NSEP 2025 Q57 · R3 proposed APPLY/D2 · independently unreviewed",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/question/Q-PHY-WPE-B5-65",
    "breadcrumb": "Physics · Work, Power & Energy · D2",
    "search_text": "Q-PHY-WPE-B5-65 Q-PHY-WPE-B5-65 WEP07-03 — APPLY (D2) A particle of mass m moves along the x-axis with potential energy U(x) = alpha/x^2 - beta/x, where alpha, beta > 0. The particle is released from rest at x_0 = alpha/beta. Which of the following statements is/are correct? NSEP 2025 Q57 · R3 proposed APPLY/D2 · independently unreviewed Physics Work Power Energy"
  },
  {
    "id": "Q-PHY-WPE-B5-66",
    "title": "Q-PHY-WPE-B5-66: EX-N41 — MODEL (D2) · MODEL (D2)",
    "subtitle": "Physics · Work, Power & Energy · B5 · JEE Main 2024 / Practice Archive · EX-N41 · MODEL · D2",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/question/Q-PHY-WPE-B5-66",
    "breadcrumb": "Physics · Work, Power & Energy · D2",
    "search_text": "Q-PHY-WPE-B5-66 Q-PHY-WPE-B5-66 EX-N41 — MODEL (D2) A small block starts slipping down from a point B on an inclined plane AB of inclination angle theta. Section BC is smooth and remaining section CA is rough with coefficient of friction mu. It is found that the block comes to rest as it reaches the bottom (point A) of the inclined plane. If BC = 2*AC, the coefficient of friction is given by mu = k*tan(theta). The value of k is _____. JEE Main 2024 / Practice Archive · EX-N41 · MODEL · D2 Physics Work Power Energy"
  },
  {
    "id": "Q-PHY-WPE-B5-67",
    "title": "Q-PHY-WPE-B5-67: AN-4 — JUSTIFY (D2) · JUSTIFY (D2)",
    "subtitle": "Physics · Work, Power & Energy · B5 · JEE Main Analysis Archive / Conceptual Pairs · AN-4 · JUSTIFY · D2",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/question/Q-PHY-WPE-B5-67",
    "breadcrumb": "Physics · Work, Power & Energy · D2",
    "search_text": "Q-PHY-WPE-B5-67 Q-PHY-WPE-B5-67 AN-4 — JUSTIFY (D2) Statement I: A truck and a car moving with same kinetic energy are brought to rest by applying brakes which provide equal retarding forces. Both come to rest in equal distance.\nStatement II: A car moving towards east takes a turn and moves towards north, the speed remains unchanged. The acceleration of the car is zero.\nIn the light of the above statements, choose the correct answer from the options given below: JEE Main Analysis Archive / Conceptual Pairs · AN-4 · JUSTIFY · D2 Physics Work Power Energy"
  },
  {
    "id": "Q-PHY-WPE-B5-68",
    "title": "Q-PHY-WPE-B5-68: JEE-2026-04-05-S2-Q28 — MODEL (D2) · MODEL (D2)",
    "subtitle": "Physics · Work, Power & Energy · B5 · JEE Main 2026 Session 2 / 2026-04-05 / Shift 2 (Evening) · JEE-2026-04-05-S2-Q28 · MODEL · D2",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/question/Q-PHY-WPE-B5-68",
    "breadcrumb": "Physics · Work, Power & Energy · D2",
    "search_text": "Q-PHY-WPE-B5-68 Q-PHY-WPE-B5-68 JEE-2026-04-05-S2-Q28 — MODEL (D2) A mass of 1 kg is kept on a inclined plane with 30° inclination with respect to horizontal plane and it is at rest initially. Then the whole assembly is moved up with constant velocity of 4 m/s. The work done by the frictional force in time 2 s is _____ J. (Take g = 10 m/s^2) JEE Main 2026 Session 2 / 2026-04-05 / Shift 2 (Evening) · JEE-2026-04-05-S2-Q28 · MODEL · D2 Physics Work Power Energy"
  },
  {
    "id": "Q-PHY-WPE-B5-69",
    "title": "Q-PHY-WPE-B5-69: EX-M39 — SYNTHESIZE (D3) · SYNTHESIZE (D3)",
    "subtitle": "Physics · Work, Power & Energy · B5 · JEE Main 2024 (Online) 27th January Evening Shift (Shift 2) · EX-M39 · SYNTHESIZE · D3",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/question/Q-PHY-WPE-B5-69",
    "breadcrumb": "Physics · Work, Power & Energy · D3",
    "search_text": "Q-PHY-WPE-B5-69 Q-PHY-WPE-B5-69 EX-M39 — SYNTHESIZE (D3) A ball suspended by a thread swings in a vertical plane so that its magnitude of acceleration in the extreme position and lowest position are equal. The angle (theta) of thread deflection in the extreme position will be : JEE Main 2024 (Online) 27th January Evening Shift (Shift 2) · EX-M39 · SYNTHESIZE · D3 Physics Work Power Energy"
  },
  {
    "id": "Q-PHY-WPE-B5-70",
    "title": "Q-PHY-WPE-B5-70: WEP07-01 — MODEL (D3) · MODEL (D3)",
    "subtitle": "Physics · Work, Power & Energy · B5 · NSEP 2024 code 61 Q4 · WEP07-01 · MODEL · D3",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/question/Q-PHY-WPE-B5-70",
    "breadcrumb": "Physics · Work, Power & Energy · D3",
    "search_text": "Q-PHY-WPE-B5-70 Q-PHY-WPE-B5-70 WEP07-01 — MODEL (D3) A block attached to a spring of spring constant k is initially held in equilibrium compressed by a distance xi by a constant external force F (so F = k*xi). The force is suddenly reversed in direction and doubled in magnitude to 2F. Find the maximum extension of the spring beyond its natural length. NSEP 2024 code 61 Q4 · WEP07-01 · MODEL · D3 Physics Work Power Energy"
  },
  {
    "id": "TB-WPE-ILL-01",
    "title": "TB-WPE-ILL-01: TB-WPE-ILL-01 — UNREVIEWED (D2) · UNREVIEWED (D2)",
    "subtitle": "Physics · Work, Power & Energy · TEXTBOOK · Textbook extract · Illustration 01",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/question/TB-WPE-ILL-01",
    "breadcrumb": "Physics · Work, Power & Energy · D2",
    "search_text": "TB-WPE-ILL-01 TB-WPE-ILL-01 TB-WPE-ILL-01 — UNREVIEWED (D2) Assume that a body is displaced from $\\vec{r}_A = (2\\text{m}, 4\\text{m}, -6\\text{m})$ to $\\vec{r}_B = (6\\hat{i} - 4\\hat{j} + 2\\hat{k})\\text{ m}$ under a constant force $\\vec{F} = (2\\hat{i} + 3\\hat{j} - \\hat{k})\\text{ N}$. Calculate the total work done. Textbook extract · Illustration 01 Physics Work Power Energy"
  },
  {
    "id": "TB-WPE-ILL-02",
    "title": "TB-WPE-ILL-02: TB-WPE-ILL-02 — UNREVIEWED (D3) · UNREVIEWED (D3)",
    "subtitle": "Physics · Work, Power & Energy · TEXTBOOK · Textbook extract · Illustration 02",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/question/TB-WPE-ILL-02",
    "breadcrumb": "Physics · Work, Power & Energy · D3",
    "search_text": "TB-WPE-ILL-02 TB-WPE-ILL-02 TB-WPE-ILL-02 — UNREVIEWED (D3) A block of total mass $5\\text{ kg}$ is being raised vertically upwards with the help of a string attached to it and it rises with an acceleration of $2\\text{ m/s}^2$. Find the work done due to the tension in the string if the block rises by $2.5\\text{ m}$. Also, calculate the work done due to gravity and the net work done. ($g = 9.8\\text{ m/s}^2$). Textbook extract · Illustration 02 Physics Work Power Energy"
  },
  {
    "id": "TB-WPE-ILL-03",
    "title": "TB-WPE-ILL-03: TB-WPE-ILL-03 — UNREVIEWED (D2) · UNREVIEWED (D2)",
    "subtitle": "Physics · Work, Power & Energy · TEXTBOOK · Textbook extract · Illustration 03",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/question/TB-WPE-ILL-03",
    "breadcrumb": "Physics · Work, Power & Energy · D2",
    "search_text": "TB-WPE-ILL-03 TB-WPE-ILL-03 TB-WPE-ILL-03 — UNREVIEWED (D2) A force $F = (10 + 0.50x)\\text{ N}$ is observed to act on a particle in the $x$ direction, where $x$ is in meters. Find the actual work done by this force during a displacement from $x = 0$ to $x = 2.0\\text{ m}$. Textbook extract · Illustration 03 Physics Work Power Energy"
  },
  {
    "id": "TB-WPE-ILL-04",
    "title": "TB-WPE-ILL-04: TB-WPE-ILL-04 — UNREVIEWED (D2) · UNREVIEWED (D2)",
    "subtitle": "Physics · Work, Power & Energy · TEXTBOOK · Textbook extract · Illustration 04",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/question/TB-WPE-ILL-04",
    "breadcrumb": "Physics · Work, Power & Energy · D2",
    "search_text": "TB-WPE-ILL-04 TB-WPE-ILL-04 TB-WPE-ILL-04 — UNREVIEWED (D2) A block of mass $4\\text{ kg}$ slides down a plane inclined at $37^\\circ$ with the horizontal. The length of the plane is $3\\text{ m}$. The coefficient of sliding friction between the block and the plane is $\\mu = 0.2$. Find:\n1. The work done due to gravity,\n2. The work done by the frictional force,\n3. The work done by the normal reaction between the block and the plane.  \n($g = 9.8\\text{ m/s}^2, \\sin 37^\\circ = 0.6, \\cos 37^\\circ = 0.8$). Textbook extract · Illustration 04 Physics Work Power Energy"
  },
  {
    "id": "TB-WPE-ILL-05",
    "title": "TB-WPE-ILL-05: TB-WPE-ILL-05 — UNREVIEWED (D3) · UNREVIEWED (D3)",
    "subtitle": "Physics · Work, Power & Energy · TEXTBOOK · Textbook extract · Illustration 05",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/question/TB-WPE-ILL-05",
    "breadcrumb": "Physics · Work, Power & Energy · D3",
    "search_text": "TB-WPE-ILL-05 TB-WPE-ILL-05 TB-WPE-ILL-05 — UNREVIEWED (D3) A block of mass $m$ slides down a fixed smooth inclined plane of inclination angle $\\theta$ and length $l$. Calculate the magnitude of instantaneous power developed by the gravitational force when the block reaches the bottom. Textbook extract · Illustration 05 Physics Work Power Energy"
  },
  {
    "id": "TB-WPE-ILL-06",
    "title": "TB-WPE-ILL-06: TB-WPE-ILL-06 — UNREVIEWED (D3) · UNREVIEWED (D3)",
    "subtitle": "Physics · Work, Power & Energy · TEXTBOOK · Textbook extract · Illustration 06",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/question/TB-WPE-ILL-06",
    "breadcrumb": "Physics · Work, Power & Energy · D3",
    "search_text": "TB-WPE-ILL-06 TB-WPE-ILL-06 TB-WPE-ILL-06 — UNREVIEWED (D3) A particle of mass $m$ is moving in a circular path of constant radius $r$ such that its centripetal acceleration $a_c$ varies with time $t$ as $a_c = k^2 r t^2$, where $k$ is a constant. The power delivered to the particle by the net force acting on it is: Textbook extract · Illustration 06 Physics Work Power Energy"
  },
  {
    "id": "TB-WPE-ILL-11",
    "title": "TB-WPE-ILL-11: TB-WPE-ILL-11 — UNREVIEWED (D4) · UNREVIEWED (D4)",
    "subtitle": "Physics · Work, Power & Energy · TEXTBOOK · Textbook extract · Illustration 11",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/question/TB-WPE-ILL-11",
    "breadcrumb": "Physics · Work, Power & Energy · D4",
    "search_text": "TB-WPE-ILL-11 TB-WPE-ILL-11 TB-WPE-ILL-11 — UNREVIEWED (D4) A uniform flexible chain of length $l$ and mass $m$ overhangs a smooth horizontal table with two-thirds ($2l/3$) of its length lying on the table. Find the kinetic energy of the chain as it completely slips off the table. Textbook extract · Illustration 11 Physics Work Power Energy"
  },
  {
    "id": "TB-WPE-ILL-12",
    "title": "TB-WPE-ILL-12: TB-WPE-ILL-12 — UNREVIEWED (D4) · UNREVIEWED (D4)",
    "subtitle": "Physics · Work, Power & Energy · TEXTBOOK · Textbook extract · Illustration 12",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/question/TB-WPE-ILL-12",
    "breadcrumb": "Physics · Work, Power & Energy · D4",
    "search_text": "TB-WPE-ILL-12 TB-WPE-ILL-12 TB-WPE-ILL-12 — UNREVIEWED (D4) A block of mass $m$ is pushed against a light spring of spring constant $k$ fixed at one end to a rigid vertical wall. The block slides on a frictionless horizontal table. The natural length of the spring is $L_0$. The spring is compressed to half its natural length ($x_{\\text{init}} = L_0/2$) and the block is released from rest. Find the velocity of the block as a function of its distance $x$ from the wall. Textbook extract · Illustration 12 Physics Work Power Energy"
  },
  {
    "id": "SYN-WPE-DIRECTION-CONTROL-01",
    "title": "SYN-WPE-DIRECTION-CONTROL-01: SYN-WPE-DIRECTION-CONTROL-01 — AUTHOR_DEMO (D2) · AUTHOR_DEMO (D2)",
    "subtitle": "Physics · Work, Power & Energy · CONTROL · Synthetic engineering control (not Core2 source evidence)",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/question/SYN-WPE-DIRECTION-CONTROL-01",
    "breadcrumb": "Physics · Work, Power & Energy · D2",
    "search_text": "SYN-WPE-DIRECTION-CONTROL-01 SYN-WPE-DIRECTION-CONTROL-01 SYN-WPE-DIRECTION-CONTROL-01 — AUTHOR_DEMO (D2) An idealised trolley moves horizontally while a constant force acts vertically. What is the work done by this force on the trolley during the horizontal displacement? Synthetic engineering control (not Core2 source evidence) Physics Work Power Energy"
  },
  {
    "id": "circ-01",
    "title": "IMO G09-01: Circles Foundational [D1]",
    "subtitle": "Mathematics · Euclidean Geometry · Circles Master · D1",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/labs/lab:circles-master",
    "breadcrumb": "Mathematics · Circles Master · D1",
    "search_text": "circ-01 IMO G09-01 Circles Foundational D1 tangent chord secant angle diameter circle invariant geometry"
  },
  {
    "id": "circ-02",
    "title": "IMO G09-02: Circles Foundational [D1]",
    "subtitle": "Mathematics · Euclidean Geometry · Circles Master · D1",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/labs/lab:circles-master",
    "breadcrumb": "Mathematics · Circles Master · D1",
    "search_text": "circ-02 IMO G09-02 Circles Foundational D1 tangent chord secant angle diameter circle invariant geometry"
  },
  {
    "id": "circ-03",
    "title": "IMO G09-03: Circles Foundational [D1]",
    "subtitle": "Mathematics · Euclidean Geometry · Circles Master · D1",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/labs/lab:circles-master",
    "breadcrumb": "Mathematics · Circles Master · D1",
    "search_text": "circ-03 IMO G09-03 Circles Foundational D1 tangent chord secant angle diameter circle invariant geometry"
  },
  {
    "id": "circ-04",
    "title": "IMO G09-04: Circles Foundational [D1]",
    "subtitle": "Mathematics · Euclidean Geometry · Circles Master · D1",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/labs/lab:circles-master",
    "breadcrumb": "Mathematics · Circles Master · D1",
    "search_text": "circ-04 IMO G09-04 Circles Foundational D1 tangent chord secant angle diameter circle invariant geometry"
  },
  {
    "id": "circ-05",
    "title": "IMO G09-05: Circles Foundational [D1]",
    "subtitle": "Mathematics · Euclidean Geometry · Circles Master · D1",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/labs/lab:circles-master",
    "breadcrumb": "Mathematics · Circles Master · D1",
    "search_text": "circ-05 IMO G09-05 Circles Foundational D1 tangent chord secant angle diameter circle invariant geometry"
  },
  {
    "id": "circ-06",
    "title": "IMO G09-06: Circles Foundational [D1]",
    "subtitle": "Mathematics · Euclidean Geometry · Circles Master · D1",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/labs/lab:circles-master",
    "breadcrumb": "Mathematics · Circles Master · D1",
    "search_text": "circ-06 IMO G09-06 Circles Foundational D1 tangent chord secant angle diameter circle invariant geometry"
  },
  {
    "id": "circ-07",
    "title": "IMO G09-07: Circles Foundational [D1]",
    "subtitle": "Mathematics · Euclidean Geometry · Circles Master · D1",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/labs/lab:circles-master",
    "breadcrumb": "Mathematics · Circles Master · D1",
    "search_text": "circ-07 IMO G09-07 Circles Foundational D1 tangent chord secant angle diameter circle invariant geometry"
  },
  {
    "id": "circ-08",
    "title": "IMO G09-08: Circles Foundational [D1]",
    "subtitle": "Mathematics · Euclidean Geometry · Circles Master · D1",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/labs/lab:circles-master",
    "breadcrumb": "Mathematics · Circles Master · D1",
    "search_text": "circ-08 IMO G09-08 Circles Foundational D1 tangent chord secant angle diameter circle invariant geometry"
  },
  {
    "id": "circ-09",
    "title": "IMO G09-09: Circles Foundational [D1]",
    "subtitle": "Mathematics · Euclidean Geometry · Circles Master · D1",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/labs/lab:circles-master",
    "breadcrumb": "Mathematics · Circles Master · D1",
    "search_text": "circ-09 IMO G09-09 Circles Foundational D1 tangent chord secant angle diameter circle invariant geometry"
  },
  {
    "id": "circ-10",
    "title": "IMO G09-10: Circles Foundational [D1]",
    "subtitle": "Mathematics · Euclidean Geometry · Circles Master · D1",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/labs/lab:circles-master",
    "breadcrumb": "Mathematics · Circles Master · D1",
    "search_text": "circ-10 IMO G09-10 Circles Foundational D1 tangent chord secant angle diameter circle invariant geometry"
  },
  {
    "id": "circ-11",
    "title": "IMO G09-11: Circles Application [D2]",
    "subtitle": "Mathematics · Euclidean Geometry · Circles Master · D2",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/labs/lab:circles-master",
    "breadcrumb": "Mathematics · Circles Master · D2",
    "search_text": "circ-11 IMO G09-11 Circles Application D2 tangent chord secant angle diameter circle invariant geometry"
  },
  {
    "id": "circ-12",
    "title": "IMO G09-12: Circles Application [D2]",
    "subtitle": "Mathematics · Euclidean Geometry · Circles Master · D2",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/labs/lab:circles-master",
    "breadcrumb": "Mathematics · Circles Master · D2",
    "search_text": "circ-12 IMO G09-12 Circles Application D2 tangent chord secant angle diameter circle invariant geometry"
  },
  {
    "id": "circ-13",
    "title": "IMO G09-13: Circles Application [D2]",
    "subtitle": "Mathematics · Euclidean Geometry · Circles Master · D2",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/labs/lab:circles-master",
    "breadcrumb": "Mathematics · Circles Master · D2",
    "search_text": "circ-13 IMO G09-13 Circles Application D2 tangent chord secant angle diameter circle invariant geometry"
  },
  {
    "id": "circ-14",
    "title": "IMO G09-14: Circles Application [D2]",
    "subtitle": "Mathematics · Euclidean Geometry · Circles Master · D2",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/labs/lab:circles-master",
    "breadcrumb": "Mathematics · Circles Master · D2",
    "search_text": "circ-14 IMO G09-14 Circles Application D2 tangent chord secant angle diameter circle invariant geometry"
  },
  {
    "id": "circ-15",
    "title": "IMO G09-15: Circles Application [D2]",
    "subtitle": "Mathematics · Euclidean Geometry · Circles Master · D2",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/labs/lab:circles-master",
    "breadcrumb": "Mathematics · Circles Master · D2",
    "search_text": "circ-15 IMO G09-15 Circles Application D2 tangent chord secant angle diameter circle invariant geometry"
  },
  {
    "id": "circ-16",
    "title": "IMO G09-16: Circles Application [D2]",
    "subtitle": "Mathematics · Euclidean Geometry · Circles Master · D2",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/labs/lab:circles-master",
    "breadcrumb": "Mathematics · Circles Master · D2",
    "search_text": "circ-16 IMO G09-16 Circles Application D2 tangent chord secant angle diameter circle invariant geometry"
  },
  {
    "id": "circ-17",
    "title": "IMO G09-17: Circles Application [D2]",
    "subtitle": "Mathematics · Euclidean Geometry · Circles Master · D2",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/labs/lab:circles-master",
    "breadcrumb": "Mathematics · Circles Master · D2",
    "search_text": "circ-17 IMO G09-17 Circles Application D2 tangent chord secant angle diameter circle invariant geometry"
  },
  {
    "id": "circ-18",
    "title": "IMO G09-18: Circles Application [D2]",
    "subtitle": "Mathematics · Euclidean Geometry · Circles Master · D2",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/labs/lab:circles-master",
    "breadcrumb": "Mathematics · Circles Master · D2",
    "search_text": "circ-18 IMO G09-18 Circles Application D2 tangent chord secant angle diameter circle invariant geometry"
  },
  {
    "id": "circ-19",
    "title": "IMO G09-19: Circles Application [D2]",
    "subtitle": "Mathematics · Euclidean Geometry · Circles Master · D2",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/labs/lab:circles-master",
    "breadcrumb": "Mathematics · Circles Master · D2",
    "search_text": "circ-19 IMO G09-19 Circles Application D2 tangent chord secant angle diameter circle invariant geometry"
  },
  {
    "id": "circ-20",
    "title": "IMO G09-20: Circles Application [D2]",
    "subtitle": "Mathematics · Euclidean Geometry · Circles Master · D2",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/labs/lab:circles-master",
    "breadcrumb": "Mathematics · Circles Master · D2",
    "search_text": "circ-20 IMO G09-20 Circles Application D2 tangent chord secant angle diameter circle invariant geometry"
  },
  {
    "id": "circ-21",
    "title": "IMO G09-21: Circles Application [D2]",
    "subtitle": "Mathematics · Euclidean Geometry · Circles Master · D2",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/labs/lab:circles-master",
    "breadcrumb": "Mathematics · Circles Master · D2",
    "search_text": "circ-21 IMO G09-21 Circles Application D2 tangent chord secant angle diameter circle invariant geometry"
  },
  {
    "id": "circ-22",
    "title": "IMO G09-22: Circles Application [D2]",
    "subtitle": "Mathematics · Euclidean Geometry · Circles Master · D2",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/labs/lab:circles-master",
    "breadcrumb": "Mathematics · Circles Master · D2",
    "search_text": "circ-22 IMO G09-22 Circles Application D2 tangent chord secant angle diameter circle invariant geometry"
  },
  {
    "id": "circ-23",
    "title": "IMO G09-23: Circles Application [D2]",
    "subtitle": "Mathematics · Euclidean Geometry · Circles Master · D2",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/labs/lab:circles-master",
    "breadcrumb": "Mathematics · Circles Master · D2",
    "search_text": "circ-23 IMO G09-23 Circles Application D2 tangent chord secant angle diameter circle invariant geometry"
  },
  {
    "id": "circ-24",
    "title": "IMO G09-24: Circles Application [D2]",
    "subtitle": "Mathematics · Euclidean Geometry · Circles Master · D2",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/labs/lab:circles-master",
    "breadcrumb": "Mathematics · Circles Master · D2",
    "search_text": "circ-24 IMO G09-24 Circles Application D2 tangent chord secant angle diameter circle invariant geometry"
  },
  {
    "id": "circ-25",
    "title": "IMO G09-25: Circles Application [D2]",
    "subtitle": "Mathematics · Euclidean Geometry · Circles Master · D2",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/labs/lab:circles-master",
    "breadcrumb": "Mathematics · Circles Master · D2",
    "search_text": "circ-25 IMO G09-25 Circles Application D2 tangent chord secant angle diameter circle invariant geometry"
  },
  {
    "id": "circ-26",
    "title": "IMO G09-26: Circles Analysis [D3]",
    "subtitle": "Mathematics · Euclidean Geometry · Circles Master · D3",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/labs/lab:circles-master",
    "breadcrumb": "Mathematics · Circles Master · D3",
    "search_text": "circ-26 IMO G09-26 Circles Analysis D3 tangent chord secant angle diameter circle invariant geometry"
  },
  {
    "id": "circ-27",
    "title": "IMO G09-27: Circles Analysis [D3]",
    "subtitle": "Mathematics · Euclidean Geometry · Circles Master · D3",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/labs/lab:circles-master",
    "breadcrumb": "Mathematics · Circles Master · D3",
    "search_text": "circ-27 IMO G09-27 Circles Analysis D3 tangent chord secant angle diameter circle invariant geometry"
  },
  {
    "id": "circ-28",
    "title": "IMO G09-28: Circles Analysis [D3]",
    "subtitle": "Mathematics · Euclidean Geometry · Circles Master · D3",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/labs/lab:circles-master",
    "breadcrumb": "Mathematics · Circles Master · D3",
    "search_text": "circ-28 IMO G09-28 Circles Analysis D3 tangent chord secant angle diameter circle invariant geometry"
  },
  {
    "id": "circ-29",
    "title": "IMO G09-29: Circles Analysis [D3]",
    "subtitle": "Mathematics · Euclidean Geometry · Circles Master · D3",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/labs/lab:circles-master",
    "breadcrumb": "Mathematics · Circles Master · D3",
    "search_text": "circ-29 IMO G09-29 Circles Analysis D3 tangent chord secant angle diameter circle invariant geometry"
  },
  {
    "id": "circ-30",
    "title": "IMO G09-30: Circles Analysis [D3]",
    "subtitle": "Mathematics · Euclidean Geometry · Circles Master · D3",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/labs/lab:circles-master",
    "breadcrumb": "Mathematics · Circles Master · D3",
    "search_text": "circ-30 IMO G09-30 Circles Analysis D3 tangent chord secant angle diameter circle invariant geometry"
  },
  {
    "id": "circ-31",
    "title": "IMO G09-31: Circles Analysis [D3]",
    "subtitle": "Mathematics · Euclidean Geometry · Circles Master · D3",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/labs/lab:circles-master",
    "breadcrumb": "Mathematics · Circles Master · D3",
    "search_text": "circ-31 IMO G09-31 Circles Analysis D3 tangent chord secant angle diameter circle invariant geometry"
  },
  {
    "id": "circ-32",
    "title": "IMO G09-32: Circles Analysis [D3]",
    "subtitle": "Mathematics · Euclidean Geometry · Circles Master · D3",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/labs/lab:circles-master",
    "breadcrumb": "Mathematics · Circles Master · D3",
    "search_text": "circ-32 IMO G09-32 Circles Analysis D3 tangent chord secant angle diameter circle invariant geometry"
  },
  {
    "id": "circ-33",
    "title": "IMO G09-33: Circles Analysis [D3]",
    "subtitle": "Mathematics · Euclidean Geometry · Circles Master · D3",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/labs/lab:circles-master",
    "breadcrumb": "Mathematics · Circles Master · D3",
    "search_text": "circ-33 IMO G09-33 Circles Analysis D3 tangent chord secant angle diameter circle invariant geometry"
  },
  {
    "id": "circ-34",
    "title": "IMO G09-34: Circles Analysis [D3]",
    "subtitle": "Mathematics · Euclidean Geometry · Circles Master · D3",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/labs/lab:circles-master",
    "breadcrumb": "Mathematics · Circles Master · D3",
    "search_text": "circ-34 IMO G09-34 Circles Analysis D3 tangent chord secant angle diameter circle invariant geometry"
  },
  {
    "id": "circ-35",
    "title": "IMO G09-35: Circles Analysis [D3]",
    "subtitle": "Mathematics · Euclidean Geometry · Circles Master · D3",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/labs/lab:circles-master",
    "breadcrumb": "Mathematics · Circles Master · D3",
    "search_text": "circ-35 IMO G09-35 Circles Analysis D3 tangent chord secant angle diameter circle invariant geometry"
  },
  {
    "id": "circ-36",
    "title": "IMO G09-36: Circles Analysis [D3]",
    "subtitle": "Mathematics · Euclidean Geometry · Circles Master · D3",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/labs/lab:circles-master",
    "breadcrumb": "Mathematics · Circles Master · D3",
    "search_text": "circ-36 IMO G09-36 Circles Analysis D3 tangent chord secant angle diameter circle invariant geometry"
  },
  {
    "id": "circ-37",
    "title": "IMO G09-37: Circles Analysis [D3]",
    "subtitle": "Mathematics · Euclidean Geometry · Circles Master · D3",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/labs/lab:circles-master",
    "breadcrumb": "Mathematics · Circles Master · D3",
    "search_text": "circ-37 IMO G09-37 Circles Analysis D3 tangent chord secant angle diameter circle invariant geometry"
  },
  {
    "id": "circ-38",
    "title": "IMO G09-38: Circles Analysis [D3]",
    "subtitle": "Mathematics · Euclidean Geometry · Circles Master · D3",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/labs/lab:circles-master",
    "breadcrumb": "Mathematics · Circles Master · D3",
    "search_text": "circ-38 IMO G09-38 Circles Analysis D3 tangent chord secant angle diameter circle invariant geometry"
  },
  {
    "id": "circ-39",
    "title": "IMO G09-39: Circles Analysis [D3]",
    "subtitle": "Mathematics · Euclidean Geometry · Circles Master · D3",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/labs/lab:circles-master",
    "breadcrumb": "Mathematics · Circles Master · D3",
    "search_text": "circ-39 IMO G09-39 Circles Analysis D3 tangent chord secant angle diameter circle invariant geometry"
  },
  {
    "id": "circ-40",
    "title": "IMO G09-40: Circles Analysis [D3]",
    "subtitle": "Mathematics · Euclidean Geometry · Circles Master · D3",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/labs/lab:circles-master",
    "breadcrumb": "Mathematics · Circles Master · D3",
    "search_text": "circ-40 IMO G09-40 Circles Analysis D3 tangent chord secant angle diameter circle invariant geometry"
  },
  {
    "id": "circ-41",
    "title": "IMO G09-41: Circles Olympiad Invariant [D4]",
    "subtitle": "Mathematics · Euclidean Geometry · Circles Master · D4",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/labs/lab:circles-master",
    "breadcrumb": "Mathematics · Circles Master · D4",
    "search_text": "circ-41 IMO G09-41 Circles Olympiad Invariant D4 tangent chord secant angle diameter circle invariant geometry"
  },
  {
    "id": "circ-42",
    "title": "IMO G09-42: Circles Olympiad Invariant [D4]",
    "subtitle": "Mathematics · Euclidean Geometry · Circles Master · D4",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/labs/lab:circles-master",
    "breadcrumb": "Mathematics · Circles Master · D4",
    "search_text": "circ-42 IMO G09-42 Circles Olympiad Invariant D4 tangent chord secant angle diameter circle invariant geometry"
  },
  {
    "id": "circ-43",
    "title": "IMO G09-43: Circles Olympiad Invariant [D4]",
    "subtitle": "Mathematics · Euclidean Geometry · Circles Master · D4",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/labs/lab:circles-master",
    "breadcrumb": "Mathematics · Circles Master · D4",
    "search_text": "circ-43 IMO G09-43 Circles Olympiad Invariant D4 tangent chord secant angle diameter circle invariant geometry"
  },
  {
    "id": "circ-44",
    "title": "IMO G09-44: Circles Olympiad Invariant [D4]",
    "subtitle": "Mathematics · Euclidean Geometry · Circles Master · D4",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/labs/lab:circles-master",
    "breadcrumb": "Mathematics · Circles Master · D4",
    "search_text": "circ-44 IMO G09-44 Circles Olympiad Invariant D4 tangent chord secant angle diameter circle invariant geometry"
  },
  {
    "id": "circ-45",
    "title": "IMO G09-45: Circles Olympiad Invariant [D4]",
    "subtitle": "Mathematics · Euclidean Geometry · Circles Master · D4",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/labs/lab:circles-master",
    "breadcrumb": "Mathematics · Circles Master · D4",
    "search_text": "circ-45 IMO G09-45 Circles Olympiad Invariant D4 tangent chord secant angle diameter circle invariant geometry"
  },
  {
    "id": "circ-46",
    "title": "IMO G09-46: Circles Olympiad Invariant [D4]",
    "subtitle": "Mathematics · Euclidean Geometry · Circles Master · D4",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/labs/lab:circles-master",
    "breadcrumb": "Mathematics · Circles Master · D4",
    "search_text": "circ-46 IMO G09-46 Circles Olympiad Invariant D4 tangent chord secant angle diameter circle invariant geometry"
  },
  {
    "id": "circ-47",
    "title": "IMO G09-47: Circles Olympiad Invariant [D4]",
    "subtitle": "Mathematics · Euclidean Geometry · Circles Master · D4",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/labs/lab:circles-master",
    "breadcrumb": "Mathematics · Circles Master · D4",
    "search_text": "circ-47 IMO G09-47 Circles Olympiad Invariant D4 tangent chord secant angle diameter circle invariant geometry"
  },
  {
    "id": "circ-48",
    "title": "IMO G09-48: Circles Olympiad Invariant [D4]",
    "subtitle": "Mathematics · Euclidean Geometry · Circles Master · D4",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/labs/lab:circles-master",
    "breadcrumb": "Mathematics · Circles Master · D4",
    "search_text": "circ-48 IMO G09-48 Circles Olympiad Invariant D4 tangent chord secant angle diameter circle invariant geometry"
  },
  {
    "id": "circ-49",
    "title": "IMO G09-49: Circles Olympiad Invariant [D4]",
    "subtitle": "Mathematics · Euclidean Geometry · Circles Master · D4",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/labs/lab:circles-master",
    "breadcrumb": "Mathematics · Circles Master · D4",
    "search_text": "circ-49 IMO G09-49 Circles Olympiad Invariant D4 tangent chord secant angle diameter circle invariant geometry"
  },
  {
    "id": "circ-50",
    "title": "IMO G09-50: Circles Olympiad Invariant [D4]",
    "subtitle": "Mathematics · Euclidean Geometry · Circles Master · D4",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/labs/lab:circles-master",
    "breadcrumb": "Mathematics · Circles Master · D4",
    "search_text": "circ-50 IMO G09-50 Circles Olympiad Invariant D4 tangent chord secant angle diameter circle invariant geometry"
  },
  {
    "id": "REDOX-Q01",
    "title": "JEE Main 2013-2026: Redox Problem 01",
    "subtitle": "Chemistry · Redox Reactions & Oxidation States · PYQ",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/subject/chemistry/topic/redox",
    "breadcrumb": "Chemistry · Redox Reactions · Question 01",
    "search_text": "REDOX-Q01 JEE Main Redox Problem 01 oxidation reduction half-reaction balancing electron transfer chemistry"
  },
  {
    "id": "REDOX-Q02",
    "title": "JEE Main 2013-2026: Redox Problem 02",
    "subtitle": "Chemistry · Redox Reactions & Oxidation States · PYQ",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/subject/chemistry/topic/redox",
    "breadcrumb": "Chemistry · Redox Reactions · Question 02",
    "search_text": "REDOX-Q02 JEE Main Redox Problem 02 oxidation reduction half-reaction balancing electron transfer chemistry"
  },
  {
    "id": "REDOX-Q03",
    "title": "JEE Main 2013-2026: Redox Problem 03",
    "subtitle": "Chemistry · Redox Reactions & Oxidation States · PYQ",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/subject/chemistry/topic/redox",
    "breadcrumb": "Chemistry · Redox Reactions · Question 03",
    "search_text": "REDOX-Q03 JEE Main Redox Problem 03 oxidation reduction half-reaction balancing electron transfer chemistry"
  },
  {
    "id": "REDOX-Q04",
    "title": "JEE Main 2013-2026: Redox Problem 04",
    "subtitle": "Chemistry · Redox Reactions & Oxidation States · PYQ",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/subject/chemistry/topic/redox",
    "breadcrumb": "Chemistry · Redox Reactions · Question 04",
    "search_text": "REDOX-Q04 JEE Main Redox Problem 04 oxidation reduction half-reaction balancing electron transfer chemistry"
  },
  {
    "id": "REDOX-Q05",
    "title": "JEE Main 2013-2026: Redox Problem 05",
    "subtitle": "Chemistry · Redox Reactions & Oxidation States · PYQ",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/subject/chemistry/topic/redox",
    "breadcrumb": "Chemistry · Redox Reactions · Question 05",
    "search_text": "REDOX-Q05 JEE Main Redox Problem 05 oxidation reduction half-reaction balancing electron transfer chemistry"
  },
  {
    "id": "REDOX-Q06",
    "title": "JEE Main 2013-2026: Redox Problem 06",
    "subtitle": "Chemistry · Redox Reactions & Oxidation States · PYQ",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/subject/chemistry/topic/redox",
    "breadcrumb": "Chemistry · Redox Reactions · Question 06",
    "search_text": "REDOX-Q06 JEE Main Redox Problem 06 oxidation reduction half-reaction balancing electron transfer chemistry"
  },
  {
    "id": "REDOX-Q07",
    "title": "JEE Main 2013-2026: Redox Problem 07",
    "subtitle": "Chemistry · Redox Reactions & Oxidation States · PYQ",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/subject/chemistry/topic/redox",
    "breadcrumb": "Chemistry · Redox Reactions · Question 07",
    "search_text": "REDOX-Q07 JEE Main Redox Problem 07 oxidation reduction half-reaction balancing electron transfer chemistry"
  },
  {
    "id": "REDOX-Q08",
    "title": "JEE Main 2013-2026: Redox Problem 08",
    "subtitle": "Chemistry · Redox Reactions & Oxidation States · PYQ",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/subject/chemistry/topic/redox",
    "breadcrumb": "Chemistry · Redox Reactions · Question 08",
    "search_text": "REDOX-Q08 JEE Main Redox Problem 08 oxidation reduction half-reaction balancing electron transfer chemistry"
  },
  {
    "id": "REDOX-Q09",
    "title": "JEE Main 2013-2026: Redox Problem 09",
    "subtitle": "Chemistry · Redox Reactions & Oxidation States · PYQ",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/subject/chemistry/topic/redox",
    "breadcrumb": "Chemistry · Redox Reactions · Question 09",
    "search_text": "REDOX-Q09 JEE Main Redox Problem 09 oxidation reduction half-reaction balancing electron transfer chemistry"
  },
  {
    "id": "REDOX-Q10",
    "title": "JEE Main 2013-2026: Redox Problem 10",
    "subtitle": "Chemistry · Redox Reactions & Oxidation States · PYQ",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/subject/chemistry/topic/redox",
    "breadcrumb": "Chemistry · Redox Reactions · Question 10",
    "search_text": "REDOX-Q10 JEE Main Redox Problem 10 oxidation reduction half-reaction balancing electron transfer chemistry"
  },
  {
    "id": "REDOX-Q11",
    "title": "JEE Main 2013-2026: Redox Problem 11",
    "subtitle": "Chemistry · Redox Reactions & Oxidation States · PYQ",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/subject/chemistry/topic/redox",
    "breadcrumb": "Chemistry · Redox Reactions · Question 11",
    "search_text": "REDOX-Q11 JEE Main Redox Problem 11 oxidation reduction half-reaction balancing electron transfer chemistry"
  },
  {
    "id": "REDOX-Q12",
    "title": "JEE Main 2013-2026: Redox Problem 12",
    "subtitle": "Chemistry · Redox Reactions & Oxidation States · PYQ",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/subject/chemistry/topic/redox",
    "breadcrumb": "Chemistry · Redox Reactions · Question 12",
    "search_text": "REDOX-Q12 JEE Main Redox Problem 12 oxidation reduction half-reaction balancing electron transfer chemistry"
  },
  {
    "id": "REDOX-Q13",
    "title": "JEE Main 2013-2026: Redox Problem 13",
    "subtitle": "Chemistry · Redox Reactions & Oxidation States · PYQ",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/subject/chemistry/topic/redox",
    "breadcrumb": "Chemistry · Redox Reactions · Question 13",
    "search_text": "REDOX-Q13 JEE Main Redox Problem 13 oxidation reduction half-reaction balancing electron transfer chemistry"
  },
  {
    "id": "REDOX-Q14",
    "title": "JEE Main 2013-2026: Redox Problem 14",
    "subtitle": "Chemistry · Redox Reactions & Oxidation States · PYQ",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/subject/chemistry/topic/redox",
    "breadcrumb": "Chemistry · Redox Reactions · Question 14",
    "search_text": "REDOX-Q14 JEE Main Redox Problem 14 oxidation reduction half-reaction balancing electron transfer chemistry"
  },
  {
    "id": "REDOX-Q15",
    "title": "JEE Main 2013-2026: Redox Problem 15",
    "subtitle": "Chemistry · Redox Reactions & Oxidation States · PYQ",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/subject/chemistry/topic/redox",
    "breadcrumb": "Chemistry · Redox Reactions · Question 15",
    "search_text": "REDOX-Q15 JEE Main Redox Problem 15 oxidation reduction half-reaction balancing electron transfer chemistry"
  },
  {
    "id": "REDOX-Q16",
    "title": "JEE Main 2013-2026: Redox Problem 16",
    "subtitle": "Chemistry · Redox Reactions & Oxidation States · PYQ",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/subject/chemistry/topic/redox",
    "breadcrumb": "Chemistry · Redox Reactions · Question 16",
    "search_text": "REDOX-Q16 JEE Main Redox Problem 16 oxidation reduction half-reaction balancing electron transfer chemistry"
  },
  {
    "id": "REDOX-Q17",
    "title": "JEE Main 2013-2026: Redox Problem 17",
    "subtitle": "Chemistry · Redox Reactions & Oxidation States · PYQ",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/subject/chemistry/topic/redox",
    "breadcrumb": "Chemistry · Redox Reactions · Question 17",
    "search_text": "REDOX-Q17 JEE Main Redox Problem 17 oxidation reduction half-reaction balancing electron transfer chemistry"
  },
  {
    "id": "REDOX-Q18",
    "title": "JEE Main 2013-2026: Redox Problem 18",
    "subtitle": "Chemistry · Redox Reactions & Oxidation States · PYQ",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/subject/chemistry/topic/redox",
    "breadcrumb": "Chemistry · Redox Reactions · Question 18",
    "search_text": "REDOX-Q18 JEE Main Redox Problem 18 oxidation reduction half-reaction balancing electron transfer chemistry"
  },
  {
    "id": "REDOX-Q19",
    "title": "JEE Main 2013-2026: Redox Problem 19",
    "subtitle": "Chemistry · Redox Reactions & Oxidation States · PYQ",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/subject/chemistry/topic/redox",
    "breadcrumb": "Chemistry · Redox Reactions · Question 19",
    "search_text": "REDOX-Q19 JEE Main Redox Problem 19 oxidation reduction half-reaction balancing electron transfer chemistry"
  },
  {
    "id": "REDOX-Q20",
    "title": "JEE Main 2013-2026: Redox Problem 20",
    "subtitle": "Chemistry · Redox Reactions & Oxidation States · PYQ",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/subject/chemistry/topic/redox",
    "breadcrumb": "Chemistry · Redox Reactions · Question 20",
    "search_text": "REDOX-Q20 JEE Main Redox Problem 20 oxidation reduction half-reaction balancing electron transfer chemistry"
  },
  {
    "id": "REDOX-Q21",
    "title": "JEE Main 2013-2026: Redox Problem 21",
    "subtitle": "Chemistry · Redox Reactions & Oxidation States · PYQ",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/subject/chemistry/topic/redox",
    "breadcrumb": "Chemistry · Redox Reactions · Question 21",
    "search_text": "REDOX-Q21 JEE Main Redox Problem 21 oxidation reduction half-reaction balancing electron transfer chemistry"
  },
  {
    "id": "REDOX-Q22",
    "title": "JEE Main 2013-2026: Redox Problem 22",
    "subtitle": "Chemistry · Redox Reactions & Oxidation States · PYQ",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/subject/chemistry/topic/redox",
    "breadcrumb": "Chemistry · Redox Reactions · Question 22",
    "search_text": "REDOX-Q22 JEE Main Redox Problem 22 oxidation reduction half-reaction balancing electron transfer chemistry"
  },
  {
    "id": "REDOX-Q23",
    "title": "JEE Main 2013-2026: Redox Problem 23",
    "subtitle": "Chemistry · Redox Reactions & Oxidation States · PYQ",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/subject/chemistry/topic/redox",
    "breadcrumb": "Chemistry · Redox Reactions · Question 23",
    "search_text": "REDOX-Q23 JEE Main Redox Problem 23 oxidation reduction half-reaction balancing electron transfer chemistry"
  },
  {
    "id": "REDOX-Q24",
    "title": "JEE Main 2013-2026: Redox Problem 24",
    "subtitle": "Chemistry · Redox Reactions & Oxidation States · PYQ",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/subject/chemistry/topic/redox",
    "breadcrumb": "Chemistry · Redox Reactions · Question 24",
    "search_text": "REDOX-Q24 JEE Main Redox Problem 24 oxidation reduction half-reaction balancing electron transfer chemistry"
  },
  {
    "id": "REDOX-Q25",
    "title": "JEE Main 2013-2026: Redox Problem 25",
    "subtitle": "Chemistry · Redox Reactions & Oxidation States · PYQ",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/subject/chemistry/topic/redox",
    "breadcrumb": "Chemistry · Redox Reactions · Question 25",
    "search_text": "REDOX-Q25 JEE Main Redox Problem 25 oxidation reduction half-reaction balancing electron transfer chemistry"
  },
  {
    "id": "REDOX-Q26",
    "title": "JEE Main 2013-2026: Redox Problem 26",
    "subtitle": "Chemistry · Redox Reactions & Oxidation States · PYQ",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/subject/chemistry/topic/redox",
    "breadcrumb": "Chemistry · Redox Reactions · Question 26",
    "search_text": "REDOX-Q26 JEE Main Redox Problem 26 oxidation reduction half-reaction balancing electron transfer chemistry"
  },
  {
    "id": "REDOX-Q27",
    "title": "JEE Main 2013-2026: Redox Problem 27",
    "subtitle": "Chemistry · Redox Reactions & Oxidation States · PYQ",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/subject/chemistry/topic/redox",
    "breadcrumb": "Chemistry · Redox Reactions · Question 27",
    "search_text": "REDOX-Q27 JEE Main Redox Problem 27 oxidation reduction half-reaction balancing electron transfer chemistry"
  },
  {
    "id": "REDOX-Q28",
    "title": "JEE Main 2013-2026: Redox Problem 28",
    "subtitle": "Chemistry · Redox Reactions & Oxidation States · PYQ",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/subject/chemistry/topic/redox",
    "breadcrumb": "Chemistry · Redox Reactions · Question 28",
    "search_text": "REDOX-Q28 JEE Main Redox Problem 28 oxidation reduction half-reaction balancing electron transfer chemistry"
  },
  {
    "id": "REDOX-Q29",
    "title": "JEE Main 2013-2026: Redox Problem 29",
    "subtitle": "Chemistry · Redox Reactions & Oxidation States · PYQ",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/subject/chemistry/topic/redox",
    "breadcrumb": "Chemistry · Redox Reactions · Question 29",
    "search_text": "REDOX-Q29 JEE Main Redox Problem 29 oxidation reduction half-reaction balancing electron transfer chemistry"
  },
  {
    "id": "REDOX-Q30",
    "title": "JEE Main 2013-2026: Redox Problem 30",
    "subtitle": "Chemistry · Redox Reactions & Oxidation States · PYQ",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/subject/chemistry/topic/redox",
    "breadcrumb": "Chemistry · Redox Reactions · Question 30",
    "search_text": "REDOX-Q30 JEE Main Redox Problem 30 oxidation reduction half-reaction balancing electron transfer chemistry"
  },
  {
    "id": "REDOX-Q31",
    "title": "JEE Main 2013-2026: Redox Problem 31",
    "subtitle": "Chemistry · Redox Reactions & Oxidation States · PYQ",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/subject/chemistry/topic/redox",
    "breadcrumb": "Chemistry · Redox Reactions · Question 31",
    "search_text": "REDOX-Q31 JEE Main Redox Problem 31 oxidation reduction half-reaction balancing electron transfer chemistry"
  },
  {
    "id": "REDOX-Q32",
    "title": "JEE Main 2013-2026: Redox Problem 32",
    "subtitle": "Chemistry · Redox Reactions & Oxidation States · PYQ",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/subject/chemistry/topic/redox",
    "breadcrumb": "Chemistry · Redox Reactions · Question 32",
    "search_text": "REDOX-Q32 JEE Main Redox Problem 32 oxidation reduction half-reaction balancing electron transfer chemistry"
  },
  {
    "id": "REDOX-Q33",
    "title": "JEE Main 2013-2026: Redox Problem 33",
    "subtitle": "Chemistry · Redox Reactions & Oxidation States · PYQ",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/subject/chemistry/topic/redox",
    "breadcrumb": "Chemistry · Redox Reactions · Question 33",
    "search_text": "REDOX-Q33 JEE Main Redox Problem 33 oxidation reduction half-reaction balancing electron transfer chemistry"
  },
  {
    "id": "REDOX-Q34",
    "title": "JEE Main 2013-2026: Redox Problem 34",
    "subtitle": "Chemistry · Redox Reactions & Oxidation States · PYQ",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/subject/chemistry/topic/redox",
    "breadcrumb": "Chemistry · Redox Reactions · Question 34",
    "search_text": "REDOX-Q34 JEE Main Redox Problem 34 oxidation reduction half-reaction balancing electron transfer chemistry"
  },
  {
    "id": "REDOX-Q35",
    "title": "JEE Main 2013-2026: Redox Problem 35",
    "subtitle": "Chemistry · Redox Reactions & Oxidation States · PYQ",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/subject/chemistry/topic/redox",
    "breadcrumb": "Chemistry · Redox Reactions · Question 35",
    "search_text": "REDOX-Q35 JEE Main Redox Problem 35 oxidation reduction half-reaction balancing electron transfer chemistry"
  },
  {
    "id": "REDOX-Q36",
    "title": "JEE Main 2013-2026: Redox Problem 36",
    "subtitle": "Chemistry · Redox Reactions & Oxidation States · PYQ",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/subject/chemistry/topic/redox",
    "breadcrumb": "Chemistry · Redox Reactions · Question 36",
    "search_text": "REDOX-Q36 JEE Main Redox Problem 36 oxidation reduction half-reaction balancing electron transfer chemistry"
  },
  {
    "id": "REDOX-Q37",
    "title": "JEE Main 2013-2026: Redox Problem 37",
    "subtitle": "Chemistry · Redox Reactions & Oxidation States · PYQ",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/subject/chemistry/topic/redox",
    "breadcrumb": "Chemistry · Redox Reactions · Question 37",
    "search_text": "REDOX-Q37 JEE Main Redox Problem 37 oxidation reduction half-reaction balancing electron transfer chemistry"
  },
  {
    "id": "REDOX-Q38",
    "title": "JEE Main 2013-2026: Redox Problem 38",
    "subtitle": "Chemistry · Redox Reactions & Oxidation States · PYQ",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/subject/chemistry/topic/redox",
    "breadcrumb": "Chemistry · Redox Reactions · Question 38",
    "search_text": "REDOX-Q38 JEE Main Redox Problem 38 oxidation reduction half-reaction balancing electron transfer chemistry"
  },
  {
    "id": "REDOX-Q39",
    "title": "JEE Main 2013-2026: Redox Problem 39",
    "subtitle": "Chemistry · Redox Reactions & Oxidation States · PYQ",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/subject/chemistry/topic/redox",
    "breadcrumb": "Chemistry · Redox Reactions · Question 39",
    "search_text": "REDOX-Q39 JEE Main Redox Problem 39 oxidation reduction half-reaction balancing electron transfer chemistry"
  },
  {
    "id": "REDOX-Q40",
    "title": "JEE Main 2013-2026: Redox Problem 40",
    "subtitle": "Chemistry · Redox Reactions & Oxidation States · PYQ",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/subject/chemistry/topic/redox",
    "breadcrumb": "Chemistry · Redox Reactions · Question 40",
    "search_text": "REDOX-Q40 JEE Main Redox Problem 40 oxidation reduction half-reaction balancing electron transfer chemistry"
  },
  {
    "id": "REDOX-Q41",
    "title": "JEE Main 2013-2026: Redox Problem 41",
    "subtitle": "Chemistry · Redox Reactions & Oxidation States · PYQ",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/subject/chemistry/topic/redox",
    "breadcrumb": "Chemistry · Redox Reactions · Question 41",
    "search_text": "REDOX-Q41 JEE Main Redox Problem 41 oxidation reduction half-reaction balancing electron transfer chemistry"
  },
  {
    "id": "REDOX-Q42",
    "title": "JEE Main 2013-2026: Redox Problem 42",
    "subtitle": "Chemistry · Redox Reactions & Oxidation States · PYQ",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/subject/chemistry/topic/redox",
    "breadcrumb": "Chemistry · Redox Reactions · Question 42",
    "search_text": "REDOX-Q42 JEE Main Redox Problem 42 oxidation reduction half-reaction balancing electron transfer chemistry"
  },
  {
    "id": "REDOX-Q43",
    "title": "JEE Main 2013-2026: Redox Problem 43",
    "subtitle": "Chemistry · Redox Reactions & Oxidation States · PYQ",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/subject/chemistry/topic/redox",
    "breadcrumb": "Chemistry · Redox Reactions · Question 43",
    "search_text": "REDOX-Q43 JEE Main Redox Problem 43 oxidation reduction half-reaction balancing electron transfer chemistry"
  },
  {
    "id": "REDOX-Q44",
    "title": "JEE Main 2013-2026: Redox Problem 44",
    "subtitle": "Chemistry · Redox Reactions & Oxidation States · PYQ",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/subject/chemistry/topic/redox",
    "breadcrumb": "Chemistry · Redox Reactions · Question 44",
    "search_text": "REDOX-Q44 JEE Main Redox Problem 44 oxidation reduction half-reaction balancing electron transfer chemistry"
  },
  {
    "id": "REDOX-Q45",
    "title": "JEE Main 2013-2026: Redox Problem 45",
    "subtitle": "Chemistry · Redox Reactions & Oxidation States · PYQ",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/subject/chemistry/topic/redox",
    "breadcrumb": "Chemistry · Redox Reactions · Question 45",
    "search_text": "REDOX-Q45 JEE Main Redox Problem 45 oxidation reduction half-reaction balancing electron transfer chemistry"
  },
  {
    "id": "REDOX-Q46",
    "title": "JEE Main 2013-2026: Redox Problem 46",
    "subtitle": "Chemistry · Redox Reactions & Oxidation States · PYQ",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/subject/chemistry/topic/redox",
    "breadcrumb": "Chemistry · Redox Reactions · Question 46",
    "search_text": "REDOX-Q46 JEE Main Redox Problem 46 oxidation reduction half-reaction balancing electron transfer chemistry"
  },
  {
    "id": "BOND-Q01",
    "title": "JEE Main 2015-2026: Chemical Bonding Q01",
    "subtitle": "Chemistry · Chemical Bonding & Molecular Structure · PYQ",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/subject/chemistry/topic/bonding",
    "breadcrumb": "Chemistry · Chemical Bonding · Question 01",
    "search_text": "BOND-Q01 JEE Main Chemical Bonding Q01 VSEPR hybridization dipole moment molecular structure chemistry"
  },
  {
    "id": "BOND-Q02",
    "title": "JEE Main 2015-2026: Chemical Bonding Q02",
    "subtitle": "Chemistry · Chemical Bonding & Molecular Structure · PYQ",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/subject/chemistry/topic/bonding",
    "breadcrumb": "Chemistry · Chemical Bonding · Question 02",
    "search_text": "BOND-Q02 JEE Main Chemical Bonding Q02 VSEPR hybridization dipole moment molecular structure chemistry"
  },
  {
    "id": "BOND-Q03",
    "title": "JEE Main 2015-2026: Chemical Bonding Q03",
    "subtitle": "Chemistry · Chemical Bonding & Molecular Structure · PYQ",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/subject/chemistry/topic/bonding",
    "breadcrumb": "Chemistry · Chemical Bonding · Question 03",
    "search_text": "BOND-Q03 JEE Main Chemical Bonding Q03 VSEPR hybridization dipole moment molecular structure chemistry"
  },
  {
    "id": "BOND-Q04",
    "title": "JEE Main 2015-2026: Chemical Bonding Q04",
    "subtitle": "Chemistry · Chemical Bonding & Molecular Structure · PYQ",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/subject/chemistry/topic/bonding",
    "breadcrumb": "Chemistry · Chemical Bonding · Question 04",
    "search_text": "BOND-Q04 JEE Main Chemical Bonding Q04 VSEPR hybridization dipole moment molecular structure chemistry"
  },
  {
    "id": "BOND-Q05",
    "title": "JEE Main 2015-2026: Chemical Bonding Q05",
    "subtitle": "Chemistry · Chemical Bonding & Molecular Structure · PYQ",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/subject/chemistry/topic/bonding",
    "breadcrumb": "Chemistry · Chemical Bonding · Question 05",
    "search_text": "BOND-Q05 JEE Main Chemical Bonding Q05 VSEPR hybridization dipole moment molecular structure chemistry"
  },
  {
    "id": "BOND-Q06",
    "title": "JEE Main 2015-2026: Chemical Bonding Q06",
    "subtitle": "Chemistry · Chemical Bonding & Molecular Structure · PYQ",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/subject/chemistry/topic/bonding",
    "breadcrumb": "Chemistry · Chemical Bonding · Question 06",
    "search_text": "BOND-Q06 JEE Main Chemical Bonding Q06 VSEPR hybridization dipole moment molecular structure chemistry"
  },
  {
    "id": "BOND-Q07",
    "title": "JEE Main 2015-2026: Chemical Bonding Q07",
    "subtitle": "Chemistry · Chemical Bonding & Molecular Structure · PYQ",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/subject/chemistry/topic/bonding",
    "breadcrumb": "Chemistry · Chemical Bonding · Question 07",
    "search_text": "BOND-Q07 JEE Main Chemical Bonding Q07 VSEPR hybridization dipole moment molecular structure chemistry"
  },
  {
    "id": "BOND-Q08",
    "title": "JEE Main 2015-2026: Chemical Bonding Q08",
    "subtitle": "Chemistry · Chemical Bonding & Molecular Structure · PYQ",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/subject/chemistry/topic/bonding",
    "breadcrumb": "Chemistry · Chemical Bonding · Question 08",
    "search_text": "BOND-Q08 JEE Main Chemical Bonding Q08 VSEPR hybridization dipole moment molecular structure chemistry"
  },
  {
    "id": "BOND-Q09",
    "title": "JEE Main 2015-2026: Chemical Bonding Q09",
    "subtitle": "Chemistry · Chemical Bonding & Molecular Structure · PYQ",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/subject/chemistry/topic/bonding",
    "breadcrumb": "Chemistry · Chemical Bonding · Question 09",
    "search_text": "BOND-Q09 JEE Main Chemical Bonding Q09 VSEPR hybridization dipole moment molecular structure chemistry"
  },
  {
    "id": "BOND-Q10",
    "title": "JEE Main 2015-2026: Chemical Bonding Q10",
    "subtitle": "Chemistry · Chemical Bonding & Molecular Structure · PYQ",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/subject/chemistry/topic/bonding",
    "breadcrumb": "Chemistry · Chemical Bonding · Question 10",
    "search_text": "BOND-Q10 JEE Main Chemical Bonding Q10 VSEPR hybridization dipole moment molecular structure chemistry"
  },
  {
    "id": "BOND-Q11",
    "title": "JEE Main 2015-2026: Chemical Bonding Q11",
    "subtitle": "Chemistry · Chemical Bonding & Molecular Structure · PYQ",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/subject/chemistry/topic/bonding",
    "breadcrumb": "Chemistry · Chemical Bonding · Question 11",
    "search_text": "BOND-Q11 JEE Main Chemical Bonding Q11 VSEPR hybridization dipole moment molecular structure chemistry"
  },
  {
    "id": "BOND-Q12",
    "title": "JEE Main 2015-2026: Chemical Bonding Q12",
    "subtitle": "Chemistry · Chemical Bonding & Molecular Structure · PYQ",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/subject/chemistry/topic/bonding",
    "breadcrumb": "Chemistry · Chemical Bonding · Question 12",
    "search_text": "BOND-Q12 JEE Main Chemical Bonding Q12 VSEPR hybridization dipole moment molecular structure chemistry"
  },
  {
    "id": "BOND-Q13",
    "title": "JEE Main 2015-2026: Chemical Bonding Q13",
    "subtitle": "Chemistry · Chemical Bonding & Molecular Structure · PYQ",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/subject/chemistry/topic/bonding",
    "breadcrumb": "Chemistry · Chemical Bonding · Question 13",
    "search_text": "BOND-Q13 JEE Main Chemical Bonding Q13 VSEPR hybridization dipole moment molecular structure chemistry"
  },
  {
    "id": "BOND-Q14",
    "title": "JEE Main 2015-2026: Chemical Bonding Q14",
    "subtitle": "Chemistry · Chemical Bonding & Molecular Structure · PYQ",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/subject/chemistry/topic/bonding",
    "breadcrumb": "Chemistry · Chemical Bonding · Question 14",
    "search_text": "BOND-Q14 JEE Main Chemical Bonding Q14 VSEPR hybridization dipole moment molecular structure chemistry"
  },
  {
    "id": "BOND-Q15",
    "title": "JEE Main 2015-2026: Chemical Bonding Q15",
    "subtitle": "Chemistry · Chemical Bonding & Molecular Structure · PYQ",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/subject/chemistry/topic/bonding",
    "breadcrumb": "Chemistry · Chemical Bonding · Question 15",
    "search_text": "BOND-Q15 JEE Main Chemical Bonding Q15 VSEPR hybridization dipole moment molecular structure chemistry"
  },
  {
    "id": "BOND-Q16",
    "title": "JEE Main 2015-2026: Chemical Bonding Q16",
    "subtitle": "Chemistry · Chemical Bonding & Molecular Structure · PYQ",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/subject/chemistry/topic/bonding",
    "breadcrumb": "Chemistry · Chemical Bonding · Question 16",
    "search_text": "BOND-Q16 JEE Main Chemical Bonding Q16 VSEPR hybridization dipole moment molecular structure chemistry"
  },
  {
    "id": "BOND-Q17",
    "title": "JEE Main 2015-2026: Chemical Bonding Q17",
    "subtitle": "Chemistry · Chemical Bonding & Molecular Structure · PYQ",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/subject/chemistry/topic/bonding",
    "breadcrumb": "Chemistry · Chemical Bonding · Question 17",
    "search_text": "BOND-Q17 JEE Main Chemical Bonding Q17 VSEPR hybridization dipole moment molecular structure chemistry"
  },
  {
    "id": "BOND-Q18",
    "title": "JEE Main 2015-2026: Chemical Bonding Q18",
    "subtitle": "Chemistry · Chemical Bonding & Molecular Structure · PYQ",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/subject/chemistry/topic/bonding",
    "breadcrumb": "Chemistry · Chemical Bonding · Question 18",
    "search_text": "BOND-Q18 JEE Main Chemical Bonding Q18 VSEPR hybridization dipole moment molecular structure chemistry"
  },
  {
    "id": "BOND-Q19",
    "title": "JEE Main 2015-2026: Chemical Bonding Q19",
    "subtitle": "Chemistry · Chemical Bonding & Molecular Structure · PYQ",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/subject/chemistry/topic/bonding",
    "breadcrumb": "Chemistry · Chemical Bonding · Question 19",
    "search_text": "BOND-Q19 JEE Main Chemical Bonding Q19 VSEPR hybridization dipole moment molecular structure chemistry"
  },
  {
    "id": "BOND-Q20",
    "title": "JEE Main 2015-2026: Chemical Bonding Q20",
    "subtitle": "Chemistry · Chemical Bonding & Molecular Structure · PYQ",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/subject/chemistry/topic/bonding",
    "breadcrumb": "Chemistry · Chemical Bonding · Question 20",
    "search_text": "BOND-Q20 JEE Main Chemical Bonding Q20 VSEPR hybridization dipole moment molecular structure chemistry"
  },
  {
    "id": "BOND-Q21",
    "title": "JEE Main 2015-2026: Chemical Bonding Q21",
    "subtitle": "Chemistry · Chemical Bonding & Molecular Structure · PYQ",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/subject/chemistry/topic/bonding",
    "breadcrumb": "Chemistry · Chemical Bonding · Question 21",
    "search_text": "BOND-Q21 JEE Main Chemical Bonding Q21 VSEPR hybridization dipole moment molecular structure chemistry"
  },
  {
    "id": "BOND-Q22",
    "title": "JEE Main 2015-2026: Chemical Bonding Q22",
    "subtitle": "Chemistry · Chemical Bonding & Molecular Structure · PYQ",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/subject/chemistry/topic/bonding",
    "breadcrumb": "Chemistry · Chemical Bonding · Question 22",
    "search_text": "BOND-Q22 JEE Main Chemical Bonding Q22 VSEPR hybridization dipole moment molecular structure chemistry"
  },
  {
    "id": "BOND-Q23",
    "title": "JEE Main 2015-2026: Chemical Bonding Q23",
    "subtitle": "Chemistry · Chemical Bonding & Molecular Structure · PYQ",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/subject/chemistry/topic/bonding",
    "breadcrumb": "Chemistry · Chemical Bonding · Question 23",
    "search_text": "BOND-Q23 JEE Main Chemical Bonding Q23 VSEPR hybridization dipole moment molecular structure chemistry"
  },
  {
    "id": "BOND-Q24",
    "title": "JEE Main 2015-2026: Chemical Bonding Q24",
    "subtitle": "Chemistry · Chemical Bonding & Molecular Structure · PYQ",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/subject/chemistry/topic/bonding",
    "breadcrumb": "Chemistry · Chemical Bonding · Question 24",
    "search_text": "BOND-Q24 JEE Main Chemical Bonding Q24 VSEPR hybridization dipole moment molecular structure chemistry"
  },
  {
    "id": "BOND-Q25",
    "title": "JEE Main 2015-2026: Chemical Bonding Q25",
    "subtitle": "Chemistry · Chemical Bonding & Molecular Structure · PYQ",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/subject/chemistry/topic/bonding",
    "breadcrumb": "Chemistry · Chemical Bonding · Question 25",
    "search_text": "BOND-Q25 JEE Main Chemical Bonding Q25 VSEPR hybridization dipole moment molecular structure chemistry"
  },
  {
    "id": "BOND-Q26",
    "title": "JEE Main 2015-2026: Chemical Bonding Q26",
    "subtitle": "Chemistry · Chemical Bonding & Molecular Structure · PYQ",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/subject/chemistry/topic/bonding",
    "breadcrumb": "Chemistry · Chemical Bonding · Question 26",
    "search_text": "BOND-Q26 JEE Main Chemical Bonding Q26 VSEPR hybridization dipole moment molecular structure chemistry"
  },
  {
    "id": "BOND-Q27",
    "title": "JEE Main 2015-2026: Chemical Bonding Q27",
    "subtitle": "Chemistry · Chemical Bonding & Molecular Structure · PYQ",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/subject/chemistry/topic/bonding",
    "breadcrumb": "Chemistry · Chemical Bonding · Question 27",
    "search_text": "BOND-Q27 JEE Main Chemical Bonding Q27 VSEPR hybridization dipole moment molecular structure chemistry"
  },
  {
    "id": "BOND-Q28",
    "title": "JEE Main 2015-2026: Chemical Bonding Q28",
    "subtitle": "Chemistry · Chemical Bonding & Molecular Structure · PYQ",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/subject/chemistry/topic/bonding",
    "breadcrumb": "Chemistry · Chemical Bonding · Question 28",
    "search_text": "BOND-Q28 JEE Main Chemical Bonding Q28 VSEPR hybridization dipole moment molecular structure chemistry"
  },
  {
    "id": "BOND-Q29",
    "title": "JEE Main 2015-2026: Chemical Bonding Q29",
    "subtitle": "Chemistry · Chemical Bonding & Molecular Structure · PYQ",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/subject/chemistry/topic/bonding",
    "breadcrumb": "Chemistry · Chemical Bonding · Question 29",
    "search_text": "BOND-Q29 JEE Main Chemical Bonding Q29 VSEPR hybridization dipole moment molecular structure chemistry"
  },
  {
    "id": "BOND-Q30",
    "title": "JEE Main 2015-2026: Chemical Bonding Q30",
    "subtitle": "Chemistry · Chemical Bonding & Molecular Structure · PYQ",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/subject/chemistry/topic/bonding",
    "breadcrumb": "Chemistry · Chemical Bonding · Question 30",
    "search_text": "BOND-Q30 JEE Main Chemical Bonding Q30 VSEPR hybridization dipole moment molecular structure chemistry"
  },
  {
    "id": "GAS-Q01",
    "title": "JEE Main 2014-2026: Behaviour of Gases Q01",
    "subtitle": "Chemistry · Kinetic Theory of Gases · PYQ",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/subject/chemistry/topic/gases",
    "breadcrumb": "Chemistry · Behaviour of Gases · Question 01",
    "search_text": "GAS-Q01 JEE Main Behaviour of Gases Q01 ideal gas Boyle Charles Graham diffusion effusion chemistry"
  },
  {
    "id": "GAS-Q02",
    "title": "JEE Main 2014-2026: Behaviour of Gases Q02",
    "subtitle": "Chemistry · Kinetic Theory of Gases · PYQ",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/subject/chemistry/topic/gases",
    "breadcrumb": "Chemistry · Behaviour of Gases · Question 02",
    "search_text": "GAS-Q02 JEE Main Behaviour of Gases Q02 ideal gas Boyle Charles Graham diffusion effusion chemistry"
  },
  {
    "id": "GAS-Q03",
    "title": "JEE Main 2014-2026: Behaviour of Gases Q03",
    "subtitle": "Chemistry · Kinetic Theory of Gases · PYQ",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/subject/chemistry/topic/gases",
    "breadcrumb": "Chemistry · Behaviour of Gases · Question 03",
    "search_text": "GAS-Q03 JEE Main Behaviour of Gases Q03 ideal gas Boyle Charles Graham diffusion effusion chemistry"
  },
  {
    "id": "GAS-Q04",
    "title": "JEE Main 2014-2026: Behaviour of Gases Q04",
    "subtitle": "Chemistry · Kinetic Theory of Gases · PYQ",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/subject/chemistry/topic/gases",
    "breadcrumb": "Chemistry · Behaviour of Gases · Question 04",
    "search_text": "GAS-Q04 JEE Main Behaviour of Gases Q04 ideal gas Boyle Charles Graham diffusion effusion chemistry"
  },
  {
    "id": "GAS-Q05",
    "title": "JEE Main 2014-2026: Behaviour of Gases Q05",
    "subtitle": "Chemistry · Kinetic Theory of Gases · PYQ",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/subject/chemistry/topic/gases",
    "breadcrumb": "Chemistry · Behaviour of Gases · Question 05",
    "search_text": "GAS-Q05 JEE Main Behaviour of Gases Q05 ideal gas Boyle Charles Graham diffusion effusion chemistry"
  },
  {
    "id": "GAS-Q06",
    "title": "JEE Main 2014-2026: Behaviour of Gases Q06",
    "subtitle": "Chemistry · Kinetic Theory of Gases · PYQ",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/subject/chemistry/topic/gases",
    "breadcrumb": "Chemistry · Behaviour of Gases · Question 06",
    "search_text": "GAS-Q06 JEE Main Behaviour of Gases Q06 ideal gas Boyle Charles Graham diffusion effusion chemistry"
  },
  {
    "id": "GAS-Q07",
    "title": "JEE Main 2014-2026: Behaviour of Gases Q07",
    "subtitle": "Chemistry · Kinetic Theory of Gases · PYQ",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/subject/chemistry/topic/gases",
    "breadcrumb": "Chemistry · Behaviour of Gases · Question 07",
    "search_text": "GAS-Q07 JEE Main Behaviour of Gases Q07 ideal gas Boyle Charles Graham diffusion effusion chemistry"
  },
  {
    "id": "GAS-Q08",
    "title": "JEE Main 2014-2026: Behaviour of Gases Q08",
    "subtitle": "Chemistry · Kinetic Theory of Gases · PYQ",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/subject/chemistry/topic/gases",
    "breadcrumb": "Chemistry · Behaviour of Gases · Question 08",
    "search_text": "GAS-Q08 JEE Main Behaviour of Gases Q08 ideal gas Boyle Charles Graham diffusion effusion chemistry"
  },
  {
    "id": "GAS-Q09",
    "title": "JEE Main 2014-2026: Behaviour of Gases Q09",
    "subtitle": "Chemistry · Kinetic Theory of Gases · PYQ",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/subject/chemistry/topic/gases",
    "breadcrumb": "Chemistry · Behaviour of Gases · Question 09",
    "search_text": "GAS-Q09 JEE Main Behaviour of Gases Q09 ideal gas Boyle Charles Graham diffusion effusion chemistry"
  },
  {
    "id": "GAS-Q10",
    "title": "JEE Main 2014-2026: Behaviour of Gases Q10",
    "subtitle": "Chemistry · Kinetic Theory of Gases · PYQ",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/subject/chemistry/topic/gases",
    "breadcrumb": "Chemistry · Behaviour of Gases · Question 10",
    "search_text": "GAS-Q10 JEE Main Behaviour of Gases Q10 ideal gas Boyle Charles Graham diffusion effusion chemistry"
  },
  {
    "id": "GAS-Q11",
    "title": "JEE Main 2014-2026: Behaviour of Gases Q11",
    "subtitle": "Chemistry · Kinetic Theory of Gases · PYQ",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/subject/chemistry/topic/gases",
    "breadcrumb": "Chemistry · Behaviour of Gases · Question 11",
    "search_text": "GAS-Q11 JEE Main Behaviour of Gases Q11 ideal gas Boyle Charles Graham diffusion effusion chemistry"
  },
  {
    "id": "GAS-Q12",
    "title": "JEE Main 2014-2026: Behaviour of Gases Q12",
    "subtitle": "Chemistry · Kinetic Theory of Gases · PYQ",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/subject/chemistry/topic/gases",
    "breadcrumb": "Chemistry · Behaviour of Gases · Question 12",
    "search_text": "GAS-Q12 JEE Main Behaviour of Gases Q12 ideal gas Boyle Charles Graham diffusion effusion chemistry"
  },
  {
    "id": "GAS-Q13",
    "title": "JEE Main 2014-2026: Behaviour of Gases Q13",
    "subtitle": "Chemistry · Kinetic Theory of Gases · PYQ",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/subject/chemistry/topic/gases",
    "breadcrumb": "Chemistry · Behaviour of Gases · Question 13",
    "search_text": "GAS-Q13 JEE Main Behaviour of Gases Q13 ideal gas Boyle Charles Graham diffusion effusion chemistry"
  },
  {
    "id": "GAS-Q14",
    "title": "JEE Main 2014-2026: Behaviour of Gases Q14",
    "subtitle": "Chemistry · Kinetic Theory of Gases · PYQ",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/subject/chemistry/topic/gases",
    "breadcrumb": "Chemistry · Behaviour of Gases · Question 14",
    "search_text": "GAS-Q14 JEE Main Behaviour of Gases Q14 ideal gas Boyle Charles Graham diffusion effusion chemistry"
  },
  {
    "id": "GAS-Q15",
    "title": "JEE Main 2014-2026: Behaviour of Gases Q15",
    "subtitle": "Chemistry · Kinetic Theory of Gases · PYQ",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/subject/chemistry/topic/gases",
    "breadcrumb": "Chemistry · Behaviour of Gases · Question 15",
    "search_text": "GAS-Q15 JEE Main Behaviour of Gases Q15 ideal gas Boyle Charles Graham diffusion effusion chemistry"
  },
  {
    "id": "GAS-Q16",
    "title": "JEE Main 2014-2026: Behaviour of Gases Q16",
    "subtitle": "Chemistry · Kinetic Theory of Gases · PYQ",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/subject/chemistry/topic/gases",
    "breadcrumb": "Chemistry · Behaviour of Gases · Question 16",
    "search_text": "GAS-Q16 JEE Main Behaviour of Gases Q16 ideal gas Boyle Charles Graham diffusion effusion chemistry"
  },
  {
    "id": "GAS-Q17",
    "title": "JEE Main 2014-2026: Behaviour of Gases Q17",
    "subtitle": "Chemistry · Kinetic Theory of Gases · PYQ",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/subject/chemistry/topic/gases",
    "breadcrumb": "Chemistry · Behaviour of Gases · Question 17",
    "search_text": "GAS-Q17 JEE Main Behaviour of Gases Q17 ideal gas Boyle Charles Graham diffusion effusion chemistry"
  },
  {
    "id": "GAS-Q18",
    "title": "JEE Main 2014-2026: Behaviour of Gases Q18",
    "subtitle": "Chemistry · Kinetic Theory of Gases · PYQ",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/subject/chemistry/topic/gases",
    "breadcrumb": "Chemistry · Behaviour of Gases · Question 18",
    "search_text": "GAS-Q18 JEE Main Behaviour of Gases Q18 ideal gas Boyle Charles Graham diffusion effusion chemistry"
  },
  {
    "id": "GAS-Q19",
    "title": "JEE Main 2014-2026: Behaviour of Gases Q19",
    "subtitle": "Chemistry · Kinetic Theory of Gases · PYQ",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/subject/chemistry/topic/gases",
    "breadcrumb": "Chemistry · Behaviour of Gases · Question 19",
    "search_text": "GAS-Q19 JEE Main Behaviour of Gases Q19 ideal gas Boyle Charles Graham diffusion effusion chemistry"
  },
  {
    "id": "GAS-Q20",
    "title": "JEE Main 2014-2026: Behaviour of Gases Q20",
    "subtitle": "Chemistry · Kinetic Theory of Gases · PYQ",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/subject/chemistry/topic/gases",
    "breadcrumb": "Chemistry · Behaviour of Gases · Question 20",
    "search_text": "GAS-Q20 JEE Main Behaviour of Gases Q20 ideal gas Boyle Charles Graham diffusion effusion chemistry"
  },
  {
    "id": "GAS-Q21",
    "title": "JEE Main 2014-2026: Behaviour of Gases Q21",
    "subtitle": "Chemistry · Kinetic Theory of Gases · PYQ",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/subject/chemistry/topic/gases",
    "breadcrumb": "Chemistry · Behaviour of Gases · Question 21",
    "search_text": "GAS-Q21 JEE Main Behaviour of Gases Q21 ideal gas Boyle Charles Graham diffusion effusion chemistry"
  },
  {
    "id": "GAS-Q22",
    "title": "JEE Main 2014-2026: Behaviour of Gases Q22",
    "subtitle": "Chemistry · Kinetic Theory of Gases · PYQ",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/subject/chemistry/topic/gases",
    "breadcrumb": "Chemistry · Behaviour of Gases · Question 22",
    "search_text": "GAS-Q22 JEE Main Behaviour of Gases Q22 ideal gas Boyle Charles Graham diffusion effusion chemistry"
  },
  {
    "id": "GAS-Q23",
    "title": "JEE Main 2014-2026: Behaviour of Gases Q23",
    "subtitle": "Chemistry · Kinetic Theory of Gases · PYQ",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/subject/chemistry/topic/gases",
    "breadcrumb": "Chemistry · Behaviour of Gases · Question 23",
    "search_text": "GAS-Q23 JEE Main Behaviour of Gases Q23 ideal gas Boyle Charles Graham diffusion effusion chemistry"
  },
  {
    "id": "GAS-Q24",
    "title": "JEE Main 2014-2026: Behaviour of Gases Q24",
    "subtitle": "Chemistry · Kinetic Theory of Gases · PYQ",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/subject/chemistry/topic/gases",
    "breadcrumb": "Chemistry · Behaviour of Gases · Question 24",
    "search_text": "GAS-Q24 JEE Main Behaviour of Gases Q24 ideal gas Boyle Charles Graham diffusion effusion chemistry"
  },
  {
    "id": "GAS-Q25",
    "title": "JEE Main 2014-2026: Behaviour of Gases Q25",
    "subtitle": "Chemistry · Kinetic Theory of Gases · PYQ",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/subject/chemistry/topic/gases",
    "breadcrumb": "Chemistry · Behaviour of Gases · Question 25",
    "search_text": "GAS-Q25 JEE Main Behaviour of Gases Q25 ideal gas Boyle Charles Graham diffusion effusion chemistry"
  },
  {
    "id": "GAS-Q26",
    "title": "JEE Main 2014-2026: Behaviour of Gases Q26",
    "subtitle": "Chemistry · Kinetic Theory of Gases · PYQ",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/subject/chemistry/topic/gases",
    "breadcrumb": "Chemistry · Behaviour of Gases · Question 26",
    "search_text": "GAS-Q26 JEE Main Behaviour of Gases Q26 ideal gas Boyle Charles Graham diffusion effusion chemistry"
  },
  {
    "id": "GAS-Q27",
    "title": "JEE Main 2014-2026: Behaviour of Gases Q27",
    "subtitle": "Chemistry · Kinetic Theory of Gases · PYQ",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/subject/chemistry/topic/gases",
    "breadcrumb": "Chemistry · Behaviour of Gases · Question 27",
    "search_text": "GAS-Q27 JEE Main Behaviour of Gases Q27 ideal gas Boyle Charles Graham diffusion effusion chemistry"
  },
  {
    "id": "GAS-Q28",
    "title": "JEE Main 2014-2026: Behaviour of Gases Q28",
    "subtitle": "Chemistry · Kinetic Theory of Gases · PYQ",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/subject/chemistry/topic/gases",
    "breadcrumb": "Chemistry · Behaviour of Gases · Question 28",
    "search_text": "GAS-Q28 JEE Main Behaviour of Gases Q28 ideal gas Boyle Charles Graham diffusion effusion chemistry"
  },
  {
    "id": "GAS-Q29",
    "title": "JEE Main 2014-2026: Behaviour of Gases Q29",
    "subtitle": "Chemistry · Kinetic Theory of Gases · PYQ",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/subject/chemistry/topic/gases",
    "breadcrumb": "Chemistry · Behaviour of Gases · Question 29",
    "search_text": "GAS-Q29 JEE Main Behaviour of Gases Q29 ideal gas Boyle Charles Graham diffusion effusion chemistry"
  },
  {
    "id": "GAS-Q30",
    "title": "JEE Main 2014-2026: Behaviour of Gases Q30",
    "subtitle": "Chemistry · Kinetic Theory of Gases · PYQ",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/subject/chemistry/topic/gases",
    "breadcrumb": "Chemistry · Behaviour of Gases · Question 30",
    "search_text": "GAS-Q30 JEE Main Behaviour of Gases Q30 ideal gas Boyle Charles Graham diffusion effusion chemistry"
  },
  {
    "id": "MOLE-Q01",
    "title": "JEE Main 2013-2026: Mole Concept & Stoichiometry Q01",
    "subtitle": "Chemistry · Mole Concept & Stoichiometry · PYQ",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/subject/chemistry/topic/stoichiometry",
    "breadcrumb": "Chemistry · Mole Concept · Question 01",
    "search_text": "MOLE-Q01 JEE Main Mole Concept Stoichiometry Q01 Avogadro molarity limiting reagent concentration chemistry"
  },
  {
    "id": "MOLE-Q02",
    "title": "JEE Main 2013-2026: Mole Concept & Stoichiometry Q02",
    "subtitle": "Chemistry · Mole Concept & Stoichiometry · PYQ",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/subject/chemistry/topic/stoichiometry",
    "breadcrumb": "Chemistry · Mole Concept · Question 02",
    "search_text": "MOLE-Q02 JEE Main Mole Concept Stoichiometry Q02 Avogadro molarity limiting reagent concentration chemistry"
  },
  {
    "id": "MOLE-Q03",
    "title": "JEE Main 2013-2026: Mole Concept & Stoichiometry Q03",
    "subtitle": "Chemistry · Mole Concept & Stoichiometry · PYQ",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/subject/chemistry/topic/stoichiometry",
    "breadcrumb": "Chemistry · Mole Concept · Question 03",
    "search_text": "MOLE-Q03 JEE Main Mole Concept Stoichiometry Q03 Avogadro molarity limiting reagent concentration chemistry"
  },
  {
    "id": "MOLE-Q04",
    "title": "JEE Main 2013-2026: Mole Concept & Stoichiometry Q04",
    "subtitle": "Chemistry · Mole Concept & Stoichiometry · PYQ",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/subject/chemistry/topic/stoichiometry",
    "breadcrumb": "Chemistry · Mole Concept · Question 04",
    "search_text": "MOLE-Q04 JEE Main Mole Concept Stoichiometry Q04 Avogadro molarity limiting reagent concentration chemistry"
  },
  {
    "id": "MOLE-Q05",
    "title": "JEE Main 2013-2026: Mole Concept & Stoichiometry Q05",
    "subtitle": "Chemistry · Mole Concept & Stoichiometry · PYQ",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/subject/chemistry/topic/stoichiometry",
    "breadcrumb": "Chemistry · Mole Concept · Question 05",
    "search_text": "MOLE-Q05 JEE Main Mole Concept Stoichiometry Q05 Avogadro molarity limiting reagent concentration chemistry"
  },
  {
    "id": "MOLE-Q06",
    "title": "JEE Main 2013-2026: Mole Concept & Stoichiometry Q06",
    "subtitle": "Chemistry · Mole Concept & Stoichiometry · PYQ",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/subject/chemistry/topic/stoichiometry",
    "breadcrumb": "Chemistry · Mole Concept · Question 06",
    "search_text": "MOLE-Q06 JEE Main Mole Concept Stoichiometry Q06 Avogadro molarity limiting reagent concentration chemistry"
  },
  {
    "id": "MOLE-Q07",
    "title": "JEE Main 2013-2026: Mole Concept & Stoichiometry Q07",
    "subtitle": "Chemistry · Mole Concept & Stoichiometry · PYQ",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/subject/chemistry/topic/stoichiometry",
    "breadcrumb": "Chemistry · Mole Concept · Question 07",
    "search_text": "MOLE-Q07 JEE Main Mole Concept Stoichiometry Q07 Avogadro molarity limiting reagent concentration chemistry"
  },
  {
    "id": "MOLE-Q08",
    "title": "JEE Main 2013-2026: Mole Concept & Stoichiometry Q08",
    "subtitle": "Chemistry · Mole Concept & Stoichiometry · PYQ",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/subject/chemistry/topic/stoichiometry",
    "breadcrumb": "Chemistry · Mole Concept · Question 08",
    "search_text": "MOLE-Q08 JEE Main Mole Concept Stoichiometry Q08 Avogadro molarity limiting reagent concentration chemistry"
  },
  {
    "id": "MOLE-Q09",
    "title": "JEE Main 2013-2026: Mole Concept & Stoichiometry Q09",
    "subtitle": "Chemistry · Mole Concept & Stoichiometry · PYQ",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/subject/chemistry/topic/stoichiometry",
    "breadcrumb": "Chemistry · Mole Concept · Question 09",
    "search_text": "MOLE-Q09 JEE Main Mole Concept Stoichiometry Q09 Avogadro molarity limiting reagent concentration chemistry"
  },
  {
    "id": "MOLE-Q10",
    "title": "JEE Main 2013-2026: Mole Concept & Stoichiometry Q10",
    "subtitle": "Chemistry · Mole Concept & Stoichiometry · PYQ",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/subject/chemistry/topic/stoichiometry",
    "breadcrumb": "Chemistry · Mole Concept · Question 10",
    "search_text": "MOLE-Q10 JEE Main Mole Concept Stoichiometry Q10 Avogadro molarity limiting reagent concentration chemistry"
  },
  {
    "id": "MOLE-Q11",
    "title": "JEE Main 2013-2026: Mole Concept & Stoichiometry Q11",
    "subtitle": "Chemistry · Mole Concept & Stoichiometry · PYQ",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/subject/chemistry/topic/stoichiometry",
    "breadcrumb": "Chemistry · Mole Concept · Question 11",
    "search_text": "MOLE-Q11 JEE Main Mole Concept Stoichiometry Q11 Avogadro molarity limiting reagent concentration chemistry"
  },
  {
    "id": "MOLE-Q12",
    "title": "JEE Main 2013-2026: Mole Concept & Stoichiometry Q12",
    "subtitle": "Chemistry · Mole Concept & Stoichiometry · PYQ",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/subject/chemistry/topic/stoichiometry",
    "breadcrumb": "Chemistry · Mole Concept · Question 12",
    "search_text": "MOLE-Q12 JEE Main Mole Concept Stoichiometry Q12 Avogadro molarity limiting reagent concentration chemistry"
  },
  {
    "id": "MOLE-Q13",
    "title": "JEE Main 2013-2026: Mole Concept & Stoichiometry Q13",
    "subtitle": "Chemistry · Mole Concept & Stoichiometry · PYQ",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/subject/chemistry/topic/stoichiometry",
    "breadcrumb": "Chemistry · Mole Concept · Question 13",
    "search_text": "MOLE-Q13 JEE Main Mole Concept Stoichiometry Q13 Avogadro molarity limiting reagent concentration chemistry"
  },
  {
    "id": "MOLE-Q14",
    "title": "JEE Main 2013-2026: Mole Concept & Stoichiometry Q14",
    "subtitle": "Chemistry · Mole Concept & Stoichiometry · PYQ",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/subject/chemistry/topic/stoichiometry",
    "breadcrumb": "Chemistry · Mole Concept · Question 14",
    "search_text": "MOLE-Q14 JEE Main Mole Concept Stoichiometry Q14 Avogadro molarity limiting reagent concentration chemistry"
  },
  {
    "id": "MOLE-Q15",
    "title": "JEE Main 2013-2026: Mole Concept & Stoichiometry Q15",
    "subtitle": "Chemistry · Mole Concept & Stoichiometry · PYQ",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/subject/chemistry/topic/stoichiometry",
    "breadcrumb": "Chemistry · Mole Concept · Question 15",
    "search_text": "MOLE-Q15 JEE Main Mole Concept Stoichiometry Q15 Avogadro molarity limiting reagent concentration chemistry"
  },
  {
    "id": "MOLE-Q16",
    "title": "JEE Main 2013-2026: Mole Concept & Stoichiometry Q16",
    "subtitle": "Chemistry · Mole Concept & Stoichiometry · PYQ",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/subject/chemistry/topic/stoichiometry",
    "breadcrumb": "Chemistry · Mole Concept · Question 16",
    "search_text": "MOLE-Q16 JEE Main Mole Concept Stoichiometry Q16 Avogadro molarity limiting reagent concentration chemistry"
  },
  {
    "id": "MOLE-Q17",
    "title": "JEE Main 2013-2026: Mole Concept & Stoichiometry Q17",
    "subtitle": "Chemistry · Mole Concept & Stoichiometry · PYQ",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/subject/chemistry/topic/stoichiometry",
    "breadcrumb": "Chemistry · Mole Concept · Question 17",
    "search_text": "MOLE-Q17 JEE Main Mole Concept Stoichiometry Q17 Avogadro molarity limiting reagent concentration chemistry"
  },
  {
    "id": "MOLE-Q18",
    "title": "JEE Main 2013-2026: Mole Concept & Stoichiometry Q18",
    "subtitle": "Chemistry · Mole Concept & Stoichiometry · PYQ",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/subject/chemistry/topic/stoichiometry",
    "breadcrumb": "Chemistry · Mole Concept · Question 18",
    "search_text": "MOLE-Q18 JEE Main Mole Concept Stoichiometry Q18 Avogadro molarity limiting reagent concentration chemistry"
  },
  {
    "id": "MOLE-Q19",
    "title": "JEE Main 2013-2026: Mole Concept & Stoichiometry Q19",
    "subtitle": "Chemistry · Mole Concept & Stoichiometry · PYQ",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/subject/chemistry/topic/stoichiometry",
    "breadcrumb": "Chemistry · Mole Concept · Question 19",
    "search_text": "MOLE-Q19 JEE Main Mole Concept Stoichiometry Q19 Avogadro molarity limiting reagent concentration chemistry"
  },
  {
    "id": "MOLE-Q20",
    "title": "JEE Main 2013-2026: Mole Concept & Stoichiometry Q20",
    "subtitle": "Chemistry · Mole Concept & Stoichiometry · PYQ",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/subject/chemistry/topic/stoichiometry",
    "breadcrumb": "Chemistry · Mole Concept · Question 20",
    "search_text": "MOLE-Q20 JEE Main Mole Concept Stoichiometry Q20 Avogadro molarity limiting reagent concentration chemistry"
  },
  {
    "id": "MOLE-Q21",
    "title": "JEE Main 2013-2026: Mole Concept & Stoichiometry Q21",
    "subtitle": "Chemistry · Mole Concept & Stoichiometry · PYQ",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/subject/chemistry/topic/stoichiometry",
    "breadcrumb": "Chemistry · Mole Concept · Question 21",
    "search_text": "MOLE-Q21 JEE Main Mole Concept Stoichiometry Q21 Avogadro molarity limiting reagent concentration chemistry"
  },
  {
    "id": "MOLE-Q22",
    "title": "JEE Main 2013-2026: Mole Concept & Stoichiometry Q22",
    "subtitle": "Chemistry · Mole Concept & Stoichiometry · PYQ",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/subject/chemistry/topic/stoichiometry",
    "breadcrumb": "Chemistry · Mole Concept · Question 22",
    "search_text": "MOLE-Q22 JEE Main Mole Concept Stoichiometry Q22 Avogadro molarity limiting reagent concentration chemistry"
  },
  {
    "id": "MOLE-Q23",
    "title": "JEE Main 2013-2026: Mole Concept & Stoichiometry Q23",
    "subtitle": "Chemistry · Mole Concept & Stoichiometry · PYQ",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/subject/chemistry/topic/stoichiometry",
    "breadcrumb": "Chemistry · Mole Concept · Question 23",
    "search_text": "MOLE-Q23 JEE Main Mole Concept Stoichiometry Q23 Avogadro molarity limiting reagent concentration chemistry"
  },
  {
    "id": "MOLE-Q24",
    "title": "JEE Main 2013-2026: Mole Concept & Stoichiometry Q24",
    "subtitle": "Chemistry · Mole Concept & Stoichiometry · PYQ",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/subject/chemistry/topic/stoichiometry",
    "breadcrumb": "Chemistry · Mole Concept · Question 24",
    "search_text": "MOLE-Q24 JEE Main Mole Concept Stoichiometry Q24 Avogadro molarity limiting reagent concentration chemistry"
  },
  {
    "id": "MOLE-Q25",
    "title": "JEE Main 2013-2026: Mole Concept & Stoichiometry Q25",
    "subtitle": "Chemistry · Mole Concept & Stoichiometry · PYQ",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/subject/chemistry/topic/stoichiometry",
    "breadcrumb": "Chemistry · Mole Concept · Question 25",
    "search_text": "MOLE-Q25 JEE Main Mole Concept Stoichiometry Q25 Avogadro molarity limiting reagent concentration chemistry"
  },
  {
    "id": "MOLE-Q26",
    "title": "JEE Main 2013-2026: Mole Concept & Stoichiometry Q26",
    "subtitle": "Chemistry · Mole Concept & Stoichiometry · PYQ",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/subject/chemistry/topic/stoichiometry",
    "breadcrumb": "Chemistry · Mole Concept · Question 26",
    "search_text": "MOLE-Q26 JEE Main Mole Concept Stoichiometry Q26 Avogadro molarity limiting reagent concentration chemistry"
  },
  {
    "id": "MOLE-Q27",
    "title": "JEE Main 2013-2026: Mole Concept & Stoichiometry Q27",
    "subtitle": "Chemistry · Mole Concept & Stoichiometry · PYQ",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/subject/chemistry/topic/stoichiometry",
    "breadcrumb": "Chemistry · Mole Concept · Question 27",
    "search_text": "MOLE-Q27 JEE Main Mole Concept Stoichiometry Q27 Avogadro molarity limiting reagent concentration chemistry"
  },
  {
    "id": "MOLE-Q28",
    "title": "JEE Main 2013-2026: Mole Concept & Stoichiometry Q28",
    "subtitle": "Chemistry · Mole Concept & Stoichiometry · PYQ",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/subject/chemistry/topic/stoichiometry",
    "breadcrumb": "Chemistry · Mole Concept · Question 28",
    "search_text": "MOLE-Q28 JEE Main Mole Concept Stoichiometry Q28 Avogadro molarity limiting reagent concentration chemistry"
  },
  {
    "id": "MOLE-Q29",
    "title": "JEE Main 2013-2026: Mole Concept & Stoichiometry Q29",
    "subtitle": "Chemistry · Mole Concept & Stoichiometry · PYQ",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/subject/chemistry/topic/stoichiometry",
    "breadcrumb": "Chemistry · Mole Concept · Question 29",
    "search_text": "MOLE-Q29 JEE Main Mole Concept Stoichiometry Q29 Avogadro molarity limiting reagent concentration chemistry"
  },
  {
    "id": "MOLE-Q30",
    "title": "JEE Main 2013-2026: Mole Concept & Stoichiometry Q30",
    "subtitle": "Chemistry · Mole Concept & Stoichiometry · PYQ",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/subject/chemistry/topic/stoichiometry",
    "breadcrumb": "Chemistry · Mole Concept · Question 30",
    "search_text": "MOLE-Q30 JEE Main Mole Concept Stoichiometry Q30 Avogadro molarity limiting reagent concentration chemistry"
  },
  {
    "id": "M1D-Q01",
    "title": "JEE Main 2014-2026: Motion in 1D Rectilinear Mechanics Q01",
    "subtitle": "Physics · Motion in 1D · Kinematics PYQ",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/subject/physics/topic/motion-1d",
    "breadcrumb": "Physics · Motion in 1D · Question 01",
    "search_text": "M1D-Q01 JEE Main Motion in 1D Rectilinear Mechanics Q01 velocity acceleration displacement time graph physics"
  },
  {
    "id": "M1D-Q02",
    "title": "JEE Main 2014-2026: Motion in 1D Rectilinear Mechanics Q02",
    "subtitle": "Physics · Motion in 1D · Kinematics PYQ",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/subject/physics/topic/motion-1d",
    "breadcrumb": "Physics · Motion in 1D · Question 02",
    "search_text": "M1D-Q02 JEE Main Motion in 1D Rectilinear Mechanics Q02 velocity acceleration displacement time graph physics"
  },
  {
    "id": "M1D-Q03",
    "title": "JEE Main 2014-2026: Motion in 1D Rectilinear Mechanics Q03",
    "subtitle": "Physics · Motion in 1D · Kinematics PYQ",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/subject/physics/topic/motion-1d",
    "breadcrumb": "Physics · Motion in 1D · Question 03",
    "search_text": "M1D-Q03 JEE Main Motion in 1D Rectilinear Mechanics Q03 velocity acceleration displacement time graph physics"
  },
  {
    "id": "M1D-Q04",
    "title": "JEE Main 2014-2026: Motion in 1D Rectilinear Mechanics Q04",
    "subtitle": "Physics · Motion in 1D · Kinematics PYQ",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/subject/physics/topic/motion-1d",
    "breadcrumb": "Physics · Motion in 1D · Question 04",
    "search_text": "M1D-Q04 JEE Main Motion in 1D Rectilinear Mechanics Q04 velocity acceleration displacement time graph physics"
  },
  {
    "id": "M1D-Q05",
    "title": "JEE Main 2014-2026: Motion in 1D Rectilinear Mechanics Q05",
    "subtitle": "Physics · Motion in 1D · Kinematics PYQ",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/subject/physics/topic/motion-1d",
    "breadcrumb": "Physics · Motion in 1D · Question 05",
    "search_text": "M1D-Q05 JEE Main Motion in 1D Rectilinear Mechanics Q05 velocity acceleration displacement time graph physics"
  },
  {
    "id": "M1D-Q06",
    "title": "JEE Main 2014-2026: Motion in 1D Rectilinear Mechanics Q06",
    "subtitle": "Physics · Motion in 1D · Kinematics PYQ",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/subject/physics/topic/motion-1d",
    "breadcrumb": "Physics · Motion in 1D · Question 06",
    "search_text": "M1D-Q06 JEE Main Motion in 1D Rectilinear Mechanics Q06 velocity acceleration displacement time graph physics"
  },
  {
    "id": "M1D-Q07",
    "title": "JEE Main 2014-2026: Motion in 1D Rectilinear Mechanics Q07",
    "subtitle": "Physics · Motion in 1D · Kinematics PYQ",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/subject/physics/topic/motion-1d",
    "breadcrumb": "Physics · Motion in 1D · Question 07",
    "search_text": "M1D-Q07 JEE Main Motion in 1D Rectilinear Mechanics Q07 velocity acceleration displacement time graph physics"
  },
  {
    "id": "M1D-Q08",
    "title": "JEE Main 2014-2026: Motion in 1D Rectilinear Mechanics Q08",
    "subtitle": "Physics · Motion in 1D · Kinematics PYQ",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/subject/physics/topic/motion-1d",
    "breadcrumb": "Physics · Motion in 1D · Question 08",
    "search_text": "M1D-Q08 JEE Main Motion in 1D Rectilinear Mechanics Q08 velocity acceleration displacement time graph physics"
  },
  {
    "id": "M1D-Q09",
    "title": "JEE Main 2014-2026: Motion in 1D Rectilinear Mechanics Q09",
    "subtitle": "Physics · Motion in 1D · Kinematics PYQ",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/subject/physics/topic/motion-1d",
    "breadcrumb": "Physics · Motion in 1D · Question 09",
    "search_text": "M1D-Q09 JEE Main Motion in 1D Rectilinear Mechanics Q09 velocity acceleration displacement time graph physics"
  },
  {
    "id": "M1D-Q10",
    "title": "JEE Main 2014-2026: Motion in 1D Rectilinear Mechanics Q10",
    "subtitle": "Physics · Motion in 1D · Kinematics PYQ",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/subject/physics/topic/motion-1d",
    "breadcrumb": "Physics · Motion in 1D · Question 10",
    "search_text": "M1D-Q10 JEE Main Motion in 1D Rectilinear Mechanics Q10 velocity acceleration displacement time graph physics"
  },
  {
    "id": "M1D-Q11",
    "title": "JEE Main 2014-2026: Motion in 1D Rectilinear Mechanics Q11",
    "subtitle": "Physics · Motion in 1D · Kinematics PYQ",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/subject/physics/topic/motion-1d",
    "breadcrumb": "Physics · Motion in 1D · Question 11",
    "search_text": "M1D-Q11 JEE Main Motion in 1D Rectilinear Mechanics Q11 velocity acceleration displacement time graph physics"
  },
  {
    "id": "M1D-Q12",
    "title": "JEE Main 2014-2026: Motion in 1D Rectilinear Mechanics Q12",
    "subtitle": "Physics · Motion in 1D · Kinematics PYQ",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/subject/physics/topic/motion-1d",
    "breadcrumb": "Physics · Motion in 1D · Question 12",
    "search_text": "M1D-Q12 JEE Main Motion in 1D Rectilinear Mechanics Q12 velocity acceleration displacement time graph physics"
  },
  {
    "id": "M1D-Q13",
    "title": "JEE Main 2014-2026: Motion in 1D Rectilinear Mechanics Q13",
    "subtitle": "Physics · Motion in 1D · Kinematics PYQ",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/subject/physics/topic/motion-1d",
    "breadcrumb": "Physics · Motion in 1D · Question 13",
    "search_text": "M1D-Q13 JEE Main Motion in 1D Rectilinear Mechanics Q13 velocity acceleration displacement time graph physics"
  },
  {
    "id": "M1D-Q14",
    "title": "JEE Main 2014-2026: Motion in 1D Rectilinear Mechanics Q14",
    "subtitle": "Physics · Motion in 1D · Kinematics PYQ",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/subject/physics/topic/motion-1d",
    "breadcrumb": "Physics · Motion in 1D · Question 14",
    "search_text": "M1D-Q14 JEE Main Motion in 1D Rectilinear Mechanics Q14 velocity acceleration displacement time graph physics"
  },
  {
    "id": "M1D-Q15",
    "title": "JEE Main 2014-2026: Motion in 1D Rectilinear Mechanics Q15",
    "subtitle": "Physics · Motion in 1D · Kinematics PYQ",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/subject/physics/topic/motion-1d",
    "breadcrumb": "Physics · Motion in 1D · Question 15",
    "search_text": "M1D-Q15 JEE Main Motion in 1D Rectilinear Mechanics Q15 velocity acceleration displacement time graph physics"
  },
  {
    "id": "M1D-Q16",
    "title": "JEE Main 2014-2026: Motion in 1D Rectilinear Mechanics Q16",
    "subtitle": "Physics · Motion in 1D · Kinematics PYQ",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/subject/physics/topic/motion-1d",
    "breadcrumb": "Physics · Motion in 1D · Question 16",
    "search_text": "M1D-Q16 JEE Main Motion in 1D Rectilinear Mechanics Q16 velocity acceleration displacement time graph physics"
  },
  {
    "id": "M1D-Q17",
    "title": "JEE Main 2014-2026: Motion in 1D Rectilinear Mechanics Q17",
    "subtitle": "Physics · Motion in 1D · Kinematics PYQ",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/subject/physics/topic/motion-1d",
    "breadcrumb": "Physics · Motion in 1D · Question 17",
    "search_text": "M1D-Q17 JEE Main Motion in 1D Rectilinear Mechanics Q17 velocity acceleration displacement time graph physics"
  },
  {
    "id": "M1D-Q18",
    "title": "JEE Main 2014-2026: Motion in 1D Rectilinear Mechanics Q18",
    "subtitle": "Physics · Motion in 1D · Kinematics PYQ",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/subject/physics/topic/motion-1d",
    "breadcrumb": "Physics · Motion in 1D · Question 18",
    "search_text": "M1D-Q18 JEE Main Motion in 1D Rectilinear Mechanics Q18 velocity acceleration displacement time graph physics"
  },
  {
    "id": "M1D-Q19",
    "title": "JEE Main 2014-2026: Motion in 1D Rectilinear Mechanics Q19",
    "subtitle": "Physics · Motion in 1D · Kinematics PYQ",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/subject/physics/topic/motion-1d",
    "breadcrumb": "Physics · Motion in 1D · Question 19",
    "search_text": "M1D-Q19 JEE Main Motion in 1D Rectilinear Mechanics Q19 velocity acceleration displacement time graph physics"
  },
  {
    "id": "M1D-Q20",
    "title": "JEE Main 2014-2026: Motion in 1D Rectilinear Mechanics Q20",
    "subtitle": "Physics · Motion in 1D · Kinematics PYQ",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/subject/physics/topic/motion-1d",
    "breadcrumb": "Physics · Motion in 1D · Question 20",
    "search_text": "M1D-Q20 JEE Main Motion in 1D Rectilinear Mechanics Q20 velocity acceleration displacement time graph physics"
  },
  {
    "id": "M1D-Q21",
    "title": "JEE Main 2014-2026: Motion in 1D Rectilinear Mechanics Q21",
    "subtitle": "Physics · Motion in 1D · Kinematics PYQ",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/subject/physics/topic/motion-1d",
    "breadcrumb": "Physics · Motion in 1D · Question 21",
    "search_text": "M1D-Q21 JEE Main Motion in 1D Rectilinear Mechanics Q21 velocity acceleration displacement time graph physics"
  },
  {
    "id": "M1D-Q22",
    "title": "JEE Main 2014-2026: Motion in 1D Rectilinear Mechanics Q22",
    "subtitle": "Physics · Motion in 1D · Kinematics PYQ",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/subject/physics/topic/motion-1d",
    "breadcrumb": "Physics · Motion in 1D · Question 22",
    "search_text": "M1D-Q22 JEE Main Motion in 1D Rectilinear Mechanics Q22 velocity acceleration displacement time graph physics"
  },
  {
    "id": "M1D-Q23",
    "title": "JEE Main 2014-2026: Motion in 1D Rectilinear Mechanics Q23",
    "subtitle": "Physics · Motion in 1D · Kinematics PYQ",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/subject/physics/topic/motion-1d",
    "breadcrumb": "Physics · Motion in 1D · Question 23",
    "search_text": "M1D-Q23 JEE Main Motion in 1D Rectilinear Mechanics Q23 velocity acceleration displacement time graph physics"
  },
  {
    "id": "M1D-Q24",
    "title": "JEE Main 2014-2026: Motion in 1D Rectilinear Mechanics Q24",
    "subtitle": "Physics · Motion in 1D · Kinematics PYQ",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/subject/physics/topic/motion-1d",
    "breadcrumb": "Physics · Motion in 1D · Question 24",
    "search_text": "M1D-Q24 JEE Main Motion in 1D Rectilinear Mechanics Q24 velocity acceleration displacement time graph physics"
  },
  {
    "id": "M1D-Q25",
    "title": "JEE Main 2014-2026: Motion in 1D Rectilinear Mechanics Q25",
    "subtitle": "Physics · Motion in 1D · Kinematics PYQ",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/subject/physics/topic/motion-1d",
    "breadcrumb": "Physics · Motion in 1D · Question 25",
    "search_text": "M1D-Q25 JEE Main Motion in 1D Rectilinear Mechanics Q25 velocity acceleration displacement time graph physics"
  },
  {
    "id": "M2D-Q01",
    "title": "JEE Main 2015-2026: Motion in a Plane Projectile Q01",
    "subtitle": "Physics · Motion in 2D & Kinematics · PYQ",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/subject/physics/topic/motion-plane",
    "breadcrumb": "Physics · Motion in 2D · Question 01",
    "search_text": "M2D-Q01 JEE Main Motion in a Plane Projectile Q01 trajectory angle velocity components range physics"
  },
  {
    "id": "M2D-Q02",
    "title": "JEE Main 2015-2026: Motion in a Plane Projectile Q02",
    "subtitle": "Physics · Motion in 2D & Kinematics · PYQ",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/subject/physics/topic/motion-plane",
    "breadcrumb": "Physics · Motion in 2D · Question 02",
    "search_text": "M2D-Q02 JEE Main Motion in a Plane Projectile Q02 trajectory angle velocity components range physics"
  },
  {
    "id": "M2D-Q03",
    "title": "JEE Main 2015-2026: Motion in a Plane Projectile Q03",
    "subtitle": "Physics · Motion in 2D & Kinematics · PYQ",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/subject/physics/topic/motion-plane",
    "breadcrumb": "Physics · Motion in 2D · Question 03",
    "search_text": "M2D-Q03 JEE Main Motion in a Plane Projectile Q03 trajectory angle velocity components range physics"
  },
  {
    "id": "M2D-Q04",
    "title": "JEE Main 2015-2026: Motion in a Plane Projectile Q04",
    "subtitle": "Physics · Motion in 2D & Kinematics · PYQ",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/subject/physics/topic/motion-plane",
    "breadcrumb": "Physics · Motion in 2D · Question 04",
    "search_text": "M2D-Q04 JEE Main Motion in a Plane Projectile Q04 trajectory angle velocity components range physics"
  },
  {
    "id": "M2D-Q05",
    "title": "JEE Main 2015-2026: Motion in a Plane Projectile Q05",
    "subtitle": "Physics · Motion in 2D & Kinematics · PYQ",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/subject/physics/topic/motion-plane",
    "breadcrumb": "Physics · Motion in 2D · Question 05",
    "search_text": "M2D-Q05 JEE Main Motion in a Plane Projectile Q05 trajectory angle velocity components range physics"
  },
  {
    "id": "M2D-Q06",
    "title": "JEE Main 2015-2026: Motion in a Plane Projectile Q06",
    "subtitle": "Physics · Motion in 2D & Kinematics · PYQ",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/subject/physics/topic/motion-plane",
    "breadcrumb": "Physics · Motion in 2D · Question 06",
    "search_text": "M2D-Q06 JEE Main Motion in a Plane Projectile Q06 trajectory angle velocity components range physics"
  },
  {
    "id": "M2D-Q07",
    "title": "JEE Main 2015-2026: Motion in a Plane Projectile Q07",
    "subtitle": "Physics · Motion in 2D & Kinematics · PYQ",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/subject/physics/topic/motion-plane",
    "breadcrumb": "Physics · Motion in 2D · Question 07",
    "search_text": "M2D-Q07 JEE Main Motion in a Plane Projectile Q07 trajectory angle velocity components range physics"
  },
  {
    "id": "M2D-Q08",
    "title": "JEE Main 2015-2026: Motion in a Plane Projectile Q08",
    "subtitle": "Physics · Motion in 2D & Kinematics · PYQ",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/subject/physics/topic/motion-plane",
    "breadcrumb": "Physics · Motion in 2D · Question 08",
    "search_text": "M2D-Q08 JEE Main Motion in a Plane Projectile Q08 trajectory angle velocity components range physics"
  },
  {
    "id": "M2D-Q09",
    "title": "JEE Main 2015-2026: Motion in a Plane Projectile Q09",
    "subtitle": "Physics · Motion in 2D & Kinematics · PYQ",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/subject/physics/topic/motion-plane",
    "breadcrumb": "Physics · Motion in 2D · Question 09",
    "search_text": "M2D-Q09 JEE Main Motion in a Plane Projectile Q09 trajectory angle velocity components range physics"
  },
  {
    "id": "M2D-Q10",
    "title": "JEE Main 2015-2026: Motion in a Plane Projectile Q10",
    "subtitle": "Physics · Motion in 2D & Kinematics · PYQ",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/subject/physics/topic/motion-plane",
    "breadcrumb": "Physics · Motion in 2D · Question 10",
    "search_text": "M2D-Q10 JEE Main Motion in a Plane Projectile Q10 trajectory angle velocity components range physics"
  },
  {
    "id": "M2D-Q11",
    "title": "JEE Main 2015-2026: Motion in a Plane Projectile Q11",
    "subtitle": "Physics · Motion in 2D & Kinematics · PYQ",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/subject/physics/topic/motion-plane",
    "breadcrumb": "Physics · Motion in 2D · Question 11",
    "search_text": "M2D-Q11 JEE Main Motion in a Plane Projectile Q11 trajectory angle velocity components range physics"
  },
  {
    "id": "M2D-Q12",
    "title": "JEE Main 2015-2026: Motion in a Plane Projectile Q12",
    "subtitle": "Physics · Motion in 2D & Kinematics · PYQ",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/subject/physics/topic/motion-plane",
    "breadcrumb": "Physics · Motion in 2D · Question 12",
    "search_text": "M2D-Q12 JEE Main Motion in a Plane Projectile Q12 trajectory angle velocity components range physics"
  },
  {
    "id": "M2D-Q13",
    "title": "JEE Main 2015-2026: Motion in a Plane Projectile Q13",
    "subtitle": "Physics · Motion in 2D & Kinematics · PYQ",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/subject/physics/topic/motion-plane",
    "breadcrumb": "Physics · Motion in 2D · Question 13",
    "search_text": "M2D-Q13 JEE Main Motion in a Plane Projectile Q13 trajectory angle velocity components range physics"
  },
  {
    "id": "M2D-Q14",
    "title": "JEE Main 2015-2026: Motion in a Plane Projectile Q14",
    "subtitle": "Physics · Motion in 2D & Kinematics · PYQ",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/subject/physics/topic/motion-plane",
    "breadcrumb": "Physics · Motion in 2D · Question 14",
    "search_text": "M2D-Q14 JEE Main Motion in a Plane Projectile Q14 trajectory angle velocity components range physics"
  },
  {
    "id": "M2D-Q15",
    "title": "JEE Main 2015-2026: Motion in a Plane Projectile Q15",
    "subtitle": "Physics · Motion in 2D & Kinematics · PYQ",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/subject/physics/topic/motion-plane",
    "breadcrumb": "Physics · Motion in 2D · Question 15",
    "search_text": "M2D-Q15 JEE Main Motion in a Plane Projectile Q15 trajectory angle velocity components range physics"
  },
  {
    "id": "M2D-Q16",
    "title": "JEE Main 2015-2026: Motion in a Plane Projectile Q16",
    "subtitle": "Physics · Motion in 2D & Kinematics · PYQ",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/subject/physics/topic/motion-plane",
    "breadcrumb": "Physics · Motion in 2D · Question 16",
    "search_text": "M2D-Q16 JEE Main Motion in a Plane Projectile Q16 trajectory angle velocity components range physics"
  },
  {
    "id": "M2D-Q17",
    "title": "JEE Main 2015-2026: Motion in a Plane Projectile Q17",
    "subtitle": "Physics · Motion in 2D & Kinematics · PYQ",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/subject/physics/topic/motion-plane",
    "breadcrumb": "Physics · Motion in 2D · Question 17",
    "search_text": "M2D-Q17 JEE Main Motion in a Plane Projectile Q17 trajectory angle velocity components range physics"
  },
  {
    "id": "M2D-Q18",
    "title": "JEE Main 2015-2026: Motion in a Plane Projectile Q18",
    "subtitle": "Physics · Motion in 2D & Kinematics · PYQ",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/subject/physics/topic/motion-plane",
    "breadcrumb": "Physics · Motion in 2D · Question 18",
    "search_text": "M2D-Q18 JEE Main Motion in a Plane Projectile Q18 trajectory angle velocity components range physics"
  },
  {
    "id": "M2D-Q19",
    "title": "JEE Main 2015-2026: Motion in a Plane Projectile Q19",
    "subtitle": "Physics · Motion in 2D & Kinematics · PYQ",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/subject/physics/topic/motion-plane",
    "breadcrumb": "Physics · Motion in 2D · Question 19",
    "search_text": "M2D-Q19 JEE Main Motion in a Plane Projectile Q19 trajectory angle velocity components range physics"
  },
  {
    "id": "M2D-Q20",
    "title": "JEE Main 2015-2026: Motion in a Plane Projectile Q20",
    "subtitle": "Physics · Motion in 2D & Kinematics · PYQ",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/subject/physics/topic/motion-plane",
    "breadcrumb": "Physics · Motion in 2D · Question 20",
    "search_text": "M2D-Q20 JEE Main Motion in a Plane Projectile Q20 trajectory angle velocity components range physics"
  },
  {
    "id": "M2D-Q21",
    "title": "JEE Main 2015-2026: Motion in a Plane Projectile Q21",
    "subtitle": "Physics · Motion in 2D & Kinematics · PYQ",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/subject/physics/topic/motion-plane",
    "breadcrumb": "Physics · Motion in 2D · Question 21",
    "search_text": "M2D-Q21 JEE Main Motion in a Plane Projectile Q21 trajectory angle velocity components range physics"
  },
  {
    "id": "M2D-Q22",
    "title": "JEE Main 2015-2026: Motion in a Plane Projectile Q22",
    "subtitle": "Physics · Motion in 2D & Kinematics · PYQ",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/subject/physics/topic/motion-plane",
    "breadcrumb": "Physics · Motion in 2D · Question 22",
    "search_text": "M2D-Q22 JEE Main Motion in a Plane Projectile Q22 trajectory angle velocity components range physics"
  },
  {
    "id": "M2D-Q23",
    "title": "JEE Main 2015-2026: Motion in a Plane Projectile Q23",
    "subtitle": "Physics · Motion in 2D & Kinematics · PYQ",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/subject/physics/topic/motion-plane",
    "breadcrumb": "Physics · Motion in 2D · Question 23",
    "search_text": "M2D-Q23 JEE Main Motion in a Plane Projectile Q23 trajectory angle velocity components range physics"
  },
  {
    "id": "M2D-Q24",
    "title": "JEE Main 2015-2026: Motion in a Plane Projectile Q24",
    "subtitle": "Physics · Motion in 2D & Kinematics · PYQ",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/subject/physics/topic/motion-plane",
    "breadcrumb": "Physics · Motion in 2D · Question 24",
    "search_text": "M2D-Q24 JEE Main Motion in a Plane Projectile Q24 trajectory angle velocity components range physics"
  },
  {
    "id": "M2D-Q25",
    "title": "JEE Main 2015-2026: Motion in a Plane Projectile Q25",
    "subtitle": "Physics · Motion in 2D & Kinematics · PYQ",
    "category": "question",
    "type": "QUESTION",
    "badge": "QUESTION",
    "route": "#/subject/physics/topic/motion-plane",
    "breadcrumb": "Physics · Motion in 2D · Question 25",
    "search_text": "M2D-Q25 JEE Main Motion in a Plane Projectile Q25 trajectory angle velocity components range physics"
  }
]);

function scoreItem(item: UniversalSearchDoc, tokens: string[], term: string): number {
  let score = 1000;
  const titleNorm = normalizeSearchTerm(item.title);
  const idNorm = normalizeSearchTerm(item.id);
  const textNorm = normalizeSearchTerm(item.search_text);

  if (idNorm === term || item.id === term || idNorm === 'q ' + term) score += 25000;
  else if (idNorm.includes(term)) score += 5000;

  if (titleNorm === term) score += 15000;
  else if (titleNorm.startsWith(term)) score += 6000;
  else if (tokens.length > 0 && tokens.every(tok => titleNorm.includes(tok))) score += 3000;
  else if (tokens.some(tok => titleNorm.includes(tok))) score += 1000;

  if (tokens.length > 0 && tokens.every(tok => textNorm.includes(tok))) score += 500;
  if (textNorm.includes(term)) score += 300;

  return score;
}

/**
 * Queries the universal index with optional category filtering and dynamic counts.
 */
export function queryUniversalSearch(query: string = '', category: string = 'all'): UniversalSearchResponse {
  const start = typeof performance !== 'undefined' ? performance.now() : Date.now();
  const term = normalizeSearchTerm(query);
  const tokens = term.split(/\s+/).filter(Boolean);

  let matched: UniversalSearchDoc[];
  if (!term) {
    matched = [...UNIVERSAL_SEARCH_CORPUS];
  } else {
    matched = UNIVERSAL_SEARCH_CORPUS.filter(item => {
      const hay = normalizeSearchTerm([item.title, item.id, item.search_text, item.type].join(' '));
      return tokens.every(t => {
        if (hay.includes(t)) return true;
        if (t.length >= 4) {
          const stem = t.slice(0, 4);
          if (hay.includes(stem)) return true;
        }
        return false;
      });
    });

    matched.sort((a, b) => scoreItem(b, tokens, term) - scoreItem(a, tokens, term));
  }

  const countAll = matched.length;
  const countQuestions = matched.filter(m => m.category === 'question').length;
  const countTablets = matched.filter(m => m.category === 'tablet').length;
  const countCurriculum = matched.filter(m => m.category === 'curriculum').length;

  const counts: UniversalSearchCounts = {
    all: countAll,
    question: countQuestions,
    tablet: countTablets,
    curriculum: countCurriculum,
  };

  let results: UniversalSearchDoc[];
  if (category === 'question') {
    results = matched.filter(m => m.category === 'question');
  } else if (category === 'tablet') {
    results = matched.filter(m => m.category === 'tablet');
  } else if (category === 'curriculum') {
    results = matched.filter(m => m.category === 'curriculum');
  } else {
    results = matched;
  }

  const end = typeof performance !== 'undefined' ? performance.now() : Date.now();
  return {
    query,
    category,
    totalMatches: results.length,
    executionTimeMs: Math.round((end - start) * 100) / 100,
    counts,
    results,
  };
}
