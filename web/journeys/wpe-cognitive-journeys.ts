/**
 * web/journeys/wpe-cognitive-journeys.ts
 * A32/A49/A54 — 13 Canonical + 8 Focused 6-Stage WPE Cognitive Transfer Journeys.
 *
 * Implements:
 * - 8 Core Journeys (C01–C08) from d3d4-self-tutor.js
 * - 5 Extension Journeys (E01–E05) from extension-learning.js
 * - 8 Focused/Gap Journeys (F01–F08) from focused-journeys.js & gap-journeys.js
 * - Strict 6-Stage Cognitive Protocol:
 *   1. PREDICT       — Qualitative prediction
 *   2. ATTEMPT       — Unassisted attempt with input fields
 *   3. RECONSTRUCT   — Compare against canonical worked derivations
 *   4. DIAGNOSE      — Self-diagnosis of misconceptions
 *   5. REPAIR        — Actionable repair formulation
 *   6. BOUNDARY_TEST — Changed-condition boundary verification
 * - 100% Native TypeScript & DOM Rendering — ZERO IFRAMES
 * - 12.7" Tablet Touch Ergonomics (>= 48px controls, >= 56px primary CTAs)
 *
 * All items on academic HOLD; no academic approval inferred from software validation.
 */

import { HIT_TARGET_MIN_PX, HIT_TARGET_PRIMARY_PX } from '../styles/tokens.ts';
import { escapeHtml, renderMathHtml } from '../runtime/rendering.ts';
import { evaluateWpeModel } from '../adapters/physics/models/wpe-oracles.ts';
import type { Core1BTransferDefinition, TaskDefinition } from './core1b.ts';
import type { ExactRef } from './core1b.ts';

export type CognitiveStage = 'PREDICT' | 'ATTEMPT' | 'RECONSTRUCT' | 'DIAGNOSE' | 'REPAIR' | 'BOUNDARY_TEST' | 'COMPLETE';

export interface JourneyField {
  readonly id: string;
  readonly type: string;
  readonly label: string;
  readonly options?: readonly string[];
  readonly hint?: string;
}

export interface WpeJourneyDefinition {
  readonly id: string;
  readonly title: string;
  readonly family: string;
  readonly category: 'CORE' | 'EXTENSION' | 'FOCUSED';
  readonly prediction: string;
  readonly hints: readonly string[];
  readonly fields: readonly JourneyField[];
  readonly worked: readonly (readonly [string, string])[];
  readonly rubric: readonly string[];
  readonly diagnoses: readonly string[];
  readonly diagnosisFeedback: readonly string[];
  readonly repairPrompt: string;
  readonly boundaryPrompt: string;
  readonly boundaryCheck: readonly string[];
}

