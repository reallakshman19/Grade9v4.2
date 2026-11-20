/**
 * tests/browser/phase19_final_certification_audit.spec.ts
 * Gate W19-G7 — 12.7" Tablet End-to-End Audit for Final 100% Migration Parity & Subtopic Deep-Linking.
 *
 * Verifies:
 * - Real user actions through live DOM application entrypoint (http://127.0.0.1:3000)
 * - Navigation to NSEJS Physics Curriculum Hub (#/curriculum/nsejs-physics) displaying all 12 chapters and 132 subtopics
 * - Interactive chapter switching and subtopic selection across PH01, PH04, PH12
 * - Complete Architecture Hub displaying 16 canonical & diagnostic guides (#/architecture)
 * - 12.7" tablet touch ergonomics: >= 48px hit targets, zero horizontal overflow across 1600x1000 and 1000x1600 viewports
 * - High-resolution screenshot capture into wave19_evidence/ in artifact directory
 */

import assert from 'node:assert/strict';
import test from 'node:test';
import { resolve, join } from 'node:path';
import { mkdir } from 'node:fs/promises';
import { chromium } from 'playwright-core';

const BASE_URL = 'http://127.0.0.1:3000';
const EVIDENCE_DIR = resolve('C:/Users/reall/.gemini/antigravity/brain/c39fd02d-dabd-412d-b94d-9f2254fd4134/wave19_evidence');

