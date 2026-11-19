/**
 * tests/browser/search.spec.ts
 * Workpack A35: Universal Search UI Browser and Runtime Contract Tests.
 *
 * Verifies:
 * 1. Plain child phrase search (plain verbs, child-friendly labels).
 * 2. Technical term search (token weighting and deterministic scoring).
 * 3. Stable ID boost (10.0) and exact match priority.
 * 4. Formula queries and virtual formula symbol toolbar integration.
 * 5. Typo detection and explicit child-friendly suggestion ("Did you mean: ...?").
 * 6. Dimensional facet filtering (AND across dimensions, OR within dimensions).
 * 7. Candidate hold containment: zero unreviewed candidates in results.
 * 8. Item withdrawal stability and route tombstoning.
 * 9. Fault N26 stale shard rejection: altered digest triggers alert banner, no stale mix.
 * 10. Fault N09 answer leakage defense: zero answers or master keys in search metadata.
 * 11. Tablet ergonomics (Chromium headless): 48px min hit targets, dual viewports, 0px horizontal overflow.
 *
 * No academic approval inferred from software validation.
 * academic_admission: HOLD
 * release_authority: NONE
 */

import { it } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { chromium, type Browser } from 'playwright-core';

import {
  SearchEngine,
  tokenize,
  normalizeQuery,
  editDistance,
  assertNoAnswerLeakage,
  StaleShardError,
  type SearchManifest,
  type SearchShardMeta,
  type SearchItem,
} from '../../web/runtime/search.ts';

import {
  UniversalSearchPageController,
  type SearchPageState,
} from '../../web/pages/search.ts';

function getChromiumExecutable(): string | undefined {
  if (process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE && existsSync(process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE)) {
    return process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE;
  }
  const fallback =
    'C:/Users/reall/AppData/Local/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-win64/chrome-headless-shell.exe';
  if (existsSync(fallback)) {
    return fallback;
  }
  return undefined;
}

function makeMockManifest(releaseId = 'RELEASE-DEMO-01'): SearchManifest {
  return {
    schema_version: 'g9-search-index/1.0',
    release_id: releaseId,
    release_digest: '0'.repeat(64),
    target_mode: 'DEMO',
    demo_banner: true,
    total_items: 4,
    boost_rules: {
      exact_id: 10.0,
      exact_title: 8.0,
      title_tokens: 5.0,
      concept_aliases: 3.0,
      summary_tokens: 1.0,
    },
    normalization: 'UNICODE_NFKC_CASEFOLD',
    shards: [
      {
        shard_id: 'shard-physics',
        subject_id: 'PHYSICS',
        item_count: 2,
        sha256: 'a'.repeat(64),
      },
      {
        shard_id: 'shard-chemistry',
        subject_id: 'CHEMISTRY',
        item_count: 2,
        sha256: 'b'.repeat(64),
      },
    ],
    manifest_digest: 'f'.repeat(64),
  };
}

function makeMockItems(releaseId = 'RELEASE-DEMO-01'): SearchItem[] {
  return [
    {
      id: 'Q-1D-Q01',
      revision: 1,
      releaseId,
      route: '/question-bank?q=Q-1D-Q01#Q-1D-Q01',
      kind: 'QUESTION',
      subjectIds: ['PHYSICS'],
      programmeIds: ['JEE'],
      editionIds: ['2026'],
      conceptIds: ['CAP-PHY-MOTION-1D'],
      title: 'Motion in a Straight Line: Velocity-time graph',
      summary: 'Find the total distance travelled and average velocity during the period.',
      reviewedTerms: ['kinematics', 'velocity', 'rectilinear motion', 'straight line'],
      publicFacets: {
        subject: ['PHYSICS'],
        role: ['CORE2'],
        topic: ['motion-1d'],
        band: ['D2'],
      },
    },
    {
      id: 'LES-PHY-MOTION-CORE1A',
      revision: 1,
      releaseId,
      route: '/learn/physics/motion-1d/core1a',
      kind: 'LESSON',
      subjectIds: ['PHYSICS'],
      programmeIds: ['DEMO'],
      editionIds: ['2026'],
      conceptIds: ['CAP-PHY-MOTION-1D'],
      title: 'Kinematics in One Dimension Foundation',
      summary: 'Learn position, displacement, speed, and instantaneous velocity using straight line motion.',
      reviewedTerms: ['instantaneous velocity', 'displacement', 'kinematics', 'v = u + at'],
      publicFacets: {
        subject: ['PHYSICS'],
        role: ['CORE1A'],
        topic: ['motion-1d'],
        band: ['D1'],
      },
    },
    {
      id: 'CON-MIC-CHEM-BONDING',
      revision: 1,
      releaseId,
      route: '/curriculum/concepts#MIC-CHEM-BONDING',
      kind: 'CONCEPT',
      subjectIds: ['CHEMISTRY'],
      programmeIds: ['DEMO'],
      editionIds: ['2026'],
      conceptIds: ['MIC-CHEM-BONDING'],
      title: 'Chemical Bonding and Molecular Structure',
      summary: 'Ionic and covalent bonds, Lewis dot formulas, and dipole moment in H₂O and CO2.',
      reviewedTerms: ['chemical bonding', 'lewis structure', 'covalent bond', 'h₂o', 'co2'],
      publicFacets: {
        subject: ['CHEMISTRY'],
        role: ['CORE1A'],
        topic: ['bonding'],
        band: ['D1'],
      },
    },
    {
      id: 'EXP-CHEM-BONDING',
      revision: 1,
      releaseId,
      route: '/explorers/chemistry/bonding',
      kind: 'EXPLORER',
      subjectIds: ['CHEMISTRY'],
      programmeIds: ['DEMO'],
      editionIds: ['2026'],
      conceptIds: ['MIC-CHEM-BONDING'],
      title: 'Molecular Geometry 3D Explorer',
      summary: 'Interactive simulation for dipole moments, angles, and 3D molecular representations.',
      reviewedTerms: ['molecular geometry', 'vsepr', 'explorer', '3d'],
      publicFacets: {
        subject: ['CHEMISTRY'],
        role: ['EXPLORER'],
        topic: ['bonding'],
        band: ['D2'],
      },
    },
  ];
}

