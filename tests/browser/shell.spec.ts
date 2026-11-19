/**
 * tests/browser/shell.spec.ts
 * A21 â€“ Shell and navigation contract tests
 *
 * Validates: all viewports (portrait 1000Ã—1600, landscape 1600Ã—1000, compact 800Ã—*),
 * 48px minimum hit targets, 56px primary actions, no page overflow, keyboard/touch
 * parity, drawer states, focus trap, font scale/zoom bounds, error states,
 * orientation detection, CSS var block generation.
 *
 * No academic approval inferred from software validation.
 */

import { describe, it } from "node:test";
import assert from "node:assert/strict";

import {
  validateHitTarget,
  validateViewport,
  generateCssVarBlock,
  HIT_TARGET_MIN_PX,
  HIT_TARGET_PRIMARY_PX,
  FONT_SCALE_MIN,
  FONT_SCALE_MAX,
  FONT_SCALE_DEFAULT,
  SPACING,
  BREAKPOINT_PORTRAIT_WIDTH,
  BREAKPOINT_LANDSCAPE_WIDTH,
} from "../../web/styles/tokens.ts";

import {
  createNavigationController,
  validateNavItem,
} from "../../web/components/navigation.ts";

import type { NavRoute, NavItem } from "../../web/components/navigation.ts";

import { createAppShell } from "../../web/app/shell.ts";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const SAMPLE_ROUTES: NavRoute[] = [
  { id: "home",    path: "/",        label: "Home",    icon: "home",    requiresAuth: false },
  { id: "subject", path: "/subject", label: "Subject", icon: "book",    requiresAuth: false },
  { id: "search",  path: "/search",  label: "Search",  icon: "search",  requiresAuth: false },
  { id: "settings",path: "/settings",label: "Settings",icon: "cog",     requiresAuth: true },
];

// ---------------------------------------------------------------------------
// Design token constraints
// ---------------------------------------------------------------------------

describe("Design tokens â€“ hit target constants", () => {
  it("HIT_TARGET_MIN_PX is 48", () => {
    assert.equal(HIT_TARGET_MIN_PX, 48);
  });

  it("HIT_TARGET_PRIMARY_PX is 56", () => {
    assert.equal(HIT_TARGET_PRIMARY_PX, 56);
  });

  it("validateHitTarget passes for 48Ã—48", () => {
    const r = validateHitTarget(48, 48);
    assert.equal(r.valid, true);
  });

  it("validateHitTarget fails for 47Ã—48 (width too small)", () => {
    const r = validateHitTarget(47, 48);
    assert.equal(r.valid, false);
    assert.ok(r.reason.includes("47"));
  });

  it("validateHitTarget fails for 48Ã—47 (height too small)", () => {
    const r = validateHitTarget(48, 47);
    assert.equal(r.valid, false);
  });

  it("validateHitTarget primary: passes for 56Ã—56", () => {
    const r = validateHitTarget(56, 56, true);
    assert.equal(r.valid, true);
  });

  it("validateHitTarget primary: fails for 48Ã—48 (below 56px primary)", () => {
    const r = validateHitTarget(48, 48, true);
    assert.equal(r.valid, false);
    assert.ok(r.reason.includes("56"));
  });

  it("SPACING.xxl equals HIT_TARGET_MIN_PX (48)", () => {
    assert.equal(SPACING.xxl, HIT_TARGET_MIN_PX);
  });
});

// ---------------------------------------------------------------------------
// Viewport overflow constraint
// ---------------------------------------------------------------------------

