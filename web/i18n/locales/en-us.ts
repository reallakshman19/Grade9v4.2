/**
 * web/i18n/locales/en-us.ts
 * A33 — English (Canonical Default) Locale Bundle.
 *
 * No academic approval inferred from software validation.
 */

import type { LocaleBundle } from '../types.ts';

export const EN_US_BUNDLE: LocaleBundle = {
  locale: 'en-US',
  displayName: 'English (US)',
  uiStates: {
    loading: 'Loading educational content and assets...',
    error: 'An unexpected application error occurred.',
    populated: 'Content loaded and ready for interaction.',
    pendingReview: 'Challenge pending formal academic qualification.',
    staleOrigin: 'Origin source updated; transfer task requires re-qualification.',
    staleLesson: 'Instructional lesson is marked stale.',
    saveBlocked: 'Exposure transaction failed. Answer disclosure blocked.',
    staleEvent: 'Event sequence desynchronization detected.',
    assistedAttempt: 'Scaffolding hint exposed; attempt marked as assisted.',
    boundaryLocked: 'Boundary evaluation locked until boundary attempt is committed.',
    missingUnit: 'Instructional unit is missing from lesson definition.',
    invalidModelDomain: 'Model parameter exceeds physical domain constraints.',
    noEligibleFreshTask: 'Complete all prerequisite instructional units before fresh transfer.',
  },
  glossary: {
    RESTORING_FORCE: {
      key: 'RESTORING_FORCE',
      canonicalTerm: 'Restoring Force',
      translatedTerm: 'Restoring Force',
      physicalSymbol: 'F_s',
      standardUnit: 'N',
      definition: 'Force directed towards the equilibrium position proportional to displacement.',
      meaningPreserved: true,
    },
    EQUILIBRIUM_POSITION: {
      key: 'EQUILIBRIUM_POSITION',
      canonicalTerm: 'Equilibrium Position',
      translatedTerm: 'Equilibrium Position',
      physicalSymbol: 'x_0',
      standardUnit: 'm',
      definition: 'The reference point where net external force on the system equals zero.',
      meaningPreserved: true,
    },
    KINETIC_ENERGY: {
      key: 'KINETIC_ENERGY',
      canonicalTerm: 'Kinetic Energy',
      translatedTerm: 'Kinetic Energy',
      physicalSymbol: 'E_k',
      standardUnit: 'J',
      definition: 'Energy possessed by an object due to its motion: 1/2 m v^2.',
      meaningPreserved: true,
    },
    POTENTIAL_ENERGY: {
      key: 'POTENTIAL_ENERGY',
      canonicalTerm: 'Elastic Potential Energy',
      translatedTerm: 'Elastic Potential Energy',
      physicalSymbol: 'E_p',
      standardUnit: 'J',
      definition: 'Energy stored as a result of deformation of an elastic object: 1/2 k x^2.',
      meaningPreserved: true,
    },
    WORK_ENERGY_THEOREM: {
      key: 'WORK_ENERGY_THEOREM',
      canonicalTerm: 'Work-Energy Theorem',
      translatedTerm: 'Work-Energy Theorem',
      physicalSymbol: 'W_net = \\Delta E_k',
      standardUnit: 'J',
      definition: 'The net work done by all forces equals the change in kinetic energy.',
      meaningPreserved: true,
    },
  },
  commonLabels: {
    return: 'Return',
    continue: 'Continue',
    submit: 'Submit',
    predict: 'Predict',
    observe: 'Observe',
    reveal: 'Reveal Solution',
    hide: 'Hide Solution',
  },
};