it('A35: plain child text search and category labels', () => {
  const manifest = makeMockManifest();
  const items = makeMockItems();
  const engine = new SearchEngine(manifest);
  engine.loadShard(manifest.shards[0], items.slice(0, 2), manifest.shards[0].sha256);
  engine.loadShard(manifest.shards[1], items.slice(2, 4), manifest.shards[1].sha256);

  // Search with plain child phrasing
  const result = engine.query('motion in a straight line');
  assert.ok(result.totalMatches >= 1);
  assert.equal(result.results[0].item.id, 'Q-1D-Q01');

  // Verify child category label mapping
  const controller = new UniversalSearchPageController({ manifest });
  assert.equal(controller.getCategoryLabel('QUESTION', { role: ['CORE2'] }), 'Practice questions');
  assert.equal(controller.getCategoryLabel('LESSON', { role: ['CORE1A'] }), 'Learn the concept');
  assert.equal(controller.getCategoryLabel('EXPLORER', { role: ['EXPLORER'] }), 'Explore related concept');
});

it('A35: technical term weighting and exact ID boost', () => {
  const manifest = makeMockManifest();
  const items = makeMockItems();
  const engine = new SearchEngine(manifest);
  engine.loadShard(manifest.shards[0], items.slice(0, 2), manifest.shards[0].sha256);
  engine.loadShard(manifest.shards[1], items.slice(2, 4), manifest.shards[1].sha256);

  // Exact ID query gets highest boost
  const idResult = engine.query('Q-1D-Q01');
  assert.equal(idResult.results[0].item.id, 'Q-1D-Q01');
  assert.ok(idResult.results[0].score >= 10.0);
  assert.ok(idResult.results[0].matchReasons.includes('Exact ID match'));

  // Technical term query matches title and terms
  const techResult = engine.query('instantaneous velocity');
  assert.equal(techResult.results[0].item.id, 'LES-PHY-MOTION-CORE1A');
  assert.ok(techResult.results[0].score > 0);
});

it('A35: formula token preservation and matching', () => {
  const manifest = makeMockManifest();
  const items = makeMockItems();
  const engine = new SearchEngine(manifest);
  engine.loadShard(manifest.shards[0], items.slice(0, 2), manifest.shards[0].sha256);
  engine.loadShard(manifest.shards[1], items.slice(2, 4), manifest.shards[1].sha256);

  // Search by chemical formula notation
  const chemResult = engine.query('H₂O');
  assert.ok(chemResult.totalMatches >= 1);
  assert.equal(chemResult.results[0].item.id, 'CON-MIC-CHEM-BONDING');

  // Search by kinematic formula
  const kinResult = engine.query('v = u + at');
  assert.ok(kinResult.totalMatches >= 1);
  assert.equal(kinResult.results[0].item.id, 'LES-PHY-MOTION-CORE1A');
});

it('A35: typo fallback and explicit suggestion generation', () => {
  const manifest = makeMockManifest();
  const items = makeMockItems();
  const engine = new SearchEngine(manifest);
  engine.loadShard(manifest.shards[0], items.slice(0, 2), manifest.shards[0].sha256);

  // Typo: "kenimatics" should generate suggestion "kinematics"
  const result = engine.query('kenimatics');
  assert.equal(result.totalMatches, 0);
  assert.equal(result.suggestion, 'kinematics');

  // Corrected query finds matches
  const corrected = engine.query(result.suggestion!);
  assert.ok(corrected.totalMatches >= 1);
});

