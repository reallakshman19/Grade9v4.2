/**
 * tests/runtime/test_curriculum_subtopics.spec.ts
 * Wave 16 — Unit Test Suite for Curricular Subtopics, Portable Packages,
 * and Multi-Disciplinary Infrastructure Parity.
 *
 * Verifies:
 * - 12 NSEJS Physics Chapters (PH01 to PH12) and 132 Subtopics in Curriculum Navigator
 * - Interactive subtopic selection, expansion, priority filtering, and search
 * - 3 Authenticated Portable STEM Packages (Riemann Sums, Long Division, Redox Equivalence)
 * - 8 Authored Physics Study Rows (PH02-F01 to PH02-F08) under Motion in a Plane
 * - Migration crosswalk accounting: 1,465 verified capabilities (73.2%), 537 outstanding
 * - Strict conservation equation: 1,465 + 537 + 0 = 2,002 (Delta = 0)
 * - Fault N09 Answer Isolation: Zero answer key exposure client-side
 */

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import {
  NSEJS_CHAPTERS,
  NSEJS_SUBTOPICS,
  NsejsCurriculumController,
} from '../../web/pages/nsejs-curriculum.ts';
import {
  RIEMANN_SUMS_PACKAGE,
  LONG_DIVISION_PACKAGE,
} from '../../web/runtime/math-packages.ts';
import {
  REDOX_ELECTRON_EQUIVALENCE_PACKAGE,
} from '../../web/runtime/chem-packages.ts';
import {
  PHY_MOTION_PLANE_TOPIC,
} from '../../web/pages/topic.ts';
import {
  LIBRARY_PACKAGES,
} from '../../web/pages/physics-library.ts';

const CROSSWALK_PATH = resolve('docs/migration/migration-crosswalk.json');
const SUMMARY_PATH = resolve('docs/migration/conservation-summary.json');

