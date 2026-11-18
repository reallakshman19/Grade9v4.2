/**
 * web/components/teaching/anchor-view.ts
 * A51 — Progressive Core1A Anchor View Component Controller.
 *
 * Implements:
 * - Three progressive anchors: FOUNDATION, CONNECTED, ADVANCED
 * - Distinct unassisted synthesis task rendering
 * - Precommit masking: Solution steps concealed by default until toggled
 * - Exact warrants linkage for each anchor
 * - Strict isolation: Zero leakage of reserved fresh transfer content
 * - 48px minimum touch hitbox on all interactive elements
 *
 * No academic approval inferred from software validation.
 */

import { HIT_TARGET_MIN_PX } from '../../styles/tokens.ts';
import type {
  AnchorLevel,
  ProgressiveAnchor,
  ExactRef,
} from '../../journeys/core1a.ts';

export interface AnchorViewState {
  readonly activeLevel: AnchorLevel;
  readonly revealedSolutions: readonly AnchorLevel[];
  readonly hasSynthesisTask: boolean;
  readonly minHitTargetPx: number;
}

export interface AnchorViewConfig {
  readonly anchors: readonly ProgressiveAnchor[];
  readonly synthesisTaskRef: ExactRef;
  readonly synthesisTaskPrompt: string;
  readonly synthesisCheck?: string;
  readonly initialLevel?: AnchorLevel;
}

export class Core1AAnchorViewController {
  private anchors: readonly ProgressiveAnchor[];
  private synthesisTaskRef: ExactRef;
  private synthesisTaskPrompt: string;
  private synthesisCheck: string;
  private activeLevel: AnchorLevel = 'FOUNDATION';
  private revealedSolutionsSet: Set<AnchorLevel> = new Set<AnchorLevel>();

  constructor(config: AnchorViewConfig) {
    this.anchors = config.anchors;
    this.synthesisTaskRef = config.synthesisTaskRef;
    this.synthesisTaskPrompt = config.synthesisTaskPrompt;
    this.synthesisCheck = config.synthesisCheck || 'Verify limiting behavior and physical dimensions.';
    if (config.initialLevel) {
      this.activeLevel = config.initialLevel;
    }

    // Invariant N32: Synthesis task ID must NOT recycle any anchor task ID
    for (const a of this.anchors) {
      if (a.taskRef.id === this.synthesisTaskRef.id) {
        throw new Error(
          `N32_VIOLATION: Synthesis task ${this.synthesisTaskRef.id} recycled anchor task ${a.taskRef.id}`
        );
      }
    }
  }

  selectLevel(level: AnchorLevel): void {
    this.activeLevel = level;
  }

  getActiveLevel(): AnchorLevel {
    return this.activeLevel;
  }

  toggleSolution(level?: AnchorLevel): boolean {
    const target = level || this.activeLevel;
    if (this.revealedSolutionsSet.has(target)) {
      this.revealedSolutionsSet.delete(target);
      return false;
    } else {
      this.revealedSolutionsSet.add(target);
      return true;
    }
  }

  isSolutionRevealed(level: AnchorLevel): boolean {
    return this.revealedSolutionsSet.has(level);
  }

  getViewState(): AnchorViewState {
    return {
      activeLevel: this.activeLevel,
      revealedSolutions: Array.from(this.revealedSolutionsSet),
      hasSynthesisTask: !!this.synthesisTaskPrompt,
      minHitTargetPx: HIT_TARGET_MIN_PX,
    };
  }