export const WPE_COGNITIVE_JOURNEYS: readonly WpeJourneyDefinition[] = [
  {
    "id": "C01",
    "title": "Every force counts",
    "family": "MULTIFORCE_LEDGER",
    "category": "CORE",
    "prediction": "Which forces help the scooter move up the ramp, which oppose it, and which do no work? Will it speed up?",
    "hints": [
      "First choose the scooter as the system. Which way is its displacement while climbing?",
      "Assign a work sign to each force before calculating. The normal force is perpendicular to the ramp, but gravity is not.",
      "Add all signed work, then compare that total with the change in kinetic energy. Check whether the result permits motion from rest."
    ],
    "fields": [
      {
        "id": "system",
        "type": "select",
        "label": "What object are you following?",
        "options": [
          "The scooter",
          "Only the motor",
          "Only the friction",
          "I'm not sure"
        ]
      },
      {
        "id": "motor",
        "type": "select",
        "label": "Work done by the motor?",
        "options": [
          "Positive (+)",
          "Negative (−)",
          "Zero (0)",
          "I'm not sure"
        ]
      },
      {
        "id": "friction",
        "type": "select",
        "label": "Work done by friction?",
        "options": [
          "Positive (+)",
          "Negative (−)",
          "Zero (0)",
          "I'm not sure"
        ]
      },
      {
        "id": "gravity",
        "type": "select",
        "label": "Work done by gravity?",
        "options": [
          "Positive (+)",
          "Negative (−)",
          "Zero (0)",
          "I'm not sure"
        ]
      },
      {
        "id": "normal",
        "type": "select",
        "label": "Work done by the normal force?",
        "options": [
          "Positive (+)",
          "Negative (−)",
          "Zero (0)",
          "I'm not sure"
        ]
      },
      {
        "id": "netWork",
        "type": "number",
        "label": "Net work by all forces (J)",
        "hint": "Use + or − for the total."
      },
      {
        "id": "topSpeed",
        "type": "number",
        "label": "Speed at the top (m/s)",
        "hint": "You can use a rounded number."
      },
      {
        "id": "canReach",
        "type": "select",
        "label": "Will it reach the top?",
        "options": [
          "Yes",
          "No",
          "I'm not sure"
        ]
      },
      {
        "id": "reason",
        "type": "textarea",
        "label": "Explain your force arrows, energy ledger and reasoning",
        "hint": "You can write 'I'm not sure' and learn from the next step."
      }
    ],
    "worked": [
      [
        "Pick the system",
        "Follow the 3 kg scooter moving 2 m uphill. Its normal force is perpendicular to the slope."
      ],
      [
        "Make a four-force ledger",
        "Motor work = +15 × 2 = +30 J. Friction = −3 × 2 = −6 J. Gravity = −mgh = −3 × 10 × 0.5 = −15 J. Normal force = 0 J."
      ],
      [
        "Add all the work",
        "Net work = +30 − 6 − 15 + 0 = +9 J. It is incorrect to set friction work alone equal to the change in kinetic energy."
      ],
      [
        "Find the final speed",
        "It starts from rest, so initial kinetic energy is 0 J. Final kinetic energy = 9 J. Because ½ × 3 × v² = 9, v² = 6 and v ≈ 2.45 m/s. It reaches the top."
      ]
    ],
    "rubric": [
      "I followed the scooter as the system and identified all four forces.",
      "I matched each work sign to the scooter's uphill displacement.",
      "I included gravity and gave zero work to the perpendicular normal force.",
      "I used net work = change in kinetic energy to find speed."
    ],
    "diagnoses": [
      "I left gravity out of my ledger.",
      "I gave friction or gravity the wrong sign.",
      "I used only friction work instead of total work.",
      "I gave the normal force nonzero work.",
      "My model was fine; I want to double-check the arithmetic.",
      "I'm not sure what went wrong yet."
    ],
    "diagnosisFeedback": [
      "List motor, friction, gravity and normal force separately; choose the scooter as your system.",
      "Use the uphill displacement as the reference direction. Friction opposes it; gravity also removes energy as height rises.",
      "Only the sum of work by all forces equals ΔK. Rebuild your signed ledger before solving for speed.",
      "The normal force is perpendicular to the surface displacement, so its work is zero.",
      "Keep your force ledger; inspect signs, units and whether the final K is physically possible.",
      "Start with a free-body sketch and label each force's angle to displacement."
    ],
    "repairPrompt": "Write your corrected force ledger and final speed. Explain what you changed from your first try (or why no change was needed).",
    "boundaryPrompt": "Now the scooter's motor pulls with only 10 N uphill. Everything else is unchanged and it starts from rest. Can it climb the whole ramp? Explain using the energy ledger or the forces—not just yes or no.",
    "boundaryCheck": [
      "Motor work over a hypothetical full climb would be +10 × 2 = +20 J.",
      "Friction and gravity still require −6 J and −15 J, so net work over the full ramp would be −1 J.",
      "A scooter starting at rest has 0 J initial kinetic energy, and cannot finish with −1 J. It cannot climb the whole ramp without extra energy.",
      "Another check: downhill gravity component = mgh / 2 m = 7.5 N. Together with 3 N friction, resistance is 10.5 N, more than the motor's 10 N."
    ]
  },
  {
    "id": "C02",
    "title": "When the spring stops pushing",
    "family": "SPRING_CONTACT",
    "category": "CORE",
    "prediction": "At what point does the spring stop pushing? Will the cart's speed be the same at spring release and after the rough strip?",
    "hints": [
      "Split the journey into spring contact and travel beyond the spring. What marks the moment an unattached spring stops pushing?",
      "Calculate the stored elastic energy while compressed; use it to determine kinetic energy at release before adding any rough-strip losses.",
      "On the rough strip, the spring no longer supplies work. Deduct frictional work from the release kinetic energy and check whether K stays nonnegative."
    ],
    "fields": [
      {
        "id": "boundary",
        "type": "select",
        "label": "When does spring contact end?",
        "options": [
          "When the spring returns to natural length",
          "At the far end of the rough strip",
          "The spring keeps pushing forever",
          "I'm not sure"
        ]
      },
      {
        "id": "springEnergy",
        "type": "number",
        "label": "Initial spring energy (J)"
      },
      {
        "id": "releaseSpeed",
        "type": "number",
        "label": "Speed right when contact ends (m/s)"
      },
      {
        "id": "frictionWork",
        "type": "number",
        "label": "Work done by friction on the rough strip (J)",
        "hint": "Use a negative sign if it removes energy."
      },
      {
        "id": "finalSpeed",
        "type": "number",
        "label": "Speed at the end of the rough strip (m/s)"
      },
      {
        "id": "canCross",
        "type": "select",
        "label": "Can the cart cross the 0.50 m strip?",
        "options": [
          "Yes",
          "No",
          "I'm not sure"
        ]
      },
      {
        "id": "reason",
        "type": "textarea",
        "label": "Explain the two regions and the equations you chose",
        "hint": "Name the contact phase and the rough-strip phase. 'I'm not sure' is okay."
      }
    ],
    "worked": [
      [
        "Split the journey",
        "Region A: smooth contact as the spring goes from compressed to natural length. Region B: the 0.50 m rough strip after the cart is no longer touching the spring."
      ],
      [
        "Energy at spring release",
        "Stored spring energy = ½ × 200 × 0.10² = 1.00 J. In smooth contact it becomes 1.00 J of kinetic energy. For the 2 kg cart: ½ × 2 × v² = 1, so release speed = 1.00 m/s."
      ],
      [
        "Energy in the rough region",
        "The spring is no longer pushing. Friction work = −1 N × 0.50 m = −0.50 J, so final kinetic energy = 1.00 − 0.50 = 0.50 J."
      ],
      [
        "Check the speed and route",
        "½ × 2 × v² = 0.50, giving v = √0.50 ≈ 0.707 m/s. The cart still has positive kinetic energy at the strip's end, so it crosses."
      ]
    ],
    "rubric": [
      "I marked where the unattached spring reaches natural length and stops pushing.",
      "I found spring energy and release speed using the smooth contact phase only.",
      "I included friction only on the separate rough strip.",
      "I carried release kinetic energy into the second region and found final speed."
    ],
    "diagnoses": [
      "I kept adding spring force after contact ended.",
      "I added friction during the smooth spring-release section.",
      "I used the release speed again at the strip's far end.",
      "I mixed up spring energy, friction work or mass.",
      "My model was fine; I want to double-check the arithmetic.",
      "I'm not sure what went wrong yet."
    ],
    "diagnosisFeedback": [
      "Mark the natural-length point as the end of contact for an unattached spring.",
      "Use friction only where the track is rough; the initial spring contact phase is smooth.",
      "Write the separate energy balances for the release and the end of the rough strip.",
      "Check the elastic energy ½kx² and negative friction work before using K=½mv².",
      "Keep the two-region model; verify the square and square-root arithmetic.",
      "Sketch both regions with a clear boundary; list which forces act in each."
    ],
    "repairPrompt": "Redraw the contact boundary in words, then write a corrected two-region energy calculation and final speed. What changed?",
    "boundaryPrompt": "Make the rough strip 1.00 m long instead of 0.50 m, keeping friction at 1 N. The cart starts from rest with the same spring. Does it reach the far end with a nonzero speed? Explain what happens there.",
    "boundaryCheck": [
      "At spring release, the cart still has 1.00 J of kinetic energy.",
      "A 1.00 m strip with 1 N friction removes 1.00 J: friction work = −1.00 J.",
      "At the far end, kinetic energy would be exactly 0 J and speed 0 m/s. It reaches the endpoint and stops, but does not pass it with nonzero speed.",
      "A longer rough strip would require more energy than the cart has; without another push it cannot cross that longer strip."
    ]
  },
  {
    "id": "C03",
    "title": "Energy added each second",
    "family": "CONSTANT_POWER",
    "category": "CORE",
    "prediction": "With constant motor power, do we gain equal kinetic energy every second, equal speed every second, or both? Which graph will be straight?",
    "hints": [
      "Identify what the source controls: a fixed rate of energy transfer, not a fixed force. What are the units of watts?",
      "Write a K-versus-time table starting with the kinetic energy at t=0. Convert each K to speed only after that.",
      "Read graph slopes: K–time slope is power; v–time slope is acceleration; displacement–time slope is speed. These slopes need not have the same shape."
    ],
    "fields": [
      {
        "id": "powerMeaning",
        "type": "select",
        "label": "What does 18 W tell us?",
        "options": [
          "The motor adds 18 J every second",
          "The force is always 18 N",
          "The trolley gains 18 m/s every second",
          "I'm not sure"
        ]
      },
      {
        "id": "initialEnergy",
        "type": "number",
        "label": "Kinetic energy at the start (J)",
        "hint": "Remember: the trolley is already moving at 2 m/s."
      },
      {
        "id": "energyAt2",
        "type": "number",
        "label": "Total kinetic energy after 2 s (J)",
        "hint": "Include the initial kinetic energy."
      },
      {
        "id": "speedAt2",
        "type": "number",
        "label": "Speed after 2 s (m/s)",
        "hint": "A rounded decimal is fine."
      },
      {
        "id": "energyAt6",
        "type": "number",
        "label": "Total kinetic energy after 6 s (J)"
      },
      {
        "id": "speedAt6",
        "type": "number",
        "label": "Speed after 6 s (m/s)"
      },
      {
        "id": "energyGraph",
        "type": "select",
        "label": "Shape of kinetic energy against time?",
        "options": [
          "Straight rising line",
          "Curving line that flattens",
          "Horizontal line",
          "I'm not sure"
        ]
      },
      {
        "id": "speedGraph",
        "type": "select",
        "label": "Shape of speed against time?",
        "options": [
          "Straight rising line",
          "Rising curve that gradually flattens",
          "Horizontal line",
          "I'm not sure"
        ]
      },
      {
        "id": "distanceGraph",
        "type": "select",
        "label": "Shape of displacement against time?",
        "options": [
          "Straight rising line",
          "Rising curve that gets steeper",
          "Horizontal line",
          "I'm not sure"
        ]
      },
      {
        "id": "acceleration",
        "type": "select",
        "label": "Is acceleration constant?",
        "options": [
          "Yes",
          "No",
          "I'm not sure"
        ]
      },
      {
        "id": "reason",
        "type": "textarea",
        "label": "Show your time → energy → speed table and explain the three graph shapes",
        "hint": "It's okay to say 'I'm not sure' at any step."
      }
    ],
    "worked": [
      [
        "Start with the trolley's own energy",
        "The 3 kg trolley starts at 2 m/s. K₀ = ½ × 3 × 2² = 6 J. Power is 18 W = 18 J of added kinetic energy each second, not 18 N."
      ],
      [
        "Make a two-time energy table",
        "At 2 seconds, added energy = 18 × 2 = 36 J, total K = 6 + 36 = 42 J. At 6 seconds, added = 18 × 6 = 108 J, total K = 6 + 108 = 114 J."
      ],
      [
        "Turn energy into speed",
        "Using K = ½mv²: at 2 s, v² = 2 × 42 / 3 = 28, so v ≈ 5.29 m/s. At 6 s, v² = 2 × 114 / 3 = 76, so v ≈ 8.72 m/s."
      ],
      [
        "Choose the right graph shape",
        "K–time is a rising straight line (equal joules added each second). Speed–time rises but gradually flattens. Displacement–time rises and gets steeper because its slope is speed. You do not need to calculate exact distance."
      ],
      [
        "Check acceleration",
        "It is not constant: at positive speed, the driving force F = P / v gets smaller as the trolley speeds up. Constant power does not mean constant force or equal speed gains each second."
      ]
    ],
    "rubric": [
      "I used 18 W as joules per second and included the trolley's starting energy.",
      "I built both time → added energy → total kinetic energy → speed rows.",
      "I used the correct axes to describe the three different graph shapes.",
      "I explained why constant power does not mean constant acceleration."
    ],
    "diagnoses": [
      "I treated watts as newtons or as a fixed acceleration.",
      "I forgot the starting kinetic energy.",
      "I added the same speed each second instead of the same energy.",
      "I mixed up the speed, displacement and kinetic-energy graph shapes.",
      "My model was fine; I want to double-check the arithmetic.",
      "I'm not sure what went wrong yet."
    ],
    "diagnosisFeedback": [
      "Return to the units: watts are joules per second, not newtons or metres per second squared.",
      "The trolley is already moving. Compute K₀ from its mass and starting speed before adding energy.",
      "Use K=½mv² after each time row; equal energy increments do not mean equal speed increments.",
      "Name both axes before describing a graph: energy, speed and displacement have different slopes.",
      "Check the assumptions: net power is constant on a smooth track, but force P/v falls as speed grows.",
      "Start with the distinction between power, work and kinetic energy. Compare units before equations."
    ],
    "repairPrompt": "Correct the first wrong entry in your time–energy–speed table or your graph explanation. Give both speeds and say whether acceleration stays constant. What did you change?",
    "boundaryPrompt": "The SAME 3 kg trolley still starts at 2 m/s, but the motor now supplies 9 W (half the original power). What is its speed after 2 seconds? Does that make its acceleration constant? Explain.",
    "boundaryCheck": [
      "The trolley starts with K₀ = ½ × 3 × 2² = 6 J. The power is now 9 J/s.",
      "After 2 s it gains 9 × 2 = 18 J, so the total kinetic energy is 6 + 18 = 24 J.",
      "From ½ × 3 × v² = 24, we get v² = 16 and speed = 4 m/s.",
      "Acceleration is still not constant: the motor supplies constant power, so as speed grows its driving force F = P / v decreases. Power changed, not the kind of model."
    ]
  },
  {
    "id": "C04",
    "title": "Only the hanging part",
    "family": "DISTRIBUTED_MASS",
    "category": "CORE",
    "prediction": "As you pull the rope upward from 4 m hanging to 2 m hanging, what happens to the hanging mass and the position of its middle? Will this take as much work as lifting all of it?",
    "hints": [
      "Find the rope's mass per metre. Only the part below the edge contributes nonzero gravitational potential energy for the chosen zero.",
      "Draw two separate hanging pieces. In each, both the hanging mass and its centre depth depend on the hanging length.",
      "Find the potential energy in each picture relative to the platform, then subtract final minus initial for a very slow, frictionless lift."
    ],
    "fields": [
      {
        "id": "massPerMetre",
        "type": "number",
        "label": "Mass per metre of rope (kg/m)",
        "hint": "Divide the whole rope mass by the whole rope length."
      },
      {
        "id": "startMass",
        "type": "number",
        "label": "Mass hanging BEFORE the pull (kg)",
        "hint": "Only 4 m out of 8 m hangs at the start."
      },
      {
        "id": "startDepth",
        "type": "number",
        "label": "Depth of the hanging part's middle BEFORE (m below platform)"
      },
      {
        "id": "startU",
        "type": "number",
        "label": "Gravitational potential energy BEFORE (J)",
        "hint": "Choose platform height as zero. Below it is negative."
      },
      {
        "id": "endMass",
        "type": "number",
        "label": "Mass hanging AFTER the pull (kg)",
        "hint": "2 m still hangs. The hanging mass has changed."
      },
      {
        "id": "endDepth",
        "type": "number",
        "label": "Depth of the hanging part's middle AFTER (m below platform)"
      },
      {
        "id": "endU",
        "type": "number",
        "label": "Gravitational potential energy AFTER (J)"
      },
      {
        "id": "helperWork",
        "type": "number",
        "label": "Positive work by the helper (J)",
        "hint": "Take final potential energy minus initial potential energy."
      },
      {
        "id": "modelChoice",
        "type": "select",
        "label": "Which mass model did you use?",
        "options": [
          "Only the hanging mass in each state",
          "The whole 4 kg rope in both states",
          "The mass hanging at the start for both states",
          "I'm not sure"
        ]
      },
      {
        "id": "reason",
        "type": "textarea",
        "label": "Describe the two hanging-length pictures and explain how you found the work",
        "hint": "Describe the middle of each hanging piece. You may write 'I'm not sure'."
      }
    ],
    "worked": [
      [
        "Start with mass per metre",
        "The 8 m rope has 4 kg of mass, so 4 ÷ 8 = 0.5 kg per metre. Only the hanging length contributes energy below platform height."
      ],
      [
        "Draw the BEFORE state",
        "Initially 4 m hangs: hanging mass = 0.5 × 4 = 2 kg. Its middle is halfway down, at 2 m below the platform. With U = 0 on the platform, U_before = −2 × 10 × 2 = −40 J."
      ],
      [
        "Draw the AFTER state",
        "Only 2 m remains hanging: mass = 0.5 × 2 = 1 kg; its middle is 1 m below the platform. U_after = −1 × 10 × 1 = −10 J."
      ],
      [
        "Subtract final minus initial",
        "The helper pulls slowly on a smooth edge, so their positive work equals the rise in gravitational potential energy: (−10) − (−40) = +30 J."
      ],
      [
        "Explain the key decision",
        "Both the hanging mass and its centre-of-mass depth shrink. Using the entire 4 kg rope or the starting hanging mass for the final state would model the wrong picture."
      ]
    ],
    "rubric": [
      "I found the mass per metre and used only the mass actually hanging in each state.",
      "I placed the middle of each uniform hanging piece halfway down.",
      "I calculated a separate potential energy before and after, using the platform as zero.",
      "I subtracted final minus initial and explained why the helper's work is positive."
    ],
    "diagnoses": [
      "I treated the whole 4 kg rope as if it were hanging.",
      "I kept the hanging mass unchanged after pulling.",
      "I placed the middle at the bottom of the hanging piece.",
      "I mixed up the minus signs when subtracting potential energies.",
      "My model was fine; I want to double-check the arithmetic.",
      "I'm not sure what went wrong yet."
    ],
    "diagnosisFeedback": [
      "Use mass per metre times hanging length, not the mass of the rope already on the table.",
      "The hanging length changes, so hanging mass must be recalculated for the after-picture.",
      "For a uniform hanging piece, its centre is halfway down that piece.",
      "Use one fixed height-zero and calculate final potential energy minus initial potential energy.",
      "Keep the two-picture model and recheck arithmetic and signs.",
      "Make a before/after table with hanging length, mass, centre depth and U."
    ],
    "repairPrompt": "Write a corrected BEFORE and AFTER table with hanging mass, middle depth and potential energy, then the helper's work. Explain which picture or subtraction you fixed.",
    "boundaryPrompt": "Start with the SAME 8 m, 4 kg rope with 4 m hanging. Now pull it COMPLETELY onto the smooth platform (0 m hanging). How much work is needed, and why is this more than stopping with 2 m still hanging?",
    "boundaryCheck": [
      "The starting hanging part is unchanged: 2 kg, with its middle 2 m below the platform, so U_before = −40 J.",
      "If the rope is fully on the platform, 0 m hangs: U_after = 0 J.",
      "The slow helper's work is U_after − U_before = 0 − (−40) = +40 J.",
      "That exceeds the +30 J partial-lift case because the helper lifts the remaining hanging 2 m section as well. The full rope does not rise by one identical height."
    ]
  },
  {
    "id": "C05",
    "title": "Read the axes first",
    "family": "GRAPH_OPERATION",
    "category": "CORE",
    "prediction": "Which new graph card needs an area, and which two need a slope? What units should your answers use?",
    "hints": [
      "Read each graph's vertical and horizontal axis labels, then ask what UNIT the question wants. Force × distance makes joules; distance ÷ time makes metres per second.",
      "For the U–position graph, draw an arrow showing that potential rises to the right. A conservative force points opposite the direction of increasing potential. For card T, use only the requested 2–5 s interval."
    ],
    "fields": [
      {
        "id": "graphR",
        "type": "select",
        "label": "Card R: How do you find work from force against position?",
        "options": [
          "Area between the line and x-axis",
          "Slope of the line",
          "Area under a potential–position line",
          "I'm not sure"
        ]
      },
      {
        "id": "workR",
        "type": "number",
        "label": "Card R: Work over 0–4 m (J)",
        "hint": "The force rises from 0 N to 8 N. Think about a triangle."
      },
      {
        "id": "graphS",
        "type": "select",
        "label": "Card S: How do you find the conservative force from U against x?",
        "options": [
          "Area under the graph",
          "Negative slope of the line",
          "Positive slope of the line",
          "I'm not sure"
        ]
      },
      {
        "id": "forceS",
        "type": "number",
        "label": "Card S: Conservative force (N)",
        "hint": "Give a minus sign if the force points left."
      },
      {
        "id": "graphT",
        "type": "select",
        "label": "Card T: How do you find velocity from displacement against time?",
        "options": [
          "Area below the curve",
          "Slope of the segment from 2–5 s",
          "Slope of the entire 0–5 s span",
          "I'm not sure"
        ]
      },
      {
        "id": "speedT",
        "type": "number",
        "label": "Card T: Velocity from 2–5 s (m/s)"
      },
      {
        "id": "unitChoice",
        "type": "select",
        "label": "Which units belong to R, S and T, in that order?",
        "options": [
          "J, N, m/s",
          "N/m, J, m/s",
          "J, J, m",
          "I'm not sure"
        ]
      },
      {
        "id": "reason",
        "type": "textarea",
        "label": "Explain how the axes told you to use area or slope for all three cards",
        "hint": "Use the pattern: axes → operation → quantity → units. 'I'm not sure' is okay."
      }
    ],
    "worked": [
      [
        "R: read F against x",
        "The y-axis is force (N) and the x-axis is position (m). Work is the signed AREA under F–x. A triangle rising 0 to 8 N over 4 m has area ½ × 4 × 8 = +16 J. Its slope is NOT work."
      ],
      [
        "S: read U against x",
        "Potential energy rises from 2 J at 0 m to 8 J at 2 m. The slope is (8 − 2) ÷ (2 − 0) = +3 J/m, and a conservative force is the NEGATIVE slope: F = −3 N. The area under U–x is not work."
      ],
      [
        "T: read s against t",
        "Between 2 s and 5 s, displacement rises from 4 m to 16 m. The slope of THAT straight segment is (16 − 4) ÷ (5 − 2) = +4 m/s. The earlier 0–2 s part has a different slope and is not the interval asked."
      ],
      [
        "Check the meaning of units",
        "Force × position → N·m = J of work; change in potential energy ÷ position → J/m = N of force, with a minus sign; change in displacement ÷ time → m/s of velocity."
      ],
      [
        "What if the graph has a corner?",
        "Card T has a sharp join at 2 s. It has a well-defined slope from 2 to 5 s, but at the exact corner a single instantaneous slope is not defined. Always check which interval is requested."
      ]
    ],
    "rubric": [
      "I identified the horizontal and vertical axes and chose area, negative slope and slope, in that order.",
      "I used the triangular force–position AREA for +16 J of work instead of its line slope.",
      "I remembered the negative sign for the conservative force and got −3 N.",
      "I used only the 2–5 s segment and gave +4 m/s with the correct units."
    ],
    "diagnoses": [
      "I used the slope of the force–position graph as work.",
      "I used the area of the potential–position graph or forgot the negative force sign.",
      "I measured the full 0–5 s interval instead of the 2–5 s segment.",
      "I mixed up units or did not look at the axes first.",
      "My model was fine; I want to double-check the arithmetic.",
      "I'm not sure what went wrong yet."
    ],
    "diagnosisFeedback": [
      "Put the horizontal axis unit under the force graph. Multiply newtons by metres to get work; the line's slope has different units.",
      "Find the change in U divided by change in position, then reverse its sign to get conservative force. The U–x area does not represent force.",
      "Circle the requested 2–5 s interval, read its two displacement values and divide their difference by three seconds.",
      "Start each card with 'vertical axis / horizontal axis / operation / resulting unit' before doing any number work.",
      "Check your units and signs against the axes once more. If they match, keep the original reasoning and explain why.",
      "Use one card at a time and start from its axis names. A small table is enough; you don't need all three answers at once."
    ],
    "repairPrompt": "For each card, write its axes, the chosen operation and the physical answer with units. Circle in words the first wrong choice in your original explanation. What did you fix?",
    "boundaryPrompt": "Imagine Card R is drawn with the SAME rising triangle from 0 to 8 N over 4 horizontal units, but the horizontal axis is now TIME (0–4 s), not position. What does the AREA under a force–time graph represent? Is it still work? Give the quantity and unit.",
    "boundaryCheck": [
      "Read the altered axes FIRST: vertical F in newtons, horizontal t in seconds.",
      "The triangular area is still ½ × 4 × 8 = 16 numerically, but now its unit is N·s, not N·m.",
      "Area under FORCE–TIME is IMPULSE (change in momentum), so the result is +16 N·s for the shown positive force.",
      "It is NOT 16 J of work. A graph's meaning depends on its labeled axes, even when the shape looks identical."
    ]
  },
  {
    "id": "C06",
    "title": "Stay on the circle?",
    "family": "VERTICAL_CIRCLE",
    "category": "CORE",
    "prediction": "The ball has enough energy to be at the top height in a calculation. Does that alone prove its string can stay taut? At the top, which way is inward and can a string push?",
    "hints": [
      "Draw two arrows at the top of the circular path: one toward the centre and one in the direction of gravity. What direction would the tension in a taut string pull?",
      "First use the height rise from bottom to top to estimate top speed from energy. THEN compare the inward force it needs with the weight that already points inward. A string cannot provide an outward push."
    ],
    "fields": [
      {
        "id": "topInward",
        "type": "select",
        "label": "At the top of a vertical circle, which direction is toward its centre?",
        "options": [
          "Downward",
          "Upward",
          "Along its tangential velocity",
          "I'm not sure"
        ]
      },
      {
        "id": "heightRise",
        "type": "number",
        "label": "Height change from bottom to top (m)",
        "hint": "The rise is twice the circle's 1 m radius."
      },
      {
        "id": "candidateSpeedSquared",
        "type": "number",
        "label": "Candidate top speed squared, v² (m²/s²)",
        "hint": "Use energy only for a hypothetical taut circle: v_top² = v_bottom² − 4gr."
      },
      {
        "id": "candidateSpeed",
        "type": "number",
        "label": "Candidate top speed (m/s)"
      },
      {
        "id": "energyPossible",
        "type": "select",
        "label": "Does energy alone allow a ball to be at the top height?",
        "options": [
          "Yes",
          "No",
          "I'm not sure"
        ]
      },
      {
        "id": "radialEquation",
        "type": "select",
        "label": "Which equation is valid at the top WHILE the string is taut?",
        "options": [
          "T + mg = mv²/r",
          "T − mg = mv²/r",
          "T = mg + mv²/r",
          "I'm not sure"
        ]
      },
      {
        "id": "topTension",
        "type": "number",
        "label": "Calculated top string tension (N)",
        "hint": "A negative answer is a warning about the model."
      },
      {
        "id": "staysTaut",
        "type": "select",
        "label": "Can this string remain taut all the way over the top?",
        "options": [
          "Yes",
          "No",
          "I'm not sure"
        ]
      },
      {
        "id": "reason",
        "type": "textarea",
        "label": "Explain the two checks—energy AND inward force—and what your tension sign means",
        "hint": "Say what a real string can and cannot do. You may write 'I'm not sure'."
      }
    ],
    "worked": [
      [
        "Check the height with energy",
        "The top is 2r = 2 × 1 = 2 m higher than the bottom. For a hypothetical taut circle, v_top² = v_bottom² − 4gr = 7² − 4 × 10 × 1 = 9. So candidate top speed = 3 m/s. Energy ALONE would allow that height."
      ],
      [
        "Draw the top inward arrow",
        "At the very TOP, the centre of the circle is DOWNWARD. Both gravity mg and the taut-string tension T would point downward. The radial-force equation is T + mg = mv_top²/r."
      ],
      [
        "Check the force the string would need",
        "For 1 kg, g = 10 and r = 1: needed inward force mv²/r = 1 × 9 ÷ 1 = 9 N, while gravity alone pulls inward with 10 N. Thus T = 9 − 10 = −1 N."
      ],
      [
        "Interpret impossible negative tension",
        "A string can PULL but cannot PUSH. T = −1 N is not a real pulling tension. The imagined taut circular trajectory is impossible: the string goes slack BEFORE the top. After slackening, the bob is no longer constrained to the original circle."
      ],
      [
        "State the difference between tests",
        "The correct conclusion is NOT 'the ball has too little energy to reach the height'. The energy test passes, but the radial-force (taut-string) test fails. Both are needed for a full taut circle."
      ]
    ],
    "rubric": [
      "I used the 2 m rise and calculated the candidate top speed squared from energy.",
      "I marked inward as downward at the top and wrote T + mg = mv²/r.",
      "I calculated −1 N and recognized it as an impossible pulling tension, not a normal negative force.",
      "I concluded the string slackens before the top; energy alone does not guarantee a taut circle."
    ],
    "diagnoses": [
      "I assumed enough energy automatically means the ball stays on its circle.",
      "I drew the top inward direction or force signs incorrectly.",
      "I accepted negative tension as a real string pushing outward.",
      "I mixed up v²/r (inward acceleration) with tangential speed or acceleration.",
      "My model was fine; I want to double-check the arithmetic.",
      "I'm not sure what went wrong yet."
    ],
    "diagnosisFeedback": [
      "Separate the tests: reaching the top HEIGHT using energy is not the same as staying on the taut circular route.",
      "At the top, the centre is below the ball. Redraw downward gravity and downward string tension before forming the radial-force equation.",
      "A negative computed tension means the assumed taut-string model is invalid. A string cannot push; use this sign as a physical check.",
      "Speed is tangent to the circle while inward acceleration has magnitude v²/r. Label their directions separately before calculating.",
      "Recheck the 2r height difference, top-speed squared and force signs. Explain whether your initial model already did both tests.",
      "Try two small calculations: 'energy allows this height?' and 'tension can pull inward?' The second decision is what the first cannot answer."
    ],
    "repairPrompt": "Draw in words the top centre arrow and write BOTH the energy and radial-force checks. What must you correct about a negative tension and whether the string remains taut?",
    "boundaryPrompt": "Keep the SAME 1 kg ball and 1 m light string, but start it at the bottom at 8 m/s instead of 7 m/s. Compute candidate top v² and the top tension. Could the string remain taut through the top now? Explain both checks.",
    "boundaryCheck": [
      "For the hypothetical taut circle, v_top² = 8² − 4 × 10 × 1 = 64 − 40 = 24 m²/s². The energy test passes.",
      "At the top, inward is down and T + mg = mv²/r. Thus T = 1 × 24 / 1 − 1 × 10 = +14 N.",
      "The top tension is positive, so the string CAN remain taut at the top; under the ideal lossless conditions, the complete circular path is physically possible.",
      "For comparison, the ideal minimum bottom speed for a just-taut top is √(5gr) = √50 ≈ 7.07 m/s. Seven was slightly too low; eight is above it."
    ]
  },
  {
    "id": "C07",
    "title": "Momentum arrives every second",
    "family": "CONVEYOR_MOMENTUM_POWER",
    "category": "CORE",
    "prediction": "The chips arrive already moving right. Does the belt need to speed them up? Will extra motor power all become the chips' kinetic energy, or might some become heat?",
    "hints": [
      "Draw a one-second batch of arriving chips. Label their incoming horizontal speed and outgoing belt speed, and use kilograms EACH second rather than total chips accumulated.",
      "Calculate the force from mass-per-second × speed change. Motor power uses BELT speed, while kinetic-energy change uses both squared speeds. What is left over during slipping?"
    ],
    "fields": [
      {
        "id": "model",
        "type": "select",
        "label": "Which object or flow are you following?",
        "options": [
          "Incoming kilograms of chips each second",
          "All chips ever collected on the belt",
          "Only the empty belt",
          "I'm not sure"
        ]
      },
      {
        "id": "flowRate",
        "type": "number",
        "label": "Mass of new chips per second (kg/s)",
        "hint": "The feed rate equals half the numerical belt speed."
      },
      {
        "id": "deltaVelocity",
        "type": "number",
        "label": "Horizontal velocity gain per kilogram (m/s)",
        "hint": "Subtract incoming rightward speed from outgoing belt speed."
      },
      {
        "id": "pickupForce",
        "type": "number",
        "label": "Force needed on new chips (N)",
        "hint": "Flow rate multiplied by horizontal velocity gain."
      },
      {
        "id": "motorPower",
        "type": "number",
        "label": "Extra motor power for pickup (W)",
        "hint": "Force needed to hold belt speed × belt speed."
      },
      {
        "id": "chipEnergy",
        "type": "number",
        "label": "Rate of chips' horizontal kinetic-energy gain (W)",
        "hint": "½ × kilograms per second × (outgoing speed squared − incoming speed squared)."
      },
      {
        "id": "heatRate",
        "type": "number",
        "label": "Rate of heat during speed matching (W)",
        "hint": "Extra motor power minus chips' kinetic-energy-gain rate."
      },
      {
        "id": "energyModel",
        "type": "select",
        "label": "Where does the extra motor power go?",
        "options": [
          "Part to chips' kinetic energy and part to frictional heating",
          "All to chips' kinetic energy",
          "All to gravity",
          "I'm not sure"
        ]
      },
      {
        "id": "reason",
        "type": "textarea",
        "label": "Explain your incoming → outgoing momentum picture and the three power rates",
        "hint": "Start with kilograms each second, then explain why motor power is not equal to the chips' kinetic-energy gain. 'I'm not sure' is okay."
      }
    ],
    "worked": [
      [
        "Read the feed rate and arrival speed",
        "The belt speed is 4 m/s, so the feeder delivers 4 ÷ 2 = 2 kg of chips EACH SECOND. Chips arrive already moving right at 1 m/s and leave at 4 m/s: Δv = 4 − 1 = +3 m/s."
      ],
      [
        "Change momentum per second",
        "Horizontal force on the incoming stream is mass rate × Δv = 2 × (4 − 1) = +6 N. The chips push the belt backward with 6 N, so the motor must supply an extra 6 N forward to hold belt speed."
      ],
      [
        "Find pickup-related motor power",
        "Motor power = extra forward force × belt speed = 6 N × 4 m/s = 24 W. Use belt speed, NOT incoming chip speed, for this motor power."
      ],
      [
        "Compute kinetic-energy gain separately",
        "Each second, 2 kg of chips change speed from 1 to 4 m/s: gain rate = ½ × 2 × (4² − 1²) = 15 W. They did NOT start with zero horizontal kinetic energy."
      ],
      [
        "Balance input, gain and heat",
        "Motor pickup power = 24 W; chips' kinetic-energy-gain rate = 15 W. The difference is 9 W of frictional heat in this idealized pickup. Check: ½ × 2 × (4 − 1)² = 9 W, so 24 = 15 + 9."
      ]
    ],
    "rubric": [
      "I used kilograms arriving EACH SECOND, not all the accumulated chips, and included the nonzero incoming rightward velocity.",
      "I used force = mass flow rate × (outgoing speed − incoming speed), giving +6 N.",
      "I used BELT speed to find 24 W of extra motor power and distinguished that from 15 W of chips' kinetic-energy gain.",
      "I balanced the 9 W heat rate and explained the speed-matching friction."
    ],
    "diagnoses": [
      "I treated all chips already on the belt as the mass to accelerate.",
      "I forgot the incoming 1 m/s or ignored the given feed-rate rule.",
      "I used incoming speed rather than belt speed for motor power.",
      "I assumed all motor power becomes horizontal kinetic energy and forgot heat.",
      "My model was fine; I want to double-check the arithmetic.",
      "I'm not sure what went wrong yet."
    ],
    "diagnosisFeedback": [
      "Use a control-volume picture: count new kilograms per second, not the entire stock already riding the conveyor.",
      "Underline the 1 m/s incoming speed and the feed rule 'half the belt speed'. Recompute the horizontal velocity gain before force.",
      "The motor keeps the belt moving, so its pickup force moves at BELT speed. Recalculate mechanical power at that speed.",
      "Make a three-column energy ledger: motor input, chip kinetic-energy gain, and heat. Do not force the first two columns to match.",
      "Check units in each line: kg/s × m/s makes N; N × m/s makes W. Then test whether the three power entries balance.",
      "Start with two arrows, 'before' and 'after', and a small box labelled 'kg each second'. Keep each calculation separate."
    ],
    "repairPrompt": "Redraw the incoming → outgoing chip speeds in words. Recalculate the flow rate, force and the separate 24 W motor, 15 W kinetic gain and 9 W heat entries. Explain the first difference from your original attempt.",
    "boundaryPrompt": "The chips STILL arrive moving right at 1 m/s, and the feeder STILL delivers half the numerical belt speed in kg/s. But now the belt moves at 2 m/s instead of 4 m/s. Find the mass flow rate, pickup force, extra motor power, chips' kinetic-energy-gain rate and heat rate. Do all five merely halve? Why?",
    "boundaryCheck": [
      "At 2 m/s, the flow rate is 2 ÷ 2 = 1 kg/s. The chips' horizontal speed gain is 2 − 1 = 1 m/s.",
      "Force on incoming chips = 1 × 1 = +1 N. Extra motor pickup power = 1 N × 2 m/s = 2 W.",
      "Chips' horizontal kinetic-energy-gain rate = ½ × 1 × (2² − 1²) = 1.5 W.",
      "Heat rate = 2 − 1.5 = 0.5 W. Check: ½ × 1 × (2 − 1)² = 0.5 W.",
      "The numbers do NOT all halve, because the mass flow, belt speed and incoming-to-outgoing velocity DIFFERENCE all change. Other motor losses remain outside this idealized model."
    ]
  },
  {
    "id": "C08",
    "title": "What stays the same?",
    "family": "SPRING_CONTROLLED_VARIABLE",
    "category": "CORE",
    "prediction": "At equal compression, which pad looks stiffer from the 4 cm measurement? Will the stiffer pad store more energy under BOTH equal-extension and equal-final-force tests?",
    "hints": [
      "First convert 4 centimetres to metres. Infer each k from the lab measurement using final force divided by compression; the two tests come AFTER this measurement.",
      "Label Test X 'same compression' and Test Y 'same FINAL force'. For Y the softer spring compresses farther, so calculate each new x = F/k instead of reusing X's 5 cm."
    ],
    "fields": [
      {
        "id": "kBlue",
        "type": "number",
        "label": "Blue pad stiffness (N/m)",
        "hint": "4 cm is 0.04 m. Use k = final force ÷ compression."
      },
      {
        "id": "kGold",
        "type": "number",
        "label": "Gold pad stiffness (N/m)"
      },
      {
        "id": "testXChoice",
        "type": "select",
        "label": "Test X: both compressed by 5 cm. Which stores more energy?",
        "options": [
          "Blue pad",
          "Gold pad",
          "Same energy",
          "I'm not sure"
        ]
      },
      {
        "id": "xBlue",
        "type": "number",
        "label": "Test X: Blue elastic energy (J)",
        "hint": "Use ½ × k × 0.05²."
      },
      {
        "id": "xGold",
        "type": "number",
        "label": "Test X: Gold elastic energy (J)"
      },
      {
        "id": "testYChoice",
        "type": "select",
        "label": "Test Y: both reach 12 N FINAL force. Which stores more energy?",
        "options": [
          "Blue pad",
          "Gold pad",
          "Same energy",
          "I'm not sure"
        ]
      },
      {
        "id": "yBlueExtension",
        "type": "number",
        "label": "Test Y: Blue compression at final force (m)",
        "hint": "New compression = 12 N ÷ stiffness."
      },
      {
        "id": "yGoldExtension",
        "type": "number",
        "label": "Test Y: Gold compression at final force (m)"
      },
      {
        "id": "yBlue",
        "type": "number",
        "label": "Test Y: Blue elastic energy (J)",
        "hint": "At equal FINAL force use F² ÷ (2k), or ½ × final force × compression."
      },
      {
        "id": "yGold",
        "type": "number",
        "label": "Test Y: Gold elastic energy (J)"
      },
      {
        "id": "control",
        "type": "select",
        "label": "Why can the ranking reverse?",
        "options": [
          "Test X fixes compression; Test Y fixes FINAL force",
          "Both tests fix compression",
          "Both tests fix force throughout compression",
          "I'm not sure"
        ]
      },
      {
        "id": "reason",
        "type": "textarea",
        "label": "Explain how you inferred both stiffnesses and why the energy ranking switches",
        "hint": "Use a small table: fixed extension versus fixed final force. You can write 'I'm not sure'."
      }
    ],
    "worked": [
      [
        "Infer stiffness from the first measurements",
        "At a shared compression of 4 cm = 0.04 m, Blue needs 8 N so k_Blue = 8 ÷ 0.04 = 200 N/m. Gold needs 16 N so k_Gold = 16 ÷ 0.04 = 400 N/m. Gold is stiffer."
      ],
      [
        "Test X fixes compression, not force",
        "Both pads are compressed 5 cm = 0.05 m. Blue stores ½ × 200 × 0.05² = 0.25 J. Gold stores ½ × 400 × 0.05² = 0.50 J. GOLD, the stiffer pad, stores more at fixed compression."
      ],
      [
        "Test Y fixes FINAL force, not compression",
        "For the SAME final equilibrium force of 12 N: Blue compresses 12 ÷ 200 = 0.06 m; Gold compresses 12 ÷ 400 = 0.03 m. They do NOT have the same compression."
      ],
      [
        "Compute stored energy at equal final force",
        "Elastic energy is F² ÷ (2k). Blue stores 12² ÷ (2 × 200) = 0.36 J; Gold stores 12² ÷ (2 × 400) = 0.18 J. BLUE, the softer pad, stores more at fixed FINAL force."
      ],
      [
        "Explain the reversal and the loading triangle",
        "For fixed compression, U = ½kx² grows with k. For fixed final force, U = F²/(2k) falls with k. During slow loading the force rises from zero, so energy is ½ × final F × compression—not final F × compression."
      ]
    ],
    "rubric": [
      "I converted 4 cm to 0.04 m and inferred Blue 200 N/m and Gold 400 N/m.",
      "I labelled Test X as fixed 5 cm compression and calculated 0.25 J (Blue) and 0.50 J (Gold).",
      "I labelled Test Y as fixed FINAL 12 N force, found different final compressions, and calculated 0.36 J (Blue) and 0.18 J (Gold).",
      "I explained why the stiffer spring wins X but the softer wins Y, without treating final force as constant throughout slow loading."
    ],
    "diagnoses": [
      "I used centimetres as metres when inferring stiffness.",
      "I assumed the stiffer pad always stores more energy.",
      "I treated Test Y as though both pads had equal compression.",
      "I multiplied final force × compression instead of the triangular loading area.",
      "My model was fine; I want to double-check the arithmetic.",
      "I'm not sure what went wrong yet."
    ],
    "diagnosisFeedback": [
      "Remember: 4 cm is 0.04 m and 5 cm is 0.05 m. Recalculate k in N/m before the energy comparisons.",
      "Write 'same extension' over X and 'same final force' over Y. Each condition chooses a different comparison; stiffness alone does not choose the winner.",
      "Test Y must use each spring's own compression under 12 N. Find x = F/k for Blue and Gold, then use elastic energy.",
      "For a slowly increasing Hookean force, the area under the force–extension graph is a TRIANGLE: ½ × final force × extension.",
      "Check that both tests use slow loading and final equilibrium conditions. Review the ordering without erasing the first try.",
      "Start by writing what is held the SAME in each experiment; then calculate one spring at a time."
    ],
    "repairPrompt": "Circle in words what is fixed in X and Y. Make a corrected comparison table: each stiffness, both energies at 5 cm, then both energies at FINAL force 12 N and why the winner changes.",
    "boundaryPrompt": "Repeat Test Y with the SAME ideal pads, but slowly increase the FINAL force to 24 N (double 12 N). How many times larger does each stored energy become? Calculate Blue and Gold energies, name which pad stores more, and explain why.",
    "boundaryCheck": [
      "At a fixed stiffness, stored energy for a slowly increased FINAL force is F² ÷ (2k). Doubling F makes F² four times bigger.",
      "Blue at 24 N stores 24² ÷ (2 × 200) = 1.44 J, four times the former 0.36 J.",
      "Gold at 24 N stores 24² ÷ (2 × 400) = 0.72 J, four times the former 0.18 J.",
      "BLUE still stores more at the same FINAL force, because it is softer and compresses farther. This does not mean a suddenly applied constant 24 N force acts through the entire extension."
    ]
  },
  {
    "id": "E01",
    "title": "Potential wells: possible versus reachable",
    "family": "POTENTIAL_WELLS",
    "category": "EXTENSION",
    "prediction": "",
    "hints": [
      "Use the budget K = E − U. What sign must K have at any physically visited position?",
      "Make a short U table at x = +2, +1, 0, −1, −2 m before solving a long inequality.",
      "Shade the x-axis wherever the budget is possible. Starting at +2 m, trace a continuous path without jumping over any untested location."
    ],
    "fields": [
      {
        "id": "cross",
        "type": "select",
        "label": "Can it reach the valley near −2 m from +2 m?",
        "options": [
          "Choose a prediction",
          "Yes",
          "No",
          "Not sure"
        ]
      },
      {
        "id": "intervals",
        "type": "text",
        "label": "Allowed x intervals (m)",
        "hint": "Write both intervals; you may use √ and brackets."
      },
      {
        "id": "turns",
        "type": "text",
        "label": "Turning positions of the starting (right) region"
      },
      {
        "id": "maxSpeed",
        "type": "number",
        "label": "Largest speed possible on its journey (m/s)"
      },
      {
        "id": "reason",
        "type": "textarea",
        "label": "Why is or isn't the whole journey possible?"
      }
    ],
    "worked": [
      [
        "Check positions",
        "K ≥ 0 requires (q² − 4)² ≤ 9. Take the square-root inequality: −3 ≤ q² − 4 ≤ 3, hence 1 ≤ q² ≤ 7."
      ],
      [
        "Separate intervals",
        "The allowed x values are [−√7, −1] m and [1, √7] m. These are TWO disconnected regions."
      ],
      [
        "Follow the actual start",
        "At +2 m the bead occupies the right-hand region. Moving left, it turns at +1 m. The hill at 0 has U = 16 J, which exceeds its 9 J budget. The left valley is low but NOT reachable from that start."
      ],
      [
        "Calculate maximum speed",
        "At +2 m, U = 0, so its maximum accessible K = 9 J. For 2 kg, v = √(2 × 9/2) = 3 m/s. The right-hand turning points are +1 and +√7 m."
      ]
    ],
    "rubric": [],
    "diagnoses": [
      "I checked only the far destination.",
      "I forgot to inspect the hill between the valleys.",
      "I treated K = 0 as forbidden.",
      "I maximized speed at maximum U.",
      "I need to revise my algebra or units.",
      "My model worked; I want to explain it more clearly."
    ],
    "diagnosisFeedback": [],
    "repairPrompt": "",
    "boundaryPrompt": "",
    "boundaryCheck": [
      "At x = 0, U = 16 J. With E = 17 J, K = 1 J and v = √(2 × 1/2) = 1 m/s. The barrier is below E, so crossing is energetically possible. E = 16 J exactly is a special separatrix, not a guaranteed ordinary crossing."
    ]
  },
  {
    "id": "E02",
    "title": "Instantaneous power: force along motion",
    "family": "INSTANTANEOUS_POWER",
    "category": "EXTENSION",
    "prediction": "",
    "hints": [
      "Draw separate rightward and forward velocity arrows. Which force arrows have components in each direction?",
      "Make a two-column table: multiply each force's RIGHT component by 3, and FORWARD component by 4.",
      "Keep signs on resistance terms. Add the two component products for each force before adding the motor and resistance."
    ],
    "fields": [
      {
        "id": "motor",
        "type": "number",
        "label": "Motor instantaneous power (W)"
      },
      {
        "id": "resist",
        "type": "number",
        "label": "Resistance instantaneous power (W)"
      },
      {
        "id": "net",
        "type": "number",
        "label": "Net instantaneous power (W)"
      },
      {
        "id": "trend",
        "type": "select",
        "label": "Kinetic energy is...",
        "options": [
          "Choose",
          "Increasing now",
          "Decreasing now",
          "Unchanging now",
          "Not sure"
        ]
      },
      {
        "id": "reason",
        "type": "textarea",
        "label": "Show signed right/forward contributions, not just the final number"
      }
    ],
    "worked": [
      [
        "Motor",
        "Motor force = (+6, 0) N; velocity = (+3, +4) m/s. Motor power = 6×3 + 0×4 = +18 W."
      ],
      [
        "Resistance",
        "Resistance = (−2, −1) N, so resistance power = −2×3 −1×4 = −10 W."
      ],
      [
        "Net instantaneous result",
        "Net force = (+4, −1) N. Pnet = 4×3 − 1×4 = +8 W; kinetic energy is currently increasing at 8 J/s."
      ],
      [
        "Why magnitudes fail",
        "Speed magnitude is 5 m/s and net force magnitude is √17 N. Their product is NOT 8 W, because the vectors are not parallel. Only the force component along velocity transfers kinetic energy at that instant."
      ]
    ],
    "rubric": [],
    "diagnoses": [
      "I ignored the backward resistance.",
      "I multiplied magnitudes instead of matching components.",
      "I gave resistance the wrong sign.",
      "I claimed current power is future average power.",
      "I need to check arithmetic.",
      "I can explain perpendicular-force zero power better."
    ],
    "diagnosisFeedback": [],
    "repairPrompt": "",
    "boundaryPrompt": "",
    "boundaryCheck": [
      "Pnet = 4×1 −1×4 = 0 W. Speed is √(1² + 4²) = √17 m/s, not zero. Net force (+4, −1) N is nonzero and perpendicular to velocity, so acceleration exists but kinetic energy is instantaneously unchanged."
    ]
  },
  {
    "id": "E03",
    "title": "Spring contact → projectile flight",
    "family": "SPRING_PROJECTILE_TRANSITION",
    "category": "EXTENSION",
    "prediction": "",
    "hints": [
      "Mark two columns: while TOUCHING the spring, and after the dart LEAVES the platform.",
      "Compute the energy budget at natural length. For friction, work = opposing force × contact distance, with the correct sign.",
      "From horizontal launch, start with vertical fall h = ½gt². Then use horizontal speed times that duration."
    ],
    "fields": [
      {
        "id": "energy",
        "type": "number",
        "label": "Initially stored spring energy (J)"
      },
      {
        "id": "friction",
        "type": "number",
        "label": "Work of contact friction (J; include sign)"
      },
      {
        "id": "speed",
        "type": "number",
        "label": "Horizontal launch speed (m/s)"
      },
      {
        "id": "time",
        "type": "number",
        "label": "Flight time (s)"
      },
      {
        "id": "range",
        "type": "number",
        "label": "Horizontal landing distance (m)"
      },
      {
        "id": "reason",
        "type": "textarea",
        "label": "Where is the phase boundary, and which forces disappear?"
      }
    ],
    "worked": [
      [
        "Contact energy",
        "Stored energy = ½×125×0.20² = 2.50 J. Friction does −2.5×0.20 = −0.50 J, leaving 2.00 J of kinetic energy."
      ],
      [
        "Launch speed",
        "½×0.50×v² = 2.00, so vx = √8 ≈ 2.828 m/s. The spring and rubbing contact both end at launch."
      ],
      [
        "Fall time",
        "In the air, vertical drop is 1.25 = ½×10×t², so t = 0.50 s. Initial vertical speed is zero."
      ],
      [
        "Range and force change",
        "Range = vx t ≈ 2.828×0.50 = 1.414 m. Only gravity acts (ignoring air resistance); neither spring force nor contact friction continues during flight."
      ]
    ],
    "rubric": [],
    "diagnoses": [
      "I treated spring force as constant.",
      "I forgot contact friction or its sign.",
      "I carried spring/friction into flight.",
      "I used t = h/g.",
      "I mixed horizontal and vertical components.",
      "I want to improve my units or rounding."
    ],
    "diagnosisFeedback": [],
    "repairPrompt": "",
    "boundaryPrompt": "",
    "boundaryCheck": [
      "Without friction, kinetic energy at launch = 2.50 J. vx = √(2×2.50/0.50) = √10 ≈ 3.162 m/s. The fall time stays 0.50 s; range increases to ≈ 1.581 m."
    ]
  },
  {
    "id": "E04",
    "title": "Dissipative bouncing: energy is not speed",
    "family": "DISSIPATIVE_BOUNCES",
    "category": "EXTENSION",
    "prediction": "",
    "hints": [
      "Write a row for every impact: which energy-retention fraction applies to THIS row?",
      "After a rebound, the ball rises to the height corresponding to its remaining energy. Check whether a SPEED ratio must involve a square root.",
      "The first 2 m drop happens only once; every rebound contributes an upward and a downward journey. What repeats after the first impact?"
    ],
    "fields": [
      {
        "id": "h1",
        "type": "number",
        "label": "First rebound height (m)"
      },
      {
        "id": "h2",
        "type": "number",
        "label": "Second rebound height (m)"
      },
      {
        "id": "h3",
        "type": "number",
        "label": "Third rebound height (m)"
      },
      {
        "id": "distance",
        "type": "number",
        "label": "Total ideal vertical travel (m)"
      },
      {
        "id": "speedRatio",
        "type": "number",
        "label": "First post/pre impact speed magnitude ratio"
      },
      {
        "id": "reason",
        "type": "textarea",
        "label": "Explain the two retention rules and both-direction distance count"
      }
    ],
    "worked": [
      [
        "Switch rules carefully",
        "At first impact r0 = 0.75, so h1 = 0.75×2 = 1.5 m. Later r = 0.50, so h2 = 0.75 m and h3 = 0.375 m."
      ],
      [
        "Sum the repeated rises",
        "After the first special bounce, heights halve: 1.5 + 0.75 + 0.375 + … = 1.5/(1−0.5) = 3 m (optional infinite-series maths)."
      ],
      [
        "Include all travel",
        "The initial fall is 2 m. Rebounds go UP and DOWN, so D = 2 + 2×3 = 8 m, in the ideal model."
      ],
      [
        "Check rebound speed",
        "The first retained energy fraction is 0.75; speed ratio is √0.75 = √3/2 ≈ 0.866. It is not 0.75."
      ]
    ],
    "rubric": [],
    "diagnoses": [
      "I kept 75% for every bounce.",
      "I treated energy fraction as speed fraction.",
      "I missed the initial drop.",
      "I counted only upward travel.",
      "I used the wrong first term or ratio.",
      "I need to explain the ideal-model limit."
    ],
    "diagnosisFeedback": [],
    "repairPrompt": "",
    "boundaryPrompt": "",
    "boundaryCheck": [
      "Rebound heights form 1.5, 1.125, … m with ratio 0.75. Their sum is 1.5/(1−0.75) = 6 m; ideal travel D = 2 + 2×6 = 14 m. More retained energy means taller subsequent rebounds."
    ]
  },
  {
    "id": "E05",
    "title": "Radial force: graph area versus circular orbit",
    "family": "RADIAL_FORCE_POTENTIAL",
    "category": "EXTENSION",
    "prediction": "",
    "hints": [
      "On an inward FORCE MAGNITUDE versus radius graph, compare U between radii by counting the area underneath.",
      "Start at the U(0) reference. Split radial area into 0–2 m and 2–3 m; the second section slopes.",
      "For orbit speed, ignore earlier areas and read the FORCE at 3 m. Sketch perpendicular inward force and tangential velocity before using mv²/r."
    ],
    "fields": [
      {
        "id": "potential",
        "type": "number",
        "label": "U(3 m), using both graph areas (J)"
      },
      {
        "id": "localForce",
        "type": "number",
        "label": "Force magnitude at r = 3 m (N)"
      },
      {
        "id": "speed",
        "type": "number",
        "label": "Circular orbital speed (m/s)"
      },
      {
        "id": "kinetic",
        "type": "number",
        "label": "Circular kinetic energy (J)"
      },
      {
        "id": "total",
        "type": "number",
        "label": "Total energy of this circular orbit (J)"
      },
      {
        "id": "reason",
        "type": "textarea",
        "label": "Explain area versus force height, and the zero work around a circle"
      }
    ],
    "worked": [
      [
        "Build potential from radial areas",
        "First rectangle: 4×2 = 8 J. Next trapezoid from 2 to 3 m: ½(4+6)×1 = 5 J. Thus U(3) = 8 + 5 = 13 J."
      ],
      [
        "Read local force independently",
        "At 3 m, inward f(3) = 6 N. The circle condition is mv²/r = 6, so 2v²/3 = 6 and v = 3 m/s."
      ],
      [
        "Compute orbit energies",
        "K = ½×2×3² = 9 J. Total energy E(3) = U(3) + K = 13 + 9 = 22 J."
      ],
      [
        "Explain no circular work",
        "While the craft circles at constant radius, its force is inward but velocity tangential. F · v = 0. The area was an imagined RADIAL comparison, not energy continuously produced during each orbit."
      ]
    ],
    "rubric": [],
    "diagnoses": [
      "I counted only the last area section.",
      "I treated force height as potential energy.",
      "I used a rectangle instead of a trapezoid.",
      "I gave U a negative sign automatically.",
      "I used mv/r instead of mv²/r.",
      "I confused radial work with circular work."
    ],
    "diagnosisFeedback": [],
    "repairPrompt": "",
    "boundaryPrompt": "",
    "boundaryCheck": [
      "U(4) = 4×2 + ½(4+8)×2 = 8 + 12 = 20 J. Local force 8 N gives 2v²/4 = 8, so v = 4 m/s. K = ½×2×16 = 16 J and E(4) = 36 J. These are distinct circular-orbit states; the conservative force alone cannot change E from 22 to 36 J."
    ]
  },
  {
    "id": "F01",
    "title": "The force doing work is not always the net force",
    "family": "MULTIFORCE_LEDGER",
    "category": "FOCUSED",
    "prediction": "As the carriage speeds up, does cable power peak at the beginning or just before release? Is the net-force power the same as cable power? Explain your initial expectation.",
    "hints": [
      "Pause at the word 'supplied'. Which agent is supplying power? Draw its force separately from gravity.",
      "Before release, write a net-work ledger with TWO forces. A net kinetic-energy rate and the cable's delivered power have different owners.",
      "After release, do not use the cable. What energy remains at launch and where can it go?"
    ],
    "fields": [
      {
        "id": "model",
        "type": "select",
        "label": "Which force defines mechanical power supplied by the cable?",
        "options": [
          "Choose an idea",
          "Upward cable force T",
          "Net force T − mg",
          "Weight mg",
          "I'm not sure yet"
        ]
      },
      {
        "id": "netForce",
        "type": "number",
        "label": "Net upward force while attached (N)"
      },
      {
        "id": "acceleration",
        "type": "number",
        "label": "Upward acceleration while attached (m/s²)"
      },
      {
        "id": "speed",
        "type": "number",
        "label": "Speed just before release (m/s)"
      },
      {
        "id": "cablePower",
        "type": "number",
        "label": "Maximum cable power just before release (W)"
      },
      {
        "id": "netPower",
        "type": "number",
        "label": "Net instantaneous rate of change of K (W)"
      },
      {
        "id": "flightHeight",
        "type": "number",
        "label": "Additional height after release (m)"
      },
      {
        "id": "reason",
        "type": "textarea",
        "label": "Show your force arrows, phase boundary and why the two powers differ"
      }
    ],
    "worked": [
      [
        "0",
        "[\"During attachment\",\"Weight = 30 N down. Net upward force = 54 − 30 = 24 N, giving acceleration a = 24/3 = 8 m/s².\"]"
      ],
      [
        "1",
        "[\"Release speed\",\"Net work = 24×0.80 = 19.2 J = ½(3)v². Thus v² = 12.8 and v ≈ 3.578 m/s.\"]"
      ],
      [
        "2",
        "[\"Two distinct powers\",\"Cable power rises with v and just before detachment is 54√12.8 ≈ 193.2 W. Kinetic-energy rate then is 24√12.8 ≈ 85.9 W. Their 107.3 W difference is mgv, the instantaneous gravitational-energy increase.\"]"
      ],
      [
        "3",
        "[\"After detachment\",\"Cable power becomes 0. Gravity alone decelerates the carriage; additional rise h = v²/(2g) = 12.8/20 = 0.64 m. No power is added by the cable in flight.\"]"
      ]
    ],
    "rubric": [],
    "diagnoses": [],
    "diagnosisFeedback": [],
    "repairPrompt": "",
    "boundaryPrompt": "",
    "boundaryCheck": [
      "New net force 12 N, a = 4 m/s² and v² = 2×4×0.80 = 6.4. Release speed ≈ 2.530 m/s. Maximum cable power = 42×2.530 ≈ 106.3 W; net power at release = 12×2.530 ≈ 30.4 W. Extra rise = 6.4/(2×10) = 0.32 m. Less upward cable force reduces both launch speed and subsequent climb."
    ]
  },
  {
    "id": "F02",
    "title": "A rough incline uses two energy ledgers",
    "family": "MULTIFORCE_LEDGER",
    "category": "FOCUSED",
    "prediction": "Could the slider regain all its starting kinetic energy simply because it returns to the same height? Where is energy irreversibly lost?",
    "hints": [
      "The slider starts and finishes at the same height. Which force's TOTAL round-trip work must therefore be zero?",
      "Make one equation for initial kinetic energy spent uphill and a different one for kinetic energy acquired downhill. Friction opposes each velocity.",
      "Use the two measured kinetic energies to eliminate the unknown turning distance BEFORE solving for the friction coefficient."
    ],
    "fields": [
      {
        "id": "model",
        "type": "select",
        "label": "What is the correct work ledger for one full round trip?",
        "options": [
          "Choose an idea",
          "Gravity cancels, friction loses energy on both legs",
          "Gravity and friction each cancel",
          "Only uphill friction counts",
          "I'm not sure yet"
        ]
      },
      {
        "id": "mu",
        "type": "number",
        "label": "Coefficient of kinetic friction μ"
      },
      {
        "id": "distance",
        "type": "number",
        "label": "Distance along incline to the turning point (m)"
      },
      {
        "id": "ratio",
        "type": "number",
        "label": "Return speed / initial speed"
      },
      {
        "id": "reason",
        "type": "textarea",
        "label": "Describe how gravity and friction act on each leg and check that downhill motion is possible"
      }
    ],
    "worked": [
      [
        "0",
        "[\"Make two distinct ledgers\",\"Uphill: 18 = mgd(sin37° + μcos37°). Downhill: 2 = mgd(sin37° − μcos37°). The +/− signs change for gravity, not for friction as a loss.\"]"
      ],
      [
        "1",
        "[\"Eliminate the distance\",\"Divide: 2/18 = (0.6−0.8μ)/(0.6+0.8μ). Thus (1/9)(0.6+0.8μ) = 0.6−0.8μ, giving μ = 0.6.\"]"
      ],
      [
        "2",
        "[\"Recover distance and speed ratio\",\"Uphill: 18 = (2×10)d(0.6 + 0.6×0.8) = 21.6d, hence d = 5/6 ≈ 0.833 m. The speed ratio is √(2/18) = 1/3.\"]"
      ],
      [
        "3",
        "[\"Check physical return\",\"μ = 0.6 is less than tan37° = 0.75, so gravity's down-slope component exceeds kinetic friction. With static release assumed, descending motion is possible. Energy lost to friction on each leg is μmgd cosθ = 8 J; 18 − 2×8 = 2 J.\"]"
      ]
    ],
    "rubric": [],
    "diagnoses": [],
    "diagnosisFeedback": [],
    "repairPrompt": "",
    "boundaryPrompt": "",
    "boundaryCheck": [
      "At 45°, Kreturn/Kinitial = (1−0.6)/(1+0.6) = 0.25. Thus speed ratio = √0.25 = 0.5 and return kinetic energy = 18×0.25 = 4.5 J. Compared with 37°, the steeper ramp gives gravity a larger share relative to friction over the climb and return."
    ]
  },
  {
    "id": "F03",
    "title": "When an applied force reverses, the equilibrium moves",
    "family": "SPRING_CONTROLLED_VARIABLE",
    "category": "FOCUSED",
    "prediction": "Does the slider instantly jump to its new force-balance position when the force switches? Which way will it initially accelerate?",
    "hints": [
      "Choose RIGHT as positive. What is the sign of the newly applied force? Does the slider's location change during the switch?",
      "Set NEW spring force + NEW applied force to zero to locate the NEW equilibrium. Compare it with the initial held position.",
      "A frictionless spring moving under a constant force has two turning points symmetric about its equilibrium. Use the unchanged initial x and v=0 as one endpoint."
    ],
    "fields": [
      {
        "id": "model",
        "type": "select",
        "label": "What must stay continuous during an instantaneous force switch without impulse?",
        "options": [
          "Choose an idea",
          "Position and velocity",
          "Old equilibrium position",
          "Old potential-energy formula",
          "I'm not sure yet"
        ]
      },
      {
        "id": "force",
        "type": "number",
        "label": "New applied force Fnew with right-positive sign (N)"
      },
      {
        "id": "eq",
        "type": "number",
        "label": "New equilibrium x_eq (m; signed)"
      },
      {
        "id": "turn",
        "type": "number",
        "label": "Other turning position x_other (m; signed)"
      },
      {
        "id": "energy",
        "type": "number",
        "label": "New effective potential Ueff at the initial x=+0.05 m (J)"
      },
      {
        "id": "reason",
        "type": "textarea",
        "label": "Explain the force switch, new equilibrium and turning point"
      }
    ],
    "worked": [
      [
        "0",
        "[\"Switch force correctly\",\"Initially x=+0.05 m, and the holding force is +4 N. After the non-impulsive switch Fnew = −12 N, but x stays +0.05 m and v stays zero.\"]"
      ],
      [
        "1",
        "[\"Locate the new equilibrium\",\"Force balance −80x_eq −12 = 0 gives x_eq = −0.15 m, a compressed position.\"]"
      ],
      [
        "2",
        "[\"Find far turning point\",\"The initial point is 0.20 m RIGHT of new equilibrium. The other extremum is 0.20 m LEFT: x_other = −0.15−0.20 = −0.35 m. It is a compression, not an extension.\"]"
      ],
      [
        "3",
        "[\"Check new energy\",\"Ueff(x)=½(80)x²−(−12)x=40x²+12x J (x in metres). At initial x=+0.05: Ueff=0.10+0.60=0.70 J. At x=−0.35: Ueff=4.90−4.20=0.70 J, with K=0 at both endpoints.\"]"
      ]
    ],
    "rubric": [],
    "diagnoses": [],
    "diagnosisFeedback": [],
    "repairPrompt": "",
    "boundaryPrompt": "",
    "boundaryCheck": [
      "With Fnew=0, x_eq=0 and Ueff=½kx². Starting from rest at +0.05 m, the equal-energy opposite turn is x_other=−0.05 m. Its maximum compression is only 5 cm, compared with 35 cm under the continuous leftward 12 N force."
    ]
  },
  {
    "id": "F04",
    "title": "Two moving blocks: shared travel versus stretch",
    "family": "SPRING_CONTACT",
    "category": "FOCUSED",
    "prediction": "Can the entire initial kinetic energy turn into spring potential when the pair's total momentum is not zero? What will still be moving at maximum extension?",
    "hints": [
      "Pause at the word 'internal'. What changes the blocks' separation: the whole pair moving or the difference in their velocities?",
      "Choose the COM frame, then identify which kinetic-energy part remains even at a relative turning point.",
      "With m₁ and m₂ unequal, compute reduced mass. Use only their relative kinetic energy for spring stretch."
    ],
    "fields": [
      {
        "id": "model",
        "type": "select",
        "label": "Choose the energy model for internal spring elongation",
        "options": [
          "Choose an idea",
          "Relative kinetic energy ½μ(u₁−u₂)²",
          "Total kinetic energy of both blocks",
          "Only the lighter block's kinetic energy",
          "I'm not sure yet"
        ]
      },
      {
        "id": "com",
        "type": "number",
        "label": "Centre-of-mass speed V with right-positive sign (m/s)"
      },
      {
        "id": "mu",
        "type": "number",
        "label": "Reduced mass μ (kg)"
      },
      {
        "id": "relative",
        "type": "number",
        "label": "Relative kinetic energy available to the spring (J)"
      },
      {
        "id": "extension",
        "type": "number",
        "label": "First maximum spring elongation (m)"
      },
      {
        "id": "reason",
        "type": "textarea",
        "label": "Draw the motion of both blocks at maximum elongation and explain what energy remains"
      }
    ],
    "worked": [
      [
        "0",
        "[\"What stays moving\",\"V=(1×4 + 3×(−2))/(1+3)=−0.5 m/s. At maximum elongation both blocks move LEFT together at −0.5 m/s, so translational kinetic energy remains ½(4)(.5²)=0.5 J.\"]"
      ],
      [
        "1",
        "[\"Internal mass and speed\",\"μ=(1×3)/(4)=0.75 kg and w=4−(−2)=6 m/s. Thus Krel=½(.75)(36)=13.5 J.\"]"
      ],
      [
        "2",
        "[\"Check full energy\",\"Initial total kinetic energy is ½(1)(16)+½(3)(4)=14 J, correctly splitting into 0.5 J COM + 13.5 J relative.\"]"
      ],
      [
        "3",
        "[\"Use spring's share only\",\"½(6)x²=13.5 J gives x=√4.5≈2.121 m. The far turn means relative speed 0, NOT each speed 0.\"]"
      ]
    ],
    "rubric": [],
    "diagnoses": [],
    "diagnosisFeedback": [],
    "repairPrompt": "",
    "boundaryPrompt": "",
    "boundaryCheck": [
      "New μ=0.5 kg, w=6 m/s and Krel=½(.5)(36)=9 J. Hence x=√(2×9/6)=√3≈1.732 m. New COM velocity=(4−2)/2=+1 m/s, different from the original −0.5. Lower reduced mass makes the relative energy, and hence the maximum extension, smaller."
    ]
  },
  {
    "id": "F05",
    "title": "A heavy spring has many different speeds",
    "family": "DISTRIBUTED_MASS",
    "category": "FOCUSED",
    "prediction": "Would dividing the spring into many smaller pieces make the total kinetic energy approach the energy of a point mass moving at 4 m/s, half that, or less? Why?",
    "hints": [
      "Draw the wall and free end. Ask whether a piece near the wall can have the same speed as the free tip.",
      "Imagine four equal-mass slices and assign each the local midpoint speed. Does energy depend on v or on v²?",
      "Turn the slice sum into an integral in s=y/L, using dK=½v(s)²dm. Do not replace the distribution by average velocity before squaring."
    ],
    "fields": [
      {
        "id": "model",
        "type": "select",
        "label": "What profile is justified by the stated uniform stretching model?",
        "options": [
          "Choose an idea",
          "Velocity rises linearly from 0 at the fixed end",
          "Every coil moves at the tip speed",
          "Every coil moves at half the tip speed",
          "I'm not sure yet"
        ]
      },
      {
        "id": "speed",
        "type": "number",
        "label": "Speed at ¾L (m/s)"
      },
      {
        "id": "energy",
        "type": "number",
        "label": "Continuum spring kinetic energy (J)"
      },
      {
        "id": "effective",
        "type": "number",
        "label": "Equivalent mass at tip speed (kg)"
      },
      {
        "id": "factor",
        "type": "number",
        "label": "Point-mass shortcut / true spring K ratio"
      },
      {
        "id": "reason",
        "type": "textarea",
        "label": "Explain the slice velocities and why the square must be averaged before multiplying by mass"
      }
    ],
    "worked": [
      [
        "0",
        "[\"Local speed and assumption\",\"Under affine stretch, v(y)=4(y/L) m/s, so at y=¾L, v=3 m/s. The endpoint speed alone would not determine this without the stated profile.\"]"
      ],
      [
        "1",
        "[\"Integrate the distributed mass\",\"dm=(2.4/L)dy, so K=½(2.4)(4²)∫₀¹s²ds=(½)(2.4)(16)/3=6.4 J.\"]"
      ],
      [
        "2",
        "[\"Equivalent kinetic mass\",\"½m_eff(4²)=6.4 gives m_eff=0.8 kg=m/3. The spring remains physically 2.4 kg.\"]"
      ],
      [
        "3",
        "[\"Challenge the tempting shortcut\",\"Treating every piece as moving at 4 m/s yields K_wrong=½(2.4)(16)=19.2 J, exactly 3× the affine-stretch result.\"]"
      ]
    ],
    "rubric": [],
    "diagnoses": [],
    "diagnosisFeedback": [],
    "repairPrompt": "",
    "boundaryPrompt": "",
    "boundaryCheck": [
      "v(s)=1+3s m/s. Its mean squared speed is ∫₀¹(1+3s)²ds=∫(1+6s+9s²)ds=1+3+3=7 (m/s)². Therefore K=½(2.4)(7)=8.4 J. At the midpoint v=.5(1+4)=2.5 m/s. General affine two-end formula K=m(u²+uv+v²)/6; it reduces to mv²/6 ONLY if u=0."
    ]
  },
  {
    "id": "F06",
    "title": "Wind power combines energy per mass and mass per second",
    "family": "CONSTANT_POWER",
    "category": "FOCUSED",
    "prediction": "If only wind speed doubles, with density, area and conversion fixed, why is the electrical output not merely four times as large?",
    "hints": [
      "First ask: how much NEW air crosses a fixed area in one second? Draw a column whose length changes with wind speed.",
      "How do density and volume-per-second produce kilograms per second? Keep units kg/s distinct from J/kg.",
      "Combine ṁ in kg/s with ½v² in J/kg. Only after that multiply by the fixed conversion fraction."
    ],
    "fields": [
      {
        "id": "model",
        "type": "select",
        "label": "Which combined physical model gives the ideal electrical output?",
        "options": [
          "Choose an idea",
          "ṁ∝v multiplied by energy per kg∝v²",
          "A fixed packet of mass with energy∝v² only",
          "Mass flow grows as v²; energy per kg stays fixed",
          "I'm not sure yet"
        ]
      },
      {
        "id": "flow",
        "type": "number",
        "label": "Air mass flow rate through the rotor (kg/s)"
      },
      {
        "id": "wind",
        "type": "number",
        "label": "Wind kinetic-energy flux (W)"
      },
      {
        "id": "output",
        "type": "number",
        "label": "Electrical power output (W)"
      },
      {
        "id": "exponent",
        "type": "number",
        "label": "Speed exponent in the ideal P∝vⁿ relation (n)"
      },
      {
        "id": "reason",
        "type": "textarea",
        "label": "Explain the moving air volume per second and the kinetic energy each kilogram transports"
      }
    ],
    "worked": [
      [
        "0",
        "[\"Count mass each second\",\"ṁ=(1.25 kg/m³)(8 m²)(6 m/s)=60 kg/s.\"]"
      ],
      [
        "1",
        "[\"Count joules per kilogram\",\"ε=½(6 m/s)²=18 J/kg, so P_wind=(60)(18)=1080 J/s=1080 W.\"]"
      ],
      [
        "2",
        "[\"Convert into electrical output\",\"η=0.30 gives P_elec=0.30(1080)=324 W.\"]"
      ],
      [
        "3",
        "[\"Recover cubic speed\",\"P_elec=½ηρAv³; ρ,A,η fixed means v¹ from ṁ and v² from per-mass K, giving v³, not v².\"]"
      ]
    ],
    "rubric": [],
    "diagnoses": [],
    "diagnosisFeedback": [],
    "repairPrompt": "",
    "boundaryPrompt": "",
    "boundaryCheck": [
      "Pnew=½(0.30)(1.25)(4)(9³)=546.75 W. Relative output=(4/8)(9/6)³=½×3.375=1.6875. Speed increased, but swept area decreased: do not apply the cubic speed factor alone."
    ]
  },
  {
    "id": "F07",
    "title": "A pendulum's turning-point force is not its holding force",
    "family": "VERTICAL_CIRCLE",
    "category": "FOCUSED",
    "prediction": "Should the constant-force trip ending at a turning point require the same force as holding the bob statically at 60°? What condition distinguishes these?",
    "hints": [
      "Draw the final bob position. Which displacement does a HORIZONTAL force use for WORK, and which displacement describes gravitational HEIGHT?",
      "Turning point means the bob's speed is zero at one instant; does it say its tangential acceleration is zero? Static holding imposes a DIFFERENT condition.",
      "For case A equate constant horizontal work with height energy. For case B resolve horizontal pull and weight along the tangent."
    ],
    "fields": [
      {
        "id": "model",
        "type": "select",
        "label": "What distinguishes the two 60° situations?",
        "options": [
          "Choose an idea",
          "Turning-point work ledger versus static tangential balance",
          "Both require static tangential balance",
          "Both require work per unit time only",
          "I'm not sure yet"
        ]
      },
      {
        "id": "rise",
        "type": "number",
        "label": "Gravitational energy gained (J)"
      },
      {
        "id": "constant",
        "type": "number",
        "label": "Case A constant rightward force (N)"
      },
      {
        "id": "static",
        "type": "number",
        "label": "Case B static holding force (N)"
      },
      {
        "id": "reason",
        "type": "textarea",
        "label": "Explain why zero final velocity in A does not mean force equilibrium, and name the missing source condition"
      }
    ],
    "worked": [
      [
        "0",
        "[\"Geometry and potential\",\"L=1.2 m and θ=60°. Δh=1.2(1−½)=0.60 m; Δx=1.2sin60°≈1.039 m. So ΔU=(2)(10)(.60)=12 J.\"]"
      ],
      [
        "1",
        "[\"Constant-force trip\",\"Case A: F_A Δx = ΔU; F_A=12/(1.2sin60°)=20 tan30°≈11.547 N. The bob can momentarily stop at 60° yet accelerate back toward the bottom.\"]"
      ],
      [
        "2",
        "[\"Static hold\",\"Case B: tangential force balance F_B cos60°=Mg sin60°, so F_B=Mg tan60°=20√3≈34.641 N.\"]"
      ],
      [
        "3",
        "[\"Compare and state ambiguity\",\"The ratio is three for 60°. If the source wording only says 'force required to displace' and does not specify constant-force turning point or static hold, there is no unique force law from that phrase alone.\"]"
      ]
    ],
    "rubric": [],
    "diagnoses": [],
    "diagnosisFeedback": [],
    "repairPrompt": "",
    "boundaryPrompt": "",
    "boundaryCheck": [
      "At 30°, F_turning=20 tan15°≈5.359 N. Static hold F_hold=20 tan30°≈11.547 N. For small θ in radians, tan(θ/2)≈θ/2 whereas tanθ≈θ, so the constant-force turning-point result is about half the static holding force. The limit preserves the physical distinction."
    ]
  },
  {
    "id": "F08",
    "title": "A shock absorber needs an energy budget AND a motion model",
    "family": "DISSIPATIVE_BOUNCES",
    "category": "FOCUSED",
    "prediction": "If cart B were moving at +6 m/s along with A, would their common 6 m/s motion alone compress the internal spring? Why or why not?",
    "hints": [
      "Decide whether the new cart problem gave you a dissipation percentage. If none is given and both bodies can drift, what energy is available internally?",
      "Calculate COM speed and relative speed separately. At peak compression do both carts have to stop, or just approach the same speed?",
      "Use μ=m₁m₂/(m₁+m₂), then ½μ(u₁−u₂)²=½kx². Keep COM energy outside the spring ledger."
    ],
    "fields": [
      {
        "id": "model",
        "type": "select",
        "label": "Which source of spring energy is justified by the FRESH cart data?",
        "options": [
          "Choose an idea",
          "Relative kinetic energy of the two carts",
          "Automatically 10% of their total kinetic energy",
          "All of the initial total kinetic energy",
          "I'm not sure yet"
        ]
      },
      {
        "id": "com",
        "type": "number",
        "label": "Centre-of-mass speed (m/s, signed)"
      },
      {
        "id": "mu",
        "type": "number",
        "label": "Reduced mass (kg)"
      },
      {
        "id": "relative",
        "type": "number",
        "label": "Relative kinetic energy available for compression (J)"
      },
      {
        "id": "compression",
        "type": "number",
        "label": "Maximum spring compression (m)"
      },
      {
        "id": "reason",
        "type": "textarea",
        "label": "Compare this two-body model with a separately ASSUMED 10% whole-system energy budget"
      }
    ],
    "worked": [
      [
        "0",
        "[\"Find COM motion\",\"V=(600×6+900×0)/1500=+2.4 m/s. Total Kinitial=½(600)(6²)=10,800 J. COM energy is ½(1500)(2.4²)=4320 J.\"]"
      ],
      [
        "1",
        "[\"Calculate internal share\",\"μ=(600×900)/1500=360 kg; relative speed w=6 m/s. Krel=½(360)(6²)=6480 J, agreeing with 10,800−4320.\"]"
      ],
      [
        "2",
        "[\"Solve compression\",\"½(54,000)x²=6480, so x=√(12960/54000)=√0.24≈0.4899 m.\"]"
      ],
      [
        "3",
        "[\"Explain the OTHER model\",\"A whole-system '10% retained' hypothesis would instead give 1080 J, not 6480 J, and a different compression. No such percentage was supplied for these ideal carts. An engine–wagon problem requires masses/braking history to determine the actual relative budget.\"]"
      ]
    ],
    "rubric": [],
    "diagnoses": [],
    "diagnosisFeedback": [],
    "repairPrompt": "",
    "boundaryPrompt": "",
    "boundaryCheck": [
      "Damper dissipates 0.25×6480=1620 J of relative energy; spring receives 0.75×6480=4860 J. With k=54,000 N/m, x=√(9720/54000)=√0.18≈0.4243 m. The common-motion 4320 J remains unaffected under the stated internal-damping assumption. Applying 25% to 10,800 J would confuse two different energy ledgers."
    ]
  }
];

