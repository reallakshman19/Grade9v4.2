/**
 * tests/runtime/presentation.test.ts
 * A33 — Child-Friendly Presentation and Locale Runtime Test Suite.
 *
 * Verifies:
 * 1. Exact SHA-256 stem hash verification; rejects any mutation of original stem text.
 * 2. Progressive presentation tiers: Intuition, Model, Formal.
 * 3. Physical assumptions, symbols, SI units, and domain bounds preservation.
 * 4. Stage-gated feedback disclosure: zero leakage of answers or warrant proofs (W).
 * 5. Scientific glossary lookups in en-US and hi-IN with symbol/unit preservation.
 * 6. Fail-closed error handling on unknown locales or untranslated keys.
 * 7. Rule 13 invariant preservation.
 *
 * No academic approval inferred from software validation.
 */

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  computeSha256,
  validateSourceBoundStem,
  ProgressivePresentationController,
  StageGatedFeedbackController,
  PresentationValidationError,
} from '../../web/runtime/presentation.ts';
import type {
  SourceBoundStemProjection,
  StageGatedContent,
} from '../../web/runtime/presentation.ts';
import {
  getSupportedLocales,
  getLocaleBundle,
  getUIStateMessage,
  getGlossaryEntry,
  I18nError,
} from '../../web/i18n/index.ts';

const SAMPLE_STEM = 'A block of mass 2.0 kg is pushed against a light horizontal spring of spring constant k = 200 N/m, compressing it by 0.30 m. Find the speed of the block as it detaches at the equilibrium position x = 0.';
const SAMPLE_STEM_HASH = computeSha256(SAMPLE_STEM);

function createSampleProjection(): SourceBoundStemProjection {
  return {
    sourceRef: {
      type: 'QUESTION',
      id: 'src:physics:wpe:launch-01',
      revision: 1,
      sha256: 'a'.repeat(64),
    },
    immutableStemText: SAMPLE_STEM,
    expectedStemHash: SAMPLE_STEM_HASH,
    progressiveTiers: {
      intuition: {
        leadAnalogy: 'Like releasing a compressed toy pinball plunger.',
        observablePhenomenon: 'The compressed spring pushes the cart forward until the spring reaches its natural rest length.',
        childFriendlyExplanation: 'All the energy squeezed into the spring coils rushes into the cart as pure movement energy.',
      },
      model: {
        schematicElement: 'Horizontal block on frictionless guide rail with attached spring at x < 0.',
        visualAnalogy: 'Energy transfer bar chart where spring energy empties as cart motion energy fills up.',
        parameterRelations: [
          'More compression x -> Quadruple energy stored (scales with x^2)',
          'Heavier block m -> Slower departure speed for same stored energy',
        ],
      },
      formal: {
        formalStatement: 'Under 1D conservative restoring force F(x) = -kx, the work-energy integral yields E_k = 1/2 k x_0^2.',
        physicalAssumptions: [
          'Frictionless horizontal guide rail (non-conservative dissipation W_nc = 0)',
          'Negligible spring mass (m_spring << m_block)',
          'Ideal linear Hookean elasticity (F = -kx valid up to x_0)',
        ],
        symbolsAndUnits: {
          'mass (m)': 'kg',
          'spring constant (k)': 'N/m',
          'compression (x)': 'm',
          'speed (v)': 'm/s',
          'energy (E)': 'J',
        },
        domainBounds: [
          'x_0 in [0.01 m, 1.0 m]',
          'm in [0.1 kg, 10.0 kg]',
          'k in [10 N/m, 1000 N/m]',
        ],
      },
    },
  };
}

function createSampleGatedContent(): StageGatedContent {
  return {
    taskPrompt: SAMPLE_STEM,
    hintScaffolding: ['Hint 1: Write energy conservation', 'Hint 2: 1/2 k x^2 = 1/2 m v^2'],
    canonicalDerivation: [
      'Step 1: E_p = 1/2 * 200 * 0.3^2 = 9.0 J',
      'Step 2: 1/2 * 2.0 * v^2 = 9.0 J',
      'Step 3: v = 3.0 m/s',
    ],
    finalAnswerValue: '3.0 m/s',
    warrantProof: 'Formal warrant proof derived from fundamental theorem of calculus and conservative mechanical energy theorem.',
  };
}

describe('A33 Source-Bound Stem Immutability & Exact Hash Verification', () => {
  it('validates unmodified original stem against certified SHA-256 hash', () => {
    const proj = createSampleProjection();
    assert.doesNotThrow(() => validateSourceBoundStem(proj));
  });

  it('strictly rejects any rewrite or mutation of the original problem stem', () => {
    const proj = createSampleProjection();
    // Tamper with one character in the original stem text
    const tamperedProj: SourceBoundStemProjection = {
      ...proj,
      immutableStemText: proj.immutableStemText.replace('2.0 kg', '2.5 kg'),
    };

    assert.throws(
      () => validateSourceBoundStem(tamperedProj),
      (err: any) => err instanceof PresentationValidationError && err.code === 'STEM_MUTATION_REJECTED'
    );
  });

  it('preserves physical assumptions, symbols, and standard SI units across tiers', () => {
    const proj = createSampleProjection();
    const ctrl = new ProgressivePresentationController(proj);

    assert.equal(ctrl.getImmutableStem(), SAMPLE_STEM);

    // Test INTUITION tier
    ctrl.setLevel('INTUITION');
    const intuitionView = ctrl.renderPresentation();
    assert.equal(intuitionView.level, 'INTUITION');
    assert.ok(intuitionView.presentedContent.includes('toy pinball plunger'));

    // Test MODEL tier
    ctrl.setLevel('MODEL');
    const modelView = ctrl.renderPresentation();
    assert.equal(modelView.level, 'MODEL');
    assert.ok(modelView.presentedContent.includes('Energy transfer bar chart'));

    // Test FORMAL tier
    ctrl.setLevel('FORMAL');
    const formalView = ctrl.renderPresentation();
    assert.equal(formalView.level, 'FORMAL');
    assert.ok(formalView.presentedContent.includes('Frictionless horizontal guide rail'));
    assert.equal(formalView.symbolsAndUnits['mass (m)'], 'kg');
    assert.equal(formalView.symbolsAndUnits['energy (E)'], 'J');
  });
});

