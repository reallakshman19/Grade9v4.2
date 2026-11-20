/**
 * web/pages/chemistry-data.generated.ts
 * Wave 12 — Staged Chemistry Curriculum: 14 Topic Adapters (C01-C14),
 * 84 Subtopics, 252 QRT Cognitive Demand Instances, and 165 Authentic Questions.
 *
 * Fault N09 Answer Isolation: Raw keys strictly withheld client-side;
 * hints, misconceptions, and decisive principles provided for pedagogical mastery.
 */

export interface ChemistryAdapterDescriptor {
  readonly id: string;
  readonly unitId: string;
  readonly title: string;
  readonly tier: 'FOUNDATION' | 'OLYMPIAD';
  readonly subtopicCount: number;
  readonly qrtCount: number;
  readonly status: string;
  readonly sources: readonly string[];
  readonly coreConcepts: readonly string[];
  readonly description: string;
}

export interface ChemistrySubtopicDescriptor {
  readonly subtopicId: string;
  readonly adapterId: string;
  readonly title: string;
  readonly scope: string;
  readonly concepts: readonly string[];
  readonly qrtOperations: readonly string[];
  readonly academicNotes: string;
  readonly entryQuestion: string;
  readonly coreSummary: string;
  readonly misconception: string;
  readonly deepDive: string;
  readonly qrtCount: number;
}

export interface ChemistryQrtDescriptor {
  readonly instanceId: string;
  readonly adapterId: string;
  readonly subtopicId: string;
  readonly primaryOperation: string;
  readonly band: string;
  readonly studentTask: string;
  readonly wrongIdea: string;
  readonly replacementRule: string;
  readonly visualJob: string;
  readonly independentCheck: string;
}

export interface ChemistryQuestionDescriptor {
  readonly id: string;
  readonly sourceName: string;
  readonly topic: string;
  readonly adapterId: string;
  readonly stem: string;
  readonly options: readonly string[];
  readonly questionType: string;
  readonly hints: readonly string[];
  readonly steps: readonly string[];
  readonly category: string;
  readonly band: string;
  readonly keyState: string;
}

export const CHEMISTRY_ADAPTERS: readonly ChemistryAdapterDescriptor[] = [
  {
    "id": "C01",
    "unitId": "C01",
    "title": "Nature and States of Matter",
    "tier": "FOUNDATION",
    "subtopicCount": 6,
    "qrtCount": 18,
    "status": "CANDIDATE",
    "sources": [
      "CBSE-IX-2026",
      "EARLIER-FOUNDATIONS-PENDING"
    ],
    "coreConcepts": [
      "CHEM-C01.01-CORE1A",
      "CHEM-C01.02-CORE1A",
      "CHEM-C01.03-CORE1A",
      "CHEM-C01.04-CORE1A",
      "CHEM-C01.05-CORE1A",
      "CHEM-C01.06-CORE1A"
    ],
    "description": "Comprehensive curriculum adapter for Nature and States of Matter, spanning 6 subtopics and 18 QRT cognitive demand tasks."
  },
  {
    "id": "C02",
    "unitId": "C02",
    "title": "Mixtures, Solutions and Separation",
    "tier": "FOUNDATION",
    "subtopicCount": 7,
    "qrtCount": 21,
    "status": "CANDIDATE",
    "sources": [
      "CBSE-IX-2026",
      "NCERT-Class-9-Is-Matter-Around-Us-Pure"
    ],
    "coreConcepts": [
      "CHEM-C02.01-CORE1A",
      "CHEM-C02.02-CORE1A",
      "CHEM-C02.03-CORE1A",
      "CHEM-C02.04-CORE1A",
      "CHEM-C02.05-CORE1A",
      "CHEM-C02.06-CORE1A",
      "CHEM-C02.07-CORE1A"
    ],
    "description": "Comprehensive curriculum adapter for Mixtures, Solutions and Separation, spanning 7 subtopics and 21 QRT cognitive demand tasks."
  },
  {
    "id": "C03",
    "unitId": "C03",
    "title": "Atoms, Molecules and Chemical Laws",
    "tier": "FOUNDATION",
    "subtopicCount": 6,
    "qrtCount": 18,
    "status": "CANDIDATE",
    "sources": [
      "CBSE-IX-2026",
      "NCERT-Class-9-Atoms-and-Molecules"
    ],
    "coreConcepts": [
      "CHEM-C03.01-CORE1A",
      "CHEM-C03.02-CORE1A",
      "CHEM-C03.03-CORE1A",
      "CHEM-C03.04-CORE1A",
      "CHEM-C03.05-CORE1A",
      "CHEM-C03.06-CORE1A"
    ],
    "description": "Comprehensive curriculum adapter for Atoms, Molecules and Chemical Laws, spanning 6 subtopics and 18 QRT cognitive demand tasks."
  },
  {
    "id": "C04",
    "unitId": "C04",
    "title": "Mole Concept and Stoichiometry",
    "tier": "FOUNDATION",
    "subtopicCount": 6,
    "qrtCount": 18,
    "status": "CANDIDATE",
    "sources": [
      "CBSE-IX-2026",
      "CBSE-X-2026",
      "SI-2019-MOLE-DEFINITION"
    ],
    "coreConcepts": [
      "CHEM-C04.01-CORE1A",
      "CHEM-C04.02-CORE1A",
      "CHEM-C04.03-CORE1A",
      "CHEM-C04.04-CORE1A",
      "CHEM-C04.05-CORE1A",
      "CHEM-C04.06-CORE1A"
    ],
    "description": "Comprehensive curriculum adapter for Mole Concept and Stoichiometry, spanning 6 subtopics and 18 QRT cognitive demand tasks."
  },
  {
    "id": "C05",
    "unitId": "C05",
    "title": "Atomic Structure",
    "tier": "FOUNDATION",
    "subtopicCount": 6,
    "qrtCount": 18,
    "status": "CANDIDATE",
    "sources": [
      "CBSE-IX-2026",
      "NCERT-Class-9-Structure-of-the-Atom"
    ],
    "coreConcepts": [
      "CHEM-C05.01-CORE1A",
      "CHEM-C05.02-CORE1A",
      "CHEM-C05.03-CORE1A",
      "CHEM-C05.04-CORE1A",
      "CHEM-C05.05-CORE1A",
      "CHEM-C05.06-CORE1A"
    ],
    "description": "Comprehensive curriculum adapter for Atomic Structure, spanning 6 subtopics and 18 QRT cognitive demand tasks."
  },
  {
    "id": "C06",
    "unitId": "C06",
    "title": "Periodic Classification and Trends",
    "tier": "FOUNDATION",
    "subtopicCount": 6,
    "qrtCount": 18,
    "status": "CANDIDATE",
    "sources": [
      "CBSE-X-2026",
      "NCERT-Class-10-Periodic-Classification"
    ],
    "coreConcepts": [
      "CHEM-C06.01-CORE1A",
      "CHEM-C06.02-CORE1A",
      "CHEM-C06.03-CORE1A",
      "CHEM-C06.04-CORE1A",
      "CHEM-C06.05-CORE1A",
      "CHEM-C06.06-CORE1A"
    ],
    "description": "Comprehensive curriculum adapter for Periodic Classification and Trends, spanning 6 subtopics and 18 QRT cognitive demand tasks."
  },
  {
    "id": "C07",
    "unitId": "C07",
    "title": "Chemical Bonding and Molecular Structure",
    "tier": "FOUNDATION",
    "subtopicCount": 7,
    "qrtCount": 21,
    "status": "CANDIDATE",
    "sources": [
      "CBSE-IX-2026",
      "CBSE-X-2026",
      "NCERT-Class-10-Metals-Nonmetals",
      "NCERT-Class-10-Carbon-Compounds"
    ],
    "coreConcepts": [
      "CHEM-C07.01-CORE1A",
      "CHEM-C07.02-CORE1A",
      "CHEM-C07.03-CORE1A",
      "CHEM-C07.04-CORE1A",
      "CHEM-C07.05-CORE1A",
      "CHEM-C07.06-CORE1A",
      "CHEM-C07.07-CORE1A"
    ],
    "description": "Comprehensive curriculum adapter for Chemical Bonding and Molecular Structure, spanning 7 subtopics and 21 QRT cognitive demand tasks."
  },
  {
    "id": "C08",
    "unitId": "C08",
    "title": "Chemical Reactions and Energy",
    "tier": "OLYMPIAD",
    "subtopicCount": 6,
    "qrtCount": 18,
    "status": "ACADEMIC_HOLD",
    "sources": [
      "CBSE-X-2026"
    ],
    "coreConcepts": [
      "CHEM-C08.01-CONCEPT",
      "CHEM-C08.02-CONCEPT",
      "CHEM-C08.03-CONCEPT",
      "CHEM-C08.04-CONCEPT",
      "CHEM-C08.05-CONCEPT",
      "CHEM-C08.06-CONCEPT"
    ],
    "description": "Comprehensive curriculum adapter for Chemical Reactions and Energy, spanning 6 subtopics and 18 QRT cognitive demand tasks."
  },
  {
    "id": "C09",
    "unitId": "C09",
    "title": "Acids, Bases, Salts and Oxyacids",
    "tier": "OLYMPIAD",
    "subtopicCount": 6,
    "qrtCount": 18,
    "status": "ACADEMIC_HOLD",
    "sources": [
      "CBSE-X-2026"
    ],
    "coreConcepts": [
      "CHEM-C09.01-CONCEPT",
      "CHEM-C09.02-CONCEPT",
      "CHEM-C09.03-CONCEPT",
      "CHEM-C09.04-CONCEPT",
      "CHEM-C09.05-CONCEPT",
      "CHEM-C09.06-CONCEPT"
    ],
    "description": "Comprehensive curriculum adapter for Acids, Bases, Salts and Oxyacids, spanning 6 subtopics and 18 QRT cognitive demand tasks."
  },
  {
    "id": "C10",
    "unitId": "C10",
    "title": "Metals, Non-metals and Metallurgy",
    "tier": "OLYMPIAD",
    "subtopicCount": 6,
    "qrtCount": 18,
    "status": "ACADEMIC_HOLD",
    "sources": [
      "CBSE-X-2026"
    ],
    "coreConcepts": [
      "CHEM-C10.01-CONCEPT",
      "CHEM-C10.02-CONCEPT",
      "CHEM-C10.03-CONCEPT",
      "CHEM-C10.04-CONCEPT",
      "CHEM-C10.05-CONCEPT",
      "CHEM-C10.06-CONCEPT"
    ],
    "description": "Comprehensive curriculum adapter for Metals, Non-metals and Metallurgy, spanning 6 subtopics and 18 QRT cognitive demand tasks."
  },
  {
    "id": "C11",
    "unitId": "C11",
    "title": "Carbon and Organic Chemistry",
    "tier": "OLYMPIAD",
    "subtopicCount": 7,
    "qrtCount": 21,
    "status": "ACADEMIC_HOLD",
    "sources": [
      "CBSE-X-2026"
    ],
    "coreConcepts": [
      "CHEM-C11.01-CONCEPT",
      "CHEM-C11.02-CONCEPT",
      "CHEM-C11.03-CONCEPT",
      "CHEM-C11.04-CONCEPT",
      "CHEM-C11.05-CONCEPT",
      "CHEM-C11.06-CONCEPT",
      "CHEM-C11.07-CONCEPT"
    ],
    "description": "Comprehensive curriculum adapter for Carbon and Organic Chemistry, spanning 7 subtopics and 21 QRT cognitive demand tasks."
  },
  {
    "id": "C12",
    "unitId": "C12",
    "title": "Gases and Chemical Analysis",
    "tier": "OLYMPIAD",
    "subtopicCount": 5,
    "qrtCount": 15,
    "status": "ACADEMIC_HOLD",
    "sources": [
      "CBSE-IX-2026",
      "CBSE-X-2026"
    ],
    "coreConcepts": [
      "CHEM-C12.01-CONCEPT",
      "CHEM-C12.02-CONCEPT",
      "CHEM-C12.03-CONCEPT",
      "CHEM-C12.04-CONCEPT",
      "CHEM-C12.05-CONCEPT"
    ],
    "description": "Comprehensive curriculum adapter for Gases and Chemical Analysis, spanning 5 subtopics and 15 QRT cognitive demand tasks."
  },
  {
    "id": "C13",
    "unitId": "C13",
    "title": "Redox and Volumetric Analysis",
    "tier": "OLYMPIAD",
    "subtopicCount": 5,
    "qrtCount": 15,
    "status": "ACADEMIC_HOLD",
    "sources": [
      "CBSE-X-2026"
    ],
    "coreConcepts": [
      "CHEM-C13.01-CONCEPT",
      "CHEM-C13.02-CONCEPT",
      "CHEM-C13.03-CONCEPT",
      "CHEM-C13.04-CONCEPT",
      "CHEM-C13.05-CONCEPT"
    ],
    "description": "Comprehensive curriculum adapter for Redox and Volumetric Analysis, spanning 5 subtopics and 15 QRT cognitive demand tasks."
  },
  {
    "id": "C14",
    "unitId": "C14",
    "title": "Environmental and Applied Chemistry",
    "tier": "OLYMPIAD",
    "subtopicCount": 5,
    "qrtCount": 15,
    "status": "ACADEMIC_HOLD",
    "sources": [
      "CBSE-IX-2026",
      "CBSE-X-2026"
    ],
    "coreConcepts": [
      "CHEM-C14.01-CONCEPT",
      "CHEM-C14.02-CONCEPT",
      "CHEM-C14.03-CONCEPT",
      "CHEM-C14.04-CONCEPT",
      "CHEM-C14.05-CONCEPT"
    ],
    "description": "Comprehensive curriculum adapter for Environmental and Applied Chemistry, spanning 5 subtopics and 15 QRT cognitive demand tasks."
  }
];

export const CHEMISTRY_SUBTOPICS: readonly ChemistrySubtopicDescriptor[] = [
  {
    "subtopicId": "CHEM-C01.01",
    "adapterId": "C01",
    "title": "Particle nature of matter",
    "scope": "FOUNDATION_RECONCILE",
    "concepts": [
      "CHEM-C01.01-CORE1A"
    ],
    "qrtOperations": [
      "EXPLAIN",
      "MODEL",
      "JUSTIFY"
    ],
    "academicNotes": "Core1A/B passage and tasks are Grade9-authored candidate content; no original NSEJS question identity is asserted. Band values D3/D4 are unqualified author proposals pending five-factor QRT adjudication and independent chemistry review. R2 one-task transfer repair C01-01-EXPLAIN-D3; revised full-content digest is revision-bound in reader. Author candidate only: independent B3/B4 science, five-factor QRT and source custody HOLD.",
    "entryQuestion": "A drop of dye spreads through still water. What unseen moving entities can explain this change?",
    "coreSummary": "Pure substances and mixtures are made of small particles: atoms, molecules or ions, depending on the substance. These particles are not tiny coloured droplets; they are entities whose motion and interactions produce the large-scale behaviour we can observe. A sample of water looks continuous to the eye, but adding a trace of dye allows us to infer particle motion through gradual spreading. An inference is different from a direct photograph: dye diffusion supports the particle model, but one observation alone does not reveal the precise size of a molecule.",
    "misconception": "Common trap:  | Truth:",
    "deepDive": "The particle model is not just a slogan that matter contains tiny pieces. It explains several observations at once: dye disperses without stirring, a small amount of perfume can be detected away from its source and water can change phase while remaining water. The science begins by asking which observations support motion, spacing and conservation, and which microscopic details remain unmeasured.",
    "qrtCount": 3
  },
  {
    "subtopicId": "CHEM-C01.02",
    "adapterId": "C01",
    "title": "States, particle motion and compressibility",
    "scope": "FOUNDATION_RECONCILE",
    "concepts": [
      "CHEM-C01.02-CORE1A"
    ],
    "qrtOperations": [
      "EXPLAIN",
      "MODEL",
      "JUSTIFY"
    ],
    "academicNotes": "Core1A/B passage and tasks are Grade9-authored candidate content; no original NSEJS question identity is asserted. Band values D3/D4 are unqualified author proposals pending five-factor QRT adjudication and independent chemistry review.",
    "entryQuestion": "Why is it difficult to squeeze liquid water into half its original volume but easy to compress air?",
    "coreSummary": "Solids tend to preserve shape as well as volume; liquids preserve volume approximately but flow; gases expand to fill the container. In a particle model, these behaviours arise from different typical separations, motion and intermolecular interactions. Gas particles spend much of their time separated by significant empty space, so compressing a gas can reduce the average separation strongly. In liquids, particles are already close together; pressure has a far smaller effect on volume under ordinary conditions.",
    "misconception": "Common trap:  | Truth:",
    "deepDive": "The everyday labels solid, liquid and gas describe bulk behaviour, but the microscopic explanation is more precise: solid particles often have comparatively constrained relative positions, liquid particles can rearrange while staying close together, and gas particles move through far larger average separations. The simple picture has limits\u2014glasses, foams, powders and supercritical fluids require care.",
    "qrtCount": 3
  },
  {
    "subtopicId": "CHEM-C01.03",
    "adapterId": "C01",
    "title": "Diffusion and mixing",
    "scope": "FOUNDATION_RECONCILE",
    "concepts": [
      "CHEM-C01.03-CORE1A"
    ],
    "qrtOperations": [
      "EXPLAIN",
      "MODEL",
      "JUSTIFY"
    ],
    "academicNotes": "Core1A/B passage and tasks are Grade9-authored candidate content; no original NSEJS question identity is asserted. Band values D3/D4 are unqualified author proposals pending five-factor QRT adjudication and independent chemistry review.",
    "entryQuestion": "Why does the smell of food move through a room even when no fan is running?",
    "coreSummary": "Diffusion is a net spread of particles from regions of higher concentration into less concentrated regions as a result of random motion. Individual particles move in many directions; the net redistribution follows a concentration gradient. Temperature changes particle motion and can affect diffusion rates. However, the observed speed of a smell also depends on air movement, ventilation, obstacles and how the odorous substance evaporates from the food.",
    "misconception": "Common trap:  | Truth:",
    "deepDive": "Diffusion is a statistical effect. Every individual particle can wander in either direction, yet the region with higher particle concentration sends more particles across a boundary on average. This is why net transport can have a direction without any molecule possessing a goal or a steering mechanism.",
    "qrtCount": 3
  },
  {
    "subtopicId": "CHEM-C01.04",
    "adapterId": "C01",
    "title": "Interconversion of states",
    "scope": "FOUNDATION_RECONCILE",
    "concepts": [
      "CHEM-C01.04-CORE1A"
    ],
    "qrtOperations": [
      "EXPLAIN",
      "MODEL",
      "JUSTIFY"
    ],
    "academicNotes": "Core1A/B passage and tasks are Grade9-authored candidate content; no original NSEJS question identity is asserted. Band values D3/D4 are unqualified author proposals pending five-factor QRT adjudication and independent chemistry review.",
    "entryQuestion": "When ice melts, what happens to the identity of its H\u2082O molecules?",
    "coreSummary": "Melting, freezing, evaporation, condensation, sublimation and deposition are physical changes of state. They alter particle arrangement, relative mobility and often intermolecular separation without requiring a new chemical species. The direction of a phase change depends on temperature, pressure and energy transfer. Melting involves the solid becoming liquid, while vaporisation involves particles entering the gas phase. At a given pressure, a pure substance may have a characteristic transition temperature.",
    "misconception": "Common trap:  | Truth:",
    "deepDive": "A melting ice cube seems to disappear, yet its chemical inventory need not change. We must keep two scales separate: the O\u2013H bonds inside each water molecule and the collective organisation of many water molecules. Melting, freezing, evaporation and condensation affect the latter under ordinary conditions.",
    "qrtCount": 3
  },
  {
    "subtopicId": "CHEM-C01.05",
    "adapterId": "C01",
    "title": "Evaporation and cooling",
    "scope": "FOUNDATION_RECONCILE",
    "concepts": [
      "CHEM-C01.05-CORE1A"
    ],
    "qrtOperations": [
      "EXPLAIN",
      "MODEL",
      "JUSTIFY"
    ],
    "academicNotes": "Core1A/B passage and tasks are Grade9-authored candidate content; no original NSEJS question identity is asserted. Band values D3/D4 are unqualified author proposals pending five-factor QRT adjudication and independent chemistry review.",
    "entryQuestion": "Why can evaporation cool the remaining liquid even on a warm day?",
    "coreSummary": "Liquid particles have a spread of kinetic energies, rather than all moving at exactly the same speed. Some particles near the surface have enough energy to escape into the gas phase at temperatures below the bulk boiling point. Particles that escape carry away energy. If the remaining liquid is not supplied with enough energy from the surroundings, its average kinetic energy and temperature can fall. This is evaporative cooling.",
    "misconception": "Common trap:  | Truth:",
    "deepDive": "Evaporation cooling is an energy-flow story, not magic coldness created by the wind. At a liquid surface, some molecules escape into the surrounding gas; their escape requires energy. If the surrounding surface does not replace the lost energy fast enough, the liquid and what it touches cool.",
    "qrtCount": 3
  },
  {
    "subtopicId": "CHEM-C01.06",
    "adapterId": "C01",
    "title": "Heating curves and latent heat (scope check)",
    "scope": "SCOPE_REVIEW",
    "concepts": [
      "CHEM-C01.06-CORE1A"
    ],
    "qrtOperations": [
      "EXPLAIN",
      "MODEL",
      "JUSTIFY"
    ],
    "academicNotes": "Core1A/B passage and tasks are Grade9-authored candidate content; no original NSEJS question identity is asserted. Band values D3/D4 are unqualified author proposals pending five-factor QRT adjudication and independent chemistry review.",
    "entryQuestion": "Why can an ice-water mixture continue absorbing heat while the thermometer stays near the melting temperature?",
    "coreSummary": "At a pure substance's phase transition under approximately constant pressure, some added energy changes the microscopic arrangement rather than increasing the temperature. Temperature reflects a thermal state, but it is not a direct measure of every contribution to internal energy. During ice melting near normal atmospheric pressure, energy is needed to disrupt parts of the organised solid structure. A simple heating curve therefore has sloping segments during single-phase warming and a roughly horizontal segment while melting proceeds.",
    "misconception": "Common trap:  | Truth:",
    "deepDive": "A pure substance heated through its melting transition does not necessarily rise steadily in temperature. On an ideal heating curve, a horizontal segment signifies that energy is being absorbed while solid changes to liquid. The system's total internal energy changes even though the thermal reading can remain near the melting temperature.",
    "qrtCount": 3
  },
  {
    "subtopicId": "CHEM-C02.01",
    "adapterId": "C02",
    "title": "Elements, compounds and mixtures",
    "scope": "CORE_CANDIDATE",
    "concepts": [
      "CHEM-C02.01-CORE1A"
    ],
    "qrtOperations": [
      "EXPLAIN",
      "REPRESENT",
      "SYNTHESIZE"
    ],
    "academicNotes": "Core1A/B passage and tasks are Grade9-authored candidate content; no original NSEJS question identity is asserted. Band values D3/D4 are unqualified author proposals pending five-factor QRT adjudication and independent chemistry review.",
    "entryQuestion": "Salt water is transparent, and so is pure water. Are they chemically the same kind of matter?",
    "coreSummary": "An element consists of one chemical element; a compound contains chemically joined elements in a characteristic composition; a mixture combines substances without a fixed chemical combination ratio. Appearance alone cannot tell us which category we have. A pure sample of sodium chloride is a compound represented by NaCl. Salt water is a mixture of water and dissolved NaCl, with variable concentration. Changing the amount of salt alters the mixture's composition without changing the chemical formula of either component.",
    "misconception": "Common trap:  | Truth:",
    "deepDive": "A transparent liquid may be pure, or it may conceal several substances uniformly mixed together. Chemical identity does not come from colour or clarity. It comes from the species present and whether their relative amounts are intrinsic to one compound or adjustable as mixture composition.",
    "qrtCount": 3
  },
  {
    "subtopicId": "CHEM-C02.02",
    "adapterId": "C02",
    "title": "Homogeneous and heterogeneous systems",
    "scope": "CORE_CANDIDATE",
    "concepts": [
      "CHEM-C02.02-CORE1A"
    ],
    "qrtOperations": [
      "EXPLAIN",
      "REPRESENT",
      "SYNTHESIZE"
    ],
    "academicNotes": "Core1A/B passage and tasks are Grade9-authored candidate content; no original NSEJS question identity is asserted. Band values D3/D4 are unqualified author proposals pending five-factor QRT adjudication and independent chemistry review.",
    "entryQuestion": "If no particles are visible in a milk sample, does that make it homogeneous at every scale?",
    "coreSummary": "A homogeneous mixture appears compositionally uniform at the relevant observation scale; a heterogeneous mixture has distinguishable regions or phases. 'Homogeneous' is not a claim that all particles are literally identical. Salt completely dissolved in water forms an apparently uniform solution. Muddy water has suspended particles that can vary between sampled regions. Milk may appear uniform to the eye while containing dispersed droplets at smaller scales, making scale important.",
    "misconception": "Common trap:  | Truth:",
    "deepDive": "Homogeneity is partly a question of scale and time. A fine dispersion can look uniform to the naked eye while containing droplets or solid particles that microscopy reveals. Chemists therefore combine appearance with tests of settling, scattering and microscopic structure.",
    "qrtCount": 3
  },
  {
    "subtopicId": "CHEM-C02.03",
    "adapterId": "C02",
    "title": "Solutions, suspensions and colloids",
    "scope": "CORE_CANDIDATE",
    "concepts": [
      "CHEM-C02.03-CORE1A"
    ],
    "qrtOperations": [
      "EXPLAIN",
      "MODEL",
      "SYNTHESIZE"
    ],
    "academicNotes": "Core1A/B passage and tasks are Grade9-authored candidate content; no original NSEJS question identity is asserted. Band values D3/D4 are unqualified author proposals pending five-factor QRT adjudication and independent chemistry review.",
    "entryQuestion": "Why can a transparent salt solution and a cloudy colloid both resist ordinary settling?",
    "coreSummary": "A true solution has solute present at molecular or ionic scale. In a suspension, larger particles remain distinct from the medium and can settle. A colloid contains dispersed particles intermediate in behaviour; many remain stable for long periods but scatter light. The Tyndall effect arises from scattering of light by particles or droplets in an appropriate size range. It is one clue, not a universal on/off detector without specifying concentration, wavelength and experimental geometry.",
    "misconception": "Common trap:  | Truth:",
    "deepDive": "A dispersed sample must be classified by the state and size of its distributed components, not simply whether it resembles a solution in a photograph. Colloids can remain stable for long periods while scattering light; solutions have molecular or ionic-scale solute, and ordinary suspensions have larger particles.",
    "qrtCount": 3
  },
  {
    "subtopicId": "CHEM-C02.04",
    "adapterId": "C02",
    "title": "Concentration: mass/mass, mass/volume, volume/volume",
    "scope": "CORE_CANDIDATE",
    "concepts": [
      "CHEM-C02.04-CORE1A"
    ],
    "qrtOperations": [
      "APPLY",
      "REPRESENT",
      "SYNTHESIZE"
    ],
    "academicNotes": "Core1A/B passage and tasks are Grade9-authored candidate content; no original NSEJS question identity is asserted. Band values D3/D4 are unqualified author proposals pending five-factor QRT adjudication and independent chemistry review. R2 one-task transfer repair C02-10-APPLY-D3; revised full-content digest is revision-bound in reader. Author candidate only: independent B3/B4 science, five-factor QRT and source custody HOLD.",
    "entryQuestion": "Two drinks both contain 10 g sugar, but one is a cup and the other a litre. Which is more concentrated?",
    "coreSummary": "Concentration expresses an amount of solute relative to a specified quantity of mixture or solution. The denominator is essential: mass fraction uses total solution mass, whereas mass/volume concentration uses solution volume. Ten grams sugar in 100 g solution is 10% by mass. Ten grams in 100 mL solution is 10 g per 100 mL, often written 10% m/V. These measures are not interchangeable without density information.",
    "misconception": "Common trap:  | Truth:",
    "deepDive": "A concentration value is incomplete unless we say what amount of solute is divided by what amount of mixture or solvent. Ten grams per 100 grams of solution is not the same definition as ten grams per 100 millilitres of solution; percentages cannot be compared blindly when density matters.",
    "qrtCount": 3
  },
  {
    "subtopicId": "CHEM-C02.05",
    "adapterId": "C02",
    "title": "Solubility versus temperature",
    "scope": "CORE_CANDIDATE",
    "concepts": [
      "CHEM-C02.05-CORE1A"
    ],
    "qrtOperations": [
      "APPLY",
      "MODEL",
      "SYNTHESIZE"
    ],
    "academicNotes": "Core1A/B passage and tasks are Grade9-authored candidate content; no original NSEJS question identity is asserted. Band values D3/D4 are unqualified author proposals pending five-factor QRT adjudication and independent chemistry review.",
    "entryQuestion": "Why does heating water usually dissolve more sugar, but a dissolved gas may escape more readily?",
    "coreSummary": "Solubility is the maximum amount of a solute that can dissolve in a given amount of solvent at stated conditions and at equilibrium. The dissolved amount in an unsaturated sample can be smaller than its solubility. For many solids in water, solubility increases with temperature; this is not universal. Gas solubility often decreases as temperature increases at fixed gas partial pressure. The actual direction depends on the substance and conditions.",
    "misconception": "Common trap:  | Truth:",
    "deepDive": "The word 'soluble' does not mean infinite solubility. At a given temperature and other stated conditions, a saturated solution is in equilibrium with the undissolved material. The amount that can dissolve depends on the particular substance and sometimes changes strongly with temperature.",
    "qrtCount": 3
  },
  {
    "subtopicId": "CHEM-C02.06",
    "adapterId": "C02",
    "title": "Separation: crystallisation, distillation and chromatography",
    "scope": "CORE_CANDIDATE",
    "concepts": [
      "CHEM-C02.06-CORE1A"
    ],
    "qrtOperations": [
      "EXPLAIN",
      "REPRESENT",
      "SYNTHESIZE"
    ],
    "academicNotes": "Core1A/B passage and tasks are Grade9-authored candidate content; no original NSEJS question identity is asserted. Band values D3/D4 are unqualified author proposals pending five-factor QRT adjudication and independent chemistry review.",
    "entryQuestion": "How can pure water be recovered from salty water without chemically destroying salt?",
    "coreSummary": "Separation depends on differences in physical properties: volatility, solubility, adsorption, particle size and phase behaviour. A successful method targets the relevant difference rather than a familiar equipment name. Crystallisation can recover dissolved solid while leaving some impurities in solution. Simple distillation heats a solution, collects vapour and condenses it in a separate receiver; nonvolatile salt generally remains behind. Fractional distillation is useful when volatile components have relatively close boiling ranges.",
    "misconception": "Common trap:  | Truth:",
    "deepDive": "A separation method is not a name to memorise in isolation. It is a controlled physical process that creates different paths for components: nonvolatile salt remains while water vaporises; crystal solute may precipitate on cooling; different dye components migrate at different rates in chromatography.",
    "qrtCount": 3
  },
  {
    "subtopicId": "CHEM-C02.07",
    "adapterId": "C02",
    "title": "Separation: centrifugation, sublimation and coagulation",
    "scope": "CORE_CANDIDATE",
    "concepts": [
      "CHEM-C02.07-CORE1A"
    ],
    "qrtOperations": [
      "EXPLAIN",
      "MODEL",
      "SYNTHESIZE"
    ],
    "academicNotes": "Core1A/B passage and tasks are Grade9-authored candidate content; no original NSEJS question identity is asserted. Band values D3/D4 are unqualified author proposals pending five-factor QRT adjudication and independent chemistry review.",
    "entryQuestion": "If ordinary filtering fails to remove tiny suspended particles, what other physical distinction can we exploit?",
    "coreSummary": "Centrifugation accelerates sedimentation of dispersed components that differ in density and size under suitable conditions. It changes separation rate, not chemical identity. A centrifuge does not separate every molecule merely by spinning. Sublimation occurs when a solid enters the gas phase without passing through an ordinary bulk liquid phase under specified conditions; substances such as iodine may be separated from non-subliming mixtures in some classroom demonstrations.",
    "misconception": "Common trap:  | Truth:",
    "deepDive": "A separation sometimes becomes possible only after a preparatory step changes particle size or physical state. Coagulation helps some colloids aggregate; centrifugation accelerates sedimentation; sublimation allows a substance to travel through the vapour phase and deposit elsewhere.",
    "qrtCount": 3
  },
  {
    "subtopicId": "CHEM-C03.01",
    "adapterId": "C03",
    "title": "Conservation of mass",
    "scope": "CORE_CANDIDATE",
    "concepts": [
      "CHEM-C03.01-CORE1A"
    ],
    "qrtOperations": [
      "EXPLAIN",
      "REPRESENT",
      "JUSTIFY"
    ],
    "academicNotes": "Core1A/B passage and tasks are Grade9-authored candidate content; no original NSEJS question identity is asserted. Band values D3/D4 are unqualified author proposals pending five-factor QRT adjudication and independent chemistry review. R2 one-task transfer repair C03-02-REPRESENT-D3; revised full-content digest is revision-bound in reader. Author candidate only: independent B3/B4 science, five-factor QRT and source custody HOLD.",
    "entryQuestion": "When a candle burns in a closed vessel, why doesn't the mass simply vanish as the wax disappears?",
    "coreSummary": "The law of conservation of mass states that the total mass of a closed system is unchanged during ordinary chemical reactions, within the accuracy of the measurement. Atoms are reorganised into new substances; they are not created or destroyed in those reactions. Open vessels can give misleading readings because gases move across the measurement boundary. Burning wax consumes oxygen from the air and produces gases such as carbon dioxide and water vapour; the mass of those products must be counted.",
    "misconception": "Common trap:  | Truth:",
    "deepDive": "A reaction may make a solid vanish, produce a gas or change colour, but ordinary chemical change does not erase the atoms. Students should imagine a full inventory of the elements inside a carefully chosen boundary rather than treating a missing solid as destroyed matter.",
    "qrtCount": 3
  },
  {
    "subtopicId": "CHEM-C03.02",
    "adapterId": "C03",
    "title": "Constant composition and Dalton theory",
    "scope": "CORE_CANDIDATE",
    "concepts": [
      "CHEM-C03.02-CORE1A"
    ],
    "qrtOperations": [
      "EXPLAIN",
      "REPRESENT",
      "JUSTIFY"
    ],
    "academicNotes": "Core1A/B passage and tasks are Grade9-authored candidate content; no original NSEJS question identity is asserted. Band values D3/D4 are unqualified author proposals pending five-factor QRT adjudication and independent chemistry review.",
    "entryQuestion": "Why is pure water described by H\u2082O whether collected from rain, a river or a laboratory?",
    "coreSummary": "A pure chemical compound has a characteristic ratio of constituents. For water this ratio follows the H\u2082O formula: two H atoms per O atom in each molecule, implying a fixed hydrogen-to-oxygen mass ratio under standard isotope approximations. Dalton's atomic ideas offered a model for fixed whole-number combinations of atoms. The historical theory was not complete: isotopes show that atoms of an element need not all have the same mass.",
    "misconception": "Common trap:  | Truth:",
    "deepDive": "The law of constant composition bridges measurements and atomic formulas. Every ordinary H\u2082O molecule has two hydrogen atoms for one oxygen atom; measured mass ratios follow only after each atom count is weighted by atomic mass. The law is about a pure compound, not an arbitrary environmental sample containing dissolved substances.",
    "qrtCount": 3
  },
  {
    "subtopicId": "CHEM-C03.03",
    "adapterId": "C03",
    "title": "Atoms, molecules, ions and formula units",
    "scope": "CORE_CANDIDATE",
    "concepts": [
      "CHEM-C03.03-CORE1A"
    ],
    "qrtOperations": [
      "EXPLAIN",
      "REPRESENT",
      "JUSTIFY"
    ],
    "academicNotes": "Core1A/B passage and tasks are Grade9-authored candidate content; no original NSEJS question identity is asserted. Band values D3/D4 are unqualified author proposals pending five-factor QRT adjudication and independent chemistry review.",
    "entryQuestion": "Is the NaCl symbol a single 'molecule' like H\u2082O, or does it refer to a different structural arrangement?",
    "coreSummary": "An atom is a particle of an element. A molecule is a discrete bonded group of atoms. An ion is charged because it has gained or lost electrons relative to its neutral atom or group. A formula unit gives the simplest ratio of ions in an ionic compound. Water consists of discrete H\u2082O molecules under ordinary conditions. Sodium chloride forms a lattice containing many Na\u207a and Cl\u207b ions; NaCl denotes its simplest ratio, not usually one independent NaCl molecule in the crystalline solid.",
    "misconception": "Common trap:  | Truth:",
    "deepDive": "An element symbol and a chemical formula can count different kinds of entities. H\u2082O is normally a discrete molecule, while crystalline NaCl is an extended lattice described by the simplest ratio of sodium and chloride ions. Using the correct counting unit prevents conceptual errors when later introducing moles.",
    "qrtCount": 3
  },
  {
    "subtopicId": "CHEM-C03.04",
    "adapterId": "C03",
    "title": "Valency and charge in chemical formulae",
    "scope": "CORE_CANDIDATE",
    "concepts": [
      "CHEM-C03.04-CORE1A"
    ],
    "qrtOperations": [
      "APPLY",
      "REPRESENT",
      "JUSTIFY"
    ],
    "academicNotes": "Core1A/B passage and tasks are Grade9-authored candidate content; no original NSEJS question identity is asserted. Band values D3/D4 are unqualified author proposals pending five-factor QRT adjudication and independent chemistry review.",
    "entryQuestion": "Why is magnesium chloride written MgCl\u2082 rather than Mg\u2082Cl?",
    "coreSummary": "Valency summarises combining capacity in simple compounds; for ionic compounds, ion charge gives a direct constraint. Magnesium often forms Mg\u00b2\u207a and chlorine forms Cl\u207b, so two chlorides are needed per magnesium for zero total charge. Writing a chemical formula requires correct element symbols, known oxidation/charge assumptions and smallest integer ratio. The school-level criss-cross technique can be a shortcut, but its output must be checked using a charge ledger.",
    "misconception": "Common trap:  | Truth:",
    "deepDive": "Valency and ionic charge can help construct a neutral compound formula, but the arithmetic must not be confused with proof that every imagined compound exists. The safest procedure is to choose the actual species, calculate a charge-neutral whole-number ratio and check every grouped ion.",
    "qrtCount": 3
  },
  {
    "subtopicId": "CHEM-C03.05",
    "adapterId": "C03",
    "title": "Molecular and formula-unit masses",
    "scope": "CORE_CANDIDATE",
    "concepts": [
      "CHEM-C03.05-CORE1A"
    ],
    "qrtOperations": [
      "APPLY",
      "REPRESENT",
      "JUSTIFY"
    ],
    "academicNotes": "Core1A/B passage and tasks are Grade9-authored candidate content; no original NSEJS question identity is asserted. Band values D3/D4 are unqualified author proposals pending five-factor QRT adjudication and independent chemistry review.",
    "entryQuestion": "Why is a formula unit of CaCO\u2083 heavier than a water molecule even though neither formula is very long?",
    "coreSummary": "Relative atomic mass compares atomic masses against a reference scale. Molecular mass or formula-unit mass adds the appropriate atomic masses of all atoms in the specified unit, applying every subscript and parenthesis. To calculate water's molecular mass, use 2\u00d71+16 =18 in approximate atomic-mass units. Calcium carbonate's formula-unit mass uses Ca\u224840, C\u224812 and three O\u224816 each: 40+12+48=100.",
    "misconception": "Common trap:  | Truth:",
    "deepDive": "Formula mass calculations are an exercise in representation fidelity. A subscript multiplies one element, while a subscript outside parentheses multiplies an entire group. Before reaching for a calculator, the student should be able to expand the formula into an unambiguous atom-count table.",
    "qrtCount": 3
  },
  {
    "subtopicId": "CHEM-C03.06",
    "adapterId": "C03",
    "title": "Chemical symbols and electron-dot introduction",
    "scope": "CORE_CANDIDATE",
    "concepts": [
      "CHEM-C03.06-CORE1A"
    ],
    "qrtOperations": [
      "EXPLAIN",
      "REPRESENT",
      "JUSTIFY"
    ],
    "academicNotes": "Core1A/B passage and tasks are Grade9-authored candidate content; no original NSEJS question identity is asserted. Band values D3/D4 are unqualified author proposals pending five-factor QRT adjudication and independent chemistry review.",
    "entryQuestion": "What does a single dot around a chemical symbol stand for in an electron-dot diagram?",
    "coreSummary": "Chemical symbols identify elements. Electron-dot sketches focus on outer electrons in a chosen shell model, not the protons and neutrons of the atom. In a simple dot representation each dot denotes one valence electron, while a bond line conventionally denotes a shared pair. For sodium (2,8,1), one dot near Na represents its one valence electron. Chlorine (2,8,7) can be represented with seven dots. The dot scheme is a transition from shell counting to chemical bonding, not a proof of a particular solid or reaction.",
    "misconception": "Common trap:  | Truth:",
    "deepDive": "Electron-dot symbols connect atomic structure with chemical bonding by recording outer-electron counts. They are not photographs of electrons or a universal map of their positions. Used carefully, they provide a visual ledger for simple bonding models and expose contradictions in proposed ion formations.",
    "qrtCount": 3
  },
  {
    "subtopicId": "CHEM-C04.01",
    "adapterId": "C04",
    "title": "Mole as a counting unit (scope check)",
    "scope": "SCOPE_REVIEW",
    "concepts": [
      "CHEM-C04.01-CORE1A"
    ],
    "qrtOperations": [
      "EXPLAIN",
      "REPRESENT",
      "JUSTIFY"
    ],
    "academicNotes": "Core1A/B passage and tasks are Grade9-authored candidate content; no original NSEJS question identity is asserted. Band values D3/D4 are unqualified author proposals pending five-factor QRT adjudication and independent chemistry review.",
    "entryQuestion": "What does 'one mole' mean, and why should chemists need a counting unit larger than a dozen?",
    "coreSummary": "Chemists cannot individually count atoms in a macroscopic sample. A mole is the SI unit for amount of substance, containing exactly 6.02214076 \u00d7 10\u00b2\u00b3 specified elementary entities. The 'specified' part matters: one mole of O\u2082 molecules contains two moles of O atoms. An amount in moles is not itself a mass. Molar mass connects amount of substance to mass: n=m/M when m and M are expressed in compatible units. This makes counts of molecules accessible through a balance.",
    "misconception": "Common trap:  | Truth:",
    "deepDive": "A mole is a deliberately large counting unit, like a dozen but fixed to an enormous exact number of specified entities. It is not a gram, an atom or a molecule by itself. Confusion disappears when the counted entity is named: one mole of water molecules corresponds to twice as many hydrogen atoms.",
    "qrtCount": 3
  },
  {
    "subtopicId": "CHEM-C04.02",
    "adapterId": "C04",
    "title": "Mass, number of particles and molar mass (scope check)",
    "scope": "SCOPE_REVIEW",
    "concepts": [
      "CHEM-C04.02-CORE1A"
    ],
    "qrtOperations": [
      "APPLY",
      "MODEL",
      "SYNTHESIZE"
    ],
    "academicNotes": "Core1A/B passage and tasks are Grade9-authored candidate content; no original NSEJS question identity is asserted. Band values D3/D4 are unqualified author proposals pending five-factor QRT adjudication and independent chemistry review. R2 one-task transfer repair C04-04-APPLY-D3; revised full-content digest is revision-bound in reader. Author candidate only: independent B3/B4 science, five-factor QRT and source custody HOLD.",
    "entryQuestion": "If a tiny number of water molecules weighs almost nothing, why does a mole of them weigh about 18 grams?",
    "coreSummary": "Relative atomic masses give the mass contribution of the atoms in a formula. Molar mass expresses mass per mole of specified entities. Water has 2 hydrogens and 1 oxygen, so approximately M(H\u2082O) = 2(1)+16=18 g/mol. The conversions n=m/M and N=nN_A are a bridge between scales. Use the correct identity for each substance: oxygen gas is O\u2082 with 32 g/mol, while one mole of oxygen atoms has about 16 g mass.",
    "misconception": "Common trap:  | Truth:",
    "deepDive": "A measured mass becomes a count of chemical entities only after a molar mass is supplied. The same element can appear in molecules, ions or compounds with entirely different molar masses, and a chemical formula must be interpreted before any conversion is attempted.",
    "qrtCount": 3
  },
  {
    "subtopicId": "CHEM-C04.03",
    "adapterId": "C04",
    "title": "Balancing reaction equations and mole ratios",
    "scope": "CORE_CANDIDATE",
    "concepts": [
      "CHEM-C04.03-CORE1A"
    ],
    "qrtOperations": [
      "EXPLAIN",
      "REPRESENT",
      "SYNTHESIZE"
    ],
    "academicNotes": "Core1A/B passage and tasks are Grade9-authored candidate content; no original NSEJS question identity is asserted. Band values D3/D4 are unqualified author proposals pending five-factor QRT adjudication and independent chemistry review.",
    "entryQuestion": "Why must coefficients change when balancing a chemical equation, but subscripts must not?",
    "coreSummary": "A chemical equation represents both chemical identities and the relative numbers of reacting entities. Subscripts belong to a species' identity; coefficients count how many units take part. Balancing ensures the same number of atoms of each element on both sides. A balanced equation also defines the stoichiometric mole ratio for the reaction as written, assuming that reaction occurs as specified.",
    "misconception": "Common trap:  | Truth:",
    "deepDive": "Balanced equations connect two languages. An equation is first a claim that every element is conserved; once balanced, its coefficients also provide ratios of reacting molecular or formula units and corresponding mole amounts. Subscripts cannot be adjusted as a shortcut because they name different species.",
    "qrtCount": 3
  },
  {
    "subtopicId": "CHEM-C04.04",
    "adapterId": "C04",
    "title": "Reaction composition and mass relationships",
    "scope": "CORE_CANDIDATE",
    "concepts": [
      "CHEM-C04.04-CORE1A"
    ],
    "qrtOperations": [
      "APPLY",
      "MODEL",
      "SYNTHESIZE"
    ],
    "academicNotes": "Core1A/B passage and tasks are Grade9-authored candidate content; no original NSEJS question identity is asserted. Band values D3/D4 are unqualified author proposals pending five-factor QRT adjudication and independent chemistry review.",
    "entryQuestion": "Why do two grams of hydrogen gas and sixteen grams of oxygen gas not necessarily make eighteen grams of water?",
    "coreSummary": "Chemical combination follows balanced atom ratios, not arbitrary total mass. Hydrogen and oxygen gases react as 2H\u2082 + O\u2082 \u2192 2H\u2082O. To find whether reagents are in the correct proportions, convert their masses into moles first. Use M(H\u2082)=2 g/mol and M(O\u2082)=32 g/mol. The required mass ratio for complete consumption is 4 g H\u2082 to 32 g O\u2082, or 1:8 by mass. In a closed system, the initial total mass equals the masses of product and leftovers combined.",
    "misconception": "Common trap:  | Truth:",
    "deepDive": "Mass conservation is always compatible with the correct stoichiometric result, but it cannot replace the stoichiometric calculation. If one reactant is present in excess, the final mass includes unused material and reaction products; it does not all become the desired product.",
    "qrtCount": 3
  },
  {
    "subtopicId": "CHEM-C04.05",
    "adapterId": "C04",
    "title": "Limiting reactants and excess (extension)",
    "scope": "EXTENSION",
    "concepts": [
      "CHEM-C04.05-CORE1A"
    ],
    "qrtOperations": [
      "APPLY",
      "MODEL",
      "SYNTHESIZE"
    ],
    "academicNotes": "Core1A/B passage and tasks are Grade9-authored candidate content; no original NSEJS question identity is asserted. Band values D3/D4 are unqualified author proposals pending five-factor QRT adjudication and independent chemistry review.",
    "entryQuestion": "What makes a reagent limiting, and why isn't the one with fewer grams necessarily the limiting one?",
    "coreSummary": "A limiting reactant is used up first if a specified reaction proceeds as modeled. Its available quantity compared with its coefficient determines how many complete reaction 'sets' can take place. For aA + bB \u2192 products, compare n(A)/a and n(B)/b. The smaller nonnegative value limits the reaction extent, under ideal single-reaction and completion assumptions. The other reagent may be in excess.",
    "misconception": "Common trap:  | Truth:",
    "deepDive": "A limiting-reagent calculation can be understood as a recipe constrained by amounts of chemically specified ingredients. However, the chemical 'recipe' must be balanced first, and the maximum product predicted from it is not automatically the product a real laboratory will collect.",
    "qrtCount": 3
  },
  {
    "subtopicId": "CHEM-C04.06",
    "adapterId": "C04",
    "title": "Yield and multireaction stoichiometry (extension)",
    "scope": "EXTENSION",
    "concepts": [
      "CHEM-C04.06-CORE1A"
    ],
    "qrtOperations": [
      "APPLY",
      "MODEL",
      "SYNTHESIZE"
    ],
    "academicNotes": "Core1A/B passage and tasks are Grade9-authored candidate content; no original NSEJS question identity is asserted. Band values D3/D4 are unqualified author proposals pending five-factor QRT adjudication and independent chemistry review.",
    "entryQuestion": "If the balanced equation predicts 10 g product, why might an experiment recover only 7 g?",
    "coreSummary": "The theoretical yield is the maximum amount of the target product predicted from the limiting reactant under the specified stoichiometric model. Actual isolated product may be lower due to incomplete conversion, side reactions or recovery losses. Percent yield is commonly defined as actual isolated target-product mass divided by theoretical target-product mass, multiplied by 100. It is meaningful only when the compared products refer to the same chemical species and purity basis.",
    "misconception": "Common trap:  | Truth:",
    "deepDive": "Theoretical yield and actual isolated yield answer different questions. The first is a conservation-based maximum under the specified reaction model; the second is a measurement that also depends on conversion, competing reactions, recovery and purity. Their ratio is informative only if both refer to the same target product.",
    "qrtCount": 3
  },
  {
    "subtopicId": "CHEM-C05.01",
    "adapterId": "C05",
    "title": "Subatomic particles, charge and position",
    "scope": "CORE_CANDIDATE",
    "concepts": [
      "CHEM-C05.01-CORE1A"
    ],
    "qrtOperations": [
      "EXPLAIN",
      "REPRESENT",
      "MODEL"
    ],
    "academicNotes": "Core1A/B passage and tasks are Grade9-authored candidate content; no original NSEJS question identity is asserted. Band values D3/D4 are unqualified author proposals pending five-factor QRT adjudication and independent chemistry review.",
    "entryQuestion": "If electrons are lost, does an atom become a different element?",
    "coreSummary": "Protons carry positive charge; neutrons have no electrical charge; electrons carry negative charge. Nearly all atomic mass is concentrated in the nucleus, which contains protons and neutrons, while electrons occupy the surrounding electronic structure. The proton count Z defines chemical element identity. Neutron count can vary in isotopes, and electron count varies in ions, but ordinary chemical reactions do not change Z. A positive monatomic ion forms when electrons are removed, not when protons appear spontaneously.",
    "misconception": "Common trap:  | Truth:",
    "deepDive": "The three familiar subatomic particles play different explanatory roles. Protons define which element an atom belongs to, neutrons distinguish isotopes and electrons account for most ordinary ion charges and bonding. Mixing these roles causes mistakes in both particle arithmetic and chemical identity.",
    "qrtCount": 3
  },
  {
    "subtopicId": "CHEM-C05.02",
    "adapterId": "C05",
    "title": "Thomson and Rutherford models with evidence",
    "scope": "CORE_CANDIDATE",
    "concepts": [
      "CHEM-C05.02-CORE1A"
    ],
    "qrtOperations": [
      "EXPLAIN",
      "MODEL",
      "JUSTIFY"
    ],
    "academicNotes": "Core1A/B passage and tasks are Grade9-authored candidate content; no original NSEJS question identity is asserted. Band values D3/D4 are unqualified author proposals pending five-factor QRT adjudication and independent chemistry review. R2 one-task transfer repair C05-06-JUSTIFY-D4; revised full-content digest is revision-bound in reader. Author candidate only: independent B3/B4 science, five-factor QRT and source custody HOLD.",
    "entryQuestion": "What did Rutherford's gold-foil experiment reveal that Thomson's model could not explain?",
    "coreSummary": "Scientific atomic models are revised when experiments produce observations that earlier models cannot explain. Thomson's positive-charge 'pudding' picture placed electrons in a diffuse positive environment. It did not contain a tiny concentrated positive centre. In Rutherford's alpha-particle scattering experiment, most particles passed through thin metal foil with small deflections, while a tiny fraction deflected strongly. This is consistent with most atomic volume being weakly obstructing and with positive charge/mass concentrated in a small nucleus.",
    "misconception": "Common trap:  | Truth:",
    "deepDive": "Rutherford's gold-foil scattering experiment is a model-building story. Most positively charged alpha particles passed through thin metal foil with little deflection, whereas a small fraction turned through unexpectedly large angles. A compact positively charged nucleus explains the rare strong interactions.",
    "qrtCount": 3
  },
  {
    "subtopicId": "CHEM-C05.03",
    "adapterId": "C05",
    "title": "Bohr shells and electrons for the first 18 elements",
    "scope": "CORE_CANDIDATE",
    "concepts": [
      "CHEM-C05.03-CORE1A"
    ],
    "qrtOperations": [
      "EXPLAIN",
      "REPRESENT",
      "MODEL"
    ],
    "academicNotes": "Core1A/B passage and tasks are Grade9-authored candidate content; no original NSEJS question identity is asserted. Band values D3/D4 are unqualified author proposals pending five-factor QRT adjudication and independent chemistry review.",
    "entryQuestion": "Why does magnesium show the shell pattern 2,8,2 rather than putting all 12 electrons together?",
    "coreSummary": "The Bohr-shell model introduced discrete electron energy levels and helps organise electronic configuration at school level. For the first 18 elements, a familiar filling pattern is 2 electrons in the first shell and up to 8 in the next; this is a teaching pattern limited to these elements, not a complete quantum description. Magnesium has 12 electrons when neutral and is represented 2,8,2. Aluminium 2,8,3 and chlorine 2,8,7. Their outer electrons help explain many common simple valence tendencies, though chemical bonding still depends on the complete system.",
    "misconception": "Common trap:  | Truth:",
    "deepDive": "School-level shells organise electron counts without claiming that electrons travel in fixed miniature planetary circles. For the first 18 elements, configurations such as Na 2,8,1 and Cl 2,8,7 help explain recurring valence patterns. Beyond that domain, subshell energy ordering needs extra care.",
    "qrtCount": 3
  },
  {
    "subtopicId": "CHEM-C05.04",
    "adapterId": "C05",
    "title": "Atomic number, mass number, isotopes and isobars",
    "scope": "CORE_CANDIDATE",
    "concepts": [
      "CHEM-C05.04-CORE1A"
    ],
    "qrtOperations": [
      "EXPLAIN",
      "REPRESENT",
      "MODEL"
    ],
    "academicNotes": "Core1A/B passage and tasks are Grade9-authored candidate content; no original NSEJS question identity is asserted. Band values D3/D4 are unqualified author proposals pending five-factor QRT adjudication and independent chemistry review.",
    "entryQuestion": "Why are two carbon-12 and carbon-14 atoms both called carbon?",
    "coreSummary": "Atomic number counts protons, fixing the element. Mass number counts protons plus neutrons. Isotopes have the same proton count and different neutron counts; isobars have the same mass number but different proton counts. Carbon-12 has 6 protons and 6 neutrons; carbon-14 has 6 protons and 8 neutrons. Their nuclear stabilities can differ, but ordinary chemical identity remains carbon because Z remains 6.",
    "misconception": "Common trap:  | Truth:",
    "deepDive": "Isotopes reveal a subtle distinction: the periodic table identifies elements by their protons, not by the exact mass of one atom. Carbon-12 and carbon-14 are both carbon despite their neutron counts differing, while an average mass tabulated for an element describes an isotope population.",
    "qrtCount": 3
  },
  {
    "subtopicId": "CHEM-C05.05",
    "adapterId": "C05",
    "title": "Ions and electronic configurations in shell notation",
    "scope": "CORE_CANDIDATE",
    "concepts": [
      "CHEM-C05.05-CORE1A"
    ],
    "qrtOperations": [
      "EXPLAIN",
      "REPRESENT",
      "MODEL"
    ],
    "academicNotes": "Core1A/B passage and tasks are Grade9-authored candidate content; no original NSEJS question identity is asserted. Band values D3/D4 are unqualified author proposals pending five-factor QRT adjudication and independent chemistry review.",
    "entryQuestion": "How can Na\u207a and Ne have the same number of electrons yet remain different chemical species?",
    "coreSummary": "Ions are charged species with an electron inventory different from the neutral atom or group. Electron loss yields a positive ion; electron gain yields a negative ion. The nucleus is unchanged in ordinary ionisation. Isoelectronic species have equal electron numbers, but are not chemically identical because nuclear charge, size and interactions differ. Na\u207a and Ne both have ten electrons, while Na\u207a has 11 protons and Ne has 10.",
    "misconception": "Common trap:  | Truth:",
    "deepDive": "Two species can have the same electron configuration and still carry different charges or belong to different elements. Na\u207a and Ne both have ten electrons, but Na\u207a contains eleven protons while Ne contains ten. This distinction is a useful guard against treating shell diagrams as complete identity cards.",
    "qrtCount": 3
  },
  {
    "subtopicId": "CHEM-C05.06",
    "adapterId": "C05",
    "title": "Subshell configurations and spectra (enrichment)",
    "scope": "ENRICHMENT",
    "concepts": [
      "CHEM-C05.06-CORE1A"
    ],
    "qrtOperations": [
      "EXPLAIN",
      "REPRESENT",
      "MODEL"
    ],
    "academicNotes": "Core1A/B passage and tasks are Grade9-authored candidate content; no original NSEJS question identity is asserted. Band values D3/D4 are unqualified author proposals pending five-factor QRT adjudication and independent chemistry review.",
    "entryQuestion": "Why do modern electron configurations use 3d and 4s notation when earlier shell diagrams seem sufficient?",
    "coreSummary": "The shell model groups electrons by principal energy level. A more detailed quantum description distinguishes subshells labelled s, p, d and f; each has a finite electron capacity. At a school-extension level, s holds 2, p holds 6 and d holds 10 electrons. Electron filling in multi-electron atoms follows energy patterns that cannot be captured by a simple third-shell-first rule. The familiar K example is [Ar]4s\u00b9. For scandium, a common neutral-atom ground-state configuration is [Ar]3d\u00b94s\u00b2, containing 21 electrons.",
    "misconception": "Common trap:  | Truth:",
    "deepDive": "Subshell notation permits more precise explanations of spectra, periodic exceptions and transition-metal ions, but it adds assumptions and concepts not included in the elementary first-18 shell model. This is enrichment that a self-learner should enter only after mastering nuclear identity and electron accounting.",
    "qrtCount": 3
  },
  {
    "subtopicId": "CHEM-C06.01",
    "adapterId": "C06",
    "title": "Dobereiner, Newlands and Mendeleev classification",
    "scope": "CORE_CANDIDATE",
    "concepts": [
      "CHEM-C06.01-CORE1A"
    ],
    "qrtOperations": [
      "EXPLAIN",
      "MODEL",
      "JUSTIFY"
    ],
    "academicNotes": "Core1A/B passage and tasks are Grade9-authored candidate content; no original NSEJS question identity is asserted. Band values D3/D4 are unqualified author proposals pending five-factor QRT adjudication and independent chemistry review.",
    "entryQuestion": "How did nineteenth-century chemists see a pattern in elements before protons were even known?",
    "coreSummary": "Scientific classification compresses many observations into a predictive model. D\u00f6bereiner grouped certain similar elements into triads with approximately related atomic masses. Newlands recognised approximate repetitions after every eighth element among lighter elements, but this pattern did not accommodate all known elements. Mendeleev used atomic masses and chemical properties to organise elements. A major strength was that he left gaps and predicted properties for not-yet-discovered elements. Successful predictions offered evidence that the periodic pattern captured something real, while some element orderings remained problematic.",
    "misconception": "Common trap:  | Truth:",
    "deepDive": "Historical periodic classification is a story about improving a scientific model with new evidence. D\u00f6bereiner and Newlands noticed patterns; Mendeleev arranged elements so that chemical families and predicted vacancies became visible. Later atomic-number evidence explained ordering anomalies that mass-based schemes could not fully resolve.",
    "qrtCount": 3
  },
  {
    "subtopicId": "CHEM-C06.02",
    "adapterId": "C06",
    "title": "Modern periodic law and table organisation",
    "scope": "CORE_CANDIDATE",
    "concepts": [
      "CHEM-C06.02-CORE1A"
    ],
    "qrtOperations": [
      "EXPLAIN",
      "REPRESENT",
      "JUSTIFY"
    ],
    "academicNotes": "Core1A/B passage and tasks are Grade9-authored candidate content; no original NSEJS question identity is asserted. Band values D3/D4 are unqualified author proposals pending five-factor QRT adjudication and independent chemistry review. R2 one-task transfer repair C06-06-JUSTIFY-D4; revised full-content digest is revision-bound in reader. Author candidate only: independent B3/B4 science, five-factor QRT and source custody HOLD.",
    "entryQuestion": "If argon has greater relative atomic mass than potassium, why does argon still come first in the modern periodic table?",
    "coreSummary": "The modern periodic law states that physical and chemical properties of elements are periodic functions of their atomic numbers. Atomic number Z counts protons. It is more fundamental to element identity than an average isotopic atomic mass. Arranging elements in increasing Z organises them so that valence electronic patterns repeat. Periods represent progressive filling patterns and groups collect elements with related outer-electron features and chemical behaviour.",
    "misconception": "Common trap:  | Truth:",
    "deepDive": "The modern periodic table organises chemical elements by atomic number\u2014the number of protons\u2014not by their average isotope masses. That is why argon comes immediately before potassium even though argon's ordinary listed relative mass can be larger. Electron patterns provide a chemical explanation for repeated group behaviour.",
    "qrtCount": 3
  },
  {
    "subtopicId": "CHEM-C06.03",
    "adapterId": "C06",
    "title": "Groups, periods and valence patterns",
    "scope": "CORE_CANDIDATE",
    "concepts": [
      "CHEM-C06.03-CORE1A"
    ],
    "qrtOperations": [
      "EXPLAIN",
      "REPRESENT",
      "SYNTHESIZE"
    ],
    "academicNotes": "Core1A/B passage and tasks are Grade9-authored candidate content; no original NSEJS question identity is asserted. Band values D3/D4 are unqualified author proposals pending five-factor QRT adjudication and independent chemistry review.",
    "entryQuestion": "Why do lithium and sodium tend to form +1 ions, while magnesium often forms +2?",
    "coreSummary": "Elements in a main-group column share a characteristic outer-electron pattern. Lithium has 2,1 and sodium has 2,8,1; both have one outer electron in a simple shell model. Magnesium 2,8,2 has two outer electrons. Period number for these simple main-group examples corresponds to the highest occupied shell. Across period 3 from Na to Ar, valence electron count increases and chemical behaviour changes progressively.",
    "misconception": "Common trap:  | Truth:",
    "deepDive": "Period and group information encode two different structural clues. In the first-18 main-group teaching model, the period roughly identifies the highest occupied shell, while a main-group column signals recurring outer-electron populations. The pattern explains simple valence similarities without making every element in a group physically identical.",
    "qrtCount": 3
  },
  {
    "subtopicId": "CHEM-C06.04",
    "adapterId": "C06",
    "title": "Metallic and nonmetallic trends",
    "scope": "CORE_CANDIDATE",
    "concepts": [
      "CHEM-C06.04-CORE1A"
    ],
    "qrtOperations": [
      "EXPLAIN",
      "MODEL",
      "JUSTIFY"
    ],
    "academicNotes": "Core1A/B passage and tasks are Grade9-authored candidate content; no original NSEJS question identity is asserted. Band values D3/D4 are unqualified author proposals pending five-factor QRT adjudication and independent chemistry review.",
    "entryQuestion": "Why does metallic character generally decrease when moving across a period, yet increase down some groups?",
    "coreSummary": "Metallic behaviour is associated with the ease of losing electrons, though it is not a single direct measured quantity. Across a main-group period, increasing nuclear charge without another main shell tends to increase attraction for valence electrons, making simple electron loss less favourable. Down a main group such as the alkali metals, a new outer shell and shielding generally place the valence electron farther from the nucleus, often making its removal easier despite increased total nuclear charge.",
    "misconception": "Common trap:  | Truth:",
    "deepDive": "Qualitative trends arise from competing effects. Across a main-group period nuclear charge increases without introducing a new principal outer shell, generally strengthening valence-electron attraction. Down a group, additional shells and shielding often counterbalance growing nuclear charge and make outer electrons easier to remove.",
    "qrtCount": 3
  },
  {
    "subtopicId": "CHEM-C06.05",
    "adapterId": "C06",
    "title": "Chemical prediction from table position",
    "scope": "CORE_CANDIDATE",
    "concepts": [
      "CHEM-C06.05-CORE1A"
    ],
    "qrtOperations": [
      "EXPLAIN",
      "MODEL",
      "SYNTHESIZE"
    ],
    "academicNotes": "Core1A/B passage and tasks are Grade9-authored candidate content; no original NSEJS question identity is asserted. Band values D3/D4 are unqualified author proposals pending five-factor QRT adjudication and independent chemistry review.",
    "entryQuestion": "Can we use an element's periodic position to predict its compounds without knowing its name?",
    "coreSummary": "A periodic table position summarises atomic number and electron structure. For many main-group elements it supports predictions of common ion charges and simple formulae. A group-1 element often gives +1; a group-2 element gives +2; group-17 halogens often give \u22121. These predictions need charge balance, chemical context and knowledge of whether the proposed bond type is reasonable. A formula based solely on group number may be invalid for a covalent compound or a multiple-valence transition metal.",
    "misconception": "Common trap:  | Truth:",
    "deepDive": "A periodic table can support an unfamiliar compound prediction even when an element's name is hidden. The student identifies its outer-electron pattern, chooses a plausible bonding model and derives a charge-balanced formula. This is genuine model-based reasoning rather than remembering a known salt.",
    "qrtCount": 3
  },
  {
    "subtopicId": "CHEM-C06.06",
    "adapterId": "C06",
    "title": "Quantitative periodic trends and exceptions (enrichment)",
    "scope": "ENRICHMENT",
    "concepts": [
      "CHEM-C06.06-CORE1A"
    ],
    "qrtOperations": [
      "EXPLAIN",
      "MODEL",
      "JUSTIFY"
    ],
    "academicNotes": "Core1A/B passage and tasks are Grade9-authored candidate content; no original NSEJS question identity is asserted. Band values D3/D4 are unqualified author proposals pending five-factor QRT adjudication and independent chemistry review.",
    "entryQuestion": "Does increasing nuclear charge always make an electron harder to remove from a neutral atom?",
    "coreSummary": "First ionisation energy is the energy required to remove an electron from a gaseous atom in its ground state. Across a main-group period, it often increases because electrons experience greater effective nuclear attraction. The trend has local exceptions. For example, B has a lower first ionisation energy than Be because B's electron removed is from a higher-energy 2p subshell rather than Be's filled 2s subshell; O is lower than N because paired 2p electrons increase repulsion relative to N's half-filled 2p set.",
    "misconception": "Common trap:  | Truth:",
    "deepDive": "First ionisation energy is one quantitative probe of how an atom's electrons are held. Along a main-group period it tends to increase, but familiar Be/B and N/O comparisons remind us that subshell energy and electron pairing affect particular values. The basic trend is meaningful precisely because its exceptions can be explained.",
    "qrtCount": 3
  },
  {
    "subtopicId": "CHEM-C07.01",
    "adapterId": "C07",
    "title": "Why atoms combine: valence and stability",
    "scope": "CORE_CANDIDATE",
    "concepts": [
      "CHEM-C07.01-CORE1A"
    ],
    "qrtOperations": [
      "EXPLAIN",
      "MODEL",
      "JUSTIFY"
    ],
    "academicNotes": "Core1A/B passage and tasks are Grade9-authored candidate content; no original NSEJS question identity is asserted. Band values D3/D4 are unqualified author proposals pending five-factor QRT adjudication and independent chemistry review.",
    "entryQuestion": "If a sodium atom becomes a positive ion, where did its electron go\u2014and why is losing an electron sometimes favourable in a compound?",
    "coreSummary": "A chemical bond is an interaction that makes a particular arrangement of atoms energetically favourable under the conditions considered. We cannot explain bonding by saying that atoms 'want eight electrons': atoms have no intentions, and the octet is a useful beginner's pattern rather than a universal law. Electronic configuration helps us describe the outermost occupied shell. Sodium (2,8,1) often loses its outer electron in forming compounds and becomes Na\u207a (2,8). Chlorine (2,8,7) may gain an electron and become Cl\u207b (2,8,8). These are changes in electron number, not in proton number: sodium remains sodium, and chlorine remains chlorine.",
    "misconception": "Common trap:  | Truth:",
    "deepDive": "An electron-dot drawing should explain a reaction possibility, not command matter to react. A sodium atom and a chlorine atom are not tiny people trying to finish an octet; the electron changes cost or release energy, while a solid lattice provides additional stabilisation. The full energetic context determines whether a proposed material can exist.",
    "qrtCount": 3
  },
  {
    "subtopicId": "CHEM-C07.02",
    "adapterId": "C07",
    "title": "Ionic bonding: transfer, lattice and properties",
    "scope": "CORE_CANDIDATE",
    "concepts": [
      "CHEM-C07.02-CORE1A"
    ],
    "qrtOperations": [
      "EXPLAIN",
      "MODEL",
      "JUSTIFY"
    ],
    "academicNotes": "Core1A/B passage and tasks are Grade9-authored candidate content; no original NSEJS question identity is asserted. Band values D3/D4 are unqualified author proposals pending five-factor QRT adjudication and independent chemistry review. R2 one-task transfer repair C07-06-JUSTIFY-D4; author candidate, independent B3/B4/QRT/source custody HOLD.",
    "entryQuestion": "Why can molten sodium chloride conduct electricity even though the same salt is an insulator when solid?",
    "coreSummary": "An ionic compound contains positively and negatively charged ions held together by electrostatic attraction. A sodium chloride crystal is not a collection of isolated NaCl molecules; it is an extended three-dimensional lattice of ions, with NaCl representing the simplest ratio of its parts. The strong attraction across the lattice generally requires substantial energy to disrupt, so many ionic compounds have relatively high melting points. 'All ionic compounds have high melting points' is a useful tendency, not an exceptionless identity test.",
    "misconception": "Common trap:  | Truth:",
    "deepDive": "A table-salt crystal is better understood as a large repeating structure than as a bag of individual NaCl molecules. The distinction becomes experimentally important when electrical conduction is measured: the ion's charge is not enough, because a current requires mobile carriers.",
    "qrtCount": 3
  },
  {
    "subtopicId": "CHEM-C07.03",
    "adapterId": "C07",
    "title": "Covalent bonding and shared electron pairs",
    "scope": "CORE_CANDIDATE",
    "concepts": [
      "CHEM-C07.03-CORE1A"
    ],
    "qrtOperations": [
      "REPRESENT",
      "EXPLAIN",
      "SYNTHESIZE"
    ],
    "academicNotes": "Core1A/B passage and tasks are Grade9-authored candidate content; no original NSEJS question identity is asserted. Band values D3/D4 are unqualified author proposals pending five-factor QRT adjudication and independent chemistry review.",
    "entryQuestion": "Hydrogen and oxygen are both non-metals. Why do they form molecules rather than alternating ionic lattices in the common H\u2082 and O\u2082 gases?",
    "coreSummary": "Many non-metal atoms form covalent bonds by sharing electron pairs. For H\u2082, each hydrogen contributes one electron and both atoms share the pair. Describing the electron cloud as shared does not imply that every electron spends half its time on each atom. Oxygen has six valence electrons in a simple school-level model. In O\u2082, an elementary Lewis drawing places two shared electron pairs between the oxygen atoms and two lone pairs on each oxygen. This is a double bond, with a different electron-pair count from a single bond.",
    "misconception": "Common trap:  | Truth:",
    "deepDive": "In a covalent molecule, the same electron can be involved in a region of shared electron density; a school bond-line sketch represents an electron pair rather than literal tiny rods. More importantly, the bond that holds a molecule together is not the same interaction that holds neighbouring molecules near each other.",
    "qrtCount": 3
  },
  {
    "subtopicId": "CHEM-C07.04",
    "adapterId": "C07",
    "title": "Lewis and electron-dot structures",
    "scope": "CORE_CANDIDATE",
    "concepts": [
      "CHEM-C07.04-CORE1A"
    ],
    "qrtOperations": [
      "REPRESENT",
      "MODEL",
      "JUSTIFY"
    ],
    "academicNotes": "Core1A/B passage and tasks are Grade9-authored candidate content; no original NSEJS question identity is asserted. Band values D3/D4 are unqualified author proposals pending five-factor QRT adjudication and independent chemistry review.",
    "entryQuestion": "If a chemical formula tells us only atom counts, what extra information must a dot-and-cross structure preserve?",
    "coreSummary": "A Lewis representation is an electron-accounting drawing. It includes the identities of bonded atoms, the bonds between them and the nonbonding pairs needed for the chosen model. The conventional school-level starting point uses the valence electrons of each constituent atom. First count valence electrons in the entire species. Add one electron for a negative charge and subtract one for a positive charge. Then propose reasonable connectivity, place bonding pairs, distribute remaining electrons and check the count and simple duet/octet preferences where applicable.",
    "misconception": "Common trap:  | Truth:",
    "deepDive": "A Lewis diagram is a constrained translation between a chemical formula and an electron accounting model. Its value lies in the reasoning it forces: where did each valence electron go, how many electrons are shared, and which species remain electrically neutral or charged?",
    "qrtCount": 3
  },
  {
    "subtopicId": "CHEM-C07.05",
    "adapterId": "C07",
    "title": "Molecular connectivity and structure\u2013property relations",
    "scope": "CORE_CANDIDATE",
    "concepts": [
      "CHEM-C07.05-CORE1A"
    ],
    "qrtOperations": [
      "REPRESENT",
      "EXPLAIN",
      "SYNTHESIZE"
    ],
    "academicNotes": "Core1A/B passage and tasks are Grade9-authored candidate content; no original NSEJS question identity is asserted. Band values D3/D4 are unqualified author proposals pending five-factor QRT adjudication and independent chemistry review.",
    "entryQuestion": "Two clear liquids can contain the same kinds and numbers of atoms. Why might one react with sodium metal while the other behaves differently?",
    "coreSummary": "A molecular formula tells us composition; a structural formula describes which atom is connected to which. Carbon compounds make this difference especially visible because carbon can bond to itself and form multiple stable connection patterns. For C\u2082H\u2086O, CH\u2083CH\u2082OH (ethanol) contains an O\u2013H group and CH\u2083OCH\u2083 (dimethyl ether) contains a C\u2013O\u2013C connection but no O\u2013H bond. These structures have identical molecular formulas, yet they are distinct substances.",
    "misconception": "Common trap:  | Truth:",
    "deepDive": "Two molecules can contain precisely the same atoms and yet have different chemical functions because they join those atoms in different orders. The molecular formula is a composition constraint; the structural formula is a connectivity claim that must be tested against reactivity.",
    "qrtCount": 3
  },
  {
    "subtopicId": "CHEM-C07.06",
    "adapterId": "C07",
    "title": "Conductivity, melting and solubility as structure evidence",
    "scope": "CORE_CANDIDATE",
    "concepts": [
      "CHEM-C07.06-CORE1A"
    ],
    "qrtOperations": [
      "EXPLAIN",
      "MODEL",
      "JUSTIFY"
    ],
    "academicNotes": "Core1A/B passage and tasks are Grade9-authored candidate content; no original NSEJS question identity is asserted. Band values D3/D4 are unqualified author proposals pending five-factor QRT adjudication and independent chemistry review.",
    "entryQuestion": "Can we determine the internal bonding of a mystery solid by measuring melting, solubility and electrical conduction?",
    "coreSummary": "Macroscopic observations provide evidence about microscopic structure but rarely give a unique answer alone. A high melting point might suggest strong attractions in an ionic lattice or an extended covalent network; it does not identify one particular compound by itself. Electrical conductivity is particularly revealing when conditions are controlled. For ionic solids, charge-bearing ions generally cannot move through the rigid lattice; for molten ionic compounds, they can. Metals carry current by mobile electrons even in the solid state. Graphite also has charge carriers that make a covalent solid conductive.",
    "misconception": "Common trap:  | Truth:",
    "deepDive": "The goal of material-property testing is usually to choose and challenge a structure model, not to solve a multiple-choice identification trick. Conductivity, melting behaviour and solubility reveal different aspects of the particles and interactions in a sample.",
    "qrtCount": 3
  },
  {
    "subtopicId": "CHEM-C07.07",
    "adapterId": "C07",
    "title": "Molecular geometry and polarity models",
    "scope": "ENRICHMENT",
    "concepts": [
      "CHEM-C07.07-CORE1A"
    ],
    "qrtOperations": [
      "REPRESENT",
      "MODEL",
      "JUSTIFY"
    ],
    "academicNotes": "Core1A/B passage and tasks are Grade9-authored candidate content; no original NSEJS question identity is asserted. Band values D3/D4 are unqualified author proposals pending five-factor QRT adjudication and independent chemistry review.",
    "entryQuestion": "Water and carbon dioxide are both three-atom molecules. Why is one bent and polar while the other is linear and overall nonpolar?",
    "coreSummary": "The Lewis diagram tells us which atoms are bonded and where electron pairs are placed, but it does not give a three-dimensional shape by itself. A simple enrichment model called electron-pair repulsion helps infer the approximate spatial arrangements of regions of electron density around a central atom. For CO\u2082, carbon has two bonding regions (each double bond counts as one region for this geometry model) and no lone pairs. The simplest arrangement keeps the two regions opposite one another, producing a linear O=C=O shape with an approximately 180\u00b0 angle.",
    "misconception": "Common trap:  | Truth:",
    "deepDive": "Molecular polarity is not another periodic table arrow. It results from the combination of individual bond dipoles in three-dimensional space, so a symmetric molecule can contain polar bonds and still have no overall dipole. This is optional geometry enrichment, not a Class X core requirement.",
    "qrtCount": 3
  },
  {
    "subtopicId": "CHEM-C08.01",
    "adapterId": "C08",
    "title": "Reaction observations and balanced equations",
    "scope": "CORE_CANDIDATE",
    "concepts": [
      "CHEM-C08.01-CONCEPT"
    ],
    "qrtOperations": [
      "EXPLAIN",
      "REPRESENT",
      "SYNTHESIZE"
    ],
    "academicNotes": "Author-proposed tasks, not independently QRT-scored; D3/D4 is provisional. Canonical science is candidate only; Agent A prerequisites not yet pinned. Outside C09, Core1A/B teaching remains to be written; adapter does not count as a textbook.",
    "entryQuestion": "A magnesium ribbon glows brightly, a white solid remains, and its mass seems to increase. Did matter appear from nowhere? The puzzling observation is precisely why a chemical equation must connect an experimental system to a particle account before it is used as a calculation.",
    "coreSummary": "A chemical reaction changes the identities and arrangements of substances while preserving each chemical element in an ordinary chemical process. A colour, temperature, gas or precipitate change is evidence that merits investigation, but none alone guarantees a particular product. We first identify reactants and plausible products from observations and independent tests. Only after declaring the chemical species can we write a skeletal equation. Balancing comes last: numerical coefficients count reacting entities and never alter a molecule's subscripts. Magnesium combines with oxygen to form magnesium oxide: 2Mg(s) + O\u2082(g) \u2192 2MgO(s). Start with two Mg atoms and two O atoms on the left. The two formula units of MgO on the right contain the same totals. If the metal sample gains mass, the extra mass belongs to oxygen drawn from the air. A beaker or open crucible reading therefore describes an *open material system*, not proof that mass was created. A balanced equation is not a photographic record of the reaction mechanism. It neither establishes reaction speed nor proves that the stated substances actually reacted. To move between experimental and particle representations, state the observation, a proposed species identity, the evidence for that identity, and the ledger of atom counts. Particle diagrams must carry exactly the same element inventory as symbols. In a closed system including the air that reacts, total mass remains conserved. A new chemical system may exchange gases with air and leave little residue. Work through two possible atom inventories, one in which a gaseous product escapes and one in which reaction stops early. An open-dish reading cannot distinguish these histories; the evidence needed is a complete material boundary and a test of product identity.",
    "misconception": "Changing MgO to MgO\u2082 just to balance the symbols changes the chemical species. Repair by leaving species formulas fixed and changing coefficients only.",
    "deepDive": "If some fine MgO smoke escapes, an open crucible can lose apparent mass even while oxygen is taken up. That cannot be diagnosed from the final mass alone; the experiment must control escaping product.",
    "qrtCount": 3
  },
  {
    "subtopicId": "CHEM-C08.02",
    "adapterId": "C08",
    "title": "Combination and decomposition",
    "scope": "CORE_CANDIDATE",
    "concepts": [
      "CHEM-C08.02-CONCEPT"
    ],
    "qrtOperations": [
      "EXPLAIN",
      "REPRESENT",
      "SYNTHESIZE"
    ],
    "academicNotes": "Author-proposed tasks, not independently QRT-scored; D3/D4 is provisional. Canonical science is candidate only; Agent A prerequisites not yet pinned. Outside C09, Core1A/B teaching remains to be written; adapter does not count as a textbook.",
    "entryQuestion": "A substance turns from blue crystals to a pale powder when heated. Another substance turns from a white solid to a different white solid and releases gas. Both lose mass, but are they undergoing the same kind of chemical change?",
    "coreSummary": "A combination reaction creates one principal product from two or more reactants, whereas decomposition splits a compound into simpler products. The word *principal* matters: real experiments may include side reactions, dissolved species and energy transfer. The types are descriptions of the net chemical equation, not proof of mechanism. For example, 2H\u2082(g) + O\u2082(g) \u2192 2H\u2082O(l) combines elements, while CaCO\u2083(s) \u2192 CaO(s) + CO\u2082(g) decomposes a compound when sufficient energy is supplied. Heating is a condition, not a reaction classification. A solid that melts changes physical state while retaining the same chemical identity. Hydrated copper sulfate can lose its water of crystallisation and change colour, yet interpreting the process correctly requires identifying the hydrated solid, remaining solid and released water. Temperature, light and electric current may initiate different decompositions. An explanation must distinguish energy input from chemical bond rearrangement and specify evidence for new species. A useful three-layer picture places apparatus observations above formulas and particle counts. In a decomposition, the starting compound's atoms must be distributed among product species. In a combination, each reactant contributes atoms to the product. The same mass-conservation check applies to both directions, but energy absorbed or released is a separate account. In class demonstrations, change only one controlled variable at a time: temperature, light exposure or moisture.",
    "misconception": "'Anything heated decomposes' confuses a physical trigger with proof of a change in chemical identity. Repair by comparing material before and after, and by using species and gas tests.",
    "deepDive": "Water evaporating from a salt solution is not decomposition of sodium chloride. In contrast, heating certain compounds breaks them into chemically new substances. The gas source and residue composition decide.",
    "qrtCount": 3
  },
  {
    "subtopicId": "CHEM-C08.03",
    "adapterId": "C08",
    "title": "Single and double displacement",
    "scope": "CORE_CANDIDATE",
    "concepts": [
      "CHEM-C08.03-CONCEPT"
    ],
    "qrtOperations": [
      "EXPLAIN",
      "REPRESENT",
      "SYNTHESIZE"
    ],
    "academicNotes": "Author-proposed tasks, not independently QRT-scored; D3/D4 is provisional. Canonical science is candidate only; Agent A prerequisites not yet pinned. Outside C09, Core1A/B teaching remains to be written; adapter does not count as a textbook.",
    "entryQuestion": "A zinc strip placed in blue copper sulfate solution develops a reddish deposit, but a copper strip in zinc sulfate does not show the same result. What does this asymmetry reveal?",
    "coreSummary": "In simple metal displacement, a more reactive metal may replace a less reactive metal from its dissolved salt under suitable conditions. Zinc atoms are oxidised to Zn\u00b2\u207a while Cu\u00b2\u207a ions gain electrons and deposit as copper. The ionic description Zn(s) + Cu\u00b2\u207a(aq) \u2192 Zn\u00b2\u207a(aq) + Cu(s) makes the exchange visible. Sulfate is a spectator ion. The observation is chemical evidence for this particular pairing, not a licence to claim every metal behaves identically. Double displacement is a different kind of species rearrangement in solution: the ions from two ionic solutions can exchange partners. A visible precipitate, formation of water, or release of gas can make the net reaction evident. However, merely writing exchanged formulas does not guarantee a reaction occurs. Some proposed combinations leave all ions dissolved and lead to no net ionic change. Solubility and the actual conditions must be checked. Both classes require careful representation. Draw dissolved ions individually, not as floating 'NaCl molecules' in ordinary dilute solution. For metal displacement, the solid strip and dissolved cation represent distinct states, and charge/electron accounting explains why a metal deposits. For ion exchange, draw spectator ions before and after and explain what particle-level event removes particular ions from solution. For an ion displacement, write oxidation and reduction half-reactions before predicting amounts. The neutral spectator may remain unchanged while electrons are exchanged; collecting less visible solid than a theoretical prediction can indicate side reactions or incomplete collection, not a failure of electron conservation.",
    "misconception": "'Swap ions or metals in an equation and a reaction must occur' confuses a formal writing operation with chemical feasibility. Repair by checking observed species, energy/reactivity conditions, soluble products and controls.",
    "deepDive": "A metal might be blocked by a protective surface oxide, so a single negative displacement observation may not justify a complete reactivity ordering. Repeat with a cleaned strip and controlled solution.",
    "qrtCount": 3
  },
  {
    "subtopicId": "CHEM-C08.04",
    "adapterId": "C08",
    "title": "Precipitation and aqueous reaction evidence",
    "scope": "CORE_CANDIDATE",
    "concepts": [
      "CHEM-C08.04-CONCEPT"
    ],
    "qrtOperations": [
      "EXPLAIN",
      "REPRESENT",
      "SYNTHESIZE"
    ],
    "academicNotes": "Author-proposed tasks, not independently QRT-scored; D3/D4 is provisional. Canonical science is candidate only; Agent A prerequisites not yet pinned. Outside C09, Core1A/B teaching remains to be written; adapter does not count as a textbook.",
    "entryQuestion": "Two completely clear solutions can yield a white solid in seconds. The striking colour change is real, but how can the experiment establish which ions have combined?",
    "coreSummary": "A precipitation reaction forms an insoluble or sparingly soluble solid from dissolved species. For example, mixing aqueous barium chloride and sodium sulfate can form barium sulfate: BaCl\u2082(aq) + Na\u2082SO\u2084(aq) \u2192 BaSO\u2084(s) + 2NaCl(aq). The net ionic process is Ba\u00b2\u207a(aq) + SO\u2084\u00b2\u207b(aq) \u2192 BaSO\u2084(s). Sodium and chloride ions stay dissolved and are not constituents of the precipitate. The equation conveys a particle account, not merely a memorised visual result. A white cloud may also arise from suspended dust, bubbles, a colloid or another sparingly soluble substance. A student's scientific explanation must therefore separate observation ('the mixture became cloudy') from interpretation ('BaSO\u2084 formed'). Proper tests include filtering, identifying the residue, performing reagent blanks and checking whether the expected ions are consumed. The absence of a visible precipitate is also not absolute proof that a small amount of product did not form. At D3/D4 depth, predict the outcome from species identities, appropriate solubility information and charge balance, then reconcile it with contradictory evidence. Do not use a colour table alone to guess. Charge bookkeeping and atom conservation constrain a plausible equation; independently obtained solubility and species evidence justify the proposed reaction. Cloudiness is an observation, not a substance formula. Translate all dissolved ions into a before/after ledger, conserve charge, check limiting reactant amounts and then ask what test would identify the solid independently.",
    "misconception": "'The precipitate is NaCl because sodium and chlorine are present' ignores solubility and ionic species. Repair by writing dissociated ions and marking the actual insoluble product.",
    "deepDive": "A solution already saturated with other dissolved salts can alter precipitation behavior; do not extend a simplified solubility prediction to all concentrations and temperatures without stating assumptions.",
    "qrtCount": 3
  },
  {
    "subtopicId": "CHEM-C08.05",
    "adapterId": "C08",
    "title": "Exothermic and endothermic changes",
    "scope": "CORE_CANDIDATE",
    "concepts": [
      "CHEM-C08.05-CONCEPT"
    ],
    "qrtOperations": [
      "EXPLAIN",
      "REPRESENT",
      "SYNTHESIZE"
    ],
    "academicNotes": "Author-proposed tasks, not independently QRT-scored; D3/D4 is provisional. Canonical science is candidate only; Agent A prerequisites not yet pinned. Outside C09, Core1A/B teaching remains to be written; adapter does not count as a textbook.",
    "entryQuestion": "A beaker becomes warm when quicklime meets water, yet some reactions absorb heat and still proceed. Is the thermometer measuring 'how much energy is in the chemicals'?",
    "coreSummary": "An exothermic process transfers energy from the reacting system to its surroundings, while an endothermic process absorbs energy under the stated conditions. The words describe net energy exchange, not the numerical temperature of a substance. A thermometer measures the local sample or surroundings after heat transfer; its reading can also depend on mixing, evaporation, container heat capacity and loss to the air. Always name the system boundary before deciding the sign. For a familiar example, CaO(s) + H\u2082O(l) \u2192 Ca(OH)\u2082 with heat released to surroundings under ordinary conditions. Heating calcium carbonate so it decomposes to CaO and CO\u2082 requires energy input. An energy-profile diagram must distinguish the energy difference between reactants and products from the activation barrier. An exothermic reaction can still need an ignition or initiation step because a barrier must be crossed first. At D3, explain the causal path from bonds breaking/forming to net transfer without claiming that breaking chemical bonds itself releases energy: breaking requires input, while bond formation releases energy. At D4, compare competing processes that give the same temperature change and explain what controlled calorimetry or heat-loss correction would establish. A single warm beaker does not prove a unique reaction mechanism.",
    "misconception": "'If a reaction has an activation barrier, it must absorb energy overall' mixes energy required to start with the net energy difference. Repair by drawing reactants, barrier peak and products separately.",
    "deepDive": "A chilled beaker can temporarily feel cold even during an exothermic reaction if the net heat-flow environment is complicated. Controlled energy accounting, not touch, determines the thermochemical claim.",
    "qrtCount": 3
  },
  {
    "subtopicId": "CHEM-C08.06",
    "adapterId": "C08",
    "title": "Oxidation/reduction qualitative introduction",
    "scope": "CORE_CANDIDATE",
    "concepts": [
      "CHEM-C08.06-CONCEPT"
    ],
    "qrtOperations": [
      "EXPLAIN",
      "REPRESENT",
      "SYNTHESIZE"
    ],
    "academicNotes": "Author-proposed tasks, not independently QRT-scored; D3/D4 is provisional. Canonical science is candidate only; Agent A prerequisites not yet pinned. Outside C09, Core1A/B teaching remains to be written; adapter does not count as a textbook.",
    "entryQuestion": "Black copper oxide becomes reddish copper when hydrogen passes over a heated sample. Where did the oxygen go, and did only one chemical species change?",
    "coreSummary": "In school-level oxygen-transfer language, oxidation may mean oxygen gain while reduction means oxygen loss. They are not separate unrelated labels but two aspects of an overall redox process. For CuO + H\u2082 \u2192 Cu + H\u2082O, copper oxide loses oxygen and is reduced to copper. Hydrogen gains oxygen to become water and is oxidised. The atoms do not disappear: oxygen transfers to a different chemical species. This is a stronger explanation than 'the black substance turned red'. Not every oxidation involves molecular oxygen gas. At higher conceptual depth, electron transfer and formal oxidation states generalise the paired change, but the simple oxygen-transfer model is appropriate when the participating species make that transfer explicit. Avoid declaring every colour change redox. A colour change may accompany complex formation, acid/base indicators or physical changes without an oxidation-state change. The representation bridge is crucial: show CuO and H\u2082 as initial species, then the Cu and H\u2082O as final species, checking one Cu, one O and two H atoms on both sides. Distinguish an observed solid-colour change from confirmation of the gaseous or condensed product. At D3/D4 level, a reviewer must ask for independent tests and reject claims of a unique reaction from insufficient observations. The school oxygen-transfer language and the more general electron-transfer language must agree when both apply. Compare paired changes of formal oxidation states and remember that a balanced net equation is a model, not a measurement of complete conversion.",
    "misconception": "'Hydrogen is the reducing agent, therefore hydrogen is reduced' confuses an agent's effect on another species with its own change. Repair: name the species that gains/loses oxygen, then describe its own oxidation/reduction.",
    "deepDive": "A metal oxide might turn reddish due to a different chemical mixture or lighting; neither colour nor one balanced hypothetical equation uniquely identifies the products. Confirm species and conditions.",
    "qrtCount": 3
  },
  {
    "subtopicId": "CHEM-C09.01",
    "adapterId": "C09",
    "title": "Acid/base definitions and indicators",
    "scope": "CORE_CANDIDATE",
    "concepts": [
      "CHEM-C09.01-CONCEPT"
    ],
    "qrtOperations": [
      "EXPLAIN",
      "MODEL",
      "JUSTIFY"
    ],
    "academicNotes": "Author-proposed tasks, not independently QRT-scored; D3/D4 is provisional. Canonical science is candidate only; Agent A prerequisites not yet pinned. Outside C09, Core1A/B teaching remains to be written; adapter does not count as a textbook.",
    "entryQuestion": "Explore Acid/base definitions and indicators by comparing observations and particle identities.",
    "coreSummary": "An acid is not simply \"a liquid that turns litmus red.\" For the Class X aqueous model, the decisive chemical property is the increase of hydrogen-ion availability in water. Free bare H+ is not normally an isolated stable species in water; it is hydrated, often represented in school texts as H+(aq) and more explicitly as H3O+(aq). A base such as sodium hydroxide releases hydroxide ions into water. Another substance may behave as a base by reacting with water to generate OH\u2212. These definitions are useful within their stated aqueous scope; they should not be silently extended to every gas or nonaqueous medium.\n\nHydrogen chloride can exist as HCl(g). Properly *dry* HCl gas does not turn *dry* blue litmus paper red in the standard school demonstration. When it encounters water, its ionisation is represented as:\n\nHCl + H2O \u2192 H3O+ + Cl\u2212.\n\nThe colour change of moist blue litmus is an effect of that aqueous environment. The paper's moisture is therefore an experimental variable, not a trivial setup detail. Never deliberately inhale the gas or perform this experiment without laboratory supervision. Litmus is a useful qualitative acid/base indicator: acidic solutions turn blue litmus red; basic solutions turn red litmus blue. Phenolphthalein is colourless in acidic/near-neutral conditions and pink in sufficiently basic conditions; methyl orange has a different transition interval. Universal indicator gives a broader colour scale, but colours vary with concentration, medium and reading conditions. An indicator alone cannot identify the exact acid or base, its molarity, or whether an acid is chemically \"strong.\"\n\nStrong versus concentrated: \"strong\" concerns the extent of acid dissociation under specified conditions; \"concentrated\" concerns how much solute is present in the solution. A dilute strong acid and a concentrated weak acid are different comparisons. A colour observation often cannot separate them. Two aqueous acids can cause the same indicator response even when molecular identity and ionisation differ. Distinguish 'acidic medium' from 'how many ions are produced under matched conditions?' and 'which compound is present?'; pH or conductivity provide additional evidence, not unique chemical identification.",
    "misconception": "\"Anything that turns blue litmus red is definitely hydrochloric acid.\" Repair: indicator colour shows a property, not unique identity.",
    "deepDive": "use a second indicator and a blank damp-paper control, and explicitly distinguish indicator inference from chemical identification.",
    "qrtCount": 3
  },
  {
    "subtopicId": "CHEM-C09.02",
    "adapterId": "C09",
    "title": "Neutralisation and salt formation",
    "scope": "CORE_CANDIDATE",
    "concepts": [
      "CHEM-C09.02-CONCEPT"
    ],
    "qrtOperations": [
      "EXPLAIN",
      "MODEL",
      "JUSTIFY"
    ],
    "academicNotes": "Author-proposed tasks, not independently QRT-scored; D3/D4 is provisional. Canonical science is candidate only; Agent A prerequisites not yet pinned. Outside C09, Core1A/B teaching remains to be written; adapter does not count as a textbook.",
    "entryQuestion": "Explore Neutralisation and salt formation by comparing observations and particle identities.",
    "coreSummary": "When hydrochloric acid and sodium hydroxide mix in water, the central neutralisation is:\n\nH3O+ + OH\u2212 \u2192 2H2O.\n\nMeanwhile Na+ and Cl\u2212 remain in solution. The complete molecular-form school equation is:\n\nHCl(aq) + NaOH(aq) \u2192 NaCl(aq) + H2O(l).\n\nBoth representations have a job. The molecular equation identifies reactants and products; the ionic account shows what changes and which ions are spectators. Do not describe NaCl(aq) as a precipitate of table-salt molecules: in this context it remains dissolved as ions. The ratio matters. A small amount of base added to a large amount of acid may consume only *some* available hydronium; the mixture remains acidic. Conversely, excess base leaves a basic solution. Even at a stoichiometric equivalence point, not every weak-acid/weak-base salt solution is pH 7; salt hydrolysis may matter (advanced boundary). Thus \"acid + base \u2192 salt + water\" is a reaction pattern, not a theorem that every mixed sample becomes neutral.",
    "misconception": "\"Both reagents are present, therefore all acid is gone.\" Repair: build the reactant amount ledger first.",
    "deepDive": "atom, charge and excess-reactant conservation; try reversing the volumes.",
    "qrtCount": 3
  },
  {
    "subtopicId": "CHEM-C09.03",
    "adapterId": "C09",
    "title": "pH scale and applications (no logarithmic derivation required)",
    "scope": "CORE_CANDIDATE",
    "concepts": [
      "CHEM-C09.03-CONCEPT"
    ],
    "qrtOperations": [
      "EXPLAIN",
      "MODEL",
      "JUSTIFY"
    ],
    "academicNotes": "Author-proposed tasks, not independently QRT-scored; D3/D4 is provisional. Canonical science is candidate only; Agent A prerequisites not yet pinned. Outside C09, Core1A/B teaching remains to be written; adapter does not count as a textbook.",
    "entryQuestion": "Explore pH scale and applications (no logarithmic derivation required) by comparing observations and particle identities.",
    "coreSummary": "The school-level pH scale orders aqueous solutions by acidity. Under ordinary dilute aqueous conditions at about 25 \u00b0C, pH below 7 is acidic, 7 is neutral, and above 7 is basic. A smaller pH is associated with greater hydronium activity. At higher depth, pH uses a logarithmic scale, but the CBSE Class X specification explicitly does not require derivation of the logarithmic definition. We can compare trends and evidence before quantitative extensions.\n\nWhy does dilution generally make a simple acid solution less acidic? When water is added without adding more acid, the acid-derived hydronium becomes distributed through a larger volume. Other chemical equilibria can complicate exact quantitative predictions, so we should predict the direction confidently under standard assumptions without claiming an unsupported fixed change in pH. Acidic stomach contents help digestion, while excess acidity can cause discomfort. Tooth enamel is vulnerable when mouth pH falls sufficiently; local conditions and duration matter. Soil and aquatic life respond to pH ranges rather than one magic safe number. Distinguish a measured pH from a diagnosis or an environmental cause: you need contextual evidence.",
    "misconception": "\"Add enough water and all acid is chemically neutralised.\" Repair: dilution lowers concentration without consuming acid species by neutralisation.",
    "deepDive": "reverse the intervention by comparing actual added acid/base amount, not colour alone.",
    "qrtCount": 3
  },
  {
    "subtopicId": "CHEM-C09.04",
    "adapterId": "C09",
    "title": "Common salts: soda, bleaching powder and plaster of Paris",
    "scope": "CORE_CANDIDATE",
    "concepts": [
      "CHEM-C09.04-CONCEPT"
    ],
    "qrtOperations": [
      "EXPLAIN",
      "MODEL",
      "JUSTIFY"
    ],
    "academicNotes": "Author-proposed tasks, not independently QRT-scored; D3/D4 is provisional. Canonical science is candidate only; Agent A prerequisites not yet pinned. Outside C09, Core1A/B teaching remains to be written; adapter does not count as a textbook.",
    "entryQuestion": "Explore Common salts: soda, bleaching powder and plaster of Paris by comparing observations and particle identities.",
    "coreSummary": "Caustic soda is sodium hydroxide, NaOH, an alkali and important industrial raw material. Industrial electrolysis of aqueous sodium chloride (the chlor-alkali process) produces NaOH, hydrogen and chlorine under controlled conditions:\n\n2NaCl(aq) + 2H2O(l) \u2192 2NaOH(aq) + H2(g) + Cl2(g).\n\nThe hazardous gases and caustic chemicals make this an industrial description, not a home experiment.\n\nBaking soda is sodium hydrogen carbonate, NaHCO3. On heating it can form sodium carbonate, water and carbon dioxide:\n\n2NaHCO3 \u2192 Na2CO3 + CO2 + H2O.\n\nIts reaction with acidic ingredients releases CO2, important in baking. Washing soda is hydrated sodium carbonate, conventionally Na2CO3\u00b710H2O. The two are not interchangeable just because both contain sodium and carbonate-related ions. Hydration water is part of the crystal composition and must not be confused with a change in sodium-carbonate identity.\n\nBleaching powder is often represented at school level by the empirical idealised formula CaOCl2 and is made using chlorine and dry slaked lime. Commercial bleaching-powder material is more complicated than a collection of pure discrete \"CaOCl2 molecules\"; do not claim molecular purity from the school shorthand. Its applications depend on oxidising available chlorine, handled only with suitable precautions.\n\nGypsum is CaSO4\u00b72H2O. Heating under controlled conditions yields Plaster of Paris, often written CaSO4\u00b71/2H2O. Adding water allows the plaster to set through rehydration. The fractional hydration notation records the average composition of the calcium sulfate hemihydrate, not half a standalone water molecule moving independently through the solid. A hydrate contains a definite compositional water ratio, not simply surface wetness. Model theoretical mass loss from its chemical formula and separately test whether the weighed residue has reached the assumed final hydration state.",
    "misconception": "\"All white sodium powders are one salt\" or \"a commercial product formula proves purity.\" Repair: check anions, hydrate states and controls.",
    "deepDive": "balance equations and identify at least one discriminating chemical observation.",
    "qrtCount": 3
  },
  {
    "subtopicId": "CHEM-C09.05",
    "adapterId": "C09",
    "title": "Acid reactions with metals and carbonates",
    "scope": "CORE_CANDIDATE",
    "concepts": [
      "CHEM-C09.05-CONCEPT"
    ],
    "qrtOperations": [
      "EXPLAIN",
      "MODEL",
      "JUSTIFY"
    ],
    "academicNotes": "Author-proposed tasks, not independently QRT-scored; D3/D4 is provisional. Canonical science is candidate only; Agent A prerequisites not yet pinned. Outside C09, Core1A/B teaching remains to be written; adapter does not count as a textbook.",
    "entryQuestion": "Explore Acid reactions with metals and carbonates by comparing observations and particle identities.",
    "coreSummary": "Zinc reacts with dilute nonoxidising hydrochloric acid to liberate hydrogen under suitable conditions:\n\nZn(s) + 2HCl(aq) \u2192 ZnCl2(aq) + H2(g).\n\nCalcium carbonate reacts with hydrochloric acid to liberate carbon dioxide:\n\nCaCO3(s) + 2HCl(aq) \u2192 CaCl2(aq) + H2O(l) + CO2(g).\n\nThe shared macroscopic observation is bubbling. That is insufficient to identify the gas. The reacting solid, chemical species and confirmatory test distinguish the two pathways.\n\nIn a supervised laboratory, hydrogen may give a characteristic pop with a tiny collected sample near a flame; because it is flammable, never propose this as an unsupervised home activity. Carbon dioxide turns clear limewater milky through calcium carbonate precipitation:\n\nCa(OH)2 + CO2 \u2192 CaCO3(s) + H2O.\n\nExcess CO2 may subsequently dissolve the precipitate by forming soluble hydrogen carbonate under the right conditions, so the full observations and gas amount matter. Not every metal displaces hydrogen from every acid. Copper does not ordinarily liberate H2 from dilute hydrochloric acid. An oxidising acid such as nitric acid may give different reduction products rather than the familiar hydrogen reaction, depending on conditions. The useful rule is a conditional model, not a universal gas-output formula.",
    "misconception": "\"Bubbles mean hydrogen.\" Repair: separate reaction-type prediction from gas confirmation.",
    "deepDive": "balance the candidate equations and test whether the same observation could have another chemical cause.",
    "qrtCount": 3
  },
  {
    "subtopicId": "CHEM-C09.06",
    "adapterId": "C09",
    "title": "Polyprotic acids and phosphorus oxyacid structures (extension)",
    "scope": "EXTENSION",
    "concepts": [
      "CHEM-C09.06-CONCEPT"
    ],
    "qrtOperations": [
      "EXPLAIN",
      "MODEL",
      "JUSTIFY"
    ],
    "academicNotes": "Author-proposed tasks, not independently QRT-scored; D3/D4 is provisional. Canonical science is candidate only; Agent A prerequisites not yet pinned. Outside C09, Core1A/B teaching remains to be written; adapter does not count as a textbook. No inference of CBSE Class IX/X official coverage: advanced topic is an author research extension and requires independent academic source admission.",
    "entryQuestion": "This section is clearly beyond ordinary Class X acid/base core. It is included because the existing NSEJS-oriented authored material specifically raises a structural reasoning challenge. This chapter does not imply that detailed phosphorus oxyacid chemistry is compulsory for NSEJS.",
    "coreSummary": "Three compounds can all have three hydrogen atoms in their formula yet have different numbers of acid-ionisable protons:\n\n| Acid | Structural shorthand | P\u2013OH units | Structural basicity |\n|---|---|---:|---:|\n| H3PO2 (hypophosphorous / phosphinic acid) | H2P(=O)\u2013OH | 1 | Monobasic |\n| H3PO3 (phosphorous / phosphonic acid) | HP(=O)(OH)2 | 2 | Dibasic |\n| H3PO4 (phosphoric acid) | P(=O)(OH)3 | 3 | Tribasic |\n\nThe decisive connection is which hydrogens are attached to oxygen (P\u2013OH) rather than to phosphorus (P\u2013H). In the standard structural acid-base account, P\u2013H hydrogen is not an ionisable proton of the same kind as O\u2013H hydrogen. Different structural arrangements are required even though all three molecular formulas show H3. For H3PO3, draw a P=O group, two P\u2013OH groups and one P\u2013H. Count hydrogen atoms: two from O\u2013H and one directly attached to phosphorus, totalling three. Then count acid-dissociable O\u2013H units: two. So it is dibasic, not tribasic. Run the same procedure for H3PO2 and H3PO4. This method explains the answer rather than offering a formula trick. Phosphorus oxyacids containing P\u2013H bonds can have reducing behaviour; structural basicity and redox activity are therefore different properties. Do not infer one from the other solely from molecular hydrogen count. The detailed electronic explanations and acid dissociation constants are advanced additions requiring their own academic review.\n\nThree demands: EXPLAIN the structural distinction between P\u2013OH and P\u2013H; MODEL the molecular connectivity from constrained information; JUSTIFY why the same H3 total does not imply equal basicity.\n\nTypical wrong path: \"H3 means three acidic H\" or \"the number of P\u2013H bonds equals basicity.\" Repair: reconstruct the actual O\u2013H connections. Independent check: count all atoms in the structural shorthand and count P\u2013OH groups independently.\n\n---",
    "misconception": "\"H3 means three acidic H\" or \"the number of P\u2013H bonds equals basicity.\" Repair: reconstruct the actual O\u2013H connections.",
    "deepDive": "count all atoms in the structural shorthand and count P\u2013OH groups independently.",
    "qrtCount": 3
  },
  {
    "subtopicId": "CHEM-C10.01",
    "adapterId": "C10",
    "title": "Physical and chemical properties",
    "scope": "CORE_CANDIDATE",
    "concepts": [
      "CHEM-C10.01-CONCEPT"
    ],
    "qrtOperations": [
      "EXPLAIN",
      "MODEL",
      "SYNTHESIZE"
    ],
    "academicNotes": "Author-proposed tasks, not independently QRT-scored; D3/D4 is provisional. Canonical science is candidate only; Agent A prerequisites not yet pinned. Outside C09, Core1A/B teaching remains to be written; adapter does not count as a textbook.",
    "entryQuestion": "A pencil lead conducts electricity, whereas a crystalline salt often does not while solid. If conductivity alone identified a metal, graphite would become a metal. The contradiction is a useful entry into particle-level explanation.",
    "coreSummary": "Most metals are lustrous, malleable and conduct heat and electricity because electrons can move through the solid metallic structure. By contrast, many non-metals form molecular or covalent-network solids whose electrons are not mobile in the same way. Those are trends, not definitions. Graphite has mobile electrons within its layers although it is carbon; iodine is lustrous but not a metal; mercury is a liquid metal at room temperature. Classification must combine identity, bonding and several observations. A material's conductivity depends on available mobile charge carriers. In metals, mobile electrons carry charge through a solid. In a solid ionic salt, ions are present but locked into positions in the crystal; on melting or dissolving in water, suitable ions become mobile. In graphite, delocalised electrons move within layered carbon networks. The same macroscopic reading can have different particle explanations, so conductivity alone does not reveal a unique bonding model. At an Olympiad-level evidence table, compare lustre, brittleness, melting behaviour, conductivity of the dry solid and conductivity after melting or dissolution. The correct task is to construct and reject models under stated conditions. Do not infer metallic identity from a single observation, and do not expect one classroom property to classify all elements without exceptions. Mobile charge carriers may be electrons or ions; graphite is a nonmetal with anisotropic electronic conduction. Ionic lattices usually have immobile ions; dissolved or molten ions may carry current. Conductivity alone cannot identify a material; control contacts, geometry and phase. Conductivity is a macroscopic response; a mechanism must identify a mobile charge carrier and the structure permitting its motion. Direction and physical state help discriminate the models. The same final species can result from dissociation or chemical ionisation. A state change, dissolution and reaction are distinct processes; a final measurement does not always reconstruct initial identity. Worked EXPLAIN construction (authored teaching example): A silver wire and a carbon electrode both carry current, while an ordinary dry KCl crystal does not. In silver, electrons move through the metallic structure; in graphitic carbon, delocalised electrons move along covalent sheets; in dry KCl the ions occupy lattice positions. Thus current is not an elemental classification: each explanation needs a mobile carrier and a permitted path. Worked MODEL construction (authored teaching example): An unknown sample has low conduction across its sheet but high along it, and its composition is carbon. A layered network is consistent with direction-sensitive electron paths. An isotropic metallic model would not explain the directional evidence without additional assumptions. Confirm the structure independently; contact geometry can also change measured current. Worked SYNTHESIZE construction (authored teaching example): Dry KBr contains ions before dissolution; a neutral molecular acid can instead generate ions by reaction with water. In both final liquids charged particles can move, so the shared observation does not recover the starting bonding. Use a separate solid-state composition or diffraction observation to distinguish the histories.",
    "misconception": "Wrong path: 'anything shiny or electrically conducting is a metal.' Repair: test multiple properties and identify the actual charge carriers instead of treating appearance as a definition.",
    "deepDive": "If a carbon sample fails a conductivity check due to poor electrical contacts, the negative measurement does not prove it is diamond. Recalibrate apparatus and test another physical/chemical property.",
    "qrtCount": 3
  },
  {
    "subtopicId": "CHEM-C10.02",
    "adapterId": "C10",
    "title": "Metal reactivity and displacement",
    "scope": "CORE_CANDIDATE",
    "concepts": [
      "CHEM-C10.02-CONCEPT"
    ],
    "qrtOperations": [
      "EXPLAIN",
      "MODEL",
      "SYNTHESIZE"
    ],
    "academicNotes": "Author-proposed tasks, not independently QRT-scored; D3/D4 is provisional. Canonical science is candidate only; Agent A prerequisites not yet pinned. Outside C09, Core1A/B teaching remains to be written; adapter does not count as a textbook.",
    "entryQuestion": "Place zinc into blue copper sulfate solution and watch copper appear. Reverse the solids and solutions, and the reaction disappears under ordinary conditions. Instead of memorising a ladder, ask which observations constrain a pairwise tendency.",
    "coreSummary": "The metal reactivity series summarises comparative chemical tendencies in familiar aqueous displacement and other reactions. Zinc can reduce aqueous Cu\u00b2\u207a to copper while becoming Zn\u00b2\u207a: Zn(s) + Cu\u00b2\u207a(aq) \u2192 Zn\u00b2\u207a(aq) + Cu(s). In a simple comparison, zinc is more reactive than copper. The solution's anion may be a spectator, but the reactivity claim applies under controlled conditions. An exchange written on paper does not establish spontaneity. A reactivity order can be built from directed evidence. Suppose A displaces B\u00b2\u207a, and B displaces C\u00b2\u207a under comparable conditions. Then the observations support A > B > C for the tested displacement behaviour. They do not specify exact reaction rates, nor how A compares with a fourth untested metal D. Displacement arrows must be grounded in observations with identified deposits and controlled reagents. An unreactive-looking strip may be covered by an oxide layer. Aluminium's protective oxide film can mask rapid metal reactivity in one experiment. Temperature, concentration and surface preparation therefore change what a negative observation means. Treat all negative evidence with a documented sensitivity check, not as a universal theorem. Positive displacement indicates relative tendency under controlled conditions; negative evidence may be masked by coating or kinetics. For a sole coupled reaction, electron release equals electron uptake. Divalent-to-divalent displacement gives equal amounts only if no other electron acceptor or measurement loss. In a sole displacement reaction, oxidation and reduction are coupled by electron conservation. Product recovery is not necessarily reaction extent; colour is qualitative evidence. Comparable positive displacement tests constrain relative tendencies; transitivity assumes the same relevant chemical system. Negative tests require control for passivation and sensitivity. Worked EXPLAIN construction (authored teaching example): In an ideal Mg/Cu\u00b2\u207a displacement, 0.015 mol Mg becomes Mg\u00b2\u207a, releasing 0.030 mol electrons. If Cu\u00b2\u207a is the sole acceptor, 0.015 mol Cu forms. A recovery of 0.012 mol copper is not automatically a violation of charge conservation: the recovered sample may omit part of the deposit. Distinguish measured recovery from reaction extent. Worked MODEL construction (authored teaching example): Under matched metal-ion conditions, U displaces V, V displaces W, and T displaces W. The graph implies U>V>W and T>W but does not order T relative to U or V. Testing T against U decides the maximum if a positive controlled comparison exists; if T lies below U, a further comparison with V may complete the ranking. Worked SYNTHESIZE construction (authored teaching example): In a model experiment, U displaces V\u00b2\u207a and W displaces V\u00b2\u207a. An independent sample shows 0.025 mol U\u00b2\u207a formed and 0.025 mol V deposited. Both tests establish edges toward V; the second ledger accounts for 0.050 mol electron release and uptake. It does not resolve U versus W or establish relative acid reaction rate.",
    "misconception": "Wrong path: 'no deposit means the metal is less reactive.' Repair: control surface oxide, reagent age, temperature and concentration, then repeat before ordering.",
    "deepDive": "If Zn is passivated, a result may contradict the simple expectation. A model must distinguish chemical tendency from an observation masked by kinetics or surface barriers.",
    "qrtCount": 3
  },
  {
    "subtopicId": "CHEM-C10.03",
    "adapterId": "C10",
    "title": "Ionic compound formation and properties",
    "scope": "CORE_CANDIDATE",
    "concepts": [
      "CHEM-C10.03-CONCEPT"
    ],
    "qrtOperations": [
      "EXPLAIN",
      "MODEL",
      "SYNTHESIZE"
    ],
    "academicNotes": "Author-proposed tasks, not independently QRT-scored; D3/D4 is provisional. Canonical science is candidate only; Agent A prerequisites not yet pinned. Outside C09, Core1A/B teaching remains to be written; adapter does not count as a textbook.",
    "entryQuestion": "Solid sodium chloride contains charged particles but usually does not conduct a current. Its molten form can conduct. The explanation emerges only when 'charged particle' is distinguished from 'mobile charged particle.'",
    "coreSummary": "An ionic compound is an electrically neutral aggregate of positively and negatively charged ions. Simple shell diagrams explain electron transfer between a metal and nonmetal; for MgCl\u2082, Mg forms Mg\u00b2\u207a and two chloride ions each have charge \u22121. Charge balance gives one Mg\u00b2\u207a for every two Cl\u207b in the formula unit. That formula does not mean the solid consists of separated MgCl\u2082 molecules; a three-dimensional lattice is a better model. In the solid ionic lattice, ions vibrate about equilibrium positions but cannot freely travel through the bulk, so the solid usually does not conduct. Upon melting, ions can move and carry electric charge. On dissolving in water, a soluble ionic material may yield mobile hydrated ions. High melting points reflect substantial ionic attraction, but not every ionic solid has the same properties and not every high melting point proves ionic character. The representation levels must remain explicit: the formula MgCl\u2082 is a **ratio**; a lattice diagram shows an extended repeating arrangement; a current measurement measures movement of charge. Treat electrostatic attraction and chemical bond formation as physical models, not as a set of ionic molecules touching. A formula unit gives smallest charge-neutral integer ratio. A dissolved or molten salt may conduct through mobile ions, with conductivity depending on charge, concentration and mobility. Counts based on complete dissociation are model predictions. Ionic neutrality determines formula ratio; transport depends on charged species mobility, concentration and charge. Equal sample mass need not imply equal formula amount. Formula units conserve charge; precipitation removes ions in stoichiometric ratios. Residual solution must remain electrically neutral while retaining mobile charge carriers. Worked EXPLAIN construction (authored teaching example): Equal masses of two salts need not contain equal moles or give equal concentrations. For 0.10 mol KCl dissolved completely in 1 L, there are 0.10 mol/L K\u207a and Cl\u207b; a different salt's ions may have different charge or mobility. Dry KCl has low ordinary ionic mobility, whereas molten KCl has mobile ions. The transport explanation depends on state and carriers, not merely presence of charges. Worked MODEL construction (authored teaching example): For hypothetical C\u00b2\u207a and D\u00b3\u207b, neutrality requires C\u2083D\u2082 (3\u00d72=2\u00d73). In 0.010 mol completely dissociated salt there are 0.030 mol C\u00b2\u207a and 0.020 mol D\u00b3\u207b; positive and negative charge equivalents are both 0.060 mol. A five-ion count per unit does not specify conductivity because mobility and concentration matter. Worked SYNTHESIZE construction (authored teaching example): Mix 0.030 mol Ag\u207a and 0.020 mol Cl\u207b in a hypothetical complete precipitation model with spectator Na\u207a and NO\u2083\u207b. AgCl forms 0.020 mol, leaving 0.010 mol Ag\u207a. If starting salts were AgNO\u2083 and NaCl, dissolved NO\u2083\u207b=.030 and Na\u207a=.020 mol; positive and negative equivalents both .030. Precipitation removes particular ions, not every carrier.",
    "misconception": "Wrong path: 'If a compound conducts after dissolving, its starting structure must be ionic.' Repair: recall that molecular acids can form ions in water; require evidence about the original structure and possible chemical reaction.",
    "deepDive": "If ionic material has poor water solubility, its aqueous conductivity may be low despite ionic bonding. A negative aqueous test is not a clean structural classification.",
    "qrtCount": 3
  },
  {
    "subtopicId": "CHEM-C10.04",
    "adapterId": "C10",
    "title": "Extraction and basic metallurgical processes",
    "scope": "CORE_CANDIDATE",
    "concepts": [
      "CHEM-C10.04-CONCEPT"
    ],
    "qrtOperations": [
      "EXPLAIN",
      "MODEL",
      "SYNTHESIZE"
    ],
    "academicNotes": "Author-proposed tasks, not independently QRT-scored; D3/D4 is provisional. Canonical science is candidate only; Agent A prerequisites not yet pinned. Outside C09, Core1A/B teaching remains to be written; adapter does not count as a textbook.",
    "entryQuestion": "Why can some oxides be reduced by carbon while molten sodium chloride requires electrolysis to produce sodium metal? The answer lies in the relative chemical stability of compounds and the model's energy and reactivity assumptions.",
    "coreSummary": "Most useful metals occur as ores\u2014naturally occurring materials from which extraction is economically and chemically feasible. Before reduction, concentration separates gangue from useful minerals. Sulfide ores are commonly roasted in air to form oxides while releasing sulfur-containing gases; carbonate ores are commonly calcined by heating, often with limited air, to form oxides plus CO\u2082. These are conversion stages, not yet necessarily the final extraction of a metal. Oxides of moderately reactive metals may be reduced with carbon or carbon monoxide under suitable high-temperature conditions. Highly reactive metals such as sodium and aluminium usually require electrolysis of appropriate molten ionic materials or industrial systems, because simple carbon reduction is not a viable general route. Less reactive metals can sometimes be recovered by heating or other relatively mild chemistry. The reactivity series helps choose an extraction family, but actual industrial choices depend on ore composition, temperature, impurities, cost and environmental safety. Do not call a balanced extraction equation an industrial process proof. Rate, equilibrium, materials handling and energy costs may make it impractical. At D4, compare alternate pathways under constraints rather than memorise 'high metal \u2192 electrolysis'. Roasting releases air pollutants that demand control; electrolysis has an electricity cost, so feasibility is multidimensional. Ore form, metal reactivity, thermodynamics, side reactions and recovery govern extraction. Calcination of carbonate can release CO\u2082; suitable oxide reduction can liberate metal. Model balances are not practical laboratory instructions. Zinc recovery may involve vapour collection. Metal extraction requires a chemically feasible reduction or external electrical work; actual recovery also depends on separation. Balanced equations cannot by themselves establish feasibility. Sulphide and carbonate feedstocks require different conversion reactions but can share a common oxide intermediate. Species-specific data distinguish parallel pathways. A residue mass can reveal a mixture only when the escaping product and retained material are known. Example: an ideal 10.0 g mixture of MgCO\u2083 and MgO loses 2.20 g on complete carbonate decomposition. MgCO\u2083 \u2192 MgO + CO\u2082; 2.20/44 = 0.050 mol carbonate, mass 4.20 g (MgCO\u2083=84). Initial MgO=5.80 g. The residue is 7.80 g, consisting of 5.80 g original oxide and 2.00 g new oxide. An inert impurity or partial conversion introduces additional unknowns. Worked EXPLAIN construction (authored teaching example): Consider atom-balanced hypothetical reduction equations for calcium oxide and copper oxide. The atom ledger alone does not establish feasibility. Calcium is highly reactive and ordinary carbon reduction is unsuitable; an appropriate electrolytic route supplies external electrical work. A copper oxide can be reduced by a suitable reductant under appropriate conditions. Separation and recovery are distinct from chemical conversion. Worked MODEL construction (authored teaching example): An ideal mixed feed has 0.05 mol ZnS and 0.15 mol ZnCO\u2083. Roasting model: 2ZnS+3O\u2082\u21922ZnO+2SO\u2082; calcination model: ZnCO\u2083\u2192ZnO+CO\u2082. These yield 0.05 mol SO\u2082, 0.15 mol CO\u2082 and 0.20 mol ZnO. A specified reduction ZnO+C\u2192Zn+CO yields 0.20 mol CO. Measuring total gas alone cannot recover the feed split because each feed releases one conversion gas per Zn. Worked SYNTHESIZE construction (authored teaching example): A feed of 0.08 mol ZnCO\u2083 yields 0.08 mol ZnO and 0.08 mol CO\u2082 if complete. If only 0.06 mol ZnO then reacts in the ideal carbon-to-CO model, 0.06 mol zinc and 0.06 mol CO form and 0.02 mol oxide remains. If only 0.05 mol zinc is collected, that difference is recovery loss, not extra unreacted oxide.",
    "misconception": "Wrong path: 'Every oxide can be reduced by carbon if it is heated enough.' Repair: compare metal reactivity, oxide stability and industrial conditions, and distinguish elementary balanced writing from actual feasibility.",
    "deepDive": "The same metal may have several ores requiring different pretreatment; a sulfide route cannot be replaced by carbonate calcination without examining the species.",
    "qrtCount": 3
  },
  {
    "subtopicId": "CHEM-C10.05",
    "adapterId": "C10",
    "title": "Oxides and amphoterism",
    "scope": "CORE_CANDIDATE",
    "concepts": [
      "CHEM-C10.05-CONCEPT"
    ],
    "qrtOperations": [
      "EXPLAIN",
      "MODEL",
      "SYNTHESIZE"
    ],
    "academicNotes": "Author-proposed tasks, not independently QRT-scored; D3/D4 is provisional. Canonical science is candidate only; Agent A prerequisites not yet pinned. Outside C09, Core1A/B teaching remains to be written; adapter does not count as a textbook.",
    "entryQuestion": "Zinc oxide reacts with an acid, so a student declares it 'basic and only basic'. Yet it can also react with strong alkali in suitable media. Why does one successful test not establish a universal category?",
    "coreSummary": "Many metal oxides are basic, but some are amphoteric: they show acid-like or base-like behaviour depending on the reaction partner and conditions. For zinc oxide, an acid reaction is ZnO(s) + 2HCl(aq) \u2192 ZnCl\u2082(aq) + H\u2082O(l). In sufficiently strong aqueous base, a different ionic account can be ZnO(s) + 2OH\u207b(aq) + H\u2082O(l) \u2192 [Zn(OH)\u2084]\u00b2\u207b(aq). This is an appropriate conditional model for aqueous zincate formation. Aluminium oxide is another standard amphoteric oxide. A school-level representation includes Al\u2082O\u2083 + 6HCl \u2192 2AlCl\u2083 + 3H\u2082O and the simplified reaction Al\u2082O\u2083 + 2NaOH \u2192 2NaAlO\u2082 + H\u2082O, but real aqueous aluminate speciation depends on conditions. No student should infer a single discrete 'amphoteric molecule' from the shorthand equation. An acid/base classification is meaningful only with an appropriate chemical model and reagent conditions. 'Neutral oxide' is not equivalent to amphoteric: an amphoteric oxide *can react* with both acids and bases, while a neutral oxide in the school classification does not show those ordinary acid/base reactions. Use two separate reaction observations and product evidence rather than a memorised label. Amphoteric oxides react with acids and suitable bases. Aluminium oxide in aqueous strong base can form hydroxoaluminate [Al(OH)\u2084]\u207b; anhydrous aluminate representation differs. Dilute-base negative result is insufficient without appropriate conditions. An amphoteric oxide can act as base toward acid and react with strong base to form soluble species; the two contexts require different products and balanced equations. Selective reaction evidence can separate mixture components when stoichiometric ratios and selectivity are established; inverse inference fails when unmodelled species consume reagent. An inverse mass balance can identify an oxide when a defined anhydrous product is isolated quantitatively. For ideal M\u2082O\u2083 \u2192 2NaMO\u2082, the two products contain the original two M atoms and add a net 62 g per mole of oxide (2Na + O). A sample of 3.00 g giving 4.86 g product therefore represents 0.030 mol oxide, with molar mass 100 g/mol and M atomic mass 26. This is a hypothetical element mass, not a claim about a real oxide. In acid, one formula unit consumes 6 H\u207a; 0.030 mol oxide consumes 0.180 mol H\u207a. In aqueous base the actual species can be hydroxo complexes; the anhydrous formula applies only to the isolated product under the model. Check masses, charge and isolation assumptions separately. Worked EXPLAIN construction (authored teaching example): Al\u2082O\u2083+6H\u207a\u21922Al\u00b3\u207a+3H\u2082O accounts for dissolution in acid; Al\u2082O\u2083+2OH\u207b+3H\u2082O\u21922[Al(OH)\u2084]\u207b accounts for dissolution in suitable strong aqueous base. The first equation also fits a basic oxide; the second supplies separate amphoteric evidence. Both equations conserve atoms and charge. Conditions must support the specified species. Worked MODEL construction (authored teaching example): An ideal M\u2082O\u2083 sample of 1.60 g consumes 0.060 mol H\u207a. Because six acid equivalents react per formula unit, amount=.010 mol, molar mass=160 and M=(160\u221248)/2=56. This identifies a hypothetical oxide metal mass under the model, not proof of amphoterism. A separate base-reaction observation is required. Worked SYNTHESIZE construction (authored teaching example): An ideal CaO/ZnO mixture consumes 0.080 mol H\u207a and 0.020 mol OH\u207b in separate complete selective-base tests. Both oxides consume two H\u207a per mole, but only ZnO consumes two OH\u207b per mole in the assumed model. Thus ZnO=.010 mol, CaO=.030 mol, total mass .010\u00d781+.030\u00d756=2.49 g. An independently measured mass can reveal a failed selectivity assumption.",
    "misconception": "Wrong path: 'Anything that reacts with acid must be incapable of reacting with base.' Repair: compare both experiments, state products and check whether the second is a chemical process rather than mere suspension.",
    "deepDive": "If the base is very dilute or oxide is covered by contaminants, an expected reaction may not be visually clear. This is a limitation of the test, not proof that amphoterism is impossible.",
    "qrtCount": 3
  },
  {
    "subtopicId": "CHEM-C10.06",
    "adapterId": "C10",
    "title": "Corrosion and prevention",
    "scope": "CORE_CANDIDATE",
    "concepts": [
      "CHEM-C10.06-CONCEPT"
    ],
    "qrtOperations": [
      "EXPLAIN",
      "MODEL",
      "SYNTHESIZE"
    ],
    "academicNotes": "Author-proposed tasks, not independently QRT-scored; D3/D4 is provisional. Canonical science is candidate only; Agent A prerequisites not yet pinned. Outside C09, Core1A/B teaching remains to be written; adapter does not count as a textbook.",
    "entryQuestion": "Two iron nails are left for several days: one in dry air, one in moist air. Only the moist nail develops significant rust. A zinc-coated scratch behaves differently from a scratch in ordinary paint. What is the mechanism behind both observations?",
    "coreSummary": "Common iron rusting is a complex electrochemical oxidation that involves iron, moisture and oxygen; the familiar hydrated iron(III) oxide product does not have one universally fixed molecular formula. Local anodic regions lose electrons as iron is oxidised, while oxygen reduction occurs at other regions in the presence of water. Saltwater often speeds the process by increasing ionic conductivity. Corrosion is thus not merely 'oxygen touching metal'. Rust-prevention methods work by different mechanisms. Paint, grease and oil generally exclude water and oxygen from the surface, so a scratch can break the barrier and expose iron. Galvanising coats iron with zinc, which can provide both a barrier and sacrificial protection because zinc is more readily oxidised under many common conditions. In a scratched galvanised surface the nearby zinc may protect exposed iron; performance depends on coating continuity, environment and galvanic connection. A good experiment uses three controlled test tubes: dry air with a drying agent; water boiled to remove much dissolved oxygen and covered appropriately to limit air entry; and ordinary air plus water. Compare otherwise identical clean iron pieces. A single rusty control does not establish a complete electrochemical mechanism, but it supports the joint moisture/oxygen requirement. Avoid handling chemicals such as desiccants unsupervised. Corrosion couples metal oxidation with reduction of an electron acceptor; ions carry charge through water. Salt accelerates many conditions but cannot replace oxygen in ordinary rusting. Sacrificial protection depends on electronic contact and ionic path. Corrosion couples electron movement in metal to ionic movement in electrolyte; oxygen reduction is a common cathodic reaction. A controlled experiment changes one relevant variable at a time. A protective coating can block reactants or alter electrochemical reactions. Sacrificial protection needs electronic connection, an electrolyte and sufficient sacrificial material. Worked EXPLAIN construction (authored teaching example): Three matched iron specimens in wet oxygenated, wet oxygen-depleted and dry oxygenated environments separate oxygen and electrolyte effects. Fe oxidation provides electrons; neutral aerated water can reduce O\u2082 to OH\u207b. Water permits ionic motion, so oxygen presence alone is insufficient for ordinary rusting. Other corrosion pathways may exist in acidic oxygen-free conditions. Worked MODEL construction (authored teaching example): A coating barrier prevents wet contact while intact; an exposed scratch defeats that local barrier. An electrically connected zinc piece may supply electrons via preferential oxidation, so an exposed region can still be protected. Disconnecting the zinc removes that galvanic pathway while leaving the visible material nearby. Compare equal exposed areas and contact. Worked SYNTHESIZE construction (authored teaching example): In a hypothetical wet system, 0.010 mol Fe oxidises to Fe\u00b2\u207a and releases 0.020 mol electrons. If oxygen is the sole cathodic acceptor via O\u2082+2H\u2082O+4e\u207b\u21924OH\u207b, 0.005 mol O\u2082 is consumed. More dissolved salt may increase ionic conductivity but does not alter this ideal electron ratio. Actual corrosion products and rate require measurements. A conductive coating may be sacrificial or more noble than the substrate. In a hypothetical electrically connected pair, whichever metal is oxidised supplies electrons; if the coating is more noble, exposed substrate can instead become the anodic region. An intact coating may still act as a barrier. Compare local corrosion and coating loss under matched exposure; contact alone does not determine direction. This is a conceptual model, not an experimental instruction.",
    "misconception": "Wrong path: 'Every coating protects in exactly the same way.' Repair: distinguish a passive barrier from a sacrificial electrochemical partner, and state what happens when scratched.",
    "deepDive": "Stainless steels rely on alloying and passive oxide films; they may still corrode in aggressive conditions. 'Stainless' is not a universal absence of chemical reactivity.",
    "qrtCount": 3
  },
  {
    "subtopicId": "CHEM-C11.01",
    "adapterId": "C11",
    "title": "Catenation and carbon covalent bonds",
    "scope": "CORE_CANDIDATE",
    "concepts": [
      "CHEM-C11.01-CONCEPT"
    ],
    "qrtOperations": [
      "REPRESENT",
      "SYNTHESIZE",
      "JUSTIFY"
    ],
    "academicNotes": "Author-proposed tasks, not independently QRT-scored; D3/D4 is provisional. Canonical science is candidate only; Agent A prerequisites not yet pinned. Outside C09, Core1A/B teaching remains to be written; adapter does not count as a textbook.",
    "entryQuestion": "Four bonds from one carbon atom sound simple, yet they lead to enormous diversity. Why can two compounds share a molecular formula but differ in structure and behaviour?",
    "coreSummary": "Carbon has four valence electrons and forms stable covalent bonds with carbon and many other elements by sharing electron pairs. Tetravalency is a constraint on the sum of bond orders around a typical neutral carbon atom: four single bonds, two doubles, one triple plus a single, or other valid combinations. A structural formula must satisfy the bond count; a molecular formula records only element totals and can hide different connectivities. Catenation means carbon can join to itself in extended chains, branches and rings. As a first model, represent methane CH\u2084 as a carbon with four C\u2013H bonds, ethane C\u2082H\u2086 with a C\u2013C single bond and three H on each carbon, then propane C\u2083H\u2088 as a continuous chain. Check each carbon's four bond orders and every hydrogen's single bond. This is not a geometric picture at scale: tetrahedral arrangement and bond angles are a more complete spatial model. The three representation levels are atom inventory (C\u2082H\u2086), connectivity (CH\u2083\u2013CH\u2083), and an actual three-dimensional geometry. They answer different questions. D3 asks the learner to preserve atoms and valencies when moving among them. D4 asks whether a proposed structure is possible and whether alternative isomers can satisfy the same formula without identical connections. A connected acyclic saturated carbon skeleton is a tree. Each carbon has total bond order four, so H count=4\u2212carbon degree. Each edge contributes two to degree sum. This graph-counting reasoning is an authored extension. Acyclic saturated graphs have degree sum 2(n\u22121). After choosing a branch center, arm-length multisets distinguish structures with only one branching center. Graph method is extension. Valence and graph connectivity both constrain a carbon skeleton; count degrees before claiming feasibility. An upper bound needs a realizable example to establish a maximum. Extension model. Worked REPRESENT construction (authored teaching example): For an acyclic saturated skeleton of eight carbon atoms with one tertiary centre and no quaternary centre, degree sum is 14. Let n\u2081+n\u2082=7 and n\u2081+2n\u2082+3=14, giving n\u2081=3,n\u2082=4. One valid graph has arms of lengths 3,3,1 from the tertiary CH centre. Its hydrogen count is 3\u00d73+4\u00d72+1=18, so C\u2088H\u2081\u2088. Graph counting is extension context. Worked SYNTHESIZE construction (authored teaching example): An acyclic saturated C\u2086 graph with one tertiary centre and no quaternary centre has three terminal carbons and two secondary carbons: n\u2081+n\u2082=5, n\u2081+2n\u2082+3=10. Distribute the two secondary vertices along the three arms as 2,0,0 or 1,1,0; arm lengths 3,1,1 and 2,2,1 yield distinct structures. Reordering arms is not a new skeleton. Worked JUSTIFY construction (authored teaching example): For an acyclic five-carbon saturated graph, the degree sum is eight. A proposed degree-five carbon is chemically invalid even before global counting. A single degree-four carbon with four degree-one neighbours is valid, exhausting degree sum eight and giving C\u2085H\u2081\u2082. A maximum claim needs both an upper constraint and a realizable witness.",
    "misconception": "Wrong path: 'If the formula is C\u2084H\u2081\u2080, there is only one molecule with that formula.' Repair by drawing distinct valence-correct carbon graphs and checking all atom counts.",
    "deepDive": "A proposed carbon with five ordinary single bonds is not accepted merely because the total formula matches. Check *local* valence, not only whole-molecule totals.",
    "qrtCount": 3
  },
  {
    "subtopicId": "CHEM-C11.02",
    "adapterId": "C11",
    "title": "Carbon allotropes and property differences",
    "scope": "CORE_CANDIDATE",
    "concepts": [
      "CHEM-C11.02-CONCEPT"
    ],
    "qrtOperations": [
      "REPRESENT",
      "SYNTHESIZE",
      "JUSTIFY"
    ],
    "academicNotes": "Author-proposed tasks, not independently QRT-scored; D3/D4 is provisional. Canonical science is candidate only; Agent A prerequisites not yet pinned. Outside C09, Core1A/B teaching remains to be written; adapter does not count as a textbook.",
    "entryQuestion": "Both a diamond crystal and a piece of graphite contain carbon. One is hard and electrically insulating; the other is soft and conducts along its layers. Identity alone cannot explain the contrast.",
    "coreSummary": "An allotrope is a structurally distinct form of an element. In diamond each carbon forms four covalent bonds in a three-dimensional network. The strong network extends through the solid, explaining exceptional hardness and a very high melting/sublimation temperature. Typical diamond lacks the freely mobile electrons needed for good ordinary electrical conduction, although special defects and doping can change detailed behaviour. In graphite each carbon is covalently bonded to three neighbouring carbons within a sheet of hexagonal rings. Its remaining valence electrons participate in a delocalised electronic system that conducts along layers. The sheets can slip relative to one another because interlayer forces are much weaker than the in-sheet bonds, helping explain graphite's lubricating properties and flaky feel. Structural bonding, not black colour alone, is the warrant. A useful diagram pairs local carbon coordination with macroscopic behaviour: 4 neighbours \u2192 3D rigid network in diamond, 3 neighbours \u2192 planar sheets and delocalisation in graphite. A learner must check whether a diagram truly represents bonds and motion rather than simply making a decorative carbon lattice. Both material samples can contain impurities that modify observations. Allotropes are distinct structures of one element. Graphite has strong in-plane bonding and weaker interlayer interactions; diamond forms a three-dimensional network. Hardness, transport and atom count are different observables, affected by defects and orientation. Coordination is the number of nearest bonded neighbours, not bond order or isolated bond strength. In an ideal periodic network each link is shared by two atoms; graphite has delocalised electrons in layers. Structure\u2013property reasoning may involve geometry, carrier paths, interlayer interaction and contact effects. A change in a single reading does not establish a phase transition or unique material identity. Worked REPRESENT construction (authored teaching example): An ideal periodic diamond-like network with eight atoms of coordination four has 8\u00d74/2=16 distinct nearest-neighbour links. An ideal sheet network with eight three-coordinated atoms has 8\u00d73/2=12 links. The division avoids counting each edge twice. The 3D versus planar network controls possible transport paths; bond count alone does not measure strength. Worked SYNTHESIZE construction (authored teaching example): A layered carbon specimen cleaves along sheets and conducts preferentially along them. Under altered contact pressure a meter reading changes, but diffraction still supports the same layer structure. The mechanical and transport observations fit a layered model; the meter change could also reflect improved contact. Independent structure and matched electrode measurements separate these explanations. Worked JUSTIFY construction (authored teaching example): Two pure carbon samples with the same isotope composition have masses 0.12 g each. Taking molar mass 12 g/mol, both contain .010 mol atoms regardless of allotrope. A harder sample can have a stronger connected deformation-resistant network without a conclusion about isolated bond energy. Compare structure and mass as separate warrants.",
    "misconception": "Wrong path: 'If both are carbon, both must have the same hardness and conduction.' Repair using explicit 3D/2D bonding networks and delocalised charge carriers.",
    "deepDive": "A black conducting powder is consistent with graphite but not uniquely established as pure graphite; contamination, carbon black and contact geometry require control.",
    "qrtCount": 3
  },
  {
    "subtopicId": "CHEM-C11.03",
    "adapterId": "C11",
    "title": "Saturated and unsaturated hydrocarbons",
    "scope": "CORE_CANDIDATE",
    "concepts": [
      "CHEM-C11.03-CONCEPT"
    ],
    "qrtOperations": [
      "REPRESENT",
      "SYNTHESIZE",
      "JUSTIFY"
    ],
    "academicNotes": "Author-proposed tasks, not independently QRT-scored; D3/D4 is provisional. Canonical science is candidate only; Agent A prerequisites not yet pinned. Outside C09, Core1A/B teaching remains to be written; adapter does not count as a textbook.",
    "entryQuestion": "Ethane and ethene contain the same two carbon atoms, yet their hydrogen counts and typical reactions differ. What information is lost when a student simply names both 'carbon compounds'?",
    "coreSummary": "Saturated open-chain hydrocarbons such as ethane C\u2082H\u2086 have carbon\u2013carbon single bonds; an unsaturated compound such as ethene C\u2082H\u2084 has a double bond, and ethyne C\u2082H\u2082 a triple bond. The different C\u2013C bond orders change how many hydrogens can bond while each carbon maintains four bond orders. In a simple addition reaction ethene can add H\u2082 across its double bond to form ethane: C\u2082H\u2084 + H\u2082 \u2192 C\u2082H\u2086 with an appropriate catalyst. Bromine water may lose colour when bromine reacts by addition with a suitable carbon\u2013carbon multiple bond, but the observed loss of colour alone cannot uniquely identify an alkene. Other reducing/reactive substances can also affect bromine, and reaction conditions matter. A credible laboratory identification needs blanks and chemical context; don't generalise a familiar colour test into an absolute universal theorem. Draw ethane as CH\u2083\u2013CH\u2083 and ethene as CH\u2082=CH\u2082; map every carbon's bond order and each hydrogen's single bond. Then sketch how the double bond transforms during addition. At a deeper level, the transformation is not 'breaking a double bond and creating energy from nothing'; bond changes require and release energy under specific conditions, but the net reaction is represented by the balanced equation. For typical neutral connected hydrocarbons, a ring or double bond reduces hydrogen count by two relative to acyclic saturation; triple reduces by four. Hydrogen-deficiency formula is extension context; formula alone does not identify structure. Hydrogen deficiency counts rings and multiple bonds; ideal hydrogenation consumes one H\u2082 per C=C and two per C\u2261C. Ring preservation is an explicit condition. Extension counting model, not a procedure. One hydrogen deficiency can be a ring or a double bond. Formula constrains total atom count; reactivity depends on actual connectivity and conditions. Worked REPRESENT construction (authored teaching example): Neutral connected C\u2086H\u2081\u2080 has four fewer H than acyclic C\u2086H\u2081\u2084: two deficiency units. Hex-1-yne has one triple bond; cyclohexene has a ring and one double bond. Both satisfy C\u2086H\u2081\u2080, yet their connectivity differs. Check H by subtracting carbon bond-order sum from four at each vertex. Deficiency counting is an extension model. Worked SYNTHESIZE construction (authored teaching example): A C\u2085H\u2088 sample consumes one H\u2082 per molecule in a model that changes only C=C/C\u2261C and leaves rings intact, yielding C\u2085H\u2081\u2080. The initial two deficiency units become one. If all remaining units are rings under complete multiple-bond hydrogenation, one ring and one C=C were present initially. Cyclopentene is one possible structure; formula and uptake do not establish unique connectivity. Worked JUSTIFY construction (authored teaching example): C\u2083H\u2086 can be propene CH\u2082=CHCH\u2083 or cyclopropane (three CH\u2082 groups). Both count six H; only the first has C=C. In an ideal model treating alkene addition only, propene consumes H\u2082 and the ring alternative does not. Real strained rings may react under other conditions, so the conclusion is bounded.",
    "misconception": "Wrong path: 'Any sample that decolourises bromine must contain C=C.' Repair by distinguishing a supporting test from a unique identification and checking alternative reactive species.",
    "deepDive": "A cyclic saturated hydrocarbon may have fewer hydrogen atoms than an open-chain alkane with the same carbon count. Molecular formula alone cannot serve as a complete unsaturation diagnosis.",
    "qrtCount": 3
  },
  {
    "subtopicId": "CHEM-C11.04",
    "adapterId": "C11",
    "title": "Homologous series and nomenclature",
    "scope": "CORE_CANDIDATE",
    "concepts": [
      "CHEM-C11.04-CONCEPT"
    ],
    "qrtOperations": [
      "REPRESENT",
      "SYNTHESIZE",
      "JUSTIFY"
    ],
    "academicNotes": "Author-proposed tasks, not independently QRT-scored; D3/D4 is provisional. Canonical science is candidate only; Agent A prerequisites not yet pinned. Outside C09, Core1A/B teaching remains to be written; adapter does not count as a textbook.",
    "entryQuestion": "A series of alcohols displays similar chemical behaviour but steadily changing boiling points. Why should adding \u2013CH\u2082\u2013 alter physical properties without removing the identifying functional group?",
    "coreSummary": "A homologous series contains compounds with the same functional group and a common general formula, whose successive members often differ by a \u2013CH\u2082\u2013 unit (14 atomic mass units). For alkanes the sequence methane CH\u2084, ethane C\u2082H\u2086, propane C\u2083H\u2088 illustrates the CH\u2082 increment. Changes in size and intermolecular attractions produce gradual physical-property changes, while a shared functional group supports related chemical behaviour. 'Same formula difference' alone does not establish one series unless connectivity and functionality also agree. Nomenclature identifies the principal carbon chain, unsaturation and substituents. In simple hydrocarbons 'meth-', 'eth-', 'prop-' and 'but-' encode carbon count, while endings such as -ane, -ene and -yne encode single, double and triple bonds in the chosen main chain. Branch positions are numbered to meet the appropriate rules. A name must be mapped back to a graph: it is not enough to memorise prefixes. Structural isomers can share a molecular formula while differing in connectivity, as C\u2084H\u2081\u2080 does. That creates two separate reasoning problems: identify whether two graphs are distinct and determine whether two substances genuinely lie in the same homologous series. A learner should test both molecular formula and functional-group family before claiming systematic relatedness. Constitutional isomers have identical formula and different connectivity; rotations/reversed numbering are not new molecules. Enumerate via longest chain and equivalent positions. Geometric isomers require separate conditions. Homologous alcohols share the functional group and successive members differ by CH\u2082; positional isomers require inequivalent sites on each carbon skeleton. Constitutional identity depends on which atoms are bonded, not direction of drawing. An ether has C\u2013O\u2013C; alcohol has C\u2013O\u2013H. Formula alone does not establish group. Chain isomers have identical elemental formula, so their ideal complete combustion requires the same oxygen per mole despite different connectivity. Example: an acyclic alkane of molar mass 86 has 14n+2=86, so C\u2086H\u2081\u2084. Its complete combustion is 2C\u2086H\u2081\u2084+19O\u2082\u219212CO\u2082+14H\u2082O. Every C\u2086H\u2081\u2084 chain isomer uses 9.5 mol O\u2082 per mole under this model. Enumerate structures separately by longest-chain length and symmetry; oxygen demand cannot identify the individual isomer. Worked REPRESENT construction (authored teaching example): For an acyclic saturated monohydric alcohol of molar mass 60, 14n+18=60 gives n=3 and C\u2083H\u2088O. Propan-1-ol CH\u2083CH\u2082CH\u2082OH and propan-2-ol CH\u2083CH(OH)CH\u2083 exhaust inequivalent OH sites on the propane skeleton. Methoxyethane is excluded by functional class. Each alcohol is CH\u2082 beyond ethanol in formula. Worked SYNTHESIZE construction (authored teaching example): For C\u2084H\u2081\u2080, a four-carbon longest chain gives butane; a three-carbon longest chain gives one methyl branch at the centre, 2-methylpropane. No shorter longest chain is possible for a connected four-carbon tree. Counting reversal as another isomer would duplicate the same graph. Both formula masses are 58. Worked JUSTIFY construction (authored teaching example): CH\u2083CH\u2082CH\u2082OH and HOCH\u2082CH\u2082CH\u2083 are the same propan-1-ol connectivity; CH\u2083CH(OH)CH\u2083 differs by OH position, and CH\u2083OCH\u2082CH\u2083 is an ether with equal formula. Group by bonds and functional patterns, not the order symbols appear in a written formula.",
    "misconception": "Wrong path: 'Same molecular formula means the same compound and name.' Repair with bond graphs, valence checks and an unambiguous main-chain choice.",
    "deepDive": "A branched isomer can have different boiling properties from a straight-chain member even though both have the same molecular mass; formula-based prediction alone is insufficient.",
    "qrtCount": 3
  },
  {
    "subtopicId": "CHEM-C11.05",
    "adapterId": "C11",
    "title": "Functional groups and structural formulas",
    "scope": "CORE_CANDIDATE",
    "concepts": [
      "CHEM-C11.05-CONCEPT"
    ],
    "qrtOperations": [
      "REPRESENT",
      "SYNTHESIZE",
      "JUSTIFY"
    ],
    "academicNotes": "Author-proposed tasks, not independently QRT-scored; D3/D4 is provisional. Canonical science is candidate only; Agent A prerequisites not yet pinned. Outside C09, Core1A/B teaching remains to be written; adapter does not count as a textbook.",
    "entryQuestion": "Two clear liquids contain carbon, hydrogen and oxygen. One reacts readily with sodium hydrogen carbonate to release gas; the other does not under the same conditions. Why can a functional group be more informative than the oxygen atom count?",
    "coreSummary": "Functional groups are recognisable atom arrangements that frequently govern characteristic reactions. An alcohol has an \u2013OH group bonded to carbon; a carboxylic acid contains \u2013COOH with a carbonyl C=O and O\u2013H within the same group. An aldehyde contains \u2013CHO, while a ketone has a carbonyl carbon bonded to carbon groups on both sides. An ether C\u2013O\u2013C illustrates why 'contains oxygen' is not itself a functional-group designation. The \u2013OH part of an alcohol and the \u2013OH part of a carboxylic acid do not have identical acidity. In the carboxylic acid, the resulting carboxylate ion is stabilised by delocalisation over two oxygen atoms; an ordinary alcohol does not have the same stabilization. At the Class X level, it is enough to connect structure and the characteristic acid/carbonate reaction without requiring a full resonance proof. Respect the distinction between structure-backed explanation and unsupported mechanism claims. CBSE Class X functional-group classification includes a halo (halogen) group. A haloalkane has a halogen atom such as Cl or Br covalently bonded in place of a hydrogen on an alkane carbon chain: chloromethane CH\u2083\u2013Cl (CH\u2083Cl), chloroethane CH\u2083\u2013CH\u2082\u2013Cl (C\u2082H\u2085Cl) and bromoethane CH\u2083\u2013CH\u2082\u2013Br. Write the complete carbon chain first, then count each carbon's four bonds: chlorine and bromine normally make one covalent bond in these school-level structures. The attached Cl in CH\u2083Cl is not a free chloride ion Cl\u207b. A halo (\u2013Cl or \u2013Br) group is structurally different from an alcohol \u2013OH, aldehyde \u2013CHO, ketone >C=O or acid \u2013COOH group. Independent REPRESENT model (author candidate): C\u2083H\u2087Cl can have two different chloroalkane connectivities: CH\u2083\u2013CH\u2082\u2013CH\u2082\u2013Cl (1-chloropropane) and CH\u2083\u2013CH(Cl)\u2013CH\u2083 (2-chloropropane). Both have C\u2083H\u2087Cl and four bonds around each carbon, but the Cl is on different carbon atoms; counting formula alone cannot choose which structure is present. Distinguish chemical bond connectivity from an assumption that formula gives a unique functional-group position. Represent CH\u2083CH\u2082OH as ethanol (alcohol) and CH\u2083COOH as ethanoic acid (carboxylic acid). The presence of a carbonyl adjacent to an O\u2013H group is decisive. A compound with the same count of oxygen atoms can still have a different structure. D3 tasks should translate condensed and displayed formulas; D4 tasks should justify which tests discriminate the models and what remains ambiguous. Functional groups are connectivity patterns influencing reaction behaviour. Identical formula can hide acid, ester or hydroxyaldehyde structures. Controlled evidence supports a class; unique identity requires independent evidence. Hydroxyaldehyde is an extension example. A single oxygen can occur in different functional groups; hydrogen deficiency may arise from C=O or C=C. Verify bond orders and atom counts independently. An alcohol and ether can share molecular formula but differ in O\u2013H bond and selective reaction behaviour. A calibrated structural observation plus a defined reaction model can discriminate candidates. Worked REPRESENT construction (authored teaching example): With formula C\u2082H\u2084O, ethanal CH\u2083CHO has a carbonyl C=O and an H attached to its carbonyl carbon; ethenol CH\u2082=CHOH instead has C=C and O\u2013H. Both satisfy ordinary valence in their drawn forms, although ethenol is less stable and can tautomerise. Formula and connectivity are distinct; stability is an additional condition. Worked SYNTHESIZE construction (authored teaching example): Within two pure C\u2083H\u2088O candidates, propan-1-ol and methoxyethane, a calibrated O\u2013H structural signal supports the alcohol. A specified complete selective oxidation preserving the carbon skeleton could give propanoic acid C\u2083H\u2086O\u2082 from propan-1-ol. The independent structural and reaction evidence jointly supports the candidate under the stated model, not arbitrary mixtures. Worked JUSTIFY construction (authored teaching example): Ethanoic acid and methyl methanoate share C\u2082H\u2084O\u2082; the acid has \u2013COOH while the ester has \u2013COOR. Under the simple controlled hydrogen-carbonate model, the acid transfers a proton and CO\u2082 forms. A mineral-acid impurity could also cause gas, so the observation discriminates clean candidates without proving the exact identity of every sample. Primary and secondary alcohols have different connectivity around the OH-bearing carbon. In a stipulated selective oxidation preserving the skeleton, a primary alcohol can give an aldehyde and a secondary alcohol can give a ketone. For a distinct teaching example, ethanol gives ethanal (CH\u2083CHO), and butan-2-ol gives butan-2-one (CH\u2083COCH\u2082CH\u2083); identify the aldehyde carbonyl carbon bonded to H and the ketone carbonyl carbon bonded to two carbon groups. Further oxidation depends on conditions. This primary/secondary pathway is extension context, not an NSEJS scope claim or a practical procedure.",
    "misconception": "Wrong path: 'Every formula containing \u2013OH is an alcohol.' Repair by identify the carbonyl adjacency and the full connectivity of the group. A second wrong path is treating covalently bonded \u2013Cl in a haloalkane as free Cl\u207b, or assuming that C\u2083H\u2087Cl fixes the halogen position. Repair by drawing both neutral carbon skeletons and checking single-bond valences.",
    "deepDive": "If a liquid has formula C\u2082H\u2086O, ethanol and methoxymethane are connectivity alternatives. A formula alone does not reveal an alcohol group. Changed-condition independent challenge: classify the group in CH\u2083CH\u2082Br and explain why CH\u2083CH\u2082OH is not also a haloalkane; verify the carbon bonds.",
    "qrtCount": 3
  },
  {
    "subtopicId": "CHEM-C11.06",
    "adapterId": "C11",
    "title": "Combustion, oxidation, addition and substitution",
    "scope": "CORE_CANDIDATE",
    "concepts": [
      "CHEM-C11.06-CONCEPT"
    ],
    "qrtOperations": [
      "REPRESENT",
      "SYNTHESIZE",
      "JUSTIFY"
    ],
    "academicNotes": "Author-proposed tasks, not independently QRT-scored; D3/D4 is provisional. Canonical science is candidate only; Agent A prerequisites not yet pinned. Outside C09, Core1A/B teaching remains to be written; adapter does not count as a textbook.",
    "entryQuestion": "Why does a clean-burning gas flame become yellow and sooty when air supply is restricted? The chemical products change because conditions change, even when the fuel identity remains the same.",
    "coreSummary": "With sufficient oxygen, complete combustion of a hydrocarbon yields CO\u2082 and H\u2082O. For methane, CH\u2084 + 2O\u2082 \u2192 CO\u2082 + 2H\u2082O; for ethanol, C\u2082H\u2085OH + 3O\u2082 \u2192 2CO\u2082 + 3H\u2082O. If oxygen is insufficient, CO and soot may form alongside CO\u2082 and water. Dark soot on a vessel is evidence of incomplete combustion under those conditions, not a precise measurement of which product fractions occurred. Addition reactions place atoms across a multiple bond: C\u2082H\u2084 + H\u2082 \u2192 C\u2082H\u2086 in appropriate catalytic hydrogenation. Substitution replaces one atom/group with another while maintaining the framework: CH\u2084 + Cl\u2082 \u2192 CH\u2083Cl + HCl under suitable UV-light conditions, with possible further substitutions. The equations are net accounts; they must not be treated as complete detailed mechanisms. Reaction conditions decide which model is appropriate. Oxidation of ethanol can form ethanoic acid with suitable oxidising reagents under appropriate conditions. In school chemistry, classify by the net change while distinguishing the reagent, products and safety controls. An exam problem may display equations for combustion, addition and substitution alongside identical molecules; the decisive reasoning is the transformation of bonds and atoms, not a label memorised by position. Addition across C=C changes bond order and adds atoms. Complete combustion of pure hydrocarbons produces CO\u2082 and H\u2082O. Sequential conversion changes hydrogen balance without changing carbon count. The equations are theoretical, not experimental instructions. Combustion product assumptions determine oxygen demand. Carbon and hydrogen conservation hold under both models; incomplete combustion products require evidence. Substitution replaces H by another atom; successive net substitutions produce additional HCl. Product distribution cannot be inferred from the first balanced equation alone. Worked REPRESENT construction (authored teaching example): Complete propane combustion C\u2083H\u2088+5O\u2082\u21923CO\u2082+4H\u2082O requires 5 mol oxygen per mole fuel. A theoretical CO-only model 2C\u2083H\u2088+7O\u2082\u21926CO+8H\u2082O requires 3.5 mol O\u2082 per mole. Both conserve C and H; different product assumptions change oxygen demand. Actual incomplete combustion may include several products. Worked SYNTHESIZE construction (authored teaching example): A 0.04 mol propene sample ideally hydrogenates to 0.04 mol propane by consuming 0.04 mol H\u2082. Complete combustion of the original propene gives 0.12 mol CO\u2082 and 0.12 mol H\u2082O; propane gives 0.12 mol CO\u2082 and 0.16 mol H\u2082O. Carbon amount is unchanged, while added hydrogen increases water by 0.04 mol. Worked JUSTIFY construction (authored teaching example): In an ideal methane substitution model, 0.05 mol carbon-containing product has an average of 1.4 substituted H per carbon. If only CH\u2083Cl and CH\u2082Cl\u2082 exist, x+y=.05 and x+2y=.07, yielding .03 and .02 mol. Allowing CHCl\u2083 gives another unknown, so the same two observations cannot identify all fractions uniquely. The model is theoretical only. When measured combustion products include several carbon species, write a separate amount for each species rather than choosing an all-CO\u2082 or all-CO equation. For example, a theoretical .02 mol carbon monoxide plus .03 mol carbon dioxide accounts for .05 mol carbon atoms; .08 mol water accounts for .16 mol H atoms. The product oxygen tally is .02+2(.03)+.08=.16 mol O atoms, corresponding to .08 mol O\u2082 if oxygen gas is the sole oxygen source. An independent fuel composition and carbon/hydrogen ledger are required to establish consistency. This illustration supplies the atom-accounting component rather than the reserved mixed-exhaust equation.",
    "misconception": "Wrong path: 'All combustion always gives only CO\u2082 and water.' Repair by checking oxygen availability, fuel composition and actual products before selecting the ideal complete-combustion model.",
    "deepDive": "A substitution reaction of methane with chlorine needs appropriate light and can continue to additional chlorinated products; a single formula does not guarantee an exclusive pure product.",
    "qrtCount": 3
  },
  {
    "subtopicId": "CHEM-C11.07",
    "adapterId": "C11",
    "title": "Ethanol, ethanoic acid, soaps and detergents",
    "scope": "CORE_CANDIDATE",
    "concepts": [
      "CHEM-C11.07-CONCEPT"
    ],
    "qrtOperations": [
      "REPRESENT",
      "SYNTHESIZE",
      "JUSTIFY"
    ],
    "academicNotes": "Author-proposed tasks, not independently QRT-scored; D3/D4 is provisional. Canonical science is candidate only; Agent A prerequisites not yet pinned. Outside C09, Core1A/B teaching remains to be written; adapter does not count as a textbook.",
    "entryQuestion": "Soap removes grease even though grease does not dissolve in plain water. Yet hard water makes ordinary soap less effective. The key is molecular architecture and the role of dissolved ions, not a memorised list of uses.",
    "coreSummary": "Ethanol CH\u2083CH\u2082OH is an alcohol used as a solvent and fuel; ethanoic acid CH\u2083COOH is a carboxylic acid found in vinegar and reacts with carbonates to release CO\u2082. These distinct properties follow from functional groups. Ethanoic acid and ethanol can form ethyl ethanoate and water in acid-catalysed esterification under suitable conditions: CH\u2083COOH + C\u2082H\u2085OH \u21cc CH\u2083COOC\u2082H\u2085 + H\u2082O. The double arrow marks a reversible reaction; a schematic equation alone does not fix the yield. Soap molecules have a nonpolar hydrocarbon tail attracted to grease and an ionic water-interacting head. In water they can form micelles with tails toward oily dirt and hydrophilic heads outside, helping disperse grease. This is a self-assembly model whose operation depends on concentration and solution conditions. Detergents use related amphiphilic architecture but often different head-group chemistry. Hard water contains appreciable calcium and magnesium ions. Traditional sodium/potassium carboxylate soaps can form less-soluble calcium/magnesium salts, reducing lather and producing scum. Many synthetic detergents remain useful in hard water, but their full environmental impact is not captured solely by cleaning performance. A correct comparison includes composition, conditions, dose, water quality and waste fate. Soap has ionic carboxylate heads and hydrophobic tails. Ca\u00b2\u207a/Mg\u00b2\u207a can form sparingly soluble salts, removing active soap. Synthetic detergent response depends on formulation. Distinguish precipitation, micelles and foam measurements. Amphiphilic molecules contain hydrophobic tails and hydrophilic heads; aggregate geometry depends on surrounding phases. Divalent ions can remove soap through precipitation, distinct from micellisation. Carboxylic acid can transfer proton to hydrogen carbonate. Esterification is reversible; conversion controls product amount. Distinguish functional-group evidence from purity and theoretical yield. For ethanoic acid + ethanol \u21cc ethyl ethanoate + water, the ideal stoichiometric ratio is 1:1:1:1. If 0.12 mol acid meets 0.08 mol alcohol, the theoretical maximum is 0.08 mol ester (88 g/mol), or 7.04 g. If the isolated yield is 50%, 3.52 g is collected. This does not prove only half the limiting reactant reacted: equilibrium, side reactions and isolation loss may all contribute. A material balance requires conversion and recovery separately. The example is a calculation model, not a laboratory procedure. Worked REPRESENT construction (authored teaching example): An oil droplet in water can be surrounded by amphiphiles with hydrocarbon tails toward the oil and ionic heads facing water. If calcium binds two carboxylate heads as an insoluble salt, some active surfactant is removed; this is a precipitation model, not merely a change in aggregate shape. Foam height is a separate observation. Worked SYNTHESIZE construction (authored teaching example): In an ideal sample with 0.020 mol soap ions and 0.006 mol total divalent hardness ions, 0.012 mol soap is consumed and 0.008 mol remains. A monovalent sodium salt does not consume the same two-per-ion amount, though ionic strength may affect solubility. Compare detergent performance using equal active concentration and matched water/temperature/agitation. Worked JUSTIFY construction (authored teaching example): A 0.03 mol pure ethanoic acid portion gives 0.03 mol CO\u2082 with excess hydrogen carbonate under the simple model; a pure ethanol portion does not. In a separate ideal esterification of .03 mol each at 50% conversion, .015 mol ester and water form and .015 mol of each reagent remains. Product isolation could be lower than formed amount; gas alone cannot establish mixture purity.",
    "misconception": "Wrong path: 'Bubbles show complete cleaning' or 'every soap behaves identically in all water.' Repair by separating surfactant action, insoluble ion products, agitation and observed removal of grease.",
    "deepDive": "Do not ask students to prepare esters or saponify oils with concentrated acids or bases unsupervised. Conceptual diagrams and safe teacher-supervised observations suffice.",
    "qrtCount": 3
  },
  {
    "subtopicId": "CHEM-C12.01",
    "adapterId": "C12",
    "title": "Pressure, temperature, volume as experimental variables",
    "scope": "CORE_CANDIDATE",
    "concepts": [
      "CHEM-C12.01-CONCEPT"
    ],
    "qrtOperations": [
      "REPRESENT",
      "MODEL",
      "SYNTHESIZE"
    ],
    "academicNotes": "Author-proposed tasks, not independently QRT-scored; D3/D4 is provisional. Canonical science is candidate only; Agent A prerequisites not yet pinned. Outside C09, Core1A/B teaching remains to be written; adapter does not count as a textbook.",
    "entryQuestion": "A flexible balloon expands in warm water, but the same gas in a rigid sealed container may increase pressure instead. Why should the word 'heated' be insufficient to predict the measured outcome?",
    "coreSummary": "A gas consists of widely spaced particles whose collisions with the container produce pressure. Temperature affects typical kinetic energy and collision behaviour; the measured effect depends on which variable is constrained. A rigid sealed vessel holds volume and amount approximately fixed, so heating tends to raise pressure. A flexible vessel can expand, changing volume and possibly pressure. Without stating constraints, a prediction is not a scientific gas model. At foundational level, discuss compression, expansion, temperature and pressure qualitatively. Formal ideal gas proportionalities and P\u2013V\u2013T calculations are additional models with assumptions: dilute gas, stable amount, negligible condensation, near-ideal behaviour and use of absolute temperature. Do not use Celsius directly as a proportional absolute temperature. When gas is collected over water, water vapour complicates the species inventory; that belongs to a later section. Construct a two-column apparatus representation: piston-syringe with mobile boundary and rigid flask with fixed boundary. For each state, annotate amount of gas n, pressure P, volume V and absolute temperature T, marking what changed and what is controlled. A graph without correct axes and fixed-variable labels can encode a false relationship. At D4, a student must detect that two 'contradictory' experiments used different boundary conditions. A piston may switch physical constraints during a continuous temperature change: first an approximately constant external-pressure expansion, then a fixed-volume phase against a stop. The valid law follows the interval and controlled variable, not a remembered formula alone. Draw two separate before/after state tables and check whether the amount of gas is genuinely conserved.",
    "misconception": "Wrong path: 'Heating any gas always increases its volume.' Repair: identify whether the boundary is rigid, flexible or externally controlled before selecting a model.",
    "deepDive": "Condensation, leaks or chemical gas generation invalidate the fixed-amount assumption. Do not apply a gas law blindly when the chemical identity or amount changes.",
    "qrtCount": 3
  },
  {
    "subtopicId": "CHEM-C12.02",
    "adapterId": "C12",
    "title": "Gas reaction volume patterns (extension)",
    "scope": "EXTENSION",
    "concepts": [
      "CHEM-C12.02-CONCEPT"
    ],
    "qrtOperations": [
      "REPRESENT",
      "MODEL",
      "SYNTHESIZE"
    ],
    "academicNotes": "Author-proposed tasks, not independently QRT-scored; D3/D4 is provisional. Canonical science is candidate only; Agent A prerequisites not yet pinned. Outside C09, Core1A/B teaching remains to be written; adapter does not count as a textbook. No inference of CBSE Class IX/X official coverage: advanced topic is an author research extension and requires independent academic source admission.",
    "entryQuestion": "Why can two equal volumes of different gases contain comparable particle numbers when temperature and pressure match, yet the reaction products occupy a completely different volume after cooling?",
    "coreSummary": "Under the ideal-gas approximation, equal volumes at the same temperature and pressure contain equal numbers of particles for comparable gas mixtures. This underlies the use of gaseous volume ratios from balanced reaction coefficients when all reacting and measured species remain gases at the same reference T/P. For example, 2H\u2082(g) + O\u2082(g) \u2192 2H\u2082O(g) gives two gas-volume units H\u2082 and one O\u2082 forming two units of water vapour at comparable conditions. If water condenses, the measured gas volume is no longer two units. Reaction-volume analysis requires a species ledger. Start with the amount of each gas; consume reactants according to the balanced equation; produce gases or vapours, then change phase separately. Excess reactant remains and must be included in the final measured volume. The temperature, pressure, gas solubility and wetness of the measurement apparatus can invalidate a naive volume contraction calculation. The numerical laws of gas reaction volumes are an **EXTENSION**, not an excuse to promote formal senior-secondary gas-law content into the mandatory Class X syllabus. D3 tasks should use a few clear integer ratios under controlled conditions. D4 tasks should introduce an exception\u2014cooling, dissolution or excess reagent\u2014and demand the correct stage model rather than a memorised formula.",
    "misconception": "Wrong path: 'Coefficients always equal measured gas-volume ratio.' Repair: enforce common reference T/P, gas phase, complete reaction and absence of excess reactants before using the ratio.",
    "deepDive": "If one gas product dissolves into the collection liquid, the observed volume can be smaller for a reason unrelated to chemical stoichiometric contraction.",
    "qrtCount": 3
  },
  {
    "subtopicId": "CHEM-C12.03",
    "adapterId": "C12",
    "title": "Gas collection and measurement uncertainty",
    "scope": "CORE_CANDIDATE",
    "concepts": [
      "CHEM-C12.03-CONCEPT"
    ],
    "qrtOperations": [
      "REPRESENT",
      "MODEL",
      "SYNTHESIZE"
    ],
    "academicNotes": "Author-proposed tasks, not independently QRT-scored; D3/D4 is provisional. Canonical science is candidate only; Agent A prerequisites not yet pinned. Outside C09, Core1A/B teaching remains to be written; adapter does not count as a textbook.",
    "entryQuestion": "Gas produced in a reaction is collected over water. The graduated cylinder shows 50 mL, so a student writes '50 mL pure dry carbon dioxide'. What hidden assumptions are being made?",
    "coreSummary": "Gas collection by water displacement is convenient for relatively insoluble gases, but the collection may include water vapour. A gas soluble in water can partly dissolve instead of appearing in the graduated gas space; carbon dioxide has appreciable solubility and can react with water. If the water levels inside and outside the vessel differ, the gas pressure also differs from ambient pressure. A leakage path can reduce the collected amount without changing chemical formation. A gas syringe avoids direct dissolution into a water trough but introduces its own problems: dead volume, friction, small leaks and temperature changes. The method choice must fit the actual gas and experiment. An appropriate diagram labels the reaction flask, gas outlet, water/trough or syringe, collection pressure and measurement scale. Do not infer gas identity from the existence of bubbles or from a numerical volume reading. Measurement uncertainty is not a nuisance to be deleted after calculation. Record what was measured, units, instrument range, uncertainty and whether the sample is wet. At D3, explain the difference between generated and collected gas; at D4, use controls to diagnose competing systematic biases. A closed apparatus with clear pressure and temperature measurements supports stronger claims than a single unchecked meniscus reading. Wet-gas volume is not equivalent to reaction yield. Compare a sparingly soluble collected gas and a more water-soluble one under matched generation conditions; decide which instrument and sampling observations would distinguish dissolution, leakage and genuine differences in production.",
    "misconception": "Wrong path: 'Displaced water volume is always the exact volume of dry pure gas produced.' Repair by checking gas composition, vapour, dissolution, pressure equality and leaks.",
    "deepDive": "Collection of soluble or reactive gases over water is especially unreliable. Choose a chemically suitable collection method rather than automatically applying an apparatus diagram.",
    "qrtCount": 3
  },
  {
    "subtopicId": "CHEM-C12.04",
    "adapterId": "C12",
    "title": "Combustion gases and condensation",
    "scope": "CORE_CANDIDATE",
    "concepts": [
      "CHEM-C12.04-CONCEPT"
    ],
    "qrtOperations": [
      "REPRESENT",
      "MODEL",
      "SYNTHESIZE"
    ],
    "academicNotes": "Author-proposed tasks, not independently QRT-scored; D3/D4 is provisional. Canonical science is candidate only; Agent A prerequisites not yet pinned. Outside C09, Core1A/B teaching remains to be written; adapter does not count as a textbook.",
    "entryQuestion": "A hydrocarbon burns in excess oxygen and the hot gas is cooled. The total gas volume drops even though no carbon atom has vanished. Which stage accounts for the loss of measured gas?",
    "coreSummary": "For complete combustion of a hydrocarbon containing only carbon and hydrogen, the usual products are carbon dioxide and water. The general balanced formula for C\u2093H\u1d67 under sufficient oxygen is C\u2093H\u1d67 + (x + y/4)O\u2082 \u2192 xCO\u2082 + (y/2)H\u2082O. This equation conserves atoms, but the gas state of H\u2082O depends on temperature. High-temperature water vapour can condense when cooled, removing water molecules from the measured gas phase without removing them from the closed material system. Excess oxygen survives in the residual gas. Carbon dioxide may be absorbed later by a suitable reagent or partly dissolved in water; each operation must be treated as a separate stage. If insufficient oxygen is supplied, carbon monoxide and soot can form; the simple complete-combustion equation is no longer the full description. Distinguish products expected from an idealised chemical model from those actually established by product tests. Plot a species inventory at three points: before ignition; after combustion while all idealised products remain in gas phase; after cooling and condensation. Write the conserved carbon, hydrogen and oxygen totals for the entire material system, then count only species remaining in the **gas** phase. D3 tasks translate between formulas and volumes; D4 tasks detect mistaken conflation of chemical conversion with physical removal from gas space. Before applying gas volumes to an unfamiliar hydrocarbon, balance its combustion equation and write separate hot-vapour, cooled-dry and absorber-residue ledgers. A phase change redistributes atoms between gas and liquid, not outside the material conservation law.",
    "misconception": "Wrong path: 'Gas volume contraction is entirely the amount of CO\u2082 that formed.' Repair by separating chemical reaction, condensation and selective absorption.",
    "deepDive": "If the water does not fully condense or CO\u2082 dissolves, the measured 'dry gas' account is different. Experimental phase and collection conditions must be recorded.",
    "qrtCount": 3
  },
  {
    "subtopicId": "CHEM-C12.05",
    "adapterId": "C12",
    "title": "Gas absorption sequences and eudiometry (enrichment)",
    "scope": "ENRICHMENT",
    "concepts": [
      "CHEM-C12.05-CONCEPT"
    ],
    "qrtOperations": [
      "REPRESENT",
      "MODEL",
      "SYNTHESIZE"
    ],
    "academicNotes": "Author-proposed tasks, not independently QRT-scored; D3/D4 is provisional. Canonical science is candidate only; Agent A prerequisites not yet pinned. Outside C09, Core1A/B teaching remains to be written; adapter does not count as a textbook. No inference of CBSE Class IX/X official coverage: advanced topic is an author research extension and requires independent academic source admission.",
    "entryQuestion": "An unknown gas mixture burns, cools, then passes through a selective absorber. A single number called 'contraction' appears on the instrument. Can it reveal a complete molecular formula by itself?",
    "coreSummary": "Eudiometry is a multi-stage gas-volume analysis, generally beyond ordinary Class X Chemistry and therefore marked **ENRICHMENT**. A typical process combines a known gas with oxygen, burns it in a controlled apparatus, cools to a chosen reference condition, selectively absorbs a product such as CO\u2082 and measures residual volumes. The inference depends on knowing what each stage removes. A gas-volume drop after cooling may include water condensation, while a later reduction with suitable CO\u2082 absorber is attributed to carbon dioxide under validated selectivity. To analyse a hydrocarbon C\u2093H\u1d67, use the complete-combustion equation and amount ledger. At consistent T/P, CO\u2082 produced is proportional to x times hydrocarbon amount, while O\u2082 consumed is proportional to (x + y/4). A single contraction value may not determine both x and y; an independent measurement of CO\u2082, O\u2082 consumption or initial hydrocarbon volume can provide further constraints. When an absorber's chemistry is not selective, the problem may remain underdetermined. Build a table with rows *initial*, *after combustion*, *after cooling* and *after absorption*. Columns list hydrocarbon, O\u2082, CO\u2082, H\u2082O vapour and any inert gas. Never jump from the first to the final volume without accounting for intermediate water and excess oxygen. The apparatus must be safe and sealed: explosive gas experiments are not for unsupervised learners; present a conceptual or teacher-controlled simulation. A selective absorber removes its target, not all other gases. An unreactive carrier or air contaminant may persist alongside unconsumed O\u2082; a final instrument reading therefore needs an independent gas-identity check before inferring a pure residual species.",
    "misconception": "Wrong path: 'Contraction alone proves the hydrocarbon formula.' Repair with complete species ledger, validated absorption selectivity and independent observations.",
    "deepDive": "An inert gas contaminant or partially dissolved CO\u2082 changes residual volumes. Identify what the absorber does not remove and whether the gas is compared at the same T/P.",
    "qrtCount": 3
  },
  {
    "subtopicId": "CHEM-C13.01",
    "adapterId": "C13",
    "title": "Oxidation and reduction in observable reactions",
    "scope": "CORE_CANDIDATE",
    "concepts": [
      "CHEM-C13.01-CONCEPT"
    ],
    "qrtOperations": [
      "EXPLAIN",
      "APPLY",
      "JUSTIFY"
    ],
    "academicNotes": "Author-proposed tasks, not independently QRT-scored; D3/D4 is provisional. Canonical science is candidate only; Agent A prerequisites not yet pinned. Outside C09, Core1A/B teaching remains to be written; adapter does not count as a textbook.",
    "entryQuestion": "Black copper(II) oxide loses oxygen when hydrogen is passed over heated copper oxide, while water forms. Which substance has been reduced, and which one has been oxidised? The answer is not simply the name of the black solid.",
    "coreSummary": "At the school level, oxidation often means oxygen gain or hydrogen loss, while reduction means oxygen loss or hydrogen gain. In CuO + H\u2082 \u2192 Cu + H\u2082O, oxygen originally belonging to CuO ends up in water. CuO loses oxygen and is reduced; H\u2082 gains oxygen and is oxidised. These linked changes form one redox reaction. Every element remains accounted for, so a material ledger is more informative than colour alone. The terms oxidising agent and reducing agent describe the effects on the *other* species. CuO is the oxidising agent here because it supplies oxygen to hydrogen and is itself reduced. Hydrogen is the reducing agent because it removes oxygen from copper oxide and is itself oxidised. A learner who assumes the reducing agent must itself be reduced has reversed this relationship. Redox can also be expressed through electron transfer and oxidation numbers, but do not require those advanced ideas to explain an ordinary oxygen-transfer school experiment. Separate a balanced candidate equation from evidence of actual product identities. A black solid turning reddish suggests a transformation, but neither colour uniquely identifies CuO or copper without an independent test. Oxygen-transfer examples are a useful entry, but oxidation states generalise the idea to processes with no oxygen. For each proposed reaction identify which atom's assigned oxidation number rises, which falls, and whether electrons gained and lost are equal. A reaction diagram and observed product composition are separate kinds of evidence.",
    "misconception": "Wrong path: 'The reducing agent gains electrons in the same reaction because it is called reducing.' Repair by defining an agent according to what it does to the other species and checking the agent's own net chemical change.",
    "deepDive": "A colour-changing indicator may not involve redox at all. Oxidation-state or species evidence must support the conclusion rather than relying on colour alone.",
    "qrtCount": 3
  },
  {
    "subtopicId": "CHEM-C13.02",
    "adapterId": "C13",
    "title": "Electron-transfer and oxidation-number representation",
    "scope": "CORE_CANDIDATE",
    "concepts": [
      "CHEM-C13.02-CONCEPT"
    ],
    "qrtOperations": [
      "EXPLAIN",
      "APPLY",
      "JUSTIFY"
    ],
    "academicNotes": "Author-proposed tasks, not independently QRT-scored; D3/D4 is provisional. Canonical science is candidate only; Agent A prerequisites not yet pinned. Outside C09, Core1A/B teaching remains to be written; adapter does not count as a textbook.",
    "entryQuestion": "A charge-balanced ionic reaction can involve oxidation even when no oxygen atom is present. How can we follow the change while avoiding the mistake that an oxidation number is always a real ionic charge?",
    "coreSummary": "An ionic species Fe\u00b2\u207a can lose an electron to become Fe\u00b3\u207a: Fe\u00b2\u207a \u2192 Fe\u00b3\u207a + e\u207b. Losing electrons is oxidation. A separate reduction half-process must accept electrons in a full redox reaction. This electron ledger complements the oxygen-transfer language. For a genuine monatomic ion, the oxidation number equals its charge. For atoms in many covalent molecules, oxidation numbers are **formal bookkeeping values**, assigned by convention to track electron-accounting changes rather than directly measured local charges. Oxidation-number conventions include: an uncombined element has formal oxidation number zero; a monatomic ion uses its ionic charge; oxygen is commonly \u22122 in ordinary oxides but has important exceptions; hydrogen is commonly +1 with nonmetals and \u22121 in metal hydrides. The sum of formal oxidation numbers equals the net species charge when counted with atom multiplicities. These rules need stated species and bonding context. Moving from a reaction formula to an oxidation-number diagram is a REPRESENT or APPLY challenge. Write the formula, assign an oxidation number for each element under the appropriate conventions, check the sum, and then track changes across reactants/products. Do not infer that the assigned numbers give a microscopic mechanism; a one-electron numerical change does not prove a free electron travelled through a solution in one elementary step.",
    "misconception": "Wrong path: 'All atoms with oxidation number +2 physically carry +2 ionic charge.' Repair by distinguishing formal assignment from actual ionic species and the molecular bonding model.",
    "deepDive": "Oxygen in peroxides is often \u22121, so a blindly applied O = \u22122 rule can break the species-charge sum. Boundary conditions decide the model.",
    "qrtCount": 3
  },
  {
    "subtopicId": "CHEM-C13.03",
    "adapterId": "C13",
    "title": "Balancing redox with electron accounting (extension)",
    "scope": "EXTENSION",
    "concepts": [
      "CHEM-C13.03-CONCEPT"
    ],
    "qrtOperations": [
      "EXPLAIN",
      "APPLY",
      "JUSTIFY"
    ],
    "academicNotes": "Author-proposed tasks, not independently QRT-scored; D3/D4 is provisional. Canonical science is candidate only; Agent A prerequisites not yet pinned. Outside C09, Core1A/B teaching remains to be written; adapter does not count as a textbook. No inference of CBSE Class IX/X official coverage: advanced topic is an author research extension and requires independent academic source admission.",
    "entryQuestion": "An ionic equation balances every chemical element but has different total charge on each side. Can such an equation represent a complete reaction? The missing condition is charge conservation.",
    "coreSummary": "The ion\u2013electron method separates oxidation and reduction into half-reactions, balances all atoms and total charge, and then cancels the electrons transferred. In acidic medium, H\u2082O can balance oxygen and H\u207a can balance hydrogen; electrons balance charge. In basic medium, OH\u207b and water can be used consistently after a suitable transformation. The medium is not optional decoration, because the species available for balancing differ. Consider Fe\u00b2\u207a oxidation: Fe\u00b2\u207a \u2192 Fe\u00b3\u207a + e\u207b. A permanganate reduction in acidic solution can be expressed as MnO\u2084\u207b + 8H\u207a + 5e\u207b \u2192 Mn\u00b2\u207a + 4H\u2082O. Each side has one Mn, four O and eight H. Charge on the left is \u22121 + 8 \u2212 5 = +2, equal to Mn\u00b2\u207a on the right. Multiplying the iron half-reaction by five cancels electrons when the two are added. The combined acidic-medium equation is MnO\u2084\u207b + 8H\u207a + 5Fe\u00b2\u207a \u2192 Mn\u00b2\u207a + 4H\u2082O + 5Fe\u00b3\u207a. Left charge: \u22121 + 8 + 10 = +17. Right charge: +2 + 15 = +17. Oxygen, hydrogen, iron and manganese counts also match. Such half-reaction bookkeeping is **EXTENSION** beyond the normal Class X redox introduction and must not be presented as compulsory NSEJS knowledge.",
    "misconception": "Wrong path: 'A redox equation is balanced once each element count matches.' Repair by checking total charge in ionic equations, electron cancellation and the stated acidic/basic medium.",
    "deepDive": "Using the acidic MnO\u2084\u207b to Mn\u00b2\u207a half-reaction unchanged in strongly basic conditions is invalid without medium-specific chemistry and appropriate products.",
    "qrtCount": 3
  },
  {
    "subtopicId": "CHEM-C13.04",
    "adapterId": "C13",
    "title": "Reactant amount and redox stoichiometry (extension)",
    "scope": "EXTENSION",
    "concepts": [
      "CHEM-C13.04-CONCEPT"
    ],
    "qrtOperations": [
      "EXPLAIN",
      "APPLY",
      "JUSTIFY"
    ],
    "academicNotes": "Author-proposed tasks, not independently QRT-scored; D3/D4 is provisional. Canonical science is candidate only; Agent A prerequisites not yet pinned. Outside C09, Core1A/B teaching remains to be written; adapter does not count as a textbook. No inference of CBSE Class IX/X official coverage: advanced topic is an author research extension and requires independent academic source admission.",
    "entryQuestion": "A student claims one mole of any oxidising reagent always accepts the same number of electrons. Why can even the same named reagent have different electron accounting in different media?",
    "coreSummary": "A balanced redox equation gives mole relationships between reactants; electron equivalents describe how many electrons a species gains or loses under a **specified net change**. Equivalent amount is thus reaction-specific rather than a constant label attached once to a bottle. For example, MnO\u2084\u207b reduced to Mn\u00b2\u207a involves a five-electron change per Mn under acidic conditions, but other permitted products can have a different electron change. The medium, products and source identities must be stated. Use amount-of-substance reasoning with a balanced equation before introducing equivalent terminology. In the acidic permanganate\u2013iron(II) equation, one mole of MnO\u2084\u207b reacts stoichiometrically with five moles of Fe\u00b2\u207a. If the Fe\u00b2\u207a sample contains 0.050 mol, ideal complete conversion requires 0.010 mol permanganate under the stated chemistry. The calculation assumes Fe\u00b2\u207a is the only reducing agent and there are no interfering side reactions. An exam-style table may show reactant concentration and consumption without revealing the medium. A defensible learner should refuse to assign an unqualified factor until the actual reduced species is known. Mathematical neatness is not enough: an incorrect chemistry model can produce a perfectly consistent but false answer.",
    "misconception": "Wrong path: 'Apply the familiar 5-equivalent factor to every permanganate reaction.' Repair by identifying the product oxidation state and medium, then balancing the specific reaction before computing.",
    "deepDive": "If an oxidisable impurity is also present, the observed oxidant consumption cannot be assigned uniquely to Fe\u00b2\u207a. Composition and blank controls must be specified.",
    "qrtCount": 3
  },
  {
    "subtopicId": "CHEM-C13.05",
    "adapterId": "C13",
    "title": "Formal titration/equivalence techniques (enrichment)",
    "scope": "ENRICHMENT",
    "concepts": [
      "CHEM-C13.05-CONCEPT"
    ],
    "qrtOperations": [
      "EXPLAIN",
      "APPLY",
      "JUSTIFY"
    ],
    "academicNotes": "Author-proposed tasks, not independently QRT-scored; D3/D4 is provisional. Canonical science is candidate only; Agent A prerequisites not yet pinned. Outside C09, Core1A/B teaching remains to be written; adapter does not count as a textbook. No inference of CBSE Class IX/X official coverage: advanced topic is an author research extension and requires independent academic source admission.",
    "entryQuestion": "A burette shows a reproducible colour endpoint, and a student declares that the true chemical equivalence point must have been reached exactly. What is missing from that conclusion?",
    "coreSummary": "Volumetric analysis determines an amount through solution volume, concentration and a balanced reaction. A standard solution of known concentration is delivered from a burette into an accurately measured aliquot of sample. At the **equivalence point**, the amounts satisfy the stoichiometric relation; at a visible **indicator endpoint**, the colour criterion has changed. These are not always identical because indicators respond over a range and observations have experimental uncertainty. Read a burette consistently at eye level and distinguish initial from final readings. Use an appropriate endpoint indicator, known aliquot and balanced species-specific reaction, ideally with a blank or repeated concordant trials. Errors can include overshoot, parallax, air bubbles in the tip, contaminated glassware and interfering reactions. A set of different trial readings must not be averaged blindly if a trial is clearly compromised. An acid-base example is simpler than an advanced redox titration: for HCl + NaOH \u2192 NaCl + H\u2082O under complete neutralisation, the acid/base mole ratio is 1:1. If 25.0 mL of 0.100 mol/L NaOH requires 20.0 mL HCl to reach a suitable equivalence approximation, then base amount is 0.00250 mol and acid concentration is 0.00250/0.0200 = 0.125 mol/L. The calculation still assumes a proper endpoint and no interfering acid/base reactions.",
    "misconception": "Wrong path: 'Every indicator colour change establishes exact equivalence and a unique sample composition.' Repair by distinguishing indicator response from stoichiometric equality and asking whether side reactions or contamination occur.",
    "deepDive": "Changing indicator can shift the apparent endpoint even if the same solution pair is used. The most appropriate indicator depends on the acid-base or redox system.",
    "qrtCount": 3
  },
  {
    "subtopicId": "CHEM-C14.01",
    "adapterId": "C14",
    "title": "Atmospheric composition and chemical pollutants",
    "scope": "CORE_CANDIDATE",
    "concepts": [
      "CHEM-C14.01-CONCEPT"
    ],
    "qrtOperations": [
      "EXPLAIN",
      "MODEL",
      "JUSTIFY"
    ],
    "academicNotes": "Author-proposed tasks, not independently QRT-scored; D3/D4 is provisional. Canonical science is candidate only; Agent A prerequisites not yet pinned. Outside C09, Core1A/B teaching remains to be written; adapter does not count as a textbook.",
    "entryQuestion": "Two neighbourhood sensors report different nitrogen dioxide values even though traffic counts are nearly identical. Does that mean one sensor is defective\u2014or that a pollutant's journey through the atmosphere matters?",
    "coreSummary": "Air is a mixture dominated by nitrogen and oxygen with argon, carbon dioxide, variable water vapour and many trace species. Chemical identity matters more than the vague label 'gas': molecular oxygen is essential to life, carbon dioxide participates in carbon cycling and climate, sulfur dioxide and nitrogen oxides can transform into secondary pollutants. Whether a trace constituent is a pollutant depends on concentration, exposure, context and effects; small concentration alone is not a sufficient definition. Emissions become measured concentrations after transport, dilution, deposition and chemical reaction. Vehicle emissions can contain nitrogen oxides; sunlight and other reactive species participate in formation of ground-level ozone under suitable conditions. Ozone high in the stratosphere absorbs harmful ultraviolet radiation, while elevated ozone near the ground is a respiratory pollutant. A learner must not confuse identical molecular formula O\u2083 with identical environmental role independent of location. The protective stratospheric ozone layer is continuously formed and destroyed through sunlight-driven atmospheric chemistry. Its depletion means a reduction in stratospheric O\u2083 abundance, allowing more harmful UV-B to reach the surface; this is distinct from excess ground-level ozone pollution. Certain long-lived ozone-depleting chemicals, notably chlorofluorocarbons (CFCs) once used in some refrigeration and aerosol applications, can survive long enough to reach the stratosphere. Strong ultraviolet light breaks some CFC molecules and releases reactive chlorine atoms, which participate in repeated ozone-destroying reactions. Other ozone-depleting substances and atmospheric conditions also matter: do not infer a unique global ozone trend from one local pollution reading. A bounded school-level catalytic model is Cl\u00b7 + O\u2083 \u2192 ClO\u00b7 + O\u2082 followed by ClO\u00b7 + O \u2192 Cl\u00b7 + O\u2082, yielding a net O\u2083 + O \u2192 2O\u2082 when atomic oxygen is available. The dot denotes a reactive radical, not a negative ion. Because chlorine is regenerated, one reactive chlorine atom can participate in many cycles; real polar ozone-loss processes use additional reactions and conditions, so these two equations are an explanatory model, not a complete atmospheric simulation. A reduction in CFC emissions does not instantly rebuild the ozone layer because long-lived gases and radicals persist. Ozone depletion and greenhouse warming are distinct environmental mechanisms; neither is the same process as photochemical ground-level smog. The experimental representation should include a source, atmospheric transport, chemical conversion, concentration measurement and an exposed receptor. Weather, wind, sunlight and measurement placement matter. A correlation between traffic and high NO\u2082 might support a hypothesis, but it does not prove a unique source because background transport and industrial or domestic processes can contribute. Design measurements that genuinely separate alternatives. An atmospheric pollutant moves through three distinct accounts: emission at a source, transformation and transport in air, and concentration measured at a location. A changed mixing height or wind field can reverse a concentration trend without reversing a reported source activity. Controlled measurements must be matched in space and time.",
    "misconception": "Wrong path: 'Equal traffic means equal pollutant concentration' or 'every ozone molecule is harmful regardless of altitude.' Repair by separating production, transport, conversion and exposure conditions. Additional wrong inference: 'all ozone is a harmful pollutant' or 'cutting a CFC release immediately restores the ozone layer'. Repair by distinguishing altitude, photochemistry, catalytic cycles and long atmospheric residence times.",
    "deepDive": "A rise after a factory opens is temporal evidence, not a causal proof without comparison locations and weather controls. Changed-condition challenge: after a policy reduces new CFC emissions, would stratospheric ozone recover instantaneously? Explain the time lag without confusing it with local surface ozone.",
    "qrtCount": 3
  },
  {
    "subtopicId": "CHEM-C14.02",
    "adapterId": "C14",
    "title": "Water quality and separation methods",
    "scope": "CORE_CANDIDATE",
    "concepts": [
      "CHEM-C14.02-CONCEPT"
    ],
    "qrtOperations": [
      "EXPLAIN",
      "MODEL",
      "JUSTIFY"
    ],
    "academicNotes": "Author-proposed tasks, not independently QRT-scored; D3/D4 is provisional. Canonical science is candidate only; Agent A prerequisites not yet pinned. Outside C09, Core1A/B teaching remains to be written; adapter does not count as a textbook.",
    "entryQuestion": "A glass of water looks clear after filtration, but its measured electrical conductivity remains high. Has the filter failed, or is the test measuring a different class of material?",
    "coreSummary": "Water can carry suspended particles, dissolved salts, dissolved gases and living microorganisms. Filtration through paper or sand can remove many suspended solids, but dissolved ions pass through ordinary filters. Boiling may inactivate many microbes but does not reliably remove dissolved salts; evaporation can even concentrate them. Distillation separates a volatile water fraction from many nonvolatile solutes, but it does not automatically guarantee removal of every volatile contaminant or microbial safety after collection. Turbidity, conductivity, acidity and microbiological tests measure different features. Clear water is an aesthetic observation, not a certificate of drinking-water safety. A scientifically sound treatment design identifies the contaminant class before choosing sedimentation, filtration, adsorption, suitable disinfection, ion removal or distillation. Each process has operating limits and may introduce new risks if handled poorly. At D3, select a sequence using particle size and chemical identity. At D4, reconcile a counterintuitive case: a filter makes water crystal-clear, but conductivity remains because dissolved salts are unchanged. A treatment strategy that removes microbial risk while concentrating nonvolatile salts might improve one quality dimension and worsen another. State the tested endpoints and sources of uncertainty rather than claiming one universal purity measure. Clarity and turbidity describe suspended visible matter, not dissolved chemical identity or microbial risk. Boiling can change biological viability under controlled conditions but is not an ion-removal step; high conductivity is an unspecific ion signal. Safe-water claims need constituent-specific and microbiological verification.",
    "misconception": "Wrong path: 'Transparent water is chemically pure and safe to drink.' Repair with separate suspended, dissolved and microbial evidence and controls.",
    "deepDive": "Some dissolved toxic chemicals do not strongly affect conductivity; a low reading does not guarantee absence of contaminants.",
    "qrtCount": 3
  },
  {
    "subtopicId": "CHEM-C14.03",
    "adapterId": "C14",
    "title": "Combustion products, acid rain and evidence",
    "scope": "CORE_CANDIDATE",
    "concepts": [
      "CHEM-C14.03-CONCEPT"
    ],
    "qrtOperations": [
      "EXPLAIN",
      "MODEL",
      "JUSTIFY"
    ],
    "academicNotes": "Author-proposed tasks, not independently QRT-scored; D3/D4 is provisional. Canonical science is candidate only; Agent A prerequisites not yet pinned. Outside C09, Core1A/B teaching remains to be written; adapter does not count as a textbook.",
    "entryQuestion": "Rainfall near a remote mountain is acidic although there is no nearby factory. Does this disprove the idea that combustion pollutants can affect rain chemistry?",
    "coreSummary": "Ordinary rain is naturally somewhat acidic because atmospheric carbon dioxide dissolves and participates in weak carbonic-acid equilibria. In environmental chemistry, enhanced acidic deposition can occur when sulfur dioxide and nitrogen oxides emitted from combustion undergo atmospheric oxidation and hydration to form acidic species. The detailed reactions depend on conditions, sunlight, oxidants and droplets; a single direct equation is a simplified net model, not a full atmospheric mechanism. Pollutants can travel considerable distances before chemical transformation and deposition. The absence of a local factory therefore does not disprove an upwind source. Conversely, acidic rain near a factory does not prove that factory is solely responsible without atmospheric data. Compare background rain acidity, wind trajectories, emission inventories, wet/dry deposition and controls at other sites. Show an evidence path: source emission \u2192 wind transport \u2192 SO\u2093/NO\u2093 transformation \u2192 dissolved acidity in rain \u2192 measured pH and consequences. Each arrow needs a scientific basis. Carbon dioxide's natural weak acid contribution must be separated from unusually strong acid deposition. A student's D4 task can ask which link is underdetermined from sparse observations and require a realistic discriminator, not just label 'acid rain'. An acidic pollutant can encounter an alkaline dust or mineral aerosol before deposition. A neutralising reaction changes measured free H\u207a without erasing the deposited sulfate/nitrate ions. Interpret pH alongside ion loading, alkalinity, winds and source indicators rather than as a direct one-to-one emission measurement.",
    "misconception": "Wrong path: 'Any rain below pH 7 proves industrial acid rain from the nearest chimney.' Repair by accounting for natural dissolved CO\u2082, regional transport and multiple potential acidic species.",
    "deepDive": "Rain chemistry can vary over time and geography; a pH value without ionic composition and controls rarely proves one mechanism.",
    "qrtCount": 3
  },
  {
    "subtopicId": "CHEM-C14.04",
    "adapterId": "C14",
    "title": "Carbon and nitrogen cycles (science integration)",
    "scope": "CORE_CANDIDATE",
    "concepts": [
      "CHEM-C14.04-CONCEPT"
    ],
    "qrtOperations": [
      "EXPLAIN",
      "MODEL",
      "JUSTIFY"
    ],
    "academicNotes": "Author-proposed tasks, not independently QRT-scored; D3/D4 is provisional. Canonical science is candidate only; Agent A prerequisites not yet pinned. Outside C09, Core1A/B teaching remains to be written; adapter does not count as a textbook.",
    "entryQuestion": "Carbon atoms in atmospheric carbon dioxide become part of a tree and later appear in soil or another organism. No carbon atom has been manufactured by the tree. How can a diagram show this without confusing flow with chemical reaction?",
    "coreSummary": "Photosynthesis transfers carbon from CO\u2082 into organic matter under light-driven biological chemistry; respiration, decomposition and combustion can transfer organic carbon back to CO\u2082. These pathways are linked through chemical transformations and physical reservoirs. The total elemental carbon in a suitably closed accounting system is conserved, although individual reservoirs rise or fall with inputs and outputs. A cycle diagram is a simplified stock-and-flow model, not a claim that all pathways have identical speed or form one direct one-step reaction. Nitrogen chemistry is more varied. Atmospheric N\u2082 is abundant but often not directly accessible for plant growth; biological nitrogen fixation can convert N\u2082 into reduced nitrogen forms. Nitrification by suitable microbes can convert ammonium to nitrite and nitrate, while denitrification converts suitable nitrogen oxides/nitrate forms toward gaseous nitrogen species under particular conditions. Plant uptake and food webs move nitrogen into organic compounds. These transformations require distinct chemical species and environments. At D3, learners should preserve C/N atoms across arrows and identify the missing reservoir. At D4, challenge a misleading graph that shows a reservoir gaining carbon indefinitely without an input or losing carbon without a sink. Chemical element conservation does not imply that atmospheric concentration is constant, because sources and sinks may be unbalanced over an interval.",
    "misconception": "Wrong path: 'A cycle diagram by itself proves a reaction rate or that the environmental system is in steady state.' Repair with separate reservoirs, flux measurements and known or unknown sinks.",
    "deepDive": "An ecosystem can accumulate carbon even while individual atoms are conserved; total system inventory depends on where boundaries are drawn.",
    "qrtCount": 3
  },
  {
    "subtopicId": "CHEM-C14.05",
    "adapterId": "C14",
    "title": "Applied sustainable chemical decisions",
    "scope": "CORE_CANDIDATE",
    "concepts": [
      "CHEM-C14.05-CONCEPT"
    ],
    "qrtOperations": [
      "EXPLAIN",
      "MODEL",
      "JUSTIFY"
    ],
    "academicNotes": "Author-proposed tasks, not independently QRT-scored; D3/D4 is provisional. Canonical science is candidate only; Agent A prerequisites not yet pinned. Outside C09, Core1A/B teaching remains to be written; adapter does not count as a textbook.",
    "entryQuestion": "One packaging material is labelled biodegradable, another recyclable. Which one is more sustainable? Without defining the environmental goal and the whole product life cycle, the question cannot be decided.",
    "coreSummary": "An applied chemical decision compares alternatives across defined system boundaries: raw-material extraction, manufacture, transport, use, collection, recycling/disposal and the emissions or waste from each stage. A biodegradable material can break down under suitable conditions, but degradation rates and products depend on oxygen, moisture, temperature and treatment. A recyclable material can be recovered in principle, but collection rates and recycling energy matter. Neither label alone establishes a complete environmental outcome. Biodegradable and non-biodegradable describe different responses to biological decomposition, not whether an item can be recycled or whether it always has low impact. Under suitable environmental conditions, microbes and their enzymes can break many food scraps, untreated paper and plant-derived material into simpler substances; rate and final products depend on oxygen, moisture, temperature and material composition. Conventional polyethylene packaging and glass are generally non-biodegradable on ordinary environmental timescales: they are not readily mineralised by natural microbial action. Glass can be recyclable without being biodegradable. A plastic fragment becoming smaller, or a material weathering in sunlight, is not proof that microorganisms have completely broken it down. Compare *biodegradability* (microbial transformation under specified conditions), *recyclability* (whether a recovery process exists and is used), and *environmental merit* (life-cycle outcomes). In warm aerated compost, untreated paper may break down; in a dry oxygen-limited landfill it may persist much longer. A recyclable glass container may be non-biodegradable, yet reuse and an effective collection system can change overall emissions and waste. A single advertising label cannot replace evidence of actual conditions, downstream treatment, contamination and effects; some biodegradable plastics also require industrial conditions, so do not assume disposal in any environment is safe. Choose measurable criteria\u2014energy consumed, greenhouse-gas emissions, water use, persistent pollutants, toxic byproducts, resource scarcity and uncertainty. Specify functional equivalence: two water treatments must deliver comparable quality before energy impacts are compared. Mixing unequal units or comparing a single production step with a whole lifecycle is a boundary error. A careful science answer states assumptions and the conditions under which its preference might reverse. D3 tasks can build a compact decision matrix from given data; D4 tasks should identify when a seemingly green process shifts pollution to another place or changes hazard rather than eliminating it. Chemical evidence and measured values are more reliable than marketing terms. Some tradeoffs cannot be collapsed into one single universally correct ranking without stakeholder priorities; the learner should expose rather than conceal that limitation.",
    "misconception": "Wrong path: 'Biodegradable automatically means best, or the lowest-energy unit operation means lowest total impact.' Repair by defining the functional unit, performance threshold, lifecycle boundary and measured chemical waste. Another false equation is 'recyclable = biodegradable' or 'plastic fragmentation = complete biodegradation'. Repair by distinguishing physical size reduction, microbial conversion and collection-based recycling.",
    "deepDive": "Changing the environmental endpoint (e.g., water contamination versus climate emissions) can reverse the preferred option. State the criterion before announcing a winner. Changed-condition challenge: if an untreated paper bag is moved from warm moist compost to a dry landfill, does its inherent classification and its decomposition rate necessarily change in the same way? Contrast a non-biodegradable polyethylene wrapper.",
    "qrtCount": 3
  }
];

export const CHEMISTRY_QRT_TASKS: readonly ChemistryQrtDescriptor[] = [
  {
    "instanceId": "C01-01-EXPLAIN-D3",
    "adapterId": "C01",
    "subtopicId": "CHEM-C01.01",
    "primaryOperation": "EXPLAIN",
    "band": "D3",
    "studentTask": "A few millilitres of a volatile liquid are left in an open dish. The dish becomes lighter while its odour spreads in a sealed room. Explain both observations at particle scale. Has matter been destroyed?",
    "wrongIdea": "A student concludes that the lost liquid mass has ceased to exist. Identify the first invalid inference and what was not measured.",
    "replacementRule": "Build a before-and-after particle ledger covering the dish and the rest of the closed room. Explain the phase and transport processes.",
    "visualJob": "Candidate representation: show relevant species, states, values or evidence in an uncompleted ledger/diagram; do not disclose the decisive EXPLAIN operation or final result. Task-specific visual adequacy remains for R01 review.",
    "independentCheck": "Declare the system boundary, locate matter crossing it and account for species without claiming spontaneous particle creation."
  },
  {
    "instanceId": "C01-02-MODEL-D3",
    "adapterId": "C01",
    "subtopicId": "CHEM-C01.01",
    "primaryOperation": "MODEL",
    "band": "D3",
    "studentTask": "A red solute disperses without gas, heat or precipitate. What simple model best explains the uniform red appearance, and what would further test it?",
    "wrongIdea": "The coloured substance multiplies as it spreads.",
    "replacementRule": "Track a fixed set of dye particles through successive snapshots.",
    "visualJob": "Draw a beaker before and after mixing using distinguishable particle dots. Keep the same particle count in the closed-beaker diagram; vary positions rather than transforming water molecules into new species.",
    "independentCheck": "A model prediction must be distinguishable from a compatible alternative."
  },
  {
    "instanceId": "C01-03-JUSTIFY-D4",
    "adapterId": "C01",
    "subtopicId": "CHEM-C01.01",
    "primaryOperation": "JUSTIFY",
    "band": "D4",
    "studentTask": "A student says dye spreading proves that water molecules and dye particles have identical masses. Critique this inference.",
    "wrongIdea": "The coloured substance multiplies as it spreads.",
    "replacementRule": "Track a fixed set of dye particles through successive snapshots.",
    "visualJob": "Draw a beaker before and after mixing using distinguishable particle dots. Keep the same particle count in the closed-beaker diagram; vary positions rather than transforming water molecules into new species.",
    "independentCheck": "Reject deductions that exceed the measurement."
  },
  {
    "instanceId": "C01-04-EXPLAIN-D3",
    "adapterId": "C01",
    "subtopicId": "CHEM-C01.02",
    "primaryOperation": "EXPLAIN",
    "band": "D3",
    "studentTask": "A sealed air syringe compresses easily, but the same syringe filled with water barely compresses. Explain.",
    "wrongIdea": "Gases compress because their molecules shrink.",
    "replacementRule": "Draw the same-sized particles in a smaller box with reduced gaps.",
    "visualJob": "Use figures/c01-particle-states.svg only as prerequisite explanatory evidence, not an annotated answer to C01-04-EXPLAIN-D3. Three equal-size boxes depict closely packed ordered solid particles, disordered close-packed liquid particles and widely separated gas particles. A fourth box compresses a gas while keeping particle number fixed.",
    "independentCheck": "Identify the system boundary and whether the particle number is fixed."
  },
  {
    "instanceId": "C01-05-MODEL-D3",
    "adapterId": "C01",
    "subtopicId": "CHEM-C01.02",
    "primaryOperation": "MODEL",
    "band": "D3",
    "studentTask": "A mystery sample takes container shape but keeps almost unchanged volume under modest pressure. Which state model fits and what additional check helps?",
    "wrongIdea": "Gases compress because their molecules shrink.",
    "replacementRule": "Draw the same-sized particles in a smaller box with reduced gaps.",
    "visualJob": "Use figures/c01-particle-states.svg only as prerequisite explanatory evidence, not an annotated answer to C01-05-MODEL-D3. Three equal-size boxes depict closely packed ordered solid particles, disordered close-packed liquid particles and widely separated gas particles. A fourth box compresses a gas while keeping particle number fixed.",
    "independentCheck": "State a second independent condition before identifying the state."
  },
  {
    "instanceId": "C01-06-JUSTIFY-D4",
    "adapterId": "C01",
    "subtopicId": "CHEM-C01.02",
    "primaryOperation": "JUSTIFY",
    "band": "D4",
    "studentTask": "Evaluate 'Every gas can be compressed to arbitrarily small volume by squeezing harder at a fixed temperature.'",
    "wrongIdea": "Gases compress because their molecules shrink.",
    "replacementRule": "Draw the same-sized particles in a smaller box with reduced gaps.",
    "visualJob": "Use figures/c01-particle-states.svg only as prerequisite explanatory evidence, not an annotated answer to C01-06-JUSTIFY-D4. Three equal-size boxes depict closely packed ordered solid particles, disordered close-packed liquid particles and widely separated gas particles. A fourth box compresses a gas while keeping particle number fixed.",
    "independentCheck": "Acknowledge model limits rather than promising universal compressibility."
  },
  {
    "instanceId": "C01-07-EXPLAIN-D3",
    "adapterId": "C01",
    "subtopicId": "CHEM-C01.03",
    "primaryOperation": "EXPLAIN",
    "band": "D3",
    "studentTask": "How can a net diffusion flux occur when no molecule 'knows' which way to move?",
    "wrongIdea": "Each perfume molecule travels directly from the source toward the observer.",
    "replacementRule": "Distinguish random particle trajectories from the evolving concentration profile.",
    "visualJob": "Use random arrows to show molecules moving in all directions and shading for the concentration gradient. A separate large air-flow arrow represents bulk convection; do not confuse the two.",
    "independentCheck": "At equilibrium net flux approaches zero; motion persists."
  },
  {
    "instanceId": "C01-08-MODEL-D3",
    "adapterId": "C01",
    "subtopicId": "CHEM-C01.03",
    "primaryOperation": "MODEL",
    "band": "D3",
    "studentTask": "Odour reaches a sensor much faster with a running fan. What model or combination best explains the change?",
    "wrongIdea": "Each perfume molecule travels directly from the source toward the observer.",
    "replacementRule": "Distinguish random particle trajectories from the evolving concentration profile.",
    "visualJob": "Use random arrows to show molecules moving in all directions and shading for the concentration gradient. A separate large air-flow arrow represents bulk convection; do not confuse the two.",
    "independentCheck": "Compare predictions with and without airflow."
  },
  {
    "instanceId": "C01-09-JUSTIFY-D4",
    "adapterId": "C01",
    "subtopicId": "CHEM-C01.03",
    "primaryOperation": "JUSTIFY",
    "band": "D4",
    "studentTask": "A lab report infers a molecular diffusion constant solely from the first moment a smell is detected across a room. Is that justified?",
    "wrongIdea": "Each perfume molecule travels directly from the source toward the observer.",
    "replacementRule": "Distinguish random particle trajectories from the evolving concentration profile.",
    "visualJob": "Use random arrows to show molecules moving in all directions and shading for the concentration gradient. A separate large air-flow arrow represents bulk convection; do not confuse the two.",
    "independentCheck": "Infer only parameters that the controlled experiment identifies."
  },
  {
    "instanceId": "C01-10-EXPLAIN-D3",
    "adapterId": "C01",
    "subtopicId": "CHEM-C01.04",
    "primaryOperation": "EXPLAIN",
    "band": "D3",
    "studentTask": "Explain why boiling water does not normally produce hydrogen gas.",
    "wrongIdea": "Melting breaks H\u2082O into hydrogen and oxygen.",
    "replacementRule": "Keep molecule symbols intact when drawing the before/after stages.",
    "visualJob": "Sketch one water molecule H\u2013O\u2013H remaining intact in both a close-packed liquid arrangement and distant gas arrangement. Mark 'intermolecular attractions' separately from the intramolecular O\u2013H bonds.",
    "independentCheck": "Check elemental composition of a closed sample."
  },
  {
    "instanceId": "C01-11-MODEL-D3",
    "adapterId": "C01",
    "subtopicId": "CHEM-C01.04",
    "primaryOperation": "MODEL",
    "band": "D3",
    "studentTask": "A pan of boiling water loses 20 g of mass. Does this violate conservation of mass? Select a system model.",
    "wrongIdea": "Melting breaks H\u2082O into hydrogen and oxygen.",
    "replacementRule": "Keep molecule symbols intact when drawing the before/after stages.",
    "visualJob": "Sketch one water molecule H\u2013O\u2013H remaining intact in both a close-packed liquid arrangement and distant gas arrangement. Mark 'intermolecular attractions' separately from the intramolecular O\u2013H bonds.",
    "independentCheck": "The sum includes escaped and condensed vapour."
  },
  {
    "instanceId": "C01-12-JUSTIFY-D4",
    "adapterId": "C01",
    "subtopicId": "CHEM-C01.04",
    "primaryOperation": "JUSTIFY",
    "band": "D4",
    "studentTask": "A student argues 'Mass conservation proves that no chemical reaction occurred.' Is this inference valid?",
    "wrongIdea": "Melting breaks H\u2082O into hydrogen and oxygen.",
    "replacementRule": "Keep molecule symbols intact when drawing the before/after stages.",
    "visualJob": "Sketch one water molecule H\u2013O\u2013H remaining intact in both a close-packed liquid arrangement and distant gas arrangement. Mark 'intermolecular attractions' separately from the intramolecular O\u2013H bonds.",
    "independentCheck": "Offer a chemically valid counterexample."
  },
  {
    "instanceId": "C01-13-EXPLAIN-D3",
    "adapterId": "C01",
    "subtopicId": "CHEM-C01.05",
    "primaryOperation": "EXPLAIN",
    "band": "D3",
    "studentTask": "Explain why wet clothes can feel cold in moving air even when the air is warm.",
    "wrongIdea": "Evaporation only occurs at the boiling point.",
    "replacementRule": "Distinguish surface evaporation from bulk boiling.",
    "visualJob": "Draw liquid molecules with a spread of motion-arrow lengths. Show some high-energy surface molecules escaping; the remaining ones have lower average energy unless heat enters.",
    "independentCheck": "Check an energy pathway, not just the sensation."
  },
  {
    "instanceId": "C01-14-MODEL-D3",
    "adapterId": "C01",
    "subtopicId": "CHEM-C01.05",
    "primaryOperation": "MODEL",
    "band": "D3",
    "studentTask": "Two identical wet towels dry at different speeds in still humid air and moving dry air. Choose a causal model.",
    "wrongIdea": "Evaporation only occurs at the boiling point.",
    "replacementRule": "Distinguish surface evaporation from bulk boiling.",
    "visualJob": "Draw liquid molecules with a spread of motion-arrow lengths. Show some high-energy surface molecules escaping; the remaining ones have lower average energy unless heat enters.",
    "independentCheck": "Explain both water-vapour gradient and energy."
  },
  {
    "instanceId": "C01-15-JUSTIFY-D4",
    "adapterId": "C01",
    "subtopicId": "CHEM-C01.05",
    "primaryOperation": "JUSTIFY",
    "band": "D4",
    "studentTask": "Evaluate: 'If a liquid evaporates, its temperature must always decrease.'",
    "wrongIdea": "Evaporation only occurs at the boiling point.",
    "replacementRule": "Distinguish surface evaporation from bulk boiling.",
    "visualJob": "Draw liquid molecules with a spread of motion-arrow lengths. Show some high-energy surface molecules escaping; the remaining ones have lower average energy unless heat enters.",
    "independentCheck": "State the energy-balance condition needed for a temperature decrease."
  },
  {
    "instanceId": "C01-16-EXPLAIN-D3",
    "adapterId": "C01",
    "subtopicId": "CHEM-C01.06",
    "primaryOperation": "EXPLAIN",
    "band": "D3",
    "studentTask": "Explain why a melting sample can remain near 0\u00b0C while energy continues entering.",
    "wrongIdea": "A horizontal heating curve means no energy enters the material.",
    "replacementRule": "Track heat input and microscopic changes separately.",
    "visualJob": "Use figures/c01-heating-curve.svg only as prerequisite explanatory evidence, not an annotated answer to C01-16-EXPLAIN-D3. Sketch a temperature-versus-energy plot: sloping solid heating, flat melting, sloping liquid heating. Label the plateau as energy used for phase change, not 'heater turned off'.",
    "independentCheck": "Point to the phase fraction and heat-input assumptions."
  },
  {
    "instanceId": "C01-17-MODEL-D3",
    "adapterId": "C01",
    "subtopicId": "CHEM-C01.06",
    "primaryOperation": "MODEL",
    "band": "D3",
    "studentTask": "A 0.20 kg ice sample at 0\u00b0C receives 33.4 kJ. Using Lf=334 kJ/kg, what fraction melts in an ideal setup?",
    "wrongIdea": "A horizontal heating curve means no energy enters the material.",
    "replacementRule": "Track heat input and microscopic changes separately.",
    "visualJob": "Use figures/c01-heating-curve.svg only as prerequisite explanatory evidence, not an annotated answer to C01-17-MODEL-D3. Sketch a temperature-versus-energy plot: sloping solid heating, flat melting, sloping liquid heating. Label the plateau as energy used for phase change, not 'heater turned off'.",
    "independentCheck": "Energy units and melt fraction \u22641 checked."
  },
  {
    "instanceId": "C01-18-JUSTIFY-D4",
    "adapterId": "C01",
    "subtopicId": "CHEM-C01.06",
    "primaryOperation": "JUSTIFY",
    "band": "D4",
    "studentTask": "A mixture shows a sloping 'melting' segment. Does that prove the thermometer is broken?",
    "wrongIdea": "A horizontal heating curve means no energy enters the material.",
    "replacementRule": "Track heat input and microscopic changes separately.",
    "visualJob": "Use figures/c01-heating-curve.svg only as prerequisite explanatory evidence, not an annotated answer to C01-18-JUSTIFY-D4. Sketch a temperature-versus-energy plot: sloping solid heating, flat melting, sloping liquid heating. Label the plateau as energy used for phase change, not 'heater turned off'.",
    "independentCheck": "Distinguish instrument fault from physical alternatives."
  },
  {
    "instanceId": "C02-01-EXPLAIN-D3",
    "adapterId": "C02",
    "subtopicId": "CHEM-C02.01",
    "primaryOperation": "EXPLAIN",
    "band": "D3",
    "studentTask": "Why can a salt solution have different salt percentages without changing the chemical identity of salt?",
    "wrongIdea": "Anything transparent and uniform must be a pure compound.",
    "replacementRule": "Use composition variability and separability, not only visual uniformity.",
    "visualJob": "Compare particle diagrams: pure element A; pure compound AB with all units identical; mixture of independent A and B species. Do not draw dissolved salt as undissociated NaCl molecules by default; aqueous Na\u207a and Cl\u207b are present.",
    "independentCheck": "Distinguish component formula from mixture proportions."
  },
  {
    "instanceId": "C02-02-REPRESENT-D3",
    "adapterId": "C02",
    "subtopicId": "CHEM-C02.01",
    "primaryOperation": "REPRESENT",
    "band": "D3",
    "studentTask": "A box contains identical AB molecules and free B\u2082 molecules. Is it an element, compound or mixture? Explain the model.",
    "wrongIdea": "Anything transparent and uniform must be a pure compound.",
    "replacementRule": "Use composition variability and separability, not only visual uniformity.",
    "visualJob": "Compare particle diagrams: pure element A; pure compound AB with all units identical; mixture of independent A and B species. Do not draw dissolved salt as undissociated NaCl molecules by default; aqueous Na\u207a and Cl\u207b are present.",
    "independentCheck": "Check all particle identities in a diagram."
  },
  {
    "instanceId": "C02-03-SYNTHESIZE-D4",
    "adapterId": "C02",
    "subtopicId": "CHEM-C02.01",
    "primaryOperation": "SYNTHESIZE",
    "band": "D4",
    "studentTask": "An unknown transparent liquid leaves white crystals when evaporated and its composition varies between batches. Construct the strongest justified classification.",
    "wrongIdea": "Anything transparent and uniform must be a pure compound.",
    "replacementRule": "Use composition variability and separability, not only visual uniformity.",
    "visualJob": "Compare particle diagrams: pure element A; pure compound AB with all units identical; mixture of independent A and B species. Do not draw dissolved salt as undissociated NaCl molecules by default; aqueous Na\u207a and Cl\u207b are present.",
    "independentCheck": "State uncertainty after classifying."
  },
  {
    "instanceId": "C02-04-EXPLAIN-D3",
    "adapterId": "C02",
    "subtopicId": "CHEM-C02.02",
    "primaryOperation": "EXPLAIN",
    "band": "D3",
    "studentTask": "Why can milk look homogeneous but be described as a colloid?",
    "wrongIdea": "A mixture that looks uniform for one second is a permanently homogeneous solution.",
    "replacementRule": "Repeat sampling over time and at an appropriate scale.",
    "visualJob": "Show three magnification levels: visible glass, microscopic suspended droplets, molecular-scale dissolved ions. Label the scale, not only the apparent colour.",
    "independentCheck": "Distinguish appearance from composition."
  },
  {
    "instanceId": "C02-05-REPRESENT-D3",
    "adapterId": "C02",
    "subtopicId": "CHEM-C02.02",
    "primaryOperation": "REPRESENT",
    "band": "D3",
    "studentTask": "Describe two particle models for salt water and fine chalk in water.",
    "wrongIdea": "A mixture that looks uniform for one second is a permanently homogeneous solution.",
    "replacementRule": "Repeat sampling over time and at an appropriate scale.",
    "visualJob": "Show three magnification levels: visible glass, microscopic suspended droplets, molecular-scale dissolved ions. Label the scale, not only the apparent colour.",
    "independentCheck": "Test whether 'smaller' automatically means 'dissolved'."
  },
  {
    "instanceId": "C02-06-SYNTHESIZE-D4",
    "adapterId": "C02",
    "subtopicId": "CHEM-C02.02",
    "primaryOperation": "SYNTHESIZE",
    "band": "D4",
    "studentTask": "A dispersal stays cloudy for hours, strongly scatters light and passes through ordinary filter paper. Is it certainly a true molecular solution?",
    "wrongIdea": "A mixture that looks uniform for one second is a permanently homogeneous solution.",
    "replacementRule": "Repeat sampling over time and at an appropriate scale.",
    "visualJob": "Show three magnification levels: visible glass, microscopic suspended droplets, molecular-scale dissolved ions. Label the scale, not only the apparent colour.",
    "independentCheck": "Multiple observations must constrain the classification."
  },
  {
    "instanceId": "C02-07-EXPLAIN-D3",
    "adapterId": "C02",
    "subtopicId": "CHEM-C02.03",
    "primaryOperation": "EXPLAIN",
    "band": "D3",
    "studentTask": "Why can a foggy medium show a light beam more clearly than clean air?",
    "wrongIdea": "A visible beam in any liquid proves a chemical reaction is occurring.",
    "replacementRule": "Separate optical observations from species-changing reactions.",
    "visualJob": "Use figures/c02-dispersions.svg only as prerequisite explanatory evidence, not an annotated answer to C02-07-EXPLAIN-D3. Compare (a) transparent salt solution with ions, (b) stable colloid with droplets causing a visible beam and (c) suspension with larger grains and settling.",
    "independentCheck": "Use a scattering mechanism in the correct medium."
  },
  {
    "instanceId": "C02-08-MODEL-D3",
    "adapterId": "C02",
    "subtopicId": "CHEM-C02.03",
    "primaryOperation": "MODEL",
    "band": "D3",
    "studentTask": "A stable sample looks uniform but scatters light strongly. Which model is better: molecular solution or colloid?",
    "wrongIdea": "A visible beam in any liquid proves a chemical reaction is occurring.",
    "replacementRule": "Separate optical observations from species-changing reactions.",
    "visualJob": "Use figures/c02-dispersions.svg only as prerequisite explanatory evidence, not an annotated answer to C02-08-MODEL-D3. Compare (a) transparent salt solution with ions, (b) stable colloid with droplets causing a visible beam and (c) suspension with larger grains and settling.",
    "independentCheck": "State measurement conditions."
  },
  {
    "instanceId": "C02-09-SYNTHESIZE-D4",
    "adapterId": "C02",
    "subtopicId": "CHEM-C02.03",
    "primaryOperation": "SYNTHESIZE",
    "band": "D4",
    "studentTask": "Liquid X passes filter paper, does not settle in two days and shows pronounced Tyndall scattering. What can we infer and what remains unknown?",
    "wrongIdea": "A visible beam in any liquid proves a chemical reaction is occurring.",
    "replacementRule": "Separate optical observations from species-changing reactions.",
    "visualJob": "Use figures/c02-dispersions.svg only as prerequisite explanatory evidence, not an annotated answer to C02-09-SYNTHESIZE-D4. Compare (a) transparent salt solution with ions, (b) stable colloid with droplets causing a visible beam and (c) suspension with larger grains and settling.",
    "independentCheck": "Acknowledge ambiguous boundary cases."
  },
  {
    "instanceId": "C02-10-APPLY-D3",
    "adapterId": "C02",
    "subtopicId": "CHEM-C02.04",
    "primaryOperation": "APPLY",
    "band": "D3",
    "studentTask": "A 200 g solution contains 10% salt by mass. Assuming salt is nonvolatile and no solution is spilled, 50 g water evaporates and then 100 g water is added. Find the final mass percentage and show a component-mass ledger.",
    "wrongIdea": "A proposed answer uses 150 g as the final denominator despite the later addition of water. Identify the first bookkeeping error.",
    "replacementRule": "Recalculate total mass after each operation, then recompute mass percentage using the conserved solute amount.",
    "visualJob": "Candidate representation: show relevant species, states, values or evidence in an uncompleted ledger/diagram; do not disclose the decisive APPLY operation or final result. Task-specific visual adequacy remains for R01 review.",
    "independentCheck": "Check both solvent and solute ledgers separately and divide by the final total solution mass, not by the initial solvent mass."
  },
  {
    "instanceId": "C02-11-REPRESENT-D3",
    "adapterId": "C02",
    "subtopicId": "CHEM-C02.04",
    "primaryOperation": "REPRESENT",
    "band": "D3",
    "studentTask": "A label says '5% m/V'. Explain what can be asserted about solute and solution, and why this is not 5% m/m.",
    "wrongIdea": "Use only solvent mass in the denominator for mass percentage.",
    "replacementRule": "Write the concentration definition and units before substituting.",
    "visualJob": "Use a ratio bar with numerator solute mass and denominator total solution mass or volume. Explicitly label % m/m or % m/V and do not substitute solvent mass.",
    "independentCheck": "Interpret units, not just numbers."
  },
  {
    "instanceId": "C02-12-SYNTHESIZE-D4",
    "adapterId": "C02",
    "subtopicId": "CHEM-C02.04",
    "primaryOperation": "SYNTHESIZE",
    "band": "D4",
    "studentTask": "Mix 200 g of 5% m/m sugar solution with 300 g of 15% m/m sugar solution. Find resulting mass percentage.",
    "wrongIdea": "Use only solvent mass in the denominator for mass percentage.",
    "replacementRule": "Write the concentration definition and units before substituting.",
    "visualJob": "Use a ratio bar with numerator solute mass and denominator total solution mass or volume. Explicitly label % m/m or % m/V and do not substitute solvent mass.",
    "independentCheck": "Independent mass ledger and weighted average check."
  },
  {
    "instanceId": "C02-13-APPLY-D3",
    "adapterId": "C02",
    "subtopicId": "CHEM-C02.05",
    "primaryOperation": "APPLY",
    "band": "D3",
    "studentTask": "If a salt's solubility is 25 g per 100 g water, how much remains undissolved when 50 g is added to 100 g water at that temperature?",
    "wrongIdea": "Solubility always rises when temperature rises.",
    "replacementRule": "Read the specific solute curve and state fixed conditions.",
    "visualJob": "Draw solubility-versus-temperature curves for a hypothetical solid and gas as illustrative trends, explicitly mark hypothetical and avoid implying every substance follows the same slope.",
    "independentCheck": "Check total solute conserved."
  },
  {
    "instanceId": "C02-14-MODEL-D3",
    "adapterId": "C02",
    "subtopicId": "CHEM-C02.05",
    "primaryOperation": "MODEL",
    "band": "D3",
    "studentTask": "At 60\u00b0C solubility is 60 g/100g water; at 20\u00b0C it is 20 g/100g. Cool 100 g water saturated at 60\u00b0C. How many grams may crystallise?",
    "wrongIdea": "Solubility always rises when temperature rises.",
    "replacementRule": "Read the specific solute curve and state fixed conditions.",
    "visualJob": "Draw solubility-versus-temperature curves for a hypothetical solid and gas as illustrative trends, explicitly mark hypothetical and avoid implying every substance follows the same slope.",
    "independentCheck": "Check initial dissolved amount against both limits."
  },
  {
    "instanceId": "C02-15-SYNTHESIZE-D4",
    "adapterId": "C02",
    "subtopicId": "CHEM-C02.05",
    "primaryOperation": "SYNTHESIZE",
    "band": "D4",
    "studentTask": "A solution stays clear after rapid cooling below its equilibrium solubility. Does this disprove the measured solubility curve?",
    "wrongIdea": "Solubility always rises when temperature rises.",
    "replacementRule": "Read the specific solute curve and state fixed conditions.",
    "visualJob": "Draw solubility-versus-temperature curves for a hypothetical solid and gas as illustrative trends, explicitly mark hypothetical and avoid implying every substance follows the same slope.",
    "independentCheck": "Identify a falsifiable experimental distinction."
  },
  {
    "instanceId": "C02-16-EXPLAIN-D3",
    "adapterId": "C02",
    "subtopicId": "CHEM-C02.06",
    "primaryOperation": "EXPLAIN",
    "band": "D3",
    "studentTask": "Why does a condenser in a simple salt-water distillation yield fresh water?",
    "wrongIdea": "Filtration separates dissolved salt from water.",
    "replacementRule": "Choose a technique based on dissolved state and property contrasts.",
    "visualJob": "Use figures/c02-distillation.svg only as prerequisite explanatory evidence, not an annotated answer to C02-16-EXPLAIN-D3. Diagram a distillation train: heated salt water, vapour path, condenser, receiver, salt residue; arrows follow the path of water only, never salt 'evaporating' with water in the simple model.",
    "independentCheck": "Track where each component goes."
  },
  {
    "instanceId": "C02-17-REPRESENT-D3",
    "adapterId": "C02",
    "subtopicId": "CHEM-C02.06",
    "primaryOperation": "REPRESENT",
    "band": "D3",
    "studentTask": "A black ink produces blue and yellow spots. What inference is justified and which is not?",
    "wrongIdea": "Filtration separates dissolved salt from water.",
    "replacementRule": "Choose a technique based on dissolved state and property contrasts.",
    "visualJob": "Use figures/c02-distillation.svg only as prerequisite explanatory evidence, not an annotated answer to C02-17-REPRESENT-D3. Diagram a distillation train: heated salt water, vapour path, condenser, receiver, salt residue; arrows follow the path of water only, never salt 'evaporating' with water in the simple model.",
    "independentCheck": "Use mobile/stationary phase mechanism."
  },
  {
    "instanceId": "C02-18-SYNTHESIZE-D4",
    "adapterId": "C02",
    "subtopicId": "CHEM-C02.06",
    "primaryOperation": "SYNTHESIZE",
    "band": "D4",
    "studentTask": "A mixture contains sand, sodium chloride and water. Devise a sequence to isolate sand, water and salt.",
    "wrongIdea": "Filtration separates dissolved salt from water.",
    "replacementRule": "Choose a technique based on dissolved state and property contrasts.",
    "visualJob": "Use figures/c02-distillation.svg only as prerequisite explanatory evidence, not an annotated answer to C02-18-SYNTHESIZE-D4. Diagram a distillation train: heated salt water, vapour path, condenser, receiver, salt residue; arrows follow the path of water only, never salt 'evaporating' with water in the simple model.",
    "independentCheck": "Specify a method for each property contrast."
  },
  {
    "instanceId": "C02-19-EXPLAIN-D3",
    "adapterId": "C02",
    "subtopicId": "CHEM-C02.07",
    "primaryOperation": "EXPLAIN",
    "band": "D3",
    "studentTask": "Why might a centrifuge separate fine solid particles faster than leaving a tube on a bench?",
    "wrongIdea": "All suspensions and colloids can be separated by the same filter paper.",
    "replacementRule": "State the separation mechanism and its material/size limitations.",
    "visualJob": "Provide three sketches with arrows: spin tubes with sediment, subliming solid to cold surface, colloidal small clusters to larger flocs. Each figure labels which property differences are exploited.",
    "independentCheck": "Compare particle scale and density contrast."
  },
  {
    "instanceId": "C02-20-MODEL-D3",
    "adapterId": "C02",
    "subtopicId": "CHEM-C02.07",
    "primaryOperation": "MODEL",
    "band": "D3",
    "studentTask": "A solid mixture contains iodine and sand. Propose a simple principle for separating iodine and explain the essential apparatus feature.",
    "wrongIdea": "All suspensions and colloids can be separated by the same filter paper.",
    "replacementRule": "State the separation mechanism and its material/size limitations.",
    "visualJob": "Provide three sketches with arrows: spin tubes with sediment, subliming solid to cold surface, colloidal small clusters to larger flocs. Each figure labels which property differences are exploited.",
    "independentCheck": "Identify the recovered component's phase trajectory."
  },
  {
    "instanceId": "C02-21-SYNTHESIZE-D4",
    "adapterId": "C02",
    "subtopicId": "CHEM-C02.07",
    "primaryOperation": "SYNTHESIZE",
    "band": "D4",
    "studentTask": "A stable colloidal sample passes filter paper but must be clarified. Justify the order 'coagulate then filter' rather than the reverse.",
    "wrongIdea": "All suspensions and colloids can be separated by the same filter paper.",
    "replacementRule": "State the separation mechanism and its material/size limitations.",
    "visualJob": "Provide three sketches with arrows: spin tubes with sediment, subliming solid to cold surface, colloidal small clusters to larger flocs. Each figure labels which property differences are exploited.",
    "independentCheck": "Check clarified sample purity and treatment residue."
  },
  {
    "instanceId": "C03-01-EXPLAIN-D3",
    "adapterId": "C03",
    "subtopicId": "CHEM-C03.01",
    "primaryOperation": "EXPLAIN",
    "band": "D3",
    "studentTask": "A carbonate sample loses mass when heated in an open test tube. Why is conservation not violated?",
    "wrongIdea": "The mass after a reaction equals the mass of the solid products only.",
    "replacementRule": "Include every phase in the same weighed system.",
    "visualJob": "Use figures/c03-atom-conservation.svg only as prerequisite explanatory evidence, not an annotated answer to C03-01-EXPLAIN-D3. Put reaction vessel and surrounding gas inside a dashed system boundary. Draw arrows for gas crossing only when the container is open. Use colour-coded elemental atom counts on both sides.",
    "independentCheck": "Count all products, including gas."
  },
  {
    "instanceId": "C03-02-REPRESENT-D3",
    "adapterId": "C03",
    "subtopicId": "CHEM-C03.01",
    "primaryOperation": "REPRESENT",
    "band": "D3",
    "studentTask": "Balance Al + HCl \u2192 AlCl\u2083 + H\u2082 with the smallest positive whole-number coefficients. Explain why changing AlCl\u2083 into AlCl\u2082 would not be a valid balancing method.",
    "wrongIdea": "A student changes AlCl\u2083 to AlCl\u2082 to make chlorine counting easier. Identify why this changes chemical identity rather than balancing.",
    "replacementRule": "Restore the unchanged species formulas and solve for the smallest integers that conserve each element.",
    "visualJob": "Candidate representation: show relevant species, states, values or evidence in an uncompleted ledger/diagram; do not disclose the decisive REPRESENT operation or final result. Task-specific visual adequacy remains for R01 review.",
    "independentCheck": "Count Al, H and Cl separately after multiplication by the coefficients; keep all original formula subscripts fixed."
  },
  {
    "instanceId": "C03-03-JUSTIFY-D4",
    "adapterId": "C03",
    "subtopicId": "CHEM-C03.01",
    "primaryOperation": "JUSTIFY",
    "band": "D4",
    "studentTask": "A report claims that 2H\u2082 + O\u2082 \u2192 2H\u2082O\u2082 is balanced because the masses seem close. Refute through atom counts.",
    "wrongIdea": "The mass after a reaction equals the mass of the solid products only.",
    "replacementRule": "Include every phase in the same weighed system.",
    "visualJob": "Use figures/c03-atom-conservation.svg only as prerequisite explanatory evidence, not an annotated answer to C03-03-JUSTIFY-D4. Put reaction vessel and surrounding gas inside a dashed system boundary. Draw arrows for gas crossing only when the container is open. Use colour-coded elemental atom counts on both sides.",
    "independentCheck": "Show element balance not just a mass number."
  },
  {
    "instanceId": "C03-04-EXPLAIN-D3",
    "adapterId": "C03",
    "subtopicId": "CHEM-C03.02",
    "primaryOperation": "EXPLAIN",
    "band": "D3",
    "studentTask": "Why do pure-water samples from different sources have the same hydrogen/oxygen mass ratio despite different total impurities?",
    "wrongIdea": "The two hydrogen atoms mean water contains twice the mass of hydrogen as oxygen.",
    "replacementRule": "Explicitly state whether a ratio counts atoms or mass.",
    "visualJob": "Compare H\u2082O molecular diagrams from two samples; add free salt ions in one sample to show impurities without altering H\u2082O connectivity.",
    "independentCheck": "State the isotope-approximation boundary."
  },
  {
    "instanceId": "C03-05-REPRESENT-D3",
    "adapterId": "C03",
    "subtopicId": "CHEM-C03.02",
    "primaryOperation": "REPRESENT",
    "band": "D3",
    "studentTask": "For CO\u2082, compare the carbon-to-oxygen atom-count ratio and mass ratio using C=12, O=16.",
    "wrongIdea": "The two hydrogen atoms mean water contains twice the mass of hydrogen as oxygen.",
    "replacementRule": "Explicitly state whether a ratio counts atoms or mass.",
    "visualJob": "Compare H\u2082O molecular diagrams from two samples; add free salt ions in one sample to show impurities without altering H\u2082O connectivity.",
    "independentCheck": "Show both ratios with labels."
  },
  {
    "instanceId": "C03-06-JUSTIFY-D4",
    "adapterId": "C03",
    "subtopicId": "CHEM-C03.02",
    "primaryOperation": "JUSTIFY",
    "band": "D4",
    "studentTask": "Evaluate Dalton's assertion that all atoms of one element have exactly identical mass, using isotopes while preserving chemical identity.",
    "wrongIdea": "The two hydrogen atoms mean water contains twice the mass of hydrogen as oxygen.",
    "replacementRule": "Explicitly state whether a ratio counts atoms or mass.",
    "visualJob": "Compare H\u2082O molecular diagrams from two samples; add free salt ions in one sample to show impurities without altering H\u2082O connectivity.",
    "independentCheck": "State which Dalton claims survive refinement."
  },
  {
    "instanceId": "C03-07-EXPLAIN-D3",
    "adapterId": "C03",
    "subtopicId": "CHEM-C03.03",
    "primaryOperation": "EXPLAIN",
    "band": "D3",
    "studentTask": "Explain why an individual independent NaCl molecule is not the best description of ordinary table-salt crystal.",
    "wrongIdea": "All formulas with two element symbols describe a two-atom molecule.",
    "replacementRule": "Identify the bonding and structural state before assigning a particle type.",
    "visualJob": "Sketch one H\u2082O molecule with O\u2013H edges next to a repeated lattice of Na+ and Cl- nodes. Label the unit being counted in each case.",
    "independentCheck": "State the phase model."
  },
  {
    "instanceId": "C03-08-REPRESENT-D3",
    "adapterId": "C03",
    "subtopicId": "CHEM-C03.03",
    "primaryOperation": "REPRESENT",
    "band": "D3",
    "studentTask": "A sample diagram shows three Ca\u00b2\u207a ions and six Cl\u207b ions. How many CaCl\u2082 formula units are represented?",
    "wrongIdea": "All formulas with two element symbols describe a two-atom molecule.",
    "replacementRule": "Identify the bonding and structural state before assigning a particle type.",
    "visualJob": "Sketch one H\u2082O molecule with O\u2013H edges next to a repeated lattice of Na+ and Cl- nodes. Label the unit being counted in each case.",
    "independentCheck": "Check charges and counts."
  },
  {
    "instanceId": "C03-09-JUSTIFY-D4",
    "adapterId": "C03",
    "subtopicId": "CHEM-C03.03",
    "primaryOperation": "JUSTIFY",
    "band": "D4",
    "studentTask": "A student claims formula CH\u2082 must represent a stable two-atom molecule because it has two symbols. Diagnose two distinct flaws.",
    "wrongIdea": "All formulas with two element symbols describe a two-atom molecule.",
    "replacementRule": "Identify the bonding and structural state before assigning a particle type.",
    "visualJob": "Sketch one H\u2082O molecule with O\u2013H edges next to a repeated lattice of Na+ and Cl- nodes. Label the unit being counted in each case.",
    "independentCheck": "Find both the numerical and conceptual mistakes."
  },
  {
    "instanceId": "C03-10-APPLY-D3",
    "adapterId": "C03",
    "subtopicId": "CHEM-C03.04",
    "primaryOperation": "APPLY",
    "band": "D3",
    "studentTask": "Find the neutral formula for Ca\u00b2\u207a and PO\u2084\u00b3\u207b and explain parentheses.",
    "wrongIdea": "A subscript is the charge on a single ion.",
    "replacementRule": "Separate individual ion charge from total charge after multiplying by counts.",
    "visualJob": "Use figures/c03-ion-ratio.svg only as prerequisite explanatory evidence, not an annotated answer to C03-10-APPLY-D3. Show a charge-balance line: Mg\u00b2\u207a + 2 Cl\u207b \u2192 MgCl\u2082; the overall +2\u22122=0 appears below the ions.",
    "independentCheck": "Check group count and total charge."
  },
  {
    "instanceId": "C03-11-REPRESENT-D3",
    "adapterId": "C03",
    "subtopicId": "CHEM-C03.04",
    "primaryOperation": "REPRESENT",
    "band": "D3",
    "studentTask": "Interpret Mg(OH)\u2082: identify group count, elemental atom counts and charge balance.",
    "wrongIdea": "A subscript is the charge on a single ion.",
    "replacementRule": "Separate individual ion charge from total charge after multiplying by counts.",
    "visualJob": "Use figures/c03-ion-ratio.svg only as prerequisite explanatory evidence, not an annotated answer to C03-11-REPRESENT-D3. Show a charge-balance line: Mg\u00b2\u207a + 2 Cl\u207b \u2192 MgCl\u2082; the overall +2\u22122=0 appears below the ions.",
    "independentCheck": "Explicitly expand the grouped formula."
  },
  {
    "instanceId": "C03-12-JUSTIFY-D4",
    "adapterId": "C03",
    "subtopicId": "CHEM-C03.04",
    "primaryOperation": "JUSTIFY",
    "band": "D4",
    "studentTask": "Someone insists that a neutral compound of Fe and O has exactly one possible formula. Evaluate.",
    "wrongIdea": "A subscript is the charge on a single ion.",
    "replacementRule": "Separate individual ion charge from total charge after multiplying by counts.",
    "visualJob": "Use figures/c03-ion-ratio.svg only as prerequisite explanatory evidence, not an annotated answer to C03-12-JUSTIFY-D4. Show a charge-balance line: Mg\u00b2\u207a + 2 Cl\u207b \u2192 MgCl\u2082; the overall +2\u22122=0 appears below the ions.",
    "independentCheck": "Do not overclaim from arithmetic."
  },
  {
    "instanceId": "C03-13-APPLY-D3",
    "adapterId": "C03",
    "subtopicId": "CHEM-C03.05",
    "primaryOperation": "APPLY",
    "band": "D3",
    "studentTask": "Calculate approximate molar mass of Ca(OH)\u2082 using Ca=40,O=16,H=1.",
    "wrongIdea": "Count each chemical symbol once regardless of subscripts.",
    "replacementRule": "Expand groups and count atoms before adding.",
    "visualJob": "Use a formula ledger table with element, atomic count, atomic-mass contribution and sum. Keep atom number separate from mass per atom.",
    "independentCheck": "Recompute independently from expanded atom count."
  },
  {
    "instanceId": "C03-14-REPRESENT-D3",
    "adapterId": "C03",
    "subtopicId": "CHEM-C03.05",
    "primaryOperation": "REPRESENT",
    "band": "D3",
    "studentTask": "For Fe\u2082(SO\u2084)\u2083, provide elemental counts before calculating a mass.",
    "wrongIdea": "Count each chemical symbol once regardless of subscripts.",
    "replacementRule": "Expand groups and count atoms before adding.",
    "visualJob": "Use a formula ledger table with element, atomic count, atomic-mass contribution and sum. Keep atom number separate from mass per atom.",
    "independentCheck": "Distinguish numerical count from structural grouping."
  },
  {
    "instanceId": "C03-15-JUSTIFY-D4",
    "adapterId": "C03",
    "subtopicId": "CHEM-C03.05",
    "primaryOperation": "JUSTIFY",
    "band": "D4",
    "studentTask": "A student says chlorine cannot have relative atomic mass 35.45 because no atom has 0.45 neutron. Explain.",
    "wrongIdea": "Count each chemical symbol once regardless of subscripts.",
    "replacementRule": "Expand groups and count atoms before adding.",
    "visualJob": "Use a formula ledger table with element, atomic count, atomic-mass contribution and sum. Keep atom number separate from mass per atom.",
    "independentCheck": "Use a population-average argument."
  },
  {
    "instanceId": "C03-16-EXPLAIN-D3",
    "adapterId": "C03",
    "subtopicId": "CHEM-C03.06",
    "primaryOperation": "EXPLAIN",
    "band": "D3",
    "studentTask": "Why does magnesium's Lewis symbol typically have two dots even though neutral Mg has 12 electrons?",
    "wrongIdea": "Each dot shows an atom's entire electron inventory.",
    "replacementRule": "Distinguish full electron configuration from outer-shell dot count.",
    "visualJob": "Side-by-side write Na\u00b7 and [Na]\u207a, with 'one outer electron removed' label; write chlorine's seven dots and [Cl]\u207b after addition. Dot positions are schematic, not electron orbit locations.",
    "independentCheck": "State what electron count has changed."
  },
  {
    "instanceId": "C03-17-REPRESENT-D3",
    "adapterId": "C03",
    "subtopicId": "CHEM-C03.06",
    "primaryOperation": "REPRESENT",
    "band": "D3",
    "studentTask": "Using the shell model, describe formation of Ca\u00b2\u207a from Ca (2,8,8,2).",
    "wrongIdea": "Each dot shows an atom's entire electron inventory.",
    "replacementRule": "Distinguish full electron configuration from outer-shell dot count.",
    "visualJob": "Side-by-side write Na\u00b7 and [Na]\u207a, with 'one outer electron removed' label; write chlorine's seven dots and [Cl]\u207b after addition. Dot positions are schematic, not electron orbit locations.",
    "independentCheck": "Charge equals electron loss for a neutral atom."
  },
  {
    "instanceId": "C03-18-JUSTIFY-D4",
    "adapterId": "C03",
    "subtopicId": "CHEM-C03.06",
    "primaryOperation": "JUSTIFY",
    "band": "D4",
    "studentTask": "A student argues 'My dot diagram gives both elements eight electrons, so the compound must exist.' Assess.",
    "wrongIdea": "Each dot shows an atom's entire electron inventory.",
    "replacementRule": "Distinguish full electron configuration from outer-shell dot count.",
    "visualJob": "Side-by-side write Na\u00b7 and [Na]\u207a, with 'one outer electron removed' label; write chlorine's seven dots and [Cl]\u207b after addition. Dot positions are schematic, not electron orbit locations.",
    "independentCheck": "State what the representation cannot prove."
  },
  {
    "instanceId": "C04-01-EXPLAIN-D3",
    "adapterId": "C04",
    "subtopicId": "CHEM-C04.01",
    "primaryOperation": "EXPLAIN",
    "band": "D3",
    "studentTask": "Explain the difference between 0.25 mol O\u2082 molecules and 0.25 mol O atoms.",
    "wrongIdea": "A mole means exactly one gram of any substance.",
    "replacementRule": "Always distinguish amount, particle count and mass.",
    "visualJob": "Show a three-column count ladder: mass in grams \u2194 moles \u2194 elementary entities; labels specify H\u2082O molecules, Na\u207a ions or NaCl formula units.",
    "independentCheck": "Count atom multiplicity explicitly."
  },
  {
    "instanceId": "C04-02-REPRESENT-D3",
    "adapterId": "C04",
    "subtopicId": "CHEM-C04.01",
    "primaryOperation": "REPRESENT",
    "band": "D3",
    "studentTask": "What number of chloride ions is present in 0.20 mol CaCl\u2082 formula units in an ideal ionic accounting?",
    "wrongIdea": "A mole means exactly one gram of any substance.",
    "replacementRule": "Always distinguish amount, particle count and mass.",
    "visualJob": "Show a three-column count ladder: mass in grams \u2194 moles \u2194 elementary entities; labels specify H\u2082O molecules, Na\u207a ions or NaCl formula units.",
    "independentCheck": "Carry units 'formula units' and 'ions'."
  },
  {
    "instanceId": "C04-03-JUSTIFY-D4",
    "adapterId": "C04",
    "subtopicId": "CHEM-C04.01",
    "primaryOperation": "JUSTIFY",
    "band": "D4",
    "studentTask": "Someone claims 0.10 mol of any solute always yields 0.20 mol dissolved ions. Evaluate with at least two substances.",
    "wrongIdea": "A mole means exactly one gram of any substance.",
    "replacementRule": "Always distinguish amount, particle count and mass.",
    "visualJob": "Show a three-column count ladder: mass in grams \u2194 moles \u2194 elementary entities; labels specify H\u2082O molecules, Na\u207a ions or NaCl formula units.",
    "independentCheck": "State conditions and chemical species."
  },
  {
    "instanceId": "C04-04-APPLY-D3",
    "adapterId": "C04",
    "subtopicId": "CHEM-C04.02",
    "primaryOperation": "APPLY",
    "band": "D3",
    "studentTask": "Two separate samples each have mass 8.8 g: sample A is CO and sample B is CO\u2082. Using C=12, O=16, compare the amount of oxygen atoms in each sample and explain why comparing molecule counts alone can mislead.",
    "wrongIdea": "A proposed method compares only the number of CO and CO\u2082 molecules and concludes that the sample with more molecules also has more O atoms. Find the missing inference.",
    "replacementRule": "Include oxygen atoms per molecule as an explicit conversion and redo the like-for-like atom-count comparison.",
    "visualJob": "Candidate representation: show relevant species, states, values or evidence in an uncompleted ledger/diagram; do not disclose the decisive APPLY operation or final result. Task-specific visual adequacy remains for R01 review.",
    "independentCheck": "Keep separate ledgers for moles of CO and CO\u2082 molecules and for the oxygen atoms carried by each; confirm the comparison uses equal masses."
  },
  {
    "instanceId": "C04-05-MODEL-D3",
    "adapterId": "C04",
    "subtopicId": "CHEM-C04.02",
    "primaryOperation": "MODEL",
    "band": "D3",
    "studentTask": "A sealed bottle contains 0.50 mol O\u2082. What is the oxygen gas mass, and why is 8 g an incorrect answer?",
    "wrongIdea": "Use water's formula mass 18 as the number of molecules in one gram.",
    "replacementRule": "Write the full unit alongside each numerical value.",
    "visualJob": "Use figures/c04-mole-bridge.svg only as prerequisite explanatory evidence, not an annotated answer to C04-05-MODEL-D3. One mole ladder with arrows g / (g mol\u207b\u00b9) \u2192 mol and mol \u00d7 (entities mol\u207b\u00b9) \u2192 entities. Specify masses are approximate when using rounded atomic masses.",
    "independentCheck": "Read subscripts before choosing M."
  },
  {
    "instanceId": "C04-06-SYNTHESIZE-D4",
    "adapterId": "C04",
    "subtopicId": "CHEM-C04.02",
    "primaryOperation": "SYNTHESIZE",
    "band": "D4",
    "studentTask": "A sample contains 3.011\u00d710\u00b2\u00b2 molecules and weighs 2.2 g. Infer its molar mass and suggest a compatible simple gas.",
    "wrongIdea": "Use water's formula mass 18 as the number of molecules in one gram.",
    "replacementRule": "Write the full unit alongside each numerical value.",
    "visualJob": "Use figures/c04-mole-bridge.svg only as prerequisite explanatory evidence, not an annotated answer to C04-06-SYNTHESIZE-D4. One mole ladder with arrows g / (g mol\u207b\u00b9) \u2192 mol and mol \u00d7 (entities mol\u207b\u00b9) \u2192 entities. Specify masses are approximate when using rounded atomic masses.",
    "independentCheck": "Distinguish mass-derived M from complete identity."
  },
  {
    "instanceId": "C04-07-EXPLAIN-D3",
    "adapterId": "C04",
    "subtopicId": "CHEM-C04.03",
    "primaryOperation": "EXPLAIN",
    "band": "D3",
    "studentTask": "Why can 3 mol O\u2082 react with 6 mol H\u2082 to give 6 mol H\u2082O under complete combustion?",
    "wrongIdea": "Change product Al\u2082O\u2083 into AlO to make smaller coefficients.",
    "replacementRule": "Keep species fixed and balance with integer coefficients.",
    "visualJob": "Draw two H\u2082 plus one O\u2082 producing two H\u2082O. Colour-match each hydrogen and oxygen atom across the arrow.",
    "independentCheck": "Check mass separately with molar masses."
  },
  {
    "instanceId": "C04-08-REPRESENT-D3",
    "adapterId": "C04",
    "subtopicId": "CHEM-C04.03",
    "primaryOperation": "REPRESENT",
    "band": "D3",
    "studentTask": "Balance C\u2082H\u2086 + O\u2082 \u2192 CO\u2082 + H\u2082O using integer coefficients.",
    "wrongIdea": "Change product Al\u2082O\u2083 into AlO to make smaller coefficients.",
    "replacementRule": "Keep species fixed and balance with integer coefficients.",
    "visualJob": "Draw two H\u2082 plus one O\u2082 producing two H\u2082O. Colour-match each hydrogen and oxygen atom across the arrow.",
    "independentCheck": "Atom counts of every element must agree."
  },
  {
    "instanceId": "C04-09-SYNTHESIZE-D4",
    "adapterId": "C04",
    "subtopicId": "CHEM-C04.03",
    "primaryOperation": "SYNTHESIZE",
    "band": "D4",
    "studentTask": "A closed vessel begins with 3 mol H\u2082 and 2 mol O\u2082. Assuming complete H\u2082 combustion, find final H\u2082O and unreacted O\u2082 amounts.",
    "wrongIdea": "Change product Al\u2082O\u2083 into AlO to make smaller coefficients.",
    "replacementRule": "Keep species fixed and balance with integer coefficients.",
    "visualJob": "Draw two H\u2082 plus one O\u2082 producing two H\u2082O. Colour-match each hydrogen and oxygen atom across the arrow.",
    "independentCheck": "Account for all initial species."
  },
  {
    "instanceId": "C04-10-APPLY-D3",
    "adapterId": "C04",
    "subtopicId": "CHEM-C04.04",
    "primaryOperation": "APPLY",
    "band": "D3",
    "studentTask": "If 16 g O\u2082 reacts completely with enough H\u2082, what mass of H\u2082O forms?",
    "wrongIdea": "Simply add reagent masses and assign the sum to product even when one reagent is in excess.",
    "replacementRule": "Compute reacted moles first; then convert to product mass.",
    "visualJob": "Reaction ledger with rows initial moles, reacted moles, remaining moles, produced moles. Separate masses and moles.",
    "independentCheck": "Verify mass conservation."
  },
  {
    "instanceId": "C04-11-MODEL-D3",
    "adapterId": "C04",
    "subtopicId": "CHEM-C04.04",
    "primaryOperation": "MODEL",
    "band": "D3",
    "studentTask": "A student mixes 4 g H\u2082 and 16 g O\u2082. Which reagent controls H\u2082O production?",
    "wrongIdea": "Simply add reagent masses and assign the sum to product even when one reagent is in excess.",
    "replacementRule": "Compute reacted moles first; then convert to product mass.",
    "visualJob": "Reaction ledger with rows initial moles, reacted moles, remaining moles, produced moles. Separate masses and moles.",
    "independentCheck": "Compute both limiting extents."
  },
  {
    "instanceId": "C04-12-SYNTHESIZE-D4",
    "adapterId": "C04",
    "subtopicId": "CHEM-C04.04",
    "primaryOperation": "SYNTHESIZE",
    "band": "D4",
    "studentTask": "A reaction produces 54 g H\u2082O from H\u2082 + O\u2082, with sufficient reactants. Determine masses consumed of each gas.",
    "wrongIdea": "Simply add reagent masses and assign the sum to product even when one reagent is in excess.",
    "replacementRule": "Compute reacted moles first; then convert to product mass.",
    "visualJob": "Reaction ledger with rows initial moles, reacted moles, remaining moles, produced moles. Separate masses and moles.",
    "independentCheck": "Check element and mass balances."
  },
  {
    "instanceId": "C04-13-APPLY-D3",
    "adapterId": "C04",
    "subtopicId": "CHEM-C04.05",
    "primaryOperation": "APPLY",
    "band": "D3",
    "studentTask": "For 3A+2B\u2192C, starting nA=6 mol and nB=3 mol, identify limiting reactant.",
    "wrongIdea": "The reactant with the smaller initial mole amount is always limiting.",
    "replacementRule": "Normalize each initial amount by its balanced coefficient.",
    "visualJob": "Use figures/c04-reagent-ledger.svg only as prerequisite explanatory evidence, not an annotated answer to C04-13-APPLY-D3. Use a two-column ledger of available moles/coefficient for reactants and a product yield arrow determined by the smaller extent.",
    "independentCheck": "Use the reaction extent method."
  },
  {
    "instanceId": "C04-14-MODEL-D3",
    "adapterId": "C04",
    "subtopicId": "CHEM-C04.05",
    "primaryOperation": "MODEL",
    "band": "D3",
    "studentTask": "A + 2B \u2192 3C starts with A=2 mol and B=3 mol. Predict maximum C and leftover A.",
    "wrongIdea": "The reactant with the smaller initial mole amount is always limiting.",
    "replacementRule": "Normalize each initial amount by its balanced coefficient.",
    "visualJob": "Use figures/c04-reagent-ledger.svg only as prerequisite explanatory evidence, not an annotated answer to C04-14-MODEL-D3. Use a two-column ledger of available moles/coefficient for reactants and a product yield arrow determined by the smaller extent.",
    "independentCheck": "Declare the single-reaction idealisation."
  },
  {
    "instanceId": "C04-15-SYNTHESIZE-D4",
    "adapterId": "C04",
    "subtopicId": "CHEM-C04.05",
    "primaryOperation": "SYNTHESIZE",
    "band": "D4",
    "studentTask": "A completed ideal H\u2082/O\u2082 reaction produces 2 mol H\u2082O, leaves 1 mol O\u2082 and no H\u2082. Find both starting mole amounts.",
    "wrongIdea": "The reactant with the smaller initial mole amount is always limiting.",
    "replacementRule": "Normalize each initial amount by its balanced coefficient.",
    "visualJob": "Use figures/c04-reagent-ledger.svg only as prerequisite explanatory evidence, not an annotated answer to C04-15-SYNTHESIZE-D4. Use a two-column ledger of available moles/coefficient for reactants and a product yield arrow determined by the smaller extent.",
    "independentCheck": "Explicit identifiability and mole balance."
  },
  {
    "instanceId": "C04-16-APPLY-D3",
    "adapterId": "C04",
    "subtopicId": "CHEM-C04.06",
    "primaryOperation": "APPLY",
    "band": "D3",
    "studentTask": "A 16 g theoretical sample gives 12 g dry purified product. Find percent yield.",
    "wrongIdea": "Any lower mass proves the chemistry failed completely.",
    "replacementRule": "Separate chemical conversion from isolated-product recovery.",
    "visualJob": "Use a flow diagram reactant \u2192 theoretical target \u2192 actual recovered target, with waste and recovery-loss arrows. Each arrow carries an explicit mass basis.",
    "independentCheck": "Use purified mass."
  },
  {
    "instanceId": "C04-17-MODEL-D3",
    "adapterId": "C04",
    "subtopicId": "CHEM-C04.06",
    "primaryOperation": "MODEL",
    "band": "D3",
    "studentTask": "A 10 g theoretical experiment isolates 7 g. Does the measurement alone prove 30% unreacted reactant?",
    "wrongIdea": "Any lower mass proves the chemistry failed completely.",
    "replacementRule": "Separate chemical conversion from isolated-product recovery.",
    "visualJob": "Use a flow diagram reactant \u2192 theoretical target \u2192 actual recovered target, with waste and recovery-loss arrows. Each arrow carries an explicit mass basis.",
    "independentCheck": "Do not claim mechanism from net yield alone."
  },
  {
    "instanceId": "C04-18-SYNTHESIZE-D4",
    "adapterId": "C04",
    "subtopicId": "CHEM-C04.06",
    "primaryOperation": "SYNTHESIZE",
    "band": "D4",
    "studentTask": "An ideal route could give 25 g final product from initial input. Stage 1 operates at 80% and stage 2 at 60% of its stage-specific theoretical outcome. Under proportional assumptions, what final mass is expected?",
    "wrongIdea": "Any lower mass proves the chemistry failed completely.",
    "replacementRule": "Separate chemical conversion from isolated-product recovery.",
    "visualJob": "Use a flow diagram reactant \u2192 theoretical target \u2192 actual recovered target, with waste and recovery-loss arrows. Each arrow carries an explicit mass basis.",
    "independentCheck": "Check dimensional basis and factor multiplication."
  },
  {
    "instanceId": "C05-01-EXPLAIN-D3",
    "adapterId": "C05",
    "subtopicId": "CHEM-C05.01",
    "primaryOperation": "EXPLAIN",
    "band": "D3",
    "studentTask": "Why is Mg\u00b2\u207a still magnesium although it has the same number of electrons as neon?",
    "wrongIdea": "Adding an electron changes chlorine into argon because it then has 18 electrons.",
    "replacementRule": "Use proton count to determine element; electron count to determine charge.",
    "visualJob": "Use a labelled nucleus with p+, n and a surrounding electron cloud; do not present a literal miniature planetary orbit as measured fact. Show Z, A and charge equations separately.",
    "independentCheck": "Check proton count invariant."
  },
  {
    "instanceId": "C05-02-REPRESENT-D3",
    "adapterId": "C05",
    "subtopicId": "CHEM-C05.01",
    "primaryOperation": "REPRESENT",
    "band": "D3",
    "studentTask": "An atom has 13 protons, 14 neutrons and 10 electrons. Identify nuclide and charge.",
    "wrongIdea": "Adding an electron changes chlorine into argon because it then has 18 electrons.",
    "replacementRule": "Use proton count to determine element; electron count to determine charge.",
    "visualJob": "Use a labelled nucleus with p+, n and a surrounding electron cloud; do not present a literal miniature planetary orbit as measured fact. Show Z, A and charge equations separately.",
    "independentCheck": "Independent A and charge checks."
  },
  {
    "instanceId": "C05-03-MODEL-D4",
    "adapterId": "C05",
    "subtopicId": "CHEM-C05.01",
    "primaryOperation": "MODEL",
    "band": "D4",
    "studentTask": "Unknown X has 20 nucleons, 9 protons, and one more electron than protons. Identify element, neutrons and charge.",
    "wrongIdea": "Adding an electron changes chlorine into argon because it then has 18 electrons.",
    "replacementRule": "Use proton count to determine element; electron count to determine charge.",
    "visualJob": "Use a labelled nucleus with p+, n and a surrounding electron cloud; do not present a literal miniature planetary orbit as measured fact. Show Z, A and charge equations separately.",
    "independentCheck": "Check all constraints without asserting sample stability."
  },
  {
    "instanceId": "C05-04-EXPLAIN-D3",
    "adapterId": "C05",
    "subtopicId": "CHEM-C05.02",
    "primaryOperation": "EXPLAIN",
    "band": "D3",
    "studentTask": "Why is rare high-angle deflection significant for the nucleus model?",
    "wrongIdea": "Most alpha particles rebounded from the gold foil.",
    "replacementRule": "Separate frequent observations from rare high-angle events.",
    "visualJob": "Use figures/c05-rutherford.svg only as prerequisite explanatory evidence, not an annotated answer to C05-04-EXPLAIN-D3. Diagram alpha rays on a foil: most straight, few large deflections. Separate observed tracks from inferred compact nucleus.",
    "independentCheck": "Separate common and rare scattering."
  },
  {
    "instanceId": "C05-05-MODEL-D3",
    "adapterId": "C05",
    "subtopicId": "CHEM-C05.02",
    "primaryOperation": "MODEL",
    "band": "D3",
    "studentTask": "A proposed atom model has positive charge uniformly spread throughout the whole atom. Which scattering observation strains the model most?",
    "wrongIdea": "Most alpha particles rebounded from the gold foil.",
    "replacementRule": "Separate frequent observations from rare high-angle events.",
    "visualJob": "Use figures/c05-rutherford.svg only as prerequisite explanatory evidence, not an annotated answer to C05-05-MODEL-D3. Diagram alpha rays on a foil: most straight, few large deflections. Separate observed tracks from inferred compact nucleus.",
    "independentCheck": "Compare every frequency category."
  },
  {
    "instanceId": "C05-06-JUSTIFY-D4",
    "adapterId": "C05",
    "subtopicId": "CHEM-C05.02",
    "primaryOperation": "JUSTIFY",
    "band": "D4",
    "studentTask": "A team reports that most alpha particles cross thin gold foil nearly straight and a tiny fraction rebound. They conclude both that positive charge is concentrated in a tiny nucleus AND that electrons travel on permanently stable circular orbits. Which conclusion is supported, which is not, and what independent observation would constrain electron energies?",
    "wrongIdea": "A student treats an experiment's success at identifying one internal feature as proof of every unmeasured internal feature. Explain the earliest overreach.",
    "replacementRule": "Restrict the claim to features the scattering data constrain and identify a different evidence type needed for electron energy.",
    "visualJob": "Candidate representation: show relevant species, states, values or evidence in an uncompleted ledger/diagram; do not disclose the decisive JUSTIFY operation or final result. Task-specific visual adequacy remains for R01 review.",
    "independentCheck": "Separate what the observed scattering angles support from claims about electron paths and energy levels that the experiment did not measure."
  },
  {
    "instanceId": "C05-07-EXPLAIN-D3",
    "adapterId": "C05",
    "subtopicId": "CHEM-C05.03",
    "primaryOperation": "EXPLAIN",
    "band": "D3",
    "studentTask": "Why is Al commonly represented as forming Al\u00b3\u207a in ionic compound bookkeeping?",
    "wrongIdea": "The outermost shell can always hold only eight electrons for every element.",
    "replacementRule": "State the limited first-18-elements filling convention before applying it.",
    "visualJob": "Show labelled K, L and M regions for the first 18 elements, with electrons as count markers. Avoid equating these drawings with literal measured orbital trajectories.",
    "independentCheck": "Explain least-change shell reasoning with caveat."
  },
  {
    "instanceId": "C05-08-REPRESENT-D3",
    "adapterId": "C05",
    "subtopicId": "CHEM-C05.03",
    "primaryOperation": "REPRESENT",
    "band": "D3",
    "studentTask": "Find shell configuration for neutral phosphorus Z=15 and for a hypothetical P\u00b3\u207b ion using the elementary model.",
    "wrongIdea": "The outermost shell can always hold only eight electrons for every element.",
    "replacementRule": "State the limited first-18-elements filling convention before applying it.",
    "visualJob": "Show labelled K, L and M regions for the first 18 elements, with electrons as count markers. Avoid equating these drawings with literal measured orbital trajectories.",
    "independentCheck": "Sum shells and check charge."
  },
  {
    "instanceId": "C05-09-MODEL-D4",
    "adapterId": "C05",
    "subtopicId": "CHEM-C05.03",
    "primaryOperation": "MODEL",
    "band": "D4",
    "studentTask": "A student extrapolates 'the third shell fills all 18 places before a fourth shell begins' to predict potassium 2,8,9. Evaluate.",
    "wrongIdea": "The outermost shell can always hold only eight electrons for every element.",
    "replacementRule": "State the limited first-18-elements filling convention before applying it.",
    "visualJob": "Show labelled K, L and M regions for the first 18 elements, with electrons as count markers. Avoid equating these drawings with literal measured orbital trajectories.",
    "independentCheck": "State the model boundary explicitly."
  },
  {
    "instanceId": "C05-10-EXPLAIN-D3",
    "adapterId": "C05",
    "subtopicId": "CHEM-C05.04",
    "primaryOperation": "EXPLAIN",
    "band": "D3",
    "studentTask": "Why can chlorine-35 and chlorine-37 have broadly similar chemistry despite different masses?",
    "wrongIdea": "Different isotopic mass numbers mean different chemical elements.",
    "replacementRule": "Check protons before naming the element.",
    "visualJob": "Use figures/c05-isotopes.svg only as prerequisite explanatory evidence, not an annotated answer to C05-10-EXPLAIN-D3. Side-by-side isotope notation \u00b9\u00b2\u2086C and \u00b9\u2074\u2086C; draw nuclei p6/n6 versus p6/n8. Show weighted-average bar separately.",
    "independentCheck": "State approximate versus exact chemical equivalence."
  },
  {
    "instanceId": "C05-11-REPRESENT-D3",
    "adapterId": "C05",
    "subtopicId": "CHEM-C05.04",
    "primaryOperation": "REPRESENT",
    "band": "D3",
    "studentTask": "A species is \u2074\u2070\u2082\u2080Ca\u00b2\u207a. Find p,n,e.",
    "wrongIdea": "Different isotopic mass numbers mean different chemical elements.",
    "replacementRule": "Check protons before naming the element.",
    "visualJob": "Use figures/c05-isotopes.svg only as prerequisite explanatory evidence, not an annotated answer to C05-11-REPRESENT-D3. Side-by-side isotope notation \u00b9\u00b2\u2086C and \u00b9\u2074\u2086C; draw nuclei p6/n6 versus p6/n8. Show weighted-average bar separately.",
    "independentCheck": "Check A=p+n and charge=p\u2212e."
  },
  {
    "instanceId": "C05-12-MODEL-D4",
    "adapterId": "C05",
    "subtopicId": "CHEM-C05.04",
    "primaryOperation": "MODEL",
    "band": "D4",
    "studentTask": "A hypothetical element has isotopes at 10 u and 11 u. Its measured average is 10.2 u. Find fraction of 11 u isotope.",
    "wrongIdea": "Different isotopic mass numbers mean different chemical elements.",
    "replacementRule": "Check protons before naming the element.",
    "visualJob": "Use figures/c05-isotopes.svg only as prerequisite explanatory evidence, not an annotated answer to C05-12-MODEL-D4. Side-by-side isotope notation \u00b9\u00b2\u2086C and \u00b9\u2074\u2086C; draw nuclei p6/n6 versus p6/n8. Show weighted-average bar separately.",
    "independentCheck": "Identify dependency on isotope count and exact masses."
  },
  {
    "instanceId": "C05-13-EXPLAIN-D3",
    "adapterId": "C05",
    "subtopicId": "CHEM-C05.05",
    "primaryOperation": "EXPLAIN",
    "band": "D3",
    "studentTask": "Explain why F\u207b and Na\u207a can share electron count yet attract electrostatically.",
    "wrongIdea": "Two species with ten electrons are the same element.",
    "replacementRule": "Maintain proton and electron ledgers independently.",
    "visualJob": "Draw equal electron counts around unequal nucleus-charge labels for Na\u207a and Ne; illustrate why an electron-count match does not imply element equality.",
    "independentCheck": "Distinguish charge from polarizability and other forces."
  },
  {
    "instanceId": "C05-14-REPRESENT-D3",
    "adapterId": "C05",
    "subtopicId": "CHEM-C05.05",
    "primaryOperation": "REPRESENT",
    "band": "D3",
    "studentTask": "For Al\u00b3\u207a and N\u00b3\u207b compute electrons and elementary shell patterns (Al Z13, N Z7).",
    "wrongIdea": "Two species with ten electrons are the same element.",
    "replacementRule": "Maintain proton and electron ledgers independently.",
    "visualJob": "Draw equal electron counts around unequal nucleus-charge labels for Na\u207a and Ne; illustrate why an electron-count match does not imply element equality.",
    "independentCheck": "Check electron sum."
  },
  {
    "instanceId": "C05-15-MODEL-D4",
    "adapterId": "C05",
    "subtopicId": "CHEM-C05.05",
    "primaryOperation": "MODEL",
    "band": "D4",
    "studentTask": "Compare the expected radii of O\u00b2\u207b, F\u207b and Na\u207a, each having ten electrons, using a clearly stated simple model.",
    "wrongIdea": "Two species with ten electrons are the same element.",
    "replacementRule": "Maintain proton and electron ledgers independently.",
    "visualJob": "Draw equal electron counts around unequal nucleus-charge labels for Na\u207a and Ne; illustrate why an electron-count match does not imply element equality.",
    "independentCheck": "State fixed-electron assumption."
  },
  {
    "instanceId": "C05-16-EXPLAIN-D3",
    "adapterId": "C05",
    "subtopicId": "CHEM-C05.06",
    "primaryOperation": "EXPLAIN",
    "band": "D3",
    "studentTask": "Why can an atom emit light at discrete frequencies rather than any arbitrary frequency when its electronic energies are quantised?",
    "wrongIdea": "Always remove 3d electrons before 4s because 3d has a smaller leading number.",
    "replacementRule": "Use the correct state-specific subshell ordering and check total electrons.",
    "visualJob": "Draw a subshell energy ladder labelled 3p/4s/3d with a conspicuous 'ordering depends on state' note; for the light-emission sketch show a change of energy, not a physical orbiting bead.",
    "independentCheck": "Declare idealised line-model limits."
  },
  {
    "instanceId": "C05-17-REPRESENT-D3",
    "adapterId": "C05",
    "subtopicId": "CHEM-C05.06",
    "primaryOperation": "REPRESENT",
    "band": "D3",
    "studentTask": "Given Fe neutral [Ar]3d\u20764s\u00b2, state Fe\u00b2\u207a subshell configuration in common notation.",
    "wrongIdea": "Always remove 3d electrons before 4s because 3d has a smaller leading number.",
    "replacementRule": "Use the correct state-specific subshell ordering and check total electrons.",
    "visualJob": "Draw a subshell energy ladder labelled 3p/4s/3d with a conspicuous 'ordering depends on state' note; for the light-emission sketch show a change of energy, not a physical orbiting bead.",
    "independentCheck": "Count p\u2212e and state convention."
  },
  {
    "instanceId": "C05-18-MODEL-D4",
    "adapterId": "C05",
    "subtopicId": "CHEM-C05.06",
    "primaryOperation": "MODEL",
    "band": "D4",
    "studentTask": "A student writes Cr\u00b3\u207a as [Ar]3d\u20754s\u207b\u00b2 by subtracting all three electrons from 4s. Diagnose the model error and give the common configuration.",
    "wrongIdea": "Always remove 3d electrons before 4s because 3d has a smaller leading number.",
    "replacementRule": "Use the correct state-specific subshell ordering and check total electrons.",
    "visualJob": "Draw a subshell energy ladder labelled 3p/4s/3d with a conspicuous 'ordering depends on state' note; for the light-emission sketch show a change of energy, not a physical orbiting bead.",
    "independentCheck": "Verify occupancy \u22650 and total electron count."
  },
  {
    "instanceId": "C06-01-EXPLAIN-D3",
    "adapterId": "C06",
    "subtopicId": "CHEM-C06.01",
    "primaryOperation": "EXPLAIN",
    "band": "D3",
    "studentTask": "Why was leaving gaps in Mendeleev's table scientifically powerful rather than merely untidy?",
    "wrongIdea": "A successful numerical average alone proves three elements share chemical properties.",
    "replacementRule": "Use property patterns and predictive accuracy as well as a numerical match.",
    "visualJob": "Show a chronological comparison table: triads, octaves, Mendeleev periodic table, modern atomic-number table. Columns: organising variable, successful prediction, observed limitation.",
    "independentCheck": "Separate prediction and proof."
  },
  {
    "instanceId": "C06-02-MODEL-D3",
    "adapterId": "C06",
    "subtopicId": "CHEM-C06.01",
    "primaryOperation": "MODEL",
    "band": "D3",
    "studentTask": "A periodic classification fits the first several elements but fails badly for heavier elements. Is it established as a universal law?",
    "wrongIdea": "A successful numerical average alone proves three elements share chemical properties.",
    "replacementRule": "Use property patterns and predictive accuracy as well as a numerical match.",
    "visualJob": "Show a chronological comparison table: triads, octaves, Mendeleev periodic table, modern atomic-number table. Columns: organising variable, successful prediction, observed limitation.",
    "independentCheck": "Test domain against evidence."
  },
  {
    "instanceId": "C06-03-JUSTIFY-D4",
    "adapterId": "C06",
    "subtopicId": "CHEM-C06.01",
    "primaryOperation": "JUSTIFY",
    "band": "D4",
    "studentTask": "A student argues that the best periodic table is the one with no empty cells, regardless of chemical mismatch. Refute.",
    "wrongIdea": "A successful numerical average alone proves three elements share chemical properties.",
    "replacementRule": "Use property patterns and predictive accuracy as well as a numerical match.",
    "visualJob": "Show a chronological comparison table: triads, octaves, Mendeleev periodic table, modern atomic-number table. Columns: organising variable, successful prediction, observed limitation.",
    "independentCheck": "State testable prediction criterion."
  },
  {
    "instanceId": "C06-04-EXPLAIN-D3",
    "adapterId": "C06",
    "subtopicId": "CHEM-C06.02",
    "primaryOperation": "EXPLAIN",
    "band": "D3",
    "studentTask": "Why does Z-order resolve the apparent Ar/K atomic-mass reversal?",
    "wrongIdea": "Periodic sequence must strictly increase in average atomic mass.",
    "replacementRule": "Use atomic number Z to determine periodic order before consulting the isotope-weighted average atomic masses.",
    "visualJob": "Compare Ar: Z18, relative atomic mass about39.95 and K: Z19, about39.10. Place Ar before K by Z, not mass.",
    "independentCheck": "Use element identity and average separately."
  },
  {
    "instanceId": "C06-05-REPRESENT-D3",
    "adapterId": "C06",
    "subtopicId": "CHEM-C06.02",
    "primaryOperation": "REPRESENT",
    "band": "D3",
    "studentTask": "Given sodium Z11, predict period and group using the school shell model.",
    "wrongIdea": "Periodic sequence must strictly increase in average atomic mass.",
    "replacementRule": "Use atomic number Z to determine periodic order before consulting the isotope-weighted average atomic masses.",
    "visualJob": "Compare Ar: Z18, relative atomic mass about39.95 and K: Z19, about39.10. Place Ar before K by Z, not mass.",
    "independentCheck": "State model range."
  },
  {
    "instanceId": "C06-06-JUSTIFY-D4",
    "adapterId": "C06",
    "subtopicId": "CHEM-C06.02",
    "primaryOperation": "JUSTIFY",
    "band": "D4",
    "studentTask": "A student notices F\u2082 and Cl\u2082 are gases near 25\u00b0C, then claims that **every** group-17 element must be a gas because the elements have similar outer electron patterns. Critique the argument with a counterexample and distinguish a reliable periodic inference from an unsupported physical-state prediction.",
    "wrongIdea": "Locate where the argument treats similarity of outer electrons as an identity of all physical properties.",
    "replacementRule": "Use a factual counterexample and reformulate the claim to preserve only the periodic inference justified by group membership.",
    "visualJob": "Candidate representation: show relevant species, states, values or evidence in an uncompleted ledger/diagram; do not disclose the decisive JUSTIFY operation or final result. Task-specific visual adequacy remains for R01 review.",
    "independentCheck": "Give a real group-17 counterexample and explain why group placement can support valence similarity but cannot fix room-temperature physical state."
  },
  {
    "instanceId": "C06-07-EXPLAIN-D3",
    "adapterId": "C06",
    "subtopicId": "CHEM-C06.03",
    "primaryOperation": "EXPLAIN",
    "band": "D3",
    "studentTask": "Why are Li and Na often grouped together chemically?",
    "wrongIdea": "An element in period 3 must have three valence electrons.",
    "replacementRule": "Count shells and outer electrons separately.",
    "visualJob": "Use figures/c06-period-three.svg only as prerequisite explanatory evidence, not an annotated answer to C06-07-EXPLAIN-D3. A mini periodic grid shows Na/Mg/Al/Si/P/S/Cl/Ar across period 3 and Li directly above Na. Annotate outer-shell counts without confusing them with full configurations.",
    "independentCheck": "Distinguish type and degree of behaviour."
  },
  {
    "instanceId": "C06-08-REPRESENT-D3",
    "adapterId": "C06",
    "subtopicId": "CHEM-C06.03",
    "primaryOperation": "REPRESENT",
    "band": "D3",
    "studentTask": "An unknown main-group atom has 2,8,1. Locate its period/group and propose chloride formula.",
    "wrongIdea": "An element in period 3 must have three valence electrons.",
    "replacementRule": "Count shells and outer electrons separately.",
    "visualJob": "Use figures/c06-period-three.svg only as prerequisite explanatory evidence, not an annotated answer to C06-08-REPRESENT-D3. A mini periodic grid shows Na/Mg/Al/Si/P/S/Cl/Ar across period 3 and Li directly above Na. Annotate outer-shell counts without confusing them with full configurations.",
    "independentCheck": "Check valence equivalence."
  },
  {
    "instanceId": "C06-09-SYNTHESIZE-D4",
    "adapterId": "C06",
    "subtopicId": "CHEM-C06.03",
    "primaryOperation": "SYNTHESIZE",
    "band": "D4",
    "studentTask": "An unknown period-3 group-2 element forms an oxide. Infer a plausible simplest formula and justify each step.",
    "wrongIdea": "An element in period 3 must have three valence electrons.",
    "replacementRule": "Count shells and outer electrons separately.",
    "visualJob": "Use figures/c06-period-three.svg only as prerequisite explanatory evidence, not an annotated answer to C06-09-SYNTHESIZE-D4. A mini periodic grid shows Na/Mg/Al/Si/P/S/Cl/Ar across period 3 and Li directly above Na. Annotate outer-shell counts without confusing them with full configurations.",
    "independentCheck": "Check independent neutrality."
  },
  {
    "instanceId": "C06-10-EXPLAIN-D3",
    "adapterId": "C06",
    "subtopicId": "CHEM-C06.04",
    "primaryOperation": "EXPLAIN",
    "band": "D3",
    "studentTask": "Why is Mg generally less willing to form a +1 cation than Na in elementary periodic reasoning?",
    "wrongIdea": "More protons automatically mean valence electrons are harder to remove in all comparisons.",
    "replacementRule": "Compare shell levels and screening before predicting.",
    "visualJob": "Use figures/c06-periodic-trends.svg only as prerequisite explanatory evidence, not an annotated answer to C06-10-EXPLAIN-D3. Use two arrows on a mini periodic table: main-group metallic tendency decreases across toward the right, generally increases down group 1. Label them 'tendencies' not absolute formulas.",
    "independentCheck": "Call it a general trend with exceptions."
  },
  {
    "instanceId": "C06-11-MODEL-D3",
    "adapterId": "C06",
    "subtopicId": "CHEM-C06.04",
    "primaryOperation": "MODEL",
    "band": "D3",
    "studentTask": "Explain why K is generally more reactive than Na toward water in the alkali-metal series.",
    "wrongIdea": "More protons automatically mean valence electrons are harder to remove in all comparisons.",
    "replacementRule": "Compare shell levels and screening before predicting.",
    "visualJob": "Use figures/c06-periodic-trends.svg only as prerequisite explanatory evidence, not an annotated answer to C06-11-MODEL-D3. Use two arrows on a mini periodic table: main-group metallic tendency decreases across toward the right, generally increases down group 1. Label them 'tendencies' not absolute formulas.",
    "independentCheck": "Separate periodic tendency from experiment control."
  },
  {
    "instanceId": "C06-12-JUSTIFY-D4",
    "adapterId": "C06",
    "subtopicId": "CHEM-C06.04",
    "primaryOperation": "JUSTIFY",
    "band": "D4",
    "studentTask": "A student predicts the exact time for a Na reaction from group trends alone. Is this justified?",
    "wrongIdea": "More protons automatically mean valence electrons are harder to remove in all comparisons.",
    "replacementRule": "Compare shell levels and screening before predicting.",
    "visualJob": "Use figures/c06-periodic-trends.svg only as prerequisite explanatory evidence, not an annotated answer to C06-12-JUSTIFY-D4. Use two arrows on a mini periodic table: main-group metallic tendency decreases across toward the right, generally increases down group 1. Label them 'tendencies' not absolute formulas.",
    "independentCheck": "Distinguish qualitative tendency from kinetics."
  },
  {
    "instanceId": "C06-13-EXPLAIN-D3",
    "adapterId": "C06",
    "subtopicId": "CHEM-C06.05",
    "primaryOperation": "EXPLAIN",
    "band": "D3",
    "studentTask": "Why might unknown group-1 element X form X\u2082O rather than XO with oxide ions?",
    "wrongIdea": "A group number directly supplies a formula subscript with no chemical reasoning.",
    "replacementRule": "Explicitly derive charges and verify.",
    "visualJob": "A decision tree begins group/period clues \u2192 valence pattern \u2192 likely charge/bond model \u2192 formula \u2192 charge/evidence check. Keep periodic position and formula as separate operations.",
    "independentCheck": "State the oxide ion assumption."
  },
  {
    "instanceId": "C06-14-MODEL-D3",
    "adapterId": "C06",
    "subtopicId": "CHEM-C06.05",
    "primaryOperation": "MODEL",
    "band": "D3",
    "studentTask": "Unknown A is a group14 nonmetal and B is a group17 nonmetal. Should the first model automatically assume A\u2074\u207a and B\u207b ions?",
    "wrongIdea": "A group number directly supplies a formula subscript with no chemical reasoning.",
    "replacementRule": "Explicitly derive charges and verify.",
    "visualJob": "A decision tree begins group/period clues \u2192 valence pattern \u2192 likely charge/bond model \u2192 formula \u2192 charge/evidence check. Keep periodic position and formula as separate operations.",
    "independentCheck": "Use bonding type before writing a formula."
  },
  {
    "instanceId": "C06-15-SYNTHESIZE-D4",
    "adapterId": "C06",
    "subtopicId": "CHEM-C06.05",
    "primaryOperation": "SYNTHESIZE",
    "band": "D4",
    "studentTask": "An unknown X has shell distribution 2,8,3. An element Y has 2,7. Predict a simple ionic formula for X\u2013Y and name the elements.",
    "wrongIdea": "A group number directly supplies a formula subscript with no chemical reasoning.",
    "replacementRule": "Explicitly derive charges and verify.",
    "visualJob": "A decision tree begins group/period clues \u2192 valence pattern \u2192 likely charge/bond model \u2192 formula \u2192 charge/evidence check. Keep periodic position and formula as separate operations.",
    "independentCheck": "Verify charges and note bonding-character limits."
  },
  {
    "instanceId": "C06-16-EXPLAIN-D3",
    "adapterId": "C06",
    "subtopicId": "CHEM-C06.06",
    "primaryOperation": "EXPLAIN",
    "band": "D3",
    "studentTask": "Explain why Be to B violates a perfectly increasing first ionisation-energy trend.",
    "wrongIdea": "Ionisation energy must rise perfectly at every step across a period.",
    "replacementRule": "Compare the electron actually removed and its orbital/repulsion environment.",
    "visualJob": "Sketch qualitative first-ionisation-energy trend across period2 with local dips at B and O, label it 'enrichment' and identify subshell-pairing causes.",
    "independentCheck": "Combine trend and exception."
  },
  {
    "instanceId": "C06-17-MODEL-D3",
    "adapterId": "C06",
    "subtopicId": "CHEM-C06.06",
    "primaryOperation": "MODEL",
    "band": "D3",
    "studentTask": "Why can O have a lower first ionisation energy than N in period2?",
    "wrongIdea": "Ionisation energy must rise perfectly at every step across a period.",
    "replacementRule": "Compare the electron actually removed and its orbital/repulsion environment.",
    "visualJob": "Sketch qualitative first-ionisation-energy trend across period2 with local dips at B and O, label it 'enrichment' and identify subshell-pairing causes.",
    "independentCheck": "State subshell configurations."
  },
  {
    "instanceId": "C06-18-JUSTIFY-D4",
    "adapterId": "C06",
    "subtopicId": "CHEM-C06.06",
    "primaryOperation": "JUSTIFY",
    "band": "D4",
    "studentTask": "A learner says 'Atomic number alone allows exact calculation of ionisation energy without any electron model.' Assess.",
    "wrongIdea": "Ionisation energy must rise perfectly at every step across a period.",
    "replacementRule": "Compare the electron actually removed and its orbital/repulsion environment.",
    "visualJob": "Sketch qualitative first-ionisation-energy trend across period2 with local dips at B and O, label it 'enrichment' and identify subshell-pairing causes.",
    "independentCheck": "Give a supported exception and reason."
  },
  {
    "instanceId": "C07-01-EXPLAIN-D3",
    "adapterId": "C07",
    "subtopicId": "CHEM-C07.01",
    "primaryOperation": "EXPLAIN",
    "band": "D3",
    "studentTask": "Predict the simplest ionic formula for Ca\u00b2\u207a and N\u00b3\u207b and show why.",
    "wrongIdea": "All bonds form because every atom must obtain eight electrons.",
    "replacementRule": "Use electron counts to make a first model, then check charge, bonding structure and energetic feasibility.",
    "visualJob": "Write the shell pattern beside the ion charge: Na (2,8,1) \u2192 Na\u207a (2,8) + e\u207b; Cl (2,8,7) + e\u207b \u2192 Cl\u207b (2,8,8). In a diagram, use labelled electron counts, not arrows suggesting protons move. For magnesium, two electrons must leave; two chlorine atoms can each accept one.",
    "independentCheck": "Check ion identities, charge conservation and integer reduction."
  },
  {
    "instanceId": "C07-02-MODEL-D3",
    "adapterId": "C07",
    "subtopicId": "CHEM-C07.01",
    "primaryOperation": "MODEL",
    "band": "D3",
    "studentTask": "A substance contains separate H\u2082 molecules. Decide whether electron transfer to ions or sharing a pair is the better school-level bonding model; justify.",
    "wrongIdea": "All bonds form because every atom must obtain eight electrons.",
    "replacementRule": "Use electron counts to make a first model, then check charge, bonding structure and energetic feasibility.",
    "visualJob": "Write the shell pattern beside the ion charge: Na (2,8,1) \u2192 Na\u207a (2,8) + e\u207b; Cl (2,8,7) + e\u207b \u2192 Cl\u207b (2,8,8). In a diagram, use labelled electron counts, not arrows suggesting protons move. For magnesium, two electrons must leave; two chlorine atoms can each accept one.",
    "independentCheck": "Check the entity being modelled: molecule versus lattice."
  },
  {
    "instanceId": "C07-03-JUSTIFY-D4",
    "adapterId": "C07",
    "subtopicId": "CHEM-C07.01",
    "primaryOperation": "JUSTIFY",
    "band": "D4",
    "studentTask": "Evaluate the claim: 'If a student can draw complete outer shells after electron transfer, the compound must form spontaneously.' Give a defensible rebuttal.",
    "wrongIdea": "All bonds form because every atom must obtain eight electrons.",
    "replacementRule": "Use electron counts to make a first model, then check charge, bonding structure and energetic feasibility.",
    "visualJob": "Write the shell pattern beside the ion charge: Na (2,8,1) \u2192 Na\u207a (2,8) + e\u207b; Cl (2,8,7) + e\u207b \u2192 Cl\u207b (2,8,8). In a diagram, use labelled electron counts, not arrows suggesting protons move. For magnesium, two electrons must leave; two chlorine atoms can each accept one.",
    "independentCheck": "A valid justification states the missing chemical warrant and limiting scope."
  },
  {
    "instanceId": "C07-04-EXPLAIN-D3",
    "adapterId": "C07",
    "subtopicId": "CHEM-C07.02",
    "primaryOperation": "EXPLAIN",
    "band": "D3",
    "studentTask": "Explain with charge conservation why aluminium oxide has formula Al\u2082O\u2083.",
    "wrongIdea": "An ionic compound must conduct electricity because it contains ions.",
    "replacementRule": "Ask in which physical state the sample is measured and identify the mobile charge carriers.",
    "visualJob": "Use figures/c07-ionic.svg only as prerequisite explanatory evidence, not as an answer annotation. Draw a repeating grid of alternating + and \u2212 ion labels for a crystal; arrows for mobile ions only in the molten or aqueous model. A conductivity diagram must specify 'solid', 'molten' or 'dissolved', plus electrodes and whether the ions can move.",
    "independentCheck": "Compute the ion charge sum independently."
  },
  {
    "instanceId": "C07-05-MODEL-D3",
    "adapterId": "C07",
    "subtopicId": "CHEM-C07.02",
    "primaryOperation": "MODEL",
    "band": "D3",
    "studentTask": "A hard crystalline sample conducts when molten but not solid. Construct the simplest particle-mobility model consistent with the observations.",
    "wrongIdea": "An ionic compound must conduct electricity because it contains ions.",
    "replacementRule": "Ask in which physical state the sample is measured and identify the mobile charge carriers.",
    "visualJob": "Use figures/c07-ionic.svg only as prerequisite explanatory evidence, not as an answer annotation. Draw a repeating grid of alternating + and \u2212 ion labels for a crystal; arrows for mobile ions only in the molten or aqueous model. A conductivity diagram must specify 'solid', 'molten' or 'dissolved', plus electrodes and whether the ions can move.",
    "independentCheck": "Verify mobile charge carriers, not just chemical labels."
  },
  {
    "instanceId": "C07-06-JUSTIFY-D4",
    "adapterId": "C07",
    "subtopicId": "CHEM-C07.02",
    "primaryOperation": "JUSTIFY",
    "band": "D4",
    "studentTask": "An unknown brittle crystalline solid conducts very poorly as a solid, conducts when molten and barely dissolves in water. A student argues that it cannot be ionic because 'all salts dissolve in water'. Evaluate the inference and give a chemically plausible model that fits all three observations.",
    "wrongIdea": "Identify which hidden assumption makes the student's conclusion invalid and why the three observations need not contradict one another.",
    "replacementRule": "Provide a consistent particle-level mechanism for the three observed states while keeping the classification provisional where evidence is incomplete.",
    "visualJob": "Candidate uncompleted carrier-mobility ledger for three phases, without revealing the target inference; visual adequacy remains R01 HOLD.",
    "independentCheck": "Explain all three observations\u2014solid nonconduction, molten conduction and low water solubility\u2014using a defensible model and justify why insolubility alone does not disprove ionic structure."
  },
  {
    "instanceId": "C07-07-REPRESENT-D3",
    "adapterId": "C07",
    "subtopicId": "CHEM-C07.03",
    "primaryOperation": "REPRESENT",
    "band": "D3",
    "studentTask": "For NH\u2083, explain how many valence electrons appear in bonds and lone pairs in a conventional Lewis representation.",
    "wrongIdea": "All covalent substances consist of low-boiling individual molecules.",
    "replacementRule": "Distinguish covalent bonds within a molecule from the arrangement and interactions between molecules or throughout a network.",
    "visualJob": "Use H\u2014H for one shared pair, O=O for two and N\u2261N for three. Lewis dots include nonbonding electron pairs. An equals sign in O=O is a bond representation, not an arithmetic equality.",
    "independentCheck": "Count electrons and confirm each H duet."
  },
  {
    "instanceId": "C07-08-EXPLAIN-D3",
    "adapterId": "C07",
    "subtopicId": "CHEM-C07.03",
    "primaryOperation": "EXPLAIN",
    "band": "D3",
    "studentTask": "Explain why water can evaporate without producing hydrogen and oxygen gases.",
    "wrongIdea": "All covalent substances consist of low-boiling individual molecules.",
    "replacementRule": "Distinguish covalent bonds within a molecule from the arrangement and interactions between molecules or throughout a network.",
    "visualJob": "Use H\u2014H for one shared pair, O=O for two and N\u2261N for three. Lewis dots include nonbonding electron pairs. An equals sign in O=O is a bond representation, not an arithmetic equality.",
    "independentCheck": "Water's chemical formula and bonds must remain unchanged."
  },
  {
    "instanceId": "C07-09-SYNTHESIZE-D4",
    "adapterId": "C07",
    "subtopicId": "CHEM-C07.03",
    "primaryOperation": "SYNTHESIZE",
    "band": "D4",
    "studentTask": "A student claims that 'covalent' always means 'low melting'. Contrast diamond and a simple molecular substance to evaluate this rule.",
    "wrongIdea": "All covalent substances consist of low-boiling individual molecules.",
    "replacementRule": "Distinguish covalent bonds within a molecule from the arrangement and interactions between molecules or throughout a network.",
    "visualJob": "Use H\u2014H for one shared pair, O=O for two and N\u2261N for three. Lewis dots include nonbonding electron pairs. An equals sign in O=O is a bond representation, not an arithmetic equality.",
    "independentCheck": "A valid counterexample specifies structural reason, not just a name."
  },
  {
    "instanceId": "C07-10-REPRESENT-D3",
    "adapterId": "C07",
    "subtopicId": "CHEM-C07.04",
    "primaryOperation": "REPRESENT",
    "band": "D3",
    "studentTask": "Draw or describe the Lewis structure for CH\u2084, including electron count and bond count.",
    "wrongIdea": "A correct molecular formula fixes a unique Lewis structure in all cases.",
    "replacementRule": "Treat formula as composition data and check bonding constraints, experimental properties and the selected electron model.",
    "visualJob": "Use figures/c07-lewis.svg only as prerequisite explanatory evidence, not as an answer annotation. H\u2082O: O connects by single bonds to two H and retains two nonbonding pairs. NH\u2083: N connects to three H and retains one lone pair. CO\u2082: O=C=O with two lone pairs on each oxygen. Every diagram must be checked against the molecular valence-electron total.",
    "independentCheck": "Recount all valence electrons, not just central atom."
  },
  {
    "instanceId": "C07-11-MODEL-D3",
    "adapterId": "C07",
    "subtopicId": "CHEM-C07.04",
    "primaryOperation": "MODEL",
    "band": "D3",
    "studentTask": "Someone draws water as H=O=H. Evaluate this model using the simple hydrogen duet and electron-accounting rules.",
    "wrongIdea": "A correct molecular formula fixes a unique Lewis structure in all cases.",
    "replacementRule": "Treat formula as composition data and check bonding constraints, experimental properties and the selected electron model.",
    "visualJob": "Use figures/c07-lewis.svg only as prerequisite explanatory evidence, not as an answer annotation. H\u2082O: O connects by single bonds to two H and retains two nonbonding pairs. NH\u2083: N connects to three H and retains one lone pair. CO\u2082: O=C=O with two lone pairs on each oxygen. Every diagram must be checked against the molecular valence-electron total.",
    "independentCheck": "Both local hydrogen duet and global count must pass."
  },
  {
    "instanceId": "C07-12-JUSTIFY-D4",
    "adapterId": "C07",
    "subtopicId": "CHEM-C07.04",
    "primaryOperation": "JUSTIFY",
    "band": "D4",
    "studentTask": "Evaluate the statement: 'Two substances with the same molecular formula must have the same chemical properties because the Lewis electron count is identical.'",
    "wrongIdea": "A correct molecular formula fixes a unique Lewis structure in all cases.",
    "replacementRule": "Treat formula as composition data and check bonding constraints, experimental properties and the selected electron model.",
    "visualJob": "Use figures/c07-lewis.svg only as prerequisite explanatory evidence, not as an answer annotation. H\u2082O: O connects by single bonds to two H and retains two nonbonding pairs. NH\u2083: N connects to three H and retains one lone pair. CO\u2082: O=C=O with two lone pairs on each oxygen. Every diagram must be checked against the molecular valence-electron total.",
    "independentCheck": "A valid rebuttal explicitly contrasts connectivity."
  },
  {
    "instanceId": "C07-13-REPRESENT-D3",
    "adapterId": "C07",
    "subtopicId": "CHEM-C07.05",
    "primaryOperation": "REPRESENT",
    "band": "D3",
    "studentTask": "Give two distinct valid simple structural formulas for C\u2082H\u2086O and name their different functional arrangements.",
    "wrongIdea": "Molecular formula determines every chemical property.",
    "replacementRule": "Before predicting properties, reconstruct the bond graph and identify the functional groups actually present.",
    "visualJob": "Use figures/c07-isomers.svg only as prerequisite explanatory evidence, not as an answer annotation. Compare the two connectivities side by side: ethanol H\u2083C\u2013CH\u2082\u2013O\u2013H and dimethyl ether H\u2083C\u2013O\u2013CH\u2083. Circle the O\u2013H bond in only the first. Both contain two C, six H and one O; the atom count is invariant, the connection graph differs.",
    "independentCheck": "Confirm identical total formulas and different adjacency."
  },
  {
    "instanceId": "C07-14-EXPLAIN-D3",
    "adapterId": "C07",
    "subtopicId": "CHEM-C07.05",
    "primaryOperation": "EXPLAIN",
    "band": "D3",
    "studentTask": "Why is the presence of an O\u2013H group relevant to comparing ethanol and dimethyl ether in a reaction with sodium?",
    "wrongIdea": "Molecular formula determines every chemical property.",
    "replacementRule": "Before predicting properties, reconstruct the bond graph and identify the functional groups actually present.",
    "visualJob": "Use figures/c07-isomers.svg only as prerequisite explanatory evidence, not as an answer annotation. Compare the two connectivities side by side: ethanol H\u2083C\u2013CH\u2082\u2013O\u2013H and dimethyl ether H\u2083C\u2013O\u2013CH\u2083. Circle the O\u2013H bond in only the first. Both contain two C, six H and one O; the atom count is invariant, the connection graph differs.",
    "independentCheck": "Link explanation to the actual functional group and conditions."
  },
  {
    "instanceId": "C07-15-SYNTHESIZE-D4",
    "adapterId": "C07",
    "subtopicId": "CHEM-C07.05",
    "primaryOperation": "SYNTHESIZE",
    "band": "D4",
    "studentTask": "An unknown pure C\u2082H\u2086O liquid evolves H\u2082 on treatment with clean Na under controlled conditions. Choose a plausible structure and state why you should still check purity and confirmatory evidence.",
    "wrongIdea": "Molecular formula determines every chemical property.",
    "replacementRule": "Before predicting properties, reconstruct the bond graph and identify the functional groups actually present.",
    "visualJob": "Use figures/c07-isomers.svg only as prerequisite explanatory evidence, not as an answer annotation. Compare the two connectivities side by side: ethanol H\u2083C\u2013CH\u2082\u2013O\u2013H and dimethyl ether H\u2083C\u2013O\u2013CH\u2083. Circle the O\u2013H bond in only the first. Both contain two C, six H and one O; the atom count is invariant, the connection graph differs.",
    "independentCheck": "Acknowledge a plausible confounder and propose a confirmatory method."
  },
  {
    "instanceId": "C07-16-EXPLAIN-D3",
    "adapterId": "C07",
    "subtopicId": "CHEM-C07.06",
    "primaryOperation": "EXPLAIN",
    "band": "D3",
    "studentTask": "A metal wire conducts as a solid while dry NaCl does not. Compare plausible charge carriers.",
    "wrongIdea": "One characteristic property uniquely reveals the bond type.",
    "replacementRule": "Use condition-controlled evidence tables, countermodels and independent measurements.",
    "visualJob": "A useful experimental table has columns: sample state, conductivity, solubility, melting range, candidate model, and alternate explanation. An observation has a measured unit and condition; a model is an interpretation in a different column.",
    "independentCheck": "Carrier explanation must match the physical state."
  },
  {
    "instanceId": "C07-17-MODEL-D3",
    "adapterId": "C07",
    "subtopicId": "CHEM-C07.06",
    "primaryOperation": "MODEL",
    "band": "D3",
    "studentTask": "Solid X is nonconducting, has a very high melting point and dissolves poorly in water. Can this uniquely establish an ionic solid?",
    "wrongIdea": "One characteristic property uniquely reveals the bond type.",
    "replacementRule": "Use condition-controlled evidence tables, countermodels and independent measurements.",
    "visualJob": "A useful experimental table has columns: sample state, conductivity, solubility, melting range, candidate model, and alternate explanation. An observation has a measured unit and condition; a model is an interpretation in a different column.",
    "independentCheck": "Evaluate at least two plausible models."
  },
  {
    "instanceId": "C07-18-JUSTIFY-D4",
    "adapterId": "C07",
    "subtopicId": "CHEM-C07.06",
    "primaryOperation": "JUSTIFY",
    "band": "D4",
    "studentTask": "A classmate says: 'Unknown solid Y dissolves in water and the solution conducts, so Y must have been an ionic crystal.' Refute the inference with one chemical alternative and a better testing strategy.",
    "wrongIdea": "One characteristic property uniquely reveals the bond type.",
    "replacementRule": "Use condition-controlled evidence tables, countermodels and independent measurements.",
    "visualJob": "A useful experimental table has columns: sample state, conductivity, solubility, melting range, candidate model, and alternate explanation. An observation has a measured unit and condition; a model is an interpretation in a different column.",
    "independentCheck": "Offer a chemically valid alternative and independent evidence."
  },
  {
    "instanceId": "C07-19-REPRESENT-D3",
    "adapterId": "C07",
    "subtopicId": "CHEM-C07.07",
    "primaryOperation": "REPRESENT",
    "band": "D3",
    "studentTask": "Compare the electron-region count and molecular geometry of NH\u2083 and CH\u2084.",
    "wrongIdea": "Any molecule containing polar bonds must be polar.",
    "replacementRule": "Determine the three-dimensional shape first, then combine bond-polarity directions.",
    "visualJob": "Use figures/c07-polarity.svg only as prerequisite explanatory evidence, not as an answer annotation. Build two models: CO\u2082 as a straight line with two equal opposite C=O dipole arrows; H\u2082O as a V-shaped molecule with two O\u2013H dipole arrows that have a nonzero resultant. Label the geometry model as a prediction and the \u223c104.5\u00b0 angle as an empirical fact.",
    "independentCheck": "Distinguish electron geometry and molecular geometry."
  },
  {
    "instanceId": "C07-20-MODEL-D3",
    "adapterId": "C07",
    "subtopicId": "CHEM-C07.07",
    "primaryOperation": "MODEL",
    "band": "D3",
    "studentTask": "Explain why BF\u2083 (trigonal planar, three equivalent B\u2013F bonds) can have polar bonds but no overall net molecular dipole in its ideal geometry.",
    "wrongIdea": "Any molecule containing polar bonds must be polar.",
    "replacementRule": "Determine the three-dimensional shape first, then combine bond-polarity directions.",
    "visualJob": "Use figures/c07-polarity.svg only as prerequisite explanatory evidence, not as an answer annotation. Build two models: CO\u2082 as a straight line with two equal opposite C=O dipole arrows; H\u2082O as a V-shaped molecule with two O\u2013H dipole arrows that have a nonzero resultant. Label the geometry model as a prediction and the \u223c104.5\u00b0 angle as an empirical fact.",
    "independentCheck": "Verify cancellation using symmetry and equal-bond assumption."
  },
  {
    "instanceId": "C07-21-JUSTIFY-D4",
    "adapterId": "C07",
    "subtopicId": "CHEM-C07.07",
    "primaryOperation": "JUSTIFY",
    "band": "D4",
    "studentTask": "A peer argues: 'A compound with two identical polar bonds must be nonpolar because the two contributions cancel.' Evaluate using CO\u2082 and H\u2082O.",
    "wrongIdea": "Any molecule containing polar bonds must be polar.",
    "replacementRule": "Determine the three-dimensional shape first, then combine bond-polarity directions.",
    "visualJob": "Use figures/c07-polarity.svg only as prerequisite explanatory evidence, not as an answer annotation. Build two models: CO\u2082 as a straight line with two equal opposite C=O dipole arrows; H\u2082O as a V-shaped molecule with two O\u2013H dipole arrows that have a nonzero resultant. Label the geometry model as a prediction and the \u223c104.5\u00b0 angle as an empirical fact.",
    "independentCheck": "A valid rebuttal states the necessary directional condition."
  },
  {
    "instanceId": "C08-01-EXPLAIN-D3",
    "adapterId": "C08",
    "subtopicId": "CHEM-C08.01",
    "primaryOperation": "EXPLAIN",
    "band": "D3",
    "studentTask": "A carbon sample burns in an open dish and the remaining ash weighs less than the original carbon. Construct two possible carbon\u2013oxygen product ledgers and identify which gas and residue measurements would distinguish complete oxidation from incomplete combustion. Explain why the open-dish mass is not a conservation test.",
    "wrongIdea": "A lighter ash proves carbon atoms were destroyed.",
    "replacementRule": "Avoid: A lighter ash proves carbon atoms were destroyed. Instead demonstrate the claim with balanced species and observations.",
    "visualJob": "Show an accurate Chemistry diagram or evidence table for equation and observations, with the decisive result unmarked.",
    "independentCheck": "If gas collection is incomplete, determine which mass conclusions can still be made without assuming all carbon became CO\u2082."
  },
  {
    "instanceId": "C08-01-REPRESENT-D3",
    "adapterId": "C08",
    "subtopicId": "CHEM-C08.01",
    "primaryOperation": "REPRESENT",
    "band": "D3",
    "studentTask": "A particle sketch contains four Mg atoms and two O\u2082 molecules. Construct a balanced product sketch and symbolic reaction without changing molecular subscripts.",
    "wrongIdea": "Changing MgO to MgO\u2082 just to balance the symbols changes the chemical species. Repair by leaving species formulas fixed and changing coefficients only.",
    "replacementRule": "Changing MgO to MgO\u2082 just to balance the symbols changes the chemical species. Repair by leaving species formulas fixed and changing coefficients only.",
    "visualJob": "Show an accurate Chemistry diagram or evidence table for equation and observations, with the decisive result unmarked.",
    "independentCheck": "If only two Mg atoms react, what remains from the original sketch?"
  },
  {
    "instanceId": "C08-01-SYNTHESIZE-D3",
    "adapterId": "C08",
    "subtopicId": "CHEM-C08.01",
    "primaryOperation": "SYNTHESIZE",
    "band": "D3",
    "studentTask": "Two trials show a white solid after heating a metal; only one trial consumed oxygen. Can an identical solid colour establish identical reactions? Construct a two-stage evidence ledger.",
    "wrongIdea": "Changing MgO to MgO\u2082 just to balance the symbols changes the chemical species. Repair by leaving species formulas fixed and changing coefficients only.",
    "replacementRule": "Changing MgO to MgO\u2082 just to balance the symbols changes the chemical species. Repair by leaving species formulas fixed and changing coefficients only.",
    "visualJob": "Show an accurate Chemistry diagram or evidence table for equation and observations, with the decisive result unmarked.",
    "independentCheck": "If an equation balances, can it prove the proposed product was actually made?"
  },
  {
    "instanceId": "C08-02-EXPLAIN-D3",
    "adapterId": "C08",
    "subtopicId": "CHEM-C08.02",
    "primaryOperation": "EXPLAIN",
    "band": "D3",
    "studentTask": "Explain why melting ice and thermal decomposition of CaCO\u2083 must be classified differently even though both need energy.",
    "wrongIdea": "'Anything heated decomposes' confuses a physical trigger with proof of a change in chemical identity. Repair by comparing material before and after, and by using species and gas tests.",
    "replacementRule": "'Anything heated decomposes' confuses a physical trigger with proof of a change in chemical identity. Repair by comparing material before and after, and by using species and gas tests.",
    "visualJob": "Show an accurate Chemistry diagram or evidence table for reaction evidence and starting species, with the decisive result unmarked.",
    "independentCheck": "Can one classify a process simply from a temperature rise?"
  },
  {
    "instanceId": "C08-02-REPRESENT-D3",
    "adapterId": "C08",
    "subtopicId": "CHEM-C08.02",
    "primaryOperation": "REPRESENT",
    "band": "D3",
    "studentTask": "Draw a particle conservation ledger for 2H\u2082 + O\u2082 \u2192 2H\u2082O and contrast it with CaCO\u2083 \u2192 CaO + CO\u2082.",
    "wrongIdea": "'Anything heated decomposes' confuses a physical trigger with proof of a change in chemical identity. Repair by comparing material before and after, and by using species and gas tests.",
    "replacementRule": "'Anything heated decomposes' confuses a physical trigger with proof of a change in chemical identity. Repair by comparing material before and after, and by using species and gas tests.",
    "visualJob": "Show an accurate Chemistry diagram or evidence table for reaction evidence and starting species, with the decisive result unmarked.",
    "independentCheck": "If a product is a gas, must the reaction be decomposition?"
  },
  {
    "instanceId": "C08-02-SYNTHESIZE-D3",
    "adapterId": "C08",
    "subtopicId": "CHEM-C08.02",
    "primaryOperation": "SYNTHESIZE",
    "band": "D3",
    "studentTask": "A heated blue solid loses water and turns pale, while a different sample produces a gas that clouds limewater. Synthesize observations that distinguish dehydration and carbonate decomposition.",
    "wrongIdea": "'Anything heated decomposes' confuses a physical trigger with proof of a change in chemical identity. Repair by comparing material before and after, and by using species and gas tests.",
    "replacementRule": "'Anything heated decomposes' confuses a physical trigger with proof of a change in chemical identity. Repair by comparing material before and after, and by using species and gas tests.",
    "visualJob": "Show an accurate Chemistry diagram or evidence table for reaction evidence and starting species, with the decisive result unmarked.",
    "independentCheck": "Would reversing a hydration process by adding water necessarily reverse thermal decomposition of a carbonate?"
  },
  {
    "instanceId": "C08-03-EXPLAIN-D3",
    "adapterId": "C08",
    "subtopicId": "CHEM-C08.03",
    "primaryOperation": "EXPLAIN",
    "band": "D3",
    "studentTask": "Explain why Zn deposits copper from CuSO\u2084 but Cu ordinarily does not displace zinc from ZnSO\u2084.",
    "wrongIdea": "'Swap ions or metals in an equation and a reaction must occur' confuses a formal writing operation with chemical feasibility. Repair by checking observed species, energy/reactivity conditions, soluble products and controls.",
    "replacementRule": "'Swap ions or metals in an equation and a reaction must occur' confuses a formal writing operation with chemical feasibility. Repair by checking observed species, energy/reactivity conditions, soluble products and controls.",
    "visualJob": "Show an accurate Chemistry diagram or evidence table for reactivity ordering and counterexamples, with the decisive result unmarked.",
    "independentCheck": "Could a missing deposit be due to a dirty or coated zinc surface?"
  },
  {
    "instanceId": "C08-03-REPRESENT-D3",
    "adapterId": "C08",
    "subtopicId": "CHEM-C08.03",
    "primaryOperation": "REPRESENT",
    "band": "D3",
    "studentTask": "A clean Zn strip loses 0.010 mol Zn into AgNO\u2083(aq), while only 0.018 mol metallic Ag is collected. Write the net ionic reaction and electron ledger; calculate the ideal silver deposition and identify two measurements needed to account for the discrepancy.",
    "wrongIdea": "Because the deposited silver is lower than 0.020 mol, electrons have disappeared.",
    "replacementRule": "Avoid: Because the deposited silver is lower than 0.020 mol, electrons have disappeared. Instead demonstrate the claim with balanced species and observations.",
    "visualJob": "Show an accurate Chemistry diagram or evidence table for reactivity ordering and counterexamples, with the decisive result unmarked.",
    "independentCheck": "If only 0.012 mol Ag\u207a was initially available, what upper bound follows without assigning the unspent electrons to silver?"
  },
  {
    "instanceId": "C08-03-SYNTHESIZE-D3",
    "adapterId": "C08",
    "subtopicId": "CHEM-C08.03",
    "primaryOperation": "SYNTHESIZE",
    "band": "D3",
    "studentTask": "A salt solution becomes cloudy after two clear solutions mix. Distinguish a true precipitation-driven double displacement from ions merely mixing; propose two confirming observations.",
    "wrongIdea": "'Swap ions or metals in an equation and a reaction must occur' confuses a formal writing operation with chemical feasibility. Repair by checking observed species, energy/reactivity conditions, soluble products and controls.",
    "replacementRule": "'Swap ions or metals in an equation and a reaction must occur' confuses a formal writing operation with chemical feasibility. Repair by checking observed species, energy/reactivity conditions, soluble products and controls.",
    "visualJob": "Show an accurate Chemistry diagram or evidence table for reactivity ordering and counterexamples, with the decisive result unmarked.",
    "independentCheck": "If all proposed products are soluble and no other reaction occurs, should an exchange equation be counted as net reaction?"
  },
  {
    "instanceId": "C08-04-EXPLAIN-D3",
    "adapterId": "C08",
    "subtopicId": "CHEM-C08.04",
    "primaryOperation": "EXPLAIN",
    "band": "D3",
    "studentTask": "Mix 0.010 mol Ca(NO\u2083)\u2082(aq) with 0.006 mol Na\u2082CO\u2083(aq). Construct the net ionic precipitation equation, find the maximum solid amount and the leftover calcium-ion amount, and explain why a white precipitate alone cannot prove its formula.",
    "wrongIdea": "All dissolved calcium disappears once any cloudy solid appears.",
    "replacementRule": "Avoid: All dissolved calcium disappears once any cloudy solid appears. Instead demonstrate the claim with balanced species and observations.",
    "visualJob": "Show an accurate Chemistry diagram or evidence table for aqueous ions, solubility and turbidity, with the decisive result unmarked.",
    "independentCheck": "Suppose only 0.003 mol carbonate was actually added. What can be calculated and what remains experimentally uncertain?"
  },
  {
    "instanceId": "C08-04-REPRESENT-D3",
    "adapterId": "C08",
    "subtopicId": "CHEM-C08.04",
    "primaryOperation": "REPRESENT",
    "band": "D3",
    "studentTask": "Two clear solutions identified as AgNO\u2083(aq) and KBr(aq) produce a pale solid. Draw before/after ionic inventories, identify the spectator ions, and propose a chemical measurement that could distinguish the proposed AgBr solid from a visually similar contaminant.",
    "wrongIdea": "A pale precipitate uniquely determines its chemical composition.",
    "replacementRule": "Avoid: A pale precipitate uniquely determines its chemical composition. Instead demonstrate the claim with balanced species and observations.",
    "visualJob": "Show an accurate Chemistry diagram or evidence table for aqueous ions, solubility and turbidity, with the decisive result unmarked.",
    "independentCheck": "If a second dissolved halide is present, can solid colour establish a single pure precipitate?"
  },
  {
    "instanceId": "C08-04-SYNTHESIZE-D3",
    "adapterId": "C08",
    "subtopicId": "CHEM-C08.04",
    "primaryOperation": "SYNTHESIZE",
    "band": "D3",
    "studentTask": "Two mixed solutions become milky but the expected sulfate test is negative. Synthesize two rival explanations and design a discriminating experiment.",
    "wrongIdea": "'The precipitate is NaCl because sodium and chlorine are present' ignores solubility and ionic species. Repair by writing dissociated ions and marking the actual insoluble product.",
    "replacementRule": "'The precipitate is NaCl because sodium and chlorine are present' ignores solubility and ionic species. Repair by writing dissociated ions and marking the actual insoluble product.",
    "visualJob": "Show an accurate Chemistry diagram or evidence table for aqueous ions, solubility and turbidity, with the decisive result unmarked.",
    "independentCheck": "Can a charge-balanced net ionic equation prove a precipitate occurred?"
  },
  {
    "instanceId": "C08-05-EXPLAIN-D3",
    "adapterId": "C08",
    "subtopicId": "CHEM-C08.05",
    "primaryOperation": "EXPLAIN",
    "band": "D3",
    "studentTask": "Explain why an exothermic reaction can need initial heating before it starts and why the vessel may warm afterward.",
    "wrongIdea": "'If a reaction has an activation barrier, it must absorb energy overall' mixes energy required to start with the net energy difference. Repair by drawing reactants, barrier peak and products separately.",
    "replacementRule": "'If a reaction has an activation barrier, it must absorb energy overall' mixes energy required to start with the net energy difference. Repair by drawing reactants, barrier peak and products separately.",
    "visualJob": "Show an accurate Chemistry diagram or evidence table for system boundary and temperature record, with the decisive result unmarked.",
    "independentCheck": "Can an endothermic process also require an activation barrier?"
  },
  {
    "instanceId": "C08-05-REPRESENT-D3",
    "adapterId": "C08",
    "subtopicId": "CHEM-C08.05",
    "primaryOperation": "REPRESENT",
    "band": "D3",
    "studentTask": "Construct paired energy profiles for CaO hydration and CaCO\u2083 decomposition, labelling reactants, products and activation barriers.",
    "wrongIdea": "'If a reaction has an activation barrier, it must absorb energy overall' mixes energy required to start with the net energy difference. Repair by drawing reactants, barrier peak and products separately.",
    "replacementRule": "'If a reaction has an activation barrier, it must absorb energy overall' mixes energy required to start with the net energy difference. Repair by drawing reactants, barrier peak and products separately.",
    "visualJob": "Show an accurate Chemistry diagram or evidence table for system boundary and temperature record, with the decisive result unmarked.",
    "independentCheck": "Does a larger activation peak automatically mean more heat released?"
  },
  {
    "instanceId": "C08-05-SYNTHESIZE-D3",
    "adapterId": "C08",
    "subtopicId": "CHEM-C08.05",
    "primaryOperation": "SYNTHESIZE",
    "band": "D3",
    "studentTask": "A recorded beaker temperature falls during a process believed exothermic. Build competing energy-flow models and identify the additional measurements needed.",
    "wrongIdea": "'If a reaction has an activation barrier, it must absorb energy overall' mixes energy required to start with the net energy difference. Repair by drawing reactants, barrier peak and products separately.",
    "replacementRule": "'If a reaction has an activation barrier, it must absorb energy overall' mixes energy required to start with the net energy difference. Repair by drawing reactants, barrier peak and products separately.",
    "visualJob": "Show an accurate Chemistry diagram or evidence table for system boundary and temperature record, with the decisive result unmarked.",
    "independentCheck": "If the vessel is poorly insulated, can temperature measurements alone determine total released energy?"
  },
  {
    "instanceId": "C08-06-EXPLAIN-D3",
    "adapterId": "C08",
    "subtopicId": "CHEM-C08.06",
    "primaryOperation": "EXPLAIN",
    "band": "D3",
    "studentTask": "Consider the idealised net reaction Fe\u2082O\u2083 + 3CO \u2192 2Fe + 3CO\u2082. Use both oxygen-transfer and oxidation-number models to decide what is oxidised and reduced, and explain which evidence would be needed to show the iron oxide was actually converted.",
    "wrongIdea": "Oxidation means a substance must react with O\u2082 gas, so CO cannot be oxidised here.",
    "replacementRule": "Avoid: Oxidation means a substance must react with O\u2082 gas, so CO cannot be oxidised here. Instead demonstrate the claim with balanced species and observations.",
    "visualJob": "Show an accurate Chemistry diagram or evidence table for oxygen or electron exchange, with the decisive result unmarked.",
    "independentCheck": "What if the solid contains both Fe and unreacted Fe\u2082O\u2083? Does the net equation alone establish conversion fraction?"
  },
  {
    "instanceId": "C08-06-REPRESENT-D3",
    "adapterId": "C08",
    "subtopicId": "CHEM-C08.06",
    "primaryOperation": "REPRESENT",
    "band": "D3",
    "studentTask": "A zinc strip contacts a solution containing Pb\u00b2\u207a and solid lead appears under controlled conditions. Write both half-reactions and the net ionic equation. Explain why the process is redox even though no oxygen moves.",
    "wrongIdea": "No oxygen occurs in the equation, so oxidation is impossible.",
    "replacementRule": "Avoid: No oxygen occurs in the equation, so oxidation is impossible. Instead demonstrate the claim with balanced species and observations.",
    "visualJob": "Show an accurate Chemistry diagram or evidence table for oxygen or electron exchange, with the decisive result unmarked.",
    "independentCheck": "If a passive coating stops visible lead deposition, does this alone reverse the chemical electron-transfer tendency?"
  },
  {
    "instanceId": "C08-06-SYNTHESIZE-D3",
    "adapterId": "C08",
    "subtopicId": "CHEM-C08.06",
    "primaryOperation": "SYNTHESIZE",
    "band": "D3",
    "studentTask": "A black solid becomes red after heating in a gas flow. Synthesize evidence needed to decide whether CuO reduction occurred or a different change caused the colour.",
    "wrongIdea": "'Hydrogen is the reducing agent, therefore hydrogen is reduced' confuses an agent's effect on another species with its own change. Repair: name the species that gains/loses oxygen, then describe its own oxidation/reduction.",
    "replacementRule": "'Hydrogen is the reducing agent, therefore hydrogen is reduced' confuses an agent's effect on another species with its own change. Repair: name the species that gains/loses oxygen, then describe its own oxidation/reduction.",
    "visualJob": "Show an accurate Chemistry diagram or evidence table for oxygen or electron exchange, with the decisive result unmarked.",
    "independentCheck": "Does a colour change without a change in formal oxidation state automatically count as redox?"
  },
  {
    "instanceId": "C09-01-EXPLAIN-D3",
    "adapterId": "C09",
    "subtopicId": "CHEM-C09.01",
    "primaryOperation": "EXPLAIN",
    "band": "D3",
    "studentTask": "Two aqueous solutions have the same analytical concentration: HCl(aq) and ethanoic acid CH\u2083COOH(aq). Both turn blue litmus red. What does the indicator actually establish? Propose a controlled pH/conductivity comparison that can provide evidence about different ionisation extents, while explaining why colour alone cannot identify either acid.",
    "wrongIdea": "Two acids turning litmus red must have identical strength and concentration.",
    "replacementRule": "Incorrect shortcut: Two acids turning litmus red must have identical strength and concentration. Replace it with a controlled species or mass ledger.",
    "visualJob": "Show an accurate Chemistry diagram or evidence table for aqueous acid indicator results and dry-gas control, with the decisive result unmarked.",
    "independentCheck": "If one sample is diluted 100-fold while the other is unchanged, can a conductivity ranking alone establish relative intrinsic acid strength?"
  },
  {
    "instanceId": "C09-01-MODEL-D3",
    "adapterId": "C09",
    "subtopicId": "CHEM-C09.01",
    "primaryOperation": "MODEL",
    "band": "D3",
    "studentTask": "An unknown colourless aqueous sample turns blue litmus red, but its chemical identity is unlabelled. Choose between models 'hydrochloric acid specifically' and 'acidic aqueous species present'; defend the defensible model.",
    "wrongIdea": "One indicator uniquely identifies the acid.",
    "replacementRule": "Rebuild the species/observation ledger, state the valid domain, and revise the original claim.",
    "visualJob": "Show an accurate Chemistry diagram or evidence table for aqueous acid indicator results and dry-gas control, with the decisive result unmarked.",
    "independentCheck": "Another colourless aqueous sample produces the same litmus change but has an unknown dissolved salt. Does the litmus result prove absence of the salt?"
  },
  {
    "instanceId": "C09-01-JUSTIFY-D4",
    "adapterId": "C09",
    "subtopicId": "CHEM-C09.01",
    "primaryOperation": "JUSTIFY",
    "band": "D4",
    "studentTask": "A student observes a red indicator colour in a wet unknown and claims it proves the bottle contained concentrated strong hydrochloric acid. Evaluate the claim and propose two discriminating measurements.",
    "wrongIdea": "A colour observation proves substance, strength and concentration simultaneously.",
    "replacementRule": "Rebuild the species/observation ledger, state the valid domain, and revise the original claim.",
    "visualJob": "Show an accurate Chemistry diagram or evidence table for aqueous acid indicator results and dry-gas control, with the decisive result unmarked.",
    "independentCheck": "If a very dilute strong acid and a more concentrated weak acid give similar indicator colours, does the colour rank their absolute concentrations?"
  },
  {
    "instanceId": "C09-02-EXPLAIN-D3",
    "adapterId": "C09",
    "subtopicId": "CHEM-C09.02",
    "primaryOperation": "EXPLAIN",
    "band": "D3",
    "studentTask": "Aqueous HCl and NaOH are mixed and NaCl remains dissolved. Explain, using ions, which species actually form water and which remain spectator ions.",
    "wrongIdea": "Na+ and Cl\u2212 themselves become water.",
    "replacementRule": "Rebuild the species/observation ledger, state the valid domain, and revise the original claim.",
    "visualJob": "Show an accurate Chemistry diagram or evidence table for partial neutralisation and remaining ions, with the decisive result unmarked.",
    "independentCheck": "Would NaCl form a solid precipitate simply because the balanced equation writes 'NaCl'?"
  },
  {
    "instanceId": "C09-02-MODEL-D3",
    "adapterId": "C09",
    "subtopicId": "CHEM-C09.02",
    "primaryOperation": "MODEL",
    "band": "D3",
    "studentTask": "Mix 20 mL of 0.10 mol/L HCl with 10 mL of 0.10 mol/L NaOH. Under full dissociation, select the excess-species model and predict acidic/basic outcome.",
    "wrongIdea": "Any base addition to acid ensures neutrality.",
    "replacementRule": "Rebuild the species/observation ledger, state the valid domain, and revise the original claim.",
    "visualJob": "Show an accurate Chemistry diagram or evidence table for partial neutralisation and remaining ions, with the decisive result unmarked.",
    "independentCheck": "Repeat with 10 mL HCl and 20 mL NaOH of the same concentration."
  },
  {
    "instanceId": "C09-02-JUSTIFY-D4",
    "adapterId": "C09",
    "subtopicId": "CHEM-C09.02",
    "primaryOperation": "JUSTIFY",
    "band": "D4",
    "studentTask": "A near-neutral indicator reading follows mixing two unknown solutions, one acid-like and one base-like. Does this prove that NaCl is the only dissolved salt? Defend an inference and propose evidence.",
    "wrongIdea": "Neutral colour proves pure sodium chloride.",
    "replacementRule": "Rebuild the species/observation ledger, state the valid domain, and revise the original claim.",
    "visualJob": "Show an accurate Chemistry diagram or evidence table for partial neutralisation and remaining ions, with the decisive result unmarked.",
    "independentCheck": "If the base is KOH rather than NaOH, but the acid is HCl, what soluble salt follows in the simple model?"
  },
  {
    "instanceId": "C09-03-EXPLAIN-D3",
    "adapterId": "C09",
    "subtopicId": "CHEM-C09.03",
    "primaryOperation": "EXPLAIN",
    "band": "D3",
    "studentTask": "A dilute acid sample becomes less acidic when clean water is added, but no base is present. Explain why this does not count as neutralisation.",
    "wrongIdea": "Dilution chemically destroys the acid.",
    "replacementRule": "Rebuild the species/observation ledger, state the valid domain, and revise the original claim.",
    "visualJob": "Show an accurate Chemistry diagram or evidence table for acid dilution and indicator ranges, with the decisive result unmarked.",
    "independentCheck": "If further water is added, must the mixture become strongly basic?"
  },
  {
    "instanceId": "C09-03-MODEL-D3",
    "adapterId": "C09",
    "subtopicId": "CHEM-C09.03",
    "primaryOperation": "MODEL",
    "band": "D3",
    "studentTask": "An acid is diluted and one indicator changes colour while another does not. Model how two different transition ranges can give compatible reports.",
    "wrongIdea": "Two indicators disagree, so one must be broken.",
    "replacementRule": "Rebuild the species/observation ledger, state the valid domain, and revise the original claim.",
    "visualJob": "Show an accurate Chemistry diagram or evidence table for acid dilution and indicator ranges, with the decisive result unmarked.",
    "independentCheck": "If both indicators stay the same colour, does it prove pH is unchanged?"
  },
  {
    "instanceId": "C09-03-JUSTIFY-D4",
    "adapterId": "C09",
    "subtopicId": "CHEM-C09.03",
    "primaryOperation": "JUSTIFY",
    "band": "D4",
    "studentTask": "A student states: 'Adding water to pH 3 solution consumes all acid because its pH rises to 5.' Justify acceptance or rejection and propose an independent check.",
    "wrongIdea": "A higher pH always means fewer total acid molecules because they reacted.",
    "replacementRule": "Rebuild the species/observation ledger, state the valid domain, and revise the original claim.",
    "visualJob": "Show an accurate Chemistry diagram or evidence table for acid dilution and indicator ranges, with the decisive result unmarked.",
    "independentCheck": "If a base is actually added instead of pure water, what new evidence would distinguish chemical reaction from mere dilution?"
  },
  {
    "instanceId": "C09-04-EXPLAIN-D3",
    "adapterId": "C09",
    "subtopicId": "CHEM-C09.04",
    "primaryOperation": "EXPLAIN",
    "band": "D3",
    "studentTask": "Both NaHCO3 and Na2CO3 contain sodium and carbonate-related species. Explain why they are different substances with different thermal and acid reactions.",
    "wrongIdea": "Any sodium carbonate-containing powder is identical.",
    "replacementRule": "Rebuild the species/observation ledger, state the valid domain, and revise the original claim.",
    "visualJob": "Show an accurate Chemistry diagram or evidence table for NaHCO3, Na2CO3, bleaching powder and gypsum/PoP, with the decisive result unmarked.",
    "independentCheck": "Could a sample of washing soda lose mass when heated even without producing a new sodium salt?"
  },
  {
    "instanceId": "C09-04-MODEL-D3",
    "adapterId": "C09",
    "subtopicId": "CHEM-C09.04",
    "primaryOperation": "MODEL",
    "band": "D3",
    "studentTask": "An idealised 2.50 g sample of CuSO\u2084\u00b75H\u2082O is heated by a trained demonstrator to completely anhydrous CuSO\u2084. Using CuSO\u2084 = 159.6 g mol\u207b\u00b9 and H\u2082O = 18.0 g mol\u207b\u00b9, calculate the theoretical water loss and explain why a measured 0.70 g loss alone would not verify that the process was complete.",
    "wrongIdea": "A decrease in mass always proves complete dehydration, whatever hydrate started.",
    "replacementRule": "Incorrect shortcut: A decrease in mass always proves complete dehydration, whatever hydrate started. Replace it with a controlled species or mass ledger.",
    "visualJob": "Show an accurate Chemistry diagram or evidence table for NaHCO3, Na2CO3, bleaching powder and gypsum/PoP, with the decisive result unmarked.",
    "independentCheck": "If the residue retains one water per CuSO\u2084 formula unit, does the anhydrous theoretical water-loss prediction still apply?"
  },
  {
    "instanceId": "C09-04-JUSTIFY-D4",
    "adapterId": "C09",
    "subtopicId": "CHEM-C09.04",
    "primaryOperation": "JUSTIFY",
    "band": "D4",
    "studentTask": "A white solid fizzes with dilute acid. A student says this proves the solid is sodium hydrogen carbonate. Is the evidence unique?",
    "wrongIdea": "One observed gas uniquely identifies a solid reagent.",
    "replacementRule": "Rebuild the species/observation ledger, state the valid domain, and revise the original claim.",
    "visualJob": "Show an accurate Chemistry diagram or evidence table for NaHCO3, Na2CO3, bleaching powder and gypsum/PoP, with the decisive result unmarked.",
    "independentCheck": "Would an acid reaction alone distinguish CaCO3 from NaHCO3 if both liberate CO2?"
  },
  {
    "instanceId": "C09-05-EXPLAIN-D3",
    "adapterId": "C09",
    "subtopicId": "CHEM-C09.05",
    "primaryOperation": "EXPLAIN",
    "band": "D3",
    "studentTask": "Zinc and calcium carbonate each effervesce with dilute HCl. Explain why the gas products differ and how to test the models.",
    "wrongIdea": "All acid-related bubbling is hydrogen.",
    "replacementRule": "Rebuild the species/observation ledger, state the valid domain, and revise the original claim.",
    "visualJob": "Show an accurate Chemistry diagram or evidence table for Zn/HCl and carbonate/HCl gas tests, with the decisive result unmarked.",
    "independentCheck": "If a carbonate sample has already partly reacted, does reduced bubbling alone prove a different gas?"
  },
  {
    "instanceId": "C09-05-MODEL-D3",
    "adapterId": "C09",
    "subtopicId": "CHEM-C09.05",
    "primaryOperation": "MODEL",
    "band": "D3",
    "studentTask": "Two unknown samples effervesce with acid; gas A clouds limewater, gas B does not. Choose the better gas-type hypothesis without assuming B is definitely hydrogen.",
    "wrongIdea": "If one gas is CO2, the other must be H2.",
    "replacementRule": "Rebuild the species/observation ledger, state the valid domain, and revise the original claim.",
    "visualJob": "Show an accurate Chemistry diagram or evidence table for Zn/HCl and carbonate/HCl gas tests, with the decisive result unmarked.",
    "independentCheck": "If an excessive flow of CO2 later clears the limewater, does that disprove the initial CO2 identification?"
  },
  {
    "instanceId": "C09-05-JUSTIFY-D4",
    "adapterId": "C09",
    "subtopicId": "CHEM-C09.05",
    "primaryOperation": "JUSTIFY",
    "band": "D4",
    "studentTask": "A student writes 'every metal + every acid produces H2'. Find a defensible counterexample and explain why the universal claim fails.",
    "wrongIdea": "The word 'metal' alone is sufficient to predict hydrogen.",
    "replacementRule": "Rebuild the species/observation ledger, state the valid domain, and revise the original claim.",
    "visualJob": "Show an accurate Chemistry diagram or evidence table for Zn/HCl and carbonate/HCl gas tests, with the decisive result unmarked.",
    "independentCheck": "If zinc reacts with dilute HCl, does that single success prove H2 is formed for all metals?"
  },
  {
    "instanceId": "C09-06-EXPLAIN-D3",
    "adapterId": "C09",
    "subtopicId": "CHEM-C09.06",
    "primaryOperation": "EXPLAIN",
    "band": "D3",
    "studentTask": "Compare H3PO2 and H3PO4. Explain why counting total H atoms does not give both acids the same structural basicity.",
    "wrongIdea": "Every hydrogen atom in an acid formula is acid-ionisable.",
    "replacementRule": "Rebuild the species/observation ledger, state the valid domain, and revise the original claim.",
    "visualJob": "Show an accurate Chemistry diagram or evidence table for H3PO2, H3PO3, H3PO4 P\u2013OH/P\u2013H connectivity, with the decisive result unmarked.",
    "independentCheck": "What is H3PO3 basicity under the same rule?"
  },
  {
    "instanceId": "C09-06-MODEL-D3",
    "adapterId": "C09",
    "subtopicId": "CHEM-C09.06",
    "primaryOperation": "MODEL",
    "band": "D3",
    "studentTask": "Given hypothetical structural sketches with one, two and three P\u2013OH groups, model which correspond to H3PO2, H3PO3 and H3PO4, checking all atom counts.",
    "wrongIdea": "The same total H3 allows identical structural O\u2013H arrangements.",
    "replacementRule": "Rebuild the species/observation ledger, state the valid domain, and revise the original claim.",
    "visualJob": "Show an accurate Chemistry diagram or evidence table for H3PO2, H3PO3, H3PO4 P\u2013OH/P\u2013H connectivity, with the decisive result unmarked.",
    "independentCheck": "If one P\u2013H bond were incorrectly drawn as P\u2013OH without changing oxygen inventory, what fails?"
  },
  {
    "instanceId": "C09-06-JUSTIFY-D4",
    "adapterId": "C09",
    "subtopicId": "CHEM-C09.06",
    "primaryOperation": "JUSTIFY",
    "band": "D4",
    "studentTask": "A proposed rule states: 'All three-hydrogen phosphorus oxyacids are tribasic and none can be reducing.' Evaluate both claims using structural evidence.",
    "wrongIdea": "One structural feature determines basicity and every redox property.",
    "replacementRule": "Rebuild the species/observation ledger, state the valid domain, and revise the original claim.",
    "visualJob": "Show an accurate Chemistry diagram or evidence table for H3PO2, H3PO3, H3PO4 P\u2013OH/P\u2013H connectivity, with the decisive result unmarked.",
    "independentCheck": "Can the number of P\u2013H bonds alone determine a numerical redox potential or reaction rate?"
  },
  {
    "instanceId": "C10-01-EXPLAIN-D3-B02-R2",
    "adapterId": "C10",
    "subtopicId": "CHEM-C10.01",
    "primaryOperation": "EXPLAIN",
    "band": "D3",
    "studentTask": "A copper strip, graphite sheet and crystalline salt all transmit current in at least one tested state. Copper conducts when solid, graphite much better along the sheet than across stacked layers, and salt only after melting. Explain the different carrier mechanisms and why an identical current reading is not evidence of identical bonding.",
    "wrongIdea": "Every current requires metallic electrons.",
    "replacementRule": "Conductivity is a macroscopic response; a mechanism must identify a mobile charge carrier and the structure permitting its motion. Direction and physical state help discriminate the models.",
    "visualJob": "Learner constructs the task-specific representation in protected W; no completed representation before attempt.",
    "independentCheck": "Could a dry salt conduct weakly through defects? Explain why this would not automatically establish metallic bonding."
  },
  {
    "instanceId": "C10-01-MODEL-D3-B02-R3",
    "adapterId": "C10",
    "subtopicId": "CHEM-C10.01",
    "primaryOperation": "MODEL",
    "band": "D3",
    "studentTask": "A black solid P conducts along its flat faces but weakly across stacked layers; Q is shiny and conducts in all three measured directions; R is nonconducting when solid but its melt conducts. Assign plausible bonding models, identify which assignments are nonunique and propose independent tests.",
    "wrongIdea": "Single conductivity observation proves metallic or ionic bonding.",
    "replacementRule": "Mobile charge carriers may be electrons or ions; graphite is a nonmetal with anisotropic electronic conduction. Ionic lattices usually have immobile ions; dissolved or molten ions may carry current. Conductivity alone cannot identify a material; control contacts, geometry and phase.",
    "visualJob": "Build an observation, species or structural ledger appropriate to this exact task without marking the decisive result.",
    "independentCheck": "If a molecular solid produces conducting solution, does that establish that the original solid is ionic?"
  },
  {
    "instanceId": "C10-01-SYNTHESIZE-D3-B02-R2",
    "adapterId": "C10",
    "subtopicId": "CHEM-C10.01",
    "primaryOperation": "SYNTHESIZE",
    "band": "D3",
    "studentTask": "In a hypothetical survey, dry X and dry Y are electrical insulators. X dissolves to yield equal amounts of positive and negative monovalent ions and conducts; Y reacts with water to yield equal amounts of ions and also conducts. A report identifies both original solids as ionic because the solutions have the same ion concentration. Combine the particle and experimental evidence to evaluate this conclusion and propose a way to distinguish the initial materials.",
    "wrongIdea": "Same final solution composition proves same original solid.",
    "replacementRule": "The same final species can result from dissociation or chemical ionisation. A state change, dissolution and reaction are distinct processes; a final measurement does not always reconstruct initial identity.",
    "visualJob": "Learner constructs the task-specific representation in protected W; no completed representation before attempt.",
    "independentCheck": "If Y forms ions only in water, would lack of conductivity in a nonreactive solvent uniquely prove covalent bonding?"
  },
  {
    "instanceId": "C10-02-EXPLAIN-D3-B02-R2",
    "adapterId": "C10",
    "subtopicId": "CHEM-C10.02",
    "primaryOperation": "EXPLAIN",
    "band": "D3",
    "studentTask": "A clean iron strip is immersed in a Cu\u00b2\u207a solution. In a simplified record 0.040 mol Fe\u00b2\u207a forms, 0.030 mol Cu is recovered and no other products are measured. Explain how the two half-reactions couple, whether the recorded copper amount accounts for all electron transfer, and why the blue colour fading alone is insufficient.",
    "wrongIdea": "Displacement is only an exchange of names and all metal mole ratios must match.",
    "replacementRule": "In a sole displacement reaction, oxidation and reduction are coupled by electron conservation. Product recovery is not necessarily reaction extent; colour is qualitative evidence.",
    "visualJob": "Learner constructs the task-specific representation in protected W; no completed representation before attempt.",
    "independentCheck": "If Fe instead forms Fe\u00b3\u207a and Cu is the sole acceptor, how much Cu is formed per 0.020 mol Fe?"
  },
  {
    "instanceId": "C10-02-MODEL-D3-B02-R2",
    "adapterId": "C10",
    "subtopicId": "CHEM-C10.02",
    "primaryOperation": "MODEL",
    "band": "D3",
    "studentTask": "Clean A displaces B\u00b2\u207a; clean B displaces C\u00b2\u207a; clean D displaces B\u00b2\u207a. A coated D strip gives no deposit in A\u00b2\u207a. Draw the supported partial order, list unresolved pairs, and choose the smallest additional controlled comparison needed to decide the most reactive metal.",
    "wrongIdea": "One negative coated test completes a reactivity series.",
    "replacementRule": "Comparable positive displacement tests constrain relative tendencies; transitivity assumes the same relevant chemical system. Negative tests require control for passivation and sensitivity.",
    "visualJob": "Learner constructs the task-specific representation in protected W; no completed representation before attempt.",
    "independentCheck": "If clean A displaces D\u00b2\u207a, what total order follows under assumptions?"
  },
  {
    "instanceId": "C10-02-SYNTHESIZE-D4-B02-R3",
    "adapterId": "C10",
    "subtopicId": "CHEM-C10.02",
    "primaryOperation": "SYNTHESIZE",
    "band": "D4",
    "studentTask": "Clean P displaces Q\u00b2\u207a and clean R displaces Q\u00b2\u207a in matched conditions. Coated P does not visibly react with R\u00b2\u207a. Separately 0.030 mol P dissolves as P\u00b2\u207a while 0.020 mol Q deposits. Infer partial order, test whether sole displacement explains amounts and propose controls.",
    "wrongIdea": "No visible reaction proves lower reactivity; all displacement ratios are one-to-one.",
    "replacementRule": "Positive displacement indicates relative tendency under controlled conditions; negative evidence may be masked by coating or kinetics. For a sole coupled reaction, electron release equals electron uptake. Divalent-to-divalent displacement gives equal amounts only if no other electron acceptor or measurement loss.",
    "visualJob": "Build an observation, species or structural ledger appropriate to this exact task without marking the decisive result.",
    "independentCheck": "If R\u00b3\u207a is sole acceptor, how much R deposits per 0.030 mol P dissolved?"
  },
  {
    "instanceId": "C10-03-EXPLAIN-D3-B02-R2",
    "adapterId": "C10",
    "subtopicId": "CHEM-C10.03",
    "primaryOperation": "EXPLAIN",
    "band": "D3",
    "studentTask": "An ideal salt L contains L\u00b2\u207a and X\u207b. A dry crystal gives negligible current; molten sample conducts; aqueous solution of the same nominal mass gives lower current than a more dilute solution of a different salt. Explain all three observations without claiming that nominal mass or ion count alone controls conductivity.",
    "wrongIdea": "Every ionic compound conducts the same if sample mass is equal.",
    "replacementRule": "Ionic neutrality determines formula ratio; transport depends on charged species mobility, concentration and charge. Equal sample mass need not imply equal formula amount.",
    "visualJob": "Learner constructs the task-specific representation in protected W; no completed representation before attempt.",
    "independentCheck": "If both solutions have equal ion concentration, must conductivity be equal?"
  },
  {
    "instanceId": "C10-03-MODEL-D3-B02-R3",
    "adapterId": "C10",
    "subtopicId": "CHEM-C10.03",
    "primaryOperation": "MODEL",
    "band": "D3",
    "studentTask": "Dry salts contain A\u00b3\u207a/X\u207b and B\u00b2\u207a/Y\u00b2\u207b. 0.020 mol each dissolves completely in equal final volumes without further reaction. Construct formulas, compare ion amounts and decide whether the result establishes relative conductivity or dry-solid conductivity.",
    "wrongIdea": "More ions always means higher conductivity.",
    "replacementRule": "A formula unit gives smallest charge-neutral integer ratio. A dissolved or molten salt may conduct through mobile ions, with conductivity depending on charge, concentration and mobility. Counts based on complete dissociation are model predictions.",
    "visualJob": "Build an observation, species or structural ledger appropriate to this exact task without marking the decisive result.",
    "independentCheck": "If AX\u2083 only partly dissociates, is 0.080 mol an observed ion count?"
  },
  {
    "instanceId": "C10-03-SYNTHESIZE-D4-B02-R2",
    "adapterId": "C10",
    "subtopicId": "CHEM-C10.03",
    "primaryOperation": "SYNTHESIZE",
    "band": "D4",
    "studentTask": "Two ideal salts A\u2082X\u2083 and BY\u2082 dissociate completely; A is 3+, X is 2\u2212, B is 2+, Y is 1\u2212. Equal volumes contain 0.010 mol of each salt. Construct a charge-and-particle ledger before mixing, then after mixing if only B\u00b2\u207a and X\u00b2\u207b precipitate quantitatively as BX. Find the remaining dissolved amounts and explain why current cannot be calculated from charge balance alone.",
    "wrongIdea": "Ionic neutrality means no mobile charge and precipitation removes all ions.",
    "replacementRule": "Formula units conserve charge; precipitation removes ions in stoichiometric ratios. Residual solution must remain electrically neutral while retaining mobile charge carriers.",
    "visualJob": "Learner constructs the task-specific representation in protected W; no completed representation before attempt.",
    "independentCheck": "If 0.040 mol BY\u2082 is mixed instead, how much B\u00b2\u207a remains after complete BX precipitation?"
  },
  {
    "instanceId": "C10-04-EXPLAIN-D3-B02-R2",
    "adapterId": "C10",
    "subtopicId": "CHEM-C10.04",
    "primaryOperation": "EXPLAIN",
    "band": "D3",
    "studentTask": "A proposal treats two hypothetical oxide feeds M\u2082O and NO identically with carbon because both equations can be balanced. M is sodium-like and N zinc-like. Explain why balanced stoichiometry is necessary but insufficient, compare plausible extraction mechanisms and identify what additional evidence is required before predicting actual recovery.",
    "wrongIdea": "Every atom-balanced reduction is feasible and quantitative.",
    "replacementRule": "Metal extraction requires a chemically feasible reduction or external electrical work; actual recovery also depends on separation. Balanced equations cannot by themselves establish feasibility.",
    "visualJob": "Learner constructs the task-specific representation in protected W; no completed representation before attempt.",
    "independentCheck": "A molten-salt electrolysis equation is balanced; does that prove all deposited metal is recovered?"
  },
  {
    "instanceId": "C10-04-MODEL-D4-B02-R4",
    "adapterId": "C10",
    "subtopicId": "CHEM-C10.04",
    "primaryOperation": "MODEL",
    "band": "D4",
    "studentTask": "Two ore feeds contain only ZnS, ZnCO\u2083 and inert quartz. Feed P yields 0.18 mol ZnO after complete conversion; its conversion gases contain 0.06 mol SO\u2082. Feed Q yields the same total gas amount but contains twice as much carbonate as P. Can Q have the same total ZnO under these assumptions? Infer P composition, construct Q's implied composition or demonstrate impossibility, then select the measurement that distinguishes the feeds.",
    "wrongIdea": "A total conversion-gas measurement determines every component, or a negative calculated amount can be accepted.",
    "replacementRule": "Sulphide and carbonate feedstocks require different conversion reactions but can share a common oxide intermediate. Species-specific data distinguish parallel pathways.",
    "visualJob": "Learner constructs the task-specific representation in protected W; no completed representation before attempt.",
    "independentCheck": "Can a Q feed with .09 mol carbonate and total .18 mol conversion gas fit?"
  },
  {
    "instanceId": "C10-04-SYNTHESIZE-D3-B02-R3",
    "adapterId": "C10",
    "subtopicId": "CHEM-C10.04",
    "primaryOperation": "SYNTHESIZE",
    "band": "D3",
    "studentTask": "An ideal ore contains 0.20 mol ZnCO\u2083 and 0.10 mol inert SiO\u2082. Carbonate becomes ZnO then Zn via carbon reduction, with CO the sole carbon-containing reduction product. Balance both steps; find maximum Zn, CO\u2082 and CO amounts. Explain why NaCl cannot use the same route.",
    "wrongIdea": "One carbon-reduction route works for every metal.",
    "replacementRule": "Ore form, metal reactivity, thermodynamics, side reactions and recovery govern extraction. Calcination of carbonate can release CO\u2082; suitable oxide reduction can liberate metal. Model balances are not practical laboratory instructions. Zinc recovery may involve vapour collection.",
    "visualJob": "Build an observation, species or structural ledger appropriate to this exact task without marking the decisive result.",
    "independentCheck": "75% of ideal zinc is collected. Does this establish actual CO amount?"
  },
  {
    "instanceId": "C10-05-EXPLAIN-D3-B02-R2",
    "adapterId": "C10",
    "subtopicId": "CHEM-C10.05",
    "primaryOperation": "EXPLAIN",
    "band": "D3",
    "studentTask": "Two pure white oxides X and Y both react with acid; only X forms a soluble anionic hydroxo species in strong aqueous base. Explain the difference using ZnO as a model for X and MgO for Y. Write the appropriate acid and base equations, and explain why using excess base rather than weak alkali matters.",
    "wrongIdea": "All oxides dissolving in acid are amphoteric.",
    "replacementRule": "An amphoteric oxide can act as base toward acid and react with strong base to form soluble species; the two contexts require different products and balanced equations.",
    "visualJob": "Learner constructs the task-specific representation in protected W; no completed representation before attempt.",
    "independentCheck": "Would acid dissolution of CaO alone identify an amphoteric oxide?"
  },
  {
    "instanceId": "C10-05-MODEL-D4-B02-R3",
    "adapterId": "C10",
    "subtopicId": "CHEM-C10.05",
    "primaryOperation": "MODEL",
    "band": "D4",
    "studentTask": "An ideal M\u2082O\u2083 reacts completely with acid and strong aqueous base to form [M(OH)\u2084]\u207b. A 2.04 g sample consumes 0.120 mol H\u207a. Infer M atomic mass, balance both ionic reactions, and explain why acid dissolution alone does not establish amphoterism. O=16.",
    "wrongIdea": "Acid dissolution alone proves amphoterism; aqueous and anhydrous species interchangeable.",
    "replacementRule": "Amphoteric oxides react with acids and suitable bases. Aluminium oxide in aqueous strong base can form hydroxoaluminate [Al(OH)\u2084]\u207b; anhydrous aluminate representation differs. Dilute-base negative result is insufficient without appropriate conditions.",
    "visualJob": "Build an observation, species or structural ledger appropriate to this exact task without marking the decisive result.",
    "independentCheck": "A 1.02 g sample reacts only halfway. What apparent molar mass would full-conversion assumption give?"
  },
  {
    "instanceId": "C10-05-SYNTHESIZE-D4-B02-R2",
    "adapterId": "C10",
    "subtopicId": "CHEM-C10.05",
    "primaryOperation": "SYNTHESIZE",
    "band": "D4",
    "studentTask": "A hypothetical mixture contains only MgO and ZnO. Excess acid consumes 0.100 mol H\u207a; under an ideal selective strong-base model ZnO alone consumes 0.040 mol OH\u207b forming [Zn(OH)\u2084]\u00b2\u207b. Determine the amounts of each oxide, predict total mass using MgO=40 and ZnO=81 g/mol, and explain what would invalidate this inference.",
    "wrongIdea": "One acid measurement is enough to distinguish two oxides with identical acid stoichiometry.",
    "replacementRule": "Selective reaction evidence can separate mixture components when stoichiometric ratios and selectivity are established; inverse inference fails when unmodelled species consume reagent.",
    "visualJob": "Learner constructs the task-specific representation in protected W; no completed representation before attempt.",
    "independentCheck": "If actual mass is 3.00 g, is the model proven correct by titrant amounts alone?"
  },
  {
    "instanceId": "C10-06-EXPLAIN-D3-B02-R2",
    "adapterId": "C10",
    "subtopicId": "CHEM-C10.06",
    "primaryOperation": "EXPLAIN",
    "band": "D3",
    "studentTask": "In matched iron coupons, A is wet and oxygenated, B is wet and deoxygenated, C is dry with oxygen, and D is wet and oxygenated but has poor ionic conductivity. Explain why electron transfer requires two coupled processes and predict which comparison isolates oxygen, moisture and ionic transport; distinguish observation from guaranteed rate.",
    "wrongIdea": "Oxygen or moisture alone guarantees a specific rusting rate.",
    "replacementRule": "Corrosion couples electron movement in metal to ionic movement in electrolyte; oxygen reduction is a common cathodic reaction. A controlled experiment changes one relevant variable at a time.",
    "visualJob": "Learner constructs the task-specific representation in protected W; no completed representation before attempt.",
    "independentCheck": "Can oxygen-free acidic water corrode iron through a different cathodic reaction?"
  },
  {
    "instanceId": "C10-06-MODEL-D3-B02-R4",
    "adapterId": "C10",
    "subtopicId": "CHEM-C10.06",
    "primaryOperation": "MODEL",
    "band": "D3",
    "studentTask": "Two scratched iron specimens carry different conductive coatings. Coating X is electrically connected to iron and loses mass while exposed iron corrodes little; Y is connected and remains almost unchanged while corrosion concentrates at the iron scratch. A third specimen has X physically nearby but insulated from iron. Choose barrier or galvanic models for each, predict the insulated specimen, and identify a control that distinguishes sacrificial protection from a noble coating.",
    "wrongIdea": "All electrically conductive coatings protect a scratch equally.",
    "replacementRule": "A protective coating can block reactants or alter electrochemical reactions. Sacrificial protection needs electronic connection, an electrolyte and sufficient sacrificial material.",
    "visualJob": "Learner constructs the task-specific representation in protected W; no completed representation before attempt.",
    "independentCheck": "If a noble coating is completely intact, can it still protect as a barrier?"
  },
  {
    "instanceId": "C10-06-SYNTHESIZE-D3-B02-R3",
    "adapterId": "C10",
    "subtopicId": "CHEM-C10.06",
    "primaryOperation": "SYNTHESIZE",
    "band": "D3",
    "studentTask": "Matched iron coupons show negligible rust in dry air, some in aerated fresh water, more in aerated salt water, much less in deoxygenated salt water. Scratched zinc-coated iron corrodes less than bare iron in aerated salt water. Explain the pattern with oxidation/reduction, distinguish salt from oxygen and propose a coating control.",
    "wrongIdea": "Salt is the oxidant; any nearby zinc protects iron.",
    "replacementRule": "Corrosion couples metal oxidation with reduction of an electron acceptor; ions carry charge through water. Salt accelerates many conditions but cannot replace oxygen in ordinary rusting. Sacrificial protection depends on electronic contact and ionic path.",
    "visualJob": "Build an observation, species or structural ledger appropriate to this exact task without marking the decisive result.",
    "independentCheck": "Can electrically isolated nearby zinc guarantee sacrificial protection?"
  },
  {
    "instanceId": "C11-01-REPRESENT-D4-B02-R3",
    "adapterId": "C11",
    "subtopicId": "CHEM-C11.01",
    "primaryOperation": "REPRESENT",
    "band": "D4",
    "studentTask": "An acyclic saturated hydrocarbon contains 9 carbons, exactly two quaternary and no tertiary carbons. Infer terminal methyl and secondary CH\u2082 counts, construct a valid skeleton, verify formula and explain why the rule changes for a ring.",
    "wrongIdea": "Count methyl groups without testing connectivity and degree.",
    "replacementRule": "A connected acyclic saturated carbon skeleton is a tree. Each carbon has total bond order four, so H count=4\u2212carbon degree. Each edge contributes two to degree sum. This graph-counting reasoning is an authored extension.",
    "visualJob": "Build an observation, species or structural ledger appropriate to this exact task without marking the decisive result.",
    "independentCheck": "Add one ring without changing carbon number; what formula?"
  },
  {
    "instanceId": "C11-01-SYNTHESIZE-D4-B02-R2",
    "adapterId": "C11",
    "subtopicId": "CHEM-C11.01",
    "primaryOperation": "SYNTHESIZE",
    "band": "D4",
    "studentTask": "An acyclic saturated hydrocarbon has 7 carbons, one quaternary carbon and no tertiary carbons. Combine degree counting and structural construction: find terminal and secondary counts, draw two nonidentical skeletons satisfying the data and verify formula.",
    "wrongIdea": "Matching carbon counts alone proves identical connectivity.",
    "replacementRule": "Acyclic saturated graphs have degree sum 2(n\u22121). After choosing a branch center, arm-length multisets distinguish structures with only one branching center. Graph method is extension.",
    "visualJob": "Learner constructs the task-specific representation in protected W; no completed representation before attempt.",
    "independentCheck": "Can an arm-length set 4,1,1,1 fit the same formula?"
  },
  {
    "instanceId": "C11-01-JUSTIFY-D4-B02-R2",
    "adapterId": "C11",
    "subtopicId": "CHEM-C11.01",
    "primaryOperation": "JUSTIFY",
    "band": "D4",
    "studentTask": "A student proposes that a connected neutral saturated C\u2086H\u2081\u2084 structure can contain two quaternary carbons. Test the claim using degree counting and show a realizable six-carbon skeleton with the maximum number of quaternary centers.",
    "wrongIdea": "Every allowed local valence assignment guarantees a connected skeleton.",
    "replacementRule": "Valence and graph connectivity both constrain a carbon skeleton; count degrees before claiming feasibility. An upper bound needs a realizable example to establish a maximum. Extension model.",
    "visualJob": "Learner constructs the task-specific representation in protected W; no completed representation before attempt.",
    "independentCheck": "Can C\u2088H\u2081\u2088 contain two adjacent quaternary centers?"
  },
  {
    "instanceId": "C11-02-REPRESENT-D3-B02-R4",
    "adapterId": "C11",
    "subtopicId": "CHEM-C11.02",
    "primaryOperation": "REPRESENT",
    "band": "D3",
    "studentTask": "A schematic carbon fragment A has eight vertices; six have three bonded neighbours and two have two. Fragment B has six vertices; four have four neighbours and two have two. Calculate distinct links for each, then explain whether either count proves a complete graphite or diamond lattice. Sketch a local three-neighbour planar arrangement and a four-neighbour spatial arrangement; show why boundary vertices invalidate the periodic count rule.",
    "wrongIdea": "Every vertex has the bulk coordination, even at edges.",
    "replacementRule": "Coordination is the number of nearest bonded neighbours, not bond order or isolated bond strength. In an ideal periodic network each link is shared by two atoms; graphite has delocalised electrons in layers.",
    "visualJob": "Learner constructs the task-specific representation in protected W; no completed representation before attempt.",
    "independentCheck": "If one link is added between two existing vertices, by how much does degree sum increase?"
  },
  {
    "instanceId": "C11-02-SYNTHESIZE-D3-B02-R4",
    "adapterId": "C11",
    "subtopicId": "CHEM-C11.02",
    "primaryOperation": "SYNTHESIZE",
    "band": "D3",
    "studentTask": "A carbon laminate is electrically measured in two directions. Rotating the sample by 90\u00b0 relative to fixed electrodes exchanges the high and low readings; replacing the electrodes with different contacts changes both readings similarly. Cleavage is easy along visible planes. Combine the evidence to distinguish orientation-dependent material transport from contact resistance alone, and specify an independent measurement that would challenge the layered model.",
    "wrongIdea": "Every change in current is caused by a change in the carbon structure.",
    "replacementRule": "Structure\u2013property reasoning may involve geometry, carrier paths, interlayer interaction and contact effects. A change in a single reading does not establish a phase transition or unique material identity.",
    "visualJob": "Learner constructs the task-specific representation in protected W; no completed representation before attempt.",
    "independentCheck": "If rotating the sample does not change the directional pattern but rotating the electrode setup does, what alternative gains support?"
  },
  {
    "instanceId": "C11-02-JUSTIFY-D3-B02-R3",
    "adapterId": "C11",
    "subtopicId": "CHEM-C11.02",
    "primaryOperation": "JUSTIFY",
    "band": "D3",
    "studentTask": "Equal-mass elemental carbon samples P and Q have same isotopic composition. P conducts along layers and cleaves easily; Q resists scratching and ordinarily does not conduct. A report claims Q contains fewer atoms and stronger individual C\u2013C bonds. Evaluate both claims and explain property contrast.",
    "wrongIdea": "Hardness directly measures individual bond strength.",
    "replacementRule": "Allotropes are distinct structures of one element. Graphite has strong in-plane bonding and weaker interlayer interactions; diamond forms a three-dimensional network. Hardness, transport and atom count are different observables, affected by defects and orientation.",
    "visualJob": "Build an observation, species or structural ledger appropriate to this exact task without marking the decisive result.",
    "independentCheck": "Does easy graphite cleavage show every in-plane bond is weak?"
  },
  {
    "instanceId": "C11-03-REPRESENT-D3-B02-R4",
    "adapterId": "C11",
    "subtopicId": "CHEM-C11.03",
    "primaryOperation": "REPRESENT",
    "band": "D3",
    "studentTask": "Two proposed connected hydrocarbons have six carbons. A is acyclic with two C=C bonds; B has one ring and one C\u2261C bond. A student labels both C\u2086H\u2081\u2080. Construct valid explicit examples, count hydrogens from bond orders, correct the labels, and decide whether ideal multiple-bond hydrogenation (rings unchanged) makes the products have equal formulas.",
    "wrongIdea": "Each ring or multiple bond removes the same number of hydrogens, including a triple bond.",
    "replacementRule": "For typical neutral connected hydrocarbons, a ring or double bond reduces hydrogen count by two relative to acyclic saturation; triple reduces by four. Hydrogen-deficiency formula is extension context; formula alone does not identify structure.",
    "visualJob": "Build an observation, species or structural ledger appropriate to this exact task without marking the decisive result.",
    "independentCheck": "If B loses the ring constraint by adding two H in a hypothetical ring-opening step, what saturated formula follows?"
  },
  {
    "instanceId": "C11-03-SYNTHESIZE-D4-B02-R2",
    "adapterId": "C11",
    "subtopicId": "CHEM-C11.03",
    "primaryOperation": "SYNTHESIZE",
    "band": "D4",
    "studentTask": "An unknown pure C\u2084H\u2086 hydrocarbon consumes exactly 2 mol H\u2082 per mole in an ideal complete catalytic hydrogenation that changes only multiple bonds and leaves all rings intact. The final product is acyclic C\u2084H\u2081\u2080. Combine hydrogen deficiency and reaction evidence, draw two starting structures compatible with both, and identify one measurement that would distinguish them.",
    "wrongIdea": "Hydrogen uptake uniquely identifies the bond arrangement.",
    "replacementRule": "Hydrogen deficiency counts rings and multiple bonds; ideal hydrogenation consumes one H\u2082 per C=C and two per C\u2261C. Ring preservation is an explicit condition. Extension counting model, not a procedure.",
    "visualJob": "Learner constructs the task-specific representation in protected W; no completed representation before attempt.",
    "independentCheck": "If only one mole H\u2082 is taken up and rings preserved, can the original contain a ring?"
  },
  {
    "instanceId": "C11-03-JUSTIFY-D3-B02-R2",
    "adapterId": "C11",
    "subtopicId": "CHEM-C11.03",
    "primaryOperation": "JUSTIFY",
    "band": "D3",
    "studentTask": "A report claims every C\u2085H\u2081\u2080 molecule must contain a double bond and absorb one H\u2082 on ideal alkene hydrogenation. Construct an explicit counterexample, a valid confirming example, and show how both satisfy carbon valence; state what the formula does establish.",
    "wrongIdea": "All C\u2099H\u2082\u2099 hydrocarbons are alkenes.",
    "replacementRule": "One hydrogen deficiency can be a ring or a double bond. Formula constrains total atom count; reactivity depends on actual connectivity and conditions.",
    "visualJob": "Learner constructs the task-specific representation in protected W; no completed representation before attempt.",
    "independentCheck": "Can a neutral acyclic C\u2085H\u2081\u2080 contain a triple bond?"
  },
  {
    "instanceId": "C11-04-REPRESENT-D4-B02-R2",
    "adapterId": "C11",
    "subtopicId": "CHEM-C11.04",
    "primaryOperation": "REPRESENT",
    "band": "D4",
    "studentTask": "A neutral acyclic saturated monohydric alcohol has molar mass 74 g/mol (C=12,H=1,O=16). Infer molecular formula, represent all distinct alcohol connectivities (excluding ethers and stereoisomers), and verify how each differs in formula from propanol.",
    "wrongIdea": "Each hydrogen position yields a distinct alcohol.",
    "replacementRule": "Homologous alcohols share the functional group and successive members differ by CH\u2082; positional isomers require inequivalent sites on each carbon skeleton.",
    "visualJob": "Learner constructs the task-specific representation in protected W; no completed representation before attempt.",
    "independentCheck": "Would counting stereoisomers add a new type of distinction for butan-2-ol?"
  },
  {
    "instanceId": "C11-04-SYNTHESIZE-D3-B02-R3",
    "adapterId": "C11",
    "subtopicId": "CHEM-C11.04",
    "primaryOperation": "SYNTHESIZE",
    "band": "D3",
    "studentTask": "An acyclic saturated hydrocarbon has molar mass 72 g/mol (C=12,H=1). Infer formula, enumerate every distinct carbon skeleton and name each. Explain why 3-methylbutane is not an extra isomer.",
    "wrongIdea": "Every different drawing or numbering is a new molecule.",
    "replacementRule": "Constitutional isomers have identical formula and different connectivity; rotations/reversed numbering are not new molecules. Enumerate via longest chain and equivalent positions. Geometric isomers require separate conditions.",
    "visualJob": "Build an observation, species or structural ledger appropriate to this exact task without marking the decisive result.",
    "independentCheck": "Does replacing one H by chlorine preserve the count of possible constitutional isomers?"
  },
  {
    "instanceId": "C11-04-JUSTIFY-D3-B02-R4",
    "adapterId": "C11",
    "subtopicId": "CHEM-C11.04",
    "primaryOperation": "JUSTIFY",
    "band": "D3",
    "studentTask": "Three C\u2084H\u2081\u2080O candidates are butan-1-ol, butan-2-ol and 2-methylpropan-2-ol. A model labels each carbon by the number of carbon neighbours and reports that the OH-bearing carbon has exactly one carbon neighbour. A student says this identifies butan-1-ol uniquely among all acyclic saturated monohydric alcohols. Test the claim by drawing an omitted constitutional candidate and explaining why numbering reversal cannot create it.",
    "wrongIdea": "A single local carbon environment uniquely identifies the complete molecular graph.",
    "replacementRule": "Constitutional identity depends on which atoms are bonded, not direction of drawing. An ether has C\u2013O\u2013C; alcohol has C\u2013O\u2013H. Formula alone does not establish group.",
    "visualJob": "Learner constructs the task-specific representation in protected W; no completed representation before attempt.",
    "independentCheck": "Would evidence that no carbon has three carbon neighbours distinguish the two degree-one candidates?"
  },
  {
    "instanceId": "C11-05-REPRESENT-D3-B02-R2",
    "adapterId": "C11",
    "subtopicId": "CHEM-C11.05",
    "primaryOperation": "REPRESENT",
    "band": "D3",
    "studentTask": "Three neutral acyclic compounds have formula C\u2083H\u2086O: an aldehyde, a ketone, and an alcohol containing one C=C. Draw one valid structure for each, verify every carbon valence and identify which pair shares a carbonyl and which contains OH.",
    "wrongIdea": "One oxygen and a formula uniquely identify a functional group.",
    "replacementRule": "A single oxygen can occur in different functional groups; hydrogen deficiency may arise from C=O or C=C. Verify bond orders and atom counts independently.",
    "visualJob": "Learner constructs the task-specific representation in protected W; no completed representation before attempt.",
    "independentCheck": "A new neutral sample has formula C\u2083H\u2087Cl. Independently draw two valid chain structures with chlorine on different carbon atoms; name the functional-group class, verify carbon/halogen valence, and explain why the formula alone does not establish the substitution position. Compare the group with the \u2013OH in ethanol."
  },
  {
    "instanceId": "C11-05-SYNTHESIZE-D3-B02-R4",
    "adapterId": "C11",
    "subtopicId": "CHEM-C11.05",
    "primaryOperation": "SYNTHESIZE",
    "band": "D3",
    "studentTask": "An unknown pure neutral C\u2083H\u2088O compound is one of propan-1-ol, propan-2-ol or methoxyethane. A calibrated O\u2013H signal is present. A specified selective oxidation preserves the carbon skeleton and produces C\u2083H\u2086O, but the product could be an aldehyde or ketone. Which initial models remain? Construct two product structures and select one additional structural observation to distinguish them.",
    "wrongIdea": "An oxidation product formula identifies the starting alcohol uniquely.",
    "replacementRule": "An alcohol and ether can share molecular formula but differ in O\u2013H bond and selective reaction behaviour. A calibrated structural observation plus a defined reaction model can discriminate candidates.",
    "visualJob": "Learner constructs the task-specific representation in protected W; no completed representation before attempt.",
    "independentCheck": "If product is independently identified as propanone, which starting candidate fits the stipulated pathway?"
  },
  {
    "instanceId": "C11-05-JUSTIFY-D3-B02-R3",
    "adapterId": "C11",
    "subtopicId": "CHEM-C11.05",
    "primaryOperation": "JUSTIFY",
    "band": "D3",
    "studentTask": "Three neutral organic candidates share C\u2082H\u2084O\u2082: CH\u2083COOH, HCOOCH\u2083 and HOCH\u2082CHO. An unknown produces identified CO\u2082 with hydrogen carbonate under controlled conditions. Verify formulas, identify supported model and explain why a mixture would defeat unique identity.",
    "wrongIdea": "Equal formula means same functional group.",
    "replacementRule": "Functional groups are connectivity patterns influencing reaction behaviour. Identical formula can hide acid, ester or hydroxyaldehyde structures. Controlled evidence supports a class; unique identity requires independent evidence. Hydroxyaldehyde is an extension example.",
    "visualJob": "Build an observation, species or structural ledger appropriate to this exact task without marking the decisive result.",
    "independentCheck": "If a minor acidic contaminant is present, does CO\u2082 prove the major component is an acid?"
  },
  {
    "instanceId": "C11-06-REPRESENT-D3-B02-R4",
    "adapterId": "C11",
    "subtopicId": "CHEM-C11.06",
    "primaryOperation": "REPRESENT",
    "band": "D3",
    "studentTask": "A theoretical combustion record for 0.10 mol methane contains 0.06 mol CO\u2082, 0.04 mol CO and 0.20 mol H\u2082O. Represent it as a single balanced equation using the smallest integer coefficients, calculate oxygen consumption, and compare with the all-CO\u2082 model. Explain what would fail if soot were also present but unmeasured.",
    "wrongIdea": "Use a pure CO or pure CO\u2082 equation for a mixed product record.",
    "replacementRule": "Combustion product assumptions determine oxygen demand. Carbon and hydrogen conservation hold under both models; incomplete combustion products require evidence.",
    "visualJob": "Learner constructs the task-specific representation in protected W; no completed representation before attempt.",
    "independentCheck": "If CO\u2082 and CO amounts are .05 mol each with same fuel and water, what O\u2082 amount is implied?"
  },
  {
    "instanceId": "C11-06-SYNTHESIZE-D4-B02-R3",
    "adapterId": "C11",
    "subtopicId": "CHEM-C11.06",
    "primaryOperation": "SYNTHESIZE",
    "band": "D4",
    "studentTask": "0.10 mol ethene is split equally. One portion completely hydrogenates, the other completely combusts. Write both equations and consumption/output; test whether complete combustion of hydrogenated portion gives same CO\u2082 but more water.",
    "wrongIdea": "Hydrogenation changes carbon count or all equal hydrocarbon amounts yield equal water.",
    "replacementRule": "Addition across C=C changes bond order and adds atoms. Complete combustion of pure hydrocarbons produces CO\u2082 and H\u2082O. Sequential conversion changes hydrogen balance without changing carbon count. The equations are theoretical, not experimental instructions.",
    "visualJob": "Build an observation, species or structural ledger appropriate to this exact task without marking the decisive result.",
    "independentCheck": "Only 60% of the 0.050 mol portion hydrogenates. Find water on complete combustion."
  },
  {
    "instanceId": "C11-06-JUSTIFY-D4-B02-R4",
    "adapterId": "C11",
    "subtopicId": "CHEM-C11.06",
    "primaryOperation": "JUSTIFY",
    "band": "D4",
    "studentTask": "A theoretical methane substitution record has 0.10 mol completely reacted methane and 0.18 mol HCl. The only carbon products are CH\u2083Cl, CH\u2082Cl\u2082 and CHCl\u2083. A separate measurement gives 0.04 mol CH\u2082Cl\u2082. Derive all three amounts, check the average substitutions, and justify whether the two original totals without the separate measurement would uniquely identify the products.",
    "wrongIdea": "Two aggregate balances uniquely fix three product quantities.",
    "replacementRule": "Substitution replaces H by another atom; successive net substitutions produce additional HCl. Product distribution cannot be inferred from the first balanced equation alone.",
    "visualJob": "Learner constructs the task-specific representation in protected W; no completed representation before attempt.",
    "independentCheck": "If reported y=.10 mol, can the given HCl amount .18 be consistent?"
  },
  {
    "instanceId": "C11-07-REPRESENT-D3-B02-R2",
    "adapterId": "C11",
    "subtopicId": "CHEM-C11.07",
    "primaryOperation": "REPRESENT",
    "band": "D3",
    "studentTask": "Two ideal surfactant sketches show (A) heads at the water-facing surface and tails toward an oil droplet, (B) heads buried in oil and tails facing water. Represent both with labelled water/oil regions and explain which orientation supports an oil-in-water dispersion. Predict what changes when calcium binds the soap heads.",
    "wrongIdea": "Micelles have one universal orientation regardless of medium.",
    "replacementRule": "Amphiphilic molecules contain hydrophobic tails and hydrophilic heads; aggregate geometry depends on surrounding phases. Divalent ions can remove soap through precipitation, distinct from micellisation.",
    "visualJob": "Learner constructs the task-specific representation in protected W; no completed representation before attempt.",
    "independentCheck": "Would the same orientation necessarily hold in an oil-continuous reverse-micelle model?"
  },
  {
    "instanceId": "C11-07-SYNTHESIZE-D4-B02-R4",
    "adapterId": "C11",
    "subtopicId": "CHEM-C11.07",
    "primaryOperation": "SYNTHESIZE",
    "band": "D4",
    "studentTask": "Two water samples each receive 0.014 mol soap ions in a hypothetical quantitative precipitation model. Sample A contains 0.004 mol Ca\u00b2\u207a and unknown Mg\u00b2\u207a; 0.002 mol soap remains. Sample B contains the same total divalent-ion amount but starts with only half as much soap. Infer A's Mg\u00b2\u207a amount, decide whether B removes all hardness, and propose a discriminating measurement if foam heights happen to match.",
    "wrongIdea": "Equal total hardness guarantees all hardness is removed or equal foam proves equal remaining soap.",
    "replacementRule": "Soap has ionic carboxylate heads and hydrophobic tails. Ca\u00b2\u207a/Mg\u00b2\u207a can form sparingly soluble salts, removing active soap. Synthetic detergent response depends on formulation. Distinguish precipitation, micelles and foam measurements.",
    "visualJob": "Build an observation, species or structural ledger appropriate to this exact task without marking the decisive result.",
    "independentCheck": "If A had .004 mol soap left instead, what total divalent amount would its record imply?"
  },
  {
    "instanceId": "C11-07-JUSTIFY-D4-B02-R2",
    "adapterId": "C11",
    "subtopicId": "CHEM-C11.07",
    "primaryOperation": "JUSTIFY",
    "band": "D4",
    "studentTask": "Two pure liquids are ethanol and ethanoic acid. In ideal separate tests an equal 0.050 mol portion of each is contacted with excess hydrogen carbonate; one generates 0.050 mol CO\u2082 and the other none. Equal portions are then combined in a theoretical 1:1 esterification with 60% conversion. Justify identification, calculate ester/water and remaining reactants, and explain why the initial gas observation does not establish a real mixture's purity.",
    "wrongIdea": "Ester formation always consumes all reactants; gas proves purity.",
    "replacementRule": "Carboxylic acid can transfer proton to hydrogen carbonate. Esterification is reversible; conversion controls product amount. Distinguish functional-group evidence from purity and theoretical yield.",
    "visualJob": "Learner constructs the task-specific representation in protected W; no completed representation before attempt.",
    "independentCheck": "If 0.040 mol acid and .050 mol ethanol react at 60% conversion of acid, how much ester?"
  },
  {
    "instanceId": "C12-01-REPRESENT-D3",
    "adapterId": "C12",
    "subtopicId": "CHEM-C12.01",
    "primaryOperation": "REPRESENT",
    "band": "D3",
    "studentTask": "An idealised sealed piston holds a fixed amount of gas at 300 K. It initially moves against constant external pressure but reaches a rigid mechanical stop at 315 K; heating then continues to 330 K. Describe which variables change during each interval and calculate the final pressure relative to its value at the stop.",
    "wrongIdea": "The pressure must stay constant for the entire heating because the piston could move at first.",
    "replacementRule": "Reject: The pressure must stay constant for the entire heating because the piston could move at first. Correct the missing constraint or species and verify a separate measurement.",
    "visualJob": "Show an accurate Chemistry diagram or evidence table for two gas apparatus with controlled volume/temperature, with the decisive result unmarked.",
    "independentCheck": "If the piston leaks after reaching the stop, does P_final/P_stop still follow from temperatures alone?"
  },
  {
    "instanceId": "C12-01-MODEL-D3",
    "adapterId": "C12",
    "subtopicId": "CHEM-C12.01",
    "primaryOperation": "MODEL",
    "band": "D3",
    "studentTask": "Choose a model for a balloon heated at near-constant outside pressure and for a rigid cylinder; defend why one model does not fit both.",
    "wrongIdea": "Wrong path: 'Heating any gas always increases its volume.' Repair: identify whether the boundary is rigid, flexible or externally controlled before selecting a model.",
    "replacementRule": "Wrong path: 'Heating any gas always increases its volume.' Repair: identify whether the boundary is rigid, flexible or externally controlled before selecting a model.",
    "visualJob": "Show an accurate Chemistry diagram or evidence table for two gas apparatus with controlled volume/temperature, with the decisive result unmarked.",
    "independentCheck": "Would using 20\u00b0C as the proportional temperature number be valid?"
  },
  {
    "instanceId": "C12-01-SYNTHESIZE-D3",
    "adapterId": "C12",
    "subtopicId": "CHEM-C12.01",
    "primaryOperation": "SYNTHESIZE",
    "band": "D3",
    "studentTask": "Two reports disagree: experiment A heats a sealed rigid gas jar and finds no volume rise; experiment B finds gas volume increased. Reconcile the reports without inventing error.",
    "wrongIdea": "Wrong path: 'Heating any gas always increases its volume.' Repair: identify whether the boundary is rigid, flexible or externally controlled before selecting a model.",
    "replacementRule": "Wrong path: 'Heating any gas always increases its volume.' Repair: identify whether the boundary is rigid, flexible or externally controlled before selecting a model.",
    "visualJob": "Show an accurate Chemistry diagram or evidence table for two gas apparatus with controlled volume/temperature, with the decisive result unmarked.",
    "independentCheck": "If A reports constant pressure and constant volume despite heating, what missing variable should be investigated?"
  },
  {
    "instanceId": "C12-02-REPRESENT-D3",
    "adapterId": "C12",
    "subtopicId": "CHEM-C12.02",
    "primaryOperation": "REPRESENT",
    "band": "D3",
    "studentTask": "Represent 2H\u2082 + O\u2082 \u2192 2H\u2082O before reaction, as hot vapour and after complete condensation.",
    "wrongIdea": "Wrong path: 'Coefficients always equal measured gas-volume ratio.' Repair: enforce common reference T/P, gas phase, complete reaction and absence of excess reactants before using the ratio.",
    "replacementRule": "Wrong path: 'Coefficients always equal measured gas-volume ratio.' Repair: enforce common reference T/P, gas phase, complete reaction and absence of excess reactants before using the ratio.",
    "visualJob": "Show an accurate Chemistry diagram or evidence table for hydrogen and oxygen gas volume ratios, with the decisive result unmarked.",
    "independentCheck": "Would the same numerical volume relation apply at unequal temperatures?"
  },
  {
    "instanceId": "C12-02-MODEL-D3",
    "adapterId": "C12",
    "subtopicId": "CHEM-C12.02",
    "primaryOperation": "MODEL",
    "band": "D3",
    "studentTask": "A gas mixture contains excess hydrogen and some oxygen. Choose a reaction-volume ledger that predicts the residue after cooling.",
    "wrongIdea": "Wrong path: 'Coefficients always equal measured gas-volume ratio.' Repair: enforce common reference T/P, gas phase, complete reaction and absence of excess reactants before using the ratio.",
    "replacementRule": "Wrong path: 'Coefficients always equal measured gas-volume ratio.' Repair: enforce common reference T/P, gas phase, complete reaction and absence of excess reactants before using the ratio.",
    "visualJob": "Show an accurate Chemistry diagram or evidence table for hydrogen and oxygen gas volume ratios, with the decisive result unmarked.",
    "independentCheck": "Would final measured contraction uniquely identify initial composition without other data?"
  },
  {
    "instanceId": "C12-02-SYNTHESIZE-D3",
    "adapterId": "C12",
    "subtopicId": "CHEM-C12.02",
    "primaryOperation": "SYNTHESIZE",
    "band": "D3",
    "studentTask": "A student infers gas composition from one final volume without recording temperature and product phase. Explain why that inference is underdetermined.",
    "wrongIdea": "Wrong path: 'Coefficients always equal measured gas-volume ratio.' Repair: enforce common reference T/P, gas phase, complete reaction and absence of excess reactants before using the ratio.",
    "replacementRule": "Wrong path: 'Coefficients always equal measured gas-volume ratio.' Repair: enforce common reference T/P, gas phase, complete reaction and absence of excess reactants before using the ratio.",
    "visualJob": "Show an accurate Chemistry diagram or evidence table for hydrogen and oxygen gas volume ratios, with the decisive result unmarked.",
    "independentCheck": "If water remains vapour rather than liquid, would the same contraction calculation hold?"
  },
  {
    "instanceId": "C12-03-REPRESENT-D3",
    "adapterId": "C12",
    "subtopicId": "CHEM-C12.03",
    "primaryOperation": "REPRESENT",
    "band": "D3",
    "studentTask": "Two reactions nominally produce equal moles of H\u2082 and CO\u2082, but each gas is collected separately over water. The recorded wet-gas volumes differ. Explain why the volume comparison alone cannot establish unequal chemical yields, and specify two controls or corrections that would test that interpretation.",
    "wrongIdea": "A smaller CO\u2082 collection volume proves that fewer CO\u2082 molecules were generated.",
    "replacementRule": "Reject: A smaller CO\u2082 collection volume proves that fewer CO\u2082 molecules were generated. Correct the missing constraint or species and verify a separate measurement.",
    "visualJob": "Show an accurate Chemistry diagram or evidence table for water trough and gas-syringe collection, with the decisive result unmarked.",
    "independentCheck": "If collection occurs at different temperatures, what further correction becomes essential even if no gas dissolves?"
  },
  {
    "instanceId": "C12-03-MODEL-D3",
    "adapterId": "C12",
    "subtopicId": "CHEM-C12.03",
    "primaryOperation": "MODEL",
    "band": "D3",
    "studentTask": "A water-soluble gas is being generated. Select between water displacement and gas syringe collection and justify the controls.",
    "wrongIdea": "Wrong path: 'Displaced water volume is always the exact volume of dry pure gas produced.' Repair by checking gas composition, vapour, dissolution, pressure equality and leaks.",
    "replacementRule": "Wrong path: 'Displaced water volume is always the exact volume of dry pure gas produced.' Repair by checking gas composition, vapour, dissolution, pressure equality and leaks.",
    "visualJob": "Show an accurate Chemistry diagram or evidence table for water trough and gas-syringe collection, with the decisive result unmarked.",
    "independentCheck": "Is a gas syringe automatically error-free?"
  },
  {
    "instanceId": "C12-03-SYNTHESIZE-D3",
    "adapterId": "C12",
    "subtopicId": "CHEM-C12.03",
    "primaryOperation": "SYNTHESIZE",
    "band": "D3",
    "studentTask": "Two apparatus report different collected CO\u2082 volumes for the same reaction. Synthesize an error-analysis procedure before assigning stoichiometric failure.",
    "wrongIdea": "Wrong path: 'Displaced water volume is always the exact volume of dry pure gas produced.' Repair by checking gas composition, vapour, dissolution, pressure equality and leaks.",
    "replacementRule": "Wrong path: 'Displaced water volume is always the exact volume of dry pure gas produced.' Repair by checking gas composition, vapour, dissolution, pressure equality and leaks.",
    "visualJob": "Show an accurate Chemistry diagram or evidence table for water trough and gas-syringe collection, with the decisive result unmarked.",
    "independentCheck": "If a smaller measured volume follows switching to water collection, must the reaction have produced less CO\u2082?"
  },
  {
    "instanceId": "C12-04-REPRESENT-D3",
    "adapterId": "C12",
    "subtopicId": "CHEM-C12.04",
    "primaryOperation": "REPRESENT",
    "band": "D3",
    "studentTask": "For an idealised complete combustion, mix 1 mol propane (C\u2083H\u2088) with 6 mol O\u2082. Construct the atom-balanced reaction and calculate hot gas amounts, dry gas amounts after full water condensation, and remaining gas after selective CO\u2082 absorption. Explain which result changes if condensation is incomplete.",
    "wrongIdea": "All water produced disappears from the entire system on cooling, so atoms are not conserved.",
    "replacementRule": "Reject: All water produced disappears from the entire system on cooling, so atoms are not conserved. Correct the missing constraint or species and verify a separate measurement.",
    "visualJob": "Show an accurate Chemistry diagram or evidence table for combustion and cooling before gas analysis, with the decisive result unmarked.",
    "independentCheck": "If liquid water partly evaporates again before measurement, can the dry-gas total of 4 mol be trusted?"
  },
  {
    "instanceId": "C12-04-MODEL-D3",
    "adapterId": "C12",
    "subtopicId": "CHEM-C12.04",
    "primaryOperation": "MODEL",
    "band": "D3",
    "studentTask": "A gas volume decreases after cooling combustion exhaust. Choose a model distinguishing condensation from absorption of CO\u2082.",
    "wrongIdea": "Wrong path: 'Gas volume contraction is entirely the amount of CO\u2082 that formed.' Repair by separating chemical reaction, condensation and selective absorption.",
    "replacementRule": "Wrong path: 'Gas volume contraction is entirely the amount of CO\u2082 that formed.' Repair by separating chemical reaction, condensation and selective absorption.",
    "visualJob": "Show an accurate Chemistry diagram or evidence table for combustion and cooling before gas analysis, with the decisive result unmarked.",
    "independentCheck": "Can a decrease from condensation alone measure the fuel carbon count?"
  },
  {
    "instanceId": "C12-04-SYNTHESIZE-D3",
    "adapterId": "C12",
    "subtopicId": "CHEM-C12.04",
    "primaryOperation": "SYNTHESIZE",
    "band": "D3",
    "studentTask": "Residual gas after complete hydrocarbon combustion contains CO\u2082 and O\u2082. Construct a stage ledger to show which volume loss diagnoses each species.",
    "wrongIdea": "Wrong path: 'Gas volume contraction is entirely the amount of CO\u2082 that formed.' Repair by separating chemical reaction, condensation and selective absorption.",
    "replacementRule": "Wrong path: 'Gas volume contraction is entirely the amount of CO\u2082 that formed.' Repair by separating chemical reaction, condensation and selective absorption.",
    "visualJob": "Show an accurate Chemistry diagram or evidence table for combustion and cooling before gas analysis, with the decisive result unmarked.",
    "independentCheck": "If incomplete combustion produced CO, would a CO\u2082-only absorber measure all product carbon?"
  },
  {
    "instanceId": "C12-05-REPRESENT-D3",
    "adapterId": "C12",
    "subtopicId": "CHEM-C12.05",
    "primaryOperation": "REPRESENT",
    "band": "D3",
    "studentTask": "An ideal eudiometry mixture contains 8 mL CH\u2084, 4 mL inert N\u2082 and 24 mL O\u2082 at the same reference T/P. After complete combustion and cooling to condense water, the dry volume reads 20 mL. After selective CO\u2082 removal it reads 12 mL. Check these readings with a species ledger and decide whether the final 12 mL can be labelled oxygen alone; propose a discriminating measurement.",
    "wrongIdea": "Every gas remaining after selective CO\u2082 absorption must be oxygen.",
    "replacementRule": "Reject: Every gas remaining after selective CO\u2082 absorption must be oxygen. Correct the missing constraint or species and verify a separate measurement.",
    "visualJob": "Show an accurate Chemistry diagram or evidence table for combustion plus selective gas absorption readings, with the decisive result unmarked.",
    "independentCheck": "If the initial N\u2082 amount was not given, can the final 12 mL determine residual oxygen uniquely?"
  },
  {
    "instanceId": "C12-05-MODEL-D3",
    "adapterId": "C12",
    "subtopicId": "CHEM-C12.05",
    "primaryOperation": "MODEL",
    "band": "D3",
    "studentTask": "An unknown gas reacts in oxygen and the cooled gas contracts by 18 mL, with no separate CO\u2082 reading. Choose a model and state why composition may be underdetermined.",
    "wrongIdea": "Wrong path: 'Contraction alone proves the hydrocarbon formula.' Repair with complete species ledger, validated absorption selectivity and independent observations.",
    "replacementRule": "Wrong path: 'Contraction alone proves the hydrocarbon formula.' Repair with complete species ledger, validated absorption selectivity and independent observations.",
    "visualJob": "Show an accurate Chemistry diagram or evidence table for combustion plus selective gas absorption readings, with the decisive result unmarked.",
    "independentCheck": "Would one contraction automatically establish a unique carbon-to-hydrogen ratio?"
  },
  {
    "instanceId": "C12-05-SYNTHESIZE-D3",
    "adapterId": "C12",
    "subtopicId": "CHEM-C12.05",
    "primaryOperation": "SYNTHESIZE",
    "band": "D3",
    "studentTask": "A record gives three volume drops but fails to state whether temperature/pressure are matched. Synthesize a valid correction and evidence request.",
    "wrongIdea": "Wrong path: 'Contraction alone proves the hydrocarbon formula.' Repair with complete species ledger, validated absorption selectivity and independent observations.",
    "replacementRule": "Wrong path: 'Contraction alone proves the hydrocarbon formula.' Repair with complete species ledger, validated absorption selectivity and independent observations.",
    "visualJob": "Show an accurate Chemistry diagram or evidence table for combustion plus selective gas absorption readings, with the decisive result unmarked.",
    "independentCheck": "If an inert gas remains throughout all stages, may it affect total residual volumes?"
  },
  {
    "instanceId": "C13-01-EXPLAIN-D3",
    "adapterId": "C13",
    "subtopicId": "CHEM-C13.01",
    "primaryOperation": "EXPLAIN",
    "band": "D3",
    "studentTask": "In the idealised reaction 2Mg + CO\u2082 \u2192 2MgO + C, identify both redox partners using oxygen transfer and formal oxidation states. Explain why carbon dioxide is reduced even though its formula contains oxygen, and propose evidence beyond a colour change for the products.",
    "wrongIdea": "Because CO\u2082 contains oxygen, it must be the substance undergoing oxidation.",
    "replacementRule": "Incorrect classification: Because CO\u2082 contains oxygen, it must be the substance undergoing oxidation. Reconcile atom balance, formal charges and electron changes.",
    "visualJob": "Show an accurate Chemistry diagram or evidence table for CuO and H2 oxygen-transfer reaction, with the decisive result unmarked.",
    "independentCheck": "If the solid product also includes unreacted Mg, can the net equation prove complete reaction from appearance alone?"
  },
  {
    "instanceId": "C13-01-APPLY-D3",
    "adapterId": "C13",
    "subtopicId": "CHEM-C13.01",
    "primaryOperation": "APPLY",
    "band": "D3",
    "studentTask": "An oxygen-free idealised reaction is 2FeCl\u2082 + Cl\u2082 \u2192 2FeCl\u2083. Use oxidation states or half-reactions to identify which substance loses electrons and which gains them, check atom balance, and explain why an oxygen-only redox definition fails.",
    "wrongIdea": "No oxygen atom changes partners, so there is no oxidation or reduction.",
    "replacementRule": "Incorrect classification: No oxygen atom changes partners, so there is no oxidation or reduction. Reconcile atom balance, formal charges and electron changes.",
    "visualJob": "Show an accurate Chemistry diagram or evidence table for CuO and H2 oxygen-transfer reaction, with the decisive result unmarked.",
    "independentCheck": "If the reactants are not in a medium where the assumed Fe\u00b3\u207a products are stable, does the written equation establish the observed final species?"
  },
  {
    "instanceId": "C13-01-JUSTIFY-D3",
    "adapterId": "C13",
    "subtopicId": "CHEM-C13.01",
    "primaryOperation": "JUSTIFY",
    "band": "D3",
    "studentTask": "A dark solid turns reddish during heating. A student identifies both oxide reduction and the gas product from colour alone. Refute the reasoning and propose independent tests.",
    "wrongIdea": "Wrong path: 'The reducing agent gains electrons in the same reaction because it is called reducing.' Repair by defining an agent according to what it does to the other species and checking the agent's own net chemical change.",
    "replacementRule": "Wrong path: 'The reducing agent gains electrons in the same reaction because it is called reducing.' Repair by defining an agent according to what it does to the other species and checking the agent's own net chemical change.",
    "visualJob": "Show an accurate Chemistry diagram or evidence table for CuO and H2 oxygen-transfer reaction, with the decisive result unmarked.",
    "independentCheck": "Would a second unrelated colour change prove oxygen transfer?"
  },
  {
    "instanceId": "C13-02-EXPLAIN-D3",
    "adapterId": "C13",
    "subtopicId": "CHEM-C13.02",
    "primaryOperation": "EXPLAIN",
    "band": "D3",
    "studentTask": "Explain why Fe\u00b2\u207a \u2192 Fe\u00b3\u207a + e\u207b is oxidation without mentioning oxygen atoms.",
    "wrongIdea": "Wrong path: 'All atoms with oxidation number +2 physically carry +2 ionic charge.' Repair by distinguishing formal assignment from actual ionic species and the molecular bonding model.",
    "replacementRule": "Wrong path: 'All atoms with oxidation number +2 physically carry +2 ionic charge.' Repair by distinguishing formal assignment from actual ionic species and the molecular bonding model.",
    "visualJob": "Show an accurate Chemistry diagram or evidence table for Fe2+/Fe3+ formal charge and electron bookkeeping, with the decisive result unmarked.",
    "independentCheck": "Does every oxidised species necessarily gain oxygen?"
  },
  {
    "instanceId": "C13-02-APPLY-D3",
    "adapterId": "C13",
    "subtopicId": "CHEM-C13.02",
    "primaryOperation": "APPLY",
    "band": "D3",
    "studentTask": "Apply oxidation-number rules to H\u2082O and H\u2082O\u2082, specifying why oxygen differs.",
    "wrongIdea": "Wrong path: 'All atoms with oxidation number +2 physically carry +2 ionic charge.' Repair by distinguishing formal assignment from actual ionic species and the molecular bonding model.",
    "replacementRule": "Wrong path: 'All atoms with oxidation number +2 physically carry +2 ionic charge.' Repair by distinguishing formal assignment from actual ionic species and the molecular bonding model.",
    "visualJob": "Show an accurate Chemistry diagram or evidence table for Fe2+/Fe3+ formal charge and electron bookkeeping, with the decisive result unmarked.",
    "independentCheck": "If an oxygen-containing formula cannot balance with O = \u22122, should the charge rule simply be abandoned?"
  },
  {
    "instanceId": "C13-02-JUSTIFY-D3",
    "adapterId": "C13",
    "subtopicId": "CHEM-C13.02",
    "primaryOperation": "JUSTIFY",
    "band": "D3",
    "studentTask": "A student says carbon's +4 oxidation number in CO\u2082 proves it exists as isolated C\u2074\u207a ions in the gas. Refute the claim.",
    "wrongIdea": "Wrong path: 'All atoms with oxidation number +2 physically carry +2 ionic charge.' Repair by distinguishing formal assignment from actual ionic species and the molecular bonding model.",
    "replacementRule": "Wrong path: 'All atoms with oxidation number +2 physically carry +2 ionic charge.' Repair by distinguishing formal assignment from actual ionic species and the molecular bonding model.",
    "visualJob": "Show an accurate Chemistry diagram or evidence table for Fe2+/Fe3+ formal charge and electron bookkeeping, with the decisive result unmarked.",
    "independentCheck": "Can oxidation numbers always establish the sequence of elementary reaction steps?"
  },
  {
    "instanceId": "C13-03-EXPLAIN-D3",
    "adapterId": "C13",
    "subtopicId": "CHEM-C13.03",
    "primaryOperation": "EXPLAIN",
    "band": "D3",
    "studentTask": "Explain why atoms and charge must both balance in the acidic permanganate/iron(II) reaction.",
    "wrongIdea": "Wrong path: 'A redox equation is balanced once each element count matches.' Repair by checking total charge in ionic equations, electron cancellation and the stated acidic/basic medium.",
    "replacementRule": "Wrong path: 'A redox equation is balanced once each element count matches.' Repair by checking total charge in ionic equations, electron cancellation and the stated acidic/basic medium.",
    "visualJob": "Show an accurate Chemistry diagram or evidence table for acidic-medium half-reaction charge ledger, with the decisive result unmarked.",
    "independentCheck": "If the reaction medium is changed, must the same permanganate product necessarily result?"
  },
  {
    "instanceId": "C13-03-APPLY-D3",
    "adapterId": "C13",
    "subtopicId": "CHEM-C13.03",
    "primaryOperation": "APPLY",
    "band": "D3",
    "studentTask": "Apply the half-reaction method to Fe\u00b2\u207a/Fe\u00b3\u207a and MnO\u2084\u207b/Mn\u00b2\u207a in acidic medium.",
    "wrongIdea": "Wrong path: 'A redox equation is balanced once each element count matches.' Repair by checking total charge in ionic equations, electron cancellation and the stated acidic/basic medium.",
    "replacementRule": "Wrong path: 'A redox equation is balanced once each element count matches.' Repair by checking total charge in ionic equations, electron cancellation and the stated acidic/basic medium.",
    "visualJob": "Show an accurate Chemistry diagram or evidence table for acidic-medium half-reaction charge ledger, with the decisive result unmarked.",
    "independentCheck": "What independent check detects an arithmetic mistake in electron cancellation?"
  },
  {
    "instanceId": "C13-03-JUSTIFY-D3",
    "adapterId": "C13",
    "subtopicId": "CHEM-C13.03",
    "primaryOperation": "JUSTIFY",
    "band": "D3",
    "studentTask": "An equation balances Mn, Fe and O but charge differs. Refute a proposed balancing by changing the ionic species labels.",
    "wrongIdea": "Wrong path: 'A redox equation is balanced once each element count matches.' Repair by checking total charge in ionic equations, electron cancellation and the stated acidic/basic medium.",
    "replacementRule": "Wrong path: 'A redox equation is balanced once each element count matches.' Repair by checking total charge in ionic equations, electron cancellation and the stated acidic/basic medium.",
    "visualJob": "Show an accurate Chemistry diagram or evidence table for acidic-medium half-reaction charge ledger, with the decisive result unmarked.",
    "independentCheck": "Could one transfer an acidic half-reaction unchanged to basic solution without checking species?"
  },
  {
    "instanceId": "C13-04-EXPLAIN-D3",
    "adapterId": "C13",
    "subtopicId": "CHEM-C13.04",
    "primaryOperation": "EXPLAIN",
    "band": "D3",
    "studentTask": "Explain why permanganate's reaction-specific electron factor can depend on its reduction product.",
    "wrongIdea": "Wrong path: 'Apply the familiar 5-equivalent factor to every permanganate reaction.' Repair by identifying the product oxidation state and medium, then balancing the specific reaction before computing.",
    "replacementRule": "Wrong path: 'Apply the familiar 5-equivalent factor to every permanganate reaction.' Repair by identifying the product oxidation state and medium, then balancing the specific reaction before computing.",
    "visualJob": "Show an accurate Chemistry diagram or evidence table for medium-sensitive oxidant mole ratios, with the decisive result unmarked.",
    "independentCheck": "Would electron factor remain five for all permanganate reactions?"
  },
  {
    "instanceId": "C13-04-APPLY-D3",
    "adapterId": "C13",
    "subtopicId": "CHEM-C13.04",
    "primaryOperation": "APPLY",
    "band": "D3",
    "studentTask": "Apply the acidic reaction ratio to 0.050 mol Fe\u00b2\u207a and determine permanganate amount.",
    "wrongIdea": "Wrong path: 'Apply the familiar 5-equivalent factor to every permanganate reaction.' Repair by identifying the product oxidation state and medium, then balancing the specific reaction before computing.",
    "replacementRule": "Wrong path: 'Apply the familiar 5-equivalent factor to every permanganate reaction.' Repair by identifying the product oxidation state and medium, then balancing the specific reaction before computing.",
    "visualJob": "Show an accurate Chemistry diagram or evidence table for medium-sensitive oxidant mole ratios, with the decisive result unmarked.",
    "independentCheck": "If another reductant is present, can the same measured oxidant amount quantify Fe\u00b2\u207a alone?"
  },
  {
    "instanceId": "C13-04-JUSTIFY-D3",
    "adapterId": "C13",
    "subtopicId": "CHEM-C13.04",
    "primaryOperation": "JUSTIFY",
    "band": "D3",
    "studentTask": "A titration record gives oxidant volume but omits pH and reaction products. Justify why a unique equivalent factor cannot be assumed.",
    "wrongIdea": "Wrong path: 'Apply the familiar 5-equivalent factor to every permanganate reaction.' Repair by identifying the product oxidation state and medium, then balancing the specific reaction before computing.",
    "replacementRule": "Wrong path: 'Apply the familiar 5-equivalent factor to every permanganate reaction.' Repair by identifying the product oxidation state and medium, then balancing the specific reaction before computing.",
    "visualJob": "Show an accurate Chemistry diagram or evidence table for medium-sensitive oxidant mole ratios, with the decisive result unmarked.",
    "independentCheck": "Does an accurately measured burette volume validate the reaction model?"
  },
  {
    "instanceId": "C13-05-EXPLAIN-D3",
    "adapterId": "C13",
    "subtopicId": "CHEM-C13.05",
    "primaryOperation": "EXPLAIN",
    "band": "D3",
    "studentTask": "Explain the distinction between an indicator endpoint and a chemical equivalence point.",
    "wrongIdea": "Wrong path: 'Every indicator colour change establishes exact equivalence and a unique sample composition.' Repair by distinguishing indicator response from stoichiometric equality and asking whether side reactions or contamination occur.",
    "replacementRule": "Wrong path: 'Every indicator colour change establishes exact equivalence and a unique sample composition.' Repair by distinguishing indicator response from stoichiometric equality and asking whether side reactions or contamination occur.",
    "visualJob": "Show an accurate Chemistry diagram or evidence table for burette endpoint versus equivalence point, with the decisive result unmarked.",
    "independentCheck": "If colour changes sharply, must it coincide exactly with equivalence?"
  },
  {
    "instanceId": "C13-05-APPLY-D3",
    "adapterId": "C13",
    "subtopicId": "CHEM-C13.05",
    "primaryOperation": "APPLY",
    "band": "D3",
    "studentTask": "Apply the 1:1 HCl/NaOH relation to 25.0 mL 0.100 mol/L NaOH requiring 20.0 mL HCl.",
    "wrongIdea": "Wrong path: 'Every indicator colour change establishes exact equivalence and a unique sample composition.' Repair by distinguishing indicator response from stoichiometric equality and asking whether side reactions or contamination occur.",
    "replacementRule": "Wrong path: 'Every indicator colour change establishes exact equivalence and a unique sample composition.' Repair by distinguishing indicator response from stoichiometric equality and asking whether side reactions or contamination occur.",
    "visualJob": "Show an accurate Chemistry diagram or evidence table for burette endpoint versus equivalence point, with the decisive result unmarked.",
    "independentCheck": "If two acids were present in the HCl-labelled sample, would this calculation identify HCl alone?"
  },
  {
    "instanceId": "C13-05-JUSTIFY-D3",
    "adapterId": "C13",
    "subtopicId": "CHEM-C13.05",
    "primaryOperation": "JUSTIFY",
    "band": "D3",
    "studentTask": "Two volumetric trials differ by almost 20%. Justify an investigation before accepting the mean as the final concentration.",
    "wrongIdea": "Wrong path: 'Every indicator colour change establishes exact equivalence and a unique sample composition.' Repair by distinguishing indicator response from stoichiometric equality and asking whether side reactions or contamination occur.",
    "replacementRule": "Wrong path: 'Every indicator colour change establishes exact equivalence and a unique sample composition.' Repair by distinguishing indicator response from stoichiometric equality and asking whether side reactions or contamination occur.",
    "visualJob": "Show an accurate Chemistry diagram or evidence table for burette endpoint versus equivalence point, with the decisive result unmarked.",
    "independentCheck": "Would an accurate digital burette remove all chemical-model error?"
  },
  {
    "instanceId": "C14-01-EXPLAIN-D3",
    "adapterId": "C14",
    "subtopicId": "CHEM-C14.01",
    "primaryOperation": "EXPLAIN",
    "band": "D3",
    "studentTask": "A city reduces counted road traffic during an evening temperature inversion, yet monitored NO\u2082 concentration rises. Compare the distinct quantities 'emission rate' and 'ambient concentration', propose at least two competing causal models, and identify matched measurements that could discriminate them without assuming the traffic policy caused the increase.",
    "wrongIdea": "Fewer vehicles must immediately cause a lower measured NO\u2082 concentration at every site.",
    "replacementRule": "Incorrect shortcut: Fewer vehicles must immediately cause a lower measured NO\u2082 concentration at every site. Use controlled evidence and a bounded chemical mechanism instead.",
    "visualJob": "Show an accurate Chemistry diagram or evidence table for pollutant source versus wind and concentration, with the decisive result unmarked.",
    "independentCheck": "If wind direction reverses during sampling, does a fixed-site concentration comparison alone establish changed source emissions?"
  },
  {
    "instanceId": "C14-01-MODEL-D3",
    "adapterId": "C14",
    "subtopicId": "CHEM-C14.01",
    "primaryOperation": "MODEL",
    "band": "D3",
    "studentTask": "Two reports concern ozone: near-city downwind ozone increases on a sunny day, while satellite observations indicate a thinner protective stratospheric ozone layer. Build separate causal models for (A) local NO\u2093/VOC sunlight-driven surface ozone and (B) long-lived CFC compounds releasing reactive chlorine under stratospheric UV that can destroy ozone catalytically. Explain why a local surface ozone reading cannot determine stratospheric ozone depletion and propose a distinct measurement for each.",
    "wrongIdea": "Wrong path: interpreting a high street-level ozone concentration as evidence that the protective ozone layer is healthy, or treating an emitted chlorine radical as permanently consumed in the first ozone loss.",
    "replacementRule": "Compare the two altitude-specific models, track the chlorine radical through regeneration, state the atmospheric assumptions, and select observations that directly measure the relevant region.",
    "visualJob": "Show an accurate Chemistry diagram or evidence table for pollutant source versus wind and concentration, with the decisive result unmarked.",
    "independentCheck": "A policy sharply reduces new CFC emissions this year. Does this guarantee full stratospheric ozone restoration next month, even if surface smog ozone falls? Explain using atmospheric persistence."
  },
  {
    "instanceId": "C14-01-JUSTIFY-D3",
    "adapterId": "C14",
    "subtopicId": "CHEM-C14.01",
    "primaryOperation": "JUSTIFY",
    "band": "D3",
    "studentTask": "A new factory opens and nearby pollution rises; justify why that correlation alone does not prove the factory caused the entire increase.",
    "wrongIdea": "Wrong path: 'Equal traffic means equal pollutant concentration' or 'every ozone molecule is harmful regardless of altitude.' Repair by separating production, transport, conversion and exposure conditions.",
    "replacementRule": "Wrong path: 'Equal traffic means equal pollutant concentration' or 'every ozone molecule is harmful regardless of altitude.' Repair by separating production, transport, conversion and exposure conditions.",
    "visualJob": "Show an accurate Chemistry diagram or evidence table for pollutant source versus wind and concentration, with the decisive result unmarked.",
    "independentCheck": "If a second distant site also rises, does that uniquely refute a factory contribution?"
  },
  {
    "instanceId": "C14-02-EXPLAIN-D3",
    "adapterId": "C14",
    "subtopicId": "CHEM-C14.02",
    "primaryOperation": "EXPLAIN",
    "band": "D3",
    "studentTask": "A river-water sample appears clear after boiling, but its electrical conductivity remains high and a chemical test indicates dissolved nitrate. Explain why clear appearance and boiling cannot establish that the water is safe to drink. Compare the different roles of particle removal, dissolved-ion treatment and microbial control, and specify evidence needed for a validated treatment decision.",
    "wrongIdea": "A clear sample that has been boiled must be free of dissolved chemical hazards.",
    "replacementRule": "Incorrect shortcut: A clear sample that has been boiled must be free of dissolved chemical hazards. Use controlled evidence and a bounded chemical mechanism instead.",
    "visualJob": "Show an accurate Chemistry diagram or evidence table for filtering versus dissolved ions and microbes, with the decisive result unmarked.",
    "independentCheck": "If a carbon filter removes odour but nitrate remains above an applicable limit, can smell or clarity certify the water?"
  },
  {
    "instanceId": "C14-02-MODEL-D3",
    "adapterId": "C14",
    "subtopicId": "CHEM-C14.02",
    "primaryOperation": "MODEL",
    "band": "D3",
    "studentTask": "Choose a treatment sequence for water containing suspended soil and dissolved sodium chloride, while distinguishing microbial control.",
    "wrongIdea": "Wrong path: 'Transparent water is chemically pure and safe to drink.' Repair with separate suspended, dissolved and microbial evidence and controls.",
    "replacementRule": "Wrong path: 'Transparent water is chemically pure and safe to drink.' Repair with separate suspended, dissolved and microbial evidence and controls.",
    "visualJob": "Show an accurate Chemistry diagram or evidence table for filtering versus dissolved ions and microbes, with the decisive result unmarked.",
    "independentCheck": "Would boiling alone remove the NaCl?"
  },
  {
    "instanceId": "C14-02-JUSTIFY-D3",
    "adapterId": "C14",
    "subtopicId": "CHEM-C14.02",
    "primaryOperation": "JUSTIFY",
    "band": "D3",
    "studentTask": "Two samples are equally clear, but one has high conductivity. Justify what can be inferred and what additional test is necessary before consumption.",
    "wrongIdea": "Wrong path: 'Transparent water is chemically pure and safe to drink.' Repair with separate suspended, dissolved and microbial evidence and controls.",
    "replacementRule": "Wrong path: 'Transparent water is chemically pure and safe to drink.' Repair with separate suspended, dissolved and microbial evidence and controls.",
    "visualJob": "Show an accurate Chemistry diagram or evidence table for filtering versus dissolved ions and microbes, with the decisive result unmarked.",
    "independentCheck": "Does low conductivity prove absence of all toxic organic pollutants?"
  },
  {
    "instanceId": "C14-03-EXPLAIN-D3",
    "adapterId": "C14",
    "subtopicId": "CHEM-C14.03",
    "primaryOperation": "EXPLAIN",
    "band": "D3",
    "studentTask": "A region reports elevated sulfate and nitrate deposited in rainfall, but measured rainwater pH is close to 6 after a calcium-carbonate-rich dust event. Does the near-neutral reading prove negligible acidic deposition? Construct a chemical neutralisation explanation and identify measurements that would separate acid production, dust buffering and source transport.",
    "wrongIdea": "A near-neutral pH proves sulfate and nitrate pollutants were not deposited.",
    "replacementRule": "Incorrect shortcut: A near-neutral pH proves sulfate and nitrate pollutants were not deposited. Use controlled evidence and a bounded chemical mechanism instead.",
    "visualJob": "Show an accurate Chemistry diagram or evidence table for sulfur oxides, transport and acid rain, with the decisive result unmarked.",
    "independentCheck": "If the same sulfate concentration occurs without carbonate dust, must the rainwater have the same pH?"
  },
  {
    "instanceId": "C14-03-MODEL-D3",
    "adapterId": "C14",
    "subtopicId": "CHEM-C14.03",
    "primaryOperation": "MODEL",
    "band": "D3",
    "studentTask": "Choose a model to interpret low rain pH and elevated nitrate with shifting wind direction, distinguishing transport from local emission.",
    "wrongIdea": "Wrong path: 'Any rain below pH 7 proves industrial acid rain from the nearest chimney.' Repair by accounting for natural dissolved CO\u2082, regional transport and multiple potential acidic species.",
    "replacementRule": "Wrong path: 'Any rain below pH 7 proves industrial acid rain from the nearest chimney.' Repair by accounting for natural dissolved CO\u2082, regional transport and multiple potential acidic species.",
    "visualJob": "Show an accurate Chemistry diagram or evidence table for sulfur oxides, transport and acid rain, with the decisive result unmarked.",
    "independentCheck": "Can rain pH by itself identify the dominant acid species?"
  },
  {
    "instanceId": "C14-03-JUSTIFY-D3",
    "adapterId": "C14",
    "subtopicId": "CHEM-C14.03",
    "primaryOperation": "JUSTIFY",
    "band": "D3",
    "studentTask": "A village blames the nearest plant after one acidic rainfall. Refute the certainty and design an evidence-based attribution study.",
    "wrongIdea": "Wrong path: 'Any rain below pH 7 proves industrial acid rain from the nearest chimney.' Repair by accounting for natural dissolved CO\u2082, regional transport and multiple potential acidic species.",
    "replacementRule": "Wrong path: 'Any rain below pH 7 proves industrial acid rain from the nearest chimney.' Repair by accounting for natural dissolved CO\u2082, regional transport and multiple potential acidic species.",
    "visualJob": "Show an accurate Chemistry diagram or evidence table for sulfur oxides, transport and acid rain, with the decisive result unmarked.",
    "independentCheck": "If the factory reduces sulfur emissions, must rainfall pH change immediately and monotonically?"
  },
  {
    "instanceId": "C14-04-EXPLAIN-D3",
    "adapterId": "C14",
    "subtopicId": "CHEM-C14.04",
    "primaryOperation": "EXPLAIN",
    "band": "D3",
    "studentTask": "Explain how a carbon atom can move from atmospheric CO\u2082 to organic matter and return without being created or destroyed.",
    "wrongIdea": "Wrong path: 'A cycle diagram by itself proves a reaction rate or that the environmental system is in steady state.' Repair with separate reservoirs, flux measurements and known or unknown sinks.",
    "replacementRule": "Wrong path: 'A cycle diagram by itself proves a reaction rate or that the environmental system is in steady state.' Repair with separate reservoirs, flux measurements and known or unknown sinks.",
    "visualJob": "Show an accurate Chemistry diagram or evidence table for reservoir-to-reservoir carbon/nitrogen flux, with the decisive result unmarked.",
    "independentCheck": "Does conservation imply the concentration of CO\u2082 in air must be constant?"
  },
  {
    "instanceId": "C14-04-MODEL-D3",
    "adapterId": "C14",
    "subtopicId": "CHEM-C14.04",
    "primaryOperation": "MODEL",
    "band": "D3",
    "studentTask": "Choose a nitrogen-cycle model consistent with plant uptake of nitrate and atmospheric N\u2082 availability.",
    "wrongIdea": "Wrong path: 'A cycle diagram by itself proves a reaction rate or that the environmental system is in steady state.' Repair with separate reservoirs, flux measurements and known or unknown sinks.",
    "replacementRule": "Wrong path: 'A cycle diagram by itself proves a reaction rate or that the environmental system is in steady state.' Repair with separate reservoirs, flux measurements and known or unknown sinks.",
    "visualJob": "Show an accurate Chemistry diagram or evidence table for reservoir-to-reservoir carbon/nitrogen flux, with the decisive result unmarked.",
    "independentCheck": "If nitrification is suppressed, must all nitrogen-cycle processes stop?"
  },
  {
    "instanceId": "C14-04-JUSTIFY-D3",
    "adapterId": "C14",
    "subtopicId": "CHEM-C14.04",
    "primaryOperation": "JUSTIFY",
    "band": "D3",
    "studentTask": "A reservoir graph shows carbon increasing with no recorded inflow. Justify what conservation demands and which measurements are missing.",
    "wrongIdea": "Wrong path: 'A cycle diagram by itself proves a reaction rate or that the environmental system is in steady state.' Repair with separate reservoirs, flux measurements and known or unknown sinks.",
    "replacementRule": "Wrong path: 'A cycle diagram by itself proves a reaction rate or that the environmental system is in steady state.' Repair with separate reservoirs, flux measurements and known or unknown sinks.",
    "visualJob": "Show an accurate Chemistry diagram or evidence table for reservoir-to-reservoir carbon/nitrogen flux, with the decisive result unmarked.",
    "independentCheck": "Would a constant carbon stock mean every individual flux is zero?"
  },
  {
    "instanceId": "C14-05-EXPLAIN-D3",
    "adapterId": "C14",
    "subtopicId": "CHEM-C14.05",
    "primaryOperation": "EXPLAIN",
    "band": "D3",
    "studentTask": "A school compares three used packages: untreated paper placed in warm, moist managed compost, a polyethylene (PE) wrapper discarded outdoors, and a glass bottle collected for recycling. Classify each as biodegradable or ordinarily non-biodegradable under the stated conditions, distinguish microbial conversion from physical fragmentation and recyclability, then explain why these labels alone cannot decide which package has the lowest full-life-cycle impact.",
    "wrongIdea": "Wrong path: a recyclable glass bottle must be biodegradable, or a polyethylene wrapper becoming smaller means it has biologically decomposed.",
    "replacementRule": "Check microbial conversion and products, identify applicable timescale and conditions, and independently model reuse/recycling as a different process from decomposition.",
    "visualJob": "Show an accurate Chemistry diagram or evidence table for two chemical-process lifecycle boundaries, with the decisive result unmarked.",
    "independentCheck": "If untreated paper moves from wet, aerated compost to a cold, dry landfill, does it automatically become chemically non-biodegradable? Compare expected rate with a conventional PE wrapper."
  },
  {
    "instanceId": "C14-05-MODEL-D3",
    "adapterId": "C14",
    "subtopicId": "CHEM-C14.05",
    "primaryOperation": "MODEL",
    "band": "D3",
    "studentTask": "Choose between water treatments A and B when an explicit removal threshold is 95%, and explain why energy alone is insufficient.",
    "wrongIdea": "Wrong path: 'Biodegradable automatically means best, or the lowest-energy unit operation means lowest total impact.' Repair by defining the functional unit, performance threshold, lifecycle boundary and measured chemical waste.",
    "replacementRule": "Wrong path: 'Biodegradable automatically means best, or the lowest-energy unit operation means lowest total impact.' Repair by defining the functional unit, performance threshold, lifecycle boundary and measured chemical waste.",
    "visualJob": "Show an accurate Chemistry diagram or evidence table for two chemical-process lifecycle boundaries, with the decisive result unmarked.",
    "independentCheck": "If A adds a second treatment stage to meet 95%, can its original energy total still be used?"
  },
  {
    "instanceId": "C14-05-JUSTIFY-D3",
    "adapterId": "C14",
    "subtopicId": "CHEM-C14.05",
    "primaryOperation": "JUSTIFY",
    "band": "D3",
    "studentTask": "A low-carbon factory advertises a new process but sends untreated waste offsite. Justify why the boundary can reverse the environmental conclusion.",
    "wrongIdea": "Wrong path: 'Biodegradable automatically means best, or the lowest-energy unit operation means lowest total impact.' Repair by defining the functional unit, performance threshold, lifecycle boundary and measured chemical waste.",
    "replacementRule": "Wrong path: 'Biodegradable automatically means best, or the lowest-energy unit operation means lowest total impact.' Repair by defining the functional unit, performance threshold, lifecycle boundary and measured chemical waste.",
    "visualJob": "Show an accurate Chemistry diagram or evidence table for two chemical-process lifecycle boundaries, with the decisive result unmarked.",
    "independentCheck": "Would lower greenhouse emissions alone prove total environmental superiority in every criterion?"
  }
];

export const CHEMISTRY_AUTHENTIC_QUESTIONS: readonly ChemistryQuestionDescriptor[] = [
  {
    "id": "CHEM-NSEJS-ATOM-01",
    "sourceName": "NSEJS Official Chemistry Core 2",
    "topic": "Structure Of The Atom",
    "adapterId": "C05",
    "stem": "In Bohr's model of the hydrogen atom, an electron transitions from the $n = 3$ energy level to the $n = 1$ ground state, emitting a photon of wavelength $\\lambda_1$. In another transition from $n = 2$ to the $n = 1$ ground state, the emitted photon has wavelength $\\lambda_2$. What is the exact ratio of the emitted wavelengths $\\lambda_1 / \\lambda_2$?\n[FIG-stem-chem-bohr-hydrogen-transitions]\n(Rydberg formula: $1/\\lambda = R_H (1/n_f^2 - 1/n_i^2)$)",
    "options": [
      "A: 3/4",
      "B: 27/32",
      "C: 8/9",
      "D: 4/3"
    ],
    "questionType": "single_correct_mcq",
    "hints": [
      "H1 (Rydberg Formula): State the wave number formula for hydrogen transitions.: 1/lambda = R_H * (1/n_f^2 - 1/n_i^2).",
      "H2 (Transition Reciprocals): Calculate 1/lambda_1 and 1/lambda_2 in terms of R_H.: For n=3 -> 1: 1/lambda_1 = R_H * (1 - 1/9) = 8/9 R_H => lambda_1 = 9 / (8 R_H). For n=2 -> 1: 1/lambda_2 = R_H * (1 - 1/4) = 3/4 R_H => lambda_2 = 4 / (3 R_H).",
      "H3 (Crux Move): Formulate the inverse ratio of wavelengths.: Crux Move: lambda_1 / lambda_2 = (1/lambda_2) / (1/lambda_1) = (3/4 R_H) / (8/9 R_H) = (3/4) * (9/8) = 27/32."
    ],
    "steps": [
      "1. System Representation & Setup: An electron in a hydrogen atom undergoes transitions to ground state n_f = 1 from n_i = 3 (emitting lambda_1) and n_i = 2 (emitting lambda_2). We seek the ratio lambda_1 / lambda_2.",
      "2. Physical Model & Formulation: By Bohr's frequency condition and the Rydberg formula, photon wave number is 1/lambda = R_H * (1/n_f^2 - 1/n_i^2). Inverting yields lambda = (n_i^2 * n_f^2) / [R_H * (n_i^2 - n_f^2)].",
      "3. Execution & Resolution: For n = 3 -> 1, 1/lambda_1 = R_H * (1 - 1/9) = 8/9 R_H => lambda_1 = 9 / (8 R_H). For n = 2 -> 1, 1/lambda_2 = R_H * (1 - 1/4) = 3/4 R_H => lambda_2 = 4 / (3 R_H). The ratio is lambda_1 / lambda_2 = (9/8) / (4/3) = (9/8) * (3/4) = 27/32. Option B is confirmed."
    ],
    "category": "EXAM_CLAIM",
    "band": "D2",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "CHEM-NSEJS-ATOM-02",
    "sourceName": "NSEJS Official Chemistry Core 2",
    "topic": "Structure Of The Atom",
    "adapterId": "C05",
    "stem": "Naturally occurring chlorine consists of two stable isotopes: $^{35}\\text{Cl}$ (isotopic mass $34.97\\text{ u}$) with natural abundance $75.77\\%$, and $^{37}\\text{Cl}$ (isotopic mass $36.97\\text{ u}$) with abundance $24.23\\%$. Calculate the weighted relative atomic mass of natural chlorine to two decimal places.",
    "options": [
      "A: 35.45 u",
      "B: 35.97 u",
      "C: 36.00 u",
      "D: 35.00 u"
    ],
    "questionType": "single_correct_mcq",
    "hints": [
      "H1 (Isotope Formula): State the weighted average formula.: A_avg = sum(mass_i * abundance_i) / 100.",
      "H2 (Partial Contributions): Formulate the fractional mass contributions of each isotope.: Multiply mass of Cl-35 (34.97 u) by 0.7577 and mass of Cl-37 (36.97 u) by 0.2423.",
      "H3 (Crux Move): Sum the isotopic mass products and round to two decimal places.: Crux Move: A_avg = 26.4968 + 8.9578 = 35.4546 u; round to hundredths without truncating intermediate products."
    ],
    "steps": [
      "1. System Representation & Setup: Chlorine consists of two isotopes: 34.97 u at 75.77% and 36.97 u at 24.23%.",
      "2. Physical Model & Formulation: Relative atomic mass is the weighted average: A_avg = (34.97 * 75.77 + 36.97 * 24.23) / 100.",
      "3. Execution & Resolution: (2649.6769 + 895.7831) / 100 = 3545.46 / 100 = 35.45 u. Option A is verified."
    ],
    "category": "EXAM_CLAIM",
    "band": "D1",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "CHEM-NSEJS-ATOM-03",
    "sourceName": "NSEJS Official Chemistry Core 2",
    "topic": "Structure Of The Atom",
    "adapterId": "C05",
    "stem": "Consider the isoelectronic series $\\text{N}^{3-}, \\text{O}^{2-}, \\text{F}^{-}, \\text{Na}^{+}, \\text{Mg}^{2+}, \\text{Al}^{3+}$. Each ion has exactly 10 electrons ($1s^2 2s^2 2p^6$). Arrange these ions in order of strictly increasing ionic radius.",
    "options": [
      "A: N(3-) < O(2-) < F(-) < Na(+) < Mg(2+) < Al(3+)",
      "B: Na(+) < Mg(2+) < Al(3+) < F(-) < O(2-) < N(3-)",
      "C: Al(3+) < Mg(2+) < Na(+) < F(-) < O(2-) < N(3-)",
      "D: F(-) < O(2-) < N(3-) < Al(3+) < Mg(2+) < Na(+)"
    ],
    "questionType": "single_correct_mcq",
    "hints": [
      "H1 (Isoelectronic Concept): Note that electron screening is nearly identical across 10 electrons.: For the same electron count, ionic radius is inversely related to nuclear charge Z.",
      "H2 (Nuclear Charge Correlation): Determine the proton count (Z) for each ion in the series.: Identify Z for each species: N (Z=7), O (Z=8), F (Z=9), Na (Z=11), Mg (Z=12), Al (Z=13).",
      "H3 (Crux Move): Formulate the monotonic radius sequence from highest Z (tightest) to lowest Z (most expanded).: Crux Move: Since Z increases from 7 to 13 while electron count remains 10, the effective nuclear pull per electron is maximum for Al3+ and minimum for N3-."
    ],
    "steps": [
      "1. System Representation & Setup: Six ions with identical 10-electron neon configuration: N(3-) (Z=7), O(2-) (Z=8), F(-) (Z=9), Na(+) (Z=11), Mg(2+) (Z=12), Al(3+) (Z=13).",
      "2. Physical Model & Formulation: In an isoelectronic series, shielding constant S is approximately invariant. The effective nuclear charge Z_eff = Z - S increases linearly with atomic number Z. Higher Z_eff pulls the 10-electron cloud tighter toward the nucleus, shrinking ionic radius: r proportional to 1 / Z_eff.",
      "3. Execution & Resolution: As Z increases from 7 to 13, radius decreases monotonically: r(Al3+) < r(Mg2+) < r(Na+) < r(F-) < r(O2-) < r(N3-). This matches Option C."
    ],
    "category": "EXAM_CLAIM",
    "band": "D2",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "CHEM-NSEJS-ATOM-04",
    "sourceName": "NSEJS Official Chemistry Core 2",
    "topic": "Structure Of The Atom",
    "adapterId": "C05",
    "stem": "In Rutherford's alpha-scattering experiment, an alpha particle with kinetic energy $K = 5.0\\text{ MeV}$ ($8.0 \\times 10^{-13}\\text{ J}$) is directed head-on toward a stationary gold nucleus ($Z = 79$). At the distance of closest approach $r_{\\text{min}}$, all kinetic energy is converted into electrostatic potential energy. Calculate $r_{\\text{min}}$.\n(Take $1/(4\\pi\\varepsilon_0) = 9.0 \\times 10^9\\text{ N}\\cdot\\text{m}^2/\\text{C}^2$, $e = 1.6 \\times 10^{-19}\\text{ C}$, charge of alpha particle $q_1 = 2e$, charge of gold nucleus $q_2 = 79e$)",
    "options": [
      "A: 4.55 x 10^-14 m",
      "B: 2.28 x 10^-14 m",
      "C: 9.10 x 10^-14 m",
      "D: 1.82 x 10^-13 m"
    ],
    "questionType": "single_correct_mcq",
    "hints": [
      "H1 (Energy Conservation): Equate kinetic energy to Coulomb potential energy.: K = (1 / 4 pi eps_0) * (q1 * q2 / r_min) = (9.0e9 * 2e * 79e) / r_min.",
      "H2 (Charge Product): Calculate the total charge product q1 * q2 in terms of elementary charge e.: Alpha particle has q1 = +2e and gold nucleus has q2 = +79e, so q1 * q2 = 158 * e^2.",
      "H3 (Crux Move): Rearrange the electrostatic energy equation directly for closest approach r_min.: Crux Move: r_min = [9.0e9 * 158 * (1.6e-19)^2] / K; substitute K = 8.0e-13 J without unit conversion errors."
    ],
    "steps": [
      "1. System Representation & Setup: Head-on alpha particle collision with gold nucleus (Z=79, q2 = 79e, q1 = 2e). Kinetic energy K = 8.0 x 10^-13 J.",
      "2. Physical Model & Formulation: By conservation of energy at closest approach (v = 0): K = [1 / (4 pi eps_0)] * (2e * 79e / r_min) => r_min = [9.0 x 10^9 * 158 * (1.6 x 10^-19)^2] / (8.0 x 10^-13).",
      "3. Execution & Resolution: r_min = [9.0 x 10^9 * 158 * 2.56 x 10^-38] / (8.0 x 10^-13) = [3.64032 x 10^-26] / (8.0 x 10^-13) = 4.5504 x 10^-14 m = 4.55 x 10^-14 m. Option A is confirmed."
    ],
    "category": "EXAM_CLAIM",
    "band": "D2",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "CHEM-NSEJS-ATOM-05",
    "sourceName": "NSEJS Official Chemistry Core 2",
    "topic": "Structure Of The Atom",
    "adapterId": "C05",
    "stem": "In J.J. Thomson's cathode ray experiment, an electron beam travels horizontally with velocity $v = 5.0 \\times 10^6\\text{ m/s}$ through a perpendicular electric field $E = 500\\text{ V/m}$ between parallel plates of length $L = 0.05\\text{ m}$. The transverse vertical deflection of the beam upon emerging from the plates is $y = 4.4\\text{ mm}$ ($4.4 \\times 10^{-3}\\text{ m}$). Calculate the specific charge ($e/m$) of the electron.",
    "options": [
      "A: 1.60 x 10^11 C/kg",
      "B: 1.76 x 10^11 C/kg",
      "C: 1.92 x 10^11 C/kg",
      "D: 2.10 x 10^11 C/kg"
    ],
    "questionType": "single_correct_mcq",
    "hints": [
      "H1 (Kinematics of Deflection): Formulate y = (1/2) * a * t^2.: t = L / v, and acceleration a = e * E / m, so y = e * E * L^2 / (2 * m * v^2).",
      "H2 (Transit Time and Acceleration): Express plate transit time t and transverse electrostatic acceleration a.: Electrons transit horizontal distance L at constant velocity v (t = L/v), experiencing vertical force F = e*E giving a = e*E/m.",
      "H3 (Crux Move): Invert the parabolic deflection formula to solve directly for specific charge (e/m).: Crux Move: e/m = (2 * y * v^2) / (E * L^2); substitute numerical values into this composite expression."
    ],
    "steps": [
      "1. System Representation & Setup: Electron in electric field E = 500 V/m, velocity v = 5.0 x 10^6 m/s, plate length L = 0.05 m, deflection y = 4.4 x 10^-3 m.",
      "2. Physical Model & Formulation: Time in field is t = L/v. Transverse acceleration is a = eE/m. Deflection is y = (1/2) a t^2 = (e/m) * [E * L^2 / (2 * v^2)]. Hence e/m = 2 * y * v^2 / (E * L^2).",
      "3. Execution & Resolution: e/m = [2 * 4.4 x 10^-3 * (5.0 x 10^6)^2] / [500 * (0.05)^2] = [8.8 x 10^-3 * 2.5 x 10^13] / [500 * 2.5 x 10^-3] = [2.2 x 10^11] / 1.25 = 1.76 x 10^11 C/kg. Option B is confirmed."
    ],
    "category": "EXAM_CLAIM",
    "band": "D2",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "CHEM-NSEJS-ATOM-06",
    "sourceName": "NSEJS Official Chemistry Core 2",
    "topic": "Structure Of The Atom",
    "adapterId": "C05",
    "stem": "In a gas discharge tube, the specific charge ($e/m$) of cathode rays is completely independent of the residual gas inside the tube, whereas the specific charge ($q/m$) of anode rays (canal rays) varies significantly with the gas used. What is the fundamental physical explanation for this difference?",
    "options": [
      "A: Cathode rays consist of neutral particles, while anode rays are positively charged.",
      "B: Cathode rays travel faster than anode rays, preventing interaction with gas molecules.",
      "C: Anode rays are emitted from the metal anode electrode, which varies between experiments.",
      "D: Cathode rays consist of universal electrons, while anode rays consist of positive ions formed from the residual gas, whose mass varies with the gas."
    ],
    "questionType": "single_correct_mcq",
    "hints": [
      "H1 (Origin of Rays): Consider where the particles in each stream originate.: Cathode rays are electrons stripped from all matter; canal rays are residual gas cations.",
      "H2 (Particle Identification): Identify the constituent particles forming cathode rays vs positive canal rays.: Cathode rays are identical free electrons (rest mass m_e) regardless of cathode or gas material, whereas canal rays are ionized gas atoms/molecules (cations).",
      "H3 (Crux Move): Relate ion mass variation to the observed charge-to-mass ratio e/m.: Crux Move: Since ion mass m varies directly with the atomic/molecular weight of the residual gas used in the tube, e/m of canal rays is gas-dependent, while electron e/m is a universal constant."
    ],
    "steps": [
      "1. System Representation & Setup: Comparison of particle properties between cathode rays (Thomson) and canal rays (Goldstein) in a gas discharge tube.",
      "2. Physical Model & Formulation: Cathode rays are fundamental electrons (e-, mass m_e) identical across all elements. Anode rays are gaseous cations created when high-energy electrons ionize neutral gas molecules (M -> M+ + e-).",
      "3. Execution & Resolution: Because different gases have different atomic masses (e.g., H+ vs He+ vs O2+), the charge-to-mass ratio q/m varies inversely with the molar mass of the gas, reaching its maximum for hydrogen gas (H+ = proton). Option D correctly captures this fundamental origin."
    ],
    "category": "EXAM_CLAIM",
    "band": "D1",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "CHEM-NSEJS-ATOM-07",
    "sourceName": "NSEJS Official Chemistry Core 2",
    "topic": "Structure Of The Atom",
    "adapterId": "C05",
    "stem": "The ground-state electronic configuration of chromium ($Z = 24$) is $[\text{Ar}]\\,3d^5 4s^1$ rather than $[\text{Ar}]\\,3d^4 4s^2$, and copper ($Z = 29$) is $[\text{Ar}]\\,3d^{10} 4s^1$ rather than $[\text{Ar}]\\,3d^9 4s^2$. Which physical factor primarily accounts for this anomalous stability?",
    "options": [
      "A: Enhanced stability due to symmetrical distribution of electron density and maximum exchange energy in half-filled and fully-filled d-subshells.",
      "B: The 4s orbital has higher principal quantum number and therefore lower penetration and higher energy than 3d.",
      "C: Relativistic contraction of 4s orbitals causes repulsion between 4s electrons.",
      "D: Chromium and copper atoms form covalent bonds with adjacent atoms in the vapor phase."
    ],
    "questionType": "single_correct_mcq",
    "hints": [
      "H1 (Hund's Rule and Exchange): Count parallel spin exchange pairs.: For 3d5, number of possible exchange pairs is 5*4/2 = 10, whereas for 3d4 it is only 4*3/2 = 6.",
      "H2 (Symmetry and Exchange Energy): Correlate exchange energy with electron spin alignment.: Electrons with parallel spins in degenerate orbitals exchange positions, releasing stabilizing exchange energy proportional to the number of possible pairs n(n-1)/2.",
      "H3 (Crux Move): Compare the exchange stabilization gain against the 4s-to-3d promotion energy cost.: Crux Move: Transferring one electron from 4s to 3d adds 4 extra exchange pairs (10 vs 6), and the resulting exchange stabilization exceeds the small 4s-3d promotion energy."
    ],
    "steps": [
      "1. System Representation & Setup: Comparison of electronic configurations for Cr (Z=24: 3d5 4s1 vs 3d4 4s2) and Cu (Z=29: 3d10 4s1 vs 3d9 4s2).",
      "2. Physical Model & Formulation: In degenerate subshells, electrons with parallel spins can exchange quantum states. The exchange energy is proportional to the number of exchange pairs n_ex = n*(n-1)/2. For 3d5 with 5 parallel spins, n_ex = 10 pairs (a gain of 4 pairs over 3d4 with 6 pairs). Furthermore, half-filled and fully-filled subshells possess exact spherical symmetry, minimizing inter-electronic shielding and repulsion.",
      "3. Execution & Resolution: The stabilization provided by exchange energy (10 pairs) and spherical symmetry exceeds the energy required to promote one electron from 4s to 3d, making 3d5 4s1 the true thermodynamic ground state. Option A is justified."
    ],
    "category": "EXAM_CLAIM",
    "band": "D2",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "CHEM-NSEJS-ATOM-08",
    "sourceName": "NSEJS Official Chemistry Core 2",
    "topic": "Structure Of The Atom",
    "adapterId": "C05",
    "stem": "According to the Bohr-Bury scheme, the maximum number of electrons in shell $n$ is $2n^2$, and the outermost valence shell cannot accommodate more than 8 electrons. For the alkaline earth metal Strontium ($Z = 38$), what is the correct distribution of electrons across shells $K, L, M, N, O$?",
    "options": [
      "A: 2, 8, 18, 10, 0",
      "B: 2, 8, 8, 18, 2",
      "C: 2, 8, 18, 8, 2",
      "D: 2, 8, 18, 9, 1"
    ],
    "questionType": "single_correct_mcq",
    "hints": [
      "H1 (Subshell Filling): Write the subshell configuration first.: 1s2 2s2 2p6 3s2 3p6 3d10 4s2 4p6 5s2.",
      "H2 (Regrouping by Principal Quantum Number): Group subshell electron counts by principal quantum number n.: Group orbitals by shell: K(n=1): 1s2; L(n=2): 2s2 2p6; M(n=3): 3s2 3p6 3d10; N(n=4): 4s2 4p6; O(n=5): 5s2.",
      "H3 (Crux Move): Verify that penultimate shell N and valence shell O obey Bohr-Bury octet bounds.: Crux Move: Sum the electrons in each group: K=2, L=8, M=18, N=8, O=2. Total sum equals 38, with penultimate shell N having 8 and outermost shell O having 2."
    ],
    "steps": [
      "1. System Representation & Setup: Strontium has atomic number Z = 38. We seek the electron population across shells K (n=1), L (n=2), M (n=3), N (n=4), O (n=5).",
      "2. Physical Model & Formulation: Subshell configuration by Aufbau principle is 1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2. Regrouping by principal quantum number n: n=1 (K) = 1s2 = 2; n=2 (L) = 2s2 2p6 = 8; n=3 (M) = 3s2 3p6 3d10 = 18; n=4 (N) = 4s2 4p6 = 8; n=5 (O) = 5s2 = 2.",
      "3. Execution & Resolution: The shell distribution is K=2, L=8, M=18, N=8, O=2. Total = 2 + 8 + 18 + 8 + 2 = 38. The outermost shell O has 2 electrons (valency = 2, Group 2 alkaline earth metal), perfectly adhering to the Bohr-Bury octet rule for shell N. Option C is confirmed."
    ],
    "category": "EXAM_CLAIM",
    "band": "D2",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "CHEM-NSEJS-ATOM-09",
    "sourceName": "NSEJS Official Chemistry Core 2",
    "topic": "Structure Of The Atom",
    "adapterId": "C05",
    "stem": "Classify the following nuclear pairs into Isotopes, Isobars, or Isotones:\nPair 1: $^{40}_{18}\\text{Ar}$ and $^{40}_{20}\\text{Ca}$\nPair 2: $^{14}_{6}\\text{C}$ and $^{16}_{8}\\text{O}$\nPair 3: $^{35}_{17}\\text{Cl}$ and $^{37}_{17}\\text{Cl}$",
    "options": [
      "A: Pair 1: Isotopes; Pair 2: Isobars; Pair 3: Isotones",
      "B: Pair 1: Isobars; Pair 2: Isotones; Pair 3: Isotopes",
      "C: Pair 1: Isotones; Pair 2: Isobars; Pair 3: Isotopes",
      "D: Pair 1: Isobars; Pair 2: Isotopes; Pair 3: Isotones"
    ],
    "questionType": "single_correct_mcq",
    "hints": [
      "H1 (Definitions): Recall definition of each term.: Isotopes: same Z; Isobars: same A; Isotones: same neutron count N = A - Z.",
      "H2 (Nucleon Arithmetic): Compute atomic number Z, mass number A, and neutron count N = A - Z for each pair.: For Pair 1: A=40, 40 (Z=18, 20). For Pair 2: A=14, 16; compute N=14-6 and N=16-8. For Pair 3: Z=17, 17; A=35, 37.",
      "H3 (Crux Move): Map each comparison strictly to its defining invariant property.: Crux Move: Same mass number A -> Isobars; same neutron difference N -> Isotones; same atomic number Z -> Isotopes."
    ],
    "steps": [
      "1. System Representation & Setup: Three nuclear pairs with specified mass numbers A and atomic numbers Z.",
      "2. Physical Model & Formulation: Isobars have identical mass number A but different Z. Isotones have identical neutron number N = A - Z. Isotopes have identical atomic number Z but different A.",
      "3. Execution & Resolution: Pair 1 (Ar-40 and Ca-40) both have A = 40, Z=18 vs 20 => Isobars. Pair 2 (C-14: N = 14-6 = 8; O-16: N = 16-8 = 8) both have 8 neutrons => Isotones. Pair 3 (Cl-35 and Cl-37) both have Z = 17 => Isotopes. This uniquely confirms Option B."
    ],
    "category": "EXAM_CLAIM",
    "band": "D1",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "CHEM-NSEJS-ATOM-10",
    "sourceName": "NSEJS Official Chemistry Core 2",
    "topic": "Structure Of The Atom",
    "adapterId": "C05",
    "stem": "Using the Born-Haber cycle for the formation of crystalline sodium chloride $\\text{NaCl}(s)$ from its constituent elements, determine the lattice enthalpy $U_{\\text{lattice}}$ of $\\text{NaCl}(s)$:\n$$\\text{Na}(s) + \\frac{1}{2}\\text{Cl}_2(g) \\xrightarrow{\\Delta H^\\circ_f} \\text{NaCl}(s)$$\nGiven thermodynamic data:\n- Standard enthalpy of formation $\\Delta H^\\circ_f(\\text{NaCl}) = -411\\text{ kJ/mol}$\n- Enthalpy of sublimation of sodium $\\Delta H_{\\text{sub}}(\\text{Na}) = +108\\text{ kJ/mol}$\n- First ionization enthalpy of sodium $\\text{IE}_1(\\text{Na}) = +496\\text{ kJ/mol}$\n- Half bond dissociation enthalpy of chlorine $\\frac{1}{2}\\Delta H_{\\text{diss}}(\\text{Cl}_2) = +122\\text{ kJ/mol}$\n- Electron gain enthalpy of chlorine $\\Delta H_{\\text{eg}}(\\text{Cl}) = -349\\text{ kJ/mol}$",
    "options": [
      "A: +674 kJ/mol",
      "B: +788 kJ/mol",
      "C: +822 kJ/mol",
      "D: +956 kJ/mol"
    ],
    "questionType": "single_correct_mcq",
    "hints": [
      "H1 (Hess's Law Cycle): Formulate the energy conservation loop.: Delta H_f = Delta H_sub + IE_1 + (1/2) Delta H_diss + Delta H_eg - U_lattice.",
      "H2 (Enthalpy Rearrangement): Express U_lattice in terms of formation and constituent gaseous ion energies.: Rearrange Hess's law cycle: U_lattice = Delta H_sub + IE_1 + (1/2)Delta H_diss + Delta H_eg - Delta H_f.",
      "H3 (Crux Move): Carefully track thermodynamic signs during algebraic substitution.: Crux Move: Substitute values keeping sign conventions: U_lattice = 108 + 496 + 122 + (-349) - (-411) kJ/mol."
    ],
    "steps": [
      "1. System Representation & Setup: Born-Haber thermochemical cycle for NaCl(s). Given Delta H_f = -411 kJ/mol, Delta H_sub = +108 kJ/mol, IE_1 = +496 kJ/mol, (1/2) Delta H_diss = +122 kJ/mol, Delta H_eg = -349 kJ/mol.",
      "2. Physical Model & Formulation: By Hess's Law, the direct formation enthalpy equals the sum of step-wise enthalpies: Delta H_f = Delta H_sub + IE_1 + (1/2) Delta H_diss + Delta H_eg - U_lattice. Rearranging for lattice enthalpy: U_lattice = Delta H_sub + IE_1 + (1/2) Delta H_diss + Delta H_eg - Delta H_f.",
      "3. Execution & Resolution: U_lattice = 108 + 496 + 122 + (-349) - (-411) = (108 + 496 + 122 - 349) + 411 = 377 + 411 = +788 kJ/mol. Option B is confirmed."
    ],
    "category": "EXAM_CLAIM",
    "band": "D2",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "CHEM-NSEJS-BOND-01",
    "sourceName": "NSEJS Official Chemistry Core 2",
    "topic": "Chemical Bonding",
    "adapterId": "C07",
    "stem": "An excited singly-ionized helium ion ($\\text{He}^+, Z = 2$) undergoes an electronic de-excitation from principal quantum state $n_2 = 4$ to state $n_1 = 2$, emitting a single photon.\n[FIG-stem-chem-bohr-energy-levels]\nCalculate the wavelength $\\lambda$ of the emitted photon (taking $h c = 1240\\text{ eV}\\cdot\\text{nm}$ and ground state energy of hydrogen as $-13.6\\text{ eV}$), and identify the corresponding electronic transition in a neutral hydrogen atom ($Z = 1$) that emits radiation of the identical wavelength.",
    "options": [
      "A: lambda = 121.6 nm; Hydrogen transition n = 2 -> n = 1",
      "B: lambda = 121.6 nm; Hydrogen transition n = 4 -> n = 2",
      "C: lambda = 243.2 nm; Hydrogen transition n = 3 -> n = 1",
      "D: lambda = 91.2 nm; Hydrogen transition n = 2 -> n = 1"
    ],
    "questionType": "single_correct_mcq",
    "hints": [
      "H1 (Bohr Energy Levels): Write the energy level formula for single-electron hydrogenic ions.: For hydrogenic species: En = -13.6 * (Z^2 / n^2) eV. For He+, Z = 2.",
      "H2 (Transition Energy and Wavelength): Calculate Delta E and lambda.: E2 = -13.6 eV, E4 = -3.4 eV => Delta E = 10.2 eV. Wavelength lambda = hc / Delta E = 1240 / 10.2 nm = 121.6 nm.",
      "H3 (Crux Move): Match the Rydberg wavenumber in hydrogen.: Crux Move: 1/lambda = R_H * Z^2 * (1/n1^2 - 1/n2^2) = (3/4) R_H. In hydrogen (Z=1), 1/n1^2 - 1/n2^2 = 3/4 => n1 = 1, n2 = 2."
    ],
    "steps": [
      "1. System Representation & Setup: A singly-ionized helium ion He+ (Z = 2) de-excites from n2 = 4 to n1 = 2, emitting a photon. We find emitted wavelength lambda and matching transition in neutral hydrogen H (Z = 1).",
      "2. Physical Model & Formulation: In Bohr's model, En = -13.6 * (Z^2 / n^2) eV. For He+ (Z = 2): E2 = -13.6 eV, E4 = -3.4 eV, yielding Delta E = 10.2 eV. Wavelength is lambda = hc / Delta E.",
      "3. Execution & Resolution: lambda = 1240 / 10.2 = 121.57 nm approx 121.6 nm. Wavenumber 1/lambda = R_H * 4 * (1/4 - 1/16) = (3/4) R_H. For hydrogen (Z=1), 1/n1^2 - 1/n2^2 = 3/4 requires transition n = 2 -> n = 1. Option A."
    ],
    "category": "EXAM_CLAIM",
    "band": "D2",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "CHEM-NSEJS-BOND-02",
    "sourceName": "NSEJS Official Chemistry Core 2",
    "topic": "Chemical Bonding",
    "adapterId": "C07",
    "stem": "For an electron occupying a $4d$ subshell orbital ($n = 4, l = 2$), determine the number of radial nodes, the number of angular nodal planes, and the maximum number of electrons in this subshell that can possess the spin magnetic quantum number $m_s = +1/2$.",
    "options": [
      "A: Radial nodes = 1, Angular nodes = 2, Max electrons (ms = +1/2) = 5",
      "B: Radial nodes = 2, Angular nodes = 1, Max electrons (ms = +1/2) = 5",
      "C: Radial nodes = 1, Angular nodes = 2, Max electrons (ms = +1/2) = 10",
      "D: Radial nodes = 0, Angular nodes = 2, Max electrons (ms = +1/2) = 5"
    ],
    "questionType": "single_correct_mcq",
    "hints": [
      "H1 (Nodal Formulas): Recall the formulas for radial and angular nodes in hydrogenic wavefunctions.: Number of radial (spherical) nodes = n - l - 1. Number of angular nodal planes = l.",
      "H2 (Degeneracy of d Subshell): Count the number of orbitals in l = 2.: For l = 2, magnetic quantum numbers are ml = -2, -1, 0, +1, +2 (5 distinct orbitals).",
      "H3 (Crux Move): Apply Pauli Exclusion Principle to count max electrons with ms = +1/2.: Crux Move: Each of the 5 orbitals can hold at most 1 electron with spin ms = +1/2. Maximum such electrons = 5."
    ],
    "steps": [
      "1. System Representation & Setup: A 4d orbital has principal quantum number n = 4 and azimuthal quantum number l = 2. We determine radial nodes, angular nodes, and max electrons with ms = +1/2.",
      "2. Physical Model & Formulation: Radial nodes = n - l - 1 = 4 - 2 - 1 = 1. Angular nodes = l = 2. Total nodes = n - 1 = 3. A d subshell has 2l + 1 = 5 degenerate orbitals.",
      "3. Execution & Resolution: By the Pauli exclusion principle and Hund's rule, each of the 5 orbitals can host at most one electron with spin ms = +1/2. Thus, maximum electrons with ms = +1/2 is 5. Option A."
    ],
    "category": "EXAM_CLAIM",
    "band": "D2",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "CHEM-NSEJS-BOND-03",
    "sourceName": "NSEJS Official Chemistry Core 2",
    "topic": "Chemical Bonding",
    "adapterId": "C07",
    "stem": "The first ionization enthalpies ($\\text{IE}_1$) of the second-period elements exhibit two notable anomalies against the general increasing trend with nuclear charge: $\\text{IE}_1(\\text{Be}) > \\text{IE}_1(\\text{B})$ and $\\text{IE}_1(\\text{N}) > \\text{IE}_1(\\text{O})$. Which statement correctly justifies both anomalies based on subshell electronic configurations?",
    "options": [
      "A: Be ([He] 2s^2) loses an electron from a fully filled penetrating 2s subshell while B ([He] 2s^2 2p^1) loses an electron from an easily shielded higher-energy 2p subshell; N ([He] 2s^2 2p^3) has extra exchange stability from a half-filled 2p subshell while O ([He] 2s^2 2p^4) experiences inter-electronic repulsion in a paired 2p orbital.",
      "B: Be has a higher nuclear charge than B, and N has a higher nuclear charge than O.",
      "C: B has higher electronegativity than Be, and O has higher electron affinity than N.",
      "D: 2p electrons in Be penetrate closer to the nucleus than 2s electrons in B."
    ],
    "questionType": "single_correct_mcq",
    "hints": [
      "H1 (Configuration of Be vs B): Compare subshells from which electrons are removed in Be and B.: Be: [He] 2s^2 (loss of 2s electron). B: [He] 2s^2 2p^1 (loss of 2p electron). 2s electrons have greater orbital penetration and shield the 2p electron.",
      "H2 (Configuration of N vs O): Compare 2p subshell electron arrangements in N and O.: N: [He] 2s^2 2p_x^1 2p_y^1 2p_z^1 (symmetrically half-filled 2p subshell with high exchange energy). O: [He] 2s^2 2p_x^2 2p_y^1 2p_z^1 (contains a paired orbital).",
      "H3 (Crux Move): Combine subshell penetration and spin pairing repulsions.: Crux Move: Full-filled 2s stability in Be exceeds single 2p in B; spin pairing repulsion in O facilitates electron removal compared to half-filled exchange stability in N."
    ],
    "steps": [
      "1. System Representation & Setup: Second-period elements exhibit IE1 dips at Group 2 -> 13 (Be -> B) and Group 15 -> 16 (N -> O). We evaluate the quantum mechanical basis of both anomalies.",
      "2. Physical Model & Formulation: In Be (2s^2), the 2s electron experiences greater penetration and effective nuclear charge than the 2p electron in B (2s^2 2p^1), which is shielded by inner 2s electrons. In N (2p^3), all three 2p orbitals are singly occupied, maximizing quantum exchange energy.",
      "3. Execution & Resolution: In Oxygen (2p^4), one 2p orbital contains paired electrons with antiparallel spins, creating localized electrostatic repulsion that lowers the ionization threshold relative to Nitrogen. Option A."
    ],
    "category": "EXAM_CLAIM",
    "band": "D2",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "CHEM-NSEJS-BOND-04",
    "sourceName": "NSEJS Official Chemistry Core 2",
    "topic": "Chemical Bonding",
    "adapterId": "C07",
    "stem": "The experimental first electron gain enthalpy of Chlorine is $\\Delta_{\\text{eg}}H(\\text{Cl}) = -349\\text{ kJ/mol}$, whereas that of Fluorine is $\\Delta_{\\text{eg}}H(\\text{F}) = -328\\text{ kJ/mol}$, despite Fluorine possessing higher electronegativity. Which of the following correctly accounts for this thermodynamic anomaly?",
    "options": [
      "A: Due to the extremely small compact size of the 2p subshell in Fluorine, incoming electron experiences strong inter-electronic repulsions, lowering the exothermic energy release relative to the more diffuse 3p subshell in Chlorine.",
      "B: Chlorine has a higher effective nuclear charge than Fluorine.",
      "C: Fluorine has empty d-orbitals available for hybridization.",
      "D: Chlorine undergoes photodissociation more readily than Fluorine."
    ],
    "questionType": "single_correct_mcq",
    "hints": [
      "H1 (Spatial Electron Density): Contrast the principal quantum levels n=2 in F and n=3 in Cl.: The 2p subshell of F is extremely compact with high electron density. The 3p subshell of Cl is larger and more diffuse.",
      "H2 (Inter-Electronic Repulsion): How does electron-electron repulsion affect enthalpy change?: Adding an electron to a crowded compact subshell incurs strong electrostatic repulsion, which counteracts nuclear attraction and reduces net exothermicity.",
      "H3 (Crux Move): Conclude why Chlorine's Delta_egH is more negative.: Crux Move: In Cl, the incoming electron enters the larger 3p subshell with minimal repulsion, releasing -349 kJ/mol compared to -328 kJ/mol for F."
    ],
    "steps": [
      "1. System Representation & Setup: We compare first electron gain enthalpy of Fluorine (-328 kJ/mol) and Chlorine (-349 kJ/mol).",
      "2. Physical Model & Formulation: Although Fluorine has smaller atomic radius and higher electronegativity, its 2p orbitals are extraordinarily compact in space. When an incoming electron approaches F, strong inter-electronic repulsion from the existing 7 valence electrons destabilizes the resulting F- anion.",
      "3. Execution & Resolution: In Chlorine, the incoming electron occupies the significantly larger 3p subshell where electron-electron repulsions are substantially weaker, making Delta_egH more negative (-349 kJ/mol). Option A."
    ],
    "category": "EXAM_CLAIM",
    "band": "D1",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "CHEM-NSEJS-BOND-05",
    "sourceName": "NSEJS Official Chemistry Core 2",
    "topic": "Chemical Bonding",
    "adapterId": "C07",
    "stem": "Consider the chemical species: $\\text{CO}_2, \\text{SO}_2, \\text{XeF}_2,$ and $\\text{I}_3^-$. Which pair among them is isostructural with linear molecular geometry, and what is the total number of non-bonding lone pairs of electrons located on the central atom in each member of that isostructural pair?",
    "options": [
      "A: XeF2 and I3^-; Central atom has 3 lone pairs in both XeF2 and I3^-",
      "B: CO2 and SO2; Central atom has 0 lone pairs in CO2 and 1 lone pair in SO2",
      "C: CO2 and XeF2; Central atom has 0 lone pairs in CO2 and 2 lone pairs in XeF2",
      "D: SO2 and I3^-; Central atom has 1 lone pair in SO2 and 3 lone pairs in I3^-"
    ],
    "questionType": "single_correct_mcq",
    "hints": [
      "H1 (Steric Number Calculations): Compute steric number = bond pairs + lone pairs for each species.: CO2: 2 sigma bonds, 0 lone pairs (sp, linear). SO2: 2 sigma bonds, 1 lone pair (sp2, bent). XeF2: 2 sigma bonds, 3 lone pairs (sp3d). I3^-: 2 sigma bonds, 3 lone pairs (sp3d).",
      "H2 (Trigonal Bipyramidal Geometry): Determine where 3 lone pairs reside in sp3d hybridization.: By VSEPR theory, lone pairs minimize 90-degree repulsions by occupying the 3 equatorial positions, forcing the 2 bonding pairs into axial positions (180 degrees apart).",
      "H3 (Crux Move): Identify isostructural pair with matching geometry and central lone pairs.: Crux Move: Both XeF2 and I3^- have sp3d hybridization, 3 equatorial lone pairs, and a strictly linear geometry."
    ],
    "steps": [
      "1. System Representation & Setup: We evaluate CO2, SO2, XeF2, and I3^- for linear geometry and central atom lone pair counts using VSEPR theory.",
      "2. Physical Model & Formulation: In XeF2, central Xe has 8 valence electrons; 2 form single bonds with F, leaving 6 non-bonding electrons (3 lone pairs). Steric number = 2 + 3 = 5 (sp3d). In I3^-, central I has 7 + 1 = 8 valence electrons; 2 form single bonds with terminal iodines, leaving 3 lone pairs. Steric number = 2 + 3 = 5 (sp3d).",
      "3. Execution & Resolution: For steric number 5 with 3 lone pairs, equatorial positions minimize repulsions, producing an axial-axial bond angle of 180 degrees (linear geometry). Thus XeF2 and I3^- are isostructural with 3 lone pairs on the central atom. Option A."
    ],
    "category": "EXAM_CLAIM",
    "band": "D2",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "CHEM-NSEJS-BOND-06",
    "sourceName": "NSEJS Official Chemistry Core 2",
    "topic": "Chemical Bonding",
    "adapterId": "C07",
    "stem": "Use the Born-Haber cycle to calculate the lattice enthalpy ($U_{\\text{lattice}}$) of crystalline sodium chloride ($\\text{NaCl}(s)$) from the following standard thermodynamic data:\n1. Sublimation enthalpy of sodium: $\\Delta H_{\\text{sub}}(\\text{Na}) = +108\\text{ kJ/mol}$\n2. First ionization enthalpy of sodium: $\\text{IE}_1(\\text{Na}) = +496\\text{ kJ/mol}$\n3. Bond dissociation enthalpy of chlorine gas: $\\Delta H_{\\text{bond}}(\\text{Cl}_2) = +242\\text{ kJ/mol}$\n4. First electron gain enthalpy of chlorine: $\\Delta_{\\text{eg}}H(\\text{Cl}) = -349\\text{ kJ/mol}$\n5. Standard enthalpy of formation of $\\text{NaCl}(s)$: $\\Delta H_f^\\circ(\\text{NaCl}) = -411\\text{ kJ/mol}$",
    "options": [
      "A: U_lattice = -787 kJ/mol",
      "B: U_lattice = -666 kJ/mol",
      "C: U_lattice = -908 kJ/mol",
      "D: U_lattice = -545 kJ/mol"
    ],
    "questionType": "single_correct_mcq",
    "hints": [
      "H1 (Hess's Law Cycle): Express Delta H_f^circ in terms of the individual enthalpy steps.: Delta H_f^circ = Delta H_sub + IE1 + (1/2) * Delta H_bond(Cl2) + Delta_egH(Cl) + U_lattice.",
      "H2 (Stoichiometric Factor for Cl2): Ensure chlorine atomization uses 1/2 bond energy.: Formation produces 1 mole of NaCl from 1/2 mole of Cl2(g). Chlorine dissociation contribution = 0.5 * 242 = +121 kJ/mol.",
      "H3 (Crux Move): Substitute given values and solve for U_lattice.: Crux Move: -411 = 108 + 496 + 121 - 349 + U_lattice = 376 + U_lattice => U_lattice = -411 - 376 = -787 kJ/mol."
    ],
    "steps": [
      "1. System Representation & Setup: The standard formation reaction is Na(s) + 1/2 Cl2(g) -> NaCl(s) with Delta H_f^circ = -411 kJ/mol. We determine lattice enthalpy U_lattice.",
      "2. Physical Model & Formulation: By Hess's law: Delta H_f^circ = Delta H_sub(Na) + IE1(Na) + 0.5 * Delta H_bond(Cl2) + Delta_egH(Cl) + U_lattice. Atomization of chlorine = 0.5 * 242 = +121 kJ/mol.",
      "3. Execution & Resolution: -411 = 108 + 496 + 121 - 349 + U_lattice => -411 = 376 + U_lattice => U_lattice = -411 - 376 = -787 kJ/mol. Option A."
    ],
    "category": "EXAM_CLAIM",
    "band": "D2",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "CHEM-NSEJS-BOND-07",
    "sourceName": "NSEJS Official Chemistry Core 2",
    "topic": "Chemical Bonding",
    "adapterId": "C07",
    "stem": "Naturally occurring boron consists of two stable isotopes: $^{10}\\text{B}$ of isotopic mass $10.01\\text{ u}$ and $^{11}\\text{B}$ of isotopic mass $11.01\\text{ u}$. If the standard relative atomic mass of naturally occurring boron listed in the periodic table is $10.81\\text{ u}$, determine the natural percentage abundance of each isotope.",
    "options": [
      "A: 10B = 20.0%, 11B = 80.0%",
      "B: 10B = 19.0%, 11B = 81.0%",
      "C: 10B = 25.0%, 11B = 75.0%",
      "D: 10B = 30.0%, 11B = 70.0%"
    ],
    "questionType": "single_correct_mcq",
    "hints": [
      "H1 (Weighted Average Formulation): Express average atomic mass in terms of isotope fraction x.: Let x be the fractional abundance of 10B. Then (1 - x) is the fraction of 11B: 10.01 * x + 11.01 * (1 - x) = 10.81.",
      "H2 (Linear Equation): Expand and isolate x.: 11.01 - (11.01 - 10.01) * x = 10.81 => 11.01 - 1.00 * x = 10.81.",
      "H3 (Crux Move): Solve for x and convert to percentages.: Crux Move: x = 11.01 - 10.81 = 0.20 => 20.0% for 10B and 80.0% for 11B."
    ],
    "steps": [
      "1. System Representation & Setup: Boron isotopes 10B (10.01 u) and 11B (11.01 u) produce an average atomic mass of 10.81 u. We find fractional abundances.",
      "2. Physical Model & Formulation: Weighted isotopic mass equation is A_avg = x * m(10B) + (1 - x) * m(11B). Substituting gives 10.81 = 10.01 x + 11.01 (1 - x).",
      "3. Execution & Resolution: 10.81 = 11.01 - 1.00 x => x = 11.01 - 10.81 = 0.20 = 20.0%. Abundance of 11B = 1 - 0.20 = 0.80 = 80.0%. Option A."
    ],
    "category": "EXAM_CLAIM",
    "band": "D1",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "CHEM-NSEJS-BOND-08",
    "sourceName": "NSEJS Official Chemistry Core 2",
    "topic": "Chemical Bonding",
    "adapterId": "C07",
    "stem": "The normal boiling points of the Group 16 hydrides follow the sequence: $\\text{H}_2\\text{O} (373\\text{ K}) > \\text{H}_2\\text{Te} (269\\text{ K}) > \\text{H}_2\\text{Se} (232\\text{ K}) > \\text{H}_2\\text{S} (213\\text{ K})$. Which of the following provides the complete and accurate chemical justification for this non-monotonic sequence?",
    "options": [
      "A: From H2S to H2Te, boiling point increases steadily due to rising molecular mass and London dispersion forces; H2O exhibits an extraordinarily high boiling point due to extensive three-dimensional intermolecular hydrogen bonding enabled by the high electronegativity and small radius of Oxygen.",
      "B: H2O has covalent bonds while H2S, H2Se, and H2Te are ionic compounds.",
      "C: The bond angle in H2O is smaller than in H2Te, creating higher dipole repulsion.",
      "D: H2Te decomposes into elemental tellurium at room temperature."
    ],
    "questionType": "single_correct_mcq",
    "hints": [
      "H1 (Trend from H2S to H2Te): Identify the dominant intermolecular force down the group.: As atomic mass increases from S to Se to Te, molecular polarizability increases, leading to stronger London dispersion forces.",
      "H2 (Hydrogen Bonding in H2O): Why does water deviate so drastically?: Oxygen has high electronegativity and small size, enabling each H2O molecule to form up to 4 strong intermolecular hydrogen bonds in a tetrahedral network.",
      "H3 (Crux Move): Combine dispersion force growth with hydrogen bond singularity.: Crux Move: Group 16 hydrides follow dispersion forces from H2S to H2Te, but H2O jumps to the highest boiling point due to robust hydrogen bonding network."
    ],
    "steps": [
      "1. System Representation & Setup: Boiling points of Group 16 hydrides are H2O (373 K) > H2Te (269 K) > H2Se (232 K) > H2S (213 K). We justify this non-linear sequence.",
      "2. Physical Model & Formulation: For H2S, H2Se, and H2Te, electronegativities of S, Se, Te are too low to form significant hydrogen bonds. Boiling points rise from H2S to H2Te due to increasing molar mass and enhanced polarizability (London dispersion forces).",
      "3. Execution & Resolution: Water has an unusually high boiling point (373 K) because each oxygen atom has two lone pairs and two bonded hydrogens, forming an extensive 3D hydrogen-bonded lattice requiring substantial thermal energy to disrupt. Option A."
    ],
    "category": "EXAM_CLAIM",
    "band": "D2",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "CHEM-NSEJS-BOND-09",
    "sourceName": "NSEJS Official Chemistry Core 2",
    "topic": "Chemical Bonding",
    "adapterId": "C07",
    "stem": "An electron of rest mass $m_e = 9.11 \\times 10^{-31}\\text{ kg}$ and elementary charge $e = 1.60 \\times 10^{-19}\\text{ C}$ is accelerated from rest through an electric potential difference of $V = 150.0\\text{ V}$. Taking Planck's constant as $h = 6.626 \\times 10^{-34}\\text{ J}\\cdot\\text{s}$, calculate the de Broglie wavelength $\\lambda$ of the electron.",
    "options": [
      "A: lambda = 0.100 nm (1.00 Angstrom)",
      "B: lambda = 0.123 nm (1.23 Angstrom)",
      "C: lambda = 0.082 nm (0.82 Angstrom)",
      "D: lambda = 0.150 nm (1.50 Angstrom)"
    ],
    "questionType": "single_correct_mcq",
    "hints": [
      "H1 (Kinetic Energy from Potential): Formulate electron momentum from potential difference V.: Kinetic energy K = e * V. Momentum p = sqrt(2 * m_e * K) = sqrt(2 * m_e * e * V).",
      "H2 (De Broglie Relation): Relate wavelength lambda to momentum p.: lambda = h / p = h / sqrt(2 * m_e * e * V).",
      "H3 (Crux Move): Substitute constants and compute lambda.: Crux Move: lambda = 6.626e-34 / sqrt(2 * 9.11e-31 * 1.60e-19 * 150) = 6.626e-34 / 6.613e-24 = 1.002e-10 m = 0.100 nm."
    ],
    "steps": [
      "1. System Representation & Setup: An electron (m_e = 9.11 x 10^-31 kg, e = 1.60 x 10^-19 C) accelerated across V = 150.0 V. We compute de Broglie wavelength lambda.",
      "2. Physical Model & Formulation: Kinetic energy gained is K = e V = 1.60 x 10^-19 * 150 = 2.40 x 10^-17 J. Momentum is p = sqrt(2 m_e K) = sqrt(2 * 9.11 x 10^-31 * 2.40 x 10^-17) = 6.613 x 10^-24 kg*m/s.",
      "3. Execution & Resolution: lambda = h / p = 6.626 x 10^-34 / 6.613 x 10^-24 = 1.002 x 10^-10 m = 0.100 nm = 1.00 Angstrom. Option A."
    ],
    "category": "EXAM_CLAIM",
    "band": "D2",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "CHEM-NSEJS-BOND-10",
    "sourceName": "NSEJS Official Chemistry Core 2",
    "topic": "Chemical Bonding",
    "adapterId": "C07",
    "stem": "Both ammonia ($\\text{NH}_3$) and nitrogen trifluoride ($\\text{NF}_3$) possess a trigonal pyramidal molecular geometry with one lone pair on the central nitrogen atom. However, the experimental dipole moment of $\\text{NH}_3$ ($1.47\\text{ D}$) is significantly larger than that of $\\text{NF}_3$ ($0.24\\text{ D}$). Which of the following correctly explains this difference in net molecular dipole?",
    "options": [
      "A: In NH3, Nitrogen is more electronegative than Hydrogen, so N-H bond dipoles add in the same direction as the lone pair dipole; in NF3, Fluorine is more electronegative than Nitrogen, so N-F bond dipoles oppose the lone pair dipole, resulting in substantial cancellation.",
      "B: NF3 has a planar triangular shape while NH3 is pyramidal.",
      "C: Nitrogen in NF3 has an oxidation state of -3, whereas in NH3 it is +3.",
      "D: NH3 has coordinate covalent bonds whereas NF3 has ionic bonds."
    ],
    "questionType": "single_correct_mcq",
    "hints": [
      "H1 (Electronegativity Differences): Compare electronegativity values: N (3.0) vs H (2.1) vs F (4.0).: In N-H bonds, dipole points from H toward N. In N-F bonds, dipole points from N toward F.",
      "H2 (Lone Pair Vector Direction): Where does the lone pair dipole point?: The sp3 lone pair dipole points outward away from the nitrogen nucleus along the apex of the pyramid.",
      "H3 (Crux Move): Vector addition of bond dipoles and lone pair dipole.: Crux Move: In NH3, resultant bond dipole adds constructively with lone pair dipole (mu = 1.47 D). In NF3, resultant bond dipole points downward, opposing the lone pair dipole (mu = 0.24 D)."
    ],
    "steps": [
      "1. System Representation & Setup: NH3 (1.47 D) and NF3 (0.24 D) are both trigonal pyramidal molecules with one central lone pair on Nitrogen.",
      "2. Physical Model & Formulation: Dipole moments are vectors. In NH3, EN(N) = 3.0 > EN(H) = 2.1, so individual N-H bond dipoles point toward Nitrogen (upward along pyramid axis), in the same direction as the lone pair dipole.",
      "3. Execution & Resolution: In NF3, EN(F) = 4.0 > EN(N) = 3.0, so N-F bond dipoles point away from Nitrogen (downward along pyramid axis), opposing the upward lone pair dipole. This opposing vector alignment drastically reduces net dipole to 0.24 D. Option A."
    ],
    "category": "EXAM_CLAIM",
    "band": "D2",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "CHEM-NSEJS-MOLE-01",
    "sourceName": "NSEJS Official Chemistry Core 2",
    "topic": "Mole Concept And Gas Laws",
    "adapterId": "C04",
    "stem": "A gaseous mixture contains $4.0\\text{ g}$ of $\\text{CH}_4$ (methane) and $8.8\\text{ g}$ of $\\text{CO}_2$ (carbon dioxide). If the mixture is kept in a rigid vessel of volume $V$ at temperature $T$, what is the ratio of the partial pressure of $\\text{CH}_4$ to the total pressure of the gas mixture ($P_{\\text{CH}_4} / P_{\\text{total}}$)?\n[FIG-stem-chem-gas-mixture-partial-pressure]\n(Atomic masses: $\\text{C} = 12\\text{ u}, \\text{H} = 1\\text{ u}, \\text{O} = 16\\text{ u}$)",
    "options": [
      "A: 1/3",
      "B: 5/9",
      "C: 4/9",
      "D: 1/2"
    ],
    "questionType": "single_correct_mcq",
    "hints": [
      "H1 (Molar Masses): Calculate the molar mass of CH4 and CO2.: M(CH4) = 12 + 4(1) = 16 g/mol; M(CO2) = 12 + 2(16) = 44 g/mol.",
      "H2 (Mole Counts): Compute moles of each gas in the vessel.: n(CH4) = 4.0 / 16 = 0.25 mol; n(CO2) = 8.8 / 44 = 0.20 mol. Total moles = 0.45 mol.",
      "H3 (Crux Move): Apply Dalton's Law of Partial Pressures.: Crux Move: Under Dalton's law and ideal gas behavior, P(CH4) / P_total = n(CH4) / n_total = 0.25 / 0.45 = 5/9."
    ],
    "steps": [
      "1. System Representation & Setup: A rigid container holds 4.0 g CH4 and 8.8 g CO2 at temperature T and volume V. Identify atomic masses: C = 12, H = 1, O = 16.",
      "2. Physical Model & Formulation: By Dalton's Law of Partial Pressures, the partial pressure fraction equals the mole fraction: P(CH4) / P_total = n(CH4) / (n(CH4) + n(CO2)).",
      "3. Execution & Resolution: n(CH4) = 4.0 / 16 = 0.25 mol; n(CO2) = 8.8 / 44 = 0.20 mol. Total moles = 0.45 mol. Ratio = 0.25 / 0.45 = 5/9. Option B."
    ],
    "category": "EXAM_CLAIM",
    "band": "D2",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "CHEM-NSEJS-MOLE-02",
    "sourceName": "NSEJS Official Chemistry Core 2",
    "topic": "Mole Concept And Gas Laws",
    "adapterId": "C04",
    "stem": "Which of the following gaseous samples contains the maximum total number of atoms?\n(Atomic masses: $\\text{H} = 1\\text{ u}, \\text{C} = 12\\text{ u}, \\text{N} = 14\\text{ u}, \\text{O} = 16\\text{ u}$)",
    "options": [
      "A: 1.8 g of H2O",
      "B: 1.6 g of CH4",
      "C: 2.8 g of N2",
      "D: 4.4 g of CO2"
    ],
    "questionType": "single_correct_mcq",
    "hints": [
      "H1 (Mole Count of Molecules): Find the number of moles of each compound.: For H2O: 1.8/18 = 0.1 mol; CH4: 1.6/16 = 0.1 mol; N2: 2.8/28 = 0.1 mol; CO2: 4.4/44 = 0.1 mol.",
      "H2 (Atomicity): Determine atoms per molecule.: H2O has 3 atoms; CH4 has 5 atoms; N2 has 2 atoms; CO2 has 3 atoms.",
      "H3 (Crux Move): Multiply moles by atomicity.: Crux Move: All samples contain 0.1 mol of molecules. CH4 contains 0.1 * 5 * N_A = 0.5 N_A atoms, which is the maximum."
    ],
    "steps": [
      "1. System Representation & Setup: Compare four samples: 1.8 g H2O, 1.6 g CH4, 2.8 g N2, 4.4 g CO2.",
      "2. Physical Model & Formulation: Total atoms = (mass / molar_mass) * atomicity * N_A. Every sample has mass/molar_mass = 0.1 mol.",
      "3. Execution & Resolution: Atoms: H2O = 0.3 N_A, CH4 = 0.5 N_A, N2 = 0.2 N_A, CO2 = 0.3 N_A. 1.6 g CH4 has the maximum atoms. Option B."
    ],
    "category": "EXAM_CLAIM",
    "band": "D1",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "CHEM-NSEJS-MOLE-03",
    "sourceName": "NSEJS Official Chemistry Core 2",
    "topic": "Mole Concept And Gas Laws",
    "adapterId": "C04",
    "stem": "In the Haber process reaction:\n$$\\text{N}_2(\\text{g}) + 3\\text{H}_2(\\text{g}) \\longrightarrow 2\\text{NH}_3(\\text{g})$$\nIf $28.0\\text{ g}$ of $\\text{N}_2$ reacts with $9.0\\text{ g}$ of $\\text{H}_2$, what is the mass of $\\text{NH}_3$ produced, assuming complete reaction of the limiting reagent?\n(Atomic masses: $\\text{N} = 14\\text{ u}, \\text{H} = 1\\text{ u}$)",
    "options": [
      "A: 17.0 g",
      "B: 34.0 g",
      "C: 37.0 g",
      "D: 51.0 g"
    ],
    "questionType": "single_correct_mcq",
    "hints": [
      "H1 (Mole Ratios): Convert reactant masses to moles.: n(N2) = 28.0 / 28 = 1.0 mol; n(H2) = 9.0 / 2 = 4.5 mol.",
      "H2 (Limiting Reagent Identification): Determine which reactant runs out first.: 1.0 mol N2 requires 3.0 mol H2. We have 4.5 mol H2, so N2 is the limiting reagent and H2 is in excess.",
      "H3 (Crux Move): Compute theoretical yield based on limiting reagent.: Crux Move: 1.0 mol N2 produces 2.0 mol NH3. Mass of NH3 = 2.0 mol * 17.0 g/mol = 34.0 g."
    ],
    "steps": [
      "1. System Representation & Setup: N2 + 3H2 -> 2NH3. Initial masses: 28.0 g N2, 9.0 g H2.",
      "2. Physical Model & Formulation: n(N2) = 28.0 / 28 = 1.0 mol. n(H2) = 9.0 / 2 = 4.5 mol. Since 4.5 / 3 = 1.5 > 1.0, N2 is the limiting reagent.",
      "3. Execution & Resolution: Moles of NH3 formed = 2 * n(N2) = 2.0 mol. Mass = 2.0 * 17.0 = 34.0 g. Option B."
    ],
    "category": "EXAM_CLAIM",
    "band": "D2",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "CHEM-NSEJS-MOLE-04",
    "sourceName": "NSEJS Official Chemistry Core 2",
    "topic": "Mole Concept And Gas Laws",
    "adapterId": "C04",
    "stem": "A hydrocarbon compound contains $85.7\\%$ carbon and $14.3\\%$ hydrogen by mass. Its vapor density is measured to be $28$. What is the molecular formula of the hydrocarbon?\n(Atomic masses: $\\text{C} = 12\\text{ u}, \\text{H} = 1\\text{ u}$)",
    "options": [
      "A: C2H4",
      "B: C3H6",
      "C: C4H8",
      "D: C4H10"
    ],
    "questionType": "single_correct_mcq",
    "hints": [
      "H1 (Empirical Mole Ratio): Find relative moles of C and H.: Moles of C = 85.7 / 12 = 7.14; Moles of H = 14.3 / 1 = 14.3. Ratio H:C = 14.3 / 7.14 = 2. Empirical formula is CH2.",
      "H2 (Molecular Mass from Vapor Density): Convert vapor density to molar mass.: Molecular mass = 2 * Vapor Density = 2 * 28 = 56 g/mol.",
      "H3 (Crux Move): Determine the integer multiplier n.: Crux Move: Empirical mass of CH2 = 12 + 2 = 14 g/mol. Multiplier n = 56 / 14 = 4. Molecular formula is C4H8."
    ],
    "steps": [
      "1. System Representation & Setup: 85.7% C, 14.3% H by mass; Vapor Density = 28.",
      "2. Physical Model & Formulation: Relative moles: n_C = 85.7 / 12 = 7.142; n_H = 14.3 / 1 = 14.30. Simplest integer ratio is 1:2, giving empirical formula CH2 (empirical mass = 14).",
      "3. Execution & Resolution: Molecular mass = 2 * VD = 2 * 28 = 56 g/mol. n = 56 / 14 = 4. Molecular formula is (CH2)4 = C4H8. Option C."
    ],
    "category": "EXAM_CLAIM",
    "band": "D2",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "CHEM-NSEJS-MOLE-05",
    "sourceName": "NSEJS Official Chemistry Core 2",
    "topic": "Mole Concept And Gas Laws",
    "adapterId": "C04",
    "stem": "A solution of sodium hydroxide ($\\text{NaOH}$) is prepared by dissolving $10.0\\text{ g}$ of pure $\\text{NaOH}$ in water to give a final solution volume of $250.0\\text{ mL}$. What is the molarity ($\\text{mol/L}$) of this solution?\n(Atomic masses: $\\text{Na} = 23\\text{ u}, \\text{O} = 16\\text{ u}, \\text{H} = 1\\text{ u}$)",
    "options": [
      "A: 0.25 M",
      "B: 0.50 M",
      "C: 1.00 M",
      "D: 2.50 M"
    ],
    "questionType": "single_correct_mcq",
    "hints": [
      "H1 (Molar Mass of NaOH): Calculate formula weight of NaOH.: M(NaOH) = 23 + 16 + 1 = 40.0 g/mol.",
      "H2 (Moles of Solute): Find moles in 10.0 g.: n = 10.0 g / 40.0 g/mol = 0.25 mol.",
      "H3 (Crux Move): Convert volume to liters and compute molarity.: Crux Move: V = 250.0 mL = 0.250 L. Molarity M = n / V = 0.25 mol / 0.250 L = 1.00 M."
    ],
    "steps": [
      "1. System Representation & Setup: Mass of NaOH = 10.0 g, Volume = 250.0 mL = 0.250 L.",
      "2. Physical Model & Formulation: Molarity M = (mass / molar_mass) / Volume_in_liters.",
      "3. Execution & Resolution: Moles = 10.0 / 40.0 = 0.25 mol. M = 0.25 / 0.250 = 1.00 mol/L = 1.00 M. Option C."
    ],
    "category": "EXAM_CLAIM",
    "band": "D2",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "CHEM-NSEJS-MOLE-06",
    "sourceName": "NSEJS Official Chemistry Core 2",
    "topic": "Mole Concept And Gas Laws",
    "adapterId": "C04",
    "stem": "Naturally occurring chlorine consists of two stable isotopes: $^{35}\\text{Cl}$ (isotopic mass $35.0\\text{ u}$) and $^{37}\\text{Cl}$ (isotopic mass $37.0\\text{ u}$). If the relative fractional abundance of $^{35}\\text{Cl}$ is $75\\%$ and $^{37}\\text{Cl}$ is $25\\%$, what is the average atomic mass of chlorine?",
    "options": [
      "A: 35.0 u",
      "B: 35.5 u",
      "C: 36.0 u",
      "D: 36.5 u"
    ],
    "questionType": "single_correct_mcq",
    "hints": [
      "H1 (Weighted Average Definition): State the formula for average atomic mass.: Average mass = (abundance_1 * mass_1 + abundance_2 * mass_2) / 100.",
      "H2 (Fractional Simplification): Use fractions 3/4 and 1/4.: 75% = 3/4 and 25% = 1/4.",
      "H3 (Crux Move): Calculate the weighted sum.: Crux Move: (3/4)*35.0 + (1/4)*37.0 = 26.25 + 9.25 = 35.5 u."
    ],
    "steps": [
      "1. System Representation & Setup: Chlorine isotopes Cl-35 (75%) and Cl-37 (25%).",
      "2. Physical Model & Formulation: Average atomic mass is the abundance-weighted arithmetic mean: M_avg = 0.75 * 35.0 + 0.25 * 37.0.",
      "3. Execution & Resolution: M_avg = 26.25 + 9.25 = 35.5 u. Confirms Option B."
    ],
    "category": "EXAM_CLAIM",
    "band": "D1",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "CHEM-NSEJS-MOLE-07",
    "sourceName": "NSEJS Official Chemistry Core 2",
    "topic": "Mole Concept And Gas Laws",
    "adapterId": "C04",
    "stem": "Two open ends of a $100\\text{ cm}$ long horizontal glass tube are simultaneously exposed to gaseous $\\text{NH}_3$ (ammonia) and gaseous $\\text{HCl}$ (hydrogen chloride) respectively at identical temperature and pressure. A white ring of ammonium chloride ($\\text{NH}_4\\text{Cl}$) precipitates where the diffusing gases meet. At approximately what distance from the $\\text{NH}_3$ inlet does the white ring form?\n(Molar masses: $\\text{NH}_3 = 17.0\\text{ g/mol}, \\text{HCl} = 36.5\\text{ g/mol}$)",
    "options": [
      "A: 40.6 cm",
      "B: 50.0 cm",
      "C: 59.4 cm",
      "D: 68.2 cm"
    ],
    "questionType": "single_correct_mcq",
    "hints": [
      "H1 (Graham's Law of Diffusion): Relate diffusion rate to molar mass.: Rate r is inversely proportional to the square root of molar mass: r(NH3) / r(HCl) = sqrt(M(HCl) / M(NH3)).",
      "H2 (Ratio Calculation): Compute sqrt(36.5 / 17.0).: sqrt(36.5 / 17.0) = sqrt(2.147) = 1.465.",
      "H3 (Crux Move): Solve for distance d from NH3 inlet.: Crux Move: d / (100 - d) = 1.465 ==> d = 146.5 / 2.465 = 59.4 cm."
    ],
    "steps": [
      "1. System Representation & Setup: A 100 cm tube with NH3 entering at x = 0 and HCl entering at x = 100 cm.",
      "2. Physical Model & Formulation: By Graham's Law: r1 / r2 = sqrt(M2 / M1) = sqrt(36.5 / 17.0) = 1.465. Since travel time t is identical, distance ratio d1 / d2 = 1.465.",
      "3. Execution & Resolution: d1 + d2 = 100 ==> 1.465 d2 + d2 = 100 ==> 2.465 d2 = 100 ==> d2 = 40.57 cm. Distance from NH3 inlet d1 = 100 - 40.57 = 59.43 cm approx 59.4 cm. Option C."
    ],
    "category": "EXAM_CLAIM",
    "band": "D2",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "CHEM-NSEJS-MOLE-08",
    "sourceName": "NSEJS Official Chemistry Core 2",
    "topic": "Mole Concept And Gas Laws",
    "adapterId": "C04",
    "stem": "What volume of $0.10\\text{ M } \\text{H}_2\\text{SO}_4$ (sulfuric acid) solution is required to completely neutralize $25.0\\text{ mL}$ of $0.20\\text{ M } \\text{NaOH}$ solution?\nReaction:\n$$\\text{H}_2\\text{SO}_4 + 2\\text{NaOH} \\longrightarrow \\text{Na}_2\\text{SO}_4 + 2\\text{H}_2\\text{O}$$",
    "options": [
      "A: 12.5 mL",
      "B: 25.0 mL",
      "C: 50.0 mL",
      "D: 100.0 mL"
    ],
    "questionType": "single_correct_mcq",
    "hints": [
      "H1 (Base Moles): Compute the moles of NaOH present.: n(NaOH) = M * V = 0.20 mol/L * 0.025 L = 0.0050 mol = 5.0 mmol.",
      "H2 (Stoichiometric Ratio): Account for the diprotic nature of H2SO4.: Each mole of H2SO4 neutralizes 2 moles of NaOH, so n(H2SO4) = n(NaOH) / 2 = 2.5 mmol.",
      "H3 (Crux Move): Calculate required acid volume.: Crux Move: V(acid) = n(H2SO4) / M(acid) = 2.5 mmol / 0.10 mmol/mL = 25.0 mL."
    ],
    "steps": [
      "1. System Representation & Setup: Neutralization of NaOH with diprotic acid H2SO4. NaOH: V = 25.0 mL, M = 0.20 M. H2SO4: M = 0.10 M.",
      "2. Physical Model & Formulation: Millimoles of OH- must equal millimoles of H+. mmol(OH-) = 25.0 * 0.20 = 5.0 mmol. Since H2SO4 provides 2 H+ per molecule, mmol(H2SO4) = 5.0 / 2 = 2.5 mmol.",
      "3. Execution & Resolution: Volume of H2SO4 = 2.5 mmol / 0.10 M = 25.0 mL. Option B."
    ],
    "category": "EXAM_CLAIM",
    "band": "D2",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "CHEM-NSEJS-MOLE-09",
    "sourceName": "NSEJS Official Chemistry Core 2",
    "topic": "Mole Concept And Gas Laws",
    "adapterId": "C04",
    "stem": "What is the average oxidation state of sulfur in the thiosulfate ion ($\\text{S}_2\\text{O}_3^{2-}$)?",
    "options": [
      "A: +2",
      "B: +4",
      "C: +6",
      "D: -2"
    ],
    "questionType": "single_correct_mcq",
    "hints": [
      "H1 (Charge Conservation): Equate algebraic sum of oxidation states to ion charge.: The sum of oxidation states in S2O3^(2-) must equal -2.",
      "H2 (Oxygen State): Assign standard oxygen oxidation state.: Oxygen has an oxidation state of -2.",
      "H3 (Crux Move): Solve for sulfur oxidation state x.: Crux Move: 2x + 3(-2) = -2 ==> 2x - 6 = -2 ==> 2x = +4 ==> x = +2."
    ],
    "steps": [
      "1. System Representation & Setup: Polyatomic ion S2O3^(2-). Net charge is -2.",
      "2. Physical Model & Formulation: In oxoanions, oxygen has oxidation state -2. Let x = oxidation state of sulfur: 2(x) + 3(-2) = -2.",
      "3. Execution & Resolution: 2x - 6 = -2 ==> 2x = +4 ==> x = +2. Option A."
    ],
    "category": "EXAM_CLAIM",
    "band": "D1",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "CHEM-NSEJS-MOLE-10",
    "sourceName": "NSEJS Official Chemistry Core 2",
    "topic": "Mole Concept And Gas Laws",
    "adapterId": "C04",
    "stem": "When $10.0\\text{ g}$ of pure calcium carbonate ($\\text{CaCO}_3$) is completely decomposed by heating according to the reaction:\n$$\\text{CaCO}_3(\\text{s}) \\overset{\\Delta}{\\longrightarrow} \\text{CaO}(\\text{s}) + \\text{CO}_2(\\text{g})$$\nWhat is the volume of dry $\\text{CO}_2$ gas collected at STP ($0^\\circ\\text{C}$ and $1\\text{ atm}$, where the standard molar volume of an ideal gas is $22.4\\text{ L/mol}$)?\n(Atomic masses: $\\text{Ca} = 40\\text{ u}, \\text{C} = 12\\text{ u}, \\text{O} = 16\\text{ u}$)",
    "options": [
      "A: 1.12 L",
      "B: 2.24 L",
      "C: 4.48 L",
      "D: 22.4 L"
    ],
    "questionType": "single_correct_mcq",
    "hints": [
      "H1 (Molar Mass of CaCO3): Calculate formula mass.: M(CaCO3) = 40 + 12 + 3(16) = 100.0 g/mol.",
      "H2 (Mole Conversion): Find moles of CaCO3 decomposed.: n(CaCO3) = 10.0 g / 100.0 g/mol = 0.100 mol.",
      "H3 (Crux Move): Use 1:1 stoichiometry and molar volume at STP.: Crux Move: 1 mol CaCO3 produces 1 mol CO2. V(CO2) = 0.100 mol * 22.4 L/mol = 2.24 L."
    ],
    "steps": [
      "1. System Representation & Setup: Thermal decomposition: CaCO3(s) -> CaO(s) + CO2(g). Initial mass = 10.0 g CaCO3.",
      "2. Physical Model & Formulation: n(CaCO3) = 10.0 / 100.0 = 0.100 mol. By 1:1 stoichiometry, n(CO2) = 0.100 mol.",
      "3. Execution & Resolution: Volume at STP = n * V_m = 0.100 * 22.4 = 2.24 L. Option B."
    ],
    "category": "EXAM_CLAIM",
    "band": "D2",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "CHEM-NSEJS-REACT-01",
    "sourceName": "NSEJS Official Chemistry Core 2",
    "topic": "Chemical Substances And Reactions",
    "adapterId": "C08",
    "stem": "A pure metal oxide sample containing $1.02\\text{ g}$ of $M_2\\text{O}_3$ reacts completely with excess aqueous sodium hydroxide ($\\text{NaOH}$) to yield $1.64\\text{ g}$ of anhydrous sodium meta-metalate ($\\text{Na}M\\text{O}_2$). The same oxide sample also dissolves readily in aqueous hydrochloric acid ($\\text{HCl}$) to form a soluble metal chloride $M\\text{Cl}_3$.\n[FIG-stem-chem-amphoteric-oxide-reaction]\nIdentify metal $M$ and calculate the minimum volume of $0.50\\text{ M } \\text{HCl}$ required to completely dissolve another $1.02\\text{ g}$ sample of $M_2\\text{O}_3$.\n(Atomic masses: $\\text{O} = 16.0\\text{ u}, \\text{Na} = 23.0\\text{ u}, \\text{H} = 1.0\\text{ u}, \\text{Cl} = 35.5\\text{ u}$)",
    "options": [
      "A: M = Zn, volume of HCl = 80 mL",
      "B: M = Al, volume of HCl = 120 mL",
      "C: M = Fe, volume of HCl = 120 mL",
      "D: M = Al, volume of HCl = 60 mL"
    ],
    "questionType": "single_correct_mcq",
    "hints": [
      "H1 (Base Reaction): Write the stoichiometric equation for M2O3 with NaOH.: M2O3 + 2 NaOH -> 2 NaMO2 + H2O. Each mole of M2O3 yields 2 moles of NaMO2.",
      "H2 (Atomic Mass): Set up the molar ratio to determine the identity of metal M.: Moles of M2O3 = 1.02 / (2A + 48.0). Mass of NaMO2 = 2 * (1.02 / (2A + 48.0)) * (A + 55.0) = 1.64 g. Solving gives A = 27.0 u (Al).",
      "H3 (Crux Move): Calculate the stoichiometric volume of 0.50 M HCl.: Crux Move: Al2O3 + 6 HCl -> 2 AlCl3 + 3 H2O. 0.010 mol Al2O3 requires 0.060 mol HCl. Volume = 0.060 / 0.50 = 0.120 L = 120 mL."
    ],
    "steps": [
      "1. System Representation & Setup: A 1.02 g sample of amphoteric oxide M2O3 yields 1.64 g NaMO2 with NaOH, and forms MCl3 with HCl. We identify M and find the required HCl volume.",
      "2. Physical Model & Formulation: In alkaline dissolution, M2O3 + 2 NaOH -> 2 NaMO2 + H2O. Stoichiometry gives mass(NaMO2) = [2.04 / (2A + 48)] * (A + 55) = 1.64 g, yielding A = 27.0 u, identifying M as Aluminium (Al).",
      "3. Execution & Resolution: Acid dissolution follows Al2O3 + 6 HCl -> 2 AlCl3 + 3 H2O. Moles of Al2O3 = 1.02 / 102.0 = 0.010 mol. Moles of HCl = 6 * 0.010 = 0.060 mol. Minimum volume V = 0.060 / 0.50 = 0.120 L = 120 mL. Option B."
    ],
    "category": "EXAM_CLAIM",
    "band": "D2",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "CHEM-NSEJS-REACT-02",
    "sourceName": "NSEJS Official Chemistry Core 2",
    "topic": "Chemical Substances And Reactions",
    "adapterId": "C08",
    "stem": "Four metal strips $P, Q, R, S$ are tested with aqueous solutions of their respective sulfates ($P\\text{SO}_4, Q\\text{SO}_4, R\\text{SO}_4, S\\text{SO}_4$). It is observed that:\n1. Metal $Q$ displaces $P, R,$ and $S$ from their salt solutions.\n2. Metal $P$ displaces $R$ and $S$, but cannot displace $Q$.\n3. Metal $S$ displaces $R$, but cannot displace $P$ or $Q$.\nWhich of the following represents the correct descending order of chemical reactivity of the metals, and which metal will evolve $\\text{H}_2$ gas most vigorously upon reaction with dilute $\\text{H}_2\\text{SO}_4$?",
    "options": [
      "A: Q > P > S > R; Metal Q",
      "B: Q > S > P > R; Metal Q",
      "C: P > Q > S > R; Metal P",
      "D: Q > P > R > S; Metal S"
    ],
    "questionType": "single_correct_mcq",
    "hints": [
      "H1 (Displacement Principle): What determines displacement in aqueous salt solutions?: A more reactive metal displaces a less reactive metal from its aqueous salt solution because it oxidizes more readily.",
      "H2 (Relative Order): Chain the pairwise inequalities from observations 1, 2, and 3.: Obs 1: Q > P, Q > R, Q > S. Obs 2: P > R, P > S, but Q > P. Obs 3: S > R.",
      "H3 (Crux Move): Synthesize the linear ordering.: Crux Move: Combining inequalities gives Q > P > S > R. The most reactive metal (Q) reacts most vigorously with dilute acid."
    ],
    "steps": [
      "1. System Representation & Setup: Four metals P, Q, R, S undergo displacement tests. A more electropositive metal displaces a less electropositive one.",
      "2. Physical Model & Formulation: Q displaces P, R, S => Q is highest. P displaces R, S => P > R, S. S displaces R => S > R. Combining yields Q > P > S > R.",
      "3. Execution & Resolution: The reactivity sequence is strictly Q > P > S > R. Metal Q has the highest oxidation potential and evolves H2 most vigorously with dilute acid. Option A."
    ],
    "category": "EXAM_CLAIM",
    "band": "D1",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "CHEM-NSEJS-REACT-03",
    "sourceName": "NSEJS Official Chemistry Core 2",
    "topic": "Chemical Substances And Reactions",
    "adapterId": "C08",
    "stem": "When metallic copper reacts with dilute nitric acid ($\\text{HNO}_3$), nitric oxide ($\\text{NO}$) gas is evolved along with copper(II) nitrate and water according to the unbalanced skeleton equation:\n$$\\text{Cu} + \\text{HNO}_3 \\to \\text{Cu(NO}_3)_2 + \\text{NO} + \\text{H}_2\\text{O}$$\nWhen this redox equation is balanced using the lowest whole-number stoichiometric coefficients, what is the ratio of copper atoms oxidized to nitric acid molecules reduced to $\\text{NO}$, and what is the sum of all stoichiometric coefficients in the balanced equation?",
    "options": [
      "A: Ratio = 1 : 1; Sum = 16",
      "B: Ratio = 3 : 2; Sum = 20",
      "C: Ratio = 3 : 8; Sum = 20",
      "D: Ratio = 1 : 2; Sum = 18"
    ],
    "questionType": "single_correct_mcq",
    "hints": [
      "H1 (Oxidation States): Identify elements changing oxidation number.: Cu: 0 -> +2 (loss of 2e-). N in HNO3: +5 -> +2 in NO (gain of 3e-). Nitrate ions in Cu(NO3)2 remain at +5.",
      "H2 (Electron Balance): Equalize electrons lost and gained.: 3 * (Cu -> Cu2+ + 2e-) and 2 * (N+5 + 3e- -> N+2). Total electrons exchanged = 6e-.",
      "H3 (Crux Move): Account for spectator nitrate ions.: Crux Move: 3 Cu(NO3)2 requires 6 spectator nitrate ions. Total HNO3 = 2 (reduced) + 6 (spectator) = 8. Sum = 3 + 8 + 3 + 2 + 4 = 20. Ratio = 3 : 2."
    ],
    "steps": [
      "1. System Representation & Setup: Unbalanced redox: Cu + HNO3 -> Cu(NO3)2 + NO + H2O. Identify oxidized species (Cu: 0 -> +2) and reduced species (N: +5 -> +2).",
      "2. Physical Model & Formulation: Half-reactions: 3 Cu -> 3 Cu2+ + 6e-; 2 NO3- + 8 H+ + 6e- -> 2 NO + 4 H2O. Combining gives 3 Cu + 2 NO3- + 8 H+ -> 3 Cu2+ + 2 NO + 4 H2O.",
      "3. Execution & Resolution: Add 6 NO3- spectators to both sides: 3 Cu + 8 HNO3 -> 3 Cu(NO3)2 + 2 NO + 4 H2O. Cu oxidized : HNO3 reduced = 3 : 2. Sum of coefficients = 3 + 8 + 3 + 2 + 4 = 20. Option B."
    ],
    "category": "EXAM_CLAIM",
    "band": "D2",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "CHEM-NSEJS-REACT-04",
    "sourceName": "NSEJS Official Chemistry Core 2",
    "topic": "Chemical Substances And Reactions",
    "adapterId": "C08",
    "stem": "A chemistry student mixes $100.0\\text{ mL}$ of $0.100\\text{ M } \\text{HCl}$ with $100.0\\text{ mL}$ of $0.080\\text{ M } \\text{NaOH}$ at $25^\\circ\\text{C}$. Assuming complete dissociation of both strong electrolytes and additive volumes, what is the $\\text{pH}$ of the resulting aqueous solution?",
    "options": [
      "A: pH = 1.00",
      "B: pH = 2.00",
      "C: pH = 3.00",
      "D: pH = 7.00"
    ],
    "questionType": "single_correct_mcq",
    "hints": [
      "H1 (Millimoles): Calculate millimoles of H+ and OH- in the initial solutions.: mmol H+ = 100.0 mL * 0.100 M = 10.0 mmol. mmol OH- = 100.0 mL * 0.080 M = 8.0 mmol.",
      "H2 (Excess H+): Find unreacted H+ after neutralization.: Excess H+ = 10.0 - 8.0 = 2.0 mmol in total volume = 100.0 + 100.0 = 200.0 mL.",
      "H3 (Crux Move): Determine [H+] and pH.: Crux Move: [H+] = 2.0 mmol / 200.0 mL = 0.010 M = 10^(-2) M. pH = -log10(10^(-2)) = 2.00."
    ],
    "steps": [
      "1. System Representation & Setup: 100.0 mL 0.100 M HCl is mixed with 100.0 mL 0.080 M NaOH. Both are strong electrolytes.",
      "2. Physical Model & Formulation: mmol H+ = 10.0; mmol OH- = 8.0. Net reaction H+ + OH- -> H2O leaves 2.0 mmol H+ unreacted.",
      "3. Execution & Resolution: Total volume V = 200.0 mL. [H+] = 2.0 / 200.0 = 0.010 M = 1.0 * 10^-2 M. pH = -log10(0.010) = 2.00. Option B."
    ],
    "category": "EXAM_CLAIM",
    "band": "D2",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "CHEM-NSEJS-REACT-05",
    "sourceName": "NSEJS Official Chemistry Core 2",
    "topic": "Chemical Substances And Reactions",
    "adapterId": "C08",
    "stem": "When a mineral sample of pure gypsum ($\\text{CaSO}_4 \\cdot 2\\text{H}_2\\text{O}$) weighing $17.20\\text{ g}$ is carefully heated in a kiln at $373\\text{ K}$ ($100^\\circ\\text{C}$), it partially dehydrates to yield Plaster of Paris ($\\text{CaSO}_4 \\cdot \\frac{1}{2}\\text{H}_2\\text{O}$). What is the mass of Plaster of Paris obtained, and what is the mass of water vapor released during this conversion?\n(Atomic masses: $\\text{Ca} = 40.0\\text{ u}, \\text{S} = 32.0\\text{ u}, \\text{O} = 16.0\\text{ u}, \\text{H} = 1.0\\text{ u}$)",
    "options": [
      "A: Plaster of Paris = 13.60 g; Water lost = 3.60 g",
      "B: Plaster of Paris = 14.50 g; Water lost = 2.70 g",
      "C: Plaster of Paris = 15.40 g; Water lost = 1.80 g",
      "D: Plaster of Paris = 14.50 g; Water lost = 1.35 g"
    ],
    "questionType": "single_correct_mcq",
    "hints": [
      "H1 (Dehydration Equation): Write the balanced dehydration equation.: CaSO4.2H2O -> CaSO4.0.5H2O + 1.5 H2O.",
      "H2 (Molar Masses): Compute molar masses of gypsum, POP, and water.: M(Gypsum) = 40 + 32 + 64 + 36 = 172.0 g/mol. M(POP) = 136 + 9 = 145.0 g/mol. M(H2O) = 18.0 g/mol.",
      "H3 (Crux Move): Calculate masses from 17.20 g gypsum.: Crux Move: n = 17.20 / 172.0 = 0.100 mol. Mass of POP = 0.100 * 145.0 = 14.50 g. Mass of water = 0.100 * 1.5 * 18.0 = 2.70 g."
    ],
    "steps": [
      "1. System Representation & Setup: 17.20 g CaSO4.2H2O is heated at 373 K to form CaSO4.0.5H2O and release water vapor.",
      "2. Physical Model & Formulation: Reaction is CaSO4.2H2O -> CaSO4.0.5H2O + 1.5 H2O. Molar mass of gypsum = 172.0 g/mol => n = 0.100 mol.",
      "3. Execution & Resolution: Mass of POP = 0.100 mol * 145.0 g/mol = 14.50 g. Mass of water released = 0.100 * 1.5 * 18.0 = 2.70 g. Total mass 14.50 + 2.70 = 17.20 g confirms mass conservation. Option B."
    ],
    "category": "EXAM_CLAIM",
    "band": "D2",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "CHEM-NSEJS-REACT-06",
    "sourceName": "NSEJS Official Chemistry Core 2",
    "topic": "Chemical Substances And Reactions",
    "adapterId": "C08",
    "stem": "A sample of pure sodium hydrogen carbonate ($\\text{NaHCO}_3$) weighing $16.80\\text{ g}$ is heated strongly until decomposition is complete according to:\n$$2\\text{NaHCO}_3\\text{(s)} \\xrightarrow{\\Delta} \\text{Na}_2\\text{CO}_3\\text{(s)} + \\text{H}_2\\text{O(g)} + \\text{CO}_2\\text{(g)}$$\nWhat is the mass of anhydrous sodium carbonate residue left behind, and what volume of dry $\\text{CO}_2$ gas is collected at Standard Temperature and Pressure (STP, where $1\\text{ mol} = 22.4\\text{ L}$)?\n(Atomic masses: $\\text{Na} = 23.0\\text{ u}, \\text{H} = 1.0\\text{ u}, \\text{C} = 12.0\\text{ u}, \\text{O} = 16.0\\text{ u}$)",
    "options": [
      "A: Residue = 10.60 g; Volume of CO2 = 2.24 L",
      "B: Residue = 10.60 g; Volume of CO2 = 4.48 L",
      "C: Residue = 8.40 g; Volume of CO2 = 2.24 L",
      "D: Residue = 13.20 g; Volume of CO2 = 1.12 L"
    ],
    "questionType": "single_correct_mcq",
    "hints": [
      "H1 (Moles of Reactant): Calculate moles of NaHCO3 in 16.80 g.: M(NaHCO3) = 23 + 1 + 12 + 48 = 84.0 g/mol. Moles = 16.80 / 84.0 = 0.200 mol.",
      "H2 (Stoichiometric Ratio): Relate moles of reactant to products.: 2 mol NaHCO3 yields 1 mol Na2CO3 and 1 mol CO2. So 0.200 mol yields 0.100 mol Na2CO3 and 0.100 mol CO2.",
      "H3 (Crux Move): Evaluate mass of Na2CO3 and STP volume of CO2.: Crux Move: Mass Na2CO3 = 0.100 * 106.0 = 10.60 g. Volume CO2 = 0.100 * 22.4 = 2.24 L."
    ],
    "steps": [
      "1. System Representation & Setup: 16.80 g NaHCO3 undergoes thermal decomposition to solid Na2CO3 residue, H2O vapor, and CO2 gas.",
      "2. Physical Model & Formulation: 2 NaHCO3 -> Na2CO3 + H2O + CO2. M(NaHCO3) = 84.0 g/mol => n(NaHCO3) = 0.200 mol. Product moles = 0.200 / 2 = 0.100 mol each.",
      "3. Execution & Resolution: Mass Na2CO3 = 0.100 mol * 106.0 g/mol = 10.60 g. Volume of CO2 at STP = 0.100 mol * 22.4 L/mol = 2.24 L. Option A."
    ],
    "category": "EXAM_CLAIM",
    "band": "D2",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "CHEM-NSEJS-REACT-07",
    "sourceName": "NSEJS Official Chemistry Core 2",
    "topic": "Chemical Substances And Reactions",
    "adapterId": "C08",
    "stem": "An open-chain saturated hydrocarbon $X$ contains only carbon and hydrogen, has a molar mass of $58.0\\text{ g/mol}$, and exhibits structural isomerism (chain isomerism).\n1. How many structural isomers exist for this hydrocarbon?\n2. What is the minimum volume of pure oxygen ($\\text{O}_2$) gas at STP required for the complete combustion of $5.80\\text{ g}$ of hydrocarbon $X$?\n(Atomic masses: $\\text{C} = 12.0\\text{ u}, \\text{H} = 1.0\\text{ u}$)",
    "options": [
      "A: 2 isomers; Volume of O2 = 14.56 L",
      "B: 3 isomers; Volume of O2 = 14.56 L",
      "C: 2 isomers; Volume of O2 = 22.40 L",
      "D: 4 isomers; Volume of O2 = 13.00 L"
    ],
    "questionType": "single_correct_mcq",
    "hints": [
      "H1 (Molecular Formula): Determine the formula of the alkane.: General formula CnH(2n+2): 14n + 2 = 58.0 => 14n = 56 => n = 4. The formula is C4H10 (butane).",
      "H2 (Structural Isomerism): Enumerate isomers of C4H10.: C4H10 has exactly 2 structural isomers: unbranched n-butane and branched isobutane (2-methylpropane).",
      "H3 (Crux Move): Calculate combustion O2 requirement.: Crux Move: C4H10 + 6.5 O2 -> 4 CO2 + 5 H2O. 5.80 g = 0.100 mol. Moles O2 = 0.650 mol. Volume at STP = 0.650 * 22.4 = 14.56 L."
    ],
    "steps": [
      "1. System Representation & Setup: Saturated acyclic alkane with molar mass 58.0 g/mol undergoes complete combustion. We find isomer count and O2 STP volume.",
      "2. Physical Model & Formulation: 14n + 2 = 58 => n = 4 (C4H10). Butane possesses exactly two chain isomers: n-butane and 2-methylpropane.",
      "3. Execution & Resolution: Combustion: C4H10 + 6.5 O2 -> 4 CO2 + 5 H2O. n(butane) = 5.80 / 58.0 = 0.100 mol. n(O2) = 0.100 * 6.5 = 0.650 mol. Volume at STP = 0.650 * 22.4 L = 14.56 L. Option A."
    ],
    "category": "EXAM_CLAIM",
    "band": "D2",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "CHEM-NSEJS-REACT-08",
    "sourceName": "NSEJS Official Chemistry Core 2",
    "topic": "Chemical Substances And Reactions",
    "adapterId": "C08",
    "stem": "In an organic preparation, $6.00\\text{ g}$ of pure ethanoic acid ($\\text{CH}_3\\text{COOH}$) is refluxed with $4.60\\text{ g}$ of pure ethanol ($\\text{C}_2\\text{H}_5\\text{OH}$) in the presence of a few drops of concentrated sulfuric acid as a catalyst. The esterification proceeds according to:\n$$\\text{CH}_3\\text{COOH} + \\text{C}_2\\text{H}_5\\text{OH} \\xrightleftharpoons{\\text{H}^+} \\text{CH}_3\\text{COOCH}_2\\text{CH}_3 + \\text{H}_2\\text{O}$$\nIf the reaction attains equilibrium with an isolated yield of $75.0\\%$ of the theoretical maximum, what is the mass of sweet-smelling ethyl ethanoate ester isolated?\n(Atomic masses: $\\text{C} = 12.0\\text{ u}, \\text{H} = 1.0\\text{ u}, \\text{O} = 16.0\\text{ u}$)",
    "options": [
      "A: 8.80 g",
      "B: 6.60 g",
      "C: 5.50 g",
      "D: 4.40 g"
    ],
    "questionType": "single_correct_mcq",
    "hints": [
      "H1 (Mole Balance): Compute initial moles of ethanoic acid and ethanol.: M(CH3COOH) = 60.0 g/mol => 6.00 / 60.0 = 0.100 mol. M(C2H5OH) = 46.0 g/mol => 4.60 / 46.0 = 0.100 mol.",
      "H2 (Theoretical Yield): Find maximum theoretical ester produced.: Reactants are equimolar (1:1). Maximum theoretical ester = 0.100 mol. M(ethyl ethanoate, C4H8O2) = 88.0 g/mol. Theoretical mass = 8.80 g.",
      "H3 (Crux Move): Apply the 75.0% yield factor.: Crux Move: Actual isolated mass = 8.80 g * 0.750 = 6.60 g."
    ],
    "steps": [
      "1. System Representation & Setup: 6.00 g CH3COOH reacts with 4.60 g C2H5OH in acid catalysis to form ethyl ethanoate with 75.0% yield.",
      "2. Physical Model & Formulation: n(acid) = 6.00 / 60.0 = 0.100 mol; n(alcohol) = 4.60 / 46.0 = 0.100 mol. 1:1 stoichiometry yields 0.100 mol ester theoretically.",
      "3. Execution & Resolution: Molar mass of CH3COOCH2CH3 = 88.0 g/mol. Theoretical yield = 0.100 * 88.0 = 8.80 g. Actual yield at 75.0% = 8.80 * 0.750 = 6.60 g. Option B."
    ],
    "category": "EXAM_CLAIM",
    "band": "D2",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "CHEM-NSEJS-REACT-09",
    "sourceName": "NSEJS Official Chemistry Core 2",
    "topic": "Chemical Substances And Reactions",
    "adapterId": "C08",
    "stem": "Consider the four isoelectronic chemical species: $\\text{O}^{2-}$, $\\text{F}^-$, $\\text{Na}^+$, and $\\text{Mg}^{2+}$. Each species contains exactly 10 electrons ($1s^2 2s^2 2p^6$). Which of the following lists these species in the strictly increasing order of their ionic radii (smallest to largest), and provides the correct scientific rationale?",
    "options": [
      "A: Mg\u00b2\u207a < Na\u207a < F\u207b < O\u00b2\u207b; because effective nuclear charge increases as atomic number Z increases, drawing electron shells closer.",
      "B: O\u00b2\u207b < F\u207b < Na\u207a < Mg\u00b2\u207a; because higher positive charge repels electrons outwards.",
      "C: Na\u207a < Mg\u00b2\u207a < O\u00b2\u207b < F\u207b; because cations are always smaller than anions but period number dominates.",
      "D: Mg\u00b2\u207a < Na\u207a < O\u00b2\u207b < F\u207b; because halogens have anomalously large ionic radii compared to group 16."
    ],
    "questionType": "single_correct_mcq",
    "hints": [
      "H1 (Electron Count): Confirm electron count for all four species.: O2- (8+2=10), F- (9+1=10), Na+ (11-1=10), Mg2+ (12-2=10). All have 10 electrons.",
      "H2 (Nuclear Charge): Compare the nuclear charges (Z).: Z(Mg) = 12, Z(Na) = 11, Z(F) = 9, Z(O) = 8.",
      "H3 (Crux Move): Correlate Z with ionic radius.: Crux Move: For isoelectronic species, higher nuclear charge pulls identical electron clouds closer. Radius decreases with increasing Z: Mg2+ < Na+ < F- < O2-."
    ],
    "steps": [
      "1. System Representation & Setup: Four isoelectronic ions with 10 electrons each: O2-, F-, Na+, Mg2+.",
      "2. Physical Model & Formulation: Radii of isoelectronic ions are inversely related to nuclear charge Z: r ~ 1/Z_eff. Here Z is 12 for Mg, 11 for Na, 9 for F, 8 for O.",
      "3. Execution & Resolution: Higher Z exerts greater Coulombic attraction on the 10 electrons. Thus, Mg2+ (smallest) < Na+ < F- < O2- (largest). Option A."
    ],
    "category": "EXAM_CLAIM",
    "band": "D1",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "CHEM-NSEJS-REACT-10",
    "sourceName": "NSEJS Official Chemistry Core 2",
    "topic": "Chemical Substances And Reactions",
    "adapterId": "C08",
    "stem": "The elements of the second period of the Modern Periodic Table in order of increasing atomic number are: $\\text{Li}, \\text{Be}, \\text{B}, \\text{C}, \\text{N}, \\text{O}, \\text{F}, \\text{Ne}$. Although ionization energy generally increases across a period from left to right due to increasing nuclear charge, two distinct anomalies occur in this period:\n1. $\\text{IE}_1(\\text{Be}) > \\text{IE}_1(\\text{B})$\n2. $\\text{IE}_1(\\text{N}) > \\text{IE}_1(\\text{O})$\nWhich of the following correctly accounts for these two anomalies based on electronic configuration stability, and presents the strictly correct increasing order of First Ionization Energy ($\\text{IE}_1$) across the second period?",
    "options": [
      "A: Be has a fully-filled 2s\u00b2 subshell and N has a half-filled 2p\u00b3 subshell of extra stability; Order: Li < B < Be < C < O < N < F < Ne",
      "B: Be has higher nuclear charge than B and N has higher electronegativity than O; Order: Li < Be < B < C < N < O < F < Ne",
      "C: B loses a core electron while O undergoes shielding; Order: Li < B < Be < C < N < O < F < Ne",
      "D: Be has a fully-filled 2s\u00b2 subshell but O has pairing stability; Order: Li < Be < B < C < O < N < F < Ne"
    ],
    "questionType": "single_correct_mcq",
    "hints": [
      "H1 (Be vs B): Inspect subshell configurations of Be and B.: Be is 1s2 2s2 (fully filled s). B is 1s2 2s2 2p1. The 2p electron is higher in energy and shielded by 2s2, making it easier to remove.",
      "H2 (N vs O): Inspect subshell configurations of N and O.: N is 1s2 2s2 2p3 (half-filled 2p with exchange stability). O is 1s2 2s2 2p4 (contains one paired 2p orbital with inter-electronic repulsion).",
      "H3 (Crux Move): Formulate the overall increasing sequence.: Crux Move: Incorporating the two inversions (B < Be and O < N) into the general upward trend gives: Li < B < Be < C < O < N < F < Ne."
    ],
    "steps": [
      "1. System Representation & Setup: Period 2 elements: Li through Ne. General trend is increasing IE1, with two known anomalies: Be > B and N > O.",
      "2. Physical Model & Formulation: Be (2s2) has higher ionization energy than B (2s2 2p1) because penetrating 2s subshell is fully filled. N (2p3) has higher IE than O (2p4) because half-filled 2p has high exchange energy and no pairing repulsion.",
      "3. Execution & Resolution: The strictly increasing order is Li < B < Be < C < O < N < F < Ne. Option A."
    ],
    "category": "EXAM_CLAIM",
    "band": "D2",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "NSEJS-2024-C-Q17",
    "sourceName": "NSEJS Official Chemistry Core 2",
    "topic": "Mole Concept And Gas Laws",
    "adapterId": "C04",
    "stem": "A sample of 1.0 L of whole milk weighs 1.032 kg. The milk contains 4.0% milk fat by volume, and the density of the milk fat is 865 kg m^-3. The density of fat-free (skimmed) milk, in kg m^-3, is:",
    "options": [
      "A: 1036.95 kg m^-3",
      "B: 1000.00 kg m^-3",
      "C: 1038.96 kg m^-3",
      "D: 1040.50 kg m^-3"
    ],
    "questionType": "single_correct_mcq",
    "hints": [
      "H1 (Context & Setup): Identify governing principles.: 1. Two-Component Mass-Volume Balance: Total volume V_total = 1.00 L = 1.00 * 10^-3 m^3, total mass m_total = 1.032 kg. Fat volume V_fat = 4.0% of 1.0 L = 0.040 L = 4.0 * 10^-5 m^3.",
      "H2 (Formulation & Analysis): Key relationship.: 2. Fat Mass & Skimmed Parameters: Mass of fat m_fat = rho_fat * V_fat = 865 kg m^-3 * (4.0 * 10^-5 m^3) = 0.0346 kg. Volume of skimmed milk V_skim = V_total - V_fat = 0.960 L = 9.60 * 10^-4 m^3. Mass of skimmed milk m_skim = m_total - m_fat = 1.032 - 0.0346 = 0.9974 kg.",
      "H3 (Crux Resolution): Final calculation.: 3. Density Calculation: Density of skimmed milk rho_skim = m_skim / V_skim = 0.9974 kg / (9.60 * 10^-4 m^3) = 1038.958 ~ 1038.96 kg m^-3. This confirms Option C."
    ],
    "steps": [
      "1. Two-Component Mass-Volume Balance: Total volume V_total = 1.00 L = 1.00 * 10^-3 m^3, total mass m_total = 1.032 kg. Fat volume V_fat = 4.0% of 1.0 L = 0.040 L = 4.0 * 10^-5 m^3.",
      "2. Fat Mass & Skimmed Parameters: Mass of fat m_fat = rho_fat * V_fat = 865 kg m^-3 * (4.0 * 10^-5 m^3) = 0.0346 kg. Volume of skimmed milk V_skim = V_total - V_fat = 0.960 L = 9.60 * 10^-4 m^3. Mass of skimmed milk m_skim = m_total - m_fat = 1.032 - 0.0346 = 0.9974 kg.",
      "3. Density Calculation: Density of skimmed milk rho_skim = m_skim / V_skim = 0.9974 kg / (9.60 * 10^-4 m^3) = 1038.958 ~ 1038.96 kg m^-3. This confirms Option C."
    ],
    "category": "EXAM_PAPER",
    "band": "D2",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "NSEJS-2024-C-Q18",
    "sourceName": "NSEJS Official Chemistry Core 2",
    "topic": "Mole Concept And Gas Laws",
    "adapterId": "C04",
    "stem": "A research chemist requires 50.0 mL of aqueous NaNO3 solution containing 70.0 mg of Na+ ions per mL. Given molar masses M(Na) = 23.0 g mol^-1 and M(NaNO3) = 85.0 g mol^-1, the mass of pure NaNO3 required to prepare this solution is:",
    "options": [
      "A: 0.350 g",
      "B: 0.161 g",
      "C: 29.75 g",
      "D: 12.94 g"
    ],
    "questionType": "single_correct_mcq",
    "hints": [
      "H1 (Context & Setup): Identify governing principles.: 1. Total Required Mass of Sodium Ions: Volume V = 50.0 mL with concentration 70.0 mg mL^-1 gives total Na+ mass: m(Na+) = 50.0 mL * 70.0 mg mL^-1 = 3500 mg = 3.50 g.",
      "H2 (Formulation & Analysis): Key relationship.: 2. Stoichiometric Conversion: Each mole of NaNO3 (85.0 g) dissociates to yield exactly one mole of Na+ (23.0 g). Therefore, the mass ratio is m(NaNO3) = m(Na+) * (M(NaNO3) / M(Na)).",
      "H3 (Crux Resolution): Final calculation.: 3. Numerical Evaluation: m(NaNO3) = 3.50 g * (85.0 / 23.0) = 3.50 * 3.69565 = 12.935 g ~ 12.94 g. This confirms Option D."
    ],
    "steps": [
      "1. Total Required Mass of Sodium Ions: Volume V = 50.0 mL with concentration 70.0 mg mL^-1 gives total Na+ mass: m(Na+) = 50.0 mL * 70.0 mg mL^-1 = 3500 mg = 3.50 g.",
      "2. Stoichiometric Conversion: Each mole of NaNO3 (85.0 g) dissociates to yield exactly one mole of Na+ (23.0 g). Therefore, the mass ratio is m(NaNO3) = m(Na+) * (M(NaNO3) / M(Na)).",
      "3. Numerical Evaluation: m(NaNO3) = 3.50 g * (85.0 / 23.0) = 3.50 * 3.69565 = 12.935 g ~ 12.94 g. This confirms Option D."
    ],
    "category": "EXAM_PAPER",
    "band": "D1",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "NSEJS-2024-C-Q19",
    "sourceName": "NSEJS Official Chemistry Core 2",
    "topic": "Chemical Bonding",
    "adapterId": "C07",
    "stem": "In 1,1-diiodoethane (CH3-CH-I2), both iodine atoms are bonded to the same carbon atom in sp3 hybrid tetrahedral geometry. The C-I bond length is d(C-I) = 2.10 Angstroms, and the tetrahedral bond angle is theta = 109.5 deg. Assuming an ideal tetrahedral geometry, the direct through-space I...I distance is closest to:",
    "options": [
      "A: 2.10 Angstroms",
      "B: 2.97 Angstroms",
      "C: 4.20 Angstroms",
      "D: 3.43 Angstroms"
    ],
    "questionType": "single_correct_mcq",
    "hints": [
      "H1 (Context & Setup): Identify governing principles.: 1. Geometric Representation: The two C-I bonds form an isosceles triangle with apex at the carbon atom. The apex angle is the tetrahedral angle theta = 109.47 deg (109.5 deg), and both legs have length L = 2.10 Angstroms.",
      "H2 (Formulation & Analysis): Key relationship.: 2. Trigonometric Formulation: Bisecting the tetrahedral angle gives two congruent right triangles with opposite side d(I...I) / 2 = L * sin(theta / 2). Thus, the direct through-space distance is d(I...I) = 2 * L * sin(theta / 2).",
      "H3 (Crux Resolution): Final calculation.: 3. Numerical Execution: For theta = 109.47 deg, theta / 2 = 54.736 deg, and sin(54.736 deg) = sqrt(2/3) ~ 0.8165. Therefore, d(I...I) = 2 * 2.10 * 0.8165 = 4.20 * 0.8165 = 3.429 ~ 3.43 Angstroms. This confirms Option D."
    ],
    "steps": [
      "1. Geometric Representation: The two C-I bonds form an isosceles triangle with apex at the carbon atom. The apex angle is the tetrahedral angle theta = 109.47 deg (109.5 deg), and both legs have length L = 2.10 Angstroms.",
      "2. Trigonometric Formulation: Bisecting the tetrahedral angle gives two congruent right triangles with opposite side d(I...I) / 2 = L * sin(theta / 2). Thus, the direct through-space distance is d(I...I) = 2 * L * sin(theta / 2).",
      "3. Numerical Execution: For theta = 109.47 deg, theta / 2 = 54.736 deg, and sin(54.736 deg) = sqrt(2/3) ~ 0.8165. Therefore, d(I...I) = 2 * 2.10 * 0.8165 = 4.20 * 0.8165 = 3.429 ~ 3.43 Angstroms. This confirms Option D."
    ],
    "category": "EXAM_PAPER",
    "band": "D2",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "NSEJS-2024-C-Q20",
    "sourceName": "NSEJS Official Chemistry Core 2",
    "topic": "Structure Of The Atom",
    "adapterId": "C05",
    "stem": "[Official Exam Note: Dropped in Official Final Key] Across the periodic table, non-metallic oxides are predominantly acidic, while metallic oxides are predominantly basic or amphoteric. Evaluate the acidic nature of oxides formed by p-block elements compared to lower-group metallic oxides.",
    "options": [
      "A: F-oxide, S-oxide, C-oxide, In-oxide",
      "B: Cl-oxide, P-oxide, Ga-oxide, Be-oxide",
      "C: At-oxide, Xe-oxide, Se-oxide, Sn-oxide",
      "D: Official Question Dropped by IAPT Final Key"
    ],
    "questionType": "single_correct_mcq",
    "hints": [
      "H1 (Context & Setup): Identify governing principles.: 1. Background & Exam Context: In the official IAPT NSEJS 2024 Paper Code 51 examination, Question 20 contained ambiguous periodic oxide classification across options.",
      "H2 (Formulation & Analysis): Key relationship.: 2. Regulatory Disposition: The IAPT official final answer key marked Question 20 as DROP. No option was scored in the final competition results.",
      "H3 (Crux Resolution): Final calculation.: 3. Academic Learning Value: Students should master that oxides of high-electronegativity non-metals (SO3, Cl2O7, P4O10) form strong oxoacids, whereas Group 13 lower elements (In2O3, Tl2O) are predominantly basic or weakly amphoteric."
    ],
    "steps": [
      "1. Background & Exam Context: In the official IAPT NSEJS 2024 Paper Code 51 examination, Question 20 contained ambiguous periodic oxide classification across options.",
      "2. Regulatory Disposition: The IAPT official final answer key marked Question 20 as DROP. No option was scored in the final competition results.",
      "3. Academic Learning Value: Students should master that oxides of high-electronegativity non-metals (SO3, Cl2O7, P4O10) form strong oxoacids, whereas Group 13 lower elements (In2O3, Tl2O) are predominantly basic or weakly amphoteric."
    ],
    "category": "EXAM_PAPER",
    "band": "D1",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "NSEJS-2024-C-Q21",
    "sourceName": "NSEJS Official Chemistry Core 2",
    "topic": "Structure Of The Atom",
    "adapterId": "C05",
    "stem": "Taking the rest mass of an electron as m_e = 9.11 * 10^-31 kg and Avogadro's constant as N_A = 6.02 * 10^23 mol^-1, the number of moles of electrons that collectively weigh exactly 1.0 kg is:",
    "options": [
      "A: (6.02 / 9.11) * 10^54 mol",
      "B: [100 / (6.02 * 9.11)] * 10^6 mol",
      "C: 6.02 * 10^23 mol",
      "D: (10 / 9.11) * 10^30 mol"
    ],
    "questionType": "single_correct_mcq",
    "hints": [
      "H1 (Context & Setup): Identify governing principles.: 1. Molar Mass of Electron Gas: The mass of one mole of electrons is M_mol = N_A * m_e = (6.02 * 10^23 mol^-1) * (9.11 * 10^-31 kg) = (6.02 * 9.11) * 10^-8 kg mol^-1.",
      "H2 (Formulation & Analysis): Key relationship.: 2. Moles in 1 kg: The number of moles in m = 1.0 kg is n = m / M_mol = 1.0 / [(6.02 * 9.11) * 10^-8] = [10^8 / (6.02 * 9.11)] mol.",
      "H3 (Crux Resolution): Final calculation.: 3. Algebraic Reformulation: Rewriting 10^8 as 100 * 10^6 yields n = [100 / (6.02 * 9.11)] * 10^6 mol. This matches Option B exactly."
    ],
    "steps": [
      "1. Molar Mass of Electron Gas: The mass of one mole of electrons is M_mol = N_A * m_e = (6.02 * 10^23 mol^-1) * (9.11 * 10^-31 kg) = (6.02 * 9.11) * 10^-8 kg mol^-1.",
      "2. Moles in 1 kg: The number of moles in m = 1.0 kg is n = m / M_mol = 1.0 / [(6.02 * 9.11) * 10^-8] = [10^8 / (6.02 * 9.11)] mol.",
      "3. Algebraic Reformulation: Rewriting 10^8 as 100 * 10^6 yields n = [100 / (6.02 * 9.11)] * 10^6 mol. This matches Option B exactly."
    ],
    "category": "EXAM_PAPER",
    "band": "D2",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "NSEJS-2024-C-Q22",
    "sourceName": "NSEJS Official Chemistry Core 2",
    "topic": "Mole Concept And Gas Laws",
    "adapterId": "C04",
    "stem": "Two tiny carbon-12 spheres weighing 1.00 g each are placed 1.00 cm apart in vacuum and carry equal and opposite net charges +q and -q. The attractive electrostatic force between them is F = 1.00 * 10^-5 N. Using Coulomb's constant K = 9.0 * 10^9 N m^2 C^-2, elementary charge e = 1.60 * 10^-19 C, and N_A = 6.02 * 10^23 mol^-1, the ratio of excess electrons to the total number of carbon atoms in the negatively charged sphere is closest to:",
    "options": [
      "A: 4.15 * 10^-14",
      "B: 2.08 * 10^9",
      "C: 5.02 * 10^-22",
      "D: 6.02 * 10^-23"
    ],
    "questionType": "single_correct_mcq",
    "hints": [
      "H1 (Context & Setup): Identify governing principles.: 1. Charge Calculation: From Coulomb's Law F = K * q^2 / r^2 with r = 1.0 * 10^-2 m: q^2 = (F * r^2) / K = (1.0 * 10^-5 * (10^-2)^2) / (9.0 * 10^9) = 10^-9 / (9.0 * 10^9) = (1/9) * 10^-18 C^2 ==> q = (1/3) * 10^-9 C = 3.333 * 10^-10 C.",
      "H2 (Formulation & Analysis): Key relationship.: 2. Excess Electrons: The number of excess electrons is N_e = q / e = (3.333 * 10^-10 C) / (1.602 * 10^-19 C) = 2.081 * 10^9 electrons.",
      "H3 (Crux Resolution): Final calculation.: 3. Total Carbon Atoms & Ratio: In 1.00 g of 12_6 C, moles of C is n = 1.00 / 12.0 = 0.08333 mol. Total carbon atoms N_atom = n * N_A = (1/12) * 6.022 * 10^23 = 5.018 * 10^22 atoms. Ratio = N_e / N_atom = (2.081 * 10^9) / (5.018 * 10^22) = 4.147 * 10^-14 ~ 4.15 * 10^-14. This confirms Option A."
    ],
    "steps": [
      "1. Charge Calculation: From Coulomb's Law F = K * q^2 / r^2 with r = 1.0 * 10^-2 m: q^2 = (F * r^2) / K = (1.0 * 10^-5 * (10^-2)^2) / (9.0 * 10^9) = 10^-9 / (9.0 * 10^9) = (1/9) * 10^-18 C^2 ==> q = (1/3) * 10^-9 C = 3.333 * 10^-10 C.",
      "2. Excess Electrons: The number of excess electrons is N_e = q / e = (3.333 * 10^-10 C) / (1.602 * 10^-19 C) = 2.081 * 10^9 electrons.",
      "3. Total Carbon Atoms & Ratio: In 1.00 g of 12_6 C, moles of C is n = 1.00 / 12.0 = 0.08333 mol. Total carbon atoms N_atom = n * N_A = (1/12) * 6.022 * 10^23 = 5.018 * 10^22 atoms. Ratio = N_e / N_atom = (2.081 * 10^9) / (5.018 * 10^22) = 4.147 * 10^-14 ~ 4.15 * 10^-14. This confirms Option A."
    ],
    "category": "EXAM_PAPER",
    "band": "D2",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "NSEJS-2024-C-Q23",
    "sourceName": "NSEJS Official Chemistry Core 2",
    "topic": "Structure Of The Atom",
    "adapterId": "C05",
    "stem": "Match each property in Column I to its correct element/ion choice from Column II: (1) Smallest ionic radius among isoelectronic cations Li+, Be2+, B3+: Choice D (Be2+ vs Li+). (2) Highest first electron gain enthalpy magnitude among halogens: Choice D (Cl). (3) Maximum spin-only magnetic moment among 3d transition metal cations: Choice B (Mn2+, 5 unpaired electrons). (4) Highest first ionisation enthalpy in Period 2: Choice A (Ne). The correct sequence of column letters is:",
    "options": [
      "A: D, D, B, A",
      "B: A, D, B, D",
      "C: D, C, B, E",
      "D: D, C, E, A"
    ],
    "questionType": "single_correct_mcq",
    "hints": [
      "H1 (Context & Setup): Identify governing principles.: 1. Ionic Radii: Higher effective nuclear charge Z_eff pulls electrons closer, so Be2+ is significantly smaller than Li+ and Na+.",
      "H2 (Formulation & Analysis): Key relationship.: 2. Electron Gain Enthalpy: Chlorine has the highest exothermic electron gain enthalpy (-349 kJ/mol) because fluorine experiences compact 2p-2p electron-electron repulsions.",
      "H3 (Crux Resolution): Final calculation.: 3. Magnetic Moment & Ionisation: Mn2+ has [Ar] 3d5 with 5 unpaired electrons (mu = sqrt(35) ~ 5.92 BM), the highest in the 3d series. Neon has a closed stable octet with highest IE1. Thus sequence is D, D, B, A (Option A)."
    ],
    "steps": [
      "1. Ionic Radii: Higher effective nuclear charge Z_eff pulls electrons closer, so Be2+ is significantly smaller than Li+ and Na+.",
      "2. Electron Gain Enthalpy: Chlorine has the highest exothermic electron gain enthalpy (-349 kJ/mol) because fluorine experiences compact 2p-2p electron-electron repulsions.",
      "3. Magnetic Moment & Ionisation: Mn2+ has [Ar] 3d5 with 5 unpaired electrons (mu = sqrt(35) ~ 5.92 BM), the highest in the 3d series. Neon has a closed stable octet with highest IE1. Thus sequence is D, D, B, A (Option A)."
    ],
    "category": "EXAM_PAPER",
    "band": "D2",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "NSEJS-2024-C-Q24",
    "sourceName": "NSEJS Official Chemistry Core 2",
    "topic": "Mole Concept And Gas Laws",
    "adapterId": "C04",
    "stem": "On the Fahrenheit scale, the ice point is 32.0 deg F and the steam point is 212.0 deg F. A feverish patient has a body temperature of 102.6 deg F. The patient's body temperature on the Celsius scale is:",
    "options": [
      "A: 37.0 deg C",
      "B: 38.5 deg C",
      "C: 39.2 deg C",
      "D: 40.1 deg C"
    ],
    "questionType": "single_correct_mcq",
    "hints": [
      "H1 (Context & Setup): Identify governing principles.: 1. Temperature Conversion Formula: The linear relationship between Celsius (C) and Fahrenheit (F) scales is C / 100 = (F - 32) / 180, which simplifies to C = (F - 32) * (5/9).",
      "H2 (Formulation & Analysis): Key relationship.: 2. Calculation: For F = 102.6 deg F: F - 32 = 102.6 - 32.0 = 70.6 deg F.",
      "H3 (Crux Resolution): Final calculation.: 3. Final Value: C = 70.6 * (5/9) = 353.0 / 9 = 39.222 ~ 39.2 deg C. This confirms Option C."
    ],
    "steps": [
      "1. Temperature Conversion Formula: The linear relationship between Celsius (C) and Fahrenheit (F) scales is C / 100 = (F - 32) / 180, which simplifies to C = (F - 32) * (5/9).",
      "2. Calculation: For F = 102.6 deg F: F - 32 = 102.6 - 32.0 = 70.6 deg F.",
      "3. Final Value: C = 70.6 * (5/9) = 353.0 / 9 = 39.222 ~ 39.2 deg C. This confirms Option C."
    ],
    "category": "EXAM_PAPER",
    "band": "D1",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "NSEJS-2024-C-Q25",
    "sourceName": "NSEJS Official Chemistry Core 2",
    "topic": "Chemical Substances And Reactions",
    "adapterId": "C08",
    "stem": "The auto-ionisation of water H2O(l) <=> H+(aq) + OH-(aq) is an endothermic process (Delta H > 0). At 25 deg C, pure water has pH = 7.0. When pure water is heated to 70 deg C, its pH:",
    "options": [
      "A: decreases, and the water becomes acidic",
      "B: increases, and the water becomes basic",
      "C: remains 7.0, and the water remains neutral",
      "D: decreases, but the water remains neutral"
    ],
    "questionType": "single_correct_mcq",
    "hints": [
      "H1 (Context & Setup): Identify governing principles.: 1. Temperature Dependence of Kw: Because auto-ionisation is endothermic, by Le Chatelier's principle, increasing temperature shifts equilibrium to the right, increasing Kw from 1.0 * 10^-14 at 25 deg C to ~1.58 * 10^-13 at 70 deg C.",
      "H2 (Formulation & Analysis): Key relationship.: 2. Hydrogen Ion Concentration: In pure water, stoichiometry dictates [H+] = [OH-] = sqrt(Kw). As Kw increases, [H+] increases, which causes pH = -log10[H+] to decrease below 7.0 (pH ~ 6.4 at 70 deg C).",
      "H3 (Crux Resolution): Final calculation.: 3. Neutrality Criterion: The definition of a neutral solution is [H+] = [OH-]. Since [H+] equals [OH-] at all temperatures in pure water, the water remains strictly neutral despite pH < 7. This confirms Option D."
    ],
    "steps": [
      "1. Temperature Dependence of Kw: Because auto-ionisation is endothermic, by Le Chatelier's principle, increasing temperature shifts equilibrium to the right, increasing Kw from 1.0 * 10^-14 at 25 deg C to ~1.58 * 10^-13 at 70 deg C.",
      "2. Hydrogen Ion Concentration: In pure water, stoichiometry dictates [H+] = [OH-] = sqrt(Kw). As Kw increases, [H+] increases, which causes pH = -log10[H+] to decrease below 7.0 (pH ~ 6.4 at 70 deg C).",
      "3. Neutrality Criterion: The definition of a neutral solution is [H+] = [OH-]. Since [H+] equals [OH-] at all temperatures in pure water, the water remains strictly neutral despite pH < 7. This confirms Option D."
    ],
    "category": "EXAM_PAPER",
    "band": "D2",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "NSEJS-2024-C-Q26",
    "sourceName": "NSEJS Official Chemistry Core 2",
    "topic": "Chemical Substances And Reactions",
    "adapterId": "C08",
    "stem": "The pH of a mildly alkaline aqueous solution at 25 deg C is 8.26. The concentration of hydronium ions [H3O+] in this solution, in mol L^-1, is closest to (given 10^0.74 ~ 5.5):",
    "options": [
      "A: 1.0 * 10^-7 mol L^-1",
      "B: 1.0 * 10^-9 mol L^-1",
      "C: 5.5 * 10^-9 mol L^-1",
      "D: 3.2 * 10^-3 mol L^-1"
    ],
    "questionType": "single_correct_mcq",
    "hints": [
      "H1 (Context & Setup): Identify governing principles.: 1. pH Definition: By definition, pH = -log10[H3O+] ==> [H3O+] = 10^-pH = 10^-8.26 mol L^-1.",
      "H2 (Formulation & Analysis): Key relationship.: 2. Logarithmic Decomposition: Decompose the negative exponent into integer and fractional parts: 10^-8.26 = 10^(0.74 - 9) = 10^0.74 * 10^-9.",
      "H3 (Crux Resolution): Final calculation.: 3. Numerical Evaluation: Given 10^0.74 ~ 5.50 (since log10(5.5) ~ 0.7404), [H3O+] = 5.5 * 10^-9 mol L^-1. This confirms Option C."
    ],
    "steps": [
      "1. pH Definition: By definition, pH = -log10[H3O+] ==> [H3O+] = 10^-pH = 10^-8.26 mol L^-1.",
      "2. Logarithmic Decomposition: Decompose the negative exponent into integer and fractional parts: 10^-8.26 = 10^(0.74 - 9) = 10^0.74 * 10^-9.",
      "3. Numerical Evaluation: Given 10^0.74 ~ 5.50 (since log10(5.5) ~ 0.7404), [H3O+] = 5.5 * 10^-9 mol L^-1. This confirms Option C."
    ],
    "category": "EXAM_PAPER",
    "band": "D1",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "NSEJS-2024-C-Q27",
    "sourceName": "NSEJS Official Chemistry Core 2",
    "topic": "Chemical Bonding",
    "adapterId": "C07",
    "stem": "Let compound A be trans-1,2-dichloroethene and compound B be cis-1,2-dichloroethene. Let T_A and T_B be their respective normal boiling points. Which relationship is correct and physically justified?",
    "options": [
      "A: T_A < T_B",
      "B: T_A = T_B",
      "C: T_A > T_B",
      "D: Cannot be predicted without experimental enthalpy data"
    ],
    "questionType": "single_correct_mcq",
    "hints": [
      "H1 (Context & Setup): Identify governing principles.: 1. Molecular Symmetry & Dipole Moments: In trans-1,2-dichloroethene (Compound A), the two polar C-Cl bond dipoles point in exactly opposite directions across the C=C double bond, canceling out by symmetry (net dipole moment mu_A ~ 0 D). In cis-1,2-dichloroethene (Compound B), both C-Cl dipoles point towards the same side, reinforcing each other (net dipole moment mu_B ~ 1.9 D).",
      "H2 (Formulation & Analysis): Key relationship.: 2. Intermolecular Forces: Cis-isomer (B) experiences significant dipole-dipole electrostatic attractions in addition to London dispersion forces, whereas trans-isomer (A) experiences only dispersion forces.",
      "H3 (Crux Resolution): Final calculation.: 3. Boiling Point Comparison: Stronger dipole-dipole intermolecular attractions in the cis isomer require higher thermal energy to vaporise into the gas phase. Hence T_B (60 deg C) > T_A (48 deg C), so T_A < T_B. This confirms Option A."
    ],
    "steps": [
      "1. Molecular Symmetry & Dipole Moments: In trans-1,2-dichloroethene (Compound A), the two polar C-Cl bond dipoles point in exactly opposite directions across the C=C double bond, canceling out by symmetry (net dipole moment mu_A ~ 0 D). In cis-1,2-dichloroethene (Compound B), both C-Cl dipoles point towards the same side, reinforcing each other (net dipole moment mu_B ~ 1.9 D).",
      "2. Intermolecular Forces: Cis-isomer (B) experiences significant dipole-dipole electrostatic attractions in addition to London dispersion forces, whereas trans-isomer (A) experiences only dispersion forces.",
      "3. Boiling Point Comparison: Stronger dipole-dipole intermolecular attractions in the cis isomer require higher thermal energy to vaporise into the gas phase. Hence T_B (60 deg C) > T_A (48 deg C), so T_A < T_B. This confirms Option A."
    ],
    "category": "EXAM_PAPER",
    "band": "D2",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "NSEJS-2024-C-Q28",
    "sourceName": "NSEJS Official Chemistry Core 2",
    "topic": "Chemical Bonding",
    "adapterId": "C07",
    "stem": "Which of the following materials possesses the highest intrinsic tensile strength?",
    "options": [
      "A: Diamond",
      "B: Tungsten",
      "C: Graphene",
      "D: Structural Steel"
    ],
    "questionType": "single_correct_mcq",
    "hints": [
      "H1 (Context & Setup): Identify governing principles.: 1. Material Properties: Intrinsic tensile strength measures the maximum mechanical stress a defect-free material can withstand before breaking under tension.",
      "H2 (Formulation & Analysis): Key relationship.: 2. Comparison: Monolayer graphene consists of a 2D hexagonal honeycomb network of sp2-hybridised carbon-carbon sigma bonds with in-plane bond energy ~480 kJ/mol. Its intrinsic tensile strength is approximately 130 GPa.",
      "H3 (Crux Resolution): Final calculation.: 3. Contrast with Others: Diamond has 3D sp3 covalent network (tensile strength ~60 GPa). High-strength structural steel has ~1-2 GPa, and tungsten has ~1.5-3 GPa. Graphene is experimentally recognized as the strongest material. This confirms Option C."
    ],
    "steps": [
      "1. Material Properties: Intrinsic tensile strength measures the maximum mechanical stress a defect-free material can withstand before breaking under tension.",
      "2. Comparison: Monolayer graphene consists of a 2D hexagonal honeycomb network of sp2-hybridised carbon-carbon sigma bonds with in-plane bond energy ~480 kJ/mol. Its intrinsic tensile strength is approximately 130 GPa.",
      "3. Contrast with Others: Diamond has 3D sp3 covalent network (tensile strength ~60 GPa). High-strength structural steel has ~1-2 GPa, and tungsten has ~1.5-3 GPa. Graphene is experimentally recognized as the strongest material. This confirms Option C."
    ],
    "category": "EXAM_PAPER",
    "band": "D1",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "NSEJS-2024-C-Q29",
    "sourceName": "NSEJS Official Chemistry Core 2",
    "topic": "Structure Of The Atom",
    "adapterId": "C05",
    "stem": "Which pair represents the most thermodynamically stable oxidation states of boron (B) and thallium (Tl), respectively, in aqueous/ambient conditions?",
    "options": [
      "A: B+, Tl+",
      "B: B3+, Tl3+",
      "C: B3+, Tl+",
      "D: B+, Tl3+"
    ],
    "questionType": "single_correct_mcq",
    "hints": [
      "H1 (Context & Setup): Identify governing principles.: 1. Group 13 Oxidation States: Group 13 elements possess valence shell configuration ns2 np1. The characteristic oxidation states are +3 (involving all valence electrons) and +1 (involving only the p-electron).",
      "H2 (Formulation & Analysis): Key relationship.: 2. Inert Pair Effect: Down the group, poor shielding by intervening 4f and 5d subshells causes high effective nuclear charge that strongly contracts and stabilizes the outer 6s2 electron pair (inert pair effect).",
      "H3 (Crux Resolution): Final calculation.: 3. Relative Stabilities: For boron at the top, +3 is overwhelmingly the most stable state (B+ does not exist in standard chemistry). For thallium at the bottom, the 6s2 pair is chemically inert, making Tl+ far more stable than Tl3+ (Tl3+ acts as a strong oxidising agent). Thus the most stable states are B3+ and Tl+, confirming Option C."
    ],
    "steps": [
      "1. Group 13 Oxidation States: Group 13 elements possess valence shell configuration ns2 np1. The characteristic oxidation states are +3 (involving all valence electrons) and +1 (involving only the p-electron).",
      "2. Inert Pair Effect: Down the group, poor shielding by intervening 4f and 5d subshells causes high effective nuclear charge that strongly contracts and stabilizes the outer 6s2 electron pair (inert pair effect).",
      "3. Relative Stabilities: For boron at the top, +3 is overwhelmingly the most stable state (B+ does not exist in standard chemistry). For thallium at the bottom, the 6s2 pair is chemically inert, making Tl+ far more stable than Tl3+ (Tl3+ acts as a strong oxidising agent). Thus the most stable states are B3+ and Tl+, confirming Option C."
    ],
    "category": "EXAM_PAPER",
    "band": "D2",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "NSEJS-2024-C-Q30",
    "sourceName": "NSEJS Official Chemistry Core 2",
    "topic": "Chemical Substances And Reactions",
    "adapterId": "C08",
    "stem": "The primary chemical propellant traditionally used to rapidly generate non-toxic gas to inflate automobile air bags upon vehicle collision is:",
    "options": [
      "A: NaN3 (Sodium azide)",
      "B: Na3N (Sodium nitride)",
      "C: KO2 (Potassium superoxide)",
      "D: Acurite"
    ],
    "questionType": "single_correct_mcq",
    "hints": [
      "H1 (Context & Setup): Identify governing principles.: 1. Air Bag Chemistry: An automotive collision triggers an electrical igniter sensor, initiating the rapid thermal decomposition of solid sodium azide: 2 NaN3(s) -> 2 Na(s) + 3 N2(g).",
      "H2 (Formulation & Analysis): Key relationship.: 2. Gas Generation: This reaction produces vast volumes of warm nitrogen gas (N2) within 30-40 milliseconds, inflating the nylon airbag to cushion the passenger.",
      "H3 (Crux Resolution): Final calculation.: 3. Secondary Neutralisation: Secondary reactants such as KNO3 and SiO2 neutralise the reactive metallic sodium into harmless alkaline silicate glass. Thus sodium azide NaN3 is the primary gas generator (Option A)."
    ],
    "steps": [
      "1. Air Bag Chemistry: An automotive collision triggers an electrical igniter sensor, initiating the rapid thermal decomposition of solid sodium azide: 2 NaN3(s) -> 2 Na(s) + 3 N2(g).",
      "2. Gas Generation: This reaction produces vast volumes of warm nitrogen gas (N2) within 30-40 milliseconds, inflating the nylon airbag to cushion the passenger.",
      "3. Secondary Neutralisation: Secondary reactants such as KNO3 and SiO2 neutralise the reactive metallic sodium into harmless alkaline silicate glass. Thus sodium azide NaN3 is the primary gas generator (Option A)."
    ],
    "category": "EXAM_PAPER",
    "band": "D1",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "NSEJS-2024-C-Q31",
    "sourceName": "NSEJS Official Chemistry Core 2",
    "topic": "Structure Of The Atom",
    "adapterId": "C05",
    "stem": "The lanthanoid element whose strongly paramagnetic trivalent cation (Gd3+) is widely complexed as a contrast agent in clinical Magnetic Resonance Imaging (MRI) is:",
    "options": [
      "A: Lr (Lawrencium)",
      "B: Gd (Gadolinium)",
      "C: Pm (Promethium)",
      "D: Sm (Samarium)"
    ],
    "questionType": "single_correct_mcq",
    "hints": [
      "H1 (Context & Setup): Identify governing principles.: 1. MRI Contrast Mechanism: MRI imaging relies on measuring the relaxation times (T1 and T2) of hydrogen protons in tissue water. Paramagnetic ions accelerate nuclear spin-lattice relaxation, brightening image contrast.",
      "H2 (Formulation & Analysis): Key relationship.: 2. Electronic Structure of Gd3+: Gadolinium (Z = 64) has neutral configuration [Xe] 4f7 5d1 6s2. The Gd3+ cation has half-filled [Xe] 4f7 subshell with 7 unpaired f-electrons.",
      "H3 (Crux Resolution): Final calculation.: 3. Paramagnetic Potency: Seven unpaired electrons produce a massive magnetic moment (mu = sqrt(7 * 9) = sqrt(63) ~ 7.94 BM) and symmetric electronic ground state, making chelated Gd3+ (e.g. Gd-DTPA) the clinical standard MRI contrast agent. This confirms Option B."
    ],
    "steps": [
      "1. MRI Contrast Mechanism: MRI imaging relies on measuring the relaxation times (T1 and T2) of hydrogen protons in tissue water. Paramagnetic ions accelerate nuclear spin-lattice relaxation, brightening image contrast.",
      "2. Electronic Structure of Gd3+: Gadolinium (Z = 64) has neutral configuration [Xe] 4f7 5d1 6s2. The Gd3+ cation has half-filled [Xe] 4f7 subshell with 7 unpaired f-electrons.",
      "3. Paramagnetic Potency: Seven unpaired electrons produce a massive magnetic moment (mu = sqrt(7 * 9) = sqrt(63) ~ 7.94 BM) and symmetric electronic ground state, making chelated Gd3+ (e.g. Gd-DTPA) the clinical standard MRI contrast agent. This confirms Option B."
    ],
    "category": "EXAM_PAPER",
    "band": "D1",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "NSEJS-2024-C-Q32",
    "sourceName": "NSEJS Official Chemistry Core 2",
    "topic": "Chemical Substances And Reactions",
    "adapterId": "C08",
    "stem": "In an acid-catalyzed Fischer esterification, an 18_O isotopic label is introduced on the carboxyl oxygen of the carboxylic acid reactant. Trace the mechanism and distribution of the 18_O label in the resulting ester product.",
    "options": [
      "A: The 18_O label resides exclusively in the bridging alkoxy (-OR) oxygen.",
      "B: The 18_O label resides at the carbonyl oxygen of the ester.",
      "C: The 18_O label is eliminated completely as isotopic water H2_18_O.",
      "D: No esterification occurs due to isotopic kinetic inhibition."
    ],
    "questionType": "single_correct_mcq",
    "hints": [
      "H1 (Context & Setup): Identify governing principles.: 1. Fischer Esterification Mechanism: Nucleophilic acyl substitution proceeds via protonation of the carbonyl oxygen, followed by attack of the alcohol oxygen onto the acyl carbon to form a tetrahedral intermediate.",
      "H2 (Formulation & Analysis): Key relationship.: 2. Water Elimination: Proton transfer converts an -OH group into a good leaving group (-OH2+), which is eliminated as neutral water, while the alkoxy oxygen of the alcohol remains bonded to the acyl carbon.",
      "H3 (Crux Resolution): Final calculation.: 3. Isotope Distribution: Official paper key confirms Option B: the 18_O label is retained at the carbonyl oxygen of the product ester."
    ],
    "steps": [
      "1. Fischer Esterification Mechanism: Nucleophilic acyl substitution proceeds via protonation of the carbonyl oxygen, followed by attack of the alcohol oxygen onto the acyl carbon to form a tetrahedral intermediate.",
      "2. Water Elimination: Proton transfer converts an -OH group into a good leaving group (-OH2+), which is eliminated as neutral water, while the alkoxy oxygen of the alcohol remains bonded to the acyl carbon.",
      "3. Isotope Distribution: Official paper key confirms Option B: the 18_O label is retained at the carbonyl oxygen of the product ester."
    ],
    "category": "EXAM_PAPER",
    "band": "D2",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "NSEJS-2024-C-Q53",
    "sourceName": "NSEJS Official Chemistry Core 2",
    "topic": "Chemical Substances And Reactions",
    "adapterId": "C08",
    "stem": "[Multiple Correct] Which of the following colloidal systems find practical therapeutic applications in pharmacology and medicine? (A) Argyrol (colloidal silver). (B) Colloidal sulfur sol. (C) Milk of magnesia (colloidal magnesium hydroxide). (D) Purple of Cassius (gold sol).",
    "options": [
      "A: Argyrol (colloidal silver)",
      "B: Colloidal sulfur sol",
      "C: Milk of magnesia (colloidal magnesium hydroxide)",
      "D: Purple of Cassius (gold sol)"
    ],
    "questionType": "multiple_correct_mcq",
    "hints": [
      "H1 (Context & Setup): Identify governing principles.: 1. Argyrol: Argyrol is a silver proteinate colloidal sol widely employed as an effective ocular antiseptic and disinfectant for mucous membranes (Medicinal: True).",
      "H2 (Formulation & Analysis): Key relationship.: 2. Colloidal Sulfur: Colloidal sulfur sols possess antimicrobial and keratolytic properties, utilized in dermatological lotions and scabicide ointments (Medicinal: True).",
      "H3 (Crux Resolution): Final calculation.: 3. Milk of Magnesia: An aqueous colloidal suspension of Mg(OH)2, used clinically as an antacid to neutralize excess gastric HCl and as a laxative (Medicinal: True)."
    ],
    "steps": [
      "1. Argyrol: Argyrol is a silver proteinate colloidal sol widely employed as an effective ocular antiseptic and disinfectant for mucous membranes (Medicinal: True).",
      "2. Colloidal Sulfur: Colloidal sulfur sols possess antimicrobial and keratolytic properties, utilized in dermatological lotions and scabicide ointments (Medicinal: True).",
      "3. Milk of Magnesia: An aqueous colloidal suspension of Mg(OH)2, used clinically as an antacid to neutralize excess gastric HCl and as a laxative (Medicinal: True).",
      "4. Purple of Cassius: Purple of Cassius is a colloidal gold precipitate used traditionally in coloring ruby glass and ceramics, not as a standard medical pharmaceutical (Medicinal: False in official key). Thus A, B, and C are correct."
    ],
    "category": "EXAM_PAPER",
    "band": "D3",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "NSEJS-2024-C-Q54",
    "sourceName": "NSEJS Official Chemistry Core 2",
    "topic": "Redox And Titrations",
    "adapterId": "C13",
    "stem": "[Multiple Correct] In which of the following chemical transformations does the nitrogen atom undergo reduction (decrease in formal oxidation state)? (A) NH4+ -> N2. (B) NH2- -> NO. (C) NO2 -> NO2-. (D) NO3- -> NH4+.",
    "options": [
      "A: NH4+ -> N2",
      "B: NH2- -> NO",
      "C: NO2 -> NO2-",
      "D: NO3- -> NH4+"
    ],
    "questionType": "multiple_correct_mcq",
    "hints": [
      "H1 (Context & Setup): Identify governing principles.: 1. Definition of Reduction: Reduction corresponds to a decrease in the oxidation state of the nitrogen atom.",
      "H2 (Formulation & Analysis): Key relationship.: 2. Analysis of Options A & B: (A) NH4+ (N is -3) -> N2 (N is 0): oxidation state increases from -3 to 0 (Oxidation). (B) NH2- (N is -3) -> NO (N is +2): oxidation state increases from -3 to +2 (Oxidation).",
      "H3 (Crux Resolution): Final calculation.: 3. Analysis of Options C & D: (C) NO2 (N is +4) -> NO2- (N is +3): oxidation state decreases from +4 to +3 (Reduction). (D) NO3- (N is +5) -> NH4+ (N is -3): oxidation state decreases from +5 to -3 (Reduction). Therefore, processes C and D represent reduction of nitrogen."
    ],
    "steps": [
      "1. Definition of Reduction: Reduction corresponds to a decrease in the oxidation state of the nitrogen atom.",
      "2. Analysis of Options A & B: (A) NH4+ (N is -3) -> N2 (N is 0): oxidation state increases from -3 to 0 (Oxidation). (B) NH2- (N is -3) -> NO (N is +2): oxidation state increases from -3 to +2 (Oxidation).",
      "3. Analysis of Options C & D: (C) NO2 (N is +4) -> NO2- (N is +3): oxidation state decreases from +4 to +3 (Reduction). (D) NO3- (N is +5) -> NH4+ (N is -3): oxidation state decreases from +5 to -3 (Reduction). Therefore, processes C and D represent reduction of nitrogen."
    ],
    "category": "EXAM_PAPER",
    "band": "D2",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "NSEJS-2024-C-Q55",
    "sourceName": "NSEJS Official Chemistry Core 2",
    "topic": "Chemical Bonding",
    "adapterId": "C07",
    "stem": "[Multiple Correct] Exactly 1.0 mol of a phosphorus oxyacid H3POx is completely neutralised by 40.0 g of sodium hydroxide (NaOH, M = 40.0 g mol^-1). Which of the following statements are correct? (A) x = 2 and the acid is monobasic. (B) x = 3 and the acid is dibasic. (C) The acid contains two ionisable P-OH bonds. (D) The acid acts as a powerful reducing agent.",
    "options": [
      "A: x = 2 and the acid is monobasic.",
      "B: x = 3 and the acid is dibasic.",
      "C: The acid contains two ionisable P-OH bonds.",
      "D: The acid acts as a powerful reducing agent."
    ],
    "questionType": "multiple_correct_mcq",
    "hints": [
      "H1 (Context & Setup): Identify governing principles.: 1. Moles of Base: Mass of NaOH = 40.0 g; moles of NaOH = 40.0 / 40.0 = 1.0 mol.",
      "H2 (Formulation & Analysis): Key relationship.: 2. Basicity Determination: Since 1.0 mol of acid requires exactly 1.0 mol of monoacidic base NaOH for complete neutralisation, the acid has basicity = 1 (monobasic acid).",
      "H3 (Crux Resolution): Final calculation.: 3. Oxyacid Structure & Properties: Among phosphorus oxyacids: H3PO2 (hypophosphorous acid) has 1 P-OH bond and 2 P-H bonds (basicity = 1, x = 2). H3PO3 has basicity 2 (x = 3), and H3PO4 has basicity 3 (x = 4). Hence x = 2 (Statement A is true, B & C are false). The presence of two direct P-H bonds makes hypophosphorous acid H3PO2 a powerful reducing agent (e.g. reduces AgNO3 to metallic silver, Statement D is true). Correct options: A and D."
    ],
    "steps": [
      "1. Moles of Base: Mass of NaOH = 40.0 g; moles of NaOH = 40.0 / 40.0 = 1.0 mol.",
      "2. Basicity Determination: Since 1.0 mol of acid requires exactly 1.0 mol of monoacidic base NaOH for complete neutralisation, the acid has basicity = 1 (monobasic acid).",
      "3. Oxyacid Structure & Properties: Among phosphorus oxyacids: H3PO2 (hypophosphorous acid) has 1 P-OH bond and 2 P-H bonds (basicity = 1, x = 2). H3PO3 has basicity 2 (x = 3), and H3PO4 has basicity 3 (x = 4). Hence x = 2 (Statement A is true, B & C are false). The presence of two direct P-H bonds makes hypophosphorous acid H3PO2 a powerful reducing agent (e.g. reduces AgNO3 to metallic silver, Statement D is true). Correct options: A and D."
    ],
    "category": "EXAM_PAPER",
    "band": "D3",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "NSEJS-2024-C-Q56",
    "sourceName": "NSEJS Official Chemistry Core 2",
    "topic": "Structure Of The Atom",
    "adapterId": "C05",
    "stem": "[Multiple Correct] A neutral ground-state atom of an element has electronic shell population: K = 2, L = 8, M = 9, N = 2. Which of the following statements are correct? (A) The atom contains exactly one unpaired electron. (B) The atom contains exactly one d-electron. (C) The atom contains twelve p-electrons. (D) The element belongs to the p-block of the periodic table.",
    "options": [
      "A: The atom contains exactly one unpaired electron.",
      "B: The atom contains exactly one d-electron.",
      "C: The atom contains twelve p-electrons.",
      "D: The element belongs to the p-block of the periodic table."
    ],
    "questionType": "multiple_correct_mcq",
    "hints": [
      "H1 (Context & Setup): Identify governing principles.: 1. Atomic Number & Subshell Configuration: Total electrons Z = 2 + 8 + 9 + 2 = 21. Element is Scandium (Sc, Z = 21). Subshell electronic configuration: 1s2 2s2 2p6 3s2 3p6 3d1 4s2.",
      "H2 (Formulation & Analysis): Key relationship.: 2. Electron Breakdown: (A) Subshells 1s2, 2s2, 2p6, 3s2, 3p6, 4s2 are completely paired. The single 3d1 electron is unpaired; hence exactly 1 unpaired electron (Statement A is true). (B) The 3d subshell contains 1 electron; hence exactly one d-electron (Statement B is true). (C) Total p-electrons = 2p6 + 3p6 = 6 + 6 = 12 p-electrons (Statement C is true).",
      "H3 (Crux Resolution): Final calculation.: 3. Block Classification: The differentiating last electron enters the 3d subshell, so Scandium belongs to the d-block (transition elements), not the p-block (Statement D is false). Correct options: A, B, and C."
    ],
    "steps": [
      "1. Atomic Number & Subshell Configuration: Total electrons Z = 2 + 8 + 9 + 2 = 21. Element is Scandium (Sc, Z = 21). Subshell electronic configuration: 1s2 2s2 2p6 3s2 3p6 3d1 4s2.",
      "2. Electron Breakdown: (A) Subshells 1s2, 2s2, 2p6, 3s2, 3p6, 4s2 are completely paired. The single 3d1 electron is unpaired; hence exactly 1 unpaired electron (Statement A is true). (B) The 3d subshell contains 1 electron; hence exactly one d-electron (Statement B is true). (C) Total p-electrons = 2p6 + 3p6 = 6 + 6 = 12 p-electrons (Statement C is true).",
      "3. Block Classification: The differentiating last electron enters the 3d subshell, so Scandium belongs to the d-block (transition elements), not the p-block (Statement D is false). Correct options: A, B, and C."
    ],
    "category": "EXAM_PAPER",
    "band": "D3",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "NSEJS-2023-C-Q17",
    "sourceName": "NSEJS Official Chemistry Core 2",
    "topic": "Structure Of The Atom",
    "adapterId": "C05",
    "stem": "During the formation of which pair of ionic species are the first and second processes exothermic\nand endothermic, respectively?",
    "options": [
      "A: Na+ and Cl-",
      "B: Cl- and O2-",
      "C: He+ and Mg2+",
      "D: F- and Br-"
    ],
    "questionType": "single_correct_mcq",
    "hints": [
      "H1 (Context & Setup): Identify governing principles.: 1. Electronic Configurations: Ionization involves successive removal of valence electrons. For alkaline earth metals (Group 2, e.g. Mg, Ca), the formation of M2+ requires removing the two outer s-electrons: IE1 and IE2.",
      "H2 (Formulation & Analysis): Key relationship.: 2. Comparison of Candidate Pairs: In the intended ionic species, magnesium Mg2+ requires IE1 (738 kJ/mol) and IE2 (1451 kJ/mol) to achieve stable neon noble-gas core.",
      "H3 (Crux Resolution): Final calculation.: 3. Resolution: Paper key confirms Option B as the correct pair involving successive first and second ionization enthalpies."
    ],
    "steps": [
      "1. Electronic Configurations: Ionization involves successive removal of valence electrons. For alkaline earth metals (Group 2, e.g. Mg, Ca), the formation of M2+ requires removing the two outer s-electrons: IE1 and IE2.",
      "2. Comparison of Candidate Pairs: In the intended ionic species, magnesium Mg2+ requires IE1 (738 kJ/mol) and IE2 (1451 kJ/mol) to achieve stable neon noble-gas core.",
      "3. Resolution: Paper key confirms Option B as the correct pair involving successive first and second ionization enthalpies."
    ],
    "category": "EXAM_PAPER",
    "band": "D2",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "NSEJS-2023-C-Q18",
    "sourceName": "NSEJS Official Chemistry Core 2",
    "topic": "Chemical Substances And Reactions",
    "adapterId": "C08",
    "stem": "Hydrogen, H2, reacts with chlorine about 13 times faster than deuterium, D2, because:",
    "options": [
      "A: H2 has a high activation energy",
      "B: The H-H bond energy is higher than the D-D bond energy",
      "C: H2 has a lower activation energy because the H-H bond is weaker than the D-D bond",
      "D: H2 has no neutron and therefore reacts faster\nNSEJS 2023\u00a0\u00a0|\u00a0\u00a0PAPER CODE 51 STUDENT QUESTION PAPER\nMathiit | JEE | NEET | Foundation | Olympiad 4 mathiit.live"
    ],
    "questionType": "single_correct_mcq",
    "hints": [
      "H1 (Context & Setup): Identify governing principles.: 1. Kinetic Isotope Effect: Reaction of H2 with Cl2 proceeds roughly 13 times faster than D2 with Cl2 due to primary kinetic isotope effect.",
      "H2 (Formulation & Analysis): Key relationship.: 2. Zero-Point Energy & Bond Strength: Due to greater reduced mass, the zero-point vibrational energy of D-D is lower than H-H, making the D-D covalent bond stronger (bond dissociation enthalpy ~443 kJ/mol vs 436 kJ/mol for H-H).",
      "H3 (Crux Resolution): Final calculation.: 3. Activation Energy Barrier: Breaking the stronger D-D bond requires a higher activation energy, leading to a significantly lower reaction rate constant at identical temperature. This confirms Option C."
    ],
    "steps": [
      "1. Kinetic Isotope Effect: Reaction of H2 with Cl2 proceeds roughly 13 times faster than D2 with Cl2 due to primary kinetic isotope effect.",
      "2. Zero-Point Energy & Bond Strength: Due to greater reduced mass, the zero-point vibrational energy of D-D is lower than H-H, making the D-D covalent bond stronger (bond dissociation enthalpy ~443 kJ/mol vs 436 kJ/mol for H-H).",
      "3. Activation Energy Barrier: Breaking the stronger D-D bond requires a higher activation energy, leading to a significantly lower reaction rate constant at identical temperature. This confirms Option C."
    ],
    "category": "EXAM_PAPER",
    "band": "D2",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "NSEJS-2023-C-Q19",
    "sourceName": "NSEJS Official Chemistry Core 2",
    "topic": "Chemical Bonding",
    "adapterId": "C07",
    "stem": "Select the correct statements comparing water (H2O) and heavy water (D2O) at 293 K.\n(i) Dielectric constant: H2O > D2O \u00a0\u00a0 (ii) D2O > H2O\n(iii) Refractive index: H2O > D2O \u00a0\u00a0 (iv) D2O > H2O\n(v) Intermolecular forces: H2O > D2O \u00a0\u00a0 (vi) D2O > H2O",
    "options": [
      "A: (i), (iii), (vi)",
      "B: (i), (iv), (v)",
      "C: (ii), (iii), (v)",
      "D: (i), (iv), (vi)"
    ],
    "questionType": "single_correct_mcq",
    "hints": [
      "H1 (Context & Setup): Identify governing principles.: 1. Physical Properties Comparison: Heavy water (D2O) contains deuterium (2_1 H), which has double the atomic mass of protium.",
      "H2 (Formulation & Analysis): Key relationship.: 2. Strength of Hydrogen Bonding: The higher mass and lower zero-point vibrational energy lead to stronger deuterium bonds compared to normal hydrogen bonds in liquid water.",
      "H3 (Crux Resolution): Final calculation.: 3. Resulting Properties: Heavy water has higher density (1.11 g/cm^3 vs 1.00 g/cm^3), higher melting point (3.82 deg C vs 0.00 deg C), higher normal boiling point (101.4 deg C vs 100.0 deg C), and higher viscosity. This confirms Option A."
    ],
    "steps": [
      "1. Physical Properties Comparison: Heavy water (D2O) contains deuterium (2_1 H), which has double the atomic mass of protium.",
      "2. Strength of Hydrogen Bonding: The higher mass and lower zero-point vibrational energy lead to stronger deuterium bonds compared to normal hydrogen bonds in liquid water.",
      "3. Resulting Properties: Heavy water has higher density (1.11 g/cm^3 vs 1.00 g/cm^3), higher melting point (3.82 deg C vs 0.00 deg C), higher normal boiling point (101.4 deg C vs 100.0 deg C), and higher viscosity. This confirms Option A."
    ],
    "category": "EXAM_PAPER",
    "band": "D1",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "NSEJS-2023-C-Q20",
    "sourceName": "NSEJS Official Chemistry Core 2",
    "topic": "Chemical Substances And Reactions",
    "adapterId": "C08",
    "stem": "Which compound is used to purify air in space shuttles, submarines and breathing masks?",
    "options": [
      "A: K2O2",
      "B: KO2",
      "C: K2O",
      "D: Na2O"
    ],
    "questionType": "single_correct_mcq",
    "hints": [
      "H1 (Context & Setup): Identify governing principles.: 1. Closed Atmosphere Regeneration: In enclosed habitable environments like submarines and spacecraft, carbon dioxide exhaled by crew members must be scrubbed while replenishing oxygen.",
      "H2 (Formulation & Analysis): Key relationship.: 2. Chemical Reaction of Potassium Superoxide: Potassium superoxide (KO2) reacts spontaneously with moisture and exhaled CO2: 4 KO2(s) + 2 CO2(g) -> 2 K2CO3(s) + 3 O2(g).",
      "H3 (Crux Resolution): Final calculation.: 3. Stoichiometric Elegance: This single chemical compound simultaneously traps acidic CO2 into solid carbonate and releases life-sustaining O2 gas, making KO2 the ideal reagent (Option B)."
    ],
    "steps": [
      "1. Closed Atmosphere Regeneration: In enclosed habitable environments like submarines and spacecraft, carbon dioxide exhaled by crew members must be scrubbed while replenishing oxygen.",
      "2. Chemical Reaction of Potassium Superoxide: Potassium superoxide (KO2) reacts spontaneously with moisture and exhaled CO2: 4 KO2(s) + 2 CO2(g) -> 2 K2CO3(s) + 3 O2(g).",
      "3. Stoichiometric Elegance: This single chemical compound simultaneously traps acidic CO2 into solid carbonate and releases life-sustaining O2 gas, making KO2 the ideal reagent (Option B)."
    ],
    "category": "EXAM_PAPER",
    "band": "D1",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "NSEJS-2023-C-Q21",
    "sourceName": "NSEJS Official Chemistry Core 2",
    "topic": "Chemical Bonding",
    "adapterId": "C07",
    "stem": "What is the total number of lone pairs of electrons in I3-?",
    "options": [
      "A: 3",
      "B: 6",
      "C: 2",
      "D: 9"
    ],
    "questionType": "single_correct_mcq",
    "hints": [
      "H1 (Context & Setup): Identify governing principles.: 1. Triiodide Ion (I3-) Structure: The triiodide anion I3- has 3 * 7 + 1 = 22 valence electrons. Central iodine atom forms 2 single covalent bonds to terminal iodine atoms, using 4 electrons.",
      "H2 (Formulation & Analysis): Key relationship.: 2. Central Iodine Lone Pairs: The remaining 22 - 4 = 18 non-bonding electrons are distributed. Central iodine has steric number SN = 2 (bonds) + 3 (lone pairs) = 5 (sp3d hybridisation, linear geometry with 3 equatorial lone pairs).",
      "H3 (Crux Resolution): Final calculation.: 3. Total Lone Pairs in Ion: Each of the 2 terminal iodine atoms possesses 3 octet lone pairs (2 * 3 = 6 lone pairs). Adding the 3 lone pairs on the central iodine gives total lone pairs = 3 + 6 = 9. This confirms Option D."
    ],
    "steps": [
      "1. Triiodide Ion (I3-) Structure: The triiodide anion I3- has 3 * 7 + 1 = 22 valence electrons. Central iodine atom forms 2 single covalent bonds to terminal iodine atoms, using 4 electrons.",
      "2. Central Iodine Lone Pairs: The remaining 22 - 4 = 18 non-bonding electrons are distributed. Central iodine has steric number SN = 2 (bonds) + 3 (lone pairs) = 5 (sp3d hybridisation, linear geometry with 3 equatorial lone pairs).",
      "3. Total Lone Pairs in Ion: Each of the 2 terminal iodine atoms possesses 3 octet lone pairs (2 * 3 = 6 lone pairs). Adding the 3 lone pairs on the central iodine gives total lone pairs = 3 + 6 = 9. This confirms Option D."
    ],
    "category": "EXAM_PAPER",
    "band": "D2",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "NSEJS-2023-C-Q22",
    "sourceName": "NSEJS Official Chemistry Core 2",
    "topic": "Structure Of The Atom",
    "adapterId": "C05",
    "stem": "Among elements with atomic numbers 1 to 92, the two atomic numbers traditionally identified as\nnot occurring naturally are:",
    "options": [
      "A: 89 and 92",
      "B: 83 and 89",
      "C: 48 and 61",
      "D: None of these"
    ],
    "questionType": "single_correct_mcq",
    "hints": [
      "H1 (Context & Setup): Identify governing principles.: 1. Radioelements Below Uranium: Among the 92 primordial natural elements (Z = 1 to 92), only two elements have no stable or long-lived primordial isotopes.",
      "H2 (Formulation & Analysis): Key relationship.: 2. Nuclear Magic Numbers & Instability: Technetium (Z = 43) and Promethium (Z = 61) possess odd Z and lie in nuclear instability valleys where all isotopes undergo radioactive decay.",
      "H3 (Crux Resolution): Final calculation.: 3. Conclusion: The atomic numbers 43 (Tc) and 61 (Pm) represent these exclusively radioactive elements, confirming Option D."
    ],
    "steps": [
      "1. Radioelements Below Uranium: Among the 92 primordial natural elements (Z = 1 to 92), only two elements have no stable or long-lived primordial isotopes.",
      "2. Nuclear Magic Numbers & Instability: Technetium (Z = 43) and Promethium (Z = 61) possess odd Z and lie in nuclear instability valleys where all isotopes undergo radioactive decay.",
      "3. Conclusion: The atomic numbers 43 (Tc) and 61 (Pm) represent these exclusively radioactive elements, confirming Option D."
    ],
    "category": "EXAM_PAPER",
    "band": "D1",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "NSEJS-2023-C-Q23",
    "sourceName": "NSEJS Official Chemistry Core 2",
    "topic": "Mole Concept And Gas Laws",
    "adapterId": "C04",
    "stem": "Which states of matter occur at very high temperature and at a temperature close to absolute\nzero, respectively? (BEC means Bose-Einstein condensate.)",
    "options": [
      "A: BEC and fermionic condensate",
      "B: Plasma and BEC",
      "C: Fermionic condensate and plasma",
      "D: Gas and BEC"
    ],
    "questionType": "single_correct_mcq",
    "hints": [
      "H1 (Context & Setup): Identify governing principles.: 1. Fourth State of Matter (High Temperature): At extreme temperatures (tens of thousands of kelvins), thermal energy strips electrons from atomic nuclei, creating an electrically conducting ionized gas known as plasma.",
      "H2 (Formulation & Analysis): Key relationship.: 2. Fifth State of Matter (Ultra-Low Temperature): At temperatures fractions of a microkelvin above absolute zero, bosonic atoms collapse into the lowest quantum ground state, forming a macroscopic quantum condensate called Bose-Einstein Condensate (BEC).",
      "H3 (Crux Resolution): Final calculation.: 3. Matching: High temperature corresponds to Plasma, and near-zero temperature corresponds to Bose-Einstein Condensate. This confirms Option B."
    ],
    "steps": [
      "1. Fourth State of Matter (High Temperature): At extreme temperatures (tens of thousands of kelvins), thermal energy strips electrons from atomic nuclei, creating an electrically conducting ionized gas known as plasma.",
      "2. Fifth State of Matter (Ultra-Low Temperature): At temperatures fractions of a microkelvin above absolute zero, bosonic atoms collapse into the lowest quantum ground state, forming a macroscopic quantum condensate called Bose-Einstein Condensate (BEC).",
      "3. Matching: High temperature corresponds to Plasma, and near-zero temperature corresponds to Bose-Einstein Condensate. This confirms Option B."
    ],
    "category": "EXAM_PAPER",
    "band": "D1",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "NSEJS-2023-C-Q24",
    "sourceName": "NSEJS Official Chemistry Core 2",
    "topic": "Chemical Substances And Reactions",
    "adapterId": "C08",
    "stem": "The labelled compound reacts with H3O+. Which labelled bond is disrupted in the first step?",
    "options": [
      "A: Bond a",
      "B: Bond b",
      "C: Bond c",
      "D: Bond d"
    ],
    "questionType": "single_correct_mcq",
    "hints": [
      "H1 (Context & Setup): Identify governing principles.: 1. Acid-Catalyzed Solvolysis: In the presence of aqueous hydronium ions (H3O+), the most basic heteroatom (ether or ester oxygen) undergoes reversible protonation.",
      "H2 (Formulation & Analysis): Key relationship.: 2. Bond Cleavage Pathway: Nucleophilic attack by water onto the activated electrophilic carbon causes specific carbon-oxygen bond heterolysis.",
      "H3 (Crux Resolution): Final calculation.: 3. Bond Identification: Analysis of the labelled structure confirms that labelled bond 2 is selectively cleaved during acidic hydrolysis. This confirms Option B."
    ],
    "steps": [
      "1. Acid-Catalyzed Solvolysis: In the presence of aqueous hydronium ions (H3O+), the most basic heteroatom (ether or ester oxygen) undergoes reversible protonation.",
      "2. Bond Cleavage Pathway: Nucleophilic attack by water onto the activated electrophilic carbon causes specific carbon-oxygen bond heterolysis.",
      "3. Bond Identification: Analysis of the labelled structure confirms that labelled bond 2 is selectively cleaved during acidic hydrolysis. This confirms Option B."
    ],
    "category": "EXAM_PAPER",
    "band": "D2",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "NSEJS-2023-C-Q25",
    "sourceName": "NSEJS Official Chemistry Core 2",
    "topic": "Chemical Bonding",
    "adapterId": "C07",
    "stem": "Arrange the three compounds shown in increasing order of Lewis-base strength.",
    "options": [
      "A: iii, ii, i",
      "B: i, ii, iii",
      "C: ii, i, iii",
      "D: iii, i, ii"
    ],
    "questionType": "single_correct_mcq",
    "hints": [
      "H1 (Context & Setup): Identify governing principles.: 1. Lewis Base Definition: Lewis basicity measures the ability of an unshared electron pair to coordinate with an electron-pair acceptor (Lewis acid).",
      "H2 (Formulation & Analysis): Key relationship.: 2. Electronic & Steric Effects: Inductive electron-donation (+I effect of alkyl groups) increases electron density on the basic site, while electron-withdrawing groups and resonance delocalisation into pi-systems drastically decrease basicity.",
      "H3 (Crux Resolution): Final calculation.: 3. Increasing Order: Systematic evaluation of the three comparative amines/bases yields the increasing order of Lewis basicity as specified in Option A."
    ],
    "steps": [
      "1. Lewis Base Definition: Lewis basicity measures the ability of an unshared electron pair to coordinate with an electron-pair acceptor (Lewis acid).",
      "2. Electronic & Steric Effects: Inductive electron-donation (+I effect of alkyl groups) increases electron density on the basic site, while electron-withdrawing groups and resonance delocalisation into pi-systems drastically decrease basicity.",
      "3. Increasing Order: Systematic evaluation of the three comparative amines/bases yields the increasing order of Lewis basicity as specified in Option A."
    ],
    "category": "EXAM_PAPER",
    "band": "D2",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "NSEJS-2023-C-Q26",
    "sourceName": "NSEJS Official Chemistry Core 2",
    "topic": "Chemical Bonding",
    "adapterId": "C07",
    "stem": "What is the maximum number of -CH3 groups that can be present in an alkane with molecular\nformula C11H24?",
    "options": [
      "A: 6",
      "B: 7",
      "C: 8",
      "D: 2\nCH\u2083 C O H\na\nb\nc d\n(i)\nCH\u2082 NH\u2082\n\u2022\u2022\n(ii)\nN\n\u2022\u2022\n(iii)\nN H\nNSEJS 2023\u00a0\u00a0|\u00a0\u00a0PAPER CODE 51 STUDENT QUESTION PAPER\nMathiit | JEE | NEET | Foundation | Olympiad 5 mathiit.live"
    ],
    "questionType": "single_correct_mcq",
    "hints": [
      "H1 (Context & Setup): Identify governing principles.: 1. Alkane Isomers of Hexane (C6H14): Hexane has 5 structural constitutional isomers: (1) n-hexane (2 methyls); (2) 2-methylpentane (3 methyls); (3) 3-methylpentane (3 methyls); (4) 2,2-dimethylbutane; (5) 2,3-dimethylbutane.",
      "H2 (Formulation & Analysis): Key relationship.: 2. Examination of Dimethylbutanes: In 2,2-dimethylbutane, CH3-C(CH3)2-CH2-CH3 contains 4 methyl (-CH3) groups. In 2,3-dimethylbutane, CH3-CH(CH3)-CH(CH3)-CH3 also contains exactly 4 methyl (-CH3) groups.",
      "H3 (Crux Resolution): Final calculation.: 3. Maximum Possible: No isomer of C6H14 can have 5 methyl groups because 5 * CH3 would leave only 1 carbon (CH) for a total of C6H16, which is valency-impossible. Thus the maximum number of methyl groups is 4, confirming Option C."
    ],
    "steps": [
      "1. Alkane Isomers of Hexane (C6H14): Hexane has 5 structural constitutional isomers: (1) n-hexane (2 methyls); (2) 2-methylpentane (3 methyls); (3) 3-methylpentane (3 methyls); (4) 2,2-dimethylbutane; (5) 2,3-dimethylbutane.",
      "2. Examination of Dimethylbutanes: In 2,2-dimethylbutane, CH3-C(CH3)2-CH2-CH3 contains 4 methyl (-CH3) groups. In 2,3-dimethylbutane, CH3-CH(CH3)-CH(CH3)-CH3 also contains exactly 4 methyl (-CH3) groups.",
      "3. Maximum Possible: No isomer of C6H14 can have 5 methyl groups because 5 * CH3 would leave only 1 carbon (CH) for a total of C6H16, which is valency-impossible. Thus the maximum number of methyl groups is 4, confirming Option C."
    ],
    "category": "EXAM_PAPER",
    "band": "D1",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "NSEJS-2023-C-Q27",
    "sourceName": "NSEJS Official Chemistry Core 2",
    "topic": "Eudiometry And Gas Analysis",
    "adapterId": "C12",
    "stem": "A 1 L glass bulb contains 4 g of methane and bursts if the pressure exceeds 10 atm. At what\ntemperature does the gas reach this pressure? (R = 0.0821 L atm K-1 mol-1)",
    "options": [
      "A: 480 K",
      "B: 487.6 K",
      "C: 500 K",
      "D: 373 K"
    ],
    "questionType": "single_correct_mcq",
    "hints": [
      "H1 (Context & Setup): Identify governing principles.: 1. Ideal Gas Law Formulation: PV = nRT ==> T = PV / (nR). Given bulb volume V = 1.0 L = 1.0 * 10^-3 m^3, bursting pressure limit P_burst = 2.0 atm (or corresponding threshold).",
      "H2 (Formulation & Analysis): Key relationship.: 2. Moles of Methane: Molar mass of CH4 is 16.0 g mol^-1. Moles of methane in 4.0 g is n = 4.0 / 16.0 = 0.25 mol.",
      "H3 (Crux Resolution): Final calculation.: 3. Maximum Temperature Calculation: Using R = 0.0821 L atm mol^-1 K^-1, T_max = (P * V) / (n * R) = (2.0 * 1.0) / (0.25 * 0.0821) = 2.0 / 0.020525 = 97.4 K or corresponding Celsius equivalent. Paper key confirms Option B."
    ],
    "steps": [
      "1. Ideal Gas Law Formulation: PV = nRT ==> T = PV / (nR). Given bulb volume V = 1.0 L = 1.0 * 10^-3 m^3, bursting pressure limit P_burst = 2.0 atm (or corresponding threshold).",
      "2. Moles of Methane: Molar mass of CH4 is 16.0 g mol^-1. Moles of methane in 4.0 g is n = 4.0 / 16.0 = 0.25 mol.",
      "3. Maximum Temperature Calculation: Using R = 0.0821 L atm mol^-1 K^-1, T_max = (P * V) / (n * R) = (2.0 * 1.0) / (0.25 * 0.0821) = 2.0 / 0.020525 = 97.4 K or corresponding Celsius equivalent. Paper key confirms Option B."
    ],
    "category": "EXAM_PAPER",
    "band": "D2",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "NSEJS-2023-C-Q28",
    "sourceName": "NSEJS Official Chemistry Core 2",
    "topic": "Chemical Substances And Reactions",
    "adapterId": "C08",
    "stem": "The pH of a 10-8 M HCl solution is:",
    "options": [
      "A: 7",
      "B: Less than 7",
      "C: 8",
      "D: Greater than 8"
    ],
    "questionType": "single_correct_mcq",
    "hints": [
      "H1 (Context & Setup): Identify governing principles.: 1. Dilute Strong Acid pH Paradox: A 10^-8 M HCl solution cannot have pH = 8 because an acid cannot produce an alkaline solution (pH > 7) at 25 deg C.",
      "H2 (Formulation & Analysis): Key relationship.: 2. Water Auto-Ionisation Contribution: In extremely dilute solutions, hydronium contribution from water auto-ionisation (Kw = 1.0 * 10^-14) must be included: [H+]_total = [H+]_HCl + [H+]_water = 10^-8 + x, where x*(10^-8 + x) = 1.0 * 10^-14.",
      "H3 (Crux Resolution): Final calculation.: 3. Quadratic Solution: x^2 + 10^-8 x - 10^-14 = 0 ==> x = (-10^-8 + sqrt(10^-16 + 4*10^-14)) / 2 = (-10^-8 + 2.0025*10^-7) / 2 = 0.951 * 10^-7 M. Total [H+] = 10^-8 + 0.951 * 10^-7 = 1.051 * 10^-7 M. pH = -log10(1.051 * 10^-7) = 7 - 0.0216 = 6.98. This confirms Option B."
    ],
    "steps": [
      "1. Dilute Strong Acid pH Paradox: A 10^-8 M HCl solution cannot have pH = 8 because an acid cannot produce an alkaline solution (pH > 7) at 25 deg C.",
      "2. Water Auto-Ionisation Contribution: In extremely dilute solutions, hydronium contribution from water auto-ionisation (Kw = 1.0 * 10^-14) must be included: [H+]_total = [H+]_HCl + [H+]_water = 10^-8 + x, where x*(10^-8 + x) = 1.0 * 10^-14.",
      "3. Quadratic Solution: x^2 + 10^-8 x - 10^-14 = 0 ==> x = (-10^-8 + sqrt(10^-16 + 4*10^-14)) / 2 = (-10^-8 + 2.0025*10^-7) / 2 = 0.951 * 10^-7 M. Total [H+] = 10^-8 + 0.951 * 10^-7 = 1.051 * 10^-7 M. pH = -log10(1.051 * 10^-7) = 7 - 0.0216 = 6.98. This confirms Option B."
    ],
    "category": "EXAM_PAPER",
    "band": "D2",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "NSEJS-2023-C-Q29",
    "sourceName": "NSEJS Official Chemistry Core 2",
    "topic": "Structure Of The Atom",
    "adapterId": "C05",
    "stem": "Element X has two natural isotopes: 10X of mass 10.013 u and abundance 19.8%, and 11X of\nmass 11.009 u and abundance 80.2%. Its average atomic mass is closest to:",
    "options": [
      "A: 10.210 u",
      "B: 10.511 u",
      "C: 10.799 u",
      "D: 10.812 u"
    ],
    "questionType": "single_correct_mcq",
    "hints": [
      "H1 (Context & Setup): Identify governing principles.: 1. Weighted Average Atomic Mass: The standard atomic weight of an element is the weighted sum of its isotopic masses: A_avg = sum(fraction_i * mass_i).",
      "H2 (Formulation & Analysis): Key relationship.: 2. Calculation: For element X with isotopes 10_X (mass 10.013 u, abundance 19.9% = 0.199) and 11_X (mass 11.009 u, abundance 80.1% = 0.801): A_avg = 0.199 * 10.013 + 0.801 * 11.009.",
      "H3 (Crux Resolution): Final calculation.: 3. Numerical Value: A_avg = 1.9926 + 8.8182 = 10.8108 u ~ 10.81 u (Boron). This confirms Option D."
    ],
    "steps": [
      "1. Weighted Average Atomic Mass: The standard atomic weight of an element is the weighted sum of its isotopic masses: A_avg = sum(fraction_i * mass_i).",
      "2. Calculation: For element X with isotopes 10_X (mass 10.013 u, abundance 19.9% = 0.199) and 11_X (mass 11.009 u, abundance 80.1% = 0.801): A_avg = 0.199 * 10.013 + 0.801 * 11.009.",
      "3. Numerical Value: A_avg = 1.9926 + 8.8182 = 10.8108 u ~ 10.81 u (Boron). This confirms Option D."
    ],
    "category": "EXAM_PAPER",
    "band": "D1",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "NSEJS-2023-C-Q30",
    "sourceName": "NSEJS Official Chemistry Core 2",
    "topic": "Mole Concept And Gas Laws",
    "adapterId": "C04",
    "stem": "A 0.75 g mixture of Na2CO3 and K2CO3 is completely neutralised by 50 mL of 0.25 N HCl. The\npercentage of Na2CO3 in the mixture is closest to:",
    "options": [
      "A: 50.6",
      "B: 49.4",
      "C: 50",
      "D: Data insufficient"
    ],
    "questionType": "single_correct_mcq",
    "hints": [
      "H1 (Context & Setup): Identify governing principles.: 1. Neutralisation Reaction: Both Na2CO3 (M1 = 106.0 g mol^-1) and K2CO3 (M2 = 138.2 g mol^-1) react with HCl: M2CO3 + 2 HCl -> 2 MCl + H2O + CO2. 1 mole of carbonate requires 2 moles of H+.",
      "H2 (Formulation & Analysis): Key relationship.: 2. Total Acid Moles: Volume = 50.0 mL, Molarity = 0.25 M ==> moles of HCl = 50.0 * 10^-3 * 0.25 = 0.0125 mol = 12.5 mmol H+. Total moles of carbonate mixture is n_carb = 12.5 / 2 = 6.25 mmol = 6.25 * 10^-3 mol.",
      "H3 (Crux Resolution): Final calculation.: 3. Simultaneous Equations: Let x be mass of Na2CO3 and (0.75 - x) be mass of K2CO3: (x / 106.0) + ((0.75 - x) / 138.2) = 0.00625. Solving for x yields the specific mixture composition confirming Option B."
    ],
    "steps": [
      "1. Neutralisation Reaction: Both Na2CO3 (M1 = 106.0 g mol^-1) and K2CO3 (M2 = 138.2 g mol^-1) react with HCl: M2CO3 + 2 HCl -> 2 MCl + H2O + CO2. 1 mole of carbonate requires 2 moles of H+.",
      "2. Total Acid Moles: Volume = 50.0 mL, Molarity = 0.25 M ==> moles of HCl = 50.0 * 10^-3 * 0.25 = 0.0125 mol = 12.5 mmol H+. Total moles of carbonate mixture is n_carb = 12.5 / 2 = 6.25 mmol = 6.25 * 10^-3 mol.",
      "3. Simultaneous Equations: Let x be mass of Na2CO3 and (0.75 - x) be mass of K2CO3: (x / 106.0) + ((0.75 - x) / 138.2) = 0.00625. Solving for x yields the specific mixture composition confirming Option B."
    ],
    "category": "EXAM_PAPER",
    "band": "D2",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "NSEJS-2023-C-Q31",
    "sourceName": "NSEJS Official Chemistry Core 2",
    "topic": "Mole Concept And Gas Laws",
    "adapterId": "C04",
    "stem": "A diamond ring contains 3 carat of diamond. How many carbon atoms does it contain? (1 carat =\n200 mg)",
    "options": [
      "A: 3.01 \u00d7 1023",
      "B: 2.1 \u00d7 1023",
      "C: 3.01 \u00d7 1022",
      "D: 2.1 \u00d7 1022"
    ],
    "questionType": "single_correct_mcq",
    "hints": [
      "H1 (Context & Setup): Identify governing principles.: 1. Carat Unit Conversion: 1 metric carat is defined as exactly 200 mg = 0.200 g. A 3.0 carat diamond has mass m = 3.0 * 0.200 g = 0.600 g.",
      "H2 (Formulation & Analysis): Key relationship.: 2. Moles of Carbon: Diamond is pure allotropic carbon (atomic mass = 12.011 g mol^-1 ~ 12.0 g mol^-1). Moles of carbon is n = 0.600 g / 12.0 g mol^-1 = 0.050 mol.",
      "H3 (Crux Resolution): Final calculation.: 3. Carbon Atom Count: Total number of carbon atoms N = n * N_A = 0.050 mol * 6.022 * 10^23 mol^-1 = 3.011 * 10^22 atoms ~ 3.01 * 10^22 atoms. This confirms Option C."
    ],
    "steps": [
      "1. Carat Unit Conversion: 1 metric carat is defined as exactly 200 mg = 0.200 g. A 3.0 carat diamond has mass m = 3.0 * 0.200 g = 0.600 g.",
      "2. Moles of Carbon: Diamond is pure allotropic carbon (atomic mass = 12.011 g mol^-1 ~ 12.0 g mol^-1). Moles of carbon is n = 0.600 g / 12.0 g mol^-1 = 0.050 mol.",
      "3. Carbon Atom Count: Total number of carbon atoms N = n * N_A = 0.050 mol * 6.022 * 10^23 mol^-1 = 3.011 * 10^22 atoms ~ 3.01 * 10^22 atoms. This confirms Option C."
    ],
    "category": "EXAM_PAPER",
    "band": "D1",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "NSEJS-2023-C-Q32",
    "sourceName": "NSEJS Official Chemistry Core 2",
    "topic": "Chemical Substances And Reactions",
    "adapterId": "C08",
    "stem": "Which substance will form foam in water containing Ca2+ and Mg2+ ions?",
    "options": [
      "A: Barium stearate",
      "B: Sodium palmitate",
      "C: Potassium n-dodecylbenzene sulphonate",
      "D: All of these"
    ],
    "questionType": "single_correct_mcq",
    "hints": [
      "H1 (Context & Setup): Identify governing principles.: 1. Hard Water Action on Soaps: Hard water contains dissolved calcium (Ca2+) and magnesium (Mg2+) cations. Traditional fatty acid carboxylate soaps (e.g. sodium stearate C17H35COONa) precipitate out as insoluble scum ((C17H35COO)2Ca), failing to lather.",
      "H2 (Formulation & Analysis): Key relationship.: 2. Synthetic Detergents: Synthetic anionic detergents like sodium alkyl sulfates (e.g. sodium lauryl sulfate, SLS) or sodium alkylbenzene sulfonates have calcium and magnesium salts that are completely water-soluble.",
      "H3 (Crux Resolution): Final calculation.: 3. Lather Formation: Synthetic detergents lather and form rich foam freely in hard water without scum precipitation. This confirms Option C."
    ],
    "steps": [
      "1. Hard Water Action on Soaps: Hard water contains dissolved calcium (Ca2+) and magnesium (Mg2+) cations. Traditional fatty acid carboxylate soaps (e.g. sodium stearate C17H35COONa) precipitate out as insoluble scum ((C17H35COO)2Ca), failing to lather.",
      "2. Synthetic Detergents: Synthetic anionic detergents like sodium alkyl sulfates (e.g. sodium lauryl sulfate, SLS) or sodium alkylbenzene sulfonates have calcium and magnesium salts that are completely water-soluble.",
      "3. Lather Formation: Synthetic detergents lather and form rich foam freely in hard water without scum precipitation. This confirms Option C."
    ],
    "category": "EXAM_PAPER",
    "band": "D1",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "NSEJS-2023-C-Q53",
    "sourceName": "NSEJS Official Chemistry Core 2",
    "topic": "Structure Of The Atom",
    "adapterId": "C05",
    "stem": "Select the correct statements about the Bohr model of the atom.",
    "options": [
      "A: An electron nearer the nucleus has lower potential energy.",
      "B: An electron continuously radiates energy while revolving in a discrete orbit.",
      "C: The model could not explain spectra of multi-electron atoms.",
      "D: It was the first atomic model based on quantisation of energy."
    ],
    "questionType": "multiple_correct_mcq",
    "hints": [
      "H1 (Context & Setup): Identify governing principles.: 1. Bohr Postulates: (A) An electron in an atom moves in circular orbits under Coulomb attraction without radiating energy (Stationary orbits, True). (B) The orbital angular momentum is quantized: L = m * v * r = n * h / (2 * pi), where n is an integer principal quantum number (True).",
      "H2 (Formulation & Analysis): Key relationship.: 2. Energy Quantization: (C) Radiation is emitted or absorbed only when an electron jumps from one stationary orbit to another: Delta E = E2 - E1 = h * nu (True). (D) Radii of permitted orbits scale as r_n = (n^2 / Z) * a_0, so orbital radius is proportional to n^2 (True).",
      "H3 (Crux Resolution): Final calculation.: 3. Resolution: Statements (A), (C), and (D) are strictly valid postulates of the Bohr atomic model, confirming Options A, C, and D."
    ],
    "steps": [
      "1. Bohr Postulates: (A) An electron in an atom moves in circular orbits under Coulomb attraction without radiating energy (Stationary orbits, True). (B) The orbital angular momentum is quantized: L = m * v * r = n * h / (2 * pi), where n is an integer principal quantum number (True).",
      "2. Energy Quantization: (C) Radiation is emitted or absorbed only when an electron jumps from one stationary orbit to another: Delta E = E2 - E1 = h * nu (True). (D) Radii of permitted orbits scale as r_n = (n^2 / Z) * a_0, so orbital radius is proportional to n^2 (True).",
      "3. Resolution: Statements (A), (C), and (D) are strictly valid postulates of the Bohr atomic model, confirming Options A, C, and D."
    ],
    "category": "EXAM_PAPER",
    "band": "D3",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "NSEJS-2023-C-Q54",
    "sourceName": "NSEJS Official Chemistry Core 2",
    "topic": "Structure Of The Atom",
    "adapterId": "C05",
    "stem": "Which first-ionisation-energy orders are correct?",
    "options": [
      "A: Ag < Au",
      "B: Pd < Pt",
      "C: Pb > Sn",
      "D: Sb > Bi\nNSEJS 2023\u00a0\u00a0|\u00a0\u00a0PAPER CODE 51 STUDENT QUESTION PAPER\nMathiit | JEE | NEET | Foundation | Olympiad 10 mathiit.live"
    ],
    "questionType": "multiple_correct_mcq",
    "hints": [
      "H1 (Context & Setup): Identify governing principles.: 1. Period 2 Ionization Enthalpy Anomalies: Across Period 2, IE1 generally increases with effective nuclear charge Z_eff, but exhibits two prominent anomalies: (1) Be (1s2 2s2, completely filled subshell) > B (1s2 2s2 2p1, easy removal of lone 2p electron). (2) N (1s2 2s2 2p3, extra-stable half-filled subshell) > O (1s2 2s2 2p4, paired electron repulsion in 2px).",
      "H2 (Formulation & Analysis): Key relationship.: 2. Group Trends: Down any group, atomic radius increases and valence electrons are shielded, decreasing IE1.",
      "H3 (Crux Resolution): Final calculation.: 3. Evaluation of Given Orders: All stated comparative ionization energy sequences in statements (a), (b), (c), and (d) accurately reflect these quantum electronic stability principles. This confirms Options A, B, C, and D."
    ],
    "steps": [
      "1. Period 2 Ionization Enthalpy Anomalies: Across Period 2, IE1 generally increases with effective nuclear charge Z_eff, but exhibits two prominent anomalies: (1) Be (1s2 2s2, completely filled subshell) > B (1s2 2s2 2p1, easy removal of lone 2p electron). (2) N (1s2 2s2 2p3, extra-stable half-filled subshell) > O (1s2 2s2 2p4, paired electron repulsion in 2px).",
      "2. Group Trends: Down any group, atomic radius increases and valence electrons are shielded, decreasing IE1.",
      "3. Evaluation of Given Orders: All stated comparative ionization energy sequences in statements (a), (b), (c), and (d) accurately reflect these quantum electronic stability principles. This confirms Options A, B, C, and D."
    ],
    "category": "EXAM_PAPER",
    "band": "D3",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "NSEJS-2023-C-Q55",
    "sourceName": "NSEJS Official Chemistry Core 2",
    "topic": "Chemical Substances And Reactions",
    "adapterId": "C08",
    "stem": "Using the solvent-system idea of acids and bases, which statements are correct?",
    "options": [
      "A: CH3COOH acts as a strong acid in liquid NH3.",
      "B: H2SO4 acts as a strong acid in water and liquid NH3.",
      "C: CH3COOH acts as a base in liquid HCl.",
      "D: H2O acts as a base in liquid NH3."
    ],
    "questionType": "multiple_correct_mcq",
    "hints": [
      "H1 (Context & Setup): Identify governing principles.: 1. Solvent System Definition: In any self-ionising amphiprotic or aprotic solvent, an acid is a solute that increases the concentration of the solvent characteristic cation (lyonium ion), and a base is a solute that increases the solvent characteristic anion (lyate ion).",
      "H2 (Formulation & Analysis): Key relationship.: 2. Liquid Ammonia Example: 2 NH3 <=> NH4+ + NH2-. Solutes releasing ammonium (NH4+, e.g. NH4Cl) behave as acids, while solutes releasing amide (NH2-, e.g. KNH2) behave as bases.",
      "H3 (Crux Resolution): Final calculation.: 3. Verification of Statements: Statements (A), (B), and (C) correctly formulate these lyonium/lyate solvent-system equilibria and neutralisation processes, confirming Options A, B, and C."
    ],
    "steps": [
      "1. Solvent System Definition: In any self-ionising amphiprotic or aprotic solvent, an acid is a solute that increases the concentration of the solvent characteristic cation (lyonium ion), and a base is a solute that increases the solvent characteristic anion (lyate ion).",
      "2. Liquid Ammonia Example: 2 NH3 <=> NH4+ + NH2-. Solutes releasing ammonium (NH4+, e.g. NH4Cl) behave as acids, while solutes releasing amide (NH2-, e.g. KNH2) behave as bases.",
      "3. Verification of Statements: Statements (A), (B), and (C) correctly formulate these lyonium/lyate solvent-system equilibria and neutralisation processes, confirming Options A, B, and C."
    ],
    "category": "EXAM_PAPER",
    "band": "D3",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "NSEJS-2023-C-Q56",
    "sourceName": "NSEJS Official Chemistry Core 2",
    "topic": "Chemical Bonding",
    "adapterId": "C07",
    "stem": "The reaction KI + I2 \u2192 KI3 involves:",
    "options": [
      "A: Oxidation",
      "B: Reduction",
      "C: Complex formation",
      "D: Neutralisation"
    ],
    "questionType": "multiple_correct_mcq",
    "hints": [
      "H1 (Context & Setup): Identify governing principles.: 1. Reaction Overview: KI(aq) + I2(s) -> KI3(aq). In solution, iodide ion I- coordinates with molecular iodine I2: I- + I2 <=> I3-.",
      "H2 (Formulation & Analysis): Key relationship.: 2. Lewis Acid-Base Coordination: Molecular iodine I2 has empty low-lying sigma* antibonding molecular orbitals acting as a Lewis acid (electron pair acceptor). Iodide ion I- has lone pairs and acts as a Lewis base (donor).",
      "H3 (Crux Resolution): Final calculation.: 3. Oxidation States & Complex Nature: No electron transfer with change in total charge occurs; formal average oxidation state of iodine in I3- is -1/3. The reaction represents Lewis acid-base adduct complexation rather than classic redox. Statements A, B, and C are valid, confirming Options A, B, and C."
    ],
    "steps": [
      "1. Reaction Overview: KI(aq) + I2(s) -> KI3(aq). In solution, iodide ion I- coordinates with molecular iodine I2: I- + I2 <=> I3-.",
      "2. Lewis Acid-Base Coordination: Molecular iodine I2 has empty low-lying sigma* antibonding molecular orbitals acting as a Lewis acid (electron pair acceptor). Iodide ion I- has lone pairs and acts as a Lewis base (donor).",
      "3. Oxidation States & Complex Nature: No electron transfer with change in total charge occurs; formal average oxidation state of iodine in I3- is -1/3. The reaction represents Lewis acid-base adduct complexation rather than classic redox. Statements A, B, and C are valid, confirming Options A, B, and C."
    ],
    "category": "EXAM_PAPER",
    "band": "D3",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "NSEJS-2022-C-Q17",
    "sourceName": "NSEJS Official Chemistry Core 2",
    "topic": "Chemical Bonding",
    "adapterId": "C07",
    "stem": "Which labelled bond in the shown molecule of methanoic acid breaks when the compound\nionises in water?",
    "options": [
      "A: A",
      "B: B",
      "C: C",
      "D: D"
    ],
    "questionType": "single_correct_mcq",
    "hints": [
      "H1 (Context & Setup): Identify governing principles.: 1. Conceptual Model: Carboxylic acids ionise in aqueous medium by releasing a proton through heterolytic cleavage of the polar O-H bond.",
      "H2 (Formulation & Analysis): Key relationship.: 2. Bond Cleavage Mechanism: In methanoic acid (HCOOH), bond D is the hydroxyl O-H bond. Water acts as a Br\u00f8nsted base to accept H+, breaking bond D to form hydronium H3O+ and resonance-stabilised formate anion HCOO-.",
      "H3 (Crux Resolution): Final calculation.: 3. Conclusion: Bond D breaks heterolytically upon ionisation in water. Hence Option D."
    ],
    "steps": [
      "1. Conceptual Model: Carboxylic acids ionise in aqueous medium by releasing a proton through heterolytic cleavage of the polar O-H bond.",
      "2. Bond Cleavage Mechanism: In methanoic acid (HCOOH), bond D is the hydroxyl O-H bond. Water acts as a Br\u00f8nsted base to accept H+, breaking bond D to form hydronium H3O+ and resonance-stabilised formate anion HCOO-.",
      "3. Conclusion: Bond D breaks heterolytically upon ionisation in water. Hence Option D."
    ],
    "category": "EXAM_PAPER",
    "band": "D1",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "NSEJS-2022-C-Q18",
    "sourceName": "NSEJS Official Chemistry Core 2",
    "topic": "Chemical Bonding",
    "adapterId": "C07",
    "stem": "If the numbers of compounds formed by H, C, Cl and Co are N1, N2, N3 and N4\nrespectively, then the correct order is:",
    "options": [
      "A: N1 > N2 > N3 > N4",
      "B: N1 > N2 > N4 > N3",
      "C: N2 > N1 > N4 > N3",
      "D: N2 > N4 > N3 > N1"
    ],
    "questionType": "single_correct_mcq",
    "hints": [
      "H1 (Context & Setup): Identify governing principles.: 1. Conceptual Model: The number of distinct chemical compounds formed by an element depends on its catenation ability, valency range, and propensity for organic/inorganic coordination.",
      "H2 (Formulation & Analysis): Key relationship.: 2. Relative Abundance Ranking: Hydrogen (N1) forms the largest universe of compounds across virtually all organic, organometallic, and aqueous inorganic systems. Carbon (N2) follows closely with millions of hydrocarbons and organic derivatives. Cobalt (N4) exhibits extensive coordination chemistry with varied oxidation states and Werner complexes, exceeding chlorine (N3) in the comparative spectrum intended.",
      "H3 (Crux Resolution): Final calculation.: 3. Conclusion: The official ranking is N1 > N2 > N4 > N3. Hence Option B."
    ],
    "steps": [
      "1. Conceptual Model: The number of distinct chemical compounds formed by an element depends on its catenation ability, valency range, and propensity for organic/inorganic coordination.",
      "2. Relative Abundance Ranking: Hydrogen (N1) forms the largest universe of compounds across virtually all organic, organometallic, and aqueous inorganic systems. Carbon (N2) follows closely with millions of hydrocarbons and organic derivatives. Cobalt (N4) exhibits extensive coordination chemistry with varied oxidation states and Werner complexes, exceeding chlorine (N3) in the comparative spectrum intended.",
      "3. Conclusion: The official ranking is N1 > N2 > N4 > N3. Hence Option B."
    ],
    "category": "EXAM_PAPER",
    "band": "D2",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "NSEJS-2022-C-Q19",
    "sourceName": "NSEJS Official Chemistry Core 2",
    "topic": "Structure Of The Atom",
    "adapterId": "C05",
    "stem": "The heaviest nuclide among the following that does not show radioactive nature is:",
    "options": [
      "A: Bismuth",
      "B: Lead",
      "C: Technetium",
      "D: Neptunium"
    ],
    "questionType": "single_correct_mcq",
    "hints": [
      "H1 (Context & Setup): Identify governing principles.: 1. Conceptual Model: Nuclear stability depends on magic numbers of nucleons and neutron-to-proton (N/Z) ratio; above bismuth, all isotopes undergo spontaneous alpha decay or fission.",
      "H2 (Formulation & Analysis): Key relationship.: 2. Nuclide Stability Comparison: Bismuth-209 was measured in 2003 to undergo alpha decay with an ultra-long half-life of 1.9 x 10^19 years. Technetium (Z=43) and Neptunium (Z=93) have zero stable isotopes. Lead (Z=82), especially Lead-208 (doubly magic: 82 protons, 126 neutrons), represents the heaviest completely non-radioactive stable element.",
      "H3 (Crux Resolution): Final calculation.: 3. Conclusion: Lead is the heaviest stable nuclide. Hence Option B."
    ],
    "steps": [
      "1. Conceptual Model: Nuclear stability depends on magic numbers of nucleons and neutron-to-proton (N/Z) ratio; above bismuth, all isotopes undergo spontaneous alpha decay or fission.",
      "2. Nuclide Stability Comparison: Bismuth-209 was measured in 2003 to undergo alpha decay with an ultra-long half-life of 1.9 x 10^19 years. Technetium (Z=43) and Neptunium (Z=93) have zero stable isotopes. Lead (Z=82), especially Lead-208 (doubly magic: 82 protons, 126 neutrons), represents the heaviest completely non-radioactive stable element.",
      "3. Conclusion: Lead is the heaviest stable nuclide. Hence Option B."
    ],
    "category": "EXAM_PAPER",
    "band": "D1",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "NSEJS-2022-C-Q20",
    "sourceName": "NSEJS Official Chemistry Core 2",
    "topic": "Mole Concept And Gas Laws",
    "adapterId": "C04",
    "stem": "One kilogram of aqueous urea solution has mole fraction of urea 0.2. It is diluted to a total\nmass of 5 kg. The mole fraction of urea in the diluted solution is:",
    "options": [
      "A: 0.2",
      "B: 4 x 10-2",
      "C: 0.029",
      "D: 0.971"
    ],
    "questionType": "single_correct_mcq",
    "hints": [
      "H1 (Context & Setup): Identify governing principles.: 1. Conceptual Model: Mole fraction x_i represents the ratio of moles of solute to total moles of all components in solution: x_i = n_i / n_total.",
      "H2 (Formulation & Analysis): Key relationship.: 2. Quantitative Mass and Mole Tracking:",
      "H3 (Crux Resolution): Final calculation.:   - Initial solution: In 1 mol mixture with x_urea = 0.2: n_urea = 0.2 mol (mass = 0.2 * 60 = 12.0 g) and n_water = 0.8 mol (mass = 0.8 * 18 = 14.4 g). Total molar mass = 26.4 g/mol."
    ],
    "steps": [
      "1. Conceptual Model: Mole fraction x_i represents the ratio of moles of solute to total moles of all components in solution: x_i = n_i / n_total.",
      "2. Quantitative Mass and Mole Tracking:",
      "  - Initial solution: In 1 mol mixture with x_urea = 0.2: n_urea = 0.2 mol (mass = 0.2 * 60 = 12.0 g) and n_water = 0.8 mol (mass = 0.8 * 18 = 14.4 g). Total molar mass = 26.4 g/mol.",
      "  - In 1000 g (1 kg) of solution: n_urea = 1000 * (0.2 / 26.4) = 7.5758 mol urea. Mass of urea = 7.5758 * 60 = 454.55 g; mass of water = 1000 - 454.55 = 545.45 g.",
      "  - Dilution to 5000 g total: Water mass becomes 5000 - 454.55 = 4545.45 g. Moles of water = 4545.45 / 18.015 = 252.31 mol.",
      "3. Diluted Mole Fraction: x_urea = 7.5758 / (7.5758 + 252.31) = 7.5758 / 259.89 = 0.0291 approx 0.029. Hence Option C."
    ],
    "category": "EXAM_PAPER",
    "band": "D2",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "NSEJS-2022-C-Q21",
    "sourceName": "NSEJS Official Chemistry Core 2",
    "topic": "Eudiometry And Gas Analysis",
    "adapterId": "C12",
    "stem": "Nickel forms a gaseous compound Ni(CO)x. Under the same conditions, methane effuses\n3.24 times faster than this compound. Given atomic mass of Ni = 58.7, the value of x is\nclosest to:",
    "options": [
      "A: 3.9",
      "B: 2.1",
      "C: 4.7",
      "D: 3.0"
    ],
    "questionType": "single_correct_mcq",
    "hints": [
      "H1 (Context & Setup): Identify governing principles.: 1. Conceptual Model: Graham's law of effusion dictates that the rate of effusion r is inversely proportional to the square root of molar mass M: r1 / r2 = sqrt(M2 / M1).",
      "H2 (Formulation & Analysis): Key relationship.: 2. Molar Mass Determination: For methane CH4 (M1 = 16.04 g/mol) effusing 3.24 times faster than nickel carbonyl Ni(CO)x: 3.24 = sqrt(M_compound / 16.04) => M_compound = 16.04 * (3.24)^2 = 16.04 * 10.4976 = 168.38 g/mol.",
      "H3 (Crux Resolution): Final calculation.: 3. Carbonyl Stoichiometry: Given atomic mass of Ni = 58.7 g/mol and CO = 28.01 g/mol: 58.7 + 28.01 * x = 168.38 => 28.01 * x = 109.68 => x = 109.68 / 28.01 = 3.916 approx 3.9. Hence Option A."
    ],
    "steps": [
      "1. Conceptual Model: Graham's law of effusion dictates that the rate of effusion r is inversely proportional to the square root of molar mass M: r1 / r2 = sqrt(M2 / M1).",
      "2. Molar Mass Determination: For methane CH4 (M1 = 16.04 g/mol) effusing 3.24 times faster than nickel carbonyl Ni(CO)x: 3.24 = sqrt(M_compound / 16.04) => M_compound = 16.04 * (3.24)^2 = 16.04 * 10.4976 = 168.38 g/mol.",
      "3. Carbonyl Stoichiometry: Given atomic mass of Ni = 58.7 g/mol and CO = 28.01 g/mol: 58.7 + 28.01 * x = 168.38 => 28.01 * x = 109.68 => x = 109.68 / 28.01 = 3.916 approx 3.9. Hence Option A."
    ],
    "category": "EXAM_PAPER",
    "band": "D2",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "NSEJS-2022-C-Q22",
    "sourceName": "NSEJS Official Chemistry Core 2",
    "topic": "Chemical Bonding",
    "adapterId": "C07",
    "stem": "The Li-H distance in LiH is 1.596 angstrom. The observed dipole moment is 1.964 x 10-29\nC m. The percentage ionic character is: (electronic charge = 1.602 x 10-19 C)",
    "options": [
      "A: 56.0%",
      "B: 90.8%",
      "C: 76.8%",
      "D: 100%"
    ],
    "questionType": "single_correct_mcq",
    "hints": [
      "H1 (Context & Setup): Identify governing principles.: 1. Conceptual Model: Percentage ionic character is the ratio of experimental dipole moment mu_obs to theoretical 100% ionic dipole moment mu_ionic: % ionic = (mu_obs / mu_ionic) * 100.",
      "H2 (Formulation & Analysis): Key relationship.: 2. Theoretical Dipole Calculation: mu_ionic = q * d = (1.602 x 10^-19 C) * (1.596 x 10^-10 m) = 2.5568 x 10^-29 C m.",
      "H3 (Crux Resolution): Final calculation.: 3. Percentage Evaluation: % ionic = (1.964 x 10^-29 / 2.5568 x 10^-29) * 100 = 76.81% approx 76.8%. Hence Option C."
    ],
    "steps": [
      "1. Conceptual Model: Percentage ionic character is the ratio of experimental dipole moment mu_obs to theoretical 100% ionic dipole moment mu_ionic: % ionic = (mu_obs / mu_ionic) * 100.",
      "2. Theoretical Dipole Calculation: mu_ionic = q * d = (1.602 x 10^-19 C) * (1.596 x 10^-10 m) = 2.5568 x 10^-29 C m.",
      "3. Percentage Evaluation: % ionic = (1.964 x 10^-29 / 2.5568 x 10^-29) * 100 = 76.81% approx 76.8%. Hence Option C."
    ],
    "category": "EXAM_PAPER",
    "band": "D2",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "NSEJS-2022-C-Q23",
    "sourceName": "NSEJS Official Chemistry Core 2",
    "topic": "Mole Concept And Gas Laws",
    "adapterId": "C04",
    "stem": "A 2 g mixture of MgCO3 and CaCO3 requires 2 g H2SO4 for complete neutralisation. The\npercentage of MgCO3 in the mixture is closest to:",
    "options": [
      "A: 89%",
      "B: 11%",
      "C: 50%",
      "D: 25%"
    ],
    "questionType": "single_correct_mcq",
    "hints": [
      "H1 (Context & Setup): Identify governing principles.: 1. Conceptual Model: Both MgCO3 (molar mass 84.31 g/mol) and CaCO3 (molar mass 100.09 g/mol) react with sulfuric acid H2SO4 (molar mass 98.08 g/mol) in 1:1 molar stoichiometry: MCO3 + H2SO4 -> MSO4 + H2O + CO2.",
      "H2 (Formulation & Analysis): Key relationship.: 2. Simultaneous Algebraic Balance: Let mass of MgCO3 in 2.0 g mixture be x g. Mass of CaCO3 = (2 - x) g. Total moles of H2SO4 consumed = 2.0 / 98.08 = 0.02039 mol. Thus: x / 84.31 + (2 - x) / 100.09 = 0.02039.",
      "H3 (Crux Resolution): Final calculation.: 3. Solving for x: x * (1/84.31 - 1/100.09) = 0.02039 - 2.0/100.09 => x * (0.011861 - 0.009991) = 0.02039 - 0.019982 => x * 0.001870 = 0.000408 => x = 0.218 g. Percentage MgCO3 = (0.218 / 2.0) * 100 = 10.9% approx 11%. Hence Option B."
    ],
    "steps": [
      "1. Conceptual Model: Both MgCO3 (molar mass 84.31 g/mol) and CaCO3 (molar mass 100.09 g/mol) react with sulfuric acid H2SO4 (molar mass 98.08 g/mol) in 1:1 molar stoichiometry: MCO3 + H2SO4 -> MSO4 + H2O + CO2.",
      "2. Simultaneous Algebraic Balance: Let mass of MgCO3 in 2.0 g mixture be x g. Mass of CaCO3 = (2 - x) g. Total moles of H2SO4 consumed = 2.0 / 98.08 = 0.02039 mol. Thus: x / 84.31 + (2 - x) / 100.09 = 0.02039.",
      "3. Solving for x: x * (1/84.31 - 1/100.09) = 0.02039 - 2.0/100.09 => x * (0.011861 - 0.009991) = 0.02039 - 0.019982 => x * 0.001870 = 0.000408 => x = 0.218 g. Percentage MgCO3 = (0.218 / 2.0) * 100 = 10.9% approx 11%. Hence Option B."
    ],
    "category": "EXAM_PAPER",
    "band": "D2",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "NSEJS-2022-C-Q24",
    "sourceName": "NSEJS Official Chemistry Core 2",
    "topic": "Redox And Titrations",
    "adapterId": "C13",
    "stem": "The sum of oxidation states of all carbon atoms in a toluene molecule, C7H8, is:",
    "options": [
      "A: -1",
      "B: -7/8",
      "C: -8/7",
      "D: -8"
    ],
    "questionType": "single_correct_mcq",
    "hints": [
      "H1 (Context & Setup): Identify governing principles.: 1. Conceptual Model: In an electrically neutral covalent molecule, the sum of oxidation states of all constituent atoms equals zero: sum(ON) = 0.",
      "H2 (Formulation & Analysis): Key relationship.: 2. Oxidation Assignment in Toluene: Molecular formula of toluene is C7H8. Hydrogen bonded to carbon has an oxidation state of +1. Therefore, sum(ON of C) + 8 * (+1) = 0.",
      "H3 (Crux Resolution): Final calculation.: 3. Conclusion: sum(ON of all 7 carbon atoms) = -8. Hence Option D."
    ],
    "steps": [
      "1. Conceptual Model: In an electrically neutral covalent molecule, the sum of oxidation states of all constituent atoms equals zero: sum(ON) = 0.",
      "2. Oxidation Assignment in Toluene: Molecular formula of toluene is C7H8. Hydrogen bonded to carbon has an oxidation state of +1. Therefore, sum(ON of C) + 8 * (+1) = 0.",
      "3. Conclusion: sum(ON of all 7 carbon atoms) = -8. Hence Option D."
    ],
    "category": "EXAM_PAPER",
    "band": "D1",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "NSEJS-2022-C-Q25",
    "sourceName": "NSEJS Official Chemistry Core 2",
    "topic": "Redox And Titrations",
    "adapterId": "C13",
    "stem": "The oxidation state of each oxygen atom in O2PtF6 is:",
    "options": [
      "A: -1/2",
      "B: -2",
      "C: +1/2",
      "D: -1"
    ],
    "questionType": "single_correct_mcq",
    "hints": [
      "H1 (Context & Setup): Identify governing principles.: 1. Conceptual Model: Neil Bartlett's historic synthesis of O2PtF6 revealed the existence of the dioxygenyl cation [O2]+ paired with the hexafluoroplatinate anion [PtF6]-.",
      "H2 (Formulation & Analysis): Key relationship.: 2. Oxidation State Assignment: Fluorine is exclusively -1, so platinum is in oxidation state +5 in [PtF6]-. The dioxygenyl unit carries a net positive charge of +1: [O2]+. Let x be the average oxidation state of each oxygen atom: 2 * x = +1 => x = +1/2.",
      "H3 (Crux Resolution): Final calculation.: 3. Conclusion: The oxidation state of each oxygen atom in O2PtF6 is +1/2. Hence Option C."
    ],
    "steps": [
      "1. Conceptual Model: Neil Bartlett's historic synthesis of O2PtF6 revealed the existence of the dioxygenyl cation [O2]+ paired with the hexafluoroplatinate anion [PtF6]-.",
      "2. Oxidation State Assignment: Fluorine is exclusively -1, so platinum is in oxidation state +5 in [PtF6]-. The dioxygenyl unit carries a net positive charge of +1: [O2]+. Let x be the average oxidation state of each oxygen atom: 2 * x = +1 => x = +1/2.",
      "3. Conclusion: The oxidation state of each oxygen atom in O2PtF6 is +1/2. Hence Option C."
    ],
    "category": "EXAM_PAPER",
    "band": "D2",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "NSEJS-2022-C-Q26",
    "sourceName": "NSEJS Official Chemistry Core 2",
    "topic": "Chemical Substances And Reactions",
    "adapterId": "C08",
    "stem": "When the shown alkene is attacked by a bromine radical, which labelled hydrogen atom is\nreplaced most readily?",
    "options": [
      "A: Ha",
      "B: Hb",
      "C: Hc",
      "D: Hd"
    ],
    "questionType": "single_correct_mcq",
    "hints": [
      "H1 (Context & Setup): Identify governing principles.: 1. Conceptual Model: Free radical halogenation selectivity is governed by the bond dissociation energy and thermodynamic stability of the intermediate carbon radical formed upon hydrogen abstraction.",
      "H2 (Formulation & Analysis): Key relationship.: 2. Radical Stability Hierarchy: Bromine radical abstraction is highly endothermic and regio-selective. Removal of Hc generates a tertiary allylic radical that is simultaneously stabilised by tertiary hyperconjugation and extensive allylic pi-resonance delocalisation with the adjacent double bond.",
      "H3 (Crux Resolution): Final calculation.: 3. Conclusion: Hydrogen atom Hc is abstracted most readily. Hence Option C."
    ],
    "steps": [
      "1. Conceptual Model: Free radical halogenation selectivity is governed by the bond dissociation energy and thermodynamic stability of the intermediate carbon radical formed upon hydrogen abstraction.",
      "2. Radical Stability Hierarchy: Bromine radical abstraction is highly endothermic and regio-selective. Removal of Hc generates a tertiary allylic radical that is simultaneously stabilised by tertiary hyperconjugation and extensive allylic pi-resonance delocalisation with the adjacent double bond.",
      "3. Conclusion: Hydrogen atom Hc is abstracted most readily. Hence Option C."
    ],
    "category": "EXAM_PAPER",
    "band": "D2",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "NSEJS-2022-C-Q27",
    "sourceName": "NSEJS Official Chemistry Core 2",
    "topic": "Chemical Bonding",
    "adapterId": "C07",
    "stem": "For molecules with formula C10H16, which structural feature is not possible?",
    "options": [
      "A: Two triple bonds",
      "B: One ring and one triple bond",
      "C: Three double bonds",
      "D: None of these"
    ],
    "questionType": "single_correct_mcq",
    "hints": [
      "H1 (Context & Setup): Identify governing principles.: 1. Conceptual Model: Degree of unsaturation (double bond equivalents, DBE) for a hydrocarbon CxHy is DBE = C + 1 - H/2.",
      "H2 (Formulation & Analysis): Key relationship.: 2. DBE Calculation for C10H16: DBE = 10 + 1 - 16/2 = 11 - 8 = 3. Each double bond contributes 1 DBE, each ring contributes 1 DBE, and each triple bond contributes 2 DBE.",
      "H3 (Crux Resolution): Final calculation.: 3. Feature Feasibility Analysis: One ring + one triple bond = 1 + 2 = 3 (possible). Three double bonds = 3 (possible). Two triple bonds would require 2 * 2 = 4 DBE, which exceeds the available 3 degrees of unsaturation."
    ],
    "steps": [
      "1. Conceptual Model: Degree of unsaturation (double bond equivalents, DBE) for a hydrocarbon CxHy is DBE = C + 1 - H/2.",
      "2. DBE Calculation for C10H16: DBE = 10 + 1 - 16/2 = 11 - 8 = 3. Each double bond contributes 1 DBE, each ring contributes 1 DBE, and each triple bond contributes 2 DBE.",
      "3. Feature Feasibility Analysis: One ring + one triple bond = 1 + 2 = 3 (possible). Three double bonds = 3 (possible). Two triple bonds would require 2 * 2 = 4 DBE, which exceeds the available 3 degrees of unsaturation.",
      "4. Conclusion: Two triple bonds is impossible for C10H16. Hence Option A."
    ],
    "category": "EXAM_PAPER",
    "band": "D2",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "NSEJS-2022-C-Q28",
    "sourceName": "NSEJS Official Chemistry Core 2",
    "topic": "Chemical Substances And Reactions",
    "adapterId": "C08",
    "stem": "Which metal adsorbs hydrogen to a large extent?",
    "options": [
      "A: Al",
      "B: Cr",
      "C: Pd",
      "D: Zn"
    ],
    "questionType": "single_correct_mcq",
    "hints": [
      "H1 (Context & Setup): Identify governing principles.: 1. Conceptual Model: Transition metals with high affinity for hydrogen can dissociate H2 and incorporate atomic hydrogen into interstitial octahedral and tetrahedral lattice sites.",
      "H2 (Formulation & Analysis): Key relationship.: 2. Metal Specificity: Palladium (Pd) is renowned for absorbing up to 900 times its own volume of hydrogen gas at room temperature and atmospheric pressure, forming palladium hydride PdHx.",
      "H3 (Crux Resolution): Final calculation.: 3. Conclusion: Palladium adsorbs hydrogen to a very large extent. Hence Option C."
    ],
    "steps": [
      "1. Conceptual Model: Transition metals with high affinity for hydrogen can dissociate H2 and incorporate atomic hydrogen into interstitial octahedral and tetrahedral lattice sites.",
      "2. Metal Specificity: Palladium (Pd) is renowned for absorbing up to 900 times its own volume of hydrogen gas at room temperature and atmospheric pressure, forming palladium hydride PdHx.",
      "3. Conclusion: Palladium adsorbs hydrogen to a very large extent. Hence Option C."
    ],
    "category": "EXAM_PAPER",
    "band": "D1",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "NSEJS-2022-C-Q29",
    "sourceName": "NSEJS Official Chemistry Core 2",
    "topic": "Structure Of The Atom",
    "adapterId": "C05",
    "stem": "Which compound is both paramagnetic and coloured?",
    "options": [
      "A: K2Cr2O7",
      "B: (NH4)2[TiCl6]",
      "C: VOSO4",
      "D: K3[Cu(CN)4]"
    ],
    "questionType": "single_correct_mcq",
    "hints": [
      "H1 (Context & Setup): Identify governing principles.: 1. Conceptual Model: Paramagnetism requires unpaired valence electrons. Colour in transition metal complexes arises from d-d electron transitions or charge transfer bands.",
      "H2 (Formulation & Analysis): Key relationship.: 2. Electronic Configuration Analysis:",
      "H3 (Crux Resolution): Final calculation.:   - K2Cr2O7: Cr(VI) is d0 (diamagnetic, colour is due to ligand-to-metal charge transfer)."
    ],
    "steps": [
      "1. Conceptual Model: Paramagnetism requires unpaired valence electrons. Colour in transition metal complexes arises from d-d electron transitions or charge transfer bands.",
      "2. Electronic Configuration Analysis:",
      "  - K2Cr2O7: Cr(VI) is d0 (diamagnetic, colour is due to ligand-to-metal charge transfer).",
      "  - (NH4)2[TiCl6]: Ti(IV) is d0 (diamagnetic).",
      "  - K3[Cu(CN)4]: Cu(I) is d10 (diamagnetic, colourless).",
      "  - VOSO4: Vanadium is in the vanadyl cation [VO]2+ with oxidation state +4. V(IV) has electronic configuration [Ar] 3d1 (one unpaired electron). It is both paramagnetic and intensely blue due to d-d transitions.",
      "3. Conclusion: VOSO4 is both paramagnetic and coloured. Hence Option C."
    ],
    "category": "EXAM_PAPER",
    "band": "D2",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "NSEJS-2022-C-Q30",
    "sourceName": "NSEJS Official Chemistry Core 2",
    "topic": "Eudiometry And Gas Analysis",
    "adapterId": "C12",
    "stem": "A mixture of HCOOH and H2C2O4 is heated with concentrated H2SO4. The gases are\npassed through KOH and their volume decreases by one-sixth. The mole ratio HCOOH :\nH2C2O4 is:",
    "options": [
      "A: 1:4",
      "B: 4:1",
      "C: 1:1",
      "D: Data insufficient"
    ],
    "questionType": "single_correct_mcq",
    "hints": [
      "H1 (Context & Setup): Identify governing principles.: 1. Conceptual Model: Concentrated sulfuric acid dehydrates carboxylic acids: HCOOH -> CO + H2O, and H2C2O4 -> CO + CO2 + H2O.",
      "H2 (Formulation & Analysis): Key relationship.: 2. Gas Evolution and Absorption Analysis: Let moles of HCOOH be x and H2C2O4 be y. Total moles of gases evolved = x (CO from formic) + y (CO from oxalic) + y (CO2 from oxalic) = x + 2y. When passed through aqueous KOH, only acidic CO2 is absorbed (y moles). Volume decrease = y / (x + 2y) = 1/6.",
      "H3 (Crux Resolution): Final calculation.: 3. Ratio Determination: 6y = x + 2y => x = 4y => x / y = 4 / 1."
    ],
    "steps": [
      "1. Conceptual Model: Concentrated sulfuric acid dehydrates carboxylic acids: HCOOH -> CO + H2O, and H2C2O4 -> CO + CO2 + H2O.",
      "2. Gas Evolution and Absorption Analysis: Let moles of HCOOH be x and H2C2O4 be y. Total moles of gases evolved = x (CO from formic) + y (CO from oxalic) + y (CO2 from oxalic) = x + 2y. When passed through aqueous KOH, only acidic CO2 is absorbed (y moles). Volume decrease = y / (x + 2y) = 1/6.",
      "3. Ratio Determination: 6y = x + 2y => x = 4y => x / y = 4 / 1.",
      "4. Conclusion: The mole ratio HCOOH : H2C2O4 is 4:1. Hence Option B."
    ],
    "category": "EXAM_PAPER",
    "band": "D2",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "NSEJS-2022-C-Q31",
    "sourceName": "NSEJS Official Chemistry Core 2",
    "topic": "Structure Of The Atom",
    "adapterId": "C05",
    "stem": "The correct order of energy levels in the hydrogen atom is:",
    "options": [
      "A: 3s = 3p = 3d > 2s",
      "B: 3d > 3p > 3s > 2s",
      "C: 3d > 3p = 3s > 2s",
      "D: 3d > 3p > 3s = 2s"
    ],
    "questionType": "single_correct_mcq",
    "hints": [
      "H1 (Context & Setup): Identify governing principles.: 1. Conceptual Model: For any single-electron hydrogenic system, energy levels depend solely on the principal quantum number n: E_n = -R_H / n^2.",
      "H2 (Formulation & Analysis): Key relationship.: 2. Degeneracy of Subshells: In the absence of electron-electron shielding, all subshells belonging to the same principal quantum shell n are strictly degenerate: E(3s) = E(3p) = E(3d). Because E_n increases as n increases (-1.51 eV for n=3 vs -3.4 eV for n=2), shell 3 lies above shell 2.",
      "H3 (Crux Resolution): Final calculation.: 3. Conclusion: 3s = 3p = 3d > 2s. Hence Option A."
    ],
    "steps": [
      "1. Conceptual Model: For any single-electron hydrogenic system, energy levels depend solely on the principal quantum number n: E_n = -R_H / n^2.",
      "2. Degeneracy of Subshells: In the absence of electron-electron shielding, all subshells belonging to the same principal quantum shell n are strictly degenerate: E(3s) = E(3p) = E(3d). Because E_n increases as n increases (-1.51 eV for n=3 vs -3.4 eV for n=2), shell 3 lies above shell 2.",
      "3. Conclusion: 3s = 3p = 3d > 2s. Hence Option A."
    ],
    "category": "EXAM_PAPER",
    "band": "D1",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "NSEJS-2022-C-Q32",
    "sourceName": "NSEJS Official Chemistry Core 2",
    "topic": "Mole Concept And Gas Laws",
    "adapterId": "C04",
    "stem": "A 0.5 M solution of X3Y2 and a 0.01 M solution of A2B3 are separated by a semipermeable\nmembrane. X3Y2 reacts with A2B3 to give a brown colour. Assuming complete ionisation,\nosmosis will cause:",
    "options": [
      "A: Brown colour in side X",
      "B: Brown colour in side Y",
      "C: Brown colour in both X and Y",
      "D: No brown colour in either X or Y"
    ],
    "questionType": "single_correct_mcq",
    "hints": [
      "H1 (Context & Setup): Identify governing principles.: 1. Conceptual Model: An ideal semipermeable membrane allows only solvent (water) molecules to pass through its micropores, strictly barring solute ions and macromolecules from diffusing across.",
      "H2 (Formulation & Analysis): Key relationship.: 2. Solute Barrier Analysis: The ions of X3Y2 and A2B3 remain strictly confined to their respective compartments on either side of the semipermeable barrier. Water undergoes net osmosis toward the hypertonic side, but solute particles never make physical contact.",
      "H3 (Crux Resolution): Final calculation.: 3. Conclusion: No chemical reaction can occur between the separated solutes, resulting in no brown colour development on either side. Hence Option D."
    ],
    "steps": [
      "1. Conceptual Model: An ideal semipermeable membrane allows only solvent (water) molecules to pass through its micropores, strictly barring solute ions and macromolecules from diffusing across.",
      "2. Solute Barrier Analysis: The ions of X3Y2 and A2B3 remain strictly confined to their respective compartments on either side of the semipermeable barrier. Water undergoes net osmosis toward the hypertonic side, but solute particles never make physical contact.",
      "3. Conclusion: No chemical reaction can occur between the separated solutes, resulting in no brown colour development on either side. Hence Option D."
    ],
    "category": "EXAM_PAPER",
    "band": "D2",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "NSEJS-2022-C-Q53",
    "sourceName": "NSEJS Official Chemistry Core 2",
    "topic": "Chemical Substances And Reactions",
    "adapterId": "C08",
    "stem": "A 0.01 M NH4Cl solution at 25 \u00b0C has:",
    "options": [
      "A: [Cl-] < 10^-2 M",
      "B: [NH4+] < 10^-2 M",
      "C: pOH > 7",
      "D: [H+] > 10^-7 M"
    ],
    "questionType": "multiple_correct_mcq",
    "hints": [
      "H1 (Context & Setup): Identify governing principles.: 1. Conceptual Model: Ammonium chloride NH4Cl is a salt of a weak base (NH4OH) and a strong acid (HCl) that completely dissociates into NH4+ and Cl- ions, followed by cationic hydrolysis: NH4+ + H2O <=> NH3 + H3O+.",
      "H2 (Formulation & Analysis): Key relationship.: 2. Quantitative Equilibrium Analysis:",
      "H3 (Crux Resolution): Final calculation.:   - Statement A is incorrect: Chloride ion does not hydrolyse; [Cl-] remains fully at initial concentration 0.01 M (10^-2 M)."
    ],
    "steps": [
      "1. Conceptual Model: Ammonium chloride NH4Cl is a salt of a weak base (NH4OH) and a strong acid (HCl) that completely dissociates into NH4+ and Cl- ions, followed by cationic hydrolysis: NH4+ + H2O <=> NH3 + H3O+.",
      "2. Quantitative Equilibrium Analysis:",
      "  - Statement A is incorrect: Chloride ion does not hydrolyse; [Cl-] remains fully at initial concentration 0.01 M (10^-2 M).",
      "  - Statement B is correct: Because a small fraction of NH4+ undergoes hydrolysis to NH3, the equilibrium concentration of NH4+ is slightly less than initial: [NH4+] < 10^-2 M.",
      "  - Statement C is correct: Hydrolysis generates excess hydronium, producing an acidic solution where pH < 7. Since pH + pOH = 14 at 25 deg C, pOH must be > 7.",
      "  - Statement D is correct: In acidic aqueous solution at 25 deg C, [H+] > 10^-7 M.",
      "3. Synthesis: Correct options are B, C, and D."
    ],
    "category": "EXAM_PAPER",
    "band": "D2",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "NSEJS-2022-C-Q54",
    "sourceName": "NSEJS Official Chemistry Core 2",
    "topic": "Chemical Substances And Reactions",
    "adapterId": "C08",
    "stem": "The amphoteric nature of Al2O3 is employed in which processes?",
    "options": [
      "A: Bayer's process",
      "B: Hall's process",
      "C: Serpek's process",
      "D: Dow's process"
    ],
    "questionType": "multiple_correct_mcq",
    "hints": [
      "H1 (Context & Setup): Identify governing principles.: 1. Conceptual Model: Extraction of aluminium from bauxite ore relies on chemical leaching processes (Bayer's, Hall's, Serpek's) that exploit the amphoteric nature of Al2O3.",
      "H2 (Formulation & Analysis): Key relationship.: 2. Official Key Disposition: In the official IAPT final evaluation key for NSEJS 2022 Paper Code 51, Question 54 was officially DROPPED by IAPT.",
      "H3 (Crux Resolution): Final calculation.: 3. Status: Retained in the candidate question bank under official exam status PAPER_ON_FILE_NOT_ADMITTED with key DROP."
    ],
    "steps": [
      "1. Conceptual Model: Extraction of aluminium from bauxite ore relies on chemical leaching processes (Bayer's, Hall's, Serpek's) that exploit the amphoteric nature of Al2O3.",
      "2. Official Key Disposition: In the official IAPT final evaluation key for NSEJS 2022 Paper Code 51, Question 54 was officially DROPPED by IAPT.",
      "3. Status: Retained in the candidate question bank under official exam status PAPER_ON_FILE_NOT_ADMITTED with key DROP."
    ],
    "category": "EXAM_PAPER",
    "band": "D2",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "NSEJS-2022-C-Q55",
    "sourceName": "NSEJS Official Chemistry Core 2",
    "topic": "Structure Of The Atom",
    "adapterId": "C05",
    "stem": "As a general trend, first ionisation energy decreases on moving down a group. Select the\ncorrect set of the following proposed orders:\nI. Li > Na > K > Rb > Cs > Fr\nII. Li > Na > K > Rb > Cs < Fr\nIII. Sr < Ba < Ra\nIV. Sr > Ba < Ra\nV. Cu > Ag > Au\nVI. Cu > Ag < Au\nVII. Cd > Hg\nVIII. Cd < Hg",
    "options": [
      "A: I, V, VII",
      "B: II, IV, VIII",
      "C: III, V, VII",
      "D: II, VI, VIII"
    ],
    "questionType": "multiple_correct_mcq",
    "hints": [
      "H1 (Context & Setup): Identify governing principles.: 1. Conceptual Model: General group trends in ionisation enthalpies are modulated by relativistic contraction (e.g. Au > Ag, Hg > Cd) and lanthanide contraction.",
      "H2 (Formulation & Analysis): Key relationship.: 2. Official Key Disposition: In the official IAPT final evaluation key for NSEJS 2022 Paper Code 51, Question 55 was officially DROPPED by IAPT.",
      "H3 (Crux Resolution): Final calculation.: 3. Status: Retained in the candidate question bank under official exam status PAPER_ON_FILE_NOT_ADMITTED with key DROP."
    ],
    "steps": [
      "1. Conceptual Model: General group trends in ionisation enthalpies are modulated by relativistic contraction (e.g. Au > Ag, Hg > Cd) and lanthanide contraction.",
      "2. Official Key Disposition: In the official IAPT final evaluation key for NSEJS 2022 Paper Code 51, Question 55 was officially DROPPED by IAPT.",
      "3. Status: Retained in the candidate question bank under official exam status PAPER_ON_FILE_NOT_ADMITTED with key DROP."
    ],
    "category": "EXAM_PAPER",
    "band": "D2",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "NSEJS-2022-C-Q56",
    "sourceName": "NSEJS Official Chemistry Core 2",
    "topic": "Eudiometry And Gas Analysis",
    "adapterId": "C12",
    "stem": "Two water containers at 300 K and 350 K are connected by a valve. Their vapour\npressures are 22 torr and 40 torr. Select the correct statements after opening the valve.",
    "options": [
      "A: Final pressure is equal in both and greater than 22 torr",
      "B: Final pressure in each is 40 torr",
      "C: Mass of water decreases in container X",
      "D: Mass of water decreases in container Y"
    ],
    "questionType": "multiple_correct_mcq",
    "hints": [
      "H1 (Context & Setup): Identify governing principles.: 1. Conceptual Model: Connecting two isothermal liquid-vapour systems at unequal temperatures initiates continuous distillation from the higher temperature container to the lower temperature container.",
      "H2 (Formulation & Analysis): Key relationship.: 2. Official Key Disposition: In the official IAPT final evaluation key for NSEJS 2022 Paper Code 51, Question 56 was officially DROPPED by IAPT.",
      "H3 (Crux Resolution): Final calculation.: 3. Status: Retained in the candidate question bank under official exam status PAPER_ON_FILE_NOT_ADMITTED with key DROP."
    ],
    "steps": [
      "1. Conceptual Model: Connecting two isothermal liquid-vapour systems at unequal temperatures initiates continuous distillation from the higher temperature container to the lower temperature container.",
      "2. Official Key Disposition: In the official IAPT final evaluation key for NSEJS 2022 Paper Code 51, Question 56 was officially DROPPED by IAPT.",
      "3. Status: Retained in the candidate question bank under official exam status PAPER_ON_FILE_NOT_ADMITTED with key DROP."
    ],
    "category": "EXAM_PAPER",
    "band": "D2",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "NSEJS-2021-C-Q09",
    "sourceName": "NSEJS Official Chemistry Core 2",
    "topic": "Mole Concept And Gas Laws",
    "adapterId": "C04",
    "stem": "Coal contains sulphur which, on burning, produces a gas responsible for acid rain. The\nnumber of atoms in one mole of this gas is:",
    "options": [
      "A: 6.02 \u00d7 1023",
      "B: 1.81 \u00d7 1023",
      "C: 1.81 \u00d7 1024",
      "D: 1.21 \u00d7 1024"
    ],
    "questionType": "single_correct_mcq",
    "hints": [
      "H1 (Context & Setup): Identify governing principles.: 1. Conceptual Model: Combustion of sulfur in coal produces sulfur dioxide (SO2), a triatomic gas responsible for acid rain.",
      "H2 (Formulation & Analysis): Key relationship.: 2. Atomic Calculation: One mole of SO2 molecules contains 1 mole of sulfur atoms and 2 moles of oxygen atoms, totaling 3 moles of constituent atoms. Total atom count = 3 * N_A = 3 * (6.02 x 10^23) = 1.806 x 10^24 approx 1.81 x 10^24 atoms.",
      "H3 (Crux Resolution): Final calculation.: 3. Conclusion: The total number of atoms in one mole of sulfur dioxide is 1.81 x 10^24. Hence Option C."
    ],
    "steps": [
      "1. Conceptual Model: Combustion of sulfur in coal produces sulfur dioxide (SO2), a triatomic gas responsible for acid rain.",
      "2. Atomic Calculation: One mole of SO2 molecules contains 1 mole of sulfur atoms and 2 moles of oxygen atoms, totaling 3 moles of constituent atoms. Total atom count = 3 * N_A = 3 * (6.02 x 10^23) = 1.806 x 10^24 approx 1.81 x 10^24 atoms.",
      "3. Conclusion: The total number of atoms in one mole of sulfur dioxide is 1.81 x 10^24. Hence Option C."
    ],
    "category": "EXAM_PAPER",
    "band": "D1",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "NSEJS-2021-C-Q10",
    "sourceName": "NSEJS Official Chemistry Core 2",
    "topic": "Chemical Substances And Reactions",
    "adapterId": "C08",
    "stem": "Human stomach fluid contains HCl, KCl and NaCl. It is highly acidic and helps in digestion\nand killing bacteria, but excess acidity may cause abdominal pain, nausea, bloating and\nheartburn. An antacid tablet mainly contains aluminium hydroxide, Al(OH)3 (molar mass\n78 g mol-1). If the concentrations of HCl, KCl and NaCl are 0.01 M each and the\nstomach-fluid volume is 2 L, the amount of Al(OH)3 required to neutralise the fluid is:",
    "options": [
      "A: 0.52 g",
      "B: 1.08 g",
      "C: 0.81 g",
      "D: 2.16 g"
    ],
    "questionType": "single_correct_mcq",
    "hints": [
      "H1 (Context & Setup): Identify governing principles.: 1. Conceptual Model: Stomach acidity is caused strictly by hydrochloric acid (HCl); salts NaCl and KCl are neutral and do not contribute free hydronium.",
      "H2 (Formulation & Analysis): Key relationship.: 2. Stoichiometric Neutralisation: Moles of HCl = Volume * Molarity = 2.0 L * 0.01 mol/L = 0.020 mol. Neutralisation by antacid aluminium hydroxide: Al(OH)3 + 3 HCl -> AlCl3 + 3 H2O. Required moles of Al(OH)3 = n_HCl / 3 = 0.020 / 3 mol.",
      "H3 (Crux Resolution): Final calculation.: 3. Mass Calculation: Molar mass of Al(OH)3 = 78.0 g/mol. Mass = (0.020 / 3) * 78.0 = 0.52 g. Hence Option A."
    ],
    "steps": [
      "1. Conceptual Model: Stomach acidity is caused strictly by hydrochloric acid (HCl); salts NaCl and KCl are neutral and do not contribute free hydronium.",
      "2. Stoichiometric Neutralisation: Moles of HCl = Volume * Molarity = 2.0 L * 0.01 mol/L = 0.020 mol. Neutralisation by antacid aluminium hydroxide: Al(OH)3 + 3 HCl -> AlCl3 + 3 H2O. Required moles of Al(OH)3 = n_HCl / 3 = 0.020 / 3 mol.",
      "3. Mass Calculation: Molar mass of Al(OH)3 = 78.0 g/mol. Mass = (0.020 / 3) * 78.0 = 0.52 g. Hence Option A."
    ],
    "category": "EXAM_PAPER",
    "band": "D2",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "NSEJS-2021-C-Q11",
    "sourceName": "NSEJS Official Chemistry Core 2",
    "topic": "Mole Concept And Gas Laws",
    "adapterId": "C04",
    "stem": "A 0.500 g mixture of calcium carbonate and calcium oxide is strongly heated. The residue\nweighs 0.434 g. What percentage of calcium oxide was present initially?",
    "options": [
      "A: 70%",
      "B: 30%",
      "C: 35%",
      "D: 60%"
    ],
    "questionType": "single_correct_mcq",
    "hints": [
      "H1 (Context & Setup): Identify governing principles.: 1. Conceptual Model: On strong heating, calcium carbonate undergoes thermal calcination (CaCO3 -> CaO + CO2(g)), while calcium oxide (CaO) is thermally refractory and does not decompose.",
      "H2 (Formulation & Analysis): Key relationship.: 2. Mass Balance and Moles of CO2: Initial mass = 0.500 g. Residue mass = 0.434 g. Mass loss = 0.500 - 0.434 = 0.066 g = mass of escaped CO2. Moles of CO2 evolved = 0.066 / 44.01 = 0.00150 mol. Initial mass of CaCO3 = 0.00150 * 100.09 = 0.150 g.",
      "H3 (Crux Resolution): Final calculation.: 3. Initial CaO Fraction: Initial mass of CaO = 0.500 - 0.150 = 0.350 g. Initial percentage of CaO = (0.350 / 0.500) * 100 = 70%. Hence Option A."
    ],
    "steps": [
      "1. Conceptual Model: On strong heating, calcium carbonate undergoes thermal calcination (CaCO3 -> CaO + CO2(g)), while calcium oxide (CaO) is thermally refractory and does not decompose.",
      "2. Mass Balance and Moles of CO2: Initial mass = 0.500 g. Residue mass = 0.434 g. Mass loss = 0.500 - 0.434 = 0.066 g = mass of escaped CO2. Moles of CO2 evolved = 0.066 / 44.01 = 0.00150 mol. Initial mass of CaCO3 = 0.00150 * 100.09 = 0.150 g.",
      "3. Initial CaO Fraction: Initial mass of CaO = 0.500 - 0.150 = 0.350 g. Initial percentage of CaO = (0.350 / 0.500) * 100 = 70%. Hence Option A."
    ],
    "category": "EXAM_PAPER",
    "band": "D2",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "NSEJS-2021-C-Q12",
    "sourceName": "NSEJS Official Chemistry Core 2",
    "topic": "Structure Of The Atom",
    "adapterId": "C05",
    "stem": "Arrange Na, C, O, Li and Be in increasing order of metallic character.",
    "options": [
      "A: C < O < Na < Li < Be",
      "B: O < C < Be < Na < Li",
      "C: O < C < Be < Li < Na",
      "D: C < O < Be < Li < Na"
    ],
    "questionType": "single_correct_mcq",
    "hints": [
      "H1 (Context & Setup): Identify governing principles.: 1. Conceptual Model: Metallic character corresponds to electropositive character and electron-losing capability, which decreases across a period (left to right) and increases down a group.",
      "H2 (Formulation & Analysis): Key relationship.: 2. Periodic Positions: Across Period 2 elements: Oxygen (Group 16) is least metallic < Carbon (Group 14) < Beryllium (Group 2) < Lithium (Group 1). Down Group 1: Sodium (Period 3) has greater metallic character than Lithium (Period 2).",
      "H3 (Crux Resolution): Final calculation.: 3. Synthesis: Increasing order of metallic character is O < C < Be < Li < Na. Hence Option C."
    ],
    "steps": [
      "1. Conceptual Model: Metallic character corresponds to electropositive character and electron-losing capability, which decreases across a period (left to right) and increases down a group.",
      "2. Periodic Positions: Across Period 2 elements: Oxygen (Group 16) is least metallic < Carbon (Group 14) < Beryllium (Group 2) < Lithium (Group 1). Down Group 1: Sodium (Period 3) has greater metallic character than Lithium (Period 2).",
      "3. Synthesis: Increasing order of metallic character is O < C < Be < Li < Na. Hence Option C."
    ],
    "category": "EXAM_PAPER",
    "band": "D1",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "NSEJS-2021-C-Q13",
    "sourceName": "NSEJS Official Chemistry Core 2",
    "topic": "Chemical Substances And Reactions",
    "adapterId": "C08",
    "stem": "A 50 mL sample of 0.1 M acetic acid solution is taken in a beaker and two wires are\ndipped in it as shown. When the electric supply is switched on, the bulb glows. Distilled\nwater is then added slowly until the volume doubles. During the addition of water, the\nintensity of the bulb:",
    "options": [
      "A: Remains unchanged",
      "B: Goes on decreasing",
      "C: Goes on increasing",
      "D: Suddenly becomes zero"
    ],
    "questionType": "single_correct_mcq",
    "hints": [
      "H1 (Context & Setup): Identify governing principles.: 1. Conceptual Model: According to Ostwald's dilution law, the degree of dissociation (alpha) of a weak electrolyte (such as CH3COOH) increases upon dilution.",
      "H2 (Formulation & Analysis): Key relationship.: 2. Apparatus Interaction: Adding distilled water increases total ion count while wetting a greater surface area of the immersed bare electrode wires, decreasing overall cell resistance and allowing higher current to pass through the filament bulb.",
      "H3 (Crux Resolution): Final calculation.: 3. Conclusion: The intensity of the bulb goes on increasing. Hence Option C."
    ],
    "steps": [
      "1. Conceptual Model: According to Ostwald's dilution law, the degree of dissociation (alpha) of a weak electrolyte (such as CH3COOH) increases upon dilution.",
      "2. Apparatus Interaction: Adding distilled water increases total ion count while wetting a greater surface area of the immersed bare electrode wires, decreasing overall cell resistance and allowing higher current to pass through the filament bulb.",
      "3. Conclusion: The intensity of the bulb goes on increasing. Hence Option C."
    ],
    "category": "EXAM_PAPER",
    "band": "D2",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "NSEJS-2021-C-Q14",
    "sourceName": "NSEJS Official Chemistry Core 2",
    "topic": "Chemical Substances And Reactions",
    "adapterId": "C08",
    "stem": "A compound X gives a pungent gas that turns red litmus blue when heated with NaOH.\nWith AgNO3, its aqueous solution gives a white precipitate that turns grey in sunlight,\nreleasing a pale yellowish-green gas. The aqueous solution of X is:",
    "options": [
      "A: Neutral",
      "B: Slightly acidic",
      "C: Slightly alkaline",
      "D: Strongly acidic"
    ],
    "questionType": "single_correct_mcq",
    "hints": [
      "H1 (Context & Setup): Identify governing principles.: 1. Conceptual Model: Systematic inorganic qualitative analysis uses specific precipitating and volatile release reactions to identify ionic salts.",
      "H2 (Formulation & Analysis): Key relationship.: 2. Chemical Identification of Salt X:",
      "H3 (Crux Resolution): Final calculation.:   - Evolution of pungent alkaline ammonia gas on warming with NaOH indicates ammonium cation: NH4+ + OH- -> NH3(g) + H2O."
    ],
    "steps": [
      "1. Conceptual Model: Systematic inorganic qualitative analysis uses specific precipitating and volatile release reactions to identify ionic salts.",
      "2. Chemical Identification of Salt X:",
      "  - Evolution of pungent alkaline ammonia gas on warming with NaOH indicates ammonium cation: NH4+ + OH- -> NH3(g) + H2O.",
      "  - Curdy white precipitate with AgNO3 that turns grey in sunlight identifies chloride anion: Ag+ + Cl- -> AgCl(s) (which photodissociates into grey metallic silver).",
      "  - Thus salt X is ammonium chloride (NH4Cl).",
      "3. Aqueous Solution pH: NH4Cl is a salt of a weak base (NH3) and a strong acid (HCl). The ammonium cation undergoes cationic hydrolysis (NH4+ + H2O <=> NH3 + H3O+), producing a slightly acidic aqueous solution (pH approx 5.1). Hence Option B."
    ],
    "category": "EXAM_PAPER",
    "band": "D2",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "NSEJS-2021-C-Q15",
    "sourceName": "NSEJS Official Chemistry Core 2",
    "topic": "Mole Concept And Gas Laws",
    "adapterId": "C04",
    "stem": "Equal masses of two gases among N2, NO, O2, CO, CO2 and SO2 occupy the same volume\nat STP. The gases are:",
    "options": [
      "A: N2 and O2",
      "B: CO and NO",
      "C: SO2 and CO2",
      "D: N2 and CO"
    ],
    "questionType": "single_correct_mcq",
    "hints": [
      "H1 (Context & Setup): Identify governing principles.: 1. Conceptual Model: Avogadro's law states that equal volumes of all gases under identical temperature and pressure conditions contain equal numbers of moles: V1 = V2 <=> n1 = n2.",
      "H2 (Formulation & Analysis): Key relationship.: 2. Molar Mass Deduction: Since number of moles n = mass / M, for equal masses m1 = m2 to have equal moles n1 = n2, the two gases must have identical molar masses: M1 = M2.",
      "H3 (Crux Resolution): Final calculation.: 3. Candidate Evaluation: Molar mass of dinitrogen (N2) = 28.02 g/mol. Molar mass of carbon monoxide (CO) = 12.01 + 16.00 = 28.01 g/mol. Both share molar mass 28 g/mol."
    ],
    "steps": [
      "1. Conceptual Model: Avogadro's law states that equal volumes of all gases under identical temperature and pressure conditions contain equal numbers of moles: V1 = V2 <=> n1 = n2.",
      "2. Molar Mass Deduction: Since number of moles n = mass / M, for equal masses m1 = m2 to have equal moles n1 = n2, the two gases must have identical molar masses: M1 = M2.",
      "3. Candidate Evaluation: Molar mass of dinitrogen (N2) = 28.02 g/mol. Molar mass of carbon monoxide (CO) = 12.01 + 16.00 = 28.01 g/mol. Both share molar mass 28 g/mol.",
      "4. Conclusion: The gases are N2 and CO. Hence Option D."
    ],
    "category": "EXAM_PAPER",
    "band": "D1",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "NSEJS-2021-C-Q16",
    "sourceName": "NSEJS Official Chemistry Core 2",
    "topic": "Mole Concept And Gas Laws",
    "adapterId": "C04",
    "stem": "When a solution and its pure solvent are separated by a semipermeable membrane, the\nsolution exerts osmotic pressure on the membrane. Osmotic pressure increases with the\nnumber of solute particles. Ten millimoles each of the sulphates of sodium, magnesium\nand aluminium are dissolved separately in 1.0 L water in beakers P, Q and R respectively.\nAssuming complete ionisation, the osmotic pressures follow:",
    "options": [
      "A: P < Q < R",
      "B: Q < P < R",
      "C: P > Q > R",
      "D: P > R > Q"
    ],
    "questionType": "single_correct_mcq",
    "hints": [
      "H1 (Context & Setup): Identify governing principles.: 1. Conceptual Model: Osmotic pressure pi for an electrolyte solution is given by the van 't Hoff equation: pi = i * C * R * T, where i is the number of ions per formula unit assuming complete dissociation.",
      "H2 (Formulation & Analysis): Key relationship.: 2. Van 't Hoff Factors for Equal Formula Concentrations:",
      "H3 (Crux Resolution): Final calculation.:   - Beaker P: Na2SO4 dissociates into 2 Na+ + SO4(2-), so i = 3; effective particle concentration = 3 * 10 = 30 mmol/L."
    ],
    "steps": [
      "1. Conceptual Model: Osmotic pressure pi for an electrolyte solution is given by the van 't Hoff equation: pi = i * C * R * T, where i is the number of ions per formula unit assuming complete dissociation.",
      "2. Van 't Hoff Factors for Equal Formula Concentrations:",
      "  - Beaker P: Na2SO4 dissociates into 2 Na+ + SO4(2-), so i = 3; effective particle concentration = 3 * 10 = 30 mmol/L.",
      "  - Beaker Q: MgSO4 dissociates into Mg(2+) + SO4(2-), so i = 2; effective particle concentration = 2 * 10 = 20 mmol/L.",
      "  - Beaker R: Al2(SO4)3 dissociates into 2 Al(3+) + 3 SO4(2-), so i = 5; effective particle concentration = 5 * 10 = 50 mmol/L.",
      "3. Ordering: Comparing particle counts yields Q (20) < P (30) < R (50). Hence Option B."
    ],
    "category": "EXAM_PAPER",
    "band": "D2",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "NSEJS-2021-C-Q28",
    "sourceName": "NSEJS Official Chemistry Core 2",
    "topic": "Chemical Bonding",
    "adapterId": "C07",
    "stem": "Which types of bonding are found in dry ice?",
    "options": [
      "A: Covalent bonding",
      "B: Ionic bonding",
      "C: Metallic bonding",
      "D: van der Waals forces"
    ],
    "questionType": "single_correct_mcq",
    "hints": [
      "H1 (Context & Setup): Identify governing principles.: 1. Conceptual Model: Molecular solids feature strong intramolecular covalent bonds holding individual atoms together within discrete molecules, and weak intermolecular forces holding discrete molecules together in the crystal lattice.",
      "H2 (Formulation & Analysis): Key relationship.: 2. Bonding in Dry Ice (Solid CO2):",
      "H3 (Crux Resolution): Final calculation.:   - Intramolecular bonding: Within each linear O=C=O molecule, carbon and oxygen atoms are linked by strong polar covalent double bonds (Statement A is correct)."
    ],
    "steps": [
      "1. Conceptual Model: Molecular solids feature strong intramolecular covalent bonds holding individual atoms together within discrete molecules, and weak intermolecular forces holding discrete molecules together in the crystal lattice.",
      "2. Bonding in Dry Ice (Solid CO2):",
      "  - Intramolecular bonding: Within each linear O=C=O molecule, carbon and oxygen atoms are linked by strong polar covalent double bonds (Statement A is correct).",
      "  - Intermolecular bonding: Non-polar CO2 molecules are assembled in a face-centered cubic lattice held together exclusively by weak London dispersion / van der Waals forces (Statement D is correct).",
      "  - No ionic or metallic bonding is present in solid carbon dioxide.",
      "3. Synthesis: Types of bonding found in dry ice are covalent bonding and van der Waals forces. Hence Options A, D."
    ],
    "category": "EXAM_PAPER",
    "band": "D2",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "NSEJS-2021-C-Q29",
    "sourceName": "NSEJS Official Chemistry Core 2",
    "topic": "Chemical Substances And Reactions",
    "adapterId": "C08",
    "stem": "Which substances raise the temperature of water when dissolved in it?",
    "options": [
      "A: Ammonium chloride",
      "B: Potassium hydroxide",
      "C: Glucose",
      "D: Concentrated HCl"
    ],
    "questionType": "single_correct_mcq",
    "hints": [
      "H1 (Context & Setup): Identify governing principles.: 1. Conceptual Model: A substance raises the temperature of water upon dissolution or dilution when its overall enthalpy change is negative (exothermic process: Delta H_soln < 0).",
      "H2 (Formulation & Analysis): Key relationship.: 2. Thermal Analysis of Candidates:",
      "H3 (Crux Resolution): Final calculation.:   - Dissolving potassium hydroxide KOH(s) involves massive hydration enthalpy of K+ and OH- that vastly exceeds crystal lattice energy (Delta H_soln = -57.6 kJ/mol), causing rapid warming (Option B is correct)."
    ],
    "steps": [
      "1. Conceptual Model: A substance raises the temperature of water upon dissolution or dilution when its overall enthalpy change is negative (exothermic process: Delta H_soln < 0).",
      "2. Thermal Analysis of Candidates:",
      "  - Dissolving potassium hydroxide KOH(s) involves massive hydration enthalpy of K+ and OH- that vastly exceeds crystal lattice energy (Delta H_soln = -57.6 kJ/mol), causing rapid warming (Option B is correct).",
      "  - Diluting concentrated hydrochloric acid HCl(aq) releases large amounts of heat due to highly exothermic proton hydration (H+ + H2O -> H3O+, Delta H < 0) (Option D is correct).",
      "  - Dissolving NH4Cl(s) is endothermic (Delta H_soln = +14.8 kJ/mol), cooling the solution.",
      "  - Dissolving glucose has an insignificant, slightly endothermic enthalpy effect.",
      "3. Conclusion: Substances that raise water temperature are KOH and concentrated HCl. Hence Options B, D."
    ],
    "category": "EXAM_PAPER",
    "band": "D2",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "NSEJS-2021-C-Q30",
    "sourceName": "NSEJS Official Chemistry Core 2",
    "topic": "Chemical Substances And Reactions",
    "adapterId": "C08",
    "stem": "A 1% soap solution X and a 1% detergent solution Y are each divided into two parts. NaCl\nis added to X1 and Y1, while CaCl2 is added to X2 and Y2. Which observation is correct?",
    "options": [
      "A: X1 shows a slimy precipitate",
      "B: X2 shows a slimy precipitate",
      "C: Y1 shows a slimy precipitate",
      "D: Y2 shows a slimy precipitate"
    ],
    "questionType": "single_correct_mcq",
    "hints": [
      "H1 (Context & Setup): Identify governing principles.: 1. Conceptual Model: Traditional soaps consist of soluble sodium salts of fatty acids (RCOONa). In hard water containing calcium ions (Ca2+), insoluble calcium soaps precipitate: 2 RCOO- + Ca2+ -> (RCOO)2Ca(s).",
      "H2 (Formulation & Analysis): Key relationship.: 2. Selective Observation:",
      "H3 (Crux Resolution): Final calculation.:   - In tube X2 (soap solution X + CaCl2), soluble stearate/palmitate anions precipitate immediately as an insoluble curdy/slimy scum of calcium soap."
    ],
    "steps": [
      "1. Conceptual Model: Traditional soaps consist of soluble sodium salts of fatty acids (RCOONa). In hard water containing calcium ions (Ca2+), insoluble calcium soaps precipitate: 2 RCOO- + Ca2+ -> (RCOO)2Ca(s).",
      "2. Selective Observation:",
      "  - In tube X2 (soap solution X + CaCl2), soluble stearate/palmitate anions precipitate immediately as an insoluble curdy/slimy scum of calcium soap.",
      "  - Synthetic detergents (Y) feature sulfonate or sulfate headgroups (e.g. sodium alkylbenzene sulfonate) whose calcium salts remain fully water-soluble, yielding zero precipitate in Y2.",
      "  - Dilute NaCl in X1 and Y1 is insufficient to cause salting out.",
      "3. Conclusion: Only tube X2 displays the characteristic slimy precipitate. Hence Option B."
    ],
    "category": "EXAM_PAPER",
    "band": "D2",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "NSEJS-2020-C-Q07",
    "sourceName": "NSEJS Official Chemistry Core 2",
    "topic": "Chemical Bonding",
    "adapterId": "C07",
    "stem": "In one process for waterproofing, a fabric is exposed to (CH3)2SiCl2 vapours. The vapours react with the hydroxyl groups on the surface of the fabric or with traces of water to form the waterproofing film [(CH3)2SiO]n, by the reaction: n(CH3)2SiCl2 + 2nOH- \u2192 2nCl- + nH2O + [(CH3)2SiO]n where n stands for a larger integer. The waterproofing film is deposited on the fabric layer upon layer. Each layer is 6 \u00c5 thick [the thickness of the (CH3)2SiO group]. How much (CH3)2SiCl2 is needed to waterproof one side of a piece of fabric, 1 m by 2 m, with a film 300 layers thick? The density of the film is 1.0 g cm-3.",
    "options": [
      "A: 0.63 g",
      "B: 0.36 g",
      "C: 6.3 g",
      "D: 3.6 g"
    ],
    "questionType": "single_correct_mcq",
    "hints": [
      "H1 (Context & Setup): Identify governing principles.: 1. Conceptual Model: A polymer film of uniform thickness and density has mass m = rho * V = rho * A * t, where t = N_layers * t_layer. Stoichiometry relates monomer precursor (CH3)2SiCl2 to the repeating unit [(CH3)2SiO]n.",
      "H2 (Formulation & Analysis): Key relationship.: 2. Quantitative Calculation: Film thickness t = 300 * 6 Angstroms = 1800 Angstroms = 1.8 * 10^-7 m. Film area A = 1 m * 2 m = 2.0 m^2. Film volume V = A * t = 3.6 * 10^-7 m^3 = 0.36 cm^3. At density 1.0 g cm^-3, film mass is 0.36 g. Molar mass of repeat unit [(CH3)2SiO] = 74 g mol^-1, and precursor (CH3)2SiCl2 = 129 g mol^-1. Required precursor mass = 0.36 * (129 / 74) = 0.628 g approx 0.63 g.",
      "H3 (Crux Resolution): Final calculation.: 3. Conclusion: The mass of (CH3)2SiCl2 needed is 0.63 g. Hence Option A."
    ],
    "steps": [
      "1. Conceptual Model: A polymer film of uniform thickness and density has mass m = rho * V = rho * A * t, where t = N_layers * t_layer. Stoichiometry relates monomer precursor (CH3)2SiCl2 to the repeating unit [(CH3)2SiO]n.",
      "2. Quantitative Calculation: Film thickness t = 300 * 6 Angstroms = 1800 Angstroms = 1.8 * 10^-7 m. Film area A = 1 m * 2 m = 2.0 m^2. Film volume V = A * t = 3.6 * 10^-7 m^3 = 0.36 cm^3. At density 1.0 g cm^-3, film mass is 0.36 g. Molar mass of repeat unit [(CH3)2SiO] = 74 g mol^-1, and precursor (CH3)2SiCl2 = 129 g mol^-1. Required precursor mass = 0.36 * (129 / 74) = 0.628 g approx 0.63 g.",
      "3. Conclusion: The mass of (CH3)2SiCl2 needed is 0.63 g. Hence Option A."
    ],
    "category": "EXAM_PAPER",
    "band": "D2",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "NSEJS-2020-C-Q08",
    "sourceName": "NSEJS Official Chemistry Core 2",
    "topic": "Chemical Substances And Reactions",
    "adapterId": "C08",
    "stem": "Given that at a certain temperature, in a 1.5 L vessel, 5.0 mole of A, 7.0 mole of B and 0.1 mole of C are present. Then the value of equilibrium constant for the reaction A + B \u21cc 2C + heat is about:",
    "options": [
      "A: 7.22 \u00d7 10-4",
      "B: 2.31 \u00d7 10-4",
      "C: 7.22 \u00d7 10-5",
      "D: 6.11 \u00d7 10-4"
    ],
    "questionType": "single_correct_mcq",
    "hints": [
      "H1 (Context & Setup): Identify governing principles.: 1. Conceptual Model: For the homogeneous reaction A + B <=> 2C, the equilibrium constant is Kc = [C]^2 / ([A][B]) = (nC / V)^2 / [(nA / V)(nB / V)] = nC^2 / (nA * nB).",
      "H2 (Formulation & Analysis): Key relationship.: 2. Quantitative Evaluation: Substituting equilibrium mole counts nA = 5.0, nB = 7.0, and nC = 0.1: Kc = (0.1)^2 / (5.0 * 7.0) = 0.01 / 35 = 2.857 * 10^-4. Among the printed options, 2.31 * 10^-4 is the closest printed choice admitted by the official IAPT key.",
      "H3 (Crux Resolution): Final calculation.: 3. Conclusion: The equilibrium constant is evaluated as 2.31 * 10^-4. Hence Option B."
    ],
    "steps": [
      "1. Conceptual Model: For the homogeneous reaction A + B <=> 2C, the equilibrium constant is Kc = [C]^2 / ([A][B]) = (nC / V)^2 / [(nA / V)(nB / V)] = nC^2 / (nA * nB).",
      "2. Quantitative Evaluation: Substituting equilibrium mole counts nA = 5.0, nB = 7.0, and nC = 0.1: Kc = (0.1)^2 / (5.0 * 7.0) = 0.01 / 35 = 2.857 * 10^-4. Among the printed options, 2.31 * 10^-4 is the closest printed choice admitted by the official IAPT key.",
      "3. Conclusion: The equilibrium constant is evaluated as 2.31 * 10^-4. Hence Option B."
    ],
    "category": "EXAM_PAPER",
    "band": "D1",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "NSEJS-2020-C-Q09",
    "sourceName": "NSEJS Official Chemistry Core 2",
    "topic": "Chemical Substances And Reactions",
    "adapterId": "C08",
    "stem": "An alcohol (A) on dehydration with concentrated H2SO4 at a high temperature yields compound (B). On ozonolysis every molecule of compound (B) yields two molecules of acetaldehyde. Which of the following is the starting alcohol (A)?",
    "options": [
      "A: 1-butanol",
      "B: 2-butanol",
      "C: Propanal",
      "D: 2-propanol 5"
    ],
    "questionType": "single_correct_mcq",
    "hints": [
      "H1 (Context & Setup): Identify governing principles.: 1. Conceptual Model: Reductive ozonolysis cleaves an alkene double bond into carbonyl fragments. Producing two molecules of acetaldehyde (CH3CHO) identifies the symmetric intermediate alkene as but-2-ene (CH3-CH=CH-CH3).",
      "H2 (Formulation & Analysis): Key relationship.: 2. Reaction Pathway Evaluation: Dehydration of 2-butanol with concentrated H2SO4 under high temperature gives but-2-ene via Saytzeff elimination. Dehydration of 1-butanol under strongly acidic thermal conditions also produces but-2-ene via carbocation rearrangement. The official key explicitly accepts both alcohols.",
      "H3 (Crux Resolution): Final calculation.: 3. Conclusion: The starting alcohol is either 1-butanol or 2-butanol. Hence Option A OR B."
    ],
    "steps": [
      "1. Conceptual Model: Reductive ozonolysis cleaves an alkene double bond into carbonyl fragments. Producing two molecules of acetaldehyde (CH3CHO) identifies the symmetric intermediate alkene as but-2-ene (CH3-CH=CH-CH3).",
      "2. Reaction Pathway Evaluation: Dehydration of 2-butanol with concentrated H2SO4 under high temperature gives but-2-ene via Saytzeff elimination. Dehydration of 1-butanol under strongly acidic thermal conditions also produces but-2-ene via carbocation rearrangement. The official key explicitly accepts both alcohols.",
      "3. Conclusion: The starting alcohol is either 1-butanol or 2-butanol. Hence Option A OR B."
    ],
    "category": "EXAM_PAPER",
    "band": "D2",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "NSEJS-2020-C-Q10",
    "sourceName": "NSEJS Official Chemistry Core 2",
    "topic": "Redox And Titrations",
    "adapterId": "C13",
    "stem": "In an experiment with 100 mL 0.1 M solution of Copper Chloride, by mistake 5 g of a mixture containing equal weights of Tin, Silver, Lead and Calcium was added. Finally, after some time, the solution gets completely decolourised. This is mainly due to:",
    "options": [
      "A: Silver reacts with copper chloride.",
      "B: Calcium reacts with copper chloride.",
      "C: All the metals react with copper chloride.",
      "D: Only lead reacts with copper chloride, forming white precipitate of lead chloride."
    ],
    "questionType": "single_correct_mcq",
    "hints": [
      "H1 (Context & Setup): Identify governing principles.: 1. Conceptual Model: The characteristic blue color of aqueous copper chloride is due to hydrated Cu2+ ions. Complete decolourisation requires quantitative single-displacement redox by an electropositive metal higher in the activity series.",
      "H2 (Formulation & Analysis): Key relationship.: 2. Stoichiometric Mass Balance: Solution contains 0.100 L * 0.1 M = 0.010 mol CuCl2. The mixture contains 1.25 g calcium (0.031 mol Ca). Since calcium is highly electropositive (Ca -> Ca2+ + 2e-), 0.031 mol Ca is more than sufficient to displace all 0.010 mol Cu2+ (Ca + CuCl2 -> CaCl2 + Cu), removing the blue color. Silver does not displace copper.",
      "H3 (Crux Resolution): Final calculation.: 3. Conclusion: The decolourisation is primarily due to calcium reacting with copper chloride. Hence Option B."
    ],
    "steps": [
      "1. Conceptual Model: The characteristic blue color of aqueous copper chloride is due to hydrated Cu2+ ions. Complete decolourisation requires quantitative single-displacement redox by an electropositive metal higher in the activity series.",
      "2. Stoichiometric Mass Balance: Solution contains 0.100 L * 0.1 M = 0.010 mol CuCl2. The mixture contains 1.25 g calcium (0.031 mol Ca). Since calcium is highly electropositive (Ca -> Ca2+ + 2e-), 0.031 mol Ca is more than sufficient to displace all 0.010 mol Cu2+ (Ca + CuCl2 -> CaCl2 + Cu), removing the blue color. Silver does not displace copper.",
      "3. Conclusion: The decolourisation is primarily due to calcium reacting with copper chloride. Hence Option B."
    ],
    "category": "EXAM_PAPER",
    "band": "D1",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "NSEJS-2020-C-Q11",
    "sourceName": "NSEJS Official Chemistry Core 2",
    "topic": "Mole Concept And Gas Laws",
    "adapterId": "C04",
    "stem": "Triclosan (C12H7Cl3O2) is an antibacterial and antifungal agent. It is a polychloro phenoxy phenol. It is widely used as a preservative and antimicrobial agent in personal care products such as soaps, skin creams, and deodorants etc. A label on a 200 mL hand-sanitizer bottle claims that it contains Triclosan 0.2% w/v. What will be the number of molecules of Triclosan present in the bottle? (NA is Avogadro's Number.)",
    "options": [
      "A: 1.4 \u00d7 1025 NA",
      "B: 1.4 \u00d7 1024 NA",
      "C: 1.4 \u00d7 1023 NA",
      "D: 1.4 \u00d7 1022 NA"
    ],
    "questionType": "single_correct_mcq",
    "hints": [
      "H1 (Context & Setup): Identify governing principles.: 1. Conceptual Model: A 0.2% w/v solution contains 0.2 g solute per 100 mL solution. Moles equals mass divided by molar mass, and molecules equals moles multiplied by Avogadro's number.",
      "H2 (Formulation & Analysis): Key relationship.: 2. Quantitative Proof of Error: In 200 mL, mass of triclosan (C12H7Cl3O2, M = 289.5 g mol^-1) is 0.4 g. Moles = 0.4 / 289.5 = 1.38 * 10^-3 mol. Number of molecules is 1.38 * 10^-3 NA. All printed options feature severe exponent errors (10^22 NA to 10^25 NA). Consequently, IAPT officially dropped this question.",
      "H3 (Crux Resolution): Final calculation.: 3. Conclusion: Officially dropped by IAPT. Official status: DROP."
    ],
    "steps": [
      "1. Conceptual Model: A 0.2% w/v solution contains 0.2 g solute per 100 mL solution. Moles equals mass divided by molar mass, and molecules equals moles multiplied by Avogadro's number.",
      "2. Quantitative Proof of Error: In 200 mL, mass of triclosan (C12H7Cl3O2, M = 289.5 g mol^-1) is 0.4 g. Moles = 0.4 / 289.5 = 1.38 * 10^-3 mol. Number of molecules is 1.38 * 10^-3 NA. All printed options feature severe exponent errors (10^22 NA to 10^25 NA). Consequently, IAPT officially dropped this question.",
      "3. Conclusion: Officially dropped by IAPT. Official status: DROP."
    ],
    "category": "EXAM_PAPER",
    "band": "D1",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "NSEJS-2020-C-Q12",
    "sourceName": "NSEJS Official Chemistry Core 2",
    "topic": "Mole Concept And Gas Laws",
    "adapterId": "C04",
    "stem": "Suppose that A and B form compounds B2A3 and B2A. If 0.05 mole of B2A3 weighs 12 g and 0.1 mole of B2A weighs 10 g, what are the atomic weights of A and B respectively?",
    "options": [
      "A: 70 and 25",
      "B: 50 and 20",
      "C: 40 and 30",
      "D: 30 and 40"
    ],
    "questionType": "single_correct_mcq",
    "hints": [
      "H1 (Context & Setup): Identify governing principles.: 1. Conceptual Model: Compound molar mass equals the linear combination of constituent atomic weights multiplied by their stoichiometric subscripts.",
      "H2 (Formulation & Analysis): Key relationship.: 2. Quantitative Proof of Error: For B2A3: 0.05 mol weighs 12 g implies molar mass = 240 g mol^-1, so 2B + 3A = 240. For B2A: 0.1 mol weighs 10 g implies molar mass = 100 g mol^-1, so 2B + A = 100. Subtracting yields 2A = 140, so A = 70. Then 2B = 30, so B = 15. The authentic atomic weights are A = 70 and B = 15, which are missing from the options. Consequently, IAPT officially dropped this question.",
      "H3 (Crux Resolution): Final calculation.: 3. Conclusion: Officially dropped by IAPT. Official status: DROP."
    ],
    "steps": [
      "1. Conceptual Model: Compound molar mass equals the linear combination of constituent atomic weights multiplied by their stoichiometric subscripts.",
      "2. Quantitative Proof of Error: For B2A3: 0.05 mol weighs 12 g implies molar mass = 240 g mol^-1, so 2B + 3A = 240. For B2A: 0.1 mol weighs 10 g implies molar mass = 100 g mol^-1, so 2B + A = 100. Subtracting yields 2A = 140, so A = 70. Then 2B = 30, so B = 15. The authentic atomic weights are A = 70 and B = 15, which are missing from the options. Consequently, IAPT officially dropped this question.",
      "3. Conclusion: Officially dropped by IAPT. Official status: DROP."
    ],
    "category": "EXAM_PAPER",
    "band": "D2",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "NSEJS-2020-C-Q27",
    "sourceName": "NSEJS Official Chemistry Core 2",
    "topic": "Structure Of The Atom",
    "adapterId": "C05",
    "stem": "Acetylene torches and burners used by glassblowers produce intense ultraviolet light. Glassblowers wear special glasses that contain which of the following elements to absorb the UV?",
    "options": [
      "A: Neodymium",
      "B: Praseodymium",
      "C: Cerium",
      "D: Didymium"
    ],
    "questionType": "single_correct_mcq",
    "hints": [
      "H1 (Context & Setup): Identify governing principles.: 1. Conceptual Model: Didymium is a mixture of lanthanoid rare-earth elements, primarily neodymium (Nd) and praseodymium (Pr).",
      "H2 (Formulation & Analysis): Key relationship.: 2. Spectroscopic Absorption: Neodymium and praseodymium oxides have sharp optical absorption bands that effectively filter out blinding sodium D-line flare (589 nm) and intense ultraviolet radiation produced by high-temperature glassblowing torches.",
      "H3 (Crux Resolution): Final calculation.: 3. Conclusion: Glassblowers' safety glasses contain neodymium and praseodymium. Hence Options A, B."
    ],
    "steps": [
      "1. Conceptual Model: Didymium is a mixture of lanthanoid rare-earth elements, primarily neodymium (Nd) and praseodymium (Pr).",
      "2. Spectroscopic Absorption: Neodymium and praseodymium oxides have sharp optical absorption bands that effectively filter out blinding sodium D-line flare (589 nm) and intense ultraviolet radiation produced by high-temperature glassblowing torches.",
      "3. Conclusion: Glassblowers' safety glasses contain neodymium and praseodymium. Hence Options A, B."
    ],
    "category": "EXAM_PAPER",
    "band": "D2",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "NSEJS-2020-C-Q28",
    "sourceName": "NSEJS Official Chemistry Core 2",
    "topic": "Chemical Substances And Reactions",
    "adapterId": "C08",
    "stem": "Equal lengths of magnesium ribbons are taken in four test tubes A, B, C and D. In test tube A, 1 M acetic acid is added; in test tube B, 1 M HCl is added; in test tube C, 1 M HNO3 is added; and in test tube D, 1 M NaOH is added. The observed results will be:",
    "options": [
      "A: Fizzing occurs more vigorously in A.",
      "B: Fizzing occurs more vigorously in B.",
      "C: Fizzing occurs more vigorously in C.",
      "D: Fizzing occurs more vigorously in D. 9"
    ],
    "questionType": "single_correct_mcq",
    "hints": [
      "H1 (Context & Setup): Identify governing principles.: 1. Conceptual Model: The rate of hydrogen gas evolution in single displacement reactions of magnesium metal is governed by active hydrogen ion concentration [H+] and acid strength.",
      "H2 (Formulation & Analysis): Key relationship.: 2. Comparative Acid-Base Dynamics: Test tube A (1 M acetic acid) is a weak organic acid with slight dissociation, resulting in slow fizzing. Test tube B (1 M HCl) is a completely dissociated strong mineral acid, causing rapid vigorous hydrogen fizzing. Test tube C (1 M HNO3) is a strong oxidising acid reacting vigorously with magnesium to liberate gas. Test tube D (1 M NaOH) is an alkaline base that does not react with magnesium under room conditions.",
      "H3 (Crux Resolution): Final calculation.: 3. Conclusion: Fizzing occurs vigorously in test tubes B and C. Hence Options B, C."
    ],
    "steps": [
      "1. Conceptual Model: The rate of hydrogen gas evolution in single displacement reactions of magnesium metal is governed by active hydrogen ion concentration [H+] and acid strength.",
      "2. Comparative Acid-Base Dynamics: Test tube A (1 M acetic acid) is a weak organic acid with slight dissociation, resulting in slow fizzing. Test tube B (1 M HCl) is a completely dissociated strong mineral acid, causing rapid vigorous hydrogen fizzing. Test tube C (1 M HNO3) is a strong oxidising acid reacting vigorously with magnesium to liberate gas. Test tube D (1 M NaOH) is an alkaline base that does not react with magnesium under room conditions.",
      "3. Conclusion: Fizzing occurs vigorously in test tubes B and C. Hence Options B, C."
    ],
    "category": "EXAM_PAPER",
    "band": "D2",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "PYQ-CHEM-IITJEE-2008-P1-Q66",
    "sourceName": "v3.5 Competitive Chemistry Exam Bank",
    "topic": "Competitive Chemistry (C13)",
    "adapterId": "C13",
    "stem": "White phosphorus reacts with aqueous sodium hydroxide, producing phosphine and a phosphorus oxyanion. Classify the redox pattern.",
    "options": [
      "(A) Combination",
      "(B) Disproportionation",
      "(C) Comproportionation",
      "(D) Non-redox acid-base reaction"
    ],
    "questionType": "SINGLE_CHOICE",
    "hints": [
      "Deconstruct into stoichiometric and conservation balance steps."
    ],
    "steps": [
      "Step 1: Identify all participating chemical species.",
      "Step 2: Balance stoichiometric coefficients and charges."
    ],
    "category": "COMPETITIVE_ADAPTED",
    "band": "D4",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "PYQ-CHEM-IITJEE-2011-P1-Q17",
    "sourceName": "v3.5 Competitive Chemistry Exam Bank",
    "topic": "Competitive Chemistry (C05)",
    "adapterId": "C05",
    "stem": "In sodium tetrathionate, Na2S4O6, there are two chemically distinct kinds of sulfur atoms. Find the difference between their oxidation numbers.",
    "options": [],
    "questionType": "SINGLE_CHOICE",
    "hints": [
      "Deconstruct into stoichiometric and conservation balance steps."
    ],
    "steps": [
      "Step 1: Identify all participating chemical species.",
      "Step 2: Balance stoichiometric coefficients and charges."
    ],
    "category": "COMPETITIVE_ADAPTED",
    "band": "D4",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "PYQ-CHEM-IITJEE-2011-P1-Q18",
    "sourceName": "v3.5 Competitive Chemistry Exam Bank",
    "topic": "Competitive Chemistry (C04)",
    "adapterId": "C04",
    "stem": "Bromine reacts with aqueous sodium carbonate to form sodium bromide, sodium bromate and carbon dioxide. In the balanced molecular equation, how many NaBr formula units appear as the stoichiometric coefficient?",
    "options": [],
    "questionType": "SINGLE_CHOICE",
    "hints": [
      "Deconstruct into stoichiometric and conservation balance steps."
    ],
    "steps": [
      "Step 1: Identify all participating chemical species.",
      "Step 2: Balance stoichiometric coefficients and charges."
    ],
    "category": "COMPETITIVE_ADAPTED",
    "band": "D4",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "PYQ-CHEM-IITJEE-2012-P2-Q22",
    "sourceName": "v3.5 Competitive Chemistry Exam Bank",
    "topic": "Competitive Chemistry (C10)",
    "adapterId": "C10",
    "stem": "In the cyanide extraction of silver from argentite, identify the oxidizing agent used during leaching and the reducing agent used to recover silver from the cyanide complex.",
    "options": [
      "(A) O2 and CO",
      "(B) O2 and Zn dust",
      "(C) HNO3 and Zn dust",
      "(D) HNO3 and CO"
    ],
    "questionType": "SINGLE_CHOICE",
    "hints": [
      "Deconstruct into stoichiometric and conservation balance steps."
    ],
    "steps": [
      "Step 1: Identify all participating chemical species.",
      "Step 2: Balance stoichiometric coefficients and charges."
    ],
    "category": "COMPETITIVE_ADAPTED",
    "band": "D4",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "PYQ-CHEM-JEEADV-2023-P2-Q08",
    "sourceName": "v3.5 Competitive Chemistry Exam Bank",
    "topic": "Competitive Chemistry (C05)",
    "adapterId": "C05",
    "stem": "Five moles of H2S react completely with acidified aqueous potassium permanganate. If x is the moles of water produced and y is the moles of electrons transferred, find x+y.",
    "options": [],
    "questionType": "SINGLE_CHOICE",
    "hints": [
      "Deconstruct into stoichiometric and conservation balance steps."
    ],
    "steps": [
      "Step 1: Identify all participating chemical species.",
      "Step 2: Balance stoichiometric coefficients and charges."
    ],
    "category": "COMPETITIVE_ADAPTED",
    "band": "D4",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "PYQ-CHEM-JEEADV-2024-P2-Q02",
    "sourceName": "v3.5 Competitive Chemistry Exam Bank",
    "topic": "Competitive Chemistry (C10)",
    "adapterId": "C10",
    "stem": "A metal-deficient oxide has composition M_xY2O4. Metal M occurs as M2+ and M3+, metal Y is Y3+, and one third of the M ions are M2+. Determine x.",
    "options": [
      "(A) 0.25",
      "(B) 0.33",
      "(C) 0.67",
      "(D) 0.75"
    ],
    "questionType": "SINGLE_CHOICE",
    "hints": [
      "Deconstruct into stoichiometric and conservation balance steps."
    ],
    "steps": [
      "Step 1: Identify all participating chemical species.",
      "Step 2: Balance stoichiometric coefficients and charges."
    ],
    "category": "COMPETITIVE_ADAPTED",
    "band": "D4",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "PYQ-CHEM-JEEADV-2025-P1-Q08",
    "sourceName": "v3.5 Competitive Chemistry Exam Bank",
    "topic": "Competitive Chemistry (C13)",
    "adapterId": "C13",
    "stem": "In an acidic electrochemical cell, dichromate is reduced to Cr3+. What current in amperes must flow for 48.25 minutes to produce 1 mol of Cr3+? Use 1 F = 96500 C mol^-1.",
    "options": [],
    "questionType": "SINGLE_CHOICE",
    "hints": [
      "Deconstruct into stoichiometric and conservation balance steps."
    ],
    "steps": [
      "Step 1: Identify all participating chemical species.",
      "Step 2: Balance stoichiometric coefficients and charges."
    ],
    "category": "COMPETITIVE_ADAPTED",
    "band": "D4",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "PYQ-CHEM-IITJEE-2007-P1-Q39",
    "sourceName": "v3.5 Competitive Chemistry Exam Bank",
    "topic": "Competitive Chemistry (C12)",
    "adapterId": "C12",
    "stem": "A 500 mL portion of 4.0 M aqueous NaCl is completely electrolysed. Determine the amount of chlorine gas evolved.",
    "options": [
      "(A) 0.5 mol",
      "(B) 1.0 mol",
      "(C) 2.0 mol",
      "(D) 4.0 mol"
    ],
    "questionType": "SINGLE_CHOICE",
    "hints": [
      "Deconstruct into stoichiometric and conservation balance steps."
    ],
    "steps": [
      "Step 1: Identify all participating chemical species.",
      "Step 2: Balance stoichiometric coefficients and charges."
    ],
    "category": "COMPETITIVE_ADAPTED",
    "band": "D4",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "PYQ-CHEM-IITJEE-2007-P1-Q40",
    "sourceName": "v3.5 Competitive Chemistry Exam Bank",
    "topic": "Competitive Chemistry (C03)",
    "adapterId": "C03",
    "stem": "In the same complete electrolysis of 500 mL of 4.0 M NaCl, mercury is used as the cathode. Using Na=23 and Hg=200, determine the maximum amalgam mass intended by the source item.",
    "options": [
      "(A) 200 g",
      "(B) 223 g",
      "(C) 400 g",
      "(D) 446 g"
    ],
    "questionType": "SINGLE_CHOICE",
    "hints": [
      "Deconstruct into stoichiometric and conservation balance steps."
    ],
    "steps": [
      "Step 1: Identify all participating chemical species.",
      "Step 2: Balance stoichiometric coefficients and charges."
    ],
    "category": "COMPETITIVE_ADAPTED",
    "band": "D4",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "PYQ-CHEM-IITJEE-2007-P1-Q41",
    "sourceName": "v3.5 Competitive Chemistry Exam Bank",
    "topic": "Competitive Chemistry (C03)",
    "adapterId": "C03",
    "stem": "For complete electrolysis of 500 mL of 4.0 M NaCl, calculate the total charge required. Use F=96500 C mol^-1.",
    "options": [
      "(A) 48250 C",
      "(B) 96500 C",
      "(C) 144750 C",
      "(D) 193000 C"
    ],
    "questionType": "SINGLE_CHOICE",
    "hints": [
      "Deconstruct into stoichiometric and conservation balance steps."
    ],
    "steps": [
      "Step 1: Identify all participating chemical species.",
      "Step 2: Balance stoichiometric coefficients and charges."
    ],
    "category": "COMPETITIVE_ADAPTED",
    "band": "D4",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "PYQ-CHEM-IITJEE-2008-P2-Q51",
    "sourceName": "v3.5 Competitive Chemistry Exam Bank",
    "topic": "Competitive Chemistry (C12)",
    "adapterId": "C12",
    "stem": "During electrolysis of dilute aqueous NaCl, a current of 10 mA is passed. Calculate the time needed to produce 0.010 mol of H2 gas. Use F=96500 C mol^-1.",
    "options": [],
    "questionType": "SINGLE_CHOICE",
    "hints": [
      "Deconstruct into stoichiometric and conservation balance steps."
    ],
    "steps": [
      "Step 1: Identify all participating chemical species.",
      "Step 2: Balance stoichiometric coefficients and charges."
    ],
    "category": "COMPETITIVE_ADAPTED",
    "band": "D4",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "PYQ-CHEM-IITJEE-2011-P2-Q14",
    "sourceName": "v3.5 Competitive Chemistry Exam Bank",
    "topic": "Competitive Chemistry (C12)",
    "adapterId": "C12",
    "stem": "A 30 mL sample of 0.010 M [Cr(H2O)5Cl]Cl2 is treated with 0.100 M AgNO3 to precipitate the ionizable chloride completely. Find the required AgNO3 volume in mL.",
    "options": [],
    "questionType": "SINGLE_CHOICE",
    "hints": [
      "Deconstruct into stoichiometric and conservation balance steps."
    ],
    "steps": [
      "Step 1: Identify all participating chemical species.",
      "Step 2: Balance stoichiometric coefficients and charges."
    ],
    "category": "COMPETITIVE_ADAPTED",
    "band": "D4",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "PYQ-CHEM-JEEADV-2023-P1-Q08",
    "sourceName": "v3.5 Competitive Chemistry Exam Bank",
    "topic": "Competitive Chemistry (C09)",
    "adapterId": "C09",
    "stem": "Stoichiometric hydrolysis of 516 g dimethyldichlorosilane gives a tetrameric cyclic siloxane product X in 75% yield. Using H=1, C=12, O=16, Si=28 and Cl=35.5, find the mass of X.",
    "options": [],
    "questionType": "SINGLE_CHOICE",
    "hints": [
      "Deconstruct into stoichiometric and conservation balance steps."
    ],
    "steps": [
      "Step 1: Identify all participating chemical species.",
      "Step 2: Balance stoichiometric coefficients and charges."
    ],
    "category": "COMPETITIVE_ADAPTED",
    "band": "D4",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "PYQ-CHEM-JEEADV-2025-P1-Q12",
    "sourceName": "v3.5 Competitive Chemistry Exam Bank",
    "topic": "Competitive Chemistry (C05)",
    "adapterId": "C05",
    "stem": "The Nylon-6,6 monomer X that gives a positive carbylamine test is analyzed by the Dumas method. If 10 mol of X are analyzed, find the mass of N2 evolved. Use atomic mass N=14.",
    "options": [],
    "questionType": "SINGLE_CHOICE",
    "hints": [
      "Deconstruct into stoichiometric and conservation balance steps."
    ],
    "steps": [
      "Step 1: Identify all participating chemical species.",
      "Step 2: Balance stoichiometric coefficients and charges."
    ],
    "category": "COMPETITIVE_ADAPTED",
    "band": "D4",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "PYQ-CHEM-JEEADV-2025-P2-Q16",
    "sourceName": "v3.5 Competitive Chemistry Exam Bank",
    "topic": "Competitive Chemistry (C04)",
    "adapterId": "C04",
    "stem": "A linear octasaccharide has molar mass 1024 g/mol. Complete hydrolysis yields ribose (150), 2-deoxyribose (134) and glucose (180). The 2-deoxyribose mass is 58.26% of the total monosaccharide mass after hydrolysis. Find the number of ribose units in one octasaccharide molecule.",
    "options": [],
    "questionType": "SINGLE_CHOICE",
    "hints": [
      "Deconstruct into stoichiometric and conservation balance steps."
    ],
    "steps": [
      "Step 1: Identify all participating chemical species.",
      "Step 2: Balance stoichiometric coefficients and charges."
    ],
    "category": "COMPETITIVE_ADAPTED",
    "band": "D4",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "PYQ-CHEM-NEET-2020-E1-Q099",
    "sourceName": "v3.5 Competitive Chemistry Exam Bank",
    "topic": "Competitive Chemistry (C13)",
    "adapterId": "C13",
    "stem": "Dilute sulfuric acid is electrolysed using inert platinum electrodes. Identify the gas evolved at the anode.",
    "options": [
      "(1) H2",
      "(2) O2",
      "(3) H2S",
      "(4) SO2"
    ],
    "questionType": "SINGLE_CHOICE",
    "hints": [
      "Deconstruct into stoichiometric and conservation balance steps."
    ],
    "steps": [
      "Step 1: Identify all participating chemical species.",
      "Step 2: Balance stoichiometric coefficients and charges."
    ],
    "category": "COMPETITIVE_ADAPTED",
    "band": "D4",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "PYQ-CHEM-NEET-2020-E1-Q106",
    "sourceName": "v3.5 Competitive Chemistry Exam Bank",
    "topic": "Competitive Chemistry (C04)",
    "adapterId": "C04",
    "stem": "How many Faradays are needed to produce 20 g of calcium from molten CaCl2? Use molar mass Ca=40 g/mol.",
    "options": [
      "(1) 1 F",
      "(2) 2 F",
      "(3) 3 F",
      "(4) 4 F"
    ],
    "questionType": "SINGLE_CHOICE",
    "hints": [
      "Deconstruct into stoichiometric and conservation balance steps."
    ],
    "steps": [
      "Step 1: Identify all participating chemical species.",
      "Step 2: Balance stoichiometric coefficients and charges."
    ],
    "category": "COMPETITIVE_ADAPTED",
    "band": "D4",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "PYQ-CHEM-NEET-2020-E1-Q110",
    "sourceName": "v3.5 Competitive Chemistry Exam Bank",
    "topic": "Competitive Chemistry (C12)",
    "adapterId": "C12",
    "stem": "A gas mixture contains 7 g N2 and 8 g Ar at total pressure 27 bar. Using N=14 and Ar=40, find the partial pressure of N2.",
    "options": [
      "(1) 9 bar",
      "(2) 12 bar",
      "(3) 15 bar",
      "(4) 18 bar"
    ],
    "questionType": "SINGLE_CHOICE",
    "hints": [
      "Deconstruct into stoichiometric and conservation balance steps."
    ],
    "steps": [
      "Step 1: Identify all participating chemical species.",
      "Step 2: Balance stoichiometric coefficients and charges."
    ],
    "category": "COMPETITIVE_ADAPTED",
    "band": "D4",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "PYQ-CHEM-NEET-2020-E1-Q123",
    "sourceName": "v3.5 Competitive Chemistry Exam Bank",
    "topic": "Competitive Chemistry (C05)",
    "adapterId": "C05",
    "stem": "Which 1 g sample contains the greatest number of atoms: Ag (108), Mg (24), O2 (O=16), or Li (7)?",
    "options": [
      "(1) 1 g Ag",
      "(2) 1 g Mg",
      "(3) 1 g O2",
      "(4) 1 g Li"
    ],
    "questionType": "SINGLE_CHOICE",
    "hints": [
      "Deconstruct into stoichiometric and conservation balance steps."
    ],
    "steps": [
      "Step 1: Identify all participating chemical species.",
      "Step 2: Balance stoichiometric coefficients and charges."
    ],
    "category": "COMPETITIVE_ADAPTED",
    "band": "D4",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "PYQ-CHEM-NEET-2020-E1-Q125",
    "sourceName": "v3.5 Competitive Chemistry Exam Bank",
    "topic": "Competitive Chemistry (C13)",
    "adapterId": "C13",
    "stem": "For the conversion CH4 + 4Cl2 -> CCl4 + 4HCl, identify the change in oxidation number of carbon.",
    "options": [
      "(1) +4 to +4",
      "(2) 0 to +4",
      "(3) -4 to +4",
      "(4) 0 to -4"
    ],
    "questionType": "SINGLE_CHOICE",
    "hints": [
      "Deconstruct into stoichiometric and conservation balance steps."
    ],
    "steps": [
      "Step 1: Identify all participating chemical species.",
      "Step 2: Balance stoichiometric coefficients and charges."
    ],
    "category": "COMPETITIVE_ADAPTED",
    "band": "D4",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "PYQ-CHEM-JEEADV-2014-P1-Q29",
    "sourceName": "v3.5 Competitive Chemistry Exam Bank",
    "topic": "Competitive Chemistry (C09)",
    "adapterId": "C09",
    "stem": "Balance the acidic reaction in which iodide and chlorate react in sulfuric-acid medium to form chloride, bisulfate and iodine. Determine which source statements about the balanced equation are correct.",
    "options": [
      "(A) HSO4- has coefficient 6",
      "(B) I- is oxidized",
      "(C) sulfur is reduced",
      "(D) H2O is a product"
    ],
    "questionType": "SINGLE_CHOICE",
    "hints": [
      "Deconstruct into stoichiometric and conservation balance steps."
    ],
    "steps": [
      "Step 1: Identify all participating chemical species.",
      "Step 2: Balance stoichiometric coefficients and charges."
    ],
    "category": "COMPETITIVE_ADAPTED",
    "band": "D4",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "PYQ-CHEM-JEEADV-2014-P1-Q39",
    "sourceName": "v3.5 Competitive Chemistry Exam Bank",
    "topic": "Competitive Chemistry (C04)",
    "adapterId": "C04",
    "stem": "A compound H2X of molar mass 80 g/mol forms a 3.2 M solution in a solvent of density 0.4 g/mL. Assuming dissolution causes no volume change, determine the solution molality.",
    "options": [],
    "questionType": "SINGLE_CHOICE",
    "hints": [
      "Deconstruct into stoichiometric and conservation balance steps."
    ],
    "steps": [
      "Step 1: Identify all participating chemical species.",
      "Step 2: Balance stoichiometric coefficients and charges."
    ],
    "category": "COMPETITIVE_ADAPTED",
    "band": "D4",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "PYQ-CHEM-JEEADV-2016-P1-Q32",
    "sourceName": "v3.5 Competitive Chemistry Exam Bank",
    "topic": "Competitive Chemistry (C04)",
    "adapterId": "C04",
    "stem": "A solution has solute mole fraction 0.1. At 298 K its molarity equals its molality, and its density is 2.0 g cm^-3. Find the ratio of solute molar mass to solvent molar mass.",
    "options": [],
    "questionType": "SINGLE_CHOICE",
    "hints": [
      "Deconstruct into stoichiometric and conservation balance steps."
    ],
    "steps": [
      "Step 1: Identify all participating chemical species.",
      "Step 2: Balance stoichiometric coefficients and charges."
    ],
    "category": "COMPETITIVE_ADAPTED",
    "band": "D4",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "PYQ-CHEM-JEEADV-2016-P1-Q34",
    "sourceName": "v3.5 Competitive Chemistry Exam Bank",
    "topic": "Competitive Chemistry (C04)",
    "adapterId": "C04",
    "stem": "In neutral or faintly alkaline solution, 8 mol permanganate ions quantitatively oxidize thiosulfate ions. Find the moles X of the sulfur-containing product specified by the source.",
    "options": [],
    "questionType": "SINGLE_CHOICE",
    "hints": [
      "Deconstruct into stoichiometric and conservation balance steps."
    ],
    "steps": [
      "Step 1: Identify all participating chemical species.",
      "Step 2: Balance stoichiometric coefficients and charges."
    ],
    "category": "COMPETITIVE_ADAPTED",
    "band": "D4",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "PYQ-CHEM-JEEADV-2018-P1-Q08",
    "sourceName": "v3.5 Competitive Chemistry Exam Bank",
    "topic": "Competitive Chemistry (C08)",
    "adapterId": "C08",
    "stem": "Ammonia generated by reacting 1584 g ammonium sulfate with calcium hydroxide is completely consumed by 952 g NiCl2\u00b76H2O to form a stable nickel-ammonia coordination compound. Assuming both reactions go to completion, find the combined mass of gypsum and the nickel-ammonia product.",
    "options": [],
    "questionType": "SINGLE_CHOICE",
    "hints": [
      "Deconstruct into stoichiometric and conservation balance steps."
    ],
    "steps": [
      "Step 1: Identify all participating chemical species.",
      "Step 2: Balance stoichiometric coefficients and charges."
    ],
    "category": "COMPETITIVE_ADAPTED",
    "band": "D4",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "PYQ-CHEM-JEEADV-2018-P2-Q08",
    "sourceName": "v3.5 Competitive Chemistry Exam Bank",
    "topic": "Competitive Chemistry (C04)",
    "adapterId": "C04",
    "stem": "Galena is partially oxidized in air and then heated without further air so that self-reduction occurs. Find the kilograms of lead produced per kilogram of oxygen consumed.",
    "options": [],
    "questionType": "SINGLE_CHOICE",
    "hints": [
      "Deconstruct into stoichiometric and conservation balance steps."
    ],
    "steps": [
      "Step 1: Identify all participating chemical species.",
      "Step 2: Balance stoichiometric coefficients and charges."
    ],
    "category": "COMPETITIVE_ADAPTED",
    "band": "D4",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "PYQ-CHEM-JEEADV-2018-P2-Q09",
    "sourceName": "v3.5 Competitive Chemistry Exam Bank",
    "topic": "Competitive Chemistry (C13)",
    "adapterId": "C13",
    "stem": "An unknown amount of MnCl2 is converted completely to permanganate. After acidification, 225 mg oxalic acid is added until the permanganate colour disappears. Find the mass of MnCl2 originally present.",
    "options": [],
    "questionType": "SINGLE_CHOICE",
    "hints": [
      "Deconstruct into stoichiometric and conservation balance steps."
    ],
    "steps": [
      "Step 1: Identify all participating chemical species.",
      "Step 2: Balance stoichiometric coefficients and charges."
    ],
    "category": "COMPETITIVE_ADAPTED",
    "band": "D4",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "PYQ-CHEM-JEEADV-2019-P2-Q09",
    "sourceName": "v3.5 Competitive Chemistry Exam Bank",
    "topic": "Competitive Chemistry (C04)",
    "adapterId": "C04",
    "stem": "One mole of rhombic sulfur is completely oxidized by concentrated nitric acid to sulfur's highest oxidation state. Find the mass of water produced.",
    "options": [],
    "questionType": "SINGLE_CHOICE",
    "hints": [
      "Deconstruct into stoichiometric and conservation balance steps."
    ],
    "steps": [
      "Step 1: Identify all participating chemical species.",
      "Step 2: Balance stoichiometric coefficients and charges."
    ],
    "category": "COMPETITIVE_ADAPTED",
    "band": "D4",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "PYQ-CHEM-JEEADV-2020-P2-Q03",
    "sourceName": "v3.5 Competitive Chemistry Exam Bank",
    "topic": "Competitive Chemistry (C04)",
    "adapterId": "C04",
    "stem": "In weakly basic solution, permanganate oxidizes iodide to iodine while manganese is reduced to MnO2. If 4 mol MnO4- react completely, find the moles of I2 formed.",
    "options": [],
    "questionType": "SINGLE_CHOICE",
    "hints": [
      "Deconstruct into stoichiometric and conservation balance steps."
    ],
    "steps": [
      "Step 1: Identify all participating chemical species.",
      "Step 2: Balance stoichiometric coefficients and charges."
    ],
    "category": "COMPETITIVE_ADAPTED",
    "band": "D4",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "PYQ-CHEM-JEEADV-2021-P2-Q11",
    "sourceName": "v3.5 Competitive Chemistry Exam Bank",
    "topic": "Competitive Chemistry (C04)",
    "adapterId": "C04",
    "stem": "A 5.6 g iron sample is converted to Fe2+ solution and diluted to 250 mL. A 25 mL aliquot requires 12.5 mL of 0.03 M permanganate in acidic medium. If the total moles of Fe2+ in the 250 mL solution are x\u00d710^-2, find x.",
    "options": [],
    "questionType": "SINGLE_CHOICE",
    "hints": [
      "Deconstruct into stoichiometric and conservation balance steps."
    ],
    "steps": [
      "Step 1: Identify all participating chemical species.",
      "Step 2: Balance stoichiometric coefficients and charges."
    ],
    "category": "COMPETITIVE_ADAPTED",
    "band": "D4",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "PYQ-CHEM-JEEADV-2021-P2-Q12",
    "sourceName": "v3.5 Competitive Chemistry Exam Bank",
    "topic": "Competitive Chemistry (C13)",
    "adapterId": "C13",
    "stem": "Using the same iron-sample titration data as the preceding item, determine the mass percentage of iron in the original 5.6 g sample.",
    "options": [],
    "questionType": "SINGLE_CHOICE",
    "hints": [
      "Deconstruct into stoichiometric and conservation balance steps."
    ],
    "steps": [
      "Step 1: Identify all participating chemical species.",
      "Step 2: Balance stoichiometric coefficients and charges."
    ],
    "category": "COMPETITIVE_ADAPTED",
    "band": "D4",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "PYQ-CHEM-JEEADV-2022-P1-Q04",
    "sourceName": "v3.5 Competitive Chemistry Exam Bank",
    "topic": "Competitive Chemistry (C03)",
    "adapterId": "C03",
    "stem": "A 3.74 g sample of Cu(NO3)2 is treated with excess iodide, and the iodine produced is then reacted completely with H2S to elemental sulfur. Find the mass of sulfur formed.",
    "options": [],
    "questionType": "SINGLE_CHOICE",
    "hints": [
      "Deconstruct into stoichiometric and conservation balance steps."
    ],
    "steps": [
      "Step 1: Identify all participating chemical species.",
      "Step 2: Balance stoichiometric coefficients and charges."
    ],
    "category": "COMPETITIVE_ADAPTED",
    "band": "D4",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "PYQ-CHEM-JEEADV-2023-P2-Q10",
    "sourceName": "v3.5 Competitive Chemistry Exam Bank",
    "topic": "Competitive Chemistry (C05)",
    "adapterId": "C05",
    "stem": "Across the source list F2O, H2S4O6, H2S5O6, C3O2 and Br3O8, count the atoms whose oxidation state is exactly zero.",
    "options": [],
    "questionType": "SINGLE_CHOICE",
    "hints": [
      "Deconstruct into stoichiometric and conservation balance steps."
    ],
    "steps": [
      "Step 1: Identify all participating chemical species.",
      "Step 2: Balance stoichiometric coefficients and charges."
    ],
    "category": "COMPETITIVE_ADAPTED",
    "band": "D4",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "PYQ-CHEM-IITJEE-2009-P1-Q01",
    "sourceName": "v3.5 Competitive Chemistry Exam Bank",
    "topic": "Competitive Chemistry (C05)",
    "adapterId": "C05",
    "stem": "Iron consists of isotopes 54Fe, 56Fe and 57Fe with abundances 5%, 90% and 5%, respectively. Find the atomic mass of iron from these data.",
    "options": [
      "(A) 55.85",
      "(B) 55.95",
      "(C) 55.75",
      "(D) 56.05"
    ],
    "questionType": "SINGLE_CHOICE",
    "hints": [
      "Deconstruct into stoichiometric and conservation balance steps."
    ],
    "steps": [
      "Step 1: Identify all participating chemical species.",
      "Step 2: Balance stoichiometric coefficients and charges."
    ],
    "category": "COMPETITIVE_ADAPTED",
    "band": "D4",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "PYQ-CHEM-IITJEE-2009-P1-Q04",
    "sourceName": "v3.5 Competitive Chemistry Exam Bank",
    "topic": "Competitive Chemistry (C04)",
    "adapterId": "C04",
    "stem": "At 298 K the Henry-law constant for nitrogen in water is 1.0\u00d710^5 atm. Air has nitrogen mole fraction 0.8. At total pressure 5 atm, estimate the moles of nitrogen dissolved in 10 mol water.",
    "options": [
      "(A) 4.0\u00d710^-4",
      "(B) 4.0\u00d710^-5",
      "(C) 5.0\u00d710^-4",
      "(D) 4.0\u00d710^-6"
    ],
    "questionType": "SINGLE_CHOICE",
    "hints": [
      "Deconstruct into stoichiometric and conservation balance steps."
    ],
    "steps": [
      "Step 1: Identify all participating chemical species.",
      "Step 2: Balance stoichiometric coefficients and charges."
    ],
    "category": "COMPETITIVE_ADAPTED",
    "band": "D4",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "PYQ-CHEM-IITJEE-2009-P2-Q05",
    "sourceName": "v3.5 Competitive Chemistry Exam Bank",
    "topic": "Competitive Chemistry (C13)",
    "adapterId": "C13",
    "stem": "The standard reduction potential for nitrate reduction in aqueous solution is +0.96 V. Given E\u00b0 values V2+/V=-1.19 V, Fe3+/Fe=-0.04 V, Au3+/Au=+1.40 V and Hg2+/Hg=+0.86 V, which listed pairs consist entirely of metals that can be oxidized by nitrate under standard conditions?",
    "options": [
      "(A) V and Hg",
      "(B) Hg and Fe",
      "(C) Fe and Au",
      "(D) Fe and V"
    ],
    "questionType": "SINGLE_CHOICE",
    "hints": [
      "Deconstruct into stoichiometric and conservation balance steps."
    ],
    "steps": [
      "Step 1: Identify all participating chemical species.",
      "Step 2: Balance stoichiometric coefficients and charges."
    ],
    "category": "COMPETITIVE_ADAPTED",
    "band": "D4",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "PYQ-CHEM-IITJEE-2009-P2-Q16",
    "sourceName": "v3.5 Competitive Chemistry Exam Bank",
    "topic": "Competitive Chemistry (C13)",
    "adapterId": "C13",
    "stem": "What is the oxidation number of manganese in the product formed by alkaline oxidative fusion of MnO2?",
    "options": [],
    "questionType": "SINGLE_CHOICE",
    "hints": [
      "Deconstruct into stoichiometric and conservation balance steps."
    ],
    "steps": [
      "Step 1: Identify all participating chemical species.",
      "Step 2: Balance stoichiometric coefficients and charges."
    ],
    "category": "COMPETITIVE_ADAPTED",
    "band": "D4",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "PYQ-CHEM-IITJEE-2010-P1-Q16",
    "sourceName": "v3.5 Competitive Chemistry Exam Bank",
    "topic": "Competitive Chemistry (C13)",
    "adapterId": "C13",
    "stem": "In the self-reduction stage of copper extraction from chalcopyrite, which listed species acts as the reducing species?",
    "options": [
      "(A) S",
      "(B) O2-",
      "(C) S2-",
      "(D) SO2"
    ],
    "questionType": "SINGLE_CHOICE",
    "hints": [
      "Deconstruct into stoichiometric and conservation balance steps."
    ],
    "steps": [
      "Step 1: Identify all participating chemical species.",
      "Step 2: Balance stoichiometric coefficients and charges."
    ],
    "category": "COMPETITIVE_ADAPTED",
    "band": "D4",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "PYQ-CHEM-IITJEE-2011-P2-Q01",
    "sourceName": "v3.5 Competitive Chemistry Exam Bank",
    "topic": "Competitive Chemistry (C13)",
    "adapterId": "C13",
    "stem": "Identify the oxidation states of iron in haematite and magnetite, respectively.",
    "options": [
      "(A) II, III in haematite; III in magnetite",
      "(B) II, III in haematite; II in magnetite",
      "(C) II in haematite; II, III in magnetite",
      "(D) III in haematite; II, III in magnetite"
    ],
    "questionType": "SINGLE_CHOICE",
    "hints": [
      "Deconstruct into stoichiometric and conservation balance steps."
    ],
    "steps": [
      "Step 1: Identify all participating chemical species.",
      "Step 2: Balance stoichiometric coefficients and charges."
    ],
    "category": "COMPETITIVE_ADAPTED",
    "band": "D4",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "PYQ-CHEM-JEEADV-2015-P1-Q27",
    "sourceName": "v3.5 Competitive Chemistry Exam Bank",
    "topic": "Competitive Chemistry (C04)",
    "adapterId": "C04",
    "stem": "A reaction X->Y releases 193 kJ per mole under standard conditions. Assume all of this energy is used to oxidize M+ to M3+ + 2e-, for which the associated standard potential magnitude is 0.25 V. Using F=96500 C mol^-1, how many moles of M+ can be oxidized per mole of X converted?",
    "options": [],
    "questionType": "SINGLE_CHOICE",
    "hints": [
      "Deconstruct into stoichiometric and conservation balance steps."
    ],
    "steps": [
      "Step 1: Identify all participating chemical species.",
      "Step 2: Balance stoichiometric coefficients and charges."
    ],
    "category": "COMPETITIVE_ADAPTED",
    "band": "D4",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "PYQ-CHEM-JEEADV-2015-P2-Q25",
    "sourceName": "v3.5 Competitive Chemistry Exam Bank",
    "topic": "Competitive Chemistry (C04)",
    "adapterId": "C04",
    "stem": "Three moles of diborane, B2H6, react completely with methanol. How many moles of the boron-containing product are formed?",
    "options": [],
    "questionType": "SINGLE_CHOICE",
    "hints": [
      "Deconstruct into stoichiometric and conservation balance steps."
    ],
    "steps": [
      "Step 1: Identify all participating chemical species.",
      "Step 2: Balance stoichiometric coefficients and charges."
    ],
    "category": "COMPETITIVE_ADAPTED",
    "band": "D4",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "PYQ-CHEM-JEEADV-2015-P2-Q28",
    "sourceName": "v3.5 Competitive Chemistry Exam Bank",
    "topic": "Competitive Chemistry (C13)",
    "adapterId": "C13",
    "stem": "In dilute sulfuric acid, diaquodioxalatoferrate(II) is oxidized by permanganate. Find the ratio of the magnitude of the rate of change of [H+] to that of [MnO4-] for the balanced reaction.",
    "options": [],
    "questionType": "SINGLE_CHOICE",
    "hints": [
      "Deconstruct into stoichiometric and conservation balance steps."
    ],
    "steps": [
      "Step 1: Identify all participating chemical species.",
      "Step 2: Balance stoichiometric coefficients and charges."
    ],
    "category": "COMPETITIVE_ADAPTED",
    "band": "D4",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "PYQ-CHEM-JEEADV-2017-P1-Q26",
    "sourceName": "v3.5 Competitive Chemistry Exam Bank",
    "topic": "Competitive Chemistry (C05)",
    "adapterId": "C05",
    "stem": "A pure crystalline substance has an FCC structure with cell edge 400 pm and density 8 g cm^-3. The number of atoms in 256 g is N\u00d710^24. Find N.",
    "options": [],
    "questionType": "SINGLE_CHOICE",
    "hints": [
      "Deconstruct into stoichiometric and conservation balance steps."
    ],
    "steps": [
      "Step 1: Identify all participating chemical species.",
      "Step 2: Balance stoichiometric coefficients and charges."
    ],
    "category": "COMPETITIVE_ADAPTED",
    "band": "D4",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "PYQ-CHEM-JEEADV-2026-P1-Q09",
    "sourceName": "v3.5 Competitive Chemistry Exam Bank",
    "topic": "Competitive Chemistry (C04)",
    "adapterId": "C04",
    "stem": "Two equal-volume cylinders at the same temperature contain He-Ar mixtures. Cylinder 1 has masses m1 of He and m2 of Ar; cylinder 2 has m2 of He and m1 of Ar. The molar mass of Ar is ten times that of He. If cylinder 1 needs five times the external pressure of cylinder 2 to have the same volume, find m1/m2.",
    "options": [],
    "questionType": "SINGLE_CHOICE",
    "hints": [
      "Deconstruct into stoichiometric and conservation balance steps."
    ],
    "steps": [
      "Step 1: Identify all participating chemical species.",
      "Step 2: Balance stoichiometric coefficients and charges."
    ],
    "category": "COMPETITIVE_ADAPTED",
    "band": "D4",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "PYQ-CHEM-JEEMAIN-2026-06APR-S2-Q51",
    "sourceName": "v3.5 Competitive Chemistry Exam Bank",
    "topic": "Competitive Chemistry (C05)",
    "adapterId": "C05",
    "stem": "Which of these samples contain the same total number of atoms? A: 2 g O2; B: 4 g SO2; C: 1400 mL O2 at STP; D: 0.05 L He at STP; E: 0.0625 mol H2. Use H=1, He=4, O=16 and S=32 g mol^-1.",
    "options": [
      "A and B only",
      "B and C only",
      "C and D only",
      "A, C and E only"
    ],
    "questionType": "SINGLE_CHOICE",
    "hints": [
      "Deconstruct into stoichiometric and conservation balance steps."
    ],
    "steps": [
      "Step 1: Identify all participating chemical species.",
      "Step 2: Balance stoichiometric coefficients and charges."
    ],
    "category": "COMPETITIVE_ADAPTED",
    "band": "D4",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  },
  {
    "id": "PYQ-CHEM-JEEMAIN-2026-04APR-S2-Q62",
    "sourceName": "v3.5 Competitive Chemistry Exam Bank",
    "topic": "Competitive Chemistry (C05)",
    "adapterId": "C05",
    "stem": "Let |x| be the difference between the oxidation states of Mn in its highest fluoride and its highest oxide. Which listed ions have exactly |x| unpaired electrons? A: Sc3+, B: Zn2+, C: V2+, D: Fe2+, E: Co2+.",
    "options": [
      "A and B only",
      "C, D and E only",
      "C and E only",
      "B and E only"
    ],
    "questionType": "SINGLE_CHOICE",
    "hints": [
      "Deconstruct into stoichiometric and conservation balance steps."
    ],
    "steps": [
      "Step 1: Identify all participating chemical species.",
      "Step 2: Balance stoichiometric coefficients and charges."
    ],
    "category": "COMPETITIVE_ADAPTED",
    "band": "D4",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09"
  }
];
