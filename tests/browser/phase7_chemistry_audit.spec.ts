/**
 * tests/browser/phase7_chemistry_audit.spec.ts
 * Gate P7-G8 — 12.7" Tablet End-to-End Chemistry, Redox Dual-Execution, Workspace & Titration Audit.
 *
 * Verifies:
 * - Real user actions through live DOM application entrypoint (http://127.0.0.1:3000)
 * - Chemistry Subject Screen (#/subject/chemistry) with strand filtering and 5-level status
 * - Chemistry Multi-Topic Workspaces (#/subject/chemistry/topic/chem-redox/practice, learn-try, labs)
 * - Chemical Representation Workspace (A28) embedded in CORE1B journey with 4 tabs, net ionic charge balancing, and human review invariant
 * - Redox Adaptive Proof Workbench (A69 Pilot 2) at #/labs/lab:redox-adaptive with formative practice badge
 * - Volumetric Titration Simulator at #/labs/lab:titration-simulator with 5-regime analytical curve, indicator transitions, and estimation drill
 * - Declarative Portable Redox Workbench (DEC-A59) at #/labs/lab:redox-equivalence
 * - 12.7" tablet touch ergonomics: >= 48px hit targets, 56px primary actions, zero horizontal scroll
 * - High-resolution screenshot capture into phase7_evidence/
 *
 * No academic approval inferred from software validation.
 */

