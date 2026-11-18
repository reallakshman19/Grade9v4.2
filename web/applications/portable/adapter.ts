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

import {canonicalJson} from '../../runtime/loader.ts';
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
  private readonly pkg:PortableWorkbenchPackage;
  private readonly identity:string;
  private activeEntityId: string | null = null;
  private dynamicEntities: SceneEntity[] = [];
  private dynamicProjections: SceneProjection[] = [];
  private removedProjectionIds: Set<string> = new Set();
  private appliedRuleIds:string[]=[];
  private ruleHistory:{ruleId:string;activeEntityId:string|null}[]=[];
  private rotationDegrees: number = 0;
  private revision: number = 1;

  constructor(pkg: PortableWorkbenchPackage) {
    const validation = validatePortablePackage(pkg);
    if (!validation.isValid) {
      const errMsgs = validation.errors.map((e) => `[${e.code}] ${e.message}`).join('; ');
      throw new Error(`Invalid Portable Workbench Package: ${errMsgs}`);
    }

    this.pkg=structuredClone(pkg);this.identity=canonicalJson(this.pkg);
    if (this.pkg.scene.entities.length > 0) {
      this.activeEntityId = this.pkg.scene.entities[0]!.id;
    }
  }

  getPackage(): PortableWorkbenchPackage {
    return structuredClone(this.pkg);
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
    return structuredClone([...this.pkg.scene.entities,...this.dynamicEntities]);
  }

  getAllProjections(): readonly SceneProjection[] {
    const base = this.pkg.scene.projections.filter((p) => !this.removedProjectionIds.has(p.id));
    return structuredClone([...base,...this.dynamicProjections.filter(p=>!this.removedProjectionIds.has(p.id))]);
  }

  getAvailableRules(): readonly AdapterRule[] {
    return structuredClone(this.pkg.adapter.rules);
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

    if(this.appliedRuleIds.includes(rule.id))return {ruleId,outcome:'REJECT',reason:'Rule already applied'};
    if(rule.sourceEntityRef&&rule.sourceEntityRef!==this.activeEntityId)return {ruleId,outcome:'REJECT',reason:'Source entity is not active'};
    if(rule.patch){const es=rule.patch.addEntities??[],ps=rule.patch.addProjections??[],rm=rule.patch.removeProjections??[];const oldE=this.getAllEntities(),oldP=this.getAllProjections();if(es.some(e=>oldE.some(x=>x.id===e.id))||ps.some(p=>oldP.some(x=>x.id===p.id)||this.removedProjectionIds.has(p.id)||![...oldE,...es].some(e=>e.id===p.entityRef))||rm.some(id=>!oldP.some(p=>p.id===id)))return {ruleId,outcome:'REJECT',reason:'Conflicting or missing patch identity'};}
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

    this.appliedRuleIds.push(rule.id);this.ruleHistory.push({ruleId:rule.id,activeEntityId:this.activeEntityId});
    this.revision++;

    return {
      ruleId: rule.id,
      outcome: 'ACCEPT',
      summary: rule.summary || 'Transformation accepted and applied to declarative scene.',
    };
  }

  setRotation(degrees: number): void {
    if(!Number.isFinite(degrees)||!Number.isInteger(degrees)||degrees%90!==0)throw Error('Invalid rotation');this.rotationDegrees=((degrees%360)+360)%360;
    this.revision++;
  }

  getRotation(): number {
    return this.rotationDegrees;
  }

  // --- Persistence & State Restoration ---

  exportState(): PortableWorkbenchState {
    return {
      packageId: this.pkg.id,
      packageIdentity:this.identity,
      activeEntityId: this.activeEntityId,
      appliedRuleIds:[...this.appliedRuleIds],ruleHistory:structuredClone(this.ruleHistory),
      dynamicEntities:structuredClone(this.dynamicEntities),
      dynamicProjections:structuredClone(this.dynamicProjections),
      rotationDegrees: this.rotationDegrees,
      revision: this.revision,
    };
  }

  restoreState(state: PortableWorkbenchState): void {
    if(state.packageId!==this.pkg.id||state.packageIdentity!==this.identity||!Number.isSafeInteger(state.revision)||state.revision<1||!Array.isArray(state.appliedRuleIds)||new Set(state.appliedRuleIds).size!==state.appliedRuleIds.length)throw Error('Invalid or foreign package snapshot');
    if(!Array.isArray(state.ruleHistory)||state.ruleHistory.length!==state.appliedRuleIds.length)throw Error('Missing rule history');
    const replay=new PortableWorkbenchAdapter(this.pkg);
    for(const [i,h] of state.ruleHistory.entries()){if(!h||h.ruleId!==state.appliedRuleIds[i]||!replay.setActiveEntityId(h.activeEntityId)||replay.applyRule(h.ruleId).outcome!=='ACCEPT')throw Error('Invalid rule history');}
    if(canonicalJson(replay.dynamicEntities)!==canonicalJson(state.dynamicEntities)||canonicalJson(replay.dynamicProjections)!==canonicalJson(state.dynamicProjections)||!replay.setActiveEntityId(state.activeEntityId))throw Error('Forged scene snapshot');
    replay.setRotation(state.rotationDegrees);
    this.activeEntityId=replay.activeEntityId;this.appliedRuleIds=replay.appliedRuleIds;this.ruleHistory=replay.ruleHistory;this.dynamicEntities=replay.dynamicEntities;this.dynamicProjections=replay.dynamicProjections;this.removedProjectionIds=replay.removedProjectionIds;this.rotationDegrees=replay.rotationDegrees;this.revision=state.revision;
  }

  // --- Accessible Semantic Descriptions ---

  generateAccessibleSummary(): string {
    const allProjections = this.getAllProjections();
    let text = `Portable Workbench: "${this.pkg.title}" (unverified diagnostic package; declared ${this.pkg.provenance.authority}). Grids: `;

    const gridSummaries = this.pkg.scene.grids.map((g) => {
      const placedInGrid = allProjections.filter((p) => p.placement.grid === g.id);
      return `Grid "${g.label}" has ${placedInGrid.length} placed projections.`;
    });

    text += gridSummaries.join(' ') + ` Active applied transformations: ${this.appliedRuleIds.length}.`;
    return text;
  }
}