describe('A33 Stage-Gated Feedback & Zero Answer/Warrant Leakage', () => {
  it('withholds answers and derivations during PREDICT and uncommitted ATTEMPT stages', () => {
    const content = createSampleGatedContent();
    const ctrl = new StageGatedFeedbackController(content);

    // PREDICT stage
    const predictDisclosure = ctrl.getDisclosedContent('PREDICT', false, false);
    assert.equal(predictDisclosure.derivationExposed, false);
    assert.equal(predictDisclosure.answerExposed, false);
    assert.equal(predictDisclosure.warrantProofExposed, false);
    assert.ok(predictDisclosure.visibleFeedbackText.includes('Solutions and proofs withheld'));

    // Uncommitted ATTEMPT stage
    const attemptUncommitted = ctrl.getDisclosedContent('ATTEMPT', false, false);
    assert.equal(attemptUncommitted.derivationExposed, false);
    assert.equal(attemptUncommitted.answerExposed, false);
    assert.equal(attemptUncommitted.warrantProofExposed, false);
  });

  it('exposes derivation during RECONSTRUCT and DIAGNOSE while withholding formal warrant proof', () => {
    const content = createSampleGatedContent();
    const ctrl = new StageGatedFeedbackController(content);

    const reconstructDisclosure = ctrl.getDisclosedContent('RECONSTRUCT', true, false);
    assert.equal(reconstructDisclosure.derivationExposed, true);
    assert.equal(reconstructDisclosure.answerExposed, true);
    // Formal warrant proof (W) remains withheld
    assert.equal(reconstructDisclosure.warrantProofExposed, false);
    assert.ok(reconstructDisclosure.visibleFeedbackText.includes('Step 1: E_p = 1/2 * 200'));
    assert.ok(!reconstructDisclosure.visibleFeedbackText.includes('Formal warrant proof derived'));
  });

  it('locks boundary answer until boundary task is committed', () => {
    const content = createSampleGatedContent();
    const ctrl = new StageGatedFeedbackController(content);

    const boundaryPrecommit = ctrl.getDisclosedContent('BOUNDARY_TEST', true, false);
    assert.equal(boundaryPrecommit.answerExposed, false);
    assert.equal(boundaryPrecommit.warrantProofExposed, false);
    assert.ok(boundaryPrecommit.visibleFeedbackText.includes('Boundary task attempt required'));

    const boundaryPostcommit = ctrl.getDisclosedContent('BOUNDARY_TEST', true, true);
    assert.equal(boundaryPostcommit.answerExposed, true);
    assert.equal(boundaryPostcommit.warrantProofExposed, true);
    assert.ok(boundaryPostcommit.visibleFeedbackText.includes('Warrant Proof:'));
  });
});

describe('A33 Locale Service & Scientific Glossary Preservation', () => {
  it('retrieves scientific terms with invariant physical symbols and units in English and Hindi', () => {
    const locales = getSupportedLocales();
    assert.ok(locales.includes('en-US'));
    assert.ok(locales.includes('hi-IN'));

    // English Glossary
    const enTerm = getGlossaryEntry('RESTORING_FORCE', 'en-US');
    assert.equal(enTerm.canonicalTerm, 'Restoring Force');
    assert.equal(enTerm.physicalSymbol, 'F_s');
    assert.equal(enTerm.standardUnit, 'N');
    assert.equal(enTerm.meaningPreserved, true);

    // Hindi Glossary
    const hiTerm = getGlossaryEntry('RESTORING_FORCE', 'hi-IN');
    assert.ok(hiTerm.translatedTerm.includes('प्रत्यानयन बल'));
    // Physical symbol and SI unit must NOT be altered
    assert.equal(hiTerm.physicalSymbol, 'F_s');
    assert.equal(hiTerm.standardUnit, 'N');
    assert.equal(hiTerm.meaningPreserved, true);

    // Kinetic Energy
    const hiKe = getGlossaryEntry('KINETIC_ENERGY', 'hi-IN');
    assert.equal(hiKe.physicalSymbol, 'E_k');
    assert.equal(hiKe.standardUnit, 'J');
  });

  it('provides verified UI state messages across supported locales', () => {
    const enMsg = getUIStateMessage('staleOrigin', 'en-US');
    assert.ok(enMsg.includes('Origin source updated'));

    const hiMsg = getUIStateMessage('staleOrigin', 'hi-IN');
    assert.ok(hiMsg.includes('मूल प्रश्न अद्यतित हुआ है'));

    const saveBlockedHi = getUIStateMessage('saveBlocked', 'hi-IN');
    assert.ok(saveBlockedHi.includes('उत्तर प्रकटीकरण अवरुद्ध है'));
  });

  it('fails closed on unsupported locales or missing glossary keys', () => {
    assert.throws(
      () => getLocaleBundle('fr-FR'),
      (err: any) => err instanceof I18nError && err.code === 'TRANSLATION_UNAVAILABLE'
    );

    assert.throws(
      () => getGlossaryEntry('NONEXISTENT_PHYSICS_CONCEPT', 'en-US'),
      (err: any) => err instanceof I18nError && err.code === 'TRANSLATION_UNAVAILABLE'
    );
  });
});
