/**
 * web/pages/orientation.ts
 * A66 — Core1 Orientation Page Controller and Dual-Orientation Tablet View.
 *
 * Implements:
 * - Route: /orientation/:id
 * - Compact topic orientation: conventions, canonical scope, hard-transition map, relations
 * - Actions: jump-concept, open-lesson, print-if-eligible
 * - Declared screen states: "populated", "loading", "error", "missing scope", "unavailable"
 * - Dual-orientation tablet layout (Landscape split view & Portrait vertical flow)
 * - 48px minimum touch hitbox on all interactive elements
 * - Rule 13 invariant preservation
 *
 * No academic approval inferred from software validation.
 */

import { HIT_TARGET_MIN_PX } from '../styles/tokens.ts';
import {
  Core1OrientationJourney,
} from '../journeys/core1.ts';
import type {
  Core1OrientationDefinition,
  Core1OrientationDraft,
} from '../journeys/core1.ts';

export type DisplayOrientation = 'LANDSCAPE' | 'PORTRAIT';

export type OrientationScreenState =
  | 'loading'
  | 'error'
  | 'populated'
  | 'missing scope'
  | 'unavailable';

export interface OrientationPageConfig {
  readonly orientationDefinition?: Core1OrientationDefinition;
  readonly orientation?: DisplayOrientation;
  readonly initialState?: OrientationScreenState;
  readonly errorMessage?: string;
}

export interface OrientationPageViewState {
  readonly screenState: OrientationScreenState;
  readonly topicId: string;
  readonly title: string;
  readonly subject: string;
  readonly activeConceptId: string | null;
  readonly orientation: DisplayOrientation;
  readonly canPrint: boolean;
  readonly printRejectionReason: string | null;
  readonly primaryLessonUrl: string;
  readonly minHitTargetPx: number;
}

export class Core1OrientationPageController {
  private journey: Core1OrientationJourney | null = null;
  private screenState: OrientationScreenState = 'populated';
  private errorMessage: string | null = null;
  private orientation: DisplayOrientation = 'LANDSCAPE';

  constructor(config: OrientationPageConfig) {
    this.orientation = config.orientation || 'LANDSCAPE';

    if (config.initialState) {
      this.screenState = config.initialState;
      this.errorMessage = config.errorMessage || null;
    }

    if (config.orientationDefinition) {
      try {
        this.journey = new Core1OrientationJourney(config.orientationDefinition);
        if (!config.initialState) {
          this.refreshScreenState();
        }
      } catch (err: any) {
        this.screenState = 'error';
        this.errorMessage = err.message || 'Initialization failed';
      }
    } else if (!config.initialState) {
      this.screenState = 'unavailable';
    }
  }

  private refreshScreenState(): void {
    if (!this.journey) {
      this.screenState = 'unavailable';
      return;
    }

    const def = this.journey.getDefinition();
    if (!def.concepts || def.concepts.length === 0) {
      this.screenState = 'missing scope';
      return;
    }

    this.screenState = 'populated';
  }

  // --- Actions ---

  /**
   * Action: 'jump-concept'
   * Focus on a specific canonical concept.
   */
  actionJumpConcept(conceptId: string): void {
    if (!this.journey) throw new Error('Journey not loaded');
    this.journey.jumpConcept(conceptId);
    this.refreshScreenState();
  }

  /**
   * Action: 'open-lesson'
   * Navigate to the full Core1A teaching journey (/learn/:id).
   */
  actionOpenLesson(conceptId?: string): string {
    if (!this.journey) throw new Error('Journey not loaded');
    return this.journey.getLessonRoute(conceptId);
  }

  /**
   * Action: 'print-if-eligible'
   * Trigger native PDF print output if authorized by signed receipt.
   */
  actionPrintIfEligible(): { readonly allowed: boolean; readonly receiptId?: string; readonly reason?: string } {
    if (!this.journey) return { allowed: false, reason: 'Orientation not loaded' };
    return this.journey.triggerPrint();
  }

  // --- Display & Orientation ---

  setOrientation(orientation: DisplayOrientation): void {
    this.orientation = orientation;
  }

  getOrientation(): DisplayOrientation {
    return this.orientation;
  }

  // --- View State & Draft ---

  getViewState(): OrientationPageViewState {
    if (!this.journey) {
      return {
        screenState: this.screenState,
        topicId: '',
        title: 'Orientation Unavailable',
        subject: '',
        activeConceptId: null,
        orientation: this.orientation,
        canPrint: false,
        printRejectionReason: 'Orientation not loaded',
        primaryLessonUrl: '/home',
        minHitTargetPx: HIT_TARGET_MIN_PX,
      };
    }

    const def = this.journey.getDefinition();

    return {
      screenState: this.screenState,
      topicId: def.topicId,
      title: def.title,
      subject: def.subject,
      activeConceptId: this.journey.getActiveConceptId(),
      orientation: this.orientation,
      canPrint: this.journey.canPrintPDF(),
      printRejectionReason: this.journey.getPrintRejectionReason(),
      primaryLessonUrl: this.journey.getLessonRoute(),
      minHitTargetPx: HIT_TARGET_MIN_PX,
    };
  }

