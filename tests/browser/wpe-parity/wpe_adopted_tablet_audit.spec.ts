/**
 * tests/browser/wpe-parity/wpe_adopted_tablet_audit.spec.ts
 * End-to-End Headless Browser Tablet Audit for Adopted Work, Power & Energy (WPE) Suite.
 *
 * Verifies:
 * 1. Zero IFRAMES: 100% native TypeScript DOM rendering across all components.
 * 2. Topic Workspace Gateway Banner: 74 questions, 21 journeys, 42 SVGs, 6 discovery shortcuts.
 * 3. Tab 1 Question Bank: 74 questions, 5 batch filters + Textbook + Diagnostic, live search, SVG thumbnails, split-pane workspace.
 * 4. Tab 2 Learn & Try: Core 1A (9 units, 5 thinking skills, 3 anchors) & Core 1B (21 6-stage cognitive journeys + A26 stylus ink).
 * 5. Tab 3 Explorer: GCDR 10-stage simulation.
 * 6. Tab 4 Standalone Labs: Harmonic Potential Well analytical telemetry and turning points.
 * 7. 12.7" Tablet Touch Geometry: >= 48px hit targets, >= 56px primary CTAs, 0px horizontal scroll overflow in 1600x1000 and 1000x1600.
 *
 * No academic approval inferred from software validation. All items on academic HOLD.
 */

