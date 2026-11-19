# A34 + A71 corrected search integration

**Status: engineering candidate / review-not-completed / academic HOLD / production NONE.**

Forward reconciliation of A34 #85 (da5895d401deae2e42d3be6fea69ffaf6904abb2)
and A71 #86 (4a65055fef418bb711c2781d744b8a0bad178396) on A53
7eb3c5a6b9d745e0c97a16f4e8dfa6fe218bb570, verified by run 44455452536
(274 runtime, 267 browser, 19 smoke; bounded Python). Original branch history
and PRs are unchanged. Neither original implementation nor its test claims
are inherited.

A34 requires separate trusted release and reviewed metadata catalog pins,
exact A14 public QUESTION refs, explicit reviewed entries, and rejects
unregistered or stale refs, duplicate IDs, untrusted catalog modifications,
unknown withdrawal IDs and invented route fields. A14's manifest remains
unchanged and public learner release remains false. FRESH_TASK and other
role/resource routes stay held until exact route contracts are provisioned.
The new 1.1 wire schema intentionally supersedes incompatible 1.0 drafts.
No generic public learner index or source/candidate content is emitted.
Search shards are exact payload envelopes, with manifest and release/catalog
pins; query engine rebuilds from the trusted inputs. Raw source text is not
indexed; a trusted review must establish the safety of reviewed text/terms.
Key scanning is defense in depth, not proof of semantic nonleakage.

A71 reconciles pinned bytes of the two immutable public sources using the
existing A03 RecordInventoryEngine (Git blob, SHA256, size, exact pointer).
64 registry, 417 v3.5 learner search, and 1012 v4.1 search entries are the
expected counts, checked on the actual pinned source checkout in CI.
Source records are held or quarantined; lookup keys are population plus
the exact original locator, including query and fragment. Unknown and
ambiguous locators never redirect. No raw source records, titles, URLs,
or operator identifiers are exported by the aggregate summary. An active
diagnostic route needs a separately pinned exact occurrence/record digest
mapping, approval reference and an A34 verified target. Withdrawal changes
require a new catalog/index pin; a legacy ID or caller allow flag is not authority.

External R4 discovered inventory (original 71 entries) is NOT_RUN; the A09
proposed map is not a substitute. No actual reviewed production catalog,
semantic cross-source equivalence, native role route integration, public
learner search, external R4 custody, or academic admission is claimed.
New tests are synthetic engineering controls; a read-only sparse CI
checkout checks the actual public source bytes without committing or
uploading them. A35 must adopt the new wire format and trusted host
authorization, rather than directly merge the incompatible 1.0 runtime.