  toDraft(): Core1OrientationDraft | null {
    return this.journey ? this.journey.toDraft() : null;
  }

  restoreDraft(draft: Core1OrientationDraft): void {
    if (this.journey) {
      this.journey.restoreDraft(draft);
      this.refreshScreenState();
    }
  }

  // --- HTML Rendering ---

  render(): string {
    const state = this.getViewState();

    return `
<div class="g9-orientation-page ${this.orientation.toLowerCase()}" data-screen-state="${state.screenState}" style="min-width: 100%; box-sizing: border-box; overflow-x: hidden; font-family: system-ui, sans-serif; background: #f8fafc; min-height: 100vh; display: flex; flex-direction: column;">
  <!-- Styling & Hit Targets -->
  <style>
    .g9-btn, .g9-concept-btn, .g9-action-btn {
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
    .g9-orientation-container {
      flex: 1;
      padding: 24px;
      display: flex;
      flex-direction: ${this.orientation === 'LANDSCAPE' ? 'row' : 'column'};
      gap: 20px;
    }
    .g9-orientation-main {
      flex: 3;
      background: #ffffff;
      padding: 24px;
      border-radius: 12px;
      border: 1px solid #e2e8f0;
      box-shadow: 0 1px 3px rgba(0,0,0,0.05);
    }
    .g9-orientation-side {
      flex: 2;
      background: #ffffff;
      padding: 20px;
      border-radius: 12px;
      border: 1px solid #e2e8f0;
      box-shadow: 0 1px 3px rgba(0,0,0,0.05);
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
      <span style="font-size: 12px; font-weight: 700; color: #64748b; text-transform: uppercase;">${state.subject} &bull; ${state.topicId}</span>
      <h1 style="font-size: 20px; font-weight: 800; margin: 4px 0 0 0; color: #0f172a;">${state.title}</h1>
    </div>
    <div style="display: flex; gap: 10px; align-items: center;">
      <button
        class="g9-btn g9-action-btn"
        data-action="print-if-eligible"
        aria-label="Print Native PDF Export"
        style="background: #f1f5f9; color: #334155; border: 1px solid #cbd5e1;"
        ${!state.canPrint ? 'aria-disabled="true" style="opacity: 0.6;"' : ''}
      >
        Print PDF ${!state.canPrint ? '&#128274;' : ''}
      </button>
      <button
        class="g9-btn g9-action-btn"
        data-action="open-lesson"
        aria-label="Open Full Core1A Lesson"
        style="background: #2563eb; color: #ffffff; border: 0;"
      >
        Open Lesson &rarr;
      </button>
    </div>
  </header>

  <!-- Screen State Banners -->
  ${this.renderStatusBanners(state)}

  <!-- Workspace Body -->
  <main class="g9-orientation-container">
    <div class="g9-orientation-main">
      ${this.renderMainScope(state)}
    </div>

    <!-- Sidebar: Conventions & Relations -->
    <aside class="g9-orientation-side">
      <section aria-labelledby="conventions-title">
        <h3 id="conventions-title" style="font-size: 16px; font-weight: 700; color: #0f172a; margin-top: 0;">Topic Conventions</h3>
        ${this.renderConventions()}
      </section>

      <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 20px 0;" />

      <section aria-labelledby="relations-title">
        <h3 id="relations-title" style="font-size: 16px; font-weight: 700; color: #0f172a;">Invariant Relations</h3>
        ${this.renderRelations()}
      </section>
    </aside>
  </main>

  <!-- Mandatory Footer & Rule 13 Invariant -->
  <footer style="background: #ffffff; border-top: 1px solid #e2e8f0; padding: 14px 24px; font-size: 13px; color: #64748b; text-align: center;">
    <div>Core1 Orientation Workspace &bull; BP-ORIENTATION-CORE1@1.0.0</div>
    <div style="font-weight: 600; color: #94a3b8; margin-top: 4px;">No academic approval inferred from software validation.</div>
  </footer>
</div>`;
  }

  private renderStatusBanners(state: OrientationPageViewState): string {
    if (state.screenState === 'loading') {
      return `<div class="g9-banner g9-banner-info" role="status">Loading topic orientation...</div>`;
    }
    if (state.screenState === 'error') {
      return `<div class="g9-banner g9-banner-error" role="alert">Error: ${this.errorMessage || 'Unable to load orientation.'}</div>`;
    }
    if (state.screenState === 'unavailable') {
      return `<div class="g9-banner g9-banner-error" role="alert">Topic Orientation Unavailable: No canonical scope definition provided.</div>`;
    }
    if (state.screenState === 'missing scope') {
      return `<div class="g9-banner g9-banner-warning" role="alert">Incomplete Scope: No canonical concepts declared for this topic.</div>`;
    }
    return '';
  }

