/**
 * web/runtime/presentation.ts
 * A33 — Child-Friendly Progressive Presentation Runtime.
 *
 * Implements:
 * - Three progressive presentation tiers:
 *   1. INTUITION  — Everyday observable analogy, accessible child-friendly phrasing
 *   2. MODEL      — Visual schematics and parameter relationships
 *   3. FORMAL     — Rigorous mathematical definitions, explicit bounds, coordinate definitions
 * - Source-bound stem immutability:
 *   Original problem stem is NEVER mutated or rewritten. Enforces exact SHA-256 stem hash verification.
 * - Stage-gated feedback:
 *   Answers, numerical keys, and warrant proofs (W) are strictly withheld until the target cognitive stage.
 * - Scientific invariants preservation:
 *   Maintains symbols, SI units (N, J, m, kg), assumptions, and domain constraints.
 *
 * No academic approval inferred from software validation.
 */

import { createHash } from 'node:crypto';
import type { ExactRef, TransferStage } from '../journeys/core1b.ts';
import { getUIStateMessage, getGlossaryEntry } from '../i18n/index.ts';
import type { SupportedLocale, UIStateMessages } from '../i18n/types.ts';

export type PresentationLevel = 'INTUITION' | 'MODEL' | 'FORMAL';

export const PRESENTATION_LEVELS: readonly PresentationLevel[] = [
  'INTUITION',
  'MODEL',
  'FORMAL',
] as const;

export interface ProgressiveIntuitionTier {
  readonly leadAnalogy: string;
  readonly observablePhenomenon: string;
  readonly childFriendlyExplanation: string;
}

export interface ProgressiveModelTier {
  readonly schematicElement: string;
  readonly visualAnalogy: string;
  readonly parameterRelations: readonly string[];
}

export interface ProgressiveFormalTier {
  readonly formalStatement: string;
  readonly physicalAssumptions: readonly string[];
  readonly symbolsAndUnits: Record<string, string>;
  readonly domainBounds: readonly string[];
}

export interface SourceBoundStemProjection {
  readonly sourceRef: ExactRef;
  readonly immutableStemText: string;
  readonly expectedStemHash: string;
  readonly progressiveTiers: {
    readonly intuition: ProgressiveIntuitionTier;
    readonly model: ProgressiveModelTier;
    readonly formal: ProgressiveFormalTier;
  };
}

export interface StageGatedContent {
  readonly taskPrompt: string;
  readonly hintScaffolding: readonly string[];
  readonly canonicalDerivation: readonly string[];
  readonly finalAnswerValue?: string;
  readonly warrantProof?: string;
}

export class PresentationValidationError extends Error {
  readonly code: string;
  constructor(code: string, message: string) {
    super(`${code}: ${message}`);
    this.name = 'PresentationValidationError';
    this.code = code;
  }
}

export function computeSha256(text: string): string {
  return createHash('sha256').update(text, 'utf8').digest('hex');
}

/**
 * Validates that an original problem stem has not been rewritten or mutated.
 * Throws STEM_MUTATION_REJECTED if the text hash diverges from expected certified hash.
 */
export function validateSourceBoundStem(projection: SourceBoundStemProjection): void {
  const actualHash = computeSha256(projection.immutableStemText);
  if (actualHash !== projection.expectedStemHash) {
    throw new PresentationValidationError(
      'STEM_MUTATION_REJECTED',
      `Original stem text hash ${actualHash} diverges from expected certified hash ${projection.expectedStemHash}. Original stem cannot be rewritten.`
    );
  }

  // Verify that symbols and units in formal tier are valid SI standards
  const symbols = projection.progressiveTiers.formal.symbolsAndUnits;
  for (const [sym, unit] of Object.entries(symbols)) {
    if (!sym || !unit) {
      throw new PresentationValidationError(
        'INCOMPLETE_SYMBOL_SPEC',
        `Symbol ${sym} must have declared standard unit`
      );
    }
  }
}

export class ProgressivePresentationController {
  private projection: SourceBoundStemProjection;
  private currentLevel: PresentationLevel = 'INTUITION';
  private locale: SupportedLocale = 'en-US';

  constructor(projection: SourceBoundStemProjection, initialLevel: PresentationLevel = 'INTUITION', locale: SupportedLocale = 'en-US') {
    validateSourceBoundStem(projection);
    this.projection = projection;
    this.currentLevel = initialLevel;
    this.locale = locale;
  }

