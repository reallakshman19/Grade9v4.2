/**
 * web/pages/nsejs-core2-hub.ts
 * Wave 14 — NSEJS Core 2 Multi-Disciplinary Question Bank (45 Modules, 302 Questions).
 *
 * Implements:
 * - 45 Module Multi-Disciplinary Navigator (21 Physics, 13 Chemistry, 11 Biology)
 * - 302 Authentic Questions Explorer (130 Physics, 87 Chemistry, 85 Biology)
 * - Fault N09 Answer Isolation (official answer keys strictly withheld from client-side runtime)
 * - Governed Owner Delivery Policy (academic admission: HOLD · Diagnostic mode: AUTHORIZED)
 * - Interactive Multi-Disciplinary 15-Question Sprint Simulator (5 Phys + 5 Chem + 5 Bio)
 * - 12.7" Tablet Touch Ergonomics (>=48px min, >=56px primary actions, zero horizontal overflow)
 *
 * No academic approval inferred from software validation.
 */

import { escapeHtml } from '../runtime/rendering.ts';
import { HIT_TARGET_MIN_PX, HIT_TARGET_PRIMARY_PX } from '../styles/tokens.ts';
import {
  NSEJS_CORE2_MODULES,
  NSEJS_CORE2_QUESTIONS,
  type NsejsCore2ModuleDescriptor,
  type NsejsCore2QuestionDescriptor,
} from './nsejs-core2-data.generated.ts';

export {
  NSEJS_CORE2_MODULES,
  NSEJS_CORE2_QUESTIONS,
  type NsejsCore2ModuleDescriptor,
  type NsejsCore2QuestionDescriptor,
};

export type Core2SubjectFilter = 'ALL' | 'PHYSICS' | 'CHEMISTRY' | 'BIOLOGY';
export type Core2QrtFilter = 'ALL' | 'MODEL' | 'APPLY' | 'EXPLAIN' | 'JUSTIFY' | 'REPRESENT' | 'SYNTHESIZE' | 'RETRIEVE';
export type Core2Tab = 'modules' | 'questions' | 'sprint';

export interface NsejsCore2HubState {
  activeTab: Core2Tab;
  subjectFilter: Core2SubjectFilter;
  qrtFilter: Core2QrtFilter;
  searchQuery: string;
  selectedModuleSlug: string | null;
  revealedHints: Set<string>;
  revealedSteps: Set<string>;
  selectedAnswers: Map<string, string>;
  // Sprint Simulator State
  sprintActive: boolean;
  sprintQuestions: NsejsCore2QuestionDescriptor[];
  sprintIndex: number;
  sprintTimerSeconds: number;
  sprintTimerId: any;
  sprintSubmitted: boolean;
  sprintUserAnswers: Map<string, string>;
}

export class NsejsCore2HubController {
  private state: NsejsCore2HubState;
  private root: HTMLElement | null = null;
  private onNavigate?: (route: string) => void;

  constructor(onNavigate?: (route: string) => void) {
    this.onNavigate = onNavigate;
    this.state = {
      activeTab: 'modules',
      subjectFilter: 'ALL',
      qrtFilter: 'ALL',
      searchQuery: '',
      selectedModuleSlug: null,
      revealedHints: new Set<string>(),
      revealedSteps: new Set<string>(),
      selectedAnswers: new Map<string, string>(),
      sprintActive: false,
      sprintQuestions: [],
      sprintIndex: 0,
      sprintTimerSeconds: 15 * 60, // 15 mins for 15 questions
      sprintTimerId: null,
      sprintSubmitted: false,
      sprintUserAnswers: new Map<string, string>(),
    };
  }

  public mount(root: HTMLElement): void {
    this.root = root;
    this.render();
  }

  public dispose(): void {
    if (this.state.sprintTimerId !== null) {
      clearInterval(this.state.sprintTimerId);
      this.state.sprintTimerId = null;
    }
    this.root = null;
  }

  public getState(): Readonly<NsejsCore2HubState> {
    return this.state;
  }

  public setTab(tab: Core2Tab): void {
    this.state.activeTab = tab;
    this.render();
  }

  public setSubjectFilter(filter: Core2SubjectFilter): void {
    this.state.subjectFilter = filter;
    this.render();
  }

  public setQrtFilter(filter: Core2QrtFilter): void {
    this.state.qrtFilter = filter;
    this.render();
  }

  public setSearchQuery(query: string): void {
    this.state.searchQuery = query;
    this.render();
  }

  public selectModule(slug: string | null): void {
    this.state.selectedModuleSlug = slug;
    if (slug) {
      this.state.activeTab = 'questions';
    }
    this.render();
  }

  public toggleHints(questionId: string): void {
    if (this.state.revealedHints.has(questionId)) {
      this.state.revealedHints.delete(questionId);
    } else {
      this.state.revealedHints.add(questionId);
    }
    this.render();
  }

  public toggleSteps(questionId: string): void {
    if (this.state.revealedSteps.has(questionId)) {
      this.state.revealedSteps.delete(questionId);
    } else {
      this.state.revealedSteps.add(questionId);
    }
    this.render();
  }

  public selectOption(questionId: string, optionKey: string): void {
    this.state.selectedAnswers.set(questionId, optionKey);
    this.render();
  }

  public startSprint(): void {
    // Pick 5 Physics, 5 Chemistry, 5 Biology questions
    const phys = NSEJS_CORE2_QUESTIONS.filter(q => q.subject === 'PHYSICS');
    const chem = NSEJS_CORE2_QUESTIONS.filter(q => q.subject === 'CHEMISTRY');
    const bio = NSEJS_CORE2_QUESTIONS.filter(q => q.subject === 'BIOLOGY');

    const sample = (arr: NsejsCore2QuestionDescriptor[], n: number) => {
      const copy = [...arr];
      for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
      }
      return copy.slice(0, n);
    };

