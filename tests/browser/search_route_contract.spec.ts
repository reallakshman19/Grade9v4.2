import { it } from 'node:test';
import assert from 'node:assert/strict';
import { chromium } from 'playwright-core';
import { searchFixture } from '../fixtures/search-wire.ts';

const BASE_URL = 'http://127.0.0.1:3000';

it('Gate G3 — Search Route Contract & Query Parameter Lifecycle in Browser', { timeout: 60000 }, async () => {
  const f = searchFixture();
  const browser = await chromium.launch({ headless: true });
  try {
    const page = await browser.newPage({ viewport: { width: 1600, height: 1000 } });
    await page.goto(`${BASE_URL}/`, { waitUntil: 'domcontentloaded' });

    // 1. Setup harness
    await page.evaluate(async (f) => {
      const { SearchEngine } = await import('/runtime/search.ts' as string);
      const { ManifestLoader } = await import('/runtime/loader.ts' as string);
      const { Router } = await import('/app/router.ts' as string);
      const { UniversalSearchPageController } = await import('/pages/search.ts' as string);

      const state = { active: true, wire: f.actual };
      const make = async () => {
        const w = state.wire;
        const l = new ManifestLoader([{ releaseId: w.pins.releaseId, digest: w.pins.releaseDigest }]);
        const release = await l.loadFromData(w.release, w.pins.releaseDigest);
        return SearchEngine.open({
          pins: w.pins,
          releaseLoader: l,
          release,
          manifestBytes: w.manifest,
          loadShard: async (m: any) => w.shards[m.shard_id],
          live: async () => state.active && state.wire.pins.manifestDigest === w.pins.manifestDigest,
        });
      };

      const router = new Router({ basePath: '/grade9', useHash: true });
      const root = document.getElementById('app')!;
      const host = new UniversalSearchPageController(root, router, make);
      (window as any).g3 = { state, host, router, make, f, root };
    }, f);

    // 2. Test open(/search) -> initializes empty query and renders
    const r1 = await page.evaluate(async () => {
      const { host, router } = (window as any).g3;
      const ok = await host.open(router.toHref('/search'));
      const input = document.querySelector<HTMLInputElement>('input[data-search]');
      return { ok, state: host.getState(), inputVal: input?.value ?? null };
    });
    assert.equal(r1.ok, true);
    assert.match(r1.state, /^(RESULTS|ZERO_RESULTS)$/);
    assert.equal(r1.inputVal, '');

    // 3. Test open(/search?q=energy) -> pre-fills query and auto-executes
    const r2 = await page.evaluate(async () => {
      const { host, router } = (window as any).g3;
      const ok = await host.open(router.toHref('/search?q=energy'));
      const input = document.querySelector<HTMLInputElement>('input[data-search]');
      const statusP = document.querySelector('section[data-results] p[role="status"]');
      return { ok, state: host.getState(), inputVal: input?.value ?? null, statusText: statusP?.textContent ?? null };
    });
    assert.equal(r2.ok, true);
    assert.equal(r2.state, 'RESULTS');
    assert.equal(r2.inputVal, 'energy');
    assert.match(r2.statusText ?? '', /matching diagnostic question/);

    // 4. Test open(/search?q=) -> allows empty query param
    const r3 = await page.evaluate(async () => {
      const { host, router } = (window as any).g3;
      const ok = await host.open(router.toHref('/search?q='));
      const input = document.querySelector<HTMLInputElement>('input[data-search]');
      return { ok, state: host.getState(), inputVal: input?.value ?? null };
    });
    assert.equal(r3.ok, true);
    assert.equal(r3.inputVal, '');

    // 5. Test unexpected query key (?extra=bad) -> fails closed to STALE_OR_UNAVAILABLE
    const r4 = await page.evaluate(async () => {
      const { host, router } = (window as any).g3;
      const ok = await host.open(router.toHref('/search?extra=bad'));
      return { ok, state: host.getState() };
    });
    assert.equal(r4.ok, false);
    assert.equal(r4.state, 'STALE_OR_UNAVAILABLE');

    // 6. Test multiple query keys (?q=energy&leak=1) -> fails closed
    const r5 = await page.evaluate(async () => {
      const { host, router } = (window as any).g3;
      const ok = await host.open(router.toHref('/search?q=energy&leak=1'));
      return { ok, state: host.getState() };
    });
    assert.equal(r5.ok, false);
    assert.equal(r5.state, 'STALE_OR_UNAVAILABLE');

    // 7. Test non-empty hash (/search#fragment) -> fails closed
    const r6 = await page.evaluate(async () => {
      const { host, router } = (window as any).g3;
      const ok = await host.open(router.toHref('/search#fragment'));
      return { ok, state: host.getState() };
    });
    assert.equal(r6.ok, false);
    assert.equal(r6.state, 'STALE_OR_UNAVAILABLE');

    // 8. Test query length > 1000 -> fails closed
    const r7 = await page.evaluate(async () => {
      const { host, router } = (window as any).g3;
      const longQ = 'a'.repeat(1001);
      const ok = await host.open(router.toHref('/search?q=' + longQ));
      return { ok, state: host.getState() };
    });
    assert.equal(r7.ok, false);
    assert.equal(r7.state, 'STALE_OR_UNAVAILABLE');

    // 9. Test close()
    const r8 = await page.evaluate(async () => {
      const { host, root } = (window as any).g3;
      await host.open('/grade9/#/search');
      const hadChildren = root.children.length > 0;
      host.close();
      return { hadChildren, state: host.getState(), childCount: root.children.length };
    });
    assert.equal(r8.hadChildren, true);
    assert.equal(r8.state, 'CLOSED');
    assert.equal(r8.childCount, 0);

  } finally {
    await browser.close();
  }
});