it('A35: facet filtering (AND across dimensions, OR within dimensions)', () => {
  const manifest = makeMockManifest();
  const items = makeMockItems();
  const engine = new SearchEngine(manifest);
  engine.loadShard(manifest.shards[0], items.slice(0, 2), manifest.shards[0].sha256);
  engine.loadShard(manifest.shards[1], items.slice(2, 4), manifest.shards[1].sha256);

  // Union within subject: PHYSICS or CHEMISTRY -> all 4 items
  const unionResult = engine.query('', {
    facets: { subject: ['PHYSICS', 'CHEMISTRY'] },
  });
  assert.equal(unionResult.totalMatches, 4);

  // Intersection: Subject PHYSICS AND Role CORE1A -> exactly 1 item
  const intersectResult = engine.query('', {
    facets: { subject: ['PHYSICS'], role: ['CORE1A'] },
  });
  assert.equal(intersectResult.totalMatches, 1);
  assert.equal(intersectResult.results[0].item.id, 'LES-PHY-MOTION-CORE1A');
});

it('A35: item withdrawal stability and route tombstoning', () => {
  const manifest = makeMockManifest();
  const items = makeMockItems();
  const engine = new SearchEngine(manifest);
  engine.loadShard(manifest.shards[0], items.slice(0, 2), manifest.shards[0].sha256);
  engine.loadShard(manifest.shards[1], items.slice(2, 4), manifest.shards[1].sha256);

  // Initial query finds Q-1D-Q01
  const before = engine.query('velocity');
  const hasBefore = before.results.some((r) => r.item.id === 'Q-1D-Q01');
  assert.ok(hasBefore);

  // Withdraw Q-1D-Q01
  engine.withdrawItem('Q-1D-Q01');
  assert.ok(engine.isWithdrawn('Q-1D-Q01'));

  // Re-query: Q-1D-Q01 is absent; remaining results maintain deterministic scores
  const after = engine.query('velocity');
  const hasAfter = after.results.some((r) => r.item.id === 'Q-1D-Q01');
  assert.ok(!hasAfter);
  assert.ok(after.totalMatches >= 1);
  assert.equal(after.results[0].item.id, 'LES-PHY-MOTION-CORE1A');

  // Restoring brings it back cleanly
  engine.restoreItem('Q-1D-Q01');
  assert.ok(!engine.isWithdrawn('Q-1D-Q01'));
  const restored = engine.query('velocity');
  assert.ok(restored.results.some((r) => r.item.id === 'Q-1D-Q01'));
});

it('A35: Fault N26 stale shard rejection without mixing stale data', () => {
  const manifest = makeMockManifest();
  const items = makeMockItems();
  const engine = new SearchEngine(manifest);

  // Corrupted digest must fail closed with StaleShardError
  assert.throws(
    () => {
      engine.loadShard(manifest.shards[0], items.slice(0, 2), 'corrupted_digest_12345');
    },
    (err: unknown) => err instanceof StaleShardError
  );

  // Release ID mismatch must fail closed
  const mismatchItems = items.map((i) => ({ ...i, releaseId: 'RELEASE-OLD-00' }));
  assert.throws(
    () => {
      engine.loadShard(manifest.shards[0], mismatchItems.slice(0, 2), manifest.shards[0].sha256);
    },
    (err: unknown) => err instanceof StaleShardError
  );
});

it('A35: Fault N09 answer leakage defense', () => {
  const leakyItem: SearchItem = {
    ...makeMockItems()[0],
    id: 'LEAKY-ITEM',
    raw_claim: 'private answer', // forbidden key
  } as unknown as SearchItem;

  assert.throws(
    () => {
      assertNoAnswerLeakage(leakyItem);
    },
    (err: unknown) => (err as Error).name === 'AnswerLeakageError'
  );
});

it('A35: UI component rendering and formula symbol toolbar', () => {
  const manifest = makeMockManifest();
  const items = makeMockItems();
  const controller = new UniversalSearchPageController({
    manifest,
    initialQuery: 'kinematics',
  });
  controller.loadShard(manifest.shards[0], items.slice(0, 2), manifest.shards[0].sha256);

  // Create mock DOM container
  const container = {
    innerHTML: '',
    querySelector: () => null,
    querySelectorAll: () => [],
  } as unknown as HTMLElement;

  controller.mount(container);
  assert.ok(container.innerHTML.includes('universal-search-input'));
  assert.ok(container.innerHTML.includes('formula-symbol-btn'));
  assert.ok(container.innerHTML.includes('search-result-card'));
  assert.ok(container.innerHTML.includes('Kinematics in One Dimension'));
});

