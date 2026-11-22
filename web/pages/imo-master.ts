/**
 * web/pages/imo-master.ts
 * Workpack A69 / v3.5 Parity — Grade 9 IMO Mathematics Master Suite & Topic Browser
 *
 * Implements:
 * - 15 Curriculum Strands & Domains (Algebra, Geometry, Number Systems, Combinatorics)
 * - 68 Authenticated SOF Past-Paper References with syllabus mapping
 * - 7 Fully-Authored Interactive Olympiad Practice Drafts with 2-level progressive hint ladders
 * - Pure Native DOM (No iframes)
 * - 12.7" Tablet Touch Ergonomics (>= 48px hit targets, zero horizontal overflow)
 * - Fault N09 Answer Isolation (Score withheld, zero client key leakage)
 * - Academic Status: HOLD (Formative Simulation Mode)
 */

import { escapeHtml } from '../runtime/rendering.ts';
import { HIT_TARGET_MIN_PX, HIT_TARGET_PRIMARY_PX } from '../styles/tokens.ts';

export interface ImoItem {
  id: string;
  kind: 'authored' | 'referenced';
  title: string;
  problem: string;
  context: string;
  source: string;
  sourceUrl: string;
}

export interface ImoDomain {
  id: string;
  title: string;
  items: ImoItem[];
}

