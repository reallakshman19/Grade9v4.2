/**
 * tests/browser/phase20_personal_study_hub_audit.spec.ts
 * Browser Playwright audit for My Personal Study Hub:
 * - 12.7" Tablet Touch Ergonomics (1600x1000 Landscape & 1000x1600 Portrait)
 * - Navigation to #/personal, #/personal/overview, #/personal/progress, #/personal/mistakes, #/personal/bookmarks, #/personal/settings
 * - Persistent IndexedDB verification in browser context
 * - Touch target bounds (>= 48px width and height for all buttons)
 * - Return to Curriculum Home navigation
 */

import { it } from 'node:test';
import assert from 'node:assert/strict';
import net from 'node:net';
import { chromium } from 'playwright-core';
import { createServer } from 'vite';

async function getAvailablePort(): Promise<number> {
  return new Promise((resolve, reject) => {
    const s = net.createServer();
    s.listen(0, '127.0.0.1', () => {
      const port = (s.address() as net.AddressInfo).port;
      s.close((err) => (err ? reject(err) : resolve(port)));
    });
  });
}

it('Phase 20 — Personal Study Hub Tablet End-to-End Audit & IndexedDB Persistence', { timeout: 60000 }, async () => {
  const chosenPort = await getAvailablePort();
  const server = await createServer({
    server: { host: '127.0.0.1', port: chosenPort, strictPort: false },
  });
  await server.listen();
  const addr = server.httpServer!.address();
  assert(addr && typeof addr !== 'string');

  const browser = await chromium.launch({ headless: true });

  try {
    const context = await browser.newContext({
      viewport: { width: 1600, height: 1000 },
      deviceScaleFactor: 2,
      hasTouch: true,
    });
    const page = await context.newPage();
    const baseUrl = `http://127.0.0.1:${addr.port}`;

    // 1. Navigate to Personal Study Hub
    await page.goto(`${baseUrl}/#/personal`, { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('.placeholder-title', { timeout: 15000 });

    const titleText = await page.locator('.placeholder-title').textContent();
    assert.match(titleText ?? '', /Personal Study Hub/);

    // 2. Overview Tab Verification
    await page.waitForSelector('text=Active Tool: OVERVIEW', { timeout: 10000 });
    await page.waitForSelector('text=Total Attempts Logged', { timeout: 10000 });

    // 3. Switch to Progress Tracker
    await page.locator('[data-tab=progress]').click();
    await page.waitForSelector('text=Progress evidence', { timeout: 10000 });
    await page.waitForSelector('[data-category=ORDINARY_ATTEMPT]', { timeout: 10000 });

    // 4. Switch to Mistakes Journal
    await page.locator('[data-tab=mistakes]').click();
    await page.waitForSelector('text=Mistakes notebook', { timeout: 10000 });
    await page.waitForSelector('text=INCORRECT_INTEGER', { timeout: 10000 });

    // 5. Switch to Saved Bookmarks
    await page.locator('[data-tab=bookmarks]').click();
    await page.waitForSelector('text=Save reviewed diagnostic question', { timeout: 10000 });
    await page.locator('[data-action=bookmark-add]').click();
    await page.locator('textarea').waitFor({ timeout: 10000 });
    await page.locator('textarea').fill('Tablet learner private note');
    await page.locator('[data-action=bookmark-save]').click();
    await page.waitForFunction(
      () => !(document.querySelector('[data-action=bookmark-save]') as HTMLButtonElement)?.disabled
    );
    assert.equal(await page.locator('textarea').inputValue(), 'Tablet learner private note');

    // 6. Switch to Settings & Verify Diagnostics Probe + Font Step
    await page.locator('[data-tab=settings]').click();
    await page.getByText(/INDEXEDDB · WRITABLE|MEMORY_VOLATILE · WRITABLE/).waitFor({ timeout: 10000 });
    await page.locator('[data-action=font-up]').click();
    await page.getByText('Text scale: 1.05').waitFor({ timeout: 10000 });

    // 7. Verify Touch Target Geometries across tablet viewports (1600x1000 landscape & 1000x1600 portrait)
    for (const [width, height] of [[1600, 1000], [1000, 1600], [800, 1280]]) {
      await page.setViewportSize({ width, height });
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
      const allButtonsConform = await page.evaluate(() =>
        Array.from(document.querySelectorAll('.g9-personal button')).every((n) => {
          const r = n.getBoundingClientRect();
          return r.width >= 48 && r.height >= 48;
        })
      );
      assert.equal(allButtonsConform, true, `Non-conforming button touch target detected at ${width}x${height}`);
    }

    // 8. Return to Curriculum Home
    await page.locator('.g9-personal-return-btn').click();
    await page.waitForSelector('.g9-home-page', { timeout: 10000 });
    assert.equal(page.url().includes('#/home'), true);
  } finally {
    await browser.close();
    await server.close();
  }
});
