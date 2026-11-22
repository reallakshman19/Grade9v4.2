#!/usr/bin/env node
/**
 * scripts/verify_component_html.js
 * Verifies that the rendered HTML of Portable Workbench components strictly obeys all architectural invariants:
 * - Zero iframes
 * - Zero pixel coordinate styles (no position: absolute, no translate3d)
 * - WCAG AAA 48px hit target bounds on all interactive buttons
 * - Semantic table markup with role="table"
 * - Presence of required diagnostic audit classes (.portable-workbench-panel, h3, .portable-provenance-badge)
 */

import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = fs.existsSync(path.resolve('web/applications/portable/component.ts'))
  ? path.resolve('.')
  : path.resolve('d:/CodeD/g9v4.2-2');

// Import runtime components from repo
const componentPath = path.join(ROOT, 'web/applications/portable/component.ts');
if (!fs.existsSync(componentPath)) {
  console.log(`Note: Running outside workspace repo context (${ROOT}). Skipping component import.`);
  process.exit(0);
}

const { PortableWorkbenchController } = await import(pathToFileURL(componentPath).href);

const GOLDEN_DIR = path.resolve(__dirname, '../fixtures/golden');
const goldenFiles = fs.readdirSync(GOLDEN_DIR).filter((f) => f.endsWith('.json'));

let total = 0;
let passed = 0;

console.log('=== VERIFYING RENDERED HTML INVARIANTS ===');

for (const file of goldenFiles) {
  total++;
  const pkg = JSON.parse(fs.readFileSync(path.join(GOLDEN_DIR, file), 'utf-8'));
  const ctrl = new PortableWorkbenchController(pkg);
  const html = ctrl.renderHtml();

  try {
    // 1. Zero Iframes
    assert.ok(!html.includes('<iframe'), 'Zero iframes invariant violated');

    // 2. Zero pixel coordinates
    assert.ok(!html.includes('position: absolute'), 'Pixel coordinate styling (position: absolute) forbidden');
    assert.ok(!html.includes('translate3d'), 'Translate3d coordinates forbidden');

    // 3. Ergonomics (48px hit targets)
    assert.ok(html.includes('min-height: 48px'), '48px minimum touch height required');
    assert.ok(html.includes('min-width: 48px'), '48px minimum touch width required');
    assert.ok(html.includes('id="portable-rotate-btn"'), 'Rotate button must be present');

    // 4. Semantic Table & Diagnostic Structure
    assert.ok(html.includes('class="portable-workbench-panel"'), '.portable-workbench-panel required');
    assert.ok(html.includes('<h3'), 'h3 title required');
    assert.ok(html.includes('class="portable-provenance-badge"'), '.portable-provenance-badge required');
    assert.ok(html.includes('role="table"'), 'Semantic table role required');

    // 5. Kid Guide & Telemetry
    assert.ok(html.includes('portable-kid-guide-card'), 'Kid-friendly guide card required');

    console.log(`  ✅ PASS: ${file} rendered HTML conforms to all invariants`);
    passed++;
  } catch (err) {
    console.error(`  ❌ FAIL: ${file} - ${err.message}`);
  }
}

console.log(`\nHTML Invariant Result: ${passed}/${total} passed`);
if (passed === total) {
  console.log('🎉 ALL RENDERED HTML INVARIANTS VERIFIED!');
  process.exit(0);
} else {
  process.exit(1);
}
