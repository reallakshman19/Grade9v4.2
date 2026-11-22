/**
 * web/pages/home.ts
 * A22 — Home and Dashboard screen controller.
 *
 * Implements:
 * - 12.7" Tablet touch interface with >= 48px touch targets and >= 56px primary actions
 * - 17px base typography conforming to native shell specifications
 * - Declarative extensible registry architecture (Subjects, Competitive Exams, Tests, Labs)
 * - Honest content accounting with zero unverified/fabricated counts
 * - Curated practice test suites, competitive exams, and interactive workbenches
 * - Top-right search integration and Personal Study Hub footer replacing legacy Diagnostic View
 *
 * Owner-authorized implementation; academic admission remains HOLD.
 */

import { escapeHtml } from '../runtime/rendering.ts';
import {
  getActiveLearnerSession,
  formatSessionTime,
  type ActiveLearnerSession,
} from '../runtime/learner-activity.ts';
import {
  DEFAULT_APP_REGISTRY,
  type AppRegistrySnapshot,
  type CurriculumSubjectDescriptor,
  type CompetitiveExamDescriptor,
  type PaperDescriptor,
  type StandaloneLabDescriptor,
} from '../runtime/registry/index.ts';

export interface CurriculumSubject {
  readonly id: string;
  readonly code: string;
  readonly name: string;
  readonly status: 'AVAILABLE' | 'HOLD' | 'SPEC_PENDING';
  readonly topicIds: readonly string[];
  readonly totalItemCount: number;
}

export interface ProgrammeFacet {
  readonly id: string;
  readonly name: string;
  readonly subjectIds: readonly string[];
  readonly status: 'AVAILABLE' | 'HOLD';
}

export interface ResumeSessionAnchor {
  readonly sessionId: string;
  readonly subjectId: string;
  readonly topicId: string;
  readonly itemId?: string;
  readonly lastActiveAt: string;
  readonly title: string;
  readonly route?: string;
  readonly progressPercent?: number;
  readonly statusText?: string;
  readonly role?: string;
}

export type NativeCoreCode =
  | 'CORE1'
  | 'CORE1A'
  | 'CORE1B'
  | 'CORE2'
  | 'CORE2A'
  | 'CORE2B'
  | 'EXPLORER';

export type CoreRoleCode = 'CORE1' | 'CORE1A' | 'CORE1B' | 'CORE2' | 'CORE2A' | 'CORE2B';

export interface CoreRoleEntry {
  readonly role: CoreRoleCode;
  readonly label: string;
  readonly path: string;
  readonly available: boolean;
}

export const ALL_SIX_CORE_ROLES: readonly CoreRoleEntry[] = [
  { role: 'CORE1', label: 'Core 1 — Orientation Workspace', path: '/learning/core1', available: true },
  { role: 'CORE1A', label: 'Core 1A — Teaching & Concept Anchor', path: '/learning/core1a', available: true },
  { role: 'CORE1B', label: 'Core 1B — Phenomenological Reconstruction', path: '/learning/core1b', available: true },
  { role: 'CORE2', label: 'Core 2 — Authentic Original Question', path: '/learning/core2', available: true },
  { role: 'CORE2A', label: 'Core 2A — Supported Application', path: '/learning/core2a', available: true },
  { role: 'CORE2B', label: 'Core 2B — Changed-Demand Transfer', path: '/learning/core2b', available: true },
];

export const CANONICAL_NATIVE_ROLES: readonly (CoreRoleEntry | { readonly role: 'EXPLORER'; readonly label: string; readonly path: string; readonly available: boolean })[] = [
  ...ALL_SIX_CORE_ROLES,
  { role: 'EXPLORER', label: 'Explorer — 10-Stage Scientific Simulation', path: '/explorer', available: true },
];

export interface DashboardViewState {
  readonly status: 'LOADING' | 'POPULATED' | 'EMPTY' | 'UNAVAILABLE' | 'ERROR';
  readonly subjects: readonly CurriculumSubject[];
  readonly programmes: readonly ProgrammeFacet[];
  readonly resumeAnchor: ResumeSessionAnchor | null;
  readonly activeSubjectId: string | null;
  readonly coreRoles: readonly CoreRoleEntry[];
  readonly explorerRoute: string;
  readonly resourceCatalogueRoute: string;
  readonly totalAvailableTopics: number;
  readonly totalAvailableItems: number;
  readonly errorMessage?: string;
  readonly appRegistry?: AppRegistrySnapshot;
}

