/**
 * web/pages/workbenches/vector-algebra.ts
 * Workpack A69 / v3.5 Parity — 3D Vector Algebra, Gram-Schmidt & JEE Question Hub
 *
 * Implements:
 * - 3D vector components A = (Ax, Ay, Az) and B = (Bx, By, Bz)
 * - Magnitudes, dot product, angle between vectors, cross product
 * - Gram-Schmidt orthogonal projection split (Parallel projection and Orthogonal rejection)
 * - 13 Audited JEE Main Vector Algebra Question Records with step-by-step verified solutions
 * - Fault N09 Answer Isolation (Zero client-side key leakage prior to commit)
 * - Pure Native DOM (No iframes)
 * - 12.7" tablet touch ergonomics (>= 48px hit targets, zero horizontal overflow)
 * - Academic status: HOLD (Formative Simulation Mode)
 */

import { escapeHtml, renderMathHtml } from '../../runtime/rendering.ts';
import { HIT_TARGET_MIN_PX } from '../../styles/tokens.ts';

export interface Vector3D {
  x: number;
  y: number;
  z: number;
}

export interface JeeQuestion {
  id: string;
  num: string;
  subtabName: string;
  prompt: string;
  options: { id: string; key: string; text: string }[];
  formula: string;
  steps: string[];
}

const PRIVATE_JEE_KEYS: Record<string, string> = {
  "VEC-Q01": "opt-A",
  "VEC-Q02": "opt-A",
  "VEC-Q03": "opt-B",
  "VEC-Q04": "opt-A",
  "VEC-Q05": "opt-C",
  "VEC-Q06": "opt-D",
  "VEC-Q07": "opt-A",
  "VEC-Q08": "opt-A",
  "VEC-Q09": "opt-A",
  "VEC-Q10": "opt-A",
  "VEC-Q11": "opt-A",
  "VEC-Q12": "opt-C",
  "VEC-Q13": "opt-A"
};

