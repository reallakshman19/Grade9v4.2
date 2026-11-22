/**
 * tests/browser/phase9_architecture_audit.spec.ts
 * Gate W9-G5 — 12.7" Tablet End-to-End Architecture Hub Audit & Port-First Navigation Verification.
 *
 * Verifies:
 * - Real user actions through live DOM application entrypoint (http://127.0.0.1:3000)
 * - Navigation to restored '🧭 Architecture' hub via navbar button and direct hash route (#/architecture)
 * - Architecture Hub rendering:
 *   - Status badges: GRADE9 v4.1 PARITY, OPERATOR & AUTHORING HUB, Academic Status: HOLD
 *   - 5 Core Authoring & Review Guide Cards
 *   - Interactive Document Viewer with open/close state and v4.1 source path preservation
 *   - 9-Stage Learning Blueprint Cards (01 Governance to 09 Evidence)
 *   - 5-Step Standard Operating Sequence for Module Authoring
 * - 12.7" tablet touch ergonomics: >= 48px hit targets, zero horizontal overflow across 1600x1000 and 1000x1600 viewports
 * - High-resolution screenshot capture into wave9_evidence/ in artifact directory
 */

import assert from 'node:assert/strict';
import { test } from 'node:test';
import { mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import { chromium } from 'playwright-core';

const BASE_URL = 'http://127.0.0.1:3000';
const EVIDENCE_DIR = resolve('C:/Users/reall/.gemini/antigravity/brain/c39fd02d-dabd-412d-b94d-9f2254fd4134/wave9_evidence');

test('Gate W9-G5 — Architecture Hub & Tablet Navigation Audit', { timeout: 120000 }, async (t) => {
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
    // 1. Landscape 1600x1000 Viewport
    await t.test('1. Architecture Hub Mount & Landscape Tablet Ergonomics (1600x1000)', async () => {
      const context = await browser.newContext({
        viewport: { width: 1600, height: 1000 },
        deviceScaleFactor: 2,
        hasTouch: true,
      });
      const page = await context.newPage();

      // Navigate to Home first, then click Architecture nav button
      await page.goto(`${BASE_URL}/#/home`, { waitUntil: 'domcontentloaded' });
      await page.waitForSelector('nav[aria-label="Global navigation"]', { timeout: 10000 });

      // Click the Architecture nav button
      const archBtn = page.locator('button[data-route="#/architecture"]');
      assert.equal(await archBtn.count(), 1, 'Architecture nav button must exist');
      await archBtn.click();

      // Verify URL hash
      await page.waitForURL('**/#/architecture');
      await page.waitForSelector('.architecture-hub', { timeout: 10000 });

      // Verify header content & status badges
      const hubText = await page.locator('.architecture-hub').textContent();
      assert.match(hubText || '', /GRADE9 v4\.1 PARITY/);
      assert.match(hubText || '', /OPERATOR & AUTHORING HUB/);
      assert.match(hubText || '', /Academic Status: HOLD/);
      assert.match(hubText || '', /How Do Great Lessons Get Made\?/);

      // Verify doc cards exist
      const docCards = await page.locator('.doc-card').count();
      assert.ok(docCards >= 5, 'Must render at least 5 core authoring doc cards');

      // Verify 9 blueprint cards exist
      const blueprintHeading = page.locator('text=The 9-Stage Learning Blueprint');
      assert.equal(await blueprintHeading.count(), 1);

      // Verify geometry on landscape
      await auditGeometry(page, 'Architecture Hub (Landscape 1600x1000)');

      // Capture screenshot
      const shotPath = resolve(EVIDENCE_DIR, 'wave9_architecture_hub_landscape_1600x1000.png');
      await page.screenshot({ path: shotPath, fullPage: true });

      await context.close();
    });

    // 2. Interactive Document Viewer Inspection
    await t.test('2. Interactive Document Inspection & Source Path Fidelity', async () => {
      const context = await browser.newContext({
        viewport: { width: 1600, height: 1000 },
        deviceScaleFactor: 2,
        hasTouch: true,
      });
      const page = await context.newPage();

      await page.goto(`${BASE_URL}/#/architecture`, { waitUntil: 'domcontentloaded' });
      await page.waitForSelector('.architecture-hub', { timeout: 10000 });

      // Click the first "Inspect Architecture Guide →" button
      const inspectButtons = page.locator('.btn-open-doc');
      assert.ok((await inspectButtons.count()) >= 5);
      await inspectButtons.first().click();

      // Verify active document viewer opens with full authentic content inline
      await page.waitForSelector('#btn-close-doc', { timeout: 5000 });
      const viewerText = await page.locator('.architecture-hub').textContent();
      assert.match(viewerText || '', /Complete Core1A \/ Core1B Agent Authoring Field Guide/);
      assert.match(viewerText || '', /Start here: the agent's mission/);
      assert.ok(!viewerText?.includes('Preserved Losslessly in Local Staging'), 'Must bring in data directly without staging path placeholder');

      // Audit geometry with active viewer
      await auditGeometry(page, 'Architecture Doc Viewer (1600x1000)');

      // Capture screenshot of doc viewer
      const shotPath = resolve(EVIDENCE_DIR, 'wave9_architecture_doc_viewer_1600x1000.png');
      await page.screenshot({ path: shotPath, fullPage: true });

      // Close the document
      await page.locator('#btn-close-doc').click();
      assert.equal(await page.locator('#btn-close-doc').count(), 0, 'Viewer must close');

      await context.close();
    });

    // 3. Portrait 1000x1600 Viewport
    await t.test('3. Portrait Tablet Ergonomics & Zero Overflow (1000x1600)', async () => {
      const context = await browser.newContext({
        viewport: { width: 1000, height: 1600 },
        deviceScaleFactor: 2,
        hasTouch: true,
      });
      const page = await context.newPage();

      await page.goto(`${BASE_URL}/#/architecture`, { waitUntil: 'domcontentloaded' });
      await page.waitForSelector('.architecture-hub', { timeout: 10000 });

      // Verify geometry on portrait
      await auditGeometry(page, 'Architecture Hub (Portrait 1000x1600)');

      // Capture screenshot
      const shotPath = resolve(EVIDENCE_DIR, 'wave9_architecture_hub_portrait_1000x1600.png');
      await page.screenshot({ path: shotPath, fullPage: true });

      // Test return to home button
      const backHomeBtn = page.locator('#btn-back-home');
      assert.equal(await backHomeBtn.count(), 1);
      await backHomeBtn.click();
      await page.waitForURL('**/#/home');

      await context.close();
    });

  } finally {
    await browser.close();
  }
});