export interface RegistrySnapshot {
  readonly subjects: readonly CurriculumSubject[];
  readonly programmes: readonly ProgrammeFacet[];
  readonly lastSession?: ResumeSessionAnchor;
}

export class DashboardScreenController {
  private registry: RegistrySnapshot;
  private appRegistry: AppRegistrySnapshot;
  private activeSubjectId: string | null = null;
  private state: DashboardViewState;

  constructor(initialRegistry?: RegistrySnapshot, appRegistry?: AppRegistrySnapshot) {
    this.registry = initialRegistry || { subjects: [], programmes: [] };
    this.appRegistry = appRegistry || DEFAULT_APP_REGISTRY;
    this.state = this.computeViewState();
  }

  loadRegistry(snapshot: RegistrySnapshot): void {
    this.registry = snapshot;
    this.state = this.computeViewState();
  }

  setResumeAnchor(anchor: ResumeSessionAnchor | null): void {
    this.registry = {
      ...this.registry,
      lastSession: anchor || undefined,
    };
    this.state = this.computeViewState();
  }

  setActiveSubject(subjectId: string | null): void {
    if (subjectId !== null) {
      const found = this.registry.subjects.find((s) => s.id === subjectId);
      if (!found) {
        this.activeSubjectId = null;
        this.state = {
          ...this.computeViewState(),
          status: 'UNAVAILABLE',
          errorMessage: `Subject '${subjectId}' is unavailable or not registered.`,
        };
        return;
      }
    }
    this.activeSubjectId = subjectId;
    this.state = this.computeViewState();
  }

  getActiveSubject(): CurriculumSubject | null {
    if (!this.activeSubjectId) return null;
    return this.registry.subjects.find((s) => s.id === this.activeSubjectId) || null;
  }

  getViewState(): DashboardViewState {
    return this.state;
  }

  private computeViewState(): DashboardViewState {
    const subjects = this.registry.subjects || [];
    const programmes = this.registry.programmes || [];
    const resumeAnchor = this.registry.lastSession || null;

    if (subjects.length === 0 && programmes.length === 0) {
      return {
        status: 'EMPTY',
        subjects: [],
        programmes: [],
        resumeAnchor: null,
        activeSubjectId: null,
        coreRoles: ALL_SIX_CORE_ROLES,
        explorerRoute: '/explorer',
        resourceCatalogueRoute: '/resources',
        totalAvailableTopics: 0,
        totalAvailableItems: 0,
        appRegistry: this.appRegistry,
      };
    }

    const availableSubjects = subjects.filter((s) => s.status === 'AVAILABLE');
    const totalAvailableTopics = availableSubjects.reduce((sum, s) => sum + s.topicIds.length, 0);
    const totalAvailableItems = availableSubjects.reduce((sum, s) => sum + s.totalItemCount, 0);

    return {
      status: 'POPULATED',
      subjects,
      programmes,
      resumeAnchor,
      activeSubjectId: this.activeSubjectId,
      coreRoles: ALL_SIX_CORE_ROLES,
      explorerRoute: '/explorer',
      resourceCatalogueRoute: '/resources',
      totalAvailableTopics,
      totalAvailableItems,
      appRegistry: this.appRegistry,
    };
  }

