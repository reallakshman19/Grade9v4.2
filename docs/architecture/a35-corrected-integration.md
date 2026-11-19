# A35 corrected universal diagnostic search

Engineering candidate / review-not-completed / academic HOLD / production NONE.
Forward reconciliation of #88 (5e0ca9628b38342df08cbe02a26bf581f627aaa7)
on A34/A71 #94 exact head 868d5fb8f9a7fbac7e77068d6532ad2115f5d6de,
run 44456207091 passed (274 runtime, 267 browser, 19 smoke, bounded Python,
1493 exact source occurrences). Original historical branches are unchanged.

- Browser independently recomputes the canonical SHA256 manifest and shard
  digests using separately provisioned release/catalog/manifest pins, checks
  exact item refs through ManifestLoader, strict row/facet shapes, counts and
  route identity. Duplicate decoded keys, stale, mixed, missing and corrupt
  shards reject atomically; no partial cached result is displayed.
- Dedicated Web Worker indexes and queries verified records only. Query model
  follows A34 integer boosts, NFKC/casefold, AND/OR facets and stable ID ties.
  Explicit typo/prefix suggestions never auto-navigate. Python-produced
  Unicode 15.1 casefold exception vectors and real compiler bytes test parity.
  Platform Unicode normalization may differ for characters outside tested
  versions; no universal multilingual equivalence claim.
- Host-mounted responsive diagnostic UI uses textContent, 48px controls,
  formula toolbar, explicit submit, facets, pagination, stale/reload state.
  Revoked/withdrawn/stale routes fail closed. Launch resolves the exact
  QUESTION ref via A15; actual destination mounting remains host responsibility.
- CI uses actual A14/A34 synthetic bytes plus a generated 1493-record stress
  fixture with no legacy bytes. Worker p95 is measured only on that synthetic
  runner, not production corpus or physical tablet. No public entrypoint,
  production search, academic route or protected content admitted.

Trusted host must provision authenticated live scope, exact pins and transport.
No caller-supplied hash is authority; no real reviewed metadata catalog,
semantic leakage review, external R4 kit or native role route mounting is
provided. A36/A37 must use the corrected contracts, not the original A35 API.
