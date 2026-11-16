# ADR-A10-01 — Programme, Edition, Response and Assessment Platform Contracts

**Status:** PROPOSED / HOLD: ACADEMIC_ADMISSION  
**Release Authority:** NONE  
**Controlling Workpack:** A10 (`05-workpacks/plan.json`, `05-workpacks/A10.md`)  
**Prerequisites:** A05 (`contracts/decisions/native-mapping.md`), A08 (`schemas/platform/object-envelope.schema.json`)

---

## 1. Context and Problem Statement

Grade9 v4.2 targets Physics, Chemistry, and Mathematics (with Biology pending explicit Owner authority). Previous prototypes lacked unified, machine-checkable platform schemas governing:
1. Academic programme and examination edition definitions.
2. Discriminated response representations across all subject disciplines.
3. Strict assessment evaluation boundaries isolating grading logic from presentation markup.

In conformance with the R4 Execution Kit and `AGENTS.md`, engineering projections must be ratified against native mappings while enforcing fail-closed boundaries:
- Automatic scoring must never be fabricated for complex cognitive tasks.
- Cross-subject references and unauthenticated question archetypes must fail closed.
- Software validation never certifies scientific authenticity or academic quality.

---

## 2. Decision Record

### 2.1 Nine Canonical Exam Archetypes

The platform defines and validates nine canonical exam archetypes spanning the three primary disciplines across educational assessment stages E1, E2, and E3:

| Archetype ID | Subject | Stage | Capabilities Exercised | Scoring Profile |
| :--- | :--- | :--- | :--- | :--- |
| `PHY-E1` | PHYSICS | E1 | `SINGLE_CHOICE`, `MULTIPLE_CHOICE` | Automatic (`SCORED`) |
| `PHY-E2` | PHYSICS | E2 | `MULTIPART`, `NUMERIC_QUANTITY`, `CONSTRUCTED_RESPONSE` | Mixed / `REVIEW_PENDING` |
| `PHY-E3` | PHYSICS | E3 | `DATA_TABLE`, `GRAPH`, `EXPERIMENT_ANALYSIS`, `NUMERIC_QUANTITY` | Structured / `REVIEW_PENDING` |
| `CHM-E1` | CHEMISTRY | E1 | `SINGLE_CHOICE`, `INTEGER` | Automatic (`SCORED`) |
| `CHM-E2` | CHEMISTRY | E2 | `CHEMICAL_STRUCTURE`, `REACTION_MECHANISM`, `NUMERIC_QUANTITY` | Domain / `REVIEW_PENDING` |
| `CHM-E3` | CHEMISTRY | E3 | `DATA_TABLE`, `GRAPH`, `EXPERIMENT_ANALYSIS` | Experimental / `REVIEW_PENDING` |
| `MTH-E1` | MATHEMATICS | E1 | `SINGLE_CHOICE`, `INTEGER` | Automatic (`SCORED`) |
| `MTH-E2` | MATHEMATICS | E2 | `SYMBOLIC_EXPRESSION`, `NUMERIC_QUANTITY` | Exact / `REVIEW_PENDING` |
| `MTH-E3` | MATHEMATICS | E3 | `MATHEMATICAL_PROOF`, `CONSTRUCTED_RESPONSE` | Deductive / `REVIEW_PENDING` |

### 2.2 Thirteen Discriminated Response Kinds

Every learner attempt produces an immutable response record validated by `schemas/platform/response.schema.json`. Thirteen distinct response kinds are supported:

1. `SINGLE_CHOICE`: Single option identifier (non-empty string).
2. `MULTIPLE_CHOICE`: Array of unique selected option identifiers (minimum 1, no duplicate entries).
3. `INTEGER`: Exact integer string conforming to regex `^-?[0-9]+$` (rejects floats, exponents, NaN).
4. `NUMERIC_QUANTITY`: Object with `decimal` string (`^-?[0-9]+(\.[0-9]+)?$`) and `unit` string (e.g., `{"decimal": "2.5", "unit": "J"}`). Rejects non-finite values (`NaN`, `Infinity`).
5. `SYMBOLIC_EXPRESSION`: Exact mathematical/algebraic expression string (non-empty).
6. `CONSTRUCTED_RESPONSE`: Free-form discursive response string (non-empty).
7. `MATHEMATICAL_PROOF`: Step-by-step deductive proof string (non-empty).
8. `CHEMICAL_STRUCTURE`: Encoded molecular structure object (`format`, `data`).
9. `REACTION_MECHANISM`: Array of chemical reaction step identifiers/equations.
10. `DATA_TABLE`: 2D array of rows containing tabular values or nulls.
11. `GRAPH`: Object containing coordinate pair arrays (`points`: `[[x1, y1], [x2, y2], ...]`).
12. `EXPERIMENT_ANALYSIS`: Object containing empirical `observations` array and `conclusion` string.
13. `MULTIPART`: Recursive dictionary of part keys mapping to discriminated child responses (`minProperties: 1`).

### 2.3 Assessment Engine and Pure Evaluation Boundaries

1. **Pure Function Separation:** The assessment evaluation engine (`AssessmentEngine.evaluate`) is a pure logical function taking `(response, assessment_spec, policy)`. It has zero access to UI DOM, browser cookies, local storage, or network handles.
2. **Deterministic Automatic Scoring:** Strictly restricted to closed forms (`SINGLE_CHOICE`, `MULTIPLE_CHOICE`, `INTEGER`, `NUMERIC_QUANTITY`). Any other response kind automatically evaluates to status `REVIEW_PENDING` with `points: null`.
3. **Multipart Evaluation:** A multipart assessment aggregates part grades; if any non-automatic part exists, the top-level status remains `REVIEW_PENDING` until human/independent rubric review is recorded.
4. **Dropped Question Policy:** Assessments explicitly declare `dropped_policy`: `NOT_DROPPED`, `FULL_CREDIT`, or `REMOVED_FROM_TOTAL`.

### 2.4 Programme and Edition Contracts

1. **Programme Schema (`schemas/platform/programme.schema.json`):**
   - Validates institutional and curriculum programme envelopes (e.g., `DEMO-PHYSICS`, `NSEJS-PHYSICS`).
   - Restricts subjects to authorized set `['PHYSICS', 'CHEMISTRY', 'MATHEMATICS', 'BIOLOGY']` and stages to `['E1', 'E2', 'E3', 'FOUNDATION']`.
   - Enforces default assessment policies and immutable version revisions.
2. **Edition Schema (`schemas/platform/edition.schema.json`):**
   - Binds examination papers/cycles to exact task references (`exact-ref` format: `type`, `id`, `revision`, `sha256`).
   - Ensures paper codes, total point ceilings, duration limits, and pass marks are schema-enforced.

---

## 3. Invariants and Guardrails

1. **Fail-Closed on Unrecognized Types:** Any response with an unknown `kind` or unexpected property fails schema validation immediately.
2. **No Academic Approval Inferred:** Software validation of these schemas or archetypes does NOT certify scientific validity, examination authenticity, or student release readiness.
3. **UI Freeze Gate:** No student-facing UI implementation is permitted before signed acceptance of Workpack A61.

---

> [!IMPORTANT]
> **Mandatory AGENTS.md Rule 13 Invariant:**  
> *“No academic approval inferred from software validation.”*