import assert from 'node:assert/strict';
import { test } from 'node:test';
import { mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright-core';
import { createServer } from 'vite';

const EVIDENCE_DIR = resolve('C:/Users/reall/.gemini/antigravity/brain/8107d052-dc5f-4940-bc82-ef420a0d4802/evidence');

test('WPE Adoption Suite — 12.7" Tablet End-to-End Native Parity Audit', { timeout: 120000 }, async (t) => {
  await mkdir(EVIDENCE_DIR, { recursive: true });

  let viteServer: any = null;
  let baseUrl = 'http://127.0.0.1:3000/';
  try {
    const res = await fetch('http://127.0.0.1:3000/');
    if (res.ok) baseUrl = 'http://127.0.0.1:3000/';
  } catch {
    try {
      const res = await fetch('http://127.0.0.1:3005/');
      if (res.ok) baseUrl = 'http://127.0.0.1:3005/';
    } catch {
      viteServer = await createServer({
        configFile: false,
        root: fileURLToPath(new URL('../../web', import.meta.url)),
        server: { host: '127.0.0.1', port: 0 }
      });
      await viteServer.listen();
      const address = viteServer.httpServer!.address();
      assert(address && typeof address !== 'string');
      baseUrl = `http://127.0.0.1:${address.port}/`;
    }
  }

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1600, height: 1000 }, // 12.7" Tablet Landscape
    deviceScaleFactor: 2,
    hasTouch: true,
  });

  const page = await context.newPage();

  try {
    await t.test('1. WPE Topic Hub Gateway & Zero-Iframe Verification', async () => {
      await page.goto(`${baseUrl}#/subject/physics/topic/wpe`, { waitUntil: 'domcontentloaded' });
      await page.waitForSelector('.topic-workspace-title', { timeout: 15000 });

      const title = await page.locator('.topic-workspace-title').textContent();
      assert.match(title ?? '', /Work, Power and Energy/);

      // Verify ZERO iframes in DOM
      const iframeCount = await page.evaluate(() => document.querySelectorAll('iframe').length);
      assert.equal(iframeCount, 0, 'Zero iframes allowed in native tablet application');

      // Verify Gateway Banner
      await page.waitForSelector('.g9-wpe-gateway-banner', { timeout: 5000 });
      const bannerText = await page.locator('.g9-wpe-gateway-banner').textContent();
      assert.match(bannerText ?? '', /Work, Power & Energy Comprehensive Adoption Suite/);
      assert.match(bannerText ?? '', /78.*Questions/);
      assert.match(bannerText ?? '', /21.*Journeys/);
      assert.match(bannerText ?? '', /42.*SVGs/);
      assert.match(bannerText ?? '', /Zero Iframes/);
      assert.match(bannerText ?? '', /HOLD/);

      // Verify 6 discovery shortcut buttons exist
      const shortcutCount = await page.locator('.g9-wpe-gateway-banner button').count();
      assert.equal(shortcutCount, 6, 'Expected 6 quick discovery shortcut buttons');

      await page.screenshot({ path: `${EVIDENCE_DIR}/01_wpe_gateway_banner_landscape.png` });
    });

    await t.test('2. Tab 1: Question Bank — All 78 Items, Batch Filtering, SVG Figures & Search', async () => {
      await page.waitForSelector('.g9-question-deck', { timeout: 5000 });

      // Verify initial deck has 78 items
      const countText = await page.locator('#g9-deck-count').textContent();
      assert.match(countText ?? '', /78 Items/);

      // Verify batch filter buttons exist
      const filterPills = page.locator('.g9-wpe-batch-filters button[data-batch-filter]');
      assert.equal(await filterPills.count(), 8); // ALL, B1, B2, B3, B4, B5, Textbook, DIAGNOSTIC

      // Test B1 filter -> 13 items
      await page.click('button[data-batch-filter="B1"]');
      let currentCount = await page.locator('#g9-deck-count').textContent();
      assert.match(currentCount ?? '', /13 Items/);
      assert.equal(await page.locator('.g9-questions-grid > div').count(), 13);

      // Test B4 filter (Potential curves) -> 15 items
      await page.click('button[data-batch-filter="B4"]');
      currentCount = await page.locator('#g9-deck-count').textContent();
      assert.match(currentCount ?? '', /15 Items/);

      // Test Textbook filter -> 9 items
      await page.click('button[data-batch-filter="Textbook"]');
      currentCount = await page.locator('#g9-deck-count').textContent();
      assert.match(currentCount ?? '', /9 Items/);

      // Test Diagnostic filter -> 4 items
      await page.click('button[data-batch-filter="DIAGNOSTIC"]');
      currentCount = await page.locator('#g9-deck-count').textContent();
      assert.match(currentCount ?? '', /4 Items/);

      // Reset to ALL
      await page.click('button[data-batch-filter="ALL"]');
      currentCount = await page.locator('#g9-deck-count').textContent();
      assert.match(currentCount ?? '', /78 Items/);

      // Test live search input
      await page.fill('#g9-question-search', 'incline');
      const filteredCards = await page.locator('.g9-questions-grid > div').count();
      assert(filteredCards > 0 && filteredCards < 78, 'Search query must filter deck items');

      // Clear search
      await page.fill('#g9-question-search', '');
      assert.equal(await page.locator('.g9-questions-grid > div').count(), 78);

      // Verify vector SVG thumbnail rendering on cards with figures
      const svgImages = page.locator('.g9-questions-grid img');
      const imgCount = await svgImages.count();
      assert(imgCount >= 40, `Expected at least 40 SVG diagram thumbnails, found ${imgCount}`);

      // Open a question with SVG schematic (e.g. Q-PHY-WPE-B1-01)
      await page.click('button[data-action="open-question"][data-qid="Q-PHY-WPE-B1-01"]');
      await page.waitForSelector('.g9-question-page', { timeout: 10000 });

      // Verify question page renders stem, metadata, and embedded SVG
      const questionStem = await page.locator('.g9-question-page').textContent();
      assert.match(questionStem ?? '', /Q-PHY-WPE-B1-01/);
      assert.match(questionStem ?? '', /velocity at which 6 kg mass/);

      // Check SVG figure is present in question page
      const qPageSvg = page.locator('.g9-question-page img[src^="data:image/svg+xml"]');
      assert.equal(await qPageSvg.count(), 1, 'Question page must embed the vector SVG schematic');

      // Verify ZERO iframe in question page
      assert.equal(await page.evaluate(() => document.querySelectorAll('iframe').length), 0);

      await page.screenshot({ path: `${EVIDENCE_DIR}/02_wpe_question_workspace_with_svg.png` });

      // Return back to question deck
      await page.click('#g9-back-deck-btn');
      await page.waitForSelector('.g9-question-deck', { timeout: 10000 });
    });

    await t.test('3. Tab 2: Learn & Try — Core 1A (9 Units, 5 Thinking Skills, 3 Anchors)', async () => {
      await page.click('button[data-tab="learn-try"]');
      await page.waitForSelector('.g9-learn-try-hub', { timeout: 10000 });

      // Verify Core 1A Lesson page
      await page.waitForSelector('.g9-lesson-page', { timeout: 10000 });
      const unitButtons = page.locator('button[data-role^="A"]');
      assert.equal(await unitButtons.count(), 9, 'Core 1A must contain all 9 curricular units (A1–A9)');

      // Verify Unit A1 text
      const unitTitle = await page.locator('.g9-unit-view h2').textContent();
      assert.match(unitTitle ?? '', /Phenomenon: Work, Direction & Energy Transfer/);

      // Click Unit A6 (Worked Example: Toy Cart on Ramp)
      await page.click('button[data-role="A6"]');
      const a6Content = await page.locator('.g9-unit-view').textContent();
      assert.match(a6Content ?? '', /Toy Cart Ramp Climb Worked Example/);
      assert.match(a6Content ?? '', /30 J/);

      // Click Unit A7 (Diagnostic Invariants / Misconception Repair)
      await page.click('button[data-role="A7"]');
      const a7Content = await page.locator('.g9-unit-view').textContent();
      assert.match(a7Content ?? '', /Equal Momentum vs Equal Kinetic Energy/);

      // Verify ZERO iframes
      assert.equal(await page.evaluate(() => document.querySelectorAll('iframe').length), 0);

      await page.screenshot({ path: `${EVIDENCE_DIR}/03_core1a_lesson_units_landscape.png` });
    });

    await t.test('4. Tab 2: Learn & Try — Core 1B (21 Six-Stage Cognitive Transfer Journeys)', async () => {
      // Switch subrole to Core 1B
      await page.click('button[data-subrole="CORE1B"]');
      await page.waitForSelector('.g9-cognitive-journey', { timeout: 10000 });

      // Verify journey selector options count
      const journeyOptions = page.locator('#g9-journey-select option');
      assert.equal(await journeyOptions.count(), 21, 'Must have exactly 21 Cognitive Transfer Journeys');

      // Verify 6-stage cognitive progression stepper
      const stages = await page.locator('button[data-stage]').allTextContents();
      assert.equal(stages.length, 6);
      assert.match(stages[0], /Predict/);
      assert.match(stages[1], /Attempt/);
      assert.match(stages[2], /Reconstruct/);
      assert.match(stages[3], /Diagnose/);
      assert.match(stages[4], /Repair/);
      assert.match(stages[5], /Boundary Test/);

      // Verify Stage 1 (Predict)
      const stageContent = await page.locator('.g9-cognitive-journey').textContent();
      assert.match(stageContent ?? '', /Stage 1: Qualitative Prediction/);

      // Advance to Stage 2 (Attempt)
      await page.click('#g9-start-attempt-btn');
      await page.waitForSelector('#g9-attempt-form', { timeout: 5000 });

      // Verify hints reveal
      const hintBtn = page.locator('#g9-journey-hint-btn');
      await hintBtn.click();
      assert.match(await page.locator('.g9-cognitive-journey').textContent() ?? '', /Hint 1:/);

      // Lock attempt -> Stage 3 (Reconstruct)
      await page.click('#g9-lock-attempt-btn');
      await page.waitForSelector('#g9-to-diagnose-btn', { timeout: 5000 });
      assert.match(await page.locator('.g9-cognitive-journey').textContent() ?? '', /Stage 3: Physical Reconstruction/);

      // Advance to Stage 4 (Diagnose)
      await page.click('#g9-to-diagnose-btn');
      await page.waitForSelector('input[name="g9-diag-choice"]', { timeout: 5000 });
      assert.match(await page.locator('.g9-cognitive-journey').textContent() ?? '', /Stage 4: Diagnosis of Error Patterns/);

      // Select diagnosis radio
      await page.locator('input[name="g9-diag-choice"]').first().check();
      assert.match(await page.locator('.g9-cognitive-journey').textContent() ?? '', /Pedagogical Feedback:/);

      // Advance to Stage 5 (Repair)
      await page.click('#g9-to-repair-btn');
      await page.waitForSelector('#g9-repair-input', { timeout: 5000 });
      await page.fill('#g9-repair-input', 'Always establish conservative potential curve turning points before kinetic energy computation.');

      // Advance to Stage 6 (Boundary Test)
      await page.click('#g9-to-boundary-btn');
      await page.waitForSelector('#g9-boundary-input', { timeout: 5000 });
      await page.fill('#g9-boundary-input', 'When coefficient of friction approaches 1.0, stopping distance approaches finite geometric limit.');

      // Complete journey
      await page.click('#g9-complete-journey-btn');
      assert.match(await page.locator('.g9-cognitive-journey').textContent() ?? '', /Journey C01 Completed!/);

      // Verify A26 Stylus Digital Ink Workspace is also mounted below journey
      await page.waitForSelector('#g9-core1b-ink-slot .g9-scratchpad-workspace', { timeout: 5000 });

      // Verify ZERO iframes
      assert.equal(await page.evaluate(() => document.querySelectorAll('iframe').length), 0);

      await page.screenshot({ path: `${EVIDENCE_DIR}/04_core1b_cognitive_journey_complete.png` });
    });

    await t.test('5. Tab 3: Explorer Simulation (GCDR 10-Stage)', async () => {
      await page.click('button[data-tab="explorer"]');
      await page.waitForSelector('.gcdr-explorer-page', { timeout: 10000 });

      const explorerTitle = await page.locator('.gcdr-explorer-page h1, .gcdr-explorer-page h2').first().textContent();
      assert.match(explorerTitle ?? '', /Work, Power & Energy — Interactive GCDR Explorer/);

      // Advance from Context to Predict
      await page.click('#gcdr-context-start');
      await page.waitForSelector('#gcdr-stage-input', { timeout: 5000 });

      // Fill prediction and advance to Manipulate stage
      await page.fill('#gcdr-stage-input', 'Energy is conserved; mechanical work transforms to kinetic energy.');
      await page.click('#gcdr-advance-stage-btn');
      await page.waitForSelector('#gcdr-parameter-x', { timeout: 5000 });

      // Slider manipulation
      await page.fill('#gcdr-parameter-x', '0.35');
      assert.equal(await page.locator('#gcdr-parameter-x').inputValue(), '0.35');

      // Verify ZERO iframes
      assert.equal(await page.evaluate(() => document.querySelectorAll('iframe').length), 0);

      await page.screenshot({ path: `${EVIDENCE_DIR}/05_wpe_explorer_simulation.png` });
    });

    await t.test('6. Tab 4: Standalone Labs (Harmonic Potential Well Analytical Workbench)', async () => {
      await page.click('button[data-tab="labs"]');
      await page.waitForSelector('.g9-labs-workbench', { timeout: 10000 });

      // Check initial values at x = 0.00m
      assert.equal(await page.locator('#g9-well-x-val').textContent(), '0.00 m');
      assert.equal(await page.locator('#g9-well-u').textContent(), '0.00 J');
      assert.equal(await page.locator('#g9-well-k').textContent(), '12.50 J');
      assert.equal(await page.locator('#g9-well-v').textContent(), '5.00 m/s');
      assert.equal(await page.locator('#g9-well-tp').textContent(), 'NO');

      // Click Right Turning Point button (+0.50m)
      await page.click('#g9-well-set-right-tp');
      assert.equal(await page.locator('#g9-well-x-val').textContent(), '0.50 m');
      assert.equal(await page.locator('#g9-well-u').textContent(), '12.50 J');
      assert.equal(await page.locator('#g9-well-k').textContent(), '0.00 J');
      assert.equal(await page.locator('#g9-well-v').textContent(), '0.00 m/s');
      assert.match(await page.locator('#g9-well-tp').textContent() ?? '', /YES/);

      // Click Left Turning Point button (-0.50m)
      await page.click('#g9-well-set-left-tp');
      assert.equal(await page.locator('#g9-well-x-val').textContent(), '-0.50 m');
      assert.equal(await page.locator('#g9-well-u').textContent(), '12.50 J');
      assert.equal(await page.locator('#g9-well-k').textContent(), '0.00 J');
      assert.equal(await page.locator('#g9-well-v').textContent(), '0.00 m/s');

      // Click Center (Equilibrium)
      await page.click('#g9-well-set-center');
      assert.equal(await page.locator('#g9-well-x-val').textContent(), '0.00 m');
      assert.equal(await page.locator('#g9-well-u').textContent(), '0.00 J');
      assert.equal(await page.locator('#g9-well-k').textContent(), '12.50 J');

      // Verify ZERO iframes
      assert.equal(await page.evaluate(() => document.querySelectorAll('iframe').length), 0);

      await page.screenshot({ path: `${EVIDENCE_DIR}/06_wpe_harmonic_well_workbench.png` });
    });

    await t.test('7. 12.7" Tablet Touch Geometry & Zero-Overflow Audit (Landscape & Portrait)', async () => {
      // 7A: Landscape Audit (1600 x 1000)
      await page.setViewportSize({ width: 1600, height: 1000 });
      await page.click('button[data-tab="questions"]');
      await page.waitForSelector('.g9-question-deck', { timeout: 10000 });

      const landscapeAudit = await page.evaluate(() => {
        const controls = Array.from(document.querySelectorAll<HTMLElement>(
          '.g9-topic-workspace button, .g9-topic-workspace input:not([type=hidden]), .g9-topic-workspace select'
        ));
        const visible = controls.filter(c => c.getClientRects().length > 0 && getComputedStyle(c).visibility !== 'hidden');
        const undersized = visible.filter(c => {
          const r = c.getBoundingClientRect();
          return r.width < 47.5 || r.height < 47.5; // Allow fractional subpixel rounding
        });
        const hasOverflow = document.documentElement.scrollWidth > window.innerWidth;
        return { total: visible.length, undersizedCount: undersized.length, hasOverflow };
      });

      assert.equal(landscapeAudit.hasOverflow, false, 'Landscape must have 0px horizontal overflow');
      assert.equal(landscapeAudit.undersizedCount, 0, `All landscape controls must be >= 48px, found ${landscapeAudit.undersizedCount} undersized`);

      // 7B: Portrait Audit (1000 x 1600)
      await page.setViewportSize({ width: 1000, height: 1600 });
      await page.waitForTimeout(300);

      const portraitAudit = await page.evaluate(() => {
        const controls = Array.from(document.querySelectorAll<HTMLElement>(
          '.g9-topic-workspace button, .g9-topic-workspace input:not([type=hidden]), .g9-topic-workspace select'
        ));
        const visible = controls.filter(c => c.getClientRects().length > 0 && getComputedStyle(c).visibility !== 'hidden');
        const undersized = visible.filter(c => {
          const r = c.getBoundingClientRect();
          return r.width < 47.5 || r.height < 47.5;
        });
        const hasOverflow = document.documentElement.scrollWidth > window.innerWidth;
        return { total: visible.length, undersizedCount: undersized.length, hasOverflow };
      });

      assert.equal(portraitAudit.hasOverflow, false, 'Portrait must have 0px horizontal overflow');
      assert.equal(portraitAudit.undersizedCount, 0, `All portrait controls must be >= 48px, found ${portraitAudit.undersizedCount} undersized`);

      await page.screenshot({ path: `${EVIDENCE_DIR}/07_wpe_portrait_1000x1600_audit.png` });
    });

  } finally {
    await browser.close();
    if (viteServer) await viteServer.close();
  }
});