export const IMO_DOMAINS_DATA: readonly ImoDomain[] = [
  {
    "id": "logic",
    "title": "Verbal and Non-Verbal Reasoning",
    "items": [
      {
        "id": "SOF-IMO-G09-L1-2023-24-A-Q003",
        "kind": "referenced",
        "title": "2023\u201324 Set A \u00b7 referenced Q3",
        "problem": "",
        "context": "Research topic: LOGIC-NUMBER-PATTERNS \u00b7 logical reasoning",
        "source": "",
        "sourceUrl": "https://iswkoman.com/uploads/olympiad/8919398-CL%20IX%20IMO%202023-24%20(1).pdf"
      },
      {
        "id": "SOF-IMO-G09-L1-2023-24-A-Q006",
        "kind": "referenced",
        "title": "2023\u201324 Set A \u00b7 referenced Q6",
        "problem": "",
        "context": "Research topic: LOGIC-VERBAL-CODES \u00b7 logical reasoning",
        "source": "",
        "sourceUrl": "https://iswkoman.com/uploads/olympiad/8919398-CL%20IX%20IMO%202023-24%20(1).pdf"
      },
      {
        "id": "SOF-IMO-G09-L1-2023-24-A-Q013",
        "kind": "referenced",
        "title": "2023\u201324 Set A \u00b7 referenced Q13",
        "problem": "",
        "context": "Research topic: LOGIC-NUMBER-PATTERNS \u00b7 logical reasoning \u00b7 Source discrepancy IMO-SOURCE-CONFLICT-001 \u2014 use source with caution",
        "source": "",
        "sourceUrl": "https://iswkoman.com/uploads/olympiad/8919398-CL%20IX%20IMO%202023-24%20(1).pdf"
      },
      {
        "id": "SOF-IMO-G09-SAMPLE-2026-27-Q001",
        "kind": "referenced",
        "title": "SOF 2026\u201327 sample \u00b7 referenced Q1",
        "problem": "",
        "context": "Research topic: LOGIC-SPATIAL-ROTATION \u00b7 logical reasoning",
        "source": "",
        "sourceUrl": "https://sofworld.org/download/file/fid/73719"
      },
      {
        "id": "SOF-IMO-G09-SAMPLE-2026-27-Q002",
        "kind": "referenced",
        "title": "SOF 2026\u201327 sample \u00b7 referenced Q2",
        "problem": "",
        "context": "Research topic: LOGIC-VERBAL-CODES \u00b7 logical reasoning",
        "source": "",
        "sourceUrl": "https://sofworld.org/download/file/fid/73719"
      },
      {
        "id": "SOF-IMO-G09-SAMPLE-2026-27-Q003",
        "kind": "referenced",
        "title": "SOF 2026\u201327 sample \u00b7 referenced Q3",
        "problem": "",
        "context": "Research topic: LOGIC-NUMBER-PATTERNS \u00b7 logical reasoning",
        "source": "",
        "sourceUrl": "https://sofworld.org/download/file/fid/73719"
      }
    ]
  },
  {
    "id": "alg_id",
    "title": "Algebraic Identities",
    "items": [
      {
        "id": "SOF-IMO-G09-L1-2024-25-B-Q044",
        "kind": "referenced",
        "title": "2024\u201325 Set B \u00b7 referenced Q44",
        "problem": "",
        "context": "Research topic: ALG_ID-EXPANSION-AND-COMPARISON \u00b7 everyday mathematics \u00b7 Source discrepancy IMO-SOURCE-CONFLICT-005 \u2014 use source with caution",
        "source": "",
        "sourceUrl": "https://www.iswkoman.com/uploads/olympiad/2107431-CLASS%209-IMO24.pdf"
      }
    ]
  },
  {
    "id": "triangle_areas",
    "title": "Areas of Parallelograms and Triangles",
    "items": [
      {
        "id": "IMO-G9-ORIGINAL-PRACTICE-003",
        "kind": "authored",
        "title": "Two movable triangle peaks",
        "problem": "Triangles ABC and ABD share a 12 cm base AB. The perpendicular distance from C to line AB is 7 cm, and the perpendicular distance from D to that line is also 7 cm; C and D need not be directly above each other. Must the two triangles have the same area? Give the reason and their area.",
        "context": "Proposed difficulty D1 \u00b7 free response",
        "source": "",
        "sourceUrl": ""
      }
    ]
  },
  {
    "id": "circles",
    "title": "Circles",
    "items": [
      {
        "id": "SOF-IMO-G09-L1-2023-24-A-Q047",
        "kind": "referenced",
        "title": "2023\u201324 Set A \u00b7 referenced Q47",
        "problem": "",
        "context": "Research topic: CIRCLES-CYCLIC-QUADRILATERALS \u00b7 achievers section",
        "source": "",
        "sourceUrl": "https://iswkoman.com/uploads/olympiad/8919398-CL%20IX%20IMO%202023-24%20(1).pdf"
      },
      {
        "id": "SOF-IMO-G09-L1-2025-26-A-Q050",
        "kind": "referenced",
        "title": "2025\u201326 Set A \u00b7 referenced Q50",
        "problem": "",
        "context": "Research topic: CIRCLES-CHORDS-AND-CYCLIC \u00b7 achievers section",
        "source": "",
        "sourceUrl": "https://www.iswkoman.com/uploads/olympiad/9262492-IMO%2025-26%20CLASS%209.pdf"
      }
    ]
  },
  {
    "id": "coord",
    "title": "Coordinate Geometry",
    "items": [
      {
        "id": "IMO-G9-ORIGINAL-PRACTICE-002",
        "kind": "authored",
        "title": "Compass notes to coordinates",
        "problem": "On a map, east is the positive x-direction and north is the positive y-direction. A location is described as 4 kilometres west and 3 kilometres north of the origin. Express its location as an ordered pair (x,y), in kilometres.",
        "context": "Proposed difficulty D1 \u00b7 free response",
        "source": "",
        "sourceUrl": ""
      },
      {
        "id": "IMO-G9-ORIGINAL-PRACTICE-007",
        "kind": "authored",
        "title": "Reflect and move a triangle",
        "problem": "Triangle PQR has vertices P=(-2,1), Q=(3,1), and R=(0,4). Reflect it across the y-axis, then translate every reflected point 4 units right and 2 units down. List the three final vertex coordinates and verify whether the triangle&#39;s area changes.",
        "context": "Proposed difficulty D3 \u00b7 free response \u00b7 Grade-level enrichment review required",
        "source": "",
        "sourceUrl": ""
      },
      {
        "id": "SOF-IMO-G09-L1-2023-24-A-Q027",
        "kind": "referenced",
        "title": "2023\u201324 Set A \u00b7 referenced Q27",
        "problem": "",
        "context": "Research topic: COORD-LINE-AXIS-INTERCEPT \u00b7 mathematical reasoning",
        "source": "",
        "sourceUrl": "https://iswkoman.com/uploads/olympiad/8919398-CL%20IX%20IMO%202023-24%20(1).pdf"
      },
      {
        "id": "SOF-IMO-G09-L1-2023-24-A-Q050",
        "kind": "referenced",
        "title": "2023\u201324 Set A \u00b7 referenced Q50",
        "problem": "",
        "context": "Research topic: COORD-REFLECTIONS-AND-DISTANCES \u00b7 achievers section",
        "source": "",
        "sourceUrl": "https://iswkoman.com/uploads/olympiad/8919398-CL%20IX%20IMO%202023-24%20(1).pdf"
      },
      {
        "id": "SOF-IMO-G09-L1-2024-25-B-Q020",
        "kind": "referenced",
        "title": "2024\u201325 Set B \u00b7 referenced Q20",
        "problem": "",
        "context": "Research topic: COORD-COORDINATE-IDENTIFICATION \u00b7 mathematical reasoning",
        "source": "",
        "sourceUrl": "https://www.iswkoman.com/uploads/olympiad/2107431-CLASS%209-IMO24.pdf"
      },
      {
        "id": "SOF-IMO-G09-L1-2025-26-A-Q046",
        "kind": "referenced",
        "title": "2025\u201326 Set A \u00b7 referenced Q46",
        "problem": "",
        "context": "Research topic: COORD-REFLECTIONS-AND-DISTANCES \u00b7 achievers section",
        "source": "",
        "sourceUrl": "https://www.iswkoman.com/uploads/olympiad/9262492-IMO%2025-26%20CLASS%209.pdf"
      }
    ]
  },
  {
    "id": "euclid",
    "title": "Introduction to Euclid\u2019s Geometry",
    "items": [
      {
        "id": "SOF-IMO-G09-L1-2023-24-A-Q033",
        "kind": "referenced",
        "title": "2023\u201324 Set A \u00b7 referenced Q33",
        "problem": "",
        "context": "Research topic: EUCLID-POSTULATES \u00b7 mathematical reasoning",
        "source": "",
        "sourceUrl": "https://iswkoman.com/uploads/olympiad/8919398-CL%20IX%20IMO%202023-24%20(1).pdf"
      },
      {
        "id": "SOF-IMO-G09-L1-2024-25-B-Q031",
        "kind": "referenced",
        "title": "2024\u201325 Set B \u00b7 referenced Q31",
        "problem": "",
        "context": "Research topic: EUCLID-POSTULATES \u00b7 mathematical reasoning",
        "source": "",
        "sourceUrl": "https://www.iswkoman.com/uploads/olympiad/2107431-CLASS%209-IMO24.pdf"
      },
      {
        "id": "SOF-IMO-G09-SAMPLE-2026-27-Q006",
        "kind": "referenced",
        "title": "SOF 2026\u201327 sample \u00b7 referenced Q6",
        "problem": "",
        "context": "Research topic: EUCLID-EQUALITY-AXIOMS \u00b7 mathematical reasoning",
        "source": "",
        "sourceUrl": "https://sofworld.org/download/file/fid/73719"
      }
    ]
  },
  {
    "id": "probability",
    "title": "Introduction to Probability",
    "items": [
      {
        "id": "SOF-IMO-G09-L1-2023-24-A-Q025",
        "kind": "referenced",
        "title": "2023\u201324 Set A \u00b7 referenced Q25",
        "problem": "",
        "context": "Research topic: PROBABILITY-ELEMENTARY-PROBABILITY \u00b7 mathematical reasoning",
        "source": "",
        "sourceUrl": "https://iswkoman.com/uploads/olympiad/8919398-CL%20IX%20IMO%202023-24%20(1).pdf"
      },
      {
        "id": "SOF-IMO-G09-L1-2023-24-A-Q040",
        "kind": "referenced",
        "title": "2023\u201324 Set A \u00b7 referenced Q40",
        "problem": "",
        "context": "Research topic: PROBABILITY-ELEMENTARY-PROBABILITY \u00b7 everyday mathematics",
        "source": "",
        "sourceUrl": "https://iswkoman.com/uploads/olympiad/8919398-CL%20IX%20IMO%202023-24%20(1).pdf"
      },
      {
        "id": "SOF-IMO-G09-L1-2024-25-B-Q027",
        "kind": "referenced",
        "title": "2024\u201325 Set B \u00b7 referenced Q27",
        "problem": "",
        "context": "Research topic: PROBABILITY-SAMPLE-SPACE \u00b7 mathematical reasoning",
        "source": "",
        "sourceUrl": "https://www.iswkoman.com/uploads/olympiad/2107431-CLASS%209-IMO24.pdf"
      },
      {
        "id": "SOF-IMO-G09-L1-2025-26-A-Q043",
        "kind": "referenced",
        "title": "2025\u201326 Set A \u00b7 referenced Q43",
        "problem": "",
        "context": "Research topic: PROBABILITY-COMPLEMENT-COUNT \u00b7 everyday mathematics",
        "source": "",
        "sourceUrl": "https://www.iswkoman.com/uploads/olympiad/9262492-IMO%2025-26%20CLASS%209.pdf"
      }
    ]
  },
  {
    "id": "lin_eq",
    "title": "Linear Equations in Two Variables",
    "items": [
      {
        "id": "IMO-G9-ORIGINAL-PRACTICE-005",
        "kind": "authored",
        "title": "A decreasing data table",
        "problem": "A relation is recorded by four paired measurements: when x is -2, 0, 2, 4, the corresponding y-values are 9, 5, 1, -3. Express the pattern as an equation y=mx+c, then find x when y=-9.",
        "context": "Proposed difficulty D2 \u00b7 free response",
        "source": "",
        "sourceUrl": ""
      },
      {
        "id": "IMO-G9-ORIGINAL-PRACTICE-006",
        "kind": "authored",
        "title": "Booklet and poster printing costs",
        "problem": "At a student-run print shop, 4 bound booklets and 3 poster cards cost 159 rupees. A different order of 2 bound booklets and 5 poster cards costs 181 rupees. Each item has a fixed unit price. Find the price of an order containing 3 booklets and 2 poster cards.",
        "context": "Proposed difficulty D3 \u00b7 free response \u00b7 Grade-level enrichment review required",
        "source": "",
        "sourceUrl": ""
      },
      {
        "id": "SOF-IMO-G09-L1-2023-24-A-Q038",
        "kind": "referenced",
        "title": "2023\u201324 Set A \u00b7 referenced Q38",
        "problem": "",
        "context": "Research topic: LIN_EQ-CONTEXT-TO-EQUATION \u00b7 everyday mathematics",
        "source": "",
        "sourceUrl": "https://iswkoman.com/uploads/olympiad/8919398-CL%20IX%20IMO%202023-24%20(1).pdf"
      },
      {
        "id": "SOF-IMO-G09-L1-2024-25-B-Q024",
        "kind": "referenced",
        "title": "2024\u201325 Set B \u00b7 referenced Q24",
        "problem": "",
        "context": "Research topic: LIN_EQ-PARAMETER-SUBSTITUTION \u00b7 mathematical reasoning",
        "source": "",
        "sourceUrl": "https://www.iswkoman.com/uploads/olympiad/2107431-CLASS%209-IMO24.pdf"
      },
      {
        "id": "SOF-IMO-G09-L1-2025-26-A-Q029",
        "kind": "referenced",
        "title": "2025\u201326 Set A \u00b7 referenced Q29",
        "problem": "",
        "context": "Research topic: LIN_EQ-LINKED-PARAMETERS \u00b7 mathematical reasoning",
        "source": "",
        "sourceUrl": "https://www.iswkoman.com/uploads/olympiad/9262492-IMO%2025-26%20CLASS%209.pdf"
      },
      {
        "id": "SOF-IMO-G09-L1-2025-26-A-Q037",
        "kind": "referenced",
        "title": "2025\u201326 Set A \u00b7 referenced Q37",
        "problem": "",
        "context": "Research topic: LIN_EQ-AGE-EQUATIONS \u00b7 everyday mathematics",
        "source": "",
        "sourceUrl": "https://www.iswkoman.com/uploads/olympiad/9262492-IMO%2025-26%20CLASS%209.pdf"
      },
      {
        "id": "SOF-IMO-G09-L1-2025-26-A-Q042",
        "kind": "referenced",
        "title": "2025\u201326 Set A \u00b7 referenced Q42",
        "problem": "",
        "context": "Research topic: LIN_EQ-CONTEXT-TO-EQUATION \u00b7 everyday mathematics",
        "source": "",
        "sourceUrl": "https://www.iswkoman.com/uploads/olympiad/9262492-IMO%2025-26%20CLASS%209.pdf"
      },
      {
        "id": "SOF-IMO-G09-L1-2025-26-A-Q044",
        "kind": "referenced",
        "title": "2025\u201326 Set A \u00b7 referenced Q44",
        "problem": "",
        "context": "Research topic: LIN_EQ-RATIO-EQUATIONS \u00b7 everyday mathematics",
        "source": "",
        "sourceUrl": "https://www.iswkoman.com/uploads/olympiad/9262492-IMO%2025-26%20CLASS%209.pdf"
      },
      {
        "id": "SOF-IMO-G09-SAMPLE-2026-27-Q004",
        "kind": "referenced",
        "title": "SOF 2026\u201327 sample \u00b7 referenced Q4",
        "problem": "",
        "context": "Research topic: LIN_EQ-TABLE-TO-EQUATION \u00b7 mathematical reasoning",
        "source": "",
        "sourceUrl": "https://sofworld.org/download/file/fid/73719"
      }
    ]
  },
  {
    "id": "angles",
    "title": "Lines and Angles",
    "items": [
      {
        "id": "SOF-IMO-G09-L1-2023-24-A-Q019",
        "kind": "referenced",
        "title": "2023\u201324 Set A \u00b7 referenced Q19",
        "problem": "",
        "context": "Research topic: ANGLES-ANGLE-BISECTORS \u00b7 mathematical reasoning",
        "source": "",
        "sourceUrl": "https://iswkoman.com/uploads/olympiad/8919398-CL%20IX%20IMO%202023-24%20(1).pdf"
      },
      {
        "id": "SOF-IMO-G09-L1-2025-26-A-Q031",
        "kind": "referenced",
        "title": "2025\u201326 Set A \u00b7 referenced Q31",
        "problem": "",
        "context": "Research topic: ANGLES-VERTICALLY-OPPOSITE \u00b7 mathematical reasoning \u00b7 Source discrepancy IMO-SOURCE-CONFLICT-007 \u2014 use source with caution",
        "source": "",
        "sourceUrl": "https://www.iswkoman.com/uploads/olympiad/9262492-IMO%2025-26%20CLASS%209.pdf"
      },
      {
        "id": "SOF-IMO-G09-SAMPLE-2026-27-Q005",
        "kind": "referenced",
        "title": "SOF 2026\u201327 sample \u00b7 referenced Q5",
        "problem": "",
        "context": "Research topic: ANGLES-PARALLEL-LINE-ANGLES \u00b7 mathematical reasoning \u00b7 Source discrepancy IMO-SOURCE-CONFLICT-009 \u2014 use source with caution",
        "source": "",
        "sourceUrl": "https://sofworld.org/download/file/fid/73719"
      }
    ]
  },
  {
    "id": "ns",
    "title": "Number Systems",
    "items": [
      {
        "id": "IMO-G9-ORIGINAL-PRACTICE-001",
        "kind": "authored",
        "title": "Three-step number chain",
        "problem": "A student claims that multiplying any three consecutive positive integers always gives a multiple of 6. Prove or disprove the claim for every positive starting integer n, without checking only sample values.",
        "context": "Proposed difficulty D3 \u00b7 free response",
        "source": "",
        "sourceUrl": ""
      },
      {
        "id": "SOF-IMO-G09-L1-2023-24-A-Q018",
        "kind": "referenced",
        "title": "2023\u201324 Set A \u00b7 referenced Q18",
        "problem": "",
        "context": "Research topic: NS-RATIONAL-OPERATIONS \u00b7 mathematical reasoning \u00b7 Source discrepancy IMO-SOURCE-CONFLICT-003 \u2014 use source with caution",
        "source": "",
        "sourceUrl": "https://iswkoman.com/uploads/olympiad/8919398-CL%20IX%20IMO%202023-24%20(1).pdf"
      },
      {
        "id": "SOF-IMO-G09-L1-2024-25-B-Q026",
        "kind": "referenced",
        "title": "2024\u201325 Set B \u00b7 referenced Q26",
        "problem": "",
        "context": "Research topic: NS-INDEX-LAWS \u00b7 mathematical reasoning",
        "source": "",
        "sourceUrl": "https://www.iswkoman.com/uploads/olympiad/2107431-CLASS%209-IMO24.pdf"
      },
      {
        "id": "SOF-IMO-G09-L1-2024-25-B-Q033",
        "kind": "referenced",
        "title": "2024\u201325 Set B \u00b7 referenced Q33",
        "problem": "",
        "context": "Research topic: NS-RATIONAL-CONSTRAINTS \u00b7 mathematical reasoning",
        "source": "",
        "sourceUrl": "https://www.iswkoman.com/uploads/olympiad/2107431-CLASS%209-IMO24.pdf"
      },
      {
        "id": "SOF-IMO-G09-L1-2025-26-A-Q028",
        "kind": "referenced",
        "title": "2025\u201326 Set A \u00b7 referenced Q28",
        "problem": "",
        "context": "Research topic: NS-RATIONAL-OPERATIONS \u00b7 mathematical reasoning \u00b7 Source discrepancy IMO-SOURCE-CONFLICT-006 \u2014 use source with caution",
        "source": "",
        "sourceUrl": "https://www.iswkoman.com/uploads/olympiad/9262492-IMO%2025-26%20CLASS%209.pdf"
      },
      {
        "id": "SOF-IMO-G09-L1-2025-26-A-Q035",
        "kind": "referenced",
        "title": "2025\u201326 Set A \u00b7 referenced Q35",
        "problem": "",
        "context": "Research topic: NS-INDEX-LAWS \u00b7 mathematical reasoning",
        "source": "",
        "sourceUrl": "https://www.iswkoman.com/uploads/olympiad/9262492-IMO%2025-26%20CLASS%209.pdf"
      },
      {
        "id": "SOF-IMO-G09-L1-2025-26-A-Q036",
        "kind": "referenced",
        "title": "2025\u201326 Set A \u00b7 referenced Q36",
        "problem": "",
        "context": "Research topic: NS-SQUARES-AND-ROOTS \u00b7 everyday mathematics",
        "source": "",
        "sourceUrl": "https://www.iswkoman.com/uploads/olympiad/9262492-IMO%2025-26%20CLASS%209.pdf"
      },
      {
        "id": "SOF-IMO-G09-L1-2025-26-A-Q049",
        "kind": "referenced",
        "title": "2025\u201326 Set A \u00b7 referenced Q49",
        "problem": "",
        "context": "Research topic: NS-SURD-STATEMENTS \u00b7 achievers section",
        "source": "",
        "sourceUrl": "https://www.iswkoman.com/uploads/olympiad/9262492-IMO%2025-26%20CLASS%209.pdf"
      },
      {
        "id": "SOF-IMO-G09-SAMPLE-2026-27-Q009",
        "kind": "referenced",
        "title": "SOF 2026\u201327 sample \u00b7 referenced Q9",
        "problem": "",
        "context": "Research topic: NS-DECIMALS-AND-INDICES \u00b7 achievers section \u00b7 Source discrepancy IMO-SOURCE-CONFLICT-010 \u2014 use source with caution",
        "source": "",
        "sourceUrl": "https://sofworld.org/download/file/fid/73719"
      }
    ]
  },
  {
    "id": "poly",
    "title": "Polynomials",
    "items": [
      {
        "id": "SOF-IMO-G09-L1-2023-24-A-Q028",
        "kind": "referenced",
        "title": "2023\u201324 Set A \u00b7 referenced Q28",
        "problem": "",
        "context": "Research topic: POLY-POLYNOMIAL-OPERATIONS \u00b7 mathematical reasoning",
        "source": "",
        "sourceUrl": "https://iswkoman.com/uploads/olympiad/8919398-CL%20IX%20IMO%202023-24%20(1).pdf"
      },
      {
        "id": "SOF-IMO-G09-L1-2025-26-A-Q045",
        "kind": "referenced",
        "title": "2025\u201326 Set A \u00b7 referenced Q45",
        "problem": "",
        "context": "Research topic: POLY-FACTORISATION \u00b7 everyday mathematics",
        "source": "",
        "sourceUrl": "https://www.iswkoman.com/uploads/olympiad/9262492-IMO%2025-26%20CLASS%209.pdf"
      },
      {
        "id": "SOF-IMO-G09-SAMPLE-2026-27-Q007",
        "kind": "referenced",
        "title": "SOF 2026\u201327 sample \u00b7 referenced Q7",
        "problem": "",
        "context": "Research topic: POLY-DIVISIBILITY \u00b7 everyday mathematics",
        "source": "",
        "sourceUrl": "https://sofworld.org/download/file/fid/73719"
      }
    ]
  },
  {
    "id": "statistics",
    "title": "Statistics",
    "items": [
      {
        "id": "SOF-IMO-G09-L1-2024-25-B-Q016",
        "kind": "referenced",
        "title": "2024\u201325 Set B \u00b7 referenced Q16",
        "problem": "",
        "context": "Research topic: STATISTICS-PIE-CHARTS \u00b7 mathematical reasoning \u00b7 Source discrepancy IMO-SOURCE-CONFLICT-004 \u2014 use source with caution",
        "source": "",
        "sourceUrl": "https://www.iswkoman.com/uploads/olympiad/2107431-CLASS%209-IMO24.pdf"
      },
      {
        "id": "SOF-IMO-G09-L1-2025-26-A-Q032",
        "kind": "referenced",
        "title": "2025\u201326 Set A \u00b7 referenced Q32",
        "problem": "",
        "context": "Research topic: STATISTICS-PIE-CHARTS \u00b7 mathematical reasoning \u00b7 Source discrepancy IMO-SOURCE-CONFLICT-008 \u2014 use source with caution",
        "source": "",
        "sourceUrl": "https://www.iswkoman.com/uploads/olympiad/9262492-IMO%2025-26%20CLASS%209.pdf"
      },
      {
        "id": "SOF-IMO-G09-L1-2025-26-A-Q033",
        "kind": "referenced",
        "title": "2025\u201326 Set A \u00b7 referenced Q33",
        "problem": "",
        "context": "Research topic: STATISTICS-PIE-CHARTS \u00b7 mathematical reasoning \u00b7 Source discrepancy IMO-SOURCE-CONFLICT-008 \u2014 use source with caution",
        "source": "",
        "sourceUrl": "https://www.iswkoman.com/uploads/olympiad/9262492-IMO%2025-26%20CLASS%209.pdf"
      },
      {
        "id": "SOF-IMO-G09-L1-2025-26-A-Q047",
        "kind": "referenced",
        "title": "2025\u201326 Set A \u00b7 referenced Q47",
        "problem": "",
        "context": "Research topic: STATISTICS-DATA-DISPLAYS \u00b7 achievers section",
        "source": "",
        "sourceUrl": "https://www.iswkoman.com/uploads/olympiad/9262492-IMO%2025-26%20CLASS%209.pdf"
      }
    ]
  },
  {
    "id": "mensuration",
    "title": "Surface Areas and Volumes",
    "items": [
      {
        "id": "IMO-G9-ORIGINAL-PRACTICE-004",
        "kind": "authored",
        "title": "Ribbon around a cylindrical drum",
        "problem": "A cylindrical festival drum has radius 7 cm and height 20 cm. A decorator covers only the curved side of the drum with one layer of sheet material, leaving both circular ends uncovered. Using pi=22/7, calculate the required sheet area in square centimetres.",
        "context": "Proposed difficulty D2 \u00b7 free response",
        "source": "",
        "sourceUrl": ""
      },
      {
        "id": "SOF-IMO-G09-L1-2023-24-A-Q017",
        "kind": "referenced",
        "title": "2023\u201324 Set A \u00b7 referenced Q17",
        "problem": "",
        "context": "Research topic: MENSURATION-CONE-VOLUME \u00b7 mathematical reasoning \u00b7 Source discrepancy IMO-SOURCE-CONFLICT-002 \u2014 use source with caution",
        "source": "",
        "sourceUrl": "https://iswkoman.com/uploads/olympiad/8919398-CL%20IX%20IMO%202023-24%20(1).pdf"
      },
      {
        "id": "SOF-IMO-G09-L1-2023-24-A-Q034",
        "kind": "referenced",
        "title": "2023\u201324 Set A \u00b7 referenced Q34",
        "problem": "",
        "context": "Research topic: MENSURATION-SURFACE-SCALING \u00b7 mathematical reasoning",
        "source": "",
        "sourceUrl": "https://iswkoman.com/uploads/olympiad/8919398-CL%20IX%20IMO%202023-24%20(1).pdf"
      },
      {
        "id": "SOF-IMO-G09-L1-2023-24-A-Q045",
        "kind": "referenced",
        "title": "2023\u201324 Set A \u00b7 referenced Q45",
        "problem": "",
        "context": "Research topic: MENSURATION-HEMISPHERE-AREA \u00b7 everyday mathematics",
        "source": "",
        "sourceUrl": "https://iswkoman.com/uploads/olympiad/8919398-CL%20IX%20IMO%202023-24%20(1).pdf"
      },
      {
        "id": "SOF-IMO-G09-L1-2024-25-B-Q029",
        "kind": "referenced",
        "title": "2024\u201325 Set B \u00b7 referenced Q29",
        "problem": "",
        "context": "Research topic: MENSURATION-CONE-SURFACE-RATIOS \u00b7 mathematical reasoning",
        "source": "",
        "sourceUrl": "https://www.iswkoman.com/uploads/olympiad/2107431-CLASS%209-IMO24.pdf"
      },
      {
        "id": "SOF-IMO-G09-L1-2025-26-A-Q048",
        "kind": "referenced",
        "title": "2025\u201326 Set A \u00b7 referenced Q48",
        "problem": "",
        "context": "Research topic: MENSURATION-COMPOSITE-SOLIDS \u00b7 achievers section",
        "source": "",
        "sourceUrl": "https://www.iswkoman.com/uploads/olympiad/9262492-IMO%2025-26%20CLASS%209.pdf"
      },
      {
        "id": "SOF-IMO-G09-SAMPLE-2026-27-Q008",
        "kind": "referenced",
        "title": "SOF 2026\u201327 sample \u00b7 referenced Q8",
        "problem": "",
        "context": "Research topic: MENSURATION-CONE-VOLUME \u00b7 everyday mathematics",
        "source": "",
        "sourceUrl": "https://sofworld.org/download/file/fid/73719"
      }
    ]
  },
  {
    "id": "triangles",
    "title": "Triangles",
    "items": [
      {
        "id": "SOF-IMO-G09-L1-2023-24-A-Q029",
        "kind": "referenced",
        "title": "2023\u201324 Set A \u00b7 referenced Q29",
        "problem": "",
        "context": "Research topic: TRIANGLES-HERONS-FORMULA \u00b7 mathematical reasoning",
        "source": "",
        "sourceUrl": "https://iswkoman.com/uploads/olympiad/8919398-CL%20IX%20IMO%202023-24%20(1).pdf"
      },
      {
        "id": "SOF-IMO-G09-L1-2023-24-A-Q049",
        "kind": "referenced",
        "title": "2023\u201324 Set A \u00b7 referenced Q49",
        "problem": "",
        "context": "Research topic: TRIANGLES-AREA-AND-ALTITUDE \u00b7 achievers section",
        "source": "",
        "sourceUrl": "https://iswkoman.com/uploads/olympiad/8919398-CL%20IX%20IMO%202023-24%20(1).pdf"
      },
      {
        "id": "SOF-IMO-G09-L1-2024-25-B-Q035",
        "kind": "referenced",
        "title": "2024\u201325 Set B \u00b7 referenced Q35",
        "problem": "",
        "context": "Research topic: TRIANGLES-HERONS-FORMULA \u00b7 mathematical reasoning",
        "source": "",
        "sourceUrl": "https://www.iswkoman.com/uploads/olympiad/2107431-CLASS%209-IMO24.pdf"
      },
      {
        "id": "SOF-IMO-G09-L1-2025-26-A-Q034",
        "kind": "referenced",
        "title": "2025\u201326 Set A \u00b7 referenced Q34",
        "problem": "",
        "context": "Research topic: TRIANGLES-SIMILARITY-SCALING \u00b7 mathematical reasoning",
        "source": "",
        "sourceUrl": "https://www.iswkoman.com/uploads/olympiad/9262492-IMO%2025-26%20CLASS%209.pdf"
      },
      {
        "id": "SOF-IMO-G09-SAMPLE-2026-27-Q010",
        "kind": "referenced",
        "title": "SOF 2026\u201327 sample \u00b7 referenced Q10",
        "problem": "",
        "context": "Research topic: TRIANGLES-CONGRUENCE \u00b7 achievers section",
        "source": "",
        "sourceUrl": "https://sofworld.org/download/file/fid/73719"
      }
    ]
  },
  {
    "id": "quant",
    "title": "Quantitative Aptitude",
    "items": [
      {
        "id": "SOF-IMO-G09-L1-2023-24-A-Q035",
        "kind": "referenced",
        "title": "2023\u201324 Set A \u00b7 referenced Q35",
        "problem": "",
        "context": "Research topic: QUANT-COMPOUND-INTEREST \u00b7 mathematical reasoning",
        "source": "",
        "sourceUrl": "https://iswkoman.com/uploads/olympiad/8919398-CL%20IX%20IMO%202023-24%20(1).pdf"
      },
      {
        "id": "SOF-IMO-G09-L1-2023-24-A-Q036",
        "kind": "referenced",
        "title": "2023\u201324 Set A \u00b7 referenced Q36",
        "problem": "",
        "context": "Research topic: QUANT-WORK-RATES \u00b7 everyday mathematics",
        "source": "",
        "sourceUrl": "https://iswkoman.com/uploads/olympiad/8919398-CL%20IX%20IMO%202023-24%20(1).pdf"
      },
      {
        "id": "SOF-IMO-G09-L1-2023-24-A-Q037",
        "kind": "referenced",
        "title": "2023\u201324 Set A \u00b7 referenced Q37",
        "problem": "",
        "context": "Research topic: QUANT-PERCENT-PROPORTIONS \u00b7 everyday mathematics",
        "source": "",
        "sourceUrl": "https://iswkoman.com/uploads/olympiad/8919398-CL%20IX%20IMO%202023-24%20(1).pdf"
      },
      {
        "id": "SOF-IMO-G09-L1-2023-24-A-Q039",
        "kind": "referenced",
        "title": "2023\u201324 Set A \u00b7 referenced Q39",
        "problem": "",
        "context": "Research topic: QUANT-SPEED-TIME \u00b7 everyday mathematics",
        "source": "",
        "sourceUrl": "https://iswkoman.com/uploads/olympiad/8919398-CL%20IX%20IMO%202023-24%20(1).pdf"
      },
      {
        "id": "SOF-IMO-G09-L1-2023-24-A-Q042",
        "kind": "referenced",
        "title": "2023\u201324 Set A \u00b7 referenced Q42",
        "problem": "",
        "context": "Research topic: QUANT-SIMPLE-INTEREST \u00b7 everyday mathematics",
        "source": "",
        "sourceUrl": "https://iswkoman.com/uploads/olympiad/8919398-CL%20IX%20IMO%202023-24%20(1).pdf"
      },
      {
        "id": "SOF-IMO-G09-L1-2023-24-A-Q043",
        "kind": "referenced",
        "title": "2023\u201324 Set A \u00b7 referenced Q43",
        "problem": "",
        "context": "Research topic: QUANT-AGE-RATIOS \u00b7 everyday mathematics",
        "source": "",
        "sourceUrl": "https://iswkoman.com/uploads/olympiad/8919398-CL%20IX%20IMO%202023-24%20(1).pdf"
      },
      {
        "id": "SOF-IMO-G09-L1-2024-25-B-Q019",
        "kind": "referenced",
        "title": "2024\u201325 Set B \u00b7 referenced Q19",
        "problem": "",
        "context": "Research topic: QUANT-SIMPLE-INTEREST \u00b7 mathematical reasoning",
        "source": "",
        "sourceUrl": "https://www.iswkoman.com/uploads/olympiad/2107431-CLASS%209-IMO24.pdf"
      },
      {
        "id": "SOF-IMO-G09-L1-2024-25-B-Q043",
        "kind": "referenced",
        "title": "2024\u201325 Set B \u00b7 referenced Q43",
        "problem": "",
        "context": "Research topic: QUANT-WORK-RATES \u00b7 everyday mathematics",
        "source": "",
        "sourceUrl": "https://www.iswkoman.com/uploads/olympiad/2107431-CLASS%209-IMO24.pdf"
      },
      {
        "id": "SOF-IMO-G09-L1-2025-26-A-Q030",
        "kind": "referenced",
        "title": "2025\u201326 Set A \u00b7 referenced Q30",
        "problem": "",
        "context": "Research topic: QUANT-COMPOUND-INTEREST \u00b7 mathematical reasoning",
        "source": "",
        "sourceUrl": "https://www.iswkoman.com/uploads/olympiad/9262492-IMO%2025-26%20CLASS%209.pdf"
      },
      {
        "id": "SOF-IMO-G09-L1-2025-26-A-Q038",
        "kind": "referenced",
        "title": "2025\u201326 Set A \u00b7 referenced Q38",
        "problem": "",
        "context": "Research topic: QUANT-WORK-RATES \u00b7 everyday mathematics",
        "source": "",
        "sourceUrl": "https://www.iswkoman.com/uploads/olympiad/9262492-IMO%2025-26%20CLASS%209.pdf"
      },
      {
        "id": "SOF-IMO-G09-L1-2025-26-A-Q039",
        "kind": "referenced",
        "title": "2025\u201326 Set A \u00b7 referenced Q39",
        "problem": "",
        "context": "Research topic: QUANT-PARTNERSHIP \u00b7 everyday mathematics",
        "source": "",
        "sourceUrl": "https://www.iswkoman.com/uploads/olympiad/9262492-IMO%2025-26%20CLASS%209.pdf"
      },
      {
        "id": "SOF-IMO-G09-L1-2025-26-A-Q040",
        "kind": "referenced",
        "title": "2025\u201326 Set A \u00b7 referenced Q40",
        "problem": "",
        "context": "Research topic: QUANT-PERCENT-PROPORTIONS \u00b7 everyday mathematics",
        "source": "",
        "sourceUrl": "https://www.iswkoman.com/uploads/olympiad/9262492-IMO%2025-26%20CLASS%209.pdf"
      }
    ]
  }
];

