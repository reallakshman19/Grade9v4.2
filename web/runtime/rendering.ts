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

// Permit only inert, attribute-free formatting and safe MathML tags. All other tokens are removed;
// unmatched '<' is escaped so malformed markup cannot create a browser element.
const SAFE_TAG = /^<\/?(?:p|em|strong|b|i|sub|sup|br|ul|ol|li|span|div|pre|code|table|thead|tbody|tr|td|th|blockquote|h3|h4|math|mrow|mi|mn|mo|msup|msub|msubsup|mfrac|msqrt|mroot|mtext|mstyle|mspace)>$/i;
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
 * Formats a LaTeX mathematical expression into high-fidelity MathML.
 */
export function formatLatexMath(latex: string, isBlock: boolean = false): string {
  let s = latex.trim();
  if (!s) return '';

  // Greek replacements
  const greekMap: Record<string, string> = {
    '\\alpha': 'α', '\\beta': 'β', '\\gamma': 'γ', '\\delta': 'δ', '\\epsilon': 'ε',
    '\\zeta': 'ζ', '\\eta': 'η', '\\theta': 'θ', '\\iota': 'ι', '\\kappa': 'κ',
    '\\lambda': 'λ', '\\mu': 'μ', '\\nu': 'ν', '\\xi': 'ξ', '\\pi': 'π',
    '\\rho': 'ρ', '\\sigma': 'σ', '\\tau': 'τ', '\\upsilon': 'υ', '\\phi': 'φ',
    '\\chi': 'χ', '\\psi': 'ψ', '\\omega': 'ω',
    '\\Gamma': 'Γ', '\\Delta': 'Δ', '\\Theta': 'Θ', '\\Lambda': 'Λ',
    '\\Xi': 'Ξ', '\\Pi': 'Π', '\\Sigma': 'Σ', '\\Upsilon': 'Υ',
    '\\Phi': 'Φ', '\\Psi': 'Ψ', '\\Omega': 'Ω'
  };
  for (const [k, v] of Object.entries(greekMap)) {
    s = s.replaceAll(k, v);
  }

  // Symbol replacements
  const symMap: Record<string, string> = {
    '\\times': '×', '\\div': '÷', '\\pm': '±', '\\mp': '∓', '\\cdot': '·',
    '\\leq': '≤', '\\geq': '≥', '\\neq': '≠', '\\ne': '≠',
    '\\approx': '≈', '\\equiv': '≡', '\\sim': '∼', '\\cong': '≅',
    '\\propto': '∝', '\\infty': '∞', '\\in': '∈', '\\notin': '∉',
    '\\subset': '⊂', '\\subseteq': '⊆', '\\cup': '∪', '\\cap': '∩',
    '\\emptyset': '∅', '\\forall': '∀', '\\exists': '∃',
    '\\partial': '∂', '\\nabla': '∇', '\\int': '∫', '\\oint': '∮',
    '\\sum': '∑', '\\prod': '∏',
    '\\circ': '°', '\\angle': '∠', '\\triangle': '△',
    '\\perp': '⊥', '\\parallel': '∥',
    '\\rightarrow': '→', '\\to': '→', '\\leftarrow': '←', '\\leftrightarrow': '↔',
    '\\Rightarrow': '⇒', '\\implies': '⇒', '\\Leftarrow': '⇐', '\\Leftrightarrow': '⇔', '\\iff': '⇔',
    '\\quad': '  ', '\\qquad': '    ', '\\,': ' ', '\\;': ' ', '\\ ': ' '
  };
  for (const [k, v] of Object.entries(symMap)) {
    s = s.replaceAll(k, v);
  }

  // Handle \text{...} and \mathrm{...} with protected placeholders to prevent tag nesting
  const textBlocks: string[] = [];
  s = s.replace(/\\text\{([^{}]+)\}/g, (_m, t) => {
    const idx = textBlocks.length;
    textBlocks.push(`<mtext>${t}</mtext>`);
    return `___MTEXT_${idx}___`;
  });
  s = s.replace(/\\mathrm\{([^{}]+)\}/g, (_m, t) => {
    const idx = textBlocks.length;
    textBlocks.push(`<mtext>${t}</mtext>`);
    return `___MTEXT_${idx}___`;
  });

  // Recursive parsing for expressions
  function parseExpr(expr: string): string {
    let str = expr.trim();
    if (!str) return '';

    // Handle fractions
    while (/\\frac\{([^{}]+)\}\{([^{}]+)\}/.test(str)) {
      str = str.replace(/\\frac\{([^{}]+)\}\{([^{}]+)\}/g, (_m, n, d) => {
        return `<mfrac><mrow>${parseExpr(n)}</mrow><mrow>${parseExpr(d)}</mrow></mfrac>`;
      });
    }

    // Handle roots
    while (/\\sqrt\{([^{}]+)\}/.test(str)) {
      str = str.replace(/\\sqrt\{([^{}]+)\}/g, (_m, arg) => {
        return `<msqrt><mrow>${parseExpr(arg)}</mrow></msqrt>`;
      });
    }

    // Handle sub and sup combinations: x_{a}^{b} or x^{b}_{a}
    str = str.replace(/([0-9a-zA-Z\u0370-\u03ff]+|\)|>)\^\{([^{}]+)\}_\{([^{}]+)\}/g, (_m, base, sup, sub) => {
      return `<msubsup><mrow>${parseExpr(base)}</mrow><mrow>${parseExpr(sub)}</mrow><mrow>${parseExpr(sup)}</mrow></msubsup>`;
    });
    str = str.replace(/([0-9a-zA-Z\u0370-\u03ff]+|\)|>)_\{([^{}]+)\}\^\{([^{}]+)\}/g, (_m, base, sub, sup) => {
      return `<msubsup><mrow>${parseExpr(base)}</mrow><mrow>${parseExpr(sub)}</mrow><mrow>${parseExpr(sup)}</mrow></msubsup>`;
    });

    // Handle superscripts: base^{exp} or base^exp
    str = str.replace(/([0-9a-zA-Z\u0370-\u03ff°]+|\)|>)\^\{([^{}]+)\}/g, (_m, base, exp) => {
      return `<msup><mrow>${parseExpr(base)}</mrow><mrow>${parseExpr(exp)}</mrow></msup>`;
    });
    str = str.replace(/([0-9a-zA-Z\u0370-\u03ff°]+|\)|>)\^([0-9a-zA-Z\u0370-\u03ff°])/g, (_m, base, exp) => {
      return `<msup><mrow>${parseExpr(base)}</mrow><mrow>${parseExpr(exp)}</mrow></msup>`;
    });

    // Handle subscripts: base_{sub} or base_sub
    str = str.replace(/([0-9a-zA-Z\u0370-\u03ff]+|\)|>)_\{([^{}]+)\}/g, (_m, base, sub) => {
      return `<msub><mrow>${parseExpr(base)}</mrow><mrow>${parseExpr(sub)}</mrow></msub>`;
    });
    str = str.replace(/([0-9a-zA-Z\u0370-\u03ff]+|\)|>)_([0-9a-zA-Z\u0370-\u03ff])/g, (_m, base, sub) => {
      return `<msub><mrow>${parseExpr(base)}</mrow><mrow>${parseExpr(sub)}</mrow></msub>`;
    });

    // Remove any remaining backslashes
    str = str.replace(/\\/g, '');

    // Tokenize non-tag parts into proper MathML tokens
    const segments = str.split(/(<[^>]+>)/g);
    let out = '';
    for (const seg of segments) {
      if (!seg) continue;
      if (seg.startsWith('<') && seg.endsWith('>')) {
        out += seg;
      } else {
        const tokens = seg.match(/[0-9]+(?:\.[0-9]+)?|___MTEXT_[0-9]+___|[a-zA-Z]+|[=+\-×÷±∓·≤≥≠≈≡∼≅∝∞°∠△⊥∥→←↔⇒⇐⇔∂∇∫∮∑∏()\[\],;:|]|[\u0370-\u03ff]|\s+/g) || [seg];
        for (const tok of tokens) {
          if (/^___MTEXT_[0-9]+___$/.test(tok)) {
            out += tok;
          } else if (/^\s+$/.test(tok)) {
            out += '<mspace width="0.22em"></mspace>';
          } else if (/^[0-9]+(?:\.[0-9]+)?$/.test(tok)) {
            out += `<mn>${tok}</mn>`;
          } else if (/^[a-zA-Z\u0370-\u03ff]+$/.test(tok)) {
            out += `<mi>${tok}</mi>`;
          } else if (/^[=+\-×÷±∓·≤≥≠≈≡∼≅∝∞°∠△⊥∥→←↔⇒⇐⇔∂∇∫∮∑∏()\[\],;:|]$/.test(tok)) {
            out += `<mo>${tok}</mo>`;
          } else {
            out += `<mtext>${tok}</mtext>`;
          }
        }
      }
    }
    return out;
  }

  let finalBody = parseExpr(s);
  for (let i = 0; i < textBlocks.length; i++) {
    finalBody = finalBody.replaceAll(`___MTEXT_${i}___`, textBlocks[i]);
  }
  const display = isBlock ? 'block' : 'inline';
  return `<math xmlns="http://www.w3.org/1998/Math/MathML" display="${display}" class="g9-math">${finalBody}</math>`;
}

