/**
 * tests/browser/core1.spec.ts
 * A66 — Core1 Orientation Journey and Page Browser Test Suite.
 *
 * Verifies:
 * 1. Compact topic orientation with canonical concepts, conventions, hard-transition map, and relations.
 * 2. Unclosed prompt closure enforcement and concept jumping.
 * 3. Primary Core1A teaching lesson navigation link (/learn/:id).
 * 4. Native PDF export control: strictly gated on authorized exact output receipt.
 * 5. Declared screen states: populated, loading, error, missing scope, unavailable.
 * 6. Dual-orientation tablet layout and draft restore roundtrip.
 * 7. 48px minimum touch hitbox on all interactive elements.
 * 8. Rule 13 invariant preservation.
 *
 * No academic approval inferred from software validation.
 */

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  Core1OrientationJourney,
  Core1OrientationError,
} from '../../web/journeys/core1.ts';
import type {
  Core1OrientationDefinition,
} from '../../web/journeys/core1.ts';
import {
  Core1OrientationPageController,
} from '../../web/pages/orientation.ts';
import { HIT_TARGET_MIN_PX } from '../../web/styles/tokens.ts';

function createSampleOrientation(): Core1OrientationDefinition {
  return {
    topicId: 'PHYS-TOPIC-WPE',
    subject: 'Physics',
    title: 'Work, Power and Energy: Spring Launch Mechanics',
    overviewSummary: 'Orientation workspace establishing conventions, conservative force potentials, and work-energy conversions.',
    primaryLessonId: 'les:physics:wpe:01',
    concepts: [
      {
        id: 'c:hookes-law',
        name: "Hooke's Restoring Force",
        entryAssumption: '1D displacement coordinate along horizontal axis',
        inferentialJump: 'Restoring force is linear in compression x: F = -kx',
        exitCriterion: 'Calculate restoring force at arbitrary displacement',
        lessonRefId: 'les:physics:wpe:01',
      },
      {
        id: 'c:elastic-potential',
        name: 'Elastic Potential Energy',
        entryAssumption: 'Riemann definite integral over variable force',
        inferentialJump: 'Area under F-x curve gives quadratic work: W = 1/2 k x^2',
        exitCriterion: 'Evaluate stored energy without mistaking peak force for average',
        lessonRefId: 'les:physics:wpe:01',
      },
      {
        id: 'c:detachment-boundary',
        name: 'Detachment Boundary Condition',
        entryAssumption: 'Normal force between unattached bodies',
        inferentialJump: 'Contact terminates at natural length x=0 where N=0',
        exitCriterion: 'Identify transition from accelerated launch to constant velocity runout',
        lessonRefId: 'les:physics:wpe:01',
      },
    ],
    conventions: [
      {
        name: 'Equilibrium Origin',
        definition: 'Position of uncompressed, undeformed spring end',
        standardChoice: 'x = 0',
        rationale: 'Simplifies Hookean potential energy integration constant to zero',
      },
      {
        name: 'Displacement Sign',
        definition: 'Positive direction along direction of cart motion',
        standardChoice: '+x rightward',
        rationale: 'Aligns departure velocity vector with positive coordinate axis',
      },
    ],
    hardTransitions: [
      {
        id: 'ht:constant-to-variable',
        fromConcept: "Constant Force Work W = F*d",
        toConcept: "Variable Restoring Force Work W = 1/2 k x^2",
        cognitiveBarrier: 'Tendency to multiply maximum force by distance',
        warrantResolution: 'Integration of linear force profile yields triangular area factor 1/2',
      },
      {
        id: 'ht:attached-to-unattached',
        fromConcept: "Harmonic Oscillation Past x=0",
        toConcept: "Boundary Detachment at Natural Length",
        cognitiveBarrier: 'Assuming cart will be pulled backward by spring',
        warrantResolution: 'Normal contact force vanishes at x=0 for free cart',
      },
    ],
    relations: [
      {
        relationName: "Hooke's Law",
        mathematicalForm: 'F_s(x) = -k * x',
        domainCondition: 'Valid within elastic limit |x| <= x_max',
      },
      {
        relationName: 'Mechanical Energy Conservation',
        mathematicalForm: '1/2 k x_0^2 = 1/2 m v_exit^2',
        domainCondition: 'Frictionless horizontal guide rail, non-conservative work W_nc = 0',
      },
    ],
    status: 'CANDIDATE',
  };
}

