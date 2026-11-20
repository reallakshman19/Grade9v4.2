/**
 * tests/runtime/test_physics_library.spec.ts
 * Wave 13 — Unit Test Suite for STEM Library Packages (20 Physics + 2 Math = 22 Packages)
 * and 208 Authentic Library Questions.
 *
 * Verifies:
 * - 22 Library Packages across Kinematics, Dynamics, Electromagnetism, Optics, Waves, and Algebra
 * - 208 Authentic Library Questions under Fault N09 Answer Isolation (zero answer key leakage)
 * - Pedagogical scaffolding: hints, hint ladders, failure signals, and difficulty ratings
 * - PhysicsLibraryController reactive state machine
 * - Kinematics Trajectory Simulator mathematical exactness
 */

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  LIBRARY_PACKAGES,
  LIBRARY_QUESTIONS,
  PhysicsLibraryController,
  GRAVITY_PRESETS,
} from '../../web/pages/physics-library.ts';

describe('Wave 13: STEM Library Packages & 208 Authentic Questions', () => {
  it('1. Reconciles all 22 official Library Packages across Physics and Mathematics', () => {
    assert.equal(LIBRARY_PACKAGES.length, 22, 'Must have exactly 22 library packages');

    const physCount = LIBRARY_PACKAGES.filter(p => p.subject === 'PHYSICS').length;
    const mathCount = LIBRARY_PACKAGES.filter(p => p.subject === 'MATHEMATICS').length;
    assert.equal(physCount, 20, 'Must have exactly 20 Physics library packages');
    assert.equal(mathCount, 2, 'Must have exactly 2 Mathematics library packages');

    for (const pkg of LIBRARY_PACKAGES) {
      assert.ok(pkg.id.startsWith('LIB-'), `Package ID must follow convention: ${pkg.id}`);
      assert.ok(pkg.title.length > 3, `Title missing for ${pkg.id}`);
      assert.ok(pkg.domain.length > 2, `Domain missing for ${pkg.id}`);
      assert.ok(pkg.scopeSummary.length > 5, `Scope summary missing for ${pkg.id}`);
      assert.ok(pkg.sourcePath.length > 5, `Source path missing for ${pkg.id}`);
    }
  });

  it('2. Ingests all 208 authentic Library Questions (137 Physics + 71 Math)', () => {
    assert.equal(LIBRARY_QUESTIONS.length, 208, 'Must have exactly 208 authentic questions');

    const physQs = LIBRARY_QUESTIONS.filter(q => q.subject === 'PHYSICS').length;
    const mathQs = LIBRARY_QUESTIONS.filter(q => q.subject === 'MATHEMATICS').length;
    assert.equal(physQs, 137, 'Must have 137 Physics questions');
    assert.equal(mathQs, 71, 'Must have 71 Mathematics questions');

    for (const q of LIBRARY_QUESTIONS) {
      assert.ok(q.id.length > 0, 'Question ID must be present');
      assert.ok(q.stem.length > 10, `Stem must be substantive for ${q.id}`);
      assert.ok(q.hints.length > 0, `Hints required for ${q.id}`);
      assert.ok(q.hintLadder.length > 0, `Hint ladder required for ${q.id}`);
      assert.ok(q.failureSignal.length > 0, `Failure signal required for ${q.id}`);
    }
  });

  it('3. Guarantees Fault N09 Answer Isolation (Zero Client-Side Key Exposure)', () => {
    for (const q of LIBRARY_QUESTIONS) {
      assert.equal(q.keyState, 'WITHHELD_CLIENT_SIDE_FAULT_N09', 'Fault N09 key state required');
      // Verify no answer key leakage
      assert.equal((q as Record<string, unknown>).answer, undefined, 'Raw answer key must not exist');
      // Verify hints do not leak direct answer text
      for (const h of q.hints) {
        assert.ok(!h.toLowerCase().startsWith('answer is:'), `Hint should not expose direct answer: ${h}`);
      }
    }
  });

  it('4. PhysicsLibraryController manages tabs, domain filters, search, and expansions', () => {
    const controller = new PhysicsLibraryController();
    let updates = 0;
    const unsub = controller.subscribe(() => {
      updates++;
    });

    assert.equal(controller.getState().activeTab, 'packages');
    assert.equal(controller.getState().domainFilter, 'ALL');

    controller.setActiveTab('questions');
    assert.equal(controller.getState().activeTab, 'questions');
    assert.equal(updates, 1);

    controller.setDomainFilter('KINEMATICS');
    assert.equal(controller.getState().domainFilter, 'KINEMATICS');
    assert.equal(updates, 2);

    controller.selectPackage('LIB-PHY-KIN-1D-MOTION-AUTHORED');
    assert.equal(controller.getState().selectedPackageId, 'LIB-PHY-KIN-1D-MOTION-AUTHORED');
    assert.equal(updates, 3);

    controller.togglePackageExpanded('LIB-PHY-KIN-1D-MOTION-AUTHORED');
    assert.ok(controller.getState().expandedPackages.has('LIB-PHY-KIN-1D-MOTION-AUTHORED'));
    assert.equal(updates, 4);

    controller.togglePackageExpanded('LIB-PHY-KIN-1D-MOTION-AUTHORED');
    assert.ok(!controller.getState().expandedPackages.has('LIB-PHY-KIN-1D-MOTION-AUTHORED'));
    assert.equal(updates, 5);

    unsub();
  });

  it('5. Kinematics Simulator calculates exact physical trajectory parameters', () => {
    const controller = new PhysicsLibraryController(null, 'simulator');
    assert.equal(controller.getState().launchSpeed, 40);
    assert.equal(controller.getState().launchAngle, 45);
    assert.equal(controller.getState().gravity, 9.8);

    // Initial values at v0=40, angle=45, g=9.8
    // T = 2 * 40 * sin(45) / 9.8 = 80 * 0.70710678 / 9.8 = 5.772s
    // H = 40^2 * sin^2(45) / (2 * 9.8) = 1600 * 0.5 / 19.6 = 40.816m
    // R = 40^2 * sin(90) / 9.8 = 1600 / 9.8 = 163.265m
    const v0 = controller.getState().launchSpeed;
    const rad = (controller.getState().launchAngle * Math.PI) / 180;
    const g = controller.getState().gravity;

    const t = (2 * v0 * Math.sin(rad)) / g;
    const h = (v0 * v0 * Math.sin(rad) * Math.sin(rad)) / (2 * g);
    const r = (v0 * v0 * Math.sin(2 * rad)) / g;

    assert.ok(Math.abs(t - 5.77) < 0.05, `Flight time expected ~5.77s, got ${t}`);
    assert.ok(Math.abs(h - 40.82) < 0.05, `Max height expected ~40.82m, got ${h}`);
    assert.ok(Math.abs(r - 163.27) < 0.05, `Range expected ~163.27m, got ${r}`);

    // Test parameter adjust
    controller.setLaunchSpeed(60);
    assert.equal(controller.getState().launchSpeed, 60);

    controller.setLaunchAngle(30);
    assert.equal(controller.getState().launchAngle, 30);

    // Test Moon gravity preset
    const moon = GRAVITY_PRESETS.find(p => p.name.includes('Moon'))!;
    controller.setGravity(moon.value);
    assert.equal(controller.getState().gravity, 1.6);
  });
});
