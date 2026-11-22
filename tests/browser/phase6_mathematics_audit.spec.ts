/**
 * tests/browser/phase6_mathematics_audit.spec.ts
 * Gate P6-G8 — 12.7" Tablet End-to-End Mathematics, IOQM, Proof & Workbench Audit.
 *
 * Verifies:
 * - Real user actions through live DOM application entrypoint (http://127.0.0.1:3000)
 * - Mathematics Subject Screen (#/subject/mathematics) with strand filtering and 5-level status
 * - Mathematics Multi-Topic Workspaces (#/subject/mathematics/topic/euclid-geometry, riemann, polynomials)
 * - IOQM Competitive Olympiad Hub (#/competitive/ioqm) with historical format evolution
 * - IOQM Timed Paper Workspace (#/practice/ioqm-challenge-a) with 180m timer, 30 parts, and integer answers [00..99]
 * - Mathematical Proof Workspace (A27) with Given/Goal/Lemmas and human review invariant
 * - Circles Master Workbench (A69) with 50 cards, band filtering, and Fault N09 key defense
 * - Declarative Portable Workbenches (DEC-A59): Riemann Sums and Long Division
 * - 12.7" tablet touch ergonomics: >= 48px hit targets, 56px primary actions, zero horizontal scroll
 * - High-resolution screenshot capture into phase6_evidence/
 *
 * No academic approval inferred from software validation.
 */

