/**
 * web/runtime/chem-packages.ts
 * A64 / DEC-A59-PORTABLE-COMPATIBILITY-01 — Declarative Portable Workbench Packages for Chemistry.
 *
 * Implements:
 * REDOX_ELECTRON_EQUIVALENCE_PACKAGE (portable-redox-electron-equivalence):
 * - Migrated from exact verified v3.5 source custody (Grade9v3.5 commit 8a02a8eb, blob 30cb6104...)
 * - Provenance: NON_CANONICAL_COMPILED_PROOF / COMPILED_PROOF_FIXTURE
 * - Declarative scene grids, entities (Fe2+, Ce4+), projections (oxidation ledger, half-reactions),
 *   and canonical electron matching transformation (equate-redox-electrons: 1 e- lost = 1 e- gained).
 *
 * Conforms to:
 * - packageVersion: '1.0.0', componentApiVersion: '0.1.0', adapterApiVersion: '0.2.0', scenePackageVersion: '1.0.0'
 * - 15 fail-closed validation rules in validatePortablePackage.
 *
 * No academic approval inferred from software validation.
 */

import type { PortableWorkbenchPackage } from '../applications/portable/types.ts';
import { PORTABLE_VERSION_SEAMS as V } from '../applications/portable/types.ts';

// ---------------------------------------------------------------------------
// Redox Oxidation-State & Electron Equivalence Package
// ---------------------------------------------------------------------------

export const REDOX_ELECTRON_EQUIVALENCE_PACKAGE: PortableWorkbenchPackage = {
  schemaVersion: V.packageSchema,
  packageVersion: V.packageVersion,
  componentApiVersion: V.componentApiVersion,
  transformationIrVersion: V.transformationIrVersion,
  adapterApiVersion: V.adapterApiVersion,
  scenePackageVersion: V.scenePackageVersion,
  id: 'portable-redox-electron-equivalence',
  title: 'Redox oxidation-state and electron-equivalence proof',
  sourceRefs: [
    'standalone/chemistry-redox-reactions-master-suite.html',
    'public/chemistry/redox/explorers/redox_reactions/index.html',
  ],
  sceneRefs: ['redox-electron-equivalence-proof'],
  representationRefs: [
    'oxidation-state ledger',
    'half-reaction',
    'electron equivalence',
  ],
  assetRefs: [],
  accessibilityRefs: ['text state', 'keyboard transfer'],
  questionBindings: [],
  provenance: {
    authority: 'NON_CANONICAL_COMPILED_PROOF',
    sourceKind: 'COMPILED_PROOF_FIXTURE',
    sourceRefs: [
      'standalone/chemistry-redox-reactions-master-suite.html',
      'public/chemistry/redox/explorers/redox_reactions/index.html',
    ],
  },
  scene: {
    apiVersion: V.componentApiVersion,
    sceneVersion: V.scenePackageVersion,
    id: 'redox-electron-equivalence-proof',
    grids: [
      {
        id: 'redox-grid',
        label: 'Redox ledger',
        rows: ['oxidation-state', 'half-reaction', 'equivalence'],
        columns: ['oxidation', 'relation', 'reduction'],
      },
    ],
    entities: [
      {
        id: 'iron-ii',
        label: 'Fe2+',
        provenance: {
          kind: 'SOURCE',
          sourceEntityRefs: [],
        },
      },
      {
        id: 'cerium-iv',
        label: 'Ce4+',
        provenance: {
          kind: 'SOURCE',
          sourceEntityRefs: [],
        },
      },
    ],
    projections: [
      {
        id: 'iron-ledger',
        entityRef: 'iron-ii',
        label: 'Fe: +2 -> +3',
        representation: 'oxidation-state ledger',
        placement: {
          grid: 'redox-grid',
          row: 'oxidation-state',
          column: 'oxidation',
        },
      },
      {
        id: 'iron-half-reaction',
        entityRef: 'iron-ii',
        label: 'Fe2+ -> Fe3+ + e-',
        representation: 'half-reaction',
        placement: {
          grid: 'redox-grid',
          row: 'half-reaction',
          column: 'oxidation',
        },
      },
      {
        id: 'cerium-half-reaction',
        entityRef: 'cerium-iv',
        label: 'Ce4+ + e- -> Ce3+',
        representation: 'half-reaction',
        placement: {
          grid: 'redox-grid',
          row: 'half-reaction',
          column: 'reduction',
        },
      },
    ],
    targets: [
      {
        id: 'electron-equivalence',
        label: 'Match electron loss and gain',
        operation: 'match-electrons',
        placement: {
          grid: 'redox-grid',
          row: 'equivalence',
          column: 'relation',
        },
      },
    ],
    canonicalTransformations: [
      {
        id: 'equate-redox-electrons',
        sourceEntityRefs: ['iron-ii', 'cerium-iv'],
        targetRef: 'electron-equivalence',
      },
    ],
  },
  adapter: {
    id: V.declarativeAdapterId,
    apiVersion: V.adapterApiVersion,
    rules: [
      {
        id: 'rule-equate-redox-electrons',
        transformationRef: 'equate-redox-electrons',
        sourceEntityRef: 'iron-ii',
        targetRef: 'electron-equivalence',
        operation: 'match-electrons',
        summary: 'One electron lost by Fe2+ matches one electron gained by Ce4+.',
        patch: {
          addEntities: [
            {
              id: 'balanced-electron-ledger',
              label: '1 e- lost = 1 e- gained',
              provenance: {
                kind: 'DERIVED',
                sourceEntityRefs: ['iron-ii', 'cerium-iv'],
              },
            },
          ],
          addProjections: [
            {
              id: 'electron-equivalence-result',
              entityRef: 'balanced-electron-ledger',
              label: '1 e- = 1 e-',
              representation: 'electron equivalence',
              placement: {
                grid: 'redox-grid',
                row: 'equivalence',
                column: 'relation',
              },
            },
          ],
        },
      },
    ],
  },
  injections: [],
};
