/**
 * web/components/reflection/repair-workspace.ts
 * A52 — Dedicated Repair Workspace Component Controller.
 *
 * Implements:
 * - Separate repair articulation area strictly isolated from immutable original attempt
 * - Boundary UI commit before feedback: boundary feedback is locked until committed
 * - Save failure guard: exposure save transaction failure blocks answer disclosure
 * - 48px minimum touch hitbox on all interactive elements
 *
 * No academic approval inferred from software validation.
 */

import { HIT_TARGET_MIN_PX } from '../../styles/tokens.ts';

export interface RepairWorkspaceConfig {
  readonly repairExplanation?: string;
  readonly isRepairCommitted?: boolean;
  readonly boundaryTaskPrompt?: string;
  readonly boundarySolution?: readonly string[];
  readonly isBoundaryCommitted?: boolean;
  readonly isSaveBlocked?: boolean;
}

export interface RepairWorkspaceViewState {
  readonly repairExplanation: string;
  readonly isRepairCommitted: boolean;
  readonly boundaryTaskPrompt: string;
  readonly isBoundaryCommitted: boolean;
  readonly isSaveBlocked: boolean;
  readonly canRevealBoundaryFeedback: boolean;
  readonly minHitTargetPx: number;
}

export class RepairWorkspaceController {
  private repairExplanation: string = '';
  private isRepairCommitted: boolean = false;
  private boundaryTaskPrompt: string = '';
  private boundarySolution: readonly string[] = [];
  private boundaryAttempt: string = '';
  private isBoundaryCommitted: boolean = false;
  private isSaveBlocked: boolean = false;

  constructor(config?: RepairWorkspaceConfig) {
    if (config?.repairExplanation) {
      this.repairExplanation = config.repairExplanation;
    }
    if (config?.isRepairCommitted) {
      this.isRepairCommitted = true;
    }
    if (config?.boundaryTaskPrompt) {
      this.boundaryTaskPrompt = config.boundaryTaskPrompt;
    }
    if (config?.boundarySolution) {
      this.boundarySolution = config.boundarySolution;
    }
    if (config?.isBoundaryCommitted) {
      this.isBoundaryCommitted = true;
    }
    if (config?.isSaveBlocked) {
      this.isSaveBlocked = true;
    }
  }

  updateRepairText(text: string): void {
    if (this.isRepairCommitted) {
      throw new Error('REPAIR_COMMITTED: Repair text is locked after commitment');
    }
    this.repairExplanation = text;
  }

  commitRepair(): void {
    if (!this.repairExplanation.trim()) {
      throw new Error('EMPTY_REPAIR: Formulate repair explanation before committing');
    }
    if (this.isSaveBlocked) {
      throw new Error('SAVE_TRANSACTION_FAILED: Exposure save failure blocks answer advancement');
    }
    this.isRepairCommitted = true;
  }

  updateBoundaryAttempt(text: string): void {
    if (this.isBoundaryCommitted) {
      throw new Error('BOUNDARY_COMMITTED: Boundary work is locked after commitment');
    }
    this.boundaryAttempt = text;
  }

  commitBoundary(): void {
    if (!this.boundaryAttempt.trim()) {
      throw new Error('EMPTY_BOUNDARY: Complete boundary task before committing');
    }
    if (this.isSaveBlocked) {
      throw new Error('SAVE_TRANSACTION_FAILED: Exposure save failure blocks answer advancement');
    }
    this.isBoundaryCommitted = true;
  }

  setSaveBlocked(blocked: boolean): void {
    this.isSaveBlocked = blocked;
  }

  getBoundaryFeedback(): readonly string[] {
    if (this.isSaveBlocked) {
      throw new Error('SAVE_BLOCKED: Save failure blocks answer feedback');
    }
    if (!this.isBoundaryCommitted) {
      throw new Error('BOUNDARY_FEEDBACK_LOCKED: Boundary must be committed before revealing feedback');
    }
    return this.boundarySolution;
  }

  getViewState(): RepairWorkspaceViewState {
    return {
      repairExplanation: this.repairExplanation,
      isRepairCommitted: this.isRepairCommitted,
      boundaryTaskPrompt: this.boundaryTaskPrompt,
      isBoundaryCommitted: this.isBoundaryCommitted,
      isSaveBlocked: this.isSaveBlocked,
      canRevealBoundaryFeedback: this.isBoundaryCommitted && !this.isSaveBlocked,
      minHitTargetPx: HIT_TARGET_MIN_PX,
    };
  }