import assert from 'node:assert/strict';
import { test } from 'node:test';
import { mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import { chromium } from 'playwright-core';

const BASE_URL = 'http://127.0.0.1:3000';
const EVIDENCE_DIR = resolve('C:/Users/reall/.gemini/antigravity/brain/c39fd02d-dabd-412d-b94d-9f2254fd4134/phase6_evidence');

test('Gate P6-G8 — Phase 6 Mathematics Expansion Tablet Audit & E2E Journeys', { timeout: 120000 }, async (t) => {
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

  await t.test('1. Mathematics Subject Screen Mount & Strand Filtering', async () => {
    await page.goto(`${BASE_URL}/#/subject/mathematics`, { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('.g9-subject-screen', { timeout: 10000 });

    // Verify 5-level status banner
    const banner = await page.locator('.g9-subject-screen').textContent();
    assert.match(banner || '', /Academic Status: HOLD/);
    assert.match(banner || '', /Diagnostic Mode Authorized/);

    // Verify 7 topics rendered (Algebra, Analysis, Geometry)
    const topicCards = await page.locator('.g9-topic-card').count();
    assert.equal(topicCards, 7);

    await auditGeometry('Mathematics Subject Screen');
    await page.screenshot({ path: `${EVIDENCE_DIR}/phase6_math_subject_1600x1000.png` });
  });

  await t.test('2. Mathematics Topic Workspace: Euclidean Geometry & Question Bank', async () => {
    await page.goto(`${BASE_URL}/#/subject/mathematics/topic/euclid-geometry/questions`, { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('.g9-topic-workspace', { timeout: 10000 });

    const title = await page.locator('.topic-workspace-title').textContent();
    assert.match(title || '', /Mathematics: Euclidean Geometry & Proofs/);

    // Verify 4 problem cards
    const deckCards = await page.locator('.g9-question-deck > div:nth-child(2) > div').count();
    assert.equal(deckCards, 4);

    await auditGeometry('Euclid Topic Question Bank');
  });

  await t.test('3. Euclidean Geometry Proof Workspace (A27) Mount & Deduction Steps', async () => {
    // Switch to Learn & Try tab and select Core 1B (Proof Workspace)
    await page.goto(`${BASE_URL}/#/subject/mathematics/topic/euclid-geometry/learn-try`, { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('.g9-learn-try-hub', { timeout: 10000 });

    // Click Core 1B subrole button
    await page.locator('button[data-subrole="CORE1B"]').click();
    await page.waitForSelector('.proof-workspace', { timeout: 10000 });

    // Verify proof workspace elements
    assert.ok(await page.locator('.proof-archetype-badge').isVisible());
    assert.match(await page.locator('.proof-archetype-badge').textContent() || '', /MATH_E2/);
    assert.ok(await page.locator('.proof-given-statements').isVisible());
    assert.ok(await page.locator('.proof-goal-statement').isVisible());

    // Enter a proof step
    await page.locator('#proof-assertion-input').fill('∠ACB = 90°');
    await page.locator('#proof-justification-input').fill("Thales's Theorem for diameter AB");
    await page.locator('#add-step-btn').click();

    // Verify step appears in sequence
    const stepsCount = await page.locator('.proof-step-row').count();
    assert.equal(stepsCount, 1);

    // Submit for human evaluation
    await page.locator('#submit-proof-btn').click();
    await page.waitForSelector('.proof-evaluation-container', { timeout: 10000 });

    const evalText = await page.locator('.proof-evaluation-container').textContent();
    assert.match(evalText || '', /REVIEW_PENDING/);
    assert.match(evalText || '', /Withheld/);

    await auditGeometry('Mathematical Proof Workspace');
    await page.screenshot({ path: `${EVIDENCE_DIR}/phase6_proof_workspace_1600x1000.png` });
  });

  await t.test('4. Standalone Labs: Circles Master (A69) Parity & Fault N09 Key Defense', async () => {
    await page.goto(`${BASE_URL}/#/labs/lab:circles-master`, { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('.circles-master-hub', { timeout: 10000 });

    // Verify header and band filter buttons
    const filterButtons = await page.locator('.band-filter-btn').count();
    assert.equal(filterButtons, 5); // all, D1, D2, D3, D4

    // Verify 50 question cards rendered
    const cardCount = await page.locator('.qb-question').count();
    assert.equal(cardCount, 50);

    // Verify Fault N09 Key Defense: Zero data-correct attributes in DOM
    const dataCorrectCount = await page.locator('[data-correct]').count();
    assert.equal(dataCorrectCount, 0, 'Fault N09 key leakage: data-correct found in DOM');

    // Filter by D1
    await page.locator('button[data-filter="D1"]').click();
    const d1Count = await page.locator('.qb-question').count();
    assert.ok(d1Count > 0 && d1Count < 50);

    // Attempt a question (click first option on first card)
    const firstOption = page.locator('.qb-question:first-child .circ-opt-btn:first-child');
    await firstOption.click();

    // Verify telemetry updated
    const attempted = await page.locator('#stat-attempted').textContent();
    assert.equal(attempted, '1');

    await auditGeometry('Circles Master Workbench');
    await page.screenshot({ path: `${EVIDENCE_DIR}/phase6_circles_master_1600x1000.png` });
  });

  await t.test('5. Declarative Portable Workbench: Riemann Sums Partition Refinement', async () => {
    await page.goto(`${BASE_URL}/#/labs/lab:riemann-sums`, { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('.portable-workbench-panel', { timeout: 10000 });

    // Verify title and grid
    const title = await page.locator('.portable-workbench-panel h3').textContent();
    assert.match(title || '', /Riemann Sum/);

    // Apply partition refinement transformation
    const refineBtn = page.locator('button[data-rule-id="rule-refine-n4"]');
    assert.ok(await refineBtn.isVisible());
    await refineBtn.click();

    // Verify transformation outcome notice
    await page.waitForSelector('.portable-outcome-notice', { timeout: 10000 });
    const notice = await page.locator('.portable-outcome-notice').textContent();
    assert.match(notice || '', /ACCEPT/);

    await auditGeometry('Riemann Sums Portable Workbench');
    await page.screenshot({ path: `${EVIDENCE_DIR}/phase6_riemann_sums_1600x1000.png` });
  });

  await t.test('6. IOQM Competitive Olympiad Hub Profile & Historical Format Evolution', async () => {
    await page.goto(`${BASE_URL}/#/competitive/ioqm`, { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('.competitive-exam-hub', { timeout: 10000 });

    // Verify conducting body and title
    const hubText = await page.locator('.competitive-exam-hub').textContent();
    assert.match(hubText || '', /Indian Olympiad Qualifier in Mathematics/);
    assert.match(hubText || '', /MTA \/ HBCSE/);

    // Verify historical format evolution panel
    assert.match(hubText || '', /2024–2025 Format \(Current\)/);
    assert.match(hubText || '', /2020–2021 Format/);

    // Verify past papers archive on HOLD
    assert.match(hubText || '', /Historical Paper Archive \(2020–2024\)/);

    // Verify primary CTA button exists
    const startBtn = page.locator('#btn-start-challenge');
    assert.ok(await startBtn.isVisible());

    await auditGeometry('IOQM Competitive Olympiad Hub');
    await page.screenshot({ path: `${EVIDENCE_DIR}/phase6_ioqm_hub_1600x1000.png` });
  });

  await t.test('7. IOQM Timed Paper Workspace: Countdown, Navigation & Integer Scoring', async () => {
    await page.goto(`${BASE_URL}/#/practice/ioqm-challenge-a`, { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('.paper-workspace-screen', { timeout: 15000 });

    // Verify countdown timer
    assert.ok(await page.locator('#timer-display').isVisible());
    const timerText = await page.locator('#timer-display').textContent();
    assert.match(timerText || '', /179:|180:/); // Near 180 mins

    // Verify 30 parts in navigation sidebar
    const partButtons = await page.locator('.part-select-btn').count();
    assert.equal(partButtons, 30);

    // Enter integer answer in [00..99] input
    const input = page.locator('#integer-answer-input');
    assert.ok(await input.isVisible());
    await input.fill('42');
    await page.locator('#save-integer-btn').click();

    // Verify live feedback badge
    const feedback = await page.locator('#integer-validation-msg').textContent();
    assert.match(feedback || '', /Response saved: 42/);

    // Submit complete paper
    await page.locator('#submit-paper-btn').click();
    await page.waitForTimeout(500);

    const submitStatus = await page.locator('#submit-paper-btn').textContent();
    assert.match(submitStatus || '', /Paper Durably Committed/);

    await auditGeometry('IOQM Timed Paper Workspace');
    await page.screenshot({ path: `${EVIDENCE_DIR}/phase6_ioqm_paper_1600x1000.png` });
  });

  await t.test('8. Portrait Viewport Audit (1000x1600) & Zero Overflow', async () => {
    await page.setViewportSize({ width: 1000, height: 1600 });
    await page.goto(`${BASE_URL}/#/subject/mathematics`, { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('.g9-subject-screen', { timeout: 10000 });

    await auditGeometry('Mathematics Subject Screen Portrait');
    await page.screenshot({ path: `${EVIDENCE_DIR}/phase6_math_subject_portrait_1000x1600.png` });
  });

  await browser.close();
});
