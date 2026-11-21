import assert from 'node:assert/strict';
import { test } from 'node:test';
import { chromium } from 'playwright-core';
import { createNsejsPaperWorkspaceConfig, createAuthorizedNsejsPaperSession } from '../../web/runtime/nsejs-session.ts';
import { DEFAULT_APP_REGISTRY } from '../../web/runtime/registry/index.ts';

test('NSEJS Mock Paper 1 Integration Verification', async (t) => {
  await t.test('Registry descriptor is ACTIVE with 180 marks', () => {
    const paper = DEFAULT_APP_REGISTRY.papers.find((p) => p.id === 'paper:nsejs-2024-mock-1');
    assert.ok(paper, 'NSEJS Mock Paper 1 must exist in registry');
    assert.equal(paper.availability, 'AVAILABLE');
    assert.equal(paper.totalMarks, 180);
    assert.equal(paper.questionCount, 60);
    assert.equal(paper.scoringPolicy.positiveMarksPerQuestion, 3);
    assert.equal(paper.scoringPolicy.negativeMarksPerQuestion, 1);
  });

  await t.test('60 questions are fully authored across Physics, Chemistry, Biology', () => {
    const cfg = createNsejsPaperWorkspaceConfig();
    assert.equal(cfg.parts.length, 60);

    const phys = cfg.parts.filter((p) => p.sectionId === 'sec-nsejs-physics');
    const chem = cfg.parts.filter((p) => p.sectionId === 'sec-nsejs-chemistry');
    const bio = cfg.parts.filter((p) => p.sectionId === 'sec-nsejs-biology');

    assert.equal(phys.length, 20, '20 Physics questions required');
    assert.equal(chem.length, 20, '20 Chemistry questions required');
    assert.equal(bio.length, 20, '20 Biology questions required');

    for (let i = 0; i < 60; i++) {
      const part = cfg.parts[i];
      assert.ok(part.promptHtml.includes('<ul>') && part.promptHtml.includes('<li>'), `Part ${i + 1} must include styled MCQ options`);
      assert.ok(part.promptHtml.includes('Question ' + (i + 1)), `Part ${i + 1} must include question title`);
      assert.ok(part.maxPoints === 3, `Part ${i + 1} must carry 3 marks`);
      assert.ok(part.responseKind === 'SINGLE_CHOICE', `Part ${i + 1} must be SINGLE_CHOICE`);
    }
  });

  await t.test('Browser DOM test: Home card button is active and navigates to live 120-min exam', async () => {
    const browser = await chromium.launch({ headless: true });
    try {
      const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });
      await page.goto('http://127.0.0.1:3000/#/home', { waitUntil: 'domcontentloaded' });

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
    } finally {
      await browser.close();
    }
  });

  await t.test('Recovers gracefully from stale cached session / PAPER_STATE_MISMATCH in storage', async () => {
    const { createStorageDriver } = await import('../../web/runtime/storage.ts');
    const driver = createStorageDriver({ dbName: 'test_stale_mismatch_db', preferMemory: true });
    const releaseId = 'rel-nsejs-2024-v1';
    const sessionId = `ses:${releaseId}:paper:nsejs-2024-mock-1:diagnostic_learner`;
    
    // Inject a simulated stale session with an outdated definition sha256
    await driver.put('sessions', sessionId, {
      id: sessionId,
      releaseId,
      item: { type: 'QUESTION', id: 'task:nsejs-2024-mock-1', revision: 1, sha256: '0'.repeat(64) },
      mode: 'SIMULATED_EXAM',
      origin: { type: 'PAPER', id: 'paper:nsejs-2024-mock-1', revision: 1, sha256: 'deadbeef'.repeat(8) },
      deadlineAt: new Date(Date.now() + 7200000).toISOString(),
      attemptIds: [`att:${sessionId}:1`],
      draftId: sessionId,
    });

    // Create session factory - must recognize outdated origin.sha256 and purge/rebind
    const { config, binding } = await createAuthorizedNsejsPaperSession('diagnostic_learner', driver);
    const { PaperWorkspaceController } = await import('../../web/pages/paper.ts');
    const controller = new PaperWorkspaceController(config, binding);
    await controller.restore(); // Must NOT throw PAPER_STATE_MISMATCH

    assert.equal(controller.getViewState().ready, true);
    assert.equal(controller.getViewState().isCommitted, false);
  });
});
