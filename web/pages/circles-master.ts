/**
 * web/pages/circles-master.ts
 * A69 / DEC-A59 / v3.5 Parity — Circles Master Authentic Olympiad Workbench & Question Corpus.
 *
 * Implements:
 * - 50 authentic Olympiad & Grade 9 Circle Geometry question corpus (.qb-question, data-qid="circ-01".."circ-50")
 * - Cognitive demand band taxonomy: D1 (Foundational), D2 (Application), D3 (Analysis), D4 (Synthesis/Olympiad)
 * - Band filter buttons: [data-filter="all"], [data-filter="D1"], [data-filter="D2"], [data-filter="D3"], [data-filter="D4"]
 * - Real-time query search input (#search-input) filtering questions by title/text
 * - Live telemetry counters: #stat-attempted, #stat-correct
 * - Fault N09 Key-Leakage Defense: ZERO data-correct or data-correct-choice attributes in learner DOM
 * - Post-attempt disclosure: explanation and rubric revealed only after selection
 * - Local reload persistence (localStorage) preserving latest response and telemetry
 * - Interactive SVG Coordinate Geometry Circle Sandbox with dynamic radius and center sliders
 * - 12.7" tablet touch ergonomics: minimum 48px hit targets, 56px primary actions, 17px base typography
 * - Pure Native DOM (No iframes)
 *
 * Academic Status: HOLD (Formative Simulation Mode)
 */

import { escapeHtml, renderMathHtml } from '../runtime/rendering.ts';
import { HIT_TARGET_MIN_PX, HIT_TARGET_PRIMARY_PX } from '../styles/tokens.ts';

export interface CircleQuestionCard {
  readonly id: string;
  readonly authenticId: string;
  readonly band: 'D1' | 'D2' | 'D3' | 'D4';
  readonly title: string;
  readonly promptHtml: string;
  readonly options: readonly { readonly id: string; readonly text: string }[];
  readonly explanationHtml: string;
}

export interface CirclesMasterState {
  readonly selectedFilter: string;
  readonly searchQuery: string;
  readonly responses: Record<string, string>; // questionId -> optionId
  readonly radius: number;
  readonly centerX: number;
  readonly centerY: number;
}

// ---------------------------------------------------------------------------
// 1. Private Master Key Store (Protected from Learner DOM - Fault N09)
// ---------------------------------------------------------------------------

const PRIVATE_CIRCLE_KEYS: Record<string, string> = {
  "circ-01": "opt-B",
  "circ-02": "opt-A",
  "circ-03": "opt-B",
  "circ-04": "opt-B",
  "circ-05": "opt-C",
  "circ-06": "opt-A",
  "circ-07": "opt-B",
  "circ-08": "opt-C",
  "circ-09": "opt-C",
  "circ-10": "opt-C",
  "circ-11": "opt-B",
  "circ-12": "opt-A",
  "circ-13": "opt-C",
  "circ-14": "opt-B",
  "circ-15": "opt-B",
  "circ-16": "opt-C",
  "circ-17": "opt-B",
  "circ-18": "opt-B",
  "circ-19": "opt-C",
  "circ-20": "opt-C",
  "circ-21": "opt-B",
  "circ-22": "opt-B",
  "circ-23": "opt-C",
  "circ-24": "opt-B",
  "circ-25": "opt-B",
  "circ-26": "opt-C",
  "circ-27": "opt-B",
  "circ-28": "opt-C",
  "circ-29": "opt-B",
  "circ-30": "opt-B",
  "circ-31": "opt-B",
  "circ-32": "opt-B",
  "circ-33": "opt-B",
  "circ-34": "opt-C",
  "circ-35": "opt-C",
  "circ-36": "opt-B",
  "circ-37": "opt-C",
  "circ-38": "opt-A",
  "circ-39": "opt-C",
  "circ-40": "opt-B",
  "circ-41": "opt-C",
  "circ-42": "opt-B",
  "circ-43": "opt-C",
  "circ-44": "opt-C",
  "circ-45": "opt-B",
  "circ-46": "opt-B",
  "circ-47": "opt-B",
  "circ-48": "opt-A",
  "circ-49": "opt-A",
  "circ-50": "opt-A"
};