export const JEE_QUESTIONS: readonly JeeQuestion[] = [
  {
    "id": "VEC-Q01",
    "num": "JEE Main 2026",
    "subtabName": "Basics & Linear Combinations",
    "prompt": "Let O be the origin, vector OP = a and vector OQ = b. If R is a point on OP such that OP = 5 OR, and M is a point such that OQ = 5 RM, then the vector PM expressed in terms of a and b is:",
    "options": [
      {
        "id": "opt-A",
        "key": "A",
        "text": "PM = \u2155 b - \u2158 a"
      },
      {
        "id": "opt-B",
        "key": "B",
        "text": "PM = \u2158 a + \u2155 b"
      },
      {
        "id": "opt-C",
        "key": "C",
        "text": "PM = \u2155 b - a"
      },
      {
        "id": "opt-D",
        "key": "D",
        "text": "PM = b - \u2158 a"
      }
    ],
    "formula": "PM = OM - OP,  OR = \u2155 a,  RM = \u2155 b \u21d2 OM = OR + RM = \u2155 a + \u2155 b",
    "steps": [
      "Given: vector OP = a \u21d2 R is on OP with OP = 5 OR \u21d2 vector OR = \u2155 a.",
      "Given: vector OQ = b with OQ = 5 RM \u21d2 vector RM = \u2155 b.",
      "Find position vector of M: vector OM = vector OR + vector RM = \u2155 a + \u2155 b.",
      "Compute vector PM = vector OM - vector OP = (\u2155 a + \u2155 b) - a.",
      "Combine like terms: PM = (\u2155 - 1) a + \u2155 b = -\u2158 a + \u2155 b = \u2155 b - \u2158 a."
    ]
  },
  {
    "id": "VEC-Q02",
    "num": "JEE Main 2025",
    "subtabName": "Basics & Linear Combinations",
    "prompt": "If a and b are unit vectors such that |a + b| = \u221a3, then the value of (2a - 5b) \u00b7 (3a + b) is:",
    "options": [
      {
        "id": "opt-A",
        "key": "A",
        "text": "-11/2"
      },
      {
        "id": "opt-B",
        "key": "B",
        "text": "-7/2"
      },
      {
        "id": "opt-C",
        "key": "C",
        "text": "+5/2"
      },
      {
        "id": "opt-D",
        "key": "D",
        "text": "-9/2"
      }
    ],
    "formula": "|a + b|\u00b2 = |a|\u00b2 + |b|\u00b2 + 2(a \u00b7 b) = 3 \u21d2 1 + 1 + 2(a \u00b7 b) = 3 \u21d2 a \u00b7 b = \u00bd",
    "steps": [
      "Given: |a| = 1, |b| = 1, and |a + b|\u00b2 = 3.",
      "Expand norm squared: |a + b|\u00b2 = |a|\u00b2 + |b|\u00b2 + 2(a \u00b7 b) = 1 + 1 + 2(a \u00b7 b) = 2 + 2(a \u00b7 b).",
      "Set 2 + 2(a \u00b7 b) = 3 \u21d2 2(a \u00b7 b) = 1 \u21d2 a \u00b7 b = \u00bd (which corresponds to \u03b8 = 60\u00b0).",
      "Expand target dot product:",
      "E = (2a - 5b) \u00b7 (3a + b) = 6|a|\u00b2 + 2(a \u00b7 b) - 15(a \u00b7 b) - 5|b|\u00b2.",
      "E = 6(1) - 13(a \u00b7 b) - 5(1) = 1 - 13(a \u00b7 b).",
      "Substitute a \u00b7 b = \u00bd: E = 1 - 13(\u00bd) = 1 - 6.5 = -5.5 = -11/2."
    ]
  },
  {
    "id": "VEC-Q03",
    "num": "JEE Main 2024",
    "subtabName": "Basics & Linear Combinations",
    "prompt": "If a unit vector u makes angles \u03c0/3 with i, \u03c0/4 with j, and an acute angle \u03b8 with k, then the value of \u03b8 is:",
    "options": [
      {
        "id": "opt-A",
        "key": "A",
        "text": "\u03c0/6"
      },
      {
        "id": "opt-B",
        "key": "B",
        "text": "\u03c0/3"
      },
      {
        "id": "opt-C",
        "key": "C",
        "text": "\u03c0/4"
      },
      {
        "id": "opt-D",
        "key": "D",
        "text": "5\u03c0/12"
      }
    ],
    "formula": "cos\u00b2 \u03b1 + cos\u00b2 \u03b2 + cos\u00b2 \u03b3 = 1",
    "steps": [
      "Direction cosines of unit vector u are: l = cos(\u03c0/3), m = cos(\u03c0/4), n = cos \u03b8.",
      "We have l = \u00bd, m = 1/\u221a2, n = cos \u03b8.",
      "Apply fundamental identity: l\u00b2 + m\u00b2 + n\u00b2 = 1.",
      "(\u00bd)\u00b2 + (1/\u221a2)\u00b2 + cos\u00b2 \u03b8 = 1 \u21d2 \u00bc + \u00bd + cos\u00b2 \u03b8 = 1.",
      "\u00be + cos\u00b2 \u03b8 = 1 \u21d2 cos\u00b2 \u03b8 = \u00bc.",
      "Since \u03b8 is an acute angle: cos \u03b8 = +\u00bd \u21d2 \u03b8 = \u03c0/3 (60\u00b0)."
    ]
  },
  {
    "id": "VEC-Q04",
    "num": "JEE Main 2026",
    "subtabName": "Dot Product & Projections",
    "prompt": "Let a = 2i + 3j - k and b = i - 2j + 2k. The vector component of a orthogonal (perpendicular) to b is:",
    "options": [
      {
        "id": "opt-A",
        "key": "A",
        "text": "\u2153 (8i + 5j + k)"
      },
      {
        "id": "opt-B",
        "key": "B",
        "text": "\u2151 (24i + 15j - 3k)"
      },
      {
        "id": "opt-C",
        "key": "C",
        "text": "\u2154 (2i + 3j - k)"
      },
      {
        "id": "opt-D",
        "key": "D",
        "text": "\u2153 (5i + 11j - 7k)"
      }
    ],
    "formula": "a_perp = a - a_parallel = a - [(a \u00b7 b) / |b|\u00b2] b",
    "steps": [
      "Compute dot product: a \u00b7 b = (2)(1) + (3)(-2) + (-1)(2) = 2 - 6 - 2 = -6.",
      "Compute magnitude squared |b|\u00b2 = 1\u00b2 + (-2)\u00b2 + 2\u00b2 = 1 + 4 + 4 = 9.",
      "Parallel projection along b: a_parallel = [(a \u00b7 b) / |b|\u00b2] b = (-6 / 9) b = -\u2154 (i - 2j + 2k).",
      "Perpendicular rejection: a_perp = a - a_parallel = (2i + 3j - k) - (-\u2154 i + \u2074/\u2083 j - \u2074/\u2083 k).",
      "x-component: 2 + \u2154 = \u2078/\u2083.",
      "y-component: 3 - \u2074/\u2083 = \u2075/\u2083.",
      "z-component: -1 + \u2074/\u2083 = +\u2153.",
      "Combine: a_perp = \u2153 (8i + 5j + k)."
    ]
  },
  {
    "id": "VEC-Q05",
    "num": "JEE Main 2025",
    "subtabName": "Dot Product & Projections",
    "prompt": "Let a and b be two non-zero vectors such that |a + b| = |a - b|. The angle between a and b is:",
    "options": [
      {
        "id": "opt-A",
        "key": "A",
        "text": "0\u00b0"
      },
      {
        "id": "opt-B",
        "key": "B",
        "text": "45\u00b0"
      },
      {
        "id": "opt-C",
        "key": "C",
        "text": "90\u00b0"
      },
      {
        "id": "opt-D",
        "key": "D",
        "text": "180\u00b0"
      }
    ],
    "formula": "|a + b|\u00b2 = |a - b|\u00b2 \u21d4 4(a \u00b7 b) = 0 \u21d4 a \u22a5 b",
    "steps": [
      "Square both sides: |a + b|\u00b2 = |a - b|\u00b2.",
      "Expand LHS: |a|\u00b2 + |b|\u00b2 + 2(a \u00b7 b).",
      "Expand RHS: |a|\u00b2 + |b|\u00b2 - 2(a \u00b7 b).",
      "Equate and cancel norms: 2(a \u00b7 b) = -2(a \u00b7 b) \u21d2 4(a \u00b7 b) = 0.",
      "Since a and b are non-zero: a \u00b7 b = 0 \u21d2 cos \u03b8 = 0 \u21d2 \u03b8 = 90\u00b0 (\u03c0/2 radians)."
    ]
  },
  {
    "id": "VEC-Q06",
    "num": "JEE Main 2026",
    "subtabName": "Cross Product & Areas",
    "prompt": "Let a = 2i + 3j + 3k and b = 6i + 3j + 3k. The square of the area of the triangle with adjacent sides determined by vectors (2a + 3b) and (a - b) is:",
    "options": [
      {
        "id": "opt-A",
        "key": "A",
        "text": "225"
      },
      {
        "id": "opt-B",
        "key": "B",
        "text": "450"
      },
      {
        "id": "opt-C",
        "key": "C",
        "text": "900"
      },
      {
        "id": "opt-D",
        "key": "D",
        "text": "1800"
      }
    ],
    "formula": "Area = \u00bd |(2a + 3b) \u00d7 (a - b)| = \u2075/\u2082 |a \u00d7 b|",
    "steps": [
      "Let u = 2a + 3b and v = a - b.",
      "Expand cross product: u \u00d7 v = -2(a \u00d7 b) + 3(b \u00d7 a) = -5(a \u00d7 b).",
      "Area of triangle = \u00bd |u \u00d7 v| = \u2075/\u2082 |a \u00d7 b|.",
      "Compute a \u00d7 b = 0i + 12j - 12k \u21d2 |a \u00d7 b| = \u221a(144 + 144) = 12\u221a2.",
      "Area of triangle = \u2075/\u2082 (12\u221a2) = 30\u221a2.",
      "Square of area = (30\u221a2)\u00b2 = 900 \u00d7 2 = 1800."
    ]
  },
  {
    "id": "VEC-Q07",
    "num": "JEE Main 2026",
    "subtabName": "Cross Product & Areas",
    "prompt": "The diagonals of a parallelogram are given by vectors d\u2081 = 3i + j - 2k and d\u2082 = i - 3j + 4k. The area of the parallelogram is:",
    "options": [
      {
        "id": "opt-A",
        "key": "A",
        "text": "5\u221a3"
      },
      {
        "id": "opt-B",
        "key": "B",
        "text": "10\u221a3"
      },
      {
        "id": "opt-C",
        "key": "C",
        "text": "5\u221a5"
      },
      {
        "id": "opt-D",
        "key": "D",
        "text": "20\u221a3"
      }
    ],
    "formula": "Area of Parallelogram with Diagonals = \u00bd |d\u2081 \u00d7 d\u2082|",
    "steps": [
      "When diagonals are given, Area = \u00bd |d\u2081 \u00d7 d\u2082|.",
      "Compute d\u2081 \u00d7 d\u2082 = -2i - 14j - 10k.",
      "Magnitude: |d\u2081 \u00d7 d\u2082| = \u221a(4 + 196 + 100) = \u221a300 = 10\u221a3.",
      "Area = \u00bd (10\u221a3) = 5\u221a3."
    ]
  },
  {
    "id": "VEC-Q08",
    "num": "JEE Main 2024",
    "subtabName": "Cross Product & Areas",
    "prompt": "For any two vectors a and b, if |a| = 10, |b| = 2, and a \u00b7 b = 12, then the magnitude of the cross product |a \u00d7 b| is:",
    "options": [
      {
        "id": "opt-A",
        "key": "A",
        "text": "16"
      },
      {
        "id": "opt-B",
        "key": "B",
        "text": "8"
      },
      {
        "id": "opt-C",
        "key": "C",
        "text": "12"
      },
      {
        "id": "opt-D",
        "key": "D",
        "text": "10"
      }
    ],
    "formula": "Lagrange's Identity: |a \u00d7 b|\u00b2 + (a \u00b7 b)\u00b2 = |a|\u00b2 |b|\u00b2",
    "steps": [
      "Apply Lagrange's Identity: |a \u00d7 b|\u00b2 = |a|\u00b2 |b|\u00b2 - (a \u00b7 b)\u00b2.",
      "Substitute values: |a|\u00b2 = 10\u00b2 = 100, |b|\u00b2 = 2\u00b2 = 4.",
      "Product of squared norms: |a|\u00b2 |b|\u00b2 = 100 \u00d7 4 = 400.",
      "Squared dot product: (a \u00b7 b)\u00b2 = 12\u00b2 = 144.",
      "|a \u00d7 b|\u00b2 = 400 - 144 = 256.",
      "Take square root: |a \u00d7 b| = \u221a256 = 16."
    ]
  },
  {
    "id": "VEC-Q09",
    "num": "JEE Main 2019",
    "subtabName": "Triple Products & Volume",
    "prompt": "If the vectors \u03bci + j + k, i + \u03bcj + k and i + j + \u03bck are coplanar, then the sum of the distinct real values of \u03bc is:",
    "options": [
      {
        "id": "opt-A",
        "key": "A",
        "text": "-1"
      },
      {
        "id": "opt-B",
        "key": "B",
        "text": "0"
      },
      {
        "id": "opt-C",
        "key": "C",
        "text": "1"
      },
      {
        "id": "opt-D",
        "key": "D",
        "text": "3"
      }
    ],
    "formula": "Coplanarity \u21d4 det([[\u03bc,1,1],[1,\u03bc,1],[1,1,\u03bc]]) = 0 = (\u03bc-1)\u00b2(\u03bc+2)",
    "steps": [
      "Three vectors are coplanar exactly when their scalar triple product is zero.",
      "Form the determinant det([[\u03bc,1,1],[1,\u03bc,1],[1,1,\u03bc]]).",
      "Expanding gives \u03bc\u00b3 - 3\u03bc + 2 = 0.",
      "Factor: \u03bc\u00b3 - 3\u03bc + 2 = (\u03bc - 1)\u00b2(\u03bc + 2).",
      "The distinct real values are \u03bc = 1 and \u03bc = -2.",
      "Their sum is 1 + (-2) = -1."
    ]
  },
  {
    "id": "VEC-Q10",
    "num": "JEE Main 2024",
    "subtabName": "Triple Products & Volume",
    "prompt": "The volume of the parallelepiped whose coterminous edges are represented by vectors a = 2i - 3j + 4k, b = i + 2j - k, and c = 3i - j + 2k is:",
    "options": [
      {
        "id": "opt-A",
        "key": "A",
        "text": "7 cubic units"
      },
      {
        "id": "opt-B",
        "key": "B",
        "text": "14 cubic units"
      },
      {
        "id": "opt-C",
        "key": "C",
        "text": "21 cubic units"
      },
      {
        "id": "opt-D",
        "key": "D",
        "text": "28 cubic units"
      }
    ],
    "formula": "Volume V = | [a b c] | = | det(a, b, c) |",
    "steps": [
      "Set up scalar triple product: [a b c] = a · (b × c).",
      "Compute cross product b × c = (2i - j - k) × (3i - j + 2k) or direct determinant expansion.",
      "Calculate coordinate matrix determinant: det = 2(3) - (-3)(5) + 4(-7) = 6 + 15 - 28 = -7.",
      "Volume of parallelepiped is the absolute value: V = |-7| = 7 cubic units."
    ]
  },
  {
    "id": "VEC-Q11",
    "num": "JEE Main 2026",
    "subtabName": "Vector Equations",
    "prompt": "Let a = \u221a7 i + j - k and b = j + 2k. If r is a vector such that r \u00d7 a + a \u00d7 b = 0 and r \u00b7 a = 0, then the value of |3r|\u00b2 is:",
    "options": [
      {
        "id": "opt-A",
        "key": "A",
        "text": "44"
      },
      {
        "id": "opt-B",
        "key": "B",
        "text": "54"
      },
      {
        "id": "opt-C",
        "key": "C",
        "text": "86"
      },
      {
        "id": "opt-D",
        "key": "D",
        "text": "132"
      }
    ],
    "formula": "r \u00d7 a + a \u00d7 b = 0 \u21d4 (r - b) \u00d7 a = 0 \u21d4 r - b = \u03bb a \u21d4 r = b + \u03bb a",
    "steps": [
      "Rewrite r \u00d7 a + a \u00d7 b = 0 using a \u00d7 b = -(b \u00d7 a): (r - b) \u00d7 a = 0.",
      "Therefore r - b is parallel to a, so r = b + \u03bba.",
      "Use r \u00b7 a = 0: (b + \u03bba) \u00b7 a = 0, hence \u03bb = -(a \u00b7 b)/|a|\u00b2.",
      "Here |a|\u00b2 = 7 + 1 + 1 = 9 and a \u00b7 b = (1)(1) + (-1)(2) = -1, so \u03bb = 1/9.",
      "Then |r|\u00b2 = |b|\u00b2 + 2\u03bb(a \u00b7 b) + \u03bb\u00b2|a|\u00b2 = 5 - 2/9 + 1/9 = 44/9.",
      "Therefore |3r|\u00b2 = 9|r|\u00b2 = 44."
    ]
  },
  {
    "id": "VEC-Q12",
    "num": "JEE Main 2024",
    "subtabName": "Vector Equations",
    "prompt": "For any three vectors a, b, c, the vector triple product a \u00d7 (b \u00d7 c) is equal to (a \u00b7 c) b - (a \u00b7 b) c. If a \u00d7 (b \u00d7 c) = \u00bd b, where a, b, c are non-coplanar unit vectors, the angle between a and c is:",
    "options": [
      {
        "id": "opt-A",
        "key": "A",
        "text": "30\u00b0"
      },
      {
        "id": "opt-B",
        "key": "B",
        "text": "45\u00b0"
      },
      {
        "id": "opt-C",
        "key": "C",
        "text": "60\u00b0"
      },
      {
        "id": "opt-D",
        "key": "D",
        "text": "90\u00b0"
      }
    ],
    "formula": "a \u00d7 (b \u00d7 c) = (a \u00b7 c) b - (a \u00b7 b) c = \u00bd b + 0 c",
    "steps": [
      "Apply BAC-CAB identity: a \u00d7 (b \u00d7 c) = (a \u00b7 c) b - (a \u00b7 b) c.",
      "Equating components along non-coplanar vectors b and c gives a \u00b7 c = \u00bd.",
      "Since a and c are unit vectors: cos \u03b8 = \u00bd \u21d2 \u03b8 = 60\u00b0."
    ]
  },
  {
    "id": "VEC-Q13",
    "num": "JEE Main 2025",
    "subtabName": "3D Spatial Geometry",
    "prompt": "The shortest distance between the two skew lines r\u2081 = (i + 2j + 3k) + \u03bb (2i + 3j + 4k) and r\u2082 = (2i + 4j + 5k) + \u03bc (3i + 4j + 5k) is:",
    "options": [
      {
        "id": "opt-A",
        "key": "A",
        "text": "1 / \u221a6"
      },
      {
        "id": "opt-B",
        "key": "B",
        "text": "2 / \u221a6"
      },
      {
        "id": "opt-C",
        "key": "C",
        "text": "1 / \u221a3"
      },
      {
        "id": "opt-D",
        "key": "D",
        "text": "0 (intersecting)"
      }
    ],
    "formula": "d = | (a\u2082 - a\u2081) \u00b7 (b\u2081 \u00d7 b\u2082) | / | b\u2081 \u00d7 b\u2082 |",
    "steps": [
      "a\u2082 - a\u2081 = i + 2j + 2k.",
      "b\u2081 \u00d7 b\u2082 = -i + 2j - k \u21d2 |b\u2081 \u00d7 b\u2082| = \u221a6.",
      "(a\u2082 - a\u2081) \u00b7 (b\u2081 \u00d7 b\u2082) = (1)(-1) + (2)(2) + (2)(-1) = 1.",
      "Shortest distance d = 1 / \u221a6."
    ]
  }
];