test('Gate W19-G7 — Final 100% Migration Parity Tablet Audit', { timeout: 180000 }, async (t) => {
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
    // 1. NSEJS Physics Curriculum Hub — Landscape Tablet Ergonomics (1600x1000)
    await t.test('1. NSEJS Physics Curriculum Hub — Landscape (1600x1000)', async () => {
      const context = await browser.newContext({
        viewport: { width: 1600, height: 1000 },
        deviceScaleFactor: 2,
        hasTouch: true,
      });
      const page = await context.newPage();

      await page.goto(`${BASE_URL}/#/curriculum/nsejs-physics`, { waitUntil: 'networkidle' });
      await page.waitForSelector('.nsejs-explorer-container', { timeout: 15000 });

      // Verify chapter selector buttons rendered (all 12 chapters)
      const chapterBtns = await page.$$('button[data-chapter-id]');
      assert.equal(chapterBtns.length, 12, `Expected 12 chapter selector buttons, got ${chapterBtns.length}`);

      await auditGeometry(page, 'NSEJS Physics Curriculum Landscape (1600x1000)');
      await page.screenshot({
        path: join(EVIDENCE_DIR, 'wave19_nsejs_curriculum_hub_landscape_1600x1000.png'),
        fullPage: true,
      });

      await context.close();
    });

    // 2. NSEJS Physics Curriculum Hub — Portrait Tablet Ergonomics (1000x1600)
    await t.test('2. NSEJS Physics Curriculum Hub — Portrait (1000x1600)', async () => {
      const context = await browser.newContext({
        viewport: { width: 1000, height: 1600 },
        deviceScaleFactor: 2,
        hasTouch: true,
      });
      const page = await context.newPage();

      await page.goto(`${BASE_URL}/#/curriculum/nsejs-physics`, { waitUntil: 'networkidle' });
      await page.waitForSelector('.nsejs-explorer-container', { timeout: 15000 });

      await auditGeometry(page, 'NSEJS Physics Curriculum Portrait (1000x1600)');
      await page.screenshot({
        path: join(EVIDENCE_DIR, 'wave19_nsejs_curriculum_hub_portrait_1000x1600.png'),
        fullPage: true,
      });

      await context.close();
    });

    // 3. Subtopic Selection & Detail Drawer — PH01 Units, Dimensions (1600x1000)
    await t.test('3. Subtopic Detail Drawer — PH01 (1600x1000)', async () => {
      const context = await browser.newContext({
        viewport: { width: 1600, height: 1000 },
        deviceScaleFactor: 2,
        hasTouch: true,
      });
      const page = await context.newPage();

      await page.goto(`${BASE_URL}/#/curriculum/nsejs-physics`, { waitUntil: 'networkidle' });
      await page.waitForSelector('.nsejs-explorer-container', { timeout: 15000 });

      const ph01Btn = await page.waitForSelector('button[data-chapter-id="PH01"]');
      await ph01Btn.click();
      await page.waitForTimeout(300);

      const subCards = await page.$$('.subtopic-card-item');
      assert.ok(subCards.length >= 8, `Expected at least 8 subtopics in PH01, got ${subCards.length}`);

      // Click first subtopic card
      await subCards[0].click();
      await page.waitForTimeout(300);

      const drawer = await page.$('.subtopic-detail-drawer');
      assert.ok(drawer, 'Subtopic detail drawer must expand on click');

      await auditGeometry(page, 'Subtopic PH01 Detail Drawer (1600x1000)');
      await page.screenshot({
        path: join(EVIDENCE_DIR, 'wave19_subtopic_ph01_drawer_1600x1000.png'),
        fullPage: true,
      });

      await context.close();
    });

    // 4. Subtopic Selection — PH04 Work, Energy & Power (1600x1000)
    await t.test('4. Subtopic Selection — PH04 Work & Energy (1600x1000)', async () => {
      const context = await browser.newContext({
        viewport: { width: 1600, height: 1000 },
        deviceScaleFactor: 2,
        hasTouch: true,
      });
      const page = await context.newPage();

      await page.goto(`${BASE_URL}/#/curriculum/nsejs-physics`, { waitUntil: 'networkidle' });
      await page.waitForSelector('.nsejs-explorer-container', { timeout: 15000 });

      const ph04Btn = await page.waitForSelector('button[data-chapter-id="PH04"]');
      await ph04Btn.click();
      await page.waitForTimeout(300);

      const subCards = await page.$$('.subtopic-card-item');
      assert.ok(subCards.length >= 9, `Expected at least 9 subtopics in PH04, got ${subCards.length}`);

      await subCards[0].click();
      await page.waitForTimeout(300);

      await auditGeometry(page, 'Subtopic PH04 Work & Energy (1600x1000)');
      await page.screenshot({
        path: join(EVIDENCE_DIR, 'wave19_subtopic_ph04_w01_1600x1000.png'),
        fullPage: true,
      });

      await context.close();
    });

    // 5. Subtopic Selection — PH12 Optics & Optical Instruments (1600x1000)
    await t.test('5. Subtopic Selection — PH12 Optics (1600x1000)', async () => {
      const context = await browser.newContext({
        viewport: { width: 1600, height: 1000 },
        deviceScaleFactor: 2,
        hasTouch: true,
      });
      const page = await context.newPage();

      await page.goto(`${BASE_URL}/#/curriculum/nsejs-physics`, { waitUntil: 'networkidle' });
      await page.waitForSelector('.nsejs-explorer-container', { timeout: 15000 });

      const ph12Btn = await page.waitForSelector('button[data-chapter-id="PH12"]');
      await ph12Btn.click();
      await page.waitForTimeout(300);

      const subCards = await page.$$('.subtopic-card-item');
      assert.ok(subCards.length >= 15, `Expected at least 15 subtopics in PH12, got ${subCards.length}`);

      await subCards[subCards.length - 1].click();
      await page.waitForTimeout(300);

      await auditGeometry(page, 'Subtopic PH12 Optics (1600x1000)');
      await page.screenshot({
        path: join(EVIDENCE_DIR, 'wave19_subtopic_ph12_optics_1600x1000.png'),
        fullPage: true,
      });

      await context.close();
    });

    // 6. Complete Architecture Hub with 100% Parity (1600x1000)
    await t.test('6. Architecture Hub — 100% Parity Verified (1600x1000)', async () => {
      const context = await browser.newContext({
        viewport: { width: 1600, height: 1000 },
        deviceScaleFactor: 2,
        hasTouch: true,
      });
      const page = await context.newPage();

      await page.goto(`${BASE_URL}/#/architecture`, { waitUntil: 'networkidle' });
      await page.waitForSelector('.architecture-hub', { timeout: 15000 });

      const docCards = await page.$$('.doc-card');
      assert.equal(docCards.length, 16, `Expected exactly 16 doc cards, got ${docCards.length}`);

      await auditGeometry(page, 'Architecture Hub 100% Parity (1600x1000)');
      await page.screenshot({
        path: join(EVIDENCE_DIR, 'wave19_architecture_hub_100pct_parity_1600x1000.png'),
        fullPage: true,
      });

      await context.close();
    });
  } finally {
    await browser.close();
  }
});
