/**
 * tests/runtime/test_standalone_workbenches.spec.ts
 * Wave 15 — Unit Test Suite for HTML Execution Contexts, Interactive GCDR Explorers,
 * and Standalone Interactive Workbenches Parity.
 *
 * Verifies:
 * - 24 GCDR Explorer Configurations across Physics (19), Chemistry (4), and Mathematics (1)
 * - getExplorerConfig dynamic resolution, normalization, and safe fallback
 * - GCDR Explorer Page Controller state lifecycle, progression stages, and helper drawers
 * - Exactness badge declarations (no false academic claims)
 * - STANDALONE_LABS_CATALOG expansion covering all 21 reconciled standalone labs and suites
 * - Base-aware Router dispatching for /explorer/:explorerId and /lab/:labId
 * - Fault N09 Answer Isolation and 48px touch ergonomics compliance
 */

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  EXPLORER_ENTRIES,
  getExplorerConfig,
} from '../../web/pages/explorer-catalog.ts';
import {
  GcdrExplorerPageController,
} from '../../web/pages/explorer.ts';
import {
  GCDR_ORDERED_STAGES,
} from '../../web/journeys/explorer.ts';
import {
  STANDALONE_LABS_CATALOG,
  RECONCILED_STANDALONE_LABS_CATALOG,
  UNIFIED_STANDALONE_LABS_CATALOG,
  LabsHubController,
} from '../../web/pages/labs-hub.ts';
import { Router } from '../../web/app/router.ts';

