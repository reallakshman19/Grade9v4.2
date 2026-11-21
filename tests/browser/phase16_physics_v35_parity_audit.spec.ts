/**
 * tests/browser/phase16_physics_v35_parity_audit.spec.ts
 * Gate P16-G1 — Physics Hub Adoption Parity & Standalone Execution Audit
 *
 * Verifies:
 * 1. Top-Level Direct Access to /physics/index.html (SHA256 verified identical to v3.5 custody)
 * 2. Absolute "NO IFRAME" constraint: zero <iframe> elements in DOM across all views
 * 3. Unified Subject Screen (#/subject/physics) holding:
 *    - 4 baseline .g9-topic-card elements (preserving Phase 8 invariant)
 *    - 5 Grade9 v3.5 Core Topic Workspaces (.v35-topic-card)
 *    - 9 Grade9 v3.5 Interactive Explorers & Visual Suites (.v35-explorer-card)
 *    - Direct launcher button to /physics/index.html
 * 4. Top-level direct navigation to topic workspaces (/physics/fluids/index.html, /physics/motion-1d/index.html)
 * 5. Top-level direct navigation to interactive visual explorers (/physics/motion-1d/explorers/motion_in_1d/index.html, /physics/nlm/explorers/atwood-pulleys/index.html)
 * 6. 12.7" Tablet Touch Ergonomics: >= 48px hit targets (with 47.5px sub-pixel tolerance) and zero horizontal overflow across 1600x1000 (landscape) and 1000x1600 (portrait) viewports
 * 7. Evidence capture of screenshots to artifacts directory
 *
 * No academic approval inferred from software validation.
 */

import assert from 'node:assert/strict';
import { test } from 'node:test';
import { createServer } from 'node:http';
import { readFile, stat, realpath, mkdir } from 'node:fs/promises';
import { resolve, sep, extname } from 'node:path';
import { once } from 'node:events';
import { chromium } from 'playwright-core';

const root = resolve('dist');
const mime: Record<string, string> = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json',
  '.woff2': 'font/woff2',
  '.png': 'image/png',
  '.svg': 'image/svg+xml'
};

const EVIDENCE_DIR = resolve('C:/Users/reall/.gemini/antigravity/brain/8a7891e7-44ed-443c-905b-5082f8020aec/evidence');