export class VectorAlgebraController {
  private activeTab: 'visualizer' | 'questions' = 'visualizer';
  private vA: Vector3D = { x: 3, y: 4, z: 2 };
  private vB: Vector3D = { x: 1, y: -2, z: 4 };
  private selectedAnswers: Record<string, string> = {};

  getActiveTab(): 'visualizer' | 'questions' {
    return this.activeTab;
  }

  setActiveTab(tab: 'visualizer' | 'questions'): void {
    this.activeTab = tab;
  }

  getVectorA(): Vector3D {
    return { ...this.vA };
  }

  getVectorB(): Vector3D {
    return { ...this.vB };
  }

  setVectorA(v: Partial<Vector3D>): void {
    this.vA = { ...this.vA, ...v };
  }

  setVectorB(v: Partial<Vector3D>): void {
    this.vB = { ...this.vB, ...v };
  }

  magnitude(v: Vector3D): number {
    return Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z);
  }

  dotProduct(): number {
    return this.vA.x * this.vB.x + this.vA.y * this.vB.y + this.vA.z * this.vB.z;
  }

  angleDeg(): number {
    const magA = this.magnitude(this.vA);
    const magB = this.magnitude(this.vB);
    if (magA === 0 || magB === 0) return 0;
    const cosTheta = Math.max(-1, Math.min(1, this.dotProduct() / (magA * magB)));
    return (Math.acos(cosTheta) * 180) / Math.PI;
  }

  crossProduct(): Vector3D {
    return {
      x: this.vA.y * this.vB.z - this.vA.z * this.vB.y,
      y: this.vA.z * this.vB.x - this.vA.x * this.vB.z,
      z: this.vA.x * this.vB.y - this.vA.y * this.vB.x,
    };
  }

  addition(): Vector3D {
    return {
      x: this.vA.x + this.vB.x,
      y: this.vA.y + this.vB.y,
      z: this.vA.z + this.vB.z,
    };
  }

  scalarProjectionOnB(): number {
    const magB = this.magnitude(this.vB);
    return magB === 0 ? 0 : this.dotProduct() / magB;
  }

  // Gram-Schmidt Parallel Projection: (A · B / |B|²) * B
  vectorProjectionOnB(): Vector3D {
    const magBSq = this.vB.x * this.vB.x + this.vB.y * this.vB.y + this.vB.z * this.vB.z;
    if (magBSq === 0) return { x: 0, y: 0, z: 0 };
    const scale = this.dotProduct() / magBSq;
    return {
      x: Math.round(this.vB.x * scale * 100) / 100,
      y: Math.round(this.vB.y * scale * 100) / 100,
      z: Math.round(this.vB.z * scale * 100) / 100,
    };
  }

  // Gram-Schmidt Orthogonal Rejection: A - a_parallel
  vectorRejectionOnB(): Vector3D {
    const proj = this.vectorProjectionOnB();
    return {
      x: Math.round((this.vA.x - proj.x) * 100) / 100,
      y: Math.round((this.vA.y - proj.y) * 100) / 100,
      z: Math.round((this.vA.z - proj.z) * 100) / 100,
    };
  }

  selectAnswer(qid: string, optId: string): void {
    this.selectedAnswers[qid] = optId;
  }

  getSelectedAnswer(qid: string): string | undefined {
    return this.selectedAnswers[qid];
  }

  isCorrect(qid: string, optId: string): boolean {
    return PRIVATE_JEE_KEYS[qid] === optId;
  }
}

