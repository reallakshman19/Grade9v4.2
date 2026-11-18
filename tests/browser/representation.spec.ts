/**
 * tests/browser/representation.spec.ts
 * A25 — Math, figures, and shared stimulus representation tests.
 *
 * Verifies:
 * - Script injection prevention (XSS defense)
 * - Equation non-clipping via horizontally scrollable regions
 * - Accessible figure captions and mandatory alt text
 * - Figure zoom controls ([1.0, 3.0] bounds, 48px hit target)
 * - Missing-required asset state (blocks attempt, surfaces alert banner)
 * - Missing-optional asset fallback
 * - Shared stimulus layout and sanitization
 *
 * No academic approval inferred from software validation.
 */

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import {
  sanitizeMarkup,
  wrapMathInAccessibleContainer,
  createSharedStimulusRenderer,
} from '../../web/runtime/rendering.ts';

import {
  createAssetRegistry,
  AssetRegistry,
} from '../../web/runtime/assets.ts';
import type { AssetDescriptor } from '../../web/runtime/assets.ts';

import {
  createFigureController,
  FIGURE_ZOOM_LEVELS,
} from '../../web/components/figure.ts';

import {
  createMathRenderer,
} from '../../web/components/math.ts';

// ---------------------------------------------------------------------------
// Markup Sanitization & XSS Defense
// ---------------------------------------------------------------------------

describe('Rendering Engine — Script Injection Prevention', () => {
  it('strips <script> tags and executes zero untrusted script', () => {
    const malicious = '<p>Solve for x: <script>alert("XSS")</script> x^2 = 4</p>';
    const result = sanitizeMarkup(malicious);

    assert.equal(result.wasSanitized, true);
    assert.ok(!result.html.includes('<script>'));
    assert.ok(!result.html.includes('alert("XSS")'));
    assert.ok(result.html.includes('Solve for x:'));
  });

  it('strips inline event handlers like onerror and onload', () => {
    const malicious = '<img src="x" onerror="stealCookies()" alt="diagram">';
    const result = sanitizeMarkup(malicious);

    assert.equal(result.wasSanitized, true);
    assert.ok(!result.html.includes('onerror'));
    assert.ok(!result.html.includes('stealCookies'));
  });

  it('preserves safe formatting tags (p, em, strong, sub, sup)', () => {
    const safe = '<p>Work <strong>W</strong> = F &times; d <sub>collinear</sub></p>';
    const result = sanitizeMarkup(safe);

    assert.equal(result.wasSanitized, false);
    assert.equal(result.html, safe);
  });
});

// ---------------------------------------------------------------------------
// Math Non-Clipping & Typography
// ---------------------------------------------------------------------------

describe('Math Rendering — Non-Clipping & Typography Bounds', () => {
  it('wraps block equations in horizontally scrollable regions with aria-label', () => {
    const wrapped = wrapMathInAccessibleContainer({
      rawText: '\\int_{0}^{x} F(s) \\, ds = \\frac{1}{2}mv^2',
      isBlock: true,
      label: 'Work energy integral theorem',
    });

    assert.ok(wrapped.includes('role="region"'));
    assert.ok(wrapped.includes('aria-label="Work energy integral theorem"'));
    assert.ok(wrapped.includes('overflow-x: auto'));
    assert.ok(wrapped.includes('tabindex="0"'));
  });

  it('enforces minimum 14px typography for math expressions', () => {
    const math = createMathRenderer('E = mc^2', false);
    assert.ok(math.getMinFontSizePx() >= 14);
  });
});

// ---------------------------------------------------------------------------
// Figures — Alt Text, Zoom Bounds, and Missing Assets
// ---------------------------------------------------------------------------

