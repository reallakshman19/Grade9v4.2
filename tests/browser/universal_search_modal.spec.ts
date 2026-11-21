import { describe, it, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { readFile, stat, realpath } from 'node:fs/promises';
import { resolve, sep, extname } from 'node:path';
import { once } from 'node:events';
import { chromium, type Browser } from 'playwright-core';
import {
  UNIVERSAL_SEARCH_CORPUS,
  queryUniversalSearch,
} from '../../web/runtime/universal-search-index.ts';

describe('Universal Search — Corpus & Relevance Engine Contract', () => {
  it('indexes exact corpus count matching snapshot: 416 total (310 questions, 61 tablets, 44 curriculum topics)', () => {
    assert.equal(UNIVERSAL_SEARCH_CORPUS.length, 416, 'Corpus must contain exactly 416 verified STEM items');

    const questions = UNIVERSAL_SEARCH_CORPUS.filter(i => i.category === 'question');
    const tablets = UNIVERSAL_SEARCH_CORPUS.filter(i => i.category === 'tablet');
    const curriculum = UNIVERSAL_SEARCH_CORPUS.filter(i => i.category === 'curriculum');

    assert.equal(questions.length, 310, 'Must have exactly 310 authentic questions');
    assert.equal(tablets.length, 61, 'Must have exactly 61 interactive tablets/workbenches');
    assert.equal(curriculum.length, 44, 'Must have exactly 44 curriculum topics and concepts');
  });

  it('query with empty string returns full corpus and live counts matching snapshot tabs', () => {
    const res = queryUniversalSearch('');
    assert.equal(res.totalMatches, 416);
    assert.equal(res.counts.all, 416);
    assert.equal(res.counts.question, 310);
    assert.equal(res.counts.tablet, 61);
    assert.equal(res.counts.curriculum, 44);
    assert.ok(res.executionTimeMs < 50, `Sub-50ms search requirement: took ${res.executionTimeMs}ms`);
  });

  it('searching "Redox" places Redox concept & topic at the top of results', () => {
    const res = queryUniversalSearch('Redox');
    assert.ok(res.totalMatches > 0, 'Must find redox items');
    assert.ok(res.counts.curriculum >= 2, 'Must match Redox topic and concepts');
    assert.ok(res.counts.question >= 46, 'Must match 46 Redox questions');

    // First results should be the main concept / topic
    const topResult = res.results[0];
    assert.match(topResult.title, /Redox/i);
    assert.match(topResult.breadcrumb, /Chemistry/i);
    assert.match(topResult.badge, /(CONCEPT|TOPIC)/i);
  });

  it('searching "Circles" locates Circles Master Lab and Circles question corpus', () => {
    const res = queryUniversalSearch('Circles');
    assert.ok(res.totalMatches >= 50, 'Must match circles question deck and lab');
    assert.ok(res.counts.tablet >= 1, 'Must match Circles Master Lab');
    const tabletMatch = res.results.find(r => r.category === 'tablet');
    assert.ok(tabletMatch, 'Should find circles tablet');
    assert.match(tabletMatch!.title, /Circles/i);
  });

  it('category filtering restricts results while preserving accurate global live counts', () => {
    const allRes = queryUniversalSearch('Bonding', 'all');
    const questionRes = queryUniversalSearch('Bonding', 'question');
    const tabletRes = queryUniversalSearch('Bonding', 'tablet');

    assert.equal(allRes.counts.question, questionRes.counts.question);
    assert.equal(allRes.counts.tablet, tabletRes.counts.tablet);
    assert.ok(questionRes.results.every(r => r.category === 'question'));
    assert.ok(tabletRes.results.every(r => r.category === 'tablet'));
  });

  it('Fault N09 compliance: search documents do not leak answer keys or solutions prior to commitment', () => {
    for (const doc of UNIVERSAL_SEARCH_CORPUS) {
      assert.ok(!('correctAnswer' in doc), `Doc ${doc.id} must not contain correctAnswer property`);
      assert.ok(!('keyStatus' in doc && (doc as any).keyStatus === 'UNSEALED'), `Doc ${doc.id} must not unseal key`);
      // Title and subtitle must not reveal answer options or key tags
      assert.ok(!doc.title.includes('CORRECT_ANSWER:'), `Doc ${doc.id} title leaks answer`);
      assert.ok(!doc.subtitle.includes('CORRECT_ANSWER:'), `Doc ${doc.id} subtitle leaks answer`);
    }
  });
});

describe('Universal Search — Playwright Modal & Keyboard Shortcut Contract', () => {
  const root = resolve('dist');
  const mime: Record<string, string> = {
    '.html': 'text/html; charset=utf-8',
    '.js': 'text/javascript; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.json': 'application/json',
  };
  let origin = '';
  let browser: Browser;

  const server = createServer(async (req, res) => {
    try {
      if (req.method !== 'GET' && req.method !== 'HEAD') { res.writeHead(405).end(); return; }
      const url = new URL(req.url ?? '/', 'http://127.0.0.1');
      const path = decodeURIComponent(url.pathname);
      const target = resolve(root, path.slice(1) || 'index.html');
      if (!target.startsWith(root + sep) || !(await stat(target)).isFile()) { res.writeHead(404).end(); return; }
      const actual = await realpath(target);
      const actualRoot = await realpath(root);
      if (!actual.startsWith(actualRoot + sep)) { res.writeHead(404).end(); return; }
      const type = mime[extname(target)];
      if (!type) { res.writeHead(404).end(); return; }
      const body = await readFile(actual);
      res.writeHead(200, { 'Content-Type': type, 'X-Content-Type-Options': 'nosniff', 'Cache-Control': 'no-store' }).end(req.method === 'HEAD' ? undefined : body);
    } catch { res.writeHead(404).end(); }
  });

  before(async () => {
    server.listen(0, '127.0.0.1');
    await once(server, 'listening');
    const addr = server.address();
    assert(addr && typeof addr !== 'string');
    origin = `http://127.0.0.1:${addr.port}`;
    browser = await chromium.launch({ headless: true });
  });

  after(async () => {
    try { await browser?.close(); } finally {
      if (server.listening) await new Promise<void>((done, reject) => server.close(e => e ? reject(e) : done()));
    }
  });

  it('Ctrl+K opens modal with 4 tabs (All 416, Questions 310, Tablets 61, Topics 44) matching snapshot', async () => {
    const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
    try {
      await page.goto(`${origin}/#/home`, { waitUntil: 'domcontentloaded' });
      await page.waitForSelector('nav', { timeout: 10000 });

      // Press Ctrl+k
      await page.keyboard.press('Control+k');

      // Verify dialog is open and visible
      const dialog = page.locator('dialog.g9-search-dialog');
      await dialog.waitFor({ state: 'visible', timeout: 5000 });

      // Verify dialog title
      const title = await dialog.locator('strong').first().textContent();
      assert.match(title ?? '', /Search Grade9 STEM/i);

      // Verify tip text
      const tip = await dialog.locator('div:has-text("Tip: press Ctrl/⌘ K from anywhere to search.")').count();
      assert.ok(tip > 0, 'Tip shortcut hint must be visible');

      // Verify 4 Category Filter Tabs
      const tabs = dialog.locator('div[role="tablist"] button');
      assert.equal(await tabs.count(), 4, 'Must have exactly 4 category tabs');

      const tab1Text = await tabs.nth(0).textContent();
      const tab2Text = await tabs.nth(1).textContent();
      const tab3Text = await tabs.nth(2).textContent();
      const tab4Text = await tabs.nth(3).textContent();

      assert.match(tab1Text ?? '', /All\s*416/i);
      assert.match(tab2Text ?? '', /Questions\s*310/i);
      assert.match(tab3Text ?? '', /Core 1A & 2 Tablets\s*61/i);
      assert.match(tab4Text ?? '', /Topics & Concepts\s*44/i);

      // Verify initial cards rendered
      const cards = dialog.locator('.g9-search-card');
      assert.ok(await cards.count() > 0, 'Must show initial curated cards');

      // Save screenshot for verification
      const artifactDir = 'C:/Users/reall/.gemini/antigravity/brain/078a6361-bee7-49fc-a21a-d88fc3bc034f';
      await dialog.screenshot({ path: `${artifactDir}/evidence_search_modal_initial.png` });

      // Search "Redox"
      const input = dialog.locator('input[type="search"]');
      await input.fill('Redox');

      // Verify results update
      await page.waitForTimeout(100);
      const redoxCards = dialog.locator('.g9-search-card');
      assert.ok(await redoxCards.count() > 0, 'Must have matching Redox cards');

      // Top card title and badge
      const topTitle = await redoxCards.first().locator('div').first().textContent();
      assert.match(topTitle ?? '', /Redox/i);

      // Save screenshot of searched state
      await dialog.screenshot({ path: `${artifactDir}/evidence_search_modal_redox.png` });

      // Press Escape to close modal
      await page.keyboard.press('Escape');
      await dialog.waitFor({ state: 'detached', timeout: 5000 });
      assert.equal(await page.locator('dialog.g9-search-dialog').count(), 0, 'Dialog must be removed from body on close');
    } finally {
      await page.close();
    }
  });

  it('Nav header "🔍 Search" button opens the modal without full page reload', async () => {
    const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
    try {
      await page.goto(`${origin}/#/home`, { waitUntil: 'domcontentloaded' });
      await page.waitForSelector('nav', { timeout: 10000 });

      // Click Search button in Nav
      await page.click('button[data-action="search-modal"]');

      const dialog = page.locator('dialog.g9-search-dialog');
      await dialog.waitFor({ state: 'visible', timeout: 5000 });

      // Close via X button
      await dialog.locator('button[aria-label="Close search dialog"]').click();
      await dialog.waitFor({ state: 'detached', timeout: 5000 });
      assert.equal(await page.locator('dialog.g9-search-dialog').count(), 0);
    } finally {
      await page.close();
    }
  });
});