export function getWpeJourney(id: string): WpeJourneyDefinition {
  const found = WPE_COGNITIVE_JOURNEYS.find(j => j.id.toUpperCase() === id.toUpperCase());
  if (!found) throw new Error(`Unknown WPE journey id: ${id}`);
  return found;
}

const ref = (type: string, id: string): ExactRef => ({
  type,
  id,
  revision: 1,
  sha256: 'a'.repeat(64)
});

/**
 * Creates a formal Core1BTransferDefinition for any of the 13 canonical journeys.
 */
export function createWpeTransferDefinition(journeyId: string = 'C01'): Core1BTransferDefinition {
  const j = getWpeJourney(journeyId);
  const taskA: TaskDefinition = {
    taskRef: ref('FRESH_TASK', `fresh:${j.id.toLowerCase()}`),
    title: `${j.id}: ${j.title}`,
    prompt: j.fields.map(f => f.label).join('; '),
    conditions: j.worked.map(([title, exp]) => `${title}: ${exp}`),
    solutionRef: ref('SOLUTION', `solution:${j.id.toLowerCase()}`),
    solutionSteps: j.worked.map(([title, exp]) => `${title} — ${exp}`),
  };

  const taskB: TaskDefinition = {
    taskRef: ref('FRESH_TASK', `boundary:${j.id.toLowerCase()}`),
    title: `Boundary Test: ${j.title}`,
    prompt: j.boundaryPrompt,
    conditions: j.boundaryCheck,
    solutionRef: ref('SOLUTION', `solution:boundary:${j.id.toLowerCase()}`),
    solutionSteps: j.boundaryCheck,
  };

  return {
    journeyId: `journey:wpe:${j.id.toLowerCase()}`,
    originRef: ref('LESSON', 'lesson:physics-wpe'),
    freshTaskA: taskA,
    boundaryTaskB: taskB,
    hints: j.hints.map((h, i) => ({
      level: i === 0 ? 'H1' : i === 1 ? 'H2' : 'H3',
      assetRef: ref('ASSET', `hint:${j.id.toLowerCase()}:${i+1}`),
      text: h,
      guidance: h,
    })),
    diagnosticRules: j.diagnoses.map((d, i) => ({
      code: `DIAG-${j.id}-${i+1}`,
      label: d,
      misconceptionDescription: d,
      correctiveGuidance: j.diagnosisFeedback[i] || d,
    })),
    qualitativePredictionPrompt: j.prediction,
    predictionOptions: [
      'Option A: Kinetic energy increases and total work is positive',
      'Option B: Resistance cancels work and kinetic energy is conserved',
      'Option C: System encounters turning point and halts',
      'Option D: Not sure yet / depends on parameter values',
    ],
    expectedPredictionIndex: 0,
    status: 'HOLD',
  };
}