describe("Design tokens â€“ viewport overflow", () => {
  it("portrait 1000Ã—1600: no overflow for 1000Ã—1600 content", () => {
    const r = validateViewport(1000, 1600, 1000, 1600);
    assert.equal(r.valid, true);
  });

  it("portrait 1000Ã—1600: overflow if content is 1001 wide", () => {
    const r = validateViewport(1000, 1600, 1001, 1600);
    assert.equal(r.valid, false);
    assert.ok(r.reason.includes("overflow"));
  });

  it("landscape 1600Ã—1000: no overflow for 1600Ã—1000 content", () => {
    const r = validateViewport(1600, 1000, 1600, 1000);
    assert.equal(r.valid, true);
  });

  it("compact 800Ã—*: no overflow for 800-wide content", () => {
    const r = validateViewport(800, 1200, 800, 1200);
    assert.equal(r.valid, true);
  });

  it("overflow detected on height axis", () => {
    const r = validateViewport(1000, 1600, 1000, 1601);
    assert.equal(r.valid, false);
    assert.ok(r.reason.includes("height"));
  });
});

// ---------------------------------------------------------------------------
// CSS var block generation
// ---------------------------------------------------------------------------

describe("Design tokens â€“ CSS var block", () => {
  it("generateCssVarBlock produces :root block", () => {
    const css = generateCssVarBlock();
    assert.ok(css.startsWith(":root {"));
    assert.ok(css.endsWith("}"));
  });

  it("contains --g9-hit-min: 48px", () => {
    const css = generateCssVarBlock();
    assert.ok(css.includes("--g9-hit-min: 48px"));
  });

  it("contains --g9-hit-primary: 56px", () => {
    const css = generateCssVarBlock();
    assert.ok(css.includes("--g9-hit-primary: 56px"));
  });

  it("contains safe-area-inset tokens", () => {
    const css = generateCssVarBlock();
    assert.ok(css.includes("safe-area-inset-top"));
    assert.ok(css.includes("safe-area-inset-bottom"));
  });
});

// ---------------------------------------------------------------------------
// NavigationController â€“ routes and back-stack
// ---------------------------------------------------------------------------

describe("NavigationController â€“ route navigation", () => {
  it("push navigates to a route and updates activeRouteId", () => {
    const nav = createNavigationController(SAMPLE_ROUTES);
    nav.push("home");
    assert.equal(nav.getState().activeRouteId, "home");
  });

  it("push builds back-stack correctly", () => {
    const nav = createNavigationController(SAMPLE_ROUTES);
    nav.push("home");
    nav.push("subject");
    assert.equal(nav.getState().backStack.length, 1);
    assert.equal(nav.getState().backStack[0], "home");
  });

  it("pop returns to previous route", () => {
    const nav = createNavigationController(SAMPLE_ROUTES);
    nav.push("home");
    nav.push("subject");
    const result = nav.pop();
    assert.equal(result, true);
    assert.equal(nav.getState().activeRouteId, "home");
    assert.equal(nav.getState().backStack.length, 0);
  });

  it("pop returns false when back-stack is empty", () => {
    const nav = createNavigationController(SAMPLE_ROUTES);
    nav.push("home");
    const result = nav.pop();
    assert.equal(result, false);
  });

  it("canGoBack false when nothing on stack", () => {
    const nav = createNavigationController(SAMPLE_ROUTES);
    assert.equal(nav.canGoBack(), false);
  });

  it("canGoBack true after two pushes", () => {
    const nav = createNavigationController(SAMPLE_ROUTES);
    nav.push("home");
    nav.push("subject");
    assert.equal(nav.canGoBack(), true);
  });

  it("replace does not add to back-stack", () => {
    const nav = createNavigationController(SAMPLE_ROUTES);
    nav.push("home");
    nav.replace("subject");
    assert.equal(nav.getState().activeRouteId, "subject");
    assert.equal(nav.getState().backStack.length, 0);
  });

  it("throws on unknown route push", () => {
    const nav = createNavigationController(SAMPLE_ROUTES);
    assert.throws(() => nav.push("does-not-exist"));
  });
});

// ---------------------------------------------------------------------------
// NavigationController â€“ drawer states
// ---------------------------------------------------------------------------