describe('Figure Component — Zoom, Alt Text & Missing Asset States', () => {
  const VERIFIED_ASSET = {
    descriptor: {
      id: 'fig-friction-block',
      mimeType: 'image/svg+xml',
      mandatory: true,
      expectedSha256: 'abcdef1234567890',
      altText: 'Free body diagram of block on incline',
    },
    status: 'VERIFIED' as const,
    contentDataUrl: 'data:image/svg+xml;base64,PHN2Zz48L3N2Zz4=',
  };

  const MISSING_REQUIRED_ASSET = {
    descriptor: {
      id: 'fig-missing-mandatory',
      mimeType: 'image/svg+xml',
      mandatory: true,
      expectedSha256: '000000',
    },
    status: 'MISSING_REQUIRED' as const,
    error: 'Mandatory figure asset missing',
  };

  const MISSING_OPTIONAL_ASSET = {
    descriptor: {
      id: 'fig-missing-opt',
      mimeType: 'image/svg+xml',
      mandatory: false,
      expectedSha256: '111111',
    },
    status: 'MISSING_OPTIONAL' as const,
  };

  it('enforces mandatory alt text on verified figures', () => {
    const fig = createFigureController(VERIFIED_ASSET, 'Figure 1: Free body diagram');
    const state = fig.getViewState();

    assert.equal(state.isBrokenRequired, false);
    assert.equal(state.altText, 'Free body diagram of block on incline');
    assert.equal(state.caption, 'Figure 1: Free body diagram');
  });

  it('cycles zoom levels strictly within [1.0, 3.0] bounds', () => {
    const fig = createFigureController(VERIFIED_ASSET);

    assert.equal(fig.getZoomScale(), 1.0);

    // Zoom in steps
    fig.zoomIn();
    assert.equal(fig.getZoomScale(), 1.5);

    fig.zoomIn();
    assert.equal(fig.getZoomScale(), 2.0);

    fig.zoomIn();
    assert.equal(fig.getZoomScale(), 3.0);

    // Cannot zoom beyond max 3.0
    const overZoom = fig.zoomIn();
    assert.equal(overZoom, false);
    assert.equal(fig.getZoomScale(), 3.0);

    // Zoom out steps
    fig.zoomOut();
    assert.equal(fig.getZoomScale(), 2.0);

    // Reset zoom
    fig.resetZoom();
    assert.equal(fig.getZoomScale(), 1.0);
  });

  it('meets 48px minimum hit target size on zoom controls', () => {
    const fig = createFigureController(VERIFIED_ASSET);
    assert.ok(fig.getViewState().minHitTargetPx >= 48);
  });

  it('renders accessible alert banner when mandatory figure is missing', () => {
    const fig = createFigureController(MISSING_REQUIRED_ASSET, 'Crucial experimental apparatus');
    const state = fig.getViewState();

    assert.equal(state.isBrokenRequired, true);
    assert.equal(fig.zoomIn(), false); // Zoom disabled for broken figures

    const html = fig.renderHtml();
    assert.ok(html.includes('missing-required-banner'));
    assert.ok(html.includes('Missing Required Figure'));
  });

  it('renders placeholder when optional figure is missing', () => {
    const fig = createFigureController(MISSING_OPTIONAL_ASSET, 'Decorative illustration');
    const state = fig.getViewState();

    assert.equal(state.isBrokenRequired, false);
    assert.equal(state.isMissingOptional, true);

    const html = fig.renderHtml();
    assert.ok(html.includes('optional-placeholder-box'));
  });
});

// ---------------------------------------------------------------------------
// Asset Registry
// ---------------------------------------------------------------------------

describe('Asset Registry — Mandatory Asset Integrity Checks', () => {
  const REGISTRY_ASSETS: AssetDescriptor[] = [
    { id: 'ast-req-1', mimeType: 'image/svg+xml', mandatory: true, expectedSha256: 'hash1', dataBase64: 'PHN2Zz4=' },
    { id: 'ast-req-2', mimeType: 'image/svg+xml', mandatory: true, expectedSha256: 'hash2' }, // missing bytes
    { id: 'ast-opt-1', mimeType: 'image/svg+xml', mandatory: false, expectedSha256: 'hash3' }, // missing optional
  ];

  it('identifies missing mandatory assets correctly', () => {
    const registry = createAssetRegistry(REGISTRY_ASSETS);
    const check = registry.verifyAllMandatoryAssets(['ast-req-1', 'ast-req-2', 'ast-opt-1']);

    assert.equal(check.allAvailable, false);
    assert.deepEqual(check.missingMandatoryIds, ['ast-req-2']);
  });

  it('passes when all queried mandatory assets are verified', () => {
    const registry = createAssetRegistry(REGISTRY_ASSETS);
    const check = registry.verifyAllMandatoryAssets(['ast-req-1']);

    assert.equal(check.allAvailable, true);
    assert.equal(check.missingMandatoryIds.length, 0);
  });
});

// ---------------------------------------------------------------------------
// Shared Stimulus Rendering
// ---------------------------------------------------------------------------

describe('Shared Stimulus — Multi-part Question Context', () => {
  it('renders sanitized stimulus card with title and body', () => {
    const stimulus = {
      id: 'stim-01',
      title: 'Experiment: Inclined Plane Friction',
      contentHtml: '<p>A trolley of mass 500g is released from rest at the top of an incline of angle 30&deg;.</p>',
    };

    const renderer = createSharedStimulusRenderer(stimulus);
    const html = renderer.renderSafeHtml();

    assert.ok(html.includes('class="shared-stimulus-card"'));
    assert.ok(html.includes('Experiment: Inclined Plane Friction'));
    assert.ok(html.includes('500g is released from rest'));
  });
});
