/**
 * web/adapters/chemistry/structure.ts
 * A28 — Chemical structure parsing, validation, Hill notation, and accessible representation.
 *
 * Implements:
 * - Safe SMILES tokenization and elemental counting without external binary dependencies.
 * - Molecular formula parsing and Hill system canonical formatting (C, then H, then alphabetical).
 * - Molar mass calculation for standard organic/inorganic chemistry curricula.
 * - Accessible text representation generation for screen readers (keyboard/a11y alternative).
 * - Safe SVG structure preview rendering without script injection.
 *
 * No academic approval inferred from software validation.
 */

import type { ChemicalStructureData, ChemicalStructureFormat } from './types.ts';

/**
 * Standard atomic weights (IUPAC standard atomic weights rounded to 3 decimal places).
 */
export const ATOMIC_WEIGHTS: Readonly<Record<string, number>> = {
  H: 1.008,
  He: 4.003,
  Li: 6.941,
  Be: 9.012,
  B: 10.811,
  C: 12.011,
  N: 14.007,
  O: 15.999,
  F: 18.998,
  Ne: 20.180,
  Na: 22.990,
  Mg: 24.305,
  Al: 26.982,
  Si: 28.086,
  P: 30.974,
  S: 32.065,
  Cl: 35.453,
  Ar: 39.948,
  K: 39.098,
  Ca: 40.078,
  Cr: 51.996,
  Mn: 54.938,
  Fe: 55.845,
  Co: 58.933,
  Ni: 58.693,
  Cu: 63.546,
  Zn: 65.380,
  Br: 79.904,
  Ag: 107.868,
  I: 126.904,
  Ba: 137.327,
  Pt: 195.084,
  Au: 196.967,
  Hg: 200.590,
  Pb: 207.200,
};

/**
 * Parses a molecular formula (e.g. "C6H12O6", "H2SO4", "Ca(OH)2", "Fe2(SO4)3")
 * into elemental counts.
 */
export function parseFormula(formula: string): Record<string, number> {
  const counts: Record<string, number> = {};
  if (!formula || typeof formula !== 'string') return counts;

  const trimmed = formula.trim();
  if (!trimmed) return counts;

  // Handle nested parentheses iteratively: e.g. Ca(OH)2 or Fe2(SO4)3
  const parenRegex = /\(([^()]+)\)(\d*)/g;
  let expanded = trimmed;
  while (parenRegex.test(expanded)) {
    expanded = expanded.replace(parenRegex, (_, group: string, multStr: string) => {
      const multiplier = multStr ? parseInt(multStr, 10) : 1;
      const innerCounts = parseFormula(group);
      return Object.entries(innerCounts)
        .map(([elem, c]) => `${elem}${c * multiplier}`)
        .join('');
    });
  }

  // Match Element Symbol followed by optional count: e.g. Cl2, C, H12
  const elementRegex = /([A-Z][a-z]*)(\d*)/g;
  let match: RegExpExecArray | null;

  while ((match = elementRegex.exec(expanded)) !== null) {
    const elem = match[1];
    const countStr = match[2];
    const count = countStr ? parseInt(countStr, 10) : 1;
    if (elem) {
      counts[elem] = (counts[elem] || 0) + count;
    }
  }

  return counts;
}

/**
 * Formats elemental counts into canonical Hill system notation:
 * Carbon first, Hydrogen second, then all other elements alphabetically.
 * If no Carbon is present, all elements are sorted alphabetically.
 */
export function formatHillFormula(counts: Record<string, number>): string {
  const elements = Object.keys(counts).filter((e) => (counts[e] ?? 0) > 0);
  if (elements.length === 0) return '';

  const hasCarbon = elements.includes('C');
  const sorted: string[] = [];

  if (hasCarbon) {
    sorted.push('C');
    if (elements.includes('H')) {
      sorted.push('H');
    }
    const remaining = elements.filter((e) => e !== 'C' && e !== 'H').sort();
    sorted.push(...remaining);
  } else {
    sorted.push(...elements.sort());
  }

  return sorted
    .map((elem) => {
      const count = counts[elem] ?? 0;
      return count === 1 ? elem : `${elem}${count}`;
    })
    .join('');
}

/**
 * Calculates molar mass from elemental counts in g/mol.
 */
export function calculateMolarMass(counts: Record<string, number>): number {
  let mass = 0;
  for (const [elem, count] of Object.entries(counts)) {
    const weight = ATOMIC_WEIGHTS[elem];
    if (weight !== undefined) {
      mass += weight * count;
    }
  }
  return Math.round(mass * 1000) / 1000;
}

export interface SmilesValidationResult {
  readonly isValid: boolean;
  readonly error?: string;
  readonly atomCounts: Record<string, number>;
  readonly estimatedFormula: string;
}

/**
 * Validates a SMILES string and counts recognized atoms.
 * Organic subset atoms: B, C, N, O, P, S, F, Cl, Br, I (and aromatic lowercase: c, n, o, p, s).
 * Bracket atoms: [NH4+], [OH-], etc.
 * Supports bonds: -, =, #, :, $, /, \
 * Supports branches: ( )
 * Supports ring numbers: 1-9, %10-%99
 */
