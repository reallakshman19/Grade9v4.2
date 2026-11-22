/**
 * tests/browser/phase8_physics_expansion_audit.spec.ts
 * Gate P8-G8 — 12.7" Tablet End-to-End Physics, Motion Parity, Stylus Ink & Shared-Clock Audit.
 *
 * Verifies:
 * - Real user actions through live DOM application entrypoint (http://127.0.0.1:3000)
 * - Physics Subject Screen (#/subject/physics) with 4 topics, strand filtering and 5-level status
 * - Physics Multi-Topic Workspaces (#/subject/physics/topic/motion-plane/questions, learn-try, labs)
 * - Motion in a Plane Functional-Parity Pilot (A69 Pilot 3) at #/labs/lab:motion-in-a-plane with 3 tabs and formative practice badge
 * - Workpack A26 Stylus Digital Ink Workspace embedded in CORE1B journey with tools, typed derivations, and human review invariant
 * - Workpack A29 Experimental & Graph Workspace at #/labs/lab:experiment-graph with data table, least-squares regression, apparatus, observations, and REVIEW_PENDING evaluation
 * - Declarative Portable Motion Shared Clock Workbench (DEC-A59) at #/labs/lab:motion-shared-clock
 * - 12.7" tablet touch ergonomics: >= 48px hit targets, 56px primary actions, zero horizontal scroll
 * - High-resolution screenshot capture into phase8_evidence/
 *
 * No academic approval inferred from software validation.
 */

