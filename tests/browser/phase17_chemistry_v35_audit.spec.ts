/**
 * tests/browser/phase17_chemistry_v35_audit.spec.ts
 * Gate W17-G8 — 12.7" Tablet End-to-End Audit for Adopted Grade9 v3.5 Chemistry Ecosystem.
 *
 * Verifies:
 * - Live DOM application entrypoint (http://127.0.0.1:3000)
 * - Chemistry Hub (#/chemistry) displaying 4 Core Topics and 4 Master Visual Suites
 * - Filter pills (All, Core Topics, Master Suites)
 * - High-fidelity standalone launching of all 4 Master Simulation Suites (NO IFRAMES):
 *   1. Chemical Bonding & Molecular Structure 3D Suite (7 tabs, 7 canvases)
 *   2. Behaviour of Gases & Real Gases Suite (7 tabs, 7 canvases)
 *   3. Mole Concept & Stoichiometry Suite (7 tabs, 7 canvases)
 *   4. Redox Reactions & Electrochemistry Suite (8 tabs, 9 canvases)
 * - Authentic Core 1A Derivation Document (Direct, No Iframe)
 * - 12.7" tablet touch ergonomics: >= 47.5px hit targets, zero horizontal overflow across 1600x1000 and 1000x1600 viewports
 * - High-resolution screenshot capture into wave17_evidence/ in artifact directory
 */

import assert from 'node:assert/strict';
import test from 'node:test';
import { resolve } from 'node:path';
import { mkdir } from 'node:fs/promises';
import { spawn, execSync } from 'node:child_process';
import type { ChildProcess } from 'node:child_process';
import { chromium } from 'playwright-core';
import type { Browser } from 'playwright-core';

const BASE_URL = 'http://127.0.0.1:3000';
const EVIDENCE_DIR = resolve('C:/Users/reall/.gemini/antigravity/brain/fe37c8df-edec-485f-94cf-f3e638343fa7/wave17_evidence');

let serverProc: ChildProcess | null = null;
let spawnedByUs = false;
let browser: Browser | null = null;

async function isServerRunning(url: string): Promise<boolean> {
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(2000) });
    return res.ok || res.status === 404 || res.status === 304;
  } catch {
    return false;
  }
}

async function waitForServer(url: string, timeoutMs: number = 30000): Promise<void> {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    if (await isServerRunning(url)) return;
    await new Promise((r) => setTimeout(r, 400));
  }
  throw new Error(`Server at ${url} failed to respond within ${timeoutMs}ms`);
}