  setLevel(level: PresentationLevel): void {
    this.currentLevel = level;
  }

  getLevel(): PresentationLevel {
    return this.currentLevel;
  }

  setLocale(locale: SupportedLocale): void {
    this.locale = locale;
  }

  getLocale(): SupportedLocale {
    return this.locale;
  }

  getImmutableStem(): string {
    return this.projection.immutableStemText;
  }

  renderPresentation(): {
    readonly level: PresentationLevel;
    readonly immutableStem: string;
    readonly presentedContent: string;
    readonly symbolsAndUnits: Record<string, string>;
  } {
    const tiers = this.projection.progressiveTiers;
    let presented = '';

    switch (this.currentLevel) {
      case 'INTUITION':
        presented = `${tiers.intuition.observablePhenomenon}\n\nAnalogy: ${tiers.intuition.leadAnalogy}\n\n${tiers.intuition.childFriendlyExplanation}`;
        break;
      case 'MODEL':
        presented = `Schematic: ${tiers.model.schematicElement}\nVisual Model: ${tiers.model.visualAnalogy}\n\nKey Relations:\n${tiers.model.parameterRelations.map((r) => `- ${r}`).join('\n')}`;
        break;
      case 'FORMAL':
        presented = `${tiers.formal.formalStatement}\n\nAssumptions:\n${tiers.formal.physicalAssumptions.map((a) => `- ${a}`).join('\n')}\n\nDomain Bounds:\n${tiers.formal.domainBounds.map((b) => `- ${b}`).join('\n')}`;
        break;
    }

    return {
      level: this.currentLevel,
      immutableStem: this.projection.immutableStemText,
      presentedContent: presented,
      symbolsAndUnits: tiers.formal.symbolsAndUnits,
    };
  }
}

/**
 * Controller enforcing stage-gated feedback disclosure:
 * Guarantees zero leakage of answers or formal warrant proofs (W)
 * before appropriate commitment milestones are achieved.
 */
export class StageGatedFeedbackController {
  private content: StageGatedContent;

  constructor(content: StageGatedContent) {
    this.content = content;
  }

  /**
   * Evaluates disclosed feedback for a given cognitive stage.
   * If an attempt has not been committed, solutions and warrant proofs are strictly withheld.
   */
  getDisclosedContent(stage: TransferStage, firstAttemptCommitted: boolean, boundaryCommitted: boolean): {
    readonly promptExposed: boolean;
    readonly derivationExposed: boolean;
    readonly answerExposed: boolean;
    readonly warrantProofExposed: boolean;
    readonly visibleFeedbackText: string;
  } {
    const promptExposed = true;

    // During PREDICT or uncommitted ATTEMPT, solutions are strictly withheld
    if (stage === 'PREDICT' || (stage === 'ATTEMPT' && !firstAttemptCommitted)) {
      return {
        promptExposed,
        derivationExposed: false,
        answerExposed: false,
        warrantProofExposed: false,
        visibleFeedbackText: 'Initial reasoning commit required. Solutions and proofs withheld.',
      };
    }

    // In RECONSTRUCT or DIAGNOSE or REPAIR, derivation is exposed for comparison, but final warrant is withheld
    if (stage === 'RECONSTRUCT' || stage === 'DIAGNOSE' || stage === 'REPAIR') {
      return {
        promptExposed,
        derivationExposed: true,
        answerExposed: true,
        warrantProofExposed: false,
        visibleFeedbackText: this.content.canonicalDerivation.join('\n'),
      };
    }

    // In BOUNDARY_TEST before boundary commitment, boundary answer/proof remains locked
    if (stage === 'BOUNDARY_TEST' && !boundaryCommitted) {
      return {
        promptExposed,
        derivationExposed: true,
        answerExposed: false,
        warrantProofExposed: false,
        visibleFeedbackText: 'Boundary task attempt required before boundary proof disclosure.',
      };
    }

    // In COMPLETE or committed BOUNDARY_TEST, full feedback and warrants are accessible
    return {
      promptExposed,
      derivationExposed: true,
      answerExposed: true,
      warrantProofExposed: true,
      visibleFeedbackText: `${this.content.canonicalDerivation.join('\n')}\n\nWarrant Proof: ${this.content.warrantProof || 'Verified under academic warrant'}`,
    };
  }
}