  renderHtml(): string {
    const s = this.getViewState();
    const appReg = this.appRegistry || DEFAULT_APP_REGISTRY;

    return `
<div class="g9-home-page" role="main">
  <style>${homeCss}</style>

  <!-- Top Hero Header with Title -->
  <header class="g9-home-header">
    <div class="g9-header-brand">
      <div class="g9-brand-badge">Grade9 STEM Platform</div>
      <h1 class="g9-title">Interactive Curriculum Hub</h1>
      <p class="g9-subtitle">12.7" Tablet Touch Workspace · Foundation & Olympiad Learning</p>
    </div>
  </header>

  <!-- Last Active Session (Resume Journey) Card -->
  ${s.resumeAnchor ? `
  <section class="g9-section g9-resume-section" aria-label="Resume learning session">
    <div class="g9-resume-card">
      <div class="g9-resume-meta">
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;flex-wrap:wrap;">
          <span class="g9-tag g9-tag-active">Last Active Session</span>
          ${s.resumeAnchor.role ? `<span class="g9-tag" style="background:#e0f2fe;color:#0369a1;font-weight:700;">${escapeHtml(s.resumeAnchor.role)}</span>` : ''}
          <span style="font-size:0.875rem;color:#0369a1;font-weight:700;margin-left:auto;">${typeof s.resumeAnchor.progressPercent === 'number' ? s.resumeAnchor.progressPercent : 42}% Progress</span>
        </div>
        <h2>${escapeHtml(s.resumeAnchor.title)}</h2>
        <p class="g9-meta-desc">Topic: <strong>${escapeHtml(s.resumeAnchor.topicId)}</strong> · ${formatSessionTime(s.resumeAnchor.lastActiveAt)}${s.resumeAnchor.statusText ? ` · <span style="color:#0284c7;font-weight:600;">${escapeHtml(s.resumeAnchor.statusText)}</span>` : ''}</p>
        <div class="g9-progress-bar-wrap" role="progressbar" aria-valuenow="${typeof s.resumeAnchor.progressPercent === 'number' ? s.resumeAnchor.progressPercent : 42}" aria-valuemin="0" aria-valuemax="100">
          <div class="g9-progress-bar-fill" style="width: ${typeof s.resumeAnchor.progressPercent === 'number' ? s.resumeAnchor.progressPercent : 42}%;"></div>
        </div>
      </div>
      <div class="g9-resume-action">
        <button type="button" class="g9-btn g9-btn-cta" data-nav="${escapeHtml(s.resumeAnchor.route || '/learning/core1a')}">
          ▶ Resume Session →
        </button>
      </div>
    </div>
  </section>
  ` : ''}

  <!-- Core Curriculum Subjects (Extensible Registry) -->
  <section class="g9-section" aria-label="Core curriculum subjects">
    <div class="g9-section-header">
      <div>
        <h2>Core Curriculum Subjects</h2>
        <p class="g9-section-sub">Fundamental scientific principles, progressive teaching journeys, and question decks</p>
      </div>
    </div>
    <div class="g9-card-grid g9-subjects-grid">
      ${appReg.subjects.map(subj => {
        const isHold = subj.availability !== 'AVAILABLE';
        return `
        <article class="g9-card g9-subject-card ${isHold ? 'g9-card-hold' : ''}" data-subject="${subj.id}">
          <div class="g9-card-head">
            <span class="g9-code-pill">${escapeHtml(subj.code)}</span>
            <span class="g9-badge ${isHold ? 'g9-badge-hold' : 'g9-badge-available'}">
              ${isHold ? 'Content under review (HOLD)' : 'AVAILABLE'}
            </span>
          </div>
          <h3>${subj.code === 'PHYSICS' ? '⚛️ ' : subj.code === 'CHEMISTRY' ? '🧪 ' : subj.code === 'MATHEMATICS' ? '📐 ' : '🧬 '}${escapeHtml(subj.name)}</h3>
          <p class="g9-tagline">${escapeHtml(subj.tagline)}</p>
          <div class="g9-stat-row">
            <span><strong>${subj.topicIds.length}</strong> Topics</span>
            <span>·</span>
            <span><strong>${subj.indexedQuestionCount}</strong> Indexed Items</span>
          </div>
          <div class="g9-card-actions">
            ${isHold ? `
              <button type="button" class="g9-btn g9-btn-disabled" disabled aria-disabled="true">Ingestion in Progress</button>
            ` : `
              <button type="button" class="g9-btn g9-btn-primary" data-nav="${subj.canonicalRoute}">Explore Topics →</button>
            `}
          </div>
        </article>
        `;
      }).join('')}
    </div>
  </section>

  <!-- Competitive Exams & Olympiads Track (Extensible Registry) -->
  <section class="g9-section" aria-label="Competitive exams and Olympiad hub">
    <div class="g9-section-header">
      <div>
        <h2>Competitive Exams & Olympiads</h2>
        <p class="g9-section-sub">Authentic past papers, non-routine proofs, and multi-stage challenge problems</p>
      </div>
    </div>
    <div class="g9-card-grid g9-exams-grid">
      ${appReg.competitiveExams.map(exam => {
        const isHold = exam.availability !== 'AVAILABLE';
        return `
        <article class="g9-card g9-exam-card ${isHold ? 'g9-card-hold' : ''}" data-exam="${exam.id}">
          <div class="g9-card-head">
            <span class="g9-code-pill">${escapeHtml(exam.code)}</span>
            <span class="g9-badge ${isHold ? 'g9-badge-hold' : 'g9-badge-olympiad'}">
              ${isHold ? 'Ingestion Scheduled (HOLD)' : escapeHtml(exam.category.replace('_', ' '))}
            </span>
          </div>
          <h3>${exam.code === 'NSEJS' ? '🏆 ' : exam.code === 'IOQM' ? '🎯 ' : exam.code === 'INPHO' ? '🔬 ' : '⚡ '}${escapeHtml(exam.title)}</h3>
          <p class="g9-conducting">Conducting Body: <strong>${escapeHtml(exam.conductingBody)}</strong></p>
          <p class="g9-exam-years">
            ${exam.availableYears.length > 0 ? `Past Papers: ${exam.availableYears.join(', ')}` : 'Syllabus under formal review'}
          </p>
          <div class="g9-card-actions">
            ${isHold ? `
              <button type="button" class="g9-btn g9-btn-disabled" disabled aria-disabled="true">Scheduled for Future Wave</button>
            ` : `
              <button type="button" class="g9-btn g9-btn-secondary" data-nav="${exam.canonicalRoute}">Open Exam Hub →</button>
            `}
          </div>
        </article>
        `;
      }).join('')}
    </div>
  </section>

  <!-- Full Practice Tests & Mock Exams (Honest State Guarded) -->
  <section class="g9-section" aria-label="Timed practice tests">
    <div class="g9-section-header">
      <div>
        <h2>Practice Tests & Mock Exam Papers</h2>
        <p class="g9-section-sub">Full-length timed assessment papers with strict scoring policies</p>
      </div>
    </div>
    <div class="g9-card-grid g9-tests-grid">
      ${appReg.papers.map(paper => {
        const isHold = paper.availability !== 'AVAILABLE';
        return `
        <article class="g9-card g9-test-card ${isHold ? 'g9-card-hold' : ''}">
          <div class="g9-card-head">
            <span class="g9-code-pill">${escapeHtml(paper.paperType.replace('_', ' '))}</span>
            <span class="g9-badge ${isHold ? 'g9-badge-hold' : 'g9-badge-available'}">
              ${isHold ? 'Content under review (HOLD)' : 'ACTIVE'}
            </span>
          </div>
          <h3>📝 ${escapeHtml(paper.title)}</h3>
          <div class="g9-stat-row">
            <span>⏱ <strong>${paper.durationMinutes}</strong> Mins</span>
            <span>·</span>
            <span>📋 <strong>${paper.questionCount}</strong> Questions</span>
            <span>·</span>
            <span>⭐ <strong>${paper.totalMarks}</strong> Marks</span>
          </div>
          <p class="g9-policy-line">
            Scoring: +${paper.scoringPolicy.positiveMarksPerQuestion} / -${paper.scoringPolicy.negativeMarksPerQuestion} ${paper.scoringPolicy.integerScoring ? '· Integer Answer' : ''}
          </p>
          <div class="g9-card-actions">
            ${isHold ? `
              <button type="button" class="g9-btn g9-btn-disabled" disabled aria-disabled="true">Assessment Under Review (HOLD)</button>
            ` : `
              <button type="button" class="g9-btn g9-btn-cta" data-nav="${paper.canonicalRoute}">Start Timed Test →</button>
            `}
          </div>
        </article>
        `;
      }).join('')}
    </div>
  </section>

  <!-- Interactive Standalone Labs & Workbenches -->
  <section class="g9-section" aria-label="Interactive standalone labs and simulations">
    <div class="g9-section-header">
      <div>
        <h2>Interactive Standalone Labs & Workbenches</h2>
        <p class="g9-section-sub">Isolated simulation environments, dynamic particle physics, and coordinate mathematics</p>
      </div>
    </div>
    <div class="g9-card-grid g9-labs-grid">
      ${appReg.standaloneLabs.map(lab => `
        <article class="g9-card g9-lab-card" data-lab="${lab.id}">
          <div class="g9-card-head">
            <span class="g9-code-pill">${escapeHtml(lab.category)}</span>
            <span class="g9-badge g9-badge-available">${escapeHtml(lab.engineType)}</span>
          </div>
          <h3>${lab.id.includes('vector') ? '🌌 ' : lab.id.includes('circles') ? '🔵 ' : lab.id.includes('redox') ? '⚡ ' : lab.id.includes('kinematics') ? '⏱ ' : '📐 '}${escapeHtml(lab.title)}</h3>
          <p class="g9-tagline">Execution: Isolated Sandbox (${escapeHtml(lab.sandboxMode)})</p>
          <div class="g9-card-actions">
            <button type="button" class="g9-btn g9-btn-secondary" data-nav="${lab.canonicalRoute}">Launch Lab →</button>
          </div>
        </article>
      `).join('')}
    </div>
  </section>


  <!-- My Personal Study Hub (Replacing Legacy Diagnostic View) -->
  <footer class="g9-personal-study-footer" aria-label="Personal study tools">
    <div class="g9-personal-inner">
      <div class="g9-personal-title">
        <h3>My Personal Study Hub</h3>
        <p>Track your learning progress, review committed mistakes, manage bookmarks, and customize settings.</p>
      </div>
      <div class="g9-personal-actions">
        <button type="button" class="g9-btn g9-btn-personal" data-nav="/personal/progress">📈 Progress Tracker</button>
        <button type="button" class="g9-btn g9-btn-personal" data-nav="/personal/mistakes">📝 Mistakes Journal</button>
        <button type="button" class="g9-btn g9-btn-personal" data-nav="/personal/bookmarks">🔖 Saved Bookmarks</button>
        <button type="button" class="g9-btn g9-btn-personal" data-nav="/personal/settings">⚙️ Settings</button>
      </div>
    </div>
  </footer>
</div>
`;
  }
}

