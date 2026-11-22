import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { readFile, stat, realpath } from 'node:fs/promises';
import { resolve, sep, extname } from 'node:path';
import { once } from 'node:events';
import { chromium } from 'playwright-core';

const root = resolve('dist');
const mime = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json',
  '.png': 'image/png',
  '.svg': 'image/svg+xml'
};

const server = createServer(async (req, res) => {
  try {
    if (req.method !== 'GET' && req.method !== 'HEAD') { res.writeHead(405).end(); return; }
    const url = new URL(req.url ?? '/', 'http://127.0.0.1');
    const path = decodeURIComponent(url.pathname);
    const local = path.startsWith('/') ? path.slice(1) : path;
    const target = resolve(root, local || 'index.html');
    if (!target.startsWith(root + sep) || !(await stat(target)).isFile()) { res.writeHead(404).end(); return; }
    const actual = await realpath(target);
    const actualRoot = await realpath(root);
    if (!actual.startsWith(actualRoot + sep)) { res.writeHead(404).end(); return; }
    const type = mime[extname(target)];
    if (!type) { res.writeHead(404).end(); return; }
    const body = await readFile(actual);
    res.writeHead(200, {
      'Content-Type': type,
      'X-Content-Type-Options': 'nosniff',
      'Cache-Control': 'no-store'
    }).end(req.method === 'HEAD' ? undefined : body);
  } catch {
    res.writeHead(404).end();
  }
});

server.listen(0, '127.0.0.1');
await once(server, 'listening');
const address = server.address();
const origin = `http://127.0.0.1:${address.port}`;
console.log('Server listening on:', origin);

const browser = await chromium.launch({ headless: true });
const artifactDir = 'C:/Users/reall/.gemini/antigravity/brain/078a6361-bee7-49fc-a21a-d88fc3bc034f';

try {
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  await page.goto(`${origin}/#/home`, { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('nav', { timeout: 10000 });

  // Press Ctrl+k
  await page.keyboard.press('Control+k');
  const dialog = page.locator('dialog.g9-search-dialog');
  await dialog.waitFor({ state: 'visible', timeout: 5000 });

  // Take screenshot of open modal with full counts
  await page.screenshot({ path: `${artifactDir}/evidence_search_modal_full_indexed.png` });
  console.log('Saved evidence_search_modal_full_indexed.png');

  // Search for an adopted NSEJS question e.g. 1D-Q01
  const input = dialog.locator('input[type="search"]');
  await input.fill('1D-Q01');
  await page.waitForTimeout(300);
  await page.screenshot({ path: `${artifactDir}/evidence_search_modal_1d_q01.png` });
  console.log('Saved evidence_search_modal_1d_q01.png');

  // Search for Biology question
  await input.fill('biology');
  await page.waitForTimeout(300);
  await page.screenshot({ path: `${artifactDir}/evidence_search_modal_biology.png` });
  console.log('Saved evidence_search_modal_biology.png');

  console.log('ALL SCREENSHOTS CAPTURED SUCCESSFULLY!');
} finally {
  await browser.close();
  server.close();
}