describe("NavigationController â€“ drawer states", () => {
  it("initial drawerState is CLOSED", () => {
    const nav = createNavigationController(SAMPLE_ROUTES);
    assert.equal(nav.getState().drawerState, "CLOSED");
  });

  it("openDrawer transitions to OPEN", () => {
    const nav = createNavigationController(SAMPLE_ROUTES);
    nav.openDrawer();
    assert.equal(nav.getState().drawerState, "OPEN");
  });

  it("closeDrawer transitions to CLOSED", () => {
    const nav = createNavigationController(SAMPLE_ROUTES);
    nav.openDrawer();
    nav.closeDrawer();
    assert.equal(nav.getState().drawerState, "CLOSED");
  });

  it("peekDrawer transitions to PEEK", () => {
    const nav = createNavigationController(SAMPLE_ROUTES);
    nav.peekDrawer();
    assert.equal(nav.getState().drawerState, "PEEK");
  });

  it("event log records drawer transitions", () => {
    const nav = createNavigationController(SAMPLE_ROUTES);
    nav.openDrawer();
    nav.closeDrawer();
    const log = nav.getEventLog();
    assert.equal(log[0].type, "DRAWER_OPEN");
    assert.equal(log[1].type, "DRAWER_CLOSE");
  });
});

// ---------------------------------------------------------------------------
// NavigationController â€“ focus (keyboard/touch parity)
// ---------------------------------------------------------------------------

describe("NavigationController â€“ focus management", () => {
  it("setFocus updates focusedItemId", () => {
    const nav = createNavigationController(SAMPLE_ROUTES);
    nav.setFocus("home-item");
    assert.equal(nav.getState().focusedItemId, "home-item");
  });

  it("clearFocus resets focusedItemId to null", () => {
    const nav = createNavigationController(SAMPLE_ROUTES);
    nav.setFocus("home-item");
    nav.clearFocus();
    assert.equal(nav.getState().focusedItemId, null);
  });

  it("event log records FOCUS_SET", () => {
    const nav = createNavigationController(SAMPLE_ROUTES);
    nav.setFocus("search-item");
    const log = nav.getEventLog();
    assert.ok(log.some(e => e.type === "FOCUS_SET" && e.itemId === "search-item"));
  });
});

// ---------------------------------------------------------------------------
// NavItem hit target validation
// ---------------------------------------------------------------------------

describe("NavItem â€“ hit target validation (48px minimum)", () => {
  it("valid item: 56Ã—56 passes", () => {
    const item: NavItem = { id: "i1", label: "Home", icon: "home", routeId: "home", disabled: false, hitTargetW: 56, hitTargetH: 56 };
    assert.equal(validateNavItem(item), null);
  });

  it("valid item: exactly 48Ã—48 passes", () => {
    const item: NavItem = { id: "i2", label: "Home", icon: "home", routeId: "home", disabled: false, hitTargetW: 48, hitTargetH: 48 };
    assert.equal(validateNavItem(item), null);
  });

  it("invalid item: 44Ã—48 (width below 48px) fails", () => {
    const item: NavItem = { id: "i3", label: "Home", icon: "home", routeId: "home", disabled: false, hitTargetW: 44, hitTargetH: 48 };
    const err = validateNavItem(item);
    assert.ok(err !== null);
    assert.ok(err.includes("48px minimum"));
  });

  it("invalid item: 48Ã—44 (height below 48px) fails", () => {
    const item: NavItem = { id: "i4", label: "Home", icon: "home", routeId: "home", disabled: false, hitTargetW: 48, hitTargetH: 44 };
    const err = validateNavItem(item);
    assert.ok(err !== null);
  });
});

// ---------------------------------------------------------------------------
// AppShell â€“ viewport and orientation
// ---------------------------------------------------------------------------