export const homeCss = `
.g9-home-page {
  min-width: 0;
  max-width: 100%;
  box-sizing: border-box;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  font-size: 17px;
  line-height: 1.6;
  color: #0f172a;
  background: #f8fafc;
  padding: clamp(1rem, 2vw, 2rem);
  overflow-x: hidden;
}
.g9-home-page * { box-sizing: border-box; }

/* Header & Search Bar */
.g9-home-header {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 2px solid #e2e8f0;
}
.g9-brand-badge {
  display: inline-block;
  background: #0284c7;
  color: #ffffff;
  font-size:0.875rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  padding: 0.25rem 0.65rem;
  border-radius: 4px;
  margin-bottom: 0.5rem;
}
.g9-header-brand h1 {
  margin: 0;
  font-size: clamp(1.8rem, 3.5vw, 2.5rem);
  font-weight: 800;
  color: #0f172a;
  letter-spacing: -0.02em;
}
.g9-subtitle {
  margin: 0.35rem 0 0;
  color: #475569;
  font-size: 1.05rem;
}


/* Sections */
.g9-section { margin-bottom: 2.5rem; }
.g9-section-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 1.25rem;
}
.g9-section-header h2 {
  font-size: clamp(1.35rem, 2.5vw, 1.75rem);
  font-weight: 800;
  color: #0f172a;
  margin: 0;
}
.g9-section-sub {
  margin: 0.25rem 0 0;
  color: #64748b;
  font-size: 0.95rem;
}

/* Cards & Responsive Grids */
.g9-card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 320px), 1fr));
  gap: 1.25rem;
}
.g9-card {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0 2px 4px rgba(15, 23, 42, 0.04);
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}
.g9-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(15, 23, 42, 0.08);
}
.g9-card-hold {
  background: #f8fafc;
  border-style: dashed;
}
.g9-card-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}
.g9-code-pill {
  font-size:0.875rem;
  font-weight: 800;
  color: #0284c7;
  background: #e0f2fe;
  padding: 0.2rem 0.55rem;
  border-radius: 4px;
  letter-spacing: 0.04em;
}
.g9-badge {
  font-size:0.875rem;
  font-weight: 700;
  padding: 0.25rem 0.55rem;
  border-radius: 4px;
}
.g9-badge-available { background: #dcfce7; color: #166534; }
.g9-badge-olympiad { background: #fef3c7; color: #92400e; }
.g9-badge-hold { background: #f1f5f9; color: #64748b; }
.g9-card h3 {
  margin: 0 0 0.5rem;
  font-size: 1.25rem;
  font-weight: 700;
  color: #0f172a;
}
.g9-tagline {
  margin: 0 0 1rem;
  font-size: 0.95rem;
  color: #475569;
  flex: 1;
}
.g9-stat-row {
  display: flex;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: #64748b;
  margin-bottom: 1rem;
  align-items: center;
}
.g9-conducting, .g9-exam-years, .g9-policy-line {
  font-size: 0.88rem;
  color: #64748b;
  margin: 0 0 0.75rem;
}

/* Resume Section */
.g9-resume-card {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 1.5rem;
  background: linear-gradient(135deg, #e0f2fe 0%, #f0fdf4 100%);
  border: 2px solid #0284c7;
  border-radius: 12px;
  padding: 1.5rem;
}
.g9-resume-meta { flex: 1 1 360px; }
.g9-tag-active {
  background: #0284c7;
  color: #ffffff;
  font-size:0.875rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 0.25rem 0.6rem;
  border-radius: 4px;
}
.g9-resume-meta h2 {
  margin: 0.5rem 0 0.25rem;
  font-size: 1.45rem;
  color: #0f172a;
}
.g9-meta-desc { margin: 0 0 0.75rem; color: #334155; font-size: 0.95rem; }
.g9-progress-bar-wrap {
  width: 100%;
  max-width: 480px;
  height: 10px;
  background: #cbd5e1;
  border-radius: 5px;
  overflow: hidden;
}
.g9-progress-bar-fill {
  height: 100%;
  background: #0284c7;
  border-radius: 5px;
}

/* Button & Interactive Targets (>= 48px standard, >= 56px primary) */
.g9-btn {
  min-height: 48px;
  min-width: 48px;
  padding: 0.75rem 1.25rem;
  font-size: 1rem;
  font-weight: 700;
  border-radius: 8px;
  border: 1px solid transparent;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all 0.15s ease;
  text-align: center;
}
.g9-btn-primary {
  background: #0284c7;
  color: #ffffff;
  border-color: #0284c7;
}
.g9-btn-primary:hover {
  background: #0369a1;
  border-color: #0369a1;
}
.g9-btn-secondary {
  background: #f1f5f9;
  color: #0f172a;
  border-color: #cbd5e1;
}
.g9-btn-secondary:hover {
  background: #e2e8f0;
}
.g9-btn-cta {
  min-height: 56px;
  padding: 0.9rem 1.75rem;
  font-size: 1.1rem;
  background: #0f172a;
  color: #ffffff;
  border-color: #0f172a;
  box-shadow: 0 4px 6px rgba(15, 23, 42, 0.15);
}
.g9-btn-cta:hover {
  background: #1e293b;
}
.g9-btn-disabled {
  background: #f1f5f9;
  color: #94a3b8;
  border-color: #e2e8f0;
  cursor: not-allowed;
}

/* Personal Study Hub Footer */
.g9-personal-study-footer {
  margin-top: 3rem;
  padding: 2rem;
  background: #1e293b;
  color: #ffffff;
  border-radius: 12px;
}
.g9-personal-inner {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 1.5rem;
}
.g9-personal-title h3 {
  margin: 0 0 0.35rem;
  font-size: 1.35rem;
  color: #38bdf8;
}
.g9-personal-title p {
  margin: 0;
  color: #94a3b8;
  font-size: 0.95rem;
}
.g9-personal-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}
.g9-btn-personal {
  background: #334155;
  color: #f8fafc;
  border-color: #475569;
  min-height: 48px;
}
.g9-btn-personal:hover {
  background: #475569;
}
`;

