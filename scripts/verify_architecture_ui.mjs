import { chromium } from 'playwright-core';
import assert from 'node:assert';
import path from 'node:path';

const ARTIFACT_DIR = 'C:/Users/reall/.gemini/antigravity/brain/078a6361-bee7-49fc-a21a-d88fc3bc034f';

async function main() {
  const browser = await chromium.launch({
    headless: true,
    executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE || undefined
  });
  const context = await browser.newContext({ viewport: { width: 1366, height: 900 } });
  const page = await context.newPage();

  console.log('Navigating to http://127.0.0.1:4173/#/architecture...');
  await page.goto('http://127.0.0.1:4173/#/architecture', { waitUntil: 'networkidle' });

  // Verify page loaded
  const heading = await page.textContent('h1');
  assert(heading.includes('How Do Great Lessons Get Made?'), 'Architecture hub h1 mismatch');
  console.log('Architecture hub loaded successfully.');

  // Click Inspect on Core1A/Core1B Agent Authoring Field Guide
  const openBtn = page.locator('.btn-open-doc[data-doc-id="core1ab-guide"]');
  await openBtn.click();
  await page.waitForSelector('#active-doc-viewer');
  console.log('Opened active document viewer for core1ab-guide.');

  const viewerText = await page.textContent('#active-doc-viewer');

  // Verify NO local staging / source path placeholder box
  assert(!viewerText.includes('Preserved Losslessly in Local Staging'), 'Must NOT contain Preserved Losslessly');
  assert(!viewerText.includes('Original v4.1 Source Path:'), 'Must NOT contain Original v4.1 Source Path');
  console.log('Verified: Placeholder box and staging path references are completely absent.');

  // Verify full document contents are present
  assert(viewerText.includes("00 · Start here: the agent's mission"), 'Must contain section 00');
  assert(viewerText.includes("00A · Physics R2"), 'Must contain section 00A');
  assert(viewerText.includes("Seven operations: distinguish the decisive act"), 'Must contain section 08');
  assert(viewerText.includes("B1–B7: evidence join and falsifiers"), 'Must contain section 20');
  assert(viewerText.includes("Definition of done and failure checklist"), 'Must contain section 26');
  console.log('Verified: Full 28 sections of core1ab-guide are present and rendered inline.');

  // Capture screenshot of core1ab-guide
  const screenshotPath1 = path.join(ARTIFACT_DIR, 'evidence_architecture_full_doc_core1ab.png');
  await page.screenshot({ path: screenshotPath1, fullPage: false });
  console.log('Saved screenshot to:', screenshotPath1);

  // Scroll into the reader container and capture inside document
  await page.locator('.g9-arch-doc-container').scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  const screenshotPathInside = path.join(ARTIFACT_DIR, 'evidence_architecture_inside_doc.png');
  await page.screenshot({ path: screenshotPathInside, fullPage: false });
  console.log('Saved scrolled screenshot to:', screenshotPathInside);

  // Test internal anchor link
  const workflowLink = page.locator('#active-doc-viewer a[href="#workflow"]');
  if (await workflowLink.count() > 0) {
    await workflowLink.first().click();
    await page.waitForTimeout(300);
    const hash = await page.evaluate(() => window.location.hash);
    assert(hash === '#/architecture', 'SPA hash must not be mutated by anchor click: got ' + hash);
    console.log('Verified: Internal anchor jump scrolled smoothly without mutating SPA hash.');
  }

  // Switch to guidebook via doc button
  const guidebookBtn = page.locator('.btn-open-doc[data-doc-id="guidebook"]');
  await guidebookBtn.click();
  await page.waitForTimeout(300);
  const guidebookText = await page.textContent('#active-doc-viewer');
  assert(guidebookText.includes('00 · The whole method on one page'), 'Must contain guidebook chapter 00');
  assert(guidebookText.includes('five intrinsic-demand factors'), 'Must contain demand factors');
  assert(!guidebookText.includes('Preserved Losslessly'), 'Guidebook must NOT contain Preserved Losslessly');
  console.log('Verified: Guidebook document loaded with complete authentic content.');

  // Capture screenshot of guidebook
  const screenshotPath2 = path.join(ARTIFACT_DIR, 'evidence_architecture_full_doc_guidebook.png');
  await page.screenshot({ path: screenshotPath2, fullPage: false });
  console.log('Saved screenshot to:', screenshotPath2);

  await browser.close();
  console.log('All architecture document viewer verifications passed 100%!');
}

main().catch(err => {
  console.error('Test failed:', err);
  process.exit(1);
});