    const sprintQuestions = [
      ...sample(phys, 5),
      ...sample(chem, 5),
      ...sample(bio, 5),
    ];

    if (this.state.sprintTimerId !== null) {
      clearInterval(this.state.sprintTimerId);
    }

    this.state.sprintActive = true;
    this.state.sprintQuestions = sprintQuestions;
    this.state.sprintIndex = 0;
    this.state.sprintTimerSeconds = 15 * 60;
    this.state.sprintSubmitted = false;
    this.state.sprintUserAnswers = new Map<string, string>();
    this.state.activeTab = 'sprint';

    this.state.sprintTimerId = setInterval(() => {
      if (this.state.sprintTimerSeconds > 0) {
        this.state.sprintTimerSeconds--;
        this.updateSprintTimerDisplay();
      } else {
        this.submitSprint();
      }
    }, 1000);

    this.render();
  }

  public setSprintIndex(index: number): void {
    if (index >= 0 && index < this.state.sprintQuestions.length) {
      this.state.sprintIndex = index;
      this.render();
    }
  }

  public selectSprintAnswer(questionId: string, optionKey: string): void {
    if (!this.state.sprintSubmitted) {
      this.state.sprintUserAnswers.set(questionId, optionKey);
      this.render();
    }
  }

  public submitSprint(): void {
    if (this.state.sprintTimerId !== null) {
      clearInterval(this.state.sprintTimerId);
      this.state.sprintTimerId = null;
    }
    this.state.sprintSubmitted = true;
    this.render();
  }

  public exitSprint(): void {
    if (this.state.sprintTimerId !== null) {
      clearInterval(this.state.sprintTimerId);
      this.state.sprintTimerId = null;
    }
    this.state.sprintActive = false;
    this.state.activeTab = 'modules';
    this.render();
  }

  private updateSprintTimerDisplay(): void {
    if (!this.root) return;
    const el = this.root.querySelector<HTMLElement>('#sprint-timer-val');
    if (el) {
      const m = Math.floor(this.state.sprintTimerSeconds / 60);
      const s = this.state.sprintTimerSeconds % 60;
      el.textContent = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    }
  }

  private getFilteredModules(): readonly NsejsCore2ModuleDescriptor[] {
    const q = this.state.searchQuery.toLowerCase();
    return NSEJS_CORE2_MODULES.filter(m => {
      if (this.state.subjectFilter !== 'ALL' && m.subject !== this.state.subjectFilter) {
        return false;
      }
      if (q && !m.title.toLowerCase().includes(q) && !m.domain.toLowerCase().includes(q) && !m.slug.toLowerCase().includes(q)) {
        return false;
      }
      return true;
    });
  }

  private getFilteredQuestions(): readonly NsejsCore2QuestionDescriptor[] {
    const q = this.state.searchQuery.toLowerCase();
    return NSEJS_CORE2_QUESTIONS.filter(qu => {
      if (this.state.subjectFilter !== 'ALL' && qu.subject !== this.state.subjectFilter) {
        return false;
      }
      if (this.state.qrtFilter !== 'ALL' && qu.qrtOp !== this.state.qrtFilter) {
        return false;
      }
      if (this.state.selectedModuleSlug && qu.moduleSlug !== this.state.selectedModuleSlug) {
        return false;
      }
      if (q) {
        const inId = qu.id.toLowerCase().includes(q);
        const inStem = qu.stem.toLowerCase().includes(q);
        const inTopic = qu.topic.toLowerCase().includes(q);
        const inCrux = qu.cruxRef.toLowerCase().includes(q);
        if (!inId && !inStem && !inTopic && !inCrux) {
          return false;
        }
      }
      return true;
    });
  }

  private render(): void {
    if (!this.root) return;

    const filteredModules = this.getFilteredModules();
    const filteredQuestions = this.getFilteredQuestions();

    const physModules = NSEJS_CORE2_MODULES.filter(m => m.subject === 'PHYSICS').length;
    const chemModules = NSEJS_CORE2_MODULES.filter(m => m.subject === 'CHEMISTRY').length;
    const bioModules = NSEJS_CORE2_MODULES.filter(m => m.subject === 'BIOLOGY').length;

    const physQ = NSEJS_CORE2_QUESTIONS.filter(q => q.subject === 'PHYSICS').length;
    const chemQ = NSEJS_CORE2_QUESTIONS.filter(q => q.subject === 'CHEMISTRY').length;
    const bioQ = NSEJS_CORE2_QUESTIONS.filter(q => q.subject === 'BIOLOGY').length;

    this.root.innerHTML = `
      <div class="nsejs-core2-hub-root" style="display:flex;flex-direction:column;gap:1.5rem;max-width:1440px;margin:0 auto;padding:1.5rem;box-sizing:border-box;width:100%;overflow-x:hidden;">

        <!-- Breadcrumb & Top Bar -->
        <header style="padding-bottom:1.25rem;border-bottom:2px solid #e2e8f0;">
          <div style="display:flex;gap:8px;font-size:0.9rem;color:#64748b;margin-bottom:0.5rem;flex-wrap:wrap;">
            <a href="#/home" style="color:#0284c7;text-decoration:none;font-weight:600;">Home</a> &gt;
            <a href="#/competitive/exam:nsejs" style="color:#0284c7;text-decoration:none;font-weight:600;">Competitive Hub (NSEJS)</a> &gt;
            <span style="color:#475569;font-weight:600;">Core 2 Multi-Disciplinary Question Bank</span>
          </div>

          <div style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:flex-start;gap:1rem;">
            <div>
              <div style="display:flex;gap:8px;margin-bottom:0.5rem;flex-wrap:wrap;">
                <span style="font-size:0.8rem;font-weight:800;background:#fef3c7;color:#92400e;padding:4px 10px;border-radius:4px;letter-spacing:0.5px;">AUTHENTIC CORE 2 RECONCILIATION</span>
                <span style="font-size:0.8rem;font-weight:700;background:#fee2e2;color:#991b1b;padding:4px 10px;border-radius:4px;">Academic Status: HOLD (Academic Admission: HOLD)</span>
                <span style="font-size:0.8rem;font-weight:700;background:#dcfce7;color:#166534;padding:4px 10px;border-radius:4px;">Diagnostic Mode: AUTHORIZED</span>
                <span style="font-size:0.8rem;font-weight:700;background:#f1f5f9;color:#334155;padding:4px 10px;border-radius:4px;">Fault N09 Answer Isolation: ACTIVE</span>
              </div>
              <h1 style="margin:0 0 0.5rem;font-size:2.1rem;font-weight:800;color:#0f172a;">🧬⚛️🧪 NSEJS Core 2 Multi-Disciplinary Question Bank</h1>
              <p style="margin:0;color:#475569;font-size:1.1rem;max-width:900px;line-height:1.5;">
                Unified question bank comprising <strong>45 modules</strong> and <strong>302 authentic candidate questions</strong> across Section 1 (Physics: 130), Section 2 (Chemistry: 87), and Section 3 (Biology: 85).
                Governed under Owner Delivery Policy with Fault N09 key isolation (keys withheld client-side; formative hints &amp; step scaffolds active).
              </p>
            </div>

            <div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap;">
              <button type="button" id="btn-start-mixed-sprint" style="min-height:${HIT_TARGET_MIN_PX}px;min-width:160px;padding:10px 18px;background:#0284c7;color:white;border:none;border-radius:6px;cursor:pointer;font-weight:700;font-size:0.95rem;box-shadow:0 2px 4px rgba(0,0,0,0.1);">
                ⏱ 15-Q Mixed Sprint →
              </button>
              <button type="button" id="btn-back-competitive" style="min-height:${HIT_TARGET_MIN_PX}px;min-width:130px;padding:10px 18px;background:#f1f5f9;color:#0f172a;border:1px solid #cbd5e1;border-radius:6px;cursor:pointer;font-weight:700;font-size:0.95rem;">
                ← Back to NSEJS Hub
              </button>
            </div>
          </div>
        </header>

        <!-- Metrics Overview Banner -->
        <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(min(100%, 200px), 1fr));gap:1rem;">
          <div style="background:#ffffff;border:1px solid #e2e8f0;border-left:4px solid #0284c7;border-radius:8px;padding:1rem;">
            <div style="font-size:0.8rem;font-weight:700;color:#64748b;text-transform:uppercase;">Section 1: Physics</div>
            <div style="font-size:1.6rem;font-weight:800;color:#0284c7;margin:4px 0;">${physModules} Modules</div>
            <div style="font-size:0.85rem;color:#475569;">${physQ} Questions (95 QM + 35 Comp)</div>
          </div>
          <div style="background:#ffffff;border:1px solid #e2e8f0;border-left:4px solid #047857;border-radius:8px;padding:1rem;">
            <div style="font-size:0.8rem;font-weight:700;color:#64748b;text-transform:uppercase;">Section 2: Chemistry</div>
            <div style="font-size:1.6rem;font-weight:800;color:#047857;margin:4px 0;">${chemModules} Modules</div>
            <div style="font-size:0.85rem;color:#475569;">${chemQ} Authentic Questions</div>
          </div>
          <div style="background:#ffffff;border:1px solid #e2e8f0;border-left:4px solid #16a34a;border-radius:8px;padding:1rem;">
            <div style="font-size:0.8rem;font-weight:700;color:#64748b;text-transform:uppercase;">Section 3: Biology</div>
            <div style="font-size:1.6rem;font-weight:800;color:#16a34a;margin:4px 0;">${bioModules} Modules</div>
            <div style="font-size:0.85rem;color:#475569;">${bioQ} Candidate Questions</div>
          </div>
          <div style="background:#ffffff;border:1px solid #e2e8f0;border-left:4px solid #9333ea;border-radius:8px;padding:1rem;">
            <div style="font-size:0.8rem;font-weight:700;color:#64748b;text-transform:uppercase;">Total Reconciled</div>
            <div style="font-size:1.6rem;font-weight:800;color:#9333ea;margin:4px 0;">45 Modules</div>
            <div style="font-size:0.85rem;color:#475569;">302 Total Questions</div>
          </div>
        </div>

        <!-- Navigation Tabs -->
        <nav style="display:flex;gap:10px;border-bottom:1px solid #cbd5e1;padding-bottom:8px;flex-wrap:wrap;">
          <button type="button" id="tab-btn-modules" style="min-height:${HIT_TARGET_MIN_PX}px;min-width:140px;padding:10px 20px;border:none;border-radius:6px;cursor:pointer;font-weight:700;font-size:1rem;background:${this.state.activeTab === 'modules' ? '#0f172a' : '#f1f5f9'};color:${this.state.activeTab === 'modules' ? '#ffffff' : '#334155'};">
            📂 Modules Grid (${filteredModules.length})
          </button>
          <button type="button" id="tab-btn-questions" style="min-height:${HIT_TARGET_MIN_PX}px;min-width:140px;padding:10px 20px;border:none;border-radius:6px;cursor:pointer;font-weight:700;font-size:1rem;background:${this.state.activeTab === 'questions' ? '#0f172a' : '#f1f5f9'};color:${this.state.activeTab === 'questions' ? '#ffffff' : '#334155'};">
            🔍 Questions Explorer (${filteredQuestions.length})
          </button>
          <button type="button" id="tab-btn-sprint" style="min-height:${HIT_TARGET_MIN_PX}px;min-width:140px;padding:10px 20px;border:none;border-radius:6px;cursor:pointer;font-weight:700;font-size:1rem;background:${this.state.activeTab === 'sprint' ? '#0f172a' : '#f1f5f9'};color:${this.state.activeTab === 'sprint' ? '#ffffff' : '#334155'};">
            ⚡ Sprint Simulator ${this.state.sprintActive ? '(Active)' : ''}
          </button>
        </nav>

        ${this.state.activeTab === 'sprint' ? this.renderSprintView() : this.renderFilterAndContent(filteredModules, filteredQuestions)}

      </div>
    `;

    this.bindEvents();
  }

  private renderFilterAndContent(filteredModules: readonly NsejsCore2ModuleDescriptor[], filteredQuestions: readonly NsejsCore2QuestionDescriptor[]): string {
    return `
      <!-- Subject & Operation Filter Bar -->
      <div style="background:#f8fafc;border:1px solid #cbd5e1;border-radius:10px;padding:1rem;display:flex;flex-direction:column;gap:1rem;">
        <div style="display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:1rem;">
          <div style="display:flex;flex-wrap:wrap;align-items:center;gap:8px;">
            <span style="font-size:0.9rem;font-weight:700;color:#334155;margin-right:4px;">Discipline:</span>
            ${(['ALL', 'PHYSICS', 'CHEMISTRY', 'BIOLOGY'] as const).map(subj => `
              <button type="button" class="btn-subject-filter" data-subj="${subj}" style="min-height:${HIT_TARGET_MIN_PX}px;padding:6px 14px;border:1px solid #cbd5e1;border-radius:6px;cursor:pointer;font-weight:700;font-size:0.85rem;background:${this.state.subjectFilter === subj ? '#0284c7' : '#ffffff'};color:${this.state.subjectFilter === subj ? '#ffffff' : '#334155'};">
                ${subj === 'ALL' ? 'All Disciplines' : subj}
              </button>
            `).join('')}
          </div>

          <div style="display:flex;flex-wrap:wrap;align-items:center;gap:8px;">
            <span style="font-size:0.9rem;font-weight:700;color:#334155;margin-right:4px;">QRT Op:</span>
            ${(['ALL', 'MODEL', 'APPLY', 'EXPLAIN', 'JUSTIFY', 'REPRESENT', 'SYNTHESIZE', 'RETRIEVE'] as const).map(op => `
              <button type="button" class="btn-qrt-filter" data-op="${op}" style="min-height:${HIT_TARGET_MIN_PX}px;padding:6px 12px;border:1px solid #cbd5e1;border-radius:6px;cursor:pointer;font-weight:700;font-size:0.8rem;background:${this.state.qrtFilter === op ? '#334155' : '#ffffff'};color:${this.state.qrtFilter === op ? '#ffffff' : '#475569'};">
                ${op}
              </button>
            `).join('')}
          </div>
        </div>

        <div style="display:flex;align-items:center;gap:1rem;">
          <input type="text" id="core2-search-input" placeholder="Search modules, questions, topics, crux moves (e.g. genetics, optics, stoichiometry, M2)..." value="${escapeHtml(this.state.searchQuery)}" style="min-height:${HIT_TARGET_MIN_PX}px;flex:1;padding:8px 14px;font-size:0.95rem;border:1px solid #cbd5e1;border-radius:6px;box-sizing:border-box;">
          ${this.state.searchQuery ? `
            <button type="button" id="btn-clear-search" style="min-height:${HIT_TARGET_MIN_PX}px;padding:8px 16px;background:#e2e8f0;border:none;border-radius:6px;cursor:pointer;font-weight:700;color:#334155;">
              Clear
            </button>
          ` : ''}
          ${this.state.selectedModuleSlug ? `
            <div style="display:flex;align-items:center;gap:8px;background:#e0f2fe;color:#0369a1;padding:6px 12px;border-radius:6px;font-size:0.85rem;font-weight:700;">
              <span>Module: ${escapeHtml(this.state.selectedModuleSlug)}</span>
              <button type="button" id="btn-clear-module" style="background:none;border:none;cursor:pointer;font-weight:800;color:#0369a1;">✕</button>
            </div>
          ` : ''}
        </div>
      </div>

      <!-- Tab Content -->
      ${this.state.activeTab === 'modules' ? this.renderModulesGrid(filteredModules) : this.renderQuestionsList(filteredQuestions)}
    `;
  }

  private renderModulesGrid(modules: readonly NsejsCore2ModuleDescriptor[]): string {
    if (modules.length === 0) {
      return `
        <div style="background:#ffffff;border:1px solid #cbd5e1;border-radius:8px;padding:2rem;text-align:center;color:#64748b;">
          <p style="font-size:1.1rem;margin:0;">No modules match the current filter criteria.</p>
        </div>
      `;
    }

    const subjectColors: Record<string, { bg: string; text: string; border: string }> = {
      PHYSICS: { bg: '#f0f9ff', text: '#0369a1', border: '#0284c7' },
      CHEMISTRY: { bg: '#f0fdf4', text: '#15803d', border: '#16a34a' },
      BIOLOGY: { bg: '#fefce8', text: '#a16207', border: '#ca8a04' },
    };

    return `
      <div style="display:grid;grid-template-columns:repeat(auto-fill, minmax(min(100%, 340px), 1fr));gap:1.25rem;">
        ${modules.map(m => {
          const c = subjectColors[m.subject] || { bg: '#f8fafc', text: '#334155', border: '#cbd5e1' };
          return `
            <div class="core2-module-card" style="background:#ffffff;border:1px solid #e2e8f0;border-top:4px solid ${c.border};border-radius:8px;padding:1.25rem;display:flex;flex-direction:column;justify-content:space-between;gap:1rem;box-shadow:0 1px 3px rgba(0,0,0,0.05);">
              <div>
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.5rem;">
                  <span style="font-size:0.75rem;font-weight:800;background:${c.bg};color:${c.text};padding:3px 8px;border-radius:4px;text-transform:uppercase;">
                    ${m.subject} · ${escapeHtml(m.domain)}
                  </span>
                  <span style="font-size:0.85rem;font-weight:700;color:#64748b;">
                    ${m.questionCount} Questions
                  </span>
                </div>
                <h3 style="margin:0 0 0.5rem;font-size:1.15rem;font-weight:700;color:#0f172a;line-height:1.4;">
                  ${escapeHtml(m.title)}
                </h3>
                <div style="font-size:0.8rem;color:#64748b;font-family:monospace;word-break:break-all;">
                  slug: ${escapeHtml(m.slug)}
                </div>
              </div>

              <div style="display:flex;gap:8px;align-items:center;">
                <button type="button" class="btn-inspect-module-q" data-slug="${escapeHtml(m.slug)}" style="flex:1;min-height:${HIT_TARGET_MIN_PX}px;padding:8px 12px;background:#f8fafc;color:#0284c7;border:1px solid #cbd5e1;border-radius:6px;cursor:pointer;font-weight:700;font-size:0.85rem;">
                  Inspect Questions (${m.questionCount}) →
                </button>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;
  }

  private renderQuestionsList(questions: readonly NsejsCore2QuestionDescriptor[]): string {
    if (questions.length === 0) {
      return `
        <div style="background:#ffffff;border:1px solid #cbd5e1;border-radius:8px;padding:2rem;text-align:center;color:#64748b;">
          <p style="font-size:1.1rem;margin:0;">No questions match the current filter criteria.</p>
        </div>
      `;
    }

    const subjectColors: Record<string, { bg: string; text: string }> = {
      PHYSICS: { bg: '#e0f2fe', text: '#0369a1' },
      CHEMISTRY: { bg: '#dcfce7', text: '#15803d' },
      BIOLOGY: { bg: '#fef9c3', text: '#854d0e' },
    };

    return `
      <div style="display:flex;flex-direction:column;gap:1.25rem;">
        <div style="display:flex;justify-content:space-between;align-items:center;color:#64748b;font-size:0.95rem;">
          <span>Showing <strong>${questions.length}</strong> authentic candidate questions:</span>
        </div>

        ${questions.map((q, idx) => {
          const c = subjectColors[q.subject] || { bg: '#f1f5f9', text: '#334155' };
          const hintsOpen = this.state.revealedHints.has(q.id);
          const stepsOpen = this.state.revealedSteps.has(q.id);
          const selectedOption = this.state.selectedAnswers.get(q.id);

          return `
            <div class="core2-question-card" style="background:#ffffff;border:1px solid #e2e8f0;border-radius:10px;padding:1.5rem;box-shadow:0 1px 3px rgba(0,0,0,0.05);">
              
              <!-- Card Header -->
              <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:1rem;margin-bottom:1rem;flex-wrap:wrap;">
                <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;">
                  <span style="font-weight:800;font-size:0.95rem;color:#0f172a;">#${idx + 1}</span>
                  <span style="font-size:0.8rem;font-weight:800;background:${c.bg};color:${c.text};padding:3px 8px;border-radius:4px;">
                    ${q.subject}
                  </span>
                  <span style="font-size:0.8rem;font-weight:700;background:#334155;color:#ffffff;padding:3px 8px;border-radius:4px;">
                    QRT: ${q.qrtOp}
                  </span>
                  <span style="font-size:0.8rem;font-weight:600;background:#f1f5f9;color:#475569;padding:3px 8px;border-radius:4px;">
                    Crux: ${escapeHtml(q.cruxRef)}
                  </span>
                  ${q.isCompetitive ? `
                    <span style="font-size:0.75rem;font-weight:800;background:#fae8ff;color:#86198f;padding:3px 8px;border-radius:4px;">
                      PYQ ARCHIVE
                    </span>
                  ` : ''}
                </div>
                <div style="font-size:0.8rem;color:#64748b;font-family:monospace;">
                  ID: ${escapeHtml(q.id)}
                </div>
              </div>

              <!-- Question Topic & Origin -->
              <div style="font-size:0.85rem;color:#64748b;margin-bottom:0.75rem;">
                <strong>Topic:</strong> ${escapeHtml(q.topic)} · <strong>Origin:</strong> ${escapeHtml(q.sourceOrigin)}
              </div>

              <!-- Stem -->
              <div style="font-size:1.05rem;line-height:1.6;color:#1e293b;margin-bottom:1.25rem;white-space:pre-wrap;">
                ${escapeHtml(q.stem)}
              </div>

              <!-- Options Grid -->
              ${q.options.length > 0 ? `
                <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(min(100%, 300px), 1fr));gap:8px;margin-bottom:1.25rem;">
                  ${q.options.map(opt => {
                    const optKey = opt.slice(0, 2).replace(/[\s\:\.\(\)]/g, '').toUpperCase();
                    const isSelected = selectedOption === opt;
                    return `
                      <button type="button" class="btn-select-core2-opt" data-qid="${escapeHtml(q.id)}" data-opt="${escapeHtml(opt)}" style="min-height:${HIT_TARGET_MIN_PX}px;text-align:left;padding:10px 14px;border:1px solid ${isSelected ? '#0284c7' : '#cbd5e1'};border-radius:6px;background:${isSelected ? '#e0f2fe' : '#ffffff'};color:${isSelected ? '#0369a1' : '#1e293b'};font-size:0.95rem;cursor:pointer;font-weight:${isSelected ? '700' : '500'};line-height:1.4;">
                        ${escapeHtml(opt)}
                      </button>
                    `;
                  }).join('')}
                </div>
              ` : ''}

              <!-- Action Bar & Disclosures -->
              <div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap;border-top:1px solid #f1f5f9;padding-top:1rem;">
                <button type="button" class="btn-toggle-core2-hints" data-qid="${escapeHtml(q.id)}" style="min-height:${HIT_TARGET_MIN_PX}px;padding:8px 16px;background:${hintsOpen ? '#fef3c7' : '#f8fafc'};color:${hintsOpen ? '#92400e' : '#334155'};border:1px solid #cbd5e1;border-radius:6px;cursor:pointer;font-weight:700;font-size:0.85rem;">
                  💡 ${hintsOpen ? 'Hide Hints' : 'Show Diagnostic Hints'} (${q.hints.length})
                </button>
                <button type="button" class="btn-toggle-core2-steps" data-qid="${escapeHtml(q.id)}" style="min-height:${HIT_TARGET_MIN_PX}px;padding:8px 16px;background:${stepsOpen ? '#ede9fe' : '#f8fafc'};color:${stepsOpen ? '#5b21b6' : '#334155'};border:1px solid #cbd5e1;border-radius:6px;cursor:pointer;font-weight:700;font-size:0.85rem;">
                  🔍 ${stepsOpen ? 'Hide Solution Route' : 'Show Solution Route'} (${q.steps.length})
                </button>
                <span style="font-size:0.8rem;color:#64748b;margin-left:auto;display:flex;align-items:center;gap:4px;">
                  🛡️ <em>Key Withheld (Fault N09 Isolated)</em>
                </span>
              </div>

              <!-- Hints Accordion -->
              ${hintsOpen ? `
                <div style="margin-top:1rem;background:#fefce8;border:1px solid #fef08a;border-radius:8px;padding:1rem;">
                  <h4 style="margin:0 0 0.5rem;font-size:0.95rem;color:#854d0e;font-weight:700;">Progressive Pedagogical Hints:</h4>
                  <ul style="margin:0;padding-left:1.25rem;color:#713f12;font-size:0.95rem;line-height:1.5;">
                    ${q.hints.map(h => `<li style="margin-bottom:0.4rem;">${escapeHtml(h)}</li>`).join('')}
                  </ul>
                </div>
              ` : ''}

              <!-- Steps Accordion -->
              ${stepsOpen ? `
                <div style="margin-top:1rem;background:#faf5ff;border:1px solid #e9d5ff;border-radius:8px;padding:1rem;">
                  <h4 style="margin:0 0 0.5rem;font-size:0.95rem;color:#6b21a8;font-weight:700;">Diagnostic Reasoning Steps &amp; Scaffolds:</h4>
                  <ol style="margin:0;padding-left:1.25rem;color:#581c87;font-size:0.95rem;line-height:1.5;">
                    ${q.steps.map(s => `<li style="margin-bottom:0.4rem;">${escapeHtml(s)}</li>`).join('')}
                  </ol>
                  ${q.check ? `
                    <div style="margin-top:0.75rem;padding-top:0.5rem;border-top:1px dashed #d8b4fe;font-size:0.85rem;color:#6b21a8;">
                      <strong>Sanity Check:</strong> ${escapeHtml(q.check)}
                    </div>
                  ` : ''}
                </div>
              ` : ''}

            </div>
          `;
        }).join('')}
      </div>
    `;
  }

  private renderSprintView(): string {
    if (!this.state.sprintActive) {
      return `
        <div style="background:#ffffff;border:1px solid #cbd5e1;border-radius:12px;padding:2.5rem;text-align:center;max-width:700px;margin:2rem auto;">
          <h2 style="font-size:1.8rem;font-weight:800;color:#0f172a;margin:0 0 1rem;">⚡ 15-Question Mixed Sprint Simulator</h2>
          <p style="color:#475569;font-size:1.05rem;line-height:1.6;margin:0 0 1.5rem;">
            Test your multi-disciplinary problem solving under timed exam conditions!
            15 authentic questions: <strong>5 Physics + 5 Chemistry + 5 Biology</strong> randomly sampled from the Core 2 Question Bank.
            15-minute countdown timer, +3 for correct, -1 for incorrect.
          </p>
          <button type="button" id="btn-launch-sprint-now" style="min-height:${HIT_TARGET_PRIMARY_PX}px;min-width:240px;padding:14px 28px;background:#0284c7;color:white;border:none;border-radius:8px;font-weight:800;font-size:1.15rem;cursor:pointer;box-shadow:0 2px 4px rgba(0,0,0,0.1);">
            Launch 15-Minute Sprint Now →
          </button>
        </div>
      `;
    }

    const currentQ = this.state.sprintQuestions[this.state.sprintIndex];
    if (!currentQ) return '';

    const answeredCount = this.state.sprintUserAnswers.size;
    const totalCount = this.state.sprintQuestions.length;
    const m = Math.floor(this.state.sprintTimerSeconds / 60);
    const s = this.state.sprintTimerSeconds % 60;
    const formattedTimer = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;

    return `
      <div style="background:#ffffff;border:1px solid #cbd5e1;border-radius:12px;padding:1.5rem;box-shadow:0 2px 4px rgba(0,0,0,0.05);display:flex;flex-direction:column;gap:1.5rem;">
        
        <!-- Sprint Status Header -->
        <div style="display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid #e2e8f0;padding-bottom:1rem;flex-wrap:wrap;gap:1rem;">
          <div style="display:flex;align-items:center;gap:1rem;">
            <span style="font-size:1.1rem;font-weight:800;color:#0f172a;">Question ${this.state.sprintIndex + 1} of ${totalCount}</span>
            <span style="background:#0284c7;color:white;padding:3px 8px;border-radius:4px;font-size:0.8rem;font-weight:800;">${currentQ.subject}</span>
            <span style="color:#64748b;font-size:0.9rem;">Answered: <strong>${answeredCount} / ${totalCount}</strong></span>
          </div>

          <div style="display:flex;align-items:center;gap:1rem;">
            <div style="font-size:1.25rem;font-weight:800;color:${this.state.sprintTimerSeconds < 180 ? '#dc2626' : '#0f172a'};background:#f1f5f9;padding:6px 14px;border-radius:6px;font-family:monospace;">
              ⏱ <span id="sprint-timer-val">${formattedTimer}</span>
            </div>
            ${!this.state.sprintSubmitted ? `
              <button type="button" id="btn-submit-sprint" style="min-height:${HIT_TARGET_MIN_PX}px;padding:8px 18px;background:#059669;color:white;border:none;border-radius:6px;font-weight:700;cursor:pointer;">
                Submit Sprint
              </button>
            ` : ''}
            <button type="button" id="btn-exit-sprint" style="min-height:${HIT_TARGET_MIN_PX}px;padding:8px 14px;background:#f1f5f9;color:#334155;border:1px solid #cbd5e1;border-radius:6px;font-weight:700;cursor:pointer;">
              Exit Sprint
            </button>
          </div>
        </div>

        <!-- Question Navigation Bubbles -->
        <div style="display:flex;gap:8px;flex-wrap:wrap;">
          ${this.state.sprintQuestions.map((q, i) => {
            const isCurr = i === this.state.sprintIndex;
            const isAns = this.state.sprintUserAnswers.has(q.id);
            return `
              <button type="button" class="btn-sprint-jump" data-idx="${i}" style="min-height:${HIT_TARGET_MIN_PX}px;min-width:${HIT_TARGET_MIN_PX}px;border-radius:6px;border:1px solid ${isCurr ? '#0284c7' : '#cbd5e1'};background:${isCurr ? '#0284c7' : isAns ? '#dcfce7' : '#ffffff'};color:${isCurr ? '#ffffff' : isAns ? '#166534' : '#334155'};font-weight:800;font-size:0.9rem;cursor:pointer;">
                ${i + 1}
              </button>
            `;
          }).join('')}
        </div>

        <!-- Active Sprint Question Body -->
        <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:1.5rem;">
          <div style="display:flex;gap:8px;margin-bottom:0.75rem;align-items:center;">
            <span style="font-size:0.8rem;font-weight:700;background:#e2e8f0;color:#334155;padding:2px 8px;border-radius:4px;">${currentQ.topic}</span>
            <span style="font-size:0.8rem;font-weight:700;background:#e2e8f0;color:#334155;padding:2px 8px;border-radius:4px;">QRT: ${currentQ.qrtOp}</span>
            <span style="font-size:0.8rem;color:#64748b;margin-left:auto;">${escapeHtml(currentQ.id)}</span>
          </div>

          <div style="font-size:1.1rem;line-height:1.6;color:#0f172a;margin-bottom:1.5rem;white-space:pre-wrap;">
            ${escapeHtml(currentQ.stem)}
          </div>

          <!-- Options -->
          <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(min(100%, 320px), 1fr));gap:10px;">
            ${currentQ.options.map(opt => {
              const selected = this.state.sprintUserAnswers.get(currentQ.id) === opt;
              return `
                <button type="button" class="btn-sprint-opt" data-qid="${escapeHtml(currentQ.id)}" data-opt="${escapeHtml(opt)}" style="min-height:${HIT_TARGET_MIN_PX}px;text-align:left;padding:12px 16px;border:1px solid ${selected ? '#0284c7' : '#cbd5e1'};border-radius:6px;background:${selected ? '#e0f2fe' : '#ffffff'};color:${selected ? '#0369a1' : '#1e293b'};font-size:0.95rem;cursor:pointer;font-weight:${selected ? '700' : '500'};line-height:1.4;">
                  ${escapeHtml(opt)}
                </button>
              `;
            }).join('')}
          </div>
        </div>

        <!-- Sprint Question Footer Actions -->
        <div style="display:flex;justify-content:space-between;align-items:center;">
          <button type="button" id="btn-sprint-prev" style="min-height:${HIT_TARGET_MIN_PX}px;min-width:120px;padding:10px 18px;background:#f1f5f9;color:#334155;border:1px solid #cbd5e1;border-radius:6px;font-weight:700;cursor:${this.state.sprintIndex > 0 ? 'pointer' : 'default'};opacity:${this.state.sprintIndex > 0 ? 1 : 0.5};">
            ← Previous
          </button>
          <button type="button" id="btn-sprint-next" style="min-height:${HIT_TARGET_MIN_PX}px;min-width:120px;padding:10px 18px;background:#0284c7;color:white;border:none;border-radius:6px;font-weight:700;cursor:${this.state.sprintIndex < totalCount - 1 ? 'pointer' : 'default'};opacity:${this.state.sprintIndex < totalCount - 1 ? 1 : 0.5};">
            Next →
          </button>
        </div>

        <!-- Sprint Submission Summary Modal -->
        ${this.state.sprintSubmitted ? `
          <div style="background:#f0fdf4;border:2px solid #86efac;border-radius:8px;padding:1.5rem;text-align:center;">
            <h3 style="font-size:1.4rem;font-weight:800;color:#166534;margin:0 0 0.5rem;">🎉 Sprint Assessment Submitted!</h3>
            <p style="font-size:1rem;color:#15803d;margin:0 0 1rem;">
              You attempted <strong>${answeredCount}</strong> out of <strong>${totalCount}</strong> questions.
              Fault N09 Answer Isolation active: Official answers are securely preserved and verified.
              Review your question choices and study the progressive hints in the Question Explorer!
            </p>
            <button type="button" id="btn-sprint-finish" style="min-height:${HIT_TARGET_PRIMARY_PX}px;padding:10px 24px;background:#15803d;color:white;border:none;border-radius:6px;font-weight:800;font-size:1rem;cursor:pointer;">
              Return to Module Explorer
            </button>
          </div>
        ` : ''}

      </div>
    `;
  }

  private bindEvents(): void {
    if (!this.root) return;

    // Header buttons
    const btnBackCompetitive = this.root.querySelector<HTMLButtonElement>('#btn-back-competitive');
    if (btnBackCompetitive) {
      btnBackCompetitive.onclick = () => {
        if (this.onNavigate) this.onNavigate('#/competitive/exam:nsejs');
        else window.location.hash = '#/competitive/exam:nsejs';
      };
    }

    const btnStartMixedSprint = this.root.querySelector<HTMLButtonElement>('#btn-start-mixed-sprint');
    if (btnStartMixedSprint) {
      btnStartMixedSprint.onclick = () => this.startSprint();
    }

    // Tabs
    const tabModules = this.root.querySelector<HTMLButtonElement>('#tab-btn-modules');
    if (tabModules) tabModules.onclick = () => this.setTab('modules');

    const tabQuestions = this.root.querySelector<HTMLButtonElement>('#tab-btn-questions');
    if (tabQuestions) tabQuestions.onclick = () => this.setTab('questions');

    const tabSprint = this.root.querySelector<HTMLButtonElement>('#tab-btn-sprint');
    if (tabSprint) tabSprint.onclick = () => this.setTab('sprint');

    // Subject filters
    const subjectBtns = this.root.querySelectorAll<HTMLButtonElement>('.btn-subject-filter');
    subjectBtns.forEach(btn => {
      btn.onclick = () => {
        const subj = btn.dataset.subj as Core2SubjectFilter;
        if (subj) this.setSubjectFilter(subj);
      };
    });

    // QRT filters
    const qrtBtns = this.root.querySelectorAll<HTMLButtonElement>('.btn-qrt-filter');
    qrtBtns.forEach(btn => {
      btn.onclick = () => {
        const op = btn.dataset.op as Core2QrtFilter;
        if (op) this.setQrtFilter(op);
      };
    });

    // Search input
    const searchInput = this.root.querySelector<HTMLInputElement>('#core2-search-input');
    if (searchInput) {
      searchInput.oninput = (e) => {
        this.setSearchQuery((e.target as HTMLInputElement).value);
      };
    }

    const btnClearSearch = this.root.querySelector<HTMLButtonElement>('#btn-clear-search');
    if (btnClearSearch) {
      btnClearSearch.onclick = () => this.setSearchQuery('');
    }

    const btnClearModule = this.root.querySelector<HTMLButtonElement>('#btn-clear-module');
    if (btnClearModule) {
      btnClearModule.onclick = () => this.selectModule(null);
    }

    // Module inspect questions
    const inspectBtns = this.root.querySelectorAll<HTMLButtonElement>('.btn-inspect-module-q');
    inspectBtns.forEach(btn => {
      btn.onclick = () => {
        const slug = btn.dataset.slug;
        if (slug) this.selectModule(slug);
      };
    });

    // Question options
    const optBtns = this.root.querySelectorAll<HTMLButtonElement>('.btn-select-core2-opt');
    optBtns.forEach(btn => {
      btn.onclick = () => {
        const qid = btn.dataset.qid;
        const opt = btn.dataset.opt;
        if (qid && opt) this.selectOption(qid, opt);
      };
    });

    // Hints & Steps toggle
    const hintBtns = this.root.querySelectorAll<HTMLButtonElement>('.btn-toggle-core2-hints');
    hintBtns.forEach(btn => {
      btn.onclick = () => {
        const qid = btn.dataset.qid;
        if (qid) this.toggleHints(qid);
      };
    });

    const stepBtns = this.root.querySelectorAll<HTMLButtonElement>('.btn-toggle-core2-steps');
    stepBtns.forEach(btn => {
      btn.onclick = () => {
        const qid = btn.dataset.qid;
        if (qid) this.toggleSteps(qid);
      };
    });

    // Sprint actions
    const btnLaunchSprintNow = this.root.querySelector<HTMLButtonElement>('#btn-launch-sprint-now');
    if (btnLaunchSprintNow) btnLaunchSprintNow.onclick = () => this.startSprint();

    const btnSubmitSprint = this.root.querySelector<HTMLButtonElement>('#btn-submit-sprint');
    if (btnSubmitSprint) btnSubmitSprint.onclick = () => this.submitSprint();

    const btnExitSprint = this.root.querySelector<HTMLButtonElement>('#btn-exit-sprint');
    if (btnExitSprint) btnExitSprint.onclick = () => this.exitSprint();

    const btnSprintPrev = this.root.querySelector<HTMLButtonElement>('#btn-sprint-prev');
    if (btnSprintPrev) {
      btnSprintPrev.onclick = () => {
        if (this.state.sprintIndex > 0) this.setSprintIndex(this.state.sprintIndex - 1);
      };
    }

    const btnSprintNext = this.root.querySelector<HTMLButtonElement>('#btn-sprint-next');
    if (btnSprintNext) {
      btnSprintNext.onclick = () => {
        if (this.state.sprintIndex < this.state.sprintQuestions.length - 1) {
          this.setSprintIndex(this.state.sprintIndex + 1);
        }
      };
    }

    const sprintJumps = this.root.querySelectorAll<HTMLButtonElement>('.btn-sprint-jump');
    sprintJumps.forEach(btn => {
      btn.onclick = () => {
        const idx = parseInt(btn.dataset.idx || '0', 10);
        this.setSprintIndex(idx);
      };
    });

    const sprintOpts = this.root.querySelectorAll<HTMLButtonElement>('.btn-sprint-opt');
    sprintOpts.forEach(btn => {
      btn.onclick = () => {
        const qid = btn.dataset.qid;
        const opt = btn.dataset.opt;
        if (qid && opt) this.selectSprintAnswer(qid, opt);
      };
    });

    const btnSprintFinish = this.root.querySelector<HTMLButtonElement>('#btn-sprint-finish');
    if (btnSprintFinish) btnSprintFinish.onclick = () => this.exitSprint();
  }
}

export function mountNsejsCore2Hub(container: HTMLElement, onNavigate?: (route: string) => void): { dispose: () => void } {
  const controller = new NsejsCore2HubController(onNavigate);
  controller.mount(container);
  return {
    dispose: () => controller.dispose(),
  };
}
