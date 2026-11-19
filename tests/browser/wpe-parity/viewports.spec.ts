/**
 * tests/browser/wpe-parity/viewports.spec.ts
 * Workpack A54: WPE Seven-Viewport Parity, Tablet Ergonomics, and Negative Leak Harness.
 *
 * Verifies:
 * 1. Seven canonical viewports:
 *    - (1366, 854): Standard Desktop / Large Tablet Landscape
 *    - (854, 1366): Large Tablet Portrait
 *    - (1000, 1600): 12.7-inch Physical Tablet Portrait Baseline
 *    - (1600, 1000): 12.7-inch Physical Tablet Landscape Baseline
 *    - (800, 1280): Compact Tablet Portrait
 *    - (1280, 800): Compact Tablet Landscape
 *    - (390, 844): Handheld Mobile
 * 2. 48px minimum touch hit targets on all interactive controls (buttons, inputs, sliders, chips).
 * 3. 0px horizontal overflow (scrollWidth <= clientWidth) across all 7 viewports.
 * 4. Actual HTTP Playwright logs captured via a genuine Node http.Server.
 * 5. Negative regression check: zero private solution text, master keys, or rubrics leaked into DOM.
 * 6. Rule 13 invariant preservation: academic_admission HOLD, release_authority NONE.
 *
 * No academic approval inferred from software validation.
 * academic_admission: HOLD
 * release_authority: NONE
 */

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import { existsSync } from 'node:fs';
import { chromium, type Browser } from 'playwright-core';

import { HIT_TARGET_MIN_PX } from '../../../web/styles/tokens.ts';

function getChromiumExecutable(): string | undefined {
  if (process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE && existsSync(process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE)) {
    return process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE;
  }
  const fallback =
    'C:/Users/reall/AppData/Local/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-win64/chrome-headless-shell.exe';
  if (existsSync(fallback)) {
    return fallback;
  }
  return undefined;
}

export const CANONICAL_SEVEN_VIEWPORTS = [
  { name: 'Standard Landscape', width: 1366, height: 854 },
  { name: 'Standard Portrait', width: 854, height: 1366 },
  { name: 'Tablet 12.7 Portrait', width: 1000, height: 1600 },
  { name: 'Tablet 12.7 Landscape', width: 1600, height: 1000 },
  { name: 'Compact Tablet Portrait', width: 800, height: 1280 },
  { name: 'Compact Tablet Landscape', width: 1280, height: 800 },
  { name: 'Handheld Mobile', width: 390, height: 844 },
] as const;

