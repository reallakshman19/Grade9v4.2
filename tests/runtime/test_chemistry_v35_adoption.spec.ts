/**
 * tests/runtime/test_chemistry_v35_adoption.spec.ts
 * Unit Test Suite for Grade9 v3.5 Chemistry Ecosystem Adoption:
 * - Standalone Static Chemistry Hub & 4 Topic Workspaces
 * - 4 Master Visual Suites (28+ interactive canvases)
 * - 4 Authenticated JEE Question Banks (~256 KB)
 * - ChemistryHubController state machine & filtering
 * - Strict NO-IFRAME Top-Level Navigation Invariant
 * - Academic Status HOLD governance compliance
 */

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, statSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import {
  ChemistryHubController,
  CORE_TOPICS,
  MASTER_SUITES,
} from '../../web/pages/chemistry-hub.ts';
import { Router } from '../../web/app/router.ts';

describe('Grade9 v3.5 Chemistry Ecosystem Adoption & Parity Tests', () => {
  it('1. Verifies exact custody migration of all 23 v3.5 chemistry files on disk', () => {
    const requiredFiles = [
      'web/chemistry/index.html',
      // Bonding
      'web/chemistry/bonding/index.html',
      'web/chemistry/bonding/core1a.html',
      'web/chemistry/bonding/atlas.html',
      'web/chemistry/bonding/explorers/chemical_bonding/index.html',
      'web/chemistry/bonding/explorers/chemical_bonding/jee_questions_data.js',
      // Gases
      'web/chemistry/gases/index.html',
      'web/chemistry/gases/core1a.html',
      'web/chemistry/gases/atlas.html',
      'web/chemistry/gases/explorers/behaviour_of_gases/index.html',
      'web/chemistry/gases/explorers/behaviour_of_gases/jee_questions_data.js',
      // Mole Concept
      'web/chemistry/some-basic-concepts/index.html',
      'web/chemistry/some-basic-concepts/core1a.html',
      'web/chemistry/some-basic-concepts/atlas.html',
      'web/chemistry/some-basic-concepts/explorers/mole_concept/index.html',
      'web/chemistry/some-basic-concepts/explorers/mole_concept/jee_questions_data.js',
      'web/chemistry/mole/index.html',
      // Redox
      'web/chemistry/redox/index.html',
      'web/chemistry/redox/core1a.html',
      'web/chemistry/redox/atlas.html',
      'web/chemistry/redox/explorers/redox_reactions/index.html',
      'web/chemistry/redox/explorers/redox_reactions/adaptive-hard-concept-proof.html',
      'web/chemistry/redox/explorers/redox_reactions/jee_questions_data.js',
    ];

    for (const rel of requiredFiles) {
      const full = resolve(rel);
      assert.ok(existsSync(full), `Required file must exist on disk: ${rel}`);
      const st = statSync(full);
      assert.ok(st.size > 1000, `File ${rel} must be substantive (found ${st.size} bytes)`);
    }
  });

  it('2. Ingests all 4 authentic JEE Question datasets without corruption', () => {
    const questionFiles = [
      'web/chemistry/bonding/explorers/chemical_bonding/jee_questions_data.js',
      'web/chemistry/gases/explorers/behaviour_of_gases/jee_questions_data.js',
      'web/chemistry/some-basic-concepts/explorers/mole_concept/jee_questions_data.js',
      'web/chemistry/redox/explorers/redox_reactions/jee_questions_data.js',
    ];

    let totalBytes = 0;
    for (const qf of questionFiles) {
      const full = resolve(qf);
      const text = readFileSync(full, 'utf-8');
      totalBytes += text.length;
      assert.ok(text.includes('JEE_QUESTIONS_DATA') || text.toLowerCase().includes('questions'), `Must define question dataset in ${qf}`);
      assert.ok(text.length >= 50000, `Question dataset must be comprehensive (>= 50 KB in ${qf})`);
    }

    assert.ok(totalBytes > 250000, `Total authentic question data must exceed 250 KB (found ${totalBytes})`);
  });

  it('3. Verifies vendored offline dependencies (Tailwind 3.4.17 & KaTeX 0.16.8)', () => {
    const vendoredFiles = [
      'web/vendor/tailwind/3.4.17/tailwind-play.js',
      'web/vendor/katex/0.16.8/katex.min.js',
      'web/vendor/katex/0.16.8/katex.min.css',
      'web/css/modern-learner.css',
      'web/css/tablet-12-7.css',
      'web/js/display-controls.js',
      'web/js/site-header.js',
    ];

    for (const vf of vendoredFiles) {
      const full = resolve(vf);
      assert.ok(existsSync(full), `Vendored offline dependency must exist: ${vf}`);
      assert.ok(statSync(full).size > 1000, `Vendored asset ${vf} must not be empty`);
    }
  });

  it('4. ChemistryHubController manages filter states and descriptor catalogs', () => {
    const ctrl = new ChemistryHubController();
    assert.equal(ctrl.getFilter(), 'ALL');

    const core = ctrl.getCoreTopics();
    const suites = ctrl.getMasterSuites();

    assert.equal(core.length, 4, 'Must have exactly 4 core topics (Bonding, Gases, Mole, Redox)');
    assert.equal(suites.length, 4, 'Must have exactly 4 master simulation suites');

    // Verify suite properties
    for (const s of suites) {
      assert.ok(s.canvasCount >= 7, `${s.id} must feature at least 7 interactive canvases`);
      assert.ok(s.tabCount >= 7, `${s.id} must feature at least 7 visual tabs`);
      assert.ok(s.suiteUrl.startsWith('./chemistry/'), `${s.id} suiteUrl must point to standalone path`);
    }

    // Filter switches
    ctrl.setFilter('CORE');
    assert.equal(ctrl.getFilter(), 'CORE');
    ctrl.setFilter('SUITES');
    assert.equal(ctrl.getFilter(), 'SUITES');
    ctrl.setFilter('ALL');
    assert.equal(ctrl.getFilter(), 'ALL');
  });

  it('5. Enforces NO-IFRAME top-level standalone launch invariant', () => {
    // Audit that chemistry-hub and workbenches do not instantiate iframe elements
    const hubSrc = readFileSync(resolve('web/pages/chemistry-hub.ts'), 'utf-8');
    assert.ok(!hubSrc.includes('<iframe'), 'Chemistry Hub must strictly avoid iframe tags');
    assert.ok(!hubSrc.includes('document.createElement("iframe")'), 'Chemistry Hub must not create iframes');
    assert.ok(hubSrc.includes('window.location.href = url'), 'Chemistry Hub must use top-level navigation');

    // Check workbenches
    for (const wb of ['chemical-bonding.ts', 'gas-laws.ts', 'mole-concept.ts', 'redox-adaptive.ts']) {
      const wbPath = resolve('web/pages/workbenches', wb);
      const text = existsSync(wbPath) ? readFileSync(wbPath, 'utf-8') : readFileSync(resolve('web/pages', wb), 'utf-8');
      assert.ok(!text.includes('<iframe'), `${wb} must not embed iframes`);
    }
  });

  it('6. Router dispatches /chemistry and /chemistry-hub correctly', () => {
    const router = new Router();
    const m1 = router.match('/chemistry');
    assert.ok(m1);

    const m2 = router.match('/curriculum/chemistry');
    assert.ok(m2);

    const m3 = router.match('/subject/chemistry');
    assert.equal(m3.type, 'SUBJECT');
    assert.equal(m3.params.subjectId, 'chemistry');
  });
});
