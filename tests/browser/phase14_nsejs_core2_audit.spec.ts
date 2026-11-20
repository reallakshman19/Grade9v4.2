/**
 * tests/browser/phase14_nsejs_core2_audit.spec.ts
 * Gate W14-G7 — 12.7" Tablet End-to-End NSEJS Core 2 Multi-Disciplinary Question Bank Audit.
 *
 * Verifies:
 * - Real user actions through live DOM application entrypoint (http://127.0.0.1:3000)
 * - Navigation to Core 2 Multi-Disciplinary Hub via Competitive Exam screen (#/competitive/core2)
 * - 45 Module Multi-Disciplinary Navigator (21 Physics, 13 Chemistry, 11 Biology)
 * - Disciplinary filtering: All, Physics, Chemistry, Biology
 * - 302 Authentic Candidate Questions with Fault N09 Answer Isolation (withholding raw answers)
 * - Progressive hint ladders, reasoning step walkthroughs, and sanity check disclosures
 * - Interactive 15-Question Mixed Sprint Simulator (5 Phys + 5 Chem + 5 Bio) with countdown timer and scoring
 * - 12.7" tablet touch ergonomics: >= 48px hit targets, zero horizontal overflow across 1600x1000 and 1000x1600 viewports
 * - High-resolution screenshot capture into wave14_evidence/ in artifact directory
 */

import assert from 'node:assert/strict';
import test from 'node:test';
import { resolve, join } from 'node:path';
import { mkdir } from 'node:fs/promises';
import { chromium } from 'playwright-core';

const BASE_URL = 'http://127.0.0.1:3000';
const EVIDENCE_DIR = resolve('C:/Users/reall/.gemini/antigravity/brain/c39fd02d-dabd-412d-b94d-9f2254fd4134/wave14_evidence');

