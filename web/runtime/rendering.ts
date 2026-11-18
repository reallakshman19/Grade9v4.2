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

// Permit only inert, attribute-free formatting. All other tokens are removed;
// unmatched '<' is escaped so malformed markup cannot create a browser element.
const SAFE_TAG = /^<\/?(?:p|em|strong|b|i|sub|sup|br|ul|ol|li|span|div|pre|code|table|thead|tbody|tr|td|th|blockquote|h3|h4)>$/i;
export function escapeHtml(value: string): string {
  return value.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
}
export function sanitizeMarkup(rawHtml: string): SanitizedHtml {
  const strippedTags: string[] = [];
  const stripped = rawHtml.replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1\s*>/gi,(_m,tag:string)=>{strippedTags.push(tag.toLowerCase());return '';});
  let cursor=0, html='';
  for (const match of stripped.matchAll(/<[^>]*>/g)) {
    const index=match.index!;
    html+=stripped.slice(cursor,index).replace(/</g,'&lt;');
    const token=match[0];
    if (SAFE_TAG.test(token)) html+=token;
    else strippedTags.push((/^<\/?\s*([a-z0-9-]+)/i.exec(token)?.[1]??'markup').toLowerCase());
    cursor=index+token.length;
  }
  html+=stripped.slice(cursor).replace(/</g,'&lt;');
  return {html,wasSanitized:html!==rawHtml,strippedTags};
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
    `<${tag} class="${scrollClass}" role="${role}" aria-label="${escapeHtml(ariaLabel)}" tabindex="0" ` +
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
    this.stimulus = Object.freeze({...stimulus,figureRefs:stimulus.figureRefs ? Object.freeze([...stimulus.figureRefs]) : undefined});
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
