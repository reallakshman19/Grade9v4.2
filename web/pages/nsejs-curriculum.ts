/**
 * web/pages/nsejs-curriculum.ts
 * Wave 11 — NSEJS Physics 12-Chapter Curriculum Navigator, 132-Subtopic Register & Authentic Question Bank.
 *
 * Implements:
 * - 12-Chapter Physics Syllabus Navigator (PH01 to PH12) spanning Mechanics, Thermo, Electrodynamics, Optics
 * - 132-Subtopic Register with Priority tiers (P0/P1/P2) and QRT Cognitive Demands
 * - Authentic 50-Question Bank (NSEJS-2023-P-Q01..Q50 from official Paper 51)
 * - 59-Question Circuit Practice Corpus (NSEJS-CIRC-L1-Q01..Q59)
 * - Fault N09 Answer Isolation: Raw keys withheld client-side; hints and decisive reasoning provided
 * - 12.7" Tablet Touch Ergonomics (>=48px min, >=56px primary actions, zero horizontal overflow)
 *
 * No academic approval inferred from software validation.
 */

import { escapeHtml } from '../runtime/rendering.ts';
import { HIT_TARGET_MIN_PX, HIT_TARGET_PRIMARY_PX } from '../styles/tokens.ts';
import {
  NSEJS_CHAPTERS,
  NSEJS_SUBTOPICS,
  NSEJS_AUTHENTIC_QUESTIONS,
  NSEJS_CIRCUIT_PRACTICE_QUESTIONS,
  type NsejsChapterDescriptor,
  type NsejsSubtopicDescriptor,
  type NsejsQuestionDescriptor,
} from './nsejs-data.generated.ts';

export {
  NSEJS_CHAPTERS,
  NSEJS_SUBTOPICS,
  NSEJS_AUTHENTIC_QUESTIONS,
  NSEJS_CIRCUIT_PRACTICE_QUESTIONS,
  type NsejsChapterDescriptor,
  type NsejsSubtopicDescriptor,
  type NsejsQuestionDescriptor,
};

export type NsejsSubtopicFilter = 'ALL' | 'P0' | 'P1' | 'P2';
export type NsejsViewTab = 'SUBTOPICS' | 'AUTHENTIC_QUESTIONS' | 'CIRCUIT_PRACTICE';

export interface NsejsCurriculumViewState {
  readonly selectedChapterId: string;
  readonly activeTab: NsejsViewTab;
  readonly subtopicFilter: NsejsSubtopicFilter;
  readonly searchQuery: string;
  readonly selectedQuestionId: string | null;
  readonly selectedSubtopicId: string | null;
  readonly expandedHints: ReadonlySet<string>;
  readonly expandedSteps: ReadonlySet<string>;
}

export class NsejsCurriculumController {
  private selectedChapterId: string = 'PH01';
  private activeTab: NsejsViewTab = 'SUBTOPICS';
  private subtopicFilter: NsejsSubtopicFilter = 'ALL';
  private searchQuery: string = '';
  private selectedQuestionId: string | null = null;
  private selectedSubtopicId: string | null = null;
  private expandedHints = new Set<string>();
  private expandedSteps = new Set<string>();

  getChapters(): readonly NsejsChapterDescriptor[] {
    return NSEJS_CHAPTERS;
  }

  getSelectedChapter(): NsejsChapterDescriptor {
    const ch = NSEJS_CHAPTERS.find((c) => c.id === this.selectedChapterId);
    return ch || NSEJS_CHAPTERS[0]!;
  }

  setSelectedChapter(id: string): void {
    if (NSEJS_CHAPTERS.some((c) => c.id === id)) {
      this.selectedChapterId = id;
      this.selectedQuestionId = null;
      this.selectedSubtopicId = null;
    }
  }

  getSelectedSubtopicId(): string | null {
    return this.selectedSubtopicId;
  }

  setSelectedSubtopicId(id: string | null): void {
    this.selectedSubtopicId = id;
  }

  getActiveTab(): NsejsViewTab {
    return this.activeTab;
  }

  setActiveTab(tab: NsejsViewTab): void {
    this.activeTab = tab;
  }

  getSubtopicFilter(): NsejsSubtopicFilter {
    return this.subtopicFilter;
  }

  setSubtopicFilter(filter: NsejsSubtopicFilter): void {
    this.subtopicFilter = filter;
  }

  getSearchQuery(): string {
    return this.searchQuery;
  }

  setSearchQuery(q: string): void {
    this.searchQuery = q.trim().toLowerCase();
  }