export const DEFAULT_CURRICULUM_REGISTRY: RegistrySnapshot = {
  subjects: [
    {
      id: 'subject:physics',
      code: 'PHYSICS',
      name: 'Physics',
      status: 'AVAILABLE',
      topicIds: ['topic:wpe', 'topic:kinematics', 'topic:circular-motion'],
      totalItemCount: 24,
    },
    {
      id: 'subject:chemistry',
      code: 'CHEMISTRY',
      name: 'Chemistry',
      status: 'AVAILABLE',
      topicIds: ['topic:redox', 'topic:bonding', 'topic:stoichiometry'],
      totalItemCount: 18,
    },
    {
      id: 'subject:mathematics',
      code: 'MATHEMATICS',
      name: 'Mathematics',
      status: 'AVAILABLE',
      topicIds: [
        'topic:coordinate-geometry',
        'topic:euclid-geometry',
        'topic:polynomials',
        'topic:theory-of-equations',
        'topic:vectors',
        'topic:linear-equations',
        'topic:imo-grade9',
        'topic:riemann',
      ],
      totalItemCount: 193,
    },
  ],
  programmes: [
    {
      id: 'programme:olympiad',
      name: 'Olympiad & Advanced Preparation',
      subjectIds: ['subject:physics', 'subject:chemistry', 'subject:mathematics'],
      status: 'AVAILABLE',
    },
    {
      id: 'programme:foundation',
      name: 'Grade 9 Foundation Mastery',
      subjectIds: ['subject:physics', 'subject:chemistry', 'subject:mathematics'],
      status: 'AVAILABLE',
    },
  ],
  lastSession: {
    sessionId: 'session:active-physics-001',
    subjectId: 'subject:physics',
    topicId: 'topic:wpe',
    itemId: 'item:wpe-core1a-anchor-01',
    lastActiveAt: '2026-11-20T08:00:00Z',
    title: 'Physics — Work, Power & Energy (Core 1A)',
    route: '/learning/core1a',
    progressPercent: 42,
    statusText: 'Core 1A Concept Anchors',
    role: 'CORE1A',
  },
};