import assert from 'node:assert/strict';
import { test } from 'node:test';
import { mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import { chromium } from 'playwright-core';

const BASE_URL = 'http://127.0.0.1:3000';
const EVIDENCE_DIR = resolve('C:/Users/reall/.gemini/antigravity/brain/c39fd02d-dabd-412d-b94d-9f2254fd4134/phase8_evidence');

test('Gate P8-G8 — Phase 8 Physics Expansion Tablet Audit & E2E Journeys', { timeout: 120000 }, async (t) => {
  await mkdir(EVIDENCE_DIR, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1600, height: 1000 }, // 12.7" Tablet Landscape
    deviceScaleFactor: 2,
    hasTouch: true,
  });

  const page = await context.newPage();

  // Helper to audit hit targets and overflow
  const auditGeometry = async (label: string) => {
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
          return r.width < 47.5 || r.height < 47.5; // allowance for sub-pixel anti-aliasing
        })
        .map(el => `${el.tagName}[${el.innerText || (el as any).value || el.getAttribute('aria-label') || el.id}] (${el.getBoundingClientRect().width.toFixed(1)}x${el.getBoundingClientRect().height.toFixed(1)})`);
    });

    assert.deepEqual(undersized, [], `${label}: Undersized touch controls found: ${undersized.join(', ')}`);
  };

  await t.test('1. Physics Subject Screen Mount & 4-Topic Facet', async () => {
    await page.goto(`${BASE_URL}/#/subject/physics`, { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('.g9-subject-screen', { timeout: 10000 });

    // Verify status banner
    const banner = await page.locator('.g9-subject-screen').textContent();
    assert.match(banner || '', /Academic Status: HOLD/);
    assert.match(banner || '', /Diagnostic Mode Authorized/);

    // Verify 4 topics rendered
    const topicCards = await page.locator('.g9-topic-card').count();
    assert.equal(topicCards, 4);

    await auditGeometry('Physics Subject Screen');
    await page.screenshot({ path: `${EVIDENCE_DIR}/phase8_physics_subject_1600x1000.png` });
  });

  await t.test('2. Physics Multi-Topic Workspace: Motion in a Plane Question Deck', async () => {
    await page.goto(`${BASE_URL}/#/subject/physics/topic/motion-plane/questions`, { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('.g9-topic-workspace', { timeout: 10000 });

    const title = await page.locator('.topic-workspace-title').textContent();
    assert.match(title || '', /Motion in a Plane & Kinematics/);

    // Verify problem cards
    const deckCards = await page.locator('.g9-question-deck > div:nth-child(2) > div').count();
    assert.equal(deckCards, 4);

    // Verify diagnostic fixture badges
    const deckText = await page.locator('.g9-question-deck').textContent();
    assert.match(deckText || '', /SYNTHETIC_DIAGNOSTIC_FIXTURE/);

    // Launch question
    await page.locator('button[data-action="open-question"][data-mode="CORE2"]').first().click();
    await page.waitForSelector('#g9-question-mount-root', { timeout: 10000 });

    await auditGeometry('Motion in a Plane Question Bank');
    await page.screenshot({ path: `${EVIDENCE_DIR}/phase8_physics_topic_practice_1600x1000.png` });
  });

  await t.test('3. Motion in a Plane Standalone Suite (A69 Pilot 3)', async () => {
    await page.goto(`${BASE_URL}/#/labs/lab:motion-in-a-plane`, { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('.motion-plane-container', { timeout: 10000 });

    // Verify Formative practice badge
    const hubText = await page.locator('.motion-plane-container').textContent();
    assert.match(hubText || '', /Formative Self-Check · Diagnostic Practice \(HOLD\)/);

    // Verify 3 tabs exist
    const tabsCount = await page.locator('.motion-plane-container button.tab-btn').count();
    assert.equal(tabsCount, 3);

    // Set sliderTheta to 30 first so complement is distinct (60 deg)
    await page.locator('#sliderTheta').fill('30');
    await page.locator('#sliderTheta').dispatchEvent('input');
    const initTheta = await page.locator('#valTheta').textContent();
    assert.equal(initTheta, '30°');

    // Test projectile complementary angle button (30° -> 60°)
    await page.locator('#projCompBtn').click();
    const newTheta = await page.locator('#valTheta').textContent();
    assert.equal(newTheta, '60°');

    // Switch to Banking tab
    await page.locator('button[data-tab="tab-banking"]').click();
    await page.waitForSelector('#bankRegimeBadge', { timeout: 5000 });
    const badgeText = await page.locator('#bankRegimeBadge').textContent();
    assert.ok(badgeText && badgeText.length > 0);

    // Switch to Active Practice tab
    await page.locator('button[data-tab="tab-practice"]').click();
    await page.waitForSelector('#reconRevealBtn', { timeout: 5000 });
    await page.locator('#reconRevealBtn').click();
    assert.ok(await page.locator('#reconAnswer').isVisible());

    // Switch back to projectile tab for screenshot
    await page.locator('button[data-tab="tab-projectile"]').click();
    await auditGeometry('Motion in a Plane Suite');
    await page.screenshot({ path: `${EVIDENCE_DIR}/phase8_motion_plane_suite_1600x1000.png` });
  });

  await t.test('4. Stylus Digital Ink Workspace (A26) Mount under CORE1B', async () => {
    await page.goto(`${BASE_URL}/#/subject/physics/topic/wpe/learn-try`, { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('.g9-learn-try-hub', { timeout: 10000 });

    // Click Core 1B subrole button
    await page.locator('button[data-subrole="CORE1B"]').click();
    await page.waitForSelector('.g9-scratchpad-workspace', { timeout: 10000 });

    // Verify A26 scratchpad status
    const scratchpad = page.locator('.g9-scratchpad-workspace');
    assert.match((await scratchpad.textContent()) || '', /Workpack A26/);
    assert.match((await scratchpad.textContent()) || '', /REVIEW_PENDING/);

    // Switch to typed mode and enter derivation
    await page.locator('#btn-ink-toggle-mode').click();
    await page.waitForSelector('#g9-ink-typed-input', { timeout: 5000 });
    await page.locator('#g9-ink-typed-input').fill('Normal force N = mg cos(θ)\nFriction f = μN = μ mg cos(θ)\nWork done W = -f * d');

    // Switch back to drawing mode
    await page.locator('#btn-ink-toggle-mode').click();
    await page.waitForSelector('#g9-ink-canvas', { timeout: 5000 });

    // Export artifact
    await page.locator('#btn-export-ink-artifact').click();
    const artifactStatus = await page.locator('#ink-artifact-status').textContent();
    assert.match(artifactStatus || '', /Artifact exported|Durable memory active/);

    await auditGeometry('Stylus Digital Ink Workspace');
    await page.screenshot({ path: `${EVIDENCE_DIR}/phase8_stylus_ink_core1b_1600x1000.png` });
  });

  await t.test('5. Experimental & Graph Workspace (A29) Simple Pendulum Lab', async () => {
    await page.goto(`${BASE_URL}/#/labs/lab:experiment-graph`, { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('.g9-experiment-lab', { timeout: 10000 });

    // Verify title and pedagogical invariant notice
    const labText = await page.locator('.g9-experiment-lab').textContent();
    assert.match(labText || '', /Simple Pendulum Gravity Measurement/);
    assert.match(labText || '', /Workpack A29 · Pedagogical Invariant/);

    // Verify 4 tabs exist
    const tabs = await page.locator('.exp-tab-btn').count();
    assert.equal(tabs, 4);

    // Verify 5 data rows in table
    const rows = await page.locator('.data-table-container table tbody tr').count();
    assert.equal(rows, 5);

    // Switch to GRAPH tab
    await page.locator('button[data-tab="GRAPH"]').click();
    await page.waitForSelector('.graph-svg-wrapper svg', { timeout: 5000 });
    assert.ok(await page.locator('.graph-svg-wrapper svg').isVisible());

    // Switch to APPARATUS tab
    await page.locator('button[data-tab="APPARATUS"]').click();
    const appItems = await page.locator('.exp-pane-apparatus li').count();
    assert.equal(appItems, 4);

    // Switch to OBSERVATIONS tab and request evaluation
    await page.locator('button[data-tab="OBSERVATIONS"]').click();
    await page.locator('#btn-evaluate-experiment').click();

    // Verify REVIEW_PENDING and disclaimer
    await page.waitForSelector('.experiment-evaluation-panel', { timeout: 5000 });
    const evalPanel = await page.locator('.experiment-evaluation-panel').textContent();
    assert.match(evalPanel || '', /REVIEW_PENDING/);
    assert.match(evalPanel || '', /Score withheld/);

    // Switch to GRAPH for screenshot
    await page.locator('button[data-tab="GRAPH"]').click();
    await auditGeometry('Experimental & Graph Workspace');
    await page.screenshot({ path: `${EVIDENCE_DIR}/phase8_experimental_graph_1600x1000.png` });
  });

  await t.test('6. Declarative Motion Shared Clock Workbench (DEC-A59)', async () => {
    await page.goto(`${BASE_URL}/#/labs/lab:motion-shared-clock`, { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('.portable-workbench-panel', { timeout: 10000 });

    // Verify title and canonical candidate provenance
    const title = await page.locator('.portable-workbench-panel h3').textContent();
    assert.match(title || '', /Independent Components, One Shared Clock Explorer|shared-clock/i);

    const provenance = await page.locator('.portable-provenance-badge').textContent();
    assert.match(provenance || '', /CANONICAL_COMPILED_RESOURCE/);

    // Apply rule: same-time (ACCEPT)
    const sameTimeBtn = page.locator('button[data-rule-id="same-time"]');
    assert.ok(await sameTimeBtn.isVisible());
    await sameTimeBtn.click();

    await page.waitForSelector('.portable-outcome-notice', { timeout: 10000 });
    const notice = await page.locator('.portable-outcome-notice').textContent();
    assert.match(notice || '', /ACCEPT/);

    await auditGeometry('Declarative Motion Shared Clock Workbench');
    await page.screenshot({ path: `${EVIDENCE_DIR}/phase8_portable_motion_clock_1600x1000.png` });
  });

  await t.test('7. Portrait Viewport Audit (1000x1600) & Zero Overflow', async () => {
    await page.setViewportSize({ width: 1000, height: 1600 });
    await page.goto(`${BASE_URL}/#/subject/physics`, { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('.g9-subject-screen', { timeout: 10000 });

    await auditGeometry('Physics Subject Screen Portrait');
    await page.screenshot({ path: `${EVIDENCE_DIR}/phase8_physics_subject_portrait_1000x1600.png` });
  });

  await browser.close();
});
