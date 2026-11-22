/**
 * web/adapters/chemistry/reactions.ts
 * A28 — Chemical reaction equation parsing, stoichiometry balancing, and mechanism steps.
 *
 * Implements:
 * - Equation parsing supporting standard reaction arrows (->, -->, ⇌, <=>, =, \rightarrow).
 * - Conservation of mass / stoichiometric balance checker across reactants and products.
 * - Ordered reaction mechanism step builder supporting curved-arrow electron movements,
 *   reagents, conditions, and accessible text summaries for assistive technologies.
 *
 * No academic approval inferred from software validation.
 */

import { parseFormula } from './structure.ts';
import type { ReactionStep } from './types.ts';

export interface ReactionSide {
  readonly species: Array<{
    readonly coefficient: number;
    readonly formula: string;
    readonly atomCounts: Record<string, number>;
    readonly charge?: number;
  }>;
  readonly totalAtoms: Record<string, number>;
  readonly totalCharge: number;
}

export interface ReactionBalanceResult {
  readonly isBalanced: boolean;
  readonly isAtomBalanced?: boolean;
  readonly isChargeBalanced?: boolean;
  readonly reactantAtoms: Record<string, number>;
  readonly productAtoms: Record<string, number>;
  readonly reactantCharge?: number;
  readonly productCharge?: number;
  readonly chargeImbalance?: {
    readonly reactantCharge: number;
    readonly productCharge: number;
  };
  readonly imbalances: Array<{
    readonly element: string;
    readonly reactantCount: number;
    readonly productCount: number;
  }>;
  readonly rawEquation: string;
}

/**
 * Splits a reaction side into individual species tokens safely.
 */
function splitReactionSideString(sideStr: string): string[] {
  const trimmed = sideStr.trim();
  if (!trimmed) throw Error('Empty reaction side');

  if (/\s+\+\s+/.test(trimmed)) {
    return trimmed.split(/\s+\+\s+/).map((s) => s.trim());
  }

  // Handle unspaced plus where plus is between formulas or after sign
  if (/(?<=[A-Za-z0-9\)\+\-])\+(?=[0-9]*[A-Z])/.test(trimmed)) {
    return trimmed.split(/(?<=[A-Za-z0-9\)\+\-])\+(?=[0-9]*[A-Z])/).map((s) => s.trim());
  }

  return [trimmed];
}

/**
 * Parses one side of a chemical equation (e.g. "2 H2 + O2", "Fe2+ + Ce4+", or "3 MnO4^2- + 4 H+").
 */
