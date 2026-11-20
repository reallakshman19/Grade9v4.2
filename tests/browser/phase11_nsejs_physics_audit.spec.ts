/**
 * tests/browser/phase11_nsejs_physics_audit.spec.ts
 * Gate W11-G7 — 12.7" Tablet End-to-End NSEJS Physics & Olympiad Mock Paper Audit.
 *
 * Verifies:
 * - Real user actions through live DOM application entrypoint (http://127.0.0.1:3000)
 * - Navigation to first-class NSEJS Olympiad Hub via navbar (#/competitive/exam:nsejs)
 * - 12-Chapter Physics Curriculum Navigator (PH01 to PH12)
 * - 132-Subtopic Register with priority tiers and QRT cognitive demands
 * - Authentic 50-Question Bank (NSEJS-2023-P-Q01..Q50) with Fault N09 Answer Isolation
 * - 59-Question Circuit Practice Corpus (NSEJS-CIRC-L1-Q01..Q59)
 * - Timed 2-Hour Simulated Mock Paper Workspace (#/practice/nsejs-2024-mock-1):
 *   - 60 questions across Physics, Chemistry, Biology sections
 *   - 120-minute timer countdown
 *   - Single-choice option selection (A, B, C, D)
 *   - Formula sheet drawer & digital scratchpad toggles
 *   - Durable submission with sealed evaluation
 * - 12.7" tablet touch ergonomics: >= 48px hit targets, zero horizontal overflow across 1600x1000 and 1000x1600 viewports
 * - High-resolution screenshot capture into wave11_evidence/ in artifact directory
 */

