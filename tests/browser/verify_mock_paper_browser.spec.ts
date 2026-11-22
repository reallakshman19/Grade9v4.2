/** Actual mounted mock-paper browser test; a browser must be installed on this runner. */
import assert from 'node:assert/strict';
import {test} from 'node:test';
import {chromium} from 'playwright-core';
import {createServer} from 'vite';

test('NSEJS browser: timed mock exam routes, captures answers and seals submission', { timeout: 90000 }, async () => {
  const server = await createServer({ server: { host: '127.0.0.1', port: 0, strictPort: true } });
  await server.listen();
  const address = server.httpServer!.address();
  assert.ok(address && typeof address !== 'string');
  const url = `http://127.0.0.1:${address.port}/#/home`;
    const browser = await chromium.launch({ headless: true });
    try {
      const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });
      await page.goto(url, { waitUntil: 'domcontentloaded' });

      // Find the mock paper card
      const card = page.locator('.g9-test-card').filter({ hasText: 'NSEJS 2024 Full-Length Mock Paper 1' });
      await card.waitFor({ timeout: 10000 });

      // Badge must be ACTIVE (not HOLD)
      const badgeText = await card.locator('.g9-badge').textContent();
      assert.match(badgeText || '', /ACTIVE/);

      // Button must NOT be disabled
      const startBtn = card.locator('button[data-nav="/practice/nsejs-2024-mock-1"]');
      assert.equal(await startBtn.count(), 1, 'Start Timed Test button must exist');
      assert.equal(await startBtn.isDisabled(), false, 'Button must not be disabled');
      assert.match(await startBtn.textContent() || '', /Start Timed Test/);

      // Click the button to start test
      await startBtn.click();
      await page.waitForTimeout(500);

      // Verify we arrived at the paper workspace
      await page.waitForSelector('.paper-workspace', { timeout: 10000 });
      const currentUrl = page.url();
      assert.match(currentUrl, /#\/practice\/nsejs-2024-mock-1/);

      // Verify paper title and 60 questions
      const titleText = await page.locator('.paper-workspace h1').textContent();
      assert.match(titleText || '', /NSEJS 2024 Full-Length Simulated Mock Paper 1/);

      // Verify timer
      const timer = page.locator('#timer-display');
      assert.match(await timer.textContent() || '', /⏱/);

      // Verify 60 navigator buttons
      const navButtons = await page.locator('.part-select-btn').count();
      assert.equal(navButtons, 60, 'Should render 60 question buttons in navigator');

      // Verify Physics Q1 prompt content and options
      const promptText = await page.locator('.part-prompt').textContent();
      assert.match(promptText || '', /Two particles A and B are separated by a distance/);
      assert.match(promptText || '', /12 s/);

      // Verify MCQ option buttons
      const optB = page.locator('button[data-choice="B"]');
      assert.equal(await optB.count(), 1);
      await optB.click();
      await page.waitForTimeout(300);

      const feedback = await page.locator('#choice-feedback-msg').textContent();
      assert.match(feedback || '', /Option B selected/);

      // Navigate to Chemistry (e.g. Q21)
      const q21Btn = page.locator('.part-select-btn').nth(20); // 0-indexed 20 is Q21
      await q21Btn.click();
      await page.waitForTimeout(300);

      const chemPrompt = await page.locator('.part-prompt').textContent();
      assert.match(chemPrompt || '', /Haber process|nitrogen gas/);
      assert.match(chemPrompt || '', /34 g/);

      // Select Option A for Q21
      const optA = page.locator('button[data-choice="A"]');
      await optA.click();
      await page.waitForTimeout(300);
      assert.match(await page.locator('#choice-feedback-msg').textContent() || '', /Option A selected/);

      // Navigate to Biology (e.g. Q41)
      const q41Btn = page.locator('.part-select-btn').nth(40); // 0-indexed 40 is Q41
      await q41Btn.click();
      await page.waitForTimeout(300);

      const bioPrompt = await page.locator('.part-prompt').textContent();
      assert.match(bioPrompt || '', /Lysosome|acid hydrolases/);

      // Select Option A for Q41
      await optA.click();
      await page.waitForTimeout(300);
      assert.match(await page.locator('#choice-feedback-msg').textContent() || '', /Option A selected/);

      // Open Formula Sheet drawer
      const formulaBtn = page.locator('button[data-aid="FORMULA_SHEET"]');
      await formulaBtn.click();
      await page.waitForTimeout(300);

      const formulaDrawer = page.locator('#formula-sheet-drawer');
      assert.equal(await formulaDrawer.count(), 1);
      const formulaContent = await formulaDrawer.textContent();
      assert.match(formulaContent || '', /Official Examination Formula Reference Sheet/);
      assert.match(formulaContent || '', /Chemistry Constants/);
      assert.match(formulaContent || '', /Hardy-Weinberg/);

      // Submit paper
      const submitBtn = page.locator('#submit-paper-btn');
      await submitBtn.click();
      await page.waitForTimeout(500);

      const postSubmit = await page.locator('.paper-workspace').textContent();
      assert.match(postSubmit || '', /Paper Submitted Successfully|Paper Durably Committed/);

      // Post-commit review is an inventory, NOT a second answer-key/grading engine.
      const review=page.locator('.paper-scorecard-section');
      await review.waitFor({timeout:10000});
      assert.match((await review.textContent())||'',/Attempt Review · Results Pending/);
      assert.match((await review.textContent())||'',/3 \/ 60/);
      assert.match((await review.textContent())||'',/57/);
      assert.match((await review.textContent())||'',/Withheld · Max 180/);
      assert.equal(await page.locator('.part-solution-drawer').count(),0);
      assert.doesNotMatch((await page.locator('.paper-workspace').textContent())||'',/Official Answer:|Score: 9 \/ 180|100.0% Accuracy|✓ EVALUATED/);
      assert.match((await page.locator('.part-select-btn').first().getAttribute('aria-label'))||'',/answer recorded/);
      assert.match((await page.locator('.part-select-btn').nth(1).getAttribute('aria-label'))||'',/unanswered/);
      await page.locator('.part-select-btn').nth(1).click();
      assert.match((await page.locator('.part-review-status').textContent())||'',/Unanswered/);
      assert.match((await page.locator('.part-review-status').textContent())||'',/Correctness: review pending/);
      // Real reload should reopen the same durable committed run without
      // silently re-scoring or surfacing source solution material.
      await page.reload({waitUntil:'domcontentloaded'});
      await page.locator('.paper-scorecard-section').waitFor({timeout:10000});
      assert.match((await page.locator('.paper-scorecard-section').textContent())||'',/3 \/ 60/);
      assert.equal(await page.locator('.part-solution-drawer').count(),0);
    } finally {
      await browser.close();
      await server.close();
    }
});
