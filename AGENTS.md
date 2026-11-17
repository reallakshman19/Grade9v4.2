# Grade9v4.2 Implementation Rules & Authority Bounds

## Owner delivery policy — 2026-11-17

The Owner explicitly authorizes engineering implementation, merging, and deployment without independent review (IR). Independent review is optional and its absence is a nonblocking `review-not-completed` label, not a prerequisite. This policy supersedes earlier R4 procedural gates for delivery; preserve the original immutable kit and record its checks honestly. Do not falsely claim academic ratification, successful tests, or a completed review. Keep restricted source, secrets, and operator-only answer artifacts out of public builds. Preserve workpack dependency order where technically necessary; fix integration defects directly.

## External Execution Kit & Authority

The target repository contains only implementation source and documentation. All controlling schemas, workpack specifications, test fixtures, and orchestration checkers reside in the **external, immutable R4 Execution Kit**:
- **Kit Directory:** `Grade9v4.2_Execution_Kit_R4` (stored outside target repository)
- **Kit Manifest SHA-256 Digest:** `6f92aac8eb1ca42e46d243443b230e2bb83dae5e99beeee872da6da47b04e3fc` (147 files)
- **Manifest Verification:** `python 07-orchestration/check.py kit`
- **Example Archetype Verification:** `python 07-orchestration/check.py examples`
- **Historical R4 Prerequisite Command (optional evidence, not a delivery gate):**
  ```bash
  python 07-orchestration/check.py prereq --repo <target-repo> --base <parent-commit> --workpack <Axx> --receipts <external-receipt-directory> --keyfile <trusted-public-key> --reviewer <authorized-reviewer-id>
  ```
  Record results if the external kit and authorized inputs are available. The current Owner policy above governs merge and deployment; missing review receipts alone are not a stop condition.

## Core Directives & Stop Rules

1. **Single Workpack Boundary:** Execute only the assigned workpack. Author only within `allowed_write_paths` specified in `plan.json`. Touch no other files.
2. **Missing inputs:** Continue executable engineering work. Report only the actual missing input and affected test; never invent source data or test results.
3. **Merge authority:** Owner-directed merges are authorized. Apply `review-not-completed` when applicable; never fabricate review receipts or mark academic content ratified without evidence.
4. **No History Overwrite or Deletion:** Preserve the bootstrap root commit and all historical commits. Do not rebase, squash, or force-push. A forward recovery merge, if Owner-authorized, must bind the exact old main and reviewed recovery candidate as its only parents, and reproduce the reviewed tree exactly. The external administrator must check the two histories separately, including the A00 correction, rather than widen A01 scope.
5. **Dual-Source Immutability:** Both migration sources remain read-only and immutable:
   - Grade9v3.5 (`8a02a8eb23ea37a7d8acb74d1bc193dd17657e5b`)
   - Grade9v4.1 (`564ad2a07fddc0fdd30d103674b3eca61235a54b`)
   Never mutate, rewrite history, or directly import unreviewed legacy trees.
6. **Custody & Secrets Isolation:** Keep private custody data, signing credentials, and test logs outside the target repository. Verify `.gitignore` for convenience, but never rely on it for security: enforce actual read-only source ACLs and separate custody/trust storage; scan committed content and every introduced history edge (including removed files); reject unexpected ignored/untracked material in the verification checkout. Protect custody and enforce trusted checks; never publish private inputs.
7. **UI implementation:** Proceed under Owner direction; A61 review status is informational, not a delivery gate.
8. **Academic status & deployment:** Keep academic status accurate. Owner authorizes deployment of safe application builds with a visible unreviewed label; do not publish protected operator data.
9. **Verification Standard:** Prior to submitting any handoff packet, verify kit integrity, reference examples, full acceptance tests, and scope checks:
   `python 07-orchestration/check.py scope --repo <target> --base <parent> --workpack <Axx>`
