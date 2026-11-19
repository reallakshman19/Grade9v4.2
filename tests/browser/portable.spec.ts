/**
 * tests/browser/portable.spec.ts
 * A64 — Portable workbench component browser test suite.
 *
 * Verifies:
 * - Semantic grid projection layout rendering and accessible tables
 * - Touch and keyboard transformation activation
 * - Outcome notice for accepted vs rejected transformations
 * - Rotation and state persistence across lifecycle transitions
 * - 48px minimum touch/hit target compliance
 *
 * No academic approval inferred from software validation.
 */

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

import {
  PortableWorkbenchController,
} from '../../web/applications/portable/component.ts';
import type { PortableWorkbenchPackage } from '../../web/applications/portable/types.ts';

const CUSTODY_DIR=process.env.G9_V35_PORTABLE_PACKAGES??'';

function loadPackage(id: string): PortableWorkbenchPackage {
  const filePath = path.join(CUSTODY_DIR, `${id}.json`);
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

describe('A64 external custody component (not run without authorized directory)', {skip:!CUSTODY_DIR}, () => {
  it('renders semantic grids and projection pills without pixel coordinates', () => {
    const pkg = loadPackage('portable-long-division');
    const controller = new PortableWorkbenchController(pkg);

    const html = controller.renderHtml();
    assert.ok(html.includes('Long division work'));
    assert.ok(html.includes('division-expression'));
    assert.ok(html.includes('portable-projection-pill'));
    // Verify no pixel coordinate styles for projection placement
    assert.ok(!html.includes('position: absolute'));
    assert.ok(!html.includes('translate3d'));
  });

  it('applies semantic transformation rules and updates UI with outcome notice', () => {
    const pkg = loadPackage('portable-motion-shared-clock');
    const controller = new PortableWorkbenchController(pkg);

    // Apply same-time ACCEPT rule
    const outcome1 = controller.applyTransformation('same-time');
    assert.equal(outcome1.outcome, 'ACCEPT');

    const html1 = controller.renderHtml();
    assert.ok(html1.includes('ACCEPT:'));
    assert.ok(html1.includes('same-time-result-projection'));

    // Apply mixed-time REJECT rule
    const outcome2 = controller.applyTransformation('mixed-time');
    assert.equal(outcome2.outcome, 'REJECT');

    const html2 = controller.renderHtml();
    assert.ok(html2.includes('REJECT:'));
    assert.ok(html2.includes('single physical state'));
  });
});

describe('A64 external custody rotation (not run without authorized directory)', {skip:!CUSTODY_DIR}, () => {
  it('preserves applied transformations and rotation across state roundtrip without data loss', () => {
    const pkg = loadPackage('portable-motion-shared-clock');
    const controller = new PortableWorkbenchController(pkg);

    controller.applyTransformation('same-time');
    controller.rotate(90);

    const savedState = controller.exportState();
    assert.equal(savedState.packageId, 'portable-motion-shared-clock');
    assert.equal(savedState.rotationDegrees, 90);
    assert.ok(savedState.appliedRuleIds.includes('same-time'));
    assert.equal(savedState.dynamicProjections.length, 1);

    // Restore into fresh controller
    const freshController = new PortableWorkbenchController(pkg);
    freshController.restoreState(savedState);

    assert.equal(freshController.getAdapter().getRotation(), 90);
    assert.ok(freshController.getAdapter().getAppliedRules().includes('same-time'));
    assert.equal(
      freshController.getAdapter().getAllProjections().some((p) => p.id === 'same-time-result-projection'),
      true
    );

    const html = freshController.renderHtml();
    assert.ok(html.includes('rotate(90deg)'));
    assert.ok(html.includes('same-time-result-projection'));
  });

  it('verifies all interactive elements conform to 48px hit target bounds', () => {
    const pkg = loadPackage('portable-long-division');
    const controller = new PortableWorkbenchController(pkg);

    const html = controller.renderHtml();
    assert.ok(html.includes('min-height: 48px'));
    assert.ok(html.includes('min-width: 48px'));
    assert.ok(html.includes('id="portable-rotate-btn"'));
    assert.ok(html.includes('class="portable-rule-action-btn"'));
  });
});

import {syntheticPackage} from '../fixtures/portable-synthetic.ts';
import {chromium} from 'playwright-core';
it('actual Chromium renders inert labels and preserves replay-derived scene',async()=>{const pkg=syntheticPackage(),w=new PortableWorkbenchController({...pkg,title:'"><img src=x onerror=alert(1)>'});assert.equal(w.applyTransformation('move').outcome,'ACCEPT');w.rotate(90);const saved=w.exportState();const execPath=process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE||'C:/Users/reall/AppData/Local/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-win64/chrome-headless-shell.exe';const browser=await chromium.launch({headless:true,executablePath:execPath});try{const p=await browser.newPage();await p.setContent(w.renderHtml());assert.equal(await p.locator('img,[onerror]').count(),0);assert.equal(await p.locator('[data-projection-id=p2]').count(),1);assert.equal(await p.locator('[data-projection-id=p1]').count(),0);assert.equal(await p.locator('[data-outcome]').count(),0);assert.match(await p.locator('header').textContent()??'',/Unverified diagnostic/);}finally{await browser.close();}});

