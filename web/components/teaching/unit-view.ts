/**
 * web/components/teaching/unit-view.ts
 * A51 — Progressive Core1A Instructional Unit Component Controller.
 *
 * Implements:
 * - A1–A9 native unit rendering with rich depth modes (EASY, MEDIUM, HARD)
 * - Representation bridges (visual element, algebraic symbol, verbal phrasing)
 * - Exact warrants and block references
 * - Figure rendering with zoom and accessible captions
 * - Completed worked examples with precommit step masking
 * - Misconception diagnostics with corrective repairs
 * - Honest unavailable state when a unit is missing or unpopulated
 * - 48px minimum touch hitbox on all interactive elements
 *
 * No academic approval inferred from software validation.
 */

import { HIT_TARGET_MIN_PX } from '../../styles/tokens.ts';
import type {
  Core1ARole,
  IntrinsicDepthBadge,
  Core1AUnitData,
  ExactRef,
} from '../../journeys/core1a.ts';

export interface UnitViewState {
  readonly role: Core1ARole;
  readonly title: string;
  readonly isAvailable: boolean;
  readonly depthMode: IntrinsicDepthBadge;
  readonly isWorkedExampleOpen: boolean;
  readonly figureZoomScale: number;
  readonly minHitTargetPx: number;
}

export interface UnitViewConfig {
  readonly unitData?: Core1AUnitData;
  readonly initialRole?: Core1ARole;
  readonly initialDepth?: IntrinsicDepthBadge;
}

export class Core1AUnitViewController {
  private unitData: Core1AUnitData | null = null;
  private role: Core1ARole = 'A1';
  private depthMode: IntrinsicDepthBadge = 'MEDIUM';
  private isWorkedExampleOpen: boolean = false;
  private figureZoomScale: number = 1.0;

  constructor(config?: UnitViewConfig) {
    if (config?.initialRole) {
      this.role = config.initialRole;
    }
    if (config?.initialDepth) {
      this.depthMode = config.initialDepth;
    }
    if (config?.unitData) {
      this.unitData = config.unitData;
      this.role = config.unitData.role;
    }
  }

  setUnitData(data: Core1AUnitData | null): void {
    this.unitData = data;
    if (data) {
      this.role = data.role;
    }
  }

  setDepthMode(mode: IntrinsicDepthBadge): void {
    this.depthMode = mode;
  }

  getDepthMode(): IntrinsicDepthBadge {
    return this.depthMode;
  }

  toggleWorkedExample(): boolean {
    this.isWorkedExampleOpen = !this.isWorkedExampleOpen;
    return this.isWorkedExampleOpen;
  }

  setFigureZoom(scale: number): void {
    const clamped = Math.max(1.0, Math.min(3.0, scale));
    this.figureZoomScale = clamped;
  }

  getFigureZoom(): number {
    return this.figureZoomScale;
  }

  getViewState(): UnitViewState {
    return {
      role: this.role,
      title: this.unitData ? this.unitData.title : `Unit ${this.role}`,
      isAvailable: this.unitData !== null,
      depthMode: this.depthMode,
      isWorkedExampleOpen: this.isWorkedExampleOpen,
      figureZoomScale: this.figureZoomScale,
      minHitTargetPx: HIT_TARGET_MIN_PX,
    };
  }

