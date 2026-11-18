/**
 * web/pages/reflection.ts
 * A52 — Reconstruction, Diagnosis and Repair Page Controller and View.
 *
 * Implements:
 * - Route: /reflect/:id
 * - Actions: compare, diagnose, repair, history
 * - Declared screen states: "populated", "loading", "error", "unavailable", "pending"
 * - Immutable original learner attempt displayed beside canonical reviewed reasoning
 * - Move-specific comparison, qualified diagnosis selector, separate repair formulation
 * - Boundary commit before feedback
 * - 48px minimum touch hitbox on all interactive elements
 * - Rule 13 invariant preservation
 *
 * No academic approval inferred from software validation.
 */

import { HIT_TARGET_MIN_PX } from '../styles/tokens.ts';
import {
  ComparisonViewerController,
  DiagnosticPanelController,
  RepairWorkspaceController,
} from '../components/reflection/index.ts';
import type { DiagnosticRule } from '../journeys/core1b.ts';

export type DisplayOrientation = 'LANDSCAPE' | 'PORTRAIT';

export type ReflectionScreenState =
  | 'loading'
  | 'error'
  | 'populated'
  | 'unavailable'
  | 'pending';

export interface ReflectionPageConfig {
  readonly attemptId?: string;
  readonly originalAttemptText?: string;
  readonly canonicalReasoning?: readonly string[];
  readonly diagnosticRules?: readonly DiagnosticRule[];
  readonly boundaryTaskPrompt?: string;
  readonly boundarySolution?: readonly string[];
  readonly orientation?: DisplayOrientation;
  readonly initialState?: ReflectionScreenState;
  readonly errorMessage?: string;
}

export interface ReflectionPageViewState {
  readonly screenState: ReflectionScreenState;
  readonly attemptId: string;
  readonly activeTab: 'compare' | 'diagnose' | 'repair' | 'history';
  readonly orientation: DisplayOrientation;
  readonly isDiagnosisCommitted: boolean;
  readonly isRepairCommitted: boolean;
  readonly isBoundaryCommitted: boolean;
  readonly minHitTargetPx: number;
}

export class ReflectionPageController {
  private attemptId: string = '';
  private comparisonCtrl: ComparisonViewerController | null = null;
  private diagnosticCtrl: DiagnosticPanelController | null = null;
  private repairCtrl: RepairWorkspaceController | null = null;
  private screenState: ReflectionScreenState = 'populated';
  private errorMessage: string | null = null;
  private activeTab: 'compare' | 'diagnose' | 'repair' | 'history' = 'compare';
  private orientation: DisplayOrientation = 'LANDSCAPE';
  private historyLog: Array<{ readonly at: number; readonly action: string; readonly note: string }> = [];

  constructor(config: ReflectionPageConfig) {
    this.orientation = config.orientation || 'LANDSCAPE';

    if (config.initialState) {
      this.screenState = config.initialState;
      this.errorMessage = config.errorMessage || null;
    }

    if (config.attemptId && config.originalAttemptText && config.canonicalReasoning) {
      this.attemptId = config.attemptId;
      this.comparisonCtrl = new ComparisonViewerController({
        attemptId: config.attemptId,
        immutableOriginalAttempt: config.originalAttemptText,
        canonicalReasoning: config.canonicalReasoning,
      });

      if (config.diagnosticRules && config.diagnosticRules.length > 0) {
        this.diagnosticCtrl = new DiagnosticPanelController({
          rules: config.diagnosticRules,
        });
      }

      this.repairCtrl = new RepairWorkspaceController({
        boundaryTaskPrompt: config.boundaryTaskPrompt,
        boundarySolution: config.boundarySolution,
      });

      this.recordHistory('INITIALIZE', `Reflection session loaded for attempt ${config.attemptId}`);
    } else if (!config.initialState) {
      this.screenState = 'unavailable';
    }
  }

  private recordHistory(action: string, note: string): void {
    this.historyLog.push({ at: Date.now(), action, note });
  }

  // --- Actions ---

  /**
   * Action: 'compare'
   * Switch to comparison view tab.
   */
  actionCompare(moveNumber?: number): void {
    this.activeTab = 'compare';
    if (moveNumber !== undefined && this.comparisonCtrl) {
      this.comparisonCtrl.selectMove(moveNumber);
    }
    this.recordHistory('COMPARE', `Inspecting move ${moveNumber ?? 'all'}`);
  }

