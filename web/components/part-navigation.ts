/**
 * web/components/part-navigation.ts
 * A30 — Multipart paper and examination navigation component.
 *
 * Implements:
 * - Part state lifecycle: UNVISITED -> VIEWED -> ATTEMPTED -> FLAGGED -> COMPLETED
 * - Multi-section examination structure (e.g. Section A: Objective, Section B: Multipart, Section C: Proofs)
 * - Sequential (Next / Previous) and direct random-access jump navigation
 * - Part status counters (attempted, flagged, unvisited)
 * - Accessible ARIA step navigation markup (role="navigation", aria-current="step")
 * - 48px minimum touch/hit target bounds on all part navigation controls
 *
 * No academic approval inferred from software validation.
 */

import {escapeHtml} from '../runtime/rendering.ts';
import { HIT_TARGET_MIN_PX } from '../styles/tokens.ts';

export type PartStatus = 'UNVISITED' | 'VIEWED' | 'ATTEMPTED' | 'FLAGGED' | 'COMPLETED';

export interface QuestionPartDescriptor {
  readonly id: string;
  readonly partKey: string; // e.g. "1.1", "1.2" or "A", "B", "C"
  readonly sectionId: string;
  readonly label: string;
  readonly maxPoints: number;
  readonly isOptional?: boolean;
  readonly sharedStimulusId?: string;
  readonly archetypeId: string; // e.g. "PHY-E1", "MTH-E3", "CHM-E2"
}

export interface PaperSectionDescriptor {
  readonly id: string;
  readonly title: string;
  readonly instructions?: string;
  readonly partIds: readonly string[];
  readonly timeLimitSeconds?: number;
}

export interface NavigationSummary {
  readonly total: number;
  readonly unvisited: number;
  readonly viewed: number;
  readonly attempted: number;
  readonly flagged: number;
  readonly completed: number;
}

export interface PartNavigationConfig {
  readonly sections: readonly PaperSectionDescriptor[];
  readonly parts: readonly QuestionPartDescriptor[];
  readonly initialActivePartId?: string;
}

export class PartNavigationController {
  private sections: PaperSectionDescriptor[];
  private parts: QuestionPartDescriptor[];
  private partStatuses: Map<string, PartStatus> = new Map();
  private flaggedParts: Set<string> = new Set();
  private activePartId: string;

  constructor(config: PartNavigationConfig) {
    const ids=config.parts.map(p=>p.id), sectionIds=config.sections.map(s=>s.id), listed=config.sections.flatMap(s=>s.partIds);
    if(!ids.length||new Set(ids).size!==ids.length||new Set(sectionIds).size!==sectionIds.length||listed.length!==ids.length||new Set(listed).size!==listed.length||config.parts.some(p=>! /^[A-Za-z0-9_.:-]{1,64}$/.test(p.id)||!p.partKey||!config.sections.some(s=>s.id===p.sectionId&&s.partIds.includes(p.id)))||new Set(config.parts.map(p=>p.partKey)).size!==ids.length)throw Error('Invalid paper part/section identity');
    this.sections = config.sections.map((s) => ({ ...s, partIds: [...s.partIds] }));
    this.parts=config.parts.map(p=>({id:p.id,partKey:p.partKey,sectionId:p.sectionId,label:p.label,maxPoints:p.maxPoints,archetypeId:p.archetypeId,...(p.isOptional!==undefined?{isOptional:p.isOptional}:{}),...(p.sharedStimulusId?{sharedStimulusId:p.sharedStimulusId}:{})}));

    for (const p of this.parts) {
      this.partStatuses.set(p.id, 'UNVISITED');
    }

    if (config.initialActivePartId && this.parts.some((p) => p.id === config.initialActivePartId)) {
      this.activePartId = config.initialActivePartId;
    } else if (this.parts.length > 0) {
      this.activePartId = this.parts[0]!.id;
    } else {
      this.activePartId = '';
    }

    if (this.activePartId) {
      this.partStatuses.set(this.activePartId, 'VIEWED');
    }
  }

  getSections(): readonly PaperSectionDescriptor[] {
    return structuredClone(this.sections);
  }