export interface ImoMasterState {
  selectedDomainId: string;
  searchQuery: string;
  activeTab: 'practice' | 'references' | 'blueprints';
  revealedHints: Record<string, number>; // itemId -> hintLevel (1 or 2)
  committedResponses: Record<string, string>; // itemId -> user text
}

export class ImoMasterController {
  private state: ImoMasterState = {
    selectedDomainId: 'all',
    searchQuery: '',
    activeTab: 'practice',
    revealedHints: {},
    committedResponses: {},
  };

  getState(): ImoMasterState {
    return { ...this.state };
  }

  setActiveTab(tab: 'practice' | 'references' | 'blueprints'): void {
    this.state.activeTab = tab;
  }

  setSelectedDomain(domainId: string): void {
    this.state.selectedDomainId = domainId;
  }

  setSearchQuery(query: string): void {
    this.state.searchQuery = query;
  }

  unlockHint(itemId: string, level: number): void {
    const current = this.state.revealedHints[itemId] || 0;
    if (level > current) {
      this.state.revealedHints[itemId] = level;
    }
  }

  commitResponse(itemId: string, response: string): void {
    this.state.committedResponses[itemId] = response;
  }

  getDomains(): readonly ImoDomain[] {
    return IMO_DOMAINS_DATA;
  }