export function parseReactionSide(sideStr: string): ReactionSide {
  const parts = splitReactionSideString(sideStr);
  if (parts.some((p) => !p) || parts.length > 100) {
    throw Error('Invalid reaction side');
  }

  const speciesList: Array<{
    coefficient: number;
    formula: string;
    atomCounts: Record<string, number>;
    charge: number;
  }> = [];

  const totalAtoms: Record<string, number> = {};
  let totalCharge = 0;

  for (const part of parts) {
    // Match leading coefficient: e.g. "2 H2", "3Ca(OH)2", "4 H+"
    const match = /^(\d+)\s*(.*)$/.exec(part);
    let coefficient = 1;
    let remainder = part;

    if (match && match[1] && match[2]) {
      coefficient = parseInt(match[1], 10);
      remainder = match[2].trim();
    }

    if (!Number.isSafeInteger(coefficient) || coefficient < 1 || coefficient > 1000000) {
      throw Error('Invalid coefficient');
    }

    if (!remainder) {
      throw Error('Empty reaction species');
    }

    // Check for electron: e-, e^-, e^{-}
    if (remainder === 'e-' || remainder === 'e^-' || remainder === 'e^{-}') {
      const eCharge = -1 * coefficient;
      totalCharge += eCharge;
      speciesList.push({
        coefficient,
        formula: 'e-',
        atomCounts: {},
        charge: eCharge,
      });
      continue;
    }

    // Extract charge from remainder
    let base = remainder;
    let unitCharge = 0;

    let m = /^(.*?)\^\{(\d*)([\+\-])\}$/.exec(remainder); // e.g. Fe^{2+}, MnO4^{-}
    if (!m) m = /^(.*?)\^(\d*)([\+\-])$/.exec(remainder); // e.g. Fe^2+, MnO4^2-, MnO4^-
    if (!m) m = /^(.*?)\((\d*)([\+\-])\)$/.exec(remainder); // e.g. MnO4(2-)
    if (!m) m = /^([A-Z][a-z]?)(\d*)([\+\-])$/.exec(remainder); // e.g. Fe2+, Ce4+, H+, Cl-
    if (!m) m = /^(.*?[A-Za-z0-9\)])([\+\-])$/.exec(remainder); // e.g. MnO4-, OH-, NH4+

    if (m) {
      base = m[1];
      const mag = m[2] && m[2] !== '+' && m[2] !== '-' ? parseInt(m[2], 10) : 1;
      const sign = (m[3] || m[2]) === '-' ? -1 : 1;
      unitCharge = mag * sign;
    }

    const counts = parseFormula(base);
    if (!Object.keys(counts).length) {
      throw Error('Invalid or unsupported reaction species');
    }

    const multipliedCounts: Record<string, number> = {};
    for (const [elem, c] of Object.entries(counts)) {
      const total = c * coefficient;
      multipliedCounts[elem] = total;
      totalAtoms[elem] = (totalAtoms[elem] || 0) + total;
      if (!Number.isSafeInteger(totalAtoms[elem])) {
        throw Error('Atom count overflow');
      }
    }

    const speciesTotalCharge = unitCharge * coefficient;
    totalCharge += speciesTotalCharge;

    speciesList.push({
      coefficient,
      formula: remainder,
      atomCounts: multipliedCounts,
      charge: speciesTotalCharge,
    });
  }

  return {
    species: speciesList,
    totalAtoms,
    totalCharge,
  };
}

/**
 * Validates whether a chemical equation is stoichiometrically and ionic-charge balanced.
 */
export function checkReactionBalance(equation: string): ReactionBalanceResult {
  if (!equation || typeof equation !== 'string' || equation.length > 8192) {
    return {
      isBalanced: false,
      isAtomBalanced: false,
      isChargeBalanced: false,
      reactantAtoms: {},
      productAtoms: {},
      imbalances: [],
      rawEquation: equation || '',
    };
  }

  // Dangling plus immediately abutting reaction arrow or end of string
  if (
    /\+(?:->|-->|⇌|<=>|=|\u2192|\\rightarrow)/.test(equation) ||
    /(?:->|-->|⇌|<=>|=|\u2192|\\rightarrow)\s*[A-Za-z0-9]+\+$/.test(equation)
  ) {
    return {
      isBalanced: false,
      isAtomBalanced: false,
      isChargeBalanced: false,
      reactantAtoms: {},
      productAtoms: {},
      imbalances: [],
      rawEquation: equation,
    };
  }

  // Split on reaction arrow
  const arrowRegex = /-->|->|⇌|<=>|=|\u2192|\\rightarrow/g;
  const match = arrowRegex.exec(equation);

  if (!match || arrowRegex.exec(equation)) {
    return {
      isBalanced: false,
      isAtomBalanced: false,
      isChargeBalanced: false,
      reactantAtoms: {},
      productAtoms: {},
      imbalances: [],
      rawEquation: equation,
    };
  }

  const leftStr = equation.substring(0, match.index);
  const rightStr = equation.substring(match.index + match[0].length);

  let left: ReactionSide;
  let right: ReactionSide;
  try {
    left = parseReactionSide(leftStr);
    right = parseReactionSide(rightStr);
  } catch {
    return {
      isBalanced: false,
      isAtomBalanced: false,
      isChargeBalanced: false,
      reactantAtoms: {},
      productAtoms: {},
      imbalances: [],
      rawEquation: equation,
    };
  }

  const allElements = new Set([
    ...Object.keys(left.totalAtoms),
    ...Object.keys(right.totalAtoms),
  ]);

  const imbalances: Array<{
    element: string;
    reactantCount: number;
    productCount: number;
  }> = [];

  for (const elem of allElements) {
    const leftCount = left.totalAtoms[elem] || 0;
    const rightCount = right.totalAtoms[elem] || 0;
    if (leftCount !== rightCount) {
      imbalances.push({
        element: elem,
        reactantCount: leftCount,
        productCount: rightCount,
      });
    }
  }

  const isElectronOnly = allElements.size === 0 && (left.species.some((s) => s.formula === 'e-') || right.species.some((s) => s.formula === 'e-'));
  const isAtomBalanced = imbalances.length === 0 && (allElements.size > 0 || isElectronOnly);
  const isChargeBalanced = left.totalCharge === right.totalCharge;
  const isBalanced = isAtomBalanced && isChargeBalanced;

  return {
    isBalanced,
    isAtomBalanced,
    isChargeBalanced,
    reactantAtoms: left.totalAtoms,
    productAtoms: right.totalAtoms,
    reactantCharge: left.totalCharge,
    productCharge: right.totalCharge,
    chargeImbalance: isChargeBalanced
      ? undefined
      : {
          reactantCharge: left.totalCharge,
          productCharge: right.totalCharge,
        },
    imbalances,
    rawEquation: equation,
  };
}

