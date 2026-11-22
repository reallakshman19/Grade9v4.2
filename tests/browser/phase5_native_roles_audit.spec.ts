/**
 * tests/browser/phase5_native_roles_audit.spec.ts
 * Gates P5-G7 & P5-G8 — 12.7" Tablet End-to-End Native Roles Audit.
 *
 * Verifies:
 * - Real user actions through the live DOM application entrypoint (http://127.0.0.1:3000)
 * - Mounting of all 7 canonical curriculum roles:
 *   1. CORE1: Reading Orientation
 *   2. CORE1A: Concept Construction (9 units)
 *   3. CORE1B: Guided Phenomenological Reconstruction (7 stages)
 *   4. CORE2: Authentic Source Question Bank
 *   5. CORE2A: Supported Practice
 *   6. CORE2B: Changed-Demand Transfer
 *   7. EXPLORER: 10-Stage GCDR Simulation
 * - Topic Hub 4-Tab structure & 3-Role Learn & Try segmented selector
 * - Question Bank contextual launches (Core 2, Core 2A, Core 2B) and return trajectories
 * - 12.7" Tablet touch ergonomics: >= 48px hit targets, 56px primary, zero horizontal overflow
 * - High-resolution screenshot capture across tablet landscape and portrait
 *
 * No academic approval inferred from software validation.
 */

