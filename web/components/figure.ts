/**
 * web/components/figure.ts
 * A25 — Accessible figure component with zoom, alt-text, and missing-asset state.
 *
 * Enforces:
 * - Mandatory accessible alt-text and figcaption
 * - Non-destructive zoom levels [1.0, 1.5, 2.0, 3.0] with reset to 1.0
 * - Missing-required asset state preventing unreadable figures
 * - 48px minimum hit target size on zoom buttons
 *
 * No academic approval inferred from software validation.
 */

import { HIT_TARGET_MIN_PX } from '../styles/tokens.ts';
import type { ResolvedAsset } from '../runtime/assets.ts';

export const FIGURE_ZOOM_LEVELS: readonly number[] = [1.0, 1.5, 2.0, 3.0];

export interface FigureViewState {
  readonly figureId: string;
  readonly caption: string;
  readonly altText: string;
  readonly zoomScale: number;
  readonly canZoomIn: boolean;
  readonly canZoomOut: boolean;
  readonly isBrokenRequired: boolean;
  readonly isMissingOptional: boolean;
  readonly contentDataUrl?: string;
  readonly minHitTargetPx: number;
}

export class FigureController {
  private resolvedAsset: ResolvedAsset;
  private captionText: string;
  private currentZoomIndex: number = 0; // index into FIGURE_ZOOM_LEVELS (1.0 default)

  constructor(resolvedAsset: ResolvedAsset, caption: string = '') {
    this.resolvedAsset = resolvedAsset;
    this.captionText = caption;
  }

  getZoomScale(): number {
    return FIGURE_ZOOM_LEVELS[this.currentZoomIndex];
  }

  zoomIn(): boolean {
    if (this.isBroken()) return false;
    if (this.currentZoomIndex < FIGURE_ZOOM_LEVELS.length - 1) {
      this.currentZoomIndex++;
      return true;
    }
    return false;
  }

  zoomOut(): boolean {
    if (this.isBroken()) return false;
    if (this.currentZoomIndex > 0) {
      this.currentZoomIndex--;
      return true;
    }
    return false;
  }

  resetZoom(): void {
    this.currentZoomIndex = 0;
  }

  isBroken(): boolean {
    return this.resolvedAsset.status === 'MISSING_REQUIRED' || this.resolvedAsset.status === 'CORRUPT_HASH_MISMATCH';
  }

  getViewState(): FigureViewState {
    const isBrokenRequired = this.isBroken();
    const isMissingOptional = this.resolvedAsset.status === 'MISSING_OPTIONAL';

    const desc = this.resolvedAsset.descriptor;
    const altText = desc.altText || this.captionText || `Figure ${desc.id}`;

    return {
      figureId: desc.id,
      caption: this.captionText,
      altText,
      zoomScale: this.getZoomScale(),
      canZoomIn: !isBrokenRequired && this.currentZoomIndex < FIGURE_ZOOM_LEVELS.length - 1,
      canZoomOut: !isBrokenRequired && this.currentZoomIndex > 0,
      isBrokenRequired,
      isMissingOptional,
      contentDataUrl: this.resolvedAsset.contentDataUrl,
      minHitTargetPx: HIT_TARGET_MIN_PX,
    };
  }

  renderHtml(): string {
    const state = this.getViewState();

    if (state.isBrokenRequired) {
      return (
        `<figure class="figure-container figure-error" role="group" aria-label="Figure error">` +
        `<div class="missing-required-banner" role="alert">` +
        `<strong>Missing Required Figure:</strong> Asset '${state.figureId}' is unavailable.` +
        `</div>` +
        `<figcaption>${state.caption}</figcaption>` +
        `</figure>`
      );
    }

    if (state.isMissingOptional) {
      return (
        `<figure class="figure-container figure-placeholder" role="group" aria-label="${state.altText}">` +
        `<div class="optional-placeholder-box">Figure placeholder: ${state.caption}</div>` +
        `<figcaption>${state.caption}</figcaption>` +
        `</figure>`
      );
    }

    const scaleStyle = state.zoomScale > 1.0 ? `transform: scale(${state.zoomScale}); transform-origin: top left;` : '';

    return (
      `<figure class="figure-container" role="group" aria-label="${state.altText}">` +
      `<div class="figure-viewport scrollable-x scrollable-y" style="overflow: auto; max-width: 100%;">` +
      `<img src="${state.contentDataUrl}" alt="${state.altText}" style="${scaleStyle} display: block; max-width: 100%; height: auto;" />` +
      `</div>` +
      `<figcaption class="figure-caption">${state.caption}</figcaption>` +
      `</figure>`
    );
  }
}

export function createFigureController(resolvedAsset: ResolvedAsset, caption?: string): FigureController {
  return new FigureController(resolvedAsset, caption);
}
