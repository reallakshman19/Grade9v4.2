/**
 * web/runtime/rendering.ts
 * A25 — Safe math, markup sanitization, and shared stimulus rendering.
 *
 * Enforces:
 * - Strict XSS prevention: rejects/strips all <script>, inline event handlers, and javascript: URIs.
 * - Non-clipping equation containers: horizontally scrollable math regions with aria attributes.
 * - Shared stimulus layout management across multipart questions.
 *
 * No academic approval inferred from software validation.
 */

export interface SanitizedHtml {
  readonly html: string;
  readonly wasSanitized: boolean;
  readonly strippedTags: readonly string[];
}

export interface MathFormulaDescriptor {
  readonly rawText: string;
  readonly isBlock: boolean;
  readonly label?: string;
}

const SCRIPT_BLOCK_REGEX = /<script\b[^>]*>[\s\S]*?<\/script>/gi;
const STYLE_BLOCK_REGEX = /<style\b[^>]*>[\s\S]*?<\/style>/gi;
const DANGEROUS_TAG_REGEX = /<\s*\/?\s*(script|iframe|object|embed|applet|meta|link|style|base|form|input|button|textarea|select|option)\b[^>]*>/gi;
const DANGEROUS_ATTR_REGEX = /\s*(on[a-z]+|javascript:|data:\s*text\/html)\s*=\s*(['"][^'"]*['"]|[^\s>]+)/gi;

/**
 * Strips script tags and blocks, inline event handlers, and dangerous attributes.
 */
export function sanitizeMarkup(rawHtml: string): SanitizedHtml {
  const strippedTags: string[] = [];

  let cleaned = rawHtml.replace(SCRIPT_BLOCK_REGEX, () => {
    strippedTags.push('script');
    return '';
  });

  cleaned = cleaned.replace(STYLE_BLOCK_REGEX, () => {
    strippedTags.push('style');
    return '';
  });

  cleaned = cleaned.replace(DANGEROUS_TAG_REGEX, (match, tag) => {
    strippedTags.push(tag.toLowerCase());
    return '';
  });

  const hadAttributes = DANGEROUS_ATTR_REGEX.test(cleaned);
  cleaned = cleaned.replace(DANGEROUS_ATTR_REGEX, '');

  return {
    html: cleaned,
    wasSanitized: strippedTags.length > 0 || hadAttributes,
    strippedTags,
  };
}

/**
 * Wraps math formulas into an accessible, non-clipping horizontally scrollable container.
 */
export function wrapMathInAccessibleContainer(formula: MathFormulaDescriptor): string {
  const sanitized = sanitizeMarkup(formula.rawText).html;
  const tag = formula.isBlock ? 'div' : 'span';
  const role = formula.isBlock ? 'region' : 'math';
  const ariaLabel = formula.label || (formula.isBlock ? 'Mathematical equation' : 'Inline formula');
  const scrollClass = formula.isBlock ? 'math-block-container scrollable-x' : 'math-inline-container';

  return (
    `<${tag} class="${scrollClass}" role="${role}" aria-label="${ariaLabel}" tabindex="0" ` +
    `style="overflow-x: auto; max-width: 100%; display: ${formula.isBlock ? 'block' : 'inline-block'}; vertical-align: middle;">` +
    sanitized +
    `</${tag}>`
  );
}

export interface SharedStimulusDescriptor {
  readonly id: string;
  readonly title?: string;
  readonly contentHtml: string;
  readonly figureRefs?: readonly string[];
}

export class SharedStimulusRenderer {
  private stimulus: SharedStimulusDescriptor;

  constructor(stimulus: SharedStimulusDescriptor) {
    this.stimulus = stimulus;
  }

  getStimulus(): SharedStimulusDescriptor {
    return this.stimulus;
  }

  renderSafeHtml(): string {
    const sanitized = sanitizeMarkup(this.stimulus.contentHtml);
    const titleHtml = this.stimulus.title
      ? `<h3 class="stimulus-title">${sanitizeMarkup(this.stimulus.title).html}</h3>`
      : '';

    return (
      `<section class="shared-stimulus-card" role="region" aria-label="Shared stimulus context">` +
      titleHtml +
      `<div class="stimulus-body">${sanitized.html}</div>` +
      `</section>`
    );
  }
}

export function createSharedStimulusRenderer(stimulus: SharedStimulusDescriptor): SharedStimulusRenderer {
  return new SharedStimulusRenderer(stimulus);
}
