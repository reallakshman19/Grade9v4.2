# Grade9v4.2 Implementation Rules & Authority Bounds

You have no architectural, academic, signing, or publication authority. Execute exactly one workpack ID at a time, strictly following the 75-workpack dependency order in `05-workpacks/plan.json` (NOT numeric order), with exact parent base and independent Dispatcher/Owner authorization.

## External Execution Kit & Authority

The target repository contains only implementation source and documentation. All controlling schemas, workpack specifications, test fixtures, and orchestration checkers reside in the **external, immutable R4 Execution Kit**:
- **Kit Directory:** `Grade9v4.2_Execution_Kit_R4` (stored outside target repository)
- **Kit Manifest SHA-256 Digest:** `6f92aac8eb1ca42e46d243443b230e2bb83dae5e99beeee872da6da47b04e3fc` (147 files)
- **Manifest Verification:** `python 07-orchestration/check.py kit`
- **Example Archetype Verification:** `python 07-orchestration/check.py examples`
- **Mandatory Prerequisite Command:**
  ```bash
  python 07-orchestration/check.py prereq --repo <target-repo> --base <parent-commit> --workpack <Axx> --receipts <external-receipt-directory> --keyfile <trusted-public-key> --reviewer <authorized-reviewer-id>
  ```
  No ordinary workpack execution may proceed without a passing prerequisite check and an independently signed acceptance receipt for each prerequisite. Run the unchanged R4 checker **and** the independently reviewed administrator-side guard from a protected runner with fixed, externally trusted inputs. Do not obtain policy, key, reviewer identity, accepted base, test evidence, or required-check executable from candidate-controlled files. A technical PASS is not authorization.
  The Owner's 2026-11-16 recovery override permits preparing A00/A01 remediation candidates locally before the A00 receipt, solely for review. It does not confer acceptance, integration, signing, subsequent workpack or release authority. Do not treat that exception as a general precedent.

## Core Directives & Stop Rules

1. **Single Workpack Boundary:** Execute only the assigned workpack. Author only within `allowed_write_paths` specified in `plan.json`. Touch no other files.
2. **Missing Input Returns BLOCKED:** If any required authority reference, prerequisite receipt, external evidence, or schema definition is missing, return `status: BLOCKED` with the smallest specific decision needed. Do not invent sources, mappings, answers, or mock approvals.
3. **Never Self-Accept & Never Self-Merge:**
   - Author reports and handoff packets must specify `READY_FOR_REVIEW` or `BLOCKED`. Never mark self as `ACCEPTED`.
   - Candidate pull requests must remain OPEN for independent reviewer inspection and acceptance. The author is strictly prohibited from merging pull requests.
   - Independent acceptance receipts require detached Ed25519 signatures from the external trust roster.
4. **No History Overwrite or Deletion:** Preserve the bootstrap root commit and all historical commits. Do not rebase, squash, or force-push. A forward recovery merge, if independently authorized, must bind the exact old main and reviewed recovery candidate as its only parents, and reproduce the reviewed tree exactly. The external administrator must check the two histories separately, including the A00 correction, rather than widen A01 scope.
5. **Dual-Source Immutability:** Both migration sources remain read-only and immutable:
   - Grade9v3.5 (`8a02a8eb23ea37a7d8acb74d1bc193dd17657e5b`)
   - Grade9v4.1 (`564ad2a07fddc0fdd30d103674b3eca61235a54b`)
   Never mutate, rewrite history, or directly import unreviewed legacy trees.
6. **Custody & Secrets Isolation:** Keep private custody data, signing credentials, and test logs outside the target repository. Verify `.gitignore` for convenience, but never rely on it for security: enforce actual read-only source ACLs and separate custody/trust storage; scan committed content and every introduced history edge (including removed files); reject unexpected ignored/untracked material in the verification checkout. The independent administrator must attest to custody and enforce trusted checks outside author control.
7. **No UI Implementation Before A61:** No learner-facing UI, presentation templates, or client renderers may be authored before independent signed acceptance of Workpack `A61` (Legacy UI Freeze).
8. **Academic & Production Admission:** Default is `HOLD`. Production deployment and GitHub Pages remain disabled until separately authorized by the Owner.
9. **Verification Standard:** Prior to submitting any handoff packet, verify kit integrity, reference examples, full acceptance tests, and scope checks:
   `python 07-orchestration/check.py scope --repo <target> --base <parent> --workpack <Axx>`
