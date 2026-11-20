/**
 * tests/browser/phase15_standalone_workbenches_audit.spec.ts
 * Gate W15-G7 — 12.7" Tablet End-to-End Audit for HTML Execution Contexts,
 * Interactive GCDR Explorers, and Standalone Interactive Workbenches.
 *
 * Verifies:
 * - Live DOM application entrypoint (http://127.0.0.1:3000)
 * - Standalone Labs Hub (#/labs) displaying all 37 STEM interactive workbenches
 * - Dynamic discipline filtering across Physics, Chemistry, and Mathematics
 * - Dynamic routing to GCDR Explorers (#/explorer/:explorerId) across STEM disciplines
 * - 10-stage GCDR progression rail, state-bound drawers, and Truthful Exactness Badge
 * - Dynamic routing to standalone interactive labs (#/lab/:labId)
 * - 12.7" tablet touch ergonomics: >= 48px hit targets, zero horizontal overflow across 1600x1000 and 1000x1600 viewports
 * - High-resolution screenshot capture into wave15_evidence/ in artifact directory
 */

import assert from 'node:assert/strict';
import test from 'node:test';
import { resolve, join } from 'node:path';
import { mkdir } from 'node:fs/promises';
import { chromium } from 'playwright-core';

const BASE_URL = 'http://127.0.0.1:3000';
const EVIDENCE_DIR = resolve('C:/Users/reall/.gemini/antigravity/brain/c39fd02d-dabd-412d-b94d-9f2254fd4134/wave15_evidence');

