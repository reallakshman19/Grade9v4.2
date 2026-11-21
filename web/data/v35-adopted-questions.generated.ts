// AUTO-GENERATED: Canonically adopted and normalized questions from Grade9v3.5 repository shards
// Fault N09 Answer Isolation: Formative hints, steps, and diagnostic keys included.
export const V35_ADOPTED_QUESTIONS = [
  {
    "id": "PYQ-CHEM-IITJEE-2008-P1-Q66",
    "code": "PYQ-CHEM-IITJEE-2008-P1-Q66",
    "title": "IIT-JEE \u00b7 Paper I \u00b7 Q66 \u00b7 Redox Reactions",
    "subjectCode": "CHEM",
    "subject": "Chemistry",
    "topicCode": "REDOX_REACTIONS",
    "topic": "Redox Reactions",
    "subtopic": "CAP-CHEM-REDOX-DISPROPORTIONATION",
    "exam": "IIT-JEE",
    "year": 2008,
    "paper": "Paper I",
    "questionNumber": "66",
    "section": "FAM-CHEM-REDOX-REACTION-CLASSIFICATION",
    "markingScheme": "+4 / -1",
    "difficultyBand": "D1",
    "difficultyScore": 2,
    "difficultyBasis": "Direct classification once oxidation states are assigned.",
    "cognitiveComponents": {
      "algebra_computational_load": 0,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 0,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "CLASSIFY",
    "kind": "SINGLE_CHOICE",
    "stem": "White phosphorus reacts with aqueous sodium hydroxide, producing phosphine and a phosphorus oxyanion. Classify the redox pattern.",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) Combination"
      },
      {
        "id": "opt-B",
        "text": "(B) Disproportionation"
      },
      {
        "id": "opt-C",
        "text": "(C) Comproportionation"
      },
      {
        "id": "opt-D",
        "text": "(D) Non-redox acid-base reaction"
      }
    ],
    "hints": [
      "[CONCEPT] Assign phosphorus oxidation state in elemental P and in PH3.",
      "[METHOD] Check whether another phosphorus product has an oxidation state above zero."
    ],
    "steps": [
      "Elemental phosphorus starts at oxidation state 0.",
      "In PH3 phosphorus is -3, while in hypophosphite H2PO2(-) phosphorus is +1.",
      "The same element is simultaneously reduced and oxidized, which is disproportionation."
    ],
    "limitingCheck": "The product oxidation states lie on opposite sides of the starting value 0.",
    "check": "The product oxidation states lie on opposite sides of the starting value 0.",
    "trapWarning": "Classifying by reaction setting rather than oxidation-state changes.",
    "correctKey": "opt-B",
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 4,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Chemistry)"
  },
  {
    "id": "PYQ-CHEM-IITJEE-2011-P1-Q17",
    "code": "PYQ-CHEM-IITJEE-2011-P1-Q17",
    "title": "IIT-JEE \u00b7 Paper I \u00b7 Q17 \u00b7 Redox Reactions",
    "subjectCode": "CHEM",
    "subject": "Chemistry",
    "topicCode": "REDOX_REACTIONS",
    "topic": "Redox Reactions",
    "subtopic": "CAP-CHEM-REDOX-OXIDATION-STATE",
    "exam": "IIT-JEE",
    "year": 2011,
    "paper": "Paper I",
    "questionNumber": "17",
    "section": "FAM-CHEM-REDOX-REACTION-CLASSIFICATION",
    "markingScheme": "+3 / 0",
    "difficultyBand": "D2",
    "difficultyScore": 3,
    "difficultyBasis": "Requires distinguishing non-equivalent sulfur positions instead of assigning the average oxidation state.",
    "cognitiveComponents": {
      "algebra_computational_load": 0,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "INTEGER",
    "stem": "In sodium tetrathionate, Na2S4O6, there are two chemically distinct kinds of sulfur atoms. Find the difference between their oxidation numbers.",
    "options": [],
    "hints": [
      "[CONCEPT] Start from the known oxygen contribution and total anion charge.",
      "[METHOD] Use the fact that the two central S atoms in the S-S segment are at oxidation state 0."
    ],
    "steps": [
      "The two inner sulfur atoms in the S-S portion have oxidation state 0.",
      "Charge balance in S4O6(2-) gives total sulfur oxidation number +10; the two equivalent terminal sulfur atoms therefore contribute +10, or +5 each.",
      "The difference between +5 and 0 is 5."
    ],
    "limitingCheck": "2(+5)+2(0)+6(-2)=-2, matching the tetrathionate charge.",
    "check": "2(+5)+2(0)+6(-2)=-2, matching the tetrathionate charge.",
    "trapWarning": "Using the average sulfur oxidation state +2.5 for every sulfur atom.",
    "correctKey": null,
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Chemistry)"
  },
  {
    "id": "PYQ-CHEM-IITJEE-2011-P1-Q18",
    "code": "PYQ-CHEM-IITJEE-2011-P1-Q18",
    "title": "IIT-JEE \u00b7 Paper I \u00b7 Q18 \u00b7 Redox Reactions",
    "subjectCode": "CHEM",
    "subject": "Chemistry",
    "topicCode": "REDOX_REACTIONS",
    "topic": "Redox Reactions",
    "subtopic": "CAP-CHEM-REDOX-BALANCE-ELECTRON",
    "exam": "IIT-JEE",
    "year": 2011,
    "paper": "Paper I",
    "questionNumber": "18",
    "section": "FAM-CHEM-REDOX-ACIDIC-MEDIUM-BALANCE",
    "markingScheme": "+3 / 0",
    "difficultyBand": "D2",
    "difficultyScore": 4,
    "difficultyBasis": "A short disproportionation electron balance determines the key coefficient.",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "INTEGER",
    "stem": "Bromine reacts with aqueous sodium carbonate to form sodium bromide, sodium bromate and carbon dioxide. In the balanced molecular equation, how many NaBr formula units appear as the stoichiometric coefficient?",
    "options": [],
    "hints": [
      "[CONCEPT] Write bromine oxidation states in Br2, Br(-) and BrO3(-).",
      "[METHOD] How many Br atoms must gain one electron for each Br atom that loses five?",
      "[METHOD] Finish Na and carbonate balance after the redox ratio is fixed."
    ],
    "steps": [
      "Bromine disproportionates from oxidation state 0 to -1 in bromide and +5 in bromate.",
      "Electron balance requires five Br atoms reduced to -1 for every one Br atom oxidized to +5, so 3Br2 produces 5Br(-) and BrO3(-).",
      "Balancing sodium and carbonate gives 3Br2 + 3Na2CO3 -> 5NaBr + NaBrO3 + 3CO2; the NaBr coefficient is 5."
    ],
    "limitingCheck": "Six bromine atoms and six sodium atoms are present on both sides.",
    "check": "Six bromine atoms and six sodium atoms are present on both sides.",
    "trapWarning": "Trying to balance atoms without first fixing the 5:1 bromide:bromate electron ratio.",
    "correctKey": null,
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Chemistry)"
  },
  {
    "id": "PYQ-CHEM-IITJEE-2012-P2-Q22",
    "code": "PYQ-CHEM-IITJEE-2012-P2-Q22",
    "title": "IIT-JEE \u00b7 Paper II \u00b7 Q22 \u00b7 Redox Reactions",
    "subjectCode": "CHEM",
    "subject": "Chemistry",
    "topicCode": "REDOX_REACTIONS",
    "topic": "Redox Reactions",
    "subtopic": "CAP-CHEM-REDOX-OXIDATION-STATE",
    "exam": "IIT-JEE",
    "year": 2012,
    "paper": "Paper II",
    "questionNumber": "22",
    "section": "FAM-CHEM-REDOX-REACTION-CLASSIFICATION",
    "markingScheme": "+4 / -1",
    "difficultyBand": "D1",
    "difficultyScore": 2,
    "difficultyBasis": "Recognition of redox roles in a standard extraction sequence.",
    "cognitiveComponents": {
      "algebra_computational_load": 0,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 0,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "SINGLE_CHOICE",
    "stem": "In the cyanide extraction of silver from argentite, identify the oxidizing agent used during leaching and the reducing agent used to recover silver from the cyanide complex.",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) O2 and CO"
      },
      {
        "id": "opt-B",
        "text": "(B) O2 and Zn dust"
      },
      {
        "id": "opt-C",
        "text": "(C) HNO3 and Zn dust"
      },
      {
        "id": "opt-D",
        "text": "(D) HNO3 and CO"
      }
    ],
    "hints": [
      "[CONCEPT] Ask which reagent accepts electrons during cyanide leaching.",
      "[METHOD] In the recovery step, identify which metal is oxidized while Ag(I) becomes Ag(0)."
    ],
    "steps": [
      "During cyanide leaching, oxygen participates as the oxidant that enables silver to form soluble cyanide complex.",
      "During cementation/recovery, zinc is oxidized while silver(I) in the complex is reduced to metallic silver.",
      "Therefore the reagent roles are O2 as oxidizing agent and Zn dust as reducing agent."
    ],
    "limitingCheck": "The recovery step must contain a species more readily oxidized than Ag; zinc satisfies that role.",
    "check": "The recovery step must contain a species more readily oxidized than Ag; zinc satisfies that role.",
    "trapWarning": "Swapping oxidizing and reducing agents because zinc appears later in the process.",
    "correctKey": "opt-B",
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 4,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Chemistry)"
  },
  {
    "id": "PYQ-CHEM-JEEADV-2023-P2-Q08",
    "code": "PYQ-CHEM-JEEADV-2023-P2-Q08",
    "title": "JEE (Advanced) \u00b7 Paper 2 \u00b7 Q8 \u00b7 Redox Reactions",
    "subjectCode": "CHEM",
    "subject": "Chemistry",
    "topicCode": "REDOX_REACTIONS",
    "topic": "Redox Reactions",
    "subtopic": "CAP-CHEM-REDOX-BALANCE-ELECTRON",
    "exam": "JEE (Advanced)",
    "year": 2023,
    "paper": "Paper 2",
    "questionNumber": "8",
    "section": "FAM-CHEM-REDOX-ACIDIC-MEDIUM-BALANCE",
    "markingScheme": "+3 / 0",
    "difficultyBand": "D3",
    "difficultyScore": 6,
    "difficultyBasis": "Acidic-medium half-reaction balancing and electron counting must be combined with stoichiometric scaling.",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 2,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 1
    },
    "qrtDemand": "VERIFY",
    "kind": "INTEGER",
    "stem": "Five moles of H2S react completely with acidified aqueous potassium permanganate. If x is the moles of water produced and y is the moles of electrons transferred, find x+y.",
    "options": [],
    "hints": [
      "[CONCEPT] Write the sulfur oxidation half-reaction and the Mn(VII) to Mn(II) reduction half-reaction.",
      "[METHOD] Use the LCM of 2 and 5 electrons before adding the half-reactions.",
      "[METHOD] Only after balancing, read x and the total electron count y."
    ],
    "steps": [
      "Oxidation: H2S -> S + 2H(+) + 2e(-). Reduction: MnO4(-) + 8H(+) + 5e(-) -> Mn(2+) + 4H2O.",
      "Equalizing electrons gives 5H2S + 2MnO4(-) + 6H(+) -> 5S + 2Mn(2+) + 8H2O.",
      "For 5 mol H2S, x=8 and y=10, so x+y=18."
    ],
    "limitingCheck": "Atoms and charge balance: left net charge +4 and right net charge +4.",
    "check": "Atoms and charge balance: left net charge +4 and right net charge +4.",
    "trapWarning": "Counting five transferred electrons instead of ten, or reading water before balancing charge.",
    "correctKey": null,
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Chemistry)"
  },
  {
    "id": "PYQ-CHEM-JEEADV-2024-P2-Q02",
    "code": "PYQ-CHEM-JEEADV-2024-P2-Q02",
    "title": "JEE (Advanced) \u00b7 Paper 2 \u00b7 Q2 \u00b7 Redox Reactions",
    "subjectCode": "CHEM",
    "subject": "Chemistry",
    "topicCode": "REDOX_REACTIONS",
    "topic": "Redox Reactions",
    "subtopic": "CAP-CHEM-REDOX-OXIDATION-STATE",
    "exam": "JEE (Advanced)",
    "year": 2024,
    "paper": "Paper 2",
    "questionNumber": "2",
    "section": "FAM-CHEM-REDOX-REACTION-CLASSIFICATION",
    "markingScheme": "+4 / -1",
    "difficultyBand": "D2",
    "difficultyScore": 4,
    "difficultyBasis": "Uses weighted oxidation state plus formula-unit charge neutrality.",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "MODEL",
    "kind": "SINGLE_CHOICE",
    "stem": "A metal-deficient oxide has composition M_xY2O4. Metal M occurs as M2+ and M3+, metal Y is Y3+, and one third of the M ions are M2+. Determine x.",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) 0.25"
      },
      {
        "id": "opt-B",
        "text": "(B) 0.33"
      },
      {
        "id": "opt-C",
        "text": "(C) 0.67"
      },
      {
        "id": "opt-D",
        "text": "(D) 0.75"
      }
    ],
    "hints": [
      "[CONCEPT] Compute the average charge per M ion from the 1:2 ratio of M2+ to M3+.",
      "[METHOD] Set total positive charge equal to the 8 units of negative charge from O4."
    ],
    "steps": [
      "Average oxidation state of M is (1/3)(+2)+(2/3)(+3)=8/3.",
      "Charge neutrality gives x(8/3)+2(+3)+4(-2)=0.",
      "Thus (8/3)x=2 and x=3/4=0.75."
    ],
    "limitingCheck": "Positive charge from M is +2 and from two Y3+ is +6, totaling +8 to balance four O2-.",
    "check": "Positive charge from M is +2 and from two Y3+ is +6, totaling +8 to balance four O2-.",
    "trapWarning": "Using +2 or +3 for every M ion instead of the weighted average.",
    "correctKey": "opt-D",
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 4,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Chemistry)"
  },
  {
    "id": "PYQ-CHEM-JEEADV-2025-P1-Q08",
    "code": "PYQ-CHEM-JEEADV-2025-P1-Q08",
    "title": "JEE (Advanced) \u00b7 Paper 1 \u00b7 Q8 \u00b7 Redox Reactions",
    "subjectCode": "CHEM",
    "subject": "Chemistry",
    "topicCode": "REDOX_REACTIONS",
    "topic": "Redox Reactions",
    "subtopic": "CAP-CHEM-REDOX-BALANCE-ELECTRON",
    "exam": "JEE (Advanced)",
    "year": 2025,
    "paper": "Paper 1",
    "questionNumber": "8",
    "section": "FAM-CHEM-REDOX-ACIDIC-MEDIUM-BALANCE",
    "markingScheme": "+3 / 0",
    "difficultyBand": "D2",
    "difficultyScore": 4,
    "difficultyBasis": "Connects oxidation-state electron count to Faraday charge and current.",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "NUMERIC_QUANTITY",
    "stem": "In an acidic electrochemical cell, dichromate is reduced to Cr3+. What current in amperes must flow for 48.25 minutes to produce 1 mol of Cr3+? Use 1 F = 96500 C mol^-1.",
    "options": [],
    "hints": [
      "[CONCEPT] Find the oxidation-state change for one chromium atom.",
      "[METHOD] Convert moles of electrons to charge and minutes to seconds before using I=Q/t."
    ],
    "steps": [
      "Producing 1 mol Cr3+ from Cr(VI) requires 3 mol electrons.",
      "Charge required is 3F=3\u00d796500=289500 C.",
      "48.25 min = 2895 s, so I=Q/t=289500/2895=100 A."
    ],
    "limitingCheck": "100 A for 2895 s transfers 289500 C, exactly 3 Faradays.",
    "check": "100 A for 2895 s transfers 289500 C, exactly 3 Faradays.",
    "trapWarning": "Counting six electrons per Cr because dichromate contains two chromium atoms.",
    "correctKey": null,
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Chemistry)"
  },
  {
    "id": "PYQ-CHEM-IITJEE-2007-P1-Q39",
    "code": "PYQ-CHEM-IITJEE-2007-P1-Q39",
    "title": "IIT-JEE \u00b7 Paper I \u00b7 Q39 \u00b7 Some Basic Concepts of Chemistry / Mole Concept / Stoichiometry",
    "subjectCode": "CHEM",
    "subject": "Chemistry",
    "topicCode": "SOME_BASIC_CONCEPTS_OF_CHEMISTRY",
    "topic": "Some Basic Concepts of Chemistry / Mole Concept / Stoichiometry",
    "subtopic": "CAP-CHEM-MOLE-CONCENTRATION-TO-AMOUNT",
    "exam": "IIT-JEE",
    "year": 2007,
    "paper": "Paper I",
    "questionNumber": "39",
    "section": "FAM-CHEM-MOLE-ELECTROLYTIC-STOICH",
    "markingScheme": "+4 / -1",
    "difficultyBand": "D2",
    "difficultyScore": 3,
    "difficultyBasis": "Direct concentration-to-moles conversion followed by a 2:1 electrode stoichiometric ratio.",
    "cognitiveComponents": {
      "algebra_computational_load": 0,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "MODEL",
    "kind": "SINGLE_CHOICE",
    "stem": "A 500 mL portion of 4.0 M aqueous NaCl is completely electrolysed. Determine the amount of chlorine gas evolved.",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) 0.5 mol"
      },
      {
        "id": "opt-B",
        "text": "(B) 1.0 mol"
      },
      {
        "id": "opt-C",
        "text": "(C) 2.0 mol"
      },
      {
        "id": "opt-D",
        "text": "(D) 4.0 mol"
      }
    ],
    "hints": [
      "[CONCEPT] First calculate the mole inventory in 0.500 L of 4.0 M NaCl.",
      "[METHOD] Write the chloride oxidation half-equation at the anode."
    ],
    "steps": [
      "Moles of NaCl, hence Cl(-), are 4.0 mol/L \u00d7 0.500 L = 2.0 mol.",
      "At the anode, 2Cl(-) -> Cl2 + 2e(-).",
      "Therefore 2.0 mol chloride gives 1.0 mol Cl2."
    ],
    "limitingCheck": "Two moles of chlorine atoms become one mole of diatomic chlorine molecules.",
    "check": "Two moles of chlorine atoms become one mole of diatomic chlorine molecules.",
    "trapWarning": "Treating 2 mol chloride ions as 2 mol Cl2.",
    "correctKey": "opt-B",
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 4,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Chemistry)"
  },
  {
    "id": "PYQ-CHEM-IITJEE-2007-P1-Q40",
    "code": "PYQ-CHEM-IITJEE-2007-P1-Q40",
    "title": "IIT-JEE \u00b7 Paper I \u00b7 Q40 \u00b7 Some Basic Concepts of Chemistry / Mole Concept / Stoichiometry",
    "subjectCode": "CHEM",
    "subject": "Chemistry",
    "topicCode": "SOME_BASIC_CONCEPTS_OF_CHEMISTRY",
    "topic": "Some Basic Concepts of Chemistry / Mole Concept / Stoichiometry",
    "subtopic": "CAP-CHEM-STOICH-MASS-MOLE",
    "exam": "IIT-JEE",
    "year": 2007,
    "paper": "Paper I",
    "questionNumber": "40",
    "section": "FAM-CHEM-MOLE-ELECTROLYTIC-STOICH",
    "markingScheme": "+4 / -1",
    "difficultyBand": "D2",
    "difficultyScore": 5,
    "difficultyBasis": "Carries a shared mole inventory into a mass calculation with the source's amalgam stoichiometric convention.",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 1
    },
    "qrtDemand": "MODEL",
    "kind": "SINGLE_CHOICE",
    "stem": "In the same complete electrolysis of 500 mL of 4.0 M NaCl, mercury is used as the cathode. Using Na=23 and Hg=200, determine the maximum amalgam mass intended by the source item.",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) 200 g"
      },
      {
        "id": "opt-B",
        "text": "(B) 223 g"
      },
      {
        "id": "opt-C",
        "text": "(C) 400 g"
      },
      {
        "id": "opt-D",
        "text": "(D) 446 g"
      }
    ],
    "hints": [
      "[CONCEPT] Reuse the 2.0 mol sodium-ion inventory from the shared setup.",
      "[METHOD] The requested mass includes both Na and Hg in each counted amalgam unit."
    ],
    "steps": [
      "The solution contains 2.0 mol Na(+).",
      "Under the source item's intended 1:1 NaHg counting, complete cathodic uptake corresponds to 2 mol NaHg units.",
      "M(NaHg)=23+200=223 g/mol, so mass=2\u00d7223=446 g."
    ],
    "limitingCheck": "The result is exactly twice the supplied Na+Hg formula mass.",
    "check": "The result is exactly twice the supplied Na+Hg formula mass.",
    "trapWarning": "Reporting only deposited sodium mass instead of total amalgam mass.",
    "correctKey": "opt-D",
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 4,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Chemistry)"
  },
  {
    "id": "PYQ-CHEM-IITJEE-2007-P1-Q41",
    "code": "PYQ-CHEM-IITJEE-2007-P1-Q41",
    "title": "IIT-JEE \u00b7 Paper I \u00b7 Q41 \u00b7 Some Basic Concepts of Chemistry / Mole Concept / Stoichiometry",
    "subjectCode": "CHEM",
    "subject": "Chemistry",
    "topicCode": "SOME_BASIC_CONCEPTS_OF_CHEMISTRY",
    "topic": "Some Basic Concepts of Chemistry / Mole Concept / Stoichiometry",
    "subtopic": "CAP-CHEM-STOICH-MOLE-RATIO",
    "exam": "IIT-JEE",
    "year": 2007,
    "paper": "Paper I",
    "questionNumber": "41",
    "section": "FAM-CHEM-MOLE-ELECTROLYTIC-STOICH",
    "markingScheme": "+4 / -1",
    "difficultyBand": "D2",
    "difficultyScore": 4,
    "difficultyBasis": "Converts solution amount to electron amount and then to charge.",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "MODEL",
    "kind": "SINGLE_CHOICE",
    "stem": "For complete electrolysis of 500 mL of 4.0 M NaCl, calculate the total charge required. Use F=96500 C mol^-1.",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) 48250 C"
      },
      {
        "id": "opt-B",
        "text": "(B) 96500 C"
      },
      {
        "id": "opt-C",
        "text": "(C) 144750 C"
      },
      {
        "id": "opt-D",
        "text": "(D) 193000 C"
      }
    ],
    "hints": [
      "[CONCEPT] Start from moles of NaCl, not directly from concentration.",
      "[METHOD] Determine electron moles, then use Q=nF."
    ],
    "steps": [
      "The sample contains 4.0\u00d70.500=2.0 mol NaCl.",
      "Complete electrolysis corresponds to transfer of 2.0 mol electrons.",
      "Q=nF=2\u00d796500=193000 C."
    ],
    "limitingCheck": "193000 C is exactly two Faradays.",
    "check": "193000 C is exactly two Faradays.",
    "trapWarning": "Using one Faraday for the full 2 mol inventory.",
    "correctKey": "opt-D",
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 4,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Chemistry)"
  },
  {
    "id": "PYQ-CHEM-IITJEE-2008-P2-Q51",
    "code": "PYQ-CHEM-IITJEE-2008-P2-Q51",
    "title": "IIT-JEE \u00b7 Paper II \u00b7 Q51 \u00b7 Some Basic Concepts of Chemistry / Mole Concept / Stoichiometry",
    "subjectCode": "CHEM",
    "subject": "Chemistry",
    "topicCode": "SOME_BASIC_CONCEPTS_OF_CHEMISTRY",
    "topic": "Some Basic Concepts of Chemistry / Mole Concept / Stoichiometry",
    "subtopic": "CAP-CHEM-STOICH-MOLE-RATIO",
    "exam": "IIT-JEE",
    "year": 2008,
    "paper": "Paper II",
    "questionNumber": "51",
    "section": "FAM-CHEM-MOLE-ELECTROLYTIC-STOICH",
    "markingScheme": "+4 / -1",
    "difficultyBand": "D2",
    "difficultyScore": 4,
    "difficultyBasis": "Faraday stoichiometry plus current-time conversion.",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "MODEL",
    "kind": "SINGLE_CHOICE",
    "stem": "During electrolysis of dilute aqueous NaCl, a current of 10 mA is passed. Calculate the time needed to produce 0.010 mol of H2 gas. Use F=96500 C mol^-1.",
    "options": [],
    "hints": [
      "[CONCEPT] Write the cathodic half-equation for hydrogen formation.",
      "[METHOD] Convert 10 mA to amperes, then use t=n_e F/I."
    ],
    "steps": [
      "0.010 mol H2 requires 0.020 mol electrons.",
      "Required charge is 0.020\u00d796500=1930 C.",
      "At I=0.010 A, t=Q/I=1930/0.010=1.93\u00d710^5 s."
    ],
    "limitingCheck": "0.010 A \u00d7 1.93\u00d710^5 s = 1930 C.",
    "check": "0.010 A \u00d7 1.93\u00d710^5 s = 1930 C.",
    "trapWarning": "Using one electron per H2 rather than two.",
    "correctKey": null,
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 4,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Chemistry)"
  },
  {
    "id": "PYQ-CHEM-IITJEE-2011-P2-Q14",
    "code": "PYQ-CHEM-IITJEE-2011-P2-Q14",
    "title": "IIT-JEE \u00b7 Paper II \u00b7 Q14 \u00b7 Some Basic Concepts of Chemistry / Mole Concept / Stoichiometry",
    "subjectCode": "CHEM",
    "subject": "Chemistry",
    "topicCode": "SOME_BASIC_CONCEPTS_OF_CHEMISTRY",
    "topic": "Some Basic Concepts of Chemistry / Mole Concept / Stoichiometry",
    "subtopic": "CAP-CHEM-MOLE-CONCENTRATION-TO-AMOUNT",
    "exam": "IIT-JEE",
    "year": 2011,
    "paper": "Paper II",
    "questionNumber": "14",
    "section": "FAM-CHEM-STOICH-AMOUNT-MAPPING",
    "markingScheme": "+3 / 0",
    "difficultyBand": "D2",
    "difficultyScore": 4,
    "difficultyBasis": "Combines molarity-volume conversion with ion count and 1:1 precipitation stoichiometry.",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "INTEGER",
    "stem": "A 30 mL sample of 0.010 M [Cr(H2O)5Cl]Cl2 is treated with 0.100 M AgNO3 to precipitate the ionizable chloride completely. Find the required AgNO3 volume in mL.",
    "options": [],
    "hints": [
      "[CONCEPT] Separate coordinated chloride inside the bracket from chloride counterions outside it.",
      "[METHOD] Convert complex moles to free chloride moles, then to AgNO3 volume."
    ],
    "steps": [
      "Moles of complex are 0.030 L\u00d70.010 mol/L=3.0\u00d710^-4 mol.",
      "There are two ionizable chloride ions per complex, so chloride amount is 6.0\u00d710^-4 mol.",
      "Equal moles AgNO3 are required; volume=(6.0\u00d710^-4)/0.100=0.006 L=6 mL."
    ],
    "limitingCheck": "0.100 mol/L \u00d7 0.006 L = 6.0\u00d710^-4 mol Ag(+), matching chloride.",
    "check": "0.100 mol/L \u00d7 0.006 L = 6.0\u00d710^-4 mol Ag(+), matching chloride.",
    "trapWarning": "Counting the coordinated chloride as an immediately precipitable outer-sphere chloride.",
    "correctKey": null,
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Chemistry)"
  },
  {
    "id": "PYQ-CHEM-JEEADV-2023-P1-Q08",
    "code": "PYQ-CHEM-JEEADV-2023-P1-Q08",
    "title": "JEE (Advanced) \u00b7 Paper 1 \u00b7 Q8 \u00b7 Some Basic Concepts of Chemistry / Mole Concept / Stoichiometry",
    "subjectCode": "CHEM",
    "subject": "Chemistry",
    "topicCode": "SOME_BASIC_CONCEPTS_OF_CHEMISTRY",
    "topic": "Some Basic Concepts of Chemistry / Mole Concept / Stoichiometry",
    "subtopic": "CAP-CHEM-STOICH-MASS-MOLE",
    "exam": "JEE (Advanced)",
    "year": 2023,
    "paper": "Paper 1",
    "questionNumber": "8",
    "section": "FAM-CHEM-STOICH-AMOUNT-MAPPING",
    "markingScheme": "+3 / 0",
    "difficultyBand": "D2",
    "difficultyScore": 5,
    "difficultyBasis": "Requires converting precursor mass to formula amount, recognizing tetramer stoichiometry, then applying percent yield.",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 1
    },
    "qrtDemand": "VERIFY",
    "kind": "NUMERIC_QUANTITY",
    "stem": "Stoichiometric hydrolysis of 516 g dimethyldichlorosilane gives a tetrameric cyclic siloxane product X in 75% yield. Using H=1, C=12, O=16, Si=28 and Cl=35.5, find the mass of X.",
    "options": [],
    "hints": [
      "[CONCEPT] Calculate moles of dimethyldichlorosilane from 516 g.",
      "[METHOD] Build the molar mass of one four-unit cyclic siloxane, then apply the 75% yield."
    ],
    "steps": [
      "Molar mass of (CH3)2SiCl2 is 129 g/mol, so 516 g is 4 mol precursor.",
      "Four precursor molecules form one cyclic tetramer; the tetramer molar mass is 4\u00d7[(CH3)2SiO]=4\u00d774=296 g/mol.",
      "Four mol precursor gives one mol tetramer theoretically; at 75% yield, mass=0.75\u00d7296=222 g."
    ],
    "limitingCheck": "516/129=4 exactly, matching one four-unit ring before applying yield.",
    "check": "516/129=4 exactly, matching one four-unit ring before applying yield.",
    "trapWarning": "Applying 75% to precursor mass instead of theoretical product mass.",
    "correctKey": null,
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Chemistry)"
  },
  {
    "id": "PYQ-CHEM-JEEADV-2025-P1-Q12",
    "code": "PYQ-CHEM-JEEADV-2025-P1-Q12",
    "title": "JEE (Advanced) \u00b7 Paper 1 \u00b7 Q12 \u00b7 Some Basic Concepts of Chemistry / Mole Concept / Stoichiometry",
    "subjectCode": "CHEM",
    "subject": "Chemistry",
    "topicCode": "SOME_BASIC_CONCEPTS_OF_CHEMISTRY",
    "topic": "Some Basic Concepts of Chemistry / Mole Concept / Stoichiometry",
    "subtopic": "CAP-CHEM-STOICH-MOLE-RATIO",
    "exam": "JEE (Advanced)",
    "year": 2025,
    "paper": "Paper 1",
    "questionNumber": "12",
    "section": "FAM-CHEM-STOICH-AMOUNT-MAPPING",
    "markingScheme": "+3 / 0",
    "difficultyBand": "D2",
    "difficultyScore": 4,
    "difficultyBasis": "Identifies the correct monomer and maps nitrogen atoms to Dumas N2 amount.",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "NUMERIC_QUANTITY",
    "stem": "The Nylon-6,6 monomer X that gives a positive carbylamine test is analyzed by the Dumas method. If 10 mol of X are analyzed, find the mass of N2 evolved. Use atomic mass N=14.",
    "options": [],
    "hints": [
      "[CONCEPT] Which Nylon-6,6 monomer contains primary amine groups and therefore gives carbylamine test?",
      "[METHOD] Convert 10 mol diamine to moles of nitrogen atoms and then to moles of N2."
    ],
    "steps": [
      "The primary-diamine monomer is H2N-(CH2)6-NH2, so each mole X contains 2 mol nitrogen atoms.",
      "Ten mol X therefore contains 20 mol N atoms, equivalent to 10 mol N2.",
      "Mass of N2 is 10\u00d728=280 g."
    ],
    "limitingCheck": "Nitrogen-atom count is conserved: 20 mol N atoms appear as 10 mol N2 molecules.",
    "check": "Nitrogen-atom count is conserved: 20 mol N atoms appear as 10 mol N2 molecules.",
    "trapWarning": "Using adipic acid as X or counting one nitrogen atom per diamine molecule.",
    "correctKey": null,
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Chemistry)"
  },
  {
    "id": "PYQ-CHEM-JEEADV-2025-P2-Q16",
    "code": "PYQ-CHEM-JEEADV-2025-P2-Q16",
    "title": "JEE (Advanced) \u00b7 Paper 2 \u00b7 Q16 \u00b7 Some Basic Concepts of Chemistry / Mole Concept / Stoichiometry",
    "subjectCode": "CHEM",
    "subject": "Chemistry",
    "topicCode": "SOME_BASIC_CONCEPTS_OF_CHEMISTRY",
    "topic": "Some Basic Concepts of Chemistry / Mole Concept / Stoichiometry",
    "subtopic": "CAP-CHEM-STOICH-MOLE-RATIO",
    "exam": "JEE (Advanced)",
    "year": 2025,
    "paper": "Paper 2",
    "questionNumber": "16",
    "section": "FAM-CHEM-STOICH-AMOUNT-MAPPING",
    "markingScheme": "+3 / 0",
    "difficultyBand": "D3",
    "difficultyScore": 6,
    "difficultyBasis": "Requires accounting for hydrolysis water before converting a mass fraction into integer monomer counts.",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 2,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 1
    },
    "qrtDemand": "VERIFY",
    "kind": "NUMERIC_QUANTITY",
    "stem": "A linear octasaccharide has molar mass 1024 g/mol. Complete hydrolysis yields ribose (150), 2-deoxyribose (134) and glucose (180). The 2-deoxyribose mass is 58.26% of the total monosaccharide mass after hydrolysis. Find the number of ribose units in one octasaccharide molecule.",
    "options": [],
    "hints": [
      "[CONCEPT] A linear chain of eight monosaccharides has how many glycosidic bonds, and how many waters are added on hydrolysis?",
      "[METHOD] Use the hydrolyzed total mass to find the number of deoxyribose units.",
      "[METHOD] Use both the remaining unit count and remaining mass to solve ribose versus glucose."
    ],
    "steps": [
      "One mole octasaccharide gains 7\u00d718=126 g of water on hydrolysis, so total monosaccharide mass is 1024+126=1150 g.",
      "2-Deoxyribose mass is 0.5826\u00d71150\u2248670 g, which is 670/134=5 mol units. Thus the remaining three units are ribose and glucose.",
      "Let r be ribose units and g=3-r glucose units. 150r+180g=1150-670=480; solving gives r=2 and g=1."
    ],
    "limitingCheck": "5 deoxyribose + 2 ribose + 1 glucose gives 8 units and mass 670+300+180=1150 g after hydrolysis.",
    "check": "5 deoxyribose + 2 ribose + 1 glucose gives 8 units and mass 670+300+180=1150 g after hydrolysis.",
    "trapWarning": "Applying 58.26% to the original 1024 g polymer mass instead of the hydrolyzed monosaccharide total.",
    "correctKey": null,
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Chemistry)"
  },
  {
    "id": "PYQ-CHEM-NEET-2020-E1-Q099",
    "code": "PYQ-CHEM-NEET-2020-E1-Q099",
    "title": "NEET (UG) \u00b7 English Set E1 \u00b7 Q99 \u00b7 Redox Reactions",
    "subjectCode": "CHEM",
    "subject": "Chemistry",
    "topicCode": "REDOX_REACTIONS",
    "topic": "Redox Reactions",
    "subtopic": "CAP-CHEM-REDOX-BALANCE-ELECTRON",
    "exam": "NEET (UG)",
    "year": 2020,
    "paper": "English Set E1",
    "questionNumber": "99",
    "section": "FAM-CHEM-REDOX-REACTION-CLASSIFICATION",
    "markingScheme": "+4 / -1",
    "difficultyBand": "D1",
    "difficultyScore": 2,
    "difficultyBasis": "Direct electrode-process identification in an aqueous acidic electrolyte.",
    "cognitiveComponents": {
      "algebra_computational_load": 0,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 0,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "SINGLE_CHOICE",
    "stem": "Dilute sulfuric acid is electrolysed using inert platinum electrodes. Identify the gas evolved at the anode.",
    "options": [
      {
        "id": "opt-A",
        "text": "(1) H2"
      },
      {
        "id": "opt-B",
        "text": "(2) O2"
      },
      {
        "id": "opt-C",
        "text": "(3) H2S"
      },
      {
        "id": "opt-D",
        "text": "(4) SO2"
      }
    ],
    "hints": [
      "[CONCEPT] Identify which species can be oxidized at an inert anode in aqueous acid.",
      "[METHOD] Write the water-to-oxygen oxidation half-reaction."
    ],
    "steps": [
      "At the cathode, H+ is reduced; at the inert anode, water is the species oxidized.",
      "The anode half-reaction is 2H2O -> O2 + 4H+ + 4e-, so oxygen is evolved."
    ],
    "limitingCheck": "Sulfur remains in sulfate; no sulfur-containing gas is required for charge balance.",
    "check": "Sulfur remains in sulfate; no sulfur-containing gas is required for charge balance.",
    "trapWarning": "Assuming sulfate itself must be oxidized because sulfuric acid is the electrolyte.",
    "correctKey": "opt-A",
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 4,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Chemistry)"
  },
  {
    "id": "PYQ-CHEM-NEET-2020-E1-Q106",
    "code": "PYQ-CHEM-NEET-2020-E1-Q106",
    "title": "NEET (UG) \u00b7 English Set E1 \u00b7 Q106 \u00b7 Some Basic Concepts of Chemistry / Mole Concept / Stoichiometry",
    "subjectCode": "CHEM",
    "subject": "Chemistry",
    "topicCode": "SOME_BASIC_CONCEPTS_OF_CHEMISTRY",
    "topic": "Some Basic Concepts of Chemistry / Mole Concept / Stoichiometry",
    "subtopic": "CAP-CHEM-STOICH-MOLE-RATIO",
    "exam": "NEET (UG)",
    "year": 2020,
    "paper": "English Set E1",
    "questionNumber": "106",
    "section": "FAM-CHEM-MOLE-ELECTROLYTIC-STOICH",
    "markingScheme": "+4 / -1",
    "difficultyBand": "D2",
    "difficultyScore": 3,
    "difficultyBasis": "Mass-to-moles conversion followed by electron stoichiometry.",
    "cognitiveComponents": {
      "algebra_computational_load": 0,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "SINGLE_CHOICE",
    "stem": "How many Faradays are needed to produce 20 g of calcium from molten CaCl2? Use molar mass Ca=40 g/mol.",
    "options": [
      {
        "id": "opt-A",
        "text": "(1) 1 F"
      },
      {
        "id": "opt-B",
        "text": "(2) 2 F"
      },
      {
        "id": "opt-C",
        "text": "(3) 3 F"
      },
      {
        "id": "opt-D",
        "text": "(4) 4 F"
      }
    ],
    "hints": [
      "[CONCEPT] Convert 20 g calcium to moles.",
      "[METHOD] Use the Ca2+/Ca half-reaction to count electron moles."
    ],
    "steps": [
      "20 g Ca corresponds to 0.5 mol Ca.",
      "Ca2+ + 2e- -> Ca, so 0.5 mol Ca requires 1.0 mol electrons, i.e. 1 Faraday."
    ],
    "limitingCheck": "One Faraday deposits one equivalent; calcium's equivalent mass is 40/2=20 g.",
    "check": "One Faraday deposits one equivalent; calcium's equivalent mass is 40/2=20 g.",
    "trapWarning": "Using one electron per Ca2+ ion.",
    "correctKey": "opt-A",
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 4,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Chemistry)"
  },
  {
    "id": "PYQ-CHEM-NEET-2020-E1-Q110",
    "code": "PYQ-CHEM-NEET-2020-E1-Q110",
    "title": "NEET (UG) \u00b7 English Set E1 \u00b7 Q110 \u00b7 Some Basic Concepts of Chemistry / Mole Concept / Stoichiometry",
    "subjectCode": "CHEM",
    "subject": "Chemistry",
    "topicCode": "SOME_BASIC_CONCEPTS_OF_CHEMISTRY",
    "topic": "Some Basic Concepts of Chemistry / Mole Concept / Stoichiometry",
    "subtopic": "CAP-CHEM-STOICH-MOLE-RATIO",
    "exam": "NEET (UG)",
    "year": 2020,
    "paper": "English Set E1",
    "questionNumber": "110",
    "section": "FAM-CHEM-STOICH-AMOUNT-MAPPING",
    "markingScheme": "+4 / -1",
    "difficultyBand": "D2",
    "difficultyScore": 4,
    "difficultyBasis": "Requires mass-to-mole conversion before applying Dalton's law.",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "SINGLE_CHOICE",
    "stem": "A gas mixture contains 7 g N2 and 8 g Ar at total pressure 27 bar. Using N=14 and Ar=40, find the partial pressure of N2.",
    "options": [
      {
        "id": "opt-A",
        "text": "(1) 9 bar"
      },
      {
        "id": "opt-B",
        "text": "(2) 12 bar"
      },
      {
        "id": "opt-C",
        "text": "(3) 15 bar"
      },
      {
        "id": "opt-D",
        "text": "(4) 18 bar"
      }
    ],
    "hints": [
      "[CONCEPT] Convert each gas mass to moles.",
      "[METHOD] Form the nitrogen mole fraction before multiplying by total pressure."
    ],
    "steps": [
      "n(N2)=7/28=0.25 mol and n(Ar)=8/40=0.20 mol.",
      "The N2 mole fraction is 0.25/0.45=5/9.",
      "Dalton's law gives p(N2)=(5/9)\u00d727=15 bar."
    ],
    "limitingCheck": "The remaining argon pressure is 12 bar and the two partial pressures sum to 27 bar.",
    "check": "The remaining argon pressure is 12 bar and the two partial pressures sum to 27 bar.",
    "trapWarning": "Using mass fraction instead of mole fraction for partial pressure.",
    "correctKey": "opt-A",
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 4,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Chemistry)"
  },
  {
    "id": "PYQ-CHEM-NEET-2020-E1-Q123",
    "code": "PYQ-CHEM-NEET-2020-E1-Q123",
    "title": "NEET (UG) \u00b7 English Set E1 \u00b7 Q123 \u00b7 Some Basic Concepts of Chemistry / Mole Concept / Stoichiometry",
    "subjectCode": "CHEM",
    "subject": "Chemistry",
    "topicCode": "SOME_BASIC_CONCEPTS_OF_CHEMISTRY",
    "topic": "Some Basic Concepts of Chemistry / Mole Concept / Stoichiometry",
    "subtopic": "CAP-CHEM-STOICH-MASS-MOLE",
    "exam": "NEET (UG)",
    "year": 2020,
    "paper": "English Set E1",
    "questionNumber": "123",
    "section": "FAM-CHEM-STOICH-AMOUNT-MAPPING",
    "markingScheme": "+4 / -1",
    "difficultyBand": "D2",
    "difficultyScore": 4,
    "difficultyBasis": "Requires distinguishing molecule moles from atom moles for a diatomic sample.",
    "cognitiveComponents": {
      "algebra_computational_load": 0,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 1
    },
    "qrtDemand": "VERIFY",
    "kind": "SINGLE_CHOICE",
    "stem": "Which 1 g sample contains the greatest number of atoms: Ag (108), Mg (24), O2 (O=16), or Li (7)?",
    "options": [
      {
        "id": "opt-A",
        "text": "(1) 1 g Ag"
      },
      {
        "id": "opt-B",
        "text": "(2) 1 g Mg"
      },
      {
        "id": "opt-C",
        "text": "(3) 1 g O2"
      },
      {
        "id": "opt-D",
        "text": "(4) 1 g Li"
      }
    ],
    "hints": [
      "[CONCEPT] Write moles of atoms per gram for each metallic sample.",
      "[METHOD] For O2, convert molecule moles to atom moles before comparing."
    ],
    "steps": [
      "For elemental metals, atom moles per gram are 1/M; lithium gives 1/7 mol atoms per gram.",
      "For O2, 1 g is 1/32 mol molecules but 2/32=1/16 mol O atoms.",
      "Since 1/7 exceeds 1/16, 1/24 and 1/108, lithium has the most atoms."
    ],
    "limitingCheck": "The ranking by atoms per gram is Li > O > Mg > Ag.",
    "check": "The ranking by atoms per gram is Li > O > Mg > Ag.",
    "trapWarning": "Comparing molar masses without doubling the atom count in O2.",
    "correctKey": "opt-A",
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 4,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Chemistry)"
  },
  {
    "id": "PYQ-CHEM-NEET-2020-E1-Q125",
    "code": "PYQ-CHEM-NEET-2020-E1-Q125",
    "title": "NEET (UG) \u00b7 English Set E1 \u00b7 Q125 \u00b7 Redox Reactions",
    "subjectCode": "CHEM",
    "subject": "Chemistry",
    "topicCode": "REDOX_REACTIONS",
    "topic": "Redox Reactions",
    "subtopic": "CAP-CHEM-REDOX-OXIDATION-STATE",
    "exam": "NEET (UG)",
    "year": 2020,
    "paper": "English Set E1",
    "questionNumber": "125",
    "section": "FAM-CHEM-REDOX-REACTION-CLASSIFICATION",
    "markingScheme": "+4 / -1",
    "difficultyBand": "D1",
    "difficultyScore": 2,
    "difficultyBasis": "Direct oxidation-state assignment.",
    "cognitiveComponents": {
      "algebra_computational_load": 0,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 0,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "SINGLE_CHOICE",
    "stem": "For the conversion CH4 + 4Cl2 -> CCl4 + 4HCl, identify the change in oxidation number of carbon.",
    "options": [
      {
        "id": "opt-A",
        "text": "(1) +4 to +4"
      },
      {
        "id": "opt-B",
        "text": "(2) 0 to +4"
      },
      {
        "id": "opt-C",
        "text": "(3) -4 to +4"
      },
      {
        "id": "opt-D",
        "text": "(4) 0 to -4"
      }
    ],
    "hints": [
      "[CONCEPT] Use hydrogen's +1 state to solve carbon in methane.",
      "[METHOD] Use chlorine's -1 state to solve carbon in CCl4."
    ],
    "steps": [
      "In CH4, four H(+1) atoms require carbon to be -4.",
      "In CCl4, four Cl(-1) atoms require carbon to be +4.",
      "Carbon therefore rises by eight oxidation-number units, from -4 to +4."
    ],
    "limitingCheck": "Carbon is oxidized while chlorine is reduced from 0 in Cl2 to -1 in the products.",
    "check": "Carbon is oxidized while chlorine is reduced from 0 in Cl2 to -1 in the products.",
    "trapWarning": "Assigning elemental carbon's zero state to carbon inside methane.",
    "correctKey": "opt-A",
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 4,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Chemistry)"
  },
  {
    "id": "PYQ-CHEM-JEEADV-2014-P1-Q29",
    "code": "PYQ-CHEM-JEEADV-2014-P1-Q29",
    "title": "JEE (Advanced) \u00b7 Paper 1 \u00b7 Q29 \u00b7 Redox Reactions",
    "subjectCode": "CHEM",
    "subject": "Chemistry",
    "topicCode": "REDOX_REACTIONS",
    "topic": "Redox Reactions",
    "subtopic": "CAP-CHEM-REDOX-BALANCE-ELECTRON",
    "exam": "JEE (Advanced)",
    "year": 2014,
    "paper": "Paper 1",
    "questionNumber": "29",
    "section": "FAM-CHEM-REDOX-ACIDIC-MEDIUM-BALANCE",
    "markingScheme": "+3 / 0",
    "difficultyBand": "D3",
    "difficultyScore": 6,
    "difficultyBasis": "Half-reaction balancing must be reconciled with molecular bisulfate notation.",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 2,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 1
    },
    "qrtDemand": "MODEL",
    "kind": "MULTIPLE_CHOICE",
    "stem": "Balance the acidic reaction in which iodide and chlorate react in sulfuric-acid medium to form chloride, bisulfate and iodine. Determine which source statements about the balanced equation are correct.",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) HSO4- has coefficient 6"
      },
      {
        "id": "opt-B",
        "text": "(B) I- is oxidized"
      },
      {
        "id": "opt-C",
        "text": "(C) sulfur is reduced"
      },
      {
        "id": "opt-D",
        "text": "(D) H2O is a product"
      }
    ],
    "hints": [
      "[CONCEPT] Balance chlorate to chloride in acidic medium.",
      "[METHOD] Balance iodide oxidation and equalize electrons.",
      "[METHOD] Rewrite the six H+ equivalents using H2SO4 and HSO4-."
    ],
    "steps": [
      "Electron balance gives ClO3- + 6H+ + 6I- -> Cl- + 3I2 + 3H2O.",
      "Writing the six acidic protons as six H2SO4 molecules introduces six HSO4- products.",
      "Iodide is oxidized to I2, sulfur remains +6, and water is formed; thus A, B and D are chemically correct."
    ],
    "limitingCheck": "Atoms and charge balance in ClO3- +6I-+6H2SO4 -> Cl-+3I2+6HSO4-+3H2O.",
    "check": "Atoms and charge balance in ClO3- +6I-+6H2SO4 -> Cl-+3I2+6HSO4-+3H2O.",
    "trapWarning": "Treating sulfuric acid as a redox participant instead of the acidic medium.",
    "correctKey": "opt-A",
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Chemistry)"
  },
  {
    "id": "PYQ-CHEM-JEEADV-2014-P1-Q39",
    "code": "PYQ-CHEM-JEEADV-2014-P1-Q39",
    "title": "JEE (Advanced) \u00b7 Paper 1 \u00b7 Q39 \u00b7 Some Basic Concepts of Chemistry / Mole Concept / Stoichiometry",
    "subjectCode": "CHEM",
    "subject": "Chemistry",
    "topicCode": "SOME_BASIC_CONCEPTS_OF_CHEMISTRY",
    "topic": "Some Basic Concepts of Chemistry / Mole Concept / Stoichiometry",
    "subtopic": "CAP-CHEM-MOLE-CONCENTRATION-TO-AMOUNT",
    "exam": "JEE (Advanced)",
    "year": 2014,
    "paper": "Paper 1",
    "questionNumber": "39",
    "section": "FAM-CHEM-STOICH-AMOUNT-MAPPING",
    "markingScheme": "+3 / 0",
    "difficultyBand": "D2",
    "difficultyScore": 5,
    "difficultyBasis": "Requires choosing a volume basis and using the no-volume-change condition correctly.",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 1
    },
    "qrtDemand": "MODEL",
    "kind": "INTEGER",
    "stem": "A compound H2X of molar mass 80 g/mol forms a 3.2 M solution in a solvent of density 0.4 g/mL. Assuming dissolution causes no volume change, determine the solution molality.",
    "options": [],
    "hints": [
      "[CONCEPT] Choose a 1 L solution basis to read moles directly from molarity.",
      "[METHOD] Use the solvent density to convert that solvent volume into kilograms."
    ],
    "steps": [
      "A 1 L solution at 3.2 M contains 3.2 mol solute.",
      "With no volume change, the solvent occupies 1 L; at 0.4 g/mL its mass is 400 g=0.4 kg.",
      "Molality=3.2/0.4=8 mol kg^-1."
    ],
    "limitingCheck": "The solute molar mass is not needed once molarity and solvent mass on the 1 L basis are known.",
    "check": "The solute molar mass is not needed once molarity and solvent mass on the 1 L basis are known.",
    "trapWarning": "Using solution density or subtracting solute volume despite the stated no-volume-change model.",
    "correctKey": null,
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Chemistry)"
  },
  {
    "id": "PYQ-CHEM-JEEADV-2016-P1-Q32",
    "code": "PYQ-CHEM-JEEADV-2016-P1-Q32",
    "title": "JEE (Advanced) \u00b7 Paper 1 \u00b7 Q32 \u00b7 Some Basic Concepts of Chemistry / Mole Concept / Stoichiometry",
    "subjectCode": "CHEM",
    "subject": "Chemistry",
    "topicCode": "SOME_BASIC_CONCEPTS_OF_CHEMISTRY",
    "topic": "Some Basic Concepts of Chemistry / Mole Concept / Stoichiometry",
    "subtopic": "CAP-CHEM-MOLE-CONCENTRATION-TO-AMOUNT",
    "exam": "JEE (Advanced)",
    "year": 2016,
    "paper": "Paper 1",
    "questionNumber": "32",
    "section": "FAM-CHEM-STOICH-AMOUNT-MAPPING",
    "markingScheme": "+3 / 0",
    "difficultyBand": "D3",
    "difficultyScore": 6,
    "difficultyBasis": "Links mole fraction, molality, molarity and density on a consistent amount basis.",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 2,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 1
    },
    "qrtDemand": "VERIFY",
    "kind": "INTEGER",
    "stem": "A solution has solute mole fraction 0.1. At 298 K its molarity equals its molality, and its density is 2.0 g cm^-3. Find the ratio of solute molar mass to solvent molar mass.",
    "options": [],
    "hints": [
      "[CONCEPT] Represent x_solute=0.1 with 1 mol solute and 9 mol solvent.",
      "[METHOD] Write molality from the solvent mass.",
      "[METHOD] Use density to write solution volume and equate molarity to molality."
    ],
    "steps": [
      "Let 1 mol solute be mixed with 9 mol solvent, consistent with solute mole fraction 0.1.",
      "If solute molar mass is Ms and solvent molar mass is Mw, molality is 1/(9Mw/1000)=1000/(9Mw).",
      "Solution volume is (Ms+9Mw)/2000 L, so molarity=2000/(Ms+9Mw). Equating gives Ms=9Mw."
    ],
    "limitingCheck": "Substituting Ms/Mw=9 makes both concentration expressions identical.",
    "check": "Substituting Ms/Mw=9 makes both concentration expressions identical.",
    "trapWarning": "Equating concentration formulas without converting solvent mass and solution volume to compatible units.",
    "correctKey": null,
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Chemistry)"
  },
  {
    "id": "PYQ-CHEM-JEEADV-2016-P1-Q34",
    "code": "PYQ-CHEM-JEEADV-2016-P1-Q34",
    "title": "JEE (Advanced) \u00b7 Paper 1 \u00b7 Q34 \u00b7 Redox Reactions",
    "subjectCode": "CHEM",
    "subject": "Chemistry",
    "topicCode": "REDOX_REACTIONS",
    "topic": "Redox Reactions",
    "subtopic": "CAP-CHEM-REDOX-BALANCE-ELECTRON",
    "exam": "JEE (Advanced)",
    "year": 2016,
    "paper": "Paper 1",
    "questionNumber": "34",
    "section": "FAM-CHEM-REDOX-ACIDIC-MEDIUM-BALANCE",
    "markingScheme": "+3 / 0",
    "difficultyBand": "D3",
    "difficultyScore": 6,
    "difficultyBasis": "Requires medium-dependent permanganate reduction plus sulfur electron accounting.",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 2,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 1
    },
    "qrtDemand": "VERIFY",
    "kind": "INTEGER",
    "stem": "In neutral or faintly alkaline solution, 8 mol permanganate ions quantitatively oxidize thiosulfate ions. Find the moles X of the sulfur-containing product specified by the source.",
    "options": [],
    "hints": [
      "[CONCEPT] Identify the permanganate product in neutral/faintly alkaline medium.",
      "[METHOD] Count electrons accepted per Mn and released per thiosulfate.",
      "[METHOD] Use the electron ratio to obtain sulfate moles."
    ],
    "steps": [
      "In neutral/basic medium, MnO4- gains 3 electrons per Mn to form MnO2.",
      "Oxidation of S2O3^2- to two sulfate ions releases 8 electrons per thiosulfate ion.",
      "Electron balance gives 8MnO4- : 3S2O3^2- : 6SO4^2-, so 8 mol permanganate produces 6 mol sulfate."
    ],
    "limitingCheck": "8 permanganates accept 24 electrons; 3 thiosulfates release 24 electrons.",
    "check": "8 permanganates accept 24 electrons; 3 thiosulfates release 24 electrons.",
    "trapWarning": "Using the acidic MnO4-/Mn2+ five-electron change in a neutral/basic question.",
    "correctKey": null,
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Chemistry)"
  },
  {
    "id": "PYQ-CHEM-JEEADV-2018-P1-Q08",
    "code": "PYQ-CHEM-JEEADV-2018-P1-Q08",
    "title": "JEE (Advanced) \u00b7 Paper 1 \u00b7 Q8 \u00b7 Some Basic Concepts of Chemistry / Mole Concept / Stoichiometry",
    "subjectCode": "CHEM",
    "subject": "Chemistry",
    "topicCode": "SOME_BASIC_CONCEPTS_OF_CHEMISTRY",
    "topic": "Some Basic Concepts of Chemistry / Mole Concept / Stoichiometry",
    "subtopic": "CAP-CHEM-STOICH-MASS-MOLE",
    "exam": "JEE (Advanced)",
    "year": 2018,
    "paper": "Paper 1",
    "questionNumber": "8",
    "section": "FAM-CHEM-STOICH-AMOUNT-MAPPING",
    "markingScheme": "+3 / 0",
    "difficultyBand": "D3",
    "difficultyScore": 7,
    "difficultyBasis": "Chains two complete stoichiometric reactions and a coordination-number constraint.",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 2,
      "reasoning_chain_length": 2,
      "representation_translation": 1,
      "trap_exception_sensitivity": 1
    },
    "qrtDemand": "SYNTHESIZE",
    "kind": "NUMERIC_QUANTITY",
    "stem": "Ammonia generated by reacting 1584 g ammonium sulfate with calcium hydroxide is completely consumed by 952 g NiCl2\u00b76H2O to form a stable nickel-ammonia coordination compound. Assuming both reactions go to completion, find the combined mass of gypsum and the nickel-ammonia product.",
    "options": [],
    "hints": [
      "[CONCEPT] Convert ammonium sulfate to moles and determine both NH3 and gypsum amounts.",
      "[METHOD] Convert the hydrated nickel salt to moles.",
      "[METHOD] Use six NH3 ligands per nickel, then add the two product masses."
    ],
    "steps": [
      "1584/132=12 mol (NH4)2SO4, producing 24 mol NH3 and 12 mol CaSO4\u00b72H2O; gypsum mass=12\u00d7172=2064 g.",
      "952/238=4 mol NiCl2\u00b76H2O, which consumes 24 mol NH3 to form 4 mol [Ni(NH3)6]Cl2.",
      "Molar mass of [Ni(NH3)6]Cl2 is 232 g/mol, so product mass=928 g; total=2064+928=2992 g."
    ],
    "limitingCheck": "The 24 mol NH3 generated exactly matches the six-ligand demand of 4 mol nickel salt.",
    "check": "The 24 mol NH3 generated exactly matches the six-ligand demand of 4 mol nickel salt.",
    "trapWarning": "Calculating one product mass without checking that generated NH3 and nickel salt are stoichiometrically matched.",
    "correctKey": null,
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Chemistry)"
  },
  {
    "id": "PYQ-CHEM-JEEADV-2018-P2-Q08",
    "code": "PYQ-CHEM-JEEADV-2018-P2-Q08",
    "title": "JEE (Advanced) \u00b7 Paper 2 \u00b7 Q8 \u00b7 Redox Reactions",
    "subjectCode": "CHEM",
    "subject": "Chemistry",
    "topicCode": "REDOX_REACTIONS",
    "topic": "Redox Reactions",
    "subtopic": "CAP-CHEM-STOICH-MOLE-RATIO",
    "exam": "JEE (Advanced)",
    "year": 2018,
    "paper": "Paper 2",
    "questionNumber": "8",
    "section": "FAM-CHEM-REDOX-REACTION-CLASSIFICATION",
    "markingScheme": "+3 / 0",
    "difficultyBand": "D2",
    "difficultyScore": 5,
    "difficultyBasis": "Requires combining partial oxidation and self-reduction into one net stoichiometric relation.",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 2,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "NUMERIC_QUANTITY",
    "stem": "Galena is partially oxidized in air and then heated without further air so that self-reduction occurs. Find the kilograms of lead produced per kilogram of oxygen consumed.",
    "options": [],
    "hints": [
      "[CONCEPT] Write roasting of PbS to PbO and SO2.",
      "[METHOD] Write self-reduction of PbO by remaining PbS.",
      "[METHOD] Add the reactions and cancel PbO before taking the mass ratio."
    ],
    "steps": [
      "Combining roasting and self-reduction gives the net stoichiometry 3PbS + 3O2 -> 3Pb + 3SO2.",
      "Thus one mole O2 consumed corresponds to one mole Pb produced.",
      "The mass ratio is 207/32=6.46875, which rounds to 6.47."
    ],
    "limitingCheck": "The sulfur balance is one SO2 per PbS and the oxygen balance is one O2 per Pb in the net reaction.",
    "check": "The sulfur balance is one SO2 per PbS and the oxygen balance is one O2 per Pb in the net reaction.",
    "trapWarning": "Using only the roasting equation and ignoring the subsequent self-reduction.",
    "correctKey": null,
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Chemistry)"
  },
  {
    "id": "PYQ-CHEM-JEEADV-2018-P2-Q09",
    "code": "PYQ-CHEM-JEEADV-2018-P2-Q09",
    "title": "JEE (Advanced) \u00b7 Paper 2 \u00b7 Q9 \u00b7 Redox Reactions",
    "subjectCode": "CHEM",
    "subject": "Chemistry",
    "topicCode": "REDOX_REACTIONS",
    "topic": "Redox Reactions",
    "subtopic": "CAP-CHEM-REDOX-BALANCE-ELECTRON",
    "exam": "JEE (Advanced)",
    "year": 2018,
    "paper": "Paper 2",
    "questionNumber": "9",
    "section": "FAM-CHEM-REDOX-ACIDIC-MEDIUM-BALANCE",
    "markingScheme": "+3 / 0",
    "difficultyBand": "D3",
    "difficultyScore": 6,
    "difficultyBasis": "Back-calculates an original salt amount through a redox titration stoichiometry.",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 2,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 1
    },
    "qrtDemand": "VERIFY",
    "kind": "NUMERIC_QUANTITY",
    "stem": "An unknown amount of MnCl2 is converted completely to permanganate. After acidification, 225 mg oxalic acid is added until the permanganate colour disappears. Find the mass of MnCl2 originally present.",
    "options": [],
    "hints": [
      "[CONCEPT] Convert 225 mg oxalic acid to millimoles.",
      "[METHOD] Use the 5 oxalate : 2 permanganate acidic redox ratio.",
      "[METHOD] Map permanganate moles one-for-one back to original MnCl2 moles."
    ],
    "steps": [
      "225 mg oxalic acid is 0.225/90=2.5 mmol oxalate equivalents.",
      "In acid, 2MnO4- react with 5C2O4^2-, so 2.5 mmol oxalate corresponds to 1.0 mmol permanganate.",
      "Each original MnCl2 gives one Mn atom and hence one permanganate; 1.0 mmol MnCl2 has mass 0.001\u00d7126=126 mg."
    ],
    "limitingCheck": "The 5:2 oxalate:permanganate ratio maps 2.5 mmol exactly to 1.0 mmol.",
    "check": "The 5:2 oxalate:permanganate ratio maps 2.5 mmol exactly to 1.0 mmol.",
    "trapWarning": "Using a 1:1 oxalate-to-permanganate ratio.",
    "correctKey": null,
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Chemistry)"
  },
  {
    "id": "PYQ-CHEM-JEEADV-2019-P2-Q09",
    "code": "PYQ-CHEM-JEEADV-2019-P2-Q09",
    "title": "JEE (Advanced) \u00b7 Paper 2 \u00b7 Q9 \u00b7 Redox Reactions",
    "subjectCode": "CHEM",
    "subject": "Chemistry",
    "topicCode": "REDOX_REACTIONS",
    "topic": "Redox Reactions",
    "subtopic": "CAP-CHEM-REDOX-BALANCE-ELECTRON",
    "exam": "JEE (Advanced)",
    "year": 2019,
    "paper": "Paper 2",
    "questionNumber": "9",
    "section": "FAM-CHEM-REDOX-ACIDIC-MEDIUM-BALANCE",
    "markingScheme": "+3 / 0",
    "difficultyBand": "D3",
    "difficultyScore": 6,
    "difficultyBasis": "The main difficulty is interpreting rhombic sulfur as S8 before balancing the redox reaction.",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 2,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 1
    },
    "qrtDemand": "VERIFY",
    "kind": "NUMERIC_QUANTITY",
    "stem": "One mole of rhombic sulfur is completely oxidized by concentrated nitric acid to sulfur's highest oxidation state. Find the mass of water produced.",
    "options": [],
    "hints": [
      "[CONCEPT] Recall the molecular form of rhombic sulfur.",
      "[METHOD] Balance oxidation of S8 to sulfate with nitrate reduced to NO2.",
      "[METHOD] Read water moles from the balanced equation and convert to mass."
    ],
    "steps": [
      "Rhombic sulfur is S8, so one mole contains 8 mol sulfur atoms.",
      "Balancing with concentrated nitric acid gives S8 + 48HNO3 -> 8H2SO4 + 48NO2 + 16H2O.",
      "Thus 16 mol water form, with mass 16\u00d718=288 g."
    ],
    "limitingCheck": "Sulfur, nitrogen, hydrogen and oxygen atoms all balance in the molecular equation.",
    "check": "Sulfur, nitrogen, hydrogen and oxygen atoms all balance in the molecular equation.",
    "trapWarning": "Treating one mole of rhombic sulfur as one mole of S atoms, which gives an eightfold error.",
    "correctKey": null,
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Chemistry)"
  },
  {
    "id": "PYQ-CHEM-JEEADV-2020-P2-Q03",
    "code": "PYQ-CHEM-JEEADV-2020-P2-Q03",
    "title": "JEE (Advanced) \u00b7 Paper 2 \u00b7 Q3 \u00b7 Redox Reactions",
    "subjectCode": "CHEM",
    "subject": "Chemistry",
    "topicCode": "REDOX_REACTIONS",
    "topic": "Redox Reactions",
    "subtopic": "CAP-CHEM-REDOX-BALANCE-ELECTRON",
    "exam": "JEE (Advanced)",
    "year": 2020,
    "paper": "Paper 2",
    "questionNumber": "3",
    "section": "FAM-CHEM-REDOX-ACIDIC-MEDIUM-BALANCE",
    "markingScheme": "+3 / 0",
    "difficultyBand": "D2",
    "difficultyScore": 5,
    "difficultyBasis": "Medium determines the manganese product and therefore the electron ratio.",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 2,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "NUMERIC_QUANTITY",
    "stem": "In weakly basic solution, permanganate oxidizes iodide to iodine while manganese is reduced to MnO2. If 4 mol MnO4- react completely, find the moles of I2 formed.",
    "options": [],
    "hints": [
      "[CONCEPT] Count the electron change Mn(+7) to Mn(+4).",
      "[METHOD] Relate two I- ions to one I2 molecule and two released electrons.",
      "[METHOD] Match total electrons for 4 mol permanganate."
    ],
    "steps": [
      "MnO4- to MnO2 is a 3-electron reduction per Mn.",
      "Two iodides lose two electrons to form one I2.",
      "A balanced form is 2MnO4- + 6I- + 4H2O -> 2MnO2 + 3I2 + 8OH-.",
      "Therefore 4 mol permanganate produce 6 mol iodine."
    ],
    "limitingCheck": "Four permanganates accept 12 electrons; formation of six I2 from twelve iodides releases 12 electrons.",
    "check": "Four permanganates accept 12 electrons; formation of six I2 from twelve iodides releases 12 electrons.",
    "trapWarning": "Using the acidic five-electron MnO4-/Mn2+ reduction.",
    "correctKey": null,
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Chemistry)"
  },
  {
    "id": "PYQ-CHEM-JEEADV-2021-P2-Q11",
    "code": "PYQ-CHEM-JEEADV-2021-P2-Q11",
    "title": "JEE (Advanced) \u00b7 Paper 2 \u00b7 Q11 \u00b7 Redox Reactions",
    "subjectCode": "CHEM",
    "subject": "Chemistry",
    "topicCode": "REDOX_REACTIONS",
    "topic": "Redox Reactions",
    "subtopic": "CAP-CHEM-REDOX-BALANCE-ELECTRON",
    "exam": "JEE (Advanced)",
    "year": 2021,
    "paper": "Paper 2",
    "questionNumber": "11",
    "section": "FAM-CHEM-REDOX-ACIDIC-MEDIUM-BALANCE",
    "markingScheme": "+3 / 0",
    "difficultyBand": "D2",
    "difficultyScore": 5,
    "difficultyBasis": "Combines acidic permanganate stoichiometry with aliquot scaling.",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 1
    },
    "qrtDemand": "VERIFY",
    "kind": "NUMERIC_QUANTITY",
    "stem": "A 5.6 g iron sample is converted to Fe2+ solution and diluted to 250 mL. A 25 mL aliquot requires 12.5 mL of 0.03 M permanganate in acidic medium. If the total moles of Fe2+ in the 250 mL solution are x\u00d710^-2, find x.",
    "options": [],
    "hints": [
      "[CONCEPT] Calculate permanganate moles in 12.5 mL of 0.03 M solution.",
      "[METHOD] Use MnO4-:Fe2+=1:5 in acid.",
      "[METHOD] Scale the aliquot Fe2+ amount by 250/25."
    ],
    "steps": [
      "The aliquot uses 0.0125\u00d70.03=3.75\u00d710^-4 mol MnO4-.",
      "In acid, one permanganate oxidizes five Fe2+, so the aliquot contains 1.875\u00d710^-3 mol Fe2+.",
      "The full 250 mL is ten aliquots, giving 1.875\u00d710^-2 mol Fe2+; hence x=1.875."
    ],
    "limitingCheck": "The 10\u00d7 dilution factor is exactly the ratio 250/25.",
    "check": "The 10\u00d7 dilution factor is exactly the ratio 250/25.",
    "trapWarning": "Forgetting the factor of ten from aliquot to total solution.",
    "correctKey": null,
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Chemistry)"
  },
  {
    "id": "PYQ-CHEM-JEEADV-2021-P2-Q12",
    "code": "PYQ-CHEM-JEEADV-2021-P2-Q12",
    "title": "JEE (Advanced) \u00b7 Paper 2 \u00b7 Q12 \u00b7 Redox Reactions",
    "subjectCode": "CHEM",
    "subject": "Chemistry",
    "topicCode": "REDOX_REACTIONS",
    "topic": "Redox Reactions",
    "subtopic": "CAP-CHEM-STOICH-MASS-MOLE",
    "exam": "JEE (Advanced)",
    "year": 2021,
    "paper": "Paper 2",
    "questionNumber": "12",
    "section": "FAM-CHEM-REDOX-ACIDIC-MEDIUM-BALANCE",
    "markingScheme": "+3 / 0",
    "difficultyBand": "D2",
    "difficultyScore": 4,
    "difficultyBasis": "Converts the titrimetrically determined amount into sample mass percentage.",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "MODEL",
    "kind": "NUMERIC_QUANTITY",
    "stem": "Using the same iron-sample titration data as the preceding item, determine the mass percentage of iron in the original 5.6 g sample.",
    "options": [],
    "hints": [
      "[CONCEPT] Convert the total Fe2+ moles into grams of iron.",
      "[METHOD] Divide by the original 5.6 g sample mass and multiply by 100."
    ],
    "steps": [
      "Iron amount is 1.875\u00d710^-2 mol, corresponding to mass 0.01875\u00d756=1.05 g.",
      "Mass percent Fe=(1.05/5.6)\u00d7100=18.75%."
    ],
    "limitingCheck": "18.75% of 5.6 g is exactly 1.05 g.",
    "check": "18.75% of 5.6 g is exactly 1.05 g.",
    "trapWarning": "Reporting the aliquot iron mass as if it were the whole sample.",
    "correctKey": null,
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Chemistry)"
  },
  {
    "id": "PYQ-CHEM-JEEADV-2022-P1-Q04",
    "code": "PYQ-CHEM-JEEADV-2022-P1-Q04",
    "title": "JEE (Advanced) \u00b7 Paper 1 \u00b7 Q4 \u00b7 Redox Reactions",
    "subjectCode": "CHEM",
    "subject": "Chemistry",
    "topicCode": "REDOX_REACTIONS",
    "topic": "Redox Reactions",
    "subtopic": "CAP-CHEM-STOICH-MOLE-RATIO",
    "exam": "JEE (Advanced)",
    "year": 2022,
    "paper": "Paper 1",
    "questionNumber": "4",
    "section": "FAM-CHEM-REDOX-ACIDIC-MEDIUM-BALANCE",
    "markingScheme": "+3 / 0",
    "difficultyBand": "D2",
    "difficultyScore": 5,
    "difficultyBasis": "Chains two redox stoichiometric mappings through an iodine intermediate.",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 2,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "NUMERIC_QUANTITY",
    "stem": "A 3.74 g sample of Cu(NO3)2 is treated with excess iodide, and the iodine produced is then reacted completely with H2S to elemental sulfur. Find the mass of sulfur formed.",
    "options": [],
    "hints": [
      "[CONCEPT] Convert copper nitrate mass to Cu2+ moles.",
      "[METHOD] Use 2Cu2+ to 1I2 in the iodide reaction.",
      "[METHOD] Map I2 one-for-one to sulfur via H2S."
    ],
    "steps": [
      "3.74/187=0.020 mol Cu2+. The reaction 2Cu2+ +4I- ->2CuI+I2 gives 0.010 mol I2.",
      "H2S + I2 -> S +2HI gives one mole sulfur per mole iodine.",
      "Thus sulfur amount is 0.010 mol and mass=0.010\u00d732=0.32 g."
    ],
    "limitingCheck": "The Cu:I2 stoichiometry halves the 0.020 mol Cu2+ inventory before sulfur formation.",
    "check": "The Cu:I2 stoichiometry halves the 0.020 mol Cu2+ inventory before sulfur formation.",
    "trapWarning": "Mapping Cu2+ directly 1:1 to sulfur and missing the 2Cu:I2 ratio.",
    "correctKey": null,
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Chemistry)"
  },
  {
    "id": "PYQ-CHEM-JEEADV-2023-P2-Q10",
    "code": "PYQ-CHEM-JEEADV-2023-P2-Q10",
    "title": "JEE (Advanced) \u00b7 Paper 2 \u00b7 Q10 \u00b7 Redox Reactions",
    "subjectCode": "CHEM",
    "subject": "Chemistry",
    "topicCode": "REDOX_REACTIONS",
    "topic": "Redox Reactions",
    "subtopic": "CAP-CHEM-REDOX-OXIDATION-STATE",
    "exam": "JEE (Advanced)",
    "year": 2023,
    "paper": "Paper 2",
    "questionNumber": "10",
    "section": "FAM-CHEM-REDOX-REACTION-CLASSIFICATION",
    "markingScheme": "+3 / 0",
    "difficultyBand": "D2",
    "difficultyScore": 5,
    "difficultyBasis": "Requires atom-specific oxidation states in non-equivalent chains rather than average values.",
    "cognitiveComponents": {
      "algebra_computational_load": 0,
      "concept_model_selection": 2,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 1
    },
    "qrtDemand": "VERIFY",
    "kind": "INTEGER",
    "stem": "Across the source list F2O, H2S4O6, H2S5O6, C3O2 and Br3O8, count the atoms whose oxidation state is exactly zero.",
    "options": [],
    "hints": [
      "[CONCEPT] Identify the inner S-S chain atoms in tetrathionic and pentathionic acids.",
      "[METHOD] Use the cumulated O=C=C=C=O structure for carbon suboxide.",
      "[METHOD] Count zero-state atoms only after assigning positions individually."
    ],
    "steps": [
      "F2O contributes no zero-state atoms; in tetrathionic acid, the two inner sulfur atoms are at 0.",
      "In pentathionic acid, the three inner sulfur atoms are at 0.",
      "In carbon suboxide O=C=C=C=O, the central carbon is at 0; the bromine oxide contributes none. Total=2+3+1=6."
    ],
    "limitingCheck": "Average oxidation numbers are not assigned uniformly to non-equivalent atoms in the polythionates.",
    "check": "Average oxidation numbers are not assigned uniformly to non-equivalent atoms in the polythionates.",
    "trapWarning": "Assigning one average sulfur oxidation state to every sulfur atom.",
    "correctKey": null,
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Chemistry)"
  },
  {
    "id": "PYQ-CHEM-IITJEE-2009-P1-Q01",
    "code": "PYQ-CHEM-IITJEE-2009-P1-Q01",
    "title": "IIT-JEE \u00b7 Paper I \u00b7 Q1 \u00b7 Some Basic Concepts of Chemistry / Mole Concept / Stoichiometry",
    "subjectCode": "CHEM",
    "subject": "Chemistry",
    "topicCode": "SOME_BASIC_CONCEPTS_OF_CHEMISTRY",
    "topic": "Some Basic Concepts of Chemistry / Mole Concept / Stoichiometry",
    "subtopic": "CAP-CHEM-STOICH-MASS-MOLE",
    "exam": "IIT-JEE",
    "year": 2009,
    "paper": "Paper I",
    "questionNumber": "1",
    "section": "FAM-CHEM-STOICH-AMOUNT-MAPPING",
    "markingScheme": "+4 / -1",
    "difficultyBand": "D2",
    "difficultyScore": 4,
    "difficultyBasis": "Direct weighted-average atomic-mass calculation from isotope abundances.",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "SINGLE_CHOICE",
    "stem": "Iron consists of isotopes 54Fe, 56Fe and 57Fe with abundances 5%, 90% and 5%, respectively. Find the atomic mass of iron from these data.",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) 55.85"
      },
      {
        "id": "opt-B",
        "text": "(B) 55.95"
      },
      {
        "id": "opt-C",
        "text": "(C) 55.75"
      },
      {
        "id": "opt-D",
        "text": "(D) 56.05"
      }
    ],
    "hints": [
      "[CONCEPT] Convert the percentages to fractional abundances.",
      "[METHOD] Form the weighted mean of the isotope masses."
    ],
    "steps": [
      "Compute the abundance-weighted mean: 0.05(54)+0.90(56)+0.05(57).",
      "The contributions are 2.70+50.40+2.85=55.95."
    ],
    "limitingCheck": "The result lies close to 56 because 56Fe has 90% abundance.",
    "check": "The result lies close to 56 because 56Fe has 90% abundance.",
    "trapWarning": "Taking an unweighted arithmetic mean of the three isotope masses.",
    "correctKey": "opt-B",
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 4,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Chemistry)"
  },
  {
    "id": "PYQ-CHEM-IITJEE-2009-P1-Q04",
    "code": "PYQ-CHEM-IITJEE-2009-P1-Q04",
    "title": "IIT-JEE \u00b7 Paper I \u00b7 Q4 \u00b7 Some Basic Concepts of Chemistry / Mole Concept / Stoichiometry",
    "subjectCode": "CHEM",
    "subject": "Chemistry",
    "topicCode": "SOME_BASIC_CONCEPTS_OF_CHEMISTRY",
    "topic": "Some Basic Concepts of Chemistry / Mole Concept / Stoichiometry",
    "subtopic": "CAP-CHEM-MOLE-CONCENTRATION-TO-AMOUNT",
    "exam": "IIT-JEE",
    "year": 2009,
    "paper": "Paper I",
    "questionNumber": "4",
    "section": "FAM-CHEM-STOICH-AMOUNT-MAPPING",
    "markingScheme": "+4 / -1",
    "difficultyBand": "D2",
    "difficultyScore": 5,
    "difficultyBasis": "Connects gas-phase mole fraction to partial pressure, then solution mole fraction to amount.",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 1
    },
    "qrtDemand": "VERIFY",
    "kind": "SINGLE_CHOICE",
    "stem": "At 298 K the Henry-law constant for nitrogen in water is 1.0\u00d710^5 atm. Air has nitrogen mole fraction 0.8. At total pressure 5 atm, estimate the moles of nitrogen dissolved in 10 mol water.",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) 4.0\u00d710^-4"
      },
      {
        "id": "opt-B",
        "text": "(B) 4.0\u00d710^-5"
      },
      {
        "id": "opt-C",
        "text": "(C) 5.0\u00d710^-4"
      },
      {
        "id": "opt-D",
        "text": "(D) 4.0\u00d710^-6"
      }
    ],
    "hints": [
      "[CONCEPT] Find the nitrogen partial pressure from its gas-phase mole fraction.",
      "[METHOD] Use p=K_H x to get the dissolved mole fraction.",
      "[METHOD] Convert the small mole fraction into moles relative to 10 mol water."
    ],
    "steps": [
      "The nitrogen partial pressure is 0.8\u00d75=4 atm.",
      "Henry's law gives x_N2=p/K_H=4\u00d710^-5.",
      "For n moles N2 in about 10 mol water, x\u2248n/10, so n\u22484\u00d710^-4 mol."
    ],
    "limitingCheck": "Because the dissolved amount is tiny, including n in the denominator changes only negligible higher-order digits.",
    "check": "Because the dissolved amount is tiny, including n in the denominator changes only negligible higher-order digits.",
    "trapWarning": "Using the 5 atm total pressure directly instead of the 4 atm nitrogen partial pressure.",
    "correctKey": "opt-A",
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 4,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Chemistry)"
  },
  {
    "id": "PYQ-CHEM-IITJEE-2009-P2-Q05",
    "code": "PYQ-CHEM-IITJEE-2009-P2-Q05",
    "title": "IIT-JEE \u00b7 Paper II \u00b7 Q5 \u00b7 Redox Reactions",
    "subjectCode": "CHEM",
    "subject": "Chemistry",
    "topicCode": "REDOX_REACTIONS",
    "topic": "Redox Reactions",
    "subtopic": "CAP-CHEM-REDOX-OXIDATION-STATE",
    "exam": "IIT-JEE",
    "year": 2009,
    "paper": "Paper II",
    "questionNumber": "5",
    "section": "FAM-CHEM-REDOX-REACTION-CLASSIFICATION",
    "markingScheme": "+3 / 0",
    "difficultyBand": "D2",
    "difficultyScore": 5,
    "difficultyBasis": "Requires translating tabulated reduction potentials into oxidation feasibility for several metal pairs.",
    "cognitiveComponents": {
      "algebra_computational_load": 0,
      "concept_model_selection": 2,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 1
    },
    "qrtDemand": "VERIFY",
    "kind": "MULTIPLE_CHOICE",
    "stem": "The standard reduction potential for nitrate reduction in aqueous solution is +0.96 V. Given E\u00b0 values V2+/V=-1.19 V, Fe3+/Fe=-0.04 V, Au3+/Au=+1.40 V and Hg2+/Hg=+0.86 V, which listed pairs consist entirely of metals that can be oxidized by nitrate under standard conditions?",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) V and Hg"
      },
      {
        "id": "opt-B",
        "text": "(B) Hg and Fe"
      },
      {
        "id": "opt-C",
        "text": "(C) Fe and Au"
      },
      {
        "id": "opt-D",
        "text": "(D) Fe and V"
      }
    ],
    "hints": [
      "[CONCEPT] Treat nitrate as the cathodic reduction process.",
      "[METHOD] For each metal compute the sign of 0.96-E\u00b0(M^n+/M).",
      "[METHOD] Keep only answer pairs for which both metals give positive cell potentials."
    ],
    "steps": [
      "A metal is oxidized spontaneously by nitrate when E\u00b0cell=E\u00b0(nitrate reduction)-E\u00b0(metal-ion reduction) is positive.",
      "V, Fe and Hg all have metal-ion reduction potentials below +0.96 V, so nitrate can oxidize those metals.",
      "Au has +1.40 V, making the nitrate-driven cell potential negative for gold; therefore every pair containing only V, Fe or Hg is valid, but Fe+Au is not."
    ],
    "limitingCheck": "For Hg the margin is small but positive: 0.96-0.86=+0.10 V.",
    "check": "For Hg the margin is small but positive: 0.96-0.86=+0.10 V.",
    "trapWarning": "Ranking potentials without reversing the metal half-reaction when it acts as the oxidation half-cell.",
    "correctKey": "opt-A",
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Chemistry)"
  },
  {
    "id": "PYQ-CHEM-IITJEE-2009-P2-Q16",
    "code": "PYQ-CHEM-IITJEE-2009-P2-Q16",
    "title": "IIT-JEE \u00b7 Paper II \u00b7 Q16 \u00b7 Redox Reactions",
    "subjectCode": "CHEM",
    "subject": "Chemistry",
    "topicCode": "REDOX_REACTIONS",
    "topic": "Redox Reactions",
    "subtopic": "CAP-CHEM-REDOX-OXIDATION-STATE",
    "exam": "IIT-JEE",
    "year": 2009,
    "paper": "Paper II",
    "questionNumber": "16",
    "section": "FAM-CHEM-REDOX-REACTION-CLASSIFICATION",
    "markingScheme": "+3 / 0",
    "difficultyBand": "D1",
    "difficultyScore": 2,
    "difficultyBasis": "Direct oxidation-number calculation once the manganate product is identified.",
    "cognitiveComponents": {
      "algebra_computational_load": 0,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 0,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "INTEGER",
    "stem": "What is the oxidation number of manganese in the product formed by alkaline oxidative fusion of MnO2?",
    "options": [],
    "hints": [
      "[CONCEPT] Recall the anion produced by alkaline oxidative fusion of MnO2.",
      "[METHOD] Apply charge balance to MnO4^2-."
    ],
    "steps": [
      "In manganate MnO4^2-, let the manganese oxidation number be x.",
      "Charge balance gives x+4(-2)=-2, so x=+6."
    ],
    "limitingCheck": "Oxidative fusion raises manganese from +4 in MnO2 to +6 in manganate.",
    "check": "Oxidative fusion raises manganese from +4 in MnO2 to +6 in manganate.",
    "trapWarning": "Confusing manganate MnO4^2- with permanganate MnO4^- and answering +7.",
    "correctKey": null,
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Chemistry)"
  },
  {
    "id": "PYQ-CHEM-IITJEE-2010-P1-Q16",
    "code": "PYQ-CHEM-IITJEE-2010-P1-Q16",
    "title": "IIT-JEE \u00b7 Paper I \u00b7 Q16 \u00b7 Redox Reactions",
    "subjectCode": "CHEM",
    "subject": "Chemistry",
    "topicCode": "REDOX_REACTIONS",
    "topic": "Redox Reactions",
    "subtopic": "CAP-CHEM-REDOX-OXIDATION-STATE",
    "exam": "IIT-JEE",
    "year": 2010,
    "paper": "Paper I",
    "questionNumber": "16",
    "section": "FAM-CHEM-REDOX-REACTION-CLASSIFICATION",
    "markingScheme": "+4 / -1",
    "difficultyBand": "D1",
    "difficultyScore": 2,
    "difficultyBasis": "Identifies the reducing species by following oxidation-state change in a metallurgical self-reduction.",
    "cognitiveComponents": {
      "algebra_computational_load": 0,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 0,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "SINGLE_CHOICE",
    "stem": "In the self-reduction stage of copper extraction from chalcopyrite, which listed species acts as the reducing species?",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) S"
      },
      {
        "id": "opt-B",
        "text": "(B) O2-"
      },
      {
        "id": "opt-C",
        "text": "(C) S2-"
      },
      {
        "id": "opt-D",
        "text": "(D) SO2"
      }
    ],
    "hints": [
      "[CONCEPT] Ask which sulfur species starts at the lowest oxidation state.",
      "[METHOD] Identify which species must lose electrons while copper is reduced."
    ],
    "steps": [
      "In self-reduction, sulfide sulfur in the copper sulfide species is oxidized while reducing the copper oxide species to copper.",
      "A species that is itself oxidized is the reducing agent, so sulfide S2- is the reducing species."
    ],
    "limitingCheck": "Elemental sulfur or SO2 are not the electron donors in the source's self-reduction step.",
    "check": "Elemental sulfur or SO2 are not the electron donors in the source's self-reduction step.",
    "trapWarning": "Choosing the product SO2 because it contains sulfur, rather than identifying the species that loses electrons.",
    "correctKey": "opt-C",
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 4,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Chemistry)"
  },
  {
    "id": "PYQ-CHEM-IITJEE-2011-P2-Q01",
    "code": "PYQ-CHEM-IITJEE-2011-P2-Q01",
    "title": "IIT-JEE \u00b7 Paper II \u00b7 Q1 \u00b7 Redox Reactions",
    "subjectCode": "CHEM",
    "subject": "Chemistry",
    "topicCode": "REDOX_REACTIONS",
    "topic": "Redox Reactions",
    "subtopic": "CAP-CHEM-REDOX-OXIDATION-STATE",
    "exam": "IIT-JEE",
    "year": 2011,
    "paper": "Paper II",
    "questionNumber": "1",
    "section": "FAM-CHEM-REDOX-REACTION-CLASSIFICATION",
    "markingScheme": "+4 / -1",
    "difficultyBand": "D1",
    "difficultyScore": 2,
    "difficultyBasis": "Direct oxidation-state identification with recognition of magnetite as a mixed-valence oxide.",
    "cognitiveComponents": {
      "algebra_computational_load": 0,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 0,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "SINGLE_CHOICE",
    "stem": "Identify the oxidation states of iron in haematite and magnetite, respectively.",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) II, III in haematite; III in magnetite"
      },
      {
        "id": "opt-B",
        "text": "(B) II, III in haematite; II in magnetite"
      },
      {
        "id": "opt-C",
        "text": "(C) II in haematite; II, III in magnetite"
      },
      {
        "id": "opt-D",
        "text": "(D) III in haematite; II, III in magnetite"
      }
    ],
    "hints": [
      "[CONCEPT] Use charge balance in Fe2O3 for haematite.",
      "[METHOD] Rewrite Fe3O4 conceptually as FeO\u00b7Fe2O3."
    ],
    "steps": [
      "In Fe2O3, oxygen contributes -6, so the two iron atoms total +6 and each iron is +3.",
      "Fe3O4 can be represented as FeO\u00b7Fe2O3, showing one Fe(II) and two Fe(III) centers per formula unit."
    ],
    "limitingCheck": "The average Fe oxidation state in Fe3O4 is +8/3, consistent with a mixed +2/+3 oxide rather than a single integer state.",
    "check": "The average Fe oxidation state in Fe3O4 is +8/3, consistent with a mixed +2/+3 oxide rather than a single integer state.",
    "trapWarning": "Assigning the average +8/3 value to every iron atom in magnetite.",
    "correctKey": "opt-D",
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 4,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Chemistry)"
  },
  {
    "id": "PYQ-CHEM-JEEADV-2015-P1-Q27",
    "code": "PYQ-CHEM-JEEADV-2015-P1-Q27",
    "title": "JEE (Advanced) \u00b7 Paper 1 \u00b7 Q27 \u00b7 Redox Reactions",
    "subjectCode": "CHEM",
    "subject": "Chemistry",
    "topicCode": "REDOX_REACTIONS",
    "topic": "Redox Reactions",
    "subtopic": "CAP-CHEM-REDOX-BALANCE-ELECTRON",
    "exam": "JEE (Advanced)",
    "year": 2015,
    "paper": "Paper 1",
    "questionNumber": "27",
    "section": "FAM-CHEM-REDOX-ACIDIC-MEDIUM-BALANCE",
    "markingScheme": "+3 / 0",
    "difficultyBand": "D2",
    "difficultyScore": 5,
    "difficultyBasis": "Links electron stoichiometry, Faraday charge and electrochemical energy to a reaction-energy budget.",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 2,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "INTEGER",
    "stem": "A reaction X->Y releases 193 kJ per mole under standard conditions. Assume all of this energy is used to oxidize M+ to M3+ + 2e-, for which the associated standard potential magnitude is 0.25 V. Using F=96500 C mol^-1, how many moles of M+ can be oxidized per mole of X converted?",
    "options": [],
    "hints": [
      "[CONCEPT] Count electrons in M+ -> M3+.",
      "[METHOD] Convert two Faradays at 0.25 V into kJ per mole M+.",
      "[METHOD] Divide the available reaction energy by that per-mole requirement."
    ],
    "steps": [
      "Oxidizing one mole M+ transfers 2F coulombs through a potential magnitude 0.25 V.",
      "The energy per mole M+ is 2\u00d796500\u00d70.25=48250 J=48.25 kJ.",
      "The available 193 kJ therefore oxidizes 193/48.25=4 mol M+."
    ],
    "limitingCheck": "4\u00d748.25 kJ=193 kJ exactly.",
    "check": "4\u00d748.25 kJ=193 kJ exactly.",
    "trapWarning": "Using one electron per M+ or omitting the Faraday conversion from charge to energy.",
    "correctKey": null,
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Chemistry)"
  },
  {
    "id": "PYQ-CHEM-JEEADV-2015-P2-Q25",
    "code": "PYQ-CHEM-JEEADV-2015-P2-Q25",
    "title": "JEE (Advanced) \u00b7 Paper 2 \u00b7 Q25 \u00b7 Some Basic Concepts of Chemistry / Mole Concept / Stoichiometry",
    "subjectCode": "CHEM",
    "subject": "Chemistry",
    "topicCode": "SOME_BASIC_CONCEPTS_OF_CHEMISTRY",
    "topic": "Some Basic Concepts of Chemistry / Mole Concept / Stoichiometry",
    "subtopic": "CAP-CHEM-STOICH-MOLE-RATIO",
    "exam": "JEE (Advanced)",
    "year": 2015,
    "paper": "Paper 2",
    "questionNumber": "25",
    "section": "FAM-CHEM-STOICH-AMOUNT-MAPPING",
    "markingScheme": "+3 / 0",
    "difficultyBand": "D2",
    "difficultyScore": 3,
    "difficultyBasis": "A direct stoichiometric mapping once the complete methanolysis product count is recognized.",
    "cognitiveComponents": {
      "algebra_computational_load": 0,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "INTEGER",
    "stem": "Three moles of diborane, B2H6, react completely with methanol. How many moles of the boron-containing product are formed?",
    "options": [],
    "hints": [
      "[CONCEPT] Write the complete methanolysis stoichiometry for one B2H6 molecule.",
      "[METHOD] Scale the two product moles per diborane mole to three moles."
    ],
    "steps": [
      "Complete methanolysis can be represented as B2H6 + 6CH3OH -> 2B(OCH3)3 + 6H2.",
      "Thus one mole B2H6 gives two moles of boron-containing product.",
      "Three moles B2H6 therefore give six moles product."
    ],
    "limitingCheck": "The product count conserves the two boron atoms present in each diborane molecule.",
    "check": "The product count conserves the two boron atoms present in each diborane molecule.",
    "trapWarning": "Treating one diborane molecule as producing one boron-containing product molecule despite its two boron atoms.",
    "correctKey": null,
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Chemistry)"
  },
  {
    "id": "PYQ-CHEM-JEEADV-2015-P2-Q28",
    "code": "PYQ-CHEM-JEEADV-2015-P2-Q28",
    "title": "JEE (Advanced) \u00b7 Paper 2 \u00b7 Q28 \u00b7 Redox Reactions",
    "subjectCode": "CHEM",
    "subject": "Chemistry",
    "topicCode": "REDOX_REACTIONS",
    "topic": "Redox Reactions",
    "subtopic": "CAP-CHEM-REDOX-BALANCE-ELECTRON",
    "exam": "JEE (Advanced)",
    "year": 2015,
    "paper": "Paper 2",
    "questionNumber": "28",
    "section": "FAM-CHEM-REDOX-ACIDIC-MEDIUM-BALANCE",
    "markingScheme": "+3 / 0",
    "difficultyBand": "D3",
    "difficultyScore": 7,
    "difficultyBasis": "Requires counting oxidation of both Fe(II) and oxalate ligands before matching to acidic permanganate.",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 2,
      "reasoning_chain_length": 2,
      "representation_translation": 1,
      "trap_exception_sensitivity": 1
    },
    "qrtDemand": "VERIFY",
    "kind": "INTEGER",
    "stem": "In dilute sulfuric acid, diaquodioxalatoferrate(II) is oxidized by permanganate. Find the ratio of the magnitude of the rate of change of [H+] to that of [MnO4-] for the balanced reaction.",
    "options": [],
    "hints": [
      "[CONCEPT] Count the electron loss from Fe(II) and from each oxalate ligand.",
      "[METHOD] Write the acidic MnO4-/Mn2+ five-electron reduction half-reaction.",
      "[METHOD] Match the five-electron half-reactions and read the H+:MnO4- coefficient ratio."
    ],
    "steps": [
      "Oxidizing one [Fe(C2O4)2(H2O)2]^2- unit to Fe3+ plus four CO2 releases five electrons in total: one from Fe(II) and four from two oxalates.",
      "The acidic permanganate reduction half-reaction is MnO4- + 8H+ + 5e- -> Mn2+ + 4H2O.",
      "The five-electron counts match one-to-one, so eight H+ are consumed for each MnO4- consumed; the rate-change ratio is 8."
    ],
    "limitingCheck": "Both half-reactions involve five electrons, so no additional scaling changes the 8:1 H+:MnO4- coefficient ratio.",
    "check": "Both half-reactions involve five electrons, so no additional scaling changes the 8:1 H+:MnO4- coefficient ratio.",
    "trapWarning": "Counting only Fe(II)->Fe(III) as a one-electron oxidation and ignoring oxalate oxidation to CO2.",
    "correctKey": null,
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Chemistry)"
  },
  {
    "id": "PYQ-CHEM-JEEADV-2017-P1-Q26",
    "code": "PYQ-CHEM-JEEADV-2017-P1-Q26",
    "title": "JEE (Advanced) \u00b7 Paper 1 \u00b7 Q26 \u00b7 Some Basic Concepts of Chemistry / Mole Concept / Stoichiometry",
    "subjectCode": "CHEM",
    "subject": "Chemistry",
    "topicCode": "SOME_BASIC_CONCEPTS_OF_CHEMISTRY",
    "topic": "Some Basic Concepts of Chemistry / Mole Concept / Stoichiometry",
    "subtopic": "CAP-CHEM-STOICH-MASS-MOLE",
    "exam": "JEE (Advanced)",
    "year": 2017,
    "paper": "Paper 1",
    "questionNumber": "26",
    "section": "FAM-CHEM-STOICH-AMOUNT-MAPPING",
    "markingScheme": "+3 / 0",
    "difficultyBand": "D3",
    "difficultyScore": 6,
    "difficultyBasis": "Links crystallographic cell geometry and density directly to an atom count.",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 2,
      "trap_exception_sensitivity": 1
    },
    "qrtDemand": "VERIFY",
    "kind": "INTEGER",
    "stem": "A pure crystalline substance has an FCC structure with cell edge 400 pm and density 8 g cm^-3. The number of atoms in 256 g is N\u00d710^24. Find N.",
    "options": [],
    "hints": [
      "[CONCEPT] Convert 400 pm into centimeters and cube it.",
      "[METHOD] Use density to find the mass of one unit cell.",
      "[METHOD] Multiply the number of cells by four atoms per FCC cell."
    ],
    "steps": [
      "The cell edge is 400 pm = 4\u00d710^-8 cm, so the unit-cell volume is 6.4\u00d710^-23 cm^3.",
      "At density 8 g cm^-3, one cell has mass 5.12\u00d710^-22 g. Thus 256 g contains 5\u00d710^23 unit cells.",
      "An FCC cell contains four atoms, giving 2\u00d710^24 atoms; therefore N=2."
    ],
    "limitingCheck": "4\u00d75\u00d710^23 = 2\u00d710^24 atoms.",
    "check": "4\u00d75\u00d710^23 = 2\u00d710^24 atoms.",
    "trapWarning": "Forgetting the four atoms per FCC unit cell or mishandling pm-to-cm conversion.",
    "correctKey": null,
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Chemistry)"
  },
  {
    "id": "PYQ-CHEM-JEEADV-2026-P1-Q09",
    "code": "PYQ-CHEM-JEEADV-2026-P1-Q09",
    "title": "JEE (Advanced) \u00b7 Paper 1 \u00b7 Q9 \u00b7 Some Basic Concepts of Chemistry / Mole Concept / Stoichiometry",
    "subjectCode": "CHEM",
    "subject": "Chemistry",
    "topicCode": "SOME_BASIC_CONCEPTS_OF_CHEMISTRY",
    "topic": "Some Basic Concepts of Chemistry / Mole Concept / Stoichiometry",
    "subtopic": "CAP-CHEM-STOICH-MOLE-RATIO",
    "exam": "JEE (Advanced)",
    "year": 2026,
    "paper": "Paper 1",
    "questionNumber": "9",
    "section": "FAM-CHEM-STOICH-AMOUNT-MAPPING",
    "markingScheme": "+3 / 0",
    "difficultyBand": "D2",
    "difficultyScore": 5,
    "difficultyBasis": "Requires converting component masses to mole totals before using the ideal-gas pressure ratio.",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 2,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "NUMERIC_QUANTITY",
    "stem": "Two equal-volume cylinders at the same temperature contain He-Ar mixtures. Cylinder 1 has masses m1 of He and m2 of Ar; cylinder 2 has m2 of He and m1 of Ar. The molar mass of Ar is ten times that of He. If cylinder 1 needs five times the external pressure of cylinder 2 to have the same volume, find m1/m2.",
    "options": [],
    "hints": [
      "[CONCEPT] Express the mole count in each cylinder using M_Ar=10M_He.",
      "[METHOD] Use P\u221dn at fixed T and V.",
      "[METHOD] Set the mole-count ratio equal to five and solve for m1/m2."
    ],
    "steps": [
      "Let M be the molar mass of He and r=m1/m2. Cylinder 1 contains (10m1+m2)/(10M) moles; cylinder 2 contains (10m2+m1)/(10M) moles.",
      "At equal T and V, pressure is proportional to total moles, so (10r+1)/(10+r)=5.",
      "Solving 10r+1=50+5r gives r=49/5=9.8."
    ],
    "limitingCheck": "(10\u00d79.8+1)/(10+9.8)=99/19.8=5.",
    "check": "(10\u00d79.8+1)/(10+9.8)=99/19.8=5.",
    "trapWarning": "Comparing mixture masses rather than mixture mole counts.",
    "correctKey": null,
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Chemistry)"
  },
  {
    "id": "PYQ-CHEM-JEEMAIN-2026-06APR-S2-Q51",
    "code": "PYQ-CHEM-JEEMAIN-2026-06APR-S2-Q51",
    "title": "JEE Main \u00b7 Session 2 \u00b7 06 Apr 2026 \u00b7 Shift 2 \u00b7 Q51 \u00b7 Some Basic Concepts of Chemistry / Mole Concept / Stoichiometry",
    "subjectCode": "CHEM",
    "subject": "Chemistry",
    "topicCode": "SOME_BASIC_CONCEPTS_OF_CHEMISTRY",
    "topic": "Some Basic Concepts of Chemistry / Mole Concept / Stoichiometry",
    "subtopic": "CAP-CHEM-STOICH-MASS-MOLE",
    "exam": "JEE Main",
    "year": 2026,
    "paper": "Session 2 \u00b7 06 Apr 2026 \u00b7 Shift 2",
    "questionNumber": "51",
    "section": "FAM-CHEM-STOICH-AMOUNT-MAPPING",
    "markingScheme": "+4 / -1",
    "difficultyBand": "D2",
    "difficultyScore": 5,
    "difficultyBasis": "Requires normalizing mass, gas volume and stated mole amount to one comparable quantity: moles of atoms.",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 1
    },
    "qrtDemand": "VERIFY",
    "kind": "SINGLE_CHOICE",
    "stem": "Which of these samples contain the same total number of atoms? A: 2 g O2; B: 4 g SO2; C: 1400 mL O2 at STP; D: 0.05 L He at STP; E: 0.0625 mol H2. Use H=1, He=4, O=16 and S=32 g mol^-1.",
    "options": [
      {
        "id": "opt-A",
        "text": "A and B only"
      },
      {
        "id": "opt-B",
        "text": "B and C only"
      },
      {
        "id": "opt-C",
        "text": "C and D only"
      },
      {
        "id": "opt-A",
        "text": "A, C and E only"
      }
    ],
    "hints": [
      "[CONCEPT] Choose one common currency for every sample: moles of atoms.",
      "[METHOD] After converting to moles of molecules, multiply by atoms per molecule before comparing."
    ],
    "steps": [
      "Convert each candidate to moles of atoms. A: (2/32) mol O2 \u00d72 =0.125 mol atoms.",
      "B gives (4/64)\u00d73=0.1875 mol atoms; C gives (1.4/22.4)\u00d72=0.125 mol atoms; D gives 0.05/22.4 mol atoms.",
      "E gives 0.0625\u00d72=0.125 mol atoms, so A, C and E match."
    ],
    "limitingCheck": "A, C and E each contain 0.125 N_A atoms; B and D do not.",
    "check": "A, C and E each contain 0.125 N_A atoms; B and D do not.",
    "trapWarning": "Comparing moles of molecules instead of atoms, or forgetting the atomicity factor for O2, SO2 and H2.",
    "correctKey": "opt-A",
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 4,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Chemistry)"
  },
  {
    "id": "PYQ-CHEM-JEEMAIN-2026-04APR-S2-Q62",
    "code": "PYQ-CHEM-JEEMAIN-2026-04APR-S2-Q62",
    "title": "JEE Main \u00b7 Session 2 \u00b7 04 Apr 2026 \u00b7 Shift 2 \u00b7 Q62 \u00b7 Redox Reactions",
    "subjectCode": "CHEM",
    "subject": "Chemistry",
    "topicCode": "REDOX_REACTIONS",
    "topic": "Redox Reactions",
    "subtopic": "CAP-CHEM-REDOX-OXIDATION-STATE",
    "exam": "JEE Main",
    "year": 2026,
    "paper": "Session 2 \u00b7 04 Apr 2026 \u00b7 Shift 2",
    "questionNumber": "62",
    "section": "FAM-CHEM-REDOX-REACTION-CLASSIFICATION",
    "markingScheme": "+4 / -1",
    "difficultyBand": "D2",
    "difficultyScore": 5,
    "difficultyBasis": "Uses oxidation-state knowledge to generate a target count, then translates ionic electron configurations to unpaired-electron counts.",
    "cognitiveComponents": {
      "algebra_computational_load": 0,
      "concept_model_selection": 2,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 1
    },
    "qrtDemand": "VERIFY",
    "kind": "SINGLE_CHOICE",
    "stem": "Let |x| be the difference between the oxidation states of Mn in its highest fluoride and its highest oxide. Which listed ions have exactly |x| unpaired electrons? A: Sc3+, B: Zn2+, C: V2+, D: Fe2+, E: Co2+.",
    "options": [
      {
        "id": "opt-A",
        "text": "A and B only"
      },
      {
        "id": "opt-C",
        "text": "C, D and E only"
      },
      {
        "id": "opt-C",
        "text": "C and E only"
      },
      {
        "id": "opt-B",
        "text": "B and E only"
      }
    ],
    "hints": [
      "[CONCEPT] Determine the maximum oxidation state actually stabilized in a manganese fluoride and in a manganese oxide.",
      "[METHOD] After finding |x|, write the d-electron count of each ion rather than of the neutral atom."
    ],
    "steps": [
      "The highest manganese fluoride is MnF4, where Mn is +4; the highest manganese oxide is Mn2O7, where Mn is +7. Hence |x|=3.",
      "For the listed free ions, Sc3+ is d0, Zn2+ is d10, V2+ is d3, Fe2+ is d6 and Co2+ is d7.",
      "V2+ and Co2+ each have three unpaired d electrons in the free-ion/high-spin count, so C and E satisfy the condition."
    ],
    "limitingCheck": "The oxidation-state difference is 7-4=3, and the d3/d7 free-ion counts independently select V2+ and Co2+.",
    "check": "The oxidation-state difference is 7-4=3, and the d3/d7 free-ion counts independently select V2+ and Co2+.",
    "trapWarning": "Assuming manganese can form a +7 fluoride, or counting neutral-atom rather than ionic d-electron configurations.",
    "correctKey": "opt-C",
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 4,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Chemistry)"
  },
  {
    "id": "BOND-Q01",
    "code": "BOND-Q01",
    "title": "JEE Main 2026 (Online) 8th April Morning Shift \u00b7 Diagnostic Hub \u00b7 QBOND-Q01 \u00b7 Chemical Bonding",
    "subjectCode": "CHEM",
    "subject": "Chemistry",
    "topicCode": "CHEMICAL_BONDING",
    "topic": "Chemical Bonding",
    "subtopic": "CAP-CHEM-BONDING",
    "exam": "JEE Main 2026 (Online) 8th April Morning Shift",
    "year": "2026",
    "paper": "Diagnostic Hub",
    "questionNumber": "BOND-Q01",
    "section": "FAM-CHEM-BONDING",
    "markingScheme": "+4 / -1",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Chemical Bonding",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "SINGLE_CHOICE",
    "stem": "According to Molecular Orbital Theory (MOT), which of the following oxygen species is diamagnetic and has the shortest bond length?",
    "options": [
      {
        "id": "opt-A",
        "text": "O\u2082\u00b2\u207a"
      },
      {
        "id": "opt-B",
        "text": "O\u2082"
      },
      {
        "id": "opt-C",
        "text": "O\u2082\u207b"
      },
      {
        "id": "opt-D",
        "text": "O\u2082\u00b2\u207b"
      }
    ],
    "hints": [
      "[METHOD] Step 1: Write electronic configuration of neutral O\u2082 (16 electrons, > 14 e\u207b, NO 2s-2p mixing):",
      "[METHOD] \u03c3\u2081\u209b\u00b2 \u03c3*\u2081\u209b\u00b2 \u03c3\u2082\u209b\u00b2 \u03c3*\u2082\u209b\u00b2 \u03c3\u2082\u209a_z\u00b2 (\u03c0\u2082\u209a_x\u00b2 = \u03c0\u2082\u209a_y\u00b2) (\u03c0*\u2082\u209a_x\u00b9 = \u03c0*\u2082\u209a_y\u00b9).",
      "[METHOD] For neutral O\u2082: N_b = 10, N_a = 6 \u21d2 BO = \u00bd (10 - 6) = 2.0. Paramagnetic (2 unpaired electrons)."
    ],
    "steps": [
      "Step 1: Write electronic configuration of neutral O\u2082 (16 electrons, > 14 e\u207b, NO 2s-2p mixing):",
      "        \u03c3\u2081\u209b\u00b2 \u03c3*\u2081\u209b\u00b2 \u03c3\u2082\u209b\u00b2 \u03c3*\u2082\u209b\u00b2 \u03c3\u2082\u209a_z\u00b2 (\u03c0\u2082\u209a_x\u00b2 = \u03c0\u2082\u209a_y\u00b2) (\u03c0*\u2082\u209a_x\u00b9 = \u03c0*\u2082\u209a_y\u00b9).",
      "        For neutral O\u2082: N_b = 10, N_a = 6 \u21d2 BO = \u00bd (10 - 6) = 2.0. Paramagnetic (2 unpaired electrons).",
      "Step 2: For O\u2082\u00b2\u207a (14 electrons, like N\u2082):",
      "        Remove 2 electrons from the antibonding \u03c0* orbitals: N_b = 10, N_a = 4.",
      "        BO = \u00bd (10 - 4) = 3.0. All electrons are paired \u21d2 Diamagnetic!",
      "Step 3: For O\u2082\u207b (17 electrons): BO = \u00bd (10 - 7) = 1.5. Paramagnetic (1 unpaired electron).",
      "Step 4: For O\u2082\u00b2\u207b (18 electrons, peroxide): BO = \u00bd (10 - 8) = 1.0. Diamagnetic.",
      "Step 5: Comparing Bond Orders: O\u2082\u00b2\u207a (3.0) > O\u2082 (2.0) > O\u2082\u207b (1.5) > O\u2082\u00b2\u207b (1.0).",
      "Step 6: Since Bond Length \u221d 1 / (Bond Order), O\u2082\u00b2\u207a has the highest bond order (3.0) and therefore the SHORTEST bond length, while being completely diamagnetic."
    ],
    "limitingCheck": "Independent check: recompute the governing relation and verify that the stem constraints select O\u2082\u00b2\u207a (Option A).",
    "check": "Independent check: recompute the governing relation and verify that the stem constraints select O\u2082\u00b2\u207a (Option A).",
    "trapWarning": "Both O\u2082\u00b2\u207a and O\u2082\u00b2\u207b are diamagnetic! But O\u2082\u00b2\u207b has a single bond (BO = 1.0, longest bond length), whereas O\u2082\u00b2\u207a has a triple bond (BO = 3.0, shortest bond length).",
    "correctKey": "opt-A",
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 4,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Chemistry)"
  },
  {
    "id": "BOND-Q02",
    "code": "BOND-Q02",
    "title": "JEE Main 2025 (Online) 24th January Morning Shift \u00b7 Diagnostic Hub \u00b7 QBOND-Q02 \u00b7 Chemical Bonding",
    "subjectCode": "CHEM",
    "subject": "Chemistry",
    "topicCode": "CHEMICAL_BONDING",
    "topic": "Chemical Bonding",
    "subtopic": "CAP-CHEM-BONDING",
    "exam": "JEE Main 2025 (Online) 24th January Morning Shift",
    "year": "2025",
    "paper": "Diagnostic Hub",
    "questionNumber": "BOND-Q02",
    "section": "FAM-CHEM-BONDING",
    "markingScheme": "+4 / -1",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Chemical Bonding",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "SINGLE_CHOICE",
    "stem": "The geometry and net dipole moment of XeF\u2084 and SF\u2084 respectively are:",
    "options": [
      {
        "id": "opt-A",
        "text": "XeF\u2084: Square planar, \u03bc = 0; SF\u2084: See-saw, \u03bc \u2260 0"
      },
      {
        "id": "opt-B",
        "text": "XeF\u2084: Tetrahedral, \u03bc = 0; SF\u2084: Square planar, \u03bc = 0"
      },
      {
        "id": "opt-C",
        "text": "XeF\u2084: See-saw, \u03bc \u2260 0; SF\u2084: Square planar, \u03bc = 0"
      },
      {
        "id": "opt-D",
        "text": "XeF\u2084: Square planar, \u03bc \u2260 0; SF\u2084: See-saw, \u03bc = 0"
      }
    ],
    "hints": [
      "[METHOD] Step 1: Calculate Steric Number for XeF\u2084: Xe has 8 valence electrons. 4 bond pairs to F + 2 lone pairs = 6 electron domains \u21d2 Octahedral electronic geometry.",
      "[METHOD] Step 2: VSEPR minimization puts the 2 lone pairs opposite to each other (axial positions, 180\u00b0 apart) to minimize 90\u00b0 lp-bp repulsions.",
      "[METHOD] Step 3: The 4 fluorine atoms lie in a single plane at 90\u00b0 angles \u21d2 Square Planar molecular geometry."
    ],
    "steps": [
      "Step 1: Calculate Steric Number for XeF\u2084: Xe has 8 valence electrons. 4 bond pairs to F + 2 lone pairs = 6 electron domains \u21d2 Octahedral electronic geometry.",
      "Step 2: VSEPR minimization puts the 2 lone pairs opposite to each other (axial positions, 180\u00b0 apart) to minimize 90\u00b0 lp-bp repulsions.",
      "Step 3: The 4 fluorine atoms lie in a single plane at 90\u00b0 angles \u21d2 Square Planar molecular geometry.",
      "Step 4: Vectorial Dipole Sum for XeF\u2084: The four Xe-F bond dipoles cancel out in pairs in the plane, and the two axial lone pair moments cancel each other \u21d2 Net Dipole Moment \u03bc = 0.",
      "Step 5: Calculate Steric Number for SF\u2084: S has 6 valence electrons. 4 bond pairs to F + 1 lone pair = 5 electron domains \u21d2 Trigonal Bipyramidal electronic geometry.",
      "Step 6: Bent's Rule / VSEPR: Lone pair occupies an equatorial position (experiencing only two 90\u00b0 repulsions instead of three) \u21d2 See-saw molecular geometry.",
      "Step 7: In See-saw SF\u2084, the axial F-S-F bond angle is ~173\u00b0 (bent by lone pair) and equatorial F-S-F angle is ~102\u00b0. The dipoles do NOT cancel \u21d2 Net Dipole Moment \u03bc \u2260 0."
    ],
    "limitingCheck": "Independent check: recompute the governing relation and verify that the stem constraints select XeF\u2084: Square planar, \u03bc = 0; SF\u2084: See-saw, \u03bc \u2260 0 (Option A).",
    "check": "Independent check: recompute the governing relation and verify that the stem constraints select XeF\u2084: Square planar, \u03bc = 0; SF\u2084: See-saw, \u03bc \u2260 0 (Option A).",
    "trapWarning": "Do not treat XeF\u2084 as tetrahedral! The two lone pairs force it into an octahedral family with square planar geometry.",
    "correctKey": "opt-A",
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 4,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Chemistry)"
  },
  {
    "id": "BOND-Q03",
    "code": "BOND-Q03",
    "title": "JEE Main 2024 (Online) 27th January Evening Shift \u00b7 Diagnostic Hub \u00b7 QBOND-Q03 \u00b7 Chemical Bonding",
    "subjectCode": "CHEM",
    "subject": "Chemistry",
    "topicCode": "CHEMICAL_BONDING",
    "topic": "Chemical Bonding",
    "subtopic": "CAP-CHEM-BONDING",
    "exam": "JEE Main 2024 (Online) 27th January Evening Shift",
    "year": "2024",
    "paper": "Diagnostic Hub",
    "questionNumber": "BOND-Q03",
    "section": "FAM-CHEM-BONDING",
    "markingScheme": "+4 / -1",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Chemical Bonding",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "SINGLE_CHOICE",
    "stem": "Although Nitrogen and Fluorine are both highly electronegative, the dipole moment of NH\u2083 (1.47 D) is significantly greater than that of NF\u2083 (0.24 D). The correct explanation is:",
    "options": [
      {
        "id": "opt-A",
        "text": "In NH\u2083, the orbital dipole of the lone pair reinforces the resultant N-H bond dipoles, whereas in NF\u2083 it opposes the N-F bond dipoles."
      },
      {
        "id": "opt-B",
        "text": "The N-H bond is more polar than the N-F bond."
      },
      {
        "id": "opt-C",
        "text": "NF\u2083 is planar while NH\u2083 is pyramidal."
      },
      {
        "id": "opt-D",
        "text": "NH\u2083 has atomic number smaller than NF\u2083."
      }
    ],
    "hints": [
      "[METHOD] Step 1: Both NH\u2083 and NF\u2083 have trigonal pyramidal geometries (Steric number 4, 3 bond pairs + 1 lone pair, sp\u00b3 hybridization).",
      "[METHOD] Step 2: In NH\u2083, Nitrogen is more electronegative than Hydrogen (EN: N = 3.04, H = 2.20). Therefore, the three N-H bond dipoles point UPWARD toward Nitrogen.",
      "[METHOD] Step 3: The lone pair dipole also points UPWARD away from the Nitrogen nucleus. Thus, all four vector dipoles reinforce in the same direction \u21d2 High dipole moment (\u03bc = 1.47 D)."
    ],
    "steps": [
      "Step 1: Both NH\u2083 and NF\u2083 have trigonal pyramidal geometries (Steric number 4, 3 bond pairs + 1 lone pair, sp\u00b3 hybridization).",
      "Step 2: In NH\u2083, Nitrogen is more electronegative than Hydrogen (EN: N = 3.04, H = 2.20). Therefore, the three N-H bond dipoles point UPWARD toward Nitrogen.",
      "Step 3: The lone pair dipole also points UPWARD away from the Nitrogen nucleus. Thus, all four vector dipoles reinforce in the same direction \u21d2 High dipole moment (\u03bc = 1.47 D).",
      "Step 4: In NF\u2083, Fluorine is more electronegative than Nitrogen (EN: F = 3.98, N = 3.04). Therefore, the three N-F bond dipoles point DOWNWARD toward the Fluorines.",
      "Step 5: The lone pair dipole points UPWARD, directly OPPOSING the downward resultant of the three N-F bonds \u21d2 Drastic cancellation \u21d2 Small net dipole moment (\u03bc = 0.24 D)."
    ],
    "limitingCheck": "Independent check: recompute the governing relation and verify that the stem constraints select In NH\u2083, lone pair reinforces N-H bonds; in NF\u2083, lone pair opposes N-F bonds (Option A).",
    "check": "Independent check: recompute the governing relation and verify that the stem constraints select In NH\u2083, lone pair reinforces N-H bonds; in NF\u2083, lone pair opposes N-F bonds (Option A).",
    "trapWarning": "Do not argue that N-F bond is less polar; F is the most electronegative element! The cancellation is purely VECTORIAL in 3D.",
    "correctKey": "opt-A",
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 4,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Chemistry)"
  },
  {
    "id": "BOND-Q04",
    "code": "BOND-Q04",
    "title": "JEE Main 2026 (Online) 5th April Morning Shift \u00b7 Diagnostic Hub \u00b7 QBOND-Q04 \u00b7 Chemical Bonding",
    "subjectCode": "CHEM",
    "subject": "Chemistry",
    "topicCode": "CHEMICAL_BONDING",
    "topic": "Chemical Bonding",
    "subtopic": "CAP-CHEM-BONDING",
    "exam": "JEE Main 2026 (Online) 5th April Morning Shift",
    "year": "2026",
    "paper": "Diagnostic Hub",
    "questionNumber": "BOND-Q04",
    "section": "FAM-CHEM-BONDING",
    "markingScheme": "+4 / -1",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Chemical Bonding",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "SINGLE_CHOICE",
    "stem": "In gaseous phosphorus pentachloride (PCl\u2085), the axial P-Cl bonds are longer and weaker than the equatorial P-Cl bonds because:",
    "options": [
      {
        "id": "opt-A",
        "text": "Axial bond pairs experience three 90\u00b0 repulsions from equatorial bond pairs, whereas equatorial pairs experience only two 90\u00b0 repulsions."
      },
      {
        "id": "opt-A",
        "text": "Axial bonds are formed by pure p-orbitals while equatorial bonds are sp\u00b2."
      },
      {
        "id": "opt-C",
        "text": "Chlorine atoms in axial positions are more electronegative."
      },
      {
        "id": "opt-D",
        "text": "PCl\u2085 is unstable and immediately dissociates."
      }
    ],
    "hints": [
      "[METHOD] Step 1: PCl\u2085 has sp\u00b3d hybridization (Steric number = 5, trigonal bipyramidal geometry).",
      "[METHOD] Step 2: An axial P-Cl bond lies at 90\u00b0 to all three equatorial P-Cl bonds. Hence, each axial bond pair suffers THREE 90\u00b0 electron-pair repulsions.",
      "[METHOD] Step 3: An equatorial P-Cl bond lies at 120\u00b0 to the other two equatorial bonds and 90\u00b0 to the two axial bonds. Hence, each equatorial bond pair suffers only TWO 90\u00b0 repulsions (120\u00b0 repulsions are negligible)."
    ],
    "steps": [
      "Step 1: PCl\u2085 has sp\u00b3d hybridization (Steric number = 5, trigonal bipyramidal geometry).",
      "Step 2: An axial P-Cl bond lies at 90\u00b0 to all three equatorial P-Cl bonds. Hence, each axial bond pair suffers THREE 90\u00b0 electron-pair repulsions.",
      "Step 3: An equatorial P-Cl bond lies at 120\u00b0 to the other two equatorial bonds and 90\u00b0 to the two axial bonds. Hence, each equatorial bond pair suffers only TWO 90\u00b0 repulsions (120\u00b0 repulsions are negligible).",
      "Step 4: Due to greater repulsive force (3 vs 2), the axial bond pairs are pushed further away from the central Phosphorus nucleus to minimize repulsion.",
      "Step 5: Consequently, axial bonds are longer (240 pm) and weaker than equatorial bonds (202 pm), explaining why PCl\u2085 easily dissociates into PCl\u2083 + Cl\u2082 upon heating!"
    ],
    "limitingCheck": "Independent check: recompute the governing relation and verify that the stem constraints select Axial bond pairs suffer three 90\u00b0 repulsions vs two for equatorial pairs (Option A).",
    "check": "Independent check: recompute the governing relation and verify that the stem constraints select Axial bond pairs suffer three 90\u00b0 repulsions vs two for equatorial pairs (Option A).",
    "trapWarning": "All 5 attached atoms are identical chlorine atoms! The bond asymmetry arises purely from the non-equivalent 3D spatial geometry.",
    "correctKey": "opt-A",
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 4,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Chemistry)"
  },
  {
    "id": "BOND-Q05",
    "code": "BOND-Q05",
    "title": "JEE Main 2025 (Online) 30th January Morning Shift \u00b7 Diagnostic Hub \u00b7 QBOND-Q05 \u00b7 Chemical Bonding",
    "subjectCode": "CHEM",
    "subject": "Chemistry",
    "topicCode": "CHEMICAL_BONDING",
    "topic": "Chemical Bonding",
    "subtopic": "CAP-CHEM-BONDING",
    "exam": "JEE Main 2025 (Online) 30th January Morning Shift",
    "year": "2025",
    "paper": "Diagnostic Hub",
    "questionNumber": "BOND-Q05",
    "section": "FAM-CHEM-BONDING",
    "markingScheme": "+4 / -1",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Chemical Bonding",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "SINGLE_CHOICE",
    "stem": "ortho-Nitrophenol is steam volatile and has a lower boiling point than para-nitrophenol because:",
    "options": [
      {
        "id": "opt-A",
        "text": "o-Nitrophenol exhibits intramolecular H-bonding (chelation), while p-nitrophenol exhibits intermolecular H-bonding."
      },
      {
        "id": "opt-B",
        "text": "o-Nitrophenol has a higher molecular weight."
      },
      {
        "id": "opt-C",
        "text": "p-Nitrophenol has intramolecular H-bonding."
      },
      {
        "id": "opt-D",
        "text": "o-Nitrophenol is non-polar."
      }
    ],
    "hints": [
      "[METHOD] Step 1: In ortho-nitrophenol, the -OH and -NO\u2082 groups are adjacent (1,2-positions on benzene ring).",
      "[METHOD] Step 2: The phenolic hydrogen forms a 6-membered planar ring with the oxygen of the adjacent nitro group: INTRAMOLECULAR Hydrogen Bonding (chelation).",
      "[METHOD] Step 3: This internal bonding prevents the molecule from associating with neighboring molecules, keeping it as discrete, non-associated units with low boiling point and high steam volatility."
    ],
    "steps": [
      "Step 1: In ortho-nitrophenol, the -OH and -NO\u2082 groups are adjacent (1,2-positions on benzene ring).",
      "Step 2: The phenolic hydrogen forms a 6-membered planar ring with the oxygen of the adjacent nitro group: INTRAMOLECULAR Hydrogen Bonding (chelation).",
      "Step 3: This internal bonding prevents the molecule from associating with neighboring molecules, keeping it as discrete, non-associated units with low boiling point and high steam volatility.",
      "Step 4: In para-nitrophenol, the -OH and -NO\u2082 groups are far apart (1,4-positions). Intramolecular H-bonding is geometrically impossible!",
      "Step 5: Instead, p-nitrophenol forms strong INTERMOLECULAR Hydrogen Bonds between adjacent molecules, creating extensive molecular associations that require much higher thermal energy to vaporize."
    ],
    "limitingCheck": "Independent check: recompute the governing relation and verify that the stem constraints select o-Nitrophenol exhibits intramolecular H-bonding; p-nitrophenol exhibits intermolecular H-bonding (Option A).",
    "check": "Independent check: recompute the governing relation and verify that the stem constraints select o-Nitrophenol exhibits intramolecular H-bonding; p-nitrophenol exhibits intermolecular H-bonding (Option A).",
    "trapWarning": "Do not swap the two! ortho = internal chelation (steam volatile); para = intermolecular association (high boiling point).",
    "correctKey": "opt-A",
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 4,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Chemistry)"
  },
  {
    "id": "BOND-Q06",
    "code": "BOND-Q06",
    "title": "JEE Main 2024 (Online) 27th January Morning Shift \u00b7 Diagnostic Hub \u00b7 QBOND-Q06 \u00b7 Chemical Bonding",
    "subjectCode": "CHEM",
    "subject": "Chemistry",
    "topicCode": "CHEMICAL_BONDING",
    "topic": "Chemical Bonding",
    "subtopic": "CAP-CHEM-BONDING",
    "exam": "JEE Main 2024 (Online) 27th January Morning Shift",
    "year": "2024",
    "paper": "Diagnostic Hub",
    "questionNumber": "BOND-Q06",
    "section": "FAM-CHEM-BONDING",
    "markingScheme": "+4 / -1",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Chemical Bonding",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "SINGLE_CHOICE",
    "stem": "According to Molecular Orbital Theory (MOT), which of the following homonuclear diatomic species is paramagnetic with two unpaired electrons in degenerate \u03c0 orbitals despite having an even total number of electrons?",
    "options": [
      {
        "id": "opt-B",
        "text": "B\u2082 and O\u2082"
      },
      {
        "id": "opt-C",
        "text": "C\u2082 and N\u2082"
      },
      {
        "id": "opt-C",
        "text": "Li\u2082 and Be\u2082"
      },
      {
        "id": "opt-D",
        "text": "N\u2082 and O\u2082\u00b2\u207b"
      }
    ],
    "hints": [
      "[METHOD] Step 1: Write MOT configuration for B\u2082 (10 electrons, \u2264 14e\u207b regime with 2s-2p mixing crossover): \u03c3_1s\u00b2 \u03c3*_1s\u00b2 \u03c3_2s\u00b2 \u03c3*_2s\u00b2 (\u03c0_2p_x\u00b9 = \u03c0_2p_y\u00b9). The last two electrons singly occupy the degenerate bonding \u03c0_2p orbitals with parallel spins \u21d2 Paramagnetic (2 unpaired electrons).",
      "[METHOD] Step 2: Write MOT configuration for C\u2082 (12 electrons): \u03c3_1s\u00b2 \u03c3*_1s\u00b2 \u03c3_2s\u00b2 \u03c3*_2s\u00b2 (\u03c0_2p_x\u00b2 = \u03c0_2p_y\u00b2). All electrons are paired \u21d2 Diamagnetic.",
      "[METHOD] Step 3: Write MOT configuration for O\u2082 (16 electrons, > 14e\u207b regime without crossover): \u03c3_1s\u00b2 \u03c3*_1s\u00b2 \u03c3_2s\u00b2 \u03c3*_2s\u00b2 \u03c3_2p_z\u00b2 (\u03c0_2p_x\u00b2 = \u03c0_2p_y\u00b2) (\u03c0*_2p_x\u00b9 = \u03c0*_2p_y\u00b9). The last two electrons singly occupy the degenerate antibonding \u03c0* orbitals \u21d2 Paramagnetic (2 unpaired electrons)."
    ],
    "steps": [
      "Step 1: Write MOT configuration for B\u2082 (10 electrons, \u2264 14e\u207b regime with 2s-2p mixing crossover): \u03c3_1s\u00b2 \u03c3*_1s\u00b2 \u03c3_2s\u00b2 \u03c3*_2s\u00b2 (\u03c0_2p_x\u00b9 = \u03c0_2p_y\u00b9). The last two electrons singly occupy the degenerate bonding \u03c0_2p orbitals with parallel spins \u21d2 Paramagnetic (2 unpaired electrons).",
      "Step 2: Write MOT configuration for C\u2082 (12 electrons): \u03c3_1s\u00b2 \u03c3*_1s\u00b2 \u03c3_2s\u00b2 \u03c3*_2s\u00b2 (\u03c0_2p_x\u00b2 = \u03c0_2p_y\u00b2). All electrons are paired \u21d2 Diamagnetic.",
      "Step 3: Write MOT configuration for O\u2082 (16 electrons, > 14e\u207b regime without crossover): \u03c3_1s\u00b2 \u03c3*_1s\u00b2 \u03c3_2s\u00b2 \u03c3*_2s\u00b2 \u03c3_2p_z\u00b2 (\u03c0_2p_x\u00b2 = \u03c0_2p_y\u00b2) (\u03c0*_2p_x\u00b9 = \u03c0*_2p_y\u00b9). The last two electrons singly occupy the degenerate antibonding \u03c0* orbitals \u21d2 Paramagnetic (2 unpaired electrons).",
      "Step 4: Therefore, both B\u2082 and O\u2082 have two unpaired electrons in degenerate \u03c0 orbitals and are paramagnetic."
    ],
    "limitingCheck": "Independent check: recompute the governing relation and verify that the stem constraints select B\u2082 and O\u2082 (Option A).",
    "check": "Independent check: recompute the governing relation and verify that the stem constraints select B\u2082 and O\u2082 (Option A).",
    "trapWarning": "Lewis electron-dot structures erroneously predict both B\u2082 and O\u2082 to have only paired electrons (diamagnetic). MOT's successful prediction of paramagnetism was historical proof of molecular orbital theory!",
    "correctKey": "opt-B",
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 4,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Chemistry)"
  },
  {
    "id": "BOND-Q07",
    "code": "BOND-Q07",
    "title": "JEE Main 2023 (Online) 25th January Evening Shift \u00b7 Diagnostic Hub \u00b7 QBOND-Q07 \u00b7 Chemical Bonding",
    "subjectCode": "CHEM",
    "subject": "Chemistry",
    "topicCode": "CHEMICAL_BONDING",
    "topic": "Chemical Bonding",
    "subtopic": "CAP-CHEM-BONDING",
    "exam": "JEE Main 2023 (Online) 25th January Evening Shift",
    "year": "2023",
    "paper": "Diagnostic Hub",
    "questionNumber": "BOND-Q07",
    "section": "FAM-CHEM-BONDING",
    "markingScheme": "+4 / -1",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Chemical Bonding",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "SINGLE_CHOICE",
    "stem": "Both ammonia (NH\u2083) and nitrogen trifluoride (NF\u2083) have trigonal pyramidal geometries with one lone pair on nitrogen. However, the dipole moment of NH\u2083 (1.47 D) is substantially greater than that of NF\u2083 (0.24 D) because:",
    "options": [
      {
        "id": "opt-A",
        "text": "In NH\u2083, the lone-pair orbital dipole and N-H bond dipoles reinforce each other; in NF\u2083, the lone-pair dipole opposes the N-F bond dipoles."
      },
      {
        "id": "opt-B",
        "text": "Nitrogen is more electronegative than fluorine."
      },
      {
        "id": "opt-C",
        "text": "NF\u2083 is a planar molecule while NH\u2083 is pyramidal."
      },
      {
        "id": "opt-D",
        "text": "The N-H bond length is greater than the N-F bond length."
      }
    ],
    "hints": [
      "[METHOD] Step 1: Both NH\u2083 and NF\u2083 have sp\u00b3 hybridized nitrogen with 3 bond pairs and 1 lone pair (trigonal pyramidal geometry).",
      "[METHOD] Step 2: In NH\u2083, EN(N) = 3.0 > EN(H) = 2.1. The three N-H bond dipoles point toward nitrogen (upward toward the apex), in the same direction as the upward orbital dipole of the lone pair. The vectors reinforce constructively \u21d2 \u03bc_net = 1.47 D.",
      "[METHOD] Step 3: In NF\u2083, EN(F) = 4.0 > EN(N) = 3.0. The three N-F bond dipoles point downward away from nitrogen toward fluorine, OPPOSING the upward lone-pair dipole. The vectors cancel destructively \u21d2 \u03bc_net = 0.24 D."
    ],
    "steps": [
      "Step 1: Both NH\u2083 and NF\u2083 have sp\u00b3 hybridized nitrogen with 3 bond pairs and 1 lone pair (trigonal pyramidal geometry).",
      "Step 2: In NH\u2083, EN(N) = 3.0 > EN(H) = 2.1. The three N-H bond dipoles point toward nitrogen (upward toward the apex), in the same direction as the upward orbital dipole of the lone pair. The vectors reinforce constructively \u21d2 \u03bc_net = 1.47 D.",
      "Step 3: In NF\u2083, EN(F) = 4.0 > EN(N) = 3.0. The three N-F bond dipoles point downward away from nitrogen toward fluorine, OPPOSING the upward lone-pair dipole. The vectors cancel destructively \u21d2 \u03bc_net = 0.24 D.",
      "Step 4: Vectorial cancellation explains why NF\u2083 has a remarkably small dipole moment despite having highly polar N-F bonds."
    ],
    "limitingCheck": "Independent check: recompute the governing relation and verify that the stem constraints select In NH\u2083, lone pair and bond dipoles reinforce; in NF\u2083, they oppose (Option A).",
    "check": "Independent check: recompute the governing relation and verify that the stem constraints select In NH\u2083, lone pair and bond dipoles reinforce; in NF\u2083, they oppose (Option A).",
    "trapWarning": "Never judge net dipole by bond polarity alone! Fluorine is far more electronegative than hydrogen, but vectorial direction causes nearly complete cancellation in NF\u2083.",
    "correctKey": "opt-A",
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 4,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Chemistry)"
  },
  {
    "id": "BOND-Q08",
    "code": "BOND-Q08",
    "title": "JEE Main 2025 (Online) 29th January Evening Shift \u00b7 Diagnostic Hub \u00b7 QBOND-Q08 \u00b7 Chemical Bonding",
    "subjectCode": "CHEM",
    "subject": "Chemistry",
    "topicCode": "CHEMICAL_BONDING",
    "topic": "Chemical Bonding",
    "subtopic": "CAP-CHEM-BONDING",
    "exam": "JEE Main 2025 (Online) 29th January Evening Shift",
    "year": "2025",
    "paper": "Diagnostic Hub",
    "questionNumber": "BOND-Q08",
    "section": "FAM-CHEM-BONDING",
    "markingScheme": "+4 / -1",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Chemical Bonding",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "SINGLE_CHOICE",
    "stem": "In the resonance contributor of the ozone molecule (O\u2083: O_a - O_b = O_c), the formal charges on the single-bonded terminal oxygen (O_a), the central oxygen (O_b), and the double-bonded terminal oxygen (O_c) are respectively:",
    "options": [
      {
        "id": "opt-A",
        "text": "-1, +1, 0"
      },
      {
        "id": "opt-B",
        "text": "0, +1, -1"
      },
      {
        "id": "opt-C",
        "text": "+1, -1, 0"
      },
      {
        "id": "opt-D",
        "text": "0, 0, 0"
      }
    ],
    "hints": [
      "[METHOD] Step 1: Apply the universal formal charge formula: FC = V - L - \u00bd B.",
      "[METHOD] Step 2: For central oxygen O_b: V = 6, 1 lone pair (L = 2), 1 single bond + 1 double bond (B = 6). FC(O_b) = 6 - 2 - \u00bd(6) = 6 - 2 - 3 = +1.",
      "[METHOD] Step 3: For terminal single-bonded oxygen O_a: V = 6, 3 lone pairs (L = 6), 1 single bond (B = 2). FC(O_a) = 6 - 6 - \u00bd(2) = 6 - 6 - 1 = -1."
    ],
    "steps": [
      "Step 1: Apply the universal formal charge formula: FC = V - L - \u00bd B.",
      "Step 2: For central oxygen O_b: V = 6, 1 lone pair (L = 2), 1 single bond + 1 double bond (B = 6). FC(O_b) = 6 - 2 - \u00bd(6) = 6 - 2 - 3 = +1.",
      "Step 3: For terminal single-bonded oxygen O_a: V = 6, 3 lone pairs (L = 6), 1 single bond (B = 2). FC(O_a) = 6 - 6 - \u00bd(2) = 6 - 6 - 1 = -1.",
      "Step 4: For terminal double-bonded oxygen O_c: V = 6, 2 lone pairs (L = 4), 1 double bond (B = 4). FC(O_c) = 6 - 4 - \u00bd(4) = 6 - 4 - 2 = 0.",
      "Step 5: Check sum of formal charges: (-1) + (+1) + 0 = 0 (neutral molecule). Hence the charges are -1, +1, 0."
    ],
    "limitingCheck": "Independent check: recompute the governing relation and verify that the stem constraints select -1, +1, 0 (Option A).",
    "check": "Independent check: recompute the governing relation and verify that the stem constraints select -1, +1, 0 (Option A).",
    "trapWarning": "Always count individual non-bonding electrons L, not electron pairs! In O_a, 3 lone pairs = 6 non-bonding electrons.",
    "correctKey": "opt-A",
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 4,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Chemistry)"
  },
  {
    "id": "BOND-Q09",
    "code": "BOND-Q09",
    "title": "JEE Main 2024 (Online) 31st January Evening Shift \u00b7 Diagnostic Hub \u00b7 QBOND-Q09 \u00b7 Chemical Bonding",
    "subjectCode": "CHEM",
    "subject": "Chemistry",
    "topicCode": "CHEMICAL_BONDING",
    "topic": "Chemical Bonding",
    "subtopic": "CAP-CHEM-BONDING",
    "exam": "JEE Main 2024 (Online) 31st January Evening Shift",
    "year": "2024",
    "paper": "Diagnostic Hub",
    "questionNumber": "BOND-Q09",
    "section": "FAM-CHEM-BONDING",
    "markingScheme": "+4 / -1",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Chemical Bonding",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "SINGLE_CHOICE",
    "stem": "The total number of lone pairs on the central atom of XeF\u2084, SF\u2084, and ClF\u2083 respectively are:",
    "options": [
      {
        "id": "opt-A",
        "text": "2, 1, 2"
      },
      {
        "id": "opt-B",
        "text": "1, 2, 2"
      },
      {
        "id": "opt-C",
        "text": "2, 2, 1"
      },
      {
        "id": "opt-D",
        "text": "0, 1, 2"
      }
    ],
    "hints": [
      "[METHOD] Step 1: For XeF\u2084: Xe has 8 valence electrons. Steric Number = 4 \u03c3-bonds + \u00bd(8 - 4) = 4 + 2 = 6 (sp\u00b3d\u00b2). Central atom has 2 lone pairs.",
      "[METHOD] Step 2: For SF\u2084: S has 6 valence electrons. Steric Number = 4 \u03c3-bonds + \u00bd(6 - 4) = 4 + 1 = 5 (sp\u00b3d). Central atom has 1 lone pair (see-saw).",
      "[METHOD] Step 3: For ClF\u2083: Cl has 7 valence electrons. Steric Number = 3 \u03c3-bonds + \u00bd(7 - 3) = 3 + 2 = 5 (sp\u00b3d). Central atom has 2 lone pairs (T-shaped)."
    ],
    "steps": [
      "Step 1: For XeF\u2084: Xe has 8 valence electrons. Steric Number = 4 \u03c3-bonds + \u00bd(8 - 4) = 4 + 2 = 6 (sp\u00b3d\u00b2). Central atom has 2 lone pairs.",
      "Step 2: For SF\u2084: S has 6 valence electrons. Steric Number = 4 \u03c3-bonds + \u00bd(6 - 4) = 4 + 1 = 5 (sp\u00b3d). Central atom has 1 lone pair (see-saw).",
      "Step 3: For ClF\u2083: Cl has 7 valence electrons. Steric Number = 3 \u03c3-bonds + \u00bd(7 - 3) = 3 + 2 = 5 (sp\u00b3d). Central atom has 2 lone pairs (T-shaped).",
      "Step 4: Compiling lone pairs on central atoms: XeF\u2084 = 2, SF\u2084 = 1, ClF\u2083 = 2."
    ],
    "limitingCheck": "Independent check: recompute the governing relation and verify that the stem constraints select 2, 1, 2 (Option A).",
    "check": "Independent check: recompute the governing relation and verify that the stem constraints select 2, 1, 2 (Option A).",
    "trapWarning": "Do not count lone pairs on fluorine atoms! The question specifically demands lone pairs ON THE CENTRAL ATOM.",
    "correctKey": "opt-A",
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 4,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Chemistry)"
  },
  {
    "id": "BOND-Q10",
    "code": "BOND-Q10",
    "title": "JEE Main 2024 (Online) 29th January Morning Shift \u00b7 Diagnostic Hub \u00b7 QBOND-Q10 \u00b7 Chemical Bonding",
    "subjectCode": "CHEM",
    "subject": "Chemistry",
    "topicCode": "CHEMICAL_BONDING",
    "topic": "Chemical Bonding",
    "subtopic": "CAP-CHEM-BONDING",
    "exam": "JEE Main 2024 (Online) 29th January Morning Shift",
    "year": "2024",
    "paper": "Diagnostic Hub",
    "questionNumber": "BOND-Q10",
    "section": "FAM-CHEM-BONDING",
    "markingScheme": "+4 / -1",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Chemical Bonding",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "SINGLE_CHOICE",
    "stem": "The formal charge on each oxygen atom in the resonance hybrid of the carbonate ion (CO\u2083\u00b2\u207b) is:",
    "options": [
      {
        "id": "opt-A",
        "text": "-2 / 3"
      },
      {
        "id": "opt-B",
        "text": "-1 / 3"
      },
      {
        "id": "opt-C",
        "text": "-1"
      },
      {
        "id": "opt-D",
        "text": "-2"
      }
    ],
    "hints": [
      "[METHOD] Step 1: Write the canonical Lewis resonance forms of CO\u2083\u00b2\u207b. Carbon forms 1 C=O double bond and 2 C-O\u207b single bonds.",
      "[METHOD] Step 2: Total formal charge on the oxygen atoms is -2 (since central carbon has FC = 4 - 0 - \u00bd(8) = 0).",
      "[METHOD] Step 3: All 3 oxygen atoms participate equally in resonance delocalization across 3 equivalent canonical forms."
    ],
    "steps": [
      "Step 1: Write the canonical Lewis resonance forms of CO\u2083\u00b2\u207b. Carbon forms 1 C=O double bond and 2 C-O\u207b single bonds.",
      "Step 2: Total formal charge on the oxygen atoms is -2 (since central carbon has FC = 4 - 0 - \u00bd(8) = 0).",
      "Step 3: All 3 oxygen atoms participate equally in resonance delocalization across 3 equivalent canonical forms.",
      "Step 4: Average formal charge per oxygen atom: FC_avg = -2 / 3 \u2248 -0.67.",
      "Step 5: The C-O bond order in the hybrid is 4/3 = 1.33 (4 bonding pairs shared over 3 C-O linkages)."
    ],
    "limitingCheck": "Independent check: recompute the governing relation and verify that the stem constraints select -2 / 3 (Option A).",
    "check": "Independent check: recompute the governing relation and verify that the stem constraints select -2 / 3 (Option A).",
    "trapWarning": "Do not report the charge of a single localized canonical form (-1 on single-bonded oxygen, 0 on double-bonded); the real molecule is the delocalized resonance hybrid (-2/3 on all oxygens)!",
    "correctKey": "opt-A",
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 4,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Chemistry)"
  },
  {
    "id": "BOND-Q11",
    "code": "BOND-Q11",
    "title": "JEE Main 2023 (Online) 6th April Morning Shift \u00b7 Diagnostic Hub \u00b7 QBOND-Q11 \u00b7 Chemical Bonding",
    "subjectCode": "CHEM",
    "subject": "Chemistry",
    "topicCode": "CHEMICAL_BONDING",
    "topic": "Chemical Bonding",
    "subtopic": "CAP-CHEM-BONDING",
    "exam": "JEE Main 2023 (Online) 6th April Morning Shift",
    "year": "2023",
    "paper": "Diagnostic Hub",
    "questionNumber": "BOND-Q11",
    "section": "FAM-CHEM-BONDING",
    "markingScheme": "+4 / -1",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Chemical Bonding",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "SINGLE_CHOICE",
    "stem": "According to Molecular Orbital Theory (MOT), in which of the following diatomic species does the double bond consist of ONLY \u03c0 bonds with NO \u03c3 bond?",
    "options": [
      {
        "id": "opt-C",
        "text": "C\u2082"
      },
      {
        "id": "opt-B",
        "text": "O\u2082"
      },
      {
        "id": "opt-C",
        "text": "N\u2082"
      },
      {
        "id": "opt-B",
        "text": "B\u2082"
      }
    ],
    "hints": [
      "[METHOD] Step 1: Carbon has Z = 6 \u2264 7, so 2s-2p mixing occurs, pushing \u03c3\u2082\u209a_z above the degenerate \u03c0\u2082\u209a orbitals.",
      "[METHOD] Step 2: Neutral C\u2082 has 12 electrons. Fill molecular orbitals:",
      "[METHOD] \u03c3\u2081\u209b\u00b2 \u03c3*\u2081\u209b\u00b2 \u03c3\u2082\u209b\u00b2 \u03c3*\u2082\u209b\u00b2 (\u03c0\u2082\u209a_x\u00b2 = \u03c0\u2082\u209a_y\u00b2)."
    ],
    "steps": [
      "Step 1: Carbon has Z = 6 \u2264 7, so 2s-2p mixing occurs, pushing \u03c3\u2082\u209a_z above the degenerate \u03c0\u2082\u209a orbitals.",
      "Step 2: Neutral C\u2082 has 12 electrons. Fill molecular orbitals:",
      "        \u03c3\u2081\u209b\u00b2 \u03c3*\u2081\u209b\u00b2 \u03c3\u2082\u209b\u00b2 \u03c3*\u2082\u209b\u00b2 (\u03c0\u2082\u209a_x\u00b2 = \u03c0\u2082\u209a_y\u00b2).",
      "Step 3: The 4 bonding electrons responsible for the double bond (BO = (8 - 4)/2 = 2) reside strictly in the degenerate \u03c0\u2082\u209a_x and \u03c0\u2082\u209a_y orbitals.",
      "Step 4: The \u03c3\u2082\u209a_z orbital is completely empty! Hence the double bond in C\u2082 consists exclusively of two \u03c0 bonds and zero \u03c3 bonds."
    ],
    "limitingCheck": "Independent check: recompute the governing relation and verify that the stem constraints select C\u2082 (Option A).",
    "check": "Independent check: recompute the governing relation and verify that the stem constraints select C\u2082 (Option A).",
    "trapWarning": "Valence Bond Theory dogma states that a double bond is always 1\u03c3 + 1\u03c0. C\u2082 is the famous MOT proof that a double bond can consist solely of two \u03c0 bonds!",
    "correctKey": "opt-C",
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 4,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Chemistry)"
  },
  {
    "id": "BOND-Q12",
    "code": "BOND-Q12",
    "title": "JEE Main 2023 (Online) 11th April Evening Shift \u00b7 Diagnostic Hub \u00b7 QBOND-Q12 \u00b7 Chemical Bonding",
    "subjectCode": "CHEM",
    "subject": "Chemistry",
    "topicCode": "CHEMICAL_BONDING",
    "topic": "Chemical Bonding",
    "subtopic": "CAP-CHEM-BONDING",
    "exam": "JEE Main 2023 (Online) 11th April Evening Shift",
    "year": "2023",
    "paper": "Diagnostic Hub",
    "questionNumber": "BOND-Q12",
    "section": "FAM-CHEM-BONDING",
    "markingScheme": "+4 / -1",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Chemical Bonding",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "SINGLE_CHOICE",
    "stem": "In gaseous PCl\u2085, the axial P-Cl bonds are longer (240 pm) than the equatorial P-Cl bonds (202 pm) because:",
    "options": [
      {
        "id": "opt-A",
        "text": "Axial bond pairs experience three 90\u00b0 repulsions, whereas equatorial pairs experience only two 90\u00b0 repulsions"
      },
      {
        "id": "opt-A",
        "text": "Axial bonds are formed by sp\u00b2 hybrid orbitals and equatorial bonds by pd hybrid orbitals"
      },
      {
        "id": "opt-C",
        "text": "Chlorine atoms at axial positions have greater electronegativity"
      },
      {
        "id": "opt-E",
        "text": "Equatorial bonds have greater d-character than axial bonds"
      }
    ],
    "hints": [
      "[METHOD] Step 1: Trigonal bipyramidal geometry (sp\u00b3d) has two geometrically distinct sets of bonds: 3 equatorial and 2 axial.",
      "[METHOD] Step 2: An equatorial bond makes two 90\u00b0 angles (with the two axial bonds) and two 120\u00b0 angles (with equatorial bonds).",
      "[METHOD] Step 3: An axial bond makes three 90\u00b0 angles (with all three equatorial bonds)."
    ],
    "steps": [
      "Step 1: Trigonal bipyramidal geometry (sp\u00b3d) has two geometrically distinct sets of bonds: 3 equatorial and 2 axial.",
      "Step 2: An equatorial bond makes two 90\u00b0 angles (with the two axial bonds) and two 120\u00b0 angles (with equatorial bonds).",
      "Step 3: An axial bond makes three 90\u00b0 angles (with all three equatorial bonds).",
      "Step 4: Since electron-pair repulsion is extremely sensitive to angle (90\u00b0 repulsions are far stronger than 120\u00b0), the three 90\u00b0 repulsions push the axial chlorines further away from phosphorus.",
      "Step 5: Therefore, axial bonds lengthen to 240 pm and are significantly weaker, explaining why PCl\u2085 dissociates upon mild heating: PCl\u2085 \u2192 PCl\u2083 + Cl\u2082."
    ],
    "limitingCheck": "Independent check: recompute the governing relation and verify that the stem constraints select Axial bond pairs experience three 90\u00b0 repulsions, whereas equatorial pairs experience only two 90\u00b0 repulsions (Option A).",
    "check": "Independent check: recompute the governing relation and verify that the stem constraints select Axial bond pairs experience three 90\u00b0 repulsions, whereas equatorial pairs experience only two 90\u00b0 repulsions (Option A).",
    "trapWarning": "Notice the orbital composition: axial bonds are formed from p_z + d_z\u00b2 (zero s-character, longer), while equatorial bonds are formed from sp\u00b2 (33% s-character, shorter).",
    "correctKey": "opt-A",
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 4,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Chemistry)"
  },
  {
    "id": "BOND-Q13",
    "code": "BOND-Q13",
    "title": "JEE Main 2022 (Online) 28th July Morning Shift \u00b7 Diagnostic Hub \u00b7 QBOND-Q13 \u00b7 Chemical Bonding",
    "subjectCode": "CHEM",
    "subject": "Chemistry",
    "topicCode": "CHEMICAL_BONDING",
    "topic": "Chemical Bonding",
    "subtopic": "CAP-CHEM-BONDING",
    "exam": "JEE Main 2022 (Online) 28th July Morning Shift",
    "year": "2022",
    "paper": "Diagnostic Hub",
    "questionNumber": "BOND-Q13",
    "section": "FAM-CHEM-BONDING",
    "markingScheme": "+4 / -1",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Chemical Bonding",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "SINGLE_CHOICE",
    "stem": "Among the following molecules, which one has a non-zero permanent dipole moment (\u03bc \u2260 0)?",
    "options": [
      {
        "id": "opt-A",
        "text": "NF\u2083"
      },
      {
        "id": "opt-B",
        "text": "BF\u2083"
      },
      {
        "id": "opt-B",
        "text": "BeF\u2082"
      },
      {
        "id": "opt-C",
        "text": "CO\u2082"
      }
    ],
    "hints": [
      "[METHOD] Step 1: Check BF\u2083: Trigonal planar (sp\u00b2), 120\u00b0 bond angles. The three equal B-F bond dipoles cancel completely by symmetry \u21d2 \u03bc = 0.",
      "[METHOD] Step 2: Check BeF\u2082: Linear (sp), 180\u00b0 bond angle. The two equal Be-F bond dipoles point in opposite directions \u21d2 \u03bc = 0.",
      "[METHOD] Step 3: Check CO\u2082: Linear (sp), 180\u00b0 bond angle. The two C=O bond dipoles cancel \u21d2 \u03bc = 0."
    ],
    "steps": [
      "Step 1: Check BF\u2083: Trigonal planar (sp\u00b2), 120\u00b0 bond angles. The three equal B-F bond dipoles cancel completely by symmetry \u21d2 \u03bc = 0.",
      "Step 2: Check BeF\u2082: Linear (sp), 180\u00b0 bond angle. The two equal Be-F bond dipoles point in opposite directions \u21d2 \u03bc = 0.",
      "Step 3: Check CO\u2082: Linear (sp), 180\u00b0 bond angle. The two C=O bond dipoles cancel \u21d2 \u03bc = 0.",
      "Step 4: Check NF\u2083: Trigonal pyramidal (sp\u00b3) with 1 lone pair on N. The geometry is non-planar and asymmetric, so vector sum of bond dipoles and lone pair dipole does not cancel \u21d2 \u03bc = 0.24 D \u2260 0."
    ],
    "limitingCheck": "Independent check: recompute the governing relation and verify that the stem constraints select NF\u2083 (Option A).",
    "check": "Independent check: recompute the governing relation and verify that the stem constraints select NF\u2083 (Option A).",
    "trapWarning": "Although NF\u2083 has a very small dipole moment (0.24 D) because N-F dipoles oppose the lone pair, it is strictly NON-ZERO because geometry is trigonal pyramidal!",
    "correctKey": "opt-A",
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 4,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Chemistry)"
  },
  {
    "id": "BOND-Q14",
    "code": "BOND-Q14",
    "title": "JEE Main 2022 (Online) 25th June Evening Shift \u00b7 Diagnostic Hub \u00b7 QBOND-Q14 \u00b7 Chemical Bonding",
    "subjectCode": "CHEM",
    "subject": "Chemistry",
    "topicCode": "CHEMICAL_BONDING",
    "topic": "Chemical Bonding",
    "subtopic": "CAP-CHEM-BONDING",
    "exam": "JEE Main 2022 (Online) 25th June Evening Shift",
    "year": "2022",
    "paper": "Diagnostic Hub",
    "questionNumber": "BOND-Q14",
    "section": "FAM-CHEM-BONDING",
    "markingScheme": "+4 / -1",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Chemical Bonding",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "SINGLE_CHOICE",
    "stem": "The hybridization of the central atom and the molecular shape of BrF\u2085 are:",
    "options": [
      {
        "id": "opt-A",
        "text": "sp\u00b3d\u00b2 and Square Pyramidal"
      },
      {
        "id": "opt-B",
        "text": "sp\u00b3d and Trigonal Bipyramidal"
      },
      {
        "id": "opt-C",
        "text": "sp\u00b3d\u00b2 and Octahedral"
      },
      {
        "id": "opt-D",
        "text": "sp\u00b3d and See-saw"
      }
    ],
    "hints": [
      "[METHOD] Step 1: Bromine has 7 valence electrons in its outer shell.",
      "[METHOD] Step 2: 5 valence electrons form 5 single \u03c3-bonds with 5 fluorine atoms.",
      "[METHOD] Step 3: Remaining 2 electrons form 1 lone pair on Br."
    ],
    "steps": [
      "Step 1: Bromine has 7 valence electrons in its outer shell.",
      "Step 2: 5 valence electrons form 5 single \u03c3-bonds with 5 fluorine atoms.",
      "Step 3: Remaining 2 electrons form 1 lone pair on Br.",
      "Step 4: Steric Number = 5 bond pairs + 1 lone pair = 6 \u21d2 sp\u00b3d\u00b2 hybridization.",
      "Step 5: Electron geometry is Octahedral. Because 1 position is occupied by a lone pair, the molecular shape is Square Pyramidal."
    ],
    "limitingCheck": "Independent check: recompute the governing relation and verify that the stem constraints select sp\u00b3d\u00b2 and Square Pyramidal (Option A).",
    "check": "Independent check: recompute the governing relation and verify that the stem constraints select sp\u00b3d\u00b2 and Square Pyramidal (Option A).",
    "trapWarning": "Do not confuse ELECTRON GEOMETRY (octahedral) with MOLECULAR SHAPE (square pyramidal, which considers only atomic nuclei)!",
    "correctKey": "opt-A",
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 4,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Chemistry)"
  },
  {
    "id": "BOND-Q15",
    "code": "BOND-Q15",
    "title": "JEE Main 2021 (Online) 25th February Morning Shift \u00b7 Diagnostic Hub \u00b7 QBOND-Q15 \u00b7 Chemical Bonding",
    "subjectCode": "CHEM",
    "subject": "Chemistry",
    "topicCode": "CHEMICAL_BONDING",
    "topic": "Chemical Bonding",
    "subtopic": "CAP-CHEM-BONDING",
    "exam": "JEE Main 2021 (Online) 25th February Morning Shift",
    "year": "2021",
    "paper": "Diagnostic Hub",
    "questionNumber": "BOND-Q15",
    "section": "FAM-CHEM-BONDING",
    "markingScheme": "+4 / -1",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Chemical Bonding",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "SINGLE_CHOICE",
    "stem": "The correct order of bond dissociation enthalpy of halogen molecules (X\u2082) is:",
    "options": [
      {
        "id": "opt-C",
        "text": "Cl\u2082 > Br\u2082 > F\u2082 > I\u2082"
      },
      {
        "id": "opt-F",
        "text": "F\u2082 > Cl\u2082 > Br\u2082 > I\u2082"
      },
      {
        "id": "opt-C",
        "text": "Cl\u2082 > F\u2082 > Br\u2082 > I\u2082"
      },
      {
        "id": "opt-D",
        "text": "I\u2082 > Br\u2082 > Cl\u2082 > F\u2082"
      }
    ],
    "hints": [
      "[METHOD] Step 1: In general, bond dissociation energy decreases down the group as bond length increases: Cl\u2082 > Br\u2082 > I\u2082.",
      "[METHOD] Step 2: Fluorine (F\u2082) has an exceptionally small internuclear distance (142 pm).",
      "[METHOD] Step 3: The non-bonding lone pairs in the compact 2p orbitals experience severe interelectronic repulsion across the single F-F bond."
    ],
    "steps": [
      "Step 1: In general, bond dissociation energy decreases down the group as bond length increases: Cl\u2082 > Br\u2082 > I\u2082.",
      "Step 2: Fluorine (F\u2082) has an exceptionally small internuclear distance (142 pm).",
      "Step 3: The non-bonding lone pairs in the compact 2p orbitals experience severe interelectronic repulsion across the single F-F bond.",
      "Step 4: This intense lone pair-lone pair repulsion significantly weakens the F-F bond (158.8 kJ/mol), dropping its dissociation energy below Cl\u2082 and Br\u2082!",
      "Step 5: The verified experimental order is: Cl\u2082 > Br\u2082 > F\u2082 > I\u2082."
    ],
    "limitingCheck": "Independent check: recompute the governing relation and verify that the stem constraints select Cl\u2082 > Br\u2082 > F\u2082 > I\u2082 (Option A).",
    "check": "Independent check: recompute the governing relation and verify that the stem constraints select Cl\u2082 > Br\u2082 > F\u2082 > I\u2082 (Option A).",
    "trapWarning": "The Halogen Anomaly: students assume F\u2082 has the highest bond energy because it has the shortest bond length. Intense 2p lone pair repulsion makes it 3rd, not 1st!",
    "correctKey": "opt-C",
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 4,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Chemistry)"
  },
  {
    "id": "BOND-Q16",
    "code": "BOND-Q16",
    "title": "JEE Main 2021 (Online) 20th July Evening Shift \u00b7 Diagnostic Hub \u00b7 QBOND-Q16 \u00b7 Chemical Bonding",
    "subjectCode": "CHEM",
    "subject": "Chemistry",
    "topicCode": "CHEMICAL_BONDING",
    "topic": "Chemical Bonding",
    "subtopic": "CAP-CHEM-BONDING",
    "exam": "JEE Main 2021 (Online) 20th July Evening Shift",
    "year": "2021",
    "paper": "Diagnostic Hub",
    "questionNumber": "BOND-Q16",
    "section": "FAM-CHEM-BONDING",
    "markingScheme": "+4 / -1",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Chemical Bonding",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "SINGLE_CHOICE",
    "stem": "The hybridization and geometry of the triiodide ion (I\u2083\u207b) are:",
    "options": [
      {
        "id": "opt-A",
        "text": "sp\u00b3d and Linear"
      },
      {
        "id": "opt-B",
        "text": "sp\u00b3 and Bent"
      },
      {
        "id": "opt-C",
        "text": "sp\u00b3d\u00b2 and Linear"
      },
      {
        "id": "opt-D",
        "text": "sp and Linear"
      }
    ],
    "hints": [
      "[METHOD] Step 1: Central iodine atom has 7 valence electrons + 1 extra electron (negative charge) = 8 electrons.",
      "[METHOD] Step 2: 2 electrons are shared with two terminal iodine atoms to form 2 \u03c3-bonds.",
      "[METHOD] Step 3: Remaining 6 electrons form 3 lone pairs on the central iodine."
    ],
    "steps": [
      "Step 1: Central iodine atom has 7 valence electrons + 1 extra electron (negative charge) = 8 electrons.",
      "Step 2: 2 electrons are shared with two terminal iodine atoms to form 2 \u03c3-bonds.",
      "Step 3: Remaining 6 electrons form 3 lone pairs on the central iodine.",
      "Step 4: Steric Number = 2 bond pairs + 3 lone pairs = 5 \u21d2 sp\u00b3d hybridization (Trigonal Bipyramidal electron geometry).",
      "Step 5: According to Bent's Rule / VSEPR, the 3 bulky lone pairs occupy the equatorial positions (120\u00b0 apart) to minimize 90\u00b0 repulsions.",
      "Step 6: The two axial I-I bonds form a straight line with bond angle 180\u00b0 \u21d2 Molecular shape is Linear."
    ],
    "limitingCheck": "Independent check: recompute the governing relation and verify that the stem constraints select sp\u00b3d and Linear (Option A).",
    "check": "Independent check: recompute the governing relation and verify that the stem constraints select sp\u00b3d and Linear (Option A).",
    "trapWarning": "Do not assume a linear molecule must be sp hybridized! I\u2083\u207b and XeF\u2082 are linear with sp\u00b3d hybridization because 3 lone pairs occupy equatorial sites.",
    "correctKey": "opt-A",
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 4,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Chemistry)"
  },
  {
    "id": "BOND-Q17",
    "code": "BOND-Q17",
    "title": "JEE Main 2020 (Online) 5th September Morning Shift \u00b7 Diagnostic Hub \u00b7 QBOND-Q17 \u00b7 Chemical Bonding",
    "subjectCode": "CHEM",
    "subject": "Chemistry",
    "topicCode": "CHEMICAL_BONDING",
    "topic": "Chemical Bonding",
    "subtopic": "CAP-CHEM-BONDING",
    "exam": "JEE Main 2020 (Online) 5th September Morning Shift",
    "year": "2020",
    "paper": "Diagnostic Hub",
    "questionNumber": "BOND-Q17",
    "section": "FAM-CHEM-BONDING",
    "markingScheme": "+4 / -1",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Chemical Bonding",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "SINGLE_CHOICE",
    "stem": "The correct order of boiling points for the Group 16 hydrides (chalcogen hydrides) is:",
    "options": [
      {
        "id": "opt-A",
        "text": "H\u2082O > H\u2082Te > H\u2082Se > H\u2082S"
      },
      {
        "id": "opt-B",
        "text": "H\u2082O > H\u2082S > H\u2082Se > H\u2082Te"
      },
      {
        "id": "opt-C",
        "text": "H\u2082Te > H\u2082Se > H\u2082S > H\u2082O"
      },
      {
        "id": "opt-D",
        "text": "H\u2082S > H\u2082Se > H\u2082Te > H\u2082O"
      }
    ],
    "hints": [
      "[METHOD] Step 1: From H\u2082S to H\u2082Te, molecular mass increases \u21d2 van der Waals dispersion forces increase \u21d2 boiling point increases: H\u2082Te > H\u2082Se > H\u2082S.",
      "[METHOD] Step 2: However, oxygen is highly electronegative with a small atomic radius.",
      "[METHOD] Step 3: H\u2082O forms an extensive 3D network of strong intermolecular hydrogen bonds (4 H-bonds per H\u2082O molecule in tetrahedral geometry)."
    ],
    "steps": [
      "Step 1: From H\u2082S to H\u2082Te, molecular mass increases \u21d2 van der Waals dispersion forces increase \u21d2 boiling point increases: H\u2082Te > H\u2082Se > H\u2082S.",
      "Step 2: However, oxygen is highly electronegative with a small atomic radius.",
      "Step 3: H\u2082O forms an extensive 3D network of strong intermolecular hydrogen bonds (4 H-bonds per H\u2082O molecule in tetrahedral geometry).",
      "Step 4: This massive hydrogen bonding energy pushes the boiling point of H\u2082O to 373 K (100\u00b0C), far above all other hydrides.",
      "Step 5: Overall order: H\u2082O (100\u00b0C) > H\u2082Te (-4\u00b0C) > H\u2082Se (-41\u00b0C) > H\u2082S (-60\u00b0C)."
    ],
    "limitingCheck": "Independent check: recompute the governing relation and verify that the stem constraints select H\u2082O > H\u2082Te > H\u2082Se > H\u2082S (Option A).",
    "check": "Independent check: recompute the governing relation and verify that the stem constraints select H\u2082O > H\u2082Te > H\u2082Se > H\u2082S (Option A).",
    "trapWarning": "Notice H\u2082S has the LOWEST boiling point of all, not the second highest! Do not assume monotonic decrease from H\u2082O.",
    "correctKey": "opt-A",
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 4,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Chemistry)"
  },
  {
    "id": "BOND-Q18",
    "code": "BOND-Q18",
    "title": "JEE Main 2020 (Online) 7th January Morning Shift \u00b7 Diagnostic Hub \u00b7 QBOND-Q18 \u00b7 Chemical Bonding",
    "subjectCode": "CHEM",
    "subject": "Chemistry",
    "topicCode": "CHEMICAL_BONDING",
    "topic": "Chemical Bonding",
    "subtopic": "CAP-CHEM-BONDING",
    "exam": "JEE Main 2020 (Online) 7th January Morning Shift",
    "year": "2020",
    "paper": "Diagnostic Hub",
    "questionNumber": "BOND-Q18",
    "section": "FAM-CHEM-BONDING",
    "markingScheme": "+4 / -1",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Chemical Bonding",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "SINGLE_CHOICE",
    "stem": "In the solid state, PCl\u2085 exists as an ionic compound composed of:",
    "options": [
      {
        "id": "opt-A",
        "text": "[PCl\u2084]\u207a (tetrahedral) and [PCl\u2086]\u207b (octahedral)"
      },
      {
        "id": "opt-B",
        "text": "[PCl\u2082]\u207a (linear) and [PCl\u2086]\u207b (octahedral)"
      },
      {
        "id": "opt-C",
        "text": "[PCl\u2084]\u207a (square planar) and [PCl\u2086]\u207b (octahedral)"
      },
      {
        "id": "opt-D",
        "text": "Discrete trigonal bipyramidal PCl\u2085 molecules held by van der Waals forces"
      }
    ],
    "hints": [
      "[METHOD] Step 1: In the gas and liquid phases, PCl\u2085 exists as discrete trigonal bipyramidal molecules with sp\u00b3d hybridization.",
      "[METHOD] Step 2: In the solid state, to minimize steric repulsions and achieve electrostatic lattice stabilization, it auto-ionizes:",
      "[METHOD] 2 PCl\u2085(s) \u21cc [PCl\u2084]\u207a + [PCl\u2086]\u207b."
    ],
    "steps": [
      "Step 1: In the gas and liquid phases, PCl\u2085 exists as discrete trigonal bipyramidal molecules with sp\u00b3d hybridization.",
      "Step 2: In the solid state, to minimize steric repulsions and achieve electrostatic lattice stabilization, it auto-ionizes:",
      "        2 PCl\u2085(s) \u21cc [PCl\u2084]\u207a + [PCl\u2086]\u207b.",
      "Step 3: Cation [PCl\u2084]\u207a: P has 5 - 1 = 4 valence electrons forming 4 \u03c3-bonds \u21d2 sp\u00b3 hybridization, Tetrahedral geometry.",
      "Step 4: Anion [PCl\u2086]\u207b: P has 5 + 1 = 6 valence electrons forming 6 \u03c3-bonds \u21d2 sp\u00b3d\u00b2 hybridization, Octahedral geometry.",
      "Step 5: Contrast with solid PBr\u2085, which exists as [PBr\u2084]\u207a Br\u207b due to the large steric bulk of bromine preventing [PBr\u2086]\u207b formation!"
    ],
    "limitingCheck": "Independent check: recompute the governing relation and verify that the stem constraints select [PCl\u2084]\u207a (tetrahedral) and [PCl\u2086]\u207b (octahedral) (Option A).",
    "check": "Independent check: recompute the governing relation and verify that the stem constraints select [PCl\u2084]\u207a (tetrahedral) and [PCl\u2086]\u207b (octahedral) (Option A).",
    "trapWarning": "Notice the phase state! In gas phase PCl\u2085 is molecular TBP (sp\u00b3d), but in SOLID STATE it is ionic [PCl\u2084]\u207a [PCl\u2086]\u207b!",
    "correctKey": "opt-A",
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 4,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Chemistry)"
  },
  {
    "id": "BOND-Q19",
    "code": "BOND-Q19",
    "title": "JEE Main 2019 (Online) 10th April Morning Shift \u00b7 Diagnostic Hub \u00b7 QBOND-Q19 \u00b7 Chemical Bonding",
    "subjectCode": "CHEM",
    "subject": "Chemistry",
    "topicCode": "CHEMICAL_BONDING",
    "topic": "Chemical Bonding",
    "subtopic": "CAP-CHEM-BONDING",
    "exam": "JEE Main 2019 (Online) 10th April Morning Shift",
    "year": "2019",
    "paper": "Diagnostic Hub",
    "questionNumber": "BOND-Q19",
    "section": "FAM-CHEM-BONDING",
    "markingScheme": "+4 / -1",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Chemical Bonding",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "SINGLE_CHOICE",
    "stem": "The bond order and magnetic behavior of the carbon monoxide cation (CO\u207a) according to MOT are:",
    "options": [
      {
        "id": "opt-B",
        "text": "Bond Order = 3.5 and Paramagnetic"
      },
      {
        "id": "opt-B",
        "text": "Bond Order = 2.5 and Paramagnetic"
      },
      {
        "id": "opt-B",
        "text": "Bond Order = 3.0 and Diamagnetic"
      },
      {
        "id": "opt-B",
        "text": "Bond Order = 2.5 and Diamagnetic"
      }
    ],
    "hints": [
      "[METHOD] Step 1: Neutral CO has 14 electrons and is treated as isoelectronic with N\u2082 in the standard introductory MO scheme, with bond order 3.",
      "[METHOD] Step 2: Forming CO\u207a removes one electron from the highest occupied valence molecular orbital.",
      "[METHOD] Step 3: In the standard JEE-level bond-order count, removal of one bonding electron decreases bond order by 0.5: BO = 3.0 - 0.5 = 2.5."
    ],
    "steps": [
      "Step 1: Neutral CO has 14 electrons and is treated as isoelectronic with N\u2082 in the standard introductory MO scheme, with bond order 3.",
      "Step 2: Forming CO\u207a removes one electron from the highest occupied valence molecular orbital.",
      "Step 3: In the standard JEE-level bond-order count, removal of one bonding electron decreases bond order by 0.5: BO = 3.0 - 0.5 = 2.5.",
      "Step 4: CO\u207a has an odd total electron count, so one electron is unpaired and the species is paramagnetic.",
      "Step 5: Therefore the locally audited answer is Bond Order = 2.5 and Paramagnetic."
    ],
    "limitingCheck": "Independent check: recompute the governing relation and verify that the stem constraints select Bond Order = 2.5 and Paramagnetic (Option B).",
    "check": "Independent check: recompute the governing relation and verify that the stem constraints select Bond Order = 2.5 and Paramagnetic (Option B).",
    "trapWarning": "Do not use the obsolete shortcut that labels the CO HOMO as simply antibonding and raises the bond order to 3.5 on ionization. For the standard classroom MO answer used here, CO\u207a is assigned bond order 2.5 and is paramagnetic.",
    "correctKey": "opt-B",
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 4,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Chemistry)"
  },
  {
    "id": "BOND-Q20",
    "code": "BOND-Q20",
    "title": "JEE Main 2018 (Offline) 8th April Shift \u00b7 Diagnostic Hub \u00b7 QBOND-Q20 \u00b7 Chemical Bonding",
    "subjectCode": "CHEM",
    "subject": "Chemistry",
    "topicCode": "CHEMICAL_BONDING",
    "topic": "Chemical Bonding",
    "subtopic": "CAP-CHEM-BONDING",
    "exam": "JEE Main 2018 (Offline) 8th April Shift",
    "year": "2018",
    "paper": "Diagnostic Hub",
    "questionNumber": "BOND-Q20",
    "section": "FAM-CHEM-BONDING",
    "markingScheme": "+4 / -1",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Chemical Bonding",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "SINGLE_CHOICE",
    "stem": "Ortho-nitrophenol is more volatile in steam than para-nitrophenol because:",
    "options": [
      {
        "id": "opt-A",
        "text": "Ortho-nitrophenol exhibits intramolecular hydrogen bonding (chelation), whereas para-nitrophenol forms intermolecular hydrogen bonds"
      },
      {
        "id": "opt-B",
        "text": "Para-nitrophenol has a lower molecular mass than ortho-nitrophenol"
      },
      {
        "id": "opt-C",
        "text": "Ortho-nitrophenol forms stronger intermolecular hydrogen bonds than water"
      },
      {
        "id": "opt-D",
        "text": "Para-nitrophenol undergoes sublimation at room temperature"
      }
    ],
    "hints": [
      "[METHOD] Step 1: In ortho-nitrophenol, the -OH and -NO\u2082 groups are on adjacent carbon atoms.",
      "[METHOD] Step 2: The hydrogen of -OH forms an intramolecular H-bond with the oxygen of -NO\u2082, closing a planar 6-membered chelate ring.",
      "[METHOD] Step 3: This intramolecular chelation shields the polar groups, preventing association with neighboring molecules \u21d2 Low boiling point (216\u00b0C), steam-volatile."
    ],
    "steps": [
      "Step 1: In ortho-nitrophenol, the -OH and -NO\u2082 groups are on adjacent carbon atoms.",
      "Step 2: The hydrogen of -OH forms an intramolecular H-bond with the oxygen of -NO\u2082, closing a planar 6-membered chelate ring.",
      "Step 3: This intramolecular chelation shields the polar groups, preventing association with neighboring molecules \u21d2 Low boiling point (216\u00b0C), steam-volatile.",
      "Step 4: In para-nitrophenol, the -OH and -NO\u2082 groups are far apart (at positions 1 and 4), precluding intramolecular bonding.",
      "Step 5: It forms extensive intermolecular H-bonding networks linking molecules into polymers \u21d2 High boiling point (279\u00b0C), non-volatile in steam."
    ],
    "limitingCheck": "Independent check: recompute the governing relation and verify that the stem constraints select Ortho-nitrophenol exhibits intramolecular hydrogen bonding (chelation), whereas para-nitrophenol forms intermolecular hydrogen bonds (Option A).",
    "check": "Independent check: recompute the governing relation and verify that the stem constraints select Ortho-nitrophenol exhibits intramolecular hydrogen bonding (chelation), whereas para-nitrophenol forms intermolecular hydrogen bonds (Option A).",
    "trapWarning": "Remember: INTRAmolecular H-bonding LOWERS boiling point (makes steam-volatile); INTERmolecular H-bonding RAISES boiling point!",
    "correctKey": "opt-A",
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 4,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Chemistry)"
  },
  {
    "id": "GAS-Q01",
    "code": "GAS-Q01",
    "title": "JEE Main 2026 (Online) 4th April Morning Shift \u00b7 Diagnostic Hub \u00b7 QGAS-Q01 \u00b7 Behaviour of Gases",
    "subjectCode": "CHEM",
    "subject": "Chemistry",
    "topicCode": "BEHAVIOUR_OF_GASES",
    "topic": "Behaviour of Gases",
    "subtopic": "CAP-CHEM-GASES",
    "exam": "JEE Main 2026 (Online) 4th April Morning Shift",
    "year": "2026",
    "paper": "Diagnostic Hub",
    "questionNumber": "GAS-Q01",
    "section": "FAM-CHEM-GASES",
    "markingScheme": "+4 / -1",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Behaviour of Gases",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "SINGLE_CHOICE",
    "stem": "For one mole of a van der Waals gas at low pressure, the compressibility factor Z is expressed as:",
    "options": [
      {
        "id": "opt-A",
        "text": "Z = 1 - a / (R T V_m)"
      },
      {
        "id": "opt-B",
        "text": "Z = 1 + P b / (R T)"
      },
      {
        "id": "opt-C",
        "text": "Z = 1 + a / (R T V_m)"
      },
      {
        "id": "opt-D",
        "text": "Z = 1 - P b / (R T)"
      }
    ],
    "hints": [
      "[METHOD] Step 1: Start from the van der Waals equation for 1 mole: (P + a/V_m\u00b2)(V_m - b) = RT.",
      "[METHOD] Step 2: At low pressure, the molar volume V_m is very large compared to the molecular excluded volume b: (V_m - b) \u2248 V_m.",
      "[METHOD] Step 3: The equation reduces to: (P + a/V_m\u00b2) V_m = RT \u21d2 P V_m + a / V_m = RT."
    ],
    "steps": [
      "Step 1: Start from the van der Waals equation for 1 mole: (P + a/V_m\u00b2)(V_m - b) = RT.",
      "Step 2: At low pressure, the molar volume V_m is very large compared to the molecular excluded volume b: (V_m - b) \u2248 V_m.",
      "Step 3: The equation reduces to: (P + a/V_m\u00b2) V_m = RT \u21d2 P V_m + a / V_m = RT.",
      "Step 4: Divide both sides by RT: (P V_m) / (RT) + a / (RT V_m) = 1.",
      "Step 5: Since Z = (P V_m) / (RT), we obtain: Z = 1 - a / (RT V_m).",
      "Step 6: Since a, R, T, V_m > 0, Z < 1 at low to moderate pressures due to predominant attractive forces!"
    ],
    "limitingCheck": "Independent check: recompute the governing relation and verify that the stem constraints select Z = 1 - a / (R T V_m) (Option A).",
    "check": "Independent check: recompute the governing relation and verify that the stem constraints select Z = 1 - a / (R T V_m) (Option A).",
    "trapWarning": "Option B applies at very HIGH pressure (where repulsive forces dominate and excluded volume b cannot be neglected)!",
    "correctKey": "opt-A",
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 4,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Chemistry)"
  },
  {
    "id": "GAS-Q02",
    "code": "GAS-Q02",
    "title": "JEE Main 2025 (Online) 29th January Evening Shift \u00b7 Diagnostic Hub \u00b7 QGAS-Q02 \u00b7 Behaviour of Gases",
    "subjectCode": "CHEM",
    "subject": "Chemistry",
    "topicCode": "BEHAVIOUR_OF_GASES",
    "topic": "Behaviour of Gases",
    "subtopic": "CAP-CHEM-GASES",
    "exam": "JEE Main 2025 (Online) 29th January Evening Shift",
    "year": "2025",
    "paper": "Diagnostic Hub",
    "questionNumber": "GAS-Q02",
    "section": "FAM-CHEM-GASES",
    "markingScheme": "+4 / -1",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Behaviour of Gases",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "SINGLE_CHOICE",
    "stem": "The van der Waals constant 'a' for four gases are: Gas W = 4.17, Gas X = 0.244, Gas Y = 1.36, and Gas Z = 2.25 (in atm L\u00b2 mol\u207b\u00b2). The gas that can be most easily liquefied is:",
    "options": [
      {
        "id": "opt-A",
        "text": "Gas W"
      },
      {
        "id": "opt-B",
        "text": "Gas X"
      },
      {
        "id": "opt-C",
        "text": "Gas Y"
      },
      {
        "id": "opt-D",
        "text": "Gas Z"
      }
    ],
    "hints": [
      "[METHOD] Step 1: The van der Waals constant 'a' represents the magnitude of attractive intermolecular forces between gas molecules.",
      "[METHOD] Step 2: A higher value of 'a' implies stronger attractive forces, which holds gas molecules together more readily to form a liquid.",
      "[METHOD] Step 3: The critical temperature T_c = 8a / (27 R b). Higher 'a' results in a higher critical temperature, meaning the gas can be liquefied at higher temperatures with less cooling."
    ],
    "steps": [
      "Step 1: The van der Waals constant 'a' represents the magnitude of attractive intermolecular forces between gas molecules.",
      "Step 2: A higher value of 'a' implies stronger attractive forces, which holds gas molecules together more readily to form a liquid.",
      "Step 3: The critical temperature T_c = 8a / (27 R b). Higher 'a' results in a higher critical temperature, meaning the gas can be liquefied at higher temperatures with less cooling.",
      "Step 4: Comparing values: Gas W (a = 4.17) > Gas Z (2.25) > Gas Y (1.36) > Gas X (0.244).",
      "Step 5: Therefore, Gas W (which corresponds to NH\u2083) is the most easily liquefied."
    ],
    "limitingCheck": "Independent check: recompute the governing relation and verify that the stem constraints select Gas W (Option A).",
    "check": "Independent check: recompute the governing relation and verify that the stem constraints select Gas W (Option A).",
    "trapWarning": "Do not confuse constant 'a' (attraction) with constant 'b' (molecular size / repulsion)!",
    "correctKey": "opt-A",
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 4,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Chemistry)"
  },
  {
    "id": "GAS-Q03",
    "code": "GAS-Q03",
    "title": "JEE Main 2024 (Online) 30th January Morning Shift \u00b7 Diagnostic Hub \u00b7 QGAS-Q03 \u00b7 Behaviour of Gases",
    "subjectCode": "CHEM",
    "subject": "Chemistry",
    "topicCode": "BEHAVIOUR_OF_GASES",
    "topic": "Behaviour of Gases",
    "subtopic": "CAP-CHEM-GASES",
    "exam": "JEE Main 2024 (Online) 30th January Morning Shift",
    "year": "2024",
    "paper": "Diagnostic Hub",
    "questionNumber": "GAS-Q03",
    "section": "FAM-CHEM-GASES",
    "markingScheme": "+4 / -1",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Behaviour of Gases",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "SINGLE_CHOICE",
    "stem": "The ratio of the most probable speed (v_mp), average speed (v_avg), and root mean square speed (v_rms) of gas molecules at temperature T is:",
    "options": [
      {
        "id": "opt-A",
        "text": "1 : 1.128 : 1.224"
      },
      {
        "id": "opt-B",
        "text": "1 : 1.224 : 1.128"
      },
      {
        "id": "opt-C",
        "text": "1.224 : 1.128 : 1"
      },
      {
        "id": "opt-D",
        "text": "1 : 1 : 1"
      }
    ],
    "hints": [
      "[METHOD] Step 1: Write explicit formulas for molecular speeds: v_mp = \u221a(2RT/M), v_avg = \u221a(8RT/\u03c0M), v_rms = \u221a(3RT/M).",
      "[METHOD] Step 2: Factor out \u221a(RT/M): Ratio v_mp : v_avg : v_rms = \u221a2 : \u221a(8/\u03c0) : \u221a3.",
      "[METHOD] Step 3: Evaluate numerical square roots: \u221a2 \u2248 1.414. \u221a(8/\u03c0) = \u221a(8/3.1416) = \u221a2.546 \u2248 1.596. \u221a3 \u2248 1.732."
    ],
    "steps": [
      "Step 1: Write explicit formulas for molecular speeds: v_mp = \u221a(2RT/M), v_avg = \u221a(8RT/\u03c0M), v_rms = \u221a(3RT/M).",
      "Step 2: Factor out \u221a(RT/M): Ratio v_mp : v_avg : v_rms = \u221a2 : \u221a(8/\u03c0) : \u221a3.",
      "Step 3: Evaluate numerical square roots: \u221a2 \u2248 1.414. \u221a(8/\u03c0) = \u221a(8/3.1416) = \u221a2.546 \u2248 1.596. \u221a3 \u2248 1.732.",
      "Step 4: Normalize by dividing by \u221a2 (1.414): 1.414/1.414 : 1.596/1.414 : 1.732/1.414 = 1 : 1.128 : 1.224.",
      "Step 5: Note the universal strict inequality: v_mp < v_avg < v_rms (Remember mnemonic: RAM in reverse)."
    ],
    "limitingCheck": "Independent check: recompute the governing relation and verify that the stem constraints select 1 : 1.128 : 1.224 (Option A).",
    "check": "Independent check: recompute the governing relation and verify that the stem constraints select 1 : 1.128 : 1.224 (Option A).",
    "trapWarning": "Students frequently invert the order of v_avg and v_rms. Remember: v_rms is always the largest!",
    "correctKey": "opt-A",
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 4,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Chemistry)"
  },
  {
    "id": "GAS-Q04",
    "code": "GAS-Q04",
    "title": "JEE Main 2025 (Online) 27th January Morning Shift \u00b7 Diagnostic Hub \u00b7 QGAS-Q04 \u00b7 Behaviour of Gases",
    "subjectCode": "CHEM",
    "subject": "Chemistry",
    "topicCode": "BEHAVIOUR_OF_GASES",
    "topic": "Behaviour of Gases",
    "subtopic": "CAP-CHEM-GASES",
    "exam": "JEE Main 2025 (Online) 27th January Morning Shift",
    "year": "2025",
    "paper": "Diagnostic Hub",
    "questionNumber": "GAS-Q04",
    "section": "FAM-CHEM-GASES",
    "markingScheme": "+4 / -1",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Behaviour of Gases",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "SINGLE_CHOICE",
    "stem": "The effective excluded volume 'b' for 1 mole of a gas having spherical molecules of radius 'r' is equal to:",
    "options": [
      {
        "id": "opt-A",
        "text": "4 \u00d7 N_A \u00d7 (4/3 \u03c0 r\u00b3)"
      },
      {
        "id": "opt-B",
        "text": "N_A \u00d7 (4/3 \u03c0 r\u00b3)"
      },
      {
        "id": "opt-C",
        "text": "8 \u00d7 N_A \u00d7 (4/3 \u03c0 r\u00b3)"
      },
      {
        "id": "opt-D",
        "text": "2 \u00d7 N_A \u00d7 (4/3 \u03c0 r\u00b3)"
      }
    ],
    "hints": [
      "[METHOD] Step 1: When two spherical molecules of radius r collide, the distance between their centers cannot be less than 2r.",
      "[METHOD] Step 2: Thus, the sphere of exclusion for a pair of molecules has radius R = 2r.",
      "[METHOD] Step 3: Volume of the exclusion sphere for a pair = 4/3 \u03c0 (2r)\u00b3 = 8 \u00d7 (4/3 \u03c0 r\u00b3)."
    ],
    "steps": [
      "Step 1: When two spherical molecules of radius r collide, the distance between their centers cannot be less than 2r.",
      "Step 2: Thus, the sphere of exclusion for a pair of molecules has radius R = 2r.",
      "Step 3: Volume of the exclusion sphere for a pair = 4/3 \u03c0 (2r)\u00b3 = 8 \u00d7 (4/3 \u03c0 r\u00b3).",
      "Step 4: Since this exclusion sphere belongs to TWO molecules, the excluded volume PER MOLECULE = \u00bd \u00d7 8 \u00d7 (4/3 \u03c0 r\u00b3) = 4 \u00d7 (4/3 \u03c0 r\u00b3).",
      "Step 5: For 1 mole (N_A molecules), total excluded volume b = 4 \u00d7 N_A \u00d7 (4/3 \u03c0 r\u00b3) = 4 \u00d7 (Actual volume of molecules)."
    ],
    "limitingCheck": "Independent check: recompute the governing relation and verify that the stem constraints select 4 \u00d7 N_A \u00d7 (4/3 \u03c0 r\u00b3) (Option A).",
    "check": "Independent check: recompute the governing relation and verify that the stem constraints select 4 \u00d7 N_A \u00d7 (4/3 \u03c0 r\u00b3) (Option A).",
    "trapWarning": "The #1 trap in Gaseous State: thinking excluded volume b is equal to the actual volume of the molecules (factor of 4 missing)!",
    "correctKey": "opt-A",
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 4,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Chemistry)"
  },
  {
    "id": "GAS-Q05",
    "code": "GAS-Q05",
    "title": "JEE Main 2024 (Online) 1st February Evening Shift \u00b7 Diagnostic Hub \u00b7 QGAS-Q05 \u00b7 Behaviour of Gases",
    "subjectCode": "CHEM",
    "subject": "Chemistry",
    "topicCode": "BEHAVIOUR_OF_GASES",
    "topic": "Behaviour of Gases",
    "subtopic": "CAP-CHEM-GASES",
    "exam": "JEE Main 2024 (Online) 1st February Evening Shift",
    "year": "2024",
    "paper": "Diagnostic Hub",
    "questionNumber": "GAS-Q05",
    "section": "FAM-CHEM-GASES",
    "markingScheme": "+4 / -1",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Behaviour of Gases",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "SINGLE_CHOICE",
    "stem": "Under identical conditions of temperature and pressure, 50 mL of gas A effuses through a pinhole in 20 seconds, while 40 mL of O\u2082 effuses in 40 seconds. The molar mass of gas A is:",
    "options": [
      {
        "id": "opt-A",
        "text": "5.12 g/mol"
      },
      {
        "id": "opt-B",
        "text": "12.8 g/mol"
      },
      {
        "id": "opt-C",
        "text": "20.0 g/mol"
      },
      {
        "id": "opt-D",
        "text": "16.0 g/mol"
      }
    ],
    "hints": [
      "[METHOD] Step 1: Compute rate of effusion of gas A: r_A = 50 mL / 20 s = 2.50 mL/s.",
      "[METHOD] Step 2: Compute rate of effusion of O\u2082: r_O\u2082 = 40 mL / 40 s = 1.00 mL/s.",
      "[METHOD] Step 3: Apply Graham's Law: r_A / r_O\u2082 = \u221a(M_O\u2082 / M_A)."
    ],
    "steps": [
      "Step 1: Compute rate of effusion of gas A: r_A = 50 mL / 20 s = 2.50 mL/s.",
      "Step 2: Compute rate of effusion of O\u2082: r_O\u2082 = 40 mL / 40 s = 1.00 mL/s.",
      "Step 3: Apply Graham's Law: r_A / r_O\u2082 = \u221a(M_O\u2082 / M_A).",
      "Step 4: Substitute values: 2.50 / 1.00 = \u221a(32 / M_A).",
      "Step 5: Square both sides: 6.25 = 32 / M_A \u21d2 M_A = 32 / 6.25 = 5.12 g/mol."
    ],
    "limitingCheck": "Independent check: recompute the governing relation and verify that the stem constraints select 5.12 g/mol (Option A).",
    "check": "Independent check: recompute the governing relation and verify that the stem constraints select 5.12 g/mol (Option A).",
    "trapWarning": "Rate is Volume / Time (mL/s); do not compare times directly without normalizing for different diffused volumes!",
    "correctKey": "opt-A",
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 4,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Chemistry)"
  },
  {
    "id": "GAS-Q06",
    "code": "GAS-Q06",
    "title": "JEE Main 2026 (Online) 5th April Evening Shift \u00b7 Diagnostic Hub \u00b7 QGAS-Q06 \u00b7 Behaviour of Gases",
    "subjectCode": "CHEM",
    "subject": "Chemistry",
    "topicCode": "BEHAVIOUR_OF_GASES",
    "topic": "Behaviour of Gases",
    "subtopic": "CAP-CHEM-GASES",
    "exam": "JEE Main 2026 (Online) 5th April Evening Shift",
    "year": "2026",
    "paper": "Diagnostic Hub",
    "questionNumber": "GAS-Q06",
    "section": "FAM-CHEM-GASES",
    "markingScheme": "+4 / -1",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Behaviour of Gases",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "SINGLE_CHOICE",
    "stem": "At the Boyle temperature (T_B), a real gas behaves like an ideal gas over an appreciable range of pressure. The mathematical expression for Boyle temperature in terms of van der Waals constants is:",
    "options": [
      {
        "id": "opt-A",
        "text": "T_B = a / (R b)"
      },
      {
        "id": "opt-B",
        "text": "T_B = 2a / (R b)"
      },
      {
        "id": "opt-C",
        "text": "T_B = 8a / (27 R b)"
      },
      {
        "id": "opt-D",
        "text": "T_B = a / (27 R b\u00b2)"
      }
    ],
    "hints": [
      "[METHOD] Step 1: The virial expansion of the van der Waals equation gives: Z = 1 + (b - a/(RT))(1/V_m) + ...",
      "[METHOD] Step 2: For the gas to obey ideal gas behavior as P \u2192 0, the second virial coefficient must vanish: b - a / (RT) = 0.",
      "[METHOD] Step 3: Solving for temperature: RT = a / b \u21d2 T_B = a / (Rb)."
    ],
    "steps": [
      "Step 1: The virial expansion of the van der Waals equation gives: Z = 1 + (b - a/(RT))(1/V_m) + ...",
      "Step 2: For the gas to obey ideal gas behavior as P \u2192 0, the second virial coefficient must vanish: b - a / (RT) = 0.",
      "Step 3: Solving for temperature: RT = a / b \u21d2 T_B = a / (Rb).",
      "Step 4: Note related landmarks: Inversion temperature T_i = 2a / (Rb) = 2 T_B. Critical temperature T_c = 8a / (27 Rb)."
    ],
    "limitingCheck": "Independent check: recompute the governing relation and verify that the stem constraints select T_B = a / (R b) (Option A).",
    "check": "Independent check: recompute the governing relation and verify that the stem constraints select T_B = a / (R b) (Option A).",
    "trapWarning": "Option B is the Inversion Temperature (T_i = 2a/Rb); Option C is the Critical Temperature (T_c = 8a/27Rb)!",
    "correctKey": "opt-A",
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 4,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Chemistry)"
  },
  {
    "id": "GAS-Q07",
    "code": "GAS-Q07",
    "title": "JEE Main 2023 (Online) 25th January Morning Shift \u00b7 Diagnostic Hub \u00b7 QGAS-Q07 \u00b7 Behaviour of Gases",
    "subjectCode": "CHEM",
    "subject": "Chemistry",
    "topicCode": "BEHAVIOUR_OF_GASES",
    "topic": "Behaviour of Gases",
    "subtopic": "CAP-CHEM-GASES",
    "exam": "JEE Main 2023 (Online) 25th January Morning Shift",
    "year": "2023",
    "paper": "Diagnostic Hub",
    "questionNumber": "GAS-Q07",
    "section": "FAM-CHEM-GASES",
    "markingScheme": "+4 / -1",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Behaviour of Gases",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "SINGLE_CHOICE",
    "stem": "The critical constants of a van der Waals gas are P_c = a / (27 b\u00b2), V_c = 3 b, and T_c = 8 a / (27 R b). The value of the critical compressibility factor Z_c = (P_c V_c) / (R T_c) for any van der Waals gas is:",
    "options": [
      {
        "id": "opt-A",
        "text": "0.375 (or 3/8)"
      },
      {
        "id": "opt-B",
        "text": "0.280"
      },
      {
        "id": "opt-C",
        "text": "1.000"
      },
      {
        "id": "opt-D",
        "text": "0.750"
      }
    ],
    "hints": [
      "[METHOD] Step 1: Write critical parameters in terms of van der Waals constants: P_c = a / (27b\u00b2), V_c = 3b, T_c = 8a / (27Rb).",
      "[METHOD] Step 2: Form the critical compressibility ratio: Z_c = (P_c V_c) / (R T_c).",
      "[METHOD] Step 3: Substitute expressions: Z_c = [ (a / 27b\u00b2) \u00d7 3b ] / [ R \u00d7 8a / (27Rb) ] = (3a / 27b) / (8a / 27b) = 3/8."
    ],
    "steps": [
      "Step 1: Write critical parameters in terms of van der Waals constants: P_c = a / (27b\u00b2), V_c = 3b, T_c = 8a / (27Rb).",
      "Step 2: Form the critical compressibility ratio: Z_c = (P_c V_c) / (R T_c).",
      "Step 3: Substitute expressions: Z_c = [ (a / 27b\u00b2) \u00d7 3b ] / [ R \u00d7 8a / (27Rb) ] = (3a / 27b) / (8a / 27b) = 3/8.",
      "Step 4: Express in decimals: 3/8 = 0.375. This is a universal invariant for all fluids obeying the van der Waals equation."
    ],
    "limitingCheck": "Independent check: recompute the governing relation and verify that the stem constraints select 0.375 (or 3/8) (Option A).",
    "check": "Independent check: recompute the governing relation and verify that the stem constraints select 0.375 (or 3/8) (Option A).",
    "trapWarning": "Never assume Z = 1 at the critical point! Intermolecular attractions and co-volume effects are maximized near the liquid-gas coexistence dome, driving Z_c down to 0.375.",
    "correctKey": "opt-A",
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 4,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Chemistry)"
  },
  {
    "id": "GAS-Q08",
    "code": "GAS-Q08",
    "title": "JEE Main 2025 (Online) 24th January Morning Shift \u00b7 Diagnostic Hub \u00b7 QGAS-Q08 \u00b7 Behaviour of Gases",
    "subjectCode": "CHEM",
    "subject": "Chemistry",
    "topicCode": "BEHAVIOUR_OF_GASES",
    "topic": "Behaviour of Gases",
    "subtopic": "CAP-CHEM-GASES",
    "exam": "JEE Main 2025 (Online) 24th January Morning Shift",
    "year": "2025",
    "paper": "Diagnostic Hub",
    "questionNumber": "GAS-Q08",
    "section": "FAM-CHEM-GASES",
    "markingScheme": "+4 / -1",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Behaviour of Gases",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "SINGLE_CHOICE",
    "stem": "At very high pressure, the van der Waals equation for 1 mole of a real gas simplifies to which of the following linear forms for compressibility factor Z?",
    "options": [
      {
        "id": "opt-A",
        "text": "Z = 1 + (P b) / (R T)"
      },
      {
        "id": "opt-B",
        "text": "Z = 1 - a / (V R T)"
      },
      {
        "id": "opt-C",
        "text": "Z = 1 - (P b) / (R T)"
      },
      {
        "id": "opt-D",
        "text": "Z = 1 + a / (V R T)"
      }
    ],
    "hints": [
      "[METHOD] Step 1: At extremely high pressure, the attractive internal pressure term a/V\u00b2 becomes negligible relative to external pressure P (P >> a/V\u00b2).",
      "[METHOD] Step 2: The equation reduces to P(V_m - b) = RT.",
      "[METHOD] Step 3: Expand the product: PV_m - Pb = RT \u21d2 PV_m = RT + Pb."
    ],
    "steps": [
      "Step 1: At extremely high pressure, the attractive internal pressure term a/V\u00b2 becomes negligible relative to external pressure P (P >> a/V\u00b2).",
      "Step 2: The equation reduces to P(V_m - b) = RT.",
      "Step 3: Expand the product: PV_m - Pb = RT \u21d2 PV_m = RT + Pb.",
      "Step 4: Divide both sides by RT: Z = PV_m / (RT) = 1 + (Pb) / (RT).",
      "Step 5: Because b > 0 and P > 0, Z is strictly greater than 1, yielding a positive slope with pressure where repulsive forces dominate."
    ],
    "limitingCheck": "Independent check: recompute the governing relation and verify that the stem constraints select Z = 1 + (P b) / (R T) (Option A).",
    "check": "Independent check: recompute the governing relation and verify that the stem constraints select Z = 1 + (P b) / (R T) (Option A).",
    "trapWarning": "At moderate/low pressure, attraction dominates giving Z = 1 - a/(VRT) < 1. At high pressure, repulsive exclusion volume b dominates giving Z = 1 + Pb/(RT) > 1.",
    "correctKey": "opt-A",
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 4,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Chemistry)"
  },
  {
    "id": "GAS-Q09",
    "code": "GAS-Q09",
    "title": "JEE Main 2024 (Online) 27th January Morning Shift \u00b7 Diagnostic Hub \u00b7 QGAS-Q09 \u00b7 Behaviour of Gases",
    "subjectCode": "CHEM",
    "subject": "Chemistry",
    "topicCode": "BEHAVIOUR_OF_GASES",
    "topic": "Behaviour of Gases",
    "subtopic": "CAP-CHEM-GASES",
    "exam": "JEE Main 2024 (Online) 27th January Morning Shift",
    "year": "2024",
    "paper": "Diagnostic Hub",
    "questionNumber": "GAS-Q09",
    "section": "FAM-CHEM-GASES",
    "markingScheme": "+4 / -1",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Behaviour of Gases",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "SINGLE_CHOICE",
    "stem": "The ratio of the most probable speed (v_mp), average speed (v_avg), and root-mean-square speed (v_rms) of gas molecules at a given temperature is:",
    "options": [
      {
        "id": "opt-A",
        "text": "1 : 1.128 : 1.224  (\u221a2 : \u221a(8/\u03c0) : \u221a3)"
      },
      {
        "id": "opt-B",
        "text": "1.224 : 1.128 : 1  (\u221a3 : \u221a(8/\u03c0) : \u221a2)"
      },
      {
        "id": "opt-C",
        "text": "1 : 1 : 1"
      },
      {
        "id": "opt-D",
        "text": "1 : 1.224 : 1.128"
      }
    ],
    "hints": [
      "[METHOD] Step 1: Write explicit expressions for molecular speeds from Maxwell-Boltzmann kinetic distribution:",
      "[METHOD] v_mp = \u221a(2RT/M) \u2248 1.414 \u221a(RT/M)",
      "[METHOD] v_avg = \u221a(8RT/\u03c0M) \u2248 \u221a(2.546 RT/M) \u2248 1.596 \u221a(RT/M)"
    ],
    "steps": [
      "Step 1: Write explicit expressions for molecular speeds from Maxwell-Boltzmann kinetic distribution:",
      "        v_mp = \u221a(2RT/M) \u2248 1.414 \u221a(RT/M)",
      "        v_avg = \u221a(8RT/\u03c0M) \u2248 \u221a(2.546 RT/M) \u2248 1.596 \u221a(RT/M)",
      "        v_rms = \u221a(3RT/M) \u2248 1.732 \u221a(RT/M)",
      "Step 2: Normalize by dividing each by v_mp = \u221a(2RT/M):",
      "        v_mp / v_mp = 1.0",
      "        v_avg / v_mp = \u221a(4 / \u03c0) \u2248 1.128",
      "        v_rms / v_mp = \u221a(3 / 2) \u2248 1.224",
      "Step 3: The invariant speed hierarchy is strictly: v_mp < v_avg < v_rms, yielding ratio 1 : 1.128 : 1.224."
    ],
    "limitingCheck": "Independent check: recompute the governing relation and verify that the stem constraints select 1 : 1.128 : 1.224  (\u221a2 : \u221a(8/\u03c0) : \u221a3) (Option A).",
    "check": "Independent check: recompute the governing relation and verify that the stem constraints select 1 : 1.128 : 1.224  (\u221a2 : \u221a(8/\u03c0) : \u221a3) (Option A).",
    "trapWarning": "Notice the ordering: v_mp (peak of curve) is lowest, v_avg is intermediate, and v_rms is highest! The ratio is always in ascending order 1 : 1.128 : 1.224.",
    "correctKey": "opt-A",
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 4,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Chemistry)"
  },
  {
    "id": "GAS-Q10",
    "code": "GAS-Q10",
    "title": "JEE Main 2024 (Online) 30th January Morning Shift \u00b7 Diagnostic Hub \u00b7 QGAS-Q10 \u00b7 Behaviour of Gases",
    "subjectCode": "CHEM",
    "subject": "Chemistry",
    "topicCode": "BEHAVIOUR_OF_GASES",
    "topic": "Behaviour of Gases",
    "subtopic": "CAP-CHEM-GASES",
    "exam": "JEE Main 2024 (Online) 30th January Morning Shift",
    "year": "2024",
    "paper": "Diagnostic Hub",
    "questionNumber": "GAS-Q10",
    "section": "FAM-CHEM-GASES",
    "markingScheme": "+4 / -1",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Behaviour of Gases",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "SINGLE_CHOICE",
    "stem": "At very high pressures, the van der Waals equation for 1 mole of a real gas reduces to the linear equation:",
    "options": [
      {
        "id": "opt-A",
        "text": "Z = 1 + (Pb / RT)"
      },
      {
        "id": "opt-B",
        "text": "Z = 1 - (a / VRT)"
      },
      {
        "id": "opt-C",
        "text": "Z = 1 + (a / VRT)"
      },
      {
        "id": "opt-D",
        "text": "Z = 1 - (Pb / RT)"
      }
    ],
    "hints": [
      "[METHOD] Step 1: Write van der Waals equation for 1 mole: (P + a/V\u00b2)(V - b) = RT.",
      "[METHOD] Step 2: At very high pressures, P is extremely large, so the attractive correction a/V\u00b2 becomes negligible compared to P: (P + a/V\u00b2) \u2248 P.",
      "[METHOD] Step 3: However, the volume V is compressed and approaches the molecular co-volume b, so (V - b) cannot be neglected."
    ],
    "steps": [
      "Step 1: Write van der Waals equation for 1 mole: (P + a/V\u00b2)(V - b) = RT.",
      "Step 2: At very high pressures, P is extremely large, so the attractive correction a/V\u00b2 becomes negligible compared to P: (P + a/V\u00b2) \u2248 P.",
      "Step 3: However, the volume V is compressed and approaches the molecular co-volume b, so (V - b) cannot be neglected.",
      "Step 4: Equation simplifies to: P(V - b) = RT \u21d2 PV - Pb = RT.",
      "Step 5: Divide through by RT: (PV / RT) - (Pb / RT) = 1 \u21d2 Z = 1 + (Pb / RT).",
      "Step 6: This explains why at high pressure, Z > 1 and increases linearly with pressure with slope b/RT!"
    ],
    "limitingCheck": "Independent check: recompute the governing relation and verify that the stem constraints select Z = 1 + (Pb / RT) (Option A).",
    "check": "Independent check: recompute the governing relation and verify that the stem constraints select Z = 1 + (Pb / RT) (Option A).",
    "trapWarning": "Notice the PLUS sign: Z = 1 + Pb/RT! A minus sign (Z = 1 - a/VRT) occurs only at LOW pressures where intermolecular attractions dominate.",
    "correctKey": "opt-A",
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 4,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Chemistry)"
  },
  {
    "id": "GAS-Q11",
    "code": "GAS-Q11",
    "title": "JEE Main 2023 (Online) 10th April Morning Shift \u00b7 Diagnostic Hub \u00b7 QGAS-Q11 \u00b7 Behaviour of Gases",
    "subjectCode": "CHEM",
    "subject": "Chemistry",
    "topicCode": "BEHAVIOUR_OF_GASES",
    "topic": "Behaviour of Gases",
    "subtopic": "CAP-CHEM-GASES",
    "exam": "JEE Main 2023 (Online) 10th April Morning Shift",
    "year": "2023",
    "paper": "Diagnostic Hub",
    "questionNumber": "GAS-Q11",
    "section": "FAM-CHEM-GASES",
    "markingScheme": "+4 / -1",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Behaviour of Gases",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "SINGLE_CHOICE",
    "stem": "A gas is collected over water at 27\u00b0C and a total pressure of 750 mm Hg. If the aqueous tension of water at 27\u00b0C is 24 mm Hg, the actual pressure exerted by the dry gas is:",
    "options": [
      {
        "id": "opt-A",
        "text": "726 mm Hg"
      },
      {
        "id": "opt-B",
        "text": "774 mm Hg"
      },
      {
        "id": "opt-C",
        "text": "750 mm Hg"
      },
      {
        "id": "opt-D",
        "text": "375 mm Hg"
      }
    ],
    "hints": [
      "[METHOD] Step 1: When a gas is collected over water by downward displacement, the gas becomes saturated with water vapor.",
      "[METHOD] Step 2: Total measured pressure is the sum of dry gas pressure and saturated water vapor pressure (aqueous tension):",
      "[METHOD] P_total = P_dry gas + P_aqueous tension."
    ],
    "steps": [
      "Step 1: When a gas is collected over water by downward displacement, the gas becomes saturated with water vapor.",
      "Step 2: Total measured pressure is the sum of dry gas pressure and saturated water vapor pressure (aqueous tension):",
      "        P_total = P_dry gas + P_aqueous tension.",
      "Step 3: Solve for dry gas pressure: P_dry gas = P_total - P_aqueous tension.",
      "Step 4: Substitute given values: P_dry gas = 750 mm Hg - 24 mm Hg = 726 mm Hg.",
      "Step 5: In all subsequent ideal gas calculations (PV = nRT), the dry pressure 726 mm Hg must be used, not 750 mm Hg!"
    ],
    "limitingCheck": "Independent check: recompute the governing relation and verify that the stem constraints select 726 mm Hg (Option A).",
    "check": "Independent check: recompute the governing relation and verify that the stem constraints select 726 mm Hg (Option A).",
    "trapWarning": "Always SUBTRACT aqueous tension! Students often ADD aqueous tension (750 + 24 = 774 mm Hg), which violates Dalton's law.",
    "correctKey": "opt-A",
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 4,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Chemistry)"
  },
  {
    "id": "GAS-Q12",
    "code": "GAS-Q12",
    "title": "JEE Main 2023 (Online) 29th January Evening Shift \u00b7 Diagnostic Hub \u00b7 QGAS-Q12 \u00b7 Behaviour of Gases",
    "subjectCode": "CHEM",
    "subject": "Chemistry",
    "topicCode": "BEHAVIOUR_OF_GASES",
    "topic": "Behaviour of Gases",
    "subtopic": "CAP-CHEM-GASES",
    "exam": "JEE Main 2023 (Online) 29th January Evening Shift",
    "year": "2023",
    "paper": "Diagnostic Hub",
    "questionNumber": "GAS-Q12",
    "section": "FAM-CHEM-GASES",
    "markingScheme": "+4 / -1",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Behaviour of Gases",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "SINGLE_CHOICE",
    "stem": "Under identical conditions of temperature and pressure, 50 mL of gas X effuses through a porous pinhole in 20 minutes, whereas 40 mL of oxygen gas (O\u2082) effuses in 10 minutes. The molar mass of gas X is:",
    "options": [
      {
        "id": "opt-A",
        "text": "81.9 g/mol (\u2248 82 g/mol)"
      },
      {
        "id": "opt-B",
        "text": "32 g/mol"
      },
      {
        "id": "opt-C",
        "text": "16 g/mol"
      },
      {
        "id": "opt-D",
        "text": "64 g/mol"
      }
    ],
    "hints": [
      "[METHOD] Step 1: Compute effusion rate of gas X: r_X = V_X / t_X = 50 mL / 20 min = 2.5 mL/min.",
      "[METHOD] Step 2: Compute effusion rate of O\u2082: r_O2 = V_O2 / t_O2 = 40 mL / 10 min = 4.0 mL/min.",
      "[METHOD] Step 3: State Graham's Law of Effusion: r_X / r_O2 = \u221a(M_O2 / M_X)."
    ],
    "steps": [
      "Step 1: Compute effusion rate of gas X: r_X = V_X / t_X = 50 mL / 20 min = 2.5 mL/min.",
      "Step 2: Compute effusion rate of O\u2082: r_O2 = V_O2 / t_O2 = 40 mL / 10 min = 4.0 mL/min.",
      "Step 3: State Graham's Law of Effusion: r_X / r_O2 = \u221a(M_O2 / M_X).",
      "Step 4: Substitute rates and molar mass of O\u2082 (32 g/mol):",
      "        2.5 / 4.0 = \u221a(32 / M_X) \u21d2 5 / 8 = \u221a(32 / M_X).",
      "Step 5: Square both sides: 25 / 64 = 32 / M_X.",
      "Step 6: Solve for M_X: M_X = (32 \u00d7 64) / 25 = 2048 / 25 = 81.92 g/mol \u2248 82 g/mol."
    ],
    "limitingCheck": "Independent check: recompute the governing relation and verify that the stem constraints select 81.9 g/mol (\u2248 82 g/mol) (Option A).",
    "check": "Independent check: recompute the governing relation and verify that the stem constraints select 81.9 g/mol (\u2248 82 g/mol) (Option A).",
    "trapWarning": "RATE NORMALIZATION TRAP: Do not compare times directly without normalizing by volume! Rate is Volume/Time (50/20 vs 40/10).",
    "correctKey": "opt-A",
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 4,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Chemistry)"
  },
  {
    "id": "GAS-Q13",
    "code": "GAS-Q13",
    "title": "JEE Main 2022 (Online) 28th June Evening Shift \u00b7 Diagnostic Hub \u00b7 QGAS-Q13 \u00b7 Behaviour of Gases",
    "subjectCode": "CHEM",
    "subject": "Chemistry",
    "topicCode": "BEHAVIOUR_OF_GASES",
    "topic": "Behaviour of Gases",
    "subtopic": "CAP-CHEM-GASES",
    "exam": "JEE Main 2022 (Online) 28th June Evening Shift",
    "year": "2022",
    "paper": "Diagnostic Hub",
    "questionNumber": "GAS-Q13",
    "section": "FAM-CHEM-GASES",
    "markingScheme": "+4 / -1",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Behaviour of Gases",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "SINGLE_CHOICE",
    "stem": "The excluded volume (van der Waals constant b) for a gas composed of spherical molecules of radius r is related to the actual molecular volume (V_m) by:",
    "options": [
      {
        "id": "opt-B",
        "text": "b = 4 N_A V_m  (4 times the actual molecular volume)"
      },
      {
        "id": "opt-B",
        "text": "b = N_A V_m"
      },
      {
        "id": "opt-B",
        "text": "b = 2 N_A V_m"
      },
      {
        "id": "opt-B",
        "text": "b = 8 N_A V_m"
      }
    ],
    "hints": [
      "[METHOD] Step 1: Consider two spherical molecules A and B, each of radius r.",
      "[METHOD] Step 2: The center of molecule B cannot approach closer than distance 2r from the center of molecule A during collision.",
      "[METHOD] Step 3: Therefore, the exclusion sphere around molecule A has radius 2r."
    ],
    "steps": [
      "Step 1: Consider two spherical molecules A and B, each of radius r.",
      "Step 2: The center of molecule B cannot approach closer than distance 2r from the center of molecule A during collision.",
      "Step 3: Therefore, the exclusion sphere around molecule A has radius 2r.",
      "Step 4: Volume of this exclusion sphere = (4/3) \u03c0 (2r)\u00b3 = 8 \u00d7 [(4/3) \u03c0 r\u00b3] = 8 V_m.",
      "Step 5: This exclusion sphere is shared equally between the two colliding molecules, so excluded volume per single molecule = 8 V_m / 2 = 4 V_m.",
      "Step 6: For 1 mole of gas (N_A molecules): b = 4 N_A V_m = 4 N_A [(4/3) \u03c0 r\u00b3]."
    ],
    "limitingCheck": "Independent check: recompute the governing relation and verify that the stem constraints select b = 4 N_A V_m  (4 times the actual molecular volume) (Option A).",
    "check": "Independent check: recompute the governing relation and verify that the stem constraints select b = 4 N_A V_m  (4 times the actual molecular volume) (Option A).",
    "trapWarning": "Why is it 4 and not 8? Because each collision involves A PAIR of molecules, so the 8 V_m excluded sphere is divided by 2 per molecule!",
    "correctKey": "opt-B",
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 4,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Chemistry)"
  },
  {
    "id": "GAS-Q14",
    "code": "GAS-Q14",
    "title": "JEE Main 2022 (Online) 24th June Morning Shift \u00b7 Diagnostic Hub \u00b7 QGAS-Q14 \u00b7 Behaviour of Gases",
    "subjectCode": "CHEM",
    "subject": "Chemistry",
    "topicCode": "BEHAVIOUR_OF_GASES",
    "topic": "Behaviour of Gases",
    "subtopic": "CAP-CHEM-GASES",
    "exam": "JEE Main 2022 (Online) 24th June Morning Shift",
    "year": "2022",
    "paper": "Diagnostic Hub",
    "questionNumber": "GAS-Q14",
    "section": "FAM-CHEM-GASES",
    "markingScheme": "+4 / -1",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Behaviour of Gases",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "SINGLE_CHOICE",
    "stem": "For which of the following gases is the compressibility factor Z strictly greater than 1 (Z > 1) at ALL pressures at room temperature?",
    "options": [
      {
        "id": "opt-A",
        "text": "H\u2082 and He"
      },
      {
        "id": "opt-C",
        "text": "CH\u2084 and CO\u2082"
      },
      {
        "id": "opt-C",
        "text": "NH\u2083 and SO\u2082"
      },
      {
        "id": "opt-D",
        "text": "N\u2082 and O\u2082"
      }
    ],
    "hints": [
      "[METHOD] Step 1: H\u2082 and He are extremely light molecules with very few electrons (2 electrons each) and minimal polarizability.",
      "[METHOD] Step 2: Their intermolecular attractive forces are exceptionally weak, so van der Waals constant a \u2248 0.",
      "[METHOD] Step 3: When a \u2248 0, the van der Waals equation reduces to: P(V - b) = RT \u21d2 Z = 1 + (Pb / RT)."
    ],
    "steps": [
      "Step 1: H\u2082 and He are extremely light molecules with very few electrons (2 electrons each) and minimal polarizability.",
      "Step 2: Their intermolecular attractive forces are exceptionally weak, so van der Waals constant a \u2248 0.",
      "Step 3: When a \u2248 0, the van der Waals equation reduces to: P(V - b) = RT \u21d2 Z = 1 + (Pb / RT).",
      "Step 4: Since P > 0, b > 0, and T > 0, the term Pb/RT is strictly positive at all pressures.",
      "Step 5: Hence, for H\u2082 and He, the curve of Z vs P never dips below 1.0 (no attractive minimum) and rises monotonically above 1.0 at all pressures."
    ],
    "limitingCheck": "Independent check: recompute the governing relation and verify that the stem constraints select H\u2082 and He (Option A).",
    "check": "Independent check: recompute the governing relation and verify that the stem constraints select H\u2082 and He (Option A).",
    "trapWarning": "H\u2082 and He do not exhibit the typical dip (Z < 1) at room temperature because room temp (298 K) is far above their Boyle temperatures (T_B for H\u2082 is 110 K, He is 24 K)!",
    "correctKey": "opt-A",
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 4,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Chemistry)"
  },
  {
    "id": "GAS-Q15",
    "code": "GAS-Q15",
    "title": "JEE Main 2021 (Online) 16th March Evening Shift \u00b7 Diagnostic Hub \u00b7 QGAS-Q15 \u00b7 Behaviour of Gases",
    "subjectCode": "CHEM",
    "subject": "Chemistry",
    "topicCode": "BEHAVIOUR_OF_GASES",
    "topic": "Behaviour of Gases",
    "subtopic": "CAP-CHEM-GASES",
    "exam": "JEE Main 2021 (Online) 16th March Evening Shift",
    "year": "2021",
    "paper": "Diagnostic Hub",
    "questionNumber": "GAS-Q15",
    "section": "FAM-CHEM-GASES",
    "markingScheme": "+4 / -1",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Behaviour of Gases",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "SINGLE_CHOICE",
    "stem": "The Boyle temperature (T_B) of a van der Waals gas is defined as the temperature at which the initial slope (dZ/dP)_{P\u21920} is zero. It is given by:",
    "options": [
      {
        "id": "opt-A",
        "text": "T_B = a / (R b)"
      },
      {
        "id": "opt-B",
        "text": "T_B = 8a / (27 R b)"
      },
      {
        "id": "opt-C",
        "text": "T_B = 2a / (R b)"
      },
      {
        "id": "opt-D",
        "text": "T_B = a / (2 R b)"
      }
    ],
    "hints": [
      "[METHOD] Step 1: Write virial expansion of van der Waals equation: Z = 1 + B\u2082 P + B\u2083 P\u00b2 + ...",
      "[METHOD] Step 2: Second virial coefficient B\u2082 = (b - a/RT) / RT.",
      "[METHOD] Step 3: At the Boyle temperature T_B, real gas obeys ideal gas law over an appreciable range of low pressures, meaning (dZ/dP)_{P\u21920} = B\u2082 = 0."
    ],
    "steps": [
      "Step 1: Write virial expansion of van der Waals equation: Z = 1 + B\u2082 P + B\u2083 P\u00b2 + ...",
      "Step 2: Second virial coefficient B\u2082 = (b - a/RT) / RT.",
      "Step 3: At the Boyle temperature T_B, real gas obeys ideal gas law over an appreciable range of low pressures, meaning (dZ/dP)_{P\u21920} = B\u2082 = 0.",
      "Step 4: Set second virial coefficient to zero: b - a / (R T_B) = 0.",
      "Step 5: Solve for Boyle temperature: T_B = a / (R b).",
      "Step 6: Contrast with Critical temperature T_c = 8a / (27Rb) and Inversion temperature T_i = 2a / (Rb) = 2 T_B."
    ],
    "limitingCheck": "Independent check: recompute the governing relation and verify that the stem constraints select T_B = a / (R b) (Option A).",
    "check": "Independent check: recompute the governing relation and verify that the stem constraints select T_B = a / (R b) (Option A).",
    "trapWarning": "Do not confuse Boyle temperature T_B = a/Rb with Critical temperature T_c = 8a/(27Rb) or Inversion temperature T_i = 2a/Rb!",
    "correctKey": "opt-A",
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 4,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Chemistry)"
  },
  {
    "id": "GAS-Q16",
    "code": "GAS-Q16",
    "title": "JEE Main 2021 (Online) 20th July Morning Shift \u00b7 Diagnostic Hub \u00b7 QGAS-Q16 \u00b7 Behaviour of Gases",
    "subjectCode": "CHEM",
    "subject": "Chemistry",
    "topicCode": "BEHAVIOUR_OF_GASES",
    "topic": "Behaviour of Gases",
    "subtopic": "CAP-CHEM-GASES",
    "exam": "JEE Main 2021 (Online) 20th July Morning Shift",
    "year": "2021",
    "paper": "Diagnostic Hub",
    "questionNumber": "GAS-Q16",
    "section": "FAM-CHEM-GASES",
    "markingScheme": "+4 / -1",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Behaviour of Gases",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "SINGLE_CHOICE",
    "stem": "The value of the critical compressibility factor (Z_c = P_c V_c / R T_c) for any gas obeying the van der Waals equation is a universal constant equal to:",
    "options": [
      {
        "id": "opt-A",
        "text": "3 / 8  (= 0.375)"
      },
      {
        "id": "opt-B",
        "text": "8 / 3  (\u2248 2.67)"
      },
      {
        "id": "opt-C",
        "text": "1.00"
      },
      {
        "id": "opt-D",
        "text": "2 / 3  (\u2248 0.667)"
      }
    ],
    "hints": [
      "[METHOD] Step 1: Write expressions for critical constants in terms of van der Waals parameters a and b:",
      "[METHOD] Critical pressure: P_c = a / (27 b\u00b2)",
      "[METHOD] Critical molar volume: V_c = 3 b"
    ],
    "steps": [
      "Step 1: Write expressions for critical constants in terms of van der Waals parameters a and b:",
      "        Critical pressure: P_c = a / (27 b\u00b2)",
      "        Critical molar volume: V_c = 3 b",
      "        Critical temperature: T_c = 8 a / (27 R b)",
      "Step 2: Calculate product P_c V_c = [a / (27 b\u00b2)] \u00d7 [3 b] = 3a / (27 b) = a / (9 b).",
      "Step 3: Calculate product R T_c = R \u00d7 [8 a / (27 R b)] = 8 a / (27 b).",
      "Step 4: Compute critical compressibility factor:",
      "        Z_c = (P_c V_c) / (R T_c) = [a / (9 b)] / [8 a / (27 b)] = (1 / 9) \u00d7 (27 / 8) = 27 / 72 = 3 / 8 = 0.375.",
      "Step 5: This 3/8 ratio is a fundamental universal invariant independent of the nature of the gas!"
    ],
    "limitingCheck": "Independent check: recompute the governing relation and verify that the stem constraints select 3 / 8  (= 0.375) (Option A).",
    "check": "Independent check: recompute the governing relation and verify that the stem constraints select 3 / 8  (= 0.375) (Option A).",
    "trapWarning": "Notice that Z_c = 0.375 is much less than 1.0! At the critical point, intermolecular forces cause massive volume collapse compared to an ideal gas.",
    "correctKey": "opt-A",
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 4,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Chemistry)"
  },
  {
    "id": "GAS-Q17",
    "code": "GAS-Q17",
    "title": "JEE Main 2020 (Online) 4th September Evening Shift \u00b7 Diagnostic Hub \u00b7 QGAS-Q17 \u00b7 Behaviour of Gases",
    "subjectCode": "CHEM",
    "subject": "Chemistry",
    "topicCode": "BEHAVIOUR_OF_GASES",
    "topic": "Behaviour of Gases",
    "subtopic": "CAP-CHEM-GASES",
    "exam": "JEE Main 2020 (Online) 4th September Evening Shift",
    "year": "2020",
    "paper": "Diagnostic Hub",
    "questionNumber": "GAS-Q17",
    "section": "FAM-CHEM-GASES",
    "markingScheme": "+4 / -1",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Behaviour of Gases",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "SINGLE_CHOICE",
    "stem": "Two flasks A and B of equal volume contain 1.0 g of H\u2082 and 1.0 g of O\u2082 respectively at the same temperature T. Which of the following statements regarding the total translational kinetic energy (E_trans) of the gases is correct?",
    "options": [
      {
        "id": "opt-E",
        "text": "E_trans(H\u2082) is 16 times E_trans(O\u2082)"
      },
      {
        "id": "opt-E",
        "text": "E_trans(H\u2082) equals E_trans(O\u2082)"
      },
      {
        "id": "opt-E",
        "text": "E_trans(O\u2082) is 16 times E_trans(H\u2082)"
      },
      {
        "id": "opt-E",
        "text": "E_trans(H\u2082) is 4 times E_trans(O\u2082)"
      }
    ],
    "hints": [
      "[METHOD] Step 1: Total translational kinetic energy of an ideal gas is: E_trans = (3/2) n R T.",
      "[METHOD] Step 2: Note that kinetic energy PER MOLE is (3/2)RT, and PER MOLECULE is (3/2)k_B T (both depend only on T).",
      "[METHOD] Step 3: But here we have EQUAL MASSES (m = 1.0 g), not equal moles!"
    ],
    "steps": [
      "Step 1: Total translational kinetic energy of an ideal gas is: E_trans = (3/2) n R T.",
      "Step 2: Note that kinetic energy PER MOLE is (3/2)RT, and PER MOLECULE is (3/2)k_B T (both depend only on T).",
      "Step 3: But here we have EQUAL MASSES (m = 1.0 g), not equal moles!",
      "Step 4: Moles of H\u2082: n(H\u2082) = 1.0 g / 2 g/mol = 0.50 mol.",
      "Step 5: Moles of O\u2082: n(O\u2082) = 1.0 g / 32 g/mol = 0.03125 mol.",
      "Step 6: Ratio of total kinetic energies: E(H\u2082) / E(O\u2082) = n(H\u2082) / n(O\u2082) = 0.50 / 0.03125 = 32 / 2 = 16."
    ],
    "limitingCheck": "Independent check: recompute the governing relation and verify that the stem constraints select E_trans(H\u2082) is 16 times E_trans(O\u2082) (Option A).",
    "check": "Independent check: recompute the governing relation and verify that the stem constraints select E_trans(H\u2082) is 16 times E_trans(O\u2082) (Option A).",
    "trapWarning": "KE PER MOLECULE is the same ((3/2)k_B T), but TOTAL KE depends on total moles! 1 g of H\u2082 contains 16 times more moles than 1 g of O\u2082, hence 16 times more total KE.",
    "correctKey": "opt-E",
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 4,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Chemistry)"
  },
  {
    "id": "GAS-Q18",
    "code": "GAS-Q18",
    "title": "JEE Main 2020 (Online) 2nd September Morning Shift \u00b7 Diagnostic Hub \u00b7 QGAS-Q18 \u00b7 Behaviour of Gases",
    "subjectCode": "CHEM",
    "subject": "Chemistry",
    "topicCode": "BEHAVIOUR_OF_GASES",
    "topic": "Behaviour of Gases",
    "subtopic": "CAP-CHEM-GASES",
    "exam": "JEE Main 2020 (Online) 2nd September Morning Shift",
    "year": "2020",
    "paper": "Diagnostic Hub",
    "questionNumber": "GAS-Q18",
    "section": "FAM-CHEM-GASES",
    "markingScheme": "+4 / -1",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Behaviour of Gases",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "SINGLE_CHOICE",
    "stem": "Under what condition can a gas be liquefied purely by applying mechanical pressure without cooling?",
    "options": [
      {
        "id": "opt-A",
        "text": "Only when temperature T is at or below its critical temperature (T \u2264 T_c)"
      },
      {
        "id": "opt-A",
        "text": "At any temperature, provided the pressure applied is sufficiently high"
      },
      {
        "id": "opt-C",
        "text": "Only when temperature T is above its Boyle temperature (T > T_B)"
      },
      {
        "id": "opt-D",
        "text": "Only when pressure P is less than the critical pressure (P < P_c)"
      }
    ],
    "hints": [
      "[METHOD] Step 1: Thomas Andrews' experiments on CO\u2082 established the fundamental concept of critical temperature (T_c).",
      "[METHOD] Step 2: Above T_c, the thermal kinetic energy of the gas molecules (3/2 k_B T) is so intense that attractive intermolecular forces cannot hold molecules together in the liquid phase.",
      "[METHOD] Step 3: Even under enormous pressures exceeding thousands of atmospheres, a gas above T_c merely compresses into a dense supercritical fluid without undergoing a discrete phase transition into liquid."
    ],
    "steps": [
      "Step 1: Thomas Andrews' experiments on CO\u2082 established the fundamental concept of critical temperature (T_c).",
      "Step 2: Above T_c, the thermal kinetic energy of the gas molecules (3/2 k_B T) is so intense that attractive intermolecular forces cannot hold molecules together in the liquid phase.",
      "Step 3: Even under enormous pressures exceeding thousands of atmospheres, a gas above T_c merely compresses into a dense supercritical fluid without undergoing a discrete phase transition into liquid.",
      "Step 4: Therefore, liquefaction by application of pressure alone is possible IF AND ONLY IF T \u2264 T_c."
    ],
    "limitingCheck": "Independent check: recompute the governing relation and verify that the stem constraints select Only when temperature T is at or below its critical temperature (T \u2264 T_c) (Option A).",
    "check": "Independent check: recompute the governing relation and verify that the stem constraints select Only when temperature T is at or below its critical temperature (T \u2264 T_c) (Option A).",
    "trapWarning": "Common student intuition assumes ANY gas can be liquefied if you squeeze it hard enough. Physics disproves this: above T_c, no amount of pressure will liquefy a gas!",
    "correctKey": "opt-A",
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 4,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Chemistry)"
  },
  {
    "id": "GAS-Q19",
    "code": "GAS-Q19",
    "title": "JEE Main 2019 (Online) 9th April Evening Shift \u00b7 Diagnostic Hub \u00b7 QGAS-Q19 \u00b7 Behaviour of Gases",
    "subjectCode": "CHEM",
    "subject": "Chemistry",
    "topicCode": "BEHAVIOUR_OF_GASES",
    "topic": "Behaviour of Gases",
    "subtopic": "CAP-CHEM-GASES",
    "exam": "JEE Main 2019 (Online) 9th April Evening Shift",
    "year": "2019",
    "paper": "Diagnostic Hub",
    "questionNumber": "GAS-Q19",
    "section": "FAM-CHEM-GASES",
    "markingScheme": "+4 / -1",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Behaviour of Gases",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "SINGLE_CHOICE",
    "stem": "The SI units of the van der Waals constants a and b respectively are:",
    "options": [
      {
        "id": "opt-A",
        "text": "N m\u2074 mol\u207b\u00b2  and  m\u00b3 mol\u207b\u00b9"
      },
      {
        "id": "opt-B",
        "text": "N m\u00b2 mol\u207b\u00b2  and  m\u00b3 mol\u207b\u00b9"
      },
      {
        "id": "opt-C",
        "text": "N m\u2074 mol\u207b\u00b9  and  m\u00b2 mol\u207b\u00b9"
      },
      {
        "id": "opt-A",
        "text": "atm L\u00b2 mol\u207b\u00b2  and  L mol\u207b\u00b9 (in CGS/practical units)"
      }
    ],
    "hints": [
      "[METHOD] Step 1: In the van der Waals equation: (P + an\u00b2/V\u00b2)(V - nb) = nRT.",
      "[METHOD] Step 2: By dimensional homogeneity, an\u00b2/V\u00b2 must have dimensions of Pressure:",
      "[METHOD] [a] = [P] [V]\u00b2 / [n]\u00b2 = (N m\u207b\u00b2) (m\u00b3)\u00b2 / (mol)\u00b2 = N m\u207b\u00b2 m\u2076 mol\u207b\u00b2 = N m\u2074 mol\u207b\u00b2."
    ],
    "steps": [
      "Step 1: In the van der Waals equation: (P + an\u00b2/V\u00b2)(V - nb) = nRT.",
      "Step 2: By dimensional homogeneity, an\u00b2/V\u00b2 must have dimensions of Pressure:",
      "        [a] = [P] [V]\u00b2 / [n]\u00b2 = (N m\u207b\u00b2) (m\u00b3)\u00b2 / (mol)\u00b2 = N m\u207b\u00b2 m\u2076 mol\u207b\u00b2 = N m\u2074 mol\u207b\u00b2.",
      "Step 3: Similarly, nb must have dimensions of Volume:",
      "        [b] = [V] / [n] = m\u00b3 / mol = m\u00b3 mol\u207b\u00b9.",
      "Step 4: Compiling SI units: a has N m\u2074 mol\u207b\u00b2, and b has m\u00b3 mol\u207b\u00b9.",
      "Step 5: Note: in practical chemistry units, a is in atm L\u00b2 mol\u207b\u00b2 and b is in L mol\u207b\u00b9."
    ],
    "limitingCheck": "Independent check: recompute the governing relation and verify that the stem constraints select N m\u2074 mol\u207b\u00b2  and  m\u00b3 mol\u207b\u00b9 (Option A).",
    "check": "Independent check: recompute the governing relation and verify that the stem constraints select N m\u2074 mol\u207b\u00b2  and  m\u00b3 mol\u207b\u00b9 (Option A).",
    "trapWarning": "Read units carefully! The question specifies SI UNITS (N and m), not practical units (atm and L). Option D gives practical units, but Option A gives the correct SI units.",
    "correctKey": "opt-A",
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 4,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Chemistry)"
  },
  {
    "id": "GAS-Q20",
    "code": "GAS-Q20",
    "title": "JEE Main 2018 (Offline) 8th April Shift \u00b7 Diagnostic Hub \u00b7 QGAS-Q20 \u00b7 Behaviour of Gases",
    "subjectCode": "CHEM",
    "subject": "Chemistry",
    "topicCode": "BEHAVIOUR_OF_GASES",
    "topic": "Behaviour of Gases",
    "subtopic": "CAP-CHEM-GASES",
    "exam": "JEE Main 2018 (Offline) 8th April Shift",
    "year": "2018",
    "paper": "Diagnostic Hub",
    "questionNumber": "GAS-Q20",
    "section": "FAM-CHEM-GASES",
    "markingScheme": "+4 / -1",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Behaviour of Gases",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "SINGLE_CHOICE",
    "stem": "At what absolute temperature will the root mean square speed (v_rms) of SO\u2082 molecules be equal to the v_rms of O\u2082 molecules at 300 K? (Molar masses: SO\u2082 = 64 g/mol, O\u2082 = 32 g/mol)",
    "options": [
      {
        "id": "opt-A",
        "text": "600 K"
      },
      {
        "id": "opt-B",
        "text": "150 K"
      },
      {
        "id": "opt-C",
        "text": "450 K"
      },
      {
        "id": "opt-D",
        "text": "1200 K"
      }
    ],
    "hints": [
      "[METHOD] Step 1: Formula for root mean square speed: v_rms = \u221a(3 R T / M).",
      "[METHOD] Step 2: Equating speeds: v_rms(SO\u2082) = v_rms(O\u2082) \u21d2 \u221a(3 R T_SO2 / M_SO2) = \u221a(3 R T_O2 / M_O2).",
      "[METHOD] Step 3: Square both sides and cancel 3R:"
    ],
    "steps": [
      "Step 1: Formula for root mean square speed: v_rms = \u221a(3 R T / M).",
      "Step 2: Equating speeds: v_rms(SO\u2082) = v_rms(O\u2082) \u21d2 \u221a(3 R T_SO2 / M_SO2) = \u221a(3 R T_O2 / M_O2).",
      "Step 3: Square both sides and cancel 3R:",
      "        T_SO2 / M_SO2 = T_O2 / M_O2.",
      "Step 4: Solve for T_SO2: T_SO2 = T_O2 \u00d7 (M_SO2 / M_O2).",
      "Step 5: Substitute M_SO2 = 64 g/mol, M_O2 = 32 g/mol, and T_O2 = 300 K:",
      "        T_SO2 = 300 K \u00d7 (64 / 32) = 300 \u00d7 2 = 600 K."
    ],
    "limitingCheck": "Independent check: recompute the governing relation and verify that the stem constraints select 600 K (Option A).",
    "check": "Independent check: recompute the governing relation and verify that the stem constraints select 600 K (Option A).",
    "trapWarning": "Heavier molecule requires HIGHER temperature to attain the same rms speed! SO\u2082 is twice as heavy as O\u2082, so temperature must be doubled (300 \u00d7 2 = 600 K, not halved).",
    "correctKey": "opt-A",
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 4,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Chemistry)"
  },
  {
    "id": "REDOX-Q01",
    "code": "REDOX-Q01",
    "title": "JEE Main 2026 (Online) 6th April Evening Shift \u00b7 Diagnostic Hub \u00b7 QREDOX-Q01 \u00b7 Redox Reactions",
    "subjectCode": "CHEM",
    "subject": "Chemistry",
    "topicCode": "REDOX_REACTIONS",
    "topic": "Redox Reactions",
    "subtopic": "CAP-CHEM-REDOX",
    "exam": "JEE Main 2026 (Online) 6th April Evening Shift",
    "year": "2026",
    "paper": "Diagnostic Hub",
    "questionNumber": "REDOX-Q01",
    "section": "FAM-CHEM-REDOX",
    "markingScheme": "+4 / -1",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Redox Reactions",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "SINGLE_CHOICE",
    "stem": "The oxidation state of Chromium in chromium pentoxide (CrO\u2085, blue butterfly peroxo compound) is:",
    "options": [
      {
        "id": "opt-A",
        "text": "+6"
      },
      {
        "id": "opt-B",
        "text": "+10"
      },
      {
        "id": "opt-C",
        "text": "+5"
      },
      {
        "id": "opt-D",
        "text": "+4"
      }
    ],
    "hints": [
      "[METHOD] Step 1: Inspect the structure before using the usual oxygen rule. CrO\u2085 contains one oxo oxygen and two O\u2013O peroxo groups; oxygen in a peroxide unit is assigned oxidation state -1.",
      "[METHOD] Step 2: Let the chromium oxidation state be x. The oxo oxygen contributes -2 and the four peroxo oxygens contribute 4 \u00d7 (-1).",
      "[METHOD] Step 3: Charge balance for neutral CrO\u2085: x + (-2) + 4(-1) = 0, so x = +6."
    ],
    "steps": [
      "Step 1: Inspect the structure before using the usual oxygen rule. CrO\u2085 contains one oxo oxygen and two O\u2013O peroxo groups; oxygen in a peroxide unit is assigned oxidation state -1.",
      "Step 2: Let the chromium oxidation state be x. The oxo oxygen contributes -2 and the four peroxo oxygens contribute 4 \u00d7 (-1).",
      "Step 3: Charge balance for neutral CrO\u2085: x + (-2) + 4(-1) = 0, so x = +6.",
      "Step 4: The tempting x + 5(-2) = 0 calculation fails because it assumes every oxygen is ordinary oxide oxygen and ignores the O\u2013O peroxide bonds.",
      "Step 5: Oxidation state is a formal electron-bookkeeping assignment, not a measured charge sitting on the chromium atom."
    ],
    "limitingCheck": "Independent check: +6 + (-2) + 4(-1) = 0, so the assigned oxidation states reproduce the neutral formula exactly.",
    "check": "Independent check: +6 + (-2) + 4(-1) = 0, so the assigned oxidation states reproduce the neutral formula exactly.",
    "trapWarning": "Do not apply O = -2 blindly. First scan the structure for O\u2013O peroxide or superoxide units; the structural exception changes the bookkeeping.",
    "correctKey": "opt-A",
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 4,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Chemistry)"
  },
  {
    "id": "REDOX-Q02",
    "code": "REDOX-Q02",
    "title": "JEE Main 2025 (Online) 29th January Morning Shift \u00b7 Diagnostic Hub \u00b7 QREDOX-Q02 \u00b7 Redox Reactions",
    "subjectCode": "CHEM",
    "subject": "Chemistry",
    "topicCode": "REDOX_REACTIONS",
    "topic": "Redox Reactions",
    "subtopic": "CAP-CHEM-REDOX",
    "exam": "JEE Main 2025 (Online) 29th January Morning Shift",
    "year": "2025",
    "paper": "Diagnostic Hub",
    "questionNumber": "REDOX-Q02",
    "section": "FAM-CHEM-REDOX",
    "markingScheme": "+4 / -1",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Redox Reactions",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "SINGLE_CHOICE",
    "stem": "The n-factor (valency factor) of potassium permanganate (KMnO\u2084) when it acts as an oxidizing agent in acidic, neutral/weakly alkaline, and strongly basic mediums respectively is:",
    "options": [
      {
        "id": "opt-A",
        "text": "5, 3, 1"
      },
      {
        "id": "opt-B",
        "text": "5, 1, 3"
      },
      {
        "id": "opt-C",
        "text": "3, 5, 1"
      },
      {
        "id": "opt-D",
        "text": "1, 3, 5"
      }
    ],
    "hints": [
      "[METHOD] Step 1: Initial oxidation state of Mn in KMnO\u2084: +1 + x + 4(-2) = 0 \u21d2 x = +7.",
      "[METHOD] Step 2: In acidic medium: MnO\u2084\u207b + 8H\u207a + 5e\u207b \u2192 Mn\u00b2\u207a + 4H\u2082O. Change in O.S. = 7 - 2 = 5. Therefore, n = 5.",
      "[METHOD] Step 3: In neutral or weakly alkaline medium: MnO\u2084\u207b + 2H\u2082O + 3e\u207b \u2192 MnO\u2082 + 4OH\u207b. Final O.S. of Mn in MnO\u2082 is +4. Change in O.S. = 7 - 4 = 3. Therefore, n = 3."
    ],
    "steps": [
      "Step 1: Initial oxidation state of Mn in KMnO\u2084: +1 + x + 4(-2) = 0 \u21d2 x = +7.",
      "Step 2: In acidic medium: MnO\u2084\u207b + 8H\u207a + 5e\u207b \u2192 Mn\u00b2\u207a + 4H\u2082O. Change in O.S. = 7 - 2 = 5. Therefore, n = 5.",
      "Step 3: In neutral or weakly alkaline medium: MnO\u2084\u207b + 2H\u2082O + 3e\u207b \u2192 MnO\u2082 + 4OH\u207b. Final O.S. of Mn in MnO\u2082 is +4. Change in O.S. = 7 - 4 = 3. Therefore, n = 3.",
      "Step 4: In strongly basic medium: MnO\u2084\u207b + e\u207b \u2192 MnO\u2084\u00b2\u207b (manganate ion). Final O.S. of Mn is +6. Change in O.S. = 7 - 6 = 1. Therefore, n = 1.",
      "Step 5: Sequence: 5, 3, 1 (Remember mnemonic: BAN = 1, 3, 5 for Basic, Alkaline/neutral, aNacidic)."
    ],
    "limitingCheck": "Independent check: the three reduction half-reactions consume 5 e\u207b, 3 e\u207b and 1 e\u207b per MnO\u2084\u207b in acidic, neutral/weakly alkaline and strongly basic conditions respectively.",
    "check": "Independent check: the three reduction half-reactions consume 5 e\u207b, 3 e\u207b and 1 e\u207b per MnO\u2084\u207b in acidic, neutral/weakly alkaline and strongly basic conditions respectively.",
    "trapWarning": "Students frequently swap neutral (n = 3) and strongly basic (n = 1). In strongly basic medium, it reduces only to manganate (Mn\u2076\u207a, green)!",
    "correctKey": "opt-A",
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 4,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Chemistry)"
  },
  {
    "id": "REDOX-Q03",
    "code": "REDOX-Q03",
    "title": "JEE Main 2024 (Online) 31st January Morning Shift \u00b7 Diagnostic Hub \u00b7 QREDOX-Q03 \u00b7 Redox Reactions",
    "subjectCode": "CHEM",
    "subject": "Chemistry",
    "topicCode": "REDOX_REACTIONS",
    "topic": "Redox Reactions",
    "subtopic": "CAP-CHEM-REDOX",
    "exam": "JEE Main 2024 (Online) 31st January Morning Shift",
    "year": "2024",
    "paper": "Diagnostic Hub",
    "questionNumber": "REDOX-Q03",
    "section": "FAM-CHEM-REDOX",
    "markingScheme": "+4 / -1",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Redox Reactions",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "CLASSIFY",
    "kind": "SINGLE_CHOICE",
    "stem": "In the disproportionation reaction of white phosphorus in basic solution: P\u2084 + 3OH\u207b + 3H\u2082O \u2192 PH\u2083 + 3H\u2082PO\u2082\u207b, the equivalent weight of P\u2084 (Molar mass M) is:",
    "options": [
      {
        "id": "opt-A",
        "text": "M / 3"
      },
      {
        "id": "opt-B",
        "text": "M / 4"
      },
      {
        "id": "opt-C",
        "text": "M / 12"
      },
      {
        "id": "opt-D",
        "text": "3 M / 4"
      }
    ],
    "hints": [
      "[METHOD] Step 1: In P\u2084, phosphorus is 0. In PH\u2083 it is -3, while in H\u2082PO\u2082\u207b it is +1.",
      "[METHOD] Step 2: The balanced reaction sends one of the four P atoms to -3 and the other three P atoms to +1.",
      "[METHOD] Step 3: The reduced P atom gains 3 e\u207b. The three oxidized P atoms each lose 1 e\u207b, for 3 e\u207b lost in total."
    ],
    "steps": [
      "Step 1: In P\u2084, phosphorus is 0. In PH\u2083 it is -3, while in H\u2082PO\u2082\u207b it is +1.",
      "Step 2: The balanced reaction sends one of the four P atoms to -3 and the other three P atoms to +1.",
      "Step 3: The reduced P atom gains 3 e\u207b. The three oxidized P atoms each lose 1 e\u207b, for 3 e\u207b lost in total.",
      "Step 4: Electron loss and gain therefore match at 3 e\u207b per mole of P\u2084.",
      "Step 5: n-factor(P\u2084) = 3, so equivalent weight = M/3."
    ],
    "limitingCheck": "Independent check: electrons lost = 3 \u00d7 1 = 3 and electrons gained = 1 \u00d7 3 = 3; the electron ledger closes.",
    "check": "Independent check: electrons lost = 3 \u00d7 1 = 3 and electrons gained = 1 \u00d7 3 = 3; the electron ledger closes.",
    "trapWarning": "Do not count a hypothetical change for all four P atoms in the same direction. Disproportionation splits identical starting atoms between oxidation and reduction products.",
    "correctKey": "opt-A",
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 4,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Chemistry)"
  },
  {
    "id": "REDOX-Q04",
    "code": "REDOX-Q04",
    "title": "JEE Main 2025 (Online) 28th January Evening Shift \u00b7 Diagnostic Hub \u00b7 QREDOX-Q04 \u00b7 Redox Reactions",
    "subjectCode": "CHEM",
    "subject": "Chemistry",
    "topicCode": "REDOX_REACTIONS",
    "topic": "Redox Reactions",
    "subtopic": "CAP-CHEM-REDOX",
    "exam": "JEE Main 2025 (Online) 28th January Evening Shift",
    "year": "2025",
    "paper": "Diagnostic Hub",
    "questionNumber": "REDOX-Q04",
    "section": "FAM-CHEM-REDOX",
    "markingScheme": "+4 / -1",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Redox Reactions",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "SINGLE_CHOICE",
    "stem": "In the tetrathionate ion (S\u2084O\u2086\u00b2\u207b), the oxidation states of the four sulfur atoms are respectively:",
    "options": [
      {
        "id": "opt-A",
        "text": "+5, 0, 0, +5"
      },
      {
        "id": "opt-B",
        "text": "+2.5, +2.5, +2.5, +2.5"
      },
      {
        "id": "opt-C",
        "text": "+6, 0, 0, +6"
      },
      {
        "id": "opt-D",
        "text": "+4, +1, +1, +4"
      }
    ],
    "hints": [
      "[METHOD] Step 1: Formula algebra gives an average sulfur oxidation number of +2.5 because 4x + 6(-2) = -2.",
      "[METHOD] Step 2: That +2.5 is a formula-average description; the structure lets us make atom-by-atom formal assignments.",
      "[METHOD] Step 3: In the S\u2013S\u2013S\u2013S skeleton, homonuclear S\u2013S bonds contribute zero to oxidation-state assignment, so the two central sulfur atoms are assigned 0."
    ],
    "steps": [
      "Step 1: Formula algebra gives an average sulfur oxidation number of +2.5 because 4x + 6(-2) = -2.",
      "Step 2: That +2.5 is a formula-average description; the structure lets us make atom-by-atom formal assignments.",
      "Step 3: In the S\u2013S\u2013S\u2013S skeleton, homonuclear S\u2013S bonds contribute zero to oxidation-state assignment, so the two central sulfur atoms are assigned 0.",
      "Step 4: Let each equivalent terminal sulfur be x. Using the whole ion: 2x + 0 + 0 + 6(-2) = -2, giving x = +5.",
      "Step 5: The atom-by-atom formal assignments are therefore +5, 0, 0, +5.",
      "Step 6: Check: (+5) + 0 + 0 + (+5) + 6(-2) = -2, matching the ion charge."
    ],
    "limitingCheck": "Independent check: +5 + 0 + 0 + +5 - 12 = -2, exactly reproducing the tetrathionate charge.",
    "check": "Independent check: +5 + 0 + 0 + +5 - 12 = -2, exactly reproducing the tetrathionate charge.",
    "trapWarning": "Do not confuse the formula-average value (+2.5) with the atom-by-atom structural assignment requested in the question.",
    "correctKey": "opt-A",
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 4,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Chemistry)"
  },
  {
    "id": "REDOX-Q05",
    "code": "REDOX-Q05",
    "title": "JEE Main 2026 (Online) 7th April Morning Shift \u00b7 Diagnostic Hub \u00b7 QREDOX-Q05 \u00b7 Redox Reactions",
    "subjectCode": "CHEM",
    "subject": "Chemistry",
    "topicCode": "REDOX_REACTIONS",
    "topic": "Redox Reactions",
    "subtopic": "CAP-CHEM-REDOX",
    "exam": "JEE Main 2026 (Online) 7th April Morning Shift",
    "year": "2026",
    "paper": "Diagnostic Hub",
    "questionNumber": "REDOX-Q05",
    "section": "FAM-CHEM-REDOX",
    "markingScheme": "+4 / -1",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Redox Reactions",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "SINGLE_CHOICE",
    "stem": "How many moles of acidified K\u2082Cr\u2082O\u2087 are required to completely oxidize 1 mole of ferrous oxalate (FeC\u2082O\u2084)?",
    "options": [
      {
        "id": "opt-A",
        "text": "0.50 mol"
      },
      {
        "id": "opt-B",
        "text": "0.33 mol"
      },
      {
        "id": "opt-C",
        "text": "0.60 mol"
      },
      {
        "id": "opt-D",
        "text": "1.00 mol"
      }
    ],
    "hints": [
      "[METHOD] Step 1: Calculate the n-factor of K\u2082Cr\u2082O\u2087 in acidic medium: Cr\u2082O\u2087\u00b2\u207b + 14H\u207a + 6e\u207b \u2192 2Cr\u00b3\u207a + 7H\u2082O. 2 Cr atoms go from +6 to +3 \u21d2 n-factor = 2 \u00d7 3 = 6.",
      "[METHOD] Step 2: Calculate the n-factor of ferrous oxalate (FeC\u2082O\u2084):",
      "[METHOD] Both the cation AND the anion get oxidized!"
    ],
    "steps": [
      "Step 1: Calculate the n-factor of K\u2082Cr\u2082O\u2087 in acidic medium: Cr\u2082O\u2087\u00b2\u207b + 14H\u207a + 6e\u207b \u2192 2Cr\u00b3\u207a + 7H\u2082O. 2 Cr atoms go from +6 to +3 \u21d2 n-factor = 2 \u00d7 3 = 6.",
      "Step 2: Calculate the n-factor of ferrous oxalate (FeC\u2082O\u2084):",
      "        Both the cation AND the anion get oxidized!",
      "        Fe\u00b2\u207a \u2192 Fe\u00b3\u207a + e\u207b  (1 electron lost by iron)",
      "        C\u2082O\u2084\u00b2\u207b \u2192 2CO\u2082 + 2e\u207b (2 electrons lost by oxalate carbon: 2 \u00d7 (+4 - +3) = 2)",
      "        Total electrons lost per mole of FeC\u2082O\u2084 = 1 + 2 = 3. Therefore, n-factor of FeC\u2082O\u2084 = 3!",
      "Step 3: Apply Law of Chemical Equivalence: Equivalents of K\u2082Cr\u2082O\u2087 = Equivalents of FeC\u2082O\u2084.",
      "        moles(K\u2082Cr\u2082O\u2087) \u00d7 6 = moles(FeC\u2082O\u2084) \u00d7 3.",
      "Step 4: For 1 mole of FeC\u2082O\u2084: moles(K\u2082Cr\u2082O\u2087) \u00d7 6 = 1 \u00d7 3 \u21d2 moles(K\u2082Cr\u2082O\u2087) = 3 / 6 = 0.50 mol."
    ],
    "limitingCheck": "Independent check: one dichromate accepts 6 e\u207b, while one FeC\u2082O\u2084 loses 3 e\u207b; therefore 0.5 mol dichromate accepts the electrons from 1 mol FeC\u2082O\u2084.",
    "check": "Independent check: one dichromate accepts 6 e\u207b, while one FeC\u2082O\u2084 loses 3 e\u207b; therefore 0.5 mol dichromate accepts the electrons from 1 mol FeC\u2082O\u2084.",
    "trapWarning": "The colossal trap: forgetting that BOTH Fe\u00b2\u207a and C\u2082O\u2084\u00b2\u207b oxidize! FeC\u2082O\u2084 has n-factor = 1 + 2 = 3, not 1 or 2.",
    "correctKey": "opt-A",
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 4,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Chemistry)"
  },
  {
    "id": "REDOX-Q06",
    "code": "REDOX-Q06",
    "title": "JEE Main 2024 (Online) 29th January Evening Shift \u00b7 Diagnostic Hub \u00b7 QREDOX-Q06 \u00b7 Redox Reactions",
    "subjectCode": "CHEM",
    "subject": "Chemistry",
    "topicCode": "REDOX_REACTIONS",
    "topic": "Redox Reactions",
    "subtopic": "CAP-CHEM-REDOX",
    "exam": "JEE Main 2024 (Online) 29th January Evening Shift",
    "year": "2024",
    "paper": "Diagnostic Hub",
    "questionNumber": "REDOX-Q06",
    "section": "FAM-CHEM-REDOX",
    "markingScheme": "+4 / -1",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Redox Reactions",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "SINGLE_CHOICE",
    "stem": "In magnetic iron oxide (Fe\u2083O\u2084, magnetite), the oxidation state of iron is best described as:",
    "options": [
      {
        "id": "opt-A",
        "text": "A mixture of Fe(II) and Fe(III) in 1 : 2 ratio"
      },
      {
        "id": "opt-B",
        "text": "+8/3 on each iron atom"
      },
      {
        "id": "opt-A",
        "text": "All Fe(II)"
      },
      {
        "id": "opt-A",
        "text": "All Fe(III)"
      }
    ],
    "hints": [
      "[METHOD] Step 1: Formula algebra gives the average value 3x + 4(-2) = 0, so x = +8/3.",
      "[METHOD] Step 2: Magnetite is conventionally described as a mixed-valence oxide containing Fe(II) and Fe(III) in a 1:2 stoichiometric ratio.",
      "[METHOD] Step 3: A useful formal decomposition is FeO\u00b7Fe\u2082O\u2083, corresponding to one Fe(II) and two Fe(III) per Fe\u2083O\u2084 formula unit."
    ],
    "steps": [
      "Step 1: Formula algebra gives the average value 3x + 4(-2) = 0, so x = +8/3.",
      "Step 2: Magnetite is conventionally described as a mixed-valence oxide containing Fe(II) and Fe(III) in a 1:2 stoichiometric ratio.",
      "Step 3: A useful formal decomposition is FeO\u00b7Fe\u2082O\u2083, corresponding to one Fe(II) and two Fe(III) per Fe\u2083O\u2084 formula unit.",
      "Step 4: Average check: [2 + 3 + 3]/3 = 8/3.",
      "Step 5: These oxidation states are formal bookkeeping labels; they should not be described as literal localized atomic charges."
    ],
    "limitingCheck": "Independent check: one +2 and two +3 assignments sum to +8, exactly balancing four O at -2.",
    "check": "Independent check: one +2 and two +3 assignments sum to +8, exactly balancing four O at -2.",
    "trapWarning": "The question asks for the mixed-valence description, not merely the formula-average +8/3. Do not equate either oxidation-state notation with measured atomic charge.",
    "correctKey": "opt-A",
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 4,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Chemistry)"
  },
  {
    "id": "REDOX-Q07",
    "code": "REDOX-Q07",
    "title": "JEE Main 2023 (Online) 24th January Evening Shift \u00b7 Diagnostic Hub \u00b7 QREDOX-Q07 \u00b7 Redox Reactions",
    "subjectCode": "CHEM",
    "subject": "Chemistry",
    "topicCode": "REDOX_REACTIONS",
    "topic": "Redox Reactions",
    "subtopic": "CAP-CHEM-REDOX",
    "exam": "JEE Main 2023 (Online) 24th January Evening Shift",
    "year": "2023",
    "paper": "Diagnostic Hub",
    "questionNumber": "REDOX-Q07",
    "section": "FAM-CHEM-REDOX",
    "markingScheme": "+4 / -1",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Redox Reactions",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "SINGLE_CHOICE",
    "stem": "When potassium permanganate (KMnO\u2084, molar mass M) acts as an oxidizing agent in neutral or faintly alkaline medium (such as Baeyer's reagent), its oxidation state changes from +7 to +4 (MnO\u2082). The equivalent mass of KMnO\u2084 in this medium is:",
    "options": [
      {
        "id": "opt-A",
        "text": "M / 3"
      },
      {
        "id": "opt-B",
        "text": "M / 5"
      },
      {
        "id": "opt-C",
        "text": "M / 1"
      },
      {
        "id": "opt-D",
        "text": "M / 2"
      }
    ],
    "hints": [
      "[METHOD] Step 1: Write the reduction half-reaction in neutral or faintly alkaline aqueous medium: MnO\u2084\u207b + 2H\u2082O + 3e\u207b \u2192 MnO\u2082(s) + 4OH\u207b.",
      "[METHOD] Step 2: Determine oxidation states: Manganese changes from +7 in KMnO\u2084 to +4 in MnO\u2082.",
      "[METHOD] Step 3: Total electrons gained per mole of KMnO\u2084 is |+7 - +4| = 3. Therefore, n-factor = 3."
    ],
    "steps": [
      "Step 1: Write the reduction half-reaction in neutral or faintly alkaline aqueous medium: MnO\u2084\u207b + 2H\u2082O + 3e\u207b \u2192 MnO\u2082(s) + 4OH\u207b.",
      "Step 2: Determine oxidation states: Manganese changes from +7 in KMnO\u2084 to +4 in MnO\u2082.",
      "Step 3: Total electrons gained per mole of KMnO\u2084 is |+7 - +4| = 3. Therefore, n-factor = 3.",
      "Step 4: Compute equivalent mass: Equivalent mass = Molar mass (M) / n-factor = M / 3.",
      "Step 5: Contrast across media: Acidic medium gives Mn\u00b2\u207a (n=5 \u21d2 M/5); strongly basic gives MnO\u2084\u00b2\u207b (n=1 \u21d2 M/1); neutral gives MnO\u2082 (n=3 \u21d2 M/3)."
    ],
    "limitingCheck": "Independent check: MnO\u2084\u207b + 2H\u2082O + 3e\u207b \u2192 MnO\u2082 + 4OH\u207b balances atoms and charge, confirming n = 3.",
    "check": "Independent check: MnO\u2084\u207b + 2H\u2082O + 3e\u207b \u2192 MnO\u2082 + 4OH\u207b balances atoms and charge, confirming n = 3.",
    "trapWarning": "In acidic medium, n-factor = 5 (M/5). In strongly basic medium, n-factor = 1 (M/1). In neutral/faintly alkaline medium, n-factor = 3 (M/3)!",
    "correctKey": "opt-A",
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 4,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Chemistry)"
  },
  {
    "id": "REDOX-Q08",
    "code": "REDOX-Q08",
    "title": "JEE Main 2025 (Online) 23rd January Morning Shift \u00b7 Diagnostic Hub \u00b7 QREDOX-Q08 \u00b7 Redox Reactions",
    "subjectCode": "CHEM",
    "subject": "Chemistry",
    "topicCode": "REDOX_REACTIONS",
    "topic": "Redox Reactions",
    "subtopic": "CAP-CHEM-REDOX",
    "exam": "JEE Main 2025 (Online) 23rd January Morning Shift",
    "year": "2025",
    "paper": "Diagnostic Hub",
    "questionNumber": "REDOX-Q08",
    "section": "FAM-CHEM-REDOX",
    "markingScheme": "+4 / -1",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Redox Reactions",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "SINGLE_CHOICE",
    "stem": "For the standard galvanic cell Zn(s) | Zn\u00b2\u207a(aq, 1M) || Cu\u00b2\u207a(aq, 1M) | Cu(s), given standard reduction potentials E\u00b0(Zn\u00b2\u207a/Zn) = -0.76 V and E\u00b0(Cu\u00b2\u207a/Cu) = +0.34 V, the standard Gibbs free energy change \u0394G\u00b0 for the cell reaction at 298 K is (Faraday constant F \u2248 96500 C/mol):",
    "options": [
      {
        "id": "opt-A",
        "text": "-212.3 kJ/mol"
      },
      {
        "id": "opt-B",
        "text": "+212.3 kJ/mol"
      },
      {
        "id": "opt-C",
        "text": "-106.1 kJ/mol"
      },
      {
        "id": "opt-D",
        "text": "-424.6 kJ/mol"
      }
    ],
    "hints": [
      "[METHOD] Step 1: Calculate standard EMF: E\u00b0_cell = E\u00b0(Cu\u00b2\u207a/Cu) - E\u00b0(Zn\u00b2\u207a/Zn) = +0.34 V - (-0.76 V) = +1.10 V.",
      "[METHOD] Step 2: Identify moles of electrons transferred: Zn(s) + Cu\u00b2\u207a(aq) \u2192 Zn\u00b2\u207a(aq) + Cu(s) \u21d2 n = 2 mol of electrons.",
      "[METHOD] Step 3: Relate EMF to Gibbs energy: \u0394G\u00b0 = -n F E\u00b0_cell."
    ],
    "steps": [
      "Step 1: Calculate standard EMF: E\u00b0_cell = E\u00b0(Cu\u00b2\u207a/Cu) - E\u00b0(Zn\u00b2\u207a/Zn) = +0.34 V - (-0.76 V) = +1.10 V.",
      "Step 2: Identify moles of electrons transferred: Zn(s) + Cu\u00b2\u207a(aq) \u2192 Zn\u00b2\u207a(aq) + Cu(s) \u21d2 n = 2 mol of electrons.",
      "Step 3: Relate EMF to Gibbs energy: \u0394G\u00b0 = -n F E\u00b0_cell.",
      "Step 4: Calculate numerical value: \u0394G\u00b0 = -2 \u00d7 96500 C/mol \u00d7 1.10 J/C = -212300 J/mol = -212.3 kJ/mol.",
      "Step 5: Negative \u0394G\u00b0 confirms the spontaneity of the galvanic cell under standard conditions."
    ],
    "limitingCheck": "Independent check: 2 \u00d7 96500 \u00d7 1.10 = 212300 J mol\u207b\u00b9, and E\u00b0cell > 0 requires \u0394G\u00b0 < 0 through \u0394G\u00b0 = -nFE\u00b0.",
    "check": "Independent check: 2 \u00d7 96500 \u00d7 1.10 = 212300 J mol\u207b\u00b9, and E\u00b0cell > 0 requires \u0394G\u00b0 < 0 through \u0394G\u00b0 = -nFE\u00b0.",
    "trapWarning": "Always remember the negative sign in \u0394G\u00b0 = -nFE\u00b0! A spontaneous cell with E\u00b0 > 0 must always have \u0394G\u00b0 < 0.",
    "correctKey": "opt-A",
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 4,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Chemistry)"
  },
  {
    "id": "REDOX-Q09",
    "code": "REDOX-Q09",
    "title": "JEE Main 2024 (Online) 1st February Morning Shift \u00b7 Diagnostic Hub \u00b7 QREDOX-Q09 \u00b7 Redox Reactions",
    "subjectCode": "CHEM",
    "subject": "Chemistry",
    "topicCode": "REDOX_REACTIONS",
    "topic": "Redox Reactions",
    "subtopic": "CAP-CHEM-REDOX",
    "exam": "JEE Main 2024 (Online) 1st February Morning Shift",
    "year": "2024",
    "paper": "Diagnostic Hub",
    "questionNumber": "REDOX-Q09",
    "section": "FAM-CHEM-REDOX",
    "markingScheme": "+4 / -1",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Redox Reactions",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "SINGLE_CHOICE",
    "stem": "The oxidation states of sulfur in Caro's acid (H\u2082SO\u2085) and Marshall's acid (H\u2082S\u2082O\u2088) respectively are:",
    "options": [
      {
        "id": "opt-A",
        "text": "+6 and +6"
      },
      {
        "id": "opt-B",
        "text": "+8 and +7"
      },
      {
        "id": "opt-C",
        "text": "+6 and +7"
      },
      {
        "id": "opt-D",
        "text": "+4 and +6"
      }
    ],
    "hints": [
      "[METHOD] Step 1: Inspect each acid for an O\u2013O peroxide linkage before assigning every oxygen as -2.",
      "[METHOD] Step 2: In H\u2082SO\u2085, three oxygens are assigned -2 and the two peroxide oxygens are -1: 2(+1) + x + 3(-2) + 2(-1) = 0, so S = +6.",
      "[METHOD] Step 3: In H\u2082S\u2082O\u2088, six oxygens are assigned -2 and the two peroxide oxygens are -1: 2(+1) + 2x + 6(-2) + 2(-1) = 0."
    ],
    "steps": [
      "Step 1: Inspect each acid for an O\u2013O peroxide linkage before assigning every oxygen as -2.",
      "Step 2: In H\u2082SO\u2085, three oxygens are assigned -2 and the two peroxide oxygens are -1: 2(+1) + x + 3(-2) + 2(-1) = 0, so S = +6.",
      "Step 3: In H\u2082S\u2082O\u2088, six oxygens are assigned -2 and the two peroxide oxygens are -1: 2(+1) + 2x + 6(-2) + 2(-1) = 0.",
      "Step 4: Solving gives 2x = 12, so each sulfur is +6.",
      "Step 5: The wrong +8 or +7 results come from applying O = -2 to the peroxide oxygens."
    ],
    "limitingCheck": "Independent check: H\u2082SO\u2085 gives +2 +6 -6 -2 = 0; H\u2082S\u2082O\u2088 gives +2 +12 -12 -2 = 0.",
    "check": "Independent check: H\u2082SO\u2085 gives +2 +6 -6 -2 = 0; H\u2082S\u2082O\u2088 gives +2 +12 -12 -2 = 0.",
    "trapWarning": "When an oxoacid contains an O\u2013O peroxide bond, the two peroxide oxygens are assigned -1. The structural exception\u2014not a valence-electron 'ceiling'\u2014is what fixes the calculation.",
    "correctKey": "opt-A",
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 4,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Chemistry)"
  },
  {
    "id": "REDOX-Q10",
    "code": "REDOX-Q10",
    "title": "JEE Main 2024 (Online) 29th January Evening Shift \u00b7 Diagnostic Hub \u00b7 QREDOX-Q10 \u00b7 Redox Reactions",
    "subjectCode": "CHEM",
    "subject": "Chemistry",
    "topicCode": "REDOX_REACTIONS",
    "topic": "Redox Reactions",
    "subtopic": "CAP-CHEM-REDOX",
    "exam": "JEE Main 2024 (Online) 29th January Evening Shift",
    "year": "2024",
    "paper": "Diagnostic Hub",
    "questionNumber": "REDOX-Q10",
    "section": "FAM-CHEM-REDOX",
    "markingScheme": "+4 / -1",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Redox Reactions",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "SINGLE_CHOICE",
    "stem": "In the brown ring complex [Fe(H\u2082O)\u2085(NO)]SO\u2084 formed during the nitrate ring test, the oxidation state of Iron and the magnetic moment (\u03bc) are:",
    "options": [
      {
        "id": "opt-A",
        "text": "+1 and 3.87 BM (3 unpaired electrons)"
      },
      {
        "id": "opt-B",
        "text": "+2 and 4.90 BM (4 unpaired electrons)"
      },
      {
        "id": "opt-C",
        "text": "+3 and 5.92 BM (5 unpaired electrons)"
      },
      {
        "id": "opt-D",
        "text": "+1 and 1.73 BM (1 unpaired electron)"
      }
    ],
    "hints": [
      "[METHOD] Step 1: The complex cation [Fe(H\u2082O)\u2085(NO)]\u00b2\u207a has overall charge +2; water is neutral.",
      "[METHOD] Step 2: In the conventional exam bookkeeping model, coordinated NO is treated as NO\u207a. Charge balance then gives x + (+1) = +2, so Fe is assigned +1.",
      "[METHOD] Step 3: The observed/formal {FeNO}\u2077 unit is a quartet (S = 3/2), corresponding to three unpaired electrons in the simple spin-only count."
    ],
    "steps": [
      "Step 1: The complex cation [Fe(H\u2082O)\u2085(NO)]\u00b2\u207a has overall charge +2; water is neutral.",
      "Step 2: In the conventional exam bookkeeping model, coordinated NO is treated as NO\u207a. Charge balance then gives x + (+1) = +2, so Fe is assigned +1.",
      "Step 3: The observed/formal {FeNO}\u2077 unit is a quartet (S = 3/2), corresponding to three unpaired electrons in the simple spin-only count.",
      "Step 4: \u03bc = \u221a[n(n+2)] = \u221a[3\u00d75] = \u221a15 \u2248 3.87 BM.",
      "Step 5: Advanced caveat: metal nitrosyls are non-innocent. Modern bonding descriptions often use Enemark\u2013Feltham {FeNO}\u2077 notation rather than claiming a unique localized Fe(I)/NO\u207a electron distribution."
    ],
    "limitingCheck": "Independent check under the stated JEE convention: Fe(+1) + NO(+1) gives the +2 complex charge, while n = 3 unpaired electrons gives \u221a15 \u2248 3.87 BM.",
    "check": "Independent check under the stated JEE convention: Fe(+1) + NO(+1) gives the +2 complex charge, while n = 3 unpaired electrons gives \u221a15 \u2248 3.87 BM.",
    "trapWarning": "Do not claim that the magnetic moment uniquely proves a literal Fe(I)\u2013NO\u207a charge distribution. The +1 answer is the conventional exam formalism; the Fe\u2013NO unit is electronically non-innocent.",
    "correctKey": "opt-A",
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 4,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Chemistry)"
  },
  {
    "id": "REDOX-Q11",
    "code": "REDOX-Q11",
    "title": "JEE Main 2023 (Online) 13th April Morning Shift \u00b7 Diagnostic Hub \u00b7 QREDOX-Q11 \u00b7 Redox Reactions",
    "subjectCode": "CHEM",
    "subject": "Chemistry",
    "topicCode": "REDOX_REACTIONS",
    "topic": "Redox Reactions",
    "subtopic": "CAP-CHEM-REDOX",
    "exam": "JEE Main 2023 (Online) 13th April Morning Shift",
    "year": "2023",
    "paper": "Diagnostic Hub",
    "questionNumber": "REDOX-Q11",
    "section": "FAM-CHEM-REDOX",
    "markingScheme": "+4 / -1",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Redox Reactions",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "SINGLE_CHOICE",
    "stem": "When ferrous oxalate (FeC\u2082O\u2084) is oxidized completely by acidic KMnO\u2084 to Fe\u00b3\u207a and CO\u2082, the n-factor of FeC\u2082O\u2084 is:",
    "options": [
      {
        "id": "opt-A",
        "text": "3"
      },
      {
        "id": "opt-B",
        "text": "2"
      },
      {
        "id": "opt-C",
        "text": "1"
      },
      {
        "id": "opt-D",
        "text": "5"
      }
    ],
    "hints": [
      "[METHOD] Step 1: In FeC\u2082O\u2084, BOTH the cation (Fe\u00b2\u207a) and the anion (C\u2082O\u2084\u00b2\u207b) undergo oxidation!",
      "[METHOD] Step 2: Oxidation of iron: Fe\u00b2\u207a \u2192 Fe\u00b3\u207a + 1 e\u207b (Change in O.S. = 3 - 2 = 1, e\u207b lost = 1).",
      "[METHOD] Step 3: Oxidation of oxalate: C\u2082O\u2084\u00b2\u207b \u2192 2 CO\u2082 + 2 e\u207b (Carbon goes from +3 to +4, 2 atoms \u00d7 1 = 2 e\u207b lost)."
    ],
    "steps": [
      "Step 1: In FeC\u2082O\u2084, BOTH the cation (Fe\u00b2\u207a) and the anion (C\u2082O\u2084\u00b2\u207b) undergo oxidation!",
      "Step 2: Oxidation of iron: Fe\u00b2\u207a \u2192 Fe\u00b3\u207a + 1 e\u207b (Change in O.S. = 3 - 2 = 1, e\u207b lost = 1).",
      "Step 3: Oxidation of oxalate: C\u2082O\u2084\u00b2\u207b \u2192 2 CO\u2082 + 2 e\u207b (Carbon goes from +3 to +4, 2 atoms \u00d7 1 = 2 e\u207b lost).",
      "Step 4: Total electrons lost per formula unit of FeC\u2082O\u2084 = 1 + 2 = 3 electrons.",
      "Step 5: Therefore, n-factor of FeC\u2082O\u2084 = 3. (1 mole of FeC\u2082O\u2084 reacts with 3/5 mole of KMnO\u2084 in acid)."
    ],
    "limitingCheck": "Independent check: Fe\u00b2\u207a loses 1 e\u207b and C\u2082O\u2084\u00b2\u207b loses 2 e\u207b, so the formula unit loses 3 e\u207b in total.",
    "check": "Independent check: Fe\u00b2\u207a loses 1 e\u207b and C\u2082O\u2084\u00b2\u207b loses 2 e\u207b, so the formula unit loses 3 e\u207b in total.",
    "trapWarning": "DUAL OXIDATION TRAP: Students count only the oxalate ion (n=2) or only the iron ion (n=1); because BOTH are oxidized, their n-factors ADD together (1 + 2 = 3)!",
    "correctKey": "opt-A",
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 4,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Chemistry)"
  },
  {
    "id": "REDOX-Q12",
    "code": "REDOX-Q12",
    "title": "JEE Main 2023 (Online) 25th January Morning Shift \u00b7 Diagnostic Hub \u00b7 QREDOX-Q12 \u00b7 Redox Reactions",
    "subjectCode": "CHEM",
    "subject": "Chemistry",
    "topicCode": "REDOX_REACTIONS",
    "topic": "Redox Reactions",
    "subtopic": "CAP-CHEM-REDOX",
    "exam": "JEE Main 2023 (Online) 25th January Morning Shift",
    "year": "2023",
    "paper": "Diagnostic Hub",
    "questionNumber": "REDOX-Q12",
    "section": "FAM-CHEM-REDOX",
    "markingScheme": "+4 / -1",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Redox Reactions",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "SINGLE_CHOICE",
    "stem": "Bleaching powder (CaOCl\u2082) contains two chlorine atoms. Their individual oxidation states are:",
    "options": [
      {
        "id": "opt-A",
        "text": "-1 and +1"
      },
      {
        "id": "opt-B",
        "text": "0 and 0"
      },
      {
        "id": "opt-C",
        "text": "-1 and -1"
      },
      {
        "id": "opt-D",
        "text": "+1 and +1"
      }
    ],
    "hints": [
      "[METHOD] Step 1: Use the textbook/JEE representation Ca(OCl)Cl for bleaching powder; real commercial bleaching powder can have more complex composition.",
      "[METHOD] Step 2: The chloride component is Cl\u207b, so that chlorine is -1.",
      "[METHOD] Step 3: In hypochlorite OCl\u207b, oxygen is -2 and x + (-2) = -1, giving chlorine +1."
    ],
    "steps": [
      "Step 1: Use the textbook/JEE representation Ca(OCl)Cl for bleaching powder; real commercial bleaching powder can have more complex composition.",
      "Step 2: The chloride component is Cl\u207b, so that chlorine is -1.",
      "Step 3: In hypochlorite OCl\u207b, oxygen is -2 and x + (-2) = -1, giving chlorine +1.",
      "Step 4: Therefore the two formal chlorine oxidation states in the model are -1 and +1.",
      "Step 5: Their arithmetic average is 0, but the question asks for the distinct species represented in the structural model."
    ],
    "limitingCheck": "Independent check: Ca\u00b2\u207a + Cl\u207b + OCl\u207b is charge-neutral, and the OCl\u207b assignment (+1) + (-2) = -1.",
    "check": "Independent check: Ca\u00b2\u207a + Cl\u207b + OCl\u207b is charge-neutral, and the OCl\u207b assignment (+1) + (-2) = -1.",
    "trapWarning": "Do not report only the average value 0 when the textbook model explicitly contains chloride and hypochlorite chlorine in different environments.",
    "correctKey": "opt-A",
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 4,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Chemistry)"
  },
  {
    "id": "REDOX-Q13",
    "code": "REDOX-Q13",
    "title": "JEE Main 2022 (Online) 27th July Evening Shift \u00b7 Diagnostic Hub \u00b7 QREDOX-Q13 \u00b7 Redox Reactions",
    "subjectCode": "CHEM",
    "subject": "Chemistry",
    "topicCode": "REDOX_REACTIONS",
    "topic": "Redox Reactions",
    "subtopic": "CAP-CHEM-REDOX",
    "exam": "JEE Main 2022 (Online) 27th July Evening Shift",
    "year": "2022",
    "paper": "Diagnostic Hub",
    "questionNumber": "REDOX-Q13",
    "section": "FAM-CHEM-REDOX",
    "markingScheme": "+4 / -1",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Redox Reactions",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "SINGLE_CHOICE",
    "stem": "The equivalent weight of potassium permanganate (KMnO\u2084, molecular mass M) in acidic, neutral/faintly alkaline, and strongly basic media respectively is:",
    "options": [
      {
        "id": "opt-A",
        "text": "M/5,  M/3,  M/1"
      },
      {
        "id": "opt-B",
        "text": "M/5,  M/1,  M/3"
      },
      {
        "id": "opt-C",
        "text": "M/3,  M/5,  M/1"
      },
      {
        "id": "opt-D",
        "text": "M/5,  M/5,  M/5"
      }
    ],
    "hints": [
      "[METHOD] Step 1: Acidic Medium: MnO\u2084\u207b + 8 H\u207a + 5 e\u207b \u2192 Mn\u00b2\u207a + 4 H\u2082O. Mn(+7 \u2192 +2), \u0394(O.S.) = 5 \u21d2 n = 5 \u21d2 Eq Wt = M/5.",
      "[METHOD] Step 2: Neutral / Faintly Alkaline (Bayer's reagent): MnO\u2084\u207b + 2 H\u2082O + 3 e\u207b \u2192 MnO\u2082 + 4 OH\u207b. Mn(+7 \u2192 +4), \u0394(O.S.) = 3 \u21d2 n = 3 \u21d2 Eq Wt = M/3.",
      "[METHOD] Step 3: Strongly Basic Medium: MnO\u2084\u207b + e\u207b \u2192 MnO\u2084\u00b2\u207b (manganate ion). Mn(+7 \u2192 +6), \u0394(O.S.) = 1 \u21d2 n = 1 \u21d2 Eq Wt = M/1."
    ],
    "steps": [
      "Step 1: Acidic Medium: MnO\u2084\u207b + 8 H\u207a + 5 e\u207b \u2192 Mn\u00b2\u207a + 4 H\u2082O. Mn(+7 \u2192 +2), \u0394(O.S.) = 5 \u21d2 n = 5 \u21d2 Eq Wt = M/5.",
      "Step 2: Neutral / Faintly Alkaline (Bayer's reagent): MnO\u2084\u207b + 2 H\u2082O + 3 e\u207b \u2192 MnO\u2082 + 4 OH\u207b. Mn(+7 \u2192 +4), \u0394(O.S.) = 3 \u21d2 n = 3 \u21d2 Eq Wt = M/3.",
      "Step 3: Strongly Basic Medium: MnO\u2084\u207b + e\u207b \u2192 MnO\u2084\u00b2\u207b (manganate ion). Mn(+7 \u2192 +6), \u0394(O.S.) = 1 \u21d2 n = 1 \u21d2 Eq Wt = M/1.",
      "Step 4: Compiling equivalent weights: Acidic = M/5, Neutral = M/3, Strongly basic = M/1."
    ],
    "limitingCheck": "Independent check: M/5, M/3 and M/1 follow directly from 5, 3 and 1 electrons accepted per permanganate in the three stated media.",
    "check": "Independent check: M/5, M/3 and M/1 follow directly from 5, 3 and 1 electrons accepted per permanganate in the three stated media.",
    "trapWarning": "Remember the mnemonic 'BAN 153': Basic n=1, Acidic n=5, Neutral n=3!",
    "correctKey": "opt-A",
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 4,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Chemistry)"
  },
  {
    "id": "REDOX-Q14",
    "code": "REDOX-Q14",
    "title": "JEE Main 2022 (Online) 26th June Evening Shift \u00b7 Diagnostic Hub \u00b7 QREDOX-Q14 \u00b7 Redox Reactions",
    "subjectCode": "CHEM",
    "subject": "Chemistry",
    "topicCode": "REDOX_REACTIONS",
    "topic": "Redox Reactions",
    "subtopic": "CAP-CHEM-REDOX",
    "exam": "JEE Main 2022 (Online) 26th June Evening Shift",
    "year": "2022",
    "paper": "Diagnostic Hub",
    "questionNumber": "REDOX-Q14",
    "section": "FAM-CHEM-REDOX",
    "markingScheme": "+4 / -1",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Redox Reactions",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "CLASSIFY",
    "kind": "SINGLE_CHOICE",
    "stem": "In the disproportionation reaction of white phosphorus with alkali: P\u2084 + 3 OH\u207b + 3 H\u2082O \u2192 PH\u2083 + 3 H\u2082PO\u2082\u207b, the n-factor of P\u2084 is:",
    "options": [
      {
        "id": "opt-A",
        "text": "3"
      },
      {
        "id": "opt-B",
        "text": "4"
      },
      {
        "id": "opt-C",
        "text": "12"
      },
      {
        "id": "opt-D",
        "text": "6"
      }
    ],
    "hints": [
      "[METHOD] Step 1: Determine oxidation state changes from P\u2084 (O.S. = 0):",
      "[METHOD] Reduction: P\u2084 \u2192 PH\u2083 (P is -3). Change per P atom = 3.",
      "[METHOD] Oxidation: P\u2084 \u2192 H\u2082PO\u2082\u207b (P is +1). Change per P atom = 1."
    ],
    "steps": [
      "Step 1: Determine oxidation state changes from P\u2084 (O.S. = 0):",
      "        Reduction: P\u2084 \u2192 PH\u2083 (P is -3). Change per P atom = 3.",
      "        Oxidation: P\u2084 \u2192 H\u2082PO\u2082\u207b (P is +1). Change per P atom = 1.",
      "Step 2: In the balanced equation: 1 mole of P\u2084 produces 1 mole of PH\u2083 and 3 moles of H\u2082PO\u2082\u207b.",
      "Step 3: Reduction half-reaction: 1 P atom gains 3 electrons \u21d2 Total electrons gained = 3 e\u207b.",
      "Step 4: Oxidation half-reaction: 3 P atoms each lose 1 electron \u21d2 Total electrons lost = 3 e\u207b.",
      "Step 5: The total number of electrons transferred per formula unit of P\u2084 is exactly 3.",
      "Step 6: Therefore, the n-factor of P\u2084 = 3 (Equivalent weight = M / 3)."
    ],
    "limitingCheck": "Independent check: 3 e\u207b are lost by three P atoms and 3 e\u207b are gained by the one reduced P atom, so n(P\u2084) = 3.",
    "check": "Independent check: 3 e\u207b are lost by three P atoms and 3 e\u207b are gained by the one reduced P atom, so n(P\u2084) = 3.",
    "trapWarning": "Do not multiply 4 atoms \u00d7 3 = 12! Only 1 of the 4 phosphorus atoms is reduced (gaining 3 e\u207b), while the other 3 are oxidized (each losing 1 e\u207b, total 3 e\u207b). The net exchange per P\u2084 is 3 electrons!",
    "correctKey": "opt-A",
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 4,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Chemistry)"
  },
  {
    "id": "REDOX-Q15",
    "code": "REDOX-Q15",
    "title": "JEE Main 2021 (Online) 24th February Evening Shift \u00b7 Diagnostic Hub \u00b7 QREDOX-Q15 \u00b7 Redox Reactions",
    "subjectCode": "CHEM",
    "subject": "Chemistry",
    "topicCode": "REDOX_REACTIONS",
    "topic": "Redox Reactions",
    "subtopic": "CAP-CHEM-REDOX",
    "exam": "JEE Main 2021 (Online) 24th February Evening Shift",
    "year": "2021",
    "paper": "Diagnostic Hub",
    "questionNumber": "REDOX-Q15",
    "section": "FAM-CHEM-REDOX",
    "markingScheme": "+4 / -1",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Redox Reactions",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "SINGLE_CHOICE",
    "stem": "When iodide (I\u207b) is oxidized by permanganate (MnO\u2084\u207b) in faint alkaline medium, it forms iodate (IO\u2083\u207b) and manganese dioxide (MnO\u2082). The stoichiometric ratio of MnO\u2084\u207b to I\u207b in the balanced equation is:",
    "options": [
      {
        "id": "opt-A",
        "text": "2 : 1"
      },
      {
        "id": "opt-B",
        "text": "1 : 2"
      },
      {
        "id": "opt-C",
        "text": "5 : 1"
      },
      {
        "id": "opt-D",
        "text": "2 : 5"
      }
    ],
    "hints": [
      "[METHOD] Step 1: Reduction half-reaction in alkaline medium: MnO\u2084\u207b (+7) + 2 H\u2082O + 3 e\u207b \u2192 MnO\u2082 (+4) + 4 OH\u207b (gains 3 e\u207b).",
      "[METHOD] Step 2: Oxidation half-reaction: I\u207b (-1) + 6 OH\u207b \u2192 IO\u2083\u207b (+5) + 3 H\u2082O + 6 e\u207b (loses 6 e\u207b).",
      "[METHOD] Step 3: Equalize electron transfer: Multiply reduction half by 2 so it consumes 2 \u00d7 3 = 6 e\u207b."
    ],
    "steps": [
      "Step 1: Reduction half-reaction in alkaline medium: MnO\u2084\u207b (+7) + 2 H\u2082O + 3 e\u207b \u2192 MnO\u2082 (+4) + 4 OH\u207b (gains 3 e\u207b).",
      "Step 2: Oxidation half-reaction: I\u207b (-1) + 6 OH\u207b \u2192 IO\u2083\u207b (+5) + 3 H\u2082O + 6 e\u207b (loses 6 e\u207b).",
      "Step 3: Equalize electron transfer: Multiply reduction half by 2 so it consumes 2 \u00d7 3 = 6 e\u207b.",
      "Step 4: Balanced net ionic equation:",
      "        2 MnO\u2084\u207b + I\u207b + H\u2082O \u2192 2 MnO\u2082 + IO\u2083\u207b + 2 OH\u207b.",
      "Step 5: The stoichiometric ratio of MnO\u2084\u207b to I\u207b is 2 : 1."
    ],
    "limitingCheck": "Independent check: 2MnO\u2084\u207b + I\u207b + H\u2082O \u2192 2MnO\u2082 + IO\u2083\u207b + 2OH\u207b has equal atoms and net charge -3 on both sides.",
    "check": "Independent check: 2MnO\u2084\u207b + I\u207b + H\u2082O \u2192 2MnO\u2082 + IO\u2083\u207b + 2OH\u207b has equal atoms and net charge -3 on both sides.",
    "trapWarning": "MEDIUM TRAP: In ACIDIC medium, I\u207b oxidizes to I\u2082 (ratio 2:10 = 1:5). But in FAINTLY ALKALINE medium, I\u207b oxidizes all the way to IO\u2083\u207b (ratio 2:1)!",
    "correctKey": "opt-A",
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 4,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Chemistry)"
  },
  {
    "id": "REDOX-Q16",
    "code": "REDOX-Q16",
    "title": "JEE Main 2021 (Online) 25th July Morning Shift \u00b7 Diagnostic Hub \u00b7 QREDOX-Q16 \u00b7 Redox Reactions",
    "subjectCode": "CHEM",
    "subject": "Chemistry",
    "topicCode": "REDOX_REACTIONS",
    "topic": "Redox Reactions",
    "subtopic": "CAP-CHEM-REDOX",
    "exam": "JEE Main 2021 (Online) 25th July Morning Shift",
    "year": "2021",
    "paper": "Diagnostic Hub",
    "questionNumber": "REDOX-Q16",
    "section": "FAM-CHEM-REDOX",
    "markingScheme": "+4 / -1",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Redox Reactions",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "SINGLE_CHOICE",
    "stem": "Given standard reduction potentials: E\u00b0(Zn\u00b2\u207a/Zn) = -0.76 V and E\u00b0(Fe\u00b2\u207a/Fe) = -0.44 V. The standard EMF of the galvanic cell Zn | Zn\u00b2\u207a || Fe\u00b2\u207a | Fe and the spontaneity of the forward reaction are:",
    "options": [
      {
        "id": "opt-A",
        "text": "+0.32 V and Spontaneous"
      },
      {
        "id": "opt-B",
        "text": "-0.32 V and Non-spontaneous"
      },
      {
        "id": "opt-C",
        "text": "+1.20 V and Spontaneous"
      },
      {
        "id": "opt-D",
        "text": "-1.20 V and Non-spontaneous"
      }
    ],
    "hints": [
      "[METHOD] Step 1: Identify cathode and anode from cell notation Zn | Zn\u00b2\u207a || Fe\u00b2\u207a | Fe:",
      "[METHOD] Anode (oxidation, left): Zn \u2192 Zn\u00b2\u207a + 2e\u207b.",
      "[METHOD] Cathode (reduction, right): Fe\u00b2\u207a + 2e\u207b \u2192 Fe."
    ],
    "steps": [
      "Step 1: Identify cathode and anode from cell notation Zn | Zn\u00b2\u207a || Fe\u00b2\u207a | Fe:",
      "        Anode (oxidation, left): Zn \u2192 Zn\u00b2\u207a + 2e\u207b.",
      "        Cathode (reduction, right): Fe\u00b2\u207a + 2e\u207b \u2192 Fe.",
      "Step 2: Calculate standard EMF: E\u00b0_cell = E\u00b0_cathode - E\u00b0_anode = E\u00b0(Fe\u00b2\u207a/Fe) - E\u00b0(Zn\u00b2\u207a/Zn).",
      "Step 3: Substitute values: E\u00b0_cell = (-0.44 V) - (-0.76 V) = -0.44 + 0.76 = +0.32 V.",
      "Step 4: Since E\u00b0_cell > 0, \u0394G\u00b0 = -nFE\u00b0 < 0, meaning the cell reaction Zn + Fe\u00b2\u207a \u2192 Zn\u00b2\u207a + Fe is thermodynamically spontaneous."
    ],
    "limitingCheck": "Independent check: (-0.44) - (-0.76) = +0.32 V; a positive standard cell potential gives negative \u0394G\u00b0 for the written forward reaction.",
    "check": "Independent check: (-0.44) - (-0.76) = +0.32 V; a positive standard cell potential gives negative \u0394G\u00b0 for the written forward reaction.",
    "trapWarning": "SIGN TRAP: Always subtract the anode potential: E\u00b0_cathode - E\u00b0_anode = (-0.44) - (-0.76) = +0.32 V, not -1.20 V!",
    "correctKey": "opt-A",
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 4,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Chemistry)"
  },
  {
    "id": "REDOX-Q17",
    "code": "REDOX-Q17",
    "title": "JEE Main 2020 (Online) 6th September Evening Shift \u00b7 Diagnostic Hub \u00b7 QREDOX-Q17 \u00b7 Redox Reactions",
    "subjectCode": "CHEM",
    "subject": "Chemistry",
    "topicCode": "REDOX_REACTIONS",
    "topic": "Redox Reactions",
    "subtopic": "CAP-CHEM-REDOX",
    "exam": "JEE Main 2020 (Online) 6th September Evening Shift",
    "year": "2020",
    "paper": "Diagnostic Hub",
    "questionNumber": "REDOX-Q17",
    "section": "FAM-CHEM-REDOX",
    "markingScheme": "+4 / -1",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Redox Reactions",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "SINGLE_CHOICE",
    "stem": "The individual oxidation states of the two nitrogen atoms in ammonium nitrate (NH\u2084NO\u2083) are:",
    "options": [
      {
        "id": "opt-A",
        "text": "-3 and +5"
      },
      {
        "id": "opt-B",
        "text": "+1 and +1"
      },
      {
        "id": "opt-C",
        "text": "-3 and +3"
      },
      {
        "id": "opt-D",
        "text": "0 and +2"
      }
    ],
    "hints": [
      "[METHOD] Step 1: Treat NH\u2084NO\u2083 as the ionic compound NH\u2084\u207a + NO\u2083\u207b.",
      "[METHOD] Step 2: In NH\u2084\u207a: x + 4(+1) = +1, so N = -3.",
      "[METHOD] Step 3: In NO\u2083\u207b: y + 3(-2) = -1, so N = +5."
    ],
    "steps": [
      "Step 1: Treat NH\u2084NO\u2083 as the ionic compound NH\u2084\u207a + NO\u2083\u207b.",
      "Step 2: In NH\u2084\u207a: x + 4(+1) = +1, so N = -3.",
      "Step 3: In NO\u2083\u207b: y + 3(-2) = -1, so N = +5.",
      "Step 4: Applying one average value to the empirical formula would give +1, but that average hides the two chemically distinct nitrogen environments.",
      "Step 5: Oxidation states are formal bookkeeping assignments, not literal measured charges on the nitrogen atoms."
    ],
    "limitingCheck": "Independent check: (-3) + 4(+1) = +1 for NH\u2084\u207a and (+5) + 3(-2) = -1 for NO\u2083\u207b.",
    "check": "Independent check: (-3) + 4(+1) = +1 for NH\u2084\u207a and (+5) + 3(-2) = -1 for NO\u2083\u207b.",
    "trapWarning": "Do not average across chemically distinct polyatomic ions when the question asks for the individual formal oxidation states.",
    "correctKey": "opt-A",
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 4,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Chemistry)"
  },
  {
    "id": "REDOX-Q18",
    "code": "REDOX-Q18",
    "title": "JEE Main 2020 (Online) 3rd September Morning Shift \u00b7 Diagnostic Hub \u00b7 QREDOX-Q18 \u00b7 Redox Reactions",
    "subjectCode": "CHEM",
    "subject": "Chemistry",
    "topicCode": "REDOX_REACTIONS",
    "topic": "Redox Reactions",
    "subtopic": "CAP-CHEM-REDOX",
    "exam": "JEE Main 2020 (Online) 3rd September Morning Shift",
    "year": "2020",
    "paper": "Diagnostic Hub",
    "questionNumber": "REDOX-Q18",
    "section": "FAM-CHEM-REDOX",
    "markingScheme": "+4 / -1",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Redox Reactions",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "SINGLE_CHOICE",
    "stem": "The volume of 0.1 M Na\u2082S\u2082O\u2083 (hypo) required to titrate the iodine liberated by adding excess KI to 25.0 mL of 0.02 M K\u2082Cr\u2082O\u2087 in acidic solution is:",
    "options": [
      {
        "id": "opt-A",
        "text": "30.0 mL"
      },
      {
        "id": "opt-B",
        "text": "15.0 mL"
      },
      {
        "id": "opt-C",
        "text": "10.0 mL"
      },
      {
        "id": "opt-D",
        "text": "5.0 mL"
      }
    ],
    "hints": [
      "[METHOD] Step 1: In acid, one dichromate ion accepts 6 e\u207b, so 0.02 M K\u2082Cr\u2082O\u2087 corresponds to 0.12 equivalents per litre.",
      "[METHOD] Step 2: 25.0 mL contains 0.12 \u00d7 25.0 = 3.0 milliequivalents of oxidizing capacity.",
      "[METHOD] Step 3: Iodine carries the same electron-equivalent amount into the thiosulfate titration."
    ],
    "steps": [
      "Step 1: In acid, one dichromate ion accepts 6 e\u207b, so 0.02 M K\u2082Cr\u2082O\u2087 corresponds to 0.12 equivalents per litre.",
      "Step 2: 25.0 mL contains 0.12 \u00d7 25.0 = 3.0 milliequivalents of oxidizing capacity.",
      "Step 3: Iodine carries the same electron-equivalent amount into the thiosulfate titration.",
      "Step 4: The titration half-reaction is 2S\u2082O\u2083\u00b2\u207b \u2192 S\u2084O\u2086\u00b2\u207b + 2e\u207b, so thiosulfate has n-factor 1 in this reaction and 0.1 M = 0.1 N.",
      "Step 5: 0.1 N \u00d7 V = 3.0 meq, so V = 30.0 mL."
    ],
    "limitingCheck": "Independent check by moles: 0.0005 mol dichromate accepts 0.003 mol e\u207b; 0.030 L \u00d7 0.1 mol/L = 0.003 mol thiosulfate transfers the same electron amount.",
    "check": "Independent check by moles: 0.0005 mol dichromate accepts 0.003 mol e\u207b; 0.030 L \u00d7 0.1 mol/L = 0.003 mol thiosulfate transfers the same electron amount.",
    "trapWarning": "Track electron equivalents through both redox stages. Do not infer the thiosulfate n-factor from a misleading average sulfur oxidation number.",
    "correctKey": "opt-A",
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 4,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Chemistry)"
  },
  {
    "id": "REDOX-Q19",
    "code": "REDOX-Q19",
    "title": "JEE Main 2019 (Online) 10th January Evening Shift \u00b7 Diagnostic Hub \u00b7 QREDOX-Q19 \u00b7 Redox Reactions",
    "subjectCode": "CHEM",
    "subject": "Chemistry",
    "topicCode": "REDOX_REACTIONS",
    "topic": "Redox Reactions",
    "subtopic": "CAP-CHEM-REDOX",
    "exam": "JEE Main 2019 (Online) 10th January Evening Shift",
    "year": "2019",
    "paper": "Diagnostic Hub",
    "questionNumber": "REDOX-Q19",
    "section": "FAM-CHEM-REDOX",
    "markingScheme": "+4 / -1",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Redox Reactions",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "SINGLE_CHOICE",
    "stem": "For the Daniell cell Zn(s) | Zn\u00b2\u207a(aq) || Cu\u00b2\u207a(aq) | Cu(s), if the concentration of Zn\u00b2\u207a is increased by a factor of 10 while keeping [Cu\u00b2\u207a] constant at 298 K, the cell potential E_cell will:",
    "options": [
      {
        "id": "opt-D",
        "text": "Decrease by 0.0295 V"
      },
      {
        "id": "opt-B",
        "text": "Increase by 0.0295 V"
      },
      {
        "id": "opt-D",
        "text": "Decrease by 0.0591 V"
      },
      {
        "id": "opt-D",
        "text": "Increase by 0.0591 V"
      }
    ],
    "hints": [
      "[METHOD] Step 1: Write overall cell reaction: Zn(s) + Cu\u00b2\u207a(aq) \u2192 Zn\u00b2\u207a(aq) + Cu(s), where n = 2 electrons transferred.",
      "[METHOD] Step 2: Nernst equation at 298 K: E_cell = E\u00b0_cell - (0.0591 / 2) log Q = E\u00b0_cell - 0.02955 log([Zn\u00b2\u207a] / [Cu\u00b2\u207a]).",
      "[METHOD] Step 3: When [Zn\u00b2\u207a] increases by 10 times: \u0394(log Q) = log(10) = 1."
    ],
    "steps": [
      "Step 1: Write overall cell reaction: Zn(s) + Cu\u00b2\u207a(aq) \u2192 Zn\u00b2\u207a(aq) + Cu(s), where n = 2 electrons transferred.",
      "Step 2: Nernst equation at 298 K: E_cell = E\u00b0_cell - (0.0591 / 2) log Q = E\u00b0_cell - 0.02955 log([Zn\u00b2\u207a] / [Cu\u00b2\u207a]).",
      "Step 3: When [Zn\u00b2\u207a] increases by 10 times: \u0394(log Q) = log(10) = 1.",
      "Step 4: Change in EMF: \u0394E = -0.02955 \u00d7 1 = -0.02955 V \u2248 -0.0295 V.",
      "Step 5: Therefore, the cell potential decreases by 0.0295 V."
    ],
    "limitingCheck": "Independent check: multiplying [Zn\u00b2\u207a] by 10 increases log Q by 1, so \u0394E = -(0.0591/2) = -0.02955 V.",
    "check": "Independent check: multiplying [Zn\u00b2\u207a] by 10 increases log Q by 1, so \u0394E = -(0.0591/2) = -0.02955 V.",
    "trapWarning": "Notice that Zn\u00b2\u207a is the OXIDIZED product on the right side of the reaction! Increasing product concentration shifts equilibrium backward (Le Chatelier) and reduces EMF by 0.0591 / n = 0.0295 V.",
    "correctKey": "opt-D",
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 4,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Chemistry)"
  },
  {
    "id": "REDOX-Q20",
    "code": "REDOX-Q20",
    "title": "JEE Main 2018 (Offline) 8th April Shift \u00b7 Diagnostic Hub \u00b7 QREDOX-Q20 \u00b7 Redox Reactions",
    "subjectCode": "CHEM",
    "subject": "Chemistry",
    "topicCode": "REDOX_REACTIONS",
    "topic": "Redox Reactions",
    "subtopic": "CAP-CHEM-REDOX",
    "exam": "JEE Main 2018 (Offline) 8th April Shift",
    "year": "2018",
    "paper": "Diagnostic Hub",
    "questionNumber": "REDOX-Q20",
    "section": "FAM-CHEM-REDOX",
    "markingScheme": "+4 / -1",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Redox Reactions",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "SINGLE_CHOICE",
    "stem": "Red lead (minium, Pb\u2083O\u2084) is a mixed oxide. The individual oxidation states of lead and their stoichiometric ratio are:",
    "options": [
      {
        "id": "opt-A",
        "text": "Two Pb in +2 and one Pb in +4 (Ratio 2:1)"
      },
      {
        "id": "opt-A",
        "text": "All three Pb in +8/3"
      },
      {
        "id": "opt-C",
        "text": "One Pb in +2 and two Pb in +3 (Ratio 1:2)"
      },
      {
        "id": "opt-D",
        "text": "Two Pb in +3 and one Pb in +2 (Ratio 2:1)"
      }
    ],
    "hints": [
      "[METHOD] Step 1: Formula algebra gives the average lead oxidation number +8/3 because 3x + 4(-2) = 0.",
      "[METHOD] Step 2: Red lead is conventionally represented as the mixed-valence oxide 2PbO\u00b7PbO\u2082.",
      "[METHOD] Step 3: That formal description contains two Pb(II) and one Pb(IV) per Pb\u2083O\u2084 formula unit."
    ],
    "steps": [
      "Step 1: Formula algebra gives the average lead oxidation number +8/3 because 3x + 4(-2) = 0.",
      "Step 2: Red lead is conventionally represented as the mixed-valence oxide 2PbO\u00b7PbO\u2082.",
      "Step 3: That formal description contains two Pb(II) and one Pb(IV) per Pb\u2083O\u2084 formula unit.",
      "Step 4: Average check: [2 + 2 + 4]/3 = 8/3.",
      "Step 5: Dilute nitric acid dissolves the PbO component while PbO\u2082 remains, supporting the mixed-oxide chemical description."
    ],
    "limitingCheck": "Independent check: 2(+2) + (+4) + 4(-2) = 0, so the mixed-valence assignment exactly balances Pb\u2083O\u2084.",
    "check": "Independent check: 2(+2) + (+4) + 4(-2) = 0, so the mixed-valence assignment exactly balances Pb\u2083O\u2084.",
    "trapWarning": "The +8/3 value is the formula-average oxidation number. For this mixed oxide, the requested formal description is two Pb(II) and one Pb(IV); do not describe oxidation state as literal atomic charge.",
    "correctKey": "opt-A",
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 4,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Chemistry)"
  },
  {
    "id": "CHEM02-Q01",
    "code": "CHEM02-Q01",
    "title": "JEE Main 2026 (Online) 6th April Morning Shift \u00b7 Diagnostic Hub \u00b7 QCHEM02-Q01 \u00b7 Mole Concept",
    "subjectCode": "CHEM",
    "subject": "Chemistry",
    "topicCode": "MOLE_CONCEPT",
    "topic": "Mole Concept",
    "subtopic": "CAP-CHEM-MOLE",
    "exam": "JEE Main 2026 (Online) 6th April Morning Shift",
    "year": "2026",
    "paper": "Diagnostic Hub",
    "questionNumber": "CHEM02-Q01",
    "section": "FAM-CHEM-MOLE",
    "markingScheme": "+4 / -1",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Mole Concept",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "SINGLE_CHOICE",
    "stem": "56 g of N\u2082 gas and 10 g of H\u2082 gas are mixed to produce NH\u2083 gas via the Haber process: N\u2082(g) + 3H\u2082(g) \u2192 2NH\u2083(g). If the reaction proceeds to completion, the mass of NH\u2083 produced and the mass of the excess reactant remaining unreacted are respectively:",
    "options": [
      {
        "id": "opt-A",
        "text": "56.7 g NH\u2083, 9.3 g N\u2082 remaining"
      },
      {
        "id": "opt-B",
        "text": "56.7 g NH\u2083, 2.0 g N\u2082 remaining"
      },
      {
        "id": "opt-C",
        "text": "51.0 g NH\u2083, 2.0 g N\u2082 remaining"
      },
      {
        "id": "opt-D",
        "text": "56.7 g NH\u2083, 0.67 g H\u2082 remaining"
      }
    ],
    "hints": [
      "[METHOD] Step 1: Calculate moles of initial reactants: n(N\u2082) = 56 g / 28 g/mol = 2.00 mol. n(H\u2082) = 10 g / 2 g/mol = 5.00 mol.",
      "[METHOD] Step 2: Compare molar stoichiometric ratios: Required H\u2082 for 2.00 mol N\u2082 is 2.00 \u00d7 3 = 6.00 mol. But we only have 5.00 mol H\u2082. Therefore, H\u2082 is the Limiting Reagent (LR).",
      "[METHOD] Step 3: Moles of NH\u2083 produced based on LR (H\u2082): n(NH\u2083) = 5.00 \u00d7 (2/3) = 3.333 mol."
    ],
    "steps": [
      "Step 1: Calculate moles of initial reactants: n(N\u2082) = 56 g / 28 g/mol = 2.00 mol. n(H\u2082) = 10 g / 2 g/mol = 5.00 mol.",
      "Step 2: Compare molar stoichiometric ratios: Required H\u2082 for 2.00 mol N\u2082 is 2.00 \u00d7 3 = 6.00 mol. But we only have 5.00 mol H\u2082. Therefore, H\u2082 is the Limiting Reagent (LR).",
      "Step 3: Moles of NH\u2083 produced based on LR (H\u2082): n(NH\u2083) = 5.00 \u00d7 (2/3) = 3.333 mol.",
      "Step 4: Mass of NH\u2083 produced = 3.333 mol \u00d7 17 g/mol = 56.67 g \u2248 56.7 g.",
      "Step 5: Moles of N\u2082 consumed = 5.00 / 3 = 1.667 mol. Moles of N\u2082 unreacted = 2.00 - 1.667 = 0.333 mol.",
      "Step 6: Mass of unreacted N\u2082 = 0.333 mol \u00d7 28 g/mol = 9.33 g \u2248 9.3 g."
    ],
    "limitingCheck": "Independent check: recompute the governing relation and verify that the stem constraints select 56.7 g NH\u2083, 9.3 g N\u2082 remaining (Option A).",
    "check": "Independent check: recompute the governing relation and verify that the stem constraints select 56.7 g NH\u2083, 9.3 g N\u2082 remaining (Option A).",
    "trapWarning": "Never declare N\u2082 as limiting just because 56g is larger than 10g! Stoichiometry demands 3 moles of H\u2082 per mole of N\u2082.",
    "correctKey": "opt-A",
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 4,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Chemistry)"
  },
  {
    "id": "CHEM02-Q02",
    "code": "CHEM02-Q02",
    "title": "JEE Main 2025 (Online) 28th January Morning Shift \u00b7 Diagnostic Hub \u00b7 QCHEM02-Q02 \u00b7 Mole Concept",
    "subjectCode": "CHEM",
    "subject": "Chemistry",
    "topicCode": "MOLE_CONCEPT",
    "topic": "Mole Concept",
    "subtopic": "CAP-CHEM-MOLE",
    "exam": "JEE Main 2025 (Online) 28th January Morning Shift",
    "year": "2025",
    "paper": "Diagnostic Hub",
    "questionNumber": "CHEM02-Q02",
    "section": "FAM-CHEM-MOLE",
    "markingScheme": "+4 / -1",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Mole Concept",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "SINGLE_CHOICE",
    "stem": "Which of the following sets of concentration terms is completely independent of temperature changes?",
    "options": [
      {
        "id": "opt-A",
        "text": "Molarity, Normality, and % (w/v)"
      },
      {
        "id": "opt-B",
        "text": "Molality, Mole fraction, and Mass percentage (% w/w)"
      },
      {
        "id": "opt-C",
        "text": "Molality, Molarity, and ppm"
      },
      {
        "id": "opt-F",
        "text": "Formality, Normality, and Mole fraction"
      }
    ],
    "hints": [
      "[METHOD] Step 1: Temperature affects liquid volume: V(T) = V\u2080(1 + \u03b3 \u0394T). Density changes with temperature.",
      "[METHOD] Step 2: Any concentration unit that includes solution volume in the denominator (Molarity M = n/V, Normality N = eq/V, % w/v = mass/V) is temperature dependent.",
      "[METHOD] Step 3: Units based solely on mass (Molality m = n_solute / kg_solvent, Mole fraction X = n_A / n_total, Mass % = m_solute / m_total \u00d7 100) are strictly temperature-independent."
    ],
    "steps": [
      "Step 1: Temperature affects liquid volume: V(T) = V\u2080(1 + \u03b3 \u0394T). Density changes with temperature.",
      "Step 2: Any concentration unit that includes solution volume in the denominator (Molarity M = n/V, Normality N = eq/V, % w/v = mass/V) is temperature dependent.",
      "Step 3: Units based solely on mass (Molality m = n_solute / kg_solvent, Mole fraction X = n_A / n_total, Mass % = m_solute / m_total \u00d7 100) are strictly temperature-independent.",
      "Step 4: Therefore, Molality, Mole fraction, and Mass percentage (% w/w) remain invariant under heating."
    ],
    "limitingCheck": "Independent check: recompute the governing relation and verify that the stem constraints select Molality, Mole fraction, and Mass percentage (% w/w) (Option B).",
    "check": "Independent check: recompute the governing relation and verify that the stem constraints select Molality, Mole fraction, and Mass percentage (% w/w) (Option B).",
    "trapWarning": "Students often confuse Molarity (mol/L solution, temp-dependent) with Molality (mol/kg solvent, temp-independent).",
    "correctKey": "opt-B",
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 4,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Chemistry)"
  },
  {
    "id": "CHEM02-Q03",
    "code": "CHEM02-Q03",
    "title": "JEE Main 2025 (Online) 24th January Evening Shift \u00b7 Diagnostic Hub \u00b7 QCHEM02-Q03 \u00b7 Mole Concept",
    "subjectCode": "CHEM",
    "subject": "Chemistry",
    "topicCode": "MOLE_CONCEPT",
    "topic": "Mole Concept",
    "subtopic": "CAP-CHEM-MOLE",
    "exam": "JEE Main 2025 (Online) 24th January Evening Shift",
    "year": "2025",
    "paper": "Diagnostic Hub",
    "questionNumber": "CHEM02-Q03",
    "section": "FAM-CHEM-MOLE",
    "markingScheme": "+4 / -1",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Mole Concept",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "SINGLE_CHOICE",
    "stem": "Consider the two-step synthesis: A + 2B \u2192 C (yield = 80%), followed by C + D \u2192 E (yield = 75%). Starting with 5.0 moles of A and excess of B and D, the moles of final product E obtained is:",
    "options": [
      {
        "id": "opt-A",
        "text": "3.00 mol"
      },
      {
        "id": "opt-B",
        "text": "3.75 mol"
      },
      {
        "id": "opt-C",
        "text": "4.00 mol"
      },
      {
        "id": "opt-D",
        "text": "2.50 mol"
      }
    ],
    "hints": [
      "[METHOD] Step 1: Step 1 theoretical moles of C from 5.0 mol A: n_theory(C) = 5.0 mol.",
      "[METHOD] Step 2: Actual moles of C obtained at 80% yield: n_actual(C) = 5.0 \u00d7 0.80 = 4.00 mol.",
      "[METHOD] Step 3: In Step 2, 4.00 moles of C react with excess D. Theoretical moles of E: n_theory(E) = 4.00 mol."
    ],
    "steps": [
      "Step 1: Step 1 theoretical moles of C from 5.0 mol A: n_theory(C) = 5.0 mol.",
      "Step 2: Actual moles of C obtained at 80% yield: n_actual(C) = 5.0 \u00d7 0.80 = 4.00 mol.",
      "Step 3: In Step 2, 4.00 moles of C react with excess D. Theoretical moles of E: n_theory(E) = 4.00 mol.",
      "Step 4: Actual moles of E obtained at 75% yield: n_actual(E) = 4.00 \u00d7 0.75 = 3.00 mol.",
      "Step 5: Alternatively, Overall Yield = 0.80 \u00d7 0.75 = 0.60 (60%). n(E) = 5.0 \u00d7 0.60 = 3.00 mol."
    ],
    "limitingCheck": "Independent check: recompute the governing relation and verify that the stem constraints select 3.00 mol (Option A).",
    "check": "Independent check: recompute the governing relation and verify that the stem constraints select 3.00 mol (Option A).",
    "trapWarning": "Do not add the percentage losses (20% + 25% = 45%); sequential yields multiply as fractions: 0.80 \u00d7 0.75 = 0.60!",
    "correctKey": "opt-A",
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 4,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Chemistry)"
  },
  {
    "id": "CHEM02-Q04",
    "code": "CHEM02-Q04",
    "title": "JEE Main 2026 (Online) 8th April Evening Shift \u00b7 Diagnostic Hub \u00b7 QCHEM02-Q04 \u00b7 Mole Concept",
    "subjectCode": "CHEM",
    "subject": "Chemistry",
    "topicCode": "MOLE_CONCEPT",
    "topic": "Mole Concept",
    "subtopic": "CAP-CHEM-MOLE",
    "exam": "JEE Main 2026 (Online) 8th April Evening Shift",
    "year": "2026",
    "paper": "Diagnostic Hub",
    "questionNumber": "CHEM02-Q04",
    "section": "FAM-CHEM-MOLE",
    "markingScheme": "+4 / -1",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Mole Concept",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "SINGLE_CHOICE",
    "stem": "10 mL of a gaseous hydrocarbon C_x H_y is exploded with 80 mL of O\u2082 in an eudiometer tube. On cooling to room temperature, the residual gas volume is 65 mL. After treatment with aqueous KOH solution, the volume contracts further by 40 mL. The molecular formula of the hydrocarbon is:",
    "options": [
      {
        "id": "opt-C",
        "text": "C\u2084H\u2081\u2080"
      },
      {
        "id": "opt-C",
        "text": "C\u2084H\u2088"
      },
      {
        "id": "opt-C",
        "text": "C\u2083H\u2088"
      },
      {
        "id": "opt-C",
        "text": "C\u2082H\u2086"
      }
    ],
    "hints": [
      "[METHOD] Step 1: For 10 mL C_xH_y, combustion consumes 10(x + y/4) mL O\u2082 and forms 10x mL CO\u2082; water condenses on cooling.",
      "[METHOD] Step 2: KOH removes 40 mL CO\u2082, so 10x = 40 and x = 4.",
      "[METHOD] Step 3: Before KOH, the 65 mL residual is CO\u2082 + excess O\u2082. Therefore excess O\u2082 = 65 - 40 = 25 mL."
    ],
    "steps": [
      "Step 1: For 10 mL C_xH_y, combustion consumes 10(x + y/4) mL O\u2082 and forms 10x mL CO\u2082; water condenses on cooling.",
      "Step 2: KOH removes 40 mL CO\u2082, so 10x = 40 and x = 4.",
      "Step 3: Before KOH, the 65 mL residual is CO\u2082 + excess O\u2082. Therefore excess O\u2082 = 65 - 40 = 25 mL.",
      "Step 4: O\u2082 consumed = 80 - 25 = 55 mL.",
      "Step 5: 10(4 + y/4) = 55, so 4 + y/4 = 5.5 and y = 6.",
      "Step 6: The stated data therefore imply C\u2084H\u2086. None of the listed options matches; this item is withheld from scoring pending source verification."
    ],
    "limitingCheck": "Independent check: recompute the stated quantities from the stem instead of forcing an option. The local audit result is No listed option \u2014 stated data imply C\u2084H\u2086.",
    "check": "Independent check: recompute the stated quantities from the stem instead of forcing an option. The local audit result is No listed option \u2014 stated data imply C\u2084H\u2086.",
    "trapWarning": "Water vapor condenses to liquid at room temperature; never count H\u2082O as part of the residual gas volume!",
    "correctKey": "opt-C",
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 4,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Chemistry)"
  },
  {
    "id": "CHEM02-Q05",
    "code": "CHEM02-Q05",
    "title": "JEE Main 2025 (Online) 30th January Evening Shift \u00b7 Diagnostic Hub \u00b7 QCHEM02-Q05 \u00b7 Mole Concept",
    "subjectCode": "CHEM",
    "subject": "Chemistry",
    "topicCode": "MOLE_CONCEPT",
    "topic": "Mole Concept",
    "subtopic": "CAP-CHEM-MOLE",
    "exam": "JEE Main 2025 (Online) 30th January Evening Shift",
    "year": "2025",
    "paper": "Diagnostic Hub",
    "questionNumber": "CHEM02-Q05",
    "section": "FAM-CHEM-MOLE",
    "markingScheme": "+4 / -1",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Mole Concept",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "SINGLE_CHOICE",
    "stem": "An organic compound contains 40.0% Carbon, 6.7% Hydrogen, and 53.3% Oxygen by mass. If its vapour density is 30, its molecular formula is:",
    "options": [
      {
        "id": "opt-C",
        "text": "CH\u2082O"
      },
      {
        "id": "opt-C",
        "text": "C\u2082H\u2084O\u2082"
      },
      {
        "id": "opt-C",
        "text": "C\u2083H\u2086O\u2083"
      },
      {
        "id": "opt-C",
        "text": "C\u2084H\u2088O\u2084"
      }
    ],
    "hints": [
      "[METHOD] Step 1: Compute moles in 100 g sample: n(C) = 40.0 / 12 = 3.33 mol. n(H) = 6.7 / 1 = 6.70 mol. n(O) = 53.3 / 16 = 3.33 mol.",
      "[METHOD] Step 2: Divide by the smallest mole value (3.33): C : H : O = (3.33/3.33) : (6.70/3.33) : (3.33/3.33) = 1 : 2 : 1. Empirical Formula = CH\u2082O.",
      "[METHOD] Step 3: Empirical Formula Mass = 12 + 2(1) + 16 = 30 g/mol."
    ],
    "steps": [
      "Step 1: Compute moles in 100 g sample: n(C) = 40.0 / 12 = 3.33 mol. n(H) = 6.7 / 1 = 6.70 mol. n(O) = 53.3 / 16 = 3.33 mol.",
      "Step 2: Divide by the smallest mole value (3.33): C : H : O = (3.33/3.33) : (6.70/3.33) : (3.33/3.33) = 1 : 2 : 1. Empirical Formula = CH\u2082O.",
      "Step 3: Empirical Formula Mass = 12 + 2(1) + 16 = 30 g/mol.",
      "Step 4: Molecular Mass = 2 \u00d7 Vapour Density = 2 \u00d7 30 = 60 g/mol.",
      "Step 5: Factor n = Molecular Mass / Empirical Mass = 60 / 30 = 2.",
      "Step 6: Molecular Formula = (CH\u2082O)\u2082 = C\u2082H\u2084O\u2082 (Acetic acid / Methyl formate)."
    ],
    "limitingCheck": "Independent check: recompute the governing relation and verify that the stem constraints select C\u2082H\u2084O\u2082 (Option B).",
    "check": "Independent check: recompute the governing relation and verify that the stem constraints select C\u2082H\u2084O\u2082 (Option B).",
    "trapWarning": "Do not stop at the empirical formula CH\u2082O! Vapour density = 30 means Molar Mass = 60 g/mol.",
    "correctKey": "opt-C",
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 4,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Chemistry)"
  },
  {
    "id": "CHEM02-Q06",
    "code": "CHEM02-Q06",
    "title": "JEE Main 2024 (Online) 27th January Morning Shift \u00b7 Diagnostic Hub \u00b7 QCHEM02-Q06 \u00b7 Mole Concept",
    "subjectCode": "CHEM",
    "subject": "Chemistry",
    "topicCode": "MOLE_CONCEPT",
    "topic": "Mole Concept",
    "subtopic": "CAP-CHEM-MOLE",
    "exam": "JEE Main 2024 (Online) 27th January Morning Shift",
    "year": "2024",
    "paper": "Diagnostic Hub",
    "questionNumber": "CHEM02-Q06",
    "section": "FAM-CHEM-MOLE",
    "markingScheme": "+4 / -1",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Mole Concept",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "SINGLE_CHOICE",
    "stem": "The molality of a 10% (w/w) aqueous solution of glucose (C\u2086H\u2081\u2082O\u2086, Molar mass = 180 g/mol) is:",
    "options": [
      {
        "id": "opt-A",
        "text": "0.617 m"
      },
      {
        "id": "opt-B",
        "text": "0.556 m"
      },
      {
        "id": "opt-C",
        "text": "0.485 m"
      },
      {
        "id": "opt-D",
        "text": "0.720 m"
      }
    ],
    "hints": [
      "[METHOD] Step 1: Basis: Take 100 g of solution. Mass of glucose solute = 10 g. Mass of water solvent = 100 - 10 = 90 g = 0.090 kg.",
      "[METHOD] Step 2: Calculate moles of glucose: n = 10 g / 180 g/mol = 0.05556 mol.",
      "[METHOD] Step 3: Calculate molality: m = 0.05556 mol / 0.090 kg = 0.617 mol/kg = 0.617 m."
    ],
    "steps": [
      "Step 1: Basis: Take 100 g of solution. Mass of glucose solute = 10 g. Mass of water solvent = 100 - 10 = 90 g = 0.090 kg.",
      "Step 2: Calculate moles of glucose: n = 10 g / 180 g/mol = 0.05556 mol.",
      "Step 3: Calculate molality: m = 0.05556 mol / 0.090 kg = 0.617 mol/kg = 0.617 m."
    ],
    "limitingCheck": "Independent check: recompute the governing relation and verify that the stem constraints select 0.617 m (Option A).",
    "check": "Independent check: recompute the governing relation and verify that the stem constraints select 0.617 m (Option A).",
    "trapWarning": "Do not divide moles by 100 g (total solution mass); molality denominator is solvent mass only (90 g)!",
    "correctKey": "opt-A",
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 4,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Chemistry)"
  },
  {
    "id": "CHEM02-Q07",
    "code": "CHEM02-Q07",
    "title": "JEE Main 2026 (Online) 9th April Morning Shift \u00b7 Diagnostic Hub \u00b7 QCHEM02-Q07 \u00b7 Mole Concept",
    "subjectCode": "CHEM",
    "subject": "Chemistry",
    "topicCode": "MOLE_CONCEPT",
    "topic": "Mole Concept",
    "subtopic": "CAP-CHEM-MOLE",
    "exam": "JEE Main 2026 (Online) 9th April Morning Shift",
    "year": "2026",
    "paper": "Diagnostic Hub",
    "questionNumber": "CHEM02-Q07",
    "section": "FAM-CHEM-MOLE",
    "markingScheme": "+4 / -1",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Mole Concept",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "SINGLE_CHOICE",
    "stem": "The total number of atoms present in 4.4 g of CO\u2082 gas at STP is (N_A = 6.022 \u00d7 10\u00b2\u00b3 mol\u207b\u00b9):",
    "options": [
      {
        "id": "opt-A",
        "text": "1.807 \u00d7 10\u00b2\u00b3 atoms"
      },
      {
        "id": "opt-B",
        "text": "6.022 \u00d7 10\u00b2\u00b2 atoms"
      },
      {
        "id": "opt-C",
        "text": "1.204 \u00d7 10\u00b2\u00b3 atoms"
      },
      {
        "id": "opt-D",
        "text": "2.408 \u00d7 10\u00b2\u00b3 atoms"
      }
    ],
    "hints": [
      "[METHOD] Step 1: Calculate moles of CO\u2082: n = 4.4 g / 44 g/mol = 0.10 mol.",
      "[METHOD] Step 2: Number of CO\u2082 molecules = 0.10 \u00d7 N_A = 0.10 \u00d7 6.022 \u00d7 10\u00b2\u00b3 = 6.022 \u00d7 10\u00b2\u00b2 molecules.",
      "[METHOD] Step 3: Each CO\u2082 molecule consists of 1 Carbon atom + 2 Oxygen atoms = 3 atoms."
    ],
    "steps": [
      "Step 1: Calculate moles of CO\u2082: n = 4.4 g / 44 g/mol = 0.10 mol.",
      "Step 2: Number of CO\u2082 molecules = 0.10 \u00d7 N_A = 0.10 \u00d7 6.022 \u00d7 10\u00b2\u00b3 = 6.022 \u00d7 10\u00b2\u00b2 molecules.",
      "Step 3: Each CO\u2082 molecule consists of 1 Carbon atom + 2 Oxygen atoms = 3 atoms.",
      "Step 4: Total number of atoms = 3 \u00d7 6.022 \u00d7 10\u00b2\u00b2 = 1.8066 \u00d7 10\u00b2\u00b3 \u2248 1.807 \u00d7 10\u00b2\u00b3 atoms."
    ],
    "limitingCheck": "Independent check: recompute the governing relation and verify that the stem constraints select 1.807 \u00d7 10\u00b2\u00b3 atoms (Option A).",
    "check": "Independent check: recompute the governing relation and verify that the stem constraints select 1.807 \u00d7 10\u00b2\u00b3 atoms (Option A).",
    "trapWarning": "Always multiply by molecular atomicity (3 for CO\u2082); 6.022 \u00d7 10\u00b2\u00b2 is the number of molecules, not atoms!",
    "correctKey": "opt-A",
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 4,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Chemistry)"
  },
  {
    "id": "CHEM02-Q08",
    "code": "CHEM02-Q08",
    "title": "JEE Main 2024 (Online) 31st January Evening Shift \u00b7 Diagnostic Hub \u00b7 QCHEM02-Q08 \u00b7 Mole Concept",
    "subjectCode": "CHEM",
    "subject": "Chemistry",
    "topicCode": "MOLE_CONCEPT",
    "topic": "Mole Concept",
    "subtopic": "CAP-CHEM-MOLE",
    "exam": "JEE Main 2024 (Online) 31st January Evening Shift",
    "year": "2024",
    "paper": "Diagnostic Hub",
    "questionNumber": "CHEM02-Q08",
    "section": "FAM-CHEM-MOLE",
    "markingScheme": "+4 / -1",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Mole Concept",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "SINGLE_CHOICE",
    "stem": "When 50 mL of 0.5 M BaCl\u2082 solution is mixed with 50 mL of 0.2 M Na\u2082SO\u2084 solution, the mass of BaSO\u2084 precipitated is (Molar mass of BaSO\u2084 = 233.3 g/mol):",
    "options": [
      {
        "id": "opt-A",
        "text": "2.33 g"
      },
      {
        "id": "opt-B",
        "text": "5.83 g"
      },
      {
        "id": "opt-C",
        "text": "1.17 g"
      },
      {
        "id": "opt-D",
        "text": "3.50 g"
      }
    ],
    "hints": [
      "[METHOD] Step 1: Calculate millimoles of BaCl\u2082: 50 mL \u00d7 0.5 M = 25.0 mmol.",
      "[METHOD] Step 2: Calculate millimoles of Na\u2082SO\u2084: 50 mL \u00d7 0.2 M = 10.0 mmol.",
      "[METHOD] Step 3: Stoichiometry is 1:1. Na\u2082SO\u2084 has fewer millimoles (10.0 mmol vs 25.0 mmol), so Na\u2082SO\u2084 is the Limiting Reagent."
    ],
    "steps": [
      "Step 1: Calculate millimoles of BaCl\u2082: 50 mL \u00d7 0.5 M = 25.0 mmol.",
      "Step 2: Calculate millimoles of Na\u2082SO\u2084: 50 mL \u00d7 0.2 M = 10.0 mmol.",
      "Step 3: Stoichiometry is 1:1. Na\u2082SO\u2084 has fewer millimoles (10.0 mmol vs 25.0 mmol), so Na\u2082SO\u2084 is the Limiting Reagent.",
      "Step 4: Millimoles of BaSO\u2084 precipitate formed = 10.0 mmol = 0.010 mol.",
      "Step 5: Mass of BaSO\u2084 = 0.010 mol \u00d7 233.3 g/mol = 2.333 g \u2248 2.33 g."
    ],
    "limitingCheck": "Independent check: recompute the governing relation and verify that the stem constraints select 2.33 g (Option A).",
    "check": "Independent check: recompute the governing relation and verify that the stem constraints select 2.33 g (Option A).",
    "trapWarning": "Do not base product mass on BaCl\u2082! Ba\u00b2\u207a is in substantial excess (15.0 mmol remains in solution).",
    "correctKey": "opt-A",
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 4,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Chemistry)"
  },
  {
    "id": "MOLE-Q09",
    "code": "MOLE-Q09",
    "title": "JEE Main 2024 (Online) 1st February Morning Shift \u00b7 Diagnostic Hub \u00b7 QMOLE-Q09 \u00b7 Mole Concept",
    "subjectCode": "CHEM",
    "subject": "Chemistry",
    "topicCode": "MOLE_CONCEPT",
    "topic": "Mole Concept",
    "subtopic": "CAP-CHEM-MOLE",
    "exam": "JEE Main 2024 (Online) 1st February Morning Shift",
    "year": "2024",
    "paper": "Diagnostic Hub",
    "questionNumber": "MOLE-Q09",
    "section": "FAM-CHEM-MOLE",
    "markingScheme": "+4 / -1",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Mole Concept",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "SINGLE_CHOICE",
    "stem": "Which of the following concentration units changes when the temperature of the solution is altered?",
    "options": [
      {
        "id": "opt-A",
        "text": "Molarity"
      },
      {
        "id": "opt-B",
        "text": "Molality"
      },
      {
        "id": "opt-C",
        "text": "Mole fraction"
      },
      {
        "id": "opt-D",
        "text": "Mass percentage (% w/w)"
      }
    ],
    "hints": [
      "[METHOD] Step 1: Examine mass-based units: Molality (m = n_solute / kg_solvent), Mole fraction (X = n_i / n_total), and Mass percent (% w/w = mass_solute / mass_solution \u00d7 100).",
      "[METHOD] Step 2: Mass is strictly conserved and completely independent of thermal expansion or temperature changes.",
      "[METHOD] Step 3: Molarity (M) and Normality (N) are defined per unit volume of solution."
    ],
    "steps": [
      "Step 1: Examine mass-based units: Molality (m = n_solute / kg_solvent), Mole fraction (X = n_i / n_total), and Mass percent (% w/w = mass_solute / mass_solution \u00d7 100).",
      "Step 2: Mass is strictly conserved and completely independent of thermal expansion or temperature changes.",
      "Step 3: Molarity (M) and Normality (N) are defined per unit volume of solution.",
      "Step 4: Since liquid solvents expand upon heating (\u0394V > 0), the denominator increases while solute moles remain constant.",
      "Step 5: Therefore, Molarity decreases as temperature rises, making it temperature-dependent."
    ],
    "limitingCheck": "Independent check: recompute the governing relation and verify that the stem constraints select Molarity (Option A).",
    "check": "Independent check: recompute the governing relation and verify that the stem constraints select Molarity (Option A).",
    "trapWarning": "Remember the distinction: Any unit involving VOLUME (Molarity, Normality, % v/v, % w/v) is temperature-dependent; units based strictly on MASS (Molality, Mole fraction, ppm by mass, % w/w) are temperature-independent!",
    "correctKey": "opt-A",
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 4,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Chemistry)"
  },
  {
    "id": "MOLE-Q10",
    "code": "MOLE-Q10",
    "title": "JEE Main 2024 (Online) 27th January Evening Shift \u00b7 Diagnostic Hub \u00b7 QMOLE-Q10 \u00b7 Mole Concept",
    "subjectCode": "CHEM",
    "subject": "Chemistry",
    "topicCode": "MOLE_CONCEPT",
    "topic": "Mole Concept",
    "subtopic": "CAP-CHEM-MOLE",
    "exam": "JEE Main 2024 (Online) 27th January Evening Shift",
    "year": "2024",
    "paper": "Diagnostic Hub",
    "questionNumber": "MOLE-Q10",
    "section": "FAM-CHEM-MOLE",
    "markingScheme": "+4 / -1",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Mole Concept",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "SINGLE_CHOICE",
    "stem": "10 mL of a gaseous hydrocarbon (C_x H_y) requires 65 mL of O\u2082 for complete combustion and produces 40 mL of CO\u2082 gas under identical conditions of temperature and pressure. The molecular formula of the hydrocarbon is:",
    "options": [
      {
        "id": "opt-C",
        "text": "C\u2084H\u2081\u2080"
      },
      {
        "id": "opt-C",
        "text": "C\u2084H\u2088"
      },
      {
        "id": "opt-C",
        "text": "C\u2083H\u2088"
      },
      {
        "id": "opt-C",
        "text": "C\u2085H\u2081\u2080"
      }
    ],
    "hints": [
      "[METHOD] Step 1: By Gay-Lussac's Law of combining volumes, at constant T and P, volume ratio equals mole ratio.",
      "[METHOD] Step 2: Volume of CO\u2082 produced: V_CO2 = x \u00d7 V_HC \u21d2 40 mL = x (10 mL) \u21d2 x = 4.",
      "[METHOD] Step 3: Volume of O\u2082 consumed: V_O2 = (x + y/4) \u00d7 V_HC \u21d2 65 mL = (4 + y/4) (10 mL)."
    ],
    "steps": [
      "Step 1: By Gay-Lussac's Law of combining volumes, at constant T and P, volume ratio equals mole ratio.",
      "Step 2: Volume of CO\u2082 produced: V_CO2 = x \u00d7 V_HC \u21d2 40 mL = x (10 mL) \u21d2 x = 4.",
      "Step 3: Volume of O\u2082 consumed: V_O2 = (x + y/4) \u00d7 V_HC \u21d2 65 mL = (4 + y/4) (10 mL).",
      "Step 4: Solve for y: 4 + y/4 = 6.5 \u21d2 y/4 = 2.5 \u21d2 y = 10.",
      "Step 5: Formula is C\u2084H\u2081\u2080 (Butane)."
    ],
    "limitingCheck": "Independent check: recompute the governing relation and verify that the stem constraints select C\u2084H\u2081\u2080 (Option A).",
    "check": "Independent check: recompute the governing relation and verify that the stem constraints select C\u2084H\u2081\u2080 (Option A).",
    "trapWarning": "Notice that water formed is in liquid state at room temperature, so its volume condenses to negligible; oxygen consumed accounts for both carbon dioxide and water formation!",
    "correctKey": "opt-C",
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 4,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Chemistry)"
  },
  {
    "id": "MOLE-Q11",
    "code": "MOLE-Q11",
    "title": "JEE Main 2023 (Online) 15th April Morning Shift \u00b7 Diagnostic Hub \u00b7 QMOLE-Q11 \u00b7 Mole Concept",
    "subjectCode": "CHEM",
    "subject": "Chemistry",
    "topicCode": "MOLE_CONCEPT",
    "topic": "Mole Concept",
    "subtopic": "CAP-CHEM-MOLE",
    "exam": "JEE Main 2023 (Online) 15th April Morning Shift",
    "year": "2023",
    "paper": "Diagnostic Hub",
    "questionNumber": "MOLE-Q11",
    "section": "FAM-CHEM-MOLE",
    "markingScheme": "+4 / -1",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Mole Concept",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "SINGLE_CHOICE",
    "stem": "The number of moles of electrons in 1.0 kg of electrons is approximately: (Mass of electron m_e = 9.109 \u00d7 10\u207b\u00b3\u00b9 kg, N_A = 6.022 \u00d7 10\u00b2\u00b3 mol\u207b\u00b9)",
    "options": [
      {
        "id": "opt-A",
        "text": "1.82 \u00d7 10\u2076 mol"
      },
      {
        "id": "opt-B",
        "text": "6.02 \u00d7 10\u00b2\u00b3 mol"
      },
      {
        "id": "opt-C",
        "text": "1.09 \u00d7 10\u00b3\u2070 mol"
      },
      {
        "id": "opt-D",
        "text": "9.11 \u00d7 10\u207b\u2078 mol"
      }
    ],
    "hints": [
      "[METHOD] Step 1: Total mass M = 1.0 kg.",
      "[METHOD] Step 2: Number of electrons in 1 kg: N = M / m_e = 1.0 / (9.109 \u00d7 10\u207b\u00b3\u00b9 kg) \u2248 1.098 \u00d7 10\u00b3\u2070 electrons.",
      "[METHOD] Step 3: Number of moles of electrons: n = N / N_A = (1.098 \u00d7 10\u00b3\u2070) / (6.022 \u00d7 10\u00b2\u00b3 mol\u207b\u00b9)."
    ],
    "steps": [
      "Step 1: Total mass M = 1.0 kg.",
      "Step 2: Number of electrons in 1 kg: N = M / m_e = 1.0 / (9.109 \u00d7 10\u207b\u00b3\u00b9 kg) \u2248 1.098 \u00d7 10\u00b3\u2070 electrons.",
      "Step 3: Number of moles of electrons: n = N / N_A = (1.098 \u00d7 10\u00b3\u2070) / (6.022 \u00d7 10\u00b2\u00b3 mol\u207b\u00b9).",
      "Step 4: Compute: n = (1.098 / 6.022) \u00d7 10\u2077 = 0.1823 \u00d7 10\u2077 = 1.82 \u00d7 10\u2076 moles.",
      "Step 5: Physical insight: 1 mole of electrons weighs only 0.548 mg (m_e \u00d7 N_A = 5.48 \u00d7 10\u207b\u2077 kg), so 1 kg contains nearly 2 million moles of electrons!"
    ],
    "limitingCheck": "Independent check: recompute the governing relation and verify that the stem constraints select 1.82 \u00d7 10\u2076 mol (Option A).",
    "check": "Independent check: recompute the governing relation and verify that the stem constraints select 1.82 \u00d7 10\u2076 mol (Option A).",
    "trapWarning": "Do not report the total NUMBER of electrons (1.1 \u00d7 10\u00b3\u2070); the question specifically asks for the number of MOLES of electrons (divide by N_A)!",
    "correctKey": "opt-A",
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 4,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Chemistry)"
  },
  {
    "id": "MOLE-Q12",
    "code": "MOLE-Q12",
    "title": "JEE Main 2023 (Online) 8th April Evening Shift \u00b7 Diagnostic Hub \u00b7 QMOLE-Q12 \u00b7 Mole Concept",
    "subjectCode": "CHEM",
    "subject": "Chemistry",
    "topicCode": "MOLE_CONCEPT",
    "topic": "Mole Concept",
    "subtopic": "CAP-CHEM-MOLE",
    "exam": "JEE Main 2023 (Online) 8th April Evening Shift",
    "year": "2023",
    "paper": "Diagnostic Hub",
    "questionNumber": "MOLE-Q12",
    "section": "FAM-CHEM-MOLE",
    "markingScheme": "+4 / -1",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Mole Concept",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "SINGLE_CHOICE",
    "stem": "56.0 g of nitrogen gas (N\u2082) and 10.0 g of hydrogen gas (H\u2082) are mixed and allowed to react completely to form ammonia (NH\u2083). The mass of NH\u2083 produced is: (Molar masses: N\u2082 = 28 g/mol, H\u2082 = 2 g/mol, NH\u2083 = 17 g/mol)",
    "options": [
      {
        "id": "opt-A",
        "text": "56.7 g"
      },
      {
        "id": "opt-B",
        "text": "68.0 g"
      },
      {
        "id": "opt-C",
        "text": "66.0 g"
      },
      {
        "id": "opt-D",
        "text": "85.0 g"
      }
    ],
    "hints": [
      "[METHOD] Step 1: Compute moles of each reactant:",
      "[METHOD] Moles of N\u2082 = 56.0 g / 28 g/mol = 2.0 moles.",
      "[METHOD] Moles of H\u2082 = 10.0 g / 2.0 g/mol = 5.0 moles."
    ],
    "steps": [
      "Step 1: Compute moles of each reactant:",
      "        Moles of N\u2082 = 56.0 g / 28 g/mol = 2.0 moles.",
      "        Moles of H\u2082 = 10.0 g / 2.0 g/mol = 5.0 moles.",
      "Step 2: Determine limiting reagent by dividing moles by stoichiometric coefficients:",
      "        For N\u2082: 2.0 / 1 = 2.0.",
      "        For H\u2082: 5.0 / 3 = 1.667.",
      "        Since 1.667 < 2.0, H\u2082 is the LIMITING REAGENT!",
      "Step 3: Calculate moles of NH\u2083 formed from limiting reagent H\u2082:",
      "        Moles of NH\u2083 = (2/3) \u00d7 Moles of H\u2082 = (2/3) \u00d7 5.0 = 10/3 \u2248 3.333 moles.",
      "Step 4: Compute mass of NH\u2083: Mass = (10/3 mol) \u00d7 17 g/mol = 170 / 3 \u2248 56.67 g \u2248 56.7 g.",
      "Step 5: Unreacted N\u2082 remaining = 2.0 - (5.0 / 3) = 1/3 mol = 9.33 g. Total mass = 56.67 + 9.33 = 66.0 g (Mass is conserved!)."
    ],
    "limitingCheck": "Independent check: recompute the governing relation and verify that the stem constraints select 56.7 g (Option A).",
    "check": "Independent check: recompute the governing relation and verify that the stem constraints select 56.7 g (Option A).",
    "trapWarning": "Do not assume N\u2082 is limiting because 56 g looks like 2 moles; 2 moles of N\u2082 requires 6 moles (12 g) of H\u2082, but only 10 g is available! H\u2082 runs out first.",
    "correctKey": "opt-A",
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 4,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Chemistry)"
  },
  {
    "id": "MOLE-Q13",
    "code": "MOLE-Q13",
    "title": "JEE Main 2022 (Online) 29th June Morning Shift \u00b7 Diagnostic Hub \u00b7 QMOLE-Q13 \u00b7 Mole Concept",
    "subjectCode": "CHEM",
    "subject": "Chemistry",
    "topicCode": "MOLE_CONCEPT",
    "topic": "Mole Concept",
    "subtopic": "CAP-CHEM-MOLE",
    "exam": "JEE Main 2022 (Online) 29th June Morning Shift",
    "year": "2022",
    "paper": "Diagnostic Hub",
    "questionNumber": "MOLE-Q13",
    "section": "FAM-CHEM-MOLE",
    "markingScheme": "+4 / -1",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Mole Concept",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "SINGLE_CHOICE",
    "stem": "The mole fraction of a solute in an aqueous solution is 0.05. The molality of the solution is approximately: (Molar mass of water = 18 g/mol)",
    "options": [
      {
        "id": "opt-A",
        "text": "2.92 m"
      },
      {
        "id": "opt-B",
        "text": "2.78 m"
      },
      {
        "id": "opt-C",
        "text": "3.20 m"
      },
      {
        "id": "opt-D",
        "text": "1.95 m"
      }
    ],
    "hints": [
      "[METHOD] Step 1: In 1 mole of total solution, moles of solute n\u2081 = 0.05 mol.",
      "[METHOD] Step 2: Moles of solvent (water) n\u2082 = 1 - 0.05 = 0.95 mol.",
      "[METHOD] Step 3: Mass of solvent in kg: W_solvent = (0.95 mol \u00d7 18 g/mol) / 1000 = 17.1 / 1000 = 0.0171 kg."
    ],
    "steps": [
      "Step 1: In 1 mole of total solution, moles of solute n\u2081 = 0.05 mol.",
      "Step 2: Moles of solvent (water) n\u2082 = 1 - 0.05 = 0.95 mol.",
      "Step 3: Mass of solvent in kg: W_solvent = (0.95 mol \u00d7 18 g/mol) / 1000 = 17.1 / 1000 = 0.0171 kg.",
      "Step 4: Molality m = n_solute / W_solvent(kg) = 0.05 / 0.0171 = 50 / 17.1 \u2248 2.924 mol/kg = 2.92 m.",
      "Step 5: Invariant check: In dilute solution, m \u2248 X \u00d7 1000 / 18 = 0.05 \u00d7 55.55 = 2.78 m; here 2.92 m accounts for the denominator (1 - X)."
    ],
    "limitingCheck": "Independent check: recompute the governing relation and verify that the stem constraints select 2.92 m (Option A).",
    "check": "Independent check: recompute the governing relation and verify that the stem constraints select 2.92 m (Option A).",
    "trapWarning": "Do not forget the (1 - X) factor in the denominator! Approximating (1 - X) \u2248 1 gives 2.78 m, which is a classic distractor trap.",
    "correctKey": "opt-A",
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 4,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Chemistry)"
  },
  {
    "id": "MOLE-Q14",
    "code": "MOLE-Q14",
    "title": "JEE Main 2022 (Online) 25th June Evening Shift \u00b7 Diagnostic Hub \u00b7 QMOLE-Q14 \u00b7 Mole Concept",
    "subjectCode": "CHEM",
    "subject": "Chemistry",
    "topicCode": "MOLE_CONCEPT",
    "topic": "Mole Concept",
    "subtopic": "CAP-CHEM-MOLE",
    "exam": "JEE Main 2022 (Online) 25th June Evening Shift",
    "year": "2022",
    "paper": "Diagnostic Hub",
    "questionNumber": "MOLE-Q14",
    "section": "FAM-CHEM-MOLE",
    "markingScheme": "+4 / -1",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Mole Concept",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "SINGLE_CHOICE",
    "stem": "A synthesis involves two sequential steps: A \u2192 B with 80% yield, followed by B \u2192 C with 50% yield. If 10.0 moles of A are initially taken, how many moles of C are obtained?",
    "options": [
      {
        "id": "opt-A",
        "text": "4.0 moles"
      },
      {
        "id": "opt-B",
        "text": "6.5 moles"
      },
      {
        "id": "opt-C",
        "text": "5.0 moles"
      },
      {
        "id": "opt-D",
        "text": "3.0 moles"
      }
    ],
    "hints": [
      "[METHOD] Step 1: Initial feed of reactant A = 10.0 moles.",
      "[METHOD] Step 2: Step 1 (A \u2192 B) has 80% yield (\u03b7\u2081 = 0.80): Moles of B produced = 10.0 \u00d7 0.80 = 8.0 moles.",
      "[METHOD] Step 3: Step 2 (B \u2192 C) has 50% yield (\u03b7\u2082 = 0.50): Moles of C produced = 8.0 \u00d7 0.50 = 4.0 moles."
    ],
    "steps": [
      "Step 1: Initial feed of reactant A = 10.0 moles.",
      "Step 2: Step 1 (A \u2192 B) has 80% yield (\u03b7\u2081 = 0.80): Moles of B produced = 10.0 \u00d7 0.80 = 8.0 moles.",
      "Step 3: Step 2 (B \u2192 C) has 50% yield (\u03b7\u2082 = 0.50): Moles of C produced = 8.0 \u00d7 0.50 = 4.0 moles.",
      "Step 4: Overall sequential yield \u03b7_net = 0.80 \u00d7 0.50 = 0.40 = 40%.",
      "Step 5: Total moles of C obtained = 10.0 \u00d7 0.40 = 4.0 moles."
    ],
    "limitingCheck": "Independent check: recompute the governing relation and verify that the stem constraints select 4.0 moles (Option A).",
    "check": "Independent check: recompute the governing relation and verify that the stem constraints select 4.0 moles (Option A).",
    "trapWarning": "Sequential yields multiply (\u03b7_net = \u03b7\u2081 \u00d7 \u03b7\u2082 = 40%), they NEVER average! The arithmetic mean (80 + 50)/2 = 65% is the classic exam trap.",
    "correctKey": "opt-A",
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 4,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Chemistry)"
  },
  {
    "id": "MOLE-Q15",
    "code": "MOLE-Q15",
    "title": "JEE Main 2021 (Online) 26th February Morning Shift \u00b7 Diagnostic Hub \u00b7 QMOLE-Q15 \u00b7 Mole Concept",
    "subjectCode": "CHEM",
    "subject": "Chemistry",
    "topicCode": "MOLE_CONCEPT",
    "topic": "Mole Concept",
    "subtopic": "CAP-CHEM-MOLE",
    "exam": "JEE Main 2021 (Online) 26th February Morning Shift",
    "year": "2021",
    "paper": "Diagnostic Hub",
    "questionNumber": "MOLE-Q15",
    "section": "FAM-CHEM-MOLE",
    "markingScheme": "+4 / -1",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Mole Concept",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "SINGLE_CHOICE",
    "stem": "An organic compound contains 40.0% Carbon, 6.7% Hydrogen, and 53.3% Oxygen by mass. If its vapor density is 30, its molecular formula is:",
    "options": [
      {
        "id": "opt-C",
        "text": "C\u2082H\u2084O\u2082"
      },
      {
        "id": "opt-C",
        "text": "CH\u2082O"
      },
      {
        "id": "opt-C",
        "text": "C\u2083H\u2086O\u2083"
      },
      {
        "id": "opt-C",
        "text": "C\u2082H\u2086O"
      }
    ],
    "hints": [
      "[METHOD] Step 1: Find mole ratio of elements in 100 g sample:",
      "[METHOD] Moles of C = 40.0 / 12 = 3.33.",
      "[METHOD] Moles of H = 6.7 / 1 = 6.70."
    ],
    "steps": [
      "Step 1: Find mole ratio of elements in 100 g sample:",
      "        Moles of C = 40.0 / 12 = 3.33.",
      "        Moles of H = 6.7 / 1 = 6.70.",
      "        Moles of O = 53.3 / 16 = 3.33.",
      "Step 2: Divide by the smallest value (3.33):",
      "        C : H : O = (3.33 / 3.33) : (6.70 / 3.33) : (3.33 / 3.33) = 1 : 2.01 : 1 \u2248 1 : 2 : 1.",
      "Step 3: Empirical formula is CH\u2082O. Empirical Formula Mass = 12 + 2 + 16 = 30 g/mol.",
      "Step 4: Molar mass = 2 \u00d7 Vapor Density = 2 \u00d7 30 = 60 g/mol.",
      "Step 5: Integer multiplier n = (Molar Mass) / (Empirical Mass) = 60 / 30 = 2.",
      "Step 6: Molecular formula = (CH\u2082O)\u2082 = C\u2082H\u2084O\u2082 (Acetic acid / Methyl formate)."
    ],
    "limitingCheck": "Independent check: recompute the governing relation and verify that the stem constraints select C\u2082H\u2084O\u2082 (Option A).",
    "check": "Independent check: recompute the governing relation and verify that the stem constraints select C\u2082H\u2084O\u2082 (Option A).",
    "trapWarning": "Notice the difference between EMPIRICAL formula (CH\u2082O) and MOLECULAR formula (C\u2082H\u2084O\u2082)! Don't stop at the empirical ratio.",
    "correctKey": "opt-C",
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 4,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Chemistry)"
  },
  {
    "id": "MOLE-Q16",
    "code": "MOLE-Q16",
    "title": "JEE Main 2021 (Online) 27th July Morning Shift \u00b7 Diagnostic Hub \u00b7 QMOLE-Q16 \u00b7 Mole Concept",
    "subjectCode": "CHEM",
    "subject": "Chemistry",
    "topicCode": "MOLE_CONCEPT",
    "topic": "Mole Concept",
    "subtopic": "CAP-CHEM-MOLE",
    "exam": "JEE Main 2021 (Online) 27th July Morning Shift",
    "year": "2021",
    "paper": "Diagnostic Hub",
    "questionNumber": "MOLE-Q16",
    "section": "FAM-CHEM-MOLE",
    "markingScheme": "+4 / -1",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Mole Concept",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "SINGLE_CHOICE",
    "stem": "100 mL of 0.2 M H\u2082SO\u2084 is mixed with 200 mL of 0.1 M HCl. What is the resulting concentration of H\u207a ions in the final mixture?",
    "options": [
      {
        "id": "opt-A",
        "text": "0.20 M"
      },
      {
        "id": "opt-B",
        "text": "0.133 M"
      },
      {
        "id": "opt-C",
        "text": "0.15 M"
      },
      {
        "id": "opt-D",
        "text": "0.30 M"
      }
    ],
    "hints": [
      "[METHOD] Step 1: H\u2082SO\u2084 is a diprotic acid (basicity = 2): 1 molecule of H\u2082SO\u2084 releases 2 H\u207a ions.",
      "[METHOD] Millimoles of H\u207a from H\u2082SO\u2084 = 2 \u00d7 (Molarity \u00d7 Volume) = 2 \u00d7 (0.2 M \u00d7 100 mL) = 40 mmol.",
      "[METHOD] Step 2: HCl is a monoprotic acid (basicity = 1): 1 molecule releases 1 H\u207a ion."
    ],
    "steps": [
      "Step 1: H\u2082SO\u2084 is a diprotic acid (basicity = 2): 1 molecule of H\u2082SO\u2084 releases 2 H\u207a ions.",
      "        Millimoles of H\u207a from H\u2082SO\u2084 = 2 \u00d7 (Molarity \u00d7 Volume) = 2 \u00d7 (0.2 M \u00d7 100 mL) = 40 mmol.",
      "Step 2: HCl is a monoprotic acid (basicity = 1): 1 molecule releases 1 H\u207a ion.",
      "        Millimoles of H\u207a from HCl = 1 \u00d7 (0.1 M \u00d7 200 mL) = 20 mmol.",
      "Step 3: Total millimoles of H\u207a = 40 + 20 = 60 mmol.",
      "Step 4: Total volume of solution = 100 mL + 200 mL = 300 mL.",
      "Step 5: Concentration of H\u207a: [H\u207a] = 60 mmol / 300 mL = 0.20 M."
    ],
    "limitingCheck": "Independent check: recompute the governing relation and verify that the stem constraints select 0.20 M (Option A).",
    "check": "Independent check: recompute the governing relation and verify that the stem constraints select 0.20 M (Option A).",
    "trapWarning": "BASICITY TRAP: Forgetting that H\u2082SO\u2084 provides TWO H\u207a ions per molecule yields (20 + 20)/300 = 0.133 M, a very common exam trap!",
    "correctKey": "opt-A",
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 4,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Chemistry)"
  },
  {
    "id": "MOLE-Q17",
    "code": "MOLE-Q17",
    "title": "JEE Main 2020 (Online) 9th January Morning Shift \u00b7 Diagnostic Hub \u00b7 QMOLE-Q17 \u00b7 Mole Concept",
    "subjectCode": "CHEM",
    "subject": "Chemistry",
    "topicCode": "MOLE_CONCEPT",
    "topic": "Mole Concept",
    "subtopic": "CAP-CHEM-MOLE",
    "exam": "JEE Main 2020 (Online) 9th January Morning Shift",
    "year": "2020",
    "paper": "Diagnostic Hub",
    "questionNumber": "MOLE-Q17",
    "section": "FAM-CHEM-MOLE",
    "markingScheme": "+4 / -1",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Mole Concept",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "SINGLE_CHOICE",
    "stem": "The strength of an aqueous KOH solution is 30% by mass (% w/w). If its density is 1.29 g/mL, its molarity is: (Molar mass of KOH = 56.1 g/mol)",
    "options": [
      {
        "id": "opt-A",
        "text": "6.90 M"
      },
      {
        "id": "opt-B",
        "text": "5.35 M"
      },
      {
        "id": "opt-C",
        "text": "7.50 M"
      },
      {
        "id": "opt-D",
        "text": "6.20 M"
      }
    ],
    "hints": [
      "[METHOD] Step 1: Consider 100 g of solution:",
      "[METHOD] Mass of solute (KOH) = 30 g.",
      "[METHOD] Volume of 100 g solution = Mass / Density = 100 g / 1.29 g/mL = 77.52 mL = 0.07752 L."
    ],
    "steps": [
      "Step 1: Consider 100 g of solution:",
      "        Mass of solute (KOH) = 30 g.",
      "        Volume of 100 g solution = Mass / Density = 100 g / 1.29 g/mL = 77.52 mL = 0.07752 L.",
      "Step 2: Moles of KOH = 30 g / 56.1 g/mol = 0.5348 mol.",
      "Step 3: Molarity M = (Moles of solute) / (Volume in L) = 0.5348 / 0.07752 = 6.899 \u2248 6.90 M.",
      "Step 4: Check via master conversion shortcut formula:",
      "        M = (10 \u00d7 %w/w \u00d7 d) / M_solute = (10 \u00d7 30 \u00d7 1.29) / 56.1 = 387 / 56.1 = 6.898 \u2248 6.90 M."
    ],
    "limitingCheck": "Independent check: recompute the governing relation and verify that the stem constraints select 6.90 M (Option A).",
    "check": "Independent check: recompute the governing relation and verify that the stem constraints select 6.90 M (Option A).",
    "trapWarning": "Remember the factor of 10 in the shortcut formula M = 10 \u00d7 x \u00d7 d / M_solute comes from 1000/100!",
    "correctKey": "opt-A",
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 4,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Chemistry)"
  },
  {
    "id": "MOLE-Q18",
    "code": "MOLE-Q18",
    "title": "JEE Main 2020 (Online) 7th January Evening Shift \u00b7 Diagnostic Hub \u00b7 QMOLE-Q18 \u00b7 Mole Concept",
    "subjectCode": "CHEM",
    "subject": "Chemistry",
    "topicCode": "MOLE_CONCEPT",
    "topic": "Mole Concept",
    "subtopic": "CAP-CHEM-MOLE",
    "exam": "JEE Main 2020 (Online) 7th January Evening Shift",
    "year": "2020",
    "paper": "Diagnostic Hub",
    "questionNumber": "MOLE-Q18",
    "section": "FAM-CHEM-MOLE",
    "markingScheme": "+4 / -1",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Mole Concept",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "SINGLE_CHOICE",
    "stem": "A 20.0 g sample of limestone (impure CaCO\u2083) on thermal decomposition yields 4.4 g of carbon dioxide (CO\u2082). The percentage purity of CaCO\u2083 in the sample is: (Molar masses: CaCO\u2083 = 100 g/mol, CO\u2082 = 44 g/mol)",
    "options": [
      {
        "id": "opt-A",
        "text": "50%"
      },
      {
        "id": "opt-B",
        "text": "44%"
      },
      {
        "id": "opt-C",
        "text": "75%"
      },
      {
        "id": "opt-D",
        "text": "22%"
      }
    ],
    "hints": [
      "[METHOD] Step 1: Write decomposition equation: CaCO\u2083(s) \u2192 CaO(s) + CO\u2082(g).",
      "[METHOD] Step 2: 1 mole of pure CaCO\u2083 (100 g) produces 1 mole of CO\u2082 (44 g).",
      "[METHOD] Step 3: Moles of CO\u2082 produced = 4.4 g / 44 g/mol = 0.10 mol."
    ],
    "steps": [
      "Step 1: Write decomposition equation: CaCO\u2083(s) \u2192 CaO(s) + CO\u2082(g).",
      "Step 2: 1 mole of pure CaCO\u2083 (100 g) produces 1 mole of CO\u2082 (44 g).",
      "Step 3: Moles of CO\u2082 produced = 4.4 g / 44 g/mol = 0.10 mol.",
      "Step 4: Moles of pure CaCO\u2083 that reacted = 0.10 mol.",
      "Step 5: Mass of pure CaCO\u2083 = 0.10 mol \u00d7 100 g/mol = 10.0 g.",
      "Step 6: Percentage purity = (10.0 g / 20.0 g) \u00d7 100 = 50.0%."
    ],
    "limitingCheck": "Independent check: recompute the governing relation and verify that the stem constraints select 50% (Option A).",
    "check": "Independent check: recompute the governing relation and verify that the stem constraints select 50% (Option A).",
    "trapWarning": "Do not confuse mass of CO\u2082 (4.4 g) with mass percentage! 4.4 g CO\u2082 represents 10.0 g of pure CaCO\u2083 in 20.0 g of ore.",
    "correctKey": "opt-A",
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 4,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Chemistry)"
  },
  {
    "id": "MOLE-Q19",
    "code": "MOLE-Q19",
    "title": "JEE Main 2019 (Online) 12th April Morning Shift \u00b7 Diagnostic Hub \u00b7 QMOLE-Q19 \u00b7 Mole Concept",
    "subjectCode": "CHEM",
    "subject": "Chemistry",
    "topicCode": "MOLE_CONCEPT",
    "topic": "Mole Concept",
    "subtopic": "CAP-CHEM-MOLE",
    "exam": "JEE Main 2019 (Online) 12th April Morning Shift",
    "year": "2019",
    "paper": "Diagnostic Hub",
    "questionNumber": "MOLE-Q19",
    "section": "FAM-CHEM-MOLE",
    "markingScheme": "+4 / -1",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Mole Concept",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "SINGLE_CHOICE",
    "stem": "A mixture of 20 mL of CO and 20 mL of O\u2082 is sparked in an eudiometer. After complete reaction and cooling to initial room temperature, the total volume of the resulting gas mixture is:",
    "options": [
      {
        "id": "opt-A",
        "text": "30 mL"
      },
      {
        "id": "opt-B",
        "text": "20 mL"
      },
      {
        "id": "opt-C",
        "text": "40 mL"
      },
      {
        "id": "opt-D",
        "text": "10 mL"
      }
    ],
    "hints": [
      "[METHOD] Step 1: Write balanced stoichiometric equation: 2 CO + 1 O\u2082 \u2192 2 CO\u2082.",
      "[METHOD] Step 2: 2 volumes of CO react with 1 volume of O\u2082 to give 2 volumes of CO\u2082.",
      "[METHOD] Step 3: Initial volumes: V_CO = 20 mL, V_O2 = 20 mL."
    ],
    "steps": [
      "Step 1: Write balanced stoichiometric equation: 2 CO + 1 O\u2082 \u2192 2 CO\u2082.",
      "Step 2: 2 volumes of CO react with 1 volume of O\u2082 to give 2 volumes of CO\u2082.",
      "Step 3: Initial volumes: V_CO = 20 mL, V_O2 = 20 mL.",
      "Step 4: CO is limiting: 20 mL of CO consumes 10 mL of O\u2082 and forms 20 mL of CO\u2082.",
      "Step 5: Remaining gases in the eudiometer:",
      "        V_CO = 0 mL (completely consumed)",
      "        V_O2 (unreacted excess) = 20 mL - 10 mL = 10 mL",
      "        V_CO2 (formed) = 20 mL",
      "Step 6: Total final gas volume = 10 mL (O\u2082) + 20 mL (CO\u2082) = 30 mL."
    ],
    "limitingCheck": "Independent check: recompute the governing relation and verify that the stem constraints select 30 mL (Option A).",
    "check": "Independent check: recompute the governing relation and verify that the stem constraints select 30 mL (Option A).",
    "trapWarning": "Do not forget the UNREACTED EXCESS O\u2082 (10 mL)! The resulting mixture consists of both formed CO\u2082 (20 mL) and leftover O\u2082 (10 mL).",
    "correctKey": "opt-A",
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 4,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Chemistry)"
  },
  {
    "id": "MOLE-Q20",
    "code": "MOLE-Q20",
    "title": "JEE Main 2018 (Offline) 8th April Shift \u00b7 Diagnostic Hub \u00b7 QMOLE-Q20 \u00b7 Mole Concept",
    "subjectCode": "CHEM",
    "subject": "Chemistry",
    "topicCode": "MOLE_CONCEPT",
    "topic": "Mole Concept",
    "subtopic": "CAP-CHEM-MOLE",
    "exam": "JEE Main 2018 (Offline) 8th April Shift",
    "year": "2018",
    "paper": "Diagnostic Hub",
    "questionNumber": "MOLE-Q20",
    "section": "FAM-CHEM-MOLE",
    "markingScheme": "+4 / -1",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Mole Concept",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "SINGLE_CHOICE",
    "stem": "Which of the following samples contains the MAXIMUM number of molecules?",
    "options": [
      {
        "id": "opt-A",
        "text": "1.0 g of H\u2082"
      },
      {
        "id": "opt-B",
        "text": "1.0 g of O\u2082"
      },
      {
        "id": "opt-C",
        "text": "1.0 g of N\u2082"
      },
      {
        "id": "opt-D",
        "text": "1.0 g of CH\u2084"
      }
    ],
    "hints": [
      "[METHOD] Step 1: Number of molecules in equal mass m = 1.0 g is inversely proportional to molar mass M: N \u221d 1 / M.",
      "[METHOD] Step 2: For 1.0 g H\u2082: M = 2 g/mol \u21d2 Moles = 1.0 / 2 = 0.50 mol \u21d2 N = 0.50 N_A.",
      "[METHOD] Step 3: For 1.0 g CH\u2084: M = 16 g/mol \u21d2 Moles = 1.0 / 16 = 0.0625 mol \u21d2 N = 0.0625 N_A."
    ],
    "steps": [
      "Step 1: Number of molecules in equal mass m = 1.0 g is inversely proportional to molar mass M: N \u221d 1 / M.",
      "Step 2: For 1.0 g H\u2082: M = 2 g/mol \u21d2 Moles = 1.0 / 2 = 0.50 mol \u21d2 N = 0.50 N_A.",
      "Step 3: For 1.0 g CH\u2084: M = 16 g/mol \u21d2 Moles = 1.0 / 16 = 0.0625 mol \u21d2 N = 0.0625 N_A.",
      "Step 4: For 1.0 g N\u2082: M = 28 g/mol \u21d2 Moles = 1.0 / 28 = 0.0357 mol \u21d2 N = 0.0357 N_A.",
      "Step 5: For 1.0 g O\u2082: M = 32 g/mol \u21d2 Moles = 1.0 / 32 = 0.03125 mol \u21d2 N = 0.03125 N_A.",
      "Step 6: Comparing molecules: H\u2082 (0.50 N_A) >> CH\u2084 (0.0625 N_A) > N\u2082 (0.0357 N_A) > O\u2082 (0.03125 N_A)."
    ],
    "limitingCheck": "Independent check: recompute the governing relation and verify that the stem constraints select 1.0 g of H\u2082 (Option A).",
    "check": "Independent check: recompute the governing relation and verify that the stem constraints select 1.0 g of H\u2082 (Option A).",
    "trapWarning": "Smallest molar mass gives the HIGHEST number of molecules per gram! H\u2082 has M = 2, so it has 16 times more molecules than equal mass of O\u2082.",
    "correctKey": "opt-A",
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 4,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Chemistry)"
  },
  {
    "id": "Q-MAT-LEQ-01-EXEMPLAR8-Q6",
    "code": "Q-MAT-LEQ-01-EXEMPLAR8-Q6",
    "title": "NCERT Exemplar \u00b7 Class 8/9 Mathematics \u00b7 QQ6 \u00b7 Linear Equations in One Variable",
    "subjectCode": "MATH",
    "subject": "Mathematics",
    "topicCode": "LINEAR_EQUATIONS_IN_ONE_VARIABLE",
    "topic": "Linear Equations in One Variable",
    "subtopic": "CAP-MAT-LEQ-01-SUBSTITUTION-CHECK",
    "exam": "NCERT Exemplar",
    "year": 2024,
    "paper": "Class 8/9 Mathematics",
    "questionNumber": "Q6",
    "section": "FAM-MAT-LEQ-01-SUBSTITUTION",
    "markingScheme": "+4 / -1",
    "difficultyBand": "D1",
    "difficultyScore": 1,
    "difficultyBasis": "Assessed at cognitive difficulty D1",
    "cognitiveComponents": {
      "concept_model_selection": 1,
      "representation_translation": 1,
      "reasoning_chain_length": 1,
      "algebra_computational_load": 0,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "SINGLE_CHOICE",
    "stem": "The value of x for which the expressions 3x \u2013 4 and 2x + 1 become equal is",
    "options": [
      {
        "id": "opt-A",
        "text": "(a) \u20133"
      },
      {
        "id": "opt-B",
        "text": "(b) 0"
      },
      {
        "id": "opt-C",
        "text": "(c) 5"
      },
      {
        "id": "opt-D",
        "text": "(d) 1"
      }
    ],
    "hints": [
      "[CONCEPT] What must be true of the two expressions at the value you are looking for? Write it with an equality sign.",
      "[METHOD] Put the options in a table with one column for 3x \u2212 4 and one for 2x + 1.",
      "[METHOD] Start with option (a): 3(\u22123) \u2212 4 and 2(\u22123) + 1. Are these equal? Continue down the list."
    ],
    "steps": [
      "'Become equal' means 3x \u2212 4 = 2x + 1.",
      "Test each option in both expressions: \u22123 gives \u221213 and \u22125; 0 gives \u22124 and 1; 5 gives 11 and 11; 1 gives \u22121 and 3.",
      "Only x = 5 makes the two values equal, so the answer is (c), matching the official key."
    ],
    "limitingCheck": "At x = 5: 3(5) \u2212 4 = 11 and 2(5) + 1 = 11.",
    "check": "At x = 5: 3(5) \u2212 4 = 11 and 2(5) + 1 = 11.",
    "trapWarning": "Misapplying direct single-step formula without verifying boundary conditions.",
    "correctKey": "opt-C",
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 4,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Mathematics)"
  },
  {
    "id": "Q-MAT-LEQ-01-EXEMPLAR8-Q17",
    "code": "Q-MAT-LEQ-01-EXEMPLAR8-Q17",
    "title": "NCERT Exemplar \u00b7 Class 8/9 Mathematics \u00b7 QQ17 \u00b7 Linear Equations in One Variable",
    "subjectCode": "MATH",
    "subject": "Mathematics",
    "topicCode": "LINEAR_EQUATIONS_IN_ONE_VARIABLE",
    "topic": "Linear Equations in One Variable",
    "subtopic": "CAP-MAT-LEQ-01-SUBSTITUTION-CHECK",
    "exam": "NCERT Exemplar",
    "year": 2024,
    "paper": "Class 8/9 Mathematics",
    "questionNumber": "Q17",
    "section": "FAM-MAT-LEQ-01-SUBSTITUTION",
    "markingScheme": "+3 / 0",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Assessed at cognitive difficulty D2",
    "cognitiveComponents": {
      "concept_model_selection": 1,
      "representation_translation": 1,
      "reasoning_chain_length": 1,
      "algebra_computational_load": 0,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "NUMERIC_QUANTITY",
    "stem": "The solution of the equation 3x \u2013 4 = 1 \u2013 2x is _________.",
    "options": [],
    "hints": [
      "[CONCEPT] There are no options this time. What would a value of x have to do to the two sides to be the solution?",
      "[METHOD] Make a table for x = 0, 1, 2 with one column for 3x \u2013 4 and one for 1 \u2013 2x.",
      "[METHOD] At x = 0 the LHS is 5 below the RHS. By how much does that gap shrink each time x goes up by 1?"
    ],
    "steps": [
      "Tabulate both sides for small whole numbers: x = 0 gives \u22124 and 1; x = 1 gives \u22121 and \u22121; x = 2 gives 2 and \u22123.",
      "As x grows by 1 the LHS rises by 3 and the RHS falls by 2, so the sides meet once.",
      "They are equal at x = 1, which matches the official key."
    ],
    "limitingCheck": "Substitute x = 1: 3(1) \u2212 4 = \u22121 and 1 \u2212 2(1) = \u22121.",
    "check": "Substitute x = 1: 3(1) \u2212 4 = \u22121 and 1 \u2212 2(1) = \u22121.",
    "trapWarning": "Misapplying direct single-step formula without verifying boundary conditions.",
    "correctKey": null,
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Mathematics)"
  },
  {
    "id": "Q-MAT-LEQ-01-EXEMPLAR8-Q20",
    "code": "Q-MAT-LEQ-01-EXEMPLAR8-Q20",
    "title": "NCERT Exemplar \u00b7 Class 8/9 Mathematics \u00b7 QQ20 \u00b7 Linear Equations in One Variable",
    "subjectCode": "MATH",
    "subject": "Mathematics",
    "topicCode": "LINEAR_EQUATIONS_IN_ONE_VARIABLE",
    "topic": "Linear Equations in One Variable",
    "subtopic": "CAP-MAT-LEQ-01-SUBSTITUTION-CHECK",
    "exam": "NCERT Exemplar",
    "year": 2024,
    "paper": "Class 8/9 Mathematics",
    "questionNumber": "Q20",
    "section": "FAM-MAT-LEQ-01-SUBSTITUTION",
    "markingScheme": "+3 / 0",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Assessed at cognitive difficulty D2",
    "cognitiveComponents": {
      "concept_model_selection": 1,
      "representation_translation": 1,
      "reasoning_chain_length": 1,
      "algebra_computational_load": 0,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "NUMERIC_QUANTITY",
    "stem": "9x \u2013 _________ = \u201321 has the solution (\u20132)",
    "options": [],
    "hints": [
      "[CONCEPT] Give the blank a name, such as k, and rewrite the equation with it.",
      "[CONCEPT] Your rewritten equation has two letters, x and k. For each one, say whether the question tells you its value or asks you to find it.",
      "[CONCEPT] Name the relation that the words \u2018has the solution (\u20132)\u2019 promise: what must be true of the two sides of the equation at a solution?"
    ],
    "steps": [
      "Call the missing number k, so the equation is 9x \u2212 k = \u221221.",
      "Since \u22122 is the solution, substitute x = \u22122: 9(\u22122) \u2212 k = \u221221, that is \u221218 \u2212 k = \u221221.",
      "So k = \u221218 + 21 = 3, matching the official key."
    ],
    "limitingCheck": "With k = 3: 9(\u22122) \u2212 3 = \u221218 \u2212 3 = \u221221, which is the RHS.",
    "check": "With k = 3: 9(\u22122) \u2212 3 = \u221218 \u2212 3 = \u221221, which is the RHS.",
    "trapWarning": "Misapplying direct single-step formula without verifying boundary conditions.",
    "correctKey": null,
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Mathematics)"
  },
  {
    "id": "Q-MAT-LEQ-02-NCERT8-EX2-1-Q1",
    "code": "Q-MAT-LEQ-02-NCERT8-EX2-1-Q1",
    "title": "NCERT Textbook \u00b7 Class 8/9 Mathematics \u00b7 QQ1 \u00b7 Linear Equations in One Variable",
    "subjectCode": "MATH",
    "subject": "Mathematics",
    "topicCode": "LINEAR_EQUATIONS_IN_ONE_VARIABLE",
    "topic": "Linear Equations in One Variable",
    "subtopic": "CAP-MAT-LEQ-02-SAME-OPERATION-BOTH-SIDES",
    "exam": "NCERT Textbook",
    "year": 2024,
    "paper": "Class 8/9 Mathematics",
    "questionNumber": "Q1",
    "section": "FAM-MAT-LEQ-02-BOTH-SIDES",
    "markingScheme": "+3 / 0",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Assessed at cognitive difficulty D2",
    "cognitiveComponents": {
      "concept_model_selection": 1,
      "representation_translation": 1,
      "reasoning_chain_length": 1,
      "algebra_computational_load": 0,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "NUMERIC_QUANTITY",
    "stem": "Solve the following equation and check your result: 3x = 2x + 18",
    "options": [],
    "hints": [
      "[CONCEPT] Picture the equation as a balance: what is on each pan?",
      "[METHOD] Which x-tiles could you take off both pans at once?",
      "[METHOD] After taking 2x off both pans, what is left on the left, and what on the right?"
    ],
    "steps": [
      "Subtract 2x from both sides: 3x \u2212 2x = 18.",
      "So x = 18, matching the official answer."
    ],
    "limitingCheck": "3(18) = 54 and 2(18) + 18 = 54.",
    "check": "3(18) = 54 and 2(18) + 18 = 54.",
    "trapWarning": "Misapplying direct single-step formula without verifying boundary conditions.",
    "correctKey": null,
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Mathematics)"
  },
  {
    "id": "Q-MAT-LEQ-02-NCERT8-EX2-1-Q2",
    "code": "Q-MAT-LEQ-02-NCERT8-EX2-1-Q2",
    "title": "NCERT Textbook \u00b7 Class 8/9 Mathematics \u00b7 QQ2 \u00b7 Linear Equations in One Variable",
    "subjectCode": "MATH",
    "subject": "Mathematics",
    "topicCode": "LINEAR_EQUATIONS_IN_ONE_VARIABLE",
    "topic": "Linear Equations in One Variable",
    "subtopic": "CAP-MAT-LEQ-02-SAME-OPERATION-BOTH-SIDES",
    "exam": "NCERT Textbook",
    "year": 2024,
    "paper": "Class 8/9 Mathematics",
    "questionNumber": "Q2",
    "section": "FAM-MAT-LEQ-02-BOTH-SIDES",
    "markingScheme": "+3 / 0",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Assessed at cognitive difficulty D2",
    "cognitiveComponents": {
      "concept_model_selection": 1,
      "representation_translation": 1,
      "reasoning_chain_length": 1,
      "algebra_computational_load": 0,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "NUMERIC_QUANTITY",
    "stem": "Solve the following equation and check your result: 5t \u2013 3 = 3t \u2013 5",
    "options": [],
    "hints": [
      "[CONCEPT] Both sides have t-terms and both have negative numbers. Which side will you gather the t-terms on?",
      "[METHOD] Write the result of subtracting 3t from both whole sides before touching the numbers.",
      "[METHOD] From 2t \u2212 3 = \u22125, what do you add to both sides so only 2t is left on the left?"
    ],
    "steps": [
      "Subtract 3t from both sides: 2t \u2212 3 = \u22125.",
      "Add 3 to both sides: 2t = \u22122.",
      "Divide both sides by 2: t = \u22121, matching the official answer."
    ],
    "limitingCheck": "5(\u22121) \u2212 3 = \u22128 and 3(\u22121) \u2212 5 = \u22128.",
    "check": "5(\u22121) \u2212 3 = \u22128 and 3(\u22121) \u2212 5 = \u22128.",
    "trapWarning": "Misapplying direct single-step formula without verifying boundary conditions.",
    "correctKey": null,
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Mathematics)"
  },
  {
    "id": "Q-MAT-LEQ-02-NCERT8-EX2-1-Q3",
    "code": "Q-MAT-LEQ-02-NCERT8-EX2-1-Q3",
    "title": "NCERT Textbook \u00b7 Class 8/9 Mathematics \u00b7 QQ3 \u00b7 Linear Equations in One Variable",
    "subjectCode": "MATH",
    "subject": "Mathematics",
    "topicCode": "LINEAR_EQUATIONS_IN_ONE_VARIABLE",
    "topic": "Linear Equations in One Variable",
    "subtopic": "CAP-MAT-LEQ-02-SAME-OPERATION-BOTH-SIDES",
    "exam": "NCERT Textbook",
    "year": 2024,
    "paper": "Class 8/9 Mathematics",
    "questionNumber": "Q3",
    "section": "FAM-MAT-LEQ-02-BOTH-SIDES",
    "markingScheme": "+3 / 0",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Assessed at cognitive difficulty D2",
    "cognitiveComponents": {
      "concept_model_selection": 1,
      "representation_translation": 1,
      "reasoning_chain_length": 1,
      "algebra_computational_load": 0,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "NUMERIC_QUANTITY",
    "stem": "Solve the following equation and check your result: 5x + 9 = 5 + 3x",
    "options": [],
    "hints": [
      "[CONCEPT] Which terms contain x, and on which sides are they?",
      "[METHOD] Draw the pans: 5 x-tiles and 9 units on the left; 5 units and 3 x-tiles on the right.",
      "[METHOD] After removing 3 x-tiles from both pans, what must you remove from both to leave only x-tiles on the left?"
    ],
    "steps": [
      "Subtract 3x from both sides: 2x + 9 = 5.",
      "Subtract 9 from both sides: 2x = \u22124.",
      "Divide both sides by 2: x = \u22122, matching the official answer."
    ],
    "limitingCheck": "5(\u22122) + 9 = \u22121 and 5 + 3(\u22122) = \u22121.",
    "check": "5(\u22122) + 9 = \u22121 and 5 + 3(\u22122) = \u22121.",
    "trapWarning": "Misapplying direct single-step formula without verifying boundary conditions.",
    "correctKey": null,
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Mathematics)"
  },
  {
    "id": "Q-MAT-LEQ-02-NCERT8-EX2-1-Q5",
    "code": "Q-MAT-LEQ-02-NCERT8-EX2-1-Q5",
    "title": "NCERT Textbook \u00b7 Class 8/9 Mathematics \u00b7 QQ5 \u00b7 Linear Equations in One Variable",
    "subjectCode": "MATH",
    "subject": "Mathematics",
    "topicCode": "LINEAR_EQUATIONS_IN_ONE_VARIABLE",
    "topic": "Linear Equations in One Variable",
    "subtopic": "CAP-MAT-LEQ-02-SAME-OPERATION-BOTH-SIDES",
    "exam": "NCERT Textbook",
    "year": 2024,
    "paper": "Class 8/9 Mathematics",
    "questionNumber": "Q5",
    "section": "FAM-MAT-LEQ-02-BOTH-SIDES",
    "markingScheme": "+3 / 0",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Assessed at cognitive difficulty D2",
    "cognitiveComponents": {
      "concept_model_selection": 1,
      "representation_translation": 1,
      "reasoning_chain_length": 1,
      "algebra_computational_load": 0,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "NUMERIC_QUANTITY",
    "stem": "Solve the following equation and check your result: 2x \u2013 1 = 14 \u2013 x",
    "options": [],
    "hints": [
      "[CONCEPT] Rewrite the right-hand side so each term shows its own sign.",
      "[CONCEPT] On the balance, the right pan holds 14 units and one negative x-tile.",
      "[CONCEPT] Name the relation you will test at the end: for your value of x, which two expressions in the equation must come out equal?"
    ],
    "steps": [
      "The x-term on the RHS is \u2212x, so add x to both sides: 3x \u2212 1 = 14.",
      "Add 1 to both sides: 3x = 15.",
      "Divide both sides by 3: x = 5, matching the official answer."
    ],
    "limitingCheck": "2(5) \u2212 1 = 9 and 14 \u2212 5 = 9.",
    "check": "2(5) \u2212 1 = 9 and 14 \u2212 5 = 9.",
    "trapWarning": "Misapplying direct single-step formula without verifying boundary conditions.",
    "correctKey": null,
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Mathematics)"
  },
  {
    "id": "Q-MAT-LEQ-02-EXEMPLAR9-4-1-Q16",
    "code": "Q-MAT-LEQ-02-EXEMPLAR9-4-1-Q16",
    "title": "NCERT Exemplar \u00b7 Class 8/9 Mathematics \u00b7 QQ16 \u00b7 Linear Equations in One Variable",
    "subjectCode": "MATH",
    "subject": "Mathematics",
    "topicCode": "LINEAR_EQUATIONS_IN_ONE_VARIABLE",
    "topic": "Linear Equations in One Variable",
    "subtopic": "CAP-MAT-LEQ-02-SAME-OPERATION-BOTH-SIDES",
    "exam": "NCERT Exemplar",
    "year": 2024,
    "paper": "Class 8/9 Mathematics",
    "questionNumber": "Q16",
    "section": "FAM-MAT-LEQ-02-BOTH-SIDES",
    "markingScheme": "+4 / -1",
    "difficultyBand": "D1",
    "difficultyScore": 1,
    "difficultyBasis": "Assessed at cognitive difficulty D1",
    "cognitiveComponents": {
      "concept_model_selection": 1,
      "representation_translation": 1,
      "reasoning_chain_length": 1,
      "algebra_computational_load": 0,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "SINGLE_CHOICE",
    "stem": "If we multiply or divide both sides of a linear equation with a non-zero number, then the solution of the linear equation :",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) Changes"
      },
      {
        "id": "opt-B",
        "text": "(B) Remains the same"
      },
      {
        "id": "opt-C",
        "text": "(C) Changes in case of multiplication only"
      },
      {
        "id": "opt-D",
        "text": "(D) Changes in case of division only"
      }
    ],
    "hints": [
      "[CONCEPT] Think of a simple equation whose solution you already know.",
      "[CONCEPT] On a balance, what does multiplying both pans by 3 do to whether it is level?",
      "[METHOD] Solve your equation after multiplying both sides by 3, and again after dividing both sides by 2."
    ],
    "steps": [
      "Multiplying or dividing both sides by the same non-zero number keeps the two sides equal for exactly the same values.",
      "Test: 2x = 10 has x = 5; multiplying both sides by 3 gives 6x = 30, still x = 5; dividing both sides by 2 gives x = 5.",
      "So the solution remains the same, option (B), matching the official key."
    ],
    "limitingCheck": "Every value that makes 2x = 10 true makes 6x = 30 true and conversely, because dividing by 3 undoes the multiplication.",
    "check": "Every value that makes 2x = 10 true makes 6x = 30 true and conversely, because dividing by 3 undoes the multiplication.",
    "trapWarning": "Misapplying direct single-step formula without verifying boundary conditions.",
    "correctKey": "opt-B",
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 4,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Mathematics)"
  },
  {
    "id": "Q-MAT-LEQ-03-NCERT8-EX2-2-Q7",
    "code": "Q-MAT-LEQ-03-NCERT8-EX2-2-Q7",
    "title": "NCERT Textbook \u00b7 Class 8/9 Mathematics \u00b7 QQ7 \u00b7 Linear Equations in One Variable",
    "subjectCode": "MATH",
    "subject": "Mathematics",
    "topicCode": "LINEAR_EQUATIONS_IN_ONE_VARIABLE",
    "topic": "Linear Equations in One Variable",
    "subtopic": "CAP-MAT-LEQ-03-REDUCE-TO-SIMPLER-FORM",
    "exam": "NCERT Textbook",
    "year": 2024,
    "paper": "Class 8/9 Mathematics",
    "questionNumber": "Q7",
    "section": "FAM-MAT-LEQ-03-REDUCTION",
    "markingScheme": "+3 / 0",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Assessed at cognitive difficulty D2",
    "cognitiveComponents": {
      "concept_model_selection": 1,
      "representation_translation": 1,
      "reasoning_chain_length": 1,
      "algebra_computational_load": 0,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "NUMERIC_QUANTITY",
    "stem": "Simplify and solve the following linear equation: 3(t \u2013 3) = 5(2t + 1)",
    "options": [],
    "hints": [
      "[CONCEPT] What must happen to the brackets before any t-term can move?",
      "[METHOD] Draw the area cells for 5(2t + 1): how many cells, and what is in each?",
      "[METHOD] After expanding, which side has more t? Collect there."
    ],
    "steps": [
      "Open both brackets: 3t \u2212 9 = 10t + 5.",
      "Subtract 3t and 5 from both sides: \u221214 = 7t.",
      "Divide both sides by 7: t = \u22122, matching the official answer."
    ],
    "limitingCheck": "3(\u22122 \u2212 3) = \u221215 and 5(\u22124 + 1) = \u221215.",
    "check": "3(\u22122 \u2212 3) = \u221215 and 5(\u22124 + 1) = \u221215.",
    "trapWarning": "Misapplying direct single-step formula without verifying boundary conditions.",
    "correctKey": null,
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Mathematics)"
  },
  {
    "id": "Q-MAT-LEQ-03-NCERT8-EX2-2-Q9",
    "code": "Q-MAT-LEQ-03-NCERT8-EX2-2-Q9",
    "title": "NCERT Textbook \u00b7 Class 8/9 Mathematics \u00b7 QQ9 \u00b7 Linear Equations in One Variable",
    "subjectCode": "MATH",
    "subject": "Mathematics",
    "topicCode": "LINEAR_EQUATIONS_IN_ONE_VARIABLE",
    "topic": "Linear Equations in One Variable",
    "subtopic": "CAP-MAT-LEQ-03-REDUCE-TO-SIMPLER-FORM",
    "exam": "NCERT Textbook",
    "year": 2024,
    "paper": "Class 8/9 Mathematics",
    "questionNumber": "Q9",
    "section": "FAM-MAT-LEQ-03-REDUCTION",
    "markingScheme": "+3 / 0",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Assessed at cognitive difficulty D2",
    "cognitiveComponents": {
      "concept_model_selection": 1,
      "representation_translation": 1,
      "reasoning_chain_length": 1,
      "algebra_computational_load": 0,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "NUMERIC_QUANTITY",
    "stem": "Simplify and solve the following linear equation: 3(5z \u2013 7) \u2013 2(9z \u2013 11) = 4(8z \u2013 13) \u2013 17",
    "options": [],
    "hints": [
      "[CONCEPT] Which bracket is being subtracted, and what is its factor with the sign attached?",
      "[METHOD] Fill the two cells of \u22122(9z \u2212 11) with their signed products.",
      "[METHOD] After expanding, combine the z-terms and the numbers on the left before looking at the right."
    ],
    "steps": [
      "Open the brackets: 15z \u2212 21 \u2212 18z + 22 = 32z \u2212 52 \u2212 17.",
      "Combine on each side: \u22123z + 1 = 32z \u2212 69.",
      "Add 3z and 69 to both sides: 70 = 35z, so z = 2, matching the official answer."
    ],
    "limitingCheck": "LHS: 3(3) \u2212 2(7) = \u22125. RHS: 4(3) \u2212 17 = \u22125.",
    "check": "LHS: 3(3) \u2212 2(7) = \u22125. RHS: 4(3) \u2212 17 = \u22125.",
    "trapWarning": "Misapplying direct single-step formula without verifying boundary conditions.",
    "correctKey": null,
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Mathematics)"
  },
  {
    "id": "Q-MAT-LEQ-03-NCERT8-EX2-2-Q10",
    "code": "Q-MAT-LEQ-03-NCERT8-EX2-2-Q10",
    "title": "NCERT Textbook \u00b7 Class 8/9 Mathematics \u00b7 QQ10 \u00b7 Linear Equations in One Variable",
    "subjectCode": "MATH",
    "subject": "Mathematics",
    "topicCode": "LINEAR_EQUATIONS_IN_ONE_VARIABLE",
    "topic": "Linear Equations in One Variable",
    "subtopic": "CAP-MAT-LEQ-03-REDUCE-TO-SIMPLER-FORM",
    "exam": "NCERT Textbook",
    "year": 2024,
    "paper": "Class 8/9 Mathematics",
    "questionNumber": "Q10",
    "section": "FAM-MAT-LEQ-03-REDUCTION",
    "markingScheme": "+3 / 0",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Assessed at cognitive difficulty D2",
    "cognitiveComponents": {
      "concept_model_selection": 1,
      "representation_translation": 1,
      "reasoning_chain_length": 1,
      "algebra_computational_load": 0,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "NUMERIC_QUANTITY",
    "stem": "Simplify and solve the following linear equation: 0.25(4f \u2013 3) = 0.05(10f \u2013 9)",
    "options": [],
    "hints": [
      "[CONCEPT] Write 0.25 and 0.05 as fractions. What are their denominators?",
      "[CONCEPT] Read each side as a number times a bracket: which terms inside 0.25(4f \u2212 3) does the 0.25 multiply, and what sign does each product keep?",
      "[METHOD] Before you commit, put your f into 0.25(4f \u2212 3) and 0.05(10f \u2212 9) and compare."
    ],
    "steps": [
      "Multiply both sides by 100 to clear the decimals: 25(4f \u2212 3) = 5(10f \u2212 9).",
      "Open the brackets: 100f \u2212 75 = 50f \u2212 45.",
      "Subtract 50f and add 75 on both sides: 50f = 30, so f = 0.6, matching the official answer."
    ],
    "limitingCheck": "0.25(2.4 \u2212 3) = \u22120.15 and 0.05(6 \u2212 9) = \u22120.15.",
    "check": "0.25(2.4 \u2212 3) = \u22120.15 and 0.05(6 \u2212 9) = \u22120.15.",
    "trapWarning": "Misapplying direct single-step formula without verifying boundary conditions.",
    "correctKey": null,
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Mathematics)"
  },
  {
    "id": "Q-MAT-LEQ-03-EXEMPLAR8-Q58",
    "code": "Q-MAT-LEQ-03-EXEMPLAR8-Q58",
    "title": "NCERT Exemplar \u00b7 Class 8/9 Mathematics \u00b7 QQ58 \u00b7 Linear Equations in One Variable",
    "subjectCode": "MATH",
    "subject": "Mathematics",
    "topicCode": "LINEAR_EQUATIONS_IN_ONE_VARIABLE",
    "topic": "Linear Equations in One Variable",
    "subtopic": "CAP-MAT-LEQ-03-REDUCE-TO-SIMPLER-FORM",
    "exam": "NCERT Exemplar",
    "year": 2024,
    "paper": "Class 8/9 Mathematics",
    "questionNumber": "Q58",
    "section": "FAM-MAT-LEQ-03-REDUCTION",
    "markingScheme": "+3 / 0",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Assessed at cognitive difficulty D2",
    "cognitiveComponents": {
      "concept_model_selection": 1,
      "representation_translation": 1,
      "reasoning_chain_length": 1,
      "algebra_computational_load": 0,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "NUMERIC_QUANTITY",
    "stem": "Solve the following equation: 8x \u2013 7 \u2013 3x = 6x \u2013 2x \u2013 3",
    "options": [],
    "hints": [
      "[CONCEPT] Circle the x-terms on the left in one colour and on the right in another, and write each side's total in words.",
      "[METHOD] What is 6x \u2212 2x, and what is 8x \u2212 3x?",
      "[METHOD] From 5x \u2212 7 = 4x \u2212 3, what balanced steps leave x alone?"
    ],
    "steps": [
      "Combine like terms on each side: 5x \u2212 7 = 4x \u2212 3.",
      "Subtract 4x and add 7 on both sides: x = 4, matching the official answer."
    ],
    "limitingCheck": "LHS: 32 \u2212 7 \u2212 12 = 13. RHS: 24 \u2212 8 \u2212 3 = 13.",
    "check": "LHS: 32 \u2212 7 \u2212 12 = 13. RHS: 24 \u2212 8 \u2212 3 = 13.",
    "trapWarning": "Misapplying direct single-step formula without verifying boundary conditions.",
    "correctKey": null,
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Mathematics)"
  },
  {
    "id": "Q-MAT-LEQ-03-EXEMPLAR8-Q61",
    "code": "Q-MAT-LEQ-03-EXEMPLAR8-Q61",
    "title": "NCERT Exemplar \u00b7 Class 8/9 Mathematics \u00b7 QQ61 \u00b7 Linear Equations in One Variable",
    "subjectCode": "MATH",
    "subject": "Mathematics",
    "topicCode": "LINEAR_EQUATIONS_IN_ONE_VARIABLE",
    "topic": "Linear Equations in One Variable",
    "subtopic": "CAP-MAT-LEQ-03-REDUCE-TO-SIMPLER-FORM",
    "exam": "NCERT Exemplar",
    "year": 2024,
    "paper": "Class 8/9 Mathematics",
    "questionNumber": "Q61",
    "section": "FAM-MAT-LEQ-03-REDUCTION",
    "markingScheme": "+3 / 0",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Assessed at cognitive difficulty D2",
    "cognitiveComponents": {
      "concept_model_selection": 1,
      "representation_translation": 1,
      "reasoning_chain_length": 1,
      "algebra_computational_load": 0,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "NUMERIC_QUANTITY",
    "stem": "Solve the following equation: 5(x \u2013 1) \u2013 2(x + 8) = 0",
    "options": [],
    "hints": [
      "[CONCEPT] What is the factor of the second bracket, sign included?",
      "[METHOD] Draw the cells of \u22122(x + 8) and fill each with its signed product.",
      "[METHOD] After expanding, combine the x-terms and the numbers on the left."
    ],
    "steps": [
      "Open the brackets: 5x \u2212 5 \u2212 2x \u2212 16 = 0.",
      "Combine: 3x \u2212 21 = 0.",
      "Add 21 to both sides and divide by 3: x = 7, matching the official answer."
    ],
    "limitingCheck": "5(6) \u2212 2(15) = 30 \u2212 30 = 0.",
    "check": "5(6) \u2212 2(15) = 30 \u2212 30 = 0.",
    "trapWarning": "Misapplying direct single-step formula without verifying boundary conditions.",
    "correctKey": null,
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Mathematics)"
  },
  {
    "id": "Q-MAT-LEQ-04-EXEMPLAR9-4-1-Q1",
    "code": "Q-MAT-LEQ-04-EXEMPLAR9-4-1-Q1",
    "title": "NCERT Exemplar \u00b7 Class 8/9 Mathematics \u00b7 QQ1 \u00b7 Linear Equations in One Variable",
    "subjectCode": "MATH",
    "subject": "Mathematics",
    "topicCode": "LINEAR_EQUATIONS_IN_ONE_VARIABLE",
    "topic": "Linear Equations in One Variable",
    "subtopic": "CAP-MAT-LEQ-04-TWO-VARIABLE-SOLUTIONS",
    "exam": "NCERT Exemplar",
    "year": 2024,
    "paper": "Class 8/9 Mathematics",
    "questionNumber": "Q1",
    "section": "FAM-MAT-LEQ-04-TWO-VARIABLES",
    "markingScheme": "+4 / -1",
    "difficultyBand": "D1",
    "difficultyScore": 1,
    "difficultyBasis": "Assessed at cognitive difficulty D1",
    "cognitiveComponents": {
      "concept_model_selection": 1,
      "representation_translation": 1,
      "reasoning_chain_length": 1,
      "algebra_computational_load": 0,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "SINGLE_CHOICE",
    "stem": "The linear equation 2x \u2013 5y = 7 has",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) A unique solution"
      },
      {
        "id": "opt-B",
        "text": "(B) Two solutions"
      },
      {
        "id": "opt-C",
        "text": "(C) Infinitely many solutions"
      },
      {
        "id": "opt-D",
        "text": "(D) No solution"
      }
    ],
    "hints": [
      "[CONCEPT] How many unknowns does 2x \u2212 5y = 7 have, and what does one solution look like?",
      "[METHOD] Make a table: choose x = 1, then x = 6, and find y each time.",
      "[METHOD] Could you have chosen any other x? What does that say about the number of solutions?"
    ],
    "steps": [
      "2x \u2212 5y = 7 has the form ax + by + c = 0 with a = 2, b = \u22125, both non-zero.",
      "Any x gives a matching y: x = 1 gives y = \u22121, x = 6 gives y = 1.",
      "So there are infinitely many solutions, option (C), matching the official key."
    ],
    "limitingCheck": "(1, \u22121): 2 + 5 = 7. (6, 1): 12 \u2212 5 = 7.",
    "check": "(1, \u22121): 2 + 5 = 7. (6, 1): 12 \u2212 5 = 7.",
    "trapWarning": "Misapplying direct single-step formula without verifying boundary conditions.",
    "correctKey": "opt-C",
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 4,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Mathematics)"
  },
  {
    "id": "Q-MAT-LEQ-04-EXEMPLAR9-4-1-Q3",
    "code": "Q-MAT-LEQ-04-EXEMPLAR9-4-1-Q3",
    "title": "NCERT Exemplar \u00b7 Class 8/9 Mathematics \u00b7 QQ3 \u00b7 Linear Equations in One Variable",
    "subjectCode": "MATH",
    "subject": "Mathematics",
    "topicCode": "LINEAR_EQUATIONS_IN_ONE_VARIABLE",
    "topic": "Linear Equations in One Variable",
    "subtopic": "CAP-MAT-LEQ-04-TWO-VARIABLE-SOLUTIONS",
    "exam": "NCERT Exemplar",
    "year": 2024,
    "paper": "Class 8/9 Mathematics",
    "questionNumber": "Q3",
    "section": "FAM-MAT-LEQ-04-TWO-VARIABLES",
    "markingScheme": "+4 / -1",
    "difficultyBand": "D1",
    "difficultyScore": 1,
    "difficultyBasis": "Assessed at cognitive difficulty D1",
    "cognitiveComponents": {
      "concept_model_selection": 1,
      "representation_translation": 1,
      "reasoning_chain_length": 1,
      "algebra_computational_load": 0,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "SINGLE_CHOICE",
    "stem": "If (2, 0) is a solution of the linear equation 2x + 3y = k, then the value of k is",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) 4"
      },
      {
        "id": "opt-B",
        "text": "(B) 6"
      },
      {
        "id": "opt-C",
        "text": "(C) 5"
      },
      {
        "id": "opt-D",
        "text": "(D) 2"
      }
    ],
    "hints": [
      "[CONCEPT] Which number in (2, 0) is x and which is y?",
      "[CONCEPT] The equation has three letters: x, y and k. Which of them does the question give you values for, and which one does it ask you to find?",
      "[CONCEPT] Name the relation that the word \u2018solution\u2019 promises: what must be true of the two sides of 2x + 3y = k at a pair that is a solution?"
    ],
    "steps": [
      "A solution makes the equation true, so put x = 2 and y = 0 into 2x + 3y = k.",
      "2(2) + 3(0) = k, so k = 4, option (A), matching the official key."
    ],
    "limitingCheck": "With k = 4, the pair (2, 0) gives 4 + 0 = 4.",
    "check": "With k = 4, the pair (2, 0) gives 4 + 0 = 4.",
    "trapWarning": "Misapplying direct single-step formula without verifying boundary conditions.",
    "correctKey": "opt-A",
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 4,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Mathematics)"
  },
  {
    "id": "Q-MAT-LEQ-04-EXEMPLAR9-4-1-Q11",
    "code": "Q-MAT-LEQ-04-EXEMPLAR9-4-1-Q11",
    "title": "NCERT Exemplar \u00b7 Class 8/9 Mathematics \u00b7 QQ11 \u00b7 Linear Equations in One Variable",
    "subjectCode": "MATH",
    "subject": "Mathematics",
    "topicCode": "LINEAR_EQUATIONS_IN_ONE_VARIABLE",
    "topic": "Linear Equations in One Variable",
    "subtopic": "CAP-MAT-LEQ-04-TWO-VARIABLE-SOLUTIONS",
    "exam": "NCERT Exemplar",
    "year": 2024,
    "paper": "Class 8/9 Mathematics",
    "questionNumber": "Q11",
    "section": "FAM-MAT-LEQ-04-TWO-VARIABLES",
    "markingScheme": "+4 / -1",
    "difficultyBand": "D1",
    "difficultyScore": 1,
    "difficultyBasis": "Assessed at cognitive difficulty D1",
    "cognitiveComponents": {
      "concept_model_selection": 1,
      "representation_translation": 1,
      "reasoning_chain_length": 1,
      "algebra_computational_load": 0,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "SINGLE_CHOICE",
    "stem": "x = 5, y = 2 is a solution of the linear equation",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) x + 2y = 7"
      },
      {
        "id": "opt-B",
        "text": "(B) 5x + 2y = 7"
      },
      {
        "id": "opt-C",
        "text": "(C) x + y = 7"
      },
      {
        "id": "opt-D",
        "text": "(D) 5x + y = 7"
      }
    ],
    "hints": [
      "[CONCEPT] Are 5 and 2 the coefficients or the values of x and y?",
      "[METHOD] Make a four-row table: each option's left side with x = 5 and y = 2.",
      "[METHOD] Compute option (A): 5 + 2 \u00d7 2. Carry on down the list."
    ],
    "steps": [
      "(A): 5 + 4 = 9. (B): 25 + 4 = 29. (C): 5 + 2 = 7. (D): 25 + 2 = 27.",
      "Only (C) gives 7, matching the official key."
    ],
    "limitingCheck": "5 + 2 = 7.",
    "check": "5 + 2 = 7.",
    "trapWarning": "Misapplying direct single-step formula without verifying boundary conditions.",
    "correctKey": "opt-C",
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 4,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Mathematics)"
  },
  {
    "id": "Q-MAT-LEQ-04-EXEMPLAR9-4-2-Q1",
    "code": "Q-MAT-LEQ-04-EXEMPLAR9-4-2-Q1",
    "title": "NCERT Exemplar \u00b7 Class 8/9 Mathematics \u00b7 QQ1 \u00b7 Linear Equations in One Variable",
    "subjectCode": "MATH",
    "subject": "Mathematics",
    "topicCode": "LINEAR_EQUATIONS_IN_ONE_VARIABLE",
    "topic": "Linear Equations in One Variable",
    "subtopic": "CAP-MAT-LEQ-04-TWO-VARIABLE-SOLUTIONS",
    "exam": "NCERT Exemplar",
    "year": 2024,
    "paper": "Class 8/9 Mathematics",
    "questionNumber": "Q1",
    "section": "FAM-MAT-LEQ-04-TWO-VARIABLES",
    "markingScheme": "+3 / 0",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Assessed at cognitive difficulty D2",
    "cognitiveComponents": {
      "concept_model_selection": 1,
      "representation_translation": 1,
      "reasoning_chain_length": 1,
      "algebra_computational_load": 0,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "JUSTIFY",
    "kind": "NUMERIC_QUANTITY",
    "stem": "Write whether the following statement is True or False? Justify your answer: The point (0, 3) lies on the graph of the linear equation 3x + 4y = 12.",
    "options": [],
    "hints": [
      "[CONCEPT] What has to be true of a point's coordinates for it to be on the graph of an equation?",
      "[METHOD] Plot the line through (4, 0) and look at where it meets the y-axis.",
      "[METHOD] Put x = 0 and y = 3 into 3x + 4y. Is it 12?"
    ],
    "steps": [
      "Every point on the graph represents a solution, and every solution is a point on it.",
      "Substitute x = 0, y = 3: 3(0) + 4(3) = 12.",
      "So (0, 3) lies on the graph: True, as the official answer states."
    ],
    "limitingCheck": "(0, 3) is the y-axis crossing: putting x = 0 gives 4y = 12, y = 3.",
    "check": "(0, 3) is the y-axis crossing: putting x = 0 gives 4y = 12, y = 3.",
    "trapWarning": "Misapplying direct single-step formula without verifying boundary conditions.",
    "correctKey": null,
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Mathematics)"
  },
  {
    "id": "Q-MAT-LEQ-04-EXEMPLAR9-4-3-Q7",
    "code": "Q-MAT-LEQ-04-EXEMPLAR9-4-3-Q7",
    "title": "NCERT Exemplar \u00b7 Class 8/9 Mathematics \u00b7 QQ7 \u00b7 Linear Equations in One Variable",
    "subjectCode": "MATH",
    "subject": "Mathematics",
    "topicCode": "LINEAR_EQUATIONS_IN_ONE_VARIABLE",
    "topic": "Linear Equations in One Variable",
    "subtopic": "CAP-MAT-LEQ-04-TWO-VARIABLE-SOLUTIONS",
    "exam": "NCERT Exemplar",
    "year": 2024,
    "paper": "Class 8/9 Mathematics",
    "questionNumber": "Q7",
    "section": "FAM-MAT-LEQ-04-TWO-VARIABLES",
    "markingScheme": "+3 / 0",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Assessed at cognitive difficulty D2",
    "cognitiveComponents": {
      "concept_model_selection": 1,
      "representation_translation": 1,
      "reasoning_chain_length": 1,
      "algebra_computational_load": 0,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "NUMERIC_QUANTITY",
    "stem": "How many solution(s) of the equation 2x + 1 = x \u2013 3 are there on the : (i) Number line (ii) Cartesian plane",
    "options": [],
    "hints": [
      "[METHOD] Solve 2x + 1 = x \u2212 3 for x first.",
      "[CONCEPT] On a number line, a solution is a point with one coordinate. On the plane, what does a solution point look like?",
      "[CONCEPT] Name the relation that decides both counts: a candidate is a solution exactly when it makes 2x + 1 and x \u2212 3 equal. Before you commit, apply it to whatever a candidate is in each setting."
    ],
    "steps": [
      "On the number line: subtract x and 1 from both sides to get x = \u22124, one solution.",
      "On the Cartesian plane a solution is a pair (x, y); y does not appear, so any y works with x = \u22124.",
      "(\u22124, 0), (\u22124, 1), (\u22124, 2), \u2026 all satisfy it: infinitely many, matching the official answer."
    ],
    "limitingCheck": "2(\u22124) + 1 = \u22127 and \u22124 \u2212 3 = \u22127, whatever y is.",
    "check": "2(\u22124) + 1 = \u22127 and \u22124 \u2212 3 = \u22127, whatever y is.",
    "trapWarning": "Misapplying direct single-step formula without verifying boundary conditions.",
    "correctKey": null,
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Mathematics)"
  },
  {
    "id": "Q-MAT-POLY-NCERT9-EX21-Q01",
    "code": "Q-MAT-POLY-NCERT9-EX21-Q01",
    "title": "NCERT Exemplar \u00b7 Class IX Mathematics \u00b7 Unit 2 Polynomials \u00b7 QEx 2.1 Q1 \u00b7 Polynomials",
    "subjectCode": "MATH",
    "subject": "Mathematics",
    "topicCode": "POLYNOMIALS",
    "topic": "Polynomials",
    "subtopic": "CAP-MAT-POLY-FORM-DEGREE-BASIC",
    "exam": "NCERT Exemplar",
    "year": 2024,
    "paper": "Class IX Mathematics \u00b7 Unit 2 Polynomials",
    "questionNumber": "Ex 2.1 Q1",
    "section": "FAM-MAT-POLY-FORM-DEGREE",
    "markingScheme": "+4 / -1",
    "difficultyBand": "D2",
    "difficultyScore": 3,
    "difficultyBasis": "Assessed at cognitive difficulty D2",
    "cognitiveComponents": {
      "concept_model_selection": 1,
      "representation_translation": 1,
      "reasoning_chain_length": 1,
      "algebra_computational_load": 0,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "SINGLE_CHOICE",
    "stem": "Which of the following is a polynomial?",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) x\u00b2/2 - 2/x\u00b2"
      },
      {
        "id": "opt-B",
        "text": "(B) \u221a(2x) - 1"
      },
      {
        "id": "opt-C",
        "text": "(C) x\u00b2 + 3x^(3/2)/\u221ax"
      },
      {
        "id": "opt-D",
        "text": "(D) (x - 1)/(x + 1)"
      }
    ],
    "hints": [
      "[CONCEPT] Compare the exponent structure of each option after valid algebraic rewriting.",
      "[METHOD] Simplify 3x^(3/2)/sqrt(x) to 3x under the NCERT algebraic-expression convention."
    ],
    "steps": [
      "Compare the exponent structure of each option after valid algebraic rewriting. Option C is the only candidate that can simplify to polynomial form..",
      "Simplify 3x^(3/2)/sqrt(x) to 3x under the NCERT algebraic-expression convention. x\u00b2 + 3x.",
      "Check that the other options retain x^(-2), x^(1/2), or a variable denominator. Only option C remains.."
    ],
    "limitingCheck": "Option C simplifies to x\u00b2 + 3x under NCERT's convention; A, B and D retain non-polynomial forms.",
    "check": "Option C simplifies to x\u00b2 + 3x under NCERT's convention; A, B and D retain non-polynomial forms.",
    "trapWarning": "Rejecting option C because its unsimplified display contains fractional powers, without applying the NCERT simplification convention.",
    "correctKey": "opt-C",
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 4,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Mathematics)"
  },
  {
    "id": "Q-MAT-POLY-NCERT9-EX21-Q02",
    "code": "Q-MAT-POLY-NCERT9-EX21-Q02",
    "title": "NCERT Exemplar \u00b7 Class IX Mathematics \u00b7 Unit 2 Polynomials \u00b7 QEx 2.1 Q2 \u00b7 Polynomials",
    "subjectCode": "MATH",
    "subject": "Mathematics",
    "topicCode": "POLYNOMIALS",
    "topic": "Polynomials",
    "subtopic": "CAP-MAT-POLY-FORM-DEGREE-BASIC",
    "exam": "NCERT Exemplar",
    "year": 2024,
    "paper": "Class IX Mathematics \u00b7 Unit 2 Polynomials",
    "questionNumber": "Ex 2.1 Q2",
    "section": "FAM-MAT-POLY-FORM-DEGREE",
    "markingScheme": "+4 / -1",
    "difficultyBand": "D1",
    "difficultyScore": 1,
    "difficultyBasis": "Assessed at cognitive difficulty D1",
    "cognitiveComponents": {
      "concept_model_selection": 1,
      "representation_translation": 1,
      "reasoning_chain_length": 1,
      "algebra_computational_load": 0,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "SINGLE_CHOICE",
    "stem": "\u221a2 is a polynomial of degree",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) 2"
      },
      {
        "id": "opt-B",
        "text": "(B) 0"
      },
      {
        "id": "opt-C",
        "text": "(C) 1"
      },
      {
        "id": "opt-D",
        "text": "(D) 1/2"
      }
    ],
    "hints": [
      "[CONCEPT] Recognize sqrt(2) as a non-zero constant coefficient, not a power of x.",
      "[METHOD] Write sqrt(2) as sqrt(2)\u00b7x^0."
    ],
    "steps": [
      "Recognize sqrt(2) as a non-zero constant coefficient, not a power of x. a non-zero constant polynomial.",
      "Write sqrt(2) as sqrt(2)\u00b7x^0. degree 0.",
      "Confirm that no positive power of x appears. option B."
    ],
    "limitingCheck": "sqrt(2)=sqrt(2)\u00b7x^0, so the degree is 0.",
    "check": "sqrt(2)=sqrt(2)\u00b7x^0, so the degree is 0.",
    "trapWarning": "Treating an irrational coefficient as an irrational exponent.",
    "correctKey": "opt-B",
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 4,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Mathematics)"
  },
  {
    "id": "Q-MAT-POLY-NCERT9-EX21-Q03",
    "code": "Q-MAT-POLY-NCERT9-EX21-Q03",
    "title": "NCERT Exemplar \u00b7 Class IX Mathematics \u00b7 Unit 2 Polynomials \u00b7 QEx 2.1 Q3 \u00b7 Polynomials",
    "subjectCode": "MATH",
    "subject": "Mathematics",
    "topicCode": "POLYNOMIALS",
    "topic": "Polynomials",
    "subtopic": "CAP-MAT-POLY-FORM-DEGREE-BASIC",
    "exam": "NCERT Exemplar",
    "year": 2024,
    "paper": "Class IX Mathematics \u00b7 Unit 2 Polynomials",
    "questionNumber": "Ex 2.1 Q3",
    "section": "FAM-MAT-POLY-FORM-DEGREE",
    "markingScheme": "+4 / -1",
    "difficultyBand": "D1",
    "difficultyScore": 1,
    "difficultyBasis": "Assessed at cognitive difficulty D1",
    "cognitiveComponents": {
      "concept_model_selection": 1,
      "representation_translation": 1,
      "reasoning_chain_length": 1,
      "algebra_computational_load": 0,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "SINGLE_CHOICE",
    "stem": "Degree of the polynomial 4x\u2074 + 0x\u00b3 + 0x\u2075 + 5x + 7 is",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) 4"
      },
      {
        "id": "opt-B",
        "text": "(B) 5"
      },
      {
        "id": "opt-C",
        "text": "(C) 3"
      },
      {
        "id": "opt-D",
        "text": "(D) 7"
      }
    ],
    "hints": [
      "[CONCEPT] Discard terms whose coefficient is zero when identifying the degree.",
      "[METHOD] Choose the greatest exponent among the remaining non-zero terms."
    ],
    "steps": [
      "Discard terms whose coefficient is zero when identifying the degree. non-zero terms 4x^4, 5x, 7.",
      "Choose the greatest exponent among the remaining non-zero terms. degree 4.",
      "Check that no non-zero x^5 term remains. option A."
    ],
    "limitingCheck": "The x^5 coefficient is 0, so the highest non-zero power is x^4.",
    "check": "The x^5 coefficient is 0, so the highest non-zero power is x^4.",
    "trapWarning": "Reading the written x^5 exponent without noticing its coefficient is zero.",
    "correctKey": "opt-A",
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 4,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Mathematics)"
  },
  {
    "id": "Q-MAT-POLY-NCERT9-EX21-Q04",
    "code": "Q-MAT-POLY-NCERT9-EX21-Q04",
    "title": "NCERT Exemplar \u00b7 Class IX Mathematics \u00b7 Unit 2 Polynomials \u00b7 QEx 2.1 Q4 \u00b7 Polynomials",
    "subjectCode": "MATH",
    "subject": "Mathematics",
    "topicCode": "POLYNOMIALS",
    "topic": "Polynomials",
    "subtopic": "CAP-MAT-POLY-FORM-DEGREE-BASIC",
    "exam": "NCERT Exemplar",
    "year": 2024,
    "paper": "Class IX Mathematics \u00b7 Unit 2 Polynomials",
    "questionNumber": "Ex 2.1 Q4",
    "section": "FAM-MAT-POLY-FORM-DEGREE",
    "markingScheme": "+4 / -1",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Assessed at cognitive difficulty D2",
    "cognitiveComponents": {
      "concept_model_selection": 1,
      "representation_translation": 1,
      "reasoning_chain_length": 1,
      "algebra_computational_load": 0,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "SINGLE_CHOICE",
    "stem": "Degree of the zero polynomial is",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) 0"
      },
      {
        "id": "opt-B",
        "text": "(B) 1"
      },
      {
        "id": "opt-C",
        "text": "(C) Any natural number"
      },
      {
        "id": "opt-D",
        "text": "(D) Not defined"
      }
    ],
    "hints": [
      "[CONCEPT] Recall that degree is read from the highest term with non-zero coefficient.",
      "[METHOD] Treat the zero polynomial as the exceptional case rather than as a constant with a non-zero coefficient."
    ],
    "steps": [
      "Recall that degree is read from the highest term with non-zero coefficient. no non-zero term exists.",
      "Treat the zero polynomial as the exceptional case rather than as a constant with a non-zero coefficient. degree not defined.",
      "Match the exceptional-case statement to the options. option D."
    ],
    "limitingCheck": "The zero polynomial has no highest non-zero term, so its degree is not defined.",
    "check": "The zero polynomial has no highest non-zero term, so its degree is not defined.",
    "trapWarning": "Assigning degree 0 because the polynomial's value is written as 0.",
    "correctKey": "opt-D",
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 4,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Mathematics)"
  },
  {
    "id": "Q-MAT-POLY-NCERT9-EX21-Q05",
    "code": "Q-MAT-POLY-NCERT9-EX21-Q05",
    "title": "NCERT Exemplar \u00b7 Class IX Mathematics \u00b7 Unit 2 Polynomials \u00b7 QEx 2.1 Q5 \u00b7 Polynomials",
    "subjectCode": "MATH",
    "subject": "Mathematics",
    "topicCode": "POLYNOMIALS",
    "topic": "Polynomials",
    "subtopic": "CAP-MAT-POLY-EVALUATE-BASIC",
    "exam": "NCERT Exemplar",
    "year": 2024,
    "paper": "Class IX Mathematics \u00b7 Unit 2 Polynomials",
    "questionNumber": "Ex 2.1 Q5",
    "section": "FAM-MAT-POLY-EVALUATION",
    "markingScheme": "+4 / -1",
    "difficultyBand": "D2",
    "difficultyScore": 3,
    "difficultyBasis": "Assessed at cognitive difficulty D2",
    "cognitiveComponents": {
      "concept_model_selection": 1,
      "representation_translation": 1,
      "reasoning_chain_length": 1,
      "algebra_computational_load": 0,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "SINGLE_CHOICE",
    "stem": "If p(x) = x\u00b2 - 2\u221a2x + 1, then p(2\u221a2) is equal to",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) 0"
      },
      {
        "id": "opt-B",
        "text": "(B) 1"
      },
      {
        "id": "opt-C",
        "text": "(C) 4\u221a2"
      },
      {
        "id": "opt-D",
        "text": "(D) 8\u221a2 + 1"
      }
    ],
    "hints": [
      "[CONCEPT] Substitute x=2sqrt(2) into every x in p(x).",
      "[METHOD] Evaluate the two radical products exactly."
    ],
    "steps": [
      "Substitute x=2sqrt(2) into every x in p(x). (2sqrt(2))\u00b2 - 2sqrt(2)(2sqrt(2)) + 1.",
      "Evaluate the two radical products exactly. 8 - 8 + 1 = 1.",
      "Combine the terms and compare with the options. option B."
    ],
    "limitingCheck": "p(2sqrt(2))=8-8+1=1.",
    "check": "p(2sqrt(2))=8-8+1=1.",
    "trapWarning": "Squaring only the 2 and not sqrt(2), or mishandling the product of radicals.",
    "correctKey": "opt-B",
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 4,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Mathematics)"
  },
  {
    "id": "Q-MAT-POLY-NCERT9-EX21-Q06",
    "code": "Q-MAT-POLY-NCERT9-EX21-Q06",
    "title": "NCERT Exemplar \u00b7 Class IX Mathematics \u00b7 Unit 2 Polynomials \u00b7 QEx 2.1 Q6 \u00b7 Polynomials",
    "subjectCode": "MATH",
    "subject": "Mathematics",
    "topicCode": "POLYNOMIALS",
    "topic": "Polynomials",
    "subtopic": "CAP-MAT-POLY-EVALUATE-BASIC",
    "exam": "NCERT Exemplar",
    "year": 2024,
    "paper": "Class IX Mathematics \u00b7 Unit 2 Polynomials",
    "questionNumber": "Ex 2.1 Q6",
    "section": "FAM-MAT-POLY-EVALUATION",
    "markingScheme": "+4 / -1",
    "difficultyBand": "D1",
    "difficultyScore": 1,
    "difficultyBasis": "Assessed at cognitive difficulty D1",
    "cognitiveComponents": {
      "concept_model_selection": 1,
      "representation_translation": 1,
      "reasoning_chain_length": 1,
      "algebra_computational_load": 0,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "SINGLE_CHOICE",
    "stem": "The value of the polynomial 5x - 4x\u00b2 + 3, when x = -1 is",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) -6"
      },
      {
        "id": "opt-B",
        "text": "(B) 6"
      },
      {
        "id": "opt-C",
        "text": "(C) 2"
      },
      {
        "id": "opt-D",
        "text": "(D) -2"
      }
    ],
    "hints": [
      "[CONCEPT] Substitute x=-1 with parentheses into 5x-4x\u00b2+3.",
      "[METHOD] Evaluate the power first and simplify the terms."
    ],
    "steps": [
      "Substitute x=-1 with parentheses into 5x-4x\u00b2+3. 5(-1)-4(-1)\u00b2+3.",
      "Evaluate the power first and simplify the terms. -6.",
      "Compare -6 with the choices. option A."
    ],
    "limitingCheck": "5(-1)-4(1)+3=-6.",
    "check": "5(-1)-4(1)+3=-6.",
    "trapWarning": "Forgetting that (-1)\u00b2=1 or losing the negative coefficient on -4x\u00b2.",
    "correctKey": "opt-A",
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 4,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Mathematics)"
  },
  {
    "id": "Q-MAT-POLY-NCERT9-EX21-Q07",
    "code": "Q-MAT-POLY-NCERT9-EX21-Q07",
    "title": "NCERT Exemplar \u00b7 Class IX Mathematics \u00b7 Unit 2 Polynomials \u00b7 QEx 2.1 Q7 \u00b7 Polynomials",
    "subjectCode": "MATH",
    "subject": "Mathematics",
    "topicCode": "POLYNOMIALS",
    "topic": "Polynomials",
    "subtopic": "CAP-MAT-POLY-EVALUATE-BASIC",
    "exam": "NCERT Exemplar",
    "year": 2024,
    "paper": "Class IX Mathematics \u00b7 Unit 2 Polynomials",
    "questionNumber": "Ex 2.1 Q7",
    "section": "FAM-MAT-POLY-EVALUATION",
    "markingScheme": "+4 / -1",
    "difficultyBand": "D1",
    "difficultyScore": 2,
    "difficultyBasis": "Assessed at cognitive difficulty D1",
    "cognitiveComponents": {
      "concept_model_selection": 1,
      "representation_translation": 1,
      "reasoning_chain_length": 1,
      "algebra_computational_load": 0,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "SINGLE_CHOICE",
    "stem": "If p(x) = x + 3, then p(x) + p(-x) is equal to",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) 3"
      },
      {
        "id": "opt-B",
        "text": "(B) 2x"
      },
      {
        "id": "opt-C",
        "text": "(C) 0"
      },
      {
        "id": "opt-D",
        "text": "(D) 6"
      }
    ],
    "hints": [
      "[CONCEPT] Evaluate p(-x) by replacing x with -x in p(x)=x+3.",
      "[METHOD] Add p(x) and p(-x)."
    ],
    "steps": [
      "Evaluate p(-x) by replacing x with -x in p(x)=x+3. p(-x)=-x+3.",
      "Add p(x) and p(-x). 6.",
      "Check that the result is independent of x. option D."
    ],
    "limitingCheck": "(x+3)+(-x+3)=6.",
    "check": "(x+3)+(-x+3)=6.",
    "trapWarning": "Using p(-x)=x+3 instead of replacing x by -x.",
    "correctKey": "opt-D",
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 4,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Mathematics)"
  },
  {
    "id": "Q-MAT-POLY-NCERT9-EX21-Q08",
    "code": "Q-MAT-POLY-NCERT9-EX21-Q08",
    "title": "NCERT Exemplar \u00b7 Class IX Mathematics \u00b7 Unit 2 Polynomials \u00b7 QEx 2.1 Q8 \u00b7 Polynomials",
    "subjectCode": "MATH",
    "subject": "Mathematics",
    "topicCode": "POLYNOMIALS",
    "topic": "Polynomials",
    "subtopic": "CAP-MAT-POLY-ZERO-BASIC",
    "exam": "NCERT Exemplar",
    "year": 2024,
    "paper": "Class IX Mathematics \u00b7 Unit 2 Polynomials",
    "questionNumber": "Ex 2.1 Q8",
    "section": "FAM-MAT-POLY-ZEROS-BASIC",
    "markingScheme": "+4 / -1",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Assessed at cognitive difficulty D2",
    "cognitiveComponents": {
      "concept_model_selection": 1,
      "representation_translation": 1,
      "reasoning_chain_length": 1,
      "algebra_computational_load": 0,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "SINGLE_CHOICE",
    "stem": "Zero of the zero polynomial is",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) 0"
      },
      {
        "id": "opt-B",
        "text": "(B) 1"
      },
      {
        "id": "opt-C",
        "text": "(C) Any real number"
      },
      {
        "id": "opt-D",
        "text": "(D) Not defined"
      }
    ],
    "hints": [
      "[CONCEPT] Use the definition: c is a zero when p(c)=0.",
      "[METHOD] Apply the fact that the zero polynomial evaluates to 0 at every real input."
    ],
    "steps": [
      "Use the definition: c is a zero when p(c)=0. p(c)=0 for any real c.",
      "Apply the fact that the zero polynomial evaluates to 0 at every real input. every real number is a zero.",
      "Match that statement to the options. option C."
    ],
    "limitingCheck": "For the zero polynomial, p(c)=0 for every real c.",
    "check": "For the zero polynomial, p(c)=0 for every real c.",
    "trapWarning": "Thinking the zero polynomial has only the single zero x=0.",
    "correctKey": "opt-C",
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 4,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Mathematics)"
  },
  {
    "id": "Q-MAT-POLY-NCERT9-EX21-Q09",
    "code": "Q-MAT-POLY-NCERT9-EX21-Q09",
    "title": "NCERT Exemplar \u00b7 Class IX Mathematics \u00b7 Unit 2 Polynomials \u00b7 QEx 2.1 Q9 \u00b7 Polynomials",
    "subjectCode": "MATH",
    "subject": "Mathematics",
    "topicCode": "POLYNOMIALS",
    "topic": "Polynomials",
    "subtopic": "CAP-MAT-POLY-ZERO-BASIC",
    "exam": "NCERT Exemplar",
    "year": 2024,
    "paper": "Class IX Mathematics \u00b7 Unit 2 Polynomials",
    "questionNumber": "Ex 2.1 Q9",
    "section": "FAM-MAT-POLY-ZEROS-BASIC",
    "markingScheme": "+4 / -1",
    "difficultyBand": "D1",
    "difficultyScore": 1,
    "difficultyBasis": "Assessed at cognitive difficulty D1",
    "cognitiveComponents": {
      "concept_model_selection": 1,
      "representation_translation": 1,
      "reasoning_chain_length": 1,
      "algebra_computational_load": 0,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "SINGLE_CHOICE",
    "stem": "Zero of the polynomial p(x) = 2x + 5 is",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) -2/5"
      },
      {
        "id": "opt-B",
        "text": "(B) -5/2"
      },
      {
        "id": "opt-C",
        "text": "(C) 2/5"
      },
      {
        "id": "opt-D",
        "text": "(D) 5/2"
      }
    ],
    "hints": [
      "[CONCEPT] Set p(x)=0 to find a zero.",
      "[METHOD] Solve the linear equation."
    ],
    "steps": [
      "Set p(x)=0 to find a zero. 2x+5=0.",
      "Solve the linear equation. x=-5/2.",
      "Substitute -5/2 into 2x+5. option B."
    ],
    "limitingCheck": "2(-5/2)+5=0.",
    "check": "2(-5/2)+5=0.",
    "trapWarning": "Solving 2x+5=0 with the wrong sign.",
    "correctKey": "opt-B",
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 4,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Mathematics)"
  },
  {
    "id": "Q-MAT-POLY-NCERT9-EX21-Q10",
    "code": "Q-MAT-POLY-NCERT9-EX21-Q10",
    "title": "NCERT Exemplar \u00b7 Class IX Mathematics \u00b7 Unit 2 Polynomials \u00b7 QEx 2.1 Q10 \u00b7 Polynomials",
    "subjectCode": "MATH",
    "subject": "Mathematics",
    "topicCode": "POLYNOMIALS",
    "topic": "Polynomials",
    "subtopic": "CAP-MAT-POLY-ZERO-BASIC",
    "exam": "NCERT Exemplar",
    "year": 2024,
    "paper": "Class IX Mathematics \u00b7 Unit 2 Polynomials",
    "questionNumber": "Ex 2.1 Q10",
    "section": "FAM-MAT-POLY-ZEROS-BASIC",
    "markingScheme": "+4 / -1",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Assessed at cognitive difficulty D2",
    "cognitiveComponents": {
      "concept_model_selection": 1,
      "representation_translation": 1,
      "reasoning_chain_length": 1,
      "algebra_computational_load": 0,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "SINGLE_CHOICE",
    "stem": "One of the zeroes of the polynomial 2x\u00b2 + 7x - 4 is",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) 2"
      },
      {
        "id": "opt-B",
        "text": "(B) 1/2"
      },
      {
        "id": "opt-C",
        "text": "(C) -1/2"
      },
      {
        "id": "opt-D",
        "text": "(D) -2"
      }
    ],
    "hints": [
      "[CONCEPT] Set the quadratic equal to zero and look for a factorization.",
      "[METHOD] Read the zeros from the two linear factors."
    ],
    "steps": [
      "Set the quadratic equal to zero and look for a factorization. (2x-1)(x+4)=0.",
      "Read the zeros from the two linear factors. x=1/2 or x=-4.",
      "Substitute x=1/2 into the original polynomial. option B."
    ],
    "limitingCheck": "2(1/2)\u00b2+7(1/2)-4=0, so 1/2 is a zero.",
    "check": "2(1/2)\u00b2+7(1/2)-4=0, so 1/2 is a zero.",
    "trapWarning": "Testing candidates arithmetically with a sign error or choosing -1/2 instead of 1/2.",
    "correctKey": "opt-B",
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 4,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Mathematics)"
  },
  {
    "id": "Q-MAT-POLY-NCERT9-EX21-Q11",
    "code": "Q-MAT-POLY-NCERT9-EX21-Q11",
    "title": "NCERT Exemplar \u00b7 Class IX Mathematics \u00b7 Unit 2 Polynomials \u00b7 QEx 2.1 Q11 \u00b7 Polynomials",
    "subjectCode": "MATH",
    "subject": "Mathematics",
    "topicCode": "POLYNOMIALS",
    "topic": "Polynomials",
    "subtopic": "CAP-MAT-POLY-REMAINDER-FACTOR-BASIC",
    "exam": "NCERT Exemplar",
    "year": 2024,
    "paper": "Class IX Mathematics \u00b7 Unit 2 Polynomials",
    "questionNumber": "Ex 2.1 Q11",
    "section": "FAM-MAT-POLY-REMAINDER-FACTOR",
    "markingScheme": "+4 / -1",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Assessed at cognitive difficulty D2",
    "cognitiveComponents": {
      "concept_model_selection": 1,
      "representation_translation": 1,
      "reasoning_chain_length": 1,
      "algebra_computational_load": 0,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "SINGLE_CHOICE",
    "stem": "If x\u2075\u00b9 + 51 is divided by x + 1, the remainder is",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) 0"
      },
      {
        "id": "opt-B",
        "text": "(B) 1"
      },
      {
        "id": "opt-C",
        "text": "(C) 49"
      },
      {
        "id": "opt-D",
        "text": "(D) 50"
      }
    ],
    "hints": [
      "[CONCEPT] Identify -1 as the zero of x+1.",
      "[METHOD] Evaluate (-1)^51+51."
    ],
    "steps": [
      "Identify -1 as the zero of x+1. evaluation point -1.",
      "Evaluate (-1)^51+51. 50.",
      "Check the odd power sign before matching the option. option D."
    ],
    "limitingCheck": "p(-1)=-1+51=50.",
    "check": "p(-1)=-1+51=50.",
    "trapWarning": "Using p(1) for division by x+1 instead of evaluating at the divisor zero -1.",
    "correctKey": "opt-D",
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 4,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Mathematics)"
  },
  {
    "id": "Q-MAT-POLY-NCERT9-EX21-Q12",
    "code": "Q-MAT-POLY-NCERT9-EX21-Q12",
    "title": "NCERT Exemplar \u00b7 Class IX Mathematics \u00b7 Unit 2 Polynomials \u00b7 QEx 2.1 Q12 \u00b7 Polynomials",
    "subjectCode": "MATH",
    "subject": "Mathematics",
    "topicCode": "POLYNOMIALS",
    "topic": "Polynomials",
    "subtopic": "CAP-MAT-POLY-REMAINDER-FACTOR-BASIC",
    "exam": "NCERT Exemplar",
    "year": 2024,
    "paper": "Class IX Mathematics \u00b7 Unit 2 Polynomials",
    "questionNumber": "Ex 2.1 Q12",
    "section": "FAM-MAT-POLY-REMAINDER-FACTOR",
    "markingScheme": "+4 / -1",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Assessed at cognitive difficulty D2",
    "cognitiveComponents": {
      "concept_model_selection": 1,
      "representation_translation": 1,
      "reasoning_chain_length": 1,
      "algebra_computational_load": 0,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "SINGLE_CHOICE",
    "stem": "If x + 1 is a factor of the polynomial 2x\u00b2 + kx, then the value of k is",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) -3"
      },
      {
        "id": "opt-B",
        "text": "(B) 4"
      },
      {
        "id": "opt-C",
        "text": "(C) 2"
      },
      {
        "id": "opt-D",
        "text": "(D) -2"
      }
    ],
    "hints": [
      "[CONCEPT] Translate the factor x+1 into the condition p(-1)=0.",
      "[METHOD] Compute 2(-1)^2+k(-1)=2-k and set it equal to zero."
    ],
    "steps": [
      "Translate the factor x+1 into the condition p(-1)=0. condition p(-1)=0.",
      "Compute 2(-1)^2+k(-1)=2-k and set it equal to zero. k=2.",
      "Substitute k=2 back into the polynomial at x=-1. zero remainder."
    ],
    "limitingCheck": "With k=2, p(-1)=2-2=0.",
    "check": "With k=2, p(-1)=2-2=0.",
    "trapWarning": "Substituting x=1 for the factor x+1, which changes the parameter equation.",
    "correctKey": "opt-C",
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 4,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Mathematics)"
  },
  {
    "id": "Q-MAT-POLY-NCERT9-EX21-Q13",
    "code": "Q-MAT-POLY-NCERT9-EX21-Q13",
    "title": "NCERT Exemplar \u00b7 Class IX Mathematics \u00b7 Unit 2 Polynomials \u00b7 QEx 2.1 Q13 \u00b7 Polynomials",
    "subjectCode": "MATH",
    "subject": "Mathematics",
    "topicCode": "POLYNOMIALS",
    "topic": "Polynomials",
    "subtopic": "CAP-MAT-POLY-REMAINDER-FACTOR-BASIC",
    "exam": "NCERT Exemplar",
    "year": 2024,
    "paper": "Class IX Mathematics \u00b7 Unit 2 Polynomials",
    "questionNumber": "Ex 2.1 Q13",
    "section": "FAM-MAT-POLY-REMAINDER-FACTOR",
    "markingScheme": "+4 / -1",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Assessed at cognitive difficulty D2",
    "cognitiveComponents": {
      "concept_model_selection": 1,
      "representation_translation": 1,
      "reasoning_chain_length": 1,
      "algebra_computational_load": 0,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "SINGLE_CHOICE",
    "stem": "x + 1 is a factor of the polynomial",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) x\u00b3 + x\u00b2 - x + 1"
      },
      {
        "id": "opt-B",
        "text": "(B) x\u00b3 + x\u00b2 + x + 1"
      },
      {
        "id": "opt-C",
        "text": "(C) x\u2074 + x\u00b3 + x\u00b2 + 1"
      },
      {
        "id": "opt-D",
        "text": "(D) x\u2074 + 3x\u00b3 + 3x\u00b2 + x + 1"
      }
    ],
    "hints": [
      "[CONCEPT] Test each option at x=-1 because x+1 is the proposed factor.",
      "[METHOD] Evaluate option B as -1+1-1+1."
    ],
    "steps": [
      "Test each option at x=-1 because x+1 is the proposed factor. values at -1.",
      "Evaluate option B as -1+1-1+1. 0.",
      "Check that the other three option values are non-zero. only option B qualifies."
    ],
    "limitingCheck": "Option B evaluates to 0 at x=-1; the others do not.",
    "check": "Option B evaluates to 0 at x=-1; the others do not.",
    "trapWarning": "Trying to factor every option symbolically instead of using the single-value factor test.",
    "correctKey": "opt-B",
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 4,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Mathematics)"
  },
  {
    "id": "Q-MAT-POLY-NCERT9-EX21-Q14",
    "code": "Q-MAT-POLY-NCERT9-EX21-Q14",
    "title": "NCERT Exemplar \u00b7 Class IX Mathematics \u00b7 Unit 2 Polynomials \u00b7 QEx 2.1 Q14 \u00b7 Polynomials",
    "subjectCode": "MATH",
    "subject": "Mathematics",
    "topicCode": "POLYNOMIALS",
    "topic": "Polynomials",
    "subtopic": "CAP-MAT-POLY-FACTORISATION-BASIC",
    "exam": "NCERT Exemplar",
    "year": 2024,
    "paper": "Class IX Mathematics \u00b7 Unit 2 Polynomials",
    "questionNumber": "Ex 2.1 Q14",
    "section": "FAM-MAT-POLY-FACTORISATION-BASIC",
    "markingScheme": "+4 / -1",
    "difficultyBand": "D2",
    "difficultyScore": 3,
    "difficultyBasis": "Assessed at cognitive difficulty D2",
    "cognitiveComponents": {
      "concept_model_selection": 1,
      "representation_translation": 1,
      "reasoning_chain_length": 1,
      "algebra_computational_load": 0,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "SINGLE_CHOICE",
    "stem": "One of the factors of (25x\u00b2 - 1) + (1 + 5x)\u00b2 is",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) 5 + x"
      },
      {
        "id": "opt-B",
        "text": "(B) 5 - x"
      },
      {
        "id": "opt-C",
        "text": "(C) 5x - 1"
      },
      {
        "id": "opt-D",
        "text": "(D) 10x"
      }
    ],
    "hints": [
      "[CONCEPT] Expand (1+5x)^2 and combine it with 25x^2-1.",
      "[METHOD] Extract the common factor 10x."
    ],
    "steps": [
      "Expand (1+5x)^2 and combine it with 25x^2-1. 50x\u00b2+10x.",
      "Extract the common factor 10x. 10x(5x+1).",
      "Expand 10x(5x+1) to recover 50x\u00b2+10x. 10x is a factor.",
      "The listed factors 5 + x and 5 - x are distractors; expanding them does not reproduce the simplified polynomial."
    ],
    "limitingCheck": "The expression simplifies to 10x(5x+1), so 10x is a factor.",
    "check": "The expression simplifies to 10x(5x+1), so 10x is a factor.",
    "trapWarning": "Expanding only the square and missing cancellation of -1 with +1 before extracting the common factor.",
    "correctKey": "opt-D",
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 4,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Mathematics)"
  },
  {
    "id": "Q-MAT-POLY-NCERT9-EX21-Q15",
    "code": "Q-MAT-POLY-NCERT9-EX21-Q15",
    "title": "NCERT Exemplar \u00b7 Class IX Mathematics \u00b7 Unit 2 Polynomials \u00b7 QEx 2.1 Q15 \u00b7 Polynomials",
    "subjectCode": "MATH",
    "subject": "Mathematics",
    "topicCode": "POLYNOMIALS",
    "topic": "Polynomials",
    "subtopic": "CAP-MAT-POLY-IDENTITIES-BASIC",
    "exam": "NCERT Exemplar",
    "year": 2024,
    "paper": "Class IX Mathematics \u00b7 Unit 2 Polynomials",
    "questionNumber": "Ex 2.1 Q15",
    "section": "FAM-MAT-POLY-IDENTITIES-BASIC",
    "markingScheme": "+4 / -1",
    "difficultyBand": "D1",
    "difficultyScore": 1,
    "difficultyBasis": "Assessed at cognitive difficulty D1",
    "cognitiveComponents": {
      "concept_model_selection": 1,
      "representation_translation": 1,
      "reasoning_chain_length": 1,
      "algebra_computational_load": 0,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "SINGLE_CHOICE",
    "stem": "The value of 249\u00b2 - 248\u00b2 is",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) 1\u00b2"
      },
      {
        "id": "opt-B",
        "text": "(B) 477"
      },
      {
        "id": "opt-C",
        "text": "(C) 487"
      },
      {
        "id": "opt-D",
        "text": "(D) 497"
      }
    ],
    "hints": [
      "[CONCEPT] Recognize 249\u00b2-248\u00b2 as a\u00b2-b\u00b2.",
      "[METHOD] Evaluate the two small factors."
    ],
    "steps": [
      "Recognize 249\u00b2-248\u00b2 as a\u00b2-b\u00b2. (249-248)(249+248).",
      "Evaluate the two small factors. 497.",
      "Check the product 1\u00d7497 against the choices. option D.",
      "This selects 497 rather than the distractor values 477 or 487."
    ],
    "limitingCheck": "(249-248)(249+248)=1\u00d7497=497.",
    "check": "(249-248)(249+248)=1\u00d7497=497.",
    "trapWarning": "Computing both large squares separately instead of using the difference-of-squares identity.",
    "correctKey": "opt-D",
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 4,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Mathematics)"
  },
  {
    "id": "Q-MAT-POLY-NCERT9-EX21-Q16",
    "code": "Q-MAT-POLY-NCERT9-EX21-Q16",
    "title": "NCERT Exemplar \u00b7 Class IX Mathematics \u00b7 Unit 2 Polynomials \u00b7 QEx 2.1 Q16 \u00b7 Polynomials",
    "subjectCode": "MATH",
    "subject": "Mathematics",
    "topicCode": "POLYNOMIALS",
    "topic": "Polynomials",
    "subtopic": "CAP-MAT-POLY-FACTORISATION-BASIC",
    "exam": "NCERT Exemplar",
    "year": 2024,
    "paper": "Class IX Mathematics \u00b7 Unit 2 Polynomials",
    "questionNumber": "Ex 2.1 Q16",
    "section": "FAM-MAT-POLY-FACTORISATION-BASIC",
    "markingScheme": "+4 / -1",
    "difficultyBand": "D1",
    "difficultyScore": 2,
    "difficultyBasis": "Assessed at cognitive difficulty D1",
    "cognitiveComponents": {
      "concept_model_selection": 1,
      "representation_translation": 1,
      "reasoning_chain_length": 1,
      "algebra_computational_load": 0,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "SINGLE_CHOICE",
    "stem": "The factorisation of 4x\u00b2 + 8x + 3 is",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) (x + 1) (x + 3)"
      },
      {
        "id": "opt-B",
        "text": "(B) (2x + 1) (2x + 3)"
      },
      {
        "id": "opt-C",
        "text": "(C) (2x + 2) (2x + 5)"
      },
      {
        "id": "opt-D",
        "text": "(D) (2x - 1) (2x - 3)"
      }
    ],
    "hints": [
      "[CONCEPT] Inspect option B because its product gives leading term 4x\u00b2 and constant term 3.",
      "[METHOD] Expand the candidate product."
    ],
    "steps": [
      "Inspect option B because its product gives leading term 4x\u00b2 and constant term 3. candidate option B.",
      "Expand the candidate product. 4x\u00b2+8x+3.",
      "Compare every coefficient with the given polynomial. exact match."
    ],
    "limitingCheck": "(2x+1)(2x+3)=4x\u00b2+8x+3.",
    "check": "(2x+1)(2x+3)=4x\u00b2+8x+3.",
    "trapWarning": "Matching the leading and constant terms but not verifying the middle term.",
    "correctKey": "opt-B",
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 4,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Mathematics)"
  },
  {
    "id": "Q-MAT-POLY-NCERT9-EX21-Q17",
    "code": "Q-MAT-POLY-NCERT9-EX21-Q17",
    "title": "NCERT Exemplar \u00b7 Class IX Mathematics \u00b7 Unit 2 Polynomials \u00b7 QEx 2.1 Q17 \u00b7 Polynomials",
    "subjectCode": "MATH",
    "subject": "Mathematics",
    "topicCode": "POLYNOMIALS",
    "topic": "Polynomials",
    "subtopic": "CAP-MAT-POLY-IDENTITIES-BASIC",
    "exam": "NCERT Exemplar",
    "year": 2024,
    "paper": "Class IX Mathematics \u00b7 Unit 2 Polynomials",
    "questionNumber": "Ex 2.1 Q17",
    "section": "FAM-MAT-POLY-IDENTITIES-BASIC",
    "markingScheme": "+4 / -1",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Assessed at cognitive difficulty D2",
    "cognitiveComponents": {
      "concept_model_selection": 1,
      "representation_translation": 1,
      "reasoning_chain_length": 1,
      "algebra_computational_load": 0,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "SINGLE_CHOICE",
    "stem": "Which of the following is a factor of (x + y)\u00b3 - (x\u00b3 + y\u00b3)?",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) x\u00b2 + y\u00b2 + 2xy"
      },
      {
        "id": "opt-B",
        "text": "(B) x\u00b2 + y\u00b2 - xy"
      },
      {
        "id": "opt-C",
        "text": "(C) xy\u00b2"
      },
      {
        "id": "opt-D",
        "text": "(D) 3xy"
      }
    ],
    "hints": [
      "[CONCEPT] Expand (x+y)^3 and subtract x^3+y^3.",
      "[METHOD] Factor the common term 3xy from the mixed terms."
    ],
    "steps": [
      "Expand (x+y)^3 and subtract x^3+y^3. 3x\u00b2y+3xy\u00b2.",
      "Factor the common term 3xy from the mixed terms. 3xy(x+y).",
      "Confirm that 3xy appears as a multiplicative factor of the final product. option D.",
      "The polynomial expression therefore has 3xy as a factor after the mixed terms are collected."
    ],
    "limitingCheck": "The difference equals 3xy(x+y), so 3xy is a factor.",
    "check": "The difference equals 3xy(x+y), so 3xy is a factor.",
    "trapWarning": "Expanding the cube but failing to collect both mixed terms into a common 3xy factor.",
    "correctKey": "opt-D",
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 4,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Mathematics)"
  },
  {
    "id": "Q-MAT-POLY-NCERT9-EX21-Q18",
    "code": "Q-MAT-POLY-NCERT9-EX21-Q18",
    "title": "NCERT Exemplar \u00b7 Class IX Mathematics \u00b7 Unit 2 Polynomials \u00b7 QEx 2.1 Q18 \u00b7 Polynomials",
    "subjectCode": "MATH",
    "subject": "Mathematics",
    "topicCode": "POLYNOMIALS",
    "topic": "Polynomials",
    "subtopic": "CAP-MAT-POLY-IDENTITIES-BASIC",
    "exam": "NCERT Exemplar",
    "year": 2024,
    "paper": "Class IX Mathematics \u00b7 Unit 2 Polynomials",
    "questionNumber": "Ex 2.1 Q18",
    "section": "FAM-MAT-POLY-IDENTITIES-BASIC",
    "markingScheme": "+4 / -1",
    "difficultyBand": "D1",
    "difficultyScore": 1,
    "difficultyBasis": "Assessed at cognitive difficulty D1",
    "cognitiveComponents": {
      "concept_model_selection": 1,
      "representation_translation": 1,
      "reasoning_chain_length": 1,
      "algebra_computational_load": 0,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "SINGLE_CHOICE",
    "stem": "The coefficient of x in the expansion of (x + 3)\u00b3 is",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) 1"
      },
      {
        "id": "opt-B",
        "text": "(B) 9"
      },
      {
        "id": "opt-C",
        "text": "(C) 18"
      },
      {
        "id": "opt-D",
        "text": "(D) 27"
      }
    ],
    "hints": [
      "[CONCEPT] Use (a+b)^3=a^3+3a\u00b2b+3ab\u00b2+b^3 with a=x and b=3.",
      "[METHOD] Read the coefficient multiplying x in the expansion."
    ],
    "steps": [
      "Use (a+b)^3=a^3+3a\u00b2b+3ab\u00b2+b^3 with a=x and b=3. x\u00b3+9x\u00b2+27x+27.",
      "Read the coefficient multiplying x in the expansion. 27.",
      "Check that 3\u00d73\u00b2=27. option D."
    ],
    "limitingCheck": "(x+3)^3=x\u00b3+9x\u00b2+27x+27, so the x coefficient is 27.",
    "check": "(x+3)^3=x\u00b3+9x\u00b2+27x+27, so the x coefficient is 27.",
    "trapWarning": "Using 9 as the x coefficient by omitting the binomial coefficient 3 in the cube expansion.",
    "correctKey": "opt-D",
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 4,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Mathematics)"
  },
  {
    "id": "Q-MAT-POLY-NCERT9-EX21-Q19",
    "code": "Q-MAT-POLY-NCERT9-EX21-Q19",
    "title": "NCERT Exemplar \u00b7 Class IX Mathematics \u00b7 Unit 2 Polynomials \u00b7 QEx 2.1 Q19 \u00b7 Polynomials",
    "subjectCode": "MATH",
    "subject": "Mathematics",
    "topicCode": "POLYNOMIALS",
    "topic": "Polynomials",
    "subtopic": "CAP-MAT-POLY-IDENTITIES-BASIC",
    "exam": "NCERT Exemplar",
    "year": 2024,
    "paper": "Class IX Mathematics \u00b7 Unit 2 Polynomials",
    "questionNumber": "Ex 2.1 Q19",
    "section": "FAM-MAT-POLY-IDENTITIES-BASIC",
    "markingScheme": "+4 / -1",
    "difficultyBand": "D2",
    "difficultyScore": 3,
    "difficultyBasis": "Assessed at cognitive difficulty D2",
    "cognitiveComponents": {
      "concept_model_selection": 1,
      "representation_translation": 1,
      "reasoning_chain_length": 1,
      "algebra_computational_load": 0,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "SINGLE_CHOICE",
    "stem": "If x/y + y/x = -1 (x, y \u2260 0), the value of x\u00b3 - y\u00b3 is",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) 1"
      },
      {
        "id": "opt-B",
        "text": "(B) -1"
      },
      {
        "id": "opt-C",
        "text": "(C) 0"
      },
      {
        "id": "opt-D",
        "text": "(D) 1/2"
      }
    ],
    "hints": [
      "[CONCEPT] Multiply x/y+y/x=-1 by the non-zero product xy.",
      "[METHOD] Rewrite the result as x\u00b2+xy+y\u00b2=0 and recognize it in x\u00b3-y\u00b3=(x-y)(x\u00b2+xy+y\u00b2)."
    ],
    "steps": [
      "Multiply x/y+y/x=-1 by the non-zero product xy. x\u00b2+y\u00b2=-xy.",
      "Rewrite the result as x\u00b2+xy+y\u00b2=0 and recognize it in x\u00b3-y\u00b3=(x-y)(x\u00b2+xy+y\u00b2). x\u00b3-y\u00b3=(x-y)\u00b70.",
      "Conclude that the product is zero without assuming x=y. option C."
    ],
    "limitingCheck": "The condition forces x\u00b2+xy+y\u00b2=0, hence x\u00b3-y\u00b3=0.",
    "check": "The condition forces x\u00b2+xy+y\u00b2=0, hence x\u00b3-y\u00b3=0.",
    "trapWarning": "Trying to solve separately for x and y even though only the symmetric factor x\u00b2+xy+y\u00b2 is needed.",
    "correctKey": "opt-C",
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 4,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Mathematics)"
  },
  {
    "id": "Q-MAT-POLY-NCERT9-EX21-Q20",
    "code": "Q-MAT-POLY-NCERT9-EX21-Q20",
    "title": "NCERT Exemplar \u00b7 Class IX Mathematics \u00b7 Unit 2 Polynomials \u00b7 QEx 2.1 Q20 \u00b7 Polynomials",
    "subjectCode": "MATH",
    "subject": "Mathematics",
    "topicCode": "POLYNOMIALS",
    "topic": "Polynomials",
    "subtopic": "CAP-MAT-POLY-IDENTITIES-BASIC",
    "exam": "NCERT Exemplar",
    "year": 2024,
    "paper": "Class IX Mathematics \u00b7 Unit 2 Polynomials",
    "questionNumber": "Ex 2.1 Q20",
    "section": "FAM-MAT-POLY-IDENTITIES-BASIC",
    "markingScheme": "+4 / -1",
    "difficultyBand": "D1",
    "difficultyScore": 1,
    "difficultyBasis": "Assessed at cognitive difficulty D1",
    "cognitiveComponents": {
      "concept_model_selection": 1,
      "representation_translation": 1,
      "reasoning_chain_length": 1,
      "algebra_computational_load": 0,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "SINGLE_CHOICE",
    "stem": "If 49x\u00b2 - b = (7x + 1/2)(7x - 1/2), then the value of b is",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) 0"
      },
      {
        "id": "opt-B",
        "text": "(B) 1/\u221a2"
      },
      {
        "id": "opt-C",
        "text": "(C) 1/4"
      },
      {
        "id": "opt-D",
        "text": "(D) 1/2"
      }
    ],
    "hints": [
      "[CONCEPT] Recognize (7x+1/2)(7x-1/2) as (a+b)(a-b).",
      "[METHOD] Compare 49x\u00b2-1/4 with 49x\u00b2-b."
    ],
    "steps": [
      "Recognize (7x+1/2)(7x-1/2) as (a+b)(a-b). 49x\u00b2-1/4.",
      "Compare 49x\u00b2-1/4 with 49x\u00b2-b. b=1/4.",
      "Check that substituting b=1/4 reproduces the conjugate product. option C."
    ],
    "limitingCheck": "(7x+1/2)(7x-1/2)=49x\u00b2-1/4, so b=1/4.",
    "check": "(7x+1/2)(7x-1/2)=49x\u00b2-1/4, so b=1/4.",
    "trapWarning": "Using (a-b)^2 instead of the conjugate-product identity and producing a linear term.",
    "correctKey": "opt-C",
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 4,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Mathematics)"
  },
  {
    "id": "Q-MAT-POLY-NCERT9-EX21-Q21",
    "code": "Q-MAT-POLY-NCERT9-EX21-Q21",
    "title": "NCERT Exemplar \u00b7 Class IX Mathematics \u00b7 Unit 2 Polynomials \u00b7 QEx 2.1 Q21 \u00b7 Polynomials",
    "subjectCode": "MATH",
    "subject": "Mathematics",
    "topicCode": "POLYNOMIALS",
    "topic": "Polynomials",
    "subtopic": "CAP-MAT-POLY-IDENTITIES-BASIC",
    "exam": "NCERT Exemplar",
    "year": 2024,
    "paper": "Class IX Mathematics \u00b7 Unit 2 Polynomials",
    "questionNumber": "Ex 2.1 Q21",
    "section": "FAM-MAT-POLY-IDENTITIES-BASIC",
    "markingScheme": "+4 / -1",
    "difficultyBand": "D2",
    "difficultyScore": 3,
    "difficultyBasis": "Assessed at cognitive difficulty D2",
    "cognitiveComponents": {
      "concept_model_selection": 1,
      "representation_translation": 1,
      "reasoning_chain_length": 1,
      "algebra_computational_load": 0,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "SINGLE_CHOICE",
    "stem": "If a + b + c = 0, then a\u00b3 + b\u00b3 + c\u00b3 is equal to",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) 0"
      },
      {
        "id": "opt-B",
        "text": "(B) abc"
      },
      {
        "id": "opt-C",
        "text": "(C) 3abc"
      },
      {
        "id": "opt-D",
        "text": "(D) 2abc"
      }
    ],
    "hints": [
      "[CONCEPT] Use the identity a\u00b3+b\u00b3+c\u00b3-3abc=(a+b+c)(a\u00b2+b\u00b2+c\u00b2-ab-bc-ca).",
      "[METHOD] Substitute a+b+c=0 into the identity."
    ],
    "steps": [
      "The given condition is a+b+c=0, and the symmetric cubic identity gives a\u00b3+b\u00b3+c\u00b3-3abc=(a+b+c)(a\u00b2+b\u00b2+c\u00b2-ab-bc-ca).",
      "Because a+b+c is 0, the product on the right is 0, so the cubic sum a\u00b3+b\u00b3+c\u00b3 is equal to 3abc.",
      "Therefore the expression asked for in the question is equal to option (C), 3abc."
    ],
    "limitingCheck": "With a+b+c=0, the symmetric cubic identity reduces to a\u00b3+b\u00b3+c\u00b3=3abc.",
    "check": "With a+b+c=0, the symmetric cubic identity reduces to a\u00b3+b\u00b3+c\u00b3=3abc.",
    "trapWarning": "Trying to expand or solve for a, b, and c separately instead of using the symmetric cubic identity with a+b+c=0.",
    "correctKey": "opt-C",
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 4,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Mathematics)"
  },
  {
    "id": "Q-MAT-POLY-NCERT9-EX22-Q01",
    "code": "Q-MAT-POLY-NCERT9-EX22-Q01",
    "title": "NCERT Exemplar \u00b7 Class IX Mathematics \u00b7 Unit 2 Polynomials \u00b7 QEx 2.2 Q1 \u00b7 Polynomials",
    "subjectCode": "MATH",
    "subject": "Mathematics",
    "topicCode": "POLYNOMIALS",
    "topic": "Polynomials",
    "subtopic": "CAP-MAT-POLY-FORM-DEGREE-BASIC",
    "exam": "NCERT Exemplar",
    "year": 2024,
    "paper": "Class IX Mathematics \u00b7 Unit 2 Polynomials",
    "questionNumber": "Ex 2.2 Q1",
    "section": "FAM-MAT-POLY-FORM-DEGREE",
    "markingScheme": "+4 / -1",
    "difficultyBand": "D2",
    "difficultyScore": 3,
    "difficultyBasis": "Assessed at cognitive difficulty D2",
    "cognitiveComponents": {
      "concept_model_selection": 1,
      "representation_translation": 1,
      "reasoning_chain_length": 1,
      "algebra_computational_load": 0,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "JUSTIFY",
    "kind": "SINGLE_CHOICE",
    "stem": "Which of the following expressions are polynomials? Justify your answer: (i) 1/x (ii) \u221ax + 2 (iii) x\u00b2 + 2x + 1 (iv) 1",
    "options": [],
    "hints": [
      "[CONCEPT] Rewrite 1/x as x^(-1) and \u221ax as x^(1/2).",
      "[METHOD] Apply the one-variable polynomial exponent rule to all four expressions."
    ],
    "steps": [
      "Rewrite 1/x as x^(-1) and \u221ax as x^(1/2). explicit negative and fractional exponents.",
      "Apply the one-variable polynomial exponent rule to all four expressions. only (iii) and (iv) are polynomials.",
      "Check that every retained expression has only whole-number exponents of the variable. classification confirmed."
    ],
    "limitingCheck": "1/x=x^(-1) and \u221ax=x^(1/2) fail the exponent rule; x\u00b2+2x+1 and 1 satisfy it.",
    "check": "1/x=x^(-1) and \u221ax=x^(1/2) fail the exponent rule; x\u00b2+2x+1 and 1 satisfy it.",
    "trapWarning": "Treating every algebraic expression containing x as a polynomial without checking whether the exponents are non-negative integers.",
    "correctKey": null,
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 4,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Mathematics)"
  },
  {
    "id": "Q-MAT-POLY-NCERT9-EX22-Q02-II",
    "code": "Q-MAT-POLY-NCERT9-EX22-Q02-II",
    "title": "NCERT Exemplar \u00b7 Class IX Mathematics \u00b7 Unit 2 Polynomials \u00b7 QEx 2.2 Q2(ii) \u00b7 Polynomials",
    "subjectCode": "MATH",
    "subject": "Mathematics",
    "topicCode": "POLYNOMIALS",
    "topic": "Polynomials",
    "subtopic": "CAP-MAT-POLY-FORM-DEGREE-BASIC",
    "exam": "NCERT Exemplar",
    "year": 2024,
    "paper": "Class IX Mathematics \u00b7 Unit 2 Polynomials",
    "questionNumber": "Ex 2.2 Q2(ii)",
    "section": "FAM-MAT-POLY-FORM-DEGREE",
    "markingScheme": "+4 / -1",
    "difficultyBand": "D1",
    "difficultyScore": 1,
    "difficultyBasis": "Assessed at cognitive difficulty D1",
    "cognitiveComponents": {
      "concept_model_selection": 1,
      "representation_translation": 1,
      "reasoning_chain_length": 1,
      "algebra_computational_load": 0,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "JUSTIFY",
    "kind": "SINGLE_CHOICE",
    "stem": "State whether the following statement is True or False? Justify your answer: Every polynomial is a binomial.",
    "options": [
      {
        "id": "opt-A",
        "text": "True"
      },
      {
        "id": "opt-F",
        "text": "False"
      }
    ],
    "hints": [
      "[CONCEPT] Recall that a binomial is a polynomial with exactly two non-zero terms.",
      "[METHOD] Use x\u00b3+x+1 as a counterexample."
    ],
    "steps": [
      "Recall that a binomial is a polynomial with exactly two non-zero terms. binomial is only one polynomial type.",
      "Use x\u00b3+x+1 as a counterexample. statement is false.",
      "Check the counterexample satisfies the polynomial definition. false answer confirmed."
    ],
    "limitingCheck": "x\u00b3+x+1 is a three-term polynomial, so 'Every polynomial is a binomial' is false.",
    "check": "x\u00b3+x+1 is a three-term polynomial, so 'Every polynomial is a binomial' is false.",
    "trapWarning": "Confusing the general class 'polynomial' with the special two-term subclass 'binomial'.",
    "correctKey": "opt-A",
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 4,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Mathematics)"
  },
  {
    "id": "Q-MAT-POLY-NCERT9-EX22-Q02-IV",
    "code": "Q-MAT-POLY-NCERT9-EX22-Q02-IV",
    "title": "NCERT Exemplar \u00b7 Class IX Mathematics \u00b7 Unit 2 Polynomials \u00b7 QEx 2.2 Q2(iv) \u00b7 Polynomials",
    "subjectCode": "MATH",
    "subject": "Mathematics",
    "topicCode": "POLYNOMIALS",
    "topic": "Polynomials",
    "subtopic": "CAP-MAT-POLY-ZERO-BASIC",
    "exam": "NCERT Exemplar",
    "year": 2024,
    "paper": "Class IX Mathematics \u00b7 Unit 2 Polynomials",
    "questionNumber": "Ex 2.2 Q2(iv)",
    "section": "FAM-MAT-POLY-ZEROS-BASIC",
    "markingScheme": "+4 / -1",
    "difficultyBand": "D2",
    "difficultyScore": 3,
    "difficultyBasis": "Assessed at cognitive difficulty D2",
    "cognitiveComponents": {
      "concept_model_selection": 1,
      "representation_translation": 1,
      "reasoning_chain_length": 1,
      "algebra_computational_load": 0,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "JUSTIFY",
    "kind": "SINGLE_CHOICE",
    "stem": "State whether the following statement is True or False? Justify your answer: A polynomial cannot have more than one zero.",
    "options": [
      {
        "id": "opt-A",
        "text": "True"
      },
      {
        "id": "opt-F",
        "text": "False"
      }
    ],
    "hints": [
      "[CONCEPT] Test the claim with a quadratic that factors into two distinct linear factors.",
      "[METHOD] Factor x\u00b2-1 as (x-1)(x+1)."
    ],
    "steps": [
      "Test the claim with a quadratic that factors into two distinct linear factors. candidate x\u00b2-1.",
      "Factor x\u00b2-1 as (x-1)(x+1). zeros 1 and -1.",
      "Use the two distinct zeros to reject the statement. false answer confirmed."
    ],
    "limitingCheck": "x\u00b2-1 has the two real zeros 1 and -1, so the statement is false.",
    "check": "x\u00b2-1 has the two real zeros 1 and -1, so the statement is false.",
    "trapWarning": "Generalizing from a linear polynomial and assuming every polynomial can have only one zero.",
    "correctKey": "opt-A",
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 4,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Mathematics)"
  },
  {
    "id": "Q-MAT-POLY-NCERT9-EX23-Q01-I",
    "code": "Q-MAT-POLY-NCERT9-EX23-Q01-I",
    "title": "NCERT Exemplar \u00b7 Class IX Mathematics \u00b7 Unit 2 Polynomials \u00b7 QEx 2.3 Q1(i) \u00b7 Polynomials",
    "subjectCode": "MATH",
    "subject": "Mathematics",
    "topicCode": "POLYNOMIALS",
    "topic": "Polynomials",
    "subtopic": "CAP-MAT-POLY-FORM-DEGREE-BASIC",
    "exam": "NCERT Exemplar",
    "year": 2024,
    "paper": "Class IX Mathematics \u00b7 Unit 2 Polynomials",
    "questionNumber": "Ex 2.3 Q1(i)",
    "section": "FAM-MAT-POLY-FORM-DEGREE",
    "markingScheme": "+4 / -1",
    "difficultyBand": "D1",
    "difficultyScore": 1,
    "difficultyBasis": "Assessed at cognitive difficulty D1",
    "cognitiveComponents": {
      "concept_model_selection": 1,
      "representation_translation": 1,
      "reasoning_chain_length": 1,
      "algebra_computational_load": 0,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "SINGLE_CHOICE",
    "stem": "Find the degree of the polynomial: x\u2075 - x\u2074 + 3",
    "options": [],
    "hints": [
      "[CONCEPT] Identify the non-zero term with the greatest exponent.",
      "[METHOD] Read the exponent of the leading term x\u2075."
    ],
    "steps": [
      "For the polynomial x\u2075-x\u2074+3, degree is determined by the greatest exponent belonging to a non-zero term.",
      "The leading non-zero term is x\u2075, so the degree of this polynomial is 5.",
      "The remaining terms have powers 4 and 0, so no term exceeds degree 5."
    ],
    "limitingCheck": "The highest non-zero power in x\u2075-x\u2074+3 is x\u2075, so the degree is 5.",
    "check": "The highest non-zero power in x\u2075-x\u2074+3 is x\u2075, so the degree is 5.",
    "trapWarning": "Reading the number of terms instead of the highest non-zero exponent when finding degree.",
    "correctKey": null,
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 4,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Mathematics)"
  },
  {
    "id": "Q-MAT-POLY-NCERT9-EX23-Q01-II",
    "code": "Q-MAT-POLY-NCERT9-EX23-Q01-II",
    "title": "NCERT Exemplar \u00b7 Class IX Mathematics \u00b7 Unit 2 Polynomials \u00b7 QEx 2.3 Q1(ii) \u00b7 Polynomials",
    "subjectCode": "MATH",
    "subject": "Mathematics",
    "topicCode": "POLYNOMIALS",
    "topic": "Polynomials",
    "subtopic": "CAP-MAT-POLY-FORM-DEGREE-BASIC",
    "exam": "NCERT Exemplar",
    "year": 2024,
    "paper": "Class IX Mathematics \u00b7 Unit 2 Polynomials",
    "questionNumber": "Ex 2.3 Q1(ii)",
    "section": "FAM-MAT-POLY-FORM-DEGREE",
    "markingScheme": "+4 / -1",
    "difficultyBand": "D1",
    "difficultyScore": 1,
    "difficultyBasis": "Assessed at cognitive difficulty D1",
    "cognitiveComponents": {
      "concept_model_selection": 1,
      "representation_translation": 1,
      "reasoning_chain_length": 1,
      "algebra_computational_load": 0,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "SINGLE_CHOICE",
    "stem": "Find the degree of the polynomial: 2 - y\u00b2 - y\u00b3 + 2y\u2078",
    "options": [],
    "hints": [
      "[CONCEPT] Scan all non-zero terms instead of relying on their written order.",
      "[METHOD] Read the exponent of 2y\u2078."
    ],
    "steps": [
      "Scan all non-zero terms instead of relying on their written order. highest-power term 2y\u2078.",
      "Read the exponent of 2y\u2078. degree 8.",
      "Compare 8 with the other exponents 0, 2, and 3. degree confirmed."
    ],
    "limitingCheck": "The highest non-zero power in 2-y\u00b2-y\u00b3+2y\u2078 is y\u2078, so the degree is 8.",
    "check": "The highest non-zero power in 2-y\u00b2-y\u00b3+2y\u2078 is y\u2078, so the degree is 8.",
    "trapWarning": "Stopping at y\u00b3 because the terms are not written in descending order.",
    "correctKey": null,
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 4,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Mathematics)"
  },
  {
    "id": "Q-MAT-POLY-NCERT9-EX23-Q01-III",
    "code": "Q-MAT-POLY-NCERT9-EX23-Q01-III",
    "title": "NCERT Exemplar \u00b7 Class IX Mathematics \u00b7 Unit 2 Polynomials \u00b7 QEx 2.3 Q1(iii) \u00b7 Polynomials",
    "subjectCode": "MATH",
    "subject": "Mathematics",
    "topicCode": "POLYNOMIALS",
    "topic": "Polynomials",
    "subtopic": "CAP-MAT-POLY-FORM-DEGREE-BASIC",
    "exam": "NCERT Exemplar",
    "year": 2024,
    "paper": "Class IX Mathematics \u00b7 Unit 2 Polynomials",
    "questionNumber": "Ex 2.3 Q1(iii)",
    "section": "FAM-MAT-POLY-FORM-DEGREE",
    "markingScheme": "+4 / -1",
    "difficultyBand": "D1",
    "difficultyScore": 1,
    "difficultyBasis": "Assessed at cognitive difficulty D1",
    "cognitiveComponents": {
      "concept_model_selection": 1,
      "representation_translation": 1,
      "reasoning_chain_length": 1,
      "algebra_computational_load": 0,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "SINGLE_CHOICE",
    "stem": "Find the degree of the polynomial: 2",
    "options": [],
    "hints": [
      "[CONCEPT] Write the non-zero constant polynomial 2 as 2x\u2070.",
      "[METHOD] Use the exponent of its non-zero term as the degree."
    ],
    "steps": [
      "Write the non-zero constant polynomial 2 as 2x\u2070. 2x\u2070.",
      "Use the exponent of its non-zero term as the degree. degree 0.",
      "Distinguish this from the zero polynomial. degree confirmed."
    ],
    "limitingCheck": "Because 2=2x\u2070 is non-zero, its degree is 0.",
    "check": "Because 2=2x\u2070 is non-zero, its degree is 0.",
    "trapWarning": "Confusing a non-zero constant polynomial with the zero polynomial and saying its degree is undefined.",
    "correctKey": null,
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 4,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Mathematics)"
  },
  {
    "id": "Q-MAT-POLY-NCERT9-EX23-Q02-I",
    "code": "Q-MAT-POLY-NCERT9-EX23-Q02-I",
    "title": "NCERT Exemplar \u00b7 Class IX Mathematics \u00b7 Unit 2 Polynomials \u00b7 QEx 2.3 Q2(i) \u00b7 Polynomials",
    "subjectCode": "MATH",
    "subject": "Mathematics",
    "topicCode": "POLYNOMIALS",
    "topic": "Polynomials",
    "subtopic": "CAP-MAT-POLY-COEFFICIENT-BASIC",
    "exam": "NCERT Exemplar",
    "year": 2024,
    "paper": "Class IX Mathematics \u00b7 Unit 2 Polynomials",
    "questionNumber": "Ex 2.3 Q2(i)",
    "section": "FAM-MAT-POLY-COEFFICIENT-BASIC",
    "markingScheme": "+4 / -1",
    "difficultyBand": "D1",
    "difficultyScore": 1,
    "difficultyBasis": "Assessed at cognitive difficulty D1",
    "cognitiveComponents": {
      "concept_model_selection": 1,
      "representation_translation": 1,
      "reasoning_chain_length": 1,
      "algebra_computational_load": 0,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "SINGLE_CHOICE",
    "stem": "Write the coefficient of x\u00b2 in the following: 2 + x\u00b2 + x",
    "options": [],
    "hints": [
      "[CONCEPT] Locate the x\u00b2 term in 2+x\u00b2+x.",
      "[METHOD] Expose the implicit positive unit multiplier in the term x\u00b2."
    ],
    "steps": [
      "In 2+x\u00b2+x, the requested x\u00b2 term is positive and appears without a written numerical multiplier.",
      "Expose the implicit positive unit multiplier: x\u00b2=(+1)\u00b7x\u00b2, so the coefficient of x\u00b2 is 1.",
      "Multiplying +1 by x\u00b2 recovers the original positive x\u00b2 term, confirming the coefficient."
    ],
    "limitingCheck": "In 2+x\u00b2+x, the x\u00b2 term is 1\u00b7x\u00b2, so its coefficient is 1.",
    "check": "In 2+x\u00b2+x, the x\u00b2 term is 1\u00b7x\u00b2, so its coefficient is 1.",
    "trapWarning": "Reporting the exponent 2 instead of the numerical factor multiplying x\u00b2.",
    "correctKey": null,
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 4,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Mathematics)"
  },
  {
    "id": "Q-MAT-POLY-NCERT9-EX23-Q02-II",
    "code": "Q-MAT-POLY-NCERT9-EX23-Q02-II",
    "title": "NCERT Exemplar \u00b7 Class IX Mathematics \u00b7 Unit 2 Polynomials \u00b7 QEx 2.3 Q2(ii) \u00b7 Polynomials",
    "subjectCode": "MATH",
    "subject": "Mathematics",
    "topicCode": "POLYNOMIALS",
    "topic": "Polynomials",
    "subtopic": "CAP-MAT-POLY-COEFFICIENT-BASIC",
    "exam": "NCERT Exemplar",
    "year": 2024,
    "paper": "Class IX Mathematics \u00b7 Unit 2 Polynomials",
    "questionNumber": "Ex 2.3 Q2(ii)",
    "section": "FAM-MAT-POLY-COEFFICIENT-BASIC",
    "markingScheme": "+4 / -1",
    "difficultyBand": "D1",
    "difficultyScore": 1,
    "difficultyBasis": "Assessed at cognitive difficulty D1",
    "cognitiveComponents": {
      "concept_model_selection": 1,
      "representation_translation": 1,
      "reasoning_chain_length": 1,
      "algebra_computational_load": 0,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "SINGLE_CHOICE",
    "stem": "Write the coefficient of x\u00b2 in the following: 2 - x\u00b2 + x\u00b3",
    "options": [],
    "hints": [
      "[CONCEPT] Locate the x\u00b2 term in 2-x\u00b2+x\u00b3.",
      "[METHOD] Carry the written minus sign into the implicit unit multiplier of -x\u00b2."
    ],
    "steps": [
      "In 2-x\u00b2+x\u00b3, the requested x\u00b2 term is -x\u00b2, so its sign must be part of the coefficient.",
      "Carry the minus sign into the implicit unit multiplier: -x\u00b2=(-1)\u00b7x\u00b2, giving coefficient -1.",
      "Multiplying -1 by x\u00b2 reproduces the original negative x\u00b2 term, confirming the signed coefficient."
    ],
    "limitingCheck": "In 2-x\u00b2+x\u00b3, the x\u00b2 term is (-1)\u00b7x\u00b2, so its coefficient is -1.",
    "check": "In 2-x\u00b2+x\u00b3, the x\u00b2 term is (-1)\u00b7x\u00b2, so its coefficient is -1.",
    "trapWarning": "Ignoring the minus sign and reporting the coefficient of -x\u00b2 as +1.",
    "correctKey": null,
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 4,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Mathematics)"
  },
  {
    "id": "PYQ-PHY-IITJEE-2007-P1-Q03",
    "code": "PYQ-PHY-IITJEE-2007-P1-Q03",
    "title": "IIT-JEE \u00b7 Paper I \u00b7 Q3 \u00b7 Newton's Laws of Motion / NLM",
    "subjectCode": "PHYS",
    "subject": "Physics",
    "topicCode": "NEWTON_S_LAWS_OF_MOTION_NLM",
    "topic": "Newton's Laws of Motion / NLM",
    "subtopic": "CAP-NLM-SECOND-LAW",
    "exam": "IIT-JEE",
    "year": 2007,
    "paper": "Paper I",
    "questionNumber": "3",
    "section": "FAM-PHY-NLM-PRACTICE",
    "markingScheme": "+4 / -1",
    "difficultyBand": "D3",
    "difficultyScore": 6,
    "difficultyBasis": "Changing string geometry must be translated into tension components before Newton II is applied.",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 2,
      "reasoning_chain_length": 1,
      "representation_translation": 2,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "MODEL",
    "kind": "SINGLE_CHOICE",
    "stem": "Two equal masses m lie on a smooth horizontal surface and are joined by a light string of total length 2a. The midpoint of the initially taut string is pulled vertically upward by a small constant force F. When the masses are separated by 2x, determine the magnitude of the acceleration of either mass.",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) (F/2m)\u00b7a/sqrt(a^2-x^2)"
      },
      {
        "id": "opt-B",
        "text": "(B) (F/2m)\u00b7x/sqrt(a^2-x^2)"
      },
      {
        "id": "opt-C",
        "text": "(C) (F/2m)\u00b7x/a"
      },
      {
        "id": "opt-D",
        "text": "(D) (F/2m)\u00b7sqrt(a^2-x^2)/x"
      }
    ],
    "hints": [
      "[CONCEPT] Sketch one half-string as a right triangle with horizontal projection x and vertical rise y.",
      "[METHOD] At the pulled midpoint, which components of the two equal tensions balance F?",
      "[METHOD] After finding T, resolve only its horizontal component on either mass."
    ],
    "steps": [
      "Let the midpoint rise by y. String geometry gives x^2 + y^2 = a^2, so y = sqrt(a^2-x^2).",
      "At the massless midpoint, vertical force balance gives 2T(y/a)=F, hence T=Fa/(2y).",
      "The horizontal force on either mass is T(x/a), so its acceleration is F x/[2m sqrt(a^2-x^2)]."
    ],
    "limitingCheck": "As x approaches zero, the horizontal acceleration approaches zero because the string segments become nearly vertical.",
    "check": "As x approaches zero, the horizontal acceleration approaches zero because the string segments become nearly vertical.",
    "trapWarning": "Taking T=F/2 without resolving the angled string segments.",
    "correctKey": "opt-B",
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 4,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Physics)"
  },
  {
    "id": "PYQ-PHY-IITJEE-2007-P1-Q10",
    "code": "PYQ-PHY-IITJEE-2007-P1-Q10",
    "title": "IIT-JEE \u00b7 Paper I \u00b7 Q10 \u00b7 Newton's Laws of Motion / NLM",
    "subjectCode": "PHYS",
    "subject": "Physics",
    "topicCode": "NEWTON_S_LAWS_OF_MOTION_NLM",
    "topic": "Newton's Laws of Motion / NLM",
    "subtopic": "CAP-NLM-FRICTION-QUANT",
    "exam": "IIT-JEE",
    "year": 2007,
    "paper": "Paper I",
    "questionNumber": "10",
    "section": "FAM-PHY-NLM-PRACTICE",
    "markingScheme": "+4 / -1",
    "difficultyBand": "D2",
    "difficultyScore": 4,
    "difficultyBasis": "The task separates friction coefficient from friction work and uses an energy comparison.",
    "cognitiveComponents": {
      "algebra_computational_load": 0,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 1
    },
    "qrtDemand": "VERIFY",
    "kind": "SINGLE_CHOICE",
    "stem": "A block moving on a rough horizontal surface stops after losing its kinetic energy to friction. The same surface is then inclined at 30 degrees and the block is projected up the incline with the same initial speed. Judge these claims: (1) the energy dissipated by friction before stopping is smaller on the incline; (2) the coefficient of friction becomes smaller when the plane is inclined.",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) Both true and (2) explains (1)"
      },
      {
        "id": "opt-B",
        "text": "(B) Both true but (2) does not explain (1)"
      },
      {
        "id": "opt-C",
        "text": "(C) (1) true, (2) false"
      },
      {
        "id": "opt-D",
        "text": "(D) (1) false, (2) true"
      }
    ],
    "hints": [
      "[CONCEPT] Sketch the horizontal and uphill trials with the same starting speed and a final stop.",
      "[CONCEPT] In the level trial there is no height gain.",
      "[METHOD] In the incline trial, reserve part of the initial kinetic energy for gravitational potential energy; do not change \u03bc just because N changes."
    ],
    "steps": [
      "Compare the energy destinations in the level and incline trials while keeping the same initial kinetic energy.",
      "On the horizontal surface the stopping point has no gravitational-potential change, so friction dissipates all the initial kinetic energy.",
      "On the incline, some initial kinetic energy becomes gravitational potential energy before the block stops, so friction dissipates less; the coefficient does not change because the same surfaces remain in contact."
    ],
    "limitingCheck": "The incline case satisfies K_initial = gain in gravitational potential energy + energy dissipated by friction.",
    "check": "The incline case satisfies K_initial = gain in gravitational potential energy + energy dissipated by friction.",
    "trapWarning": "Assuming a smaller friction force means the coefficient itself has changed.",
    "correctKey": "opt-C",
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 4,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Physics)"
  },
  {
    "id": "PYQ-PHY-IITJEE-2008-P2-Q33",
    "code": "PYQ-PHY-IITJEE-2008-P2-Q33",
    "title": "IIT-JEE \u00b7 Paper II \u00b7 Q33 \u00b7 Newton's Laws of Motion / NLM",
    "subjectCode": "PHYS",
    "subject": "Physics",
    "topicCode": "NEWTON_S_LAWS_OF_MOTION_NLM",
    "topic": "Newton's Laws of Motion / NLM",
    "subtopic": "CAP-NLM-FRICTION-QUANT",
    "exam": "IIT-JEE",
    "year": 2008,
    "paper": "Paper II",
    "questionNumber": "33",
    "section": "FAM-PHY-NLM-PRACTICE",
    "markingScheme": "+4 / -1",
    "difficultyBand": "D2",
    "difficultyScore": 3,
    "difficultyBasis": "Requires identifying the normal-force mechanism and separating it from the coefficient-of-friction statement.",
    "cognitiveComponents": {
      "algebra_computational_load": 0,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "SINGLE_CHOICE",
    "stem": "Judge the pair of statements: (1) pulling a heavy body across level ground is easier than pushing it when the applied force is oblique; (2) frictional force depends on the nature of the surfaces in contact.",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) Both true and (2) explains (1)"
      },
      {
        "id": "opt-B",
        "text": "(B) Both true but (2) does not explain (1)"
      },
      {
        "id": "opt-C",
        "text": "(C) (1) true, (2) false"
      },
      {
        "id": "opt-D",
        "text": "(D) (1) false, (2) true"
      }
    ],
    "hints": [
      "[CONCEPT] Draw the body twice: once with an oblique pull and once with an oblique push.",
      "[CONCEPT] Write only the vertical force balance first.",
      "[METHOD] Keep \u03bc fixed because the pair of surfaces is the same; compare friction through the changed N."
    ],
    "steps": [
      "Resolve the oblique applied force into horizontal and vertical components for a pull and for a push.",
      "Use vertical balance: an upward pull reduces N below mg, while a downward push increases N above mg.",
      "Because limiting/sliding friction scales with N, pulling can require less effort; surface nature affects \u03bc but does not explain the pull-versus-push difference for the same surfaces."
    ],
    "limitingCheck": "If the applied force were exactly horizontal, the normal-reaction distinction between pulling and pushing would disappear.",
    "check": "If the applied force were exactly horizontal, the normal-reaction distinction between pulling and pushing would disappear.",
    "trapWarning": "Using the true surface-nature statement as the causal explanation for pull versus push.",
    "correctKey": "opt-B",
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 4,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Physics)"
  },
  {
    "id": "PYQ-PHY-IITJEE-2011-P1-Q41",
    "code": "PYQ-PHY-IITJEE-2011-P1-Q41",
    "title": "IIT-JEE \u00b7 Paper I \u00b7 Q41 \u00b7 Newton's Laws of Motion / NLM",
    "subjectCode": "PHYS",
    "subject": "Physics",
    "topicCode": "NEWTON_S_LAWS_OF_MOTION_NLM",
    "topic": "Newton's Laws of Motion / NLM",
    "subtopic": "CAP-NLM-FRICTION-QUANT",
    "exam": "IIT-JEE",
    "year": 2011,
    "paper": "Paper I",
    "questionNumber": "41",
    "section": "FAM-PHY-NLM-PRACTICE",
    "markingScheme": "+3 / 0",
    "difficultyBand": "D2",
    "difficultyScore": 5,
    "difficultyBasis": "Two limiting-friction states must be written with opposite friction directions.",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 1
    },
    "qrtDemand": "VERIFY",
    "kind": "INTEGER",
    "stem": "A block is on a plane inclined at 45 degrees. The coefficient of friction is mu. The force needed to just push the block upward is three times the force needed to just prevent it from sliding downward. If N = 10 mu, find N.",
    "options": [],
    "hints": [
      "[CONCEPT] Make two incline sketches rather than reusing one friction arrow.",
      "[CONCEPT] The applied forces are parallel to the incline, so they do not change N.",
      "[METHOD] The same \u03bcN term enters with opposite signs in the two along-slope balances."
    ],
    "steps": [
      "Draw the two limiting cases separately and identify the impending motion in each.",
      "Because each applied force is parallel to the plane, N=mg cos45\u00b0. At the limit the friction magnitude is \u03bcN.",
      "Write P_up=mg(sin45\u00b0+\u03bccos45\u00b0) and P_hold=mg(sin45\u00b0-\u03bccos45\u00b0), then impose P_up=3P_hold."
    ],
    "limitingCheck": "With mu=1/2, the two force factors are 1.5 and 0.5, a 3:1 ratio.",
    "check": "With mu=1/2, the two force factors are 1.5 and 0.5, a 3:1 ratio.",
    "trapWarning": "Using the same friction direction in both limiting cases.",
    "correctKey": null,
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Physics)"
  },
  {
    "id": "PYQ-PHY-IITJEE-2011-P2-Q34",
    "code": "PYQ-PHY-IITJEE-2011-P2-Q34",
    "title": "IIT-JEE \u00b7 Paper II \u00b7 Q34 \u00b7 Newton's Laws of Motion / NLM",
    "subjectCode": "PHYS",
    "subject": "Physics",
    "topicCode": "NEWTON_S_LAWS_OF_MOTION_NLM",
    "topic": "Newton's Laws of Motion / NLM",
    "subtopic": "CAP-NLM-FRICTION-QUANT",
    "exam": "IIT-JEE",
    "year": 2011,
    "paper": "Paper II",
    "questionNumber": "34",
    "section": "FAM-PHY-NLM-PRACTICE",
    "markingScheme": "+3 / 0",
    "difficultyBand": "D2",
    "difficultyScore": 5,
    "difficultyBasis": "Requires an energy balance containing both spring storage and dissipative friction.",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 1
    },
    "qrtDemand": "VERIFY",
    "kind": "INTEGER",
    "stem": "A 0.18 kg block on a rough horizontal surface is attached to a spring of force constant 2 N/m. The spring is initially unstretched. The block is given a horizontal impulse and first comes to rest after moving 0.06 m. With coefficient of friction 0.10 and g = 10 m/s^2, its initial speed is N/10 m/s. Find N.",
    "options": [],
    "hints": [
      "[CONCEPT] List every sink of the block's initial kinetic energy before it first stops.",
      "[METHOD] Use the stopping displacement for both spring extension and friction work."
    ],
    "steps": [
      "At the first stopping point, the initial kinetic energy has become spring energy plus work against friction.",
      "Write (1/2)mv^2 = (1/2)kx^2 + mu m g x with m=0.18, k=2, x=0.06 and mu=0.10.",
      "The right side is 0.0036 + 0.0108 = 0.0144 J, so 0.09v^2=0.0144 and v=0.4 m/s; hence N=4."
    ],
    "limitingCheck": "Substituting v=0.4 m/s gives initial kinetic energy 0.0144 J, exactly the spring-plus-friction energy.",
    "check": "Substituting v=0.4 m/s gives initial kinetic energy 0.0144 J, exactly the spring-plus-friction energy.",
    "trapWarning": "Equating all initial kinetic energy to spring energy and forgetting friction work.",
    "correctKey": null,
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Physics)"
  },
  {
    "id": "PYQ-PHY-JEEADV-2014-P2-Q19",
    "code": "PYQ-PHY-JEEADV-2014-P2-Q19",
    "title": "JEE (Advanced) \u00b7 Paper 2 \u00b7 Q19 \u00b7 Newton's Laws of Motion / NLM",
    "subjectCode": "PHYS",
    "subject": "Physics",
    "topicCode": "NEWTON_S_LAWS_OF_MOTION_NLM",
    "topic": "Newton's Laws of Motion / NLM",
    "subtopic": "CAP-NLM-FRICTION-QUANT",
    "exam": "JEE (Advanced)",
    "year": 2014,
    "paper": "Paper 2",
    "questionNumber": "19",
    "section": "FAM-PHY-NLM-PRACTICE",
    "markingScheme": "+4 / -1",
    "difficultyBand": "D3",
    "difficultyScore": 7,
    "difficultyBasis": "Requires a whole-system equilibrium demand, a friction-capacity threshold, and a switch to kinetic friction.",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 2,
      "reasoning_chain_length": 1,
      "representation_translation": 2,
      "trap_exception_sensitivity": 1
    },
    "qrtDemand": "MODEL",
    "kind": "SINGLE_CHOICE",
    "stem": "Two touching blocks m1=1 kg and m2=2 kg rest on an incline of angle theta, with m1 placed just above m2 (up the slope), so m1 presses on m2. The plane is smooth under m1; for m2, static and kinetic friction coefficients are both 0.3. Determine which friction expression applies to m2 at theta = 5\u00b0, 10\u00b0, 15\u00b0 and 20\u00b0. Candidate expressions are: (1) m2 g sin theta; (2) (m1+m2)g sin theta; (3) 0.3 m2 g cos theta; (4) 0.3(m1+m2)g cos theta.",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) P-1, Q-1, R-1, S-3"
      },
      {
        "id": "opt-B",
        "text": "(B) P-2, Q-2, R-2, S-3"
      },
      {
        "id": "opt-C",
        "text": "(C) P-2, Q-2, R-2, S-4"
      },
      {
        "id": "opt-D",
        "text": "(D) P-2, Q-2, R-3, S-3"
      }
    ],
    "hints": [
      "[CONCEPT] Start with a system boundary around both touching blocks while testing rest.",
      "[CONCEPT] Only m2 has a rough contact with the plane.",
      "[METHOD] Do not compare m2g sin\u03b8 with \u03bcm2g cos\u03b8; compare the whole-system demand with the capacity available under m2.",
      "[METHOD] Reduce the threshold to a condition on tan\u03b8 before checking the four angles.",
      "[METHOD] After threshold use the sliding model at m2; below it use only the static friction actually required."
    ],
    "steps": [
      "While testing whether rest is possible, choose m1+m2 as one system along the incline.",
      "Find the capacity of the only rough support: for m2, N=m2g cos\u03b8, so f_max=0.3m2g cos\u03b8.",
      "Compare the whole-system demand with m2's contact capacity: static rest requires (m1+m2)tan\u03b8\u22640.3m2, hence tan\u03b8\u22640.2.",
      "Below threshold use the required static friction; above threshold the system slides and m2's friction is 0.3m2g cos\u03b8."
    ],
    "limitingCheck": "The transition occurs near tan theta=0.2, i.e. theta\u224811.5\u00b0, between 10\u00b0 and 15\u00b0.",
    "check": "The transition occurs near tan theta=0.2, i.e. theta\u224811.5\u00b0, between 10\u00b0 and 15\u00b0.",
    "trapWarning": "Using m2 g sin theta as the required static friction and ignoring the contact force transmitted by m1.",
    "correctKey": "opt-D",
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 4,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Physics)"
  },
  {
    "id": "PYQ-PHY-JEEADV-2020-P1-Q13",
    "code": "PYQ-PHY-JEEADV-2020-P1-Q13",
    "title": "JEE (Advanced) \u00b7 Paper 1 \u00b7 Q13 \u00b7 Newton's Laws of Motion / NLM",
    "subjectCode": "PHYS",
    "subject": "Physics",
    "topicCode": "NEWTON_S_LAWS_OF_MOTION_NLM",
    "topic": "Newton's Laws of Motion / NLM",
    "subtopic": "CAP-NLM-FRICTION-QUANT",
    "exam": "JEE (Advanced)",
    "year": 2020,
    "paper": "Paper 1",
    "questionNumber": "13",
    "section": "FAM-PHY-NLM-PRACTICE",
    "markingScheme": "+3 / 0",
    "difficultyBand": "D4",
    "difficultyScore": 9,
    "difficultyBasis": "A two-stage quasistatic friction process must be combined with changing support reactions from torque balance.",
    "cognitiveComponents": {
      "algebra_computational_load": 2,
      "concept_model_selection": 2,
      "reasoning_chain_length": 2,
      "representation_translation": 2,
      "trap_exception_sensitivity": 1
    },
    "qrtDemand": "VERIFY",
    "kind": "NUMERIC_QUANTITY",
    "stem": "A uniform metre scale is supported horizontally on two index fingers initially at 0.00 cm and 90.00 cm. Both fingers are moved slowly toward the centre. The slipping finger alternates because static and kinetic friction differ. With mu_s=0.40 and mu_k=0.32, find the final distance x_R of the right finger from the 50.00 cm centre at the instant it stops and the left finger starts slipping again.",
    "options": [],
    "hints": [
      "[CONCEPT] Label each finger as its own contact and track which one is slipping and which one is sticking; do not assign one friction law to both.",
      "[CONCEPT] Before using \u03bcN, update the normal reactions from the current support geometry.",
      "[METHOD] The process has two stages. After the first transition, the contact roles reverse and the support reactions must be rebuilt for the new geometry.",
      "[METHOD] At a switch, the currently slipping contact uses \u03bc_kN while the currently sticking contact has reached \u03bc_sN.",
      "[METHOD] Use the updated ratio N_R/N_L=32/(r-50) in \u03bc_kN_R=\u03bc_sN_L."
    ],
    "steps": [
      "Treat the slowly moved metre scale as quasistatic and label the two finger supports by their current coordinates and normal reactions N_L and N_R.",
      "For each current pair of support positions, obtain N_L and N_R from force and torque balance before writing friction.",
      "After the first switch, hold the left finger at 18 cm while the right finger slips inward and recompute the support ratio N_R/N_L=32/(r-50).",
      "At the second stick-slip transition use kinetic friction at the slipping right contact and limiting static friction at the sticking left contact: \u03bc_kN_R=\u03bc_sN_L; this gives r-50=25.6 cm and swaps which finger slips."
    ],
    "limitingCheck": "The result is less than the initial 40 cm offset of the right finger and greater than zero, consistent with inward motion.",
    "check": "The result is less than the initial 40 cm offset of the right finger and greater than zero, consistent with inward motion.",
    "trapWarning": "Using one fixed normal reaction or one friction state throughout both stages, so the second stick-slip threshold is written with stale contact data.",
    "correctKey": null,
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Physics)"
  },
  {
    "id": "PYQ-PHY-IITJEE-2011-P2-Q33",
    "code": "PYQ-PHY-IITJEE-2011-P2-Q33",
    "title": "IIT-JEE \u00b7 Paper II \u00b7 Q33 \u00b7 Motion in 2D / Motion in a Plane \u2014 linear/projectile only",
    "subjectCode": "PHYS",
    "subject": "Physics",
    "topicCode": "MOTION_IN_2D_MOTION_IN_A_PLANE_L",
    "topic": "Motion in 2D / Motion in a Plane \u2014 linear/projectile only",
    "subtopic": "CAP-KIN-PROJECTILE-MODEL",
    "exam": "IIT-JEE",
    "year": 2011,
    "paper": "Paper II",
    "questionNumber": "33",
    "section": "FAM-PHY-KIN-2D-PRACTICE",
    "markingScheme": "+3 / 0",
    "difficultyBand": "D3",
    "difficultyScore": 7,
    "difficultyBasis": "Combines a projectile event clock with accelerated relative horizontal displacement.",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 2,
      "reasoning_chain_length": 1,
      "representation_translation": 2,
      "trap_exception_sensitivity": 1
    },
    "qrtDemand": "VERIFY",
    "kind": "INTEGER",
    "stem": "Inside a train accelerating uniformly along a straight track, a boy throws a ball forward at 10 m/s relative to the train and 60 degrees above the horizontal. To catch it again at the launch height he moves 1.15 m forward inside the train. Using g=10 m/s^2, find the train acceleration in m/s^2.",
    "options": [],
    "hints": [
      "[CONCEPT] Use the vertical return-to-launch-height condition to find the one common catch time.",
      "[METHOD] Write ball-minus-train horizontal displacement over that same interval.",
      "[METHOD] Set the relative displacement equal to the boy's 1.15 m motion."
    ],
    "steps": [
      "Vertical motion fixes the common flight time: T=2(10 sin60)/10=sqrt(3) s.",
      "Relative horizontal displacement in the accelerating train is (10 cos60)T - (1/2)aT^2.",
      "Set this equal to 1.15 m: 5sqrt(3) - 1.5a = 1.15, giving a\u22485 m/s^2."
    ],
    "limitingCheck": "For a=5, the relative displacement is about 1.16 m, consistent with the stated 1.15 m after rounding.",
    "check": "For a=5, the relative displacement is about 1.16 m, consistent with the stated 1.15 m after rounding.",
    "trapWarning": "Treating the train as constant-velocity and using only the ball's horizontal component.",
    "correctKey": null,
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Physics)"
  },
  {
    "id": "PYQ-PHY-JEEADV-2018-P2-Q08",
    "code": "PYQ-PHY-JEEADV-2018-P2-Q08",
    "title": "JEE (Advanced) \u00b7 Paper 2 \u00b7 Q8 \u00b7 Motion in 2D / Motion in a Plane \u2014 linear/projectile only",
    "subjectCode": "PHYS",
    "subject": "Physics",
    "topicCode": "MOTION_IN_2D_MOTION_IN_A_PLANE_L",
    "topic": "Motion in 2D / Motion in a Plane \u2014 linear/projectile only",
    "subtopic": "CAP-KIN-PROJECTILE-MODEL",
    "exam": "JEE (Advanced)",
    "year": 2018,
    "paper": "Paper 2",
    "questionNumber": "8",
    "section": "FAM-PHY-KIN-2D-PRACTICE",
    "markingScheme": "+3 / 0",
    "difficultyBand": "D2",
    "difficultyScore": 5,
    "difficultyBasis": "Requires translating energy loss into speed and then extracting the new vertical component.",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 2,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "NUMERIC_QUANTITY",
    "stem": "A ball is launched from level ground at 45 degrees and reaches a maximum height of 120 m. At its first impact with the ground it loses half its kinetic energy. Immediately after the bounce its velocity is at 30 degrees above the horizontal. Find the new maximum height.",
    "options": [],
    "hints": [
      "[CONCEPT] Use H=u_y^2/(2g) to infer the original vertical component.",
      "[METHOD] A 50% kinetic-energy loss means what happens to speed squared?",
      "[METHOD] Use only the post-bounce vertical component to get the new maximum height."
    ],
    "steps": [
      "Initial maximum height gives u_y^2=2g(120). At 45 degrees, u^2=2u_y^2=480g.",
      "After losing half the kinetic energy, the speed squared becomes v^2=u^2/2=240g.",
      "The new vertical speed squared is v^2 sin^2 30 = 60g, so H'=60g/(2g)=30 m."
    ],
    "limitingCheck": "The post-bounce height is one quarter of 120 m, consistent with half energy and a smaller vertical fraction.",
    "check": "The post-bounce height is one quarter of 120 m, consistent with half energy and a smaller vertical fraction.",
    "trapWarning": "Halving the speed instead of halving speed squared when kinetic energy halves.",
    "correctKey": null,
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Physics)"
  },
  {
    "id": "PYQ-PHY-JEEADV-2019-P2-Q09",
    "code": "PYQ-PHY-JEEADV-2019-P2-Q09",
    "title": "JEE (Advanced) \u00b7 Paper 2 \u00b7 Q9 \u00b7 Motion in 2D / Motion in a Plane \u2014 linear/projectile only",
    "subjectCode": "PHYS",
    "subject": "Physics",
    "topicCode": "MOTION_IN_2D_MOTION_IN_A_PLANE_L",
    "topic": "Motion in 2D / Motion in a Plane \u2014 linear/projectile only",
    "subtopic": "CAP-KIN-PROJECTILE-MODEL",
    "exam": "JEE (Advanced)",
    "year": 2019,
    "paper": "Paper 2",
    "questionNumber": "9",
    "section": "FAM-PHY-KIN-2D-PRACTICE",
    "markingScheme": "+3 / 0",
    "difficultyBand": "D3",
    "difficultyScore": 7,
    "difficultyBasis": "Requires recognizing two different geometric series, for range and time, before taking their ratio.",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 2,
      "reasoning_chain_length": 1,
      "representation_translation": 2,
      "trap_exception_sensitivity": 1
    },
    "qrtDemand": "VERIFY",
    "kind": "NUMERIC_QUANTITY",
    "stem": "A projectile is launched from the ground at speed u0 and angle theta. After each landing it rebounds at the same angle but with speed reduced by a constant factor alpha: u0/alpha, u0/alpha^2, and so on. If the magnitude of average velocity over the entire sequence is 0.8 times the magnitude V1 of the average velocity over the first flight, find alpha.",
    "options": [],
    "hints": [
      "[CONCEPT] For fixed theta, determine how range and flight time scale with launch speed.",
      "[METHOD] Write one geometric series for all ranges and a different one for all flight times.",
      "[METHOD] Divide the two sums and compare with the first-flight average velocity."
    ],
    "steps": [
      "For a fixed launch angle, each flight time is proportional to speed and each range is proportional to speed squared.",
      "Total displacement is R1[1+alpha^-2+alpha^-4+...] while total time is T1[1+alpha^-1+alpha^-2+...].",
      "Thus V_avg/V1 = [1/(1-alpha^-2)]/[1/(1-alpha^-1)] = alpha/(alpha+1)=0.8, giving alpha=4."
    ],
    "limitingCheck": "alpha=4 gives 4/5=0.8 exactly.",
    "check": "alpha=4 gives 4/5=0.8 exactly.",
    "trapWarning": "Averaging the speeds of the flights instead of total displacement divided by total time.",
    "correctKey": null,
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Physics)"
  },
  {
    "id": "PYQ-PHY-JEEADV-2021-P1-Q05",
    "code": "PYQ-PHY-JEEADV-2021-P1-Q05",
    "title": "JEE (Advanced) \u00b7 Paper 1 \u00b7 Q5 \u00b7 Motion in 2D / Motion in a Plane \u2014 linear/projectile only",
    "subjectCode": "PHYS",
    "subject": "Physics",
    "topicCode": "MOTION_IN_2D_MOTION_IN_A_PLANE_L",
    "topic": "Motion in 2D / Motion in a Plane \u2014 linear/projectile only",
    "subtopic": "CAP-KIN-PROJECTILE-MODEL",
    "exam": "JEE (Advanced)",
    "year": 2021,
    "paper": "Paper 1",
    "questionNumber": "5",
    "section": "FAM-PHY-KIN-2D-PRACTICE",
    "markingScheme": "+3 / 0",
    "difficultyBand": "D2",
    "difficultyScore": 4,
    "difficultyBasis": "The split event must be separated from the vertical free-fall event shared by the fragments.",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "NUMERIC_QUANTITY",
    "stem": "A projectile is launched from ground at 5sqrt(2) m/s, at 45 degrees from the vertical. At the highest point it splits into two equal masses. One fragment falls vertically to the ground 0.5 s after splitting. The other fragment reaches the ground t seconds after splitting. Find t.",
    "options": [],
    "hints": [
      "[CONCEPT] Treat the split as a new initial condition at the apex, where the original projectile's vertical velocity is zero.",
      "[METHOD] Find the apex height from u_y, then ask what initial vertical velocity lets a fragment fall that height in exactly 0.5 s."
    ],
    "steps": [
      "Resolve the launch: 5\u221a2 m/s at 45\u00b0 from the vertical gives u_x = u_y = 5 m/s. The apex is at t = u_y/g = 0.5 s, at height H = u_y\u00b2/2g = 25/20 = 1.25 m, where the velocity is (5, 0) m/s.",
      "The fragment that falls vertically covers 1.25 m in 0.5 s. From rest, a 1.25 m fall takes \u221a(2H/g) = \u221a(2.5/10) = 0.5 s, so that fragment starts from rest: zero vertical and zero horizontal velocity just after the split.",
      "Momentum at the split: before, M(5, 0) m/s. After, (M/2)(0, 0) + (M/2)v\u2082, so v\u2082 = (10, 0) m/s. The other fragment also starts with zero vertical velocity from 1.25 m, so it lands after t = \u221a(2H/g) = 0.5 s (at x = 2.5 + 10 \u00d7 0.5 = 7.5 m from the launch point)."
    ],
    "limitingCheck": "Vertical momentum is zero before the split and both fragments have zero vertical velocity after it, so vertical momentum is conserved (0 = 0); both then fall 1.25 m from rest in the same 0.5 s, and horizontal momentum M \u00d7 5 = (M/2) \u00d7 10 checks the second fragment's speed.",
    "check": "Vertical momentum is zero before the split and both fragments have zero vertical velocity after it, so vertical momentum is conserved (0 = 0); both then fall 1.25 m from rest in the same 0.5 s, and horizontal momentum M \u00d7 5 = (M/2) \u00d7 10 checks the second fragment's speed.",
    "trapWarning": "Recomputing a full projectile flight from launch instead of starting the post-split clock at the apex.",
    "correctKey": null,
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Physics)"
  },
  {
    "id": "PYQ-PHY-JEEADV-2021-P1-Q06",
    "code": "PYQ-PHY-JEEADV-2021-P1-Q06",
    "title": "JEE (Advanced) \u00b7 Paper 1 \u00b7 Q6 \u00b7 Motion in 2D / Motion in a Plane \u2014 linear/projectile only",
    "subjectCode": "PHYS",
    "subject": "Physics",
    "topicCode": "MOTION_IN_2D_MOTION_IN_A_PLANE_L",
    "topic": "Motion in 2D / Motion in a Plane \u2014 linear/projectile only",
    "subtopic": "CAP-KIN-PROJECTILE-MODEL",
    "exam": "JEE (Advanced)",
    "year": 2021,
    "paper": "Paper 1",
    "questionNumber": "6",
    "section": "FAM-PHY-KIN-2D-PRACTICE",
    "markingScheme": "+3 / 0",
    "difficultyBand": "D3",
    "difficultyScore": 6,
    "difficultyBasis": "Combines projectile timing with momentum conservation at an internal fragmentation event.",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 2,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 1
    },
    "qrtDemand": "VERIFY",
    "kind": "NUMERIC_QUANTITY",
    "stem": "Use the same projectile-splitting setup as Q5: launch speed 5sqrt(2) m/s at 45 degrees from vertical; at the apex it splits into equal masses and one fragment drops vertically, reaching ground 0.5 s later. Find the horizontal distance x from the launch point at which the other fragment lands.",
    "options": [],
    "hints": [
      "[CONCEPT] Find where the original projectile reaches its apex using its 5 m/s horizontal component.",
      "[METHOD] At the split, conserve horizontal momentum between the two equal fragments.",
      "[METHOD] Use the Q5 post-split fall time for the surviving fragment's horizontal travel."
    ],
    "steps": [
      "The original horizontal speed is 5 m/s and the apex time is 0.5 s, so the split occurs at x=2.5 m.",
      "Horizontal momentum just before splitting is M\u00b75. If one equal fragment has zero horizontal speed, the other equal fragment must have horizontal speed 10 m/s.",
      "During the 0.5 s post-split fall it travels another 5 m horizontally, so x=2.5+5=7.5 m."
    ],
    "limitingCheck": "Horizontal momentum at the split is conserved: (M/2)\u00b70 + (M/2)\u00b710 = M\u00b75.",
    "check": "Horizontal momentum at the split is conserved: (M/2)\u00b70 + (M/2)\u00b710 = M\u00b75.",
    "trapWarning": "Assigning the second fragment the original 5 m/s horizontal speed instead of conserving momentum.",
    "correctKey": null,
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Physics)"
  },
  {
    "id": "PYQ-PHY-JEEADV-2024-P2-Q09",
    "code": "PYQ-PHY-JEEADV-2024-P2-Q09",
    "title": "JEE (Advanced) \u00b7 Paper 2 \u00b7 Q9 \u00b7 Motion in 2D / Motion in a Plane \u2014 linear/projectile only",
    "subjectCode": "PHYS",
    "subject": "Physics",
    "topicCode": "MOTION_IN_2D_MOTION_IN_A_PLANE_L",
    "topic": "Motion in 2D / Motion in a Plane \u2014 linear/projectile only",
    "subtopic": "CAP-KIN-PROJECTILE-MODEL",
    "exam": "JEE (Advanced)",
    "year": 2024,
    "paper": "Paper 2",
    "questionNumber": "9",
    "section": "FAM-PHY-KIN-2D-PRACTICE",
    "markingScheme": "+3 / 0",
    "difficultyBand": "D3",
    "difficultyScore": 7,
    "difficultyBasis": "The clean route uses relative projectile motion to cancel gravity and eliminate the unknown stone speed.",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 2,
      "reasoning_chain_length": 1,
      "representation_translation": 2,
      "trap_exception_sensitivity": 1
    },
    "qrtDemand": "VERIFY",
    "kind": "INTEGER",
    "stem": "A ball is thrown from (0,0) with fixed speed v0 at angle theta0. Simultaneously, a stone is thrown from (L,0) toward the ball at angle 180\u00b0-theta1 with a suitable speed. For (theta0,theta1)=(45\u00b0,45\u00b0) the hit occurs after T1; for (60\u00b0,30\u00b0) it occurs after T2. Find (T1/T2)^2.",
    "options": [],
    "hints": [
      "[CONCEPT] Write the ball-minus-stone relative position; what happens to the identical gravitational acceleration terms?",
      "[METHOD] Use the vertical collision condition to eliminate the stone's unknown launch speed.",
      "[METHOD] Evaluate the resulting collision-time expression for the two angle pairs."
    ],
    "steps": [
      "Because both bodies have the same gravitational acceleration, subtracting their position equations removes the -gt^2/2 term.",
      "For collision, the vertical relative displacement condition gives the stone speed in terms of v0 and the two angles; eliminating it yields T = L sin(theta1)/[v0 sin(theta0+theta1)].",
      "Thus T1=L/(sqrt(2)v0) and T2=L/(2v0), so (T1/T2)^2=2."
    ],
    "limitingCheck": "Both angle pairs have theta0+theta1=90\u00b0, so only sin(theta1) changes: sin45/sin30=sqrt2.",
    "check": "Both angle pairs have theta0+theta1=90\u00b0, so only sin(theta1) changes: sin45/sin30=sqrt2.",
    "trapWarning": "Solving two full projectile trajectories independently without exploiting common gravitational acceleration.",
    "correctKey": null,
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Physics)"
  },
  {
    "id": "PYQ-PHY-IITJEE-2008-P2-Q32",
    "code": "PYQ-PHY-IITJEE-2008-P2-Q32",
    "title": "IIT-JEE \u00b7 Paper II \u00b7 Q32 \u00b7 Motion in 1D \u2014 relative motion only",
    "subjectCode": "PHYS",
    "subject": "Physics",
    "topicCode": "MOTION_IN_1D_RELATIVE_MOTION_ONL",
    "topic": "Motion in 1D \u2014 relative motion only",
    "subtopic": "CAP-RELATIVE-V",
    "exam": "IIT-JEE",
    "year": 2008,
    "paper": "Paper II",
    "questionNumber": "32",
    "section": "FAM-RELATIVE-V",
    "markingScheme": "+4 / -1",
    "difficultyBand": "D2",
    "difficultyScore": 3,
    "difficultyBasis": "Tests the relative-velocity law and distinguishes it from apparent angular motion/parallax.",
    "cognitiveComponents": {
      "algebra_computational_load": 0,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "SINGLE_CHOICE",
    "stem": "A train observer sees nearby stationary ground objects sweep backward while very distant objects can appear nearly stationary. Judge this alongside the statement that, in a laboratory frame, if observer velocity is V1 and object velocity is V2, then object velocity relative to observer is V2-V1.",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) Both true and (2) explains (1)"
      },
      {
        "id": "opt-B",
        "text": "(B) Both true but (2) does not explain (1)"
      },
      {
        "id": "opt-C",
        "text": "(C) (1) true, (2) false"
      },
      {
        "id": "opt-D",
        "text": "(D) (1) false, (2) true"
      }
    ],
    "hints": [
      "[CONCEPT] First verify the observer-order subtraction V_object - V_observer.",
      "[METHOD] Then ask whether two objects at different distances but with the same translational relative velocity must have the same apparent angular speed."
    ],
    "steps": [
      "The vector relation v_object/observer = V2 - V1 is correct for velocities measured in one inertial frame.",
      "Nearby ground objects have obvious angular motion across the observer's field of view as the train moves.",
      "The near-versus-distant visual effect depends on angular/parallax geometry, so the relative-velocity formula alone is not its complete explanation."
    ],
    "limitingCheck": "Two stationary ground objects have the same translational relative velocity to the train but can have very different apparent angular speeds because their distances differ.",
    "check": "Two stationary ground objects have the same translational relative velocity to the train but can have very different apparent angular speeds because their distances differ.",
    "trapWarning": "Treating a correct relative-velocity formula as sufficient explanation of all visual-distance effects.",
    "correctKey": "opt-B",
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 4,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Physics)"
  },
  {
    "id": "PYQ-PHY-JEEADV-2014-P1-Q18",
    "code": "PYQ-PHY-JEEADV-2014-P1-Q18",
    "title": "JEE (Advanced) \u00b7 Paper 1 \u00b7 Q18 \u00b7 Motion in 1D \u2014 relative motion only",
    "subjectCode": "PHYS",
    "subject": "Physics",
    "topicCode": "MOTION_IN_1D_RELATIVE_MOTION_ONL",
    "topic": "Motion in 1D \u2014 relative motion only",
    "subtopic": "CAP-RELATIVE-V",
    "exam": "JEE (Advanced)",
    "year": 2014,
    "paper": "Paper 1",
    "questionNumber": "18",
    "section": "FAM-RELATIVE-V",
    "markingScheme": "+3 / 0",
    "difficultyBand": "D3",
    "difficultyScore": 7,
    "difficultyBasis": "The accepted dual answer exposes a frame/constraint interpretation issue rather than a routine subtraction.",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 2,
      "reasoning_chain_length": 1,
      "representation_translation": 2,
      "trap_exception_sensitivity": 1
    },
    "qrtDemand": "VERIFY",
    "kind": "INTEGER",
    "stem": "A rocket accelerates at 2 m/s^2 along +x in gravity-free space. Its internal chamber is 4 m long. At the same instant, one ball is thrown from the left end at +0.3 m/s relative to the rocket and another from the right end at -0.2 m/s relative to the rocket. Find a source-accepted time at which the balls hit each other.",
    "options": [],
    "hints": [
      "[CONCEPT] For free particles, subtract their inertial accelerations before solving the closing motion.",
      "[METHOD] Separately test whether either released ball reaches a chamber wall before the free-particle meeting.",
      "[METHOD] Keep the two interpretations explicit because the official source accepts both integer answers."
    ],
    "steps": [
      "If the balls are followed as freely moving particles after release, both have the same acceleration in the inertial frame, so their relative acceleration is zero and their closing speed is 0.5 m/s; 4/0.5=8 s.",
      "In the finite accelerating chamber, the rear-thrown ball can reach the left wall before the free-space meeting. In the rocket frame a released ball has pseudo-acceleration -2 m/s^2; for the ball launched leftward, 4=0.2t+t^2 gives t\u22481.90 s.",
      "The source therefore accepts the integer entries 8 and 2, reflecting the free-particle and chamber-contact interpretations."
    ],
    "limitingCheck": "For the unconstrained pair, relative acceleration cancels exactly; for the wall event, t=(-0.2+sqrt(16.04))/2\u22481.90 s.",
    "check": "For the unconstrained pair, relative acceleration cancels exactly; for the wall event, t=(-0.2+sqrt(16.04))/2\u22481.90 s.",
    "trapWarning": "Ignoring either the finite chamber boundary or the fact that equal inertial accelerations cancel in relative motion.",
    "correctKey": null,
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Physics)"
  },
  {
    "id": "PYQ-PHY-IITJEE-2012-P1-Q05",
    "code": "PYQ-PHY-IITJEE-2012-P1-Q05",
    "title": "IIT-JEE \u00b7 Paper I \u00b7 Q5 \u00b7 Motion in 2D / Motion in a Plane \u2014 linear/projectile only",
    "subjectCode": "PHYS",
    "subject": "Physics",
    "topicCode": "MOTION_IN_2D_MOTION_IN_A_PLANE_L",
    "topic": "Motion in 2D / Motion in a Plane \u2014 linear/projectile only",
    "subtopic": "CAP-KIN-PROJECTILE-MODEL",
    "exam": "IIT-JEE",
    "year": 2012,
    "paper": "Paper I",
    "questionNumber": "5",
    "section": "FAM-PHY-KIN-2D-PRACTICE",
    "markingScheme": "+4 / -1",
    "difficultyBand": "D3",
    "difficultyScore": 7,
    "difficultyBasis": "Synchronizes an SHM event with a projectile event using one shared time.",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 2,
      "reasoning_chain_length": 1,
      "representation_translation": 2,
      "trap_exception_sensitivity": 1
    },
    "qrtDemand": "MODEL",
    "kind": "SINGLE_CHOICE",
    "stem": "A block on a frictionless horizontal surface is attached to a spring of natural length 4.9 m whose other end is fixed to a wall. It is stretched by 0.2 m and released, executing SHM with angular frequency pi/3 rad/s. At the same instant a pebble is launched at 45 degrees, toward the block, from a point on the surface 10 m from the wall (on the block's side). If it meets the block after 1 s, determine the launch speed.",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) sqrt(50) m/s"
      },
      {
        "id": "opt-B",
        "text": "(B) sqrt(51) m/s"
      },
      {
        "id": "opt-C",
        "text": "(C) sqrt(52) m/s"
      },
      {
        "id": "opt-D",
        "text": "(D) sqrt(53) m/s"
      }
    ],
    "hints": [
      "[CONCEPT] Evaluate the spring extension at t=1 s from its cosine law.",
      "[METHOD] Translate the resulting block position into the pebble's required horizontal displacement.",
      "[METHOD] Check the vertical projectile displacement at the same time."
    ],
    "steps": [
      "After 1 s the spring extension is 0.2 cos(pi/3) = 0.1 m, so the block is 4.9 + 0.1 = 5.0 m from the wall.",
      "The pebble starts 10 m from the wall and must reach the block, 5.0 m from the wall, in 1 s: it covers 5 m horizontally, so v cos45 = 5.",
      "Hence v=5sqrt(2)=sqrt(50) m/s; its vertical displacement after 1 s is also zero, so the meeting height is consistent."
    ],
    "limitingCheck": "With v/sqrt(2)=5 m/s, y(1)=5-5=0 and the horizontal coordinate is exactly the block coordinate.",
    "check": "With v/sqrt(2)=5 m/s, y(1)=5-5=0 and the horizontal coordinate is exactly the block coordinate.",
    "trapWarning": "Solving the projectile without first locating the moving block at t=1 s.",
    "correctKey": "opt-A",
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 4,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Physics)"
  },
  {
    "id": "PYQ-PHY-JEEADV-2014-P1-Q08",
    "code": "PYQ-PHY-JEEADV-2014-P1-Q08",
    "title": "JEE (Advanced) \u00b7 Paper 1 \u00b7 Q8 \u00b7 Newton's Laws of Motion / NLM",
    "subjectCode": "PHYS",
    "subject": "Physics",
    "topicCode": "NEWTON_S_LAWS_OF_MOTION_NLM",
    "topic": "Newton's Laws of Motion / NLM",
    "subtopic": "CAP-NLM-FRICTION-QUANT",
    "exam": "JEE (Advanced)",
    "year": 2014,
    "paper": "Paper 1",
    "questionNumber": "8",
    "section": "FAM-PHY-NLM-PRACTICE",
    "markingScheme": "+3 / 0",
    "difficultyBand": "D3",
    "difficultyScore": 7,
    "difficultyBasis": "Requires force balance plus torque balance and careful handling of the smooth-wall limiting case.",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 2,
      "reasoning_chain_length": 1,
      "representation_translation": 2,
      "trap_exception_sensitivity": 1
    },
    "qrtDemand": "VERIFY",
    "kind": "MULTIPLE_CHOICE",
    "stem": "A uniform ladder of mass m leans against a vertical wall, making angle theta with the horizontal floor, and is on the verge of slipping. Let the wall and floor friction coefficients be mu1 and mu2, with normal reactions N1 at the wall and N2 at the floor. Identify the source-correct limiting-equilibrium statements.",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) mu1=0, mu2!=0 and N2 tan(theta)=mg/2"
      },
      {
        "id": "opt-B",
        "text": "(B) mu1!=0, mu2=0 and N1 tan(theta)=mg/2"
      },
      {
        "id": "opt-C",
        "text": "(C) mu1!=0, mu2!=0 and N2=mg/(1+mu1 mu2)"
      },
      {
        "id": "opt-D",
        "text": "(D) mu1=0, mu2!=0 and N1 tan(theta)=mg/2"
      }
    ],
    "hints": [
      "[CONCEPT] Draw all four possible contact forces and mark their limiting directions.",
      "[METHOD] Use horizontal and vertical force balance for the two-friction case.",
      "[METHOD] For the smooth-wall case, take moments about the foot to eliminate floor forces."
    ],
    "steps": [
      "With friction at both contacts, horizontal balance gives N1=mu2 N2 and vertical balance gives N2+mu1 N1=mg.",
      "Eliminating N1 yields N2=mg/(1+mu1 mu2), establishing option (C).",
      "If the wall is smooth (mu1=0), taking moments about the foot gives N1 L sin(theta)=mg(L/2)cos(theta), hence N1 tan(theta)=mg/2, establishing option (D)."
    ],
    "limitingCheck": "The smooth-wall special case follows independently from torque balance and does not require a wall friction force.",
    "check": "The smooth-wall special case follows independently from torque balance and does not require a wall friction force.",
    "trapWarning": "Applying one friction formula mechanically without separating the general and smooth-wall cases.",
    "correctKey": "opt-C",
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Physics)"
  },
  {
    "id": "PYQ-PHY-NEET-2020-E1-Q160",
    "code": "PYQ-PHY-NEET-2020-E1-Q160",
    "title": "NEET (UG) \u00b7 English Set E1 \u00b7 Q160 \u00b7 Newton's Laws of Motion / NLM",
    "subjectCode": "PHYS",
    "subject": "Physics",
    "topicCode": "NEWTON_S_LAWS_OF_MOTION_NLM",
    "topic": "Newton's Laws of Motion / NLM",
    "subtopic": "CAP-NLM-SECOND-LAW",
    "exam": "NEET (UG)",
    "year": 2020,
    "paper": "English Set E1",
    "questionNumber": "160",
    "section": "FAM-PHY-NLM-PRACTICE",
    "markingScheme": "+4 / -1",
    "difficultyBand": "D2",
    "difficultyScore": 3,
    "difficultyBasis": "Direct Newton-II application to a two-body connected system.",
    "cognitiveComponents": {
      "algebra_computational_load": 0,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "SINGLE_CHOICE",
    "stem": "Two masses, 4 kg and 6 kg, are connected by a massless string over a frictionless pulley. Find the magnitude of the system acceleration in terms of g.",
    "options": [
      {
        "id": "opt-A",
        "text": "(1) g"
      },
      {
        "id": "opt-B",
        "text": "(2) g/2"
      },
      {
        "id": "opt-C",
        "text": "(3) g/5"
      },
      {
        "id": "opt-D",
        "text": "(4) g/10"
      }
    ],
    "hints": [
      "[CONCEPT] Identify the unbalanced weight difference that drives the pair.",
      "[METHOD] Apply Newton II to the combined 10 kg system."
    ],
    "steps": [
      "For an ideal Atwood machine, the net driving force is (6-4)g=2g.",
      "The total accelerated mass is 10 kg, so a=2g/10=g/5."
    ],
    "limitingCheck": "Writing 6g-T=6a and T-4g=4a and adding gives the same result.",
    "check": "Writing 6g-T=6a and T-4g=4a and adding gives the same result.",
    "trapWarning": "Dividing by one mass instead of the total moving mass.",
    "correctKey": "opt-A",
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 4,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Physics)"
  },
  {
    "id": "PYQ-PHY-JEEADV-2022-P1-Q08",
    "code": "PYQ-PHY-JEEADV-2022-P1-Q08",
    "title": "JEE (Advanced) \u00b7 Paper 1 \u00b7 Q8 \u00b7 Motion in 2D / Motion in a Plane \u2014 linear/projectile only",
    "subjectCode": "PHYS",
    "subject": "Physics",
    "topicCode": "MOTION_IN_2D_MOTION_IN_A_PLANE_L",
    "topic": "Motion in 2D / Motion in a Plane \u2014 linear/projectile only",
    "subtopic": "CAP-KIN-PROJECTILE-MODEL",
    "exam": "JEE (Advanced)",
    "year": 2022,
    "paper": "Paper 1",
    "questionNumber": "8",
    "section": "FAM-PHY-KIN-2D-PRACTICE",
    "markingScheme": "+3 / 0",
    "difficultyBand": "D3",
    "difficultyScore": 6,
    "difficultyBasis": "Splits one projectile into two acceleration regimes while preserving the apex state.",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 2,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 1
    },
    "qrtDemand": "VERIFY",
    "kind": "NUMERIC_QUANTITY",
    "stem": "A projectile has ordinary range d when launched at speed v and angle theta under gravity g. At the highest point it enters a region where the effective downward acceleration is g/0.81. If its new total horizontal range is d'=n d, find n.",
    "options": [],
    "hints": [
      "[CONCEPT] Use symmetry only for the ordinary projectile to identify the apex position.",
      "[METHOD] Compare the fall time from a fixed height under g and g/0.81.",
      "[METHOD] Convert that time ratio into the second-stage horizontal distance."
    ],
    "steps": [
      "The projectile reaches the apex after covering half of its ordinary range, d/2.",
      "The apex height is unchanged, but the downward acceleration becomes g/0.81, so the fall time from the apex is 0.9 times the original descent time.",
      "The second horizontal segment is therefore 0.9(d/2); hence d'=d/2+0.9d/2=0.95d."
    ],
    "limitingCheck": "Stronger effective gravity must shorten only the post-apex horizontal segment, so n must lie between 0.5 and 1.",
    "check": "Stronger effective gravity must shorten only the post-apex horizontal segment, so n must lie between 0.5 and 1.",
    "trapWarning": "Recomputing the whole flight with the modified gravity instead of changing only the descent.",
    "correctKey": null,
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Physics)"
  },
  {
    "id": "PYQ-PHY-JEEADV-2023-P1-Q01",
    "code": "PYQ-PHY-JEEADV-2023-P1-Q01",
    "title": "JEE (Advanced) \u00b7 Paper 1 \u00b7 Q1 \u00b7 Motion in 2D / Motion in a Plane \u2014 linear/projectile only",
    "subjectCode": "PHYS",
    "subject": "Physics",
    "topicCode": "MOTION_IN_2D_MOTION_IN_A_PLANE_L",
    "topic": "Motion in 2D / Motion in a Plane \u2014 linear/projectile only",
    "subtopic": "CAP-KIN-PROJECTILE-MODEL",
    "exam": "JEE (Advanced)",
    "year": 2023,
    "paper": "Paper 1",
    "questionNumber": "1",
    "section": "FAM-PHY-KIN-2D-PRACTICE",
    "markingScheme": "+3 / 0",
    "difficultyBand": "D4",
    "difficultyScore": 8,
    "difficultyBasis": "Chains energy, projectile motion and restitution across two events.",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 2,
      "reasoning_chain_length": 2,
      "representation_translation": 2,
      "trap_exception_sensitivity": 1
    },
    "qrtDemand": "MODEL",
    "kind": "MULTIPLE_CHOICE",
    "stem": "A ball slides without friction from a height h above a terrace whose top is 3h above the ground, leaves horizontally, strikes the ground and rebounds with coefficient of restitution 1/sqrt(3). Determine which of the source statements about launch speed, impact angle, rebound velocity and rebound geometry are correct.",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) u0=sqrt(2gh) horizontally"
      },
      {
        "id": "opt-B",
        "text": "(B) rebound velocity equals sqrt(2gh)(x-hat - z-hat)"
      },
      {
        "id": "opt-C",
        "text": "(C) impact angle is 60 degrees"
      },
      {
        "id": "opt-D",
        "text": "(D) horizontal range divided by rebound maximum height is 2sqrt(3)"
      }
    ],
    "hints": [
      "[CONCEPT] Use energy conservation on the slide to get the horizontal launch speed.",
      "[METHOD] Find the vertical impact component from the 3h fall.",
      "[METHOD] Apply restitution to the vertical component, then compute rebound height and compare with the first-flight range."
    ],
    "steps": [
      "Energy on the slide gives horizontal launch speed u0=sqrt(2gh).",
      "Falling through 3h gives vertical impact speed sqrt(6gh), so tan(theta)=sqrt(6gh)/sqrt(2gh)=sqrt(3), hence theta=60 degrees.",
      "After impact the upward vertical component is sqrt(2gh); rebound height is h, while pre-impact flight gives horizontal distance 2sqrt(3)h, so d/h1=2sqrt(3)."
    ],
    "limitingCheck": "The restitution factor maps the downward sqrt(6gh) to an upward sqrt(2gh), so the rebound velocity is sqrt(2gh)(x-hat + z-hat) with z-hat upward; option (B)'s (x-hat - z-hat) points downward and is not correct.",
    "check": "The restitution factor maps the downward sqrt(6gh) to an upward sqrt(2gh), so the rebound velocity is sqrt(2gh)(x-hat + z-hat) with z-hat upward; option (B)'s (x-hat - z-hat) points downward and is not correct.",
    "trapWarning": "Losing the sign of the rebound vertical velocity or mixing launch/drop heights.",
    "correctKey": "opt-A",
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Physics)"
  },
  {
    "id": "PYQ-PHY-JEEADV-2025-P2-Q15",
    "code": "PYQ-PHY-JEEADV-2025-P2-Q15",
    "title": "JEE (Advanced) \u00b7 Paper 2 \u00b7 Q15 \u00b7 Motion in 2D / Motion in a Plane \u2014 linear/projectile only",
    "subjectCode": "PHYS",
    "subject": "Physics",
    "topicCode": "MOTION_IN_2D_MOTION_IN_A_PLANE_L",
    "topic": "Motion in 2D / Motion in a Plane \u2014 linear/projectile only",
    "subtopic": "CAP-KIN-2D-CONSTANT-ACCELERATION",
    "exam": "JEE (Advanced)",
    "year": 2025,
    "paper": "Paper 2",
    "questionNumber": "15",
    "section": "FAM-PHY-KIN-2D-PRACTICE",
    "markingScheme": "+3 / 0",
    "difficultyBand": "D4",
    "difficultyScore": 8,
    "difficultyBasis": "Requires solving a velocity-dependent Newton-II equation and integrating the horizontal component.",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 2,
      "reasoning_chain_length": 2,
      "representation_translation": 2,
      "trap_exception_sensitivity": 1
    },
    "qrtDemand": "MODEL",
    "kind": "NUMERIC_QUANTITY",
    "stem": "A 0.2 kg projectile is launched at 270 m/s at 60 degrees in a medium with linear drag F=-c v, where c=0.1 kg/s. It hits a vertical wall after 2 s. Taking e=2.7 for the exponential evaluation specified by the source, determine the horizontal distance to the wall.",
    "options": [],
    "hints": [
      "[CONCEPT] Write Newton II for the horizontal component only.",
      "[METHOD] Identify the decay time constant m/c.",
      "[METHOD] Integrate vx(t) from 0 to 2 s rather than multiplying the final speed by time."
    ],
    "steps": [
      "The horizontal component obeys m dvx/dt=-c vx, so vx(t)=vx0 exp[-(c/m)t].",
      "Here vx0=270 cos60=135 m/s and m/c=2 s, so x(t)=vx0(m/c)[1-exp(-ct/m)].",
      "At t=2 s, x=270(1-1/e)=270(1-1/2.7)=170 m."
    ],
    "limitingCheck": "The distance is smaller than the no-drag value 135\u00d72=270 m, as it must be.",
    "check": "The distance is smaller than the no-drag value 135\u00d72=270 m, as it must be.",
    "trapWarning": "Using constant-acceleration projectile formulas despite velocity-dependent drag.",
    "correctKey": null,
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Physics)"
  },
  {
    "id": "PYQ-PHY-IITJEE-2009-P1-Q49",
    "code": "PYQ-PHY-IITJEE-2009-P1-Q49",
    "title": "IIT-JEE \u00b7 Paper I \u00b7 Q49 \u00b7 Newton's Laws of Motion / NLM",
    "subjectCode": "PHYS",
    "subject": "Physics",
    "topicCode": "NEWTON_S_LAWS_OF_MOTION_NLM",
    "topic": "Newton's Laws of Motion / NLM",
    "subtopic": "CAP-NLM-FORCES-SUM-ZERO",
    "exam": "IIT-JEE",
    "year": 2009,
    "paper": "Paper I",
    "questionNumber": "49",
    "section": "FAM-PHY-NLM-PRACTICE",
    "markingScheme": "+3 / 0",
    "difficultyBand": "D2",
    "difficultyScore": 3,
    "difficultyBasis": "Tests the exact consequence of zero resultant external force without overextending it to energy or torque statements.",
    "cognitiveComponents": {
      "algebra_computational_load": 0,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 0,
      "trap_exception_sensitivity": 1
    },
    "qrtDemand": "VERIFY",
    "kind": "MULTIPLE_CHOICE",
    "stem": "In an inertial frame, the resultant of all external forces on a system of particles is zero. Which quantity is guaranteed not to change with time?",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) Linear momentum of the system"
      },
      {
        "id": "opt-B",
        "text": "(B) Kinetic energy of the system"
      },
      {
        "id": "opt-C",
        "text": "(C) Angular momentum of the system"
      },
      {
        "id": "opt-D",
        "text": "(D) Potential energy of the system"
      }
    ],
    "hints": [
      "[CONCEPT] Recall the system form of Newton's second law.",
      "[METHOD] Ask which conservation statement follows directly from F_ext=0.",
      "[METHOD] Check why zero net force does not imply zero torque or constant kinetic energy."
    ],
    "steps": [
      "For a system of particles, dP/dt equals the resultant external force.",
      "Since the resultant external force is zero, dP/dt=0 and total linear momentum is constant.",
      "Zero net force does not by itself guarantee zero external torque or conservation of kinetic or potential energy."
    ],
    "limitingCheck": "Internal interactions can change kinetic or potential energy while leaving total linear momentum unchanged.",
    "check": "Internal interactions can change kinetic or potential energy while leaving total linear momentum unchanged.",
    "trapWarning": "Assuming zero net external force implies every mechanical quantity is conserved.",
    "correctKey": "opt-A",
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Physics)"
  },
  {
    "id": "PYQ-PHY-IITJEE-2009-P2-Q40",
    "code": "PYQ-PHY-IITJEE-2009-P2-Q40",
    "title": "IIT-JEE \u00b7 Paper II \u00b7 Q40 \u00b7 Newton's Laws of Motion / NLM",
    "subjectCode": "PHYS",
    "subject": "Physics",
    "topicCode": "NEWTON_S_LAWS_OF_MOTION_NLM",
    "topic": "Newton's Laws of Motion / NLM",
    "subtopic": "CAP-NLM-FRAME-CHOICE",
    "exam": "IIT-JEE",
    "year": 2009,
    "paper": "Paper II",
    "questionNumber": "40",
    "section": "FAM-PHY-NLM-PRACTICE",
    "markingScheme": "+4 / -1",
    "difficultyBand": "D3",
    "difficultyScore": 6,
    "difficultyBasis": "Requires choosing the accelerating frame and combining gravity with pseudo-force along a curved constraint.",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 2,
      "reasoning_chain_length": 1,
      "representation_translation": 2,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "SINGLE_CHOICE",
    "stem": "A bead can slide without friction on a wire shaped as the parabola y=kx^2, with y vertical. The wire is accelerated horizontally with constant acceleration a. Find the distance from the y-axis of the new equilibrium position where the bead can remain at rest relative to the wire.",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) a/(gk)"
      },
      {
        "id": "opt-B",
        "text": "(B) a/(2gk)"
      },
      {
        "id": "opt-C",
        "text": "(C) 2a/(gk)"
      },
      {
        "id": "opt-D",
        "text": "(D) a/(4gk)"
      }
    ],
    "hints": [
      "[CONCEPT] Work in the wire frame, where the bead is stationary at the desired equilibrium.",
      "[METHOD] Add the pseudo-force opposite the wire acceleration.",
      "[METHOD] Substitute y=kx^2 into the effective potential and differentiate with respect to x."
    ],
    "steps": [
      "In the accelerating wire frame, the bead experiences gravity downward and a horizontal pseudo-force ma opposite the wire acceleration.",
      "The effective potential along the wire is U(x)=mgkx^2 \u00b1 max, with the sign depending on the acceleration direction.",
      "Equilibrium requires dU/dx=0, so 2mgkx \u00b1 ma=0 and the distance magnitude is |x|=a/(2gk)."
    ],
    "limitingCheck": "As a approaches zero, the equilibrium returns to the parabola's lowest point x=0.",
    "check": "As a approaches zero, the equilibrium returns to the parabola's lowest point x=0.",
    "trapWarning": "Applying only gravity and leaving the equilibrium at the vertex despite the accelerating support.",
    "correctKey": "opt-B",
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 4,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Physics)"
  },
  {
    "id": "PYQ-PHY-IITJEE-2009-P2-Q55",
    "code": "PYQ-PHY-IITJEE-2009-P2-Q55",
    "title": "IIT-JEE \u00b7 Paper II \u00b7 Q55 \u00b7 Newton's Laws of Motion / NLM",
    "subjectCode": "PHYS",
    "subject": "Physics",
    "topicCode": "NEWTON_S_LAWS_OF_MOTION_NLM",
    "topic": "Newton's Laws of Motion / NLM",
    "subtopic": "CAP-NLM-IDEAL-STRING-TENSION",
    "exam": "IIT-JEE",
    "year": 2009,
    "paper": "Paper II",
    "questionNumber": "55",
    "section": "FAM-PHY-NLM-PRACTICE",
    "markingScheme": "+3 / 0",
    "difficultyBand": "D3",
    "difficultyScore": 6,
    "difficultyBasis": "Requires solving the connected-body acceleration and tension before applying work over the first-second displacement.",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 2,
      "representation_translation": 1,
      "trap_exception_sensitivity": 1
    },
    "qrtDemand": "VERIFY",
    "kind": "INTEGER",
    "stem": "A light inextensible string passes over a smooth fixed pulley and connects masses 0.36 kg and 0.72 kg. The system is released from rest. Taking g=10 m/s^2, find the work in joules done by the string on the 0.36 kg block during the first second.",
    "options": [],
    "hints": [
      "[CONCEPT] Solve the two-mass Atwood acceleration for the common string motion.",
      "[METHOD] Use Newton II on the 0.36 kg block to determine T.",
      "[METHOD] Find its first-second displacement and take W=T s."
    ],
    "steps": [
      "The common acceleration is a=(0.72-0.36)g/(0.72+0.36)=10/3 m/s^2.",
      "For the 0.36 kg block moving upward, T-mg=ma, so T=0.36(10+10/3)=4.8 N.",
      "Its displacement in the first second is s=(1/2)at^2=5/3 m, and string tension acts along the displacement, so W=Ts=4.8\u00d75/3=8 J."
    ],
    "limitingCheck": "The work is positive on the lighter block because its displacement is in the same direction as the tension force.",
    "check": "The work is positive on the lighter block because its displacement is in the same direction as the tension force.",
    "trapWarning": "Using T=mg or using the heavy block's weight difference directly as the work-producing force.",
    "correctKey": null,
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Physics)"
  },
  {
    "id": "PYQ-PHY-IITJEE-2011-P2-Q26",
    "code": "PYQ-PHY-IITJEE-2011-P2-Q26",
    "title": "IIT-JEE \u00b7 Paper II \u00b7 Q26 \u00b7 Motion in 2D / Motion in a Plane \u2014 linear/projectile only",
    "subjectCode": "PHYS",
    "subject": "Physics",
    "topicCode": "MOTION_IN_2D_MOTION_IN_A_PLANE_L",
    "topic": "Motion in 2D / Motion in a Plane \u2014 linear/projectile only",
    "subtopic": "CAP-KIN-PROJECTILE-MODEL",
    "exam": "IIT-JEE",
    "year": 2011,
    "paper": "Paper II",
    "questionNumber": "26",
    "section": "FAM-PHY-KIN-2D-PRACTICE",
    "markingScheme": "+4 / -1",
    "difficultyBand": "D4",
    "difficultyScore": 8,
    "difficultyBasis": "Uses projectile timing to infer post-collision velocities, then links them by momentum conservation.",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 2,
      "reasoning_chain_length": 2,
      "representation_translation": 2,
      "trap_exception_sensitivity": 1
    },
    "qrtDemand": "VERIFY",
    "kind": "SINGLE_CHOICE",
    "stem": "A 0.2 kg ball rests on top of a 5 m vertical post. A 0.01 kg bullet moving horizontally with speed V strikes the ball centrally. After the collision the ball and bullet move independently and land 20 m and 100 m, respectively, from the foot of the post. Find the bullet's initial speed.",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) 250 m/s"
      },
      {
        "id": "opt-B",
        "text": "(B) 250sqrt(2) m/s"
      },
      {
        "id": "opt-C",
        "text": "(C) 400 m/s"
      },
      {
        "id": "opt-D",
        "text": "(D) 500 m/s"
      }
    ],
    "hints": [
      "[CONCEPT] Find the common time to fall 5 m.",
      "[METHOD] Convert each horizontal range into its post-collision horizontal speed.",
      "[METHOD] Apply horizontal momentum conservation across the brief collision."
    ],
    "steps": [
      "From height 5 m with zero initial vertical velocity, the common fall time is t=sqrt(2h/g)=1 s.",
      "Therefore the ball and bullet post-collision horizontal speeds are 20 m/s and 100 m/s.",
      "Horizontal momentum during the short collision is conserved: 0.01V=0.2(20)+0.01(100)=5, giving V=500 m/s."
    ],
    "limitingCheck": "The two bodies have the same fall time because they leave from the same height with zero vertical velocity; their different ranges therefore directly encode different horizontal speeds.",
    "check": "The two bodies have the same fall time because they leave from the same height with zero vertical velocity; their different ranges therefore directly encode different horizontal speeds.",
    "trapWarning": "Treating the ranges as velocities without first establishing the common fall time.",
    "correctKey": "opt-D",
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 4,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Physics)"
  },
  {
    "id": "PYQ-PHY-JEEADV-2014-P1-Q11",
    "code": "PYQ-PHY-JEEADV-2014-P1-Q11",
    "title": "JEE (Advanced) \u00b7 Paper 1 \u00b7 Q11 \u00b7 Motion in 2D / Motion in a Plane \u2014 linear/projectile only",
    "subjectCode": "PHYS",
    "subject": "Physics",
    "topicCode": "MOTION_IN_2D_MOTION_IN_A_PLANE_L",
    "topic": "Motion in 2D / Motion in a Plane \u2014 linear/projectile only",
    "subtopic": "CAP-KIN-2D-INDEPENDENT-COMPONENTS",
    "exam": "JEE (Advanced)",
    "year": 2014,
    "paper": "Paper 1",
    "questionNumber": "11",
    "section": "FAM-PHY-KIN-2D-PRACTICE",
    "markingScheme": "+3 / 0",
    "difficultyBand": "D3",
    "difficultyScore": 7,
    "difficultyBasis": "Requires vector relative velocity plus a perpendicularity constraint before using the event separation.",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 2,
      "reasoning_chain_length": 1,
      "representation_translation": 2,
      "trap_exception_sensitivity": 1
    },
    "qrtDemand": "VERIFY",
    "kind": "INTEGER",
    "stem": "Airplanes A and B fly at constant velocities in the same vertical plane, at 30 degrees and 60 degrees to the horizontal. A moves at 100sqrt(3) m/s. At t=0, B is 500 m from A, and an observer in A sees B move perpendicular to A's flight direction. If A just avoids being hit by B, find the encounter time t0.",
    "options": [],
    "hints": [
      "[CONCEPT] Resolve both airplane velocities into horizontal and vertical components.",
      "[METHOD] Impose v_B/A \u00b7 v_A = 0.",
      "[METHOD] After finding relative speed, use the 500 m initial separation."
    ],
    "steps": [
      "Resolve A's velocity as (150, 50sqrt(3)) m/s. Let B's speed be u, so its velocity is (u/2, u sqrt(3)/2).",
      "The relative velocity v_B/A is perpendicular to A's velocity. Their dot product is zero, which gives u=200 m/s.",
      "Then v_B/A=(-50,50sqrt(3)) m/s, whose magnitude is 100 m/s. Closing 500 m at that relative speed gives t0=5 s."
    ],
    "limitingCheck": "500 m / 100 m/s = 5 s, matching the source answer.",
    "check": "500 m / 100 m/s = 5 s, matching the source answer.",
    "trapWarning": "Subtracting scalar speeds instead of velocity vectors.",
    "correctKey": null,
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Physics)"
  },
  {
    "id": "PYQ-PHY-JEEADV-2026-P1-Q06",
    "code": "PYQ-PHY-JEEADV-2026-P1-Q06",
    "title": "JEE (Advanced) \u00b7 Paper 1 \u00b7 Q6 \u00b7 Motion in 2D / Motion in a Plane \u2014 linear/projectile only",
    "subjectCode": "PHYS",
    "subject": "Physics",
    "topicCode": "MOTION_IN_2D_MOTION_IN_A_PLANE_L",
    "topic": "Motion in 2D / Motion in a Plane \u2014 linear/projectile only",
    "subtopic": "CAP-KIN-PROJECTILE-MODEL",
    "exam": "JEE (Advanced)",
    "year": 2026,
    "paper": "Paper 1",
    "questionNumber": "6",
    "section": "FAM-PHY-KIN-2D-PRACTICE",
    "markingScheme": "+3 / 0",
    "difficultyBand": "D3",
    "difficultyScore": 7,
    "difficultyBasis": "Uses a prescribed point on a projectile trajectory plus apex-location reasoning across several launch angles.",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 2,
      "reasoning_chain_length": 1,
      "representation_translation": 2,
      "trap_exception_sensitivity": 1
    },
    "qrtDemand": "MODEL",
    "kind": "MULTIPLE_CHOICE",
    "stem": "A projectile launched from O with speed v at angle theta passes through P, which is 5 m horizontally and 1 m vertically from O. Determine which source statements are correct about the required speed and whether the projectile reaches its maximum height before or after P for specified launch angles.",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) For theta=45\u00b0, v=5sqrt(g)/2 m/s"
      },
      {
        "id": "opt-B",
        "text": "(B) For theta=45\u00b0, maximum height is reached before P"
      },
      {
        "id": "opt-C",
        "text": "(C) For theta=30\u00b0, maximum height is reached after P"
      },
      {
        "id": "opt-D",
        "text": "(D) For theta=tan^-1(1/5), v=125sqrt(g) m/s"
      }
    ],
    "hints": [
      "[CONCEPT] Substitute P=(5,1) into the projectile trajectory equation.",
      "[METHOD] For theta=45\u00b0, solve for v before assessing the apex.",
      "[METHOD] Use the trajectory slope or vertical velocity at x=5 to locate the apex relative to P."
    ],
    "steps": [
      "Use y=x tan(theta)-g x^2/[2v^2 cos^2(theta)] at P=(5,1). For theta=45\u00b0, this gives v^2=25g/4, so v=5sqrt(g)/2; (A) is true.",
      "For the same 45\u00b0 case, the slope of the path at x = 5 m is tan \u03b8 \u2212 g x/(v\u00b2 cos\u00b2 \u03b8) = 1 \u2212 5g/((25g/4)(1/2)) = 1 \u2212 1.6 = \u22120.6 < 0, so the projectile is already descending at P and the apex was passed before P; (B) is true.",
      "For \u03b8 = 30\u00b0: 1 = 5 tan 30\u00b0 \u2212 25g/(2v\u00b2 cos\u00b2 30\u00b0) gives 25g/(1.5v\u00b2) = 2.887 \u2212 1 = 1.887, so v\u00b2 \u2248 8.83g. The slope at x = 5 m is tan 30\u00b0 \u2212 5g/(v\u00b2 cos\u00b2 30\u00b0) \u2248 0.577 \u2212 5/(8.83 \u00d7 0.75) \u2248 0.577 \u2212 0.755 = \u22120.18 < 0, so the apex is before P and (C) is false.",
      "For \u03b8 = tan\u207b\u00b9(1/5), the straight-line term x tan \u03b8 = 5 \u00d7 1/5 = 1 m already equals y at P, so the gravity term g x\u00b2/(2v\u00b2 cos\u00b2 \u03b8) would have to be zero; no finite v does this, and (D) is false."
    ],
    "limitingCheck": "The official final key marks AB.",
    "check": "The official final key marks AB.",
    "trapWarning": "Checking only whether the point lies on the trajectory and not whether the apex occurs before or after it.",
    "correctKey": "opt-A",
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Physics)"
  },
  {
    "id": "PYQ-PHY-JEEADV-2013-P1-Q07",
    "code": "PYQ-PHY-JEEADV-2013-P1-Q07",
    "title": "JEE (Advanced) \u00b7 Paper 1 \u00b7 Q7 \u00b7 Motion in 2D / Motion in a Plane \u2014 linear/projectile only",
    "subjectCode": "PHYS",
    "subject": "Physics",
    "topicCode": "MOTION_IN_2D_MOTION_IN_A_PLANE_L",
    "topic": "Motion in 2D / Motion in a Plane \u2014 linear/projectile only",
    "subtopic": "CAP-KIN-PROJECTILE-MODEL",
    "exam": "JEE (Advanced)",
    "year": 2013,
    "paper": "Paper 1",
    "questionNumber": "7",
    "section": "FAM-PHY-KIN-2D-PRACTICE",
    "markingScheme": "+4 / -1",
    "difficultyBand": "D3",
    "difficultyScore": 7,
    "difficultyBasis": "Combines an apex projectile state, equal-height speed inference, and a completely inelastic vector-momentum collision.",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 2,
      "reasoning_chain_length": 1,
      "representation_translation": 2,
      "trap_exception_sensitivity": 1
    },
    "qrtDemand": "VERIFY",
    "kind": "SINGLE_CHOICE",
    "stem": "A particle of mass m is projected from the ground with speed u0 at angle alpha. At the highest point of its trajectory it undergoes a completely inelastic collision with an identical particle that has been thrown vertically upward from the ground with the same initial speed u0. Find the angle made by the composite body with the horizontal immediately after collision.",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) pi/4"
      },
      {
        "id": "opt-B",
        "text": "(B) pi/4 + alpha"
      },
      {
        "id": "opt-C",
        "text": "(C) pi/2 - alpha"
      },
      {
        "id": "opt-D",
        "text": "(D) pi/2"
      }
    ],
    "hints": [
      "[CONCEPT] At the first particle's apex, write its remaining velocity component.",
      "[METHOD] Use the common collision height to determine the vertical particle's speed there.",
      "[METHOD] Add the two equal, perpendicular incoming momenta vectorially."
    ],
    "steps": [
      "At the first particle's apex, its speed is purely horizontal with magnitude u0 cos(alpha).",
      "The collision height is H=u0^2 sin^2(alpha)/(2g). A second identical particle launched vertically upward from the ground with speed u0 has speed sqrt(u0^2-2gH)=u0 cos(alpha) at that height.",
      "The two equal masses therefore bring equal-magnitude perpendicular momenta into a completely inelastic collision, so the composite momentum bisects the right angle and makes angle pi/4 with the horizontal."
    ],
    "limitingCheck": "Both incoming momentum components have magnitude m u0 cos(alpha), so the post-collision resultant has equal horizontal and vertical components.",
    "check": "Both incoming momentum components have magnitude m u0 cos(alpha), so the post-collision resultant has equal horizontal and vertical components.",
    "trapWarning": "Using the second particle's launch speed u0 as its collision speed instead of accounting for its rise to the collision height.",
    "correctKey": "opt-A",
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 4,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Physics)"
  },
  {
    "id": "PYQ-PHY-JEEMAIN-2026-04APR-S2-Q27",
    "code": "PYQ-PHY-JEEMAIN-2026-04APR-S2-Q27",
    "title": "JEE Main \u00b7 Session 2 \u00b7 04 Apr 2026 \u00b7 Shift 2 \u00b7 Q27 \u00b7 Motion in 1D \u2014 relative motion only",
    "subjectCode": "PHYS",
    "subject": "Physics",
    "topicCode": "MOTION_IN_1D_RELATIVE_MOTION_ONL",
    "topic": "Motion in 1D \u2014 relative motion only",
    "subtopic": "CAP-RELATIVE-V",
    "exam": "JEE Main",
    "year": 2026,
    "paper": "Session 2 \u00b7 04 Apr 2026 \u00b7 Shift 2",
    "questionNumber": "27",
    "section": "FAM-RELATIVE-V",
    "markingScheme": "+4 / -1",
    "difficultyBand": "D2",
    "difficultyScore": 5,
    "difficultyBasis": "Requires choosing the correct pairwise reference frame, one unit conversion and a short relative-velocity equation.",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 1
    },
    "qrtDemand": "VERIFY",
    "kind": "SINGLE_CHOICE",
    "stem": "Cars A and B move in the same direction at 100 km/h and 80 km/h, with A ahead. A passenger in B throws a stone forward so that it reaches A with a speed of 5 m/s relative to A. Find the stone's launch speed v relative to car B, in km/h.",
    "options": [
      {
        "id": "opt-A",
        "text": "18 km/h"
      },
      {
        "id": "opt-B",
        "text": "28 km/h"
      },
      {
        "id": "opt-C",
        "text": "38 km/h"
      },
      {
        "id": "opt-D",
        "text": "48 km/h"
      }
    ],
    "hints": [
      "[CONCEPT] Put all speeds in one frame and one unit before comparing them.",
      "[METHOD] The passenger's v is relative to B, so add B's ground speed before subtracting A's."
    ],
    "steps": [
      "Convert the specified impact speed relative to A: 5 m/s = 18 km/h.",
      "If v is the launch speed relative to B, the stone's ground speed is v+80 km/h; relative to A it is v+80-100.",
      "Set v+80-100=18 to obtain v=38 km/h."
    ],
    "limitingCheck": "With v=38 km/h, the stone moves at 118 km/h relative to the road and therefore closes on car A at 18 km/h = 5 m/s, matching the source condition.",
    "check": "With v=38 km/h, the stone moves at 118 km/h relative to the road and therefore closes on car A at 18 km/h = 5 m/s, matching the source condition.",
    "trapWarning": "Treating the 5 m/s impact speed as a ground-frame speed or subtracting car B's speed in the wrong direction.",
    "correctKey": "opt-C",
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 4,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Physics)"
  },
  {
    "id": "PYQ-PHY-JEEMAIN-2026-04APR-S2-Q29",
    "code": "PYQ-PHY-JEEMAIN-2026-04APR-S2-Q29",
    "title": "JEE Main \u00b7 Session 2 \u00b7 04 Apr 2026 \u00b7 Shift 2 \u00b7 Q29 \u00b7 Motion in 2D / Motion in a Plane \u2014 linear/projectile only",
    "subjectCode": "PHYS",
    "subject": "Physics",
    "topicCode": "MOTION_IN_2D_MOTION_IN_A_PLANE_L",
    "topic": "Motion in 2D / Motion in a Plane \u2014 linear/projectile only",
    "subtopic": "CAP-KIN-2D-INDEPENDENT-COMPONENTS",
    "exam": "JEE Main",
    "year": 2026,
    "paper": "Session 2 \u00b7 04 Apr 2026 \u00b7 Shift 2",
    "questionNumber": "29",
    "section": "FAM-PHY-KIN-2D-PRACTICE",
    "markingScheme": "+4 / -1",
    "difficultyBand": "D2",
    "difficultyScore": 3,
    "difficultyBasis": "Directly translates parametric position into velocity components and then into a direction.",
    "cognitiveComponents": {
      "algebra_computational_load": 0,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "SINGLE_CHOICE",
    "stem": "A projectile has coordinates x=24t and y=43.6t-4.9t^2, with x and y in metres and t in seconds. What angle does its velocity vector make with the horizontal at t=2 s?",
    "options": [
      {
        "id": "opt-A",
        "text": "60\u00b0"
      },
      {
        "id": "opt-B",
        "text": "45\u00b0"
      },
      {
        "id": "opt-C",
        "text": "30\u00b0"
      },
      {
        "id": "opt-D",
        "text": "75\u00b0"
      }
    ],
    "hints": [
      "[CONCEPT] The question asks for the direction of velocity, so differentiate both coordinate functions first.",
      "[METHOD] Use tan(theta)=v_y/v_x only after evaluating both components at t=2 s."
    ],
    "steps": [
      "Differentiate the coordinate laws: v_x=dx/dt=24 m/s and v_y=dy/dt=43.6-9.8t.",
      "At t=2 s, v_y=43.6-19.6=24 m/s.",
      "Thus tan(theta)=v_y/v_x=1, so theta=45\u00b0."
    ],
    "limitingCheck": "Equal positive horizontal and vertical velocity components at t=2 s require a 45\u00b0 direction in the first quadrant.",
    "check": "Equal positive horizontal and vertical velocity components at t=2 s require a 45\u00b0 direction in the first quadrant.",
    "trapWarning": "Using y/x at t=2 s instead of differentiating to obtain the instantaneous velocity direction.",
    "correctKey": "opt-B",
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 4,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Physics)"
  },
  {
    "id": "PYQ-PHY-JEEMAIN-2026-06APR-S2-Q46",
    "code": "PYQ-PHY-JEEMAIN-2026-06APR-S2-Q46",
    "title": "JEE Main \u00b7 Session 2 \u00b7 06 Apr 2026 \u00b7 Shift 2 \u00b7 Q46 \u00b7 Newton's Laws of Motion / NLM",
    "subjectCode": "PHYS",
    "subject": "Physics",
    "topicCode": "NEWTON_S_LAWS_OF_MOTION_NLM",
    "topic": "Newton's Laws of Motion / NLM",
    "subtopic": "CAP-NLM-FRICTION-QUANT",
    "exam": "JEE Main",
    "year": 2026,
    "paper": "Session 2 \u00b7 06 Apr 2026 \u00b7 Shift 2",
    "questionNumber": "46",
    "section": "FAM-PHY-NLM-PRACTICE",
    "markingScheme": "+3 / 0",
    "difficultyBand": "D3",
    "difficultyScore": 6,
    "difficultyBasis": "Combines Newton II on an incline with the time-acceleration scaling for equal-distance motion from rest.",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 2,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 1
    },
    "qrtDemand": "VERIFY",
    "kind": "INTEGER",
    "stem": "A block takes time t to slide from rest down a 45\u00b0 inclined plane. When the same plane is made frictionless, the time becomes t/2. If the original coefficient of friction is alpha/100, find alpha.",
    "options": [],
    "hints": [
      "[CONCEPT] Draw one incline twice\u2014rough and smooth\u2014and take downhill as positive.",
      "[CONCEPT] The two trials cover the same distance from rest.",
      "[METHOD] Do not treat time as linear in acceleration for fixed distance.",
      "[METHOD] At 45\u00b0, sin\u03b8=cos\u03b8, so the rough acceleration factors cleanly.",
      "[METHOD] Check the time ratio from your \u03bc rather than only the algebra."
    ],
    "steps": [
      "Write the downhill accelerations for the same 45\u00b0 plane: a_r=g(sin45\u00b0-\u03bccos45\u00b0) and a_s=g sin45\u00b0.",
      "For equal distance from rest, use s=(1/2)at\u00b2 to compare the two runs.",
      "Because the smooth time is t/2, its acceleration is four times the rough acceleration, not twice.",
      "Substitute the acceleration expressions: 1=4(1-\u03bc), giving \u03bc=3/4 and \u03b1=75."
    ],
    "limitingCheck": "With mu=0.75, the rough acceleration is one quarter of the smooth acceleration, so its travel time is twice as large, exactly as stated.",
    "check": "With mu=0.75, the rough acceleration is one quarter of the smooth acceleration, so its travel time is twice as large, exactly as stated.",
    "trapWarning": "Assuming halving the time only doubles acceleration, or omitting the normal-force factor in kinetic friction.",
    "correctKey": null,
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Physics)"
  },
  {
    "id": "PYQ-PHY-INJSO-2011-Q22",
    "code": "PYQ-PHY-INJSO-2011-Q22",
    "title": "INJSO \u00b7 29 Jan 2011 \u00b7 Q22 \u00b7 Newton's Laws of Motion / NLM",
    "subjectCode": "PHYS",
    "subject": "Physics",
    "topicCode": "NEWTON_S_LAWS_OF_MOTION_NLM",
    "topic": "Newton's Laws of Motion / NLM",
    "subtopic": "CAP-NLM-FRICTION-QUANT",
    "exam": "INJSO",
    "year": 2011,
    "paper": "29 Jan 2011",
    "questionNumber": "22",
    "section": "FAM-PHY-NLM-PRACTICE",
    "markingScheme": "+4 / -1",
    "difficultyBand": "D2",
    "difficultyScore": 4,
    "difficultyBasis": "The arithmetic is tiny; the main difficulty is the high-salience trap of treating \u03bc_sN as the actual static friction instead of first solving the no-slip force demand.",
    "cognitiveComponents": {
      "algebra_computational_load": 0,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 0,
      "trap_exception_sensitivity": 2
    },
    "qrtDemand": "VERIFY",
    "kind": "SINGLE_CHOICE",
    "stem": "A 5 kg block is to be dragged along a rough horizontal surface with coefficients \u03bc_s=0.5 and \u03bc_k=0.3. A horizontal force of 20 N is applied. What are the block's acceleration and the friction force?",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) 0 m/s\u00b2, 20 N"
      },
      {
        "id": "opt-B",
        "text": "(B) 30 m/s\u00b2, 15 N"
      },
      {
        "id": "opt-C",
        "text": "(C) 30 m/s\u00b2, 25 N"
      },
      {
        "id": "opt-D",
        "text": "(D) 0 m/s\u00b2, 15 N"
      }
    ],
    "hints": [
      "[CONCEPT] Draw only the block and the forces that actually act on it; the 20 N pull is horizontal.",
      "[CONCEPT] Static friction is a response, not automatically its maximum.",
      "[METHOD] Compare the needed 20 N with the static limit before choosing the friction model."
    ],
    "steps": [
      "For the proposed rest state, use vertical balance to identify the normal reaction and compute the maximum static-friction magnitude.",
      "Ask how much friction the no-slip state actually requires: horizontal balance requires 20 N opposite the applied force.",
      "Use that static value in Newton's second law to obtain zero acceleration; do not use \u03bc_k because sliding never starts."
    ],
    "limitingCheck": "20 N is below \u03bc_smg=25 N, so the contact can supply exactly 20 N and make the horizontal net force zero.",
    "check": "20 N is below \u03bc_smg=25 N, so the contact can supply exactly 20 N and make the horizontal net force zero.",
    "trapWarning": "Taking static friction to be \u03bc_sN merely because \u03bc_s is given, instead of finding the friction required for rest.",
    "correctKey": "opt-A",
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 4,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Physics)"
  },
  {
    "id": "PYQ-PHY-INJSO-2016-Q32A",
    "code": "PYQ-PHY-INJSO-2016-Q32A",
    "title": "INJSO \u00b7 30 Jan 2016 \u00b7 Q32A \u00b7 Newton's Laws of Motion / NLM",
    "subjectCode": "PHYS",
    "subject": "Physics",
    "topicCode": "NEWTON_S_LAWS_OF_MOTION_NLM",
    "topic": "Newton's Laws of Motion / NLM",
    "subtopic": "CAP-NLM-FRICTION-QUANT",
    "exam": "INJSO",
    "year": 2016,
    "paper": "30 Jan 2016",
    "questionNumber": "32A",
    "section": "FAM-PHY-NLM-PRACTICE",
    "markingScheme": "+3 / 0",
    "difficultyBand": "D3",
    "difficultyScore": 7,
    "difficultyBasis": "Requires switching system boundaries: use P+Q to eliminate the internal contact, then isolate Q and distinguish the table's vector reaction from the inter-block force.",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 2,
      "reasoning_chain_length": 1,
      "representation_translation": 2,
      "trap_exception_sensitivity": 1
    },
    "qrtDemand": "MODEL",
    "kind": "NUMERIC_QUANTITY",
    "stem": "Two solid cubical boxes P (4.0 kg) and Q (8.0 kg) stay in contact while a horizontal force F on P pushes them along a rough horizontal table at constant speed. Their kinetic-friction coefficients with the table are 0.4 and 0.6 respectively. Find F; determine the magnitude and direction of the resultant force exerted by the table on Q; and give the labelled free-body force account for both boxes.",
    "options": [],
    "hints": [
      "[CONCEPT] Mark two distinct rough contacts: P-table and Q-table. Each has its own N and \u03bc_k.",
      "[CONCEPT] For part I, surround both boxes with one system boundary so the P-Q contact force disappears from the external-force sum.",
      "[METHOD] For part II, change the chosen body to Q. Do not mix the P-on-Q contact force with forces exerted by the table.",
      "[METHOD] The table's reaction on Q is a vector resultant of normal and friction.",
      "[METHOD] Close Q's free body independently."
    ],
    "steps": [
      "For each box, use vertical balance and the sliding coefficients to obtain the table friction: 16 N on P and 48 N on Q, both opposite the motion.",
      "Treat P+Q as one system. Constant speed makes the external horizontal force sum zero, so F balances both table-friction forces.",
      "Now isolate Q: the table contributes 48 N friction horizontally and 80 N normal vertically.",
      "Combine the table components: R=\u221a(48\u00b2+80\u00b2)=16\u221a34\u224893.3 N, at tan\u207b\u00b9(5/3) above the horizontal toward P; the Q free body also needs a 48 N push from P."
    ],
    "limitingCheck": "For Q alone, the 48 N push from P balances its 48 N table friction, while the 80 N table normal balances its 80 N weight.",
    "check": "For Q alone, the 48 N push from P balances its 48 N table friction, while the 80 N table normal balances its 80 N weight.",
    "trapWarning": "Using only one friction coefficient for the two-box system, or treating the P-on-Q contact force as part of the table's resultant reaction on Q.",
    "correctKey": null,
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Physics)"
  },
  {
    "id": "PYQ-PHY-INJSO-2018-Q12",
    "code": "PYQ-PHY-INJSO-2018-Q12",
    "title": "INJSO \u00b7 27 Jan 2018 \u00b7 Q12 \u00b7 Newton's Laws of Motion / NLM",
    "subjectCode": "PHYS",
    "subject": "Physics",
    "topicCode": "NEWTON_S_LAWS_OF_MOTION_NLM",
    "topic": "Newton's Laws of Motion / NLM",
    "subtopic": "CAP-NLM-FRICTION-QUANT",
    "exam": "INJSO",
    "year": 2018,
    "paper": "27 Jan 2018",
    "questionNumber": "12",
    "section": "FAM-PHY-NLM-PRACTICE",
    "markingScheme": "+4 / -1",
    "difficultyBand": "D3",
    "difficultyScore": 7,
    "difficultyBasis": "The crux is recognizing that the two moving trials share one kinetic-friction force and eliminating it; the one-person static statement is only a consistency bound.",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 2,
      "reasoning_chain_length": 2,
      "representation_translation": 1,
      "trap_exception_sensitivity": 1
    },
    "qrtDemand": "VERIFY",
    "kind": "SINGLE_CHOICE",
    "stem": "A 100 kg block is on a level rough surface. One person pushing with force F cannot start it. With three people, each pushing with the same force F, it moves with acceleration 0.5 m/s\u00b2. After one person stops pushing, the block moves with uniform speed. Find F and the coefficient of kinetic friction \u03bc.",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) 50 N, 0.05"
      },
      {
        "id": "opt-B",
        "text": "(B) 100 N, 0.10"
      },
      {
        "id": "opt-C",
        "text": "(C) 50 N, 0.10"
      },
      {
        "id": "opt-D",
        "text": "(D) 100 N, 0.20"
      }
    ],
    "hints": [
      "[CONCEPT] Separate the initial static statement from the two later trials where the block is already moving.",
      "[CONCEPT] Translate uniform speed into zero net force before touching the accelerated trial.",
      "[METHOD] Keep one common f_k in both moving equations and eliminate it.",
      "[METHOD] Only after F is known should \u03bc be recovered from f_k=\u03bcN with N=mg.",
      "[METHOD] Use the three-person trial as an independent numerical check."
    ],
    "steps": [
      "On the level surface while sliding, N=mg=1000 N and the kinetic-friction magnitude \u03bcN is the same in the two-person and three-person trials.",
      "Use the two-person uniform-speed trial: 2F=f_k.",
      "Use the three-person trial: 3F-f_k=ma=50 N, then subtract the uniform-speed equation to isolate one person's force.",
      "Back-substitute F=50 N into 2F=1000\u03bc to obtain \u03bc=0.10, then check the three-person acceleration."
    ],
    "limitingCheck": "With \u03bc=0.10, f_k=100 N. Two people supply 100 N for constant speed; three supply net 50 N, giving 0.5 m/s\u00b2.",
    "check": "With \u03bc=0.10, f_k=100 N. Two people supply 100 N for constant speed; three supply net 50 N, giving 0.5 m/s\u00b2.",
    "trapWarning": "Trying to infer \u03bc from the one-person failure to move, or changing the kinetic-friction force between the two moving trials.",
    "correctKey": "opt-C",
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 4,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Physics)"
  },
  {
    "id": "PYQ-PHY-INJSO-2023-Q24",
    "code": "PYQ-PHY-INJSO-2023-Q24",
    "title": "INJSO \u00b7 28 Jan 2023 \u00b7 Q24 \u00b7 Newton's Laws of Motion / NLM",
    "subjectCode": "PHYS",
    "subject": "Physics",
    "topicCode": "NEWTON_S_LAWS_OF_MOTION_NLM",
    "topic": "Newton's Laws of Motion / NLM",
    "subtopic": "CAP-NLM-FRICTION",
    "exam": "INJSO",
    "year": 2023,
    "paper": "28 Jan 2023",
    "questionNumber": "24",
    "section": "FAM-PHY-NLM-PRACTICE",
    "markingScheme": "+3 / 0",
    "difficultyBand": "D2",
    "difficultyScore": 4,
    "difficultyBasis": "No calculation is needed; the trap is force ownership\u2014distinguishing the ground-on-cycle external contact force from forces attributed to tyres inside the chosen system.",
    "cognitiveComponents": {
      "algebra_computational_load": 0,
      "concept_model_selection": 2,
      "reasoning_chain_length": 0,
      "representation_translation": 1,
      "trap_exception_sensitivity": 1
    },
    "qrtDemand": "VERIFY",
    "kind": "MULTIPLE_CHOICE",
    "stem": "A rider is cycling on a level road, applies a brake, and the cycle slows. Select the correct statements about which agent supplies the force that reduces the cycle's speed when only the front brake or only the rear brake is used.",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) With only the front brake, force due to both tyres reduces the cycle's speed."
      },
      {
        "id": "opt-B",
        "text": "(B) With only the front brake, force due to the ground reduces the cycle's speed."
      },
      {
        "id": "opt-C",
        "text": "(C) With only the rear brake, force due to the rear tyre reduces the cycle's speed."
      },
      {
        "id": "opt-D",
        "text": "(D) With only the rear brake, force due to the ground reduces the cycle's speed."
      }
    ],
    "hints": [
      "[CONCEPT] Draw one boundary around rider plus the entire cycle, including both tyres.",
      "[CONCEPT] Keep force ownership explicit: agent \u2192 receiver.",
      "[METHOD] Apply the same ownership test to front-only and rear-only braking."
    ],
    "steps": [
      "Choose the rider+cycle as the body and identify forces crossing that system boundary.",
      "A tyre is part of the chosen system, so a force attributed to the tyre is not the external agent that slows the entire rider+cycle system; the ground is.",
      "The same ownership logic holds whether only the front brake or only the rear brake is applied, so select B and D."
    ],
    "limitingCheck": "If rider, frame and tyres are inside one system boundary, a horizontal momentum change requires a horizontal force from outside it; the road supplies that force.",
    "check": "If rider, frame and tyres are inside one system boundary, a horizontal momentum change requires a horizontal force from outside it; the road supplies that force.",
    "trapWarning": "Naming a tyre as the external agent that slows the whole rider+cycle system because the brake acts on that tyre.",
    "correctKey": "opt-B",
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Physics)"
  },
  {
    "id": "1D-Q01",
    "code": "1D-Q01",
    "title": "JEE Main 2026 (Online) 5th April Evening Shift \u00b7 Diagnostic Hub \u00b7 Q1D-Q01 \u00b7 Motion in 1D",
    "subjectCode": "PHYS",
    "subject": "Physics",
    "topicCode": "MOTION_IN_1D",
    "topic": "Motion in 1D",
    "subtopic": "CAP-PHY-MOTION-1D",
    "exam": "JEE Main 2026 (Online) 5th April Evening Shift",
    "year": "2026",
    "paper": "Diagnostic Hub",
    "questionNumber": "1D-Q01",
    "section": "FAM-PHY-MOTION-1D",
    "markingScheme": "+4 / -1",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Motion in 1D",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "JUSTIFY",
    "kind": "SINGLE_CHOICE",
    "stem": "The velocity-time graph of a particle moving along a straight line is shown. In the time interval 0 to 40 s, the velocity increases linearly from 0 to +20 m/s in 10 s, stays constant at 20 m/s for 10 s (to t=20s), decreases linearly to 0 at t=30s, and reaches -20 m/s at t=40s. Find the total distance travelled and the average velocity during this 40 s period.",
    "options": [
      {
        "id": "opt-D",
        "text": "Distance = 400 m, |Average Velocity| = 5 m/s"
      },
      {
        "id": "opt-D",
        "text": "Distance = 500 m, |Average Velocity| = 7.5 m/s"
      },
      {
        "id": "opt-D",
        "text": "Distance = 400 m, |Average Velocity| = 7.5 m/s"
      },
      {
        "id": "opt-D",
        "text": "Distance = 500 m, |Average Velocity| = 5 m/s"
      }
    ],
    "hints": [
      "[METHOD] Split the v-t graph wherever the velocity law changes and at the sign change.",
      "[METHOD] 0\u201310 s: triangle area = \u00bd(10)(20) = +100 m.",
      "[METHOD] 10\u201320 s: rectangle area = (10)(20) = +200 m."
    ],
    "steps": [
      "Split the v-t graph wherever the velocity law changes and at the sign change.",
      "0\u201310 s: triangle area = \u00bd(10)(20) = +100 m.",
      "10\u201320 s: rectangle area = (10)(20) = +200 m.",
      "20\u201330 s: triangle area = \u00bd(10)(20) = +100 m.",
      "30\u201340 s: triangle lies below the time axis, so signed area = -\u00bd(10)(20) = -100 m.",
      "Total distance = 100 + 200 + 100 + 100 = 500 m.",
      "Net displacement = 100 + 200 + 100 - 100 = +300 m.",
      "Average velocity = displacement / total time = 300/40 = +7.5 m/s."
    ],
    "limitingCheck": "Recompute signed area and absolute area separately; the two agree only when v never changes sign.",
    "check": "Recompute signed area and absolute area separately; the two agree only when v never changes sign.",
    "trapWarning": "Distance is the scalar path length \u222b|v|dt; never subtract the negative area when calculating distance!",
    "correctKey": "opt-D",
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 4,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Physics)"
  },
  {
    "id": "1D-Q02",
    "code": "1D-Q02",
    "title": "JEE Main 2026 (Online) 28th January Evening Shift \u00b7 Diagnostic Hub \u00b7 Q1D-Q02 \u00b7 Motion in 1D",
    "subjectCode": "PHYS",
    "subject": "Physics",
    "topicCode": "MOTION_IN_1D",
    "topic": "Motion in 1D",
    "subtopic": "CAP-PHY-MOTION-1D",
    "exam": "JEE Main 2026 (Online) 28th January Evening Shift",
    "year": "2026",
    "paper": "Diagnostic Hub",
    "questionNumber": "1D-Q02",
    "section": "FAM-PHY-MOTION-1D",
    "markingScheme": "+4 / -1",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Motion in 1D",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "SINGLE_CHOICE",
    "stem": "A particle moves along the x-axis with position x(t) = 6t - t\u00b2 (in meters). What is the total distance travelled by the particle between t = 0 and t = 5 s?",
    "options": [
      {
        "id": "opt-A",
        "text": "5 m"
      },
      {
        "id": "opt-B",
        "text": "9 m"
      },
      {
        "id": "opt-C",
        "text": "13 m"
      },
      {
        "id": "opt-D",
        "text": "25 m"
      }
    ],
    "hints": [
      "[METHOD] Differentiate position: v(t) = dx/dt = 6 - 2t.",
      "[METHOD] Identify turning point where v = 0: 6 - 2t = 0 \u21d2 t_turn = 3 s.",
      "[METHOD] Evaluate position at key moments: x(0) = 0 m; x(3) = 6(3) - 3\u00b2 = 18 - 9 = 9 m; x(5) = 6(5) - 5\u00b2 = 30 - 25 = 5 m."
    ],
    "steps": [
      "Differentiate position: v(t) = dx/dt = 6 - 2t.",
      "Identify turning point where v = 0: 6 - 2t = 0 \u21d2 t_turn = 3 s.",
      "Evaluate position at key moments: x(0) = 0 m; x(3) = 6(3) - 3\u00b2 = 18 - 9 = 9 m; x(5) = 6(5) - 5\u00b2 = 30 - 25 = 5 m.",
      "Distance in forward segment (0 to 3 s): S\u2081 = |x(3) - x(0)| = |9 - 0| = 9 m.",
      "Distance in reverse segment (3 to 5 s): S\u2082 = |x(5) - x(3)| = |5 - 9| = 4 m.",
      "Total distance travelled S = S\u2081 + S\u2082 = 9 + 4 = 13 m.",
      "Net displacement is merely x(5) - x(0) = 5 m!"
    ],
    "limitingCheck": "Differentiate x(t): v=6-2t. At t=3 s, v=0 and x=9 m; x(5)=5 m, so distance is 9+4=13 m.",
    "check": "Differentiate x(t): v=6-2t. At t=3 s, v=0 and x=9 m; x(5)=5 m, so distance is 9+4=13 m.",
    "trapWarning": "Plugging t = 5 directly into x(t) yields displacement (5 m), completely ignoring the 4 m retraced backward!",
    "correctKey": "opt-C",
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 4,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Physics)"
  },
  {
    "id": "1D-Q03",
    "code": "1D-Q03",
    "title": "JEE Main 2025 (Online) 3rd April Evening Shift \u00b7 Diagnostic Hub \u00b7 Q1D-Q03 \u00b7 Motion in 1D",
    "subjectCode": "PHYS",
    "subject": "Physics",
    "topicCode": "MOTION_IN_1D",
    "topic": "Motion in 1D",
    "subtopic": "CAP-PHY-MOTION-1D",
    "exam": "JEE Main 2025 (Online) 3rd April Evening Shift",
    "year": "2025",
    "paper": "Diagnostic Hub",
    "questionNumber": "1D-Q03",
    "section": "FAM-PHY-MOTION-1D",
    "markingScheme": "+4 / -1",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Motion in 1D",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "SINGLE_CHOICE",
    "stem": "The position of a particle is given by x(t) = 4t\u00b3 - 18t\u00b2 + 24t + 2 (in meters). Find the acceleration of the particle at the instant when its instantaneous velocity is zero for the second time.",
    "options": [
      {
        "id": "opt-A",
        "text": "-12 m/s\u00b2"
      },
      {
        "id": "opt-B",
        "text": "+12 m/s\u00b2"
      },
      {
        "id": "opt-C",
        "text": "0 m/s\u00b2"
      },
      {
        "id": "opt-D",
        "text": "+6 m/s\u00b2"
      }
    ],
    "hints": [
      "[METHOD] Velocity v(t) = dx/dt = 12t\u00b2 - 36t + 24.",
      "[METHOD] Set v(t) = 0: 12(t\u00b2 - 3t + 2) = 0 \u21d2 12(t - 1)(t - 2) = 0.",
      "[METHOD] The roots are t\u2081 = 1 s and t\u2082 = 2 s."
    ],
    "steps": [
      "Velocity v(t) = dx/dt = 12t\u00b2 - 36t + 24.",
      "Set v(t) = 0: 12(t\u00b2 - 3t + 2) = 0 \u21d2 12(t - 1)(t - 2) = 0.",
      "The roots are t\u2081 = 1 s and t\u2082 = 2 s.",
      "The second turning point occurs at t = 2 s.",
      "Acceleration function a(t) = dv/dt = 24t - 36.",
      "Substitute t = 2 s: a(2) = 24(2) - 36 = 48 - 36 = +12 m/s\u00b2."
    ],
    "limitingCheck": "Differentiate twice and verify at the second zero of v: v=12(t-1)(t-2), a=24t-36, so a(2)=12 m/s\u00b2.",
    "check": "Differentiate twice and verify at the second zero of v: v=12(t-1)(t-2), a=24t-36, so a(2)=12 m/s\u00b2.",
    "trapWarning": "Never assume acceleration is zero at a turning point! At t = 2 s, v = 0 but acceleration is +12 m/s\u00b2.",
    "correctKey": "opt-B",
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 4,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Physics)"
  },
  {
    "id": "1D-Q04",
    "code": "1D-Q04",
    "title": "JEE Main 2024 (Online) 29th January Morning Shift \u00b7 Diagnostic Hub \u00b7 Q1D-Q04 \u00b7 Motion in 1D",
    "subjectCode": "PHYS",
    "subject": "Physics",
    "topicCode": "MOTION_IN_1D",
    "topic": "Motion in 1D",
    "subtopic": "CAP-PHY-MOTION-1D",
    "exam": "JEE Main 2024 (Online) 29th January Morning Shift",
    "year": "2024",
    "paper": "Diagnostic Hub",
    "questionNumber": "1D-Q04",
    "section": "FAM-PHY-MOTION-1D",
    "markingScheme": "+4 / -1",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Motion in 1D",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "SINGLE_CHOICE",
    "stem": "A body travels the first half of a total distance D with speed v\u2081 = 30 km/h and the remaining half with speed v\u2082 = 60 km/h. Its average speed over the total journey is:",
    "options": [
      {
        "id": "opt-A",
        "text": "45 km/h"
      },
      {
        "id": "opt-B",
        "text": "40 km/h"
      },
      {
        "id": "opt-C",
        "text": "42.5 km/h"
      },
      {
        "id": "opt-D",
        "text": "48 km/h"
      }
    ],
    "hints": [
      "[METHOD] Time for first half: t\u2081 = (D/2) / v\u2081 = D / (2v\u2081).",
      "[METHOD] Time for second half: t\u2082 = (D/2) / v\u2082 = D / (2v\u2082).",
      "[METHOD] Total time: T = t\u2081 + t\u2082 = (D/2) (1/v\u2081 + 1/v\u2082) = (D/2) ((v\u2081 + v\u2082) / (v\u2081 v\u2082))."
    ],
    "steps": [
      "Time for first half: t\u2081 = (D/2) / v\u2081 = D / (2v\u2081).",
      "Time for second half: t\u2082 = (D/2) / v\u2082 = D / (2v\u2082).",
      "Total time: T = t\u2081 + t\u2082 = (D/2) (1/v\u2081 + 1/v\u2082) = (D/2) ((v\u2081 + v\u2082) / (v\u2081 v\u2082)).",
      "Average speed: v_avg = D / T = 2 v\u2081 v\u2082 / (v\u2081 + v\u2082) (Harmonic Mean).",
      "Substitute values: v_avg = 2(30)(60) / (30 + 60) = 3600 / 90 = 40 km/h."
    ],
    "limitingCheck": "Use equal half-distances: total time is D/(2v1)+D/(2v2), giving the harmonic mean 2v1v2/(v1+v2).",
    "check": "Use equal half-distances: total time is D/(2v1)+D/(2v2), giving the harmonic mean 2v1v2/(v1+v2).",
    "trapWarning": "Average speed for equal distances is the HARMONIC mean, NOT the arithmetic mean (30+60)/2 = 45 km/h!",
    "correctKey": "opt-B",
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 4,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Physics)"
  },
  {
    "id": "1D-Q05",
    "code": "1D-Q05",
    "title": "JEE Main 2023 (Online) 11th April Morning Shift \u00b7 Diagnostic Hub \u00b7 Q1D-Q05 \u00b7 Motion in 1D",
    "subjectCode": "PHYS",
    "subject": "Physics",
    "topicCode": "MOTION_IN_1D",
    "topic": "Motion in 1D",
    "subtopic": "CAP-PHY-MOTION-1D",
    "exam": "JEE Main 2023 (Online) 11th April Morning Shift",
    "year": "2023",
    "paper": "Diagnostic Hub",
    "questionNumber": "1D-Q05",
    "section": "FAM-PHY-MOTION-1D",
    "markingScheme": "+4 / -1",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Motion in 1D",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "SINGLE_CHOICE",
    "stem": "A particle moves in a straight line such that its displacement x at time t is related by t = \u03b1 x\u00b2 + \u03b2 x, where \u03b1 and \u03b2 are positive constants. The acceleration of the particle in terms of velocity v is:",
    "options": [
      {
        "id": "opt-A",
        "text": "-2 \u03b1 v\u00b2"
      },
      {
        "id": "opt-B",
        "text": "-2 \u03b1 v\u00b3"
      },
      {
        "id": "opt-C",
        "text": "+2 \u03b1 v\u00b3"
      },
      {
        "id": "opt-D",
        "text": "-\u03b1 v\u00b2"
      }
    ],
    "hints": [
      "[METHOD] Differentiate t with respect to x: dt/dx = 2\u03b1x + \u03b2.",
      "[METHOD] Since v = dx/dt, we have 1/v = 2\u03b1x + \u03b2.",
      "[METHOD] Differentiate both sides with respect to x: -1/v\u00b2 \u00b7 (dv/dx) = 2\u03b1."
    ],
    "steps": [
      "Differentiate t with respect to x: dt/dx = 2\u03b1x + \u03b2.",
      "Since v = dx/dt, we have 1/v = 2\u03b1x + \u03b2.",
      "Differentiate both sides with respect to x: -1/v\u00b2 \u00b7 (dv/dx) = 2\u03b1.",
      "Multiply both sides by -v\u00b2: dv/dx = -2\u03b1 v\u00b2.",
      "Acceleration a = v (dv/dx) = v (-2\u03b1 v\u00b2) = -2\u03b1 v\u00b3."
    ],
    "limitingCheck": "From 1/v=2\u03b1x+\u03b2, differentiate with respect to x: dv/dx=-2\u03b1v\u00b2, then a=v dv/dx=-2\u03b1v\u00b3.",
    "check": "From 1/v=2\u03b1x+\u03b2, differentiate with respect to x: dv/dx=-2\u03b1v\u00b2, then a=v dv/dx=-2\u03b1v\u00b3.",
    "trapWarning": "Chain rule execution: differentiating with respect to x gives dv/dx, then multiplying by v gives a = v(dv/dx) = -2\u03b1 v\u00b3.",
    "correctKey": "opt-B",
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 4,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Physics)"
  },
  {
    "id": "1D-Q06",
    "code": "1D-Q06",
    "title": "JEE Main 2026 (Online) 24th January Evening Shift \u00b7 Diagnostic Hub \u00b7 Q1D-Q06 \u00b7 Motion in 1D",
    "subjectCode": "PHYS",
    "subject": "Physics",
    "topicCode": "MOTION_IN_1D",
    "topic": "Motion in 1D",
    "subtopic": "CAP-PHY-MOTION-1D",
    "exam": "JEE Main 2026 (Online) 24th January Evening Shift",
    "year": "2026",
    "paper": "Diagnostic Hub",
    "questionNumber": "1D-Q06",
    "section": "FAM-PHY-MOTION-1D",
    "markingScheme": "+4 / -1",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Motion in 1D",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "SINGLE_CHOICE",
    "stem": "The velocity-displacement (v-x) graph of a particle moving in a straight line is a straight line with negative slope: v(x) = -m x + v\u2080 (where m, v\u2080 > 0). The corresponding acceleration-displacement (a-x) graph is:",
    "options": [
      {
        "id": "opt-A",
        "text": "A straight line with negative slope and negative intercept"
      },
      {
        "id": "opt-A",
        "text": "A parabola opening upwards"
      },
      {
        "id": "opt-A",
        "text": "A straight line with POSITIVE slope and negative intercept"
      },
      {
        "id": "opt-A",
        "text": "A hyperbola in the fourth quadrant"
      }
    ],
    "hints": [
      "[METHOD] Given: v = -mx + v\u2080.",
      "[METHOD] Slope of v-x graph: dv/dx = -m (constant negative slope).",
      "[METHOD] Fundamental relation: a = v (dv/dx)."
    ],
    "steps": [
      "Given: v = -mx + v\u2080.",
      "Slope of v-x graph: dv/dx = -m (constant negative slope).",
      "Fundamental relation: a = v (dv/dx).",
      "Substitute: a(x) = (-mx + v\u2080) \u00b7 (-m) = m\u00b2 x - m v\u2080.",
      "Compare with standard line equation y = M x + C:",
      "Slope M = m\u00b2 > 0 (strictly positive slope!).",
      "y-intercept C = -m v\u2080 < 0 (negative intercept).",
      "Hence, the a-x plot is a straight line with POSITIVE slope!"
    ],
    "limitingCheck": "Differentiate the loaded v(x): dv/dx=-1.5; multiplying by v(x) gives an a-x line with slope +(1.5)\u00b2.",
    "check": "Differentiate the loaded v(x): dv/dx=-1.5; multiplying by v(x) gives an a-x line with slope +(1.5)\u00b2.",
    "trapWarning": "Negative v-x slope produces a POSITIVE a-x slope because (-m) \u00d7 (-m) = +m\u00b2!",
    "correctKey": "opt-A",
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 4,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Physics)"
  },
  {
    "id": "1D-Q07",
    "code": "1D-Q07",
    "title": "JEE Main 2025 (Online) 8th April Morning Shift \u00b7 Diagnostic Hub \u00b7 Q1D-Q07 \u00b7 Motion in 1D",
    "subjectCode": "PHYS",
    "subject": "Physics",
    "topicCode": "MOTION_IN_1D",
    "topic": "Motion in 1D",
    "subtopic": "CAP-PHY-MOTION-1D",
    "exam": "JEE Main 2025 (Online) 8th April Morning Shift",
    "year": "2025",
    "paper": "Diagnostic Hub",
    "questionNumber": "1D-Q07",
    "section": "FAM-PHY-MOTION-1D",
    "markingScheme": "+4 / -1",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Motion in 1D",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "SINGLE_CHOICE",
    "stem": "The v\u00b2 versus x graph of a particle moving in a straight line is a straight line passing through (0, 100) and (25, 0) (where v is in m/s and x is in m). The magnitude of acceleration of the particle is:",
    "options": [
      {
        "id": "opt-A",
        "text": "4 m/s\u00b2"
      },
      {
        "id": "opt-B",
        "text": "2 m/s\u00b2"
      },
      {
        "id": "opt-C",
        "text": "8 m/s\u00b2"
      },
      {
        "id": "opt-D",
        "text": "1 m/s\u00b2"
      }
    ],
    "hints": [
      "[METHOD] From the 3rd equation of kinematics: v\u00b2 = u\u00b2 + 2ax.",
      "[METHOD] This is of the linear form Y = M X + C, where Y = v\u00b2, X = x, C = u\u00b2, and Slope M = 2a.",
      "[METHOD] Calculate slope from given points: M = (0 - 100) / (25 - 0) = -100 / 25 = -4 m/s\u00b2."
    ],
    "steps": [
      "From the 3rd equation of kinematics: v\u00b2 = u\u00b2 + 2ax.",
      "This is of the linear form Y = M X + C, where Y = v\u00b2, X = x, C = u\u00b2, and Slope M = 2a.",
      "Calculate slope from given points: M = (0 - 100) / (25 - 0) = -100 / 25 = -4 m/s\u00b2.",
      "Since Slope = 2a, we have 2a = -4 \u21d2 a = -2 m/s\u00b2.",
      "The magnitude of acceleration is |a| = 2 m/s\u00b2."
    ],
    "limitingCheck": "The v\u00b2-x slope is -4, so 2a=-4 and a=-2 m/s\u00b2; magnitude is 2 m/s\u00b2.",
    "check": "The v\u00b2-x slope is -4, so 2a=-4 and a=-2 m/s\u00b2; magnitude is 2 m/s\u00b2.",
    "trapWarning": "Forgetting the factor of 2: the slope of v\u00b2-x is 2a, NOT a!",
    "correctKey": "opt-B",
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 4,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Physics)"
  },
  {
    "id": "1D-Q08",
    "code": "1D-Q08",
    "title": "JEE Main 2024 (Online) 31st January Evening Shift \u00b7 Diagnostic Hub \u00b7 Q1D-Q08 \u00b7 Motion in 1D",
    "subjectCode": "PHYS",
    "subject": "Physics",
    "topicCode": "MOTION_IN_1D",
    "topic": "Motion in 1D",
    "subtopic": "CAP-PHY-MOTION-1D",
    "exam": "JEE Main 2024 (Online) 31st January Evening Shift",
    "year": "2024",
    "paper": "Diagnostic Hub",
    "questionNumber": "1D-Q08",
    "section": "FAM-PHY-MOTION-1D",
    "markingScheme": "+4 / -1",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Motion in 1D",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "SINGLE_CHOICE",
    "stem": "The acceleration-time (a-t) graph of a particle starting from rest at t = 0 is a triangle with base from t = 0 to t = 8 s and peak acceleration a_max = 6 m/s\u00b2 at t = 4 s. The maximum velocity reached by the particle is:",
    "options": [
      {
        "id": "opt-A",
        "text": "48 m/s"
      },
      {
        "id": "opt-B",
        "text": "24 m/s"
      },
      {
        "id": "opt-C",
        "text": "12 m/s"
      },
      {
        "id": "opt-D",
        "text": "36 m/s"
      }
    ],
    "hints": [
      "[METHOD] Initial velocity v(0) = 0 (starts from rest).",
      "[METHOD] Change in velocity \u0394v = \u222b a dt = Area under a-t graph.",
      "[METHOD] The graph is a single positive triangle with base b = 8 s and height h = 6 m/s\u00b2."
    ],
    "steps": [
      "Initial velocity v(0) = 0 (starts from rest).",
      "Change in velocity \u0394v = \u222b a dt = Area under a-t graph.",
      "The graph is a single positive triangle with base b = 8 s and height h = 6 m/s\u00b2.",
      "Area = \u00bd \u00d7 base \u00d7 height = \u00bd \u00d7 8 \u00d7 6 = 24 m/s.",
      "Since a \u2265 0 throughout, velocity increases monotonically and reaches its maximum at t = 8 s.",
      "v_max = v(0) + \u0394v = 0 + 24 = 24 m/s."
    ],
    "limitingCheck": "Velocity change is the signed area under the a-t graph: \u00bd(8)(6)=24 m/s.",
    "check": "Velocity change is the signed area under the a-t graph: \u00bd(8)(6)=24 m/s.",
    "trapWarning": "Do not stop integration at peak acceleration (t = 4 s); acceleration remains positive until t = 8 s, so velocity keeps rising!",
    "correctKey": "opt-B",
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 4,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Physics)"
  },
  {
    "id": "1D-Q09",
    "code": "1D-Q09",
    "title": "JEE Main 2023 (Online) 25th January Morning Shift \u00b7 Diagnostic Hub \u00b7 Q1D-Q09 \u00b7 Motion in 1D",
    "subjectCode": "PHYS",
    "subject": "Physics",
    "topicCode": "MOTION_IN_1D",
    "topic": "Motion in 1D",
    "subtopic": "CAP-PHY-MOTION-1D",
    "exam": "JEE Main 2023 (Online) 25th January Morning Shift",
    "year": "2023",
    "paper": "Diagnostic Hub",
    "questionNumber": "1D-Q09",
    "section": "FAM-PHY-MOTION-1D",
    "markingScheme": "+4 / -1",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Motion in 1D",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "SINGLE_CHOICE",
    "stem": "A particle moves such that its acceleration a versus displacement x is given by a(x) = 3x\u00b2 + 2x. If the particle starts from origin (x = 0) with initial velocity v = 2 m/s, its velocity when it reaches x = 2 m is:",
    "options": [
      {
        "id": "opt-A",
        "text": "6 m/s"
      },
      {
        "id": "opt-B",
        "text": "2\u221a7 m/s"
      },
      {
        "id": "opt-C",
        "text": "4\u221a2 m/s"
      },
      {
        "id": "opt-D",
        "text": "2\u221a10 m/s"
      }
    ],
    "hints": [
      "[METHOD] Use differential work-energy relation: a = v (dv/dx) \u21d2 v dv = a(x) dx.",
      "[METHOD] Integrate both sides from x = 0 (v = 2) to x = 2 (v = v_f):",
      "[METHOD] \u222b\u2082^{v_f} v dv = \u222b\u2080\u00b2 (3x\u00b2 + 2x) dx."
    ],
    "steps": [
      "Use differential work-energy relation: a = v (dv/dx) \u21d2 v dv = a(x) dx.",
      "Integrate both sides from x = 0 (v = 2) to x = 2 (v = v_f):",
      "\u222b\u2082^{v_f} v dv = \u222b\u2080\u00b2 (3x\u00b2 + 2x) dx.",
      "LHS: \u00bd (v_f\u00b2 - 2\u00b2) = \u00bd (v_f\u00b2 - 4).",
      "RHS: [x\u00b3 + x\u00b2]\u2080\u00b2 = (2\u00b3 + 2\u00b2) - 0 = 8 + 4 = 12.",
      "Equate: \u00bd (v_f\u00b2 - 4) = 12 \u21d2 v_f\u00b2 - 4 = 24 \u21d2 v_f\u00b2 = 28.",
      "v_f = \u221a28 = 2\u221a7 m/s \u2248 5.29 m/s."
    ],
    "limitingCheck": "Integrate v dv=a(x)dx: \u00bd(v\u00b2-4)=\u222b\u2080\u00b2(3x\u00b2+2x)dx=12, hence v\u00b2=28.",
    "check": "Integrate v dv=a(x)dx: \u00bd(v\u00b2-4)=\u222b\u2080\u00b2(3x\u00b2+2x)dx=12, hence v\u00b2=28.",
    "trapWarning": "Area under a-x curve equals CHANGE IN KINETIC ENERGY PER UNIT MASS, \u00bd(v\u00b2 - u\u00b2), NOT simply v - u!",
    "correctKey": "opt-B",
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 4,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Physics)"
  },
  {
    "id": "1D-Q10",
    "code": "1D-Q10",
    "title": "JEE Main 2026 (Online) 8th April Evening Shift \u00b7 Diagnostic Hub \u00b7 Q1D-Q10 \u00b7 Motion in 1D",
    "subjectCode": "PHYS",
    "subject": "Physics",
    "topicCode": "MOTION_IN_1D",
    "topic": "Motion in 1D",
    "subtopic": "CAP-PHY-MOTION-1D",
    "exam": "JEE Main 2026 (Online) 8th April Evening Shift",
    "year": "2026",
    "paper": "Diagnostic Hub",
    "questionNumber": "1D-Q10",
    "section": "FAM-PHY-MOTION-1D",
    "markingScheme": "+4 / -1",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Motion in 1D",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "SINGLE_CHOICE",
    "stem": "A gas balloon is going up with a constant velocity of 10 m/s. When this balloon reached a height of 75 m from the ground, a stone is dropped from it while the balloon continues rising with the same velocity. The height of the balloon when the stone hits the ground is: (Take g = 10 m/s\u00b2)",
    "options": [
      {
        "id": "opt-A",
        "text": "100 m"
      },
      {
        "id": "opt-B",
        "text": "125 m"
      },
      {
        "id": "opt-C",
        "text": "150 m"
      },
      {
        "id": "opt-D",
        "text": "110 m"
      }
    ],
    "hints": [
      "[METHOD] CRITICAL INHERITANCE: The dropped stone inherits the balloon's upward velocity: u_stone = +10 m/s.",
      "[METHOD] Equation of vertical motion for stone with origin at ground (upwards positive):",
      "[METHOD] y(t) = 75 + 10 t - \u00bd(10) t\u00b2 = 75 + 10 t - 5 t\u00b2."
    ],
    "steps": [
      "CRITICAL INHERITANCE: The dropped stone inherits the balloon's upward velocity: u_stone = +10 m/s.",
      "Equation of vertical motion for stone with origin at ground (upwards positive):",
      "y(t) = 75 + 10 t - \u00bd(10) t\u00b2 = 75 + 10 t - 5 t\u00b2.",
      "When stone hits ground, y(t) = 0: 5 t\u00b2 - 10 t - 75 = 0 \u21d2 t\u00b2 - 2 t - 15 = 0.",
      "Factor quadratic: (t - 5)(t + 3) = 0 \u21d2 t = 5 s (since t > 0).",
      "During these 5 s, the balloon continues rising at steady 10 m/s:",
      "Height of balloon at t = 5 s: H = 75 + (10 m/s \u00d7 5 s) = 75 + 50 = 125 m."
    ],
    "limitingCheck": "Substitute t=5 s into both trajectories: the stone reaches y=0 while the balloon reaches 125 m.",
    "check": "Substitute t=5 s into both trajectories: the stone reaches y=0 while the balloon reaches 125 m.",
    "trapWarning": "Assuming dropped stone has u = 0 leads to t = \u221a(2h/g) = \u221a15 \u2248 3.87 s and completely incorrect balloon height!",
    "correctKey": "opt-B",
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 4,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Physics)"
  },
  {
    "id": "1D-Q11",
    "code": "1D-Q11",
    "title": "JEE Main 2026 (Online) 28th January Morning Shift \u00b7 Diagnostic Hub \u00b7 Q1D-Q11 \u00b7 Motion in 1D",
    "subjectCode": "PHYS",
    "subject": "Physics",
    "topicCode": "MOTION_IN_1D",
    "topic": "Motion in 1D",
    "subtopic": "CAP-PHY-MOTION-1D",
    "exam": "JEE Main 2026 (Online) 28th January Morning Shift",
    "year": "2026",
    "paper": "Diagnostic Hub",
    "questionNumber": "1D-Q11",
    "section": "FAM-PHY-MOTION-1D",
    "markingScheme": "+4 / -1",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Motion in 1D",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "SINGLE_CHOICE",
    "stem": "Water drops fall from a tap on the floor 5 m below at regular time intervals. The first drop strikes the floor at the exact instant the sixth drop begins to fall. The height of the fourth drop from the ground at that instant is: (Take g = 10 m/s\u00b2)",
    "options": [
      {
        "id": "opt-A",
        "text": "3.20 m"
      },
      {
        "id": "opt-B",
        "text": "4.20 m"
      },
      {
        "id": "opt-C",
        "text": "4.80 m"
      },
      {
        "id": "opt-D",
        "text": "3.75 m"
      }
    ],
    "hints": [
      "[METHOD] Let the regular time interval between successive drops be \u0394t.",
      "[METHOD] When the 6th drop begins to fall, the 1st drop has already fallen for 5 intervals: T = 5\u0394t.",
      "[METHOD] For the 1st drop, 5 = \u00bd(10)(5\u0394t)\u00b2 = 125\u0394t\u00b2, so \u0394t\u00b2 = 0.04 and \u0394t = 0.20 s."
    ],
    "steps": [
      "Let the regular time interval between successive drops be \u0394t.",
      "When the 6th drop begins to fall, the 1st drop has already fallen for 5 intervals: T = 5\u0394t.",
      "For the 1st drop, 5 = \u00bd(10)(5\u0394t)\u00b2 = 125\u0394t\u00b2, so \u0394t\u00b2 = 0.04 and \u0394t = 0.20 s.",
      "At the same instant, the 4th drop has been falling for 2 intervals: t\u2084 = 2\u0394t = 0.40 s.",
      "Distance fallen by the 4th drop = \u00bd(10)(0.40)\u00b2 = 0.80 m.",
      "Height of the 4th drop above the floor = 5.00 - 0.80 = 4.20 m."
    ],
    "limitingCheck": "Check the clock indexing: first drop has 5 intervals, fourth has 2; \u0394t=0.2 s and the fourth is 4.2 m above the floor.",
    "check": "Check the clock indexing: first drop has 5 intervals, fourth has 2; \u0394t=0.2 s and the fourth is 4.2 m above the floor.",
    "trapWarning": "Careful with drop indexing! The 4th drop has experienced 2 intervals of fall, NOT 4 intervals. Also remember question asks for height FROM GROUND, not distance from tap!",
    "correctKey": "opt-B",
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 4,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Physics)"
  },
  {
    "id": "1D-Q12",
    "code": "1D-Q12",
    "title": "JEE Main 2025 (Online) 4th April Morning Shift \u00b7 Diagnostic Hub \u00b7 Q1D-Q12 \u00b7 Motion in 1D",
    "subjectCode": "PHYS",
    "subject": "Physics",
    "topicCode": "MOTION_IN_1D",
    "topic": "Motion in 1D",
    "subtopic": "CAP-PHY-MOTION-1D",
    "exam": "JEE Main 2025 (Online) 4th April Morning Shift",
    "year": "2025",
    "paper": "Diagnostic Hub",
    "questionNumber": "1D-Q12",
    "section": "FAM-PHY-MOTION-1D",
    "markingScheme": "+4 / -1",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Motion in 1D",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "SINGLE_CHOICE",
    "stem": "A paratrooper after bailing out falls 50 m without friction. When the parachute opens, he decelerates downwards at 2 m/s\u00b2. He reaches the ground with a speed of 3 m/s. At what height did he bail out? (Take g = 9.8 m/s\u00b2)",
    "options": [
      {
        "id": "opt-A",
        "text": "293 m"
      },
      {
        "id": "opt-B",
        "text": "111 m"
      },
      {
        "id": "opt-C",
        "text": "243 m"
      },
      {
        "id": "opt-D",
        "text": "300 m"
      }
    ],
    "hints": [
      "[METHOD] Phase 1 (Free Fall): h\u2081 = 50 m, initial speed u = 0, acceleration g = 9.8 m/s\u00b2.",
      "[METHOD] Velocity when chute opens: v\u2081\u00b2 = u\u00b2 + 2 g h\u2081 = 0 + 2(9.8)(50) = 980 (m/s)\u00b2.",
      "[METHOD] Phase 2 (Decelerated Descent): Initial velocity v\u2081, landing velocity v\u2082 = 3 m/s, deceleration a = 2 m/s\u00b2."
    ],
    "steps": [
      "Phase 1 (Free Fall): h\u2081 = 50 m, initial speed u = 0, acceleration g = 9.8 m/s\u00b2.",
      "Velocity when chute opens: v\u2081\u00b2 = u\u00b2 + 2 g h\u2081 = 0 + 2(9.8)(50) = 980 (m/s)\u00b2.",
      "Phase 2 (Decelerated Descent): Initial velocity v\u2081, landing velocity v\u2082 = 3 m/s, deceleration a = 2 m/s\u00b2.",
      "Apply 3rd equation: v\u2082\u00b2 = v\u2081\u00b2 - 2 a h\u2082 \u21d2 3\u00b2 = 980 - 2(2) h\u2082.",
      "9 = 980 - 4 h\u2082 \u21d2 4 h\u2082 = 971 \u21d2 h\u2082 = 242.75 m.",
      "Total bail-out height H = h\u2081 + h\u2082 = 50 + 242.75 = 292.75 m \u2248 293 m."
    ],
    "limitingCheck": "State continuity check: v1\u00b2=2gh1=980; the same v1 enters phase 2, giving h2=242.75 m and H=292.75 m.",
    "check": "State continuity check: v1\u00b2=2gh1=980; the same v1 enters phase 2, giving h2=242.75 m and H=292.75 m.",
    "trapWarning": "The terminal speed of Phase 1 is the INITIAL speed of Phase 2. Piecewise boundary matching is mandatory!",
    "correctKey": "opt-A",
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 4,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Physics)"
  },
  {
    "id": "1D-Q13",
    "code": "1D-Q13",
    "title": "JEE Main 2024 (Online) 1st February Morning Shift \u00b7 Diagnostic Hub \u00b7 Q1D-Q13 \u00b7 Motion in 1D",
    "subjectCode": "PHYS",
    "subject": "Physics",
    "topicCode": "MOTION_IN_1D",
    "topic": "Motion in 1D",
    "subtopic": "CAP-PHY-MOTION-1D",
    "exam": "JEE Main 2024 (Online) 1st February Morning Shift",
    "year": "2024",
    "paper": "Diagnostic Hub",
    "questionNumber": "1D-Q13",
    "section": "FAM-PHY-MOTION-1D",
    "markingScheme": "+4 / -1",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Motion in 1D",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "SINGLE_CHOICE",
    "stem": "A ball is thrown vertically upwards from the top of a tower of height h with velocity u. It reaches the ground in time t\u2081. If it is thrown vertically downwards from the same spot with the same speed u, it reaches the ground in time t\u2082. If it is simply dropped from rest, the time t\u2083 taken to reach the ground is:",
    "options": [
      {
        "id": "opt-A",
        "text": "t\u2083 = (t\u2081 + t\u2082) / 2"
      },
      {
        "id": "opt-B",
        "text": "t\u2083 = \u221a(t\u2081 t\u2082)"
      },
      {
        "id": "opt-C",
        "text": "t\u2083 = 2 t\u2081 t\u2082 / (t\u2081 + t\u2082)"
      },
      {
        "id": "opt-D",
        "text": "t\u2083 = \u221a(t\u2081\u00b2 + t\u2082\u00b2)"
      }
    ],
    "hints": [
      "[METHOD] Case 1 (Thrown Up): -h = u t\u2081 - \u00bd g t\u2081\u00b2 \u21d2 \u00bd g t\u2081\u00b2 - u t\u2081 - h = 0.",
      "[METHOD] Case 2 (Thrown Down): -h = -u t\u2082 - \u00bd g t\u2082\u00b2 \u21d2 \u00bd g t\u2082\u00b2 + u t\u2082 - h = 0.",
      "[METHOD] Eliminating u between the two quadratic roots yields: h = \u00bd g (t\u2081 t\u2082)."
    ],
    "steps": [
      "Case 1 (Thrown Up): -h = u t\u2081 - \u00bd g t\u2081\u00b2 \u21d2 \u00bd g t\u2081\u00b2 - u t\u2081 - h = 0.",
      "Case 2 (Thrown Down): -h = -u t\u2082 - \u00bd g t\u2082\u00b2 \u21d2 \u00bd g t\u2082\u00b2 + u t\u2082 - h = 0.",
      "Eliminating u between the two quadratic roots yields: h = \u00bd g (t\u2081 t\u2082).",
      "For free drop from rest: h = \u00bd g t\u2083\u00b2.",
      "Equating gives t\u2083\u00b2 = t\u2081 t\u2082 \u21d2 t\u2083 = \u221a(t\u2081 t\u2082)."
    ],
    "limitingCheck": "Eliminate u between the upward/downward equations to obtain h=\u00bdgt1t2; compare with h=\u00bdgt3\u00b2.",
    "check": "Eliminate u between the upward/downward equations to obtain h=\u00bdgt1t2; compare with h=\u00bdgt3\u00b2.",
    "trapWarning": "This beautiful invariant shows the geometric mean relationship: t\u2083 is neither the arithmetic mean nor root-mean-square!",
    "correctKey": "opt-B",
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 4,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Physics)"
  },
  {
    "id": "1D-Q14",
    "code": "1D-Q14",
    "title": "JEE Main 2026 (Online) 22nd January Morning Shift \u00b7 Diagnostic Hub \u00b7 Q1D-Q14 \u00b7 Motion in 1D",
    "subjectCode": "PHYS",
    "subject": "Physics",
    "topicCode": "MOTION_IN_1D",
    "topic": "Motion in 1D",
    "subtopic": "CAP-PHY-MOTION-1D",
    "exam": "JEE Main 2026 (Online) 22nd January Morning Shift",
    "year": "2026",
    "paper": "Diagnostic Hub",
    "questionNumber": "1D-Q14",
    "section": "FAM-PHY-MOTION-1D",
    "markingScheme": "+4 / -1",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Motion in 1D",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "SINGLE_CHOICE",
    "stem": "The deceleration experienced by a moving motor boat after its engine is cut off is given by dv/dt = -k v\u00b3, where k is a positive constant. If v\u2080 is the speed when the engine is cut off, the speed v after traversing a distance s is:",
    "options": [
      {
        "id": "opt-A",
        "text": "v = v\u2080 e^{-ks}"
      },
      {
        "id": "opt-B",
        "text": "v = v\u2080 / (1 + k s v\u2080)"
      },
      {
        "id": "opt-C",
        "text": "v = v\u2080 / \u221a(1 + 2 k s v\u2080\u00b2)"
      },
      {
        "id": "opt-D",
        "text": "v = v\u2080 - k s"
      }
    ],
    "hints": [
      "[METHOD] Given dv/dt = -k v\u00b3.",
      "[METHOD] Transform time derivative to spatial derivative: dv/dt = v (dv/ds).",
      "[METHOD] Equate: v (dv/ds) = -k v\u00b3 \u21d2 dv/ds = -k v\u00b2."
    ],
    "steps": [
      "Given dv/dt = -k v\u00b3.",
      "Transform time derivative to spatial derivative: dv/dt = v (dv/ds).",
      "Equate: v (dv/ds) = -k v\u00b3 \u21d2 dv/ds = -k v\u00b2.",
      "Separate variables: v\u207b\u00b2 dv = -k ds.",
      "Integrate from s = 0 (v = v\u2080) to s (v = v): [-1/v]_{v\u2080}^v = -k s \u21d2 1/v - 1/v\u2080 = k s.",
      "1/v = (1 + k s v\u2080) / v\u2080 \u21d2 v = v\u2080 / (1 + k s v\u2080)."
    ],
    "limitingCheck": "Apply dv/dt=v dv/ds, then integrate dv/ds=-kv\u00b2 to obtain 1/v-1/v0=ks.",
    "check": "Apply dv/dt=v dv/ds, then integrate dv/ds=-kv\u00b2 to obtain 1/v-1/v0=ks.",
    "trapWarning": "dv/dt = -k v\u00b3 does NOT mean dv/ds = -k v\u00b3! Always apply the spatial chain rule a = v(dv/ds).",
    "correctKey": "opt-B",
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 4,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Physics)"
  },
  {
    "id": "1D-Q15",
    "code": "1D-Q15",
    "title": "JEE Main 2025 (Online) 29th January Evening Shift \u00b7 Diagnostic Hub \u00b7 Q1D-Q15 \u00b7 Motion in 1D",
    "subjectCode": "PHYS",
    "subject": "Physics",
    "topicCode": "MOTION_IN_1D",
    "topic": "Motion in 1D",
    "subtopic": "CAP-PHY-MOTION-1D",
    "exam": "JEE Main 2025 (Online) 29th January Evening Shift",
    "year": "2025",
    "paper": "Diagnostic Hub",
    "questionNumber": "1D-Q15",
    "section": "FAM-PHY-MOTION-1D",
    "markingScheme": "+4 / -1",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Motion in 1D",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "SINGLE_CHOICE",
    "stem": "A particle moves in a resistive medium with acceleration a = -\u03b2 v, where \u03b2 is a constant and v is instantaneous velocity. If the initial velocity is v\u2080 at x = 0, the maximum distance the particle can penetrate before coming to rest is:",
    "options": [
      {
        "id": "opt-A",
        "text": "v\u2080 / \u03b2"
      },
      {
        "id": "opt-B",
        "text": "v\u2080\u00b2 / (2\u03b2)"
      },
      {
        "id": "opt-C",
        "text": "Infinity"
      },
      {
        "id": "opt-D",
        "text": "2 v\u2080 / \u03b2"
      }
    ],
    "hints": [
      "[METHOD] Express acceleration spatially: a = v (dv/dx).",
      "[METHOD] Given a = -\u03b2 v \u21d2 v (dv/dx) = -\u03b2 v \u21d2 dv/dx = -\u03b2.",
      "[METHOD] Integrate from x = 0 (v = v\u2080) to x_max (v = 0):"
    ],
    "steps": [
      "Express acceleration spatially: a = v (dv/dx).",
      "Given a = -\u03b2 v \u21d2 v (dv/dx) = -\u03b2 v \u21d2 dv/dx = -\u03b2.",
      "Integrate from x = 0 (v = v\u2080) to x_max (v = 0):",
      "\u222b_{v\u2080}^0 dv = -\u03b2 \u222b\u2080^{x_max} dx \u21d2 (0 - v\u2080) = -\u03b2 x_max \u21d2 x_max = v\u2080 / \u03b2."
    ],
    "limitingCheck": "Use v dv/dx=-\u03b2v, cancel v away from the limiting endpoint, and integrate dv/dx=-\u03b2 to get xmax=v0/\u03b2.",
    "check": "Use v dv/dx=-\u03b2v, cancel v away from the limiting endpoint, and integrate dv/dx=-\u03b2 to get xmax=v0/\u03b2.",
    "trapWarning": "Even though it takes infinite time for velocity to asymptotically reach zero (v(t) = v\u2080 e^{-\u03b2 t}), the total spatial penetration is strictly FINITE: x_max = v\u2080 / \u03b2!",
    "correctKey": "opt-A",
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 4,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Physics)"
  },
  {
    "id": "1D-Q16",
    "code": "1D-Q16",
    "title": "JEE Main 2026 (Online) 4th April Evening Shift \u00b7 Diagnostic Hub \u00b7 Q1D-Q16 \u00b7 Motion in 1D",
    "subjectCode": "PHYS",
    "subject": "Physics",
    "topicCode": "MOTION_IN_1D",
    "topic": "Motion in 1D",
    "subtopic": "CAP-PHY-MOTION-1D",
    "exam": "JEE Main 2026 (Online) 4th April Evening Shift",
    "year": "2026",
    "paper": "Diagnostic Hub",
    "questionNumber": "1D-Q16",
    "section": "FAM-PHY-MOTION-1D",
    "markingScheme": "+4 / -1",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Motion in 1D",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "SINGLE_CHOICE",
    "stem": "Two cars A and B travel in the same direction along a straight highway. Car A moves at constant speed v_A = 20 m/s. Car B is initially 100 m ahead of Car A and moves at constant speed v_B = 10 m/s. At t = 0, Car B begins to brake with constant deceleration a_B = 1 m/s\u00b2. Find the time when Car A overtakes Car B.",
    "options": [
      {
        "id": "opt-A",
        "text": "6.67 s"
      },
      {
        "id": "opt-B",
        "text": "8.00 s"
      },
      {
        "id": "opt-C",
        "text": "10.0 s"
      },
      {
        "id": "opt-D",
        "text": "7.32 s"
      }
    ],
    "hints": [
      "[METHOD] Set up relative coordinate frame with Car A as reference origin:",
      "[METHOD] Initial relative position: x_{rel}(0) = x_B(0) - x_A(0) = +100 m.",
      "[METHOD] Initial relative velocity: v_{rel} = v_B - v_A = 10 - 20 = -10 m/s."
    ],
    "steps": [
      "Set up relative coordinate frame with Car A as reference origin:",
      "Initial relative position: x_{rel}(0) = x_B(0) - x_A(0) = +100 m.",
      "Initial relative velocity: v_{rel} = v_B - v_A = 10 - 20 = -10 m/s.",
      "Relative acceleration: a_{rel} = a_B - a_A = (-1) - 0 = -1 m/s\u00b2.",
      "Relative position equation: x_{rel}(t) = 100 - 10 t - 0.5 t\u00b2 = 0.",
      "Multiply by 2: t\u00b2 + 20 t - 200 = 0 \u21d2 t = [-20 + \u221a(400 + 800)] / 2 = -10 + 10\u221a3 \u2248 7.32 s.",
      "Check if B stopped: t_stop = 10 / 1 = 10 s > 7.32 s. Overtaking occurs while B is still moving!"
    ],
    "limitingCheck": "Solve 100-10t-\u00bdt\u00b2=0 and independently check t=7.32 s is before B's 10 s stopping time.",
    "check": "Solve 100-10t-\u00bdt\u00b2=0 and independently check t=7.32 s is before B's 10 s stopping time.",
    "trapWarning": "Always verify whether the braking vehicle stops before overtaking happens; here 7.32 s < 10 s, so the motion is valid throughout.",
    "correctKey": "opt-D",
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 4,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Physics)"
  },
  {
    "id": "1D-Q17",
    "code": "1D-Q17",
    "title": "JEE Main 2024 (Online) 27th January Morning Shift \u00b7 Diagnostic Hub \u00b7 Q1D-Q17 \u00b7 Motion in 1D",
    "subjectCode": "PHYS",
    "subject": "Physics",
    "topicCode": "MOTION_IN_1D",
    "topic": "Motion in 1D",
    "subtopic": "CAP-PHY-MOTION-1D",
    "exam": "JEE Main 2024 (Online) 27th January Morning Shift",
    "year": "2024",
    "paper": "Diagnostic Hub",
    "questionNumber": "1D-Q17",
    "section": "FAM-PHY-MOTION-1D",
    "markingScheme": "+4 / -1",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Motion in 1D",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "SINGLE_CHOICE",
    "stem": "Two trains A and B, each of length 150 m, are moving in opposite directions on parallel tracks with speeds 72 km/h and 36 km/h respectively. The time of complete crossing is:",
    "options": [
      {
        "id": "opt-A",
        "text": "10 s"
      },
      {
        "id": "opt-B",
        "text": "15 s"
      },
      {
        "id": "opt-C",
        "text": "20 s"
      },
      {
        "id": "opt-D",
        "text": "30 s"
      }
    ],
    "hints": [
      "[METHOD] Convert speeds to SI units: v_A = 72 \u00d7 (5/18) = 20 m/s, v_B = 36 \u00d7 (5/18) = 10 m/s.",
      "[METHOD] Opposite directions add relative speed: v_{rel} = v_A + v_B = 20 + 10 = 30 m/s.",
      "[METHOD] Total distance to clear: D = L_A + L_B = 150 + 150 = 300 m."
    ],
    "steps": [
      "Convert speeds to SI units: v_A = 72 \u00d7 (5/18) = 20 m/s, v_B = 36 \u00d7 (5/18) = 10 m/s.",
      "Opposite directions add relative speed: v_{rel} = v_A + v_B = 20 + 10 = 30 m/s.",
      "Total distance to clear: D = L_A + L_B = 150 + 150 = 300 m.",
      "Crossing time: t = D / v_{rel} = 300 / 30 = 10 s."
    ],
    "limitingCheck": "Convert to SI, add speeds for opposite directions, and divide the sum of train lengths by relative speed.",
    "check": "Convert to SI, add speeds for opposite directions, and divide the sum of train lengths by relative speed.",
    "trapWarning": "Opposite directions ADD relative velocities (20 + 10 = 30 m/s), rather than subtracting them!",
    "correctKey": "opt-A",
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 4,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Physics)"
  },
  {
    "id": "1D-Q18",
    "code": "1D-Q18",
    "title": "JEE Main 2023 (Online) 30th January Evening Shift \u00b7 Diagnostic Hub \u00b7 Q1D-Q18 \u00b7 Motion in 1D",
    "subjectCode": "PHYS",
    "subject": "Physics",
    "topicCode": "MOTION_IN_1D",
    "topic": "Motion in 1D",
    "subtopic": "CAP-PHY-MOTION-1D",
    "exam": "JEE Main 2023 (Online) 30th January Evening Shift",
    "year": "2023",
    "paper": "Diagnostic Hub",
    "questionNumber": "1D-Q18",
    "section": "FAM-PHY-MOTION-1D",
    "markingScheme": "+4 / -1",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Motion in 1D",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "SINGLE_CHOICE",
    "stem": "Two trains travelling on the same track are approaching each other with speeds of 40 m/s and 20 m/s respectively. When they are 1.2 km apart, both drivers simultaneously apply brakes which produce equal decelerations of 1 m/s\u00b2 in each train. The collision:",
    "options": [
      {
        "id": "opt-A",
        "text": "Will be averted, stopping with a gap of 200 m"
      },
      {
        "id": "opt-B",
        "text": "Will occur with relative speed 10 m/s"
      },
      {
        "id": "opt-C",
        "text": "Will be averted, stopping with a gap of 100 m"
      },
      {
        "id": "opt-D",
        "text": "Will occur exactly when both reach zero velocity"
      }
    ],
    "hints": [
      "[METHOD] Calculate stopping distance of Train 1: s\u2081 = u\u2081\u00b2 / (2a) = 40\u00b2 / (2 \u00d7 1) = 1600 / 2 = 800 m.",
      "[METHOD] Calculate stopping distance of Train 2: s\u2082 = u\u2082\u00b2 / (2a) = 20\u00b2 / (2 \u00d7 1) = 400 / 2 = 200 m.",
      "[METHOD] Total stopping distance: s_total = s\u2081 + s\u2082 = 800 + 200 = 1000 m = 1.0 km."
    ],
    "steps": [
      "Calculate stopping distance of Train 1: s\u2081 = u\u2081\u00b2 / (2a) = 40\u00b2 / (2 \u00d7 1) = 1600 / 2 = 800 m.",
      "Calculate stopping distance of Train 2: s\u2082 = u\u2082\u00b2 / (2a) = 20\u00b2 / (2 \u00d7 1) = 400 / 2 = 200 m.",
      "Total stopping distance: s_total = s\u2081 + s\u2082 = 800 + 200 = 1000 m = 1.0 km.",
      "Initial separation: D = 1.2 km = 1200 m.",
      "Since s_total (1000 m) < D (1200 m), the collision is completely averted!",
      "Remaining gap between stopped trains: Gap = 1200 - 1000 = 200 m."
    ],
    "limitingCheck": "Individual stopping distances are 800 m and 200 m; their sum is 1000 m, leaving a 200 m gap from 1200 m.",
    "check": "Individual stopping distances are 800 m and 200 m; their sum is 1000 m, leaving a 200 m gap from 1200 m.",
    "trapWarning": "Do not treat both trains as one combined deceleration if they stop at different times (Train 2 stops in 20 s, Train 1 stops in 40 s)! Calculate individual stopping distances.",
    "correctKey": "opt-A",
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 4,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Physics)"
  },
  {
    "id": "PDF-01",
    "code": "PDF-01",
    "title": "Scanned PDF Page 3 \u00b7 Diagnostic Hub \u00b7 QPDF-01 \u00b7 Motion in 2D",
    "subjectCode": "PHYS",
    "subject": "Physics",
    "topicCode": "MOTION_IN_2D",
    "topic": "Motion in 2D",
    "subtopic": "CAP-PHY-MOTION-2D",
    "exam": "Scanned PDF Page 3",
    "year": "PDF Page 3",
    "paper": "Diagnostic Hub",
    "questionNumber": "PDF-01",
    "section": "FAM-PHY-MOTION-2D",
    "markingScheme": "+3 / 0",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Motion in 2D",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "NUMERIC_QUANTITY",
    "stem": "A body is projected with a velocity of 12 m/s at an angle of 45\u00b0 with the horizontal. Find its horizontal range. (Take g = 10 m/s\u00b2)",
    "options": [],
    "hints": [
      "[METHOD] Launch velocity u = 12 m/s, launch angle \u03b8 = 45\u00b0, g = 10 m/s\u00b2.",
      "[METHOD] Compute 2\u03b8 = 90\u00b0 &rArr; sin(90\u00b0) = 1.0 (condition for maximum range).",
      "[METHOD] Substitute into formula: R = (12\u00b2 &times; 1) / 10 = 144 / 10 = 14.4 m."
    ],
    "steps": [
      "Launch velocity u = 12 m/s, launch angle \u03b8 = 45\u00b0, g = 10 m/s\u00b2.",
      "Compute 2\u03b8 = 90\u00b0 &rArr; sin(90\u00b0) = 1.0 (condition for maximum range).",
      "Substitute into formula: R = (12\u00b2 &times; 1) / 10 = 144 / 10 = 14.4 m."
    ],
    "limitingCheck": "Independent check: re-derive from \"R = (u\u00b2 sin 2\u03b8) / g\" and verify that the stated data reproduce 14.4 m. No unstated numerical parameter should be needed.",
    "check": "Independent check: re-derive from \"R = (u\u00b2 sin 2\u03b8) / g\" and verify that the stated data reproduce 14.4 m. No unstated numerical parameter should be needed.",
    "trapWarning": "Resolve the launch velocity into components and check whether the formula's equal-level assumptions actually hold.",
    "correctKey": null,
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Physics)"
  },
  {
    "id": "PDF-02",
    "code": "PDF-02",
    "title": "Scanned PDF Page 4 \u00b7 Diagnostic Hub \u00b7 QPDF-02 \u00b7 Motion in 2D",
    "subjectCode": "PHYS",
    "subject": "Physics",
    "topicCode": "MOTION_IN_2D",
    "topic": "Motion in 2D",
    "subtopic": "CAP-PHY-MOTION-2D",
    "exam": "Scanned PDF Page 4",
    "year": "PDF Page 4",
    "paper": "Diagnostic Hub",
    "questionNumber": "PDF-02",
    "section": "FAM-PHY-MOTION-2D",
    "markingScheme": "+3 / 0",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Motion in 2D",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "NUMERIC_QUANTITY",
    "stem": "At what angle of projection with the horizontal will the horizontal range of a projectile be equal to its maximum height?",
    "options": [],
    "hints": [
      "[METHOD] Use the universal relation between range and apex height: R tan \u03b8 = 4H.",
      "[METHOD] Apply problem condition R = H: H tan \u03b8 = 4H &rArr; tan \u03b8 = 4.",
      "[METHOD] Solve for angle: \u03b8 = arctan(4) \u2248 75.96\u00b0 \u2248 76\u00b0."
    ],
    "steps": [
      "Use the universal relation between range and apex height: R tan \u03b8 = 4H.",
      "Apply problem condition R = H: H tan \u03b8 = 4H &rArr; tan \u03b8 = 4.",
      "Solve for angle: \u03b8 = arctan(4) \u2248 75.96\u00b0 \u2248 76\u00b0."
    ],
    "limitingCheck": "Independent check: re-derive from \"R tan \u03b8 = 4H  (The 4H Identity)\" and verify that the stated data reproduce \u03b8 = arctan(4) \u2248 76\u00b0. No unstated numerical parameter should be needed.",
    "check": "Independent check: re-derive from \"R tan \u03b8 = 4H  (The 4H Identity)\" and verify that the stated data reproduce \u03b8 = arctan(4) \u2248 76\u00b0. No unstated numerical parameter should be needed.",
    "trapWarning": "Resolve the launch velocity into components and check whether the formula's equal-level assumptions actually hold.",
    "correctKey": null,
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Physics)"
  },
  {
    "id": "PDF-03",
    "code": "PDF-03",
    "title": "Scanned PDF Page 4 \u00b7 Diagnostic Hub \u00b7 QPDF-03 \u00b7 Motion in 2D",
    "subjectCode": "PHYS",
    "subject": "Physics",
    "topicCode": "MOTION_IN_2D",
    "topic": "Motion in 2D",
    "subtopic": "CAP-PHY-MOTION-2D",
    "exam": "Scanned PDF Page 4",
    "year": "PDF Page 4",
    "paper": "Diagnostic Hub",
    "questionNumber": "PDF-03",
    "section": "FAM-PHY-MOTION-2D",
    "markingScheme": "+3 / 0",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Motion in 2D",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "NUMERIC_QUANTITY",
    "stem": "A shore defense gun fires at a pirate ship anchored at R = 560 m with muzzle speed v\u2080 = 82 m/s. Find: (a) The two projection angles to hit the ship, (b) The time of flight in each case. (Take g = 9.8 m/s\u00b2)",
    "options": [],
    "hints": [
      "[METHOD] Calculate sin 2\u03b8 = (9.8 &times; 560) / 82\u00b2 = 5488 / 6724 \u2248 0.8162.",
      "[METHOD] First solution: 2\u03b8\u2081 = arcsin(0.8162) \u2248 54.7\u00b0 &rArr; \u03b8\u2081 \u2248 27.4\u00b0 (low flat trajectory).",
      "[METHOD] Second solution: 2\u03b8\u2082 = 180\u00b0 - 54.7\u00b0 = 125.3\u00b0 &rArr; \u03b8\u2082 \u2248 62.6\u00b0 (high lob trajectory)."
    ],
    "steps": [
      "Calculate sin 2\u03b8 = (9.8 &times; 560) / 82\u00b2 = 5488 / 6724 \u2248 0.8162.",
      "First solution: 2\u03b8\u2081 = arcsin(0.8162) \u2248 54.7\u00b0 &rArr; \u03b8\u2081 \u2248 27.4\u00b0 (low flat trajectory).",
      "Second solution: 2\u03b8\u2082 = 180\u00b0 - 54.7\u00b0 = 125.3\u00b0 &rArr; \u03b8\u2082 \u2248 62.6\u00b0 (high lob trajectory).",
      "Time of flight T\u2081 = (2 &times; 82 &times; sin 27.4\u00b0) / 9.8 \u2248 7.69 s.",
      "Time of flight T\u2082 = (2 &times; 82 &times; sin 62.6\u00b0) / 9.8 \u2248 14.86 s \u2248 15 s.",
      "Invariant Check: T\u2081 &times; T\u2082 = 7.69 &times; 14.86 = 114.3 s\u00b2 = 2R/g = 2(560)/9.8 = 114.3 s\u00b2."
    ],
    "limitingCheck": "Independent check: re-derive from \"sin 2\u03b8 = (g R) / v\u2080\u00b2,  T = (2v\u2080 sin \u03b8) / g\" and verify that the stated data reproduce \u03b8\u2081 \u2248 27.4\u00b0, \u03b8\u2082 \u2248 62.6\u00b0; T\u2081 \u2248 7.7 s, T\u2082 \u2248 14.9 s. No unstated numerical parameter should be needed.",
    "check": "Independent check: re-derive from \"sin 2\u03b8 = (g R) / v\u2080\u00b2,  T = (2v\u2080 sin \u03b8) / g\" and verify that the stated data reproduce \u03b8\u2081 \u2248 27.4\u00b0, \u03b8\u2082 \u2248 62.6\u00b0; T\u2081 \u2248 7.7 s, T\u2082 \u2248 14.9 s. No unstated numerical parameter should be needed.",
    "trapWarning": "Keep a frame label on every velocity before adding or subtracting vectors; dropping the frame is the usual sign/direction error.",
    "correctKey": null,
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Physics)"
  },
  {
    "id": "PDF-04",
    "code": "PDF-04",
    "title": "Scanned PDF Page 5 \u00b7 Diagnostic Hub \u00b7 QPDF-04 \u00b7 Motion in 2D",
    "subjectCode": "PHYS",
    "subject": "Physics",
    "topicCode": "MOTION_IN_2D",
    "topic": "Motion in 2D",
    "subtopic": "CAP-PHY-MOTION-2D",
    "exam": "Scanned PDF Page 5",
    "year": "PDF Page 5",
    "paper": "Diagnostic Hub",
    "questionNumber": "PDF-04",
    "section": "FAM-PHY-MOTION-2D",
    "markingScheme": "+3 / 0",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Motion in 2D",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "NUMERIC_QUANTITY",
    "stem": "An outfielder tracks a fly ball hit with u = 40 m/s at \u03b8 = 35\u00b0. The line-of-sight elevation angle is \u03c6(t) with tan \u03c6(t) = y(t) / (D - x(t)). Analyze the optical curvature d\u00b2\u03c6/dt\u00b2.",
    "options": [],
    "hints": [
      "[METHOD] For a catch-course geometry, the remaining horizontal separation is proportional to (T\u2212t), while y(t)=\u00bdgt(T\u2212t). The common factor (T\u2212t) cancels.",
      "[METHOD] Therefore tan \u03c6(t)=kt with k=g/[2(u_x\u2212v_f)]. What is linear is tan \u03c6, not \u03c6 itself.",
      "[METHOD] Differentiate \u03c6=arctan(kt): d\u03c6/dt=k/(1+k\u00b2t\u00b2) and d\u00b2\u03c6/dt\u00b2=\u22122k\u00b3t/(1+k\u00b2t\u00b2)\u00b2. For k>0 and t>0 the angular curvature is negative, not zero."
    ],
    "steps": [
      "For a catch-course geometry, the remaining horizontal separation is proportional to (T\u2212t), while y(t)=\u00bdgt(T\u2212t). The common factor (T\u2212t) cancels.",
      "Therefore tan \u03c6(t)=kt with k=g/[2(u_x\u2212v_f)]. What is linear is tan \u03c6, not \u03c6 itself.",
      "Differentiate \u03c6=arctan(kt): d\u03c6/dt=k/(1+k\u00b2t\u00b2) and d\u00b2\u03c6/dt\u00b2=\u22122k\u00b3t/(1+k\u00b2t\u00b2)\u00b2. For k>0 and t>0 the angular curvature is negative, not zero."
    ],
    "limitingCheck": "Differentiate arctan(kt) twice. The second derivative is nonzero for t>0 unless k=0.",
    "check": "Differentiate arctan(kt) twice. The second derivative is nonzero for t>0 unless k=0.",
    "trapWarning": "The tempting cancellation proves tan \u03c6 \u221d t. It does not prove \u03c6 \u221d t or d\u00b2\u03c6/dt\u00b2=0.",
    "correctKey": null,
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Physics)"
  },
  {
    "id": "PDF-05",
    "code": "PDF-05",
    "title": "Scanned PDF Pages 5\u20136 \u00b7 Diagnostic Hub \u00b7 QPDF-05 \u00b7 Motion in 2D",
    "subjectCode": "PHYS",
    "subject": "Physics",
    "topicCode": "MOTION_IN_2D",
    "topic": "Motion in 2D",
    "subtopic": "CAP-PHY-MOTION-2D",
    "exam": "Scanned PDF Pages 5\u20136",
    "year": "PDF Pages 5\u20136",
    "paper": "Diagnostic Hub",
    "questionNumber": "PDF-05",
    "section": "FAM-PHY-MOTION-2D",
    "markingScheme": "+3 / 0",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Motion in 2D",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "NUMERIC_QUANTITY",
    "stem": "A stone is thrown horizontally from a cliff h = 490 m high with speed u = 98 m/s. Find: (a) time to hit ground, (b) horizontal distance from cliff base, (c) striking velocity. (Take g = 9.8 m/s\u00b2)",
    "options": [],
    "hints": [
      "[METHOD] Time to ground depends solely on vertical drop: t = \u221a(2 &times; 490 / 9.8) = \u221a100 = 10 s.",
      "[METHOD] Horizontal distance: R = u &times; t = 98 &times; 10 = 980 m.",
      "[METHOD] Velocity components at impact: v_x = 98 m/s (unchanged), v_y = gt = 9.8 &times; 10 = 98 m/s."
    ],
    "steps": [
      "Time to ground depends solely on vertical drop: t = \u221a(2 &times; 490 / 9.8) = \u221a100 = 10 s.",
      "Horizontal distance: R = u &times; t = 98 &times; 10 = 980 m.",
      "Velocity components at impact: v_x = 98 m/s (unchanged), v_y = gt = 9.8 &times; 10 = 98 m/s.",
      "Total speed: v = \u221a(98\u00b2 + 98\u00b2) = 98\u221a2 m/s \u2248 138.6 m/s.",
      "Direction: tan \u03b2 = v_y / v_x = 98 / 98 = 1 &rArr; \u03b2 = 45\u00b0 below horizontal."
    ],
    "limitingCheck": "Independent check: re-derive from \"t = \u221a(2h/g),  R = u t,  v = \u221a(u\u00b2 + 2gh),  tan \u03b2 = gt / u\" and verify that the stated data reproduce t = 10 s, R = 980 m, v = 98\u221a2 m/s at 45\u00b0 below horizontal. No unstated numerical parameter should be needed.",
    "check": "Independent check: re-derive from \"t = \u221a(2h/g),  R = u t,  v = \u221a(u\u00b2 + 2gh),  tan \u03b2 = gt / u\" and verify that the stated data reproduce t = 10 s, R = 980 m, v = 98\u221a2 m/s at 45\u00b0 below horizontal. No unstated numerical parameter should be needed.",
    "trapWarning": "Do not use ground-to-ground symmetric projectile formulas when launch and landing heights differ; solve the vertical boundary event first.",
    "correctKey": null,
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Physics)"
  },
  {
    "id": "PDF-09",
    "code": "PDF-09",
    "title": "Scanned PDF Page 6 \u00b7 Diagnostic Hub \u00b7 QPDF-09 \u00b7 Motion in 2D",
    "subjectCode": "PHYS",
    "subject": "Physics",
    "topicCode": "MOTION_IN_2D",
    "topic": "Motion in 2D",
    "subtopic": "CAP-PHY-MOTION-2D",
    "exam": "Scanned PDF Page 6",
    "year": "PDF Page 6",
    "paper": "Diagnostic Hub",
    "questionNumber": "PDF-09",
    "section": "FAM-PHY-MOTION-2D",
    "markingScheme": "+3 / 0",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Motion in 2D",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "NUMERIC_QUANTITY",
    "stem": "Car A moves east at 1 m/s, Car B moves west at 2 m/s along a straight road. Find the relative velocity of Car B with respect to Car A.",
    "options": [],
    "hints": [
      "[METHOD] Assign coordinate direction: East = +\u00ee, West = -\u00ee.",
      "[METHOD] Velocity vectors: v_A = +1 \u00ee m/s, v_B = -2 \u00ee m/s.",
      "[METHOD] Relative velocity formula: v_B/A = (-2 \u00ee) - (+1 \u00ee) = -3 \u00ee m/s."
    ],
    "steps": [
      "Assign coordinate direction: East = +\u00ee, West = -\u00ee.",
      "Velocity vectors: v_A = +1 \u00ee m/s, v_B = -2 \u00ee m/s.",
      "Relative velocity formula: v_B/A = (-2 \u00ee) - (+1 \u00ee) = -3 \u00ee m/s.",
      "Magnitude is 3 m/s directed westward (rate of mutual approach)."
    ],
    "limitingCheck": "Independent check: re-derive from \"v_B/A = v_B - v_A\" and verify that the stated data reproduce -3 \u00ee m/s (3 m/s towards West). No unstated numerical parameter should be needed.",
    "check": "Independent check: re-derive from \"v_B/A = v_B - v_A\" and verify that the stated data reproduce -3 \u00ee m/s (3 m/s towards West). No unstated numerical parameter should be needed.",
    "trapWarning": "Keep a frame label on every velocity before adding or subtracting vectors; dropping the frame is the usual sign/direction error.",
    "correctKey": null,
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Physics)"
  },
  {
    "id": "PDF-10",
    "code": "PDF-10",
    "title": "Scanned PDF Page 7 \u00b7 Diagnostic Hub \u00b7 QPDF-10 \u00b7 Motion in 2D",
    "subjectCode": "PHYS",
    "subject": "Physics",
    "topicCode": "MOTION_IN_2D",
    "topic": "Motion in 2D",
    "subtopic": "CAP-PHY-MOTION-2D",
    "exam": "Scanned PDF Page 7",
    "year": "PDF Page 7",
    "paper": "Diagnostic Hub",
    "questionNumber": "PDF-10",
    "section": "FAM-PHY-MOTION-2D",
    "markingScheme": "+3 / 0",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Motion in 2D",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "NUMERIC_QUANTITY",
    "stem": "Rain falls vertically at 15 m/s. A cyclist moves horizontally at 5\u221a3 m/s. In which direction should the cyclist hold his umbrella to protect himself?",
    "options": [],
    "hints": [
      "[METHOD] Rain velocity: v_r = -15 \u0135 m/s. Cyclist velocity: v_c = 5\u221a3 \u00ee m/s.",
      "[METHOD] Relative velocity of rain: v_r/c = v_r - v_c = -5\u221a3 \u00ee - 15 \u0135 m/s.",
      "[METHOD] Tilt angle with vertical: tan \u03b8 = |v_cx| / |v_ry| = (5\u221a3) / 15 = 1/\u221a3."
    ],
    "steps": [
      "Rain velocity: v_r = -15 \u0135 m/s. Cyclist velocity: v_c = 5\u221a3 \u00ee m/s.",
      "Relative velocity of rain: v_r/c = v_r - v_c = -5\u221a3 \u00ee - 15 \u0135 m/s.",
      "Tilt angle with vertical: tan \u03b8 = |v_cx| / |v_ry| = (5\u221a3) / 15 = 1/\u221a3.",
      "Solve for angle: \u03b8 = arctan(1/\u221a3) = 30\u00b0 forward."
    ],
    "limitingCheck": "Independent check: re-derive from \"v_r/c = v_r - v_c,  tan \u03b8 = v_c / v_r\" and verify that the stated data reproduce 30\u00b0 forward with the vertical. No unstated numerical parameter should be needed.",
    "check": "Independent check: re-derive from \"v_r/c = v_r - v_c,  tan \u03b8 = v_c / v_r\" and verify that the stated data reproduce 30\u00b0 forward with the vertical. No unstated numerical parameter should be needed.",
    "trapWarning": "Keep a frame label on every velocity before adding or subtracting vectors; dropping the frame is the usual sign/direction error.",
    "correctKey": null,
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Physics)"
  },
  {
    "id": "PDF-11",
    "code": "PDF-11",
    "title": "Scanned PDF Pages 7\u20138 \u00b7 Diagnostic Hub \u00b7 QPDF-11 \u00b7 Motion in 2D",
    "subjectCode": "PHYS",
    "subject": "Physics",
    "topicCode": "MOTION_IN_2D",
    "topic": "Motion in 2D",
    "subtopic": "CAP-PHY-MOTION-2D",
    "exam": "Scanned PDF Pages 7\u20138",
    "year": "PDF Pages 7\u20138",
    "paper": "Diagnostic Hub",
    "questionNumber": "PDF-11",
    "section": "FAM-PHY-MOTION-2D",
    "markingScheme": "+3 / 0",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Motion in 2D",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "NUMERIC_QUANTITY",
    "stem": "A car travels East at 80 km/h. To a passenger in the car, a train appears to move due North at 80\u221a3 km/h. Find the actual velocity of the train.",
    "options": [],
    "hints": [
      "[METHOD] Car velocity: v_car = 80 \u00ee km/h. Apparent train velocity: v_t/c = 80\u221a3 \u0135 km/h.",
      "[METHOD] Reconstruct true train velocity: v_t = v_t/c + v_car = 80 \u00ee + 80\u221a3 \u0135 km/h.",
      "[METHOD] Magnitude: v_t = \u221a(80\u00b2 + (80\u221a3)\u00b2) = \u221a(6400 + 19200) = \u221a25600 = 160 km/h."
    ],
    "steps": [
      "Car velocity: v_car = 80 \u00ee km/h. Apparent train velocity: v_t/c = 80\u221a3 \u0135 km/h.",
      "Reconstruct true train velocity: v_t = v_t/c + v_car = 80 \u00ee + 80\u221a3 \u0135 km/h.",
      "Magnitude: v_t = \u221a(80\u00b2 + (80\u221a3)\u00b2) = \u221a(6400 + 19200) = \u221a25600 = 160 km/h.",
      "Direction: tan \u03b8 = (80\u221a3) / 80 = \u221a3 &rArr; \u03b8 = 60\u00b0 North of East."
    ],
    "limitingCheck": "Independent check: re-derive from \"v_train = v_train/car + v_car\" and verify that the stated data reproduce 160 km/h at 60\u00b0 North of East. No unstated numerical parameter should be needed.",
    "check": "Independent check: re-derive from \"v_train = v_train/car + v_car\" and verify that the stated data reproduce 160 km/h at 60\u00b0 North of East. No unstated numerical parameter should be needed.",
    "trapWarning": "Keep a frame label on every velocity before adding or subtracting vectors; dropping the frame is the usual sign/direction error.",
    "correctKey": null,
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Physics)"
  },
  {
    "id": "PDF-12",
    "code": "PDF-12",
    "title": "Scanned PDF Pages 9\u201310 \u00b7 Diagnostic Hub \u00b7 QPDF-12 \u00b7 Motion in 2D",
    "subjectCode": "PHYS",
    "subject": "Physics",
    "topicCode": "MOTION_IN_2D",
    "topic": "Motion in 2D",
    "subtopic": "CAP-PHY-MOTION-2D",
    "exam": "Scanned PDF Pages 9\u201310",
    "year": "PDF Pages 9\u201310",
    "paper": "Diagnostic Hub",
    "questionNumber": "PDF-12",
    "section": "FAM-PHY-MOTION-2D",
    "markingScheme": "+3 / 0",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Motion in 2D",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "NUMERIC_QUANTITY",
    "stem": "An airplane wishes to fly towards 45\u00b0 North of East. Wind blows from West at 40 km/h. Airspeed is 200 km/h. Find steering heading using the Sine Rule.",
    "options": [],
    "hints": [
      "[METHOD] Wind 'from West' points East: v_wind = 40 \u00ee km/h.",
      "[METHOD] Let the aircraft heading be \u03c8 North of East. Then v_ground=(200 cos\u03c8+40)\u00ee+200 sin\u03c8 \u0135.",
      "[METHOD] For a 45\u00b0 ground track, set 200 sin\u03c8 = 200 cos\u03c8 + 40, so sin\u03c8\u2212cos\u03c8=0.2."
    ],
    "steps": [
      "Wind 'from West' points East: v_wind = 40 \u00ee km/h.",
      "Let the aircraft heading be \u03c8 North of East. Then v_ground=(200 cos\u03c8+40)\u00ee+200 sin\u03c8 \u0135.",
      "For a 45\u00b0 ground track, set 200 sin\u03c8 = 200 cos\u03c8 + 40, so sin\u03c8\u2212cos\u03c8=0.2.",
      "Thus \u221a2 sin(\u03c8\u221245\u00b0)=0.2, giving \u03c8\u221245\u00b0\u22488.13\u00b0 and \u03c8\u224853.13\u00b0 North of East."
    ],
    "limitingCheck": "Resolve the corrected heading: 200 sin53.13\u00b0 and 200 cos53.13\u00b0+40 are equal, so the ground track is exactly 45\u00b0.",
    "check": "Resolve the corrected heading: 200 sin53.13\u00b0 and 200 cos53.13\u00b0+40 are equal, so the ground track is exactly 45\u00b0.",
    "trapWarning": "Subtracting the 8.13\u00b0 correction steers with the eastward wind; the correction must be toward the upwind side of the desired track.",
    "correctKey": null,
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Physics)"
  },
  {
    "id": "PDF-13",
    "code": "PDF-13",
    "title": "Scanned PDF Page 10 \u00b7 Diagnostic Hub \u00b7 QPDF-13 \u00b7 Motion in 2D",
    "subjectCode": "PHYS",
    "subject": "Physics",
    "topicCode": "MOTION_IN_2D",
    "topic": "Motion in 2D",
    "subtopic": "CAP-PHY-MOTION-2D",
    "exam": "Scanned PDF Page 10",
    "year": "PDF Page 10",
    "paper": "Diagnostic Hub",
    "questionNumber": "PDF-13",
    "section": "FAM-PHY-MOTION-2D",
    "markingScheme": "+3 / 0",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Motion in 2D",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "NUMERIC_QUANTITY",
    "stem": "A river flows East at 2 m/s. A boat motors upstream (West) at 5 m/s in water. A person walks towards the stern (East) at 3 m/s on the boat. Find person's velocity w.r.t ground.",
    "options": [],
    "hints": [
      "[METHOD] Define East as +\u00ee. River flow w.r.t ground: v_w/g = +2 \u00ee m/s.",
      "[METHOD] Boat w.r.t water: v_b/w = -5 \u00ee m/s (upstream).",
      "[METHOD] Person w.r.t boat: v_p/b = +3 \u00ee m/s (towards stern, i.e., East)."
    ],
    "steps": [
      "Define East as +\u00ee. River flow w.r.t ground: v_w/g = +2 \u00ee m/s.",
      "Boat w.r.t water: v_b/w = -5 \u00ee m/s (upstream).",
      "Person w.r.t boat: v_p/b = +3 \u00ee m/s (towards stern, i.e., East).",
      "Chain reference frames: v_p/g = (+3 \u00ee) + (-5 \u00ee) + (+2 \u00ee) = (3 - 5 + 2) \u00ee = 0 \u00ee m/s."
    ],
    "limitingCheck": "Independent check: re-derive from \"v_p/g = v_p/b + v_b/w + v_w/g  (Three-Body Chaining)\" and verify that the stated data reproduce 0 m/s (Stationary w.r.t riverbank!). No unstated numerical parameter should be needed.",
    "check": "Independent check: re-derive from \"v_p/g = v_p/b + v_b/w + v_w/g  (Three-Body Chaining)\" and verify that the stated data reproduce 0 m/s (Stationary w.r.t riverbank!). No unstated numerical parameter should be needed.",
    "trapWarning": "Keep a frame label on every velocity before adding or subtracting vectors; dropping the frame is the usual sign/direction error.",
    "correctKey": null,
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Physics)"
  },
  {
    "id": "PDF-14",
    "code": "PDF-14",
    "title": "Scanned PDF Pages 10\u201311 \u00b7 Diagnostic Hub \u00b7 QPDF-14 \u00b7 Motion in 2D",
    "subjectCode": "PHYS",
    "subject": "Physics",
    "topicCode": "MOTION_IN_2D",
    "topic": "Motion in 2D",
    "subtopic": "CAP-PHY-MOTION-2D",
    "exam": "Scanned PDF Pages 10\u201311",
    "year": "PDF Pages 10\u201311",
    "paper": "Diagnostic Hub",
    "questionNumber": "PDF-14",
    "section": "FAM-PHY-MOTION-2D",
    "markingScheme": "+3 / 0",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Motion in 2D",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "NUMERIC_QUANTITY",
    "stem": "A man walking at 3 km/h observes rain falling vertically. At 6 km/h, rain appears at 45\u00b0 to vertical. Find the actual velocity of the rain.",
    "options": [],
    "hints": [
      "[METHOD] At v_m1 = 3 \u00ee km/h: rain appears vertical &rArr; apparent horizontal component is zero &rArr; v_rx - 3 = 0 &rArr; v_rx = 3 km/h.",
      "[METHOD] At v_m2 = 6 \u00ee km/h: relative horizontal velocity is 6 - 3 = 3 km/h backward.",
      "[METHOD] Given apparent angle is 45\u00b0 with vertical: tan 45\u00b0 = |v_rx - 6| / v_ry = 3 / v_ry = 1 &rArr; v_ry = 3 km/h."
    ],
    "steps": [
      "At v_m1 = 3 \u00ee km/h: rain appears vertical &rArr; apparent horizontal component is zero &rArr; v_rx - 3 = 0 &rArr; v_rx = 3 km/h.",
      "At v_m2 = 6 \u00ee km/h: relative horizontal velocity is 6 - 3 = 3 km/h backward.",
      "Given apparent angle is 45\u00b0 with vertical: tan 45\u00b0 = |v_rx - 6| / v_ry = 3 / v_ry = 1 &rArr; v_ry = 3 km/h.",
      "True rain velocity: v_r = 3 \u00ee - 3 \u0135 km/h.",
      "Magnitude: |v_r| = \u221a(3\u00b2 + 3\u00b2) = 3\u221a2 km/h \u2248 4.24 km/h.",
      "Direction: tan \u03b8 = 3 / 3 = 1 &rArr; \u03b8 = 45\u00b0 with vertical (falling forward at 45\u00b0)."
    ],
    "limitingCheck": "Independent check: re-derive from \"v_r = v_rx \u00ee - v_ry \u0135,  v_r/m = (v_rx - v_m) \u00ee - v_ry \u0135\" and verify that the stated data reproduce 3\u221a2 km/h at 45\u00b0 with vertical (falling towards East). No unstated numerical parameter should be needed.",
    "check": "Independent check: re-derive from \"v_r = v_rx \u00ee - v_ry \u0135,  v_r/m = (v_rx - v_m) \u00ee - v_ry \u0135\" and verify that the stated data reproduce 3\u221a2 km/h at 45\u00b0 with vertical (falling towards East). No unstated numerical parameter should be needed.",
    "trapWarning": "Keep a frame label on every velocity before adding or subtracting vectors; dropping the frame is the usual sign/direction error.",
    "correctKey": null,
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Physics)"
  },
  {
    "id": "EXAM-01",
    "code": "EXAM-01",
    "title": "ExamSide JEE Main \u00b7 Diagnostic Hub \u00b7 QEXAM-01 \u00b7 Motion in 2D",
    "subjectCode": "PHYS",
    "subject": "Physics",
    "topicCode": "MOTION_IN_2D",
    "topic": "Motion in 2D",
    "subtopic": "CAP-PHY-MOTION-2D",
    "exam": "ExamSide JEE Main",
    "year": "JEE Main 2026 (Online) 8th April Evening Shift",
    "paper": "Diagnostic Hub",
    "questionNumber": "EXAM-01",
    "section": "FAM-PHY-MOTION-2D",
    "markingScheme": "+3 / 0",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Motion in 2D",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "NUMERIC_QUANTITY",
    "stem": "Two identical bodies, projected with the same speed at two different angles cover the same horizontal range R . If the time of flight of these bodies are 5 s and 10 s , respectively, then the value of R is ____ m. (Take g=10m/s2 )",
    "options": [],
    "hints": [
      "[METHOD] Equal range with the same launch speed gives the complementary-angle pair.",
      "[METHOD] Use T\u2081T\u2082=2R/g with T\u2081=5 s, T\u2082=10 s and g=10 m/s\u00b2.",
      "[METHOD] R=(gT\u2081T\u2082)/2=(10\u00d75\u00d710)/2=250 m."
    ],
    "steps": [
      "Equal range with the same launch speed gives the complementary-angle pair.",
      "Use T\u2081T\u2082=2R/g with T\u2081=5 s, T\u2082=10 s and g=10 m/s\u00b2.",
      "R=(gT\u2081T\u2082)/2=(10\u00d75\u00d710)/2=250 m."
    ],
    "limitingCheck": "Independent check: re-derive from \"For complementary launches at the same u: T\u2081T\u2082 = 2R/g.\" and verify that the stated data reproduce 250 m. No unstated numerical parameter should be needed.",
    "check": "Independent check: re-derive from \"For complementary launches at the same u: T\u2081T\u2082 = 2R/g.\" and verify that the stated data reproduce 250 m. No unstated numerical parameter should be needed.",
    "trapWarning": "Resolve the launch velocity into components and check whether the formula's equal-level assumptions actually hold.",
    "correctKey": null,
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Physics)"
  },
  {
    "id": "EXAM-02",
    "code": "EXAM-02",
    "title": "ExamSide JEE Main \u00b7 Diagnostic Hub \u00b7 QEXAM-02 \u00b7 Motion in 2D",
    "subjectCode": "PHYS",
    "subject": "Physics",
    "topicCode": "MOTION_IN_2D",
    "topic": "Motion in 2D",
    "subtopic": "CAP-PHY-MOTION-2D",
    "exam": "ExamSide JEE Main",
    "year": "JEE Main 2026 (Online) 4th April Evening Shift",
    "paper": "Diagnostic Hub",
    "questionNumber": "EXAM-02",
    "section": "FAM-PHY-MOTION-2D",
    "markingScheme": "+3 / 0",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Motion in 2D",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "NUMERIC_QUANTITY",
    "stem": "At t=0 , a body of mass 100 g starts moving under the influence of a force (5i\u02c6+10j\u02c6)N\u22c5 After 2 s its position is (2xi\u02c6+5yj\u02c6)m . The ratio x:y is ____ .",
    "options": [],
    "hints": [
      "[METHOD] Mass m = 100 g = 0.1 kg. Acceleration a\u2192 = F\u2192 / m = (5\u00ee + 10\u0135) / 0.1 = (50\u00ee + 100\u0135) m/s\u00b2.",
      "[METHOD] Initial velocity is zero at t = 0 &rArr; position after 2 s is r\u2192 = \u00bd a\u2192 t\u00b2 = \u00bd (50\u00ee + 100\u0135)(4) = (100\u00ee + 200\u0135) m.",
      "[METHOD] Equate with given position (2x \u00ee + 5y \u0135): 2x = 100 &rArr; x = 50, and 5y = 200 &rArr; y = 40."
    ],
    "steps": [
      "Mass m = 100 g = 0.1 kg. Acceleration a\u2192 = F\u2192 / m = (5\u00ee + 10\u0135) / 0.1 = (50\u00ee + 100\u0135) m/s\u00b2.",
      "Initial velocity is zero at t = 0 &rArr; position after 2 s is r\u2192 = \u00bd a\u2192 t\u00b2 = \u00bd (50\u00ee + 100\u0135)(4) = (100\u00ee + 200\u0135) m.",
      "Equate with given position (2x \u00ee + 5y \u0135): 2x = 100 &rArr; x = 50, and 5y = 200 &rArr; y = 40.",
      "Compute ratio x : y = 50 : 40 = 5 : 4 = 1.25."
    ],
    "limitingCheck": "Independent check: re-derive from \"a\u2192 = F\u2192/m,  r\u2192 = \u00bd a\u2192 t\u00b2\" and verify that the stated data reproduce 5:4 (or 1.25). No unstated numerical parameter should be needed.",
    "check": "Independent check: re-derive from \"a\u2192 = F\u2192/m,  r\u2192 = \u00bd a\u2192 t\u00b2\" and verify that the stated data reproduce 5:4 (or 1.25). No unstated numerical parameter should be needed.",
    "trapWarning": "When position is given explicitly as a function of time, differentiate it directly; do not force a memorized constant-acceleration template onto it.",
    "correctKey": null,
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Physics)"
  },
  {
    "id": "EXAM-03",
    "code": "EXAM-03",
    "title": "ExamSide JEE Main \u00b7 Diagnostic Hub \u00b7 QEXAM-03 \u00b7 Motion in 2D",
    "subjectCode": "PHYS",
    "subject": "Physics",
    "topicCode": "MOTION_IN_2D",
    "topic": "Motion in 2D",
    "subtopic": "CAP-PHY-MOTION-2D",
    "exam": "ExamSide JEE Main",
    "year": "JEE Main 2026 (Online) 4th April Evening Shift",
    "paper": "Diagnostic Hub",
    "questionNumber": "EXAM-03",
    "section": "FAM-PHY-MOTION-2D",
    "markingScheme": "+3 / 0",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Motion in 2D",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "NUMERIC_QUANTITY",
    "stem": "If x and y coordinates of a projectile as a function of time (t) are given as 24t and 43.6t\u22124.9t2 , respectively, then the angle (in degrees) made by the projectile with horizontal when t=2s is ____ .",
    "options": [],
    "hints": [
      "[METHOD] Given x(t) = 24t &rArr; v_x = dx/dt = 24 m/s (constant).",
      "[METHOD] Given y(t) = 43.6t - 4.9t\u00b2 &rArr; v_y = dy/dt = 43.6 - 9.8t.",
      "[METHOD] Evaluate vertical velocity at t = 2 s: v_y(2) = 43.6 - 9.8(2) = 43.6 - 19.6 = 24 m/s."
    ],
    "steps": [
      "Given x(t) = 24t &rArr; v_x = dx/dt = 24 m/s (constant).",
      "Given y(t) = 43.6t - 4.9t\u00b2 &rArr; v_y = dy/dt = 43.6 - 9.8t.",
      "Evaluate vertical velocity at t = 2 s: v_y(2) = 43.6 - 9.8(2) = 43.6 - 19.6 = 24 m/s.",
      "Find angle with horizontal: tan \u03b8 = v_y / v_x = 24 / 24 = 1 &rArr; \u03b8 = 45\u00b0."
    ],
    "limitingCheck": "Independent check: re-derive from \"v_x = dx/dt,  v_y = dy/dt,  tan \u03b8 = v_y / v_x\" and verify that the stated data reproduce 45\u00b0. No unstated numerical parameter should be needed.",
    "check": "Independent check: re-derive from \"v_x = dx/dt,  v_y = dy/dt,  tan \u03b8 = v_y / v_x\" and verify that the stated data reproduce 45\u00b0. No unstated numerical parameter should be needed.",
    "trapWarning": "When position is given explicitly as a function of time, differentiate it directly; do not force a memorized constant-acceleration template onto it.",
    "correctKey": null,
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Physics)"
  },
  {
    "id": "EXAM-04",
    "code": "EXAM-04",
    "title": "ExamSide JEE Main \u00b7 Diagnostic Hub \u00b7 QEXAM-04 \u00b7 Motion in 2D",
    "subjectCode": "PHYS",
    "subject": "Physics",
    "topicCode": "MOTION_IN_2D",
    "topic": "Motion in 2D",
    "subtopic": "CAP-PHY-MOTION-2D",
    "exam": "ExamSide JEE Main",
    "year": "JEE Main 2026 (Online) 4th April Morning Shift",
    "paper": "Diagnostic Hub",
    "questionNumber": "EXAM-04",
    "section": "FAM-PHY-MOTION-2D",
    "markingScheme": "+3 / 0",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Motion in 2D",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "NUMERIC_QUANTITY",
    "stem": "The two projectiles are projected with the same initial velocities at the 15\u2218 and 30\u2218 with respect to the horizontal. The ratio of their ranges is 1:x . The value of x is",
    "options": [],
    "hints": [
      "[METHOD] For 15\u00b0, R\u2081=(u\u00b2/g)sin30\u00b0=(u\u00b2/2g).",
      "[METHOD] For 30\u00b0, R\u2082=(u\u00b2/g)sin60\u00b0=(\u221a3u\u00b2/2g).",
      "[METHOD] R\u2081:R\u2082=1:\u221a3, so in 1:x, x=\u221a3."
    ],
    "steps": [
      "For 15\u00b0, R\u2081=(u\u00b2/g)sin30\u00b0=(u\u00b2/2g).",
      "For 30\u00b0, R\u2082=(u\u00b2/g)sin60\u00b0=(\u221a3u\u00b2/2g).",
      "R\u2081:R\u2082=1:\u221a3, so in 1:x, x=\u221a3."
    ],
    "limitingCheck": "Independent check: re-derive from \"R = (u\u00b2/g) sin 2\u03b8.\" and verify that the stated data reproduce x = \u221a3. No unstated numerical parameter should be needed.",
    "check": "Independent check: re-derive from \"R = (u\u00b2/g) sin 2\u03b8.\" and verify that the stated data reproduce x = \u221a3. No unstated numerical parameter should be needed.",
    "trapWarning": "Do not invoke complementary-angle symmetry unless the launches have the same speed and the same launch/landing level; otherwise compare the governing expressions directly.",
    "correctKey": null,
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Physics)"
  },
  {
    "id": "EXAM-05",
    "code": "EXAM-05",
    "title": "ExamSide JEE Main \u00b7 Diagnostic Hub \u00b7 QEXAM-05 \u00b7 Motion in 2D",
    "subjectCode": "PHYS",
    "subject": "Physics",
    "topicCode": "MOTION_IN_2D",
    "topic": "Motion in 2D",
    "subtopic": "CAP-PHY-MOTION-2D",
    "exam": "ExamSide JEE Main",
    "year": "JEE Main 2026 (Online) 24th January Morning Shift",
    "paper": "Diagnostic Hub",
    "questionNumber": "EXAM-05",
    "section": "FAM-PHY-MOTION-2D",
    "markingScheme": "+3 / 0",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Motion in 2D",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "NUMERIC_QUANTITY",
    "stem": "A boy throws a ball into air at 45\u2218 from the horizontal to land it on a roof of a building of height H . If the ball attains maximum height in 2 s and lands on the building in 3 s after launch, then value of H is ____ m. (g=10m/s2)",
    "options": [],
    "hints": [
      "[METHOD] Time to reach maximum height is t_apex = 2 s &rArr; u_y / g = 2 &rArr; u_y = 20 m/s (taking g = 10 m/s\u00b2).",
      "[METHOD] Ball lands on roof at t = 3 s.",
      "[METHOD] Height of the roof is the vertical position of the ball at t = 3 s:"
    ],
    "steps": [
      "Time to reach maximum height is t_apex = 2 s &rArr; u_y / g = 2 &rArr; u_y = 20 m/s (taking g = 10 m/s\u00b2).",
      "Ball lands on roof at t = 3 s.",
      "Height of the roof is the vertical position of the ball at t = 3 s:",
      "H = y(3) = u_y(3) - \u00bd g (3)\u00b2 = 20(3) - 5(9) = 60 - 45 = 15 m."
    ],
    "limitingCheck": "Independent check: re-derive from \"t_apex = u_y / g,  y(t) = u_y t - \u00bd g t\u00b2\" and verify that the stated data reproduce H = 15 m. No unstated numerical parameter should be needed.",
    "check": "Independent check: re-derive from \"t_apex = u_y / g,  y(t) = u_y t - \u00bd g t\u00b2\" and verify that the stated data reproduce H = 15 m. No unstated numerical parameter should be needed.",
    "trapWarning": "Do not use ground-to-ground symmetric projectile formulas when launch and landing heights differ; solve the vertical boundary event first.",
    "correctKey": null,
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Physics)"
  },
  {
    "id": "EXAM-06",
    "code": "EXAM-06",
    "title": "ExamSide JEE Main \u00b7 Diagnostic Hub \u00b7 QEXAM-06 \u00b7 Motion in 2D",
    "subjectCode": "PHYS",
    "subject": "Physics",
    "topicCode": "MOTION_IN_2D",
    "topic": "Motion in 2D",
    "subtopic": "CAP-PHY-MOTION-2D",
    "exam": "ExamSide JEE Main",
    "year": "JEE Main 2026 (Online) 22nd January Morning Shift",
    "paper": "Diagnostic Hub",
    "questionNumber": "EXAM-06",
    "section": "FAM-PHY-MOTION-2D",
    "markingScheme": "+3 / 0",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Motion in 2D",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "NUMERIC_QUANTITY",
    "stem": "A projectile is thrown upward at an angle 60\u2218 with the horizontal. The speed of the projectile is 20m/s when its direction of motion is 45\u2218 with the horizontal. The initial speed of the projectile is ____ m/s .",
    "options": [],
    "hints": [
      "[METHOD] Throughout projectile flight, horizontal velocity remains strictly constant: v_x = u cos \u03b8 = v cos \u03b1.",
      "[METHOD] Given initial angle \u03b8 = 60\u00b0, and at inclination \u03b1 = 45\u00b0 speed is v = 20 m/s.",
      "[METHOD] Equate horizontal components: u cos 60\u00b0 = 20 cos 45\u00b0."
    ],
    "steps": [
      "Throughout projectile flight, horizontal velocity remains strictly constant: v_x = u cos \u03b8 = v cos \u03b1.",
      "Given initial angle \u03b8 = 60\u00b0, and at inclination \u03b1 = 45\u00b0 speed is v = 20 m/s.",
      "Equate horizontal components: u cos 60\u00b0 = 20 cos 45\u00b0.",
      "Substitute values: u (1/2) = 20 (1/\u221a2) &rArr; u = 40 / \u221a2 = 20\u221a2 m/s \u2248 28.28 m/s."
    ],
    "limitingCheck": "Independent check: re-derive from \"v_x = u cos \u03b8 = v cos \u03b1  (Horizontal velocity conservation)\" and verify that the stated data reproduce 20\u221a2 m/s (\u2248 28.3 m/s). No unstated numerical parameter should be needed.",
    "check": "Independent check: re-derive from \"v_x = u cos \u03b8 = v cos \u03b1  (Horizontal velocity conservation)\" and verify that the stated data reproduce 20\u221a2 m/s (\u2248 28.3 m/s). No unstated numerical parameter should be needed.",
    "trapWarning": "Resolve the launch velocity into components and check whether the formula's equal-level assumptions actually hold.",
    "correctKey": null,
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Physics)"
  },
  {
    "id": "EXAM-07",
    "code": "EXAM-07",
    "title": "ExamSide JEE Main \u00b7 Diagnostic Hub \u00b7 QEXAM-07 \u00b7 Motion in 2D",
    "subjectCode": "PHYS",
    "subject": "Physics",
    "topicCode": "MOTION_IN_2D",
    "topic": "Motion in 2D",
    "subtopic": "CAP-PHY-MOTION-2D",
    "exam": "ExamSide JEE Main",
    "year": "JEE Main 2026 (Online) 21st January Evening Shift",
    "paper": "Diagnostic Hub",
    "questionNumber": "EXAM-07",
    "section": "FAM-PHY-MOTION-2D",
    "markingScheme": "+3 / 0",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Motion in 2D",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "NUMERIC_QUANTITY",
    "stem": "A river of width 200 m is flowing from west to east with a speed of 18 km/h. A boat, moving with speed of 36 km/h in still water, is made to travel one-round trip (bank to bank of the river). Minimum time taken by the boat for this journey and also the displacement along the river bank are ______ and ______ respectively.",
    "options": [],
    "hints": [
      "[METHOD] River width d = 200 m. River flow speed v_r = 18 km/h = 5 m/s. Boat still water speed v_b = 36 km/h = 10 m/s.",
      "[METHOD] Minimum time crossing requires steering directly perpendicular to banks (\u03b8 = 0\u00b0):",
      "[METHOD] One-way time: t\u2081 = d / v_b = 200 / 10 = 20 s. Return trip time: t\u2082 = 200 / 10 = 20 s. Total time = 40 s."
    ],
    "steps": [
      "River width d = 200 m. River flow speed v_r = 18 km/h = 5 m/s. Boat still water speed v_b = 36 km/h = 10 m/s.",
      "Minimum time crossing requires steering directly perpendicular to banks (\u03b8 = 0\u00b0):",
      "One-way time: t\u2081 = d / v_b = 200 / 10 = 20 s. Return trip time: t\u2082 = 200 / 10 = 20 s. Total time = 40 s.",
      "Downstream drift on outgoing trip: x\u2081 = v_r t\u2081 = 5 &times; 20 = 100 m downstream.",
      "On return trip, boat again drifts downstream: x\u2082 = 5 &times; 20 = 100 m.",
      "Total displacement along river bank = 100 + 100 = 200 m downstream."
    ],
    "limitingCheck": "Independent check: re-derive from \"t_min = d / v_b,  drift = v_r t\" and verify that the stated data reproduce 40 s and 200 m. No unstated numerical parameter should be needed.",
    "check": "Independent check: re-derive from \"t_min = d / v_b,  drift = v_r t\" and verify that the stated data reproduce 40 s and 200 m. No unstated numerical parameter should be needed.",
    "trapWarning": "Keep a frame label on every velocity before adding or subtracting vectors; dropping the frame is the usual sign/direction error.",
    "correctKey": null,
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Physics)"
  },
  {
    "id": "EXAM-08",
    "code": "EXAM-08",
    "title": "ExamSide JEE Main \u00b7 Diagnostic Hub \u00b7 QEXAM-08 \u00b7 Motion in 2D",
    "subjectCode": "PHYS",
    "subject": "Physics",
    "topicCode": "MOTION_IN_2D",
    "topic": "Motion in 2D",
    "subtopic": "CAP-PHY-MOTION-2D",
    "exam": "ExamSide JEE Main",
    "year": "JEE Main 2025 (Online) 8th April Evening Shift",
    "paper": "Diagnostic Hub",
    "questionNumber": "EXAM-08",
    "section": "FAM-PHY-MOTION-2D",
    "markingScheme": "+3 / 0",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Motion in 2D",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "NUMERIC_QUANTITY",
    "stem": "Two balls with same mass and initial velocity, are projected at different angles in such a way that maximum height reached by first ball is 8 times higher than that of the second ball. T1 and T2 are the total flying times of first and second ball, respectively, then the ratio of T1 and T2 is",
    "options": [],
    "hints": [
      "[METHOD] With the same launch speed, H\u2081/H\u2082=(sin\u03b8\u2081/sin\u03b8\u2082)\u00b2=8.",
      "[METHOD] Therefore sin\u03b8\u2081/sin\u03b8\u2082=\u221a8=2\u221a2.",
      "[METHOD] Since T\u221dsin\u03b8 for fixed u and g, T\u2081/T\u2082=2\u221a2."
    ],
    "steps": [
      "With the same launch speed, H\u2081/H\u2082=(sin\u03b8\u2081/sin\u03b8\u2082)\u00b2=8.",
      "Therefore sin\u03b8\u2081/sin\u03b8\u2082=\u221a8=2\u221a2.",
      "Since T\u221dsin\u03b8 for fixed u and g, T\u2081/T\u2082=2\u221a2."
    ],
    "limitingCheck": "Independent check: re-derive from \"H \u221d (u sin\u03b8)\u00b2 and T \u221d u sin\u03b8 for the same g.\" and verify that the stated data reproduce T\u2081:T\u2082 = 2\u221a2:1. No unstated numerical parameter should be needed.",
    "check": "Independent check: re-derive from \"H \u221d (u sin\u03b8)\u00b2 and T \u221d u sin\u03b8 for the same g.\" and verify that the stated data reproduce T\u2081:T\u2082 = 2\u221a2:1. No unstated numerical parameter should be needed.",
    "trapWarning": "Resolve the launch velocity into components and check whether the formula's equal-level assumptions actually hold.",
    "correctKey": null,
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Physics)"
  },
  {
    "id": "EXAM-09",
    "code": "EXAM-09",
    "title": "ExamSide JEE Main \u00b7 Diagnostic Hub \u00b7 QEXAM-09 \u00b7 Motion in 2D",
    "subjectCode": "PHYS",
    "subject": "Physics",
    "topicCode": "MOTION_IN_2D",
    "topic": "Motion in 2D",
    "subtopic": "CAP-PHY-MOTION-2D",
    "exam": "ExamSide JEE Main",
    "year": "JEE Main 2025 (Online) 7th April Evening Shift",
    "paper": "Diagnostic Hub",
    "questionNumber": "EXAM-09",
    "section": "FAM-PHY-MOTION-2D",
    "markingScheme": "+3 / 0",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Motion in 2D",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "NUMERIC_QUANTITY",
    "stem": "A helicopter flying horizontally with a speed of 360 km/h at an altitude of 2 km, drops an object at an instant. The object hits the ground at a point O, 20 s after it is dropped. Displacement of 'O' from the position of helicopter where the object was released is : (use acceleration due to gravity g = 10 m/s 2 and neglect air resistance)",
    "options": [],
    "hints": [
      "[METHOD] Horizontal speed of helicopter: v_x = 360 km/h = 100 m/s. Altitude h = 2 km = 2000 m.",
      "[METHOD] Horizontal displacement in t = 20 s: x = v_x t = 100 &times; 20 = 2000 m.",
      "[METHOD] Vertical displacement: y = 2000 m."
    ],
    "steps": [
      "Horizontal speed of helicopter: v_x = 360 km/h = 100 m/s. Altitude h = 2 km = 2000 m.",
      "Horizontal displacement in t = 20 s: x = v_x t = 100 &times; 20 = 2000 m.",
      "Vertical displacement: y = 2000 m.",
      "Total straight-line displacement from drop point: S = \u221a(x\u00b2 + y\u00b2) = \u221a(2000\u00b2 + 2000\u00b2) = 2000\u221a2 m \u2248 2.83 km."
    ],
    "limitingCheck": "Independent check: re-derive from \"x = v_x t,  y = h = \u00bd g t\u00b2,  S = \u221a(x\u00b2 + y\u00b2)\" and verify that the stated data reproduce 2000\u221a2 m (\u2248 2828 m). No unstated numerical parameter should be needed.",
    "check": "Independent check: re-derive from \"x = v_x t,  y = h = \u00bd g t\u00b2,  S = \u221a(x\u00b2 + y\u00b2)\" and verify that the stated data reproduce 2000\u221a2 m (\u2248 2828 m). No unstated numerical parameter should be needed.",
    "trapWarning": "Do not use ground-to-ground symmetric projectile formulas when launch and landing heights differ; solve the vertical boundary event first.",
    "correctKey": null,
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Physics)"
  },
  {
    "id": "EXAM-10",
    "code": "EXAM-10",
    "title": "ExamSide JEE Main \u00b7 Diagnostic Hub \u00b7 QEXAM-10 \u00b7 Motion in 2D",
    "subjectCode": "PHYS",
    "subject": "Physics",
    "topicCode": "MOTION_IN_2D",
    "topic": "Motion in 2D",
    "subtopic": "CAP-PHY-MOTION-2D",
    "exam": "ExamSide JEE Main",
    "year": "JEE Main 2025 (Online) 7th April Morning Shift",
    "paper": "Diagnostic Hub",
    "questionNumber": "EXAM-10",
    "section": "FAM-PHY-MOTION-2D",
    "markingScheme": "+3 / 0",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Motion in 2D",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "NUMERIC_QUANTITY",
    "stem": "Two projectiles are fired from ground with same initial speeds from same point at angles (45\u2218+ \u03b1) and (45\u2218\u2212\u03b1) with horizontal direction. The ratio of their times of flights is",
    "options": [],
    "hints": [
      "[METHOD] T\u208a/T\u208b=sin(45\u00b0+\u03b1)/sin(45\u00b0\u2212\u03b1).",
      "[METHOD] Expand the sines: (cos\u03b1+sin\u03b1)/(cos\u03b1\u2212sin\u03b1).",
      "[METHOD] Divide by cos\u03b1 to obtain (1+tan\u03b1)/(1\u2212tan\u03b1)."
    ],
    "steps": [
      "T\u208a/T\u208b=sin(45\u00b0+\u03b1)/sin(45\u00b0\u2212\u03b1).",
      "Expand the sines: (cos\u03b1+sin\u03b1)/(cos\u03b1\u2212sin\u03b1).",
      "Divide by cos\u03b1 to obtain (1+tan\u03b1)/(1\u2212tan\u03b1)."
    ],
    "limitingCheck": "Independent check: re-derive from \"T = 2u sin\u03b8/g.\" and verify that the stated data reproduce T(45\u00b0+\u03b1)/T(45\u00b0\u2212\u03b1) = (1+tan\u03b1)/(1\u2212tan\u03b1). No unstated numerical parameter should be needed.",
    "check": "Independent check: re-derive from \"T = 2u sin\u03b8/g.\" and verify that the stated data reproduce T(45\u00b0+\u03b1)/T(45\u00b0\u2212\u03b1) = (1+tan\u03b1)/(1\u2212tan\u03b1). No unstated numerical parameter should be needed.",
    "trapWarning": "Do not invoke complementary-angle symmetry unless the launches have the same speed and the same launch/landing level; otherwise compare the governing expressions directly.",
    "correctKey": null,
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Physics)"
  },
  {
    "id": "EXAM-11",
    "code": "EXAM-11",
    "title": "ExamSide JEE Main \u00b7 Diagnostic Hub \u00b7 QEXAM-11 \u00b7 Motion in 2D",
    "subjectCode": "PHYS",
    "subject": "Physics",
    "topicCode": "MOTION_IN_2D",
    "topic": "Motion in 2D",
    "subtopic": "CAP-PHY-MOTION-2D",
    "exam": "ExamSide JEE Main",
    "year": "JEE Main 2025 (Online) 3rd April Evening Shift",
    "paper": "Diagnostic Hub",
    "questionNumber": "EXAM-11",
    "section": "FAM-PHY-MOTION-2D",
    "markingScheme": "+3 / 0",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Motion in 2D",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "NUMERIC_QUANTITY",
    "stem": "A particle is projected with velocity u so that its horizontal range is three times the maximum height attained by it. The horizontal range of the projectile is given as nu225g , where value of n is: (Given, ' g ' is the acceleration due to gravity.)",
    "options": [],
    "hints": [
      "[METHOD] Given condition: R = 3H.",
      "[METHOD] Substitute into the 4H identity: (3H) tan \u03b8 = 4H &rArr; tan \u03b8 = 4/3.",
      "[METHOD] From tan \u03b8 = 4/3, right triangle yields sin \u03b8 = 4/5, cos \u03b8 = 3/5."
    ],
    "steps": [
      "Given condition: R = 3H.",
      "Substitute into the 4H identity: (3H) tan \u03b8 = 4H &rArr; tan \u03b8 = 4/3.",
      "From tan \u03b8 = 4/3, right triangle yields sin \u03b8 = 4/5, cos \u03b8 = 3/5.",
      "Range R = (2 u\u00b2 sin \u03b8 cos \u03b8) / g = [2 u\u00b2 (4/5)(3/5)] / g = (24 u\u00b2) / (25 g).",
      "Comparing with R = n u\u00b2 / (25 g), we get n = 24."
    ],
    "limitingCheck": "Independent check: re-derive from \"R tan \u03b8 = 4H\" and verify that the stated data reproduce n = 24. No unstated numerical parameter should be needed.",
    "check": "Independent check: re-derive from \"R tan \u03b8 = 4H\" and verify that the stated data reproduce n = 24. No unstated numerical parameter should be needed.",
    "trapWarning": "Resolve the launch velocity into components and check whether the formula's equal-level assumptions actually hold.",
    "correctKey": null,
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Physics)"
  },
  {
    "id": "EXAM-12",
    "code": "EXAM-12",
    "title": "ExamSide JEE Main \u00b7 Diagnostic Hub \u00b7 QEXAM-12 \u00b7 Motion in 2D",
    "subjectCode": "PHYS",
    "subject": "Physics",
    "topicCode": "MOTION_IN_2D",
    "topic": "Motion in 2D",
    "subtopic": "CAP-PHY-MOTION-2D",
    "exam": "ExamSide JEE Main",
    "year": "JEE Main 2025 (Online) 3rd April Morning Shift",
    "paper": "Diagnostic Hub",
    "questionNumber": "EXAM-12",
    "section": "FAM-PHY-MOTION-2D",
    "markingScheme": "+3 / 0",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Motion in 2D",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "NUMERIC_QUANTITY",
    "stem": "The angle of projection of a particle is measured from the vertical axis as \u03c6 and the maximum height reached by the particle is hm . Here hm as function of \u03c6 can be presented as",
    "options": [],
    "hints": [
      "[METHOD] The stated angle \u03c6 is measured from the vertical, so \u03b8=90\u00b0\u2212\u03c6.",
      "[METHOD] sin\u03b8=cos\u03c6.",
      "[METHOD] Hence h_m=u\u00b2cos\u00b2\u03c6/(2g)."
    ],
    "steps": [
      "The stated angle \u03c6 is measured from the vertical, so \u03b8=90\u00b0\u2212\u03c6.",
      "sin\u03b8=cos\u03c6.",
      "Hence h_m=u\u00b2cos\u00b2\u03c6/(2g)."
    ],
    "limitingCheck": "Independent check: re-derive from \"H = u\u00b2 sin\u00b2\u03b8/(2g), with \u03b8 measured from the horizontal.\" and verify that the stated data reproduce h_m = u\u00b2 cos\u00b2\u03c6 / (2g). No unstated numerical parameter should be needed.",
    "check": "Independent check: re-derive from \"H = u\u00b2 sin\u00b2\u03b8/(2g), with \u03b8 measured from the horizontal.\" and verify that the stated data reproduce h_m = u\u00b2 cos\u00b2\u03c6 / (2g). No unstated numerical parameter should be needed.",
    "trapWarning": "The stated angle is measured from the vertical; using it directly in a horizontal-angle formula swaps sine and cosine.",
    "correctKey": null,
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Physics)"
  },
  {
    "id": "EXAM-13",
    "code": "EXAM-13",
    "title": "ExamSide JEE Main \u00b7 Diagnostic Hub \u00b7 QEXAM-13 \u00b7 Motion in 2D",
    "subjectCode": "PHYS",
    "subject": "Physics",
    "topicCode": "MOTION_IN_2D",
    "topic": "Motion in 2D",
    "subtopic": "CAP-PHY-MOTION-2D",
    "exam": "ExamSide JEE Main",
    "year": "JEE Main 2025 (Online) 2nd April Morning Shift",
    "paper": "Diagnostic Hub",
    "questionNumber": "EXAM-13",
    "section": "FAM-PHY-MOTION-2D",
    "markingScheme": "+3 / 0",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Motion in 2D",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "NUMERIC_QUANTITY",
    "stem": "A river is flowing from west to east direction with speed of 9kmh\u22121 . If a boat capable of moving at a maximum speed of 27kmh\u22121 in still water, crosses the river in half a minute, while moving with maximum speed at an angle of 150\u2218 to direction of river flow, then the width of the river is :",
    "options": [],
    "hints": [
      "[METHOD] Boat speed v_b = 27 km/h = 7.5 m/s. Crossing time t = 0.5 min = 30 s.",
      "[METHOD] Angle with river flow is 150\u00b0 &rArr; angle with perpendicular to bank is 150\u00b0 - 90\u00b0 = 60\u00b0 upstream (or 30\u00b0 with bank).",
      "[METHOD] Effective crossing velocity perpendicular to bank: v_y = v_b sin(150\u00b0) = 7.5 &times; 0.5 = 3.75 m/s."
    ],
    "steps": [
      "Boat speed v_b = 27 km/h = 7.5 m/s. Crossing time t = 0.5 min = 30 s.",
      "Angle with river flow is 150\u00b0 &rArr; angle with perpendicular to bank is 150\u00b0 - 90\u00b0 = 60\u00b0 upstream (or 30\u00b0 with bank).",
      "Effective crossing velocity perpendicular to bank: v_y = v_b sin(150\u00b0) = 7.5 &times; 0.5 = 3.75 m/s.",
      "River width: d = v_y &times; t = 3.75 &times; 30 = 112.5 m."
    ],
    "limitingCheck": "Independent check: re-derive from \"d = v_y t = (v_b sin 30\u00b0) t\" and verify that the stated data reproduce 112.5 m. No unstated numerical parameter should be needed.",
    "check": "Independent check: re-derive from \"d = v_y t = (v_b sin 30\u00b0) t\" and verify that the stated data reproduce 112.5 m. No unstated numerical parameter should be needed.",
    "trapWarning": "Keep a frame label on every velocity before adding or subtracting vectors; dropping the frame is the usual sign/direction error.",
    "correctKey": null,
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Physics)"
  },
  {
    "id": "EXAM-14",
    "code": "EXAM-14",
    "title": "ExamSide JEE Main \u00b7 Diagnostic Hub \u00b7 QEXAM-14 \u00b7 Motion in 2D",
    "subjectCode": "PHYS",
    "subject": "Physics",
    "topicCode": "MOTION_IN_2D",
    "topic": "Motion in 2D",
    "subtopic": "CAP-PHY-MOTION-2D",
    "exam": "ExamSide JEE Main",
    "year": "JEE Main 2025 (Online) 29th January Morning Shift",
    "paper": "Diagnostic Hub",
    "questionNumber": "EXAM-14",
    "section": "FAM-PHY-MOTION-2D",
    "markingScheme": "+3 / 0",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Motion in 2D",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "NUMERIC_QUANTITY",
    "stem": "Two projectiles are fired with same initial speed from same point on ground at angles of (45\u2218\u2212\u03b1) and (45\u2218+\u03b1) , respectively, with the horizontal direction. The ratio of their maximum heights attained is :",
    "options": [],
    "hints": [
      "[METHOD] For \u03b8\u2081=45\u00b0\u2212\u03b1 and \u03b8\u2082=45\u00b0+\u03b1, H\u2081/H\u2082=[sin(45\u00b0\u2212\u03b1)/sin(45\u00b0+\u03b1)]\u00b2.",
      "[METHOD] Use sin(45\u00b0\u00b1\u03b1)=(cos\u03b1\u00b1sin\u03b1)/\u221a2.",
      "[METHOD] Thus H\u2081/H\u2082=[(1\u2212tan\u03b1)/(1+tan\u03b1)]\u00b2."
    ],
    "steps": [
      "For \u03b8\u2081=45\u00b0\u2212\u03b1 and \u03b8\u2082=45\u00b0+\u03b1, H\u2081/H\u2082=[sin(45\u00b0\u2212\u03b1)/sin(45\u00b0+\u03b1)]\u00b2.",
      "Use sin(45\u00b0\u00b1\u03b1)=(cos\u03b1\u00b1sin\u03b1)/\u221a2.",
      "Thus H\u2081/H\u2082=[(1\u2212tan\u03b1)/(1+tan\u03b1)]\u00b2."
    ],
    "limitingCheck": "Independent check: re-derive from \"H = u\u00b2 sin\u00b2\u03b8/(2g).\" and verify that the stated data reproduce H\u2081:H\u2082 = (1\u2212tan\u03b1)\u00b2 : (1+tan\u03b1)\u00b2. No unstated numerical parameter should be needed.",
    "check": "Independent check: re-derive from \"H = u\u00b2 sin\u00b2\u03b8/(2g).\" and verify that the stated data reproduce H\u2081:H\u2082 = (1\u2212tan\u03b1)\u00b2 : (1+tan\u03b1)\u00b2. No unstated numerical parameter should be needed.",
    "trapWarning": "Do not invoke complementary-angle symmetry unless the launches have the same speed and the same launch/landing level; otherwise compare the governing expressions directly.",
    "correctKey": null,
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Physics)"
  },
  {
    "id": "EXAM-15",
    "code": "EXAM-15",
    "title": "ExamSide JEE Main \u00b7 Diagnostic Hub \u00b7 QEXAM-15 \u00b7 Motion in 2D",
    "subjectCode": "PHYS",
    "subject": "Physics",
    "topicCode": "MOTION_IN_2D",
    "topic": "Motion in 2D",
    "subtopic": "CAP-PHY-MOTION-2D",
    "exam": "ExamSide JEE Main",
    "year": "JEE Main 2025 (Online) 24th January Evening Shift",
    "paper": "Diagnostic Hub",
    "questionNumber": "EXAM-15",
    "section": "FAM-PHY-MOTION-2D",
    "markingScheme": "+3 / 0",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Motion in 2D",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "NUMERIC_QUANTITY",
    "stem": "The position vector of a moving body at any instant of time is given as r\u2192=(5t2i\u02c6\u22125tj\u02c6)m . The magnitude and direction of velocity at t=2s is,",
    "options": [],
    "hints": [
      "[METHOD] Position vector r\u2192 = (5t\u00b2 \u00ee - 5t \u0135) m.",
      "[METHOD] Differentiate with respect to time: v\u2192 = d/dt(5t\u00b2 \u00ee - 5t \u0135) = 10t \u00ee - 5 \u0135 m/s.",
      "[METHOD] At t = 2 s: v\u2192 = 10(2) \u00ee - 5 \u0135 = 20 \u00ee - 5 \u0135 m/s."
    ],
    "steps": [
      "Position vector r\u2192 = (5t\u00b2 \u00ee - 5t \u0135) m.",
      "Differentiate with respect to time: v\u2192 = d/dt(5t\u00b2 \u00ee - 5t \u0135) = 10t \u00ee - 5 \u0135 m/s.",
      "At t = 2 s: v\u2192 = 10(2) \u00ee - 5 \u0135 = 20 \u00ee - 5 \u0135 m/s.",
      "Magnitude v = \u221a(20\u00b2 + (-5)\u00b2) = \u221a(400 + 25) = \u221a425 = 5\u221a17 m/s \u2248 20.6 m/s.",
      "Direction: tan \u03b8 = -5 / 20 = -1/4 (pointing below +x axis)."
    ],
    "limitingCheck": "Independent check: re-derive from \"v\u2192 = dr\u2192/dt = (dx/dt)\u00ee + (dy/dt)\u0135\" and verify that the stated data reproduce 5\u221a17 m/s, tan \u03b8 = -1/4. No unstated numerical parameter should be needed.",
    "check": "Independent check: re-derive from \"v\u2192 = dr\u2192/dt = (dx/dt)\u00ee + (dy/dt)\u0135\" and verify that the stated data reproduce 5\u221a17 m/s, tan \u03b8 = -1/4. No unstated numerical parameter should be needed.",
    "trapWarning": "When position is given explicitly as a function of time, differentiate it directly; do not force a memorized constant-acceleration template onto it.",
    "correctKey": null,
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Physics)"
  },
  {
    "id": "EXAM-16",
    "code": "EXAM-16",
    "title": "ExamSide JEE Main \u00b7 Diagnostic Hub \u00b7 QEXAM-16 \u00b7 Motion in 2D",
    "subjectCode": "PHYS",
    "subject": "Physics",
    "topicCode": "MOTION_IN_2D",
    "topic": "Motion in 2D",
    "subtopic": "CAP-PHY-MOTION-2D",
    "exam": "ExamSide JEE Main",
    "year": "JEE Main 2025 (Online) 24th January Morning Shift",
    "paper": "Diagnostic Hub",
    "questionNumber": "EXAM-16",
    "section": "FAM-PHY-MOTION-2D",
    "markingScheme": "+3 / 0",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Motion in 2D",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "NUMERIC_QUANTITY",
    "stem": "An object of mass ' m ' is projected from origin in a vertical xy plane at an angle 45\u2218 with the x\u2212 axis with an initial velocity v0 . The magnitude and direction of the angular momentum of the object with respect to origin, when it reaches at the maximum height, will be [ g is acceleration due to gravity]",
    "options": [],
    "hints": [
      "[METHOD] At apex of projectile: position r\u2192 = (R/2) \u00ee + H \u0135, velocity is purely horizontal v\u2192 = (v\u2080 cos 45\u00b0) \u00ee = (v\u2080 / \u221a2) \u00ee.",
      "[METHOD] Angular momentum L\u2192 = r\u2192 &times; (m v\u2192) = [(R/2) \u00ee + H \u0135] &times; m(v\u2080 / \u221a2) \u00ee = -m(v\u2080 / \u221a2) H k\u0302.",
      "[METHOD] Maximum height H = (v\u2080 sin 45\u00b0)\u00b2 / (2g) = v\u2080\u00b2 / (4g)."
    ],
    "steps": [
      "At apex of projectile: position r\u2192 = (R/2) \u00ee + H \u0135, velocity is purely horizontal v\u2192 = (v\u2080 cos 45\u00b0) \u00ee = (v\u2080 / \u221a2) \u00ee.",
      "Angular momentum L\u2192 = r\u2192 &times; (m v\u2192) = [(R/2) \u00ee + H \u0135] &times; m(v\u2080 / \u221a2) \u00ee = -m(v\u2080 / \u221a2) H k\u0302.",
      "Maximum height H = (v\u2080 sin 45\u00b0)\u00b2 / (2g) = v\u2080\u00b2 / (4g).",
      "Magnitude |L\u2192| = m (v\u2080 / \u221a2) &times; [v\u2080\u00b2 / (4g)] = (m v\u2080\u00b3) / (4\u221a2 g) = (m v\u2080\u00b3 \u221a2) / (8g) pointing into page (-k\u0302)."
    ],
    "limitingCheck": "Independent check: re-derive from \"L\u2192 = r\u2192 &times; p\u2192 = r\u2192 &times; (m v\u2192)\" and verify that the stated data reproduce (m v\u2080\u00b3 \u221a2) / (8g) (-k\u0302). No unstated numerical parameter should be needed.",
    "check": "Independent check: re-derive from \"L\u2192 = r\u2192 &times; p\u2192 = r\u2192 &times; (m v\u2192)\" and verify that the stated data reproduce (m v\u2080\u00b3 \u221a2) / (8g) (-k\u0302). No unstated numerical parameter should be needed.",
    "trapWarning": "Resolve the launch velocity into components and check whether the formula's equal-level assumptions actually hold.",
    "correctKey": null,
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Physics)"
  },
  {
    "id": "EXAM-17",
    "code": "EXAM-17",
    "title": "ExamSide JEE Main \u00b7 Diagnostic Hub \u00b7 QEXAM-17 \u00b7 Motion in 2D",
    "subjectCode": "PHYS",
    "subject": "Physics",
    "topicCode": "MOTION_IN_2D",
    "topic": "Motion in 2D",
    "subtopic": "CAP-PHY-MOTION-2D",
    "exam": "ExamSide JEE Main",
    "year": "JEE Main 2025 (Online) 22nd January Evening Shift",
    "paper": "Diagnostic Hub",
    "questionNumber": "EXAM-17",
    "section": "FAM-PHY-MOTION-2D",
    "markingScheme": "+3 / 0",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Motion in 2D",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "NUMERIC_QUANTITY",
    "stem": "A ball of mass 100 g is projected with velocity 20m/s at 60\u2218 with horizontal. The decrease in kinetic energy of the ball during the motion from point of projection to highest point is",
    "options": [],
    "hints": [
      "[METHOD] Mass m = 100 g = 0.1 kg, initial speed u = 20 m/s, \u03b8 = 60\u00b0.",
      "[METHOD] Initial kinetic energy: KE\u2080 = \u00bd m u\u00b2 = \u00bd (0.1)(20\u00b2) = \u00bd (0.1)(400) = 20 J.",
      "[METHOD] At highest point, vertical speed is zero; speed is purely horizontal: v_apex = u cos 60\u00b0 = 20(0.5) = 10 m/s."
    ],
    "steps": [
      "Mass m = 100 g = 0.1 kg, initial speed u = 20 m/s, \u03b8 = 60\u00b0.",
      "Initial kinetic energy: KE\u2080 = \u00bd m u\u00b2 = \u00bd (0.1)(20\u00b2) = \u00bd (0.1)(400) = 20 J.",
      "At highest point, vertical speed is zero; speed is purely horizontal: v_apex = u cos 60\u00b0 = 20(0.5) = 10 m/s.",
      "Apex kinetic energy: KE_apex = \u00bd m v_apex\u00b2 = \u00bd (0.1)(10\u00b2) = 5 J.",
      "Decrease in kinetic energy: \u0394KE = KE\u2080 - KE_apex = 20 - 5 = 15 J."
    ],
    "limitingCheck": "Independent check: re-derive from \"KE_apex = \u00bd m (u cos \u03b8)\u00b2 = KE\u2080 cos\u00b2 \u03b8\" and verify that the stated data reproduce 15 J. No unstated numerical parameter should be needed.",
    "check": "Independent check: re-derive from \"KE_apex = \u00bd m (u cos \u03b8)\u00b2 = KE\u2080 cos\u00b2 \u03b8\" and verify that the stated data reproduce 15 J. No unstated numerical parameter should be needed.",
    "trapWarning": "Track signs, units, and the reference frame through the calculation; do not import a value or assumption that is absent from the stem.",
    "correctKey": null,
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Physics)"
  },
  {
    "id": "EXAM-18",
    "code": "EXAM-18",
    "title": "ExamSide JEE Main \u00b7 Diagnostic Hub \u00b7 QEXAM-18 \u00b7 Motion in 2D",
    "subjectCode": "PHYS",
    "subject": "Physics",
    "topicCode": "MOTION_IN_2D",
    "topic": "Motion in 2D",
    "subtopic": "CAP-PHY-MOTION-2D",
    "exam": "ExamSide JEE Main",
    "year": "JEE Main 2024 (Online) 8th April Evening Shift",
    "paper": "Diagnostic Hub",
    "questionNumber": "EXAM-18",
    "section": "FAM-PHY-MOTION-2D",
    "markingScheme": "+3 / 0",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Motion in 2D",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "NUMERIC_QUANTITY",
    "stem": "The angle of projection for a projectile to have same horizontal range and maximum height is :",
    "options": [],
    "hints": [
      "[METHOD] Given R = H.",
      "[METHOD] From the 4H Identity: R tan \u03b8 = 4H &rArr; H tan \u03b8 = 4H &rArr; tan \u03b8 = 4.",
      "[METHOD] Angle \u03b8 = arctan(4) \u2248 75.96\u00b0 \u2248 76\u00b0."
    ],
    "steps": [
      "Given R = H.",
      "From the 4H Identity: R tan \u03b8 = 4H &rArr; H tan \u03b8 = 4H &rArr; tan \u03b8 = 4.",
      "Angle \u03b8 = arctan(4) \u2248 75.96\u00b0 \u2248 76\u00b0."
    ],
    "limitingCheck": "Independent check: re-derive from \"R tan \u03b8 = 4H\" and verify that the stated data reproduce tan \u03b8 = 4 (\u03b8 \u2248 76\u00b0). No unstated numerical parameter should be needed.",
    "check": "Independent check: re-derive from \"R tan \u03b8 = 4H\" and verify that the stated data reproduce tan \u03b8 = 4 (\u03b8 \u2248 76\u00b0). No unstated numerical parameter should be needed.",
    "trapWarning": "Resolve the launch velocity into components and check whether the formula's equal-level assumptions actually hold.",
    "correctKey": null,
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Physics)"
  },
  {
    "id": "EXAM-19",
    "code": "EXAM-19",
    "title": "ExamSide JEE Main \u00b7 Diagnostic Hub \u00b7 QEXAM-19 \u00b7 Motion in 2D",
    "subjectCode": "PHYS",
    "subject": "Physics",
    "topicCode": "MOTION_IN_2D",
    "topic": "Motion in 2D",
    "subtopic": "CAP-PHY-MOTION-2D",
    "exam": "ExamSide JEE Main",
    "year": "JEE Main 2024 (Online) 4th April Morning Shift",
    "paper": "Diagnostic Hub",
    "questionNumber": "EXAM-19",
    "section": "FAM-PHY-MOTION-2D",
    "markingScheme": "+3 / 0",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Motion in 2D",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "NUMERIC_QUANTITY",
    "stem": "The co-ordinates of a particle moving in x - y plane are given by : x=2+4t,y=3t+8t2 . The motion of the particle is :",
    "options": [],
    "hints": [
      "[METHOD] x=2+4t gives v_x=4 and a_x=0.",
      "[METHOD] y=3t+8t\u00b2 gives v_y=3+16t and a_y=16.",
      "[METHOD] Therefore a=16 \u0135 m/s\u00b2 is constant; eliminating t gives a parabolic path."
    ],
    "steps": [
      "x=2+4t gives v_x=4 and a_x=0.",
      "y=3t+8t\u00b2 gives v_y=3+16t and a_y=16.",
      "Therefore a=16 \u0135 m/s\u00b2 is constant; eliminating t gives a parabolic path."
    ],
    "limitingCheck": "Independent check: re-derive from \"v = dr/dt and a = d\u00b2r/dt\u00b2.\" and verify that the stated data reproduce Uniformly accelerated planar motion with a = 16 \u0135 m/s\u00b2; the trajectory is parabolic.. No unstated numerical parameter should be needed.",
    "check": "Independent check: re-derive from \"v = dr/dt and a = d\u00b2r/dt\u00b2.\" and verify that the stated data reproduce Uniformly accelerated planar motion with a = 16 \u0135 m/s\u00b2; the trajectory is parabolic.. No unstated numerical parameter should be needed.",
    "trapWarning": "When position is given explicitly as a function of time, differentiate it directly; do not force a memorized constant-acceleration template onto it.",
    "correctKey": null,
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Physics)"
  },
  {
    "id": "EXAM-20",
    "code": "EXAM-20",
    "title": "ExamSide JEE Main \u00b7 Diagnostic Hub \u00b7 QEXAM-20 \u00b7 Motion in 2D",
    "subjectCode": "PHYS",
    "subject": "Physics",
    "topicCode": "MOTION_IN_2D",
    "topic": "Motion in 2D",
    "subtopic": "CAP-PHY-MOTION-2D",
    "exam": "ExamSide JEE Main",
    "year": "JEE Main 2024 (Online) 30th January Evening Shift",
    "paper": "Diagnostic Hub",
    "questionNumber": "EXAM-20",
    "section": "FAM-PHY-MOTION-2D",
    "markingScheme": "+3 / 0",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Motion in 2D",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "NUMERIC_QUANTITY",
    "stem": "Projectiles A and B are thrown at angles of 45\u2218 and 60\u2218 with vertical respectively from top of a 400m high tower. If their ranges and times of flight are same, the ratio of their speeds of projection vA:vB is : [Take g=10ms\u22122 ]",
    "options": [],
    "hints": [
      "[METHOD] Angles are with the vertical. Equal flight time would require v_A cos45\u00b0 = v_B cos60\u00b0, giving v_A/v_B=1/\u221a2.",
      "[METHOD] Equal range together with equal time would require v_A sin45\u00b0 = v_B sin60\u00b0, giving v_A/v_B=\u221a(3/2).",
      "[METHOD] The two required ratios conflict, so the stated conditions cannot simultaneously hold."
    ],
    "steps": [
      "Angles are with the vertical. Equal flight time would require v_A cos45\u00b0 = v_B cos60\u00b0, giving v_A/v_B=1/\u221a2.",
      "Equal range together with equal time would require v_A sin45\u00b0 = v_B sin60\u00b0, giving v_A/v_B=\u221a(3/2).",
      "The two required ratios conflict, so the stated conditions cannot simultaneously hold."
    ],
    "limitingCheck": "Apply both constraints independently. They demand different speed ratios, proving the stem is inconsistent.",
    "check": "Apply both constraints independently. They demand different speed ratios, proving the stem is inconsistent.",
    "trapWarning": "Using only the equal-time condition produces 1:\u221a2, but it ignores the simultaneously stated equal-range condition.",
    "correctKey": null,
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Physics)"
  },
  {
    "id": "EXAM-21",
    "code": "EXAM-21",
    "title": "ExamSide JEE Main \u00b7 Diagnostic Hub \u00b7 QEXAM-21 \u00b7 Motion in 2D",
    "subjectCode": "PHYS",
    "subject": "Physics",
    "topicCode": "MOTION_IN_2D",
    "topic": "Motion in 2D",
    "subtopic": "CAP-PHY-MOTION-2D",
    "exam": "ExamSide JEE Main",
    "year": "JEE Main 2024 (Online) 27th January Morning Shift",
    "paper": "Diagnostic Hub",
    "questionNumber": "EXAM-21",
    "section": "FAM-PHY-MOTION-2D",
    "markingScheme": "+3 / 0",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Motion in 2D",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "NUMERIC_QUANTITY",
    "stem": "Position of an ant ( S in metres) moving in Y - Z plane is given by S=2t2j\u02c6+5k\u02c6 (where t is in second). The magnitude and direction of velocity of the ant at t=1s will be :",
    "options": [],
    "hints": [
      "[METHOD] Differentiate the position vector: v=4t \u0135.",
      "[METHOD] At t=1 s, v=4 \u0135 m/s.",
      "[METHOD] Its magnitude is 4 m/s and its direction is +y."
    ],
    "steps": [
      "Differentiate the position vector: v=4t \u0135.",
      "At t=1 s, v=4 \u0135 m/s.",
      "Its magnitude is 4 m/s and its direction is +y."
    ],
    "limitingCheck": "Independent check: re-derive from \"r = 2t\u00b2 \u0135 + 5 k\u0302; v = dr/dt.\" and verify that the stated data reproduce 4 m/s in the +\u0177 (\u0135) direction. No unstated numerical parameter should be needed.",
    "check": "Independent check: re-derive from \"r = 2t\u00b2 \u0135 + 5 k\u0302; v = dr/dt.\" and verify that the stated data reproduce 4 m/s in the +\u0177 (\u0135) direction. No unstated numerical parameter should be needed.",
    "trapWarning": "When position is given explicitly as a function of time, differentiate it directly; do not force a memorized constant-acceleration template onto it.",
    "correctKey": null,
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Physics)"
  },
  {
    "id": "EXAM-22",
    "code": "EXAM-22",
    "title": "ExamSide JEE Main \u00b7 Diagnostic Hub \u00b7 QEXAM-22 \u00b7 Motion in 2D",
    "subjectCode": "PHYS",
    "subject": "Physics",
    "topicCode": "MOTION_IN_2D",
    "topic": "Motion in 2D",
    "subtopic": "CAP-PHY-MOTION-2D",
    "exam": "ExamSide JEE Main",
    "year": "JEE Main 2023 (Online) 11th April Evening Shift",
    "paper": "Diagnostic Hub",
    "questionNumber": "EXAM-22",
    "section": "FAM-PHY-MOTION-2D",
    "markingScheme": "+3 / 0",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Motion in 2D",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "NUMERIC_QUANTITY",
    "stem": "A projectile is projected at 30\u2218 from horizontal with initial velocity 40ms\u22121 . The velocity of the projectile at t=2s from the start will be : (Given g=10m/s2 )",
    "options": [],
    "hints": [
      "[METHOD] v_x=40cos30\u00b0=20\u221a3 m/s.",
      "[METHOD] v_y=40sin30\u00b0\u221210(2)=20\u221220=0.",
      "[METHOD] So at t=2 s the projectile is at the apex and v=20\u221a3 \u00ee m/s."
    ],
    "steps": [
      "v_x=40cos30\u00b0=20\u221a3 m/s.",
      "v_y=40sin30\u00b0\u221210(2)=20\u221220=0.",
      "So at t=2 s the projectile is at the apex and v=20\u221a3 \u00ee m/s."
    ],
    "limitingCheck": "Independent check: re-derive from \"v_x=u cos\u03b8; v_y=u sin\u03b8\u2212gt.\" and verify that the stated data reproduce 20\u221a3 \u00ee m/s (horizontal). No unstated numerical parameter should be needed.",
    "check": "Independent check: re-derive from \"v_x=u cos\u03b8; v_y=u sin\u03b8\u2212gt.\" and verify that the stated data reproduce 20\u221a3 \u00ee m/s (horizontal). No unstated numerical parameter should be needed.",
    "trapWarning": "Resolve the launch velocity into components and check whether the formula's equal-level assumptions actually hold.",
    "correctKey": null,
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Physics)"
  },
  {
    "id": "EXAM-23",
    "code": "EXAM-23",
    "title": "ExamSide JEE Main \u00b7 Diagnostic Hub \u00b7 QEXAM-23 \u00b7 Motion in 2D",
    "subjectCode": "PHYS",
    "subject": "Physics",
    "topicCode": "MOTION_IN_2D",
    "topic": "Motion in 2D",
    "subtopic": "CAP-PHY-MOTION-2D",
    "exam": "ExamSide JEE Main",
    "year": "JEE Main 2023 (Online) 10th April Evening Shift",
    "paper": "Diagnostic Hub",
    "questionNumber": "EXAM-23",
    "section": "FAM-PHY-MOTION-2D",
    "markingScheme": "+3 / 0",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Motion in 2D",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "NUMERIC_QUANTITY",
    "stem": "Two projectiles are projected at 30\u2218 and 60\u2218 with the horizontal with the same speed. The ratio of the maximum height attained by the two projectiles respectively is:",
    "options": [],
    "hints": [
      "[METHOD] For equal u and g, H\u2083\u2080:H\u2086\u2080=sin\u00b230\u00b0:sin\u00b260\u00b0.",
      "[METHOD] That is (1/4):(3/4).",
      "[METHOD] Therefore H\u2083\u2080:H\u2086\u2080=1:3."
    ],
    "steps": [
      "For equal u and g, H\u2083\u2080:H\u2086\u2080=sin\u00b230\u00b0:sin\u00b260\u00b0.",
      "That is (1/4):(3/4).",
      "Therefore H\u2083\u2080:H\u2086\u2080=1:3."
    ],
    "limitingCheck": "Independent check: re-derive from \"H = u\u00b2 sin\u00b2\u03b8/(2g).\" and verify that the stated data reproduce 1:3. No unstated numerical parameter should be needed.",
    "check": "Independent check: re-derive from \"H = u\u00b2 sin\u00b2\u03b8/(2g).\" and verify that the stated data reproduce 1:3. No unstated numerical parameter should be needed.",
    "trapWarning": "Do not invoke complementary-angle symmetry unless the launches have the same speed and the same launch/landing level; otherwise compare the governing expressions directly.",
    "correctKey": null,
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Physics)"
  },
  {
    "id": "EXAM-24",
    "code": "EXAM-24",
    "title": "ExamSide JEE Main \u00b7 Diagnostic Hub \u00b7 QEXAM-24 \u00b7 Motion in 2D",
    "subjectCode": "PHYS",
    "subject": "Physics",
    "topicCode": "MOTION_IN_2D",
    "topic": "Motion in 2D",
    "subtopic": "CAP-PHY-MOTION-2D",
    "exam": "ExamSide JEE Main",
    "year": "JEE Main 2023 (Online) 10th April Morning Shift",
    "paper": "Diagnostic Hub",
    "questionNumber": "EXAM-24",
    "section": "FAM-PHY-MOTION-2D",
    "markingScheme": "+3 / 0",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Motion in 2D",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "NUMERIC_QUANTITY",
    "stem": "The range of the projectile projected at an angle of 15 \u2218 with horizontal is 50 m. If the projectile is projected with same velocity at an angle of 45 \u2218 with horizontal, then its range will be",
    "options": [],
    "hints": [
      "[METHOD] At 15\u00b0, R\u2081\u2085=(u\u00b2/g)sin30\u00b0=u\u00b2/(2g)=50 m, so u\u00b2/g=100 m.",
      "[METHOD] At 45\u00b0, sin90\u00b0=1.",
      "[METHOD] Hence R\u2084\u2085=u\u00b2/g=100 m."
    ],
    "steps": [
      "At 15\u00b0, R\u2081\u2085=(u\u00b2/g)sin30\u00b0=u\u00b2/(2g)=50 m, so u\u00b2/g=100 m.",
      "At 45\u00b0, sin90\u00b0=1.",
      "Hence R\u2084\u2085=u\u00b2/g=100 m."
    ],
    "limitingCheck": "Independent check: re-derive from \"R = (u\u00b2/g) sin2\u03b8.\" and verify that the stated data reproduce 100 m. No unstated numerical parameter should be needed.",
    "check": "Independent check: re-derive from \"R = (u\u00b2/g) sin2\u03b8.\" and verify that the stated data reproduce 100 m. No unstated numerical parameter should be needed.",
    "trapWarning": "Resolve the launch velocity into components and check whether the formula's equal-level assumptions actually hold.",
    "correctKey": null,
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Physics)"
  },
  {
    "id": "EXAM-25",
    "code": "EXAM-25",
    "title": "ExamSide JEE Main \u00b7 Diagnostic Hub \u00b7 QEXAM-25 \u00b7 Motion in 2D",
    "subjectCode": "PHYS",
    "subject": "Physics",
    "topicCode": "MOTION_IN_2D",
    "topic": "Motion in 2D",
    "subtopic": "CAP-PHY-MOTION-2D",
    "exam": "ExamSide JEE Main",
    "year": "JEE Main 2023 (Online) 8th April Evening Shift",
    "paper": "Diagnostic Hub",
    "questionNumber": "EXAM-25",
    "section": "FAM-PHY-MOTION-2D",
    "markingScheme": "+3 / 0",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Motion in 2D",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "NUMERIC_QUANTITY",
    "stem": "The trajectory of projectile, projected from the ground is given by y=x\u2212x220 . Where x and y are measured in meter. The maximum height attained by the projectile will be.",
    "options": [],
    "hints": [
      "[METHOD] Given trajectory: y = x - x\u00b2/20 = x (1 - x/20).",
      "[METHOD] Compare with factored form y = x tan \u03b8 (1 - x/R):",
      "[METHOD] Coefficient comparison gives tan \u03b8 = 1 (launch angle \u03b8 = 45\u00b0) and Range R = 20 m."
    ],
    "steps": [
      "Given trajectory: y = x - x\u00b2/20 = x (1 - x/20).",
      "Compare with factored form y = x tan \u03b8 (1 - x/R):",
      "Coefficient comparison gives tan \u03b8 = 1 (launch angle \u03b8 = 45\u00b0) and Range R = 20 m.",
      "Using the 4H identity: R tan \u03b8 = 4H &rArr; 20(1) = 4H &rArr; H = 5 m."
    ],
    "limitingCheck": "Independent check: re-derive from \"y = x tan \u03b8 (1 - x/R)\" and verify that the stated data reproduce H = 5 m. No unstated numerical parameter should be needed.",
    "check": "Independent check: re-derive from \"y = x tan \u03b8 (1 - x/R)\" and verify that the stated data reproduce H = 5 m. No unstated numerical parameter should be needed.",
    "trapWarning": "When position is given explicitly as a function of time, differentiate it directly; do not force a memorized constant-acceleration template onto it.",
    "correctKey": null,
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Physics)"
  },
  {
    "id": "EXAM-26",
    "code": "EXAM-26",
    "title": "ExamSide JEE Main \u00b7 Diagnostic Hub \u00b7 QEXAM-26 \u00b7 Motion in 2D",
    "subjectCode": "PHYS",
    "subject": "Physics",
    "topicCode": "MOTION_IN_2D",
    "topic": "Motion in 2D",
    "subtopic": "CAP-PHY-MOTION-2D",
    "exam": "ExamSide JEE Main",
    "year": "JEE Main 2023 (Online) 8th April Morning Shift",
    "paper": "Diagnostic Hub",
    "questionNumber": "EXAM-26",
    "section": "FAM-PHY-MOTION-2D",
    "markingScheme": "+3 / 0",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Motion in 2D",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "NUMERIC_QUANTITY",
    "stem": "Two projectiles A and B are thrown with initial velocities of 40m/s and 60m/s at angles 30\u2218 and 60\u2218 with the horizontal respectively. The ratio of their ranges respectively is (g=10m/s2)",
    "options": [],
    "hints": [
      "[METHOD] R_A\u221d40\u00b2sin60\u00b0.",
      "[METHOD] R_B\u221d60\u00b2sin120\u00b0, and sin120\u00b0=sin60\u00b0.",
      "[METHOD] Thus R_A:R_B=1600:3600=4:9."
    ],
    "steps": [
      "R_A\u221d40\u00b2sin60\u00b0.",
      "R_B\u221d60\u00b2sin120\u00b0, and sin120\u00b0=sin60\u00b0.",
      "Thus R_A:R_B=1600:3600=4:9."
    ],
    "limitingCheck": "Independent check: re-derive from \"R = u\u00b2 sin2\u03b8/g.\" and verify that the stated data reproduce 4:9. No unstated numerical parameter should be needed.",
    "check": "Independent check: re-derive from \"R = u\u00b2 sin2\u03b8/g.\" and verify that the stated data reproduce 4:9. No unstated numerical parameter should be needed.",
    "trapWarning": "Do not invoke complementary-angle symmetry unless the launches have the same speed and the same launch/landing level; otherwise compare the governing expressions directly.",
    "correctKey": null,
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Physics)"
  },
  {
    "id": "EXAM-27",
    "code": "EXAM-27",
    "title": "ExamSide JEE Main \u00b7 Diagnostic Hub \u00b7 QEXAM-27 \u00b7 Motion in 2D",
    "subjectCode": "PHYS",
    "subject": "Physics",
    "topicCode": "MOTION_IN_2D",
    "topic": "Motion in 2D",
    "subtopic": "CAP-PHY-MOTION-2D",
    "exam": "ExamSide JEE Main",
    "year": "JEE Main 2023 (Online) 6th April Morning Shift",
    "paper": "Diagnostic Hub",
    "questionNumber": "EXAM-27",
    "section": "FAM-PHY-MOTION-2D",
    "markingScheme": "+3 / 0",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Motion in 2D",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "NUMERIC_QUANTITY",
    "stem": "Given below are two statements : one is labelled as Assertion A and the other is labelled as Reason R Assertion A : When a body is projected at an angle 45\u2218 , it's range is maximum. Reason R : For maximum range, the value of sin\u20612\u03b8 should be equal to one. In the light of the above statements, choose the correct answer from the options given below:",
    "options": [],
    "hints": [
      "[METHOD] For fixed u and equal launch/landing levels, R is maximized when sin2\u03b8 is maximized.",
      "[METHOD] Its maximum value is 1, so 2\u03b8=90\u00b0 and \u03b8=45\u00b0.",
      "[METHOD] Therefore both statements are true and the Reason correctly explains the Assertion."
    ],
    "steps": [
      "For fixed u and equal launch/landing levels, R is maximized when sin2\u03b8 is maximized.",
      "Its maximum value is 1, so 2\u03b8=90\u00b0 and \u03b8=45\u00b0.",
      "Therefore both statements are true and the Reason correctly explains the Assertion."
    ],
    "limitingCheck": "Independent check: re-derive from \"R = (u\u00b2/g) sin2\u03b8.\" and verify that the stated data reproduce Both Assertion and Reason are true, and Reason is the correct explanation of Assertion.. No unstated numerical parameter should be needed.",
    "check": "Independent check: re-derive from \"R = (u\u00b2/g) sin2\u03b8.\" and verify that the stated data reproduce Both Assertion and Reason are true, and Reason is the correct explanation of Assertion.. No unstated numerical parameter should be needed.",
    "trapWarning": "Resolve the launch velocity into components and check whether the formula's equal-level assumptions actually hold.",
    "correctKey": null,
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Physics)"
  },
  {
    "id": "EXAM-28",
    "code": "EXAM-28",
    "title": "ExamSide JEE Main \u00b7 Diagnostic Hub \u00b7 QEXAM-28 \u00b7 Motion in 2D",
    "subjectCode": "PHYS",
    "subject": "Physics",
    "topicCode": "MOTION_IN_2D",
    "topic": "Motion in 2D",
    "subtopic": "CAP-PHY-MOTION-2D",
    "exam": "ExamSide JEE Main",
    "year": "JEE Main 2023 (Online) 1st February Morning Shift",
    "paper": "Diagnostic Hub",
    "questionNumber": "EXAM-28",
    "section": "FAM-PHY-MOTION-2D",
    "markingScheme": "+3 / 0",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Motion in 2D",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "NUMERIC_QUANTITY",
    "stem": "A child stands on the edge of the cliff 10m above the ground and throws a stone horizontally with an initial speed of 5ms\u22121 . Neglecting the air resistance, the speed with which the stone hits the ground will be ms\u22121 (given, g=10ms\u22122 ).",
    "options": [],
    "hints": [
      "[METHOD] Horizontal velocity remains constant: v_x = 5 m/s.",
      "[METHOD] Vertical velocity acquired by falling through h = 10 m: v_y = \u221a(2gh) = \u221a(2 &times; 10 &times; 10) = \u221a200 = 10\u221a2 m/s.",
      "[METHOD] Striking speed: v = \u221a(v_x\u00b2 + v_y\u00b2) = \u221a(5\u00b2 + 200) = \u221a(25 + 200) = \u221a225 = 15 m/s."
    ],
    "steps": [
      "Horizontal velocity remains constant: v_x = 5 m/s.",
      "Vertical velocity acquired by falling through h = 10 m: v_y = \u221a(2gh) = \u221a(2 &times; 10 &times; 10) = \u221a200 = 10\u221a2 m/s.",
      "Striking speed: v = \u221a(v_x\u00b2 + v_y\u00b2) = \u221a(5\u00b2 + 200) = \u221a(25 + 200) = \u221a225 = 15 m/s."
    ],
    "limitingCheck": "Independent check: re-derive from \"v = \u221a(v_x\u00b2 + v_y\u00b2),  v_y = \u221a(2gh)\" and verify that the stated data reproduce 15 m/s. No unstated numerical parameter should be needed.",
    "check": "Independent check: re-derive from \"v = \u221a(v_x\u00b2 + v_y\u00b2),  v_y = \u221a(2gh)\" and verify that the stated data reproduce 15 m/s. No unstated numerical parameter should be needed.",
    "trapWarning": "Do not use ground-to-ground symmetric projectile formulas when launch and landing heights differ; solve the vertical boundary event first.",
    "correctKey": null,
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Physics)"
  },
  {
    "id": "EXAM-29",
    "code": "EXAM-29",
    "title": "ExamSide JEE Main \u00b7 Diagnostic Hub \u00b7 QEXAM-29 \u00b7 Motion in 2D",
    "subjectCode": "PHYS",
    "subject": "Physics",
    "topicCode": "MOTION_IN_2D",
    "topic": "Motion in 2D",
    "subtopic": "CAP-PHY-MOTION-2D",
    "exam": "ExamSide JEE Main",
    "year": "JEE Main 2023 (Online) 31st January Morning Shift",
    "paper": "Diagnostic Hub",
    "questionNumber": "EXAM-29",
    "section": "FAM-PHY-MOTION-2D",
    "markingScheme": "+3 / 0",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Motion in 2D",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "NUMERIC_QUANTITY",
    "stem": "The initial speed of a projectile fired from ground is u . At the highest point during its motion, the speed of projectile is sqrt32u . The time of flight of the projectile is :",
    "options": [],
    "hints": [
      "[METHOD] The apex speed is (\u221a3/2)u, so cos\u03b8=\u221a3/2 and \u03b8=30\u00b0.",
      "[METHOD] Then sin\u03b8=1/2.",
      "[METHOD] T=2u(1/2)/g=u/g."
    ],
    "steps": [
      "The apex speed is (\u221a3/2)u, so cos\u03b8=\u221a3/2 and \u03b8=30\u00b0.",
      "Then sin\u03b8=1/2.",
      "T=2u(1/2)/g=u/g."
    ],
    "limitingCheck": "Independent check: re-derive from \"At the apex v=u cos\u03b8 and T=2u sin\u03b8/g.\" and verify that the stated data reproduce T = u/g. No unstated numerical parameter should be needed.",
    "check": "Independent check: re-derive from \"At the apex v=u cos\u03b8 and T=2u sin\u03b8/g.\" and verify that the stated data reproduce T = u/g. No unstated numerical parameter should be needed.",
    "trapWarning": "Resolve the launch velocity into components and check whether the formula's equal-level assumptions actually hold.",
    "correctKey": null,
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Physics)"
  },
  {
    "id": "EXAM-30",
    "code": "EXAM-30",
    "title": "ExamSide JEE Main \u00b7 Diagnostic Hub \u00b7 QEXAM-30 \u00b7 Motion in 2D",
    "subjectCode": "PHYS",
    "subject": "Physics",
    "topicCode": "MOTION_IN_2D",
    "topic": "Motion in 2D",
    "subtopic": "CAP-PHY-MOTION-2D",
    "exam": "ExamSide JEE Main",
    "year": "JEE Main 2023 (Online) 25th January Evening Shift",
    "paper": "Diagnostic Hub",
    "questionNumber": "EXAM-30",
    "section": "FAM-PHY-MOTION-2D",
    "markingScheme": "+3 / 0",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Motion in 2D",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "NUMERIC_QUANTITY",
    "stem": "Two objects are projected with same velocity 'u' however at different angles \u03b1 and \u03b2 with the horizontal. If \u03b1+\u03b2=90\u2218 , the ratio of horizontal range of the first object to the 2nd object will be :",
    "options": [],
    "hints": [
      "[METHOD] \u03b2=90\u00b0\u2212\u03b1.",
      "[METHOD] sin2\u03b2=sin(180\u00b0\u22122\u03b1)=sin2\u03b1.",
      "[METHOD] Therefore the two ranges are equal."
    ],
    "steps": [
      "\u03b2=90\u00b0\u2212\u03b1.",
      "sin2\u03b2=sin(180\u00b0\u22122\u03b1)=sin2\u03b1.",
      "Therefore the two ranges are equal."
    ],
    "limitingCheck": "Independent check: re-derive from \"R = (u\u00b2/g) sin2\u03b8.\" and verify that the stated data reproduce 1:1. No unstated numerical parameter should be needed.",
    "check": "Independent check: re-derive from \"R = (u\u00b2/g) sin2\u03b8.\" and verify that the stated data reproduce 1:1. No unstated numerical parameter should be needed.",
    "trapWarning": "Resolve the launch velocity into components and check whether the formula's equal-level assumptions actually hold.",
    "correctKey": null,
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Physics)"
  },
  {
    "id": "EXAM-31",
    "code": "EXAM-31",
    "title": "ExamSide JEE Main \u00b7 Diagnostic Hub \u00b7 QEXAM-31 \u00b7 Motion in 2D",
    "subjectCode": "PHYS",
    "subject": "Physics",
    "topicCode": "MOTION_IN_2D",
    "topic": "Motion in 2D",
    "subtopic": "CAP-PHY-MOTION-2D",
    "exam": "ExamSide JEE Main",
    "year": "JEE Main 2023 (Online) 24th January Morning Shift",
    "paper": "Diagnostic Hub",
    "questionNumber": "EXAM-31",
    "section": "FAM-PHY-MOTION-2D",
    "markingScheme": "+3 / 0",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Motion in 2D",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "NUMERIC_QUANTITY",
    "stem": "The maximum vertical height to which a man can throw a ball is 136 m. The maximum horizontal distance upto which he can throw the same ball is :",
    "options": [],
    "hints": [
      "[METHOD] The maximum vertical throw height is 136 m, so u\u00b2/(2g)=136.",
      "[METHOD] Thus u\u00b2/g=272 m.",
      "[METHOD] The maximum horizontal range with the same speed is R_max=u\u00b2/g=272 m."
    ],
    "steps": [
      "The maximum vertical throw height is 136 m, so u\u00b2/(2g)=136.",
      "Thus u\u00b2/g=272 m.",
      "The maximum horizontal range with the same speed is R_max=u\u00b2/g=272 m."
    ],
    "limitingCheck": "Independent check: re-derive from \"H_vertical=u\u00b2/(2g); R_max=u\u00b2/g.\" and verify that the stated data reproduce 272 m. No unstated numerical parameter should be needed.",
    "check": "Independent check: re-derive from \"H_vertical=u\u00b2/(2g); R_max=u\u00b2/g.\" and verify that the stated data reproduce 272 m. No unstated numerical parameter should be needed.",
    "trapWarning": "Track signs, units, and the reference frame through the calculation; do not import a value or assumption that is absent from the stem.",
    "correctKey": null,
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Physics)"
  },
  {
    "id": "EXAM-32",
    "code": "EXAM-32",
    "title": "ExamSide JEE Main \u00b7 Diagnostic Hub \u00b7 QEXAM-32 \u00b7 Motion in 2D",
    "subjectCode": "PHYS",
    "subject": "Physics",
    "topicCode": "MOTION_IN_2D",
    "topic": "Motion in 2D",
    "subtopic": "CAP-PHY-MOTION-2D",
    "exam": "ExamSide JEE Main",
    "year": "JEE Main 2022 (Online) 28th July Evening Shift",
    "paper": "Diagnostic Hub",
    "questionNumber": "EXAM-32",
    "section": "FAM-PHY-MOTION-2D",
    "markingScheme": "+3 / 0",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Motion in 2D",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "NUMERIC_QUANTITY",
    "stem": "At time t=0 a particle starts travelling from a height 7z\u02c6cm in a plane keeping z coordinate constant. At any instant of time it's position along the x\u02c6 and y\u02c6 directions are defined as 3t and 5t3 respectively. At t = 1s acceleration of the particle will be",
    "options": [],
    "hints": [
      "[METHOD] v=3 \u00ee+15t\u00b2 \u0135 cm/s.",
      "[METHOD] a=30t \u0135 cm/s\u00b2; the x and z accelerations are zero.",
      "[METHOD] At t=1 s, a=30 \u0135 cm/s\u00b2."
    ],
    "steps": [
      "v=3 \u00ee+15t\u00b2 \u0135 cm/s.",
      "a=30t \u0135 cm/s\u00b2; the x and z accelerations are zero.",
      "At t=1 s, a=30 \u0135 cm/s\u00b2."
    ],
    "limitingCheck": "Differentiate y=5t\u00b3 twice: y''=30t, then set t=1 s.",
    "check": "Differentiate y=5t\u00b3 twice: y''=30t, then set t=1 s.",
    "trapWarning": "Treating y=5t\u00b3 as a constant-acceleration displacement law is invalid because a_y=30t depends on time.",
    "correctKey": null,
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Physics)"
  },
  {
    "id": "EXAM-33",
    "code": "EXAM-33",
    "title": "ExamSide JEE Main \u00b7 Diagnostic Hub \u00b7 QEXAM-33 \u00b7 Motion in 2D",
    "subjectCode": "PHYS",
    "subject": "Physics",
    "topicCode": "MOTION_IN_2D",
    "topic": "Motion in 2D",
    "subtopic": "CAP-PHY-MOTION-2D",
    "exam": "ExamSide JEE Main",
    "year": "JEE Main 2022 (Online) 26th July Evening Shift",
    "paper": "Diagnostic Hub",
    "questionNumber": "EXAM-33",
    "section": "FAM-PHY-MOTION-2D",
    "markingScheme": "+3 / 0",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Motion in 2D",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "NUMERIC_QUANTITY",
    "stem": "Two projectiles are thrown with same initial velocity making an angle of 45\u2218 and 30\u2218 with the horizontal respectively. The ratio of their respective ranges will be :",
    "options": [],
    "hints": [
      "[METHOD] For 45\u00b0, R\u2084\u2085\u221dsin90\u00b0=1.",
      "[METHOD] For 30\u00b0, R\u2083\u2080\u221dsin60\u00b0=\u221a3/2.",
      "[METHOD] Thus R\u2084\u2085:R\u2083\u2080=2:\u221a3."
    ],
    "steps": [
      "For 45\u00b0, R\u2084\u2085\u221dsin90\u00b0=1.",
      "For 30\u00b0, R\u2083\u2080\u221dsin60\u00b0=\u221a3/2.",
      "Thus R\u2084\u2085:R\u2083\u2080=2:\u221a3."
    ],
    "limitingCheck": "Independent check: re-derive from \"R = (u\u00b2/g) sin2\u03b8.\" and verify that the stated data reproduce 2:\u221a3. No unstated numerical parameter should be needed.",
    "check": "Independent check: re-derive from \"R = (u\u00b2/g) sin2\u03b8.\" and verify that the stated data reproduce 2:\u221a3. No unstated numerical parameter should be needed.",
    "trapWarning": "Do not invoke complementary-angle symmetry unless the launches have the same speed and the same launch/landing level; otherwise compare the governing expressions directly.",
    "correctKey": null,
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Physics)"
  },
  {
    "id": "EXAM-34",
    "code": "EXAM-34",
    "title": "ExamSide JEE Main \u00b7 Diagnostic Hub \u00b7 QEXAM-34 \u00b7 Motion in 2D",
    "subjectCode": "PHYS",
    "subject": "Physics",
    "topicCode": "MOTION_IN_2D",
    "topic": "Motion in 2D",
    "subtopic": "CAP-PHY-MOTION-2D",
    "exam": "ExamSide JEE Main",
    "year": "JEE Main 2022 (Online) 26th July Morning Shift",
    "paper": "Diagnostic Hub",
    "questionNumber": "EXAM-34",
    "section": "FAM-PHY-MOTION-2D",
    "markingScheme": "+3 / 0",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Motion in 2D",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "NUMERIC_QUANTITY",
    "stem": "Two projectiles thrown at 30\u2218 and 45\u2218 with the horizontal respectively, reach the maximum height in same time. The ratio of their initial velocities is :",
    "options": [],
    "hints": [
      "[METHOD] Equal times to maximum height imply u\u2081sin30\u00b0=u\u2082sin45\u00b0.",
      "[METHOD] Hence u\u2081/u\u2082=sin45\u00b0/sin30\u00b0.",
      "[METHOD] u\u2081:u\u2082=\u221a2:1."
    ],
    "steps": [
      "Equal times to maximum height imply u\u2081sin30\u00b0=u\u2082sin45\u00b0.",
      "Hence u\u2081/u\u2082=sin45\u00b0/sin30\u00b0.",
      "u\u2081:u\u2082=\u221a2:1."
    ],
    "limitingCheck": "Independent check: re-derive from \"t_apex = u sin\u03b8/g.\" and verify that the stated data reproduce \u221a2:1. No unstated numerical parameter should be needed.",
    "check": "Independent check: re-derive from \"t_apex = u sin\u03b8/g.\" and verify that the stated data reproduce \u221a2:1. No unstated numerical parameter should be needed.",
    "trapWarning": "Do not invoke complementary-angle symmetry unless the launches have the same speed and the same launch/landing level; otherwise compare the governing expressions directly.",
    "correctKey": null,
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Physics)"
  },
  {
    "id": "EXAM-35",
    "code": "EXAM-35",
    "title": "ExamSide JEE Main \u00b7 Diagnostic Hub \u00b7 QEXAM-35 \u00b7 Motion in 2D",
    "subjectCode": "PHYS",
    "subject": "Physics",
    "topicCode": "MOTION_IN_2D",
    "topic": "Motion in 2D",
    "subtopic": "CAP-PHY-MOTION-2D",
    "exam": "ExamSide JEE Main",
    "year": "JEE Main 2022 (Online) 25th July Evening Shift",
    "paper": "Diagnostic Hub",
    "questionNumber": "EXAM-35",
    "section": "FAM-PHY-MOTION-2D",
    "markingScheme": "+3 / 0",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Motion in 2D",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "NUMERIC_QUANTITY",
    "stem": "A ball is projected from the ground with a speed 15 ms \u2212 1 at an angle \u03b8 with horizontal so that its range and maximum height are equal, then 'tan \u03b8 ' will be equal to :",
    "options": [],
    "hints": [
      "[METHOD] The condition is R=H.",
      "[METHOD] Substitute into R tan\u03b8=4H to get H tan\u03b8=4H.",
      "[METHOD] For H\u22600, tan\u03b8=4."
    ],
    "steps": [
      "The condition is R=H.",
      "Substitute into R tan\u03b8=4H to get H tan\u03b8=4H.",
      "For H\u22600, tan\u03b8=4."
    ],
    "limitingCheck": "Independent check: re-derive from \"R tan\u03b8 = 4H.\" and verify that the stated data reproduce tan \u03b8 = 4. No unstated numerical parameter should be needed.",
    "check": "Independent check: re-derive from \"R tan\u03b8 = 4H.\" and verify that the stated data reproduce tan \u03b8 = 4. No unstated numerical parameter should be needed.",
    "trapWarning": "Resolve the launch velocity into components and check whether the formula's equal-level assumptions actually hold.",
    "correctKey": null,
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Physics)"
  },
  {
    "id": "EXAM-36",
    "code": "EXAM-36",
    "title": "ExamSide JEE Main \u00b7 Diagnostic Hub \u00b7 QEXAM-36 \u00b7 Motion in 2D",
    "subjectCode": "PHYS",
    "subject": "Physics",
    "topicCode": "MOTION_IN_2D",
    "topic": "Motion in 2D",
    "subtopic": "CAP-PHY-MOTION-2D",
    "exam": "ExamSide JEE Main",
    "year": "JEE Main 2022 (Online) 30th June Morning Shift",
    "paper": "Diagnostic Hub",
    "questionNumber": "EXAM-36",
    "section": "FAM-PHY-MOTION-2D",
    "markingScheme": "+3 / 0",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Motion in 2D",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "NUMERIC_QUANTITY",
    "stem": "At t = 0, truck, starting from rest, moves in the positive x-direction at uniform acceleration of 5 ms \u2212 2 . At t = 20 s, a ball is released from the top of the truck. The ball strikes the ground in 1 s after the release. The velocity of the ball, when it strikes the ground, will be : (Given g = 10 ms \u2212 2 )",
    "options": [],
    "hints": [
      "[METHOD] The truck speed at 20 s is v_x=at=5\u00d720=100 m/s, which becomes the ball's horizontal speed at release.",
      "[METHOD] During the 1 s flight, v_x stays 100 m/s and v_y=\u2212gt=\u221210 m/s.",
      "[METHOD] Therefore v=100 \u00ee\u221210 \u0135 m/s; |v|=10\u221a101\u2248100.5 m/s."
    ],
    "steps": [
      "The truck speed at 20 s is v_x=at=5\u00d720=100 m/s, which becomes the ball's horizontal speed at release.",
      "During the 1 s flight, v_x stays 100 m/s and v_y=\u2212gt=\u221210 m/s.",
      "Therefore v=100 \u00ee\u221210 \u0135 m/s; |v|=10\u221a101\u2248100.5 m/s."
    ],
    "limitingCheck": "Independent check: re-derive from \"At release the ball keeps the truck's instantaneous horizontal velocity; after release a_x=0 and a_y=\u2212g.\" and verify that the stated data reproduce v = (100 \u00ee \u2212 10 \u0135) m/s; speed = 10\u221a101 m/s \u2248 100.5 m/s. No unstated numerical parameter should be needed.",
    "check": "Independent check: re-derive from \"At release the ball keeps the truck's instantaneous horizontal velocity; after release a_x=0 and a_y=\u2212g.\" and verify that the stated data reproduce v = (100 \u00ee \u2212 10 \u0135) m/s; speed = 10\u221a101 m/s \u2248 100.5 m/s. No unstated numerical parameter should be needed.",
    "trapWarning": "Track signs, units, and the reference frame through the calculation; do not import a value or assumption that is absent from the stem.",
    "correctKey": null,
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Physics)"
  },
  {
    "id": "EXAM-37",
    "code": "EXAM-37",
    "title": "ExamSide JEE Main \u00b7 Diagnostic Hub \u00b7 QEXAM-37 \u00b7 Motion in 2D",
    "subjectCode": "PHYS",
    "subject": "Physics",
    "topicCode": "MOTION_IN_2D",
    "topic": "Motion in 2D",
    "subtopic": "CAP-PHY-MOTION-2D",
    "exam": "ExamSide JEE Main",
    "year": "JEE Main 2022 (Online) 30th June Morning Shift",
    "paper": "Diagnostic Hub",
    "questionNumber": "EXAM-37",
    "section": "FAM-PHY-MOTION-2D",
    "markingScheme": "+3 / 0",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Motion in 2D",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "NUMERIC_QUANTITY",
    "stem": "Two projectiles P 1 and P 2 thrown with speed in the ratio sqrt3 : sqrt2 , attain the same height during their motion. If P 2 is thrown at an angle of 60 \u2218 with the horizontal, the angle of projection of P 1 with horizontal will be :",
    "options": [],
    "hints": [
      "[METHOD] Equal heights give u\u2081\u00b2sin\u00b2\u03b8\u2081=u\u2082\u00b2sin\u00b260\u00b0.",
      "[METHOD] With u\u2081:u\u2082=\u221a3:\u221a2, (3/2)sin\u00b2\u03b8\u2081=3/4.",
      "[METHOD] Thus sin\u00b2\u03b8\u2081=1/2 and \u03b8\u2081=45\u00b0."
    ],
    "steps": [
      "Equal heights give u\u2081\u00b2sin\u00b2\u03b8\u2081=u\u2082\u00b2sin\u00b260\u00b0.",
      "With u\u2081:u\u2082=\u221a3:\u221a2, (3/2)sin\u00b2\u03b8\u2081=3/4.",
      "Thus sin\u00b2\u03b8\u2081=1/2 and \u03b8\u2081=45\u00b0."
    ],
    "limitingCheck": "Independent check: re-derive from \"H = u\u00b2 sin\u00b2\u03b8/(2g).\" and verify that the stated data reproduce 45\u00b0. No unstated numerical parameter should be needed.",
    "check": "Independent check: re-derive from \"H = u\u00b2 sin\u00b2\u03b8/(2g).\" and verify that the stated data reproduce 45\u00b0. No unstated numerical parameter should be needed.",
    "trapWarning": "Do not invoke complementary-angle symmetry unless the launches have the same speed and the same launch/landing level; otherwise compare the governing expressions directly.",
    "correctKey": null,
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Physics)"
  },
  {
    "id": "EXAM-38",
    "code": "EXAM-38",
    "title": "ExamSide JEE Main \u00b7 Diagnostic Hub \u00b7 QEXAM-38 \u00b7 Motion in 2D",
    "subjectCode": "PHYS",
    "subject": "Physics",
    "topicCode": "MOTION_IN_2D",
    "topic": "Motion in 2D",
    "subtopic": "CAP-PHY-MOTION-2D",
    "exam": "ExamSide JEE Main",
    "year": "JEE Main 2022 (Online) 29th June Evening Shift",
    "paper": "Diagnostic Hub",
    "questionNumber": "EXAM-38",
    "section": "FAM-PHY-MOTION-2D",
    "markingScheme": "+3 / 0",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Motion in 2D",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "NUMERIC_QUANTITY",
    "stem": "A person can throw a ball upto a maximum range of 100 m. How high above the ground he can throw the same ball?",
    "options": [],
    "hints": [
      "[METHOD] R_max=100 m implies u\u00b2/g=100 m.",
      "[METHOD] A vertical throw with the same speed reaches u\u00b2/(2g).",
      "[METHOD] Hence the greatest height is 50 m."
    ],
    "steps": [
      "R_max=100 m implies u\u00b2/g=100 m.",
      "A vertical throw with the same speed reaches u\u00b2/(2g).",
      "Hence the greatest height is 50 m."
    ],
    "limitingCheck": "Independent check: re-derive from \"R_max=u\u00b2/g and H_vertical=u\u00b2/(2g).\" and verify that the stated data reproduce 50 m. No unstated numerical parameter should be needed.",
    "check": "Independent check: re-derive from \"R_max=u\u00b2/g and H_vertical=u\u00b2/(2g).\" and verify that the stated data reproduce 50 m. No unstated numerical parameter should be needed.",
    "trapWarning": "Resolve the launch velocity into components and check whether the formula's equal-level assumptions actually hold.",
    "correctKey": null,
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Physics)"
  },
  {
    "id": "EXAM-39",
    "code": "EXAM-39",
    "title": "ExamSide JEE Main \u00b7 Diagnostic Hub \u00b7 QEXAM-39 \u00b7 Motion in 2D",
    "subjectCode": "PHYS",
    "subject": "Physics",
    "topicCode": "MOTION_IN_2D",
    "topic": "Motion in 2D",
    "subtopic": "CAP-PHY-MOTION-2D",
    "exam": "ExamSide JEE Main",
    "year": "JEE Main 2022 (Online) 27th June Morning Shift",
    "paper": "Diagnostic Hub",
    "questionNumber": "EXAM-39",
    "section": "FAM-PHY-MOTION-2D",
    "markingScheme": "+3 / 0",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Motion in 2D",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "NUMERIC_QUANTITY",
    "stem": "A projectile is launched at an angle ' \u03b1 ' with the horizontal with a velocity 20 ms \u2212 1 . After 10 s, its inclination with horizontal is ' \u03b2 '. The value of tan \u03b2 will be : (g = 10 ms \u2212 2 ).",
    "options": [],
    "hints": [
      "[METHOD] v_x=20cos\u03b1 remains constant.",
      "[METHOD] After 10 s, v_y=20sin\u03b1\u221210\u00d710=20(sin\u03b1\u22125).",
      "[METHOD] Therefore tan\u03b2=(sin\u03b1\u22125)/cos\u03b1."
    ],
    "steps": [
      "v_x=20cos\u03b1 remains constant.",
      "After 10 s, v_y=20sin\u03b1\u221210\u00d710=20(sin\u03b1\u22125).",
      "Therefore tan\u03b2=(sin\u03b1\u22125)/cos\u03b1."
    ],
    "limitingCheck": "Independent check: re-derive from \"tan\u03b2 = v_y/v_x = (u sin\u03b1\u2212gt)/(u cos\u03b1).\" and verify that the stated data reproduce tan \u03b2 = (sin \u03b1 \u2212 5)/cos \u03b1. No unstated numerical parameter should be needed.",
    "check": "Independent check: re-derive from \"tan\u03b2 = v_y/v_x = (u sin\u03b1\u2212gt)/(u cos\u03b1).\" and verify that the stated data reproduce tan \u03b2 = (sin \u03b1 \u2212 5)/cos \u03b1. No unstated numerical parameter should be needed.",
    "trapWarning": "Resolve the launch velocity into components and check whether the formula's equal-level assumptions actually hold.",
    "correctKey": null,
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Physics)"
  },
  {
    "id": "EXAM-40",
    "code": "EXAM-40",
    "title": "ExamSide JEE Main \u00b7 Diagnostic Hub \u00b7 QEXAM-40 \u00b7 Motion in 2D",
    "subjectCode": "PHYS",
    "subject": "Physics",
    "topicCode": "MOTION_IN_2D",
    "topic": "Motion in 2D",
    "subtopic": "CAP-PHY-MOTION-2D",
    "exam": "ExamSide JEE Main",
    "year": "JEE Main 2022 (Online) 27th June Morning Shift",
    "paper": "Diagnostic Hub",
    "questionNumber": "EXAM-40",
    "section": "FAM-PHY-MOTION-2D",
    "markingScheme": "+3 / 0",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Motion in 2D",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "NUMERIC_QUANTITY",
    "stem": "A girl standing on road holds her umbrella at 45 \u2218 with the vertical to keep the rain away. If she starts running without umbrella with a speed of 15 sqrt2 kmh \u2212 1 , the rain drops hit her head vertically. The speed of rain drops with respect to the moving girl is :",
    "options": [],
    "hints": [
      "[METHOD] When standing, girl holds umbrella at 45\u00b0 with vertical &rArr; tan 45\u00b0 = 1 &rArr; v_rx = v_ry (rain falls obliquely).",
      "[METHOD] When running at v_g = 15\u221a2 km/h, rain hits vertically &rArr; relative horizontal velocity is zero:",
      "[METHOD] v_rx - v_g = 0 &rArr; v_rx = 15\u221a2 km/h."
    ],
    "steps": [
      "When standing, girl holds umbrella at 45\u00b0 with vertical &rArr; tan 45\u00b0 = 1 &rArr; v_rx = v_ry (rain falls obliquely).",
      "When running at v_g = 15\u221a2 km/h, rain hits vertically &rArr; relative horizontal velocity is zero:",
      "v_rx - v_g = 0 &rArr; v_rx = 15\u221a2 km/h.",
      "Since v_ry = v_rx, vertical rain speed is also v_ry = 15\u221a2 km/h.",
      "Relative to the moving girl, rain velocity has zero horizontal component and vertical component -15\u221a2 \u0135 km/h.",
      "Therefore, speed of rain drops relative to moving girl is 15\u221a2 km/h."
    ],
    "limitingCheck": "Independent check: re-derive from \"v_rx = v_ry,  v_m = v_rx &rArr; v_rel = v_ry\" and verify that the stated data reproduce 15\u221a2 km/h (\u2248 21.2 km/h). No unstated numerical parameter should be needed.",
    "check": "Independent check: re-derive from \"v_rx = v_ry,  v_m = v_rx &rArr; v_rel = v_ry\" and verify that the stated data reproduce 15\u221a2 km/h (\u2248 21.2 km/h). No unstated numerical parameter should be needed.",
    "trapWarning": "Keep a frame label on every velocity before adding or subtracting vectors; dropping the frame is the usual sign/direction error.",
    "correctKey": null,
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Physics)"
  },
  {
    "id": "EXAM-41",
    "code": "EXAM-41",
    "title": "ExamSide JEE Main \u00b7 Diagnostic Hub \u00b7 QEXAM-41 \u00b7 Motion in 2D",
    "subjectCode": "PHYS",
    "subject": "Physics",
    "topicCode": "MOTION_IN_2D",
    "topic": "Motion in 2D",
    "subtopic": "CAP-PHY-MOTION-2D",
    "exam": "ExamSide JEE Main",
    "year": "JEE Main 2022 (Online) 25th June Evening Shift",
    "paper": "Diagnostic Hub",
    "questionNumber": "EXAM-41",
    "section": "FAM-PHY-MOTION-2D",
    "markingScheme": "+3 / 0",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Motion in 2D",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "NUMERIC_QUANTITY",
    "stem": "Given below are two statements. One is labelled as Assertion A and the other is labelled as Reason R. Assertion A : Two identical balls A and B thrown with same velocity 'u' at two different angles with horizontal attained the same range R. IF A and B reached the maximum height h 1 and h 2 respectively, then R=4sqrth1h2 Reason R : Product of said heights. h1h2=(u2sin2\u03b82g).(u2cos2\u03b82g) Choose the correct answer :",
    "options": [],
    "hints": [
      "[METHOD] Heights at complementary angles: H\u2081 = (u\u00b2 sin\u00b2 \u03b8) / (2g), H\u2082 = (u\u00b2 cos\u00b2 \u03b8) / (2g).",
      "[METHOD] Product: H\u2081 H\u2082 = (u\u2074 sin\u00b2 \u03b8 cos\u00b2 \u03b8) / (4 g\u00b2).",
      "[METHOD] Take square root: \u221a(H\u2081 H\u2082) = (u\u00b2 sin \u03b8 cos \u03b8) / (2g) = R / 4."
    ],
    "steps": [
      "Heights at complementary angles: H\u2081 = (u\u00b2 sin\u00b2 \u03b8) / (2g), H\u2082 = (u\u00b2 cos\u00b2 \u03b8) / (2g).",
      "Product: H\u2081 H\u2082 = (u\u2074 sin\u00b2 \u03b8 cos\u00b2 \u03b8) / (4 g\u00b2).",
      "Take square root: \u221a(H\u2081 H\u2082) = (u\u00b2 sin \u03b8 cos \u03b8) / (2g) = R / 4.",
      "Multiply by 4: 4 \u221a(H\u2081 H\u2082) = R. Both Assertion and Reason are true and correct."
    ],
    "limitingCheck": "Independent check: re-derive from \"R = 4 \u221a(H\u2081 H\u2082)\" and verify that the stated data reproduce Assertion and Reason are both true. No unstated numerical parameter should be needed.",
    "check": "Independent check: re-derive from \"R = 4 \u221a(H\u2081 H\u2082)\" and verify that the stated data reproduce Assertion and Reason are both true. No unstated numerical parameter should be needed.",
    "trapWarning": "Do not invoke complementary-angle symmetry unless the launches have the same speed and the same launch/landing level; otherwise compare the governing expressions directly.",
    "correctKey": null,
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Physics)"
  },
  {
    "id": "EXAM-42",
    "code": "EXAM-42",
    "title": "ExamSide JEE Main \u00b7 Diagnostic Hub \u00b7 QEXAM-42 \u00b7 Motion in 2D",
    "subjectCode": "PHYS",
    "subject": "Physics",
    "topicCode": "MOTION_IN_2D",
    "topic": "Motion in 2D",
    "subtopic": "CAP-PHY-MOTION-2D",
    "exam": "ExamSide JEE Main",
    "year": "JEE Main 2022 (Online) 24th June Morning Shift",
    "paper": "Diagnostic Hub",
    "questionNumber": "EXAM-42",
    "section": "FAM-PHY-MOTION-2D",
    "markingScheme": "+3 / 0",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Motion in 2D",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "NUMERIC_QUANTITY",
    "stem": "A projectile is projected with velocity of 25 m/s at an angle \u03b8 with the horizontal. After t seconds its inclination with horizontal becomes zero. If R represents horizontal range of the projectile, the value of \u03b8 will be : [use g = 10 m/s 2 ]",
    "options": [],
    "hints": [
      "[METHOD] Inclination zero means v_y=0, so the stated t is the time to the apex.",
      "[METHOD] From R=2u cos\u03b8\u00b7t, u cos\u03b8=R/(2t); from the apex condition u sin\u03b8=gt.",
      "[METHOD] Divide the two equations: tan\u03b8=2gt\u00b2/R=20t\u00b2/R."
    ],
    "steps": [
      "Inclination zero means v_y=0, so the stated t is the time to the apex.",
      "From R=2u cos\u03b8\u00b7t, u cos\u03b8=R/(2t); from the apex condition u sin\u03b8=gt.",
      "Divide the two equations: tan\u03b8=2gt\u00b2/R=20t\u00b2/R."
    ],
    "limitingCheck": "Independent check: re-derive from \"At the apex t=u sin\u03b8/g and R=2u cos\u03b8\u00b7t.\" and verify that the stated data reproduce \u03b8 = tan\u207b\u00b9(20t\u00b2/R). No unstated numerical parameter should be needed.",
    "check": "Independent check: re-derive from \"At the apex t=u sin\u03b8/g and R=2u cos\u03b8\u00b7t.\" and verify that the stated data reproduce \u03b8 = tan\u207b\u00b9(20t\u00b2/R). No unstated numerical parameter should be needed.",
    "trapWarning": "Resolve the launch velocity into components and check whether the formula's equal-level assumptions actually hold.",
    "correctKey": null,
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Physics)"
  },
  {
    "id": "EXAM-43",
    "code": "EXAM-43",
    "title": "ExamSide JEE Main \u00b7 Diagnostic Hub \u00b7 QEXAM-43 \u00b7 Motion in 2D",
    "subjectCode": "PHYS",
    "subject": "Physics",
    "topicCode": "MOTION_IN_2D",
    "topic": "Motion in 2D",
    "subtopic": "CAP-PHY-MOTION-2D",
    "exam": "ExamSide JEE Main",
    "year": "JEE Main 2021 (Online) 1st September Evening Shift",
    "paper": "Diagnostic Hub",
    "questionNumber": "EXAM-43",
    "section": "FAM-PHY-MOTION-2D",
    "markingScheme": "+3 / 0",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Motion in 2D",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "NUMERIC_QUANTITY",
    "stem": "The ranges and heights for two projectiles projected with the same initial velocity at angles 42 \u2218 and 48 \u2218 with the horizontal are R 1 , R 2 and H 1 , H 2 respectively. Choose the correct option :",
    "options": [],
    "hints": [
      "[METHOD] Check sum of angles: 42\u00b0 + 48\u00b0 = 90\u00b0 (complementary angles).",
      "[METHOD] Because sin(2 &times; 42\u00b0) = sin(84\u00b0) and sin(2 &times; 48\u00b0) = sin(96\u00b0) = sin(84\u00b0), ranges are identical: R\u2081 = R\u2082.",
      "[METHOD] Maximum height H \u221d sin\u00b2 \u03b8. Since 48\u00b0 > 42\u00b0, sin 48\u00b0 > sin 42\u00b0 &rArr; H\u2082 > H\u2081."
    ],
    "steps": [
      "Check sum of angles: 42\u00b0 + 48\u00b0 = 90\u00b0 (complementary angles).",
      "Because sin(2 &times; 42\u00b0) = sin(84\u00b0) and sin(2 &times; 48\u00b0) = sin(96\u00b0) = sin(84\u00b0), ranges are identical: R\u2081 = R\u2082.",
      "Maximum height H \u221d sin\u00b2 \u03b8. Since 48\u00b0 > 42\u00b0, sin 48\u00b0 > sin 42\u00b0 &rArr; H\u2082 > H\u2081."
    ],
    "limitingCheck": "Independent check: re-derive from \"\u03b8\u2081 + \u03b8\u2082 = 90\u00b0 &rArr; R\u2081 = R\u2082\" and verify that the stated data reproduce R\u2081 = R\u2082 and H\u2082 > H\u2081. No unstated numerical parameter should be needed.",
    "check": "Independent check: re-derive from \"\u03b8\u2081 + \u03b8\u2082 = 90\u00b0 &rArr; R\u2081 = R\u2082\" and verify that the stated data reproduce R\u2081 = R\u2082 and H\u2082 > H\u2081. No unstated numerical parameter should be needed.",
    "trapWarning": "Do not invoke complementary-angle symmetry unless the launches have the same speed and the same launch/landing level; otherwise compare the governing expressions directly.",
    "correctKey": null,
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Physics)"
  },
  {
    "id": "EXAM-44",
    "code": "EXAM-44",
    "title": "ExamSide JEE Main \u00b7 Diagnostic Hub \u00b7 QEXAM-44 \u00b7 Motion in 2D",
    "subjectCode": "PHYS",
    "subject": "Physics",
    "topicCode": "MOTION_IN_2D",
    "topic": "Motion in 2D",
    "subtopic": "CAP-PHY-MOTION-2D",
    "exam": "ExamSide JEE Main",
    "year": "JEE Main 2021 (Online) 31st August Morning Shift",
    "paper": "Diagnostic Hub",
    "questionNumber": "EXAM-44",
    "section": "FAM-PHY-MOTION-2D",
    "markingScheme": "+3 / 0",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Motion in 2D",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "NUMERIC_QUANTITY",
    "stem": "A helicopter is flying horizontally with a speed 'v' at an altitude 'h' has to drop a food packet for a man on the ground. What is the distance of helicopter from the man when the food packet is dropped?",
    "options": [],
    "hints": [
      "[METHOD] The packet is released with zero initial vertical speed, so h=\u00bdgt\u00b2.",
      "[METHOD] Thus t=\u221a(2h/g).",
      "[METHOD] The helicopter and packet share horizontal speed v at release, so the required lead distance is d=v\u221a(2h/g)."
    ],
    "steps": [
      "The packet is released with zero initial vertical speed, so h=\u00bdgt\u00b2.",
      "Thus t=\u221a(2h/g).",
      "The helicopter and packet share horizontal speed v at release, so the required lead distance is d=v\u221a(2h/g)."
    ],
    "limitingCheck": "Independent check: re-derive from \"t_fall=\u221a(2h/g); horizontal lead distance d=vt_fall.\" and verify that the stated data reproduce d = v\u221a(2h/g). No unstated numerical parameter should be needed.",
    "check": "Independent check: re-derive from \"t_fall=\u221a(2h/g); horizontal lead distance d=vt_fall.\" and verify that the stated data reproduce d = v\u221a(2h/g). No unstated numerical parameter should be needed.",
    "trapWarning": "Do not use ground-to-ground symmetric projectile formulas when launch and landing heights differ; solve the vertical boundary event first.",
    "correctKey": null,
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Physics)"
  },
  {
    "id": "EXAM-45",
    "code": "EXAM-45",
    "title": "ExamSide JEE Main \u00b7 Diagnostic Hub \u00b7 QEXAM-45 \u00b7 Motion in 2D",
    "subjectCode": "PHYS",
    "subject": "Physics",
    "topicCode": "MOTION_IN_2D",
    "topic": "Motion in 2D",
    "subtopic": "CAP-PHY-MOTION-2D",
    "exam": "ExamSide JEE Main",
    "year": "JEE Main 2021 (Online) 27th August Evening Shift",
    "paper": "Diagnostic Hub",
    "questionNumber": "EXAM-45",
    "section": "FAM-PHY-MOTION-2D",
    "markingScheme": "+3 / 0",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Motion in 2D",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "NUMERIC_QUANTITY",
    "stem": "A player kicks a football with an initial speed of 25 ms \u2212 1 at an angle of 45 \u2218 from the ground. What are the maximum height and the time taken by the football to reach at the highest point during motion ? (Take g = 10 ms \u2212 2 )",
    "options": [],
    "hints": [
      "[METHOD] u_y=25sin45\u00b0=25/\u221a2 m/s.",
      "[METHOD] H=(25\u00b2\u00d71/2)/(2\u00d710)=15.625 m.",
      "[METHOD] t_apex=(25/\u221a2)/10=5/(2\u221a2)\u22481.77 s."
    ],
    "steps": [
      "u_y=25sin45\u00b0=25/\u221a2 m/s.",
      "H=(25\u00b2\u00d71/2)/(2\u00d710)=15.625 m.",
      "t_apex=(25/\u221a2)/10=5/(2\u221a2)\u22481.77 s."
    ],
    "limitingCheck": "Independent check: re-derive from \"H=u\u00b2sin\u00b2\u03b8/(2g); t_apex=u sin\u03b8/g.\" and verify that the stated data reproduce H = 15.625 m; t_apex \u2248 1.77 s. No unstated numerical parameter should be needed.",
    "check": "Independent check: re-derive from \"H=u\u00b2sin\u00b2\u03b8/(2g); t_apex=u sin\u03b8/g.\" and verify that the stated data reproduce H = 15.625 m; t_apex \u2248 1.77 s. No unstated numerical parameter should be needed.",
    "trapWarning": "Resolve the launch velocity into components and check whether the formula's equal-level assumptions actually hold.",
    "correctKey": null,
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Physics)"
  },
  {
    "id": "EXAM-46",
    "code": "EXAM-46",
    "title": "ExamSide JEE Main \u00b7 Diagnostic Hub \u00b7 QEXAM-46 \u00b7 Motion in 2D",
    "subjectCode": "PHYS",
    "subject": "Physics",
    "topicCode": "MOTION_IN_2D",
    "topic": "Motion in 2D",
    "subtopic": "CAP-PHY-MOTION-2D",
    "exam": "ExamSide JEE Main",
    "year": "JEE Main 2021 (Online) 26th August Evening Shift",
    "paper": "Diagnostic Hub",
    "questionNumber": "EXAM-46",
    "section": "FAM-PHY-MOTION-2D",
    "markingScheme": "+3 / 0",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Motion in 2D",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "NUMERIC_QUANTITY",
    "stem": "A bomb is dropped by fighter plane flying horizontally. To an observer sitting in the plane, the trajectory of the bomb is a :",
    "options": [],
    "hints": [
      "[METHOD] At release, the bomb and plane have the same horizontal velocity.",
      "[METHOD] In the plane frame the bomb therefore has zero horizontal relative velocity.",
      "[METHOD] Gravity changes only its vertical relative motion, so the observed path is a vertical straight line."
    ],
    "steps": [
      "At release, the bomb and plane have the same horizontal velocity.",
      "In the plane frame the bomb therefore has zero horizontal relative velocity.",
      "Gravity changes only its vertical relative motion, so the observed path is a vertical straight line."
    ],
    "limitingCheck": "Independent check: re-derive from \"v_bomb/plane = v_bomb/ground \u2212 v_plane/ground.\" and verify that the stated data reproduce A vertical straight line. No unstated numerical parameter should be needed.",
    "check": "Independent check: re-derive from \"v_bomb/plane = v_bomb/ground \u2212 v_plane/ground.\" and verify that the stated data reproduce A vertical straight line. No unstated numerical parameter should be needed.",
    "trapWarning": "Do not use ground-to-ground symmetric projectile formulas when launch and landing heights differ; solve the vertical boundary event first.",
    "correctKey": null,
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Physics)"
  },
  {
    "id": "EXAM-47",
    "code": "EXAM-47",
    "title": "ExamSide JEE Main \u00b7 Diagnostic Hub \u00b7 QEXAM-47 \u00b7 Motion in 2D",
    "subjectCode": "PHYS",
    "subject": "Physics",
    "topicCode": "MOTION_IN_2D",
    "topic": "Motion in 2D",
    "subtopic": "CAP-PHY-MOTION-2D",
    "exam": "ExamSide JEE Main",
    "year": "JEE Main 2021 (Online) 20th July Morning Shift",
    "paper": "Diagnostic Hub",
    "questionNumber": "EXAM-47",
    "section": "FAM-PHY-MOTION-2D",
    "markingScheme": "+3 / 0",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Motion in 2D",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "NUMERIC_QUANTITY",
    "stem": "A butterfly is flying with a velocity 4sqrt2 m/s in North-East direction. Wind is slowly blowing at 1 m/s from North to South. The resultant displacement of the butterfly in 3 seconds is :",
    "options": [],
    "hints": [
      "[METHOD] 4\u221a2 m/s toward North-East has components 4 \u00ee+4 \u0135 m/s.",
      "[METHOD] Wind from North to South is \u22121 \u0135 m/s, so v_ground=4 \u00ee+3 \u0135 m/s.",
      "[METHOD] In 3 s, displacement=12 \u00ee+9 \u0135 m; magnitude=15 m."
    ],
    "steps": [
      "4\u221a2 m/s toward North-East has components 4 \u00ee+4 \u0135 m/s.",
      "Wind from North to South is \u22121 \u0135 m/s, so v_ground=4 \u00ee+3 \u0135 m/s.",
      "In 3 s, displacement=12 \u00ee+9 \u0135 m; magnitude=15 m."
    ],
    "limitingCheck": "Independent check: re-derive from \"v_ground = v_butterfly/air + v_wind.\" and verify that the stated data reproduce 12 \u00ee + 9 \u0135 m, with magnitude 15 m (36.87\u00b0 North of East). No unstated numerical parameter should be needed.",
    "check": "Independent check: re-derive from \"v_ground = v_butterfly/air + v_wind.\" and verify that the stated data reproduce 12 \u00ee + 9 \u0135 m, with magnitude 15 m (36.87\u00b0 North of East). No unstated numerical parameter should be needed.",
    "trapWarning": "Keep a frame label on every velocity before adding or subtracting vectors; dropping the frame is the usual sign/direction error.",
    "correctKey": null,
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Physics)"
  },
  {
    "id": "EXAM-48",
    "code": "EXAM-48",
    "title": "ExamSide JEE Main \u00b7 Diagnostic Hub \u00b7 QEXAM-48 \u00b7 Motion in 2D",
    "subjectCode": "PHYS",
    "subject": "Physics",
    "topicCode": "MOTION_IN_2D",
    "topic": "Motion in 2D",
    "subtopic": "CAP-PHY-MOTION-2D",
    "exam": "ExamSide JEE Main",
    "year": "JEE Main 2021 (Online) 16th March Evening Shift",
    "paper": "Diagnostic Hub",
    "questionNumber": "EXAM-48",
    "section": "FAM-PHY-MOTION-2D",
    "markingScheme": "+3 / 0",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Motion in 2D",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "NUMERIC_QUANTITY",
    "stem": "A mosquito is moving with a velocity v\u2192=0.5t2i\u02c6+3tj\u02c6+9k\u02c6 m/s and accelerating in uniform conditions. What will be the direction of mosquito after 2 s?",
    "options": [],
    "hints": [
      "[METHOD] v(2)=0.5(2\u00b2)\u00ee+3(2)\u0135+9k\u0302=2\u00ee+6\u0135+9k\u0302 m/s.",
      "[METHOD] |v|=\u221a(4+36+81)=11 m/s.",
      "[METHOD] The direction unit vector is (2\u00ee+6\u0135+9k\u0302)/11."
    ],
    "steps": [
      "v(2)=0.5(2\u00b2)\u00ee+3(2)\u0135+9k\u0302=2\u00ee+6\u0135+9k\u0302 m/s.",
      "|v|=\u221a(4+36+81)=11 m/s.",
      "The direction unit vector is (2\u00ee+6\u0135+9k\u0302)/11."
    ],
    "limitingCheck": "Independent check: re-derive from \"Use the given velocity directly at t=2 s and normalize it for direction.\" and verify that the stated data reproduce Direction = (2\u00ee + 6\u0135 + 9k\u0302)/11; direction cosines are 2/11, 6/11, 9/11. No unstated numerical parameter should be needed.",
    "check": "Independent check: re-derive from \"Use the given velocity directly at t=2 s and normalize it for direction.\" and verify that the stated data reproduce Direction = (2\u00ee + 6\u0135 + 9k\u0302)/11; direction cosines are 2/11, 6/11, 9/11. No unstated numerical parameter should be needed.",
    "trapWarning": "Track signs, units, and the reference frame through the calculation; do not import a value or assumption that is absent from the stem.",
    "correctKey": null,
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Physics)"
  },
  {
    "id": "EXAM-49",
    "code": "EXAM-49",
    "title": "ExamSide JEE Main \u00b7 Diagnostic Hub \u00b7 QEXAM-49 \u00b7 Motion in 2D",
    "subjectCode": "PHYS",
    "subject": "Physics",
    "topicCode": "MOTION_IN_2D",
    "topic": "Motion in 2D",
    "subtopic": "CAP-PHY-MOTION-2D",
    "exam": "ExamSide JEE Main",
    "year": "JEE Main 2021 (Online) 26th February Evening Shift",
    "paper": "Diagnostic Hub",
    "questionNumber": "EXAM-49",
    "section": "FAM-PHY-MOTION-2D",
    "markingScheme": "+3 / 0",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Motion in 2D",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "NUMERIC_QUANTITY",
    "stem": "The trajectory of a projectile in a vertical plane is y = \u03b1 x \u2212 \u03b2 x 2 , where \u03b1 and \u03b2 are constants and x & y are respectively the horizontal and vertical distances of the projectile from the point of projection. The angle of projection \u03b8 and the maximum height attained H are respectively given by :",
    "options": [],
    "hints": [
      "[METHOD] Factor given equation: y = \u03b1 x (1 - x / (\u03b1/\u03b2)).",
      "[METHOD] Compare with y = x tan \u03b8 (1 - x/R):",
      "[METHOD] Angle of projection: tan \u03b8 = \u03b1 &rArr; \u03b8 = arctan(\u03b1)."
    ],
    "steps": [
      "Factor given equation: y = \u03b1 x (1 - x / (\u03b1/\u03b2)).",
      "Compare with y = x tan \u03b8 (1 - x/R):",
      "Angle of projection: tan \u03b8 = \u03b1 &rArr; \u03b8 = arctan(\u03b1).",
      "Horizontal range: R = \u03b1 / \u03b2.",
      "Maximum height from 4H identity: 4H = R tan \u03b8 = (\u03b1/\u03b2)(\u03b1) = \u03b1\u00b2/\u03b2 &rArr; H = \u03b1\u00b2 / (4\u03b2)."
    ],
    "limitingCheck": "Independent check: re-derive from \"y = x (\u03b1 - \u03b2 x) = \u03b1 x (1 - (\u03b2/\u03b1) x)\" and verify that the stated data reproduce \u03b8 = arctan(\u03b1), H = \u03b1\u00b2 / (4\u03b2). No unstated numerical parameter should be needed.",
    "check": "Independent check: re-derive from \"y = x (\u03b1 - \u03b2 x) = \u03b1 x (1 - (\u03b2/\u03b1) x)\" and verify that the stated data reproduce \u03b8 = arctan(\u03b1), H = \u03b1\u00b2 / (4\u03b2). No unstated numerical parameter should be needed.",
    "trapWarning": "Resolve the launch velocity into components and check whether the formula's equal-level assumptions actually hold.",
    "correctKey": null,
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Physics)"
  },
  {
    "id": "EXAM-50",
    "code": "EXAM-50",
    "title": "ExamSide JEE Main \u00b7 Diagnostic Hub \u00b7 QEXAM-50 \u00b7 Motion in 2D",
    "subjectCode": "PHYS",
    "subject": "Physics",
    "topicCode": "MOTION_IN_2D",
    "topic": "Motion in 2D",
    "subtopic": "CAP-PHY-MOTION-2D",
    "exam": "ExamSide JEE Main",
    "year": "JEE Main 2020 (Online) 6th September Evening Slot",
    "paper": "Diagnostic Hub",
    "questionNumber": "EXAM-50",
    "section": "FAM-PHY-MOTION-2D",
    "markingScheme": "+3 / 0",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Motion in 2D",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "NUMERIC_QUANTITY",
    "stem": "When a car is at rest, its driver sees rain drops falling on it vertically. When driving the car with speed v, he sees that rain drops are coming at an angle 60\u00b0 from the horizontal. On further increasing the speed of the car to (1 + \u03b2 )v, this angle changes to 45 o . The value of \u03b2 is close to :",
    "options": [],
    "hints": [
      "[METHOD] When car is at rest, rain falls vertically &rArr; true rain velocity has zero horizontal component (v_rx = 0, speed v_r).",
      "[METHOD] At car speed v, rain appears at 60\u00b0 from horizontal, which means 30\u00b0 with vertical: tan 30\u00b0 = v / v_r &rArr; 1/\u221a3 = v / v_r &rArr; v_r = \u221a3 v.",
      "[METHOD] At speed (1 + \u03b2)v, angle is 45\u00b0 from horizontal, so 45\u00b0 with vertical: tan 45\u00b0 = (1 + \u03b2)v / v_r = 1 &rArr; (1 + \u03b2)v = v_r."
    ],
    "steps": [
      "When car is at rest, rain falls vertically &rArr; true rain velocity has zero horizontal component (v_rx = 0, speed v_r).",
      "At car speed v, rain appears at 60\u00b0 from horizontal, which means 30\u00b0 with vertical: tan 30\u00b0 = v / v_r &rArr; 1/\u221a3 = v / v_r &rArr; v_r = \u221a3 v.",
      "At speed (1 + \u03b2)v, angle is 45\u00b0 from horizontal, so 45\u00b0 with vertical: tan 45\u00b0 = (1 + \u03b2)v / v_r = 1 &rArr; (1 + \u03b2)v = v_r.",
      "Substitute v_r = \u221a3 v: (1 + \u03b2)v = \u221a3 v &rArr; 1 + \u03b2 = \u221a3 &rArr; \u03b2 = \u221a3 - 1 \u2248 1.732 - 1 = 0.732 \u2248 0.73."
    ],
    "limitingCheck": "Independent check: re-derive from \"tan \u03b8\u2081 = v_m1 / v_ry,  tan \u03b8\u2082 = v_m2 / v_ry\" and verify that the stated data reproduce \u03b2 = \u221a3 - 1 \u2248 0.73. No unstated numerical parameter should be needed.",
    "check": "Independent check: re-derive from \"tan \u03b8\u2081 = v_m1 / v_ry,  tan \u03b8\u2082 = v_m2 / v_ry\" and verify that the stated data reproduce \u03b2 = \u221a3 - 1 \u2248 0.73. No unstated numerical parameter should be needed.",
    "trapWarning": "Keep a frame label on every velocity before adding or subtracting vectors; dropping the frame is the usual sign/direction error.",
    "correctKey": null,
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Physics)"
  },
  {
    "id": "EXAM-51",
    "code": "EXAM-51",
    "title": "ExamSide JEE Main \u00b7 Diagnostic Hub \u00b7 QEXAM-51 \u00b7 Motion in 2D",
    "subjectCode": "PHYS",
    "subject": "Physics",
    "topicCode": "MOTION_IN_2D",
    "topic": "Motion in 2D",
    "subtopic": "CAP-PHY-MOTION-2D",
    "exam": "ExamSide JEE Main",
    "year": "JEE Main 2020 (Online) 5th September Morning Slot",
    "paper": "Diagnostic Hub",
    "questionNumber": "EXAM-51",
    "section": "FAM-PHY-MOTION-2D",
    "markingScheme": "+3 / 0",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Motion in 2D",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "NUMERIC_QUANTITY",
    "stem": "A balloon is moving up in air vertically above a point A on the ground. When it is at a height h 1 , a girl standing at a distanced (point B) from A (see figure) sees it at an angle 45 o with respect to the vertical. When the balloon climbs up a further height h 2 , it is seen at an angle 60 o with respect to the vertical if the girl moves further by a distance 2.464 d(point C). Then the height h 2 is (given tan 30 o = 0.5774)",
    "options": [],
    "hints": [
      "[METHOD] Initially the line of sight is 45\u00b0 to vertical, hence 45\u00b0 elevation, so h\u2081=d.",
      "[METHOD] After the girl moves a further 2.464d away, AC=3.464d. A 60\u00b0 angle to vertical is 30\u00b0 elevation.",
      "[METHOD] h\u2081+h\u2082=AC\u00b7tan30\u00b0\u22483.464d\u00d70.5774\u22482d, so h\u2082=d=h\u2081."
    ],
    "steps": [
      "Initially the line of sight is 45\u00b0 to vertical, hence 45\u00b0 elevation, so h\u2081=d.",
      "After the girl moves a further 2.464d away, AC=3.464d. A 60\u00b0 angle to vertical is 30\u00b0 elevation.",
      "h\u2081+h\u2082=AC\u00b7tan30\u00b0\u22483.464d\u00d70.5774\u22482d, so h\u2082=d=h\u2081."
    ],
    "limitingCheck": "Independent check: re-derive from \"tan(elevation)=height/horizontal distance; angle to vertical = 90\u00b0\u2212elevation.\" and verify that the stated data reproduce h\u2082 = d = h\u2081. No unstated numerical parameter should be needed.",
    "check": "Independent check: re-derive from \"tan(elevation)=height/horizontal distance; angle to vertical = 90\u00b0\u2212elevation.\" and verify that the stated data reproduce h\u2082 = d = h\u2081. No unstated numerical parameter should be needed.",
    "trapWarning": "The stated angle is measured from the vertical; using it directly in a horizontal-angle formula swaps sine and cosine.",
    "correctKey": null,
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Physics)"
  },
  {
    "id": "EXAM-52",
    "code": "EXAM-52",
    "title": "ExamSide JEE Main \u00b7 Diagnostic Hub \u00b7 QEXAM-52 \u00b7 Motion in 2D",
    "subjectCode": "PHYS",
    "subject": "Physics",
    "topicCode": "MOTION_IN_2D",
    "topic": "Motion in 2D",
    "subtopic": "CAP-PHY-MOTION-2D",
    "exam": "ExamSide JEE Main",
    "year": "JEE Main 2020 (Online) 4th September Morning Slot",
    "paper": "Diagnostic Hub",
    "questionNumber": "EXAM-52",
    "section": "FAM-PHY-MOTION-2D",
    "markingScheme": "+3 / 0",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Motion in 2D",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "NUMERIC_QUANTITY",
    "stem": "Starting from the origin at time t = 0, with initial velocity 5 j\u02c6 ms -1 , a particle moves in the x-y plane with a constant acceleration of (10i\u02c6+4j\u02c6) ms -2 . At time t, its coordinates are (20 m, y 0 m). The values of t and y 0 are, respectively:",
    "options": [],
    "hints": [
      "[METHOD] x=\u00bd(10)t\u00b2=5t\u00b2. Setting x=20 gives t\u00b2=4, so t=2 s.",
      "[METHOD] y=5t+\u00bd(4)t\u00b2.",
      "[METHOD] At t=2 s, y\u2080=10+8=18 m."
    ],
    "steps": [
      "x=\u00bd(10)t\u00b2=5t\u00b2. Setting x=20 gives t\u00b2=4, so t=2 s.",
      "y=5t+\u00bd(4)t\u00b2.",
      "At t=2 s, y\u2080=10+8=18 m."
    ],
    "limitingCheck": "Independent check: re-derive from \"r=r\u2080+v\u2080t+\u00bdat\u00b2 componentwise.\" and verify that the stated data reproduce t = 2 s, y\u2080 = 18 m. No unstated numerical parameter should be needed.",
    "check": "Independent check: re-derive from \"r=r\u2080+v\u2080t+\u00bdat\u00b2 componentwise.\" and verify that the stated data reproduce t = 2 s, y\u2080 = 18 m. No unstated numerical parameter should be needed.",
    "trapWarning": "When position is given explicitly as a function of time, differentiate it directly; do not force a memorized constant-acceleration template onto it.",
    "correctKey": null,
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Physics)"
  },
  {
    "id": "EXAM-53",
    "code": "EXAM-53",
    "title": "ExamSide JEE Main \u00b7 Diagnostic Hub \u00b7 QEXAM-53 \u00b7 Motion in 2D",
    "subjectCode": "PHYS",
    "subject": "Physics",
    "topicCode": "MOTION_IN_2D",
    "topic": "Motion in 2D",
    "subtopic": "CAP-PHY-MOTION-2D",
    "exam": "ExamSide JEE Main",
    "year": "JEE Main 2020 (Online) 9th January Evening Slot",
    "paper": "Diagnostic Hub",
    "questionNumber": "EXAM-53",
    "section": "FAM-PHY-MOTION-2D",
    "markingScheme": "+3 / 0",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Motion in 2D",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "NUMERIC_QUANTITY",
    "stem": "A particle starts from the origin at t = 0 with an initial velocity of 3.0 i\u02c6 m/s and moves in the x-y plane with a constant acceleration (6i\u02c6+4j\u02c6) m/s 2 . The x-coordinate of the particle at the instant when its y-coordinate is 32 m is D meters. The value of D is :-",
    "options": [],
    "hints": [
      "[METHOD] From y=32 m: 2t\u00b2=32, so t=4 s.",
      "[METHOD] Then x=3(4)+3(4\u00b2)=12+48=60 m.",
      "[METHOD] Therefore D=60."
    ],
    "steps": [
      "From y=32 m: 2t\u00b2=32, so t=4 s.",
      "Then x=3(4)+3(4\u00b2)=12+48=60 m.",
      "Therefore D=60."
    ],
    "limitingCheck": "Independent check: re-derive from \"x=3t+3t\u00b2; y=2t\u00b2.\" and verify that the stated data reproduce D = 60 m. No unstated numerical parameter should be needed.",
    "check": "Independent check: re-derive from \"x=3t+3t\u00b2; y=2t\u00b2.\" and verify that the stated data reproduce D = 60 m. No unstated numerical parameter should be needed.",
    "trapWarning": "When position is given explicitly as a function of time, differentiate it directly; do not force a memorized constant-acceleration template onto it.",
    "correctKey": null,
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Physics)"
  },
  {
    "id": "EXAM-54",
    "code": "EXAM-54",
    "title": "ExamSide JEE Main \u00b7 Diagnostic Hub \u00b7 QEXAM-54 \u00b7 Motion in 2D",
    "subjectCode": "PHYS",
    "subject": "Physics",
    "topicCode": "MOTION_IN_2D",
    "topic": "Motion in 2D",
    "subtopic": "CAP-PHY-MOTION-2D",
    "exam": "ExamSide JEE Main",
    "year": "JEE Main 2020 (Online) 8th January Evening Slot",
    "paper": "Diagnostic Hub",
    "questionNumber": "EXAM-54",
    "section": "FAM-PHY-MOTION-2D",
    "markingScheme": "+3 / 0",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Motion in 2D",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "NUMERIC_QUANTITY",
    "stem": "A particle moves such that its position vector r\u2192(t)=cos\u2061\u03c9ti\u02c6+sin\u2061\u03c9tj\u02c6 where \u03c9 is a constant and t is time. Then which of the following statements is true for the velocity v\u2192(t) and acceleration a\u2192(t) of the particle :",
    "options": [],
    "hints": [
      "[METHOD] v=\u03c9(\u2212sin\u03c9t \u00ee+cos\u03c9t \u0135), whose magnitude is \u03c9.",
      "[METHOD] a=\u2212\u03c9\u00b2(cos\u03c9t \u00ee+sin\u03c9t \u0135)=\u2212\u03c9\u00b2r.",
      "[METHOD] Thus acceleration is centripetal and perpendicular to velocity."
    ],
    "steps": [
      "v=\u03c9(\u2212sin\u03c9t \u00ee+cos\u03c9t \u0135), whose magnitude is \u03c9.",
      "a=\u2212\u03c9\u00b2(cos\u03c9t \u00ee+sin\u03c9t \u0135)=\u2212\u03c9\u00b2r.",
      "Thus acceleration is centripetal and perpendicular to velocity."
    ],
    "limitingCheck": "Independent check: re-derive from \"r=(cos\u03c9t)\u00ee+(sin\u03c9t)\u0135; v=dr/dt; a=dv/dt.\" and verify that the stated data reproduce v = \u03c9(\u2212sin\u03c9t \u00ee + cos\u03c9t \u0135), a = \u2212\u03c9\u00b2r; |v|=\u03c9 and v\u00b7a=0. No unstated numerical parameter should be needed.",
    "check": "Independent check: re-derive from \"r=(cos\u03c9t)\u00ee+(sin\u03c9t)\u0135; v=dr/dt; a=dv/dt.\" and verify that the stated data reproduce v = \u03c9(\u2212sin\u03c9t \u00ee + cos\u03c9t \u0135), a = \u2212\u03c9\u00b2r; |v|=\u03c9 and v\u00b7a=0. No unstated numerical parameter should be needed.",
    "trapWarning": "When position is given explicitly as a function of time, differentiate it directly; do not force a memorized constant-acceleration template onto it.",
    "correctKey": null,
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Physics)"
  },
  {
    "id": "EXAM-55",
    "code": "EXAM-55",
    "title": "ExamSide JEE Main \u00b7 Diagnostic Hub \u00b7 QEXAM-55 \u00b7 Motion in 2D",
    "subjectCode": "PHYS",
    "subject": "Physics",
    "topicCode": "MOTION_IN_2D",
    "topic": "Motion in 2D",
    "subtopic": "CAP-PHY-MOTION-2D",
    "exam": "ExamSide JEE Main",
    "year": "JEE Main 2019 (Online) 12th April Evening Slot",
    "paper": "Diagnostic Hub",
    "questionNumber": "EXAM-55",
    "section": "FAM-PHY-MOTION-2D",
    "markingScheme": "+3 / 0",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Motion in 2D",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "NUMERIC_QUANTITY",
    "stem": "Two particles are projected from the same point with the same speed u such that they have the same range R, but different maximum heights, h 1 and h 2 . Which of the following is correct ?",
    "options": [],
    "hints": [
      "[METHOD] Same speed and same range with different angles implies \u03b8\u2082=90\u00b0\u2212\u03b8\u2081.",
      "[METHOD] H\u2081H\u2082=[u\u2074sin\u00b2\u03b8 cos\u00b2\u03b8]/(4g\u00b2)=u\u2074sin\u00b22\u03b8/(16g\u00b2).",
      "[METHOD] Since R=u\u00b2sin2\u03b8/g, H\u2081H\u2082=R\u00b2/16."
    ],
    "steps": [
      "Same speed and same range with different angles implies \u03b8\u2082=90\u00b0\u2212\u03b8\u2081.",
      "H\u2081H\u2082=[u\u2074sin\u00b2\u03b8 cos\u00b2\u03b8]/(4g\u00b2)=u\u2074sin\u00b22\u03b8/(16g\u00b2).",
      "Since R=u\u00b2sin2\u03b8/g, H\u2081H\u2082=R\u00b2/16."
    ],
    "limitingCheck": "Independent check: re-derive from \"For the complementary pair, h\u2081h\u2082 = R\u00b2/16.\" and verify that the stated data reproduce h\u2081h\u2082 = R\u00b2/16 (equivalently R = 4\u221a(h\u2081h\u2082)). No unstated numerical parameter should be needed.",
    "check": "Independent check: re-derive from \"For the complementary pair, h\u2081h\u2082 = R\u00b2/16.\" and verify that the stated data reproduce h\u2081h\u2082 = R\u00b2/16 (equivalently R = 4\u221a(h\u2081h\u2082)). No unstated numerical parameter should be needed.",
    "trapWarning": "Do not invoke complementary-angle symmetry unless the launches have the same speed and the same launch/landing level; otherwise compare the governing expressions directly.",
    "correctKey": null,
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Physics)"
  },
  {
    "id": "EXAM-56",
    "code": "EXAM-56",
    "title": "ExamSide JEE Main \u00b7 Diagnostic Hub \u00b7 QEXAM-56 \u00b7 Motion in 2D",
    "subjectCode": "PHYS",
    "subject": "Physics",
    "topicCode": "MOTION_IN_2D",
    "topic": "Motion in 2D",
    "subtopic": "CAP-PHY-MOTION-2D",
    "exam": "ExamSide JEE Main",
    "year": "JEE Main 2019 (Online) 12th April Morning Slot",
    "paper": "Diagnostic Hub",
    "questionNumber": "EXAM-56",
    "section": "FAM-PHY-MOTION-2D",
    "markingScheme": "+3 / 0",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Motion in 2D",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "NUMERIC_QUANTITY",
    "stem": "The trajectory of a projectile near the surface of the earth is given as y = 2x \u2013 9x 2 . If it were launched at an angle \u03b8 0 with speed v 0 then (g = 10 ms \u20132 ) :",
    "options": [],
    "hints": [
      "[METHOD] Compare y = 2x - 9x\u00b2 with y = x tan \u03b8\u2080 - [g / (2 v\u2080\u00b2 cos\u00b2 \u03b8\u2080)] x\u00b2.",
      "[METHOD] From first term: tan \u03b8\u2080 = 2 &rArr; cos\u00b2 \u03b8\u2080 = 1 / (1 + tan\u00b2 \u03b8\u2080) = 1 / (1 + 4) = 1/5.",
      "[METHOD] From second term: g / [2 v\u2080\u00b2 cos\u00b2 \u03b8\u2080] = 9."
    ],
    "steps": [
      "Compare y = 2x - 9x\u00b2 with y = x tan \u03b8\u2080 - [g / (2 v\u2080\u00b2 cos\u00b2 \u03b8\u2080)] x\u00b2.",
      "From first term: tan \u03b8\u2080 = 2 &rArr; cos\u00b2 \u03b8\u2080 = 1 / (1 + tan\u00b2 \u03b8\u2080) = 1 / (1 + 4) = 1/5.",
      "From second term: g / [2 v\u2080\u00b2 cos\u00b2 \u03b8\u2080] = 9.",
      "Substitute g = 10 and cos\u00b2 \u03b8\u2080 = 1/5: 10 / [2 v\u2080\u00b2 (1/5)] = 25 / v\u2080\u00b2 = 9.",
      "Solve: v\u2080\u00b2 = 25 / 9 &rArr; v\u2080 = 5/3 m/s."
    ],
    "limitingCheck": "Independent check: re-derive from \"tan \u03b8\u2080 = 2,  (g) / (2 v\u2080\u00b2 cos\u00b2 \u03b8\u2080) = 9\" and verify that the stated data reproduce v\u2080 = 5/3 m/s, tan \u03b8\u2080 = 2. No unstated numerical parameter should be needed.",
    "check": "Independent check: re-derive from \"tan \u03b8\u2080 = 2,  (g) / (2 v\u2080\u00b2 cos\u00b2 \u03b8\u2080) = 9\" and verify that the stated data reproduce v\u2080 = 5/3 m/s, tan \u03b8\u2080 = 2. No unstated numerical parameter should be needed.",
    "trapWarning": "Resolve the launch velocity into components and check whether the formula's equal-level assumptions actually hold.",
    "correctKey": null,
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Physics)"
  },
  {
    "id": "EXAM-57",
    "code": "EXAM-57",
    "title": "ExamSide JEE Main \u00b7 Diagnostic Hub \u00b7 QEXAM-57 \u00b7 Motion in 2D",
    "subjectCode": "PHYS",
    "subject": "Physics",
    "topicCode": "MOTION_IN_2D",
    "topic": "Motion in 2D",
    "subtopic": "CAP-PHY-MOTION-2D",
    "exam": "ExamSide JEE Main",
    "year": "JEE Main 2019 (Online) 12th April Morning Slot",
    "paper": "Diagnostic Hub",
    "questionNumber": "EXAM-57",
    "section": "FAM-PHY-MOTION-2D",
    "markingScheme": "+3 / 0",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Motion in 2D",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "NUMERIC_QUANTITY",
    "stem": "A shell is fired from a fixed artillery gun with an initial speed u such that it hits the target on the ground at a distance R from it. If t 1 and t 2 are the values of the time taken by it to hit the target in two possible ways, the product t 1 t 2 is -",
    "options": [],
    "hints": [
      "[METHOD] T\u2081=2u sin\u03b8/g and T\u2082=2u cos\u03b8/g.",
      "[METHOD] Their product is 4u\u00b2sin\u03b8cos\u03b8/g\u00b2=2u\u00b2sin2\u03b8/g\u00b2.",
      "[METHOD] Using R=u\u00b2sin2\u03b8/g gives T\u2081T\u2082=2R/g."
    ],
    "steps": [
      "T\u2081=2u sin\u03b8/g and T\u2082=2u cos\u03b8/g.",
      "Their product is 4u\u00b2sin\u03b8cos\u03b8/g\u00b2=2u\u00b2sin2\u03b8/g\u00b2.",
      "Using R=u\u00b2sin2\u03b8/g gives T\u2081T\u2082=2R/g."
    ],
    "limitingCheck": "Independent check: re-derive from \"For same-speed complementary trajectories to the same range, T\u2081T\u2082=2R/g.\" and verify that the stated data reproduce T\u2081T\u2082 = 2R/g. No unstated numerical parameter should be needed.",
    "check": "Independent check: re-derive from \"For same-speed complementary trajectories to the same range, T\u2081T\u2082=2R/g.\" and verify that the stated data reproduce T\u2081T\u2082 = 2R/g. No unstated numerical parameter should be needed.",
    "trapWarning": "Track signs, units, and the reference frame through the calculation; do not import a value or assumption that is absent from the stem.",
    "correctKey": null,
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Physics)"
  },
  {
    "id": "EXAM-58",
    "code": "EXAM-58",
    "title": "ExamSide JEE Main \u00b7 Diagnostic Hub \u00b7 QEXAM-58 \u00b7 Motion in 2D",
    "subjectCode": "PHYS",
    "subject": "Physics",
    "topicCode": "MOTION_IN_2D",
    "topic": "Motion in 2D",
    "subtopic": "CAP-PHY-MOTION-2D",
    "exam": "ExamSide JEE Main",
    "year": "JEE Main 2019 (Online) 10th April Evening Slot",
    "paper": "Diagnostic Hub",
    "questionNumber": "EXAM-58",
    "section": "FAM-PHY-MOTION-2D",
    "markingScheme": "+3 / 0",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Motion in 2D",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "JUSTIFY",
    "kind": "NUMERIC_QUANTITY",
    "stem": "A plane is inclined at an angle \u03b1 = 30\u00b0 with respect to the horizontal. A particle is projected with a speed u = 2 ms \u20131 , from the base of the plane, making an angle \u03b8 = 15\u00b0 with respect to the plane as shown in the figure. the distance from the base, at which the particle hits the plane is close to : (Take g = 10 ms \u20132 )",
    "options": [],
    "hints": [
      "[METHOD] The launch angle to horizontal is 30\u00b0+15\u00b0=45\u00b0.",
      "[METHOD] With u=2 m/s and g=10 m/s\u00b2, the trajectory is y=x\u22122.5x\u00b2.",
      "[METHOD] Intersect with y=x/\u221a3: x=(1\u22121/\u221a3)/2.5\u22480.169 m horizontally."
    ],
    "steps": [
      "The launch angle to horizontal is 30\u00b0+15\u00b0=45\u00b0.",
      "With u=2 m/s and g=10 m/s\u00b2, the trajectory is y=x\u22122.5x\u00b2.",
      "Intersect with y=x/\u221a3: x=(1\u22121/\u221a3)/2.5\u22480.169 m horizontally.",
      "Distance along the 30\u00b0 incline is s=x/cos30\u00b0\u22480.195 m."
    ],
    "limitingCheck": "Independent check: re-derive from \"y=x tan45\u00b0\u2212gx\u00b2/(2u\u00b2cos\u00b245\u00b0), and the incline is y=x tan30\u00b0.\" and verify that the stated data reproduce Approximately 0.20 m along the inclined plane. No unstated numerical parameter should be needed.",
    "check": "Independent check: re-derive from \"y=x tan45\u00b0\u2212gx\u00b2/(2u\u00b2cos\u00b245\u00b0), and the incline is y=x tan30\u00b0.\" and verify that the stated data reproduce Approximately 0.20 m along the inclined plane. No unstated numerical parameter should be needed.",
    "trapWarning": "Track signs, units, and the reference frame through the calculation; do not import a value or assumption that is absent from the stem.",
    "correctKey": null,
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Physics)"
  },
  {
    "id": "EXAM-59",
    "code": "EXAM-59",
    "title": "ExamSide JEE Main \u00b7 Diagnostic Hub \u00b7 QEXAM-59 \u00b7 Motion in 2D",
    "subjectCode": "PHYS",
    "subject": "Physics",
    "topicCode": "MOTION_IN_2D",
    "topic": "Motion in 2D",
    "subtopic": "CAP-PHY-MOTION-2D",
    "exam": "ExamSide JEE Main",
    "year": "JEE Main 2019 (Online) 9th April Morning Slot",
    "paper": "Diagnostic Hub",
    "questionNumber": "EXAM-59",
    "section": "FAM-PHY-MOTION-2D",
    "markingScheme": "+3 / 0",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Motion in 2D",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "NUMERIC_QUANTITY",
    "stem": "The stream of a river is flowing with a speed of 2km/h. A swimmer can swim at a speed of 4km/h. What should be the direction of the swimmer with respect to the flow of the river to cross the river straight ?",
    "options": [],
    "hints": [
      "[METHOD] To cross straight without drift, resultant velocity must be perpendicular to banks.",
      "[METHOD] The upstream component of swimmer velocity must balance river flow: v_s sin \u03b8 = v_r.",
      "[METHOD] Given v_r = 2 km/h, v_s = 4 km/h &rArr; sin \u03b8 = 2 / 4 = 1/2 &rArr; \u03b8 = 30\u00b0 upstream from normal."
    ],
    "steps": [
      "To cross straight without drift, resultant velocity must be perpendicular to banks.",
      "The upstream component of swimmer velocity must balance river flow: v_s sin \u03b8 = v_r.",
      "Given v_r = 2 km/h, v_s = 4 km/h &rArr; sin \u03b8 = 2 / 4 = 1/2 &rArr; \u03b8 = 30\u00b0 upstream from normal.",
      "Direction with respect to river flow direction: 90\u00b0 + 30\u00b0 = 120\u00b0."
    ],
    "limitingCheck": "Independent check: re-derive from \"sin \u03b8 = v_river / v_swimmer\" and verify that the stated data reproduce 120\u00b0 with river flow. No unstated numerical parameter should be needed.",
    "check": "Independent check: re-derive from \"sin \u03b8 = v_river / v_swimmer\" and verify that the stated data reproduce 120\u00b0 with river flow. No unstated numerical parameter should be needed.",
    "trapWarning": "Keep a frame label on every velocity before adding or subtracting vectors; dropping the frame is the usual sign/direction error.",
    "correctKey": null,
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Physics)"
  },
  {
    "id": "EXAM-60",
    "code": "EXAM-60",
    "title": "ExamSide JEE Main \u00b7 Diagnostic Hub \u00b7 QEXAM-60 \u00b7 Motion in 2D",
    "subjectCode": "PHYS",
    "subject": "Physics",
    "topicCode": "MOTION_IN_2D",
    "topic": "Motion in 2D",
    "subtopic": "CAP-PHY-MOTION-2D",
    "exam": "ExamSide JEE Main",
    "year": "JEE Main 2019 (Online) 8th April Morning Slot",
    "paper": "Diagnostic Hub",
    "questionNumber": "EXAM-60",
    "section": "FAM-PHY-MOTION-2D",
    "markingScheme": "+3 / 0",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Motion in 2D",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "NUMERIC_QUANTITY",
    "stem": "Ship A is sailing towards north-east with velocity v\u2192=30i\u2227+50j\u2227 km/hr where i\u2227 points east and j\u2227 , north. Ship B is at a distance of 80 km east and 150 km north of Ship A and is sailing towards west at 10 km/hr. A will be at minimum distance from B in :",
    "options": [],
    "hints": [
      "[METHOD] v_A = 30 \u00ee + 50 \u0135 km/h, v_B = -10 \u00ee km/h.",
      "[METHOD] Relative velocity v_B/A = v_B - v_A = (-10 \u00ee) - (30 \u00ee + 50 \u0135) = -40 \u00ee - 50 \u0135 km/h.",
      "[METHOD] Initial separation: r_B/A(0) = 80 \u00ee + 150 \u0135 km."
    ],
    "steps": [
      "v_A = 30 \u00ee + 50 \u0135 km/h, v_B = -10 \u00ee km/h.",
      "Relative velocity v_B/A = v_B - v_A = (-10 \u00ee) - (30 \u00ee + 50 \u0135) = -40 \u00ee - 50 \u0135 km/h.",
      "Initial separation: r_B/A(0) = 80 \u00ee + 150 \u0135 km.",
      "Relative position at time t: r(t) = (80 - 40t) \u00ee + (150 - 50t) \u0135.",
      "Minimize distance squared: d/dt [(80-40t)\u00b2 + (150-50t)\u00b2] = 0 &rArr; 2(80-40t)(-40) + 2(150-50t)(-50) = 0.",
      "4(80 - 40t) + 5(150 - 50t) = 0 &rArr; 320 - 160t + 750 - 250t = 0 &rArr; 1070 = 410t &rArr; t = 107 / 41 hr \u2248 2.61 hr."
    ],
    "limitingCheck": "Independent check: re-derive from \"r\u2192_rel(t) = r\u2192_rel(0) + v\u2192_rel t,  d/dt |r\u2192_rel|\u00b2 = 0\" and verify that the stated data reproduce t = 107/41 hr (\u2248 2.61 hr). No unstated numerical parameter should be needed.",
    "check": "Independent check: re-derive from \"r\u2192_rel(t) = r\u2192_rel(0) + v\u2192_rel t,  d/dt |r\u2192_rel|\u00b2 = 0\" and verify that the stated data reproduce t = 107/41 hr (\u2248 2.61 hr). No unstated numerical parameter should be needed.",
    "trapWarning": "Keep a frame label on every velocity before adding or subtracting vectors; dropping the frame is the usual sign/direction error.",
    "correctKey": null,
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Physics)"
  },
  {
    "id": "EXAM-61",
    "code": "EXAM-61",
    "title": "ExamSide JEE Main \u00b7 Diagnostic Hub \u00b7 QEXAM-61 \u00b7 Motion in 2D",
    "subjectCode": "PHYS",
    "subject": "Physics",
    "topicCode": "MOTION_IN_2D",
    "topic": "Motion in 2D",
    "subtopic": "CAP-PHY-MOTION-2D",
    "exam": "ExamSide JEE Main",
    "year": "JEE Main 2019 (Online) 12th January Morning Slot",
    "paper": "Diagnostic Hub",
    "questionNumber": "EXAM-61",
    "section": "FAM-PHY-MOTION-2D",
    "markingScheme": "+3 / 0",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Motion in 2D",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "NUMERIC_QUANTITY",
    "stem": "A person standing on an open ground hears the sound of a jet aeroplane, coming from north at an angle 60 o with ground level. But he finds the aeroplane right vertically above his position. If v is the speed of sound, speed of the plane is :",
    "options": [],
    "hints": [
      "[METHOD] If the sound ray arrives at 60\u00b0 above horizontal, with aircraft altitude h, the emission point was x=h/\u221a3 north of the observer.",
      "[METHOD] The sound path length is \u221a(h\u00b2+x\u00b2)=2h/\u221a3, so travel time is 2h/(\u221a3 v).",
      "[METHOD] The aircraft covers x in that time, giving speed (h/\u221a3)/[2h/(\u221a3v)]=v/2."
    ],
    "steps": [
      "If the sound ray arrives at 60\u00b0 above horizontal, with aircraft altitude h, the emission point was x=h/\u221a3 north of the observer.",
      "The sound path length is \u221a(h\u00b2+x\u00b2)=2h/\u221a3, so travel time is 2h/(\u221a3 v).",
      "The aircraft covers x in that time, giving speed (h/\u221a3)/[2h/(\u221a3v)]=v/2."
    ],
    "limitingCheck": "Independent check: re-derive from \"Sound travel time from the earlier aircraft position equals the aircraft's travel time to overhead.\" and verify that the stated data reproduce v_plane = v/2. No unstated numerical parameter should be needed.",
    "check": "Independent check: re-derive from \"Sound travel time from the earlier aircraft position equals the aircraft's travel time to overhead.\" and verify that the stated data reproduce v_plane = v/2. No unstated numerical parameter should be needed.",
    "trapWarning": "The stated angle is measured from the vertical; using it directly in a horizontal-angle formula swaps sine and cosine.",
    "correctKey": null,
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Physics)"
  },
  {
    "id": "EXAM-62",
    "code": "EXAM-62",
    "title": "ExamSide JEE Main \u00b7 Diagnostic Hub \u00b7 QEXAM-62 \u00b7 Motion in 2D",
    "subjectCode": "PHYS",
    "subject": "Physics",
    "topicCode": "MOTION_IN_2D",
    "topic": "Motion in 2D",
    "subtopic": "CAP-PHY-MOTION-2D",
    "exam": "ExamSide JEE Main",
    "year": "JEE Main 2019 (Online) 10th January Morning Slot",
    "paper": "Diagnostic Hub",
    "questionNumber": "EXAM-62",
    "section": "FAM-PHY-MOTION-2D",
    "markingScheme": "+3 / 0",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Motion in 2D",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "NUMERIC_QUANTITY",
    "stem": "Two guns A and B can fire bullets at speeds 1 km/s and 2 km/s respectively. From a point on a horizontal ground, they are fired in all possible directions. The ratio of maximum areas covered by the bullets fired by the two guns, on the ground is -",
    "options": [],
    "hints": [
      "[METHOD] A\u221d(u\u00b2)\u00b2=u\u2074.",
      "[METHOD] The speeds are 1 km/s and 2 km/s.",
      "[METHOD] Therefore A_A:A_B=1\u2074:2\u2074=1:16."
    ],
    "steps": [
      "A\u221d(u\u00b2)\u00b2=u\u2074.",
      "The speeds are 1 km/s and 2 km/s.",
      "Therefore A_A:A_B=1\u2074:2\u2074=1:16."
    ],
    "limitingCheck": "Independent check: re-derive from \"R_max=u\u00b2/g; covered area A=\u03c0R_max\u00b2.\" and verify that the stated data reproduce 1:16. No unstated numerical parameter should be needed.",
    "check": "Independent check: re-derive from \"R_max=u\u00b2/g; covered area A=\u03c0R_max\u00b2.\" and verify that the stated data reproduce 1:16. No unstated numerical parameter should be needed.",
    "trapWarning": "Track signs, units, and the reference frame through the calculation; do not import a value or assumption that is absent from the stem.",
    "correctKey": null,
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Physics)"
  },
  {
    "id": "EXAM-63",
    "code": "EXAM-63",
    "title": "ExamSide JEE Main \u00b7 Diagnostic Hub \u00b7 QEXAM-63 \u00b7 Motion in 2D",
    "subjectCode": "PHYS",
    "subject": "Physics",
    "topicCode": "MOTION_IN_2D",
    "topic": "Motion in 2D",
    "subtopic": "CAP-PHY-MOTION-2D",
    "exam": "ExamSide JEE Main",
    "year": "JEE Main 2019 (Online) 9th January Evening Slot",
    "paper": "Diagnostic Hub",
    "questionNumber": "EXAM-63",
    "section": "FAM-PHY-MOTION-2D",
    "markingScheme": "+3 / 0",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Motion in 2D",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "NUMERIC_QUANTITY",
    "stem": "The position co-ordinates of a particle moving in a 3-D coordinate system is given by x = a cos \u03c9 t y = a sin \u03c9 t and z = a \u03c9 t The speed of the particle is :",
    "options": [],
    "hints": [
      "[METHOD] v_x=\u2212a\u03c9sin\u03c9t, v_y=a\u03c9cos\u03c9t, v_z=a\u03c9.",
      "[METHOD] |v|\u00b2=a\u00b2\u03c9\u00b2(sin\u00b2\u03c9t+cos\u00b2\u03c9t+1)=2a\u00b2\u03c9\u00b2.",
      "[METHOD] Hence |v|=\u221a2 a\u03c9."
    ],
    "steps": [
      "v_x=\u2212a\u03c9sin\u03c9t, v_y=a\u03c9cos\u03c9t, v_z=a\u03c9.",
      "|v|\u00b2=a\u00b2\u03c9\u00b2(sin\u00b2\u03c9t+cos\u00b2\u03c9t+1)=2a\u00b2\u03c9\u00b2.",
      "Hence |v|=\u221a2 a\u03c9."
    ],
    "limitingCheck": "Independent check: re-derive from \"v=(dx/dt,dy/dt,dz/dt).\" and verify that the stated data reproduce \u221a2 a\u03c9. No unstated numerical parameter should be needed.",
    "check": "Independent check: re-derive from \"v=(dx/dt,dy/dt,dz/dt).\" and verify that the stated data reproduce \u221a2 a\u03c9. No unstated numerical parameter should be needed.",
    "trapWarning": "When position is given explicitly as a function of time, differentiate it directly; do not force a memorized constant-acceleration template onto it.",
    "correctKey": null,
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Physics)"
  },
  {
    "id": "EXAM-64",
    "code": "EXAM-64",
    "title": "ExamSide JEE Main \u00b7 Diagnostic Hub \u00b7 QEXAM-64 \u00b7 Motion in 2D",
    "subjectCode": "PHYS",
    "subject": "Physics",
    "topicCode": "MOTION_IN_2D",
    "topic": "Motion in 2D",
    "subtopic": "CAP-PHY-MOTION-2D",
    "exam": "ExamSide JEE Main",
    "year": "JEE Main 2019 (Online) 9th January Morning Slot",
    "paper": "Diagnostic Hub",
    "questionNumber": "EXAM-64",
    "section": "FAM-PHY-MOTION-2D",
    "markingScheme": "+3 / 0",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Motion in 2D",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "NUMERIC_QUANTITY",
    "stem": "A particle is moving with a velocity v\u2192=K(yi\u02c6+xj\u02c6), where K is a constant. The general equation for its path is :",
    "options": [],
    "hints": [
      "[METHOD] From v=K(y\u00ee+x\u0135), dx/dt=Ky and dy/dt=Kx.",
      "[METHOD] Thus dy/dx=x/y, so y dy=x dx.",
      "[METHOD] Integrating gives y\u00b2\u2212x\u00b2=C."
    ],
    "steps": [
      "From v=K(y\u00ee+x\u0135), dx/dt=Ky and dy/dt=Kx.",
      "Thus dy/dx=x/y, so y dy=x dx.",
      "Integrating gives y\u00b2\u2212x\u00b2=C."
    ],
    "limitingCheck": "Independent check: re-derive from \"dy/dx = v_y/v_x = x/y.\" and verify that the stated data reproduce y\u00b2 \u2212 x\u00b2 = C. No unstated numerical parameter should be needed.",
    "check": "Independent check: re-derive from \"dy/dx = v_y/v_x = x/y.\" and verify that the stated data reproduce y\u00b2 \u2212 x\u00b2 = C. No unstated numerical parameter should be needed.",
    "trapWarning": "Track signs, units, and the reference frame through the calculation; do not import a value or assumption that is absent from the stem.",
    "correctKey": null,
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Physics)"
  },
  {
    "id": "EXAM-65",
    "code": "EXAM-65",
    "title": "ExamSide JEE Main \u00b7 Diagnostic Hub \u00b7 QEXAM-65 \u00b7 Motion in 2D",
    "subjectCode": "PHYS",
    "subject": "Physics",
    "topicCode": "MOTION_IN_2D",
    "topic": "Motion in 2D",
    "subtopic": "CAP-PHY-MOTION-2D",
    "exam": "ExamSide JEE Main",
    "year": "JEE Main 2018 (Online) 15th April Evening Slot",
    "paper": "Diagnostic Hub",
    "questionNumber": "EXAM-65",
    "section": "FAM-PHY-MOTION-2D",
    "markingScheme": "+3 / 0",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Motion in 2D",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "JUSTIFY",
    "kind": "NUMERIC_QUANTITY",
    "stem": "A man in a car at location Q on a straight highway is moving with speed \u03c5 . He decides to reach a point P in a field at a distance d from the highway (point M) as shown in the figure. Speed of the car in the field is half to that on the highway. What should be the distance RM, so that the time taken to reach P is minimum ?",
    "options": [],
    "hints": [
      "[METHOD] Ignoring the constant QM/v, minimize f(x)=\u2212x+2\u221a(x\u00b2+d\u00b2).",
      "[METHOD] f'(x)=\u22121+2x/\u221a(x\u00b2+d\u00b2)=0.",
      "[METHOD] Hence 4x\u00b2=x\u00b2+d\u00b2, so x=d/\u221a3."
    ],
    "steps": [
      "Ignoring the constant QM/v, minimize f(x)=\u2212x+2\u221a(x\u00b2+d\u00b2).",
      "f'(x)=\u22121+2x/\u221a(x\u00b2+d\u00b2)=0.",
      "Hence 4x\u00b2=x\u00b2+d\u00b2, so x=d/\u221a3."
    ],
    "limitingCheck": "Independent check: re-derive from \"T=(QM\u2212x)/v + \u221a(x\u00b2+d\u00b2)/(v/2), where x=RM.\" and verify that the stated data reproduce RM = d/\u221a3. No unstated numerical parameter should be needed.",
    "check": "Independent check: re-derive from \"T=(QM\u2212x)/v + \u221a(x\u00b2+d\u00b2)/(v/2), where x=RM.\" and verify that the stated data reproduce RM = d/\u221a3. No unstated numerical parameter should be needed.",
    "trapWarning": "Track signs, units, and the reference frame through the calculation; do not import a value or assumption that is absent from the stem.",
    "correctKey": null,
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Physics)"
  },
  {
    "id": "EXAM-66",
    "code": "EXAM-66",
    "title": "ExamSide JEE Main \u00b7 Diagnostic Hub \u00b7 QEXAM-66 \u00b7 Motion in 2D",
    "subjectCode": "PHYS",
    "subject": "Physics",
    "topicCode": "MOTION_IN_2D",
    "topic": "Motion in 2D",
    "subtopic": "CAP-PHY-MOTION-2D",
    "exam": "ExamSide JEE Main",
    "year": "JEE Main 2013 (Offline)",
    "paper": "Diagnostic Hub",
    "questionNumber": "EXAM-66",
    "section": "FAM-PHY-MOTION-2D",
    "markingScheme": "+3 / 0",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Motion in 2D",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "NUMERIC_QUANTITY",
    "stem": "A projectile is given an initial velocity of (i\u02c6+2j\u02c6) m/s, where i\u02c6 is along the ground and j\u02c6 is along the vertical. If g = 10 m/s 2 , the equation of its trajectory is:",
    "options": [],
    "hints": [
      "[METHOD] Here u_x=1 m/s and u_y=2 m/s, so x=t.",
      "[METHOD] y=2t\u22125t\u00b2.",
      "[METHOD] Eliminate t using t=x: y=2x\u22125x\u00b2."
    ],
    "steps": [
      "Here u_x=1 m/s and u_y=2 m/s, so x=t.",
      "y=2t\u22125t\u00b2.",
      "Eliminate t using t=x: y=2x\u22125x\u00b2."
    ],
    "limitingCheck": "Independent check: re-derive from \"x=u_xt; y=u_yt\u2212\u00bdgt\u00b2.\" and verify that the stated data reproduce y = 2x \u2212 5x\u00b2. No unstated numerical parameter should be needed.",
    "check": "Independent check: re-derive from \"x=u_xt; y=u_yt\u2212\u00bdgt\u00b2.\" and verify that the stated data reproduce y = 2x \u2212 5x\u00b2. No unstated numerical parameter should be needed.",
    "trapWarning": "Resolve the launch velocity into components and check whether the formula's equal-level assumptions actually hold.",
    "correctKey": null,
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Physics)"
  },
  {
    "id": "EXAM-67",
    "code": "EXAM-67",
    "title": "ExamSide JEE Main \u00b7 Diagnostic Hub \u00b7 QEXAM-67 \u00b7 Motion in 2D",
    "subjectCode": "PHYS",
    "subject": "Physics",
    "topicCode": "MOTION_IN_2D",
    "topic": "Motion in 2D",
    "subtopic": "CAP-PHY-MOTION-2D",
    "exam": "ExamSide JEE Main",
    "year": "AIEEE 2012",
    "paper": "Diagnostic Hub",
    "questionNumber": "EXAM-67",
    "section": "FAM-PHY-MOTION-2D",
    "markingScheme": "+3 / 0",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Motion in 2D",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "NUMERIC_QUANTITY",
    "stem": "A boy can throw a stone up to a maximum height of 10 m. The maximum horizontal distance that the boy can throw the same stone up to will be",
    "options": [],
    "hints": [
      "[METHOD] Maximum vertical height 10 m gives u\u00b2/(2g)=10.",
      "[METHOD] So u\u00b2/g=20 m.",
      "[METHOD] That is the maximum horizontal range at 45\u00b0."
    ],
    "steps": [
      "Maximum vertical height 10 m gives u\u00b2/(2g)=10.",
      "So u\u00b2/g=20 m.",
      "That is the maximum horizontal range at 45\u00b0."
    ],
    "limitingCheck": "Independent check: re-derive from \"H_vertical=u\u00b2/(2g); R_max=u\u00b2/g.\" and verify that the stated data reproduce 20 m. No unstated numerical parameter should be needed.",
    "check": "Independent check: re-derive from \"H_vertical=u\u00b2/(2g); R_max=u\u00b2/g.\" and verify that the stated data reproduce 20 m. No unstated numerical parameter should be needed.",
    "trapWarning": "Resolve the launch velocity into components and check whether the formula's equal-level assumptions actually hold.",
    "correctKey": null,
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Physics)"
  },
  {
    "id": "EXAM-68",
    "code": "EXAM-68",
    "title": "ExamSide JEE Main \u00b7 Diagnostic Hub \u00b7 QEXAM-68 \u00b7 Motion in 2D",
    "subjectCode": "PHYS",
    "subject": "Physics",
    "topicCode": "MOTION_IN_2D",
    "topic": "Motion in 2D",
    "subtopic": "CAP-PHY-MOTION-2D",
    "exam": "ExamSide JEE Main",
    "year": "AIEEE 2011",
    "paper": "Diagnostic Hub",
    "questionNumber": "EXAM-68",
    "section": "FAM-PHY-MOTION-2D",
    "markingScheme": "+3 / 0",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Motion in 2D",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "NUMERIC_QUANTITY",
    "stem": "A water fountain on the ground sprinkles water all around it. If the speed of water coming out of the fountain is v, the total area around the fountain that gets wet is :",
    "options": [],
    "hints": [
      "[METHOD] The farthest radius wetted in any azimuth is the maximum projectile range v\u00b2/g.",
      "[METHOD] Rotational symmetry makes the wetted region a disk.",
      "[METHOD] A=\u03c0(v\u00b2/g)\u00b2=\u03c0v\u2074/g\u00b2."
    ],
    "steps": [
      "The farthest radius wetted in any azimuth is the maximum projectile range v\u00b2/g.",
      "Rotational symmetry makes the wetted region a disk.",
      "A=\u03c0(v\u00b2/g)\u00b2=\u03c0v\u2074/g\u00b2."
    ],
    "limitingCheck": "Independent check: re-derive from \"R_max=v\u00b2/g; wet area A=\u03c0R_max\u00b2.\" and verify that the stated data reproduce A = \u03c0v\u2074/g\u00b2. No unstated numerical parameter should be needed.",
    "check": "Independent check: re-derive from \"R_max=v\u00b2/g; wet area A=\u03c0R_max\u00b2.\" and verify that the stated data reproduce A = \u03c0v\u2074/g\u00b2. No unstated numerical parameter should be needed.",
    "trapWarning": "Track signs, units, and the reference frame through the calculation; do not import a value or assumption that is absent from the stem.",
    "correctKey": null,
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Physics)"
  },
  {
    "id": "EXAM-69",
    "code": "EXAM-69",
    "title": "ExamSide JEE Main \u00b7 Diagnostic Hub \u00b7 QEXAM-69 \u00b7 Motion in 2D",
    "subjectCode": "PHYS",
    "subject": "Physics",
    "topicCode": "MOTION_IN_2D",
    "topic": "Motion in 2D",
    "subtopic": "CAP-PHY-MOTION-2D",
    "exam": "ExamSide JEE Main",
    "year": "AIEEE 2010",
    "paper": "Diagnostic Hub",
    "questionNumber": "EXAM-69",
    "section": "FAM-PHY-MOTION-2D",
    "markingScheme": "+3 / 0",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Motion in 2D",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "NUMERIC_QUANTITY",
    "stem": "A particle is moving with velocity v\u2192=k(yi\u02c6+xj\u02c6) , where K is a constant. The general equation for its path is",
    "options": [],
    "hints": [
      "[METHOD] dx/dt=ky and dy/dt=kx.",
      "[METHOD] Therefore y dy=x dx.",
      "[METHOD] Integration gives y\u00b2\u2212x\u00b2=C."
    ],
    "steps": [
      "dx/dt=ky and dy/dt=kx.",
      "Therefore y dy=x dx.",
      "Integration gives y\u00b2\u2212x\u00b2=C."
    ],
    "limitingCheck": "Independent check: re-derive from \"dy/dx = v_y/v_x = x/y.\" and verify that the stated data reproduce y\u00b2 \u2212 x\u00b2 = C. No unstated numerical parameter should be needed.",
    "check": "Independent check: re-derive from \"dy/dx = v_y/v_x = x/y.\" and verify that the stated data reproduce y\u00b2 \u2212 x\u00b2 = C. No unstated numerical parameter should be needed.",
    "trapWarning": "Track signs, units, and the reference frame through the calculation; do not import a value or assumption that is absent from the stem.",
    "correctKey": null,
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Physics)"
  },
  {
    "id": "EXAM-70",
    "code": "EXAM-70",
    "title": "ExamSide JEE Main \u00b7 Diagnostic Hub \u00b7 QEXAM-70 \u00b7 Motion in 2D",
    "subjectCode": "PHYS",
    "subject": "Physics",
    "topicCode": "MOTION_IN_2D",
    "topic": "Motion in 2D",
    "subtopic": "CAP-PHY-MOTION-2D",
    "exam": "ExamSide JEE Main",
    "year": "AIEEE 2009",
    "paper": "Diagnostic Hub",
    "questionNumber": "EXAM-70",
    "section": "FAM-PHY-MOTION-2D",
    "markingScheme": "+3 / 0",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Motion in 2D",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "NUMERIC_QUANTITY",
    "stem": "A particle has an initial velocity 3i\u02c6+4j\u02c6 and an acceleration of 0.4i\u02c6+0.3j\u02c6 . Its speed after 10 s is:",
    "options": [],
    "hints": [
      "[METHOD] After 10 s, v_x=3+0.4(10)=7 m/s.",
      "[METHOD] v_y=4+0.3(10)=7 m/s.",
      "[METHOD] Speed=\u221a(7\u00b2+7\u00b2)=7\u221a2 m/s."
    ],
    "steps": [
      "After 10 s, v_x=3+0.4(10)=7 m/s.",
      "v_y=4+0.3(10)=7 m/s.",
      "Speed=\u221a(7\u00b2+7\u00b2)=7\u221a2 m/s."
    ],
    "limitingCheck": "Independent check: re-derive from \"v(t)=v\u2080+at.\" and verify that the stated data reproduce 7\u221a2 m/s. No unstated numerical parameter should be needed.",
    "check": "Independent check: re-derive from \"v(t)=v\u2080+at.\" and verify that the stated data reproduce 7\u221a2 m/s. No unstated numerical parameter should be needed.",
    "trapWarning": "Track signs, units, and the reference frame through the calculation; do not import a value or assumption that is absent from the stem.",
    "correctKey": null,
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Physics)"
  },
  {
    "id": "EXAM-71",
    "code": "EXAM-71",
    "title": "ExamSide JEE Main \u00b7 Diagnostic Hub \u00b7 QEXAM-71 \u00b7 Motion in 2D",
    "subjectCode": "PHYS",
    "subject": "Physics",
    "topicCode": "MOTION_IN_2D",
    "topic": "Motion in 2D",
    "subtopic": "CAP-PHY-MOTION-2D",
    "exam": "ExamSide JEE Main",
    "year": "AIEEE 2005",
    "paper": "Diagnostic Hub",
    "questionNumber": "EXAM-71",
    "section": "FAM-PHY-MOTION-2D",
    "markingScheme": "+3 / 0",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Motion in 2D",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "NUMERIC_QUANTITY",
    "stem": "A particle is moving eastwards with a velocity of 5 m/s. In 10 seconds the velocity changes to 5 m/s northwards. The average acceleration in this time is",
    "options": [],
    "hints": [
      "[METHOD] Take East as +\u00ee and North as +\u0135: v_i=5\u00ee, v_f=5\u0135 m/s.",
      "[METHOD] \u0394v=\u22125\u00ee+5\u0135 m/s over 10 s.",
      "[METHOD] a_avg=(\u22120.5\u00ee+0.5\u0135) m/s\u00b2; magnitude=1/\u221a2\u22480.707 m/s\u00b2."
    ],
    "steps": [
      "Take East as +\u00ee and North as +\u0135: v_i=5\u00ee, v_f=5\u0135 m/s.",
      "\u0394v=\u22125\u00ee+5\u0135 m/s over 10 s.",
      "a_avg=(\u22120.5\u00ee+0.5\u0135) m/s\u00b2; magnitude=1/\u221a2\u22480.707 m/s\u00b2."
    ],
    "limitingCheck": "Independent check: re-derive from \"a_avg=(v_f\u2212v_i)/\u0394t.\" and verify that the stated data reproduce a_avg = (\u22120.5 \u00ee + 0.5 \u0135) m/s\u00b2; magnitude \u2248 0.707 m/s\u00b2 toward North-West. No unstated numerical parameter should be needed.",
    "check": "Independent check: re-derive from \"a_avg=(v_f\u2212v_i)/\u0394t.\" and verify that the stated data reproduce a_avg = (\u22120.5 \u00ee + 0.5 \u0135) m/s\u00b2; magnitude \u2248 0.707 m/s\u00b2 toward North-West. No unstated numerical parameter should be needed.",
    "trapWarning": "Track signs, units, and the reference frame through the calculation; do not import a value or assumption that is absent from the stem.",
    "correctKey": null,
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Physics)"
  },
  {
    "id": "EXAM-72",
    "code": "EXAM-72",
    "title": "ExamSide JEE Main \u00b7 Diagnostic Hub \u00b7 QEXAM-72 \u00b7 Motion in 2D",
    "subjectCode": "PHYS",
    "subject": "Physics",
    "topicCode": "MOTION_IN_2D",
    "topic": "Motion in 2D",
    "subtopic": "CAP-PHY-MOTION-2D",
    "exam": "ExamSide JEE Main",
    "year": "AIEEE 2004",
    "paper": "Diagnostic Hub",
    "questionNumber": "EXAM-72",
    "section": "FAM-PHY-MOTION-2D",
    "markingScheme": "+3 / 0",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Motion in 2D",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "NUMERIC_QUANTITY",
    "stem": "A projectile can have the same range 'R' for two angles of projection. If T 1 and T 2 be the time of flights in the two cases, then the product of the two time of flights is directly proportional to",
    "options": [],
    "hints": [
      "[METHOD] The two launch angles are complementary.",
      "[METHOD] Multiply T\u2081=2u sin\u03b8/g and T\u2082=2u cos\u03b8/g.",
      "[METHOD] Using R=u\u00b2sin2\u03b8/g gives T\u2081T\u2082=2R/g, so for fixed g the product is directly proportional to R."
    ],
    "steps": [
      "The two launch angles are complementary.",
      "Multiply T\u2081=2u sin\u03b8/g and T\u2082=2u cos\u03b8/g.",
      "Using R=u\u00b2sin2\u03b8/g gives T\u2081T\u2082=2R/g, so for fixed g the product is directly proportional to R."
    ],
    "limitingCheck": "Independent check: re-derive from \"T\u2081T\u2082=2R/g for the complementary same-range pair.\" and verify that the stated data reproduce R (because T\u2081T\u2082 = 2R/g). No unstated numerical parameter should be needed.",
    "check": "Independent check: re-derive from \"T\u2081T\u2082=2R/g for the complementary same-range pair.\" and verify that the stated data reproduce R (because T\u2081T\u2082 = 2R/g). No unstated numerical parameter should be needed.",
    "trapWarning": "Do not invoke complementary-angle symmetry unless the launches have the same speed and the same launch/landing level; otherwise compare the governing expressions directly.",
    "correctKey": null,
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Physics)"
  },
  {
    "id": "EXAM-73",
    "code": "EXAM-73",
    "title": "ExamSide JEE Main \u00b7 Diagnostic Hub \u00b7 QEXAM-73 \u00b7 Motion in 2D",
    "subjectCode": "PHYS",
    "subject": "Physics",
    "topicCode": "MOTION_IN_2D",
    "topic": "Motion in 2D",
    "subtopic": "CAP-PHY-MOTION-2D",
    "exam": "ExamSide JEE Main",
    "year": "AIEEE 2004",
    "paper": "Diagnostic Hub",
    "questionNumber": "EXAM-73",
    "section": "FAM-PHY-MOTION-2D",
    "markingScheme": "+3 / 0",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Motion in 2D",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "NUMERIC_QUANTITY",
    "stem": "A ball is thrown from a point with a speed \u03bd 0 at an angle of projection \u03b8. From the same point and at the same instant person starts running with a constant speed v02 to catch the ball. Will the person be able to catch the ball? If yes, what should be the angle of projection \u03b8?",
    "options": [],
    "hints": [
      "[METHOD] Ball is thrown with speed v\u2080 at angle \u03b8; runner starts at same point and runs with constant speed v\u2080/2.",
      "[METHOD] For runner to catch ball at landing, runner must travel same horizontal distance in same time.",
      "[METHOD] Therefore, runner's speed must equal ball's horizontal velocity component: v_person = v\u2080 cos \u03b8."
    ],
    "steps": [
      "Ball is thrown with speed v\u2080 at angle \u03b8; runner starts at same point and runs with constant speed v\u2080/2.",
      "For runner to catch ball at landing, runner must travel same horizontal distance in same time.",
      "Therefore, runner's speed must equal ball's horizontal velocity component: v_person = v\u2080 cos \u03b8.",
      "Equate: v\u2080 / 2 = v\u2080 cos \u03b8 &rArr; cos \u03b8 = 1/2.",
      "Solve: \u03b8 = 60\u00b0. Yes, the person can catch the ball if \u03b8 = 60\u00b0."
    ],
    "limitingCheck": "Independent check: re-derive from \"v_person = u cos \u03b8\" and verify that the stated data reproduce Yes, \u03b8 = 60\u00b0. No unstated numerical parameter should be needed.",
    "check": "Independent check: re-derive from \"v_person = u cos \u03b8\" and verify that the stated data reproduce Yes, \u03b8 = 60\u00b0. No unstated numerical parameter should be needed.",
    "trapWarning": "Resolve the launch velocity into components and check whether the formula's equal-level assumptions actually hold.",
    "correctKey": null,
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Physics)"
  },
  {
    "id": "EXAM-74",
    "code": "EXAM-74",
    "title": "ExamSide JEE Main \u00b7 Diagnostic Hub \u00b7 QEXAM-74 \u00b7 Motion in 2D",
    "subjectCode": "PHYS",
    "subject": "Physics",
    "topicCode": "MOTION_IN_2D",
    "topic": "Motion in 2D",
    "subtopic": "CAP-PHY-MOTION-2D",
    "exam": "ExamSide JEE Main",
    "year": "AIEEE 2003",
    "paper": "Diagnostic Hub",
    "questionNumber": "EXAM-74",
    "section": "FAM-PHY-MOTION-2D",
    "markingScheme": "+3 / 0",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Motion in 2D",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "NUMERIC_QUANTITY",
    "stem": "A boy playing on the roof of a 10 m high building throws a ball with a speed of 10 m/s at an angle of 30\u2218 with the horizontal. How far from the throwing point will the ball be at the height of 10 m from the ground? [g=10m/s2,sin\u206130\u2218=12,cos\u206130\u2218=sqrt32]",
    "options": [],
    "hints": [
      "[METHOD] The ball is again at roof height when y=0 at the nonzero time t=2u sin30\u00b0/g=1 s.",
      "[METHOD] Then x=10cos30\u00b0\u00d71=5\u221a3 m.",
      "[METHOD] At that instant the vertical displacement from the throwing point is zero, so the distance from the throwing point is 5\u221a3 m."
    ],
    "steps": [
      "The ball is again at roof height when y=0 at the nonzero time t=2u sin30\u00b0/g=1 s.",
      "Then x=10cos30\u00b0\u00d71=5\u221a3 m.",
      "At that instant the vertical displacement from the throwing point is zero, so the distance from the throwing point is 5\u221a3 m."
    ],
    "limitingCheck": "Independent check: re-derive from \"Relative to the roof, y=u sin30\u00b0\u00b7t\u2212\u00bdgt\u00b2; x=u cos30\u00b0\u00b7t.\" and verify that the stated data reproduce 5\u221a3 m \u2248 8.66 m. No unstated numerical parameter should be needed.",
    "check": "Independent check: re-derive from \"Relative to the roof, y=u sin30\u00b0\u00b7t\u2212\u00bdgt\u00b2; x=u cos30\u00b0\u00b7t.\" and verify that the stated data reproduce 5\u221a3 m \u2248 8.66 m. No unstated numerical parameter should be needed.",
    "trapWarning": "Do not use ground-to-ground symmetric projectile formulas when launch and landing heights differ; solve the vertical boundary event first.",
    "correctKey": null,
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Physics)"
  },
  {
    "id": "EXAM-75",
    "code": "EXAM-75",
    "title": "ExamSide JEE Main \u00b7 Diagnostic Hub \u00b7 QEXAM-75 \u00b7 Motion in 2D",
    "subjectCode": "PHYS",
    "subject": "Physics",
    "topicCode": "MOTION_IN_2D",
    "topic": "Motion in 2D",
    "subtopic": "CAP-PHY-MOTION-2D",
    "exam": "ExamSide JEE Main",
    "year": "JEE Main 2025 (Online) 29th January Morning Shift",
    "paper": "Diagnostic Hub",
    "questionNumber": "EXAM-75",
    "section": "FAM-PHY-MOTION-2D",
    "markingScheme": "+3 / 0",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Motion in 2D",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "NUMERIC_QUANTITY",
    "stem": "The maximum speed of a boat in still water is 27 km/h. Now this boat is moving downstream in a river flowing at 9 km/h. A man in the boat throws a ball vertically upwards with speed of 10 m/s. Range of the ball as observed by an observer at rest on the bank is __________ cm. (Take g=10 m/s 2 )",
    "options": [],
    "hints": [
      "[METHOD] Downstream boat speed relative bank is 27+9=36 km/h=10 m/s.",
      "[METHOD] The ball is thrown vertically at 10 m/s relative to the boat, so in the bank frame u_x=10 m/s and u_y=10 m/s.",
      "[METHOD] Flight time is 2u_y/g=2 s; range=10\u00d72=20 m=2000 cm."
    ],
    "steps": [
      "Downstream boat speed relative bank is 27+9=36 km/h=10 m/s.",
      "The ball is thrown vertically at 10 m/s relative to the boat, so in the bank frame u_x=10 m/s and u_y=10 m/s.",
      "Flight time is 2u_y/g=2 s; range=10\u00d72=20 m=2000 cm."
    ],
    "limitingCheck": "Independent check: re-derive from \"v_x,ground = v_boat,water + v_river; T=2u_y/g; R=v_x,ground T.\" and verify that the stated data reproduce 2000 cm. No unstated numerical parameter should be needed.",
    "check": "Independent check: re-derive from \"v_x,ground = v_boat,water + v_river; T=2u_y/g; R=v_x,ground T.\" and verify that the stated data reproduce 2000 cm. No unstated numerical parameter should be needed.",
    "trapWarning": "Keep a frame label on every velocity before adding or subtracting vectors; dropping the frame is the usual sign/direction error.",
    "correctKey": null,
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Physics)"
  },
  {
    "id": "EXAM-76",
    "code": "EXAM-76",
    "title": "ExamSide JEE Main \u00b7 Diagnostic Hub \u00b7 QEXAM-76 \u00b7 Motion in 2D",
    "subjectCode": "PHYS",
    "subject": "Physics",
    "topicCode": "MOTION_IN_2D",
    "topic": "Motion in 2D",
    "subtopic": "CAP-PHY-MOTION-2D",
    "exam": "ExamSide JEE Main",
    "year": "JEE Main 2025 (Online) 22nd January Morning Shift",
    "paper": "Diagnostic Hub",
    "questionNumber": "EXAM-76",
    "section": "FAM-PHY-MOTION-2D",
    "markingScheme": "+3 / 0",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Motion in 2D",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "NUMERIC_QUANTITY",
    "stem": "A particle is projected at an angle of 30\u2218 from horizontal at a speed of 60m/s . The height traversed by the particle in the first second is h0 and height traversed in the last second, before it reaches the maximum height, is h1 . The ratio h0:h1 is __________. [Take, g=10m/s2 ]",
    "options": [],
    "hints": [
      "[METHOD] u_y=60sin30\u00b0=30 m/s, so apex time is 3 s.",
      "[METHOD] First-second rise h\u2080=y(1)\u2212y(0)=30\u22125=25 m.",
      "[METHOD] Last second before apex: h\u2081=y(3)\u2212y(2)=45\u221240=5 m."
    ],
    "steps": [
      "u_y=60sin30\u00b0=30 m/s, so apex time is 3 s.",
      "First-second rise h\u2080=y(1)\u2212y(0)=30\u22125=25 m.",
      "Last second before apex: h\u2081=y(3)\u2212y(2)=45\u221240=5 m.",
      "Thus h\u2080:h\u2081=5:1."
    ],
    "limitingCheck": "Independent check: re-derive from \"Vertical displacement in an interval follows y(t)=u_y t\u2212\u00bdgt\u00b2.\" and verify that the stated data reproduce 5:1. No unstated numerical parameter should be needed.",
    "check": "Independent check: re-derive from \"Vertical displacement in an interval follows y(t)=u_y t\u2212\u00bdgt\u00b2.\" and verify that the stated data reproduce 5:1. No unstated numerical parameter should be needed.",
    "trapWarning": "Resolve the launch velocity into components and check whether the formula's equal-level assumptions actually hold.",
    "correctKey": null,
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Physics)"
  },
  {
    "id": "EXAM-77",
    "code": "EXAM-77",
    "title": "ExamSide JEE Main \u00b7 Diagnostic Hub \u00b7 QEXAM-77 \u00b7 Motion in 2D",
    "subjectCode": "PHYS",
    "subject": "Physics",
    "topicCode": "MOTION_IN_2D",
    "topic": "Motion in 2D",
    "subtopic": "CAP-PHY-MOTION-2D",
    "exam": "ExamSide JEE Main",
    "year": "JEE Main 2024 (Online) 8th April Evening Shift",
    "paper": "Diagnostic Hub",
    "questionNumber": "EXAM-77",
    "section": "FAM-PHY-MOTION-2D",
    "markingScheme": "+3 / 0",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Motion in 2D",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "NUMERIC_QUANTITY",
    "stem": "A body of mass M thrown horizontally with velocity v from the top of the tower of height H touches the ground at a distance of 100m from the foot of the tower. A body of mass 2M thrown at a velocity v2 from the top of the tower of height 4H will touch the ground at a distance of _______ m.",
    "options": [],
    "hints": [
      "[METHOD] For first body: R\u2081 = v \u221a(2H / g) = 100 m.",
      "[METHOD] Mass does not affect ballistic motion (mass M vs 2M is irrelevant).",
      "[METHOD] For second body thrown at velocity v/2 from height 4H:"
    ],
    "steps": [
      "For first body: R\u2081 = v \u221a(2H / g) = 100 m.",
      "Mass does not affect ballistic motion (mass M vs 2M is irrelevant).",
      "For second body thrown at velocity v/2 from height 4H:",
      "R\u2082 = (v / 2) \u221a(2(4H) / g) = (v / 2) &times; 2 \u221a(2H / g) = v \u221a(2H / g) = R\u2081 = 100 m."
    ],
    "limitingCheck": "Independent check: re-derive from \"R = u \u221a(2h/g)\" and verify that the stated data reproduce 100 m. No unstated numerical parameter should be needed.",
    "check": "Independent check: re-derive from \"R = u \u221a(2h/g)\" and verify that the stated data reproduce 100 m. No unstated numerical parameter should be needed.",
    "trapWarning": "Do not use ground-to-ground symmetric projectile formulas when launch and landing heights differ; solve the vertical boundary event first.",
    "correctKey": null,
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Physics)"
  },
  {
    "id": "EXAM-78",
    "code": "EXAM-78",
    "title": "ExamSide JEE Main \u00b7 Diagnostic Hub \u00b7 QEXAM-78 \u00b7 Motion in 2D",
    "subjectCode": "PHYS",
    "subject": "Physics",
    "topicCode": "MOTION_IN_2D",
    "topic": "Motion in 2D",
    "subtopic": "CAP-PHY-MOTION-2D",
    "exam": "ExamSide JEE Main",
    "year": "JEE Main 2024 (Online) 5th April Evening Shift",
    "paper": "Diagnostic Hub",
    "questionNumber": "EXAM-78",
    "section": "FAM-PHY-MOTION-2D",
    "markingScheme": "+3 / 0",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Motion in 2D",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "NUMERIC_QUANTITY",
    "stem": "The maximum height reached by a projectile is 64m . If the initial velocity is halved, the new maximum height of the projectile is ______ m .",
    "options": [],
    "hints": [
      "[METHOD] Halving u multiplies maximum height by (1/2)\u00b2=1/4.",
      "[METHOD] New H=64/4.",
      "[METHOD] Therefore H=16 m."
    ],
    "steps": [
      "Halving u multiplies maximum height by (1/2)\u00b2=1/4.",
      "New H=64/4.",
      "Therefore H=16 m."
    ],
    "limitingCheck": "Independent check: re-derive from \"H \u221d u\u00b2 for fixed launch angle.\" and verify that the stated data reproduce 16 m. No unstated numerical parameter should be needed.",
    "check": "Independent check: re-derive from \"H \u221d u\u00b2 for fixed launch angle.\" and verify that the stated data reproduce 16 m. No unstated numerical parameter should be needed.",
    "trapWarning": "Resolve the launch velocity into components and check whether the formula's equal-level assumptions actually hold.",
    "correctKey": null,
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Physics)"
  },
  {
    "id": "EXAM-79",
    "code": "EXAM-79",
    "title": "ExamSide JEE Main \u00b7 Diagnostic Hub \u00b7 QEXAM-79 \u00b7 Motion in 2D",
    "subjectCode": "PHYS",
    "subject": "Physics",
    "topicCode": "MOTION_IN_2D",
    "topic": "Motion in 2D",
    "subtopic": "CAP-PHY-MOTION-2D",
    "exam": "ExamSide JEE Main",
    "year": "JEE Main 2024 (Online) 29th January Morning Shift",
    "paper": "Diagnostic Hub",
    "questionNumber": "EXAM-79",
    "section": "FAM-PHY-MOTION-2D",
    "markingScheme": "+3 / 0",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Motion in 2D",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "NUMERIC_QUANTITY",
    "stem": "A ball rolls off the top of a stairway with horizontal velocity u . The steps are 0.1m high and 0.1m wide. The minimum velocity u with which that ball just hits the step 5 of the stairway will be sqrtxms\u22121 where x= __________ [use g=10m/s2 ].",
    "options": [],
    "hints": [
      "[METHOD] Steps are 0.1 m high and 0.1 m wide.",
      "[METHOD] To hit step 5, the ball must clear step 4: x \u2265 4 &times; 0.1 = 0.4 m, and vertical drop y = 4 &times; 0.1 = 0.4 m.",
      "[METHOD] Time to drop 0.4 m: t = \u221a(2y / g) = \u221a(2 &times; 0.4 / 10) = \u221a0.08 s."
    ],
    "steps": [
      "Steps are 0.1 m high and 0.1 m wide.",
      "To hit step 5, the ball must clear step 4: x \u2265 4 &times; 0.1 = 0.4 m, and vertical drop y = 4 &times; 0.1 = 0.4 m.",
      "Time to drop 0.4 m: t = \u221a(2y / g) = \u221a(2 &times; 0.4 / 10) = \u221a0.08 s.",
      "Minimum horizontal speed: u = x / t = 0.4 / \u221a0.08 = \u221a(0.16 / 0.08) = \u221a2 m/s.",
      "Given u = \u221ax &rArr; x = 2."
    ],
    "limitingCheck": "Independent check: re-derive from \"x \u2265 (n-1) w,  y = (n-1) h,  t = \u221a(2y/g),  u = x / t\" and verify that the stated data reproduce x = 2. No unstated numerical parameter should be needed.",
    "check": "Independent check: re-derive from \"x \u2265 (n-1) w,  y = (n-1) h,  t = \u221a(2y/g),  u = x / t\" and verify that the stated data reproduce x = 2. No unstated numerical parameter should be needed.",
    "trapWarning": "When position is given explicitly as a function of time, differentiate it directly; do not force a memorized constant-acceleration template onto it.",
    "correctKey": null,
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Physics)"
  },
  {
    "id": "EXAM-80",
    "code": "EXAM-80",
    "title": "ExamSide JEE Main \u00b7 Diagnostic Hub \u00b7 QEXAM-80 \u00b7 Motion in 2D",
    "subjectCode": "PHYS",
    "subject": "Physics",
    "topicCode": "MOTION_IN_2D",
    "topic": "Motion in 2D",
    "subtopic": "CAP-PHY-MOTION-2D",
    "exam": "ExamSide JEE Main",
    "year": "JEE Main 2024 (Online) 27th January Morning Shift",
    "paper": "Diagnostic Hub",
    "questionNumber": "EXAM-80",
    "section": "FAM-PHY-MOTION-2D",
    "markingScheme": "+3 / 0",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Motion in 2D",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "NUMERIC_QUANTITY",
    "stem": "A particle starts from origin at t=0 with a velocity 5i\u02c6m/s and moves in x\u2212y plane under action of a force which produces a constant acceleration of (3i\u02c6+2j\u02c6)m/s2 . If the x -coordinate of the particle at that instant is 84m , then the speed of the particle at this time is sqrt\u03b1m/s . The value of \u03b1 is _________.",
    "options": [],
    "hints": [
      "[METHOD] Given v\u2080\u2192 = 5 \u00ee m/s and a\u2192 = (3 \u00ee + 2 \u0135) m/s\u00b2.",
      "[METHOD] Horizontal position: x(t) = 5t + \u00bd(3)t\u00b2 = 84 &rArr; 1.5t\u00b2 + 5t - 84 = 0 &rArr; 3t\u00b2 + 10t - 168 = 0.",
      "[METHOD] Factor: (3t + 28)(t - 6) = 0 &rArr; t = 6 s."
    ],
    "steps": [
      "Given v\u2080\u2192 = 5 \u00ee m/s and a\u2192 = (3 \u00ee + 2 \u0135) m/s\u00b2.",
      "Horizontal position: x(t) = 5t + \u00bd(3)t\u00b2 = 84 &rArr; 1.5t\u00b2 + 5t - 84 = 0 &rArr; 3t\u00b2 + 10t - 168 = 0.",
      "Factor: (3t + 28)(t - 6) = 0 &rArr; t = 6 s.",
      "Velocities at t = 6 s: v_x = 5 + 3(6) = 23 m/s; v_y = 0 + 2(6) = 12 m/s.",
      "Speed squared \u03b1 = v_x\u00b2 + v_y\u00b2 = 23\u00b2 + 12\u00b2 = 529 + 144 = 673 &rArr; speed = \u221a673 m/s &rArr; \u03b1 = 673."
    ],
    "limitingCheck": "Independent check: re-derive from \"x(t) = v\u2080x t + \u00bd a_x t\u00b2,  v_x = v\u2080x + a_x t,  v_y = a_y t\" and verify that the stated data reproduce \u03b1 = 673. No unstated numerical parameter should be needed.",
    "check": "Independent check: re-derive from \"x(t) = v\u2080x t + \u00bd a_x t\u00b2,  v_x = v\u2080x + a_x t,  v_y = a_y t\" and verify that the stated data reproduce \u03b1 = 673. No unstated numerical parameter should be needed.",
    "trapWarning": "When position is given explicitly as a function of time, differentiate it directly; do not force a memorized constant-acceleration template onto it.",
    "correctKey": null,
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Physics)"
  },
  {
    "id": "EXAM-81",
    "code": "EXAM-81",
    "title": "ExamSide JEE Main \u00b7 Diagnostic Hub \u00b7 QEXAM-81 \u00b7 Motion in 2D",
    "subjectCode": "PHYS",
    "subject": "Physics",
    "topicCode": "MOTION_IN_2D",
    "topic": "Motion in 2D",
    "subtopic": "CAP-PHY-MOTION-2D",
    "exam": "ExamSide JEE Main",
    "year": "JEE Main 2023 (Online) 11th April Morning Shift",
    "paper": "Diagnostic Hub",
    "questionNumber": "EXAM-81",
    "section": "FAM-PHY-MOTION-2D",
    "markingScheme": "+3 / 0",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Motion in 2D",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "NUMERIC_QUANTITY",
    "stem": "A projectile fired at 30\u2218 to the ground is observed to be at same height at time 3s and 5s after projection, during its flight. The speed of projection of the projectile is ___________ ms\u22121 . (Given g=10ms\u22122 )",
    "options": [],
    "hints": [
      "[METHOD] A projectile reaches any given height h twice: once ascending at t\u2081 and once descending at t\u2082.",
      "[METHOD] By parabolic time symmetry: t\u2081 + t\u2082 = T (total time of flight).",
      "[METHOD] Given t\u2081 = 3 s and t\u2082 = 5 s &rArr; T = 3 + 5 = 8 s."
    ],
    "steps": [
      "A projectile reaches any given height h twice: once ascending at t\u2081 and once descending at t\u2082.",
      "By parabolic time symmetry: t\u2081 + t\u2082 = T (total time of flight).",
      "Given t\u2081 = 3 s and t\u2082 = 5 s &rArr; T = 3 + 5 = 8 s.",
      "Time of flight formula: T = (2u sin 30\u00b0) / g = [2u(0.5)] / 10 = u / 10.",
      "Equate: u / 10 = 8 &rArr; u = 80 m/s."
    ],
    "limitingCheck": "Independent check: re-derive from \"t\u2081 + t\u2082 = T = (2u sin \u03b8) / g\" and verify that the stated data reproduce 80 m/s. No unstated numerical parameter should be needed.",
    "check": "Independent check: re-derive from \"t\u2081 + t\u2082 = T = (2u sin \u03b8) / g\" and verify that the stated data reproduce 80 m/s. No unstated numerical parameter should be needed.",
    "trapWarning": "Resolve the launch velocity into components and check whether the formula's equal-level assumptions actually hold.",
    "correctKey": null,
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Physics)"
  },
  {
    "id": "EXAM-82",
    "code": "EXAM-82",
    "title": "ExamSide JEE Main \u00b7 Diagnostic Hub \u00b7 QEXAM-82 \u00b7 Motion in 2D",
    "subjectCode": "PHYS",
    "subject": "Physics",
    "topicCode": "MOTION_IN_2D",
    "topic": "Motion in 2D",
    "subtopic": "CAP-PHY-MOTION-2D",
    "exam": "ExamSide JEE Main",
    "year": "JEE Main 2023 (Online) 31st January Evening Shift",
    "paper": "Diagnostic Hub",
    "questionNumber": "EXAM-82",
    "section": "FAM-PHY-MOTION-2D",
    "markingScheme": "+3 / 0",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Motion in 2D",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "NUMERIC_QUANTITY",
    "stem": "Two bodies are projected from ground with same speeds 40ms\u22121 at two different angles with respect to horizontal. The bodies were found to have same range. If one of the body was projected at an angle of 60\u2218 , with horizontal then sum of the maximum heights, attained by the two projectiles, is m . (Given g=10ms\u22122 )",
    "options": [],
    "hints": [
      "[METHOD] For complementary launch angles: H\u2081 = (u\u00b2 sin\u00b2 \u03b8) / (2g), H\u2082 = (u\u00b2 cos\u00b2 \u03b8) / (2g).",
      "[METHOD] Sum: H\u2081 + H\u2082 = [u\u00b2 (sin\u00b2 \u03b8 + cos\u00b2 \u03b8)] / (2g) = u\u00b2 / (2g).",
      "[METHOD] Notice that the sum is completely independent of the angle \u03b8!"
    ],
    "steps": [
      "For complementary launch angles: H\u2081 = (u\u00b2 sin\u00b2 \u03b8) / (2g), H\u2082 = (u\u00b2 cos\u00b2 \u03b8) / (2g).",
      "Sum: H\u2081 + H\u2082 = [u\u00b2 (sin\u00b2 \u03b8 + cos\u00b2 \u03b8)] / (2g) = u\u00b2 / (2g).",
      "Notice that the sum is completely independent of the angle \u03b8!",
      "Substitute u = 40 m/s and g = 10 m/s\u00b2: H\u2081 + H\u2082 = 40\u00b2 / [2(10)] = 1600 / 20 = 80 m."
    ],
    "limitingCheck": "Independent check: re-derive from \"H\u2081 + H\u2082 = u\u00b2 / (2g)\" and verify that the stated data reproduce 80 m. No unstated numerical parameter should be needed.",
    "check": "Independent check: re-derive from \"H\u2081 + H\u2082 = u\u00b2 / (2g)\" and verify that the stated data reproduce 80 m. No unstated numerical parameter should be needed.",
    "trapWarning": "Do not invoke complementary-angle symmetry unless the launches have the same speed and the same launch/landing level; otherwise compare the governing expressions directly.",
    "correctKey": null,
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Physics)"
  },
  {
    "id": "EXAM-83",
    "code": "EXAM-83",
    "title": "ExamSide JEE Main \u00b7 Diagnostic Hub \u00b7 QEXAM-83 \u00b7 Motion in 2D",
    "subjectCode": "PHYS",
    "subject": "Physics",
    "topicCode": "MOTION_IN_2D",
    "topic": "Motion in 2D",
    "subtopic": "CAP-PHY-MOTION-2D",
    "exam": "ExamSide JEE Main",
    "year": "JEE Main 2023 (Online) 31st January Morning Shift",
    "paper": "Diagnostic Hub",
    "questionNumber": "EXAM-83",
    "section": "FAM-PHY-MOTION-2D",
    "markingScheme": "+3 / 0",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Motion in 2D",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "NUMERIC_QUANTITY",
    "stem": "The speed of a swimmer is 4kmh\u22121 in still water. If the swimmer makes his strokes normal to the flow of river of width 1km , he reaches a point 750m down the stream on the opposite bank. The speed of the river water is ___________ kmh\u22121",
    "options": [],
    "hints": [
      "[METHOD] Swimmer speed in still water v_s = 4 km/h, width d = 1 km.",
      "[METHOD] Strokes made normal to flow &rArr; crossing time t = d / v_s = 1 km / (4 km/h) = 0.25 hr = 15 min.",
      "[METHOD] Downstream drift x = 750 m = 0.75 km."
    ],
    "steps": [
      "Swimmer speed in still water v_s = 4 km/h, width d = 1 km.",
      "Strokes made normal to flow &rArr; crossing time t = d / v_s = 1 km / (4 km/h) = 0.25 hr = 15 min.",
      "Downstream drift x = 750 m = 0.75 km.",
      "River flow speed: v_r = x / t = 0.75 km / 0.25 hr = 3 km/h."
    ],
    "limitingCheck": "Independent check: re-derive from \"t = d / v_s,  x = v_r t\" and verify that the stated data reproduce 3 km/h. No unstated numerical parameter should be needed.",
    "check": "Independent check: re-derive from \"t = d / v_s,  x = v_r t\" and verify that the stated data reproduce 3 km/h. No unstated numerical parameter should be needed.",
    "trapWarning": "Keep a frame label on every velocity before adding or subtracting vectors; dropping the frame is the usual sign/direction error.",
    "correctKey": null,
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Physics)"
  },
  {
    "id": "EXAM-84",
    "code": "EXAM-84",
    "title": "ExamSide JEE Main \u00b7 Diagnostic Hub \u00b7 QEXAM-84 \u00b7 Motion in 2D",
    "subjectCode": "PHYS",
    "subject": "Physics",
    "topicCode": "MOTION_IN_2D",
    "topic": "Motion in 2D",
    "subtopic": "CAP-PHY-MOTION-2D",
    "exam": "ExamSide JEE Main",
    "year": "JEE Main 2022 (Online) 29th July Morning Shift",
    "paper": "Diagnostic Hub",
    "questionNumber": "EXAM-84",
    "section": "FAM-PHY-MOTION-2D",
    "markingScheme": "+3 / 0",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Motion in 2D",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "NUMERIC_QUANTITY",
    "stem": "An object is projected in the air with initial velocity u at an angle \u03b8 . The projectile motion is such that the horizontal range R, is maximum. Another object is projected in the air with a horizontal range half of the range of first object. The initial velocity remains same in both the case. The value of the angle of projection, at which the second object is projected, will be _________ degree.",
    "options": [],
    "hints": [
      "[METHOD] R_max=u\u00b2/g at 45\u00b0.",
      "[METHOD] For half that range, sin2\u03b8=1/2.",
      "[METHOD] The solutions are \u03b8=15\u00b0 and 75\u00b0; the numerical-answer key uses the smaller angle."
    ],
    "steps": [
      "R_max=u\u00b2/g at 45\u00b0.",
      "For half that range, sin2\u03b8=1/2.",
      "The solutions are \u03b8=15\u00b0 and 75\u00b0; the numerical-answer key uses the smaller angle."
    ],
    "limitingCheck": "Independent check: re-derive from \"R/R_max = sin2\u03b8.\" and verify that the stated data reproduce 15\u00b0 (75\u00b0 gives the same half-range mathematically; the numerical key selects 15\u00b0). No unstated numerical parameter should be needed.",
    "check": "Independent check: re-derive from \"R/R_max = sin2\u03b8.\" and verify that the stated data reproduce 15\u00b0 (75\u00b0 gives the same half-range mathematically; the numerical key selects 15\u00b0). No unstated numerical parameter should be needed.",
    "trapWarning": "Resolve the launch velocity into components and check whether the formula's equal-level assumptions actually hold.",
    "correctKey": null,
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Physics)"
  },
  {
    "id": "EXAM-85",
    "code": "EXAM-85",
    "title": "ExamSide JEE Main \u00b7 Diagnostic Hub \u00b7 QEXAM-85 \u00b7 Motion in 2D",
    "subjectCode": "PHYS",
    "subject": "Physics",
    "topicCode": "MOTION_IN_2D",
    "topic": "Motion in 2D",
    "subtopic": "CAP-PHY-MOTION-2D",
    "exam": "ExamSide JEE Main",
    "year": "JEE Main 2022 (Online) 27th July Morning Shift",
    "paper": "Diagnostic Hub",
    "questionNumber": "EXAM-85",
    "section": "FAM-PHY-MOTION-2D",
    "markingScheme": "+3 / 0",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Motion in 2D",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "NUMERIC_QUANTITY",
    "stem": "A ball of mass m is thrown vertically upward. Another ball of mass 2m is thrown at an angle \u03b8 with the vertical. Both the balls stay in air for the same period of time. The ratio of the heights attained by the two balls respectively is 1x . The value of x is _____________.",
    "options": [],
    "hints": [
      "[METHOD] Let the first ball's launch speed be u\u2081 and the second's vertical component be u\u2082 cos\u03b8 (angle measured from vertical).",
      "[METHOD] Equal times in air give u\u2081=u\u2082cos\u03b8.",
      "[METHOD] Their maximum heights are therefore equal, so H\u2081/H\u2082=1=1/x and x=1."
    ],
    "steps": [
      "Let the first ball's launch speed be u\u2081 and the second's vertical component be u\u2082 cos\u03b8 (angle measured from vertical).",
      "Equal times in air give u\u2081=u\u2082cos\u03b8.",
      "Their maximum heights are therefore equal, so H\u2081/H\u2082=1=1/x and x=1."
    ],
    "limitingCheck": "Independent check: re-derive from \"Equal flight times imply equal initial vertical velocity components; H=u_y\u00b2/(2g).\" and verify that the stated data reproduce x = 1. No unstated numerical parameter should be needed.",
    "check": "Independent check: re-derive from \"Equal flight times imply equal initial vertical velocity components; H=u_y\u00b2/(2g).\" and verify that the stated data reproduce x = 1. No unstated numerical parameter should be needed.",
    "trapWarning": "The stated angle is measured from the vertical; using it directly in a horizontal-angle formula swaps sine and cosine.",
    "correctKey": null,
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Physics)"
  },
  {
    "id": "EXAM-86",
    "code": "EXAM-86",
    "title": "ExamSide JEE Main \u00b7 Diagnostic Hub \u00b7 QEXAM-86 \u00b7 Motion in 2D",
    "subjectCode": "PHYS",
    "subject": "Physics",
    "topicCode": "MOTION_IN_2D",
    "topic": "Motion in 2D",
    "subtopic": "CAP-PHY-MOTION-2D",
    "exam": "ExamSide JEE Main",
    "year": "JEE Main 2022 (Online) 26th July Morning Shift",
    "paper": "Diagnostic Hub",
    "questionNumber": "EXAM-86",
    "section": "FAM-PHY-MOTION-2D",
    "markingScheme": "+3 / 0",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Motion in 2D",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "NUMERIC_QUANTITY",
    "stem": "If the initial velocity in horizontal direction of a projectile is unit vector i\u02c6 and the equation of trajectory is y=5x(1\u2212x) . The y component vector of the initial velocity is ______________ j\u02c6 . ( Take g=10m/s2)",
    "options": [],
    "hints": [
      "[METHOD] Given initial horizontal velocity u_x = 1 m/s (from \u00ee).",
      "[METHOD] Trajectory y = 5x(1 - x) = 5x - 5x\u00b2.",
      "[METHOD] Slope at launch (x = 0): dy/dx = tan \u03b8 = 5."
    ],
    "steps": [
      "Given initial horizontal velocity u_x = 1 m/s (from \u00ee).",
      "Trajectory y = 5x(1 - x) = 5x - 5x\u00b2.",
      "Slope at launch (x = 0): dy/dx = tan \u03b8 = 5.",
      "Initial vertical velocity component: u_y = u_x tan \u03b8 = 1 &times; 5 = 5 m/s.",
      "Vector form: u_y \u0135 = 5 \u0135."
    ],
    "limitingCheck": "Independent check: re-derive from \"y = 5x - 5x\u00b2 &rArr; dy/dx = tan \u03b8 = 5 - 10x\" and verify that the stated data reproduce 5 \u0135. No unstated numerical parameter should be needed.",
    "check": "Independent check: re-derive from \"y = 5x - 5x\u00b2 &rArr; dy/dx = tan \u03b8 = 5 - 10x\" and verify that the stated data reproduce 5 \u0135. No unstated numerical parameter should be needed.",
    "trapWarning": "When position is given explicitly as a function of time, differentiate it directly; do not force a memorized constant-acceleration template onto it.",
    "correctKey": null,
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Physics)"
  },
  {
    "id": "EXAM-87",
    "code": "EXAM-87",
    "title": "ExamSide JEE Main \u00b7 Diagnostic Hub \u00b7 QEXAM-87 \u00b7 Motion in 2D",
    "subjectCode": "PHYS",
    "subject": "Physics",
    "topicCode": "MOTION_IN_2D",
    "topic": "Motion in 2D",
    "subtopic": "CAP-PHY-MOTION-2D",
    "exam": "ExamSide JEE Main",
    "year": "JEE Main 2022 (Online) 26th June Morning Shift",
    "paper": "Diagnostic Hub",
    "questionNumber": "EXAM-87",
    "section": "FAM-PHY-MOTION-2D",
    "markingScheme": "+3 / 0",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Motion in 2D",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "NUMERIC_QUANTITY",
    "stem": "A fighter jet is flying horizontally at a certain altitude with a speed of 200 ms \u2212 1 . When it passes directly overhead an anti-aircraft gun, a bullet is fired from the gun, at an angle \u03b8 with the horizontal, to hit the jet. If the bullet speed is 400 m/s, the value of \u03b8 will be ___________ \u2218 .",
    "options": [],
    "hints": [
      "[METHOD] Fighter jet flies horizontally at constant speed v_jet = 200 m/s overhead.",
      "[METHOD] Bullet fired with speed v_bullet = 400 m/s at angle \u03b8 with horizontal to hit jet.",
      "[METHOD] For interception in the vertical line of sight, horizontal velocities must match so horizontal separation remains zero."
    ],
    "steps": [
      "Fighter jet flies horizontally at constant speed v_jet = 200 m/s overhead.",
      "Bullet fired with speed v_bullet = 400 m/s at angle \u03b8 with horizontal to hit jet.",
      "For interception in the vertical line of sight, horizontal velocities must match so horizontal separation remains zero.",
      "Condition: v_bullet cos \u03b8 = v_jet &rArr; 400 cos \u03b8 = 200 &rArr; cos \u03b8 = 1/2.",
      "Solve: \u03b8 = 60\u00b0."
    ],
    "limitingCheck": "Independent check: re-derive from \"v_bullet cos \u03b8 = v_jet\" and verify that the stated data reproduce \u03b8 = 60\u00b0. No unstated numerical parameter should be needed.",
    "check": "Independent check: re-derive from \"v_bullet cos \u03b8 = v_jet\" and verify that the stated data reproduce \u03b8 = 60\u00b0. No unstated numerical parameter should be needed.",
    "trapWarning": "Track signs, units, and the reference frame through the calculation; do not import a value or assumption that is absent from the stem.",
    "correctKey": null,
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Physics)"
  },
  {
    "id": "EXAM-88",
    "code": "EXAM-88",
    "title": "ExamSide JEE Main \u00b7 Diagnostic Hub \u00b7 QEXAM-88 \u00b7 Motion in 2D",
    "subjectCode": "PHYS",
    "subject": "Physics",
    "topicCode": "MOTION_IN_2D",
    "topic": "Motion in 2D",
    "subtopic": "CAP-PHY-MOTION-2D",
    "exam": "ExamSide JEE Main",
    "year": "JEE Main 2022 (Online) 24th June Evening Shift",
    "paper": "Diagnostic Hub",
    "questionNumber": "EXAM-88",
    "section": "FAM-PHY-MOTION-2D",
    "markingScheme": "+3 / 0",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Motion in 2D",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "NUMERIC_QUANTITY",
    "stem": "A body is projected from the ground at an angle of 45 \u2218 with the horizontal. Its velocity after 2s is 20 ms \u2212 1 . The maximum height reached by the body during its motion is __________ m. (use g = 10 ms \u2212 2 )",
    "options": [],
    "hints": [
      "[METHOD] Given |v(2)|=20 m/s: a\u00b2+(a\u221220)\u00b2=400.",
      "[METHOD] This gives 2a(a\u221220)=0; the physical launch has a=20 m/s, so u=20\u221a2 m/s.",
      "[METHOD] H=u_y\u00b2/(2g)=20\u00b2/(20)=20 m."
    ],
    "steps": [
      "Given |v(2)|=20 m/s: a\u00b2+(a\u221220)\u00b2=400.",
      "This gives 2a(a\u221220)=0; the physical launch has a=20 m/s, so u=20\u221a2 m/s.",
      "H=u_y\u00b2/(2g)=20\u00b2/(20)=20 m."
    ],
    "limitingCheck": "Independent check: re-derive from \"At \u03b8=45\u00b0, let a=u/\u221a2. Then v(2)\u00b2=a\u00b2+(a\u221220)\u00b2.\" and verify that the stated data reproduce 20 m. No unstated numerical parameter should be needed.",
    "check": "Independent check: re-derive from \"At \u03b8=45\u00b0, let a=u/\u221a2. Then v(2)\u00b2=a\u00b2+(a\u221220)\u00b2.\" and verify that the stated data reproduce 20 m. No unstated numerical parameter should be needed.",
    "trapWarning": "Resolve the launch velocity into components and check whether the formula's equal-level assumptions actually hold.",
    "correctKey": null,
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Physics)"
  },
  {
    "id": "EXAM-89",
    "code": "EXAM-89",
    "title": "ExamSide JEE Main \u00b7 Diagnostic Hub \u00b7 QEXAM-89 \u00b7 Motion in 2D",
    "subjectCode": "PHYS",
    "subject": "Physics",
    "topicCode": "MOTION_IN_2D",
    "topic": "Motion in 2D",
    "subtopic": "CAP-PHY-MOTION-2D",
    "exam": "ExamSide JEE Main",
    "year": "JEE Main 2021 (Online) 27th July Evening Shift",
    "paper": "Diagnostic Hub",
    "questionNumber": "EXAM-89",
    "section": "FAM-PHY-MOTION-2D",
    "markingScheme": "+3 / 0",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Motion in 2D",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "NUMERIC_QUANTITY",
    "stem": "A swimmer wants to cross a river from point A to point B. Line AB makes an angle of 30 \u2218 with the flow of river. Magnitude of velocity of the swimmer is same as that of the river. The angle \u03b8 with the line AB should be _________ \u2218 , so that the swimmer reaches point B.",
    "options": [],
    "hints": [
      "[METHOD] Let river flow define 0\u00b0. The required ground track AB is 30\u00b0 to the flow.",
      "[METHOD] Because swimmer speed equals river speed, their vector sum lies on the angle bisector, so the swimmer must head at 60\u00b0 to the flow.",
      "[METHOD] The angle between that heading and AB is 60\u00b0\u221230\u00b0=30\u00b0."
    ],
    "steps": [
      "Let river flow define 0\u00b0. The required ground track AB is 30\u00b0 to the flow.",
      "Because swimmer speed equals river speed, their vector sum lies on the angle bisector, so the swimmer must head at 60\u00b0 to the flow.",
      "The angle between that heading and AB is 60\u00b0\u221230\u00b0=30\u00b0."
    ],
    "limitingCheck": "Independent check: re-derive from \"For equal-magnitude swimmer and river velocities, the resultant direction bisects the angle between them.\" and verify that the stated data reproduce \u03b8 = 30\u00b0. No unstated numerical parameter should be needed.",
    "check": "Independent check: re-derive from \"For equal-magnitude swimmer and river velocities, the resultant direction bisects the angle between them.\" and verify that the stated data reproduce \u03b8 = 30\u00b0. No unstated numerical parameter should be needed.",
    "trapWarning": "Keep a frame label on every velocity before adding or subtracting vectors; dropping the frame is the usual sign/direction error.",
    "correctKey": null,
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Physics)"
  },
  {
    "id": "EXAM-90",
    "code": "EXAM-90",
    "title": "ExamSide JEE Main \u00b7 Diagnostic Hub \u00b7 QEXAM-90 \u00b7 Motion in 2D",
    "subjectCode": "PHYS",
    "subject": "Physics",
    "topicCode": "MOTION_IN_2D",
    "topic": "Motion in 2D",
    "subtopic": "CAP-PHY-MOTION-2D",
    "exam": "ExamSide JEE Main",
    "year": "JEE Main 2021 (Online) 18th March Morning Shift",
    "paper": "Diagnostic Hub",
    "questionNumber": "EXAM-90",
    "section": "FAM-PHY-MOTION-2D",
    "markingScheme": "+3 / 0",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Motion in 2D",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "NUMERIC_QUANTITY",
    "stem": "A person is swimming with a speed of 10 m/s at an angle of 120 \u2218 with the flow and reaches to a point directly opposite on the other side of the river. The speed of the flow is 'x' m/s. The value of 'x' to the nearest integer is __________.",
    "options": [],
    "hints": [
      "[METHOD] The swimmer's along-flow component is 10cos120\u00b0=\u22125 m/s.",
      "[METHOD] The river must supply +5 m/s to cancel it.",
      "[METHOD] Hence x=5 m/s."
    ],
    "steps": [
      "The swimmer's along-flow component is 10cos120\u00b0=\u22125 m/s.",
      "The river must supply +5 m/s to cancel it.",
      "Hence x=5 m/s."
    ],
    "limitingCheck": "Independent check: re-derive from \"For a directly opposite crossing, the net component along the river must be zero.\" and verify that the stated data reproduce 5 m/s. No unstated numerical parameter should be needed.",
    "check": "Independent check: re-derive from \"For a directly opposite crossing, the net component along the river must be zero.\" and verify that the stated data reproduce 5 m/s. No unstated numerical parameter should be needed.",
    "trapWarning": "Keep a frame label on every velocity before adding or subtracting vectors; dropping the frame is the usual sign/direction error.",
    "correctKey": null,
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Physics)"
  },
  {
    "id": "EXAM-91",
    "code": "EXAM-91",
    "title": "ExamSide JEE Main \u00b7 Diagnostic Hub \u00b7 QEXAM-91 \u00b7 Motion in 2D",
    "subjectCode": "PHYS",
    "subject": "Physics",
    "topicCode": "MOTION_IN_2D",
    "topic": "Motion in 2D",
    "subtopic": "CAP-PHY-MOTION-2D",
    "exam": "ExamSide JEE Main",
    "year": "JEE Main 2021 (Online) 16th March Evening Shift",
    "paper": "Diagnostic Hub",
    "questionNumber": "EXAM-91",
    "section": "FAM-PHY-MOTION-2D",
    "markingScheme": "+3 / 0",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Motion in 2D",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "NUMERIC_QUANTITY",
    "stem": "A swimmer can swim with velocity of 12 km/h in still water. Water flowing in a river has velocity 6 km/h. The direction with respect to the direction of flow of river water he should swim in order to reach the point on the other bank just opposite to his starting point is ____________ \u2218 . (Round off to the Nearest Integer) (Find the angle in degrees)",
    "options": [],
    "hints": [
      "[METHOD] Let \u03b8 be measured from the direction of river flow.",
      "[METHOD] To land directly opposite, the swimmer's upstream component must be 6 km/h: 12cos\u03b8=\u22126.",
      "[METHOD] cos\u03b8=\u22121/2, so \u03b8=120\u00b0."
    ],
    "steps": [
      "Let \u03b8 be measured from the direction of river flow.",
      "To land directly opposite, the swimmer's upstream component must be 6 km/h: 12cos\u03b8=\u22126.",
      "cos\u03b8=\u22121/2, so \u03b8=120\u00b0."
    ],
    "limitingCheck": "Independent check: re-derive from \"12 cos\u03b8 + 6 = 0 for zero downstream ground velocity.\" and verify that the stated data reproduce 120\u00b0. No unstated numerical parameter should be needed.",
    "check": "Independent check: re-derive from \"12 cos\u03b8 + 6 = 0 for zero downstream ground velocity.\" and verify that the stated data reproduce 120\u00b0. No unstated numerical parameter should be needed.",
    "trapWarning": "Keep a frame label on every velocity before adding or subtracting vectors; dropping the frame is the usual sign/direction error.",
    "correctKey": null,
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Physics)"
  },
  {
    "id": "EXAM-92",
    "code": "EXAM-92",
    "title": "ExamSide JEE Main \u00b7 Diagnostic Hub \u00b7 QEXAM-92 \u00b7 Motion in 2D",
    "subjectCode": "PHYS",
    "subject": "Physics",
    "topicCode": "MOTION_IN_2D",
    "topic": "Motion in 2D",
    "subtopic": "CAP-PHY-MOTION-2D",
    "exam": "ExamSide JEE Main",
    "year": "JEE Main 2026 (Online) 4th April Evening Shift",
    "paper": "Diagnostic Hub",
    "questionNumber": "EXAM-92",
    "section": "FAM-PHY-MOTION-2D",
    "markingScheme": "+3 / 0",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Motion in 2D",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "NUMERIC_QUANTITY",
    "stem": "A gun mounted on the ground fires bullets in all directions with same speed. The farthest distance the bullets could reach is 6.4 m. The speed of the bullets from the gun is ____ m/s. (take g=10 m/s2)",
    "options": [],
    "hints": [
      "[METHOD] Farthest distance on flat ground corresponds to maximum horizontal range R_max at \u03b8 = 45\u00b0.",
      "[METHOD] Formula: R_max = u\u00b2 / g &rArr; 6.4 = u\u00b2 / 10.",
      "[METHOD] Solve: u\u00b2 = 64 &rArr; u = 8 m/s."
    ],
    "steps": [
      "Farthest distance on flat ground corresponds to maximum horizontal range R_max at \u03b8 = 45\u00b0.",
      "Formula: R_max = u\u00b2 / g &rArr; 6.4 = u\u00b2 / 10.",
      "Solve: u\u00b2 = 64 &rArr; u = 8 m/s."
    ],
    "limitingCheck": "Independent check: re-derive from \"R_max = u\u00b2 / g\" and verify that the stated data reproduce 8 m/s. No unstated numerical parameter should be needed.",
    "check": "Independent check: re-derive from \"R_max = u\u00b2 / g\" and verify that the stated data reproduce 8 m/s. No unstated numerical parameter should be needed.",
    "trapWarning": "Track signs, units, and the reference frame through the calculation; do not import a value or assumption that is absent from the stem.",
    "correctKey": null,
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Physics)"
  },
  {
    "id": "EXAM-93",
    "code": "EXAM-93",
    "title": "ExamSide JEE Main \u00b7 Diagnostic Hub \u00b7 QEXAM-93 \u00b7 Motion in 2D",
    "subjectCode": "PHYS",
    "subject": "Physics",
    "topicCode": "MOTION_IN_2D",
    "topic": "Motion in 2D",
    "subtopic": "CAP-PHY-MOTION-2D",
    "exam": "ExamSide JEE Main",
    "year": "JEE Main 2020 (Online) 8th January Morning Slot",
    "paper": "Diagnostic Hub",
    "questionNumber": "EXAM-93",
    "section": "FAM-PHY-MOTION-2D",
    "markingScheme": "+3 / 0",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Motion in 2D",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "NUMERIC_QUANTITY",
    "stem": "A particle is moving along the x-axis with its coordinate with the time t given by x(t) = 10 + 8t - 3t^2. Another particle is moving along the y-axis with its coordinate as a function of time given by y(t) = 5 - 8t^3. At t = 1s, the speed of the second particle as measured in the frame of the first particle is given as sqrt(v). Then v (in m/s) is ______.",
    "options": [],
    "hints": [
      "[METHOD] First particle: v\u2081=(8\u22126t)\u00ee, so at 1 s v\u2081=2\u00ee m/s.",
      "[METHOD] Second particle: v\u2082=\u221224t\u00b2\u0135, so at 1 s v\u2082=\u221224\u0135 m/s.",
      "[METHOD] v\u2082/\u2081=\u22122\u00ee\u221224\u0135; speed\u00b2=4+576=580."
    ],
    "steps": [
      "First particle: v\u2081=(8\u22126t)\u00ee, so at 1 s v\u2081=2\u00ee m/s.",
      "Second particle: v\u2082=\u221224t\u00b2\u0135, so at 1 s v\u2082=\u221224\u0135 m/s.",
      "v\u2082/\u2081=\u22122\u00ee\u221224\u0135; speed\u00b2=4+576=580.",
      "Given speed=\u221av, the requested v is 580."
    ],
    "limitingCheck": "Independent check: re-derive from \"v_rel = v\u2082 \u2212 v\u2081.\" and verify that the stated data reproduce v = 580. No unstated numerical parameter should be needed.",
    "check": "Independent check: re-derive from \"v_rel = v\u2082 \u2212 v\u2081.\" and verify that the stated data reproduce v = 580. No unstated numerical parameter should be needed.",
    "trapWarning": "Keep a frame label on every velocity before adding or subtracting vectors; dropping the frame is the usual sign/direction error.",
    "correctKey": null,
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Physics)"
  },
  {
    "id": "M2D-NC-01",
    "code": "M2D-NC-01",
    "title": "NCERT \u00b7 NCERT Textbook \u00b7 QM2D-NC-01 \u00b7 Motion in 2D",
    "subjectCode": "PHYS",
    "subject": "Physics",
    "topicCode": "MOTION_IN_2D",
    "topic": "Motion in 2D",
    "subtopic": "CAP-MOTION-2D",
    "exam": "NCERT",
    "year": 2024,
    "paper": "NCERT Textbook",
    "questionNumber": "M2D-NC-01",
    "section": "FAM-MOTION-2D",
    "markingScheme": "+3 / 0",
    "difficultyBand": "D1",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Motion in 2D",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "NUMERIC_QUANTITY",
    "stem": "A particle travels from one end of a diameter to the opposite end along a semicircular path of radius r. What is the magnitude of its displacement?",
    "options": [],
    "hints": [
      "[METHOD] The displacement magnitude is 2r, the straight-line diameter joining the endpoints. The semicircle arc length is distance travelled, not displacement.",
      "[CONCEPT] Displacement = 2r, Distance = \u03c0r"
    ],
    "steps": [
      "The displacement magnitude is 2r, the straight-line diameter joining the endpoints. The semicircle arc length is distance travelled, not displacement."
    ],
    "limitingCheck": "Straight-line chord joining endpoints across a circle diameter is always 2r.",
    "check": "Straight-line chord joining endpoints across a circle diameter is always 2r.",
    "trapWarning": "Do not confuse the curved semicircular path length (distance) with the straight-line displacement between diameter endpoints.",
    "correctKey": null,
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Physics)"
  },
  {
    "id": "M2D-NC-02",
    "code": "M2D-NC-02",
    "title": "NCERT \u00b7 NCERT Textbook \u00b7 QM2D-NC-02 \u00b7 Motion in 2D",
    "subjectCode": "PHYS",
    "subject": "Physics",
    "topicCode": "MOTION_IN_2D",
    "topic": "Motion in 2D",
    "subtopic": "CAP-MOTION-2D",
    "exam": "NCERT",
    "year": 2024,
    "paper": "NCERT Textbook",
    "questionNumber": "M2D-NC-02",
    "section": "FAM-MOTION-2D",
    "markingScheme": "+3 / 0",
    "difficultyBand": "D1",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Motion in 2D",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "NUMERIC_QUANTITY",
    "stem": "A rider moves around a merry-go-round at constant speed. Is the rider's velocity constant? State the direction of the acceleration.",
    "options": [],
    "hints": [
      "[METHOD] No. The speed is constant but the velocity direction changes continuously. The acceleration is centripetal: it points toward the centre.",
      "[CONCEPT] a_c = v\u00b2 / R directed radially inward"
    ],
    "steps": [
      "No. The speed is constant but the velocity direction changes continuously. The acceleration is centripetal: it points toward the centre."
    ],
    "limitingCheck": "In uniform circular motion, acceleration is strictly perpendicular to velocity, directed toward the center.",
    "check": "In uniform circular motion, acceleration is strictly perpendicular to velocity, directed toward the center.",
    "trapWarning": "Constant speed does not imply constant velocity because velocity is a vector whose direction turns continuously.",
    "correctKey": null,
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Physics)"
  },
  {
    "id": "M2D-NC-03",
    "code": "M2D-NC-03",
    "title": "NCERT \u00b7 NCERT Textbook \u00b7 QM2D-NC-03 \u00b7 Motion in 2D",
    "subjectCode": "PHYS",
    "subject": "Physics",
    "topicCode": "MOTION_IN_2D",
    "topic": "Motion in 2D",
    "subtopic": "CAP-MOTION-2D",
    "exam": "NCERT",
    "year": 2024,
    "paper": "NCERT Textbook",
    "questionNumber": "M2D-NC-03",
    "section": "FAM-MOTION-2D",
    "markingScheme": "+3 / 0",
    "difficultyBand": "D1",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Motion in 2D",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "NUMERIC_QUANTITY",
    "stem": "When can the distance travelled equal the magnitude of displacement?",
    "options": [],
    "hints": [
      "[METHOD] When the motion is along a straight line in one direction without reversal; then the path length equals the start-to-finish separation.",
      "[CONCEPT] |\u0394r| = Distance only when motion is rectilinear in one direction without turning back"
    ],
    "steps": [
      "When the motion is along a straight line in one direction without reversal; then the path length equals the start-to-finish separation."
    ],
    "limitingCheck": "|\u0394r| <= Distance in all trajectories; equality holds only along a non-reversing straight path.",
    "check": "|\u0394r| <= Distance in all trajectories; equality holds only along a non-reversing straight path.",
    "trapWarning": "Any change in direction makes distance strictly greater than displacement magnitude.",
    "correctKey": null,
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Physics)"
  },
  {
    "id": "M2D-NC-04",
    "code": "M2D-NC-04",
    "title": "NCERT \u00b7 NCERT Textbook \u00b7 QM2D-NC-04 \u00b7 Motion in 2D",
    "subjectCode": "PHYS",
    "subject": "Physics",
    "topicCode": "MOTION_IN_2D",
    "topic": "Motion in 2D",
    "subtopic": "CAP-MOTION-2D",
    "exam": "NCERT",
    "year": 2024,
    "paper": "NCERT Textbook",
    "questionNumber": "M2D-NC-04",
    "section": "FAM-MOTION-2D",
    "markingScheme": "+3 / 0",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Motion in 2D",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "NUMERIC_QUANTITY",
    "stem": "A stone moves in a horizontal circle on a string. If the string suddenly breaks, in what direction does the stone move immediately after release?",
    "options": [],
    "hints": [
      "[METHOD] It moves along the tangent to the circle at the release point, in the direction of its instantaneous velocity.",
      "[CONCEPT] v_tangential by Newton's First Law of Motion"
    ],
    "steps": [
      "It moves along the tangent to the circle at the release point, in the direction of its instantaneous velocity."
    ],
    "limitingCheck": "Centrifugal outward flight is a fictitious frame artifact. In inertial frames, motion continues along the tangent line.",
    "check": "Centrifugal outward flight is a fictitious frame artifact. In inertial frames, motion continues along the tangent line.",
    "trapWarning": "The stone does not fly radially outward; it flies tangentially in the direction of its instantaneous velocity.",
    "correctKey": null,
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Physics)"
  },
  {
    "id": "M2D-NC-05",
    "code": "M2D-NC-05",
    "title": "NCERT \u00b7 NCERT Textbook \u00b7 QM2D-NC-05 \u00b7 Motion in 2D",
    "subjectCode": "PHYS",
    "subject": "Physics",
    "topicCode": "MOTION_IN_2D",
    "topic": "Motion in 2D",
    "subtopic": "CAP-MOTION-2D",
    "exam": "NCERT",
    "year": 2024,
    "paper": "NCERT Textbook",
    "questionNumber": "M2D-NC-05",
    "section": "FAM-MOTION-2D",
    "markingScheme": "+3 / 0",
    "difficultyBand": "D1",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Motion in 2D",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "NUMERIC_QUANTITY",
    "stem": "What provides the centripetal force for a planet revolving around the Sun, and what is the direction of its acceleration?",
    "options": [],
    "hints": [
      "[METHOD] The Sun's gravitational force provides the centripetal force. The planet's acceleration points toward the Sun.",
      "[CONCEPT] F_grav = G M m / r\u00b2 = m v\u00b2 / r"
    ],
    "steps": [
      "The Sun's gravitational force provides the centripetal force. The planet's acceleration points toward the Sun."
    ],
    "limitingCheck": "Centripetal acceleration is produced solely by the central gravitational force.",
    "check": "Centripetal acceleration is produced solely by the central gravitational force.",
    "trapWarning": "No forward tangential force is needed to keep the planet in orbit; inertia maintains forward speed while gravity turns the velocity vector.",
    "correctKey": null,
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Physics)"
  },
  {
    "id": "M2D-NC-06",
    "code": "M2D-NC-06",
    "title": "NCERT \u00b7 NCERT Textbook \u00b7 QM2D-NC-06 \u00b7 Motion in 2D",
    "subjectCode": "PHYS",
    "subject": "Physics",
    "topicCode": "MOTION_IN_2D",
    "topic": "Motion in 2D",
    "subtopic": "CAP-MOTION-2D",
    "exam": "NCERT",
    "year": 2024,
    "paper": "NCERT Textbook",
    "questionNumber": "M2D-NC-06",
    "section": "FAM-MOTION-2D",
    "markingScheme": "+3 / 0",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Motion in 2D",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "NUMERIC_QUANTITY",
    "stem": "Two stones start simultaneously from the same height. One is dropped and the other is thrown horizontally. Neglect air resistance. Which reaches the ground first?",
    "options": [],
    "hints": [
      "[METHOD] They reach the ground at the same time because their vertical motions start with the same vertical velocity (zero) and have the same acceleration g.",
      "[CONCEPT] h = (1/2) g t\u00b2 => t = sqrt(2h / g)"
    ],
    "steps": [
      "They reach the ground at the same time because their vertical motions start with the same vertical velocity (zero) and have the same acceleration g."
    ],
    "limitingCheck": "Orthogonal motions are completely independent: vertical motion is governed exclusively by gravity.",
    "check": "Orthogonal motions are completely independent: vertical motion is governed exclusively by gravity.",
    "trapWarning": "Horizontal velocity does not delay or hasten vertical free fall. Both vertical motions are identical.",
    "correctKey": null,
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Physics)"
  },
  {
    "id": "M2D-NC-07",
    "code": "M2D-NC-07",
    "title": "NCERT \u00b7 NCERT Textbook \u00b7 QM2D-NC-07 \u00b7 Motion in 2D",
    "subjectCode": "PHYS",
    "subject": "Physics",
    "topicCode": "MOTION_IN_2D",
    "topic": "Motion in 2D",
    "subtopic": "CAP-MOTION-2D",
    "exam": "NCERT",
    "year": 2024,
    "paper": "NCERT Textbook",
    "questionNumber": "M2D-NC-07",
    "section": "FAM-MOTION-2D",
    "markingScheme": "+3 / 0",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Motion in 2D",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "NUMERIC_QUANTITY",
    "stem": "Suppose Earth's gravitational pull on the Moon suddenly became zero and no other celestial body affected the Moon. What path would the Moon follow immediately afterward?",
    "options": [],
    "hints": [
      "[METHOD] It would move in a straight line tangent to its former orbit with its instantaneous velocity.",
      "[CONCEPT] F_net = 0 => uniform rectilinear motion along tangent"
    ],
    "steps": [
      "It would move in a straight line tangent to its former orbit with its instantaneous velocity."
    ],
    "limitingCheck": "By Newton's First Law, when net external force is zero, the body continues along the instantaneous tangent line.",
    "check": "By Newton's First Law, when net external force is zero, the body continues along the instantaneous tangent line.",
    "trapWarning": "Removing force eliminates acceleration, not velocity. The Moon does not stop or drift randomly.",
    "correctKey": null,
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Physics)"
  },
  {
    "id": "M2D-NC-08",
    "code": "M2D-NC-08",
    "title": "NCERT \u00b7 NCERT Textbook \u00b7 QM2D-NC-08 \u00b7 Motion in 2D",
    "subjectCode": "PHYS",
    "subject": "Physics",
    "topicCode": "MOTION_IN_2D",
    "topic": "Motion in 2D",
    "subtopic": "CAP-MOTION-2D",
    "exam": "NCERT",
    "year": 2024,
    "paper": "NCERT Textbook",
    "questionNumber": "M2D-NC-08",
    "section": "FAM-MOTION-2D",
    "markingScheme": "+3 / 0",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Motion in 2D",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "NUMERIC_QUANTITY",
    "stem": "The Sun attracts Earth gravitationally. Why does Earth not simply fall straight into the Sun?",
    "options": [],
    "hints": [
      "[METHOD] Earth has tangential velocity. Gravity continually bends that velocity toward the Sun, producing orbital motion rather than a straight radial fall.",
      "[CONCEPT] Curvature match: g_centripetal = v\u00b2 / R bends straight line into closed orbit"
    ],
    "steps": [
      "Earth has tangential velocity. Gravity continually bends that velocity toward the Sun, producing orbital motion rather than a straight radial fall."
    ],
    "limitingCheck": "Orbital motion is continual free fall around the central body due to sufficient tangential velocity.",
    "check": "Orbital motion is continual free fall around the central body due to sufficient tangential velocity.",
    "trapWarning": "Gravity does not fail to pull Earth; Earth is in perpetual free fall toward the Sun but its forward tangential speed keeps it in orbit.",
    "correctKey": null,
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Physics)"
  },
  {
    "id": "M2D-NC-09",
    "code": "M2D-NC-09",
    "title": "NCERT \u00b7 NCERT Textbook \u00b7 QM2D-NC-09 \u00b7 Motion in 2D",
    "subjectCode": "PHYS",
    "subject": "Physics",
    "topicCode": "MOTION_IN_2D",
    "topic": "Motion in 2D",
    "subtopic": "CAP-MOTION-2D",
    "exam": "NCERT",
    "year": 2024,
    "paper": "NCERT Textbook",
    "questionNumber": "M2D-NC-09",
    "section": "FAM-MOTION-2D",
    "markingScheme": "+3 / 0",
    "difficultyBand": "D2",
    "difficultyScore": 2,
    "difficultyBasis": "Problem from Motion in 2D",
    "cognitiveComponents": {
      "algebra_computational_load": 1,
      "concept_model_selection": 1,
      "reasoning_chain_length": 1,
      "representation_translation": 1,
      "trap_exception_sensitivity": 0
    },
    "qrtDemand": "VERIFY",
    "kind": "NUMERIC_QUANTITY",
    "stem": "A passenger tosses a coin vertically inside a moving train and the coin lands behind the passenger. What does that imply about the train's motion while the coin was airborne?",
    "options": [],
    "hints": [
      "[METHOD] The train accelerated forward while the coin was airborne; after release, the coin did not share the train's continuing forward acceleration.",
      "[CONCEPT] Horizontal inertia: v_coin = v_train(t0); x_train(t) > x_coin(t) => lands behind"
    ],
    "steps": [
      "The train accelerated forward while the coin was airborne; after release, the coin did not share the train's continuing forward acceleration."
    ],
    "limitingCheck": "In an accelerating frame, an apparent pseudo-force acts backward, or from the ground frame the train accelerates past the coin.",
    "check": "In an accelerating frame, an apparent pseudo-force acts backward, or from the ground frame the train accelerates past the coin.",
    "trapWarning": "Do not treat the coin as being blown backward by air; the train accelerated forward under the airborne coin.",
    "correctKey": null,
    "status": "RELEASED",
    "academicAdmission": "HOLD",
    "keyState": "WITHHELD_CLIENT_SIDE_FAULT_N09",
    "maxPoints": 3,
    "isCompetitive": true,
    "sourceOrigin": "Grade9v3.5 published canonical shard (Physics)"
  }
] as const;
