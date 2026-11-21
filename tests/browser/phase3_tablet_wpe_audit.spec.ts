/**
 * tests/browser/phase3_tablet_wpe_audit.spec.ts
 * Gates P3-G5, P3-G7, P3-G8 — 12.7" Tablet End-to-End WPE Vertical Slice Audit.
 *
 * Verifies:
 * - Direct navigation to topic tabs (#/subject/physics/topic/wpe/:tab)
 * - Tab 1: Question Bank, split-pane workspace, commitment lock, wrong answer, and academic HOLD
 * - Tab 2: Learn & Try (Core 1A 9 units, anchors, Core 1B 7 stages, prediction)
 * - Tab 3: Explorer simulation (GCDR 10 stages, parameter slider, chalkboard drawer)
 * - Tab 4: Standalone Labs (Harmonic Energy Well analytical workbench, turning points)
 * - 12.7" Tablet Touch Geometry: >= 48px controls, >= 56px primary CTAs, 0px horizontal overflow
 * - Screenshot captures across all 4 tabs in landscape and portrait
 *
 * No academic approval inferred from software validation.
 */

import assert from 'node:assert/strict';
import { test } from 'node:test';
import { mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import { chromium } from 'playwright-core';

const BASE_URL = 'http://127.0.0.1:3000';
const EVIDENCE_DIR = resolve('C:/Users/reall/.gemini/antigravity/brain/c39fd02d-dabd-412d-b94d-9f2254fd4134/phase3_evidence');

test('Gates P3-G5, P3-G7, P3-G8 — Phase 3 WPE Vertical Slice Tablet Audit & Adversarial Verification', { timeout: 90000 }, async (t) => {
  await mkdir(EVIDENCE_DIR, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1600, height: 1000 }, // 12.7" Tablet Landscape
    deviceScaleFactor: 2,
    hasTouch: true,
  });

  const page = await context.newPage();

  await t.test('1. Normal Application Entry -> WPE Topic Hub Navigation', async () => {
    await page.goto(`${BASE_URL}/#/subject/physics/topic/wpe`, { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('.topic-workspace-title', { timeout: 10000 });

    const titleText = await page.locator('.topic-workspace-title').textContent();
    assert.match(titleText ?? '', /Work, Power and Energy/);

    // Verify 4 canonical tabs present
    const tabs = await page.locator('.g9-topic-tabs-bar button').allTextContents();
    assert.equal(tabs.length, 4);
    assert.match(tabs[0], /Question Bank/);
    assert.match(tabs[1], /Learn & Try/);
    assert.match(tabs[2], /Explorer Simulation/);
    assert.match(tabs[3], /Standalone Labs/);

    await page.screenshot({ path: `${EVIDENCE_DIR}/phase3_wpe_topic_hub_landscape_1600x1000.png` });
  });

  await t.test('2. Tab 1: Question Bank, Split-Pane Workspace & Commitment Lifecycle', async () => {
    // Open PHYS-WPE-01
    await page.click('button[data-action=open-question][data-qid="PHYS-WPE-01"]');
    await page.waitForSelector('.g9-question-page', { timeout: 10000 });

    // Assert split pane in landscape
    const isSplit = await page.evaluate(() => {
      const split = document.querySelector('.g9-workspace-split');
      return split ? getComputedStyle(split).flexDirection === 'row' : false;
    });
    assert.equal(isSplit, true);

    // Select Option B (7.07 m/s)
    await page.click('input[name=response-option][value="opt-b"]');

    // Assert Submit button is enabled and has height >= 56px
    const submitBtn = page.locator('#g9-submit-btn');
    assert.equal(await submitBtn.isEnabled(), true);
    const btnBox = await submitBtn.boundingBox();
    assert(btnBox && btnBox.height >= 56, 'Submit button must have height >= 56px');

    // Commit answer
    await submitBtn.click();
    await page.waitForSelector('.g9-evaluation-feedback', { timeout: 10000 });

    const feedbackText = await page.locator('.g9-evaluation-feedback').textContent();
    assert.match(feedbackText ?? '', /(?:Status: CORRECT|Correct)/i);
    assert.match(feedbackText ?? '', /5\/5 pts/);

    // Assert inputs are disabled (committed lock)
    const radioDisabled = await page.locator('input[name=response-option]').first().isDisabled();
    assert.equal(radioDisabled, true);

    await page.screenshot({ path: `${EVIDENCE_DIR}/phase3_question_committed_feedback.png` });

    // Return back to deck
    await page.click('#g9-back-deck-btn');
    await page.waitForSelector('.g9-question-deck', { timeout: 10000 });
  });

  await t.test('3. Tab 1 Adversarial Cases: Wrong Answer & Academic HOLD', async () => {
    // 3A. Wrong answer on PHYS-WPE-02 (Quantity)
    await page.click('button[data-action=open-question][data-qid="PHYS-WPE-02"]');
    await page.waitForSelector('#g9-quantity-input', { timeout: 10000 });

    // Fill wrong quantity
    await page.fill('#g9-quantity-input', '10.0');
    await page.click('#g9-submit-btn');
    await page.waitForSelector('.g9-evaluation-feedback', { timeout: 10000 });

    const feedbackText = await page.locator('.g9-evaluation-feedback').textContent();
    assert.match(feedbackText ?? '', /(?:Status: INCORRECT|Incorrect)/i);
    assert.match(feedbackText ?? '', /0\/5 pts/);

    await page.click('#g9-back-deck-btn');
    await page.waitForSelector('.g9-question-deck', { timeout: 10000 });

    // 3B. Academic HOLD on PHYS-WPE-04
    await page.click('button[data-action=open-question][data-qid="PHYS-WPE-04"]');
    await page.waitForSelector('.g9-question-page', { timeout: 10000 });

    // Assert that status is HOLD and Submit button is permanently DISABLED
    const submitBtn = page.locator('#g9-submit-btn');
    assert.equal(await submitBtn.isDisabled(), true, 'Submit button must be disabled for question on academic HOLD');

    const identityText = await page.locator('.g9-question-page [data-slot=identity]').textContent();
    assert.match(identityText ?? '', /Status: HOLD/);
    assert.match(identityText ?? '', /Key: UNVERIFIED/);

    await page.click('#g9-back-deck-btn');
    await page.waitForSelector('.g9-question-deck', { timeout: 10000 });
  });

  await t.test('4. Tab 2: Learn & Try (Core 1A Concept Construction & Core 1B Reconstruction)', async () => {
    await page.click('button[data-tab="learn-try"]');
    await page.waitForSelector('.g9-learn-try-hub', { timeout: 10000 });

    // Verify Core 1A is mounted
    await page.waitForSelector('.g9-lesson-page', { timeout: 10000 });
    const unitCount = await page.locator('button[data-role^="A"]').count();
    assert.equal(unitCount, 9);

    // Click Unit A6 (Worked Example)
    await page.click('button[data-role="A6"]');
    const unitRole = await page.locator('.g9-unit-view').getAttribute('data-role');
    assert.equal(unitRole, 'A6');

    // Switch sub-role to Core 1B Transfer
    await page.click('button[data-subrole="CORE1B"]');
    await page.waitForSelector('.g9-cognitive-journey, .g9-transfer-page', { timeout: 10000 });

    const isCognitiveJourney = (await page.locator('.g9-cognitive-journey').count()) > 0;
    if (isCognitiveJourney) {
      // WPE 21-journey multi-journey engine
      const stages = await page.locator('button[data-stage]').allTextContents();
      assert.equal(stages.length, 6);
      assert.match(stages[0], /Predict/);
      // Advance to Stage 2 (Attempt)
      await page.click('#g9-start-attempt-btn');
      await page.waitForSelector('#g9-attempt-form', { timeout: 5000 });
    } else {
      // Generic 7-stage reconstruction progression rail
      const stages = await page.locator('nav[aria-label="Transfer progression"] span').allTextContents();
      assert.equal(stages.length, 7);
      assert.equal(stages[0], 'PREDICT');

      // Check prediction radio and click predict
      await page.locator('input[name=prediction]').first().check();
      await page.click('button[data-action="predict"]');
      await page.waitForSelector('.g9-transfer-page[data-stage="ATTEMPT"]', { timeout: 10000 });
    }

    await page.screenshot({ path: `${EVIDENCE_DIR}/phase3_learn_try_mounted.png` });
  });

  await t.test('5. Tab 3: Explorer Simulation (GCDR 10-Stage & Chalkboard Drawer)', async () => {
    await page.click('button[data-tab="explorer"]');
    await page.waitForSelector('.gcdr-explorer-page', { timeout: 10000 });

    // Verify Context Stage
    const currentStep = await page.locator('.gcdr-context-step').getAttribute('aria-current');
    assert.equal(currentStep, 'step');

    // Advance from CONTEXT to PREDICT
    await page.click('#gcdr-context-start');
    await page.waitForSelector('#gcdr-stage-input', { timeout: 10000 });

    // Fill prediction and advance to MANIPULATE stage
    await page.fill('#gcdr-stage-input', 'Independent prediction');
    await page.click('#gcdr-advance-stage-btn');
    await page.waitForSelector('#gcdr-parameter-x', { timeout: 10000 });

    // Adjust x parameter slider
    await page.fill('#gcdr-parameter-x', '0.25');
    assert.equal(await page.locator('#gcdr-parameter-x').inputValue(), '0.25');

    // Open Teacher's Chalkboard helper drawer
    await page.click('.gcdr-helper-btn');
    await page.waitForSelector('.gcdr-drawer-chalkboard', { timeout: 10000 });
    const chalkboardText = await page.locator('.gcdr-drawer-chalkboard').textContent();
    assert.match(chalkboardText ?? '', /No reviewed helper|Record your own reasoning/);

    await page.screenshot({ path: `${EVIDENCE_DIR}/phase3_explorer_simulation_mounted.png` });
  });

  await t.test('6. Tab 4: Standalone Labs (Harmonic Energy Well Workbench)', async () => {
    const labsTab = page.locator('button[data-tab="labs"]');
    await labsTab.scrollIntoViewIfNeeded();
    await labsTab.click();
    await page.waitForSelector('.g9-labs-workbench', { timeout: 10000 });

    // Initial state: x = 0.00m, U = 0.00J, K = 12.50J, v = 5.00 m/s
    assert.equal(await page.locator('#g9-well-x-val').textContent(), '0.00 m');
    assert.equal(await page.locator('#g9-well-u').textContent(), '0.00 J');
    assert.equal(await page.locator('#g9-well-k').textContent(), '12.50 J');
    assert.equal(await page.locator('#g9-well-v').textContent(), '5.00 m/s');
    assert.equal(await page.locator('#g9-well-tp').textContent(), 'NO');

    // Click Right Turning Point (+0.50m)
    await page.click('#g9-well-set-right-tp');
    assert.equal(await page.locator('#g9-well-x-val').textContent(), '0.50 m');
    assert.equal(await page.locator('#g9-well-u').textContent(), '12.50 J');
    assert.equal(await page.locator('#g9-well-k').textContent(), '0.00 J');
    assert.equal(await page.locator('#g9-well-v').textContent(), '0.00 m/s');
    assert.match(await page.locator('#g9-well-tp').textContent() ?? '', /YES/);

    await page.screenshot({ path: `${EVIDENCE_DIR}/phase3_standalone_labs_mounted.png` });
  });

  await t.test('7. 12.7" Tablet Touch Geometry & Portrait/Landscape Audit', async () => {
    // Switch to Portrait: 1000 x 1600
    await page.setViewportSize({ width: 1000, height: 1600 });
    const questionsTab = page.locator('button[data-tab="questions"]');
    await questionsTab.scrollIntoViewIfNeeded();
    await questionsTab.click();
    await page.waitForSelector('.g9-question-deck', { timeout: 10000 });

    // Audit touch targets
    const audit = await page.evaluate(() => {
      const controls = [...document.querySelectorAll<HTMLElement>('.g9-topic-workspace button, .g9-topic-workspace input:not([type=hidden]), .g9-topic-workspace select')];
      const visible = controls.filter(c => c.getClientRects().length > 0 && getComputedStyle(c).visibility !== 'hidden');
      const undersized = visible.filter(c => {
        const r = c.getBoundingClientRect();
        return r.width < 47.5 || r.height < 47.5; // Allow fractional subpixel rounding
      });
      const overflow = document.documentElement.scrollWidth > window.innerWidth;
      return { total: visible.length, undersized: undersized.map(c => c.outerHTML.slice(0, 100)), overflow };
    });

    assert.equal(audit.overflow, false, 'Page must not have horizontal overflow in portrait');
    assert.deepEqual(audit.undersized, [], 'All interactive elements must be >= 48px');

    await page.screenshot({ path: `${EVIDENCE_DIR}/phase3_topic_hub_portrait_1000x1600.png` });
  });

  await context.close();
  await browser.close();
});
