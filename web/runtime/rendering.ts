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

  // 1. If KaTeX is available in the global browser environment, use it for production typography
  if (typeof window !== 'undefined' && (window as any).katex?.renderToString) {
    try {
      return (window as any).katex.renderToString(s, {
        throwOnError: false,
        displayMode: isBlock,
        strict: false
      });
    } catch {
      // Fall through to native MathML fallback
    }
  }

  const nodes: string[] = [];
  function saveNode(html: string): string {
    const idx = nodes.length;
    nodes.push(html);
    return `§N${idx}§`;
  }

  // Handle \text{...} and \mathrm{...}
  s = s.replace(/\\(?:text|mathrm)\{([^{}]+)\}/g, (_m, t) => {
    return saveNode(`<mtext>${t}</mtext>`);
  });

  // Math functions (upright operators)
  s = s.replace(/\\(cos|sin|tan|sec|csc|cot|ln|log|exp|det|lim|max|min)\b/g, (_m, fn) => {
    return saveNode(`<mo>${fn}</mo>`);
  });

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

  // Vector notation: \vec{x}
  while (/\\vec\{([^{}]+)\}/.test(s)) {
    s = s.replace(/\\vec\{([^{}]+)\}/g, (_m, arg) => {
      return saveNode(`<mover><mrow>${parseExpr(arg)}</mrow><mo>→</mo></mover>`);
    });
  }

  // Recursive parsing for expressions
  function parseExpr(expr: string): string {
    let str = expr.trim();
    if (!str) return '';

    // Handle fractions
    while (/\\frac\{([^{}]+)\}\{([^{}]+)\}/.test(str)) {
      str = str.replace(/\\frac\{([^{}]+)\}\{([^{}]+)\}/g, (_m, n, d) => {
        return saveNode(`<mfrac><mrow>${parseExpr(n)}</mrow><mrow>${parseExpr(d)}</mrow></mfrac>`);
      });
    }

    // Handle roots
    while (/\\sqrt\{([^{}]+)\}/.test(str)) {
      str = str.replace(/\\sqrt\{([^{}]+)\}/g, (_m, arg) => {
        return saveNode(`<msqrt><mrow>${parseExpr(arg)}</mrow></msqrt>`);
      });
    }

    // Handle sub and sup combinations: x_{a}^{b} or x^{b}_{a}
    const tokenRegexStr = '§N[0-9]+§|[0-9a-zA-Z\\u0370-\\u03ff°]+|\\)';
    const subSupCombined = new RegExp(`(${tokenRegexStr})\\^\\{([^{}]+)\\}_\\{([^{}]+)\\}`, 'g');
    str = str.replace(subSupCombined, (_m, base, sup, sub) => {
      return saveNode(`<msubsup><mrow>${parseExpr(base)}</mrow><mrow>${parseExpr(sub)}</mrow><mrow>${parseExpr(sup)}</mrow></msubsup>`);
    });
    const supSubCombined = new RegExp(`(${tokenRegexStr})_\\{([^{}]+)\\}\\^\\{([^{}]+)\\}`, 'g');
    str = str.replace(supSubCombined, (_m, base, sub, sup) => {
      return saveNode(`<msubsup><mrow>${parseExpr(base)}</mrow><mrow>${parseExpr(sub)}</mrow><mrow>${parseExpr(sup)}</mrow></msubsup>`);
    });

    // Handle superscripts: base^{exp} or base^exp
    const supBraced = new RegExp(`(${tokenRegexStr})\\^\\{([^{}]+)\\}`, 'g');
    str = str.replace(supBraced, (_m, base, exp) => {
      return saveNode(`<msup><mrow>${parseExpr(base)}</mrow><mrow>${parseExpr(exp)}</mrow></msup>`);
    });
    const supBare = new RegExp(`(${tokenRegexStr})\\^([0-9a-zA-Z\\u0370-\\u03ff°])`, 'g');
    str = str.replace(supBare, (_m, base, exp) => {
      return saveNode(`<msup><mrow>${parseExpr(base)}</mrow><mrow>${parseExpr(exp)}</mrow></msup>`);
    });

    // Handle subscripts: base_{sub} or base_sub
    const subBraced = new RegExp(`(${tokenRegexStr})_\\{([^{}]+)\\}`, 'g');
    str = str.replace(subBraced, (_m, base, sub) => {
      return saveNode(`<msub><mrow>${parseExpr(base)}</mrow><mrow>${parseExpr(sub)}</mrow></msub>`);
    });
    const subBare = new RegExp(`(${tokenRegexStr})_([0-9a-zA-Z\\u0370-\\u03ff])`, 'g');
    str = str.replace(subBare, (_m, base, sub) => {
      return saveNode(`<msub><mrow>${parseExpr(base)}</mrow><mrow>${parseExpr(sub)}</mrow></msub>`);
    });

    // Remove any remaining backslashes
    str = str.replace(/\\/g, '');

    // Tokenize non-tag parts into proper MathML tokens
    const tokens = str.match(/§N[0-9]+§|[0-9]+(?:\.[0-9]+)?|[a-zA-Z]+|[=+\-×÷±∓·≤≥≠≈≡∼≅∝∞°∠△⊥∥→←↔⇒⇐⇔∂∇∫∮∑∏()\[\],;:|]|[\u0370-\u03ff]|\s+/g) || [str];
    let out = '';
    for (const tok of tokens) {
      if (/^§N[0-9]+§$/.test(tok)) {
        out += tok;
      } else if (/^\s+$/.test(tok)) {
        out += '<mspace width="0.22em"></mspace>';
      } else if (/^[0-9]+(?:\.[0-9]+)?$/.test(tok)) {
        out += `<mn>${tok}</mn>`;
      } else if (/^[a-zA-Z\u0370-\u03ff]+$/.test(tok)) {
        for (const char of tok) {
          out += `<mi>${char}</mi>`;
        }
      } else if (/^[=+\-×÷±∓·≤≥≠≈≡∼≅∝∞°∠△⊥∥→←↔⇒⇐⇔∂∇∫∮∑∏()\[\],;:|]$/.test(tok)) {
        out += `<mo>${tok}</mo>`;
      } else {
        out += `<mtext>${tok}</mtext>`;
      }
    }
    return out;
  }

  let finalBody = parseExpr(s);
  let guard = 0;
  while (/§N[0-9]+§/.test(finalBody) && guard++ < 50) {
    finalBody = finalBody.replace(/§N([0-9]+)§/g, (_m, id) => nodes[Number(id)] ?? '');
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
      ? `<h3 class="stimulus-title">${renderMathHtml(sanitizeMarkup(this.stimulus.title).html)}</h3>`
      : '';

    return (
      `<section class="shared-stimulus-card" role="region" aria-label="Shared stimulus context">` +
      titleHtml +
      `<div class="stimulus-body">${renderMathHtml(sanitized.html)}</div>` +
      `</section>`
    );
  }
}

export function createSharedStimulusRenderer(stimulus: SharedStimulusDescriptor): SharedStimulusRenderer {
  return new SharedStimulusRenderer(stimulus);
}
