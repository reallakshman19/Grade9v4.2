/**
 * web/runtime/math-packages.ts
 * A64 / DEC-A59-PORTABLE-COMPATIBILITY-01 — Declarative Portable Workbench Packages for Mathematics.
 *
 * Implements:
 * 1. RIEMANN_SUMS_PACKAGE (portable-integration-riemann):
 *    Partition refinement and Darboux sum bounding on f(x) = x^2 over [0, 1].
 *    Analytical truth: L(f, P_n) <= 1/3 <= U(f, P_n) with monotonic refinement.
 * 2. LONG_DIVISION_PACKAGE (portable-long-division):
 *    Arithmetic multi-step long division scaffold proof fixture (492 / 4 = 123).
 *    Honestly scoped as an arithmetic scaffold, not general symbolic polynomial division.
 *
 * Conforms to:
 * - packageVersion: '1.0.0', componentApiVersion: '0.1.0', adapterApiVersion: '0.2.0', scenePackageVersion: '1.0.0'
 * - Fail-closed schema: zero executable fields, zero pixel placements, exact entity-target bindings.
 *
 * No academic approval inferred from software validation.
 */

import type { PortableWorkbenchPackage } from '../applications/portable/types.ts';
import { PORTABLE_VERSION_SEAMS as V } from '../applications/portable/types.ts';

// ---------------------------------------------------------------------------
// 1. Riemann Integration Partition Refinement Package
// ---------------------------------------------------------------------------

export const RIEMANN_SUMS_PACKAGE: PortableWorkbenchPackage = {
  schemaVersion: V.packageSchema,
  packageVersion: V.packageVersion,
  componentApiVersion: V.componentApiVersion,
  transformationIrVersion: V.transformationIrVersion,
  adapterApiVersion: V.adapterApiVersion,
  scenePackageVersion: V.scenePackageVersion,
  id: 'portable-integration-riemann',
  title: 'Riemann Sum — Partition Refinement and Area Bound',
  sourceRefs: ['issue:163:integration-cross-subject-proof'],
  sceneRefs: ['riemann-scene'],
  representationRefs: ['rep-darboux-box'],
  assetRefs: [],
  accessibilityRefs: [],
  questionBindings: [],
  provenance: {
    authority: 'NON_CANONICAL_COMPILED_PROOF',
    sourceRefs: ['issue:163:integration-cross-subject-proof'],
  },
  scene: {
    id: 'riemann-scene',
    apiVersion: V.componentApiVersion,
    sceneVersion: V.scenePackageVersion,
    grids: [
      {
        id: 'darboux-grid',
        label: 'Riemann Partition Refinement Grid',
        rows: ['interval-0-1'],
        columns: ['col-n2', 'col-n4', 'col-n8', 'col-n16'],
      },
    ],
    entities: [
      {
        id: 'ent-p2',
        label: 'Partition P_2 (n=2, Δx=0.5): L=0.1250, U=0.6250',
      },
    ],
    projections: [
      {
        id: 'proj-p2',
        entityRef: 'ent-p2',
        label: 'P_2: [0.1250 ≤ ∫ x² dx ≤ 0.6250]',
        representation: 'rep-darboux-box',
        placement: {
          grid: 'darboux-grid',
          row: 'interval-0-1',
          column: 'col-n2',
        },
      },
    ],
    targets: [
      { id: 'target-refine-n4', operation: 'subdivide' },
      { id: 'target-refine-n8', operation: 'subdivide' },
      { id: 'target-refine-n16', operation: 'subdivide' },
    ],
    canonicalTransformations: [
      {
        id: 'tx-refine-n4',
        sourceEntityRefs: ['ent-p2'],
        targetRef: 'target-refine-n4',
      },
      {
        id: 'tx-refine-n8',
        sourceEntityRefs: ['ent-p2'],
        targetRef: 'target-refine-n8',
      },
    ],
  },
  adapter: {
    id: V.declarativeAdapterId,
    apiVersion: V.adapterApiVersion,
    rules: [
      {
        id: 'rule-refine-n4',
        outcome: 'ACCEPT',
        transformationRef: 'tx-refine-n4',
        sourceEntityRef: 'ent-p2',
        targetRef: 'target-refine-n4',
        operation: 'subdivide',
        summary: 'Refine partition to n=4 subintervals',
        patch: {
          addEntities: [
            {
              id: 'ent-p4',
              label: 'Partition P_4 (n=4, Δx=0.25): L=0.2188, U=0.4688',
            },
          ],
          addProjections: [
            {
              id: 'proj-p4',
              entityRef: 'ent-p4',
              label: 'P_4: [0.2188 ≤ ∫ x² dx ≤ 0.4688]',
              representation: 'rep-darboux-box',
              placement: {
                grid: 'darboux-grid',
                row: 'interval-0-1',
                column: 'col-n4',
              },
            },
          ],
        },
      },
      {
        id: 'rule-refine-n8',
        outcome: 'ACCEPT',
        transformationRef: 'tx-refine-n8',
        sourceEntityRef: 'ent-p2',
        targetRef: 'target-refine-n8',
        operation: 'subdivide',
        summary: 'Refine partition to n=8 subintervals',
        patch: {
          addEntities: [
            {
              id: 'ent-p8',
              label: 'Partition P_8 (n=8, Δx=0.125): L=0.2734, U=0.3984',
            },
          ],
          addProjections: [
            {
              id: 'proj-p8',
              entityRef: 'ent-p8',
              label: 'P_8: [0.2734 ≤ ∫ x² dx ≤ 0.3984]',
              representation: 'rep-darboux-box',
              placement: {
                grid: 'darboux-grid',
                row: 'interval-0-1',
                column: 'col-n8',
              },
            },
          ],
        },
      },
    ],
  },
};

