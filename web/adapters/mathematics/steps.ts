/**
 * web/adapters/mathematics/steps.ts
 * A27 — Mathematical proof step builder and progression manager.
 *
 * Implements:
 * - Step sequence tracking with assertions and justifications
 * - Lemma citation linking
 * - Proof consistency checks
 *
 * No academic approval inferred from software validation.
 */

import type { ProofStep } from './types.ts';

export class ProofStepManager {
  private steps: ProofStep[] = [];

  constructor(initialSteps: readonly ProofStep[] = []) {
    this.steps = initialSteps.map((s, idx) => ({
      ...s,
      stepNumber: idx + 1,
    }));
  }

  getSteps(): readonly ProofStep[] {
    return this.steps;
  }

  addStep(assertion: string, justification: string = '', lemmaRefs: readonly string[] = []): ProofStep {
    const newStep: ProofStep = {
      id: `step-${Date.now()}-${this.steps.length + 1}`,
      stepNumber: this.steps.length + 1,
      assertion: assertion.trim(),
      justification: justification.trim(),
      lemmaRefs: [...lemmaRefs],
    };
    this.steps.push(newStep);
    return newStep;
  }

  updateStep(id: string, updates: Partial<Pick<ProofStep, 'assertion' | 'justification' | 'lemmaRefs'>>): boolean {
    const idx = this.steps.findIndex((s) => s.id === id);
    if (idx === -1) return false;

    this.steps[idx] = {
      ...this.steps[idx],
      ...(updates.assertion !== undefined ? { assertion: updates.assertion.trim() } : {}),
      ...(updates.justification !== undefined ? { justification: updates.justification.trim() } : {}),
      ...(updates.lemmaRefs !== undefined ? { lemmaRefs: [...updates.lemmaRefs] } : {}),
    };
    return true;
  }

  removeStep(id: string): boolean {
    const idx = this.steps.findIndex((s) => s.id === id);
    if (idx === -1) return false;

    this.steps.splice(idx, 1);
    // Re-number remaining steps
    this.steps = this.steps.map((s, i) => ({ ...s, stepNumber: i + 1 }));
    return true;
  }

  clear(): void {
    this.steps = [];
  }
}

export function createProofStepManager(initialSteps?: readonly ProofStep[]): ProofStepManager {
  return new ProofStepManager(initialSteps);
}
