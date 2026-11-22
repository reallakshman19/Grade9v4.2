/**
 * tests/browser/phase12_chemistry_audit.spec.ts
 * Gate W12-G7 — 12.7" Tablet End-to-End Chemistry Curriculum & 14 Topic Adapters Audit.
 *
 * Verifies:
 * - Real user actions through live DOM application entrypoint (http://127.0.0.1:3000)
 * - Navigation to Chemistry Curriculum Explorer (#/curriculum/chemistry)
 * - 14-Adapter Chemistry Syllabus Navigator (C01 to C14) across Foundation and Olympiad
 * - 84-Subtopic Register with interactive expansion, misconceptions, and deep dives
 * - 252-Instance QRT Cognitive Demand Explorer with cognitive operation & band filters
 * - 165 Authentic Questions with Fault N09 Answer Isolation (withholding raw keys)
 * - Interactive Stoichiometry & Atom Conservation Ledger Workbench
 * - 12.7" tablet touch ergonomics: >= 48px hit targets, zero horizontal overflow across 1600x1000 and 1000x1600 viewports
 * - High-resolution screenshot capture into wave12_evidence/ in artifact directory
 */

import assert from 'node:assert/strict';
import test from 'node:test';
import { resolve } from 'node:path';
import { mkdir } from 'node:fs/promises';
import { chromium } from 'playwright-core';

const BASE_URL = 'http://127.0.0.1:3000';
const EVIDENCE_DIR = resolve('C:/Users/reall/.gemini/antigravity/brain/c39fd02d-dabd-412d-b94d-9f2254fd4134/wave12_evidence');