// ---------------------------------------------------------------------------
// 2. Arithmetic Long Division Scaffold Package
// ---------------------------------------------------------------------------

export const LONG_DIVISION_PACKAGE: PortableWorkbenchPackage = {
  schemaVersion: V.packageSchema,
  packageVersion: V.packageVersion,
  componentApiVersion: V.componentApiVersion,
  transformationIrVersion: V.transformationIrVersion,
  adapterApiVersion: V.adapterApiVersion,
  scenePackageVersion: V.scenePackageVersion,
  id: 'portable-long-division',
  title: 'Long Division — Multi-Step Arithmetic Scaffold',
  sourceRefs: ['tests/fixtures/workbench/arithmetic-division.json'],
  sceneRefs: ['division-scene'],
  representationRefs: ['rep-tableau-step'],
  assetRefs: [],
  accessibilityRefs: [],
  questionBindings: [],
  provenance: {
    authority: 'NON_CANONICAL_COMPILED_PROOF',
    sourceRefs: ['tests/fixtures/workbench/arithmetic-division.json'],
  },
  scene: {
    id: 'division-scene',
    apiVersion: V.componentApiVersion,
    sceneVersion: V.scenePackageVersion,
    grids: [
      {
        id: 'tableau-grid',
        label: 'Division Tableau: 492 / 4',
        rows: ['row-quotient', 'row-dividend', 'row-subtract', 'row-remainder'],
        columns: ['col-hundreds', 'col-tens', 'col-units'],
      },
    ],
    entities: [
      {
        id: 'ent-setup',
        label: 'Dividend 492 with Divisor 4: Ready for Hundreds Digit',
      },
    ],
    projections: [
      {
        id: 'proj-setup',
        entityRef: 'ent-setup',
        label: '492 ÷ 4 [Step 0]',
        representation: 'rep-tableau-step',
        placement: {
          grid: 'tableau-grid',
          row: 'row-dividend',
          column: 'col-hundreds',
        },
      },
    ],
    targets: [
      { id: 'target-step1', operation: 'derive-digit' },
      { id: 'target-step2', operation: 'derive-digit' },
    ],
    canonicalTransformations: [
      {
        id: 'tx-step1',
        sourceEntityRefs: ['ent-setup'],
        targetRef: 'target-step1',
      },
      {
        id: 'tx-step2',
        sourceEntityRefs: ['ent-setup'],
        targetRef: 'target-step2',
      },
    ],
  },
  adapter: {
    id: V.declarativeAdapterId,
    apiVersion: V.adapterApiVersion,
    rules: [
      {
        id: 'rule-first-quotient-digit',
        outcome: 'ACCEPT',
        transformationRef: 'tx-step1',
        sourceEntityRef: 'ent-setup',
        targetRef: 'target-step1',
        operation: 'derive-digit',
        summary: 'Step 1: 4 hundreds ÷ 4 = 1 hundred (quotient digit = 1, remainder = 0)',
        patch: {
          addEntities: [
            {
              id: 'ent-q-hundreds',
              label: 'Quotient Hundreds: 1 (1 × 4 = 4, 4 - 4 = 0)',
            },
          ],
          addProjections: [
            {
              id: 'proj-q1',
              entityRef: 'ent-q-hundreds',
              label: 'Q: 1 _ _',
              representation: 'rep-tableau-step',
              placement: {
                grid: 'tableau-grid',
                row: 'row-quotient',
                column: 'col-hundreds',
              },
            },
          ],
        },
      },
      {
        id: 'rule-second-quotient-digit',
        outcome: 'ACCEPT',
        transformationRef: 'tx-step2',
        sourceEntityRef: 'ent-setup',
        targetRef: 'target-step2',
        operation: 'derive-digit',
        summary: 'Step 2: Bring down 9; 9 tens ÷ 4 = 2 tens (quotient digit = 2, remainder = 1)',
        patch: {
          addEntities: [
            {
              id: 'ent-q-tens',
              label: 'Quotient Tens: 2 (2 × 4 = 8, 9 - 8 = 1 ten)',
            },
          ],
          addProjections: [
            {
              id: 'proj-q2',
              entityRef: 'ent-q-tens',
              label: 'Q: 1 2 _',
              representation: 'rep-tableau-step',
              placement: {
                grid: 'tableau-grid',
                row: 'row-quotient',
                column: 'col-tens',
              },
            },
          ],
        },
      },
    ],
  },
};

// ---------------------------------------------------------------------------
// 3. Mathematical Analytical Oracles for Verification
// ---------------------------------------------------------------------------

/**
 * Analytical formula for lower Darboux sum of f(x) = x^2 on [0, 1] with n equal subintervals:
 * L(f, P_n) = (n - 1)(2n - 1) / (6n^2)
 */
export function analyticalLowerDarbouxSum(n: number): number {
  if (!Number.isInteger(n) || n < 1) throw new Error('Invalid subinterval count');
  return ((n - 1) * (2 * n - 1)) / (6 * n * n);
}

/**
 * Analytical formula for upper Darboux sum of f(x) = x^2 on [0, 1] with n equal subintervals:
 * U(f, P_n) = (n + 1)(2n + 1) / (6n^2)
 */
export function analyticalUpperDarbouxSum(n: number): number {
  if (!Number.isInteger(n) || n < 1) throw new Error('Invalid subinterval count');
  return ((n + 1) * (2 * n + 1)) / (6 * n * n);
}

/**
 * Exact analytical integral ∫_0^1 x^2 dx = 1/3
 */
export const EXACT_RIEMANN_INTEGRAL = 1 / 3;
