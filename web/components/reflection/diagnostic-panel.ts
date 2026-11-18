/**
 * web/components/reflection/diagnostic-panel.ts
 * A52 — Qualified Diagnostic Panel Component Controller.
 *
 * Implements:
 * - Learner error self-diagnosis using qualified misconception rules
 * - Invariant: Rejects fabricated or unsupported diagnosis categories
 * - Explicit commitment required before proceeding to repair
 * - 48px minimum touch hitbox on all selection targets
 *
 * No academic approval inferred from software validation.
 */

import { HIT_TARGET_MIN_PX } from '../../styles/tokens.ts';
import type { DiagnosticRule } from '../../journeys/core1b.ts';

export interface DiagnosticPanelConfig {
  readonly rules: readonly DiagnosticRule[];
  readonly initialSelectedCode?: string;
  readonly isCommitted?: boolean;
}

export interface DiagnosticPanelViewState {
  readonly rules: readonly DiagnosticRule[];
  readonly selectedCode: string | null;
  readonly isCommitted: boolean;
  readonly minHitTargetPx: number;
}

export class DiagnosticPanelController {
  private rules: readonly DiagnosticRule[];
  private selectedCode: string | null = null;
  private isCommitted: boolean = false;

  constructor(config: DiagnosticPanelConfig) {
    if (!config.rules || config.rules.length === 0) {
      throw new Error('NO_QUALIFIED_RULES: Diagnostic panel requires qualified rules; fabricated diagnosis forbidden');
    }
    this.rules = config.rules;
    if (config.initialSelectedCode) {
      this.selectCode(config.initialSelectedCode);
    }
    if (config.isCommitted) {
      this.isCommitted = true;
    }
  }

  selectCode(code: string): void {
    if (this.isCommitted) {
      throw new Error('DIAGNOSIS_LOCKED: Committed diagnosis cannot be mutated');
    }
    const found = this.rules.find((r) => r.code === code);
    if (!found) {
      throw new Error(`FABRICATED_DIAGNOSIS_REJECTED: Code ${code} is not an accepted qualified rule`);
    }
    this.selectedCode = code;
  }

  commit(): void {
    if (!this.selectedCode) {
      throw new Error('DIAGNOSIS_SELECTION_REQUIRED: Select a diagnosis before committing');
    }
    this.isCommitted = true;
  }

  getSelectedRule(): DiagnosticRule | null {
    if (!this.selectedCode) return null;
    return this.rules.find((r) => r.code === this.selectedCode) || null;
  }

  getViewState(): DiagnosticPanelViewState {
    return {
      rules: this.rules,
      selectedCode: this.selectedCode,
      isCommitted: this.isCommitted,
      minHitTargetPx: HIT_TARGET_MIN_PX,
    };
  }

  render(): string {
    const state = this.getViewState();

    return `
<div class="g9-diagnostic-panel" data-committed="${state.isCommitted}" style="font-family: system-ui, sans-serif; color: #1e293b;">
  <h3 style="font-size: 16px; font-weight: 700; color: #0f172a; margin: 0 0 8px 0;">Learner Error Diagnosis</h3>
  <p style="font-size: 14px; color: #64748b; margin: 0 0 16px 0;">Select the qualified conceptual diagnosis that best explains the divergence in your working:</p>

  <div class="g9-diagnostic-options" style="display: flex; flex-direction: column; gap: 10px; margin-bottom: 20px;">
    ${state.rules.map((rule) => {
      const isSelected = rule.code === state.selectedCode;
      return `
      <label
        class="g9-diagnostic-option"
        data-code="${rule.code}"
        style="display: flex; align-items: flex-start; gap: 12px; min-height: ${HIT_TARGET_MIN_PX}px; padding: 12px 16px; background: ${isSelected ? '#eff6ff' : '#f8fafc'}; border: 1px solid ${isSelected ? '#2563eb' : '#e2e8f0'}; border-radius: 8px; cursor: ${state.isCommitted ? 'default' : 'pointer'};"
      >
        <input
          type="radio"
          name="diagnostic-selection"
          value="${rule.code}"
          ${isSelected ? 'checked' : ''}
          ${state.isCommitted ? 'disabled' : ''}
          style="width: 20px; height: 20px; margin-top: 2px;"
        />
        <div>
          <div style="font-size: 14px; font-weight: 700; color: #1e293b;">${rule.label} (<code>${rule.code}</code>)</div>
          <div style="font-size: 13px; color: #475569; margin-top: 2px;">${rule.misconceptionDescription}</div>
          <div style="font-size: 12px; color: #0284c7; margin-top: 4px; font-style: italic;">Guidance: ${rule.correctiveGuidance}</div>
        </div>
      </label>`;
    }).join('')}
  </div>

  ${!state.isCommitted ? `
    <button
      class="g9-btn g9-commit-diagnosis-btn"
      data-action="commit-diagnosis"
      aria-label="Commit Diagnosis"
      style="min-height: ${HIT_TARGET_MIN_PX}px; min-width: ${HIT_TARGET_MIN_PX}px; padding: 10px 18px; font-size: 14px; font-weight: 600; background: #2563eb; color: #ffffff; border: 0; border-radius: 6px; cursor: pointer;"
      ${!state.selectedCode ? 'disabled style="opacity: 0.5;"' : ''}
    >
      Commit Diagnosis &rarr;
    </button>` : `
    <div class="g9-diagnosis-committed-banner" style="background: #f0fdf4; border: 1px solid #bbf7d0; padding: 10px 14px; border-radius: 6px; font-size: 13px; font-weight: 600; color: #15803d;">
      &check; Diagnosis committed: ${state.selectedCode} (locked)
    </div>`}
</div>`;
  }
}