/**
 * ReactionMechanismManager manages sequential reaction mechanism steps.
 */
export class ReactionMechanismManager {
  private steps: ReactionStep[];

  constructor(initialSteps: readonly ReactionStep[] = []) {
    if(new Set(initialSteps.map(s=>s.id)).size!==initialSteps.length||initialSteps.some(s=>!s.id||typeof s.equation!=='string'))throw Error('Invalid mechanism steps');this.steps=structuredClone(initialSteps).map((s,i)=>({...s,stepNumber:i+1}));
  }

  getSteps(): readonly ReactionStep[] {
    return structuredClone(this.steps);
  }

  addStep(step: Omit<ReactionStep, 'stepNumber'>): ReactionStep {
    if(!step.id||this.steps.some(s=>s.id===step.id)||typeof step.equation!=='string')throw Error('Invalid mechanism step');
    const stepNumber = this.steps.length + 1;
    const newStep: ReactionStep = {
      ...structuredClone(step),
      stepNumber,
    };
    this.steps.push(newStep);
    return structuredClone(newStep);
  }

  updateStep(id: string, updates: Partial<Omit<ReactionStep, 'id' | 'stepNumber'>>): boolean {
    const idx = this.steps.findIndex((s) => s.id === id);
    if (idx === -1) return false;

    const current = this.steps[idx]!;
    this.steps[idx] = {
      ...current,
      ...updates,
      id: current.id,
      stepNumber: current.stepNumber,
    };
    return true;
  }

  removeStep(id: string): boolean {
    const initialLen = this.steps.length;
    this.steps = this.steps.filter((s) => s.id !== id);
    if (this.steps.length !== initialLen) {
      // Re-number remaining steps
      this.steps = this.steps.map((s, idx) => ({
        ...s,
        stepNumber: idx + 1,
      }));
      return true;
    }
    return false;
  }

  reorderSteps(fromIndex: number, toIndex: number): boolean {
    if (
      !Number.isInteger(fromIndex)||!Number.isInteger(toIndex)||fromIndex < 0 ||
      fromIndex >= this.steps.length ||
      toIndex < 0 ||
      toIndex >= this.steps.length
    ) {
      return false;
    }

    const item = this.steps.splice(fromIndex, 1)[0]!;
    this.steps.splice(toIndex, 0, item);

    // Re-index
    this.steps = this.steps.map((s, idx) => ({
      ...s,
      stepNumber: idx + 1,
    }));
    return true;
  }

  generateAccessibleSummary(): string {
    if (this.steps.length === 0) {
      return 'No reaction mechanism steps recorded.';
    }

    const summaries = this.steps.map((s) => {
      let desc = `Step ${s.stepNumber}: ${s.equation}`;
      if (s.reagents) desc += ` using reagents ${s.reagents}`;
      if (s.conditions) desc += ` under ${s.conditions}`;
      if (s.mechanismType) desc += ` (${s.mechanismType})`;
      if (s.intermediateName) desc += `, yielding intermediate ${s.intermediateName}`;
      return desc;
    });

    return `Reaction mechanism consisting of ${this.steps.length} sequential steps:\n` + summaries.join('\n');
  }
}