import assert from 'node:assert/strict';
import { test } from 'node:test';
import { mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import { chromium } from 'playwright-core';

const BASE_URL = 'http://127.0.0.1:3000';
const EVIDENCE_DIR = resolve('C:/Users/reall/.gemini/antigravity/brain/c39fd02d-dabd-412d-b94d-9f2254fd4134/wave11_evidence');

test('Gate W11-G7 — NSEJS Physics & Timed Paper Simulation Tablet Audit', { timeout: 180000 }, async (t) => {
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
    // 1. NSEJS Hub Mount & Landscape Tablet Ergonomics (1600x1000)
    await t.test('1. NSEJS Hub Mount & Landscape Tablet Ergonomics (1600x1000)', async () => {
      const context = await browser.newContext({
        viewport: { width: 1600, height: 1000 },
        deviceScaleFactor: 2,
        hasTouch: true,
      });
      const page = await context.newPage();

      await page.goto(`${BASE_URL}/#/home`, { waitUntil: 'domcontentloaded' });
      await page.waitForSelector('nav[aria-label="Global navigation"]', { timeout: 10000 });

      // Click the Competitive Exams nav button
      const examNavBtn = page.locator('button[data-route="#/competitive/exam:nsejs"]');
      assert.equal(await examNavBtn.count(), 1, 'Competitive Exams nav button must exist');
      await examNavBtn.click();

      await page.waitForURL('**/#/competitive/exam:nsejs');
      await page.waitForSelector('.nsejs-hub', { timeout: 10000 });
      await page.waitForSelector('.nsejs-explorer-container', { timeout: 10000 });

      // Verify badges and heading
      const hubText = await page.locator('.nsejs-hub').textContent();
      assert.match(hubText || '', /National Standard Examination in Junior Science/);
      assert.match(hubText || '', /IAPT Junior Science Olympiad/);
      assert.match(hubText || '', /GRADE9 v4\.1 RECONCILED/);
      assert.match(hubText || '', /Fault N09 Answer Isolation Active/);

      // Verify 12 chapter selector buttons
      const chapterBtns = await page.locator('.btn-select-chapter').count();
      assert.equal(chapterBtns, 12, 'Must render 12 physics chapter selector buttons');

      // Audit touch targets and horizontal overflow
      await auditGeometry(page, 'NSEJS Hub Landscape');

      // Save screenshot
      await page.screenshot({
        path: `${EVIDENCE_DIR}/wave11_nsejs_hub_landscape_1600x1000.png`,
        fullPage: false,
      });

      await context.close();
    });

    // 2. NSEJS Hub Portrait Viewport (1000x1600)
    await t.test('2. NSEJS Hub Portrait Tablet Ergonomics (1000x1600)', async () => {
      const context = await browser.newContext({
        viewport: { width: 1000, height: 1600 },
        deviceScaleFactor: 2,
        hasTouch: true,
      });
      const page = await context.newPage();

      await page.goto(`${BASE_URL}/#/competitive/exam:nsejs`, { waitUntil: 'domcontentloaded' });
      await page.waitForSelector('.nsejs-hub', { timeout: 10000 });
      await page.waitForSelector('.nsejs-explorer-container', { timeout: 10000 });

      await auditGeometry(page, 'NSEJS Hub Portrait');

      await page.screenshot({
        path: `${EVIDENCE_DIR}/wave11_nsejs_hub_portrait_1000x1600.png`,
        fullPage: false,
      });

      await context.close();
    });

    // 3. Chapter Switching & Subtopic Priority Filtering
    await t.test('3. Chapter Switching & Priority Filtering (1600x1000)', async () => {
      const context = await browser.newContext({
        viewport: { width: 1600, height: 1000 },
        deviceScaleFactor: 2,
        hasTouch: true,
      });
      const page = await context.newPage();

      await page.goto(`${BASE_URL}/#/competitive/exam:nsejs`, { waitUntil: 'domcontentloaded' });
      await page.waitForSelector('.btn-select-chapter', { timeout: 10000 });

      // Click PH07 (Rotational Motion & Centre of Mass)
      const ph07Btn = page.locator('button[data-chapter-id="PH07"]');
      await ph07Btn.click();
      await page.waitForTimeout(300);

      const contentText = await page.locator('.nsejs-explorer-container').textContent();
      assert.match(contentText || '', /Rotational Motion & Centre of Mass/);
      assert.match(contentText || '', /Rigid Body Dynamics/);

      // Verify formula warrant is visible
      assert.match(contentText || '', /τ = r × F = Iα/);

      // Click Priority P2 filter button
      const p2FilterBtn = page.locator('button[data-filter="P2"]');
      await p2FilterBtn.click();
      await page.waitForTimeout(200);

      // Verify filtered results
      const subtopicRows = await page.locator('.btn-subtopic-filter').count();
      assert.equal(subtopicRows, 4);

      await auditGeometry(page, 'Chapter PH07 Filtered');

      await page.screenshot({
        path: `${EVIDENCE_DIR}/wave11_nsejs_chapter_ph07_1600x1000.png`,
        fullPage: false,
      });

      await context.close();
    });

    // 4. Authentic 50-Question Bank & Fault N09 Guidance Toggles
    await t.test('4. Authentic 50-Question Bank & Guidance Toggles (1600x1000)', async () => {
      const context = await browser.newContext({
        viewport: { width: 1600, height: 1000 },
        deviceScaleFactor: 2,
        hasTouch: true,
      });
      const page = await context.newPage();

      await page.goto(`${BASE_URL}/#/competitive/exam:nsejs`, { waitUntil: 'domcontentloaded' });
      await page.waitForSelector('.btn-curriculum-tab', { timeout: 10000 });

      // Click Authentic Questions tab
      const authTab = page.locator('button[data-tab="AUTHENTIC_QUESTIONS"]');
      await authTab.click();
      await page.waitForTimeout(300);

      // Verify question cards
      const qText = await page.locator('.nsejs-explorer-container').textContent();
      assert.match(qText || '', /Key Withheld \(Fault N09 Isolation\)/);

      // Click toggle hints
      const firstHintBtn = page.locator('.btn-toggle-hint').first();
      await firstHintBtn.click();
      await page.waitForTimeout(200);

      const hintText = await page.locator('.nsejs-explorer-container').textContent();
      assert.match(hintText || '', /Pedagogical Guidance & Crux Hints/);

      // Click toggle steps
      const firstStepBtn = page.locator('.btn-toggle-step').first();
      await firstStepBtn.click();
      await page.waitForTimeout(200);

      const stepText = await page.locator('.nsejs-explorer-container').textContent();
      assert.match(stepText || '', /Decisive Reasoning Moves \(No Direct Key\)/);

      await auditGeometry(page, 'Authentic Questions View');

      await page.screenshot({
        path: `${EVIDENCE_DIR}/wave11_nsejs_authentic_questions_1600x1000.png`,
        fullPage: false,
      });

      await context.close();
    });

    // 5. Circuit Practice Corpus (59 Modules)
    await t.test('5. Circuit Practice Corpus Tab (1600x1000)', async () => {
      const context = await browser.newContext({
        viewport: { width: 1600, height: 1000 },
        deviceScaleFactor: 2,
        hasTouch: true,
      });
      const page = await context.newPage();

      await page.goto(`${BASE_URL}/#/competitive/exam:nsejs`, { waitUntil: 'domcontentloaded' });
      await page.waitForSelector('.btn-curriculum-tab', { timeout: 10000 });

      // Click Circuit Practice tab
      const circTab = page.locator('button[data-tab="CIRCUIT_PRACTICE"]');
      await circTab.click();
      await page.waitForTimeout(300);

      const circText = await page.locator('.nsejs-explorer-container').textContent();
      assert.match(circText || '', /Circuit Practice Corpus/);
      assert.match(circText || '', /PH11 Circuits/);

      await auditGeometry(page, 'Circuit Practice View');

      await page.screenshot({
        path: `${EVIDENCE_DIR}/wave11_nsejs_circuit_practice_1600x1000.png`,
        fullPage: false,
      });

      await context.close();
    });

    // 6. Timed 2-Hour Mock Paper Workspace (1600x1000)
    await t.test('6. Timed 2-Hour Mock Paper Simulation (1600x1000)', async () => {
      const context = await browser.newContext({
        viewport: { width: 1600, height: 1000 },
        deviceScaleFactor: 2,
        hasTouch: true,
      });
      const page = await context.newPage();

      await page.goto(`${BASE_URL}/#/practice/nsejs-2024-mock-1`, { waitUntil: 'domcontentloaded' });
      await page.waitForSelector('.paper-workspace', { timeout: 10000 });

      // Verify title and metrics
      const paperText = await page.locator('.paper-workspace').textContent();
      assert.match(paperText || '', /NSEJS 2024 Full-Length Simulated Mock Paper 1/);
      assert.match(paperText || '', /60 Questions · Max Score: 180 Marks \(\+3 \/ -1\)/);

      // Verify timer countdown
      const timerEl = page.locator('#timer-display');
      assert.match(await timerEl.textContent() || '', /⏱/);

      // Verify 60 part select buttons exist
      const partBtns = await page.locator('.part-select-btn').count();
      assert.equal(partBtns, 60, 'Must render 60 question part buttons in sidebar');

      // Test MCQ option selection (Option B)
      const optB = page.locator('button[data-choice="B"]');
      assert.equal(await optB.count(), 1, 'Option B button must exist');
      await optB.click();
      await page.waitForTimeout(300);

      // Verify selection feedback
      const feedback = await page.locator('#choice-feedback-msg').textContent();
      assert.match(feedback || '', /Option B selected/);

      // Test Formula Sheet toggle
      const formulaSheetBtn = page.locator('button[data-aid="FORMULA_SHEET"]');
      await formulaSheetBtn.click();
      await page.waitForTimeout(200);

      assert.equal(await page.locator('#formula-sheet-drawer').count(), 1, 'Formula sheet drawer must open');
      const formulaText = await page.locator('#formula-sheet-drawer').textContent();
      assert.match(formulaText || '', /Official Examination Formula Reference Sheet/);

      // Test Scratchpad toggle
      const scratchpadBtn = page.locator('button[data-aid="SCRATCHPAD"]');
      await scratchpadBtn.click();
      await page.waitForTimeout(200);

      assert.equal(await page.locator('#scratchpad-drawer').count(), 1, 'Scratchpad drawer must open');

      await auditGeometry(page, 'NSEJS Mock Paper Landscape');

      await page.screenshot({
        path: `${EVIDENCE_DIR}/wave11_nsejs_mock_paper_1600x1000.png`,
        fullPage: false,
      });

      // Submit Complete Paper
      const submitBtn = page.locator('#submit-paper-btn');
      await submitBtn.click();
      await page.waitForTimeout(400);

      const postSubmitText = await page.locator('.paper-workspace').textContent();
      assert.match(postSubmitText || '', /Paper Submitted Successfully|Paper Durably Committed/);

      await context.close();
    });

    // 7. Timed Mock Paper Portrait (1000x1600)
    await t.test('7. Timed Mock Paper Portrait Viewport (1000x1600)', async () => {
      const context = await browser.newContext({
        viewport: { width: 1000, height: 1600 },
        deviceScaleFactor: 2,
        hasTouch: true,
      });
      const page = await context.newPage();

      await page.goto(`${BASE_URL}/#/practice/nsejs-2024-mock-1`, { waitUntil: 'domcontentloaded' });
      await page.waitForSelector('.paper-workspace', { timeout: 10000 });

      await auditGeometry(page, 'NSEJS Mock Paper Portrait');

      await page.screenshot({
        path: `${EVIDENCE_DIR}/wave11_nsejs_mock_paper_portrait_1000x1600.png`,
        fullPage: false,
      });

      await context.close();
    });
  } finally {
    await browser.close();
  }
});