  getParts(): readonly QuestionPartDescriptor[] {
    return this.parts.map((p) => ({ ...p }));
  }

  getActivePartId(): string {
    return this.activePartId;
  }

  getActivePart(): QuestionPartDescriptor | null {
    return structuredClone(this.parts.find(p=>p.id===this.activePartId)??null);
  }

  getActiveSection(): PaperSectionDescriptor | null {
    const activePart = this.getActivePart();
    if (!activePart) return null;
    return structuredClone(this.sections.find(s=>s.id===activePart.sectionId)??null);
  }

  getPartStatus(partId: string): PartStatus {
    if (this.flaggedParts.has(partId)) {
      return 'FLAGGED';
    }
    return this.partStatuses.get(partId) || 'UNVISITED';
  }

  setPartStatus(partId: string, status: PartStatus): boolean {
    if (!this.parts.some((p) => p.id === partId)||!['UNVISITED','VIEWED','ATTEMPTED','FLAGGED','COMPLETED'].includes(status)) return false;

    if (status === 'FLAGGED') {
      this.flaggedParts.add(partId);
    } else {
      this.flaggedParts.delete(partId);
      this.partStatuses.set(partId, status);
    }
    return true;
  }

  toggleFlag(partId: string): boolean {
    if (!this.parts.some((p) => p.id === partId)) return false;

    if (this.flaggedParts.has(partId)) {
      this.flaggedParts.delete(partId);
    } else {
      this.flaggedParts.add(partId);
    }
    return true;
  }

  isFlagged(partId: string): boolean {
    return this.flaggedParts.has(partId);
  }

  goToPart(partId: string): boolean {
    if (!this.parts.some((p) => p.id === partId)) return false;
    this.activePartId = partId;
    if (this.partStatuses.get(partId) === 'UNVISITED') {
      this.partStatuses.set(partId, 'VIEWED');
    }
    return true;
  }

  goToNextPart(): boolean {
    const idx = this.parts.findIndex((p) => p.id === this.activePartId);
    if (idx === -1 || idx >= this.parts.length - 1) return false;
    return this.goToPart(this.parts[idx + 1]!.id);
  }

  goToPreviousPart(): boolean {
    const idx = this.parts.findIndex((p) => p.id === this.activePartId);
    if (idx <= 0) return false;
    return this.goToPart(this.parts[idx - 1]!.id);
  }

  getSummaryCounts(): NavigationSummary {
    let unvisited = 0;
    let viewed = 0;
    let attempted = 0;
    let flagged = 0;
    let completed = 0;

    for (const p of this.parts) {
      if (this.flaggedParts.has(p.id)) {
        flagged++;
      } else {
        const s = this.partStatuses.get(p.id) || 'UNVISITED';
        if (s === 'UNVISITED') unvisited++;
        else if (s === 'VIEWED') viewed++;
        else if (s === 'ATTEMPTED') attempted++;
        else if (s === 'COMPLETED') completed++;
      }
    }

    return {
      total: this.parts.length,
      unvisited,
      viewed,
      attempted,
      flagged,
      completed,
    };
  }

  exportState(): {
    activePartId: string;
    statuses: Record<string, PartStatus>;
    flagged: string[];
  } {
    const statuses:Record<string,PartStatus>=Object.fromEntries(this.partStatuses);
    return {
      activePartId: this.activePartId,
      statuses,
      flagged: Array.from(this.flaggedParts),
    };
  }

  restoreState(state: {
    activePartId: string;
    statuses: Record<string, PartStatus>;
    flagged: string[];
  }): void {
    const ids=this.parts.map(p=>p.id);
    if(!ids.includes(state.activePartId)||!state.statuses||Object.keys(state.statuses).length!==ids.length||ids.some(id=>!Object.hasOwn(state.statuses,id)||!['UNVISITED','VIEWED','ATTEMPTED','COMPLETED'].includes(state.statuses[id]))||!Array.isArray(state.flagged)||new Set(state.flagged).size!==state.flagged.length||state.flagged.some(id=>!ids.includes(id)))throw Error('Invalid navigation snapshot');
    this.activePartId = state.activePartId;
    this.partStatuses.clear();
    for (const [id, s] of Object.entries(state.statuses)) {
      this.partStatuses.set(id, s);
    }
    this.flaggedParts = new Set(state.flagged);
  }

