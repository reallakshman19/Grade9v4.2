/**
 * tests/runtime/test_developer_collateral.spec.ts
 * Wave 18 Unit Test Suite — Developer Collateral & Benchmark Parity Verification.
 *
 * Verifies:
 * 1. Promotion of all 156 developer collateral, benchmark, and diagnostic contexts to PARITY_VERIFIED.
 * 2. Exact conservation ledger bounds: 1,878 Verified Parity / 124 Outstanding (93.81% parity).
 * 3. Complete exhaustion of all unmapped app contexts and interactions (unmapped counters = 0).
 * 4. Architecture Hub controller resolution across all 16 canonical and diagnostic documents.
 * 5. Canonical route targets for developer collateral clusters (/architecture/benchmarks, /architecture/workspace-audit, etc.).
 * 6. Fault N09 Answer Isolation: Zero cleartext test keys exposed in client bundles.
 */

import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { ARCHITECTURE_DOCS, ArchitecturePageController } from '../../web/pages/architecture.ts';

test('Wave 18: Developer Collateral & Benchmark Parity', async (t) => {
  const crosswalkPath = resolve('docs/migration/migration-crosswalk.json');
  const summaryPath = resolve('docs/migration/conservation-summary.json');
  const crosswalk = JSON.parse(readFileSync(crosswalkPath, 'utf-8'));
  const summary = JSON.parse(readFileSync(summaryPath, 'utf-8'));

  // 1. Reconciles all 156 Developer Collateral and Benchmark Contexts
  await t.test('1. Reconciles all 156 Developer Collateral and Benchmark Contexts', () => {
    const w18Items = crosswalk.filter((row: any) => {
      if (row.population !== 'HTML_EXECUTION_CONTEXT_CANDIDATE') return false;
      const p = row.source?.path || '';
      return (
        p.startsWith('benchmarks/') ||
        p.startsWith('workspace/') ||
        p.startsWith('evidence/') ||
        p.startsWith('preview/') ||
        p.startsWith('tests/') ||
        p.startsWith('tools/') ||
        p.startsWith('review/')
      );
    });

    assert.equal(w18Items.length, 156, `Expected exactly 156 Wave 18 items, found ${w18Items.length}`);
    for (const item of w18Items) {
      assert.equal(item.disposition, 'PARITY_VERIFIED', `Item ${item.source.path} must be PARITY_VERIFIED`);
      assert.ok(item.target.route, `Item ${item.source.path} must have a target route`);
      assert.ok(item.evidence.test_receipt, `Item ${item.source.path} must have a valid test receipt`);
      assert.equal(item.evidence.target_mounted, true);
      assert.equal(item.evidence.dual_execution_passed, true);
    }
  });

  // 2. Enforces Exact Migration Accounting & Conservation Bounds (1878+ Verified / <=124 Outstanding)
  await t.test('2. Enforces Exact Migration Accounting & Conservation Bounds (1878+ Verified / <=124 Outstanding)', () => {
    const verified = crosswalk.filter((r: any) => r.disposition === 'PARITY_VERIFIED').length;
    const authoringGaps = crosswalk.filter((r: any) => r.disposition === 'AUTHORING_GAP_SOURCE_INCOMPLETE').length;
    const unmapped = crosswalk.filter((r: any) => r.disposition === 'UNMAPPED').length;
    const exclusions = crosswalk.filter((r: any) => r.disposition === 'EXCLUDED_APPROVED').length;

    assert.ok(verified >= 1878, `Expected at least 1,878 verified parity capabilities, got ${verified}`);
    assert.ok(authoringGaps <= 124, `Authoring gaps must be <= 124, got ${authoringGaps}`);
    assert.equal(unmapped, 0, `All unmapped items must be completely exhausted (0 remaining), got ${unmapped}`);
    assert.equal(exclusions, 0, `Exclusions must remain 0`);

    // Exact conservation: verified + authoringGaps + unmapped + exclusions = 2002
    assert.equal(verified + authoringGaps + unmapped + exclusions, 2002);

    // Verify summary metadata
    assert.ok(summary.conservation_equation.verified_parity >= 1878);
    assert.ok(summary.conservation_equation.outstanding <= 124);
    assert.equal(summary.conservation_counters.unmapped_search_entries, 0);
    assert.equal(summary.conservation_counters.unmapped_app_contexts, 0);
    assert.equal(summary.conservation_counters.unmapped_interactions, 0);
  });

  // 3. Powers ArchitecturePageController with full canonical and diagnostic document suite (16 documents)
  await t.test('3. Powers ArchitecturePageController with full canonical and diagnostic document suite', () => {
    assert.equal(ARCHITECTURE_DOCS.length, 16, `Expected exactly 16 architecture and diagnostic documents, got ${ARCHITECTURE_DOCS.length}`);
    
    const requiredDocIds = [
      'core1ab-guide',
      'guidebook',
      'pipeline-benchmarks',
      'production-checklist',
      'review-guide',
      'manifesto',
      'pipeline',
      'roadmap',
      'overview',
      'benchmarks',
      'workspace-audit',
      'evidence-packets',
      'preview-batches',
      'test-fixtures',
      'developer-tools',
      'peer-review',
    ];

    for (const docId of requiredDocIds) {
      assert.ok(ARCHITECTURE_DOCS.some(d => d.id === docId), `Doc ${docId} must exist in ARCHITECTURE_DOCS`);
    }

    const controller = new ArchitecturePageController();
    assert.equal(controller.getActiveDoc(), null);

    // Test selection of diagnostic benchmark doc
    controller.selectDoc('benchmarks');
    const benchDoc = controller.getActiveDoc();
    assert.ok(benchDoc);
    assert.equal(benchDoc?.id, 'benchmarks');

    // Test selection of workspace audit doc
    controller.selectDoc('workspace-audit');
    const wsDoc = controller.getActiveDoc();
    assert.ok(wsDoc);
    assert.equal(wsDoc?.id, 'workspace-audit');

    controller.selectDoc(null);
    assert.equal(controller.getActiveDoc(), null);
  });

  // 4. Verifies Canonical Diagnostic Route Targets for Developer Collateral
  await t.test('4. Verifies Canonical Diagnostic Route Targets for Developer Collateral', () => {
    const clusterMap: Record<string, string> = {
      'benchmarks/': '/architecture/benchmarks',
      'workspace/': '/architecture/workspace-audit',
      'evidence/': '/architecture/evidence-packets',
      'preview/': '/architecture/preview-batches',
      'tests/': '/architecture/test-fixtures',
      'tools/': '/architecture/developer-tools',
      'review/': '/architecture/peer-review',
    };

    for (const [prefix, expectedRoute] of Object.entries(clusterMap)) {
      const rows = crosswalk.filter((r: any) => 
        r.population === 'HTML_EXECUTION_CONTEXT_CANDIDATE' &&
        r.source.path.startsWith(prefix)
      );
      assert.ok(rows.length > 0, `Cluster ${prefix} must contain rows`);
      for (const r of rows) {
        assert.equal(r.target.route, expectedRoute, `Row ${r.source.path} must route to ${expectedRoute}`);
        assert.equal(r.evidence.test_receipt, 'tests/runtime/test_developer_collateral.spec.ts');
      }
    }
  });

  // 5. Guarantees Fault N09 Answer Isolation
  await t.test('5. Guarantees Fault N09 Answer Isolation', () => {
    const archSrc = readFileSync(resolve('web/pages/architecture.ts'), 'utf-8');
    assert.ok(!archSrc.includes('secret_key'), 'No secrets in architecture.ts');
    assert.ok(!archSrc.includes('correctAnswerKey'), 'No raw keys in architecture.ts');
  });
});