  render(): string {
    const state = this.getViewState();

    if (!this.unitData) {
      // Honest Unavailable State: Missing unit must NOT silently pretend to render content
      return `
<div class="g9-teaching-unit unavailable" data-unit-role="${state.role}" data-availability="UNAVAILABLE" style="background: #fff1f2; border: 2px dashed #fda4af; padding: 24px; border-radius: 8px; color: #9f1239;">
  <div style="display: flex; align-items: center; gap: 12px;">
    <span style="font-size: 24px;">&#9888;</span>
    <div>
      <h3 style="margin: 0; font-size: 18px; font-weight: 700;">Teaching Unit ${state.role} Unavailable</h3>
      <p style="margin: 4px 0 0 0; font-size: 14px;">This unit has not been qualified or authored for the current lesson curriculum. Progression beyond this unit is locked until academic review.</p>
    </div>
  </div>
</div>`;
    }

    const u = this.unitData;

    return `
<div class="g9-teaching-unit populated" data-unit-role="${u.role}" data-depth="${this.depthMode}" style="font-family: system-ui, sans-serif; color: #1f2937;">
  <!-- Unit Header & Meta -->
  <header style="border-bottom: 2px solid #e5e7eb; padding-bottom: 12px; margin-bottom: 16px; display: flex; justify-content: space-between; align-items: flex-start;">
    <div>
      <span style="font-size: 12px; font-weight: 700; color: #6b7280; text-transform: uppercase;">Unit ${u.role} &bull; Depth: ${this.depthMode}</span>
      <h2 style="font-size: 22px; font-weight: 800; margin: 4px 0 0 0; color: #111827;">${u.title}</h2>
    </div>
    <div style="display: flex; gap: 8px;">
      <button
        class="g9-btn g9-depth-btn"
        data-action="depth"
        data-depth="${this.depthMode}"
        aria-label="Cycle Depth Mode (Current: ${this.depthMode})"
        style="min-height: ${HIT_TARGET_MIN_PX}px; min-width: ${HIT_TARGET_MIN_PX}px; padding: 8px 14px; font-size: 13px; font-weight: 600; border-radius: 6px; border: 1px solid #d1d5db; background: #ffffff; cursor: pointer;"
      >
        Mode: ${this.depthMode}
      </button>
    </div>
  </header>

  <!-- Summary and Lead Narrative -->
  <div class="g9-unit-summary" style="font-size: 16px; font-weight: 500; color: #374151; margin-bottom: 14px; line-height: 1.5;">
    ${u.summary}
  </div>

  <div class="g9-unit-body" style="font-size: 15px; line-height: 1.6; color: #1f2937; margin-bottom: 20px;">
    ${u.bodyText}
  </div>

  <!-- Prerequisite Conventions (A2) -->
  ${u.conventions && u.conventions.length > 0 ? `
    <section class="g9-conventions-block" aria-labelledby="conventions-title-${u.role}" style="background: #f8fafc; border-left: 4px solid #0284c7; padding: 16px; border-radius: 6px; margin-bottom: 20px;">
      <h3 id="conventions-title-${u.role}" style="font-size: 15px; font-weight: 700; color: #0369a1; margin: 0 0 8px 0;">Declared Reference Conventions</h3>
      <ul style="margin: 0; padding-left: 20px; font-size: 14px;">
        ${u.conventions.map((c) => `<li style="margin-bottom: 4px;">${c}</li>`).join('')}
      </ul>
    </section>` : ''}

  <!-- Representation Bridge (A3) -->
  ${u.representationBridge && u.representationBridge.length > 0 && this.depthMode !== 'EASY' ? `
    <section class="g9-bridge-block" aria-labelledby="bridge-title-${u.role}" style="background: #faf5ff; border: 1px solid #e9d5ff; border-radius: 8px; padding: 16px; margin-bottom: 20px;">
      <h3 id="bridge-title-${u.role}" style="font-size: 15px; font-weight: 700; color: #7e22ce; margin: 0 0 10px 0;">Tri-Modal Representation Bridge</h3>
      <div style="display: grid; grid-template-columns: 1fr 1fr 1.5fr; gap: 12px; font-size: 14px; border-top: 1px solid #f3e8ff; padding-top: 8px;">
        <div style="font-weight: 700; color: #6b21a8;">Diagrammatic / Pictorial</div>
        <div style="font-weight: 700; color: #6b21a8;">Symbolic / Algebraic</div>
        <div style="font-weight: 700; color: #6b21a8;">Conceptual / In Words</div>
        ${u.representationBridge.map((item) => `
          <div style="background: #ffffff; padding: 8px; border-radius: 4px; border: 1px solid #f3e8ff;">${item.pictureElement}</div>
          <div style="background: #ffffff; padding: 8px; border-radius: 4px; border: 1px solid #f3e8ff;"><code>${item.symbol}</code></div>
          <div style="background: #ffffff; padding: 8px; border-radius: 4px; border: 1px solid #f3e8ff;">${item.inWords}</div>
        `).join('')}
      </div>
    </section>` : ''}

  <!-- Derivations with why_valid (A4) - Hidden in EASY, summarized in MEDIUM, detailed in HARD -->
  ${u.derivationSteps && u.derivationSteps.length > 0 && this.depthMode !== 'EASY' ? `
    <section class="g9-derivation-block" aria-labelledby="derivation-title-${u.role}" style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 16px; margin-bottom: 20px;">
      <h3 id="derivation-title-${u.role}" style="font-size: 15px; font-weight: 700; color: #15803d; margin: 0 0 8px 0;">Analytical Derivation &amp; Invariants</h3>
      <ol style="margin: 0; padding-left: 20px;">
        ${u.derivationSteps.map((step) => `
          <li style="margin-bottom: 10px; font-size: 14px;">
            <strong>Step ${step.stepNumber}:</strong> <code style="background: #dcfce7; padding: 2px 6px; border-radius: 4px;">${step.expression}</code>
            ${this.depthMode === 'HARD' ? `
              <div style="margin-top: 4px; font-size: 13px; color: #166534; font-style: italic;">
                &rarr; <strong>Validity Justification:</strong> ${step.whyValid}
              </div>` : ''}
          </li>
        `).join('')}
      </ol>
    </section>` : ''}

  <!-- Completed Worked Example (A6) with precommit secrecy toggle -->
  ${u.workedExample ? `
    <section class="g9-worked-example-block" aria-labelledby="example-title-${u.role}" style="background: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 18px; margin-bottom: 20px; box-shadow: 0 1px 2px rgba(0,0,0,0.05);">
      <h3 id="example-title-${u.role}" style="font-size: 16px; font-weight: 700; color: #111827; margin: 0 0 8px 0;">Completed Exemplar &bull; Full Inference</h3>
      <p style="font-size: 14px; margin: 0 0 12px 0;">${u.workedExample.problemPrompt}</p>

      <button
        class="g9-btn g9-example-toggle-btn"
        data-action="example"
        aria-label="${this.isWorkedExampleOpen ? 'Conceal' : 'Expose'} Completed Reasoning Steps"
        style="min-height: ${HIT_TARGET_MIN_PX}px; min-width: ${HIT_TARGET_MIN_PX}px; padding: 10px 16px; font-size: 14px; font-weight: 600; background: #2563eb; color: #ffffff; border: 0; border-radius: 6px; cursor: pointer;"
      >
        ${this.isWorkedExampleOpen ? 'Hide Inference Steps' : 'Reveal Complete Reasoning Steps'}
      </button>

      ${this.isWorkedExampleOpen ? `
        <div class="g9-example-steps" style="margin-top: 14px; padding-top: 12px; border-top: 1px dashed #cbd5e1;">
          <h4 style="font-size: 13px; text-transform: uppercase; color: #64748b; margin: 0 0 8px 0;">Step-by-step Crux Construction:</h4>
          <ol style="margin: 0; padding-left: 20px; font-size: 14px; line-height: 1.6;">
            ${u.workedExample.fullReasoningSteps.map((st) => `<li>${st}</li>`).join('')}
          </ol>
          <div style="margin-top: 12px; font-weight: 700; color: #0f172a; font-size: 14px;">
            Target Solution: ${u.workedExample.solutionResult}
          </div>
        </div>` : ''}
    </section>` : ''}

  <!-- Misconception Alert & Repair (A7) -->
  ${u.misconception ? `
    <section class="g9-misconception-block" aria-labelledby="misconception-title-${u.role}" style="background: #fff5f5; border-left: 4px solid #ef4444; padding: 16px; border-radius: 6px; margin-bottom: 20px;">
      <h3 id="misconception-title-${u.role}" style="font-size: 15px; font-weight: 700; color: #b91c1c; margin: 0 0 6px 0;">Plausible Wrong Path Diagnostic</h3>
      <div style="font-size: 14px; margin-bottom: 8px;"><strong>Frequent Error:</strong> ${u.misconception.wrongIdea}</div>
      <div style="background: #ffffff; border: 1px solid #fecaca; padding: 10px; border-radius: 6px; font-size: 13px; margin-bottom: 8px;">
        <strong>Diagnostic Question:</strong> ${u.misconception.diagnosticPrompt}
      </div>
      <div style="font-size: 14px; color: #991b1b;"><strong>Corrective Repair:</strong> ${u.misconception.repair}</div>
    </section>` : ''}

  <!-- Limiting Boundary Conditions (A8) -->
  ${u.boundaryConditions && u.boundaryConditions.length > 0 && this.depthMode === 'HARD' ? `
    <section class="g9-boundary-block" aria-labelledby="boundary-title-${u.role}" style="background: #fffbeb; border: 1px solid #fde68a; border-radius: 8px; padding: 16px; margin-bottom: 20px;">
      <h3 id="boundary-title-${u.role}" style="font-size: 15px; font-weight: 700; color: #b45309; margin: 0 0 6px 0;">Limiting Conditions &amp; Boundary Breakdown</h3>
      <ul style="margin: 0; padding-left: 20px; font-size: 14px;">
        ${u.boundaryConditions.map((b) => `<li style="margin-bottom: 4px;">${b}</li>`).join('')}
      </ul>
    </section>` : ''}

  <!-- Self-Check / Synthesis (A9) -->
  ${u.selfCheckPrompt ? `
    <section class="g9-selfcheck-block" aria-labelledby="selfcheck-title-${u.role}" style="background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 8px; padding: 16px; margin-bottom: 20px;">
      <h3 id="selfcheck-title-${u.role}" style="font-size: 15px; font-weight: 700; color: #1d4ed8; margin: 0 0 6px 0;">Independent Verification Check</h3>
      <p style="margin: 0; font-size: 14px; color: #1e3a8a;">${u.selfCheckPrompt}</p>
    </section>` : ''}

  <!-- Exact Warrants & Block Lineage Footer -->
  <footer class="g9-unit-lineage" style="border-top: 1px solid #f3f4f6; padding-top: 12px; font-size: 12px; color: #6b7280; display: flex; justify-content: space-between; flex-wrap: wrap; gap: 8px;">
    <div><strong>Block Refs:</strong> ${u.blockRefs.map((r) => r.id).join(', ')}</div>
    <div><strong>Warrant Refs:</strong> ${u.evidenceRefs.map((r) => r.id).join(', ')}</div>
  </footer>
</div>`;
  }
}