  private renderMainScope(state: OrientationPageViewState): string {
    if (!this.journey) return `<p>Scope unavailable.</p>`;

    const def = this.journey.getDefinition();
    const activeConcept = this.journey.getActiveConcept();

    return `
<div class="g9-scope-view">
  <div class="g9-overview-text" style="font-size: 15px; color: #334155; line-height: 1.6; margin-bottom: 20px;">
    ${def.overviewSummary}
  </div>

  <!-- Concept Navigation Rail -->
  <h3 style="font-size: 16px; font-weight: 700; color: #0f172a; margin: 0 0 10px 0;">Canonical Concepts in Scope:</h3>
  <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 20px;">
    ${def.concepts.map((concept) => {
      const isSelected = concept.id === state.activeConceptId;
      return `
      <button
        class="g9-concept-btn"
        data-action="jump-concept"
        data-concept-id="${concept.id}"
        aria-selected="${isSelected ? 'true' : 'false'}"
        aria-label="Concept: ${concept.name}"
        style="padding: 8px 16px; font-size: 14px; font-weight: 600; border-radius: 6px; border: 1px solid ${isSelected ? '#2563eb' : '#cbd5e1'}; background: ${isSelected ? '#2563eb' : '#ffffff'}; color: ${isSelected ? '#ffffff' : '#1e293b'}; cursor: pointer;"
      >
        ${concept.name}
      </button>`;
    }).join('')}
  </div>

  <!-- Selected Concept Detail Card -->
  ${activeConcept ? `
    <article class="g9-concept-card" style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 8px; padding: 18px; margin-bottom: 24px;">
      <h4 style="font-size: 16px; font-weight: 700; color: #1e293b; margin: 0 0 10px 0;">${activeConcept.name}</h4>
      <div style="display: grid; grid-template-columns: 1fr; gap: 8px; font-size: 14px;">
        <div><strong>Entry Assumption:</strong> ${activeConcept.entryAssumption}</div>
        <div><strong>Inferential Jump:</strong> ${activeConcept.inferentialJump}</div>
        <div><strong>Observable Exit Criterion:</strong> ${activeConcept.exitCriterion}</div>
      </div>
    </article>` : ''}

  <!-- Hard-Transition Map -->
  <section aria-labelledby="transitions-title" style="background: #faf5ff; border: 1px solid #e9d5ff; border-radius: 8px; padding: 18px;">
    <h4 id="transitions-title" style="font-size: 15px; font-weight: 700; color: #6b21a8; margin: 0 0 12px 0;">Hard-Transition Map &bull; Key Conceptual Bridges</h4>
    <div style="display: flex; flex-direction: column; gap: 10px;">
      ${def.hardTransitions.map((t) => `
        <div style="background: #ffffff; border: 1px solid #f3e8ff; border-radius: 6px; padding: 12px; font-size: 13px;">
          <div style="font-weight: 700; color: #581c87; margin-bottom: 4px;">${t.fromConcept} &rarr; ${t.toConcept}</div>
          <div style="color: #6b21a8;"><strong>Cognitive Barrier:</strong> ${t.cognitiveBarrier}</div>
          <div style="color: #15803d; margin-top: 2px;"><strong>Warrant Resolution:</strong> ${t.warrantResolution}</div>
        </div>
      `).join('')}
    </div>
  </section>
</div>`;
  }

  private renderConventions(): string {
    if (!this.journey) return `<p>Conventions unavailable</p>`;
    const conventions = this.journey.getDefinition().conventions;

    return `
<ul style="margin: 0; padding-left: 20px; font-size: 13px; color: #334155; line-height: 1.6;">
  ${conventions.map((c) => `
    <li style="margin-bottom: 8px;">
      <strong>${c.name}:</strong> ${c.definition}
      <div style="font-size: 12px; color: #64748b; font-style: italic;">Standard choice: ${c.standardChoice}</div>
    </li>
  `).join('')}
</ul>`;
  }

  private renderRelations(): string {
    if (!this.journey) return `<p>Relations unavailable</p>`;
    const relations = this.journey.getDefinition().relations;

    return `
<div style="display: flex; flex-direction: column; gap: 8px; font-size: 13px;">
  ${relations.map((r) => `
    <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 10px;">
      <div style="font-weight: 700; color: #1e293b;">${r.relationName}</div>
      <code style="display: block; margin: 4px 0; color: #0369a1;">${r.mathematicalForm}</code>
      <div style="font-size: 12px; color: #64748b;">${r.domainCondition}</div>
    </div>
  `).join('')}
</div>`;
  }
}
