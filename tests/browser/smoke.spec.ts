import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { readFile, stat, realpath } from 'node:fs/promises';
import { resolve, sep, extname } from 'node:path';
import { once } from 'node:events';
import { test, before, after } from 'node:test';
import { chromium } from 'playwright-core';
import type { Browser } from 'playwright-core';

// Serve only the built bytes. No SPA fallback and no source-tree exposure.
const root = resolve('dist');
const subpath = '/grade9-project/';
const mime: Record<string, string> = {'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json'};
const server = createServer(async (req, res) => {
  try {
    if (req.method !== 'GET' && req.method !== 'HEAD') {res.writeHead(405).end(); return;}
    const url = new URL(req.url ?? '/', 'http://127.0.0.1');
    const path = decodeURIComponent(url.pathname);
    const local = path.startsWith(subpath) ? path.slice(subpath.length) : path.slice(1);
    const target = resolve(root, local || 'index.html');
    if (!target.startsWith(root + sep) || !(await stat(target)).isFile()) {res.writeHead(404).end(); return;}
    const actual = await realpath(target);
    const actualRoot = await realpath(root);
    if (!actual.startsWith(actualRoot + sep)) {res.writeHead(404).end(); return;}
    const type = mime[extname(target)];
    if (!type) {res.writeHead(404).end(); return;}
    const body = await readFile(actual);
    res.writeHead(200, {'Content-Type':type, 'X-Content-Type-Options':'nosniff', 'Cache-Control':'no-store'}).end(req.method === 'HEAD' ? undefined : body);
  } catch {res.writeHead(404).end();}
});
let browser: Browser;
let origin: string;
before(async () => {
  await stat(resolve(root, 'index.html'));
  server.listen(0, '127.0.0.1');
  await once(server, 'listening');
  const address = server.address();
  assert(address && typeof address !== 'string');
  origin = `http://127.0.0.1:${address.port}`;
  browser = await chromium.launch({headless:true, executablePath:process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE || undefined});
});
after(async () => {
  try {await browser?.close();} finally {
    if (server.listening) await new Promise<void>((done, reject) => server.close(e => e ? reject(e) : done()));
  }
});
const viewports = [[390,844],[800,1280],[854,1366],[1000,1600],[1280,800],[1366,854],[1600,1000]] as const;
for (const prefix of ['/', subpath]) {
  for (const [width, height] of viewports) {
    test(`diagnostic HTTP shell ${prefix} ${width}x${height}`, async () => {
      const context = await browser.newContext({viewport:{width,height},hasTouch:true,serviceWorkers:'block'});
      try {
        const page = await context.newPage();
        const errors: string[] = [];
        const outside: string[] = [];
        page.on('pageerror', e => errors.push(e.message));
        page.on('console', m => {if(m.type()==='error') errors.push(m.text());});
        page.on('requestfailed', r => errors.push(`${r.url()} ${r.failure()?.errorText}`));
        await page.route('**/*', async route => {
          const url = new URL(route.request().url());
          if (url.origin !== origin || !url.pathname.startsWith(prefix)) {outside.push(url.href); await route.abort();}
          else await route.continue();
        });
        for (let pass=0; pass<2; pass++) {
          const response = pass ? await page.reload() : await page.goto(origin+prefix);
          assert.equal(response?.status(), 200);
          await page.locator('#diagnostics[data-initialized="true"]').waitFor();
          assert.match(await page.title(), /Diagnostic Only/);
          assert.match(await page.locator('#freeze-banner').innerText(), /freeze NOT GRANTED/);
          assert.equal(await page.locator('#badge-ui-freeze').innerText(),'UI: NOT_FROZEN');
          assert.equal(await page.locator('#badge-admission').innerText(),'ADMISSION: HOLD');
          assert.equal(await page.locator('#badge-release').innerText(),'RELEASE: NONE');
          assert.match(await page.locator('#diagnostics').innerText(), /compile-time only; not verified by this page/);
          assert.equal(await page.locator('main').count(),1);
          assert.equal(await page.locator('input,button,form,canvas,iframe').count(),0);
          assert(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth));
        }
        assert.deepEqual(outside, []);
        assert.deepEqual(errors, []);
      } finally {await context.close();}
    });
  }
}
test('HTTP entrypoint and relative module resolve at both mount points', async () => {
  const html = await readFile(resolve(root, 'index.html'), 'utf8');
  const match = html.match(/<script\b[^>]*\bsrc=["']([^"']+)["']/);
  assert(match && match[1].startsWith('./'), 'built module must be relative');
  for (const prefix of ['/', subpath]) {
    const url = origin + prefix;
    const response = await fetch(url);
    assert.equal(response.status, 200);
    assert.match(response.headers.get('content-type') ?? '', /text\/html/);
    assert.equal(await response.text(), html);
    const moduleUrl: URL = new URL(match[1], url);
    assert.equal(moduleUrl.origin, origin);
    assert(moduleUrl.pathname.startsWith(prefix));
    const script = await fetch(moduleUrl);
    assert.equal(script.status, 200);
    assert.match(script.headers.get('content-type') ?? '', /javascript/);
    assert((await script.text()).length > 0);
    assert.equal((await fetch(url, {method:'HEAD'})).status, 200);
    assert.equal((await fetch(url, {method:'POST'})).status, 405);
  }
});
test('missing route and source files return 404, not an SPA fallback', async () => {
  for(const prefix of ['/', subpath]) for(const path of ['not-a-route','app/main.ts','runtime/types.ts','package.json']) {
    assert.equal((await fetch(origin+prefix+path)).status,404);
  }
});
test('blocked module leaves honest uninitialized state', async () => {
  const context=await browser.newContext({serviceWorkers:'block'});
  try {
    const page=await context.newPage();
    await page.route('**/*.js',route=>route.abort());
    await page.goto(origin+subpath);
    assert.equal(await page.locator('#diagnostics').getAttribute('data-initialized'),'false');
    assert.match(await page.locator('#diagnostics').innerText(),/has not initialized/);
  } finally {await context.close();}
});
