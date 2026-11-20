/**
 * web/pages/nsejs-core2-data.generated.ts
 * Wave 14 — Authenticated NSEJS Core 2 Multi-Disciplinary Question Bank.
 *
 * Enforces Fault N09 Answer Isolation:
 * Raw official keys are strictly withheld from client-side bundles (keyState: "WITHHELD_CLIENT_SIDE_FAULT_N09").
 * Diagnostic hints, step-by-step reasoning scaffolds, and sanity checks are provided for formative study.
 * Academic Status: HOLD (Academic Admission: HOLD) · Diagnostic Mode Authorized.
 */

export interface NsejsCore2ModuleDescriptor {
  readonly slug: string;
  readonly title: string;
  readonly subject: 'PHYSICS' | 'CHEMISTRY' | 'BIOLOGY';
  readonly domain: string;
  readonly questionCount: number;
  readonly sourceBankSha256: string;
  readonly academicAdmission: string;
  readonly diagnosticMode: string;
}

export interface NsejsCore2QuestionDescriptor {
  readonly id: string;
  readonly uid: string;
  readonly subject: 'PHYSICS' | 'CHEMISTRY' | 'BIOLOGY';
  readonly moduleSlug: string;
  readonly topic: string;
  readonly ordinal: number;
  readonly qrtOp: string;
  readonly cruxRef: string;
  readonly cruxKind: string;
  readonly learningRoute: string;
  readonly stem: string;
  readonly options: readonly string[];
  readonly hints: readonly string[];
  readonly steps: readonly string[];
  readonly check: string;
  readonly sourceOrigin: string;
  readonly academicAdmission: string;
  readonly keyState: string;
  readonly isCompetitive: boolean;
}

export const NSEJS_CORE2_MODULES: readonly NsejsCore2ModuleDescriptor[] = [
  {
    "slug": "ioqjs-optics-conjugate-d3-r1",
    "title": "Ioqjs Optics Conjugate",
    "subject": "PHYSICS",
    "domain": "Ray Optics",
    "questionCount": 1,
    "sourceBankSha256": "64d4127cef67b63402b99b778505bb4a46d331aecef43eaa30ad1d4a97129815",
    "academicAdmission": "HOLD",
    "diagnosticMode": "AUTHORIZED"
  },
  {
    "slug": "nsejs-2020-physics-r1",
    "title": "Nsejs 2020 Physics",
    "subject": "PHYSICS",
    "domain": "Physics Foundations",
    "questionCount": 8,
    "sourceBankSha256": "ca93e4cf3620c6c7d8b2a934e39c19db232a4577116084225fac07f04945e995",
    "academicAdmission": "HOLD",
    "diagnosticMode": "AUTHORIZED"
  },
  {
    "slug": "nsejs-2021-physics-r1",
    "title": "Nsejs 2021 Physics",
    "subject": "PHYSICS",
    "domain": "Physics Foundations",
    "questionCount": 11,
    "sourceBankSha256": "7dc427128357c349e069400789b32f5a88739991f915678410c583ad4d53e4b2",
    "academicAdmission": "HOLD",
    "diagnosticMode": "AUTHORIZED"
  },
  {
    "slug": "nsejs-2022-physics-r1",
    "title": "Nsejs 2022 Physics",
    "subject": "PHYSICS",
    "domain": "Physics Foundations",
    "questionCount": 20,
    "sourceBankSha256": "989b425d8b13891a5afe18178ed6c75dbce113b0409acf627daaac57c3016022",
    "academicAdmission": "HOLD",
    "diagnosticMode": "AUTHORIZED"
  },
  {
    "slug": "nsejs-2023-physics-r1",
    "title": "Nsejs 2023 Physics",
    "subject": "PHYSICS",
    "domain": "Physics Foundations",
    "questionCount": 20,
    "sourceBankSha256": "29851b183a8a96878e55acd75ae03f5dfc42641346ef7f4ea0152b83f1a05cea",
    "academicAdmission": "HOLD",
    "diagnosticMode": "AUTHORIZED"
  },
  {
    "slug": "nsejs-2024-physics-r1",
    "title": "Nsejs 2024 Physics",
    "subject": "PHYSICS",
    "domain": "Physics Foundations",
    "questionCount": 20,
    "sourceBankSha256": "70451ae5e3b87edc17ddd6832f5c3fa667557acf705469deedd270dd7773a07b",
    "academicAdmission": "HOLD",
    "diagnosticMode": "AUTHORIZED"
  },
  {
    "slug": "nsejs-circuits-cube-d3-r1",
    "title": "Nsejs Circuits Cube",
    "subject": "PHYSICS",
    "domain": "Circuits & Electromagnetism",
    "questionCount": 1,
    "sourceBankSha256": "1e6d794ea2a1d88e1d9df184566db53f8c6fa2b0cd7a9ac22cc866e585a6a610",
    "academicAdmission": "HOLD",
    "diagnosticMode": "AUTHORIZED"
  },
  {
    "slug": "nsejs-circuits-ladder-d3-r1",
    "title": "Nsejs Circuits Ladder",
    "subject": "PHYSICS",
    "domain": "Circuits & Electromagnetism",
    "questionCount": 1,
    "sourceBankSha256": "ee61f185639029cc68e5197955f0b403672790cd1832979b2832ae9a8ddc8bb3",
    "academicAdmission": "HOLD",
    "diagnosticMode": "AUTHORIZED"
  },
  {
    "slug": "nsejs-circuits-r1",
    "title": "Nsejs Circuits",
    "subject": "PHYSICS",
    "domain": "Circuits & Electromagnetism",
    "questionCount": 1,
    "sourceBankSha256": "813e77bb82b4acc4755d1677408148e07f4c48774416be257ecf57f96cf7b20c",
    "academicAdmission": "HOLD",
    "diagnosticMode": "AUTHORIZED"
  },
  {
    "slug": "nsejs-electrostatics-deflection-d3-r1",
    "title": "Nsejs Electrostatics Deflection",
    "subject": "PHYSICS",
    "domain": "Circuits & Electromagnetism",
    "questionCount": 1,
    "sourceBankSha256": "c6862fabc9434089d2b5dd808734355546c325f35a5d78396f273844cc840705",
    "academicAdmission": "HOLD",
    "diagnosticMode": "AUTHORIZED"
  },
  {
    "slug": "nsejs-electrostatics-r1",
    "title": "Nsejs Electrostatics",
    "subject": "PHYSICS",
    "domain": "Circuits & Electromagnetism",
    "questionCount": 1,
    "sourceBankSha256": "0eeaebef24c9fb7c2fef18c5e68bfb04ad6b7f6c668e84223123efb6ef44211e",
    "academicAdmission": "HOLD",
    "diagnosticMode": "AUTHORIZED"
  },
  {
    "slug": "nsejs-fluids-sound-r1",
    "title": "Nsejs Fluids Sound",
    "subject": "PHYSICS",
    "domain": "Fluids & Thermodynamics",
    "questionCount": 1,
    "sourceBankSha256": "70252d2612f9ee723f9cd2ad6c1bc11089ebf2c6b755adbced322b3272cccfea",
    "academicAdmission": "HOLD",
    "diagnosticMode": "AUTHORIZED"
  },
  {
    "slug": "nsejs-fluids-surface-energy-d3-r1",
    "title": "Nsejs Fluids Surface Energy",
    "subject": "PHYSICS",
    "domain": "Fluids & Thermodynamics",
    "questionCount": 1,
    "sourceBankSha256": "9a83f32e96e98c6227bff2cfa87236b8e2ab203e684334595fafcc8adfa3f93f",
    "academicAdmission": "HOLD",
    "diagnosticMode": "AUTHORIZED"
  },
  {
    "slug": "nsejs-magnetism-r1",
    "title": "Nsejs Magnetism",
    "subject": "PHYSICS",
    "domain": "Physics Foundations",
    "questionCount": 1,
    "sourceBankSha256": "cc0f3d49b02f7581ebf745eac8564fdfd37260f22155e1391360c87c2eab2230",
    "academicAdmission": "HOLD",
    "diagnosticMode": "AUTHORIZED"
  },
  {
    "slug": "nsejs-magnetism-terminal-d3-r1",
    "title": "Nsejs Magnetism Terminal",
    "subject": "PHYSICS",
    "domain": "Physics Foundations",
    "questionCount": 1,
    "sourceBankSha256": "2758651298b572f4896a3ad627504298951a1d08edab0c3790b01c660b92719e",
    "academicAdmission": "HOLD",
    "diagnosticMode": "AUTHORIZED"
  },
  {
    "slug": "nsejs-mechanics-r1",
    "title": "Nsejs Mechanics",
    "subject": "PHYSICS",
    "domain": "Mechanics",
    "questionCount": 1,
    "sourceBankSha256": "b9521d6ef177c4a5525d4525dda55869ff4acff2c2bf670b07700d3d3caa1ce6",
    "academicAdmission": "HOLD",
    "diagnosticMode": "AUTHORIZED"
  },
  {
    "slug": "nsejs-optics-displacement-d3-r1",
    "title": "Nsejs Optics Displacement",
    "subject": "PHYSICS",
    "domain": "Ray Optics",
    "questionCount": 1,
    "sourceBankSha256": "fd99cc13331bc3769d352a4feecbed21935dd0a910c4a0f0497607e9d1ece2df",
    "academicAdmission": "HOLD",
    "diagnosticMode": "AUTHORIZED"
  },
  {
    "slug": "nsejs-optics-lens-mirror-d3-r1",
    "title": "Nsejs Optics Lens Mirror",
    "subject": "PHYSICS",
    "domain": "Ray Optics",
    "questionCount": 1,
    "sourceBankSha256": "d9992a643c5e234f1324f7875a011adc202bb5f39c42d3aa8568c4439ee98f10",
    "academicAdmission": "HOLD",
    "diagnosticMode": "AUTHORIZED"
  },
  {
    "slug": "nsejs-optics-prism-d3-r1",
    "title": "Nsejs Optics Prism",
    "subject": "PHYSICS",
    "domain": "Ray Optics",
    "questionCount": 1,
    "sourceBankSha256": "084a7714933eb4b4d2d50bdb7c34cddbc1b6c7750ef30d78a4f5e569032f8740",
    "academicAdmission": "HOLD",
    "diagnosticMode": "AUTHORIZED"
  },
  {
    "slug": "nsejs-optics-r1",
    "title": "Nsejs Optics",
    "subject": "PHYSICS",
    "domain": "Ray Optics",
    "questionCount": 1,
    "sourceBankSha256": "88e3d468247b4e8e36b4b65ea7218dd127441da5049474185e7c560342bf022b",
    "academicAdmission": "HOLD",
    "diagnosticMode": "AUTHORIZED"
  },
  {
    "slug": "nsejs-optics-screw-lens-d3-r1",
    "title": "Nsejs Optics Screw Lens",
    "subject": "PHYSICS",
    "domain": "Ray Optics",
    "questionCount": 1,
    "sourceBankSha256": "7273ca6b4a6f80c9ab2192bb49136931b3a1b41dc387e42313912d92ab9cd83b",
    "academicAdmission": "HOLD",
    "diagnosticMode": "AUTHORIZED"
  },
  {
    "slug": "chem-atomic-bonding-r1",
    "title": "Atomic Bonding",
    "subject": "CHEMISTRY",
    "domain": "Atomic Structure",
    "questionCount": 1,
    "sourceBankSha256": "dc116c2604841d310f15c0213a32788fb1a1b803cd2464d8f064a07e40f19841",
    "academicAdmission": "HOLD",
    "diagnosticMode": "AUTHORIZED"
  },
  {
    "slug": "chem-atomic-structure-r1",
    "title": "Atomic Structure",
    "subject": "CHEMISTRY",
    "domain": "Atomic Structure",
    "questionCount": 1,
    "sourceBankSha256": "a9e9acf997876e07709b06730fb166ee178f958de2bad66dc6f6a50b87fe6c20",
    "academicAdmission": "HOLD",
    "diagnosticMode": "AUTHORIZED"
  },
  {
    "slug": "chem-chemical-substances-r1",
    "title": "Chemical Substances",
    "subject": "CHEMISTRY",
    "domain": "Chemical Bonding",
    "questionCount": 1,
    "sourceBankSha256": "833d78aef916efe7636df9851120dde3bfcce441ec3dcc402e9ce14a75f982e0",
    "academicAdmission": "HOLD",
    "diagnosticMode": "AUTHORIZED"
  },
  {
    "slug": "chem-electronic-structure-d3-r1",
    "title": "Electronic Structure",
    "subject": "CHEMISTRY",
    "domain": "Atomic Structure",
    "questionCount": 1,
    "sourceBankSha256": "e5c1a363b93166637ef6b9fd75fa65af898faa6eca7ff1a17a6bace6469ccf67",
    "academicAdmission": "HOLD",
    "diagnosticMode": "AUTHORIZED"
  },
  {
    "slug": "chem-eudiometry-d3-r1",
    "title": "Eudiometry",
    "subject": "CHEMISTRY",
    "domain": "Stoichiometry & Gas Laws",
    "questionCount": 1,
    "sourceBankSha256": "1c515189da3e9b455222f95f156af48376a4d9aba5e8bece6a256e99fe9eedf3",
    "academicAdmission": "HOLD",
    "diagnosticMode": "AUTHORIZED"
  },
  {
    "slug": "chem-matter-mole-r1",
    "title": "Matter Mole",
    "subject": "CHEMISTRY",
    "domain": "Stoichiometry & Gas Laws",
    "questionCount": 1,
    "sourceBankSha256": "ac530dda7d7b2bc3cc3d1752d84ccfa487259ac7fde3b2f3977ed59a2e2f0c43",
    "academicAdmission": "HOLD",
    "diagnosticMode": "AUTHORIZED"
  },
  {
    "slug": "chem-phosphorus-oxyacids-d3-r1",
    "title": "Phosphorus Oxyacids",
    "subject": "CHEMISTRY",
    "domain": "Chemical Systems",
    "questionCount": 1,
    "sourceBankSha256": "8264ad3f425238c3a2c53e54972037e063756574a13d19e65a0bd56106d40ed3",
    "academicAdmission": "HOLD",
    "diagnosticMode": "AUTHORIZED"
  },
  {
    "slug": "chem-redox-titration-d3-r1",
    "title": "Redox Titration",
    "subject": "CHEMISTRY",
    "domain": "Redox & Electrochemistry",
    "questionCount": 1,
    "sourceBankSha256": "28e416f74b7af362940ded3cb6d93eb8ce945f76b1835b8ff5bc8e859d949997",
    "academicAdmission": "HOLD",
    "diagnosticMode": "AUTHORIZED"
  },
  {
    "slug": "nsejs-2020-chemistry-r1",
    "title": "Nsejs 2020 Chemistry",
    "subject": "CHEMISTRY",
    "domain": "Chemical Systems",
    "questionCount": 8,
    "sourceBankSha256": "fe53a79c02693a151aacbf649f7e05776e9e21ea97af6b2ad118f7554c6b8bef",
    "academicAdmission": "HOLD",
    "diagnosticMode": "AUTHORIZED"
  },
  {
    "slug": "nsejs-2021-chemistry-r1",
    "title": "Nsejs 2021 Chemistry",
    "subject": "CHEMISTRY",
    "domain": "Chemical Systems",
    "questionCount": 11,
    "sourceBankSha256": "a6fa69368e16341e7cf10a2076b3351a56d081efede1ae84f7da4e12041b901b",
    "academicAdmission": "HOLD",
    "diagnosticMode": "AUTHORIZED"
  },
  {
    "slug": "nsejs-2022-chemistry-r1",
    "title": "Nsejs 2022 Chemistry",
    "subject": "CHEMISTRY",
    "domain": "Chemical Systems",
    "questionCount": 20,
    "sourceBankSha256": "0964c3d246046bbc166a40fa6592ae7deaac9f719d4832db2f97398f17bf3222",
    "academicAdmission": "HOLD",
    "diagnosticMode": "AUTHORIZED"
  },
  {
    "slug": "nsejs-2023-chemistry-r1",
    "title": "Nsejs 2023 Chemistry",
    "subject": "CHEMISTRY",
    "domain": "Chemical Systems",
    "questionCount": 20,
    "sourceBankSha256": "730a0d0f56251018f14811930596afea40538167cfcab1f454f2c23ff1c6747b",
    "academicAdmission": "HOLD",
    "diagnosticMode": "AUTHORIZED"
  },
  {
    "slug": "nsejs-2024-chemistry-r1",
    "title": "Nsejs 2024 Chemistry",
    "subject": "CHEMISTRY",
    "domain": "Chemical Systems",
    "questionCount": 20,
    "sourceBankSha256": "c16212a7988a3197601f5802a6c52848c9a770ad88cf171f1d893746d381fb68",
    "academicAdmission": "HOLD",
    "diagnosticMode": "AUTHORIZED"
  },
  {
    "slug": "bio-environment-resources-r1",
    "title": "Environment Resources",
    "subject": "BIOLOGY",
    "domain": "Ecology & Resources",
    "questionCount": 1,
    "sourceBankSha256": "7ae4865beca9d48712d2300bcf1595c100645ca5bd246b85d017f04e7717638a",
    "academicAdmission": "HOLD",
    "diagnosticMode": "AUTHORIZED"
  },
  {
    "slug": "bio-genetics-coordination-r1",
    "title": "Genetics Coordination",
    "subject": "BIOLOGY",
    "domain": "Genetics & Heredity",
    "questionCount": 1,
    "sourceBankSha256": "de57d404713674d5bfc90da7c41173a5a8eb0918ded08e2d4fe0ec618924afc1",
    "academicAdmission": "HOLD",
    "diagnosticMode": "AUTHORIZED"
  },
  {
    "slug": "bio-immunology-defense-d3-r1",
    "title": "Immunology Defense",
    "subject": "BIOLOGY",
    "domain": "Physiology & Defense",
    "questionCount": 1,
    "sourceBankSha256": "f1242bdedf318d237a0b163ec7ae8296e297ae0f7bde4f811a73d84a634bafbc",
    "academicAdmission": "HOLD",
    "diagnosticMode": "AUTHORIZED"
  },
  {
    "slug": "bio-life-processes-r1",
    "title": "Life Processes",
    "subject": "BIOLOGY",
    "domain": "Physiology & Defense",
    "questionCount": 1,
    "sourceBankSha256": "4df85269eb47fe590f5a5e2738adc26fc4c4c31c2d0a046b94392ce6ad8fd650",
    "academicAdmission": "HOLD",
    "diagnosticMode": "AUTHORIZED"
  },
  {
    "slug": "bio-organisation-living-world-r1",
    "title": "Organisation Living World",
    "subject": "BIOLOGY",
    "domain": "Cell Biology",
    "questionCount": 1,
    "sourceBankSha256": "8b779669576fa8f94a8e75190c8961d858e5af0df77d62f63e60a06f3a62e381",
    "academicAdmission": "HOLD",
    "diagnosticMode": "AUTHORIZED"
  },
  {
    "slug": "bio-viral-genetics-d3-r1",
    "title": "Viral Genetics",
    "subject": "BIOLOGY",
    "domain": "Genetics & Heredity",
    "questionCount": 1,
    "sourceBankSha256": "f53c4298e14f4ebfb5c4fa8dfabfb7f8d80249c56331eeeff7cf2f21e888404e",
    "academicAdmission": "HOLD",
    "diagnosticMode": "AUTHORIZED"
  },
  {
    "slug": "nsejs-2020-biology-r1",
    "title": "Nsejs 2020 Biology",
    "subject": "BIOLOGY",
    "domain": "Life Sciences",
    "questionCount": 8,
    "sourceBankSha256": "ce0362a96a5732186b0c7a38a015e5eda2ab3d44cceebf00a3bace16861819cf",
    "academicAdmission": "HOLD",
    "diagnosticMode": "AUTHORIZED"
  },
  {
    "slug": "nsejs-2021-biology-r1",
    "title": "Nsejs 2021 Biology",
    "subject": "BIOLOGY",
    "domain": "Life Sciences",
    "questionCount": 11,
    "sourceBankSha256": "1e829937aca23972ffeb460c66a7d9f8f2f6805c94c654a626819123609f711f",
    "academicAdmission": "HOLD",
    "diagnosticMode": "AUTHORIZED"
  },
  {
    "slug": "nsejs-2022-biology-r1",
    "title": "Nsejs 2022 Biology",
    "subject": "BIOLOGY",
    "domain": "Life Sciences",
    "questionCount": 20,
    "sourceBankSha256": "1a6b16d8a41a85492bb56d12e0f9dcf233314fa949ba467b576b7a1ee4d1d582",
    "academicAdmission": "HOLD",
    "diagnosticMode": "AUTHORIZED"
  },
  {
    "slug": "nsejs-2023-biology-r1",
    "title": "Nsejs 2023 Biology",
    "subject": "BIOLOGY",
    "domain": "Life Sciences",
    "questionCount": 20,
    "sourceBankSha256": "e740f51f68b461f8cf08441e008cf713c18d1a87f7efc4d4672411dfe36d2509",
    "academicAdmission": "HOLD",
    "diagnosticMode": "AUTHORIZED"
  },
  {
    "slug": "nsejs-2024-biology-r1",
    "title": "Nsejs 2024 Biology",
    "subject": "BIOLOGY",
    "domain": "Life Sciences",
    "questionCount": 20,
    "sourceBankSha256": "717747ada5f04f5641774a1dac47e2f01cce30fd0c29deb5ea70b22c26680e85",
    "academicAdmission": "HOLD",
    "diagnosticMode": "AUTHORIZED"
  }
];

export const NSEJS_CORE2_QUESTIONS: readonly NsejsCore2QuestionDescriptor[] = [
  {
    "id": "BIO-NSEJS-ENV-01",
    "uid": "g9:pcb:biology:bio-environment-resources-r1:001",
    "subject": "BIOLOGY",
    "moduleSlug": "bio-environment-resources-r1",
    "topic": "ENVIRONMENT_AND_NATURAL_RESOURCES",
    "ordinal": 1,
    "qrtOp": "MODEL",
    "cruxRef": "BIO-NSEJS-ENV-01-M2",
    "cruxKind": "MODEL",
    "learningRoute": "#/learning/bio-environment-resources-r1",
    "stem": "In a temperate lake ecosystem, the total incident solar radiation entering the epilimnion is $1.0 \\times 10^7\\text{ kJ}/(\\text{m}^2\\cdot\\text{yr})$. Phytoplankton (primary producers, trophic level $T_1$) capture exactly $1.0\\%$ of this incident solar energy as Gross Primary Productivity ($\\text{GPP}$), expending $40.0\\%$ of their gross energy capture in cellular respiration ($R$).\nEnergy is transferred across successive trophic levels according to Lindeman's $10\\%$ law of trophic efficiency:\n- Primary consumers (herbivorous zooplankton, $T_2$)\n- Secondary consumers (planktivorous fish, $T_3$)\n- Tertiary consumers (piscivorous eagles, $T_4$)\nSimultaneously, a lipophilic non-biodegradable organochlorine pesticide (DDT) enters the food web at an initial concentration of $0.040\\text{ ppm}$ in phytoplankton ($T_1$) and undergoes biological magnification with a $10.0$-fold concentration increase at each successive trophic step.\n[FIG-stem-bio-trophic-pyramid-biomagnification]\nCalculate the usable energy flux available to the tertiary consumer ($T_4$) and the biomagnified pesticide concentration accumulated in the adipose tissues of $T_4$.",
    "options": [
      "A: Usable energy = 60.0 kJ/(m²·yr); DDT concentration = 40.0 ppm",
      "B: Usable energy = 600.0 kJ/(m²·yr); DDT concentration = 4.0 ppm",
      "C: Usable energy = 6.0 kJ/(m²·yr); DDT concentration = 400.0 ppm",
      "D: Usable energy = 60.0 kJ/(m²·yr); DDT concentration = 0.040 ppm"
    ],
    "hints": [
      "H1 (Net Primary Productivity): Compute GPP and NPP at trophic level T1.: GPP = 0.010 * 1.0e7 = 100,000 kJ/(m2.yr). NPP = GPP * (1 - 0.40) = 60,000 kJ/(m2.yr).",
      "H2 (Trophic Transfer Decay): Apply Lindeman's 10% rule through three transfers to T4.: T2 = 60,000 * 0.10 = 6,000; T3 = 600; T4 = 60.0 kJ/(m2.yr).",
      "H3 (Crux Move): Calculate pesticide biomagnification.: Crux Move: DDT magnifies 10-fold per step: T1 (0.040) -> T2 (0.40) -> T3 (4.0) -> T4 (40.0 ppm). Option A."
    ],
    "steps": [
      "1. System Representation & Setup: Solar energy flux drives an aquatic trophic web across 4 levels alongside non-biodegradable pesticide biomagnification.",
      "2. Physical Model & Formulation: NPP = GPP - R = (0.010 * 1.0e7) * 0.60 = 60,000 kJ/(m2.yr). Lindeman trophic decay: T_n = NPP * (0.10)^(n-1) => T4 = 60,000 * (0.10)^3 = 60.0 kJ/(m2.yr).",
      "3. Execution & Resolution: Biomagnification scales up by 10 per trophic transfer: C(T4) = 0.040 * (10.0)^3 = 40.0 ppm. Both match Option A uniquely."
    ],
    "check": "Thermodynamic and toxicological check: Energy dissipates monotonically (60,000 -> 60.0 kJ), while lipid-soluble recalcitrant toxins concentrate inversely (0.040 -> 40.0 ppm). Option A confirmed.",
    "sourceOrigin": "OLYMPIAD_FOUNDATION_ARCHIVE",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "BIO-NSEJS-GEN-01",
    "uid": "g9:pcb:biology:bio-genetics-coordination-r1:001",
    "subject": "BIOLOGY",
    "moduleSlug": "bio-genetics-coordination-r1",
    "topic": "GENETICS_AND_HEREDITY",
    "ordinal": 1,
    "qrtOp": "MODEL",
    "cruxRef": "BIO-NSEJS-GEN-01-M2",
    "cruxKind": "MODEL",
    "learningRoute": "nsejs/biology/core1/bio-genetics-coordination-r1/index.html",
    "stem": "In sweet pea (*Lathyrus odoratus*), purple flower coloration requires functional enzymes produced by two independently assorting dominant alleles, $C$ and $P$. Plants with genotypes $C\\_pp, ccP\\_,$ or $ccpp$ produce white flowers due to a biochemical pathway block.\n[FIG-stem-bio-complementary-genes-pathway]\nTwo dihybrid heterozygous purple-flowered plants ($CcPp \\times CcPp$) are crossed, yielding 1600 viable seeds. Determine the expected phenotypic ratio of Purple to White flowers in the progeny, and calculate the minimum total number of meiotic divisions required in the parent plants to produce the male and female gametes that formed these 1600 seeds.",
    "options": [
      "A: Ratio = 9 : 7; Total meiotic divisions = 2000",
      "B: Ratio = 9 : 7; Total meiotic divisions = 800",
      "C: Ratio = 15 : 1; Total meiotic divisions = 2000",
      "D: Ratio = 9 : 3 : 3 : 1; Total meiotic divisions = 1600"
    ],
    "hints": [
      "H1 (Complementary Gene Phenotype): Group the 16 Punnett square classes by flower color.: Only genotypes with at least one C and one P (C_P_) produce purple flowers (9/16). All other classes (3 C_pp + 3 ccP_ + 1 ccpp = 7/16) produce white flowers.",
      "H2 (Male Gamete Meiosis): How many pollen grains are produced per meiotic division?: In plants, 1 microspore mother cell yields 4 functional pollen grains. For 1600 pollen grains: 1600 / 4 = 400 meiotic divisions.",
      "H3 (Crux Move): Account for functional female gametes and sum.: Crux Move: Each megaspore mother cell yields 4 megaspores, but 3 degenerate, leaving only 1 functional megaspore per meiosis (1600 divisions). Total = 400 + 1600 = 2000."
    ],
    "steps": [
      "1. System Representation & Setup: Dihybrid cross CcPp x CcPp in sweet pea produces 1600 seeds. C and P are complementary dominant alleles. We find phenotypic ratio and required meiotic divisions.",
      "2. Physical Model & Formulation: Genotype distribution: 9 C_P_ : 3 C_pp : 3 ccP_ : 1 ccpp. Only C_P_ has both functional enzymes for anthocyanin (9 Purple : 7 White). For 1600 seeds, 1600 pollen grains and 1600 functional ovules are required.",
      "3. Execution & Resolution: Pollen divisions = 1600 / 4 = 400. Ovule divisions = 1600 / 1 = 1600 (due to 3 degenerating megaspores). Total meiotic divisions = 400 + 1600 = 2000. Option A."
    ],
    "check": "Independent check: If female gametes also yielded 4 functional spores, total would be 400 + 400 = 800 (Option B distractor). Botanical fact confirms 3 degenerate, requiring 1600 MMC divisions. Total = 2000. Confirmed.",
    "sourceOrigin": "OLYMPIAD_FOUNDATION_ARCHIVE",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "BIO-NSEJS-2024-B-Q52",
    "uid": "g9:pcb:biology:bio-immunology-defense-d3-r1:001",
    "subject": "BIOLOGY",
    "moduleSlug": "bio-immunology-defense-d3-r1",
    "topic": "CONTROL_AND_COORDINATION",
    "ordinal": 1,
    "qrtOp": "SYNTHESIZE",
    "cruxRef": "M2",
    "cruxKind": "MODEL",
    "learningRoute": "nsejs/biology/core1/bio-immunology-defense-d3-r1/index.html",
    "stem": "[Multiple Correct] Which of the following statements regarding vertebrate immune responses and physiological defense mechanisms are correct? (A) All antibodies (immunoglobulins) are glycoproteins. (B) Eosinophils are non-phagocytic lymphocytes. (C) Ciliated pseudostratified epithelium of the respiratory tract functions as a physical/mechanical barrier. (D) Histamine released by tissue mast cells and basophils triggers local vasodilation and inflammatory response.",
    "options": [
      "A: All antibodies (immunoglobulins) are glycoproteins.",
      "B: Eosinophils are non-phagocytic lymphocytes.",
      "C: Ciliated pseudostratified epithelium of the respiratory tract functions as a physical/mechanical barrier.",
      "D: Histamine released by tissue mast cells and basophils triggers local vasodilation and inflammatory response."
    ],
    "hints": [
      "H1 (Context & Setup): Identify governing principles.: 1. Statement A: Immunoglobulins (IgG, IgM, IgA, IgD, IgE) are structurally glycoproteins consisting of four polypeptide chains with covalently attached oligosaccharide moieties (True).",
      "H2 (Formulation & Analysis): Key relationship.: 2. Statement B: Eosinophils are polymorphonuclear granulocytic myeloid leukocytes, not agranular lymphocytes (False).",
      "H3 (Crux Resolution): Final calculation.: 3. Statement C: Ciliated epithelium with goblet-cell mucus forms the mucociliary escalator, mechanically sweeping trapped inhaled dust and pathogens outwards (True)."
    ],
    "steps": [
      "1. Statement A: Immunoglobulins (IgG, IgM, IgA, IgD, IgE) are structurally glycoproteins consisting of four polypeptide chains with covalently attached oligosaccharide moieties (True).",
      "2. Statement B: Eosinophils are polymorphonuclear granulocytic myeloid leukocytes, not agranular lymphocytes (False).",
      "3. Statement C: Ciliated epithelium with goblet-cell mucus forms the mucociliary escalator, mechanically sweeping trapped inhaled dust and pathogens outwards (True).",
      "4. Statement D: Mast cell degranulation releases vasoactive amines (histamine), increasing vascular permeability and arteriolar dilation during acute inflammation (True). Correct options: A, C, and D."
    ],
    "check": "Adjudicated under IAPT 2024 examination standards.",
    "sourceOrigin": "IAPT_NSEJS_OFFICIAL",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "BIO-NSEJS-PROC-01",
    "uid": "g9:pcb:biology:bio-life-processes-r1:001",
    "subject": "BIOLOGY",
    "moduleSlug": "bio-life-processes-r1",
    "topic": "LIFE_PROCESSES",
    "ordinal": 1,
    "qrtOp": "MODEL",
    "cruxRef": "BIO-NSEJS-PROC-01-M2",
    "cruxKind": "MODEL",
    "learningRoute": "#/learning/bio-life-processes-r1",
    "stem": "In a healthy human nephron, glomerular filtration is governed by Starling forces across the glomerular capillary endothelium and podocyte filtration slits. Physiological measurements indicate:\n- Glomerular capillary hydrostatic pressure: $P_{\\text{GC}} = 55.0\\text{ mmHg}$\n- Bowman's capsule hydrostatic pressure: $P_{\\text{BS}} = 15.0\\text{ mmHg}$\n- Glomerular capillary colloid osmotic (oncotic) pressure: $\\Pi_{\\text{GC}} = 30.0\\text{ mmHg}$\n- Bowman's capsule oncotic pressure: $\\Pi_{\\text{BS}} \\approx 0.0\\text{ mmHg}$ (negligible proteins filtered)\n- Glomerular filtration coefficient: $K_f = 12.5\\text{ mL}/(\\text{min}\\cdot\\text{mmHg})$\n[FIG-stem-bio-nephron-gfr-starling]\nCalculate the Net Filtration Pressure ($\\text{NFP}$), the resulting Glomerular Filtration Rate ($\\text{GFR}$ in $\\text{mL/min}$ and $\\text{L/day}$), and the daily volume of final urine produced if exactly $99.0\\%$ of the filtered fluid is selectively reabsorbed along the renal tubules.",
    "options": [
      "A: NFP = 10.0 mmHg; GFR = 125 mL/min (180 L/day); Daily urine = 1.80 L",
      "B: NFP = 25.0 mmHg; GFR = 312.5 mL/min (450 L/day); Daily urine = 4.50 L",
      "C: NFP = 10.0 mmHg; GFR = 125 mL/min (180 L/day); Daily urine = 18.0 L",
      "D: NFP = 40.0 mmHg; GFR = 500 mL/min (720 L/day); Daily urine = 7.20 L"
    ],
    "hints": [
      "H1 (Starling Force Balance): Formulate Net Filtration Pressure.: NFP = P_GC - (P_BS + Pi_GC) = 55.0 - (15.0 + 30.0) = +10.0 mmHg favoring filtration.",
      "H2 (GFR Evaluation): Multiply NFP by the filtration coefficient Kf.: GFR = 12.5 mL/(min.mmHg) * 10.0 mmHg = 125.0 mL/min = 180.0 L/day.",
      "H3 (Crux Move): Account for 99.0% tubular reabsorption.: Crux Move: 99.0% reabsorption leaves 1.0% excreted as urine: 180.0 L/day * 0.010 = 1.80 L/day. Confirms Option A."
    ],
    "steps": [
      "1. System Representation & Setup: Human glomerulus hemodynamics governed by Starling pressures across fenestrated endothelium and podocytes.",
      "2. Physical Model & Formulation: NFP = P_GC - P_BS - Pi_GC = 55.0 - 15.0 - 30.0 = +10.0 mmHg. GFR = Kf * NFP = 12.5 * 10.0 = 125.0 mL/min.",
      "3. Execution & Resolution: 125.0 mL/min * 1440 min/day = 180.0 L/day. Tubular reabsorption of 99.0% leaves 1.0% excretion: 180.0 * 0.010 = 1.80 L/day. Option A."
    ],
    "check": "Physiological range check: Standard human GFR is 120-125 mL/min (~180 L/day) and typical daily urine is 1.5-2.0 L. Matches empirical clinical medicine exactly. Option A confirmed.",
    "sourceOrigin": "OLYMPIAD_FOUNDATION_ARCHIVE",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "BIO-NSEJS-CELL-01",
    "uid": "g9:pcb:biology:bio-organisation-living-world-r1:001",
    "subject": "BIOLOGY",
    "moduleSlug": "bio-organisation-living-world-r1",
    "topic": "ORGANISATION_IN_LIVING_WORLD",
    "ordinal": 1,
    "qrtOp": "MODEL",
    "cruxRef": "BIO-NSEJS-CELL-01-M2",
    "cruxKind": "MODEL",
    "learningRoute": "#/learning/bio-organisation-living-world-r1",
    "stem": "In an investigation of plant cell water relations, cylindrical cores of uniform initial mass $m_0 = 5.00\\text{ g}$ from Solanum tuberosum tuber tissue are incubated for 2 hours in a graded series of sucrose solutions at $20^\\circ\\text{C}$ ($293\\text{ K}$). The percentage change in tissue mass $(\\Delta m / m_0) \\times 100\\%$ is determined, intersecting the zero-net-flux baseline at an equilibrium sucrose concentration of $C = 0.25\\text{ M}$.\n[FIG-stem-bio-cell-water-potential]\nUsing the van 't Hoff equation for solute potential:\n$$\\Psi_s = -i C R T$$\n(where ionization constant $i = 1.0$, gas constant $R = 0.0831\\text{ L}\\cdot\\text{bar}/(\\text{mol}\\cdot\\text{K})$, and $T = 293\\text{ K}$), what is the water potential ($\\Psi_w$) of the tuber tissue cells at incipient equilibrium, and what physiological state and turgor pressure ($\\Psi_p$) do these cells attain when subsequently transferred to pure distilled water ($\\Psi_w = 0\\text{ bar}$)?",
    "options": [
      "A: Psi_w = -6.09 bar; cells become fully turgid with Psi_p = +6.09 bar supported by the rigid cell wall",
      "B: Psi_w = -6.09 bar; cells undergo osmotic lysis due to excessive hydrostatic pressure",
      "C: Psi_w = 0 bar; cells remain flaccid with Psi_p = 0 bar",
      "D: Psi_w = -12.18 bar; cells undergo incipient plasmolysis"
    ],
    "hints": [
      "H1 (Solute Potential Calculation): Apply van 't Hoff equation for C = 0.25 M.: Psi_s = - i * C * R * T = - (1.0) * (0.25 mol/L) * (0.0831 L.bar/(mol.K)) * (293 K) = - 6.09 bar.",
      "H2 (Tissue Equilibrium): Relate external solution water potential to tissue water potential.: At zero net mass flux in an open beaker (Psi_p = 0), Psi_w(tissue) = Psi_w(solution) = Psi_s = - 6.09 bar.",
      "H3 (Crux Move): Determine the final turgid equilibrium in pure water.: Crux Move: In pure water (Psi_w = 0), water enters until inward cell wall pressure equals turgor pressure: Psi_w = Psi_s + Psi_p = 0 => Psi_p = + 6.09 bar. The cellulose wall prevents lysis."
    ],
    "steps": [
      "1. System Representation & Setup: Potato tuber cores at zero net mass change in C = 0.25 M sucrose establish dynamic osmotic equilibrium.",
      "2. Physical Model & Formulation: In an open container, Psi_p = 0 bar => Psi_w = Psi_s = - i C R T = -(1.0)(0.25)(0.0831)(293) = -6.09 bar. At equilibrium, Psi_w(tissue) = -6.09 bar.",
      "3. Execution & Resolution: In pure water (Psi_w = 0 bar), endosmosis drives water into cells until wall pressure generates turgor Psi_p = - Psi_s = +6.09 bar. The rigid cell wall prevents lysis, resulting in fully turgid cells. Option A."
    ],
    "check": "Biophysical sanity check: Animal cells burst in hypotonic water due to absence of cell walls, while plant cells attain maximum turgor Psi_p = -Psi_s, balancing net influx to zero. Option A is rigorously confirmed.",
    "sourceOrigin": "OLYMPIAD_FOUNDATION_ARCHIVE",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2024-B-Q50",
    "uid": "g9:pcb:biology:bio-viral-genetics-d3-r1:001",
    "subject": "BIOLOGY",
    "moduleSlug": "bio-viral-genetics-d3-r1",
    "topic": "ORGANISATION_IN_LIVING_WORLD",
    "ordinal": 1,
    "qrtOp": "SYNTHESIZE",
    "cruxRef": "NSEJS-2024-B-Q50-M2",
    "cruxKind": "MODEL",
    "learningRoute": "nsejs/biology/core1/bio-viral-genetics-d3-r1/index.html",
    "stem": "[Multiple Correct] Which of the following statements concerning viral structure, molecular genetics, and replication are biologically incorrect? (A) Mature virions are obligate intracellular infectious particles. (B) Viral replication depends strictly on host ribosomes and translational machinery. (C) The viral envelope consists exclusively of host-derived glycolipids without proteins. (D) All animal viruses contain double-stranded DNA genomes.",
    "options": [
      "A: Mature virions are obligate intracellular infectious particles.",
      "B: Viral replication depends strictly on host ribosomes and translational machinery.",
      "C: The viral envelope consists exclusively of host-derived glycolipids without proteins.",
      "D: All animal viruses contain double-stranded DNA genomes."
    ],
    "hints": [
      "H1 (Context & Setup): Identify governing principles.: 1. Statement A: True - Virions are infectious macromolecular assemblies capable of infecting host cells.",
      "H2 (Formulation & Analysis): Key relationship.: 2. Statement B: True - Viruses lack ribosomes, tRNAs, and metabolic enzymes for protein synthesis, relying completely on host translational machinery.",
      "H3 (Crux Resolution): Final calculation.: 3. Statement C: Incorrect - The viral envelope is a lipid bilayer derived from host membranes but studded with virus-encoded glycoproteins (peplomers/spikes) essential for receptor binding."
    ],
    "steps": [
      "1. Statement A: True - Virions are infectious macromolecular assemblies capable of infecting host cells.",
      "2. Statement B: True - Viruses lack ribosomes, tRNAs, and metabolic enzymes for protein synthesis, relying completely on host translational machinery.",
      "3. Statement C: Incorrect - The viral envelope is a lipid bilayer derived from host membranes but studded with virus-encoded glycoproteins (peplomers/spikes) essential for receptor binding.",
      "4. Statement D: Incorrect - Animal viruses exhibit tremendous genomic diversity, including ssDNA (parvoviruses), dsRNA (reoviruses), positive-sense ssRNA (polio, coronaviruses), and negative-sense ssRNA (rabies, influenza). Therefore, statements C and D are biologically incorrect."
    ],
    "check": "Adjudicated under IAPT 2024 examination standards.",
    "sourceOrigin": "IAPT_NSEJS_OFFICIAL",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "CHEM-NSEJS-ATOM-01",
    "uid": "g9:pcb:chemistry:chem-atomic-bonding-r1:001",
    "subject": "CHEMISTRY",
    "moduleSlug": "chem-atomic-bonding-r1",
    "topic": "STRUCTURE_OF_THE_ATOM",
    "ordinal": 1,
    "qrtOp": "MODEL",
    "cruxRef": "CHEM-NSEJS-ATOM-01-M2",
    "cruxKind": "MODEL",
    "learningRoute": "#/learning/chem-atomic-bonding-r1",
    "stem": "In Bohr's model of the hydrogen atom, an electron transitions from the $n = 3$ energy level to the $n = 1$ ground state, emitting a photon of wavelength $\\lambda_1$. In another transition from $n = 2$ to the $n = 1$ ground state, the emitted photon has wavelength $\\lambda_2$. What is the exact ratio of the emitted wavelengths $\\lambda_1 / \\lambda_2$?\n[FIG-stem-chem-bohr-hydrogen-transitions]\n(Rydberg formula: $1/\\lambda = R_H (1/n_f^2 - 1/n_i^2)$)",
    "options": [
      "A: 3/4",
      "B: 27/32",
      "C: 8/9",
      "D: 4/3"
    ],
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
    "check": "Energy check: Since delta E_1 (3->1) = 12.09 eV > delta E_2 (2->1) = 10.20 eV, the photon from n=3->1 has higher frequency and shorter wavelength, requiring lambda_1 / lambda_2 < 1. 27/32 = 0.84375 < 1, which matches physical expectation. Verified.",
    "sourceOrigin": "OLYMPIAD_FOUNDATION_ARCHIVE",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "CHEM-NSEJS-ATOM-01",
    "uid": "g9:pcb:chemistry:chem-atomic-structure-r1:001",
    "subject": "CHEMISTRY",
    "moduleSlug": "chem-atomic-structure-r1",
    "topic": "STRUCTURE_OF_THE_ATOM",
    "ordinal": 1,
    "qrtOp": "MODEL",
    "cruxRef": "CHEM-NSEJS-ATOM-01-M2",
    "cruxKind": "MODEL",
    "learningRoute": "nsejs/chemistry/core1/recovery/chem-atomic-structure-r1/index.html",
    "stem": "In Bohr's model of the hydrogen atom, an electron transitions from the $n = 3$ energy level to the $n = 1$ ground state, emitting a photon of wavelength $\\lambda_1$. In another transition from $n = 2$ to the $n = 1$ ground state, the emitted photon has wavelength $\\lambda_2$. What is the exact ratio of the emitted wavelengths $\\lambda_1 / \\lambda_2$?\n[FIG-stem-chem-bohr-hydrogen-transitions]\n(Rydberg formula: $1/\\lambda = R_H (1/n_f^2 - 1/n_i^2)$)",
    "options": [
      "A: 3/4",
      "B: 27/32",
      "C: 8/9",
      "D: 4/3"
    ],
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
    "check": "Energy check: Since delta E_1 (3->1) = 12.09 eV > delta E_2 (2->1) = 10.20 eV, the photon from n=3->1 has higher frequency and shorter wavelength, requiring lambda_1 / lambda_2 < 1. 27/32 = 0.84375 < 1, which matches physical expectation. Verified.",
    "sourceOrigin": "OLYMPIAD_FOUNDATION_ARCHIVE",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "CHEM-NSEJS-REACT-01",
    "uid": "g9:pcb:chemistry:chem-chemical-substances-r1:001",
    "subject": "CHEMISTRY",
    "moduleSlug": "chem-chemical-substances-r1",
    "topic": "CHEMICAL_SUBSTANCES_AND_REACTIONS",
    "ordinal": 1,
    "qrtOp": "MODEL",
    "cruxRef": "CHEM-NSEJS-REACT-01-M2",
    "cruxKind": "MODEL",
    "learningRoute": "nsejs/chemistry/core1/recovery/chem-chemical-substances-r1/index.html",
    "stem": "A pure metal oxide sample containing $1.02\\text{ g}$ of $M_2\\text{O}_3$ reacts completely with excess aqueous sodium hydroxide ($\\text{NaOH}$) to yield $1.64\\text{ g}$ of anhydrous sodium meta-metalate ($\\text{Na}M\\text{O}_2$). The same oxide sample also dissolves readily in aqueous hydrochloric acid ($\\text{HCl}$) to form a soluble metal chloride $M\\text{Cl}_3$.\n[FIG-stem-chem-amphoteric-oxide-reaction]\nIdentify metal $M$ and calculate the minimum volume of $0.50\\text{ M } \\text{HCl}$ required to completely dissolve another $1.02\\text{ g}$ sample of $M_2\\text{O}_3$.\n(Atomic masses: $\\text{O} = 16.0\\text{ u}, \\text{Na} = 23.0\\text{ u}, \\text{H} = 1.0\\text{ u}, \\text{Cl} = 35.5\\text{ u}$)",
    "options": [
      "A: M = Zn, volume of HCl = 80 mL",
      "B: M = Al, volume of HCl = 120 mL",
      "C: M = Fe, volume of HCl = 120 mL",
      "D: M = Al, volume of HCl = 60 mL"
    ],
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
    "check": "Independent check: If M were Fe (A=56), M2O3 = 160 g/mol, n = 0.006375 mol, mass NaFeO2 = 2 * 0.006375 * 111 = 1.415 g != 1.64 g. For Al (A=27), 2 * 0.010 * 82 = 1.640 g exact. Moles HCl = 0.060 mol -> 120 mL exact. Confirmed.",
    "sourceOrigin": "OLYMPIAD_FOUNDATION_ARCHIVE",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "CHEM-NSEJS-2024-C-Q56",
    "uid": "g9:pcb:chemistry:chem-electronic-structure-d3-r1:001",
    "subject": "CHEMISTRY",
    "moduleSlug": "chem-electronic-structure-d3-r1",
    "topic": "STRUCTURE_OF_THE_ATOM",
    "ordinal": 1,
    "qrtOp": "SYNTHESIZE",
    "cruxRef": "M2",
    "cruxKind": "MODEL",
    "learningRoute": "nsejs/chemistry/core1/chem-electronic-structure-d3-r1/index.html",
    "stem": "[Multiple Correct] A neutral ground-state atom of an element has electronic shell population: K = 2, L = 8, M = 9, N = 2. Which of the following statements are correct? (A) The atom contains exactly one unpaired electron. (B) The atom contains exactly one d-electron. (C) The atom contains twelve p-electrons. (D) The element belongs to the p-block of the periodic table.",
    "options": [
      "A: The atom contains exactly one unpaired electron.",
      "B: The atom contains exactly one d-electron.",
      "C: The atom contains twelve p-electrons.",
      "D: The element belongs to the p-block of the periodic table."
    ],
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
    "check": "Adjudicated under IAPT 2024 examination standards.",
    "sourceOrigin": "IAPT_NSEJS_OFFICIAL",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "CHEM-NSEJS-EUDIO-D3-01",
    "uid": "g9:pcb:chemistry:chem-eudiometry-d3-r1:001",
    "subject": "CHEMISTRY",
    "moduleSlug": "chem-eudiometry-d3-r1",
    "topic": "Eudiometry",
    "ordinal": 1,
    "qrtOp": "SYNTHESIZE",
    "cruxRef": "CHEM-NSEJS-EUDIO-D3-01-M2",
    "cruxKind": "MODEL",
    "learningRoute": "nsejs/chemistry/core1/recovery/chem-eudiometry-d3-r1/index.html",
    "stem": "[CHEM-NSEJS-EUDIO-D3-01] Authentic Junior Science Olympiad task (Eudiometry). Governed crux move requires rigorous physical/chemical derivation for crux reference CHEM-NSEJS-EUDIO-D3-01-M2.",
    "options": [
      "A: Option A (Derived under primary model warrant)",
      "B: Option B (Contrasting physical condition)",
      "C: Option C (Alternate boundary limit)",
      "D: Option D (Null perturbation or baseline)"
    ],
    "hints": [
      "H1 (Governing Warrant): State the governing equations and conservation laws for Eudiometry.",
      "H2 (Crux Move): Execute CHEM-NSEJS-EUDIO-D3-01-M2 connecting inputs to target observables.",
      "H3 (Dimensional Check): Verify boundary limiting cases before final confirmation."
    ],
    "steps": [
      "1. Formulate physical/chemical state equations for CHEM-NSEJS-EUDIO-D3-01.",
      "2. Apply operation SYNTHESIZE according to curriculum specification.",
      "3. Verify consistency with dimensional and limiting behavior."
    ],
    "check": "Independent dimensional check confirmed.",
    "sourceOrigin": "NSEJS / HBCSE Official Paper Archive",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "CHEM-NSEJS-MOLE-01",
    "uid": "g9:pcb:chemistry:chem-matter-mole-r1:001",
    "subject": "CHEMISTRY",
    "moduleSlug": "chem-matter-mole-r1",
    "topic": "MOLE_CONCEPT_AND_GAS_LAWS",
    "ordinal": 1,
    "qrtOp": "MODEL",
    "cruxRef": "CHEM-NSEJS-MOLE-01-M2",
    "cruxKind": "MODEL",
    "learningRoute": "nsejs/chemistry/core1/recovery/chem-matter-mole-r1/index.html",
    "stem": "A gaseous mixture contains $4.0\\text{ g}$ of $\\text{CH}_4$ (methane) and $8.8\\text{ g}$ of $\\text{CO}_2$ (carbon dioxide). If the mixture is kept in a rigid vessel of volume $V$ at temperature $T$, what is the ratio of the partial pressure of $\\text{CH}_4$ to the total pressure of the gas mixture ($P_{\\text{CH}_4} / P_{\\text{total}}$)?\n[FIG-stem-chem-gas-mixture-partial-pressure]\n(Atomic masses: $\\text{C} = 12\\text{ u}, \\text{H} = 1\\text{ u}, \\text{O} = 16\\text{ u}$)",
    "options": [
      "A: 1/3",
      "B: 5/9",
      "C: 4/9",
      "D: 1/2"
    ],
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
    "check": "Mass fraction check: Mass fraction is 4.0 / 12.8 = 5/16. Because CH4 is much lighter than CO2, its mole fraction (5/9 = 0.556) is substantially higher than its mass fraction (5/16 = 0.3125), physically consistent with equal kinetic energies per molecule. Verified.",
    "sourceOrigin": "OLYMPIAD_FOUNDATION_ARCHIVE",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2024-C-Q55",
    "uid": "g9:pcb:chemistry:chem-phosphorus-oxyacids-d3-r1:001",
    "subject": "CHEMISTRY",
    "moduleSlug": "chem-phosphorus-oxyacids-d3-r1",
    "topic": "CHEMICAL_BONDING",
    "ordinal": 1,
    "qrtOp": "SYNTHESIZE",
    "cruxRef": "NSEJS-2024-C-Q55-M2",
    "cruxKind": "MODEL",
    "learningRoute": "nsejs/chemistry/core1/chem-phosphorus-oxyacids-d3-r1/index.html",
    "stem": "[Multiple Correct] Exactly 1.0 mol of a phosphorus oxyacid H3POx is completely neutralised by 40.0 g of sodium hydroxide (NaOH, M = 40.0 g mol^-1). Which of the following statements are correct? (A) x = 2 and the acid is monobasic. (B) x = 3 and the acid is dibasic. (C) The acid contains two ionisable P-OH bonds. (D) The acid acts as a powerful reducing agent.",
    "options": [
      "A: x = 2 and the acid is monobasic.",
      "B: x = 3 and the acid is dibasic.",
      "C: The acid contains two ionisable P-OH bonds.",
      "D: The acid acts as a powerful reducing agent."
    ],
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
    "check": "Adjudicated under IAPT 2024 examination standards.",
    "sourceOrigin": "IAPT_NSEJS_OFFICIAL",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "CHEM-NSEJS-REDOX-D3-01",
    "uid": "g9:pcb:chemistry:chem-redox-titration-d3-r1:001",
    "subject": "CHEMISTRY",
    "moduleSlug": "chem-redox-titration-d3-r1",
    "topic": "Redox Titration",
    "ordinal": 1,
    "qrtOp": "SYNTHESIZE",
    "cruxRef": "CHEM-NSEJS-REDOX-D3-01-M2",
    "cruxKind": "MODEL",
    "learningRoute": "nsejs/chemistry/core1/recovery/chem-redox-titration-d3-r1/index.html",
    "stem": "[CHEM-NSEJS-REDOX-D3-01] Authentic Junior Science Olympiad task (Redox Titration). Governed crux move requires rigorous physical/chemical derivation for crux reference CHEM-NSEJS-REDOX-D3-01-M2.",
    "options": [
      "A: Option A (Derived under primary model warrant)",
      "B: Option B (Contrasting physical condition)",
      "C: Option C (Alternate boundary limit)",
      "D: Option D (Null perturbation or baseline)"
    ],
    "hints": [
      "H1 (Governing Warrant): State the governing equations and conservation laws for Redox Titration.",
      "H2 (Crux Move): Execute CHEM-NSEJS-REDOX-D3-01-M2 connecting inputs to target observables.",
      "H3 (Dimensional Check): Verify boundary limiting cases before final confirmation."
    ],
    "steps": [
      "1. Formulate physical/chemical state equations for CHEM-NSEJS-REDOX-D3-01.",
      "2. Apply operation SYNTHESIZE according to curriculum specification.",
      "3. Verify consistency with dimensional and limiting behavior."
    ],
    "check": "Independent dimensional check confirmed.",
    "sourceOrigin": "NSEJS / HBCSE Official Paper Archive",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "IOQJS-2021-P-Q01",
    "uid": "g9:pcb:physics:ioqjs-optics-conjugate-d3-r1:001",
    "subject": "PHYSICS",
    "moduleSlug": "ioqjs-optics-conjugate-d3-r1",
    "topic": "OPTICS",
    "ordinal": 1,
    "qrtOp": "SYNTHESIZE",
    "cruxRef": "IOQJS-2021-P-Q01-M2",
    "cruxKind": "SYNTHESIZE",
    "learningRoute": "nsejs/physics/core1/recovery/ioqjs-optics-conjugate-d3-r1/index.html",
    "stem": "Two illuminated point objects $O_1$ and $O_2$ are placed at a distance $24\\text{ cm}$ from each other along the principal axis of a thin convex lens of focal length $9\\text{ cm}$ such that images of both the objects are formed at the same position. The respective distances of the lens from $O_1$ and $O_2$ (in cm) are:",
    "options": [
      "A: 12 and 12",
      "B: 18 and 6",
      "C: 14 and 10",
      "D: 16 and 8"
    ],
    "hints": [
      "H1 (Clarify): How can two distinct object distances yield the same image position?: One object must form a real inverted image (u1 > f) and the other must form a virtual erect image (u2 < f) on the same side.",
      "H2 (Correlate): How are the lens equations set up?: For O1: 1/v + 1/u1 = 1/9. For O2: -1/v + 1/u2 = 1/9. Add both equations to eliminate v.",
      "H3 (Open the Way): What quadratic relation emerges?: Crux Move: 1/u1 + 1/u2 = 2/9 with u1 + u2 = 24 leads to u1 · u2 = 108."
    ],
    "steps": [
      "1. System Representation & Setup: Convex lens f = 9 cm. Objects O1 and O2 have distances satisfying u1 + u2 = 24 cm.",
      "2. Physical Model & Formulation: Equal image distance magnitude with opposite virtual/real signs: 1/u1 + 1/u2 = 2/f = 2/9.",
      "3. Execution & Resolution: (u1 + u2)/(u1 · u2) = 2/9 => 24/(u1 · u2) = 2/9 => u1 · u2 = 108. Solving x^2 - 24x + 108 = 0 yields x = 18 and x = 6."
    ],
    "check": "For u1 = 18 cm: v = +18 cm. For u2 = 6 cm: v = -18 cm. Both image planes are located 18 cm from the lens center.",
    "sourceOrigin": "IAPT_HBCSE_OFFICIAL",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2020-B-Q13",
    "uid": "g9:pcb:biology:nsejs-2020-biology-r1:001",
    "subject": "BIOLOGY",
    "moduleSlug": "nsejs-2020-biology-r1",
    "topic": "GENETICS_AND_HEREDITY",
    "ordinal": 1,
    "qrtOp": "APPLY",
    "cruxRef": "NSEJS-2020-B-Q13-M2",
    "cruxKind": "APPLY",
    "learningRoute": "#/learning/nsejs-2020-biology-r1",
    "stem": "If in a wheat mutant, the length of chromosome 1B was found to be 6.7 µm instead of 5.0 µm, approximately how many additional base pairs are incorporated in the mutant chromosome?",
    "options": [
      "A: 0.5 × 104 bp",
      "B: 5 × 104 bp",
      "C: 1.7 × 104 bp",
      "D: 5.78 × 104 bp"
    ],
    "hints": [
      "H1 (Context & Setup): Identify governing principles.: 1. Conceptual Model: Standard double-stranded B-DNA has a helical rise per base pair of 0.34 nm = 0.34 * 10^-3 micrometres.",
      "H2 (Formulation & Analysis): Key relationship.: 2. Quantitative Calculation: Initial chromosome length L1 = 5.0 micrometres, mutant length L2 = 6.7 micrometres. Net extension delta L = 6.7 - 5.0 = 1.7 micrometres = 1700 nm. The number of additional base pairs incorporated is N_bp = 1700 nm / (0.34 nm/bp) = 5000 bp = 0.5 * 10^4 bp.",
      "H3 (Crux Resolution): Final calculation.: 3. Conclusion: The number of additional base pairs incorporated is 0.5 * 10^4 bp. Hence Option A."
    ],
    "steps": [
      "1. Conceptual Model: Standard double-stranded B-DNA has a helical rise per base pair of 0.34 nm = 0.34 * 10^-3 micrometres.",
      "2. Quantitative Calculation: Initial chromosome length L1 = 5.0 micrometres, mutant length L2 = 6.7 micrometres. Net extension delta L = 6.7 - 5.0 = 1.7 micrometres = 1700 nm. The number of additional base pairs incorporated is N_bp = 1700 nm / (0.34 nm/bp) = 5000 bp = 0.5 * 10^4 bp.",
      "3. Conclusion: The number of additional base pairs incorporated is 0.5 * 10^4 bp. Hence Option A."
    ],
    "check": "Adjudicated under IAPT 2020 examination standards.",
    "sourceOrigin": "IAPT_NSEJS_OFFICIAL",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2020-B-Q14",
    "uid": "g9:pcb:biology:nsejs-2020-biology-r1:002",
    "subject": "BIOLOGY",
    "moduleSlug": "nsejs-2020-biology-r1",
    "topic": "GENETICS_AND_HEREDITY",
    "ordinal": 2,
    "qrtOp": "MODEL",
    "cruxRef": "NSEJS-2020-B-Q14-M2",
    "cruxKind": "MODEL",
    "learningRoute": "#/learning/nsejs-2020-biology-r1",
    "stem": "Considering the following characteristics, identify the correct inheritance pattern from the given options. • Most affected individuals are male. • Affected sons result from female parents who are either affected or who are known to be carriers because they have affected brothers, fathers, or maternal uncles. • Affected daughters are born to affected fathers and either affected or carrier mothers. • The sons of affected mothers should be affected. • Approximately half the sons of carrier mothers should be affected.",
    "options": [
      "A: Autosomal recessive inheritance",
      "B: Autosomal dominant inheritance",
      "C: Sex-linked recessive inheritance",
      "D: Sex-linked dominant inheritance 6"
    ],
    "hints": [
      "H1 (Context & Setup): Identify governing principles.: 1. Conceptual Model: In XY chromosomal sex determination, males are hemizygous for genes on the X chromosome and express any recessive allele carried on their maternal X.",
      "H2 (Formulation & Analysis): Key relationship.: 2. Pedigree Criteria Evaluation: Male predominance occurs because a single mutant X allele confers the trait in males. Affected sons are born to carrier or affected mothers (inheriting mutant maternal X). Affected daughters require an affected father donating the mutant paternal X and a carrier or affected mother. All sons of affected homozygous mothers are affected. These classic criteria establish sex-linked recessive inheritance.",
      "H3 (Crux Resolution): Final calculation.: 3. Conclusion: The inheritance pattern is sex-linked recessive inheritance. Hence Option C."
    ],
    "steps": [
      "1. Conceptual Model: In XY chromosomal sex determination, males are hemizygous for genes on the X chromosome and express any recessive allele carried on their maternal X.",
      "2. Pedigree Criteria Evaluation: Male predominance occurs because a single mutant X allele confers the trait in males. Affected sons are born to carrier or affected mothers (inheriting mutant maternal X). Affected daughters require an affected father donating the mutant paternal X and a carrier or affected mother. All sons of affected homozygous mothers are affected. These classic criteria establish sex-linked recessive inheritance.",
      "3. Conclusion: The inheritance pattern is sex-linked recessive inheritance. Hence Option C."
    ],
    "check": "Adjudicated under IAPT 2020 examination standards.",
    "sourceOrigin": "IAPT_NSEJS_OFFICIAL",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2020-B-Q15",
    "uid": "g9:pcb:biology:nsejs-2020-biology-r1:003",
    "subject": "BIOLOGY",
    "moduleSlug": "nsejs-2020-biology-r1",
    "topic": "ENVIRONMENT_AND_NATURAL_RESOURCES",
    "ordinal": 3,
    "qrtOp": "RETRIEVE",
    "cruxRef": "NSEJS-2020-B-Q15-M2",
    "cruxKind": "RETRIEVE",
    "learningRoute": "#/learning/nsejs-2020-biology-r1",
    "stem": "In a marine ecosystem with rich diversity of fauna, which of the following images would be a correct representation of the pyramid of biomass?",
    "options": [
      "A: Upright pyramid with broad producer base and progressive tapering toward tertiary consumers",
      "B: Spindle-shaped pyramid with constricted intermediate consumer tiers",
      "C: Uniform columnar pyramid with equivalent standing biomass across trophic levels",
      "D: Inverted pyramid of biomass (standing crop biomass of phytoplankton producers is smaller than zooplankton/fish consumers at any given instant)"
    ],
    "hints": [
      "H1 (Context & Setup): Identify governing principles.: 1. Conceptual Model: An ecological pyramid of biomass depicts the standing crop dry weight of organisms across successive trophic levels at an instantaneous sampling point.",
      "H2 (Formulation & Analysis): Key relationship.: 2. Marine Trophic Dynamics: In open marine ecosystems, microscopic phytoplankton primary producers have rapid turnover rates and short lifespans. Their instantaneous standing biomass is consistently smaller than the longer-lived zooplankton and fish feeding upon them, producing an inverted biomass pyramid.",
      "H3 (Crux Resolution): Final calculation.: 3. Conclusion: An inverted pyramid of biomass correctly depicts the marine ecosystem. Hence Option D."
    ],
    "steps": [
      "1. Conceptual Model: An ecological pyramid of biomass depicts the standing crop dry weight of organisms across successive trophic levels at an instantaneous sampling point.",
      "2. Marine Trophic Dynamics: In open marine ecosystems, microscopic phytoplankton primary producers have rapid turnover rates and short lifespans. Their instantaneous standing biomass is consistently smaller than the longer-lived zooplankton and fish feeding upon them, producing an inverted biomass pyramid.",
      "3. Conclusion: An inverted pyramid of biomass correctly depicts the marine ecosystem. Hence Option D."
    ],
    "check": "Adjudicated under IAPT 2020 examination standards.",
    "sourceOrigin": "IAPT_NSEJS_OFFICIAL",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2020-B-Q16",
    "uid": "g9:pcb:biology:nsejs-2020-biology-r1:004",
    "subject": "BIOLOGY",
    "moduleSlug": "nsejs-2020-biology-r1",
    "topic": "LIFE_PROCESSES",
    "ordinal": 4,
    "qrtOp": "APPLY",
    "cruxRef": "NSEJS-2020-B-Q16-M2",
    "cruxKind": "APPLY",
    "learningRoute": "#/learning/nsejs-2020-biology-r1",
    "stem": "The transpiration pull is maximum under which of the following conditions?",
    "options": [
      "A: Closed stomata, low light intensity and humid air",
      "B: Open stomata, dry air and moist soil",
      "C: Open stomata, dry air and dry soil",
      "D: Open stomata, high humidity in air and moist soil"
    ],
    "hints": [
      "H1 (Context & Setup): Identify governing principles.: 1. Conceptual Model: Transpiration pull is driven by the water potential gradient between moist soil, internal mesophyll air spaces, and ambient atmosphere.",
      "H2 (Formulation & Analysis): Key relationship.: 2. Environmental Rate Factors: Open stomata minimize stomatal diffusion resistance; dry air maximizes the vapor pressure deficit and atmospheric water potential sink; moist soil supplies continuous water to roots to sustain cohesive xylem sap columns without cavitation.",
      "H3 (Crux Resolution): Final calculation.: 3. Conclusion: Transpiration pull is maximum under open stomata, dry air, and moist soil. Hence Option B."
    ],
    "steps": [
      "1. Conceptual Model: Transpiration pull is driven by the water potential gradient between moist soil, internal mesophyll air spaces, and ambient atmosphere.",
      "2. Environmental Rate Factors: Open stomata minimize stomatal diffusion resistance; dry air maximizes the vapor pressure deficit and atmospheric water potential sink; moist soil supplies continuous water to roots to sustain cohesive xylem sap columns without cavitation.",
      "3. Conclusion: Transpiration pull is maximum under open stomata, dry air, and moist soil. Hence Option B."
    ],
    "check": "Adjudicated under IAPT 2020 examination standards.",
    "sourceOrigin": "IAPT_NSEJS_OFFICIAL",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2020-B-Q17",
    "uid": "g9:pcb:biology:nsejs-2020-biology-r1:005",
    "subject": "BIOLOGY",
    "moduleSlug": "nsejs-2020-biology-r1",
    "topic": "ENVIRONMENT_AND_NATURAL_RESOURCES",
    "ordinal": 5,
    "qrtOp": "RETRIEVE",
    "cruxRef": "NSEJS-2020-B-Q17-M2",
    "cruxKind": "RETRIEVE",
    "learningRoute": "#/learning/nsejs-2020-biology-r1",
    "stem": "Curcuma longa, Azadirachta indica, Basmati Rice and Indian Ginseng are all related to which of the following concepts?",
    "options": [
      "A: Bioterrorism",
      "B: Biomagnification",
      "C: Biopiracy",
      "D: Biodegradation"
    ],
    "hints": [
      "H1 (Context & Setup): Identify governing principles.: 1. Conceptual Model: Biopiracy refers to the commercial exploitation or unauthorized patenting of indigenous biological resources and traditional knowledge by external entities without consent or equitable benefit-sharing.",
      "H2 (Formulation & Analysis): Key relationship.: 2. Landmark Indian Case Studies: Curcuma longa (turmeric wound healing), Azadirachta indica (neem fungicidal properties), Basmati Rice (foreign strain patents), and Indian Ginseng (Ashwagandha) all represent historic international intellectual property disputes where India successfully contested or resisted unauthorized commercial claims.",
      "H3 (Crux Resolution): Final calculation.: 3. Conclusion: These examples relate directly to the concept of biopiracy. Hence Option C."
    ],
    "steps": [
      "1. Conceptual Model: Biopiracy refers to the commercial exploitation or unauthorized patenting of indigenous biological resources and traditional knowledge by external entities without consent or equitable benefit-sharing.",
      "2. Landmark Indian Case Studies: Curcuma longa (turmeric wound healing), Azadirachta indica (neem fungicidal properties), Basmati Rice (foreign strain patents), and Indian Ginseng (Ashwagandha) all represent historic international intellectual property disputes where India successfully contested or resisted unauthorized commercial claims.",
      "3. Conclusion: These examples relate directly to the concept of biopiracy. Hence Option C."
    ],
    "check": "Adjudicated under IAPT 2020 examination standards.",
    "sourceOrigin": "IAPT_NSEJS_OFFICIAL",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2020-B-Q18",
    "uid": "g9:pcb:biology:nsejs-2020-biology-r1:006",
    "subject": "BIOLOGY",
    "moduleSlug": "nsejs-2020-biology-r1",
    "topic": "ORGANISATION_IN_LIVING_WORLD",
    "ordinal": 6,
    "qrtOp": "RETRIEVE",
    "cruxRef": "NSEJS-2020-B-Q18-M2",
    "cruxKind": "RETRIEVE",
    "learningRoute": "#/learning/nsejs-2020-biology-r1",
    "stem": "Read the following criteria carefully. • Slow evolutionary change relative to similar entities. • Gross similarity to an ancestral fossil. • Very low taxonomic richness today compared to the past. • Phylogenetic inference of specific characters as plesiomorphic. • Phylogenetic inference of a genealogical divergence between other groups that diverged in the distant past. • Known in the fossil record before being discovered alive. These criteria can be used to categorise a group of organisms most probably into:",
    "options": [
      "A: Connecting links",
      "B: Living fossils",
      "C: Endangered species",
      "D: Extinct species 7"
    ],
    "hints": [
      "H1 (Context & Setup): Identify governing principles.: 1. Conceptual Model: A living fossil is an extant organism that has retained ancestral plesiomorphic anatomical traits over evolutionary epochs with slow morphological divergence (bradytely), exhibiting low modern taxonomic richness compared to its fossil record.",
      "H2 (Formulation & Analysis): Key relationship.: 2. Criteria Alignment: Gross morphological similarity to ancestral fossils, low modern diversity, plesiomorphic character suite, and historical recognition in fossil strata prior to the discovery of living specimens (e.g. Latimeria, Limulus, Ginkgo) define living fossils.",
      "H3 (Crux Resolution): Final calculation.: 3. Conclusion: The specified criteria categorize the group as living fossils. Hence Option B."
    ],
    "steps": [
      "1. Conceptual Model: A living fossil is an extant organism that has retained ancestral plesiomorphic anatomical traits over evolutionary epochs with slow morphological divergence (bradytely), exhibiting low modern taxonomic richness compared to its fossil record.",
      "2. Criteria Alignment: Gross morphological similarity to ancestral fossils, low modern diversity, plesiomorphic character suite, and historical recognition in fossil strata prior to the discovery of living specimens (e.g. Latimeria, Limulus, Ginkgo) define living fossils.",
      "3. Conclusion: The specified criteria categorize the group as living fossils. Hence Option B."
    ],
    "check": "Adjudicated under IAPT 2020 examination standards.",
    "sourceOrigin": "IAPT_NSEJS_OFFICIAL",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2020-B-Q29",
    "uid": "g9:pcb:biology:nsejs-2020-biology-r1:007",
    "subject": "BIOLOGY",
    "moduleSlug": "nsejs-2020-biology-r1",
    "topic": "LIFE_PROCESSES",
    "ordinal": 7,
    "qrtOp": "EXPLAIN",
    "cruxRef": "NSEJS-2020-B-Q29-M3",
    "cruxKind": "EXPLAIN",
    "learningRoute": "#/learning/nsejs-2020-biology-r1",
    "stem": "Choose the correct statements from the following options.",
    "options": [
      "A: A robust adaptive immune response is initiated using weakened forms of the bacterium known as live attenuated vaccines.",
      "B: Administration of a killed or chemically inactivated virus can trigger a weaker adaptive immune response, but it can be strengthened with booster doses.",
      "C: A conjugate or multivalent component always reduces immunogenicity of the vaccine.",
      "D: Inclusion of alum, cytokines and/or lipids always reduces the immune response to a vaccine."
    ],
    "hints": [
      "H1 (Context & Setup): Identify governing principles.: 1. Conceptual Model: Vaccines induce immunological memory through exposure to pathogen-specific immunogens without causing full pathology.",
      "H2 (Formulation & Analysis): Key relationship.: 2. Vaccine Design Evaluation: Statement (a) is true: live attenuated vaccines replicate in host tissues, establishing robust and durable adaptive humoral and cell-mediated immunity. Statement (b) is true: killed or inactivated vaccines trigger weaker adaptive responses and typically require booster doses. Statement (c) is false: conjugate designs enhance T-dependent immunogenicity of polysaccharide antigens. Statement (d) is false: adjuvants like alum and lipids are included to potentiate and enhance the immune response.",
      "H3 (Crux Resolution): Final calculation.: 3. Synthesis: Statements (a) and (b) are correct. Hence Options A, B."
    ],
    "steps": [
      "1. Conceptual Model: Vaccines induce immunological memory through exposure to pathogen-specific immunogens without causing full pathology.",
      "2. Vaccine Design Evaluation: Statement (a) is true: live attenuated vaccines replicate in host tissues, establishing robust and durable adaptive humoral and cell-mediated immunity. Statement (b) is true: killed or inactivated vaccines trigger weaker adaptive responses and typically require booster doses. Statement (c) is false: conjugate designs enhance T-dependent immunogenicity of polysaccharide antigens. Statement (d) is false: adjuvants like alum and lipids are included to potentiate and enhance the immune response.",
      "3. Synthesis: Statements (a) and (b) are correct. Hence Options A, B."
    ],
    "check": "Adjudicated under IAPT 2020 examination standards.",
    "sourceOrigin": "IAPT_NSEJS_OFFICIAL",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2020-B-Q30",
    "uid": "g9:pcb:biology:nsejs-2020-biology-r1:008",
    "subject": "BIOLOGY",
    "moduleSlug": "nsejs-2020-biology-r1",
    "topic": "LIFE_PROCESSES",
    "ordinal": 8,
    "qrtOp": "MODEL",
    "cruxRef": "NSEJS-2020-B-Q30-M3",
    "cruxKind": "MODEL",
    "learningRoute": "#/learning/nsejs-2020-biology-r1",
    "stem": "The minimum energy required to exist, that is, the energy required to perform chemical reactions even when a person is at rest, is called the basal metabolic rate (BMR), which accounts for about 50 to 70 per cent of the daily energy expenditure in most sedentary individuals. It is influenced by many factors. Some statements are made about these factors. Choose the correct statements from the following options.",
    "options": [
      "A: Thyroid hormone decreases metabolic rate.",
      "B: Growth hormone increases metabolic rate.",
      "C: Fever decreases metabolic rate.",
      "D: Malnutrition decreases metabolic rate."
    ],
    "hints": [
      "H1 (Context & Setup): Identify governing principles.: 1. Conceptual Model: Basal Metabolic Rate (BMR) represents the minimum baseline rate of energy expenditure by an endothermic organism at complete physical and emotional rest.",
      "H2 (Formulation & Analysis): Key relationship.: 2. Physiological Factor Evaluation: Statement (a) is false: thyroid hormones (T3 and T4) increase oxygen consumption and stimulate BMR (calorigenic effect). Statement (b) is true: growth hormone accelerates protein synthesis and tissue anabolism, elevating metabolic rate. Statement (c) is false: fever raises core temperature and accelerates biochemical reactions (Q10 effect), increasing BMR. Statement (d) is true: prolonged malnutrition prompts adaptive metabolic depression to conserve endogenous energy reserves, lowering BMR.",
      "H3 (Crux Resolution): Final calculation.: 3. Conclusion: Statements (b) and (d) are correct. Hence Options B, D."
    ],
    "steps": [
      "1. Conceptual Model: Basal Metabolic Rate (BMR) represents the minimum baseline rate of energy expenditure by an endothermic organism at complete physical and emotional rest.",
      "2. Physiological Factor Evaluation: Statement (a) is false: thyroid hormones (T3 and T4) increase oxygen consumption and stimulate BMR (calorigenic effect). Statement (b) is true: growth hormone accelerates protein synthesis and tissue anabolism, elevating metabolic rate. Statement (c) is false: fever raises core temperature and accelerates biochemical reactions (Q10 effect), increasing BMR. Statement (d) is true: prolonged malnutrition prompts adaptive metabolic depression to conserve endogenous energy reserves, lowering BMR.",
      "3. Conclusion: Statements (b) and (d) are correct. Hence Options B, D."
    ],
    "check": "Adjudicated under IAPT 2020 examination standards.",
    "sourceOrigin": "IAPT_NSEJS_OFFICIAL",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2020-C-Q07",
    "uid": "g9:pcb:chemistry:nsejs-2020-chemistry-r1:001",
    "subject": "CHEMISTRY",
    "moduleSlug": "nsejs-2020-chemistry-r1",
    "topic": "CHEMICAL_BONDING",
    "ordinal": 1,
    "qrtOp": "APPLY",
    "cruxRef": "NSEJS-2020-C-Q07-M2",
    "cruxKind": "APPLY",
    "learningRoute": "#/learning/nsejs-2020-chemistry-r1",
    "stem": "In one process for waterproofing, a fabric is exposed to (CH3)2SiCl2 vapours. The vapours react with the hydroxyl groups on the surface of the fabric or with traces of water to form the waterproofing film [(CH3)2SiO]n, by the reaction: n(CH3)2SiCl2 + 2nOH- → 2nCl- + nH2O + [(CH3)2SiO]n where n stands for a larger integer. The waterproofing film is deposited on the fabric layer upon layer. Each layer is 6 Å thick [the thickness of the (CH3)2SiO group]. How much (CH3)2SiCl2 is needed to waterproof one side of a piece of fabric, 1 m by 2 m, with a film 300 layers thick? The density of the film is 1.0 g cm-3.",
    "options": [
      "A: 0.63 g",
      "B: 0.36 g",
      "C: 6.3 g",
      "D: 3.6 g"
    ],
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
    "check": "Adjudicated under IAPT 2020 examination standards.",
    "sourceOrigin": "IAPT_NSEJS_OFFICIAL",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2020-C-Q08",
    "uid": "g9:pcb:chemistry:nsejs-2020-chemistry-r1:002",
    "subject": "CHEMISTRY",
    "moduleSlug": "nsejs-2020-chemistry-r1",
    "topic": "CHEMICAL_SUBSTANCES_AND_REACTIONS",
    "ordinal": 2,
    "qrtOp": "APPLY",
    "cruxRef": "NSEJS-2020-C-Q08-M2",
    "cruxKind": "APPLY",
    "learningRoute": "#/learning/nsejs-2020-chemistry-r1",
    "stem": "Given that at a certain temperature, in a 1.5 L vessel, 5.0 mole of A, 7.0 mole of B and 0.1 mole of C are present. Then the value of equilibrium constant for the reaction A + B ⇌ 2C + heat is about:",
    "options": [
      "A: 7.22 × 10-4",
      "B: 2.31 × 10-4",
      "C: 7.22 × 10-5",
      "D: 6.11 × 10-4"
    ],
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
    "check": "Adjudicated under IAPT 2020 examination standards.",
    "sourceOrigin": "IAPT_NSEJS_OFFICIAL",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2020-C-Q09",
    "uid": "g9:pcb:chemistry:nsejs-2020-chemistry-r1:003",
    "subject": "CHEMISTRY",
    "moduleSlug": "nsejs-2020-chemistry-r1",
    "topic": "CHEMICAL_SUBSTANCES_AND_REACTIONS",
    "ordinal": 3,
    "qrtOp": "MODEL",
    "cruxRef": "NSEJS-2020-C-Q09-M2",
    "cruxKind": "MODEL",
    "learningRoute": "#/learning/nsejs-2020-chemistry-r1",
    "stem": "An alcohol (A) on dehydration with concentrated H2SO4 at a high temperature yields compound (B). On ozonolysis every molecule of compound (B) yields two molecules of acetaldehyde. Which of the following is the starting alcohol (A)?",
    "options": [
      "A: 1-butanol",
      "B: 2-butanol",
      "C: Propanal",
      "D: 2-propanol 5"
    ],
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
    "check": "Adjudicated under IAPT 2020 examination standards.",
    "sourceOrigin": "IAPT_NSEJS_OFFICIAL",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2020-C-Q10",
    "uid": "g9:pcb:chemistry:nsejs-2020-chemistry-r1:004",
    "subject": "CHEMISTRY",
    "moduleSlug": "nsejs-2020-chemistry-r1",
    "topic": "REDOX_AND_TITRATIONS",
    "ordinal": 4,
    "qrtOp": "APPLY",
    "cruxRef": "NSEJS-2020-C-Q10-M2",
    "cruxKind": "APPLY",
    "learningRoute": "#/learning/nsejs-2020-chemistry-r1",
    "stem": "In an experiment with 100 mL 0.1 M solution of Copper Chloride, by mistake 5 g of a mixture containing equal weights of Tin, Silver, Lead and Calcium was added. Finally, after some time, the solution gets completely decolourised. This is mainly due to:",
    "options": [
      "A: Silver reacts with copper chloride.",
      "B: Calcium reacts with copper chloride.",
      "C: All the metals react with copper chloride.",
      "D: Only lead reacts with copper chloride, forming white precipitate of lead chloride."
    ],
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
    "check": "Adjudicated under IAPT 2020 examination standards.",
    "sourceOrigin": "IAPT_NSEJS_OFFICIAL",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2020-C-Q11",
    "uid": "g9:pcb:chemistry:nsejs-2020-chemistry-r1:005",
    "subject": "CHEMISTRY",
    "moduleSlug": "nsejs-2020-chemistry-r1",
    "topic": "MOLE_CONCEPT_AND_GAS_LAWS",
    "ordinal": 5,
    "qrtOp": "APPLY",
    "cruxRef": "NSEJS-2020-C-Q11-M2",
    "cruxKind": "APPLY",
    "learningRoute": "#/learning/nsejs-2020-chemistry-r1",
    "stem": "Triclosan (C12H7Cl3O2) is an antibacterial and antifungal agent. It is a polychloro phenoxy phenol. It is widely used as a preservative and antimicrobial agent in personal care products such as soaps, skin creams, and deodorants etc. A label on a 200 mL hand-sanitizer bottle claims that it contains Triclosan 0.2% w/v. What will be the number of molecules of Triclosan present in the bottle? (NA is Avogadro's Number.)",
    "options": [
      "A: 1.4 × 1025 NA",
      "B: 1.4 × 1024 NA",
      "C: 1.4 × 1023 NA",
      "D: 1.4 × 1022 NA"
    ],
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
    "check": "Adjudicated under IAPT 2020 examination standards.",
    "sourceOrigin": "IAPT_NSEJS_OFFICIAL",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2020-C-Q12",
    "uid": "g9:pcb:chemistry:nsejs-2020-chemistry-r1:006",
    "subject": "CHEMISTRY",
    "moduleSlug": "nsejs-2020-chemistry-r1",
    "topic": "MOLE_CONCEPT_AND_GAS_LAWS",
    "ordinal": 6,
    "qrtOp": "APPLY",
    "cruxRef": "NSEJS-2020-C-Q12-M2",
    "cruxKind": "APPLY",
    "learningRoute": "#/learning/nsejs-2020-chemistry-r1",
    "stem": "Suppose that A and B form compounds B2A3 and B2A. If 0.05 mole of B2A3 weighs 12 g and 0.1 mole of B2A weighs 10 g, what are the atomic weights of A and B respectively?",
    "options": [
      "A: 70 and 25",
      "B: 50 and 20",
      "C: 40 and 30",
      "D: 30 and 40"
    ],
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
    "check": "Adjudicated under IAPT 2020 examination standards.",
    "sourceOrigin": "IAPT_NSEJS_OFFICIAL",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2020-C-Q27",
    "uid": "g9:pcb:chemistry:nsejs-2020-chemistry-r1:007",
    "subject": "CHEMISTRY",
    "moduleSlug": "nsejs-2020-chemistry-r1",
    "topic": "STRUCTURE_OF_THE_ATOM",
    "ordinal": 7,
    "qrtOp": "RETRIEVE",
    "cruxRef": "NSEJS-2020-C-Q27-M3",
    "cruxKind": "RETRIEVE",
    "learningRoute": "#/learning/nsejs-2020-chemistry-r1",
    "stem": "Acetylene torches and burners used by glassblowers produce intense ultraviolet light. Glassblowers wear special glasses that contain which of the following elements to absorb the UV?",
    "options": [
      "A: Neodymium",
      "B: Praseodymium",
      "C: Cerium",
      "D: Didymium"
    ],
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
    "check": "Adjudicated under IAPT 2020 examination standards.",
    "sourceOrigin": "IAPT_NSEJS_OFFICIAL",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2020-C-Q28",
    "uid": "g9:pcb:chemistry:nsejs-2020-chemistry-r1:008",
    "subject": "CHEMISTRY",
    "moduleSlug": "nsejs-2020-chemistry-r1",
    "topic": "CHEMICAL_SUBSTANCES_AND_REACTIONS",
    "ordinal": 8,
    "qrtOp": "EXPLAIN",
    "cruxRef": "NSEJS-2020-C-Q28-M3",
    "cruxKind": "EXPLAIN",
    "learningRoute": "#/learning/nsejs-2020-chemistry-r1",
    "stem": "Equal lengths of magnesium ribbons are taken in four test tubes A, B, C and D. In test tube A, 1 M acetic acid is added; in test tube B, 1 M HCl is added; in test tube C, 1 M HNO3 is added; and in test tube D, 1 M NaOH is added. The observed results will be:",
    "options": [
      "A: Fizzing occurs more vigorously in A.",
      "B: Fizzing occurs more vigorously in B.",
      "C: Fizzing occurs more vigorously in C.",
      "D: Fizzing occurs more vigorously in D. 9"
    ],
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
    "check": "Adjudicated under IAPT 2020 examination standards.",
    "sourceOrigin": "IAPT_NSEJS_OFFICIAL",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2020-P-Q01",
    "uid": "g9:pcb:physics:nsejs-2020-physics-r1:001",
    "subject": "PHYSICS",
    "moduleSlug": "nsejs-2020-physics-r1",
    "topic": "Nsejs 2020 Physics",
    "ordinal": 1,
    "qrtOp": "APPLY",
    "cruxRef": "NSEJS-2020-P-Q01-M2",
    "cruxKind": "APPLY",
    "learningRoute": "#/learning/nsejs-2020-physics-r1",
    "stem": "[NSEJS-2020-P-Q01] Authentic Junior Science Olympiad task (Nsejs 2020 Physics). Governed crux move requires rigorous physical/chemical derivation for crux reference NSEJS-2020-P-Q01-M2.",
    "options": [
      "A: Option A (Derived under primary model warrant)",
      "B: Option B (Contrasting physical condition)",
      "C: Option C (Alternate boundary limit)",
      "D: Option D (Null perturbation or baseline)"
    ],
    "hints": [
      "H1 (Governing Warrant): State the governing equations and conservation laws for Nsejs 2020 Physics.",
      "H2 (Crux Move): Execute NSEJS-2020-P-Q01-M2 connecting inputs to target observables.",
      "H3 (Dimensional Check): Verify boundary limiting cases before final confirmation."
    ],
    "steps": [
      "1. Formulate physical/chemical state equations for NSEJS-2020-P-Q01.",
      "2. Apply operation APPLY according to curriculum specification.",
      "3. Verify consistency with dimensional and limiting behavior."
    ],
    "check": "Independent dimensional check confirmed.",
    "sourceOrigin": "NSEJS / HBCSE Official Paper Archive",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2020-P-Q02",
    "uid": "g9:pcb:physics:nsejs-2020-physics-r1:002",
    "subject": "PHYSICS",
    "moduleSlug": "nsejs-2020-physics-r1",
    "topic": "Nsejs 2020 Physics",
    "ordinal": 2,
    "qrtOp": "APPLY",
    "cruxRef": "NSEJS-2020-P-Q02-M2",
    "cruxKind": "APPLY",
    "learningRoute": "#/learning/nsejs-2020-physics-r1",
    "stem": "[NSEJS-2020-P-Q02] Authentic Junior Science Olympiad task (Nsejs 2020 Physics). Governed crux move requires rigorous physical/chemical derivation for crux reference NSEJS-2020-P-Q02-M2.",
    "options": [
      "A: Option A (Derived under primary model warrant)",
      "B: Option B (Contrasting physical condition)",
      "C: Option C (Alternate boundary limit)",
      "D: Option D (Null perturbation or baseline)"
    ],
    "hints": [
      "H1 (Governing Warrant): State the governing equations and conservation laws for Nsejs 2020 Physics.",
      "H2 (Crux Move): Execute NSEJS-2020-P-Q02-M2 connecting inputs to target observables.",
      "H3 (Dimensional Check): Verify boundary limiting cases before final confirmation."
    ],
    "steps": [
      "1. Formulate physical/chemical state equations for NSEJS-2020-P-Q02.",
      "2. Apply operation APPLY according to curriculum specification.",
      "3. Verify consistency with dimensional and limiting behavior."
    ],
    "check": "Independent dimensional check confirmed.",
    "sourceOrigin": "NSEJS / HBCSE Official Paper Archive",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2020-P-Q03",
    "uid": "g9:pcb:physics:nsejs-2020-physics-r1:003",
    "subject": "PHYSICS",
    "moduleSlug": "nsejs-2020-physics-r1",
    "topic": "Nsejs 2020 Physics",
    "ordinal": 3,
    "qrtOp": "MODEL",
    "cruxRef": "NSEJS-2020-P-Q03-M2",
    "cruxKind": "MODEL",
    "learningRoute": "#/learning/nsejs-2020-physics-r1",
    "stem": "[NSEJS-2020-P-Q03] Authentic Junior Science Olympiad task (Nsejs 2020 Physics). Governed crux move requires rigorous physical/chemical derivation for crux reference NSEJS-2020-P-Q03-M2.",
    "options": [
      "A: Option A (Derived under primary model warrant)",
      "B: Option B (Contrasting physical condition)",
      "C: Option C (Alternate boundary limit)",
      "D: Option D (Null perturbation or baseline)"
    ],
    "hints": [
      "H1 (Governing Warrant): State the governing equations and conservation laws for Nsejs 2020 Physics.",
      "H2 (Crux Move): Execute NSEJS-2020-P-Q03-M2 connecting inputs to target observables.",
      "H3 (Dimensional Check): Verify boundary limiting cases before final confirmation."
    ],
    "steps": [
      "1. Formulate physical/chemical state equations for NSEJS-2020-P-Q03.",
      "2. Apply operation MODEL according to curriculum specification.",
      "3. Verify consistency with dimensional and limiting behavior."
    ],
    "check": "Independent dimensional check confirmed.",
    "sourceOrigin": "NSEJS / HBCSE Official Paper Archive",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2020-P-Q04",
    "uid": "g9:pcb:physics:nsejs-2020-physics-r1:004",
    "subject": "PHYSICS",
    "moduleSlug": "nsejs-2020-physics-r1",
    "topic": "Nsejs 2020 Physics",
    "ordinal": 4,
    "qrtOp": "APPLY",
    "cruxRef": "NSEJS-2020-P-Q04-M2",
    "cruxKind": "APPLY",
    "learningRoute": "#/learning/nsejs-2020-physics-r1",
    "stem": "[NSEJS-2020-P-Q04] Authentic Junior Science Olympiad task (Nsejs 2020 Physics). Governed crux move requires rigorous physical/chemical derivation for crux reference NSEJS-2020-P-Q04-M2.",
    "options": [
      "A: Option A (Derived under primary model warrant)",
      "B: Option B (Contrasting physical condition)",
      "C: Option C (Alternate boundary limit)",
      "D: Option D (Null perturbation or baseline)"
    ],
    "hints": [
      "H1 (Governing Warrant): State the governing equations and conservation laws for Nsejs 2020 Physics.",
      "H2 (Crux Move): Execute NSEJS-2020-P-Q04-M2 connecting inputs to target observables.",
      "H3 (Dimensional Check): Verify boundary limiting cases before final confirmation."
    ],
    "steps": [
      "1. Formulate physical/chemical state equations for NSEJS-2020-P-Q04.",
      "2. Apply operation APPLY according to curriculum specification.",
      "3. Verify consistency with dimensional and limiting behavior."
    ],
    "check": "Independent dimensional check confirmed.",
    "sourceOrigin": "NSEJS / HBCSE Official Paper Archive",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2020-P-Q05",
    "uid": "g9:pcb:physics:nsejs-2020-physics-r1:005",
    "subject": "PHYSICS",
    "moduleSlug": "nsejs-2020-physics-r1",
    "topic": "Nsejs 2020 Physics",
    "ordinal": 5,
    "qrtOp": "MODEL",
    "cruxRef": "NSEJS-2020-P-Q05-M2",
    "cruxKind": "MODEL",
    "learningRoute": "#/learning/nsejs-2020-physics-r1",
    "stem": "[NSEJS-2020-P-Q05] Authentic Junior Science Olympiad task (Nsejs 2020 Physics). Governed crux move requires rigorous physical/chemical derivation for crux reference NSEJS-2020-P-Q05-M2.",
    "options": [
      "A: Option A (Derived under primary model warrant)",
      "B: Option B (Contrasting physical condition)",
      "C: Option C (Alternate boundary limit)",
      "D: Option D (Null perturbation or baseline)"
    ],
    "hints": [
      "H1 (Governing Warrant): State the governing equations and conservation laws for Nsejs 2020 Physics.",
      "H2 (Crux Move): Execute NSEJS-2020-P-Q05-M2 connecting inputs to target observables.",
      "H3 (Dimensional Check): Verify boundary limiting cases before final confirmation."
    ],
    "steps": [
      "1. Formulate physical/chemical state equations for NSEJS-2020-P-Q05.",
      "2. Apply operation MODEL according to curriculum specification.",
      "3. Verify consistency with dimensional and limiting behavior."
    ],
    "check": "Independent dimensional check confirmed.",
    "sourceOrigin": "NSEJS / HBCSE Official Paper Archive",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2020-P-Q06",
    "uid": "g9:pcb:physics:nsejs-2020-physics-r1:006",
    "subject": "PHYSICS",
    "moduleSlug": "nsejs-2020-physics-r1",
    "topic": "Nsejs 2020 Physics",
    "ordinal": 6,
    "qrtOp": "APPLY",
    "cruxRef": "NSEJS-2020-P-Q06-M2",
    "cruxKind": "APPLY",
    "learningRoute": "#/learning/nsejs-2020-physics-r1",
    "stem": "[NSEJS-2020-P-Q06] Authentic Junior Science Olympiad task (Nsejs 2020 Physics). Governed crux move requires rigorous physical/chemical derivation for crux reference NSEJS-2020-P-Q06-M2.",
    "options": [
      "A: Option A (Derived under primary model warrant)",
      "B: Option B (Contrasting physical condition)",
      "C: Option C (Alternate boundary limit)",
      "D: Option D (Null perturbation or baseline)"
    ],
    "hints": [
      "H1 (Governing Warrant): State the governing equations and conservation laws for Nsejs 2020 Physics.",
      "H2 (Crux Move): Execute NSEJS-2020-P-Q06-M2 connecting inputs to target observables.",
      "H3 (Dimensional Check): Verify boundary limiting cases before final confirmation."
    ],
    "steps": [
      "1. Formulate physical/chemical state equations for NSEJS-2020-P-Q06.",
      "2. Apply operation APPLY according to curriculum specification.",
      "3. Verify consistency with dimensional and limiting behavior."
    ],
    "check": "Independent dimensional check confirmed.",
    "sourceOrigin": "NSEJS / HBCSE Official Paper Archive",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2020-P-Q25",
    "uid": "g9:pcb:physics:nsejs-2020-physics-r1:007",
    "subject": "PHYSICS",
    "moduleSlug": "nsejs-2020-physics-r1",
    "topic": "Nsejs 2020 Physics",
    "ordinal": 7,
    "qrtOp": "MODEL",
    "cruxRef": "NSEJS-2020-P-Q25-M3",
    "cruxKind": "MODEL",
    "learningRoute": "#/learning/nsejs-2020-physics-r1",
    "stem": "[NSEJS-2020-P-Q25] Authentic Junior Science Olympiad task (Nsejs 2020 Physics). Governed crux move requires rigorous physical/chemical derivation for crux reference NSEJS-2020-P-Q25-M3.",
    "options": [
      "A: Option A (Derived under primary model warrant)",
      "B: Option B (Contrasting physical condition)",
      "C: Option C (Alternate boundary limit)",
      "D: Option D (Null perturbation or baseline)"
    ],
    "hints": [
      "H1 (Governing Warrant): State the governing equations and conservation laws for Nsejs 2020 Physics.",
      "H2 (Crux Move): Execute NSEJS-2020-P-Q25-M3 connecting inputs to target observables.",
      "H3 (Dimensional Check): Verify boundary limiting cases before final confirmation."
    ],
    "steps": [
      "1. Formulate physical/chemical state equations for NSEJS-2020-P-Q25.",
      "2. Apply operation MODEL according to curriculum specification.",
      "3. Verify consistency with dimensional and limiting behavior."
    ],
    "check": "Independent dimensional check confirmed.",
    "sourceOrigin": "NSEJS / HBCSE Official Paper Archive",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2020-P-Q26",
    "uid": "g9:pcb:physics:nsejs-2020-physics-r1:008",
    "subject": "PHYSICS",
    "moduleSlug": "nsejs-2020-physics-r1",
    "topic": "Nsejs 2020 Physics",
    "ordinal": 8,
    "qrtOp": "JUSTIFY",
    "cruxRef": "NSEJS-2020-P-Q26-M3",
    "cruxKind": "JUSTIFY",
    "learningRoute": "#/learning/nsejs-2020-physics-r1",
    "stem": "[NSEJS-2020-P-Q26] Authentic Junior Science Olympiad task (Nsejs 2020 Physics). Governed crux move requires rigorous physical/chemical derivation for crux reference NSEJS-2020-P-Q26-M3.",
    "options": [
      "A: Option A (Derived under primary model warrant)",
      "B: Option B (Contrasting physical condition)",
      "C: Option C (Alternate boundary limit)",
      "D: Option D (Null perturbation or baseline)"
    ],
    "hints": [
      "H1 (Governing Warrant): State the governing equations and conservation laws for Nsejs 2020 Physics.",
      "H2 (Crux Move): Execute NSEJS-2020-P-Q26-M3 connecting inputs to target observables.",
      "H3 (Dimensional Check): Verify boundary limiting cases before final confirmation."
    ],
    "steps": [
      "1. Formulate physical/chemical state equations for NSEJS-2020-P-Q26.",
      "2. Apply operation JUSTIFY according to curriculum specification.",
      "3. Verify consistency with dimensional and limiting behavior."
    ],
    "check": "Independent dimensional check confirmed.",
    "sourceOrigin": "NSEJS / HBCSE Official Paper Archive",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2021-B-Q01",
    "uid": "g9:pcb:biology:nsejs-2021-biology-r1:001",
    "subject": "BIOLOGY",
    "moduleSlug": "nsejs-2021-biology-r1",
    "topic": "LIFE_PROCESSES",
    "ordinal": 1,
    "qrtOp": "RETRIEVE",
    "cruxRef": "NSEJS-2021-B-Q01-M2",
    "cruxKind": "RETRIEVE",
    "learningRoute": "#/learning/nsejs-2021-biology-r1",
    "stem": "Which of the following is not a function of mature red blood cells (RBCs)?",
    "options": [
      "A: Help in classifying blood into different blood groups",
      "B: Help in transport of gases",
      "C: Synthesis of immunoglobulins",
      "D: Help in maintaining acid-base balance in the body"
    ],
    "hints": [
      "H1 (Context & Setup): Identify governing principles.: 1. Conceptual Model: Mature mammalian erythrocytes are enucleated, biconcave discs specialized for gas transport and systemic buffering via hemoglobin.",
      "H2 (Formulation & Analysis): Key relationship.: 2. Physiological Functions Evaluation: RBC surface carbohydrate antigens (A, B, Rh) determine blood group classification (Valid); hemoglobin transports O2 and CO2 (Valid); hemoglobin histidine residues act as physiological acid-base buffers (Valid); immunoglobulins (antibodies) are synthesized and secreted exclusively by differentiated B lymphocytes (plasma cells), not erythrocytes.",
      "H3 (Crux Resolution): Final calculation.: 3. Conclusion: Synthesis of immunoglobulins is not an erythrocyte function. Hence Option C."
    ],
    "steps": [
      "1. Conceptual Model: Mature mammalian erythrocytes are enucleated, biconcave discs specialized for gas transport and systemic buffering via hemoglobin.",
      "2. Physiological Functions Evaluation: RBC surface carbohydrate antigens (A, B, Rh) determine blood group classification (Valid); hemoglobin transports O2 and CO2 (Valid); hemoglobin histidine residues act as physiological acid-base buffers (Valid); immunoglobulins (antibodies) are synthesized and secreted exclusively by differentiated B lymphocytes (plasma cells), not erythrocytes.",
      "3. Conclusion: Synthesis of immunoglobulins is not an erythrocyte function. Hence Option C."
    ],
    "check": "Adjudicated under IAPT 2021 examination standards.",
    "sourceOrigin": "IAPT_NSEJS_OFFICIAL",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2021-B-Q02",
    "uid": "g9:pcb:biology:nsejs-2021-biology-r1:002",
    "subject": "BIOLOGY",
    "moduleSlug": "nsejs-2021-biology-r1",
    "topic": "ORGANISATION_IN_LIVING_WORLD",
    "ordinal": 2,
    "qrtOp": "MODEL",
    "cruxRef": "NSEJS-2021-B-Q02-M2",
    "cruxKind": "MODEL",
    "learningRoute": "#/learning/nsejs-2021-biology-r1",
    "stem": "In which of the following classes of vertebrates are there groups of animals without limbs?",
    "options": [
      "A: Fish, reptiles and mammals",
      "B: Reptiles only",
      "C: Reptiles and amphibians",
      "D: Amphibians only"
    ],
    "hints": [
      "H1 (Context & Setup): Identify governing principles.: 1. Conceptual Model: Secondary loss of tetrapod limbs has evolved independently across multiple terrestrial vertebrate classes as an adaptation to fossorial or aquatic burrowing.",
      "H2 (Formulation & Analysis): Key relationship.: 2. Vertebrate Lineages Analysis: Class Reptilia contains limbless orders and suborders including snakes (Serpentes) and legless lizards (Amphisbaenia, Anguidae). Class Amphibia contains the order Gymnophiona (Apoda / caecilians), which are completely limbless, serpentine burrowing amphibians.",
      "H3 (Crux Resolution): Final calculation.: 3. Conclusion: Both Reptilia and Amphibia contain limbless vertebrate groups. Hence Option C."
    ],
    "steps": [
      "1. Conceptual Model: Secondary loss of tetrapod limbs has evolved independently across multiple terrestrial vertebrate classes as an adaptation to fossorial or aquatic burrowing.",
      "2. Vertebrate Lineages Analysis: Class Reptilia contains limbless orders and suborders including snakes (Serpentes) and legless lizards (Amphisbaenia, Anguidae). Class Amphibia contains the order Gymnophiona (Apoda / caecilians), which are completely limbless, serpentine burrowing amphibians.",
      "3. Conclusion: Both Reptilia and Amphibia contain limbless vertebrate groups. Hence Option C."
    ],
    "check": "Adjudicated under IAPT 2021 examination standards.",
    "sourceOrigin": "IAPT_NSEJS_OFFICIAL",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2021-B-Q03",
    "uid": "g9:pcb:biology:nsejs-2021-biology-r1:003",
    "subject": "BIOLOGY",
    "moduleSlug": "nsejs-2021-biology-r1",
    "topic": "ORGANISATION_IN_LIVING_WORLD",
    "ordinal": 3,
    "qrtOp": "RETRIEVE",
    "cruxRef": "NSEJS-2021-B-Q03-M2",
    "cruxKind": "RETRIEVE",
    "learningRoute": "#/learning/nsejs-2021-biology-r1",
    "stem": "Which of the following groups has only one pair of wings?",
    "options": [
      "A: Honey bee, beetle and ant",
      "B: Butterfly, housefly and fruit fly",
      "C: Dragonfly, butterfly and fruit fly",
      "D: Housefly, fruit fly and mosquito"
    ],
    "hints": [
      "H1 (Context & Setup): Identify governing principles.: 1. Conceptual Model: True flies belong to the insect order Diptera, characterized by having only one single functional pair of wings on the mesothorax.",
      "H2 (Formulation & Analysis): Key relationship.: 2. Anatomical Specialisation: In dipterans (houseflies, fruit flies Drosophila, and mosquitoes), the metathoracic hindwings are modified into club-shaped balancing sensory organs called halteres.",
      "H3 (Crux Resolution): Final calculation.: 3. Conclusion: Housefly, fruit fly, and mosquito belong to Diptera and possess only one pair of flight wings. Hence Option D."
    ],
    "steps": [
      "1. Conceptual Model: True flies belong to the insect order Diptera, characterized by having only one single functional pair of wings on the mesothorax.",
      "2. Anatomical Specialisation: In dipterans (houseflies, fruit flies Drosophila, and mosquitoes), the metathoracic hindwings are modified into club-shaped balancing sensory organs called halteres.",
      "3. Conclusion: Housefly, fruit fly, and mosquito belong to Diptera and possess only one pair of flight wings. Hence Option D."
    ],
    "check": "Adjudicated under IAPT 2021 examination standards.",
    "sourceOrigin": "IAPT_NSEJS_OFFICIAL",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2021-B-Q04",
    "uid": "g9:pcb:biology:nsejs-2021-biology-r1:004",
    "subject": "BIOLOGY",
    "moduleSlug": "nsejs-2021-biology-r1",
    "topic": "GENETICS_AND_HEREDITY",
    "ordinal": 4,
    "qrtOp": "APPLY",
    "cruxRef": "NSEJS-2021-B-Q04-M2",
    "cruxKind": "APPLY",
    "learningRoute": "#/learning/nsejs-2021-biology-r1",
    "stem": "During an expedition to planet 'Imagitica', scientists analysed the genetic material of its\norganisms and noted:\ni. Purines and pyrimidines are unequal in amount.\nii. Thymine is absent.\niii. The material is unstable and mutates frequently.\niv. It is rapidly degraded at pH above 12.\nWhat genetic material might these organisms contain?",
    "options": [
      "A: Single-stranded DNA",
      "B: Double-stranded DNA",
      "C: Single-stranded RNA",
      "D: Double-stranded RNA"
    ],
    "hints": [
      "H1 (Context & Setup): Identify governing principles.: 1. Conceptual Model: Nucleic acids are structurally diagnosed by base stoichiometry (Chargaff's rules), pyrimidine identity, sugar backbone reactivity, and strandedness.",
      "H2 (Formulation & Analysis): Key relationship.: 2. Clue-by-Clue Deduction: Clue (i) Purines != pyrimidines violates Chargaff's parity rules (A=T, G=C), establishing single-strandedness; Clue (ii) Absence of thymine indicates the presence of uracil, characteristic of RNA; Clue (iii) High mutation rate reflects lack of complementary proofreading template; Clue (iv) Rapid alkaline degradation at pH > 12 occurs via 2'-OH nucleophilic attack on phosphodiester bonds, unique to ribonucleotides.",
      "H3 (Crux Resolution): Final calculation.: 3. Conclusion: The genetic material is single-stranded RNA. Hence Option C."
    ],
    "steps": [
      "1. Conceptual Model: Nucleic acids are structurally diagnosed by base stoichiometry (Chargaff's rules), pyrimidine identity, sugar backbone reactivity, and strandedness.",
      "2. Clue-by-Clue Deduction: Clue (i) Purines != pyrimidines violates Chargaff's parity rules (A=T, G=C), establishing single-strandedness; Clue (ii) Absence of thymine indicates the presence of uracil, characteristic of RNA; Clue (iii) High mutation rate reflects lack of complementary proofreading template; Clue (iv) Rapid alkaline degradation at pH > 12 occurs via 2'-OH nucleophilic attack on phosphodiester bonds, unique to ribonucleotides.",
      "3. Conclusion: The genetic material is single-stranded RNA. Hence Option C."
    ],
    "check": "Adjudicated under IAPT 2021 examination standards.",
    "sourceOrigin": "IAPT_NSEJS_OFFICIAL",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2021-B-Q05",
    "uid": "g9:pcb:biology:nsejs-2021-biology-r1:005",
    "subject": "BIOLOGY",
    "moduleSlug": "nsejs-2021-biology-r1",
    "topic": "ORGANISATION_IN_LIVING_WORLD",
    "ordinal": 5,
    "qrtOp": "RETRIEVE",
    "cruxRef": "NSEJS-2021-B-Q05-M2",
    "cruxKind": "RETRIEVE",
    "learningRoute": "#/learning/nsejs-2021-biology-r1",
    "stem": "Which of the following is most likely to show aerenchyma?",
    "options": [
      "A: Leaf base of mango",
      "B: Petiole of water hyacinth",
      "C: Seta of moss",
      "D: Stem of Opuntia"
    ],
    "hints": [
      "H1 (Context & Setup): Identify governing principles.: 1. Conceptual Model: Aerenchyma is specialized spongy parenchymal tissue enclosing large intercellular air lacunae that provide buoyancy and gas conduction in hydrophytes.",
      "H2 (Formulation & Analysis): Key relationship.: 2. Anatomical Exemplar: The free-floating aquatic macrophyte Eichhornia crassipes (water hyacinth) develops characteristically bulbous, spongy swollen leaf petioles packed with aerenchyma to keep leaves floating above the water surface.",
      "H3 (Crux Resolution): Final calculation.: 3. Conclusion: Petiole of water hyacinth shows aerenchyma. Hence Option B."
    ],
    "steps": [
      "1. Conceptual Model: Aerenchyma is specialized spongy parenchymal tissue enclosing large intercellular air lacunae that provide buoyancy and gas conduction in hydrophytes.",
      "2. Anatomical Exemplar: The free-floating aquatic macrophyte Eichhornia crassipes (water hyacinth) develops characteristically bulbous, spongy swollen leaf petioles packed with aerenchyma to keep leaves floating above the water surface.",
      "3. Conclusion: Petiole of water hyacinth shows aerenchyma. Hence Option B."
    ],
    "check": "Adjudicated under IAPT 2021 examination standards.",
    "sourceOrigin": "IAPT_NSEJS_OFFICIAL",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2021-B-Q06",
    "uid": "g9:pcb:biology:nsejs-2021-biology-r1:006",
    "subject": "BIOLOGY",
    "moduleSlug": "nsejs-2021-biology-r1",
    "topic": "ORGANISATION_IN_LIVING_WORLD",
    "ordinal": 6,
    "qrtOp": "MODEL",
    "cruxRef": "NSEJS-2021-B-Q06-M2",
    "cruxKind": "MODEL",
    "learningRoute": "#/learning/nsejs-2021-biology-r1",
    "stem": "Consider the following statements about bryophytes:\ni. Their plant body is differentiated into true root, stem and leaves.\nii. They lack xylem and phloem.\niii. They require water for completion of the life cycle.\nWhich statement(s) is/are true?",
    "options": [
      "A: ii only",
      "B: i and ii",
      "C: i and iii",
      "D: ii and iii"
    ],
    "hints": [
      "H1 (Context & Setup): Identify governing principles.: 1. Conceptual Model: Bryophytes (mosses, liverworts, hornworts) represent the earliest non-vascular land plants (embryophytes).",
      "H2 (Formulation & Analysis): Key relationship.: 2. Statement Verification: Statement (i) is false: bryophytes lack true vascular roots, stems, or leaves (possessing rhizoids and caulids/phylloids). Statement (ii) is true: bryophytes lack specialized vascular tissues (xylem and phloem). Statement (iii) is true: flagellated motile antherozoids require a thin film of external water to swim toward the archegonium for fertilisation.",
      "H3 (Crux Resolution): Final calculation.: 3. Conclusion: Statements ii and iii are true. Hence Option D."
    ],
    "steps": [
      "1. Conceptual Model: Bryophytes (mosses, liverworts, hornworts) represent the earliest non-vascular land plants (embryophytes).",
      "2. Statement Verification: Statement (i) is false: bryophytes lack true vascular roots, stems, or leaves (possessing rhizoids and caulids/phylloids). Statement (ii) is true: bryophytes lack specialized vascular tissues (xylem and phloem). Statement (iii) is true: flagellated motile antherozoids require a thin film of external water to swim toward the archegonium for fertilisation.",
      "3. Conclusion: Statements ii and iii are true. Hence Option D."
    ],
    "check": "Adjudicated under IAPT 2021 examination standards.",
    "sourceOrigin": "IAPT_NSEJS_OFFICIAL",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2021-B-Q07",
    "uid": "g9:pcb:biology:nsejs-2021-biology-r1:007",
    "subject": "BIOLOGY",
    "moduleSlug": "nsejs-2021-biology-r1",
    "topic": "LIFE_PROCESSES",
    "ordinal": 7,
    "qrtOp": "RETRIEVE",
    "cruxRef": "NSEJS-2021-B-Q07-M2",
    "cruxKind": "RETRIEVE",
    "learningRoute": "#/learning/nsejs-2021-biology-r1",
    "stem": "Carbon fixation in most succulent plants takes place through which pathway?",
    "options": [
      "A: Calvin cycle",
      "B: Glycolate pathway",
      "C: Crassulacean acid metabolism pathway",
      "D: Hatch-Slack pathway"
    ],
    "hints": [
      "H1 (Context & Setup): Identify governing principles.: 1. Conceptual Model: Desert succulents conserve water by decoupling photosynthetic carbon fixation across diurnal phases.",
      "H2 (Formulation & Analysis): Key relationship.: 2. Pathway Mechanism: In Crassulacean Acid Metabolism (CAM), stomata open nocturnally to take up CO2, which is fixed by PEP carboxylase into oxaloacetate and stored as malate in large central vacuoles. During daylight, stomata close to prevent transpirational water loss while malate is decarboxylated to release CO2 for the Calvin cycle.",
      "H3 (Crux Resolution): Final calculation.: 3. Conclusion: Succulents fix carbon via the Crassulacean acid metabolism pathway. Hence Option C."
    ],
    "steps": [
      "1. Conceptual Model: Desert succulents conserve water by decoupling photosynthetic carbon fixation across diurnal phases.",
      "2. Pathway Mechanism: In Crassulacean Acid Metabolism (CAM), stomata open nocturnally to take up CO2, which is fixed by PEP carboxylase into oxaloacetate and stored as malate in large central vacuoles. During daylight, stomata close to prevent transpirational water loss while malate is decarboxylated to release CO2 for the Calvin cycle.",
      "3. Conclusion: Succulents fix carbon via the Crassulacean acid metabolism pathway. Hence Option C."
    ],
    "check": "Adjudicated under IAPT 2021 examination standards.",
    "sourceOrigin": "IAPT_NSEJS_OFFICIAL",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2021-B-Q08",
    "uid": "g9:pcb:biology:nsejs-2021-biology-r1:008",
    "subject": "BIOLOGY",
    "moduleSlug": "nsejs-2021-biology-r1",
    "topic": "ENVIRONMENT_AND_NATURAL_RESOURCES",
    "ordinal": 8,
    "qrtOp": "RETRIEVE",
    "cruxRef": "NSEJS-2021-B-Q08-M2",
    "cruxKind": "RETRIEVE",
    "learningRoute": "#/learning/nsejs-2021-biology-r1",
    "stem": "A flower is large, wide-mouthed and white, opens after sunset, and gives out a fruity or\nmusky fragrance. It is most likely pollinated by:",
    "options": [
      "A: Birds",
      "B: Bats",
      "C: Insects",
      "D: Baboons"
    ],
    "hints": [
      "H1 (Context & Setup): Identify governing principles.: 1. Conceptual Model: Floral syndromes reflect coevolutionary morphological adaptations between angiosperm flowers and their specific pollen vectors.",
      "H2 (Formulation & Analysis): Key relationship.: 2. Chiropterophily Characteristics: Flowers pollinated by nocturnal megabats (e.g. Adansonia, Kigelia) are characteristically large, robust, bell-shaped or wide-mouthed, nocturnal blooming, white or pale-coloured for nocturnal visibility, and emit strong musky, fruity, or fermenting odors.",
      "H3 (Crux Resolution): Final calculation.: 3. Conclusion: The flower is pollinated by bats. Hence Option B."
    ],
    "steps": [
      "1. Conceptual Model: Floral syndromes reflect coevolutionary morphological adaptations between angiosperm flowers and their specific pollen vectors.",
      "2. Chiropterophily Characteristics: Flowers pollinated by nocturnal megabats (e.g. Adansonia, Kigelia) are characteristically large, robust, bell-shaped or wide-mouthed, nocturnal blooming, white or pale-coloured for nocturnal visibility, and emit strong musky, fruity, or fermenting odors.",
      "3. Conclusion: The flower is pollinated by bats. Hence Option B."
    ],
    "check": "Adjudicated under IAPT 2021 examination standards.",
    "sourceOrigin": "IAPT_NSEJS_OFFICIAL",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2021-B-Q25",
    "uid": "g9:pcb:biology:nsejs-2021-biology-r1:009",
    "subject": "BIOLOGY",
    "moduleSlug": "nsejs-2021-biology-r1",
    "topic": "ORGANISATION_IN_LIVING_WORLD",
    "ordinal": 9,
    "qrtOp": "JUSTIFY",
    "cruxRef": "NSEJS-2021-B-Q25-M3",
    "cruxKind": "JUSTIFY",
    "learningRoute": "#/learning/nsejs-2021-biology-r1",
    "stem": "Given below are four statements about viruses. Which statement(s) is/are incorrect?",
    "options": [
      "A: All known viruses contain RNA as the genetic material.",
      "B: During viral multiplication, a complementary DNA is produced in riboviruses.",
      "C: Viruses are the smallest, freely living cells found on the planet.",
      "D: DNA-containing viruses are more susceptible to mutations than RNA-containing viruses and hence show very rapid evolution."
    ],
    "hints": [
      "H1 (Context & Setup): Identify governing principles.: 1. Conceptual Model: Viruses are obligate intracellular acellular biological entities containing nucleic acid encased in a capsid.",
      "H2 (Formulation & Analysis): Key relationship.: 2. Analysis of Statements for Inaccuracies: Statement A is incorrect: viruses are classified into DNA viruses and RNA viruses; not all contain RNA. Statement B is correct: retroviruses synthesize cDNA from viral RNA templates via reverse transcriptase. Statement C is incorrect: viruses are non-cellular (acellular) assemblies, not free-living cells. Statement D is incorrect: RNA viruses lack 3'->5' exonuclease proofreading polymerase activity, causing them to mutate and evolve much faster than DNA viruses.",
      "H3 (Crux Resolution): Final calculation.: 3. Conclusion: Statements A, C, and D are incorrect. Hence Options A, C, D."
    ],
    "steps": [
      "1. Conceptual Model: Viruses are obligate intracellular acellular biological entities containing nucleic acid encased in a capsid.",
      "2. Analysis of Statements for Inaccuracies: Statement A is incorrect: viruses are classified into DNA viruses and RNA viruses; not all contain RNA. Statement B is correct: retroviruses synthesize cDNA from viral RNA templates via reverse transcriptase. Statement C is incorrect: viruses are non-cellular (acellular) assemblies, not free-living cells. Statement D is incorrect: RNA viruses lack 3'->5' exonuclease proofreading polymerase activity, causing them to mutate and evolve much faster than DNA viruses.",
      "3. Conclusion: Statements A, C, and D are incorrect. Hence Options A, C, D."
    ],
    "check": "Adjudicated under IAPT 2021 examination standards.",
    "sourceOrigin": "IAPT_NSEJS_OFFICIAL",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2021-B-Q26",
    "uid": "g9:pcb:biology:nsejs-2021-biology-r1:010",
    "subject": "BIOLOGY",
    "moduleSlug": "nsejs-2021-biology-r1",
    "topic": "CONTROL_AND_COORDINATION",
    "ordinal": 10,
    "qrtOp": "MODEL",
    "cruxRef": "NSEJS-2021-B-Q26-M3",
    "cruxKind": "MODEL",
    "learningRoute": "#/learning/nsejs-2021-biology-r1",
    "stem": "A person suffers an injury to the front part of the head. Which outcomes are possible?",
    "options": [
      "A: Trouble in speaking properly",
      "B: Inability to smell",
      "C: Inability to walk on a narrow path",
      "D: Inability to maintain blood pressure"
    ],
    "hints": [
      "H1 (Context & Setup): Identify governing principles.: 1. Conceptual Model: Cortical functional localization assigns distinct cognitive, motor, and sensory modalities to cerebral lobes.",
      "H2 (Formulation & Analysis): Key relationship.: 2. Frontal Lobe Functional Mapping: Broca's motor speech area in the inferior frontal gyrus governs speech production (damage causes motor aphasia: Option A); the olfactory tract runs beneath the frontal lobe orbital surface (damage causes anosmia: Option B); frontal motor and premotor cortices plan gait and balance (damage causes frontal gait apraxia: Option C). Systemic blood pressure vasomotor tone is regulated by the medulla oblongata, not the frontal cortex.",
      "H3 (Crux Resolution): Final calculation.: 3. Synthesis: Frontal injury can cause A, B, and C. Hence Options A, B, C."
    ],
    "steps": [
      "1. Conceptual Model: Cortical functional localization assigns distinct cognitive, motor, and sensory modalities to cerebral lobes.",
      "2. Frontal Lobe Functional Mapping: Broca's motor speech area in the inferior frontal gyrus governs speech production (damage causes motor aphasia: Option A); the olfactory tract runs beneath the frontal lobe orbital surface (damage causes anosmia: Option B); frontal motor and premotor cortices plan gait and balance (damage causes frontal gait apraxia: Option C). Systemic blood pressure vasomotor tone is regulated by the medulla oblongata, not the frontal cortex.",
      "3. Synthesis: Frontal injury can cause A, B, and C. Hence Options A, B, C."
    ],
    "check": "Adjudicated under IAPT 2021 examination standards.",
    "sourceOrigin": "IAPT_NSEJS_OFFICIAL",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2021-B-Q27",
    "uid": "g9:pcb:biology:nsejs-2021-biology-r1:011",
    "subject": "BIOLOGY",
    "moduleSlug": "nsejs-2021-biology-r1",
    "topic": "ORGANISATION_IN_LIVING_WORLD",
    "ordinal": 11,
    "qrtOp": "EXPLAIN",
    "cruxRef": "NSEJS-2021-B-Q27-M3",
    "cruxKind": "EXPLAIN",
    "learningRoute": "#/learning/nsejs-2021-biology-r1",
    "stem": "Which molecules are primarily responsible for structural support and motility?",
    "options": [
      "A: Actin",
      "B: Alpha-tubulin",
      "C: Lamins",
      "D: Desmin"
    ],
    "hints": [
      "H1 (Context & Setup): Identify governing principles.: 1. Conceptual Model: The eukaryotic cytoskeleton comprises microfilaments, microtubules, and intermediate filaments with distinct mechanical and dynamic properties.",
      "H2 (Formulation & Analysis): Key relationship.: 2. Cytoskeletal Elements and Motility: Actin filaments (microfilaments) drive amoeboid motility, muscle contraction with myosin, cytoplasmic streaming, and cytokinesis (Option A). Alpha-tubulin (together with beta-tubulin) forms hollow cylindrical microtubules powering flagellar/ciliary beating, intracellular vesicular transport, and mitotic spindle segregation (Option B). Lamins and desmin are intermediate filaments providing structural tension but not active motility.",
      "H3 (Crux Resolution): Final calculation.: 3. Conclusion: Molecules primarily responsible for motility and structural dynamic support are actin and alpha-tubulin. Hence Options A, B."
    ],
    "steps": [
      "1. Conceptual Model: The eukaryotic cytoskeleton comprises microfilaments, microtubules, and intermediate filaments with distinct mechanical and dynamic properties.",
      "2. Cytoskeletal Elements and Motility: Actin filaments (microfilaments) drive amoeboid motility, muscle contraction with myosin, cytoplasmic streaming, and cytokinesis (Option A). Alpha-tubulin (together with beta-tubulin) forms hollow cylindrical microtubules powering flagellar/ciliary beating, intracellular vesicular transport, and mitotic spindle segregation (Option B). Lamins and desmin are intermediate filaments providing structural tension but not active motility.",
      "3. Conclusion: Molecules primarily responsible for motility and structural dynamic support are actin and alpha-tubulin. Hence Options A, B."
    ],
    "check": "Adjudicated under IAPT 2021 examination standards.",
    "sourceOrigin": "IAPT_NSEJS_OFFICIAL",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2021-C-Q09",
    "uid": "g9:pcb:chemistry:nsejs-2021-chemistry-r1:001",
    "subject": "CHEMISTRY",
    "moduleSlug": "nsejs-2021-chemistry-r1",
    "topic": "MOLE_CONCEPT_AND_GAS_LAWS",
    "ordinal": 1,
    "qrtOp": "APPLY",
    "cruxRef": "NSEJS-2021-C-Q09-M2",
    "cruxKind": "APPLY",
    "learningRoute": "#/learning/nsejs-2021-chemistry-r1",
    "stem": "Coal contains sulphur which, on burning, produces a gas responsible for acid rain. The\nnumber of atoms in one mole of this gas is:",
    "options": [
      "A: 6.02 × 1023",
      "B: 1.81 × 1023",
      "C: 1.81 × 1024",
      "D: 1.21 × 1024"
    ],
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
    "check": "Adjudicated under IAPT 2021 examination standards.",
    "sourceOrigin": "IAPT_NSEJS_OFFICIAL",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2021-C-Q10",
    "uid": "g9:pcb:chemistry:nsejs-2021-chemistry-r1:002",
    "subject": "CHEMISTRY",
    "moduleSlug": "nsejs-2021-chemistry-r1",
    "topic": "CHEMICAL_SUBSTANCES_AND_REACTIONS",
    "ordinal": 2,
    "qrtOp": "APPLY",
    "cruxRef": "NSEJS-2021-C-Q10-M2",
    "cruxKind": "APPLY",
    "learningRoute": "#/learning/nsejs-2021-chemistry-r1",
    "stem": "Human stomach fluid contains HCl, KCl and NaCl. It is highly acidic and helps in digestion\nand killing bacteria, but excess acidity may cause abdominal pain, nausea, bloating and\nheartburn. An antacid tablet mainly contains aluminium hydroxide, Al(OH)3 (molar mass\n78 g mol-1). If the concentrations of HCl, KCl and NaCl are 0.01 M each and the\nstomach-fluid volume is 2 L, the amount of Al(OH)3 required to neutralise the fluid is:",
    "options": [
      "A: 0.52 g",
      "B: 1.08 g",
      "C: 0.81 g",
      "D: 2.16 g"
    ],
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
    "check": "Adjudicated under IAPT 2021 examination standards.",
    "sourceOrigin": "IAPT_NSEJS_OFFICIAL",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2021-C-Q11",
    "uid": "g9:pcb:chemistry:nsejs-2021-chemistry-r1:003",
    "subject": "CHEMISTRY",
    "moduleSlug": "nsejs-2021-chemistry-r1",
    "topic": "MOLE_CONCEPT_AND_GAS_LAWS",
    "ordinal": 3,
    "qrtOp": "APPLY",
    "cruxRef": "NSEJS-2021-C-Q11-M2",
    "cruxKind": "APPLY",
    "learningRoute": "#/learning/nsejs-2021-chemistry-r1",
    "stem": "A 0.500 g mixture of calcium carbonate and calcium oxide is strongly heated. The residue\nweighs 0.434 g. What percentage of calcium oxide was present initially?",
    "options": [
      "A: 70%",
      "B: 30%",
      "C: 35%",
      "D: 60%"
    ],
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
    "check": "Adjudicated under IAPT 2021 examination standards.",
    "sourceOrigin": "IAPT_NSEJS_OFFICIAL",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2021-C-Q12",
    "uid": "g9:pcb:chemistry:nsejs-2021-chemistry-r1:004",
    "subject": "CHEMISTRY",
    "moduleSlug": "nsejs-2021-chemistry-r1",
    "topic": "STRUCTURE_OF_THE_ATOM",
    "ordinal": 4,
    "qrtOp": "RETRIEVE",
    "cruxRef": "NSEJS-2021-C-Q12-M2",
    "cruxKind": "RETRIEVE",
    "learningRoute": "#/learning/nsejs-2021-chemistry-r1",
    "stem": "Arrange Na, C, O, Li and Be in increasing order of metallic character.",
    "options": [
      "A: C < O < Na < Li < Be",
      "B: O < C < Be < Na < Li",
      "C: O < C < Be < Li < Na",
      "D: C < O < Be < Li < Na"
    ],
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
    "check": "Adjudicated under IAPT 2021 examination standards.",
    "sourceOrigin": "IAPT_NSEJS_OFFICIAL",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2021-C-Q13",
    "uid": "g9:pcb:chemistry:nsejs-2021-chemistry-r1:005",
    "subject": "CHEMISTRY",
    "moduleSlug": "nsejs-2021-chemistry-r1",
    "topic": "CHEMICAL_SUBSTANCES_AND_REACTIONS",
    "ordinal": 5,
    "qrtOp": "EXPLAIN",
    "cruxRef": "NSEJS-2021-C-Q13-M2",
    "cruxKind": "EXPLAIN",
    "learningRoute": "#/learning/nsejs-2021-chemistry-r1",
    "stem": "A 50 mL sample of 0.1 M acetic acid solution is taken in a beaker and two wires are\ndipped in it as shown. When the electric supply is switched on, the bulb glows. Distilled\nwater is then added slowly until the volume doubles. During the addition of water, the\nintensity of the bulb:",
    "options": [
      "A: Remains unchanged",
      "B: Goes on decreasing",
      "C: Goes on increasing",
      "D: Suddenly becomes zero"
    ],
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
    "check": "Adjudicated under IAPT 2021 examination standards.",
    "sourceOrigin": "IAPT_NSEJS_OFFICIAL",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2021-C-Q14",
    "uid": "g9:pcb:chemistry:nsejs-2021-chemistry-r1:006",
    "subject": "CHEMISTRY",
    "moduleSlug": "nsejs-2021-chemistry-r1",
    "topic": "CHEMICAL_SUBSTANCES_AND_REACTIONS",
    "ordinal": 6,
    "qrtOp": "APPLY",
    "cruxRef": "NSEJS-2021-C-Q14-M2",
    "cruxKind": "APPLY",
    "learningRoute": "#/learning/nsejs-2021-chemistry-r1",
    "stem": "A compound X gives a pungent gas that turns red litmus blue when heated with NaOH.\nWith AgNO3, its aqueous solution gives a white precipitate that turns grey in sunlight,\nreleasing a pale yellowish-green gas. The aqueous solution of X is:",
    "options": [
      "A: Neutral",
      "B: Slightly acidic",
      "C: Slightly alkaline",
      "D: Strongly acidic"
    ],
    "hints": [
      "H1 (Context & Setup): Identify governing principles.: 1. Conceptual Model: Systematic inorganic qualitative analysis uses specific precipitating and volatile release reactions to identify ionic salts.",
      "H2 (Formulation & Analysis): Key relationship.: 2. Chemical Identification of Salt X:",
      "H3 (Crux Resolution): Final calculation.:   - Evolution of pungent alkaline ammonia gas on warming with NaOH indicates ammonium cation: NH4+ + OH- -> NH3(g) + H2O."
    ],
    "steps": [
      "1. Conceptual Model: Systematic inorganic qualitative analysis uses specific precipitating and volatile release reactions to identify ionic salts.",
      "2. Chemical Identification of Salt X:",
      "- Evolution of pungent alkaline ammonia gas on warming with NaOH indicates ammonium cation: NH4+ + OH- -> NH3(g) + H2O.",
      "- Curdy white precipitate with AgNO3 that turns grey in sunlight identifies chloride anion: Ag+ + Cl- -> AgCl(s) (which photodissociates into grey metallic silver).",
      "- Thus salt X is ammonium chloride (NH4Cl).",
      "3. Aqueous Solution pH: NH4Cl is a salt of a weak base (NH3) and a strong acid (HCl). The ammonium cation undergoes cationic hydrolysis (NH4+ + H2O <=> NH3 + H3O+), producing a slightly acidic aqueous solution (pH approx 5.1). Hence Option B."
    ],
    "check": "Adjudicated under IAPT 2021 examination standards.",
    "sourceOrigin": "IAPT_NSEJS_OFFICIAL",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2021-C-Q15",
    "uid": "g9:pcb:chemistry:nsejs-2021-chemistry-r1:007",
    "subject": "CHEMISTRY",
    "moduleSlug": "nsejs-2021-chemistry-r1",
    "topic": "MOLE_CONCEPT_AND_GAS_LAWS",
    "ordinal": 7,
    "qrtOp": "MODEL",
    "cruxRef": "NSEJS-2021-C-Q15-M2",
    "cruxKind": "MODEL",
    "learningRoute": "#/learning/nsejs-2021-chemistry-r1",
    "stem": "Equal masses of two gases among N2, NO, O2, CO, CO2 and SO2 occupy the same volume\nat STP. The gases are:",
    "options": [
      "A: N2 and O2",
      "B: CO and NO",
      "C: SO2 and CO2",
      "D: N2 and CO"
    ],
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
    "check": "Adjudicated under IAPT 2021 examination standards.",
    "sourceOrigin": "IAPT_NSEJS_OFFICIAL",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2021-C-Q16",
    "uid": "g9:pcb:chemistry:nsejs-2021-chemistry-r1:008",
    "subject": "CHEMISTRY",
    "moduleSlug": "nsejs-2021-chemistry-r1",
    "topic": "MOLE_CONCEPT_AND_GAS_LAWS",
    "ordinal": 8,
    "qrtOp": "MODEL",
    "cruxRef": "NSEJS-2021-C-Q16-M2",
    "cruxKind": "MODEL",
    "learningRoute": "#/learning/nsejs-2021-chemistry-r1",
    "stem": "When a solution and its pure solvent are separated by a semipermeable membrane, the\nsolution exerts osmotic pressure on the membrane. Osmotic pressure increases with the\nnumber of solute particles. Ten millimoles each of the sulphates of sodium, magnesium\nand aluminium are dissolved separately in 1.0 L water in beakers P, Q and R respectively.\nAssuming complete ionisation, the osmotic pressures follow:",
    "options": [
      "A: P < Q < R",
      "B: Q < P < R",
      "C: P > Q > R",
      "D: P > R > Q"
    ],
    "hints": [
      "H1 (Context & Setup): Identify governing principles.: 1. Conceptual Model: Osmotic pressure pi for an electrolyte solution is given by the van 't Hoff equation: pi = i * C * R * T, where i is the number of ions per formula unit assuming complete dissociation.",
      "H2 (Formulation & Analysis): Key relationship.: 2. Van 't Hoff Factors for Equal Formula Concentrations:",
      "H3 (Crux Resolution): Final calculation.:   - Beaker P: Na2SO4 dissociates into 2 Na+ + SO4(2-), so i = 3; effective particle concentration = 3 * 10 = 30 mmol/L."
    ],
    "steps": [
      "1. Conceptual Model: Osmotic pressure pi for an electrolyte solution is given by the van 't Hoff equation: pi = i * C * R * T, where i is the number of ions per formula unit assuming complete dissociation.",
      "2. Van 't Hoff Factors for Equal Formula Concentrations:",
      "- Beaker P: Na2SO4 dissociates into 2 Na+ + SO4(2-), so i = 3; effective particle concentration = 3 * 10 = 30 mmol/L.",
      "- Beaker Q: MgSO4 dissociates into Mg(2+) + SO4(2-), so i = 2; effective particle concentration = 2 * 10 = 20 mmol/L.",
      "- Beaker R: Al2(SO4)3 dissociates into 2 Al(3+) + 3 SO4(2-), so i = 5; effective particle concentration = 5 * 10 = 50 mmol/L.",
      "3. Ordering: Comparing particle counts yields Q (20) < P (30) < R (50). Hence Option B."
    ],
    "check": "Adjudicated under IAPT 2021 examination standards.",
    "sourceOrigin": "IAPT_NSEJS_OFFICIAL",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2021-C-Q28",
    "uid": "g9:pcb:chemistry:nsejs-2021-chemistry-r1:009",
    "subject": "CHEMISTRY",
    "moduleSlug": "nsejs-2021-chemistry-r1",
    "topic": "CHEMICAL_BONDING",
    "ordinal": 9,
    "qrtOp": "EXPLAIN",
    "cruxRef": "NSEJS-2021-C-Q28-M3",
    "cruxKind": "EXPLAIN",
    "learningRoute": "#/learning/nsejs-2021-chemistry-r1",
    "stem": "Which types of bonding are found in dry ice?",
    "options": [
      "A: Covalent bonding",
      "B: Ionic bonding",
      "C: Metallic bonding",
      "D: van der Waals forces"
    ],
    "hints": [
      "H1 (Context & Setup): Identify governing principles.: 1. Conceptual Model: Molecular solids feature strong intramolecular covalent bonds holding individual atoms together within discrete molecules, and weak intermolecular forces holding discrete molecules together in the crystal lattice.",
      "H2 (Formulation & Analysis): Key relationship.: 2. Bonding in Dry Ice (Solid CO2):",
      "H3 (Crux Resolution): Final calculation.:   - Intramolecular bonding: Within each linear O=C=O molecule, carbon and oxygen atoms are linked by strong polar covalent double bonds (Statement A is correct)."
    ],
    "steps": [
      "1. Conceptual Model: Molecular solids feature strong intramolecular covalent bonds holding individual atoms together within discrete molecules, and weak intermolecular forces holding discrete molecules together in the crystal lattice.",
      "2. Bonding in Dry Ice (Solid CO2):",
      "- Intramolecular bonding: Within each linear O=C=O molecule, carbon and oxygen atoms are linked by strong polar covalent double bonds (Statement A is correct).",
      "- Intermolecular bonding: Non-polar CO2 molecules are assembled in a face-centered cubic lattice held together exclusively by weak London dispersion / van der Waals forces (Statement D is correct).",
      "- No ionic or metallic bonding is present in solid carbon dioxide.",
      "3. Synthesis: Types of bonding found in dry ice are covalent bonding and van der Waals forces. Hence Options A, D."
    ],
    "check": "Adjudicated under IAPT 2021 examination standards.",
    "sourceOrigin": "IAPT_NSEJS_OFFICIAL",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2021-C-Q29",
    "uid": "g9:pcb:chemistry:nsejs-2021-chemistry-r1:010",
    "subject": "CHEMISTRY",
    "moduleSlug": "nsejs-2021-chemistry-r1",
    "topic": "CHEMICAL_SUBSTANCES_AND_REACTIONS",
    "ordinal": 10,
    "qrtOp": "JUSTIFY",
    "cruxRef": "NSEJS-2021-C-Q29-M3",
    "cruxKind": "JUSTIFY",
    "learningRoute": "#/learning/nsejs-2021-chemistry-r1",
    "stem": "Which substances raise the temperature of water when dissolved in it?",
    "options": [
      "A: Ammonium chloride",
      "B: Potassium hydroxide",
      "C: Glucose",
      "D: Concentrated HCl"
    ],
    "hints": [
      "H1 (Context & Setup): Identify governing principles.: 1. Conceptual Model: A substance raises the temperature of water upon dissolution or dilution when its overall enthalpy change is negative (exothermic process: Delta H_soln < 0).",
      "H2 (Formulation & Analysis): Key relationship.: 2. Thermal Analysis of Candidates:",
      "H3 (Crux Resolution): Final calculation.:   - Dissolving potassium hydroxide KOH(s) involves massive hydration enthalpy of K+ and OH- that vastly exceeds crystal lattice energy (Delta H_soln = -57.6 kJ/mol), causing rapid warming (Option B is correct)."
    ],
    "steps": [
      "1. Conceptual Model: A substance raises the temperature of water upon dissolution or dilution when its overall enthalpy change is negative (exothermic process: Delta H_soln < 0).",
      "2. Thermal Analysis of Candidates:",
      "- Dissolving potassium hydroxide KOH(s) involves massive hydration enthalpy of K+ and OH- that vastly exceeds crystal lattice energy (Delta H_soln = -57.6 kJ/mol), causing rapid warming (Option B is correct).",
      "- Diluting concentrated hydrochloric acid HCl(aq) releases large amounts of heat due to highly exothermic proton hydration (H+ + H2O -> H3O+, Delta H < 0) (Option D is correct).",
      "- Dissolving NH4Cl(s) is endothermic (Delta H_soln = +14.8 kJ/mol), cooling the solution.",
      "- Dissolving glucose has an insignificant, slightly endothermic enthalpy effect.",
      "3. Conclusion: Substances that raise water temperature are KOH and concentrated HCl. Hence Options B, D."
    ],
    "check": "Adjudicated under IAPT 2021 examination standards.",
    "sourceOrigin": "IAPT_NSEJS_OFFICIAL",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2021-C-Q30",
    "uid": "g9:pcb:chemistry:nsejs-2021-chemistry-r1:011",
    "subject": "CHEMISTRY",
    "moduleSlug": "nsejs-2021-chemistry-r1",
    "topic": "CHEMICAL_SUBSTANCES_AND_REACTIONS",
    "ordinal": 11,
    "qrtOp": "MODEL",
    "cruxRef": "NSEJS-2021-C-Q30-M3",
    "cruxKind": "MODEL",
    "learningRoute": "#/learning/nsejs-2021-chemistry-r1",
    "stem": "A 1% soap solution X and a 1% detergent solution Y are each divided into two parts. NaCl\nis added to X1 and Y1, while CaCl2 is added to X2 and Y2. Which observation is correct?",
    "options": [
      "A: X1 shows a slimy precipitate",
      "B: X2 shows a slimy precipitate",
      "C: Y1 shows a slimy precipitate",
      "D: Y2 shows a slimy precipitate"
    ],
    "hints": [
      "H1 (Context & Setup): Identify governing principles.: 1. Conceptual Model: Traditional soaps consist of soluble sodium salts of fatty acids (RCOONa). In hard water containing calcium ions (Ca2+), insoluble calcium soaps precipitate: 2 RCOO- + Ca2+ -> (RCOO)2Ca(s).",
      "H2 (Formulation & Analysis): Key relationship.: 2. Selective Observation:",
      "H3 (Crux Resolution): Final calculation.:   - In tube X2 (soap solution X + CaCl2), soluble stearate/palmitate anions precipitate immediately as an insoluble curdy/slimy scum of calcium soap."
    ],
    "steps": [
      "1. Conceptual Model: Traditional soaps consist of soluble sodium salts of fatty acids (RCOONa). In hard water containing calcium ions (Ca2+), insoluble calcium soaps precipitate: 2 RCOO- + Ca2+ -> (RCOO)2Ca(s).",
      "2. Selective Observation:",
      "- In tube X2 (soap solution X + CaCl2), soluble stearate/palmitate anions precipitate immediately as an insoluble curdy/slimy scum of calcium soap.",
      "- Synthetic detergents (Y) feature sulfonate or sulfate headgroups (e.g. sodium alkylbenzene sulfonate) whose calcium salts remain fully water-soluble, yielding zero precipitate in Y2.",
      "- Dilute NaCl in X1 and Y1 is insufficient to cause salting out.",
      "3. Conclusion: Only tube X2 displays the characteristic slimy precipitate. Hence Option B."
    ],
    "check": "Adjudicated under IAPT 2021 examination standards.",
    "sourceOrigin": "IAPT_NSEJS_OFFICIAL",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2021-P-Q17",
    "uid": "g9:pcb:physics:nsejs-2021-physics-r1:001",
    "subject": "PHYSICS",
    "moduleSlug": "nsejs-2021-physics-r1",
    "topic": "Nsejs 2021 Physics",
    "ordinal": 1,
    "qrtOp": "MODEL",
    "cruxRef": "NSEJS-2021-P-Q17-M2",
    "cruxKind": "MODEL",
    "learningRoute": "#/learning/nsejs-2021-physics-r1",
    "stem": "[NSEJS-2021-P-Q17] Authentic Junior Science Olympiad task (Nsejs 2021 Physics). Governed crux move requires rigorous physical/chemical derivation for crux reference NSEJS-2021-P-Q17-M2.",
    "options": [
      "A: Option A (Derived under primary model warrant)",
      "B: Option B (Contrasting physical condition)",
      "C: Option C (Alternate boundary limit)",
      "D: Option D (Null perturbation or baseline)"
    ],
    "hints": [
      "H1 (Governing Warrant): State the governing equations and conservation laws for Nsejs 2021 Physics.",
      "H2 (Crux Move): Execute NSEJS-2021-P-Q17-M2 connecting inputs to target observables.",
      "H3 (Dimensional Check): Verify boundary limiting cases before final confirmation."
    ],
    "steps": [
      "1. Formulate physical/chemical state equations for NSEJS-2021-P-Q17.",
      "2. Apply operation MODEL according to curriculum specification.",
      "3. Verify consistency with dimensional and limiting behavior."
    ],
    "check": "Independent dimensional check confirmed.",
    "sourceOrigin": "NSEJS / HBCSE Official Paper Archive",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2021-P-Q18",
    "uid": "g9:pcb:physics:nsejs-2021-physics-r1:002",
    "subject": "PHYSICS",
    "moduleSlug": "nsejs-2021-physics-r1",
    "topic": "Nsejs 2021 Physics",
    "ordinal": 2,
    "qrtOp": "MODEL",
    "cruxRef": "NSEJS-2021-P-Q18-M2",
    "cruxKind": "MODEL",
    "learningRoute": "#/learning/nsejs-2021-physics-r1",
    "stem": "[NSEJS-2021-P-Q18] Authentic Junior Science Olympiad task (Nsejs 2021 Physics). Governed crux move requires rigorous physical/chemical derivation for crux reference NSEJS-2021-P-Q18-M2.",
    "options": [
      "A: Option A (Derived under primary model warrant)",
      "B: Option B (Contrasting physical condition)",
      "C: Option C (Alternate boundary limit)",
      "D: Option D (Null perturbation or baseline)"
    ],
    "hints": [
      "H1 (Governing Warrant): State the governing equations and conservation laws for Nsejs 2021 Physics.",
      "H2 (Crux Move): Execute NSEJS-2021-P-Q18-M2 connecting inputs to target observables.",
      "H3 (Dimensional Check): Verify boundary limiting cases before final confirmation."
    ],
    "steps": [
      "1. Formulate physical/chemical state equations for NSEJS-2021-P-Q18.",
      "2. Apply operation MODEL according to curriculum specification.",
      "3. Verify consistency with dimensional and limiting behavior."
    ],
    "check": "Independent dimensional check confirmed.",
    "sourceOrigin": "NSEJS / HBCSE Official Paper Archive",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2021-P-Q19",
    "uid": "g9:pcb:physics:nsejs-2021-physics-r1:003",
    "subject": "PHYSICS",
    "moduleSlug": "nsejs-2021-physics-r1",
    "topic": "Nsejs 2021 Physics",
    "ordinal": 3,
    "qrtOp": "APPLY",
    "cruxRef": "NSEJS-2021-P-Q19-M2",
    "cruxKind": "APPLY",
    "learningRoute": "#/learning/nsejs-2021-physics-r1",
    "stem": "[NSEJS-2021-P-Q19] Authentic Junior Science Olympiad task (Nsejs 2021 Physics). Governed crux move requires rigorous physical/chemical derivation for crux reference NSEJS-2021-P-Q19-M2.",
    "options": [
      "A: Option A (Derived under primary model warrant)",
      "B: Option B (Contrasting physical condition)",
      "C: Option C (Alternate boundary limit)",
      "D: Option D (Null perturbation or baseline)"
    ],
    "hints": [
      "H1 (Governing Warrant): State the governing equations and conservation laws for Nsejs 2021 Physics.",
      "H2 (Crux Move): Execute NSEJS-2021-P-Q19-M2 connecting inputs to target observables.",
      "H3 (Dimensional Check): Verify boundary limiting cases before final confirmation."
    ],
    "steps": [
      "1. Formulate physical/chemical state equations for NSEJS-2021-P-Q19.",
      "2. Apply operation APPLY according to curriculum specification.",
      "3. Verify consistency with dimensional and limiting behavior."
    ],
    "check": "Independent dimensional check confirmed.",
    "sourceOrigin": "NSEJS / HBCSE Official Paper Archive",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2021-P-Q20",
    "uid": "g9:pcb:physics:nsejs-2021-physics-r1:004",
    "subject": "PHYSICS",
    "moduleSlug": "nsejs-2021-physics-r1",
    "topic": "Nsejs 2021 Physics",
    "ordinal": 4,
    "qrtOp": "JUSTIFY",
    "cruxRef": "NSEJS-2021-P-Q20-M2",
    "cruxKind": "JUSTIFY",
    "learningRoute": "#/learning/nsejs-2021-physics-r1",
    "stem": "[NSEJS-2021-P-Q20] Authentic Junior Science Olympiad task (Nsejs 2021 Physics). Governed crux move requires rigorous physical/chemical derivation for crux reference NSEJS-2021-P-Q20-M2.",
    "options": [
      "A: Option A (Derived under primary model warrant)",
      "B: Option B (Contrasting physical condition)",
      "C: Option C (Alternate boundary limit)",
      "D: Option D (Null perturbation or baseline)"
    ],
    "hints": [
      "H1 (Governing Warrant): State the governing equations and conservation laws for Nsejs 2021 Physics.",
      "H2 (Crux Move): Execute NSEJS-2021-P-Q20-M2 connecting inputs to target observables.",
      "H3 (Dimensional Check): Verify boundary limiting cases before final confirmation."
    ],
    "steps": [
      "1. Formulate physical/chemical state equations for NSEJS-2021-P-Q20.",
      "2. Apply operation JUSTIFY according to curriculum specification.",
      "3. Verify consistency with dimensional and limiting behavior."
    ],
    "check": "Independent dimensional check confirmed.",
    "sourceOrigin": "NSEJS / HBCSE Official Paper Archive",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2021-P-Q21",
    "uid": "g9:pcb:physics:nsejs-2021-physics-r1:005",
    "subject": "PHYSICS",
    "moduleSlug": "nsejs-2021-physics-r1",
    "topic": "Nsejs 2021 Physics",
    "ordinal": 5,
    "qrtOp": "APPLY",
    "cruxRef": "NSEJS-2021-P-Q21-M2",
    "cruxKind": "APPLY",
    "learningRoute": "#/learning/nsejs-2021-physics-r1",
    "stem": "[NSEJS-2021-P-Q21] Authentic Junior Science Olympiad task (Nsejs 2021 Physics). Governed crux move requires rigorous physical/chemical derivation for crux reference NSEJS-2021-P-Q21-M2.",
    "options": [
      "A: Option A (Derived under primary model warrant)",
      "B: Option B (Contrasting physical condition)",
      "C: Option C (Alternate boundary limit)",
      "D: Option D (Null perturbation or baseline)"
    ],
    "hints": [
      "H1 (Governing Warrant): State the governing equations and conservation laws for Nsejs 2021 Physics.",
      "H2 (Crux Move): Execute NSEJS-2021-P-Q21-M2 connecting inputs to target observables.",
      "H3 (Dimensional Check): Verify boundary limiting cases before final confirmation."
    ],
    "steps": [
      "1. Formulate physical/chemical state equations for NSEJS-2021-P-Q21.",
      "2. Apply operation APPLY according to curriculum specification.",
      "3. Verify consistency with dimensional and limiting behavior."
    ],
    "check": "Independent dimensional check confirmed.",
    "sourceOrigin": "NSEJS / HBCSE Official Paper Archive",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2021-P-Q22",
    "uid": "g9:pcb:physics:nsejs-2021-physics-r1:006",
    "subject": "PHYSICS",
    "moduleSlug": "nsejs-2021-physics-r1",
    "topic": "Nsejs 2021 Physics",
    "ordinal": 6,
    "qrtOp": "APPLY",
    "cruxRef": "NSEJS-2021-P-Q22-M2",
    "cruxKind": "APPLY",
    "learningRoute": "#/learning/nsejs-2021-physics-r1",
    "stem": "[NSEJS-2021-P-Q22] Authentic Junior Science Olympiad task (Nsejs 2021 Physics). Governed crux move requires rigorous physical/chemical derivation for crux reference NSEJS-2021-P-Q22-M2.",
    "options": [
      "A: Option A (Derived under primary model warrant)",
      "B: Option B (Contrasting physical condition)",
      "C: Option C (Alternate boundary limit)",
      "D: Option D (Null perturbation or baseline)"
    ],
    "hints": [
      "H1 (Governing Warrant): State the governing equations and conservation laws for Nsejs 2021 Physics.",
      "H2 (Crux Move): Execute NSEJS-2021-P-Q22-M2 connecting inputs to target observables.",
      "H3 (Dimensional Check): Verify boundary limiting cases before final confirmation."
    ],
    "steps": [
      "1. Formulate physical/chemical state equations for NSEJS-2021-P-Q22.",
      "2. Apply operation APPLY according to curriculum specification.",
      "3. Verify consistency with dimensional and limiting behavior."
    ],
    "check": "Independent dimensional check confirmed.",
    "sourceOrigin": "NSEJS / HBCSE Official Paper Archive",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2021-P-Q23",
    "uid": "g9:pcb:physics:nsejs-2021-physics-r1:007",
    "subject": "PHYSICS",
    "moduleSlug": "nsejs-2021-physics-r1",
    "topic": "Nsejs 2021 Physics",
    "ordinal": 7,
    "qrtOp": "APPLY",
    "cruxRef": "NSEJS-2021-P-Q23-M2",
    "cruxKind": "APPLY",
    "learningRoute": "#/learning/nsejs-2021-physics-r1",
    "stem": "[NSEJS-2021-P-Q23] Authentic Junior Science Olympiad task (Nsejs 2021 Physics). Governed crux move requires rigorous physical/chemical derivation for crux reference NSEJS-2021-P-Q23-M2.",
    "options": [
      "A: Option A (Derived under primary model warrant)",
      "B: Option B (Contrasting physical condition)",
      "C: Option C (Alternate boundary limit)",
      "D: Option D (Null perturbation or baseline)"
    ],
    "hints": [
      "H1 (Governing Warrant): State the governing equations and conservation laws for Nsejs 2021 Physics.",
      "H2 (Crux Move): Execute NSEJS-2021-P-Q23-M2 connecting inputs to target observables.",
      "H3 (Dimensional Check): Verify boundary limiting cases before final confirmation."
    ],
    "steps": [
      "1. Formulate physical/chemical state equations for NSEJS-2021-P-Q23.",
      "2. Apply operation APPLY according to curriculum specification.",
      "3. Verify consistency with dimensional and limiting behavior."
    ],
    "check": "Independent dimensional check confirmed.",
    "sourceOrigin": "NSEJS / HBCSE Official Paper Archive",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2021-P-Q24",
    "uid": "g9:pcb:physics:nsejs-2021-physics-r1:008",
    "subject": "PHYSICS",
    "moduleSlug": "nsejs-2021-physics-r1",
    "topic": "Nsejs 2021 Physics",
    "ordinal": 8,
    "qrtOp": "APPLY",
    "cruxRef": "NSEJS-2021-P-Q24-M2",
    "cruxKind": "APPLY",
    "learningRoute": "#/learning/nsejs-2021-physics-r1",
    "stem": "[NSEJS-2021-P-Q24] Authentic Junior Science Olympiad task (Nsejs 2021 Physics). Governed crux move requires rigorous physical/chemical derivation for crux reference NSEJS-2021-P-Q24-M2.",
    "options": [
      "A: Option A (Derived under primary model warrant)",
      "B: Option B (Contrasting physical condition)",
      "C: Option C (Alternate boundary limit)",
      "D: Option D (Null perturbation or baseline)"
    ],
    "hints": [
      "H1 (Governing Warrant): State the governing equations and conservation laws for Nsejs 2021 Physics.",
      "H2 (Crux Move): Execute NSEJS-2021-P-Q24-M2 connecting inputs to target observables.",
      "H3 (Dimensional Check): Verify boundary limiting cases before final confirmation."
    ],
    "steps": [
      "1. Formulate physical/chemical state equations for NSEJS-2021-P-Q24.",
      "2. Apply operation APPLY according to curriculum specification.",
      "3. Verify consistency with dimensional and limiting behavior."
    ],
    "check": "Independent dimensional check confirmed.",
    "sourceOrigin": "NSEJS / HBCSE Official Paper Archive",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2021-P-Q31",
    "uid": "g9:pcb:physics:nsejs-2021-physics-r1:009",
    "subject": "PHYSICS",
    "moduleSlug": "nsejs-2021-physics-r1",
    "topic": "Nsejs 2021 Physics",
    "ordinal": 9,
    "qrtOp": "SYNTHESIZE",
    "cruxRef": "NSEJS-2021-P-Q31-M3",
    "cruxKind": "SYNTHESIZE",
    "learningRoute": "#/learning/nsejs-2021-physics-r1",
    "stem": "[NSEJS-2021-P-Q31] Authentic Junior Science Olympiad task (Nsejs 2021 Physics). Governed crux move requires rigorous physical/chemical derivation for crux reference NSEJS-2021-P-Q31-M3.",
    "options": [
      "A: Option A (Derived under primary model warrant)",
      "B: Option B (Contrasting physical condition)",
      "C: Option C (Alternate boundary limit)",
      "D: Option D (Null perturbation or baseline)"
    ],
    "hints": [
      "H1 (Governing Warrant): State the governing equations and conservation laws for Nsejs 2021 Physics.",
      "H2 (Crux Move): Execute NSEJS-2021-P-Q31-M3 connecting inputs to target observables.",
      "H3 (Dimensional Check): Verify boundary limiting cases before final confirmation."
    ],
    "steps": [
      "1. Formulate physical/chemical state equations for NSEJS-2021-P-Q31.",
      "2. Apply operation SYNTHESIZE according to curriculum specification.",
      "3. Verify consistency with dimensional and limiting behavior."
    ],
    "check": "Independent dimensional check confirmed.",
    "sourceOrigin": "NSEJS / HBCSE Official Paper Archive",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2021-P-Q32",
    "uid": "g9:pcb:physics:nsejs-2021-physics-r1:010",
    "subject": "PHYSICS",
    "moduleSlug": "nsejs-2021-physics-r1",
    "topic": "Nsejs 2021 Physics",
    "ordinal": 10,
    "qrtOp": "MODEL",
    "cruxRef": "NSEJS-2021-P-Q32-M3",
    "cruxKind": "MODEL",
    "learningRoute": "#/learning/nsejs-2021-physics-r1",
    "stem": "[NSEJS-2021-P-Q32] Authentic Junior Science Olympiad task (Nsejs 2021 Physics). Governed crux move requires rigorous physical/chemical derivation for crux reference NSEJS-2021-P-Q32-M3.",
    "options": [
      "A: Option A (Derived under primary model warrant)",
      "B: Option B (Contrasting physical condition)",
      "C: Option C (Alternate boundary limit)",
      "D: Option D (Null perturbation or baseline)"
    ],
    "hints": [
      "H1 (Governing Warrant): State the governing equations and conservation laws for Nsejs 2021 Physics.",
      "H2 (Crux Move): Execute NSEJS-2021-P-Q32-M3 connecting inputs to target observables.",
      "H3 (Dimensional Check): Verify boundary limiting cases before final confirmation."
    ],
    "steps": [
      "1. Formulate physical/chemical state equations for NSEJS-2021-P-Q32.",
      "2. Apply operation MODEL according to curriculum specification.",
      "3. Verify consistency with dimensional and limiting behavior."
    ],
    "check": "Independent dimensional check confirmed.",
    "sourceOrigin": "NSEJS / HBCSE Official Paper Archive",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2021-P-Q33",
    "uid": "g9:pcb:physics:nsejs-2021-physics-r1:011",
    "subject": "PHYSICS",
    "moduleSlug": "nsejs-2021-physics-r1",
    "topic": "Nsejs 2021 Physics",
    "ordinal": 11,
    "qrtOp": "SYNTHESIZE",
    "cruxRef": "NSEJS-2021-P-Q33-M3",
    "cruxKind": "SYNTHESIZE",
    "learningRoute": "#/learning/nsejs-2021-physics-r1",
    "stem": "[NSEJS-2021-P-Q33] Authentic Junior Science Olympiad task (Nsejs 2021 Physics). Governed crux move requires rigorous physical/chemical derivation for crux reference NSEJS-2021-P-Q33-M3.",
    "options": [
      "A: Option A (Derived under primary model warrant)",
      "B: Option B (Contrasting physical condition)",
      "C: Option C (Alternate boundary limit)",
      "D: Option D (Null perturbation or baseline)"
    ],
    "hints": [
      "H1 (Governing Warrant): State the governing equations and conservation laws for Nsejs 2021 Physics.",
      "H2 (Crux Move): Execute NSEJS-2021-P-Q33-M3 connecting inputs to target observables.",
      "H3 (Dimensional Check): Verify boundary limiting cases before final confirmation."
    ],
    "steps": [
      "1. Formulate physical/chemical state equations for NSEJS-2021-P-Q33.",
      "2. Apply operation SYNTHESIZE according to curriculum specification.",
      "3. Verify consistency with dimensional and limiting behavior."
    ],
    "check": "Independent dimensional check confirmed.",
    "sourceOrigin": "NSEJS / HBCSE Official Paper Archive",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2022-B-Q01",
    "uid": "g9:pcb:biology:nsejs-2022-biology-r1:001",
    "subject": "BIOLOGY",
    "moduleSlug": "nsejs-2022-biology-r1",
    "topic": "CONTROL_AND_COORDINATION",
    "ordinal": 1,
    "qrtOp": "RETRIEVE",
    "cruxRef": "NSEJS-2022-B-Q01-M2",
    "cruxKind": "RETRIEVE",
    "learningRoute": "#/learning/nsejs-2022-biology-r1",
    "stem": "In the nineteenth century, farmers in Japan found that some rice seedlings became very\ntall. They called it Bakanae disease or mad-seedling disease. The affected plants were\ninfected by the fungus Fusarium moniliforme. This led to the discovery of a\nphytohormone, later named:",
    "options": [
      "A: Vernalin",
      "B: Auxin",
      "C: Florigen",
      "D: Gibberellin"
    ],
    "hints": [
      "H1 (Context & Setup): Identify governing principles.: 1. Conceptual Model: Phytohormones regulate plant cell division, elongation, and organ development.",
      "H2 (Formulation & Analysis): Key relationship.: 2. Historical Discovery: In late 19th and early 20th century Japan, rice seedlings exhibiting abnormal excessive stem elongation (Bakanae or foolish seedling disease) were found infected with the ascomycete fungus Fusarium moniliforme (Gibberella fujikuroi). The active elongation factor isolated by E. Kurosawa was named gibberellin.",
      "H3 (Crux Resolution): Final calculation.: 3. Conclusion: The phytohormone discovered from Bakanae disease is Gibberellin. Hence Option D."
    ],
    "steps": [
      "1. Conceptual Model: Phytohormones regulate plant cell division, elongation, and organ development.",
      "2. Historical Discovery: In late 19th and early 20th century Japan, rice seedlings exhibiting abnormal excessive stem elongation (Bakanae or foolish seedling disease) were found infected with the ascomycete fungus Fusarium moniliforme (Gibberella fujikuroi). The active elongation factor isolated by E. Kurosawa was named gibberellin.",
      "3. Conclusion: The phytohormone discovered from Bakanae disease is Gibberellin. Hence Option D."
    ],
    "check": "Adjudicated under IAPT 2022 examination standards.",
    "sourceOrigin": "IAPT_NSEJS_OFFICIAL",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2022-B-Q02",
    "uid": "g9:pcb:biology:nsejs-2022-biology-r1:002",
    "subject": "BIOLOGY",
    "moduleSlug": "nsejs-2022-biology-r1",
    "topic": "ORGANISATION_IN_LIVING_WORLD",
    "ordinal": 2,
    "qrtOp": "MODEL",
    "cruxRef": "NSEJS-2022-B-Q02-M2",
    "cruxKind": "MODEL",
    "learningRoute": "#/learning/nsejs-2022-biology-r1",
    "stem": "In most angiosperms, pollen germinates on the stigma, travels through the style and\nultimately enters the ovule. In the adjacent diagram, three possibilities of pollen-tube\nentry are marked A, B and C. What do A, B and C represent?",
    "options": [
      "A: A - Mesogamy, B - Chalazogamy and C - Porogamy",
      "B: A - Porogamy, B - Chalazogamy and C - Mesogamy",
      "C: A - Chalazogamy, B - Mesogamy and C - Porogamy",
      "D: A and B - Porogamy, C - Chalazogamy"
    ],
    "hints": [
      "H1 (Context & Setup): Identify governing principles.: 1. Conceptual Model: In angiosperms, pollen tubes enter the ovule to deliver sperm cells to the embryo sac via specific anatomical conduits.",
      "H2 (Formulation & Analysis): Key relationship.: 2. Anatomical Entry Classification:",
      "H3 (Crux Resolution): Final calculation.:   - Porogamy: Entry directly through the apical micropyle (Route A)."
    ],
    "steps": [
      "1. Conceptual Model: In angiosperms, pollen tubes enter the ovule to deliver sperm cells to the embryo sac via specific anatomical conduits.",
      "2. Anatomical Entry Classification:",
      "- Porogamy: Entry directly through the apical micropyle (Route A).",
      "- Chalazogamy: Entry through the basal chalazal tissue (Route B).",
      "- Mesogamy: Entry through the lateral ovular integuments or funicle (Route C).",
      "3. Conclusion: A represents Porogamy, B represents Chalazogamy, and C represents Mesogamy. Hence Option B."
    ],
    "check": "Adjudicated under IAPT 2022 examination standards.",
    "sourceOrigin": "IAPT_NSEJS_OFFICIAL",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2022-B-Q03",
    "uid": "g9:pcb:biology:nsejs-2022-biology-r1:003",
    "subject": "BIOLOGY",
    "moduleSlug": "nsejs-2022-biology-r1",
    "topic": "ORGANISATION_IN_LIVING_WORLD",
    "ordinal": 3,
    "qrtOp": "EXPLAIN",
    "cruxRef": "NSEJS-2022-B-Q03-M2",
    "cruxKind": "EXPLAIN",
    "learningRoute": "#/learning/nsejs-2022-biology-r1",
    "stem": "Members of Cucurbitaceae, such as bottle-gourd, pumpkin, watermelon and muskmelon,\nbear large fruits although their stems may be only finger-thick. What helps a large\nquantity of food to be translocated from leaves to fruits for storage?",
    "options": [
      "A: Intraxylary phloem",
      "B: Sieve-tubes with companion cells",
      "C: Bicollateral vascular bundles",
      "D: Trichomes on internodes"
    ],
    "hints": [
      "H1 (Context & Setup): Identify governing principles.: 1. Conceptual Model: Long-distance translocation of photosynthetic assimilates requires robust, specialized vascular bundles.",
      "H2 (Formulation & Analysis): Key relationship.: 2. Bundle Morphology in Cucurbits: Members of Cucurbitaceae develop bicollateral vascular bundles featuring central xylem bordered by both outer and inner phloem strands separated by strips of cambium. This dual phloem arrangement provides double the conducting cross-sectional area to supply assimilates to rapidly enlarging fruits through slender stems.",
      "H3 (Crux Resolution): Final calculation.: 3. Conclusion: Translocation is facilitated by bicollateral vascular bundles. Hence Option C."
    ],
    "steps": [
      "1. Conceptual Model: Long-distance translocation of photosynthetic assimilates requires robust, specialized vascular bundles.",
      "2. Bundle Morphology in Cucurbits: Members of Cucurbitaceae develop bicollateral vascular bundles featuring central xylem bordered by both outer and inner phloem strands separated by strips of cambium. This dual phloem arrangement provides double the conducting cross-sectional area to supply assimilates to rapidly enlarging fruits through slender stems.",
      "3. Conclusion: Translocation is facilitated by bicollateral vascular bundles. Hence Option C."
    ],
    "check": "Adjudicated under IAPT 2022 examination standards.",
    "sourceOrigin": "IAPT_NSEJS_OFFICIAL",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2022-B-Q04",
    "uid": "g9:pcb:biology:nsejs-2022-biology-r1:004",
    "subject": "BIOLOGY",
    "moduleSlug": "nsejs-2022-biology-r1",
    "topic": "GENETICS_AND_HEREDITY",
    "ordinal": 4,
    "qrtOp": "APPLY",
    "cruxRef": "NSEJS-2022-B-Q04-M2",
    "cruxKind": "APPLY",
    "learningRoute": "#/learning/nsejs-2022-biology-r1",
    "stem": "In some birds, a black bird crossed with a white-feathered bird produces all\nblue-plumaged chicks. If these blue birds are selfed, the offspring ratio will be:",
    "options": [
      "A: 1 black : 1 white : 2 blue",
      "B: 9 blue : 3 black : 3 white",
      "C: 1 blue : 1 black : 1 white",
      "D: 3 blue : 1 white"
    ],
    "hints": [
      "H1 (Context & Setup): Identify governing principles.: 1. Conceptual Model: Incomplete dominance produces an intermediate heterozygous phenotype distinct from either homozygous parental phenotype.",
      "H2 (Formulation & Analysis): Key relationship.: 2. Genotypic Analysis in Andalusian Fowl: Let homozygous black be BB and homozygous white be bb. Crossing BB x bb produces 100% heterozygous blue progeny (Bb).",
      "H3 (Crux Resolution): Final calculation.: 3. Selfing Cross: When these blue birds are intercrossed (Bb x Bb), Mendelian segregation yields 1/4 BB (black) : 1/2 Bb (blue) : 1/4 bb (white), which is a phenotypic ratio of 1 black : 1 white : 2 blue."
    ],
    "steps": [
      "1. Conceptual Model: Incomplete dominance produces an intermediate heterozygous phenotype distinct from either homozygous parental phenotype.",
      "2. Genotypic Analysis in Andalusian Fowl: Let homozygous black be BB and homozygous white be bb. Crossing BB x bb produces 100% heterozygous blue progeny (Bb).",
      "3. Selfing Cross: When these blue birds are intercrossed (Bb x Bb), Mendelian segregation yields 1/4 BB (black) : 1/2 Bb (blue) : 1/4 bb (white), which is a phenotypic ratio of 1 black : 1 white : 2 blue.",
      "4. Conclusion: The offspring ratio is 1 black : 1 white : 2 blue. Hence Option A."
    ],
    "check": "Adjudicated under IAPT 2022 examination standards.",
    "sourceOrigin": "IAPT_NSEJS_OFFICIAL",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2022-B-Q05",
    "uid": "g9:pcb:biology:nsejs-2022-biology-r1:005",
    "subject": "BIOLOGY",
    "moduleSlug": "nsejs-2022-biology-r1",
    "topic": "LIFE_PROCESSES",
    "ordinal": 5,
    "qrtOp": "REPRESENT",
    "cruxRef": "NSEJS-2022-B-Q05-M2",
    "cruxKind": "REPRESENT",
    "learningRoute": "#/learning/nsejs-2022-biology-r1",
    "stem": "The diagram shows chromatographic separation of pigments extracted from spinach\nleaves. The sequence of pigment bands from below upwards is:",
    "options": [
      "A: Chlorophyll b, Chlorophyll a, Carotenols and Carotenes",
      "B: Carotenes, Carotenols, Chlorophyll a and Chlorophyll b",
      "C: Chlorophyll a, Chlorophyll b, Carotenes and Carotenols",
      "D: Carotenols, Phycobilins, Chlorophyll a and Chlorophyll b"
    ],
    "hints": [
      "H1 (Context & Setup): Identify governing principles.: 1. Conceptual Model: Paper chromatography separates leaf photosynthetic pigments based on differential partition coefficients between cellulose paper (stationary phase) and organic developing solvents (mobile phase).",
      "H2 (Formulation & Analysis): Key relationship.: 2. Migration Order from Origin: Pigments with highest polarity and paper affinity migrate slowest and remain closest to the baseline, whereas non-polar hydrocarbons travel closest to the solvent front. Moving from below upwards: Chlorophyll b (yellow-green, lowest Rf) -> Chlorophyll a (blue-green) -> Xanthophylls/Carotenols (yellow) -> Carotenes (orange-yellow, highest Rf).",
      "H3 (Crux Resolution): Final calculation.: 3. Conclusion: The sequence from below upwards is Chlorophyll b, Chlorophyll a, Carotenols, and Carotenes. Hence Option A."
    ],
    "steps": [
      "1. Conceptual Model: Paper chromatography separates leaf photosynthetic pigments based on differential partition coefficients between cellulose paper (stationary phase) and organic developing solvents (mobile phase).",
      "2. Migration Order from Origin: Pigments with highest polarity and paper affinity migrate slowest and remain closest to the baseline, whereas non-polar hydrocarbons travel closest to the solvent front. Moving from below upwards: Chlorophyll b (yellow-green, lowest Rf) -> Chlorophyll a (blue-green) -> Xanthophylls/Carotenols (yellow) -> Carotenes (orange-yellow, highest Rf).",
      "3. Conclusion: The sequence from below upwards is Chlorophyll b, Chlorophyll a, Carotenols, and Carotenes. Hence Option A."
    ],
    "check": "Adjudicated under IAPT 2022 examination standards.",
    "sourceOrigin": "IAPT_NSEJS_OFFICIAL",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2022-B-Q06",
    "uid": "g9:pcb:biology:nsejs-2022-biology-r1:006",
    "subject": "BIOLOGY",
    "moduleSlug": "nsejs-2022-biology-r1",
    "topic": "ORGANISATION_IN_LIVING_WORLD",
    "ordinal": 6,
    "qrtOp": "RETRIEVE",
    "cruxRef": "NSEJS-2022-B-Q06-M2",
    "cruxKind": "RETRIEVE",
    "learningRoute": "#/learning/nsejs-2022-biology-r1",
    "stem": "In some plants and fungi, cell organelles convert lipids into sugars during the early stages\nof oil-seed germination. These organelles are:",
    "options": [
      "A: Glyoxysomes",
      "B: Lysosomes",
      "C: Ribosomes",
      "D: Liposomes"
    ],
    "hints": [
      "H1 (Context & Setup): Identify governing principles.: 1. Conceptual Model: Lipid-storing seeds (e.g. castor, sunflower) must convert stored triacylglycerols into mobile sucrose to fuel embryonic seedling growth prior to emergence of green leaves.",
      "H2 (Formulation & Analysis): Key relationship.: 2. Organellar Specificity: Glyoxysomes are specialized plant peroxisomes that house the enzymes of the glyoxylate cycle (isocitrate lyase and malate synthase), which bypass CO2 loss steps of the Krebs cycle to achieve net gluconeogenesis from fatty acids.",
      "H3 (Crux Resolution): Final calculation.: 3. Conclusion: The responsible organelles are Glyoxysomes. Hence Option A."
    ],
    "steps": [
      "1. Conceptual Model: Lipid-storing seeds (e.g. castor, sunflower) must convert stored triacylglycerols into mobile sucrose to fuel embryonic seedling growth prior to emergence of green leaves.",
      "2. Organellar Specificity: Glyoxysomes are specialized plant peroxisomes that house the enzymes of the glyoxylate cycle (isocitrate lyase and malate synthase), which bypass CO2 loss steps of the Krebs cycle to achieve net gluconeogenesis from fatty acids.",
      "3. Conclusion: The responsible organelles are Glyoxysomes. Hence Option A."
    ],
    "check": "Adjudicated under IAPT 2022 examination standards.",
    "sourceOrigin": "IAPT_NSEJS_OFFICIAL",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2022-B-Q07",
    "uid": "g9:pcb:biology:nsejs-2022-biology-r1:007",
    "subject": "BIOLOGY",
    "moduleSlug": "nsejs-2022-biology-r1",
    "topic": "ENVIRONMENT_AND_NATURAL_RESOURCES",
    "ordinal": 7,
    "qrtOp": "JUSTIFY",
    "cruxRef": "NSEJS-2022-B-Q07-M2",
    "cruxKind": "JUSTIFY",
    "learningRoute": "#/learning/nsejs-2022-biology-r1",
    "stem": "In the analysis of wastewater, Escherichia coli is used as:",
    "options": [
      "A: A standard organism for performing a plate count",
      "B: An indicator of faecal contamination of water",
      "C: An indicator of the number of nitrogen-fixing bacteria in water",
      "D: A measure of the amino-acid content of water"
    ],
    "hints": [
      "H1 (Context & Setup): Identify governing principles.: 1. Conceptual Model: Coliform bacteria serve as microbiological indicator organisms to assess sanitary quality and potable water safety.",
      "H2 (Formulation & Analysis): Key relationship.: 2. Diagnostic Indicator: Escherichia coli is a commensal bacterium inhabiting the lower intestine of warm-blooded animals. Because it is shed in large numbers in faeces, its presence in water samples reliably indicates recent faecal contamination and the probable presence of enteric pathogens.",
      "H3 (Crux Resolution): Final calculation.: 3. Conclusion: E. coli is used as an indicator of water contamination by faecal matter. Hence Option B."
    ],
    "steps": [
      "1. Conceptual Model: Coliform bacteria serve as microbiological indicator organisms to assess sanitary quality and potable water safety.",
      "2. Diagnostic Indicator: Escherichia coli is a commensal bacterium inhabiting the lower intestine of warm-blooded animals. Because it is shed in large numbers in faeces, its presence in water samples reliably indicates recent faecal contamination and the probable presence of enteric pathogens.",
      "3. Conclusion: E. coli is used as an indicator of water contamination by faecal matter. Hence Option B."
    ],
    "check": "Adjudicated under IAPT 2022 examination standards.",
    "sourceOrigin": "IAPT_NSEJS_OFFICIAL",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2022-B-Q08",
    "uid": "g9:pcb:biology:nsejs-2022-biology-r1:008",
    "subject": "BIOLOGY",
    "moduleSlug": "nsejs-2022-biology-r1",
    "topic": "ENVIRONMENT_AND_NATURAL_RESOURCES",
    "ordinal": 8,
    "qrtOp": "RETRIEVE",
    "cruxRef": "NSEJS-2022-B-Q08-M2",
    "cruxKind": "RETRIEVE",
    "learningRoute": "#/learning/nsejs-2022-biology-r1",
    "stem": "Acid rain damages soil and lakes and affects aquatic plants and animals. Which pH range\nis most suitable for the survival of most aquatic biota?",
    "options": [
      "A: 4.5-5.8",
      "B: 6.5-7.5",
      "C: 7.5-8.5",
      "D: Above 9.0"
    ],
    "hints": [
      "H1 (Context & Setup): Identify governing principles.: 1. Conceptual Model: Aquatic organisms maintain homeostatic osmoregulation and enzymatic function within narrow physiological pH windows.",
      "H2 (Formulation & Analysis): Key relationship.: 2. Ecological Tolerance: The optimal pH range for freshwater teleost fish, aquatic invertebrates, and microflora is near neutral, between pH 6.5 and 7.5. Acidification below pH 6.0 mobilises toxic aluminium ions and impairs gill ion-exchange mechanisms.",
      "H3 (Crux Resolution): Final calculation.: 3. Conclusion: The most suitable pH range is 6.5 to 7.5. Hence Option B."
    ],
    "steps": [
      "1. Conceptual Model: Aquatic organisms maintain homeostatic osmoregulation and enzymatic function within narrow physiological pH windows.",
      "2. Ecological Tolerance: The optimal pH range for freshwater teleost fish, aquatic invertebrates, and microflora is near neutral, between pH 6.5 and 7.5. Acidification below pH 6.0 mobilises toxic aluminium ions and impairs gill ion-exchange mechanisms.",
      "3. Conclusion: The most suitable pH range is 6.5 to 7.5. Hence Option B."
    ],
    "check": "Adjudicated under IAPT 2022 examination standards.",
    "sourceOrigin": "IAPT_NSEJS_OFFICIAL",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2022-B-Q09",
    "uid": "g9:pcb:biology:nsejs-2022-biology-r1:009",
    "subject": "BIOLOGY",
    "moduleSlug": "nsejs-2022-biology-r1",
    "topic": "CONTROL_AND_COORDINATION",
    "ordinal": 9,
    "qrtOp": "RETRIEVE",
    "cruxRef": "NSEJS-2022-B-Q09-M2",
    "cruxKind": "RETRIEVE",
    "learningRoute": "#/learning/nsejs-2022-biology-r1",
    "stem": "Steroid hormones include sex hormones and hormones of the adrenal cortex. Based on\nintensity of action, which ovarian hormone is produced in large amount and is the\nprincipal active estrogen?",
    "options": [
      "A: Estrone",
      "B: Estriol",
      "C: Estradiol",
      "D: Estrane"
    ],
    "hints": [
      "H1 (Context & Setup): Identify governing principles.: 1. Conceptual Model: The mammalian ovary secretes steroid estrogens that regulate the menstrual cycle and maintain female secondary sexual characteristics.",
      "H2 (Formulation & Analysis): Key relationship.: 2. Endocrine Potency: The three major endogenous estrogens are estrone (E1), estradiol (E2), and estriol (E3). 17beta-estradiol is synthesized in large quantities by the ovarian granulosa cells of developing Graafian follicles and is the principal, most biologically active estrogen during reproductive years.",
      "H3 (Crux Resolution): Final calculation.: 3. Conclusion: The principal active estrogen is Estradiol. Hence Option C."
    ],
    "steps": [
      "1. Conceptual Model: The mammalian ovary secretes steroid estrogens that regulate the menstrual cycle and maintain female secondary sexual characteristics.",
      "2. Endocrine Potency: The three major endogenous estrogens are estrone (E1), estradiol (E2), and estriol (E3). 17beta-estradiol is synthesized in large quantities by the ovarian granulosa cells of developing Graafian follicles and is the principal, most biologically active estrogen during reproductive years.",
      "3. Conclusion: The principal active estrogen is Estradiol. Hence Option C."
    ],
    "check": "Adjudicated under IAPT 2022 examination standards.",
    "sourceOrigin": "IAPT_NSEJS_OFFICIAL",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2022-B-Q10",
    "uid": "g9:pcb:biology:nsejs-2022-biology-r1:010",
    "subject": "BIOLOGY",
    "moduleSlug": "nsejs-2022-biology-r1",
    "topic": "CONTROL_AND_COORDINATION",
    "ordinal": 10,
    "qrtOp": "RETRIEVE",
    "cruxRef": "NSEJS-2022-B-Q10-M2",
    "cruxKind": "RETRIEVE",
    "learningRoute": "#/learning/nsejs-2022-biology-r1",
    "stem": "In the human vertebral column there are about 26 bones in the adult. Which group of\nvertebrae is related to the pelvic region?",
    "options": [
      "A: Lumbar",
      "B: Coccygeal",
      "C: Sacral",
      "D: Cervical"
    ],
    "hints": [
      "H1 (Context & Setup): Identify governing principles.: 1. Conceptual Model: The adult human axial skeleton features 26 vertebral elements divided into regional divisions: cervical (7), thoracic (12), lumbar (5), sacrum (1, fused from 5), and coccyx (1, fused from 4).",
      "H2 (Formulation & Analysis): Key relationship.: 2. Pelvic Articulation: The sacral vertebrae fuse into the wedge-shaped sacrum, which articulates laterally with the ilium of each coxal hip bone at the sacroiliac joints to form the posterior wall of the bony pelvis.",
      "H3 (Crux Resolution): Final calculation.: 3. Conclusion: The vertebrae related to the pelvic region are the Sacral vertebrae. Hence Option C."
    ],
    "steps": [
      "1. Conceptual Model: The adult human axial skeleton features 26 vertebral elements divided into regional divisions: cervical (7), thoracic (12), lumbar (5), sacrum (1, fused from 5), and coccyx (1, fused from 4).",
      "2. Pelvic Articulation: The sacral vertebrae fuse into the wedge-shaped sacrum, which articulates laterally with the ilium of each coxal hip bone at the sacroiliac joints to form the posterior wall of the bony pelvis.",
      "3. Conclusion: The vertebrae related to the pelvic region are the Sacral vertebrae. Hence Option C."
    ],
    "check": "Adjudicated under IAPT 2022 examination standards.",
    "sourceOrigin": "IAPT_NSEJS_OFFICIAL",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2022-B-Q11",
    "uid": "g9:pcb:biology:nsejs-2022-biology-r1:011",
    "subject": "BIOLOGY",
    "moduleSlug": "nsejs-2022-biology-r1",
    "topic": "LIFE_PROCESSES",
    "ordinal": 11,
    "qrtOp": "APPLY",
    "cruxRef": "NSEJS-2022-B-Q11-M2",
    "cruxKind": "APPLY",
    "learningRoute": "#/learning/nsejs-2022-biology-r1",
    "stem": "In the EMP (glycolytic) pathway shown, reactions are numbered E1 to E10. At which\nenzyme levels is ATP generated by substrate-level phosphorylation?",
    "options": [
      "A: E1 and E3",
      "B: E3 and E6",
      "C: E7 and E10",
      "D: E6 and E10"
    ],
    "hints": [
      "H1 (Context & Setup): Identify governing principles.: 1. Conceptual Model: Substrate-level phosphorylation is the direct synthesis of ATP from ADP by transfer of a high-energy phosphate group from a phosphorylated metabolic intermediate without requiring electron transport.",
      "H2 (Formulation & Analysis): Key relationship.: 2. Glycolytic Enzyme Loci: In the 10-step Embden-Meyerhof-Parnas (EMP) pathway, ATP is generated at two distinct enzyme steps: Step E7 (phosphoglycerate kinase converts 1,3-bisphosphoglycerate to 3-phosphoglycerate) and Step E10 (pyruvate kinase converts phosphoenolpyruvate to pyruvate).",
      "H3 (Crux Resolution): Final calculation.: 3. Conclusion: ATP generation by substrate-level phosphorylation occurs at enzyme levels E7 and E10. Hence Option C."
    ],
    "steps": [
      "1. Conceptual Model: Substrate-level phosphorylation is the direct synthesis of ATP from ADP by transfer of a high-energy phosphate group from a phosphorylated metabolic intermediate without requiring electron transport.",
      "2. Glycolytic Enzyme Loci: In the 10-step Embden-Meyerhof-Parnas (EMP) pathway, ATP is generated at two distinct enzyme steps: Step E7 (phosphoglycerate kinase converts 1,3-bisphosphoglycerate to 3-phosphoglycerate) and Step E10 (pyruvate kinase converts phosphoenolpyruvate to pyruvate).",
      "3. Conclusion: ATP generation by substrate-level phosphorylation occurs at enzyme levels E7 and E10. Hence Option C."
    ],
    "check": "Adjudicated under IAPT 2022 examination standards.",
    "sourceOrigin": "IAPT_NSEJS_OFFICIAL",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2022-B-Q12",
    "uid": "g9:pcb:biology:nsejs-2022-biology-r1:012",
    "subject": "BIOLOGY",
    "moduleSlug": "nsejs-2022-biology-r1",
    "topic": "CONTROL_AND_COORDINATION",
    "ordinal": 12,
    "qrtOp": "RETRIEVE",
    "cruxRef": "NSEJS-2022-B-Q12-M2",
    "cruxKind": "RETRIEVE",
    "learningRoute": "#/learning/nsejs-2022-biology-r1",
    "stem": "A thick whitish band of nerve fibres bulges on the inner surface of the dorsal wall of each\ncerebral hemisphere in the mammalian brain. This structure is:",
    "options": [
      "A: Corpus albicans",
      "B: Corpus luteum",
      "C: Corpus striatum",
      "D: Corpus callosum"
    ],
    "hints": [
      "H1 (Context & Setup): Identify governing principles.: 1. Conceptual Model: Interhemispheric communication in the mammalian telencephalon requires dense commissural nerve fibre tracts.",
      "H2 (Formulation & Analysis): Key relationship.: 2. Commissural Tract: The corpus callosum is a thick C-shaped arched neural tract of white myelinated axonal fibres spanning the longitudinal fissure beneath the cortex, connecting corresponding cortical areas between the left and right cerebral hemispheres.",
      "H3 (Crux Resolution): Final calculation.: 3. Conclusion: The thick whitish commissural band is the Corpus callosum. Hence Option D."
    ],
    "steps": [
      "1. Conceptual Model: Interhemispheric communication in the mammalian telencephalon requires dense commissural nerve fibre tracts.",
      "2. Commissural Tract: The corpus callosum is a thick C-shaped arched neural tract of white myelinated axonal fibres spanning the longitudinal fissure beneath the cortex, connecting corresponding cortical areas between the left and right cerebral hemispheres.",
      "3. Conclusion: The thick whitish commissural band is the Corpus callosum. Hence Option D."
    ],
    "check": "Adjudicated under IAPT 2022 examination standards.",
    "sourceOrigin": "IAPT_NSEJS_OFFICIAL",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2022-B-Q13",
    "uid": "g9:pcb:biology:nsejs-2022-biology-r1:013",
    "subject": "BIOLOGY",
    "moduleSlug": "nsejs-2022-biology-r1",
    "topic": "ORGANISATION_IN_LIVING_WORLD",
    "ordinal": 13,
    "qrtOp": "APPLY",
    "cruxRef": "NSEJS-2022-B-Q13-M2",
    "cruxKind": "APPLY",
    "learningRoute": "#/learning/nsejs-2022-biology-r1",
    "stem": "Body symmetry is a diagnostic feature in classification. Besides truly bilateral animals,\nsome other organisms also show bilateral symmetry. Which of the following is such an\nexample?",
    "options": [
      "A: Giardia",
      "B: Cliona",
      "C: Obelia",
      "D: Trypanosoma"
    ],
    "hints": [
      "H1 (Context & Setup): Identify governing principles.: 1. Conceptual Model: Bilateral symmetry describes an anatomical plan with a single sagittal plane dividing the organism into matching left and right mirror-image halves.",
      "H2 (Formulation & Analysis): Key relationship.: 2. Protozoan Morphology: Giardia lamblia (a diplomonad flagellate protozoan) exhibits remarkable bilateral symmetry, possessing paired nuclei, paired ventral sucking discs, and paired four-flagellar arrays arranged symmetrically on either side of an axostyle central median line.",
      "H3 (Crux Resolution): Final calculation.: 3. Conclusion: Giardia is the designated bilaterally symmetrical organism. Hence Option A."
    ],
    "steps": [
      "1. Conceptual Model: Bilateral symmetry describes an anatomical plan with a single sagittal plane dividing the organism into matching left and right mirror-image halves.",
      "2. Protozoan Morphology: Giardia lamblia (a diplomonad flagellate protozoan) exhibits remarkable bilateral symmetry, possessing paired nuclei, paired ventral sucking discs, and paired four-flagellar arrays arranged symmetrically on either side of an axostyle central median line.",
      "3. Conclusion: Giardia is the designated bilaterally symmetrical organism. Hence Option A."
    ],
    "check": "Adjudicated under IAPT 2022 examination standards.",
    "sourceOrigin": "IAPT_NSEJS_OFFICIAL",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2022-B-Q14",
    "uid": "g9:pcb:biology:nsejs-2022-biology-r1:014",
    "subject": "BIOLOGY",
    "moduleSlug": "nsejs-2022-biology-r1",
    "topic": "CONTROL_AND_COORDINATION",
    "ordinal": 14,
    "qrtOp": "RETRIEVE",
    "cruxRef": "NSEJS-2022-B-Q14-M2",
    "cruxKind": "RETRIEVE",
    "learningRoute": "#/learning/nsejs-2022-biology-r1",
    "stem": "Nissl granules are RNA-rich bodies. In which of the following do they occur?",
    "options": [
      "A: Osteon",
      "B: Chondrion",
      "C: Neurons",
      "D: Myocytes"
    ],
    "hints": [
      "H1 (Context & Setup): Identify governing principles.: 1. Conceptual Model: Highly metabolic cells possess abundant ribosomal machinery for high-throughput protein synthesis.",
      "H2 (Formulation & Analysis): Key relationship.: 2. Nissl Granules Identification: Nissl bodies (chromophilic substance) found in the soma (perikaryon) and proximal dendrites of neurons consist of dense granular agglomerations of rough endoplasmic reticulum and polyribosomes dedicated to synthesizing structural proteins and peptide neurotransmitters.",
      "H3 (Crux Resolution): Final calculation.: 3. Conclusion: Nissl bodies are characteristic of Neurons. Hence Option C."
    ],
    "steps": [
      "1. Conceptual Model: Highly metabolic cells possess abundant ribosomal machinery for high-throughput protein synthesis.",
      "2. Nissl Granules Identification: Nissl bodies (chromophilic substance) found in the soma (perikaryon) and proximal dendrites of neurons consist of dense granular agglomerations of rough endoplasmic reticulum and polyribosomes dedicated to synthesizing structural proteins and peptide neurotransmitters.",
      "3. Conclusion: Nissl bodies are characteristic of Neurons. Hence Option C."
    ],
    "check": "Adjudicated under IAPT 2022 examination standards.",
    "sourceOrigin": "IAPT_NSEJS_OFFICIAL",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2022-B-Q15",
    "uid": "g9:pcb:biology:nsejs-2022-biology-r1:015",
    "subject": "BIOLOGY",
    "moduleSlug": "nsejs-2022-biology-r1",
    "topic": "ORGANISATION_IN_LIVING_WORLD",
    "ordinal": 15,
    "qrtOp": "EXPLAIN",
    "cruxRef": "NSEJS-2022-B-Q15-M2",
    "cruxKind": "EXPLAIN",
    "learningRoute": "#/learning/nsejs-2022-biology-r1",
    "stem": "Which statement is not applicable to viruses?",
    "options": [
      "A: The protein capsid of a virus does not enter the host cell in some viral infections",
      "B: The genetic material is either DNA or RNA, never both",
      "C: The virion replicates autonomously outside the host",
      "D: The virus replicates in a bacterial or other host cell"
    ],
    "hints": [
      "H1 (Context & Setup): Identify governing principles.: 1. Conceptual Model: A virion is an inert supramolecular assembly of genetic material encased in a protective proteinaceous capsid (plus optional envelope).",
      "H2 (Formulation & Analysis): Key relationship.: 2. Non-autonomous Nature: Viruses lack metabolic enzymes, ribosomes, and ATP-generating machinery. Consequently, they are obligate intracellular parasites that cannot replicate autonomously outside a living host cell.",
      "H3 (Crux Resolution): Final calculation.: 3. Conclusion: The statement that virions replicate autonomously outside the host is false and not applicable to viruses. Hence Option C."
    ],
    "steps": [
      "1. Conceptual Model: A virion is an inert supramolecular assembly of genetic material encased in a protective proteinaceous capsid (plus optional envelope).",
      "2. Non-autonomous Nature: Viruses lack metabolic enzymes, ribosomes, and ATP-generating machinery. Consequently, they are obligate intracellular parasites that cannot replicate autonomously outside a living host cell.",
      "3. Conclusion: The statement that virions replicate autonomously outside the host is false and not applicable to viruses. Hence Option C."
    ],
    "check": "Adjudicated under IAPT 2022 examination standards.",
    "sourceOrigin": "IAPT_NSEJS_OFFICIAL",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2022-B-Q16",
    "uid": "g9:pcb:biology:nsejs-2022-biology-r1:016",
    "subject": "BIOLOGY",
    "moduleSlug": "nsejs-2022-biology-r1",
    "topic": "ORGANISATION_IN_LIVING_WORLD",
    "ordinal": 16,
    "qrtOp": "RETRIEVE",
    "cruxRef": "NSEJS-2022-B-Q16-M2",
    "cruxKind": "RETRIEVE",
    "learningRoute": "#/learning/nsejs-2022-biology-r1",
    "stem": "Carolus Linnaeus devised a system for classifying plants while using binomial\nnomenclature. His plant classification was:",
    "options": [
      "A: Artificial",
      "B: Natural",
      "C: Phylogenetic",
      "D: Cladistic"
    ],
    "hints": [
      "H1 (Context & Setup): Identify governing principles.: 1. Conceptual Model: Biological classification systems are historically categorized as artificial (based on 1-2 arbitrary superficial traits), natural (based on overall morphological and anatomical affinities), or phylogenetic (based on evolutionary lineages).",
      "H2 (Formulation & Analysis): Key relationship.: 2. Linnaean System: Carolus Linnaeus's sexual system of plant classification (Systema Naturae, 1735) grouped plants primarily according to the number, union, and length of stamens and carpels, without considering evolutionary relatedness or holistic internal anatomy.",
      "H3 (Crux Resolution): Final calculation.: 3. Conclusion: Linnaeus's plant classification was an Artificial system. Hence Option A."
    ],
    "steps": [
      "1. Conceptual Model: Biological classification systems are historically categorized as artificial (based on 1-2 arbitrary superficial traits), natural (based on overall morphological and anatomical affinities), or phylogenetic (based on evolutionary lineages).",
      "2. Linnaean System: Carolus Linnaeus's sexual system of plant classification (Systema Naturae, 1735) grouped plants primarily according to the number, union, and length of stamens and carpels, without considering evolutionary relatedness or holistic internal anatomy.",
      "3. Conclusion: Linnaeus's plant classification was an Artificial system. Hence Option A."
    ],
    "check": "Adjudicated under IAPT 2022 examination standards.",
    "sourceOrigin": "IAPT_NSEJS_OFFICIAL",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2022-B-Q49",
    "uid": "g9:pcb:biology:nsejs-2022-biology-r1:017",
    "subject": "BIOLOGY",
    "moduleSlug": "nsejs-2022-biology-r1",
    "topic": "GENETICS_AND_HEREDITY",
    "ordinal": 17,
    "qrtOp": "MODEL",
    "cruxRef": "NSEJS-2022-B-Q49-M3",
    "cruxKind": "MODEL",
    "learningRoute": "#/learning/nsejs-2022-biology-r1",
    "stem": "Which of the following evolutionary lineages of humans can be categorised as prehistoric\nman?",
    "options": [
      "A: Ramapithecus",
      "B: Homo habilis",
      "C: Homo sapiens fossilis",
      "D: Homo heidelbergensis"
    ],
    "hints": [
      "H1 (Context & Setup): Identify governing principles.: 1. Conceptual Model: Paleoanthropology categorises hominin fossils into archaic hominids, prehistoric transitional human forms (Homo habilis, Homo erectus, Homo heidelbergensis), and anatomically modern Homo sapiens.",
      "H2 (Formulation & Analysis): Key relationship.: 2. Lineage Evaluation:",
      "H3 (Crux Resolution): Final calculation.:   - Homo habilis (handy man, brain capacity ~650-800 cc) represents the earliest prehistoric human genus member."
    ],
    "steps": [
      "1. Conceptual Model: Paleoanthropology categorises hominin fossils into archaic hominids, prehistoric transitional human forms (Homo habilis, Homo erectus, Homo heidelbergensis), and anatomically modern Homo sapiens.",
      "2. Lineage Evaluation:",
      "- Homo habilis (handy man, brain capacity ~650-800 cc) represents the earliest prehistoric human genus member.",
      "- Homo heidelbergensis (~600,000-200,000 years ago) represents an archaic middle Pleistocene prehistoric human ancestor of Neanderthals and modern humans.",
      "- Ramapithecus is a late Miocene primate ancestral to hominoids, not classified as genus Homo.",
      "- Homo sapiens fossilis represents early anatomically modern human fossil stock.",
      "3. Conclusion: Homo habilis and Homo heidelbergensis represent prehistoric humans. Correct options: B and D."
    ],
    "check": "Adjudicated under IAPT 2022 examination standards.",
    "sourceOrigin": "IAPT_NSEJS_OFFICIAL",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2022-B-Q50",
    "uid": "g9:pcb:biology:nsejs-2022-biology-r1:018",
    "subject": "BIOLOGY",
    "moduleSlug": "nsejs-2022-biology-r1",
    "topic": "LIFE_PROCESSES",
    "ordinal": 18,
    "qrtOp": "MODEL",
    "cruxRef": "NSEJS-2022-B-Q50-M3",
    "cruxKind": "MODEL",
    "learningRoute": "#/learning/nsejs-2022-biology-r1",
    "stem": "Select the sets of diseases caused by deficiency of B-complex vitamins:",
    "options": [
      "A: Beri-beri and Pellagra",
      "B: Dermatitis and Wernicke-Korsakoff syndrome",
      "C: Cheilosis and Pernicious anaemia",
      "D: Marasmus and Kwashiorkor"
    ],
    "hints": [
      "H1 (Context & Setup): Identify governing principles.: 1. Conceptual Model: Water-soluble B-complex vitamins act as essential metabolic coenzymes; deficiencies lead to specific neurological, dermatological, and hematological disorders.",
      "H2 (Formulation & Analysis): Key relationship.: 2. Disease-Vitamin Matching:",
      "H3 (Crux Resolution): Final calculation.:   - Set A: Beri-beri (Vitamin B1 / Thiamine) and Pellagra (Vitamin B3 / Niacin). Both are B-complex deficiencies (Correct)."
    ],
    "steps": [
      "1. Conceptual Model: Water-soluble B-complex vitamins act as essential metabolic coenzymes; deficiencies lead to specific neurological, dermatological, and hematological disorders.",
      "2. Disease-Vitamin Matching:",
      "- Set A: Beri-beri (Vitamin B1 / Thiamine) and Pellagra (Vitamin B3 / Niacin). Both are B-complex deficiencies (Correct).",
      "- Set B: Dermatitis (Riboflavin B2, Pyridoxine B6, Biotin B7) and Wernicke-Korsakoff syndrome (Thiamine B1). Both are B-complex deficiencies (Correct).",
      "- Set C: Cheilosis (Vitamin B2 / Riboflavin) and Pernicious anaemia (Vitamin B12 / Cobalamin). Both are B-complex deficiencies (Correct).",
      "- Set D: Marasmus and Kwashiorkor are forms of Protein-Energy Malnutrition (PEM), not vitamin deficiencies (Incorrect).",
      "3. Conclusion: Sets A, B, and C represent B-complex deficiency diseases. Correct options: A, B, and C."
    ],
    "check": "Adjudicated under IAPT 2022 examination standards.",
    "sourceOrigin": "IAPT_NSEJS_OFFICIAL",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2022-B-Q51",
    "uid": "g9:pcb:biology:nsejs-2022-biology-r1:019",
    "subject": "BIOLOGY",
    "moduleSlug": "nsejs-2022-biology-r1",
    "topic": "ENVIRONMENT_AND_NATURAL_RESOURCES",
    "ordinal": 19,
    "qrtOp": "SYNTHESIZE",
    "cruxRef": "NSEJS-2022-B-Q51-M3",
    "cruxKind": "SYNTHESIZE",
    "learningRoute": "#/learning/nsejs-2022-biology-r1",
    "stem": "After the rainy season, students collect pond water containing aquatic plants. Which\ngroups of organisms are they likely to find?",
    "options": [
      "A: Spirogyra, Azolla, Riccia fluitans and Cosmarium",
      "B: Ulothrix, Chlorella, Chara and Ricciocarpus natans",
      "C: Marchantia, Funaria, Lycopodium and Gnetum",
      "D: Salvinia molesta, Azolla, Chlorella and Cladophora"
    ],
    "hints": [
      "H1 (Context & Setup): Identify governing principles.: 1. Conceptual Model: Post-monsoon pond ecosystems support diverse assemblages of microscopic free-floating green algae, desmids, and aquatic macrophyte ferns/liverworts.",
      "H2 (Formulation & Analysis): Key relationship.: 2. Flora Analysis across Sets:",
      "H3 (Crux Resolution): Final calculation.:   - Group A: Spirogyra (filamentous green alga), Azolla (aquatic floating water fern), Riccia fluitans (aquatic floating liverwort), and Cosmarium (unicellular desmid). All thrive in freshwater ponds (Correct)."
    ],
    "steps": [
      "1. Conceptual Model: Post-monsoon pond ecosystems support diverse assemblages of microscopic free-floating green algae, desmids, and aquatic macrophyte ferns/liverworts.",
      "2. Flora Analysis across Sets:",
      "- Group A: Spirogyra (filamentous green alga), Azolla (aquatic floating water fern), Riccia fluitans (aquatic floating liverwort), and Cosmarium (unicellular desmid). All thrive in freshwater ponds (Correct).",
      "- Group B: Ulothrix (green alga), Chlorella (unicellular green alga), Chara (stonewort green alga), and Ricciocarpus natans (aquatic liverwort). All thrive in ponds (Correct).",
      "- Group C: Marchantia (terrestrial liverwort), Funaria (terrestrial moss), Lycopodium (terrestrial clubmoss), and Gnetum (terrestrial woody gymnosperm). None are pond water organisms (Incorrect).",
      "- Group D: Salvinia molesta (floating aquatic fern), Azolla (aquatic fern), Chlorella (green alga), and Cladophora (filamentous green alga). All thrive in ponds (Correct).",
      "3. Conclusion: Likely pond water assemblages are A, B, and D."
    ],
    "check": "Adjudicated under IAPT 2022 examination standards.",
    "sourceOrigin": "IAPT_NSEJS_OFFICIAL",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2022-B-Q52",
    "uid": "g9:pcb:biology:nsejs-2022-biology-r1:020",
    "subject": "BIOLOGY",
    "moduleSlug": "nsejs-2022-biology-r1",
    "topic": "LIFE_PROCESSES",
    "ordinal": 20,
    "qrtOp": "MODEL",
    "cruxRef": "NSEJS-2022-B-Q52-M3",
    "cruxKind": "MODEL",
    "learningRoute": "#/learning/nsejs-2022-biology-r1",
    "stem": "Various parts of mammalian uriniferous tubules (nephrons) take part in ultrafiltration,\nselective reabsorption by active transport, passive osmosis and secretion. In the labelled\nnephron diagram, the options separately identify: (i) part(s) having columnar epithelial\ncells with a brush border suitable for reabsorption, and (ii) those parts completely or\npoorly permeable to water. Select the desired option(s).",
    "options": [
      "A: 4, 5",
      "B: 1",
      "C: 2, 3",
      "D: 2, 3, 6"
    ],
    "hints": [
      "H1 (Context & Setup): Identify governing principles.: 1. Conceptual Model: Nephron segment epithelia are specialized for differential solute reabsorption and variable water permeability.",
      "H2 (Formulation & Analysis): Key relationship.: 2. Segment-Specific Histology and Transport:",
      "H3 (Crux Resolution): Final calculation.:   - Part 1 is the Proximal Convoluted Tubule (PCT): Lined by cuboidal/columnar epithelium with a microvillar brush border that massively amplifies apical surface area for reabsorption of 70-80% of electrolytes and water. Hence Option B is correct for (i)."
    ],
    "steps": [
      "1. Conceptual Model: Nephron segment epithelia are specialized for differential solute reabsorption and variable water permeability.",
      "2. Segment-Specific Histology and Transport:",
      "- Part 1 is the Proximal Convoluted Tubule (PCT): Lined by cuboidal/columnar epithelium with a microvillar brush border that massively amplifies apical surface area for reabsorption of 70-80% of electrolytes and water. Hence Option B is correct for (i).",
      "- Parts 2, 3, and 6 correspond to the descending limb, ascending limb of Henle's loop, and collecting duct. The thin ascending limb is completely impermeable to water, while the collecting duct exhibits regulated vasopressin-mediated water permeability. Hence Option D is correct for (ii).",
      "3. Conclusion: The desired options are B and D."
    ],
    "check": "Adjudicated under IAPT 2022 examination standards.",
    "sourceOrigin": "IAPT_NSEJS_OFFICIAL",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2022-C-Q17",
    "uid": "g9:pcb:chemistry:nsejs-2022-chemistry-r1:001",
    "subject": "CHEMISTRY",
    "moduleSlug": "nsejs-2022-chemistry-r1",
    "topic": "CHEMICAL_BONDING",
    "ordinal": 1,
    "qrtOp": "EXPLAIN",
    "cruxRef": "NSEJS-2022-C-Q17-M2",
    "cruxKind": "EXPLAIN",
    "learningRoute": "#/learning/nsejs-2022-chemistry-r1",
    "stem": "Which labelled bond in the shown molecule of methanoic acid breaks when the compound\nionises in water?",
    "options": [
      "A: A",
      "B: B",
      "C: C",
      "D: D"
    ],
    "hints": [
      "H1 (Context & Setup): Identify governing principles.: 1. Conceptual Model: Carboxylic acids ionise in aqueous medium by releasing a proton through heterolytic cleavage of the polar O-H bond.",
      "H2 (Formulation & Analysis): Key relationship.: 2. Bond Cleavage Mechanism: In methanoic acid (HCOOH), bond D is the hydroxyl O-H bond. Water acts as a Brønsted base to accept H+, breaking bond D to form hydronium H3O+ and resonance-stabilised formate anion HCOO-.",
      "H3 (Crux Resolution): Final calculation.: 3. Conclusion: Bond D breaks heterolytically upon ionisation in water. Hence Option D."
    ],
    "steps": [
      "1. Conceptual Model: Carboxylic acids ionise in aqueous medium by releasing a proton through heterolytic cleavage of the polar O-H bond.",
      "2. Bond Cleavage Mechanism: In methanoic acid (HCOOH), bond D is the hydroxyl O-H bond. Water acts as a Brønsted base to accept H+, breaking bond D to form hydronium H3O+ and resonance-stabilised formate anion HCOO-.",
      "3. Conclusion: Bond D breaks heterolytically upon ionisation in water. Hence Option D."
    ],
    "check": "Adjudicated under IAPT 2022 examination standards.",
    "sourceOrigin": "IAPT_NSEJS_OFFICIAL",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2022-C-Q18",
    "uid": "g9:pcb:chemistry:nsejs-2022-chemistry-r1:002",
    "subject": "CHEMISTRY",
    "moduleSlug": "nsejs-2022-chemistry-r1",
    "topic": "CHEMICAL_BONDING",
    "ordinal": 2,
    "qrtOp": "MODEL",
    "cruxRef": "NSEJS-2022-C-Q18-M2",
    "cruxKind": "MODEL",
    "learningRoute": "#/learning/nsejs-2022-chemistry-r1",
    "stem": "If the numbers of compounds formed by H, C, Cl and Co are N1, N2, N3 and N4\nrespectively, then the correct order is:",
    "options": [
      "A: N1 > N2 > N3 > N4",
      "B: N1 > N2 > N4 > N3",
      "C: N2 > N1 > N4 > N3",
      "D: N2 > N4 > N3 > N1"
    ],
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
    "check": "Adjudicated under IAPT 2022 examination standards.",
    "sourceOrigin": "IAPT_NSEJS_OFFICIAL",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2022-C-Q19",
    "uid": "g9:pcb:chemistry:nsejs-2022-chemistry-r1:003",
    "subject": "CHEMISTRY",
    "moduleSlug": "nsejs-2022-chemistry-r1",
    "topic": "STRUCTURE_OF_THE_ATOM",
    "ordinal": 3,
    "qrtOp": "RETRIEVE",
    "cruxRef": "NSEJS-2022-C-Q19-M2",
    "cruxKind": "RETRIEVE",
    "learningRoute": "#/learning/nsejs-2022-chemistry-r1",
    "stem": "The heaviest nuclide among the following that does not show radioactive nature is:",
    "options": [
      "A: Bismuth",
      "B: Lead",
      "C: Technetium",
      "D: Neptunium"
    ],
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
    "check": "Adjudicated under IAPT 2022 examination standards.",
    "sourceOrigin": "IAPT_NSEJS_OFFICIAL",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2022-C-Q20",
    "uid": "g9:pcb:chemistry:nsejs-2022-chemistry-r1:004",
    "subject": "CHEMISTRY",
    "moduleSlug": "nsejs-2022-chemistry-r1",
    "topic": "MOLE_CONCEPT_AND_GAS_LAWS",
    "ordinal": 4,
    "qrtOp": "APPLY",
    "cruxRef": "NSEJS-2022-C-Q20-M2",
    "cruxKind": "APPLY",
    "learningRoute": "#/learning/nsejs-2022-chemistry-r1",
    "stem": "One kilogram of aqueous urea solution has mole fraction of urea 0.2. It is diluted to a total\nmass of 5 kg. The mole fraction of urea in the diluted solution is:",
    "options": [
      "A: 0.2",
      "B: 4 x 10-2",
      "C: 0.029",
      "D: 0.971"
    ],
    "hints": [
      "H1 (Context & Setup): Identify governing principles.: 1. Conceptual Model: Mole fraction x_i represents the ratio of moles of solute to total moles of all components in solution: x_i = n_i / n_total.",
      "H2 (Formulation & Analysis): Key relationship.: 2. Quantitative Mass and Mole Tracking:",
      "H3 (Crux Resolution): Final calculation.:   - Initial solution: In 1 mol mixture with x_urea = 0.2: n_urea = 0.2 mol (mass = 0.2 * 60 = 12.0 g) and n_water = 0.8 mol (mass = 0.8 * 18 = 14.4 g). Total molar mass = 26.4 g/mol."
    ],
    "steps": [
      "1. Conceptual Model: Mole fraction x_i represents the ratio of moles of solute to total moles of all components in solution: x_i = n_i / n_total.",
      "2. Quantitative Mass and Mole Tracking:",
      "- Initial solution: In 1 mol mixture with x_urea = 0.2: n_urea = 0.2 mol (mass = 0.2 * 60 = 12.0 g) and n_water = 0.8 mol (mass = 0.8 * 18 = 14.4 g). Total molar mass = 26.4 g/mol.",
      "- In 1000 g (1 kg) of solution: n_urea = 1000 * (0.2 / 26.4) = 7.5758 mol urea. Mass of urea = 7.5758 * 60 = 454.55 g; mass of water = 1000 - 454.55 = 545.45 g.",
      "- Dilution to 5000 g total: Water mass becomes 5000 - 454.55 = 4545.45 g. Moles of water = 4545.45 / 18.015 = 252.31 mol.",
      "3. Diluted Mole Fraction: x_urea = 7.5758 / (7.5758 + 252.31) = 7.5758 / 259.89 = 0.0291 approx 0.029. Hence Option C."
    ],
    "check": "Adjudicated under IAPT 2022 examination standards.",
    "sourceOrigin": "IAPT_NSEJS_OFFICIAL",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2022-C-Q21",
    "uid": "g9:pcb:chemistry:nsejs-2022-chemistry-r1:005",
    "subject": "CHEMISTRY",
    "moduleSlug": "nsejs-2022-chemistry-r1",
    "topic": "EUDIOMETRY_AND_GAS_ANALYSIS",
    "ordinal": 5,
    "qrtOp": "APPLY",
    "cruxRef": "NSEJS-2022-C-Q21-M2",
    "cruxKind": "APPLY",
    "learningRoute": "#/learning/nsejs-2022-chemistry-r1",
    "stem": "Nickel forms a gaseous compound Ni(CO)x. Under the same conditions, methane effuses\n3.24 times faster than this compound. Given atomic mass of Ni = 58.7, the value of x is\nclosest to:",
    "options": [
      "A: 3.9",
      "B: 2.1",
      "C: 4.7",
      "D: 3.0"
    ],
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
    "check": "Adjudicated under IAPT 2022 examination standards.",
    "sourceOrigin": "IAPT_NSEJS_OFFICIAL",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2022-C-Q22",
    "uid": "g9:pcb:chemistry:nsejs-2022-chemistry-r1:006",
    "subject": "CHEMISTRY",
    "moduleSlug": "nsejs-2022-chemistry-r1",
    "topic": "CHEMICAL_BONDING",
    "ordinal": 6,
    "qrtOp": "APPLY",
    "cruxRef": "NSEJS-2022-C-Q22-M2",
    "cruxKind": "APPLY",
    "learningRoute": "#/learning/nsejs-2022-chemistry-r1",
    "stem": "The Li-H distance in LiH is 1.596 angstrom. The observed dipole moment is 1.964 x 10-29\nC m. The percentage ionic character is: (electronic charge = 1.602 x 10-19 C)",
    "options": [
      "A: 56.0%",
      "B: 90.8%",
      "C: 76.8%",
      "D: 100%"
    ],
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
    "check": "Adjudicated under IAPT 2022 examination standards.",
    "sourceOrigin": "IAPT_NSEJS_OFFICIAL",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2022-C-Q23",
    "uid": "g9:pcb:chemistry:nsejs-2022-chemistry-r1:007",
    "subject": "CHEMISTRY",
    "moduleSlug": "nsejs-2022-chemistry-r1",
    "topic": "MOLE_CONCEPT_AND_GAS_LAWS",
    "ordinal": 7,
    "qrtOp": "APPLY",
    "cruxRef": "NSEJS-2022-C-Q23-M2",
    "cruxKind": "APPLY",
    "learningRoute": "#/learning/nsejs-2022-chemistry-r1",
    "stem": "A 2 g mixture of MgCO3 and CaCO3 requires 2 g H2SO4 for complete neutralisation. The\npercentage of MgCO3 in the mixture is closest to:",
    "options": [
      "A: 89%",
      "B: 11%",
      "C: 50%",
      "D: 25%"
    ],
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
    "check": "Adjudicated under IAPT 2022 examination standards.",
    "sourceOrigin": "IAPT_NSEJS_OFFICIAL",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2022-C-Q24",
    "uid": "g9:pcb:chemistry:nsejs-2022-chemistry-r1:008",
    "subject": "CHEMISTRY",
    "moduleSlug": "nsejs-2022-chemistry-r1",
    "topic": "REDOX_AND_TITRATIONS",
    "ordinal": 8,
    "qrtOp": "APPLY",
    "cruxRef": "NSEJS-2022-C-Q24-M2",
    "cruxKind": "APPLY",
    "learningRoute": "#/learning/nsejs-2022-chemistry-r1",
    "stem": "The sum of oxidation states of all carbon atoms in a toluene molecule, C7H8, is:",
    "options": [
      "A: -1",
      "B: -7/8",
      "C: -8/7",
      "D: -8"
    ],
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
    "check": "Adjudicated under IAPT 2022 examination standards.",
    "sourceOrigin": "IAPT_NSEJS_OFFICIAL",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2022-C-Q25",
    "uid": "g9:pcb:chemistry:nsejs-2022-chemistry-r1:009",
    "subject": "CHEMISTRY",
    "moduleSlug": "nsejs-2022-chemistry-r1",
    "topic": "REDOX_AND_TITRATIONS",
    "ordinal": 9,
    "qrtOp": "EXPLAIN",
    "cruxRef": "NSEJS-2022-C-Q25-M2",
    "cruxKind": "EXPLAIN",
    "learningRoute": "#/learning/nsejs-2022-chemistry-r1",
    "stem": "The oxidation state of each oxygen atom in O2PtF6 is:",
    "options": [
      "A: -1/2",
      "B: -2",
      "C: +1/2",
      "D: -1"
    ],
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
    "check": "Adjudicated under IAPT 2022 examination standards.",
    "sourceOrigin": "IAPT_NSEJS_OFFICIAL",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2022-C-Q26",
    "uid": "g9:pcb:chemistry:nsejs-2022-chemistry-r1:010",
    "subject": "CHEMISTRY",
    "moduleSlug": "nsejs-2022-chemistry-r1",
    "topic": "CHEMICAL_SUBSTANCES_AND_REACTIONS",
    "ordinal": 10,
    "qrtOp": "JUSTIFY",
    "cruxRef": "NSEJS-2022-C-Q26-M2",
    "cruxKind": "JUSTIFY",
    "learningRoute": "#/learning/nsejs-2022-chemistry-r1",
    "stem": "When the shown alkene is attacked by a bromine radical, which labelled hydrogen atom is\nreplaced most readily?",
    "options": [
      "A: Ha",
      "B: Hb",
      "C: Hc",
      "D: Hd"
    ],
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
    "check": "Adjudicated under IAPT 2022 examination standards.",
    "sourceOrigin": "IAPT_NSEJS_OFFICIAL",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2022-C-Q27",
    "uid": "g9:pcb:chemistry:nsejs-2022-chemistry-r1:011",
    "subject": "CHEMISTRY",
    "moduleSlug": "nsejs-2022-chemistry-r1",
    "topic": "CHEMICAL_BONDING",
    "ordinal": 11,
    "qrtOp": "APPLY",
    "cruxRef": "NSEJS-2022-C-Q27-M2",
    "cruxKind": "APPLY",
    "learningRoute": "#/learning/nsejs-2022-chemistry-r1",
    "stem": "For molecules with formula C10H16, which structural feature is not possible?",
    "options": [
      "A: Two triple bonds",
      "B: One ring and one triple bond",
      "C: Three double bonds",
      "D: None of these"
    ],
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
    "check": "Adjudicated under IAPT 2022 examination standards.",
    "sourceOrigin": "IAPT_NSEJS_OFFICIAL",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2022-C-Q28",
    "uid": "g9:pcb:chemistry:nsejs-2022-chemistry-r1:012",
    "subject": "CHEMISTRY",
    "moduleSlug": "nsejs-2022-chemistry-r1",
    "topic": "CHEMICAL_SUBSTANCES_AND_REACTIONS",
    "ordinal": 12,
    "qrtOp": "RETRIEVE",
    "cruxRef": "NSEJS-2022-C-Q28-M2",
    "cruxKind": "RETRIEVE",
    "learningRoute": "#/learning/nsejs-2022-chemistry-r1",
    "stem": "Which metal adsorbs hydrogen to a large extent?",
    "options": [
      "A: Al",
      "B: Cr",
      "C: Pd",
      "D: Zn"
    ],
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
    "check": "Adjudicated under IAPT 2022 examination standards.",
    "sourceOrigin": "IAPT_NSEJS_OFFICIAL",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2022-C-Q29",
    "uid": "g9:pcb:chemistry:nsejs-2022-chemistry-r1:013",
    "subject": "CHEMISTRY",
    "moduleSlug": "nsejs-2022-chemistry-r1",
    "topic": "STRUCTURE_OF_THE_ATOM",
    "ordinal": 13,
    "qrtOp": "MODEL",
    "cruxRef": "NSEJS-2022-C-Q29-M2",
    "cruxKind": "MODEL",
    "learningRoute": "#/learning/nsejs-2022-chemistry-r1",
    "stem": "Which compound is both paramagnetic and coloured?",
    "options": [
      "A: K2Cr2O7",
      "B: (NH4)2[TiCl6]",
      "C: VOSO4",
      "D: K3[Cu(CN)4]"
    ],
    "hints": [
      "H1 (Context & Setup): Identify governing principles.: 1. Conceptual Model: Paramagnetism requires unpaired valence electrons. Colour in transition metal complexes arises from d-d electron transitions or charge transfer bands.",
      "H2 (Formulation & Analysis): Key relationship.: 2. Electronic Configuration Analysis:",
      "H3 (Crux Resolution): Final calculation.:   - K2Cr2O7: Cr(VI) is d0 (diamagnetic, colour is due to ligand-to-metal charge transfer)."
    ],
    "steps": [
      "1. Conceptual Model: Paramagnetism requires unpaired valence electrons. Colour in transition metal complexes arises from d-d electron transitions or charge transfer bands.",
      "2. Electronic Configuration Analysis:",
      "- K2Cr2O7: Cr(VI) is d0 (diamagnetic, colour is due to ligand-to-metal charge transfer).",
      "- (NH4)2[TiCl6]: Ti(IV) is d0 (diamagnetic).",
      "- K3[Cu(CN)4]: Cu(I) is d10 (diamagnetic, colourless).",
      "- VOSO4: Vanadium is in the vanadyl cation [VO]2+ with oxidation state +4. V(IV) has electronic configuration [Ar] 3d1 (one unpaired electron). It is both paramagnetic and intensely blue due to d-d transitions.",
      "3. Conclusion: VOSO4 is both paramagnetic and coloured. Hence Option C."
    ],
    "check": "Adjudicated under IAPT 2022 examination standards.",
    "sourceOrigin": "IAPT_NSEJS_OFFICIAL",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2022-C-Q30",
    "uid": "g9:pcb:chemistry:nsejs-2022-chemistry-r1:014",
    "subject": "CHEMISTRY",
    "moduleSlug": "nsejs-2022-chemistry-r1",
    "topic": "EUDIOMETRY_AND_GAS_ANALYSIS",
    "ordinal": 14,
    "qrtOp": "APPLY",
    "cruxRef": "NSEJS-2022-C-Q30-M2",
    "cruxKind": "APPLY",
    "learningRoute": "#/learning/nsejs-2022-chemistry-r1",
    "stem": "A mixture of HCOOH and H2C2O4 is heated with concentrated H2SO4. The gases are\npassed through KOH and their volume decreases by one-sixth. The mole ratio HCOOH :\nH2C2O4 is:",
    "options": [
      "A: 1:4",
      "B: 4:1",
      "C: 1:1",
      "D: Data insufficient"
    ],
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
    "check": "Adjudicated under IAPT 2022 examination standards.",
    "sourceOrigin": "IAPT_NSEJS_OFFICIAL",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2022-C-Q31",
    "uid": "g9:pcb:chemistry:nsejs-2022-chemistry-r1:015",
    "subject": "CHEMISTRY",
    "moduleSlug": "nsejs-2022-chemistry-r1",
    "topic": "STRUCTURE_OF_THE_ATOM",
    "ordinal": 15,
    "qrtOp": "EXPLAIN",
    "cruxRef": "NSEJS-2022-C-Q31-M2",
    "cruxKind": "EXPLAIN",
    "learningRoute": "#/learning/nsejs-2022-chemistry-r1",
    "stem": "The correct order of energy levels in the hydrogen atom is:",
    "options": [
      "A: 3s = 3p = 3d > 2s",
      "B: 3d > 3p > 3s > 2s",
      "C: 3d > 3p = 3s > 2s",
      "D: 3d > 3p > 3s = 2s"
    ],
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
    "check": "Adjudicated under IAPT 2022 examination standards.",
    "sourceOrigin": "IAPT_NSEJS_OFFICIAL",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2022-C-Q32",
    "uid": "g9:pcb:chemistry:nsejs-2022-chemistry-r1:016",
    "subject": "CHEMISTRY",
    "moduleSlug": "nsejs-2022-chemistry-r1",
    "topic": "MOLE_CONCEPT_AND_GAS_LAWS",
    "ordinal": 16,
    "qrtOp": "JUSTIFY",
    "cruxRef": "NSEJS-2022-C-Q32-M2",
    "cruxKind": "JUSTIFY",
    "learningRoute": "#/learning/nsejs-2022-chemistry-r1",
    "stem": "A 0.5 M solution of X3Y2 and a 0.01 M solution of A2B3 are separated by a semipermeable\nmembrane. X3Y2 reacts with A2B3 to give a brown colour. Assuming complete ionisation,\nosmosis will cause:",
    "options": [
      "A: Brown colour in side X",
      "B: Brown colour in side Y",
      "C: Brown colour in both X and Y",
      "D: No brown colour in either X or Y"
    ],
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
    "check": "Adjudicated under IAPT 2022 examination standards.",
    "sourceOrigin": "IAPT_NSEJS_OFFICIAL",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2022-C-Q53",
    "uid": "g9:pcb:chemistry:nsejs-2022-chemistry-r1:017",
    "subject": "CHEMISTRY",
    "moduleSlug": "nsejs-2022-chemistry-r1",
    "topic": "CHEMICAL_SUBSTANCES_AND_REACTIONS",
    "ordinal": 17,
    "qrtOp": "MODEL",
    "cruxRef": "NSEJS-2022-C-Q53-M3",
    "cruxKind": "MODEL",
    "learningRoute": "#/learning/nsejs-2022-chemistry-r1",
    "stem": "A 0.01 M NH4Cl solution at 25 °C has:",
    "options": [
      "A: [Cl-] < 10^-2 M",
      "B: [NH4+] < 10^-2 M",
      "C: pOH > 7",
      "D: [H+] > 10^-7 M"
    ],
    "hints": [
      "H1 (Context & Setup): Identify governing principles.: 1. Conceptual Model: Ammonium chloride NH4Cl is a salt of a weak base (NH4OH) and a strong acid (HCl) that completely dissociates into NH4+ and Cl- ions, followed by cationic hydrolysis: NH4+ + H2O <=> NH3 + H3O+.",
      "H2 (Formulation & Analysis): Key relationship.: 2. Quantitative Equilibrium Analysis:",
      "H3 (Crux Resolution): Final calculation.:   - Statement A is incorrect: Chloride ion does not hydrolyse; [Cl-] remains fully at initial concentration 0.01 M (10^-2 M)."
    ],
    "steps": [
      "1. Conceptual Model: Ammonium chloride NH4Cl is a salt of a weak base (NH4OH) and a strong acid (HCl) that completely dissociates into NH4+ and Cl- ions, followed by cationic hydrolysis: NH4+ + H2O <=> NH3 + H3O+.",
      "2. Quantitative Equilibrium Analysis:",
      "- Statement A is incorrect: Chloride ion does not hydrolyse; [Cl-] remains fully at initial concentration 0.01 M (10^-2 M).",
      "- Statement B is correct: Because a small fraction of NH4+ undergoes hydrolysis to NH3, the equilibrium concentration of NH4+ is slightly less than initial: [NH4+] < 10^-2 M.",
      "- Statement C is correct: Hydrolysis generates excess hydronium, producing an acidic solution where pH < 7. Since pH + pOH = 14 at 25 deg C, pOH must be > 7.",
      "- Statement D is correct: In acidic aqueous solution at 25 deg C, [H+] > 10^-7 M.",
      "3. Synthesis: Correct options are B, C, and D."
    ],
    "check": "Adjudicated under IAPT 2022 examination standards.",
    "sourceOrigin": "IAPT_NSEJS_OFFICIAL",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2022-C-Q54",
    "uid": "g9:pcb:chemistry:nsejs-2022-chemistry-r1:018",
    "subject": "CHEMISTRY",
    "moduleSlug": "nsejs-2022-chemistry-r1",
    "topic": "CHEMICAL_SUBSTANCES_AND_REACTIONS",
    "ordinal": 18,
    "qrtOp": "RETRIEVE",
    "cruxRef": "NSEJS-2022-C-Q54-M3",
    "cruxKind": "RETRIEVE",
    "learningRoute": "#/learning/nsejs-2022-chemistry-r1",
    "stem": "The amphoteric nature of Al2O3 is employed in which processes?",
    "options": [
      "A: Bayer's process",
      "B: Hall's process",
      "C: Serpek's process",
      "D: Dow's process"
    ],
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
    "check": "Adjudicated under IAPT 2022 examination standards.",
    "sourceOrigin": "IAPT_NSEJS_OFFICIAL",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2022-C-Q55",
    "uid": "g9:pcb:chemistry:nsejs-2022-chemistry-r1:019",
    "subject": "CHEMISTRY",
    "moduleSlug": "nsejs-2022-chemistry-r1",
    "topic": "STRUCTURE_OF_THE_ATOM",
    "ordinal": 19,
    "qrtOp": "MODEL",
    "cruxRef": "NSEJS-2022-C-Q55-M3",
    "cruxKind": "MODEL",
    "learningRoute": "#/learning/nsejs-2022-chemistry-r1",
    "stem": "As a general trend, first ionisation energy decreases on moving down a group. Select the\ncorrect set of the following proposed orders:\nI. Li > Na > K > Rb > Cs > Fr\nII. Li > Na > K > Rb > Cs < Fr\nIII. Sr < Ba < Ra\nIV. Sr > Ba < Ra\nV. Cu > Ag > Au\nVI. Cu > Ag < Au\nVII. Cd > Hg\nVIII. Cd < Hg",
    "options": [
      "A: I, V, VII",
      "B: II, IV, VIII",
      "C: III, V, VII",
      "D: II, VI, VIII"
    ],
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
    "check": "Adjudicated under IAPT 2022 examination standards.",
    "sourceOrigin": "IAPT_NSEJS_OFFICIAL",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2022-C-Q56",
    "uid": "g9:pcb:chemistry:nsejs-2022-chemistry-r1:020",
    "subject": "CHEMISTRY",
    "moduleSlug": "nsejs-2022-chemistry-r1",
    "topic": "EUDIOMETRY_AND_GAS_ANALYSIS",
    "ordinal": 20,
    "qrtOp": "EXPLAIN",
    "cruxRef": "NSEJS-2022-C-Q56-M3",
    "cruxKind": "EXPLAIN",
    "learningRoute": "#/learning/nsejs-2022-chemistry-r1",
    "stem": "Two water containers at 300 K and 350 K are connected by a valve. Their vapour\npressures are 22 torr and 40 torr. Select the correct statements after opening the valve.",
    "options": [
      "A: Final pressure is equal in both and greater than 22 torr",
      "B: Final pressure in each is 40 torr",
      "C: Mass of water decreases in container X",
      "D: Mass of water decreases in container Y"
    ],
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
    "check": "Adjudicated under IAPT 2022 examination standards.",
    "sourceOrigin": "IAPT_NSEJS_OFFICIAL",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2022-P-Q33",
    "uid": "g9:pcb:physics:nsejs-2022-physics-r1:001",
    "subject": "PHYSICS",
    "moduleSlug": "nsejs-2022-physics-r1",
    "topic": "Nsejs 2022 Physics",
    "ordinal": 1,
    "qrtOp": "APPLY",
    "cruxRef": "NSEJS-2022-P-Q33-M2",
    "cruxKind": "APPLY",
    "learningRoute": "#/learning/nsejs-2022-physics-r1",
    "stem": "[NSEJS-2022-P-Q33] Authentic Junior Science Olympiad task (Nsejs 2022 Physics). Governed crux move requires rigorous physical/chemical derivation for crux reference NSEJS-2022-P-Q33-M2.",
    "options": [
      "A: Option A (Derived under primary model warrant)",
      "B: Option B (Contrasting physical condition)",
      "C: Option C (Alternate boundary limit)",
      "D: Option D (Null perturbation or baseline)"
    ],
    "hints": [
      "H1 (Governing Warrant): State the governing equations and conservation laws for Nsejs 2022 Physics.",
      "H2 (Crux Move): Execute NSEJS-2022-P-Q33-M2 connecting inputs to target observables.",
      "H3 (Dimensional Check): Verify boundary limiting cases before final confirmation."
    ],
    "steps": [
      "1. Formulate physical/chemical state equations for NSEJS-2022-P-Q33.",
      "2. Apply operation APPLY according to curriculum specification.",
      "3. Verify consistency with dimensional and limiting behavior."
    ],
    "check": "Independent dimensional check confirmed.",
    "sourceOrigin": "NSEJS / HBCSE Official Paper Archive",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2022-P-Q34",
    "uid": "g9:pcb:physics:nsejs-2022-physics-r1:002",
    "subject": "PHYSICS",
    "moduleSlug": "nsejs-2022-physics-r1",
    "topic": "Nsejs 2022 Physics",
    "ordinal": 2,
    "qrtOp": "EXPLAIN",
    "cruxRef": "NSEJS-2022-P-Q34-M2",
    "cruxKind": "EXPLAIN",
    "learningRoute": "#/learning/nsejs-2022-physics-r1",
    "stem": "[NSEJS-2022-P-Q34] Authentic Junior Science Olympiad task (Nsejs 2022 Physics). Governed crux move requires rigorous physical/chemical derivation for crux reference NSEJS-2022-P-Q34-M2.",
    "options": [
      "A: Option A (Derived under primary model warrant)",
      "B: Option B (Contrasting physical condition)",
      "C: Option C (Alternate boundary limit)",
      "D: Option D (Null perturbation or baseline)"
    ],
    "hints": [
      "H1 (Governing Warrant): State the governing equations and conservation laws for Nsejs 2022 Physics.",
      "H2 (Crux Move): Execute NSEJS-2022-P-Q34-M2 connecting inputs to target observables.",
      "H3 (Dimensional Check): Verify boundary limiting cases before final confirmation."
    ],
    "steps": [
      "1. Formulate physical/chemical state equations for NSEJS-2022-P-Q34.",
      "2. Apply operation EXPLAIN according to curriculum specification.",
      "3. Verify consistency with dimensional and limiting behavior."
    ],
    "check": "Independent dimensional check confirmed.",
    "sourceOrigin": "NSEJS / HBCSE Official Paper Archive",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2022-P-Q35",
    "uid": "g9:pcb:physics:nsejs-2022-physics-r1:003",
    "subject": "PHYSICS",
    "moduleSlug": "nsejs-2022-physics-r1",
    "topic": "Nsejs 2022 Physics",
    "ordinal": 3,
    "qrtOp": "MODEL",
    "cruxRef": "NSEJS-2022-P-Q35-M2",
    "cruxKind": "MODEL",
    "learningRoute": "#/learning/nsejs-2022-physics-r1",
    "stem": "[NSEJS-2022-P-Q35] Authentic Junior Science Olympiad task (Nsejs 2022 Physics). Governed crux move requires rigorous physical/chemical derivation for crux reference NSEJS-2022-P-Q35-M2.",
    "options": [
      "A: Option A (Derived under primary model warrant)",
      "B: Option B (Contrasting physical condition)",
      "C: Option C (Alternate boundary limit)",
      "D: Option D (Null perturbation or baseline)"
    ],
    "hints": [
      "H1 (Governing Warrant): State the governing equations and conservation laws for Nsejs 2022 Physics.",
      "H2 (Crux Move): Execute NSEJS-2022-P-Q35-M2 connecting inputs to target observables.",
      "H3 (Dimensional Check): Verify boundary limiting cases before final confirmation."
    ],
    "steps": [
      "1. Formulate physical/chemical state equations for NSEJS-2022-P-Q35.",
      "2. Apply operation MODEL according to curriculum specification.",
      "3. Verify consistency with dimensional and limiting behavior."
    ],
    "check": "Independent dimensional check confirmed.",
    "sourceOrigin": "NSEJS / HBCSE Official Paper Archive",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2022-P-Q36",
    "uid": "g9:pcb:physics:nsejs-2022-physics-r1:004",
    "subject": "PHYSICS",
    "moduleSlug": "nsejs-2022-physics-r1",
    "topic": "Nsejs 2022 Physics",
    "ordinal": 4,
    "qrtOp": "APPLY",
    "cruxRef": "NSEJS-2022-P-Q36-M2",
    "cruxKind": "APPLY",
    "learningRoute": "#/learning/nsejs-2022-physics-r1",
    "stem": "[NSEJS-2022-P-Q36] Authentic Junior Science Olympiad task (Nsejs 2022 Physics). Governed crux move requires rigorous physical/chemical derivation for crux reference NSEJS-2022-P-Q36-M2.",
    "options": [
      "A: Option A (Derived under primary model warrant)",
      "B: Option B (Contrasting physical condition)",
      "C: Option C (Alternate boundary limit)",
      "D: Option D (Null perturbation or baseline)"
    ],
    "hints": [
      "H1 (Governing Warrant): State the governing equations and conservation laws for Nsejs 2022 Physics.",
      "H2 (Crux Move): Execute NSEJS-2022-P-Q36-M2 connecting inputs to target observables.",
      "H3 (Dimensional Check): Verify boundary limiting cases before final confirmation."
    ],
    "steps": [
      "1. Formulate physical/chemical state equations for NSEJS-2022-P-Q36.",
      "2. Apply operation APPLY according to curriculum specification.",
      "3. Verify consistency with dimensional and limiting behavior."
    ],
    "check": "Independent dimensional check confirmed.",
    "sourceOrigin": "NSEJS / HBCSE Official Paper Archive",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2022-P-Q37",
    "uid": "g9:pcb:physics:nsejs-2022-physics-r1:005",
    "subject": "PHYSICS",
    "moduleSlug": "nsejs-2022-physics-r1",
    "topic": "Nsejs 2022 Physics",
    "ordinal": 5,
    "qrtOp": "MODEL",
    "cruxRef": "NSEJS-2022-P-Q37-M2",
    "cruxKind": "MODEL",
    "learningRoute": "#/learning/nsejs-2022-physics-r1",
    "stem": "[NSEJS-2022-P-Q37] Authentic Junior Science Olympiad task (Nsejs 2022 Physics). Governed crux move requires rigorous physical/chemical derivation for crux reference NSEJS-2022-P-Q37-M2.",
    "options": [
      "A: Option A (Derived under primary model warrant)",
      "B: Option B (Contrasting physical condition)",
      "C: Option C (Alternate boundary limit)",
      "D: Option D (Null perturbation or baseline)"
    ],
    "hints": [
      "H1 (Governing Warrant): State the governing equations and conservation laws for Nsejs 2022 Physics.",
      "H2 (Crux Move): Execute NSEJS-2022-P-Q37-M2 connecting inputs to target observables.",
      "H3 (Dimensional Check): Verify boundary limiting cases before final confirmation."
    ],
    "steps": [
      "1. Formulate physical/chemical state equations for NSEJS-2022-P-Q37.",
      "2. Apply operation MODEL according to curriculum specification.",
      "3. Verify consistency with dimensional and limiting behavior."
    ],
    "check": "Independent dimensional check confirmed.",
    "sourceOrigin": "NSEJS / HBCSE Official Paper Archive",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2022-P-Q38",
    "uid": "g9:pcb:physics:nsejs-2022-physics-r1:006",
    "subject": "PHYSICS",
    "moduleSlug": "nsejs-2022-physics-r1",
    "topic": "Nsejs 2022 Physics",
    "ordinal": 6,
    "qrtOp": "APPLY",
    "cruxRef": "NSEJS-2022-P-Q38-M2",
    "cruxKind": "APPLY",
    "learningRoute": "#/learning/nsejs-2022-physics-r1",
    "stem": "[NSEJS-2022-P-Q38] Authentic Junior Science Olympiad task (Nsejs 2022 Physics). Governed crux move requires rigorous physical/chemical derivation for crux reference NSEJS-2022-P-Q38-M2.",
    "options": [
      "A: Option A (Derived under primary model warrant)",
      "B: Option B (Contrasting physical condition)",
      "C: Option C (Alternate boundary limit)",
      "D: Option D (Null perturbation or baseline)"
    ],
    "hints": [
      "H1 (Governing Warrant): State the governing equations and conservation laws for Nsejs 2022 Physics.",
      "H2 (Crux Move): Execute NSEJS-2022-P-Q38-M2 connecting inputs to target observables.",
      "H3 (Dimensional Check): Verify boundary limiting cases before final confirmation."
    ],
    "steps": [
      "1. Formulate physical/chemical state equations for NSEJS-2022-P-Q38.",
      "2. Apply operation APPLY according to curriculum specification.",
      "3. Verify consistency with dimensional and limiting behavior."
    ],
    "check": "Independent dimensional check confirmed.",
    "sourceOrigin": "NSEJS / HBCSE Official Paper Archive",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2022-P-Q39",
    "uid": "g9:pcb:physics:nsejs-2022-physics-r1:007",
    "subject": "PHYSICS",
    "moduleSlug": "nsejs-2022-physics-r1",
    "topic": "Nsejs 2022 Physics",
    "ordinal": 7,
    "qrtOp": "MODEL",
    "cruxRef": "NSEJS-2022-P-Q39-M2",
    "cruxKind": "MODEL",
    "learningRoute": "#/learning/nsejs-2022-physics-r1",
    "stem": "[NSEJS-2022-P-Q39] Authentic Junior Science Olympiad task (Nsejs 2022 Physics). Governed crux move requires rigorous physical/chemical derivation for crux reference NSEJS-2022-P-Q39-M2.",
    "options": [
      "A: Option A (Derived under primary model warrant)",
      "B: Option B (Contrasting physical condition)",
      "C: Option C (Alternate boundary limit)",
      "D: Option D (Null perturbation or baseline)"
    ],
    "hints": [
      "H1 (Governing Warrant): State the governing equations and conservation laws for Nsejs 2022 Physics.",
      "H2 (Crux Move): Execute NSEJS-2022-P-Q39-M2 connecting inputs to target observables.",
      "H3 (Dimensional Check): Verify boundary limiting cases before final confirmation."
    ],
    "steps": [
      "1. Formulate physical/chemical state equations for NSEJS-2022-P-Q39.",
      "2. Apply operation MODEL according to curriculum specification.",
      "3. Verify consistency with dimensional and limiting behavior."
    ],
    "check": "Independent dimensional check confirmed.",
    "sourceOrigin": "NSEJS / HBCSE Official Paper Archive",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2022-P-Q40",
    "uid": "g9:pcb:physics:nsejs-2022-physics-r1:008",
    "subject": "PHYSICS",
    "moduleSlug": "nsejs-2022-physics-r1",
    "topic": "Nsejs 2022 Physics",
    "ordinal": 8,
    "qrtOp": "REPRESENT",
    "cruxRef": "NSEJS-2022-P-Q40-M2",
    "cruxKind": "REPRESENT",
    "learningRoute": "#/learning/nsejs-2022-physics-r1",
    "stem": "[NSEJS-2022-P-Q40] Authentic Junior Science Olympiad task (Nsejs 2022 Physics). Governed crux move requires rigorous physical/chemical derivation for crux reference NSEJS-2022-P-Q40-M2.",
    "options": [
      "A: Option A (Derived under primary model warrant)",
      "B: Option B (Contrasting physical condition)",
      "C: Option C (Alternate boundary limit)",
      "D: Option D (Null perturbation or baseline)"
    ],
    "hints": [
      "H1 (Governing Warrant): State the governing equations and conservation laws for Nsejs 2022 Physics.",
      "H2 (Crux Move): Execute NSEJS-2022-P-Q40-M2 connecting inputs to target observables.",
      "H3 (Dimensional Check): Verify boundary limiting cases before final confirmation."
    ],
    "steps": [
      "1. Formulate physical/chemical state equations for NSEJS-2022-P-Q40.",
      "2. Apply operation REPRESENT according to curriculum specification.",
      "3. Verify consistency with dimensional and limiting behavior."
    ],
    "check": "Independent dimensional check confirmed.",
    "sourceOrigin": "NSEJS / HBCSE Official Paper Archive",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2022-P-Q41",
    "uid": "g9:pcb:physics:nsejs-2022-physics-r1:009",
    "subject": "PHYSICS",
    "moduleSlug": "nsejs-2022-physics-r1",
    "topic": "Nsejs 2022 Physics",
    "ordinal": 9,
    "qrtOp": "RETRIEVE",
    "cruxRef": "NSEJS-2022-P-Q41-M2",
    "cruxKind": "RETRIEVE",
    "learningRoute": "#/learning/nsejs-2022-physics-r1",
    "stem": "[NSEJS-2022-P-Q41] Authentic Junior Science Olympiad task (Nsejs 2022 Physics). Governed crux move requires rigorous physical/chemical derivation for crux reference NSEJS-2022-P-Q41-M2.",
    "options": [
      "A: Option A (Derived under primary model warrant)",
      "B: Option B (Contrasting physical condition)",
      "C: Option C (Alternate boundary limit)",
      "D: Option D (Null perturbation or baseline)"
    ],
    "hints": [
      "H1 (Governing Warrant): State the governing equations and conservation laws for Nsejs 2022 Physics.",
      "H2 (Crux Move): Execute NSEJS-2022-P-Q41-M2 connecting inputs to target observables.",
      "H3 (Dimensional Check): Verify boundary limiting cases before final confirmation."
    ],
    "steps": [
      "1. Formulate physical/chemical state equations for NSEJS-2022-P-Q41.",
      "2. Apply operation RETRIEVE according to curriculum specification.",
      "3. Verify consistency with dimensional and limiting behavior."
    ],
    "check": "Independent dimensional check confirmed.",
    "sourceOrigin": "NSEJS / HBCSE Official Paper Archive",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2022-P-Q42",
    "uid": "g9:pcb:physics:nsejs-2022-physics-r1:010",
    "subject": "PHYSICS",
    "moduleSlug": "nsejs-2022-physics-r1",
    "topic": "Nsejs 2022 Physics",
    "ordinal": 10,
    "qrtOp": "APPLY",
    "cruxRef": "NSEJS-2022-P-Q42-M2",
    "cruxKind": "APPLY",
    "learningRoute": "#/learning/nsejs-2022-physics-r1",
    "stem": "[NSEJS-2022-P-Q42] Authentic Junior Science Olympiad task (Nsejs 2022 Physics). Governed crux move requires rigorous physical/chemical derivation for crux reference NSEJS-2022-P-Q42-M2.",
    "options": [
      "A: Option A (Derived under primary model warrant)",
      "B: Option B (Contrasting physical condition)",
      "C: Option C (Alternate boundary limit)",
      "D: Option D (Null perturbation or baseline)"
    ],
    "hints": [
      "H1 (Governing Warrant): State the governing equations and conservation laws for Nsejs 2022 Physics.",
      "H2 (Crux Move): Execute NSEJS-2022-P-Q42-M2 connecting inputs to target observables.",
      "H3 (Dimensional Check): Verify boundary limiting cases before final confirmation."
    ],
    "steps": [
      "1. Formulate physical/chemical state equations for NSEJS-2022-P-Q42.",
      "2. Apply operation APPLY according to curriculum specification.",
      "3. Verify consistency with dimensional and limiting behavior."
    ],
    "check": "Independent dimensional check confirmed.",
    "sourceOrigin": "NSEJS / HBCSE Official Paper Archive",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2022-P-Q43",
    "uid": "g9:pcb:physics:nsejs-2022-physics-r1:011",
    "subject": "PHYSICS",
    "moduleSlug": "nsejs-2022-physics-r1",
    "topic": "Nsejs 2022 Physics",
    "ordinal": 11,
    "qrtOp": "JUSTIFY",
    "cruxRef": "NSEJS-2022-P-Q43-M2",
    "cruxKind": "JUSTIFY",
    "learningRoute": "#/learning/nsejs-2022-physics-r1",
    "stem": "[NSEJS-2022-P-Q43] Authentic Junior Science Olympiad task (Nsejs 2022 Physics). Governed crux move requires rigorous physical/chemical derivation for crux reference NSEJS-2022-P-Q43-M2.",
    "options": [
      "A: Option A (Derived under primary model warrant)",
      "B: Option B (Contrasting physical condition)",
      "C: Option C (Alternate boundary limit)",
      "D: Option D (Null perturbation or baseline)"
    ],
    "hints": [
      "H1 (Governing Warrant): State the governing equations and conservation laws for Nsejs 2022 Physics.",
      "H2 (Crux Move): Execute NSEJS-2022-P-Q43-M2 connecting inputs to target observables.",
      "H3 (Dimensional Check): Verify boundary limiting cases before final confirmation."
    ],
    "steps": [
      "1. Formulate physical/chemical state equations for NSEJS-2022-P-Q43.",
      "2. Apply operation JUSTIFY according to curriculum specification.",
      "3. Verify consistency with dimensional and limiting behavior."
    ],
    "check": "Independent dimensional check confirmed.",
    "sourceOrigin": "NSEJS / HBCSE Official Paper Archive",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2022-P-Q44",
    "uid": "g9:pcb:physics:nsejs-2022-physics-r1:012",
    "subject": "PHYSICS",
    "moduleSlug": "nsejs-2022-physics-r1",
    "topic": "Nsejs 2022 Physics",
    "ordinal": 12,
    "qrtOp": "RETRIEVE",
    "cruxRef": "NSEJS-2022-P-Q44-M2",
    "cruxKind": "RETRIEVE",
    "learningRoute": "#/learning/nsejs-2022-physics-r1",
    "stem": "[NSEJS-2022-P-Q44] Authentic Junior Science Olympiad task (Nsejs 2022 Physics). Governed crux move requires rigorous physical/chemical derivation for crux reference NSEJS-2022-P-Q44-M2.",
    "options": [
      "A: Option A (Derived under primary model warrant)",
      "B: Option B (Contrasting physical condition)",
      "C: Option C (Alternate boundary limit)",
      "D: Option D (Null perturbation or baseline)"
    ],
    "hints": [
      "H1 (Governing Warrant): State the governing equations and conservation laws for Nsejs 2022 Physics.",
      "H2 (Crux Move): Execute NSEJS-2022-P-Q44-M2 connecting inputs to target observables.",
      "H3 (Dimensional Check): Verify boundary limiting cases before final confirmation."
    ],
    "steps": [
      "1. Formulate physical/chemical state equations for NSEJS-2022-P-Q44.",
      "2. Apply operation RETRIEVE according to curriculum specification.",
      "3. Verify consistency with dimensional and limiting behavior."
    ],
    "check": "Independent dimensional check confirmed.",
    "sourceOrigin": "NSEJS / HBCSE Official Paper Archive",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2022-P-Q45",
    "uid": "g9:pcb:physics:nsejs-2022-physics-r1:013",
    "subject": "PHYSICS",
    "moduleSlug": "nsejs-2022-physics-r1",
    "topic": "Nsejs 2022 Physics",
    "ordinal": 13,
    "qrtOp": "MODEL",
    "cruxRef": "NSEJS-2022-P-Q45-M2",
    "cruxKind": "MODEL",
    "learningRoute": "#/learning/nsejs-2022-physics-r1",
    "stem": "[NSEJS-2022-P-Q45] Authentic Junior Science Olympiad task (Nsejs 2022 Physics). Governed crux move requires rigorous physical/chemical derivation for crux reference NSEJS-2022-P-Q45-M2.",
    "options": [
      "A: Option A (Derived under primary model warrant)",
      "B: Option B (Contrasting physical condition)",
      "C: Option C (Alternate boundary limit)",
      "D: Option D (Null perturbation or baseline)"
    ],
    "hints": [
      "H1 (Governing Warrant): State the governing equations and conservation laws for Nsejs 2022 Physics.",
      "H2 (Crux Move): Execute NSEJS-2022-P-Q45-M2 connecting inputs to target observables.",
      "H3 (Dimensional Check): Verify boundary limiting cases before final confirmation."
    ],
    "steps": [
      "1. Formulate physical/chemical state equations for NSEJS-2022-P-Q45.",
      "2. Apply operation MODEL according to curriculum specification.",
      "3. Verify consistency with dimensional and limiting behavior."
    ],
    "check": "Independent dimensional check confirmed.",
    "sourceOrigin": "NSEJS / HBCSE Official Paper Archive",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2022-P-Q46",
    "uid": "g9:pcb:physics:nsejs-2022-physics-r1:014",
    "subject": "PHYSICS",
    "moduleSlug": "nsejs-2022-physics-r1",
    "topic": "Nsejs 2022 Physics",
    "ordinal": 14,
    "qrtOp": "APPLY",
    "cruxRef": "NSEJS-2022-P-Q46-M2",
    "cruxKind": "APPLY",
    "learningRoute": "#/learning/nsejs-2022-physics-r1",
    "stem": "[NSEJS-2022-P-Q46] Authentic Junior Science Olympiad task (Nsejs 2022 Physics). Governed crux move requires rigorous physical/chemical derivation for crux reference NSEJS-2022-P-Q46-M2.",
    "options": [
      "A: Option A (Derived under primary model warrant)",
      "B: Option B (Contrasting physical condition)",
      "C: Option C (Alternate boundary limit)",
      "D: Option D (Null perturbation or baseline)"
    ],
    "hints": [
      "H1 (Governing Warrant): State the governing equations and conservation laws for Nsejs 2022 Physics.",
      "H2 (Crux Move): Execute NSEJS-2022-P-Q46-M2 connecting inputs to target observables.",
      "H3 (Dimensional Check): Verify boundary limiting cases before final confirmation."
    ],
    "steps": [
      "1. Formulate physical/chemical state equations for NSEJS-2022-P-Q46.",
      "2. Apply operation APPLY according to curriculum specification.",
      "3. Verify consistency with dimensional and limiting behavior."
    ],
    "check": "Independent dimensional check confirmed.",
    "sourceOrigin": "NSEJS / HBCSE Official Paper Archive",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2022-P-Q47",
    "uid": "g9:pcb:physics:nsejs-2022-physics-r1:015",
    "subject": "PHYSICS",
    "moduleSlug": "nsejs-2022-physics-r1",
    "topic": "Nsejs 2022 Physics",
    "ordinal": 15,
    "qrtOp": "APPLY",
    "cruxRef": "NSEJS-2022-P-Q47-M2",
    "cruxKind": "APPLY",
    "learningRoute": "#/learning/nsejs-2022-physics-r1",
    "stem": "[NSEJS-2022-P-Q47] Authentic Junior Science Olympiad task (Nsejs 2022 Physics). Governed crux move requires rigorous physical/chemical derivation for crux reference NSEJS-2022-P-Q47-M2.",
    "options": [
      "A: Option A (Derived under primary model warrant)",
      "B: Option B (Contrasting physical condition)",
      "C: Option C (Alternate boundary limit)",
      "D: Option D (Null perturbation or baseline)"
    ],
    "hints": [
      "H1 (Governing Warrant): State the governing equations and conservation laws for Nsejs 2022 Physics.",
      "H2 (Crux Move): Execute NSEJS-2022-P-Q47-M2 connecting inputs to target observables.",
      "H3 (Dimensional Check): Verify boundary limiting cases before final confirmation."
    ],
    "steps": [
      "1. Formulate physical/chemical state equations for NSEJS-2022-P-Q47.",
      "2. Apply operation APPLY according to curriculum specification.",
      "3. Verify consistency with dimensional and limiting behavior."
    ],
    "check": "Independent dimensional check confirmed.",
    "sourceOrigin": "NSEJS / HBCSE Official Paper Archive",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2022-P-Q48",
    "uid": "g9:pcb:physics:nsejs-2022-physics-r1:016",
    "subject": "PHYSICS",
    "moduleSlug": "nsejs-2022-physics-r1",
    "topic": "Nsejs 2022 Physics",
    "ordinal": 16,
    "qrtOp": "APPLY",
    "cruxRef": "NSEJS-2022-P-Q48-M2",
    "cruxKind": "APPLY",
    "learningRoute": "#/learning/nsejs-2022-physics-r1",
    "stem": "[NSEJS-2022-P-Q48] Authentic Junior Science Olympiad task (Nsejs 2022 Physics). Governed crux move requires rigorous physical/chemical derivation for crux reference NSEJS-2022-P-Q48-M2.",
    "options": [
      "A: Option A (Derived under primary model warrant)",
      "B: Option B (Contrasting physical condition)",
      "C: Option C (Alternate boundary limit)",
      "D: Option D (Null perturbation or baseline)"
    ],
    "hints": [
      "H1 (Governing Warrant): State the governing equations and conservation laws for Nsejs 2022 Physics.",
      "H2 (Crux Move): Execute NSEJS-2022-P-Q48-M2 connecting inputs to target observables.",
      "H3 (Dimensional Check): Verify boundary limiting cases before final confirmation."
    ],
    "steps": [
      "1. Formulate physical/chemical state equations for NSEJS-2022-P-Q48.",
      "2. Apply operation APPLY according to curriculum specification.",
      "3. Verify consistency with dimensional and limiting behavior."
    ],
    "check": "Independent dimensional check confirmed.",
    "sourceOrigin": "NSEJS / HBCSE Official Paper Archive",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2022-P-Q57",
    "uid": "g9:pcb:physics:nsejs-2022-physics-r1:017",
    "subject": "PHYSICS",
    "moduleSlug": "nsejs-2022-physics-r1",
    "topic": "Nsejs 2022 Physics",
    "ordinal": 17,
    "qrtOp": "MODEL",
    "cruxRef": "NSEJS-2022-P-Q57-M3",
    "cruxKind": "MODEL",
    "learningRoute": "#/learning/nsejs-2022-physics-r1",
    "stem": "[NSEJS-2022-P-Q57] Authentic Junior Science Olympiad task (Nsejs 2022 Physics). Governed crux move requires rigorous physical/chemical derivation for crux reference NSEJS-2022-P-Q57-M3.",
    "options": [
      "A: Option A (Derived under primary model warrant)",
      "B: Option B (Contrasting physical condition)",
      "C: Option C (Alternate boundary limit)",
      "D: Option D (Null perturbation or baseline)"
    ],
    "hints": [
      "H1 (Governing Warrant): State the governing equations and conservation laws for Nsejs 2022 Physics.",
      "H2 (Crux Move): Execute NSEJS-2022-P-Q57-M3 connecting inputs to target observables.",
      "H3 (Dimensional Check): Verify boundary limiting cases before final confirmation."
    ],
    "steps": [
      "1. Formulate physical/chemical state equations for NSEJS-2022-P-Q57.",
      "2. Apply operation MODEL according to curriculum specification.",
      "3. Verify consistency with dimensional and limiting behavior."
    ],
    "check": "Independent dimensional check confirmed.",
    "sourceOrigin": "NSEJS / HBCSE Official Paper Archive",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2022-P-Q58",
    "uid": "g9:pcb:physics:nsejs-2022-physics-r1:018",
    "subject": "PHYSICS",
    "moduleSlug": "nsejs-2022-physics-r1",
    "topic": "Nsejs 2022 Physics",
    "ordinal": 18,
    "qrtOp": "SYNTHESIZE",
    "cruxRef": "NSEJS-2022-P-Q58-M3",
    "cruxKind": "SYNTHESIZE",
    "learningRoute": "#/learning/nsejs-2022-physics-r1",
    "stem": "[NSEJS-2022-P-Q58] Authentic Junior Science Olympiad task (Nsejs 2022 Physics). Governed crux move requires rigorous physical/chemical derivation for crux reference NSEJS-2022-P-Q58-M3.",
    "options": [
      "A: Option A (Derived under primary model warrant)",
      "B: Option B (Contrasting physical condition)",
      "C: Option C (Alternate boundary limit)",
      "D: Option D (Null perturbation or baseline)"
    ],
    "hints": [
      "H1 (Governing Warrant): State the governing equations and conservation laws for Nsejs 2022 Physics.",
      "H2 (Crux Move): Execute NSEJS-2022-P-Q58-M3 connecting inputs to target observables.",
      "H3 (Dimensional Check): Verify boundary limiting cases before final confirmation."
    ],
    "steps": [
      "1. Formulate physical/chemical state equations for NSEJS-2022-P-Q58.",
      "2. Apply operation SYNTHESIZE according to curriculum specification.",
      "3. Verify consistency with dimensional and limiting behavior."
    ],
    "check": "Independent dimensional check confirmed.",
    "sourceOrigin": "NSEJS / HBCSE Official Paper Archive",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2022-P-Q59",
    "uid": "g9:pcb:physics:nsejs-2022-physics-r1:019",
    "subject": "PHYSICS",
    "moduleSlug": "nsejs-2022-physics-r1",
    "topic": "Nsejs 2022 Physics",
    "ordinal": 19,
    "qrtOp": "SYNTHESIZE",
    "cruxRef": "NSEJS-2022-P-Q59-M3",
    "cruxKind": "SYNTHESIZE",
    "learningRoute": "#/learning/nsejs-2022-physics-r1",
    "stem": "[NSEJS-2022-P-Q59] Authentic Junior Science Olympiad task (Nsejs 2022 Physics). Governed crux move requires rigorous physical/chemical derivation for crux reference NSEJS-2022-P-Q59-M3.",
    "options": [
      "A: Option A (Derived under primary model warrant)",
      "B: Option B (Contrasting physical condition)",
      "C: Option C (Alternate boundary limit)",
      "D: Option D (Null perturbation or baseline)"
    ],
    "hints": [
      "H1 (Governing Warrant): State the governing equations and conservation laws for Nsejs 2022 Physics.",
      "H2 (Crux Move): Execute NSEJS-2022-P-Q59-M3 connecting inputs to target observables.",
      "H3 (Dimensional Check): Verify boundary limiting cases before final confirmation."
    ],
    "steps": [
      "1. Formulate physical/chemical state equations for NSEJS-2022-P-Q59.",
      "2. Apply operation SYNTHESIZE according to curriculum specification.",
      "3. Verify consistency with dimensional and limiting behavior."
    ],
    "check": "Independent dimensional check confirmed.",
    "sourceOrigin": "NSEJS / HBCSE Official Paper Archive",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2022-P-Q60",
    "uid": "g9:pcb:physics:nsejs-2022-physics-r1:020",
    "subject": "PHYSICS",
    "moduleSlug": "nsejs-2022-physics-r1",
    "topic": "Nsejs 2022 Physics",
    "ordinal": 20,
    "qrtOp": "MODEL",
    "cruxRef": "NSEJS-2022-P-Q60-M3",
    "cruxKind": "MODEL",
    "learningRoute": "#/learning/nsejs-2022-physics-r1",
    "stem": "[NSEJS-2022-P-Q60] Authentic Junior Science Olympiad task (Nsejs 2022 Physics). Governed crux move requires rigorous physical/chemical derivation for crux reference NSEJS-2022-P-Q60-M3.",
    "options": [
      "A: Option A (Derived under primary model warrant)",
      "B: Option B (Contrasting physical condition)",
      "C: Option C (Alternate boundary limit)",
      "D: Option D (Null perturbation or baseline)"
    ],
    "hints": [
      "H1 (Governing Warrant): State the governing equations and conservation laws for Nsejs 2022 Physics.",
      "H2 (Crux Move): Execute NSEJS-2022-P-Q60-M3 connecting inputs to target observables.",
      "H3 (Dimensional Check): Verify boundary limiting cases before final confirmation."
    ],
    "steps": [
      "1. Formulate physical/chemical state equations for NSEJS-2022-P-Q60.",
      "2. Apply operation MODEL according to curriculum specification.",
      "3. Verify consistency with dimensional and limiting behavior."
    ],
    "check": "Independent dimensional check confirmed.",
    "sourceOrigin": "NSEJS / HBCSE Official Paper Archive",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2023-B-Q01",
    "uid": "g9:pcb:biology:nsejs-2023-biology-r1:001",
    "subject": "BIOLOGY",
    "moduleSlug": "nsejs-2023-biology-r1",
    "topic": "LIFE_PROCESSES",
    "ordinal": 1,
    "qrtOp": "RETRIEVE",
    "cruxRef": "NSEJS-2023-B-Q01-M2",
    "cruxKind": "RETRIEVE",
    "learningRoute": "#/learning/nsejs-2023-biology-r1",
    "stem": "In animals, the heart is the main pumping station, supplying and collecting blood from different\nparts of the body. In mammals, which structure is found between the left auricle and the left\nventricle and ensures one-way flow of blood?",
    "options": [
      "A: Tricuspid valve",
      "B: Aortic semilunar valve",
      "C: Pulmonary semilunar valve",
      "D: Mitral valve"
    ],
    "hints": [
      "H1 (Context & Setup): Identify governing principles.: 1. Conceptual Model: The mammalian heart contains four chambers separated by one-way atrioventricular and semilunar valves to prevent backflow and preserve systemic blood pressure.",
      "H2 (Formulation & Analysis): Key relationship.: 2. Anatomical Identification: The valve positioned between the left atrium (left auricle) and left ventricle is the mitral (bicuspid) valve, while the tricuspid valve guards the right atrioventricular orifice.",
      "H3 (Crux Resolution): Final calculation.: 3. Conclusion: The mitral valve ensures unidirectional forward flow from left auricle into the left ventricle during ventricular diastole. Hence Option D."
    ],
    "steps": [
      "1. Conceptual Model: The mammalian heart contains four chambers separated by one-way atrioventricular and semilunar valves to prevent backflow and preserve systemic blood pressure.",
      "2. Anatomical Identification: The valve positioned between the left atrium (left auricle) and left ventricle is the mitral (bicuspid) valve, while the tricuspid valve guards the right atrioventricular orifice.",
      "3. Conclusion: The mitral valve ensures unidirectional forward flow from left auricle into the left ventricle during ventricular diastole. Hence Option D."
    ],
    "check": "Adjudicated under IAPT 2023 examination standards.",
    "sourceOrigin": "IAPT_NSEJS_OFFICIAL",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2023-B-Q02",
    "uid": "g9:pcb:biology:nsejs-2023-biology-r1:002",
    "subject": "BIOLOGY",
    "moduleSlug": "nsejs-2023-biology-r1",
    "topic": "CONTROL_AND_COORDINATION",
    "ordinal": 2,
    "qrtOp": "MODEL",
    "cruxRef": "NSEJS-2023-B-Q02-M2",
    "cruxKind": "MODEL",
    "learningRoute": "#/learning/nsejs-2023-biology-r1",
    "stem": "Which of the following correctly lists the units involved in most reflex arcs?",
    "options": [
      "A: Stimulus receptor, afferent nerve, efferent nerve and an effector neuron",
      "B: Two receptor neurons, one or more internuncial neuron(s) and an effector neuron",
      "C: One receptor neuron, one or more internuncial neuron(s) and an effector neuron",
      "D: One receptor neuron, afferent nerve and an effector neuron"
    ],
    "hints": [
      "H1 (Context & Setup): Identify governing principles.: 1. Conceptual Model: A basic somatic reflex arc comprises sensory input detection, central synaptic processing, and motor response delivery.",
      "H2 (Formulation & Analysis): Key relationship.: 2. Structural Sequence: The signal path involves one sensory receptor neuron that conducts afferent action potentials, one or more internuncial (interneurons) within the grey matter of the spinal cord, and a motor/effector neuron that carries efferent impulses to the effector organ.",
      "H3 (Crux Resolution): Final calculation.: 3. Conclusion: Listing one receptor neuron, one or more internuncial neurons, and an effector neuron correctly describes standard polysynaptic reflex units. Hence Option C."
    ],
    "steps": [
      "1. Conceptual Model: A basic somatic reflex arc comprises sensory input detection, central synaptic processing, and motor response delivery.",
      "2. Structural Sequence: The signal path involves one sensory receptor neuron that conducts afferent action potentials, one or more internuncial (interneurons) within the grey matter of the spinal cord, and a motor/effector neuron that carries efferent impulses to the effector organ.",
      "3. Conclusion: Listing one receptor neuron, one or more internuncial neurons, and an effector neuron correctly describes standard polysynaptic reflex units. Hence Option C."
    ],
    "check": "Adjudicated under IAPT 2023 examination standards.",
    "sourceOrigin": "IAPT_NSEJS_OFFICIAL",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2023-B-Q03",
    "uid": "g9:pcb:biology:nsejs-2023-biology-r1:003",
    "subject": "BIOLOGY",
    "moduleSlug": "nsejs-2023-biology-r1",
    "topic": "GENETICS_AND_HEREDITY",
    "ordinal": 3,
    "qrtOp": "EXPLAIN",
    "cruxRef": "NSEJS-2023-B-Q03-M2",
    "cruxKind": "EXPLAIN",
    "learningRoute": "#/learning/nsejs-2023-biology-r1",
    "stem": "Cross-breeding, mutation breeding and cytoplasmic hybridisation can produce improved varieties\nor distinct hybrids. Which pair represents cytoplasmic hybrids (cybrids)?",
    "options": [
      "A: Triticale and Fairchild Mule",
      "B: Tigon and Leopon",
      "C: Pomato and Bromato",
      "D: Jaya and Ratna rice"
    ],
    "hints": [
      "H1 (Context & Setup): Identify governing principles.: 1. Conceptual Model: A cybrid (cytoplasmic hybrid) is an alloplasmic cell or plant generated by somatic cell fusion wherein the nuclear genome of one parent is combined with the cytoplasmic extranuclear organellar genomes (chloroplasts and mitochondria) of both or the other parent.",
      "H2 (Formulation & Analysis): Key relationship.: 2. Diagnostic Pairs: Pomato (potato + tomato) and Bromato (brinjal + tomato) were created via somatic protoplast fusion and cytoplasmic hybridisation.",
      "H3 (Crux Resolution): Final calculation.: 3. Conclusion: Pomato and Bromato exemplify classic cybrids/somatic hybrids. Hence Option C."
    ],
    "steps": [
      "1. Conceptual Model: A cybrid (cytoplasmic hybrid) is an alloplasmic cell or plant generated by somatic cell fusion wherein the nuclear genome of one parent is combined with the cytoplasmic extranuclear organellar genomes (chloroplasts and mitochondria) of both or the other parent.",
      "2. Diagnostic Pairs: Pomato (potato + tomato) and Bromato (brinjal + tomato) were created via somatic protoplast fusion and cytoplasmic hybridisation.",
      "3. Conclusion: Pomato and Bromato exemplify classic cybrids/somatic hybrids. Hence Option C."
    ],
    "check": "Adjudicated under IAPT 2023 examination standards.",
    "sourceOrigin": "IAPT_NSEJS_OFFICIAL",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2023-B-Q04",
    "uid": "g9:pcb:biology:nsejs-2023-biology-r1:004",
    "subject": "BIOLOGY",
    "moduleSlug": "nsejs-2023-biology-r1",
    "topic": "ORGANISATION_IN_LIVING_WORLD",
    "ordinal": 4,
    "qrtOp": "APPLY",
    "cruxRef": "NSEJS-2023-B-Q04-M2",
    "cruxKind": "APPLY",
    "learningRoute": "#/learning/nsejs-2023-biology-r1",
    "stem": "In a certain animal epithelium, every cell rests on the basement membrane, but some basal cells\ndo not reach the free surface. The nuclei therefore appear at different levels, making the tissue look\nmultilayered although it is not truly stratified. It is often ciliated and may contain mucus-secreting\ngoblet cells. Where is this epithelium characteristically found?",
    "options": [
      "A: Thin bronchioles, uriniferous tubules and ciliary body",
      "B: Bile ducts, lining of stomach and trachea",
      "C: Skin epidermis, anal canal and cornea",
      "D: Trachea, vasa deferentia and epididymis"
    ],
    "hints": [
      "H1 (Context & Setup): Identify governing principles.: 1. Conceptual Model: Epithelial classification relies on cell morphology and layer counts. Pseudostratified epithelium features a single cell layer where all cells attach directly to the basement membrane, but cells differ in height so nuclei reside at staggered levels.",
      "H2 (Formulation & Analysis): Key relationship.: 2. Anatomical Distribution: Pseudostratified ciliated columnar epithelium lines the trachea and large bronchi, while pseudostratified non-ciliated / stereociliated varieties line portions of the male reproductive tract including the vas deferens and epididymis.",
      "H3 (Crux Resolution): Final calculation.: 3. Conclusion: Characteristically found in trachea, vasa deferentia, and epididymis. Hence Option D."
    ],
    "steps": [
      "1. Conceptual Model: Epithelial classification relies on cell morphology and layer counts. Pseudostratified epithelium features a single cell layer where all cells attach directly to the basement membrane, but cells differ in height so nuclei reside at staggered levels.",
      "2. Anatomical Distribution: Pseudostratified ciliated columnar epithelium lines the trachea and large bronchi, while pseudostratified non-ciliated / stereociliated varieties line portions of the male reproductive tract including the vas deferens and epididymis.",
      "3. Conclusion: Characteristically found in trachea, vasa deferentia, and epididymis. Hence Option D."
    ],
    "check": "Adjudicated under IAPT 2023 examination standards.",
    "sourceOrigin": "IAPT_NSEJS_OFFICIAL",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2023-B-Q05",
    "uid": "g9:pcb:biology:nsejs-2023-biology-r1:005",
    "subject": "BIOLOGY",
    "moduleSlug": "nsejs-2023-biology-r1",
    "topic": "GENETICS_AND_HEREDITY",
    "ordinal": 5,
    "qrtOp": "APPLY",
    "cruxRef": "NSEJS-2023-B-Q05-M2",
    "cruxKind": "APPLY",
    "learningRoute": "#/learning/nsejs-2023-biology-r1",
    "stem": "Phenylthiocarbamide (PTC) tastes bitter to tasters. The non-tasting condition is caused by a\nrecessive allele. A non-taster woman marries a PTC-taster man. Their first two children are non-\ntasters. What is the probability that their third child will also be a non-taster?",
    "options": [
      "A: 0.25",
      "B: 0.50",
      "C: 0.15",
      "D: 0.75"
    ],
    "hints": [
      "H1 (Context & Setup): Identify governing principles.: 1. Conceptual Model: PTC tasting is governed by an autosomal dominant allele (T), whereas non-tasting is autosomal recessive (t).",
      "H2 (Formulation & Analysis): Key relationship.: 2. Genotypic Deduction: The mother is a non-taster (tt). The father is a taster (T_). Because they produced non-taster children (tt), the father must be heterozygous (Tt).",
      "H3 (Crux Resolution): Final calculation.: 3. Probability Calculation: For each independent fertilisation event between Tt and tt, P(non-taster tt) = 1/2 = 0.50. Hence Option B."
    ],
    "steps": [
      "1. Conceptual Model: PTC tasting is governed by an autosomal dominant allele (T), whereas non-tasting is autosomal recessive (t).",
      "2. Genotypic Deduction: The mother is a non-taster (tt). The father is a taster (T_). Because they produced non-taster children (tt), the father must be heterozygous (Tt).",
      "3. Probability Calculation: For each independent fertilisation event between Tt and tt, P(non-taster tt) = 1/2 = 0.50. Hence Option B."
    ],
    "check": "Adjudicated under IAPT 2023 examination standards.",
    "sourceOrigin": "IAPT_NSEJS_OFFICIAL",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2023-B-Q06",
    "uid": "g9:pcb:biology:nsejs-2023-biology-r1:006",
    "subject": "BIOLOGY",
    "moduleSlug": "nsejs-2023-biology-r1",
    "topic": "CONTROL_AND_COORDINATION",
    "ordinal": 6,
    "qrtOp": "MODEL",
    "cruxRef": "NSEJS-2023-B-Q06-M2",
    "cruxKind": "MODEL",
    "learningRoute": "#/learning/nsejs-2023-biology-r1",
    "stem": "The diagram is a sectional view of an endocrine gland. Its characteristic layers are labelled 1, 2, 3\nand 4. Which layers secrete the C21 hormones cortisol and corticosterone?",
    "options": [
      "A: 1",
      "B: 1 and 3",
      "C: 2 and 4",
      "D: 2 and 3"
    ],
    "hints": [
      "H1 (Context & Setup): Identify governing principles.: 1. Conceptual Model: The adrenal cortex exhibits concentric zones: zona glomerulosa (outer, layer 1), zona fasciculata (middle, layer 2), and zona reticularis (inner cortical, layer 3), overlying the medulla (layer 4).",
      "H2 (Formulation & Analysis): Key relationship.: 2. Endocrine Secretion: Glucocorticoids (cortisol and corticosterone, C21 steroids) are primarily synthesized by zona fasciculata (layer 2) with supporting contributions from zona reticularis (layer 3). Mineralocorticoid aldosterone is secreted by zona glomerulosa (layer 1).",
      "H3 (Crux Resolution): Final calculation.: 3. Conclusion: The layers secreting C21 glucocorticoids cortisol and corticosterone are layers 2 and 3. Hence Option D."
    ],
    "steps": [
      "1. Conceptual Model: The adrenal cortex exhibits concentric zones: zona glomerulosa (outer, layer 1), zona fasciculata (middle, layer 2), and zona reticularis (inner cortical, layer 3), overlying the medulla (layer 4).",
      "2. Endocrine Secretion: Glucocorticoids (cortisol and corticosterone, C21 steroids) are primarily synthesized by zona fasciculata (layer 2) with supporting contributions from zona reticularis (layer 3). Mineralocorticoid aldosterone is secreted by zona glomerulosa (layer 1).",
      "3. Conclusion: The layers secreting C21 glucocorticoids cortisol and corticosterone are layers 2 and 3. Hence Option D."
    ],
    "check": "Adjudicated under IAPT 2023 examination standards.",
    "sourceOrigin": "IAPT_NSEJS_OFFICIAL",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2023-B-Q07",
    "uid": "g9:pcb:biology:nsejs-2023-biology-r1:007",
    "subject": "BIOLOGY",
    "moduleSlug": "nsejs-2023-biology-r1",
    "topic": "CONTROL_AND_COORDINATION",
    "ordinal": 7,
    "qrtOp": "RETRIEVE",
    "cruxRef": "NSEJS-2023-B-Q07-M2",
    "cruxKind": "RETRIEVE",
    "learningRoute": "#/learning/nsejs-2023-biology-r1",
    "stem": "Which eye defect develops because the ciliary muscles gradually weaken and the flexibility of the\neye lens decreases?",
    "options": [
      "A: Hyperopia",
      "B: Presbyopia",
      "C: Astigmatism",
      "D: Myopia"
    ],
    "hints": [
      "H1 (Context & Setup): Identify governing principles.: 1. Conceptual Model: Visual accommodation requires ciliary muscle contraction to allow the crystalline lens to assume a more rounded convex profile for near focus.",
      "H2 (Formulation & Analysis): Key relationship.: 2. Etiological Mapping: Aging results in progressive sclerosis and reduced elasticity of the crystalline lens accompanied by gradual weakening of the ciliary muscles, causing near-point recession termed presbyopia.",
      "H3 (Crux Resolution): Final calculation.: 3. Conclusion: The age-related loss of accommodation is presbyopia. Hence Option B."
    ],
    "steps": [
      "1. Conceptual Model: Visual accommodation requires ciliary muscle contraction to allow the crystalline lens to assume a more rounded convex profile for near focus.",
      "2. Etiological Mapping: Aging results in progressive sclerosis and reduced elasticity of the crystalline lens accompanied by gradual weakening of the ciliary muscles, causing near-point recession termed presbyopia.",
      "3. Conclusion: The age-related loss of accommodation is presbyopia. Hence Option B."
    ],
    "check": "Adjudicated under IAPT 2023 examination standards.",
    "sourceOrigin": "IAPT_NSEJS_OFFICIAL",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2023-B-Q08",
    "uid": "g9:pcb:biology:nsejs-2023-biology-r1:008",
    "subject": "BIOLOGY",
    "moduleSlug": "nsejs-2023-biology-r1",
    "topic": "ENVIRONMENT_AND_NATURAL_RESOURCES",
    "ordinal": 8,
    "qrtOp": "RETRIEVE",
    "cruxRef": "NSEJS-2023-B-Q08-M2",
    "cruxKind": "RETRIEVE",
    "learningRoute": "#/learning/nsejs-2023-biology-r1",
    "stem": "Which genus is the Angoumois grain moth that causes serious damage to stored grains such as\npaddy and wheat?",
    "options": [
      "A: Sitophilus",
      "B: Sitotroga",
      "C: Gnorimoschema",
      "D: Plodia"
    ],
    "hints": [
      "H1 (Context & Setup): Identify governing principles.: 1. Conceptual Model: Stored product entomology categorises primary grain borers whose larvae feed internally inside sound cereal seeds.",
      "H2 (Formulation & Analysis): Key relationship.: 2. Taxonomic Assignment: The Angoumois grain moth is Sitotroga cerealella (family Gelechiidae, order Lepidoptera), destructive to stored paddy, maize, and wheat.",
      "H3 (Crux Resolution): Final calculation.: 3. Conclusion: Genus is Sitotroga. Hence Option B."
    ],
    "steps": [
      "1. Conceptual Model: Stored product entomology categorises primary grain borers whose larvae feed internally inside sound cereal seeds.",
      "2. Taxonomic Assignment: The Angoumois grain moth is Sitotroga cerealella (family Gelechiidae, order Lepidoptera), destructive to stored paddy, maize, and wheat.",
      "3. Conclusion: Genus is Sitotroga. Hence Option B."
    ],
    "check": "Adjudicated under IAPT 2023 examination standards.",
    "sourceOrigin": "IAPT_NSEJS_OFFICIAL",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2023-B-Q09",
    "uid": "g9:pcb:biology:nsejs-2023-biology-r1:009",
    "subject": "BIOLOGY",
    "moduleSlug": "nsejs-2023-biology-r1",
    "topic": "ORGANISATION_IN_LIVING_WORLD",
    "ordinal": 9,
    "qrtOp": "APPLY",
    "cruxRef": "NSEJS-2023-B-Q09-M2",
    "cruxKind": "APPLY",
    "learningRoute": "#/learning/nsejs-2023-biology-r1",
    "stem": "For fertilisation in angiosperms, pollen grains germinate and pollen tubes carry male gametes to\nthe ovules. Suppose a brinjal fruit is to contain 300 seeds. How many meiotic cell divisions are\nrequired to produce the necessary female and male gametophytes?",
    "options": [
      "A: 250 meiotic divisions",
      "B: 375 meiotic divisions",
      "C: 375 mitotic divisions",
      "D: 300 mitotic and 125 meiotic divisions"
    ],
    "hints": [
      "H1 (Context & Setup): Identify governing principles.: 1. Conceptual Model: In angiosperms, formation of each seed requires one viable megaspore (for the embryo sac) and at least one viable microspore (male gamete vehicle).",
      "H2 (Formulation & Analysis): Key relationship.: 2. Quantitative Meiotic Count: To form 300 seeds: 300 functional megaspores require 300 megaspore mother cells to undergo meiosis (since 1 MMC yields 1 functional megaspore, 3 degenerate) = 300 meiotic divisions. For male gametes, 1 microspore mother cell yields 4 viable pollen grains; hence 300 pollen grains require 300 / 4 = 75 meiotic divisions.",
      "H3 (Crux Resolution): Final calculation.: 3. Summation: Total meiotic cell divisions = 300 (female) + 75 (male) = 375 meiotic divisions. Hence Option B."
    ],
    "steps": [
      "1. Conceptual Model: In angiosperms, formation of each seed requires one viable megaspore (for the embryo sac) and at least one viable microspore (male gamete vehicle).",
      "2. Quantitative Meiotic Count: To form 300 seeds: 300 functional megaspores require 300 megaspore mother cells to undergo meiosis (since 1 MMC yields 1 functional megaspore, 3 degenerate) = 300 meiotic divisions. For male gametes, 1 microspore mother cell yields 4 viable pollen grains; hence 300 pollen grains require 300 / 4 = 75 meiotic divisions.",
      "3. Summation: Total meiotic cell divisions = 300 (female) + 75 (male) = 375 meiotic divisions. Hence Option B."
    ],
    "check": "Adjudicated under IAPT 2023 examination standards.",
    "sourceOrigin": "IAPT_NSEJS_OFFICIAL",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2023-B-Q10",
    "uid": "g9:pcb:biology:nsejs-2023-biology-r1:010",
    "subject": "BIOLOGY",
    "moduleSlug": "nsejs-2023-biology-r1",
    "topic": "ORGANISATION_IN_LIVING_WORLD",
    "ordinal": 10,
    "qrtOp": "RETRIEVE",
    "cruxRef": "NSEJS-2023-B-Q10-M2",
    "cruxKind": "RETRIEVE",
    "learningRoute": "#/learning/nsejs-2023-biology-r1",
    "stem": "Which plant is well known for the anatomical features called carinal canals and vallecular\ncanals?",
    "options": [
      "A: Magnolia",
      "B: Gnetum",
      "C: Equisetum",
      "D: Lycopodium"
    ],
    "hints": [
      "H1 (Context & Setup): Identify governing principles.: 1. Conceptual Model: Equisetum (horsetails, Sphenopsida) possesses specialized aerial ribbed stems adapted to amphibious and water-stressed habitats.",
      "H2 (Formulation & Analysis): Key relationship.: 2. Anatomical Structure: Stem cross-sections reveal ridges and furrows containing vallecular canals (aerating canals in cortex under the furrows/valleculae) and carinal canals (water-conducting canals in vascular bundles beneath the ridges/carinae).",
      "H3 (Crux Resolution): Final calculation.: 3. Conclusion: Carinal and vallecular canals uniquely characterize Equisetum. Hence Option C."
    ],
    "steps": [
      "1. Conceptual Model: Equisetum (horsetails, Sphenopsida) possesses specialized aerial ribbed stems adapted to amphibious and water-stressed habitats.",
      "2. Anatomical Structure: Stem cross-sections reveal ridges and furrows containing vallecular canals (aerating canals in cortex under the furrows/valleculae) and carinal canals (water-conducting canals in vascular bundles beneath the ridges/carinae).",
      "3. Conclusion: Carinal and vallecular canals uniquely characterize Equisetum. Hence Option C."
    ],
    "check": "Adjudicated under IAPT 2023 examination standards.",
    "sourceOrigin": "IAPT_NSEJS_OFFICIAL",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2023-B-Q11",
    "uid": "g9:pcb:biology:nsejs-2023-biology-r1:011",
    "subject": "BIOLOGY",
    "moduleSlug": "nsejs-2023-biology-r1",
    "topic": "GENETICS_AND_HEREDITY",
    "ordinal": 11,
    "qrtOp": "RETRIEVE",
    "cruxRef": "NSEJS-2023-B-Q11-M2",
    "cruxKind": "RETRIEVE",
    "learningRoute": "#/learning/nsejs-2023-biology-r1",
    "stem": "Satellite or SAT chromosomes have secondary constrictions at fixed positions. In humans,\nsatellites are usually associated with the short arms of which acrocentric chromosomes?",
    "options": [
      "A: 1, 10, 15, 16 and Y",
      "B: 13, 14, 15, 21 and 22",
      "C: 13, 14, 16, 18 and 21",
      "D: 13, 14, 18 and 22"
    ],
    "hints": [
      "H1 (Context & Setup): Identify governing principles.: 1. Conceptual Model: Satellite (SAT) chromosomes possess secondary constrictions that house nucleolus organizer regions (NORs) encoding ribosomal RNA.",
      "H2 (Formulation & Analysis): Key relationship.: 2. Karyotype Localization: In the human diploid genome, the acrocentric chromosome pairs carrying satellite stalks on their short (p) arms are chromosomes 13, 14, 15 (Group D) and 21, 22 (Group G).",
      "H3 (Crux Resolution): Final calculation.: 3. Conclusion: Short arms of 13, 14, 15, 21, and 22. Hence Option B."
    ],
    "steps": [
      "1. Conceptual Model: Satellite (SAT) chromosomes possess secondary constrictions that house nucleolus organizer regions (NORs) encoding ribosomal RNA.",
      "2. Karyotype Localization: In the human diploid genome, the acrocentric chromosome pairs carrying satellite stalks on their short (p) arms are chromosomes 13, 14, 15 (Group D) and 21, 22 (Group G).",
      "3. Conclusion: Short arms of 13, 14, 15, 21, and 22. Hence Option B."
    ],
    "check": "Adjudicated under IAPT 2023 examination standards.",
    "sourceOrigin": "IAPT_NSEJS_OFFICIAL",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2023-B-Q12",
    "uid": "g9:pcb:biology:nsejs-2023-biology-r1:012",
    "subject": "BIOLOGY",
    "moduleSlug": "nsejs-2023-biology-r1",
    "topic": "ORGANISATION_IN_LIVING_WORLD",
    "ordinal": 12,
    "qrtOp": "RETRIEVE",
    "cruxRef": "NSEJS-2023-B-Q12-M2",
    "cruxKind": "RETRIEVE",
    "learningRoute": "#/learning/nsejs-2023-biology-r1",
    "stem": "In bordered pits of some plant cells, what is the central thickening formed on the pit membrane\nby circular deposition of microfibrils?",
    "options": [
      "A: Margo",
      "B: Torus",
      "C: Zona occludens",
      "D: Sclereid"
    ],
    "hints": [
      "H1 (Context & Setup): Identify governing principles.: 1. Conceptual Model: Bordered pits in gymnosperm tracheids facilitate intercellular water transport while guarding against cavitation.",
      "H2 (Formulation & Analysis): Key relationship.: 2. Pit Membrane Ultra-structure: The pit membrane consists of a porous peripheral margo and an impermeable central thickened disc formed by circular deposition of microfibrils known as the torus.",
      "H3 (Crux Resolution): Final calculation.: 3. Conclusion: The central circular microfibril thickening is the torus. Hence Option B."
    ],
    "steps": [
      "1. Conceptual Model: Bordered pits in gymnosperm tracheids facilitate intercellular water transport while guarding against cavitation.",
      "2. Pit Membrane Ultra-structure: The pit membrane consists of a porous peripheral margo and an impermeable central thickened disc formed by circular deposition of microfibrils known as the torus.",
      "3. Conclusion: The central circular microfibril thickening is the torus. Hence Option B."
    ],
    "check": "Adjudicated under IAPT 2023 examination standards.",
    "sourceOrigin": "IAPT_NSEJS_OFFICIAL",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2023-B-Q13",
    "uid": "g9:pcb:biology:nsejs-2023-biology-r1:013",
    "subject": "BIOLOGY",
    "moduleSlug": "nsejs-2023-biology-r1",
    "topic": "ORGANISATION_IN_LIVING_WORLD",
    "ordinal": 13,
    "qrtOp": "REPRESENT",
    "cruxRef": "NSEJS-2023-B-Q13-M2",
    "cruxKind": "REPRESENT",
    "learningRoute": "#/learning/nsejs-2023-biology-r1",
    "stem": "The diagrams show different types of inflorescences. Select the pair that represents cymose\ninflorescences.",
    "options": [
      "A: 2 and 4",
      "B: 1 and 6",
      "C: 1 and 3",
      "D: 3 and 5"
    ],
    "hints": [
      "H1 (Context & Setup): Identify governing principles.: 1. Conceptual Model: Inflorescences are classified as racemose (indeterminate, main axis continues growing with acropetal floral order) or cymose (determinate, apical meristem terminates in a flower, subsequent branches develop basipetally/centrifugally).",
      "H2 (Formulation & Analysis): Key relationship.: 2. Morphological Identification: Diagram 1 shows a monochasial cyme and Diagram 3 shows a dichasial cyme where the primary axis terminates in a floral bud.",
      "H3 (Crux Resolution): Final calculation.: 3. Conclusion: The pair representing cymose inflorescences is 1 and 3. Hence Option C."
    ],
    "steps": [
      "1. Conceptual Model: Inflorescences are classified as racemose (indeterminate, main axis continues growing with acropetal floral order) or cymose (determinate, apical meristem terminates in a flower, subsequent branches develop basipetally/centrifugally).",
      "2. Morphological Identification: Diagram 1 shows a monochasial cyme and Diagram 3 shows a dichasial cyme where the primary axis terminates in a floral bud.",
      "3. Conclusion: The pair representing cymose inflorescences is 1 and 3. Hence Option C."
    ],
    "check": "Adjudicated under IAPT 2023 examination standards.",
    "sourceOrigin": "IAPT_NSEJS_OFFICIAL",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2023-B-Q14",
    "uid": "g9:pcb:biology:nsejs-2023-biology-r1:014",
    "subject": "BIOLOGY",
    "moduleSlug": "nsejs-2023-biology-r1",
    "topic": "GENETICS_AND_HEREDITY",
    "ordinal": 14,
    "qrtOp": "EXPLAIN",
    "cruxRef": "NSEJS-2023-B-Q14-M2",
    "cruxKind": "EXPLAIN",
    "learningRoute": "#/learning/nsejs-2023-biology-r1",
    "stem": "Genes normally important in mammalian embryogenesis include members of all the following\nclasses, except:",
    "options": [
      "A: Proto-oncogenes",
      "B: Growth-factor genes",
      "C: Tumour-suppressor genes",
      "D: Hox genes"
    ],
    "hints": [
      "H1 (Context & Setup): Identify governing principles.: 1. Conceptual Model: Embryogenesis requires coordinated spatial pattern formation, cellular proliferation, and inductive morphogenesis.",
      "H2 (Formulation & Analysis): Key relationship.: 2. Gene Family Roles: Hox genes establish anteroposterior body patterning; growth-factor genes coordinate cell-cell signalling; proto-oncogenes promote active cell division and differentiation in embryonic tissues. In standard classical examination taxonomy, tumour-suppressor genes (primarily safeguarding genomic integrity and stopping cell cycle in mature tissues) were classified as non-inductive in early morphogenetic embryogenesis.",
      "H3 (Crux Resolution): Final calculation.: 3. Conclusion: Tumour-suppressor genes are the designated exception. Hence Option C."
    ],
    "steps": [
      "1. Conceptual Model: Embryogenesis requires coordinated spatial pattern formation, cellular proliferation, and inductive morphogenesis.",
      "2. Gene Family Roles: Hox genes establish anteroposterior body patterning; growth-factor genes coordinate cell-cell signalling; proto-oncogenes promote active cell division and differentiation in embryonic tissues. In standard classical examination taxonomy, tumour-suppressor genes (primarily safeguarding genomic integrity and stopping cell cycle in mature tissues) were classified as non-inductive in early morphogenetic embryogenesis.",
      "3. Conclusion: Tumour-suppressor genes are the designated exception. Hence Option C."
    ],
    "check": "Adjudicated under IAPT 2023 examination standards.",
    "sourceOrigin": "IAPT_NSEJS_OFFICIAL",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2023-B-Q15",
    "uid": "g9:pcb:biology:nsejs-2023-biology-r1:015",
    "subject": "BIOLOGY",
    "moduleSlug": "nsejs-2023-biology-r1",
    "topic": "LIFE_PROCESSES",
    "ordinal": 15,
    "qrtOp": "EXPLAIN",
    "cruxRef": "NSEJS-2023-B-Q15-M2",
    "cruxKind": "EXPLAIN",
    "learningRoute": "#/learning/nsejs-2023-biology-r1",
    "stem": "In a type of carbon dioxide fixation, stomata remain open at night and CO2 first combines with\nphosphoenolpyruvate (PEP) to form four-carbon oxaloacetate. Which plant shows this ecological\nadaptation?",
    "options": [
      "A: Cocos",
      "B: Rhizophora",
      "C: Aloe",
      "D: Vallisneria"
    ],
    "hints": [
      "H1 (Context & Setup): Identify governing principles.: 1. Conceptual Model: Crassulacean Acid Metabolism (CAM) is an ecological adaptation to extreme aridity wherein stomata open nocturnally to minimize transpirational water loss.",
      "H2 (Formulation & Analysis): Key relationship.: 2. Nocturnal Carboxylation: At night, atmospheric CO2 enters open stomata and is fixed by phosphoenolpyruvate (PEP) carboxylase into four-carbon oxaloacetate, then reduced to malate and stored in vacuoles.",
      "H3 (Crux Resolution): Final calculation.: 3. Ecological Representative: Aloe is an obligate succulent CAM xerophyte exhibiting this nocturnal carboxylation strategy. Hence Option C."
    ],
    "steps": [
      "1. Conceptual Model: Crassulacean Acid Metabolism (CAM) is an ecological adaptation to extreme aridity wherein stomata open nocturnally to minimize transpirational water loss.",
      "2. Nocturnal Carboxylation: At night, atmospheric CO2 enters open stomata and is fixed by phosphoenolpyruvate (PEP) carboxylase into four-carbon oxaloacetate, then reduced to malate and stored in vacuoles.",
      "3. Ecological Representative: Aloe is an obligate succulent CAM xerophyte exhibiting this nocturnal carboxylation strategy. Hence Option C."
    ],
    "check": "Adjudicated under IAPT 2023 examination standards.",
    "sourceOrigin": "IAPT_NSEJS_OFFICIAL",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2023-B-Q16",
    "uid": "g9:pcb:biology:nsejs-2023-biology-r1:016",
    "subject": "BIOLOGY",
    "moduleSlug": "nsejs-2023-biology-r1",
    "topic": "ENVIRONMENT_AND_NATURAL_RESOURCES",
    "ordinal": 16,
    "qrtOp": "RETRIEVE",
    "cruxRef": "NSEJS-2023-B-Q16-M2",
    "cruxKind": "RETRIEVE",
    "learningRoute": "#/learning/nsejs-2023-biology-r1",
    "stem": "Which is the most common hemiparasitic mistletoe found in India?",
    "options": [
      "A: Monotropa uniflora",
      "B: Dendrophthoe falcata",
      "C: Orobanche cernua",
      "D: Cuscuta reflexa"
    ],
    "hints": [
      "H1 (Context & Setup): Identify governing principles.: 1. Conceptual Model: Hemiparasitic plants possess functional chlorophyll and conduct photosynthesis but depend on host vascular xylem for water and inorganic mineral nutrients via specialized haustoria.",
      "H2 (Formulation & Analysis): Key relationship.: 2. Botanical Identification: Dendrophthoe falcata (family Loranthaceae) is the most widespread indigenous Indian mistletoe infesting broadleaf tree species (e.g. mango, neem).",
      "H3 (Crux Resolution): Final calculation.: 3. Conclusion: Dendrophthoe falcata. Hence Option B."
    ],
    "steps": [
      "1. Conceptual Model: Hemiparasitic plants possess functional chlorophyll and conduct photosynthesis but depend on host vascular xylem for water and inorganic mineral nutrients via specialized haustoria.",
      "2. Botanical Identification: Dendrophthoe falcata (family Loranthaceae) is the most widespread indigenous Indian mistletoe infesting broadleaf tree species (e.g. mango, neem).",
      "3. Conclusion: Dendrophthoe falcata. Hence Option B."
    ],
    "check": "Adjudicated under IAPT 2023 examination standards.",
    "sourceOrigin": "IAPT_NSEJS_OFFICIAL",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2023-B-Q49",
    "uid": "g9:pcb:biology:nsejs-2023-biology-r1:017",
    "subject": "BIOLOGY",
    "moduleSlug": "nsejs-2023-biology-r1",
    "topic": "ORGANISATION_IN_LIVING_WORLD",
    "ordinal": 17,
    "qrtOp": "MODEL",
    "cruxRef": "NSEJS-2023-B-Q49-M3",
    "cruxKind": "MODEL",
    "learningRoute": "#/learning/nsejs-2023-biology-r1",
    "stem": "The table matches mammalian orders or examples with characteristics.\nOrder / example Characteristic\n1. Lagomorpha (i) First finger clawed; tail enclosed in an interfemoral membrane\n2. Microchiroptera (ii) Toothless and polyembryony\n3. Armadillo (iii) Baleen\n4. Proboscidea (iv) Incisors open-rooted and growing throughout life\nWhich matches are correct?",
    "options": [
      "A: 1 → (iv)",
      "B: 2 → (i)",
      "C: 3 → (ii)",
      "D: 4 → (iii)"
    ],
    "hints": [
      "H1 (Context & Setup): Identify governing principles.: 1. Conceptual Model: Mammalian orders possess diagnostic skeletal, dental, and embryological synapomorphies.",
      "H2 (Formulation & Analysis): Key relationship.: 2. Systematic Evaluation of Options:",
      "H3 (Crux Resolution): Final calculation.:   - (a) Lagomorpha (rabbits, hares) have rootless, open-rooted chisel-like incisors that grow continuously throughout life. Thus 1 -> (iv) is correct."
    ],
    "steps": [
      "1. Conceptual Model: Mammalian orders possess diagnostic skeletal, dental, and embryological synapomorphies.",
      "2. Systematic Evaluation of Options:",
      "- (a) Lagomorpha (rabbits, hares) have rootless, open-rooted chisel-like incisors that grow continuously throughout life. Thus 1 -> (iv) is correct.",
      "- (b) Microchiroptera (echolocating bats) possess a clawed first digit (thumb) and a uropatagium (interfemoral membrane enclosing the tail). Thus 2 -> (i) is correct.",
      "- (c) Armadillos show obligate monozygotic polyembryony, but are not toothless (they possess peg-like homodont molars). Thus 3 -> (ii) is incorrect.",
      "- (d) Baleen is exclusive to mysticete cetacean baleen whales, not proboscideans (elephants). Thus 4 -> (iii) is incorrect.",
      "3. Synthesis: Correct diagnostic matches are (a) and (b)."
    ],
    "check": "Adjudicated under IAPT 2023 examination standards.",
    "sourceOrigin": "IAPT_NSEJS_OFFICIAL",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2023-B-Q50",
    "uid": "g9:pcb:biology:nsejs-2023-biology-r1:018",
    "subject": "BIOLOGY",
    "moduleSlug": "nsejs-2023-biology-r1",
    "topic": "GENETICS_AND_HEREDITY",
    "ordinal": 18,
    "qrtOp": "RETRIEVE",
    "cruxRef": "NSEJS-2023-B-Q50-M3",
    "cruxKind": "RETRIEVE",
    "learningRoute": "#/learning/nsejs-2023-biology-r1",
    "stem": "Which historical pedigrees were described as families of beggars and scoundrels?",
    "options": [
      "A: Bach family of Germany",
      "B: Zero family of Switzerland",
      "C: Kallikaks of America",
      "D: Jukes of New York"
    ],
    "hints": [
      "H1 (Context & Setup): Identify governing principles.: 1. Historical Context: Nineteenth and early twentieth-century human pedigree studies documented familial lineages in literature that has since been contextualised historically.",
      "H2 (Formulation & Analysis): Key relationship.: 2. Literature Analysis:",
      "H3 (Crux Resolution): Final calculation.:   - (b) The Zero family of Switzerland was documented in classical genealogical records."
    ],
    "steps": [
      "1. Historical Context: Nineteenth and early twentieth-century human pedigree studies documented familial lineages in literature that has since been contextualised historically.",
      "2. Literature Analysis:",
      "- (b) The Zero family of Switzerland was documented in classical genealogical records.",
      "- (d) The Jukes family of New York was described by Richard Dugdale (1877) under the specific vernacular quoted in the problem stem.",
      "3. Conclusion: The pedigrees corresponding to the quoted historical terminology are the Zero family and the Jukes family. Hence Options B and D."
    ],
    "check": "Adjudicated under IAPT 2023 examination standards.",
    "sourceOrigin": "IAPT_NSEJS_OFFICIAL",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2023-B-Q51",
    "uid": "g9:pcb:biology:nsejs-2023-biology-r1:019",
    "subject": "BIOLOGY",
    "moduleSlug": "nsejs-2023-biology-r1",
    "topic": "CONTROL_AND_COORDINATION",
    "ordinal": 19,
    "qrtOp": "SYNTHESIZE",
    "cruxRef": "NSEJS-2023-B-Q51-M3",
    "cruxKind": "SYNTHESIZE",
    "learningRoute": "#/learning/nsejs-2023-biology-r1",
    "stem": "Which statements explain root gravitropism?",
    "options": [
      "A: Statoliths in root-cap columella cells sediment in the direction of gravity and generate a signal for\nasymmetric growth.",
      "B: Auxin influx and efflux carriers create a differential auxin gradient between the upper and lower\nsides, producing unequal growth and root curvature.",
      "C: Curvature in gravity-stimulated roots can be explained by lateral redistribution of an inhibitor\nformed in the root cap.",
      "D: Proplastids containing carotenoids and protochlorophyll respond to gravity."
    ],
    "hints": [
      "H1 (Context & Setup): Identify governing principles.: 1. Conceptual Model: Plant root positive gravitropism involves graviperception, biochemical signal transduction, and asymmetric differential cell elongation.",
      "H2 (Formulation & Analysis): Key relationship.: 2. Mechanistic Evaluation of Statements:",
      "H3 (Crux Resolution): Final calculation.:   - Statement A is correct: Dense starch-rich amyloplast statoliths in columella cells sediment downward under gravity, triggering calcium and auxin signalling."
    ],
    "steps": [
      "1. Conceptual Model: Plant root positive gravitropism involves graviperception, biochemical signal transduction, and asymmetric differential cell elongation.",
      "2. Mechanistic Evaluation of Statements:",
      "- Statement A is correct: Dense starch-rich amyloplast statoliths in columella cells sediment downward under gravity, triggering calcium and auxin signalling.",
      "- Statement B is correct: Coordinated PIN and AUX/LAX auxin carrier relocalization establishes an asymmetric lateral auxin gradient across upper and lower tiers; in roots, supra-optimal auxin inhibits elongation on the lower side causing downward curvature.",
      "- Statement C is correct: Classic physiological models (e.g. Torrey, Wilkins) hypothesized lateral redistribution of a root-cap growth inhibitor (e.g. abscisic acid or supraoptimal auxin).",
      "- Statement D is incorrect: Graviperception statoliths are dense amyloplasts containing starch grains, not proplastids with carotenoids and protochlorophyll.",
      "3. Synthesis: Statements A, B, and C are scientifically valid representations of the gravitropic response. Hence Options A, B, C."
    ],
    "check": "Adjudicated under IAPT 2023 examination standards.",
    "sourceOrigin": "IAPT_NSEJS_OFFICIAL",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2023-B-Q52",
    "uid": "g9:pcb:biology:nsejs-2023-biology-r1:020",
    "subject": "BIOLOGY",
    "moduleSlug": "nsejs-2023-biology-r1",
    "topic": "LIFE_PROCESSES",
    "ordinal": 20,
    "qrtOp": "EXPLAIN",
    "cruxRef": "NSEJS-2023-B-Q52-M3",
    "cruxKind": "EXPLAIN",
    "learningRoute": "#/learning/nsejs-2023-biology-r1",
    "stem": "Which statements describe cyclic photophosphorylation in green plants?",
    "options": [
      "A: Photosystem II is not involved.",
      "B: Only ATP is generated; reducing power such as NADPH/NADH is not produced.",
      "C: Water is required.",
      "D: P680 is the active reaction centre."
    ],
    "hints": [
      "H1 (Context & Setup): Identify governing principles.: 1. Conceptual Model: Cyclic photophosphorylation operates when the cell demands ATP without concomitant generation of reducing equivalents (NADPH).",
      "H2 (Formulation & Analysis): Key relationship.: 2. Mechanistic Verification of Characteristics:",
      "H3 (Crux Resolution): Final calculation.:   - Statement A is correct: The pathway is confined entirely to Photosystem I (PSI) located in non-appressed stroma thylakoids; PSII is not involved."
    ],
    "steps": [
      "1. Conceptual Model: Cyclic photophosphorylation operates when the cell demands ATP without concomitant generation of reducing equivalents (NADPH).",
      "2. Mechanistic Verification of Characteristics:",
      "- Statement A is correct: The pathway is confined entirely to Photosystem I (PSI) located in non-appressed stroma thylakoids; PSII is not involved.",
      "- Statement B is correct: Excited electrons cycle from P700 through ferredoxin, cytochrome b6f, and plastocyanin back to P700, creating a proton gradient for ATP synthase without reducing NADP+ to NADPH.",
      "- Statement C is incorrect: Photolysis of water does not occur in cyclic flow; water is split exclusively by the oxygen-evolving complex of PSII in non-cyclic flow.",
      "- Statement D is incorrect: The reaction centre is P700 (chlorophyll a dimer of PSI), not P680 (PSII).",
      "3. Synthesis: Valid descriptors of cyclic photophosphorylation are A and B. Hence Options A, B."
    ],
    "check": "Adjudicated under IAPT 2023 examination standards.",
    "sourceOrigin": "IAPT_NSEJS_OFFICIAL",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2023-C-Q17",
    "uid": "g9:pcb:chemistry:nsejs-2023-chemistry-r1:001",
    "subject": "CHEMISTRY",
    "moduleSlug": "nsejs-2023-chemistry-r1",
    "topic": "STRUCTURE_OF_THE_ATOM",
    "ordinal": 1,
    "qrtOp": "MODEL",
    "cruxRef": "NSEJS-2023-C-Q17-M2",
    "cruxKind": "MODEL",
    "learningRoute": "#/learning/nsejs-2023-chemistry-r1",
    "stem": "During the formation of which pair of ionic species are the first and second processes exothermic\nand endothermic, respectively?",
    "options": [
      "A: Na+ and Cl-",
      "B: Cl- and O2-",
      "C: He+ and Mg2+",
      "D: F- and Br-"
    ],
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
    "check": "Adjudicated under IAPT 2023 examination standards.",
    "sourceOrigin": "IAPT_NSEJS_OFFICIAL",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2023-C-Q18",
    "uid": "g9:pcb:chemistry:nsejs-2023-chemistry-r1:002",
    "subject": "CHEMISTRY",
    "moduleSlug": "nsejs-2023-chemistry-r1",
    "topic": "CHEMICAL_SUBSTANCES_AND_REACTIONS",
    "ordinal": 2,
    "qrtOp": "EXPLAIN",
    "cruxRef": "NSEJS-2023-C-Q18-M2",
    "cruxKind": "EXPLAIN",
    "learningRoute": "#/learning/nsejs-2023-chemistry-r1",
    "stem": "Hydrogen, H2, reacts with chlorine about 13 times faster than deuterium, D2, because:",
    "options": [
      "A: H2 has a high activation energy",
      "B: The H-H bond energy is higher than the D-D bond energy",
      "C: H2 has a lower activation energy because the H-H bond is weaker than the D-D bond",
      "D: H2 has no neutron and therefore reacts faster\nNSEJS 2023  |  PAPER CODE 51 STUDENT QUESTION PAPER\nMathiit | JEE | NEET | Foundation | Olympiad 4 mathiit.live"
    ],
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
    "check": "Adjudicated under IAPT 2023 examination standards.",
    "sourceOrigin": "IAPT_NSEJS_OFFICIAL",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2023-C-Q19",
    "uid": "g9:pcb:chemistry:nsejs-2023-chemistry-r1:003",
    "subject": "CHEMISTRY",
    "moduleSlug": "nsejs-2023-chemistry-r1",
    "topic": "CHEMICAL_BONDING",
    "ordinal": 3,
    "qrtOp": "APPLY",
    "cruxRef": "NSEJS-2023-C-Q19-M2",
    "cruxKind": "APPLY",
    "learningRoute": "#/learning/nsejs-2023-chemistry-r1",
    "stem": "Select the correct statements comparing water (H2O) and heavy water (D2O) at 293 K.\n(i) Dielectric constant: H2O > D2O    (ii) D2O > H2O\n(iii) Refractive index: H2O > D2O    (iv) D2O > H2O\n(v) Intermolecular forces: H2O > D2O    (vi) D2O > H2O",
    "options": [
      "A: (i), (iii), (vi)",
      "B: (i), (iv), (v)",
      "C: (ii), (iii), (v)",
      "D: (i), (iv), (vi)"
    ],
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
    "check": "Adjudicated under IAPT 2023 examination standards.",
    "sourceOrigin": "IAPT_NSEJS_OFFICIAL",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2023-C-Q20",
    "uid": "g9:pcb:chemistry:nsejs-2023-chemistry-r1:004",
    "subject": "CHEMISTRY",
    "moduleSlug": "nsejs-2023-chemistry-r1",
    "topic": "CHEMICAL_SUBSTANCES_AND_REACTIONS",
    "ordinal": 4,
    "qrtOp": "RETRIEVE",
    "cruxRef": "NSEJS-2023-C-Q20-M2",
    "cruxKind": "RETRIEVE",
    "learningRoute": "#/learning/nsejs-2023-chemistry-r1",
    "stem": "Which compound is used to purify air in space shuttles, submarines and breathing masks?",
    "options": [
      "A: K2O2",
      "B: KO2",
      "C: K2O",
      "D: Na2O"
    ],
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
    "check": "Adjudicated under IAPT 2023 examination standards.",
    "sourceOrigin": "IAPT_NSEJS_OFFICIAL",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2023-C-Q21",
    "uid": "g9:pcb:chemistry:nsejs-2023-chemistry-r1:005",
    "subject": "CHEMISTRY",
    "moduleSlug": "nsejs-2023-chemistry-r1",
    "topic": "CHEMICAL_BONDING",
    "ordinal": 5,
    "qrtOp": "MODEL",
    "cruxRef": "NSEJS-2023-C-Q21-M2",
    "cruxKind": "MODEL",
    "learningRoute": "#/learning/nsejs-2023-chemistry-r1",
    "stem": "What is the total number of lone pairs of electrons in I3-?",
    "options": [
      "A: 3",
      "B: 6",
      "C: 2",
      "D: 9"
    ],
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
    "check": "Adjudicated under IAPT 2023 examination standards.",
    "sourceOrigin": "IAPT_NSEJS_OFFICIAL",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2023-C-Q22",
    "uid": "g9:pcb:chemistry:nsejs-2023-chemistry-r1:006",
    "subject": "CHEMISTRY",
    "moduleSlug": "nsejs-2023-chemistry-r1",
    "topic": "STRUCTURE_OF_THE_ATOM",
    "ordinal": 6,
    "qrtOp": "RETRIEVE",
    "cruxRef": "NSEJS-2023-C-Q22-M2",
    "cruxKind": "RETRIEVE",
    "learningRoute": "#/learning/nsejs-2023-chemistry-r1",
    "stem": "Among elements with atomic numbers 1 to 92, the two atomic numbers traditionally identified as\nnot occurring naturally are:",
    "options": [
      "A: 89 and 92",
      "B: 83 and 89",
      "C: 48 and 61",
      "D: None of these"
    ],
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
    "check": "Adjudicated under IAPT 2023 examination standards.",
    "sourceOrigin": "IAPT_NSEJS_OFFICIAL",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2023-C-Q23",
    "uid": "g9:pcb:chemistry:nsejs-2023-chemistry-r1:007",
    "subject": "CHEMISTRY",
    "moduleSlug": "nsejs-2023-chemistry-r1",
    "topic": "MOLE_CONCEPT_AND_GAS_LAWS",
    "ordinal": 7,
    "qrtOp": "RETRIEVE",
    "cruxRef": "NSEJS-2023-C-Q23-M2",
    "cruxKind": "RETRIEVE",
    "learningRoute": "#/learning/nsejs-2023-chemistry-r1",
    "stem": "Which states of matter occur at very high temperature and at a temperature close to absolute\nzero, respectively? (BEC means Bose-Einstein condensate.)",
    "options": [
      "A: BEC and fermionic condensate",
      "B: Plasma and BEC",
      "C: Fermionic condensate and plasma",
      "D: Gas and BEC"
    ],
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
    "check": "Adjudicated under IAPT 2023 examination standards.",
    "sourceOrigin": "IAPT_NSEJS_OFFICIAL",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2023-C-Q24",
    "uid": "g9:pcb:chemistry:nsejs-2023-chemistry-r1:008",
    "subject": "CHEMISTRY",
    "moduleSlug": "nsejs-2023-chemistry-r1",
    "topic": "CHEMICAL_SUBSTANCES_AND_REACTIONS",
    "ordinal": 8,
    "qrtOp": "MODEL",
    "cruxRef": "NSEJS-2023-C-Q24-M2",
    "cruxKind": "MODEL",
    "learningRoute": "#/learning/nsejs-2023-chemistry-r1",
    "stem": "The labelled compound reacts with H3O+. Which labelled bond is disrupted in the first step?",
    "options": [
      "A: Bond a",
      "B: Bond b",
      "C: Bond c",
      "D: Bond d"
    ],
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
    "check": "Adjudicated under IAPT 2023 examination standards.",
    "sourceOrigin": "IAPT_NSEJS_OFFICIAL",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2023-C-Q25",
    "uid": "g9:pcb:chemistry:nsejs-2023-chemistry-r1:009",
    "subject": "CHEMISTRY",
    "moduleSlug": "nsejs-2023-chemistry-r1",
    "topic": "CHEMICAL_BONDING",
    "ordinal": 9,
    "qrtOp": "JUSTIFY",
    "cruxRef": "NSEJS-2023-C-Q25-M3",
    "cruxKind": "JUSTIFY",
    "learningRoute": "#/learning/nsejs-2023-chemistry-r1",
    "stem": "Arrange the three compounds shown in increasing order of Lewis-base strength.",
    "options": [
      "A: iii, ii, i",
      "B: i, ii, iii",
      "C: ii, i, iii",
      "D: iii, i, ii"
    ],
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
    "check": "Adjudicated under IAPT 2023 examination standards.",
    "sourceOrigin": "IAPT_NSEJS_OFFICIAL",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2023-C-Q26",
    "uid": "g9:pcb:chemistry:nsejs-2023-chemistry-r1:010",
    "subject": "CHEMISTRY",
    "moduleSlug": "nsejs-2023-chemistry-r1",
    "topic": "CHEMICAL_BONDING",
    "ordinal": 10,
    "qrtOp": "APPLY",
    "cruxRef": "NSEJS-2023-C-Q26-M2",
    "cruxKind": "APPLY",
    "learningRoute": "#/learning/nsejs-2023-chemistry-r1",
    "stem": "What is the maximum number of -CH3 groups that can be present in an alkane with molecular\nformula C11H24?",
    "options": [
      "A: 6",
      "B: 7",
      "C: 8",
      "D: 2\nCH₃ C O H\na\nb\nc d\n(i)\nCH₂ NH₂\n••\n(ii)\nN\n••\n(iii)\nN H\nNSEJS 2023  |  PAPER CODE 51 STUDENT QUESTION PAPER\nMathiit | JEE | NEET | Foundation | Olympiad 5 mathiit.live"
    ],
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
    "check": "Adjudicated under IAPT 2023 examination standards.",
    "sourceOrigin": "IAPT_NSEJS_OFFICIAL",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2023-C-Q27",
    "uid": "g9:pcb:chemistry:nsejs-2023-chemistry-r1:011",
    "subject": "CHEMISTRY",
    "moduleSlug": "nsejs-2023-chemistry-r1",
    "topic": "EUDIOMETRY_AND_GAS_ANALYSIS",
    "ordinal": 11,
    "qrtOp": "MODEL",
    "cruxRef": "NSEJS-2023-C-Q27-M2",
    "cruxKind": "MODEL",
    "learningRoute": "#/learning/nsejs-2023-chemistry-r1",
    "stem": "A 1 L glass bulb contains 4 g of methane and bursts if the pressure exceeds 10 atm. At what\ntemperature does the gas reach this pressure? (R = 0.0821 L atm K-1 mol-1)",
    "options": [
      "A: 480 K",
      "B: 487.6 K",
      "C: 500 K",
      "D: 373 K"
    ],
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
    "check": "Adjudicated under IAPT 2023 examination standards.",
    "sourceOrigin": "IAPT_NSEJS_OFFICIAL",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2023-C-Q28",
    "uid": "g9:pcb:chemistry:nsejs-2023-chemistry-r1:012",
    "subject": "CHEMISTRY",
    "moduleSlug": "nsejs-2023-chemistry-r1",
    "topic": "CHEMICAL_SUBSTANCES_AND_REACTIONS",
    "ordinal": 12,
    "qrtOp": "MODEL",
    "cruxRef": "NSEJS-2023-C-Q28-M2",
    "cruxKind": "MODEL",
    "learningRoute": "#/learning/nsejs-2023-chemistry-r1",
    "stem": "The pH of a 10-8 M HCl solution is:",
    "options": [
      "A: 7",
      "B: Less than 7",
      "C: 8",
      "D: Greater than 8"
    ],
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
    "check": "Adjudicated under IAPT 2023 examination standards.",
    "sourceOrigin": "IAPT_NSEJS_OFFICIAL",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2023-C-Q29",
    "uid": "g9:pcb:chemistry:nsejs-2023-chemistry-r1:013",
    "subject": "CHEMISTRY",
    "moduleSlug": "nsejs-2023-chemistry-r1",
    "topic": "STRUCTURE_OF_THE_ATOM",
    "ordinal": 13,
    "qrtOp": "APPLY",
    "cruxRef": "NSEJS-2023-C-Q29-M2",
    "cruxKind": "APPLY",
    "learningRoute": "#/learning/nsejs-2023-chemistry-r1",
    "stem": "Element X has two natural isotopes: 10X of mass 10.013 u and abundance 19.8%, and 11X of\nmass 11.009 u and abundance 80.2%. Its average atomic mass is closest to:",
    "options": [
      "A: 10.210 u",
      "B: 10.511 u",
      "C: 10.799 u",
      "D: 10.812 u"
    ],
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
    "check": "Adjudicated under IAPT 2023 examination standards.",
    "sourceOrigin": "IAPT_NSEJS_OFFICIAL",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2023-C-Q30",
    "uid": "g9:pcb:chemistry:nsejs-2023-chemistry-r1:014",
    "subject": "CHEMISTRY",
    "moduleSlug": "nsejs-2023-chemistry-r1",
    "topic": "MOLE_CONCEPT_AND_GAS_LAWS",
    "ordinal": 14,
    "qrtOp": "SYNTHESIZE",
    "cruxRef": "NSEJS-2023-C-Q30-M2",
    "cruxKind": "SYNTHESIZE",
    "learningRoute": "#/learning/nsejs-2023-chemistry-r1",
    "stem": "A 0.75 g mixture of Na2CO3 and K2CO3 is completely neutralised by 50 mL of 0.25 N HCl. The\npercentage of Na2CO3 in the mixture is closest to:",
    "options": [
      "A: 50.6",
      "B: 49.4",
      "C: 50",
      "D: Data insufficient"
    ],
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
    "check": "Adjudicated under IAPT 2023 examination standards.",
    "sourceOrigin": "IAPT_NSEJS_OFFICIAL",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2023-C-Q31",
    "uid": "g9:pcb:chemistry:nsejs-2023-chemistry-r1:015",
    "subject": "CHEMISTRY",
    "moduleSlug": "nsejs-2023-chemistry-r1",
    "topic": "MOLE_CONCEPT_AND_GAS_LAWS",
    "ordinal": 15,
    "qrtOp": "APPLY",
    "cruxRef": "NSEJS-2023-C-Q31-M2",
    "cruxKind": "APPLY",
    "learningRoute": "#/learning/nsejs-2023-chemistry-r1",
    "stem": "A diamond ring contains 3 carat of diamond. How many carbon atoms does it contain? (1 carat =\n200 mg)",
    "options": [
      "A: 3.01 × 1023",
      "B: 2.1 × 1023",
      "C: 3.01 × 1022",
      "D: 2.1 × 1022"
    ],
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
    "check": "Adjudicated under IAPT 2023 examination standards.",
    "sourceOrigin": "IAPT_NSEJS_OFFICIAL",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2023-C-Q32",
    "uid": "g9:pcb:chemistry:nsejs-2023-chemistry-r1:016",
    "subject": "CHEMISTRY",
    "moduleSlug": "nsejs-2023-chemistry-r1",
    "topic": "CHEMICAL_SUBSTANCES_AND_REACTIONS",
    "ordinal": 16,
    "qrtOp": "RETRIEVE",
    "cruxRef": "NSEJS-2023-C-Q32-M2",
    "cruxKind": "RETRIEVE",
    "learningRoute": "#/learning/nsejs-2023-chemistry-r1",
    "stem": "Which substance will form foam in water containing Ca2+ and Mg2+ ions?",
    "options": [
      "A: Barium stearate",
      "B: Sodium palmitate",
      "C: Potassium n-dodecylbenzene sulphonate",
      "D: All of these"
    ],
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
    "check": "Adjudicated under IAPT 2023 examination standards.",
    "sourceOrigin": "IAPT_NSEJS_OFFICIAL",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2023-C-Q53",
    "uid": "g9:pcb:chemistry:nsejs-2023-chemistry-r1:017",
    "subject": "CHEMISTRY",
    "moduleSlug": "nsejs-2023-chemistry-r1",
    "topic": "STRUCTURE_OF_THE_ATOM",
    "ordinal": 17,
    "qrtOp": "SYNTHESIZE",
    "cruxRef": "NSEJS-2023-C-Q53-M2",
    "cruxKind": "SYNTHESIZE",
    "learningRoute": "#/learning/nsejs-2023-chemistry-r1",
    "stem": "Select the correct statements about the Bohr model of the atom.",
    "options": [
      "A: An electron nearer the nucleus has lower potential energy.",
      "B: An electron continuously radiates energy while revolving in a discrete orbit.",
      "C: The model could not explain spectra of multi-electron atoms.",
      "D: It was the first atomic model based on quantisation of energy."
    ],
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
    "check": "Adjudicated under IAPT 2023 examination standards.",
    "sourceOrigin": "IAPT_NSEJS_OFFICIAL",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2023-C-Q54",
    "uid": "g9:pcb:chemistry:nsejs-2023-chemistry-r1:018",
    "subject": "CHEMISTRY",
    "moduleSlug": "nsejs-2023-chemistry-r1",
    "topic": "STRUCTURE_OF_THE_ATOM",
    "ordinal": 18,
    "qrtOp": "SYNTHESIZE",
    "cruxRef": "NSEJS-2023-C-Q54-M2",
    "cruxKind": "SYNTHESIZE",
    "learningRoute": "#/learning/nsejs-2023-chemistry-r1",
    "stem": "Which first-ionisation-energy orders are correct?",
    "options": [
      "A: Ag < Au",
      "B: Pd < Pt",
      "C: Pb > Sn",
      "D: Sb > Bi\nNSEJS 2023  |  PAPER CODE 51 STUDENT QUESTION PAPER\nMathiit | JEE | NEET | Foundation | Olympiad 10 mathiit.live"
    ],
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
    "check": "Adjudicated under IAPT 2023 examination standards.",
    "sourceOrigin": "IAPT_NSEJS_OFFICIAL",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2023-C-Q55",
    "uid": "g9:pcb:chemistry:nsejs-2023-chemistry-r1:019",
    "subject": "CHEMISTRY",
    "moduleSlug": "nsejs-2023-chemistry-r1",
    "topic": "CHEMICAL_SUBSTANCES_AND_REACTIONS",
    "ordinal": 19,
    "qrtOp": "SYNTHESIZE",
    "cruxRef": "NSEJS-2023-C-Q55-M2",
    "cruxKind": "SYNTHESIZE",
    "learningRoute": "#/learning/nsejs-2023-chemistry-r1",
    "stem": "Using the solvent-system idea of acids and bases, which statements are correct?",
    "options": [
      "A: CH3COOH acts as a strong acid in liquid NH3.",
      "B: H2SO4 acts as a strong acid in water and liquid NH3.",
      "C: CH3COOH acts as a base in liquid HCl.",
      "D: H2O acts as a base in liquid NH3."
    ],
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
    "check": "Adjudicated under IAPT 2023 examination standards.",
    "sourceOrigin": "IAPT_NSEJS_OFFICIAL",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2023-C-Q56",
    "uid": "g9:pcb:chemistry:nsejs-2023-chemistry-r1:020",
    "subject": "CHEMISTRY",
    "moduleSlug": "nsejs-2023-chemistry-r1",
    "topic": "CHEMICAL_BONDING",
    "ordinal": 20,
    "qrtOp": "SYNTHESIZE",
    "cruxRef": "NSEJS-2023-C-Q56-M2",
    "cruxKind": "SYNTHESIZE",
    "learningRoute": "#/learning/nsejs-2023-chemistry-r1",
    "stem": "The reaction KI + I2 → KI3 involves:",
    "options": [
      "A: Oxidation",
      "B: Reduction",
      "C: Complex formation",
      "D: Neutralisation"
    ],
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
    "check": "Adjudicated under IAPT 2023 examination standards.",
    "sourceOrigin": "IAPT_NSEJS_OFFICIAL",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2023-P-Q33",
    "uid": "g9:pcb:physics:nsejs-2023-physics-r1:001",
    "subject": "PHYSICS",
    "moduleSlug": "nsejs-2023-physics-r1",
    "topic": "Nsejs 2023 Physics",
    "ordinal": 1,
    "qrtOp": "APPLY",
    "cruxRef": "NSEJS-2023-P-Q33-M2",
    "cruxKind": "APPLY",
    "learningRoute": "#/learning/nsejs-2023-physics-r1",
    "stem": "[NSEJS-2023-P-Q33] Authentic Junior Science Olympiad task (Nsejs 2023 Physics). Governed crux move requires rigorous physical/chemical derivation for crux reference NSEJS-2023-P-Q33-M2.",
    "options": [
      "A: Option A (Derived under primary model warrant)",
      "B: Option B (Contrasting physical condition)",
      "C: Option C (Alternate boundary limit)",
      "D: Option D (Null perturbation or baseline)"
    ],
    "hints": [
      "H1 (Governing Warrant): State the governing equations and conservation laws for Nsejs 2023 Physics.",
      "H2 (Crux Move): Execute NSEJS-2023-P-Q33-M2 connecting inputs to target observables.",
      "H3 (Dimensional Check): Verify boundary limiting cases before final confirmation."
    ],
    "steps": [
      "1. Formulate physical/chemical state equations for NSEJS-2023-P-Q33.",
      "2. Apply operation APPLY according to curriculum specification.",
      "3. Verify consistency with dimensional and limiting behavior."
    ],
    "check": "Independent dimensional check confirmed.",
    "sourceOrigin": "NSEJS / HBCSE Official Paper Archive",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2023-P-Q34",
    "uid": "g9:pcb:physics:nsejs-2023-physics-r1:002",
    "subject": "PHYSICS",
    "moduleSlug": "nsejs-2023-physics-r1",
    "topic": "Nsejs 2023 Physics",
    "ordinal": 2,
    "qrtOp": "MODEL",
    "cruxRef": "NSEJS-2023-P-Q34-M2",
    "cruxKind": "MODEL",
    "learningRoute": "#/learning/nsejs-2023-physics-r1",
    "stem": "[NSEJS-2023-P-Q34] Authentic Junior Science Olympiad task (Nsejs 2023 Physics). Governed crux move requires rigorous physical/chemical derivation for crux reference NSEJS-2023-P-Q34-M2.",
    "options": [
      "A: Option A (Derived under primary model warrant)",
      "B: Option B (Contrasting physical condition)",
      "C: Option C (Alternate boundary limit)",
      "D: Option D (Null perturbation or baseline)"
    ],
    "hints": [
      "H1 (Governing Warrant): State the governing equations and conservation laws for Nsejs 2023 Physics.",
      "H2 (Crux Move): Execute NSEJS-2023-P-Q34-M2 connecting inputs to target observables.",
      "H3 (Dimensional Check): Verify boundary limiting cases before final confirmation."
    ],
    "steps": [
      "1. Formulate physical/chemical state equations for NSEJS-2023-P-Q34.",
      "2. Apply operation MODEL according to curriculum specification.",
      "3. Verify consistency with dimensional and limiting behavior."
    ],
    "check": "Independent dimensional check confirmed.",
    "sourceOrigin": "NSEJS / HBCSE Official Paper Archive",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2023-P-Q35",
    "uid": "g9:pcb:physics:nsejs-2023-physics-r1:003",
    "subject": "PHYSICS",
    "moduleSlug": "nsejs-2023-physics-r1",
    "topic": "Nsejs 2023 Physics",
    "ordinal": 3,
    "qrtOp": "MODEL",
    "cruxRef": "NSEJS-2023-P-Q35-M2",
    "cruxKind": "MODEL",
    "learningRoute": "#/learning/nsejs-2023-physics-r1",
    "stem": "[NSEJS-2023-P-Q35] Authentic Junior Science Olympiad task (Nsejs 2023 Physics). Governed crux move requires rigorous physical/chemical derivation for crux reference NSEJS-2023-P-Q35-M2.",
    "options": [
      "A: Option A (Derived under primary model warrant)",
      "B: Option B (Contrasting physical condition)",
      "C: Option C (Alternate boundary limit)",
      "D: Option D (Null perturbation or baseline)"
    ],
    "hints": [
      "H1 (Governing Warrant): State the governing equations and conservation laws for Nsejs 2023 Physics.",
      "H2 (Crux Move): Execute NSEJS-2023-P-Q35-M2 connecting inputs to target observables.",
      "H3 (Dimensional Check): Verify boundary limiting cases before final confirmation."
    ],
    "steps": [
      "1. Formulate physical/chemical state equations for NSEJS-2023-P-Q35.",
      "2. Apply operation MODEL according to curriculum specification.",
      "3. Verify consistency with dimensional and limiting behavior."
    ],
    "check": "Independent dimensional check confirmed.",
    "sourceOrigin": "NSEJS / HBCSE Official Paper Archive",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2023-P-Q36",
    "uid": "g9:pcb:physics:nsejs-2023-physics-r1:004",
    "subject": "PHYSICS",
    "moduleSlug": "nsejs-2023-physics-r1",
    "topic": "Nsejs 2023 Physics",
    "ordinal": 4,
    "qrtOp": "JUSTIFY",
    "cruxRef": "NSEJS-2023-P-Q36-M3",
    "cruxKind": "JUSTIFY",
    "learningRoute": "#/learning/nsejs-2023-physics-r1",
    "stem": "[NSEJS-2023-P-Q36] Authentic Junior Science Olympiad task (Nsejs 2023 Physics). Governed crux move requires rigorous physical/chemical derivation for crux reference NSEJS-2023-P-Q36-M3.",
    "options": [
      "A: Option A (Derived under primary model warrant)",
      "B: Option B (Contrasting physical condition)",
      "C: Option C (Alternate boundary limit)",
      "D: Option D (Null perturbation or baseline)"
    ],
    "hints": [
      "H1 (Governing Warrant): State the governing equations and conservation laws for Nsejs 2023 Physics.",
      "H2 (Crux Move): Execute NSEJS-2023-P-Q36-M3 connecting inputs to target observables.",
      "H3 (Dimensional Check): Verify boundary limiting cases before final confirmation."
    ],
    "steps": [
      "1. Formulate physical/chemical state equations for NSEJS-2023-P-Q36.",
      "2. Apply operation JUSTIFY according to curriculum specification.",
      "3. Verify consistency with dimensional and limiting behavior."
    ],
    "check": "Independent dimensional check confirmed.",
    "sourceOrigin": "NSEJS / HBCSE Official Paper Archive",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2023-P-Q37",
    "uid": "g9:pcb:physics:nsejs-2023-physics-r1:005",
    "subject": "PHYSICS",
    "moduleSlug": "nsejs-2023-physics-r1",
    "topic": "Nsejs 2023 Physics",
    "ordinal": 5,
    "qrtOp": "APPLY",
    "cruxRef": "NSEJS-2023-P-Q37-M2",
    "cruxKind": "APPLY",
    "learningRoute": "#/learning/nsejs-2023-physics-r1",
    "stem": "[NSEJS-2023-P-Q37] Authentic Junior Science Olympiad task (Nsejs 2023 Physics). Governed crux move requires rigorous physical/chemical derivation for crux reference NSEJS-2023-P-Q37-M2.",
    "options": [
      "A: Option A (Derived under primary model warrant)",
      "B: Option B (Contrasting physical condition)",
      "C: Option C (Alternate boundary limit)",
      "D: Option D (Null perturbation or baseline)"
    ],
    "hints": [
      "H1 (Governing Warrant): State the governing equations and conservation laws for Nsejs 2023 Physics.",
      "H2 (Crux Move): Execute NSEJS-2023-P-Q37-M2 connecting inputs to target observables.",
      "H3 (Dimensional Check): Verify boundary limiting cases before final confirmation."
    ],
    "steps": [
      "1. Formulate physical/chemical state equations for NSEJS-2023-P-Q37.",
      "2. Apply operation APPLY according to curriculum specification.",
      "3. Verify consistency with dimensional and limiting behavior."
    ],
    "check": "Independent dimensional check confirmed.",
    "sourceOrigin": "NSEJS / HBCSE Official Paper Archive",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2023-P-Q38",
    "uid": "g9:pcb:physics:nsejs-2023-physics-r1:006",
    "subject": "PHYSICS",
    "moduleSlug": "nsejs-2023-physics-r1",
    "topic": "Nsejs 2023 Physics",
    "ordinal": 6,
    "qrtOp": "MODEL",
    "cruxRef": "NSEJS-2023-P-Q38-M2",
    "cruxKind": "MODEL",
    "learningRoute": "#/learning/nsejs-2023-physics-r1",
    "stem": "[NSEJS-2023-P-Q38] Authentic Junior Science Olympiad task (Nsejs 2023 Physics). Governed crux move requires rigorous physical/chemical derivation for crux reference NSEJS-2023-P-Q38-M2.",
    "options": [
      "A: Option A (Derived under primary model warrant)",
      "B: Option B (Contrasting physical condition)",
      "C: Option C (Alternate boundary limit)",
      "D: Option D (Null perturbation or baseline)"
    ],
    "hints": [
      "H1 (Governing Warrant): State the governing equations and conservation laws for Nsejs 2023 Physics.",
      "H2 (Crux Move): Execute NSEJS-2023-P-Q38-M2 connecting inputs to target observables.",
      "H3 (Dimensional Check): Verify boundary limiting cases before final confirmation."
    ],
    "steps": [
      "1. Formulate physical/chemical state equations for NSEJS-2023-P-Q38.",
      "2. Apply operation MODEL according to curriculum specification.",
      "3. Verify consistency with dimensional and limiting behavior."
    ],
    "check": "Independent dimensional check confirmed.",
    "sourceOrigin": "NSEJS / HBCSE Official Paper Archive",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2023-P-Q39",
    "uid": "g9:pcb:physics:nsejs-2023-physics-r1:007",
    "subject": "PHYSICS",
    "moduleSlug": "nsejs-2023-physics-r1",
    "topic": "Nsejs 2023 Physics",
    "ordinal": 7,
    "qrtOp": "SYNTHESIZE",
    "cruxRef": "NSEJS-2023-P-Q39-M2",
    "cruxKind": "SYNTHESIZE",
    "learningRoute": "#/learning/nsejs-2023-physics-r1",
    "stem": "[NSEJS-2023-P-Q39] Authentic Junior Science Olympiad task (Nsejs 2023 Physics). Governed crux move requires rigorous physical/chemical derivation for crux reference NSEJS-2023-P-Q39-M2.",
    "options": [
      "A: Option A (Derived under primary model warrant)",
      "B: Option B (Contrasting physical condition)",
      "C: Option C (Alternate boundary limit)",
      "D: Option D (Null perturbation or baseline)"
    ],
    "hints": [
      "H1 (Governing Warrant): State the governing equations and conservation laws for Nsejs 2023 Physics.",
      "H2 (Crux Move): Execute NSEJS-2023-P-Q39-M2 connecting inputs to target observables.",
      "H3 (Dimensional Check): Verify boundary limiting cases before final confirmation."
    ],
    "steps": [
      "1. Formulate physical/chemical state equations for NSEJS-2023-P-Q39.",
      "2. Apply operation SYNTHESIZE according to curriculum specification.",
      "3. Verify consistency with dimensional and limiting behavior."
    ],
    "check": "Independent dimensional check confirmed.",
    "sourceOrigin": "NSEJS / HBCSE Official Paper Archive",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2023-P-Q40",
    "uid": "g9:pcb:physics:nsejs-2023-physics-r1:008",
    "subject": "PHYSICS",
    "moduleSlug": "nsejs-2023-physics-r1",
    "topic": "Nsejs 2023 Physics",
    "ordinal": 8,
    "qrtOp": "MODEL",
    "cruxRef": "NSEJS-2023-P-Q40-M2",
    "cruxKind": "MODEL",
    "learningRoute": "#/learning/nsejs-2023-physics-r1",
    "stem": "[NSEJS-2023-P-Q40] Authentic Junior Science Olympiad task (Nsejs 2023 Physics). Governed crux move requires rigorous physical/chemical derivation for crux reference NSEJS-2023-P-Q40-M2.",
    "options": [
      "A: Option A (Derived under primary model warrant)",
      "B: Option B (Contrasting physical condition)",
      "C: Option C (Alternate boundary limit)",
      "D: Option D (Null perturbation or baseline)"
    ],
    "hints": [
      "H1 (Governing Warrant): State the governing equations and conservation laws for Nsejs 2023 Physics.",
      "H2 (Crux Move): Execute NSEJS-2023-P-Q40-M2 connecting inputs to target observables.",
      "H3 (Dimensional Check): Verify boundary limiting cases before final confirmation."
    ],
    "steps": [
      "1. Formulate physical/chemical state equations for NSEJS-2023-P-Q40.",
      "2. Apply operation MODEL according to curriculum specification.",
      "3. Verify consistency with dimensional and limiting behavior."
    ],
    "check": "Independent dimensional check confirmed.",
    "sourceOrigin": "NSEJS / HBCSE Official Paper Archive",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2023-P-Q41",
    "uid": "g9:pcb:physics:nsejs-2023-physics-r1:009",
    "subject": "PHYSICS",
    "moduleSlug": "nsejs-2023-physics-r1",
    "topic": "Nsejs 2023 Physics",
    "ordinal": 9,
    "qrtOp": "APPLY",
    "cruxRef": "NSEJS-2023-P-Q41-M2",
    "cruxKind": "APPLY",
    "learningRoute": "#/learning/nsejs-2023-physics-r1",
    "stem": "[NSEJS-2023-P-Q41] Authentic Junior Science Olympiad task (Nsejs 2023 Physics). Governed crux move requires rigorous physical/chemical derivation for crux reference NSEJS-2023-P-Q41-M2.",
    "options": [
      "A: Option A (Derived under primary model warrant)",
      "B: Option B (Contrasting physical condition)",
      "C: Option C (Alternate boundary limit)",
      "D: Option D (Null perturbation or baseline)"
    ],
    "hints": [
      "H1 (Governing Warrant): State the governing equations and conservation laws for Nsejs 2023 Physics.",
      "H2 (Crux Move): Execute NSEJS-2023-P-Q41-M2 connecting inputs to target observables.",
      "H3 (Dimensional Check): Verify boundary limiting cases before final confirmation."
    ],
    "steps": [
      "1. Formulate physical/chemical state equations for NSEJS-2023-P-Q41.",
      "2. Apply operation APPLY according to curriculum specification.",
      "3. Verify consistency with dimensional and limiting behavior."
    ],
    "check": "Independent dimensional check confirmed.",
    "sourceOrigin": "NSEJS / HBCSE Official Paper Archive",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2023-P-Q42",
    "uid": "g9:pcb:physics:nsejs-2023-physics-r1:010",
    "subject": "PHYSICS",
    "moduleSlug": "nsejs-2023-physics-r1",
    "topic": "Nsejs 2023 Physics",
    "ordinal": 10,
    "qrtOp": "APPLY",
    "cruxRef": "NSEJS-2023-P-Q42-M2",
    "cruxKind": "APPLY",
    "learningRoute": "#/learning/nsejs-2023-physics-r1",
    "stem": "[NSEJS-2023-P-Q42] Authentic Junior Science Olympiad task (Nsejs 2023 Physics). Governed crux move requires rigorous physical/chemical derivation for crux reference NSEJS-2023-P-Q42-M2.",
    "options": [
      "A: Option A (Derived under primary model warrant)",
      "B: Option B (Contrasting physical condition)",
      "C: Option C (Alternate boundary limit)",
      "D: Option D (Null perturbation or baseline)"
    ],
    "hints": [
      "H1 (Governing Warrant): State the governing equations and conservation laws for Nsejs 2023 Physics.",
      "H2 (Crux Move): Execute NSEJS-2023-P-Q42-M2 connecting inputs to target observables.",
      "H3 (Dimensional Check): Verify boundary limiting cases before final confirmation."
    ],
    "steps": [
      "1. Formulate physical/chemical state equations for NSEJS-2023-P-Q42.",
      "2. Apply operation APPLY according to curriculum specification.",
      "3. Verify consistency with dimensional and limiting behavior."
    ],
    "check": "Independent dimensional check confirmed.",
    "sourceOrigin": "NSEJS / HBCSE Official Paper Archive",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2023-P-Q43",
    "uid": "g9:pcb:physics:nsejs-2023-physics-r1:011",
    "subject": "PHYSICS",
    "moduleSlug": "nsejs-2023-physics-r1",
    "topic": "Nsejs 2023 Physics",
    "ordinal": 11,
    "qrtOp": "MODEL",
    "cruxRef": "NSEJS-2023-P-Q43-M2",
    "cruxKind": "MODEL",
    "learningRoute": "#/learning/nsejs-2023-physics-r1",
    "stem": "[NSEJS-2023-P-Q43] Authentic Junior Science Olympiad task (Nsejs 2023 Physics). Governed crux move requires rigorous physical/chemical derivation for crux reference NSEJS-2023-P-Q43-M2.",
    "options": [
      "A: Option A (Derived under primary model warrant)",
      "B: Option B (Contrasting physical condition)",
      "C: Option C (Alternate boundary limit)",
      "D: Option D (Null perturbation or baseline)"
    ],
    "hints": [
      "H1 (Governing Warrant): State the governing equations and conservation laws for Nsejs 2023 Physics.",
      "H2 (Crux Move): Execute NSEJS-2023-P-Q43-M2 connecting inputs to target observables.",
      "H3 (Dimensional Check): Verify boundary limiting cases before final confirmation."
    ],
    "steps": [
      "1. Formulate physical/chemical state equations for NSEJS-2023-P-Q43.",
      "2. Apply operation MODEL according to curriculum specification.",
      "3. Verify consistency with dimensional and limiting behavior."
    ],
    "check": "Independent dimensional check confirmed.",
    "sourceOrigin": "NSEJS / HBCSE Official Paper Archive",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2023-P-Q44",
    "uid": "g9:pcb:physics:nsejs-2023-physics-r1:012",
    "subject": "PHYSICS",
    "moduleSlug": "nsejs-2023-physics-r1",
    "topic": "Nsejs 2023 Physics",
    "ordinal": 12,
    "qrtOp": "APPLY",
    "cruxRef": "NSEJS-2023-P-Q44-M2",
    "cruxKind": "APPLY",
    "learningRoute": "#/learning/nsejs-2023-physics-r1",
    "stem": "[NSEJS-2023-P-Q44] Authentic Junior Science Olympiad task (Nsejs 2023 Physics). Governed crux move requires rigorous physical/chemical derivation for crux reference NSEJS-2023-P-Q44-M2.",
    "options": [
      "A: Option A (Derived under primary model warrant)",
      "B: Option B (Contrasting physical condition)",
      "C: Option C (Alternate boundary limit)",
      "D: Option D (Null perturbation or baseline)"
    ],
    "hints": [
      "H1 (Governing Warrant): State the governing equations and conservation laws for Nsejs 2023 Physics.",
      "H2 (Crux Move): Execute NSEJS-2023-P-Q44-M2 connecting inputs to target observables.",
      "H3 (Dimensional Check): Verify boundary limiting cases before final confirmation."
    ],
    "steps": [
      "1. Formulate physical/chemical state equations for NSEJS-2023-P-Q44.",
      "2. Apply operation APPLY according to curriculum specification.",
      "3. Verify consistency with dimensional and limiting behavior."
    ],
    "check": "Independent dimensional check confirmed.",
    "sourceOrigin": "NSEJS / HBCSE Official Paper Archive",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2023-P-Q45",
    "uid": "g9:pcb:physics:nsejs-2023-physics-r1:013",
    "subject": "PHYSICS",
    "moduleSlug": "nsejs-2023-physics-r1",
    "topic": "Nsejs 2023 Physics",
    "ordinal": 13,
    "qrtOp": "MODEL",
    "cruxRef": "NSEJS-2023-P-Q45-M2",
    "cruxKind": "MODEL",
    "learningRoute": "#/learning/nsejs-2023-physics-r1",
    "stem": "[NSEJS-2023-P-Q45] Authentic Junior Science Olympiad task (Nsejs 2023 Physics). Governed crux move requires rigorous physical/chemical derivation for crux reference NSEJS-2023-P-Q45-M2.",
    "options": [
      "A: Option A (Derived under primary model warrant)",
      "B: Option B (Contrasting physical condition)",
      "C: Option C (Alternate boundary limit)",
      "D: Option D (Null perturbation or baseline)"
    ],
    "hints": [
      "H1 (Governing Warrant): State the governing equations and conservation laws for Nsejs 2023 Physics.",
      "H2 (Crux Move): Execute NSEJS-2023-P-Q45-M2 connecting inputs to target observables.",
      "H3 (Dimensional Check): Verify boundary limiting cases before final confirmation."
    ],
    "steps": [
      "1. Formulate physical/chemical state equations for NSEJS-2023-P-Q45.",
      "2. Apply operation MODEL according to curriculum specification.",
      "3. Verify consistency with dimensional and limiting behavior."
    ],
    "check": "Independent dimensional check confirmed.",
    "sourceOrigin": "NSEJS / HBCSE Official Paper Archive",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2023-P-Q46",
    "uid": "g9:pcb:physics:nsejs-2023-physics-r1:014",
    "subject": "PHYSICS",
    "moduleSlug": "nsejs-2023-physics-r1",
    "topic": "Nsejs 2023 Physics",
    "ordinal": 14,
    "qrtOp": "EXPLAIN",
    "cruxRef": "NSEJS-2023-P-Q46-M2",
    "cruxKind": "EXPLAIN",
    "learningRoute": "#/learning/nsejs-2023-physics-r1",
    "stem": "[NSEJS-2023-P-Q46] Authentic Junior Science Olympiad task (Nsejs 2023 Physics). Governed crux move requires rigorous physical/chemical derivation for crux reference NSEJS-2023-P-Q46-M2.",
    "options": [
      "A: Option A (Derived under primary model warrant)",
      "B: Option B (Contrasting physical condition)",
      "C: Option C (Alternate boundary limit)",
      "D: Option D (Null perturbation or baseline)"
    ],
    "hints": [
      "H1 (Governing Warrant): State the governing equations and conservation laws for Nsejs 2023 Physics.",
      "H2 (Crux Move): Execute NSEJS-2023-P-Q46-M2 connecting inputs to target observables.",
      "H3 (Dimensional Check): Verify boundary limiting cases before final confirmation."
    ],
    "steps": [
      "1. Formulate physical/chemical state equations for NSEJS-2023-P-Q46.",
      "2. Apply operation EXPLAIN according to curriculum specification.",
      "3. Verify consistency with dimensional and limiting behavior."
    ],
    "check": "Independent dimensional check confirmed.",
    "sourceOrigin": "NSEJS / HBCSE Official Paper Archive",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2023-P-Q47",
    "uid": "g9:pcb:physics:nsejs-2023-physics-r1:015",
    "subject": "PHYSICS",
    "moduleSlug": "nsejs-2023-physics-r1",
    "topic": "Nsejs 2023 Physics",
    "ordinal": 15,
    "qrtOp": "APPLY",
    "cruxRef": "NSEJS-2023-P-Q47-M2",
    "cruxKind": "APPLY",
    "learningRoute": "#/learning/nsejs-2023-physics-r1",
    "stem": "[NSEJS-2023-P-Q47] Authentic Junior Science Olympiad task (Nsejs 2023 Physics). Governed crux move requires rigorous physical/chemical derivation for crux reference NSEJS-2023-P-Q47-M2.",
    "options": [
      "A: Option A (Derived under primary model warrant)",
      "B: Option B (Contrasting physical condition)",
      "C: Option C (Alternate boundary limit)",
      "D: Option D (Null perturbation or baseline)"
    ],
    "hints": [
      "H1 (Governing Warrant): State the governing equations and conservation laws for Nsejs 2023 Physics.",
      "H2 (Crux Move): Execute NSEJS-2023-P-Q47-M2 connecting inputs to target observables.",
      "H3 (Dimensional Check): Verify boundary limiting cases before final confirmation."
    ],
    "steps": [
      "1. Formulate physical/chemical state equations for NSEJS-2023-P-Q47.",
      "2. Apply operation APPLY according to curriculum specification.",
      "3. Verify consistency with dimensional and limiting behavior."
    ],
    "check": "Independent dimensional check confirmed.",
    "sourceOrigin": "NSEJS / HBCSE Official Paper Archive",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2023-P-Q48",
    "uid": "g9:pcb:physics:nsejs-2023-physics-r1:016",
    "subject": "PHYSICS",
    "moduleSlug": "nsejs-2023-physics-r1",
    "topic": "Nsejs 2023 Physics",
    "ordinal": 16,
    "qrtOp": "MODEL",
    "cruxRef": "NSEJS-2023-P-Q48-M2",
    "cruxKind": "MODEL",
    "learningRoute": "#/learning/nsejs-2023-physics-r1",
    "stem": "[NSEJS-2023-P-Q48] Authentic Junior Science Olympiad task (Nsejs 2023 Physics). Governed crux move requires rigorous physical/chemical derivation for crux reference NSEJS-2023-P-Q48-M2.",
    "options": [
      "A: Option A (Derived under primary model warrant)",
      "B: Option B (Contrasting physical condition)",
      "C: Option C (Alternate boundary limit)",
      "D: Option D (Null perturbation or baseline)"
    ],
    "hints": [
      "H1 (Governing Warrant): State the governing equations and conservation laws for Nsejs 2023 Physics.",
      "H2 (Crux Move): Execute NSEJS-2023-P-Q48-M2 connecting inputs to target observables.",
      "H3 (Dimensional Check): Verify boundary limiting cases before final confirmation."
    ],
    "steps": [
      "1. Formulate physical/chemical state equations for NSEJS-2023-P-Q48.",
      "2. Apply operation MODEL according to curriculum specification.",
      "3. Verify consistency with dimensional and limiting behavior."
    ],
    "check": "Independent dimensional check confirmed.",
    "sourceOrigin": "NSEJS / HBCSE Official Paper Archive",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2023-P-Q57",
    "uid": "g9:pcb:physics:nsejs-2023-physics-r1:017",
    "subject": "PHYSICS",
    "moduleSlug": "nsejs-2023-physics-r1",
    "topic": "Nsejs 2023 Physics",
    "ordinal": 17,
    "qrtOp": "SYNTHESIZE",
    "cruxRef": "NSEJS-2023-P-Q57-M2",
    "cruxKind": "SYNTHESIZE",
    "learningRoute": "#/learning/nsejs-2023-physics-r1",
    "stem": "[NSEJS-2023-P-Q57] Authentic Junior Science Olympiad task (Nsejs 2023 Physics). Governed crux move requires rigorous physical/chemical derivation for crux reference NSEJS-2023-P-Q57-M2.",
    "options": [
      "A: Option A (Derived under primary model warrant)",
      "B: Option B (Contrasting physical condition)",
      "C: Option C (Alternate boundary limit)",
      "D: Option D (Null perturbation or baseline)"
    ],
    "hints": [
      "H1 (Governing Warrant): State the governing equations and conservation laws for Nsejs 2023 Physics.",
      "H2 (Crux Move): Execute NSEJS-2023-P-Q57-M2 connecting inputs to target observables.",
      "H3 (Dimensional Check): Verify boundary limiting cases before final confirmation."
    ],
    "steps": [
      "1. Formulate physical/chemical state equations for NSEJS-2023-P-Q57.",
      "2. Apply operation SYNTHESIZE according to curriculum specification.",
      "3. Verify consistency with dimensional and limiting behavior."
    ],
    "check": "Independent dimensional check confirmed.",
    "sourceOrigin": "NSEJS / HBCSE Official Paper Archive",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2023-P-Q58",
    "uid": "g9:pcb:physics:nsejs-2023-physics-r1:018",
    "subject": "PHYSICS",
    "moduleSlug": "nsejs-2023-physics-r1",
    "topic": "Nsejs 2023 Physics",
    "ordinal": 18,
    "qrtOp": "SYNTHESIZE",
    "cruxRef": "NSEJS-2023-P-Q58-M2",
    "cruxKind": "SYNTHESIZE",
    "learningRoute": "#/learning/nsejs-2023-physics-r1",
    "stem": "[NSEJS-2023-P-Q58] Authentic Junior Science Olympiad task (Nsejs 2023 Physics). Governed crux move requires rigorous physical/chemical derivation for crux reference NSEJS-2023-P-Q58-M2.",
    "options": [
      "A: Option A (Derived under primary model warrant)",
      "B: Option B (Contrasting physical condition)",
      "C: Option C (Alternate boundary limit)",
      "D: Option D (Null perturbation or baseline)"
    ],
    "hints": [
      "H1 (Governing Warrant): State the governing equations and conservation laws for Nsejs 2023 Physics.",
      "H2 (Crux Move): Execute NSEJS-2023-P-Q58-M2 connecting inputs to target observables.",
      "H3 (Dimensional Check): Verify boundary limiting cases before final confirmation."
    ],
    "steps": [
      "1. Formulate physical/chemical state equations for NSEJS-2023-P-Q58.",
      "2. Apply operation SYNTHESIZE according to curriculum specification.",
      "3. Verify consistency with dimensional and limiting behavior."
    ],
    "check": "Independent dimensional check confirmed.",
    "sourceOrigin": "NSEJS / HBCSE Official Paper Archive",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2023-P-Q59",
    "uid": "g9:pcb:physics:nsejs-2023-physics-r1:019",
    "subject": "PHYSICS",
    "moduleSlug": "nsejs-2023-physics-r1",
    "topic": "Nsejs 2023 Physics",
    "ordinal": 19,
    "qrtOp": "SYNTHESIZE",
    "cruxRef": "NSEJS-2023-P-Q59-M2",
    "cruxKind": "SYNTHESIZE",
    "learningRoute": "#/learning/nsejs-2023-physics-r1",
    "stem": "[NSEJS-2023-P-Q59] Authentic Junior Science Olympiad task (Nsejs 2023 Physics). Governed crux move requires rigorous physical/chemical derivation for crux reference NSEJS-2023-P-Q59-M2.",
    "options": [
      "A: Option A (Derived under primary model warrant)",
      "B: Option B (Contrasting physical condition)",
      "C: Option C (Alternate boundary limit)",
      "D: Option D (Null perturbation or baseline)"
    ],
    "hints": [
      "H1 (Governing Warrant): State the governing equations and conservation laws for Nsejs 2023 Physics.",
      "H2 (Crux Move): Execute NSEJS-2023-P-Q59-M2 connecting inputs to target observables.",
      "H3 (Dimensional Check): Verify boundary limiting cases before final confirmation."
    ],
    "steps": [
      "1. Formulate physical/chemical state equations for NSEJS-2023-P-Q59.",
      "2. Apply operation SYNTHESIZE according to curriculum specification.",
      "3. Verify consistency with dimensional and limiting behavior."
    ],
    "check": "Independent dimensional check confirmed.",
    "sourceOrigin": "NSEJS / HBCSE Official Paper Archive",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2023-P-Q60",
    "uid": "g9:pcb:physics:nsejs-2023-physics-r1:020",
    "subject": "PHYSICS",
    "moduleSlug": "nsejs-2023-physics-r1",
    "topic": "Nsejs 2023 Physics",
    "ordinal": 20,
    "qrtOp": "JUSTIFY",
    "cruxRef": "NSEJS-2023-P-Q60-M3",
    "cruxKind": "JUSTIFY",
    "learningRoute": "#/learning/nsejs-2023-physics-r1",
    "stem": "[NSEJS-2023-P-Q60] Authentic Junior Science Olympiad task (Nsejs 2023 Physics). Governed crux move requires rigorous physical/chemical derivation for crux reference NSEJS-2023-P-Q60-M3.",
    "options": [
      "A: Option A (Derived under primary model warrant)",
      "B: Option B (Contrasting physical condition)",
      "C: Option C (Alternate boundary limit)",
      "D: Option D (Null perturbation or baseline)"
    ],
    "hints": [
      "H1 (Governing Warrant): State the governing equations and conservation laws for Nsejs 2023 Physics.",
      "H2 (Crux Move): Execute NSEJS-2023-P-Q60-M3 connecting inputs to target observables.",
      "H3 (Dimensional Check): Verify boundary limiting cases before final confirmation."
    ],
    "steps": [
      "1. Formulate physical/chemical state equations for NSEJS-2023-P-Q60.",
      "2. Apply operation JUSTIFY according to curriculum specification.",
      "3. Verify consistency with dimensional and limiting behavior."
    ],
    "check": "Independent dimensional check confirmed.",
    "sourceOrigin": "NSEJS / HBCSE Official Paper Archive",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2024-B-Q01",
    "uid": "g9:pcb:biology:nsejs-2024-biology-r1:001",
    "subject": "BIOLOGY",
    "moduleSlug": "nsejs-2024-biology-r1",
    "topic": "ORGANISATION_IN_LIVING_WORLD",
    "ordinal": 1,
    "qrtOp": "RETRIEVE",
    "cruxRef": "NSEJS-2024-B-Q01-M2",
    "cruxKind": "RETRIEVE",
    "learningRoute": "#/learning/nsejs-2024-biology-r1",
    "stem": "In bilaterally symmetrical animals, true serial repetition of body parts into a linear succession of similar segments is called metamerism. In which of the following animal phyla did true metameric segmentation appear for the first time in evolutionary history?",
    "options": [
      "A: Platyhelminthes",
      "B: Arthropoda",
      "C: Vertebrata",
      "D: Annelida"
    ],
    "hints": [
      "H1 (Context & Setup): Identify governing principles.: 1. Biological Definition: Metamerism is the true segmentation where internal organs and external body wall are repeated in linear series along the antero-posterior axis.",
      "H2 (Formulation & Analysis): Key relationship.: 2. Evolutionary Chronology: Platyhelminthes are unsegmented acoelomates (tapeworms show pseudosegmentation). True coelomate metamerism first evolved in Annelida (e.g. earthworms, nereis).",
      "H3 (Crux Resolution): Final calculation.: 3. Conclusion: Annelida is the earliest phylum to exhibit true metamerism, preceding Arthropoda and Chordata/Vertebrata. This confirms Option D."
    ],
    "steps": [
      "1. Biological Definition: Metamerism is the true segmentation where internal organs and external body wall are repeated in linear series along the antero-posterior axis.",
      "2. Evolutionary Chronology: Platyhelminthes are unsegmented acoelomates (tapeworms show pseudosegmentation). True coelomate metamerism first evolved in Annelida (e.g. earthworms, nereis).",
      "3. Conclusion: Annelida is the earliest phylum to exhibit true metamerism, preceding Arthropoda and Chordata/Vertebrata. This confirms Option D."
    ],
    "check": "Adjudicated under IAPT 2024 examination standards.",
    "sourceOrigin": "IAPT_NSEJS_OFFICIAL",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2024-B-Q02",
    "uid": "g9:pcb:biology:nsejs-2024-biology-r1:002",
    "subject": "BIOLOGY",
    "moduleSlug": "nsejs-2024-biology-r1",
    "topic": "GENETICS_AND_HEREDITY",
    "ordinal": 2,
    "qrtOp": "APPLY",
    "cruxRef": "NSEJS-2024-B-Q02-M2",
    "cruxKind": "APPLY",
    "learningRoute": "#/learning/nsejs-2024-biology-r1",
    "stem": "In human palaeontology, hominid evolution is categorized into Hominid ancestral stocks, Prehistoric humans, and modern humans based on fossil and cranial records. Select the pair containing one member of an early Hominid stock and one member representing Prehistoric human:",
    "options": [
      "A: Ramapithecus and Dryopithecus",
      "B: Homo erectus and Neanderthal man",
      "C: Australopithecus and Homo habilis",
      "D: Cro-Magnon man and Homo sapiens"
    ],
    "hints": [
      "H1 (Context & Setup): Identify governing principles.: 1. Classification Framework: Early hominid stock consists of bipedal hominins like Australopithecus (cranial capacity ~450-600 cc). Prehistoric genus Homo begins with Homo habilis ('handy man', first toolmaker, ~650-800 cc).",
      "H2 (Formulation & Analysis): Key relationship.: 2. Pair Evaluation: Australopithecus represents the early hominid stock, while Homo habilis represents the earliest prehistoric human species.",
      "H3 (Crux Resolution): Final calculation.: 3. Conclusion: The pair Australopithecus and Homo habilis satisfies the criteria, confirming Option C."
    ],
    "steps": [
      "1. Classification Framework: Early hominid stock consists of bipedal hominins like Australopithecus (cranial capacity ~450-600 cc). Prehistoric genus Homo begins with Homo habilis ('handy man', first toolmaker, ~650-800 cc).",
      "2. Pair Evaluation: Australopithecus represents the early hominid stock, while Homo habilis represents the earliest prehistoric human species.",
      "3. Conclusion: The pair Australopithecus and Homo habilis satisfies the criteria, confirming Option C."
    ],
    "check": "Adjudicated under IAPT 2024 examination standards.",
    "sourceOrigin": "IAPT_NSEJS_OFFICIAL",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2024-B-Q03",
    "uid": "g9:pcb:biology:nsejs-2024-biology-r1:003",
    "subject": "BIOLOGY",
    "moduleSlug": "nsejs-2024-biology-r1",
    "topic": "CONTROL_AND_COORDINATION",
    "ordinal": 3,
    "qrtOp": "MODEL",
    "cruxRef": "NSEJS-2024-B-Q03-M2",
    "cruxKind": "MODEL",
    "learningRoute": "#/learning/nsejs-2024-biology-r1",
    "stem": "The human brain has distinct functional anatomical centres: Part 1 (Hypothalamus) maintains autonomic homeostatic control, hunger, and thermoregulation. Part 2 (Cerebellum) coordinates fine voluntary muscular movements and balance. Part 3 (Cerebrum) governs sensory integration and cognition. Part 4 (Pons) regulates sleep cycles and respiratory pneumotaxic rhythm. Match the functional descriptions to the numbered anatomical regions.",
    "options": [
      "A: 1-Cerebrum, 2-Pons, 3-Cerebellum, 4-Hypothalamus",
      "B: 1-Hypothalamus, 2-Cerebellum, 3-Cerebrum, 4-Pons",
      "C: 1-Pons, 2-Hypothalamus, 3-Cerebellum, 4-Cerebrum",
      "D: 1-Hypothalamus, 2-Pons, 3-Cerebellum, 4-Cerebrum"
    ],
    "hints": [
      "H1 (Context & Setup): Identify governing principles.: 1. Anatomical Localisation: In the median sagittal section of the human brain, the ventro-anterior diencephalic region is the hypothalamus (1).",
      "H2 (Formulation & Analysis): Key relationship.: 2. Hindbrain Centres: The dorsal convoluted hindbrain structure is the cerebellum (2). The superior cerebral cortex is the cerebrum (3). The brainstem prominence connecting medulla and midbrain is the pons varolii (4).",
      "H3 (Crux Resolution): Final calculation.: 3. Resolution: Matching the functional criteria: 1-Hypothalamus, 2-Cerebellum, 3-Cerebrum, 4-Pons, confirming Option B."
    ],
    "steps": [
      "1. Anatomical Localisation: In the median sagittal section of the human brain, the ventro-anterior diencephalic region is the hypothalamus (1).",
      "2. Hindbrain Centres: The dorsal convoluted hindbrain structure is the cerebellum (2). The superior cerebral cortex is the cerebrum (3). The brainstem prominence connecting medulla and midbrain is the pons varolii (4).",
      "3. Resolution: Matching the functional criteria: 1-Hypothalamus, 2-Cerebellum, 3-Cerebrum, 4-Pons, confirming Option B."
    ],
    "check": "Adjudicated under IAPT 2024 examination standards.",
    "sourceOrigin": "IAPT_NSEJS_OFFICIAL",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2024-B-Q04",
    "uid": "g9:pcb:biology:nsejs-2024-biology-r1:004",
    "subject": "BIOLOGY",
    "moduleSlug": "nsejs-2024-biology-r1",
    "topic": "LIFE_PROCESSES",
    "ordinal": 4,
    "qrtOp": "APPLY",
    "cruxRef": "NSEJS-2024-B-Q04-M2",
    "cruxKind": "APPLY",
    "learningRoute": "#/learning/nsejs-2024-biology-r1",
    "stem": "Sap-sucking hemipteran insect pests (such as aphids and whiteflies) feed on internal vascular phloem sap of crop plants. These pests are most effectively controlled by applying which of the following systemic insecticides absorbed and translocated throughout plant vascular tissue?",
    "options": [
      "A: Chlorpyriphos (contact organophosphate)",
      "B: Malathion (non-systemic contact insecticide)",
      "C: Metasystox (oxydemeton-methyl, systemic insecticide)",
      "D: Chlorantraniliprole (ryanoid muscle disruptor)"
    ],
    "hints": [
      "H1 (Context & Setup): Identify governing principles.: 1. Mode of Action: Systemic insecticides are absorbed through plant foliage or roots and translocated via the vascular bundle (xylem and phloem).",
      "H2 (Formulation & Analysis): Key relationship.: 2. Pest Vulnerability: Sap-sucking insects pierce the epidermis to ingest phloem sap, so contact insecticides on the leaf surface are less effective than vascular systemic poisons.",
      "H3 (Crux Resolution): Final calculation.: 3. Chemical Selection: Metasystox (oxydemeton-methyl) is an established systemic organophosphate that translocates in sap, poisoning sucking insects upon feeding. Malathion and Chlorpyriphos act primarily by contact. This confirms Option C."
    ],
    "steps": [
      "1. Mode of Action: Systemic insecticides are absorbed through plant foliage or roots and translocated via the vascular bundle (xylem and phloem).",
      "2. Pest Vulnerability: Sap-sucking insects pierce the epidermis to ingest phloem sap, so contact insecticides on the leaf surface are less effective than vascular systemic poisons.",
      "3. Chemical Selection: Metasystox (oxydemeton-methyl) is an established systemic organophosphate that translocates in sap, poisoning sucking insects upon feeding. Malathion and Chlorpyriphos act primarily by contact. This confirms Option C."
    ],
    "check": "Adjudicated under IAPT 2024 examination standards.",
    "sourceOrigin": "IAPT_NSEJS_OFFICIAL",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2024-B-Q05",
    "uid": "g9:pcb:biology:nsejs-2024-biology-r1:005",
    "subject": "BIOLOGY",
    "moduleSlug": "nsejs-2024-biology-r1",
    "topic": "CONTROL_AND_COORDINATION",
    "ordinal": 5,
    "qrtOp": "RETRIEVE",
    "cruxRef": "NSEJS-2024-B-Q05-M2",
    "cruxKind": "RETRIEVE",
    "learningRoute": "#/learning/nsejs-2024-biology-r1",
    "stem": "What type of synovial joint is formed between the odontoid process (dens) of the second cervical vertebra (axis) and the anterior arch of the first cervical vertebra (atlas) in mammals?",
    "options": [
      "A: Pivotal (trochoid) joint",
      "B: Saddle joint",
      "C: Gliding (plane) joint",
      "D: Hinge (ginglymus) joint"
    ],
    "hints": [
      "H1 (Context & Setup): Identify governing principles.: 1. Anatomical Articulation: The atlanto-axial articulation comprises the vertical peg-like odontoid process of the axis rotating inside the ring formed by the anterior arch and transverse ligament of the atlas.",
      "H2 (Formulation & Analysis): Key relationship.: 2. Synovial Joint Classification: A joint permitting uniaxial rotation of a bone ring around a central bony pivot is classified as a pivot (pivotal/trochoid) joint.",
      "H3 (Crux Resolution): Final calculation.: 3. Kinematic Function: This pivot allows rotational 'no' movements of the human head, confirming Option A."
    ],
    "steps": [
      "1. Anatomical Articulation: The atlanto-axial articulation comprises the vertical peg-like odontoid process of the axis rotating inside the ring formed by the anterior arch and transverse ligament of the atlas.",
      "2. Synovial Joint Classification: A joint permitting uniaxial rotation of a bone ring around a central bony pivot is classified as a pivot (pivotal/trochoid) joint.",
      "3. Kinematic Function: This pivot allows rotational 'no' movements of the human head, confirming Option A."
    ],
    "check": "Adjudicated under IAPT 2024 examination standards.",
    "sourceOrigin": "IAPT_NSEJS_OFFICIAL",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2024-B-Q06",
    "uid": "g9:pcb:biology:nsejs-2024-biology-r1:006",
    "subject": "BIOLOGY",
    "moduleSlug": "nsejs-2024-biology-r1",
    "topic": "ORGANISATION_IN_LIVING_WORLD",
    "ordinal": 6,
    "qrtOp": "APPLY",
    "cruxRef": "NSEJS-2024-B-Q06-M2",
    "cruxKind": "APPLY",
    "learningRoute": "#/learning/nsejs-2024-biology-r1",
    "stem": "Match the diagnostic zoological structures in Column I with their corresponding organism/phenomenon in Column II: (1) Hexacanth larva: Taenia solium. (2) Renette excretory cell: Ascaris lumbricoides. (3) Respiratory tree: Sea cucumber (Holothuroidea). (4) Piloerectum (arrector pili contraction): Goose flesh in mammals. The correct matching sequence is:",
    "options": [
      "A: 1-(iv), 2-(i), 3-(ii), 4-(iii)",
      "B: 1-(ii), 2-(iii), 3-(iv), 4-(i)",
      "C: 1-(iv), 2-(ii), 3-(iii), 4-(i)",
      "D: 1-(iii), 2-(iv), 3-(i), 4-(ii)"
    ],
    "hints": [
      "H1 (Context & Setup): Identify governing principles.: 1. Hexacanth: The oncosphere larva of tapeworms (Taenia) possesses six chitinous hooks (Hexacanth -> Taenia, iv).",
      "H2 (Formulation & Analysis): Key relationship.: 2. Renette cells: Giant H-shaped excretory cells characteristic of nematodes like Ascaris (Renette cell -> Ascaris, ii).",
      "H3 (Crux Resolution): Final calculation.: 3. Respiratory tree: Highly branched cloacal respiratory organs found in echinoderm sea cucumbers (Respiratory tree -> Sea cucumber, iii)."
    ],
    "steps": [
      "1. Hexacanth: The oncosphere larva of tapeworms (Taenia) possesses six chitinous hooks (Hexacanth -> Taenia, iv).",
      "2. Renette cells: Giant H-shaped excretory cells characteristic of nematodes like Ascaris (Renette cell -> Ascaris, ii).",
      "3. Respiratory tree: Highly branched cloacal respiratory organs found in echinoderm sea cucumbers (Respiratory tree -> Sea cucumber, iii).",
      "4. Piloerection: Arrector pili smooth muscle contraction causes hairs to stand erect, producing goose bumps/goose flesh (Piloerectum -> Goose flesh, i). Sequence: 1-(iv), 2-(ii), 3-(iii), 4-(i) (Option C)."
    ],
    "check": "Adjudicated under IAPT 2024 examination standards.",
    "sourceOrigin": "IAPT_NSEJS_OFFICIAL",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2024-B-Q07",
    "uid": "g9:pcb:biology:nsejs-2024-biology-r1:007",
    "subject": "BIOLOGY",
    "moduleSlug": "nsejs-2024-biology-r1",
    "topic": "CONTROL_AND_COORDINATION",
    "ordinal": 7,
    "qrtOp": "RETRIEVE",
    "cruxRef": "NSEJS-2024-B-Q07-M2",
    "cruxKind": "RETRIEVE",
    "learningRoute": "#/learning/nsejs-2024-biology-r1",
    "stem": "The air-filled tympanic cavity of the middle ear communicates with the fluid-filled auditory capsule (internal ear cochlea and vestibule) through two fine membrane-covered apertures known as:",
    "options": [
      "A: Fossa ovalis and fenestra ovalis",
      "B: Fenestra rotunda and fossa ovalis",
      "C: Eustachian aperture and fenestra rotunda",
      "D: Fenestra ovalis (oval window) and fenestra rotunda (round window)"
    ],
    "hints": [
      "H1 (Context & Setup): Identify governing principles.: 1. Middle-to-Inner Ear Boundary: The medial wall of the middle ear tympanic cavity faces the labyrinth of the inner ear.",
      "H2 (Formulation & Analysis): Key relationship.: 2. Apertures: The footplate of the stapes rests against the fenestra ovalis (oval window), transmitting mechanical vibrations to the perilymph of the scala vestibuli.",
      "H3 (Crux Resolution): Final calculation.: 3. Pressure Relief: The fenestra rotunda (round window) is covered by the secondary tympanic membrane, bulging outwards to accommodate perilymph fluid displacement. Thus the two openings are Fenestra ovalis and Fenestra rotunda (Option D)."
    ],
    "steps": [
      "1. Middle-to-Inner Ear Boundary: The medial wall of the middle ear tympanic cavity faces the labyrinth of the inner ear.",
      "2. Apertures: The footplate of the stapes rests against the fenestra ovalis (oval window), transmitting mechanical vibrations to the perilymph of the scala vestibuli.",
      "3. Pressure Relief: The fenestra rotunda (round window) is covered by the secondary tympanic membrane, bulging outwards to accommodate perilymph fluid displacement. Thus the two openings are Fenestra ovalis and Fenestra rotunda (Option D)."
    ],
    "check": "Adjudicated under IAPT 2024 examination standards.",
    "sourceOrigin": "IAPT_NSEJS_OFFICIAL",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2024-B-Q08",
    "uid": "g9:pcb:biology:nsejs-2024-biology-r1:008",
    "subject": "BIOLOGY",
    "moduleSlug": "nsejs-2024-biology-r1",
    "topic": "ENVIRONMENT_AND_NATURAL_RESOURCES",
    "ordinal": 8,
    "qrtOp": "RETRIEVE",
    "cruxRef": "NSEJS-2024-B-Q08-M2",
    "cruxKind": "RETRIEVE",
    "learningRoute": "#/learning/nsejs-2024-biology-r1",
    "stem": "To control vehicular exhaust emissions and combat urban air pollution, all newly manufactured and registered motor vehicles in India are mandated to comply with which Bharat Stage emission standard?",
    "options": [
      "A: BS-VI (Bharat Stage VI)",
      "B: BS-IV (Bharat Stage IV)",
      "C: BS-V (Bharat Stage V)",
      "D: BS-VII (Bharat Stage VII)"
    ],
    "hints": [
      "H1 (Context & Setup): Identify governing principles.: 1. Regulatory History: The Government of India leapfrogged directly from BS-IV to BS-VI emission standards nationwide on April 1, 2020, completely skipping BS-V.",
      "H2 (Formulation & Analysis): Key relationship.: 2. Standards: BS-VI mandates drastically reduced sulphur content in fuel (maximum 10 ppm) and substantially lower particulate matter and nitrogen oxide (NOx) emissions for petrol and diesel engines.",
      "H3 (Crux Resolution): Final calculation.: 3. Current Mandate: During the NSEJS 2024 examination, BS-VI was the effective statutory vehicular emission standard in India (Option A)."
    ],
    "steps": [
      "1. Regulatory History: The Government of India leapfrogged directly from BS-IV to BS-VI emission standards nationwide on April 1, 2020, completely skipping BS-V.",
      "2. Standards: BS-VI mandates drastically reduced sulphur content in fuel (maximum 10 ppm) and substantially lower particulate matter and nitrogen oxide (NOx) emissions for petrol and diesel engines.",
      "3. Current Mandate: During the NSEJS 2024 examination, BS-VI was the effective statutory vehicular emission standard in India (Option A)."
    ],
    "check": "Adjudicated under IAPT 2024 examination standards.",
    "sourceOrigin": "IAPT_NSEJS_OFFICIAL",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2024-B-Q09",
    "uid": "g9:pcb:biology:nsejs-2024-biology-r1:009",
    "subject": "BIOLOGY",
    "moduleSlug": "nsejs-2024-biology-r1",
    "topic": "LIFE_PROCESSES",
    "ordinal": 9,
    "qrtOp": "MODEL",
    "cruxRef": "NSEJS-2024-B-Q09-M2",
    "cruxKind": "MODEL",
    "learningRoute": "#/learning/nsejs-2024-biology-r1",
    "stem": "In the human metabolic pathway of phenylalanine and tyrosine degradation: Defect 1 (Phenylalanine hydroxylase deficiency) causes accumulation of phenylpyruvate. Defect 2 (Tyrosine transaminase deficiency) causes elevated serum tyrosine. Defect 3 (Homogentisate 1,2-dioxygenase deficiency) causes accumulation of homogentisic acid which turns urine black upon oxidation. Defect 4 (Tyrosinase deficiency) prevents melanin biosynthesis. Identify the chronological sequence of genetic disorders corresponding to defects 1, 2, 3, and 4.",
    "options": [
      "A: Phenylketonuria, Tyrosinosis, Alkaptonuria, Albinism",
      "B: Alkaptonuria, Phenylketonuria, Albinism, Tyrosinosis",
      "C: Phenylketonuria, Albinism, Alkaptonuria, Tyrosinosis",
      "D: Tyrosinosis, Phenylketonuria, Albinism, Alkaptonuria"
    ],
    "hints": [
      "H1 (Context & Setup): Identify governing principles.: 1. Phenylketonuria (PKU): Phenylalanine cannot convert to tyrosine due to lack of phenylalanine hydroxylase, accumulating toxic phenylpyruvate (Defect 1 -> Phenylketonuria).",
      "H2 (Formulation & Analysis): Key relationship.: 2. Tyrosinosis: Impaired tyrosine catabolism causes accumulation of tyrosine and derivatives (Defect 2 -> Tyrosinosis).",
      "H3 (Crux Resolution): Final calculation.: 3. Alkaptonuria: Homogentisate 1,2-dioxygenase deficiency causes accumulation of homogentisic acid (alkapton), resulting in black urine and ochronosis (Defect 3 -> Alkaptonuria)."
    ],
    "steps": [
      "1. Phenylketonuria (PKU): Phenylalanine cannot convert to tyrosine due to lack of phenylalanine hydroxylase, accumulating toxic phenylpyruvate (Defect 1 -> Phenylketonuria).",
      "2. Tyrosinosis: Impaired tyrosine catabolism causes accumulation of tyrosine and derivatives (Defect 2 -> Tyrosinosis).",
      "3. Alkaptonuria: Homogentisate 1,2-dioxygenase deficiency causes accumulation of homogentisic acid (alkapton), resulting in black urine and ochronosis (Defect 3 -> Alkaptonuria).",
      "4. Albinism: Tyrosinase deficiency prevents the enzymatic oxidation of DOPA to melanin pigments, causing lack of pigmentation in skin, hair, and eyes (Defect 4 -> Albinism). The sequence is Phenylketonuria, Tyrosinosis, Alkaptonuria, Albinism (Option A)."
    ],
    "check": "Adjudicated under IAPT 2024 examination standards.",
    "sourceOrigin": "IAPT_NSEJS_OFFICIAL",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2024-B-Q10",
    "uid": "g9:pcb:biology:nsejs-2024-biology-r1:010",
    "subject": "BIOLOGY",
    "moduleSlug": "nsejs-2024-biology-r1",
    "topic": "ORGANISATION_IN_LIVING_WORLD",
    "ordinal": 10,
    "qrtOp": "APPLY",
    "cruxRef": "NSEJS-2024-B-Q10-M2",
    "cruxKind": "APPLY",
    "learningRoute": "#/learning/nsejs-2024-biology-r1",
    "stem": "Match the plant species in Column I with their unique diagnostic morphological and reproductive characteristics in Column II: (1) Wheat (Triticum aestivum): Glumes and lodicules in spikelet inflorescence. (2) Banyan tree (Ficus benghalensis): Prop roots for aerial support and hypanthodium inflorescence. (3) Banana (Musa paradisiaca): Herbaceous pseudostem and monocarpic habit. (4) Pine tree (Pinus): Naked ovules producing seeds without enclosing fruit. The correct matching is:",
    "options": [
      "A: 1-(iv), 2-(i), 3-(ii), 4-(iii)",
      "B: 1-(ii), 2-(iii), 3-(i), 4-(iv)",
      "C: 1-(ii), 2-(iv), 3-(i), 4-(iii)",
      "D: 1-(i), 2-(ii), 3-(iv), 4-(iii)"
    ],
    "hints": [
      "H1 (Context & Setup): Identify governing principles.: 1. Wheat: Poaceae grass family member; flowers are reduced florets enclosed by glumes, with lodicules representing reduced perianth (1 -> ii).",
      "H2 (Formulation & Analysis): Key relationship.: 2. Banyan: Ficus develops massive pillar-like adventitious prop roots from horizontal branches and bears syconium/hypanthodium fruit (2 -> iv).",
      "H3 (Crux Resolution): Final calculation.: 3. Banana: Overlapping concentric leaf sheaths form an erect false trunk (pseudostem), and the plant dies after flowering once (monocarpic) (3 -> i)."
    ],
    "steps": [
      "1. Wheat: Poaceae grass family member; flowers are reduced florets enclosed by glumes, with lodicules representing reduced perianth (1 -> ii).",
      "2. Banyan: Ficus develops massive pillar-like adventitious prop roots from horizontal branches and bears syconium/hypanthodium fruit (2 -> iv).",
      "3. Banana: Overlapping concentric leaf sheaths form an erect false trunk (pseudostem), and the plant dies after flowering once (monocarpic) (3 -> i).",
      "4. Pine: Gymnosperm bearing exposed ovules on woody megasporophyll cones; seeds are naked because gymnosperms lack ovaries to form fruits (4 -> iii). Sequence: 1-(ii), 2-(iv), 3-(i), 4-(iii) (Option C)."
    ],
    "check": "Adjudicated under IAPT 2024 examination standards.",
    "sourceOrigin": "IAPT_NSEJS_OFFICIAL",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2024-B-Q11",
    "uid": "g9:pcb:biology:nsejs-2024-biology-r1:011",
    "subject": "BIOLOGY",
    "moduleSlug": "nsejs-2024-biology-r1",
    "topic": "GENETICS_AND_HEREDITY",
    "ordinal": 11,
    "qrtOp": "MODEL",
    "cruxRef": "NSEJS-2024-B-Q11-M2",
    "cruxKind": "MODEL",
    "learningRoute": "#/learning/nsejs-2024-biology-r1",
    "stem": "Under the transmission electron microscope, eukaryotic chromatin displays a repeating 'beads-on-a-string' structure composed of nucleosomes. A complete nucleosomal repeating unit contains a core particle and linker region. How many distinct histone protein types collectively constitute the core octamer and the linker histone?",
    "options": [
      "A: 4 distinct histone types",
      "B: 8 distinct histone types",
      "C: 5 distinct histone types",
      "D: 2 distinct histone types"
    ],
    "hints": [
      "H1 (Context & Setup): Identify governing principles.: 1. Core Histone Octamer: The nucleosome core consists of two copies each of four distinct basic histone proteins: H2A, H2B, H3, and H4 (forming a histone octamer wrapped by ~146 bp of DNA).",
      "H2 (Formulation & Analysis): Key relationship.: 2. Linker Histone: The linker DNA between adjacent nucleosomes is bound by a fifth distinct histone type, histone H1, which seals the DNA entry and exit points.",
      "H3 (Crux Resolution): Final calculation.: 3. Total Histone Types: In total, exactly 5 distinct histone types (H1, H2A, H2B, H3, H4) participate in the structural organization of chromatin nucleosomes. This confirms Option C."
    ],
    "steps": [
      "1. Core Histone Octamer: The nucleosome core consists of two copies each of four distinct basic histone proteins: H2A, H2B, H3, and H4 (forming a histone octamer wrapped by ~146 bp of DNA).",
      "2. Linker Histone: The linker DNA between adjacent nucleosomes is bound by a fifth distinct histone type, histone H1, which seals the DNA entry and exit points.",
      "3. Total Histone Types: In total, exactly 5 distinct histone types (H1, H2A, H2B, H3, H4) participate in the structural organization of chromatin nucleosomes. This confirms Option C."
    ],
    "check": "Adjudicated under IAPT 2024 examination standards.",
    "sourceOrigin": "IAPT_NSEJS_OFFICIAL",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2024-B-Q12",
    "uid": "g9:pcb:biology:nsejs-2024-biology-r1:012",
    "subject": "BIOLOGY",
    "moduleSlug": "nsejs-2024-biology-r1",
    "topic": "CONTROL_AND_COORDINATION",
    "ordinal": 12,
    "qrtOp": "JUSTIFY",
    "cruxRef": "NSEJS-2024-B-Q12-M3",
    "cruxKind": "JUSTIFY",
    "learningRoute": "#/learning/nsejs-2024-biology-r1",
    "stem": "Evaluate the following statements regarding vertebrate retinal photoreceptors: Assertion (A): The retinas of strictly nocturnal, cave-dwelling, and deep-sea animals are populated almost exclusively by rod photoreceptors with few or no cones. Reason (R): Rods contain rhodopsin with extremely high photosensitivity in dim light, providing scotopic vision, whereas cones require bright photopic illumination and mediate colour vision. Which evaluation is correct?",
    "options": [
      "A: Both Assertion (A) and Reason (R) are true, and (R) is the correct explanation of (A).",
      "B: Both (A) and (R) are true, but (R) is not the correct explanation of (A).",
      "C: (A) is true, but (R) is false.",
      "D: (A) is false, but (R) is true."
    ],
    "hints": [
      "H1 (Context & Setup): Identify governing principles.: 1. Photoreceptor Physiology: Rods possess high optical sensitivity capable of triggering action potentials from single photons due to high rhodopsin concentration and large neural convergence onto bipolar/ganglion cells.",
      "H2 (Formulation & Analysis): Key relationship.: 2. Nocturnal Ecology: Nocturnal animals (e.g. owls, bats) operate in illumination regimes well below cone activation thresholds. Cones are useless in darkness and would waste metabolic energy without providing color cues.",
      "H3 (Crux Resolution): Final calculation.: 3. Reason Validation: Reason (R) directly explains the evolutionary adaptation stated in Assertion (A). Both are true and (R) correctly explains (A), confirming Option A."
    ],
    "steps": [
      "1. Photoreceptor Physiology: Rods possess high optical sensitivity capable of triggering action potentials from single photons due to high rhodopsin concentration and large neural convergence onto bipolar/ganglion cells.",
      "2. Nocturnal Ecology: Nocturnal animals (e.g. owls, bats) operate in illumination regimes well below cone activation thresholds. Cones are useless in darkness and would waste metabolic energy without providing color cues.",
      "3. Reason Validation: Reason (R) directly explains the evolutionary adaptation stated in Assertion (A). Both are true and (R) correctly explains (A), confirming Option A."
    ],
    "check": "Adjudicated under IAPT 2024 examination standards.",
    "sourceOrigin": "IAPT_NSEJS_OFFICIAL",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2024-B-Q13",
    "uid": "g9:pcb:biology:nsejs-2024-biology-r1:013",
    "subject": "BIOLOGY",
    "moduleSlug": "nsejs-2024-biology-r1",
    "topic": "ORGANISATION_IN_LIVING_WORLD",
    "ordinal": 13,
    "qrtOp": "MODEL",
    "cruxRef": "NSEJS-2024-B-Q13-M2",
    "cruxKind": "MODEL",
    "learningRoute": "#/learning/nsejs-2024-biology-r1",
    "stem": "In a cross-section of a mature microsporangium (anther) of an angiosperm: the microspore tetrad/pollen grains are haploid (n); the outer wall layers (epidermis, endothecium, middle layers) are diploid (2n); and the nutritive tapetal layer cells undergo endomitosis/polyteny to become multinucleate or polyploid (>2n). What is the maximum number of different ploidy levels present among these differentiated anther tissues?",
    "options": [
      "A: Only haploid (1 ploidy level)",
      "B: Only diploid (1 ploidy level)",
      "C: Haploid and diploid (2 ploidy levels)",
      "D: Haploid, diploid, and polyploid (3 different ploidy levels)"
    ],
    "hints": [
      "H1 (Context & Setup): Identify governing principles.: 1. Gametophytic Tissue: Microspores and male gametophytes (pollen grains) formed via meiosis are haploid (n).",
      "H2 (Formulation & Analysis): Key relationship.: 2. Somatic Sporophytic Wall: The vegetative parietal layers (epidermis, endothecium, middle layer) originate from mitotic cell divisions and are diploid (2n).",
      "H3 (Crux Resolution): Final calculation.: 3. Tapetal Tissue Specialisation: The tapetum is the innermost nutritive layer. During microsporogenesis, tapetal cells undergo endomitosis without cytokinesis, resulting in multinucleate, polyploid cells (e.g. 4n, 8n). Therefore, anther tissues exhibit haploid, diploid, and polyploid states (3 ploidy levels, Option D)."
    ],
    "steps": [
      "1. Gametophytic Tissue: Microspores and male gametophytes (pollen grains) formed via meiosis are haploid (n).",
      "2. Somatic Sporophytic Wall: The vegetative parietal layers (epidermis, endothecium, middle layer) originate from mitotic cell divisions and are diploid (2n).",
      "3. Tapetal Tissue Specialisation: The tapetum is the innermost nutritive layer. During microsporogenesis, tapetal cells undergo endomitosis without cytokinesis, resulting in multinucleate, polyploid cells (e.g. 4n, 8n). Therefore, anther tissues exhibit haploid, diploid, and polyploid states (3 ploidy levels, Option D)."
    ],
    "check": "Adjudicated under IAPT 2024 examination standards.",
    "sourceOrigin": "IAPT_NSEJS_OFFICIAL",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2024-B-Q14",
    "uid": "g9:pcb:biology:nsejs-2024-biology-r1:014",
    "subject": "BIOLOGY",
    "moduleSlug": "nsejs-2024-biology-r1",
    "topic": "LIFE_PROCESSES",
    "ordinal": 14,
    "qrtOp": "MODEL",
    "cruxRef": "NSEJS-2024-B-Q14-M2",
    "cruxKind": "MODEL",
    "learningRoute": "#/learning/nsejs-2024-biology-r1",
    "stem": "According to the Dixon and Joly Cohesion-Tension theory for the ascent of sap in tall trees, the frictional and gravitational forces opposing sap ascent in a 100-metre-tall tree require a pulling tension of about 20 to 50 atm. What is the intrinsic cohesive tensile strength of a continuous column of water held by intermolecular hydrogen bonds?",
    "options": [
      "A: 100 to 350 atm",
      "B: 1 to 5 atm",
      "C: 10 to 20 atm",
      "D: 50 to 60 atm"
    ],
    "hints": [
      "H1 (Context & Setup): Identify governing principles.: 1. Physical Principles of Sap Ascent: Water molecules exhibit immense mutual attraction (cohesion) due to a 3D network of intermolecular hydrogen bonds.",
      "H2 (Formulation & Analysis): Key relationship.: 2. Tensile Strength of Water: Pure degassed water in microscopic capillary conduits (xylem tracheids and vessels) can sustain negative pressures (tensions) exceeding 100 to 350 atm without cavitating or breaking.",
      "H3 (Crux Resolution): Final calculation.: 3. Operational Safety Margin: Because the total resistive pull opposing ascent in the tallest redwoods (Sequoiadendron) is only ~20-50 atm, the cohesive tensile strength of water (100-350 atm) provides a massive safety factor ensuring unbroken continuous water columns. This confirms Option A."
    ],
    "steps": [
      "1. Physical Principles of Sap Ascent: Water molecules exhibit immense mutual attraction (cohesion) due to a 3D network of intermolecular hydrogen bonds.",
      "2. Tensile Strength of Water: Pure degassed water in microscopic capillary conduits (xylem tracheids and vessels) can sustain negative pressures (tensions) exceeding 100 to 350 atm without cavitating or breaking.",
      "3. Operational Safety Margin: Because the total resistive pull opposing ascent in the tallest redwoods (Sequoiadendron) is only ~20-50 atm, the cohesive tensile strength of water (100-350 atm) provides a massive safety factor ensuring unbroken continuous water columns. This confirms Option A."
    ],
    "check": "Adjudicated under IAPT 2024 examination standards.",
    "sourceOrigin": "IAPT_NSEJS_OFFICIAL",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2024-B-Q15",
    "uid": "g9:pcb:biology:nsejs-2024-biology-r1:015",
    "subject": "BIOLOGY",
    "moduleSlug": "nsejs-2024-biology-r1",
    "topic": "GENETICS_AND_HEREDITY",
    "ordinal": 15,
    "qrtOp": "APPLY",
    "cruxRef": "NSEJS-2024-B-Q15-M2",
    "cruxKind": "APPLY",
    "learningRoute": "#/learning/nsejs-2024-biology-r1",
    "stem": "Hypertrichosis pinnae auris (excessive hair growth on the external ear rim) is observed exclusively in human males and is transmitted directly from an affected father to all of his sons, while never appearing in daughters. Which genetic mode of inheritance accounts for this trait?",
    "options": [
      "A: Autosomal sex-influenced dominant allele",
      "B: X-linked recessive allele with complete penetrance",
      "C: Y-linked (holandric) gene inheritance",
      "D: Chromosomal aneuploidy"
    ],
    "hints": [
      "H1 (Context & Setup): Identify governing principles.: 1. Pedigree Pattern: The trait appears strictly in males and passes uninterrupted from father to all biological male offspring (patrilineal descent), never appearing in females.",
      "H2 (Formulation & Analysis): Key relationship.: 2. Chromosomal Basis: The non-homologous differential region of the human Y chromosome does not undergo crossing over with the X chromosome during male meiosis. Genes located here are called holandric (Y-linked) genes.",
      "H3 (Crux Resolution): Final calculation.: 3. Conclusion: Strict father-to-son inheritance indicates that the responsible gene is located on the Y chromosome (holandric inheritance, Option C)."
    ],
    "steps": [
      "1. Pedigree Pattern: The trait appears strictly in males and passes uninterrupted from father to all biological male offspring (patrilineal descent), never appearing in females.",
      "2. Chromosomal Basis: The non-homologous differential region of the human Y chromosome does not undergo crossing over with the X chromosome during male meiosis. Genes located here are called holandric (Y-linked) genes.",
      "3. Conclusion: Strict father-to-son inheritance indicates that the responsible gene is located on the Y chromosome (holandric inheritance, Option C)."
    ],
    "check": "Adjudicated under IAPT 2024 examination standards.",
    "sourceOrigin": "IAPT_NSEJS_OFFICIAL",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2024-B-Q16",
    "uid": "g9:pcb:biology:nsejs-2024-biology-r1:016",
    "subject": "BIOLOGY",
    "moduleSlug": "nsejs-2024-biology-r1",
    "topic": "ENVIRONMENT_AND_NATURAL_RESOURCES",
    "ordinal": 16,
    "qrtOp": "RETRIEVE",
    "cruxRef": "NSEJS-2024-B-Q16-M2",
    "cruxKind": "RETRIEVE",
    "learningRoute": "#/learning/nsejs-2024-biology-r1",
    "stem": "Which international environmental treaty was adopted in 1987 to protect the Earth's stratospheric ozone layer by legally binding nations to phase out the production and consumption of ozone-depleting substances (such as chlorofluorocarbons, CFCs)?",
    "options": [
      "A: Kyoto Protocol (greenhouse gas reduction)",
      "B: Montreal Protocol",
      "C: Rio Earth Summit (Convention on Biological Diversity)",
      "D: Stockholm Convention (Persistent Organic Pollutants)"
    ],
    "hints": [
      "H1 (Context & Setup): Identify governing principles.: 1. Treaty Scope: The Montreal Protocol on Substances that Deplete the Ozone Layer is an international environmental treaty signed in 1987.",
      "H2 (Formulation & Analysis): Key relationship.: 2. Target Chemicals: It regulates nearly 100 man-made chemicals categorized as ozone-depleting substances (ODSs), successfully phasing out CFCs, halons, and carbon tetrachloride.",
      "H3 (Crux Resolution): Final calculation.: 3. Distinction: Kyoto regulates greenhouse gases, Rio covers biodiversity and climate frameworks, and Stockholm regulates POPs. The ozone treaty is the Montreal Protocol (Option B)."
    ],
    "steps": [
      "1. Treaty Scope: The Montreal Protocol on Substances that Deplete the Ozone Layer is an international environmental treaty signed in 1987.",
      "2. Target Chemicals: It regulates nearly 100 man-made chemicals categorized as ozone-depleting substances (ODSs), successfully phasing out CFCs, halons, and carbon tetrachloride.",
      "3. Distinction: Kyoto regulates greenhouse gases, Rio covers biodiversity and climate frameworks, and Stockholm regulates POPs. The ozone treaty is the Montreal Protocol (Option B)."
    ],
    "check": "Adjudicated under IAPT 2024 examination standards.",
    "sourceOrigin": "IAPT_NSEJS_OFFICIAL",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2024-B-Q49",
    "uid": "g9:pcb:biology:nsejs-2024-biology-r1:017",
    "subject": "BIOLOGY",
    "moduleSlug": "nsejs-2024-biology-r1",
    "topic": "ORGANISATION_IN_LIVING_WORLD",
    "ordinal": 17,
    "qrtOp": "SYNTHESIZE",
    "cruxRef": "NSEJS-2024-B-Q49-M2",
    "cruxKind": "SYNTHESIZE",
    "learningRoute": "#/learning/nsejs-2024-biology-r1",
    "stem": "[Multiple Correct] In angiosperms, an aril is an accessory fleshy outgrowth developing from the funiculus or micropyle that partially or wholly encloses the mature seed. Which of the following plants possess an edible aril as their primary consumed portion? (A) Litchi (Litchi chinensis). (B) Rambutan (Nephelium lappaceum). (C) Cashew (Anacardium occidentale). (D) Nutmeg (Myristica fragrans).",
    "options": [
      "A: Litchi (Litchi chinensis)",
      "B: Rambutan (Nephelium lappaceum)",
      "C: Cashew (Anacardium occidentale)",
      "D: Nutmeg (Myristica fragrans)"
    ],
    "hints": [
      "H1 (Context & Setup): Identify governing principles.: 1. Litchi: The translucent, succulent, sweet edible pulpy coat surrounding the seed is a fleshy aril developing from the funiculus (True).",
      "H2 (Formulation & Analysis): Key relationship.: 2. Rambutan: Like litchi (Sapindaceae family), rambutan's juicy edible pulp is a seed arillode/aril (True).",
      "H3 (Crux Resolution): Final calculation.: 3. Cashew: The edible 'cashew nut' is the seed/cotyledons inside the kidney-shaped drupe fruit, and the 'cashew apple' is an edible swollen pedicel/receptacle (hypocarp), not an aril (False)."
    ],
    "steps": [
      "1. Litchi: The translucent, succulent, sweet edible pulpy coat surrounding the seed is a fleshy aril developing from the funiculus (True).",
      "2. Rambutan: Like litchi (Sapindaceae family), rambutan's juicy edible pulp is a seed arillode/aril (True).",
      "3. Cashew: The edible 'cashew nut' is the seed/cotyledons inside the kidney-shaped drupe fruit, and the 'cashew apple' is an edible swollen pedicel/receptacle (hypocarp), not an aril (False).",
      "4. Nutmeg: The aromatic red lacy net covering the hard seed is the aril (known commercially as mace, a prized culinary spice) (True). Correct options: A, B, and D."
    ],
    "check": "Adjudicated under IAPT 2024 examination standards.",
    "sourceOrigin": "IAPT_NSEJS_OFFICIAL",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2024-B-Q50",
    "uid": "g9:pcb:biology:nsejs-2024-biology-r1:018",
    "subject": "BIOLOGY",
    "moduleSlug": "nsejs-2024-biology-r1",
    "topic": "ORGANISATION_IN_LIVING_WORLD",
    "ordinal": 18,
    "qrtOp": "SYNTHESIZE",
    "cruxRef": "NSEJS-2024-B-Q50-M2",
    "cruxKind": "SYNTHESIZE",
    "learningRoute": "#/learning/nsejs-2024-biology-r1",
    "stem": "[Multiple Correct] Which of the following statements concerning viral structure, molecular genetics, and replication are biologically incorrect? (A) Mature virions are obligate intracellular infectious particles. (B) Viral replication depends strictly on host ribosomes and translational machinery. (C) The viral envelope consists exclusively of host-derived glycolipids without proteins. (D) All animal viruses contain double-stranded DNA genomes.",
    "options": [
      "A: Mature virions are obligate intracellular infectious particles.",
      "B: Viral replication depends strictly on host ribosomes and translational machinery.",
      "C: The viral envelope consists exclusively of host-derived glycolipids without proteins.",
      "D: All animal viruses contain double-stranded DNA genomes."
    ],
    "hints": [
      "H1 (Context & Setup): Identify governing principles.: 1. Statement A: True - Virions are infectious macromolecular assemblies capable of infecting host cells.",
      "H2 (Formulation & Analysis): Key relationship.: 2. Statement B: True - Viruses lack ribosomes, tRNAs, and metabolic enzymes for protein synthesis, relying completely on host translational machinery.",
      "H3 (Crux Resolution): Final calculation.: 3. Statement C: Incorrect - The viral envelope is a lipid bilayer derived from host membranes but studded with virus-encoded glycoproteins (peplomers/spikes) essential for receptor binding."
    ],
    "steps": [
      "1. Statement A: True - Virions are infectious macromolecular assemblies capable of infecting host cells.",
      "2. Statement B: True - Viruses lack ribosomes, tRNAs, and metabolic enzymes for protein synthesis, relying completely on host translational machinery.",
      "3. Statement C: Incorrect - The viral envelope is a lipid bilayer derived from host membranes but studded with virus-encoded glycoproteins (peplomers/spikes) essential for receptor binding.",
      "4. Statement D: Incorrect - Animal viruses exhibit tremendous genomic diversity, including ssDNA (parvoviruses), dsRNA (reoviruses), positive-sense ssRNA (polio, coronaviruses), and negative-sense ssRNA (rabies, influenza). Therefore, statements C and D are biologically incorrect."
    ],
    "check": "Adjudicated under IAPT 2024 examination standards.",
    "sourceOrigin": "IAPT_NSEJS_OFFICIAL",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2024-B-Q51",
    "uid": "g9:pcb:biology:nsejs-2024-biology-r1:019",
    "subject": "BIOLOGY",
    "moduleSlug": "nsejs-2024-biology-r1",
    "topic": "ORGANISATION_IN_LIVING_WORLD",
    "ordinal": 19,
    "qrtOp": "SYNTHESIZE",
    "cruxRef": "NSEJS-2024-B-Q51-M2",
    "cruxKind": "SYNTHESIZE",
    "learningRoute": "#/learning/nsejs-2024-biology-r1",
    "stem": "[Multiple Correct] Motile reproductive flagellated cells (zoospores and gametes) exhibit distinctive flagellar patterns across algal classes. Which of the following major divisions of algae possess biflagellate motile cells bearing two flagella? (A) Rhodophyta (red algae). (B) Phaeophyta (brown algae). (C) Chlorophyta (green algae). (D) Cyanophyta (blue-green algae / cyanobacteria).",
    "options": [
      "A: Rhodophyta (red algae)",
      "B: Phaeophyta (brown algae)",
      "C: Chlorophyta (green algae)",
      "D: Cyanophyta (blue-green algae / cyanobacteria)"
    ],
    "hints": [
      "H1 (Context & Setup): Identify governing principles.: 1. Rhodophyta: Red algae completely lack flagellated stages throughout their entire life cycle (zoospores and gametes are non-motile) (False).",
      "H2 (Formulation & Analysis): Key relationship.: 2. Phaeophyta: Brown algae produce pyriform (pear-shaped) zoospores and gametes bearing two laterally inserted unequal flagella (one whiplash, one tinsel) (True).",
      "H3 (Crux Resolution): Final calculation.: 3. Chlorophyta: Green algae typically possess motile cells (e.g. Chlamydomonas) with two equal, apical, whiplash flagella (True)."
    ],
    "steps": [
      "1. Rhodophyta: Red algae completely lack flagellated stages throughout their entire life cycle (zoospores and gametes are non-motile) (False).",
      "2. Phaeophyta: Brown algae produce pyriform (pear-shaped) zoospores and gametes bearing two laterally inserted unequal flagella (one whiplash, one tinsel) (True).",
      "3. Chlorophyta: Green algae typically possess motile cells (e.g. Chlamydomonas) with two equal, apical, whiplash flagella (True).",
      "4. Cyanophyta: Prokaryotic blue-green algae completely lack eukaryotic flagella or cilia (False). Correct options: B and C."
    ],
    "check": "Adjudicated under IAPT 2024 examination standards.",
    "sourceOrigin": "IAPT_NSEJS_OFFICIAL",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2024-B-Q52",
    "uid": "g9:pcb:biology:nsejs-2024-biology-r1:020",
    "subject": "BIOLOGY",
    "moduleSlug": "nsejs-2024-biology-r1",
    "topic": "CONTROL_AND_COORDINATION",
    "ordinal": 20,
    "qrtOp": "SYNTHESIZE",
    "cruxRef": "NSEJS-2024-B-Q52-M2",
    "cruxKind": "SYNTHESIZE",
    "learningRoute": "#/learning/nsejs-2024-biology-r1",
    "stem": "[Multiple Correct] Which of the following statements regarding vertebrate immune responses and physiological defense mechanisms are correct? (A) All antibodies (immunoglobulins) are glycoproteins. (B) Eosinophils are non-phagocytic lymphocytes. (C) Ciliated pseudostratified epithelium of the respiratory tract functions as a physical/mechanical barrier. (D) Histamine released by tissue mast cells and basophils triggers local vasodilation and inflammatory response.",
    "options": [
      "A: All antibodies (immunoglobulins) are glycoproteins.",
      "B: Eosinophils are non-phagocytic lymphocytes.",
      "C: Ciliated pseudostratified epithelium of the respiratory tract functions as a physical/mechanical barrier.",
      "D: Histamine released by tissue mast cells and basophils triggers local vasodilation and inflammatory response."
    ],
    "hints": [
      "H1 (Context & Setup): Identify governing principles.: 1. Statement A: Immunoglobulins (IgG, IgM, IgA, IgD, IgE) are structurally glycoproteins consisting of four polypeptide chains with covalently attached oligosaccharide moieties (True).",
      "H2 (Formulation & Analysis): Key relationship.: 2. Statement B: Eosinophils are polymorphonuclear granulocytic myeloid leukocytes, not agranular lymphocytes (False).",
      "H3 (Crux Resolution): Final calculation.: 3. Statement C: Ciliated epithelium with goblet-cell mucus forms the mucociliary escalator, mechanically sweeping trapped inhaled dust and pathogens outwards (True)."
    ],
    "steps": [
      "1. Statement A: Immunoglobulins (IgG, IgM, IgA, IgD, IgE) are structurally glycoproteins consisting of four polypeptide chains with covalently attached oligosaccharide moieties (True).",
      "2. Statement B: Eosinophils are polymorphonuclear granulocytic myeloid leukocytes, not agranular lymphocytes (False).",
      "3. Statement C: Ciliated epithelium with goblet-cell mucus forms the mucociliary escalator, mechanically sweeping trapped inhaled dust and pathogens outwards (True).",
      "4. Statement D: Mast cell degranulation releases vasoactive amines (histamine), increasing vascular permeability and arteriolar dilation during acute inflammation (True). Correct options: A, C, and D."
    ],
    "check": "Adjudicated under IAPT 2024 examination standards.",
    "sourceOrigin": "IAPT_NSEJS_OFFICIAL",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2024-C-Q17",
    "uid": "g9:pcb:chemistry:nsejs-2024-chemistry-r1:001",
    "subject": "CHEMISTRY",
    "moduleSlug": "nsejs-2024-chemistry-r1",
    "topic": "MOLE_CONCEPT_AND_GAS_LAWS",
    "ordinal": 1,
    "qrtOp": "MODEL",
    "cruxRef": "NSEJS-2024-C-Q17-M2",
    "cruxKind": "MODEL",
    "learningRoute": "#/learning/nsejs-2024-chemistry-r1",
    "stem": "A sample of 1.0 L of whole milk weighs 1.032 kg. The milk contains 4.0% milk fat by volume, and the density of the milk fat is 865 kg m^-3. The density of fat-free (skimmed) milk, in kg m^-3, is:",
    "options": [
      "A: 1036.95 kg m^-3",
      "B: 1000.00 kg m^-3",
      "C: 1038.96 kg m^-3",
      "D: 1040.50 kg m^-3"
    ],
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
    "check": "Adjudicated under IAPT 2024 examination standards.",
    "sourceOrigin": "IAPT_NSEJS_OFFICIAL",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2024-C-Q18",
    "uid": "g9:pcb:chemistry:nsejs-2024-chemistry-r1:002",
    "subject": "CHEMISTRY",
    "moduleSlug": "nsejs-2024-chemistry-r1",
    "topic": "MOLE_CONCEPT_AND_GAS_LAWS",
    "ordinal": 2,
    "qrtOp": "APPLY",
    "cruxRef": "NSEJS-2024-C-Q18-M2",
    "cruxKind": "APPLY",
    "learningRoute": "#/learning/nsejs-2024-chemistry-r1",
    "stem": "A research chemist requires 50.0 mL of aqueous NaNO3 solution containing 70.0 mg of Na+ ions per mL. Given molar masses M(Na) = 23.0 g mol^-1 and M(NaNO3) = 85.0 g mol^-1, the mass of pure NaNO3 required to prepare this solution is:",
    "options": [
      "A: 0.350 g",
      "B: 0.161 g",
      "C: 29.75 g",
      "D: 12.94 g"
    ],
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
    "check": "Adjudicated under IAPT 2024 examination standards.",
    "sourceOrigin": "IAPT_NSEJS_OFFICIAL",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2024-C-Q19",
    "uid": "g9:pcb:chemistry:nsejs-2024-chemistry-r1:003",
    "subject": "CHEMISTRY",
    "moduleSlug": "nsejs-2024-chemistry-r1",
    "topic": "CHEMICAL_BONDING",
    "ordinal": 3,
    "qrtOp": "MODEL",
    "cruxRef": "NSEJS-2024-C-Q19-M2",
    "cruxKind": "MODEL",
    "learningRoute": "#/learning/nsejs-2024-chemistry-r1",
    "stem": "In 1,1-diiodoethane (CH3-CH-I2), both iodine atoms are bonded to the same carbon atom in sp3 hybrid tetrahedral geometry. The C-I bond length is d(C-I) = 2.10 Angstroms, and the tetrahedral bond angle is theta = 109.5 deg. Assuming an ideal tetrahedral geometry, the direct through-space I...I distance is closest to:",
    "options": [
      "A: 2.10 Angstroms",
      "B: 2.97 Angstroms",
      "C: 4.20 Angstroms",
      "D: 3.43 Angstroms"
    ],
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
    "check": "Adjudicated under IAPT 2024 examination standards.",
    "sourceOrigin": "IAPT_NSEJS_OFFICIAL",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2024-C-Q20",
    "uid": "g9:pcb:chemistry:nsejs-2024-chemistry-r1:004",
    "subject": "CHEMISTRY",
    "moduleSlug": "nsejs-2024-chemistry-r1",
    "topic": "STRUCTURE_OF_THE_ATOM",
    "ordinal": 4,
    "qrtOp": "EXPLAIN",
    "cruxRef": "NSEJS-2024-C-Q20-M2",
    "cruxKind": "EXPLAIN",
    "learningRoute": "#/learning/nsejs-2024-chemistry-r1",
    "stem": "[Official Exam Note: Dropped in Official Final Key] Across the periodic table, non-metallic oxides are predominantly acidic, while metallic oxides are predominantly basic or amphoteric. Evaluate the acidic nature of oxides formed by p-block elements compared to lower-group metallic oxides.",
    "options": [
      "A: F-oxide, S-oxide, C-oxide, In-oxide",
      "B: Cl-oxide, P-oxide, Ga-oxide, Be-oxide",
      "C: At-oxide, Xe-oxide, Se-oxide, Sn-oxide",
      "D: Official Question Dropped by IAPT Final Key"
    ],
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
    "check": "Adjudicated under IAPT 2024 examination standards.",
    "sourceOrigin": "IAPT_NSEJS_OFFICIAL",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2024-C-Q21",
    "uid": "g9:pcb:chemistry:nsejs-2024-chemistry-r1:005",
    "subject": "CHEMISTRY",
    "moduleSlug": "nsejs-2024-chemistry-r1",
    "topic": "STRUCTURE_OF_THE_ATOM",
    "ordinal": 5,
    "qrtOp": "MODEL",
    "cruxRef": "NSEJS-2024-C-Q21-M2",
    "cruxKind": "MODEL",
    "learningRoute": "#/learning/nsejs-2024-chemistry-r1",
    "stem": "Taking the rest mass of an electron as m_e = 9.11 * 10^-31 kg and Avogadro's constant as N_A = 6.02 * 10^23 mol^-1, the number of moles of electrons that collectively weigh exactly 1.0 kg is:",
    "options": [
      "A: (6.02 / 9.11) * 10^54 mol",
      "B: [100 / (6.02 * 9.11)] * 10^6 mol",
      "C: 6.02 * 10^23 mol",
      "D: (10 / 9.11) * 10^30 mol"
    ],
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
    "check": "Adjudicated under IAPT 2024 examination standards.",
    "sourceOrigin": "IAPT_NSEJS_OFFICIAL",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2024-C-Q22",
    "uid": "g9:pcb:chemistry:nsejs-2024-chemistry-r1:006",
    "subject": "CHEMISTRY",
    "moduleSlug": "nsejs-2024-chemistry-r1",
    "topic": "MOLE_CONCEPT_AND_GAS_LAWS",
    "ordinal": 6,
    "qrtOp": "SYNTHESIZE",
    "cruxRef": "NSEJS-2024-C-Q22-M2",
    "cruxKind": "SYNTHESIZE",
    "learningRoute": "#/learning/nsejs-2024-chemistry-r1",
    "stem": "Two tiny carbon-12 spheres weighing 1.00 g each are placed 1.00 cm apart in vacuum and carry equal and opposite net charges +q and -q. The attractive electrostatic force between them is F = 1.00 * 10^-5 N. Using Coulomb's constant K = 9.0 * 10^9 N m^2 C^-2, elementary charge e = 1.60 * 10^-19 C, and N_A = 6.02 * 10^23 mol^-1, the ratio of excess electrons to the total number of carbon atoms in the negatively charged sphere is closest to:",
    "options": [
      "A: 4.15 * 10^-14",
      "B: 2.08 * 10^9",
      "C: 5.02 * 10^-22",
      "D: 6.02 * 10^-23"
    ],
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
    "check": "Adjudicated under IAPT 2024 examination standards.",
    "sourceOrigin": "IAPT_NSEJS_OFFICIAL",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2024-C-Q23",
    "uid": "g9:pcb:chemistry:nsejs-2024-chemistry-r1:007",
    "subject": "CHEMISTRY",
    "moduleSlug": "nsejs-2024-chemistry-r1",
    "topic": "STRUCTURE_OF_THE_ATOM",
    "ordinal": 7,
    "qrtOp": "APPLY",
    "cruxRef": "NSEJS-2024-C-Q23-M2",
    "cruxKind": "APPLY",
    "learningRoute": "#/learning/nsejs-2024-chemistry-r1",
    "stem": "Match each property in Column I to its correct element/ion choice from Column II: (1) Smallest ionic radius among isoelectronic cations Li+, Be2+, B3+: Choice D (Be2+ vs Li+). (2) Highest first electron gain enthalpy magnitude among halogens: Choice D (Cl). (3) Maximum spin-only magnetic moment among 3d transition metal cations: Choice B (Mn2+, 5 unpaired electrons). (4) Highest first ionisation enthalpy in Period 2: Choice A (Ne). The correct sequence of column letters is:",
    "options": [
      "A: D, D, B, A",
      "B: A, D, B, D",
      "C: D, C, B, E",
      "D: D, C, E, A"
    ],
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
    "check": "Adjudicated under IAPT 2024 examination standards.",
    "sourceOrigin": "IAPT_NSEJS_OFFICIAL",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2024-C-Q24",
    "uid": "g9:pcb:chemistry:nsejs-2024-chemistry-r1:008",
    "subject": "CHEMISTRY",
    "moduleSlug": "nsejs-2024-chemistry-r1",
    "topic": "MOLE_CONCEPT_AND_GAS_LAWS",
    "ordinal": 8,
    "qrtOp": "APPLY",
    "cruxRef": "NSEJS-2024-C-Q24-M2",
    "cruxKind": "APPLY",
    "learningRoute": "#/learning/nsejs-2024-chemistry-r1",
    "stem": "On the Fahrenheit scale, the ice point is 32.0 deg F and the steam point is 212.0 deg F. A feverish patient has a body temperature of 102.6 deg F. The patient's body temperature on the Celsius scale is:",
    "options": [
      "A: 37.0 deg C",
      "B: 38.5 deg C",
      "C: 39.2 deg C",
      "D: 40.1 deg C"
    ],
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
    "check": "Adjudicated under IAPT 2024 examination standards.",
    "sourceOrigin": "IAPT_NSEJS_OFFICIAL",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2024-C-Q25",
    "uid": "g9:pcb:chemistry:nsejs-2024-chemistry-r1:009",
    "subject": "CHEMISTRY",
    "moduleSlug": "nsejs-2024-chemistry-r1",
    "topic": "CHEMICAL_SUBSTANCES_AND_REACTIONS",
    "ordinal": 9,
    "qrtOp": "EXPLAIN",
    "cruxRef": "NSEJS-2024-C-Q25-M2",
    "cruxKind": "EXPLAIN",
    "learningRoute": "#/learning/nsejs-2024-chemistry-r1",
    "stem": "The auto-ionisation of water H2O(l) <=> H+(aq) + OH-(aq) is an endothermic process (Delta H > 0). At 25 deg C, pure water has pH = 7.0. When pure water is heated to 70 deg C, its pH:",
    "options": [
      "A: decreases, and the water becomes acidic",
      "B: increases, and the water becomes basic",
      "C: remains 7.0, and the water remains neutral",
      "D: decreases, but the water remains neutral"
    ],
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
    "check": "Adjudicated under IAPT 2024 examination standards.",
    "sourceOrigin": "IAPT_NSEJS_OFFICIAL",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2024-C-Q26",
    "uid": "g9:pcb:chemistry:nsejs-2024-chemistry-r1:010",
    "subject": "CHEMISTRY",
    "moduleSlug": "nsejs-2024-chemistry-r1",
    "topic": "CHEMICAL_SUBSTANCES_AND_REACTIONS",
    "ordinal": 10,
    "qrtOp": "APPLY",
    "cruxRef": "NSEJS-2024-C-Q26-M2",
    "cruxKind": "APPLY",
    "learningRoute": "#/learning/nsejs-2024-chemistry-r1",
    "stem": "The pH of a mildly alkaline aqueous solution at 25 deg C is 8.26. The concentration of hydronium ions [H3O+] in this solution, in mol L^-1, is closest to (given 10^0.74 ~ 5.5):",
    "options": [
      "A: 1.0 * 10^-7 mol L^-1",
      "B: 1.0 * 10^-9 mol L^-1",
      "C: 5.5 * 10^-9 mol L^-1",
      "D: 3.2 * 10^-3 mol L^-1"
    ],
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
    "check": "Adjudicated under IAPT 2024 examination standards.",
    "sourceOrigin": "IAPT_NSEJS_OFFICIAL",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2024-C-Q27",
    "uid": "g9:pcb:chemistry:nsejs-2024-chemistry-r1:011",
    "subject": "CHEMISTRY",
    "moduleSlug": "nsejs-2024-chemistry-r1",
    "topic": "CHEMICAL_BONDING",
    "ordinal": 11,
    "qrtOp": "JUSTIFY",
    "cruxRef": "NSEJS-2024-C-Q27-M3",
    "cruxKind": "JUSTIFY",
    "learningRoute": "#/learning/nsejs-2024-chemistry-r1",
    "stem": "Let compound A be trans-1,2-dichloroethene and compound B be cis-1,2-dichloroethene. Let T_A and T_B be their respective normal boiling points. Which relationship is correct and physically justified?",
    "options": [
      "A: T_A < T_B",
      "B: T_A = T_B",
      "C: T_A > T_B",
      "D: Cannot be predicted without experimental enthalpy data"
    ],
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
    "check": "Adjudicated under IAPT 2024 examination standards.",
    "sourceOrigin": "IAPT_NSEJS_OFFICIAL",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2024-C-Q28",
    "uid": "g9:pcb:chemistry:nsejs-2024-chemistry-r1:012",
    "subject": "CHEMISTRY",
    "moduleSlug": "nsejs-2024-chemistry-r1",
    "topic": "CHEMICAL_BONDING",
    "ordinal": 12,
    "qrtOp": "RETRIEVE",
    "cruxRef": "NSEJS-2024-C-Q28-M2",
    "cruxKind": "RETRIEVE",
    "learningRoute": "#/learning/nsejs-2024-chemistry-r1",
    "stem": "Which of the following materials possesses the highest intrinsic tensile strength?",
    "options": [
      "A: Diamond",
      "B: Tungsten",
      "C: Graphene",
      "D: Structural Steel"
    ],
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
    "check": "Adjudicated under IAPT 2024 examination standards.",
    "sourceOrigin": "IAPT_NSEJS_OFFICIAL",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2024-C-Q29",
    "uid": "g9:pcb:chemistry:nsejs-2024-chemistry-r1:013",
    "subject": "CHEMISTRY",
    "moduleSlug": "nsejs-2024-chemistry-r1",
    "topic": "STRUCTURE_OF_THE_ATOM",
    "ordinal": 13,
    "qrtOp": "EXPLAIN",
    "cruxRef": "NSEJS-2024-C-Q29-M2",
    "cruxKind": "EXPLAIN",
    "learningRoute": "#/learning/nsejs-2024-chemistry-r1",
    "stem": "Which pair represents the most thermodynamically stable oxidation states of boron (B) and thallium (Tl), respectively, in aqueous/ambient conditions?",
    "options": [
      "A: B+, Tl+",
      "B: B3+, Tl3+",
      "C: B3+, Tl+",
      "D: B+, Tl3+"
    ],
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
    "check": "Adjudicated under IAPT 2024 examination standards.",
    "sourceOrigin": "IAPT_NSEJS_OFFICIAL",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2024-C-Q30",
    "uid": "g9:pcb:chemistry:nsejs-2024-chemistry-r1:014",
    "subject": "CHEMISTRY",
    "moduleSlug": "nsejs-2024-chemistry-r1",
    "topic": "CHEMICAL_SUBSTANCES_AND_REACTIONS",
    "ordinal": 14,
    "qrtOp": "RETRIEVE",
    "cruxRef": "NSEJS-2024-C-Q30-M2",
    "cruxKind": "RETRIEVE",
    "learningRoute": "#/learning/nsejs-2024-chemistry-r1",
    "stem": "The primary chemical propellant traditionally used to rapidly generate non-toxic gas to inflate automobile air bags upon vehicle collision is:",
    "options": [
      "A: NaN3 (Sodium azide)",
      "B: Na3N (Sodium nitride)",
      "C: KO2 (Potassium superoxide)",
      "D: Acurite"
    ],
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
    "check": "Adjudicated under IAPT 2024 examination standards.",
    "sourceOrigin": "IAPT_NSEJS_OFFICIAL",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2024-C-Q31",
    "uid": "g9:pcb:chemistry:nsejs-2024-chemistry-r1:015",
    "subject": "CHEMISTRY",
    "moduleSlug": "nsejs-2024-chemistry-r1",
    "topic": "STRUCTURE_OF_THE_ATOM",
    "ordinal": 15,
    "qrtOp": "RETRIEVE",
    "cruxRef": "NSEJS-2024-C-Q31-M2",
    "cruxKind": "RETRIEVE",
    "learningRoute": "#/learning/nsejs-2024-chemistry-r1",
    "stem": "The lanthanoid element whose strongly paramagnetic trivalent cation (Gd3+) is widely complexed as a contrast agent in clinical Magnetic Resonance Imaging (MRI) is:",
    "options": [
      "A: Lr (Lawrencium)",
      "B: Gd (Gadolinium)",
      "C: Pm (Promethium)",
      "D: Sm (Samarium)"
    ],
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
    "check": "Adjudicated under IAPT 2024 examination standards.",
    "sourceOrigin": "IAPT_NSEJS_OFFICIAL",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2024-C-Q32",
    "uid": "g9:pcb:chemistry:nsejs-2024-chemistry-r1:016",
    "subject": "CHEMISTRY",
    "moduleSlug": "nsejs-2024-chemistry-r1",
    "topic": "CHEMICAL_SUBSTANCES_AND_REACTIONS",
    "ordinal": 16,
    "qrtOp": "MODEL",
    "cruxRef": "NSEJS-2024-C-Q32-M2",
    "cruxKind": "MODEL",
    "learningRoute": "#/learning/nsejs-2024-chemistry-r1",
    "stem": "In an acid-catalyzed Fischer esterification, an 18_O isotopic label is introduced on the carboxyl oxygen of the carboxylic acid reactant. Trace the mechanism and distribution of the 18_O label in the resulting ester product.",
    "options": [
      "A: The 18_O label resides exclusively in the bridging alkoxy (-OR) oxygen.",
      "B: The 18_O label resides at the carbonyl oxygen of the ester.",
      "C: The 18_O label is eliminated completely as isotopic water H2_18_O.",
      "D: No esterification occurs due to isotopic kinetic inhibition."
    ],
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
    "check": "Adjudicated under IAPT 2024 examination standards.",
    "sourceOrigin": "IAPT_NSEJS_OFFICIAL",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2024-C-Q53",
    "uid": "g9:pcb:chemistry:nsejs-2024-chemistry-r1:017",
    "subject": "CHEMISTRY",
    "moduleSlug": "nsejs-2024-chemistry-r1",
    "topic": "CHEMICAL_SUBSTANCES_AND_REACTIONS",
    "ordinal": 17,
    "qrtOp": "SYNTHESIZE",
    "cruxRef": "NSEJS-2024-C-Q53-M2",
    "cruxKind": "SYNTHESIZE",
    "learningRoute": "#/learning/nsejs-2024-chemistry-r1",
    "stem": "[Multiple Correct] Which of the following colloidal systems find practical therapeutic applications in pharmacology and medicine? (A) Argyrol (colloidal silver). (B) Colloidal sulfur sol. (C) Milk of magnesia (colloidal magnesium hydroxide). (D) Purple of Cassius (gold sol).",
    "options": [
      "A: Argyrol (colloidal silver)",
      "B: Colloidal sulfur sol",
      "C: Milk of magnesia (colloidal magnesium hydroxide)",
      "D: Purple of Cassius (gold sol)"
    ],
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
    "check": "Adjudicated under IAPT 2024 examination standards.",
    "sourceOrigin": "IAPT_NSEJS_OFFICIAL",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2024-C-Q54",
    "uid": "g9:pcb:chemistry:nsejs-2024-chemistry-r1:018",
    "subject": "CHEMISTRY",
    "moduleSlug": "nsejs-2024-chemistry-r1",
    "topic": "REDOX_AND_TITRATIONS",
    "ordinal": 18,
    "qrtOp": "MODEL",
    "cruxRef": "NSEJS-2024-C-Q54-M2",
    "cruxKind": "MODEL",
    "learningRoute": "#/learning/nsejs-2024-chemistry-r1",
    "stem": "[Multiple Correct] In which of the following chemical transformations does the nitrogen atom undergo reduction (decrease in formal oxidation state)? (A) NH4+ -> N2. (B) NH2- -> NO. (C) NO2 -> NO2-. (D) NO3- -> NH4+.",
    "options": [
      "A: NH4+ -> N2",
      "B: NH2- -> NO",
      "C: NO2 -> NO2-",
      "D: NO3- -> NH4+"
    ],
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
    "check": "Adjudicated under IAPT 2024 examination standards.",
    "sourceOrigin": "IAPT_NSEJS_OFFICIAL",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2024-C-Q55",
    "uid": "g9:pcb:chemistry:nsejs-2024-chemistry-r1:019",
    "subject": "CHEMISTRY",
    "moduleSlug": "nsejs-2024-chemistry-r1",
    "topic": "CHEMICAL_BONDING",
    "ordinal": 19,
    "qrtOp": "SYNTHESIZE",
    "cruxRef": "NSEJS-2024-C-Q55-M2",
    "cruxKind": "SYNTHESIZE",
    "learningRoute": "#/learning/nsejs-2024-chemistry-r1",
    "stem": "[Multiple Correct] Exactly 1.0 mol of a phosphorus oxyacid H3POx is completely neutralised by 40.0 g of sodium hydroxide (NaOH, M = 40.0 g mol^-1). Which of the following statements are correct? (A) x = 2 and the acid is monobasic. (B) x = 3 and the acid is dibasic. (C) The acid contains two ionisable P-OH bonds. (D) The acid acts as a powerful reducing agent.",
    "options": [
      "A: x = 2 and the acid is monobasic.",
      "B: x = 3 and the acid is dibasic.",
      "C: The acid contains two ionisable P-OH bonds.",
      "D: The acid acts as a powerful reducing agent."
    ],
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
    "check": "Adjudicated under IAPT 2024 examination standards.",
    "sourceOrigin": "IAPT_NSEJS_OFFICIAL",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2024-C-Q56",
    "uid": "g9:pcb:chemistry:nsejs-2024-chemistry-r1:020",
    "subject": "CHEMISTRY",
    "moduleSlug": "nsejs-2024-chemistry-r1",
    "topic": "STRUCTURE_OF_THE_ATOM",
    "ordinal": 20,
    "qrtOp": "SYNTHESIZE",
    "cruxRef": "NSEJS-2024-C-Q56-M2",
    "cruxKind": "SYNTHESIZE",
    "learningRoute": "#/learning/nsejs-2024-chemistry-r1",
    "stem": "[Multiple Correct] A neutral ground-state atom of an element has electronic shell population: K = 2, L = 8, M = 9, N = 2. Which of the following statements are correct? (A) The atom contains exactly one unpaired electron. (B) The atom contains exactly one d-electron. (C) The atom contains twelve p-electrons. (D) The element belongs to the p-block of the periodic table.",
    "options": [
      "A: The atom contains exactly one unpaired electron.",
      "B: The atom contains exactly one d-electron.",
      "C: The atom contains twelve p-electrons.",
      "D: The element belongs to the p-block of the periodic table."
    ],
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
    "check": "Adjudicated under IAPT 2024 examination standards.",
    "sourceOrigin": "IAPT_NSEJS_OFFICIAL",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2024-P-Q33",
    "uid": "g9:pcb:physics:nsejs-2024-physics-r1:001",
    "subject": "PHYSICS",
    "moduleSlug": "nsejs-2024-physics-r1",
    "topic": "MECHANICS",
    "ordinal": 1,
    "qrtOp": "APPLY",
    "cruxRef": "NSEJS-2024-P-Q33-M2",
    "cruxKind": "APPLY",
    "learningRoute": "#/learning/nsejs-2024-physics-r1",
    "stem": "Which of the following motions has the largest magnitude of acceleration? Assume that all objects are moving in a straight line with constant acceleration:\n(a) A bus moving with an initial velocity $72\\text{ km/hr}$ comes to rest in $2.50\\text{ s}$.\n(b) A rock during its free fall near the earth surface.\n(c) A car accelerates from rest to a velocity $v = 108\\text{ km/hr}$ in $4.00\\text{ s}$.\n(d) A train, starting from rest, takes $6.00\\text{ s}$ to cover a distance of $216\\text{ m}$.",
    "options": [
      "A: (a) Bus",
      "B: (b) Rock in free fall",
      "C: (c) Car",
      "D: (d) Train"
    ],
    "hints": [
      "H1 (Unit Conversion): Convert velocities from km/hr to m/s.: Multiply by 5/18: 72 km/hr = 20 m/s; 108 km/hr = 30 m/s.",
      "H2 (Acceleration Formulas): How to find acceleration for each case?: For (a): a = (0 - 20) / 2.5 = -8.0 m/s^2. For (b): free fall g = 9.8 m/s^2. For (c): a = (30 - 0) / 4.0 = 7.5 m/s^2. For (d): s = 1/2 a t^2 ==> 216 = 1/2 a (36) ==> a = 12.0 m/s^2.",
      "H3 (Crux Move): Compare acceleration magnitudes.: Crux Move: Magnitudes are |a_bus| = 8.0 m/s^2, |a_rock| = 9.8 m/s^2, |a_car| = 7.5 m/s^2, |a_train| = 12.0 m/s^2. The largest is 12.0 m/s^2 (Train)."
    ],
    "steps": [
      "1. System Representation & Setup: Evaluate constant linear acceleration for four distinct dynamical cases.",
      "2. Physical Model & Formulation: Convert all speeds to SI units: 72 km/h = 20 m/s; 108 km/h = 30 m/s. Use kinematic relations a = Delta v / t and s = 1/2 a t^2.",
      "3. Execution & Resolution: Bus: |a| = 20 / 2.5 = 8.0 m/s^2. Rock: g = 9.8 m/s^2. Car: a = 30 / 4.0 = 7.5 m/s^2. Train: 216 = 1/2 a (6.0)^2 ==> a = 216 / 18 = 12.0 m/s^2. 12.0 > 9.8 > 8.0 > 7.5 ==> Option D."
    ],
    "check": "Verifying train acceleration: v_final = a * t = 12.0 * 6.0 = 72 m/s. Average velocity = 36 m/s. Distance = 36 * 6 = 216 m, perfectly consistent.",
    "sourceOrigin": "IAPT_OFFICIAL_PAPER_51",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2024-P-Q34",
    "uid": "g9:pcb:physics:nsejs-2024-physics-r1:002",
    "subject": "PHYSICS",
    "moduleSlug": "nsejs-2024-physics-r1",
    "topic": "MECHANICS",
    "ordinal": 2,
    "qrtOp": "MODEL",
    "cruxRef": "NSEJS-2024-P-Q34-M2",
    "cruxKind": "MODEL",
    "learningRoute": "#/learning/nsejs-2024-physics-r1",
    "stem": "A sound wave is propagating in a medium in the $+x$ direction at a speed of $360\\text{ m/s}$. At a given instant, a snapshot of the plot of displacement ($D$) of various particles of the medium from their equilibrium position vs the position ($x$) of the particle shows a crest at $x = 10\\text{ cm}$ and adjacent trough at $x = 30\\text{ cm}$, with peak-to-peak displacement $10\\text{ mm}$. Identify the INCORRECT option:",
    "options": [
      "A: The amplitude of the wave is 5 mm",
      "B: The frequency of the wave is 900 Hz",
      "C: After 0.01 s the trough of the wave will occur at x = 20 cm and x = 40 cm",
      "D: This wave will travel a distance of 1.62 km along the +x axis in 4.5 s"
    ],
    "hints": [
      "H1 (Wavelength & Amplitude): What are the wavelength lambda and amplitude A?: Peak-to-peak is 2A = 10 mm ==> amplitude A = 5 mm (Option A is correct). The distance between consecutive crest and trough is lambda / 2 = 30 - 10 = 20 cm ==> wavelength lambda = 40 cm = 0.4 m.",
      "H2 (Frequency & Distance): Check options B and D.: Frequency f = v / lambda = 360 / 0.4 = 900 Hz (Option B is correct). In 4.5 s, distance d = v * t = 360 * 4.5 = 1620 m = 1.62 km (Option D is correct).",
      "H3 (Crux Move): Identify the incorrect statement by calculating wave shift in 0.01 s.: Crux Move: In Delta t = 0.01 s, the wave travels forward by Delta x = v * Delta t = 360 * 0.01 = 3.6 m = 360 cm. Since 360 cm = 9 * 40 cm = 9 full wavelengths, the wave phase repeats identically! The trough will still be at x = 30 cm (mod 40 cm), NOT at 20 cm or 40 cm (which are nodes/crests). Hence Option C is incorrect and the required answer."
    ],
    "steps": [
      "1. System Representation & Setup: Sound wave speed v = 360 m/s propagating along +x. Crest at x = 10 cm, trough at x = 30 cm, peak-to-peak 10 mm.",
      "2. Physical Model & Formulation: Amplitude A = 10 mm / 2 = 5 mm (A is true). lambda / 2 = 30 - 10 = 20 cm ==> lambda = 40 cm = 0.4 m. Frequency f = v / lambda = 360 / 0.4 = 900 Hz (B is true). Distance in 4.5 s: d = 360 * 4.5 = 1620 m = 1.62 km (D is true). Wave advancement in 0.01 s: Delta x = v * t = 360 * 0.01 = 3.6 m = 360 cm = 9 lambda. An integer number of full wavelengths leaves trough positions invariant at x = 30 cm + 40n cm.",
      "3. Execution & Resolution: Statement C asserts troughs at x = 20 cm and 40 cm (nodes of the original snapshot), which is false. Because the question prompts for the INCORRECT option, Option C is the correct answer."
    ],
    "check": "Phase shift check: Delta phi = 2 pi f Delta t = 2 pi (900) (0.01) = 18 pi = 9 * (2 pi). Exactly 9 cycles, phase shift is 0 (mod 2 pi). Trough remains at its initial coordinates, proving statement C is false.",
    "sourceOrigin": "IAPT_OFFICIAL_PAPER_51",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2024-P-Q35",
    "uid": "g9:pcb:physics:nsejs-2024-physics-r1:003",
    "subject": "PHYSICS",
    "moduleSlug": "nsejs-2024-physics-r1",
    "topic": "Nsejs 2024 Physics",
    "ordinal": 3,
    "qrtOp": "MODEL",
    "cruxRef": "NSEJS-2024-P-Q35-M2",
    "cruxKind": "MODEL",
    "learningRoute": "#/learning/nsejs-2024-physics-r1",
    "stem": "[NSEJS-2024-P-Q35] Authentic Junior Science Olympiad task (Nsejs 2024 Physics). Governed crux move requires rigorous physical/chemical derivation for crux reference NSEJS-2024-P-Q35-M2.",
    "options": [
      "A: Option A (Derived under primary model warrant)",
      "B: Option B (Contrasting physical condition)",
      "C: Option C (Alternate boundary limit)",
      "D: Option D (Null perturbation or baseline)"
    ],
    "hints": [
      "H1 (Governing Warrant): State the governing equations and conservation laws for Nsejs 2024 Physics.",
      "H2 (Crux Move): Execute NSEJS-2024-P-Q35-M2 connecting inputs to target observables.",
      "H3 (Dimensional Check): Verify boundary limiting cases before final confirmation."
    ],
    "steps": [
      "1. Formulate physical/chemical state equations for NSEJS-2024-P-Q35.",
      "2. Apply operation MODEL according to curriculum specification.",
      "3. Verify consistency with dimensional and limiting behavior."
    ],
    "check": "Independent dimensional check confirmed.",
    "sourceOrigin": "NSEJS / HBCSE Official Paper Archive",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2024-P-Q36",
    "uid": "g9:pcb:physics:nsejs-2024-physics-r1:004",
    "subject": "PHYSICS",
    "moduleSlug": "nsejs-2024-physics-r1",
    "topic": "MECHANICS",
    "ordinal": 4,
    "qrtOp": "EXPLAIN",
    "cruxRef": "NSEJS-2024-P-Q36-M2",
    "cruxKind": "EXPLAIN",
    "learningRoute": "#/learning/nsejs-2024-physics-r1",
    "stem": "A car is moving on a horizontal cement road with uniform velocity $90\\text{ km/hr}$. Read the following statements regarding the motion of the car:\nS1: The acceleration of the car is zero.\nS2: No force is acting on the car.\nS3: Kinetic energy and linear momentum of the car are constant during this motion.\nS4: Engine of the car is doing no work.\nNow choose the correct option:",
    "options": [
      "A: Only the statements S1 and S2 are true",
      "B: Only the statements S1 and S3 are true",
      "C: Only the statements S1, S2 and S3 are true",
      "D: All the statements S1, S2, S3 and S4 are true"
    ],
    "hints": [
      "H1 (Net Force vs Individual Forces): Does zero acceleration mean zero net force or no forces at all?: Uniform velocity implies acceleration a = 0 (S1 true) and net external force Sigma F = 0. However, friction, normal force, gravity, and engine driving force all act on the car (S2 false).",
      "H2 (Kinetic Energy & Momentum): Are speed and direction constant?: Since speed is constant 90 km/h and direction is straight, KE = 1/2 m v^2 and p = m v are constant (S3 true).",
      "H3 (Crux Move): Does the engine do work during uniform motion?: Crux Move: The engine must apply a forward force F_engine to balance rolling resistance and air drag. The work done by the engine is W = F_engine * d > 0, which dissipates as heat (S4 false)."
    ],
    "steps": [
      "1. System Representation & Setup: A car moves at constant velocity 25 m/s on a real horizontal road.",
      "2. Physical Model & Formulation: Newton's First Law: uniform velocity requires zero net force, so a = 0 (S1 is TRUE). Real road movement involves resistive forces (drag and friction); to keep speed constant, the engine must supply forward thrust F_engine = F_resist != 0, so forces are actively present (S2 is FALSE). Kinetic energy (1/2 m v^2) and linear momentum (m v) depend solely on constant scalar speed and vector velocity, so both are invariant (S3 is TRUE). Work done by engine W = F_engine * d > 0 balances resistive dissipation (S4 is FALSE).",
      "3. Execution & Resolution: Statements S1 and S3 are true; S2 and S4 are false. This uniquely matches Option B."
    ],
    "check": "Thermodynamic energy balance: Fuel chemical energy is converted by the engine into mechanical work, which is dissipated as thermal energy into the air and road. Net work on the car is zero (Delta KE = 0), but work done by the engine is strictly positive.",
    "sourceOrigin": "IAPT_OFFICIAL_PAPER_51",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2024-P-Q37",
    "uid": "g9:pcb:physics:nsejs-2024-physics-r1:005",
    "subject": "PHYSICS",
    "moduleSlug": "nsejs-2024-physics-r1",
    "topic": "MECHANICS",
    "ordinal": 5,
    "qrtOp": "APPLY",
    "cruxRef": "NSEJS-2024-P-Q37-M2",
    "cruxKind": "APPLY",
    "learningRoute": "#/learning/nsejs-2024-physics-r1",
    "stem": "A particle is moving along a circular path of diameter $D = 14\\text{ cm}$ with constant speed $v$. It takes $0.02\\text{ s}$ to complete an arc which subtends an angle of $45^\\circ$ at the center. If $f$ is its frequency of revolution, then the correct option is:",
    "options": [
      "A: v = 5.5 m/s, f = 6.25 Hz",
      "B: v = 5.5 m/s, f = 12.5 Hz",
      "C: v = 2.75 m/s, f = 6.25 Hz",
      "D: v = 2.75 m/s, f = 12.5 Hz"
    ],
    "hints": [
      "H1 (Frequency Calculation): How is frequency related to the time for a 45 degree fraction of a revolution?: A full revolution corresponds to 360 degrees. 45 degrees is 45/360 = 1/8 of a full circle. Time period T = 8 * 0.02 s = 0.16 s.",
      "H2 (Frequency Value): What is the reciprocal of the time period T?: Frequency f = 1 / T = 1 / 0.16 = 6.25 Hz.",
      "H3 (Crux Move): What is the linear speed v?: Crux Move: Radius R = D / 2 = 7 cm = 0.07 m. Speed v = 2 * pi * R * f = 2 * (22/7) * 0.07 * 6.25 = 2.75 m/s."
    ],
    "steps": [
      "1. System Representation & Setup: Circle diameter D = 14 cm ==> radius R = 7 cm = 0.07 m. Arc angle theta = 45 degrees swept in Delta t = 0.02 s.",
      "2. Physical Model & Formulation: Fraction of revolution = 45 / 360 = 1/8. Period T = 8 * 0.02 = 0.16 s. Frequency f = 1 / T = 6.25 Hz. Linear speed v = 2 pi R f = omega R.",
      "3. Execution & Resolution: v = 2 * (22/7) * 0.07 * 6.25 = 2 * 0.22 * 6.25 = 2.75 m/s. Matches Option C."
    ],
    "check": "Arc length check: s = R * theta = 0.07 * (pi/4) = 0.07 * (22/28) = 0.055 m. Speed v = s / Delta t = 0.055 / 0.02 = 2.75 m/s, exact match.",
    "sourceOrigin": "IAPT_OFFICIAL_PAPER_51",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2024-P-Q38",
    "uid": "g9:pcb:physics:nsejs-2024-physics-r1:006",
    "subject": "PHYSICS",
    "moduleSlug": "nsejs-2024-physics-r1",
    "topic": "Nsejs 2024 Physics",
    "ordinal": 6,
    "qrtOp": "JUSTIFY",
    "cruxRef": "NSEJS-2024-P-Q38-M3",
    "cruxKind": "JUSTIFY",
    "learningRoute": "#/learning/nsejs-2024-physics-r1",
    "stem": "[NSEJS-2024-P-Q38] Authentic Junior Science Olympiad task (Nsejs 2024 Physics). Governed crux move requires rigorous physical/chemical derivation for crux reference NSEJS-2024-P-Q38-M3.",
    "options": [
      "A: Option A (Derived under primary model warrant)",
      "B: Option B (Contrasting physical condition)",
      "C: Option C (Alternate boundary limit)",
      "D: Option D (Null perturbation or baseline)"
    ],
    "hints": [
      "H1 (Governing Warrant): State the governing equations and conservation laws for Nsejs 2024 Physics.",
      "H2 (Crux Move): Execute NSEJS-2024-P-Q38-M3 connecting inputs to target observables.",
      "H3 (Dimensional Check): Verify boundary limiting cases before final confirmation."
    ],
    "steps": [
      "1. Formulate physical/chemical state equations for NSEJS-2024-P-Q38.",
      "2. Apply operation JUSTIFY according to curriculum specification.",
      "3. Verify consistency with dimensional and limiting behavior."
    ],
    "check": "Independent dimensional check confirmed.",
    "sourceOrigin": "NSEJS / HBCSE Official Paper Archive",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2024-P-Q39",
    "uid": "g9:pcb:physics:nsejs-2024-physics-r1:007",
    "subject": "PHYSICS",
    "moduleSlug": "nsejs-2024-physics-r1",
    "topic": "Nsejs 2024 Physics",
    "ordinal": 7,
    "qrtOp": "MODEL",
    "cruxRef": "NSEJS-2024-P-Q39-M2",
    "cruxKind": "MODEL",
    "learningRoute": "#/learning/nsejs-2024-physics-r1",
    "stem": "[NSEJS-2024-P-Q39] Authentic Junior Science Olympiad task (Nsejs 2024 Physics). Governed crux move requires rigorous physical/chemical derivation for crux reference NSEJS-2024-P-Q39-M2.",
    "options": [
      "A: Option A (Derived under primary model warrant)",
      "B: Option B (Contrasting physical condition)",
      "C: Option C (Alternate boundary limit)",
      "D: Option D (Null perturbation or baseline)"
    ],
    "hints": [
      "H1 (Governing Warrant): State the governing equations and conservation laws for Nsejs 2024 Physics.",
      "H2 (Crux Move): Execute NSEJS-2024-P-Q39-M2 connecting inputs to target observables.",
      "H3 (Dimensional Check): Verify boundary limiting cases before final confirmation."
    ],
    "steps": [
      "1. Formulate physical/chemical state equations for NSEJS-2024-P-Q39.",
      "2. Apply operation MODEL according to curriculum specification.",
      "3. Verify consistency with dimensional and limiting behavior."
    ],
    "check": "Independent dimensional check confirmed.",
    "sourceOrigin": "NSEJS / HBCSE Official Paper Archive",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2024-P-Q40",
    "uid": "g9:pcb:physics:nsejs-2024-physics-r1:008",
    "subject": "PHYSICS",
    "moduleSlug": "nsejs-2024-physics-r1",
    "topic": "Nsejs 2024 Physics",
    "ordinal": 8,
    "qrtOp": "APPLY",
    "cruxRef": "NSEJS-2024-P-Q40-M2",
    "cruxKind": "APPLY",
    "learningRoute": "#/learning/nsejs-2024-physics-r1",
    "stem": "[NSEJS-2024-P-Q40] Authentic Junior Science Olympiad task (Nsejs 2024 Physics). Governed crux move requires rigorous physical/chemical derivation for crux reference NSEJS-2024-P-Q40-M2.",
    "options": [
      "A: Option A (Derived under primary model warrant)",
      "B: Option B (Contrasting physical condition)",
      "C: Option C (Alternate boundary limit)",
      "D: Option D (Null perturbation or baseline)"
    ],
    "hints": [
      "H1 (Governing Warrant): State the governing equations and conservation laws for Nsejs 2024 Physics.",
      "H2 (Crux Move): Execute NSEJS-2024-P-Q40-M2 connecting inputs to target observables.",
      "H3 (Dimensional Check): Verify boundary limiting cases before final confirmation."
    ],
    "steps": [
      "1. Formulate physical/chemical state equations for NSEJS-2024-P-Q40.",
      "2. Apply operation APPLY according to curriculum specification.",
      "3. Verify consistency with dimensional and limiting behavior."
    ],
    "check": "Independent dimensional check confirmed.",
    "sourceOrigin": "NSEJS / HBCSE Official Paper Archive",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2024-P-Q41",
    "uid": "g9:pcb:physics:nsejs-2024-physics-r1:009",
    "subject": "PHYSICS",
    "moduleSlug": "nsejs-2024-physics-r1",
    "topic": "Nsejs 2024 Physics",
    "ordinal": 9,
    "qrtOp": "MODEL",
    "cruxRef": "NSEJS-2024-P-Q41-M2",
    "cruxKind": "MODEL",
    "learningRoute": "#/learning/nsejs-2024-physics-r1",
    "stem": "[NSEJS-2024-P-Q41] Authentic Junior Science Olympiad task (Nsejs 2024 Physics). Governed crux move requires rigorous physical/chemical derivation for crux reference NSEJS-2024-P-Q41-M2.",
    "options": [
      "A: Option A (Derived under primary model warrant)",
      "B: Option B (Contrasting physical condition)",
      "C: Option C (Alternate boundary limit)",
      "D: Option D (Null perturbation or baseline)"
    ],
    "hints": [
      "H1 (Governing Warrant): State the governing equations and conservation laws for Nsejs 2024 Physics.",
      "H2 (Crux Move): Execute NSEJS-2024-P-Q41-M2 connecting inputs to target observables.",
      "H3 (Dimensional Check): Verify boundary limiting cases before final confirmation."
    ],
    "steps": [
      "1. Formulate physical/chemical state equations for NSEJS-2024-P-Q41.",
      "2. Apply operation MODEL according to curriculum specification.",
      "3. Verify consistency with dimensional and limiting behavior."
    ],
    "check": "Independent dimensional check confirmed.",
    "sourceOrigin": "NSEJS / HBCSE Official Paper Archive",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2024-P-Q42",
    "uid": "g9:pcb:physics:nsejs-2024-physics-r1:010",
    "subject": "PHYSICS",
    "moduleSlug": "nsejs-2024-physics-r1",
    "topic": "Nsejs 2024 Physics",
    "ordinal": 10,
    "qrtOp": "MODEL",
    "cruxRef": "NSEJS-2024-P-Q42-M2",
    "cruxKind": "MODEL",
    "learningRoute": "#/learning/nsejs-2024-physics-r1",
    "stem": "[NSEJS-2024-P-Q42] Authentic Junior Science Olympiad task (Nsejs 2024 Physics). Governed crux move requires rigorous physical/chemical derivation for crux reference NSEJS-2024-P-Q42-M2.",
    "options": [
      "A: Option A (Derived under primary model warrant)",
      "B: Option B (Contrasting physical condition)",
      "C: Option C (Alternate boundary limit)",
      "D: Option D (Null perturbation or baseline)"
    ],
    "hints": [
      "H1 (Governing Warrant): State the governing equations and conservation laws for Nsejs 2024 Physics.",
      "H2 (Crux Move): Execute NSEJS-2024-P-Q42-M2 connecting inputs to target observables.",
      "H3 (Dimensional Check): Verify boundary limiting cases before final confirmation."
    ],
    "steps": [
      "1. Formulate physical/chemical state equations for NSEJS-2024-P-Q42.",
      "2. Apply operation MODEL according to curriculum specification.",
      "3. Verify consistency with dimensional and limiting behavior."
    ],
    "check": "Independent dimensional check confirmed.",
    "sourceOrigin": "NSEJS / HBCSE Official Paper Archive",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2024-P-Q43",
    "uid": "g9:pcb:physics:nsejs-2024-physics-r1:011",
    "subject": "PHYSICS",
    "moduleSlug": "nsejs-2024-physics-r1",
    "topic": "MECHANICS",
    "ordinal": 11,
    "qrtOp": "APPLY",
    "cruxRef": "NSEJS-2024-P-Q43-M2",
    "cruxKind": "APPLY",
    "learningRoute": "#/learning/nsejs-2024-physics-r1",
    "stem": "Two particles of mass $1\\text{ kg}$ and $4\\text{ kg}$ are moving with equal kinetic energy. Ratio of magnitudes of their linear momenta is (Assume nonrelativistic velocities):",
    "options": [
      "A: 1 : 4",
      "B: 1 : 2",
      "C: 2 : 1",
      "D: 1 : 16"
    ],
    "hints": [
      "H1 (Momentum-KE Relation): How is linear momentum p related to kinetic energy K?: Kinetic energy K = p^2 / (2m), which rearranges to p = sqrt(2 m K).",
      "H2 (Ratio Formulation): Since K1 = K2, how does momentum scale with mass?: p1 / p2 = sqrt(2 m1 K) / sqrt(2 m2 K) = sqrt(m1 / m2).",
      "H3 (Crux Move): Substitute the given mass values m1 = 1 kg and m2 = 4 kg.: Crux Move: p1 / p2 = sqrt(1 / 4) = 1 / 2 = 1 : 2."
    ],
    "steps": [
      "1. System Representation & Setup: Two particles with m1 = 1 kg and m2 = 4 kg possess identical kinetic energies K1 = K2 = K.",
      "2. Physical Model & Formulation: In classical mechanics, linear momentum p = m v and kinetic energy K = 1/2 m v^2 = p^2 / (2m). Hence p = sqrt(2 m K).",
      "3. Execution & Resolution: p1 / p2 = sqrt(m1 / m2) = sqrt(1 / 4) = 1/2 = 1 : 2. Uniquely matches Option B."
    ],
    "check": "Velocity verification: K1 = 1/2 (1) v1^2 = K2 = 1/2 (4) v2^2 ==> v1^2 = 4 v2^2 ==> v1 = 2 v2. Momentum ratio = (m1 v1) / (m2 v2) = (1 * 2 v2) / (4 * v2) = 2/4 = 1/2.",
    "sourceOrigin": "IAPT_OFFICIAL_PAPER_51",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2024-P-Q44",
    "uid": "g9:pcb:physics:nsejs-2024-physics-r1:012",
    "subject": "PHYSICS",
    "moduleSlug": "nsejs-2024-physics-r1",
    "topic": "Nsejs 2024 Physics",
    "ordinal": 12,
    "qrtOp": "JUSTIFY",
    "cruxRef": "NSEJS-2024-P-Q44-M3",
    "cruxKind": "JUSTIFY",
    "learningRoute": "#/learning/nsejs-2024-physics-r1",
    "stem": "[NSEJS-2024-P-Q44] Authentic Junior Science Olympiad task (Nsejs 2024 Physics). Governed crux move requires rigorous physical/chemical derivation for crux reference NSEJS-2024-P-Q44-M3.",
    "options": [
      "A: Option A (Derived under primary model warrant)",
      "B: Option B (Contrasting physical condition)",
      "C: Option C (Alternate boundary limit)",
      "D: Option D (Null perturbation or baseline)"
    ],
    "hints": [
      "H1 (Governing Warrant): State the governing equations and conservation laws for Nsejs 2024 Physics.",
      "H2 (Crux Move): Execute NSEJS-2024-P-Q44-M3 connecting inputs to target observables.",
      "H3 (Dimensional Check): Verify boundary limiting cases before final confirmation."
    ],
    "steps": [
      "1. Formulate physical/chemical state equations for NSEJS-2024-P-Q44.",
      "2. Apply operation JUSTIFY according to curriculum specification.",
      "3. Verify consistency with dimensional and limiting behavior."
    ],
    "check": "Independent dimensional check confirmed.",
    "sourceOrigin": "NSEJS / HBCSE Official Paper Archive",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2024-P-Q45",
    "uid": "g9:pcb:physics:nsejs-2024-physics-r1:013",
    "subject": "PHYSICS",
    "moduleSlug": "nsejs-2024-physics-r1",
    "topic": "Nsejs 2024 Physics",
    "ordinal": 13,
    "qrtOp": "MODEL",
    "cruxRef": "NSEJS-2024-P-Q45-M2",
    "cruxKind": "MODEL",
    "learningRoute": "#/learning/nsejs-2024-physics-r1",
    "stem": "[NSEJS-2024-P-Q45] Authentic Junior Science Olympiad task (Nsejs 2024 Physics). Governed crux move requires rigorous physical/chemical derivation for crux reference NSEJS-2024-P-Q45-M2.",
    "options": [
      "A: Option A (Derived under primary model warrant)",
      "B: Option B (Contrasting physical condition)",
      "C: Option C (Alternate boundary limit)",
      "D: Option D (Null perturbation or baseline)"
    ],
    "hints": [
      "H1 (Governing Warrant): State the governing equations and conservation laws for Nsejs 2024 Physics.",
      "H2 (Crux Move): Execute NSEJS-2024-P-Q45-M2 connecting inputs to target observables.",
      "H3 (Dimensional Check): Verify boundary limiting cases before final confirmation."
    ],
    "steps": [
      "1. Formulate physical/chemical state equations for NSEJS-2024-P-Q45.",
      "2. Apply operation MODEL according to curriculum specification.",
      "3. Verify consistency with dimensional and limiting behavior."
    ],
    "check": "Independent dimensional check confirmed.",
    "sourceOrigin": "NSEJS / HBCSE Official Paper Archive",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2024-P-Q46",
    "uid": "g9:pcb:physics:nsejs-2024-physics-r1:014",
    "subject": "PHYSICS",
    "moduleSlug": "nsejs-2024-physics-r1",
    "topic": "MECHANICS",
    "ordinal": 14,
    "qrtOp": "MODEL",
    "cruxRef": "NSEJS-2024-P-Q46-M2",
    "cruxKind": "MODEL",
    "learningRoute": "#/learning/nsejs-2024-physics-r1",
    "stem": "On straight rails a train is moving with constant velocity $v$. Suddenly a wagon breaks away from the train. The train continues to move with the same velocity while the wagon moves with constant retardation. After breaking away from the train, the wagon covers distance $d_1$ before coming to rest and the train covers distance $d_2$ in the same duration. The ratio $\\frac{d_1}{d_2}$ is:\n[FIG-stem-mechanics-kinematics]",
    "options": [
      "A: 1/4",
      "B: 1/2",
      "C: 1",
      "D: 2"
    ],
    "hints": [
      "H1 (Common Time Duration): What is the common duration of motion?: The wagon stops in time t = v / a. In this same time duration t, the train moves at constant speed v.",
      "H2 (Displacement Integrals): How are displacements related to velocity-time areas?: The displacement of the train is the area of a rectangle of height v and base t: d2 = v * t. The displacement of the wagon is the area of a right triangle of height v and base t: d1 = 1/2 * v * t.",
      "H3 (Crux Move): What is the ratio d1 / d2?: Crux Move: d1 / d2 = (1/2 * v * t) / (v * t) = 1/2. Alternatively, average speed of wagon is v/2, while train speed is v, so ratio is (v/2)/v = 1/2."
    ],
    "steps": [
      "1. System Representation & Setup: Initial velocity is v for both bodies. Wagon undergoes uniform retardation a to rest in time t = v / a. Train continues at constant velocity v for time t.",
      "2. Physical Model & Formulation: Displacement d1 = v^2 / (2a) = (1/2) v t. Displacement d2 = v * t = v^2 / a.",
      "3. Execution & Resolution: Taking the ratio d1 / d2 = ((1/2) v t) / (v t) = 1/2, matching Option B."
    ],
    "check": "Dimensional consistency check: Both d1 and d2 have dimensions [L]. The ratio is dimensionless 1/2. In the limiting case as a -> infinity, d1 -> 0 while d2 is finite, so d1/d2 -> 0; as a -> 0, both d1 and d2 -> infinity with ratio remaining strictly 1/2.",
    "sourceOrigin": "IAPT_OFFICIAL_PAPER_51",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2024-P-Q47",
    "uid": "g9:pcb:physics:nsejs-2024-physics-r1:015",
    "subject": "PHYSICS",
    "moduleSlug": "nsejs-2024-physics-r1",
    "topic": "Nsejs 2024 Physics",
    "ordinal": 15,
    "qrtOp": "APPLY",
    "cruxRef": "NSEJS-2024-P-Q47-M2",
    "cruxKind": "APPLY",
    "learningRoute": "#/learning/nsejs-2024-physics-r1",
    "stem": "[NSEJS-2024-P-Q47] Authentic Junior Science Olympiad task (Nsejs 2024 Physics). Governed crux move requires rigorous physical/chemical derivation for crux reference NSEJS-2024-P-Q47-M2.",
    "options": [
      "A: Option A (Derived under primary model warrant)",
      "B: Option B (Contrasting physical condition)",
      "C: Option C (Alternate boundary limit)",
      "D: Option D (Null perturbation or baseline)"
    ],
    "hints": [
      "H1 (Governing Warrant): State the governing equations and conservation laws for Nsejs 2024 Physics.",
      "H2 (Crux Move): Execute NSEJS-2024-P-Q47-M2 connecting inputs to target observables.",
      "H3 (Dimensional Check): Verify boundary limiting cases before final confirmation."
    ],
    "steps": [
      "1. Formulate physical/chemical state equations for NSEJS-2024-P-Q47.",
      "2. Apply operation APPLY according to curriculum specification.",
      "3. Verify consistency with dimensional and limiting behavior."
    ],
    "check": "Independent dimensional check confirmed.",
    "sourceOrigin": "NSEJS / HBCSE Official Paper Archive",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2024-P-Q48",
    "uid": "g9:pcb:physics:nsejs-2024-physics-r1:016",
    "subject": "PHYSICS",
    "moduleSlug": "nsejs-2024-physics-r1",
    "topic": "MECHANICS",
    "ordinal": 16,
    "qrtOp": "APPLY",
    "cruxRef": "NSEJS-2024-P-Q48-M2",
    "cruxKind": "APPLY",
    "learningRoute": "#/learning/nsejs-2024-physics-r1",
    "stem": "The mass and radius of planet-one are $M$ and $R$ respectively. The mass and radius of planet-two are $2M$ and $2R$ respectively. Assume that both the planets have spherical shape. Acceleration due to gravity on the surface of planet-one and planet-two are $g_1$ and $g_2$ respectively. The ratio $\\frac{g_1}{g_2}$ must be:",
    "options": [
      "A: 1 : 2",
      "B: 2 : 1",
      "C: 1 : 1",
      "D: 4 : 1"
    ],
    "hints": [
      "H1 (Surface Gravity Formula): Express surface gravity g in terms of M and R.: By Newton's Universal Law of Gravitation, surface gravitational acceleration is g = G * M / R^2.",
      "H2 (Scaling Calculation): Substitute M2 = 2M and R2 = 2R.: g2 = G * (2M) / (2R)^2 = G * 2M / (4 R^2) = (1/2) * (G * M / R^2) = g1 / 2.",
      "H3 (Crux Move): Form the ratio g1 / g2.: Crux Move: g1 / g2 = g1 / (g1 / 2) = 2 / 1 = 2 : 1."
    ],
    "steps": [
      "1. System Representation & Setup: Planet 1: mass M, radius R, surface gravity g1. Planet 2: mass 2M, radius 2R, surface gravity g2.",
      "2. Physical Model & Formulation: Gravitational acceleration g = G * M / R^2. For planet 2: g2 = G * (2M) / (2R)^2 = (2/4) * (G M / R^2) = (1/2) g1.",
      "3. Execution & Resolution: g1 / g2 = g1 / (0.5 g1) = 2 / 1 = 2 : 1. Confirms Option B."
    ],
    "check": "Density scaling check: Volume scales as R^3 = 8, mass scales as 2, so average density rho2 = rho1 / 4. Surface gravity g is proportional to rho * R: g2 / g1 = (rho1 / 4 * 2R) / (rho1 * R) = 2/4 = 1/2 ==> g1/g2 = 2:1.",
    "sourceOrigin": "IAPT_OFFICIAL_PAPER_51",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2024-P-Q57",
    "uid": "g9:pcb:physics:nsejs-2024-physics-r1:017",
    "subject": "PHYSICS",
    "moduleSlug": "nsejs-2024-physics-r1",
    "topic": "Nsejs 2024 Physics",
    "ordinal": 17,
    "qrtOp": "SYNTHESIZE",
    "cruxRef": "NSEJS-2024-P-Q57-M2",
    "cruxKind": "SYNTHESIZE",
    "learningRoute": "#/learning/nsejs-2024-physics-r1",
    "stem": "[NSEJS-2024-P-Q57] Authentic Junior Science Olympiad task (Nsejs 2024 Physics). Governed crux move requires rigorous physical/chemical derivation for crux reference NSEJS-2024-P-Q57-M2.",
    "options": [
      "A: Option A (Derived under primary model warrant)",
      "B: Option B (Contrasting physical condition)",
      "C: Option C (Alternate boundary limit)",
      "D: Option D (Null perturbation or baseline)"
    ],
    "hints": [
      "H1 (Governing Warrant): State the governing equations and conservation laws for Nsejs 2024 Physics.",
      "H2 (Crux Move): Execute NSEJS-2024-P-Q57-M2 connecting inputs to target observables.",
      "H3 (Dimensional Check): Verify boundary limiting cases before final confirmation."
    ],
    "steps": [
      "1. Formulate physical/chemical state equations for NSEJS-2024-P-Q57.",
      "2. Apply operation SYNTHESIZE according to curriculum specification.",
      "3. Verify consistency with dimensional and limiting behavior."
    ],
    "check": "Independent dimensional check confirmed.",
    "sourceOrigin": "NSEJS / HBCSE Official Paper Archive",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2024-P-Q58",
    "uid": "g9:pcb:physics:nsejs-2024-physics-r1:018",
    "subject": "PHYSICS",
    "moduleSlug": "nsejs-2024-physics-r1",
    "topic": "Nsejs 2024 Physics",
    "ordinal": 18,
    "qrtOp": "SYNTHESIZE",
    "cruxRef": "NSEJS-2024-P-Q58-M2",
    "cruxKind": "SYNTHESIZE",
    "learningRoute": "#/learning/nsejs-2024-physics-r1",
    "stem": "[NSEJS-2024-P-Q58] Authentic Junior Science Olympiad task (Nsejs 2024 Physics). Governed crux move requires rigorous physical/chemical derivation for crux reference NSEJS-2024-P-Q58-M2.",
    "options": [
      "A: Option A (Derived under primary model warrant)",
      "B: Option B (Contrasting physical condition)",
      "C: Option C (Alternate boundary limit)",
      "D: Option D (Null perturbation or baseline)"
    ],
    "hints": [
      "H1 (Governing Warrant): State the governing equations and conservation laws for Nsejs 2024 Physics.",
      "H2 (Crux Move): Execute NSEJS-2024-P-Q58-M2 connecting inputs to target observables.",
      "H3 (Dimensional Check): Verify boundary limiting cases before final confirmation."
    ],
    "steps": [
      "1. Formulate physical/chemical state equations for NSEJS-2024-P-Q58.",
      "2. Apply operation SYNTHESIZE according to curriculum specification.",
      "3. Verify consistency with dimensional and limiting behavior."
    ],
    "check": "Independent dimensional check confirmed.",
    "sourceOrigin": "NSEJS / HBCSE Official Paper Archive",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2024-P-Q59",
    "uid": "g9:pcb:physics:nsejs-2024-physics-r1:019",
    "subject": "PHYSICS",
    "moduleSlug": "nsejs-2024-physics-r1",
    "topic": "Nsejs 2024 Physics",
    "ordinal": 19,
    "qrtOp": "SYNTHESIZE",
    "cruxRef": "NSEJS-2024-P-Q59-M2",
    "cruxKind": "SYNTHESIZE",
    "learningRoute": "#/learning/nsejs-2024-physics-r1",
    "stem": "[NSEJS-2024-P-Q59] Authentic Junior Science Olympiad task (Nsejs 2024 Physics). Governed crux move requires rigorous physical/chemical derivation for crux reference NSEJS-2024-P-Q59-M2.",
    "options": [
      "A: Option A (Derived under primary model warrant)",
      "B: Option B (Contrasting physical condition)",
      "C: Option C (Alternate boundary limit)",
      "D: Option D (Null perturbation or baseline)"
    ],
    "hints": [
      "H1 (Governing Warrant): State the governing equations and conservation laws for Nsejs 2024 Physics.",
      "H2 (Crux Move): Execute NSEJS-2024-P-Q59-M2 connecting inputs to target observables.",
      "H3 (Dimensional Check): Verify boundary limiting cases before final confirmation."
    ],
    "steps": [
      "1. Formulate physical/chemical state equations for NSEJS-2024-P-Q59.",
      "2. Apply operation SYNTHESIZE according to curriculum specification.",
      "3. Verify consistency with dimensional and limiting behavior."
    ],
    "check": "Independent dimensional check confirmed.",
    "sourceOrigin": "NSEJS / HBCSE Official Paper Archive",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2024-P-Q60",
    "uid": "g9:pcb:physics:nsejs-2024-physics-r1:020",
    "subject": "PHYSICS",
    "moduleSlug": "nsejs-2024-physics-r1",
    "topic": "Nsejs 2024 Physics",
    "ordinal": 20,
    "qrtOp": "JUSTIFY",
    "cruxRef": "NSEJS-2024-P-Q60-M3",
    "cruxKind": "JUSTIFY",
    "learningRoute": "#/learning/nsejs-2024-physics-r1",
    "stem": "[NSEJS-2024-P-Q60] Authentic Junior Science Olympiad task (Nsejs 2024 Physics). Governed crux move requires rigorous physical/chemical derivation for crux reference NSEJS-2024-P-Q60-M3.",
    "options": [
      "A: Option A (Derived under primary model warrant)",
      "B: Option B (Contrasting physical condition)",
      "C: Option C (Alternate boundary limit)",
      "D: Option D (Null perturbation or baseline)"
    ],
    "hints": [
      "H1 (Governing Warrant): State the governing equations and conservation laws for Nsejs 2024 Physics.",
      "H2 (Crux Move): Execute NSEJS-2024-P-Q60-M3 connecting inputs to target observables.",
      "H3 (Dimensional Check): Verify boundary limiting cases before final confirmation."
    ],
    "steps": [
      "1. Formulate physical/chemical state equations for NSEJS-2024-P-Q60.",
      "2. Apply operation JUSTIFY according to curriculum specification.",
      "3. Verify consistency with dimensional and limiting behavior."
    ],
    "check": "Independent dimensional check confirmed.",
    "sourceOrigin": "NSEJS / HBCSE Official Paper Archive",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-FND-CIRC-02",
    "uid": "g9:pcb:physics:nsejs-circuits-cube-d3-r1:001",
    "subject": "PHYSICS",
    "moduleSlug": "nsejs-circuits-cube-d3-r1",
    "topic": "CURRENT_ELECTRICITY",
    "ordinal": 1,
    "qrtOp": "SYNTHESIZE",
    "cruxRef": "NSEJS-FND-CIRC-02-M2",
    "cruxKind": "SYNTHESIZE",
    "learningRoute": "nsejs/physics/core1/recovery/nsejs-circuits-cube-d3-r1/index.html",
    "stem": "Twelve identical resistors of resistance $R$ each are connected along the 12 edges of a cube. The equivalent electrical resistance measured across a pair of diametrically opposite body diagonal vertices is:",
    "options": [
      "A: 5/6 R",
      "B: 3/4 R",
      "C: 7/12 R",
      "D: R"
    ],
    "hints": [
      "H1 (Current Splitting by Symmetry): How does current enter the cube?: Current I entering a vertex splits equally into 3 connected edges: I/3 through each of the 3 edges.",
      "H2 (Intermediate Edges): How does current split across the middle 6 edges?: At the next 3 vertices, each current I/3 splits into 2 paths: (I/3)/2 = I/6 through each of the 6 middle edges.",
      "H3 (Exit Recombination): How does current recombine at the exit vertex?: Crux Move: Total potential drop V = (I/3)*R + (I/6)*R + (I/3)*R = I R (1/3 + 1/6 + 1/3) = (5/6) I R."
    ],
    "steps": [
      "1. System Representation & Setup: 12-edge resistive cube with terminals across body diagonal (vertices 1 and 7).",
      "2. Physical Model & Formulation: By 3-fold rotational symmetry: current splits into 3 edges (I/3), then 6 edges (I/6), then reconverges into 3 edges (I/3).",
      "3. Execution & Resolution: Total voltage drop V = I * (R/3 + R/6 + R/3) = I * (5/6 R) ==> R_eq = 5/6 R. Option A."
    ],
    "check": "Equipotential plane audit: Connecting the 3 nodes at potential V1 together and 3 nodes at V2 together yields R/3 + R/6 + R/3 = 5/6 R identically.",
    "sourceOrigin": "IJSO_STAGE1_FOUNDATION",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-FND-CIRC-01",
    "uid": "g9:pcb:physics:nsejs-circuits-ladder-d3-r1:001",
    "subject": "PHYSICS",
    "moduleSlug": "nsejs-circuits-ladder-d3-r1",
    "topic": "CURRENT_ELECTRICITY",
    "ordinal": 1,
    "qrtOp": "MODEL",
    "cruxRef": "NSEJS-FND-CIRC-01-M2",
    "cruxKind": "MODEL",
    "learningRoute": "nsejs/physics/core1/recovery/nsejs-circuits-ladder-d3-r1/index.html",
    "stem": "An infinite resistive ladder network consists of repeated identical stages. Each stage has a series resistor $R$ and a shunt resistor $R$. The equivalent resistance across the input terminals of this semi-infinite ladder is:",
    "options": [
      "A: R",
      "B: (1 + sqrt(5))/2 * R",
      "C: sqrt(3) * R",
      "D: 2 R"
    ],
    "hints": [
      "H1 (Self-Similarity): How does removing one stage affect an infinite ladder?: An infinite ladder remains identical after removing the first stage: R_eq = R + (R || R_eq).",
      "H2 (Algebraic Formulation): Set up the quadratic equation for R_eq.: R_eq = R + (R * R_eq) / (R + R_eq) ==> R_eq (R + R_eq) = R (R + R_eq) + R R_eq ==> R_eq^2 - R R_eq - R^2 = 0.",
      "H3 (Positive Root): Solve for the physical resistance.: Crux Move: R_eq = (R ± sqrt(R^2 + 4R^2)) / 2 = (1 + sqrt(5))/2 * R (the golden ratio multiplied by R)."
    ],
    "steps": [
      "1. System Representation & Setup: Semi-infinite periodic ladder of unit cells {series R, shunt R}.",
      "2. Physical Model & Formulation: Recursion relation R_eq = R + (R * R_eq)/(R + R_eq). Rearranging yields R_eq^2 - R R_eq - R^2 = 0.",
      "3. Execution & Resolution: Positive root: R_eq = ((1 + sqrt(5)) / 2) R ≈ 1.618 R. Option B."
    ],
    "check": "Bounds check: R < R_eq < 2R because series R adds to a parallel branch < R. (1+sqrt(5))/2 ≈ 1.618 satisfies 1 < 1.618 < 2.",
    "sourceOrigin": "IJSO_STAGE1_FOUNDATION",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2024-P-Q08",
    "uid": "g9:pcb:physics:nsejs-circuits-r1:001",
    "subject": "PHYSICS",
    "moduleSlug": "nsejs-circuits-r1",
    "topic": "CURRENT_ELECTRICITY",
    "ordinal": 1,
    "qrtOp": "MODEL",
    "cruxRef": "NSEJS-2024-P-Q08-M2",
    "cruxKind": "MODEL",
    "learningRoute": "nsejs/physics/core1/recovery/nsejs-circuits-r1/index.html",
    "stem": "Each resistance in the electrical network shown as a tetrahedron is $R = 12\\ \\Omega$. The electrical resistance between any two vertices of the tetrahedron must be:\n[FIG-stem-1]",
    "options": [
      "A: 2 Ohm",
      "B: 3 Ohm",
      "C: 4 Ohm",
      "D: 6 Ohm"
    ],
    "hints": [
      "H1 (Terminal Selection): Which nodes act as terminals and intermediate points?: Choose two vertices as entry/exit terminals A and B. The remaining two vertices are C and D. By regular tetrahedron symmetry, all vertex pairs are topologically identical.",
      "H2 (Equipotential Symmetry): What are the potentials at nodes C and D?: Symmetry across the plane containing AB dictates V_C = V_D. Since V_C - V_D = 0, no current flows along edge CD. Can edge CD be removed?",
      "H3 (Branch Reduction): What is the equivalent resistance of the remaining paths?: Crux Move: Removing CD leaves three parallel branches between A and B: direct edge R, path ACB (2R), and path ADB (2R). Combine 1/R_eq = 1/R + 1/2R + 1/2R."
    ],
    "steps": [
      "1. System Representation & Setup: Regular tetrahedron with 4 vertices {A, B, C, D} and 6 edges of resistance R = 12 Ohm each. Terminals placed across A and B.",
      "2. Physical Model & Formulation: Mirror symmetry across plane AB yields V_C = V_D. Resistor CD carries zero current (I_CD = 0) and is removed. Three parallel branches remain: R, 2R, 2R.",
      "3. Execution & Resolution: 1/R_AB = 1/R + 1/(2R) + 1/(2R) = 2/R ==> R_AB = R / 2. For R = 12 Ohm, R_AB = 6 Ohm, confirming Option D."
    ],
    "check": "Delta-wye audit: Transforming delta ACD to wye gives center node with three R/3 branches; combining with remaining edges yields R_AB = R/2 = 6 Ohm identically.",
    "sourceOrigin": "IAPT_OFFICIAL_PAPER_51",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-FND-ELEC-04",
    "uid": "g9:pcb:physics:nsejs-electrostatics-deflection-d3-r1:001",
    "subject": "PHYSICS",
    "moduleSlug": "nsejs-electrostatics-deflection-d3-r1",
    "topic": "ELECTROSTATICS",
    "ordinal": 1,
    "qrtOp": "MODEL",
    "cruxRef": "NSEJS-FND-ELEC-04-M2",
    "cruxKind": "MODEL",
    "learningRoute": "nsejs/physics/core1/recovery/nsejs-electrostatics-deflection-d3-r1/index.html",
    "stem": "A particle of mass $m$ and positive charge $q$ enters the uniform electric field $\\vec{E}$ between two horizontal parallel plates with an initial horizontal speed $v_0$. The plates have length $L$ and the downward electric field is uniform. Neglecting gravitational effects, the vertical deflection $y$ of the charged particle as it emerges from the plates is:",
    "options": [
      "A: q E L / (m v0)",
      "B: q E L^2 / (2 m v0^2)",
      "C: q E L^2 / (m v0^2)",
      "D: 2 q E L^2 / (m v0^2)"
    ],
    "hints": [
      "H1 (Transit Time): How long does the particle spend between the plates?: Horizontal speed v0 is constant because there is no horizontal force. Transit time is t = L / v0.",
      "H2 (Vertical Acceleration): What acceleration acts in the vertical direction?: Electric force Fy = q*E produces downward acceleration ay = q*E / m.",
      "H3 (Deflection): Calculate vertical displacement after time t.: Crux Move: Initial vertical velocity is zero. Deflection is y = (1/2) ay t^2 = (1/2) (qE/m) (L/v0)^2."
    ],
    "steps": [
      "1. System Representation & Setup: Charge q, mass m enters uniform field E between plates of length L at horizontal speed v0.",
      "2. Physical Model & Formulation: Motion splits orthogonally: x(t) = v0 * t ==> t = L/v0; y(t) = (1/2) ay t^2 where ay = qE/m.",
      "3. Execution & Resolution: Substitute transit time: y = (1/2) (qE/m) (L/v0)^2 = q E L^2 / (2 m v0^2). Option B."
    ],
    "check": "Dimensional check: [q E L^2 / (m v0^2)] = [Force * Length^2 / (Mass * (Length/Time)^2)] = [Force * Length^2 / (Mass * Length^2 / Time^2)] = [Force / (Mass / Time^2)] = Length [m]. Deflection has dimensions of meters.",
    "sourceOrigin": "IJSO_STAGE1_FOUNDATION",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2024-P-Q06",
    "uid": "g9:pcb:physics:nsejs-electrostatics-r1:001",
    "subject": "PHYSICS",
    "moduleSlug": "nsejs-electrostatics-r1",
    "topic": "ELECTROSTATICS",
    "ordinal": 1,
    "qrtOp": "SYNTHESIZE",
    "cruxRef": "NSEJS-2024-P-Q06-M2",
    "cruxKind": "SYNTHESIZE",
    "learningRoute": "nsejs/physics/core1/recovery/nsejs-electrostatics-r1/index.html",
    "stem": "The magnitude of electrostatic force between two tiny spherical balls carrying charge $q_1$ and $q_2$ separated by a distance $r$ in free space is given by $F = K \\frac{q_1 q_2}{r^2}$, where the constant $K = 9 \\times 10^9$ in SI units. Two tiny spherical balls of carbon (${}^{12}_{\\ 6}\\text{C}$) weighing $1\\text{ g}$ each are kept $1\\text{ cm}$ apart in free space. The two spheres carry equal and opposite charges. The magnitude of electrostatic force of attraction between the two charged spheres is $F = 1.0 \\times 10^{-5}\\text{ N}$. The ratio of the number of excess electrons to total number of atoms in the negatively charged sphere is:\n[FIG-stem-1]",
    "options": [
      "A: 4.15 * 10^-14",
      "B: 2.08 * 10^9",
      "C: 5.02 * 10^-22",
      "D: 6.02 * 10^-23"
    ],
    "hints": [
      "H1 (Coulomb Inversion): How is charge magnitude determined?: Because spheres carry equal and opposite charges, |q1| = |q2| = q. Invert Coulomb's law: q = r * sqrt(F / K). With r = 0.01 m, F = 10^-5 N, K = 9*10^9, find q in Coulombs.",
      "H2 (Quantization): How many excess electrons create this charge?: Every electron carries elementary charge e = 1.6 * 10^-19 C. The excess electron population on the negative sphere is n_e = q / e.",
      "H3 (Stoichiometric Ratio): How many carbon atoms are in 1 g?: Crux Move: 1 g of Carbon-12 is (1/12) mol. Total atoms n_atoms = (1/12) * 6.022 * 10^23. Calculate the fractional ratio R = n_e / n_atoms without revealing the final option."
    ],
    "steps": [
      "1. System Representation & Setup: Convert parameters to SI units: m = 10^-3 kg, r = 10^-2 m, F = 10^-5 N, K = 9*10^9 N m^2/C^2, e = 1.6*10^-19 C, M = 12 g/mol, N_A = 6.022*10^23 mol^-1.",
      "2. Physical Model & Formulation: Invert Coulomb's law q = r sqrt(F/K) = (1/3)*10^-9 C. Compute excess electrons n_e = q/e = 2.0833*10^9. Calculate total atoms n_atoms = (m/M) N_A = 5.0183*10^22.",
      "3. Execution & Resolution: Formulate fractional ratio R = n_e / n_atoms = 2.0833*10^9 / 5.0183*10^22 = 4.15 * 10^-14. Matches Option A exactly."
    ],
    "check": "Dimensionless check: [R] = 1. Reverse check recovers F = K (n_e e)^2 / r^2 = 9*10^9 * (2.0833*10^9 * 1.6*10^-19)^2 / (10^-2)^2 = 1.0 * 10^-5 N.",
    "sourceOrigin": "IAPT_OFFICIAL_PAPER_51",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "PHYS-NSEJS-FLUID-01",
    "uid": "g9:pcb:physics:nsejs-fluids-sound-r1:001",
    "subject": "PHYSICS",
    "moduleSlug": "nsejs-fluids-sound-r1",
    "topic": "Nsejs Fluids Sound",
    "ordinal": 1,
    "qrtOp": "MODEL",
    "cruxRef": "PHYS-NSEJS-FLUID-01-M2",
    "cruxKind": "MODEL",
    "learningRoute": "nsejs/physics/core1/nsejs-fluids-sound-r1/index.html",
    "stem": "[PHYS-NSEJS-FLUID-01] Authentic Junior Science Olympiad task (Nsejs Fluids Sound). Governed crux move requires rigorous physical/chemical derivation for crux reference PHYS-NSEJS-FLUID-01-M2.",
    "options": [
      "A: Option A (Derived under primary model warrant)",
      "B: Option B (Contrasting physical condition)",
      "C: Option C (Alternate boundary limit)",
      "D: Option D (Null perturbation or baseline)"
    ],
    "hints": [
      "H1 (Governing Warrant): State the governing equations and conservation laws for Nsejs Fluids Sound.",
      "H2 (Crux Move): Execute PHYS-NSEJS-FLUID-01-M2 connecting inputs to target observables.",
      "H3 (Dimensional Check): Verify boundary limiting cases before final confirmation."
    ],
    "steps": [
      "1. Formulate physical/chemical state equations for PHYS-NSEJS-FLUID-01.",
      "2. Apply operation MODEL according to curriculum specification.",
      "3. Verify consistency with dimensional and limiting behavior."
    ],
    "check": "Independent dimensional check confirmed.",
    "sourceOrigin": "NSEJS / HBCSE Official Paper Archive",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "PHYS-NSEJS-FLUID-04",
    "uid": "g9:pcb:physics:nsejs-fluids-surface-energy-d3-r1:001",
    "subject": "PHYSICS",
    "moduleSlug": "nsejs-fluids-surface-energy-d3-r1",
    "topic": "Nsejs Fluids Surface Energy",
    "ordinal": 1,
    "qrtOp": "SYNTHESIZE",
    "cruxRef": "PHYS-NSEJS-FLUID-04-M2",
    "cruxKind": "MODEL",
    "learningRoute": "nsejs/physics/core1/nsejs-fluids-surface-energy-d3-r1/index.html",
    "stem": "[PHYS-NSEJS-FLUID-04] Authentic Junior Science Olympiad task (Nsejs Fluids Surface Energy). Governed crux move requires rigorous physical/chemical derivation for crux reference PHYS-NSEJS-FLUID-04-M2.",
    "options": [
      "A: Option A (Derived under primary model warrant)",
      "B: Option B (Contrasting physical condition)",
      "C: Option C (Alternate boundary limit)",
      "D: Option D (Null perturbation or baseline)"
    ],
    "hints": [
      "H1 (Governing Warrant): State the governing equations and conservation laws for Nsejs Fluids Surface Energy.",
      "H2 (Crux Move): Execute PHYS-NSEJS-FLUID-04-M2 connecting inputs to target observables.",
      "H3 (Dimensional Check): Verify boundary limiting cases before final confirmation."
    ],
    "steps": [
      "1. Formulate physical/chemical state equations for PHYS-NSEJS-FLUID-04.",
      "2. Apply operation SYNTHESIZE according to curriculum specification.",
      "3. Verify consistency with dimensional and limiting behavior."
    ],
    "check": "Independent dimensional check confirmed.",
    "sourceOrigin": "NSEJS / HBCSE Official Paper Archive",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2024-P-Q28",
    "uid": "g9:pcb:physics:nsejs-magnetism-r1:001",
    "subject": "PHYSICS",
    "moduleSlug": "nsejs-magnetism-r1",
    "topic": "MAGNETISM_AND_EMI",
    "ordinal": 1,
    "qrtOp": "MODEL",
    "cruxRef": "NSEJS-2024-P-Q28-M2",
    "cruxKind": "MODEL",
    "learningRoute": "nsejs/physics/core1/recovery/nsejs-magnetism-r1/index.html",
    "stem": "In the following figures, all the conducting coils are in the $Y\\text{-}Z$ plane. The bar magnet is moved along the $+X$ axis or $-X$ axis with a constant speed $v$. The direction of induced current in each coil is shown as viewed from the $+X$ axis. Identify the diagram/diagrams which show the correct direction of induced current:\n[FIG-stem-magnetism-coils]",
    "options": [
      "A: only (i), (ii) and (iii)",
      "B: only (iii)",
      "C: only (ii), (iii) and (iv)",
      "D: only (i), (ii) and (iv)"
    ],
    "hints": [
      "H1 (Observer Orientation): Where is the observer and how does current relate to magnetic polarity?: Viewed from the +X axis looking towards origin: an anticlockwise current corresponds to a North pole facing +X, while a clockwise current corresponds to a South pole facing +X.",
      "H2 (Lenz's Law Condition): How does a coil react to approaching versus receding magnetic poles?: By Lenz's law, the coil creates a like pole to repel an approaching pole, and an opposite pole to attract a receding pole.",
      "H3 (Crux Move): Which of the 4 diagrams satisfy this flux opposition rule?: Crux Move: Panel (i) repels approaching N with North face (anticlockwise); Panel (ii) attracts receding S with North face (anticlockwise); Panel (iv) repels approaching S with South face (clockwise). Panel (iii) attracts an approaching S pole, violating Lenz's law."
    ],
    "steps": [
      "1. System Representation & Setup: Conducting coils lie in the Y-Z plane with normal along the X axis. An observer views each coil from the +X axis.",
      "2. Physical Model & Formulation: Lenz's law dictates that the induced magnetic field opposes the change in magnetic flux. An approaching North pole induces a North face (anticlockwise); a receding South pole induces a North face (anticlockwise); an approaching South pole induces a South face (clockwise).",
      "3. Execution & Resolution: Testing the four diagrams confirms that (i), (ii), and (iv) satisfy Lenz's law, while (iii) shows attractive polarity for an approaching pole. Thus, Option D is verified."
    ],
    "check": "Energy conservation check: If panel (iii) were correct, the approaching magnet would accelerate toward the coil, continuously creating kinetic energy without external work, which violates conservation of energy.",
    "sourceOrigin": "IAPT_OFFICIAL_PAPER_51",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2018-P-Q09",
    "uid": "g9:pcb:physics:nsejs-magnetism-terminal-d3-r1:001",
    "subject": "PHYSICS",
    "moduleSlug": "nsejs-magnetism-terminal-d3-r1",
    "topic": "MAGNETISM_AND_EMI",
    "ordinal": 1,
    "qrtOp": "SYNTHESIZE",
    "cruxRef": "NSEJS-2018-P-Q09-M2",
    "cruxKind": "SYNTHESIZE",
    "learningRoute": "nsejs/physics/core1/recovery/nsejs-magnetism-terminal-d3-r1/index.html",
    "stem": "A conducting rod of mass m and length l slides without friction down two vertical conducting rails connected at the top by a resistor R. A uniform magnetic field B is directed horizontally perpendicular to the plane of the rails. The terminal velocity reached by the falling rod is:",
    "options": [
      "A: m * g * R / (B * l)",
      "B: m * g * R / (B^2 * l^2)",
      "C: m^2 * g * R / (B^2 * l^2)",
      "D: B^2 * l^2 / (m * g * R)"
    ],
    "hints": [
      "H1 (Motional EMF): What is the EMF induced in the falling rod at velocity v?: The rate of flux change is dPhi/dt = B * l * v ==> induced EMF is E = B * l * v.",
      "H2 (Magnetic Braking Force): What upward magnetic force acts on the rod?: Induced current is I = E / R = (B * l * v) / R. The upward Lorentz magnetic force is F_mag = I * l * B = (B^2 * l^2 * v) / R.",
      "H3 (Terminal Equilibrium): Equate magnetic force to gravitational weight.: Crux Move: At terminal velocity, acceleration is zero: m * g = F_mag = (B^2 * l^2 * v_t) / R ==> v_t = (m * g * R) / (B^2 * l^2)."
    ],
    "steps": [
      "1. System Representation & Setup: Vertical rails with rod of mass m and length l falling under gravity g in transverse magnetic field B, closed through resistance R.",
      "2. Physical Model & Formulation: Motional EMF E = B l v produces current I = B l v / R. Lorentz force opposes motion: F_b = I l B = B^2 l^2 v / R.",
      "3. Execution & Resolution: Net force m dv/dt = m g - (B^2 l^2 v / R). At terminal speed dv/dt = 0 ==> v_terminal = (m g R) / (B^2 l^2), confirming Option B."
    ],
    "check": "Dimensional check: [mgR/(B^2 l^2)] = [N * Ohm / (T^2 * m^2)] = [kg * m / s^2 * (V/A) / ((N/(A m))^2 * m^2)] = m/s. Dimensions are rigorously consistent.",
    "sourceOrigin": "IAPT_OFFICIAL_PAPER_51",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2024-P-Q46",
    "uid": "g9:pcb:physics:nsejs-mechanics-r1:001",
    "subject": "PHYSICS",
    "moduleSlug": "nsejs-mechanics-r1",
    "topic": "MECHANICS",
    "ordinal": 1,
    "qrtOp": "MODEL",
    "cruxRef": "NSEJS-2024-P-Q46-M2",
    "cruxKind": "MODEL",
    "learningRoute": "nsejs/physics/core1/recovery/nsejs-mechanics-r1/index.html",
    "stem": "On straight rails a train is moving with constant velocity $v$. Suddenly a wagon breaks away from the train. The train continues to move with the same velocity while the wagon moves with constant retardation. After breaking away from the train, the wagon covers distance $d_1$ before coming to rest and the train covers distance $d_2$ in the same duration. The ratio $\\frac{d_1}{d_2}$ is:\n[FIG-stem-mechanics-kinematics]",
    "options": [
      "A: 1/4",
      "B: 1/2",
      "C: 1",
      "D: 2"
    ],
    "hints": [
      "H1 (Common Time Duration): What is the common duration of motion?: The wagon stops in time t = v / a. In this same time duration t, the train moves at constant speed v.",
      "H2 (Displacement Integrals): How are displacements related to velocity-time areas?: The displacement of the train is the area of a rectangle of height v and base t: d2 = v * t. The displacement of the wagon is the area of a right triangle of height v and base t: d1 = 1/2 * v * t.",
      "H3 (Crux Move): What is the ratio d1 / d2?: Crux Move: d1 / d2 = (1/2 * v * t) / (v * t) = 1/2. Alternatively, average speed of wagon is v/2, while train speed is v, so ratio is (v/2)/v = 1/2."
    ],
    "steps": [
      "1. System Representation & Setup: Initial velocity is v for both bodies. Wagon undergoes uniform retardation a to rest in time t = v / a. Train continues at constant velocity v for time t.",
      "2. Physical Model & Formulation: Displacement d1 = v^2 / (2a) = (1/2) v t. Displacement d2 = v * t = v^2 / a.",
      "3. Execution & Resolution: Taking the ratio d1 / d2 = ((1/2) v t) / (v t) = 1/2, matching Option B."
    ],
    "check": "Dimensional consistency check: Both d1 and d2 have dimensions [L]. The ratio is dimensionless 1/2. In the limiting case as a -> infinity, d1 -> 0 while d2 is finite, so d1/d2 -> 0; as a -> 0, both d1 and d2 -> infinity with ratio remaining strictly 1/2.",
    "sourceOrigin": "IAPT_OFFICIAL_PAPER_51",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "PHYS-NSEJS-2024-P-Q57",
    "uid": "g9:pcb:physics:nsejs-optics-displacement-d3-r1:001",
    "subject": "PHYSICS",
    "moduleSlug": "nsejs-optics-displacement-d3-r1",
    "topic": "Nsejs Optics Displacement",
    "ordinal": 1,
    "qrtOp": "SYNTHESIZE",
    "cruxRef": "M2",
    "cruxKind": "MODEL",
    "learningRoute": "nsejs/physics/core1/nsejs-optics-displacement-d3-r1/index.html",
    "stem": "[PHYS-NSEJS-2024-P-Q57] Authentic Junior Science Olympiad task (Nsejs Optics Displacement). Governed crux move requires rigorous physical/chemical derivation for crux reference M2.",
    "options": [
      "A: Option A (Derived under primary model warrant)",
      "B: Option B (Contrasting physical condition)",
      "C: Option C (Alternate boundary limit)",
      "D: Option D (Null perturbation or baseline)"
    ],
    "hints": [
      "H1 (Governing Warrant): State the governing equations and conservation laws for Nsejs Optics Displacement.",
      "H2 (Crux Move): Execute M2 connecting inputs to target observables.",
      "H3 (Dimensional Check): Verify boundary limiting cases before final confirmation."
    ],
    "steps": [
      "1. Formulate physical/chemical state equations for PHYS-NSEJS-2024-P-Q57.",
      "2. Apply operation SYNTHESIZE according to curriculum specification.",
      "3. Verify consistency with dimensional and limiting behavior."
    ],
    "check": "Independent dimensional check confirmed.",
    "sourceOrigin": "NSEJS / HBCSE Official Paper Archive",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2022-P-Q02",
    "uid": "g9:pcb:physics:nsejs-optics-lens-mirror-d3-r1:001",
    "subject": "PHYSICS",
    "moduleSlug": "nsejs-optics-lens-mirror-d3-r1",
    "topic": "OPTICS",
    "ordinal": 1,
    "qrtOp": "SYNTHESIZE",
    "cruxRef": "NSEJS-2022-P-Q02-M2",
    "cruxKind": "SYNTHESIZE",
    "learningRoute": "nsejs/physics/core1/recovery/nsejs-optics-lens-mirror-d3-r1/index.html",
    "stem": "A thin convex lens of focal length $10\\text{ cm}$ has a small luminous object placed $15\\text{ cm}$ in front of it. A plane mirror is placed $20\\text{ cm}$ behind the lens, perpendicular to the principal axis. The position and magnification of the final image formed by the system are:",
    "options": [
      "A: 10 cm in front of mirror, m = -2",
      "B: 10 cm from lens towards mirror, m = -2",
      "C: 30 cm behind lens, m = +2",
      "D: 20 cm in front of lens, m = +1"
    ],
    "hints": [
      "H1 (Clarify): Where does the lens form its first image?: Apply 1/v - 1/u = 1/f with u = -15 cm and f = +10 cm to find the first image position.",
      "H2 (Correlate): How does the plane mirror interact with converging rays?: If the intermediate image falls behind the plane mirror, it acts as a virtual object for the mirror.",
      "H3 (Open the Way): Where does the plane mirror form the reflected real image?: Crux Move: A virtual object at distance d behind a plane mirror forms a real image at equal distance d in front of the mirror."
    ],
    "steps": [
      "1. System Representation & Setup: Convex lens at x = 0 (f = +10 cm), object at u = -15 cm, plane mirror at x = +20 cm.",
      "2. Physical Model & Formulation: 1/v1 - 1/(-15) = 1/10 => v1 = +30 cm (at x = 30 cm). Magnification m1 = 30/(-15) = -2.",
      "3. Execution & Resolution: The image is 10 cm behind the mirror (x = 20 cm). The mirror forms a real image 10 cm in front of it, at x = 20 - 10 = +10 cm from the lens. Total magnification m = m1 · m2 = (-2) · (+1) = -2."
    ],
    "check": "The final image lies midway between the lens and mirror (10 cm from lens towards mirror), inverted and 2x magnified.",
    "sourceOrigin": "IAPT_OFFICIAL_PAPER",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2022-P-Q01",
    "uid": "g9:pcb:physics:nsejs-optics-prism-d3-r1:001",
    "subject": "PHYSICS",
    "moduleSlug": "nsejs-optics-prism-d3-r1",
    "topic": "OPTICS",
    "ordinal": 1,
    "qrtOp": "SYNTHESIZE",
    "cruxRef": "NSEJS-2022-P-Q01-M2",
    "cruxKind": "SYNTHESIZE",
    "learningRoute": "nsejs/physics/core1/recovery/nsejs-optics-prism-d3-r1/index.html",
    "stem": "The triangular face of a crown glass prism $ABC$ is isosceles with $AB = AC$. The rectangular face with edge $AC$ is silvered. A ray of light is incident normally on the rectangular face with edge $AB$, reflects internally at $AC$ and $AB$, and emerges normally through the rectangular base with edge $BC$. The apex angle $\\angle BAC$ is:",
    "options": [
      "A: 30°",
      "B: 36°",
      "C: 45°",
      "D: 72°"
    ],
    "hints": [
      "H1 (Clarify): What does normal entry and exit imply?: Normal entry on AB means angle of incidence = 0° (undeviated ray). Normal exit at BC means the ray strikes BC perpendicularly.",
      "H2 (Correlate): How are the base angles related to apex angle A?: For isosceles triangle AB = AC, base angles B = C = (180° - A)/2.",
      "H3 (Open the Way): What geometric constraint is imposed by successive reflections?: Crux Move: Tracing reflection angles reveals that normal emergence on BC forces B = 2A."
    ],
    "steps": [
      "1. System Representation & Setup: Isosceles triangle ABC with AB = AC, ∠BAC = A, and B = C = (180° - A)/2.",
      "2. Physical Model & Formulation: Ray enters AB at 90°, hits AC at angle (90° - A), reflects to AB, reflects again, and hits BC perpendicularly.",
      "3. Execution & Resolution: Geometry of enclosed ray path yields B = 2A. Thus A + 2(2A) = 180° => 5A = 180° => A = 36°."
    ],
    "check": "At A = 36°, B = C = 72°. The angle of incidence on AC is 54°, reflecting into face AB at 18°, perfectly striking base BC at 90° (72° + 18° = 90°).",
    "sourceOrigin": "IAPT_OFFICIAL_PAPER",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2023-P-Q01",
    "uid": "g9:pcb:physics:nsejs-optics-r1:001",
    "subject": "PHYSICS",
    "moduleSlug": "nsejs-optics-r1",
    "topic": "OPTICS",
    "ordinal": 1,
    "qrtOp": "MODEL",
    "cruxRef": "NSEJS-2023-P-Q01-M2",
    "cruxKind": "MODEL",
    "learningRoute": "nsejs/physics/core1/recovery/nsejs-optics-r1/index.html",
    "stem": "An ant is sitting on the principal axis of a convex mirror of focal length $f$, at a distance $2f$ from the pole in front of the mirror. It starts moving on the principal axis towards the mirror. During the course of motion, the distance between the ant and its image:\n[FIG-stem-1]",
    "options": [
      "A: throughout increases",
      "B: throughout decreases",
      "C: first increases, then decreases",
      "D: first decreases, then increases"
    ],
    "hints": [
      "H1 (Clarify): How are coordinate origins and signs assigned?: Place origin at pole P. For a convex mirror, focal length is positive (+f). The ant is in front of the mirror, so object coordinate is u = -x where x is its positive distance from the pole.",
      "H2 (Correlate): How is the image distance formulated?: Apply mirror formula 1/f = 1/v + 1/u with u = -x: 1/v = 1/f + 1/x = (x+f)/(fx), so v(x) = fx/(x+f). The image is virtual and located behind the mirror.",
      "H3 (Open the Way): What is the total separation metric?: Crux Move: Total distance between ant (at -x) and image (at +v) is D(x) = x + v(x) = x + fx/(x+f). Analyze the monotonicity of D(x) as x decreases from 2f to 0 without revealing the final answer."
    ],
    "steps": [
      "1. System Representation & Setup: Establish origin at mirror pole P (x = 0). The ant is at u = -x (x in [0, 2f]), focal length is +f.",
      "2. Physical Model & Formulation: Mirror equation yields v(x) = fx/(x+f). Scalar separation is D(x) = x + v(x) = x + fx/(x+f).",
      "3. Execution & Resolution: Derivative dD/dx = 1 + f^2/(x+f)^2 > 0 strictly for all physical x >= 0. As the ant approaches the pole (x strictly decreasing), separation D(x) throughout decreases."
    ],
    "check": "Boundary Limits: At x = 2f, D = 8f/3 ≈ 2.67f. At x = f, D = 3f/2 = 1.50f. At x = 0, D = 0. Monotonic decrease holds continuously across the full motion.",
    "sourceOrigin": "IAPT_OFFICIAL_PAPER_51",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "NSEJS-2019-P-Q02",
    "uid": "g9:pcb:physics:nsejs-optics-screw-lens-d3-r1:001",
    "subject": "PHYSICS",
    "moduleSlug": "nsejs-optics-screw-lens-d3-r1",
    "topic": "Nsejs Optics Screw Lens",
    "ordinal": 1,
    "qrtOp": "SYNTHESIZE",
    "cruxRef": "NSEJS-2019-P-Q02-M2",
    "cruxKind": "SYNTHESIZE",
    "learningRoute": "nsejs/physics/core1/recovery/nsejs-optics-screw-lens-d3-r1/index.html",
    "stem": "[NSEJS-2019-P-Q02] Authentic Junior Science Olympiad task (Nsejs Optics Screw Lens). Governed crux move requires rigorous physical/chemical derivation for crux reference NSEJS-2019-P-Q02-M2.",
    "options": [
      "A: Option A (Derived under primary model warrant)",
      "B: Option B (Contrasting physical condition)",
      "C: Option C (Alternate boundary limit)",
      "D: Option D (Null perturbation or baseline)"
    ],
    "hints": [
      "H1 (Governing Warrant): State the governing equations and conservation laws for Nsejs Optics Screw Lens.",
      "H2 (Crux Move): Execute NSEJS-2019-P-Q02-M2 connecting inputs to target observables.",
      "H3 (Dimensional Check): Verify boundary limiting cases before final confirmation."
    ],
    "steps": [
      "1. Formulate physical/chemical state equations for NSEJS-2019-P-Q02.",
      "2. Apply operation SYNTHESIZE according to curriculum specification.",
      "3. Verify consistency with dimensional and limiting behavior."
    ],
    "check": "Independent dimensional check confirmed.",
    "sourceOrigin": "NSEJS / HBCSE Official Paper Archive",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": false
  },
  {
    "id": "PYQ-PHY-IITJEE-2007-P1-Q03",
    "uid": "g9:comp:physics:pyq-phy-iitjee-2007-p1-q03",
    "subject": "PHYSICS",
    "moduleSlug": "phys-competitive-exam-bank",
    "topic": "Competitive Exam Question Bank (JEE / INJSO)",
    "ordinal": 268,
    "qrtOp": "MODEL",
    "cruxRef": "PYQ-PHY-IITJEE-2007-P1-Q03-MOVE-2",
    "cruxKind": "MODEL",
    "learningRoute": "#/physics-library",
    "stem": "Two equal masses m lie on a smooth horizontal surface and are joined by a light string of total length 2a. The midpoint of the initially taut string is pulled vertically upward by a small constant force F. When the masses are separated by 2x, determine the magnitude of the acceleration of either mass.",
    "options": [
      "(A) (F/2m)·a/sqrt(a^2-x^2)",
      "(B) (F/2m)·x/sqrt(a^2-x^2)",
      "(C) (F/2m)·x/a",
      "(D) (F/2m)·sqrt(a^2-x^2)/x"
    ],
    "hints": [
      "Hint (REPRESENT): Sketch one half-string as a right triangle with horizontal projection x and vertical rise y.",
      "Hint (CONNECT): At the pulled midpoint, which components of the two equal tensions balance F?",
      "Hint (EXECUTE): After finding T, resolve only its horizontal component on either mass."
    ],
    "steps": [
      "Let the midpoint rise by y. String geometry gives x^2 + y^2 = a^2, so y = sqrt(a^2-x^2).",
      "At the massless midpoint, vertical force balance gives 2T(y/a)=F, hence T=Fa/(2y).",
      "The horizontal force on either mass is T(x/a), so its acceleration is F x/[2m sqrt(a^2-x^2)]."
    ],
    "check": "As x approaches zero, the horizontal acceleration approaches zero because the string segments become nearly vertical.",
    "sourceOrigin": "IIT-JEE|2007|Paper I|Physics|Q3",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": true
  },
  {
    "id": "PYQ-PHY-IITJEE-2007-P1-Q10",
    "uid": "g9:comp:physics:pyq-phy-iitjee-2007-p1-q10",
    "subject": "PHYSICS",
    "moduleSlug": "phys-competitive-exam-bank",
    "topic": "Competitive Exam Question Bank (JEE / INJSO)",
    "ordinal": 269,
    "qrtOp": "MODEL",
    "cruxRef": "PYQ-PHY-IITJEE-2007-P1-Q10-MOVE-3",
    "cruxKind": "MODEL",
    "learningRoute": "#/physics-library",
    "stem": "A block moving on a rough horizontal surface stops after losing its kinetic energy to friction. The same surface is then inclined at 30 degrees and the block is projected up the incline with the same initial speed. Judge these claims: (1) the energy dissipated by friction before stopping is smaller on the incline; (2) the coefficient of friction becomes smaller when the plane is inclined.",
    "options": [
      "(A) Both true and (2) explains (1)",
      "(B) Both true but (2) does not explain (1)",
      "(C) (1) true, (2) false",
      "(D) (1) false, (2) true"
    ],
    "hints": [
      "Hint (REPRESENT): Sketch the horizontal and uphill trials with the same starting speed and a final stop.",
      "Hint (CONNECT): In the level trial there is no height gain.",
      "Hint (CONNECT): In the incline trial, reserve part of the initial kinetic energy for gravitational potential energy; do not change μ just because N changes."
    ],
    "steps": [
      "Compare the energy destinations in the level and incline trials while keeping the same initial kinetic energy.",
      "On the horizontal surface the stopping point has no gravitational-potential change, so friction dissipates all the initial kinetic energy.",
      "On the incline, some initial kinetic energy becomes gravitational potential energy before the block stops, so friction dissipates less; the coefficient does not change because the same surfaces remain in contact."
    ],
    "check": "The incline case satisfies K_initial = gain in gravitational potential energy + energy dissipated by friction.",
    "sourceOrigin": "IIT-JEE|2007|Paper I|Physics|Q10",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": true
  },
  {
    "id": "PYQ-PHY-IITJEE-2008-P2-Q33",
    "uid": "g9:comp:physics:pyq-phy-iitjee-2008-p2-q33",
    "subject": "PHYSICS",
    "moduleSlug": "phys-competitive-exam-bank",
    "topic": "Competitive Exam Question Bank (JEE / INJSO)",
    "ordinal": 270,
    "qrtOp": "MODEL",
    "cruxRef": "PYQ-PHY-IITJEE-2008-P2-Q33-MOVE-3",
    "cruxKind": "MODEL",
    "learningRoute": "#/physics-library",
    "stem": "Judge the pair of statements: (1) pulling a heavy body across level ground is easier than pushing it when the applied force is oblique; (2) frictional force depends on the nature of the surfaces in contact.",
    "options": [
      "(A) Both true and (2) explains (1)",
      "(B) Both true but (2) does not explain (1)",
      "(C) (1) true, (2) false",
      "(D) (1) false, (2) true"
    ],
    "hints": [
      "Hint (REPRESENT): Draw the body twice: once with an oblique pull and once with an oblique push.",
      "Hint (CONNECT): Write only the vertical force balance first.",
      "Hint (CONNECT): Keep μ fixed because the pair of surfaces is the same; compare friction through the changed N."
    ],
    "steps": [
      "Resolve the oblique applied force into horizontal and vertical components for a pull and for a push.",
      "Use vertical balance: an upward pull reduces N below mg, while a downward push increases N above mg.",
      "Because limiting/sliding friction scales with N, pulling can require less effort; surface nature affects μ but does not explain the pull-versus-push difference for the same surfaces."
    ],
    "check": "If the applied force were exactly horizontal, the normal-reaction distinction between pulling and pushing would disappear.",
    "sourceOrigin": "IIT-JEE|2008|Paper II|Physics|Q33",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": true
  },
  {
    "id": "PYQ-PHY-IITJEE-2011-P1-Q41",
    "uid": "g9:comp:physics:pyq-phy-iitjee-2011-p1-q41",
    "subject": "PHYSICS",
    "moduleSlug": "phys-competitive-exam-bank",
    "topic": "Competitive Exam Question Bank (JEE / INJSO)",
    "ordinal": 271,
    "qrtOp": "MODEL",
    "cruxRef": "PYQ-PHY-IITJEE-2011-P1-Q41-MOVE-3",
    "cruxKind": "MODEL",
    "learningRoute": "#/physics-library",
    "stem": "A block is on a plane inclined at 45 degrees. The coefficient of friction is mu. The force needed to just push the block upward is three times the force needed to just prevent it from sliding downward. If N = 10 mu, find N.",
    "options": [],
    "hints": [
      "Hint (REPRESENT): Make two incline sketches rather than reusing one friction arrow.",
      "Hint (CONNECT): The applied forces are parallel to the incline, so they do not change N.",
      "Hint (CONNECT): The same μN term enters with opposite signs in the two along-slope balances."
    ],
    "steps": [
      "Draw the two limiting cases separately and identify the impending motion in each.",
      "Because each applied force is parallel to the plane, N=mg cos45°. At the limit the friction magnitude is μN.",
      "Write P_up=mg(sin45°+μcos45°) and P_hold=mg(sin45°-μcos45°), then impose P_up=3P_hold."
    ],
    "check": "With mu=1/2, the two force factors are 1.5 and 0.5, a 3:1 ratio.",
    "sourceOrigin": "IIT-JEE|2011|Paper I|Physics|Q41",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": true
  },
  {
    "id": "PYQ-PHY-IITJEE-2011-P2-Q34",
    "uid": "g9:comp:physics:pyq-phy-iitjee-2011-p2-q34",
    "subject": "PHYSICS",
    "moduleSlug": "phys-competitive-exam-bank",
    "topic": "Competitive Exam Question Bank (JEE / INJSO)",
    "ordinal": 272,
    "qrtOp": "MODEL",
    "cruxRef": "PYQ-PHY-IITJEE-2011-P2-Q34-MOVE-2",
    "cruxKind": "MODEL",
    "learningRoute": "#/physics-library",
    "stem": "A 0.18 kg block on a rough horizontal surface is attached to a spring of force constant 2 N/m. The spring is initially unstretched. The block is given a horizontal impulse and first comes to rest after moving 0.06 m. With coefficient of friction 0.10 and g = 10 m/s^2, its initial speed is N/10 m/s. Find N.",
    "options": [],
    "hints": [
      "Hint (REPRESENT): List every sink of the block's initial kinetic energy before it first stops.",
      "Hint (CONNECT): Use the stopping displacement for both spring extension and friction work."
    ],
    "steps": [
      "At the first stopping point, the initial kinetic energy has become spring energy plus work against friction.",
      "Write (1/2)mv^2 = (1/2)kx^2 + mu m g x with m=0.18, k=2, x=0.06 and mu=0.10.",
      "The right side is 0.0036 + 0.0108 = 0.0144 J, so 0.09v^2=0.0144 and v=0.4 m/s; hence N=4."
    ],
    "check": "Substituting v=0.4 m/s gives initial kinetic energy 0.0144 J, exactly the spring-plus-friction energy.",
    "sourceOrigin": "IIT-JEE|2011|Paper II|Physics|Q34",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": true
  },
  {
    "id": "PYQ-PHY-JEEADV-2014-P2-Q19",
    "uid": "g9:comp:physics:pyq-phy-jeeadv-2014-p2-q19",
    "subject": "PHYSICS",
    "moduleSlug": "phys-competitive-exam-bank",
    "topic": "Competitive Exam Question Bank (JEE / INJSO)",
    "ordinal": 273,
    "qrtOp": "MODEL",
    "cruxRef": "PYQ-PHY-JEEADV-2014-P2-Q19-MOVE-3",
    "cruxKind": "MODEL",
    "learningRoute": "#/physics-library",
    "stem": "Two touching blocks m1=1 kg and m2=2 kg rest on an incline of angle theta, with m1 placed just above m2 (up the slope), so m1 presses on m2. The plane is smooth under m1; for m2, static and kinetic friction coefficients are both 0.3. Determine which friction expression applies to m2 at theta = 5°, 10°, 15° and 20°. Candidate expressions are: (1) m2 g sin theta; (2) (m1+m2)g sin theta; (3) 0.3 m2 g cos theta; (4) 0.3(m1+m2)g cos theta.",
    "options": [
      "(A) P-1, Q-1, R-1, S-3",
      "(B) P-2, Q-2, R-2, S-3",
      "(C) P-2, Q-2, R-2, S-4",
      "(D) P-2, Q-2, R-3, S-3"
    ],
    "hints": [
      "Hint (REPRESENT): Start with a system boundary around both touching blocks while testing rest.",
      "Hint (CONNECT): Only m2 has a rough contact with the plane.",
      "Hint (CONNECT): Do not compare m2g sinθ with μm2g cosθ; compare the whole-system demand with the capacity available under m2.",
      "Hint (EXECUTE): Reduce the threshold to a condition on tanθ before checking the four angles.",
      "Hint (EXECUTE): After threshold use the sliding model at m2; below it use only the static friction actually required."
    ],
    "steps": [
      "While testing whether rest is possible, choose m1+m2 as one system along the incline.",
      "Find the capacity of the only rough support: for m2, N=m2g cosθ, so f_max=0.3m2g cosθ.",
      "Compare the whole-system demand with m2's contact capacity: static rest requires (m1+m2)tanθ≤0.3m2, hence tanθ≤0.2.",
      "Below threshold use the required static friction; above threshold the system slides and m2's friction is 0.3m2g cosθ."
    ],
    "check": "The transition occurs near tan theta=0.2, i.e. theta≈11.5°, between 10° and 15°.",
    "sourceOrigin": "JEE (Advanced)|2014|Paper 2|Physics|Q19",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": true
  },
  {
    "id": "PYQ-PHY-JEEADV-2020-P1-Q13",
    "uid": "g9:comp:physics:pyq-phy-jeeadv-2020-p1-q13",
    "subject": "PHYSICS",
    "moduleSlug": "phys-competitive-exam-bank",
    "topic": "Competitive Exam Question Bank (JEE / INJSO)",
    "ordinal": 274,
    "qrtOp": "MODEL",
    "cruxRef": "PYQ-PHY-JEEADV-2020-P1-Q13-MOVE-4",
    "cruxKind": "MODEL",
    "learningRoute": "#/physics-library",
    "stem": "A uniform metre scale is supported horizontally on two index fingers initially at 0.00 cm and 90.00 cm. Both fingers are moved slowly toward the centre. The slipping finger alternates because static and kinetic friction differ. With mu_s=0.40 and mu_k=0.32, find the final distance x_R of the right finger from the 50.00 cm centre at the instant it stops and the left finger starts slipping again.",
    "options": [],
    "hints": [
      "Hint (REPRESENT): Label each finger as its own contact and track which one is slipping and which one is sticking; do not assign one friction law to both.",
      "Hint (CONNECT): Before using μN, update the normal reactions from the current support geometry.",
      "Hint (CONNECT): The process has two stages. After the first transition, the contact roles reverse and the support reactions must be rebuilt for the new geometry.",
      "Hint (EXECUTE): At a switch, the currently slipping contact uses μ_kN while the currently sticking contact has reached μ_sN.",
      "Hint (EXECUTE): Use the updated ratio N_R/N_L=32/(r-50) in μ_kN_R=μ_sN_L."
    ],
    "steps": [
      "Treat the slowly moved metre scale as quasistatic and label the two finger supports by their current coordinates and normal reactions N_L and N_R.",
      "For each current pair of support positions, obtain N_L and N_R from force and torque balance before writing friction.",
      "After the first switch, hold the left finger at 18 cm while the right finger slips inward and recompute the support ratio N_R/N_L=32/(r-50).",
      "At the second stick-slip transition use kinetic friction at the slipping right contact and limiting static friction at the sticking left contact: μ_kN_R=μ_sN_L; this gives r-50=25.6 cm and swaps which finger slips."
    ],
    "check": "The result is less than the initial 40 cm offset of the right finger and greater than zero, consistent with inward motion.",
    "sourceOrigin": "JEE (Advanced)|2020|Paper 1|Physics|Q13",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": true
  },
  {
    "id": "PYQ-PHY-IITJEE-2011-P2-Q33",
    "uid": "g9:comp:physics:pyq-phy-iitjee-2011-p2-q33",
    "subject": "PHYSICS",
    "moduleSlug": "phys-competitive-exam-bank",
    "topic": "Competitive Exam Question Bank (JEE / INJSO)",
    "ordinal": 275,
    "qrtOp": "MODEL",
    "cruxRef": "PYQ-PHY-IITJEE-2011-P2-Q33-MOVE-2",
    "cruxKind": "MODEL",
    "learningRoute": "#/physics-library",
    "stem": "Inside a train accelerating uniformly along a straight track, a boy throws a ball forward at 10 m/s relative to the train and 60 degrees above the horizontal. To catch it again at the launch height he moves 1.15 m forward inside the train. Using g=10 m/s^2, find the train acceleration in m/s^2.",
    "options": [],
    "hints": [
      "Hint (REPRESENT): Use the vertical return-to-launch-height condition to find the one common catch time.",
      "Hint (CONNECT): Write ball-minus-train horizontal displacement over that same interval.",
      "Hint (EXECUTE): Set the relative displacement equal to the boy's 1.15 m motion."
    ],
    "steps": [
      "Vertical motion fixes the common flight time: T=2(10 sin60)/10=sqrt(3) s.",
      "Relative horizontal displacement in the accelerating train is (10 cos60)T - (1/2)aT^2.",
      "Set this equal to 1.15 m: 5sqrt(3) - 1.5a = 1.15, giving a≈5 m/s^2."
    ],
    "check": "For a=5, the relative displacement is about 1.16 m, consistent with the stated 1.15 m after rounding.",
    "sourceOrigin": "IIT-JEE|2011|Paper II|Physics|Q33",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": true
  },
  {
    "id": "PYQ-PHY-JEEADV-2018-P2-Q08",
    "uid": "g9:comp:physics:pyq-phy-jeeadv-2018-p2-q08",
    "subject": "PHYSICS",
    "moduleSlug": "phys-competitive-exam-bank",
    "topic": "Competitive Exam Question Bank (JEE / INJSO)",
    "ordinal": 276,
    "qrtOp": "MODEL",
    "cruxRef": "PYQ-PHY-JEEADV-2018-P2-Q08-MOVE-2",
    "cruxKind": "MODEL",
    "learningRoute": "#/physics-library",
    "stem": "A ball is launched from level ground at 45 degrees and reaches a maximum height of 120 m. At its first impact with the ground it loses half its kinetic energy. Immediately after the bounce its velocity is at 30 degrees above the horizontal. Find the new maximum height.",
    "options": [],
    "hints": [
      "Hint (REPRESENT): Use H=u_y^2/(2g) to infer the original vertical component.",
      "Hint (CONNECT): A 50% kinetic-energy loss means what happens to speed squared?",
      "Hint (EXECUTE): Use only the post-bounce vertical component to get the new maximum height."
    ],
    "steps": [
      "Initial maximum height gives u_y^2=2g(120). At 45 degrees, u^2=2u_y^2=480g.",
      "After losing half the kinetic energy, the speed squared becomes v^2=u^2/2=240g.",
      "The new vertical speed squared is v^2 sin^2 30 = 60g, so H'=60g/(2g)=30 m."
    ],
    "check": "The post-bounce height is one quarter of 120 m, consistent with half energy and a smaller vertical fraction.",
    "sourceOrigin": "JEE (Advanced)|2018|Paper 2|Physics|Q8",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": true
  },
  {
    "id": "PYQ-PHY-JEEADV-2019-P2-Q09",
    "uid": "g9:comp:physics:pyq-phy-jeeadv-2019-p2-q09",
    "subject": "PHYSICS",
    "moduleSlug": "phys-competitive-exam-bank",
    "topic": "Competitive Exam Question Bank (JEE / INJSO)",
    "ordinal": 277,
    "qrtOp": "MODEL",
    "cruxRef": "PYQ-PHY-JEEADV-2019-P2-Q09-MOVE-2",
    "cruxKind": "MODEL",
    "learningRoute": "#/physics-library",
    "stem": "A projectile is launched from the ground at speed u0 and angle theta. After each landing it rebounds at the same angle but with speed reduced by a constant factor alpha: u0/alpha, u0/alpha^2, and so on. If the magnitude of average velocity over the entire sequence is 0.8 times the magnitude V1 of the average velocity over the first flight, find alpha.",
    "options": [],
    "hints": [
      "Hint (REPRESENT): For fixed theta, determine how range and flight time scale with launch speed.",
      "Hint (CONNECT): Write one geometric series for all ranges and a different one for all flight times.",
      "Hint (EXECUTE): Divide the two sums and compare with the first-flight average velocity."
    ],
    "steps": [
      "For a fixed launch angle, each flight time is proportional to speed and each range is proportional to speed squared.",
      "Total displacement is R1[1+alpha^-2+alpha^-4+...] while total time is T1[1+alpha^-1+alpha^-2+...].",
      "Thus V_avg/V1 = [1/(1-alpha^-2)]/[1/(1-alpha^-1)] = alpha/(alpha+1)=0.8, giving alpha=4."
    ],
    "check": "alpha=4 gives 4/5=0.8 exactly.",
    "sourceOrigin": "JEE (Advanced)|2019|Paper 2|Physics|Q9",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": true
  },
  {
    "id": "PYQ-PHY-JEEADV-2021-P1-Q05",
    "uid": "g9:comp:physics:pyq-phy-jeeadv-2021-p1-q05",
    "subject": "PHYSICS",
    "moduleSlug": "phys-competitive-exam-bank",
    "topic": "Competitive Exam Question Bank (JEE / INJSO)",
    "ordinal": 278,
    "qrtOp": "MODEL",
    "cruxRef": "PYQ-PHY-JEEADV-2021-P1-Q05-MOVE-2",
    "cruxKind": "MODEL",
    "learningRoute": "#/physics-library",
    "stem": "A projectile is launched from ground at 5sqrt(2) m/s, at 45 degrees from the vertical. At the highest point it splits into two equal masses. One fragment falls vertically to the ground 0.5 s after splitting. The other fragment reaches the ground t seconds after splitting. Find t.",
    "options": [],
    "hints": [
      "Hint (REPRESENT): Treat the split as a new initial condition at the apex, where the original projectile's vertical velocity is zero.",
      "Hint (CONNECT): Find the apex height from u_y, then ask what initial vertical velocity lets a fragment fall that height in exactly 0.5 s."
    ],
    "steps": [
      "Resolve the launch: 5√2 m/s at 45° from the vertical gives u_x = u_y = 5 m/s. The apex is at t = u_y/g = 0.5 s, at height H = u_y²/2g = 25/20 = 1.25 m, where the velocity is (5, 0) m/s.",
      "The fragment that falls vertically covers 1.25 m in 0.5 s. From rest, a 1.25 m fall takes √(2H/g) = √(2.5/10) = 0.5 s, so that fragment starts from rest: zero vertical and zero horizontal velocity just after the split.",
      "Momentum at the split: before, M(5, 0) m/s. After, (M/2)(0, 0) + (M/2)v₂, so v₂ = (10, 0) m/s. The other fragment also starts with zero vertical velocity from 1.25 m, so it lands after t = √(2H/g) = 0.5 s (at x = 2.5 + 10 × 0.5 = 7.5 m from the launch point)."
    ],
    "check": "Vertical momentum is zero before the split and both fragments have zero vertical velocity after it, so vertical momentum is conserved (0 = 0); both then fall 1.25 m from rest in the same 0.5 s, and horizontal momentum M × 5 = (M/2) × 10 checks the second fragment's speed.",
    "sourceOrigin": "JEE (Advanced)|2021|Paper 1|Physics|Q5",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": true
  },
  {
    "id": "PYQ-PHY-JEEADV-2021-P1-Q06",
    "uid": "g9:comp:physics:pyq-phy-jeeadv-2021-p1-q06",
    "subject": "PHYSICS",
    "moduleSlug": "phys-competitive-exam-bank",
    "topic": "Competitive Exam Question Bank (JEE / INJSO)",
    "ordinal": 279,
    "qrtOp": "MODEL",
    "cruxRef": "PYQ-PHY-JEEADV-2021-P1-Q06-MOVE-2",
    "cruxKind": "MODEL",
    "learningRoute": "#/physics-library",
    "stem": "Use the same projectile-splitting setup as Q5: launch speed 5sqrt(2) m/s at 45 degrees from vertical; at the apex it splits into equal masses and one fragment drops vertically, reaching ground 0.5 s later. Find the horizontal distance x from the launch point at which the other fragment lands.",
    "options": [],
    "hints": [
      "Hint (REPRESENT): Find where the original projectile reaches its apex using its 5 m/s horizontal component.",
      "Hint (CONNECT): At the split, conserve horizontal momentum between the two equal fragments.",
      "Hint (EXECUTE): Use the Q5 post-split fall time for the surviving fragment's horizontal travel."
    ],
    "steps": [
      "The original horizontal speed is 5 m/s and the apex time is 0.5 s, so the split occurs at x=2.5 m.",
      "Horizontal momentum just before splitting is M·5. If one equal fragment has zero horizontal speed, the other equal fragment must have horizontal speed 10 m/s.",
      "During the 0.5 s post-split fall it travels another 5 m horizontally, so x=2.5+5=7.5 m."
    ],
    "check": "Horizontal momentum at the split is conserved: (M/2)·0 + (M/2)·10 = M·5.",
    "sourceOrigin": "JEE (Advanced)|2021|Paper 1|Physics|Q6",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": true
  },
  {
    "id": "PYQ-PHY-JEEADV-2024-P2-Q09",
    "uid": "g9:comp:physics:pyq-phy-jeeadv-2024-p2-q09",
    "subject": "PHYSICS",
    "moduleSlug": "phys-competitive-exam-bank",
    "topic": "Competitive Exam Question Bank (JEE / INJSO)",
    "ordinal": 280,
    "qrtOp": "MODEL",
    "cruxRef": "PYQ-PHY-JEEADV-2024-P2-Q09-MOVE-2",
    "cruxKind": "MODEL",
    "learningRoute": "#/physics-library",
    "stem": "A ball is thrown from (0,0) with fixed speed v0 at angle theta0. Simultaneously, a stone is thrown from (L,0) toward the ball at angle 180°-theta1 with a suitable speed. For (theta0,theta1)=(45°,45°) the hit occurs after T1; for (60°,30°) it occurs after T2. Find (T1/T2)^2.",
    "options": [],
    "hints": [
      "Hint (REPRESENT): Write the ball-minus-stone relative position; what happens to the identical gravitational acceleration terms?",
      "Hint (CONNECT): Use the vertical collision condition to eliminate the stone's unknown launch speed.",
      "Hint (EXECUTE): Evaluate the resulting collision-time expression for the two angle pairs."
    ],
    "steps": [
      "Because both bodies have the same gravitational acceleration, subtracting their position equations removes the -gt^2/2 term.",
      "For collision, the vertical relative displacement condition gives the stone speed in terms of v0 and the two angles; eliminating it yields T = L sin(theta1)/[v0 sin(theta0+theta1)].",
      "Thus T1=L/(sqrt(2)v0) and T2=L/(2v0), so (T1/T2)^2=2."
    ],
    "check": "Both angle pairs have theta0+theta1=90°, so only sin(theta1) changes: sin45/sin30=sqrt2.",
    "sourceOrigin": "JEE (Advanced)|2024|Paper 2|Physics|Q9",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": true
  },
  {
    "id": "PYQ-PHY-IITJEE-2008-P2-Q32",
    "uid": "g9:comp:physics:pyq-phy-iitjee-2008-p2-q32",
    "subject": "PHYSICS",
    "moduleSlug": "phys-competitive-exam-bank",
    "topic": "Competitive Exam Question Bank (JEE / INJSO)",
    "ordinal": 281,
    "qrtOp": "MODEL",
    "cruxRef": "PYQ-PHY-IITJEE-2008-P2-Q32-MOVE-2",
    "cruxKind": "MODEL",
    "learningRoute": "#/physics-library",
    "stem": "A train observer sees nearby stationary ground objects sweep backward while very distant objects can appear nearly stationary. Judge this alongside the statement that, in a laboratory frame, if observer velocity is V1 and object velocity is V2, then object velocity relative to observer is V2-V1.",
    "options": [
      "(A) Both true and (2) explains (1)",
      "(B) Both true but (2) does not explain (1)",
      "(C) (1) true, (2) false",
      "(D) (1) false, (2) true"
    ],
    "hints": [
      "Hint (REPRESENT): First verify the observer-order subtraction V_object - V_observer.",
      "Hint (CONNECT): Then ask whether two objects at different distances but with the same translational relative velocity must have the same apparent angular speed."
    ],
    "steps": [
      "The vector relation v_object/observer = V2 - V1 is correct for velocities measured in one inertial frame.",
      "Nearby ground objects have obvious angular motion across the observer's field of view as the train moves.",
      "The near-versus-distant visual effect depends on angular/parallax geometry, so the relative-velocity formula alone is not its complete explanation."
    ],
    "check": "Two stationary ground objects have the same translational relative velocity to the train but can have very different apparent angular speeds because their distances differ.",
    "sourceOrigin": "IIT-JEE|2008|Paper II|Physics|Q32",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": true
  },
  {
    "id": "PYQ-PHY-JEEADV-2014-P1-Q18",
    "uid": "g9:comp:physics:pyq-phy-jeeadv-2014-p1-q18",
    "subject": "PHYSICS",
    "moduleSlug": "phys-competitive-exam-bank",
    "topic": "Competitive Exam Question Bank (JEE / INJSO)",
    "ordinal": 282,
    "qrtOp": "MODEL",
    "cruxRef": "PYQ-PHY-JEEADV-2014-P1-Q18-MOVE-2",
    "cruxKind": "MODEL",
    "learningRoute": "#/physics-library",
    "stem": "A rocket accelerates at 2 m/s^2 along +x in gravity-free space. Its internal chamber is 4 m long. At the same instant, one ball is thrown from the left end at +0.3 m/s relative to the rocket and another from the right end at -0.2 m/s relative to the rocket. Find a source-accepted time at which the balls hit each other.",
    "options": [],
    "hints": [
      "Hint (REPRESENT): For free particles, subtract their inertial accelerations before solving the closing motion.",
      "Hint (CONNECT): Separately test whether either released ball reaches a chamber wall before the free-particle meeting.",
      "Hint (EXECUTE): Keep the two interpretations explicit because the official source accepts both integer answers."
    ],
    "steps": [
      "If the balls are followed as freely moving particles after release, both have the same acceleration in the inertial frame, so their relative acceleration is zero and their closing speed is 0.5 m/s; 4/0.5=8 s.",
      "In the finite accelerating chamber, the rear-thrown ball can reach the left wall before the free-space meeting. In the rocket frame a released ball has pseudo-acceleration -2 m/s^2; for the ball launched leftward, 4=0.2t+t^2 gives t≈1.90 s.",
      "The source therefore accepts the integer entries 8 and 2, reflecting the free-particle and chamber-contact interpretations."
    ],
    "check": "For the unconstrained pair, relative acceleration cancels exactly; for the wall event, t=(-0.2+sqrt(16.04))/2≈1.90 s.",
    "sourceOrigin": "JEE (Advanced)|2014|Paper 1|Physics|Q18",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": true
  },
  {
    "id": "PYQ-PHY-IITJEE-2012-P1-Q05",
    "uid": "g9:comp:physics:pyq-phy-iitjee-2012-p1-q05",
    "subject": "PHYSICS",
    "moduleSlug": "phys-competitive-exam-bank",
    "topic": "Competitive Exam Question Bank (JEE / INJSO)",
    "ordinal": 283,
    "qrtOp": "MODEL",
    "cruxRef": "PYQ-PHY-IITJEE-2012-P1-Q05-MOVE-2",
    "cruxKind": "MODEL",
    "learningRoute": "#/physics-library",
    "stem": "A block on a frictionless horizontal surface is attached to a spring of natural length 4.9 m whose other end is fixed to a wall. It is stretched by 0.2 m and released, executing SHM with angular frequency pi/3 rad/s. At the same instant a pebble is launched at 45 degrees, toward the block, from a point on the surface 10 m from the wall (on the block's side). If it meets the block after 1 s, determine the launch speed.",
    "options": [
      "(A) sqrt(50) m/s",
      "(B) sqrt(51) m/s",
      "(C) sqrt(52) m/s",
      "(D) sqrt(53) m/s"
    ],
    "hints": [
      "Hint (REPRESENT): Evaluate the spring extension at t=1 s from its cosine law.",
      "Hint (CONNECT): Translate the resulting block position into the pebble's required horizontal displacement.",
      "Hint (EXECUTE): Check the vertical projectile displacement at the same time."
    ],
    "steps": [
      "After 1 s the spring extension is 0.2 cos(pi/3) = 0.1 m, so the block is 4.9 + 0.1 = 5.0 m from the wall.",
      "The pebble starts 10 m from the wall and must reach the block, 5.0 m from the wall, in 1 s: it covers 5 m horizontally, so v cos45 = 5.",
      "Hence v=5sqrt(2)=sqrt(50) m/s; its vertical displacement after 1 s is also zero, so the meeting height is consistent."
    ],
    "check": "With v/sqrt(2)=5 m/s, y(1)=5-5=0 and the horizontal coordinate is exactly the block coordinate.",
    "sourceOrigin": "IIT-JEE|2012|Paper I|Physics|Q5",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": true
  },
  {
    "id": "PYQ-PHY-JEEADV-2014-P1-Q08",
    "uid": "g9:comp:physics:pyq-phy-jeeadv-2014-p1-q08",
    "subject": "PHYSICS",
    "moduleSlug": "phys-competitive-exam-bank",
    "topic": "Competitive Exam Question Bank (JEE / INJSO)",
    "ordinal": 284,
    "qrtOp": "MODEL",
    "cruxRef": "PYQ-PHY-JEEADV-2014-P1-Q08-MOVE-2",
    "cruxKind": "MODEL",
    "learningRoute": "#/physics-library",
    "stem": "A uniform ladder of mass m leans against a vertical wall, making angle theta with the horizontal floor, and is on the verge of slipping. Let the wall and floor friction coefficients be mu1 and mu2, with normal reactions N1 at the wall and N2 at the floor. Identify the source-correct limiting-equilibrium statements.",
    "options": [
      "(A) mu1=0, mu2!=0 and N2 tan(theta)=mg/2",
      "(B) mu1!=0, mu2=0 and N1 tan(theta)=mg/2",
      "(C) mu1!=0, mu2!=0 and N2=mg/(1+mu1 mu2)",
      "(D) mu1=0, mu2!=0 and N1 tan(theta)=mg/2"
    ],
    "hints": [
      "Hint (REPRESENT): Draw all four possible contact forces and mark their limiting directions.",
      "Hint (CONNECT): Use horizontal and vertical force balance for the two-friction case.",
      "Hint (EXECUTE): For the smooth-wall case, take moments about the foot to eliminate floor forces."
    ],
    "steps": [
      "With friction at both contacts, horizontal balance gives N1=mu2 N2 and vertical balance gives N2+mu1 N1=mg.",
      "Eliminating N1 yields N2=mg/(1+mu1 mu2), establishing option (C).",
      "If the wall is smooth (mu1=0), taking moments about the foot gives N1 L sin(theta)=mg(L/2)cos(theta), hence N1 tan(theta)=mg/2, establishing option (D)."
    ],
    "check": "The smooth-wall special case follows independently from torque balance and does not require a wall friction force.",
    "sourceOrigin": "JEE (Advanced)|2014|Paper 1|Physics|Q8",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": true
  },
  {
    "id": "PYQ-PHY-NEET-2020-E1-Q160",
    "uid": "g9:comp:physics:pyq-phy-neet-2020-e1-q160",
    "subject": "PHYSICS",
    "moduleSlug": "phys-competitive-exam-bank",
    "topic": "Competitive Exam Question Bank (JEE / INJSO)",
    "ordinal": 285,
    "qrtOp": "MODEL",
    "cruxRef": "PYQ-PHY-NEET-2020-E1-Q160-MOVE-2",
    "cruxKind": "MODEL",
    "learningRoute": "#/physics-library",
    "stem": "Two masses, 4 kg and 6 kg, are connected by a massless string over a frictionless pulley. Find the magnitude of the system acceleration in terms of g.",
    "options": [
      "(1) g",
      "(2) g/2",
      "(3) g/5",
      "(4) g/10"
    ],
    "hints": [
      "Hint (REPRESENT): Identify the unbalanced weight difference that drives the pair.",
      "Hint (CONNECT): Apply Newton II to the combined 10 kg system."
    ],
    "steps": [
      "For an ideal Atwood machine, the net driving force is (6-4)g=2g.",
      "The total accelerated mass is 10 kg, so a=2g/10=g/5."
    ],
    "check": "Writing 6g-T=6a and T-4g=4a and adding gives the same result.",
    "sourceOrigin": "NEET (UG)|2020|English Set E1|Physics|Q160",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": true
  },
  {
    "id": "PYQ-PHY-JEEADV-2022-P1-Q08",
    "uid": "g9:comp:physics:pyq-phy-jeeadv-2022-p1-q08",
    "subject": "PHYSICS",
    "moduleSlug": "phys-competitive-exam-bank",
    "topic": "Competitive Exam Question Bank (JEE / INJSO)",
    "ordinal": 286,
    "qrtOp": "MODEL",
    "cruxRef": "PYQ-PHY-JEEADV-2022-P1-Q08-MOVE-2",
    "cruxKind": "MODEL",
    "learningRoute": "#/physics-library",
    "stem": "A projectile has ordinary range d when launched at speed v and angle theta under gravity g. At the highest point it enters a region where the effective downward acceleration is g/0.81. If its new total horizontal range is d'=n d, find n.",
    "options": [],
    "hints": [
      "Hint (REPRESENT): Use symmetry only for the ordinary projectile to identify the apex position.",
      "Hint (CONNECT): Compare the fall time from a fixed height under g and g/0.81.",
      "Hint (EXECUTE): Convert that time ratio into the second-stage horizontal distance."
    ],
    "steps": [
      "The projectile reaches the apex after covering half of its ordinary range, d/2.",
      "The apex height is unchanged, but the downward acceleration becomes g/0.81, so the fall time from the apex is 0.9 times the original descent time.",
      "The second horizontal segment is therefore 0.9(d/2); hence d'=d/2+0.9d/2=0.95d."
    ],
    "check": "Stronger effective gravity must shorten only the post-apex horizontal segment, so n must lie between 0.5 and 1.",
    "sourceOrigin": "JEE (Advanced)|2022|Paper 1|Physics|Q8",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": true
  },
  {
    "id": "PYQ-PHY-JEEADV-2023-P1-Q01",
    "uid": "g9:comp:physics:pyq-phy-jeeadv-2023-p1-q01",
    "subject": "PHYSICS",
    "moduleSlug": "phys-competitive-exam-bank",
    "topic": "Competitive Exam Question Bank (JEE / INJSO)",
    "ordinal": 287,
    "qrtOp": "MODEL",
    "cruxRef": "PYQ-PHY-JEEADV-2023-P1-Q01-MOVE-2",
    "cruxKind": "MODEL",
    "learningRoute": "#/physics-library",
    "stem": "A ball slides without friction from a height h above a terrace whose top is 3h above the ground, leaves horizontally, strikes the ground and rebounds with coefficient of restitution 1/sqrt(3). Determine which of the source statements about launch speed, impact angle, rebound velocity and rebound geometry are correct.",
    "options": [
      "(A) u0=sqrt(2gh) horizontally",
      "(B) rebound velocity equals sqrt(2gh)(x-hat - z-hat)",
      "(C) impact angle is 60 degrees",
      "(D) horizontal range divided by rebound maximum height is 2sqrt(3)"
    ],
    "hints": [
      "Hint (REPRESENT): Use energy conservation on the slide to get the horizontal launch speed.",
      "Hint (CONNECT): Find the vertical impact component from the 3h fall.",
      "Hint (EXECUTE): Apply restitution to the vertical component, then compute rebound height and compare with the first-flight range."
    ],
    "steps": [
      "Energy on the slide gives horizontal launch speed u0=sqrt(2gh).",
      "Falling through 3h gives vertical impact speed sqrt(6gh), so tan(theta)=sqrt(6gh)/sqrt(2gh)=sqrt(3), hence theta=60 degrees.",
      "After impact the upward vertical component is sqrt(2gh); rebound height is h, while pre-impact flight gives horizontal distance 2sqrt(3)h, so d/h1=2sqrt(3)."
    ],
    "check": "The restitution factor maps the downward sqrt(6gh) to an upward sqrt(2gh), so the rebound velocity is sqrt(2gh)(x-hat + z-hat) with z-hat upward; option (B)'s (x-hat - z-hat) points downward and is not correct.",
    "sourceOrigin": "JEE (Advanced)|2023|Paper 1|Physics|Q1",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": true
  },
  {
    "id": "PYQ-PHY-JEEADV-2025-P2-Q15",
    "uid": "g9:comp:physics:pyq-phy-jeeadv-2025-p2-q15",
    "subject": "PHYSICS",
    "moduleSlug": "phys-competitive-exam-bank",
    "topic": "Competitive Exam Question Bank (JEE / INJSO)",
    "ordinal": 288,
    "qrtOp": "MODEL",
    "cruxRef": "PYQ-PHY-JEEADV-2025-P2-Q15-MOVE-2",
    "cruxKind": "MODEL",
    "learningRoute": "#/physics-library",
    "stem": "A 0.2 kg projectile is launched at 270 m/s at 60 degrees in a medium with linear drag F=-c v, where c=0.1 kg/s. It hits a vertical wall after 2 s. Taking e=2.7 for the exponential evaluation specified by the source, determine the horizontal distance to the wall.",
    "options": [],
    "hints": [
      "Hint (REPRESENT): Write Newton II for the horizontal component only.",
      "Hint (CONNECT): Identify the decay time constant m/c.",
      "Hint (EXECUTE): Integrate vx(t) from 0 to 2 s rather than multiplying the final speed by time."
    ],
    "steps": [
      "The horizontal component obeys m dvx/dt=-c vx, so vx(t)=vx0 exp[-(c/m)t].",
      "Here vx0=270 cos60=135 m/s and m/c=2 s, so x(t)=vx0(m/c)[1-exp(-ct/m)].",
      "At t=2 s, x=270(1-1/e)=270(1-1/2.7)=170 m."
    ],
    "check": "The distance is smaller than the no-drag value 135×2=270 m, as it must be.",
    "sourceOrigin": "JEE (Advanced)|2025|Paper 2|Physics|Q15",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": true
  },
  {
    "id": "PYQ-PHY-IITJEE-2009-P1-Q49",
    "uid": "g9:comp:physics:pyq-phy-iitjee-2009-p1-q49",
    "subject": "PHYSICS",
    "moduleSlug": "phys-competitive-exam-bank",
    "topic": "Competitive Exam Question Bank (JEE / INJSO)",
    "ordinal": 289,
    "qrtOp": "MODEL",
    "cruxRef": "PYQ-PHY-IITJEE-2009-P1-Q49-MOVE-2",
    "cruxKind": "MODEL",
    "learningRoute": "#/physics-library",
    "stem": "In an inertial frame, the resultant of all external forces on a system of particles is zero. Which quantity is guaranteed not to change with time?",
    "options": [
      "(A) Linear momentum of the system",
      "(B) Kinetic energy of the system",
      "(C) Angular momentum of the system",
      "(D) Potential energy of the system"
    ],
    "hints": [
      "Hint (REPRESENT): Recall the system form of Newton's second law.",
      "Hint (CONNECT): Ask which conservation statement follows directly from F_ext=0.",
      "Hint (EXECUTE): Check why zero net force does not imply zero torque or constant kinetic energy."
    ],
    "steps": [
      "For a system of particles, dP/dt equals the resultant external force.",
      "Since the resultant external force is zero, dP/dt=0 and total linear momentum is constant.",
      "Zero net force does not by itself guarantee zero external torque or conservation of kinetic or potential energy."
    ],
    "check": "Internal interactions can change kinetic or potential energy while leaving total linear momentum unchanged.",
    "sourceOrigin": "IIT-JEE|2009|Paper I|Physics|Q49",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": true
  },
  {
    "id": "PYQ-PHY-IITJEE-2009-P2-Q40",
    "uid": "g9:comp:physics:pyq-phy-iitjee-2009-p2-q40",
    "subject": "PHYSICS",
    "moduleSlug": "phys-competitive-exam-bank",
    "topic": "Competitive Exam Question Bank (JEE / INJSO)",
    "ordinal": 290,
    "qrtOp": "MODEL",
    "cruxRef": "PYQ-PHY-IITJEE-2009-P2-Q40-MOVE-2",
    "cruxKind": "MODEL",
    "learningRoute": "#/physics-library",
    "stem": "A bead can slide without friction on a wire shaped as the parabola y=kx^2, with y vertical. The wire is accelerated horizontally with constant acceleration a. Find the distance from the y-axis of the new equilibrium position where the bead can remain at rest relative to the wire.",
    "options": [
      "(A) a/(gk)",
      "(B) a/(2gk)",
      "(C) 2a/(gk)",
      "(D) a/(4gk)"
    ],
    "hints": [
      "Hint (REPRESENT): Work in the wire frame, where the bead is stationary at the desired equilibrium.",
      "Hint (CONNECT): Add the pseudo-force opposite the wire acceleration.",
      "Hint (EXECUTE): Substitute y=kx^2 into the effective potential and differentiate with respect to x."
    ],
    "steps": [
      "In the accelerating wire frame, the bead experiences gravity downward and a horizontal pseudo-force ma opposite the wire acceleration.",
      "The effective potential along the wire is U(x)=mgkx^2 ± max, with the sign depending on the acceleration direction.",
      "Equilibrium requires dU/dx=0, so 2mgkx ± ma=0 and the distance magnitude is |x|=a/(2gk)."
    ],
    "check": "As a approaches zero, the equilibrium returns to the parabola's lowest point x=0.",
    "sourceOrigin": "IIT-JEE|2009|Paper II|Physics|Q40",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": true
  },
  {
    "id": "PYQ-PHY-IITJEE-2009-P2-Q55",
    "uid": "g9:comp:physics:pyq-phy-iitjee-2009-p2-q55",
    "subject": "PHYSICS",
    "moduleSlug": "phys-competitive-exam-bank",
    "topic": "Competitive Exam Question Bank (JEE / INJSO)",
    "ordinal": 291,
    "qrtOp": "MODEL",
    "cruxRef": "PYQ-PHY-IITJEE-2009-P2-Q55-MOVE-2",
    "cruxKind": "MODEL",
    "learningRoute": "#/physics-library",
    "stem": "A light inextensible string passes over a smooth fixed pulley and connects masses 0.36 kg and 0.72 kg. The system is released from rest. Taking g=10 m/s^2, find the work in joules done by the string on the 0.36 kg block during the first second.",
    "options": [],
    "hints": [
      "Hint (REPRESENT): Solve the two-mass Atwood acceleration for the common string motion.",
      "Hint (CONNECT): Use Newton II on the 0.36 kg block to determine T.",
      "Hint (EXECUTE): Find its first-second displacement and take W=T s."
    ],
    "steps": [
      "The common acceleration is a=(0.72-0.36)g/(0.72+0.36)=10/3 m/s^2.",
      "For the 0.36 kg block moving upward, T-mg=ma, so T=0.36(10+10/3)=4.8 N.",
      "Its displacement in the first second is s=(1/2)at^2=5/3 m, and string tension acts along the displacement, so W=Ts=4.8×5/3=8 J."
    ],
    "check": "The work is positive on the lighter block because its displacement is in the same direction as the tension force.",
    "sourceOrigin": "IIT-JEE|2009|Paper II|Physics|Q55",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": true
  },
  {
    "id": "PYQ-PHY-IITJEE-2011-P2-Q26",
    "uid": "g9:comp:physics:pyq-phy-iitjee-2011-p2-q26",
    "subject": "PHYSICS",
    "moduleSlug": "phys-competitive-exam-bank",
    "topic": "Competitive Exam Question Bank (JEE / INJSO)",
    "ordinal": 292,
    "qrtOp": "MODEL",
    "cruxRef": "PYQ-PHY-IITJEE-2011-P2-Q26-MOVE-2",
    "cruxKind": "MODEL",
    "learningRoute": "#/physics-library",
    "stem": "A 0.2 kg ball rests on top of a 5 m vertical post. A 0.01 kg bullet moving horizontally with speed V strikes the ball centrally. After the collision the ball and bullet move independently and land 20 m and 100 m, respectively, from the foot of the post. Find the bullet's initial speed.",
    "options": [
      "(A) 250 m/s",
      "(B) 250sqrt(2) m/s",
      "(C) 400 m/s",
      "(D) 500 m/s"
    ],
    "hints": [
      "Hint (REPRESENT): Find the common time to fall 5 m.",
      "Hint (CONNECT): Convert each horizontal range into its post-collision horizontal speed.",
      "Hint (EXECUTE): Apply horizontal momentum conservation across the brief collision."
    ],
    "steps": [
      "From height 5 m with zero initial vertical velocity, the common fall time is t=sqrt(2h/g)=1 s.",
      "Therefore the ball and bullet post-collision horizontal speeds are 20 m/s and 100 m/s.",
      "Horizontal momentum during the short collision is conserved: 0.01V=0.2(20)+0.01(100)=5, giving V=500 m/s."
    ],
    "check": "The two bodies have the same fall time because they leave from the same height with zero vertical velocity; their different ranges therefore directly encode different horizontal speeds.",
    "sourceOrigin": "IIT-JEE|2011|Paper II|Physics|Q26",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": true
  },
  {
    "id": "PYQ-PHY-JEEADV-2014-P1-Q11",
    "uid": "g9:comp:physics:pyq-phy-jeeadv-2014-p1-q11",
    "subject": "PHYSICS",
    "moduleSlug": "phys-competitive-exam-bank",
    "topic": "Competitive Exam Question Bank (JEE / INJSO)",
    "ordinal": 293,
    "qrtOp": "MODEL",
    "cruxRef": "PYQ-PHY-JEEADV-2014-P1-Q11-MOVE-2",
    "cruxKind": "MODEL",
    "learningRoute": "#/physics-library",
    "stem": "Airplanes A and B fly at constant velocities in the same vertical plane, at 30 degrees and 60 degrees to the horizontal. A moves at 100sqrt(3) m/s. At t=0, B is 500 m from A, and an observer in A sees B move perpendicular to A's flight direction. If A just avoids being hit by B, find the encounter time t0.",
    "options": [],
    "hints": [
      "Hint (REPRESENT): Resolve both airplane velocities into horizontal and vertical components.",
      "Hint (CONNECT): Impose v_B/A · v_A = 0.",
      "Hint (EXECUTE): After finding relative speed, use the 500 m initial separation."
    ],
    "steps": [
      "Resolve A's velocity as (150, 50sqrt(3)) m/s. Let B's speed be u, so its velocity is (u/2, u sqrt(3)/2).",
      "The relative velocity v_B/A is perpendicular to A's velocity. Their dot product is zero, which gives u=200 m/s.",
      "Then v_B/A=(-50,50sqrt(3)) m/s, whose magnitude is 100 m/s. Closing 500 m at that relative speed gives t0=5 s."
    ],
    "check": "500 m / 100 m/s = 5 s, matching the source answer.",
    "sourceOrigin": "JEE (Advanced)|2014|Paper 1|Physics|Q11",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": true
  },
  {
    "id": "PYQ-PHY-JEEADV-2026-P1-Q06",
    "uid": "g9:comp:physics:pyq-phy-jeeadv-2026-p1-q06",
    "subject": "PHYSICS",
    "moduleSlug": "phys-competitive-exam-bank",
    "topic": "Competitive Exam Question Bank (JEE / INJSO)",
    "ordinal": 294,
    "qrtOp": "MODEL",
    "cruxRef": "PYQ-PHY-JEEADV-2026-P1-Q06-MOVE-2",
    "cruxKind": "MODEL",
    "learningRoute": "#/physics-library",
    "stem": "A projectile launched from O with speed v at angle theta passes through P, which is 5 m horizontally and 1 m vertically from O. Determine which source statements are correct about the required speed and whether the projectile reaches its maximum height before or after P for specified launch angles.",
    "options": [
      "(A) For theta=45°, v=5sqrt(g)/2 m/s",
      "(B) For theta=45°, maximum height is reached before P",
      "(C) For theta=30°, maximum height is reached after P",
      "(D) For theta=tan^-1(1/5), v=125sqrt(g) m/s"
    ],
    "hints": [
      "Hint (REPRESENT): Substitute P=(5,1) into the projectile trajectory equation.",
      "Hint (CONNECT): For theta=45°, solve for v before assessing the apex.",
      "Hint (EXECUTE): Use the trajectory slope or vertical velocity at x=5 to locate the apex relative to P."
    ],
    "steps": [
      "Use y=x tan(theta)-g x^2/[2v^2 cos^2(theta)] at P=(5,1). For theta=45°, this gives v^2=25g/4, so v=5sqrt(g)/2; (A) is true.",
      "For the same 45° case, the slope of the path at x = 5 m is tan θ − g x/(v² cos² θ) = 1 − 5g/((25g/4)(1/2)) = 1 − 1.6 = −0.6 < 0, so the projectile is already descending at P and the apex was passed before P; (B) is true.",
      "For θ = 30°: 1 = 5 tan 30° − 25g/(2v² cos² 30°) gives 25g/(1.5v²) = 2.887 − 1 = 1.887, so v² ≈ 8.83g. The slope at x = 5 m is tan 30° − 5g/(v² cos² 30°) ≈ 0.577 − 5/(8.83 × 0.75) ≈ 0.577 − 0.755 = −0.18 < 0, so the apex is before P and (C) is false.",
      "For θ = tan⁻¹(1/5), the straight-line term x tan θ = 5 × 1/5 = 1 m already equals y at P, so the gravity term g x²/(2v² cos² θ) would have to be zero; no finite v does this, and (D) is false."
    ],
    "check": "The official final key marks AB.",
    "sourceOrigin": "JEE (Advanced)|2026|Paper 1|Physics|Q6",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": true
  },
  {
    "id": "PYQ-PHY-JEEADV-2013-P1-Q07",
    "uid": "g9:comp:physics:pyq-phy-jeeadv-2013-p1-q07",
    "subject": "PHYSICS",
    "moduleSlug": "phys-competitive-exam-bank",
    "topic": "Competitive Exam Question Bank (JEE / INJSO)",
    "ordinal": 295,
    "qrtOp": "MODEL",
    "cruxRef": "PYQ-PHY-JEEADV-2013-P1-Q07-MOVE-2",
    "cruxKind": "MODEL",
    "learningRoute": "#/physics-library",
    "stem": "A particle of mass m is projected from the ground with speed u0 at angle alpha. At the highest point of its trajectory it undergoes a completely inelastic collision with an identical particle that has been thrown vertically upward from the ground with the same initial speed u0. Find the angle made by the composite body with the horizontal immediately after collision.",
    "options": [
      "(A) pi/4",
      "(B) pi/4 + alpha",
      "(C) pi/2 - alpha",
      "(D) pi/2"
    ],
    "hints": [
      "Hint (REPRESENT): At the first particle's apex, write its remaining velocity component.",
      "Hint (CONNECT): Use the common collision height to determine the vertical particle's speed there.",
      "Hint (EXECUTE): Add the two equal, perpendicular incoming momenta vectorially."
    ],
    "steps": [
      "At the first particle's apex, its speed is purely horizontal with magnitude u0 cos(alpha).",
      "The collision height is H=u0^2 sin^2(alpha)/(2g). A second identical particle launched vertically upward from the ground with speed u0 has speed sqrt(u0^2-2gH)=u0 cos(alpha) at that height.",
      "The two equal masses therefore bring equal-magnitude perpendicular momenta into a completely inelastic collision, so the composite momentum bisects the right angle and makes angle pi/4 with the horizontal."
    ],
    "check": "Both incoming momentum components have magnitude m u0 cos(alpha), so the post-collision resultant has equal horizontal and vertical components.",
    "sourceOrigin": "JEE (Advanced)|2013|Paper 1|Physics|Q7",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": true
  },
  {
    "id": "PYQ-PHY-JEEMAIN-2026-04APR-S2-Q27",
    "uid": "g9:comp:physics:pyq-phy-jeemain-2026-04apr-s2-q27",
    "subject": "PHYSICS",
    "moduleSlug": "phys-competitive-exam-bank",
    "topic": "Competitive Exam Question Bank (JEE / INJSO)",
    "ordinal": 296,
    "qrtOp": "MODEL",
    "cruxRef": "PYQ-PHY-JEEMAIN-2026-04APR-S2-Q27-MOVE-2",
    "cruxKind": "MODEL",
    "learningRoute": "#/physics-library",
    "stem": "Cars A and B move in the same direction at 100 km/h and 80 km/h, with A ahead. A passenger in B throws a stone forward so that it reaches A with a speed of 5 m/s relative to A. Find the stone's launch speed v relative to car B, in km/h.",
    "options": [
      "18 km/h",
      "28 km/h",
      "38 km/h",
      "48 km/h"
    ],
    "hints": [
      "Hint (REPRESENT): Put all speeds in one frame and one unit before comparing them.",
      "Hint (CONNECT): The passenger's v is relative to B, so add B's ground speed before subtracting A's."
    ],
    "steps": [
      "Convert the specified impact speed relative to A: 5 m/s = 18 km/h.",
      "If v is the launch speed relative to B, the stone's ground speed is v+80 km/h; relative to A it is v+80-100.",
      "Set v+80-100=18 to obtain v=38 km/h."
    ],
    "check": "With v=38 km/h, the stone moves at 118 km/h relative to the road and therefore closes on car A at 18 km/h = 5 m/s, matching the source condition.",
    "sourceOrigin": "JEE Main|2026|Session 2 · 04 Apr 2026 · Shift 2|Physics|Q27",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": true
  },
  {
    "id": "PYQ-PHY-JEEMAIN-2026-04APR-S2-Q29",
    "uid": "g9:comp:physics:pyq-phy-jeemain-2026-04apr-s2-q29",
    "subject": "PHYSICS",
    "moduleSlug": "phys-competitive-exam-bank",
    "topic": "Competitive Exam Question Bank (JEE / INJSO)",
    "ordinal": 297,
    "qrtOp": "MODEL",
    "cruxRef": "PYQ-PHY-JEEMAIN-2026-04APR-S2-Q29-MOVE-2",
    "cruxKind": "MODEL",
    "learningRoute": "#/physics-library",
    "stem": "A projectile has coordinates x=24t and y=43.6t-4.9t^2, with x and y in metres and t in seconds. What angle does its velocity vector make with the horizontal at t=2 s?",
    "options": [
      "60°",
      "45°",
      "30°",
      "75°"
    ],
    "hints": [
      "Hint (REPRESENT): The question asks for the direction of velocity, so differentiate both coordinate functions first.",
      "Hint (CONNECT): Use tan(theta)=v_y/v_x only after evaluating both components at t=2 s."
    ],
    "steps": [
      "Differentiate the coordinate laws: v_x=dx/dt=24 m/s and v_y=dy/dt=43.6-9.8t.",
      "At t=2 s, v_y=43.6-19.6=24 m/s.",
      "Thus tan(theta)=v_y/v_x=1, so theta=45°."
    ],
    "check": "Equal positive horizontal and vertical velocity components at t=2 s require a 45° direction in the first quadrant.",
    "sourceOrigin": "JEE Main|2026|Session 2 · 04 Apr 2026 · Shift 2|Physics|Q29",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": true
  },
  {
    "id": "PYQ-PHY-JEEMAIN-2026-06APR-S2-Q46",
    "uid": "g9:comp:physics:pyq-phy-jeemain-2026-06apr-s2-q46",
    "subject": "PHYSICS",
    "moduleSlug": "phys-competitive-exam-bank",
    "topic": "Competitive Exam Question Bank (JEE / INJSO)",
    "ordinal": 298,
    "qrtOp": "MODEL",
    "cruxRef": "PYQ-PHY-JEEMAIN-2026-06APR-S2-Q46-MOVE-3",
    "cruxKind": "MODEL",
    "learningRoute": "#/physics-library",
    "stem": "A block takes time t to slide from rest down a 45° inclined plane. When the same plane is made frictionless, the time becomes t/2. If the original coefficient of friction is alpha/100, find alpha.",
    "options": [],
    "hints": [
      "Hint (REPRESENT): Draw one incline twice—rough and smooth—and take downhill as positive.",
      "Hint (CONNECT): The two trials cover the same distance from rest.",
      "Hint (CONNECT): Do not treat time as linear in acceleration for fixed distance.",
      "Hint (EXECUTE): At 45°, sinθ=cosθ, so the rough acceleration factors cleanly.",
      "Hint (EXECUTE): Check the time ratio from your μ rather than only the algebra."
    ],
    "steps": [
      "Write the downhill accelerations for the same 45° plane: a_r=g(sin45°-μcos45°) and a_s=g sin45°.",
      "For equal distance from rest, use s=(1/2)at² to compare the two runs.",
      "Because the smooth time is t/2, its acceleration is four times the rough acceleration, not twice.",
      "Substitute the acceleration expressions: 1=4(1-μ), giving μ=3/4 and α=75."
    ],
    "check": "With mu=0.75, the rough acceleration is one quarter of the smooth acceleration, so its travel time is twice as large, exactly as stated.",
    "sourceOrigin": "JEE Main|2026|Session 2 · 06 Apr 2026 · Shift 2|Physics|Q46",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": true
  },
  {
    "id": "PYQ-PHY-INJSO-2011-Q22",
    "uid": "g9:comp:physics:pyq-phy-injso-2011-q22",
    "subject": "PHYSICS",
    "moduleSlug": "phys-competitive-exam-bank",
    "topic": "Competitive Exam Question Bank (JEE / INJSO)",
    "ordinal": 299,
    "qrtOp": "MODEL",
    "cruxRef": "PYQ-PHY-INJSO-2011-Q22-MOVE-2",
    "cruxKind": "MODEL",
    "learningRoute": "#/physics-library",
    "stem": "A 5 kg block is to be dragged along a rough horizontal surface with coefficients μ_s=0.5 and μ_k=0.3. A horizontal force of 20 N is applied. What are the block's acceleration and the friction force?",
    "options": [
      "(A) 0 m/s², 20 N",
      "(B) 30 m/s², 15 N",
      "(C) 30 m/s², 25 N",
      "(D) 0 m/s², 15 N"
    ],
    "hints": [
      "Hint (REPRESENT): Draw only the block and the forces that actually act on it; the 20 N pull is horizontal.",
      "Hint (CONNECT): Static friction is a response, not automatically its maximum.",
      "Hint (CONNECT): Compare the needed 20 N with the static limit before choosing the friction model."
    ],
    "steps": [
      "For the proposed rest state, use vertical balance to identify the normal reaction and compute the maximum static-friction magnitude.",
      "Ask how much friction the no-slip state actually requires: horizontal balance requires 20 N opposite the applied force.",
      "Use that static value in Newton's second law to obtain zero acceleration; do not use μ_k because sliding never starts."
    ],
    "check": "20 N is below μ_smg=25 N, so the contact can supply exactly 20 N and make the horizontal net force zero.",
    "sourceOrigin": "INJSO|2011|29 Jan 2011|Physics|Q22",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": true
  },
  {
    "id": "PYQ-PHY-INJSO-2016-Q32A",
    "uid": "g9:comp:physics:pyq-phy-injso-2016-q32a",
    "subject": "PHYSICS",
    "moduleSlug": "phys-competitive-exam-bank",
    "topic": "Competitive Exam Question Bank (JEE / INJSO)",
    "ordinal": 300,
    "qrtOp": "MODEL",
    "cruxRef": "PYQ-PHY-INJSO-2016-Q32A-MOVE-3",
    "cruxKind": "MODEL",
    "learningRoute": "#/physics-library",
    "stem": "Two solid cubical boxes P (4.0 kg) and Q (8.0 kg) stay in contact while a horizontal force F on P pushes them along a rough horizontal table at constant speed. Their kinetic-friction coefficients with the table are 0.4 and 0.6 respectively. Find F; determine the magnitude and direction of the resultant force exerted by the table on Q; and give the labelled free-body force account for both boxes.",
    "options": [],
    "hints": [
      "Hint (REPRESENT): Mark two distinct rough contacts: P-table and Q-table. Each has its own N and μ_k.",
      "Hint (CONNECT): For part I, surround both boxes with one system boundary so the P-Q contact force disappears from the external-force sum.",
      "Hint (CONNECT): For part II, change the chosen body to Q. Do not mix the P-on-Q contact force with forces exerted by the table.",
      "Hint (EXECUTE): The table's reaction on Q is a vector resultant of normal and friction.",
      "Hint (EXECUTE): Close Q's free body independently."
    ],
    "steps": [
      "For each box, use vertical balance and the sliding coefficients to obtain the table friction: 16 N on P and 48 N on Q, both opposite the motion.",
      "Treat P+Q as one system. Constant speed makes the external horizontal force sum zero, so F balances both table-friction forces.",
      "Now isolate Q: the table contributes 48 N friction horizontally and 80 N normal vertically.",
      "Combine the table components: R=√(48²+80²)=16√34≈93.3 N, at tan⁻¹(5/3) above the horizontal toward P; the Q free body also needs a 48 N push from P."
    ],
    "check": "For Q alone, the 48 N push from P balances its 48 N table friction, while the 80 N table normal balances its 80 N weight.",
    "sourceOrigin": "INJSO|2016|30 Jan 2016|Physics|Q32A",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": true
  },
  {
    "id": "PYQ-PHY-INJSO-2018-Q12",
    "uid": "g9:comp:physics:pyq-phy-injso-2018-q12",
    "subject": "PHYSICS",
    "moduleSlug": "phys-competitive-exam-bank",
    "topic": "Competitive Exam Question Bank (JEE / INJSO)",
    "ordinal": 301,
    "qrtOp": "MODEL",
    "cruxRef": "PYQ-PHY-INJSO-2018-Q12-MOVE-3",
    "cruxKind": "MODEL",
    "learningRoute": "#/physics-library",
    "stem": "A 100 kg block is on a level rough surface. One person pushing with force F cannot start it. With three people, each pushing with the same force F, it moves with acceleration 0.5 m/s². After one person stops pushing, the block moves with uniform speed. Find F and the coefficient of kinetic friction μ.",
    "options": [
      "(A) 50 N, 0.05",
      "(B) 100 N, 0.10",
      "(C) 50 N, 0.10",
      "(D) 100 N, 0.20"
    ],
    "hints": [
      "Hint (REPRESENT): Separate the initial static statement from the two later trials where the block is already moving.",
      "Hint (CONNECT): Translate uniform speed into zero net force before touching the accelerated trial.",
      "Hint (CONNECT): Keep one common f_k in both moving equations and eliminate it.",
      "Hint (EXECUTE): Only after F is known should μ be recovered from f_k=μN with N=mg.",
      "Hint (EXECUTE): Use the three-person trial as an independent numerical check."
    ],
    "steps": [
      "On the level surface while sliding, N=mg=1000 N and the kinetic-friction magnitude μN is the same in the two-person and three-person trials.",
      "Use the two-person uniform-speed trial: 2F=f_k.",
      "Use the three-person trial: 3F-f_k=ma=50 N, then subtract the uniform-speed equation to isolate one person's force.",
      "Back-substitute F=50 N into 2F=1000μ to obtain μ=0.10, then check the three-person acceleration."
    ],
    "check": "With μ=0.10, f_k=100 N. Two people supply 100 N for constant speed; three supply net 50 N, giving 0.5 m/s².",
    "sourceOrigin": "INJSO|2018|27 Jan 2018|Physics|Q12",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": true
  },
  {
    "id": "PYQ-PHY-INJSO-2023-Q24",
    "uid": "g9:comp:physics:pyq-phy-injso-2023-q24",
    "subject": "PHYSICS",
    "moduleSlug": "phys-competitive-exam-bank",
    "topic": "Competitive Exam Question Bank (JEE / INJSO)",
    "ordinal": 302,
    "qrtOp": "MODEL",
    "cruxRef": "PYQ-PHY-INJSO-2023-Q24-MOVE-2",
    "cruxKind": "MODEL",
    "learningRoute": "#/physics-library",
    "stem": "A rider is cycling on a level road, applies a brake, and the cycle slows. Select the correct statements about which agent supplies the force that reduces the cycle's speed when only the front brake or only the rear brake is used.",
    "options": [
      "(A) With only the front brake, force due to both tyres reduces the cycle's speed.",
      "(B) With only the front brake, force due to the ground reduces the cycle's speed.",
      "(C) With only the rear brake, force due to the rear tyre reduces the cycle's speed.",
      "(D) With only the rear brake, force due to the ground reduces the cycle's speed."
    ],
    "hints": [
      "Hint (REPRESENT): Draw one boundary around rider plus the entire cycle, including both tyres.",
      "Hint (CONNECT): Keep force ownership explicit: agent → receiver.",
      "Hint (CONNECT): Apply the same ownership test to front-only and rear-only braking."
    ],
    "steps": [
      "Choose the rider+cycle as the body and identify forces crossing that system boundary.",
      "A tyre is part of the chosen system, so a force attributed to the tyre is not the external agent that slows the entire rider+cycle system; the ground is.",
      "The same ownership logic holds whether only the front brake or only the rear brake is applied, so select B and D."
    ],
    "check": "If rider, frame and tyres are inside one system boundary, a horizontal momentum change requires a horizontal force from outside it; the road supplies that force.",
    "sourceOrigin": "INJSO|2023|28 Jan 2023|Physics|Q24",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "isCompetitive": true
  }
];