export const CIRCLES_50_CORPUS: readonly CircleQuestionCard[] = [
  {
    "id": "circ-01",
    "authenticId": "SOF-IMO-G09-CIRCLES-Q001",
    "band": "D1",
    "title": "Perpendicular Distance from Centre to Chord [IMO G09-01]",
    "promptHtml": "In a circle of radius $13\\text{ cm}$, a chord $AB$ subtends an angle in a semicircle. Find the perpendicular distance.",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) 4 cm 4\\text{ cm}"
      },
      {
        "id": "opt-B",
        "text": "(B) 5 cm 5\\text{ cm}"
      },
      {
        "id": "opt-C",
        "text": "(C) 6 cm 6\\text{ cm}"
      },
      {
        "id": "opt-D",
        "text": "(D) 7 cm 7\\text{ cm}"
      }
    ],
    "explanationHtml": " (Tempting Mistake & Why It Fails: Forgetting that the perpendicular bisects the chord, attempting to use the full chord length 24 cm in Pythagoras.)"
  },
  {
    "id": "circ-02",
    "authenticId": "SOF-IMO-G09-CIRCLES-Q002",
    "band": "D1",
    "title": "Subtended Angle by Chord of Length Equal to Radius [IMO G09-02]",
    "promptHtml": "A chord of a circle is equal to the radius of the circle. Find the angle subtended by the chord at the centre of the circle, and the angle subtended by it at a point on the major arc.",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) 6 0 \u2218 60^\\circ"
      },
      {
        "id": "opt-B",
        "text": "(B) 6 0 \u2218 60^\\circ"
      },
      {
        "id": "opt-C",
        "text": "(C) 9 0 \u2218 90^\\circ"
      },
      {
        "id": "opt-D",
        "text": "(D) 12 0 \u2218 120^\\circ"
      }
    ],
    "explanationHtml": " (Tempting Mistake & Why It Fails: Confusing the major arc inscribed angle ($30^\\circ$ 3 0 \u2218 ) with the minor arc inscribed angle ($150^\\circ$ 15 0 \u2218 ).)"
  },
  {
    "id": "circ-03",
    "authenticId": "SOF-IMO-G09-CIRCLES-Q003",
    "band": "D1",
    "title": "Angles in the Same Segment Intersecting Chords [IMO G09-03]",
    "promptHtml": "In the given figure, points $A, B, C, D$ A , B , C , D lie on a circle. Chords $AC$ A C and $BD$ B D intersect at point $E$ E such that $\\angle BEC = 130^\\circ$ \u2220 BEC = 13 0 \u2218 and $\\angle ECD = 20^\\circ$ \u2220 EC D = 2 0 \u2218 . Find the measure of $\\angle BAC$ \u2220 B A C .",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) 10 0 \u2218 100^\\circ"
      },
      {
        "id": "opt-B",
        "text": "(B) 11 0 \u2218 110^\\circ"
      },
      {
        "id": "opt-C",
        "text": "(C) 12 0 \u2218 120^\\circ"
      },
      {
        "id": "opt-D",
        "text": "(D) 13 0 \u2218 130^\\circ"
      }
    ],
    "explanationHtml": " (Tempting Mistake & Why It Fails: Failing to recognize that $\\angle BAC$ \u2220 B A C and $\\angle BDC$ \u2220 B D C share the identical chord base $BC$ BC .)"
  },
  {
    "id": "circ-04",
    "authenticId": "SOF-IMO-G09-CIRCLES-Q004",
    "band": "D1",
    "title": "Angle in a Semicircle Invariant [IMO G09-04]",
    "promptHtml": "Segment $AB$ A B is a diameter of a circle with centre $O$ O . Point $C$ C is any point on the circumference of the circle. If $\\angle CAB = 38^\\circ$ \u2220 C A B = 3 8 \u2218 , find the measure of $\\angle ABC$ \u2220 A BC .",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) 4 8 \u2218 48^\\circ"
      },
      {
        "id": "opt-B",
        "text": "(B) 5 2 \u2218 52^\\circ"
      },
      {
        "id": "opt-C",
        "text": "(C) 5 6 \u2218 56^\\circ"
      },
      {
        "id": "opt-D",
        "text": "(D) 6 2 \u2218 62^\\circ"
      }
    ],
    "explanationHtml": " (Tempting Mistake & Why It Fails: Assuming $\\triangle ABC$ \u25b3 A BC is isosceles with $AC = BC$ A C = BC instead of using the diameter right-angle property.)"
  },
  {
    "id": "circ-05",
    "authenticId": "SOF-IMO-G09-CIRCLES-Q005",
    "band": "D2",
    "title": "Concentric Circle Intercepted Segment Invariant [IMO G09-05]",
    "promptHtml": "Two concentric circles with common centre $O$ O have radii $17\\text{ cm}$ 17 cm and $10\\text{ cm}$ 10 cm . A straight line intersects the outer circle at $A$ A and $D$ D , and the inner circle at $B$ B and $C$ C . If the perpendicular distance from $O$ O to the line is $8\\text{ cm}$ 8 cm , find the length of the line segment $AB$ A B .",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) 7 cm 7\\text{ cm}"
      },
      {
        "id": "opt-B",
        "text": "(B) 8 cm 8\\text{ cm}"
      },
      {
        "id": "opt-C",
        "text": "(C) 9 cm 9\\text{ cm}"
      },
      {
        "id": "opt-D",
        "text": "(D) 10 cm 10\\text{ cm}"
      }
    ],
    "explanationHtml": " (Tempting Mistake & Why It Fails: Subtracting radii directly ($17 - 10 = 7$ 17 \u2212 10 = 7 ) instead of computing the Pythagorean chord projections.)"
  },
  {
    "id": "circ-06",
    "authenticId": "SOF-IMO-G09-CIRCLES-Q006",
    "band": "D2",
    "title": "Major Arc Subtended Angle from Central Angles [IMO G09-06]",
    "promptHtml": "In a circle with centre $O$ O , points $A, B, C$ A , B , C lie on the circumference such that $\\angle AOB = 90^\\circ$ \u2220 A OB = 9 0 \u2218 and $\\angle BOC = 120^\\circ$ \u2220 BOC = 12 0 \u2218 . If point $D$ D lies on the circle on the major arc $AC$ A C (not containing $B$ B ), find the measure of $\\angle ADC$ \u2220 A D C .",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) 7 5 \u2218 75^\\circ"
      },
      {
        "id": "opt-B",
        "text": "(B) 8 5 \u2218 85^\\circ"
      },
      {
        "id": "opt-C",
        "text": "(C) 10 5 \u2218 105^\\circ"
      },
      {
        "id": "opt-D",
        "text": "(D) 15 0 \u2218 150^\\circ"
      }
    ],
    "explanationHtml": " (Tempting Mistake & Why It Fails: Selecting the central angle $150^\\circ$ 15 0 \u2218 directly, or finding the opposite inscribed angle $105^\\circ$ 10 5 \u2218 .)"
  },
  {
    "id": "circ-07",
    "authenticId": "SOF-IMO-G09-CIRCLES-Q007",
    "band": "D2",
    "title": "Cyclic Quadrilateral Opposite Angle Bisectors Invariant [IMO G09-07]",
    "promptHtml": "Let $ABCD$ A BC D be a cyclic quadrilateral. The internal angle bisectors of opposite angles $\\angle A$ \u2220 A and $\\angle C$ \u2220 C intersect the circumcircle at points $P$ P and $Q$ Q respectively. What can be concluded about the line segment $PQ$ PQ ?",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) P Q PQ"
      },
      {
        "id": "opt-B",
        "text": "(B) P Q PQ"
      },
      {
        "id": "opt-C",
        "text": "(C) P Q PQ"
      },
      {
        "id": "opt-D",
        "text": "(D) P Q PQ"
      }
    ],
    "explanationHtml": " (Tempting Mistake & Why It Fails: Guessing parallelism to diagonals rather than using the $90^\\circ$ 9 0 \u2218 diameter invariant.)"
  },
  {
    "id": "circ-08",
    "authenticId": "SOF-IMO-G09-CIRCLES-Q008",
    "band": "D2",
    "title": "Intersecting Chords Segment Product Theorem [IMO G09-08]",
    "promptHtml": "In the given figure, two chords $AB$ A B and $CD$ C D of a circle intersect at an interior point $P$ P . If $AP = 6\\text{ cm}$ A P = 6 cm , $PB = 8\\text{ cm}$ PB = 8 cm , and $CP = 4\\text{ cm}$ CP = 4 cm , find the total length of chord $CD$ C D .",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) 14 cm 14\\text{ cm}"
      },
      {
        "id": "opt-B",
        "text": "(B) 15 cm 15\\text{ cm}"
      },
      {
        "id": "opt-C",
        "text": "(C) 16 cm 16\\text{ cm}"
      },
      {
        "id": "opt-D",
        "text": "(D) 18 cm 18\\text{ cm}"
      }
    ],
    "explanationHtml": " (Tempting Mistake & Why It Fails: Reporting the segment $PD = 12\\text{ cm}$ P D = 12 cm instead of the full chord length $CD = 16\\text{ cm}$ C D = 16 cm .)"
  },
  {
    "id": "circ-09",
    "authenticId": "SOF-IMO-G09-CIRCLES-Q009",
    "band": "D2",
    "title": "Distance Between Two Parallel Chords Across Centre [IMO G09-09]",
    "promptHtml": "In a circle of radius $10\\text{ cm}$ 10 cm , two parallel chords $AB$ A B and $CD$ C D of lengths $16\\text{ cm}$ 16 cm and $12\\text{ cm}$ 12 cm respectively lie on opposite sides of the centre $O$ O . Find the perpendicular distance between the two chords.",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) 2 cm 2\\text{ cm}"
      },
      {
        "id": "opt-B",
        "text": "(B) 10 cm 10\\text{ cm}"
      },
      {
        "id": "opt-C",
        "text": "(C) 14 cm 14\\text{ cm}"
      },
      {
        "id": "opt-D",
        "text": "(D) 16 cm 16\\text{ cm}"
      }
    ],
    "explanationHtml": " (Tempting Mistake & Why It Fails: Subtracting distances ($8 - 6 = 2$ 8 \u2212 6 = 2 ) instead of adding them when chords lie on opposite sides of the centre.)"
  },
  {
    "id": "circ-10",
    "authenticId": "SOF-IMO-G09-CIRCLES-Q010",
    "band": "D2",
    "title": "Common Chord of Circles Passing Through Each Other's Centres [IMO G09-10]",
    "promptHtml": "Two circles of equal radius $5\\text{ cm}$ 5 cm intersect each other such that each circle passes through the centre of the other. Find the exact length of their common chord.",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) 5 cm 5\\text{ cm}"
      },
      {
        "id": "opt-B",
        "text": "(B) 5 2 cm 5\\sqrt{2}\\text{ cm}"
      },
      {
        "id": "opt-C",
        "text": "(C) 5 3 cm 5\\sqrt{3}\\text{ cm}"
      },
      {
        "id": "opt-D",
        "text": "(D) 10 cm 10\\text{ cm}"
      }
    ],
    "explanationHtml": " (Tempting Mistake & Why It Fails: Confusing the equilateral triangle altitude formula with right-isosceles triangle geometry.)"
  },
  {
    "id": "circ-11",
    "authenticId": "SOF-IMO-G09-CIRCLES-Q011",
    "band": "D2",
    "title": "Cyclic Trapezoid Base Angles and Symmetry [IMO G09-11]",
    "promptHtml": "Quadrilateral $ABCD$ A BC D is inscribed in a circle such that $AB \\parallel CD$ A B \u2225 C D . If $\\angle A = 70^\\circ$ \u2220 A = 7 0 \u2218 , find the measures of $\\angle B, \\angle C$ \u2220 B , \u2220 C , and $\\angle D$ \u2220 D .",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) \u2220 B = 11 0 \u2218 , \u2220 C = 7 0 \u2218 , \u2220 D = 11 0 \u2218 \\angle B = 110^\\circ, \\angle C = 70^\\circ, \\angle D = 110^\\circ"
      },
      {
        "id": "opt-B",
        "text": "(B) \u2220 B = 7 0 \u2218 , \u2220 C = 11 0 \u2218 , \u2220 D = 11 0 \u2218 \\angle B = 70^\\circ, \\angle C = 110^\\circ, \\angle D = 110^\\circ"
      },
      {
        "id": "opt-C",
        "text": "(C) \u2220 B = 7 0 \u2218 , \u2220 C = 7 0 \u2218 , \u2220 D = 11 0 \u2218 \\angle B = 70^\\circ, \\angle C = 70^\\circ, \\angle D = 110^\\circ"
      },
      {
        "id": "opt-D",
        "text": "(D) \u2220 B = 11 0 \u2218 , \u2220 C = 11 0 \u2218 , \u2220 D = 7 0 \u2218 \\angle B = 110^\\circ, \\angle C = 110^\\circ, \\angle D = 70^\\circ"
      }
    ],
    "explanationHtml": " (Tempting Mistake & Why It Fails: Assuming $ABCD$ A BC D is a parallelogram (which would require opposite angles to be equal, impossible for a non-rectangular cyclic quad).)"
  },
  {
    "id": "circ-12",
    "authenticId": "SOF-IMO-G09-CIRCLES-Q012",
    "band": "D2",
    "title": "Exterior Angle Transfer in Cyclic Quadrilateral [IMO G09-12]",
    "promptHtml": "In a cyclic quadrilateral $ABCD$ A BC D , side $AB$ A B is produced to a point $E$ E . If $\\angle CBE = 82^\\circ$ \u2220 CBE = 8 2 \u2218 and $\\angle BAC = 42^\\circ$ \u2220 B A C = 4 2 \u2218 , find the measures of $\\angle BDC$ \u2220 B D C and $\\angle ADC$ \u2220 A D C .",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) \u2220 B D C = 4 2 \u2218 , \u2220 A D C = 8 2 \u2218 \\angle BDC = 42^\\circ, \\angle ADC = 82^\\circ"
      },
      {
        "id": "opt-B",
        "text": "(B) \u2220 B D C = 8 2 \u2218 , \u2220 A D C = 4 2 \u2218 \\angle BDC = 82^\\circ, \\angle ADC = 42^\\circ"
      },
      {
        "id": "opt-C",
        "text": "(C) \u2220 B D C = 4 0 \u2218 , \u2220 A D C = 9 8 \u2218 \\angle BDC = 40^\\circ, \\angle ADC = 98^\\circ"
      },
      {
        "id": "opt-D",
        "text": "(D) \u2220 B D C = 4 2 \u2218 , \u2220 A D C = 9 8 \u2218 \\angle BDC = 42^\\circ, \\angle ADC = 98^\\circ"
      }
    ],
    "explanationHtml": " (Tempting Mistake & Why It Fails: Confusing interior opposite angle with adjacent linear pair angle.)"
  },
  {
    "id": "circ-13",
    "authenticId": "SOF-IMO-G09-CIRCLES-Q013",
    "band": "D3",
    "title": "Concentric Circles Tangent Chord Annulus Area Invariant [IMO G09-13]",
    "promptHtml": "In the given figure, a chord $AB$ A B of the outer circle of two concentric circles has length $20\\text{ cm}$ 20 cm and is tangent to the inner circle at point $T$ T . Find the exact area of the circular ring (annulus) bounded between the two circles.",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) 50 \u03c0 cm 2 50\\pi\\text{ cm}^2"
      },
      {
        "id": "opt-B",
        "text": "(B) 75 \u03c0 cm 2 75\\pi\\text{ cm}^2"
      },
      {
        "id": "opt-C",
        "text": "(C) 100 \u03c0 cm 2 100\\pi\\text{ cm}^2"
      },
      {
        "id": "opt-D",
        "text": "(D) 200 \u03c0 cm 2 200\\pi\\text{ cm}^2"
      }
    ],
    "explanationHtml": " (Tempting Mistake & Why It Fails: Believing the problem lacks sufficient information because individual radii $R$ R and $r$ r are not given.)"
  },
  {
    "id": "circ-14",
    "authenticId": "SOF-IMO-G09-CIRCLES-Q014",
    "band": "D3",
    "title": "Concyclicity of Orthocentre and Altitude Feet [IMO G09-14]",
    "promptHtml": "In an acute triangle $ABC$ A BC , altitudes $AD$ A D and $BE$ BE intersect at the orthocentre $H$ H . Which of the following statements is mathematically true regarding the points $C, D, H, E$ C , D , H , E ?",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) Points C , D , H , E C, D, H, E"
      },
      {
        "id": "opt-B",
        "text": "(B) Points C , D , H , E C, D, H, E"
      },
      {
        "id": "opt-C",
        "text": "(C) Points C , D , H , E C, D, H, E"
      },
      {
        "id": "opt-D",
        "text": "(D) Points C , D , H , E C, D, H, E"
      }
    ],
    "explanationHtml": " (Tempting Mistake & Why It Fails: Confusing the cyclic quadrilateral of the four vertices and altitude feet ($ABDE$ A B D E with diameter $AB$ A B ) with the orthocentre cyclic quadrilateral ($CDHE$ C DH E with diameter $CH$ C H ).)"
  },
  {
    "id": "circ-15",
    "authenticId": "SOF-IMO-G09-CIRCLES-Q015",
    "band": "D3",
    "title": "External Secant Angle and Intercepted Arc Difference [IMO G09-15]",
    "promptHtml": "Two secants $PAB$ P A B and $PCD$ PC D are drawn from an external point $P$ P to a circle, intersecting the circle at $A, B$ A , B and $C, D$ C , D respectively ($A$ A lies on segment $PB$ PB , $C$ C lies on segment $PD$ P D ). If the major intercepted arc $BD$ B D subtends a central angle of $110^\\circ$ 11 0 \u2218 and the minor intercepted arc $AC$ A C subtends a central angle of $40^\\circ$ 4 0 \u2218 , find the measure of $\\angle P$ \u2220 P .",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) 3 0 \u2218 30^\\circ"
      },
      {
        "id": "opt-B",
        "text": "(B) 3 5 \u2218 35^\\circ"
      },
      {
        "id": "opt-C",
        "text": "(C) 4 0 \u2218 40^\\circ"
      },
      {
        "id": "opt-D",
        "text": "(D) 4 5 \u2218 45^\\circ"
      }
    ],
    "explanationHtml": " (Tempting Mistake & Why It Fails: Adding the arcs instead of subtracting them (which applies to chords intersecting INSIDE a circle: $\\frac{110 + 40}{2} = 75^\\circ$ 2 110 + 40 \u200b = 7 5 \u2218 ).)"
  },
  {
    "id": "circ-16",
    "authenticId": "SOF-IMO-G09-CIRCLES-Q016",
    "band": "D3",
    "title": "Van Schooten's Inscribed Equilateral Triangle Invariant [IMO G09-16]",
    "promptHtml": "An equilateral triangle $ABC$ A BC is inscribed in a circle. A point $P$ P lies on the minor arc $BC$ BC . If $PB = 5\\text{ cm}$ PB = 5 cm and $PC = 7\\text{ cm}$ PC = 7 cm , find the exact length of the chord $PA$ P A .",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) 10 cm 10\\text{ cm}"
      },
      {
        "id": "opt-B",
        "text": "(B) 11 cm 11\\text{ cm}"
      },
      {
        "id": "opt-C",
        "text": "(C) 12 cm 12\\text{ cm}"
      },
      {
        "id": "opt-D",
        "text": "(D) 14 cm 14\\text{ cm}"
      }
    ],
    "explanationHtml": " (Tempting Mistake & Why It Fails: Attempting complicated trigonometry instead of leveraging the linear sum invariant of Ptolemy's theorem on equilateral cyclic quads.)"
  },
  {
    "id": "circ-17",
    "authenticId": "SOF-IMO-G09-CIRCLES-Q017",
    "band": "D3",
    "title": "Intersecting Circles Secant Angle Similarity Proof [IMO G09-17]",
    "promptHtml": "Two circles intersect at points $A$ A and $B$ B . Through the point of intersection $A$ A , two straight secants $CAD$ C A D and $EAF$ E A F are drawn intersecting the first circle at $C, E$ C , E and the second circle at $D, F$ D , F . What is the geometric relationship between $\\triangle CBE$ \u25b3 CBE and $\\triangle DBF$ \u25b3 D BF ?",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) They are congruent triangles ( \u25b3 C B E \u2245 \u25b3 D B F \\triangle CBE \\cong \\triangle DBF"
      },
      {
        "id": "opt-B",
        "text": "(B) They are similar triangles ( \u25b3 C B E \u223c \u25b3 D B F \\triangle CBE \\sim \\triangle DBF"
      },
      {
        "id": "opt-C",
        "text": "(C) They are disjoint right-angled triangles"
      },
      {
        "id": "opt-D",
        "text": "(D) No geometric relationship exists unless the circles have identical radii"
      }
    ],
    "explanationHtml": " (Tempting Mistake & Why It Fails: Assuming the triangles must be congruent instead of recognizing scaling similarity.)"
  },
  {
    "id": "circ-18",
    "authenticId": "SOF-IMO-G09-CIRCLES-Q018",
    "band": "D3",
    "title": "Radius of Inscribed Circle Among Three Mutually Touching Circles [IMO G09-18]",
    "promptHtml": "Three identical coins of radius $r = 6\\text{ cm}$ r = 6 cm lie flat on a table such that each coin touches the other two externally. A smaller coin of radius $r_0$ r 0 \u200b is placed in the central void touching all three coins externally. Find the exact radius $r_0$ r 0 \u200b of the smaller coin.",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) ( 2 3 \u2212 3 ) cm (2\\sqrt{3} - 3)\\text{ cm}"
      },
      {
        "id": "opt-B",
        "text": "(B) ( 4 3 \u2212 6 ) cm (4\\sqrt{3} - 6)\\text{ cm}"
      },
      {
        "id": "opt-C",
        "text": "(C) ( 3 3 \u2212 4 ) cm (3\\sqrt{3} - 4)\\text{ cm}"
      },
      {
        "id": "opt-D",
        "text": "(D) ( 6 \u2212 2 3 ) cm (6 - 2\\sqrt{3})\\text{ cm}"
      }
    ],
    "explanationHtml": " (Tempting Mistake & Why It Fails: Using the inradius of the equilateral triangle ($r_\\text{in} = \\frac{s}{2\\sqrt{3}}$ r in \u200b = 2 3 \u200b s \u200b ) instead of the circumradius distance from centroid to vertex.)"
  },
  {
    "id": "circ-19",
    "authenticId": "SOF-IMO-G09-CIRCLES-Q019",
    "band": "D3",
    "title": "Invariant Chord Product through Fixed Interior Point [IMO G09-19]",
    "promptHtml": "Through a fixed point $P$ P situated at a distance $d = 7\\text{ cm}$ d = 7 cm from the centre of a circle of radius $R = 9\\text{ cm}$ R = 9 cm , various chords are drawn. Find the exact numerical value of the product $PA \\cdot PB$ P A \u22c5 PB for any chord $AB$ A B passing through $P$ P .",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) 16 16"
      },
      {
        "id": "opt-B",
        "text": "(B) 28 28"
      },
      {
        "id": "opt-C",
        "text": "(C) 32 32"
      },
      {
        "id": "opt-D",
        "text": "(D) 64 64"
      }
    ],
    "explanationHtml": " (Tempting Mistake & Why It Fails: Believing the product changes as the chord rotates around the pivot point $P$ P .)"
  },
  {
    "id": "circ-20",
    "authenticId": "SOF-IMO-G09-CIRCLES-Q020",
    "band": "D3",
    "title": "Maximum Area of Inscribed Triangle in Semicircle [IMO G09-20]",
    "promptHtml": "A triangle is inscribed in a semicircle of radius $R = 8\\text{ cm}$ R = 8 cm such that one of its sides is the diameter of the semicircle. Find the maximum possible area of such an inscribed triangle.",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) 32 cm 2 32\\text{ cm}^2"
      },
      {
        "id": "opt-B",
        "text": "(B) 48 cm 2 48\\text{ cm}^2"
      },
      {
        "id": "opt-C",
        "text": "(C) 64 cm 2 64\\text{ cm}^2"
      },
      {
        "id": "opt-D",
        "text": "(D) 128 cm 2 128\\text{ cm}^2"
      }
    ],
    "explanationHtml": " (Tempting Mistake & Why It Fails: Applying $\\frac{1}{2} R^2$ 2 1 \u200b R 2 by treating the radius $R$ R as the full base instead of the diameter $2R$ 2 R .)"
  },
  {
    "id": "circ-21",
    "authenticId": "SOF-IMO-G09-CIRCLES-Q021",
    "band": "D4",
    "title": "Dual Circle Secant Intersection Parallel Chord Proof [IMO G09-21]",
    "promptHtml": "Two circles $C_1$ C 1 \u200b and $C_2$ C 2 \u200b intersect at two distinct points $A$ A and $B$ B . A line through $A$ A intersects $C_1$ C 1 \u200b at $D$ D and $C_2$ C 2 \u200b at $E$ E . A second line through $B$ B intersects $C_1$ C 1 \u200b at $C$ C and $C_2$ C 2 \u200b at $F$ F . Which of the following relationships between segments $DC$ D C and $EF$ EF is universally and strictly true?",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) D C \u22a5 E F DC \\perp EF"
      },
      {
        "id": "opt-B",
        "text": "(B) D C \u2225 E F DC \\parallel EF"
      },
      {
        "id": "opt-C",
        "text": "(C) D C = E F DC = EF"
      },
      {
        "id": "opt-D",
        "text": "(D) D C DC"
      }
    ],
    "explanationHtml": " (Tempting Mistake & Why It Fails: Assuming non-parallelism because the lines visually look tilted when secants are drawn asymmetrically.)"
  },
  {
    "id": "circ-22",
    "authenticId": "SOF-IMO-G09-CIRCLES-Q022",
    "band": "D4",
    "title": "Ptolemy's Diagonal-Product Invariant in Cyclic Quadrilateral [IMO G09-22]",
    "promptHtml": "In the given figure, quadrilateral $ABCD$ A BC D is cyclic with consecutive side lengths $AB = 3$ A B = 3 , $BC = 4$ BC = 4 , $CD = 5$ C D = 5 , and $DA = 6$ D A = 6 . Diagonals $AC$ A C and $BD$ B D have lengths $d_1$ d 1 \u200b and $d_2$ d 2 \u200b respectively. Find the exact value of the product of the diagonals $d_1 d_2$ d 1 \u200b d 2 \u200b .",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) 35 35"
      },
      {
        "id": "opt-B",
        "text": "(B) 39 39"
      },
      {
        "id": "opt-C",
        "text": "(C) 42 42"
      },
      {
        "id": "opt-D",
        "text": "(D) 48 48"
      }
    ],
    "explanationHtml": " (Tempting Mistake & Why It Fails: Pairing adjacent sides instead of opposite sides ($(AB \\cdot BC) + (CD \\cdot DA) = 12 + 30 = 42$ ( A B \u22c5 BC ) + ( C D \u22c5 D A ) = 12 + 30 = 42 ).)"
  },
  {
    "id": "circ-23",
    "authenticId": "SOF-IMO-G09-CIRCLES-Q023",
    "band": "D4",
    "title": "Secant-Tangent Power of a Point Ratio Invariant [IMO G09-23]",
    "promptHtml": "In the given figure, from an external point $P$ P , a tangent $PT$ PT of length $12\\text{ cm}$ 12 cm is drawn to a circle. A secant line through $P$ P intersects the circle at points $A$ A and $B$ B (with $A$ A between $P$ P and $B$ B ) such that the internal chord length $AB$ A B is twice the external segment $PA$ P A ($AB = 2 PA$ A B = 2 P A ). Find the total length of the secant segment $PB$ PB .",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) 8 3 cm 8\\sqrt{3}\\text{ cm}"
      },
      {
        "id": "opt-B",
        "text": "(B) 10 3 cm 10\\sqrt{3}\\text{ cm}"
      },
      {
        "id": "opt-C",
        "text": "(C) 12 3 cm 12\\sqrt{3}\\text{ cm}"
      },
      {
        "id": "opt-D",
        "text": "(D) 16 cm 16\\text{ cm}"
      }
    ],
    "explanationHtml": " (Tempting Mistake & Why It Fails: Reporting the internal chord $AB = 8\\sqrt{3}$ A B = 8 3 \u200b instead of the full secant length $PB = 12\\sqrt{3}$ PB = 12 3 \u200b .)"
  },
  {
    "id": "circ-24",
    "authenticId": "SOF-IMO-G09-CIRCLES-Q024",
    "band": "D4",
    "title": "Right Triangle Inradius and Circumradius Sum Invariant [IMO G09-24]",
    "promptHtml": "A right-angled triangle has perpendicular legs of lengths $a = 15\\text{ cm}$ a = 15 cm and $b = 20\\text{ cm}$ b = 20 cm . Let $R$ R denote the radius of its circumcircle and $r$ r denote the radius of its incircle. Find the exact numerical value of the sum $(R + r)$ ( R + r ) .",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) 15.0 cm 15.0\\text{ cm}"
      },
      {
        "id": "opt-B",
        "text": "(B) 17.5 cm 17.5\\text{ cm}"
      },
      {
        "id": "opt-C",
        "text": "(C) 19.0 cm 19.0\\text{ cm}"
      },
      {
        "id": "opt-D",
        "text": "(D) 20.0 cm 20.0\\text{ cm}"
      }
    ],
    "explanationHtml": " (Tempting Mistake & Why It Fails: Forgetting that circumcentre is at the midpoint of hypotenuse, attempting complicated angle bisector derivations.)"
  },
  {
    "id": "circ-25",
    "authenticId": "SOF-IMO-G09-CIRCLES-Q025",
    "band": "D4",
    "title": "Euler's Incentre-Circumcentre Distance Formula Invariant [IMO G09-25]",
    "promptHtml": "In a triangle with circumradius $R = 10\\text{ cm}$ R = 10 cm and inradius $r = 4\\text{ cm}$ r = 4 cm , find the exact distance $d$ d between the circumcentre $O$ O and the incentre $I$ I .",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) 2 3 cm 2\\sqrt{3}\\text{ cm}"
      },
      {
        "id": "opt-B",
        "text": "(B) 2 5 cm 2\\sqrt{5}\\text{ cm}"
      },
      {
        "id": "opt-C",
        "text": "(C) 4 cm 4\\text{ cm}"
      },
      {
        "id": "opt-D",
        "text": "(D) 3 2 cm 3\\sqrt{2}\\text{ cm}"
      }
    ],
    "explanationHtml": " (Tempting Mistake & Why It Fails: Guessing $d = R - r = 6$ d = R \u2212 r = 6 (which applies to tangent circles, not triangle centres).)"
  },
  {
    "id": "circ-26",
    "authenticId": "SOF-IMO-G09-CIRCLES-Q026",
    "band": "D1",
    "title": "Circle Uniqueness through Non-Collinear Points [IMO G09-26]",
    "promptHtml": "How many distinct circles can pass through three given non-collinear points in a plane?",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) Infinitely many"
      },
      {
        "id": "opt-B",
        "text": "(B) Exactly two"
      },
      {
        "id": "opt-C",
        "text": "(C) Exactly one"
      },
      {
        "id": "opt-D",
        "text": "(D) Zero"
      }
    ],
    "explanationHtml": " (Tempting Mistake & Why It Fails: assuming that infinitely many circles can pass through three non-collinear points by varying radius)"
  },
  {
    "id": "circ-27",
    "authenticId": "SOF-IMO-G09-CIRCLES-Q027",
    "band": "D1",
    "title": "Impossibility of Circle Through Three Collinear Points [IMO G09-27]",
    "promptHtml": "Which of the following statements rigorously explains why no circle can pass through three distinct collinear points $P, Q,$ P , Q , and $R$ R ?",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) A circle cannot have a radius greater than the distance P R PR"
      },
      {
        "id": "opt-B",
        "text": "(B) The perpendicular bisectors of P Q PQ"
      },
      {
        "id": "opt-C",
        "text": "(C) The sum of distances P Q + Q R PQ + QR"
      },
      {
        "id": "opt-D",
        "text": "(D) Three collinear points always have an angle of 9 0 \u2218 90^\\circ"
      }
    ],
    "explanationHtml": " (Tempting Mistake & Why It Fails: claiming circles cannot pass through collinear points due to a radius upper bound)"
  },
  {
    "id": "circ-28",
    "authenticId": "SOF-IMO-G09-CIRCLES-Q028",
    "band": "D1",
    "title": "Equidistant Chords Length Equivalence [IMO G09-28]",
    "promptHtml": "In a circle with centre $O$ O and radius $10\\text{ cm}$ 10 cm , two chords $AB$ A B and $CD$ C D are at the same perpendicular distance of $6\\text{ cm}$ 6 cm from $O$ O . If chord $AB$ A B has length $16\\text{ cm}$ 16 cm , what is the length of chord $CD$ C D ?",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) 8 cm 8\\text{ cm}"
      },
      {
        "id": "opt-B",
        "text": "(B) 12 cm 12\\text{ cm}"
      },
      {
        "id": "opt-C",
        "text": "(C) 16 cm 16\\text{ cm}"
      },
      {
        "id": "opt-D",
        "text": "(D) 20 cm 20\\text{ cm}"
      }
    ],
    "explanationHtml": " (Tempting Mistake & Why It Fails: halving the chord length or computing the half-chord length 8 cm)"
  },
  {
    "id": "circ-29",
    "authenticId": "SOF-IMO-G09-CIRCLES-Q029",
    "band": "D1",
    "title": "Right Triangle Inradius Representation [IMO G09-29]",
    "promptHtml": "In a right-angled triangle with legs of length $a$ a and $b$ b and hypotenuse of length $c$ c , which algebraic formula correctly represents the inradius $r$ r of the incircle?",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) r = a + b + c 2 r = \\dfrac{a + b + c}{2}"
      },
      {
        "id": "opt-B",
        "text": "(B) r = a + b \u2212 c 2 r = \\dfrac{a + b - c}{2}"
      },
      {
        "id": "opt-C",
        "text": "(C) r = a \u22c5 b a + b + c r = \\dfrac{a \\cdot b}{a + b + c}"
      },
      {
        "id": "opt-D",
        "text": "(D) r = a 2 + b 2 \u2212 c r = \\sqrt{a^2 + b^2} - c"
      }
    ],
    "explanationHtml": " (Tempting Mistake & Why It Fails: confusing the inradius formula with the semi-perimeter s = (a+b+c)/2)"
  },
  {
    "id": "circ-30",
    "authenticId": "SOF-IMO-G09-CIRCLES-Q030",
    "band": "D2",
    "title": "Equal Subtended Central Angles and Chords [IMO G09-30]",
    "promptHtml": "In a circle with centre $O$ O , two chords $AB$ A B and $CD$ C D subtend equal angles at the centre, such that $\\angle AOB = \\angle COD = 70^\\circ$ \u2220 A OB = \u2220 CO D = 7 0 \u2218 . If the length of chord $AB$ A B is $8\\text{ cm}$ 8 cm , what is the length of chord $CD$ C D ?",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) 4 cm 4\\text{ cm}"
      },
      {
        "id": "opt-B",
        "text": "(B) 8 cm 8\\text{ cm}"
      },
      {
        "id": "opt-C",
        "text": "(C) 14 cm 14\\text{ cm}"
      },
      {
        "id": "opt-D",
        "text": "(D) 16 cm 16\\text{ cm}"
      }
    ],
    "explanationHtml": " (Tempting Mistake & Why It Fails: assuming chord length scales with the angle degree value or taking 70/8)"
  },
  {
    "id": "circ-31",
    "authenticId": "SOF-IMO-G09-CIRCLES-Q031",
    "band": "D2",
    "title": "Cyclic Quadrilateral Opposite Angle Sum Proof [IMO G09-31]",
    "promptHtml": "Which of the following steps provides the foundational geometric explanation for why the opposite angles of a cyclic quadrilateral $ABCD$ A BC D sum to $180^\\circ$ 18 0 \u2218 ?",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) The four angles of any polygon sum to 36 0 \u2218 360^\\circ"
      },
      {
        "id": "opt-B",
        "text": "(B) The angle subtended by an arc at the centre is twice the angle subtended at the circumference; since the two opposite arcs together form the complete 36 0 \u2218 360^\\circ"
      },
      {
        "id": "opt-C",
        "text": "(C) Opposite sides of a cyclic quadrilateral are always parallel, making opposite interior angles consecutive supplementary angles."
      },
      {
        "id": "opt-D",
        "text": "(D) The diagonals of a cyclic quadrilateral always intersect perpendicularly, forcing opposite angles to sum to two right angles."
      }
    ],
    "explanationHtml": " (Tempting Mistake & Why It Fails: assuming cyclic quadrilaterals have parallel opposite sides)"
  },
  {
    "id": "circ-32",
    "authenticId": "SOF-IMO-G09-CIRCLES-Q032",
    "band": "D2",
    "title": "Parallel Chords Radius Determination [IMO G09-32]",
    "promptHtml": "Two parallel chords of lengths $10\\text{ cm}$ 10 cm and $24\\text{ cm}$ 24 cm are drawn on opposite sides of the centre of a circle. If the distance between the two chords is $17\\text{ cm}$ 17 cm , find the radius of the circle.",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) 11 cm 11\\text{ cm}"
      },
      {
        "id": "opt-B",
        "text": "(B) 13 cm 13\\text{ cm}"
      },
      {
        "id": "opt-C",
        "text": "(C) 15 cm 15\\text{ cm}"
      },
      {
        "id": "opt-D",
        "text": "(D) 17 cm 17\\text{ cm}"
      }
    ],
    "explanationHtml": " (Tempting Mistake & Why It Fails: setting d1 - d2 = 17 cm (which corresponds to chords on the same side of the centre))"
  },
  {
    "id": "circ-33",
    "authenticId": "SOF-IMO-G09-CIRCLES-Q033",
    "band": "D2",
    "title": "Segments of Equal Intersecting Chords Invariant [IMO G09-33]",
    "promptHtml": "Two equal chords $AB$ A B and $CD$ C D of a circle intersect at a point $X$ X inside the circle. If $AX = 9\\text{ cm}$ A X = 9 cm and $XB = 4\\text{ cm}$ XB = 4 cm , what are the lengths of the two segments $CX$ CX and $XD$ X D of chord $CD$ C D ?",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) C X = 6 cm CX = 6\\text{ cm}"
      },
      {
        "id": "opt-B",
        "text": "(B) C X = 9 cm CX = 9\\text{ cm}"
      },
      {
        "id": "opt-C",
        "text": "(C) C X = 6.5 cm CX = 6.5\\text{ cm}"
      },
      {
        "id": "opt-D",
        "text": "(D) C X = 10 cm CX = 10\\text{ cm}"
      }
    ],
    "explanationHtml": " (Tempting Mistake & Why It Fails: assuming segments must be equal to their arithmetic mean (6.5 cm each))"
  },
  {
    "id": "circ-34",
    "authenticId": "SOF-IMO-G09-CIRCLES-Q034",
    "band": "D2",
    "title": "Angle in Semicircle Composite Vertex Calculation [IMO G09-34]",
    "promptHtml": "In a circle with centre $O$ O , diagonal $AC$ A C is a diameter. Points $B$ B and $D$ D lie on the circle on opposite sides of diameter $AC$ A C . If $\\angle BAC = 32^\\circ$ \u2220 B A C = 3 2 \u2218 and $\\angle CAD = 48^\\circ$ \u2220 C A D = 4 8 \u2218 , find the measure of $\\angle BCD$ \u2220 BC D .",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) 8 0 \u2218 80^\\circ"
      },
      {
        "id": "opt-B",
        "text": "(B) 9 0 \u2218 90^\\circ"
      },
      {
        "id": "opt-C",
        "text": "(C) 10 0 \u2218 100^\\circ"
      },
      {
        "id": "opt-D",
        "text": "(D) 11 0 \u2218 110^\\circ"
      }
    ],
    "explanationHtml": " (Tempting Mistake & Why It Fails: simply adding BAC + CAD = 32 + 48 = 80 deg and assuming BCD equals BAD)"
  },
  {
    "id": "circ-35",
    "authenticId": "SOF-IMO-G09-CIRCLES-Q035",
    "band": "D2",
    "title": "Common Chord of Intersecting Equal Circles [IMO G09-35]",
    "promptHtml": "Two intersecting circles of equal radius $5\\text{ cm}$ 5 cm have their centres at $O_1$ O 1 \u200b and $O_2$ O 2 \u200b , separated by a distance of $6\\text{ cm}$ 6 cm . What is the length of their common chord $AB$ A B ?",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) 4 cm 4\\text{ cm}"
      },
      {
        "id": "opt-B",
        "text": "(B) 6 cm 6\\text{ cm}"
      },
      {
        "id": "opt-C",
        "text": "(C) 8 cm 8\\text{ cm}"
      },
      {
        "id": "opt-D",
        "text": "(D) 10 cm 10\\text{ cm}"
      }
    ],
    "explanationHtml": " (Tempting Mistake & Why It Fails: reporting the half-chord length 4 cm instead of the full chord AB)"
  },
  {
    "id": "circ-36",
    "authenticId": "SOF-IMO-G09-CIRCLES-Q036",
    "band": "D2",
    "title": "Isosceles Trapezium Concyclicity Justification [IMO G09-36]",
    "promptHtml": "Let $ABCD$ A BC D be a trapezium with $AB \\parallel CD$ A B \u2225 C D . Which condition is both necessary and sufficient for $ABCD$ A BC D to be a cyclic quadrilateral?",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) Diagonals A C AC"
      },
      {
        "id": "opt-B",
        "text": "(B) The non-parallel sides must be equal ( A D = B C AD = BC"
      },
      {
        "id": "opt-C",
        "text": "(C) The sum of the parallel sides must equal the sum of the non-parallel sides ( A B + C D = A D + B C AB + CD = AD + BC"
      },
      {
        "id": "opt-D",
        "text": "(D) The area of the trapezium must equal 1 2 ( A B + C D ) \u00d7 A D \\frac{1}{2} (AB + CD) \\times AD"
      }
    ],
    "explanationHtml": " (Tempting Mistake & Why It Fails: confusing cyclic quadrilateral condition with tangential quadrilateral condition (Pitot theorem: AB + CD = AD + BC))"
  },
  {
    "id": "circ-37",
    "authenticId": "SOF-IMO-G09-CIRCLES-Q037",
    "band": "D2",
    "title": "External Point Tangent Length Computation [IMO G09-37]",
    "promptHtml": "From an external point $P$ P , a tangent $PT$ PT is drawn to a circle with centre $O$ O and radius $5\\text{ cm}$ 5 cm . If the point $P$ P is at a distance of $13\\text{ cm}$ 13 cm from the centre $O$ O , what is the length of tangent segment $PT$ PT ?",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) 8 cm 8\\text{ cm}"
      },
      {
        "id": "opt-B",
        "text": "(B) 10 cm 10\\text{ cm}"
      },
      {
        "id": "opt-C",
        "text": "(C) 12 cm 12\\text{ cm}"
      },
      {
        "id": "opt-D",
        "text": "(D) 14 cm 14\\text{ cm}"
      }
    ],
    "explanationHtml": " (Tempting Mistake & Why It Fails: computing OP - r = 13 - 5 = 8 cm)"
  },
  {
    "id": "circ-38",
    "authenticId": "SOF-IMO-G09-CIRCLES-Q038",
    "band": "D2",
    "title": "Pitot Tangential Quadrilateral Side Invariant [IMO G09-38]",
    "promptHtml": "A quadrilateral $ABCD$ A BC D is circumscribed about a circle, touching all four sides. If $AB = 6\\text{ cm}$ A B = 6 cm , $BC = 7\\text{ cm}$ BC = 7 cm , and $CD = 4\\text{ cm}$ C D = 4 cm , what is the length of side $DA$ D A ?",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) 3 cm 3\\text{ cm}"
      },
      {
        "id": "opt-B",
        "text": "(B) 5 cm 5\\text{ cm}"
      },
      {
        "id": "opt-C",
        "text": "(C) 7 cm 7\\text{ cm}"
      },
      {
        "id": "opt-D",
        "text": "(D) 9 cm 9\\text{ cm}"
      }
    ],
    "explanationHtml": " (Tempting Mistake & Why It Fails: assuming opposite sides are equal (DA = BC = 7 cm))"
  },
  {
    "id": "circ-39",
    "authenticId": "SOF-IMO-G09-CIRCLES-Q039",
    "band": "D3",
    "title": "Simson's Line Collinearity Criterion [IMO G09-39]",
    "promptHtml": "Let $P$ P be a point in the plane of $\\triangle ABC$ \u25b3 A BC . Perpendiculars are dropped from $P$ P to the three lines containing the sides $BC, CA,$ BC , C A , and $AB$ A B , meeting them at $X, Y,$ X , Y , and $Z$ Z respectively. Under what exact geometric condition are the three feet $X, Y,$ X , Y , and $Z$ Z collinear?",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) Point P P"
      },
      {
        "id": "opt-B",
        "text": "(B) Point P P"
      },
      {
        "id": "opt-C",
        "text": "(C) Point P P"
      },
      {
        "id": "opt-D",
        "text": "(D) Point P P"
      }
    ],
    "explanationHtml": " (Tempting Mistake & Why It Fails: assuming P must be a classical triangle centre like the orthocentre or incentre)"
  },
  {
    "id": "circ-40",
    "authenticId": "SOF-IMO-G09-CIRCLES-Q040",
    "band": "D3",
    "title": "Angle Bisectors Form Cyclic Quadrilateral Proof [IMO G09-40]",
    "promptHtml": "Let $ABCD$ A BC D be any convex quadrilateral. The internal bisectors of the four interior angles $\\angle A, \\angle B, \\angle C, \\angle D$ \u2220 A , \u2220 B , \u2220 C , \u2220 D intersect to form an interior quadrilateral $PQRS$ PQRS . Which deductive reasoning explains why $PQRS$ PQRS is always a cyclic quadrilateral?",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) Because the sum of all four angle bisectors equals 36 0 \u2218 360^\\circ"
      },
      {
        "id": "opt-B",
        "text": "(B) Because opposite angles of P Q R S PQRS"
      },
      {
        "id": "opt-C",
        "text": "(C) Because the diagonals of P Q R S PQRS"
      },
      {
        "id": "opt-D",
        "text": "(D) Because every convex quadrilateral has an inscribed circle."
      }
    ],
    "explanationHtml": " (Tempting Mistake & Why It Fails: assuming ABCD itself must be cyclic for PQRS to be cyclic)"
  },
  {
    "id": "circ-41",
    "authenticId": "SOF-IMO-G09-CIRCLES-Q041",
    "band": "D3",
    "title": "Brahmagupta Cyclic Quadrilateral Area [IMO G09-41]",
    "promptHtml": "A cyclic quadrilateral $ABCD$ A BC D has side lengths $a = 25$ a = 25 , $b = 39$ b = 39 , $c = 52$ c = 52 , and $d = 60$ d = 60 . Find the exact area of quadrilateral $ABCD$ A BC D .",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) 1584 1584"
      },
      {
        "id": "opt-B",
        "text": "(B) 1680 1680"
      },
      {
        "id": "opt-C",
        "text": "(C) 1764 1764"
      },
      {
        "id": "opt-D",
        "text": "(D) 1848 1848"
      }
    ],
    "explanationHtml": " (Tempting Mistake & Why It Fails: using Heron's formula on arbitrary triangle halves without accounting for cyclic diagonal bounds)"
  },
  {
    "id": "circ-42",
    "authenticId": "SOF-IMO-G09-CIRCLES-Q042",
    "band": "D3",
    "title": "Miquel's Pivot Theorem Concurrency Invariant [IMO G09-42]",
    "promptHtml": "Let $D, E, F$ D , E , F be points chosen on the sides $BC, CA, AB$ BC , C A , A B of $\\triangle ABC$ \u25b3 A BC respectively. The circumcircles of $\\triangle AFE$ \u25b3 A FE and $\\triangle BDF$ \u25b3 B D F intersect at a second point $M$ M distinct from $F$ F . Which fundamental cyclic invariant guarantees that the circumcircle of $\\triangle CDE$ \u25b3 C D E also passes through point $M$ M ?",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) The line F M FM"
      },
      {
        "id": "opt-B",
        "text": "(B) In cyclic quadrilaterals A F M E AFME"
      },
      {
        "id": "opt-C",
        "text": "(C) Point M M"
      },
      {
        "id": "opt-D",
        "text": "(D) Triangles \u25b3 A F E , \u25b3 B D F , \u25b3 C D E \\triangle AFE, \\triangle BDF, \\triangle CDE"
      }
    ],
    "explanationHtml": " (Tempting Mistake & Why It Fails: assuming M must be a special triangle centre like orthocentre or incentre)"
  },
  {
    "id": "circ-43",
    "authenticId": "SOF-IMO-G09-CIRCLES-Q043",
    "band": "D3",
    "title": "Intersecting Secants Chord Segment Resolution [IMO G09-43]",
    "promptHtml": "From an external point $P$ P , two secants $PAB$ P A B and $PCD$ PC D are drawn to a circle. Chord segment $AB = 5\\text{ cm}$ A B = 5 cm , external segment $PA = 4\\text{ cm}$ P A = 4 cm , and external segment $PC = 3\\text{ cm}$ PC = 3 cm . What is the length of chord segment $CD$ C D ?",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) 7 cm 7\\text{ cm}"
      },
      {
        "id": "opt-B",
        "text": "(B) 8 cm 8\\text{ cm}"
      },
      {
        "id": "opt-C",
        "text": "(C) 9 cm 9\\text{ cm}"
      },
      {
        "id": "opt-D",
        "text": "(D) 12 cm 12\\text{ cm}"
      }
    ],
    "explanationHtml": " (Tempting Mistake & Why It Fails: multiplying external segment by internal segment: PA * AB = PC * CD (4 * 5 = 3 * CD => CD = 20/3))"
  },
  {
    "id": "circ-44",
    "authenticId": "SOF-IMO-G09-CIRCLES-Q044",
    "band": "D3",
    "title": "Incircle Hypotenuse Segments Area Invariant [IMO G09-44]",
    "promptHtml": "The incircle of a right-angled triangle touches the hypotenuse at point $T$ T , dividing it into two segments of lengths $6\\text{ cm}$ 6 cm and $10\\text{ cm}$ 10 cm . What is the exact area of the right-angled triangle?",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) 30 cm 2 30\\text{ cm}^2"
      },
      {
        "id": "opt-B",
        "text": "(B) 48 cm 2 48\\text{ cm}^2"
      },
      {
        "id": "opt-C",
        "text": "(C) 60 cm 2 60\\text{ cm}^2"
      },
      {
        "id": "opt-D",
        "text": "(D) 96 cm 2 96\\text{ cm}^2"
      }
    ],
    "explanationHtml": " (Tempting Mistake & Why It Fails: assuming inradius r must be known before computing area)"
  },
  {
    "id": "circ-45",
    "authenticId": "SOF-IMO-G09-CIRCLES-Q045",
    "band": "D3",
    "title": "Butterfly Theorem Midpoint Invariant [IMO G09-45]",
    "promptHtml": "Let $M$ M be the midpoint of an arbitrary chord $PQ$ PQ of a circle. Two distinct chords $AB$ A B and $CD$ C D are drawn through $M$ M . Chords $AD$ A D and $BC$ BC intersect chord $PQ$ PQ at points $X$ X and $Y$ Y respectively. What is the fundamental relationship between segments $XM$ XM and $MY$ M Y ?",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) X M = 2 \u22c5 M Y XM = 2 \\cdot MY"
      },
      {
        "id": "opt-B",
        "text": "(B) X M = M Y XM = MY"
      },
      {
        "id": "opt-C",
        "text": "(C) X M + M Y = P Q XM + MY = PQ"
      },
      {
        "id": "opt-D",
        "text": "(D) X M \u22c5 M Y = M P 2 XM \\cdot MY = M P^2"
      }
    ],
    "explanationHtml": " (Tempting Mistake & Why It Fails: assuming the chords must be diameters or perpendicular for XM = MY to hold)"
  },
  {
    "id": "circ-46",
    "authenticId": "SOF-IMO-G09-CIRCLES-Q046",
    "band": "D4",
    "title": "Casey's Theorem Degenerate Chord Limit Explanation [IMO G09-46]",
    "promptHtml": "Casey's Theorem states that for four circles $O_1, O_2, O_3, O_4$ O 1 \u200b , O 2 \u200b , O 3 \u200b , O 4 \u200b tangent internally to a common circle in cyclic order, the lengths $t_{ij}$ t ij \u200b of their common external tangents satisfy $t_{12}t_{34} + t_{14}t_{23} = t_{13}t_{24}$ t 12 \u200b t 34 \u200b + t 14 \u200b t 23 \u200b = t 13 \u200b t 24 \u200b . Which mathematical explanation establishes that Ptolemy's Theorem is a degenerate case of Casey's Theorem?",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) When the central circle's radius approaches infinity, all circles become collinear points."
      },
      {
        "id": "opt-B",
        "text": "(B) When the radii of the four circles O 1 , O 2 , O 3 , O 4 O_1, O_2, O_3, O_4"
      },
      {
        "id": "opt-C",
        "text": "(C) Casey's theorem only applies to circles with equal diameters, which forces the common tangent to equal the side length."
      },
      {
        "id": "opt-D",
        "text": "(D) Ptolemy's theorem requires non-cyclic quadrilaterals, whereas Casey's theorem requires cyclic arrangements."
      }
    ],
    "explanationHtml": " (Tempting Mistake & Why It Fails: assuming Casey's theorem requires inversion to reduce to Ptolemy)"
  },
  {
    "id": "circ-47",
    "authenticId": "SOF-IMO-G09-CIRCLES-Q047",
    "band": "D4",
    "title": "Radical Axis Distance Model [IMO G09-47]",
    "promptHtml": "Two non-concentric circles $C_1$ C 1 \u200b and $C_2$ C 2 \u200b have radii $r_1 = 8\\text{ cm}$ r 1 \u200b = 8 cm and $r_2 = 6\\text{ cm}$ r 2 \u200b = 6 cm , and the distance between their centres $O_1$ O 1 \u200b and $O_2$ O 2 \u200b is $10\\text{ cm}$ 10 cm . At what distance from centre $O_1$ O 1 \u200b does their radical axis intersect the line of centres $O_1O_2$ O 1 \u200b O 2 \u200b ?",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) 5.0 cm 5.0\\text{ cm}"
      },
      {
        "id": "opt-B",
        "text": "(B) 6.4 cm 6.4\\text{ cm}"
      },
      {
        "id": "opt-C",
        "text": "(C) 7.2 cm 7.2\\text{ cm}"
      },
      {
        "id": "opt-D",
        "text": "(D) 8.0 cm 8.0\\text{ cm}"
      }
    ],
    "explanationHtml": " (Tempting Mistake & Why It Fails: assuming the radical axis lies halfway between the centres at 5.0 cm)"
  },
  {
    "id": "circ-48",
    "authenticId": "SOF-IMO-G09-CIRCLES-Q048",
    "band": "D4",
    "title": "Euler Nine-Point Circle Radius and Centre Invariant [IMO G09-48]",
    "promptHtml": "In $\\triangle ABC$ \u25b3 A BC , the circumradius is $R = 14\\text{ cm}$ R = 14 cm , and the distance between the circumcentre $O$ O and the orthocentre $H$ H is $18\\text{ cm}$ 18 cm . Find the radius $R_9$ R 9 \u200b of the Nine-Point Circle of $\\triangle ABC$ \u25b3 A BC and the distance from the Nine-Point Centre $N$ N to the circumcentre $O$ O .",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) R 9 = 7 cm R_9 = 7\\text{ cm}"
      },
      {
        "id": "opt-B",
        "text": "(B) R 9 = 7 cm R_9 = 7\\text{ cm}"
      },
      {
        "id": "opt-C",
        "text": "(C) R 9 = 9 cm R_9 = 9\\text{ cm}"
      },
      {
        "id": "opt-D",
        "text": "(D) R 9 = 14 cm R_9 = 14\\text{ cm}"
      }
    ],
    "explanationHtml": " (Tempting Mistake & Why It Fails: confusing Nine-Point Centre N with centroid G (which divides OH in 2:1 ratio: OG = 6 cm))"
  },
  {
    "id": "circ-49",
    "authenticId": "SOF-IMO-G09-CIRCLES-Q049",
    "band": "D4",
    "title": "Incentre-Excentre Lemma Arc Midpoint Circle [IMO G09-49]",
    "promptHtml": "In $\\triangle ABC$ \u25b3 A BC , the internal bisector of $\\angle A$ \u2220 A meets the circumcircle at $M$ M . Let $I$ I be the incentre of $\\triangle ABC$ \u25b3 A BC . Which rigorous angle-chasing identity justifies that point $M$ M is the circumcentre of $\\triangle BIC$ \u25b3 B I C , proving that $MB = MC = MI$ MB = MC = M I ?",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) \u2220 M B I = \u2220 M B C + \u2220 C B I = 1 2 \u2220 A + 1 2 \u2220 B \\angle MBI = \\angle MBC + \\angle CBI = \\frac{1}{2}\\angle A + \\frac{1}{2}\\angle B"
      },
      {
        "id": "opt-B",
        "text": "(B) Point M M"
      },
      {
        "id": "opt-C",
        "text": "(C) The radius of the incircle is always half the radius of the circumcircle."
      },
      {
        "id": "opt-D",
        "text": "(D) Triangles \u25b3 M B I \\triangle MBI"
      }
    ],
    "explanationHtml": " (Tempting Mistake & Why It Fails: assuming M is the orthocentre or centroid of the triangle)"
  },
  {
    "id": "circ-50",
    "authenticId": "SOF-IMO-G09-CIRCLES-Q050",
    "band": "D4",
    "title": "Ptolemy Inequality Sharpness and Circular Inversion Model [IMO G09-50]",
    "promptHtml": "For any four distinct points $A, B, C, D$ A , B , C , D in a plane, Ptolemy's Inequality asserts that $AC \\cdot BD \\le AB \\cdot CD + BC \\cdot DA$ A C \u22c5 B D \u2264 A B \u22c5 C D + BC \u22c5 D A . If an inversion centered at $A$ A with radius $k$ k maps $B, C, D$ B , C , D to $B', C', D'$ B \u2032 , C \u2032 , D \u2032 , which geometric deduction establishes the exact condition under which equality holds?",
    "options": [
      {
        "id": "opt-A",
        "text": "(A) Under inversion, transformed distances satisfy B \u2032 D \u2032 \u2264 B \u2032 C \u2032 + C \u2032 D \u2032 B'D' \\le B'C' + C'D'"
      },
      {
        "id": "opt-B",
        "text": "(B) Equality holds if and only if quadrilateral A B C D ABCD"
      },
      {
        "id": "opt-C",
        "text": "(C) Equality holds if and only if the four points form two perpendicular line segments."
      },
      {
        "id": "opt-D",
        "text": "(D) Under inversion, distances are preserved invariantly, forcing A C \u22c5 B D AC \\cdot BD"
      }
    ],
    "explanationHtml": " (Tempting Mistake & Why It Fails: claiming equality holds for any convex quadrilateral)"
  }
];
export const CIRCLE_QUESTIONS_CORPUS = CIRCLES_50_CORPUS;