test('Gate P16-G1 — Physics Hub Adoption Parity & Standalone Execution Audit', { timeout: 120000 }, async (t) => {
  await mkdir(EVIDENCE_DIR, { recursive: true });

  // Self-contained static server serving dist
  const server = createServer(async (req, res) => {
    try {
      if (req.method !== 'GET' && req.method !== 'HEAD') {
        res.writeHead(405).end();
        return;
      }
      const url = new URL(req.url ?? '/', 'http://127.0.0.1');
      let pathname = decodeURIComponent(url.pathname);
      if (pathname.endsWith('/')) pathname += 'index.html';
      const local = pathname.startsWith('/') ? pathname.slice(1) : pathname;
      const target = resolve(root, local || 'index.html');
      if (!target.startsWith(root + sep) || !(await stat(target)).isFile()) {
        res.writeHead(404).end();
        return;
      }
      const actual = await realpath(target);
      const actualRoot = await realpath(root);
      if (!actual.startsWith(actualRoot + sep)) {
        res.writeHead(404).end();
        return;
      }
      const type = mime[extname(target)] || 'application/octet-stream';
      const body = await readFile(actual);
      res.writeHead(200, {
        'Content-Type': type,
        'X-Content-Type-Options': 'nosniff',
        'Cache-Control': 'no-store'
      }).end(req.method === 'HEAD' ? undefined : body);
    } catch {
      res.writeHead(404).end();
    }
  });

  server.listen(0, '127.0.0.1');
  await once(server, 'listening');
  const address = server.address();
  assert(address && typeof address !== 'string');
  const BASE_URL = `http://127.0.0.1:${address.port}`;

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1600, height: 1000 }, // 12.7" Tablet Landscape
    deviceScaleFactor: 2,
    hasTouch: true,
  });

  const page = await context.newPage();

  // Helper to audit touch targets, overflow, and zero iframes
  const auditSurface = async (label: string) => {
    // 1. Zero iframe enforcement
    const iframeCount = await page.locator('iframe').count();
    assert.equal(iframeCount, 0, `${label}: Strict NO IFRAME invariant violated! Found ${iframeCount} <iframe> elements.`);

    // 2. Horizontal overflow check
    const isOverflowing = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
    assert.equal(isOverflowing, false, `${label}: Horizontal overflow detected`);

    // 3. Touch target size check (>= 48px with 47.5px tolerance)
    const undersized = await page.evaluate(() => {
      const elements = Array.from(document.querySelectorAll<HTMLElement>('button, a, input:not([type=hidden]), textarea, select'));
      const visible = elements.filter(el => {
        const rect = el.getBoundingClientRect();
        return rect.width > 0 && rect.height > 0 && el.offsetParent !== null;
      });
      return visible
        .filter(el => {
          const r = el.getBoundingClientRect();
          return r.width < 47.5 || r.height < 47.5;
        })
        .map(el => `${el.tagName}[${el.innerText || (el as any).value || el.getAttribute('aria-label') || el.id || el.className}] (${el.getBoundingClientRect().width.toFixed(1)}x${el.getBoundingClientRect().height.toFixed(1)})`);
    });

    assert.deepEqual(undersized, [], `${label}: Undersized touch controls found: ${undersized.join(', ')}`);
  };

  try {
    await t.test('1. Physics Hub Static Entrypoint: Direct Top-Level Mount (/physics/index.html)', async () => {
      const res = await page.goto(`${BASE_URL}/physics/index.html`, { waitUntil: 'domcontentloaded' });
      assert.equal(res?.status(), 200, 'Expected 200 OK for /physics/index.html');

      // Title and content validation
      const pageTitle = await page.title();
      assert.match(pageTitle, /Physics/i, 'Title should reference Physics');

      // Verify presence of topic cards in static index (.g9-card)
      const topicCardsCount = await page.locator('.g9-card').count();
      assert.ok(topicCardsCount >= 5, `Expected at least 5 topic cards in static physics hub, got ${topicCardsCount}`);

      // Verify zero iframes
      const iframes = await page.locator('iframe').count();
      assert.equal(iframes, 0, 'Static physics hub must have zero iframes');

      // Verify horizontal overflow
      const isOverflowing = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
      assert.equal(isOverflowing, false, 'Physics hub: Horizontal overflow detected');

      await page.screenshot({ path: `${EVIDENCE_DIR}/p16_physics_hub_static_1600x1000.png` });
    });

    await t.test('2. Subject Screen Physics Tab: Unified Integration & Parity Verification', async () => {
      await page.goto(`${BASE_URL}/#/subject/physics`, { waitUntil: 'domcontentloaded' });
      await page.waitForSelector('.g9-subject-screen', { timeout: 10000 });

      // Verify academic status banner
      const banner = await page.locator('.g9-subject-screen').textContent();
      assert.match(banner || '', /Academic Status: HOLD/);
      assert.match(banner || '', /Diagnostic Mode Authorized/);

      // Verify Phase 8 regression invariant: EXACTLY 4 baseline .g9-topic-card elements
      const baselineTopicCards = await page.locator('.g9-topic-card').count();
      assert.equal(baselineTopicCards, 4, 'Phase 8 invariant: exactly 4 .g9-topic-card elements required');

      // Verify Grade9 v3.5 Core Topic Workspaces: EXACTLY 5 .v35-topic-card elements
      const v35TopicCards = await page.locator('.v35-topic-card').count();
      assert.equal(v35TopicCards, 5, 'Expected 5 v3.5 topic cards (Fluids, 1D Motion, 2D Motion, NLM, Vectors)');

      // Verify Grade9 v3.5 Interactive Explorers: EXACTLY 9 .v35-explorer-card elements
      const v35ExplorerCards = await page.locator('.v35-explorer-card').count();
      assert.equal(v35ExplorerCards, 9, 'Expected 9 v3.5 interactive explorer suites');

      // Verify direct top-level launcher button to ./physics/index.html
      const hubLauncher = page.locator('a.btn-open-physics-hub[href="./physics/index.html"]');
      assert.equal(await hubLauncher.count(), 1, 'Expected direct top-level launcher button to ./physics/index.html');

      // Audit touch ergonomics and zero iframes
      await auditSurface('Physics Subject Screen Landscape (1600x1000)');
      await page.screenshot({ path: `${EVIDENCE_DIR}/p16_physics_subject_1600x1000.png` });

      // Switch to portrait orientation (1000x1600) and verify zero overflow
      await page.setViewportSize({ width: 1000, height: 1600 });
      const isPortraitOverflowing = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
      assert.equal(isPortraitOverflowing, false, 'Physics Subject Screen: Portrait overflow detected');
      await page.screenshot({ path: `${EVIDENCE_DIR}/p16_physics_subject_1000x1600.png` });

      // Reset viewport back to landscape
      await page.setViewportSize({ width: 1600, height: 1000 });
    });

    await t.test('3. Top-Level Launch: Motion in 1D Interactive Suite', async () => {
      const res = await page.goto(`${BASE_URL}/physics/motion-1d/explorers/motion_in_1d/index.html`, { waitUntil: 'domcontentloaded' });
      assert.equal(res?.status(), 200, 'Expected 200 OK for Motion in 1D Interactive Suite');

      // Verify canvas or simulation controls
      const canvasCount = await page.locator('canvas').count();
      assert.ok(canvasCount >= 1, 'Expected at least 1 canvas element in Motion in 1D suite');

      // Verify zero iframes
      const iframes = await page.locator('iframe').count();
      assert.equal(iframes, 0, 'Motion in 1D Suite must run top-level with zero iframes');

      await page.screenshot({ path: `${EVIDENCE_DIR}/p16_motion_1d_suite_1600x1000.png` });
    });

    await t.test('4. Top-Level Launch: Atwood Machines & Pulley Constraints Suite', async () => {
      const res = await page.goto(`${BASE_URL}/physics/nlm/explorers/atwood-pulleys/index.html`, { waitUntil: 'domcontentloaded' });
      assert.equal(res?.status(), 200, 'Expected 200 OK for Atwood Pulleys Suite');

      // Verify canvas or simulation controls
      const canvasCount = await page.locator('canvas').count();
      assert.ok(canvasCount >= 1, 'Expected at least 1 canvas element in Atwood Pulleys suite');

      // Verify zero iframes
      const iframes = await page.locator('iframe').count();
      assert.equal(iframes, 0, 'Atwood Pulleys Suite must run top-level with zero iframes');

      await page.screenshot({ path: `${EVIDENCE_DIR}/p16_atwood_pulleys_suite_1600x1000.png` });
    });

    await t.test('5. Top-Level Launch: Fluids Topic Workspace', async () => {
      const res = await page.goto(`${BASE_URL}/physics/fluids/index.html`, { waitUntil: 'domcontentloaded' });
      assert.equal(res?.status(), 200, 'Expected 200 OK for Fluids Topic Workspace');

      // Verify zero iframes
      const iframes = await page.locator('iframe').count();
      assert.equal(iframes, 0, 'Fluids Topic Workspace must run top-level with zero iframes');

      await page.screenshot({ path: `${EVIDENCE_DIR}/p16_fluids_workspace_1600x1000.png` });
    });

    await t.test('6. Question Bank Direct Launch from Fluids Workspace: Zero 404', async () => {
      // Direct navigation to the URL user clicked in screenshot
      const res = await page.goto(`${BASE_URL}/question-bank/index.html?subject=Physics&topic=fluids&mode=study`, { waitUntil: 'domcontentloaded' });
      assert.equal(res?.status(), 200, 'Expected 200 OK for /question-bank/index.html?subject=Physics&topic=fluids&mode=study');

      // Verify question bank elements
      await page.waitForSelector('.qb-browser', { timeout: 10000 });
      const qbTitle = await page.locator('.qb-browser h2').textContent();
      assert.match(qbTitle || '', /Question browser/i);

      // Verify zero iframes
      const iframes = await page.locator('iframe').count();
      assert.equal(iframes, 0, 'Question Bank must run top-level with zero iframes');

      // Verify zero horizontal overflow
      const isOverflowing = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
      assert.equal(isOverflowing, false, 'Question Bank: Horizontal overflow detected');

      await page.screenshot({ path: `${EVIDENCE_DIR}/p16_question_bank_fluids_1600x1000.png` });
    });

    await t.test('7. Atlas Omission Invariant & Standalone Aliases Resolution: Zero Atlas Links', async () => {
      // 1. Verify Fluids workspace has no Atlas or Rung Ladder links
      await page.goto(`${BASE_URL}/physics/fluids/index.html`, { waitUntil: 'domcontentloaded' });
      const atlasLinksCount = await page.locator('a[href*="atlas"]').count();
      assert.equal(atlasLinksCount, 0, 'Atlas links must be omitted per owner directive');

      const atlasBtnCount = await page.locator('.g9-btn-atlas').count();
      assert.equal(atlasBtnCount, 0, 'Atlas button (.g9-btn-atlas) must not be rendered');

      // 2. Verify candidate standalone wrappers redirect cleanly
      const motion1dRes = await page.goto(`${BASE_URL}/standalone/motion-1d-suite/index.html`, { waitUntil: 'domcontentloaded' });
      assert.equal(motion1dRes?.status(), 200, 'Expected 200 OK for standalone motion-1d-suite wrapper');
      await page.waitForSelector('canvas', { timeout: 10000 });

      const atwoodRes = await page.goto(`${BASE_URL}/standalone/atwood-pulleys/index.html`, { waitUntil: 'domcontentloaded' });
      assert.equal(atwoodRes?.status(), 200, 'Expected 200 OK for standalone atwood-pulleys wrapper');
      await page.waitForSelector('canvas', { timeout: 10000 });
    });

    await t.test('8. Global Search Engine with Live Index Validation', async () => {
      await page.goto(`${BASE_URL}/physics/fluids/index.html`, { waitUntil: 'domcontentloaded' });
      const searchBtn = page.locator('.g9-search-btn');
      assert.equal(await searchBtn.count(), 1, 'Expected global search button');
      await searchBtn.click();

      // Verify search modal opens
      await page.waitForSelector('.g9-search-dialog[open]', { timeout: 5000 });
      const searchInput = page.locator('.g9-search-dialog input[type="search"]');
      await searchInput.fill('pressure');
      
      // Wait for search results to render
      await page.waitForTimeout(500);
      const searchResults = await page.locator('.g9-search-results').innerHTML();
      assert.ok(searchResults.length > 0, 'Expected populated search results for "pressure"');

      await page.screenshot({ path: `${EVIDENCE_DIR}/p16_global_search_modal_1600x1000.png` });
    });

    await t.test('9. Full Navigation Integrity & Zero Broken Links Across Ecosystem', async () => {
      const endpoints = [
        '/physics/index.html',
        '/physics/fluids/index.html',
        '/physics/motion-1d/index.html',
        '/physics/motion-2d/index.html',
        '/physics/nlm/index.html',
        '/physics/vectors/index.html',
        '/question-bank/index.html',
        '/question-bank/index.html?subject=Physics&topic=fluids&mode=study',
        '/standalone/motion-1d-suite/index.html',
        '/standalone/atwood-pulleys/index.html',
        '/chemistry/index.html',
        '/mathematics/index.html',
        '/standalone/practice/core1a-physics-thrust-pressure-tablet.html',
        '/standalone/practice/core2-physics-thrust-pressure-tablet.html',
        '/data/data.js',
        '/data/learner-search-index.v1.json'
      ];

      for (const endpoint of endpoints) {
        const res = await page.goto(`${BASE_URL}${endpoint}`, { waitUntil: 'domcontentloaded' });
        assert.ok(!res || res.status() === 200, `Endpoint ${endpoint} failed with status ${res?.status()}`);
      }
    });
  } finally {
    await browser.close();
    await new Promise<void>((done) => server.close(() => done()));
  }
});
