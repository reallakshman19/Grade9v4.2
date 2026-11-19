/**
 * web/i18n/index.ts
 * A33 — Locale Service and Scientific Glossary Provider.
 *
 * Enforces:
 * - Fail-closed on unsupported locales: unknown translations are marked unavailable
 * - Mathematical symbol and unit preservation (SI units must never be translated)
 *
 * No academic approval inferred from software validation.
 */

import type { SupportedLocale, LocaleBundle, GlossaryEntry, UIStateMessages } from './types.ts';
import { EN_US_BUNDLE } from './locales/en-us.ts';
import { HI_IN_BUNDLE } from './locales/hi-in.ts';

export * from './types.ts';

const BUNDLES: Record<SupportedLocale, LocaleBundle> = {
  'en-US': EN_US_BUNDLE,
  'hi-IN': HI_IN_BUNDLE,
};

export class I18nError extends Error {
  readonly code: string;
  constructor(code: string, message: string) {
    super(`${code}: ${message}`);
    this.name = 'I18nError';
    this.code = code;
  }
}

export function getSupportedLocales(): readonly SupportedLocale[] {
  return ['en-US', 'hi-IN'];
}

export function getLocaleBundle(locale: string = 'en-US'): LocaleBundle {
  if (locale in BUNDLES) {
    return BUNDLES[locale as SupportedLocale];
  }
  throw new I18nError(
    'TRANSLATION_UNAVAILABLE',
    `Locale ${locale} is not supported; translation unavailable`
  );
}

export function getUIStateMessage(key: keyof UIStateMessages, locale: string = 'en-US'): string {
  const bundle = getLocaleBundle(locale);
  const msg = bundle.uiStates[key];
  if (!msg) {
    throw new I18nError('TRANSLATION_UNAVAILABLE', `UI state message ${key} missing for locale ${locale}`);
  }
  return msg;
}

export function getGlossaryEntry(termKey: string, locale: string = 'en-US'): GlossaryEntry {
  const bundle = getLocaleBundle(locale);
  const entry = bundle.glossary[termKey];
  if (!entry) {
    throw new I18nError('TRANSLATION_UNAVAILABLE', `Glossary term ${termKey} missing in locale ${locale}`);
  }
  if (!entry.meaningPreserved) {
    throw new I18nError('MEANING_DISTORTION_REJECTED', `Glossary translation for ${termKey} does not preserve scientific meaning`);
  }
  return entry;
}