  render(): string {
    const state = this.getViewState();

    return `
<div class="g9-repair-workspace" data-save-blocked="${state.isSaveBlocked}" style="font-family: system-ui, sans-serif; color: #1e293b;">
  ${state.isSaveBlocked ? `
    <div class="g9-save-blocked-alert" role="alert" style="background: #fef2f2; border: 1px solid #fecaca; color: #991b1b; padding: 12px 16px; border-radius: 8px; margin-bottom: 16px; font-size: 14px;">
      <strong>Transaction Failure:</strong> Progress save failed. Answer disclosure is blocked until storage connectivity is restored.
    </div>` : ''}

  <!-- Section 1: Conceptual Repair -->
  <section class="g9-repair-section" style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 18px; margin-bottom: 20px;">
    <h3 style="font-size: 16px; font-weight: 700; color: #0f172a; margin: 0 0 6px 0;">Separate Repair Formulation</h3>
    <p style="font-size: 14px; color: #64748b; margin: 0 0 12px 0;">Explain the physical principle and correct the inferential jump (leaves original work untouched):</p>

    <textarea
      class="g9-repair-input"
      rows="4"
      aria-label="Repair Explanation"
      placeholder="Articulate your corrected reasoning here..."
      ${state.isRepairCommitted ? 'disabled' : ''}
      style="width: 100%; box-sizing: border-box; padding: 12px; font-size: 14px; border: 1px solid #cbd5e1; border-radius: 6px; font-family: inherit; margin-bottom: 12px;"
    >${state.repairExplanation}</textarea>

    ${!state.isRepairCommitted ? `
      <button
        class="g9-btn g9-commit-repair-btn"
        data-action="commit-repair"
        aria-label="Commit Repair Formulation"
        style="min-height: ${HIT_TARGET_MIN_PX}px; min-width: ${HIT_TARGET_MIN_PX}px; padding: 10px 18px; font-size: 14px; font-weight: 600; background: #16a34a; color: #ffffff; border: 0; border-radius: 6px; cursor: pointer;"
        ${state.isSaveBlocked ? 'disabled style="opacity: 0.5;"' : ''}
      >
        Commit Repair &check;
      </button>` : `
      <div style="font-size: 13px; font-weight: 600; color: #15803d; background: #f0fdf4; padding: 8px 12px; border-radius: 6px; display: inline-block;">
        &check; Repair explanation committed (locked)
      </div>`}
  </section>

  <!-- Section 2: Boundary Transfer Test -->
  ${state.boundaryTaskPrompt ? `
    <section class="g9-boundary-section" style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 18px;">
      <h3 style="font-size: 16px; font-weight: 700; color: #0f172a; margin: 0 0 6px 0;">Boundary Transfer Test</h3>
      <p style="font-size: 14px; color: #334155; margin: 0 0 12px 0;">${state.boundaryTaskPrompt}</p>

      <textarea
        class="g9-boundary-input"
        rows="3"
        aria-label="Boundary Test Working"
        placeholder="Solve boundary condition..."
        ${state.isBoundaryCommitted ? 'disabled' : ''}
        style="width: 100%; box-sizing: border-box; padding: 12px; font-size: 14px; border: 1px solid #cbd5e1; border-radius: 6px; margin-bottom: 12px;"
      ></textarea>

      ${!state.isBoundaryCommitted ? `
        <button
          class="g9-btn g9-commit-boundary-btn"
          data-action="commit-boundary"
          aria-label="Commit Boundary Solution Before Feedback"
          style="min-height: ${HIT_TARGET_MIN_PX}px; min-width: ${HIT_TARGET_MIN_PX}px; padding: 10px 18px; font-size: 14px; font-weight: 600; background: #2563eb; color: #ffffff; border: 0; border-radius: 6px; cursor: pointer;"
          ${state.isSaveBlocked ? 'disabled style="opacity: 0.5;"' : ''}
        >
          Commit Boundary Solution &check;
        </button>` : `
        <div class="g9-boundary-feedback" style="margin-top: 12px; background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 6px; padding: 12px;">
          <h4 style="font-size: 13px; font-weight: 700; color: #166534; margin: 0 0 6px 0;">Boundary Solution Feedback (Unlocked):</h4>
          <ol style="margin: 0; padding-left: 20px; font-size: 13px; color: #14532d;">
            ${this.boundarySolution.map((s) => `<li>${s}</li>`).join('')}
          </ol>
        </div>`}
    </section>` : ''}
</div>`;
  }
}