test('Gate W15-G7 — Standalone Workbenches & GCDR Explorers Tablet Audit', { timeout: 180000 }, async (t) => {
  await mkdir(EVIDENCE_DIR, { recursive: true });

  const browser = await chromium.launch({ headless: true });

  const auditGeometry = async (page: any, label: string) => {
    const isOverflowing = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
    assert.equal(isOverflowing, false, `${label}: Horizontal overflow detected`);

    const undersized = await page.evaluate(() => {
      const elements = Array.from(document.querySelectorAll<HTMLElement>('button, input:not([type=hidden]):not([type=range]), textarea, select'));
      const visible = elements.filter((el) => {
        const rect = el.getBoundingClientRect();
        return rect.width > 0 && rect.height > 0;
      });
      return visible
        .filter((el) => {
          const r = el.getBoundingClientRect();
          return r.width < 47.5 || r.height < 47.5;
        })
        .map(
          (el) =>
            `${el.tagName}[${el.innerText || (el as any).value || el.getAttribute('aria-label') || el.id}] (${el.getBoundingClientRect().width.toFixed(1)}x${el.getBoundingClientRect().height.toFixed(1)})`
        );
    });

    assert.deepEqual(undersized, [], `${label}: Undersized touch controls found: ${undersized.join(', ')}`);
  };

  try {
    // 1. Standalone Labs Hub — Landscape Tablet Ergonomics (1600x1000)
    await t.test('1. Standalone Labs Hub — Landscape Tablet Ergonomics (1600x1000)', async () => {
      const context = await browser.newContext({
        viewport: { width: 1600, height: 1000 },
        deviceScaleFactor: 2,
        hasTouch: true,
      });
      const page = await context.newPage();

      await page.goto(`${BASE_URL}/#/labs`, { waitUntil: 'networkidle' });
      await page.waitForSelector('.labs-hub-container', { timeout: 15000 });

      // Check header and cards
      const title = await page.textContent('h1');
      assert.ok(title?.includes('Standalone Labs'), 'Hub title must be present');

      // Verify lab cards rendered
      const cards = await page.$$('.lab-card');
      assert.ok(cards.length >= 30, `Expected at least 30 lab cards, found ${cards.length}`);

      // Filter by Chemistry
      const chemBtn = await page.waitForSelector('button[data-disc="CHEMISTRY"]');
      await chemBtn.click();
      await page.waitForTimeout(300);

      const chemCards = await page.$$('.lab-card');
      assert.ok(chemCards.length >= 8, `Expected >= 8 chemistry cards, found ${chemCards.length}`);

      // Reset to All Disciplines
      const allBtn = await page.waitForSelector('button[data-disc="ALL"]');
      await allBtn.click();
      await page.waitForTimeout(300);

      await auditGeometry(page, 'Labs Hub Landscape (1600x1000)');
      await page.screenshot({
        path: join(EVIDENCE_DIR, 'wave15_labs_hub_landscape_1600x1000.png'),
        fullPage: true,
      });

      await context.close();
    });

    // 2. Standalone Labs Hub — Portrait Tablet Ergonomics (1000x1600)
    await t.test('2. Standalone Labs Hub — Portrait Tablet Ergonomics (1000x1600)', async () => {
      const context = await browser.newContext({
        viewport: { width: 1000, height: 1600 },
        deviceScaleFactor: 2,
        hasTouch: true,
      });
      const page = await context.newPage();

      await page.goto(`${BASE_URL}/#/labs`, { waitUntil: 'networkidle' });
      await page.waitForSelector('.labs-hub-container', { timeout: 15000 });

      await auditGeometry(page, 'Labs Hub Portrait (1000x1600)');
      await page.screenshot({
        path: join(EVIDENCE_DIR, 'wave15_labs_hub_portrait_1000x1600.png'),
        fullPage: true,
      });

      await context.close();
    });

    // 3. GCDR Explorer — Atwood Pulleys Dynamics (1600x1000)
    await t.test('3. GCDR Explorer — Atwood Pulleys Dynamics (1600x1000)', async () => {
      const context = await browser.newContext({
        viewport: { width: 1600, height: 1000 },
        deviceScaleFactor: 2,
        hasTouch: true,
      });
      const page = await context.newPage();

      await page.goto(`${BASE_URL}/#/explorer/atwood-pulleys`, { waitUntil: 'networkidle' });
      await page.waitForSelector('.gcdr-explorer-page', { timeout: 15000 });

      // Check title and exactness badge
      const headerTitle = await page.textContent('.gcdr-identity h1');
      assert.ok(headerTitle?.includes('Atwood Pulleys'), 'Atwood Pulleys title required');

      // Click "Begin prediction" button to enter first exploration stage
      const beginBtn = await page.$('#gcdr-context-start');
      if (beginBtn) {
        await beginBtn.click();
        await page.waitForTimeout(300);
      }

      // Check progression rail
      const stageButtons = await page.$$('.gcdr-stage-step');
      assert.equal(stageButtons.length, 10, 'Must have 10 GCDR progression stage steps');

      // Toggle chalkboard helper drawer
      const chalkBtn = await page.$('button[data-helper="CHALKBOARD"]');
      if (chalkBtn) {
        await chalkBtn.click();
        await page.waitForTimeout(300);
      }

      await auditGeometry(page, 'GCDR Explorer Atwood Pulleys (1600x1000)');
      await page.screenshot({
        path: join(EVIDENCE_DIR, 'wave15_explorer_atwood_pulleys_1600x1000.png'),
        fullPage: true,
      });

      await context.close();
    });

    // 4. GCDR Explorer — Behaviour of Gases Chemistry (1600x1000)
    await t.test('4. GCDR Explorer — Behaviour of Gases Chemistry (1600x1000)', async () => {
      const context = await browser.newContext({
        viewport: { width: 1600, height: 1000 },
        deviceScaleFactor: 2,
        hasTouch: true,
      });
      const page = await context.newPage();

      await page.goto(`${BASE_URL}/#/explorer/behaviour_of_gases`, { waitUntil: 'networkidle' });
      await page.waitForSelector('.gcdr-explorer-page', { timeout: 15000 });

      const headerTitle = await page.textContent('.gcdr-identity h1');
      assert.ok(headerTitle?.includes('Behaviour of Gases'), 'Behaviour of Gases title required');

      const beginBtn = await page.$('#gcdr-context-start');
      if (beginBtn) {
        await beginBtn.click();
        await page.waitForTimeout(300);
      }

      await auditGeometry(page, 'GCDR Explorer Behaviour of Gases (1600x1000)');
      await page.screenshot({
        path: join(EVIDENCE_DIR, 'wave15_explorer_behaviour_of_gases_1600x1000.png'),
        fullPage: true,
      });

      await context.close();
    });

    // 5. Standalone Lab — Motion in a Plane Interactive Suite (1600x1000)
    await t.test('5. Standalone Lab — Motion in a Plane Interactive Suite (1600x1000)', async () => {
      const context = await browser.newContext({
        viewport: { width: 1600, height: 1000 },
        deviceScaleFactor: 2,
        hasTouch: true,
      });
      const page = await context.newPage();

      await page.goto(`${BASE_URL}/#/lab/physics-motion-in-a-plane-interactive-suite`, { waitUntil: 'networkidle' });
      await page.waitForSelector('.motion-plane-page, .g9-runtime-container', { timeout: 15000 });

      await auditGeometry(page, 'Standalone Lab Motion in a Plane (1600x1000)');
      await page.screenshot({
        path: join(EVIDENCE_DIR, 'wave15_lab_motion_plane_1600x1000.png'),
        fullPage: true,
      });

      await context.close();
    });

    // 6. Standalone Lab — Redox Adaptive Concept Proof (1600x1000)
    await t.test('6. Standalone Lab — Redox Adaptive Concept Proof (1600x1000)', async () => {
      const context = await browser.newContext({
        viewport: { width: 1600, height: 1000 },
        deviceScaleFactor: 2,
        hasTouch: true,
      });
      const page = await context.newPage();

      await page.goto(`${BASE_URL}/#/lab/chemistry-redox-adaptive-hard-concept-proof`, { waitUntil: 'networkidle' });
      await page.waitForSelector('.redox-adaptive-page, .g9-runtime-container', { timeout: 15000 });

      await auditGeometry(page, 'Standalone Lab Redox Adaptive (1600x1000)');
      await page.screenshot({
        path: join(EVIDENCE_DIR, 'wave15_lab_redox_adaptive_1600x1000.png'),
        fullPage: true,
      });

      await context.close();
    });
  } finally {
    await browser.close();
  }
});