/**
 * Universal math parser: scans string for LaTeX delimiters ($...$, $$...$$, \(...\), \[...\])
 * and replaces them with accessible, beautifully formatted MathML.
 */
export function renderMathHtml(content: string): string {
  if (!content) return '';
  if (!content.includes('$') && !content.includes('\\(') && !content.includes('\\[')) {
    return content;
  }

  // 1. Display math: $$...$$ or \[...\]
  let result = content.replace(/\$\$([\s\S]*?)\$\$/g, (_m, tex) => {
    return `<div class="math-block-container scrollable-x" role="region" aria-label="Mathematical formula" tabindex="0" style="overflow-x:auto;max-width:100%;margin:0.5rem 0;display:block;">${formatLatexMath(tex, true)}</div>`;
  });
  result = result.replace(/\\\[([\s\S]*?)\\\]/g, (_m, tex) => {
    return `<div class="math-block-container scrollable-x" role="region" aria-label="Mathematical formula" tabindex="0" style="overflow-x:auto;max-width:100%;margin:0.5rem 0;display:block;">${formatLatexMath(tex, true)}</div>`;
  });

  // 2. Inline math: $...$ or \(...\)
  result = result.replace(/\$([^\$\n\r]+?)\$/g, (_m, tex) => {
    return `<span class="math-inline-container" role="math" aria-label="${escapeHtml(tex.trim())}" style="display:inline-block;vertical-align:middle;">${formatLatexMath(tex, false)}</span>`;
  });
  result = result.replace(/\\\(([\s\S]*?)\\\)/g, (_m, tex) => {
    return `<span class="math-inline-container" role="math" aria-label="${escapeHtml(tex.trim())}" style="display:inline-block;vertical-align:middle;">${formatLatexMath(tex, false)}</span>`;
  });

  return result;
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

  const mathml = formatLatexMath(sanitized, formula.isBlock);

  return (
    `<${tag} class="${scrollClass}" role="${role}" aria-label="${escapeHtml(ariaLabel)}" tabindex="0" ` +
    `style="overflow-x: auto; max-width: 100%; display: ${formula.isBlock ? 'block' : 'inline-block'}; vertical-align: middle;">` +
    mathml +
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
