# Architectural Decision Record: Native Shared Contract Reconciliation

- **Workpack ID:** A05
- **Decision Reference:** ADR-A05-01
- **Status:** PROPOSED (Academic Admission: HOLD)
- **Governing Specification:** Grade9v4.2 R4 Execution Kit (`01-architecture/master-specification.md`, `01-architecture/six-core-convergence.md`, `01-architecture/native-contract-mapping.json`)
- **Dual-Source Inputs:**
  - Grade9v3.5 (`8a02a8eb23ea37a7d8acb74d1bc193dd17657e5b`)
  - Grade9v4.1 (`564ad2a07fddc0fdd30d103674b3eca61235a54b`)

---

## 1. Context and Problem Statement

The Grade9 platform convergence requires reconciling native contract artifacts across two historical codebases without creating an unprincipled monolithic Universal Question Container (UQC) or prioritizing one snapshot purely by version number. 

Specific architectural requirements:
1. Reconcile verified native roles, contracts, schemas, and lifecycle policies between v3.5 and v4.1 without inventing fields or transforming semantics.
2. Strictly preserve the six Core roles (`CORE1`, `CORE1A`, `CORE1B`, `CORE2`, `CORE2A`, `CORE2B`, and `EXPLORER`).
3. Preserve the 7 Quality Gates `B1–B7`.
4. Preserve the 4 Construction Parameters `X/Y/Z/W`.
5. Maintain strict read-only source custody; do not promote candidate proposals to academic authority without detached cryptographic sign-off.

---

## 2. Decision and Invariants

### 2.1 The Six Canonical Core Roles
No role may be collapsed, synthesized, or eliminated:
- **`CORE1` (BP-CORE1-ORIENTATION@1.1.0):** Canonical subject truth. Compact orientation, conventions, and transitions.
- **`CORE1A` (BP-CORE1A-CONSTRUCTION@1.8.0):** Continuous teaching construction across progressive microtopic anchors (A1–A9).
- **`CORE1B` (BP-CORE1B-RECONSTRUCTION@1.1.0):** Six-stage conceptual reconstruction (`PREDICT` -> `ATTEMPT` -> `RECONSTRUCT` -> `DIAGNOSE` -> `REPAIR` -> `BOUNDARY_TEST`).
- **`CORE2` (BP-CORE2-SOURCE-QUESTION@1.11.0):** Authorized source custody of exact competition/examination questions, subparts, options, and figures.
- **`CORE2A` (BP-CORE2A-SUPPORTED-APPLICATION@1.1.0):** Familiar application crux and complete guided reasoning routes.
- **`CORE2B` (BP-CORE2B-TRANSFER@1.1.0):** Transfer application with changed demand and protected learner `DECIDE` moves.
- **`EXPLORER` (BP-EXPLORER-GCDR@1.0.0):** Guided Conceptual Dynamic Reasoning (10-stage simulation cycle).

### 2.2 Quality Gates (B1–B7)
1. **B1:** Source attribution, immutable read-only snapshot custody, rights verification.
2. **B2:** Scientific truth, mathematical warrants, limiting case validations.
3. **B3:** QRT cognitive demand adjudication ([0..2] 5-factor bounds, crux move reference).
4. **B4:** Educational progression, scaffolding fidelity, misconception remediation.
5. **B5:** Presentation geometry, W3C SVG font compliance (>=14px), 6 responsive CSS viewports.
6. **B6:** Deterministic offline runtime execution, attempt history isolation.
7. **B7:** Detached cryptographic Ed25519 acceptance verification.

### 2.3 Learning Construction Parameters (X/Y/Z/W)
- **X:** Phenomenological Anchor / Concrete Observation.
- **Y:** Physical Mechanism / Inferential Jump.
- **Z:** Formal Law / Mathematical Warrant.
- **W:** Model Boundary / Counterexample & Synthesis Check.

---

## 3. Reconciliation Matrix (17 Projections)