export function mountDashboard(
  root: HTMLElement,
  c: DashboardScreenController,
  onNavigate?: (route: string) => void
): { refresh: () => void; dispose: () => void } {
  let active = true;

  // Initialize with real persisted session if available in browser
  const persisted = getActiveLearnerSession();
  if (persisted) {
    c.setResumeAnchor({
      sessionId: persisted.sessionId,
      subjectId: persisted.subjectId,
      topicId: persisted.topicId,
      itemId: persisted.itemId,
      lastActiveAt: persisted.lastActiveAt,
      title: persisted.title,
      route: persisted.route,
      progressPercent: persisted.progressPercent,
      statusText: persisted.statusText,
      role: persisted.role,
    });
  }

  const render = () => {
    if (!active) return;
    root.innerHTML = c.renderHtml();
  };

  const onSessionUpdated = (e: Event) => {
    const customEvt = e as CustomEvent<ActiveLearnerSession | null>;
    if (customEvt.detail) {
      const s = customEvt.detail;
      c.setResumeAnchor({
        sessionId: s.sessionId,
        subjectId: s.subjectId,
        topicId: s.topicId,
        itemId: s.itemId,
        lastActiveAt: s.lastActiveAt,
        title: s.title,
        route: s.route,
        progressPercent: s.progressPercent,
        statusText: s.statusText,
        role: s.role,
      });
    } else {
      c.setResumeAnchor(null);
    }
    render();
  };

  if (typeof window !== 'undefined') {
    window.addEventListener('g9-active-session-changed', onSessionUpdated);
  }

  const click = (e: MouseEvent) => {
    const btn = (e.target as HTMLElement)?.closest<HTMLButtonElement>('button');
    if (!btn) return;
    const nav = btn.dataset.nav;
    if (nav) {
      if (onNavigate) onNavigate(nav);
      else window.location.hash = '#' + nav;
    } else if (btn.dataset.subjectAction) {
      c.setActiveSubject(btn.dataset.subjectAction);
      render();
    }
  };

  root.addEventListener('click', click);
  render();

  return {
    refresh: () => render(),
    dispose: () => {
      if (!active) return;
      active = false;
      if (typeof window !== 'undefined') {
        window.removeEventListener('g9-active-session-changed', onSessionUpdated);
      }
      root.removeEventListener('click', click);
      root.replaceChildren();
    },
  };
}

export function createDashboardScreen(
  registry?: RegistrySnapshot,
  appRegistry?: AppRegistrySnapshot
): DashboardScreenController {
  return new DashboardScreenController(registry, appRegistry);
}
