import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { searchFixture } from '../fixtures/search-wire.ts';
import { ManifestLoader, canonicalJson, computeSha256 } from '../../web/runtime/loader.ts';
import { VerifiedSearchIndex, SearchEngine } from '../../web/runtime/search.ts';
import { QueryModel } from '../../web/runtime/search-model.ts';
import { Router } from '../../web/app/router.ts';

const f = searchFixture();

const FORBIDDEN_16_KEYS = [
  'answer',
  'answers',
  'solution',
  'solutions',
  'workedsteps',
  'masterkey',
  'rubric',
  'referencesolution',
  'privatenotes',
  'secret',
  'rawclaim',
  'cruxrevealed',
  'privatemoves',
  'privatemoveref',
  'privaterubric',
  'assessmentrawclaim',
] as const;

async function setupSearch(w: any, live = async () => true) {
  const loader = new ManifestLoader([{ releaseId: w.pins.releaseId, digest: w.pins.releaseDigest }]);
  const release = await loader.loadFromData(w.release, w.pins.releaseDigest);
  return {
    pins: w.pins,
    releaseLoader: loader,
    release,
    manifestBytes: w.manifest,
    loadShard: async (m: { shard_id: string }) => w.shards[m.shard_id],
    live,
  };
}

describe('Gate G5 — Fault N09 Answer-Leakage & Strict Metadata Allowlist Defense', () => {
  it('1. VerifiedSearchIndex.open rejects any shard containing any of the 16 forbidden answer keys', async () => {
    const o = await setupSearch(f.actual);
    const m = JSON.parse(o.manifestBytes);
    const sid = m.shards[0].shard_id;
    const originalShard = JSON.parse(f.actual.shards[sid]);

    for (const forbiddenKey of FORBIDDEN_16_KEYS) {
      const tamperedShard = structuredClone(originalShard);
      // Inject forbidden answer key into item
      (tamperedShard.items[0] as any)[forbiddenKey] = 'Leaked answer text 42J';

      const tamperedShardBytes = JSON.stringify(tamperedShard);
      const tamperedSha256 = await computeSha256(canonicalJson(tamperedShard));

      // Even if manifest is rehashed with new sha256
      const tamperedManifest = structuredClone(m);
      tamperedManifest.shards[0].sha256 = tamperedSha256;
      const { manifest_digest, ...body } = tamperedManifest;
      tamperedManifest.manifest_digest = await computeSha256(canonicalJson(body));

      const tamperedOpen = {
        ...o,
        pins: { ...o.pins, manifestDigest: tamperedManifest.manifest_digest },
        manifestBytes: JSON.stringify(tamperedManifest),
        loadShard: async () => tamperedShardBytes,
      };

      await assert.rejects(
        VerifiedSearchIndex.open(tamperedOpen),
        /INVALID_SEARCH_ITEM/,
        `Expected rejection of injected key '${forbiddenKey}' under allowlist`
      );
    }
  });

  it('2. Rejects any unexpected or unreviewed metadata field outside the strict 14-key allowlist', async () => {
    const o = await setupSearch(f.actual);
    const m = JSON.parse(o.manifestBytes);
    const sid = m.shards[0].shard_id;
    const originalShard = JSON.parse(f.actual.shards[sid]);

    const arbitraryInjections = [
      { hint: 'Look at the force vector' },
      { calculation: '4 * 9.8 = 39.2' },
      { operatorNotes: 'Internal grading key' },
      { rawClaim: 'Option B is correct' },
    ];

    for (const patch of arbitraryInjections) {
      const tamperedShard = structuredClone(originalShard);
      Object.assign(tamperedShard.items[0], patch);

      const tamperedShardBytes = JSON.stringify(tamperedShard);
      const tamperedSha256 = await computeSha256(canonicalJson(tamperedShard));

      const tamperedManifest = structuredClone(m);
      tamperedManifest.shards[0].sha256 = tamperedSha256;
      const { manifest_digest, ...body } = tamperedManifest;
      tamperedManifest.manifest_digest = await computeSha256(canonicalJson(body));

      const tamperedOpen = {
        ...o,
        pins: { ...o.pins, manifestDigest: tamperedManifest.manifest_digest },
        manifestBytes: JSON.stringify(tamperedManifest),
        loadShard: async () => tamperedShardBytes,
      };

      await assert.rejects(
        VerifiedSearchIndex.open(tamperedOpen),
        /INVALID_SEARCH_ITEM/,
        `Expected rejection of arbitrary field '${Object.keys(patch)[0]}'`
      );
    }
  });

  it('3. Launch authorization drops cleanly if live() returns false during pending navigation', async () => {
    let authorized = true;
    const o = await setupSearch(f.actual, async () => authorized);
    const idx = await VerifiedSearchIndex.open(o);
    const items = await idx.snapshot();
    const target = items[0].source_ref;
    const router = new Router({ useHash: true });

    // Initial launch succeeds
    const href = await idx.launch(target, router);
    assert(href);
    assert.match(href, /question/);

    // Authority revoked mid-session: launch throws SEARCH_AUTHORITY_REQUIRED
    authorized = false;
    await assert.rejects(idx.launch(target, router), /SEARCH_AUTHORITY_REQUIRED/);

    // assertLive also throws SEARCH_AUTHORITY_REQUIRED
    await assert.rejects(idx.assertLive(), /SEARCH_AUTHORITY_REQUIRED/);
  });

  it('4. Query model excludes private stem, worked solutions, and review objects from materialized outputs', async () => {
    const o = await setupSearch(f.actual);
    const idx = await VerifiedSearchIndex.open(o);
    const model = new QueryModel(await idx.snapshot());

    const result = await idx.materialize(model.query({ text: 'energy' }), { text: 'energy' });
    assert(result.results.length > 0);

    for (const row of result.results) {
      const item = row.item as any;
      assert.equal(item.stem, undefined, 'Raw item stem must not be exported');
      assert.equal(item.solution, undefined, 'Solution must not be exported');
      assert.equal(item.review, undefined, 'Review metadata must not be exported');
      assert.equal(item.rawclaim, undefined, 'Raw claim must not be exported');
      assert.equal(item.answer, undefined, 'Answer must not be exported');
    }
  });
});