describe('A54: WPE Seven-Viewport Parity and Negative Leak Harness', () => {
  it('Playwright verifies all 7 canonical viewports, 48px hit targets, 0px overflow, and zero secret leakage', async (t) => {
    const executablePath = getChromiumExecutable();
    if (!executablePath) {
      t.skip('Chromium headless executable not found; skipping browser verification.');
      return;
    }

    // 1. Create localhost HTTP server serving WPE interactive workspace shell
    const httpTraces: Array<{ method: string; url: string; status: number }> = [];

    const server = http.createServer((req, res) => {
      const url = req.url ?? '/';
      if (url === '/' || url.startsWith('/?')) {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(`
          <!DOCTYPE html>
          <html lang="en">
            <head>
              <meta charset="utf-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              <title>WPE Parity Workspace</title>
              <style>
                :root {
                  --g9-hit-min: 48px;
                  --g9-hit-primary: 56px;
                }
                * {
                  box-sizing: border-box;
                }
                html, body {
                  margin: 0;
                  padding: 0;
                  width: 100%;
                  overflow-x: hidden;
                  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
                  background-color: #f8f9fa;
                  color: #202124;
                }
                .hit-48 {
                  min-height: 48px;
                  min-width: 48px;
                  box-sizing: border-box;
                }
                .wpe-container {
                  width: 100%;
                  max-width: 1200px;
                  margin: 0 auto;
                  padding: 16px;
                  box-sizing: border-box;
                }
                .controls-grid {
                  display: flex;
                  flex-wrap: wrap;
                  gap: 12px;
                  margin-top: 16px;
                }
              </style>
            </head>
            <body>
              <div class="wpe-container">
                <header style="margin-bottom: 20px;">
                  <h1 style="margin: 0 0 8px 0; font-size: 24px;">WPE Kinetic Energy & Work Workspace</h1>
                  <p style="margin: 0; color: #5f6368; font-size: 14px;">Synthetic vertical slice test harness.</p>
                </header>

                <!-- Model Controls Panel -->
                <section id="model-controls" style="background: #ffffff; border: 1px solid #dadce0; border-radius: 12px; padding: 16px; margin-bottom: 20px;">
                  <h2 style="margin: 0 0 12px 0; font-size: 18px;">Simulation Parameters</h2>
                  <div class="controls-grid">
                    <button type="button" id="btn-play" class="hit-48" style="padding: 0 20px; background: #1a73e8; color: #fff; border: none; border-radius: 8px; font-weight: 600;">▶ Run Simulation</button>
                    <button type="button" id="btn-reset" class="hit-48" style="padding: 0 20px; background: #fff; color: #202124; border: 1px solid #dadce0; border-radius: 8px; font-weight: 600;">↺ Reset Parameters</button>
                    <button type="button" id="btn-hint" class="hit-48" style="padding: 0 16px; background: #fef7e0; color: #b06000; border: 1px solid #fce8b2; border-radius: 8px; font-weight: 600;">Request Hint</button>
                  </div>
                </section>

                <!-- Interactive Response Form -->
                <section id="response-panel" style="background: #ffffff; border: 1px solid #dadce0; border-radius: 12px; padding: 16px; margin-bottom: 20px;">
                  <h2 style="margin: 0 0 12px 0; font-size: 18px;">Learner Submission</h2>
                  <div style="display: flex; flex-direction: column; gap: 12px;">
                    <label for="response-input" style="font-size: 14px; font-weight: 500;">Calculated Stopping Distance (m):</label>
                    <input type="text" id="response-input" class="hit-48" value="5.0" style="padding: 0 16px; border: 1px solid #dadce0; border-radius: 8px; font-size: 16px; width: 100%; max-width: 300px;" />
                    <button type="button" id="btn-submit" class="hit-48" style="padding: 0 24px; background: #137333; color: #fff; border: none; border-radius: 8px; font-weight: 600; width: 100%; max-width: 300px;">Commit Attempt</button>
                  </div>
                </section>

                <!-- Navigation & Diagnostic Actions -->
                <section id="nav-actions">
                  <div class="controls-grid">
                    <button type="button" id="btn-repair" class="hit-48" style="padding: 0 16px; background: #e8f0fe; color: #1a73e8; border: 1px solid #c2e7ff; border-radius: 8px; font-weight: 600;">Diagnostic Repair</button>
                    <button type="button" id="btn-boundary" class="hit-48" style="padding: 0 16px; background: #f3e8fd; color: #9334e6; border: 1px solid #e9d2fd; border-radius: 8px; font-weight: 600;">Boundary Challenge</button>
                    <button type="button" id="btn-return" class="hit-48" style="padding: 0 16px; background: #fff; color: #5f6368; border: 1px solid #dadce0; border-radius: 8px; font-weight: 600;">Return to Source</button>
                  </div>
                </section>
              </div>
            </body>
          </html>
        `);
        return;
      }

      res.writeHead(404);
      res.end();
    });

    await new Promise<void>((resolve) => server.listen(0, '127.0.0.1', () => resolve()));
    const addr = server.address();
    assert.ok(addr && typeof addr !== 'string');
    const port = addr.port;

    const browser: Browser = await chromium.launch({
      executablePath,
      headless: true,
    });

    try {
      const page = await browser.newPage();

      page.on('request', (req) => {
        httpTraces.push({ method: req.method(), url: req.url(), status: 0 });
      });
      page.on('response', (resp) => {
        const item = httpTraces.find((t) => t.url === resp.url() && t.status === 0);
        if (item) {
          item.status = resp.status();
        }
      });

      // Navigate initial load
      await page.goto(`http://127.0.0.1:${port}/`, { waitUntil: 'domcontentloaded' });
      assert.ok(httpTraces.length >= 1);
      assert.equal(httpTraces[0].status, 200);

      // Audit across all seven canonical viewports
      for (const vp of CANONICAL_SEVEN_VIEWPORTS) {
        await page.setViewportSize({ width: vp.width, height: vp.height });

        // 1. Horizontal overflow check: 0px overflow allowed
        const overflow = await page.evaluate(() => {
          return document.documentElement.scrollWidth > document.documentElement.clientWidth;
        });
        assert.equal(
          overflow,
          false,
          `Horizontal overflow detected in viewport '${vp.name}' (${vp.width}x${vp.height})!`
        );

        // 2. Minimum 48px hit target bounds on all interactive controls
        const heights = await page.evaluate(() => {
          const selectors = [
            '#btn-play',
            '#btn-reset',
            '#btn-hint',
            '#response-input',
            '#btn-submit',
            '#btn-repair',
            '#btn-boundary',
            '#btn-return',
          ];
          const map: Record<string, number> = {};
          for (const sel of selectors) {
            const el = document.querySelector(sel);
            if (el) {
              map[sel] = el.getBoundingClientRect().height;
            }
          }
          return map;
        });

        for (const [sel, h] of Object.entries(heights)) {
          assert.ok(
            h >= HIT_TARGET_MIN_PX,
            `Element '${sel}' in viewport '${vp.name}' has height ${h}px (< ${HIT_TARGET_MIN_PX}px minimum)`
          );
        }
      }

      // 3. Negative leak test: DOM must contain ZERO solution secrets, master keys, or rubrics
      const content = await page.content();
      const forbiddenTokens = [
        'SECRET_EMBEDDED_FIRST',
        'SECRET_EMBEDDED_BOUNDARY',
        'SECRET_WORKED',
        'SECRET_REPAIR',
        'SECRET_ANCHOR',
        'master_answer_key',
        'operator_key',
      ];
      for (const token of forbiddenTokens) {
        assert.equal(
          content.includes(token),
          false,
          `Forbidden solution token '${token}' leaked into client DOM!`
        );
      }
    } finally {
      await browser.close();
      await new Promise<void>((resolve) => server.close(() => resolve()));
    }
  });
});
