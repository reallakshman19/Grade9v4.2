/**
 * web/components/math.ts
 * A25 — Accessible math formula rendering component.
 *
 * Enforces:
 * - Horizontally scrollable equation regions (never clipped on narrow tablet viewports).
 * - Base typography scaling (minimum 14px base typography).
 * - Complete XSS sanitization.
 *
 * No academic approval inferred from software validation.
 */

import { wrapMathInAccessibleContainer, sanitizeMarkup } from '../runtime/rendering.ts';
import type { MathFormulaDescriptor } from '../runtime/rendering.ts';

export interface MathViewState {
  readonly rawText: string;
  readonly isBlock: boolean;
  readonly label: string;
  readonly safeHtml: string;
  readonly minFontSizePx: number;
}

export class MathRendererController {
  private formula: MathFormulaDescriptor;
  private minFontSizePx: number = 14; // W3C / Grade9 typography minimum >= 14px

  constructor(formula: MathFormulaDescriptor) {
    this.formula = formula;
  }

  getFormula(): MathFormulaDescriptor {
    return this.formula;
  }

  getMinFontSizePx(): number {
    return this.minFontSizePx;
  }

  getViewState(): MathViewState {
    const label = this.formula.label || (this.formula.isBlock ? 'Mathematical equation' : 'Inline formula');
    const safeHtml = wrapMathInAccessibleContainer(this.formula);

    return {
      rawText: this.formula.rawText,
      isBlock: this.formula.isBlock,
      label,
      safeHtml,
      minFontSizePx: this.minFontSizePx,
    };
  }

  render(): string {
    return this.getViewState().safeHtml;
  }
}

export function createMathRenderer(
  rawText: string,
  isBlock: boolean = false,
  label?: string
): MathRendererController {
  return new MathRendererController({ rawText, isBlock, label });
}