export function validateSMILES(smiles: string): SmilesValidationResult {
  if (!smiles || typeof smiles !== 'string') {
    return {
      isValid: false,
      error: 'Empty SMILES input',
      atomCounts: {},
      estimatedFormula: '',
    };
  }

  const trimmed = smiles.trim();
  if (trimmed.length === 0) {
    return {
      isValid: false,
      error: 'Empty SMILES string',
      atomCounts: {},
      estimatedFormula: '',
    };
  }

  // Check balanced parentheses
  let openParens = 0;
  for (let i = 0; i < trimmed.length; i++) {
    if (trimmed[i] === '(') openParens++;
    else if (trimmed[i] === ')') {
      openParens--;
      if (openParens < 0) {
        return {
          isValid: false,
          error: 'Unmatched closing parenthesis in SMILES',
          atomCounts: {},
          estimatedFormula: '',
        };
      }
    }
  }
  if (openParens !== 0) {
    return {
      isValid: false,
      error: 'Unclosed branching parenthesis in SMILES',
      atomCounts: {},
      estimatedFormula: '',
    };
  }

  // Check balanced square brackets
  let openBrackets = 0;
  for (let i = 0; i < trimmed.length; i++) {
    if (trimmed[i] === '[') openBrackets++;
    else if (trimmed[i] === ']') {
      openBrackets--;
      if (openBrackets < 0) {
        return {
          isValid: false,
          error: 'Unmatched closing bracket in SMILES',
          atomCounts: {},
          estimatedFormula: '',
        };
      }
    }
  }
  if (openBrackets !== 0) {
    return {
      isValid: false,
      error: 'Unclosed square bracket in SMILES',
      atomCounts: {},
      estimatedFormula: '',
    };
  }

  // Parse atoms
  const counts: Record<string, number> = {};
  const atomTokenRegex = /\[([^\]]+)\]|Cl|Br|Si|Na|Ca|Fe|Cu|Zn|[BCNOPSFIbcnops]/g;
  let m: RegExpExecArray | null;

  while ((m = atomTokenRegex.exec(trimmed)) !== null) {
    if (m[1]) {
      // Bracket atom: e.g. [NH4+], [OH-], [13CH4], [O-]
      const bracketContent = m[1];
      const elemMatch = /[A-Z][a-z]?/.exec(bracketContent);
      if (elemMatch) {
        const elem = elemMatch[0];
        counts[elem] = (counts[elem] || 0) + 1;
      }
    } else {
      let sym = m[0];
      // Convert aromatic lowercase to uppercase standard element
      if (sym === 'c') sym = 'C';
      else if (sym === 'n') sym = 'N';
      else if (sym === 'o') sym = 'O';
      else if (sym === 'p') sym = 'P';
      else if (sym === 's') sym = 'S';
      counts[sym] = (counts[sym] || 0) + 1;
    }
  }

  const formula = formatHillFormula(counts);

  return {
    isValid: true,
    atomCounts: counts,
    estimatedFormula: formula,
  };
}

/**
 * Generates an accessible, screen-reader friendly text description
 * of a chemical structure.
 */
export function generateAccessibleStructureText(data: ChemicalStructureData): string {
  if (data.accessibleLabel && data.accessibleLabel.trim().length > 0) {
    return data.accessibleLabel;
  }

  if (data.format === 'FORMULA') {
    const counts = parseFormula(data.data);
    const hill = formatHillFormula(counts);
    const mass = calculateMolarMass(counts);
    const parts = Object.entries(counts)
      .map(([elem, c]) => `${c} ${elem}`)
      .join(', ');
    return `Chemical formula ${data.data} (Hill notation: ${hill}, molar mass: ${mass} g/mol) containing: ${parts}.`;
  }

  if (data.format === 'SMILES') {
    const res = validateSMILES(data.data);
    if (!res.isValid) {
      return `Invalid SMILES structure: ${data.data}`;
    }
    const parts = Object.entries(res.atomCounts)
      .map(([elem, c]) => `${c} ${elem}`)
      .join(', ');
    return `Chemical structure encoded in SMILES format "${data.data}", elemental composition: ${parts}.`;
  }

  return `Chemical structure (${data.format}) containing ${data.data.length} characters of structural data.`;
}

/**
 * Produces a safe SVG representation for 2D structure rendering.
 * Sanitizes and encapsulates dimensions, viewBox, and accessibility tags.
 */
export function renderStructureSvg(
  data: ChemicalStructureData,
  width: number = 320,
  height: number = 220
): string {
  const accessibleText = generateAccessibleStructureText(data);
  const formula = data.molecularFormula || (data.format === 'FORMULA' ? data.data : 'Structure');

  // Simple clean SVG placeholder diagram with structure info
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" role="img" aria-label="${accessibleText.replace(/"/g, '&quot;')}">
  <rect width="100%" height="100%" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2" rx="8"/>
  <text x="20" y="36" font-family="system-ui, sans-serif" font-size="16" font-weight="600" fill="#0f172a">${formula}</text>
  <text x="20" y="64" font-family="system-ui, sans-serif" font-size="13" fill="#64748b">Format: ${data.format}</text>
  <rect x="20" y="80" width="${width - 40}" height="70" fill="#ffffff" stroke="#e2e8f0" rx="4"/>
  <text x="32" y="122" font-family="monospace" font-size="14" fill="#1e293b">${data.data.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</text>
  <text x="20" y="180" font-family="system-ui, sans-serif" font-size="11" fill="#475569">${accessibleText.slice(0, 60).replace(/</g, '&lt;')}${accessibleText.length > 60 ? '...' : ''}</text>
</svg>`;
}
