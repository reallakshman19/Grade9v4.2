import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  CHEMISTRY_SUBJECT_DETAIL,
  SubjectScreenController,
} from '../../web/pages/subject.ts';
import {
  CHEM_REDOX_TOPIC,
  CHEM_BONDING_TOPIC,
  CHEM_STOICHIOMETRY_TOPIC,
  CHEM_REDOX_DECK,
  CHEM_BONDING_DECK,
  CHEM_STOICHIOMETRY_DECK,
} from '../../web/pages/topic.ts';
import { RedoxAdaptiveController } from '../../web/pages/redox-adaptive.ts';
import { TitrationSimulatorController } from '../../web/pages/titration.ts';

describe('Gate P7-G1: Chemistry Curriculum Fidelity & Question Inventory Provenance', () => {
  it('mounts Chemistry subject screen with 3 verified curriculum topics and strand filtering', () => {
    assert.equal(CHEMISTRY_SUBJECT_DETAIL.id, 'chemistry');
    assert.equal(CHEMISTRY_SUBJECT_DETAIL.code, 'CHEMISTRY');
    assert.equal(CHEMISTRY_SUBJECT_DETAIL.topics.length, 3);

    const controller = new SubjectScreenController(CHEMISTRY_SUBJECT_DETAIL);
    const viewState = controller.getViewState();

    assert.equal(viewState.status, 'POPULATED');
    assert.equal(viewState.totalItemCount, 12); // 4 + 4 + 4
    assert.equal(viewState.visibleTopics.length, 3);

    // Filter by Inorganic Chemistry
    controller.setStrandFilter('Inorganic Chemistry');
    const inorgState = controller.getViewState();
    assert.equal(inorgState.visibleTopics.length, 2);
    assert.ok(inorgState.visibleTopics.some((t) => t.code === 'CHEM_REDOX'));
    assert.ok(inorgState.visibleTopics.some((t) => t.code === 'CHEM_BONDING'));

    // Filter by Analytical Chemistry
    controller.setStrandFilter('Analytical Chemistry');
    const analState = controller.getViewState();
    assert.equal(analState.visibleTopics.length, 1);
    assert.equal(analState.visibleTopics[0]!.code === 'CHEM_STOICHIOMETRY', true);

    // Reset filter
    controller.setStrandFilter(null);
    assert.equal(controller.getViewState().visibleTopics.length, 3);
  });

  it('validates authentic v3.5 pinned source occurrences vs synthetic diagnostic fixtures', () => {
    // Exactly 12 questions in inventory
    const allQuestions = [...CHEM_REDOX_DECK, ...CHEM_BONDING_DECK, ...CHEM_STOICHIOMETRY_DECK];
    assert.equal(allQuestions.length, 12);

    // Verify Redox Deck Provenance
    assert.equal(CHEM_REDOX_DECK.length, 4);
    const pinnedRedox = CHEM_REDOX_DECK.filter((q) => q.sourceProvenance === 'AUTHENTIC_SOURCE_PINNED');
    assert.equal(pinnedRedox.length, 3);
    for (const q of pinnedRedox) {
      assert.ok(q.sourceRef.includes('Grade9v3.5'));
      assert.ok(q.sourceRef.includes('adaptive-hard-concept-proof.html'));
      assert.equal(q.keyStatus, 'VERIFIED');
    }

    const syntheticRedox = CHEM_REDOX_DECK.filter((q) => q.sourceProvenance === 'SYNTHETIC_DIAGNOSTIC_FIXTURE');
    assert.equal(syntheticRedox.length, 1);
    assert.equal(syntheticRedox[0]!.code, 'RED-04');

    // Verify Bonding Deck (All 4 badged SYNTHETIC_DIAGNOSTIC_FIXTURE)
    assert.equal(CHEM_BONDING_DECK.length, 4);
    assert.ok(CHEM_BONDING_DECK.every((q) => q.sourceProvenance === 'SYNTHETIC_DIAGNOSTIC_FIXTURE'));

    // Verify Stoichiometry Deck (All 4 badged SYNTHETIC_DIAGNOSTIC_FIXTURE)
    assert.equal(CHEM_STOICHIOMETRY_DECK.length, 4);
    assert.ok(CHEM_STOICHIOMETRY_DECK.every((q) => q.sourceProvenance === 'SYNTHETIC_DIAGNOSTIC_FIXTURE'));
  });

  it('verifies all 12 chemistry items have valid stems, non-empty explanations, and point bounds [1..5]', () => {
    const allQuestions = [...CHEM_REDOX_DECK, ...CHEM_BONDING_DECK, ...CHEM_STOICHIOMETRY_DECK];
    for (const q of allQuestions) {
      assert.ok(q.stemText.length > 20, `Question ${q.code} stem too short`);
      assert.ok(q.explanationHtml.length > 20, `Question ${q.code} explanation too short`);
      assert.ok(q.maxPoints >= 1 && q.maxPoints <= 5, `Question ${q.code} maxPoints out of bounds`);
      assert.equal(q.kind, 'INTEGER');
    }
  });
});

describe('Gate P7-G2: N09 Security & Custody Transparency', () => {
  it('verifies Redox Adaptive Workbench is transparently badged as formative diagnostic drill', () => {
    const redoxCtrl = new RedoxAdaptiveController();
    const html = redoxCtrl.renderHtml();

    // Must visibly display formative diagnostic practice notice
    assert.ok(
      html.includes('Formative Self-Check · Diagnostic Practice (HOLD)'),
      'Missing formative self-check badge in Redox Adaptive rendered HTML'
    );
    assert.ok(
      html.includes('Local verification only; disclaims secure examination assessment'),
      'Missing secure assessment disclaimer in Redox Adaptive rendered HTML'
    );
  });

  it('verifies Volumetric Titration Simulator is transparently badged as formative diagnostic exploration', () => {
    const titrCtrl = new TitrationSimulatorController();
    const html = titrCtrl.renderHtml();

    // Must visibly display formative practice badge
    assert.ok(
      html.includes('Formative Self-Check · Diagnostic Exploration (HOLD)'),
      'Missing formative self-check badge in Titration Simulator rendered HTML'
    );
    assert.ok(
      html.includes('Local simulated equilibrium only; disclaims formal laboratory practical evaluation'),
      'Missing formal lab disclaimer in Titration Simulator rendered HTML'
    );
  });

  it('adversarial check: verifies zero raw answer keys leak into DOM data attributes or inspectable markers', () => {
    const redoxCtrl = new RedoxAdaptiveController();
    const redoxHtml = redoxCtrl.renderHtml();

    // Adversarial scan of Redox Adaptive HTML
    assert.doesNotMatch(redoxHtml, /data-correct/);
    assert.doesNotMatch(redoxHtml, /data-answer-key/);
    assert.doesNotMatch(redoxHtml, /data-correct-choice/);

    const titrCtrl = new TitrationSimulatorController();
    const titrHtml = titrCtrl.renderHtml();

    // Adversarial scan of Titration Simulator HTML
    assert.doesNotMatch(titrHtml, /data-correct/);
    assert.doesNotMatch(titrHtml, /data-answer-key/);
  });
});