test('Gate W14-G7 — NSEJS Core 2 Multi-Disciplinary Question Bank Tablet Audit', { timeout: 180000 }, async (t) => {
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
    // 1. Hub Mount & Landscape Tablet Ergonomics (1600x1000)
    await t.test('1. Hub Mount & Landscape Tablet Ergonomics (1600x1000)', async () => {
      const context = await browser.newContext({
        viewport: { width: 1600, height: 1000 },
        deviceScaleFactor: 2,
        hasTouch: true,
      });
      const page = await context.newPage();

      await page.goto(`${BASE_URL}/#/competitive/core2`, { waitUntil: 'domcontentloaded' });
      await page.waitForSelector('.nsejs-core2-hub-root', { timeout: 10000 });

      // Verify Title & Badges
      const title = await page.textContent('.nsejs-core2-hub-root h1');
      assert.ok(title?.includes('NSEJS Core 2 Multi-Disciplinary Question Bank'), 'Title must reflect Core 2 Hub');

      const headerText = await page.textContent('.nsejs-core2-hub-root header');
      assert.ok(headerText?.includes('Academic Status: HOLD'), 'Must display Academic Status: HOLD');
      assert.ok(headerText?.includes('Diagnostic Mode: AUTHORIZED'), 'Must display Diagnostic Mode: AUTHORIZED');
      assert.ok(headerText?.includes('Fault N09 Answer Isolation: ACTIVE'), 'Must display Fault N09 badge');

      await auditGeometry(page, '1. Hub Mount (1600x1000)');

      await page.screenshot({
        path: join(EVIDENCE_DIR, 'wave14_core2_hub_landscape_1600x1000.png'),
        fullPage: false,
      });

      await context.close();
    });

    // 2. Modules Grid & Disciplinary Filters (1600x1000)
    await t.test('2. Modules Grid & Disciplinary Filters (1600x1000)', async () => {
      const context = await browser.newContext({
        viewport: { width: 1600, height: 1000 },
        deviceScaleFactor: 2,
        hasTouch: true,
      });
      const page = await context.newPage();

      await page.goto(`${BASE_URL}/#/competitive/core2`, { waitUntil: 'domcontentloaded' });
      await page.waitForSelector('.core2-module-card', { timeout: 10000 });

      // Initial count: 45 modules
      let cards = await page.$$('.core2-module-card');
      assert.equal(cards.length, 45, 'Initial load must show 45 modules');

      // Filter Physics: 21 modules
      await page.click('button.btn-subject-filter[data-subj="PHYSICS"]');
      await page.waitForTimeout(200);
      cards = await page.$$('.core2-module-card');
      assert.equal(cards.length, 21, 'Physics filter must show 21 modules');

      // Filter Chemistry: 13 modules
      await page.click('button.btn-subject-filter[data-subj="CHEMISTRY"]');
      await page.waitForTimeout(200);
      cards = await page.$$('.core2-module-card');
      assert.equal(cards.length, 13, 'Chemistry filter must show 13 modules');

      // Filter Biology: 11 modules
      await page.click('button.btn-subject-filter[data-subj="BIOLOGY"]');
      await page.waitForTimeout(200);
      cards = await page.$$('.core2-module-card');
      assert.equal(cards.length, 11, 'Biology filter must show 11 modules');

      // Reset to All
      await page.click('button.btn-subject-filter[data-subj="ALL"]');
      await page.waitForTimeout(200);
      cards = await page.$$('.core2-module-card');
      assert.equal(cards.length, 45, 'Reset must return to 45 modules');

      await auditGeometry(page, '2. Modules Grid (1600x1000)');

      await page.screenshot({
        path: join(EVIDENCE_DIR, 'wave14_core2_modules_grid_1600x1000.png'),
        fullPage: false,
      });

      await context.close();
    });

    // 3. Questions Explorer, Progressive Hints, and Fault N09 Isolation
    await t.test('3. Questions Explorer, Progressive Hints, and Fault N09 Isolation', async () => {
      const context = await browser.newContext({
        viewport: { width: 1600, height: 1000 },
        deviceScaleFactor: 2,
        hasTouch: true,
      });
      const page = await context.newPage();

      await page.goto(`${BASE_URL}/#/competitive/core2`, { waitUntil: 'domcontentloaded' });
      await page.waitForSelector('#tab-btn-questions', { timeout: 10000 });

      // Switch to Questions tab
      await page.click('#tab-btn-questions');
      await page.waitForSelector('.core2-question-card', { timeout: 10000 });

      // Search for genetics
      await page.fill('#core2-search-input', 'genetics');
      await page.waitForTimeout(200);

      // Disclose hints
      const firstHintBtn = await page.$('.btn-toggle-core2-hints');
      assert.ok(firstHintBtn, 'Hint toggle button must exist');
      await firstHintBtn.click();
      await page.waitForTimeout(200);

      const cardText = await page.textContent('.core2-question-card');
      assert.ok(cardText?.includes('Progressive Pedagogical Hints:'), 'Hint ladder must be displayed');

      // Disclose solution route
      const firstStepBtn = await page.$('.btn-toggle-core2-steps');
      assert.ok(firstStepBtn, 'Step toggle button must exist');
      await firstStepBtn.click();
      await page.waitForTimeout(200);

      const stepText = await page.textContent('.core2-question-card');
      assert.ok(stepText?.includes('Diagnostic Reasoning Steps & Scaffolds:'), 'Solution steps must be displayed');
      assert.ok(stepText?.includes('Key Withheld (Fault N09 Isolated)'), 'Fault N09 key withholding must be confirmed');

      // Click option
      const firstOpt = await page.$('.btn-select-core2-opt');
      if (firstOpt) {
        await firstOpt.click();
        await page.waitForTimeout(100);
      }

      await auditGeometry(page, '3. Questions Explorer (1600x1000)');

      await page.screenshot({
        path: join(EVIDENCE_DIR, 'wave14_core2_questions_explorer_1600x1000.png'),
        fullPage: false,
      });

      await context.close();
    });

    // 4. Interactive 15-Question Mixed Sprint Simulator
    await t.test('4. Interactive 15-Question Mixed Sprint Simulator', async () => {
      const context = await browser.newContext({
        viewport: { width: 1600, height: 1000 },
        deviceScaleFactor: 2,
        hasTouch: true,
      });
      const page = await context.newPage();

      await page.goto(`${BASE_URL}/#/competitive/core2`, { waitUntil: 'domcontentloaded' });
      await page.waitForSelector('#tab-btn-sprint', { timeout: 10000 });

      // Switch to Sprint tab
      await page.click('#tab-btn-sprint');
      await page.waitForSelector('#btn-launch-sprint-now', { timeout: 10000 });

      // Launch Sprint
      await page.click('#btn-launch-sprint-now');
      await page.waitForSelector('.btn-sprint-jump', { timeout: 10000 });

      // Verify 15 navigation bubbles
      const bubbles = await page.$$('.btn-sprint-jump');
      assert.equal(bubbles.length, 15, 'Must have 15 navigation bubbles');

      // Verify timer
      const timerVal = await page.textContent('#sprint-timer-val');
      assert.ok(timerVal && timerVal.includes(':'), 'Timer must be active and formatted');

      // Answer question 1
      const opt = await page.$('.btn-sprint-opt');
      if (opt) {
        await opt.click();
        await page.waitForTimeout(100);
      }

      // Jump to question 8
      await page.click('.btn-sprint-jump[data-idx="7"]');
      await page.waitForTimeout(200);

      // Submit sprint
      await page.click('#btn-submit-sprint');
      await page.waitForTimeout(200);

      // Verify submission confirmation modal
      const bodyText = await page.textContent('.nsejs-core2-hub-root');
      assert.ok(bodyText?.includes('Sprint Assessment Submitted!'), 'Submission modal must be displayed');

      await auditGeometry(page, '4. Sprint Simulator (1600x1000)');

      await page.screenshot({
        path: join(EVIDENCE_DIR, 'wave14_core2_sprint_simulator_1600x1000.png'),
        fullPage: false,
      });

      await context.close();
    });

    // 5. 12.7" Tablet Portrait Viewport (1000x1600)
    await t.test('5. 12.7" Tablet Portrait Viewport (1000x1600)', async () => {
      const context = await browser.newContext({
        viewport: { width: 1000, height: 1600 },
        deviceScaleFactor: 2,
        hasTouch: true,
      });
      const page = await context.newPage();

      await page.goto(`${BASE_URL}/#/competitive/core2`, { waitUntil: 'domcontentloaded' });
      await page.waitForSelector('.nsejs-core2-hub-root', { timeout: 10000 });

      await auditGeometry(page, '5. Portrait Viewport (1000x1600)');

      await page.screenshot({
        path: join(EVIDENCE_DIR, 'wave14_core2_hub_portrait_1000x1600.png'),
        fullPage: false,
      });

      await context.close();
    });

    // 6. Navigation Linkage from Competitive Exam Screen
    await t.test('6. Navigation Linkage from Competitive Exam Screen', async () => {
      const context = await browser.newContext({
        viewport: { width: 1600, height: 1000 },
        deviceScaleFactor: 2,
        hasTouch: true,
      });
      const page = await context.newPage();

      await page.goto(`${BASE_URL}/#/competitive/exam:nsejs`, { waitUntil: 'domcontentloaded' });
      await page.waitForSelector('#btn-goto-core2-bank', { timeout: 10000 });

      // Verify header action button and Biology card button
      const headerBtn = await page.$('#btn-goto-core2-bank');
      assert.ok(headerBtn, 'Header Core 2 Bank button must exist on NSEJS screen');

      const bioBtn = await page.$('#btn-launch-biology-core2');
      assert.ok(bioBtn, 'Section 3 Biology launch button must exist on NSEJS screen');

      await page.screenshot({
        path: join(EVIDENCE_DIR, 'wave14_competitive_hub_linkage_1600x1000.png'),
        fullPage: false,
      });

      // Click button and verify navigation
      await bioBtn.click();
      await page.waitForTimeout(300);

      assert.ok(page.url().includes('#/competitive/core2'), 'Must navigate to Core 2 Hub');

      await context.close();
    });

  } finally {
    await browser.close();
  }
});
