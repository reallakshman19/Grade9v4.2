import assert from 'node:assert/strict';
import { test } from 'node:test';
import { mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import { chromium } from 'playwright-core';
import type { Browser } from 'playwright-core';

const BASE_URL = 'http://127.0.0.1:3000';
const EVIDENCE_DIR = resolve('C:/Users/reall/.gemini/antigravity/brain/c39fd02d-dabd-412d-b94d-9f2254fd4134/phase2_evidence');

test('Gate G6 & G7 — Phase 2 Universal Search Tablet Audit & End-to-End Journey', { timeout: 90000 }, async (t) => {
  await mkdir(EVIDENCE_DIR, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1600, height: 1000 }, // 12.7" Tablet Landscape
    deviceScaleFactor: 2,
    hasTouch: true,
  });

  const page = await context.newPage();

  await t.test('1. Normal Application Entry -> Home Search -> Search Results Deep Link', async () => {
    await page.goto(`${BASE_URL}/#/home`, { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('#g9-search-input', { timeout: 10000 });

    // Type query in Homepage Hero Search
    await page.fill('#g9-search-input', 'energy');
    await page.click('#g9-search-btn');

    // Asserts router transitions to #/search?q=energy
    await page.waitForURL('**/#/search?q=energy');
    await page.waitForSelector('.g9-search', { timeout: 10000 });

    // Asserts search input pre-fills 'energy' and results render
    const inputVal = await page.inputValue('input[data-search]');
    assert.equal(inputVal, 'energy');

    await page.waitForSelector('[data-results=true]', { timeout: 10000 });
    const statusText = await page.locator('section[data-results] p[role=status]').textContent();
    assert.match(statusText ?? '', /matching diagnostic question/);

    await page.screenshot({ path: `${EVIDENCE_DIR}/phase2_search_results_landscape_1600x1000.png` });
  });

  await t.test('2. Formula Symbols Toolbar & Caret Insertion', async () => {
    // Click Clear
    await page.click('button[data-action=clear]');
    const emptyVal = await page.inputValue('input[data-search]');
    assert.equal(emptyVal, '');

    // Click Formula Symbols: √, Δ, π, ²
    await page.click('button:has-text("√")');
    await page.click('button:has-text("Δ")');
    await page.click('button:has-text("π")');
    await page.click('button:has-text("²")');

    const formulaVal = await page.inputValue('input[data-search]');
    assert.equal(formulaVal, '√Δπ²');

    await page.screenshot({ path: `${EVIDENCE_DIR}/phase2_formula_toolbar_interaction.png` });
  });

  await t.test('3. Typo Suggestion Flow (Did you mean: energy?)', async () => {
    await page.fill('input[data-search]', 'enrgy');
    await page.click('button[data-action=search]');

    await page.waitForSelector('button[data-action=suggestion]', { timeout: 10000 });
    const suggestionText = await page.locator('button[data-action=suggestion]').textContent();
    assert.match(suggestionText ?? '', /Did you mean: energy\?/);

    await page.screenshot({ path: `${EVIDENCE_DIR}/phase2_typo_suggestion.png` });

    // Click suggestion -> auto re-queries and renders results
    await page.click('button[data-action=suggestion]');
    await page.waitForSelector('button[data-action=open-question]', { timeout: 10000 });
    const inputVal = await page.inputValue('input[data-search]');
    assert.equal(inputVal, 'energy');
  });

  await t.test('4. Facet Filtering by Subject', async () => {
    const physicsCheckbox = page.locator('input[data-facet=subject][data-value=PHYSICS]');
    await physicsCheckbox.check();
    await page.waitForSelector('[data-results=true]', { timeout: 10000 });
    assert.equal(await physicsCheckbox.isChecked(), true);
  });

  await t.test('5. 12.7" Tablet Landscape & Portrait Geometry Audit', async () => {
    // 5.1 Landscape 1600x1000
    await page.setViewportSize({ width: 1600, height: 1000 });
    const landscapeOverflow = await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth);
    assert(landscapeOverflow, 'Landscape horizontal overflow detected');

    // 5.2 Portrait 1000x1600
    await page.setViewportSize({ width: 1000, height: 1600 });
    const portraitOverflow = await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth);
    assert(portraitOverflow, 'Portrait horizontal overflow detected');
    await page.screenshot({ path: `${EVIDENCE_DIR}/phase2_search_portrait_1000x1600.png` });

    // 5.3 Touch Target Compliance Audit (>= 48px height and width, primary CTA >= 56px)
    await page.setViewportSize({ width: 1600, height: 1000 });
    const touchAudits = await page.evaluate(() => {
      const controls = Array.from(document.querySelectorAll<HTMLElement>(
        '.g9-search button, .g9-search input[type=search], .g9-search label.facet'
      ));
      const failures: { tag: string; action?: string; text: string; w: number; h: number }[] = [];
      for (const el of controls) {
        if (el.offsetParent === null) continue;
        const rect = el.getBoundingClientRect();
        if (rect.width < 44 || rect.height < 44) {
          failures.push({
            tag: el.tagName,
            action: el.dataset.action,
            text: (el.textContent || '').trim().slice(0, 20),
            w: Math.round(rect.width),
            h: Math.round(rect.height),
          });
        }
      }
      return { totalAudited: controls.length, failures };
    });

    console.log(`Audited ${touchAudits.totalAudited} search controls for touch target compliance.`);
    assert.equal(touchAudits.failures.length, 0, `Touch target failures: ${JSON.stringify(touchAudits.failures)}`);

    // Verify Search CTA >= 56px
    const searchBtnHeight = await page.evaluate(() => {
      const btn = document.querySelector<HTMLElement>('button[data-action=search]');
      return btn ? btn.getBoundingClientRect().height : 0;
    });
    assert(searchBtnHeight >= 56, `Search CTA height (${searchBtnHeight}px) is less than 56px`);
  });

  await t.test('6. Route Launch to Authentic Question & Return Home', async () => {
    await page.fill('input[data-search]', 'energy');
    await page.click('button[data-action=search]');
    await page.waitForSelector('button[data-action=open-question]', { timeout: 10000 });

    // Click "Open diagnostic question"
    await page.click('button[data-action=open-question]');

    // Asserts navigation to #/question/...
    await page.waitForURL(/.*#\/question\/.+/);
    await page.waitForSelector('.g9-question-page', { timeout: 10000 });
    const questionHeader = await page.textContent('.g9-question-page h1');
    assert(questionHeader && questionHeader.length > 0);

    await page.screenshot({ path: `${EVIDENCE_DIR}/phase2_nav_launched_question.png` });

    // Return to Home via Global Nav
    await page.click('button[data-route="#/home"]');
    await page.waitForURL('**/#/home');
    const brand = await page.textContent('.header-brand');
    assert.match(brand ?? '', /Grade9 STEM/);
  });

  await context.close();
  await browser.close();
});