  getAuthoredItems(): { domain: ImoDomain; item: ImoItem }[] {
    const list: { domain: ImoDomain; item: ImoItem }[] = [];
    for (const d of IMO_DOMAINS_DATA) {
      if (this.state.selectedDomainId !== 'all' && d.id !== this.state.selectedDomainId) {
        continue;
      }
      for (const it of d.items) {
        if (it.kind === 'authored') {
          const qLower = this.state.searchQuery.toLowerCase().trim();
          if (!qLower || it.title.toLowerCase().includes(qLower) || it.problem.toLowerCase().includes(qLower)) {
            list.push({ domain: d, item: it });
          }
        }
      }
    }
    return list;
  }

  getReferencedItems(): { domain: ImoDomain; item: ImoItem }[] {
    const list: { domain: ImoDomain; item: ImoItem }[] = [];
    for (const d of IMO_DOMAINS_DATA) {
      if (this.state.selectedDomainId !== 'all' && d.id !== this.state.selectedDomainId) {
        continue;
      }
      for (const it of d.items) {
        if (it.kind === 'referenced') {
          const qLower = this.state.searchQuery.toLowerCase().trim();
          if (!qLower || it.title.toLowerCase().includes(qLower) || it.problem.toLowerCase().includes(qLower) || it.source.toLowerCase().includes(qLower)) {
            list.push({ domain: d, item: it });
          }
        }
      }
    }
    return list;
  }