/**
 * Controller managing the native interactive 6-stage cognitive state.
 */
export class WpeCognitiveJourneyController {
  private currentJourneyId: string;
  private stage: CognitiveStage = 'PREDICT';
  private values: Record<string, any> = {};
  private selectedDiagnosis: number | null = null;
  private repairText: string = '';
  private boundaryText: string = '';
  private unlockedHints: number = 0;
  private isLocked: boolean = false;

  constructor(initialJourneyId: string = 'C01') {
    this.currentJourneyId = initialJourneyId;
  }

  getJourney(): WpeJourneyDefinition {
    return getWpeJourney(this.currentJourneyId);
  }

  setJourney(id: string) {
    this.currentJourneyId = id;
    this.reset();
  }

  reset() {
    this.stage = 'PREDICT';
    this.values = {};
    this.selectedDiagnosis = null;
    this.repairText = '';
    this.boundaryText = '';
    this.unlockedHints = 0;
    this.isLocked = false;
  }

  getStage(): CognitiveStage {
    return this.stage;
  }

  nextStage() {
    const stages: CognitiveStage[] = ['PREDICT', 'ATTEMPT', 'RECONSTRUCT', 'DIAGNOSE', 'REPAIR', 'BOUNDARY_TEST', 'COMPLETE'];
    const idx = stages.indexOf(this.stage);
    if (idx < stages.length - 1) {
      this.stage = stages[idx + 1];
    }
  }

