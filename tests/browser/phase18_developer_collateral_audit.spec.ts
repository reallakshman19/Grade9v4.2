/**
 * tests/browser/phase18_developer_collateral_audit.spec.ts
 * Gate W18-G7 — 12.7" Tablet End-to-End Audit for Developer Collateral, Benchmarks & Diagnostics.
 *
 * Verifies:
 * - Real user actions through live DOM application entrypoint (http://127.0.0.1:3000)
 * - Navigation to Architecture & Pedagogy Hub (#/architecture) displaying all 16 canonical & diagnostic guides
 * - Deep linking to diagnostic documents:
 *   1. Quality Calibration Specimens & Tablet Benchmarks (#/architecture/benchmarks)
 *   2. Workspace Legacy ChatGPT & Research Logs (#/architecture/workspace-audit)
 *   3. Historical Review Evidence Packets (#/architecture/evidence-packets)
 *   4. Ephemeral Build Previews (#/architecture/preview-batches)
 * - 12.7" tablet touch ergonomics: >= 48px hit targets, zero horizontal overflow across 1600x1000 and 1000x1600 viewports
 * - High-resolution screenshot capture into wave18_evidence/ in artifact directory
 */

import assert from 'node:assert/strict';
import test from 'node:test';
import { resolve, join } from 'node:path';
import { mkdir } from 'node:fs/promises';
import { chromium } from 'playwright-core';

const BASE_URL = 'http://127.0.0.1:3000';
const EVIDENCE_DIR = resolve('C:/Users/reall/.gemini/antigravity/brain/c39fd02d-dabd-412d-b94d-9f2254fd4134/wave18_evidence');

test('Gate W18-G7 — Developer Collateral & Benchmark Parity Tablet Audit', { timeout: 180000 }, async (t) => {
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
    await t.test('1. Architecture Hub with Full 16-Doc Suite — Landscape (1600x1000)', async () => {
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

      // Verify all 16 doc cards rendered
      const docCards = await page.$$('.doc-card');
      assert.equal(docCards.length, 16, `Expected exactly 16 doc cards, got ${docCards.length}`);

      await auditGeometry(page, 'Architecture Hub Landscape (1600x1000)');
      await page.screenshot({
        path: join(EVIDENCE_DIR, 'wave18_architecture_hub_landscape_1600x1000.png'),
        fullPage: true,
      });

      await context.close();
    });

    // 2. Architecture Hub — Portrait Tablet Ergonomics (1000x1600)
    await t.test('2. Architecture Hub with Full 16-Doc Suite — Portrait (1000x1600)', async () => {
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
        path: join(EVIDENCE_DIR, 'wave18_architecture_hub_portrait_1000x1600.png'),
        fullPage: true,
      });

      await context.close();
    });

    // 3. Diagnostic Document Viewer — Benchmarks & Specimens (1600x1000)
    await t.test('3. Diagnostic Document Viewer — Benchmarks & Specimens (1600x1000)', async () => {
      const context = await browser.newContext({
        viewport: { width: 1600, height: 1000 },
        deviceScaleFactor: 2,
        hasTouch: true,
      });
      const page = await context.newPage();

      await page.goto(`${BASE_URL}/#/architecture/benchmarks`, { waitUntil: 'networkidle' });
      await page.waitForSelector('.architecture-hub', { timeout: 15000 });

      const docTitle = await page.textContent('.architecture-hub h2');
      assert.ok(docTitle?.includes('Calibration Specimens') || docTitle?.includes('Benchmarks'), `Benchmarks title required, got: ${docTitle}`);

      await auditGeometry(page, 'Diagnostic Benchmarks Viewer (1600x1000)');
      await page.screenshot({
        path: join(EVIDENCE_DIR, 'wave18_diagnostic_benchmarks_1600x1000.png'),
        fullPage: true,
      });

      await context.close();
    });

    // 4. Diagnostic Document Viewer — Workspace Logs & Scraped Research (1600x1000)
    await t.test('4. Diagnostic Document Viewer — Workspace Logs & Scraped Research (1600x1000)', async () => {
      const context = await browser.newContext({
        viewport: { width: 1600, height: 1000 },
        deviceScaleFactor: 2,
        hasTouch: true,
      });
      const page = await context.newPage();

      await page.goto(`${BASE_URL}/#/architecture/workspace-audit`, { waitUntil: 'networkidle' });
      await page.waitForSelector('.architecture-hub', { timeout: 15000 });

      const docTitle = await page.textContent('.architecture-hub h2');
      assert.ok(docTitle?.includes('Workspace Legacy') || docTitle?.includes('Research Logs'), `Workspace title required, got: ${docTitle}`);

      await auditGeometry(page, 'Diagnostic Workspace Audit Viewer (1600x1000)');
      await page.screenshot({
        path: join(EVIDENCE_DIR, 'wave18_diagnostic_workspace_audit_1600x1000.png'),
        fullPage: true,
      });

      await context.close();
    });

    // 5. Diagnostic Document Viewer — Evidence Packets & PR Checkers (1600x1000)
    await t.test('5. Diagnostic Document Viewer — Evidence Packets & PR Checkers (1600x1000)', async () => {
      const context = await browser.newContext({
        viewport: { width: 1600, height: 1000 },
        deviceScaleFactor: 2,
        hasTouch: true,
      });
      const page = await context.newPage();

      await page.goto(`${BASE_URL}/#/architecture/evidence-packets`, { waitUntil: 'networkidle' });
      await page.waitForSelector('.architecture-hub', { timeout: 15000 });

      const docTitle = await page.textContent('.architecture-hub h2');
      assert.ok(docTitle?.includes('Evidence Packets'), `Evidence packets title required, got: ${docTitle}`);

      await auditGeometry(page, 'Diagnostic Evidence Packets Viewer (1600x1000)');
      await page.screenshot({
        path: join(EVIDENCE_DIR, 'wave18_diagnostic_evidence_packets_1600x1000.png'),
        fullPage: true,
      });

      await context.close();
    });

    // 6. Diagnostic Document Viewer — Ephemeral Preview Batches (1600x1000)
    await t.test('6. Diagnostic Document Viewer — Ephemeral Preview Batches (1600x1000)', async () => {
      const context = await browser.newContext({
        viewport: { width: 1600, height: 1000 },
        deviceScaleFactor: 2,
        hasTouch: true,
      });
      const page = await context.newPage();

      await page.goto(`${BASE_URL}/#/architecture/preview-batches`, { waitUntil: 'networkidle' });
      await page.waitForSelector('.architecture-hub', { timeout: 15000 });

      const docTitle = await page.textContent('.architecture-hub h2');
      assert.ok(docTitle?.includes('Ephemeral Build Previews') || docTitle?.includes('Alpha Boards'), `Preview title required, got: ${docTitle}`);

      await auditGeometry(page, 'Diagnostic Preview Batches Viewer (1600x1000)');
      await page.screenshot({
        path: join(EVIDENCE_DIR, 'wave18_diagnostic_preview_batches_1600x1000.png'),
        fullPage: true,
      });

      await context.close();
    });
  } finally {
    await browser.close();
  }
});