// ---------------------------------------------------------------------------
// 2. Circles Master Controller
// ---------------------------------------------------------------------------

export class CirclesMasterController {
  private state: CirclesMasterState;
  private readonly storageKey = 'g9_circles_master_state';

  constructor() {
    this.state = this.loadInitialState();
  }

  private loadInitialState(): CirclesMasterState {
    try {
      if (typeof localStorage !== 'undefined') {
        const saved = localStorage.getItem(this.storageKey);
        if (saved) {
          const parsed = JSON.parse(saved);
          return {
            selectedFilter: parsed.selectedFilter || 'all',
            searchQuery: parsed.searchQuery || '',
            responses: parsed.responses || {},
            radius: typeof parsed.radius === 'number' ? parsed.radius : 5,
            centerX: typeof parsed.centerX === 'number' ? parsed.centerX : 0,
            centerY: typeof parsed.centerY === 'number' ? parsed.centerY : 0,
          };
        }
      }
    } catch {
      // Fallback to default
    }

    return {
      selectedFilter: 'all',
      searchQuery: '',
      responses: {},
      radius: 5,
      centerX: 0,
      centerY: 0,
    };
  }

  private persistState(): void {
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(this.storageKey, JSON.stringify(this.state));
      }
    } catch {
      // Silent error in test/sandboxed env
    }
  }

  getState(): CirclesMasterState {
    return { ...this.state };
  }

  getQuestions(): readonly CircleQuestionCard[] {
    return CIRCLES_50_CORPUS;
  }

  getVisibleCards(): readonly CircleQuestionCard[] {
    return this.getFilteredQuestions();
  }

  getFilteredQuestions(): readonly CircleQuestionCard[] {
    return CIRCLES_50_CORPUS.filter((q) => {
      const matchesFilter =
        this.state.selectedFilter === 'all' || q.band === this.state.selectedFilter;
      const qLower = this.state.searchQuery.toLowerCase().trim();
      const matchesSearch =
        !qLower ||
        q.title.toLowerCase().includes(qLower) ||
        q.promptHtml.toLowerCase().includes(qLower);
      return matchesFilter && matchesSearch;
    });
  }

  getFilter(): string {
    return this.state.selectedFilter;
  }

  setFilter(filter: string): void {
    this.state = { ...this.state, selectedFilter: filter };
    this.persistState();
  }

  setSearchQuery(query: string): void {
    this.state = { ...this.state, searchQuery: query };
    this.persistState();
  }

  selectOption(questionId: string, optionId: string): void {
    this.recordAttempt(questionId, optionId);
  }

  recordAttempt(questionId: string, optionId: string): boolean {
    const updatedResponses = { ...this.state.responses, [questionId]: optionId };
    this.state = { ...this.state, responses: updatedResponses };
    this.persistState();
    return PRIVATE_CIRCLE_KEYS[questionId] === optionId;
  }

  getResponse(questionId: string): string | undefined {
    return this.state.responses[questionId];
  }

  getAttemptedCount(): number {
    return Object.keys(this.state.responses).length;
  }

  getCorrectCount(): number {
    return Object.entries(this.state.responses).filter(
      ([qid, optId]) => PRIVATE_CIRCLE_KEYS[qid] === optId
    ).length;
  }

  setCircleGeometry(radius?: number, centerX?: number, centerY?: number): void {
    this.state = {
      ...this.state,
      radius: radius !== undefined ? radius : this.state.radius,
      centerX: centerX !== undefined ? centerX : this.state.centerX,
      centerY: centerY !== undefined ? centerY : this.state.centerY,
    };
    this.persistState();
  }

  getCircleGeometry(): { radius: number; centerX: number; centerY: number } {
    return {
      radius: this.state.radius,
      centerX: this.state.centerX,
      centerY: this.state.centerY,
    };
  }

  isCorrect(questionId: string, optionId?: string): boolean {
    const chosen = optionId || this.state.responses[questionId];
    return PRIVATE_CIRCLE_KEYS[questionId] === chosen;
  }

  isQuestionAttempted(questionId: string): boolean {
    return Boolean(this.state.responses[questionId]);
  }

  getSelectedOption(questionId: string): string | undefined {
    return this.state.responses[questionId];
  }
}

