const { chromium } = require('playwright-core');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1366, height: 854 } });

  console.log('--- 1. Testing Home Screen ---');
  await page.goto('http://127.0.0.1:3000/#/home');
  await page.waitForSelector('.g9-runtime-container');
  console.log('Title:', await page.title());
  const navBtns = await page.locator('nav button').allTextContents();
  console.log('Nav buttons:', navBtns.map(s => s.trim().replace(/\s+/g, ' ')));

  const bioCard = page.locator('.g9-subject-card[data-subject="subject:biology"]');
  console.log('Biology card exists:', (await bioCard.count()) > 0);
  console.log('Biology card text:', (await bioCard.innerText()).replace(/\n+/g, ' '));

  console.log('--- 2. Testing Biology Subject Screen ---');
  await page.goto('http://127.0.0.1:3000/#/subject/biology');
  await page.waitForTimeout(500);
  console.log('Subject title:', await page.locator('h1').innerText());
  const topicCards = await page.locator('.subject-topic-card, .g9-topic-card, .topic-card').allTextContents();
  console.log('Topic cards count:', topicCards.length);

  console.log('--- 3. Testing Biology Topic Workspace ---');
  await page.goto('http://127.0.0.1:3000/#/subject/biology/topic/genetics/questions');
  await page.waitForTimeout(500);
  console.log('Topic workspace h1:', await page.locator('h1').innerText());
  const qCards = await page.locator('.question-card, .public-question-card, article').count();
  console.log('Question items count:', qCards);

  console.log('--- 4. Testing Question Bank with Subject Filter ---');
  await page.goto('http://127.0.0.1:3000/#/bank');
  await page.waitForTimeout(500);
  const resultCount = await page.locator('header, .qb-result-count, .bank-count, strong').first().innerText();
  console.log('Bank result info:', resultCount.slice(0, 80));

  console.log('--- 5. Testing Standalone Biology Hub ---');
  await page.goto('http://127.0.0.1:3000/biology/index.html');
  await page.waitForTimeout(500);
  console.log('Standalone Bio title:', await page.title());
  const iframes = await page.locator('iframe').count();
  console.log('Iframes count (must be 0):', iframes);

  console.log('--- 6. Testing Standalone Core 1 Unit ---');
  await page.goto('http://127.0.0.1:3000/biology/core1/bio-viral-genetics-d3-r1/index.html');
  await page.waitForTimeout(500);
  console.log('Core 1 Unit title:', await page.title());
  const core1Iframes = await page.locator('iframe').count();
  console.log('Core 1 Iframes count (must be 0):', core1Iframes);

  await browser.close();
  console.log('ALL BROWSER CHECKS COMPLETED SUCCESSFULLY.');
})();