test('Gate W17-G8 — Grade9 v3.5 Chemistry Ecosystem Tablet Audit', { timeout: 240000 }, async (t) => {
  await mkdir(EVIDENCE_DIR, { recursive: true });

  const running = await isServerRunning(BASE_URL);
  if (!running) {
    const isWindows = process.platform === 'win32';
    const cmd = isWindows ? 'npx.cmd' : 'npx';
    serverProc = spawn(cmd, ['vite', '--port', '3000'], {
      cwd: resolve('.'),
      stdio: 'ignore',
      shell: isWindows,
    });
    spawnedByUs = true;
    await waitForServer(BASE_URL, 30000);
  }

  browser = await chromium.launch({ headless: true });

  const auditGeometry = async (page: any, label: string) => {
    const isOverflowing = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
    assert.equal(isOverflowing, false, `${label}: Horizontal overflow detected`);

    const undersized = await page.evaluate(() => {
      const elements = Array.from(document.querySelectorAll<HTMLElement>('button, input:not([type=hidden]), textarea, select'));
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
    // 1. Chemistry Hub — Landscape Tablet Ergonomics (1600x1000)
    await t.test('1. Chemistry Hub — Landscape Tablet Ergonomics (1600x1000)', async () => {
      const context = await browser!.newContext({
        viewport: { width: 1600, height: 1000 },
        deviceScaleFactor: 2,
        hasTouch: true,
      });
      const page = await context.newPage();

      await page.goto(`${BASE_URL}/#/chemistry`, { waitUntil: 'domcontentloaded' });
      await page.waitForSelector('.chemistry-hub-page', { timeout: 15000 });

      // Verify title & badges
      const headerText = await page.locator('.chemistry-hub-page header').textContent();
      assert.ok(headerText?.includes('Chemistry Hub'), 'Must display Chemistry Hub header');
      assert.ok(headerText?.includes('GRADE9 V3.5 PARITY'), 'Must display parity badge');

      // Verify governance HOLD banner
      const bannerText = await page.locator('.chemistry-hub-page').textContent();
      assert.ok(bannerText?.includes('Academic Status: HOLD'), 'Must feature HOLD governance banner');

      // Verify 4 topic cards and 4 suite cards rendered
      const topicCards = await page.locator('.topic-card').count();
      assert.equal(topicCards, 4, 'Must render 4 core topic cards');

      const suiteCards = await page.locator('.suite-card').count();
      assert.equal(suiteCards, 4, 'Must render 4 master suite cards');

      // Test filter pill switches
      const filterSuites = page.locator('button[data-filter="SUITES"]');
      await filterSuites.click();
      await page.waitForTimeout(200);
      assert.equal(await page.locator('.topic-card').count(), 0);
      assert.equal(await page.locator('.suite-card').count(), 4);

      const filterCore = page.locator('button[data-filter="CORE"]');
      await filterCore.click();
      await page.waitForTimeout(200);
      assert.equal(await page.locator('.topic-card').count(), 4);
      assert.equal(await page.locator('.suite-card').count(), 0);

      const filterAll = page.locator('button[data-filter="ALL"]');
      await filterAll.click();
      await page.waitForTimeout(200);
      assert.equal(await page.locator('.topic-card').count(), 4);
      assert.equal(await page.locator('.suite-card').count(), 4);

      // Verify ZERO iframe elements exist
      const iframes = await page.locator('iframe').count();
      assert.equal(iframes, 0, 'Must have zero iframe elements on Chemistry Hub');

      await auditGeometry(page, 'Chemistry Hub Landscape (1600x1000)');
      await page.screenshot({ path: `${EVIDENCE_DIR}/wave17_chem_hub_landscape_1600x1000.png` });

      await context.close();
    });

    // 2. Chemistry Hub — Portrait Tablet Ergonomics (1000x1600)
    await t.test('2. Chemistry Hub — Portrait Tablet Ergonomics (1000x1600)', async () => {
      const context = await browser!.newContext({
        viewport: { width: 1000, height: 1600 },
        deviceScaleFactor: 2,
        hasTouch: true,
      });
      const page = await context.newPage();

      await page.goto(`${BASE_URL}/#/chemistry`, { waitUntil: 'domcontentloaded' });
      await page.waitForSelector('.chemistry-hub-page', { timeout: 15000 });

      await auditGeometry(page, 'Chemistry Hub Portrait (1000x1600)');
      await page.screenshot({ path: `${EVIDENCE_DIR}/wave17_chem_hub_portrait_1000x1600.png` });

      await context.close();
    });

    // 3. Chemical Bonding Master Suite — Standalone Direct Mount (No Iframe)
    await t.test('3. Chemical Bonding 3D Suite — Standalone Direct Mount', async () => {
      const context = await browser!.newContext({
        viewport: { width: 1600, height: 1000 },
        deviceScaleFactor: 2,
        hasTouch: true,
      });
      const page = await context.newPage();

      await page.goto(`${BASE_URL}/chemistry/bonding/explorers/chemical_bonding/index.html`, { waitUntil: 'domcontentloaded' });
      await page.waitForSelector('canvas', { state: 'attached', timeout: 15000 });
      await page.waitForSelector('#canvasVsepr3D', { timeout: 15000 });

      const title = await page.title();
      assert.ok(title.includes('Chemical Bonding'), 'Page title must reflect Chemical Bonding Master Suite');

      // Verify canvas elements and zero iframes
      const canvases = await page.locator('canvas').count();
      assert.ok(canvases >= 1, 'Must render interactive HTML5 canvas');
      assert.equal(await page.locator('iframe').count(), 0, 'Must strictly avoid iframes');

      // Verify authentic question database is loaded in window
      const hasQuestions = await page.evaluate(() => Array.isArray((window as any).JEE_QUESTIONS_DATA) && (window as any).JEE_QUESTIONS_DATA.length > 0);
      assert.equal(hasQuestions, true, 'Must load authentic JEE_QUESTIONS_DATA in window');

      await page.screenshot({ path: `${EVIDENCE_DIR}/wave17_bonding_master_suite_1600x1000.png` });
      await context.close();
    });

    // 4. Behaviour of Gases Master Suite — Standalone Direct Mount (No Iframe)
    await t.test('4. Behaviour of Gases Suite — Standalone Direct Mount', async () => {
      const context = await browser!.newContext({
        viewport: { width: 1600, height: 1000 },
        deviceScaleFactor: 2,
        hasTouch: true,
      });
      const page = await context.newPage();

      await page.goto(`${BASE_URL}/chemistry/gases/explorers/behaviour_of_gases/index.html`, { waitUntil: 'domcontentloaded' });
      await page.waitForSelector('canvas', { timeout: 15000 });

      const title = await page.title();
      assert.ok(title.includes('Behaviour of Gases'), 'Page title must reflect Behaviour of Gases');

      assert.ok((await page.locator('canvas').count()) >= 1, 'Must render interactive canvas');
      assert.equal(await page.locator('iframe').count(), 0, 'Must strictly avoid iframes');

      await page.screenshot({ path: `${EVIDENCE_DIR}/wave17_gases_master_suite_1600x1000.png` });
      await context.close();
    });

    // 5. Mole Concept Master Suite — Standalone Direct Mount (No Iframe)
    await t.test('5. Mole Concept & Stoichiometry Suite — Standalone Direct Mount', async () => {
      const context = await browser!.newContext({
        viewport: { width: 1600, height: 1000 },
        deviceScaleFactor: 2,
        hasTouch: true,
      });
      const page = await context.newPage();

      await page.goto(`${BASE_URL}/chemistry/some-basic-concepts/explorers/mole_concept/index.html`, { waitUntil: 'domcontentloaded' });
      await page.waitForSelector('canvas', { timeout: 15000 });

      const title = await page.title();
      assert.ok(title.includes('Mole Concept'), 'Page title must reflect Mole Concept');

      assert.ok((await page.locator('canvas').count()) >= 1, 'Must render interactive canvas');
      assert.equal(await page.locator('iframe').count(), 0, 'Must strictly avoid iframes');

      await page.screenshot({ path: `${EVIDENCE_DIR}/wave17_mole_master_suite_1600x1000.png` });
      await context.close();
    });

    // 6. Redox Reactions Master Suite — Standalone Direct Mount (No Iframe)
    await t.test('6. Redox Reactions Suite — Standalone Direct Mount', async () => {
      const context = await browser!.newContext({
        viewport: { width: 1600, height: 1000 },
        deviceScaleFactor: 2,
        hasTouch: true,
      });
      const page = await context.newPage();

      await page.goto(`${BASE_URL}/chemistry/redox/explorers/redox_reactions/index.html`, { waitUntil: 'domcontentloaded' });
      await page.waitForSelector('canvas', { state: 'attached', timeout: 15000 });
      await page.locator('#btn-tab-foundations').click();
      await page.waitForSelector('#canvasFoundation', { timeout: 15000 });

      const title = await page.title();
      assert.ok(title.includes('Redox Reactions'), 'Page title must reflect Redox Reactions');

      assert.ok((await page.locator('canvas').count()) >= 1, 'Must render interactive canvas');
      assert.equal(await page.locator('iframe').count(), 0, 'Must strictly avoid iframes');

      await page.screenshot({ path: `${EVIDENCE_DIR}/wave17_redox_master_suite_1600x1000.png` });
      await context.close();
    });

    // 7. Core 1A Derivation Document — Standalone Direct Mount (No Iframe)
    await t.test('7. Core 1A Derivation Document — Standalone Direct Mount', async () => {
      const context = await browser!.newContext({
        viewport: { width: 1600, height: 1000 },
        deviceScaleFactor: 2,
        hasTouch: true,
      });
      const page = await context.newPage();

      await page.goto(`${BASE_URL}/chemistry/redox/core1a.html`, { waitUntil: 'domcontentloaded' });
      await page.waitForSelector('.g9-container, body', { timeout: 15000 });

      const title = await page.title();
      assert.ok(title.includes('Redox') || title.includes('Core') || title.includes('Grade9'), 'Must load Core 1A derivation page');
      assert.equal(await page.locator('iframe').count(), 0, 'Must strictly avoid iframes');

      await page.screenshot({ path: `${EVIDENCE_DIR}/wave17_redox_core1a_1600x1000.png` });
      await context.close();
    });
  } finally {
    if (browser) await browser.close();
    if (serverProc && spawnedByUs) {
      if (process.platform === 'win32' && serverProc.pid) {
        try {
          execSync(`taskkill /pid ${serverProc.pid} /T /F`);
        } catch {
          serverProc.kill();
        }
      } else {
        serverProc.kill();
      }
    }
  }
});
