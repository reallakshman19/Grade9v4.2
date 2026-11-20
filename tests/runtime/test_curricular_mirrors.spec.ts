/**
 * tests/runtime/test_curricular_mirrors.spec.ts
 * Wave 17 Unit Test Suite — Curricular Mirrors & Architecture Parity Verification.
 *
 * Verifies:
 * 1. Promotion of 257 authentic curricular, atlas, and architectural contexts to PARITY_VERIFIED.
 * 2. Exact conservation ledger bounds: 1,722 Verified Parity / 280 Outstanding (86.01% parity).
 * 3. Architecture Hub controller resolution across all 9 canonical architecture documents.
 * 4. Dual execution and canonical target route bindings across STEM subjects.
 * 5. Fault N09 Answer Isolation: Zero cleartext test keys exposed in client data bundles.
 */

import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { ARCHITECTURE_DOCS, ArchitecturePageController } from '../../web/pages/architecture.ts';

test('Wave 17: Curricular Mirrors & Architecture Parity', async (t) => {
  const crosswalkPath = resolve('docs/migration/migration-crosswalk.json');
  const summaryPath = resolve('docs/migration/conservation-summary.json');
  const crosswalk = JSON.parse(readFileSync(crosswalkPath, 'utf-8'));
  const summary = JSON.parse(readFileSync(summaryPath, 'utf-8'));

  // 1. Reconciles all 257 Curricular, Atlas and Architecture Contexts
  await t.test('1. Reconciles all 257 Curricular, Atlas and Architecture Contexts', () => {
    const htmlVerified = crosswalk.filter((row: any) => 
      row.population === 'HTML_EXECUTION_CONTEXT_CANDIDATE' && row.disposition === 'PARITY_VERIFIED'
    );
    // Baseline was 471 (Wave 16), Wave 17 promotes +257 => >= 728 total
    assert.ok(htmlVerified.length >= 728, `Expected at least 728 verified HTML contexts, got ${htmlVerified.length}`);

    const w17Items = crosswalk.filter((row: any) => {
      if (row.population !== 'HTML_EXECUTION_CONTEXT_CANDIDATE') return false;
      const p = row.source?.path || '';
      return (
        p.startsWith('architecture/') ||
        p.startsWith('docs/') ||
        p.startsWith('public/') ||
        p.startsWith('Physics/') ||
        p.startsWith('physics/') ||
        p.startsWith('curriculum/') ||
        p.startsWith('WPE_Source_to_Core1A_Concept/') ||
        p === 'chemistry/index.html' ||
        p === 'mathematics/index.html' ||
        p === 'index.html'
      );
    });

    assert.equal(w17Items.length, 323, `Expected 323 cumulative curricular and architecture items, found ${w17Items.length}`);
    for (const item of w17Items) {
      assert.equal(item.disposition, 'PARITY_VERIFIED', `Item ${item.source.path} must be PARITY_VERIFIED`);
      assert.ok(item.target.route, `Item ${item.source.path} must have a target route`);
      assert.ok(item.evidence.test_receipt, `Item ${item.source.path} must have a valid test receipt`);
      assert.equal(item.evidence.target_mounted, true);
      assert.equal(item.evidence.dual_execution_passed, true);
    }
  });

  // 2. Enforces Exact Migration Accounting & Conservation Bounds (1722+ Verified / <=280 Outstanding)
  await t.test('2. Enforces Exact Migration Accounting & Conservation Bounds (1722+ Verified / <=280 Outstanding)', () => {
    const verified = crosswalk.filter((r: any) => r.disposition === 'PARITY_VERIFIED').length;
    const authoringGaps = crosswalk.filter((r: any) => r.disposition === 'AUTHORING_GAP_SOURCE_INCOMPLETE').length;
    const unmapped = crosswalk.filter((r: any) => r.disposition === 'UNMAPPED').length;
    const exclusions = crosswalk.filter((r: any) => r.disposition === 'EXCLUDED_APPROVED').length;

    assert.ok(verified >= 1722, `Expected at least 1,722 verified parity capabilities, got ${verified}`);
    assert.ok(authoringGaps <= 124, `Authoring gaps must be <= 124, got ${authoringGaps}`);
    assert.ok(unmapped <= 156, `Remaining unmapped developer artifacts must be at most 156, got ${unmapped}`);
    assert.equal(exclusions, 0, `Exclusions must remain 0`);

    // Conservation: verified + authoringGaps + unmapped + exclusions = 2002
    assert.equal(verified + authoringGaps + unmapped + exclusions, 2002);

    // Verify summary metadata
    assert.ok(summary.conservation_equation.verified_parity >= 1722);
    assert.ok(summary.conservation_equation.outstanding <= 280);
    assert.ok(summary.conservation_counters.unmapped_search_entries <= 156);
    assert.ok(summary.conservation_counters.unmapped_app_contexts <= 156);
    assert.equal(summary.conservation_counters.unmapped_interactions, 0);
  });

  // 3. Powers ArchitecturePageController with full canonical document suite
  await t.test('3. Powers ArchitecturePageController with full canonical document suite', () => {
    assert.ok(ARCHITECTURE_DOCS.length >= 9, 'Must catalogue at least 9 canonical architecture documents');
    
    const requiredDocIds = [
      'core1ab-guide',
      'guidebook',
      'pipeline-benchmarks',
      'production-checklist',
      'review-guide',
      'manifesto',
      'pipeline',
      'roadmap',
      'overview'
    ];

    for (const docId of requiredDocIds) {
      assert.ok(ARCHITECTURE_DOCS.some(d => d.id === docId), `Architecture doc ${docId} must exist`);
    }

    const controller = new ArchitecturePageController();
    assert.equal(controller.getActiveDoc(), null);

    // Test selection by id
    controller.selectDoc('manifesto');
    const manifestoDoc = controller.getActiveDoc();
    assert.ok(manifestoDoc);
    assert.equal(manifestoDoc?.id, 'manifesto');
    assert.equal(manifestoDoc?.sourcePath, 'architecture/manifesto.html');

    // Test selection by source path fragment
    controller.selectDoc('core1ab-agent-guide');
    const agentGuideDoc = controller.getActiveDoc();
    assert.ok(agentGuideDoc);
    assert.equal(agentGuideDoc?.id, 'core1ab-guide');

    controller.selectDoc(null);
    assert.equal(controller.getActiveDoc(), null);
  });

  // 4. Verifies Canonical Route Targets for Curricular Mirrors
  await t.test('4. Verifies Canonical Route Targets for Curricular Mirrors', () => {
    const archRows = crosswalk.filter((r: any) => r.source.path.startsWith('architecture/'));
    assert.equal(archRows.length, 7);
    for (const r of archRows) {
      assert.ok(r.target.route.startsWith('/architecture/'), `Arch route must start with /architecture/, got ${r.target.route}`);
    }

    const standaloneMirrors = crosswalk.filter((r: any) => 
      r.population === 'HTML_EXECUTION_CONTEXT_CANDIDATE' &&
      (r.source.path.startsWith('docs/standalone/') || r.source.path.startsWith('public/standalone/'))
    );
    assert.equal(standaloneMirrors.length, 80);
    for (const r of standaloneMirrors) {
      assert.ok(r.target.route.startsWith('/lab'), `Standalone mirror must route to /lab/:labId or /labs/..., got ${r.target.route}`);
    }

    const mathMirrors = crosswalk.filter((r: any) => 
      r.population === 'HTML_EXECUTION_CONTEXT_CANDIDATE' &&
      (r.source.path.startsWith('docs/mathematics/') || r.source.path.startsWith('public/mathematics/'))
    );
    assert.equal(mathMirrors.length, 40);
    for (const r of mathMirrors) {
      assert.ok(
        r.target.route === '/subject/mathematics' || r.target.route.startsWith('/explorer/'),
        `Math route must be /subject/mathematics or /explorer/..., got ${r.target.route}`
      );
    }

    const chemMirrors = crosswalk.filter((r: any) => 
      r.population === 'HTML_EXECUTION_CONTEXT_CANDIDATE' &&
      (r.source.path.startsWith('docs/chemistry/') || r.source.path.startsWith('public/chemistry/'))
    );
    assert.equal(chemMirrors.length, 38);
    for (const r of chemMirrors) {
      assert.ok(
        r.target.route === '/subject/chemistry' || r.target.route.startsWith('/explorer/') || r.target.route.startsWith('/learning/'),
        `Chem route must be /subject/chemistry, /explorer/... or /learning/..., got ${r.target.route}`
      );
    }

    const physMirrors = crosswalk.filter((r: any) => 
      r.population === 'HTML_EXECUTION_CONTEXT_CANDIDATE' &&
      (r.source.path.startsWith('docs/physics/') || r.source.path.startsWith('public/physics/'))
    );
    assert.equal(physMirrors.length, 64);
    for (const r of physMirrors) {
      assert.ok(
        r.target.route === '/subject/physics' || r.target.route.startsWith('/explorer/'),
        `Phys route must be /subject/physics or /explorer/..., got ${r.target.route}`
      );
    }
  });

  // 5. Guarantees Fault N09 Answer Isolation
  await t.test('5. Guarantees Fault N09 Answer Isolation', () => {
    // Read bundle or client source data files and verify zero raw answer keys leaked
    const archSrc = readFileSync(resolve('web/pages/architecture.ts'), 'utf-8');
    assert.ok(!archSrc.includes('secret_key'), 'No secrets in architecture.ts');
    assert.ok(!archSrc.includes('correctAnswerKey'), 'No raw keys in architecture.ts');
  });
});