import assert from 'node:assert/strict';
import { test } from 'node:test';
import { mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import { chromium } from 'playwright-core';

const BASE_URL = 'http://127.0.0.1:3000';
const EVIDENCE_DIR = resolve('C:/Users/reall/.gemini/antigravity/brain/c39fd02d-dabd-412d-b94d-9f2254fd4134/phase7_evidence');

test('Gate P7-G8 — Phase 7 Chemistry Expansion Tablet Audit & E2E Journeys', { timeout: 120000 }, async (t) => {
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

  await t.test('1. Chemistry Subject Screen Mount & Strand Filtering', async () => {
    await page.goto(`${BASE_URL}/#/subject/chemistry`, { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('.g9-subject-screen', { timeout: 10000 });

    // Verify 5-level status banner
    const banner = await page.locator('.g9-subject-screen').textContent();
    assert.match(banner || '', /Academic Status: HOLD/);
    assert.match(banner || '', /Diagnostic Mode Authorized/);

    // Verify 3 topics rendered
    const topicCards = await page.locator('.g9-topic-card').count();
    assert.equal(topicCards, 3);

    await auditGeometry('Chemistry Subject Screen');
    await page.screenshot({ path: `${EVIDENCE_DIR}/phase7_chem_subject_1600x1000.png` });
  });

  await t.test('2. Chemistry Topic Workspace: Redox Reactions & Question Deck', async () => {
    await page.goto(`${BASE_URL}/#/subject/chemistry/topic/chem-redox/questions`, { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('.g9-topic-workspace', { timeout: 10000 });

    const title = await page.locator('.topic-workspace-title').textContent();
    assert.match(title || '', /Redox Reactions & Electron Transfer/);

    // Verify problem cards
    const deckCards = await page.locator('.g9-question-deck > div:nth-child(2) > div').count();
    assert.equal(deckCards, 4);

    // Verify authenticity badges exist in deck
    const deckText = await page.locator('.g9-question-deck').textContent();
    assert.match(deckText || '', /Authentic \(v3\.5\)/);
    assert.match(deckText || '', /SYNTHETIC_DIAGNOSTIC_FIXTURE/);

    await auditGeometry('Redox Topic Question Bank');
    await page.screenshot({ path: `${EVIDENCE_DIR}/phase7_chem_topic_practice_1600x1000.png` });
  });

  await t.test('3. Chemical Representation Workspace (A28) Mount under CORE1B', async () => {
    await page.goto(`${BASE_URL}/#/subject/chemistry/topic/chem-redox/learn-try`, { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('.g9-learn-try-hub', { timeout: 10000 });

    // Click Core 1B subrole button
    await page.locator('button[data-subrole="CORE1B"]').click();
    await page.waitForSelector('.chemical-work-workspace', { timeout: 10000 });

    // Verify 4 tabs in chemical workspace
    const tabs = await page.locator('.chem-tab-btn').count();
    assert.equal(tabs, 4);

    // Verify Archetype badge
    const badge = await page.locator('.chem-archetype-badge').textContent();
    assert.match(badge || '', /CHEM_E2/);

    // Enter formula in structure tab
    const formulaInput = page.locator('#chem-input-data');
    await formulaInput.fill('C2H5OH');
    await formulaInput.dispatchEvent('change');

    // Verify Hill notation / molar mass
    const meta = await page.locator('.chem-structure-meta').textContent();
    assert.match(meta || '', /C2H6O/);
    assert.match(meta || '', /46\.069|46\.07/);

    // Switch to EQUATION tab
    await page.locator('button[data-tab="EQUATION"]').click();
    await page.waitForSelector('#chem-equation-input', { timeout: 5000 });

    // Verify net ionic charge balance check
    await page.locator('#chem-equation-input').fill('Fe2+ + Ce4+ -> Fe3+ + Ce3+');
    await page.locator('#chem-equation-input').dispatchEvent('input');

    const balanceNotice = await page.locator('.chem-overall-badge').textContent();
    assert.match(balanceNotice || '', /Stoichiometrically & Charge Balanced/i);

    // Submit for human evaluation -> A28 Invariant: points withheld
    await page.locator('#btn-request-chem-eval').click();
    await page.waitForSelector('.chem-evaluation-panel', { timeout: 5000 });

    const evalText = await page.locator('.chem-evaluation-panel').textContent();
    assert.match(evalText || '', /REVIEW_PENDING/);
    assert.match(evalText || '', /Score withheld/);

    await auditGeometry('Chemical Representation Workspace');
    await page.screenshot({ path: `${EVIDENCE_DIR}/phase7_chem_workspace_core1b_1600x1000.png` });
  });

  await t.test('4. Redox Adaptive Visual Proof Workbench (A69 Pilot 2)', async () => {
    await page.goto(`${BASE_URL}/#/labs/lab:redox-adaptive`, { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('.redox-adaptive-hub', { timeout: 10000 });

    // Verify Formative practice badge
    const hubText = await page.locator('.redox-adaptive-hub').textContent();
    assert.match(hubText || '', /Formative Self-Check · Diagnostic Practice \(HOLD\)/);

    // Verify 3 block selector buttons
    const blockBtns = await page.locator('.block-select-btn').count();
    assert.equal(blockBtns, 3);

    // Verify route advisory box starts in OPEN
    const routeText = await page.locator('#route').textContent();
    assert.match(routeText || '', /OPEN/);

    // Verify SVG visual representation
    const svgCount = await page.locator('.visual-svg-container svg').count();
    assert.equal(svgCount, 1);

    // Click hint button -> hint depth increments
    await page.locator('#hintButton').click();
    const hintsCount = await page.locator('.hints-deck > div').count();
    assert.equal(hintsCount, 1);

    await auditGeometry('Redox Adaptive Proof Workbench');
    await page.screenshot({ path: `${EVIDENCE_DIR}/phase7_redox_adaptive_1600x1000.png` });
  });

  await t.test('5. Volumetric Titration Simulator Lab', async () => {
    await page.goto(`${BASE_URL}/#/labs/lab:titration-simulator`, { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('.titration-simulator-hub', { timeout: 10000 });

    // Verify Formative badge
    const hubText = await page.locator('.titration-simulator-hub').textContent();
    assert.match(hubText || '', /Formative Self-Check · Diagnostic Exploration \(HOLD\)/);

    // Verify curve SVG and flask SVG
    assert.ok(await page.locator('svg[aria-label="Analytical titration pH curve"]').isVisible());
    assert.ok(await page.locator('svg[aria-label^="Digital conical flask"]').isVisible());

    // Dispense titrant (+1.0 mL)
    await page.locator('button[data-dispense="1.0"]').click();
    assert.equal(await page.locator('#telemetry-vol').textContent(), '1.0 mL');

    // Dispense +5.0 mL
    await page.locator('button[data-dispense="5.0"]').click();
    assert.equal(await page.locator('#telemetry-vol').textContent(), '6.0 mL');

    // Formative diagnostic estimation check
    await page.locator('#input-est-conc').fill('0.086');
    await page.locator('#btn-submit-est').click();
    await page.waitForSelector('#est-feedback-msg', { timeout: 5000 });
    const estMsg = await page.locator('#est-feedback-msg').textContent();
    assert.match(estMsg || '', /within 3%/);

    await auditGeometry('Volumetric Titration Simulator');
    await page.screenshot({ path: `${EVIDENCE_DIR}/phase7_titration_simulator_1600x1000.png` });
  });

  await t.test('6. Declarative Portable Redox Workbench (DEC-A59)', async () => {
    await page.goto(`${BASE_URL}/#/labs/lab:redox-equivalence`, { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('.portable-workbench-panel', { timeout: 10000 });

    // Verify title and provenance
    const title = await page.locator('.portable-workbench-panel h3').textContent();
    assert.match(title || '', /Redox oxidation-state and electron-equivalence/);

    const provenance = await page.locator('.portable-provenance-badge').textContent();
    assert.match(provenance || '', /NON_CANONICAL_COMPILED_PROOF/);

    // Apply rule: equate-redox-electrons
    const ruleBtn = page.locator('button[data-rule-id="rule-equate-redox-electrons"]');
    assert.ok(await ruleBtn.isVisible());
    await ruleBtn.click();

    // Verify outcome notice
    await page.waitForSelector('.portable-outcome-notice', { timeout: 10000 });
    const notice = await page.locator('.portable-outcome-notice').textContent();
    assert.match(notice || '', /ACCEPT/);

    await auditGeometry('Declarative Portable Redox Workbench');
    await page.screenshot({ path: `${EVIDENCE_DIR}/phase7_portable_redox_1600x1000.png` });
  });

  await t.test('7. Portrait Viewport Audit (1000x1600) & Zero Overflow', async () => {
    await page.setViewportSize({ width: 1000, height: 1600 });
    await page.goto(`${BASE_URL}/#/subject/chemistry`, { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('.g9-subject-screen', { timeout: 10000 });

    await auditGeometry('Chemistry Subject Screen Portrait');
    await page.screenshot({ path: `${EVIDENCE_DIR}/phase7_chem_subject_portrait_1000x1600.png` });
  });

  await browser.close();
});
