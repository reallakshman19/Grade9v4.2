# DEC-A59 Fail-Closed Rejection Invariants
## Automated Rejection Catalog & Remediation Runbook for Declarative Portable Workbenches

---

## 1. Overview

Under **Workpack A59 / A64 Architectural Decision Record (ADR)**, the host runtime operates as a strict **fail-closed firewall**. Any workbench package that violates semantic typing, security boundaries, or provenance bindings is instantly rejected without executing or rendering corrupted state.

---

## 2. The 15 Fail-Closed Error Invariants

| Code | Trigger Condition | Severity | Automated Remediation |
|---|---|---|---|
| `PORTABLE_EXECUTABLE_FIELD_FORBIDDEN` | Any field key or string value matches forbidden executable terms (`script`, `javascript`, `eval`, `function`, `handler`, `onclick`, `onload`, `onerror`). | **FAIL_CLOSED** | Strip all script tags and executable handlers. Encode behavior strictly as declarative state transformations in the adapter rules. |
| `PORTABLE_PIXEL_COORDINATE_FORBIDDEN` | Scene projection placement defines pixel coordinates (`x`, `y`, `left`, `top`, `width`, `height`). | **FAIL_CLOSED** | Replace pixel coordinates with semantic placement: `{ grid: "<id>", row: "<row>", column: "<col>" }`. |
| `PORTABLE_SCHEMA_MISMATCH` | `schemaVersion` is not exactly `'portable-workbench-package'`. | **FAIL_CLOSED** | Set `schemaVersion: "portable-workbench-package"`. |
| `PORTABLE_PACKAGEVERSION_MISMATCH` | `packageVersion` is not exactly `'1.0.0'`. | **FAIL_CLOSED** | Rebind package version to the canonical seam `'1.0.0'`. |
| `PORTABLE_COMPONENTAPIVERSION_MISMATCH` | `componentApiVersion` is not exactly `'0.1.0'`. | **FAIL_CLOSED** | Rebind component API version to host seam `'0.1.0'`. |
| `PORTABLE_TRANSFORMATIONIRVERSION_MISMATCH` | `transformationIrVersion` is not exactly `'0.1.0'`. | **FAIL_CLOSED** | Rebind transformation IR version to `'0.1.0'`. |
| `PORTABLE_ADAPTERAPIVERSION_MISMATCH` | `adapterApiVersion` is not exactly `'0.2.0'`. | **FAIL_CLOSED** | Rebind adapter API version to `'0.2.0'`. |
| `PORTABLE_SCENEPACKAGEVERSION_MISMATCH` | `scenePackageVersion` is not exactly `'1.0.0'`. | **FAIL_CLOSED** | Rebind scene package version to `'1.0.0'`. |
| `PORTABLE_DECLARATIVE_ADAPTER_MISMATCH` | Adapter ID is not exactly `'declarative-transfer-v1'`. | **FAIL_CLOSED** | Set `adapter.id: "declarative-transfer-v1"`. |
| `PORTABLE_CANONICAL_RESOURCE_REF_REQUIRED` | Authority is `CANONICAL_COMPILED_RESOURCE` but top-level `resourceRef` is missing. | **FAIL_CLOSED** | Provide valid registered `resourceRef` or reclassify provenance authority to `NON_CANONICAL_COMPILED_PROOF`. |
| `PORTABLE_CANONICAL_RESOURCE_REF_MISMATCH` | Package `resourceRef` does not match `provenance.resourceRef`. | **FAIL_CLOSED** | Harmonize top-level and provenance `resourceRef` strings. |
| `PORTABLE_CANONICAL_REPRESENTATION_REF_REQUIRED` | Authority is `CANONICAL_COMPILED_RESOURCE` but `provenance.representationRef` is missing. | **FAIL_CLOSED** | Declare explicit representation reference in provenance. |
| `PORTABLE_CANONICAL_REPRESENTATION_REF_MISMATCH` | `provenance.representationRef` is not listed in `representationRefs` array. | **FAIL_CLOSED** | Add the representation reference into the top-level `representationRefs` array. |
| `PORTABLE_CANONICAL_SOURCE_REFS_REQUIRED` | Authority is `CANONICAL_COMPILED_RESOURCE` but `provenance.sourceRefs` is empty. | **FAIL_CLOSED** | Populate source references with valid authenticated custody identifiers. |
| `PORTABLE_CANONICAL_SOURCE_REFS_MISMATCH` | `provenance.sourceRefs` does not match top-level `sourceRefs`. | **FAIL_CLOSED** | Ensure both source reference arrays contain identical custody identifiers. |

---

## 3. Structural Integrity Rules

In addition to the 15 security and provenance rules, packages must maintain 100% referential integrity:

1. **Grid Referential Integrity**: Every projection must name a `grid` present in `scene.grids`.
2. **Row & Column Integrity**: The `row` and `column` declared in a projection's placement must belong to that grid's `rows` and `columns` arrays.
3. **Entity Referential Integrity**: Every projection must reference an `entityRef` registered in `scene.entities`.
4. **Transformation Integrity**:
   - `sourceEntityRef` must exist in `scene.entities`.
   - `targetRef` must exist in `scene.targets`.
   - `transformationRef` must exist in `scene.canonicalTransformations`.