| # | Projection | Legacy v4.1 Path | Native v3.5 Reference | Reconciled Target Binding | Status |
|---|---|---|---|---|---|
| 1 | `SOURCE` | `schemas/v1/source.schema.json` | `Shared/library/source_custody.py` | `src/grade9core/legacy/source_custody.py` | `HOLD` |
| 2 | `WARRANT` | `schemas/v1/warrant.schema.json` | `Shared/library/package.schema.json` | `src/grade9core/legacy/package.schema.json` | `HOLD` |
| 3 | `CONSTRUCTION` | `schemas/v1/construction.schema.json` | `Shared/roles/CORE1A.md` | `src/grade9core/academic/core1a.py` | `HOLD` |
| 4 | `LESSON` | `schemas/v1/lesson.schema.json` | `Shared/roles/CORE1A.md` | `src/grade9core/academic/lesson.py` | `HOLD` |
| 5 | `ASSESSMENT` | `schemas/v1/assessment.schema.json` | `Shared/roles/CORE1B.md` | `src/grade9core/academic/core1b.py` | `HOLD` |
| 6 | `APPROVAL` | `schemas/v1/approval.schema.json` | `Shared/tools/review_authority.py` | `08-review/review_authority.py` | `HOLD` |
| 7 | `QUESTION` | `nsejs/core2/question-map.v1.json` | `Shared/roles/CORE2.md` | `src/grade9core/academic/core2.py` | `HOLD` |
| 8 | `QRT` | `src/grade9qa/qrt_binding.py` | `Shared/vocabularies/cognitive-demand.v1.json` | `src/grade9core/academic/qrt.py` | `HOLD` |
| 9 | `RELEASE` | `docs/agent-entry/production-control-r3/release.py` | `Shared/tools/release_authority.py` | `00-authority/release_authority.py` | `HOLD` |
| 10 | `SUBJECT` | `schemas/v2/subject-intake.schema.json` | `docs/product-scope.md` | `docs/product-scope.md` | `HOLD` |
| 11 | `CORE1` | `Shared/roles/CORE1.md` | `Shared/roles/CORE1.md` | `src/grade9core/roles/CORE1.md` | `HOLD` |
| 12 | `CORE2A` | `Shared/roles/CORE2A.md` | `Shared/roles/CORE2A.md` | `src/grade9core/roles/CORE2A.md` | `HOLD` |
| 13 | `CORE2B` | `Shared/roles/CORE2B.md` | `Shared/roles/CORE2B.md` | `src/grade9core/roles/CORE2B.md` | `HOLD` |
| 14 | `RESOURCE` | `Shared/resources/resource.schema.json` | `Shared/resources/resource.schema.json` | `schemas/resource.schema.json` | `HOLD` |
| 15 | `PORTABLE_SCENE` | `public/portable-workbench/portable-host.mjs` | `public/portable-workbench/portable-host.mjs` | `custody/workbench/portable-host.mjs` | `HOLD` |
| 16 | `GCDR` | `Shared/web/interactive-page-blueprints.v1.json` | `Shared/web/interactive-page-blueprints.v1.json` | `docs/architecture/blueprints.json` | `HOLD` |
| 17 | `WEB_BLUEPRINT` | `Shared/roles/LEARNER-PRODUCT-TEMPLATES.md` | `Shared/roles/LEARNER-PRODUCT-TEMPLATES.md` | `docs/architecture/templates.md` | `HOLD` |

---

## 4. Consequences and Governance Boundaries

1. **Academic Admission remains HOLD:** Neither candidate snapshot confers automated academic admission. Independent academic authority sign-off is required before any subject content is elevated to canonical truth.
2. **UI Implementation remains LOCKED:** Workpack A61 (Legacy UI Freeze) must receive independent signed acceptance before presentation templates or client renderers can be implemented.
3. **Lossless Conservation:** All unmapped or custom legacy fields are preserved in custody JSON pointer ledgers (`target: private_raw_record`).
