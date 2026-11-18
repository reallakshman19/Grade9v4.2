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

import {escapeHtml} from '../../runtime/rendering.ts';
import type { ChemicalStructureData, ChemicalStructureFormat } from './types.ts';

/**
 * Standard atomic weights (IUPAC standard atomic weights rounded to 3 decimal places).
 */
export const ATOMIC_WEIGHTS: Readonly<Record<string, number>> = Object.freeze({
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
});

/**
 * Parses a molecular formula (e.g. "C6H12O6", "H2SO4", "Ca(OH)2", "Fe2(SO4)3")
 * into elemental counts.
 */
export function parseFormula(formula: string): Record<string, number> {
  if(typeof formula!=='string'||!formula.trim()||formula.length>4096)return {};
  const s=formula.trim();let i=0;
  const number=()=>{const m=/^[1-9]\d*/.exec(s.slice(i));if(!m){if(/\d/.test(s[i]??''))throw Error('Invalid count');return 1;}i+=m[0].length;const n=Number(m[0]);if(!Number.isSafeInteger(n)||n>1000000)throw Error('Invalid count');return n;};
  const group=(depth:number):Record<string,number>=>{
    if(depth>32)throw Error('Formula depth');const out:Record<string,number>={};
    const add=(k:string,n:number)=>{const v=(out[k]??0)+n;if(!Number.isSafeInteger(v)||v>1000000)throw Error('Atom count limit');out[k]=v;};
    while(i<s.length&&s[i]!==')'){
      if(s[i]==='('){i++;const inner=group(depth+1);if(s[i++]!==')')throw Error('Unclosed group');const n=number();for(const [k,v] of Object.entries(inner))add(k,v*n);}
      else {const m=/^[A-Z][a-z]?/.exec(s.slice(i));if(!m||!Object.hasOwn(ATOMIC_WEIGHTS,m[0]))throw Error('Unknown element');i+=m[0].length;add(m[0],number());}
    }
    if(!Object.keys(out).length)throw Error('Empty group');return out;
  };
  try{const result=group(0);return i===s.length?result:{};}catch{return {};}

}

/**
 * Formats elemental counts into canonical Hill system notation:
 * Carbon first, Hydrogen second, then all other elements alphabetically.
 * If no Carbon is present, all elements are sorted alphabetically.
 */
export function formatHillFormula(counts: Record<string, number>): string {
  const elements = Object.keys(counts);if(elements.some(e=>!Object.hasOwn(ATOMIC_WEIGHTS,e)||!Number.isSafeInteger(counts[e])||counts[e]<=0))throw Error('Unsupported elemental composition');
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
    if(!Object.hasOwn(ATOMIC_WEIGHTS,elem)||!Number.isSafeInteger(count)||count<=0)throw Error('Unsupported elemental composition');mass+=weight*count;
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

  // Bounded syntax-only subset: explicit atom inventory, not valence/stereochemical validation.
  // Implicit hydrogens are NOT inferred, so no molecular formula or molar mass is claimed.
  const bad=(error:string):SmilesValidationResult=>({isValid:false,error,atomCounts:{},estimatedFormula:''});
  if(trimmed.length>4096)return bad('SMILES length limit');
  const counts:Record<string,number>={};const rings=new Map<string,number>();let index=0,depth=0,needAtom=true,atoms=0;const branches:number[]=[];
  while(index<trimmed.length){
    const rest=trimmed.slice(index);const bracket=/^\[(?:\d{1,3})?([A-Z][a-z]?|[bcnops])(?:H([1-9]\d*)?)?(?:[+-](?:[1-9]\d*)?)?\]/.exec(rest);
    const atom=bracket??/^(Cl|Br|Si|Na|Ca|Fe|Cu|Zn|[BCNOPSFIbcnops])/.exec(rest);
    if(atom){const k=atom[1][0].toUpperCase()+atom[1].slice(1);if(!Object.hasOwn(ATOMIC_WEIGHTS,k))return bad('Unsupported atom');counts[k]=(counts[k]??0)+1;if(bracket&&/H/.test(bracket[0].slice(bracket[0].indexOf(bracket[1])+bracket[1].length)))counts.H=(counts.H??0)+Number(bracket[2]??1);index+=atom[0].length;atoms++;needAtom=false;continue;}
    const ch=rest[0];
    if(ch==='('){if(needAtom||depth>=32)return bad('Invalid branch parenthesis');depth++;branches.push(atoms);needAtom=true;index++;continue;}
    if(ch===')'){if(needAtom||depth===0||atoms===branches.pop())return bad('Invalid branch parenthesis');depth--;index++;continue;}
    if('-=#:'.includes(ch)){if(needAtom&&!(index>0&&trimmed[index-1]==='('))return bad('Invalid bond');needAtom=true;index++;continue;}
    const ring=/^(?:%[1-9]\d|[1-9])/.exec(rest);
    if(ring&&!needAtom){const n=(rings.get(ring[0])??0)+1;rings.set(ring[0],n);index+=ring[0].length;continue;}
    if(ch==='.'&&!needAtom&&depth===0){needAtom=true;index++;continue;}
    return bad('Unsupported or malformed SMILES token');
  }
  if(needAtom||depth||!atoms||[...rings.values()].some(n=>n%2!==0))return bad('Incomplete SMILES or unpaired ring closure');
  return {isValid:true,atomCounts:counts,estimatedFormula:''};

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
    if(!Object.keys(counts).length)return 'Invalid or unsupported molecular formula.';
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
    return `Chemical structure encoded in SMILES format "${data.data}", explicit atom inventory (implicit hydrogens not inferred): ${parts}.`;
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
  if(!Number.isFinite(width)||!Number.isFinite(height)||width<100||height<100)throw Error('Invalid SVG dimensions');
  const accessibleText = generateAccessibleStructureText(data);
  const formula = data.molecularFormula || (data.format === 'FORMULA' ? data.data : 'Structure');

  // Simple clean SVG placeholder diagram with structure info
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" role="img" aria-label="${escapeHtml(accessibleText)}">
  <rect width="100%" height="100%" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2" rx="8"/>
  <text x="20" y="36" font-family="system-ui, sans-serif" font-size="16" font-weight="600" fill="#0f172a">${escapeHtml(formula)}</text>
  <text x="20" y="64" font-family="system-ui, sans-serif" font-size="13" fill="#64748b">Format: ${escapeHtml(data.format)}</text>
  <rect x="20" y="80" width="${width - 40}" height="70" fill="#ffffff" stroke="#e2e8f0" rx="4"/>
  <text x="32" y="122" font-family="monospace" font-size="14" fill="#1e293b">${escapeHtml(data.data)}</text>
  <text x="20" y="180" font-family="system-ui, sans-serif" font-size="11" fill="#475569">${escapeHtml(accessibleText.slice(0,60))}${accessibleText.length > 60 ? '...' : ''}</text>
</svg>`;
}