describe("AppShell â€“ viewport and orientation", () => {
  it("portrait 1000Ã—1600 â†’ PORTRAIT orientation", () => {
    const shell = createAppShell(1000, 1600, SAMPLE_ROUTES);
    assert.equal(shell.orientation(), "PORTRAIT");
  });

  it("landscape 1600Ã—1000 â†’ LANDSCAPE orientation", () => {
    const shell = createAppShell(1600, 1000, SAMPLE_ROUTES);
    assert.equal(shell.orientation(), "LANDSCAPE");
  });

  it("compact 800Ã—1200 â†’ COMPACT orientation", () => {
    const shell = createAppShell(800, 1200, SAMPLE_ROUTES);
    assert.equal(shell.orientation(), "COMPACT");
  });

  it("maxContentWidth equals viewportW (no overflow)", () => {
    const shell = createAppShell(1000, 1600, SAMPLE_ROUTES);
    assert.equal(shell.maxContentWidth(), 1000);
  });

  it("maxContentHeight equals viewportH (no overflow)", () => {
    const shell = createAppShell(1000, 1600, SAMPLE_ROUTES);
    assert.equal(shell.maxContentHeight(), 1600);
  });

  it("resize updates viewport", () => {
    const shell = createAppShell(1000, 1600, SAMPLE_ROUTES);
    shell.resize(1600, 1000);
    assert.equal(shell.maxContentWidth(), 1600);
    assert.equal(shell.orientation(), "LANDSCAPE");
  });

  it("portrait nav mode is DRAWER", () => {
    const shell = createAppShell(1000, 1600, SAMPLE_ROUTES);
    assert.equal(shell.nav.getState().mode, "DRAWER");
  });

  it("landscape nav mode is RAIL", () => {
    const shell = createAppShell(1600, 1000, SAMPLE_ROUTES);
    assert.equal(shell.nav.getState().mode, "RAIL");
  });

  it("compact nav mode is BAR", () => {
    const shell = createAppShell(800, 1200, SAMPLE_ROUTES);
    assert.equal(shell.nav.getState().mode, "BAR");
  });
});

// ---------------------------------------------------------------------------
// AppShell â€“ status / error states
// ---------------------------------------------------------------------------

describe("AppShell â€“ status and error states", () => {
  it("initial status is LOADING", () => {
    const shell = createAppShell(1000, 1600, SAMPLE_ROUTES);
    assert.equal(shell.snapshot().status, "LOADING");
  });

  it("setPopulated transitions to POPULATED and clears error", () => {
    const shell = createAppShell(1000, 1600, SAMPLE_ROUTES);
    shell.setPopulated();
    assert.equal(shell.snapshot().status, "POPULATED");
    assert.equal(shell.snapshot().error, null);
  });

  it("setEmpty transitions to EMPTY", () => {
    const shell = createAppShell(1000, 1600, SAMPLE_ROUTES);
    shell.setEmpty();
    assert.equal(shell.snapshot().status, "EMPTY");
  });

  it("setError transitions to ERROR and stores error", () => {
    const shell = createAppShell(1000, 1600, SAMPLE_ROUTES);
    shell.setError({ code: "STORAGE_FAIL", message: "IndexedDB unavailable", recoverable: true });
    const snap = shell.snapshot();
    assert.equal(snap.status, "ERROR");
    assert.equal(snap.error?.code, "STORAGE_FAIL");
    assert.equal(snap.error?.recoverable, true);
  });

  it("setOffline transitions to OFFLINE", () => {
    const shell = createAppShell(1000, 1600, SAMPLE_ROUTES);
    shell.setOffline();
    assert.equal(shell.snapshot().status, "OFFLINE");
  });

  it("setLoading clears error and returns to LOADING", () => {
    const shell = createAppShell(1000, 1600, SAMPLE_ROUTES);
    shell.setError({ code: "ERR", message: "fail", recoverable: false });
    shell.setLoading();
    const snap = shell.snapshot();
    assert.equal(snap.status, "LOADING");
    assert.equal(snap.error, null);
  });
});

