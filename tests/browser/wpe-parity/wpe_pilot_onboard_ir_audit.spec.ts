/**
 * tests/browser/wpe-parity/wpe_pilot_onboard_ir_audit.spec.ts
 * OnBoard IR Audit Suite: Pilot WPE (v4.1) Native Parity in learn-try Hub (v4.2).
 *
 * Implements OnBoard IR Verification for all 7 subroles:
 * 1. ZERO IFRAMES: 100% native TypeScript DOM rendering.
 * 2. Subrole 1: Core 1A (9 Units A1–A9, Worked Example A6, Misconception Repair A7).
 * 3. Subrole 2: Foundation Lesson (preview/physics-wpe.html):
 *    - Conservative force gradient F = -dU/dx
 *    - Interactive Harmonic Potential Well (m=1.0 kg, k=100 N/m, E=12.5 J)
 *    - Position slider x in [-0.50, +0.50] m, live readouts (U, K, v), dynamic SVG
 *    - Work-Kinetic Energy Theorem (W_net = ΔK)
 * 4. Subrole 3: 5 Thinking Skills Runner (physics/wpe/learn-challenge.html):
 *    - 5 skills: work-sign, momentum-energy, energy-motion, potential-force, momentum-fragments
 *    - Dual-panel: Core 1A Guide + Core 1B Fresh Challenge
 *    - Distractor diagnostics, 2-tier hints, explanation commit
 * 5. Subrole 4: Attempt-First Practice (preview/practice.html):
 *    - Spring-mass energy release problem (m=0.5 kg, k=50 N/m, x=0.4 m)
 *    - 4 options with misconception tags, hint disclosure
 *    - Textarea validation (>= 10 chars), attempt lock, 4-step worked solution
 * 6. Subrole 5: PH04 Curricular Units (nsejs/physics/ph04/units.v1.json):
 *    - 5 units with high-fidelity vector SVGs
 *    - 3-tier progressions, worked anchors, fresh practice tasks
 * 7. Subrole 6: Core 1B 21 Cognitive Journeys:
 *    - 21 journeys (C01–C08, E01–E05, F01–F08), 6 cognitive stages, stylus scratchpad
 * 8. Subrole 7: 13 Learning Pack Bridges:
 *    - 13 canonical concept bridges full text markdown reader
 * 9. 12.7" Tablet Touch Ergonomics (>= 48px controls, 0px horizontal scroll overflow).
 *
 * All items on academic HOLD (Rule 13 compliant).
 */

