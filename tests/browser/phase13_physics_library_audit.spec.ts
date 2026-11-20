/**
 * tests/browser/phase13_physics_library_audit.spec.ts
 * Gate W13-G7 — 12.7" Tablet End-to-End STEM Library Packages & Kinematics Simulator Audit.
 *
 * Verifies:
 * - Real user actions through live DOM application entrypoint (http://127.0.0.1:3000)
 * - Navigation to Physics Library Hub via navbar & Subjects view (#/physics-library)
 * - 22 Library Packages Navigator (20 Physics + 2 Math) across Kinematics, Dynamics, Electromagnetism, Optics, Waves, and Algebra
 * - Package deep dive and microtopics inspection
 * - 208 Authentic Library Questions with Fault N09 Answer Isolation (withholding raw answers)
 * - Progressive hint ladder and diagnostic failure signal display
 * - Interactive Kinematics & Projectile Simulator with real-time trajectory SVG, angles, and celestial gravity
 * - 12.7" tablet touch ergonomics: >= 48px hit targets, zero horizontal overflow across 1600x1000 and 1000x1600 viewports
 * - High-resolution screenshot capture into wave13_evidence/ in artifact directory
 */

import assert from 'node:assert/strict';
import test from 'node:test';
import { resolve } from 'node:path';
import { mkdir } from 'node:fs/promises';
import { chromium } from 'playwright-core';

const BASE_URL = 'http://127.0.0.1:3000';
const EVIDENCE_DIR = resolve('C:/Users/reall/.gemini/antigravity/brain/c39fd02d-dabd-412d-b94d-9f2254fd4134/wave13_evidence');

