# Resource Registry and Projection Contract (Workpack A60)

## 1. Overview and Authority
This contract specifies the canonical resource projection schema, field mapping from native v3.5 resource registries, audience and eligibility gates, search visibility semantics, and asset dependency closure rules for Grade9v4.2.

**Rule 13 Invariant:**
> **No academic approval inferred from software validation.**

- **Workpack ID:** A60
- **Status:** CANDIDATE
- **Academic Admission:** HOLD
- **Production Release Authority:** NONE
- **UI Implementation Freeze:** NOT_FROZEN (pending signed A61)

---

## 2. Field Mapping: Native v3.5 Registry to Canonical Projection

| Native v3.5 Field (`Shared/resources/*.json`) | Canonical Projection (`g9-resource-projection/1`) | Transformation & Invariant Rules |
| :--- | :--- | :--- |
| `id` / `resource_ref` | `resource_id` | Pattern `^[a-z0-9][a-z0-9_.:-]+$`; stable identifier preserved. |
| `revision` / `version` | `revision` | Monotonically increasing positive integer (`>= 1`). |
| `type` / `kind` | `kind` | Mapped to discriminated enum: `STRUCTURED_PRODUCT`, `QUESTION_COLLECTION`, `OPAQUE_APP`, `GUIDED_SESSION`, `CONVERTED_DOCUMENT`, `OWNER_TOOL`, `RUNTIME_HOST`, `PORTABLE_SCENE`, `NATIVE_COMPONENT`. |
| `target_audience` | `audience` | `LEARNER` for public curricular content; `OWNER`, `LAB`, `INTERNAL` for private/development tooling. |
| `title` / `display_name` | `title` | Public-safe non-empty string; solutions/answers stripped. |
| `legacy_ids` / `route_aliases` | `aliases` | Deduplicated list of historical URLs and package IDs. |
| `subject` | `subject_id` | Standard subject namespace (`physics`, `chemistry`, `mathematics`). |
| `topics` | `topic_refs` | Deduplicated array of topic references. |
| `capabilities` / `skills` | `capability_refs` | Deduplicated array of cognitive and behavioral capability IDs. |
| `roles` / `six_core_roles` | `core_roles` | Subset of `[CORE1, CORE1A, CORE1B, CORE2, CORE2A, CORE2B, EXPLORER]`. |
| `sources` / `blobs` | `origins` | Array of exact provenance locations: `snapshot_id`, 40-hex `commit`, relative `path`, 64-hex `sha256`. |
| `main` / `index_html` | `entrypoint` | Relative path or `null` for non-interactive resources. |
| `delivery_mode` | `integration` | One of `PRESERVED`, `ISOLATED_HOST`, `PORTABLE_ADAPTER`, `NATIVE_COMPONENT`. |
| `declared_capabilities` | `capabilities` | String identifiers of capability hooks. |
| `governance` | `governance` | Strict 5-tuple: `rights` (HOLD/CLEARED), `academic` (HOLD/ADMITTED/NOT_APPLICABLE_REVIEWED), `technical` (UNTESTED/PASS/FAIL), `release` (HOLD/ELIGIBLE), and `receipt_refs`. |
| `search_indexed` | `search_visibility` | `LEARNER` or `EXCLUDED`. Only learner-safe public metadata is indexed. |

---

## 3. Role and Eligibility Gates

### 3.1 Learner Routing Eligibility
A resource is eligible for learner routing and display in the learner UI if and only if:
1. `audience == "LEARNER"`
2. `governance.rights == "CLEARED"`
3. `governance.academic == "ADMITTED"`
4. `governance.technical == "PASS"`
5. `governance.release == "ELIGIBLE"`

Any resource failing any of these conditions fails closed to non-routable (`HOLD`).

### 3.2 Owner and Lab Segregation
- Resources tagged `audience` in `["OWNER", "LAB", "INTERNAL"]` are strictly excluded from learner routing, navigation rails, and search indexes.
- No protected internal routes, developer debug harnesses, or unreleased draft questions may leak to learner-facing endpoints.

---

## 4. Search Semantics and Public Filtering
1. **Search Visibility:** Only resources with `search_visibility == "LEARNER"` are emitted into the search catalog.
2. **Metadata Sanitization:** Hidden question answers, step-by-step master keys, evaluation rubrics, and internal move annotations are stripped prior to search indexing.
3. **Route Integrity:** Every indexed record must resolve to an exact, verified registered route ID.

---

## 5. Dependency Closure
- All assets (CSS stylesheets, JavaScript modules, WebAssembly binaries, SVG graphics, JSON scenes) must reside within the controlled repository tree.
- Zero external runtime network fetches (`https://...`, CDNs, remote APIs) are permitted.
