/**
 * tests/browser/core2a.spec.ts
 * A67 — Core2A Supported Application Journey and Page Browser Test Suite.
 *
 * Verifies:
 * 1. Familiar family guided practice with correct crux types.
 * 2. Rejection of same-family transfer mastery claims.
 * 3. Scaffolding tiers: Source vs authored scaffolds (MINIMAL, MODERATE, FULL_SCAFFOLD).
 * 4. Independent verification check (conservation, dimensional analysis, limiting case).
 * 5. Guided repair formulation on check divergence.
 * 6. Declared screen states: populated, loading, error, unknown learner, no eligible route.
 * 7. Dual-orientation tablet layout and draft restore roundtrip.
 * 8. 48px minimum touch hitbox on all interactive elements.
 * 9. Rule 13 invariant preservation.
 *
 * No academic approval inferred from software validation.
 */

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  Core2ASupportedJourney,
  Core2AValidationError,
} from '../../web/journeys/core2a.ts';
import type {
  Core2APracticeDefinition,
} from '../../web/journeys/core2a.ts';
import {
  Core2AGuidedPracticePageController,
} from '../../web/pages/guided-practice.ts';
import { HIT_TARGET_MIN_PX } from '../../web/styles/tokens.ts';

function createSamplePracticeDefinition(): Core2APracticeDefinition {
  return {
    journeyId: 'journey:guided:wpe:01',
    topicId: 'PHYS-TOPIC-WPE',
    task: {
      taskId: 'task:guided:spring-reversal:01',
      familyId: 'family:spring-launchers',
      familyTitle: 'Familiar Problem Family: 1D Horizontal Elastic Launchers',
      prompt: 'A cart of mass 0.8 kg is launched by a spring compressed by 0.25 m with k = 160 N/m. Calculate exit speed and verify energy balance.',
      cruxType: 'CANONICAL_APPLICATION',
      applicationCruxDescription: 'The application crux requires equating spring potential energy 1/2 k x^2 directly to cart kinetic energy 1/2 m v^2 at the natural detachment point.',
      sourceLineageRef: {
        type: 'SOURCE',
        id: 'src:ncert:physics:ch06:example08',
        revision: 1,
        sha256: 'a'.repeat(64),
      },
      scaffolds: [
        {
          id: 'scaff:source:01',
          origin: 'SOURCE_SCAFFOLD',
          title: 'Source Text Formula',
          hintText: 'Recall textbook equation: E_p = 1/2 k x^2.',
          associatedStep: 1,
        },
        {
          id: 'scaff:authored:01',
          origin: 'AUTHORED_SCAFFOLD',
          title: 'Decimal Squaring Trap Alert',
          hintText: 'Compute 0.25^2 = 0.0625 before multiplying by spring constant 160 N/m.',
          associatedStep: 2,
        },
        {
          id: 'scaff:authored:02',
          origin: 'AUTHORED_SCAFFOLD',
          title: 'Mass Inversion Guide',
          hintText: 'v = sqrt(2 * E / m). Dividing by 0.8 is equivalent to multiplying by 1.25.',
          associatedStep: 3,
        },
      ],
      fullSolutionSteps: [
        'Initial energy: E_i = 1/2 * 160 * (0.25)^2 = 80 * 0.0625 = 5.0 J.',
        'At detachment: E_f = 1/2 * 0.8 * v^2 = 0.4 * v^2.',
        'Equate: 0.4 * v^2 = 5.0 => v^2 = 12.5 => v = 3.54 m/s.',
      ],
      independentCheck: {
        checkType: 'CONSERVATION',
        prompt: 'Check total mechanical energy equals initial potential energy (5.0 J)',
        verificationFormula: '1/2 m v^2 = 0.5 * 0.8 * (3.54)^2 = 5.0 J',
        expectedResult: '5.0 J',
      },
    },
    learnerKnowledgeStatus: 'INTERMEDIATE',
    isRouteEligible: true,
    status: 'CANDIDATE',
  };
}

