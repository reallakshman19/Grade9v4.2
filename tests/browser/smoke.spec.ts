import { test, expect } from '@playwright/test';

test.describe('Build Shell Smoke Test Suite', () => {
  test.beforeEach(async ({ page }) => {
    // Listen for unhandled console errors
    page.on('console', msg => {
      if (msg.type() === 'error') {
        console.error(`Unhandled browser error: ${msg.text()}`);
      }
    });
  });

  test('static entrypoint loads with diagnostic shell and freeze notice', async ({ page }) => {
    await page.goto('/');

    // 1. Verify title
    await expect(page).toHaveTitle(/Grade9v4\.2 Build Shell \(DEMO ONLY - UI IMPLEMENTATION FROZEN\)/);

    // 2. Verify mandatory UI freeze alert banner
    const banner = page.locator('#freeze-banner');
    await expect(banner).toBeVisible();
    await expect(banner).toContainText('Rule 7 Invariant');
    await expect(banner).toContainText('UI Implementation is FROZEN');

    // 3. Verify status badges
    await expect(page.locator('#badge-ui-freeze')).toContainText('UI: FROZEN (A61)');
    await expect(page.locator('#badge-admission')).toContainText('ADMISSION: HOLD');
    await expect(page.locator('#badge-release')).toContainText('RELEASE: NONE');

    // 4. Verify diagnostics container initialization
    const diagnostics = page.locator('#diagnostics');
    await expect(diagnostics).toBeVisible();
    await expect(diagnostics).toContainText('Diagnostic Status: VERIFIED');
    await expect(diagnostics).toContainText('Build Shell Version: 4.2.0');
  });

  test('responsive viewport validation without horizontal overflow', async ({ page }) => {
    // Native reference landscape viewport: 1366x854
    await page.setViewportSize({ width: 1366, height: 854 });
    await page.goto('/');
    
    let scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    let clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth);

    // Native portrait reference viewport: 1000x1600
    await page.setViewportSize({ width: 1000, height: 1600 });
    await page.goto('/');
    
    scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth);
  });

  test('no remote third-party network requests permitted', async ({ page }) => {
    const remoteRequests: string[] = [];

    page.on('request', request => {
      const url = new URL(request.url());
      if (url.hostname !== 'localhost' && url.hostname !== '127.0.0.1') {
        remoteRequests.push(request.url());
      }
    });

    await page.goto('/');
    expect(remoteRequests).toHaveLength(0);
  });
});
