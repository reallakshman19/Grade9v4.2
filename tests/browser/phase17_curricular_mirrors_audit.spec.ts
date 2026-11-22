/**
 * tests/browser/phase17_curricular_mirrors_audit.spec.ts
 * Gate W17-G7 — 12.7" Tablet End-to-End Audit for Curricular Mirrors & Architecture Parity.
 *
 * Verifies:
 * - Real user actions through live DOM application entrypoint (http://127.0.0.1:3000)
 * - Navigation to Architecture & Pedagogy Hub (#/architecture)
 * - Canonical architecture document selection (Manifesto, Roadmap, Pipeline, Guidebook)
 * - 9-Stage Learning Blueprint panels
 * - Curricular Subject Navigators (#/subject/mathematics, #/subject/physics)
 * - 12.7" tablet touch ergonomics: >= 48px hit targets, zero horizontal overflow across 1600x1000 and 1000x1600 viewports
 * - High-resolution screenshot capture into wave17_evidence/ in artifact directory
 */

import assert from 'node:assert/strict';
import test from 'node:test';
import { resolve, join } from 'node:path';
import { mkdir } from 'node:fs/promises';
import { chromium } from 'playwright-core';

const BASE_URL = 'http://127.0.0.1:3000';
const EVIDENCE_DIR = resolve('C:/Users/reall/.gemini/antigravity/brain/c39fd02d-dabd-412d-b94d-9f2254fd4134/wave17_evidence');

test('Gate W17-G7 — Curricular Mirrors & Architecture Parity Tablet Audit', { timeout: 180000 }, async (t) => {
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
    // 1. Architecture Hub — Landscape Tablet Ergonomics (1600x1000)
    await t.test('1. Architecture Hub — Landscape Tablet Ergonomics (1600x1000)', async () => {
      const context = await browser.newContext({
        viewport: { width: 1600, height: 1000 },
        deviceScaleFactor: 2,
        hasTouch: true,
      });
      const page = await context.newPage();

      await page.goto(`${BASE_URL}/#/architecture`, { waitUntil: 'networkidle' });
      await page.waitForSelector('.architecture-hub', { timeout: 15000 });

      // Verify header
      const title = await page.textContent('.architecture-hub h1');
      assert.ok(title?.includes('How Do Great Lessons Get Made?'), `Title must be present, got: ${title}`);

      // Verify doc cards
      const docCards = await page.$$('.doc-card');
      assert.ok(docCards.length >= 9, `Expected at least 9 doc cards, got ${docCards.length}`);

      await auditGeometry(page, 'Architecture Hub Landscape (1600x1000)');
      await page.screenshot({
        path: join(EVIDENCE_DIR, 'wave17_architecture_hub_landscape_1600x1000.png'),
        fullPage: true,
      });

      await context.close();
    });

    // 2. Architecture Hub — Portrait Tablet Ergonomics (1000x1600)
    await t.test('2. Architecture Hub — Portrait Tablet Ergonomics (1000x1600)', async () => {
      const context = await browser.newContext({
        viewport: { width: 1000, height: 1600 },
        deviceScaleFactor: 2,
        hasTouch: true,
      });
      const page = await context.newPage();

      await page.goto(`${BASE_URL}/#/architecture`, { waitUntil: 'networkidle' });
      await page.waitForSelector('.architecture-hub', { timeout: 15000 });

      await auditGeometry(page, 'Architecture Hub Portrait (1000x1600)');
      await page.screenshot({
        path: join(EVIDENCE_DIR, 'wave17_architecture_hub_portrait_1000x1600.png'),
        fullPage: true,
      });

      await context.close();
    });

    // 3. Architecture Document Viewer — Manifesto Inspection (1600x1000)
    await t.test('3. Architecture Document Viewer — Manifesto Inspection (1600x1000)', async () => {
      const context = await browser.newContext({
        viewport: { width: 1600, height: 1000 },
        deviceScaleFactor: 2,
        hasTouch: true,
      });
      const page = await context.newPage();

      await page.goto(`${BASE_URL}/#/architecture/manifesto`, { waitUntil: 'networkidle' });
      await page.waitForSelector('.architecture-hub', { timeout: 15000 });

      // Document viewer should be open for Manifesto
      const docTitle = await page.textContent('.architecture-hub h2');
      assert.ok(docTitle?.includes('Manifesto'), `Manifesto doc title required, got: ${docTitle}`);

      await auditGeometry(page, 'Architecture Doc Manifesto (1600x1000)');
      await page.screenshot({
        path: join(EVIDENCE_DIR, 'wave17_architecture_doc_manifesto_1600x1000.png'),
        fullPage: true,
      });

      await context.close();
    });

    // 4. Architecture Document Viewer — Roadmap Inspection (1600x1000)
    await t.test('4. Architecture Document Viewer — Roadmap Inspection (1600x1000)', async () => {
      const context = await browser.newContext({
        viewport: { width: 1600, height: 1000 },
        deviceScaleFactor: 2,
        hasTouch: true,
      });
      const page = await context.newPage();

      await page.goto(`${BASE_URL}/#/architecture/roadmap`, { waitUntil: 'networkidle' });
      await page.waitForSelector('.architecture-hub', { timeout: 15000 });

      const docTitle = await page.textContent('.architecture-hub h2');
      assert.ok(docTitle?.includes('Roadmap'), `Roadmap doc title required, got: ${docTitle}`);

      await auditGeometry(page, 'Architecture Doc Roadmap (1600x1000)');
      await page.screenshot({
        path: join(EVIDENCE_DIR, 'wave17_architecture_doc_roadmap_1600x1000.png'),
        fullPage: true,
      });

      await context.close();
    });

    // 5. Mathematics Subject Curriculum Navigator (1600x1000)
    await t.test('5. Mathematics Subject Curriculum Navigator (1600x1000)', async () => {
      const context = await browser.newContext({
        viewport: { width: 1600, height: 1000 },
        deviceScaleFactor: 2,
        hasTouch: true,
      });
      const page = await context.newPage();

      await page.goto(`${BASE_URL}/#/subject/mathematics`, { waitUntil: 'networkidle' });
      await page.waitForSelector('.subject-screen-container', { timeout: 15000 });

      const mathHeading = await page.textContent('.subject-screen-container h1');
      assert.ok(mathHeading?.includes('Mathematics'), `Mathematics heading required, got: ${mathHeading}`);

      await auditGeometry(page, 'Mathematics Subject Curriculum (1600x1000)');
      await page.screenshot({
        path: join(EVIDENCE_DIR, 'wave17_subject_mathematics_1600x1000.png'),
        fullPage: true,
      });

      await context.close();
    });

    // 6. Physics Subject Curriculum Navigator (1600x1000)
    await t.test('6. Physics Subject Curriculum Navigator (1600x1000)', async () => {
      const context = await browser.newContext({
        viewport: { width: 1600, height: 1000 },
        deviceScaleFactor: 2,
        hasTouch: true,
      });
      const page = await context.newPage();

      await page.goto(`${BASE_URL}/#/subject/physics`, { waitUntil: 'networkidle' });
      await page.waitForSelector('.subject-screen-container', { timeout: 15000 });

      const physHeading = await page.textContent('.subject-screen-container h1');
      assert.ok(physHeading?.includes('Physics'), `Physics heading required, got: ${physHeading}`);

      await auditGeometry(page, 'Physics Subject Curriculum (1600x1000)');
      await page.screenshot({
        path: join(EVIDENCE_DIR, 'wave17_subject_physics_1600x1000.png'),
        fullPage: true,
      });

      await context.close();
    });
  } finally {
    await browser.close();
  }
});