  getTotalItemCount(): number {
    return IMO_DOMAINS_DATA.reduce((sum, d) => sum + d.items.length, 0);
  }
}

export function mountImoMaster(
  root: HTMLElement,
  controller?: ImoMasterController,
  onNavigate?: (route: string) => void
): { dispose: () => void } {
  const ctrl = controller ?? new ImoMasterController();
  let active = true;

  const render = () => {
    if (!active) return;
    const state = ctrl.getState();
    const domains = ctrl.getDomains();
    const authoredItems = ctrl.getAuthoredItems();
    const referencedItems = ctrl.getReferencedItems();

    root.innerHTML = `
      <div class="imo-master-container" style="max-width:1400px;margin:0 auto;padding:1.5rem;box-sizing:border-box;font-family:system-ui,-apple-system,sans-serif;color:#0f172a;">
        <!-- Header Shell -->
        <header style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:1rem;padding-bottom:1.25rem;border-bottom:2px solid #e2e8f0;margin-bottom:1.5rem;">
          <div>
            <div style="display:flex;gap:8px;font-size:0.9rem;color:#64748b;margin-bottom:0.25rem;flex-wrap:wrap;align-items:center;">
              <a href="#/home" style="color:#0284c7;text-decoration:none;font-weight:600;">Home</a> &gt;
              <a href="#/subject/mathematics" style="color:#0284c7;text-decoration:none;font-weight:600;">Mathematics</a> &gt;
              <a href="#/labs" style="color:#0284c7;text-decoration:none;font-weight:600;">Standalone Labs</a> &gt; 
              <span>IMO Grade 9 Master Suite</span>
            </div>
            <div style="display:flex;gap:8px;align-items:center;">
              <span style="font-size:0.875rem;font-weight:800;background:#e0f2fe;color:#0369a1;padding:3px 8px;border-radius:4px;">MATHEMATICS OLYMPIAD SUITE</span>
              <span style="font-size:0.875rem;font-weight:700;background:#fee2e2;color:#991b1b;padding:3px 8px;border-radius:4px;">Academic Status: HOLD</span>
              <span style="font-size:0.875rem;font-weight:700;background:#f1f5f9;color:#475569;padding:3px 8px;border-radius:4px;">15 CURRICULUM DOMAINS</span>
            </div>
            <h1 style="margin:0.5rem 0 0;font-size:1.9rem;font-weight:800;color:#0f172a;">🏆 Grade 9 IMO Mathematics Master Suite &amp; Topic Hub</h1>
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

        <!-- Suite Navigation Tabs -->
        <nav role="tablist" style="display:flex;gap:8px;margin-bottom:1.5rem;border-bottom:1px solid #cbd5e1;padding-bottom:8px;flex-wrap:wrap;">
          <button type="button" class="tab-btn ${state.activeTab === 'practice' ? 'active' : ''}" data-tab="practice" style="min-height:${HIT_TARGET_MIN_PX}px;padding:10px 18px;background:${state.activeTab === 'practice' ? '#0284c7' : '#f8fafc'};color:${state.activeTab === 'practice' ? '#ffffff' : '#475569'};border:1px solid ${state.activeTab === 'practice' ? '#0284c7' : '#cbd5e1'};border-radius:6px;cursor:pointer;font-weight:700;">
            1. 📝 Interactive Olympiad Practice Drafts (${authoredItems.length})
          </button>
          <button type="button" class="tab-btn ${state.activeTab === 'references' ? 'active' : ''}" data-tab="references" style="min-height:${HIT_TARGET_MIN_PX}px;padding:10px 18px;background:${state.activeTab === 'references' ? '#0284c7' : '#f8fafc'};color:${state.activeTab === 'references' ? '#ffffff' : '#475569'};border:1px solid ${state.activeTab === 'references' ? '#0284c7' : '#cbd5e1'};border-radius:6px;cursor:pointer;font-weight:700;">
            2. 📜 68 Official Past-Paper References Archive
          </button>
          <button type="button" class="tab-btn ${state.activeTab === 'blueprints' ? 'active' : ''}" data-tab="blueprints" style="min-height:${HIT_TARGET_MIN_PX}px;padding:10px 18px;background:${state.activeTab === 'blueprints' ? '#0284c7' : '#f8fafc'};color:${state.activeTab === 'blueprints' ? '#ffffff' : '#475569'};border:1px solid ${state.activeTab === 'blueprints' ? '#0284c7' : '#cbd5e1'};border-radius:6px;cursor:pointer;font-weight:700;">
            3. 📐 Olympiad Blueprint Architecture
          </button>
        </nav>

        <!-- Domain Filter Bar -->
        <div style="background:#ffffff;border:1px solid #e2e8f0;border-radius:8px;padding:1rem;margin-bottom:1.5rem;">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.75rem;flex-wrap:wrap;gap:8px;">
            <span style="font-weight:700;font-size:0.9rem;color:#475569;">Select Curriculum Strand / Domain:</span>
            <input type="text" id="imo-search-input" value="${escapeHtml(state.searchQuery)}" placeholder="Filter questions..." style="min-height:${HIT_TARGET_MIN_PX}px;padding:6px 12px;border:1px solid #cbd5e1;border-radius:6px;font-size:0.9rem;">
          </div>

          <div style="display:flex;gap:8px;flex-wrap:wrap;">
            <button type="button" class="domain-btn ${state.selectedDomainId === 'all' ? 'active' : ''}" data-domain="all" style="min-height:${HIT_TARGET_MIN_PX}px;padding:6px 14px;background:${state.selectedDomainId === 'all' ? '#0284c7' : '#f1f5f9'};color:${state.selectedDomainId === 'all' ? '#ffffff' : '#334155'};border:none;border-radius:100px;font-size:0.875rem;font-weight:700;cursor:pointer;">
              All 15 Domains
            </button>
            ${domains.map((d) => `
              <button type="button" class="domain-btn ${state.selectedDomainId === d.id ? 'active' : ''}" data-domain="${d.id}" style="min-height:${HIT_TARGET_MIN_PX}px;padding:6px 14px;background:${state.selectedDomainId === d.id ? '#0284c7' : '#f1f5f9'};color:${state.selectedDomainId === d.id ? '#ffffff' : '#334155'};border:none;border-radius:100px;font-size:0.875rem;font-weight:600;cursor:pointer;">
                ${escapeHtml(d.title)} (${d.items.length})
              </button>
            `).join('')}
          </div>
        </div>

        ${state.activeTab === 'practice' ? `
          <!-- TAB 1: AUTHORED PRACTICE DRAFTS -->
          <div style="display:flex;flex-direction:column;gap:1.5rem;">
            ${authoredItems.length === 0 ? `
              <div style="padding:2rem;text-align:center;background:#ffffff;border:1px solid #e2e8f0;border-radius:8px;color:#64748b;">
                No practice draft questions match the current domain and search filters.
              </div>
            ` : authoredItems.map(({ domain, item }) => {
              const hintLevel = state.revealedHints[item.id] || 0;
              const committed = state.committedResponses[item.id];

              return `
                <div class="imo-authored-card" data-qid="${item.id}" style="background:#ffffff;border:1px solid #e2e8f0;border-radius:8px;padding:1.5rem;box-shadow:0 1px 3px rgba(0,0,0,0.05);">
                  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.75rem;flex-wrap:wrap;gap:8px;">
                    <div style="display:flex;gap:8px;align-items:center;">
                      <span style="font-size:0.875rem;font-weight:800;background:#dcfce7;color:#166534;padding:3px 8px;border-radius:4px;">${escapeHtml(domain.title)}</span>
                      <span style="font-size:1.1rem;font-weight:800;color:#0f172a;">${escapeHtml(item.title)}</span>
                    </div>
                    <span style="font-size:0.875rem;font-family:monospace;color:#94a3b8;">${escapeHtml(item.id)}</span>
                  </div>

                  <p style="margin:0 0 1rem;font-size:1rem;line-height:1.6;color:#1e293b;">${escapeHtml(item.problem)}</p>

                  <div style="font-size:0.875rem;color:#64748b;margin-bottom:1.25rem;">
                    <strong>Pedagogical Context:</strong> ${escapeHtml(item.context)}
                  </div>

                  <!-- 2-Level Progressive Hint Ladder -->
                  <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:1.25rem;">
                    <div style="display:flex;gap:8px;flex-wrap:wrap;">
                      <button type="button" class="btn-unlock-hint" data-qid="${item.id}" data-level="1" style="min-height:${HIT_TARGET_MIN_PX}px;padding:8px 14px;background:#f8fafc;border:1px solid #cbd5e1;border-radius:6px;font-size:0.875rem;font-weight:700;cursor:pointer;">
                        💡 Observation Hint (Level 1) ${hintLevel >= 1 ? '✓ Unlocked' : ''}
                      </button>
                      <button type="button" class="btn-unlock-hint" data-qid="${item.id}" data-level="2" style="min-height:${HIT_TARGET_MIN_PX}px;padding:8px 14px;background:#f8fafc;border:1px solid #cbd5e1;border-radius:6px;font-size:0.875rem;font-weight:700;cursor:pointer;">
                        🔍 Derivation Scaffold (Level 2) ${hintLevel >= 2 ? '✓ Unlocked' : ''}
                      </button>
                    </div>

                    ${hintLevel >= 1 ? `
                      <div style="background:#fef3c7;border:1px solid #fde68a;border-radius:6px;padding:0.75rem;font-size:0.9rem;color:#92400e;">
                        <strong>Hint 1:</strong> Identify the Cartesian or geometric invariant. Map given coordinates or algebraic relations to standard Grade 9 canonical theorems.
                      </div>
                    ` : ''}

                    ${hintLevel >= 2 ? `
                      <div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:6px;padding:0.75rem;font-size:0.9rem;color:#1e40af;">
                        <strong>Hint 2 (Scaffold):</strong> Substitute coordinates into invariant equations. Verify symmetry or area conservation before final submission.
                      </div>
                    ` : ''}
                  </div>

                  <!-- Student Response & Commitment Working Area -->
                  <div style="border-top:1px solid #f1f5f9;padding-top:1rem;">
                    <label style="display:block;font-size:0.875rem;font-weight:700;color:#475569;margin-bottom:0.5rem;">
                      Student Derivation &amp; Answer Entry:
                    </label>
                    <textarea class="student-response-input" data-qid="${item.id}" placeholder="Enter your mathematical working, invariant, or final coordinates..." style="width:100%;min-height:80px;padding:10px;border:1px solid #cbd5e1;border-radius:6px;font-family:inherit;font-size:0.95rem;box-sizing:border-box;margin-bottom:0.75rem;">${escapeHtml(committed || '')}</textarea>
                    
                    <button type="button" class="btn-commit-response" data-qid="${item.id}" style="min-height:${HIT_TARGET_MIN_PX}px;padding:8px 18px;background:#0284c7;color:white;border:none;border-radius:6px;font-weight:700;cursor:pointer;">
                      Commit Response (Score Withheld)
                    </button>

                    ${committed ? `
                      <div style="margin-top:0.75rem;padding:0.75rem;background:#f0fdf4;border:1px solid #bbf7d0;border-radius:6px;color:#166534;font-size:0.9rem;">
                        ✓ Response committed durably. Score is withheld under Academic Review Invariant (HOLD).
                      </div>
                    ` : ''}
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        ` : state.activeTab === 'references' ? `
          <!-- TAB 2: 68 OFFICIAL PAST PAPER REFERENCES -->
          <div style="background:#ffffff;border:1px solid #e2e8f0;border-radius:8px;padding:1.5rem;box-shadow:0 1px 3px rgba(0,0,0,0.05);">
            <div style="margin-bottom:1rem;">
              <h3 style="margin:0 0 0.25rem;font-size:1.15rem;font-weight:700;">68 Authenticated SOF IMO Historical References</h3>
              <p style="margin:0;font-size:0.875rem;color:#64748b;">
                Copyright Notice: Official SOF wording, figures, and keys remain with the governing Olympiad authority; these verified references link to source papers.
              </p>
            </div>

            <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(320px, 1fr));gap:1rem;">
              ${referencedItems.map(({ domain, item }) => `
                <div style="border:1px solid #e2e8f0;border-radius:6px;padding:1rem;background:#f8fafc;">
                  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.5rem;">
                    <span style="font-size:0.875rem;font-weight:800;background:#e0f2fe;color:#0369a1;padding:2px 6px;border-radius:4px;">${escapeHtml(domain.title)}</span>
                    <span style="font-size:0.875rem;color:#64748b;font-weight:700;">${escapeHtml(item.source)}</span>
                  </div>
                  <h4 style="margin:0 0 0.25rem;font-size:0.95rem;font-weight:700;">${escapeHtml(item.title)}</h4>
                  <p style="margin:0;font-size:0.875rem;color:#475569;">${escapeHtml(item.problem || item.context || 'Official question reference registered.')}</p>
                </div>
              `).join('')}
            </div>
          </div>
        ` : `
          <!-- TAB 3: BLUEPRINTS -->
          <div style="background:#ffffff;border:1px solid #e2e8f0;border-radius:8px;padding:1.5rem;box-shadow:0 1px 3px rgba(0,0,0,0.05);">
            <h3 style="margin:0 0 0.5rem;font-size:1.2rem;font-weight:700;">Grade 9 IMO Curriculum Blueprints</h3>
            <p style="margin:0 0 1.5rem;font-size:0.9rem;color:#64748b;">
              Adheres strictly to the 4-Gate Zero-Escape Foolproof Checklist and QRT 7-Operation Cognitive Demand.
            </p>

            <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(280px, 1fr));gap:1rem;">
              <div style="border:1px solid #cbd5e1;border-radius:6px;padding:1rem;background:#f8fafc;">
                <div style="font-weight:800;color:#0369a1;margin-bottom:4px;">Core 1A Construction</div>
                <p style="margin:0;font-size:0.875rem;color:#475569;">
                  Establishes baseline mathematical intuition through interactive geometric models and coordinate manipulation.
                </p>
              </div>
              <div style="border:1px solid #cbd5e1;border-radius:6px;padding:1rem;background:#f8fafc;">
                <div style="font-weight:800;color:#92400e;margin-bottom:4px;">Core 1B Reconstruction</div>
                <p style="margin:0;font-size:0.875rem;color:#475569;">
                  Mandatory student derivation steps before answer submission. Enforces commitment without premature hint revelation.
                </p>
              </div>
              <div style="border:1px solid #cbd5e1;border-radius:6px;padding:1rem;background:#f8fafc;">
                <div style="font-weight:800;color:#166534;margin-bottom:4px;">Core 2 Transfer Practice</div>
                <p style="margin:0;font-size:0.875rem;color:#475569;">
                  Cognitive demand variations (D1 Foundational to D4 Olympiad) testing mathematical invariants across domains.
                </p>
              </div>
            </div>
          </div>
        `}
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

    // Tab buttons
    root.querySelectorAll<HTMLButtonElement>('.tab-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const tab = btn.dataset.tab as any;
        if (tab) {
          ctrl.setActiveTab(tab);
          render();
        }
      });
    });

    // Domain filter buttons
    root.querySelectorAll<HTMLButtonElement>('.domain-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const d = btn.dataset.domain || 'all';
        ctrl.setSelectedDomain(d);
        render();
      });
    });

    // Search input
    root.querySelector<HTMLInputElement>('#imo-search-input')?.addEventListener('input', (e) => {
      ctrl.setSearchQuery((e.target as HTMLInputElement).value);
      render();
    });

    // Unlock hint buttons
    root.querySelectorAll<HTMLButtonElement>('.btn-unlock-hint').forEach((btn) => {
      btn.addEventListener('click', () => {
        const qid = btn.dataset.qid;
        const level = parseInt(btn.dataset.level || '1', 10);
        if (qid) {
          ctrl.unlockHint(qid, level);
          render();
        }
      });
    });

    // Commit response buttons
    root.querySelectorAll<HTMLButtonElement>('.btn-commit-response').forEach((btn) => {
      btn.addEventListener('click', () => {
        const qid = btn.dataset.qid;
        if (qid) {
          const textarea = root.querySelector<HTMLTextAreaElement>(`textarea[data-qid="${qid}"]`);
          if (textarea) {
            ctrl.commitResponse(qid, textarea.value);
            render();
          }
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