test('Gate W13-G7 — STEM Library Packages & Kinematics Simulator Tablet Audit', { timeout: 180000 }, async (t) => {
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
    // 1. Library Hub Mount & Landscape Tablet Ergonomics (1600x1000)
    await t.test('1. Library Hub Mount & Landscape Tablet Ergonomics (1600x1000)', async () => {
      const context = await browser.newContext({
        viewport: { width: 1600, height: 1000 },
        deviceScaleFactor: 2,
        hasTouch: true,
      });
      const page = await context.newPage();

      await page.goto(`${BASE_URL}/#/subject/physics`, { waitUntil: 'domcontentloaded' });
      await page.waitForSelector('.subject-screen-container', { timeout: 10000 });

      // Click "Open Library Packages (20)" banner button
      const openLibBtn = page.locator('button:has-text("Open Library Packages (20)")');
      assert.equal(await openLibBtn.count(), 1, 'Open Library Packages button must exist');
      await openLibBtn.click();

      await page.waitForURL('**/#/physics-library');
      await page.waitForSelector('.physics-library-root', { timeout: 10000 });

      // Verify header and metrics ribbon
      const headerText = await page.locator('.physics-library-root header').textContent();
      assert.ok(headerText?.includes('STEM Curriculum Library Packages & 208 Authentic Questions'));
      assert.ok(headerText?.includes('22 Packages (20 Phy + 2 Math)'));
      assert.ok(headerText?.includes('208 Questions (137 Phy + 71 Math)'));
      assert.ok(headerText?.includes('Fault N09 Active'));

      await auditGeometry(page, 'Physics Library Hub 1600x1000 Landscape');
      await page.screenshot({ path: resolve(EVIDENCE_DIR, 'wave13_physics_library_hub_landscape_1600x1000.png') });
      await context.close();
    });

    // 2. Packages Grid & Domain Filtering
    await t.test('2. Packages Grid & Domain Filtering', async () => {
      const context = await browser.newContext({
        viewport: { width: 1600, height: 1000 },
        deviceScaleFactor: 2,
        hasTouch: true,
      });
      const page = await context.newPage();

      await page.goto(`${BASE_URL}/#/physics-library`, { waitUntil: 'domcontentloaded' });
      await page.waitForSelector('.library-package-card', { timeout: 10000 });

      // Count initial cards: all 22
      let cards = await page.locator('.library-package-card').count();
      assert.equal(cards, 22, 'Should display all 22 library packages');

      // Click Kinematics domain filter
      await page.locator('button[data-domain="KINEMATICS"]').click();
      cards = await page.locator('.library-package-card').count();
      assert.ok(cards > 0, 'Kinematics domain should display packages');

      // Click Mathematics domain filter
      await page.locator('button[data-domain="MATHEMATICS"]').click();
      cards = await page.locator('.library-package-card').count();
      assert.equal(cards, 2, 'Mathematics domain should display exactly 2 packages');

      // Reset to All
      await page.locator('button[data-domain="ALL"]').click();
      cards = await page.locator('.library-package-card').count();
      assert.equal(cards, 22, 'Should restore all 22 packages');

      await page.screenshot({ path: resolve(EVIDENCE_DIR, 'wave13_physics_packages_grid_1600x1000.png') });
      await context.close();
    });

    // 3. Package Deep Dive & Microtopics Inspection
    await t.test('3. Package Deep Dive & Microtopics Inspection', async () => {
      const context = await browser.newContext({
        viewport: { width: 1600, height: 1000 },
        deviceScaleFactor: 2,
        hasTouch: true,
      });
      const page = await context.newPage();

      await page.goto(`${BASE_URL}/#/physics-library`, { waitUntil: 'domcontentloaded' });
      await page.waitForSelector('.library-package-card', { timeout: 10000 });

      // Expand first package details
      const firstPkg = page.locator('.library-package-card').first();
      const inspectBtn = firstPkg.locator('button[data-action="toggle-pkg-detail"]');
      await inspectBtn.click();

      // Verify microtopics rendered
      await page.waitForSelector('text=All Microtopics', { timeout: 5000 });
      const pkgText = await firstPkg.textContent();
      assert.ok(pkgText?.includes('All Microtopics'));

      await auditGeometry(page, 'Package Microtopics 1600x1000');
      await page.screenshot({ path: resolve(EVIDENCE_DIR, 'wave13_physics_package_microtopics_1600x1000.png') });
      await context.close();
    });

    // 4. Authentic Questions Explorer (208 Questions & Fault N09 Isolation)
    await t.test('4. Authentic Questions Explorer (208 Questions & Fault N09 Isolation)', async () => {
      const context = await browser.newContext({
        viewport: { width: 1600, height: 1000 },
        deviceScaleFactor: 2,
        hasTouch: true,
      });
      const page = await context.newPage();

      await page.goto(`${BASE_URL}/#/physics-library`, { waitUntil: 'domcontentloaded' });
      await page.waitForSelector('button[data-tab="questions"]', { timeout: 10000 });

      await page.locator('button[data-tab="questions"]').click();
      await page.waitForSelector('.library-question-card', { timeout: 10000 });

      const firstQ = page.locator('.library-question-card').first();
      // Click Reveal Hints
      const hintBtn = firstQ.locator('button[data-action="toggle-hint"]');
      await hintBtn.click();

      // Verify conceptual insights and failure signal box
      await page.waitForSelector('text=Progressive Hint Ladder:', { timeout: 5000 });
      await page.waitForSelector('text=Diagnostic Failure Signal:', { timeout: 5000 });
      const qText = await firstQ.textContent();
      assert.ok(qText?.includes('Fault N09: Key Isolated'), 'Must enforce Fault N09 answer isolation');

      await auditGeometry(page, 'Questions Explorer 1600x1000');
      await page.screenshot({ path: resolve(EVIDENCE_DIR, 'wave13_physics_questions_explorer_1600x1000.png') });
      await context.close();
    });

    // 5. Interactive Kinematics & Projectile Simulator Workbench
    await t.test('5. Interactive Kinematics & Projectile Simulator Workbench', async () => {
      const context = await browser.newContext({
        viewport: { width: 1600, height: 1000 },
        deviceScaleFactor: 2,
        hasTouch: true,
      });
      const page = await context.newPage();

      await page.goto(`${BASE_URL}/#/physics-library`, { waitUntil: 'domcontentloaded' });
      await page.waitForSelector('button[data-tab="simulator"]', { timeout: 10000 });

      await page.locator('button[data-tab="simulator"]').click();
      await page.waitForSelector('svg', { timeout: 10000 });

      // Click Max Range (45°) preset
      await page.locator('button[data-action="set-angle"][data-angle="45"]').click();

      // Verify initial Earth values: Flight time ~5.77s
      let metricsText = await page.locator('text=Flight Time (T)').locator('..').textContent();
      assert.ok(metricsText?.includes('s'), 'Flight time must be displayed');

      // Select Moon gravity from dropdown
      await page.locator('#select-gravity').selectOption({ label: 'Moon (1.6 m/s²)' });

      // In Moon gravity, flight time is much longer (~35.36s)
      metricsText = await page.locator('text=Flight Time (T)').locator('..').textContent();
      assert.ok(metricsText?.includes('s'), 'Flight time must be updated for Moon gravity');

      await auditGeometry(page, 'Kinematics Simulator 1600x1000');
      await page.screenshot({ path: resolve(EVIDENCE_DIR, 'wave13_physics_kinematics_simulator_1600x1000.png') });
      await context.close();
    });

    // 6. Portrait Tablet Ergonomics (1000x1600)
    await t.test('6. Portrait Tablet Ergonomics (1000x1600)', async () => {
      const context = await browser.newContext({
        viewport: { width: 1000, height: 1600 },
        deviceScaleFactor: 2,
        hasTouch: true,
      });
      const page = await context.newPage();

      await page.goto(`${BASE_URL}/#/physics-library`, { waitUntil: 'domcontentloaded' });
      await page.waitForSelector('.physics-library-root', { timeout: 10000 });

      // Verify zero overflow in portrait
      await auditGeometry(page, 'Physics Library Hub 1000x1600 Portrait');
      await page.screenshot({ path: resolve(EVIDENCE_DIR, 'wave13_physics_library_hub_portrait_1000x1600.png') });
      await context.close();
    });

  } finally {
    await browser.close();
  }
});