  /**
   * Action: 'diagnose'
   * Switch to diagnostic view and select code.
   */
  actionDiagnose(code?: string): void {
    this.activeTab = 'diagnose';
    if (code && this.diagnosticCtrl) {
      this.diagnosticCtrl.selectCode(code);
      this.diagnosticCtrl.commit();
      this.recordHistory('DIAGNOSE', `Committed diagnosis ${code}`);
    }
  }

  /**
   * Action: 'repair'
   * Switch to repair view and formulate explanation.
   */
  actionRepair(text?: string): void {
    this.activeTab = 'repair';
    if (text && this.repairCtrl) {
      this.repairCtrl.updateRepairText(text);
      this.repairCtrl.commitRepair();
      this.recordHistory('REPAIR', 'Committed repair explanation');
    }
  }

  /**
   * Action: 'history'
   * Switch to reflection history audit log tab.
   */
  actionHistory(): readonly Array<{ readonly at: number; readonly action: string; readonly note: string }> {
    this.activeTab = 'history';
    return [...this.historyLog];
  }

  // --- Orientation ---

  setOrientation(orientation: DisplayOrientation): void {
    this.orientation = orientation;
  }

  getOrientation(): DisplayOrientation {
    return this.orientation;
  }

  // --- View State ---

  getViewState(): ReflectionPageViewState {
    return {
      screenState: this.screenState,
      attemptId: this.attemptId,
      activeTab: this.activeTab,
      orientation: this.orientation,
      isDiagnosisCommitted: this.diagnosticCtrl ? this.diagnosticCtrl.getViewState().isCommitted : false,
      isRepairCommitted: this.repairCtrl ? this.repairCtrl.getViewState().isRepairCommitted : false,
      isBoundaryCommitted: this.repairCtrl ? this.repairCtrl.getViewState().isBoundaryCommitted : false,
      minHitTargetPx: HIT_TARGET_MIN_PX,
    };
  }

