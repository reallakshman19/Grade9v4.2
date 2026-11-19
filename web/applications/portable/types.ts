/**
 * web/applications/portable/types.ts
 * A64 — Portable workbench adapter contracts and type definitions.
 *
 * Implements:
 * - Version seams matching v3.5 native contract:
 *   packageVersion: '1.0.0'
 *   componentApiVersion: '0.1.0'
 *   transformationIrVersion: '0.1.0'
 *   adapterApiVersion: '0.2.0'
 *   scenePackageVersion: '1.0.0'
 * - Declarative scene grids, entities, projections, and canonical transformations
 * - Strict provenance discrimination: CANONICAL_COMPILED_RESOURCE vs NON_CANONICAL_COMPILED_PROOF
 * - Rejection codes for fail-closed security and boundary enforcement
 *
 * No academic approval inferred from software validation.
 */

export const PORTABLE_VERSION_SEAMS = {
  packageSchema: 'portable-workbench-package',
  packageVersion: '1.0.0',
  componentApiVersion: '0.1.0',
  transformationIrVersion: '0.1.0',
  adapterApiVersion: '0.2.0',
  scenePackageVersion: '1.0.0',
  declarativeAdapterId: 'declarative-transfer-v1',
} as const;

export interface GridPlacement {
  readonly grid: string;
  readonly row: string;
  readonly column: string;
}

export interface SceneGrid {
  readonly id: string;
  readonly label: string;
  readonly rows: readonly string[];
  readonly columns: readonly string[];
}

export interface SceneEntity {
  readonly id: string;
  readonly label: string;
  readonly provenance?: {
    readonly kind?: string;
    readonly sourceEntityRefs?: readonly string[];
    readonly [key: string]: unknown;
  };
}

export interface SceneProjection {
  readonly id: string;
  readonly entityRef: string;
  readonly label: string;
  readonly representation: string;
  readonly placement: GridPlacement;
}

export interface SceneCanonicalTransformation {
  readonly id: string;
  readonly sourceEntityRefs: readonly string[];
  readonly targetRef: string;
  readonly [key: string]: unknown;
}

export interface PortableScene {
  readonly apiVersion: string;
  readonly sceneVersion: string;
  readonly id: string;
  readonly grids: readonly SceneGrid[];
  readonly entities: readonly SceneEntity[];
  readonly projections: readonly SceneProjection[];
  readonly targets?: readonly unknown[];
  readonly canonicalTransformations?: readonly SceneCanonicalTransformation[];
}

export interface AdapterRulePatch {
  readonly addEntities?: readonly SceneEntity[];
  readonly addProjections?: readonly SceneProjection[];
  readonly removeProjections?: readonly string[];
}

export interface AdapterRule {
  readonly id: string;
  readonly transformationRef?: string;
  readonly sourceEntityRef?: string;
  readonly targetRef?: string;
  readonly operation?: string;
  readonly outcome: 'ACCEPT' | 'REJECT';
  readonly summary?: string;
  readonly reason?: string;
  readonly patch?: AdapterRulePatch;
}

export interface PortableAdapter {
  readonly id: string;
  readonly apiVersion: string;
  readonly rules: readonly AdapterRule[];
}

export type ProvenanceAuthority =
  | 'CANONICAL_COMPILED_RESOURCE'
  | 'NON_CANONICAL_COMPILED_PROOF';

export interface PortableProvenance {
  readonly authority: ProvenanceAuthority;
  readonly sourceKind?: string;
  readonly sourceRefs?: readonly string[];
  readonly resourceRef?: string;
  readonly representationRef?: string;
}

export interface PortableWorkbenchPackage {
  readonly schemaVersion: string;
  readonly packageVersion: string;
  readonly componentApiVersion: string;
  readonly transformationIrVersion: string;
  readonly adapterApiVersion: string;
  readonly scenePackageVersion: string;
  readonly id: string;
  readonly title: string;
  readonly sourceRefs: readonly string[];
  readonly sceneRefs: readonly string[];
  readonly representationRefs: readonly string[];
  readonly assetRefs: readonly unknown[];
  readonly accessibilityRefs: readonly unknown[];
  readonly questionBindings: readonly unknown[];
  readonly provenance: PortableProvenance;
  readonly scene: PortableScene;
  readonly adapter: PortableAdapter;
  readonly injections?: readonly unknown[];
  readonly resourceRef?: string;
}

export interface PortableValidationError {
  readonly code: string;
  readonly message: string;
  readonly field?: string;
}

export interface PortableWorkbenchState {
  readonly packageId: string;
  readonly packageIdentity:string; // Exact canonical diagnostic package bytes, not an authority receipt.
  readonly activeEntityId: string | null;
  readonly appliedRuleIds: readonly string[];
  readonly ruleHistory: readonly {readonly ruleId:string;readonly activeEntityId:string|null}[];
  readonly dynamicEntities: readonly SceneEntity[];
  readonly dynamicProjections: readonly SceneProjection[];
  readonly rotationDegrees: number;
  readonly revision: number;
}