  getSelectedQuestionId(): string | null {
    return this.selectedQuestionId;
  }

  setSelectedQuestionId(id: string | null): void {
    this.selectedQuestionId = id;
  }

  toggleHint(id: string): void {
    if (this.expandedHints.has(id)) {
      this.expandedHints.delete(id);
    } else {
      this.expandedHints.add(id);
    }
  }

  isHintExpanded(id: string): boolean {
    return this.expandedHints.has(id);
  }

  toggleStep(id: string): void {
    if (this.expandedSteps.has(id)) {
      this.expandedSteps.delete(id);
    } else {
      this.expandedSteps.add(id);
    }
  }

  isStepExpanded(id: string): boolean {
    return this.expandedSteps.has(id);
  }

  getSubtopics(chapterId?: string): readonly NsejsSubtopicDescriptor[] {
    const cid = chapterId || this.selectedChapterId;
    let list = NSEJS_SUBTOPICS.filter((s) => s.chapterId === cid);

    if (this.subtopicFilter !== 'ALL') {
      list = list.filter((s) => s.priority === this.subtopicFilter);
    }

    if (this.searchQuery) {
      list = list.filter(
        (s) =>
          s.subtopicId.toLowerCase().includes(this.searchQuery) ||
          s.title.toLowerCase().includes(this.searchQuery)
      );
    }

    return list;
  }

  getQuestions(chapterId?: string): readonly NsejsQuestionDescriptor[] {
    const cid = chapterId || this.selectedChapterId;
    let list = NSEJS_AUTHENTIC_QUESTIONS.filter((q) => q.chapterId === cid);

    // If no questions in current chapter, return all or filtered by search
    if (list.length === 0 && !chapterId) {
      list = [...NSEJS_AUTHENTIC_QUESTIONS];
    }

    if (this.searchQuery) {
      list = list.filter(
        (q) =>
          q.id.toLowerCase().includes(this.searchQuery) ||
          q.topic.toLowerCase().includes(this.searchQuery) ||
          q.stem.toLowerCase().includes(this.searchQuery)
      );
    }

    return list;
  }

  getCircuitQuestions(): readonly NsejsQuestionDescriptor[] {
    let list = [...NSEJS_CIRCUIT_PRACTICE_QUESTIONS];
    if (this.searchQuery) {
      list = list.filter(
        (q) =>
          q.id.toLowerCase().includes(this.searchQuery) ||
          q.stem.toLowerCase().includes(this.searchQuery)
      );
    }
    return list;
  }

  getStats() {
    return {
      totalChapters: NSEJS_CHAPTERS.length,
      totalSubtopics: NSEJS_SUBTOPICS.length,
      totalAuthenticQuestions: NSEJS_AUTHENTIC_QUESTIONS.length,
      totalCircuitQuestions: NSEJS_CIRCUIT_PRACTICE_QUESTIONS.length,
    };
  }

  getViewState(): NsejsCurriculumViewState {
    return {
      selectedChapterId: this.selectedChapterId,
      activeTab: this.activeTab,
      subtopicFilter: this.subtopicFilter,
      searchQuery: this.searchQuery,
      selectedQuestionId: this.selectedQuestionId,
      selectedSubtopicId: this.selectedSubtopicId,
      expandedHints: new Set(this.expandedHints),
      expandedSteps: new Set(this.expandedSteps),
    };
  }
}

export function createNsejsCurriculumController(): NsejsCurriculumController {
  return new NsejsCurriculumController();
}