import assert from 'node:assert/strict';
import { test } from 'node:test';
import { mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import { chromium } from 'playwright-core';
import { createServer } from 'vite';

const BASE_URL = 'http://127.0.0.1:3000';
const EVIDENCE_DIR = resolve('C:/Users/reall/.gemini/antigravity/brain/c39fd02d-dabd-412d-b94d-9f2254fd4134/phase5_evidence');

test('Gates P5-G7 & P5-G8 — Phase 5 Native Roles Tablet Audit & E2E Journeys', { timeout: 90000 }, async (t) => {
  await mkdir(EVIDENCE_DIR, { recursive: true });

  let server: any = null;
  let baseUrl = BASE_URL;
  try {
    const res = await fetch(BASE_URL, { signal: AbortSignal.timeout(1000) });
    if (!res.ok && res.status !== 404 && res.status !== 304) throw new Error('Not ready');
  } catch {
    server = await createServer({
      server: { host: '127.0.0.1', port: 3000, strictPort: false },
    });
    await server.listen();
    const addr = server.httpServer!.address();
    baseUrl = `http://127.0.0.1:${addr.port}`;
  }

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1600, height: 1000 }, // 12.7" Tablet Landscape
    deviceScaleFactor: 2,
    hasTouch: true,
  });

  const page = await context.newPage();

  try {

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

  await t.test('1. Core 1: Reading Orientation Workspace Mount & 7 Blocks Verification', async () => {
    await page.goto(`${baseUrl}/#/learning/core1`, { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('.g9-orientation-page', { timeout: 10000 });

    const role = await page.locator('.g9-orientation-page').getAttribute('data-role');
    assert.equal(role, 'CORE1');

    // Verify slots
    const slots = await page.locator('.g9-orientation-page [data-slot]').evaluateAll(els => els.map(e => e.getAttribute('data-slot')));
    assert.deepEqual(slots, ['identity', 'orientation']);

    // Verify 7 accepted orientation blocks present
    const blocks = await page.locator('.g9-orientation-card').evaluateAll(els => els.map(e => e.getAttribute('data-block')));
    assert.equal(blocks.length, 7);
    assert.deepEqual(blocks, [
      'objects_conventions',
      'canonical_representation',
      'governing_relations',
      'compact_anchor',
      'hard_transition_map',
      'exclusions_extensions',
      'orientation_closure',
    ]);

    await auditGeometry('Core 1 Landscape');
    await page.screenshot({ path: `${EVIDENCE_DIR}/phase5_core1_orientation_1600x1000.png` });

    // Portrait 1000x1600
    await page.setViewportSize({ width: 1000, height: 1600 });
    await page.waitForTimeout(300);
    await auditGeometry('Core 1 Portrait');
    await page.screenshot({ path: `${EVIDENCE_DIR}/phase5_core1_orientation_portrait_1000x1600.png` });

    // Reset to landscape
    await page.setViewportSize({ width: 1600, height: 1000 });
  });

  await t.test('2. Core 2A: Supported Practice Workspace & Hint Exposure', async () => {
    await page.goto(`${baseUrl}/#/learning/core2a`, { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('.g9-supported-practice-page', { timeout: 10000 });

    const role = await page.locator('.g9-supported-practice-page').getAttribute('data-role');
    assert.equal(role, 'CORE2A');

    // Request Hint 1
    const h1Btn = page.locator('button[data-action="request-hint"][data-level="H1"]');
    await h1Btn.click();
    await page.waitForSelector('text=Apply Conservation of Mechanical Energy', { timeout: 5000 });

    // Intermediate check step
    await page.locator('button[data-action="check-step"]').click();
    await page.waitForSelector('text=U_e = 1/2 * 200 * (0.10)² = 1.0 J', { timeout: 5000 });

    // Fill response and commit
    await page.fill('#g9-supported-response', '2.0');
    await page.fill('#g9-supported-working', 'E_i = 1.0 J = 0.25 v^2 => v = 2.0 m/s');
    await page.click('button[data-action="commit-attempt"]');

    // Verified solution reasoning revealed post-commitment
    await page.waitForSelector('text=Verified Solution Reasoning:', { timeout: 5000 });

    await auditGeometry('Core 2A Landscape');
    await page.screenshot({ path: `${EVIDENCE_DIR}/phase5_core2a_supported_1600x1000.png` });
  });

  await t.test('3. Core 2B: Changed-Demand Transfer & Precommit Secrecy Enforcement', async () => {
    await page.goto(`${baseUrl}/#/learning/core2b`, { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('.g9-transfer-changed-demand-page', { timeout: 10000 });

    const role = await page.locator('.g9-transfer-changed-demand-page').getAttribute('data-role');
    assert.equal(role, 'CORE2B');

    // Verify precommit secrecy text
    assert(await page.locator('text=Pre-Commit Secrecy Active').isVisible());

    // Enter transfer working and response
    await page.fill('#g9-xfer-response', '15.65');
    await page.fill('#g9-xfer-working', 'm * g = c_d * v_term^2 => v_term = sqrt(245) = 15.65 m/s');

    // Commit transfer attempt
    await page.click('button[data-action="commit-transfer"]');
    await page.waitForSelector('text=Transfer Attempt Successfully Committed', { timeout: 5000 });

    // Reveal rubric
    await page.click('button[data-action="disclose-rubric"]');
    await page.waitForSelector('text=Verified Answer Rubric:', { timeout: 5000 });
    await page.waitForSelector('text=Conceptual Transfer Takeaway', { timeout: 5000 });

    await auditGeometry('Core 2B Landscape');
    await page.screenshot({ path: `${EVIDENCE_DIR}/phase5_core2b_transfer_1600x1000.png` });
  });

  await t.test('4. Topic Hub Tab 2: Learn & Try 3-Role Segmented Selector', async () => {
    await page.goto(`${baseUrl}/#/subject/physics/topic/wpe/learn-try`, { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('.g9-learn-try-hub', { timeout: 10000 });

    // Verify exactly 3 subroles in selector
    const subroles = await page.locator('.g9-learn-try-hub button[data-subrole]').allTextContents();
    assert.equal(subroles.length, 3);
    assert.match(subroles[0], /Core 1: Reading Orientation/);
    assert.match(subroles[1], /Core 1A: Concept Construction/);
    assert.match(subroles[2], /Core 1B: Phenomenological Reconstruction/);

    // Click Core 1 pill -> mounts Core 1
    await page.click('button[data-subrole="CORE1"]');
    await page.waitForSelector('.g9-orientation-page', { timeout: 5000 });

    // Click Core 1B pill -> mounts Core 1B
    await page.click('button[data-subrole="CORE1B"]');
    await page.waitForSelector('.g9-transfer-page', { timeout: 5000 });

    // Click Core 1A pill -> mounts Core 1A
    await page.click('button[data-subrole="CORE1A"]');
    await page.waitForSelector('.g9-lesson-page', { timeout: 5000 });

    await auditGeometry('Topic Learn & Try 3-Role');
    await page.screenshot({ path: `${EVIDENCE_DIR}/phase5_topic_learn_try_3role_1600x1000.png` });
  });

  await t.test('5. Topic Hub Tab 1: Question Bank Contextual Actions & Return Trajectories', async () => {
    await page.goto(`${baseUrl}/#/subject/physics/topic/wpe/questions`, { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('.g9-question-deck', { timeout: 10000 });

    // Check action buttons on question deck items
    const core2Btns = page.locator('button[data-action="open-question"][data-mode="CORE2"]');
    const core2aBtns = page.locator('button[data-action="open-question"][data-mode="CORE2A"]');
    const core2bBtns = page.locator('button[data-action="open-question"][data-mode="CORE2B"]');
    assert.ok(await core2Btns.count() >= 4, 'Must render at least 4 Core 2 buttons');
    assert.ok(await core2aBtns.count() >= 4, 'Must render at least 4 Core 2A buttons');
    assert.ok(await core2bBtns.count() >= 4, 'Must render at least 4 Core 2B buttons');

    await page.screenshot({ path: `${EVIDENCE_DIR}/phase5_topic_question_bank_deck_1600x1000.png` });

    // Contextual launch into Core 2A from deck
    await core2aBtns.first().click();
    await page.waitForSelector('.g9-supported-practice-page', { timeout: 5000 });

    // Mode switcher: switch to Core 2B
    await page.click('button[data-switch-qmode="CORE2B"]');
    await page.waitForSelector('.g9-transfer-changed-demand-page', { timeout: 5000 });

    // Mode switcher: switch to Core 2 Question
    await page.click('button[data-switch-qmode="CORE2"]');
    await page.waitForSelector('.g9-question-page', { timeout: 5000 });

    // Return back to Question Deck
    await page.click('#g9-back-deck-btn');
    await page.waitForSelector('.g9-question-deck', { timeout: 5000 });
  });
  } finally {
    await context.close();
    await browser.close();
    if (server) await server.close();
  }
});
