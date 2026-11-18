/**
 * web/applications/portable/adapter.ts
 * A64 — Portable workbench runtime adapter and transformation execution engine.
 *
 * Implements:
 * - Fail-closed declarative package loader and validator
 * - Semantic rule execution (ACCEPT / REJECT) without executable script or eval()
 * - Dynamic scene patch application (entities and projections addition/removal)
 * - State persistence across device rotation and touch navigation
 * - Accessible semantic table and description generator for assistive tech
 *
 * No academic approval inferred from software validation.
 */

import { validatePortablePackage } from './validator.ts';
import type {
  PortableWorkbenchPackage,
  SceneEntity,
  SceneProjection,
  AdapterRule,
  PortableWorkbenchState,
} from './types.ts';

export interface TransformationOutcome {
  readonly ruleId: string;
  readonly outcome: 'ACCEPT' | 'REJECT';
  readonly summary?: string;
  readonly reason?: string;
}

export class PortableWorkbenchAdapter {
  private pkg: PortableWorkbenchPackage;
  private activeEntityId: string | null = null;
  private dynamicEntities: SceneEntity[] = [];
  private dynamicProjections: SceneProjection[] = [];
  private removedProjectionIds: Set<string> = new Set();
  private appliedRuleIds: string[] = [];
  private rotationDegrees: number = 0;
  private revision: number = 1;

  constructor(pkg: PortableWorkbenchPackage) {
    const validation = validatePortablePackage(pkg);
    if (!validation.isValid) {
      const errMsgs = validation.errors.map((e) => `[${e.code}] ${e.message}`).join('; ');
      throw new Error(`Invalid Portable Workbench Package: ${errMsgs}`);
    }

    this.pkg = pkg;
    if (this.pkg.scene.entities.length > 0) {
      this.activeEntityId = this.pkg.scene.entities[0]!.id;
    }
  }

  getPackage(): PortableWorkbenchPackage {
    return this.pkg;
  }

  getActiveEntityId(): string | null {
    return this.activeEntityId;
  }

  setActiveEntityId(id: string | null): boolean {
    if (id !== null && !this.getAllEntities().some((e) => e.id === id)) {
      return false;
    }
    this.activeEntityId = id;
    this.revision++;
    return true;
  }

  getAppliedRules(): readonly string[] {
    return [...this.appliedRuleIds];
  }

  getAllEntities(): readonly SceneEntity[] {
    return [...this.pkg.scene.entities, ...this.dynamicEntities];
  }

  getAllProjections(): readonly SceneProjection[] {
    const base = this.pkg.scene.projections.filter((p) => !this.removedProjectionIds.has(p.id));
    return [...base, ...this.dynamicProjections];
  }

  getAvailableRules(): readonly AdapterRule[] {
    return this.pkg.adapter.rules;
  }

  /**
   * Applies a declarative semantic transformation rule by ID.
   * If outcome is ACCEPT, applies the patch to the scene.
   * If outcome is REJECT, returns the refusal reason and preserves existing state.
   */
  applyRule(ruleId: string): TransformationOutcome {
    const rule = this.pkg.adapter.rules.find((r) => r.id === ruleId);
    if (!rule) {
      return {
        ruleId,
        outcome: 'REJECT',
        reason: `Transformation rule "${ruleId}" not found in package adapter.`,
      };
    }

    if (rule.outcome === 'REJECT') {
      return {
        ruleId: rule.id,
        outcome: 'REJECT',
        reason: rule.reason || 'Transformation violates physical consistency or semantic rules.',
      };
    }

    // Apply ACCEPT patch
    if (rule.patch) {
      if (rule.patch.addEntities) {
        this.dynamicEntities.push(...rule.patch.addEntities);
      }
      if (rule.patch.addProjections) {
        this.dynamicProjections.push(...rule.patch.addProjections);
      }
      if (rule.patch.removeProjections) {
        for (const remId of rule.patch.removeProjections) {
          this.removedProjectionIds.add(remId);
        }
      }
    }

    this.appliedRuleIds.push(rule.id);
    this.revision++;

    return {
      ruleId: rule.id,
      outcome: 'ACCEPT',
      summary: rule.summary || 'Transformation accepted and applied to declarative scene.',
    };
  }

  setRotation(degrees: number): void {
    this.rotationDegrees = degrees % 360;
    this.revision++;
  }

  getRotation(): number {
    return this.rotationDegrees;
  }

  // --- Persistence & State Restoration ---

  exportState(): PortableWorkbenchState {
    return {
      packageId: this.pkg.id,
      activeEntityId: this.activeEntityId,
      appliedRuleIds: [...this.appliedRuleIds],
      dynamicEntities: [...this.dynamicEntities],
      dynamicProjections: [...this.dynamicProjections],
      rotationDegrees: this.rotationDegrees,
      revision: this.revision,
    };
  }

  restoreState(state: PortableWorkbenchState): void {
    if (state.packageId !== this.pkg.id) {
      throw new Error(
        `State package mismatch: expected "${this.pkg.id}", got "${state.packageId}".`
      );
    }
    this.activeEntityId = state.activeEntityId;
    this.appliedRuleIds = [...state.appliedRuleIds];
    this.dynamicEntities = [...state.dynamicEntities];
    this.dynamicProjections = [...state.dynamicProjections];
    this.rotationDegrees = state.rotationDegrees;
    this.revision = state.revision + 1;
  }

  // --- Accessible Semantic Descriptions ---

  generateAccessibleSummary(): string {
    const allProjections = this.getAllProjections();
    let text = `Portable Workbench: "${this.pkg.title}" (${this.pkg.provenance.authority}). Grids: `;

    const gridSummaries = this.pkg.scene.grids.map((g) => {
      const placedInGrid = allProjections.filter((p) => p.placement.grid === g.id);
      return `Grid "${g.label}" has ${placedInGrid.length} placed projections.`;
    });

    text += gridSummaries.join(' ') + ` Active applied transformations: ${this.appliedRuleIds.length}.`;
    return text;
  }
}