export function mountNsejsChapterExplorer(
  root: HTMLElement,
  controller: NsejsCurriculumController,
  onNavigate?: (route: string) => void
): { dispose: () => void } {
  let active = true;

  const render = () => {
    if (!active) return;
    const state = controller.getViewState();
    const chapter = controller.getSelectedChapter();
    const stats = controller.getStats();

    const subtopics = controller.getSubtopics();
    const questions = controller.getQuestions();
    const circuits = controller.getCircuitQuestions();

    root.innerHTML = `
      <div class="nsejs-explorer-container" style="display: flex; flex-direction: column; gap: 1.5rem; max-width: 1400px; margin: 0 auto; box-sizing: border-box; width: 100%;">
        
        <!-- Header & Stats Summary Banner -->
        <div style="background: linear-gradient(135deg, #091e3a 0%, #1e293b 100%); color: #ffffff; border-radius: 12px; padding: 1.5rem; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);">
          <div style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 1rem; margin-bottom: 1rem;">
            <div>
              <div style="display: flex; gap: 8px; align-items: center; margin-bottom: 0.5rem; flex-wrap: wrap;">
                <span style="font-size: 0.8rem; font-weight: 800; background: #38bdf8; color: #0f172a; padding: 3px 8px; border-radius: 4px;">GRADE9 v4.1 RECONCILED</span>
                <span style="font-size: 0.8rem; font-weight: 700; background: #334155; color: #f8fafc; padding: 3px 8px; border-radius: 4px;">IAPT Junior Science Olympiad</span>
                <span style="font-size: 0.8rem; font-weight: 700; background: #fee2e2; color: #991b1b; padding: 3px 8px; border-radius: 4px;">Fault N09 Answer Isolation Active</span>
              </div>
              <h1 style="margin: 0 0 0.5rem; font-size: 1.75rem; font-weight: 800; color: #ffffff;">⚛️ NSEJS Physics 12-Chapter Curriculum Navigator</h1>
              <p style="margin: 0; color: #cbd5e1; font-size: 1rem; max-width: 900px; line-height: 1.5;">
                Comprehensive curriculum coverage from the Grade9v4.1 NSEJS Physics programme. All 12 chapters, 132 syllabus subtopics, 50 authentic question identities, and 59 circuit practice modules mounted natively in diagnostic mode.
              </p>
            </div>
            
            <button type="button" id="btn-launch-mock-paper" style="min-height: ${HIT_TARGET_PRIMARY_PX}px; min-width: 220px; padding: 14px 24px; background: #0284c7; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: 800; font-size: 1.05rem; box-shadow: 0 2px 4px rgba(0,0,0,0.2); transition: background 0.2s;">
              Timed NSEJS Mock Paper 1 →
            </button>
          </div>

          <!-- Quick Metrics Bar -->
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 180px), 1fr)); gap: 12px; border-top: 1px solid #334155; padding-top: 1rem;">
            <div style="background: rgba(255,255,255,0.06); padding: 10px 14px; border-radius: 6px;">
              <span style="font-size: 0.8rem; color: #94a3b8; display: block;">Physics Chapters</span>
              <strong style="font-size: 1.35rem; color: #38bdf8;">${stats.totalChapters} Official</strong>
            </div>
            <div style="background: rgba(255,255,255,0.06); padding: 10px 14px; border-radius: 6px;">
              <span style="font-size: 0.8rem; color: #94a3b8; display: block;">Syllabus Subtopics</span>
              <strong style="font-size: 1.35rem; color: #4ade80;">${stats.totalSubtopics} Catalogued</strong>
            </div>
            <div style="background: rgba(255,255,255,0.06); padding: 10px 14px; border-radius: 6px;">
              <span style="font-size: 0.8rem; color: #94a3b8; display: block;">Authentic Paper 51 Bank</span>
              <strong style="font-size: 1.35rem; color: #f59e0b;">${stats.totalAuthenticQuestions} Questions</strong>
            </div>
            <div style="background: rgba(255,255,255,0.06); padding: 10px 14px; border-radius: 6px;">
              <span style="font-size: 0.8rem; color: #94a3b8; display: block;">Circuit Practice Bank</span>
              <strong style="font-size: 1.35rem; color: #a78bfa;">${stats.totalCircuitQuestions} Modules</strong>
            </div>
          </div>
        </div>

        <!-- Chapter Selector Grid (PH01 to PH12) -->
        <div style="background: #ffffff; border: 1px solid #cbd5e1; border-radius: 12px; padding: 1.25rem;">
          <h3 style="margin: 0 0 0.75rem; font-size: 1.15rem; color: #0f172a; font-weight: 700;">Select Physics Chapter (PH01 – PH12)</h3>
          <div class="chapter-pills-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, 190px), 1fr)); gap: 10px;">
            ${NSEJS_CHAPTERS.map((ch) => {
              const isSel = ch.id === state.selectedChapterId;
              return `
                <button type="button" class="btn-select-chapter" data-chapter-id="${ch.id}" style="min-height: ${HIT_TARGET_MIN_PX}px; padding: 10px 12px; background: ${isSel ? '#0284c7' : '#f8fafc'}; color: ${isSel ? '#ffffff' : '#0f172a'}; border: 2px solid ${isSel ? '#0369a1' : '#e2e8f0'}; border-radius: 8px; cursor: pointer; text-align: left; display: flex; flex-direction: column; justify-content: space-between; transition: all 0.15s ease;">
                  <div style="display: flex; justify-content: space-between; align-items: center; width: 100%; margin-bottom: 4px;">
                    <strong style="font-size: 0.95rem;">${ch.id}</strong>
                    <span style="font-size: 0.75rem; font-weight: 700; background: ${isSel ? '#0369a1' : '#e0f2fe'}; color: ${isSel ? '#ffffff' : '#0369a1'}; padding: 2px 6px; border-radius: 4px;">${ch.subtopicCount} subs</span>
                  </div>
                  <div style="font-size: 0.85rem; font-weight: 600; line-height: 1.25; overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;">
                    ${escapeHtml(ch.title)}
                  </div>
                </button>
              `;
            }).join('')}
          </div>
        </div>

        <!-- Selected Chapter Hero & Key Formula Warrants -->
        <div style="background: #ffffff; border: 1px solid #cbd5e1; border-radius: 12px; padding: 1.5rem;">
          <div style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: flex-start; gap: 1rem; margin-bottom: 1rem; border-bottom: 1px solid #e2e8f0; padding-bottom: 1rem;">
            <div>
              <div style="display: flex; gap: 8px; margin-bottom: 0.4rem;">
                <span style="font-size: 0.8rem; font-weight: 800; background: #e0f2fe; color: #0369a1; padding: 2px 8px; border-radius: 4px;">${chapter.id}</span>
                <span style="font-size: 0.8rem; font-weight: 700; background: #f1f5f9; color: #475569; padding: 2px 8px; border-radius: 4px;">Domain: ${escapeHtml(chapter.domain)}</span>
                <span style="font-size: 0.8rem; font-weight: 700; background: #f0fdf4; color: #166534; padding: 2px 8px; border-radius: 4px;">${chapter.subtopicCount} Syllabus Subtopics</span>
              </div>
              <h3 style="margin: 0 0 0.5rem; font-size: 1.5rem; color: #0f172a; font-weight: 800;">${escapeHtml(chapter.title)}</h3>
              <p style="margin: 0; font-size: 1rem; color: #475569; max-width: 850px; line-height: 1.5;">${escapeHtml(chapter.description)}</p>
            </div>
          </div>

          <div>
            <h4 style="margin: 0 0 0.5rem; font-size: 0.95rem; color: #0f172a; text-transform: uppercase; letter-spacing: 0.5px;">Core Invariants &amp; Formula Warrants:</h4>
            <div style="display: flex; flex-wrap: wrap; gap: 8px;">
              ${chapter.formulaWarrants.map((fw) => `
                <span style="font-family: monospace; font-size: 0.9rem; font-weight: 700; background: #f8fafc; border: 1px solid #cbd5e1; color: #0369a1; padding: 4px 10px; border-radius: 6px;">${escapeHtml(fw)}</span>
              `).join('')}
            </div>
          </div>
        </div>

        <!-- Explorer Navigation Tabs & Live Filter Controls -->
        <div style="background: #ffffff; border: 1px solid #cbd5e1; border-radius: 12px; padding: 1.5rem;">
          
          <div style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 1rem; margin-bottom: 1.25rem; border-bottom: 2px solid #e2e8f0; padding-bottom: 1rem;">
            <!-- Tabs -->
            <div style="display: flex; gap: 8px; flex-wrap: wrap;" role="tablist">
              <button type="button" class="btn-curriculum-tab" data-tab="SUBTOPICS" style="min-height: ${HIT_TARGET_MIN_PX}px; padding: 8px 18px; background: ${state.activeTab === 'SUBTOPICS' ? '#0284c7' : '#f1f5f9'}; color: ${state.activeTab === 'SUBTOPICS' ? '#ffffff' : '#0f172a'}; border: none; border-radius: 6px; cursor: pointer; font-weight: 700; font-size: 0.95rem;">
                📋 Chapter Subtopics (${chapter.subtopicCount})
              </button>
              <button type="button" class="btn-curriculum-tab" data-tab="AUTHENTIC_QUESTIONS" style="min-height: ${HIT_TARGET_MIN_PX}px; padding: 8px 18px; background: ${state.activeTab === 'AUTHENTIC_QUESTIONS' ? '#0284c7' : '#f1f5f9'}; color: ${state.activeTab === 'AUTHENTIC_QUESTIONS' ? '#ffffff' : '#0f172a'}; border: none; border-radius: 6px; cursor: pointer; font-weight: 700; font-size: 0.95rem;">
                🎯 Authentic Questions (${questions.length})
              </button>
              <button type="button" class="btn-curriculum-tab" data-tab="CIRCUIT_PRACTICE" style="min-height: ${HIT_TARGET_MIN_PX}px; padding: 8px 18px; background: ${state.activeTab === 'CIRCUIT_PRACTICE' ? '#0284c7' : '#f1f5f9'}; color: ${state.activeTab === 'CIRCUIT_PRACTICE' ? '#ffffff' : '#0f172a'}; border: none; border-radius: 6px; cursor: pointer; font-weight: 700; font-size: 0.95rem;">
                ⚡ Circuit Practice Corpus (59)
              </button>
            </div>

            <!-- Search input -->
            <div style="display: flex; gap: 8px; align-items: center;">
              <input type="text" id="nsejs-search-input" value="${escapeHtml(state.searchQuery)}" placeholder="Search subtopics or questions..." style="min-height: ${HIT_TARGET_MIN_PX}px; padding: 8px 14px; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 0.95rem; width: 260px; max-width: 100%; box-sizing: border-box;" />
              ${state.searchQuery ? `
                <button type="button" id="btn-clear-search" style="min-height: ${HIT_TARGET_MIN_PX}px; min-width: ${HIT_TARGET_MIN_PX}px; padding: 8px 12px; background: #e2e8f0; color: #475569; border: none; border-radius: 6px; cursor: pointer; font-weight: 700;">✕</button>
              ` : ''}
            </div>
          </div>

          <!-- TAB 1: Subtopics Explorer -->
          ${state.activeTab === 'SUBTOPICS' ? `
            <div>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; flex-wrap: wrap; gap: 8px;">
                <div style="font-size: 0.95rem; color: #64748b;">
                  Showing <strong>${subtopics.length}</strong> subtopics for <strong>${chapter.id}: ${escapeHtml(chapter.title)}</strong>
                </div>

                <div style="display: flex; gap: 6px; align-items: center;">
                  <span style="font-size: 0.85rem; font-weight: 700; color: #475569;">Priority Filter:</span>
                  ${(['ALL', 'P0', 'P1', 'P2'] as const).map((f) => `
                    <button type="button" class="btn-subtopic-filter" data-filter="${f}" style="min-height: ${HIT_TARGET_MIN_PX}px; min-width: ${HIT_TARGET_MIN_PX}px; padding: 8px 14px; background: ${state.subtopicFilter === f ? '#0f172a' : '#f1f5f9'}; color: ${state.subtopicFilter === f ? '#ffffff' : '#334155'}; border: 1px solid #cbd5e1; border-radius: 6px; cursor: pointer; font-weight: 700; font-size: 0.85rem;">
                      ${f}
                    </button>
                  `).join('')}
                </div>
              </div>

              <div style="display: flex; flex-direction: column; gap: 8px;">
                ${subtopics.length === 0 ? `
                  <div style="padding: 2rem; text-align: center; color: #64748b; background: #f8fafc; border-radius: 8px;">
                    No subtopics match the current filter or search criteria.
                  </div>
                ` : subtopics.map((s) => {
                  const isSelected = state.selectedSubtopicId === s.subtopicId;
                  return `
                  <div class="subtopic-card-item" data-subtopic-id="${s.subtopicId}" style="display: flex; flex-direction: column; padding: 12px 16px; background: ${isSelected ? '#f0f9ff' : '#f8fafc'}; border: 1px solid ${isSelected ? '#0284c7' : '#e2e8f0'}; border-radius: 8px; cursor: pointer; transition: all 0.2s;">
                    <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px;">
                      <div style="display: flex; gap: 12px; align-items: center;">
                        <span style="font-family: monospace; font-size: 0.85rem; font-weight: 800; background: #e0f2fe; color: #0369a1; padding: 4px 8px; border-radius: 4px; min-width: 80px; text-align: center;">
                          ${s.subtopicId}
                        </span>
                        <div>
                          <strong style="color: #0f172a; font-size: 1rem;">${escapeHtml(s.title)}</strong>
                        </div>
                      </div>

                      <div style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">
                        <span style="font-size: 0.75rem; font-weight: 800; padding: 2px 8px; border-radius: 4px; background: ${s.priority === 'P0' ? '#fee2e2' : s.priority === 'P1' ? '#fef3c7' : '#f1f5f9'}; color: ${s.priority === 'P0' ? '#991b1b' : s.priority === 'P1' ? '#92400e' : '#475569'};">
                          Tier ${s.priority}
                        </span>
                        ${s.qrtOperations.map((op) => `
                          <span style="font-size: 0.7rem; font-weight: 700; background: #e0e7ff; color: #3730a3; padding: 2px 6px; border-radius: 3px;">
                            ${escapeHtml(op)}
                          </span>
                        `).join('')}
                      </div>
                    </div>

                    ${isSelected ? `
                      <div class="subtopic-detail-drawer" style="margin-top: 10px; padding-top: 10px; border-top: 1px solid #bae6fd; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px;">
                        <div style="font-size: 0.85rem; color: #0369a1;">
                          <strong>Cognitive Focus:</strong> ${s.qrtOperations.join(', ')} · <strong>Priority Tier:</strong> ${s.priority}
                        </div>
                        <button type="button" class="btn-jump-questions" data-chapter="${s.chapterId}" style="min-height: ${HIT_TARGET_MIN_PX}px; padding: 6px 14px; background: #0284c7; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 700; font-size: 0.85rem;">
                          Jump to Chapter Questions →
                        </button>
                      </div>
                    ` : ''}
                  </div>
                `;}).join('')}
              </div>
            </div>
          ` : ''}

          <!-- TAB 2: Authentic 50-Question Bank -->
          ${state.activeTab === 'AUTHENTIC_QUESTIONS' ? `
            <div>
              <div style="margin-bottom: 1rem; color: #64748b; font-size: 0.95rem;">
                Showing <strong>${questions.length}</strong> authentic examination questions from official IAPT Paper 51 candidates.
              </div>

              <div style="display: flex; flex-direction: column; gap: 1rem;">
                ${questions.length === 0 ? `
                  <div style="padding: 2rem; text-align: center; color: #64748b; background: #f8fafc; border-radius: 8px;">
                    No authentic questions match the current filter.
                  </div>
                ` : questions.map((q) => {
                  const hintsOpen = controller.isHintExpanded(q.id);
                  const stepsOpen = controller.isStepExpanded(q.id);
                  return `
                    <article style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 8px; padding: 1.25rem;">
                      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem; border-bottom: 1px solid #e2e8f0; padding-bottom: 0.5rem; flex-wrap: wrap; gap: 8px;">
                        <div style="display: flex; gap: 8px; align-items: center;">
                          <strong style="color: #0284c7; font-size: 1.05rem;">${escapeHtml(q.id)}</strong>
                          <span style="font-size: 0.75rem; font-weight: 700; background: #e0f2fe; color: #0369a1; padding: 2px 6px; border-radius: 4px;">${escapeHtml(q.topic)}</span>
                          <span style="font-size: 0.75rem; font-weight: 700; background: #f1f5f9; color: #475569; padding: 2px 6px; border-radius: 4px;">${q.chapterId}</span>
                        </div>
                        <span style="font-size: 0.75rem; font-weight: 800; background: #fef3c7; color: #92400e; padding: 2px 8px; border-radius: 4px;">
                          Key Withheld (Fault N09 Isolation)
                        </span>
                      </div>

                      <div style="font-size: 1rem; line-height: 1.6; color: #1e293b; margin-bottom: 1rem;">
                        ${escapeHtml(q.stem)}
                      </div>

                      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 260px), 1fr)); gap: 8px; margin-bottom: 1rem;">
                        ${q.options.map((opt) => `
                          <div style="padding: 8px 12px; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 6px; font-size: 0.95rem; color: #334155;">
                            ${escapeHtml(opt)}
                          </div>
                        `).join('')}
                      </div>

                      <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                        <button type="button" class="btn-toggle-hint" data-qid="${q.id}" style="min-height: ${HIT_TARGET_MIN_PX}px; padding: 6px 14px; background: #ffffff; border: 1px solid #cbd5e1; border-radius: 6px; cursor: pointer; font-weight: 700; font-size: 0.85rem; color: #0284c7;">
                          ${hintsOpen ? '▲ Hide Pedagogical Hints' : '▼ View Pedagogical Hints (' + q.hints.length + ')'}
                        </button>
                        <button type="button" class="btn-toggle-step" data-qid="${q.id}" style="min-height: ${HIT_TARGET_MIN_PX}px; padding: 6px 14px; background: #ffffff; border: 1px solid #cbd5e1; border-radius: 6px; cursor: pointer; font-weight: 700; font-size: 0.85rem; color: #0f172a;">
                          ${stepsOpen ? '▲ Hide Decisive Reasoning Steps' : '▼ View Decisive Reasoning Steps (' + q.steps.length + ')'}
                        </button>
                      </div>

                      ${hintsOpen ? `
                        <div style="margin-top: 10px; background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 6px; padding: 10px 14px;">
                          <strong style="color: #1e40af; font-size: 0.85rem; display: block; margin-bottom: 6px;">Pedagogical Guidance &amp; Crux Hints:</strong>
                          <ul style="margin: 0; padding-left: 1.25rem; font-size: 0.9rem; color: #1e3a8a;">
                            ${q.hints.map((h) => `<li style="margin-bottom: 4px;">${escapeHtml(h)}</li>`).join('')}
                          </ul>
                        </div>
                      ` : ''}

                      ${stepsOpen ? `
                        <div style="margin-top: 10px; background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 6px; padding: 10px 14px;">
                          <strong style="color: #166534; font-size: 0.85rem; display: block; margin-bottom: 6px;">Decisive Reasoning Moves (No Direct Key):</strong>
                          <ol style="margin: 0; padding-left: 1.25rem; font-size: 0.9rem; color: #14532d;">
                            ${q.steps.map((st) => `<li style="margin-bottom: 4px;">${escapeHtml(st)}</li>`).join('')}
                          </ol>
                        </div>
                      ` : ''}
                    </article>
                  `;
                }).join('')}
              </div>
            </div>
          ` : ''}

          <!-- TAB 3: Circuit Practice Corpus -->
          ${state.activeTab === 'CIRCUIT_PRACTICE' ? `
            <div>
              <div style="margin-bottom: 1rem; color: #64748b; font-size: 0.95rem;">
                Showing <strong>${circuits.length}</strong> multi-level circuit practice modules from Chapter PH11 (Electrostatics, Current &amp; Circuits).
              </div>

              <div style="display: flex; flex-direction: column; gap: 1rem;">
                ${circuits.length === 0 ? `
                  <div style="padding: 2rem; text-align: center; color: #64748b; background: #f8fafc; border-radius: 8px;">
                    No circuit modules match the current filter.
                  </div>
                ` : circuits.map((c) => {
                  const hintsOpen = controller.isHintExpanded(c.id);
                  const stepsOpen = controller.isStepExpanded(c.id);
                  return `
                    <article style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 8px; padding: 1.25rem;">
                      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem; border-bottom: 1px solid #e2e8f0; padding-bottom: 0.5rem; flex-wrap: wrap; gap: 8px;">
                        <div style="display: flex; gap: 8px; align-items: center;">
                          <strong style="color: #7c3aed; font-size: 1.05rem;">${escapeHtml(c.id)}</strong>
                          <span style="font-size: 0.75rem; font-weight: 700; background: #ede9fe; color: #6d28d9; padding: 2px 6px; border-radius: 4px;">PH11 Circuits</span>
                        </div>
                        <span style="font-size: 0.75rem; font-weight: 800; background: #fef3c7; color: #92400e; padding: 2px 8px; border-radius: 4px;">
                          Key Withheld (Fault N09)
                        </span>
                      </div>

                      <div style="font-size: 1rem; line-height: 1.6; color: #1e293b; margin-bottom: 1rem;">
                        ${escapeHtml(c.stem)}
                      </div>

                      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 260px), 1fr)); gap: 8px; margin-bottom: 1rem;">
                        ${c.options.map((opt) => `
                          <div style="padding: 8px 12px; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 6px; font-size: 0.95rem; color: #334155;">
                            ${escapeHtml(opt)}
                          </div>
                        `).join('')}
                      </div>

                      <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                        <button type="button" class="btn-toggle-hint" data-qid="${c.id}" style="min-height: ${HIT_TARGET_MIN_PX}px; padding: 6px 14px; background: #ffffff; border: 1px solid #cbd5e1; border-radius: 6px; cursor: pointer; font-weight: 700; font-size: 0.85rem; color: #7c3aed;">
                          ${hintsOpen ? '▲ Hide Circuit Hints' : '▼ View Circuit Hints (' + c.hints.length + ')'}
                        </button>
                        <button type="button" class="btn-toggle-step" data-qid="${c.id}" style="min-height: ${HIT_TARGET_MIN_PX}px; padding: 6px 14px; background: #ffffff; border: 1px solid #cbd5e1; border-radius: 6px; cursor: pointer; font-weight: 700; font-size: 0.85rem; color: #0f172a;">
                          ${stepsOpen ? '▲ Hide Analysis Steps' : '▼ View Analysis Steps (' + c.steps.length + ')'}
                        </button>
                      </div>

                      ${hintsOpen ? `
                        <div style="margin-top: 10px; background: #faf5ff; border: 1px solid #e9d5ff; border-radius: 6px; padding: 10px 14px;">
                          <strong style="color: #6b21a8; font-size: 0.85rem; display: block; margin-bottom: 6px;">Circuit Hints &amp; Crux Invariants:</strong>
                          <ul style="margin: 0; padding-left: 1.25rem; font-size: 0.9rem; color: #581c87;">
                            ${c.hints.map((h) => `<li style="margin-bottom: 4px;">${escapeHtml(h)}</li>`).join('')}
                          </ul>
                        </div>
                      ` : ''}

                      ${stepsOpen ? `
                        <div style="margin-top: 10px; background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 6px; padding: 10px 14px;">
                          <strong style="color: #166534; font-size: 0.85rem; display: block; margin-bottom: 6px;">Circuit Analysis Steps:</strong>
                          <ol style="margin: 0; padding-left: 1.25rem; font-size: 0.9rem; color: #14532d;">
                            ${c.steps.map((st) => `<li style="margin-bottom: 4px;">${escapeHtml(st)}</li>`).join('')}
                          </ol>
                        </div>
                      ` : ''}
                    </article>
                  `;
                }).join('')}
              </div>
            </div>
          ` : ''}

        </div>

      </div>
    `;

    bindEvents();
  };

  const bindEvents = () => {
    // Launch Mock Paper button
    root.querySelector<HTMLButtonElement>('#btn-launch-mock-paper')?.addEventListener('click', () => {
      if (onNavigate) onNavigate('/practice/nsejs-2024-mock-1');
      else window.location.hash = '#/practice/nsejs-2024-mock-1';
    });

    // Chapter select buttons
    root.querySelectorAll<HTMLButtonElement>('.btn-select-chapter').forEach((btn) => {
      btn.addEventListener('click', () => {
        const cid = btn.dataset.chapterId;
        if (cid) {
          controller.setSelectedChapter(cid);
          render();
        }
      });
    });

    // Tabs
    root.querySelectorAll<HTMLButtonElement>('.btn-curriculum-tab').forEach((btn) => {
      btn.addEventListener('click', () => {
        const tab = btn.dataset.tab as NsejsViewTab;
        if (tab) {
          controller.setActiveTab(tab);
          render();
        }
      });
    });

    // Subtopic Priority Filters
    root.querySelectorAll<HTMLButtonElement>('.btn-subtopic-filter').forEach((btn) => {
      btn.addEventListener('click', () => {
        const f = btn.dataset.filter as NsejsSubtopicFilter;
        if (f) {
          controller.setSubtopicFilter(f);
          render();
        }
      });
    });

    // Subtopic Card Click & Jump Actions
    root.querySelectorAll<HTMLElement>('.subtopic-card-item').forEach((item) => {
      item.addEventListener('click', (e) => {
        if ((e.target as HTMLElement).closest('.btn-jump-questions')) return;
        const sid = item.dataset.subtopicId;
        if (sid) {
          controller.setSelectedSubtopicId(
            controller.getSelectedSubtopicId() === sid ? null : sid
          );
          render();
        }
      });
    });

    root.querySelectorAll<HTMLButtonElement>('.btn-jump-questions').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        controller.setActiveTab('AUTHENTIC_QUESTIONS');
        render();
      });
    });

    // Search Input
    const searchInput = root.querySelector<HTMLInputElement>('#nsejs-search-input');
    searchInput?.addEventListener('input', () => {
      controller.setSearchQuery(searchInput.value);
      render();
    });

    root.querySelector<HTMLButtonElement>('#btn-clear-search')?.addEventListener('click', () => {
      controller.setSearchQuery('');
      render();
    });

    // Toggle Hints & Steps
    root.querySelectorAll<HTMLButtonElement>('.btn-toggle-hint').forEach((btn) => {
      btn.addEventListener('click', () => {
        const qid = btn.dataset.qid;
        if (qid) {
          controller.toggleHint(qid);
          render();
        }
      });
    });

    root.querySelectorAll<HTMLButtonElement>('.btn-toggle-step').forEach((btn) => {
      btn.addEventListener('click', () => {
        const qid = btn.dataset.qid;
        if (qid) {
          controller.toggleStep(qid);
          render();
        }
      });
    });
  };

  render();

  return {
    dispose: () => {
      active = false;
      root.replaceChildren();
    },
  };
}
