/**
 * tests/browser/phase10_standalone_labs_audit.spec.ts
 * Gate W10-G7 — 12.7" Tablet End-to-End Standalone Labs Hub & STEM Workbenches Audit.
 *
 * Verifies:
 * - Real user actions through live DOM application entrypoint (http://127.0.0.1:3000)
 * - Navigation to restored Standalone Labs Hub via navbar button (#/labs)
 * - Dedicated Labs Hub:
 *   - Status badges: GRADE9 v3.5 PARITY, 16 INTERACTIVE WORKBENCHES, Academic Status: HOLD
 *   - Search and discipline/modality filtering
 *   - 16 interactive workbench cards rendered
 * - Direct launch and interactive functionality of all 7 newly mounted STEM workbenches:
 *   1. Motion in 1D & 2D Suite (#/labs/lab:motion-1d-suite)
 *   2. 3D Vector Algebra (#/labs/lab:vector-algebra-3d)
 *   3. Thrust & Hydrostatic Pressure Apparatus (#/labs/lab:fluid-pressure-thrust)
 *   4. Behaviour of Gases & PV Thermodynamics (#/labs/lab:gas-laws-suite)
 *   5. Chemical Bonding & Molecular Atlas (#/labs/lab:chemical-bonding-atlas)
 *   6. Mole Concept & Stoichiometric Reactor (#/labs/lab:mole-concept-reactor)
 *   7. Linear Systems & Coordinates Explorer (#/labs/lab:linear-coordinates)
 * - 12.7" tablet touch ergonomics: >= 48px hit targets, zero horizontal overflow across 1600x1000 and 1000x1600 viewports
 * - High-resolution screenshot capture into wave10_evidence/ in artifact directory
 */

