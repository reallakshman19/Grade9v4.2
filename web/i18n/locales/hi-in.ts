/**
 * web/i18n/locales/hi-in.ts
 * A33 — Hindi Locale Bundle for Grade9 Curriculum.
 *
 * Preserves all physical symbols, mathematical formulas, and SI units (N, J, m, kg).
 *
 * No academic approval inferred from software validation.
 */

import type { LocaleBundle } from '../types.ts';

export const HI_IN_BUNDLE: LocaleBundle = {
  locale: 'hi-IN',
  displayName: 'हिंदी (Hindi)',
  uiStates: {
    loading: 'शैक्षणिक सामग्री और संसाधन लोड हो रहे हैं...',
    error: 'एक अप्रत्याशित त्रुटि उत्पन्न हुई।',
    populated: 'सामग्री सफलता से लोड हो गई है।',
    pendingReview: 'यह चुनौती औपचारिक समीक्षा के अधीन है।',
    staleOrigin: 'मूल प्रश्न अद्यतित हुआ है; स्थानांतरण कार्य को पुनः योग्यता की आवश्यकता है।',
    staleLesson: 'यह पाठ पुराना (Stale) चिह्नित है।',
    saveBlocked: 'प्रगति सहेजने में विफल। उत्तर प्रकटीकरण अवरुद्ध है।',
    staleEvent: 'इवेंट क्रम में विसंगति पाई गई।',
    assistedAttempt: 'संकेत दिखाया गया; प्रयास को सहायता प्राप्त चिह्नित किया गया।',
    boundaryLocked: 'सीमा मूल्यांकन उत्तर प्रतिबद्ध होने तक बंद है।',
    missingUnit: 'पाठ परिभाषा से शिक्षण इकाई गायब है।',
    invalidModelDomain: 'मॉडल पैरामीटर भौतिक सीमा से बाहर है।',
    noEligibleFreshTask: 'स्थानांतरण से पहले सभी आवश्यक इकाइयाँ पूरी करें।',
  },
  glossary: {
    RESTORING_FORCE: {
      key: 'RESTORING_FORCE',
      canonicalTerm: 'Restoring Force',
      translatedTerm: 'प्रत्यानयन बल (Restoring Force)',
      physicalSymbol: 'F_s',
      standardUnit: 'N',
      definition: 'साम्यावस्था की ओर निर्देशित बल जो विस्थापन के समानुपाती होता है।',
      meaningPreserved: true,
    },
    EQUILIBRIUM_POSITION: {
      key: 'EQUILIBRIUM_POSITION',
      canonicalTerm: 'Equilibrium Position',
      translatedTerm: 'साम्यावस्था स्थिति (Equilibrium Position)',
      physicalSymbol: 'x_0',
      standardUnit: 'm',
      definition: 'वह संदर्भ बिंदु जहां कुल बाह्य बल शून्य होता है।',
      meaningPreserved: true,
    },
    KINETIC_ENERGY: {
      key: 'KINETIC_ENERGY',
      canonicalTerm: 'Kinetic Energy',
      translatedTerm: 'गतिज ऊर्जा (Kinetic Energy)',
      physicalSymbol: 'E_k',
      standardUnit: 'J',
      definition: 'गति के कारण किसी वस्तु में निहित ऊर्जा: 1/2 m v^2।',
      meaningPreserved: true,
    },
    POTENTIAL_ENERGY: {
      key: 'POTENTIAL_ENERGY',
      canonicalTerm: 'Elastic Potential Energy',
      translatedTerm: 'प्रत्यास्थ स्थितिज ऊर्जा (Potential Energy)',
      physicalSymbol: 'E_p',
      standardUnit: 'J',
      definition: 'प्रत्यास्थ वस्तु के विरूपण में संचित ऊर्जा: 1/2 k x^2।',
      meaningPreserved: true,
    },
    WORK_ENERGY_THEOREM: {
      key: 'WORK_ENERGY_THEOREM',
      canonicalTerm: 'Work-Energy Theorem',
      translatedTerm: 'कार्य-ऊर्जा प्रमेय (Work-Energy Theorem)',
      physicalSymbol: 'W_net = \\Delta E_k',
      standardUnit: 'J',
      definition: 'सभी बलों द्वारा किया गया कुल कार्य गतिज ऊर्जा में परिवर्तन के बराबर होता है।',
      meaningPreserved: true,
    },
  },
  commonLabels: {
    return: 'वापस जाएँ',
    continue: 'आगे बढ़ें',
    submit: 'जमा करें',
    predict: 'पूर्वानुमान',
    observe: 'अवलोकन',
    reveal: 'उत्तर देखें',
    hide: 'उत्तर छिपाएँ',
  },
};

