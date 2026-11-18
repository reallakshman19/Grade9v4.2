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
  }>;
  readonly totalAtoms: Record<string, number>;
}

export interface ReactionBalanceResult {
  readonly isBalanced: boolean;
  readonly reactantAtoms: Record<string, number>;
  readonly productAtoms: Record<string, number>;
  readonly imbalances: Array<{
    readonly element: string;
    readonly reactantCount: number;
    readonly productCount: number;
  }>;
  readonly rawEquation: string;
}

/**
 * Parses one side of a chemical equation (e.g. "2 H2 + O2" or "CH4 + 2 O2").
 */
export function parseReactionSide(sideStr: string): ReactionSide {
  const parts = sideStr.split('+').map((s) => s.trim()).filter(Boolean);
  const speciesList: Array<{
    coefficient: number;
    formula: string;
    atomCounts: Record<string, number>;
  }> = [];

  const totalAtoms: Record<string, number> = {};

  for (const part of parts) {
    // Match leading coefficient: e.g. "2 H2", "3Ca(OH)2"
    const match = /^(\d+)\s*(.*)$/.exec(part);
    let coefficient = 1;
    let formula = part;

    if (match && match[1] && match[2]) {
      coefficient = parseInt(match[1], 10);
      formula = match[2].trim();
    }

    const counts = parseFormula(formula);
    const multipliedCounts: Record<string, number> = {};

    for (const [elem, c] of Object.entries(counts)) {
      const total = c * coefficient;
      multipliedCounts[elem] = total;
      totalAtoms[elem] = (totalAtoms[elem] || 0) + total;
    }

    speciesList.push({
      coefficient,
      formula,
      atomCounts: multipliedCounts,
    });
  }

  return {
    species: speciesList,
    totalAtoms,
  };
}

/**
 * Validates whether a chemical equation is stoichiometrically balanced.
 */
export function checkReactionBalance(equation: string): ReactionBalanceResult {
  if (!equation || typeof equation !== 'string') {
    return {
      isBalanced: false,
      reactantAtoms: {},
      productAtoms: {},
      imbalances: [],
      rawEquation: equation || '',
    };
  }

  // Split on reaction arrow
  const arrowRegex = /->|-->|⇌|<=>|=|\u2192|\\rightarrow/g;
  const match = arrowRegex.exec(equation);

  if (!match) {
    return {
      isBalanced: false,
      reactantAtoms: {},
      productAtoms: {},
      imbalances: [],
      rawEquation: equation,
    };
  }

  const leftStr = equation.substring(0, match.index);
  const rightStr = equation.substring(match.index + match[0].length);

  const left = parseReactionSide(leftStr);
  const right = parseReactionSide(rightStr);

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

  return {
    isBalanced: imbalances.length === 0 && allElements.size > 0,
    reactantAtoms: left.totalAtoms,
    productAtoms: right.totalAtoms,
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
    this.steps = [...initialSteps];
  }

  getSteps(): readonly ReactionStep[] {
    return [...this.steps];
  }

  addStep(step: Omit<ReactionStep, 'stepNumber'>): ReactionStep {
    const stepNumber = this.steps.length + 1;
    const newStep: ReactionStep = {
      ...step,
      stepNumber,
    };
    this.steps.push(newStep);
    return newStep;
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
      fromIndex < 0 ||
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
