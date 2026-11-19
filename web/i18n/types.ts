/**
 * web/i18n/types.ts
 * A33 — Locale, Glossary, and UI State Message Types.
 *
 * Enforces:
 * - Preservation of physical units, symbols, and mathematical assumptions
 * - Fail-closed behavior on unknown or unverified translations (TRANSLATION_UNAVAILABLE)
 *
 * No academic approval inferred from software validation.
 */

export type SupportedLocale = 'en-US' | 'hi-IN';

export interface GlossaryEntry {
  readonly key: string;
  readonly canonicalTerm: string;
  readonly translatedTerm: string;
  readonly physicalSymbol?: string;
  readonly standardUnit?: string;
  readonly definition: string;
  readonly meaningPreserved: boolean;
}

export interface UIStateMessages {
  readonly loading: string;
  readonly error: string;
  readonly populated: string;
  readonly pendingReview: string;
  readonly staleOrigin: string;
  readonly staleLesson: string;
  readonly saveBlocked: string;
  readonly staleEvent: string;
  readonly assistedAttempt: string;
  readonly boundaryLocked: string;
  readonly missingUnit: string;
  readonly invalidModelDomain: string;
  readonly noEligibleFreshTask: string;
}

export interface LocaleBundle {
  readonly locale: SupportedLocale;
  readonly displayName: string;
  readonly uiStates: UIStateMessages;
  readonly glossary: Record<string, GlossaryEntry>;
  readonly commonLabels: Record<string, string>;
}