test('Gate W12-G7 — Chemistry Curriculum & 14 Topic Adapters (C01–C14) Tablet Audit', { timeout: 180000 }, async (t) => {
  await mkdir(EVIDENCE_DIR, { recursive: true });

  const browser = await chromium.launch({ headless: true });

  const auditGeometry = async (page: any, label: string) => {
    const isOverflowing = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
    assert.equal(isOverflowing, false, `${label}: Horizontal overflow detected`);

    const undersized = await page.evaluate(() => {
      const elements = Array.from(document.querySelectorAll<HTMLElement>('button, input:not([type=hidden]), textarea, select'));
      const visible = elements.filter(el => {
        const rect = el.getBoundingClientRect();
        return rect.width > 0 && rect.height > 0;
      });
      return visible
        .filter(el => {
          const r = el.getBoundingClientRect();
          return r.width < 47.5 || r.height < 47.5;
        })
        .map(el => `${el.tagName}[${el.innerText || (el as any).value || el.getAttribute('aria-label') || el.id}] (${el.getBoundingClientRect().width.toFixed(1)}x${el.getBoundingClientRect().height.toFixed(1)})`);
    });

    assert.deepEqual(undersized, [], `${label}: Undersized touch controls found: ${undersized.join(', ')}`);
  };

  try {
    // 1. Chemistry Curriculum Mount & Landscape Tablet Ergonomics (1600x1000)
    await t.test('1. Chemistry Curriculum Mount & Landscape Tablet Ergonomics (1600x1000)', async () => {
      const context = await browser.newContext({
        viewport: { width: 1600, height: 1000 },
        deviceScaleFactor: 2,
        hasTouch: true,
      });
      const page = await context.newPage();

      await page.goto(`${BASE_URL}/#/subject/chemistry`, { waitUntil: 'domcontentloaded' });
      await page.waitForSelector('.subject-screen-container', { timeout: 10000 });

      // Click "Launch Chemistry Explorer" banner button
      const launchBtn = page.locator('button:has-text("Launch Chemistry Explorer")');
      assert.equal(await launchBtn.count(), 1, 'Launch Chemistry Explorer button must exist');
      await launchBtn.click();

      await page.waitForURL('**/#/curriculum/chemistry');
      await page.waitForSelector('.chemistry-curriculum-root', { timeout: 10000 });

      // Verify header and metrics ribbon
      const headerText = await page.locator('.chemistry-curriculum-root header').textContent();
      assert.ok(headerText?.includes('Chemistry Curriculum & 14 Topic Adapters (C01–C14)'));
      assert.ok(headerText?.includes('14 Adapters (C01–C14)'));
      assert.ok(headerText?.includes('84 Subtopics'));
      assert.ok(headerText?.includes('252 QRT Tasks'));
      assert.ok(headerText?.includes('165 Questions'));
      assert.ok(headerText?.includes('Fault N09 Active'));

      await auditGeometry(page, 'Chemistry Hub 1600x1000 Landscape');
      await page.screenshot({ path: resolve(EVIDENCE_DIR, 'wave12_chemistry_hub_landscape_1600x1000.png') });
      await context.close();
    });

    // 2. Topic Adapters Grid & Scope Tier Switching
    await t.test('2. Topic Adapters Grid & Scope Tier Switching', async () => {
      const context = await browser.newContext({
        viewport: { width: 1600, height: 1000 },
        deviceScaleFactor: 2,
        hasTouch: true,
      });
      const page = await context.newPage();

      await page.goto(`${BASE_URL}/#/curriculum/chemistry`, { waitUntil: 'domcontentloaded' });
      await page.waitForSelector('.chem-adapter-card', { timeout: 10000 });

      // Count initial cards: all 14
      let cards = await page.locator('.chem-adapter-card').count();
      assert.equal(cards, 14, 'Should display all 14 topic adapters');

      // Click Foundation tier filter
      await page.locator('button[data-tier="FOUNDATION"]').click();
      cards = await page.locator('.chem-adapter-card').count();
      assert.equal(cards, 7, 'Foundation tier should display 7 adapters (C01–C07)');

      // Click Olympiad tier filter
      await page.locator('button[data-tier="OLYMPIAD"]').click();
      cards = await page.locator('.chem-adapter-card').count();
      assert.equal(cards, 7, 'Olympiad tier should display 7 adapters (C08–C14)');

      // Reset to All
      await page.locator('button[data-tier="ALL"]').click();
      cards = await page.locator('.chem-adapter-card').count();
      assert.equal(cards, 14, 'Should restore all 14 adapters');

      await page.screenshot({ path: resolve(EVIDENCE_DIR, 'wave12_chemistry_adapters_grid_1600x1000.png') });
      await context.close();
    });

    // 3. Subtopics Register Accordion & Misconceptions
    await t.test('3. Subtopics Register Accordion & Misconceptions', async () => {
      const context = await browser.newContext({
        viewport: { width: 1600, height: 1000 },
        deviceScaleFactor: 2,
        hasTouch: true,
      });
      const page = await context.newPage();

      await page.goto(`${BASE_URL}/#/curriculum/chemistry`, { waitUntil: 'domcontentloaded' });
      await page.waitForSelector('button[data-tab="subtopics"]', { timeout: 10000 });

      // Navigate to subtopics tab
      await page.locator('button[data-tab="subtopics"]').click();
      await page.waitForSelector('.subtopic-card', { timeout: 10000 });

      const stCount = await page.locator('.subtopic-card').count();
      assert.equal(stCount, 84, 'Subtopics register must display all 84 subtopics');

      // Expand first subtopic: Particle nature of matter (CHEM-C01.01)
      const firstSt = page.locator('.subtopic-card').first();
      await firstSt.locator('[data-action="toggle-subtopic"]').click();

      // Verify expanded elements
      await page.waitForSelector('text=Inquiry Hook', { timeout: 5000 });
      await page.waitForSelector('text=Core Phenomenological Exposition', { timeout: 5000 });
      await page.waitForSelector('text=Diagnostic Trap / Misconception', { timeout: 5000 });
      await page.waitForSelector('text=Olympiad Scope Boundary & Extension', { timeout: 5000 });

      await auditGeometry(page, 'Subtopics Register 1600x1000');
      await page.screenshot({ path: resolve(EVIDENCE_DIR, 'wave12_chemistry_subtopics_accordion_1600x1000.png') });
      await context.close();
    });

    // 4. QRT Cognitive Demand Explorer (252 Tasks)
    await t.test('4. QRT Cognitive Demand Explorer (252 Tasks)', async () => {
      const context = await browser.newContext({
        viewport: { width: 1600, height: 1000 },
        deviceScaleFactor: 2,
        hasTouch: true,
      });
      const page = await context.newPage();

      await page.goto(`${BASE_URL}/#/curriculum/chemistry`, { waitUntil: 'domcontentloaded' });
      await page.waitForSelector('button[data-tab="qrts"]', { timeout: 10000 });

      await page.locator('button[data-tab="qrts"]').click();
      await page.waitForSelector('.qrt-card', { timeout: 10000 });

      // Filter by MODEL operation
      await page.locator('button[data-qrt-op="MODEL"]').click();
      const modelCards = await page.locator('.qrt-card').count();
      assert.ok(modelCards > 0, 'Must show MODEL QRT cards');

      // Filter by D3 band
      await page.locator('button[data-qrt-band="D3"]').click();
      const d3Cards = await page.locator('.qrt-card').count();
      assert.ok(d3Cards > 0, 'Must show D3 MODEL QRT cards');

      // Verify pedagogical slots
      const firstQrt = page.locator('.qrt-card').first();
      const qrtText = await firstQrt.textContent();
      assert.ok(qrtText?.includes('Trapped Idea:'), 'Must show Trapped Idea misconception');
      assert.ok(qrtText?.includes('Decisive Rule:'), 'Must show Decisive Rule');
      assert.ok(qrtText?.includes('Visual Target:'), 'Must show Visual Target');
      assert.ok(qrtText?.includes('Check:'), 'Must show Check');

      await auditGeometry(page, 'QRT Demand Explorer 1600x1000');
      await page.screenshot({ path: resolve(EVIDENCE_DIR, 'wave12_chemistry_qrts_explorer_1600x1000.png') });
      await context.close();
    });

    // 5. Authentic Chemistry Question Bank (Fault N09 Answer Isolation)
    await t.test('5. Authentic Chemistry Question Bank (Fault N09 Answer Isolation)', async () => {
      const context = await browser.newContext({
        viewport: { width: 1600, height: 1000 },
        deviceScaleFactor: 2,
        hasTouch: true,
      });
      const page = await context.newPage();

      await page.goto(`${BASE_URL}/#/curriculum/chemistry`, { waitUntil: 'domcontentloaded' });
      await page.waitForSelector('button[data-tab="bank"]', { timeout: 10000 });

      await page.locator('button[data-tab="bank"]').click();
      await page.waitForSelector('.chem-question-card', { timeout: 10000 });

      const firstQ = page.locator('.chem-question-card').first();
      // Select an option
      const firstOpt = firstQ.locator('button[data-action="select-option"]').first();
      if (await firstOpt.count() > 0) {
        await firstOpt.click();
      }

      // Click Reveal Hints
      const hintBtn = firstQ.locator('button[data-action="toggle-hint"]');
      await hintBtn.click();

      // Verify hints revealed and Fault N09 key isolated
      await page.waitForSelector('text=Conceptual Scaffolding:', { timeout: 5000 });
      const qCardText = await firstQ.textContent();
      assert.ok(qCardText?.includes('Fault N09: Key Isolated'), 'Must enforce Fault N09 answer isolation');

      await auditGeometry(page, 'Question Bank 1600x1000');
      await page.screenshot({ path: resolve(EVIDENCE_DIR, 'wave12_chemistry_authentic_questions_1600x1000.png') });
      await context.close();
    });

    // 6. Interactive Stoichiometry & Atom Conservation Ledger
    await t.test('6. Interactive Stoichiometry & Atom Conservation Ledger', async () => {
      const context = await browser.newContext({
        viewport: { width: 1600, height: 1000 },
        deviceScaleFactor: 2,
        hasTouch: true,
      });
      const page = await context.newPage();

      await page.goto(`${BASE_URL}/#/curriculum/chemistry`, { waitUntil: 'domcontentloaded' });
      await page.waitForSelector('button[data-tab="workbench"]', { timeout: 10000 });

      await page.locator('button[data-tab="workbench"]').click();
      await page.waitForSelector('table', { timeout: 10000 });

      // Default Haber process is unbalanced (1 N2 + 1 H2 -> 1 NH3)
      let statusText = await page.locator('text=MASS CONSERVATION VIOLATED').textContent();
      assert.ok(statusText?.includes('VIOLATED'), 'Default Haber should be unbalanced');

      // Click "Apply Exact Balanced Coefficients"
      await page.locator('#btn-auto-balance').click();

      // Status should become balanced
      statusText = await page.locator('text=CONSERVATION SATISFIED').textContent();
      assert.ok(statusText?.includes('SATISFIED'), 'Should satisfy mass conservation when balanced');

      // Adjust coefficient using + button
      const plusBtn = page.locator('button[data-action="adjust-coeff"][data-delta="1"]').first();
      await plusBtn.click();

      // Should become unbalanced again
      statusText = await page.locator('text=MASS CONSERVATION VIOLATED').textContent();
      assert.ok(statusText?.includes('VIOLATED'), 'Adjusting coefficient must update balance status in real time');

      await auditGeometry(page, 'Stoichiometry Workbench 1600x1000');
      await page.screenshot({ path: resolve(EVIDENCE_DIR, 'wave12_chemistry_stoichiometry_workbench_1600x1000.png') });
      await context.close();
    });

    // 7. Portrait Tablet Ergonomics (1000x1600)
    await t.test('7. Portrait Tablet Ergonomics (1000x1600)', async () => {
      const context = await browser.newContext({
        viewport: { width: 1000, height: 1600 },
        deviceScaleFactor: 2,
        hasTouch: true,
      });
      const page = await context.newPage();

      await page.goto(`${BASE_URL}/#/curriculum/chemistry`, { waitUntil: 'domcontentloaded' });
      await page.waitForSelector('.chemistry-curriculum-root', { timeout: 10000 });

      // Verify zero overflow in portrait
      await auditGeometry(page, 'Chemistry Hub 1000x1600 Portrait');
      await page.screenshot({ path: resolve(EVIDENCE_DIR, 'wave12_chemistry_hub_portrait_1000x1600.png') });
      await context.close();
    });

  } finally {
    await browser.close();
  }
});