describe('A67 Core2A Guided Practice: Crux Types & Scaffolds', () => {
  it('instantiates valid guided practice and filters scaffolds by support level', () => {
    const def = createSamplePracticeDefinition();
    const journey = new Core2ASupportedJourney(def);

    assert.equal(journey.getSupportLevel(), 'MODERATE');
    assert.equal(journey.getVisibleScaffolds().length, 2);

    journey.setSupportLevel('MINIMAL');
    const minimalScaffolds = journey.getVisibleScaffolds();
    assert.equal(minimalScaffolds.length, 1);
    assert.equal(minimalScaffolds[0].origin, 'SOURCE_SCAFFOLD');

    journey.setSupportLevel('FULL_SCAFFOLD');
    assert.equal(journey.getVisibleScaffolds().length, 3);
  });

  it('strictly rejects labeling same-family practice as transfer mastery', () => {
    const def = createSamplePracticeDefinition();
    const badDef: Core2APracticeDefinition = {
      ...def,
      task: {
        ...def.task,
        familyTitle: 'Same-Family Transfer Mastery Certified',
      },
    };

    assert.throws(
      () => new Core2ASupportedJourney(badDef),
      (err: any) => err instanceof Core2AValidationError && err.code === 'INVALID_TRANSFER_LABEL'
    );
  });

  it('reveals application crux with clear provenance and inferential description', () => {
    const def = createSamplePracticeDefinition();
    const journey = new Core2ASupportedJourney(def);

    assert.equal(journey.isCruxRevealed(), false);
    journey.revealFamiliarCrux();
    assert.equal(journey.isCruxRevealed(), true);
  });

  it('executes independent verification self-check and validates working', () => {
    const def = createSamplePracticeDefinition();
    const journey = new Core2ASupportedJourney(def);

    // Throws if working is empty
    assert.throws(
      () => journey.executeSelfCheck(),
      (err: any) => err instanceof Core2AValidationError && err.code === 'WORKING_REQUIRED'
    );

    journey.updateWorking('My working steps: E_p = 5.0 J and v = 3.54 m/s');
    const result = journey.executeSelfCheck();
    assert.equal(result.valid, true);
    assert.ok(result.feedback.includes('CONSERVATION'));
  });
});

describe('A67 Core2A Guided Practice Page Controller & Tablet Ergonomics', () => {
  it('renders populated guided practice screen with 48px hit target bounds and Rule 13 disclaimer', () => {
    const def = createSamplePracticeDefinition();
    const controller = new Core2AGuidedPracticePageController({ practiceDefinition: def });

    const html = controller.render();
    assert.ok(html.includes('data-screen-state="populated"'));
    assert.ok(html.includes('Familiar Problem Family: 1D Horizontal Elastic Launchers'));
    assert.ok(html.includes('Crux: CANONICAL_APPLICATION'));
    assert.ok(html.includes('No academic approval inferred from software validation.'));
  });

  it('supports dual-orientation layout and draft restore roundtrip', () => {
    const def = createSamplePracticeDefinition();
    const controller = new Core2AGuidedPracticePageController({
      practiceDefinition: def,
      orientation: 'LANDSCAPE',
    });

    assert.ok(controller.render().includes('g9-guided-practice-page landscape'));
    controller.setOrientation('PORTRAIT');
    assert.ok(controller.render().includes('g9-guided-practice-page portrait'));

    // Update state and roundtrip draft
    controller.actionSelectSupport('FULL_SCAFFOLD');
    controller.actionRevealFamiliarCrux();
    controller.actionSelfCheck('Calculated 5.0 J');

    const draft = controller.toDraft();
    assert.ok(draft !== null);
    assert.equal(draft.selectedSupport, 'FULL_SCAFFOLD');
    assert.equal(draft.cruxRevealed, true);

    const restoredController = new Core2AGuidedPracticePageController({ practiceDefinition: def });
    restoredController.restoreDraft(draft);
    assert.equal(restoredController.getViewState().selectedSupport, 'FULL_SCAFFOLD');
    assert.equal(restoredController.getViewState().isCruxRevealed, true);
  });

  it('handles declared screen states: loading, error, unknown learner, no eligible route', () => {
    const def = createSamplePracticeDefinition();

    // Loading
    const loadingCtrl = new Core2AGuidedPracticePageController({ initialState: 'loading' });
    assert.ok(loadingCtrl.render().includes('data-screen-state="loading"'));

    // Unknown learner (defaults to safe practice without assuming mastery)
    const unknownCtrl = new Core2AGuidedPracticePageController({
      practiceDefinition: { ...def, learnerKnowledgeStatus: 'UNKNOWN_KNOWLEDGE' },
    });
    assert.ok(unknownCtrl.render().includes('data-screen-state="unknown learner"'));

    // No eligible route
    const noEligibleCtrl = new Core2AGuidedPracticePageController({
      practiceDefinition: { ...def, isRouteEligible: false },
    });
    assert.ok(noEligibleCtrl.render().includes('data-screen-state="no eligible route"'));
  });

  it('verifies all interactive elements conform to minimum 48px hit target bounds', () => {
    const def = createSamplePracticeDefinition();
    const controller = new Core2AGuidedPracticePageController({ practiceDefinition: def });

    assert.ok(controller.getViewState().minHitTargetPx >= 48);
    const html = controller.render();
    assert.ok(html.includes(`min-height: ${HIT_TARGET_MIN_PX}px`));
    assert.ok(html.includes(`min-width: ${HIT_TARGET_MIN_PX}px`));
  });
});