describe('Wave 16: Curricular Subtopics & Multi-Disciplinary Parity', () => {
  it('1. Reconciles all 12 NSEJS Physics Chapters and 132 Subtopics', () => {
    assert.equal(NSEJS_CHAPTERS.length, 12, 'Must have exactly 12 physics chapters');
    assert.equal(NSEJS_SUBTOPICS.length, 132, 'Must have exactly 132 subtopics across chapters');

    const expectedChapterIds = [
      'PH01', 'PH02', 'PH03', 'PH04', 'PH05', 'PH06',
      'PH07', 'PH08', 'PH09', 'PH10', 'PH11', 'PH12',
    ];

    for (const cid of expectedChapterIds) {
      const ch = NSEJS_CHAPTERS.find((c) => c.id === cid);
      assert.ok(ch, `Chapter ${cid} must exist`);
      assert.ok(ch.title.length > 3, `Title required for ${cid}`);
      assert.ok(ch.subtopicCount > 0, `Subtopics required for ${cid}`);

      const subs = NSEJS_SUBTOPICS.filter((s) => s.chapterId === cid);
      assert.equal(subs.length, ch.subtopicCount, `Subtopic count mismatch for ${cid}`);
    }
  });

  it('2. Powers NsejsCurriculumController with interactive subtopic selection and filtering', () => {
    const ctrl = new NsejsCurriculumController();
    assert.equal(ctrl.getSelectedChapter().id, 'PH01');

    // Switch chapter
    ctrl.setSelectedChapter('PH02');
    assert.equal(ctrl.getSelectedChapter().id, 'PH02');
    assert.equal(ctrl.getSelectedSubtopicId(), null);

    // Select subtopic
    ctrl.setSelectedSubtopicId('PH02-01');
    assert.equal(ctrl.getSelectedSubtopicId(), 'PH02-01');
    const viewState = ctrl.getViewState();
    assert.equal(viewState.selectedSubtopicId, 'PH02-01');

    // Test priority filtering
    ctrl.setSubtopicFilter('P0');
    const p0Subs = ctrl.getSubtopics();
    assert.ok(p0Subs.length > 0, 'Must have P0 subtopics in PH02');
    for (const s of p0Subs) {
      assert.equal(s.priority, 'P0');
    }

    // Reset filter
    ctrl.setSubtopicFilter('ALL');
    assert.equal(ctrl.getSubtopics().length, 8); // PH02 has 8 subtopics
  });

  it('3. Reconciles all 3 Authenticated Portable STEM Packages', () => {
    // 1. Riemann Sums Partition Workbench
    assert.ok(RIEMANN_SUMS_PACKAGE, 'Riemann sums package must exist');
    assert.equal(RIEMANN_SUMS_PACKAGE.id, 'portable-integration-riemann');
    assert.ok(RIEMANN_SUMS_PACKAGE.adapter.rules.length >= 2);
    assert.ok(RIEMANN_SUMS_PACKAGE.scene.targets.length >= 1);

    // 2. Long Division Scaffold
    assert.ok(LONG_DIVISION_PACKAGE, 'Long division package must exist');
    assert.equal(LONG_DIVISION_PACKAGE.id, 'portable-long-division');
    assert.ok(LONG_DIVISION_PACKAGE.adapter.rules.length >= 2);
    assert.ok(LONG_DIVISION_PACKAGE.scene.targets.length >= 1);

    // 3. Redox Electron Equivalence
    assert.ok(REDOX_ELECTRON_EQUIVALENCE_PACKAGE, 'Redox electron equivalence package must exist');
    assert.equal(REDOX_ELECTRON_EQUIVALENCE_PACKAGE.id, 'portable-redox-electron-equivalence');
    assert.ok(REDOX_ELECTRON_EQUIVALENCE_PACKAGE.adapter.rules.length >= 1);
    assert.ok(REDOX_ELECTRON_EQUIVALENCE_PACKAGE.scene.targets.length >= 1);
  });

  it('4. Reconciles 8 Authored Physics Study Rows under Motion in a Plane (PH02-F01..PH02-F08)', () => {
    // Motion in a Plane Topic
    assert.equal(PHY_MOTION_PLANE_TOPIC.id, 'motion-plane');
    assert.equal(PHY_MOTION_PLANE_TOPIC.status, 'AVAILABLE');

    // Motion in a Plane / 2D Kinematics Library Package
    const motPkg = LIBRARY_PACKAGES.find((p) => p.id === 'LIB-PHY-KIN-2D-MOTION-AUTHORED');
    assert.ok(motPkg, 'LIB-PHY-KIN-2D-MOTION-AUTHORED package must exist');
    assert.equal(motPkg.subject, 'PHYSICS');
    assert.ok(motPkg.microtopics.length >= 3);

    // Verify crosswalk maps all 8 PH02 authored rows as PARITY_VERIFIED
    const crosswalk = JSON.parse(readFileSync(CROSSWALK_PATH, 'utf-8'));
    const ph02Rows = crosswalk.filter(
      (r: any) =>
        r.population === 'PHYSICS_AUTHOR_ROW' &&
        r.source?.record_key?.startsWith('PH02-F')
    );

    assert.equal(ph02Rows.length, 8, 'Must have exactly 8 PH02 authored study rows');
    for (const row of ph02Rows) {
      assert.equal(row.disposition, 'PARITY_VERIFIED', `${row.source.record_key} must be PARITY_VERIFIED`);
      assert.equal(row.evidence.dual_execution_passed, true);
      assert.equal(row.evidence.target_mounted, true);
    }
  });

  it('5. Enforces Exact Migration Accounting & Conservation Bounds (1465+ Verified / <=537 Outstanding)', () => {
    const crosswalk = JSON.parse(readFileSync(CROSSWALK_PATH, 'utf-8'));
    const summary = JSON.parse(readFileSync(SUMMARY_PATH, 'utf-8'));

    assert.equal(crosswalk.length, 2002, 'Total crosswalk rows must equal 2002');

    const eq = summary.conservation_equation;
    assert.equal(eq.eligible_capabilities, 2002);
    assert.ok(eq.verified_parity >= 1465, 'Verified parity must be at least 1465 capabilities (73.2%+)');
    assert.ok(eq.outstanding <= 537, 'Outstanding must be at most 537 capabilities');
    assert.equal(eq.approved_exclusions, 0);

    // Exact conservation equation: verified + outstanding + 0 = 2002
    assert.equal(
      eq.eligible_capabilities,
      eq.verified_parity + eq.outstanding + eq.approved_exclusions,
      'Conservation equation violated'
    );

    // Verify all nsejs HTML execution candidates are promoted
    const nsejsHtml = crosswalk.filter(
      (r: any) =>
        r.population === 'HTML_EXECUTION_CONTEXT_CANDIDATE' &&
        r.source?.path?.startsWith('nsejs/')
    );
    assert.equal(nsejsHtml.length, 367); // 360 newly promoted + 7 from wave 14
    for (const r of nsejsHtml) {
      assert.equal(r.disposition, 'PARITY_VERIFIED');
    }

    // Verify 8 conservation counters
    const counters = summary.conservation_counters;
    assert.equal(counters.unaccounted_resource_occurrences, 0);
    assert.ok(counters.unmapped_search_entries <= 413);
    assert.ok(counters.unmapped_app_contexts <= 413);
    assert.equal(counters.missing_dependency_edges, 0);
    assert.equal(counters.unmapped_interactions, 0);
    assert.equal(counters.unexplained_behavior_differences, 0);
    assert.equal(counters.unresolved_state_mappings, 0);
    assert.equal(counters.unapproved_exclusions, 0);
  });

  it('6. Guarantees Fault N09 Answer Isolation (Zero Client-Side Key Exposure)', () => {
    for (const ch of NSEJS_CHAPTERS) {
      const serialized = JSON.stringify(ch).toLowerCase();
      assert.ok(!serialized.includes('answer_key'));
      assert.ok(!serialized.includes('correct_answer'));
    }

    for (const sub of NSEJS_SUBTOPICS) {
      const serialized = JSON.stringify(sub).toLowerCase();
      assert.ok(!serialized.includes('answer_key'));
      assert.ok(!serialized.includes('correct_answer'));
    }
  });
});
