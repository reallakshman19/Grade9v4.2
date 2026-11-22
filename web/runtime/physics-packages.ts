/**
 * web/runtime/physics-packages.ts
 * A64 / DEC-A59-PORTABLE-COMPATIBILITY-01 — Declarative Portable Workbench Packages for Physics.
 *
 * Implements:
 * MOTION_SHARED_CLOCK_PACKAGE (portable-motion-shared-clock):
 * - Migrated from exact verified v3.5 source custody (Grade9v3.5 commit 8a02a8eb, blob df9eff90...)
 * - Provenance: CANONICAL_COMPILED_RESOURCE / CANONICAL_RESOURCE
 * - Decision status: ADOPT_AS_CANONICAL_CANDIDATE, academicAdmission: HOLD
 * - Declarative scene grids, entities (same-time candidate x(2s), y(2s); mixed-time candidate x(2s), y(3s)),
 *   projections, target reconstruct-plane-state, and canonical rules (same-time -> ACCEPT, mixed-time -> REJECT).
 *
 * Conforms to:
 * - packageVersion: '1.0.0', componentApiVersion: '0.1.0', adapterApiVersion: '0.2.0', scenePackageVersion: '1.0.0'
 * - 15 fail-closed validation rules in validatePortablePackage.
 *
 * No academic approval inferred from software validation.
 */

import type { PortableWorkbenchPackage } from '../applications/portable/types.ts';
import { PORTABLE_VERSION_SEAMS as V } from '../applications/portable/types.ts';

export const MOTION_SHARED_CLOCK_PACKAGE: PortableWorkbenchPackage = {
  schemaVersion: V.packageSchema,
  packageVersion: V.packageVersion,
  componentApiVersion: V.componentApiVersion,
  transformationIrVersion: V.transformationIrVersion,
  adapterApiVersion: V.adapterApiVersion,
  scenePackageVersion: V.scenePackageVersion,
  id: 'portable-motion-shared-clock',
  title: 'Independent Components, One Shared Clock Explorer',
  sourceRefs: ['SRC-AUTHOR-KIN-2D-EXAMSIDE-ADAPTATION'],
  sceneRefs: ['portable-motion-shared-clock-scene'],
  representationRefs: ['REP-KIN-2D-SHARED-CLOCK'],
  assetRefs: ['Physics/assets/representations/REP-KIN-2D-SHARED-CLOCK.svg'],
  accessibilityRefs: [
    'The shared time is stated numerically or textually; synchronization must not be conveyed by colour alone.',
    'Each component history is labelled with axis and signed quantity.',
    'An invalid mixed-time state is identified in text as non-simultaneous.',
  ],
  questionBindings: [],
  provenance: {
    authority: 'CANONICAL_COMPILED_RESOURCE',
    sourceKind: 'CANONICAL_RESOURCE',
    sourceRefs: ['SRC-AUTHOR-KIN-2D-EXAMSIDE-ADAPTATION'],
    resourceRef: 'ACT-KIN-2D-SHARED-CLOCK',
    representationRef: 'REP-KIN-2D-SHARED-CLOCK',
  },
  resourceRef: 'ACT-KIN-2D-SHARED-CLOCK',
  scene: {
    apiVersion: V.componentApiVersion,
    sceneVersion: V.scenePackageVersion,
    id: 'portable-motion-shared-clock-scene',
    grids: [
      {
        id: 'shared-clock-grid',
        label:
          'Same-time x and y samples may reconstruct one simultaneous particle state; mixed-time samples are non-simultaneous and must be rejected.',
        rows: ['candidate', 'reconstruction'],
        columns: ['sample', 'state'],
      },
    ],
    entities: [
      {
        id: 'shared-clock-same-time-candidate',
        label: 'x(2 s), y(2 s)',
        provenance: {
          kind: 'SOURCE',
          sourceEntityRefs: [],
        },
      },
      {
        id: 'shared-clock-mixed-time-candidate',
        label: 'x(2 s), y(3 s)',
        provenance: {
          kind: 'SOURCE',
          sourceEntityRefs: [],
        },
      },
    ],
    projections: [
      {
        id: 'shared-clock-same-time-candidate-projection',
        entityRef: 'shared-clock-same-time-candidate',
        label: 'x(2 s), y(2 s)',
        representation: 'SIMULTANEOUS',
        placement: {
          grid: 'shared-clock-grid',
          row: 'candidate',
          column: 'sample',
        },
      },
      {
        id: 'shared-clock-mixed-time-candidate-projection',
        entityRef: 'shared-clock-mixed-time-candidate',
        label: 'x(2 s), y(3 s)',
        representation: 'NON_SIMULTANEOUS',
        placement: {
          grid: 'shared-clock-grid',
          row: 'candidate',
          column: 'state',
        },
      },
    ],
    targets: [
      {
        id: 'shared-clock-plane-state',
        label: 'Reconstruct one simultaneous plane state',
        operation: 'reconstruct-plane-state',
        placement: {
          grid: 'shared-clock-grid',
          row: 'reconstruction',
          column: 'state',
        },
      },
    ],
    canonicalTransformations: [
      {
        id: 'same-time-transformation',
        sourceEntityRefs: ['shared-clock-same-time-candidate'],
        targetRef: 'shared-clock-plane-state',
      },
      {
        id: 'mixed-time-transformation',
        sourceEntityRefs: ['shared-clock-mixed-time-candidate'],
        targetRef: 'shared-clock-plane-state',
      },
    ],
  },
  adapter: {
    id: V.declarativeAdapterId,
    apiVersion: V.adapterApiVersion,
    rules: [
      {
        id: 'same-time',
        transformationRef: 'same-time-transformation',
        sourceEntityRef: 'shared-clock-same-time-candidate',
        targetRef: 'shared-clock-plane-state',
        operation: 'reconstruct-plane-state',
        outcome: 'ACCEPT',
        summary:
          'Same-time x(2 s) and y(2 s) samples refer to one shared physical instant and may be recombined.',
        patch: {
          addEntities: [
            {
              id: 'same-time-result',
              label:
                'Same-time x(2 s) and y(2 s) samples refer to one shared physical instant and may be recombined.',
              provenance: {
                kind: 'DERIVED',
                sourceEntityRefs: ['shared-clock-same-time-candidate'],
              },
            },
          ],
          addProjections: [
            {
              id: 'same-time-result-projection',
              entityRef: 'same-time-result',
              label: 'Reconstruct one simultaneous plane state',
              representation: 'accepted canonical reconstruction',
              placement: {
                grid: 'shared-clock-grid',
                row: 'reconstruction',
                column: 'sample',
              },
            },
          ],
        },
      },
      {
        id: 'mixed-time',
        transformationRef: 'mixed-time-transformation',
        sourceEntityRef: 'shared-clock-mixed-time-candidate',
        targetRef: 'shared-clock-plane-state',
        operation: 'reconstruct-plane-state',
        outcome: 'REJECT',
        reason:
          'Mixing x at one time with y at another does not describe any single physical state of the object.',
      },
    ],
  },
  injections: [],
};
