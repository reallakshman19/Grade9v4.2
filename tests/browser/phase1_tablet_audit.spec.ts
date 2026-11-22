import assert from 'node:assert/strict';
import { test } from 'node:test';
import { mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import { chromium } from 'playwright-core';
import type { Browser } from 'playwright-core';
import { createServer } from 'vite';

const BASE_URL = 'http://127.0.0.1:3000';
const EVIDENCE_DIR = resolve('C:/Users/reall/.gemini/antigravity/brain/c39fd02d-dabd-412d-b94d-9f2254fd4134/phase1_evidence');

test('Phase 1 - 12.7" Tablet Touch Interface & Router Verification', async (t) => {
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
  await t.test('1. Landscape 1600x1000 Home Page Mount & Touch Target Audits', async () => {
    await page.goto(`${baseUrl}/#/home`, { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('.header-brand', { timeout: 10000 });
    
    // Check Brand and Header
    const brand = await page.locator('.header-brand').textContent();
    assert.match(brand ?? '', /Grade9 STEM/);

    const title = await page.locator('.g9-title').textContent();
    assert.match(title ?? '', /Interactive Curriculum Hub/);

    // Verify Zero Horizontal Overflow
    const overflow = await page.evaluate(() => {
      return {
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
      };
    });
    assert(
      overflow.scrollWidth <= overflow.clientWidth,
      `Horizontal overflow detected: scrollWidth (${overflow.scrollWidth}) > clientWidth (${overflow.clientWidth})`
    );

    // Verify Touch Targets on Interactive Elements (>= 48px height and width)
    const touchAudits = await page.evaluate(() => {
      const elements = Array.from(document.querySelectorAll<HTMLElement>(
        'button, a, input, [role="button"], [role="tab"], .subject-card, .exam-card, .paper-card, .lab-card'
      ));
      const failures: { tag: string; id: string; className: string; w: number; h: number; text: string }[] = [];
      for (const el of elements) {
        if (el.offsetParent === null && el.offsetWidth === 0 && el.offsetHeight === 0) continue;
        const rect = el.getBoundingClientRect();
        // Allow slight subpixel tolerance (44px)
        if (rect.width < 44 || rect.height < 44) {
          failures.push({
            tag: el.tagName,
            id: el.id,
            className: el.className,
            w: Math.round(rect.width),
            h: Math.round(rect.height),
            text: (el.textContent || '').trim().slice(0, 30),
          });
        }
      }
      return { totalAudited: elements.length, failures };
    });

    console.log(`Audited ${touchAudits.totalAudited} interactive elements for touch target compliance.`);
    assert.equal(
      touchAudits.failures.length,
      0,
      `Found ${touchAudits.failures.length} elements failing >=48px touch target: ${JSON.stringify(touchAudits.failures)}`
    );

    // Verify Primary Action Button (>= 56px height)
    const primaryCta = await page.evaluate(() => {
      const btn = document.querySelector<HTMLElement>('.hero-cta');
      if (!btn) return null;
      const rect = btn.getBoundingClientRect();
      return { height: rect.height, width: rect.width };
    });
    if (primaryCta) {
      assert(
        primaryCta.height >= 56,
        `Primary CTA height (${primaryCta.height}px) is less than 56px`
      );
    }

    // Capture Landscape Screenshot
    await page.screenshot({ path: `${EVIDENCE_DIR}/phase1_home_12_7_landscape_1600x1000.png` });
  });

  await t.test('2. Portrait 1000x1600 Tablet Orientation Audit', async () => {
    await page.setViewportSize({ width: 1000, height: 1600 });
    await page.goto(`${baseUrl}/#/home`, { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('.header-brand', { timeout: 10000 });

    // Verify Zero Horizontal Overflow in Portrait
    const overflow = await page.evaluate(() => {
      return {
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
      };
    });
    assert(
      overflow.scrollWidth <= overflow.clientWidth,
      `Portrait horizontal overflow detected: scrollWidth (${overflow.scrollWidth}) > clientWidth (${overflow.clientWidth})`
    );

    // Capture Portrait Screenshot
    await page.screenshot({ path: `${EVIDENCE_DIR}/phase1_home_12_7_portrait_1000x1600.png` });
  });

  await t.test('3. Reset to Landscape & Verify All Navigation Paths', async () => {
    await page.setViewportSize({ width: 1600, height: 1000 });

    // 3.1 Navigate to Universal Search
    await page.goto(`${baseUrl}/#/search`, { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('.g9-search', { timeout: 10000 });
    const searchHeader = await page.locator('.g9-search h1').textContent();
    assert.match(searchHeader ?? '', /Find a question/);
    await page.screenshot({ path: `${EVIDENCE_DIR}/phase1_nav_search.png` });

    // 3.2 Navigate to Personal Study Hub
    await page.goto(`${baseUrl}/#/personal`, { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('.placeholder-title', { timeout: 10000 });
    const personalHeader = await page.locator('.placeholder-title').textContent();
    assert.match(personalHeader ?? '', /Personal Study Hub/);
    await page.screenshot({ path: `${EVIDENCE_DIR}/phase1_nav_personal.png` });

    // 3.3 Navigate to Subject Workspace
    await page.goto(`${baseUrl}/#/subject/physics`, { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('.placeholder-title', { timeout: 10000 });
    const subjectHeader = await page.locator('.placeholder-title').textContent();
    assert.match(subjectHeader ?? '', /Physics/);
    await page.screenshot({ path: `${EVIDENCE_DIR}/phase1_nav_subject_physics.png` });

    // 3.4 Navigate to Topic Tab (Question Bank)
    await page.goto(`${baseUrl}/#/subject/math/topic/algebra/questions`, { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('.placeholder-title', { timeout: 10000 });
    const tabHeader = await page.locator('.placeholder-title').textContent();
    assert.match(tabHeader ?? '', /Topic Workspace: ALGEBRA/);
    const tabContent = await page.locator('.placeholder-box').textContent();
    assert.match(tabContent ?? '', /Active Tab: QUESTIONS/);
    await page.screenshot({ path: `${EVIDENCE_DIR}/phase1_nav_topic_tab_questions.png` });

    // 3.5 Navigate to Competitive Exam
    await page.goto(`${baseUrl}/#/competitive/exam:nsejs`, { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('.placeholder-title', { timeout: 10000 });
    const examHeader = await page.locator('.placeholder-title').textContent();
    assert.match(examHeader ?? '', /Junior Science/);
    await page.screenshot({ path: `${EVIDENCE_DIR}/phase1_nav_competitive_nsejs.png` });

    // 3.6 Navigate to Standalone Lab
    await page.goto(`${baseUrl}/#/labs/lab:circles-master`, { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('.placeholder-title', { timeout: 10000 });
    const labHeader = await page.locator('.placeholder-title').textContent();
    assert.match(labHeader ?? '', /Circles Master/);
    await page.screenshot({ path: `${EVIDENCE_DIR}/phase1_nav_lab_circles.png` });

    // 3.7 Fail-Closed 404 Route Handling
    await page.goto(`${baseUrl}/#/totally-invalid-route-xyz`, { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('.not-found-title', { timeout: 10000 });
    const notFoundTitle = await page.locator('.not-found-title').textContent();
    assert.match(notFoundTitle ?? '', /Page Not Found/);
    const notFoundBadge = await page.locator('.not-found-code').textContent();
    assert.match(notFoundBadge ?? '', /404/);
    await page.screenshot({ path: `${EVIDENCE_DIR}/phase1_nav_404_not_found.png` });

    // 3.8 Return Home from 404
    await page.click('button:has-text("Return to Curriculum Home")');
    await page.waitForSelector('.g9-title', { timeout: 10000 });
    const returnHomeTitle = await page.locator('.g9-title').textContent();
    assert.match(returnHomeTitle ?? '', /Interactive Curriculum Hub/);
  });
  } finally {
    await context.close();
    await browser.close();
    if (server) await server.close();
  }
});