// ---------------------------------------------------------------------------
// 3. Mount View Function (Pure Native DOM - No iframes)
// ---------------------------------------------------------------------------

export function mountCirclesMaster(
  root: HTMLElement,
  controller?: CirclesMasterController,
  onNavigate?: (route: string) => void
): { dispose: () => void } {
  const ctrl = controller ?? new CirclesMasterController();
  let active = true;

  const render = () => {
    if (!active) return;
    const state = ctrl.getState();
    const questions = ctrl.getFilteredQuestions();
    const attempted = ctrl.getAttemptedCount();
    const correct = ctrl.getCorrectCount();

    const scale = 10;
    const cx = 120 + state.centerX * scale;
    const cy = 120 - state.centerY * scale;
    const r = Math.max(5, state.radius * scale);

    root.innerHTML = `
      <div class="circles-master-hub" style="max-width:1400px;margin:0 auto;padding:1.5rem;box-sizing:border-box;font-family:var(--g9-font-family, system-ui,-apple-system,sans-serif);color:#0f172a;">
        <!-- Header -->
        <header style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:1rem;padding-bottom:1.25rem;border-bottom:2px solid #e2e8f0;margin-bottom:1.5rem;">
          <div>
            <div style="display:flex;gap:8px;font-size:0.9rem;color:#64748b;margin-bottom:0.25rem;flex-wrap:wrap;align-items:center;">
              <a href="#/home" style="color:#0284c7;text-decoration:none;font-weight:600;">Home</a> &gt;
              <a href="#/subject/mathematics" style="color:#0284c7;text-decoration:none;font-weight:600;">Mathematics</a> &gt;
              <a href="#/labs" style="color:#0284c7;text-decoration:none;font-weight:600;">Standalone Labs</a> &gt; 
              <span>Circles Master Workbench</span>
            </div>
            <div style="display:flex;gap:8px;align-items:center;">
              <span style="font-size:0.875rem;font-weight:800;background:#e0f2fe;color:#0369a1;padding:3px 8px;border-radius:4px;">MATHEMATICS GEOMETRY BENCHMARK</span>
              <span style="font-size:0.875rem;font-weight:700;background:#fee2e2;color:#991b1b;padding:3px 8px;border-radius:4px;">Academic Status: HOLD</span>
              <span style="font-size:0.875rem;font-weight:700;background:#f1f5f9;color:#475569;padding:3px 8px;border-radius:4px;">GRADE9 v3.5 PARITY · 50 CARDS</span>
            </div>
            <h1 class="placeholder-title" style="margin:0.5rem 0 0;font-size:1.9rem;font-weight:800;color:#0f172a;">⭕ Circles Master: Grade 9 IMO Circles &amp; Cyclic Quadrilaterals Suite</h1>
          </div>
          <div style="display:flex;gap:8px;flex-wrap:wrap;">
            <button type="button" id="btn-return-math" style="min-height:${HIT_TARGET_MIN_PX}px;padding:8px 16px;background:#0284c7;color:white;border:none;border-radius:6px;cursor:pointer;font-weight:700;">
              ← Return to Mathematics Hub
            </button>
            <button type="button" id="btn-return-labs" style="min-height:${HIT_TARGET_MIN_PX}px;padding:8px 16px;background:#0f172a;color:white;border:none;border-radius:6px;cursor:pointer;font-weight:700;">
              ← Labs Hub
            </button>
          </div>
        </header>

        <!-- Top Overview & Interactive Circle Sandbox -->
        <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(min(100%, 340px), 1fr));gap:1.5rem;margin-bottom:1.5rem;">
          <!-- Telemetry HUD -->
          <div style="background:#ffffff;border:1px solid #e2e8f0;border-radius:8px;padding:1.25rem;box-shadow:0 1px 3px rgba(0,0,0,0.05);display:flex;flex-direction:column;justify-content:center;">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.5rem;">
              <span style="font-size:0.9rem;color:#64748b;font-weight:600;">Questions Attempted</span>
              <span id="stat-attempted" style="font-size:1.5rem;font-weight:800;color:#0284c7;">${attempted}</span>
            </div>
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.75rem;">
              <span style="font-size:0.9rem;color:#64748b;font-weight:600;">Correct Verifications</span>
              <span id="stat-correct" style="font-size:1.5rem;font-weight:800;color:#10b981;">${correct}</span>
            </div>
            <div style="font-size:0.875rem;color:#64748b;border-top:1px solid #f1f5f9;padding-top:0.5rem;">
              🛡️ <strong>Fault N09 Key Defense Active</strong>: Client DOM is fully scrubbed of answer tags.
            </div>
          </div>

          <!-- Dynamic SVG Circle Geometry Sandbox -->
          <div style="background:#ffffff;border:1px solid #e2e8f0;border-radius:8px;padding:1rem;box-shadow:0 1px 3px rgba(0,0,0,0.05);display:flex;align-items:center;gap:1.5rem;flex-wrap:wrap;">
            <div style="background:#f8fafc;border:1px solid #cbd5e1;border-radius:6px;padding:4px;">
              <svg width="150" height="150" viewBox="0 0 240 240">
                <line x1="0" y1="120" x2="240" y2="120" stroke="#cbd5e1" stroke-width="1"/>
                <line x1="120" y1="0" x2="120" y2="240" stroke="#cbd5e1" stroke-width="1"/>
                <circle cx="${cx}" cy="${cy}" r="${r}" fill="rgba(2, 132, 199, 0.1)" stroke="#0284c7" stroke-width="2"/>
                <circle cx="${cx}" cy="${cy}" r="4" fill="#0f172a"/>
              </svg>
            </div>
            <div style="display:flex;flex-direction:column;gap:6px;flex:1;">
              <div style="font-size:0.875rem;font-weight:700;color:#0f172a;">Circle Parameters: (x − ${state.centerX})² + (y − ${state.centerY})² = ${state.radius * state.radius}</div>
              <div style="display:flex;align-items:center;gap:8px;">
                <label style="font-size:0.875rem;width:50px;">Radius:</label>
                <input type="range" id="input-radius" min="1" max="10" value="${state.radius}" style="min-height:${HIT_TARGET_MIN_PX}px;flex:1;">
                <span style="font-size:0.875rem;font-weight:700;width:30px;">${state.radius}</span>
              </div>
              <div style="display:flex;align-items:center;gap:8px;">
                <label style="font-size:0.875rem;width:50px;">Centre X:</label>
                <input type="range" id="input-center-x" min="-6" max="6" value="${state.centerX}" style="min-height:${HIT_TARGET_MIN_PX}px;flex:1;">
                <span style="font-size:0.875rem;font-weight:700;width:30px;">${state.centerX}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Filter and Search Toolbar -->
        <div style="background:#ffffff;border:1px solid #e2e8f0;border-radius:8px;padding:1rem;margin-bottom:1.5rem;display:flex;flex-wrap:wrap;gap:1rem;justify-content:space-between;align-items:center;">
          <div style="display:flex;flex-wrap:wrap;gap:8px;align-items:center;">
            <span style="font-size:0.9rem;font-weight:700;color:#475569;margin-right:4px;">Cognitive Demand:</span>
            <button type="button" class="band-filter-btn" data-filter="all" style="min-height:${HIT_TARGET_MIN_PX}px;padding:8px 14px;background:${state.selectedFilter === 'all' ? '#0284c7' : '#f1f5f9'};color:${state.selectedFilter === 'all' ? '#ffffff' : '#334155'};border:none;border-radius:6px;font-weight:700;cursor:pointer;">All 50</button>
            <button type="button" class="band-filter-btn" data-filter="D1" style="min-height:${HIT_TARGET_MIN_PX}px;padding:8px 14px;background:${state.selectedFilter === 'D1' ? '#0284c7' : '#f1f5f9'};color:${state.selectedFilter === 'D1' ? '#ffffff' : '#334155'};border:none;border-radius:6px;font-weight:700;cursor:pointer;">D1 Foundational</button>
            <button type="button" class="band-filter-btn" data-filter="D2" style="min-height:${HIT_TARGET_MIN_PX}px;padding:8px 14px;background:${state.selectedFilter === 'D2' ? '#0284c7' : '#f1f5f9'};color:${state.selectedFilter === 'D2' ? '#ffffff' : '#334155'};border:none;border-radius:6px;font-weight:700;cursor:pointer;">D2 Application</button>
            <button type="button" class="band-filter-btn" data-filter="D3" style="min-height:${HIT_TARGET_MIN_PX}px;padding:8px 14px;background:${state.selectedFilter === 'D3' ? '#0284c7' : '#f1f5f9'};color:${state.selectedFilter === 'D3' ? '#ffffff' : '#334155'};border:none;border-radius:6px;font-weight:700;cursor:pointer;">D3 Analysis</button>
            <button type="button" class="band-filter-btn" data-filter="D4" style="min-height:${HIT_TARGET_MIN_PX}px;padding:8px 14px;background:${state.selectedFilter === 'D4' ? '#0284c7' : '#f1f5f9'};color:${state.selectedFilter === 'D4' ? '#ffffff' : '#334155'};border:none;border-radius:6px;font-weight:700;cursor:pointer;">D4 Olympiad</button>
          </div>

          <div style="display:flex;align-items:center;gap:8px;">
            <input type="text" id="search-input" value="${escapeHtml(state.searchQuery)}" placeholder="Search circles theorems..." style="min-height:${HIT_TARGET_MIN_PX}px;padding:8px 14px;border:1px solid #cbd5e1;border-radius:6px;font-size:0.95rem;width:240px;box-sizing:border-box;">
          </div>
        </div>

        <!-- 50 Question Cards Grid -->
        <div class="questions-grid" style="display:flex;flex-direction:column;gap:1.25rem;">
          ${questions.map((q) => {
            const selectedOpt = ctrl.getSelectedOption(q.id);
            const isAttempted = Boolean(selectedOpt);
            const isCorrect = isAttempted ? ctrl.isCorrect(q.id, selectedOpt!) : false;

            return `
              <div class="qb-question" data-qid="${q.id}" style="background:#ffffff;border:1px solid #e2e8f0;border-radius:8px;padding:1.5rem;box-shadow:0 1px 3px rgba(0,0,0,0.05);">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.75rem;flex-wrap:wrap;gap:8px;">
                  <div style="display:flex;gap:8px;align-items:center;">
                    <span style="font-size:0.875rem;font-weight:800;background:${q.band === 'D1' ? '#dcfce7;color:#166534;' : q.band === 'D2' ? '#e0f2fe;color:#0369a1;' : q.band === 'D3' ? '#fef3c7;color:#92400e;' : '#fee2e2;color:#991b1b;'}padding:3px 8px;border-radius:4px;">${q.band}</span>
                    <span style="font-size:1.05rem;font-weight:800;color:#0f172a;">${renderMathHtml(escapeHtml(q.title))}</span>
                  </div>
                  <span style="font-size:0.875rem;font-family:var(--g9-font-mono, monospace);color:#94a3b8;">${q.id}</span>
                </div>

                <div class="qb-stem-text" style="font-size:1rem;line-height:1.6;color:#1e293b;margin-bottom:1rem;">
                  ${renderMathHtml(escapeHtml(q.promptHtml))}
                </div>

                <!-- Options -->
                <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(220px, 1fr));gap:8px;margin-bottom:1rem;">
                  ${q.options.map((opt) => {
                    const isSelected = selectedOpt === opt.id;
                    let bg = '#f8fafc';
                    let border = '#cbd5e1';
                    let col = '#0f172a';

                    if (isAttempted) {
                      if (isSelected) {
                        bg = isCorrect ? '#dcfce7' : '#fee2e2';
                        border = isCorrect ? '#16a34a' : '#dc2626';
                        col = isCorrect ? '#15803d' : '#991b1b';
                      }
                    }

                    return `
                      <button type="button" class="circ-opt-btn" data-qid="${q.id}" data-optid="${opt.id}" style="min-height:${HIT_TARGET_MIN_PX}px;padding:8px 14px;background:${bg};border:1px solid ${border};color:${col};border-radius:6px;text-align:left;font-size:0.95rem;cursor:pointer;font-weight:600;">
                        ${renderMathHtml(escapeHtml(opt.text))}
                      </button>
                    `;
                  }).join('')}
                </div>

                <!-- Post-Commitment Explanation Disclosure -->
                ${isAttempted ? `
                  <div class="explanation-box" style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:6px;padding:1rem;">
                    <div style="font-weight:800;color:#1e40af;margin-bottom:4px;">
                      ${isCorrect ? '✓ Verification Successful' : '✗ Choice Evaluated · Theoretical Proof Below:'}
                    </div>
                    <div style="font-size:0.95rem;color:#1e3a8a;line-height:1.5;">
                      ${renderMathHtml(escapeHtml(q.explanationHtml))}
                    </div>
                  </div>
                ` : ''}
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;

    bindEvents();
  };

  const bindEvents = () => {
    root.querySelector<HTMLButtonElement>('#btn-return-math')?.addEventListener('click', () => {
      if (onNavigate) onNavigate('subject/mathematics');
      else window.location.hash = '#/subject/mathematics';
    });
    root.querySelector<HTMLButtonElement>('#btn-return-labs')?.addEventListener('click', () => {
      if (onNavigate) onNavigate('labs');
      else window.location.hash = '#/labs';
    });

    // Band filter buttons
    root.querySelectorAll<HTMLButtonElement>('.band-filter-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const filter = btn.dataset.filter || 'all';
        ctrl.setFilter(filter);
        render();
      });
    });

    // Search input
    root.querySelector<HTMLInputElement>('#search-input')?.addEventListener('input', (e) => {
      const query = (e.target as HTMLInputElement).value;
      ctrl.setSearchQuery(query);
      render();
    });

    // Circle sandbox sliders
    root.querySelector<HTMLInputElement>('#input-radius')?.addEventListener('input', (e) => {
      const r = parseFloat((e.target as HTMLInputElement).value);
      ctrl.setCircleGeometry(r, ctrl.getState().centerX, ctrl.getState().centerY);
      render();
    });

    root.querySelector<HTMLInputElement>('#input-center-x')?.addEventListener('input', (e) => {
      const cx = parseFloat((e.target as HTMLInputElement).value);
      ctrl.setCircleGeometry(ctrl.getState().radius, cx, ctrl.getState().centerY);
      render();
    });

    // Option buttons
    root.querySelectorAll<HTMLButtonElement>('.circ-opt-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const qid = btn.dataset.qid;
        const optid = btn.dataset.optid;
        if (qid && optid) {
          ctrl.recordAttempt(qid, optid);
          render();
        }
      });
    });
  };

  render();

  return {
    dispose: () => {
      active = false;
      root.replaceChildren();
    },
  };
}
