# W9-INT-02 — shared authority composition

Engineering-only continuation of W9-INT-01, PR #87. Status remains
INCOMPLETE / review-not-completed / academic HOLD / production NONE.

The previous exact head 6087cad3a7bb6c9c850323a893729897352f8d8f passed
runtime stack audit 44341604789 (263 Node tests, strict build, self-contained
Python, Chromium/IndexedDB and diagnostic smoke). External custody-dependent
tests were excluded by that workflow; this is not R4 or independent acceptance.

This batch adds a pinned catalog composition seam for the corrected A49/A48/A18
runtime. It binds one exact learner/release/role/journey, exact origin and boundary
sessions, role-specific check/anchor evidence, context and capability/asset grants.
The catalog is cloned before hashing and checked against a separately provisioned
digest. The same authority supplies A49 context and permissions and the A67/A68
review providers. Live principal/catalog authorization and durable session bindings
are checked on each use; transfer also requires an A18 qualified committed anchor.
Explicit transfer scaffold grants cannot be widened by a separate A49 provider.

The synthetic tests exercise positive presentation and orientation, correct/incorrect
typed checks, actual durable prediction, first attempt, reconstruction, repair,
boundary commitment and source return, exact grants, revocation and stale evidence.

Security boundary: the composition API is for a trusted host. A caller who controls
the pin, live principal service, storage, verifier or asset source is not authenticated
by this module. The actual authenticated release service, immutable approval and
teaching evidence, native semantic/linguistic mapping, route/page integration, exact
print receipt and external R4 kit are still missing. No actual production catalog or
learner route is installed. No academic claims are inferred from synthetic fixtures.
A49's transaction is local and cannot provide atomic remote revocation; a real
service must enforce authorization at its own protected read/write boundary.
The batch deliberately does not change main, historical PRs, original controls,
A49 public API, existing fixtures or workflow definitions.