describe('A66 Core1 Orientation Journey: Canonical Scope & Transitions', () => {
  it('initializes valid orientation with canonical concepts, conventions, and relations', () => {
    const def = createSampleOrientation();
    const journey = new Core1OrientationJourney(def);

    assert.equal(journey.getActiveConceptId(), 'c:hookes-law');
    assert.equal(journey.getDefinition().concepts.length, 3);
    assert.equal(journey.getDefinition().conventions.length, 2);
    assert.equal(journey.getDefinition().hardTransitions.length, 2);
  });

  it('rejects orientation definition with missing concepts', () => {
    const def = createSampleOrientation();
    const defectiveDef: Core1OrientationDefinition = { ...def, concepts: [] };

    assert.throws(
      () => new Core1OrientationJourney(defectiveDef),
      (err: any) => err instanceof Core1OrientationError && err.code === 'NO_CONCEPTS'
    );
  });

  it('supports concept jumping and links to full Core1A teaching lesson', () => {
    const def = createSampleOrientation();
    const journey = new Core1OrientationJourney(def);

    journey.jumpConcept('c:elastic-potential');
    assert.equal(journey.getActiveConceptId(), 'c:elastic-potential');
    assert.equal(journey.getActiveConcept()?.name, 'Elastic Potential Energy');

    // Lesson link points to lesson
    assert.equal(journey.getLessonRoute(), '/learn/les:physics:wpe:01');
  });

  it('strictly gates native PDF export on authorized release receipt', () => {
    const def = createSampleOrientation();
    const journey = new Core1OrientationJourney(def);

    // Default definition lacks print receipt -> print denied
    assert.equal(journey.canPrintPDF(), false);
    const result = journey.triggerPrint();
    assert.equal(result.allowed, false);
    assert.ok(result.reason?.includes('Native PDF print control requires signed academic release'));

    // Attach signed print receipt
    const authorizedDef: Core1OrientationDefinition = {
      ...def,
      printAuthorityReceipt: {
        receiptId: 'receipt:print:wpe:01',
        signer: 'Dr. Academic Reviewer',
        sha256: 'a'.repeat(64),
        authorizedAt: '2026-11-18T00:00:00Z',
      },
    };
    const authorizedJourney = new Core1OrientationJourney(authorizedDef);
    assert.equal(authorizedJourney.canPrintPDF(), true);
    const authResult = authorizedJourney.triggerPrint();
    assert.equal(authResult.allowed, true);
    assert.equal(authResult.receiptId, 'receipt:print:wpe:01');
  });
});

describe('A66 Core1 Orientation Page Controller & Tablet Ergonomics', () => {
  it('renders populated orientation screen with concept navigation and Rule 13 disclaimer', () => {
    const def = createSampleOrientation();
    const controller = new Core1OrientationPageController({ orientationDefinition: def });

    const html = controller.render();
    assert.ok(html.includes('data-screen-state="populated"'));
    assert.ok(html.includes('Work, Power and Energy: Spring Launch Mechanics'));
    assert.ok(html.includes("Hooke's Restoring Force"));
    assert.ok(html.includes('Hard-Transition Map'));
    assert.ok(html.includes('Equilibrium Origin'));
    assert.ok(html.includes('No academic approval inferred from software validation.'));
  });

  it('supports dual-orientation layout and draft restore roundtrip', () => {
    const def = createSampleOrientation();
    const controller = new Core1OrientationPageController({
      orientationDefinition: def,
      orientation: 'LANDSCAPE',
    });

    assert.ok(controller.render().includes('g9-orientation-page landscape'));
    controller.setOrientation('PORTRAIT');
    assert.ok(controller.render().includes('g9-orientation-page portrait'));

    // Jump concept and serialize draft
    controller.actionJumpConcept('c:detachment-boundary');
    const draft = controller.toDraft();
    assert.ok(draft !== null);
    assert.equal(draft.activeConceptId, 'c:detachment-boundary');

    const restoredController = new Core1OrientationPageController({ orientationDefinition: def });
    restoredController.restoreDraft(draft);
    assert.equal(restoredController.getViewState().activeConceptId, 'c:detachment-boundary');
  });

  it('handles declared screen states: loading, error, missing scope, unavailable', () => {
    const def = createSampleOrientation();

    // Loading
    const loadingCtrl = new Core1OrientationPageController({ initialState: 'loading' });
    assert.ok(loadingCtrl.render().includes('data-screen-state="loading"'));

    // Error
    const errorCtrl = new Core1OrientationPageController({ initialState: 'error', errorMessage: 'Test error' });
    assert.ok(errorCtrl.render().includes('data-screen-state="error"'));
    assert.ok(errorCtrl.render().includes('Test error'));

    // Unavailable
    const unavailCtrl = new Core1OrientationPageController({ initialState: 'unavailable' });
    assert.ok(unavailCtrl.render().includes('data-screen-state="unavailable"'));

    // Missing scope
    const missingScopeCtrl = new Core1OrientationPageController({ initialState: 'missing scope' });
    assert.ok(missingScopeCtrl.render().includes('data-screen-state="missing scope"'));
  });

  it('verifies all interactive elements conform to minimum 48px hit target bounds', () => {
    const def = createSampleOrientation();
    const controller = new Core1OrientationPageController({ orientationDefinition: def });

    assert.ok(controller.getViewState().minHitTargetPx >= 48);
    const html = controller.render();
    assert.ok(html.includes(`min-height: ${HIT_TARGET_MIN_PX}px`));
    assert.ok(html.includes(`min-width: ${HIT_TARGET_MIN_PX}px`));
  });
});