// ---------------------------------------------------------------------------
// AppShell â€“ font scale / zoom
// ---------------------------------------------------------------------------

describe("AppShell â€“ font scale and zoom bounds", () => {
  it("default font scale is 1.0", () => {
    const shell = createAppShell(1000, 1600, SAMPLE_ROUTES);
    assert.equal(shell.getFontScale(), FONT_SCALE_DEFAULT);
  });

  it("zoomIn increases font scale by 0.05", () => {
    const shell = createAppShell(1000, 1600, SAMPLE_ROUTES);
    shell.zoomIn();
    assert.ok(Math.abs(shell.getFontScale() - 1.05) < 0.001);
  });

  it("zoomOut decreases font scale by 0.05", () => {
    const shell = createAppShell(1000, 1600, SAMPLE_ROUTES);
    shell.zoomOut();
    assert.ok(Math.abs(shell.getFontScale() - 0.95) < 0.001);
  });

  it("zoom clamped at FONT_SCALE_MAX (1.5)", () => {
    const shell = createAppShell(1000, 1600, SAMPLE_ROUTES);
    for (let i = 0; i < 20; i++) shell.zoomIn(); // push past max
    assert.equal(shell.getFontScale(), FONT_SCALE_MAX);
  });

  it("zoom clamped at FONT_SCALE_MIN (0.85)", () => {
    const shell = createAppShell(1000, 1600, SAMPLE_ROUTES);
    for (let i = 0; i < 20; i++) shell.zoomOut(); // push past min
    assert.equal(shell.getFontScale(), FONT_SCALE_MIN);
  });

  it("resetZoom restores to 1.0", () => {
    const shell = createAppShell(1000, 1600, SAMPLE_ROUTES);
    shell.zoomIn();
    shell.zoomIn();
    shell.resetZoom();
    assert.equal(shell.getFontScale(), FONT_SCALE_DEFAULT);
  });

  it("setFontScale to exactly 1.3", () => {
    const shell = createAppShell(1000, 1600, SAMPLE_ROUTES);
    shell.setFontScale(1.3);
    assert.ok(Math.abs(shell.getFontScale() - 1.3) < 0.001);
  });

  it("setFontScale beyond max is clamped to 1.5", () => {
    const shell = createAppShell(1000, 1600, SAMPLE_ROUTES);
    shell.setFontScale(99);
    assert.equal(shell.getFontScale(), FONT_SCALE_MAX);
  });
});

// ---------------------------------------------------------------------------
// AppShell â€“ focus trap
// ---------------------------------------------------------------------------

describe("AppShell â€“ focus trap (drawer/modal)", () => {
  it("focusTrapActive is false by default", () => {
    const shell = createAppShell(1000, 1600, SAMPLE_ROUTES);
    assert.equal(shell.snapshot().focusTrapActive, false);
  });

  it("enableFocusTrap sets focusTrapActive=true", () => {
    const shell = createAppShell(1000, 1600, SAMPLE_ROUTES);
    shell.enableFocusTrap();
    assert.equal(shell.snapshot().focusTrapActive, true);
  });

  it("disableFocusTrap resets to false", () => {
    const shell = createAppShell(1000, 1600, SAMPLE_ROUTES);
    shell.enableFocusTrap();
    shell.disableFocusTrap();
    assert.equal(shell.snapshot().focusTrapActive, false);
  });
});

// ---------------------------------------------------------------------------
// AppShell â€“ snapshot CSS var block
// ---------------------------------------------------------------------------

describe("AppShell â€“ snapshot includes CSS var block", () => {
  it("snapshot.cssVarBlock is a non-empty string starting with :root", () => {
    const shell = createAppShell(1000, 1600, SAMPLE_ROUTES);
    const snap = shell.snapshot();
    assert.ok(typeof snap.cssVarBlock === "string");
    assert.ok(snap.cssVarBlock.startsWith(":root {"));
  });
});

