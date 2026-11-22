// AUTO-GENERATED: Adopted from Grade9v4.1 NSEJS Biology custody (119 questions)
import type { UnifiedQuestionEntry } from '../runtime/unified-question-database.ts';

export const V41_BIOLOGY_QUESTIONS: readonly UnifiedQuestionEntry[] = [
  {
    "id": "BIO-NSEJS-GEN-01",
    "code": "BIO-NSEJS-GEN-01",
    "title": "NSEJS / Junior Science Biology \u00b7 Q01 \u00b7 MODEL \u00b7 D2 (Score 4)",
    "subjectCode": "BIO",
    "subject": "Biology",
    "topicCode": "GENETICS",
    "topic": "Reproduction & Mendelian Heredity",
    "subtopic": "BIO-GENETICS",
    "exam": "NSEJS",
    "year": 2024,
    "paper": "NSEJS Core 2",
    "questionNumber": "01",
    "section": "Junior Science Olympiad",
    "markingScheme": "+3 / -1",
    "isCompetitive": true,
    "difficultyBand": "D2",
    "difficultyScore": 4,
    "difficultyBasis": "Cognitive demand score determined by 5-component QRT rubric.",
    "cognitiveComponents": {
      "concept_model_selection": 1,
      "representation_translation": 1,
      "reasoning_chain_length": 1,
      "algebra_computational_load": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "MODEL",
    "role": "CORE2",
    "kind": "SINGLE_CHOICE",
    "stem": "In sweet pea (*Lathyrus odoratus*), purple flower coloration requires functional enzymes produced by two independently assorting dominant alleles, $C$ and $P$. Plants with genotypes $C\\_pp, ccP\\_,$ or $ccpp$ produce white flowers due to a biochemical pathway block.\n[FIG-stem-bio-complementary-genes-pathway]\nTwo dihybrid heterozygous purple-flowered plants ($CcPp \\times CcPp$) are crossed, yielding 1600 viable seeds. Determine the expected phenotypic ratio of Purple to White flowers in the progeny, and calculate the minimum total number of meiotic divisions required in the parent plants to produce the male and female gametes that formed these 1600 seeds.",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) Ratio = 9 : 7; Total meiotic divisions = 2000"
      },
      {
        "id": "opt-B",
        "text": "(B) Ratio = 9 : 7; Total meiotic divisions = 800"
      },
      {
        "id": "opt-C",
        "text": "(C) Ratio = 15 : 1; Total meiotic divisions = 2000"
      },
      {
        "id": "opt-D",
        "text": "(D) Ratio = 9 : 3 : 3 : 1; Total meiotic divisions = 1600"
      }
    ],
    "hints": [
      "[H1 (Complementary Gene Phenotype): Group the 16 Punnett square classes by flower color.] Only genotypes with at least one C and one P (C_P_) produce purple flowers (9/16). All other classes (3 C_pp + 3 ccP_ + 1 ccpp = 7/16) produce white flowers.",
      "[H2 (Male Gamete Meiosis): How many pollen grains are produced per meiotic division?] In plants, 1 microspore mother cell yields 4 functional pollen grains. For 1600 pollen grains: 1600 / 4 = 400 meiotic divisions.",
      "[H3 (Crux Move): Account for functional female gametes and sum.] Crux Move: Each megaspore mother cell yields 4 megaspores, but 3 degenerate, leaving only 1 functional megaspore per meiosis (1600 divisions). Total = 400 + 1600 = 2000."
    ],
    "steps": [
      "1. System Representation & Setup: Dihybrid cross CcPp x CcPp in sweet pea produces 1600 seeds. C and P are complementary dominant alleles. We find phenotypic ratio and required meiotic divisions.",
      "2. Physical Model & Formulation: Genotype distribution: 9 C_P_ : 3 C_pp : 3 ccP_ : 1 ccpp. Only C_P_ has both functional enzymes for anthocyanin (9 Purple : 7 White). For 1600 seeds, 1600 pollen grains and 1600 functional ovules are required.",
      "3. Execution & Resolution: Pollen divisions = 1600 / 4 = 400. Ovule divisions = 1600 / 1 = 1600 (due to 3 degenerating megaspores). Total meiotic divisions = 400 + 1600 = 2000. Option A."
    ],
    "check": "Independent check: If female gametes also yielded 4 functional spores, total would be 400 + 400 = 800 (Option B distractor). Botanical fact confirms 3 degenerate, requiring 1600 MMC divisions. Total = 2000. Confirmed.",
    "limitingCheck": "Independent check: If female gametes also yielded 4 functional spores, total would be 400 + 400 = 800 (Option B distractor). Botanical fact confirms 3 degenerate, requiring 1600 MMC divisions. Total = 2000. Confirmed.",
    "trapWarning": "Fault N09 Answer Isolation: Raw key withheld client-side; formative reasoning steps provided.",
    "correctKey": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "figures": [
      {
        "id": "fig_bio_complementary_genes.svg",
        "caption": "Complementary gene metabolic pathway and megasporogenesis vs microsporogenesis meiosis stoichiometry.",
        "available": true
      }
    ],
    "linkedCoreRoles": [
      "CORE1A",
      "CORE1B",
      "CORE2A",
      "CORE2B"
    ],
    "primaryCapabilityRef": "BIO-GEN-MODEL-Q01",
    "status": "RELEASED",
    "academicAdmission": "HOLD (Grade9 v4.1 Parity Candidate)",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "sourceOrigin": "NSEJS Custody (Grade9v4.1)"
  },
  {
    "id": "BIO-NSEJS-GEN-02",
    "code": "BIO-NSEJS-GEN-02",
    "title": "NSEJS / Junior Science Biology \u00b7 Q02 \u00b7 MODEL \u00b7 D2 (Score 4)",
    "subjectCode": "BIO",
    "subject": "Biology",
    "topicCode": "GENETICS",
    "topic": "Reproduction & Mendelian Heredity",
    "subtopic": "BIO-PHYSIOLOGY",
    "exam": "NSEJS",
    "year": 2024,
    "paper": "NSEJS Core 2",
    "questionNumber": "02",
    "section": "Junior Science Olympiad",
    "markingScheme": "+3 / -1",
    "isCompetitive": true,
    "difficultyBand": "D2",
    "difficultyScore": 4,
    "difficultyBasis": "Cognitive demand score determined by 5-component QRT rubric.",
    "cognitiveComponents": {
      "concept_model_selection": 1,
      "representation_translation": 1,
      "reasoning_chain_length": 1,
      "algebra_computational_load": 0,
      "trap_exception_sensitivity": 1
    },
    "qrtDemand": "MODEL",
    "role": "CORE2",
    "kind": "SINGLE_CHOICE",
    "stem": "During the generation and propagation of a nerve impulse along an unmyelinated mammalian axon, which sequence of ionic events across the axonal membrane correctly describes the transition from resting potential ($-70\\text{ mV}$) through peak depolarization ($+30\\text{ mV}$) to repolarization and the refractory period?",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) Threshold depolarization to -55 mV triggers rapid opening of voltage-gated Na+ channels causing Na+ influx to +30 mV; at peak, Na+ channels inactivate and voltage-gated K+ channels open causing K+ efflux to repolarize and briefly hyperpolarize the membrane (-90 mV) before Na+/K+ ATPase restores resting potential."
      },
      {
        "id": "opt-B",
        "text": "(B) Influx of K+ ions causes depolarization to +30 mV, followed by efflux of Na+ ions during repolarization."
      },
      {
        "id": "opt-C",
        "text": "(C) Opening of Cl- channels depolarizes the membrane to +30 mV, while opening of Ca2+ channels repolarizes it."
      },
      {
        "id": "opt-D",
        "text": "(D) The Na+/K+ pump reverses its direction during an action potential, pumping 3 K+ in and 2 Na+ out."
      }
    ],
    "hints": [
      "[H1 (Threshold and Depolarization): Which ion moves down its electrochemical gradient to drive the membrane potential positive?] Voltage-gated Na+ channels open rapidly at threshold (-55 mV), driving rapid Na+ influx toward the sodium equilibrium potential (+60 mV), peaking at +30 mV.",
      "[H2 (Repolarization Mechanism): Which channel opens to bring the potential back toward negative values?] At +30 mV, Na+ channels inactivate and slower voltage-gated K+ channels open, allowing rapid K+ efflux down its concentration gradient.",
      "[H3 (Crux Move): Trace after-hyperpolarization and resting potential recovery.] Crux Move: K+ channels close slowly causing temporary hyperpolarization (-90 mV), and the Na+/K+ ATPase restores original resting ion distributions (3 Na+ out, 2 K+ in)."
    ],
    "steps": [
      "1. System Representation & Setup: The axonal membrane maintains resting potential at -70 mV via Na+/K+ ATPase (3 Na+ pumped out for 2 K+ pumped in) and K+ leak channels. We evaluate action potential phases.",
      "2. Physical Model & Formulation: Depolarization reaching threshold (-55 mV) triggers voltage-gated Na+ activation gates, driving massive Na+ influx down concentration and electrical gradients to +30 mV.",
      "3. Execution & Resolution: At +30 mV, Na+ inactivation gates close, and voltage-gated K+ channels open, causing rapid K+ efflux that repolarizes the axon. Delayed closure of K+ channels produces after-hyperpolarization (-90 mV) until active Na+/K+ pumping re-establishes -70 mV. Option A."
    ],
    "check": "Independent check: Intracellular [K+] is ~140 mM vs extracellular 5 mM; [Na+] is 145 mM extracellular vs 12 mM intracellular. Na+ influx depolarizes; K+ efflux repolarizes. Option A confirmed.",
    "limitingCheck": "Independent check: Intracellular [K+] is ~140 mM vs extracellular 5 mM; [Na+] is 145 mM extracellular vs 12 mM intracellular. Na+ influx depolarizes; K+ efflux repolarizes. Option A confirmed.",
    "trapWarning": "Fault N09 Answer Isolation: Raw key withheld client-side; formative reasoning steps provided.",
    "correctKey": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "figures": [],
    "linkedCoreRoles": [
      "CORE1A",
      "CORE1B",
      "CORE2A",
      "CORE2B"
    ],
    "primaryCapabilityRef": "BIO-PHYS-MODEL-Q02",
    "status": "RELEASED",
    "academicAdmission": "HOLD (Grade9 v4.1 Parity Candidate)",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "sourceOrigin": "NSEJS Custody (Grade9v4.1)"
  },
  {
    "id": "BIO-NSEJS-GEN-03",
    "code": "BIO-NSEJS-GEN-03",
    "title": "NSEJS / Junior Science Biology \u00b7 Q03 \u00b7 APPLY \u00b7 D2 (Score 3)",
    "subjectCode": "BIO",
    "subject": "Biology",
    "topicCode": "GENETICS",
    "topic": "Reproduction & Mendelian Heredity",
    "subtopic": "BIO-PHYSIOLOGY",
    "exam": "NSEJS",
    "year": 2024,
    "paper": "NSEJS Core 2",
    "questionNumber": "03",
    "section": "Junior Science Olympiad",
    "markingScheme": "+3 / -1",
    "isCompetitive": true,
    "difficultyBand": "D2",
    "difficultyScore": 3,
    "difficultyBasis": "Cognitive demand score determined by 5-component QRT rubric.",
    "cognitiveComponents": {
      "concept_model_selection": 1,
      "representation_translation": 0,
      "reasoning_chain_length": 1,
      "algebra_computational_load": 0,
      "trap_exception_sensitivity": 1
    },
    "qrtDemand": "APPLY",
    "role": "CORE2",
    "kind": "SINGLE_CHOICE",
    "stem": "A person accidentally touches a hot stove with their finger and immediately withdraws their hand before feeling conscious pain. Which sequence correctly represents the neural pathway and neurotransmitter action governing this monosynaptic/polysynaptic spinal reflex arc?",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) Thermal pain nociceptor -> Afferent sensory neuron via dorsal root ganglion -> Spinal cord gray matter interneuron -> Efferent motor neuron via ventral root -> Acetylcholine release at neuromuscular junction causing biceps contraction."
      },
      {
        "id": "opt-B",
        "text": "(B) Pain nociceptor -> Cerebral cortex primary sensory area -> Motor cortex -> Descending pyramidal tract -> Efferent motor neuron."
      },
      {
        "id": "opt-C",
        "text": "(C) Afferent sensory neuron via ventral root -> Sympathetic ganglion -> Adrenal medulla -> Motor nerve via dorsal root."
      },
      {
        "id": "opt-D",
        "text": "(D) Interneuron in cerebellum -> Ventral horn sensory cell -> Dorsal root motor nerve -> Neuromuscular junction."
      }
    ],
    "hints": [
      "[H1 (Root Anatomy of Spinal Cord): Remember Bell-Magendie Law for spinal roots.] Sensory afferent fibers enter the spinal cord via the dorsal root (cell bodies in dorsal root ganglion). Motor efferent fibers exit via the ventral root.",
      "[H2 (Spinal Reflex Architecture): Does the initial withdrawal reflex involve cerebral cortex processing?] No; spinal reflex arcs are integrated at the level of spinal cord interneurons to minimize response time before ascending tracts inform the sensory cortex.",
      "[H3 (Crux Move): Trace the somatic neurotransmitter at the neuromuscular junction.] Crux Move: Somatic motor neurons release acetylcholine (ACh) onto nicotinic receptors on the motor end-plate of the effector muscle (biceps)."
    ],
    "steps": [
      "1. System Representation & Setup: Rapid hand withdrawal from a noxious thermal stimulus occurs via a polysynaptic spinal withdrawal reflex arc.",
      "2. Physical Model & Formulation: Thermal nociceptors generate action potentials in pseudo-unipolar sensory neurons entering the spinal cord through the dorsal root ganglion. In the dorsal horn gray matter, they synapse onto excitatory interneurons.",
      "3. Execution & Resolution: The interneuron excites alpha-motor neurons whose axons exit through the ventral root. At the motor end plate, action potentials trigger voltage-gated Ca2+ entry, exocytosis of acetylcholine, and rapid contraction of the flexor muscle. Option A."
    ],
    "check": "Independent check: Dorsal = Sensory, Ventral = Motor (Bell-Magendie law). Conscious perception reaches cortex via spinothalamic tract only after the spinal reflex completes. Confirmed.",
    "limitingCheck": "Independent check: Dorsal = Sensory, Ventral = Motor (Bell-Magendie law). Conscious perception reaches cortex via spinothalamic tract only after the spinal reflex completes. Confirmed.",
    "trapWarning": "Fault N09 Answer Isolation: Raw key withheld client-side; formative reasoning steps provided.",
    "correctKey": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "figures": [],
    "linkedCoreRoles": [
      "CORE1A",
      "CORE1B",
      "CORE2A",
      "CORE2B"
    ],
    "primaryCapabilityRef": "BIO-PHYS-APPLY-Q03",
    "status": "RELEASED",
    "academicAdmission": "HOLD (Grade9 v4.1 Parity Candidate)",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "sourceOrigin": "NSEJS Custody (Grade9v4.1)"
  },
  {
    "id": "BIO-NSEJS-GEN-04",
    "code": "BIO-NSEJS-GEN-04",
    "title": "NSEJS / Junior Science Biology \u00b7 Q04 \u00b7 JUSTIFY \u00b7 D2 (Score 4)",
    "subjectCode": "BIO",
    "subject": "Biology",
    "topicCode": "GENETICS",
    "topic": "Reproduction & Mendelian Heredity",
    "subtopic": "BIO-PLANT-PHYSIOLOGY",
    "exam": "NSEJS",
    "year": 2024,
    "paper": "NSEJS Core 2",
    "questionNumber": "04",
    "section": "Junior Science Olympiad",
    "markingScheme": "+3 / -1",
    "isCompetitive": true,
    "difficultyBand": "D2",
    "difficultyScore": 4,
    "difficultyBasis": "Cognitive demand score determined by 5-component QRT rubric.",
    "cognitiveComponents": {
      "concept_model_selection": 1,
      "representation_translation": 0,
      "reasoning_chain_length": 2,
      "algebra_computational_load": 0,
      "trap_exception_sensitivity": 1
    },
    "qrtDemand": "JUSTIFY",
    "role": "CORE2",
    "kind": "SINGLE_CHOICE",
    "stem": "When a potted seedling is placed horizontally in the dark, the shoot bends upwards (negative gravitropism) while the primary root bends downwards (positive gravitropism). According to the Cholodny-Went hypothesis and tissue-specific auxin dose-response kinetics, which physiological mechanism accounts for these opposite directional responses?",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) Statolith sedimentation causes auxin to accumulate along the lower side of both root and shoot; this high auxin concentration stimulates cell elongation in the shoot, but exceeds the optimum threshold in the root, thereby inhibiting lower-side root cell elongation."
      },
      {
        "id": "opt-B",
        "text": "(B) Auxin accumulates exclusively on the upper side of roots and the lower side of shoots."
      },
      {
        "id": "opt-C",
        "text": "(C) Gibberellin replaces auxin in roots to reverse the gravitational bending direction."
      },
      {
        "id": "opt-D",
        "text": "(D) Ethylene production on the upper side of the root accelerates cell division while auxin has no effect."
      }
    ],
    "hints": [
      "[H1 (Auxin Redistribution by Gravity): How does gravity affect auxin distribution in horizontal organs?] Dense starch-filled amyloplasts (statoliths) sediment to the lower side of cells, stimulating polar PIN-transporter localization that moves auxin to the lower flank in both roots and shoots.",
      "[H2 (Sensitivity Curves of Roots vs Shoots): Compare the optimum auxin concentrations for elongation.] Roots are roughly 100,000 times more sensitive to auxin than shoots. The optimal auxin concentration for shoot elongation is ~10^-5 M, whereas for roots it is ~10^-10 M.",
      "[H3 (Crux Move): Reconcile the differential elongation responses.] Crux Move: High auxin on the lower flank stimulates shoot cell elongation (bending upward), but suppresses root cell elongation (causing the upper side to elongate faster and bend downward)."
    ],
    "steps": [
      "1. System Representation & Setup: A seedling placed horizontally displays negative gravitropism in shoots and positive gravitropism in roots despite identical lateral gravity vectors.",
      "2. Physical Model & Formulation: Statoliths sediment to the bottom of statocytes in shoot endodermis and root columella, redirecting PIN efflux carriers to transport auxin (IAA) laterally to the lower flank of both organs.",
      "3. Execution & Resolution: Shoots have a high auxin tolerance; the accumulated lower-flank auxin accelerates proton extrusion (acid growth), causing the lower side to elongate faster than the upper side (upward curvature). Roots operate at much lower sensitivity thresholds; the same high auxin concentration induces ethylene/growth arrest on the lower flank, so the upper flank elongates faster (downward curvature). Option A."
    ],
    "check": "Independent check: Classical Thimann auxin dose-response curve shows stimulation for shoots at concentrations that are deeply inhibitory for roots. Option A confirmed.",
    "limitingCheck": "Independent check: Classical Thimann auxin dose-response curve shows stimulation for shoots at concentrations that are deeply inhibitory for roots. Option A confirmed.",
    "trapWarning": "Fault N09 Answer Isolation: Raw key withheld client-side; formative reasoning steps provided.",
    "correctKey": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "figures": [],
    "linkedCoreRoles": [
      "CORE1A",
      "CORE1B",
      "CORE2A",
      "CORE2B"
    ],
    "primaryCapabilityRef": "BIO-PLANT-JUST-Q04",
    "status": "RELEASED",
    "academicAdmission": "HOLD (Grade9 v4.1 Parity Candidate)",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "sourceOrigin": "NSEJS Custody (Grade9v4.1)"
  },
  {
    "id": "BIO-NSEJS-GEN-05",
    "code": "BIO-NSEJS-GEN-05",
    "title": "NSEJS / Junior Science Biology \u00b7 Q05 \u00b7 MODEL \u00b7 D2 (Score 4)",
    "subjectCode": "BIO",
    "subject": "Biology",
    "topicCode": "GENETICS",
    "topic": "Reproduction & Mendelian Heredity",
    "subtopic": "BIO-PLANT-PHYSIOLOGY",
    "exam": "NSEJS",
    "year": 2024,
    "paper": "NSEJS Core 2",
    "questionNumber": "05",
    "section": "Junior Science Olympiad",
    "markingScheme": "+3 / -1",
    "isCompetitive": true,
    "difficultyBand": "D2",
    "difficultyScore": 4,
    "difficultyBasis": "Cognitive demand score determined by 5-component QRT rubric.",
    "cognitiveComponents": {
      "concept_model_selection": 1,
      "representation_translation": 1,
      "reasoning_chain_length": 1,
      "algebra_computational_load": 0,
      "trap_exception_sensitivity": 1
    },
    "qrtDemand": "MODEL",
    "role": "CORE2",
    "kind": "SINGLE_CHOICE",
    "stem": "A short-day plant (SDP) with a critical dark period of $9.0\\text{ hours}$ is exposed to a light regimen of $14\\text{ hours light}$ and $10\\text{ hours darkness}$. In one experiment, the $10\\text{ hour}$ dark phase is interrupted in the middle by a $2\\text{ minute}$ flash of red light ($660\\text{ nm}$). In a second experiment, this red flash is immediately followed by a $2\\text{ minute}$ flash of far-red light ($730\\text{ nm}$). What are the flowering responses in the two experiments?",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) Experiment 1: Fails to flower; Experiment 2: Flowers successfully"
      },
      {
        "id": "opt-B",
        "text": "(B) Experiment 1: Flowers successfully; Experiment 2: Fails to flower"
      },
      {
        "id": "opt-C",
        "text": "(C) Both experiments fail to flower"
      },
      {
        "id": "opt-D",
        "text": "(D) Both experiments flower successfully"
      }
    ],
    "hints": [
      "[H1 (Requirement for SDP Flowering): What governs flowering in short-day plants?] Short-day plants are actually 'long-night plants'; they require a continuous, uninterrupted dark period equal to or exceeding the critical night length (here 9.0 h).",
      "[H2 (Phytochrome Interconversion): What happens when phytochrome absorbs red (660 nm) vs far-red (730 nm) light?] Red light (660 nm) converts inactive Pr into active Pfr. Pfr inhibits flowering in short-day plants. Far-red light (730 nm) converts Pfr back into inactive Pr.",
      "[H3 (Crux Move): Determine the final phytochrome form in both experiments.] Crux Move: In Exp 1, the night break leaves Pfr, preventing flowering. In Exp 2, the subsequent far-red flash photoreverses Pfr back to Pr, resetting the dark clock and permitting flowering."
    ],
    "steps": [
      "1. System Representation & Setup: An SDP requires >= 9.0 h continuous uninterrupted darkness. The baseline provides 10.0 h darkness (> 9.0 h).",
      "2. Physical Model & Formulation: A brief flash of red light (660 nm) converts inactive Pr into active Pfr. In SDPs, presence of Pfr during the critical night suppresses florigen synthesis, aborting flowering (Experiment 1 fails).",
      "3. Execution & Resolution: When red light is immediately followed by far-red light (730 nm), Pfr is photoconverted back into Pr. Because the final light signal is far-red, no active Pfr remains to inhibit flowering, allowing the plant to flower (Experiment 2 succeeds). Option A."
    ],
    "check": "Independent check: Classic Borthwick-Hendricks phytochrome photoreversibility: the wavelength of the final flash determines the biological response. Final far-red = Pr active state = flowering in SDPs. Confirmed.",
    "limitingCheck": "Independent check: Classic Borthwick-Hendricks phytochrome photoreversibility: the wavelength of the final flash determines the biological response. Final far-red = Pr active state = flowering in SDPs. Confirmed.",
    "trapWarning": "Fault N09 Answer Isolation: Raw key withheld client-side; formative reasoning steps provided.",
    "correctKey": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "figures": [],
    "linkedCoreRoles": [
      "CORE1A",
      "CORE1B",
      "CORE2A",
      "CORE2B"
    ],
    "primaryCapabilityRef": "BIO-PLANT-MODEL-Q05",
    "status": "RELEASED",
    "academicAdmission": "HOLD (Grade9 v4.1 Parity Candidate)",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "sourceOrigin": "NSEJS Custody (Grade9v4.1)"
  },
  {
    "id": "BIO-NSEJS-GEN-06",
    "code": "BIO-NSEJS-GEN-06",
    "title": "NSEJS / Junior Science Biology \u00b7 Q06 \u00b7 SYNTHESIZE \u00b7 D2 (Score 5)",
    "subjectCode": "BIO",
    "subject": "Biology",
    "topicCode": "GENETICS",
    "topic": "Reproduction & Mendelian Heredity",
    "subtopic": "BIO-PHYSIOLOGY",
    "exam": "NSEJS",
    "year": 2024,
    "paper": "NSEJS Core 2",
    "questionNumber": "06",
    "section": "Junior Science Olympiad",
    "markingScheme": "+3 / -1",
    "isCompetitive": true,
    "difficultyBand": "D2",
    "difficultyScore": 5,
    "difficultyBasis": "Cognitive demand score determined by 5-component QRT rubric.",
    "cognitiveComponents": {
      "concept_model_selection": 1,
      "representation_translation": 1,
      "reasoning_chain_length": 1,
      "algebra_computational_load": 1,
      "trap_exception_sensitivity": 1
    },
    "qrtDemand": "SYNTHESIZE",
    "role": "CORE2",
    "kind": "SINGLE_CHOICE",
    "stem": "Following a carbohydrate-rich meal, human blood glucose rises from baseline ($90\\text{ mg/dL}$) to $150\\text{ mg/dL}$, triggering endocrine secretion. Later during fasting, glucose falls to $70\\text{ mg/dL}$. Which statement correctly identifies the pancreatic endocrine cell types, their secreted hormones, and their primary biochemical target mechanisms during these two physiological states?",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) Hyperglycemia stimulates pancreatic beta-cells to secrete insulin, promoting GLUT-4 translocation, hepatic glycogenesis, and cellular glucose uptake; hypoglycemia stimulates alpha-cells to secrete glucagon, activating hepatic glycogenolysis and gluconeogenesis."
      },
      {
        "id": "opt-B",
        "text": "(B) Hyperglycemia stimulates alpha-cells to secrete insulin, while hypoglycemia stimulates beta-cells to secrete glucagon."
      },
      {
        "id": "opt-C",
        "text": "(C) Insulin activates glycogenolysis in skeletal muscle to release free glucose into the blood stream."
      },
      {
        "id": "opt-D",
        "text": "(D) Glucagon directly stimulates adipocytes to absorb excess circulating glucose as triglycerides."
      }
    ],
    "hints": [
      "[H1 (Islet of Langerhans Cell Types): Distinguish beta-cells from alpha-cells.] Beta-cells produce insulin in response to elevated blood glucose. Alpha-cells produce glucagon in response to low blood glucose.",
      "[H2 (Cellular Action of Insulin): How does insulin facilitate glucose entry into muscle and fat?] Insulin receptor activation stimulates intracellular vesicles containing GLUT-4 glucose transporters to fuse with the plasma membrane.",
      "[H3 (Crux Move): Contrast hepatic glycogenolysis with glycogenesis.] Crux Move: Insulin triggers glycogenesis in liver and muscles; glucagon acts on liver hepatocytes to stimulate glycogen breakdown (glycogenolysis) and gluconeogenesis."
    ],
    "steps": [
      "1. System Representation & Setup: Blood glucose homeostasis oscillates between post-prandial hyperglycemia (150 mg/dL) and fasting hypoglycemia (70 mg/dL).",
      "2. Physical Model & Formulation: Elevated blood glucose is detected by beta-cells in the Islets of Langerhans, stimulating exocytosis of insulin. Insulin promotes glucose uptake via GLUT-4 translocation in skeletal muscle/adipose tissue and promotes glycogen synthesis (glycogenesis) in hepatocytes.",
      "3. Execution & Resolution: In hypoglycemia, alpha-cells secrete glucagon. Glucagon binds GPCRs on hepatocytes, raising cAMP to activate glycogen phosphorylase (glycogenolysis) and gluconeogenic enzymes, restoring circulating glucose to 90 mg/dL. Option A."
    ],
    "check": "Independent check: Muscle lacks glucose-6-phosphatase, so muscle glycogen cannot be released directly into blood (refuting distractor C). Glucagon raises blood glucose (refuting D). Option A confirmed.",
    "limitingCheck": "Independent check: Muscle lacks glucose-6-phosphatase, so muscle glycogen cannot be released directly into blood (refuting distractor C). Glucagon raises blood glucose (refuting D). Option A confirmed.",
    "trapWarning": "Fault N09 Answer Isolation: Raw key withheld client-side; formative reasoning steps provided.",
    "correctKey": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "figures": [],
    "linkedCoreRoles": [
      "CORE1A",
      "CORE1B",
      "CORE2A",
      "CORE2B"
    ],
    "primaryCapabilityRef": "BIO-PHYS-SYNTH-Q06",
    "status": "RELEASED",
    "academicAdmission": "HOLD (Grade9 v4.1 Parity Candidate)",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "sourceOrigin": "NSEJS Custody (Grade9v4.1)"
  },
  {
    "id": "BIO-NSEJS-GEN-07",
    "code": "BIO-NSEJS-GEN-07",
    "title": "NSEJS / Junior Science Biology \u00b7 Q07 \u00b7 APPLY \u00b7 D2 (Score 3)",
    "subjectCode": "BIO",
    "subject": "Biology",
    "topicCode": "GENETICS",
    "topic": "Reproduction & Mendelian Heredity",
    "subtopic": "BIO-GENETICS",
    "exam": "NSEJS",
    "year": 2024,
    "paper": "NSEJS Core 2",
    "questionNumber": "07",
    "section": "Junior Science Olympiad",
    "markingScheme": "+3 / -1",
    "isCompetitive": true,
    "difficultyBand": "D2",
    "difficultyScore": 3,
    "difficultyBasis": "Cognitive demand score determined by 5-component QRT rubric.",
    "cognitiveComponents": {
      "concept_model_selection": 1,
      "representation_translation": 0,
      "reasoning_chain_length": 1,
      "algebra_computational_load": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "APPLY",
    "role": "CORE2",
    "kind": "SINGLE_CHOICE",
    "stem": "Red-green color blindness is an X-linked recessive condition ($X^c$). A man with normal color vision ($X^C Y$) marries a woman with normal vision whose father was color-blind ($X^c Y$). If this couple has four children (two sons and two daughters), what is the probability that their first son will be color-blind, and what is the probability that any given daughter will be color-blind?",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) Probability for a son = 50.0%; Probability for a daughter = 0.0%"
      },
      {
        "id": "opt-B",
        "text": "(B) Probability for a son = 25.0%; Probability for a daughter = 25.0%"
      },
      {
        "id": "opt-C",
        "text": "(C) Probability for a son = 50.0%; Probability for a daughter = 50.0%"
      },
      {
        "id": "opt-D",
        "text": "(D) Probability for a son = 100.0%; Probability for a daughter = 0.0%"
      }
    ],
    "hints": [
      "[H1 (Genotype of the Mother): Deduce the mother's genotype from her father's phenotype.] The mother has normal vision but inherited an X chromosome from her color-blind father (X^c Y), so she must be a heterozygous carrier: X^C X^c.",
      "[H2 (Sons' Inheritance): Which sex chromosome does a son inherit from each parent?] A son inherits Y from the normal father and either X^C or X^c from the mother with 50% probability.",
      "[H3 (Crux Move): Daughters' inheritance and phenotype.] Crux Move: Every daughter receives X^C from the father. Because X^C is dominant, 100% of daughters have normal color vision (probability of affected daughter = 0.0%)."
    ],
    "steps": [
      "1. System Representation & Setup: Father has genotype X^C Y. Mother has normal vision with a color-blind father (X^c Y), establishing her carrier genotype as X^C X^c.",
      "2. Physical Model & Formulation: Cross is X^C Y x X^C X^c. Male progeny genotypes: 1/2 X^C Y (normal vision), 1/2 X^c Y (color-blind). Female progeny genotypes: 1/2 X^C X^C (normal homozygous), 1/2 X^C X^c (normal carrier).",
      "3. Execution & Resolution: For any given son, probability of color blindness is 1/2 = 50.0%. For any given daughter, because she always receives the dominant X^C allele from her father, probability of color blindness is 0.0%. Option A."
    ],
    "check": "Independent check: Sons inherit X strictly from mother; carrier mother gives 50% risk. Daughters inherit normal X from father, masking any maternal recessive allele. Option A confirmed.",
    "limitingCheck": "Independent check: Sons inherit X strictly from mother; carrier mother gives 50% risk. Daughters inherit normal X from father, masking any maternal recessive allele. Option A confirmed.",
    "trapWarning": "Fault N09 Answer Isolation: Raw key withheld client-side; formative reasoning steps provided.",
    "correctKey": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "figures": [],
    "linkedCoreRoles": [
      "CORE1A",
      "CORE1B",
      "CORE2A",
      "CORE2B"
    ],
    "primaryCapabilityRef": "BIO-GEN-APPLY-Q07",
    "status": "RELEASED",
    "academicAdmission": "HOLD (Grade9 v4.1 Parity Candidate)",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "sourceOrigin": "NSEJS Custody (Grade9v4.1)"
  },
  {
    "id": "BIO-NSEJS-GEN-08",
    "code": "BIO-NSEJS-GEN-08",
    "title": "NSEJS / Junior Science Biology \u00b7 Q08 \u00b7 MODEL \u00b7 D2 (Score 4)",
    "subjectCode": "BIO",
    "subject": "Biology",
    "topicCode": "GENETICS",
    "topic": "Reproduction & Mendelian Heredity",
    "subtopic": "BIO-MOLECULAR-BIOLOGY",
    "exam": "NSEJS",
    "year": 2024,
    "paper": "NSEJS Core 2",
    "questionNumber": "08",
    "section": "Junior Science Olympiad",
    "markingScheme": "+3 / -1",
    "isCompetitive": true,
    "difficultyBand": "D2",
    "difficultyScore": 4,
    "difficultyBasis": "Cognitive demand score determined by 5-component QRT rubric.",
    "cognitiveComponents": {
      "concept_model_selection": 1,
      "representation_translation": 0,
      "reasoning_chain_length": 1,
      "algebra_computational_load": 1,
      "trap_exception_sensitivity": 1
    },
    "qrtDemand": "MODEL",
    "role": "CORE2",
    "kind": "SINGLE_CHOICE",
    "stem": "A double-stranded DNA duplex contains 2000 base pairs ($4000$ total nucleotides). Biochemical analysis reveals that Adenine accounts for $28.0\\%$ of the total nitrogenous bases in the molecule. Calculate the total number of Guanine nucleotides present in this DNA molecule and the total number of hydrogen bonds stabilizing the duplex.",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) Guanine nucleotides = 880; Total hydrogen bonds = 4880"
      },
      {
        "id": "opt-B",
        "text": "(B) Guanine nucleotides = 1120; Total hydrogen bonds = 5120"
      },
      {
        "id": "opt-C",
        "text": "(C) Guanine nucleotides = 880; Total hydrogen bonds = 5120"
      },
      {
        "id": "opt-D",
        "text": "(D) Guanine nucleotides = 440; Total hydrogen bonds = 4880"
      }
    ],
    "hints": [
      "[H1 (Chargaff's Rules): Relate base proportions in double-stranded DNA.] By Chargaff's rules, %A = %T and %G = %C. %A + %T + %G + %C = 100%.",
      "[H2 (Count Guanine Bases): Calculate percentage and absolute count of Guanine.] %A = 28% => %T = 28%. Total A+T = 56%. Remaining G+C = 44% => %G = 22%. Total nucleotides = 4000, so G = 0.22 * 4000 = 880.",
      "[H3 (Crux Move): Calculate total hydrogen bonds in base pairs.] Crux Move: A-T pairs have 2 hydrogen bonds; G-C pairs have 3 hydrogen bonds. Total H-bonds = 2 * (1120) + 3 * (880) = 2240 + 2640 = 4880."
    ],
    "steps": [
      "1. System Representation & Setup: A 2000 bp (4000 nucleotides) double-stranded DNA molecule has 28.0% Adenine. We determine the count of Guanine and total hydrogen bonds.",
      "2. Physical Model & Formulation: In dsDNA: [A] = [T] = 28.0% (1120 bases each, forming 1120 A-T base pairs). [G] = [C] = (100% - 56.0%) / 2 = 22.0% (880 bases each, forming 880 G-C base pairs).",
      "3. Execution & Resolution: Count of Guanine = 880 nucleotides. Hydrogen bonds = 2 * (N_AT) + 3 * (N_GC) = 2 * 1120 + 3 * 880 = 2240 + 2640 = 4880 hydrogen bonds. Option A."
    ],
    "check": "Independent check: Total bp = 1120 + 880 = 2000 bp. H-bonds = 2240 + 2640 = 4880. Confirmed.",
    "limitingCheck": "Independent check: Total bp = 1120 + 880 = 2000 bp. H-bonds = 2240 + 2640 = 4880. Confirmed.",
    "trapWarning": "Fault N09 Answer Isolation: Raw key withheld client-side; formative reasoning steps provided.",
    "correctKey": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "figures": [],
    "linkedCoreRoles": [
      "CORE1A",
      "CORE1B",
      "CORE2A",
      "CORE2B"
    ],
    "primaryCapabilityRef": "BIO-MOL-MODEL-Q08",
    "status": "RELEASED",
    "academicAdmission": "HOLD (Grade9 v4.1 Parity Candidate)",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "sourceOrigin": "NSEJS Custody (Grade9v4.1)"
  },
  {
    "id": "BIO-NSEJS-GEN-09",
    "code": "BIO-NSEJS-GEN-09",
    "title": "NSEJS / Junior Science Biology \u00b7 Q09 \u00b7 JUSTIFY \u00b7 D2 (Score 4)",
    "subjectCode": "BIO",
    "subject": "Biology",
    "topicCode": "GENETICS",
    "topic": "Reproduction & Mendelian Heredity",
    "subtopic": "BIO-MOLECULAR-BIOLOGY",
    "exam": "NSEJS",
    "year": 2024,
    "paper": "NSEJS Core 2",
    "questionNumber": "09",
    "section": "Junior Science Olympiad",
    "markingScheme": "+3 / -1",
    "isCompetitive": true,
    "difficultyBand": "D2",
    "difficultyScore": 4,
    "difficultyBasis": "Cognitive demand score determined by 5-component QRT rubric.",
    "cognitiveComponents": {
      "concept_model_selection": 1,
      "representation_translation": 1,
      "reasoning_chain_length": 1,
      "algebra_computational_load": 0,
      "trap_exception_sensitivity": 1
    },
    "qrtDemand": "JUSTIFY",
    "role": "CORE2",
    "kind": "SINGLE_CHOICE",
    "stem": "Sickle-cell anemia is an autosomal recessive disorder caused by a single base-pair substitution (point mutation) in the gene encoding the $\\beta$-globin chain of hemoglobin. Which statement correctly identifies the nature of this mutation at the DNA, mRNA, and polypeptide levels, and explains why it causes sickling of erythrocytes under low oxygen tension?",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) A transversion point mutation replaces adenine with thymine in the coding strand (GAG -> GTG), producing a GUG codon in mRNA that substitutes polar, hydrophilic glutamic acid with non-polar, hydrophobic valine at position 6; under low pO2, deoxygenated HbS polymerizes into fibrous insoluble polymers that distort RBCs into sickle shapes."
      },
      {
        "id": "opt-B",
        "text": "(B) A frameshift insertion of a single nucleotide disrupts the downstream reading frame, producing a truncated non-functional hemoglobin protein."
      },
      {
        "id": "opt-C",
        "text": "(C) A transition mutation replaces cytosine with guanine (CTC -> CGC), producing an arginine substitution that prevents iron binding in the heme group."
      },
      {
        "id": "opt-D",
        "text": "(D) A nonsense mutation introduces a premature stop codon (UAA) at position 6, terminating translation of the beta-globin chain."
      }
    ],
    "hints": [
      "[H1 (Mutation Classification): Is A -> T a transition or transversion?] Purine (A) to pyrimidine (T) is a transversion mutation. Coding strand changes from GAG to GTG (template CTC to CAC).",
      "[H2 (Codon and Amino Acid Shift): What amino acid does GUG encode?] GAG encodes glutamic acid (negatively charged/hydrophilic). GUG encodes valine (hydrophobic/non-polar) at position 6 of the beta-chain.",
      "[H3 (Crux Move): Hydrophobic interaction under deoxygenation.] Crux Move: Deoxy-HbS exposes hydrophobic valine patches that adhere to complementary hydrophobic pockets on adjacent beta-chains, polymerizing into rigid fibers that sickle the cell."
    ],
    "steps": [
      "1. System Representation & Setup: Sickle-cell anemia is a classic monogenic hemoglobinopathy. We evaluate the molecular pathology at DNA, RNA, and protein tiers.",
      "2. Physical Model & Formulation: Normal beta-globin gene has coding triplet GAG (template CTC), transcribed to GAG mRNA, specifying Glutamic acid (Glu) at position 6. In HbS, transversion A -> T yields GTG (template CAC), transcribed to GUG mRNA, specifying Valine (Val).",
      "3. Execution & Resolution: Replacing hydrophilic glutamate with hydrophobic valine creates an abnormal sticky patch on the exterior surface of the deoxygenated hemoglobin tetramer, causing self-assembly into 14-strand helical filaments that mechanically deform erythrocytes into sickle shapes. Option A."
    ],
    "check": "Independent check: Purine <-> Pyrimidine is a transversion. Glu (polar acidic) -> Val (non-polar aliphatic) at position 6 of beta-globin chain is the textbook lesion for HbS. Option A confirmed.",
    "limitingCheck": "Independent check: Purine <-> Pyrimidine is a transversion. Glu (polar acidic) -> Val (non-polar aliphatic) at position 6 of beta-globin chain is the textbook lesion for HbS. Option A confirmed.",
    "trapWarning": "Fault N09 Answer Isolation: Raw key withheld client-side; formative reasoning steps provided.",
    "correctKey": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "figures": [],
    "linkedCoreRoles": [
      "CORE1A",
      "CORE1B",
      "CORE2A",
      "CORE2B"
    ],
    "primaryCapabilityRef": "BIO-MOL-JUST-Q09",
    "status": "RELEASED",
    "academicAdmission": "HOLD (Grade9 v4.1 Parity Candidate)",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "sourceOrigin": "NSEJS Custody (Grade9v4.1)"
  },
  {
    "id": "BIO-NSEJS-GEN-10",
    "code": "BIO-NSEJS-GEN-10",
    "title": "NSEJS / Junior Science Biology \u00b7 Q10 \u00b7 APPLY \u00b7 D1 (Score 2)",
    "subjectCode": "BIO",
    "subject": "Biology",
    "topicCode": "GENETICS",
    "topic": "Reproduction & Mendelian Heredity",
    "subtopic": "BIO-ENDOCRINOLOGY",
    "exam": "NSEJS",
    "year": 2024,
    "paper": "NSEJS Core 2",
    "questionNumber": "10",
    "section": "Junior Science Olympiad",
    "markingScheme": "+3 / -1",
    "isCompetitive": true,
    "difficultyBand": "D1",
    "difficultyScore": 2,
    "difficultyBasis": "Cognitive demand score determined by 5-component QRT rubric.",
    "cognitiveComponents": {
      "concept_model_selection": 1,
      "representation_translation": 0,
      "reasoning_chain_length": 1,
      "algebra_computational_load": 0,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "APPLY",
    "role": "CORE2",
    "kind": "SINGLE_CHOICE",
    "stem": "Blood plasma calcium concentration is tightly maintained at approximately $9.0 - 11.0\\text{ mg/dL}$ by the antagonistic actions of two peptide hormones: Parathyroid Hormone (PTH) and Calcitonin. Which of the following correctly pairs each hormone with its gland of origin, physiological trigger, and cellular action on bone and kidneys?",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) Hypocalcemia triggers the parathyroid glands to secrete PTH, which stimulates osteoclastic bone resorption and renal Ca2+ reabsorption; hypercalcemia triggers thyroid parafollicular C-cells to secrete calcitonin, which inhibits osteoclasts and promotes bone mineralization."
      },
      {
        "id": "opt-B",
        "text": "(B) Hypercalcemia triggers parathyroid glands to secrete PTH to deposit excess calcium into bones; hypocalcemia triggers the thyroid gland to secrete calcitonin."
      },
      {
        "id": "opt-C",
        "text": "(C) Both PTH and calcitonin are secreted by the adrenal cortex to regulate aldosterone and potassium channels."
      },
      {
        "id": "opt-D",
        "text": "(D) Calcitonin stimulates renal synthesis of active Vitamin D (calcitriol) while PTH inhibits intestinal calcium absorption."
      }
    ],
    "hints": [
      "[H1 (Parathyroid Hormone Action): What is the physiological purpose of PTH?] PTH is hypercalcemic (raises blood Ca2+). It is released in response to low plasma calcium (hypocalcemia).",
      "[H2 (Calcitonin Action): What is the physiological purpose of Calcitonin?] Calcitonin is hypocalcemic (lowers blood Ca2+). It is secreted by parafollicular C-cells of the thyroid gland in response to high plasma calcium.",
      "[H3 (Crux Move): Target organs and cellular actions.] Crux Move: PTH stimulates bone osteoclasts to dissolve hydroxyapatite and enhances renal Ca2+ reabsorption. Calcitonin inhibits osteoclasts and promotes Ca2+ excretion."
    ],
    "steps": [
      "1. System Representation & Setup: Calcium homeostasis in human blood is regulated between 9-11 mg/dL by negative feedback loops involving PTH and calcitonin.",
      "2. Physical Model & Formulation: When plasma Ca2+ drops below 9.0 mg/dL, chief cells in the parathyroid glands release PTH. PTH stimulates RANKL signaling to activate bone osteoclasts (releasing Ca2+ and phosphate), stimulates renal 1-alpha-hydroxylase to form calcitriol, and increases distal tubule Ca2+ reabsorption.",
      "3. Execution & Resolution: Conversely, when plasma Ca2+ rises above 11.0 mg/dL, parafollicular C-cells in the thyroid gland secrete calcitonin. Calcitonin directly binds osteoclast receptors to arrest bone resorption and inhibits renal calcium reabsorption, returning blood calcium to normal. Option A."
    ],
    "check": "Independent check: PTH = hypercalcemic (raises calcium); Calcitonin = hypocalcemic (tones down calcium). Option A confirmed.",
    "limitingCheck": "Independent check: PTH = hypercalcemic (raises calcium); Calcitonin = hypocalcemic (tones down calcium). Option A confirmed.",
    "trapWarning": "Fault N09 Answer Isolation: Raw key withheld client-side; formative reasoning steps provided.",
    "correctKey": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "figures": [],
    "linkedCoreRoles": [
      "CORE1A",
      "CORE1B",
      "CORE2A",
      "CORE2B"
    ],
    "primaryCapabilityRef": "BIO-ENDO-APPLY-Q10",
    "status": "RELEASED",
    "academicAdmission": "HOLD (Grade9 v4.1 Parity Candidate)",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "sourceOrigin": "NSEJS Custody (Grade9v4.1)"
  },
  {
    "id": "BIO-NSEJS-CELL-01",
    "code": "BIO-NSEJS-CELL-01",
    "title": "NSEJS / Junior Science Biology \u00b7 Q01 \u00b7 MODEL \u00b7 D2 (Score 4)",
    "subjectCode": "BIO",
    "subject": "Biology",
    "topicCode": "LIVING_WORLD",
    "topic": "Cell Biology & Molecular Genetics",
    "subtopic": "BIO-ORGANISATION-LIVING-WORLD",
    "exam": "NSEJS",
    "year": 2024,
    "paper": "NSEJS Core 2",
    "questionNumber": "01",
    "section": "Junior Science Olympiad",
    "markingScheme": "+3 / -1",
    "isCompetitive": true,
    "difficultyBand": "D2",
    "difficultyScore": 4,
    "difficultyBasis": "Cognitive demand score determined by 5-component QRT rubric.",
    "cognitiveComponents": {
      "concept_model_selection": 1,
      "representation_translation": 1,
      "reasoning_chain_length": 1,
      "algebra_computational_load": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "MODEL",
    "role": "CORE2",
    "kind": "SINGLE_CHOICE",
    "stem": "In an investigation of plant cell water relations, cylindrical cores of uniform initial mass $m_0 = 5.00\\text{ g}$ from Solanum tuberosum tuber tissue are incubated for 2 hours in a graded series of sucrose solutions at $20^\\circ\\text{C}$ ($293\\text{ K}$). The percentage change in tissue mass $(\\Delta m / m_0) \\times 100\\%$ is determined, intersecting the zero-net-flux baseline at an equilibrium sucrose concentration of $C = 0.25\\text{ M}$.\n[FIG-stem-bio-cell-water-potential]\nUsing the van 't Hoff equation for solute potential:\n$$\\Psi_s = -i C R T$$\n(where ionization constant $i = 1.0$, gas constant $R = 0.0831\\text{ L}\\cdot\\text{bar}/(\\text{mol}\\cdot\\text{K})$, and $T = 293\\text{ K}$), what is the water potential ($\\Psi_w$) of the tuber tissue cells at incipient equilibrium, and what physiological state and turgor pressure ($\\Psi_p$) do these cells attain when subsequently transferred to pure distilled water ($\\Psi_w = 0\\text{ bar}$)?",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) Psi_w = -6.09 bar; cells become fully turgid with Psi_p = +6.09 bar supported by the rigid cell wall"
      },
      {
        "id": "opt-B",
        "text": "(B) Psi_w = -6.09 bar; cells undergo osmotic lysis due to excessive hydrostatic pressure"
      },
      {
        "id": "opt-C",
        "text": "(C) Psi_w = 0 bar; cells remain flaccid with Psi_p = 0 bar"
      },
      {
        "id": "opt-D",
        "text": "(D) Psi_w = -12.18 bar; cells undergo incipient plasmolysis"
      }
    ],
    "hints": [
      "[H1 (Solute Potential Calculation): Apply van 't Hoff equation for C = 0.25 M.] Psi_s = - i * C * R * T = - (1.0) * (0.25 mol/L) * (0.0831 L.bar/(mol.K)) * (293 K) = - 6.09 bar.",
      "[H2 (Tissue Equilibrium): Relate external solution water potential to tissue water potential.] At zero net mass flux in an open beaker (Psi_p = 0), Psi_w(tissue) = Psi_w(solution) = Psi_s = - 6.09 bar.",
      "[H3 (Crux Move): Determine the final turgid equilibrium in pure water.] Crux Move: In pure water (Psi_w = 0), water enters until inward cell wall pressure equals turgor pressure: Psi_w = Psi_s + Psi_p = 0 => Psi_p = + 6.09 bar. The cellulose wall prevents lysis."
    ],
    "steps": [
      "1. System Representation & Setup: Potato tuber cores at zero net mass change in C = 0.25 M sucrose establish dynamic osmotic equilibrium.",
      "2. Physical Model & Formulation: In an open container, Psi_p = 0 bar => Psi_w = Psi_s = - i C R T = -(1.0)(0.25)(0.0831)(293) = -6.09 bar. At equilibrium, Psi_w(tissue) = -6.09 bar.",
      "3. Execution & Resolution: In pure water (Psi_w = 0 bar), endosmosis drives water into cells until wall pressure generates turgor Psi_p = - Psi_s = +6.09 bar. The rigid cell wall prevents lysis, resulting in fully turgid cells. Option A."
    ],
    "check": "Biophysical sanity check: Animal cells burst in hypotonic water due to absence of cell walls, while plant cells attain maximum turgor Psi_p = -Psi_s, balancing net influx to zero. Option A is rigorously confirmed.",
    "limitingCheck": "Biophysical sanity check: Animal cells burst in hypotonic water due to absence of cell walls, while plant cells attain maximum turgor Psi_p = -Psi_s, balancing net influx to zero. Option A is rigorously confirmed.",
    "trapWarning": "Fault N09 Answer Isolation: Raw key withheld client-side; formative reasoning steps provided.",
    "correctKey": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "figures": [
      {
        "id": "fig_bio_water_potential.svg",
        "caption": "Plant cell water potential equilibrium and turgor curve.",
        "available": true
      }
    ],
    "linkedCoreRoles": [
      "CORE1A",
      "CORE1B",
      "CORE2A",
      "CORE2B"
    ],
    "primaryCapabilityRef": "BIO-CELL-MODEL-Q01",
    "status": "RELEASED",
    "academicAdmission": "HOLD (Grade9 v4.1 Parity Candidate)",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "sourceOrigin": "NSEJS Custody (Grade9v4.1)"
  },
  {
    "id": "BIO-NSEJS-CELL-02",
    "code": "BIO-NSEJS-CELL-02",
    "title": "NSEJS / Junior Science Biology \u00b7 Q02 \u00b7 REPRESENT \u00b7 D1 (Score 2)",
    "subjectCode": "BIO",
    "subject": "Biology",
    "topicCode": "LIVING_WORLD",
    "topic": "Cell Biology & Molecular Genetics",
    "subtopic": "BIO-ORGANISATION-LIVING-WORLD",
    "exam": "NSEJS",
    "year": 2024,
    "paper": "NSEJS Core 2",
    "questionNumber": "02",
    "section": "Junior Science Olympiad",
    "markingScheme": "+3 / -1",
    "isCompetitive": true,
    "difficultyBand": "D1",
    "difficultyScore": 2,
    "difficultyBasis": "Cognitive demand score determined by 5-component QRT rubric.",
    "cognitiveComponents": {
      "concept_model_selection": 1,
      "representation_translation": 1,
      "reasoning_chain_length": 0,
      "algebra_computational_load": 0,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "REPRESENT",
    "role": "CORE2",
    "kind": "SINGLE_CHOICE",
    "stem": "In a pulse-chase autoradiography experiment on pancreatic acinar cells, cells are briefly exposed to radioactive $[^{35}\\text{S}]$-methionine ('pulse') and subsequently chased with non-radioactive amino acids. The intracellular location of radioactive digestive enzymes (such as zymogen precursors) is tracked at successive time intervals.\nWhich of the following represents the strictly correct chronological sequence of intracellular organelles and vesicles traversed by these secretory proteins from synthesis to secretion?",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) Rough Endoplasmic Reticulum -> Transport Vesicles -> cis-Golgi -> trans-Golgi -> Secretory Granules -> Plasma Membrane (Exocytosis)"
      },
      {
        "id": "opt-B",
        "text": "(B) Free Cytosolic Ribosomes -> trans-Golgi -> cis-Golgi -> Lysosomes -> Plasma Membrane"
      },
      {
        "id": "opt-C",
        "text": "(C) Smooth Endoplasmic Reticulum -> Golgi Apparatus -> Peroxisomes -> Plasma Membrane"
      },
      {
        "id": "opt-D",
        "text": "(D) Rough Endoplasmic Reticulum -> Nuclear Pore Complexes -> Secretory Granules -> Plasma Membrane"
      }
    ],
    "hints": [
      "[H1 (Site of Synthesis): Where are secretory proteins co-translationally inserted?] Secretory proteins have an N-terminal signal sequence directing synthesis to ribosomes on the Rough Endoplasmic Reticulum (RER).",
      "[H2 (Golgi Polarity): In which direction do proteins traverse the Golgi apparatus?] Proteins enter via transport vesicles at the cis-face (forming face) and exit at the trans-face (maturing face).",
      "[H3 (Crux Move): Trace the final vesicular release.] Crux Move: Secretory granules/vesicles bud from the trans-Golgi network, migrate to the cell surface, and undergo exocytosis across the plasma membrane."
    ],
    "steps": [
      "1. System Representation & Setup: Palade pulse-chase tracking of secretory proteins labeled with 35S-methionine in acinar cells.",
      "2. Physical Model & Formulation: Synthesis occurs on membrane-bound RER ribosomes, packaging into COPII transport vesicles moving to cis-Golgi cisternae.",
      "3. Execution & Resolution: Glycosylation/sorting occurs through medial to trans-Golgi, followed by condensing vacuole formation into secretory granules, fusing with the plasma membrane via regulated exocytosis. Option A."
    ],
    "check": "Palade Nobel Prize (1974) classical secretory pathway: RER -> Golgi (cis to trans) -> Secretory vesicles -> Exocytosis. Confirmed.",
    "limitingCheck": "Palade Nobel Prize (1974) classical secretory pathway: RER -> Golgi (cis to trans) -> Secretory vesicles -> Exocytosis. Confirmed.",
    "trapWarning": "Fault N09 Answer Isolation: Raw key withheld client-side; formative reasoning steps provided.",
    "correctKey": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "figures": [],
    "linkedCoreRoles": [
      "CORE1A",
      "CORE1B",
      "CORE2A",
      "CORE2B"
    ],
    "primaryCapabilityRef": "BIO-CELL-REPRESENT-Q02",
    "status": "RELEASED",
    "academicAdmission": "HOLD (Grade9 v4.1 Parity Candidate)",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "sourceOrigin": "NSEJS Custody (Grade9v4.1)"
  },
  {
    "id": "BIO-NSEJS-CELL-03",
    "code": "BIO-NSEJS-CELL-03",
    "title": "NSEJS / Junior Science Biology \u00b7 Q03 \u00b7 EXPLAIN \u00b7 D1 (Score 2)",
    "subjectCode": "BIO",
    "subject": "Biology",
    "topicCode": "LIVING_WORLD",
    "topic": "Cell Biology & Molecular Genetics",
    "subtopic": "BIO-ORGANISATION-LIVING-WORLD",
    "exam": "NSEJS",
    "year": 2024,
    "paper": "NSEJS Core 2",
    "questionNumber": "03",
    "section": "Junior Science Olympiad",
    "markingScheme": "+3 / -1",
    "isCompetitive": true,
    "difficultyBand": "D1",
    "difficultyScore": 2,
    "difficultyBasis": "Cognitive demand score determined by 5-component QRT rubric.",
    "cognitiveComponents": {
      "concept_model_selection": 1,
      "representation_translation": 0,
      "reasoning_chain_length": 1,
      "algebra_computational_load": 0,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "EXPLAIN",
    "role": "CORE2",
    "kind": "SINGLE_CHOICE",
    "stem": "Mitochondria and chloroplasts are regarded as semiautonomous organelles that evolved through ancient endosymbiosis of ancestral prokaryotes with primitive eukaryotic host cells. Which of the following sets of biochemical characteristics correctly provides direct evidence in support of this endosymbiotic origin?",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) Closed circular naked DNA, 70S ribosomes sensitive to chloramphenicol, and division via binary fission independent of host nuclear mitosis"
      },
      {
        "id": "opt-B",
        "text": "(B) Linear histoned DNA, 80S ribosomes sensitive to cycloheximide, and division coordinated with spindle fibers"
      },
      {
        "id": "opt-C",
        "text": "(C) Single phospholipid membrane, 70S ribosomes, and synthesis of all internal proteins directly in the nucleus"
      },
      {
        "id": "opt-D",
        "text": "(D) Absence of internal RNA, peptidoglycan cell walls, and reproduction via meiotic budding"
      }
    ],
    "hints": [
      "[H1 (Genome Architecture): What is the physical structure of mitochondrial and plastid genomes?] Mitochondria and chloroplasts have circular double-stranded DNA genomes lacking histones, analogous to bacterial chromosomes.",
      "[H2 (Ribosome Svedberg Coefficient): What type of ribosomes do these organelles contain?] They contain 70S ribosomes (inhibited by bacterial antibiotics like chloramphenicol, not eukaryotic cycloheximide).",
      "[H3 (Crux Move): How do these organelles multiply?] Crux Move: They divide autonomously by binary fission rather than eukaryotic mitosis. Option A uniquely compiles all endosymbiotic evidence."
    ],
    "steps": [
      "1. System Representation & Setup: Endosymbiotic theory posits mitochondria derived from aerobic alpha-proteobacteria and chloroplasts from photosynthetic cyanobacteria.",
      "2. Physical Model & Formulation: Symbiont diagnostic markers include double membranes (inner host-free bacterial membrane with cardiolipin), circular DNA, 70S ribosomes, and binary fission.",
      "3. Execution & Resolution: Both organelles divide autonomously via binary fission, encode circular genomes without histones, and utilize 70S ribosomes sensitive to chloramphenicol. Option A."
    ],
    "check": "Evolutionary cytological check: Mitochondria and chloroplasts retain bacterial-type 70S translation and circular genome replication, confirming Option A.",
    "limitingCheck": "Evolutionary cytological check: Mitochondria and chloroplasts retain bacterial-type 70S translation and circular genome replication, confirming Option A.",
    "trapWarning": "Fault N09 Answer Isolation: Raw key withheld client-side; formative reasoning steps provided.",
    "correctKey": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "figures": [],
    "linkedCoreRoles": [
      "CORE1A",
      "CORE1B",
      "CORE2A",
      "CORE2B"
    ],
    "primaryCapabilityRef": "BIO-CELL-EXPLAIN-Q03",
    "status": "RELEASED",
    "academicAdmission": "HOLD (Grade9 v4.1 Parity Candidate)",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "sourceOrigin": "NSEJS Custody (Grade9v4.1)"
  },
  {
    "id": "BIO-NSEJS-CELL-04",
    "code": "BIO-NSEJS-CELL-04",
    "title": "NSEJS / Junior Science Biology \u00b7 Q04 \u00b7 JUSTIFY \u00b7 D2 (Score 4)",
    "subjectCode": "BIO",
    "subject": "Biology",
    "topicCode": "LIVING_WORLD",
    "topic": "Cell Biology & Molecular Genetics",
    "subtopic": "BIO-ORGANISATION-LIVING-WORLD",
    "exam": "NSEJS",
    "year": 2024,
    "paper": "NSEJS Core 2",
    "questionNumber": "04",
    "section": "Junior Science Olympiad",
    "markingScheme": "+3 / -1",
    "isCompetitive": true,
    "difficultyBand": "D2",
    "difficultyScore": 4,
    "difficultyBasis": "Cognitive demand score determined by 5-component QRT rubric.",
    "cognitiveComponents": {
      "concept_model_selection": 2,
      "representation_translation": 0,
      "reasoning_chain_length": 1,
      "algebra_computational_load": 0,
      "trap_exception_sensitivity": 1
    },
    "qrtDemand": "JUSTIFY",
    "role": "CORE2",
    "kind": "SINGLE_CHOICE",
    "stem": "Xylem and phloem are complex permanent tissues that mediate long-distance vascular transport in angiosperms. A student analyzes cross-sections of stem vascular bundles under high magnification and observes distinct cytological and functional differences.\nWhich of the following comparisons between xylem tracheary elements (vessels/tracheids) and phloem sieve tube elements is strictly accurate regarding their living state at functional maturity, cell wall composition, and directional driving mechanism?",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) Xylem vessels are dead at maturity with lignified walls transporting sap under negative hydrostatic pressure; Sieve tube elements are living at maturity (lacking nuclei) with cellulose walls transporting assimilate sap under positive hydrostatic pressure."
      },
      {
        "id": "opt-B",
        "text": "(B) Xylem vessels are living at maturity with thin cellulose walls operating by active ATP pumps; Sieve tube elements are dead at maturity with lignified walls operating by capillary action."
      },
      {
        "id": "opt-C",
        "text": "(C) Both xylem vessels and sieve tube elements are dead hollow conduits at functional maturity transporting fluids bidirectionally."
      },
      {
        "id": "opt-D",
        "text": "(D) Xylem elements possess prominent nuclei controlling sap ascent; Sieve tube elements lack cytoplasm entirely and rely on companion cell lignification."
      }
    ],
    "hints": [
      "[H1 (Xylem Characteristics): What happens to xylem vessels at functional maturity?] Vessel elements undergo programmed cell death (PCD), lose their protoplasts, and deposit secondary lignified walls to withstand negative pressure (transpiration pull).",
      "[H2 (Phloem Characteristics): Are sieve tube elements alive?] Sieve tube elements remain living with functional plasma membranes and cytoplasm, but degenerate their nuclei, vacuole, and ribosomes to facilitate bulk flow.",
      "[H3 (Crux Move): Compare the physical driving forces.] Crux Move: Transpiration cohesion-tension creates negative tension in xylem, while M\u00fcnch pressure flow creates positive turgor pressure in phloem. Option A."
    ],
    "steps": [
      "1. System Representation & Setup: Vascular tissue comparison between tracheary elements (water/mineral transport) and sieve tube elements (photosynthate translocation).",
      "2. Physical Model & Formulation: Tracheary elements must be dead and hollow with lignified walls to prevent collapse under tensiles exceeding -1.5 MPa. Sieve tubes require living semipermeable membranes to maintain osmotic pressure gradients for mass flow.",
      "3. Execution & Resolution: Xylem vessels: dead at maturity, lignified, negative pressure. Phloem sieve tubes: living (enucleated), non-lignified primary cellulose walls, positive hydrostatic pressure. Option A."
    ],
    "check": "Biophysical mechanics check: Negative pressure in xylem would rupture unlignified walls; living membranes in phloem are necessary for active sucrose loading. Option A confirmed.",
    "limitingCheck": "Biophysical mechanics check: Negative pressure in xylem would rupture unlignified walls; living membranes in phloem are necessary for active sucrose loading. Option A confirmed.",
    "trapWarning": "Fault N09 Answer Isolation: Raw key withheld client-side; formative reasoning steps provided.",
    "correctKey": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "figures": [],
    "linkedCoreRoles": [
      "CORE1A",
      "CORE1B",
      "CORE2A",
      "CORE2B"
    ],
    "primaryCapabilityRef": "BIO-CELL-JUSTIFY-Q04",
    "status": "RELEASED",
    "academicAdmission": "HOLD (Grade9 v4.1 Parity Candidate)",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "sourceOrigin": "NSEJS Custody (Grade9v4.1)"
  },
  {
    "id": "BIO-NSEJS-CELL-05",
    "code": "BIO-NSEJS-CELL-05",
    "title": "NSEJS / Junior Science Biology \u00b7 Q05 \u00b7 APPLY \u00b7 D2 (Score 3)",
    "subjectCode": "BIO",
    "subject": "Biology",
    "topicCode": "LIVING_WORLD",
    "topic": "Cell Biology & Molecular Genetics",
    "subtopic": "BIO-ORGANISATION-LIVING-WORLD",
    "exam": "NSEJS",
    "year": 2024,
    "paper": "NSEJS Core 2",
    "questionNumber": "05",
    "section": "Junior Science Olympiad",
    "markingScheme": "+3 / -1",
    "isCompetitive": true,
    "difficultyBand": "D2",
    "difficultyScore": 3,
    "difficultyBasis": "Cognitive demand score determined by 5-component QRT rubric.",
    "cognitiveComponents": {
      "concept_model_selection": 1,
      "representation_translation": 1,
      "reasoning_chain_length": 1,
      "algebra_computational_load": 0,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "APPLY",
    "role": "CORE2",
    "kind": "SINGLE_CHOICE",
    "stem": "A histologist examines three unknown biopsy tissue samples ($T_1, T_2, T_3$) under a light microscope:\n- Sample $T_1$: Cells arranged in a single layer with apical hair-like projections that rhythmically beat to propel mucus across the luminal surface.\n- Sample $T_2$: Widely spaced cells (osteocytes) situated inside concentric fluid-filled spaces (lacunae) within a hard, mineralized matrix of calcium hydroxyapatite and collagen fibers arranged in Haversian systems.\n- Sample $T_3$: A fluid matrix devoid of fibers containing circulating biconcave enucleated cells, nucleated amoeboid cells, and cell fragments.\nIdentify the specific tissue classifications of $T_1, T_2,$ and $T_3$.",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) T1 = Ciliated columnar epithelium; T2 = Compact bone (osseous tissue); T3 = Blood (vascular connective tissue)"
      },
      {
        "id": "opt-B",
        "text": "(B) T1 = Stratified squamous epithelium; T2 = Hyaline cartilage; T3 = Areolar connective tissue"
      },
      {
        "id": "opt-C",
        "text": "(C) T1 = Simple cuboidal epithelium; T2 = Tendon (dense regular connective tissue); T3 = Adipose tissue"
      },
      {
        "id": "opt-D",
        "text": "(D) T1 = Ciliated columnar epithelium; T2 = Spongy bone; T3 = Dense irregular connective tissue"
      }
    ],
    "hints": [
      "[H1 (Sample T1): What tissue features apical cilia propelling mucus?] Ciliated columnar epithelium lines the trachea, bronchi, and fallopian tubes, functioning in directional mucus clearance.",
      "[H2 (Sample T2): What specialized connective tissue exhibits Haversian systems with osteocytes in lacunae?] Compact bone (osseous tissue) possesses osteons (Haversian systems) containing osteocytes within lacunae in mineralized lamellae.",
      "[H3 (Crux Move): What specialized connective tissue has a non-fibrous fluid matrix with erythrocytes and leukocytes?] Crux Move: Blood is a specialized vascular connective tissue with fluid plasma matrix, erythrocytes (biconcave, enucleate in mammals), leukocytes, and platelets. Option A."
    ],
    "steps": [
      "1. System Representation & Setup: Histological identification of three vertebrate tissues based on cytological architecture and extracellular matrix.",
      "2. Physical Model & Formulation: T1: single layer with apical cilia => ciliated columnar epithelium. T2: osteocytes in concentric lacunae with Haversian canals => compact bone. T3: fluid matrix lacking structural fibers with erythrocytes/leukocytes => blood.",
      "3. Execution & Resolution: T1 = ciliated columnar epithelium, T2 = compact bone, T3 = blood. Matches Option A uniquely."
    ],
    "check": "Tissue taxonomy check: Cartilage lacks Haversian canals (chondrocytes in chondrin matrix), eliminating Option B. Option A confirmed.",
    "limitingCheck": "Tissue taxonomy check: Cartilage lacks Haversian canals (chondrocytes in chondrin matrix), eliminating Option B. Option A confirmed.",
    "trapWarning": "Fault N09 Answer Isolation: Raw key withheld client-side; formative reasoning steps provided.",
    "correctKey": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "figures": [],
    "linkedCoreRoles": [
      "CORE1A",
      "CORE1B",
      "CORE2A",
      "CORE2B"
    ],
    "primaryCapabilityRef": "BIO-CELL-APPLY-Q05",
    "status": "RELEASED",
    "academicAdmission": "HOLD (Grade9 v4.1 Parity Candidate)",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "sourceOrigin": "NSEJS Custody (Grade9v4.1)"
  },
  {
    "id": "BIO-NSEJS-CELL-06",
    "code": "BIO-NSEJS-CELL-06",
    "title": "NSEJS / Junior Science Biology \u00b7 Q06 \u00b7 APPLY \u00b7 D1 (Score 2)",
    "subjectCode": "BIO",
    "subject": "Biology",
    "topicCode": "LIVING_WORLD",
    "topic": "Cell Biology & Molecular Genetics",
    "subtopic": "BIO-ORGANISATION-LIVING-WORLD",
    "exam": "NSEJS",
    "year": 2024,
    "paper": "NSEJS Core 2",
    "questionNumber": "06",
    "section": "Junior Science Olympiad",
    "markingScheme": "+3 / -1",
    "isCompetitive": true,
    "difficultyBand": "D1",
    "difficultyScore": 2,
    "difficultyBasis": "Cognitive demand score determined by 5-component QRT rubric.",
    "cognitiveComponents": {
      "concept_model_selection": 1,
      "representation_translation": 0,
      "reasoning_chain_length": 1,
      "algebra_computational_load": 0,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "APPLY",
    "role": "CORE2",
    "kind": "SINGLE_CHOICE",
    "stem": "A newly discovered unicellular microorganism $M_x$ isolated from an alkaline hot spring is analyzed in the laboratory. Biochemical and ultrastructural assays reveal the following properties:\n1. Cell diameter: $1.2\\,\\mu\\text{m}$, bounded by a rigid cell wall containing peptidoglycan.\n2. Ribosomes sediment at $70\\text{S}$ ($50\\text{S}$ and $30\\text{S}$ subunits).\n3. Genetic material consists of a single circular double-stranded DNA molecule localized in a nucleoid region without a nuclear envelope or histone proteins.\n4. Membrane-bound organelles (mitochondria, chloroplasts, endoplasmic reticulum) are completely absent.\nUnder the Whittaker Five-Kingdom classification system, to which kingdom does organism $M_x$ belong, and why can it NOT be classified under Kingdom Protista?",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) Kingdom Monera; because Protista strictly comprises unicellular eukaryotic organisms with membrane-bound nuclei and 80S cytosolic ribosomes."
      },
      {
        "id": "opt-B",
        "text": "(B) Kingdom Protista; because all single-celled organisms belong to Protista regardless of nuclear organization."
      },
      {
        "id": "opt-C",
        "text": "(C) Kingdom Fungi; because of the presence of a rigid cell wall and absence of chloroplasts."
      },
      {
        "id": "opt-D",
        "text": "(D) Kingdom Archaebacteria; because hot springs host only Archaea devoid of peptidoglycan."
      }
    ],
    "hints": [
      "[H1 (Prokaryotic vs Eukaryotic): Is organism Mx prokaryotic or eukaryotic?] Absence of a nuclear membrane, presence of a nucleoid, 70S ribosomes, and peptidoglycan wall strictly define a prokaryotic organism.",
      "[H2 (Whittaker Classification Criteria): Which kingdom uniquely houses all prokaryotes?] Kingdom Monera contains all prokaryotes (eubacteria and cyanobacteria). Protista is restricted to unicellular eukaryotes.",
      "[H3 (Crux Move): Distinguish Monera from Protista.] Crux Move: Even though organism Mx is unicellular, its prokaryotic cytology (no nucleus, 70S ribosomes, peptidoglycan) places it in Monera, not Protista. Option A."
    ],
    "steps": [
      "1. System Representation & Setup: Unicellular isolate Mx with peptidoglycan cell wall, 70S ribosomes, naked circular genophore, and no nuclear envelope.",
      "2. Physical Model & Formulation: In Whittaker's 5 kingdoms, cellular complexity is the primary criterion: Monera = prokaryota; Protista, Fungi, Plantae, Animalia = eukaryota.",
      "3. Execution & Resolution: The presence of peptidoglycan and prokaryotic organization assigns Mx definitively to Kingdom Monera. It cannot be in Protista because Protista consists exclusively of eukaryotes. Option A."
    ],
    "check": "Taxonomic validity check: Peptidoglycan (murein) rules out Archaebacteria and Eukarya, establishing Eubacteria / Monera. Option A verified.",
    "limitingCheck": "Taxonomic validity check: Peptidoglycan (murein) rules out Archaebacteria and Eukarya, establishing Eubacteria / Monera. Option A verified.",
    "trapWarning": "Fault N09 Answer Isolation: Raw key withheld client-side; formative reasoning steps provided.",
    "correctKey": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "figures": [],
    "linkedCoreRoles": [
      "CORE1A",
      "CORE1B",
      "CORE2A",
      "CORE2B"
    ],
    "primaryCapabilityRef": "BIO-CELL-APPLY-Q06",
    "status": "RELEASED",
    "academicAdmission": "HOLD (Grade9 v4.1 Parity Candidate)",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "sourceOrigin": "NSEJS Custody (Grade9v4.1)"
  },
  {
    "id": "BIO-NSEJS-CELL-07",
    "code": "BIO-NSEJS-CELL-07",
    "title": "NSEJS / Junior Science Biology \u00b7 Q07 \u00b7 SYNTHESIZE \u00b7 D2 (Score 4)",
    "subjectCode": "BIO",
    "subject": "Biology",
    "topicCode": "LIVING_WORLD",
    "topic": "Cell Biology & Molecular Genetics",
    "subtopic": "BIO-ORGANISATION-LIVING-WORLD",
    "exam": "NSEJS",
    "year": 2024,
    "paper": "NSEJS Core 2",
    "questionNumber": "07",
    "section": "Junior Science Olympiad",
    "markingScheme": "+3 / -1",
    "isCompetitive": true,
    "difficultyBand": "D2",
    "difficultyScore": 4,
    "difficultyBasis": "Cognitive demand score determined by 5-component QRT rubric.",
    "cognitiveComponents": {
      "concept_model_selection": 1,
      "representation_translation": 1,
      "reasoning_chain_length": 1,
      "algebra_computational_load": 0,
      "trap_exception_sensitivity": 1
    },
    "qrtDemand": "SYNTHESIZE",
    "role": "CORE2",
    "kind": "SINGLE_CHOICE",
    "stem": "In animal taxonomy, fundamental body architecture is determined by three developmental milestones: embryonic germ layer organization (diploblastic vs triploblastic), body symmetry, and coelom cavity formation. Consider the following three invertebrate phyla:\n- Phylum $A$: Triploblastic, bilateral symmetry, digestive tract with single opening (mouth = anus), and solid mesenchyme completely filling the blastocoel without a body cavity.\n- Phylum $B$: Triploblastic, bilateral symmetry, complete digestive tube, body cavity not lined by mesoderm on all sides (derived from blastocoel).\n- Phylum $C$: Triploblastic, bilateral symmetry, true body cavity completely lined by mesodermal peritoneum, exhibiting distinct metameric segmentation.\nIdentify Phyla $A, B,$ and $C$.",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) Phylum A = Platyhelminthes (Acoelomate); Phylum B = Aschelminthes/Nematoda (Pseudocoelomate); Phylum C = Annelida (Eucoelomate)"
      },
      {
        "id": "opt-B",
        "text": "(B) Phylum A = Cnidaria (Diploblastic); Phylum B = Platyhelminthes (Acoelomate); Phylum C = Arthropoda (Hemocoelomate)"
      },
      {
        "id": "opt-C",
        "text": "(C) Phylum A = Porifera (Cellular); Phylum B = Annelida (Eucoelomate); Phylum C = Mollusca (Eucoelomate)"
      },
      {
        "id": "opt-D",
        "text": "(D) Phylum A = Nematoda (Pseudocoelomate); Phylum B = Platyhelminthes (Acoelomate); Phylum C = Echinodermata (Enterocoelomate)"
      }
    ],
    "hints": [
      "[H1 (Phylum A Diagnostics): Which triploblastic bilateral phylum lacks a body cavity entirely?] Platyhelminthes (flatworms) are triploblastic, bilaterally symmetric acoelomates with blind-sac digestive cavities.",
      "[H2 (Phylum B Diagnostics): Which phylum has a false coelom derived from the blastocoel?] Aschelminthes (Nematoda, roundworms) possess a pseudocoelom where mesoderm occurs as scattered pouches.",
      "[H3 (Crux Move): Which phylum combines a true coelom with metameric segmentation?] Crux Move: Annelida (segmented worms) are true coelomates (schizocoelous) with prominent metamerism. Option A."
    ],
    "steps": [
      "1. System Representation & Setup: Characterize three invertebrate body plans across germ layers, symmetry, coelom status, and segmentation.",
      "2. Physical Model & Formulation: Triploblastic + acoelomate + blind sac = Platyhelminthes. Triploblastic + pseudocoelomate + tube-within-tube = Aschelminthes/Nematoda. Triploblastic + eucoelomate + metameric = Annelida.",
      "3. Execution & Resolution: Phylum A = Platyhelminthes, Phylum B = Aschelminthes, Phylum C = Annelida. Confirms Option A."
    ],
    "check": "Evolutionary progression: Acoelomate (Platyhelminthes) -> Pseudocoelomate (Nematoda) -> Eucoelomate metameric (Annelida). Option A confirmed.",
    "limitingCheck": "Evolutionary progression: Acoelomate (Platyhelminthes) -> Pseudocoelomate (Nematoda) -> Eucoelomate metameric (Annelida). Option A confirmed.",
    "trapWarning": "Fault N09 Answer Isolation: Raw key withheld client-side; formative reasoning steps provided.",
    "correctKey": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "figures": [],
    "linkedCoreRoles": [
      "CORE1A",
      "CORE1B",
      "CORE2A",
      "CORE2B"
    ],
    "primaryCapabilityRef": "BIO-CELL-SYNTHESIZE-Q07",
    "status": "RELEASED",
    "academicAdmission": "HOLD (Grade9 v4.1 Parity Candidate)",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "sourceOrigin": "NSEJS Custody (Grade9v4.1)"
  },
  {
    "id": "BIO-NSEJS-CELL-08",
    "code": "BIO-NSEJS-CELL-08",
    "title": "NSEJS / Junior Science Biology \u00b7 Q08 \u00b7 JUSTIFY \u00b7 D2 (Score 4)",
    "subjectCode": "BIO",
    "subject": "Biology",
    "topicCode": "LIVING_WORLD",
    "topic": "Cell Biology & Molecular Genetics",
    "subtopic": "BIO-ORGANISATION-LIVING-WORLD",
    "exam": "NSEJS",
    "year": 2024,
    "paper": "NSEJS Core 2",
    "questionNumber": "08",
    "section": "Junior Science Olympiad",
    "markingScheme": "+3 / -1",
    "isCompetitive": true,
    "difficultyBand": "D2",
    "difficultyScore": 4,
    "difficultyBasis": "Cognitive demand score determined by 5-component QRT rubric.",
    "cognitiveComponents": {
      "concept_model_selection": 2,
      "representation_translation": 0,
      "reasoning_chain_length": 1,
      "algebra_computational_load": 0,
      "trap_exception_sensitivity": 1
    },
    "qrtDemand": "JUSTIFY",
    "role": "CORE2",
    "kind": "SINGLE_CHOICE",
    "stem": "Both bryophytes (e.g. *Funaria*) and pteridophytes (e.g. *Dryopteris*) exhibit heteromorphic alternation of generations involving a haploid gametophyte ($n$) and a diploid sporophyte ($2n$). However, their evolutionary advancement differs fundamentally in terms of which generation is physiologically dominant and independent.\nWhich of the following correctly pairs the dominant, independent, photosynthetic phase of bryophytes with that of pteridophytes, and identifies the major vascular adaptation present in pteridophytes but absent in bryophytes?",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) Bryophyte dominant phase = Gametophyte (n); Pteridophyte dominant phase = Sporophyte (2n); Vascular adaptation = Lignified conducting tissues (xylem and phloem)"
      },
      {
        "id": "opt-B",
        "text": "(B) Bryophyte dominant phase = Sporophyte (2n); Pteridophyte dominant phase = Gametophyte (n); Vascular adaptation = Non-vascular rhizoids"
      },
      {
        "id": "opt-C",
        "text": "(C) Bryophyte dominant phase = Sporophyte (2n); Pteridophyte dominant phase = Sporophyte (2n); Vascular adaptation = Enclosed seeds and flowers"
      },
      {
        "id": "opt-D",
        "text": "(D) Bryophyte dominant phase = Gametophyte (n); Pteridophyte dominant phase = Gametophyte (n); Vascular adaptation = Stomata and cuticle"
      }
    ],
    "hints": [
      "[H1 (Bryophyte Lifecycle): What is the leafy independent green plant in mosses?] In bryophytes, the haploid gametophyte (n) is the green, photosynthetic, independent phase; the sporophyte (foot, seta, capsule) is dependent upon it.",
      "[H2 (Pteridophyte Lifecycle): What is the large leafy independent plant in ferns?] In pteridophytes, the diploid sporophyte (2n) is dominant and differentiated into true roots, stem, and fronds.",
      "[H3 (Crux Move): What vascular milestone distinguishes pteridophytes from bryophytes?] Crux Move: Pteridophytes are the first terrestrial plants to evolve specialized vascular tissues (xylem tracheids and phloem sieve cells). Option A."
    ],
    "steps": [
      "1. System Representation & Setup: Evolutionary transition from non-vascular embryophytes (bryophytes) to seedless vascular cryptogams (pteridophytes).",
      "2. Physical Model & Formulation: In bryophytes, gametophyte (n) is dominant and perennial, sporophyte (2n) is parasitic. In pteridophytes, sporophyte (2n) is dominant and independent, while gametophyte is reduced to a transient prothallus.",
      "3. Execution & Resolution: The key vascular adaptation of pteridophytes is the evolution of lignified tracheary elements (xylem) and sieve elements (phloem). Matches Option A."
    ],
    "check": "Evolutionary chronology check: Bryophytes (amphibians of plant kingdom, avascular, gametophyte dominant) -> Pteridophytes (vascular cryptogams, sporophyte dominant). Option A verified.",
    "limitingCheck": "Evolutionary chronology check: Bryophytes (amphibians of plant kingdom, avascular, gametophyte dominant) -> Pteridophytes (vascular cryptogams, sporophyte dominant). Option A verified.",
    "trapWarning": "Fault N09 Answer Isolation: Raw key withheld client-side; formative reasoning steps provided.",
    "correctKey": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "figures": [],
    "linkedCoreRoles": [
      "CORE1A",
      "CORE1B",
      "CORE2A",
      "CORE2B"
    ],
    "primaryCapabilityRef": "BIO-CELL-JUSTIFY-Q08",
    "status": "RELEASED",
    "academicAdmission": "HOLD (Grade9 v4.1 Parity Candidate)",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "sourceOrigin": "NSEJS Custody (Grade9v4.1)"
  },
  {
    "id": "BIO-NSEJS-CELL-09",
    "code": "BIO-NSEJS-CELL-09",
    "title": "NSEJS / Junior Science Biology \u00b7 Q09 \u00b7 APPLY \u00b7 D2 (Score 3)",
    "subjectCode": "BIO",
    "subject": "Biology",
    "topicCode": "LIVING_WORLD",
    "topic": "Cell Biology & Molecular Genetics",
    "subtopic": "BIO-ORGANISATION-LIVING-WORLD",
    "exam": "NSEJS",
    "year": 2024,
    "paper": "NSEJS Core 2",
    "questionNumber": "09",
    "section": "Junior Science Olympiad",
    "markingScheme": "+3 / -1",
    "isCompetitive": true,
    "difficultyBand": "D2",
    "difficultyScore": 3,
    "difficultyBasis": "Cognitive demand score determined by 5-component QRT rubric.",
    "cognitiveComponents": {
      "concept_model_selection": 1,
      "representation_translation": 0,
      "reasoning_chain_length": 1,
      "algebra_computational_load": 0,
      "trap_exception_sensitivity": 1
    },
    "qrtDemand": "APPLY",
    "role": "CORE2",
    "kind": "SINGLE_CHOICE",
    "stem": "A community health clinic records four patients exhibiting classic clinical symptoms of infectious diseases:\n- Patient 1: High cyclical intermittent fever with chills and shivering every 48 hours; blood smear reveals amoeboid trophozoites inside enlarged erythrocytes.\n- Patient 2: Severe persistent coughing, chest pain, and hemoptysis (bloody sputum); sputum smear stained with acid-fast Ziehl-Neelsen stain reveals rod-shaped bacilli.\n- Patient 3: Sudden high fever, severe retro-orbital headache, joint and muscle pain ('breakbone fever'), and thrombocytopenia transmitted by day-biting mosquitoes.\n- Patient 4: Circular, scaly, intensely itchy lesions with raised erythromatous borders on the skin folds of the groin and toes.\nWhich of the following correctly matches the causative pathogen, taxonomic nature, and transmission mode for these four patients?",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) Patient 1: Plasmodium vivax (Protozoan, female Anopheles); Patient 2: Mycobacterium tuberculosis (Bacterium, airborne droplets); Patient 3: Dengue virus (Flavivirus, Aedes aegypti); Patient 4: Trichophyton rubrum (Fungus, direct contact)"
      },
      {
        "id": "opt-B",
        "text": "(B) Patient 1: Salmonella typhi (Bacterium, contaminated water); Patient 2: Streptococcus pneumoniae (Bacterium, airborne); Patient 3: Chikungunya virus (Alphavirus, Culex); Patient 4: Leishmania donovani (Protozoan, sandfly)"
      },
      {
        "id": "opt-C",
        "text": "(C) Patient 1: Entamoeba histolytica (Protozoan, fecal-oral); Patient 2: Corynebacterium diphtheriae (Bacterium, droplets); Patient 3: Yellow fever virus (Flavivirus, Anopheles); Patient 4: Candida albicans (Bacterium, contact)"
      },
      {
        "id": "opt-D",
        "text": "(D) Patient 1: Plasmodium falciparum (Protozoan, male Anopheles); Patient 2: Bordetella pertussis (Bacterium, milk); Patient 3: Poliovirus (Enterovirus, water); Patient 4: Microsporum (Virus, fomites)"
      }
    ],
    "hints": [
      "[H1 (Cyclical Chills): What pathogen causes 48-hour cyclical chills due to hemozoin release?] Plasmodium vivax (apicomplexan protozoan) causes benign tertian malaria transmitted by female Anopheles mosquitoes.",
      "[H2 (Acid-Fast Bacilli): What bacterium stains positive in Ziehl-Neelsen acid-fast staining?] Mycobacterium tuberculosis (mycolic acid in cell wall) causes pulmonary tuberculosis transmitted by droplets.",
      "[H3 (Crux Move): Identify breakbone fever and ringworm agents.] Crux Move: Breakbone fever with thrombocytopenia is Dengue virus (Aedes aegypti); circular itchy dermatomycosis is Trichophyton (fungus). Option A."
    ],
    "steps": [
      "1. System Representation & Setup: Clinical profiles of 4 common human infectious diseases across 4 pathogen kingdoms: Protozoa, Bacteria, Viruses, and Fungi.",
      "2. Physical Model & Formulation: Patient 1 = Malaria (Plasmodium vivax, protozoan). Patient 2 = Tuberculosis (Mycobacterium tuberculosis, acid-fast bacillus). Patient 3 = Dengue (Flavivirus, Aedes). Patient 4 = Ringworm (Trichophyton, fungus).",
      "3. Execution & Resolution: Option A compiles all 4 exact etiologic agents, taxonomic ranks, and transmission routes without error."
    ],
    "check": "Epidemiological sanity check: Male mosquitoes do not bite (suck plant nectar, eliminating D); Salmonella causes enteric fever without cyclic 48h chills (eliminating B). Option A confirmed.",
    "limitingCheck": "Epidemiological sanity check: Male mosquitoes do not bite (suck plant nectar, eliminating D); Salmonella causes enteric fever without cyclic 48h chills (eliminating B). Option A confirmed.",
    "trapWarning": "Fault N09 Answer Isolation: Raw key withheld client-side; formative reasoning steps provided.",
    "correctKey": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "figures": [],
    "linkedCoreRoles": [
      "CORE1A",
      "CORE1B",
      "CORE2A",
      "CORE2B"
    ],
    "primaryCapabilityRef": "BIO-CELL-APPLY-Q09",
    "status": "RELEASED",
    "academicAdmission": "HOLD (Grade9 v4.1 Parity Candidate)",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "sourceOrigin": "NSEJS Custody (Grade9v4.1)"
  },
  {
    "id": "BIO-NSEJS-CELL-10",
    "code": "BIO-NSEJS-CELL-10",
    "title": "NSEJS / Junior Science Biology \u00b7 Q10 \u00b7 JUSTIFY \u00b7 D2 (Score 4)",
    "subjectCode": "BIO",
    "subject": "Biology",
    "topicCode": "LIVING_WORLD",
    "topic": "Cell Biology & Molecular Genetics",
    "subtopic": "BIO-ORGANISATION-LIVING-WORLD",
    "exam": "NSEJS",
    "year": 2024,
    "paper": "NSEJS Core 2",
    "questionNumber": "10",
    "section": "Junior Science Olympiad",
    "markingScheme": "+3 / -1",
    "isCompetitive": true,
    "difficultyBand": "D2",
    "difficultyScore": 4,
    "difficultyBasis": "Cognitive demand score determined by 5-component QRT rubric.",
    "cognitiveComponents": {
      "concept_model_selection": 2,
      "representation_translation": 0,
      "reasoning_chain_length": 1,
      "algebra_computational_load": 0,
      "trap_exception_sensitivity": 1
    },
    "qrtDemand": "JUSTIFY",
    "role": "CORE2",
    "kind": "SINGLE_CHOICE",
    "stem": "A patient suffering from acute viral influenza is prescribed the antibiotic penicillin by an unqualified practitioner. After five days of therapy, the viral symptoms show zero clinical improvement. From a cell biological and pharmacological perspective, why is penicillin completely ineffective in treating viral infections, and by what specific biochemical mechanism does penicillin kill susceptible bacteria?",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) Penicillin competitively inhibits bacterial transpeptidase (penicillin-binding proteins) preventing peptidoglycan cell wall cross-linking, causing osmotic lysis; viruses lack cellular organization, metabolic enzymes, and peptidoglycan cell walls."
      },
      {
        "id": "opt-B",
        "text": "(B) Penicillin denatures bacterial ribosomes; viruses have eukaryotic 80S ribosomes that resist penicillin binding."
      },
      {
        "id": "opt-C",
        "text": "(C) Penicillin blocks viral reverse transcriptase; influenza has an RNA genome that bypasses reverse transcription."
      },
      {
        "id": "opt-D",
        "text": "(D) Penicillin hydrolyzes outer lipopolysaccharide membranes; viruses possess glycoprotein spikes that neutralize beta-lactam rings."
      }
    ],
    "hints": [
      "[H1 (Bacterial Target of Penicillin): What specific cellular structure does penicillin target in bacteria?] Penicillin (a beta-lactam antibiotic) inhibits transpeptidase, the enzyme catalyzing peptide cross-links between glycan chains of the peptidoglycan wall.",
      "[H2 (Why Bacteria Die): How does wall inhibition cause bacterial death?] Without cross-linked peptidoglycan, the fragile cell wall cannot resist high internal osmotic pressure (up to 20 atm in Gram-positive bacteria), leading to cell lysis.",
      "[H3 (Crux Move): Why do viruses completely resist antibiotics?] Crux Move: Viruses are acellular obligate intracellular parasites lacking their own metabolic pathways and peptidoglycan walls. They utilize the host cell's machinery, so wall-inhibiting antibiotics have zero pharmacological target. Option A."
    ],
    "steps": [
      "1. System Representation & Setup: Antibiotic selectivity and pharmacological mechanisms of action comparing prokaryotic bacteria with acellular viruses.",
      "2. Physical Model & Formulation: Penicillin mimics D-Ala-D-Ala to acyl-inactivate bacterial transpeptidases. As bacteria grow and divide, autolysins breach the wall, which cannot be repaired without cross-linking, inducing catastrophic osmotic lysis.",
      "3. Execution & Resolution: Viruses contain only a nucleic acid genome encapsulated in a protein capsid (and sometimes a host-derived lipid envelope). Having no cell wall, ribosomes, or independent metabolism, they are entirely insusceptible to beta-lactams. Option A."
    ],
    "check": "Pharmacological dogma check: Antibiotics target bacterial-specific structures (peptidoglycan walls, 70S ribosomes, DNA gyrase). Viral diseases require antivirals or vaccines. Option A confirmed.",
    "limitingCheck": "Pharmacological dogma check: Antibiotics target bacterial-specific structures (peptidoglycan walls, 70S ribosomes, DNA gyrase). Viral diseases require antivirals or vaccines. Option A confirmed.",
    "trapWarning": "Fault N09 Answer Isolation: Raw key withheld client-side; formative reasoning steps provided.",
    "correctKey": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "figures": [],
    "linkedCoreRoles": [
      "CORE1A",
      "CORE1B",
      "CORE2A",
      "CORE2B"
    ],
    "primaryCapabilityRef": "BIO-CELL-JUSTIFY-Q10",
    "status": "RELEASED",
    "academicAdmission": "HOLD (Grade9 v4.1 Parity Candidate)",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "sourceOrigin": "NSEJS Custody (Grade9v4.1)"
  },
  {
    "id": "BIO-NSEJS-PROC-01",
    "code": "BIO-NSEJS-PROC-01",
    "title": "NSEJS / Junior Science Biology \u00b7 Q01 \u00b7 MODEL \u00b7 D2 (Score 4)",
    "subjectCode": "BIO",
    "subject": "Biology",
    "topicCode": "LIFE_PROCESSES",
    "topic": "Life Processes & Nephron Physiology",
    "subtopic": "BIO-LIFE-PROCESSES",
    "exam": "NSEJS",
    "year": 2024,
    "paper": "NSEJS Core 2",
    "questionNumber": "01",
    "section": "Junior Science Olympiad",
    "markingScheme": "+3 / -1",
    "isCompetitive": true,
    "difficultyBand": "D2",
    "difficultyScore": 4,
    "difficultyBasis": "Cognitive demand score determined by 5-component QRT rubric.",
    "cognitiveComponents": {
      "concept_model_selection": 1,
      "representation_translation": 1,
      "reasoning_chain_length": 1,
      "algebra_computational_load": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "MODEL",
    "role": "CORE2",
    "kind": "SINGLE_CHOICE",
    "stem": "In a healthy human nephron, glomerular filtration is governed by Starling forces across the glomerular capillary endothelium and podocyte filtration slits. Physiological measurements indicate:\n- Glomerular capillary hydrostatic pressure: $P_{\\text{GC}} = 55.0\\text{ mmHg}$\n- Bowman's capsule hydrostatic pressure: $P_{\\text{BS}} = 15.0\\text{ mmHg}$\n- Glomerular capillary colloid osmotic (oncotic) pressure: $\\Pi_{\\text{GC}} = 30.0\\text{ mmHg}$\n- Bowman's capsule oncotic pressure: $\\Pi_{\\text{BS}} \\approx 0.0\\text{ mmHg}$ (negligible proteins filtered)\n- Glomerular filtration coefficient: $K_f = 12.5\\text{ mL}/(\\text{min}\\cdot\\text{mmHg})$\n[FIG-stem-bio-nephron-gfr-starling]\nCalculate the Net Filtration Pressure ($\\text{NFP}$), the resulting Glomerular Filtration Rate ($\\text{GFR}$ in $\\text{mL/min}$ and $\\text{L/day}$), and the daily volume of final urine produced if exactly $99.0\\%$ of the filtered fluid is selectively reabsorbed along the renal tubules.",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) NFP = 10.0 mmHg; GFR = 125 mL/min (180 L/day); Daily urine = 1.80 L"
      },
      {
        "id": "opt-B",
        "text": "(B) NFP = 25.0 mmHg; GFR = 312.5 mL/min (450 L/day); Daily urine = 4.50 L"
      },
      {
        "id": "opt-C",
        "text": "(C) NFP = 10.0 mmHg; GFR = 125 mL/min (180 L/day); Daily urine = 18.0 L"
      },
      {
        "id": "opt-D",
        "text": "(D) NFP = 40.0 mmHg; GFR = 500 mL/min (720 L/day); Daily urine = 7.20 L"
      }
    ],
    "hints": [
      "[H1 (Starling Force Balance): Formulate Net Filtration Pressure.] NFP = P_GC - (P_BS + Pi_GC) = 55.0 - (15.0 + 30.0) = +10.0 mmHg favoring filtration.",
      "[H2 (GFR Evaluation): Multiply NFP by the filtration coefficient Kf.] GFR = 12.5 mL/(min.mmHg) * 10.0 mmHg = 125.0 mL/min = 180.0 L/day.",
      "[H3 (Crux Move): Account for 99.0% tubular reabsorption.] Crux Move: 99.0% reabsorption leaves 1.0% excreted as urine: 180.0 L/day * 0.010 = 1.80 L/day. Confirms Option A."
    ],
    "steps": [
      "1. System Representation & Setup: Human glomerulus hemodynamics governed by Starling pressures across fenestrated endothelium and podocytes.",
      "2. Physical Model & Formulation: NFP = P_GC - P_BS - Pi_GC = 55.0 - 15.0 - 30.0 = +10.0 mmHg. GFR = Kf * NFP = 12.5 * 10.0 = 125.0 mL/min.",
      "3. Execution & Resolution: 125.0 mL/min * 1440 min/day = 180.0 L/day. Tubular reabsorption of 99.0% leaves 1.0% excretion: 180.0 * 0.010 = 1.80 L/day. Option A."
    ],
    "check": "Physiological range check: Standard human GFR is 120-125 mL/min (~180 L/day) and typical daily urine is 1.5-2.0 L. Matches empirical clinical medicine exactly. Option A confirmed.",
    "limitingCheck": "Physiological range check: Standard human GFR is 120-125 mL/min (~180 L/day) and typical daily urine is 1.5-2.0 L. Matches empirical clinical medicine exactly. Option A confirmed.",
    "trapWarning": "Fault N09 Answer Isolation: Raw key withheld client-side; formative reasoning steps provided.",
    "correctKey": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "figures": [
      {
        "id": "fig_bio_nephron_filtration.svg",
        "caption": "Glomerular capillary Starling pressure forces and tubular reabsorption schematic.",
        "available": true
      }
    ],
    "linkedCoreRoles": [
      "CORE1A",
      "CORE1B",
      "CORE2A",
      "CORE2B"
    ],
    "primaryCapabilityRef": "BIO-PROC-MODEL-Q01",
    "status": "RELEASED",
    "academicAdmission": "HOLD (Grade9 v4.1 Parity Candidate)",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "sourceOrigin": "NSEJS Custody (Grade9v4.1)"
  },
  {
    "id": "BIO-NSEJS-PROC-02",
    "code": "BIO-NSEJS-PROC-02",
    "title": "NSEJS / Junior Science Biology \u00b7 Q02 \u00b7 MODEL \u00b7 D2 (Score 4)",
    "subjectCode": "BIO",
    "subject": "Biology",
    "topicCode": "LIFE_PROCESSES",
    "topic": "Life Processes & Nephron Physiology",
    "subtopic": "BIO-LIFE-PROCESSES",
    "exam": "NSEJS",
    "year": 2024,
    "paper": "NSEJS Core 2",
    "questionNumber": "02",
    "section": "Junior Science Olympiad",
    "markingScheme": "+3 / -1",
    "isCompetitive": true,
    "difficultyBand": "D2",
    "difficultyScore": 4,
    "difficultyBasis": "Cognitive demand score determined by 5-component QRT rubric.",
    "cognitiveComponents": {
      "concept_model_selection": 1,
      "representation_translation": 1,
      "reasoning_chain_length": 1,
      "algebra_computational_load": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "MODEL",
    "role": "CORE2",
    "kind": "SINGLE_CHOICE",
    "stem": "In oxygenic photosynthesis, non-cyclic photophosphorylation (the Z-scheme) couples photosystems II and I to transfer electrons from water to $\\text{NADP}^+$. The overall stoichiometry per molecule of oxygen evolved is:\n$$2\\text{H}_2\\text{O} + 2\\text{NADP}^+ + 3\\text{ADP} + 3\\text{P}_i \\xrightarrow{8\\text{ photons}} \\text{O}_2 + 2\\text{NADPH} + 2\\text{H}^+ + 3\\text{ATP}$$\nIn the stroma, the Calvin-Benson cycle requires $18\\text{ ATP}$ and $12\\text{ NADPH}$ to synthesize one net molecule of hexose sugar (glucose, $\\text{C}_6\\text{H}_{12}\\text{O}_6$) from $6\\text{ CO}_2$.\nWhat is the minimum quantum requirement (total number of photons absorbed by the thylakoid photosystems) theoretically required to produce one net mole of glucose via standard non-cyclic photophosphorylation?",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) 24 photons"
      },
      {
        "id": "opt-B",
        "text": "(B) 36 photons"
      },
      {
        "id": "opt-C",
        "text": "(C) 48 photons"
      },
      {
        "id": "opt-D",
        "text": "(D) 64 photons"
      }
    ],
    "hints": [
      "[H1 (NADPH Requirement): How many NADPH molecules are required per glucose?] The Calvin cycle requires 12 NADPH per net glucose synthesized (2 NADPH per CO2 fixed, 6 CO2 total).",
      "[H2 (Photon to NADPH Ratio): Relate photons absorbed to NADPH produced in non-cyclic flow.] Each pair of electrons requires 4 photons (2 at PSII, 2 at PSI) to reduce 1 NADP+ to NADPH. So producing 2 NADPH requires 8 photons (or 4 photons per NADPH).",
      "[H3 (Crux Move): Calculate total photons for 12 NADPH.] Crux Move: 12 NADPH * 4 photons/NADPH = 48 photons. (This also generates 12 * 1.5 = 18 ATP, exactly matching Calvin requirement). Option C."
    ],
    "steps": [
      "1. System Representation & Setup: Light reactions couple non-cyclic electron flow through PSII and PSI to generate ATP and NADPH for dark-reaction carbon fixation.",
      "2. Physical Model & Formulation: Synthesis of 1 hexose (C6H12O6) fixes 6 CO2 requiring 12 NADPH and 18 ATP. Non-cyclic flow produces 2 NADPH and 3 ATP per 8 photons absorbed (4 pairs of photons).",
      "3. Execution & Resolution: Scaling by 6: 6 * (8 photons) = 48 photons, producing exactly 6 * 2 = 12 NADPH and 6 * 3 = 18 ATP. Thus the theoretical minimum quantum requirement is 48 photons. Option C."
    ],
    "check": "Stoichiometric balance: 48 photons / 6 CO2 = 8 photons per CO2 fixed (Emerson quantum requirement). Consistent with biophysics. Option C confirmed.",
    "limitingCheck": "Stoichiometric balance: 48 photons / 6 CO2 = 8 photons per CO2 fixed (Emerson quantum requirement). Consistent with biophysics. Option C confirmed.",
    "trapWarning": "Fault N09 Answer Isolation: Raw key withheld client-side; formative reasoning steps provided.",
    "correctKey": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "figures": [],
    "linkedCoreRoles": [
      "CORE1A",
      "CORE1B",
      "CORE2A",
      "CORE2B"
    ],
    "primaryCapabilityRef": "BIO-PROC-MODEL-Q02",
    "status": "RELEASED",
    "academicAdmission": "HOLD (Grade9 v4.1 Parity Candidate)",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "sourceOrigin": "NSEJS Custody (Grade9v4.1)"
  },
  {
    "id": "BIO-NSEJS-PROC-03",
    "code": "BIO-NSEJS-PROC-03",
    "title": "NSEJS / Junior Science Biology \u00b7 Q03 \u00b7 APPLY \u00b7 D2 (Score 3)",
    "subjectCode": "BIO",
    "subject": "Biology",
    "topicCode": "LIFE_PROCESSES",
    "topic": "Life Processes & Nephron Physiology",
    "subtopic": "BIO-LIFE-PROCESSES",
    "exam": "NSEJS",
    "year": 2024,
    "paper": "NSEJS Core 2",
    "questionNumber": "03",
    "section": "Junior Science Olympiad",
    "markingScheme": "+3 / -1",
    "isCompetitive": true,
    "difficultyBand": "D2",
    "difficultyScore": 3,
    "difficultyBasis": "Cognitive demand score determined by 5-component QRT rubric.",
    "cognitiveComponents": {
      "concept_model_selection": 1,
      "representation_translation": 0,
      "reasoning_chain_length": 1,
      "algebra_computational_load": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "APPLY",
    "role": "CORE2",
    "kind": "SINGLE_CHOICE",
    "stem": "The Respiratory Quotient ($\\text{RQ}$) of a respiring biological tissue is defined as the volumetric ratio of carbon dioxide evolved to oxygen consumed:\n$$\\text{RQ} = \\frac{\\text{Volume of } \\text{CO}_2 \\text{ evolved}}{\\text{Volume of } \\text{O}_2 \\text{ consumed}}$$\nA student measures the $\\text{RQ}$ of two different germinating seeds under aerobic conditions:\n- Seed $S_1$ (wheat grain) respires exclusively carbohydrate stored as glucose:\n$$\\text{C}_6\\text{H}_{12}\\text{O}_6 + 6\\text{O}_2 \\to 6\\text{CO}_2 + 6\\text{H}_2\\text{O}$$\n- Seed $S_2$ (castor seed) respires stored fat consisting predominantly of tripalmitin:\n$$2\\text{C}_{51}\\text{H}_{98}\\text{O}_6 + 145\\text{O}_2 \\to 102\\text{CO}_2 + 98\\text{H}_2\\text{O}$$\nWhat are the theoretical values of $\\text{RQ}$ for Seed $S_1$ and Seed $S_2$, respectively?",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) S1: RQ = 1.00; S2: RQ = 0.70"
      },
      {
        "id": "opt-B",
        "text": "(B) S1: RQ = 0.70; S2: RQ = 1.00"
      },
      {
        "id": "opt-C",
        "text": "(C) S1: RQ = 1.00; S2: RQ = 1.45"
      },
      {
        "id": "opt-D",
        "text": "(D) S1: RQ = 0.85; S2: RQ = 0.70"
      }
    ],
    "hints": [
      "[H1 (Carbohydrate RQ): Compute RQ for glucose from the balanced equation.] For glucose: 6 CO2 / 6 O2 = 1.00.",
      "[H2 (Fat RQ): Compute RQ for tripalmitin from the balanced equation.] For tripalmitin: 102 CO2 / 145 O2 = 0.7034 approx 0.70.",
      "[H3 (Crux Move): Synthesize the substrate values.] Crux Move: S1 = 1.00 and S2 = 0.70. Fats have less oxygen relative to carbon/hydrogen, requiring more external O2. Option A."
    ],
    "steps": [
      "1. System Representation & Setup: Comparison of respiratory quotient values for carbohydrates versus lipid respiratory substrates.",
      "2. Physical Model & Formulation: RQ = n(CO2) / n(O2). Glucose oxidation: 6 CO2 / 6 O2 = 1.00. Tripalmitin oxidation: 102 CO2 / 145 O2 = 0.7034.",
      "3. Execution & Resolution: S1 (glucose) = 1.00; S2 (tripalmitin) = 0.70. Confirms Option A."
    ],
    "check": "Stoichiometric check: 102 / 145 = 0.7034. Because fats are highly reduced hydrocarbons, their RQ is predictably < 1.0. Option A verified.",
    "limitingCheck": "Stoichiometric check: 102 / 145 = 0.7034. Because fats are highly reduced hydrocarbons, their RQ is predictably < 1.0. Option A verified.",
    "trapWarning": "Fault N09 Answer Isolation: Raw key withheld client-side; formative reasoning steps provided.",
    "correctKey": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "figures": [],
    "linkedCoreRoles": [
      "CORE1A",
      "CORE1B",
      "CORE2A",
      "CORE2B"
    ],
    "primaryCapabilityRef": "BIO-PROC-APPLY-Q03",
    "status": "RELEASED",
    "academicAdmission": "HOLD (Grade9 v4.1 Parity Candidate)",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "sourceOrigin": "NSEJS Custody (Grade9v4.1)"
  },
  {
    "id": "BIO-NSEJS-PROC-04",
    "code": "BIO-NSEJS-PROC-04",
    "title": "NSEJS / Junior Science Biology \u00b7 Q04 \u00b7 JUSTIFY \u00b7 D2 (Score 4)",
    "subjectCode": "BIO",
    "subject": "Biology",
    "topicCode": "LIFE_PROCESSES",
    "topic": "Life Processes & Nephron Physiology",
    "subtopic": "BIO-LIFE-PROCESSES",
    "exam": "NSEJS",
    "year": 2024,
    "paper": "NSEJS Core 2",
    "questionNumber": "04",
    "section": "Junior Science Olympiad",
    "markingScheme": "+3 / -1",
    "isCompetitive": true,
    "difficultyBand": "D2",
    "difficultyScore": 4,
    "difficultyBasis": "Cognitive demand score determined by 5-component QRT rubric.",
    "cognitiveComponents": {
      "concept_model_selection": 2,
      "representation_translation": 0,
      "reasoning_chain_length": 1,
      "algebra_computational_load": 0,
      "trap_exception_sensitivity": 1
    },
    "qrtDemand": "JUSTIFY",
    "role": "CORE2",
    "kind": "SINGLE_CHOICE",
    "stem": "An in vitro digestion experiment tests the enzymatic activity of human digestive juices under varying chemical microenvironments:\n- Test 1: Salivary amylase added to starch solution at $\\text{pH} = 6.8$ shows complete hydrolysis to maltose within 10 minutes. When hydrochloric acid is added lowering $\\text{pH}$ to $1.8$, starch breakdown ceases immediately.\n- Test 2: Purified pepsin added to egg albumin protein at $\\text{pH} = 1.8$ causes rapid proteolysis into peptones. When sodium bicarbonate is added raising $\\text{pH}$ to $8.0$, proteolysis ceases permanently.\n- Test 3: Bile juice contains no digestive enzymes yet dramatically accelerates lipid hydrolysis when added to pancreatic lipase.\nWhich of the following statements rigorously justifies these biochemical observations based on protein conformation and colloidal surface chemistry?",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) Salivary amylase and pepsin undergo tertiary structure denaturation outside their respective optimal pH ranges; Bile salts emulsify large fat globules into micro-micelles, vastly increasing surface area for lipase access."
      },
      {
        "id": "opt-B",
        "text": "(B) Salivary amylase requires HCl for allosteric activation; Pepsin is a carbohydrate-digesting enzyme inhibited by basic carbonates."
      },
      {
        "id": "opt-C",
        "text": "(C) Enzymes function with identical catalytic efficiency across all physiological pH levels; Bile acts as a competitive inhibitor of gastric lipase."
      },
      {
        "id": "opt-D",
        "text": "(D) Low pH hydrolyzes the peptide bonds of amylase; High pH oxidizes the active site of bile enzymes."
      }
    ],
    "hints": [
      "[H1 (Enzyme pH Sensitivity): Why do enzymes lose activity when pH deviates from optimum?] Extreme pH alters the ionization of acidic and basic amino acid side chains at the active site and disrupts ionic/hydrogen bonds, denaturing tertiary structure.",
      "[H2 (Bile Mechanism): If bile has no enzymes, how does it aid fat digestion?] Bile salts (sodium glycocholate and taurocholate) are amphipathic molecules that emulsify dietary fats into tiny micelles, dramatically increasing the surface area for lipase.",
      "[H3 (Crux Move): Synthesize both justifications.] Crux Move: Amylase and pepsin denature outside their respective pH optima (6.8 vs 1.8), while bile acts physically by micellar emulsification. Option A."
    ],
    "steps": [
      "1. System Representation & Setup: Evaluation of digestive enzyme kinetics across gastrointestinal compartments (mouth, stomach, duodenum).",
      "2. Physical Model & Formulation: Amylase operates at oral pH 6.8 and is irreversibly denatured in gastric HCl (pH 1.8). Pepsin requires acid (pH 1.5-2.0) to maintain active conformation and denatures in alkaline duodenal juice. Lipase is water-soluble acting at oil-water interfaces, accelerated by bile salt emulsification.",
      "3. Execution & Resolution: Statement A provides the strictly correct protein biochemical and colloidal physical explanation. Option A."
    ],
    "check": "Physiological consistency check: Bile contains no enzymes (non-enzymatic secretion). Both enzyme denaturation and interfacial emulsion mechanisms are fully valid. Option A confirmed.",
    "limitingCheck": "Physiological consistency check: Bile contains no enzymes (non-enzymatic secretion). Both enzyme denaturation and interfacial emulsion mechanisms are fully valid. Option A confirmed.",
    "trapWarning": "Fault N09 Answer Isolation: Raw key withheld client-side; formative reasoning steps provided.",
    "correctKey": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "figures": [],
    "linkedCoreRoles": [
      "CORE1A",
      "CORE1B",
      "CORE2A",
      "CORE2B"
    ],
    "primaryCapabilityRef": "BIO-PROC-JUSTIFY-Q04",
    "status": "RELEASED",
    "academicAdmission": "HOLD (Grade9 v4.1 Parity Candidate)",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "sourceOrigin": "NSEJS Custody (Grade9v4.1)"
  },
  {
    "id": "BIO-NSEJS-PROC-05",
    "code": "BIO-NSEJS-PROC-05",
    "title": "NSEJS / Junior Science Biology \u00b7 Q05 \u00b7 APPLY \u00b7 D2 (Score 3)",
    "subjectCode": "BIO",
    "subject": "Biology",
    "topicCode": "LIFE_PROCESSES",
    "topic": "Life Processes & Nephron Physiology",
    "subtopic": "BIO-LIFE-PROCESSES",
    "exam": "NSEJS",
    "year": 2024,
    "paper": "NSEJS Core 2",
    "questionNumber": "05",
    "section": "Junior Science Olympiad",
    "markingScheme": "+3 / -1",
    "isCompetitive": true,
    "difficultyBand": "D2",
    "difficultyScore": 3,
    "difficultyBasis": "Cognitive demand score determined by 5-component QRT rubric.",
    "cognitiveComponents": {
      "concept_model_selection": 1,
      "representation_translation": 0,
      "reasoning_chain_length": 1,
      "algebra_computational_load": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "APPLY",
    "role": "CORE2",
    "kind": "SINGLE_CHOICE",
    "stem": "An echocardiographic examination of a healthy adult at rest records the following ventricular volumetric and chronotropic parameters:\n- End-Diastolic Volume ($\\text{EDV}$): $120.0\\text{ mL}$\n- End-Systolic Volume ($\\text{ESV}$): $50.0\\text{ mL}$\n- Resting Heart Rate ($\\text{HR}$): $72.0\\text{ beats/min}$\nCalculate the Stroke Volume ($\\text{SV}$), the Ejection Fraction ($\\text{EF}$), and the total Cardiac Output ($\\text{CO}$ in $\\text{L/min}$).",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) Stroke Volume = 70.0 mL; Ejection Fraction = 58.3%; Cardiac Output = 5.04 L/min"
      },
      {
        "id": "opt-B",
        "text": "(B) Stroke Volume = 170.0 mL; Ejection Fraction = 70.0%; Cardiac Output = 12.24 L/min"
      },
      {
        "id": "opt-C",
        "text": "(C) Stroke Volume = 70.0 mL; Ejection Fraction = 41.7%; Cardiac Output = 3.60 L/min"
      },
      {
        "id": "opt-D",
        "text": "(D) Stroke Volume = 50.0 mL; Ejection Fraction = 50.0%; Cardiac Output = 5.04 L/min"
      }
    ],
    "hints": [
      "[H1 (Stroke Volume Formula): Relate EDV and ESV.] Stroke Volume SV = EDV - ESV = 120.0 mL - 50.0 mL = 70.0 mL/beat.",
      "[H2 (Ejection Fraction Formula): Calculate percentage of EDV ejected.] Ejection Fraction EF = (SV / EDV) * 100% = (70.0 / 120.0) * 100% = 58.33%.",
      "[H3 (Crux Move): Determine total cardiac output per minute.] Crux Move: Cardiac Output CO = SV * HR = 70.0 mL/beat * 72.0 beats/min = 5040 mL/min = 5.04 L/min. Confirms Option A."
    ],
    "steps": [
      "1. System Representation & Setup: Human ventricular hemodynamics during left ventricular systole and diastole.",
      "2. Physical Model & Formulation: SV = EDV - ESV = 120.0 - 50.0 = 70.0 mL. EF = SV / EDV = 70.0 / 120.0 = 0.5833 (58.3%). CO = SV * HR = 70.0 * 72.0 = 5040 mL/min.",
      "3. Execution & Resolution: SV = 70.0 mL, EF = 58.3%, CO = 5.04 L/min. Matches Option A uniquely."
    ],
    "check": "Physiological benchmark check: Resting adult cardiac output is typically ~5.0 L/min, matching total blood volume recycled every minute. Option A verified.",
    "limitingCheck": "Physiological benchmark check: Resting adult cardiac output is typically ~5.0 L/min, matching total blood volume recycled every minute. Option A verified.",
    "trapWarning": "Fault N09 Answer Isolation: Raw key withheld client-side; formative reasoning steps provided.",
    "correctKey": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "figures": [],
    "linkedCoreRoles": [
      "CORE1A",
      "CORE1B",
      "CORE2A",
      "CORE2B"
    ],
    "primaryCapabilityRef": "BIO-PROC-APPLY-Q05",
    "status": "RELEASED",
    "academicAdmission": "HOLD (Grade9 v4.1 Parity Candidate)",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "sourceOrigin": "NSEJS Custody (Grade9v4.1)"
  },
  {
    "id": "BIO-NSEJS-PROC-06",
    "code": "BIO-NSEJS-PROC-06",
    "title": "NSEJS / Junior Science Biology \u00b7 Q06 \u00b7 JUSTIFY \u00b7 D2 (Score 4)",
    "subjectCode": "BIO",
    "subject": "Biology",
    "topicCode": "LIFE_PROCESSES",
    "topic": "Life Processes & Nephron Physiology",
    "subtopic": "BIO-LIFE-PROCESSES",
    "exam": "NSEJS",
    "year": 2024,
    "paper": "NSEJS Core 2",
    "questionNumber": "06",
    "section": "Junior Science Olympiad",
    "markingScheme": "+3 / -1",
    "isCompetitive": true,
    "difficultyBand": "D2",
    "difficultyScore": 4,
    "difficultyBasis": "Cognitive demand score determined by 5-component QRT rubric.",
    "cognitiveComponents": {
      "concept_model_selection": 2,
      "representation_translation": 0,
      "reasoning_chain_length": 1,
      "algebra_computational_load": 0,
      "trap_exception_sensitivity": 1
    },
    "qrtDemand": "JUSTIFY",
    "role": "CORE2",
    "kind": "SINGLE_CHOICE",
    "stem": "The generation and propagation of a nerve impulse along an unmyelinated neuronal axon involves sequential changes in axonal membrane potential ($V_m$):\n- Stage 1: Resting potential stable at $-70.0\\text{ mV}$.\n- Stage 2: Threshold depolarization to $-55.0\\text{ mV}$ triggers rapid overshoot reaching $+30.0\\text{ mV}$.\n- Stage 3: Rapid repolarization returning $V_m$ towards negative values.\n- Stage 4: Transient hyperpolarization undershoot reaching $-80.0\\text{ mV}$ before restoring resting potential.\nWhich of the following correctly pairs each stage with the primary ion flux and voltage-gated ion channel conductance responsible?",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) Stage 1: Na+/K+ ATPase and K+ leak channels; Stage 2: Rapid influx of Na+ through opened voltage-gated Na+ channels; Stage 3: Inactivation of Na+ channels and rapid efflux of K+ through voltage-gated K+ channels; Stage 4: Delayed closing of voltage-gated K+ channels."
      },
      {
        "id": "opt-B",
        "text": "(B) Stage 1: Continuous influx of Cl-; Stage 2: Active pumping of Ca2+ outwards; Stage 3: Influx of Na+; Stage 4: Passive diffusion of proteins."
      },
      {
        "id": "opt-C",
        "text": "(C) Stage 1: Voltage-gated Na+ channels open; Stage 2: Efflux of K+; Stage 3: Influx of Na+; Stage 4: Inactivation of Na+/K+ pump."
      },
      {
        "id": "opt-D",
        "text": "(D) Stage 1: Resting potential maintained by myelin sheath; Stage 2: Direct electrical spark; Stage 3: Reverse flow of ATP; Stage 4: Calcium crystallization."
      }
    ],
    "hints": [
      "[H1 (Depolarization Mechanism): What causes the rapid spike from -55 mV to +30 mV?] Opening of activation gates of voltage-gated Na+ channels allows massive down-gradient Na+ influx into the axoplasm.",
      "[H2 (Repolarization Mechanism): What terminates the spike and restores negative potential?] Voltage-gated Na+ channels inactivate, while delayed rectifier voltage-gated K+ channels open, driving K+ efflux.",
      "[H3 (Crux Move): What causes the hyperpolarization undershoot?] Crux Move: K+ channels close slowly, permitting extra K+ efflux towards the K+ equilibrium potential (-90 mV), causing a transient undershoot (-80 mV). Option A."
    ],
    "steps": [
      "1. System Representation & Setup: Electrophysiology of Hodgkin-Huxley neuronal action potential across an axon membrane.",
      "2. Physical Model & Formulation: Resting state: high K+ permeability (leak channels) and 3 Na+/2 K+ pump maintain -70 mV. Depolarization: regenerative Na+ influx. Repolarization: Na+ channel inactivation + K+ efflux. Undershoot: delayed closing of K+ channels.",
      "3. Execution & Resolution: Stage sequence matches Option A with rigorous biophysical precision."
    ],
    "check": "Hodgkin-Huxley electrophysiological model: Na+ influx causes rising phase (+30 mV); K+ efflux causes falling phase (-80 mV). Option A confirmed.",
    "limitingCheck": "Hodgkin-Huxley electrophysiological model: Na+ influx causes rising phase (+30 mV); K+ efflux causes falling phase (-80 mV). Option A confirmed.",
    "trapWarning": "Fault N09 Answer Isolation: Raw key withheld client-side; formative reasoning steps provided.",
    "correctKey": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "figures": [],
    "linkedCoreRoles": [
      "CORE1A",
      "CORE1B",
      "CORE2A",
      "CORE2B"
    ],
    "primaryCapabilityRef": "BIO-PROC-JUSTIFY-Q06",
    "status": "RELEASED",
    "academicAdmission": "HOLD (Grade9 v4.1 Parity Candidate)",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "sourceOrigin": "NSEJS Custody (Grade9v4.1)"
  },
  {
    "id": "BIO-NSEJS-PROC-07",
    "code": "BIO-NSEJS-PROC-07",
    "title": "NSEJS / Junior Science Biology \u00b7 Q07 \u00b7 EXPLAIN \u00b7 D1 (Score 2)",
    "subjectCode": "BIO",
    "subject": "Biology",
    "topicCode": "LIFE_PROCESSES",
    "topic": "Life Processes & Nephron Physiology",
    "subtopic": "BIO-LIFE-PROCESSES",
    "exam": "NSEJS",
    "year": 2024,
    "paper": "NSEJS Core 2",
    "questionNumber": "07",
    "section": "Junior Science Olympiad",
    "markingScheme": "+3 / -1",
    "isCompetitive": true,
    "difficultyBand": "D1",
    "difficultyScore": 2,
    "difficultyBasis": "Cognitive demand score determined by 5-component QRT rubric.",
    "cognitiveComponents": {
      "concept_model_selection": 1,
      "representation_translation": 0,
      "reasoning_chain_length": 1,
      "algebra_computational_load": 0,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "EXPLAIN",
    "role": "CORE2",
    "kind": "SINGLE_CHOICE",
    "stem": "Blood glucose concentration in healthy humans is tightly regulated within a narrow physiological range ($70.0\\text{ to } 100.0\\text{ mg/dL}$) by a negative feedback loop involving two antagonistic peptide hormones secreted by the endocrine pancreas.\nWhich of the following correctly pairs the specific islet cell type, hormone secreted, and target biochemical pathway activated in response to hyperglycemia (elevated blood glucose following a meal)?",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) Beta-cells of Islets of Langerhans; Insulin; Promotes cellular uptake of glucose via GLUT4 translocation and stimulates hepatic glycogenesis."
      },
      {
        "id": "opt-B",
        "text": "(B) Alpha-cells of Islets of Langerhans; Glucagon; Stimulates glycogenolysis and gluconeogenesis in the liver."
      },
      {
        "id": "opt-C",
        "text": "(C) Delta-cells of Islets of Langerhans; Somatostatin; Accelerates intestinal absorption of hexose sugars."
      },
      {
        "id": "opt-D",
        "text": "(D) Acinar exocrine cells; Pancreatic amylase; Hydrolyzes intracellular glycogen into blood glucose."
      }
    ],
    "hints": [
      "[H1 (Hyperglycemia Trigger): What hormone is released when blood glucose rises after a meal?] Elevated blood glucose triggers beta-cells of the pancreatic islets to release insulin.",
      "[H2 (Insulin Action): How does insulin lower blood glucose?] Insulin stimulates GLUT4 vesicle fusion to plasma membranes in skeletal muscle and adipose tissue, promoting glucose uptake and glycogen synthesis.",
      "[H3 (Crux Move): Identify the cell type and hormone.] Crux Move: Beta-cells secrete insulin, activating GLUT4 translocation and glycogenesis. Option A."
    ],
    "steps": [
      "1. System Representation & Setup: Endocrine control of blood glucose homeostasis through pancreatic islet hormones.",
      "2. Physical Model & Formulation: In response to hyperglycemia, beta-cells secrete insulin. Insulin acts on tyrosine kinase receptors, promoting GLUT4 translocation and glycogen synthase activation.",
      "3. Execution & Resolution: Beta-cells -> Insulin -> GLUT4 translocation and glycogenesis. Matches Option A."
    ],
    "check": "Endocrine physiology check: Alpha-cells secrete glucagon in hypoglycemia (eliminating B); acinar cells are exocrine (eliminating D). Option A confirmed.",
    "limitingCheck": "Endocrine physiology check: Alpha-cells secrete glucagon in hypoglycemia (eliminating B); acinar cells are exocrine (eliminating D). Option A confirmed.",
    "trapWarning": "Fault N09 Answer Isolation: Raw key withheld client-side; formative reasoning steps provided.",
    "correctKey": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "figures": [],
    "linkedCoreRoles": [
      "CORE1A",
      "CORE1B",
      "CORE2A",
      "CORE2B"
    ],
    "primaryCapabilityRef": "BIO-PROC-EXPLAIN-Q07",
    "status": "RELEASED",
    "academicAdmission": "HOLD (Grade9 v4.1 Parity Candidate)",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "sourceOrigin": "NSEJS Custody (Grade9v4.1)"
  },
  {
    "id": "BIO-NSEJS-PROC-08",
    "code": "BIO-NSEJS-PROC-08",
    "title": "NSEJS / Junior Science Biology \u00b7 Q08 \u00b7 MODEL \u00b7 D2 (Score 4)",
    "subjectCode": "BIO",
    "subject": "Biology",
    "topicCode": "LIFE_PROCESSES",
    "topic": "Life Processes & Nephron Physiology",
    "subtopic": "BIO-LIFE-PROCESSES",
    "exam": "NSEJS",
    "year": 2024,
    "paper": "NSEJS Core 2",
    "questionNumber": "08",
    "section": "Junior Science Olympiad",
    "markingScheme": "+3 / -1",
    "isCompetitive": true,
    "difficultyBand": "D2",
    "difficultyScore": 4,
    "difficultyBasis": "Cognitive demand score determined by 5-component QRT rubric.",
    "cognitiveComponents": {
      "concept_model_selection": 1,
      "representation_translation": 1,
      "reasoning_chain_length": 1,
      "algebra_computational_load": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "MODEL",
    "role": "CORE2",
    "kind": "SINGLE_CHOICE",
    "stem": "In a classical Mendelian dihybrid inheritance experiment in Pisum sativum, pure-breeding plants with round yellow seeds ($RRYY$) are crossed with pure-breeding plants with wrinkled green seeds ($rryy$). The resulting $F_1$ generation consists entirely of plants with round yellow seeds ($RrYy$).\nWhen these $F_1$ dihybrid plants are self-pollinated to generate the $F_2$ generation, assuming complete dominance and independent assortment of both unlinked gene loci:\n1. What is the phenotypic ratio of the four classes in the $F_2$ generation?\n2. What fraction of the total $F_2$ progeny exhibits recombinant (non-parental) phenotypes?",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) Ratio = 9 : 3 : 3 : 1; Recombinant fraction = 6/16 (37.5%)"
      },
      {
        "id": "opt-B",
        "text": "(B) Ratio = 9 : 3 : 3 : 1; Recombinant fraction = 10/16 (62.5%)"
      },
      {
        "id": "opt-C",
        "text": "(C) Ratio = 1 : 2 : 1 : 2 : 4 : 2 : 1 : 2 : 1; Recombinant fraction = 6/16 (37.5%)"
      },
      {
        "id": "opt-D",
        "text": "(D) Ratio = 3 : 1; Recombinant fraction = 1/4 (25.0%)"
      }
    ],
    "hints": [
      "[H1 (Phenotypic Classes): What are the four phenotypic classes in F2?] Round Yellow (R_Y_), Round Green (R_yy), Wrinkled Yellow (rrY_), Wrinkled Green (rryy) in 9:3:3:1 ratio.",
      "[H2 (Parental vs Recombinant): Identify which phenotypes are recombinant.] Parental phenotypes are Round Yellow and Wrinkled Green. Recombinant (new combination) phenotypes are Round Green (3/16) and Wrinkled Yellow (3/16).",
      "[H3 (Crux Move): Calculate total recombinant fraction.] Crux Move: Recombinant fraction = 3/16 + 3/16 = 6/16 = 3/8 = 37.5%. Option A."
    ],
    "steps": [
      "1. System Representation & Setup: Mendelian dihybrid cross RrYy x RrYy under independent assortment of unlinked loci.",
      "2. Physical Model & Formulation: 16-cell Punnett square produces phenotypic distribution: 9 Round Yellow, 3 Round Green, 3 Wrinkled Yellow, 1 Wrinkled Green.",
      "3. Execution & Resolution: Parental types: Round Yellow (9) + Wrinkled Green (1) = 10/16. Recombinant types: Round Green (3) + Wrinkled Yellow (3) = 6/16 = 37.5%. Matches Option A."
    ],
    "check": "Sum check: Parental (10/16) + Recombinant (6/16) = 16/16 = 1.0 (100%). Option A confirmed.",
    "limitingCheck": "Sum check: Parental (10/16) + Recombinant (6/16) = 16/16 = 1.0 (100%). Option A confirmed.",
    "trapWarning": "Fault N09 Answer Isolation: Raw key withheld client-side; formative reasoning steps provided.",
    "correctKey": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "figures": [],
    "linkedCoreRoles": [
      "CORE1A",
      "CORE1B",
      "CORE2A",
      "CORE2B"
    ],
    "primaryCapabilityRef": "BIO-PROC-MODEL-Q08",
    "status": "RELEASED",
    "academicAdmission": "HOLD (Grade9 v4.1 Parity Candidate)",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "sourceOrigin": "NSEJS Custody (Grade9v4.1)"
  },
  {
    "id": "BIO-NSEJS-PROC-09",
    "code": "BIO-NSEJS-PROC-09",
    "title": "NSEJS / Junior Science Biology \u00b7 Q09 \u00b7 APPLY \u00b7 D2 (Score 3)",
    "subjectCode": "BIO",
    "subject": "Biology",
    "topicCode": "LIFE_PROCESSES",
    "topic": "Life Processes & Nephron Physiology",
    "subtopic": "BIO-LIFE-PROCESSES",
    "exam": "NSEJS",
    "year": 2024,
    "paper": "NSEJS Core 2",
    "questionNumber": "09",
    "section": "Junior Science Olympiad",
    "markingScheme": "+3 / -1",
    "isCompetitive": true,
    "difficultyBand": "D2",
    "difficultyScore": 3,
    "difficultyBasis": "Cognitive demand score determined by 5-component QRT rubric.",
    "cognitiveComponents": {
      "concept_model_selection": 1,
      "representation_translation": 0,
      "reasoning_chain_length": 1,
      "algebra_computational_load": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "APPLY",
    "role": "CORE2",
    "kind": "SINGLE_CHOICE",
    "stem": "Red-green color blindness in humans is a well-characterized X-linked recessive genetic trait ($X^c$), while normal trichromatic vision is dominant ($X^C$).\nA man with normal vision marries a phenotypically normal woman whose father was red-green color-blind.\n1. What is the probability that their first daughter will be color-blind?\n2. What is the probability that their first son will be color-blind?",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) Probability for daughter = 0.0% (0); Probability for son = 50.0% (1/2)"
      },
      {
        "id": "opt-B",
        "text": "(B) Probability for daughter = 25.0% (1/4); Probability for son = 25.0% (1/4)"
      },
      {
        "id": "opt-C",
        "text": "(C) Probability for daughter = 50.0% (1/2); Probability for son = 50.0% (1/2)"
      },
      {
        "id": "opt-D",
        "text": "(D) Probability for daughter = 0.0% (0); Probability for son = 100.0% (1)"
      }
    ],
    "hints": [
      "[H1 (Parental Genotypes): Determine genotypes of the parents.] Father has normal vision: X^C Y. Mother is normal but has a color-blind father (X^c Y), so she must be an obligate carrier: X^C X^c.",
      "[H2 (Daughter Offspring): What alleles can daughters inherit?] All daughters receive X^C from the father. Their genotypes are X^C X^C or X^C X^c. None are homozygous recessive, so 0% are color-blind.",
      "[H3 (Crux Move): Evaluate son probability.] Crux Move: Sons receive Y from father and either X^C or X^c from mother with equal 50% probability. Thus 50% of sons are color-blind (X^c Y). Option A."
    ],
    "steps": [
      "1. System Representation & Setup: X-linked recessive cross between normal male (X^C Y) and carrier female (X^C X^c).",
      "2. Physical Model & Formulation: Punnett matrix: Daughters: 1/2 X^C X^C (normal), 1/2 X^C X^c (carrier). All daughters have at least one X^C allele; 0% are color-blind.",
      "3. Execution & Resolution: Sons: 1/2 X^C Y (normal), 1/2 X^c Y (color-blind). Probability that a son is color-blind is 1/2 (50.0%). Option A."
    ],
    "check": "Sex-linked inheritance invariant: A daughter cannot be affected with an X-linked recessive trait unless her father is affected. Since father is X^C Y, daughter probability is identically 0. Option A confirmed.",
    "limitingCheck": "Sex-linked inheritance invariant: A daughter cannot be affected with an X-linked recessive trait unless her father is affected. Since father is X^C Y, daughter probability is identically 0. Option A confirmed.",
    "trapWarning": "Fault N09 Answer Isolation: Raw key withheld client-side; formative reasoning steps provided.",
    "correctKey": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "figures": [],
    "linkedCoreRoles": [
      "CORE1A",
      "CORE1B",
      "CORE2A",
      "CORE2B"
    ],
    "primaryCapabilityRef": "BIO-PROC-APPLY-Q09",
    "status": "RELEASED",
    "academicAdmission": "HOLD (Grade9 v4.1 Parity Candidate)",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "sourceOrigin": "NSEJS Custody (Grade9v4.1)"
  },
  {
    "id": "BIO-NSEJS-PROC-10",
    "code": "BIO-NSEJS-PROC-10",
    "title": "NSEJS / Junior Science Biology \u00b7 Q10 \u00b7 JUSTIFY \u00b7 D2 (Score 4)",
    "subjectCode": "BIO",
    "subject": "Biology",
    "topicCode": "LIFE_PROCESSES",
    "topic": "Life Processes & Nephron Physiology",
    "subtopic": "BIO-LIFE-PROCESSES",
    "exam": "NSEJS",
    "year": 2024,
    "paper": "NSEJS Core 2",
    "questionNumber": "10",
    "section": "Junior Science Olympiad",
    "markingScheme": "+3 / -1",
    "isCompetitive": true,
    "difficultyBand": "D2",
    "difficultyScore": 4,
    "difficultyBasis": "Cognitive demand score determined by 5-component QRT rubric.",
    "cognitiveComponents": {
      "concept_model_selection": 2,
      "representation_translation": 0,
      "reasoning_chain_length": 1,
      "algebra_computational_load": 0,
      "trap_exception_sensitivity": 1
    },
    "qrtDemand": "JUSTIFY",
    "role": "CORE2",
    "kind": "SINGLE_CHOICE",
    "stem": "Comparative anatomical studies of vertebrate and invertebrate structures provide powerful evidentiary support for evolutionary mechanisms:\n- Case 1: The forelimbs of a human (grasping), a cheetah (running), a whale (swimming), and a bat (flying) exhibit radically different functions and external morphologies, yet share an identical basic skeletal plan (humerus, radius, ulna, carpals, metacarpals, phalanges) and common embryological origin.\n- Case 2: The wings of a butterfly and the wings of a bat perform an identical function (aerial flight) and have similar aerodynamic shapes, yet the butterfly wing is a chitinous fold of the integument whereas the bat wing is a modified tetrapod limb covered by a fleshy patagium.\nWhich of the following correctly classifies Case 1 and Case 2, and identifies the evolutionary process reflected by each?",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) Case 1 = Homologous organs reflecting Divergent evolution; Case 2 = Analogous organs reflecting Convergent evolution"
      },
      {
        "id": "opt-B",
        "text": "(B) Case 1 = Analogous organs reflecting Convergent evolution; Case 2 = Homologous organs reflecting Divergent evolution"
      },
      {
        "id": "opt-C",
        "text": "(C) Case 1 = Vestigial organs reflecting Atavism; Case 2 = Homologous organs reflecting Parallel evolution"
      },
      {
        "id": "opt-D",
        "text": "(D) Case 1 = Homologous organs reflecting Convergent evolution; Case 2 = Analogous organs reflecting Divergent evolution"
      }
    ],
    "hints": [
      "[H1 (Case 1 Definition): What do we call organs with shared structural anatomy and common origin adapted for different functions?] Homologous organs share fundamental anatomy and origin from a common ancestor, resulting from divergent evolution (adaptive radiation).",
      "[H2 (Case 2 Definition): What do we call organs with different anatomical origins adapted for the same function?] Analogous organs evolve independently in unrelated lineages under similar environmental pressures, resulting from convergent evolution.",
      "[H3 (Crux Move): Combine the two evolutionary classifications.] Crux Move: Case 1 = Homologous (Divergent evolution); Case 2 = Analogous (Convergent evolution). Option A."
    ],
    "steps": [
      "1. System Representation & Setup: Evolutionary comparative anatomy distinguishing homology (shared ancestry) from analogy (shared adaptation).",
      "2. Physical Model & Formulation: Vertebrate forelimbs share pentadactyl anatomy derived from ancestral crossopterygian lobe-finned fish (homology / divergent evolution). Insect and mammalian wings arise from completely different germ tissues (analogy / convergent evolution).",
      "3. Execution & Resolution: Case 1 = Homology / Divergent evolution; Case 2 = Analogy / Convergent evolution. Confirms Option A."
    ],
    "check": "Evolutionary theory check: Homology = divergent evolution from common ancestor; Analogy = convergent evolution towards common function. Option A confirmed.",
    "limitingCheck": "Evolutionary theory check: Homology = divergent evolution from common ancestor; Analogy = convergent evolution towards common function. Option A confirmed.",
    "trapWarning": "Fault N09 Answer Isolation: Raw key withheld client-side; formative reasoning steps provided.",
    "correctKey": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "figures": [],
    "linkedCoreRoles": [
      "CORE1A",
      "CORE1B",
      "CORE2A",
      "CORE2B"
    ],
    "primaryCapabilityRef": "BIO-PROC-JUSTIFY-Q10",
    "status": "RELEASED",
    "academicAdmission": "HOLD (Grade9 v4.1 Parity Candidate)",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "sourceOrigin": "NSEJS Custody (Grade9v4.1)"
  },
  {
    "id": "BIO-NSEJS-ENV-01",
    "code": "BIO-NSEJS-ENV-01",
    "title": "NSEJS / Junior Science Biology \u00b7 Q01 \u00b7 MODEL \u00b7 D2 (Score 4)",
    "subjectCode": "BIO",
    "subject": "Biology",
    "topicCode": "ENVIRONMENT",
    "topic": "Ecology & Ecosystem Resources",
    "subtopic": "BIO-ENVIRONMENT-RESOURCES",
    "exam": "NSEJS",
    "year": 2024,
    "paper": "NSEJS Core 2",
    "questionNumber": "01",
    "section": "Junior Science Olympiad",
    "markingScheme": "+3 / -1",
    "isCompetitive": true,
    "difficultyBand": "D2",
    "difficultyScore": 4,
    "difficultyBasis": "Cognitive demand score determined by 5-component QRT rubric.",
    "cognitiveComponents": {
      "concept_model_selection": 1,
      "representation_translation": 1,
      "reasoning_chain_length": 1,
      "algebra_computational_load": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "MODEL",
    "role": "CORE2",
    "kind": "SINGLE_CHOICE",
    "stem": "In a temperate lake ecosystem, the total incident solar radiation entering the epilimnion is $1.0 \\times 10^7\\text{ kJ}/(\\text{m}^2\\cdot\\text{yr})$. Phytoplankton (primary producers, trophic level $T_1$) capture exactly $1.0\\%$ of this incident solar energy as Gross Primary Productivity ($\\text{GPP}$), expending $40.0\\%$ of their gross energy capture in cellular respiration ($R$).\nEnergy is transferred across successive trophic levels according to Lindeman's $10\\%$ law of trophic efficiency:\n- Primary consumers (herbivorous zooplankton, $T_2$)\n- Secondary consumers (planktivorous fish, $T_3$)\n- Tertiary consumers (piscivorous eagles, $T_4$)\nSimultaneously, a lipophilic non-biodegradable organochlorine pesticide (DDT) enters the food web at an initial concentration of $0.040\\text{ ppm}$ in phytoplankton ($T_1$) and undergoes biological magnification with a $10.0$-fold concentration increase at each successive trophic step.\n[FIG-stem-bio-trophic-pyramid-biomagnification]\nCalculate the usable energy flux available to the tertiary consumer ($T_4$) and the biomagnified pesticide concentration accumulated in the adipose tissues of $T_4$.",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) Usable energy = 60.0 kJ/(m\u00b2\u00b7yr); DDT concentration = 40.0 ppm"
      },
      {
        "id": "opt-B",
        "text": "(B) Usable energy = 600.0 kJ/(m\u00b2\u00b7yr); DDT concentration = 4.0 ppm"
      },
      {
        "id": "opt-C",
        "text": "(C) Usable energy = 6.0 kJ/(m\u00b2\u00b7yr); DDT concentration = 400.0 ppm"
      },
      {
        "id": "opt-D",
        "text": "(D) Usable energy = 60.0 kJ/(m\u00b2\u00b7yr); DDT concentration = 0.040 ppm"
      }
    ],
    "hints": [
      "[H1 (Net Primary Productivity): Compute GPP and NPP at trophic level T1.] GPP = 0.010 * 1.0e7 = 100,000 kJ/(m2.yr). NPP = GPP * (1 - 0.40) = 60,000 kJ/(m2.yr).",
      "[H2 (Trophic Transfer Decay): Apply Lindeman's 10% rule through three transfers to T4.] T2 = 60,000 * 0.10 = 6,000; T3 = 600; T4 = 60.0 kJ/(m2.yr).",
      "[H3 (Crux Move): Calculate pesticide biomagnification.] Crux Move: DDT magnifies 10-fold per step: T1 (0.040) -> T2 (0.40) -> T3 (4.0) -> T4 (40.0 ppm). Option A."
    ],
    "steps": [
      "1. System Representation & Setup: Solar energy flux drives an aquatic trophic web across 4 levels alongside non-biodegradable pesticide biomagnification.",
      "2. Physical Model & Formulation: NPP = GPP - R = (0.010 * 1.0e7) * 0.60 = 60,000 kJ/(m2.yr). Lindeman trophic decay: T_n = NPP * (0.10)^(n-1) => T4 = 60,000 * (0.10)^3 = 60.0 kJ/(m2.yr).",
      "3. Execution & Resolution: Biomagnification scales up by 10 per trophic transfer: C(T4) = 0.040 * (10.0)^3 = 40.0 ppm. Both match Option A uniquely."
    ],
    "check": "Thermodynamic and toxicological check: Energy dissipates monotonically (60,000 -> 60.0 kJ), while lipid-soluble recalcitrant toxins concentrate inversely (0.040 -> 40.0 ppm). Option A confirmed.",
    "limitingCheck": "Thermodynamic and toxicological check: Energy dissipates monotonically (60,000 -> 60.0 kJ), while lipid-soluble recalcitrant toxins concentrate inversely (0.040 -> 40.0 ppm). Option A confirmed.",
    "trapWarning": "Fault N09 Answer Isolation: Raw key withheld client-side; formative reasoning steps provided.",
    "correctKey": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "figures": [
      {
        "id": "fig_bio_trophic_pyramid.svg",
        "caption": "Ecological energy pyramid and biological magnification of persistent pesticides.",
        "available": true
      }
    ],
    "linkedCoreRoles": [
      "CORE1A",
      "CORE1B",
      "CORE2A",
      "CORE2B"
    ],
    "primaryCapabilityRef": "BIO-ENV-MODEL-Q01",
    "status": "RELEASED",
    "academicAdmission": "HOLD (Grade9 v4.1 Parity Candidate)",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "sourceOrigin": "NSEJS Custody (Grade9v4.1)"
  },
  {
    "id": "BIO-NSEJS-ENV-02",
    "code": "BIO-NSEJS-ENV-02",
    "title": "NSEJS / Junior Science Biology \u00b7 Q02 \u00b7 SYNTHESIZE \u00b7 D2 (Score 4)",
    "subjectCode": "BIO",
    "subject": "Biology",
    "topicCode": "ENVIRONMENT",
    "topic": "Ecology & Ecosystem Resources",
    "subtopic": "BIO-ENVIRONMENT-RESOURCES",
    "exam": "NSEJS",
    "year": 2024,
    "paper": "NSEJS Core 2",
    "questionNumber": "02",
    "section": "Junior Science Olympiad",
    "markingScheme": "+3 / -1",
    "isCompetitive": true,
    "difficultyBand": "D2",
    "difficultyScore": 4,
    "difficultyBasis": "Cognitive demand score determined by 5-component QRT rubric.",
    "cognitiveComponents": {
      "concept_model_selection": 1,
      "representation_translation": 1,
      "reasoning_chain_length": 1,
      "algebra_computational_load": 0,
      "trap_exception_sensitivity": 1
    },
    "qrtDemand": "SYNTHESIZE",
    "role": "CORE2",
    "kind": "SINGLE_CHOICE",
    "stem": "The global nitrogen cycle relies on specialized soil microorganisms mediating distinct chemical conversions. Three critical enzymatic steps in the nitrogen cycle are:\n- Step 1: Conversion of atmospheric dinitrogen ($\\text{N}_2$) into ammonia ($\\text{NH}_3$)\n- Step 2: Biological oxidation of nitrite ions ($\\text{NO}_2^-$) into nitrate ions ($\\text{NO}_3^-$)\n- Step 3: Reduction of soil nitrates ($\\text{NO}_3^-$) back into dinitrogen gas ($\\text{N}_2$) under anaerobic conditions\nWhich of the following correctly pairs each biochemical step with the responsible bacterial genus and physiological category?",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) Step 1: Rhizobium (Symbiotic diazotroph); Step 2: Nitrobacter (Nitrifying chemoautotroph); Step 3: Pseudomonas (Denitrifying facultative anaerobe)"
      },
      {
        "id": "opt-B",
        "text": "(B) Step 1: Nitrosomonas (Nitrifier); Step 2: Azotobacter (Free-living diazotroph); Step 3: Clostridium (Ammonifier)"
      },
      {
        "id": "opt-C",
        "text": "(C) Step 1: Thiobacillus (Denitrifier); Step 2: Rhizobium (Diazotroph); Step 3: Nitrobacter (Nitrifier)"
      },
      {
        "id": "opt-D",
        "text": "(D) Step 1: Nitrobacter (Nitrifier); Step 2: Pseudomonas (Denitrifier); Step 3: Azospirillum (Diazotroph)"
      }
    ],
    "hints": [
      "[H1 (Nitrogen Fixation): What bacteria reduce N2 to NH3 inside legume root nodules?] Rhizobium species form symbiotic associations in root nodules to fix atmospheric N2 via the nitrogenase enzyme.",
      "[H2 (Nitrite Oxidation): What genus oxidizes nitrite (NO2-) to nitrate (NO3-)?] Nitrobacter chemoautotrophically oxidizes nitrite to nitrate (distinguished from Nitrosomonas, which oxidizes ammonia to nitrite).",
      "[H3 (Crux Move): What genus mediates anaerobic denitrification back to N2?] Crux Move: Pseudomonas denitrificans reduces nitrate back to N2 under waterlogged anaerobic conditions. Option A."
    ],
    "steps": [
      "1. System Representation & Setup: Microbially mediated nitrogen biogeochemical cycle transformations: fixation, nitrification, and denitrification.",
      "2. Physical Model & Formulation: N2 -> NH3 = nitrogen fixation (Rhizobium). NO2- -> NO3- = second step of nitrification (Nitrobacter). NO3- -> N2 = denitrification (Pseudomonas).",
      "3. Execution & Resolution: Step 1 = Rhizobium, Step 2 = Nitrobacter, Step 3 = Pseudomonas. Matches Option A uniquely."
    ],
    "check": "Microbial physiology check: Nitrosomonas oxidizes NH3 to NO2-, whereas Nitrobacter oxidizes NO2- to NO3-. Denitrification requires anaerobic electron acceptors (Pseudomonas). Option A verified.",
    "limitingCheck": "Microbial physiology check: Nitrosomonas oxidizes NH3 to NO2-, whereas Nitrobacter oxidizes NO2- to NO3-. Denitrification requires anaerobic electron acceptors (Pseudomonas). Option A verified.",
    "trapWarning": "Fault N09 Answer Isolation: Raw key withheld client-side; formative reasoning steps provided.",
    "correctKey": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "figures": [],
    "linkedCoreRoles": [
      "CORE1A",
      "CORE1B",
      "CORE2A",
      "CORE2B"
    ],
    "primaryCapabilityRef": "BIO-ENV-SYNTHESIZE-Q02",
    "status": "RELEASED",
    "academicAdmission": "HOLD (Grade9 v4.1 Parity Candidate)",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "sourceOrigin": "NSEJS Custody (Grade9v4.1)"
  },
  {
    "id": "BIO-NSEJS-ENV-03",
    "code": "BIO-NSEJS-ENV-03",
    "title": "NSEJS / Junior Science Biology \u00b7 Q03 \u00b7 JUSTIFY \u00b7 D2 (Score 4)",
    "subjectCode": "BIO",
    "subject": "Biology",
    "topicCode": "ENVIRONMENT",
    "topic": "Ecology & Ecosystem Resources",
    "subtopic": "BIO-ENVIRONMENT-RESOURCES",
    "exam": "NSEJS",
    "year": 2024,
    "paper": "NSEJS Core 2",
    "questionNumber": "03",
    "section": "Junior Science Olympiad",
    "markingScheme": "+3 / -1",
    "isCompetitive": true,
    "difficultyBand": "D2",
    "difficultyScore": 4,
    "difficultyBasis": "Cognitive demand score determined by 5-component QRT rubric.",
    "cognitiveComponents": {
      "concept_model_selection": 2,
      "representation_translation": 0,
      "reasoning_chain_length": 1,
      "algebra_computational_load": 0,
      "trap_exception_sensitivity": 1
    },
    "qrtDemand": "JUSTIFY",
    "role": "CORE2",
    "kind": "SINGLE_CHOICE",
    "stem": "The rapid post-industrial combustion of fossil fuels has driven atmospheric carbon dioxide levels from $280\\text{ ppm}$ to over $420\\text{ ppm}$. In addition to tropospheric greenhouse warming, atmospheric $\\text{CO}_2$ dissolution into ocean surface waters alters marine carbonate equilibrium:\n$$\\text{CO}_2\\text{(aq)} + \\text{H}_2\\text{O(l)} \\rightleftharpoons \\text{H}_2\\text{CO}_3\\text{(aq)} \\rightleftharpoons \\text{H}^+\\text{(aq)} + \\text{HCO}_3^-\\text{(aq)}$$\n$$\\text{H}^+\\text{(aq)} + \\text{CO}_3^{2-}\\text{(aq)} \\rightleftharpoons \\text{HCO}_3^-\\text{(aq)}$$\nWhich of the following provides the strictly correct physical and biogeochemical justification for why ocean acidification threatens coral reefs and marine mollusks possessing calcium carbonate ($\\text{CaCO}_3$) exoskeletons?",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) Dissociation of carbonic acid releases excess H+ ions that react with dissolved carbonate (CO3\u00b2\u207b) to form bicarbonate (HCO3\u207b), drastically reducing the availability of CO3\u00b2\u207b required for calcium carbonate calcification and dissolving existing aragonite structures."
      },
      {
        "id": "opt-B",
        "text": "(B) Elevated CO2 increases the pH of seawater, turning oceans alkaline and precipitating heavy metals onto coral surfaces."
      },
      {
        "id": "opt-C",
        "text": "(C) Dissolved CO2 directly binds to calcium ions, forming insoluble calcium carbide that settles into abyssal sediments."
      },
      {
        "id": "opt-D",
        "text": "(D) Acidification increases carbonate ion concentrations to toxic levels, causing biological calcification gigantism in marine organisms."
      }
    ],
    "hints": [
      "[H1 (Carbonic Acid Dissociation): What happens when CO2 dissolves in seawater?] CO2 forms carbonic acid (H2CO3), which dissociates to release H+ ions, lowering seawater pH (ocean acidification).",
      "[H2 (Carbonate Ion Depletion): How do excess H+ ions affect carbonate (CO3^2-)?] Excess H+ protonates carbonate ions: H+ + CO3^2- -> HCO3^-, depleting the free CO3^2- pool.",
      "[H3 (Crux Move): What is the impact on shell-building calcifiers?] Crux Move: Lower carbonate availability prevents organisms from precipitating CaCO3 (aragonite/calcite) and promotes shell dissolution. Option A."
    ],
    "steps": [
      "1. System Representation & Setup: Anthropogenic CO2 rise driving oceanic uptake and shift in marine carbonate-bicarbonate buffer system.",
      "2. Physical Model & Formulation: Elevated pCO2 produces H2CO3 -> H+ + HCO3-. The extra H+ consumes CO3^2- to generate additional HCO3-, lowering the saturation state (Omega) of aragonite/calcite below 1.0.",
      "3. Execution & Resolution: Corals and mollusks cannot maintain CaCO3 skeletons when carbonate ions are depleted and pH declines. Option A provides the exact chemical justification."
    ],
    "check": "Biogeochemical equilibrium check: Increasing pCO2 lowers pH (eliminating B) and lowers CO3^2- concentration (eliminating D). Option A confirmed.",
    "limitingCheck": "Biogeochemical equilibrium check: Increasing pCO2 lowers pH (eliminating B) and lowers CO3^2- concentration (eliminating D). Option A confirmed.",
    "trapWarning": "Fault N09 Answer Isolation: Raw key withheld client-side; formative reasoning steps provided.",
    "correctKey": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "figures": [],
    "linkedCoreRoles": [
      "CORE1A",
      "CORE1B",
      "CORE2A",
      "CORE2B"
    ],
    "primaryCapabilityRef": "BIO-ENV-JUSTIFY-Q03",
    "status": "RELEASED",
    "academicAdmission": "HOLD (Grade9 v4.1 Parity Candidate)",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "sourceOrigin": "NSEJS Custody (Grade9v4.1)"
  },
  {
    "id": "BIO-NSEJS-ENV-04",
    "code": "BIO-NSEJS-ENV-04",
    "title": "NSEJS / Junior Science Biology \u00b7 Q04 \u00b7 MODEL \u00b7 D2 (Score 4)",
    "subjectCode": "BIO",
    "subject": "Biology",
    "topicCode": "ENVIRONMENT",
    "topic": "Ecology & Ecosystem Resources",
    "subtopic": "BIO-ENVIRONMENT-RESOURCES",
    "exam": "NSEJS",
    "year": 2024,
    "paper": "NSEJS Core 2",
    "questionNumber": "04",
    "section": "Junior Science Olympiad",
    "markingScheme": "+3 / -1",
    "isCompetitive": true,
    "difficultyBand": "D2",
    "difficultyScore": 4,
    "difficultyBasis": "Cognitive demand score determined by 5-component QRT rubric.",
    "cognitiveComponents": {
      "concept_model_selection": 1,
      "representation_translation": 1,
      "reasoning_chain_length": 1,
      "algebra_computational_load": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "MODEL",
    "role": "CORE2",
    "kind": "SINGLE_CHOICE",
    "stem": "In the stratosphere, the steady-state concentration of ozone ($\\text{O}_3$) is maintained by Chapman photochemical reactions. However, anthropogenic chlorofluorocarbons (e.g. $\\text{CF}_2\\text{Cl}_2$) released into the troposphere migrate to the stratosphere and undergo photolytic cleavage by solar UV-C radiation:\n$$\\text{CF}_2\\text{Cl}_2 \\xrightarrow{h\\nu} \\cdot\\text{CF}_2\\text{Cl} + \\text{Cl}\\cdot$$\nThe atomic chlorine radical ($\\text{Cl}\\cdot$) then catalyzes ozone destruction through a two-step cycle:\n$$\\text{Cl}\\cdot + \\text{O}_3 \\to \\text{ClO}\\cdot + \\text{O}_2$$\n$$\\text{ClO}\\cdot + \\text{O}\\cdot \\to \\text{Cl}\\cdot + \\text{O}_2$$\nWhich of the following correctly identifies the net reaction of this catalytic cycle, and explains why a single chlorine radical can destroy upwards of $100,000$ ozone molecules?",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) Net reaction: O3 + O\u00b7 -> 2 O2; Chlorine acts as a regenerated homogeneous catalyst that is not consumed in the overall reaction sequence."
      },
      {
        "id": "opt-B",
        "text": "(B) Net reaction: 2 O3 -> 3 O2; Chlorine permanently binds to ozone molecules forming stable chlorinated polymers."
      },
      {
        "id": "opt-C",
        "text": "(C) Net reaction: O2 + O\u00b7 -> O3; Chlorine generates ultraviolet photons that accelerate ozone synthesis."
      },
      {
        "id": "opt-D",
        "text": "(D) Net reaction: ClO\u00b7 + O3 -> Cl\u00b7 + 2 O2; Chlorine radicals decay into water vapor within minutes."
      }
    ],
    "hints": [
      "[H1 (Net Reaction Summation): Add the two steps of the catalytic cycle.] Step 1: Cl + O3 -> ClO + O2. Step 2: ClO + O -> Cl + O2. Adding and canceling intermediates (Cl and ClO) yields: O3 + O -> 2 O2.",
      "[H2 (Catalytic Regeneration): What happens to the Cl radical after Step 2?] The Cl radical is regenerated in Step 2, ready to attack another O3 molecule.",
      "[H3 (Crux Move): Conclude why 10^5 molecules are destroyed.] Crux Move: Because Cl acts as a catalyst, it enters thousands of cycles before being temporarily sequestered into reservoir species (HCl, ClONO2). Option A."
    ],
    "steps": [
      "1. System Representation & Setup: Stratospheric ozone depletion mediated by halogen catalytic chain cycles.",
      "2. Physical Model & Formulation: Summing the propagation steps cancels Cl* and ClO*, yielding net: O3 + O* -> 2 O2. Activation energy is drastically reduced compared to uncatalyzed Chapman destruction.",
      "3. Execution & Resolution: Because Cl* is regenerated in every cycle without consumption, a single radical destroys ~10^5 ozone molecules before termination. Matches Option A."
    ],
    "check": "Chemical kinetics check: Cl* appears as reactant in step 1 and product in step 2; by definition it is a catalyst. Net reaction is O3 + O* -> 2 O2. Option A confirmed.",
    "limitingCheck": "Chemical kinetics check: Cl* appears as reactant in step 1 and product in step 2; by definition it is a catalyst. Net reaction is O3 + O* -> 2 O2. Option A confirmed.",
    "trapWarning": "Fault N09 Answer Isolation: Raw key withheld client-side; formative reasoning steps provided.",
    "correctKey": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "figures": [],
    "linkedCoreRoles": [
      "CORE1A",
      "CORE1B",
      "CORE2A",
      "CORE2B"
    ],
    "primaryCapabilityRef": "BIO-ENV-MODEL-Q04",
    "status": "RELEASED",
    "academicAdmission": "HOLD (Grade9 v4.1 Parity Candidate)",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "sourceOrigin": "NSEJS Custody (Grade9v4.1)"
  },
  {
    "id": "BIO-NSEJS-ENV-05",
    "code": "BIO-NSEJS-ENV-05",
    "title": "NSEJS / Junior Science Biology \u00b7 Q05 \u00b7 APPLY \u00b7 D2 (Score 3)",
    "subjectCode": "BIO",
    "subject": "Biology",
    "topicCode": "ENVIRONMENT",
    "topic": "Ecology & Ecosystem Resources",
    "subtopic": "BIO-ENVIRONMENT-RESOURCES",
    "exam": "NSEJS",
    "year": 2024,
    "paper": "NSEJS Core 2",
    "questionNumber": "05",
    "section": "Junior Science Olympiad",
    "markingScheme": "+3 / -1",
    "isCompetitive": true,
    "difficultyBand": "D2",
    "difficultyScore": 3,
    "difficultyBasis": "Cognitive demand score determined by 5-component QRT rubric.",
    "cognitiveComponents": {
      "concept_model_selection": 1,
      "representation_translation": 1,
      "reasoning_chain_length": 1,
      "algebra_computational_load": 0,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "APPLY",
    "role": "CORE2",
    "kind": "SINGLE_CHOICE",
    "stem": "An environmental monitoring station tracks the water quality of a clean river immediately upstream and downstream of a municipal sewage discharge pipe. Upstream water has a Dissolved Oxygen ($\\text{DO}$) of $8.5\\text{ mg/L}$ and a Biochemical Oxygen Demand ($\\text{BOD}$) of $1.5\\text{ mg/L}$.\nImmediately downstream of the sewage outfall, what dramatic changes in $\\text{BOD}$ and $\\text{DO}$ concentrations occur, and what is the biological cause?",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) BOD surges sharply and DO plummets rapidly; because aerobic decomposing bacteria proliferate exponentially to metabolize the organic waste, consuming dissolved oxygen."
      },
      {
        "id": "opt-B",
        "text": "(B) Both BOD and DO increase simultaneously; because organic matter directly oxygenates the water."
      },
      {
        "id": "opt-C",
        "text": "(C) BOD drops to zero and DO rises to saturation; because sewage destroys all bacterial life in the river."
      },
      {
        "id": "opt-D",
        "text": "(D) BOD remains constant while DO drops; because sewage chemically evaporates water molecules."
      }
    ],
    "hints": [
      "[H1 (Definition of BOD): What does high BOD indicate?] BOD measures the amount of oxygen required by aerobic microorganisms to decompose organic matter in a water sample. High sewage = high BOD.",
      "[H2 (Impact on Dissolved Oxygen): What happens to DO as decomposers consume oxygen?] Aerobic respiration by decomposers rapidly depletes dissolved oxygen (DO), creating an 'oxygen sag' that suffocates fish.",
      "[H3 (Crux Move): Combine the reciprocal relationship.] Crux Move: Influx of organic sewage causes a sharp spike in BOD and a steep plunge in DO. Option A."
    ],
    "steps": [
      "1. System Representation & Setup: Point-source organic pollutant discharge into a lotic freshwater ecosystem producing an oxygen sag curve.",
      "2. Physical Model & Formulation: Influx of biodegradable organic compounds provides abundant substrate for heterotrophic aerobic bacteria. Microbial respiration rate outpaces atmospheric reaeration, depleting DO while increasing BOD.",
      "3. Execution & Resolution: BOD increases sharply; DO drops precipitously. Corresponds to Option A."
    ],
    "check": "Ecosystem limnology check: High organic pollution corresponds to high BOD and low DO (oxygen sag curve). Confirms Option A.",
    "limitingCheck": "Ecosystem limnology check: High organic pollution corresponds to high BOD and low DO (oxygen sag curve). Confirms Option A.",
    "trapWarning": "Fault N09 Answer Isolation: Raw key withheld client-side; formative reasoning steps provided.",
    "correctKey": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "figures": [],
    "linkedCoreRoles": [
      "CORE1A",
      "CORE1B",
      "CORE2A",
      "CORE2B"
    ],
    "primaryCapabilityRef": "BIO-ENV-APPLY-Q05",
    "status": "RELEASED",
    "academicAdmission": "HOLD (Grade9 v4.1 Parity Candidate)",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "sourceOrigin": "NSEJS Custody (Grade9v4.1)"
  },
  {
    "id": "BIO-NSEJS-ENV-06",
    "code": "BIO-NSEJS-ENV-06",
    "title": "NSEJS / Junior Science Biology \u00b7 Q06 \u00b7 EXPLAIN \u00b7 D1 (Score 2)",
    "subjectCode": "BIO",
    "subject": "Biology",
    "topicCode": "ENVIRONMENT",
    "topic": "Ecology & Ecosystem Resources",
    "subtopic": "BIO-ENVIRONMENT-RESOURCES",
    "exam": "NSEJS",
    "year": 2024,
    "paper": "NSEJS Core 2",
    "questionNumber": "06",
    "section": "Junior Science Olympiad",
    "markingScheme": "+3 / -1",
    "isCompetitive": true,
    "difficultyBand": "D1",
    "difficultyScore": 2,
    "difficultyBasis": "Cognitive demand score determined by 5-component QRT rubric.",
    "cognitiveComponents": {
      "concept_model_selection": 1,
      "representation_translation": 0,
      "reasoning_chain_length": 1,
      "algebra_computational_load": 0,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "EXPLAIN",
    "role": "CORE2",
    "kind": "SINGLE_CHOICE",
    "stem": "In rural decentralized energy production, agricultural cow dung (gobar) and crop residues are converted into clean fuel in anaerobic biogas digesters. The primary combustible component of biogas is methane ($\\text{CH}_4$, $55\\text{ to } 70\\%$ by volume).\nWhich of the following biological processes and bacterial groups is responsible for the final generation of methane in a sealed biogas plant?",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) Methanogenesis carried out by obligately anaerobic methanogenic archaebacteria (e.g. Methanobacterium) converting acetate, CO2, and H2 into methane."
      },
      {
        "id": "opt-B",
        "text": "(B) Aerobic respiration by fungal mycelia oxidizing cellulose directly into methane."
      },
      {
        "id": "opt-C",
        "text": "(C) Photosynthetic carbon fixation by cyanobacteria under anaerobic darkness."
      },
      {
        "id": "opt-D",
        "text": "(D) Lactic acid fermentation by Lactobacillus bacteria converting sugars into methane."
      }
    ],
    "hints": [
      "[H1 (Oxygen Requirement): Does biogas production require oxygen or anoxia?] Biogas production is an strictly anaerobic three-stage digestion occurring in sealed, oxygen-free digesters.",
      "[H2 (Microbial Identity): What group of microbes produces methane gas?] Methanogens (such as Methanobacterium, belonging to Archaea) are obligate anaerobes that reduce acetate/CO2 to methane.",
      "[H3 (Crux Move): Identify the final biochemical step.] Crux Move: Methanogenesis is executed by anaerobic methanogens. Option A."
    ],
    "steps": [
      "1. System Representation & Setup: Anaerobic digestion of organic animal biomass in an enclosed biogas plant.",
      "2. Physical Model & Formulation: Three anaerobic phases: (1) Hydrolysis & Acidogenesis, (2) Acetogenesis, (3) Methanogenesis. Methanogens utilize acetate and H2/CO2 to synthesize CH4.",
      "3. Execution & Resolution: Obligately anaerobic methanogens (Methanobacterium) carry out methanogenesis. Option A."
    ],
    "check": "Biochemical taxonomy check: Methanogens are Archaea operating strictly anaerobically. Aerobic respiration produces CO2 and H2O, not CH4 (eliminating B). Option A confirmed.",
    "limitingCheck": "Biochemical taxonomy check: Methanogens are Archaea operating strictly anaerobically. Aerobic respiration produces CO2 and H2O, not CH4 (eliminating B). Option A confirmed.",
    "trapWarning": "Fault N09 Answer Isolation: Raw key withheld client-side; formative reasoning steps provided.",
    "correctKey": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "figures": [],
    "linkedCoreRoles": [
      "CORE1A",
      "CORE1B",
      "CORE2A",
      "CORE2B"
    ],
    "primaryCapabilityRef": "BIO-ENV-EXPLAIN-Q06",
    "status": "RELEASED",
    "academicAdmission": "HOLD (Grade9 v4.1 Parity Candidate)",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "sourceOrigin": "NSEJS Custody (Grade9v4.1)"
  },
  {
    "id": "BIO-NSEJS-ENV-07",
    "code": "BIO-NSEJS-ENV-07",
    "title": "NSEJS / Junior Science Biology \u00b7 Q07 \u00b7 APPLY \u00b7 D1 (Score 2)",
    "subjectCode": "BIO",
    "subject": "Biology",
    "topicCode": "ENVIRONMENT",
    "topic": "Ecology & Ecosystem Resources",
    "subtopic": "BIO-ENVIRONMENT-RESOURCES",
    "exam": "NSEJS",
    "year": 2024,
    "paper": "NSEJS Core 2",
    "questionNumber": "07",
    "section": "Junior Science Olympiad",
    "markingScheme": "+3 / -1",
    "isCompetitive": true,
    "difficultyBand": "D1",
    "difficultyScore": 2,
    "difficultyBasis": "Cognitive demand score determined by 5-component QRT rubric.",
    "cognitiveComponents": {
      "concept_model_selection": 1,
      "representation_translation": 0,
      "reasoning_chain_length": 1,
      "algebra_computational_load": 0,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "APPLY",
    "role": "CORE2",
    "kind": "SINGLE_CHOICE",
    "stem": "Traditional rainwater harvesting systems in semi-arid and arid regions of India (such as *Khadins* and *Johads* in Rajasthan) utilize earthen check dams built across sloping agricultural catchments.\nWhat is the primary ecological and hydrologic advantage of these structures over large surface-water reservoirs?",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) They decelerate surface runoff to recharge subterranean aquifers, reduce soil erosion, and prevent evaporative water loss and mosquito breeding associated with stagnant open surface reservoirs."
      },
      {
        "id": "opt-B",
        "text": "(B) They accelerate river flow to maximize hydroelectric power generation during monsoon floods."
      },
      {
        "id": "opt-C",
        "text": "(C) They permanently submerge large forest tracts to eliminate terrestrial weeds."
      },
      {
        "id": "opt-D",
        "text": "(D) They evaporate all collected rainwater into the atmosphere to increase local cloud formation."
      }
    ],
    "hints": [
      "[H1 (Groundwater Recharge): Where does captured water go in Khadins/Johads?] Water is retained temporarily behind earthen bunds to allow percolation into the soil and underlying groundwater aquifer.",
      "[H2 (Advantages of Subsurface Storage): Why is groundwater storage superior to open reservoirs in arid climates?] Groundwater does not evaporate under scorching desert heat, does not provide breeding grounds for mosquitoes, and remains protected from surface contamination.",
      "[H3 (Crux Move): Select the comprehensive ecological rationale.] Crux Move: Recharging aquifers, mitigating erosion, and preventing evaporative loss. Option A."
    ],
    "steps": [
      "1. System Representation & Setup: Community watershed harvesting systems utilizing earthen check bunds in arid zones.",
      "2. Physical Model & Formulation: Infiltration mechanics: slowing runoff velocity increases contact time with permeable soil, enabling aquifer replenishment. Retained soil moisture permits subsequent rabi crop cultivation.",
      "3. Execution & Resolution: Option A compiles all primary hydrological, agronomic, and vector-control benefits."
    ],
    "check": "Agronomic ecology check: Subsurface aquifer storage prevents huge evaporation losses typical of surface tanks in arid Rajasthan. Option A verified.",
    "limitingCheck": "Agronomic ecology check: Subsurface aquifer storage prevents huge evaporation losses typical of surface tanks in arid Rajasthan. Option A verified.",
    "trapWarning": "Fault N09 Answer Isolation: Raw key withheld client-side; formative reasoning steps provided.",
    "correctKey": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "figures": [],
    "linkedCoreRoles": [
      "CORE1A",
      "CORE1B",
      "CORE2A",
      "CORE2B"
    ],
    "primaryCapabilityRef": "BIO-ENV-APPLY-Q07",
    "status": "RELEASED",
    "academicAdmission": "HOLD (Grade9 v4.1 Parity Candidate)",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "sourceOrigin": "NSEJS Custody (Grade9v4.1)"
  },
  {
    "id": "BIO-NSEJS-ENV-08",
    "code": "BIO-NSEJS-ENV-08",
    "title": "NSEJS / Junior Science Biology \u00b7 Q08 \u00b7 MODEL \u00b7 D2 (Score 4)",
    "subjectCode": "BIO",
    "subject": "Biology",
    "topicCode": "ENVIRONMENT",
    "topic": "Ecology & Ecosystem Resources",
    "subtopic": "BIO-ENVIRONMENT-RESOURCES",
    "exam": "NSEJS",
    "year": 2024,
    "paper": "NSEJS Core 2",
    "questionNumber": "08",
    "section": "Junior Science Olympiad",
    "markingScheme": "+3 / -1",
    "isCompetitive": true,
    "difficultyBand": "D2",
    "difficultyScore": 4,
    "difficultyBasis": "Cognitive demand score determined by 5-component QRT rubric.",
    "cognitiveComponents": {
      "concept_model_selection": 1,
      "representation_translation": 1,
      "reasoning_chain_length": 1,
      "algebra_computational_load": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "MODEL",
    "role": "CORE2",
    "kind": "SINGLE_CHOICE",
    "stem": "Commercial agricultural fertilizers are labeled with an N-P-K grade representing the mass percentages of elemental Nitrogen ($\\text{N}$), available phosphorus pentoxide ($\\text{P}_2\\text{O}_5$), and soluble potassium oxide ($\\text{K}_2\\text{O}$).\nA progressive farmer applies one $50.0\\text{ kg}$ bag of a premium $20-10-10$ grade fertilizer to a maize field.\nWhat are the exact elemental masses of Nitrogen ($\\text{N}$), Phosphorus ($\\text{P}$), and Potassium ($\\text{K}$) delivered to the soil from this single $50.0\\text{ kg}$ bag?\n(Atomic masses: $\\text{N} = 14.0\\text{ u}, \\text{P} = 31.0\\text{ u}, \\text{K} = 39.1\\text{ u}, \\text{O} = 16.0\\text{ u}$)",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) N = 10.00 kg; P = 2.18 kg; K = 4.15 kg"
      },
      {
        "id": "opt-B",
        "text": "(B) N = 10.00 kg; P = 5.00 kg; K = 5.00 kg"
      },
      {
        "id": "opt-C",
        "text": "(C) N = 20.00 kg; P = 10.00 kg; K = 10.00 kg"
      },
      {
        "id": "opt-D",
        "text": "(D) N = 10.00 kg; P = 1.09 kg; K = 2.08 kg"
      }
    ],
    "hints": [
      "[H1 (Nitrogen Mass): Calculate elemental nitrogen in 50 kg of 20% N.] Mass of N = 50.0 kg * 0.20 = 10.00 kg.",
      "[H2 (Phosphorus Mass Conversion): Convert 10% P2O5 into elemental P.] Mass of P2O5 = 50.0 kg * 0.10 = 5.00 kg. M(P2O5) = 2(31) + 5(16) = 142. M(P2) = 62. Elemental P = 5.00 * (62 / 142) = 2.18 kg.",
      "[H3 (Crux Move): Convert 10% K2O into elemental K.] Crux Move: Mass of K2O = 50.0 kg * 0.10 = 5.00 kg. M(K2O) = 2(39.1) + 16 = 94.2. M(K2) = 78.2. Elemental K = 5.00 * (78.2 / 94.2) = 4.15 kg. Option A."
    ],
    "steps": [
      "1. System Representation & Setup: A 50.0 kg bag of 20-10-10 fertilizer provides 20% N, 10% P2O5, and 10% K2O.",
      "2. Physical Model & Formulation: Mass N = 50.0 * 0.20 = 10.00 kg. Mass P = 5.00 kg P2O5 * (62.0 g/mol P / 142.0 g/mol P2O5) = 2.183 kg. Mass K = 5.00 kg K2O * (78.2 g/mol K / 94.2 g/mol K2O) = 4.151 kg.",
      "3. Execution & Resolution: Elemental masses are N = 10.00 kg, P = 2.18 kg, K = 4.15 kg. Option A."
    ],
    "check": "Gravimetric factor check: Fertilizer oxide conversion factors: P = P2O5 * 0.4364 (5.0 * 0.4364 = 2.18 kg); K = K2O * 0.8302 (5.0 * 0.8302 = 4.15 kg). Matches agronomic standard tables exactly. Option A confirmed.",
    "limitingCheck": "Gravimetric factor check: Fertilizer oxide conversion factors: P = P2O5 * 0.4364 (5.0 * 0.4364 = 2.18 kg); K = K2O * 0.8302 (5.0 * 0.8302 = 4.15 kg). Matches agronomic standard tables exactly. Option A confirmed.",
    "trapWarning": "Fault N09 Answer Isolation: Raw key withheld client-side; formative reasoning steps provided.",
    "correctKey": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "figures": [],
    "linkedCoreRoles": [
      "CORE1A",
      "CORE1B",
      "CORE2A",
      "CORE2B"
    ],
    "primaryCapabilityRef": "BIO-ENV-MODEL-Q08",
    "status": "RELEASED",
    "academicAdmission": "HOLD (Grade9 v4.1 Parity Candidate)",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "sourceOrigin": "NSEJS Custody (Grade9v4.1)"
  },
  {
    "id": "BIO-NSEJS-ENV-09",
    "code": "BIO-NSEJS-ENV-09",
    "title": "NSEJS / Junior Science Biology \u00b7 Q09 \u00b7 JUSTIFY \u00b7 D2 (Score 4)",
    "subjectCode": "BIO",
    "subject": "Biology",
    "topicCode": "ENVIRONMENT",
    "topic": "Ecology & Ecosystem Resources",
    "subtopic": "BIO-ENVIRONMENT-RESOURCES",
    "exam": "NSEJS",
    "year": 2024,
    "paper": "NSEJS Core 2",
    "questionNumber": "09",
    "section": "Junior Science Olympiad",
    "markingScheme": "+3 / -1",
    "isCompetitive": true,
    "difficultyBand": "D2",
    "difficultyScore": 4,
    "difficultyBasis": "Cognitive demand score determined by 5-component QRT rubric.",
    "cognitiveComponents": {
      "concept_model_selection": 2,
      "representation_translation": 0,
      "reasoning_chain_length": 1,
      "algebra_computational_load": 0,
      "trap_exception_sensitivity": 1
    },
    "qrtDemand": "JUSTIFY",
    "role": "CORE2",
    "kind": "SINGLE_CHOICE",
    "stem": "In modern plant breeding for high-yield cereal crops (such as hybrid maize and pearl millet), agronomists develop pure inbred parental lines ($P_1$ and $P_2$) through repeated self-pollination over several generations, and then cross them to produce $F_1$ hybrid seeds exhibiting heterosis (hybrid vigor).\nHowever, farmers are strictly advised NOT to save and sow the $F_2$ seeds harvested from their high-yielding $F_1$ hybrid crop in the subsequent season.\nWhich of the following scientifically justifies why saving $F_2$ hybrid seed leads to agricultural failure?",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) Mendelian segregation and independent assortment in the F2 generation disrupt favorable heterozygous gene combinations, resulting in severe phenotypic variation, stunted growth, and a drastic decline in crop yield."
      },
      {
        "id": "opt-B",
        "text": "(B) F1 plants are triploid and therefore produce completely sterile F2 seeds that cannot germinate under soil moisture."
      },
      {
        "id": "opt-C",
        "text": "(C) F2 seeds accumulate toxic levels of nitrogenous alkaloids that poison the surrounding soil microbiome."
      },
      {
        "id": "opt-D",
        "text": "(D) Inbreeding depression only occurs in the F1 generation, while the F2 generation undergoes spontaneous somatic mutations."
      }
    ],
    "hints": [
      "[H1 (Genetic Basis of Heterosis): Why are F1 hybrids superior to their inbred parents?] Heterosis results from high heterozygosity masking deleterious recessive alleles across multiple gene loci.",
      "[H2 (Mendelian Fate of F2): What happens when heterozygous F1 plants self-pollinate?] Selfing F1 (AaBb...) causes Mendelian segregation and recombination, halving heterozygosity and exposing homozygous deleterious recessives.",
      "[H3 (Crux Move): Formulate the agricultural justification.] Crux Move: Segregation creates severe genetic variability and yield depression in F2. Option A."
    ],
    "steps": [
      "1. System Representation & Setup: Quantitative genetics of crop breeding comparing uniform heterozygous F1 hybrid vigor with segregated F2 progeny.",
      "2. Physical Model & Formulation: Heterosis arises from overdominance and dominant complementation at heterozygous loci. In F2, selfing reduces heterozygosity by 50% per generation according to Mendel's law of segregation.",
      "3. Execution & Resolution: The F2 generation exhibits broad phenotypic heterogeneity and inbreeding depression, causing significant loss of yield and uniformity. Confirms Option A."
    ],
    "check": "Agronomic genetic check: Standard commercial hybrid crops (corn, sorghum) require fresh F1 seed every year because F2 suffers segregation breakdown. Option A confirmed.",
    "limitingCheck": "Agronomic genetic check: Standard commercial hybrid crops (corn, sorghum) require fresh F1 seed every year because F2 suffers segregation breakdown. Option A confirmed.",
    "trapWarning": "Fault N09 Answer Isolation: Raw key withheld client-side; formative reasoning steps provided.",
    "correctKey": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "figures": [],
    "linkedCoreRoles": [
      "CORE1A",
      "CORE1B",
      "CORE2A",
      "CORE2B"
    ],
    "primaryCapabilityRef": "BIO-ENV-JUSTIFY-Q09",
    "status": "RELEASED",
    "academicAdmission": "HOLD (Grade9 v4.1 Parity Candidate)",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "sourceOrigin": "NSEJS Custody (Grade9v4.1)"
  },
  {
    "id": "BIO-NSEJS-ENV-10",
    "code": "BIO-NSEJS-ENV-10",
    "title": "NSEJS / Junior Science Biology \u00b7 Q10 \u00b7 APPLY \u00b7 D2 (Score 3)",
    "subjectCode": "BIO",
    "subject": "Biology",
    "topicCode": "ENVIRONMENT",
    "topic": "Ecology & Ecosystem Resources",
    "subtopic": "BIO-ENVIRONMENT-RESOURCES",
    "exam": "NSEJS",
    "year": 2024,
    "paper": "NSEJS Core 2",
    "questionNumber": "10",
    "section": "Junior Science Olympiad",
    "markingScheme": "+3 / -1",
    "isCompetitive": true,
    "difficultyBand": "D2",
    "difficultyScore": 3,
    "difficultyBasis": "Cognitive demand score determined by 5-component QRT rubric.",
    "cognitiveComponents": {
      "concept_model_selection": 1,
      "representation_translation": 1,
      "reasoning_chain_length": 1,
      "algebra_computational_load": 0,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "APPLY",
    "role": "CORE2",
    "kind": "SINGLE_CHOICE",
    "stem": "In composite fish culture (polyculture), a fish farmer introduces five distinct freshwater fish species into a single perennial pond:\n- Species 1: Catla (*Catla catla*)\n- Species 2: Rohu (*Labeo rohita*)\n- Species 3: Mrigal (*Cirrhinus mrigala*)\n- Species 4: Silver Carp (*Hypophthalmichthys molitrix*)\n- Species 5: Grass Carp (*Ctenopharyngodon idella*)\nWhich of the following correctly describes how ecological niche partitioning enables these five species to coexist without interspecific competition, maximizing total fish biomass yield?",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) Catla and Silver Carp feed at the surface, Rohu feeds in the middle column, Mrigal feeds on the bottom detritus, and Grass Carp feeds on aquatic macro-vegetation."
      },
      {
        "id": "opt-B",
        "text": "(B) All five species feed exclusively on bottom benthic invertebrates during nighttime hours."
      },
      {
        "id": "opt-C",
        "text": "(C) Catla feeds on the bottom mud, Rohu eats surface weeds, and Mrigal feeds exclusively on zooplankton in the upper stratum."
      },
      {
        "id": "opt-D",
        "text": "(D) The five species prey on each other in an artificial predator-prey food chain inside the pond."
      }
    ],
    "hints": [
      "[H1 (Surface Feeders): Which species feed at the water surface?] Catla feeds on zooplankton at the surface, and Silver Carp feeds on surface phytoplankton.",
      "[H2 (Middle and Bottom Feeders): Where do Rohu and Mrigal feed?] Rohu is a column feeder in the middle water layer; Mrigal and Common Carp are bottom feeders scavenging decaying detritus.",
      "[H3 (Crux Move): What is the specific niche of Grass Carp?] Crux Move: Grass Carp feeds on submerged aquatic weeds, preventing pond choking and leaving other food niches untouched. Option A."
    ],
    "steps": [
      "1. System Representation & Setup: Polyculture aquaculture system designed around vertical stratification and trophic food niche differentiation.",
      "2. Physical Model & Formulation: Competitive exclusion principle (Gause) states two species competing for the exact same limiting resource cannot coexist. Polyculture separates spatial strata (surface, column, bottom) and dietary items (zooplankton, phytoplankton, detritus, aquatic weeds).",
      "3. Execution & Resolution: Catla/Silver Carp (surface), Rohu (middle), Mrigal (bottom), Grass Carp (weeds). Matches Option A."
    ],
    "check": "Aquaculture ecological check: Vertical and dietary partitioning prevents niche overlap, enabling 5x higher yield than monoculture. Option A confirmed.",
    "limitingCheck": "Aquaculture ecological check: Vertical and dietary partitioning prevents niche overlap, enabling 5x higher yield than monoculture. Option A confirmed.",
    "trapWarning": "Fault N09 Answer Isolation: Raw key withheld client-side; formative reasoning steps provided.",
    "correctKey": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "figures": [],
    "linkedCoreRoles": [
      "CORE1A",
      "CORE1B",
      "CORE2A",
      "CORE2B"
    ],
    "primaryCapabilityRef": "BIO-ENV-APPLY-Q10",
    "status": "RELEASED",
    "academicAdmission": "HOLD (Grade9 v4.1 Parity Candidate)",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "sourceOrigin": "NSEJS Custody (Grade9v4.1)"
  },
  {
    "id": "NSEJS-2024-B-Q01",
    "code": "NSEJS-2024-B-Q01",
    "title": "NSEJS 2024-25 \u00b7 Q01 \u00b7 RETRIEVE \u00b7 D1 (Score 2)",
    "subjectCode": "BIO",
    "subject": "Biology",
    "topicCode": "LIVING_WORLD",
    "topic": "Cell Biology & Molecular Genetics",
    "subtopic": "Cell & Molecular Biology",
    "exam": "NSEJS",
    "year": 2024,
    "paper": "NSEJS Core 2",
    "questionNumber": "Q01",
    "section": "Junior Science Olympiad",
    "markingScheme": "+3 / -1",
    "isCompetitive": true,
    "difficultyBand": "D1",
    "difficultyScore": 2,
    "difficultyBasis": "Cognitive demand score determined by 5-component QRT rubric.",
    "cognitiveComponents": {
      "concept_model_selection": 1,
      "representation_translation": 1,
      "reasoning_chain_length": 1,
      "algebra_computational_load": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "RETRIEVE",
    "role": "CORE2",
    "kind": "SINGLE_CHOICE",
    "stem": "In bilaterally symmetrical animals, true serial repetition of body parts into a linear succession of similar segments is called metamerism. In which of the following animal phyla did true metameric segmentation appear for the first time in evolutionary history?",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) Platyhelminthes"
      },
      {
        "id": "opt-B",
        "text": "(B) Arthropoda"
      },
      {
        "id": "opt-C",
        "text": "(C) Vertebrata"
      },
      {
        "id": "opt-D",
        "text": "(D) Annelida"
      }
    ],
    "hints": [
      "[H1 (Context & Setup): Identify governing principles.] 1. Biological Definition: Metamerism is the true segmentation where internal organs and external body wall are repeated in linear series along the antero-posterior axis.",
      "[H2 (Formulation & Analysis): Key relationship.] 2. Evolutionary Chronology: Platyhelminthes are unsegmented acoelomates (tapeworms show pseudosegmentation). True coelomate metamerism first evolved in Annelida (e.g. earthworms, nereis).",
      "[H3 (Crux Resolution): Final calculation.] 3. Conclusion: Annelida is the earliest phylum to exhibit true metamerism, preceding Arthropoda and Chordata/Vertebrata. This confirms Option D."
    ],
    "steps": [
      "1. Biological Definition: Metamerism is the true segmentation where internal organs and external body wall are repeated in linear series along the antero-posterior axis.",
      "2. Evolutionary Chronology: Platyhelminthes are unsegmented acoelomates (tapeworms show pseudosegmentation). True coelomate metamerism first evolved in Annelida (e.g. earthworms, nereis).",
      "3. Conclusion: Annelida is the earliest phylum to exhibit true metamerism, preceding Arthropoda and Chordata/Vertebrata. This confirms Option D."
    ],
    "check": "Adjudicated under IAPT 2024 examination standards.",
    "limitingCheck": "Adjudicated under IAPT 2024 examination standards.",
    "trapWarning": "Fault N09 Answer Isolation: Raw key withheld client-side; formative reasoning steps provided.",
    "correctKey": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "figures": [],
    "linkedCoreRoles": [
      "CORE1A",
      "CORE1B",
      "CORE2A",
      "CORE2B"
    ],
    "primaryCapabilityRef": "CAP-NSEJS-2024-B-Q01",
    "status": "RELEASED",
    "academicAdmission": "HOLD (Grade9 v4.1 Parity Candidate)",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "sourceOrigin": "NSEJS Custody (Grade9v4.1)"
  },
  {
    "id": "NSEJS-2024-B-Q02",
    "code": "NSEJS-2024-B-Q02",
    "title": "NSEJS 2024-25 \u00b7 Q02 \u00b7 APPLY \u00b7 D2 (Score 3)",
    "subjectCode": "BIO",
    "subject": "Biology",
    "topicCode": "GENETICS",
    "topic": "Reproduction & Mendelian Heredity",
    "subtopic": "Genetics & Evolution",
    "exam": "NSEJS",
    "year": 2024,
    "paper": "NSEJS Core 2",
    "questionNumber": "Q02",
    "section": "Junior Science Olympiad",
    "markingScheme": "+3 / -1",
    "isCompetitive": true,
    "difficultyBand": "D2",
    "difficultyScore": 3,
    "difficultyBasis": "Cognitive demand score determined by 5-component QRT rubric.",
    "cognitiveComponents": {
      "concept_model_selection": 1,
      "representation_translation": 1,
      "reasoning_chain_length": 1,
      "algebra_computational_load": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "APPLY",
    "role": "CORE2",
    "kind": "SINGLE_CHOICE",
    "stem": "In human palaeontology, hominid evolution is categorized into Hominid ancestral stocks, Prehistoric humans, and modern humans based on fossil and cranial records. Select the pair containing one member of an early Hominid stock and one member representing Prehistoric human:",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) Ramapithecus and Dryopithecus"
      },
      {
        "id": "opt-B",
        "text": "(B) Homo erectus and Neanderthal man"
      },
      {
        "id": "opt-C",
        "text": "(C) Australopithecus and Homo habilis"
      },
      {
        "id": "opt-D",
        "text": "(D) Cro-Magnon man and Homo sapiens"
      }
    ],
    "hints": [
      "[H1 (Context & Setup): Identify governing principles.] 1. Classification Framework: Early hominid stock consists of bipedal hominins like Australopithecus (cranial capacity ~450-600 cc). Prehistoric genus Homo begins with Homo habilis ('handy man', first toolmaker, ~650-800 cc).",
      "[H2 (Formulation & Analysis): Key relationship.] 2. Pair Evaluation: Australopithecus represents the early hominid stock, while Homo habilis represents the earliest prehistoric human species.",
      "[H3 (Crux Resolution): Final calculation.] 3. Conclusion: The pair Australopithecus and Homo habilis satisfies the criteria, confirming Option C."
    ],
    "steps": [
      "1. Classification Framework: Early hominid stock consists of bipedal hominins like Australopithecus (cranial capacity ~450-600 cc). Prehistoric genus Homo begins with Homo habilis ('handy man', first toolmaker, ~650-800 cc).",
      "2. Pair Evaluation: Australopithecus represents the early hominid stock, while Homo habilis represents the earliest prehistoric human species.",
      "3. Conclusion: The pair Australopithecus and Homo habilis satisfies the criteria, confirming Option C."
    ],
    "check": "Adjudicated under IAPT 2024 examination standards.",
    "limitingCheck": "Adjudicated under IAPT 2024 examination standards.",
    "trapWarning": "Fault N09 Answer Isolation: Raw key withheld client-side; formative reasoning steps provided.",
    "correctKey": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "figures": [],
    "linkedCoreRoles": [
      "CORE1A",
      "CORE1B",
      "CORE2A",
      "CORE2B"
    ],
    "primaryCapabilityRef": "CAP-NSEJS-2024-B-Q02",
    "status": "RELEASED",
    "academicAdmission": "HOLD (Grade9 v4.1 Parity Candidate)",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "sourceOrigin": "NSEJS Custody (Grade9v4.1)"
  },
  {
    "id": "NSEJS-2024-B-Q03",
    "code": "NSEJS-2024-B-Q03",
    "title": "NSEJS 2024-25 \u00b7 Q03 \u00b7 MODEL \u00b7 D2 (Score 4)",
    "subjectCode": "BIO",
    "subject": "Biology",
    "topicCode": "COORDINATION",
    "topic": "Control & Endocrine Coordination / Immunology",
    "subtopic": "Systems & Regulation",
    "exam": "NSEJS",
    "year": 2024,
    "paper": "NSEJS Core 2",
    "questionNumber": "Q03",
    "section": "Junior Science Olympiad",
    "markingScheme": "+3 / -1",
    "isCompetitive": true,
    "difficultyBand": "D2",
    "difficultyScore": 4,
    "difficultyBasis": "Cognitive demand score determined by 5-component QRT rubric.",
    "cognitiveComponents": {
      "concept_model_selection": 1,
      "representation_translation": 1,
      "reasoning_chain_length": 1,
      "algebra_computational_load": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "MODEL",
    "role": "CORE2",
    "kind": "SINGLE_CHOICE",
    "stem": "The human brain has distinct functional anatomical centres: Part 1 (Hypothalamus) maintains autonomic homeostatic control, hunger, and thermoregulation. Part 2 (Cerebellum) coordinates fine voluntary muscular movements and balance. Part 3 (Cerebrum) governs sensory integration and cognition. Part 4 (Pons) regulates sleep cycles and respiratory pneumotaxic rhythm. Match the functional descriptions to the numbered anatomical regions.",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) 1-Cerebrum, 2-Pons, 3-Cerebellum, 4-Hypothalamus"
      },
      {
        "id": "opt-B",
        "text": "(B) 1-Hypothalamus, 2-Cerebellum, 3-Cerebrum, 4-Pons"
      },
      {
        "id": "opt-C",
        "text": "(C) 1-Pons, 2-Hypothalamus, 3-Cerebellum, 4-Cerebrum"
      },
      {
        "id": "opt-D",
        "text": "(D) 1-Hypothalamus, 2-Pons, 3-Cerebellum, 4-Cerebrum"
      }
    ],
    "hints": [
      "[H1 (Context & Setup): Identify governing principles.] 1. Anatomical Localisation: In the median sagittal section of the human brain, the ventro-anterior diencephalic region is the hypothalamus (1).",
      "[H2 (Formulation & Analysis): Key relationship.] 2. Hindbrain Centres: The dorsal convoluted hindbrain structure is the cerebellum (2). The superior cerebral cortex is the cerebrum (3). The brainstem prominence connecting medulla and midbrain is the pons varolii (4).",
      "[H3 (Crux Resolution): Final calculation.] 3. Resolution: Matching the functional criteria: 1-Hypothalamus, 2-Cerebellum, 3-Cerebrum, 4-Pons, confirming Option B."
    ],
    "steps": [
      "1. Anatomical Localisation: In the median sagittal section of the human brain, the ventro-anterior diencephalic region is the hypothalamus (1).",
      "2. Hindbrain Centres: The dorsal convoluted hindbrain structure is the cerebellum (2). The superior cerebral cortex is the cerebrum (3). The brainstem prominence connecting medulla and midbrain is the pons varolii (4).",
      "3. Resolution: Matching the functional criteria: 1-Hypothalamus, 2-Cerebellum, 3-Cerebrum, 4-Pons, confirming Option B."
    ],
    "check": "Adjudicated under IAPT 2024 examination standards.",
    "limitingCheck": "Adjudicated under IAPT 2024 examination standards.",
    "trapWarning": "Fault N09 Answer Isolation: Raw key withheld client-side; formative reasoning steps provided.",
    "correctKey": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "figures": [],
    "linkedCoreRoles": [
      "CORE1A",
      "CORE1B",
      "CORE2A",
      "CORE2B"
    ],
    "primaryCapabilityRef": "CAP-NSEJS-2024-B-Q03",
    "status": "RELEASED",
    "academicAdmission": "HOLD (Grade9 v4.1 Parity Candidate)",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "sourceOrigin": "NSEJS Custody (Grade9v4.1)"
  },
  {
    "id": "NSEJS-2024-B-Q04",
    "code": "NSEJS-2024-B-Q04",
    "title": "NSEJS 2024-25 \u00b7 Q04 \u00b7 APPLY \u00b7 D1 (Score 2)",
    "subjectCode": "BIO",
    "subject": "Biology",
    "topicCode": "LIFE_PROCESSES",
    "topic": "Life Processes & Nephron Physiology",
    "subtopic": "Human Physiology",
    "exam": "NSEJS",
    "year": 2024,
    "paper": "NSEJS Core 2",
    "questionNumber": "Q04",
    "section": "Junior Science Olympiad",
    "markingScheme": "+3 / -1",
    "isCompetitive": true,
    "difficultyBand": "D1",
    "difficultyScore": 2,
    "difficultyBasis": "Cognitive demand score determined by 5-component QRT rubric.",
    "cognitiveComponents": {
      "concept_model_selection": 1,
      "representation_translation": 1,
      "reasoning_chain_length": 1,
      "algebra_computational_load": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "APPLY",
    "role": "CORE2",
    "kind": "SINGLE_CHOICE",
    "stem": "Sap-sucking hemipteran insect pests (such as aphids and whiteflies) feed on internal vascular phloem sap of crop plants. These pests are most effectively controlled by applying which of the following systemic insecticides absorbed and translocated throughout plant vascular tissue?",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) Chlorpyriphos (contact organophosphate)"
      },
      {
        "id": "opt-B",
        "text": "(B) Malathion (non-systemic contact insecticide)"
      },
      {
        "id": "opt-C",
        "text": "(C) Metasystox (oxydemeton-methyl, systemic insecticide)"
      },
      {
        "id": "opt-D",
        "text": "(D) Chlorantraniliprole (ryanoid muscle disruptor)"
      }
    ],
    "hints": [
      "[H1 (Context & Setup): Identify governing principles.] 1. Mode of Action: Systemic insecticides are absorbed through plant foliage or roots and translocated via the vascular bundle (xylem and phloem).",
      "[H2 (Formulation & Analysis): Key relationship.] 2. Pest Vulnerability: Sap-sucking insects pierce the epidermis to ingest phloem sap, so contact insecticides on the leaf surface are less effective than vascular systemic poisons.",
      "[H3 (Crux Resolution): Final calculation.] 3. Chemical Selection: Metasystox (oxydemeton-methyl) is an established systemic organophosphate that translocates in sap, poisoning sucking insects upon feeding. Malathion and Chlorpyriphos act primarily by contact. This confirms Option C."
    ],
    "steps": [
      "1. Mode of Action: Systemic insecticides are absorbed through plant foliage or roots and translocated via the vascular bundle (xylem and phloem).",
      "2. Pest Vulnerability: Sap-sucking insects pierce the epidermis to ingest phloem sap, so contact insecticides on the leaf surface are less effective than vascular systemic poisons.",
      "3. Chemical Selection: Metasystox (oxydemeton-methyl) is an established systemic organophosphate that translocates in sap, poisoning sucking insects upon feeding. Malathion and Chlorpyriphos act primarily by contact. This confirms Option C."
    ],
    "check": "Adjudicated under IAPT 2024 examination standards.",
    "limitingCheck": "Adjudicated under IAPT 2024 examination standards.",
    "trapWarning": "Fault N09 Answer Isolation: Raw key withheld client-side; formative reasoning steps provided.",
    "correctKey": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "figures": [],
    "linkedCoreRoles": [
      "CORE1A",
      "CORE1B",
      "CORE2A",
      "CORE2B"
    ],
    "primaryCapabilityRef": "CAP-NSEJS-2024-B-Q04",
    "status": "RELEASED",
    "academicAdmission": "HOLD (Grade9 v4.1 Parity Candidate)",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "sourceOrigin": "NSEJS Custody (Grade9v4.1)"
  },
  {
    "id": "NSEJS-2024-B-Q05",
    "code": "NSEJS-2024-B-Q05",
    "title": "NSEJS 2024-25 \u00b7 Q05 \u00b7 RETRIEVE \u00b7 D1 (Score 2)",
    "subjectCode": "BIO",
    "subject": "Biology",
    "topicCode": "COORDINATION",
    "topic": "Control & Endocrine Coordination / Immunology",
    "subtopic": "Systems & Regulation",
    "exam": "NSEJS",
    "year": 2024,
    "paper": "NSEJS Core 2",
    "questionNumber": "Q05",
    "section": "Junior Science Olympiad",
    "markingScheme": "+3 / -1",
    "isCompetitive": true,
    "difficultyBand": "D1",
    "difficultyScore": 2,
    "difficultyBasis": "Cognitive demand score determined by 5-component QRT rubric.",
    "cognitiveComponents": {
      "concept_model_selection": 1,
      "representation_translation": 1,
      "reasoning_chain_length": 1,
      "algebra_computational_load": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "RETRIEVE",
    "role": "CORE2",
    "kind": "SINGLE_CHOICE",
    "stem": "What type of synovial joint is formed between the odontoid process (dens) of the second cervical vertebra (axis) and the anterior arch of the first cervical vertebra (atlas) in mammals?",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) Pivotal (trochoid) joint"
      },
      {
        "id": "opt-B",
        "text": "(B) Saddle joint"
      },
      {
        "id": "opt-C",
        "text": "(C) Gliding (plane) joint"
      },
      {
        "id": "opt-D",
        "text": "(D) Hinge (ginglymus) joint"
      }
    ],
    "hints": [
      "[H1 (Context & Setup): Identify governing principles.] 1. Anatomical Articulation: The atlanto-axial articulation comprises the vertical peg-like odontoid process of the axis rotating inside the ring formed by the anterior arch and transverse ligament of the atlas.",
      "[H2 (Formulation & Analysis): Key relationship.] 2. Synovial Joint Classification: A joint permitting uniaxial rotation of a bone ring around a central bony pivot is classified as a pivot (pivotal/trochoid) joint.",
      "[H3 (Crux Resolution): Final calculation.] 3. Kinematic Function: This pivot allows rotational 'no' movements of the human head, confirming Option A."
    ],
    "steps": [
      "1. Anatomical Articulation: The atlanto-axial articulation comprises the vertical peg-like odontoid process of the axis rotating inside the ring formed by the anterior arch and transverse ligament of the atlas.",
      "2. Synovial Joint Classification: A joint permitting uniaxial rotation of a bone ring around a central bony pivot is classified as a pivot (pivotal/trochoid) joint.",
      "3. Kinematic Function: This pivot allows rotational 'no' movements of the human head, confirming Option A."
    ],
    "check": "Adjudicated under IAPT 2024 examination standards.",
    "limitingCheck": "Adjudicated under IAPT 2024 examination standards.",
    "trapWarning": "Fault N09 Answer Isolation: Raw key withheld client-side; formative reasoning steps provided.",
    "correctKey": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "figures": [],
    "linkedCoreRoles": [
      "CORE1A",
      "CORE1B",
      "CORE2A",
      "CORE2B"
    ],
    "primaryCapabilityRef": "CAP-NSEJS-2024-B-Q05",
    "status": "RELEASED",
    "academicAdmission": "HOLD (Grade9 v4.1 Parity Candidate)",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "sourceOrigin": "NSEJS Custody (Grade9v4.1)"
  },
  {
    "id": "NSEJS-2024-B-Q06",
    "code": "NSEJS-2024-B-Q06",
    "title": "NSEJS 2024-25 \u00b7 Q06 \u00b7 APPLY \u00b7 D2 (Score 3)",
    "subjectCode": "BIO",
    "subject": "Biology",
    "topicCode": "LIVING_WORLD",
    "topic": "Cell Biology & Molecular Genetics",
    "subtopic": "Cell & Molecular Biology",
    "exam": "NSEJS",
    "year": 2024,
    "paper": "NSEJS Core 2",
    "questionNumber": "Q06",
    "section": "Junior Science Olympiad",
    "markingScheme": "+3 / -1",
    "isCompetitive": true,
    "difficultyBand": "D2",
    "difficultyScore": 3,
    "difficultyBasis": "Cognitive demand score determined by 5-component QRT rubric.",
    "cognitiveComponents": {
      "concept_model_selection": 1,
      "representation_translation": 1,
      "reasoning_chain_length": 1,
      "algebra_computational_load": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "APPLY",
    "role": "CORE2",
    "kind": "SINGLE_CHOICE",
    "stem": "Match the diagnostic zoological structures in Column I with their corresponding organism/phenomenon in Column II: (1) Hexacanth larva: Taenia solium. (2) Renette excretory cell: Ascaris lumbricoides. (3) Respiratory tree: Sea cucumber (Holothuroidea). (4) Piloerectum (arrector pili contraction): Goose flesh in mammals. The correct matching sequence is:",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) 1-(iv), 2-(i), 3-(ii), 4-(iii)"
      },
      {
        "id": "opt-B",
        "text": "(B) 1-(ii), 2-(iii), 3-(iv), 4-(i)"
      },
      {
        "id": "opt-C",
        "text": "(C) 1-(iv), 2-(ii), 3-(iii), 4-(i)"
      },
      {
        "id": "opt-D",
        "text": "(D) 1-(iii), 2-(iv), 3-(i), 4-(ii)"
      }
    ],
    "hints": [
      "[H1 (Context & Setup): Identify governing principles.] 1. Hexacanth: The oncosphere larva of tapeworms (Taenia) possesses six chitinous hooks (Hexacanth -> Taenia, iv).",
      "[H2 (Formulation & Analysis): Key relationship.] 2. Renette cells: Giant H-shaped excretory cells characteristic of nematodes like Ascaris (Renette cell -> Ascaris, ii).",
      "[H3 (Crux Resolution): Final calculation.] 3. Respiratory tree: Highly branched cloacal respiratory organs found in echinoderm sea cucumbers (Respiratory tree -> Sea cucumber, iii)."
    ],
    "steps": [
      "1. Hexacanth: The oncosphere larva of tapeworms (Taenia) possesses six chitinous hooks (Hexacanth -> Taenia, iv).",
      "2. Renette cells: Giant H-shaped excretory cells characteristic of nematodes like Ascaris (Renette cell -> Ascaris, ii).",
      "3. Respiratory tree: Highly branched cloacal respiratory organs found in echinoderm sea cucumbers (Respiratory tree -> Sea cucumber, iii).",
      "4. Piloerection: Arrector pili smooth muscle contraction causes hairs to stand erect, producing goose bumps/goose flesh (Piloerectum -> Goose flesh, i). Sequence: 1-(iv), 2-(ii), 3-(iii), 4-(i) (Option C)."
    ],
    "check": "Adjudicated under IAPT 2024 examination standards.",
    "limitingCheck": "Adjudicated under IAPT 2024 examination standards.",
    "trapWarning": "Fault N09 Answer Isolation: Raw key withheld client-side; formative reasoning steps provided.",
    "correctKey": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "figures": [],
    "linkedCoreRoles": [
      "CORE1A",
      "CORE1B",
      "CORE2A",
      "CORE2B"
    ],
    "primaryCapabilityRef": "CAP-NSEJS-2024-B-Q06",
    "status": "RELEASED",
    "academicAdmission": "HOLD (Grade9 v4.1 Parity Candidate)",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "sourceOrigin": "NSEJS Custody (Grade9v4.1)"
  },
  {
    "id": "NSEJS-2024-B-Q07",
    "code": "NSEJS-2024-B-Q07",
    "title": "NSEJS 2024-25 \u00b7 Q07 \u00b7 RETRIEVE \u00b7 D1 (Score 2)",
    "subjectCode": "BIO",
    "subject": "Biology",
    "topicCode": "COORDINATION",
    "topic": "Control & Endocrine Coordination / Immunology",
    "subtopic": "Systems & Regulation",
    "exam": "NSEJS",
    "year": 2024,
    "paper": "NSEJS Core 2",
    "questionNumber": "Q07",
    "section": "Junior Science Olympiad",
    "markingScheme": "+3 / -1",
    "isCompetitive": true,
    "difficultyBand": "D1",
    "difficultyScore": 2,
    "difficultyBasis": "Cognitive demand score determined by 5-component QRT rubric.",
    "cognitiveComponents": {
      "concept_model_selection": 1,
      "representation_translation": 1,
      "reasoning_chain_length": 1,
      "algebra_computational_load": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "RETRIEVE",
    "role": "CORE2",
    "kind": "SINGLE_CHOICE",
    "stem": "The air-filled tympanic cavity of the middle ear communicates with the fluid-filled auditory capsule (internal ear cochlea and vestibule) through two fine membrane-covered apertures known as:",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) Fossa ovalis and fenestra ovalis"
      },
      {
        "id": "opt-B",
        "text": "(B) Fenestra rotunda and fossa ovalis"
      },
      {
        "id": "opt-C",
        "text": "(C) Eustachian aperture and fenestra rotunda"
      },
      {
        "id": "opt-D",
        "text": "(D) Fenestra ovalis (oval window) and fenestra rotunda (round window)"
      }
    ],
    "hints": [
      "[H1 (Context & Setup): Identify governing principles.] 1. Middle-to-Inner Ear Boundary: The medial wall of the middle ear tympanic cavity faces the labyrinth of the inner ear.",
      "[H2 (Formulation & Analysis): Key relationship.] 2. Apertures: The footplate of the stapes rests against the fenestra ovalis (oval window), transmitting mechanical vibrations to the perilymph of the scala vestibuli.",
      "[H3 (Crux Resolution): Final calculation.] 3. Pressure Relief: The fenestra rotunda (round window) is covered by the secondary tympanic membrane, bulging outwards to accommodate perilymph fluid displacement. Thus the two openings are Fenestra ovalis and Fenestra rotunda (Option D)."
    ],
    "steps": [
      "1. Middle-to-Inner Ear Boundary: The medial wall of the middle ear tympanic cavity faces the labyrinth of the inner ear.",
      "2. Apertures: The footplate of the stapes rests against the fenestra ovalis (oval window), transmitting mechanical vibrations to the perilymph of the scala vestibuli.",
      "3. Pressure Relief: The fenestra rotunda (round window) is covered by the secondary tympanic membrane, bulging outwards to accommodate perilymph fluid displacement. Thus the two openings are Fenestra ovalis and Fenestra rotunda (Option D)."
    ],
    "check": "Adjudicated under IAPT 2024 examination standards.",
    "limitingCheck": "Adjudicated under IAPT 2024 examination standards.",
    "trapWarning": "Fault N09 Answer Isolation: Raw key withheld client-side; formative reasoning steps provided.",
    "correctKey": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "figures": [],
    "linkedCoreRoles": [
      "CORE1A",
      "CORE1B",
      "CORE2A",
      "CORE2B"
    ],
    "primaryCapabilityRef": "CAP-NSEJS-2024-B-Q07",
    "status": "RELEASED",
    "academicAdmission": "HOLD (Grade9 v4.1 Parity Candidate)",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "sourceOrigin": "NSEJS Custody (Grade9v4.1)"
  },
  {
    "id": "NSEJS-2024-B-Q08",
    "code": "NSEJS-2024-B-Q08",
    "title": "NSEJS 2024-25 \u00b7 Q08 \u00b7 RETRIEVE \u00b7 D1 (Score 2)",
    "subjectCode": "BIO",
    "subject": "Biology",
    "topicCode": "ENVIRONMENT",
    "topic": "Ecology & Ecosystem Resources",
    "subtopic": "Ecology & Environment",
    "exam": "NSEJS",
    "year": 2024,
    "paper": "NSEJS Core 2",
    "questionNumber": "Q08",
    "section": "Junior Science Olympiad",
    "markingScheme": "+3 / -1",
    "isCompetitive": true,
    "difficultyBand": "D1",
    "difficultyScore": 2,
    "difficultyBasis": "Cognitive demand score determined by 5-component QRT rubric.",
    "cognitiveComponents": {
      "concept_model_selection": 1,
      "representation_translation": 1,
      "reasoning_chain_length": 1,
      "algebra_computational_load": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "RETRIEVE",
    "role": "CORE2",
    "kind": "SINGLE_CHOICE",
    "stem": "To control vehicular exhaust emissions and combat urban air pollution, all newly manufactured and registered motor vehicles in India are mandated to comply with which Bharat Stage emission standard?",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) BS-VI (Bharat Stage VI)"
      },
      {
        "id": "opt-B",
        "text": "(B) BS-IV (Bharat Stage IV)"
      },
      {
        "id": "opt-C",
        "text": "(C) BS-V (Bharat Stage V)"
      },
      {
        "id": "opt-D",
        "text": "(D) BS-VII (Bharat Stage VII)"
      }
    ],
    "hints": [
      "[H1 (Context & Setup): Identify governing principles.] 1. Regulatory History: The Government of India leapfrogged directly from BS-IV to BS-VI emission standards nationwide on April 1, 2020, completely skipping BS-V.",
      "[H2 (Formulation & Analysis): Key relationship.] 2. Standards: BS-VI mandates drastically reduced sulphur content in fuel (maximum 10 ppm) and substantially lower particulate matter and nitrogen oxide (NOx) emissions for petrol and diesel engines.",
      "[H3 (Crux Resolution): Final calculation.] 3. Current Mandate: During the NSEJS 2024 examination, BS-VI was the effective statutory vehicular emission standard in India (Option A)."
    ],
    "steps": [
      "1. Regulatory History: The Government of India leapfrogged directly from BS-IV to BS-VI emission standards nationwide on April 1, 2020, completely skipping BS-V.",
      "2. Standards: BS-VI mandates drastically reduced sulphur content in fuel (maximum 10 ppm) and substantially lower particulate matter and nitrogen oxide (NOx) emissions for petrol and diesel engines.",
      "3. Current Mandate: During the NSEJS 2024 examination, BS-VI was the effective statutory vehicular emission standard in India (Option A)."
    ],
    "check": "Adjudicated under IAPT 2024 examination standards.",
    "limitingCheck": "Adjudicated under IAPT 2024 examination standards.",
    "trapWarning": "Fault N09 Answer Isolation: Raw key withheld client-side; formative reasoning steps provided.",
    "correctKey": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "figures": [],
    "linkedCoreRoles": [
      "CORE1A",
      "CORE1B",
      "CORE2A",
      "CORE2B"
    ],
    "primaryCapabilityRef": "CAP-NSEJS-2024-B-Q08",
    "status": "RELEASED",
    "academicAdmission": "HOLD (Grade9 v4.1 Parity Candidate)",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "sourceOrigin": "NSEJS Custody (Grade9v4.1)"
  },
  {
    "id": "NSEJS-2024-B-Q09",
    "code": "NSEJS-2024-B-Q09",
    "title": "NSEJS 2024-25 \u00b7 Q09 \u00b7 MODEL \u00b7 D2 (Score 4)",
    "subjectCode": "BIO",
    "subject": "Biology",
    "topicCode": "LIFE_PROCESSES",
    "topic": "Life Processes & Nephron Physiology",
    "subtopic": "Human Physiology",
    "exam": "NSEJS",
    "year": 2024,
    "paper": "NSEJS Core 2",
    "questionNumber": "Q09",
    "section": "Junior Science Olympiad",
    "markingScheme": "+3 / -1",
    "isCompetitive": true,
    "difficultyBand": "D2",
    "difficultyScore": 4,
    "difficultyBasis": "Cognitive demand score determined by 5-component QRT rubric.",
    "cognitiveComponents": {
      "concept_model_selection": 1,
      "representation_translation": 1,
      "reasoning_chain_length": 1,
      "algebra_computational_load": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "MODEL",
    "role": "CORE2",
    "kind": "SINGLE_CHOICE",
    "stem": "In the human metabolic pathway of phenylalanine and tyrosine degradation: Defect 1 (Phenylalanine hydroxylase deficiency) causes accumulation of phenylpyruvate. Defect 2 (Tyrosine transaminase deficiency) causes elevated serum tyrosine. Defect 3 (Homogentisate 1,2-dioxygenase deficiency) causes accumulation of homogentisic acid which turns urine black upon oxidation. Defect 4 (Tyrosinase deficiency) prevents melanin biosynthesis. Identify the chronological sequence of genetic disorders corresponding to defects 1, 2, 3, and 4.",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) Phenylketonuria, Tyrosinosis, Alkaptonuria, Albinism"
      },
      {
        "id": "opt-B",
        "text": "(B) Alkaptonuria, Phenylketonuria, Albinism, Tyrosinosis"
      },
      {
        "id": "opt-C",
        "text": "(C) Phenylketonuria, Albinism, Alkaptonuria, Tyrosinosis"
      },
      {
        "id": "opt-D",
        "text": "(D) Tyrosinosis, Phenylketonuria, Albinism, Alkaptonuria"
      }
    ],
    "hints": [
      "[H1 (Context & Setup): Identify governing principles.] 1. Phenylketonuria (PKU): Phenylalanine cannot convert to tyrosine due to lack of phenylalanine hydroxylase, accumulating toxic phenylpyruvate (Defect 1 -> Phenylketonuria).",
      "[H2 (Formulation & Analysis): Key relationship.] 2. Tyrosinosis: Impaired tyrosine catabolism causes accumulation of tyrosine and derivatives (Defect 2 -> Tyrosinosis).",
      "[H3 (Crux Resolution): Final calculation.] 3. Alkaptonuria: Homogentisate 1,2-dioxygenase deficiency causes accumulation of homogentisic acid (alkapton), resulting in black urine and ochronosis (Defect 3 -> Alkaptonuria)."
    ],
    "steps": [
      "1. Phenylketonuria (PKU): Phenylalanine cannot convert to tyrosine due to lack of phenylalanine hydroxylase, accumulating toxic phenylpyruvate (Defect 1 -> Phenylketonuria).",
      "2. Tyrosinosis: Impaired tyrosine catabolism causes accumulation of tyrosine and derivatives (Defect 2 -> Tyrosinosis).",
      "3. Alkaptonuria: Homogentisate 1,2-dioxygenase deficiency causes accumulation of homogentisic acid (alkapton), resulting in black urine and ochronosis (Defect 3 -> Alkaptonuria).",
      "4. Albinism: Tyrosinase deficiency prevents the enzymatic oxidation of DOPA to melanin pigments, causing lack of pigmentation in skin, hair, and eyes (Defect 4 -> Albinism). The sequence is Phenylketonuria, Tyrosinosis, Alkaptonuria, Albinism (Option A)."
    ],
    "check": "Adjudicated under IAPT 2024 examination standards.",
    "limitingCheck": "Adjudicated under IAPT 2024 examination standards.",
    "trapWarning": "Fault N09 Answer Isolation: Raw key withheld client-side; formative reasoning steps provided.",
    "correctKey": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "figures": [],
    "linkedCoreRoles": [
      "CORE1A",
      "CORE1B",
      "CORE2A",
      "CORE2B"
    ],
    "primaryCapabilityRef": "CAP-NSEJS-2024-B-Q09",
    "status": "RELEASED",
    "academicAdmission": "HOLD (Grade9 v4.1 Parity Candidate)",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "sourceOrigin": "NSEJS Custody (Grade9v4.1)"
  },
  {
    "id": "NSEJS-2024-B-Q10",
    "code": "NSEJS-2024-B-Q10",
    "title": "NSEJS 2024-25 \u00b7 Q10 \u00b7 APPLY \u00b7 D2 (Score 3)",
    "subjectCode": "BIO",
    "subject": "Biology",
    "topicCode": "LIVING_WORLD",
    "topic": "Cell Biology & Molecular Genetics",
    "subtopic": "Cell & Molecular Biology",
    "exam": "NSEJS",
    "year": 2024,
    "paper": "NSEJS Core 2",
    "questionNumber": "Q10",
    "section": "Junior Science Olympiad",
    "markingScheme": "+3 / -1",
    "isCompetitive": true,
    "difficultyBand": "D2",
    "difficultyScore": 3,
    "difficultyBasis": "Cognitive demand score determined by 5-component QRT rubric.",
    "cognitiveComponents": {
      "concept_model_selection": 1,
      "representation_translation": 1,
      "reasoning_chain_length": 1,
      "algebra_computational_load": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "APPLY",
    "role": "CORE2",
    "kind": "SINGLE_CHOICE",
    "stem": "Match the plant species in Column I with their unique diagnostic morphological and reproductive characteristics in Column II: (1) Wheat (Triticum aestivum): Glumes and lodicules in spikelet inflorescence. (2) Banyan tree (Ficus benghalensis): Prop roots for aerial support and hypanthodium inflorescence. (3) Banana (Musa paradisiaca): Herbaceous pseudostem and monocarpic habit. (4) Pine tree (Pinus): Naked ovules producing seeds without enclosing fruit. The correct matching is:",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) 1-(iv), 2-(i), 3-(ii), 4-(iii)"
      },
      {
        "id": "opt-B",
        "text": "(B) 1-(ii), 2-(iii), 3-(i), 4-(iv)"
      },
      {
        "id": "opt-C",
        "text": "(C) 1-(ii), 2-(iv), 3-(i), 4-(iii)"
      },
      {
        "id": "opt-D",
        "text": "(D) 1-(i), 2-(ii), 3-(iv), 4-(iii)"
      }
    ],
    "hints": [
      "[H1 (Context & Setup): Identify governing principles.] 1. Wheat: Poaceae grass family member; flowers are reduced florets enclosed by glumes, with lodicules representing reduced perianth (1 -> ii).",
      "[H2 (Formulation & Analysis): Key relationship.] 2. Banyan: Ficus develops massive pillar-like adventitious prop roots from horizontal branches and bears syconium/hypanthodium fruit (2 -> iv).",
      "[H3 (Crux Resolution): Final calculation.] 3. Banana: Overlapping concentric leaf sheaths form an erect false trunk (pseudostem), and the plant dies after flowering once (monocarpic) (3 -> i)."
    ],
    "steps": [
      "1. Wheat: Poaceae grass family member; flowers are reduced florets enclosed by glumes, with lodicules representing reduced perianth (1 -> ii).",
      "2. Banyan: Ficus develops massive pillar-like adventitious prop roots from horizontal branches and bears syconium/hypanthodium fruit (2 -> iv).",
      "3. Banana: Overlapping concentric leaf sheaths form an erect false trunk (pseudostem), and the plant dies after flowering once (monocarpic) (3 -> i).",
      "4. Pine: Gymnosperm bearing exposed ovules on woody megasporophyll cones; seeds are naked because gymnosperms lack ovaries to form fruits (4 -> iii). Sequence: 1-(ii), 2-(iv), 3-(i), 4-(iii) (Option C)."
    ],
    "check": "Adjudicated under IAPT 2024 examination standards.",
    "limitingCheck": "Adjudicated under IAPT 2024 examination standards.",
    "trapWarning": "Fault N09 Answer Isolation: Raw key withheld client-side; formative reasoning steps provided.",
    "correctKey": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "figures": [],
    "linkedCoreRoles": [
      "CORE1A",
      "CORE1B",
      "CORE2A",
      "CORE2B"
    ],
    "primaryCapabilityRef": "CAP-NSEJS-2024-B-Q10",
    "status": "RELEASED",
    "academicAdmission": "HOLD (Grade9 v4.1 Parity Candidate)",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "sourceOrigin": "NSEJS Custody (Grade9v4.1)"
  },
  {
    "id": "NSEJS-2024-B-Q11",
    "code": "NSEJS-2024-B-Q11",
    "title": "NSEJS 2024-25 \u00b7 Q11 \u00b7 MODEL \u00b7 D2 (Score 4)",
    "subjectCode": "BIO",
    "subject": "Biology",
    "topicCode": "GENETICS",
    "topic": "Reproduction & Mendelian Heredity",
    "subtopic": "Genetics & Evolution",
    "exam": "NSEJS",
    "year": 2024,
    "paper": "NSEJS Core 2",
    "questionNumber": "Q11",
    "section": "Junior Science Olympiad",
    "markingScheme": "+3 / -1",
    "isCompetitive": true,
    "difficultyBand": "D2",
    "difficultyScore": 4,
    "difficultyBasis": "Cognitive demand score determined by 5-component QRT rubric.",
    "cognitiveComponents": {
      "concept_model_selection": 1,
      "representation_translation": 1,
      "reasoning_chain_length": 1,
      "algebra_computational_load": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "MODEL",
    "role": "CORE2",
    "kind": "SINGLE_CHOICE",
    "stem": "Under the transmission electron microscope, eukaryotic chromatin displays a repeating 'beads-on-a-string' structure composed of nucleosomes. A complete nucleosomal repeating unit contains a core particle and linker region. How many distinct histone protein types collectively constitute the core octamer and the linker histone?",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) 4 distinct histone types"
      },
      {
        "id": "opt-B",
        "text": "(B) 8 distinct histone types"
      },
      {
        "id": "opt-C",
        "text": "(C) 5 distinct histone types"
      },
      {
        "id": "opt-D",
        "text": "(D) 2 distinct histone types"
      }
    ],
    "hints": [
      "[H1 (Context & Setup): Identify governing principles.] 1. Core Histone Octamer: The nucleosome core consists of two copies each of four distinct basic histone proteins: H2A, H2B, H3, and H4 (forming a histone octamer wrapped by ~146 bp of DNA).",
      "[H2 (Formulation & Analysis): Key relationship.] 2. Linker Histone: The linker DNA between adjacent nucleosomes is bound by a fifth distinct histone type, histone H1, which seals the DNA entry and exit points.",
      "[H3 (Crux Resolution): Final calculation.] 3. Total Histone Types: In total, exactly 5 distinct histone types (H1, H2A, H2B, H3, H4) participate in the structural organization of chromatin nucleosomes. This confirms Option C."
    ],
    "steps": [
      "1. Core Histone Octamer: The nucleosome core consists of two copies each of four distinct basic histone proteins: H2A, H2B, H3, and H4 (forming a histone octamer wrapped by ~146 bp of DNA).",
      "2. Linker Histone: The linker DNA between adjacent nucleosomes is bound by a fifth distinct histone type, histone H1, which seals the DNA entry and exit points.",
      "3. Total Histone Types: In total, exactly 5 distinct histone types (H1, H2A, H2B, H3, H4) participate in the structural organization of chromatin nucleosomes. This confirms Option C."
    ],
    "check": "Adjudicated under IAPT 2024 examination standards.",
    "limitingCheck": "Adjudicated under IAPT 2024 examination standards.",
    "trapWarning": "Fault N09 Answer Isolation: Raw key withheld client-side; formative reasoning steps provided.",
    "correctKey": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "figures": [],
    "linkedCoreRoles": [
      "CORE1A",
      "CORE1B",
      "CORE2A",
      "CORE2B"
    ],
    "primaryCapabilityRef": "CAP-NSEJS-2024-B-Q11",
    "status": "RELEASED",
    "academicAdmission": "HOLD (Grade9 v4.1 Parity Candidate)",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "sourceOrigin": "NSEJS Custody (Grade9v4.1)"
  },
  {
    "id": "NSEJS-2024-B-Q12",
    "code": "NSEJS-2024-B-Q12",
    "title": "NSEJS 2024-25 \u00b7 Q12 \u00b7 JUSTIFY \u00b7 D2 (Score 4)",
    "subjectCode": "BIO",
    "subject": "Biology",
    "topicCode": "COORDINATION",
    "topic": "Control & Endocrine Coordination / Immunology",
    "subtopic": "Systems & Regulation",
    "exam": "NSEJS",
    "year": 2024,
    "paper": "NSEJS Core 2",
    "questionNumber": "Q12",
    "section": "Junior Science Olympiad",
    "markingScheme": "+3 / -1",
    "isCompetitive": true,
    "difficultyBand": "D2",
    "difficultyScore": 4,
    "difficultyBasis": "Cognitive demand score determined by 5-component QRT rubric.",
    "cognitiveComponents": {
      "concept_model_selection": 1,
      "representation_translation": 1,
      "reasoning_chain_length": 1,
      "algebra_computational_load": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "JUSTIFY",
    "role": "CORE2",
    "kind": "SINGLE_CHOICE",
    "stem": "Evaluate the following statements regarding vertebrate retinal photoreceptors: Assertion (A): The retinas of strictly nocturnal, cave-dwelling, and deep-sea animals are populated almost exclusively by rod photoreceptors with few or no cones. Reason (R): Rods contain rhodopsin with extremely high photosensitivity in dim light, providing scotopic vision, whereas cones require bright photopic illumination and mediate colour vision. Which evaluation is correct?",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) Both Assertion (A) and Reason (R) are true, and (R) is the correct explanation of (A)."
      },
      {
        "id": "opt-B",
        "text": "(B) Both (A) and (R) are true, but (R) is not the correct explanation of (A)."
      },
      {
        "id": "opt-C",
        "text": "(C) (A) is true, but (R) is false."
      },
      {
        "id": "opt-D",
        "text": "(D) (A) is false, but (R) is true."
      }
    ],
    "hints": [
      "[H1 (Context & Setup): Identify governing principles.] 1. Photoreceptor Physiology: Rods possess high optical sensitivity capable of triggering action potentials from single photons due to high rhodopsin concentration and large neural convergence onto bipolar/ganglion cells.",
      "[H2 (Formulation & Analysis): Key relationship.] 2. Nocturnal Ecology: Nocturnal animals (e.g. owls, bats) operate in illumination regimes well below cone activation thresholds. Cones are useless in darkness and would waste metabolic energy without providing color cues.",
      "[H3 (Crux Resolution): Final calculation.] 3. Reason Validation: Reason (R) directly explains the evolutionary adaptation stated in Assertion (A). Both are true and (R) correctly explains (A), confirming Option A."
    ],
    "steps": [
      "1. Photoreceptor Physiology: Rods possess high optical sensitivity capable of triggering action potentials from single photons due to high rhodopsin concentration and large neural convergence onto bipolar/ganglion cells.",
      "2. Nocturnal Ecology: Nocturnal animals (e.g. owls, bats) operate in illumination regimes well below cone activation thresholds. Cones are useless in darkness and would waste metabolic energy without providing color cues.",
      "3. Reason Validation: Reason (R) directly explains the evolutionary adaptation stated in Assertion (A). Both are true and (R) correctly explains (A), confirming Option A."
    ],
    "check": "Adjudicated under IAPT 2024 examination standards.",
    "limitingCheck": "Adjudicated under IAPT 2024 examination standards.",
    "trapWarning": "Fault N09 Answer Isolation: Raw key withheld client-side; formative reasoning steps provided.",
    "correctKey": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "figures": [],
    "linkedCoreRoles": [
      "CORE1A",
      "CORE1B",
      "CORE2A",
      "CORE2B"
    ],
    "primaryCapabilityRef": "CAP-NSEJS-2024-B-Q12",
    "status": "RELEASED",
    "academicAdmission": "HOLD (Grade9 v4.1 Parity Candidate)",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "sourceOrigin": "NSEJS Custody (Grade9v4.1)"
  },
  {
    "id": "NSEJS-2024-B-Q13",
    "code": "NSEJS-2024-B-Q13",
    "title": "NSEJS 2024-25 \u00b7 Q13 \u00b7 MODEL \u00b7 D2 (Score 4)",
    "subjectCode": "BIO",
    "subject": "Biology",
    "topicCode": "LIVING_WORLD",
    "topic": "Cell Biology & Molecular Genetics",
    "subtopic": "Cell & Molecular Biology",
    "exam": "NSEJS",
    "year": 2024,
    "paper": "NSEJS Core 2",
    "questionNumber": "Q13",
    "section": "Junior Science Olympiad",
    "markingScheme": "+3 / -1",
    "isCompetitive": true,
    "difficultyBand": "D2",
    "difficultyScore": 4,
    "difficultyBasis": "Cognitive demand score determined by 5-component QRT rubric.",
    "cognitiveComponents": {
      "concept_model_selection": 1,
      "representation_translation": 1,
      "reasoning_chain_length": 1,
      "algebra_computational_load": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "MODEL",
    "role": "CORE2",
    "kind": "SINGLE_CHOICE",
    "stem": "In a cross-section of a mature microsporangium (anther) of an angiosperm: the microspore tetrad/pollen grains are haploid (n); the outer wall layers (epidermis, endothecium, middle layers) are diploid (2n); and the nutritive tapetal layer cells undergo endomitosis/polyteny to become multinucleate or polyploid (>2n). What is the maximum number of different ploidy levels present among these differentiated anther tissues?",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) Only haploid (1 ploidy level)"
      },
      {
        "id": "opt-B",
        "text": "(B) Only diploid (1 ploidy level)"
      },
      {
        "id": "opt-C",
        "text": "(C) Haploid and diploid (2 ploidy levels)"
      },
      {
        "id": "opt-D",
        "text": "(D) Haploid, diploid, and polyploid (3 different ploidy levels)"
      }
    ],
    "hints": [
      "[H1 (Context & Setup): Identify governing principles.] 1. Gametophytic Tissue: Microspores and male gametophytes (pollen grains) formed via meiosis are haploid (n).",
      "[H2 (Formulation & Analysis): Key relationship.] 2. Somatic Sporophytic Wall: The vegetative parietal layers (epidermis, endothecium, middle layer) originate from mitotic cell divisions and are diploid (2n).",
      "[H3 (Crux Resolution): Final calculation.] 3. Tapetal Tissue Specialisation: The tapetum is the innermost nutritive layer. During microsporogenesis, tapetal cells undergo endomitosis without cytokinesis, resulting in multinucleate, polyploid cells (e.g. 4n, 8n). Therefore, anther tissues exhibit haploid, diploid, and polyploid states (3 ploidy levels, Option D)."
    ],
    "steps": [
      "1. Gametophytic Tissue: Microspores and male gametophytes (pollen grains) formed via meiosis are haploid (n).",
      "2. Somatic Sporophytic Wall: The vegetative parietal layers (epidermis, endothecium, middle layer) originate from mitotic cell divisions and are diploid (2n).",
      "3. Tapetal Tissue Specialisation: The tapetum is the innermost nutritive layer. During microsporogenesis, tapetal cells undergo endomitosis without cytokinesis, resulting in multinucleate, polyploid cells (e.g. 4n, 8n). Therefore, anther tissues exhibit haploid, diploid, and polyploid states (3 ploidy levels, Option D)."
    ],
    "check": "Adjudicated under IAPT 2024 examination standards.",
    "limitingCheck": "Adjudicated under IAPT 2024 examination standards.",
    "trapWarning": "Fault N09 Answer Isolation: Raw key withheld client-side; formative reasoning steps provided.",
    "correctKey": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "figures": [],
    "linkedCoreRoles": [
      "CORE1A",
      "CORE1B",
      "CORE2A",
      "CORE2B"
    ],
    "primaryCapabilityRef": "CAP-NSEJS-2024-B-Q13",
    "status": "RELEASED",
    "academicAdmission": "HOLD (Grade9 v4.1 Parity Candidate)",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "sourceOrigin": "NSEJS Custody (Grade9v4.1)"
  },
  {
    "id": "NSEJS-2024-B-Q14",
    "code": "NSEJS-2024-B-Q14",
    "title": "NSEJS 2024-25 \u00b7 Q14 \u00b7 MODEL \u00b7 D2 (Score 4)",
    "subjectCode": "BIO",
    "subject": "Biology",
    "topicCode": "LIFE_PROCESSES",
    "topic": "Life Processes & Nephron Physiology",
    "subtopic": "Human Physiology",
    "exam": "NSEJS",
    "year": 2024,
    "paper": "NSEJS Core 2",
    "questionNumber": "Q14",
    "section": "Junior Science Olympiad",
    "markingScheme": "+3 / -1",
    "isCompetitive": true,
    "difficultyBand": "D2",
    "difficultyScore": 4,
    "difficultyBasis": "Cognitive demand score determined by 5-component QRT rubric.",
    "cognitiveComponents": {
      "concept_model_selection": 1,
      "representation_translation": 1,
      "reasoning_chain_length": 1,
      "algebra_computational_load": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "MODEL",
    "role": "CORE2",
    "kind": "SINGLE_CHOICE",
    "stem": "According to the Dixon and Joly Cohesion-Tension theory for the ascent of sap in tall trees, the frictional and gravitational forces opposing sap ascent in a 100-metre-tall tree require a pulling tension of about 20 to 50 atm. What is the intrinsic cohesive tensile strength of a continuous column of water held by intermolecular hydrogen bonds?",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) 100 to 350 atm"
      },
      {
        "id": "opt-B",
        "text": "(B) 1 to 5 atm"
      },
      {
        "id": "opt-C",
        "text": "(C) 10 to 20 atm"
      },
      {
        "id": "opt-D",
        "text": "(D) 50 to 60 atm"
      }
    ],
    "hints": [
      "[H1 (Context & Setup): Identify governing principles.] 1. Physical Principles of Sap Ascent: Water molecules exhibit immense mutual attraction (cohesion) due to a 3D network of intermolecular hydrogen bonds.",
      "[H2 (Formulation & Analysis): Key relationship.] 2. Tensile Strength of Water: Pure degassed water in microscopic capillary conduits (xylem tracheids and vessels) can sustain negative pressures (tensions) exceeding 100 to 350 atm without cavitating or breaking.",
      "[H3 (Crux Resolution): Final calculation.] 3. Operational Safety Margin: Because the total resistive pull opposing ascent in the tallest redwoods (Sequoiadendron) is only ~20-50 atm, the cohesive tensile strength of water (100-350 atm) provides a massive safety factor ensuring unbroken continuous water columns. This confirms Option A."
    ],
    "steps": [
      "1. Physical Principles of Sap Ascent: Water molecules exhibit immense mutual attraction (cohesion) due to a 3D network of intermolecular hydrogen bonds.",
      "2. Tensile Strength of Water: Pure degassed water in microscopic capillary conduits (xylem tracheids and vessels) can sustain negative pressures (tensions) exceeding 100 to 350 atm without cavitating or breaking.",
      "3. Operational Safety Margin: Because the total resistive pull opposing ascent in the tallest redwoods (Sequoiadendron) is only ~20-50 atm, the cohesive tensile strength of water (100-350 atm) provides a massive safety factor ensuring unbroken continuous water columns. This confirms Option A."
    ],
    "check": "Adjudicated under IAPT 2024 examination standards.",
    "limitingCheck": "Adjudicated under IAPT 2024 examination standards.",
    "trapWarning": "Fault N09 Answer Isolation: Raw key withheld client-side; formative reasoning steps provided.",
    "correctKey": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "figures": [],
    "linkedCoreRoles": [
      "CORE1A",
      "CORE1B",
      "CORE2A",
      "CORE2B"
    ],
    "primaryCapabilityRef": "CAP-NSEJS-2024-B-Q14",
    "status": "RELEASED",
    "academicAdmission": "HOLD (Grade9 v4.1 Parity Candidate)",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "sourceOrigin": "NSEJS Custody (Grade9v4.1)"
  },
  {
    "id": "NSEJS-2024-B-Q15",
    "code": "NSEJS-2024-B-Q15",
    "title": "NSEJS 2024-25 \u00b7 Q15 \u00b7 APPLY \u00b7 D1 (Score 2)",
    "subjectCode": "BIO",
    "subject": "Biology",
    "topicCode": "GENETICS",
    "topic": "Reproduction & Mendelian Heredity",
    "subtopic": "Genetics & Evolution",
    "exam": "NSEJS",
    "year": 2024,
    "paper": "NSEJS Core 2",
    "questionNumber": "Q15",
    "section": "Junior Science Olympiad",
    "markingScheme": "+3 / -1",
    "isCompetitive": true,
    "difficultyBand": "D1",
    "difficultyScore": 2,
    "difficultyBasis": "Cognitive demand score determined by 5-component QRT rubric.",
    "cognitiveComponents": {
      "concept_model_selection": 1,
      "representation_translation": 1,
      "reasoning_chain_length": 1,
      "algebra_computational_load": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "APPLY",
    "role": "CORE2",
    "kind": "SINGLE_CHOICE",
    "stem": "Hypertrichosis pinnae auris (excessive hair growth on the external ear rim) is observed exclusively in human males and is transmitted directly from an affected father to all of his sons, while never appearing in daughters. Which genetic mode of inheritance accounts for this trait?",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) Autosomal sex-influenced dominant allele"
      },
      {
        "id": "opt-B",
        "text": "(B) X-linked recessive allele with complete penetrance"
      },
      {
        "id": "opt-C",
        "text": "(C) Y-linked (holandric) gene inheritance"
      },
      {
        "id": "opt-D",
        "text": "(D) Chromosomal aneuploidy"
      }
    ],
    "hints": [
      "[H1 (Context & Setup): Identify governing principles.] 1. Pedigree Pattern: The trait appears strictly in males and passes uninterrupted from father to all biological male offspring (patrilineal descent), never appearing in females.",
      "[H2 (Formulation & Analysis): Key relationship.] 2. Chromosomal Basis: The non-homologous differential region of the human Y chromosome does not undergo crossing over with the X chromosome during male meiosis. Genes located here are called holandric (Y-linked) genes.",
      "[H3 (Crux Resolution): Final calculation.] 3. Conclusion: Strict father-to-son inheritance indicates that the responsible gene is located on the Y chromosome (holandric inheritance, Option C)."
    ],
    "steps": [
      "1. Pedigree Pattern: The trait appears strictly in males and passes uninterrupted from father to all biological male offspring (patrilineal descent), never appearing in females.",
      "2. Chromosomal Basis: The non-homologous differential region of the human Y chromosome does not undergo crossing over with the X chromosome during male meiosis. Genes located here are called holandric (Y-linked) genes.",
      "3. Conclusion: Strict father-to-son inheritance indicates that the responsible gene is located on the Y chromosome (holandric inheritance, Option C)."
    ],
    "check": "Adjudicated under IAPT 2024 examination standards.",
    "limitingCheck": "Adjudicated under IAPT 2024 examination standards.",
    "trapWarning": "Fault N09 Answer Isolation: Raw key withheld client-side; formative reasoning steps provided.",
    "correctKey": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "figures": [],
    "linkedCoreRoles": [
      "CORE1A",
      "CORE1B",
      "CORE2A",
      "CORE2B"
    ],
    "primaryCapabilityRef": "CAP-NSEJS-2024-B-Q15",
    "status": "RELEASED",
    "academicAdmission": "HOLD (Grade9 v4.1 Parity Candidate)",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "sourceOrigin": "NSEJS Custody (Grade9v4.1)"
  },
  {
    "id": "NSEJS-2024-B-Q16",
    "code": "NSEJS-2024-B-Q16",
    "title": "NSEJS 2024-25 \u00b7 Q16 \u00b7 RETRIEVE \u00b7 D1 (Score 2)",
    "subjectCode": "BIO",
    "subject": "Biology",
    "topicCode": "ENVIRONMENT",
    "topic": "Ecology & Ecosystem Resources",
    "subtopic": "Ecology & Environment",
    "exam": "NSEJS",
    "year": 2024,
    "paper": "NSEJS Core 2",
    "questionNumber": "Q16",
    "section": "Junior Science Olympiad",
    "markingScheme": "+3 / -1",
    "isCompetitive": true,
    "difficultyBand": "D1",
    "difficultyScore": 2,
    "difficultyBasis": "Cognitive demand score determined by 5-component QRT rubric.",
    "cognitiveComponents": {
      "concept_model_selection": 1,
      "representation_translation": 1,
      "reasoning_chain_length": 1,
      "algebra_computational_load": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "RETRIEVE",
    "role": "CORE2",
    "kind": "SINGLE_CHOICE",
    "stem": "Which international environmental treaty was adopted in 1987 to protect the Earth's stratospheric ozone layer by legally binding nations to phase out the production and consumption of ozone-depleting substances (such as chlorofluorocarbons, CFCs)?",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) Kyoto Protocol (greenhouse gas reduction)"
      },
      {
        "id": "opt-B",
        "text": "(B) Montreal Protocol"
      },
      {
        "id": "opt-C",
        "text": "(C) Rio Earth Summit (Convention on Biological Diversity)"
      },
      {
        "id": "opt-D",
        "text": "(D) Stockholm Convention (Persistent Organic Pollutants)"
      }
    ],
    "hints": [
      "[H1 (Context & Setup): Identify governing principles.] 1. Treaty Scope: The Montreal Protocol on Substances that Deplete the Ozone Layer is an international environmental treaty signed in 1987.",
      "[H2 (Formulation & Analysis): Key relationship.] 2. Target Chemicals: It regulates nearly 100 man-made chemicals categorized as ozone-depleting substances (ODSs), successfully phasing out CFCs, halons, and carbon tetrachloride.",
      "[H3 (Crux Resolution): Final calculation.] 3. Distinction: Kyoto regulates greenhouse gases, Rio covers biodiversity and climate frameworks, and Stockholm regulates POPs. The ozone treaty is the Montreal Protocol (Option B)."
    ],
    "steps": [
      "1. Treaty Scope: The Montreal Protocol on Substances that Deplete the Ozone Layer is an international environmental treaty signed in 1987.",
      "2. Target Chemicals: It regulates nearly 100 man-made chemicals categorized as ozone-depleting substances (ODSs), successfully phasing out CFCs, halons, and carbon tetrachloride.",
      "3. Distinction: Kyoto regulates greenhouse gases, Rio covers biodiversity and climate frameworks, and Stockholm regulates POPs. The ozone treaty is the Montreal Protocol (Option B)."
    ],
    "check": "Adjudicated under IAPT 2024 examination standards.",
    "limitingCheck": "Adjudicated under IAPT 2024 examination standards.",
    "trapWarning": "Fault N09 Answer Isolation: Raw key withheld client-side; formative reasoning steps provided.",
    "correctKey": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "figures": [],
    "linkedCoreRoles": [
      "CORE1A",
      "CORE1B",
      "CORE2A",
      "CORE2B"
    ],
    "primaryCapabilityRef": "CAP-NSEJS-2024-B-Q16",
    "status": "RELEASED",
    "academicAdmission": "HOLD (Grade9 v4.1 Parity Candidate)",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "sourceOrigin": "NSEJS Custody (Grade9v4.1)"
  },
  {
    "id": "NSEJS-2024-B-Q49",
    "code": "NSEJS-2024-B-Q49",
    "title": "NSEJS 2024-25 \u00b7 Q49 \u00b7 SYNTHESIZE \u00b7 D3 (Score 6)",
    "subjectCode": "BIO",
    "subject": "Biology",
    "topicCode": "LIVING_WORLD",
    "topic": "Cell Biology & Molecular Genetics",
    "subtopic": "Cell & Molecular Biology",
    "exam": "NSEJS",
    "year": 2024,
    "paper": "NSEJS Core 2",
    "questionNumber": "Q49",
    "section": "Junior Science Olympiad",
    "markingScheme": "+3 / -1",
    "isCompetitive": true,
    "difficultyBand": "D3",
    "difficultyScore": 6,
    "difficultyBasis": "Cognitive demand score determined by 5-component QRT rubric.",
    "cognitiveComponents": {
      "concept_model_selection": 1,
      "representation_translation": 1,
      "reasoning_chain_length": 1,
      "algebra_computational_load": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "SYNTHESIZE",
    "role": "CORE2",
    "kind": "SINGLE_CHOICE",
    "stem": "[Multiple Correct] In angiosperms, an aril is an accessory fleshy outgrowth developing from the funiculus or micropyle that partially or wholly encloses the mature seed. Which of the following plants possess an edible aril as their primary consumed portion? (A) Litchi (Litchi chinensis). (B) Rambutan (Nephelium lappaceum). (C) Cashew (Anacardium occidentale). (D) Nutmeg (Myristica fragrans).",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) Litchi (Litchi chinensis)"
      },
      {
        "id": "opt-B",
        "text": "(B) Rambutan (Nephelium lappaceum)"
      },
      {
        "id": "opt-C",
        "text": "(C) Cashew (Anacardium occidentale)"
      },
      {
        "id": "opt-D",
        "text": "(D) Nutmeg (Myristica fragrans)"
      }
    ],
    "hints": [
      "[H1 (Context & Setup): Identify governing principles.] 1. Litchi: The translucent, succulent, sweet edible pulpy coat surrounding the seed is a fleshy aril developing from the funiculus (True).",
      "[H2 (Formulation & Analysis): Key relationship.] 2. Rambutan: Like litchi (Sapindaceae family), rambutan's juicy edible pulp is a seed arillode/aril (True).",
      "[H3 (Crux Resolution): Final calculation.] 3. Cashew: The edible 'cashew nut' is the seed/cotyledons inside the kidney-shaped drupe fruit, and the 'cashew apple' is an edible swollen pedicel/receptacle (hypocarp), not an aril (False)."
    ],
    "steps": [
      "1. Litchi: The translucent, succulent, sweet edible pulpy coat surrounding the seed is a fleshy aril developing from the funiculus (True).",
      "2. Rambutan: Like litchi (Sapindaceae family), rambutan's juicy edible pulp is a seed arillode/aril (True).",
      "3. Cashew: The edible 'cashew nut' is the seed/cotyledons inside the kidney-shaped drupe fruit, and the 'cashew apple' is an edible swollen pedicel/receptacle (hypocarp), not an aril (False).",
      "4. Nutmeg: The aromatic red lacy net covering the hard seed is the aril (known commercially as mace, a prized culinary spice) (True). Correct options: A, B, and D."
    ],
    "check": "Adjudicated under IAPT 2024 examination standards.",
    "limitingCheck": "Adjudicated under IAPT 2024 examination standards.",
    "trapWarning": "Fault N09 Answer Isolation: Raw key withheld client-side; formative reasoning steps provided.",
    "correctKey": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "figures": [],
    "linkedCoreRoles": [
      "CORE1A",
      "CORE1B",
      "CORE2A",
      "CORE2B"
    ],
    "primaryCapabilityRef": "CAP-NSEJS-2024-B-Q49",
    "status": "RELEASED",
    "academicAdmission": "HOLD (Grade9 v4.1 Parity Candidate)",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "sourceOrigin": "NSEJS Custody (Grade9v4.1)"
  },
  {
    "id": "NSEJS-2024-B-Q50",
    "code": "NSEJS-2024-B-Q50",
    "title": "NSEJS 2024-25 \u00b7 Q50 \u00b7 SYNTHESIZE \u00b7 D3 (Score 6)",
    "subjectCode": "BIO",
    "subject": "Biology",
    "topicCode": "LIVING_WORLD",
    "topic": "Cell Biology & Molecular Genetics",
    "subtopic": "Cell & Molecular Biology",
    "exam": "NSEJS",
    "year": 2024,
    "paper": "NSEJS Core 2",
    "questionNumber": "Q50",
    "section": "Junior Science Olympiad",
    "markingScheme": "+3 / -1",
    "isCompetitive": true,
    "difficultyBand": "D3",
    "difficultyScore": 6,
    "difficultyBasis": "Cognitive demand score determined by 5-component QRT rubric.",
    "cognitiveComponents": {
      "concept_model_selection": 1,
      "representation_translation": 1,
      "reasoning_chain_length": 1,
      "algebra_computational_load": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "SYNTHESIZE",
    "role": "CORE2",
    "kind": "SINGLE_CHOICE",
    "stem": "[Multiple Correct] Which of the following statements concerning viral structure, molecular genetics, and replication are biologically incorrect? (A) Mature virions are obligate intracellular infectious particles. (B) Viral replication depends strictly on host ribosomes and translational machinery. (C) The viral envelope consists exclusively of host-derived glycolipids without proteins. (D) All animal viruses contain double-stranded DNA genomes.",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) Mature virions are obligate intracellular infectious particles."
      },
      {
        "id": "opt-B",
        "text": "(B) Viral replication depends strictly on host ribosomes and translational machinery."
      },
      {
        "id": "opt-C",
        "text": "(C) The viral envelope consists exclusively of host-derived glycolipids without proteins."
      },
      {
        "id": "opt-D",
        "text": "(D) All animal viruses contain double-stranded DNA genomes."
      }
    ],
    "hints": [
      "[H1 (Context & Setup): Identify governing principles.] 1. Statement A: True - Virions are infectious macromolecular assemblies capable of infecting host cells.",
      "[H2 (Formulation & Analysis): Key relationship.] 2. Statement B: True - Viruses lack ribosomes, tRNAs, and metabolic enzymes for protein synthesis, relying completely on host translational machinery.",
      "[H3 (Crux Resolution): Final calculation.] 3. Statement C: Incorrect - The viral envelope is a lipid bilayer derived from host membranes but studded with virus-encoded glycoproteins (peplomers/spikes) essential for receptor binding."
    ],
    "steps": [
      "1. Statement A: True - Virions are infectious macromolecular assemblies capable of infecting host cells.",
      "2. Statement B: True - Viruses lack ribosomes, tRNAs, and metabolic enzymes for protein synthesis, relying completely on host translational machinery.",
      "3. Statement C: Incorrect - The viral envelope is a lipid bilayer derived from host membranes but studded with virus-encoded glycoproteins (peplomers/spikes) essential for receptor binding.",
      "4. Statement D: Incorrect - Animal viruses exhibit tremendous genomic diversity, including ssDNA (parvoviruses), dsRNA (reoviruses), positive-sense ssRNA (polio, coronaviruses), and negative-sense ssRNA (rabies, influenza). Therefore, statements C and D are biologically incorrect."
    ],
    "check": "Adjudicated under IAPT 2024 examination standards.",
    "limitingCheck": "Adjudicated under IAPT 2024 examination standards.",
    "trapWarning": "Fault N09 Answer Isolation: Raw key withheld client-side; formative reasoning steps provided.",
    "correctKey": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "figures": [],
    "linkedCoreRoles": [
      "CORE1A",
      "CORE1B",
      "CORE2A",
      "CORE2B"
    ],
    "primaryCapabilityRef": "CAP-NSEJS-2024-B-Q50",
    "status": "RELEASED",
    "academicAdmission": "HOLD (Grade9 v4.1 Parity Candidate)",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "sourceOrigin": "NSEJS Custody (Grade9v4.1)"
  },
  {
    "id": "NSEJS-2024-B-Q51",
    "code": "NSEJS-2024-B-Q51",
    "title": "NSEJS 2024-25 \u00b7 Q51 \u00b7 SYNTHESIZE \u00b7 D3 (Score 6)",
    "subjectCode": "BIO",
    "subject": "Biology",
    "topicCode": "LIVING_WORLD",
    "topic": "Cell Biology & Molecular Genetics",
    "subtopic": "Cell & Molecular Biology",
    "exam": "NSEJS",
    "year": 2024,
    "paper": "NSEJS Core 2",
    "questionNumber": "Q51",
    "section": "Junior Science Olympiad",
    "markingScheme": "+3 / -1",
    "isCompetitive": true,
    "difficultyBand": "D3",
    "difficultyScore": 6,
    "difficultyBasis": "Cognitive demand score determined by 5-component QRT rubric.",
    "cognitiveComponents": {
      "concept_model_selection": 1,
      "representation_translation": 1,
      "reasoning_chain_length": 1,
      "algebra_computational_load": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "SYNTHESIZE",
    "role": "CORE2",
    "kind": "SINGLE_CHOICE",
    "stem": "[Multiple Correct] Motile reproductive flagellated cells (zoospores and gametes) exhibit distinctive flagellar patterns across algal classes. Which of the following major divisions of algae possess biflagellate motile cells bearing two flagella? (A) Rhodophyta (red algae). (B) Phaeophyta (brown algae). (C) Chlorophyta (green algae). (D) Cyanophyta (blue-green algae / cyanobacteria).",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) Rhodophyta (red algae)"
      },
      {
        "id": "opt-B",
        "text": "(B) Phaeophyta (brown algae)"
      },
      {
        "id": "opt-C",
        "text": "(C) Chlorophyta (green algae)"
      },
      {
        "id": "opt-D",
        "text": "(D) Cyanophyta (blue-green algae / cyanobacteria)"
      }
    ],
    "hints": [
      "[H1 (Context & Setup): Identify governing principles.] 1. Rhodophyta: Red algae completely lack flagellated stages throughout their entire life cycle (zoospores and gametes are non-motile) (False).",
      "[H2 (Formulation & Analysis): Key relationship.] 2. Phaeophyta: Brown algae produce pyriform (pear-shaped) zoospores and gametes bearing two laterally inserted unequal flagella (one whiplash, one tinsel) (True).",
      "[H3 (Crux Resolution): Final calculation.] 3. Chlorophyta: Green algae typically possess motile cells (e.g. Chlamydomonas) with two equal, apical, whiplash flagella (True)."
    ],
    "steps": [
      "1. Rhodophyta: Red algae completely lack flagellated stages throughout their entire life cycle (zoospores and gametes are non-motile) (False).",
      "2. Phaeophyta: Brown algae produce pyriform (pear-shaped) zoospores and gametes bearing two laterally inserted unequal flagella (one whiplash, one tinsel) (True).",
      "3. Chlorophyta: Green algae typically possess motile cells (e.g. Chlamydomonas) with two equal, apical, whiplash flagella (True).",
      "4. Cyanophyta: Prokaryotic blue-green algae completely lack eukaryotic flagella or cilia (False). Correct options: B and C."
    ],
    "check": "Adjudicated under IAPT 2024 examination standards.",
    "limitingCheck": "Adjudicated under IAPT 2024 examination standards.",
    "trapWarning": "Fault N09 Answer Isolation: Raw key withheld client-side; formative reasoning steps provided.",
    "correctKey": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "figures": [],
    "linkedCoreRoles": [
      "CORE1A",
      "CORE1B",
      "CORE2A",
      "CORE2B"
    ],
    "primaryCapabilityRef": "CAP-NSEJS-2024-B-Q51",
    "status": "RELEASED",
    "academicAdmission": "HOLD (Grade9 v4.1 Parity Candidate)",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "sourceOrigin": "NSEJS Custody (Grade9v4.1)"
  },
  {
    "id": "NSEJS-2024-B-Q52",
    "code": "NSEJS-2024-B-Q52",
    "title": "NSEJS 2024-25 \u00b7 Q52 \u00b7 SYNTHESIZE \u00b7 D3 (Score 6)",
    "subjectCode": "BIO",
    "subject": "Biology",
    "topicCode": "COORDINATION",
    "topic": "Control & Endocrine Coordination / Immunology",
    "subtopic": "Systems & Regulation",
    "exam": "NSEJS",
    "year": 2024,
    "paper": "NSEJS Core 2",
    "questionNumber": "Q52",
    "section": "Junior Science Olympiad",
    "markingScheme": "+3 / -1",
    "isCompetitive": true,
    "difficultyBand": "D3",
    "difficultyScore": 6,
    "difficultyBasis": "Cognitive demand score determined by 5-component QRT rubric.",
    "cognitiveComponents": {
      "concept_model_selection": 1,
      "representation_translation": 1,
      "reasoning_chain_length": 1,
      "algebra_computational_load": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "SYNTHESIZE",
    "role": "CORE2",
    "kind": "SINGLE_CHOICE",
    "stem": "[Multiple Correct] Which of the following statements regarding vertebrate immune responses and physiological defense mechanisms are correct? (A) All antibodies (immunoglobulins) are glycoproteins. (B) Eosinophils are non-phagocytic lymphocytes. (C) Ciliated pseudostratified epithelium of the respiratory tract functions as a physical/mechanical barrier. (D) Histamine released by tissue mast cells and basophils triggers local vasodilation and inflammatory response.",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) All antibodies (immunoglobulins) are glycoproteins."
      },
      {
        "id": "opt-B",
        "text": "(B) Eosinophils are non-phagocytic lymphocytes."
      },
      {
        "id": "opt-C",
        "text": "(C) Ciliated pseudostratified epithelium of the respiratory tract functions as a physical/mechanical barrier."
      },
      {
        "id": "opt-D",
        "text": "(D) Histamine released by tissue mast cells and basophils triggers local vasodilation and inflammatory response."
      }
    ],
    "hints": [
      "[H1 (Context & Setup): Identify governing principles.] 1. Statement A: Immunoglobulins (IgG, IgM, IgA, IgD, IgE) are structurally glycoproteins consisting of four polypeptide chains with covalently attached oligosaccharide moieties (True).",
      "[H2 (Formulation & Analysis): Key relationship.] 2. Statement B: Eosinophils are polymorphonuclear granulocytic myeloid leukocytes, not agranular lymphocytes (False).",
      "[H3 (Crux Resolution): Final calculation.] 3. Statement C: Ciliated epithelium with goblet-cell mucus forms the mucociliary escalator, mechanically sweeping trapped inhaled dust and pathogens outwards (True)."
    ],
    "steps": [
      "1. Statement A: Immunoglobulins (IgG, IgM, IgA, IgD, IgE) are structurally glycoproteins consisting of four polypeptide chains with covalently attached oligosaccharide moieties (True).",
      "2. Statement B: Eosinophils are polymorphonuclear granulocytic myeloid leukocytes, not agranular lymphocytes (False).",
      "3. Statement C: Ciliated epithelium with goblet-cell mucus forms the mucociliary escalator, mechanically sweeping trapped inhaled dust and pathogens outwards (True).",
      "4. Statement D: Mast cell degranulation releases vasoactive amines (histamine), increasing vascular permeability and arteriolar dilation during acute inflammation (True). Correct options: A, C, and D."
    ],
    "check": "Adjudicated under IAPT 2024 examination standards.",
    "limitingCheck": "Adjudicated under IAPT 2024 examination standards.",
    "trapWarning": "Fault N09 Answer Isolation: Raw key withheld client-side; formative reasoning steps provided.",
    "correctKey": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "figures": [],
    "linkedCoreRoles": [
      "CORE1A",
      "CORE1B",
      "CORE2A",
      "CORE2B"
    ],
    "primaryCapabilityRef": "CAP-NSEJS-2024-B-Q52",
    "status": "RELEASED",
    "academicAdmission": "HOLD (Grade9 v4.1 Parity Candidate)",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "sourceOrigin": "NSEJS Custody (Grade9v4.1)"
  },
  {
    "id": "NSEJS-2023-B-Q01",
    "code": "NSEJS-2023-B-Q01",
    "title": "NSEJS 2023-24 \u00b7 Q01 \u00b7 RETRIEVE \u00b7 D1 (Score 3)",
    "subjectCode": "BIO",
    "subject": "Biology",
    "topicCode": "LIFE_PROCESSES",
    "topic": "Life Processes & Nephron Physiology",
    "subtopic": "Human Physiology",
    "exam": "NSEJS",
    "year": 2024,
    "paper": "NSEJS Core 2",
    "questionNumber": "Q01",
    "section": "Junior Science Olympiad",
    "markingScheme": "+3 / -1",
    "isCompetitive": true,
    "difficultyBand": "D1",
    "difficultyScore": 3,
    "difficultyBasis": "Cognitive demand score determined by 5-component QRT rubric.",
    "cognitiveComponents": {
      "concept_model_selection": 1,
      "representation_translation": 1,
      "reasoning_chain_length": 1,
      "algebra_computational_load": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "RETRIEVE",
    "role": "CORE2",
    "kind": "SINGLE_CHOICE",
    "stem": "In animals, the heart is the main pumping station, supplying and collecting blood from different\nparts of the body. In mammals, which structure is found between the left auricle and the left\nventricle and ensures one-way flow of blood?",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) Tricuspid valve"
      },
      {
        "id": "opt-B",
        "text": "(B) Aortic semilunar valve"
      },
      {
        "id": "opt-C",
        "text": "(C) Pulmonary semilunar valve"
      },
      {
        "id": "opt-D",
        "text": "(D) Mitral valve"
      }
    ],
    "hints": [
      "[H1 (Context & Setup): Identify governing principles.] 1. Conceptual Model: The mammalian heart contains four chambers separated by one-way atrioventricular and semilunar valves to prevent backflow and preserve systemic blood pressure.",
      "[H2 (Formulation & Analysis): Key relationship.] 2. Anatomical Identification: The valve positioned between the left atrium (left auricle) and left ventricle is the mitral (bicuspid) valve, while the tricuspid valve guards the right atrioventricular orifice.",
      "[H3 (Crux Resolution): Final calculation.] 3. Conclusion: The mitral valve ensures unidirectional forward flow from left auricle into the left ventricle during ventricular diastole. Hence Option D."
    ],
    "steps": [
      "1. Conceptual Model: The mammalian heart contains four chambers separated by one-way atrioventricular and semilunar valves to prevent backflow and preserve systemic blood pressure.",
      "2. Anatomical Identification: The valve positioned between the left atrium (left auricle) and left ventricle is the mitral (bicuspid) valve, while the tricuspid valve guards the right atrioventricular orifice.",
      "3. Conclusion: The mitral valve ensures unidirectional forward flow from left auricle into the left ventricle during ventricular diastole. Hence Option D."
    ],
    "check": "Adjudicated under IAPT 2023 examination standards.",
    "limitingCheck": "Adjudicated under IAPT 2023 examination standards.",
    "trapWarning": "Fault N09 Answer Isolation: Raw key withheld client-side; formative reasoning steps provided.",
    "correctKey": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "figures": [],
    "linkedCoreRoles": [
      "CORE1A",
      "CORE1B",
      "CORE2A",
      "CORE2B"
    ],
    "primaryCapabilityRef": "CAP-NSEJS-2023-B-Q01",
    "status": "RELEASED",
    "academicAdmission": "HOLD (Grade9 v4.1 Parity Candidate)",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "sourceOrigin": "NSEJS Custody (Grade9v4.1)"
  },
  {
    "id": "NSEJS-2023-B-Q02",
    "code": "NSEJS-2023-B-Q02",
    "title": "NSEJS 2023-24 \u00b7 Q02 \u00b7 MODEL \u00b7 D2 (Score 3)",
    "subjectCode": "BIO",
    "subject": "Biology",
    "topicCode": "COORDINATION",
    "topic": "Control & Endocrine Coordination / Immunology",
    "subtopic": "Systems & Regulation",
    "exam": "NSEJS",
    "year": 2024,
    "paper": "NSEJS Core 2",
    "questionNumber": "Q02",
    "section": "Junior Science Olympiad",
    "markingScheme": "+3 / -1",
    "isCompetitive": true,
    "difficultyBand": "D2",
    "difficultyScore": 3,
    "difficultyBasis": "Cognitive demand score determined by 5-component QRT rubric.",
    "cognitiveComponents": {
      "concept_model_selection": 1,
      "representation_translation": 1,
      "reasoning_chain_length": 1,
      "algebra_computational_load": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "MODEL",
    "role": "CORE2",
    "kind": "SINGLE_CHOICE",
    "stem": "Which of the following correctly lists the units involved in most reflex arcs?",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) Stimulus receptor, afferent nerve, efferent nerve and an effector neuron"
      },
      {
        "id": "opt-B",
        "text": "(B) Two receptor neurons, one or more internuncial neuron(s) and an effector neuron"
      },
      {
        "id": "opt-C",
        "text": "(C) One receptor neuron, one or more internuncial neuron(s) and an effector neuron"
      },
      {
        "id": "opt-D",
        "text": "(D) One receptor neuron, afferent nerve and an effector neuron"
      }
    ],
    "hints": [
      "[H1 (Context & Setup): Identify governing principles.] 1. Conceptual Model: A basic somatic reflex arc comprises sensory input detection, central synaptic processing, and motor response delivery.",
      "[H2 (Formulation & Analysis): Key relationship.] 2. Structural Sequence: The signal path involves one sensory receptor neuron that conducts afferent action potentials, one or more internuncial (interneurons) within the grey matter of the spinal cord, and a motor/effector neuron that carries efferent impulses to the effector organ.",
      "[H3 (Crux Resolution): Final calculation.] 3. Conclusion: Listing one receptor neuron, one or more internuncial neurons, and an effector neuron correctly describes standard polysynaptic reflex units. Hence Option C."
    ],
    "steps": [
      "1. Conceptual Model: A basic somatic reflex arc comprises sensory input detection, central synaptic processing, and motor response delivery.",
      "2. Structural Sequence: The signal path involves one sensory receptor neuron that conducts afferent action potentials, one or more internuncial (interneurons) within the grey matter of the spinal cord, and a motor/effector neuron that carries efferent impulses to the effector organ.",
      "3. Conclusion: Listing one receptor neuron, one or more internuncial neurons, and an effector neuron correctly describes standard polysynaptic reflex units. Hence Option C."
    ],
    "check": "Adjudicated under IAPT 2023 examination standards.",
    "limitingCheck": "Adjudicated under IAPT 2023 examination standards.",
    "trapWarning": "Fault N09 Answer Isolation: Raw key withheld client-side; formative reasoning steps provided.",
    "correctKey": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "figures": [],
    "linkedCoreRoles": [
      "CORE1A",
      "CORE1B",
      "CORE2A",
      "CORE2B"
    ],
    "primaryCapabilityRef": "CAP-NSEJS-2023-B-Q02",
    "status": "RELEASED",
    "academicAdmission": "HOLD (Grade9 v4.1 Parity Candidate)",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "sourceOrigin": "NSEJS Custody (Grade9v4.1)"
  },
  {
    "id": "NSEJS-2023-B-Q03",
    "code": "NSEJS-2023-B-Q03",
    "title": "NSEJS 2023-24 \u00b7 Q03 \u00b7 EXPLAIN \u00b7 D2 (Score 3)",
    "subjectCode": "BIO",
    "subject": "Biology",
    "topicCode": "GENETICS",
    "topic": "Reproduction & Mendelian Heredity",
    "subtopic": "Genetics & Evolution",
    "exam": "NSEJS",
    "year": 2024,
    "paper": "NSEJS Core 2",
    "questionNumber": "Q03",
    "section": "Junior Science Olympiad",
    "markingScheme": "+3 / -1",
    "isCompetitive": true,
    "difficultyBand": "D2",
    "difficultyScore": 3,
    "difficultyBasis": "Cognitive demand score determined by 5-component QRT rubric.",
    "cognitiveComponents": {
      "concept_model_selection": 1,
      "representation_translation": 1,
      "reasoning_chain_length": 1,
      "algebra_computational_load": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "EXPLAIN",
    "role": "CORE2",
    "kind": "SINGLE_CHOICE",
    "stem": "Cross-breeding, mutation breeding and cytoplasmic hybridisation can produce improved varieties\nor distinct hybrids. Which pair represents cytoplasmic hybrids (cybrids)?",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) Triticale and Fairchild Mule"
      },
      {
        "id": "opt-B",
        "text": "(B) Tigon and Leopon"
      },
      {
        "id": "opt-C",
        "text": "(C) Pomato and Bromato"
      },
      {
        "id": "opt-D",
        "text": "(D) Jaya and Ratna rice"
      }
    ],
    "hints": [
      "[H1 (Context & Setup): Identify governing principles.] 1. Conceptual Model: A cybrid (cytoplasmic hybrid) is an alloplasmic cell or plant generated by somatic cell fusion wherein the nuclear genome of one parent is combined with the cytoplasmic extranuclear organellar genomes (chloroplasts and mitochondria) of both or the other parent.",
      "[H2 (Formulation & Analysis): Key relationship.] 2. Diagnostic Pairs: Pomato (potato + tomato) and Bromato (brinjal + tomato) were created via somatic protoplast fusion and cytoplasmic hybridisation.",
      "[H3 (Crux Resolution): Final calculation.] 3. Conclusion: Pomato and Bromato exemplify classic cybrids/somatic hybrids. Hence Option C."
    ],
    "steps": [
      "1. Conceptual Model: A cybrid (cytoplasmic hybrid) is an alloplasmic cell or plant generated by somatic cell fusion wherein the nuclear genome of one parent is combined with the cytoplasmic extranuclear organellar genomes (chloroplasts and mitochondria) of both or the other parent.",
      "2. Diagnostic Pairs: Pomato (potato + tomato) and Bromato (brinjal + tomato) were created via somatic protoplast fusion and cytoplasmic hybridisation.",
      "3. Conclusion: Pomato and Bromato exemplify classic cybrids/somatic hybrids. Hence Option C."
    ],
    "check": "Adjudicated under IAPT 2023 examination standards.",
    "limitingCheck": "Adjudicated under IAPT 2023 examination standards.",
    "trapWarning": "Fault N09 Answer Isolation: Raw key withheld client-side; formative reasoning steps provided.",
    "correctKey": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "figures": [],
    "linkedCoreRoles": [
      "CORE1A",
      "CORE1B",
      "CORE2A",
      "CORE2B"
    ],
    "primaryCapabilityRef": "CAP-NSEJS-2023-B-Q03",
    "status": "RELEASED",
    "academicAdmission": "HOLD (Grade9 v4.1 Parity Candidate)",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "sourceOrigin": "NSEJS Custody (Grade9v4.1)"
  },
  {
    "id": "NSEJS-2023-B-Q04",
    "code": "NSEJS-2023-B-Q04",
    "title": "NSEJS 2023-24 \u00b7 Q04 \u00b7 APPLY \u00b7 D2 (Score 3)",
    "subjectCode": "BIO",
    "subject": "Biology",
    "topicCode": "LIVING_WORLD",
    "topic": "Cell Biology & Molecular Genetics",
    "subtopic": "Cell & Molecular Biology",
    "exam": "NSEJS",
    "year": 2024,
    "paper": "NSEJS Core 2",
    "questionNumber": "Q04",
    "section": "Junior Science Olympiad",
    "markingScheme": "+3 / -1",
    "isCompetitive": true,
    "difficultyBand": "D2",
    "difficultyScore": 3,
    "difficultyBasis": "Cognitive demand score determined by 5-component QRT rubric.",
    "cognitiveComponents": {
      "concept_model_selection": 1,
      "representation_translation": 1,
      "reasoning_chain_length": 1,
      "algebra_computational_load": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "APPLY",
    "role": "CORE2",
    "kind": "SINGLE_CHOICE",
    "stem": "In a certain animal epithelium, every cell rests on the basement membrane, but some basal cells\ndo not reach the free surface. The nuclei therefore appear at different levels, making the tissue look\nmultilayered although it is not truly stratified. It is often ciliated and may contain mucus-secreting\ngoblet cells. Where is this epithelium characteristically found?",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) Thin bronchioles, uriniferous tubules and ciliary body"
      },
      {
        "id": "opt-B",
        "text": "(B) Bile ducts, lining of stomach and trachea"
      },
      {
        "id": "opt-C",
        "text": "(C) Skin epidermis, anal canal and cornea"
      },
      {
        "id": "opt-D",
        "text": "(D) Trachea, vasa deferentia and epididymis"
      }
    ],
    "hints": [
      "[H1 (Context & Setup): Identify governing principles.] 1. Conceptual Model: Epithelial classification relies on cell morphology and layer counts. Pseudostratified epithelium features a single cell layer where all cells attach directly to the basement membrane, but cells differ in height so nuclei reside at staggered levels.",
      "[H2 (Formulation & Analysis): Key relationship.] 2. Anatomical Distribution: Pseudostratified ciliated columnar epithelium lines the trachea and large bronchi, while pseudostratified non-ciliated / stereociliated varieties line portions of the male reproductive tract including the vas deferens and epididymis.",
      "[H3 (Crux Resolution): Final calculation.] 3. Conclusion: Characteristically found in trachea, vasa deferentia, and epididymis. Hence Option D."
    ],
    "steps": [
      "1. Conceptual Model: Epithelial classification relies on cell morphology and layer counts. Pseudostratified epithelium features a single cell layer where all cells attach directly to the basement membrane, but cells differ in height so nuclei reside at staggered levels.",
      "2. Anatomical Distribution: Pseudostratified ciliated columnar epithelium lines the trachea and large bronchi, while pseudostratified non-ciliated / stereociliated varieties line portions of the male reproductive tract including the vas deferens and epididymis.",
      "3. Conclusion: Characteristically found in trachea, vasa deferentia, and epididymis. Hence Option D."
    ],
    "check": "Adjudicated under IAPT 2023 examination standards.",
    "limitingCheck": "Adjudicated under IAPT 2023 examination standards.",
    "trapWarning": "Fault N09 Answer Isolation: Raw key withheld client-side; formative reasoning steps provided.",
    "correctKey": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "figures": [],
    "linkedCoreRoles": [
      "CORE1A",
      "CORE1B",
      "CORE2A",
      "CORE2B"
    ],
    "primaryCapabilityRef": "CAP-NSEJS-2023-B-Q04",
    "status": "RELEASED",
    "academicAdmission": "HOLD (Grade9 v4.1 Parity Candidate)",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "sourceOrigin": "NSEJS Custody (Grade9v4.1)"
  },
  {
    "id": "NSEJS-2023-B-Q05",
    "code": "NSEJS-2023-B-Q05",
    "title": "NSEJS 2023-24 \u00b7 Q05 \u00b7 APPLY \u00b7 D2 (Score 3)",
    "subjectCode": "BIO",
    "subject": "Biology",
    "topicCode": "GENETICS",
    "topic": "Reproduction & Mendelian Heredity",
    "subtopic": "Genetics & Evolution",
    "exam": "NSEJS",
    "year": 2024,
    "paper": "NSEJS Core 2",
    "questionNumber": "Q05",
    "section": "Junior Science Olympiad",
    "markingScheme": "+3 / -1",
    "isCompetitive": true,
    "difficultyBand": "D2",
    "difficultyScore": 3,
    "difficultyBasis": "Cognitive demand score determined by 5-component QRT rubric.",
    "cognitiveComponents": {
      "concept_model_selection": 1,
      "representation_translation": 1,
      "reasoning_chain_length": 1,
      "algebra_computational_load": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "APPLY",
    "role": "CORE2",
    "kind": "SINGLE_CHOICE",
    "stem": "Phenylthiocarbamide (PTC) tastes bitter to tasters. The non-tasting condition is caused by a\nrecessive allele. A non-taster woman marries a PTC-taster man. Their first two children are non-\ntasters. What is the probability that their third child will also be a non-taster?",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) 0.25"
      },
      {
        "id": "opt-B",
        "text": "(B) 0.50"
      },
      {
        "id": "opt-C",
        "text": "(C) 0.15"
      },
      {
        "id": "opt-D",
        "text": "(D) 0.75"
      }
    ],
    "hints": [
      "[H1 (Context & Setup): Identify governing principles.] 1. Conceptual Model: PTC tasting is governed by an autosomal dominant allele (T), whereas non-tasting is autosomal recessive (t).",
      "[H2 (Formulation & Analysis): Key relationship.] 2. Genotypic Deduction: The mother is a non-taster (tt). The father is a taster (T_). Because they produced non-taster children (tt), the father must be heterozygous (Tt).",
      "[H3 (Crux Resolution): Final calculation.] 3. Probability Calculation: For each independent fertilisation event between Tt and tt, P(non-taster tt) = 1/2 = 0.50. Hence Option B."
    ],
    "steps": [
      "1. Conceptual Model: PTC tasting is governed by an autosomal dominant allele (T), whereas non-tasting is autosomal recessive (t).",
      "2. Genotypic Deduction: The mother is a non-taster (tt). The father is a taster (T_). Because they produced non-taster children (tt), the father must be heterozygous (Tt).",
      "3. Probability Calculation: For each independent fertilisation event between Tt and tt, P(non-taster tt) = 1/2 = 0.50. Hence Option B."
    ],
    "check": "Adjudicated under IAPT 2023 examination standards.",
    "limitingCheck": "Adjudicated under IAPT 2023 examination standards.",
    "trapWarning": "Fault N09 Answer Isolation: Raw key withheld client-side; formative reasoning steps provided.",
    "correctKey": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "figures": [],
    "linkedCoreRoles": [
      "CORE1A",
      "CORE1B",
      "CORE2A",
      "CORE2B"
    ],
    "primaryCapabilityRef": "CAP-NSEJS-2023-B-Q05",
    "status": "RELEASED",
    "academicAdmission": "HOLD (Grade9 v4.1 Parity Candidate)",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "sourceOrigin": "NSEJS Custody (Grade9v4.1)"
  },
  {
    "id": "NSEJS-2023-B-Q06",
    "code": "NSEJS-2023-B-Q06",
    "title": "NSEJS 2023-24 \u00b7 Q06 \u00b7 MODEL \u00b7 D2 (Score 3)",
    "subjectCode": "BIO",
    "subject": "Biology",
    "topicCode": "COORDINATION",
    "topic": "Control & Endocrine Coordination / Immunology",
    "subtopic": "Systems & Regulation",
    "exam": "NSEJS",
    "year": 2024,
    "paper": "NSEJS Core 2",
    "questionNumber": "Q06",
    "section": "Junior Science Olympiad",
    "markingScheme": "+3 / -1",
    "isCompetitive": true,
    "difficultyBand": "D2",
    "difficultyScore": 3,
    "difficultyBasis": "Cognitive demand score determined by 5-component QRT rubric.",
    "cognitiveComponents": {
      "concept_model_selection": 1,
      "representation_translation": 1,
      "reasoning_chain_length": 1,
      "algebra_computational_load": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "MODEL",
    "role": "CORE2",
    "kind": "SINGLE_CHOICE",
    "stem": "The diagram is a sectional view of an endocrine gland. Its characteristic layers are labelled 1, 2, 3\nand 4. Which layers secrete the C21 hormones cortisol and corticosterone?",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) 1"
      },
      {
        "id": "opt-B",
        "text": "(B) 1 and 3"
      },
      {
        "id": "opt-C",
        "text": "(C) 2 and 4"
      },
      {
        "id": "opt-D",
        "text": "(D) 2 and 3"
      }
    ],
    "hints": [
      "[H1 (Context & Setup): Identify governing principles.] 1. Conceptual Model: The adrenal cortex exhibits concentric zones: zona glomerulosa (outer, layer 1), zona fasciculata (middle, layer 2), and zona reticularis (inner cortical, layer 3), overlying the medulla (layer 4).",
      "[H2 (Formulation & Analysis): Key relationship.] 2. Endocrine Secretion: Glucocorticoids (cortisol and corticosterone, C21 steroids) are primarily synthesized by zona fasciculata (layer 2) with supporting contributions from zona reticularis (layer 3). Mineralocorticoid aldosterone is secreted by zona glomerulosa (layer 1).",
      "[H3 (Crux Resolution): Final calculation.] 3. Conclusion: The layers secreting C21 glucocorticoids cortisol and corticosterone are layers 2 and 3. Hence Option D."
    ],
    "steps": [
      "1. Conceptual Model: The adrenal cortex exhibits concentric zones: zona glomerulosa (outer, layer 1), zona fasciculata (middle, layer 2), and zona reticularis (inner cortical, layer 3), overlying the medulla (layer 4).",
      "2. Endocrine Secretion: Glucocorticoids (cortisol and corticosterone, C21 steroids) are primarily synthesized by zona fasciculata (layer 2) with supporting contributions from zona reticularis (layer 3). Mineralocorticoid aldosterone is secreted by zona glomerulosa (layer 1).",
      "3. Conclusion: The layers secreting C21 glucocorticoids cortisol and corticosterone are layers 2 and 3. Hence Option D."
    ],
    "check": "Adjudicated under IAPT 2023 examination standards.",
    "limitingCheck": "Adjudicated under IAPT 2023 examination standards.",
    "trapWarning": "Fault N09 Answer Isolation: Raw key withheld client-side; formative reasoning steps provided.",
    "correctKey": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "figures": [],
    "linkedCoreRoles": [
      "CORE1A",
      "CORE1B",
      "CORE2A",
      "CORE2B"
    ],
    "primaryCapabilityRef": "CAP-NSEJS-2023-B-Q06",
    "status": "RELEASED",
    "academicAdmission": "HOLD (Grade9 v4.1 Parity Candidate)",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "sourceOrigin": "NSEJS Custody (Grade9v4.1)"
  },
  {
    "id": "NSEJS-2023-B-Q07",
    "code": "NSEJS-2023-B-Q07",
    "title": "NSEJS 2023-24 \u00b7 Q07 \u00b7 RETRIEVE \u00b7 D1 (Score 3)",
    "subjectCode": "BIO",
    "subject": "Biology",
    "topicCode": "COORDINATION",
    "topic": "Control & Endocrine Coordination / Immunology",
    "subtopic": "Systems & Regulation",
    "exam": "NSEJS",
    "year": 2024,
    "paper": "NSEJS Core 2",
    "questionNumber": "Q07",
    "section": "Junior Science Olympiad",
    "markingScheme": "+3 / -1",
    "isCompetitive": true,
    "difficultyBand": "D1",
    "difficultyScore": 3,
    "difficultyBasis": "Cognitive demand score determined by 5-component QRT rubric.",
    "cognitiveComponents": {
      "concept_model_selection": 1,
      "representation_translation": 1,
      "reasoning_chain_length": 1,
      "algebra_computational_load": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "RETRIEVE",
    "role": "CORE2",
    "kind": "SINGLE_CHOICE",
    "stem": "Which eye defect develops because the ciliary muscles gradually weaken and the flexibility of the\neye lens decreases?",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) Hyperopia"
      },
      {
        "id": "opt-B",
        "text": "(B) Presbyopia"
      },
      {
        "id": "opt-C",
        "text": "(C) Astigmatism"
      },
      {
        "id": "opt-D",
        "text": "(D) Myopia"
      }
    ],
    "hints": [
      "[H1 (Context & Setup): Identify governing principles.] 1. Conceptual Model: Visual accommodation requires ciliary muscle contraction to allow the crystalline lens to assume a more rounded convex profile for near focus.",
      "[H2 (Formulation & Analysis): Key relationship.] 2. Etiological Mapping: Aging results in progressive sclerosis and reduced elasticity of the crystalline lens accompanied by gradual weakening of the ciliary muscles, causing near-point recession termed presbyopia.",
      "[H3 (Crux Resolution): Final calculation.] 3. Conclusion: The age-related loss of accommodation is presbyopia. Hence Option B."
    ],
    "steps": [
      "1. Conceptual Model: Visual accommodation requires ciliary muscle contraction to allow the crystalline lens to assume a more rounded convex profile for near focus.",
      "2. Etiological Mapping: Aging results in progressive sclerosis and reduced elasticity of the crystalline lens accompanied by gradual weakening of the ciliary muscles, causing near-point recession termed presbyopia.",
      "3. Conclusion: The age-related loss of accommodation is presbyopia. Hence Option B."
    ],
    "check": "Adjudicated under IAPT 2023 examination standards.",
    "limitingCheck": "Adjudicated under IAPT 2023 examination standards.",
    "trapWarning": "Fault N09 Answer Isolation: Raw key withheld client-side; formative reasoning steps provided.",
    "correctKey": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "figures": [],
    "linkedCoreRoles": [
      "CORE1A",
      "CORE1B",
      "CORE2A",
      "CORE2B"
    ],
    "primaryCapabilityRef": "CAP-NSEJS-2023-B-Q07",
    "status": "RELEASED",
    "academicAdmission": "HOLD (Grade9 v4.1 Parity Candidate)",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "sourceOrigin": "NSEJS Custody (Grade9v4.1)"
  },
  {
    "id": "NSEJS-2023-B-Q08",
    "code": "NSEJS-2023-B-Q08",
    "title": "NSEJS 2023-24 \u00b7 Q08 \u00b7 RETRIEVE \u00b7 D1 (Score 3)",
    "subjectCode": "BIO",
    "subject": "Biology",
    "topicCode": "ENVIRONMENT",
    "topic": "Ecology & Ecosystem Resources",
    "subtopic": "Ecology & Environment",
    "exam": "NSEJS",
    "year": 2024,
    "paper": "NSEJS Core 2",
    "questionNumber": "Q08",
    "section": "Junior Science Olympiad",
    "markingScheme": "+3 / -1",
    "isCompetitive": true,
    "difficultyBand": "D1",
    "difficultyScore": 3,
    "difficultyBasis": "Cognitive demand score determined by 5-component QRT rubric.",
    "cognitiveComponents": {
      "concept_model_selection": 1,
      "representation_translation": 1,
      "reasoning_chain_length": 1,
      "algebra_computational_load": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "RETRIEVE",
    "role": "CORE2",
    "kind": "SINGLE_CHOICE",
    "stem": "Which genus is the Angoumois grain moth that causes serious damage to stored grains such as\npaddy and wheat?",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) Sitophilus"
      },
      {
        "id": "opt-B",
        "text": "(B) Sitotroga"
      },
      {
        "id": "opt-C",
        "text": "(C) Gnorimoschema"
      },
      {
        "id": "opt-D",
        "text": "(D) Plodia"
      }
    ],
    "hints": [
      "[H1 (Context & Setup): Identify governing principles.] 1. Conceptual Model: Stored product entomology categorises primary grain borers whose larvae feed internally inside sound cereal seeds.",
      "[H2 (Formulation & Analysis): Key relationship.] 2. Taxonomic Assignment: The Angoumois grain moth is Sitotroga cerealella (family Gelechiidae, order Lepidoptera), destructive to stored paddy, maize, and wheat.",
      "[H3 (Crux Resolution): Final calculation.] 3. Conclusion: Genus is Sitotroga. Hence Option B."
    ],
    "steps": [
      "1. Conceptual Model: Stored product entomology categorises primary grain borers whose larvae feed internally inside sound cereal seeds.",
      "2. Taxonomic Assignment: The Angoumois grain moth is Sitotroga cerealella (family Gelechiidae, order Lepidoptera), destructive to stored paddy, maize, and wheat.",
      "3. Conclusion: Genus is Sitotroga. Hence Option B."
    ],
    "check": "Adjudicated under IAPT 2023 examination standards.",
    "limitingCheck": "Adjudicated under IAPT 2023 examination standards.",
    "trapWarning": "Fault N09 Answer Isolation: Raw key withheld client-side; formative reasoning steps provided.",
    "correctKey": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "figures": [],
    "linkedCoreRoles": [
      "CORE1A",
      "CORE1B",
      "CORE2A",
      "CORE2B"
    ],
    "primaryCapabilityRef": "CAP-NSEJS-2023-B-Q08",
    "status": "RELEASED",
    "academicAdmission": "HOLD (Grade9 v4.1 Parity Candidate)",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "sourceOrigin": "NSEJS Custody (Grade9v4.1)"
  },
  {
    "id": "NSEJS-2023-B-Q09",
    "code": "NSEJS-2023-B-Q09",
    "title": "NSEJS 2023-24 \u00b7 Q09 \u00b7 APPLY \u00b7 D2 (Score 3)",
    "subjectCode": "BIO",
    "subject": "Biology",
    "topicCode": "LIVING_WORLD",
    "topic": "Cell Biology & Molecular Genetics",
    "subtopic": "Cell & Molecular Biology",
    "exam": "NSEJS",
    "year": 2024,
    "paper": "NSEJS Core 2",
    "questionNumber": "Q09",
    "section": "Junior Science Olympiad",
    "markingScheme": "+3 / -1",
    "isCompetitive": true,
    "difficultyBand": "D2",
    "difficultyScore": 3,
    "difficultyBasis": "Cognitive demand score determined by 5-component QRT rubric.",
    "cognitiveComponents": {
      "concept_model_selection": 1,
      "representation_translation": 1,
      "reasoning_chain_length": 1,
      "algebra_computational_load": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "APPLY",
    "role": "CORE2",
    "kind": "SINGLE_CHOICE",
    "stem": "For fertilisation in angiosperms, pollen grains germinate and pollen tubes carry male gametes to\nthe ovules. Suppose a brinjal fruit is to contain 300 seeds. How many meiotic cell divisions are\nrequired to produce the necessary female and male gametophytes?",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) 250 meiotic divisions"
      },
      {
        "id": "opt-B",
        "text": "(B) 375 meiotic divisions"
      },
      {
        "id": "opt-C",
        "text": "(C) 375 mitotic divisions"
      },
      {
        "id": "opt-D",
        "text": "(D) 300 mitotic and 125 meiotic divisions"
      }
    ],
    "hints": [
      "[H1 (Context & Setup): Identify governing principles.] 1. Conceptual Model: In angiosperms, formation of each seed requires one viable megaspore (for the embryo sac) and at least one viable microspore (male gamete vehicle).",
      "[H2 (Formulation & Analysis): Key relationship.] 2. Quantitative Meiotic Count: To form 300 seeds: 300 functional megaspores require 300 megaspore mother cells to undergo meiosis (since 1 MMC yields 1 functional megaspore, 3 degenerate) = 300 meiotic divisions. For male gametes, 1 microspore mother cell yields 4 viable pollen grains; hence 300 pollen grains require 300 / 4 = 75 meiotic divisions.",
      "[H3 (Crux Resolution): Final calculation.] 3. Summation: Total meiotic cell divisions = 300 (female) + 75 (male) = 375 meiotic divisions. Hence Option B."
    ],
    "steps": [
      "1. Conceptual Model: In angiosperms, formation of each seed requires one viable megaspore (for the embryo sac) and at least one viable microspore (male gamete vehicle).",
      "2. Quantitative Meiotic Count: To form 300 seeds: 300 functional megaspores require 300 megaspore mother cells to undergo meiosis (since 1 MMC yields 1 functional megaspore, 3 degenerate) = 300 meiotic divisions. For male gametes, 1 microspore mother cell yields 4 viable pollen grains; hence 300 pollen grains require 300 / 4 = 75 meiotic divisions.",
      "3. Summation: Total meiotic cell divisions = 300 (female) + 75 (male) = 375 meiotic divisions. Hence Option B."
    ],
    "check": "Adjudicated under IAPT 2023 examination standards.",
    "limitingCheck": "Adjudicated under IAPT 2023 examination standards.",
    "trapWarning": "Fault N09 Answer Isolation: Raw key withheld client-side; formative reasoning steps provided.",
    "correctKey": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "figures": [],
    "linkedCoreRoles": [
      "CORE1A",
      "CORE1B",
      "CORE2A",
      "CORE2B"
    ],
    "primaryCapabilityRef": "CAP-NSEJS-2023-B-Q09",
    "status": "RELEASED",
    "academicAdmission": "HOLD (Grade9 v4.1 Parity Candidate)",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "sourceOrigin": "NSEJS Custody (Grade9v4.1)"
  },
  {
    "id": "NSEJS-2023-B-Q10",
    "code": "NSEJS-2023-B-Q10",
    "title": "NSEJS 2023-24 \u00b7 Q10 \u00b7 RETRIEVE \u00b7 D1 (Score 3)",
    "subjectCode": "BIO",
    "subject": "Biology",
    "topicCode": "LIVING_WORLD",
    "topic": "Cell Biology & Molecular Genetics",
    "subtopic": "Cell & Molecular Biology",
    "exam": "NSEJS",
    "year": 2024,
    "paper": "NSEJS Core 2",
    "questionNumber": "Q10",
    "section": "Junior Science Olympiad",
    "markingScheme": "+3 / -1",
    "isCompetitive": true,
    "difficultyBand": "D1",
    "difficultyScore": 3,
    "difficultyBasis": "Cognitive demand score determined by 5-component QRT rubric.",
    "cognitiveComponents": {
      "concept_model_selection": 1,
      "representation_translation": 1,
      "reasoning_chain_length": 1,
      "algebra_computational_load": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "RETRIEVE",
    "role": "CORE2",
    "kind": "SINGLE_CHOICE",
    "stem": "Which plant is well known for the anatomical features called carinal canals and vallecular\ncanals?",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) Magnolia"
      },
      {
        "id": "opt-B",
        "text": "(B) Gnetum"
      },
      {
        "id": "opt-C",
        "text": "(C) Equisetum"
      },
      {
        "id": "opt-D",
        "text": "(D) Lycopodium"
      }
    ],
    "hints": [
      "[H1 (Context & Setup): Identify governing principles.] 1. Conceptual Model: Equisetum (horsetails, Sphenopsida) possesses specialized aerial ribbed stems adapted to amphibious and water-stressed habitats.",
      "[H2 (Formulation & Analysis): Key relationship.] 2. Anatomical Structure: Stem cross-sections reveal ridges and furrows containing vallecular canals (aerating canals in cortex under the furrows/valleculae) and carinal canals (water-conducting canals in vascular bundles beneath the ridges/carinae).",
      "[H3 (Crux Resolution): Final calculation.] 3. Conclusion: Carinal and vallecular canals uniquely characterize Equisetum. Hence Option C."
    ],
    "steps": [
      "1. Conceptual Model: Equisetum (horsetails, Sphenopsida) possesses specialized aerial ribbed stems adapted to amphibious and water-stressed habitats.",
      "2. Anatomical Structure: Stem cross-sections reveal ridges and furrows containing vallecular canals (aerating canals in cortex under the furrows/valleculae) and carinal canals (water-conducting canals in vascular bundles beneath the ridges/carinae).",
      "3. Conclusion: Carinal and vallecular canals uniquely characterize Equisetum. Hence Option C."
    ],
    "check": "Adjudicated under IAPT 2023 examination standards.",
    "limitingCheck": "Adjudicated under IAPT 2023 examination standards.",
    "trapWarning": "Fault N09 Answer Isolation: Raw key withheld client-side; formative reasoning steps provided.",
    "correctKey": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "figures": [],
    "linkedCoreRoles": [
      "CORE1A",
      "CORE1B",
      "CORE2A",
      "CORE2B"
    ],
    "primaryCapabilityRef": "CAP-NSEJS-2023-B-Q10",
    "status": "RELEASED",
    "academicAdmission": "HOLD (Grade9 v4.1 Parity Candidate)",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "sourceOrigin": "NSEJS Custody (Grade9v4.1)"
  },
  {
    "id": "NSEJS-2023-B-Q11",
    "code": "NSEJS-2023-B-Q11",
    "title": "NSEJS 2023-24 \u00b7 Q11 \u00b7 RETRIEVE \u00b7 D1 (Score 3)",
    "subjectCode": "BIO",
    "subject": "Biology",
    "topicCode": "GENETICS",
    "topic": "Reproduction & Mendelian Heredity",
    "subtopic": "Genetics & Evolution",
    "exam": "NSEJS",
    "year": 2024,
    "paper": "NSEJS Core 2",
    "questionNumber": "Q11",
    "section": "Junior Science Olympiad",
    "markingScheme": "+3 / -1",
    "isCompetitive": true,
    "difficultyBand": "D1",
    "difficultyScore": 3,
    "difficultyBasis": "Cognitive demand score determined by 5-component QRT rubric.",
    "cognitiveComponents": {
      "concept_model_selection": 1,
      "representation_translation": 1,
      "reasoning_chain_length": 1,
      "algebra_computational_load": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "RETRIEVE",
    "role": "CORE2",
    "kind": "SINGLE_CHOICE",
    "stem": "Satellite or SAT chromosomes have secondary constrictions at fixed positions. In humans,\nsatellites are usually associated with the short arms of which acrocentric chromosomes?",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) 1, 10, 15, 16 and Y"
      },
      {
        "id": "opt-B",
        "text": "(B) 13, 14, 15, 21 and 22"
      },
      {
        "id": "opt-C",
        "text": "(C) 13, 14, 16, 18 and 21"
      },
      {
        "id": "opt-D",
        "text": "(D) 13, 14, 18 and 22"
      }
    ],
    "hints": [
      "[H1 (Context & Setup): Identify governing principles.] 1. Conceptual Model: Satellite (SAT) chromosomes possess secondary constrictions that house nucleolus organizer regions (NORs) encoding ribosomal RNA.",
      "[H2 (Formulation & Analysis): Key relationship.] 2. Karyotype Localization: In the human diploid genome, the acrocentric chromosome pairs carrying satellite stalks on their short (p) arms are chromosomes 13, 14, 15 (Group D) and 21, 22 (Group G).",
      "[H3 (Crux Resolution): Final calculation.] 3. Conclusion: Short arms of 13, 14, 15, 21, and 22. Hence Option B."
    ],
    "steps": [
      "1. Conceptual Model: Satellite (SAT) chromosomes possess secondary constrictions that house nucleolus organizer regions (NORs) encoding ribosomal RNA.",
      "2. Karyotype Localization: In the human diploid genome, the acrocentric chromosome pairs carrying satellite stalks on their short (p) arms are chromosomes 13, 14, 15 (Group D) and 21, 22 (Group G).",
      "3. Conclusion: Short arms of 13, 14, 15, 21, and 22. Hence Option B."
    ],
    "check": "Adjudicated under IAPT 2023 examination standards.",
    "limitingCheck": "Adjudicated under IAPT 2023 examination standards.",
    "trapWarning": "Fault N09 Answer Isolation: Raw key withheld client-side; formative reasoning steps provided.",
    "correctKey": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "figures": [],
    "linkedCoreRoles": [
      "CORE1A",
      "CORE1B",
      "CORE2A",
      "CORE2B"
    ],
    "primaryCapabilityRef": "CAP-NSEJS-2023-B-Q11",
    "status": "RELEASED",
    "academicAdmission": "HOLD (Grade9 v4.1 Parity Candidate)",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "sourceOrigin": "NSEJS Custody (Grade9v4.1)"
  },
  {
    "id": "NSEJS-2023-B-Q12",
    "code": "NSEJS-2023-B-Q12",
    "title": "NSEJS 2023-24 \u00b7 Q12 \u00b7 RETRIEVE \u00b7 D1 (Score 3)",
    "subjectCode": "BIO",
    "subject": "Biology",
    "topicCode": "LIVING_WORLD",
    "topic": "Cell Biology & Molecular Genetics",
    "subtopic": "Cell & Molecular Biology",
    "exam": "NSEJS",
    "year": 2024,
    "paper": "NSEJS Core 2",
    "questionNumber": "Q12",
    "section": "Junior Science Olympiad",
    "markingScheme": "+3 / -1",
    "isCompetitive": true,
    "difficultyBand": "D1",
    "difficultyScore": 3,
    "difficultyBasis": "Cognitive demand score determined by 5-component QRT rubric.",
    "cognitiveComponents": {
      "concept_model_selection": 1,
      "representation_translation": 1,
      "reasoning_chain_length": 1,
      "algebra_computational_load": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "RETRIEVE",
    "role": "CORE2",
    "kind": "SINGLE_CHOICE",
    "stem": "In bordered pits of some plant cells, what is the central thickening formed on the pit membrane\nby circular deposition of microfibrils?",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) Margo"
      },
      {
        "id": "opt-B",
        "text": "(B) Torus"
      },
      {
        "id": "opt-C",
        "text": "(C) Zona occludens"
      },
      {
        "id": "opt-D",
        "text": "(D) Sclereid"
      }
    ],
    "hints": [
      "[H1 (Context & Setup): Identify governing principles.] 1. Conceptual Model: Bordered pits in gymnosperm tracheids facilitate intercellular water transport while guarding against cavitation.",
      "[H2 (Formulation & Analysis): Key relationship.] 2. Pit Membrane Ultra-structure: The pit membrane consists of a porous peripheral margo and an impermeable central thickened disc formed by circular deposition of microfibrils known as the torus.",
      "[H3 (Crux Resolution): Final calculation.] 3. Conclusion: The central circular microfibril thickening is the torus. Hence Option B."
    ],
    "steps": [
      "1. Conceptual Model: Bordered pits in gymnosperm tracheids facilitate intercellular water transport while guarding against cavitation.",
      "2. Pit Membrane Ultra-structure: The pit membrane consists of a porous peripheral margo and an impermeable central thickened disc formed by circular deposition of microfibrils known as the torus.",
      "3. Conclusion: The central circular microfibril thickening is the torus. Hence Option B."
    ],
    "check": "Adjudicated under IAPT 2023 examination standards.",
    "limitingCheck": "Adjudicated under IAPT 2023 examination standards.",
    "trapWarning": "Fault N09 Answer Isolation: Raw key withheld client-side; formative reasoning steps provided.",
    "correctKey": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "figures": [],
    "linkedCoreRoles": [
      "CORE1A",
      "CORE1B",
      "CORE2A",
      "CORE2B"
    ],
    "primaryCapabilityRef": "CAP-NSEJS-2023-B-Q12",
    "status": "RELEASED",
    "academicAdmission": "HOLD (Grade9 v4.1 Parity Candidate)",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "sourceOrigin": "NSEJS Custody (Grade9v4.1)"
  },
  {
    "id": "NSEJS-2023-B-Q13",
    "code": "NSEJS-2023-B-Q13",
    "title": "NSEJS 2023-24 \u00b7 Q13 \u00b7 REPRESENT \u00b7 D2 (Score 3)",
    "subjectCode": "BIO",
    "subject": "Biology",
    "topicCode": "LIVING_WORLD",
    "topic": "Cell Biology & Molecular Genetics",
    "subtopic": "Cell & Molecular Biology",
    "exam": "NSEJS",
    "year": 2024,
    "paper": "NSEJS Core 2",
    "questionNumber": "Q13",
    "section": "Junior Science Olympiad",
    "markingScheme": "+3 / -1",
    "isCompetitive": true,
    "difficultyBand": "D2",
    "difficultyScore": 3,
    "difficultyBasis": "Cognitive demand score determined by 5-component QRT rubric.",
    "cognitiveComponents": {
      "concept_model_selection": 1,
      "representation_translation": 1,
      "reasoning_chain_length": 1,
      "algebra_computational_load": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "REPRESENT",
    "role": "CORE2",
    "kind": "SINGLE_CHOICE",
    "stem": "The diagrams show different types of inflorescences. Select the pair that represents cymose\ninflorescences.",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) 2 and 4"
      },
      {
        "id": "opt-B",
        "text": "(B) 1 and 6"
      },
      {
        "id": "opt-C",
        "text": "(C) 1 and 3"
      },
      {
        "id": "opt-D",
        "text": "(D) 3 and 5"
      }
    ],
    "hints": [
      "[H1 (Context & Setup): Identify governing principles.] 1. Conceptual Model: Inflorescences are classified as racemose (indeterminate, main axis continues growing with acropetal floral order) or cymose (determinate, apical meristem terminates in a flower, subsequent branches develop basipetally/centrifugally).",
      "[H2 (Formulation & Analysis): Key relationship.] 2. Morphological Identification: Diagram 1 shows a monochasial cyme and Diagram 3 shows a dichasial cyme where the primary axis terminates in a floral bud.",
      "[H3 (Crux Resolution): Final calculation.] 3. Conclusion: The pair representing cymose inflorescences is 1 and 3. Hence Option C."
    ],
    "steps": [
      "1. Conceptual Model: Inflorescences are classified as racemose (indeterminate, main axis continues growing with acropetal floral order) or cymose (determinate, apical meristem terminates in a flower, subsequent branches develop basipetally/centrifugally).",
      "2. Morphological Identification: Diagram 1 shows a monochasial cyme and Diagram 3 shows a dichasial cyme where the primary axis terminates in a floral bud.",
      "3. Conclusion: The pair representing cymose inflorescences is 1 and 3. Hence Option C."
    ],
    "check": "Adjudicated under IAPT 2023 examination standards.",
    "limitingCheck": "Adjudicated under IAPT 2023 examination standards.",
    "trapWarning": "Fault N09 Answer Isolation: Raw key withheld client-side; formative reasoning steps provided.",
    "correctKey": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "figures": [],
    "linkedCoreRoles": [
      "CORE1A",
      "CORE1B",
      "CORE2A",
      "CORE2B"
    ],
    "primaryCapabilityRef": "CAP-NSEJS-2023-B-Q13",
    "status": "RELEASED",
    "academicAdmission": "HOLD (Grade9 v4.1 Parity Candidate)",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "sourceOrigin": "NSEJS Custody (Grade9v4.1)"
  },
  {
    "id": "NSEJS-2023-B-Q14",
    "code": "NSEJS-2023-B-Q14",
    "title": "NSEJS 2023-24 \u00b7 Q14 \u00b7 EXPLAIN \u00b7 D2 (Score 3)",
    "subjectCode": "BIO",
    "subject": "Biology",
    "topicCode": "GENETICS",
    "topic": "Reproduction & Mendelian Heredity",
    "subtopic": "Genetics & Evolution",
    "exam": "NSEJS",
    "year": 2024,
    "paper": "NSEJS Core 2",
    "questionNumber": "Q14",
    "section": "Junior Science Olympiad",
    "markingScheme": "+3 / -1",
    "isCompetitive": true,
    "difficultyBand": "D2",
    "difficultyScore": 3,
    "difficultyBasis": "Cognitive demand score determined by 5-component QRT rubric.",
    "cognitiveComponents": {
      "concept_model_selection": 1,
      "representation_translation": 1,
      "reasoning_chain_length": 1,
      "algebra_computational_load": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "EXPLAIN",
    "role": "CORE2",
    "kind": "SINGLE_CHOICE",
    "stem": "Genes normally important in mammalian embryogenesis include members of all the following\nclasses, except:",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) Proto-oncogenes"
      },
      {
        "id": "opt-B",
        "text": "(B) Growth-factor genes"
      },
      {
        "id": "opt-C",
        "text": "(C) Tumour-suppressor genes"
      },
      {
        "id": "opt-D",
        "text": "(D) Hox genes"
      }
    ],
    "hints": [
      "[H1 (Context & Setup): Identify governing principles.] 1. Conceptual Model: Embryogenesis requires coordinated spatial pattern formation, cellular proliferation, and inductive morphogenesis.",
      "[H2 (Formulation & Analysis): Key relationship.] 2. Gene Family Roles: Hox genes establish anteroposterior body patterning; growth-factor genes coordinate cell-cell signalling; proto-oncogenes promote active cell division and differentiation in embryonic tissues. In standard classical examination taxonomy, tumour-suppressor genes (primarily safeguarding genomic integrity and stopping cell cycle in mature tissues) were classified as non-inductive in early morphogenetic embryogenesis.",
      "[H3 (Crux Resolution): Final calculation.] 3. Conclusion: Tumour-suppressor genes are the designated exception. Hence Option C."
    ],
    "steps": [
      "1. Conceptual Model: Embryogenesis requires coordinated spatial pattern formation, cellular proliferation, and inductive morphogenesis.",
      "2. Gene Family Roles: Hox genes establish anteroposterior body patterning; growth-factor genes coordinate cell-cell signalling; proto-oncogenes promote active cell division and differentiation in embryonic tissues. In standard classical examination taxonomy, tumour-suppressor genes (primarily safeguarding genomic integrity and stopping cell cycle in mature tissues) were classified as non-inductive in early morphogenetic embryogenesis.",
      "3. Conclusion: Tumour-suppressor genes are the designated exception. Hence Option C."
    ],
    "check": "Adjudicated under IAPT 2023 examination standards.",
    "limitingCheck": "Adjudicated under IAPT 2023 examination standards.",
    "trapWarning": "Fault N09 Answer Isolation: Raw key withheld client-side; formative reasoning steps provided.",
    "correctKey": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "figures": [],
    "linkedCoreRoles": [
      "CORE1A",
      "CORE1B",
      "CORE2A",
      "CORE2B"
    ],
    "primaryCapabilityRef": "CAP-NSEJS-2023-B-Q14",
    "status": "RELEASED",
    "academicAdmission": "HOLD (Grade9 v4.1 Parity Candidate)",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "sourceOrigin": "NSEJS Custody (Grade9v4.1)"
  },
  {
    "id": "NSEJS-2023-B-Q15",
    "code": "NSEJS-2023-B-Q15",
    "title": "NSEJS 2023-24 \u00b7 Q15 \u00b7 EXPLAIN \u00b7 D2 (Score 3)",
    "subjectCode": "BIO",
    "subject": "Biology",
    "topicCode": "LIFE_PROCESSES",
    "topic": "Life Processes & Nephron Physiology",
    "subtopic": "Human Physiology",
    "exam": "NSEJS",
    "year": 2024,
    "paper": "NSEJS Core 2",
    "questionNumber": "Q15",
    "section": "Junior Science Olympiad",
    "markingScheme": "+3 / -1",
    "isCompetitive": true,
    "difficultyBand": "D2",
    "difficultyScore": 3,
    "difficultyBasis": "Cognitive demand score determined by 5-component QRT rubric.",
    "cognitiveComponents": {
      "concept_model_selection": 1,
      "representation_translation": 1,
      "reasoning_chain_length": 1,
      "algebra_computational_load": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "EXPLAIN",
    "role": "CORE2",
    "kind": "SINGLE_CHOICE",
    "stem": "In a type of carbon dioxide fixation, stomata remain open at night and CO2 first combines with\nphosphoenolpyruvate (PEP) to form four-carbon oxaloacetate. Which plant shows this ecological\nadaptation?",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) Cocos"
      },
      {
        "id": "opt-B",
        "text": "(B) Rhizophora"
      },
      {
        "id": "opt-C",
        "text": "(C) Aloe"
      },
      {
        "id": "opt-D",
        "text": "(D) Vallisneria"
      }
    ],
    "hints": [
      "[H1 (Context & Setup): Identify governing principles.] 1. Conceptual Model: Crassulacean Acid Metabolism (CAM) is an ecological adaptation to extreme aridity wherein stomata open nocturnally to minimize transpirational water loss.",
      "[H2 (Formulation & Analysis): Key relationship.] 2. Nocturnal Carboxylation: At night, atmospheric CO2 enters open stomata and is fixed by phosphoenolpyruvate (PEP) carboxylase into four-carbon oxaloacetate, then reduced to malate and stored in vacuoles.",
      "[H3 (Crux Resolution): Final calculation.] 3. Ecological Representative: Aloe is an obligate succulent CAM xerophyte exhibiting this nocturnal carboxylation strategy. Hence Option C."
    ],
    "steps": [
      "1. Conceptual Model: Crassulacean Acid Metabolism (CAM) is an ecological adaptation to extreme aridity wherein stomata open nocturnally to minimize transpirational water loss.",
      "2. Nocturnal Carboxylation: At night, atmospheric CO2 enters open stomata and is fixed by phosphoenolpyruvate (PEP) carboxylase into four-carbon oxaloacetate, then reduced to malate and stored in vacuoles.",
      "3. Ecological Representative: Aloe is an obligate succulent CAM xerophyte exhibiting this nocturnal carboxylation strategy. Hence Option C."
    ],
    "check": "Adjudicated under IAPT 2023 examination standards.",
    "limitingCheck": "Adjudicated under IAPT 2023 examination standards.",
    "trapWarning": "Fault N09 Answer Isolation: Raw key withheld client-side; formative reasoning steps provided.",
    "correctKey": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "figures": [],
    "linkedCoreRoles": [
      "CORE1A",
      "CORE1B",
      "CORE2A",
      "CORE2B"
    ],
    "primaryCapabilityRef": "CAP-NSEJS-2023-B-Q15",
    "status": "RELEASED",
    "academicAdmission": "HOLD (Grade9 v4.1 Parity Candidate)",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "sourceOrigin": "NSEJS Custody (Grade9v4.1)"
  },
  {
    "id": "NSEJS-2023-B-Q16",
    "code": "NSEJS-2023-B-Q16",
    "title": "NSEJS 2023-24 \u00b7 Q16 \u00b7 RETRIEVE \u00b7 D1 (Score 3)",
    "subjectCode": "BIO",
    "subject": "Biology",
    "topicCode": "ENVIRONMENT",
    "topic": "Ecology & Ecosystem Resources",
    "subtopic": "Ecology & Environment",
    "exam": "NSEJS",
    "year": 2024,
    "paper": "NSEJS Core 2",
    "questionNumber": "Q16",
    "section": "Junior Science Olympiad",
    "markingScheme": "+3 / -1",
    "isCompetitive": true,
    "difficultyBand": "D1",
    "difficultyScore": 3,
    "difficultyBasis": "Cognitive demand score determined by 5-component QRT rubric.",
    "cognitiveComponents": {
      "concept_model_selection": 1,
      "representation_translation": 1,
      "reasoning_chain_length": 1,
      "algebra_computational_load": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "RETRIEVE",
    "role": "CORE2",
    "kind": "SINGLE_CHOICE",
    "stem": "Which is the most common hemiparasitic mistletoe found in India?",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) Monotropa uniflora"
      },
      {
        "id": "opt-B",
        "text": "(B) Dendrophthoe falcata"
      },
      {
        "id": "opt-C",
        "text": "(C) Orobanche cernua"
      },
      {
        "id": "opt-D",
        "text": "(D) Cuscuta reflexa"
      }
    ],
    "hints": [
      "[H1 (Context & Setup): Identify governing principles.] 1. Conceptual Model: Hemiparasitic plants possess functional chlorophyll and conduct photosynthesis but depend on host vascular xylem for water and inorganic mineral nutrients via specialized haustoria.",
      "[H2 (Formulation & Analysis): Key relationship.] 2. Botanical Identification: Dendrophthoe falcata (family Loranthaceae) is the most widespread indigenous Indian mistletoe infesting broadleaf tree species (e.g. mango, neem).",
      "[H3 (Crux Resolution): Final calculation.] 3. Conclusion: Dendrophthoe falcata. Hence Option B."
    ],
    "steps": [
      "1. Conceptual Model: Hemiparasitic plants possess functional chlorophyll and conduct photosynthesis but depend on host vascular xylem for water and inorganic mineral nutrients via specialized haustoria.",
      "2. Botanical Identification: Dendrophthoe falcata (family Loranthaceae) is the most widespread indigenous Indian mistletoe infesting broadleaf tree species (e.g. mango, neem).",
      "3. Conclusion: Dendrophthoe falcata. Hence Option B."
    ],
    "check": "Adjudicated under IAPT 2023 examination standards.",
    "limitingCheck": "Adjudicated under IAPT 2023 examination standards.",
    "trapWarning": "Fault N09 Answer Isolation: Raw key withheld client-side; formative reasoning steps provided.",
    "correctKey": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "figures": [],
    "linkedCoreRoles": [
      "CORE1A",
      "CORE1B",
      "CORE2A",
      "CORE2B"
    ],
    "primaryCapabilityRef": "CAP-NSEJS-2023-B-Q16",
    "status": "RELEASED",
    "academicAdmission": "HOLD (Grade9 v4.1 Parity Candidate)",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "sourceOrigin": "NSEJS Custody (Grade9v4.1)"
  },
  {
    "id": "NSEJS-2023-B-Q49",
    "code": "NSEJS-2023-B-Q49",
    "title": "NSEJS 2023-24 \u00b7 Q49 \u00b7 MODEL \u00b7 D2 (Score 6)",
    "subjectCode": "BIO",
    "subject": "Biology",
    "topicCode": "LIVING_WORLD",
    "topic": "Cell Biology & Molecular Genetics",
    "subtopic": "Cell & Molecular Biology",
    "exam": "NSEJS",
    "year": 2024,
    "paper": "NSEJS Core 2",
    "questionNumber": "Q49",
    "section": "Junior Science Olympiad",
    "markingScheme": "+3 / -1",
    "isCompetitive": true,
    "difficultyBand": "D2",
    "difficultyScore": 6,
    "difficultyBasis": "Cognitive demand score determined by 5-component QRT rubric.",
    "cognitiveComponents": {
      "concept_model_selection": 1,
      "representation_translation": 1,
      "reasoning_chain_length": 1,
      "algebra_computational_load": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "MODEL",
    "role": "CORE2",
    "kind": "SINGLE_CHOICE",
    "stem": "The table matches mammalian orders or examples with characteristics.\nOrder / example Characteristic\n1. Lagomorpha (i) First finger clawed; tail enclosed in an interfemoral membrane\n2. Microchiroptera (ii) Toothless and polyembryony\n3. Armadillo (iii) Baleen\n4. Proboscidea (iv) Incisors open-rooted and growing throughout life\nWhich matches are correct?",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) 1 \u2192 (iv)"
      },
      {
        "id": "opt-B",
        "text": "(B) 2 \u2192 (i)"
      },
      {
        "id": "opt-C",
        "text": "(C) 3 \u2192 (ii)"
      },
      {
        "id": "opt-D",
        "text": "(D) 4 \u2192 (iii)"
      }
    ],
    "hints": [
      "[H1 (Context & Setup): Identify governing principles.] 1. Conceptual Model: Mammalian orders possess diagnostic skeletal, dental, and embryological synapomorphies.",
      "[H2 (Formulation & Analysis): Key relationship.] 2. Systematic Evaluation of Options:",
      "[H3 (Crux Resolution): Final calculation.]   - (a) Lagomorpha (rabbits, hares) have rootless, open-rooted chisel-like incisors that grow continuously throughout life. Thus 1 -> (iv) is correct."
    ],
    "steps": [
      "1. Conceptual Model: Mammalian orders possess diagnostic skeletal, dental, and embryological synapomorphies.",
      "2. Systematic Evaluation of Options:",
      "  - (a) Lagomorpha (rabbits, hares) have rootless, open-rooted chisel-like incisors that grow continuously throughout life. Thus 1 -> (iv) is correct.",
      "  - (b) Microchiroptera (echolocating bats) possess a clawed first digit (thumb) and a uropatagium (interfemoral membrane enclosing the tail). Thus 2 -> (i) is correct.",
      "  - (c) Armadillos show obligate monozygotic polyembryony, but are not toothless (they possess peg-like homodont molars). Thus 3 -> (ii) is incorrect.",
      "  - (d) Baleen is exclusive to mysticete cetacean baleen whales, not proboscideans (elephants). Thus 4 -> (iii) is incorrect.",
      "3. Synthesis: Correct diagnostic matches are (a) and (b)."
    ],
    "check": "Adjudicated under IAPT 2023 examination standards.",
    "limitingCheck": "Adjudicated under IAPT 2023 examination standards.",
    "trapWarning": "Fault N09 Answer Isolation: Raw key withheld client-side; formative reasoning steps provided.",
    "correctKey": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "figures": [],
    "linkedCoreRoles": [
      "CORE1A",
      "CORE1B",
      "CORE2A",
      "CORE2B"
    ],
    "primaryCapabilityRef": "CAP-NSEJS-2023-B-Q49",
    "status": "RELEASED",
    "academicAdmission": "HOLD (Grade9 v4.1 Parity Candidate)",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "sourceOrigin": "NSEJS Custody (Grade9v4.1)"
  },
  {
    "id": "NSEJS-2023-B-Q50",
    "code": "NSEJS-2023-B-Q50",
    "title": "NSEJS 2023-24 \u00b7 Q50 \u00b7 RETRIEVE \u00b7 D2 (Score 6)",
    "subjectCode": "BIO",
    "subject": "Biology",
    "topicCode": "GENETICS",
    "topic": "Reproduction & Mendelian Heredity",
    "subtopic": "Genetics & Evolution",
    "exam": "NSEJS",
    "year": 2024,
    "paper": "NSEJS Core 2",
    "questionNumber": "Q50",
    "section": "Junior Science Olympiad",
    "markingScheme": "+3 / -1",
    "isCompetitive": true,
    "difficultyBand": "D2",
    "difficultyScore": 6,
    "difficultyBasis": "Cognitive demand score determined by 5-component QRT rubric.",
    "cognitiveComponents": {
      "concept_model_selection": 1,
      "representation_translation": 1,
      "reasoning_chain_length": 1,
      "algebra_computational_load": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "RETRIEVE",
    "role": "CORE2",
    "kind": "SINGLE_CHOICE",
    "stem": "Which historical pedigrees were described as families of beggars and scoundrels?",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) Bach family of Germany"
      },
      {
        "id": "opt-B",
        "text": "(B) Zero family of Switzerland"
      },
      {
        "id": "opt-C",
        "text": "(C) Kallikaks of America"
      },
      {
        "id": "opt-D",
        "text": "(D) Jukes of New York"
      }
    ],
    "hints": [
      "[H1 (Context & Setup): Identify governing principles.] 1. Historical Context: Nineteenth and early twentieth-century human pedigree studies documented familial lineages in literature that has since been contextualised historically.",
      "[H2 (Formulation & Analysis): Key relationship.] 2. Literature Analysis:",
      "[H3 (Crux Resolution): Final calculation.]   - (b) The Zero family of Switzerland was documented in classical genealogical records."
    ],
    "steps": [
      "1. Historical Context: Nineteenth and early twentieth-century human pedigree studies documented familial lineages in literature that has since been contextualised historically.",
      "2. Literature Analysis:",
      "  - (b) The Zero family of Switzerland was documented in classical genealogical records.",
      "  - (d) The Jukes family of New York was described by Richard Dugdale (1877) under the specific vernacular quoted in the problem stem.",
      "3. Conclusion: The pedigrees corresponding to the quoted historical terminology are the Zero family and the Jukes family. Hence Options B and D."
    ],
    "check": "Adjudicated under IAPT 2023 examination standards.",
    "limitingCheck": "Adjudicated under IAPT 2023 examination standards.",
    "trapWarning": "Fault N09 Answer Isolation: Raw key withheld client-side; formative reasoning steps provided.",
    "correctKey": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "figures": [],
    "linkedCoreRoles": [
      "CORE1A",
      "CORE1B",
      "CORE2A",
      "CORE2B"
    ],
    "primaryCapabilityRef": "CAP-NSEJS-2023-B-Q50",
    "status": "RELEASED",
    "academicAdmission": "HOLD (Grade9 v4.1 Parity Candidate)",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "sourceOrigin": "NSEJS Custody (Grade9v4.1)"
  },
  {
    "id": "NSEJS-2023-B-Q51",
    "code": "NSEJS-2023-B-Q51",
    "title": "NSEJS 2023-24 \u00b7 Q51 \u00b7 SYNTHESIZE \u00b7 D2 (Score 6)",
    "subjectCode": "BIO",
    "subject": "Biology",
    "topicCode": "COORDINATION",
    "topic": "Control & Endocrine Coordination / Immunology",
    "subtopic": "Systems & Regulation",
    "exam": "NSEJS",
    "year": 2024,
    "paper": "NSEJS Core 2",
    "questionNumber": "Q51",
    "section": "Junior Science Olympiad",
    "markingScheme": "+3 / -1",
    "isCompetitive": true,
    "difficultyBand": "D2",
    "difficultyScore": 6,
    "difficultyBasis": "Cognitive demand score determined by 5-component QRT rubric.",
    "cognitiveComponents": {
      "concept_model_selection": 1,
      "representation_translation": 1,
      "reasoning_chain_length": 1,
      "algebra_computational_load": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "SYNTHESIZE",
    "role": "CORE2",
    "kind": "SINGLE_CHOICE",
    "stem": "Which statements explain root gravitropism?",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) A: Statoliths in root-cap columella cells sediment in the direction of gravity and generate a signal for\nasymmetric growth."
      },
      {
        "id": "opt-B",
        "text": "(B) B: Auxin influx and efflux carriers create a differential auxin gradient between the upper and lower\nsides, producing unequal growth and root curvature."
      },
      {
        "id": "opt-C",
        "text": "(C) C: Curvature in gravity-stimulated roots can be explained by lateral redistribution of an inhibitor\nformed in the root cap."
      },
      {
        "id": "opt-D",
        "text": "(D) Proplastids containing carotenoids and protochlorophyll respond to gravity."
      }
    ],
    "hints": [
      "[H1 (Context & Setup): Identify governing principles.] 1. Conceptual Model: Plant root positive gravitropism involves graviperception, biochemical signal transduction, and asymmetric differential cell elongation.",
      "[H2 (Formulation & Analysis): Key relationship.] 2. Mechanistic Evaluation of Statements:",
      "[H3 (Crux Resolution): Final calculation.]   - Statement A is correct: Dense starch-rich amyloplast statoliths in columella cells sediment downward under gravity, triggering calcium and auxin signalling."
    ],
    "steps": [
      "1. Conceptual Model: Plant root positive gravitropism involves graviperception, biochemical signal transduction, and asymmetric differential cell elongation.",
      "2. Mechanistic Evaluation of Statements:",
      "  - Statement A is correct: Dense starch-rich amyloplast statoliths in columella cells sediment downward under gravity, triggering calcium and auxin signalling.",
      "  - Statement B is correct: Coordinated PIN and AUX/LAX auxin carrier relocalization establishes an asymmetric lateral auxin gradient across upper and lower tiers; in roots, supra-optimal auxin inhibits elongation on the lower side causing downward curvature.",
      "  - Statement C is correct: Classic physiological models (e.g. Torrey, Wilkins) hypothesized lateral redistribution of a root-cap growth inhibitor (e.g. abscisic acid or supraoptimal auxin).",
      "  - Statement D is incorrect: Graviperception statoliths are dense amyloplasts containing starch grains, not proplastids with carotenoids and protochlorophyll.",
      "3. Synthesis: Statements A, B, and C are scientifically valid representations of the gravitropic response. Hence Options A, B, C."
    ],
    "check": "Adjudicated under IAPT 2023 examination standards.",
    "limitingCheck": "Adjudicated under IAPT 2023 examination standards.",
    "trapWarning": "Fault N09 Answer Isolation: Raw key withheld client-side; formative reasoning steps provided.",
    "correctKey": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "figures": [],
    "linkedCoreRoles": [
      "CORE1A",
      "CORE1B",
      "CORE2A",
      "CORE2B"
    ],
    "primaryCapabilityRef": "CAP-NSEJS-2023-B-Q51",
    "status": "RELEASED",
    "academicAdmission": "HOLD (Grade9 v4.1 Parity Candidate)",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "sourceOrigin": "NSEJS Custody (Grade9v4.1)"
  },
  {
    "id": "NSEJS-2023-B-Q52",
    "code": "NSEJS-2023-B-Q52",
    "title": "NSEJS 2023-24 \u00b7 Q52 \u00b7 EXPLAIN \u00b7 D2 (Score 6)",
    "subjectCode": "BIO",
    "subject": "Biology",
    "topicCode": "LIFE_PROCESSES",
    "topic": "Life Processes & Nephron Physiology",
    "subtopic": "Human Physiology",
    "exam": "NSEJS",
    "year": 2024,
    "paper": "NSEJS Core 2",
    "questionNumber": "Q52",
    "section": "Junior Science Olympiad",
    "markingScheme": "+3 / -1",
    "isCompetitive": true,
    "difficultyBand": "D2",
    "difficultyScore": 6,
    "difficultyBasis": "Cognitive demand score determined by 5-component QRT rubric.",
    "cognitiveComponents": {
      "concept_model_selection": 1,
      "representation_translation": 1,
      "reasoning_chain_length": 1,
      "algebra_computational_load": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "EXPLAIN",
    "role": "CORE2",
    "kind": "SINGLE_CHOICE",
    "stem": "Which statements describe cyclic photophosphorylation in green plants?",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) Photosystem II is not involved."
      },
      {
        "id": "opt-B",
        "text": "(B) Only ATP is generated; reducing power such as NADPH/NADH is not produced."
      },
      {
        "id": "opt-C",
        "text": "(C) Water is required."
      },
      {
        "id": "opt-D",
        "text": "(D) P680 is the active reaction centre."
      }
    ],
    "hints": [
      "[H1 (Context & Setup): Identify governing principles.] 1. Conceptual Model: Cyclic photophosphorylation operates when the cell demands ATP without concomitant generation of reducing equivalents (NADPH).",
      "[H2 (Formulation & Analysis): Key relationship.] 2. Mechanistic Verification of Characteristics:",
      "[H3 (Crux Resolution): Final calculation.]   - Statement A is correct: The pathway is confined entirely to Photosystem I (PSI) located in non-appressed stroma thylakoids; PSII is not involved."
    ],
    "steps": [
      "1. Conceptual Model: Cyclic photophosphorylation operates when the cell demands ATP without concomitant generation of reducing equivalents (NADPH).",
      "2. Mechanistic Verification of Characteristics:",
      "  - Statement A is correct: The pathway is confined entirely to Photosystem I (PSI) located in non-appressed stroma thylakoids; PSII is not involved.",
      "  - Statement B is correct: Excited electrons cycle from P700 through ferredoxin, cytochrome b6f, and plastocyanin back to P700, creating a proton gradient for ATP synthase without reducing NADP+ to NADPH.",
      "  - Statement C is incorrect: Photolysis of water does not occur in cyclic flow; water is split exclusively by the oxygen-evolving complex of PSII in non-cyclic flow.",
      "  - Statement D is incorrect: The reaction centre is P700 (chlorophyll a dimer of PSI), not P680 (PSII).",
      "3. Synthesis: Valid descriptors of cyclic photophosphorylation are A and B. Hence Options A, B."
    ],
    "check": "Adjudicated under IAPT 2023 examination standards.",
    "limitingCheck": "Adjudicated under IAPT 2023 examination standards.",
    "trapWarning": "Fault N09 Answer Isolation: Raw key withheld client-side; formative reasoning steps provided.",
    "correctKey": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "figures": [],
    "linkedCoreRoles": [
      "CORE1A",
      "CORE1B",
      "CORE2A",
      "CORE2B"
    ],
    "primaryCapabilityRef": "CAP-NSEJS-2023-B-Q52",
    "status": "RELEASED",
    "academicAdmission": "HOLD (Grade9 v4.1 Parity Candidate)",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "sourceOrigin": "NSEJS Custody (Grade9v4.1)"
  },
  {
    "id": "NSEJS-2022-B-Q01",
    "code": "NSEJS-2022-B-Q01",
    "title": "NSEJS 2022-23 \u00b7 Q01 \u00b7 RETRIEVE \u00b7 D1 (Score 3)",
    "subjectCode": "BIO",
    "subject": "Biology",
    "topicCode": "COORDINATION",
    "topic": "Control & Endocrine Coordination / Immunology",
    "subtopic": "Systems & Regulation",
    "exam": "NSEJS",
    "year": 2024,
    "paper": "NSEJS Core 2",
    "questionNumber": "Q01",
    "section": "Junior Science Olympiad",
    "markingScheme": "+3 / -1",
    "isCompetitive": true,
    "difficultyBand": "D1",
    "difficultyScore": 3,
    "difficultyBasis": "Cognitive demand score determined by 5-component QRT rubric.",
    "cognitiveComponents": {
      "concept_model_selection": 1,
      "representation_translation": 1,
      "reasoning_chain_length": 1,
      "algebra_computational_load": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "RETRIEVE",
    "role": "CORE2",
    "kind": "SINGLE_CHOICE",
    "stem": "In the nineteenth century, farmers in Japan found that some rice seedlings became very\ntall. They called it Bakanae disease or mad-seedling disease. The affected plants were\ninfected by the fungus Fusarium moniliforme. This led to the discovery of a\nphytohormone, later named:",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) Vernalin"
      },
      {
        "id": "opt-B",
        "text": "(B) Auxin"
      },
      {
        "id": "opt-C",
        "text": "(C) Florigen"
      },
      {
        "id": "opt-D",
        "text": "(D) Gibberellin"
      }
    ],
    "hints": [
      "[H1 (Context & Setup): Identify governing principles.] 1. Conceptual Model: Phytohormones regulate plant cell division, elongation, and organ development.",
      "[H2 (Formulation & Analysis): Key relationship.] 2. Historical Discovery: In late 19th and early 20th century Japan, rice seedlings exhibiting abnormal excessive stem elongation (Bakanae or foolish seedling disease) were found infected with the ascomycete fungus Fusarium moniliforme (Gibberella fujikuroi). The active elongation factor isolated by E. Kurosawa was named gibberellin.",
      "[H3 (Crux Resolution): Final calculation.] 3. Conclusion: The phytohormone discovered from Bakanae disease is Gibberellin. Hence Option D."
    ],
    "steps": [
      "1. Conceptual Model: Phytohormones regulate plant cell division, elongation, and organ development.",
      "2. Historical Discovery: In late 19th and early 20th century Japan, rice seedlings exhibiting abnormal excessive stem elongation (Bakanae or foolish seedling disease) were found infected with the ascomycete fungus Fusarium moniliforme (Gibberella fujikuroi). The active elongation factor isolated by E. Kurosawa was named gibberellin.",
      "3. Conclusion: The phytohormone discovered from Bakanae disease is Gibberellin. Hence Option D."
    ],
    "check": "Adjudicated under IAPT 2022 examination standards.",
    "limitingCheck": "Adjudicated under IAPT 2022 examination standards.",
    "trapWarning": "Fault N09 Answer Isolation: Raw key withheld client-side; formative reasoning steps provided.",
    "correctKey": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "figures": [],
    "linkedCoreRoles": [
      "CORE1A",
      "CORE1B",
      "CORE2A",
      "CORE2B"
    ],
    "primaryCapabilityRef": "CAP-NSEJS-2022-B-Q01",
    "status": "RELEASED",
    "academicAdmission": "HOLD (Grade9 v4.1 Parity Candidate)",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "sourceOrigin": "NSEJS Custody (Grade9v4.1)"
  },
  {
    "id": "NSEJS-2022-B-Q02",
    "code": "NSEJS-2022-B-Q02",
    "title": "NSEJS 2022-23 \u00b7 Q02 \u00b7 MODEL \u00b7 D2 (Score 3)",
    "subjectCode": "BIO",
    "subject": "Biology",
    "topicCode": "LIVING_WORLD",
    "topic": "Cell Biology & Molecular Genetics",
    "subtopic": "Cell & Molecular Biology",
    "exam": "NSEJS",
    "year": 2024,
    "paper": "NSEJS Core 2",
    "questionNumber": "Q02",
    "section": "Junior Science Olympiad",
    "markingScheme": "+3 / -1",
    "isCompetitive": true,
    "difficultyBand": "D2",
    "difficultyScore": 3,
    "difficultyBasis": "Cognitive demand score determined by 5-component QRT rubric.",
    "cognitiveComponents": {
      "concept_model_selection": 1,
      "representation_translation": 1,
      "reasoning_chain_length": 1,
      "algebra_computational_load": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "MODEL",
    "role": "CORE2",
    "kind": "SINGLE_CHOICE",
    "stem": "In most angiosperms, pollen germinates on the stigma, travels through the style and\nultimately enters the ovule. In the adjacent diagram, three possibilities of pollen-tube\nentry are marked A, B and C. What do A, B and C represent?",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) A - Mesogamy, B - Chalazogamy and C - Porogamy"
      },
      {
        "id": "opt-B",
        "text": "(B) A - Porogamy, B - Chalazogamy and C - Mesogamy"
      },
      {
        "id": "opt-C",
        "text": "(C) A - Chalazogamy, B - Mesogamy and C - Porogamy"
      },
      {
        "id": "opt-D",
        "text": "(D) A and B - Porogamy, C - Chalazogamy"
      }
    ],
    "hints": [
      "[H1 (Context & Setup): Identify governing principles.] 1. Conceptual Model: In angiosperms, pollen tubes enter the ovule to deliver sperm cells to the embryo sac via specific anatomical conduits.",
      "[H2 (Formulation & Analysis): Key relationship.] 2. Anatomical Entry Classification:",
      "[H3 (Crux Resolution): Final calculation.]   - Porogamy: Entry directly through the apical micropyle (Route A)."
    ],
    "steps": [
      "1. Conceptual Model: In angiosperms, pollen tubes enter the ovule to deliver sperm cells to the embryo sac via specific anatomical conduits.",
      "2. Anatomical Entry Classification:",
      "  - Porogamy: Entry directly through the apical micropyle (Route A).",
      "  - Chalazogamy: Entry through the basal chalazal tissue (Route B).",
      "  - Mesogamy: Entry through the lateral ovular integuments or funicle (Route C).",
      "3. Conclusion: A represents Porogamy, B represents Chalazogamy, and C represents Mesogamy. Hence Option B."
    ],
    "check": "Adjudicated under IAPT 2022 examination standards.",
    "limitingCheck": "Adjudicated under IAPT 2022 examination standards.",
    "trapWarning": "Fault N09 Answer Isolation: Raw key withheld client-side; formative reasoning steps provided.",
    "correctKey": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "figures": [],
    "linkedCoreRoles": [
      "CORE1A",
      "CORE1B",
      "CORE2A",
      "CORE2B"
    ],
    "primaryCapabilityRef": "CAP-NSEJS-2022-B-Q02",
    "status": "RELEASED",
    "academicAdmission": "HOLD (Grade9 v4.1 Parity Candidate)",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "sourceOrigin": "NSEJS Custody (Grade9v4.1)"
  },
  {
    "id": "NSEJS-2022-B-Q03",
    "code": "NSEJS-2022-B-Q03",
    "title": "NSEJS 2022-23 \u00b7 Q03 \u00b7 EXPLAIN \u00b7 D2 (Score 3)",
    "subjectCode": "BIO",
    "subject": "Biology",
    "topicCode": "LIVING_WORLD",
    "topic": "Cell Biology & Molecular Genetics",
    "subtopic": "Cell & Molecular Biology",
    "exam": "NSEJS",
    "year": 2024,
    "paper": "NSEJS Core 2",
    "questionNumber": "Q03",
    "section": "Junior Science Olympiad",
    "markingScheme": "+3 / -1",
    "isCompetitive": true,
    "difficultyBand": "D2",
    "difficultyScore": 3,
    "difficultyBasis": "Cognitive demand score determined by 5-component QRT rubric.",
    "cognitiveComponents": {
      "concept_model_selection": 1,
      "representation_translation": 1,
      "reasoning_chain_length": 1,
      "algebra_computational_load": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "EXPLAIN",
    "role": "CORE2",
    "kind": "SINGLE_CHOICE",
    "stem": "Members of Cucurbitaceae, such as bottle-gourd, pumpkin, watermelon and muskmelon,\nbear large fruits although their stems may be only finger-thick. What helps a large\nquantity of food to be translocated from leaves to fruits for storage?",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) Intraxylary phloem"
      },
      {
        "id": "opt-B",
        "text": "(B) Sieve-tubes with companion cells"
      },
      {
        "id": "opt-C",
        "text": "(C) Bicollateral vascular bundles"
      },
      {
        "id": "opt-D",
        "text": "(D) Trichomes on internodes"
      }
    ],
    "hints": [
      "[H1 (Context & Setup): Identify governing principles.] 1. Conceptual Model: Long-distance translocation of photosynthetic assimilates requires robust, specialized vascular bundles.",
      "[H2 (Formulation & Analysis): Key relationship.] 2. Bundle Morphology in Cucurbits: Members of Cucurbitaceae develop bicollateral vascular bundles featuring central xylem bordered by both outer and inner phloem strands separated by strips of cambium. This dual phloem arrangement provides double the conducting cross-sectional area to supply assimilates to rapidly enlarging fruits through slender stems.",
      "[H3 (Crux Resolution): Final calculation.] 3. Conclusion: Translocation is facilitated by bicollateral vascular bundles. Hence Option C."
    ],
    "steps": [
      "1. Conceptual Model: Long-distance translocation of photosynthetic assimilates requires robust, specialized vascular bundles.",
      "2. Bundle Morphology in Cucurbits: Members of Cucurbitaceae develop bicollateral vascular bundles featuring central xylem bordered by both outer and inner phloem strands separated by strips of cambium. This dual phloem arrangement provides double the conducting cross-sectional area to supply assimilates to rapidly enlarging fruits through slender stems.",
      "3. Conclusion: Translocation is facilitated by bicollateral vascular bundles. Hence Option C."
    ],
    "check": "Adjudicated under IAPT 2022 examination standards.",
    "limitingCheck": "Adjudicated under IAPT 2022 examination standards.",
    "trapWarning": "Fault N09 Answer Isolation: Raw key withheld client-side; formative reasoning steps provided.",
    "correctKey": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "figures": [],
    "linkedCoreRoles": [
      "CORE1A",
      "CORE1B",
      "CORE2A",
      "CORE2B"
    ],
    "primaryCapabilityRef": "CAP-NSEJS-2022-B-Q03",
    "status": "RELEASED",
    "academicAdmission": "HOLD (Grade9 v4.1 Parity Candidate)",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "sourceOrigin": "NSEJS Custody (Grade9v4.1)"
  },
  {
    "id": "NSEJS-2022-B-Q04",
    "code": "NSEJS-2022-B-Q04",
    "title": "NSEJS 2022-23 \u00b7 Q04 \u00b7 APPLY \u00b7 D2 (Score 3)",
    "subjectCode": "BIO",
    "subject": "Biology",
    "topicCode": "GENETICS",
    "topic": "Reproduction & Mendelian Heredity",
    "subtopic": "Genetics & Evolution",
    "exam": "NSEJS",
    "year": 2024,
    "paper": "NSEJS Core 2",
    "questionNumber": "Q04",
    "section": "Junior Science Olympiad",
    "markingScheme": "+3 / -1",
    "isCompetitive": true,
    "difficultyBand": "D2",
    "difficultyScore": 3,
    "difficultyBasis": "Cognitive demand score determined by 5-component QRT rubric.",
    "cognitiveComponents": {
      "concept_model_selection": 1,
      "representation_translation": 1,
      "reasoning_chain_length": 1,
      "algebra_computational_load": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "APPLY",
    "role": "CORE2",
    "kind": "SINGLE_CHOICE",
    "stem": "In some birds, a black bird crossed with a white-feathered bird produces all\nblue-plumaged chicks. If these blue birds are selfed, the offspring ratio will be:",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) 1 black : 1 white : 2 blue"
      },
      {
        "id": "opt-B",
        "text": "(B) 9 blue : 3 black : 3 white"
      },
      {
        "id": "opt-C",
        "text": "(C) 1 blue : 1 black : 1 white"
      },
      {
        "id": "opt-D",
        "text": "(D) 3 blue : 1 white"
      }
    ],
    "hints": [
      "[H1 (Context & Setup): Identify governing principles.] 1. Conceptual Model: Incomplete dominance produces an intermediate heterozygous phenotype distinct from either homozygous parental phenotype.",
      "[H2 (Formulation & Analysis): Key relationship.] 2. Genotypic Analysis in Andalusian Fowl: Let homozygous black be BB and homozygous white be bb. Crossing BB x bb produces 100% heterozygous blue progeny (Bb).",
      "[H3 (Crux Resolution): Final calculation.] 3. Selfing Cross: When these blue birds are intercrossed (Bb x Bb), Mendelian segregation yields 1/4 BB (black) : 1/2 Bb (blue) : 1/4 bb (white), which is a phenotypic ratio of 1 black : 1 white : 2 blue."
    ],
    "steps": [
      "1. Conceptual Model: Incomplete dominance produces an intermediate heterozygous phenotype distinct from either homozygous parental phenotype.",
      "2. Genotypic Analysis in Andalusian Fowl: Let homozygous black be BB and homozygous white be bb. Crossing BB x bb produces 100% heterozygous blue progeny (Bb).",
      "3. Selfing Cross: When these blue birds are intercrossed (Bb x Bb), Mendelian segregation yields 1/4 BB (black) : 1/2 Bb (blue) : 1/4 bb (white), which is a phenotypic ratio of 1 black : 1 white : 2 blue.",
      "4. Conclusion: The offspring ratio is 1 black : 1 white : 2 blue. Hence Option A."
    ],
    "check": "Adjudicated under IAPT 2022 examination standards.",
    "limitingCheck": "Adjudicated under IAPT 2022 examination standards.",
    "trapWarning": "Fault N09 Answer Isolation: Raw key withheld client-side; formative reasoning steps provided.",
    "correctKey": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "figures": [],
    "linkedCoreRoles": [
      "CORE1A",
      "CORE1B",
      "CORE2A",
      "CORE2B"
    ],
    "primaryCapabilityRef": "CAP-NSEJS-2022-B-Q04",
    "status": "RELEASED",
    "academicAdmission": "HOLD (Grade9 v4.1 Parity Candidate)",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "sourceOrigin": "NSEJS Custody (Grade9v4.1)"
  },
  {
    "id": "NSEJS-2022-B-Q05",
    "code": "NSEJS-2022-B-Q05",
    "title": "NSEJS 2022-23 \u00b7 Q05 \u00b7 REPRESENT \u00b7 D2 (Score 3)",
    "subjectCode": "BIO",
    "subject": "Biology",
    "topicCode": "LIFE_PROCESSES",
    "topic": "Life Processes & Nephron Physiology",
    "subtopic": "Human Physiology",
    "exam": "NSEJS",
    "year": 2024,
    "paper": "NSEJS Core 2",
    "questionNumber": "Q05",
    "section": "Junior Science Olympiad",
    "markingScheme": "+3 / -1",
    "isCompetitive": true,
    "difficultyBand": "D2",
    "difficultyScore": 3,
    "difficultyBasis": "Cognitive demand score determined by 5-component QRT rubric.",
    "cognitiveComponents": {
      "concept_model_selection": 1,
      "representation_translation": 1,
      "reasoning_chain_length": 1,
      "algebra_computational_load": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "REPRESENT",
    "role": "CORE2",
    "kind": "SINGLE_CHOICE",
    "stem": "The diagram shows chromatographic separation of pigments extracted from spinach\nleaves. The sequence of pigment bands from below upwards is:",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) Chlorophyll b, Chlorophyll a, Carotenols and Carotenes"
      },
      {
        "id": "opt-B",
        "text": "(B) Carotenes, Carotenols, Chlorophyll a and Chlorophyll b"
      },
      {
        "id": "opt-C",
        "text": "(C) Chlorophyll a, Chlorophyll b, Carotenes and Carotenols"
      },
      {
        "id": "opt-D",
        "text": "(D) Carotenols, Phycobilins, Chlorophyll a and Chlorophyll b"
      }
    ],
    "hints": [
      "[H1 (Context & Setup): Identify governing principles.] 1. Conceptual Model: Paper chromatography separates leaf photosynthetic pigments based on differential partition coefficients between cellulose paper (stationary phase) and organic developing solvents (mobile phase).",
      "[H2 (Formulation & Analysis): Key relationship.] 2. Migration Order from Origin: Pigments with highest polarity and paper affinity migrate slowest and remain closest to the baseline, whereas non-polar hydrocarbons travel closest to the solvent front. Moving from below upwards: Chlorophyll b (yellow-green, lowest Rf) -> Chlorophyll a (blue-green) -> Xanthophylls/Carotenols (yellow) -> Carotenes (orange-yellow, highest Rf).",
      "[H3 (Crux Resolution): Final calculation.] 3. Conclusion: The sequence from below upwards is Chlorophyll b, Chlorophyll a, Carotenols, and Carotenes. Hence Option A."
    ],
    "steps": [
      "1. Conceptual Model: Paper chromatography separates leaf photosynthetic pigments based on differential partition coefficients between cellulose paper (stationary phase) and organic developing solvents (mobile phase).",
      "2. Migration Order from Origin: Pigments with highest polarity and paper affinity migrate slowest and remain closest to the baseline, whereas non-polar hydrocarbons travel closest to the solvent front. Moving from below upwards: Chlorophyll b (yellow-green, lowest Rf) -> Chlorophyll a (blue-green) -> Xanthophylls/Carotenols (yellow) -> Carotenes (orange-yellow, highest Rf).",
      "3. Conclusion: The sequence from below upwards is Chlorophyll b, Chlorophyll a, Carotenols, and Carotenes. Hence Option A."
    ],
    "check": "Adjudicated under IAPT 2022 examination standards.",
    "limitingCheck": "Adjudicated under IAPT 2022 examination standards.",
    "trapWarning": "Fault N09 Answer Isolation: Raw key withheld client-side; formative reasoning steps provided.",
    "correctKey": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "figures": [],
    "linkedCoreRoles": [
      "CORE1A",
      "CORE1B",
      "CORE2A",
      "CORE2B"
    ],
    "primaryCapabilityRef": "CAP-NSEJS-2022-B-Q05",
    "status": "RELEASED",
    "academicAdmission": "HOLD (Grade9 v4.1 Parity Candidate)",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "sourceOrigin": "NSEJS Custody (Grade9v4.1)"
  },
  {
    "id": "NSEJS-2022-B-Q06",
    "code": "NSEJS-2022-B-Q06",
    "title": "NSEJS 2022-23 \u00b7 Q06 \u00b7 RETRIEVE \u00b7 D1 (Score 3)",
    "subjectCode": "BIO",
    "subject": "Biology",
    "topicCode": "LIVING_WORLD",
    "topic": "Cell Biology & Molecular Genetics",
    "subtopic": "Cell & Molecular Biology",
    "exam": "NSEJS",
    "year": 2024,
    "paper": "NSEJS Core 2",
    "questionNumber": "Q06",
    "section": "Junior Science Olympiad",
    "markingScheme": "+3 / -1",
    "isCompetitive": true,
    "difficultyBand": "D1",
    "difficultyScore": 3,
    "difficultyBasis": "Cognitive demand score determined by 5-component QRT rubric.",
    "cognitiveComponents": {
      "concept_model_selection": 1,
      "representation_translation": 1,
      "reasoning_chain_length": 1,
      "algebra_computational_load": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "RETRIEVE",
    "role": "CORE2",
    "kind": "SINGLE_CHOICE",
    "stem": "In some plants and fungi, cell organelles convert lipids into sugars during the early stages\nof oil-seed germination. These organelles are:",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) Glyoxysomes"
      },
      {
        "id": "opt-B",
        "text": "(B) Lysosomes"
      },
      {
        "id": "opt-C",
        "text": "(C) Ribosomes"
      },
      {
        "id": "opt-D",
        "text": "(D) Liposomes"
      }
    ],
    "hints": [
      "[H1 (Context & Setup): Identify governing principles.] 1. Conceptual Model: Lipid-storing seeds (e.g. castor, sunflower) must convert stored triacylglycerols into mobile sucrose to fuel embryonic seedling growth prior to emergence of green leaves.",
      "[H2 (Formulation & Analysis): Key relationship.] 2. Organellar Specificity: Glyoxysomes are specialized plant peroxisomes that house the enzymes of the glyoxylate cycle (isocitrate lyase and malate synthase), which bypass CO2 loss steps of the Krebs cycle to achieve net gluconeogenesis from fatty acids.",
      "[H3 (Crux Resolution): Final calculation.] 3. Conclusion: The responsible organelles are Glyoxysomes. Hence Option A."
    ],
    "steps": [
      "1. Conceptual Model: Lipid-storing seeds (e.g. castor, sunflower) must convert stored triacylglycerols into mobile sucrose to fuel embryonic seedling growth prior to emergence of green leaves.",
      "2. Organellar Specificity: Glyoxysomes are specialized plant peroxisomes that house the enzymes of the glyoxylate cycle (isocitrate lyase and malate synthase), which bypass CO2 loss steps of the Krebs cycle to achieve net gluconeogenesis from fatty acids.",
      "3. Conclusion: The responsible organelles are Glyoxysomes. Hence Option A."
    ],
    "check": "Adjudicated under IAPT 2022 examination standards.",
    "limitingCheck": "Adjudicated under IAPT 2022 examination standards.",
    "trapWarning": "Fault N09 Answer Isolation: Raw key withheld client-side; formative reasoning steps provided.",
    "correctKey": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "figures": [],
    "linkedCoreRoles": [
      "CORE1A",
      "CORE1B",
      "CORE2A",
      "CORE2B"
    ],
    "primaryCapabilityRef": "CAP-NSEJS-2022-B-Q06",
    "status": "RELEASED",
    "academicAdmission": "HOLD (Grade9 v4.1 Parity Candidate)",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "sourceOrigin": "NSEJS Custody (Grade9v4.1)"
  },
  {
    "id": "NSEJS-2022-B-Q07",
    "code": "NSEJS-2022-B-Q07",
    "title": "NSEJS 2022-23 \u00b7 Q07 \u00b7 JUSTIFY \u00b7 D2 (Score 3)",
    "subjectCode": "BIO",
    "subject": "Biology",
    "topicCode": "ENVIRONMENT",
    "topic": "Ecology & Ecosystem Resources",
    "subtopic": "Ecology & Environment",
    "exam": "NSEJS",
    "year": 2024,
    "paper": "NSEJS Core 2",
    "questionNumber": "Q07",
    "section": "Junior Science Olympiad",
    "markingScheme": "+3 / -1",
    "isCompetitive": true,
    "difficultyBand": "D2",
    "difficultyScore": 3,
    "difficultyBasis": "Cognitive demand score determined by 5-component QRT rubric.",
    "cognitiveComponents": {
      "concept_model_selection": 1,
      "representation_translation": 1,
      "reasoning_chain_length": 1,
      "algebra_computational_load": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "JUSTIFY",
    "role": "CORE2",
    "kind": "SINGLE_CHOICE",
    "stem": "In the analysis of wastewater, Escherichia coli is used as:",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) A standard organism for performing a plate count"
      },
      {
        "id": "opt-B",
        "text": "(B) An indicator of faecal contamination of water"
      },
      {
        "id": "opt-C",
        "text": "(C) An indicator of the number of nitrogen-fixing bacteria in water"
      },
      {
        "id": "opt-D",
        "text": "(D) A measure of the amino-acid content of water"
      }
    ],
    "hints": [
      "[H1 (Context & Setup): Identify governing principles.] 1. Conceptual Model: Coliform bacteria serve as microbiological indicator organisms to assess sanitary quality and potable water safety.",
      "[H2 (Formulation & Analysis): Key relationship.] 2. Diagnostic Indicator: Escherichia coli is a commensal bacterium inhabiting the lower intestine of warm-blooded animals. Because it is shed in large numbers in faeces, its presence in water samples reliably indicates recent faecal contamination and the probable presence of enteric pathogens.",
      "[H3 (Crux Resolution): Final calculation.] 3. Conclusion: E. coli is used as an indicator of water contamination by faecal matter. Hence Option B."
    ],
    "steps": [
      "1. Conceptual Model: Coliform bacteria serve as microbiological indicator organisms to assess sanitary quality and potable water safety.",
      "2. Diagnostic Indicator: Escherichia coli is a commensal bacterium inhabiting the lower intestine of warm-blooded animals. Because it is shed in large numbers in faeces, its presence in water samples reliably indicates recent faecal contamination and the probable presence of enteric pathogens.",
      "3. Conclusion: E. coli is used as an indicator of water contamination by faecal matter. Hence Option B."
    ],
    "check": "Adjudicated under IAPT 2022 examination standards.",
    "limitingCheck": "Adjudicated under IAPT 2022 examination standards.",
    "trapWarning": "Fault N09 Answer Isolation: Raw key withheld client-side; formative reasoning steps provided.",
    "correctKey": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "figures": [],
    "linkedCoreRoles": [
      "CORE1A",
      "CORE1B",
      "CORE2A",
      "CORE2B"
    ],
    "primaryCapabilityRef": "CAP-NSEJS-2022-B-Q07",
    "status": "RELEASED",
    "academicAdmission": "HOLD (Grade9 v4.1 Parity Candidate)",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "sourceOrigin": "NSEJS Custody (Grade9v4.1)"
  },
  {
    "id": "NSEJS-2022-B-Q08",
    "code": "NSEJS-2022-B-Q08",
    "title": "NSEJS 2022-23 \u00b7 Q08 \u00b7 RETRIEVE \u00b7 D1 (Score 3)",
    "subjectCode": "BIO",
    "subject": "Biology",
    "topicCode": "ENVIRONMENT",
    "topic": "Ecology & Ecosystem Resources",
    "subtopic": "Ecology & Environment",
    "exam": "NSEJS",
    "year": 2024,
    "paper": "NSEJS Core 2",
    "questionNumber": "Q08",
    "section": "Junior Science Olympiad",
    "markingScheme": "+3 / -1",
    "isCompetitive": true,
    "difficultyBand": "D1",
    "difficultyScore": 3,
    "difficultyBasis": "Cognitive demand score determined by 5-component QRT rubric.",
    "cognitiveComponents": {
      "concept_model_selection": 1,
      "representation_translation": 1,
      "reasoning_chain_length": 1,
      "algebra_computational_load": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "RETRIEVE",
    "role": "CORE2",
    "kind": "SINGLE_CHOICE",
    "stem": "Acid rain damages soil and lakes and affects aquatic plants and animals. Which pH range\nis most suitable for the survival of most aquatic biota?",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) 4.5-5.8"
      },
      {
        "id": "opt-B",
        "text": "(B) 6.5-7.5"
      },
      {
        "id": "opt-C",
        "text": "(C) 7.5-8.5"
      },
      {
        "id": "opt-D",
        "text": "(D) Above 9.0"
      }
    ],
    "hints": [
      "[H1 (Context & Setup): Identify governing principles.] 1. Conceptual Model: Aquatic organisms maintain homeostatic osmoregulation and enzymatic function within narrow physiological pH windows.",
      "[H2 (Formulation & Analysis): Key relationship.] 2. Ecological Tolerance: The optimal pH range for freshwater teleost fish, aquatic invertebrates, and microflora is near neutral, between pH 6.5 and 7.5. Acidification below pH 6.0 mobilises toxic aluminium ions and impairs gill ion-exchange mechanisms.",
      "[H3 (Crux Resolution): Final calculation.] 3. Conclusion: The most suitable pH range is 6.5 to 7.5. Hence Option B."
    ],
    "steps": [
      "1. Conceptual Model: Aquatic organisms maintain homeostatic osmoregulation and enzymatic function within narrow physiological pH windows.",
      "2. Ecological Tolerance: The optimal pH range for freshwater teleost fish, aquatic invertebrates, and microflora is near neutral, between pH 6.5 and 7.5. Acidification below pH 6.0 mobilises toxic aluminium ions and impairs gill ion-exchange mechanisms.",
      "3. Conclusion: The most suitable pH range is 6.5 to 7.5. Hence Option B."
    ],
    "check": "Adjudicated under IAPT 2022 examination standards.",
    "limitingCheck": "Adjudicated under IAPT 2022 examination standards.",
    "trapWarning": "Fault N09 Answer Isolation: Raw key withheld client-side; formative reasoning steps provided.",
    "correctKey": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "figures": [],
    "linkedCoreRoles": [
      "CORE1A",
      "CORE1B",
      "CORE2A",
      "CORE2B"
    ],
    "primaryCapabilityRef": "CAP-NSEJS-2022-B-Q08",
    "status": "RELEASED",
    "academicAdmission": "HOLD (Grade9 v4.1 Parity Candidate)",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "sourceOrigin": "NSEJS Custody (Grade9v4.1)"
  },
  {
    "id": "NSEJS-2022-B-Q09",
    "code": "NSEJS-2022-B-Q09",
    "title": "NSEJS 2022-23 \u00b7 Q09 \u00b7 RETRIEVE \u00b7 D1 (Score 3)",
    "subjectCode": "BIO",
    "subject": "Biology",
    "topicCode": "COORDINATION",
    "topic": "Control & Endocrine Coordination / Immunology",
    "subtopic": "Systems & Regulation",
    "exam": "NSEJS",
    "year": 2024,
    "paper": "NSEJS Core 2",
    "questionNumber": "Q09",
    "section": "Junior Science Olympiad",
    "markingScheme": "+3 / -1",
    "isCompetitive": true,
    "difficultyBand": "D1",
    "difficultyScore": 3,
    "difficultyBasis": "Cognitive demand score determined by 5-component QRT rubric.",
    "cognitiveComponents": {
      "concept_model_selection": 1,
      "representation_translation": 1,
      "reasoning_chain_length": 1,
      "algebra_computational_load": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "RETRIEVE",
    "role": "CORE2",
    "kind": "SINGLE_CHOICE",
    "stem": "Steroid hormones include sex hormones and hormones of the adrenal cortex. Based on\nintensity of action, which ovarian hormone is produced in large amount and is the\nprincipal active estrogen?",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) Estrone"
      },
      {
        "id": "opt-B",
        "text": "(B) Estriol"
      },
      {
        "id": "opt-C",
        "text": "(C) Estradiol"
      },
      {
        "id": "opt-D",
        "text": "(D) Estrane"
      }
    ],
    "hints": [
      "[H1 (Context & Setup): Identify governing principles.] 1. Conceptual Model: The mammalian ovary secretes steroid estrogens that regulate the menstrual cycle and maintain female secondary sexual characteristics.",
      "[H2 (Formulation & Analysis): Key relationship.] 2. Endocrine Potency: The three major endogenous estrogens are estrone (E1), estradiol (E2), and estriol (E3). 17beta-estradiol is synthesized in large quantities by the ovarian granulosa cells of developing Graafian follicles and is the principal, most biologically active estrogen during reproductive years.",
      "[H3 (Crux Resolution): Final calculation.] 3. Conclusion: The principal active estrogen is Estradiol. Hence Option C."
    ],
    "steps": [
      "1. Conceptual Model: The mammalian ovary secretes steroid estrogens that regulate the menstrual cycle and maintain female secondary sexual characteristics.",
      "2. Endocrine Potency: The three major endogenous estrogens are estrone (E1), estradiol (E2), and estriol (E3). 17beta-estradiol is synthesized in large quantities by the ovarian granulosa cells of developing Graafian follicles and is the principal, most biologically active estrogen during reproductive years.",
      "3. Conclusion: The principal active estrogen is Estradiol. Hence Option C."
    ],
    "check": "Adjudicated under IAPT 2022 examination standards.",
    "limitingCheck": "Adjudicated under IAPT 2022 examination standards.",
    "trapWarning": "Fault N09 Answer Isolation: Raw key withheld client-side; formative reasoning steps provided.",
    "correctKey": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "figures": [],
    "linkedCoreRoles": [
      "CORE1A",
      "CORE1B",
      "CORE2A",
      "CORE2B"
    ],
    "primaryCapabilityRef": "CAP-NSEJS-2022-B-Q09",
    "status": "RELEASED",
    "academicAdmission": "HOLD (Grade9 v4.1 Parity Candidate)",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "sourceOrigin": "NSEJS Custody (Grade9v4.1)"
  },
  {
    "id": "NSEJS-2022-B-Q10",
    "code": "NSEJS-2022-B-Q10",
    "title": "NSEJS 2022-23 \u00b7 Q10 \u00b7 RETRIEVE \u00b7 D1 (Score 3)",
    "subjectCode": "BIO",
    "subject": "Biology",
    "topicCode": "COORDINATION",
    "topic": "Control & Endocrine Coordination / Immunology",
    "subtopic": "Systems & Regulation",
    "exam": "NSEJS",
    "year": 2024,
    "paper": "NSEJS Core 2",
    "questionNumber": "Q10",
    "section": "Junior Science Olympiad",
    "markingScheme": "+3 / -1",
    "isCompetitive": true,
    "difficultyBand": "D1",
    "difficultyScore": 3,
    "difficultyBasis": "Cognitive demand score determined by 5-component QRT rubric.",
    "cognitiveComponents": {
      "concept_model_selection": 1,
      "representation_translation": 1,
      "reasoning_chain_length": 1,
      "algebra_computational_load": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "RETRIEVE",
    "role": "CORE2",
    "kind": "SINGLE_CHOICE",
    "stem": "In the human vertebral column there are about 26 bones in the adult. Which group of\nvertebrae is related to the pelvic region?",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) Lumbar"
      },
      {
        "id": "opt-B",
        "text": "(B) Coccygeal"
      },
      {
        "id": "opt-C",
        "text": "(C) Sacral"
      },
      {
        "id": "opt-D",
        "text": "(D) Cervical"
      }
    ],
    "hints": [
      "[H1 (Context & Setup): Identify governing principles.] 1. Conceptual Model: The adult human axial skeleton features 26 vertebral elements divided into regional divisions: cervical (7), thoracic (12), lumbar (5), sacrum (1, fused from 5), and coccyx (1, fused from 4).",
      "[H2 (Formulation & Analysis): Key relationship.] 2. Pelvic Articulation: The sacral vertebrae fuse into the wedge-shaped sacrum, which articulates laterally with the ilium of each coxal hip bone at the sacroiliac joints to form the posterior wall of the bony pelvis.",
      "[H3 (Crux Resolution): Final calculation.] 3. Conclusion: The vertebrae related to the pelvic region are the Sacral vertebrae. Hence Option C."
    ],
    "steps": [
      "1. Conceptual Model: The adult human axial skeleton features 26 vertebral elements divided into regional divisions: cervical (7), thoracic (12), lumbar (5), sacrum (1, fused from 5), and coccyx (1, fused from 4).",
      "2. Pelvic Articulation: The sacral vertebrae fuse into the wedge-shaped sacrum, which articulates laterally with the ilium of each coxal hip bone at the sacroiliac joints to form the posterior wall of the bony pelvis.",
      "3. Conclusion: The vertebrae related to the pelvic region are the Sacral vertebrae. Hence Option C."
    ],
    "check": "Adjudicated under IAPT 2022 examination standards.",
    "limitingCheck": "Adjudicated under IAPT 2022 examination standards.",
    "trapWarning": "Fault N09 Answer Isolation: Raw key withheld client-side; formative reasoning steps provided.",
    "correctKey": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "figures": [],
    "linkedCoreRoles": [
      "CORE1A",
      "CORE1B",
      "CORE2A",
      "CORE2B"
    ],
    "primaryCapabilityRef": "CAP-NSEJS-2022-B-Q10",
    "status": "RELEASED",
    "academicAdmission": "HOLD (Grade9 v4.1 Parity Candidate)",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "sourceOrigin": "NSEJS Custody (Grade9v4.1)"
  },
  {
    "id": "NSEJS-2022-B-Q11",
    "code": "NSEJS-2022-B-Q11",
    "title": "NSEJS 2022-23 \u00b7 Q11 \u00b7 APPLY \u00b7 D2 (Score 3)",
    "subjectCode": "BIO",
    "subject": "Biology",
    "topicCode": "LIFE_PROCESSES",
    "topic": "Life Processes & Nephron Physiology",
    "subtopic": "Human Physiology",
    "exam": "NSEJS",
    "year": 2024,
    "paper": "NSEJS Core 2",
    "questionNumber": "Q11",
    "section": "Junior Science Olympiad",
    "markingScheme": "+3 / -1",
    "isCompetitive": true,
    "difficultyBand": "D2",
    "difficultyScore": 3,
    "difficultyBasis": "Cognitive demand score determined by 5-component QRT rubric.",
    "cognitiveComponents": {
      "concept_model_selection": 1,
      "representation_translation": 1,
      "reasoning_chain_length": 1,
      "algebra_computational_load": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "APPLY",
    "role": "CORE2",
    "kind": "SINGLE_CHOICE",
    "stem": "In the EMP (glycolytic) pathway shown, reactions are numbered E1 to E10. At which\nenzyme levels is ATP generated by substrate-level phosphorylation?",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) E1 and E3"
      },
      {
        "id": "opt-B",
        "text": "(B) E3 and E6"
      },
      {
        "id": "opt-C",
        "text": "(C) E7 and E10"
      },
      {
        "id": "opt-D",
        "text": "(D) E6 and E10"
      }
    ],
    "hints": [
      "[H1 (Context & Setup): Identify governing principles.] 1. Conceptual Model: Substrate-level phosphorylation is the direct synthesis of ATP from ADP by transfer of a high-energy phosphate group from a phosphorylated metabolic intermediate without requiring electron transport.",
      "[H2 (Formulation & Analysis): Key relationship.] 2. Glycolytic Enzyme Loci: In the 10-step Embden-Meyerhof-Parnas (EMP) pathway, ATP is generated at two distinct enzyme steps: Step E7 (phosphoglycerate kinase converts 1,3-bisphosphoglycerate to 3-phosphoglycerate) and Step E10 (pyruvate kinase converts phosphoenolpyruvate to pyruvate).",
      "[H3 (Crux Resolution): Final calculation.] 3. Conclusion: ATP generation by substrate-level phosphorylation occurs at enzyme levels E7 and E10. Hence Option C."
    ],
    "steps": [
      "1. Conceptual Model: Substrate-level phosphorylation is the direct synthesis of ATP from ADP by transfer of a high-energy phosphate group from a phosphorylated metabolic intermediate without requiring electron transport.",
      "2. Glycolytic Enzyme Loci: In the 10-step Embden-Meyerhof-Parnas (EMP) pathway, ATP is generated at two distinct enzyme steps: Step E7 (phosphoglycerate kinase converts 1,3-bisphosphoglycerate to 3-phosphoglycerate) and Step E10 (pyruvate kinase converts phosphoenolpyruvate to pyruvate).",
      "3. Conclusion: ATP generation by substrate-level phosphorylation occurs at enzyme levels E7 and E10. Hence Option C."
    ],
    "check": "Adjudicated under IAPT 2022 examination standards.",
    "limitingCheck": "Adjudicated under IAPT 2022 examination standards.",
    "trapWarning": "Fault N09 Answer Isolation: Raw key withheld client-side; formative reasoning steps provided.",
    "correctKey": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "figures": [],
    "linkedCoreRoles": [
      "CORE1A",
      "CORE1B",
      "CORE2A",
      "CORE2B"
    ],
    "primaryCapabilityRef": "CAP-NSEJS-2022-B-Q11",
    "status": "RELEASED",
    "academicAdmission": "HOLD (Grade9 v4.1 Parity Candidate)",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "sourceOrigin": "NSEJS Custody (Grade9v4.1)"
  },
  {
    "id": "NSEJS-2022-B-Q12",
    "code": "NSEJS-2022-B-Q12",
    "title": "NSEJS 2022-23 \u00b7 Q12 \u00b7 RETRIEVE \u00b7 D1 (Score 3)",
    "subjectCode": "BIO",
    "subject": "Biology",
    "topicCode": "COORDINATION",
    "topic": "Control & Endocrine Coordination / Immunology",
    "subtopic": "Systems & Regulation",
    "exam": "NSEJS",
    "year": 2024,
    "paper": "NSEJS Core 2",
    "questionNumber": "Q12",
    "section": "Junior Science Olympiad",
    "markingScheme": "+3 / -1",
    "isCompetitive": true,
    "difficultyBand": "D1",
    "difficultyScore": 3,
    "difficultyBasis": "Cognitive demand score determined by 5-component QRT rubric.",
    "cognitiveComponents": {
      "concept_model_selection": 1,
      "representation_translation": 1,
      "reasoning_chain_length": 1,
      "algebra_computational_load": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "RETRIEVE",
    "role": "CORE2",
    "kind": "SINGLE_CHOICE",
    "stem": "A thick whitish band of nerve fibres bulges on the inner surface of the dorsal wall of each\ncerebral hemisphere in the mammalian brain. This structure is:",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) Corpus albicans"
      },
      {
        "id": "opt-B",
        "text": "(B) Corpus luteum"
      },
      {
        "id": "opt-C",
        "text": "(C) Corpus striatum"
      },
      {
        "id": "opt-D",
        "text": "(D) Corpus callosum"
      }
    ],
    "hints": [
      "[H1 (Context & Setup): Identify governing principles.] 1. Conceptual Model: Interhemispheric communication in the mammalian telencephalon requires dense commissural nerve fibre tracts.",
      "[H2 (Formulation & Analysis): Key relationship.] 2. Commissural Tract: The corpus callosum is a thick C-shaped arched neural tract of white myelinated axonal fibres spanning the longitudinal fissure beneath the cortex, connecting corresponding cortical areas between the left and right cerebral hemispheres.",
      "[H3 (Crux Resolution): Final calculation.] 3. Conclusion: The thick whitish commissural band is the Corpus callosum. Hence Option D."
    ],
    "steps": [
      "1. Conceptual Model: Interhemispheric communication in the mammalian telencephalon requires dense commissural nerve fibre tracts.",
      "2. Commissural Tract: The corpus callosum is a thick C-shaped arched neural tract of white myelinated axonal fibres spanning the longitudinal fissure beneath the cortex, connecting corresponding cortical areas between the left and right cerebral hemispheres.",
      "3. Conclusion: The thick whitish commissural band is the Corpus callosum. Hence Option D."
    ],
    "check": "Adjudicated under IAPT 2022 examination standards.",
    "limitingCheck": "Adjudicated under IAPT 2022 examination standards.",
    "trapWarning": "Fault N09 Answer Isolation: Raw key withheld client-side; formative reasoning steps provided.",
    "correctKey": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "figures": [],
    "linkedCoreRoles": [
      "CORE1A",
      "CORE1B",
      "CORE2A",
      "CORE2B"
    ],
    "primaryCapabilityRef": "CAP-NSEJS-2022-B-Q12",
    "status": "RELEASED",
    "academicAdmission": "HOLD (Grade9 v4.1 Parity Candidate)",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "sourceOrigin": "NSEJS Custody (Grade9v4.1)"
  },
  {
    "id": "NSEJS-2022-B-Q13",
    "code": "NSEJS-2022-B-Q13",
    "title": "NSEJS 2022-23 \u00b7 Q13 \u00b7 APPLY \u00b7 D2 (Score 3)",
    "subjectCode": "BIO",
    "subject": "Biology",
    "topicCode": "LIVING_WORLD",
    "topic": "Cell Biology & Molecular Genetics",
    "subtopic": "Cell & Molecular Biology",
    "exam": "NSEJS",
    "year": 2024,
    "paper": "NSEJS Core 2",
    "questionNumber": "Q13",
    "section": "Junior Science Olympiad",
    "markingScheme": "+3 / -1",
    "isCompetitive": true,
    "difficultyBand": "D2",
    "difficultyScore": 3,
    "difficultyBasis": "Cognitive demand score determined by 5-component QRT rubric.",
    "cognitiveComponents": {
      "concept_model_selection": 1,
      "representation_translation": 1,
      "reasoning_chain_length": 1,
      "algebra_computational_load": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "APPLY",
    "role": "CORE2",
    "kind": "SINGLE_CHOICE",
    "stem": "Body symmetry is a diagnostic feature in classification. Besides truly bilateral animals,\nsome other organisms also show bilateral symmetry. Which of the following is such an\nexample?",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) Giardia"
      },
      {
        "id": "opt-B",
        "text": "(B) Cliona"
      },
      {
        "id": "opt-C",
        "text": "(C) Obelia"
      },
      {
        "id": "opt-D",
        "text": "(D) Trypanosoma"
      }
    ],
    "hints": [
      "[H1 (Context & Setup): Identify governing principles.] 1. Conceptual Model: Bilateral symmetry describes an anatomical plan with a single sagittal plane dividing the organism into matching left and right mirror-image halves.",
      "[H2 (Formulation & Analysis): Key relationship.] 2. Protozoan Morphology: Giardia lamblia (a diplomonad flagellate protozoan) exhibits remarkable bilateral symmetry, possessing paired nuclei, paired ventral sucking discs, and paired four-flagellar arrays arranged symmetrically on either side of an axostyle central median line.",
      "[H3 (Crux Resolution): Final calculation.] 3. Conclusion: Giardia is the designated bilaterally symmetrical organism. Hence Option A."
    ],
    "steps": [
      "1. Conceptual Model: Bilateral symmetry describes an anatomical plan with a single sagittal plane dividing the organism into matching left and right mirror-image halves.",
      "2. Protozoan Morphology: Giardia lamblia (a diplomonad flagellate protozoan) exhibits remarkable bilateral symmetry, possessing paired nuclei, paired ventral sucking discs, and paired four-flagellar arrays arranged symmetrically on either side of an axostyle central median line.",
      "3. Conclusion: Giardia is the designated bilaterally symmetrical organism. Hence Option A."
    ],
    "check": "Adjudicated under IAPT 2022 examination standards.",
    "limitingCheck": "Adjudicated under IAPT 2022 examination standards.",
    "trapWarning": "Fault N09 Answer Isolation: Raw key withheld client-side; formative reasoning steps provided.",
    "correctKey": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "figures": [],
    "linkedCoreRoles": [
      "CORE1A",
      "CORE1B",
      "CORE2A",
      "CORE2B"
    ],
    "primaryCapabilityRef": "CAP-NSEJS-2022-B-Q13",
    "status": "RELEASED",
    "academicAdmission": "HOLD (Grade9 v4.1 Parity Candidate)",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "sourceOrigin": "NSEJS Custody (Grade9v4.1)"
  },
  {
    "id": "NSEJS-2022-B-Q14",
    "code": "NSEJS-2022-B-Q14",
    "title": "NSEJS 2022-23 \u00b7 Q14 \u00b7 RETRIEVE \u00b7 D1 (Score 3)",
    "subjectCode": "BIO",
    "subject": "Biology",
    "topicCode": "COORDINATION",
    "topic": "Control & Endocrine Coordination / Immunology",
    "subtopic": "Systems & Regulation",
    "exam": "NSEJS",
    "year": 2024,
    "paper": "NSEJS Core 2",
    "questionNumber": "Q14",
    "section": "Junior Science Olympiad",
    "markingScheme": "+3 / -1",
    "isCompetitive": true,
    "difficultyBand": "D1",
    "difficultyScore": 3,
    "difficultyBasis": "Cognitive demand score determined by 5-component QRT rubric.",
    "cognitiveComponents": {
      "concept_model_selection": 1,
      "representation_translation": 1,
      "reasoning_chain_length": 1,
      "algebra_computational_load": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "RETRIEVE",
    "role": "CORE2",
    "kind": "SINGLE_CHOICE",
    "stem": "Nissl granules are RNA-rich bodies. In which of the following do they occur?",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) Osteon"
      },
      {
        "id": "opt-B",
        "text": "(B) Chondrion"
      },
      {
        "id": "opt-C",
        "text": "(C) Neurons"
      },
      {
        "id": "opt-D",
        "text": "(D) Myocytes"
      }
    ],
    "hints": [
      "[H1 (Context & Setup): Identify governing principles.] 1. Conceptual Model: Highly metabolic cells possess abundant ribosomal machinery for high-throughput protein synthesis.",
      "[H2 (Formulation & Analysis): Key relationship.] 2. Nissl Granules Identification: Nissl bodies (chromophilic substance) found in the soma (perikaryon) and proximal dendrites of neurons consist of dense granular agglomerations of rough endoplasmic reticulum and polyribosomes dedicated to synthesizing structural proteins and peptide neurotransmitters.",
      "[H3 (Crux Resolution): Final calculation.] 3. Conclusion: Nissl bodies are characteristic of Neurons. Hence Option C."
    ],
    "steps": [
      "1. Conceptual Model: Highly metabolic cells possess abundant ribosomal machinery for high-throughput protein synthesis.",
      "2. Nissl Granules Identification: Nissl bodies (chromophilic substance) found in the soma (perikaryon) and proximal dendrites of neurons consist of dense granular agglomerations of rough endoplasmic reticulum and polyribosomes dedicated to synthesizing structural proteins and peptide neurotransmitters.",
      "3. Conclusion: Nissl bodies are characteristic of Neurons. Hence Option C."
    ],
    "check": "Adjudicated under IAPT 2022 examination standards.",
    "limitingCheck": "Adjudicated under IAPT 2022 examination standards.",
    "trapWarning": "Fault N09 Answer Isolation: Raw key withheld client-side; formative reasoning steps provided.",
    "correctKey": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "figures": [],
    "linkedCoreRoles": [
      "CORE1A",
      "CORE1B",
      "CORE2A",
      "CORE2B"
    ],
    "primaryCapabilityRef": "CAP-NSEJS-2022-B-Q14",
    "status": "RELEASED",
    "academicAdmission": "HOLD (Grade9 v4.1 Parity Candidate)",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "sourceOrigin": "NSEJS Custody (Grade9v4.1)"
  },
  {
    "id": "NSEJS-2022-B-Q15",
    "code": "NSEJS-2022-B-Q15",
    "title": "NSEJS 2022-23 \u00b7 Q15 \u00b7 EXPLAIN \u00b7 D2 (Score 3)",
    "subjectCode": "BIO",
    "subject": "Biology",
    "topicCode": "LIVING_WORLD",
    "topic": "Cell Biology & Molecular Genetics",
    "subtopic": "Cell & Molecular Biology",
    "exam": "NSEJS",
    "year": 2024,
    "paper": "NSEJS Core 2",
    "questionNumber": "Q15",
    "section": "Junior Science Olympiad",
    "markingScheme": "+3 / -1",
    "isCompetitive": true,
    "difficultyBand": "D2",
    "difficultyScore": 3,
    "difficultyBasis": "Cognitive demand score determined by 5-component QRT rubric.",
    "cognitiveComponents": {
      "concept_model_selection": 1,
      "representation_translation": 1,
      "reasoning_chain_length": 1,
      "algebra_computational_load": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "EXPLAIN",
    "role": "CORE2",
    "kind": "SINGLE_CHOICE",
    "stem": "Which statement is not applicable to viruses?",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) The protein capsid of a virus does not enter the host cell in some viral infections"
      },
      {
        "id": "opt-B",
        "text": "(B) The genetic material is either DNA or RNA, never both"
      },
      {
        "id": "opt-C",
        "text": "(C) The virion replicates autonomously outside the host"
      },
      {
        "id": "opt-D",
        "text": "(D) The virus replicates in a bacterial or other host cell"
      }
    ],
    "hints": [
      "[H1 (Context & Setup): Identify governing principles.] 1. Conceptual Model: A virion is an inert supramolecular assembly of genetic material encased in a protective proteinaceous capsid (plus optional envelope).",
      "[H2 (Formulation & Analysis): Key relationship.] 2. Non-autonomous Nature: Viruses lack metabolic enzymes, ribosomes, and ATP-generating machinery. Consequently, they are obligate intracellular parasites that cannot replicate autonomously outside a living host cell.",
      "[H3 (Crux Resolution): Final calculation.] 3. Conclusion: The statement that virions replicate autonomously outside the host is false and not applicable to viruses. Hence Option C."
    ],
    "steps": [
      "1. Conceptual Model: A virion is an inert supramolecular assembly of genetic material encased in a protective proteinaceous capsid (plus optional envelope).",
      "2. Non-autonomous Nature: Viruses lack metabolic enzymes, ribosomes, and ATP-generating machinery. Consequently, they are obligate intracellular parasites that cannot replicate autonomously outside a living host cell.",
      "3. Conclusion: The statement that virions replicate autonomously outside the host is false and not applicable to viruses. Hence Option C."
    ],
    "check": "Adjudicated under IAPT 2022 examination standards.",
    "limitingCheck": "Adjudicated under IAPT 2022 examination standards.",
    "trapWarning": "Fault N09 Answer Isolation: Raw key withheld client-side; formative reasoning steps provided.",
    "correctKey": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "figures": [],
    "linkedCoreRoles": [
      "CORE1A",
      "CORE1B",
      "CORE2A",
      "CORE2B"
    ],
    "primaryCapabilityRef": "CAP-NSEJS-2022-B-Q15",
    "status": "RELEASED",
    "academicAdmission": "HOLD (Grade9 v4.1 Parity Candidate)",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "sourceOrigin": "NSEJS Custody (Grade9v4.1)"
  },
  {
    "id": "NSEJS-2022-B-Q16",
    "code": "NSEJS-2022-B-Q16",
    "title": "NSEJS 2022-23 \u00b7 Q16 \u00b7 RETRIEVE \u00b7 D1 (Score 3)",
    "subjectCode": "BIO",
    "subject": "Biology",
    "topicCode": "LIVING_WORLD",
    "topic": "Cell Biology & Molecular Genetics",
    "subtopic": "Cell & Molecular Biology",
    "exam": "NSEJS",
    "year": 2024,
    "paper": "NSEJS Core 2",
    "questionNumber": "Q16",
    "section": "Junior Science Olympiad",
    "markingScheme": "+3 / -1",
    "isCompetitive": true,
    "difficultyBand": "D1",
    "difficultyScore": 3,
    "difficultyBasis": "Cognitive demand score determined by 5-component QRT rubric.",
    "cognitiveComponents": {
      "concept_model_selection": 1,
      "representation_translation": 1,
      "reasoning_chain_length": 1,
      "algebra_computational_load": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "RETRIEVE",
    "role": "CORE2",
    "kind": "SINGLE_CHOICE",
    "stem": "Carolus Linnaeus devised a system for classifying plants while using binomial\nnomenclature. His plant classification was:",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) Artificial"
      },
      {
        "id": "opt-B",
        "text": "(B) Natural"
      },
      {
        "id": "opt-C",
        "text": "(C) Phylogenetic"
      },
      {
        "id": "opt-D",
        "text": "(D) Cladistic"
      }
    ],
    "hints": [
      "[H1 (Context & Setup): Identify governing principles.] 1. Conceptual Model: Biological classification systems are historically categorized as artificial (based on 1-2 arbitrary superficial traits), natural (based on overall morphological and anatomical affinities), or phylogenetic (based on evolutionary lineages).",
      "[H2 (Formulation & Analysis): Key relationship.] 2. Linnaean System: Carolus Linnaeus's sexual system of plant classification (Systema Naturae, 1735) grouped plants primarily according to the number, union, and length of stamens and carpels, without considering evolutionary relatedness or holistic internal anatomy.",
      "[H3 (Crux Resolution): Final calculation.] 3. Conclusion: Linnaeus's plant classification was an Artificial system. Hence Option A."
    ],
    "steps": [
      "1. Conceptual Model: Biological classification systems are historically categorized as artificial (based on 1-2 arbitrary superficial traits), natural (based on overall morphological and anatomical affinities), or phylogenetic (based on evolutionary lineages).",
      "2. Linnaean System: Carolus Linnaeus's sexual system of plant classification (Systema Naturae, 1735) grouped plants primarily according to the number, union, and length of stamens and carpels, without considering evolutionary relatedness or holistic internal anatomy.",
      "3. Conclusion: Linnaeus's plant classification was an Artificial system. Hence Option A."
    ],
    "check": "Adjudicated under IAPT 2022 examination standards.",
    "limitingCheck": "Adjudicated under IAPT 2022 examination standards.",
    "trapWarning": "Fault N09 Answer Isolation: Raw key withheld client-side; formative reasoning steps provided.",
    "correctKey": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "figures": [],
    "linkedCoreRoles": [
      "CORE1A",
      "CORE1B",
      "CORE2A",
      "CORE2B"
    ],
    "primaryCapabilityRef": "CAP-NSEJS-2022-B-Q16",
    "status": "RELEASED",
    "academicAdmission": "HOLD (Grade9 v4.1 Parity Candidate)",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "sourceOrigin": "NSEJS Custody (Grade9v4.1)"
  },
  {
    "id": "NSEJS-2022-B-Q49",
    "code": "NSEJS-2022-B-Q49",
    "title": "NSEJS 2022-23 \u00b7 Q49 \u00b7 MODEL \u00b7 D2 (Score 6)",
    "subjectCode": "BIO",
    "subject": "Biology",
    "topicCode": "GENETICS",
    "topic": "Reproduction & Mendelian Heredity",
    "subtopic": "Genetics & Evolution",
    "exam": "NSEJS",
    "year": 2024,
    "paper": "NSEJS Core 2",
    "questionNumber": "Q49",
    "section": "Junior Science Olympiad",
    "markingScheme": "+3 / -1",
    "isCompetitive": true,
    "difficultyBand": "D2",
    "difficultyScore": 6,
    "difficultyBasis": "Cognitive demand score determined by 5-component QRT rubric.",
    "cognitiveComponents": {
      "concept_model_selection": 1,
      "representation_translation": 1,
      "reasoning_chain_length": 1,
      "algebra_computational_load": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "MODEL",
    "role": "CORE2",
    "kind": "SINGLE_CHOICE",
    "stem": "Which of the following evolutionary lineages of humans can be categorised as prehistoric\nman?",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) Ramapithecus"
      },
      {
        "id": "opt-B",
        "text": "(B) Homo habilis"
      },
      {
        "id": "opt-C",
        "text": "(C) Homo sapiens fossilis"
      },
      {
        "id": "opt-D",
        "text": "(D) Homo heidelbergensis"
      }
    ],
    "hints": [
      "[H1 (Context & Setup): Identify governing principles.] 1. Conceptual Model: Paleoanthropology categorises hominin fossils into archaic hominids, prehistoric transitional human forms (Homo habilis, Homo erectus, Homo heidelbergensis), and anatomically modern Homo sapiens.",
      "[H2 (Formulation & Analysis): Key relationship.] 2. Lineage Evaluation:",
      "[H3 (Crux Resolution): Final calculation.]   - Homo habilis (handy man, brain capacity ~650-800 cc) represents the earliest prehistoric human genus member."
    ],
    "steps": [
      "1. Conceptual Model: Paleoanthropology categorises hominin fossils into archaic hominids, prehistoric transitional human forms (Homo habilis, Homo erectus, Homo heidelbergensis), and anatomically modern Homo sapiens.",
      "2. Lineage Evaluation:",
      "  - Homo habilis (handy man, brain capacity ~650-800 cc) represents the earliest prehistoric human genus member.",
      "  - Homo heidelbergensis (~600,000-200,000 years ago) represents an archaic middle Pleistocene prehistoric human ancestor of Neanderthals and modern humans.",
      "  - Ramapithecus is a late Miocene primate ancestral to hominoids, not classified as genus Homo.",
      "  - Homo sapiens fossilis represents early anatomically modern human fossil stock.",
      "3. Conclusion: Homo habilis and Homo heidelbergensis represent prehistoric humans. Correct options: B and D."
    ],
    "check": "Adjudicated under IAPT 2022 examination standards.",
    "limitingCheck": "Adjudicated under IAPT 2022 examination standards.",
    "trapWarning": "Fault N09 Answer Isolation: Raw key withheld client-side; formative reasoning steps provided.",
    "correctKey": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "figures": [],
    "linkedCoreRoles": [
      "CORE1A",
      "CORE1B",
      "CORE2A",
      "CORE2B"
    ],
    "primaryCapabilityRef": "CAP-NSEJS-2022-B-Q49",
    "status": "RELEASED",
    "academicAdmission": "HOLD (Grade9 v4.1 Parity Candidate)",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "sourceOrigin": "NSEJS Custody (Grade9v4.1)"
  },
  {
    "id": "NSEJS-2022-B-Q50",
    "code": "NSEJS-2022-B-Q50",
    "title": "NSEJS 2022-23 \u00b7 Q50 \u00b7 MODEL \u00b7 D2 (Score 6)",
    "subjectCode": "BIO",
    "subject": "Biology",
    "topicCode": "LIFE_PROCESSES",
    "topic": "Life Processes & Nephron Physiology",
    "subtopic": "Human Physiology",
    "exam": "NSEJS",
    "year": 2024,
    "paper": "NSEJS Core 2",
    "questionNumber": "Q50",
    "section": "Junior Science Olympiad",
    "markingScheme": "+3 / -1",
    "isCompetitive": true,
    "difficultyBand": "D2",
    "difficultyScore": 6,
    "difficultyBasis": "Cognitive demand score determined by 5-component QRT rubric.",
    "cognitiveComponents": {
      "concept_model_selection": 1,
      "representation_translation": 1,
      "reasoning_chain_length": 1,
      "algebra_computational_load": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "MODEL",
    "role": "CORE2",
    "kind": "SINGLE_CHOICE",
    "stem": "Select the sets of diseases caused by deficiency of B-complex vitamins:",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) Beri-beri and Pellagra"
      },
      {
        "id": "opt-B",
        "text": "(B) Dermatitis and Wernicke-Korsakoff syndrome"
      },
      {
        "id": "opt-C",
        "text": "(C) Cheilosis and Pernicious anaemia"
      },
      {
        "id": "opt-D",
        "text": "(D) Marasmus and Kwashiorkor"
      }
    ],
    "hints": [
      "[H1 (Context & Setup): Identify governing principles.] 1. Conceptual Model: Water-soluble B-complex vitamins act as essential metabolic coenzymes; deficiencies lead to specific neurological, dermatological, and hematological disorders.",
      "[H2 (Formulation & Analysis): Key relationship.] 2. Disease-Vitamin Matching:",
      "[H3 (Crux Resolution): Final calculation.]   - Set A: Beri-beri (Vitamin B1 / Thiamine) and Pellagra (Vitamin B3 / Niacin). Both are B-complex deficiencies (Correct)."
    ],
    "steps": [
      "1. Conceptual Model: Water-soluble B-complex vitamins act as essential metabolic coenzymes; deficiencies lead to specific neurological, dermatological, and hematological disorders.",
      "2. Disease-Vitamin Matching:",
      "  - Set A: Beri-beri (Vitamin B1 / Thiamine) and Pellagra (Vitamin B3 / Niacin). Both are B-complex deficiencies (Correct).",
      "  - Set B: Dermatitis (Riboflavin B2, Pyridoxine B6, Biotin B7) and Wernicke-Korsakoff syndrome (Thiamine B1). Both are B-complex deficiencies (Correct).",
      "  - Set C: Cheilosis (Vitamin B2 / Riboflavin) and Pernicious anaemia (Vitamin B12 / Cobalamin). Both are B-complex deficiencies (Correct).",
      "  - Set D: Marasmus and Kwashiorkor are forms of Protein-Energy Malnutrition (PEM), not vitamin deficiencies (Incorrect).",
      "3. Conclusion: Sets A, B, and C represent B-complex deficiency diseases. Correct options: A, B, and C."
    ],
    "check": "Adjudicated under IAPT 2022 examination standards.",
    "limitingCheck": "Adjudicated under IAPT 2022 examination standards.",
    "trapWarning": "Fault N09 Answer Isolation: Raw key withheld client-side; formative reasoning steps provided.",
    "correctKey": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "figures": [],
    "linkedCoreRoles": [
      "CORE1A",
      "CORE1B",
      "CORE2A",
      "CORE2B"
    ],
    "primaryCapabilityRef": "CAP-NSEJS-2022-B-Q50",
    "status": "RELEASED",
    "academicAdmission": "HOLD (Grade9 v4.1 Parity Candidate)",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "sourceOrigin": "NSEJS Custody (Grade9v4.1)"
  },
  {
    "id": "NSEJS-2022-B-Q51",
    "code": "NSEJS-2022-B-Q51",
    "title": "NSEJS 2022-23 \u00b7 Q51 \u00b7 SYNTHESIZE \u00b7 D2 (Score 6)",
    "subjectCode": "BIO",
    "subject": "Biology",
    "topicCode": "ENVIRONMENT",
    "topic": "Ecology & Ecosystem Resources",
    "subtopic": "Ecology & Environment",
    "exam": "NSEJS",
    "year": 2024,
    "paper": "NSEJS Core 2",
    "questionNumber": "Q51",
    "section": "Junior Science Olympiad",
    "markingScheme": "+3 / -1",
    "isCompetitive": true,
    "difficultyBand": "D2",
    "difficultyScore": 6,
    "difficultyBasis": "Cognitive demand score determined by 5-component QRT rubric.",
    "cognitiveComponents": {
      "concept_model_selection": 1,
      "representation_translation": 1,
      "reasoning_chain_length": 1,
      "algebra_computational_load": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "SYNTHESIZE",
    "role": "CORE2",
    "kind": "SINGLE_CHOICE",
    "stem": "After the rainy season, students collect pond water containing aquatic plants. Which\ngroups of organisms are they likely to find?",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) Spirogyra, Azolla, Riccia fluitans and Cosmarium"
      },
      {
        "id": "opt-B",
        "text": "(B) Ulothrix, Chlorella, Chara and Ricciocarpus natans"
      },
      {
        "id": "opt-C",
        "text": "(C) Marchantia, Funaria, Lycopodium and Gnetum"
      },
      {
        "id": "opt-D",
        "text": "(D) Salvinia molesta, Azolla, Chlorella and Cladophora"
      }
    ],
    "hints": [
      "[H1 (Context & Setup): Identify governing principles.] 1. Conceptual Model: Post-monsoon pond ecosystems support diverse assemblages of microscopic free-floating green algae, desmids, and aquatic macrophyte ferns/liverworts.",
      "[H2 (Formulation & Analysis): Key relationship.] 2. Flora Analysis across Sets:",
      "[H3 (Crux Resolution): Final calculation.]   - Group A: Spirogyra (filamentous green alga), Azolla (aquatic floating water fern), Riccia fluitans (aquatic floating liverwort), and Cosmarium (unicellular desmid). All thrive in freshwater ponds (Correct)."
    ],
    "steps": [
      "1. Conceptual Model: Post-monsoon pond ecosystems support diverse assemblages of microscopic free-floating green algae, desmids, and aquatic macrophyte ferns/liverworts.",
      "2. Flora Analysis across Sets:",
      "  - Group A: Spirogyra (filamentous green alga), Azolla (aquatic floating water fern), Riccia fluitans (aquatic floating liverwort), and Cosmarium (unicellular desmid). All thrive in freshwater ponds (Correct).",
      "  - Group B: Ulothrix (green alga), Chlorella (unicellular green alga), Chara (stonewort green alga), and Ricciocarpus natans (aquatic liverwort). All thrive in ponds (Correct).",
      "  - Group C: Marchantia (terrestrial liverwort), Funaria (terrestrial moss), Lycopodium (terrestrial clubmoss), and Gnetum (terrestrial woody gymnosperm). None are pond water organisms (Incorrect).",
      "  - Group D: Salvinia molesta (floating aquatic fern), Azolla (aquatic fern), Chlorella (green alga), and Cladophora (filamentous green alga). All thrive in ponds (Correct).",
      "3. Conclusion: Likely pond water assemblages are A, B, and D."
    ],
    "check": "Adjudicated under IAPT 2022 examination standards.",
    "limitingCheck": "Adjudicated under IAPT 2022 examination standards.",
    "trapWarning": "Fault N09 Answer Isolation: Raw key withheld client-side; formative reasoning steps provided.",
    "correctKey": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "figures": [],
    "linkedCoreRoles": [
      "CORE1A",
      "CORE1B",
      "CORE2A",
      "CORE2B"
    ],
    "primaryCapabilityRef": "CAP-NSEJS-2022-B-Q51",
    "status": "RELEASED",
    "academicAdmission": "HOLD (Grade9 v4.1 Parity Candidate)",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "sourceOrigin": "NSEJS Custody (Grade9v4.1)"
  },
  {
    "id": "NSEJS-2022-B-Q52",
    "code": "NSEJS-2022-B-Q52",
    "title": "NSEJS 2022-23 \u00b7 Q52 \u00b7 MODEL \u00b7 D2 (Score 6)",
    "subjectCode": "BIO",
    "subject": "Biology",
    "topicCode": "LIFE_PROCESSES",
    "topic": "Life Processes & Nephron Physiology",
    "subtopic": "Human Physiology",
    "exam": "NSEJS",
    "year": 2024,
    "paper": "NSEJS Core 2",
    "questionNumber": "Q52",
    "section": "Junior Science Olympiad",
    "markingScheme": "+3 / -1",
    "isCompetitive": true,
    "difficultyBand": "D2",
    "difficultyScore": 6,
    "difficultyBasis": "Cognitive demand score determined by 5-component QRT rubric.",
    "cognitiveComponents": {
      "concept_model_selection": 1,
      "representation_translation": 1,
      "reasoning_chain_length": 1,
      "algebra_computational_load": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "MODEL",
    "role": "CORE2",
    "kind": "SINGLE_CHOICE",
    "stem": "Various parts of mammalian uriniferous tubules (nephrons) take part in ultrafiltration,\nselective reabsorption by active transport, passive osmosis and secretion. In the labelled\nnephron diagram, the options separately identify: (i) part(s) having columnar epithelial\ncells with a brush border suitable for reabsorption, and (ii) those parts completely or\npoorly permeable to water. Select the desired option(s).",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) 4, 5"
      },
      {
        "id": "opt-B",
        "text": "(B) 1"
      },
      {
        "id": "opt-C",
        "text": "(C) 2, 3"
      },
      {
        "id": "opt-D",
        "text": "(D) 2, 3, 6"
      }
    ],
    "hints": [
      "[H1 (Context & Setup): Identify governing principles.] 1. Conceptual Model: Nephron segment epithelia are specialized for differential solute reabsorption and variable water permeability.",
      "[H2 (Formulation & Analysis): Key relationship.] 2. Segment-Specific Histology and Transport:",
      "[H3 (Crux Resolution): Final calculation.]   - Part 1 is the Proximal Convoluted Tubule (PCT): Lined by cuboidal/columnar epithelium with a microvillar brush border that massively amplifies apical surface area for reabsorption of 70-80% of electrolytes and water. Hence Option B is correct for (i)."
    ],
    "steps": [
      "1. Conceptual Model: Nephron segment epithelia are specialized for differential solute reabsorption and variable water permeability.",
      "2. Segment-Specific Histology and Transport:",
      "  - Part 1 is the Proximal Convoluted Tubule (PCT): Lined by cuboidal/columnar epithelium with a microvillar brush border that massively amplifies apical surface area for reabsorption of 70-80% of electrolytes and water. Hence Option B is correct for (i).",
      "  - Parts 2, 3, and 6 correspond to the descending limb, ascending limb of Henle's loop, and collecting duct. The thin ascending limb is completely impermeable to water, while the collecting duct exhibits regulated vasopressin-mediated water permeability. Hence Option D is correct for (ii).",
      "3. Conclusion: The desired options are B and D."
    ],
    "check": "Adjudicated under IAPT 2022 examination standards.",
    "limitingCheck": "Adjudicated under IAPT 2022 examination standards.",
    "trapWarning": "Fault N09 Answer Isolation: Raw key withheld client-side; formative reasoning steps provided.",
    "correctKey": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "figures": [],
    "linkedCoreRoles": [
      "CORE1A",
      "CORE1B",
      "CORE2A",
      "CORE2B"
    ],
    "primaryCapabilityRef": "CAP-NSEJS-2022-B-Q52",
    "status": "RELEASED",
    "academicAdmission": "HOLD (Grade9 v4.1 Parity Candidate)",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "sourceOrigin": "NSEJS Custody (Grade9v4.1)"
  },
  {
    "id": "NSEJS-2021-B-Q01",
    "code": "NSEJS-2021-B-Q01",
    "title": "NSEJS 2021-22 \u00b7 Q01 \u00b7 RETRIEVE \u00b7 D1 (Score 3)",
    "subjectCode": "BIO",
    "subject": "Biology",
    "topicCode": "LIFE_PROCESSES",
    "topic": "Life Processes & Nephron Physiology",
    "subtopic": "Human Physiology",
    "exam": "NSEJS",
    "year": 2024,
    "paper": "NSEJS Core 2",
    "questionNumber": "Q01",
    "section": "Junior Science Olympiad",
    "markingScheme": "+3 / -1",
    "isCompetitive": true,
    "difficultyBand": "D1",
    "difficultyScore": 3,
    "difficultyBasis": "Cognitive demand score determined by 5-component QRT rubric.",
    "cognitiveComponents": {
      "concept_model_selection": 1,
      "representation_translation": 1,
      "reasoning_chain_length": 1,
      "algebra_computational_load": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "RETRIEVE",
    "role": "CORE2",
    "kind": "SINGLE_CHOICE",
    "stem": "Which of the following is not a function of mature red blood cells (RBCs)?",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) Help in classifying blood into different blood groups"
      },
      {
        "id": "opt-B",
        "text": "(B) Help in transport of gases"
      },
      {
        "id": "opt-C",
        "text": "(C) Synthesis of immunoglobulins"
      },
      {
        "id": "opt-D",
        "text": "(D) Help in maintaining acid-base balance in the body"
      }
    ],
    "hints": [
      "[H1 (Context & Setup): Identify governing principles.] 1. Conceptual Model: Mature mammalian erythrocytes are enucleated, biconcave discs specialized for gas transport and systemic buffering via hemoglobin.",
      "[H2 (Formulation & Analysis): Key relationship.] 2. Physiological Functions Evaluation: RBC surface carbohydrate antigens (A, B, Rh) determine blood group classification (Valid); hemoglobin transports O2 and CO2 (Valid); hemoglobin histidine residues act as physiological acid-base buffers (Valid); immunoglobulins (antibodies) are synthesized and secreted exclusively by differentiated B lymphocytes (plasma cells), not erythrocytes.",
      "[H3 (Crux Resolution): Final calculation.] 3. Conclusion: Synthesis of immunoglobulins is not an erythrocyte function. Hence Option C."
    ],
    "steps": [
      "1. Conceptual Model: Mature mammalian erythrocytes are enucleated, biconcave discs specialized for gas transport and systemic buffering via hemoglobin.",
      "2. Physiological Functions Evaluation: RBC surface carbohydrate antigens (A, B, Rh) determine blood group classification (Valid); hemoglobin transports O2 and CO2 (Valid); hemoglobin histidine residues act as physiological acid-base buffers (Valid); immunoglobulins (antibodies) are synthesized and secreted exclusively by differentiated B lymphocytes (plasma cells), not erythrocytes.",
      "3. Conclusion: Synthesis of immunoglobulins is not an erythrocyte function. Hence Option C."
    ],
    "check": "Adjudicated under IAPT 2021 examination standards.",
    "limitingCheck": "Adjudicated under IAPT 2021 examination standards.",
    "trapWarning": "Fault N09 Answer Isolation: Raw key withheld client-side; formative reasoning steps provided.",
    "correctKey": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "figures": [],
    "linkedCoreRoles": [
      "CORE1A",
      "CORE1B",
      "CORE2A",
      "CORE2B"
    ],
    "primaryCapabilityRef": "CAP-NSEJS-2021-B-Q01",
    "status": "RELEASED",
    "academicAdmission": "HOLD (Grade9 v4.1 Parity Candidate)",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "sourceOrigin": "NSEJS Custody (Grade9v4.1)"
  },
  {
    "id": "NSEJS-2021-B-Q02",
    "code": "NSEJS-2021-B-Q02",
    "title": "NSEJS 2021-22 \u00b7 Q02 \u00b7 MODEL \u00b7 D2 (Score 3)",
    "subjectCode": "BIO",
    "subject": "Biology",
    "topicCode": "LIVING_WORLD",
    "topic": "Cell Biology & Molecular Genetics",
    "subtopic": "Cell & Molecular Biology",
    "exam": "NSEJS",
    "year": 2024,
    "paper": "NSEJS Core 2",
    "questionNumber": "Q02",
    "section": "Junior Science Olympiad",
    "markingScheme": "+3 / -1",
    "isCompetitive": true,
    "difficultyBand": "D2",
    "difficultyScore": 3,
    "difficultyBasis": "Cognitive demand score determined by 5-component QRT rubric.",
    "cognitiveComponents": {
      "concept_model_selection": 1,
      "representation_translation": 1,
      "reasoning_chain_length": 1,
      "algebra_computational_load": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "MODEL",
    "role": "CORE2",
    "kind": "SINGLE_CHOICE",
    "stem": "In which of the following classes of vertebrates are there groups of animals without limbs?",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) Fish, reptiles and mammals"
      },
      {
        "id": "opt-B",
        "text": "(B) Reptiles only"
      },
      {
        "id": "opt-C",
        "text": "(C) Reptiles and amphibians"
      },
      {
        "id": "opt-D",
        "text": "(D) Amphibians only"
      }
    ],
    "hints": [
      "[H1 (Context & Setup): Identify governing principles.] 1. Conceptual Model: Secondary loss of tetrapod limbs has evolved independently across multiple terrestrial vertebrate classes as an adaptation to fossorial or aquatic burrowing.",
      "[H2 (Formulation & Analysis): Key relationship.] 2. Vertebrate Lineages Analysis: Class Reptilia contains limbless orders and suborders including snakes (Serpentes) and legless lizards (Amphisbaenia, Anguidae). Class Amphibia contains the order Gymnophiona (Apoda / caecilians), which are completely limbless, serpentine burrowing amphibians.",
      "[H3 (Crux Resolution): Final calculation.] 3. Conclusion: Both Reptilia and Amphibia contain limbless vertebrate groups. Hence Option C."
    ],
    "steps": [
      "1. Conceptual Model: Secondary loss of tetrapod limbs has evolved independently across multiple terrestrial vertebrate classes as an adaptation to fossorial or aquatic burrowing.",
      "2. Vertebrate Lineages Analysis: Class Reptilia contains limbless orders and suborders including snakes (Serpentes) and legless lizards (Amphisbaenia, Anguidae). Class Amphibia contains the order Gymnophiona (Apoda / caecilians), which are completely limbless, serpentine burrowing amphibians.",
      "3. Conclusion: Both Reptilia and Amphibia contain limbless vertebrate groups. Hence Option C."
    ],
    "check": "Adjudicated under IAPT 2021 examination standards.",
    "limitingCheck": "Adjudicated under IAPT 2021 examination standards.",
    "trapWarning": "Fault N09 Answer Isolation: Raw key withheld client-side; formative reasoning steps provided.",
    "correctKey": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "figures": [],
    "linkedCoreRoles": [
      "CORE1A",
      "CORE1B",
      "CORE2A",
      "CORE2B"
    ],
    "primaryCapabilityRef": "CAP-NSEJS-2021-B-Q02",
    "status": "RELEASED",
    "academicAdmission": "HOLD (Grade9 v4.1 Parity Candidate)",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "sourceOrigin": "NSEJS Custody (Grade9v4.1)"
  },
  {
    "id": "NSEJS-2021-B-Q03",
    "code": "NSEJS-2021-B-Q03",
    "title": "NSEJS 2021-22 \u00b7 Q03 \u00b7 RETRIEVE \u00b7 D1 (Score 3)",
    "subjectCode": "BIO",
    "subject": "Biology",
    "topicCode": "LIVING_WORLD",
    "topic": "Cell Biology & Molecular Genetics",
    "subtopic": "Cell & Molecular Biology",
    "exam": "NSEJS",
    "year": 2024,
    "paper": "NSEJS Core 2",
    "questionNumber": "Q03",
    "section": "Junior Science Olympiad",
    "markingScheme": "+3 / -1",
    "isCompetitive": true,
    "difficultyBand": "D1",
    "difficultyScore": 3,
    "difficultyBasis": "Cognitive demand score determined by 5-component QRT rubric.",
    "cognitiveComponents": {
      "concept_model_selection": 1,
      "representation_translation": 1,
      "reasoning_chain_length": 1,
      "algebra_computational_load": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "RETRIEVE",
    "role": "CORE2",
    "kind": "SINGLE_CHOICE",
    "stem": "Which of the following groups has only one pair of wings?",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) Honey bee, beetle and ant"
      },
      {
        "id": "opt-B",
        "text": "(B) Butterfly, housefly and fruit fly"
      },
      {
        "id": "opt-C",
        "text": "(C) Dragonfly, butterfly and fruit fly"
      },
      {
        "id": "opt-D",
        "text": "(D) Housefly, fruit fly and mosquito"
      }
    ],
    "hints": [
      "[H1 (Context & Setup): Identify governing principles.] 1. Conceptual Model: True flies belong to the insect order Diptera, characterized by having only one single functional pair of wings on the mesothorax.",
      "[H2 (Formulation & Analysis): Key relationship.] 2. Anatomical Specialisation: In dipterans (houseflies, fruit flies Drosophila, and mosquitoes), the metathoracic hindwings are modified into club-shaped balancing sensory organs called halteres.",
      "[H3 (Crux Resolution): Final calculation.] 3. Conclusion: Housefly, fruit fly, and mosquito belong to Diptera and possess only one pair of flight wings. Hence Option D."
    ],
    "steps": [
      "1. Conceptual Model: True flies belong to the insect order Diptera, characterized by having only one single functional pair of wings on the mesothorax.",
      "2. Anatomical Specialisation: In dipterans (houseflies, fruit flies Drosophila, and mosquitoes), the metathoracic hindwings are modified into club-shaped balancing sensory organs called halteres.",
      "3. Conclusion: Housefly, fruit fly, and mosquito belong to Diptera and possess only one pair of flight wings. Hence Option D."
    ],
    "check": "Adjudicated under IAPT 2021 examination standards.",
    "limitingCheck": "Adjudicated under IAPT 2021 examination standards.",
    "trapWarning": "Fault N09 Answer Isolation: Raw key withheld client-side; formative reasoning steps provided.",
    "correctKey": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "figures": [],
    "linkedCoreRoles": [
      "CORE1A",
      "CORE1B",
      "CORE2A",
      "CORE2B"
    ],
    "primaryCapabilityRef": "CAP-NSEJS-2021-B-Q03",
    "status": "RELEASED",
    "academicAdmission": "HOLD (Grade9 v4.1 Parity Candidate)",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "sourceOrigin": "NSEJS Custody (Grade9v4.1)"
  },
  {
    "id": "NSEJS-2021-B-Q04",
    "code": "NSEJS-2021-B-Q04",
    "title": "NSEJS 2021-22 \u00b7 Q04 \u00b7 APPLY \u00b7 D2 (Score 3)",
    "subjectCode": "BIO",
    "subject": "Biology",
    "topicCode": "GENETICS",
    "topic": "Reproduction & Mendelian Heredity",
    "subtopic": "Genetics & Evolution",
    "exam": "NSEJS",
    "year": 2024,
    "paper": "NSEJS Core 2",
    "questionNumber": "Q04",
    "section": "Junior Science Olympiad",
    "markingScheme": "+3 / -1",
    "isCompetitive": true,
    "difficultyBand": "D2",
    "difficultyScore": 3,
    "difficultyBasis": "Cognitive demand score determined by 5-component QRT rubric.",
    "cognitiveComponents": {
      "concept_model_selection": 1,
      "representation_translation": 1,
      "reasoning_chain_length": 1,
      "algebra_computational_load": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "APPLY",
    "role": "CORE2",
    "kind": "SINGLE_CHOICE",
    "stem": "During an expedition to planet 'Imagitica', scientists analysed the genetic material of its\norganisms and noted:\ni. Purines and pyrimidines are unequal in amount.\nii. Thymine is absent.\niii. The material is unstable and mutates frequently.\niv. It is rapidly degraded at pH above 12.\nWhat genetic material might these organisms contain?",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) Single-stranded DNA"
      },
      {
        "id": "opt-B",
        "text": "(B) Double-stranded DNA"
      },
      {
        "id": "opt-C",
        "text": "(C) Single-stranded RNA"
      },
      {
        "id": "opt-D",
        "text": "(D) Double-stranded RNA"
      }
    ],
    "hints": [
      "[H1 (Context & Setup): Identify governing principles.] 1. Conceptual Model: Nucleic acids are structurally diagnosed by base stoichiometry (Chargaff's rules), pyrimidine identity, sugar backbone reactivity, and strandedness.",
      "[H2 (Formulation & Analysis): Key relationship.] 2. Clue-by-Clue Deduction: Clue (i) Purines != pyrimidines violates Chargaff's parity rules (A=T, G=C), establishing single-strandedness; Clue (ii) Absence of thymine indicates the presence of uracil, characteristic of RNA; Clue (iii) High mutation rate reflects lack of complementary proofreading template; Clue (iv) Rapid alkaline degradation at pH > 12 occurs via 2'-OH nucleophilic attack on phosphodiester bonds, unique to ribonucleotides.",
      "[H3 (Crux Resolution): Final calculation.] 3. Conclusion: The genetic material is single-stranded RNA. Hence Option C."
    ],
    "steps": [
      "1. Conceptual Model: Nucleic acids are structurally diagnosed by base stoichiometry (Chargaff's rules), pyrimidine identity, sugar backbone reactivity, and strandedness.",
      "2. Clue-by-Clue Deduction: Clue (i) Purines != pyrimidines violates Chargaff's parity rules (A=T, G=C), establishing single-strandedness; Clue (ii) Absence of thymine indicates the presence of uracil, characteristic of RNA; Clue (iii) High mutation rate reflects lack of complementary proofreading template; Clue (iv) Rapid alkaline degradation at pH > 12 occurs via 2'-OH nucleophilic attack on phosphodiester bonds, unique to ribonucleotides.",
      "3. Conclusion: The genetic material is single-stranded RNA. Hence Option C."
    ],
    "check": "Adjudicated under IAPT 2021 examination standards.",
    "limitingCheck": "Adjudicated under IAPT 2021 examination standards.",
    "trapWarning": "Fault N09 Answer Isolation: Raw key withheld client-side; formative reasoning steps provided.",
    "correctKey": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "figures": [],
    "linkedCoreRoles": [
      "CORE1A",
      "CORE1B",
      "CORE2A",
      "CORE2B"
    ],
    "primaryCapabilityRef": "CAP-NSEJS-2021-B-Q04",
    "status": "RELEASED",
    "academicAdmission": "HOLD (Grade9 v4.1 Parity Candidate)",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "sourceOrigin": "NSEJS Custody (Grade9v4.1)"
  },
  {
    "id": "NSEJS-2021-B-Q05",
    "code": "NSEJS-2021-B-Q05",
    "title": "NSEJS 2021-22 \u00b7 Q05 \u00b7 RETRIEVE \u00b7 D1 (Score 3)",
    "subjectCode": "BIO",
    "subject": "Biology",
    "topicCode": "LIVING_WORLD",
    "topic": "Cell Biology & Molecular Genetics",
    "subtopic": "Cell & Molecular Biology",
    "exam": "NSEJS",
    "year": 2024,
    "paper": "NSEJS Core 2",
    "questionNumber": "Q05",
    "section": "Junior Science Olympiad",
    "markingScheme": "+3 / -1",
    "isCompetitive": true,
    "difficultyBand": "D1",
    "difficultyScore": 3,
    "difficultyBasis": "Cognitive demand score determined by 5-component QRT rubric.",
    "cognitiveComponents": {
      "concept_model_selection": 1,
      "representation_translation": 1,
      "reasoning_chain_length": 1,
      "algebra_computational_load": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "RETRIEVE",
    "role": "CORE2",
    "kind": "SINGLE_CHOICE",
    "stem": "Which of the following is most likely to show aerenchyma?",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) Leaf base of mango"
      },
      {
        "id": "opt-B",
        "text": "(B) Petiole of water hyacinth"
      },
      {
        "id": "opt-C",
        "text": "(C) Seta of moss"
      },
      {
        "id": "opt-D",
        "text": "(D) Stem of Opuntia"
      }
    ],
    "hints": [
      "[H1 (Context & Setup): Identify governing principles.] 1. Conceptual Model: Aerenchyma is specialized spongy parenchymal tissue enclosing large intercellular air lacunae that provide buoyancy and gas conduction in hydrophytes.",
      "[H2 (Formulation & Analysis): Key relationship.] 2. Anatomical Exemplar: The free-floating aquatic macrophyte Eichhornia crassipes (water hyacinth) develops characteristically bulbous, spongy swollen leaf petioles packed with aerenchyma to keep leaves floating above the water surface.",
      "[H3 (Crux Resolution): Final calculation.] 3. Conclusion: Petiole of water hyacinth shows aerenchyma. Hence Option B."
    ],
    "steps": [
      "1. Conceptual Model: Aerenchyma is specialized spongy parenchymal tissue enclosing large intercellular air lacunae that provide buoyancy and gas conduction in hydrophytes.",
      "2. Anatomical Exemplar: The free-floating aquatic macrophyte Eichhornia crassipes (water hyacinth) develops characteristically bulbous, spongy swollen leaf petioles packed with aerenchyma to keep leaves floating above the water surface.",
      "3. Conclusion: Petiole of water hyacinth shows aerenchyma. Hence Option B."
    ],
    "check": "Adjudicated under IAPT 2021 examination standards.",
    "limitingCheck": "Adjudicated under IAPT 2021 examination standards.",
    "trapWarning": "Fault N09 Answer Isolation: Raw key withheld client-side; formative reasoning steps provided.",
    "correctKey": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "figures": [],
    "linkedCoreRoles": [
      "CORE1A",
      "CORE1B",
      "CORE2A",
      "CORE2B"
    ],
    "primaryCapabilityRef": "CAP-NSEJS-2021-B-Q05",
    "status": "RELEASED",
    "academicAdmission": "HOLD (Grade9 v4.1 Parity Candidate)",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "sourceOrigin": "NSEJS Custody (Grade9v4.1)"
  },
  {
    "id": "NSEJS-2021-B-Q06",
    "code": "NSEJS-2021-B-Q06",
    "title": "NSEJS 2021-22 \u00b7 Q06 \u00b7 MODEL \u00b7 D2 (Score 3)",
    "subjectCode": "BIO",
    "subject": "Biology",
    "topicCode": "LIVING_WORLD",
    "topic": "Cell Biology & Molecular Genetics",
    "subtopic": "Cell & Molecular Biology",
    "exam": "NSEJS",
    "year": 2024,
    "paper": "NSEJS Core 2",
    "questionNumber": "Q06",
    "section": "Junior Science Olympiad",
    "markingScheme": "+3 / -1",
    "isCompetitive": true,
    "difficultyBand": "D2",
    "difficultyScore": 3,
    "difficultyBasis": "Cognitive demand score determined by 5-component QRT rubric.",
    "cognitiveComponents": {
      "concept_model_selection": 1,
      "representation_translation": 1,
      "reasoning_chain_length": 1,
      "algebra_computational_load": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "MODEL",
    "role": "CORE2",
    "kind": "SINGLE_CHOICE",
    "stem": "Consider the following statements about bryophytes:\ni. Their plant body is differentiated into true root, stem and leaves.\nii. They lack xylem and phloem.\niii. They require water for completion of the life cycle.\nWhich statement(s) is/are true?",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) ii only"
      },
      {
        "id": "opt-B",
        "text": "(B) i and ii"
      },
      {
        "id": "opt-C",
        "text": "(C) i and iii"
      },
      {
        "id": "opt-D",
        "text": "(D) ii and iii"
      }
    ],
    "hints": [
      "[H1 (Context & Setup): Identify governing principles.] 1. Conceptual Model: Bryophytes (mosses, liverworts, hornworts) represent the earliest non-vascular land plants (embryophytes).",
      "[H2 (Formulation & Analysis): Key relationship.] 2. Statement Verification: Statement (i) is false: bryophytes lack true vascular roots, stems, or leaves (possessing rhizoids and caulids/phylloids). Statement (ii) is true: bryophytes lack specialized vascular tissues (xylem and phloem). Statement (iii) is true: flagellated motile antherozoids require a thin film of external water to swim toward the archegonium for fertilisation.",
      "[H3 (Crux Resolution): Final calculation.] 3. Conclusion: Statements ii and iii are true. Hence Option D."
    ],
    "steps": [
      "1. Conceptual Model: Bryophytes (mosses, liverworts, hornworts) represent the earliest non-vascular land plants (embryophytes).",
      "2. Statement Verification: Statement (i) is false: bryophytes lack true vascular roots, stems, or leaves (possessing rhizoids and caulids/phylloids). Statement (ii) is true: bryophytes lack specialized vascular tissues (xylem and phloem). Statement (iii) is true: flagellated motile antherozoids require a thin film of external water to swim toward the archegonium for fertilisation.",
      "3. Conclusion: Statements ii and iii are true. Hence Option D."
    ],
    "check": "Adjudicated under IAPT 2021 examination standards.",
    "limitingCheck": "Adjudicated under IAPT 2021 examination standards.",
    "trapWarning": "Fault N09 Answer Isolation: Raw key withheld client-side; formative reasoning steps provided.",
    "correctKey": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "figures": [],
    "linkedCoreRoles": [
      "CORE1A",
      "CORE1B",
      "CORE2A",
      "CORE2B"
    ],
    "primaryCapabilityRef": "CAP-NSEJS-2021-B-Q06",
    "status": "RELEASED",
    "academicAdmission": "HOLD (Grade9 v4.1 Parity Candidate)",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "sourceOrigin": "NSEJS Custody (Grade9v4.1)"
  },
  {
    "id": "NSEJS-2021-B-Q07",
    "code": "NSEJS-2021-B-Q07",
    "title": "NSEJS 2021-22 \u00b7 Q07 \u00b7 RETRIEVE \u00b7 D1 (Score 3)",
    "subjectCode": "BIO",
    "subject": "Biology",
    "topicCode": "LIFE_PROCESSES",
    "topic": "Life Processes & Nephron Physiology",
    "subtopic": "Human Physiology",
    "exam": "NSEJS",
    "year": 2024,
    "paper": "NSEJS Core 2",
    "questionNumber": "Q07",
    "section": "Junior Science Olympiad",
    "markingScheme": "+3 / -1",
    "isCompetitive": true,
    "difficultyBand": "D1",
    "difficultyScore": 3,
    "difficultyBasis": "Cognitive demand score determined by 5-component QRT rubric.",
    "cognitiveComponents": {
      "concept_model_selection": 1,
      "representation_translation": 1,
      "reasoning_chain_length": 1,
      "algebra_computational_load": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "RETRIEVE",
    "role": "CORE2",
    "kind": "SINGLE_CHOICE",
    "stem": "Carbon fixation in most succulent plants takes place through which pathway?",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) Calvin cycle"
      },
      {
        "id": "opt-B",
        "text": "(B) Glycolate pathway"
      },
      {
        "id": "opt-C",
        "text": "(C) Crassulacean acid metabolism pathway"
      },
      {
        "id": "opt-D",
        "text": "(D) Hatch-Slack pathway"
      }
    ],
    "hints": [
      "[H1 (Context & Setup): Identify governing principles.] 1. Conceptual Model: Desert succulents conserve water by decoupling photosynthetic carbon fixation across diurnal phases.",
      "[H2 (Formulation & Analysis): Key relationship.] 2. Pathway Mechanism: In Crassulacean Acid Metabolism (CAM), stomata open nocturnally to take up CO2, which is fixed by PEP carboxylase into oxaloacetate and stored as malate in large central vacuoles. During daylight, stomata close to prevent transpirational water loss while malate is decarboxylated to release CO2 for the Calvin cycle.",
      "[H3 (Crux Resolution): Final calculation.] 3. Conclusion: Succulents fix carbon via the Crassulacean acid metabolism pathway. Hence Option C."
    ],
    "steps": [
      "1. Conceptual Model: Desert succulents conserve water by decoupling photosynthetic carbon fixation across diurnal phases.",
      "2. Pathway Mechanism: In Crassulacean Acid Metabolism (CAM), stomata open nocturnally to take up CO2, which is fixed by PEP carboxylase into oxaloacetate and stored as malate in large central vacuoles. During daylight, stomata close to prevent transpirational water loss while malate is decarboxylated to release CO2 for the Calvin cycle.",
      "3. Conclusion: Succulents fix carbon via the Crassulacean acid metabolism pathway. Hence Option C."
    ],
    "check": "Adjudicated under IAPT 2021 examination standards.",
    "limitingCheck": "Adjudicated under IAPT 2021 examination standards.",
    "trapWarning": "Fault N09 Answer Isolation: Raw key withheld client-side; formative reasoning steps provided.",
    "correctKey": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "figures": [],
    "linkedCoreRoles": [
      "CORE1A",
      "CORE1B",
      "CORE2A",
      "CORE2B"
    ],
    "primaryCapabilityRef": "CAP-NSEJS-2021-B-Q07",
    "status": "RELEASED",
    "academicAdmission": "HOLD (Grade9 v4.1 Parity Candidate)",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "sourceOrigin": "NSEJS Custody (Grade9v4.1)"
  },
  {
    "id": "NSEJS-2021-B-Q08",
    "code": "NSEJS-2021-B-Q08",
    "title": "NSEJS 2021-22 \u00b7 Q08 \u00b7 RETRIEVE \u00b7 D1 (Score 3)",
    "subjectCode": "BIO",
    "subject": "Biology",
    "topicCode": "ENVIRONMENT",
    "topic": "Ecology & Ecosystem Resources",
    "subtopic": "Ecology & Environment",
    "exam": "NSEJS",
    "year": 2024,
    "paper": "NSEJS Core 2",
    "questionNumber": "Q08",
    "section": "Junior Science Olympiad",
    "markingScheme": "+3 / -1",
    "isCompetitive": true,
    "difficultyBand": "D1",
    "difficultyScore": 3,
    "difficultyBasis": "Cognitive demand score determined by 5-component QRT rubric.",
    "cognitiveComponents": {
      "concept_model_selection": 1,
      "representation_translation": 1,
      "reasoning_chain_length": 1,
      "algebra_computational_load": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "RETRIEVE",
    "role": "CORE2",
    "kind": "SINGLE_CHOICE",
    "stem": "A flower is large, wide-mouthed and white, opens after sunset, and gives out a fruity or\nmusky fragrance. It is most likely pollinated by:",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) Birds"
      },
      {
        "id": "opt-B",
        "text": "(B) Bats"
      },
      {
        "id": "opt-C",
        "text": "(C) Insects"
      },
      {
        "id": "opt-D",
        "text": "(D) Baboons"
      }
    ],
    "hints": [
      "[H1 (Context & Setup): Identify governing principles.] 1. Conceptual Model: Floral syndromes reflect coevolutionary morphological adaptations between angiosperm flowers and their specific pollen vectors.",
      "[H2 (Formulation & Analysis): Key relationship.] 2. Chiropterophily Characteristics: Flowers pollinated by nocturnal megabats (e.g. Adansonia, Kigelia) are characteristically large, robust, bell-shaped or wide-mouthed, nocturnal blooming, white or pale-coloured for nocturnal visibility, and emit strong musky, fruity, or fermenting odors.",
      "[H3 (Crux Resolution): Final calculation.] 3. Conclusion: The flower is pollinated by bats. Hence Option B."
    ],
    "steps": [
      "1. Conceptual Model: Floral syndromes reflect coevolutionary morphological adaptations between angiosperm flowers and their specific pollen vectors.",
      "2. Chiropterophily Characteristics: Flowers pollinated by nocturnal megabats (e.g. Adansonia, Kigelia) are characteristically large, robust, bell-shaped or wide-mouthed, nocturnal blooming, white or pale-coloured for nocturnal visibility, and emit strong musky, fruity, or fermenting odors.",
      "3. Conclusion: The flower is pollinated by bats. Hence Option B."
    ],
    "check": "Adjudicated under IAPT 2021 examination standards.",
    "limitingCheck": "Adjudicated under IAPT 2021 examination standards.",
    "trapWarning": "Fault N09 Answer Isolation: Raw key withheld client-side; formative reasoning steps provided.",
    "correctKey": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "figures": [],
    "linkedCoreRoles": [
      "CORE1A",
      "CORE1B",
      "CORE2A",
      "CORE2B"
    ],
    "primaryCapabilityRef": "CAP-NSEJS-2021-B-Q08",
    "status": "RELEASED",
    "academicAdmission": "HOLD (Grade9 v4.1 Parity Candidate)",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "sourceOrigin": "NSEJS Custody (Grade9v4.1)"
  },
  {
    "id": "NSEJS-2021-B-Q25",
    "code": "NSEJS-2021-B-Q25",
    "title": "NSEJS 2021-22 \u00b7 Q25 \u00b7 JUSTIFY \u00b7 D2 (Score 6)",
    "subjectCode": "BIO",
    "subject": "Biology",
    "topicCode": "LIVING_WORLD",
    "topic": "Cell Biology & Molecular Genetics",
    "subtopic": "Cell & Molecular Biology",
    "exam": "NSEJS",
    "year": 2024,
    "paper": "NSEJS Core 2",
    "questionNumber": "Q25",
    "section": "Junior Science Olympiad",
    "markingScheme": "+3 / -1",
    "isCompetitive": true,
    "difficultyBand": "D2",
    "difficultyScore": 6,
    "difficultyBasis": "Cognitive demand score determined by 5-component QRT rubric.",
    "cognitiveComponents": {
      "concept_model_selection": 1,
      "representation_translation": 1,
      "reasoning_chain_length": 1,
      "algebra_computational_load": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "JUSTIFY",
    "role": "CORE2",
    "kind": "SINGLE_CHOICE",
    "stem": "Given below are four statements about viruses. Which statement(s) is/are incorrect?",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) All known viruses contain RNA as the genetic material."
      },
      {
        "id": "opt-B",
        "text": "(B) During viral multiplication, a complementary DNA is produced in riboviruses."
      },
      {
        "id": "opt-C",
        "text": "(C) Viruses are the smallest, freely living cells found on the planet."
      },
      {
        "id": "opt-D",
        "text": "(D) DNA-containing viruses are more susceptible to mutations than RNA-containing viruses and hence show very rapid evolution."
      }
    ],
    "hints": [
      "[H1 (Context & Setup): Identify governing principles.] 1. Conceptual Model: Viruses are obligate intracellular acellular biological entities containing nucleic acid encased in a capsid.",
      "[H2 (Formulation & Analysis): Key relationship.] 2. Analysis of Statements for Inaccuracies: Statement A is incorrect: viruses are classified into DNA viruses and RNA viruses; not all contain RNA. Statement B is correct: retroviruses synthesize cDNA from viral RNA templates via reverse transcriptase. Statement C is incorrect: viruses are non-cellular (acellular) assemblies, not free-living cells. Statement D is incorrect: RNA viruses lack 3'->5' exonuclease proofreading polymerase activity, causing them to mutate and evolve much faster than DNA viruses.",
      "[H3 (Crux Resolution): Final calculation.] 3. Conclusion: Statements A, C, and D are incorrect. Hence Options A, C, D."
    ],
    "steps": [
      "1. Conceptual Model: Viruses are obligate intracellular acellular biological entities containing nucleic acid encased in a capsid.",
      "2. Analysis of Statements for Inaccuracies: Statement A is incorrect: viruses are classified into DNA viruses and RNA viruses; not all contain RNA. Statement B is correct: retroviruses synthesize cDNA from viral RNA templates via reverse transcriptase. Statement C is incorrect: viruses are non-cellular (acellular) assemblies, not free-living cells. Statement D is incorrect: RNA viruses lack 3'->5' exonuclease proofreading polymerase activity, causing them to mutate and evolve much faster than DNA viruses.",
      "3. Conclusion: Statements A, C, and D are incorrect. Hence Options A, C, D."
    ],
    "check": "Adjudicated under IAPT 2021 examination standards.",
    "limitingCheck": "Adjudicated under IAPT 2021 examination standards.",
    "trapWarning": "Fault N09 Answer Isolation: Raw key withheld client-side; formative reasoning steps provided.",
    "correctKey": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "figures": [],
    "linkedCoreRoles": [
      "CORE1A",
      "CORE1B",
      "CORE2A",
      "CORE2B"
    ],
    "primaryCapabilityRef": "CAP-NSEJS-2021-B-Q25",
    "status": "RELEASED",
    "academicAdmission": "HOLD (Grade9 v4.1 Parity Candidate)",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "sourceOrigin": "NSEJS Custody (Grade9v4.1)"
  },
  {
    "id": "NSEJS-2021-B-Q26",
    "code": "NSEJS-2021-B-Q26",
    "title": "NSEJS 2021-22 \u00b7 Q26 \u00b7 MODEL \u00b7 D2 (Score 6)",
    "subjectCode": "BIO",
    "subject": "Biology",
    "topicCode": "COORDINATION",
    "topic": "Control & Endocrine Coordination / Immunology",
    "subtopic": "Systems & Regulation",
    "exam": "NSEJS",
    "year": 2024,
    "paper": "NSEJS Core 2",
    "questionNumber": "Q26",
    "section": "Junior Science Olympiad",
    "markingScheme": "+3 / -1",
    "isCompetitive": true,
    "difficultyBand": "D2",
    "difficultyScore": 6,
    "difficultyBasis": "Cognitive demand score determined by 5-component QRT rubric.",
    "cognitiveComponents": {
      "concept_model_selection": 1,
      "representation_translation": 1,
      "reasoning_chain_length": 1,
      "algebra_computational_load": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "MODEL",
    "role": "CORE2",
    "kind": "SINGLE_CHOICE",
    "stem": "A person suffers an injury to the front part of the head. Which outcomes are possible?",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) Trouble in speaking properly"
      },
      {
        "id": "opt-B",
        "text": "(B) Inability to smell"
      },
      {
        "id": "opt-C",
        "text": "(C) Inability to walk on a narrow path"
      },
      {
        "id": "opt-D",
        "text": "(D) Inability to maintain blood pressure"
      }
    ],
    "hints": [
      "[H1 (Context & Setup): Identify governing principles.] 1. Conceptual Model: Cortical functional localization assigns distinct cognitive, motor, and sensory modalities to cerebral lobes.",
      "[H2 (Formulation & Analysis): Key relationship.] 2. Frontal Lobe Functional Mapping: Broca's motor speech area in the inferior frontal gyrus governs speech production (damage causes motor aphasia: Option A); the olfactory tract runs beneath the frontal lobe orbital surface (damage causes anosmia: Option B); frontal motor and premotor cortices plan gait and balance (damage causes frontal gait apraxia: Option C). Systemic blood pressure vasomotor tone is regulated by the medulla oblongata, not the frontal cortex.",
      "[H3 (Crux Resolution): Final calculation.] 3. Synthesis: Frontal injury can cause A, B, and C. Hence Options A, B, C."
    ],
    "steps": [
      "1. Conceptual Model: Cortical functional localization assigns distinct cognitive, motor, and sensory modalities to cerebral lobes.",
      "2. Frontal Lobe Functional Mapping: Broca's motor speech area in the inferior frontal gyrus governs speech production (damage causes motor aphasia: Option A); the olfactory tract runs beneath the frontal lobe orbital surface (damage causes anosmia: Option B); frontal motor and premotor cortices plan gait and balance (damage causes frontal gait apraxia: Option C). Systemic blood pressure vasomotor tone is regulated by the medulla oblongata, not the frontal cortex.",
      "3. Synthesis: Frontal injury can cause A, B, and C. Hence Options A, B, C."
    ],
    "check": "Adjudicated under IAPT 2021 examination standards.",
    "limitingCheck": "Adjudicated under IAPT 2021 examination standards.",
    "trapWarning": "Fault N09 Answer Isolation: Raw key withheld client-side; formative reasoning steps provided.",
    "correctKey": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "figures": [],
    "linkedCoreRoles": [
      "CORE1A",
      "CORE1B",
      "CORE2A",
      "CORE2B"
    ],
    "primaryCapabilityRef": "CAP-NSEJS-2021-B-Q26",
    "status": "RELEASED",
    "academicAdmission": "HOLD (Grade9 v4.1 Parity Candidate)",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "sourceOrigin": "NSEJS Custody (Grade9v4.1)"
  },
  {
    "id": "NSEJS-2021-B-Q27",
    "code": "NSEJS-2021-B-Q27",
    "title": "NSEJS 2021-22 \u00b7 Q27 \u00b7 EXPLAIN \u00b7 D2 (Score 6)",
    "subjectCode": "BIO",
    "subject": "Biology",
    "topicCode": "LIVING_WORLD",
    "topic": "Cell Biology & Molecular Genetics",
    "subtopic": "Cell & Molecular Biology",
    "exam": "NSEJS",
    "year": 2024,
    "paper": "NSEJS Core 2",
    "questionNumber": "Q27",
    "section": "Junior Science Olympiad",
    "markingScheme": "+3 / -1",
    "isCompetitive": true,
    "difficultyBand": "D2",
    "difficultyScore": 6,
    "difficultyBasis": "Cognitive demand score determined by 5-component QRT rubric.",
    "cognitiveComponents": {
      "concept_model_selection": 1,
      "representation_translation": 1,
      "reasoning_chain_length": 1,
      "algebra_computational_load": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "EXPLAIN",
    "role": "CORE2",
    "kind": "SINGLE_CHOICE",
    "stem": "Which molecules are primarily responsible for structural support and motility?",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) Actin"
      },
      {
        "id": "opt-B",
        "text": "(B) Alpha-tubulin"
      },
      {
        "id": "opt-C",
        "text": "(C) Lamins"
      },
      {
        "id": "opt-D",
        "text": "(D) Desmin"
      }
    ],
    "hints": [
      "[H1 (Context & Setup): Identify governing principles.] 1. Conceptual Model: The eukaryotic cytoskeleton comprises microfilaments, microtubules, and intermediate filaments with distinct mechanical and dynamic properties.",
      "[H2 (Formulation & Analysis): Key relationship.] 2. Cytoskeletal Elements and Motility: Actin filaments (microfilaments) drive amoeboid motility, muscle contraction with myosin, cytoplasmic streaming, and cytokinesis (Option A). Alpha-tubulin (together with beta-tubulin) forms hollow cylindrical microtubules powering flagellar/ciliary beating, intracellular vesicular transport, and mitotic spindle segregation (Option B). Lamins and desmin are intermediate filaments providing structural tension but not active motility.",
      "[H3 (Crux Resolution): Final calculation.] 3. Conclusion: Molecules primarily responsible for motility and structural dynamic support are actin and alpha-tubulin. Hence Options A, B."
    ],
    "steps": [
      "1. Conceptual Model: The eukaryotic cytoskeleton comprises microfilaments, microtubules, and intermediate filaments with distinct mechanical and dynamic properties.",
      "2. Cytoskeletal Elements and Motility: Actin filaments (microfilaments) drive amoeboid motility, muscle contraction with myosin, cytoplasmic streaming, and cytokinesis (Option A). Alpha-tubulin (together with beta-tubulin) forms hollow cylindrical microtubules powering flagellar/ciliary beating, intracellular vesicular transport, and mitotic spindle segregation (Option B). Lamins and desmin are intermediate filaments providing structural tension but not active motility.",
      "3. Conclusion: Molecules primarily responsible for motility and structural dynamic support are actin and alpha-tubulin. Hence Options A, B."
    ],
    "check": "Adjudicated under IAPT 2021 examination standards.",
    "limitingCheck": "Adjudicated under IAPT 2021 examination standards.",
    "trapWarning": "Fault N09 Answer Isolation: Raw key withheld client-side; formative reasoning steps provided.",
    "correctKey": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "figures": [],
    "linkedCoreRoles": [
      "CORE1A",
      "CORE1B",
      "CORE2A",
      "CORE2B"
    ],
    "primaryCapabilityRef": "CAP-NSEJS-2021-B-Q27",
    "status": "RELEASED",
    "academicAdmission": "HOLD (Grade9 v4.1 Parity Candidate)",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "sourceOrigin": "NSEJS Custody (Grade9v4.1)"
  },
  {
    "id": "NSEJS-2020-B-Q13",
    "code": "NSEJS-2020-B-Q13",
    "title": "NSEJS 2020-21 \u00b7 Q13 \u00b7 APPLY \u00b7 D1 (Score 3)",
    "subjectCode": "BIO",
    "subject": "Biology",
    "topicCode": "GENETICS",
    "topic": "Reproduction & Mendelian Heredity",
    "subtopic": "Genetics & Evolution",
    "exam": "NSEJS",
    "year": 2024,
    "paper": "NSEJS Core 2",
    "questionNumber": "Q13",
    "section": "Junior Science Olympiad",
    "markingScheme": "+3 / -1",
    "isCompetitive": true,
    "difficultyBand": "D1",
    "difficultyScore": 3,
    "difficultyBasis": "Cognitive demand score determined by 5-component QRT rubric.",
    "cognitiveComponents": {
      "concept_model_selection": 1,
      "representation_translation": 1,
      "reasoning_chain_length": 1,
      "algebra_computational_load": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "APPLY",
    "role": "CORE2",
    "kind": "SINGLE_CHOICE",
    "stem": "If in a wheat mutant, the length of chromosome 1B was found to be 6.7 \u00b5m instead of 5.0 \u00b5m, approximately how many additional base pairs are incorporated in the mutant chromosome?",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) 0.5 \u00d7 104 bp"
      },
      {
        "id": "opt-B",
        "text": "(B) 5 \u00d7 104 bp"
      },
      {
        "id": "opt-C",
        "text": "(C) 1.7 \u00d7 104 bp"
      },
      {
        "id": "opt-D",
        "text": "(D) 5.78 \u00d7 104 bp"
      }
    ],
    "hints": [
      "[H1 (Context & Setup): Identify governing principles.] 1. Conceptual Model: Standard double-stranded B-DNA has a helical rise per base pair of 0.34 nm = 0.34 * 10^-3 micrometres.",
      "[H2 (Formulation & Analysis): Key relationship.] 2. Quantitative Calculation: Initial chromosome length L1 = 5.0 micrometres, mutant length L2 = 6.7 micrometres. Net extension delta L = 6.7 - 5.0 = 1.7 micrometres = 1700 nm. The number of additional base pairs incorporated is N_bp = 1700 nm / (0.34 nm/bp) = 5000 bp = 0.5 * 10^4 bp.",
      "[H3 (Crux Resolution): Final calculation.] 3. Conclusion: The number of additional base pairs incorporated is 0.5 * 10^4 bp. Hence Option A."
    ],
    "steps": [
      "1. Conceptual Model: Standard double-stranded B-DNA has a helical rise per base pair of 0.34 nm = 0.34 * 10^-3 micrometres.",
      "2. Quantitative Calculation: Initial chromosome length L1 = 5.0 micrometres, mutant length L2 = 6.7 micrometres. Net extension delta L = 6.7 - 5.0 = 1.7 micrometres = 1700 nm. The number of additional base pairs incorporated is N_bp = 1700 nm / (0.34 nm/bp) = 5000 bp = 0.5 * 10^4 bp.",
      "3. Conclusion: The number of additional base pairs incorporated is 0.5 * 10^4 bp. Hence Option A."
    ],
    "check": "Adjudicated under IAPT 2020 examination standards.",
    "limitingCheck": "Adjudicated under IAPT 2020 examination standards.",
    "trapWarning": "Fault N09 Answer Isolation: Raw key withheld client-side; formative reasoning steps provided.",
    "correctKey": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "figures": [],
    "linkedCoreRoles": [
      "CORE1A",
      "CORE1B",
      "CORE2A",
      "CORE2B"
    ],
    "primaryCapabilityRef": "CAP-NSEJS-2020-B-Q13",
    "status": "RELEASED",
    "academicAdmission": "HOLD (Grade9 v4.1 Parity Candidate)",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "sourceOrigin": "NSEJS Custody (Grade9v4.1)"
  },
  {
    "id": "NSEJS-2020-B-Q14",
    "code": "NSEJS-2020-B-Q14",
    "title": "NSEJS 2020-21 \u00b7 Q14 \u00b7 MODEL \u00b7 D2 (Score 3)",
    "subjectCode": "BIO",
    "subject": "Biology",
    "topicCode": "GENETICS",
    "topic": "Reproduction & Mendelian Heredity",
    "subtopic": "Genetics & Evolution",
    "exam": "NSEJS",
    "year": 2024,
    "paper": "NSEJS Core 2",
    "questionNumber": "Q14",
    "section": "Junior Science Olympiad",
    "markingScheme": "+3 / -1",
    "isCompetitive": true,
    "difficultyBand": "D2",
    "difficultyScore": 3,
    "difficultyBasis": "Cognitive demand score determined by 5-component QRT rubric.",
    "cognitiveComponents": {
      "concept_model_selection": 1,
      "representation_translation": 1,
      "reasoning_chain_length": 1,
      "algebra_computational_load": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "MODEL",
    "role": "CORE2",
    "kind": "SINGLE_CHOICE",
    "stem": "Considering the following characteristics, identify the correct inheritance pattern from the given options. \u2022 Most affected individuals are male. \u2022 Affected sons result from female parents who are either affected or who are known to be carriers because they have affected brothers, fathers, or maternal uncles. \u2022 Affected daughters are born to affected fathers and either affected or carrier mothers. \u2022 The sons of affected mothers should be affected. \u2022 Approximately half the sons of carrier mothers should be affected.",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) Autosomal recessive inheritance"
      },
      {
        "id": "opt-B",
        "text": "(B) Autosomal dominant inheritance"
      },
      {
        "id": "opt-C",
        "text": "(C) Sex-linked recessive inheritance"
      },
      {
        "id": "opt-D",
        "text": "(D) Sex-linked dominant inheritance 6"
      }
    ],
    "hints": [
      "[H1 (Context & Setup): Identify governing principles.] 1. Conceptual Model: In XY chromosomal sex determination, males are hemizygous for genes on the X chromosome and express any recessive allele carried on their maternal X.",
      "[H2 (Formulation & Analysis): Key relationship.] 2. Pedigree Criteria Evaluation: Male predominance occurs because a single mutant X allele confers the trait in males. Affected sons are born to carrier or affected mothers (inheriting mutant maternal X). Affected daughters require an affected father donating the mutant paternal X and a carrier or affected mother. All sons of affected homozygous mothers are affected. These classic criteria establish sex-linked recessive inheritance.",
      "[H3 (Crux Resolution): Final calculation.] 3. Conclusion: The inheritance pattern is sex-linked recessive inheritance. Hence Option C."
    ],
    "steps": [
      "1. Conceptual Model: In XY chromosomal sex determination, males are hemizygous for genes on the X chromosome and express any recessive allele carried on their maternal X.",
      "2. Pedigree Criteria Evaluation: Male predominance occurs because a single mutant X allele confers the trait in males. Affected sons are born to carrier or affected mothers (inheriting mutant maternal X). Affected daughters require an affected father donating the mutant paternal X and a carrier or affected mother. All sons of affected homozygous mothers are affected. These classic criteria establish sex-linked recessive inheritance.",
      "3. Conclusion: The inheritance pattern is sex-linked recessive inheritance. Hence Option C."
    ],
    "check": "Adjudicated under IAPT 2020 examination standards.",
    "limitingCheck": "Adjudicated under IAPT 2020 examination standards.",
    "trapWarning": "Fault N09 Answer Isolation: Raw key withheld client-side; formative reasoning steps provided.",
    "correctKey": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "figures": [],
    "linkedCoreRoles": [
      "CORE1A",
      "CORE1B",
      "CORE2A",
      "CORE2B"
    ],
    "primaryCapabilityRef": "CAP-NSEJS-2020-B-Q14",
    "status": "RELEASED",
    "academicAdmission": "HOLD (Grade9 v4.1 Parity Candidate)",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "sourceOrigin": "NSEJS Custody (Grade9v4.1)"
  },
  {
    "id": "NSEJS-2020-B-Q15",
    "code": "NSEJS-2020-B-Q15",
    "title": "NSEJS 2020-21 \u00b7 Q15 \u00b7 RETRIEVE \u00b7 D1 (Score 3)",
    "subjectCode": "BIO",
    "subject": "Biology",
    "topicCode": "ENVIRONMENT",
    "topic": "Ecology & Ecosystem Resources",
    "subtopic": "Ecology & Environment",
    "exam": "NSEJS",
    "year": 2024,
    "paper": "NSEJS Core 2",
    "questionNumber": "Q15",
    "section": "Junior Science Olympiad",
    "markingScheme": "+3 / -1",
    "isCompetitive": true,
    "difficultyBand": "D1",
    "difficultyScore": 3,
    "difficultyBasis": "Cognitive demand score determined by 5-component QRT rubric.",
    "cognitiveComponents": {
      "concept_model_selection": 1,
      "representation_translation": 1,
      "reasoning_chain_length": 1,
      "algebra_computational_load": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "RETRIEVE",
    "role": "CORE2",
    "kind": "SINGLE_CHOICE",
    "stem": "In a marine ecosystem with rich diversity of fauna, which of the following images would be a correct representation of the pyramid of biomass?",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) Upright pyramid with broad producer base and progressive tapering toward tertiary consumers"
      },
      {
        "id": "opt-B",
        "text": "(B) Spindle-shaped pyramid with constricted intermediate consumer tiers"
      },
      {
        "id": "opt-C",
        "text": "(C) Uniform columnar pyramid with equivalent standing biomass across trophic levels"
      },
      {
        "id": "opt-D",
        "text": "(D) Inverted pyramid of biomass (standing crop biomass of phytoplankton producers is smaller than zooplankton/fish consumers at any given instant)"
      }
    ],
    "hints": [
      "[H1 (Context & Setup): Identify governing principles.] 1. Conceptual Model: An ecological pyramid of biomass depicts the standing crop dry weight of organisms across successive trophic levels at an instantaneous sampling point.",
      "[H2 (Formulation & Analysis): Key relationship.] 2. Marine Trophic Dynamics: In open marine ecosystems, microscopic phytoplankton primary producers have rapid turnover rates and short lifespans. Their instantaneous standing biomass is consistently smaller than the longer-lived zooplankton and fish feeding upon them, producing an inverted biomass pyramid.",
      "[H3 (Crux Resolution): Final calculation.] 3. Conclusion: An inverted pyramid of biomass correctly depicts the marine ecosystem. Hence Option D."
    ],
    "steps": [
      "1. Conceptual Model: An ecological pyramid of biomass depicts the standing crop dry weight of organisms across successive trophic levels at an instantaneous sampling point.",
      "2. Marine Trophic Dynamics: In open marine ecosystems, microscopic phytoplankton primary producers have rapid turnover rates and short lifespans. Their instantaneous standing biomass is consistently smaller than the longer-lived zooplankton and fish feeding upon them, producing an inverted biomass pyramid.",
      "3. Conclusion: An inverted pyramid of biomass correctly depicts the marine ecosystem. Hence Option D."
    ],
    "check": "Adjudicated under IAPT 2020 examination standards.",
    "limitingCheck": "Adjudicated under IAPT 2020 examination standards.",
    "trapWarning": "Fault N09 Answer Isolation: Raw key withheld client-side; formative reasoning steps provided.",
    "correctKey": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "figures": [],
    "linkedCoreRoles": [
      "CORE1A",
      "CORE1B",
      "CORE2A",
      "CORE2B"
    ],
    "primaryCapabilityRef": "CAP-NSEJS-2020-B-Q15",
    "status": "RELEASED",
    "academicAdmission": "HOLD (Grade9 v4.1 Parity Candidate)",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "sourceOrigin": "NSEJS Custody (Grade9v4.1)"
  },
  {
    "id": "NSEJS-2020-B-Q16",
    "code": "NSEJS-2020-B-Q16",
    "title": "NSEJS 2020-21 \u00b7 Q16 \u00b7 APPLY \u00b7 D1 (Score 3)",
    "subjectCode": "BIO",
    "subject": "Biology",
    "topicCode": "LIFE_PROCESSES",
    "topic": "Life Processes & Nephron Physiology",
    "subtopic": "Human Physiology",
    "exam": "NSEJS",
    "year": 2024,
    "paper": "NSEJS Core 2",
    "questionNumber": "Q16",
    "section": "Junior Science Olympiad",
    "markingScheme": "+3 / -1",
    "isCompetitive": true,
    "difficultyBand": "D1",
    "difficultyScore": 3,
    "difficultyBasis": "Cognitive demand score determined by 5-component QRT rubric.",
    "cognitiveComponents": {
      "concept_model_selection": 1,
      "representation_translation": 1,
      "reasoning_chain_length": 1,
      "algebra_computational_load": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "APPLY",
    "role": "CORE2",
    "kind": "SINGLE_CHOICE",
    "stem": "The transpiration pull is maximum under which of the following conditions?",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) Closed stomata, low light intensity and humid air"
      },
      {
        "id": "opt-B",
        "text": "(B) Open stomata, dry air and moist soil"
      },
      {
        "id": "opt-C",
        "text": "(C) Open stomata, dry air and dry soil"
      },
      {
        "id": "opt-D",
        "text": "(D) Open stomata, high humidity in air and moist soil"
      }
    ],
    "hints": [
      "[H1 (Context & Setup): Identify governing principles.] 1. Conceptual Model: Transpiration pull is driven by the water potential gradient between moist soil, internal mesophyll air spaces, and ambient atmosphere.",
      "[H2 (Formulation & Analysis): Key relationship.] 2. Environmental Rate Factors: Open stomata minimize stomatal diffusion resistance; dry air maximizes the vapor pressure deficit and atmospheric water potential sink; moist soil supplies continuous water to roots to sustain cohesive xylem sap columns without cavitation.",
      "[H3 (Crux Resolution): Final calculation.] 3. Conclusion: Transpiration pull is maximum under open stomata, dry air, and moist soil. Hence Option B."
    ],
    "steps": [
      "1. Conceptual Model: Transpiration pull is driven by the water potential gradient between moist soil, internal mesophyll air spaces, and ambient atmosphere.",
      "2. Environmental Rate Factors: Open stomata minimize stomatal diffusion resistance; dry air maximizes the vapor pressure deficit and atmospheric water potential sink; moist soil supplies continuous water to roots to sustain cohesive xylem sap columns without cavitation.",
      "3. Conclusion: Transpiration pull is maximum under open stomata, dry air, and moist soil. Hence Option B."
    ],
    "check": "Adjudicated under IAPT 2020 examination standards.",
    "limitingCheck": "Adjudicated under IAPT 2020 examination standards.",
    "trapWarning": "Fault N09 Answer Isolation: Raw key withheld client-side; formative reasoning steps provided.",
    "correctKey": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "figures": [],
    "linkedCoreRoles": [
      "CORE1A",
      "CORE1B",
      "CORE2A",
      "CORE2B"
    ],
    "primaryCapabilityRef": "CAP-NSEJS-2020-B-Q16",
    "status": "RELEASED",
    "academicAdmission": "HOLD (Grade9 v4.1 Parity Candidate)",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "sourceOrigin": "NSEJS Custody (Grade9v4.1)"
  },
  {
    "id": "NSEJS-2020-B-Q17",
    "code": "NSEJS-2020-B-Q17",
    "title": "NSEJS 2020-21 \u00b7 Q17 \u00b7 RETRIEVE \u00b7 D1 (Score 3)",
    "subjectCode": "BIO",
    "subject": "Biology",
    "topicCode": "ENVIRONMENT",
    "topic": "Ecology & Ecosystem Resources",
    "subtopic": "Ecology & Environment",
    "exam": "NSEJS",
    "year": 2024,
    "paper": "NSEJS Core 2",
    "questionNumber": "Q17",
    "section": "Junior Science Olympiad",
    "markingScheme": "+3 / -1",
    "isCompetitive": true,
    "difficultyBand": "D1",
    "difficultyScore": 3,
    "difficultyBasis": "Cognitive demand score determined by 5-component QRT rubric.",
    "cognitiveComponents": {
      "concept_model_selection": 1,
      "representation_translation": 1,
      "reasoning_chain_length": 1,
      "algebra_computational_load": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "RETRIEVE",
    "role": "CORE2",
    "kind": "SINGLE_CHOICE",
    "stem": "Curcuma longa, Azadirachta indica, Basmati Rice and Indian Ginseng are all related to which of the following concepts?",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) Bioterrorism"
      },
      {
        "id": "opt-B",
        "text": "(B) Biomagnification"
      },
      {
        "id": "opt-C",
        "text": "(C) Biopiracy"
      },
      {
        "id": "opt-D",
        "text": "(D) Biodegradation"
      }
    ],
    "hints": [
      "[H1 (Context & Setup): Identify governing principles.] 1. Conceptual Model: Biopiracy refers to the commercial exploitation or unauthorized patenting of indigenous biological resources and traditional knowledge by external entities without consent or equitable benefit-sharing.",
      "[H2 (Formulation & Analysis): Key relationship.] 2. Landmark Indian Case Studies: Curcuma longa (turmeric wound healing), Azadirachta indica (neem fungicidal properties), Basmati Rice (foreign strain patents), and Indian Ginseng (Ashwagandha) all represent historic international intellectual property disputes where India successfully contested or resisted unauthorized commercial claims.",
      "[H3 (Crux Resolution): Final calculation.] 3. Conclusion: These examples relate directly to the concept of biopiracy. Hence Option C."
    ],
    "steps": [
      "1. Conceptual Model: Biopiracy refers to the commercial exploitation or unauthorized patenting of indigenous biological resources and traditional knowledge by external entities without consent or equitable benefit-sharing.",
      "2. Landmark Indian Case Studies: Curcuma longa (turmeric wound healing), Azadirachta indica (neem fungicidal properties), Basmati Rice (foreign strain patents), and Indian Ginseng (Ashwagandha) all represent historic international intellectual property disputes where India successfully contested or resisted unauthorized commercial claims.",
      "3. Conclusion: These examples relate directly to the concept of biopiracy. Hence Option C."
    ],
    "check": "Adjudicated under IAPT 2020 examination standards.",
    "limitingCheck": "Adjudicated under IAPT 2020 examination standards.",
    "trapWarning": "Fault N09 Answer Isolation: Raw key withheld client-side; formative reasoning steps provided.",
    "correctKey": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "figures": [],
    "linkedCoreRoles": [
      "CORE1A",
      "CORE1B",
      "CORE2A",
      "CORE2B"
    ],
    "primaryCapabilityRef": "CAP-NSEJS-2020-B-Q17",
    "status": "RELEASED",
    "academicAdmission": "HOLD (Grade9 v4.1 Parity Candidate)",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "sourceOrigin": "NSEJS Custody (Grade9v4.1)"
  },
  {
    "id": "NSEJS-2020-B-Q18",
    "code": "NSEJS-2020-B-Q18",
    "title": "NSEJS 2020-21 \u00b7 Q18 \u00b7 RETRIEVE \u00b7 D1 (Score 3)",
    "subjectCode": "BIO",
    "subject": "Biology",
    "topicCode": "LIVING_WORLD",
    "topic": "Cell Biology & Molecular Genetics",
    "subtopic": "Cell & Molecular Biology",
    "exam": "NSEJS",
    "year": 2024,
    "paper": "NSEJS Core 2",
    "questionNumber": "Q18",
    "section": "Junior Science Olympiad",
    "markingScheme": "+3 / -1",
    "isCompetitive": true,
    "difficultyBand": "D1",
    "difficultyScore": 3,
    "difficultyBasis": "Cognitive demand score determined by 5-component QRT rubric.",
    "cognitiveComponents": {
      "concept_model_selection": 1,
      "representation_translation": 1,
      "reasoning_chain_length": 1,
      "algebra_computational_load": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "RETRIEVE",
    "role": "CORE2",
    "kind": "SINGLE_CHOICE",
    "stem": "Read the following criteria carefully. \u2022 Slow evolutionary change relative to similar entities. \u2022 Gross similarity to an ancestral fossil. \u2022 Very low taxonomic richness today compared to the past. \u2022 Phylogenetic inference of specific characters as plesiomorphic. \u2022 Phylogenetic inference of a genealogical divergence between other groups that diverged in the distant past. \u2022 Known in the fossil record before being discovered alive. These criteria can be used to categorise a group of organisms most probably into:",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) Connecting links"
      },
      {
        "id": "opt-B",
        "text": "(B) Living fossils"
      },
      {
        "id": "opt-C",
        "text": "(C) Endangered species"
      },
      {
        "id": "opt-D",
        "text": "(D) Extinct species 7"
      }
    ],
    "hints": [
      "[H1 (Context & Setup): Identify governing principles.] 1. Conceptual Model: A living fossil is an extant organism that has retained ancestral plesiomorphic anatomical traits over evolutionary epochs with slow morphological divergence (bradytely), exhibiting low modern taxonomic richness compared to its fossil record.",
      "[H2 (Formulation & Analysis): Key relationship.] 2. Criteria Alignment: Gross morphological similarity to ancestral fossils, low modern diversity, plesiomorphic character suite, and historical recognition in fossil strata prior to the discovery of living specimens (e.g. Latimeria, Limulus, Ginkgo) define living fossils.",
      "[H3 (Crux Resolution): Final calculation.] 3. Conclusion: The specified criteria categorize the group as living fossils. Hence Option B."
    ],
    "steps": [
      "1. Conceptual Model: A living fossil is an extant organism that has retained ancestral plesiomorphic anatomical traits over evolutionary epochs with slow morphological divergence (bradytely), exhibiting low modern taxonomic richness compared to its fossil record.",
      "2. Criteria Alignment: Gross morphological similarity to ancestral fossils, low modern diversity, plesiomorphic character suite, and historical recognition in fossil strata prior to the discovery of living specimens (e.g. Latimeria, Limulus, Ginkgo) define living fossils.",
      "3. Conclusion: The specified criteria categorize the group as living fossils. Hence Option B."
    ],
    "check": "Adjudicated under IAPT 2020 examination standards.",
    "limitingCheck": "Adjudicated under IAPT 2020 examination standards.",
    "trapWarning": "Fault N09 Answer Isolation: Raw key withheld client-side; formative reasoning steps provided.",
    "correctKey": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "figures": [],
    "linkedCoreRoles": [
      "CORE1A",
      "CORE1B",
      "CORE2A",
      "CORE2B"
    ],
    "primaryCapabilityRef": "CAP-NSEJS-2020-B-Q18",
    "status": "RELEASED",
    "academicAdmission": "HOLD (Grade9 v4.1 Parity Candidate)",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "sourceOrigin": "NSEJS Custody (Grade9v4.1)"
  },
  {
    "id": "NSEJS-2020-B-Q29",
    "code": "NSEJS-2020-B-Q29",
    "title": "NSEJS 2020-21 \u00b7 Q29 \u00b7 EXPLAIN \u00b7 D2 (Score 6)",
    "subjectCode": "BIO",
    "subject": "Biology",
    "topicCode": "LIFE_PROCESSES",
    "topic": "Life Processes & Nephron Physiology",
    "subtopic": "Human Physiology",
    "exam": "NSEJS",
    "year": 2024,
    "paper": "NSEJS Core 2",
    "questionNumber": "Q29",
    "section": "Junior Science Olympiad",
    "markingScheme": "+3 / -1",
    "isCompetitive": true,
    "difficultyBand": "D2",
    "difficultyScore": 6,
    "difficultyBasis": "Cognitive demand score determined by 5-component QRT rubric.",
    "cognitiveComponents": {
      "concept_model_selection": 1,
      "representation_translation": 1,
      "reasoning_chain_length": 1,
      "algebra_computational_load": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "EXPLAIN",
    "role": "CORE2",
    "kind": "SINGLE_CHOICE",
    "stem": "Choose the correct statements from the following options.",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) A robust adaptive immune response is initiated using weakened forms of the bacterium known as live attenuated vaccines."
      },
      {
        "id": "opt-B",
        "text": "(B) Administration of a killed or chemically inactivated virus can trigger a weaker adaptive immune response, but it can be strengthened with booster doses."
      },
      {
        "id": "opt-C",
        "text": "(C) A conjugate or multivalent component always reduces immunogenicity of the vaccine."
      },
      {
        "id": "opt-D",
        "text": "(D) Inclusion of alum, cytokines and/or lipids always reduces the immune response to a vaccine."
      }
    ],
    "hints": [
      "[H1 (Context & Setup): Identify governing principles.] 1. Conceptual Model: Vaccines induce immunological memory through exposure to pathogen-specific immunogens without causing full pathology.",
      "[H2 (Formulation & Analysis): Key relationship.] 2. Vaccine Design Evaluation: Statement (a) is true: live attenuated vaccines replicate in host tissues, establishing robust and durable adaptive humoral and cell-mediated immunity. Statement (b) is true: killed or inactivated vaccines trigger weaker adaptive responses and typically require booster doses. Statement (c) is false: conjugate designs enhance T-dependent immunogenicity of polysaccharide antigens. Statement (d) is false: adjuvants like alum and lipids are included to potentiate and enhance the immune response.",
      "[H3 (Crux Resolution): Final calculation.] 3. Synthesis: Statements (a) and (b) are correct. Hence Options A, B."
    ],
    "steps": [
      "1. Conceptual Model: Vaccines induce immunological memory through exposure to pathogen-specific immunogens without causing full pathology.",
      "2. Vaccine Design Evaluation: Statement (a) is true: live attenuated vaccines replicate in host tissues, establishing robust and durable adaptive humoral and cell-mediated immunity. Statement (b) is true: killed or inactivated vaccines trigger weaker adaptive responses and typically require booster doses. Statement (c) is false: conjugate designs enhance T-dependent immunogenicity of polysaccharide antigens. Statement (d) is false: adjuvants like alum and lipids are included to potentiate and enhance the immune response.",
      "3. Synthesis: Statements (a) and (b) are correct. Hence Options A, B."
    ],
    "check": "Adjudicated under IAPT 2020 examination standards.",
    "limitingCheck": "Adjudicated under IAPT 2020 examination standards.",
    "trapWarning": "Fault N09 Answer Isolation: Raw key withheld client-side; formative reasoning steps provided.",
    "correctKey": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "figures": [],
    "linkedCoreRoles": [
      "CORE1A",
      "CORE1B",
      "CORE2A",
      "CORE2B"
    ],
    "primaryCapabilityRef": "CAP-NSEJS-2020-B-Q29",
    "status": "RELEASED",
    "academicAdmission": "HOLD (Grade9 v4.1 Parity Candidate)",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "sourceOrigin": "NSEJS Custody (Grade9v4.1)"
  },
  {
    "id": "NSEJS-2020-B-Q30",
    "code": "NSEJS-2020-B-Q30",
    "title": "NSEJS 2020-21 \u00b7 Q30 \u00b7 MODEL \u00b7 D2 (Score 6)",
    "subjectCode": "BIO",
    "subject": "Biology",
    "topicCode": "LIFE_PROCESSES",
    "topic": "Life Processes & Nephron Physiology",
    "subtopic": "Human Physiology",
    "exam": "NSEJS",
    "year": 2024,
    "paper": "NSEJS Core 2",
    "questionNumber": "Q30",
    "section": "Junior Science Olympiad",
    "markingScheme": "+3 / -1",
    "isCompetitive": true,
    "difficultyBand": "D2",
    "difficultyScore": 6,
    "difficultyBasis": "Cognitive demand score determined by 5-component QRT rubric.",
    "cognitiveComponents": {
      "concept_model_selection": 1,
      "representation_translation": 1,
      "reasoning_chain_length": 1,
      "algebra_computational_load": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "MODEL",
    "role": "CORE2",
    "kind": "SINGLE_CHOICE",
    "stem": "The minimum energy required to exist, that is, the energy required to perform chemical reactions even when a person is at rest, is called the basal metabolic rate (BMR), which accounts for about 50 to 70 per cent of the daily energy expenditure in most sedentary individuals. It is influenced by many factors. Some statements are made about these factors. Choose the correct statements from the following options.",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) Thyroid hormone decreases metabolic rate."
      },
      {
        "id": "opt-B",
        "text": "(B) Growth hormone increases metabolic rate."
      },
      {
        "id": "opt-C",
        "text": "(C) Fever decreases metabolic rate."
      },
      {
        "id": "opt-D",
        "text": "(D) Malnutrition decreases metabolic rate."
      }
    ],
    "hints": [
      "[H1 (Context & Setup): Identify governing principles.] 1. Conceptual Model: Basal Metabolic Rate (BMR) represents the minimum baseline rate of energy expenditure by an endothermic organism at complete physical and emotional rest.",
      "[H2 (Formulation & Analysis): Key relationship.] 2. Physiological Factor Evaluation: Statement (a) is false: thyroid hormones (T3 and T4) increase oxygen consumption and stimulate BMR (calorigenic effect). Statement (b) is true: growth hormone accelerates protein synthesis and tissue anabolism, elevating metabolic rate. Statement (c) is false: fever raises core temperature and accelerates biochemical reactions (Q10 effect), increasing BMR. Statement (d) is true: prolonged malnutrition prompts adaptive metabolic depression to conserve endogenous energy reserves, lowering BMR.",
      "[H3 (Crux Resolution): Final calculation.] 3. Conclusion: Statements (b) and (d) are correct. Hence Options B, D."
    ],
    "steps": [
      "1. Conceptual Model: Basal Metabolic Rate (BMR) represents the minimum baseline rate of energy expenditure by an endothermic organism at complete physical and emotional rest.",
      "2. Physiological Factor Evaluation: Statement (a) is false: thyroid hormones (T3 and T4) increase oxygen consumption and stimulate BMR (calorigenic effect). Statement (b) is true: growth hormone accelerates protein synthesis and tissue anabolism, elevating metabolic rate. Statement (c) is false: fever raises core temperature and accelerates biochemical reactions (Q10 effect), increasing BMR. Statement (d) is true: prolonged malnutrition prompts adaptive metabolic depression to conserve endogenous energy reserves, lowering BMR.",
      "3. Conclusion: Statements (b) and (d) are correct. Hence Options B, D."
    ],
    "check": "Adjudicated under IAPT 2020 examination standards.",
    "limitingCheck": "Adjudicated under IAPT 2020 examination standards.",
    "trapWarning": "Fault N09 Answer Isolation: Raw key withheld client-side; formative reasoning steps provided.",
    "correctKey": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "figures": [],
    "linkedCoreRoles": [
      "CORE1A",
      "CORE1B",
      "CORE2A",
      "CORE2B"
    ],
    "primaryCapabilityRef": "CAP-NSEJS-2020-B-Q30",
    "status": "RELEASED",
    "academicAdmission": "HOLD (Grade9 v4.1 Parity Candidate)",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "sourceOrigin": "NSEJS Custody (Grade9v4.1)"
  }
] as readonly UnifiedQuestionEntry[];