import assert from 'node:assert/strict';
import { test } from 'node:test';
import { mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import { chromium } from 'playwright-core';

const BASE_URL = 'http://127.0.0.1:3000';
const EVIDENCE_DIR = resolve('C:/Users/reall/.gemini/antigravity/brain/8107d052-dc5f-4940-bc82-ef420a0d4802/evidence');

test('OnBoard IR Audit Suite — Pilot WPE Full Native Parity in learn-try Hub', { timeout: 120000 }, async (t) => {
  await mkdir(EVIDENCE_DIR, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1600, height: 1000 }, // 12.7" Tablet Landscape
    deviceScaleFactor: 2,
    hasTouch: true,
  });

  const page = await context.newPage();

  // Ensure page loads
  await page.goto(`${BASE_URL}/#/subject/physics/topic/wpe/learn-try`, { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('.g9-learn-try-hub', { timeout: 15000 });

  // 1. Initial State: Core 1A is mounted by default with 9 units
  await t.test('1. Core 1A Concept Construction (9 Units, Worked Example, Misconceptions)', async () => {
    await page.waitForSelector('.g9-lesson-page', { timeout: 10000 });
    const unitButtons = page.locator('button[data-role^="A"]');
    assert.equal(await unitButtons.count(), 9, 'Core 1A must contain all 9 units (A1–A9)');

    // Check Unit A1
    const a1Title = await page.locator('.g9-unit-view h2').textContent();
    assert.match(a1Title ?? '', /Phenomenon: Work, Direction & Energy Transfer/);

    // Click Unit A6 Worked Example
    await page.click('button[data-role="A6"]');
    const a6Text = await page.locator('.g9-unit-view').textContent();
    assert.match(a6Text ?? '', /Toy Cart Ramp Climb Worked Example/);

    // Click Unit A7 Misconception
    await page.click('button[data-role="A7"]');
    const a7Text = await page.locator('.g9-unit-view').textContent();
    assert.match(a7Text ?? '', /Equal Momentum vs Equal Kinetic Energy/);

    // Verify Zero Iframes
    assert.equal(await page.evaluate(() => document.querySelectorAll('iframe').length), 0);
    await page.screenshot({ path: `${EVIDENCE_DIR}/ir_audit_01_core1a_units.png` });
  });

  // 2. Subrole 2: Foundation Lesson (preview/physics-wpe.html)
  await t.test('2. Foundation Lesson (Conservative Fields, Interactive Harmonic Well Slider & Readouts)', async () => {
    await page.click('button[data-subrole="FOUNDATION"]');
    await page.waitForSelector('.g9-wpe-foundation', { timeout: 10000 });

    // Section 1: Conservative Force & Potential Gradient
    const s1Text = await page.locator('.g9-wpe-foundation').textContent();
    assert.match(s1Text ?? '', /How energy is shared/);
    assert.match(s1Text ?? '', /F\(x\) = -dU\/dx/);

    // Section 2: Interactive Slider
    const slider = page.locator('#wpe-foundation-slider');
    assert.equal(await slider.count(), 1, 'Slider must exist');

    // Move slider to +0.40 m
    await slider.evaluate((el: HTMLInputElement) => {
      el.value = '0.40';
      el.dispatchEvent(new Event('input', { bubbles: true }));
    });

    // Check live readouts at x = +0.40 m:
    // U = 0.5 * 100 * 0.16 = 8.00 J
    // K = 12.5 - 8.0 = 4.50 J
    // v = sqrt(2 * 4.5 / 1.0) = 3.00 m/s
    const uText = await page.locator('.g9-wpe-foundation').textContent();
    assert.match(uText ?? '', /8\.00 J/);
    assert.match(uText ?? '', /4\.50 J/);
    assert.match(uText ?? '', /3\.00 m\/s/);

    // Section 3: Work-Kinetic Energy Theorem
    assert.match(uText ?? '', /How work changes energy/);
    assert.match(uText ?? '', /W_net = ∫ F_net · dr = ΔK/);

    // Verify Zero Iframes
    assert.equal(await page.evaluate(() => document.querySelectorAll('iframe').length), 0);
    await page.screenshot({ path: `${EVIDENCE_DIR}/ir_audit_02_foundation_lesson_slider.png` });
  });

  // 3. Subrole 3: 5 Thinking Skills Runner (physics/wpe/learn-challenge.html)
  await t.test('3. 5 Thinking Skills Runner (Dual-Panel Guide + Challenge, Distractor Diagnostics)', async () => {
    await page.click('button[data-subrole="THINKING_SKILLS"]');
    await page.waitForSelector('.g9-wpe-skills-runner', { timeout: 10000 });

    // Verify 5 skill tabs exist
    const skillTabs = page.locator('button[data-skill-id]');
    assert.equal(await skillTabs.count(), 5, 'Must have exactly 5 thinking skills');

    // Verify Skill 1: work-sign Guide & Challenge panels
    const runnerText = await page.locator('.g9-wpe-skills-runner').textContent();
    assert.match(runnerText ?? '', /Work and its sign/);
    assert.match(runnerText ?? '', /A guide: the moving crate/);
    assert.match(runnerText ?? '', /Your turn: two journeys/);

    // Check SVG in Guide panel
    const guideSvg = page.locator('.g9-wpe-skills-runner svg');
    assert(await guideSvg.count() >= 1, 'Guide panel must embed authentic SVG diagram');

    // Select distractor Option B (-16 J)
    await page.click('input[name="skill-opt-work-sign"][value="1"]');
    await page.fill('#skill-reasoning-work-sign', 'I calculated first journey only without second.');
    await page.click('#btn-lock-skill');

    // Reveal Hint 1
    await page.click('#btn-show-hint-skill');
    const hintText = await page.locator('.g9-wpe-skills-runner').textContent();
    assert.match(hintText ?? '', /Treat each journey separately/);

    // Check thinking / solution reveal
    await page.click('#btn-check-solution-skill');
    const solText = await page.locator('.g9-wpe-skills-runner').textContent();
    assert.match(solText ?? '', /Diagnostic Misconception Detected/);
    assert.match(solText ?? '', /Check whether you accounted for both journeys/);
    assert.match(solText ?? '', /W_total = −32 J/);

    // Verify Zero Iframes
    assert.equal(await page.evaluate(() => document.querySelectorAll('iframe').length), 0);
    await page.screenshot({ path: `${EVIDENCE_DIR}/ir_audit_03_thinking_skills_runner.png` });
  });

  // 4. Subrole 4: Attempt-First Practice (preview/practice.html)
  await t.test('4. Attempt-First Practice (Spring Energy Release, Lock & 4-Step Solution)', async () => {
    await page.click('button[data-subrole="PRACTICE"]');
    await page.waitForSelector('.g9-wpe-practice-challenge', { timeout: 10000 });

    const pracText = await page.locator('.g9-wpe-practice-challenge').textContent();
    assert.match(pracText ?? '', /Where does the spring’s energy go\?/);
    assert.match(pracText ?? '', /m = 0\.50 kg/);
    assert.match(pracText ?? '', /k = 50\.0 N\/m/);

    // 4 radio choices
    const opts = page.locator('input[name="wpe-practice-opt"]');
    assert.equal(await opts.count(), 4);

    // Toggle physical hint
    await page.click('#btn-toggle-hint');
    const hintText = await page.locator('.g9-wpe-practice-challenge').textContent();
    assert.match(hintText ?? '', /Physical Hint: Recall that the system is isolated and conservative/);

    // Try to record attempt without text -> should show validation error
    await page.click('input[name="wpe-practice-opt"][value="B"]');
    await page.click('#btn-record-attempt');
    assert.match(await page.locator('.g9-wpe-practice-challenge').textContent() ?? '', /at least 10 non-whitespace characters/);

    // Fill valid explanation
    await page.fill('#wpe-practice-reasoning', 'Total mechanical energy E = 0.5*k*x^2 = 4 J. At x = 0, all energy converts to kinetic energy K = 4 J, so v = 4 m/s.');
    await page.click('#btn-record-attempt');

    // Assert inputs are disabled (locked)
    assert.equal(await page.locator('input[name="wpe-practice-opt"]').first().isDisabled(), true);
    assert.equal(await page.locator('#wpe-practice-reasoning').isDisabled(), true);

    // Reveal 4-step formal worked solution
    await page.click('#btn-reveal-solution');
    const solPanel = await page.locator('.g9-wpe-practice-challenge').textContent();
    assert.match(solPanel ?? '', /1\. Conservation of Mechanical Energy/);
    assert.match(solPanel ?? '', /E_tot = 4\.0 J/);
    assert.match(solPanel ?? '', /v_1 = 4\.0 m\/s/);

    // Verify Zero Iframes
    assert.equal(await page.evaluate(() => document.querySelectorAll('iframe').length), 0);
    await page.screenshot({ path: `${EVIDENCE_DIR}/ir_audit_04_attempt_first_practice.png` });
  });

  // 5. Subrole 5: PH04 Curricular Units (nsejs/physics/ph04/units.v1.json)
  await t.test('5. PH04 Curricular Units (Authentic Vector SVGs, 3-Tier Progressions, Anchors)', async () => {
    await page.click('button[data-subrole="PH04"]');
    await page.waitForSelector('.g9-wpe-ph04-units', { timeout: 10000 });

    // 5 units tabs
    const uTabs = page.locator('button[data-ph04-idx]');
    assert.equal(await uTabs.count(), 5, 'Must have exactly 5 PH04 units');

    // Unit W01 verification
    const ph04Text = await page.locator('.g9-wpe-ph04-units').textContent();
    assert.match(ph04Text ?? '', /Multi-force work–energy ledger and signed work accounting/);
    assert.match(ph04Text ?? '', /3-Tier Cognitive Progression/);
    assert.match(ph04Text ?? '', /Worked Anchor Problem/);
    assert.match(ph04Text ?? '', /Diagnostic Misconception & Repair/);

    // Check Vector SVG
    const svgCount = await page.locator('.g9-wpe-ph04-units svg').count();
    assert(svgCount >= 1, 'PH04 unit must embed authentic vector diagram');

    // Check practice task
    assert.match(ph04Text ?? '', /AUTHORED-PH04-W01-C1B-TASK-R1/);

    // Switch to Unit W03 (Constant Power)
    await page.click('button[data-ph04-idx="2"]');
    const w03Text = await page.locator('.g9-wpe-ph04-units').textContent();
    assert.match(w03Text ?? '', /Constant power and non-linear velocity evolution/);

    // Verify Zero Iframes
    assert.equal(await page.evaluate(() => document.querySelectorAll('iframe').length), 0);
    await page.screenshot({ path: `${EVIDENCE_DIR}/ir_audit_05_ph04_units.png` });
  });

  // 6. Subrole 6: Core 1B 21 Cognitive Journeys
  await t.test('6. Core 1B (21 Cognitive Journeys + Stylus Ink Scratchpad)', async () => {
    await page.click('button[data-subrole="CORE1B"]');
    await page.waitForSelector('.g9-cognitive-journey', { timeout: 10000 });

    // Check 21 journeys in select dropdown
    const journeyOpts = page.locator('#g9-journey-select option');
    assert.equal(await journeyOpts.count(), 21, 'Must have 21 cognitive journeys');

    // Verify 6-stage cognitive progression
    const stages = await page.locator('button[data-stage]').allTextContents();
    assert.equal(stages.length, 6);
    assert.match(stages[0], /Predict/);
    assert.match(stages[1], /Attempt/);
    assert.match(stages[2], /Reconstruct/);

    // Check Stylus Ink Scratchpad
    const canvasCount = await page.locator('.g9-scratchpad-workspace').count();
    assert.equal(canvasCount, 1, 'Stylus ink scratchpad must be present');

    // Verify Zero Iframes
    assert.equal(await page.evaluate(() => document.querySelectorAll('iframe').length), 0);
    await page.screenshot({ path: `${EVIDENCE_DIR}/ir_audit_06_core1b_journeys.png` });
  });

  // 7. Subrole 7: 13 Learning Pack Bridges Viewer
  await t.test('7. 13 Learning Pack Bridges Viewer (WPE Source-to-Core1A Bridges)', async () => {
    await page.click('button[data-subrole="LEARNING_PACKS"]');
    await page.waitForSelector('.g9-wpe-learning-packs', { timeout: 10000 });

    const packsText = await page.locator('.g9-wpe-learning-packs').textContent();
    assert.match(packsText ?? '', /Source-to-Core1A Learning Bridges/);

    // Verify 13 buttons
    const packBtns = page.locator('button[data-pack-id]');
    assert.equal(await packBtns.count(), 13, 'Must have 13 learning pack buttons');

    // Click on POTENTIAL_WELLS
    await page.click('button[data-pack-id="POTENTIAL_WELLS"]');
    const wellPackText = await page.locator('.g9-wpe-learning-packs').textContent();
    assert.match(wellPackText ?? '', /Potential wells, turning points and reachable regions/);

    // Verify Zero Iframes
    assert.equal(await page.evaluate(() => document.querySelectorAll('iframe').length), 0);
    await page.screenshot({ path: `${EVIDENCE_DIR}/ir_audit_07_learning_packs_viewer.png` });
  });

  // 8. 12.7" Tablet Touch Ergonomics & 0px Overflow in Portrait
  await t.test('8. 12.7" Tablet Touch Ergonomics & Portrait 1000x1600 Verification', async () => {
    await page.setViewportSize({ width: 1000, height: 1600 });
    await page.waitForTimeout(500);

    // Check horizontal scroll overflow
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
    assert.equal(scrollWidth <= clientWidth, true, `Expected no horizontal scroll overflow: ${scrollWidth} <= ${clientWidth}`);

    // Check subrole button touch targets >= 48px
    const subBtns = page.locator('button[data-subrole]');
    const count = await subBtns.count();
    for (let i = 0; i < count; i++) {
      const box = await subBtns.nth(i).boundingBox();
      assert(box !== null && box.height >= 48, `Button height must be >= 48px, got ${box?.height}`);
    }

    await page.screenshot({ path: `${EVIDENCE_DIR}/ir_audit_08_portrait_1000x1600.png` });
  });

  await browser.close();
});