import assert from 'node:assert/strict';
import { test } from 'node:test';
import { mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import { chromium } from 'playwright-core';

const BASE_URL = 'http://127.0.0.1:3000';
const EVIDENCE_DIR = resolve('C:/Users/reall/.gemini/antigravity/brain/c39fd02d-dabd-412d-b94d-9f2254fd4134/wave10_evidence');

test('Gate W10-G7 — Standalone Labs Hub & STEM Workbenches Tablet Audit', { timeout: 180000 }, async (t) => {
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
    // 1. Standalone Labs Hub Landscape (1600x1000)
    await t.test('1. Labs Hub Mount & Landscape Tablet Ergonomics (1600x1000)', async () => {
      const context = await browser.newContext({
        viewport: { width: 1600, height: 1000 },
        deviceScaleFactor: 2,
        hasTouch: true,
      });
      const page = await context.newPage();

      await page.goto(`${BASE_URL}/#/home`, { waitUntil: 'domcontentloaded' });
      await page.waitForSelector('nav[aria-label="Global navigation"]', { timeout: 10000 });

      // Click the Standalone Labs nav button
      const labsNavBtn = page.locator('button[data-route="#/labs"]');
      assert.equal(await labsNavBtn.count(), 1, 'Labs nav button must exist');
      await labsNavBtn.click();

      await page.waitForURL('**/#/labs');
      await page.waitForSelector('.labs-hub-container', { timeout: 10000 });

      // Verify badges and heading
      const hubText = await page.locator('.labs-hub-container').textContent();
      assert.match(hubText || '', /GRADE9 v3\.5 PARITY/);
      assert.match(hubText || '', /16 INTERACTIVE WORKBENCHES/);
      assert.match(hubText || '', /Academic Status: HOLD/);
      assert.match(hubText || '', /Standalone Labs & STEM Workbenches/);

      // Verify 16 cards exist
      const labCards = await page.locator('.lab-card').count();
      assert.equal(labCards, 16, 'Must render 16 standalone lab cards');

      // Filter by Chemistry
      const chemFilterBtn = page.locator('button[data-disc="CHEMISTRY"]');
      await chemFilterBtn.click();
      assert.equal(await page.locator('.lab-card').count(), 6);

      // Filter by Physics
      const physFilterBtn = page.locator('button[data-disc="PHYSICS"]');
      await physFilterBtn.click();
      assert.equal(await page.locator('.lab-card').count(), 6);

      // Reset to All
      await page.locator('button[data-disc="ALL"]').click();
      assert.equal(await page.locator('.lab-card').count(), 16);

      // Verify geometry on landscape
      await auditGeometry(page, 'Labs Hub (Landscape 1600x1000)');

      // Capture screenshot
      const shotPath = resolve(EVIDENCE_DIR, 'wave10_labs_hub_landscape_1600x1000.png');
      await page.screenshot({ path: shotPath, fullPage: true });

      await context.close();
    });

    // 2. Standalone Labs Hub Portrait (1000x1600)
    await t.test('2. Labs Hub Portrait Tablet Ergonomics (1000x1600)', async () => {
      const context = await browser.newContext({
        viewport: { width: 1000, height: 1600 },
        deviceScaleFactor: 2,
        hasTouch: true,
      });
      const page = await context.newPage();

      await page.goto(`${BASE_URL}/#/labs`, { waitUntil: 'domcontentloaded' });
      await page.waitForSelector('.labs-hub-container', { timeout: 10000 });

      await auditGeometry(page, 'Labs Hub (Portrait 1000x1600)');

      const shotPath = resolve(EVIDENCE_DIR, 'wave10_labs_hub_portrait_1000x1600.png');
      await page.screenshot({ path: shotPath, fullPage: true });

      await context.close();
    });

    // 3. Motion in 1D & 2D Suite
    await t.test('3. Motion in 1D & 2D Suite Audit', async () => {
      const context = await browser.newContext({
        viewport: { width: 1600, height: 1000 },
        deviceScaleFactor: 2,
        hasTouch: true,
      });
      const page = await context.newPage();

      await page.goto(`${BASE_URL}/#/labs/lab:motion-1d-suite`, { waitUntil: 'domcontentloaded' });
      await page.waitForSelector('.motion-suite-container', { timeout: 10000 });

      // Verify tabs
      const tabs = page.locator('.tab-btn');
      assert.equal(await tabs.count(), 3);

      // Switch to Projectile
      await tabs.nth(1).click();
      assert.match(await page.locator('.motion-suite-container').textContent() || '', /2D Parabolic Path Visualization/);

      await auditGeometry(page, 'Motion Suite (1600x1000)');

      const shotPath = resolve(EVIDENCE_DIR, 'wave10_motion_suite_1600x1000.png');
      await page.screenshot({ path: shotPath, fullPage: true });

      await context.close();
    });

    // 4. 3D Vector Algebra Workbench
    await t.test('4. 3D Vector Algebra Audit', async () => {
      const context = await browser.newContext({
        viewport: { width: 1600, height: 1000 },
        deviceScaleFactor: 2,
        hasTouch: true,
      });
      const page = await context.newPage();

      await page.goto(`${BASE_URL}/#/labs/lab:vector-algebra-3d`, { waitUntil: 'domcontentloaded' });
      await page.waitForSelector('.vector-algebra-container', { timeout: 10000 });

      assert.match(await page.locator('.vector-algebra-container').textContent() || '', /Isometric 3D Projection Canvas/);
      await auditGeometry(page, 'Vector Algebra (1600x1000)');

      const shotPath = resolve(EVIDENCE_DIR, 'wave10_vector_algebra_1600x1000.png');
      await page.screenshot({ path: shotPath, fullPage: true });

      await context.close();
    });

    // 5. Thrust & Fluid Pressure Apparatus
    await t.test('5. Fluid Pressure Apparatus Audit', async () => {
      const context = await browser.newContext({
        viewport: { width: 1600, height: 1000 },
        deviceScaleFactor: 2,
        hasTouch: true,
      });
      const page = await context.newPage();

      await page.goto(`${BASE_URL}/#/labs/lab:fluid-pressure-thrust`, { waitUntil: 'domcontentloaded' });
      await page.waitForSelector('.fluid-pressure-container', { timeout: 10000 });

      // Test mode switch to Pascal
      const modes = page.locator('.mode-btn');
      assert.equal(await modes.count(), 3);
      await modes.nth(1).click();
      assert.match(await page.locator('.fluid-pressure-container').textContent() || '', /Hydraulic Press Parameters/);

      await auditGeometry(page, 'Fluid Pressure (1600x1000)');

      const shotPath = resolve(EVIDENCE_DIR, 'wave10_fluid_pressure_1600x1000.png');
      await page.screenshot({ path: shotPath, fullPage: true });

      await context.close();
    });

    // 6. Behaviour of Gases & PV Thermodynamics
    await t.test('6. Gas Laws & PV Thermodynamics Audit', async () => {
      const context = await browser.newContext({
        viewport: { width: 1600, height: 1000 },
        deviceScaleFactor: 2,
        hasTouch: true,
      });
      const page = await context.newPage();

      await page.goto(`${BASE_URL}/#/labs/lab:gas-laws-suite`, { waitUntil: 'domcontentloaded' });
      await page.waitForSelector('.gas-laws-container', { timeout: 10000 });

      assert.match(await page.locator('.gas-laws-container').textContent() || '', /Dynamic P-V Isotherm Diagram/);
      await auditGeometry(page, 'Gas Laws (1600x1000)');

      const shotPath = resolve(EVIDENCE_DIR, 'wave10_gas_laws_1600x1000.png');
      await page.screenshot({ path: shotPath, fullPage: true });

      await context.close();
    });

    // 7. Chemical Bonding & Molecular Atlas
    await t.test('7. Chemical Bonding & Molecular Atlas Audit', async () => {
      const context = await browser.newContext({
        viewport: { width: 1600, height: 1000 },
        deviceScaleFactor: 2,
        hasTouch: true,
      });
      const page = await context.newPage();

      await page.goto(`${BASE_URL}/#/labs/lab:chemical-bonding-atlas`, { waitUntil: 'domcontentloaded' });
      await page.waitForSelector('.chemical-bonding-container', { timeout: 10000 });

      // Switch to CO2
      const co2Btn = page.locator('button[data-mol-id="co2"]');
      await co2Btn.click();
      assert.match(await page.locator('.chemical-bonding-container').textContent() || '', /Carbon Dioxide/);

      await auditGeometry(page, 'Chemical Bonding (1600x1000)');

      const shotPath = resolve(EVIDENCE_DIR, 'wave10_chemical_bonding_1600x1000.png');
      await page.screenshot({ path: shotPath, fullPage: true });

      await context.close();
    });

    // 8. Mole Concept & Stoichiometric Reactor
    await t.test('8. Mole Concept & Stoichiometric Reactor Audit', async () => {
      const context = await browser.newContext({
        viewport: { width: 1600, height: 1000 },
        deviceScaleFactor: 2,
        hasTouch: true,
      });
      const page = await context.newPage();

      await page.goto(`${BASE_URL}/#/labs/lab:mole-concept-reactor`, { waitUntil: 'domcontentloaded' });
      await page.waitForSelector('.mole-concept-container', { timeout: 10000 });

      assert.match(await page.locator('.mole-concept-container').textContent() || '', /Stoichiometric Reactor/);
      await auditGeometry(page, 'Mole Concept (1600x1000)');

      const shotPath = resolve(EVIDENCE_DIR, 'wave10_mole_concept_1600x1000.png');
      await page.screenshot({ path: shotPath, fullPage: true });

      await context.close();
    });

    // 9. Linear Coordinates & Systems
    await t.test('9. Linear Coordinates & Systems Audit', async () => {
      const context = await browser.newContext({
        viewport: { width: 1600, height: 1000 },
        deviceScaleFactor: 2,
        hasTouch: true,
      });
      const page = await context.newPage();

      await page.goto(`${BASE_URL}/#/labs/lab:linear-coordinates`, { waitUntil: 'domcontentloaded' });
      await page.waitForSelector('.linear-coordinates-container', { timeout: 10000 });

      assert.match(await page.locator('.linear-coordinates-container').textContent() || '', /Cartesian Coordinate Plane/);
      await auditGeometry(page, 'Linear Coordinates (1600x1000)');

      const shotPath = resolve(EVIDENCE_DIR, 'wave10_linear_coordinates_1600x1000.png');
      await page.screenshot({ path: shotPath, fullPage: true });

      await context.close();
    });

  } finally {
    await browser.close();
  }
});