  render(): string {
    const state = this.getViewState();

    return `
<div class="g9-reflection-page ${this.orientation.toLowerCase()}" data-screen-state="${state.screenState}" data-active-tab="${state.activeTab}" style="min-width: 100%; box-sizing: border-box; overflow-x: hidden; font-family: system-ui, sans-serif; background: #f8fafc; min-height: 100vh; display: flex; flex-direction: column;">
  <!-- Styling & 48px Hit Targets -->
  <style>
    .g9-btn, .g9-tab-btn, .g9-action-btn {
      min-height: ${HIT_TARGET_MIN_PX}px;
      min-width: ${HIT_TARGET_MIN_PX}px;
      box-sizing: border-box;
      padding: 10px 18px;
      font-size: 15px;
      font-weight: 600;
      border-radius: 8px;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      touch-action: manipulation;
    }
    .g9-reflect-tabs {
      display: flex;
      gap: 8px;
      background: #ffffff;
      padding: 12px 24px;
      border-bottom: 1px solid #e2e8f0;
    }
    .g9-reflect-tabs button[aria-selected="true"] {
      background: #2563eb;
      color: #ffffff;
      border: 1px solid #1d4ed8;
    }
    .g9-reflect-body {
      flex: 1;
      padding: 24px;
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
    .g9-banner {
      padding: 12px 18px;
      border-radius: 8px;
      margin: 16px 24px 0 24px;
      font-size: 14px;
    }
    .g9-banner-warning { background: #fffbeb; color: #92400e; border: 1px solid #fde68a; }
    .g9-banner-error { background: #fef2f2; color: #991b1b; border: 1px solid #fecaca; }
    .g9-banner-info { background: #eff6ff; color: #1e40af; border: 1px solid #bfdbfe; }
  </style>

  <!-- Top App Shell Header -->
  <header style="background: #ffffff; border-bottom: 1px solid #e2e8f0; padding: 14px 24px; display: flex; justify-content: space-between; align-items: center;">
    <div>
      <span style="font-size: 12px; font-weight: 700; color: #64748b; text-transform: uppercase;">Learner Reflection &bull; Cognitive Repair</span>
      <h1 style="font-size: 20px; font-weight: 800; margin: 4px 0 0 0; color: #0f172a;">Reconstruction &amp; Diagnosis (${state.attemptId || 'Pending'})</h1>
    </div>
    <div>
      <button class="g9-btn g9-action-btn" data-action="return" aria-label="Return to Dashboard" style="background: #f1f5f9; color: #334155; border: 1px solid #cbd5e1;">
        &larr; Return
      </button>
    </div>
  </header>

  <!-- Status Banners -->
  ${this.renderStatusBanners(state)}

  <!-- Primary Tab Navigation (compare, diagnose, repair, history) -->
  <nav class="g9-reflect-tabs" role="tablist" aria-label="Reflection Navigation">
    <button class="g9-tab-btn" role="tab" data-action="compare" aria-selected="${state.activeTab === 'compare' ? 'true' : 'false'}" aria-label="Compare Tab">
      1. Compare
    </button>
    <button class="g9-tab-btn" role="tab" data-action="diagnose" aria-selected="${state.activeTab === 'diagnose' ? 'true' : 'false'}" aria-label="Diagnose Tab">
      2. Diagnose
    </button>
    <button class="g9-tab-btn" role="tab" data-action="repair" aria-selected="${state.activeTab === 'repair' ? 'true' : 'false'}" aria-label="Repair Tab">
      3. Repair
    </button>
    <button class="g9-tab-btn" role="tab" data-action="history" aria-selected="${state.activeTab === 'history' ? 'true' : 'false'}" aria-label="History Audit Log">
      History
    </button>
  </nav>

  <!-- Tab Content Area -->
  <main class="g9-reflect-body">
    ${this.renderTabContent(state)}
  </main>

  <!-- Mandatory Footer & Rule 13 Invariant -->
  <footer style="background: #ffffff; border-top: 1px solid #e2e8f0; padding: 14px 24px; font-size: 13px; color: #64748b; text-align: center;">
    <div>Core1B Cognitive Reflection &amp; Diagnosis &bull; BP-REFLECTION@1.0.0</div>
    <div style="font-weight: 600; color: #94a3b8; margin-top: 4px;">No academic approval inferred from software validation.</div>
  </footer>
</div>`;
  }

  private renderStatusBanners(state: ReflectionPageViewState): string {
    if (state.screenState === 'loading') {
      return `<div class="g9-banner g9-banner-info" role="status">Loading attempt reflection session...</div>`;
    }
    if (state.screenState === 'error') {
      return `<div class="g9-banner g9-banner-error" role="alert">Error: ${this.errorMessage || 'Unable to load reflection.'}</div>`;
    }
    if (state.screenState === 'unavailable') {
      return `<div class="g9-banner g9-banner-error" role="alert">Attempt Reflection Unavailable: No completed attempt recorded for this resource.</div>`;
    }
    if (state.screenState === 'pending') {
      return `<div class="g9-banner g9-banner-warning" role="alert">Open Work Review Pending: Initial attempt must be committed before canonical comparison.</div>`;
    }
    return '';
  }

  private renderTabContent(state: ReflectionPageViewState): string {
    switch (state.activeTab) {
      case 'compare':
        return this.comparisonCtrl ? this.comparisonCtrl.render() : `<p>Comparison data unavailable.</p>`;
      case 'diagnose':
        return this.diagnosticCtrl ? this.diagnosticCtrl.render() : `<p>Diagnostic panel unavailable.</p>`;
      case 'repair':
        return this.repairCtrl ? this.repairCtrl.render() : `<p>Repair workspace unavailable.</p>`;
      case 'history':
        return `
<section class="g9-history-pane" style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px;">
  <h3 style="font-size: 16px; font-weight: 700; color: #0f172a; margin: 0 0 12px 0;">Reflection Audit Trail</h3>
  <ol style="margin: 0; padding-left: 20px; font-size: 14px; line-height: 1.6; color: #475569;">
    ${this.historyLog.map((item) => `
      <li>
        <strong>${item.action}:</strong> ${item.note} <span style="font-size: 12px; color: #94a3b8;">(${new Date(item.at).toISOString()})</span>
      </li>
    `).join('')}
  </ol>
</section>`;
    }
  }
}
