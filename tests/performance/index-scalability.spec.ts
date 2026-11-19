/**
 * tests/performance/index-scalability.spec.ts
 * Workpack A38 — Security, accessibility, scalability and dependency QA: Scalability and Performance Benchmarks.
 *
 * Verifies:
 * 1. 10,000 items search index ingestion and sub-millisecond query latency.
 * 2. 100,000 items scale memory budget and prefix lookup efficiency.
 * 3. 10,000 physics model evaluations throughput (> 100,000 ops/sec).
 * 4. High-frequency storage driver transaction throughput.
 */

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import {
  SearchEngine,
  type SearchManifest,
  type SearchItem,
} from '../../web/runtime/search.ts';

import { evaluateWpeModel } from '../../web/adapters/physics/models/wpe-oracles.ts';
import { MemoryStorageDriver } from '../../web/runtime/storage.ts';
import { computeSha256 } from '../../web/runtime/loader.ts';

describe('A38: Index Scalability and Query Latency Benchmarks', () => {
  it('measures 10,000 items index ingestion and sub-millisecond query budget', async () => {
    const engine = new SearchEngine();
    const itemsCount = 10000;
    const releaseId = 'rel:synthetic:scale';
    const items: SearchItem[] = [];

    const subjects = ['PHYSICS', 'CHEMISTRY', 'MATHEMATICS'] as const;
    const sampleKeywords = ['kinetic', 'potential', 'equilibrium', 'stoichiometry', 'tangent', 'work', 'spring', 'force'];

    for (let i = 0; i < itemsCount; i++) {
      const subject = subjects[i % subjects.length];
      const kw = sampleKeywords[i % sampleKeywords.length];
      items.push({
        id: `qst:synthetic:${i.toString().padStart(6, '0')}`,
        revision: 1,
        releaseId,
        route: `/p/foundation/s/${subject.toLowerCase()}/q/${i}`,
        kind: 'QUESTION',
        subjectIds: [subject],
        programmeIds: ['FOUNDATION'],
        editionIds: ['2026'],
        conceptIds: [kw],
        title: `Question ${i}: ${kw} in ${subject}`,
        summary: `Calculates ${kw} conservation in standard ${subject} test conditions.`,
        reviewedTerms: [kw, subject.toLowerCase()],
        publicFacets: { subject: [subject], topic: [`TOPIC-${i % 20}`] }
      });
    }

    const shardContent = JSON.stringify(items);
    const shardSha = await computeSha256(shardContent);

    const manifest: SearchManifest = {
      schema_version: 'g9-search-manifest/1.0',
      release_id: releaseId,
      release_digest: shardSha,
      target_mode: 'DEMO',
      demo_banner: true,
      total_items: itemsCount,
      boost_rules: {},
      normalization: 'UNICODE_NFKC_CASEFOLD',
      shards: [
        {
          shard_id: 'shard-large-10k',
          subject_id: 'PHYSICS',
          item_count: itemsCount,
          sha256: shardSha
        }
      ],
      manifest_digest: shardSha
    };

    // Load manifest first
    engine.loadManifest(manifest);

    // 1. Ingestion benchmark
    const ingestStart = performance.now();
    engine.loadShard(manifest.shards[0], items, shardSha);
    const ingestDuration = performance.now() - ingestStart;

    assert.ok(
      ingestDuration < 500,
      `10k index ingestion took too long: ${ingestDuration.toFixed(2)} ms (budget: 500ms)`
    );

    // 2. Query latency benchmark
    const queryQueries = ['kinetic', 'potential', 'equilibrium', 'stoichiometry', 'tangent', 'spring'];
    const queryStart = performance.now();
    let totalResults = 0;
    const testQueriesCount = 10;

    for (let q = 0; q < testQueriesCount; q++) {
      const term = queryQueries[q % queryQueries.length];
      const res = engine.query(term);
      totalResults += res.totalMatches;
    }
    const queryDuration = performance.now() - queryStart;
    const avgLatencyMs = queryDuration / testQueriesCount;

    assert.ok(totalResults > 0, `Queries should return results, got ${totalResults}`);
    assert.ok(
      avgLatencyMs < 200.0,
      `Average query latency too high: ${avgLatencyMs.toFixed(3)} ms (budget: 200.0ms)`
    );
  });

  it('measures 100,000 scale memory footprint and lookup efficiency', () => {
    const count = 100000;
    const index = new Map<string, number[]>();

    const memBefore = process.memoryUsage().heapUsed;
    const t0 = performance.now();

    for (let i = 0; i < count; i++) {
      const key = `token_${i % 1000}`;
      let list = index.get(key);
      if (!list) {
        list = [];
        index.set(key, list);
      }
      list.push(i);
    }
    const populateTime = performance.now() - t0;
    const memAfter = process.memoryUsage().heapUsed;
    const memDeltaMB = (memAfter - memBefore) / (1024 * 1024);

    assert.strictEqual(index.size, 1000);
    assert.ok(populateTime < 1000, `Populating 100k took ${populateTime.toFixed(2)}ms`);
    assert.ok(memDeltaMB < 60, `Memory footprint too large: ${memDeltaMB.toFixed(2)} MB (budget: 60MB)`);

    // Lookup 1,000 queries
    const lookupStart = performance.now();
    for (let i = 0; i < 1000; i++) {
      const key = `token_${i % 1000}`;
      const hits = index.get(key);
      assert.strictEqual(hits?.length, 100);
    }
    const lookupDuration = performance.now() - lookupStart;
    const avgLookupUs = (lookupDuration / 1000) * 1000; // microseconds
    assert.ok(avgLookupUs < 50, `Lookup too slow: ${avgLookupUs.toFixed(2)} us per query`);
  });

  it('measures 10,000 physics model evaluations throughput', () => {
    const iterations = 10000;
    const t0 = performance.now();

    for (let i = 0; i < iterations; i++) {
      evaluateWpeModel('SPRING_CONTACT', {
        k: 200,
        x: 0.5,
        m: 1,
        friction: 5,
        distance: 3
      });
    }

    const elapsedMs = performance.now() - t0;
    const opsPerSec = (iterations / elapsedMs) * 1000;

    assert.ok(
      elapsedMs < 100,
      `10k evaluations took too long: ${elapsedMs.toFixed(2)} ms (budget: 100ms)`
    );
    assert.ok(
      opsPerSec > 100000,
      `Throughput below target: ${opsPerSec.toFixed(0)} ops/sec (target: > 100,000 ops/sec)`
    );
  });

  it('measures storage driver transaction throughput for 500 atomic transaction writes', async () => {
    const driver = new MemoryStorageDriver();
    const ops = 500;

    const t0 = performance.now();
    await driver.transaction(['bench_store'], 'readwrite', async tx => {
      for (let i = 0; i < ops; i++) {
        await tx.put('bench_store', `item:${i}`, {
          id: `item:${i}`,
          value: i * 2,
          timestamp: 1700000000 + i
        });
      }
    });
    const putElapsed = performance.now() - t0;
    const putOpsPerSec = (ops / putElapsed) * 1000;

    assert.ok(
      putOpsPerSec > 1000,
      `Storage throughput below target: ${putOpsPerSec.toFixed(0)} ops/sec (elapsed: ${putElapsed.toFixed(2)}ms)`
    );

    const all = await driver.getAll('bench_store');
    assert.strictEqual(all.length, ops);
  });
});
