/**
 * web/styles/tokens.ts
 * A21 – Tablet design tokens
 *
 * Canonical design token registry for the Grade9 tablet app shell.
 * All sizes in CSS pixels (dp). Enforces:
 *   - 48px minimum interactive hit target (WCAG 2.5.5 / Material baseline)
 *   - 56px primary action height (FAB / primary button)
 *   - Safe-area inset support (env(safe-area-inset-*))
 *   - No page overflow on tablet viewports (1000×1600 and 1600×1000)
 *   - Keyboard and touch interaction parity
 *
 * No academic approval inferred from software validation.
 */

// ---------------------------------------------------------------------------
// Hit target constraints
// ---------------------------------------------------------------------------

export const HIT_TARGET_MIN_PX = 48;
export const HIT_TARGET_PRIMARY_PX = 56;
export const HIT_TARGET_COMPACT_PX = 40; // only for non-interactive labels

// ---------------------------------------------------------------------------
// Breakpoints (tablet-primary)
// ---------------------------------------------------------------------------

export const BREAKPOINT_PORTRAIT_WIDTH = 1000;
export const BREAKPOINT_PORTRAIT_HEIGHT = 1600;
export const BREAKPOINT_LANDSCAPE_WIDTH = 1600;
export const BREAKPOINT_LANDSCAPE_HEIGHT = 1000;
export const BREAKPOINT_COMPACT_WIDTH = 800;

// ---------------------------------------------------------------------------
// Spacing scale
// ---------------------------------------------------------------------------

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

// ---------------------------------------------------------------------------
// Typography scale (px)
// ---------------------------------------------------------------------------

export const FONT_SIZE = {
  caption: 12,
  body2: 14,
  body1: 16,
  subtitle2: 14,
  subtitle1: 16,
  h6: 20,
  h5: 24,
  h4: 34,
  h3: 48,
  h2: 60,
  h1: 96,
} as const;

// ---------------------------------------------------------------------------
// Color tokens (semantic — exact values determined by design system)
// ---------------------------------------------------------------------------

export const COLOR_TOKEN = {
  surfacePrimary: "var(--g9-surface-primary)",
  surfaceSecondary: "var(--g9-surface-secondary)",
  onSurface: "var(--g9-on-surface)",
  primary: "var(--g9-primary)",
  onPrimary: "var(--g9-on-primary)",
  error: "var(--g9-error)",
  onError: "var(--g9-on-error)",
  outline: "var(--g9-outline)",
  scrim: "var(--g9-scrim)",
} as const;

// ---------------------------------------------------------------------------
// Elevation
// ---------------------------------------------------------------------------

export const ELEVATION = {
  none: 0,
  level1: 1,
  level2: 3,
  level3: 6,
  level4: 8,
  level5: 12,
} as const;

// ---------------------------------------------------------------------------
// Animation
// ---------------------------------------------------------------------------

export const ANIMATION = {
  durationShort1: 50,
  durationShort2: 100,
  durationMedium1: 200,
  durationMedium2: 300,
  durationLong1: 400,
  easingStandard: "cubic-bezier(0.2, 0, 0, 1.0)",
  easingEmphasized: "cubic-bezier(0.2, 0, 0, 1.0)",
  easingDecelerate: "cubic-bezier(0.0, 0.0, 0.2, 1.0)",
  easingAccelerate: "cubic-bezier(0.3, 0.0, 1.0, 1.0)",
} as const;

// ---------------------------------------------------------------------------
// Safe area tokens (env()-based)
// ---------------------------------------------------------------------------

export const SAFE_AREA = {
  top: "env(safe-area-inset-top, 0px)",
  right: "env(safe-area-inset-right, 0px)",
  bottom: "env(safe-area-inset-bottom, 0px)",
  left: "env(safe-area-inset-left, 0px)",
} as const;

// ---------------------------------------------------------------------------
// Zoom / font scale
// ---------------------------------------------------------------------------

export const FONT_SCALE_MIN = 0.85;
export const FONT_SCALE_MAX = 1.5;
export const FONT_SCALE_DEFAULT = 1.0;
export const FONT_SCALE_STEP = 0.05;

// ---------------------------------------------------------------------------
// Utility: validate hit target
// ---------------------------------------------------------------------------

export function validateHitTarget(
  widthPx: number,
  heightPx: number,
  isPrimary = false
): { valid: boolean; reason: string } {
  const minSize = isPrimary ? HIT_TARGET_PRIMARY_PX : HIT_TARGET_MIN_PX;
  if (widthPx < minSize || heightPx < minSize) {
    return {
      valid: false,
      reason: `Hit target ${widthPx}×${heightPx}px is below the ${minSize}px minimum`,
    };
  }
  return { valid: true, reason: "Hit target meets minimum size" };
}

// ---------------------------------------------------------------------------
// Utility: validate viewport (no overflow)
// ---------------------------------------------------------------------------

export function validateViewport(
  viewportW: number,
  viewportH: number,
  contentW: number,
  contentH: number
): { valid: boolean; reason: string } {
  if (contentW > viewportW) {
    return { valid: false, reason: `Content width ${contentW}px overflows viewport ${viewportW}px` };
  }
  if (contentH > viewportH) {
    return { valid: false, reason: `Content height ${contentH}px overflows viewport ${viewportH}px` };
  }
  return { valid: true, reason: "No overflow" };
}

// ---------------------------------------------------------------------------
// CSS custom property declarations (for static CSS generation)
// ---------------------------------------------------------------------------

export const CSS_VARS: ReadonlyArray<readonly [string, string]> = [
  ["--g9-hit-min", `${HIT_TARGET_MIN_PX}px`],
  ["--g9-hit-primary", `${HIT_TARGET_PRIMARY_PX}px`],
  ["--g9-spacing-xs", `${SPACING.xs}px`],
  ["--g9-spacing-sm", `${SPACING.sm}px`],
  ["--g9-spacing-md", `${SPACING.md}px`],
  ["--g9-spacing-lg", `${SPACING.lg}px`],
  ["--g9-spacing-xl", `${SPACING.xl}px`],
  ["--g9-spacing-xxl", `${SPACING.xxl}px`],
  ["--g9-font-body1", `${FONT_SIZE.body1}px`],
  ["--g9-font-h6", `${FONT_SIZE.h6}px`],
  ["--g9-safe-top", SAFE_AREA.top],
  ["--g9-safe-right", SAFE_AREA.right],
  ["--g9-safe-bottom", SAFE_AREA.bottom],
  ["--g9-safe-left", SAFE_AREA.left],
];

export function generateCssVarBlock(): string {
  const vars = CSS_VARS.map(([name, val]) => `  ${name}: ${val};`).join("\n");
  return `:root {\n${vars}\n}`;
}