  renderHtml(): string {
    const counts = this.getSummaryCounts();

    const sectionsHtml = this.sections
      .map((sec) => {
        const partsInSec = this.parts.filter((p) => p.sectionId === sec.id);
        const partsButtons = partsInSec
          .map((p) => {
            const isActive = p.id === this.activePartId;
            const status = this.getPartStatus(p.id);
            const isFlagged = this.isFlagged(p.id);

            let bg = '#ffffff';
            let fg = '#0f172a';
            let border = '#cbd5e1';

            if (isActive) {
              border = '#2563eb';
              bg = '#eff6ff';
            } else if (isFlagged) {
              border = '#f59e0b';
              bg = '#fffbeb';
            } else if (status === 'COMPLETED' || status === 'ATTEMPTED') {
              border = '#10b981';
              bg = '#ecfdf5';
            }

            return `
            <button
              class="part-nav-item ${isActive ? 'active' : ''}"
              data-part-id="${escapeHtml(String(p.id))}"
              aria-current="${isActive ? 'step' : 'false'}"
              aria-label="Part ${escapeHtml(String(p.partKey))}: ${escapeHtml(String(p.label))} (${status})"
              style="min-height: ${HIT_TARGET_MIN_PX}px; min-width: ${HIT_TARGET_MIN_PX}px; padding: 8px 12px; background: ${bg}; color: ${fg}; border: 2px solid ${border}; border-radius: 6px; font-weight: 600; cursor: pointer; display: inline-flex; align-items: center; justify-content: center; gap: 4px;"
            >
              <span>${escapeHtml(String(p.partKey))}</span>
              ${isFlagged ? '<span style="color: #f59e0b;" aria-label="Flagged">🚩</span>' : ''}
            </button>`;
          })
          .join('');

        return `
        <div class="part-nav-section" style="margin-bottom: 12px;">
          <h4 style="margin: 0 0 6px 0; font-size: 13px; color: #475569; text-transform: uppercase;">${escapeHtml(String(sec.title))}</h4>
          <div style="display: flex; gap: 8px; flex-wrap: wrap;">
            ${partsButtons}
          </div>
        </div>`;
      })
      .join('');

    return `
      <nav class="part-navigation-panel" aria-label="Examination Part Navigation" style="padding: 12px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px;">
        <div class="part-nav-counters" style="display: flex; gap: 12px; font-size: 12px; color: #475569; margin-bottom: 12px; flex-wrap: wrap;">
          <span>Total: <strong>${counts.total}</strong></span>
          <span>Attempted: <strong style="color: #059669;">${counts.attempted + counts.completed}</strong></span>
          <span>Flagged: <strong style="color: #d97706;">${counts.flagged}</strong></span>
          <span>Unvisited: <strong style="color: #64748b;">${counts.unvisited}</strong></span>
        </div>
        ${sectionsHtml}
        <div class="part-nav-actions" style="display: flex; gap: 8px; margin-top: 12px;">
          <button id="part-nav-prev-btn" style="flex: 1; min-height: ${HIT_TARGET_MIN_PX}px; min-width: ${HIT_TARGET_MIN_PX}px; padding: 10px; background: #e2e8f0; border: none; border-radius: 6px; font-weight: 600;">← Previous</button>
          <button id="part-nav-flag-btn" style="min-height: ${HIT_TARGET_MIN_PX}px; min-width: ${HIT_TARGET_MIN_PX}px; padding: 10px 16px; background: #fef3c7; border: 1px solid #fde047; border-radius: 6px; font-weight: 600;">🚩 Flag</button>
          <button id="part-nav-next-btn" style="flex: 1; min-height: ${HIT_TARGET_MIN_PX}px; min-width: ${HIT_TARGET_MIN_PX}px; padding: 10px; background: #2563eb; color: #ffffff; border: none; border-radius: 6px; font-weight: 600;">Next →</button>
        </div>
      </nav>
    `;
  }
}