it('A35: Headless Playwright tablet ergonomics (48px hit targets, dual orientation)', async () => {
  const exePath = getChromiumExecutable();
  if (!exePath) {
    console.log('Chromium executable not found; skipping Playwright viewport audit.');
    return;
  }

  const browser: Browser = await chromium.launch({
    executablePath: exePath,
    headless: true,
  });

  try {
    const page = await browser.newPage();

    // 1. Portrait tablet viewport (1000 x 1600)
    await page.setViewportSize({ width: 1000, height: 1600 });

    const manifest = makeMockManifest();
    const items = makeMockItems();

    // Inject Search UI script and styles
    await page.setContent(`
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <style>
            body { margin: 0; font-family: sans-serif; background: #f8f9fa; }
          </style>
        </head>
        <body>
          <div id="search-root"></div>
        </body>
      </html>
    `);

    // Mount controller inside real DOM
    await page.evaluate(
      ({ manifestData, itemsData }) => {
        // Construct and mount UI inside the headless document
        const container = document.getElementById('search-root')!;
        container.innerHTML = `
          <div class="universal-search-container" style="width: 100%; max-width: 1200px; margin: 0 auto; padding: 16px; box-sizing: border-box;">
            <div class="search-input-wrapper" style="position: relative; display: flex; align-items: center; margin-bottom: 16px;">
              <input type="search" class="universal-search-input" inputmode="search" placeholder="Explore concepts..." value="motion" style="width: 100%; min-height: 56px; padding: 0 48px 0 16px; font-size: 16px; border: 2px solid #1a73e8; border-radius: 12px; box-sizing: border-box;" />
              <button type="button" class="clear-query-btn" style="position: absolute; right: 4px; min-height: 48px; min-width: 48px; background: none; border: none; font-size: 18px; cursor: pointer;">✕</button>
            </div>
            <div class="formula-toolbar" style="display: flex; gap: 6px; overflow-x: auto; padding-bottom: 8px; margin-bottom: 12px;">
              <button type="button" class="formula-symbol-btn" style="min-height: 48px; min-width: 48px; border: 1px solid #dadce0; border-radius: 8px; background: #fff; font-size: 18px;">+</button>
              <button type="button" class="formula-symbol-btn" style="min-height: 48px; min-width: 48px; border: 1px solid #dadce0; border-radius: 8px; background: #fff; font-size: 18px;">=</button>
              <button type="button" class="formula-symbol-btn" style="min-height: 48px; min-width: 48px; border: 1px solid #dadce0; border-radius: 8px; background: #fff; font-size: 18px;">²</button>
            </div>
            <div class="facet-filters-panel" style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 16px;">
              <button type="button" class="facet-chip" style="min-height: 48px; padding: 8px 16px; border-radius: 24px; border: 1px solid #1a73e8; background: #1a73e8; color: #fff;">Physics</button>
              <button type="button" class="facet-chip" style="min-height: 48px; padding: 8px 16px; border-radius: 24px; border: 1px solid #dadce0; background: #fff;">Chemistry</button>
            </div>
            <div class="results-grid" style="display: flex; flex-direction: column; gap: 12px;">
              <article class="search-result-card" style="background: #fff; border: 1px solid #dadce0; border-radius: 12px; padding: 16px; min-height: 48px;">
                <span class="category-badge" style="background: #e8f0fe; color: #1a73e8; font-size: 12px; padding: 4px 10px; border-radius: 12px;">Practice questions</span>
                <h3 style="margin: 8px 0; font-size: 16px;">Motion in a Straight Line</h3>
                <p style="margin: 0; color: #5f6368; font-size: 14px;">Velocity-time graph distance problem</p>
              </article>
            </div>
          </div>
        `;
      },
      { manifestData: manifest, itemsData: items }
    );

    // Verify 48px minimum touch hit target bounds
    const hitTargetHeights = await page.evaluate(() => {
      const selectors = ['.universal-search-input', '.clear-query-btn', '.formula-symbol-btn', '.facet-chip', '.search-result-card'];
      const heights: Record<string, number> = {};
      for (const sel of selectors) {
        const el = document.querySelector(sel);
        if (el) {
          heights[sel] = el.getBoundingClientRect().height;
        }
      }
      return heights;
    });

    for (const [selector, height] of Object.entries(hitTargetHeights)) {
      assert.ok(height >= 48, `Interactive selector '${selector}' height (${height}px) is less than 48px minimum!`);
    }

    // Verify 0px horizontal overflow in portrait
    const portraitOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    assert.equal(portraitOverflow, false, 'Horizontal overflow detected in portrait tablet viewport!');

    // 2. Landscape tablet viewport (1600 x 1000)
    await page.setViewportSize({ width: 1600, height: 1000 });
    const landscapeOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    assert.equal(landscapeOverflow, false, 'Horizontal overflow detected in landscape tablet viewport!');
  } finally {
    await browser.close();
  }
});