  render(): string {
    const state = this.getViewState();
    const levels: AnchorLevel[] = ['FOUNDATION', 'CONNECTED', 'ADVANCED'];

    return `
<div class="g9-anchors-component" data-active-anchor="${state.activeLevel}" style="font-family: system-ui, sans-serif; color: #1f2937;">
  <!-- Anchor Level Selection Tabs -->
  <div class="g9-anchor-tabs" role="tablist" style="display: flex; gap: 8px; margin-bottom: 16px;">
    ${levels.map((lvl) => {
      const isSelected = lvl === state.activeLevel;
      return `
      <button
        class="g9-tab-btn"
        role="tab"
        data-level="${lvl}"
        aria-selected="${isSelected ? 'true' : 'false'}"
        aria-label="Progressive Anchor Level: ${lvl}"
        style="min-height: ${HIT_TARGET_MIN_PX}px; min-width: ${HIT_TARGET_MIN_PX}px; padding: 8px 16px; font-size: 13px; font-weight: 700; border-radius: 6px; cursor: pointer; border: 1px solid ${isSelected ? '#1d4ed8' : '#d1d5db'}; background: ${isSelected ? '#2563eb' : '#ffffff'}; color: ${isSelected ? '#ffffff' : '#374151'};"
      >
        ${lvl}
      </button>`;
    }).join('')}
  </div>

  <!-- Active Anchor Card -->
  ${this.anchors.map((a) => {
    if (a.level !== state.activeLevel) return '';
    const isRevealed = this.isSolutionRevealed(a.level);

    return `
    <article class="g9-anchor-card" data-level="${a.level}" style="background: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.05); margin-bottom: 24px;">
      <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 1px solid #f3f4f6; padding-bottom: 8px; margin-bottom: 12px;">
        <h3 style="font-size: 16px; font-weight: 700; color: #111827; margin: 0;">${a.title}</h3>
        <span style="font-size: 12px; font-weight: 600; color: #6b7280;">Task: ${a.taskRef.id}</span>
      </div>

      <p class="g9-anchor-prompt" style="font-size: 15px; line-height: 1.5; color: #374151; margin: 0 0 16px 0;">
        ${a.prompt}
      </p>

      <!-- Precommit Masking: Solution Toggle Button -->
      <button
        class="g9-btn g9-anchor-solution-toggle"
        data-action="toggle-anchor-solution"
        data-level="${a.level}"
        aria-label="${isRevealed ? 'Conceal' : 'Expose'} Solution for ${a.level} Anchor"
        style="min-height: ${HIT_TARGET_MIN_PX}px; min-width: ${HIT_TARGET_MIN_PX}px; padding: 10px 18px; font-size: 14px; font-weight: 600; background: #475569; color: #ffffff; border: 0; border-radius: 6px; cursor: pointer;"
      >
        ${isRevealed ? 'Hide Solution' : 'Reveal Solution'}
      </button>

      ${isRevealed ? `
        <div class="g9-anchor-solution" style="margin-top: 16px; padding: 14px; background: #f8fafc; border-radius: 6px; border-left: 4px solid #64748b; font-size: 14px;">
          <h4 style="font-size: 13px; text-transform: uppercase; color: #475569; margin: 0 0 8px 0;">Anchor Solution Steps &bull; ${a.solutionRef.id}:</h4>
          <ol style="margin: 0; padding-left: 20px; line-height: 1.6;">
            ${a.solutionSteps.map((st) => `<li>${st}</li>`).join('')}
          </ol>
        </div>` : ''}

      <div class="g9-anchor-warrants" style="margin-top: 14px; font-size: 12px; color: #6b7280;">
        <strong>Warrants:</strong> ${a.warrantRefs.map((w) => w.id).join(', ')}
      </div>
    </article>`;
  }).join('')}

  <!-- Distinct Unassisted Synthesis Task -->
  <section class="g9-synthesis-task-card" aria-labelledby="synthesis-heading" style="background: #faf5ff; border: 1px solid #e9d5ff; border-radius: 8px; padding: 20px;">
    <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 8px;">
      <h3 id="synthesis-heading" style="font-size: 16px; font-weight: 700; color: #6b21a8; margin: 0;">Distinct Unassisted Synthesis Task</h3>
      <span style="font-size: 12px; font-weight: 600; color: #7e22ce;">Ref: ${this.synthesisTaskRef.id}</span>
    </div>

    <p style="font-size: 14px; line-height: 1.5; color: #3b0764; margin: 0 0 12px 0;">
      ${this.synthesisTaskPrompt}
    </p>

    <div style="background: #ffffff; border: 1px solid #f3e8ff; border-radius: 6px; padding: 12px; font-size: 13px; color: #581c87;">
      <strong>Self-Verification Target:</strong> ${this.synthesisCheck}
    </div>
  </section>
</div>`;
  }
}