describe('Wave 15: HTML Execution Contexts & Standalone Workbenches Parity', () => {
  it('1. Reconciles all 24 canonical GCDR Explorer configurations across STEM disciplines', () => {
    assert.equal(EXPLORER_ENTRIES.length, 24, 'Must have exactly 24 explorer configurations');

    const physExplorers = EXPLORER_ENTRIES.filter((e) => e.subject === 'Physics');
    const chemExplorers = EXPLORER_ENTRIES.filter((e) => e.subject === 'Chemistry');
    const mathExplorers = EXPLORER_ENTRIES.filter((e) => e.subject === 'Mathematics');

    assert.equal(physExplorers.length, 19, 'Must have exactly 19 Physics explorers');
    assert.equal(chemExplorers.length, 4, 'Must have exactly 4 Chemistry explorers');
    assert.equal(mathExplorers.length, 1, 'Must have exactly 1 Mathematics explorer');

    for (const entry of EXPLORER_ENTRIES) {
      assert.ok(entry.id.length > 2, `Explorer ID must be valid: ${entry.id}`);
      assert.ok(entry.title.length > 5, `Explorer title must be substantive for ${entry.id}`);
      assert.ok(entry.topic.length > 2, `Topic required for ${entry.id}`);
      assert.ok(entry.strand.length > 2, `Strand required for ${entry.id}`);
      assert.ok(entry.description.length > 15, `Description required for ${entry.id}`);
      assert.ok(entry.formulaBadge.length > 0, `Formula badge required for ${entry.id}`);
      assert.ok(['NUMERICAL_EXACT', 'QUALITATIVE_SYNTHETIC', 'APPROXIMATE'].includes(entry.fidelity));
      assert.ok(['CANONICAL_BINDING', 'PARTIAL_BINDING', 'UNBOUND_EXTENSION'].includes(entry.binding));
    }
  });

  it('2. Resolves explorer configurations with case and delimiter insensitivity', () => {
    // Exact ID
    const cfg1 = getExplorerConfig('motion-in-a-plane');
    assert.equal(cfg1.explorerId, 'motion-in-a-plane');
    assert.equal(cfg1.subject, 'Physics');

    // Underscore variant
    const cfg2 = getExplorerConfig('behaviour_of_gases');
    assert.equal(cfg2.explorerId, 'behaviour_of_gases');
    assert.equal(cfg2.subject, 'Chemistry');

    // Dashed variant of underscored ID
    const cfg2Dash = getExplorerConfig('behaviour-of-gases');
    assert.equal(cfg2Dash.explorerId, 'behaviour_of_gases');

    // Chemical bonding
    const cfg3 = getExplorerConfig('chemical_bonding');
    assert.equal(cfg3.subject, 'Chemistry');

    // Vector algebra
    const cfg4 = getExplorerConfig('vector_algebra');
    assert.equal(cfg4.subject, 'Mathematics');

    // Unknown ID fallback
    const cfgFallback = getExplorerConfig('novel-quantum-lab');
    assert.ok(cfgFallback.title.includes('Novel Quantum Lab'));
    assert.ok(cfgFallback.helpers.exactnessBadge.academicClaimDisclaimer.includes('PROTECTED_FALSE_CLAIM'));
  });

  it('3. Enforces Truthful Exactness Badge and Anti-Proof Invariant on all Explorers', () => {
    for (const entry of EXPLORER_ENTRIES) {
      const cfg = getExplorerConfig(entry.id);
      assert.ok(cfg.helpers.exactnessBadge, `Exactness badge required for ${entry.id}`);
      assert.ok(
        cfg.helpers.exactnessBadge.academicClaimDisclaimer.includes('PROTECTED_FALSE_CLAIM') ||
        cfg.helpers.exactnessBadge.academicClaimDisclaimer.includes('academic proof requires formal derivation'),
        `Disclaimers must disallow software ratification as proof for ${entry.id}`
      );
      assert.ok(cfg.helpers.chalkboardNote, `Teacher's chalkboard note must exist for ${entry.id}`);
      assert.ok(cfg.helpers.trapAlert, `Trap alert must exist for ${entry.id}`);
    }
  });

  it('4. Powers full 10-stage GCDR exploration lifecycle via GcdrExplorerPageController', () => {
    const config = getExplorerConfig('atwood-pulleys');
    const controller = new GcdrExplorerPageController(config);
    const journey = controller.getJourney();

    assert.equal(journey.getCurrentStage(), 'PREDICT');
    assert.equal(journey.getCurrentStageIndex(), 0);

    // Initial view state
    const viewState = controller.getViewState();
    assert.equal(viewState.title, config.title);
    assert.equal(viewState.currentStage, 'PREDICT');
    assert.equal(viewState.orientation, 'LANDSCAPE');
    assert.ok(viewState.minHitTargetPx >= 48, 'Minimum hit target must be >= 48px');

    // Cannot advance without a nonempty response
    const advanceEmpty = journey.advance();
    assert.equal(advanceEmpty.success, false);

    // Set response and advance through stages
    assert.ok(journey.setStageResponse('PREDICT', 'Coupled acceleration will depend on mass ratio.'));
    const advancePredict = journey.advance();
    assert.equal(advancePredict.success, true);
    assert.equal(journey.getCurrentStage(), 'MANIPULATE');

    // Rotate orientation
    controller.setOrientation('PORTRAIT');
    assert.equal(controller.getOrientation(), 'PORTRAIT');
    controller.setOrientation('LANDSCAPE');
    assert.equal(controller.getOrientation(), 'LANDSCAPE');

    // Toggle helper drawers
    controller.toggleHelperDrawer('CHALKBOARD');
    assert.equal(controller.getActiveHelperDrawer(), 'CHALKBOARD');
    controller.toggleHelperDrawer('CHALKBOARD');
    assert.equal(controller.getActiveHelperDrawer(), null);

    // Verify all 10 stages exist in progression
    assert.equal(GCDR_ORDERED_STAGES.length, 10);
    assert.deepEqual(GCDR_ORDERED_STAGES, [
      'PREDICT',
      'MANIPULATE',
      'OBSERVE',
      'CONTRADICT',
      'DECONSTRUCT',
      'RECONSTRUCT',
      'INVARIANT',
      'BOUNDARY',
      'FADE',
      'TRANSFER',
    ]);
  });

  it('5. Reconciles all 21 Standalone Labs & Suites in UNIFIED_STANDALONE_LABS_CATALOG', () => {
    assert.equal(RECONCILED_STANDALONE_LABS_CATALOG.length, 21, 'Must have exactly 21 reconciled standalone labs');
    assert.equal(STANDALONE_LABS_CATALOG.length, 16, 'Baseline catalog must have 16 labs');
    assert.equal(UNIFIED_STANDALONE_LABS_CATALOG.length, 37, 'Unified catalog must have exactly 37 labs');

    const requiredLabIds = [
      'chemistry-redox-adaptive-hard-concept-proof',
      'chemistry-redox-reactions-master-suite',
      'core2-mathematics-circles-grade9-master',
      'mathematics-imo-grade9-master-suite',
      'core1a-physics-motion-2d-ncert-tablet',
      'core1a-physics-nlm-tablet',
      'core1a-physics-vectors-tablet',
      'phy-kin-2d-motion',
      'phy-nlm-first-law',
      'physics-motion-in-a-plane-interactive-suite',
      'core1a-motion-1d-straight-line-tablet',
      'core1a-motion-in-a-plane-tablet',
      'core1a-sba-06-07-trajectory-and-height-tablet',
      'core1a-sba-motion-in-a-plane-master-tablet',
      'core1a-vector-add-sub-tablet',
      'core2-motion-1d-straight-line-tablet',
      'core2-motion-consolidated-practice-tablet',
      'core2-motion-in-a-plane-tablet',
      'core2a-projectile-study',
      'motion-in-2d-master-suite',
      'standalone-core-learning',
    ];

    for (const reqId of requiredLabIds) {
      const found = UNIFIED_STANDALONE_LABS_CATALOG.find((l) => l.id === reqId);
      assert.ok(found, `Required lab descriptor must be present in catalog: ${reqId}`);
      assert.equal(found.status, 'HOLD', `Lab must be marked HOLD: ${reqId}`);
      assert.ok(found.title.length > 5, `Lab title required for ${reqId}`);
      assert.ok(found.formulaBadge.length > 0, `Formula badge required for ${reqId}`);
    }

    // Test LabsHubController multi-catalog filtering
    const hubCtrl = new LabsHubController(UNIFIED_STANDALONE_LABS_CATALOG);
    hubCtrl.setDiscipline('CHEMISTRY');
    const chemLabs = hubCtrl.getFilteredLabs();
    assert.ok(chemLabs.length >= 8, 'Should filter chemistry labs across unified catalog');
    for (const l of chemLabs) {
      assert.equal(l.discipline, 'CHEMISTRY');
    }

    hubCtrl.setDiscipline('PHYSICS');
    const physLabs = hubCtrl.getFilteredLabs();
    assert.ok(physLabs.length >= 20, 'Should filter physics labs across unified catalog');
    for (const l of physLabs) {
      assert.equal(l.discipline, 'PHYSICS');
    }

    hubCtrl.setDiscipline('ALL');
    hubCtrl.setSearchQuery('redox');
    const searchResults = hubCtrl.getFilteredLabs();
    assert.ok(searchResults.length >= 4, 'Should find redox labs across unified catalog');
  });

  it('6. Dispatches /explorer/:explorerId and /lab/:labId routes via Base-Aware Router', () => {
    const router = new Router();

    // Explorer route matching
    const matchExp1 = router.match('/explorer/atwood-pulleys');
    assert.equal(matchExp1.type, 'EXPLORER');
    assert.equal(matchExp1.params.explorerId, 'atwood-pulleys');

    const matchExp2 = router.match('/explorer/behaviour_of_gases');
    assert.equal(matchExp2.type, 'EXPLORER');
    assert.equal(matchExp2.params.explorerId, 'behaviour_of_gases');

    // Standalone lab route matching (/lab and /labs)
    const matchLab1 = router.match('/lab/motion-in-2d-master-suite');
    assert.equal(matchLab1.type, 'LAB');
    assert.equal(matchLab1.params.labId, 'motion-in-2d-master-suite');

    const matchLab2 = router.match('/labs/core1a-physics-nlm-tablet');
    assert.equal(matchLab2.type, 'LAB');
    assert.equal(matchLab2.params.labId, 'core1a-physics-nlm-tablet');

    // Standalone lab hub route matching
    const matchHub1 = router.match('/labs');
    assert.equal(matchHub1.type, 'LAB_HUB');

    const matchHub2 = router.match('/resources');
    assert.equal(matchHub2.type, 'LAB_HUB');
  });

  it('7. Guarantees Fault N09 Answer Isolation (Zero Client-Side Key Exposure)', () => {
    for (const entry of EXPLORER_ENTRIES) {
      const serialized = JSON.stringify(entry).toLowerCase();
      assert.ok(!serialized.includes('answer_key'), `Forbidden answer key in explorer ${entry.id}`);
      assert.ok(!serialized.includes('correct_answer'), `Forbidden correct answer in explorer ${entry.id}`);
      assert.ok(!serialized.includes('master_key'), `Forbidden master key in explorer ${entry.id}`);
    }

    for (const lab of STANDALONE_LABS_CATALOG) {
      const serialized = JSON.stringify(lab).toLowerCase();
      assert.ok(!serialized.includes('answer_key'), `Forbidden answer key in lab ${lab.id}`);
      assert.ok(!serialized.includes('correct_answer'), `Forbidden correct answer in lab ${lab.id}`);
    }
  });
});
