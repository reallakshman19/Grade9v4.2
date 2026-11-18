/**
 * web/adapters/mathematics/symbolic.ts
 * A27 — Safe symbolic algebra tokenizer, expression validator, and normalizer.
 *
 * Enforces:
 * - Zero use of eval() or dynamic code execution.
 * - Parenthesis and bracket balance validation.
 * - Algebraic tokenization and normalization.
 *
 * No academic approval inferred from software validation.
 */

import type { SymbolicExpressionValue } from './types.ts';

const VALID_IDENTIFIER_REGEX = /^[a-zA-Z][a-zA-Z0-9_]*$/;
const ALLOWED_OPERATORS = new Set(['+', '-', '*', '/', '^', '=', '<', '>', '<=', '>=', '!=', '(', ')', '[', ']', '{', '}']);

export function tokenizeExpression(raw: string): readonly string[] {
  const tokens: string[] = [];
  let i = 0;
  const s = raw.trim();

  while (i < s.length) {
    const ch = s[i];

    if (/\s/.test(ch)) {
      i++;
      continue;
    }

    // Two-character operators
    if (i + 1 < s.length) {
      const two = s.slice(i, i + 2);
      if (ALLOWED_OPERATORS.has(two)) {
        tokens.push(two);
        i += 2;
        continue;
      }
    }

    // Single-character operator
    if (ALLOWED_OPERATORS.has(ch)) {
      tokens.push(ch);
      i++;
      continue;
    }

    // Numbers (integer or decimal)
    if (/[0-9]/.test(ch)) {
      let num = '';
      while (i < s.length && /[0-9.]/.test(s[i])) {
        num += s[i];
        i++;
      }
      tokens.push(num);
      continue;
    }

    // Identifiers / variables (e.g. x, alpha, theta, sin, cos)
    if (/[a-zA-Z_]/.test(ch)) {
      let id = '';
      while (i < s.length && /[a-zA-Z0-9_]/.test(s[i])) {
        id += s[i];
        i++;
      }
      tokens.push(id);
      continue;
    }

    // LaTeX backslash commands (e.g. \alpha, \frac)
    if (ch === '\\') {
      let cmd = '\\';
      i++;
      while (i < s.length && /[a-zA-Z]/.test(s[i])) {
        cmd += s[i];
        i++;
      }
      tokens.push(cmd);
      continue;
    }

    // Unrecognized character
    tokens.push(ch);
    i++;
  }

  return tokens;
}

export function validateParentheses(tokens: readonly string[]): boolean {
  const stack: string[] = [];
  const pairs: Record<string, string> = { ')': '(', ']': '[', '}': '{' };

  for (const t of tokens) {
    if (t === '(' || t === '[' || t === '{') {
      stack.push(t);
    } else if (t === ')' || t === ']' || t === '}') {
      if (stack.length === 0 || stack.pop() !== pairs[t]) {
        return false;
      }
    }
  }

  return stack.length === 0;
}

export function parseSymbolicExpression(rawInput: string): SymbolicExpressionValue {
  const trimmed = rawInput.trim();
  if (trimmed === '') {
    return {
      rawInput,
      normalized: '',
      variables: [],
      isValid: false,
      error: 'Empty expression.',
    };
  }

  const tokens = tokenizeExpression(trimmed);

  if (!validateParentheses(tokens)) {
    return {
      rawInput,
      normalized: trimmed,
      variables: [],
      isValid: false,
      error: 'Unbalanced parentheses or brackets.',
    };
  }

  const variables = new Set<string>();
  const knownKeywords = new Set(['sin', 'cos', 'tan', 'log', 'ln', 'sqrt', 'exp', '\\frac', '\\sqrt', '\\alpha', '\\beta', '\\pi', '\\theta']);

  for (const t of tokens) {
    if (VALID_IDENTIFIER_REGEX.test(t) && !knownKeywords.has(t)) {
      variables.add(t);
    }
  }

  // Normalize: join with single spaces, normalizing operators
  const normalized = tokens.join(' ');

  return {
    rawInput,
    normalized,
    variables: Array.from(variables).sort(),
    isValid: true,
  };
}
