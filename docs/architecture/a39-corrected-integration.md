# A39 forward migration conservation reconciliation
Original #97 2593a6fea7f4cfbbed70a8e104d86f6806237ee7 is unchanged.
Base A38 #113 9c9ec70675c143f6992aeb69ff845cd6b9f3ed07, CI 44471057513 (588 JavaScript tests; two high npm advisories).
The original 4592 leaf claim confuses distinct Git blobs with JSON leaves and
the eight zeros are not evidence. The corrected verifier reuses A02/A03
inventory/restore and FieldLedgerEngine; exact occurrence identity and digests,
duplicate rejection, strict private/target leaf equality, no caller-claimed
approved disposition. No bare counter summary can establish compatibility.
CI checks both actual pinned public Git commit/tree sets, hashes every tracked
blob, restores to fresh private runner-temp backup and independently replays
into a second fresh root; verifies exact file modes, kinds, sizes and SHA256,
including symlink bytes without following. Both roots are deleted on exit,
no files/paths/contents uploaded. Three actual source JSON documents are
audited against the restored private copies; no full target-migration claim.
All 1493 supplied search/registry occurrences are accounted separately from
approved mappings. Full eight counters remain null (NOT_RUN), rather than zero.
Existing self-contained migration tests now run; external R4 tests excluded
explicitly. A55/A73, real approved route/application/state mapping, semantic
behavior parity, permanent private custody and owner-local files remain held.
Dependency audit now exposes actual advisory identities and fix metadata.
No public learner release or deployment. Academic HOLD, review-not-completed.