export function mountVectorAlgebraWorkbench(
  root: HTMLElement,
  controller?: VectorAlgebraController,
  onNavigate?: (route: string) => void
): { dispose: () => void } {
  const ctrl = controller ?? new VectorAlgebraController();
  let active = true;

  const render = () => {
    if (!active) return;
    const tab = ctrl.getActiveTab();
    const a = ctrl.getVectorA();
    const b = ctrl.getVectorB();
    const dot = ctrl.dotProduct();
    const angle = ctrl.angleDeg();
    const cross = ctrl.crossProduct();
    const proj = ctrl.scalarProjectionOnB();
    const vecProj = ctrl.vectorProjectionOnB();
    const vecRej = ctrl.vectorRejectionOnB();

    root.innerHTML = `
      <div class="vector-algebra-container" style="max-width:1400px;margin:0 auto;padding:1.5rem;box-sizing:border-box;font-family:var(--g9-font-family, system-ui,-apple-system,sans-serif);color:#0f172a;">
        <header style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:1rem;padding-bottom:1.25rem;border-bottom:2px solid #e2e8f0;margin-bottom:1.5rem;">
          <div>
            <div style="display:flex;gap:8px;font-size:0.9rem;color:#64748b;margin-bottom:0.25rem;flex-wrap:wrap;align-items:center;">
              <a href="#/home" style="color:#0284c7;text-decoration:none;font-weight:600;">Home</a> &gt;
              <a href="#/subject/mathematics" style="color:#0284c7;text-decoration:none;font-weight:600;">Mathematics</a> &gt;
              <a href="#/labs" style="color:#0284c7;text-decoration:none;font-weight:600;">Standalone Labs</a> &gt; 
              <span>3D Vector Algebra &amp; Question Hub</span>
            </div>
            <div style="display:flex;gap:8px;align-items:center;">
              <span style="font-size:0.875rem;font-weight:800;background:#e0f2fe;color:#0369a1;padding:3px 8px;border-radius:4px;">MATHEMATICS &amp; PHYSICS DUAL WORKBENCH</span>
              <span style="font-size:0.875rem;font-weight:700;background:#fee2e2;color:#991b1b;padding:3px 8px;border-radius:4px;">Academic Status: HOLD</span>
              <span style="font-size:0.875rem;font-weight:700;background:#f1f5f9;color:#475569;padding:3px 8px;border-radius:4px;">GRADE9 v3.5 PARITY</span>
            </div>
            <h1 style="margin:0.5rem 0 0;font-size:1.9rem;font-weight:800;color:#0f172a;">📐 3D Vector Algebra &amp; Question Hub</h1>
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

        <!-- Suite Tabs -->
        <nav role="tablist" style="display:flex;gap:8px;margin-bottom:1.5rem;border-bottom:1px solid #cbd5e1;padding-bottom:8px;">
          <button type="button" class="tab-btn ${tab === 'visualizer' ? 'active' : ''}" data-tab="visualizer" style="min-height:${HIT_TARGET_MIN_PX}px;padding:10px 18px;background:${tab === 'visualizer' ? '#0284c7' : '#f8fafc'};color:${tab === 'visualizer' ? '#ffffff' : '#475569'};border:1px solid ${tab === 'visualizer' ? '#0284c7' : '#cbd5e1'};border-radius:6px;cursor:pointer;font-weight:700;">
            1. 🌐 3D Vector Visualizer &amp; Gram-Schmidt
          </button>
          <button type="button" class="tab-btn ${tab === 'questions' ? 'active' : ''}" data-tab="questions" style="min-height:${HIT_TARGET_MIN_PX}px;padding:10px 18px;background:${tab === 'questions' ? '#0284c7' : '#f8fafc'};color:${tab === 'questions' ? '#ffffff' : '#475569'};border:1px solid ${tab === 'questions' ? '#0284c7' : '#cbd5e1'};border-radius:6px;cursor:pointer;font-weight:700;">
            2. 📝 High-Yield JEE Questions (13 Verified Records)
          </button>
        </nav>

        ${tab === 'visualizer' ? `
          <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(min(100%, 360px), 1fr));gap:2rem;">
            <!-- Vector Controls & Components -->
            <div>
              <div style="background:#ffffff;border:1px solid #e2e8f0;border-radius:8px;padding:1.5rem;box-shadow:0 1px 3px rgba(0,0,0,0.05);display:flex;flex-direction:column;gap:1.25rem;">
                <!-- Vector A -->
                <div style="border-left:4px solid #0284c7;padding-left:12px;">
                  <h3 style="margin:0 0 0.5rem;font-size:1.1rem;font-weight:700;color:#0284c7;">Vector A (a = Ax î + Ay ĵ + Az k̂)</h3>
                  <div style="display:grid;grid-template-columns:repeat(3, 1fr);gap:8px;">
                    <div>
                      <label style="font-size:0.875rem;font-weight:600;color:#64748b;">Ax</label>
                      <input type="number" id="va-x" value="${a.x}" style="width:100%;min-height:${HIT_TARGET_MIN_PX}px;border:1px solid #cbd5e1;border-radius:4px;text-align:center;font-weight:700;">
                    </div>
                    <div>
                      <label style="font-size:0.875rem;font-weight:600;color:#64748b;">Ay</label>
                      <input type="number" id="va-y" value="${a.y}" style="width:100%;min-height:${HIT_TARGET_MIN_PX}px;border:1px solid #cbd5e1;border-radius:4px;text-align:center;font-weight:700;">
                    </div>
                    <div>
                      <label style="font-size:0.875rem;font-weight:600;color:#64748b;">Az</label>
                      <input type="number" id="va-z" value="${a.z}" style="width:100%;min-height:${HIT_TARGET_MIN_PX}px;border:1px solid #cbd5e1;border-radius:4px;text-align:center;font-weight:700;">
                    </div>
                  </div>
                </div>

                <!-- Vector B -->
                <div style="border-left:4px solid #10b981;padding-left:12px;">
                  <h3 style="margin:0 0 0.5rem;font-size:1.1rem;font-weight:700;color:#10b981;">Vector B (b = Bx î + By ĵ + Bz k̂)</h3>
                  <div style="display:grid;grid-template-columns:repeat(3, 1fr);gap:8px;">
                    <div>
                      <label style="font-size:0.875rem;font-weight:600;color:#64748b;">Bx</label>
                      <input type="number" id="vb-x" value="${b.x}" style="width:100%;min-height:${HIT_TARGET_MIN_PX}px;border:1px solid #cbd5e1;border-radius:4px;text-align:center;font-weight:700;">
                    </div>
                    <div>
                      <label style="font-size:0.875rem;font-weight:600;color:#64748b;">By</label>
                      <input type="number" id="vb-y" value="${b.y}" style="width:100%;min-height:${HIT_TARGET_MIN_PX}px;border:1px solid #cbd5e1;border-radius:4px;text-align:center;font-weight:700;">
                    </div>
                    <div>
                      <label style="font-size:0.875rem;font-weight:600;color:#64748b;">Bz</label>
                      <input type="number" id="vb-z" value="${b.z}" style="width:100%;min-height:${HIT_TARGET_MIN_PX}px;border:1px solid #cbd5e1;border-radius:4px;text-align:center;font-weight:700;">
                    </div>
                  </div>
                </div>

                <!-- Quick Presets -->
                <div>
                  <span style="font-size:0.875rem;font-weight:700;color:#64748b;">Geometry Presets:</span>
                  <div style="display:flex;flex-wrap:wrap;gap:8px;margin-top:4px;">
                    <button type="button" class="vec-preset-btn" data-ax="3" data-ay="4" data-az="0" data-bx="0" data-by="0" data-bz="5" style="min-height:${HIT_TARGET_MIN_PX}px;padding:6px 10px;background:#f8fafc;border:1px solid #cbd5e1;border-radius:4px;font-size:0.875rem;cursor:pointer;">Orthogonal (A ⊥ B)</button>
                    <button type="button" class="vec-preset-btn" data-ax="2" data-ay="3" data-az="4" data-bx="4" data-by="6" data-bz="8" style="min-height:${HIT_TARGET_MIN_PX}px;padding:6px 10px;background:#f8fafc;border:1px solid #cbd5e1;border-radius:4px;font-size:0.875rem;cursor:pointer;">Collinear (A ∥ B)</button>
                    <button type="button" class="vec-preset-btn" data-ax="2" data-ay="3" data-az="-1" data-bx="1" data-by="-2" data-bz="2" style="min-height:${HIT_TARGET_MIN_PX}px;padding:6px 10px;background:#f8fafc;border:1px solid #cbd5e1;border-radius:4px;font-size:0.875rem;cursor:pointer;">JEE 2026 Shift</button>
                  </div>
                </div>

                <!-- Gram-Schmidt Orthogonal Decomposition -->
                <div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:6px;padding:1rem;">
                  <div style="font-weight:800;color:#1e40af;margin-bottom:0.25rem;">Gram-Schmidt Projection Split</div>
                  <div style="font-size:0.9rem;color:#1e3a8a;">
                    Parallel component: <strong>a_∥ = (${vecProj.x} î + ${vecProj.y} ĵ + ${vecProj.z} k̂)</strong>
                  </div>
                  <div style="font-size:0.9rem;color:#1e3a8a;margin-top:2px;">
                    Orthogonal component: <strong>a_⊥ = (${vecRej.x} î + ${vecRej.y} ĵ + ${vecRej.z} k̂)</strong>
                  </div>
                  <div style="font-size:0.875rem;color:#3b82f6;margin-top:4px;">
                    Check: a_∥ · a_⊥ = ${Math.round((vecProj.x * vecRej.x + vecProj.y * vecRej.y + vecProj.z * vecRej.z) * 100) / 100} (Strict Orthogonality)
                  </div>
                </div>
              </div>
            </div>

            <!-- 3D Canvas & Mathematical Output -->
            <div style="display:flex;flex-direction:column;gap:1.5rem;">
              <div style="background:#ffffff;border:1px solid #e2e8f0;border-radius:8px;padding:1.5rem;box-shadow:0 1px 3px rgba(0,0,0,0.05);">
                <h3 style="margin:0 0 1rem;font-size:1.15rem;font-weight:700;">Isometric 3D Projection Canvas</h3>
                <div style="background:#0f172a;border-radius:8px;padding:12px;display:flex;justify-content:center;">
                  <canvas id="vec-canvas" width="360" height="260" style="width:100%;max-width:360px;height:260px;display:block;"></canvas>
                </div>
              </div>

              <!-- Computed Properties -->
              <div style="background:#ffffff;border:1px solid #e2e8f0;border-radius:8px;padding:1.25rem;box-shadow:0 1px 3px rgba(0,0,0,0.05);">
                <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.75rem;">
                  <div style="background:#f8fafc;padding:0.75rem;border-radius:6px;border:1px solid #e2e8f0;">
                    <span style="font-size:0.875rem;color:#64748b;">Dot Product (A · B)</span>
                    <div style="font-size:1.15rem;font-weight:800;color:#0f172a;">${dot.toFixed(2)}</div>
                  </div>
                  <div style="background:#f8fafc;padding:0.75rem;border-radius:6px;border:1px solid #e2e8f0;">
                    <span style="font-size:0.875rem;color:#64748b;">Angle (θ)</span>
                    <div style="font-size:1.15rem;font-weight:800;color:#0284c7;">${angle.toFixed(1)}°</div>
                  </div>
                  <div style="background:#f8fafc;padding:0.75rem;border-radius:6px;border:1px solid #e2e8f0;">
                    <span style="font-size:0.875rem;color:#64748b;">Cross Product (A × B)</span>
                    <div style="font-size:0.95rem;font-weight:800;color:#e11d48;">(${cross.x}, ${cross.y}, ${cross.z})</div>
                  </div>
                  <div style="background:#f8fafc;padding:0.75rem;border-radius:6px;border:1px solid #e2e8f0;">
                    <span style="font-size:0.875rem;color:#64748b;">Scalar Proj on B</span>
                    <div style="font-size:1.15rem;font-weight:800;color:#10b981;">${proj.toFixed(2)}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ` : `
          <!-- TAB 2: HIGH-YIELD JEE QUESTIONS -->
          <div style="display:flex;flex-direction:column;gap:1.5rem;">
            <div style="background:#f8fafc;border:1px solid #cbd5e1;border-radius:8px;padding:1rem;">
              <span style="font-weight:700;color:#0f172a;">IIT-JEE Main Vector Algebra Question Corpus</span>
              <span style="font-size:0.875rem;color:#64748b;margin-left:8px;">13 Audited Diagnostic Records (2019–2026) · Fault N09 Protected</span>
            </div>

            <div style="display:flex;flex-direction:column;gap:1.25rem;">
              ${JEE_QUESTIONS.map((q) => {
                const selected = ctrl.getSelectedAnswer(q.id);
                const isCommitted = Boolean(selected);
                const isCorrect = isCommitted ? ctrl.isCorrect(q.id, selected!) : false;

                return `
                  <div class="jee-card" style="background:#ffffff;border:1px solid #e2e8f0;border-radius:8px;padding:1.25rem;box-shadow:0 1px 3px rgba(0,0,0,0.05);">
                    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.75rem;flex-wrap:wrap;gap:8px;">
                      <div style="display:flex;gap:8px;align-items:center;">
                        <span style="font-size:0.875rem;font-weight:800;background:#e0f2fe;color:#0369a1;padding:2px 8px;border-radius:4px;">${escapeHtml(q.num)}</span>
                        <span style="font-size:0.875rem;color:#64748b;">${escapeHtml(q.subtabName)}</span>
                      </div>
                      <span style="font-size:0.875rem;font-family:var(--g9-font-mono, monospace);color:#94a3b8;">${escapeHtml(q.id)}</span>
                    </div>

                    <div style="margin:0 0 1rem;font-size:0.95rem;color:#1e293b;line-height:1.5;">${renderMathHtml(escapeHtml(q.prompt))}</div>

                    <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(240px, 1fr));gap:8px;margin-bottom:1rem;">
                      ${q.options.map((opt) => {
                        const optSelected = selected === opt.id;
                        let btnBg = '#f8fafc';
                        let btnBorder = '#cbd5e1';
                        let btnColor = '#0f172a';

                        if (isCommitted) {
                          if (optSelected) {
                            btnBg = isCorrect ? '#dcfce7' : '#fee2e2';
                            btnBorder = isCorrect ? '#16a34a' : '#dc2626';
                            btnColor = isCorrect ? '#15803d' : '#991b1b';
                          }
                        }

                        return `
                          <button type="button" class="jee-opt-btn" data-qid="${q.id}" data-optid="${opt.id}" style="min-height:${HIT_TARGET_MIN_PX}px;padding:8px 14px;background:${btnBg};border:1px solid ${btnBorder};color:${btnColor};border-radius:6px;text-align:left;font-size:0.9rem;cursor:pointer;font-weight:600;">
                            ${renderMathHtml(escapeHtml(opt.text))}
                          </button>
                        `;
                      }).join('')}
                    </div>

                    ${isCommitted ? `
                      <div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:6px;padding:1rem;margin-top:0.75rem;">
                        <div style="font-weight:800;color:#1e40af;margin-bottom:4px;">
                          ${isCorrect ? '✓ Correct Choice Committed' : '✗ Choice Selected · Step-by-Step Analysis Below:'}
                        </div>
                        <div style="font-size:0.875rem;color:#1e3a8a;margin-bottom:6px;"><strong>Core Invariant:</strong> ${renderMathHtml(escapeHtml(q.formula))}</div>
                        <div style="font-size:0.875rem;color:#334155;line-height:1.5;">
                          ${q.steps.map(s => `<div>• ${renderMathHtml(escapeHtml(s))}</div>`).join('')}
                        </div>
                      </div>
                    ` : ''}
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        `}
      </div>
    `;

    bindEvents();
    if (tab === 'visualizer') {
      drawCanvas();
    }
  };

  const drawCanvas = () => {
    const canvas = root.querySelector<HTMLCanvasElement>('#vec-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const ox = canvas.width / 2;
    const oy = canvas.height / 2 + 30;

    // Isometric axis projection
    const isoX = (x: number, y: number, z: number) => ox + (x - y) * 12;
    const isoY = (x: number, y: number, z: number) => oy + (x + y) * 6 - z * 14;

    // Draw axes
    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 1;

    // X axis
    ctx.beginPath();
    ctx.moveTo(ox, oy);
    ctx.lineTo(isoX(10, 0, 0), isoY(10, 0, 0));
    ctx.stroke();

    // Y axis
    ctx.beginPath();
    ctx.moveTo(ox, oy);
    ctx.lineTo(isoX(0, 10, 0), isoY(0, 10, 0));
    ctx.stroke();

    // Z axis
    ctx.beginPath();
    ctx.moveTo(ox, oy);
    ctx.lineTo(isoX(0, 0, 10), isoY(0, 0, 10));
    ctx.stroke();

    const a = ctrl.getVectorA();
    const b = ctrl.getVectorB();

    // Draw Vector A (Blue)
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(ox, oy);
    ctx.lineTo(isoX(a.x, a.y, a.z), isoY(a.x, a.y, a.z));
    ctx.stroke();

    // Draw Vector B (Green)
    ctx.strokeStyle = '#34d399';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(ox, oy);
    ctx.lineTo(isoX(b.x, b.y, b.z), isoY(b.x, b.y, b.z));
    ctx.stroke();
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

    root.querySelectorAll<HTMLButtonElement>('.tab-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const tab = btn.dataset.tab as any;
        if (tab) {
          ctrl.setActiveTab(tab);
          render();
        }
      });
    });

    // Preset buttons
    root.querySelectorAll<HTMLButtonElement>('.vec-preset-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        ctrl.setVectorA({
          x: parseFloat(btn.dataset.ax || '3'),
          y: parseFloat(btn.dataset.ay || '4'),
          z: parseFloat(btn.dataset.az || '0'),
        });
        ctrl.setVectorB({
          x: parseFloat(btn.dataset.bx || '0'),
          y: parseFloat(btn.dataset.by || '0'),
          z: parseFloat(btn.dataset.bz || '5'),
        });
        render();
      });
    });

    // Inputs
    ['va-x', 'va-y', 'va-z'].forEach((id) => {
      root.querySelector<HTMLInputElement>(`#${id}`)?.addEventListener('input', () => {
        ctrl.setVectorA({
          x: parseFloat(root.querySelector<HTMLInputElement>('#va-x')?.value || '0'),
          y: parseFloat(root.querySelector<HTMLInputElement>('#va-y')?.value || '0'),
          z: parseFloat(root.querySelector<HTMLInputElement>('#va-z')?.value || '0'),
        });
        render();
      });
    });

    ['vb-x', 'vb-y', 'vb-z'].forEach((id) => {
      root.querySelector<HTMLInputElement>(`#${id}`)?.addEventListener('input', () => {
        ctrl.setVectorB({
          x: parseFloat(root.querySelector<HTMLInputElement>('#vb-x')?.value || '0'),
          y: parseFloat(root.querySelector<HTMLInputElement>('#vb-y')?.value || '0'),
          z: parseFloat(root.querySelector<HTMLInputElement>('#vb-z')?.value || '0'),
        });
        render();
      });
    });

    // JEE Option buttons
    root.querySelectorAll<HTMLButtonElement>('.jee-opt-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const qid = btn.dataset.qid;
        const optid = btn.dataset.optid;
        if (qid && optid) {
          ctrl.selectAnswer(qid, optid);
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