  setStage(stage: CognitiveStage) {
    this.stage = stage;
  }

  setValue(fieldId: string, val: any) {
    this.values[fieldId] = val;
  }

  getValue(fieldId: string): any {
    return this.values[fieldId];
  }

  getAllValues(): Record<string, any> {
    return { ...this.values };
  }

  setDiagnosis(idx: number) {
    this.selectedDiagnosis = idx;
  }

  getDiagnosis(): number | null {
    return this.selectedDiagnosis;
  }

  setRepair(text: string) {
    this.repairText = text;
  }

  getRepair(): string {
    return this.repairText;
  }

  setBoundary(text: string) {
    this.boundaryText = text;
  }

  getBoundary(): string {
    return this.boundaryText;
  }

  unlockHint(): number {
    const j = this.getJourney();
    if (this.unlockedHints < j.hints.length) {
      this.unlockedHints++;
    }
    return this.unlockedHints;
  }

  getUnlockedHints(): number {
    return this.unlockedHints;
  }

  lockAttempt() {
    this.isLocked = true;
  }

  isAttemptLocked(): boolean {
    return this.isLocked;
  }
}

/**
 * 100% Native DOM Mount function for the 6-Stage WPE Cognitive Journey.
 */
export function mountWpeCognitiveJourney(
  container: HTMLElement,
  controller: WpeCognitiveJourneyController,
  onNavigate?: (path: string) => void
): { dispose: () => void; refresh: () => void } {
  let active = true;

  const render = () => {
    if (!active) return;
    const j = controller.getJourney();
    const stage = controller.getStage();
    const stages: { key: CognitiveStage; label: string; num: number }[] = [
      { key: 'PREDICT', label: '1. Predict', num: 1 },
      { key: 'ATTEMPT', label: '2. Attempt', num: 2 },
      { key: 'RECONSTRUCT', label: '3. Reconstruct', num: 3 },
      { key: 'DIAGNOSE', label: '4. Diagnose', num: 4 },
      { key: 'REPAIR', label: '5. Repair', num: 5 },
      { key: 'BOUNDARY_TEST', label: '6. Boundary Test', num: 6 },
    ];

    container.innerHTML = `
      <div class="g9-cognitive-journey" style="display:flex;flex-direction:column;gap:1.5rem;font-family:system-ui,sans-serif;">
        <!-- Header & Journey Selector -->
        <div style="background:#ffffff;border:1px solid #cbd5e1;border-radius:8px;padding:1.25rem;box-shadow:0 1px 3px rgba(0,0,0,0.05);">
          <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;margin-bottom:1rem;">
            <div>
              <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;">
                <span style="background:#0284c7;color:#ffffff;font-size:0.875rem;font-weight:800;padding:2px 8px;border-radius:4px;">${j.id}</span>
                <span style="background:#f1f5f9;color:#475569;font-size:0.875rem;font-weight:700;padding:2px 8px;border-radius:4px;">${j.category}</span>
                <span style="background:#fef3c7;color:#b45309;font-size:0.875rem;font-weight:700;padding:2px 8px;border-radius:4px;">HOLD · No Academic Approval</span>
              </div>
              <h2 style="margin:0;font-size:1.4rem;font-weight:700;color:#0f172a;">${escapeHtml(j.title)}</h2>
            </div>
            
            <!-- Quick Journey Switcher -->
            <div style="display:flex;align-items:center;gap:8px;">
              <label for="g9-journey-select" style="font-size:0.9rem;font-weight:600;color:#475569;">Select Journey:</label>
              <select id="g9-journey-select" style="min-height:${HIT_TARGET_MIN_PX}px;padding:6px 12px;border:1px solid #cbd5e1;border-radius:6px;background:#f8fafc;font-size:0.9rem;font-weight:600;">
                <optgroup label="C · Core Reasoning (C01–C08)">
                  ${WPE_COGNITIVE_JOURNEYS.filter(x => x.category === 'CORE').map(x => `<option value="${x.id}" ${x.id === j.id ? 'selected' : ''}>${x.id}: ${escapeHtml(x.title)}</option>`).join('')}
                </optgroup>
                <optgroup label="E · Extension Reasoning (E01–E05)">
                  ${WPE_COGNITIVE_JOURNEYS.filter(x => x.category === 'EXTENSION').map(x => `<option value="${x.id}" ${x.id === j.id ? 'selected' : ''}>${x.id}: ${escapeHtml(x.title)}</option>`).join('')}
                </optgroup>
                <optgroup label="F · Focused Challenges (F01–F08)">
                  ${WPE_COGNITIVE_JOURNEYS.filter(x => x.category === 'FOCUSED').map(x => `<option value="${x.id}" ${x.id === j.id ? 'selected' : ''}>${x.id}: ${escapeHtml(x.title)}</option>`).join('')}
                </optgroup>
              </select>
            </div>
          </div>

          <!-- 6-Stage Progress Stepper -->
          <div style="display:flex;gap:6px;overflow-x:auto;padding-bottom:4px;" role="tablist" aria-label="Cognitive Stages">
            ${stages.map(s => {
              const isCurrent = stage === s.key;
              const isDone = stages.findIndex(x => x.key === stage) > stages.findIndex(x => x.key === s.key);
              return `
                <button type="button" data-stage="${s.key}" style="flex:1;min-width:130px;min-height:${HIT_TARGET_MIN_PX}px;padding:8px 10px;background:${isCurrent ? '#0284c7' : isDone ? '#e0f2fe' : '#f8fafc'};color:${isCurrent ? '#ffffff' : isDone ? '#0369a1' : '#475569'};border:1px solid ${isCurrent ? '#0284c7' : '#cbd5e1'};border-radius:6px;cursor:pointer;font-size:0.875rem;font-weight:700;display:flex;align-items:center;justify-content:center;gap:6px;">
                  ${isDone ? '✓ ' : ''}${s.label}
                </button>
              `;
            }).join('')}
          </div>
        </div>

        <!-- Stage Content Area -->
        <div style="background:#ffffff;border:1px solid #cbd5e1;border-radius:8px;padding:1.5rem;box-shadow:0 1px 3px rgba(0,0,0,0.05);">
          ${renderStageContent(j, stage, controller)}
        </div>
      </div>
    `;

    attachEvents();
  };

  const renderStageContent = (j: WpeJourneyDefinition, stage: CognitiveStage, c: WpeCognitiveJourneyController): string => {
    switch (stage) {
      case 'PREDICT':
        return `
          <div>
            <span style="font-size:0.875rem;font-weight:700;color:#0284c7;text-transform:uppercase;">Stage 1: Qualitative Prediction</span>
            <h3 style="margin:0.5rem 0 1rem;font-size:1.25rem;color:#0f172a;">Make Your Initial Physical Prediction</h3>
            <div style="background:#f8fafc;border-left:4px solid #0284c7;padding:1rem 1.25rem;margin-bottom:1.5rem;font-size:1.05rem;line-height:1.6;color:#1e293b;">
              ${renderMathHtml(escapeHtml(j.prediction))}
            </div>
            <p style="font-size:0.95rem;color:#64748b;margin-bottom:1.5rem;">Consider the physical principles, conservation laws, and direction of energy transfer before writing equations.</p>
            <button type="button" id="g9-start-attempt-btn" style="min-height:${HIT_TARGET_PRIMARY_PX}px;padding:12px 24px;background:#0284c7;color:#ffffff;border:none;border-radius:6px;cursor:pointer;font-weight:700;font-size:1rem;">Proceed to Attempt (Stage 2) →</button>
          </div>
        `;

      case 'ATTEMPT': {
        const locked = c.isAttemptLocked();
        return `
          <div>
            <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;margin-bottom:1rem;">
              <div>
                <span style="font-size:0.875rem;font-weight:700;color:#0284c7;text-transform:uppercase;">Stage 2: Model Attempt</span>
                <h3 style="margin:0.25rem 0 0;font-size:1.25rem;color:#0f172a;">Complete the Independent Physics Ledger</h3>
              </div>
              <div style="display:flex;gap:8px;">
                <button type="button" id="g9-journey-hint-btn" style="min-height:${HIT_TARGET_MIN_PX}px;padding:8px 16px;background:#f8fafc;color:#0369a1;border:1px solid #cbd5e1;border-radius:6px;cursor:pointer;font-weight:600;font-size:0.9rem;" ${c.getUnlockedHints() >= j.hints.length ? 'disabled' : ''}>💡 Get Hint (${c.getUnlockedHints()}/${j.hints.length})</button>
              </div>
            </div>

            <!-- Hints Drawer -->
            ${c.getUnlockedHints() > 0 ? `
              <div style="margin-bottom:1.5rem;display:flex;flex-direction:column;gap:8px;">
                ${j.hints.slice(0, c.getUnlockedHints()).map((h, i) => `
                  <div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:6px;padding:10px 14px;font-size:0.95rem;color:#1e40af;">
                    <strong>Hint ${i + 1}:</strong> ${renderMathHtml(escapeHtml(h))}
                  </div>
                `).join('')}
              </div>
            ` : ''}

            <!-- Input Fields -->
            <form id="g9-attempt-form" style="display:flex;flex-direction:column;gap:1.25rem;margin-bottom:1.5rem;">
              ${j.fields.map(f => `
                <div style="display:flex;flex-direction:column;gap:6px;">
                  <label for="field-${f.id}" style="font-weight:600;font-size:0.95rem;color:#1e293b;">${escapeHtml(f.label)}</label>
                  ${f.options ? `
                    <select id="field-${f.id}" data-field-id="${f.id}" style="min-height:${HIT_TARGET_MIN_PX}px;padding:8px 12px;border:1px solid #cbd5e1;border-radius:6px;background:#ffffff;font-size:0.95rem;" ${locked ? 'disabled' : ''}>
                      <option value="">-- Choose an option --</option>
                      ${f.options.map(opt => `<option value="${escapeHtml(opt)}" ${c.getValue(f.id) === opt ? 'selected' : ''}>${escapeHtml(opt)}</option>`).join('')}
                    </select>
                  ` : f.type === 'textarea' ? `
                    <textarea id="field-${f.id}" data-field-id="${f.id}" rows="3" placeholder="${escapeHtml(f.hint || 'Write your physical reasoning here...')}" style="padding:10px 12px;border:1px solid #cbd5e1;border-radius:6px;font-family:inherit;font-size:0.95rem;" ${locked ? 'disabled' : ''}>${escapeHtml(c.getValue(f.id) || '')}</textarea>
                  ` : `
                    <input type="text" id="field-${f.id}" data-field-id="${f.id}" placeholder="${escapeHtml(f.hint || 'Value...')}" value="${escapeHtml(c.getValue(f.id) || '')}" style="min-height:${HIT_TARGET_MIN_PX}px;padding:8px 12px;border:1px solid #cbd5e1;border-radius:6px;font-size:0.95rem;" ${locked ? 'disabled' : ''}>
                  `}
                </div>
              `).join('')}
            </form>

            <div style="display:flex;gap:12px;flex-wrap:wrap;">
              ${!locked ? `
                <button type="button" id="g9-lock-attempt-btn" style="min-height:${HIT_TARGET_PRIMARY_PX}px;padding:10px 22px;background:#0284c7;color:#ffffff;border:none;border-radius:6px;cursor:pointer;font-weight:700;font-size:0.95rem;">Lock Attempt & View Worked Solution →</button>
              ` : `
                <button type="button" id="g9-to-reconstruct-btn" style="min-height:${HIT_TARGET_PRIMARY_PX}px;padding:10px 22px;background:#059669;color:#ffffff;border:none;border-radius:6px;cursor:pointer;font-weight:700;font-size:0.95rem;">Proceed to Reconstruction (Stage 3) →</button>
              `}
            </div>
          </div>
        `;
      }

      case 'RECONSTRUCT':
        return `
          <div>
            <span style="font-size:0.875rem;font-weight:700;color:#0284c7;text-transform:uppercase;">Stage 3: Physical Reconstruction</span>
            <h3 style="margin:0.25rem 0 1rem;font-size:1.25rem;color:#0f172a;">Compare with the Canonical Worked Derivation</h3>

            <div style="display:flex;flex-direction:column;gap:1rem;margin-bottom:1.5rem;">
              ${j.worked.map(([title, desc], idx) => `
                <div style="border:1px solid #e2e8f0;border-radius:8px;padding:1rem 1.25rem;background:#f8fafc;">
                  <h4 style="margin:0 0 0.5rem;font-size:1rem;font-weight:700;color:#0369a1;">Step ${idx + 1}: ${escapeHtml(title)}</h4>
                  <div style="font-size:0.95rem;line-height:1.6;color:#334155;">${renderMathHtml(escapeHtml(desc))}</div>
                </div>
              `).join('')}
            </div>

            <!-- Self-Audit Rubric -->
            ${j.rubric.length ? `
              <div style="background:#f1f5f9;border-radius:8px;padding:1rem 1.25rem;margin-bottom:1.5rem;">
                <h4 style="margin:0 0 0.5rem;font-size:0.95rem;font-weight:700;color:#1e293b;">Self-Audit Criteria</h4>
                <ul style="margin:0;padding-left:1.25rem;font-size:0.9rem;color:#475569;line-height:1.6;">
                  ${j.rubric.map(r => `<li>${escapeHtml(r)}</li>`).join('')}
                </ul>
              </div>
            ` : ''}

            <button type="button" id="g9-to-diagnose-btn" style="min-height:${HIT_TARGET_PRIMARY_PX}px;padding:12px 24px;background:#0284c7;color:#ffffff;border:none;border-radius:6px;cursor:pointer;font-weight:700;font-size:1rem;">Proceed to Diagnosis (Stage 4) →</button>
          </div>
        `;

      case 'DIAGNOSE':
        return `
          <div>
            <span style="font-size:0.875rem;font-weight:700;color:#0284c7;text-transform:uppercase;">Stage 4: Diagnosis of Error Patterns</span>
            <h3 style="margin:0.25rem 0 1rem;font-size:1.25rem;color:#0f172a;">Identify Where Your Thinking Diverged</h3>
            <p style="font-size:0.95rem;color:#475569;margin-bottom:1.25rem;">Select the option that best describes what occurred during your first attempt:</p>

            <div style="display:flex;flex-direction:column;gap:10px;margin-bottom:1.5rem;">
              ${j.diagnoses.map((d, idx) => {
                const selected = c.getDiagnosis() === idx;
                return `
                  <label style="display:flex;align-items:flex-start;gap:10px;padding:12px 14px;border:1px solid ${selected ? '#0284c7' : '#cbd5e1'};background:${selected ? '#f0f9ff' : '#ffffff'};border-radius:6px;cursor:pointer;">
                    <input type="radio" name="g9-diag-choice" value="${idx}" ${selected ? 'checked' : ''} style="min-height:20px;min-width:20px;margin-top:2px;">
                    <span style="font-size:0.95rem;color:#1e293b;line-height:1.5;">${escapeHtml(d)}</span>
                  </label>
                `;
              }).join('')}
            </div>

            ${c.getDiagnosis() !== null && j.diagnosisFeedback[c.getDiagnosis()!] ? `
              <div style="background:#ecfdf5;border:1px solid #a7f3d0;border-radius:6px;padding:12px 16px;margin-bottom:1.5rem;font-size:0.95rem;color:#065f46;line-height:1.6;">
                <strong>Pedagogical Feedback:</strong> ${escapeHtml(j.diagnosisFeedback[c.getDiagnosis()!])}
              </div>
            ` : ''}

            <button type="button" id="g9-to-repair-btn" style="min-height:${HIT_TARGET_PRIMARY_PX}px;padding:12px 24px;background:#0284c7;color:#ffffff;border:none;border-radius:6px;cursor:pointer;font-weight:700;font-size:1rem;">Proceed to Conceptual Repair (Stage 5) →</button>
          </div>
        `;

      case 'REPAIR':
        return `
          <div>
            <span style="font-size:0.875rem;font-weight:700;color:#0284c7;text-transform:uppercase;">Stage 5: Conceptual Repair</span>
            <h3 style="margin:0.25rem 0 0.5rem;font-size:1.25rem;color:#0f172a;">Write Your Corrected Physical Formulation</h3>
            <p style="font-size:0.95rem;color:#475569;margin-bottom:1.25rem;">${escapeHtml(j.repairPrompt || 'Formulate the corrected model in your own words:')}</p>

            <textarea id="g9-repair-input" rows="4" placeholder="Explain the corrections to your force ledger, coordinates, or energy balance..." style="width:100%;box-sizing:border-box;padding:12px;border:1px solid #cbd5e1;border-radius:6px;font-family:inherit;font-size:0.95rem;line-height:1.5;margin-bottom:1.5rem;">${escapeHtml(c.getRepair())}</textarea>

            <button type="button" id="g9-to-boundary-btn" style="min-height:${HIT_TARGET_PRIMARY_PX}px;padding:12px 24px;background:#0284c7;color:#ffffff;border:none;border-radius:6px;cursor:pointer;font-weight:700;font-size:1rem;">Proceed to Boundary Test (Stage 6) →</button>
          </div>
        `;

      case 'BOUNDARY_TEST':
        return `
          <div>
            <span style="font-size:0.875rem;font-weight:700;color:#0284c7;text-transform:uppercase;">Stage 6: Changed-Condition Boundary Test</span>
            <h3 style="margin:0.25rem 0 1rem;font-size:1.25rem;color:#0f172a;">Test the Physics Under Altered Constraints</h3>
            
            <div style="background:#fef3c7;border-left:4px solid #f59e0b;padding:1rem 1.25rem;margin-bottom:1.5rem;font-size:1.05rem;line-height:1.6;color:#92400e;">
              ${renderMathHtml(escapeHtml(j.boundaryPrompt))}
            </div>

            <textarea id="g9-boundary-input" rows="3" placeholder="Enter your boundary analysis and conclusions..." style="width:100%;box-sizing:border-box;padding:12px;border:1px solid #cbd5e1;border-radius:6px;font-family:inherit;font-size:0.95rem;line-height:1.5;margin-bottom:1.5rem;">${escapeHtml(c.getBoundary())}</textarea>

            <!-- Boundary Verification -->
            <details style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:6px;padding:12px 16px;margin-bottom:1.5rem;">
              <summary style="font-weight:700;color:#0284c7;cursor:pointer;">Reveal Boundary Analytical Verification</summary>
              <ul style="margin:8px 0 0;padding-left:1.25rem;font-size:0.95rem;color:#334155;line-height:1.6;">
                ${j.boundaryCheck.map(b => `<li>${renderMathHtml(escapeHtml(b))}</li>`).join('')}
              </ul>
            </details>

            <button type="button" id="g9-complete-journey-btn" style="min-height:${HIT_TARGET_PRIMARY_PX}px;padding:12px 24px;background:#059669;color:#ffffff;border:none;border-radius:6px;cursor:pointer;font-weight:700;font-size:1rem;">Complete Journey & Save Session ✓</button>
          </div>
        `;

      case 'COMPLETE':
        return `
          <div style="text-align:center;padding:2rem 1rem;">
            <div style="font-size:3rem;margin-bottom:0.5rem;">🎉</div>
            <h3 style="margin:0 0 0.5rem;font-size:1.5rem;color:#0f172a;">Journey ${j.id} Completed!</h3>
            <p style="font-size:1rem;color:#475569;max-width:540px;margin:0 auto 1.5rem;line-height:1.6;">
              You have completed the full six-stage cognitive cycle for <strong>${escapeHtml(j.title)}</strong>. Your work has been preserved in session state.
            </p>
            <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap;">
              <button type="button" id="g9-restart-journey-btn" style="min-height:${HIT_TARGET_MIN_PX}px;padding:10px 20px;background:#f8fafc;color:#0f172a;border:1px solid #cbd5e1;border-radius:6px;cursor:pointer;font-weight:600;">Restart This Journey</button>
              <button type="button" id="g9-next-journey-btn" style="min-height:${HIT_TARGET_PRIMARY_PX}px;padding:10px 24px;background:#0284c7;color:#ffffff;border:none;border-radius:6px;cursor:pointer;font-weight:700;">Start Next Journey →</button>
            </div>
          </div>
        `;
    }
  };

  const attachEvents = () => {
    // Journey select change
    const select = container.querySelector<HTMLSelectElement>('#g9-journey-select');
    if (select) {
      select.onchange = () => {
        controller.setJourney(select.value);
        render();
      };
    }

    // Stage buttons
    container.querySelectorAll<HTMLButtonElement>('button[data-stage]').forEach(btn => {
      btn.onclick = () => {
        const s = btn.getAttribute('data-stage') as CognitiveStage;
        if (s) {
          controller.setStage(s);
          render();
        }
      };
    });

    // Start attempt button
    const startAttempt = container.querySelector<HTMLButtonElement>('#g9-start-attempt-btn');
    if (startAttempt) {
      startAttempt.onclick = () => {
        controller.setStage('ATTEMPT');
        render();
      };
    }

    // Hint button
    const hintBtn = container.querySelector<HTMLButtonElement>('#g9-journey-hint-btn');
    if (hintBtn) {
      hintBtn.onclick = () => {
        controller.unlockHint();
        render();
      };
    }

    // Form inputs change
    container.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>('[data-field-id]').forEach(input => {
      input.onchange = () => {
        const fid = input.getAttribute('data-field-id');
        if (fid) controller.setValue(fid, input.value);
      };
    });

    // Lock attempt
    const lockBtn = container.querySelector<HTMLButtonElement>('#g9-lock-attempt-btn');
    if (lockBtn) {
      lockBtn.onclick = () => {
        controller.lockAttempt();
        controller.setStage('RECONSTRUCT');
        render();
      };
    }

    const toReconstruct = container.querySelector<HTMLButtonElement>('#g9-to-reconstruct-btn');
    if (toReconstruct) {
      toReconstruct.onclick = () => {
        controller.setStage('RECONSTRUCT');
        render();
      };
    }

    const toDiagnose = container.querySelector<HTMLButtonElement>('#g9-to-diagnose-btn');
    if (toDiagnose) {
      toDiagnose.onclick = () => {
        controller.setStage('DIAGNOSE');
        render();
      };
    }

    // Diagnosis radios
    container.querySelectorAll<HTMLInputElement>('input[name="g9-diag-choice"]').forEach(radio => {
      radio.onchange = () => {
        controller.setDiagnosis(parseInt(radio.value, 10));
        render();
      };
    });

    const toRepair = container.querySelector<HTMLButtonElement>('#g9-to-repair-btn');
    if (toRepair) {
      toRepair.onclick = () => {
        controller.setStage('REPAIR');
        render();
      };
    }

    const repairInput = container.querySelector<HTMLTextAreaElement>('#g9-repair-input');
    if (repairInput) {
      repairInput.onchange = () => {
        controller.setRepair(repairInput.value);
      };
    }

    const toBoundary = container.querySelector<HTMLButtonElement>('#g9-to-boundary-btn');
    if (toBoundary) {
      toBoundary.onclick = () => {
        if (repairInput) controller.setRepair(repairInput.value);
        controller.setStage('BOUNDARY_TEST');
        render();
      };
    }

    const boundaryInput = container.querySelector<HTMLTextAreaElement>('#g9-boundary-input');
    if (boundaryInput) {
      boundaryInput.onchange = () => {
        controller.setBoundary(boundaryInput.value);
      };
    }

    const completeBtn = container.querySelector<HTMLButtonElement>('#g9-complete-journey-btn');
    if (completeBtn) {
      completeBtn.onclick = () => {
        if (boundaryInput) controller.setBoundary(boundaryInput.value);
        controller.setStage('COMPLETE');
        render();
      };
    }

    const restartBtn = container.querySelector<HTMLButtonElement>('#g9-restart-journey-btn');
    if (restartBtn) {
      restartBtn.onclick = () => {
        controller.reset();
        render();
      };
    }

    const nextBtn = container.querySelector<HTMLButtonElement>('#g9-next-journey-btn');
    if (nextBtn) {
      nextBtn.onclick = () => {
        const curIdx = WPE_COGNITIVE_JOURNEYS.findIndex(x => x.id === controller.getJourney().id);
        const nextIdx = (curIdx + 1) % WPE_COGNITIVE_JOURNEYS.length;
        controller.setJourney(WPE_COGNITIVE_JOURNEYS[nextIdx].id);
        render();
      };
    }
  };

  render();

  return {
    refresh: () => render(),
    dispose: () => {
      active = false;
      container.replaceChildren();
    }
  };
}
