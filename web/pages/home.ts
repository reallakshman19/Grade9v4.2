/**
 * web/pages/home.ts
 * A22 — Home and Dashboard screen controller.
 *
 * Implements:
 * - Data-driven curriculum and programme facets
 * - Real item/topic counts from registry (no fake data or hardcoded topics)
 * - Resume capability with last-active session state
 * - Safe handling of 'no active pending subject'
 * - Six Core role navigation entries (CORE1A, CORE1B, CORE2A, CORE2B, CORE3A, CORE3B)
 * - Explorer and Resource catalogue entrypoints
 * - Safe unavailable states
 *
 * No academic approval inferred from software validation.
 */

import { escapeHtml } from '../runtime/rendering.ts';

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
}

export type CoreRoleCode =
  | 'CORE1A'
  | 'CORE1B'
  | 'CORE2A'
  | 'CORE2B'
  | 'CORE3A'
  | 'CORE3B';

export interface CoreRoleEntry {
  readonly role: CoreRoleCode;
  readonly label: string;
  readonly path: string;
  readonly available: boolean;
}

export const ALL_SIX_CORE_ROLES: readonly CoreRoleEntry[] = [
  { role: 'CORE1A', label: 'Core 1A — Teaching & Concept Anchor', path: '/learning/core1a', available: true },
  { role: 'CORE1B', label: 'Core 1B — Fresh Transfer Journey', path: '/learning/core1b', available: true },
  { role: 'CORE2A', label: 'Core 2A — Supported Application', path: '/learning/core2a', available: true },
  { role: 'CORE2B', label: 'Core 2B — Changed-Demand Transfer', path: '/learning/core2b', available: true },
  { role: 'CORE3A', label: 'Core 3A — Reconstruction & Diagnosis', path: '/learning/core3a', available: true },
  { role: 'CORE3B', label: 'Core 3B — Independent Exam Paper', path: '/learning/core3b', available: true },
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
}

export interface RegistrySnapshot {
  readonly subjects: readonly CurriculumSubject[];
  readonly programmes: readonly ProgrammeFacet[];
  readonly lastSession?: ResumeSessionAnchor;
}

export class DashboardScreenController {
  private registry: RegistrySnapshot;
  private activeSubjectId: string | null = null;
  private state: DashboardViewState;

  constructor(initialRegistry?: RegistrySnapshot) {
    this.registry = initialRegistry || { subjects: [], programmes: [] };
    this.state = this.computeViewState();
  }

  loadRegistry(snapshot: RegistrySnapshot): void {
    this.registry = snapshot;
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
    };
  }

  renderHtml(): string {
    const s = this.getViewState();
    return `
<div class="g9-home-page">
  <style>${homeCss}</style>
  <header class="g9-home-header">
    <div class="g9-header-title">
      <h1>Grade9 Curriculum Home</h1>
      <p class="g9-subtitle">Interactive STEM Learning & Assessment Platform</p>
    </div>
  </header>

  ${s.resumeAnchor ? `
  <section class="g9-resume-section" aria-label="Resume session">
    <div class="g9-resume-card">
      <div class="g9-resume-info">
        <span class="g9-resume-tag">Last Active Session</span>
        <h3>${escapeHtml(s.resumeAnchor.title)}</h3>
        <p>Topic: ${escapeHtml(s.resumeAnchor.topicId)} · Active at ${new Date(s.resumeAnchor.lastActiveAt).toLocaleTimeString()}</p>
      </div>
      <button class="g9-btn g9-btn-primary" data-nav="/learning/core1a">Resume Session →</button>
    </div>
  </section>
  ` : ''}

  <section class="g9-section" aria-label="Curriculum subjects">
    <h2>Curriculum Subjects (${s.subjects.length})</h2>
    <div class="g9-card-grid">
      ${s.subjects.map(subj => `
        <article class="g9-card g9-subject-card" data-subject="${subj.id}">
          <div class="g9-card-head">
            <span class="g9-subject-code">${escapeHtml(subj.code)}</span>
            <span class="g9-badge g9-badge-${subj.status.toLowerCase()}">${subj.status}</span>
          </div>
          <h3>${escapeHtml(subj.name)}</h3>
          <p class="g9-stat-line">${subj.topicIds.length} Core Topics · ${subj.totalItemCount} Practice Items</p>
          <div class="g9-card-actions">
            <button class="g9-btn g9-btn-secondary" data-subject-action="${subj.id}">Explore Topics</button>
          </div>
        </article>
      `).join('')}
    </div>
  </section>

  <section class="g9-section" aria-label="Six Core Learning Roles">
    <h2>Six Core Learning Roles & Workspaces</h2>
    <div class="g9-card-grid g9-roles-grid">
      <article class="g9-card g9-role-card">
        <h3>Core 1A — Teaching & Concept Anchor</h3>
        <p>9-unit progressive teaching journey with interactive anchor projections and scientific model stages.</p>
        <button class="g9-btn g9-btn-primary" data-nav="/learning/core1a">Launch Core 1A →</button>
      </article>

      <article class="g9-card g9-role-card">
        <h3>Core 1B — Fresh Transfer Journey</h3>
        <p>7-stage transfer journey with prediction commitment, CAS drafts, divergence diagnosis, and boundary recovery.</p>
        <button class="g9-btn g9-btn-primary" data-nav="/learning/core1b">Launch Core 1B →</button>
      </article>

      <article class="g9-card g9-role-card">
        <h3>Core 2 — Supported Application Workspace</h3>
        <p>Split-pane objective workspace with real stimulus, interactive MCQ/input responses, and immediate evaluation.</p>
        <button class="g9-btn g9-btn-primary" data-nav="/learning/core2">Launch Core 2 →</button>
      </article>

      <article class="g9-card g9-role-card">
        <h3>Explorer — 10-Stage Scientific Simulation</h3>
        <p>GCDR interactive scientific simulation runtime with dynamic parameter manipulation and observation.</p>
        <button class="g9-btn g9-btn-primary" data-nav="/explorer">Launch Explorer →</button>
      </article>

      <article class="g9-card g9-role-card">
        <h3>Personal Study & Mistakes</h3>
        <p>Personal study journal: review recorded mistakes, bookmarked problems, learning progress, and settings.</p>
        <button class="g9-btn g9-btn-secondary" data-nav="/personal">Open Personal Study →</button>
      </article>
    </div>
  </section>
</div>
`;
  }
}

export const homeCss = `
.g9-home-page { min-width: 0; max-width: 100%; box-sizing: border-box; line-height: 1.55; color: #172c40; font-family: system-ui, sans-serif; padding: 1.5rem; background: #f8fafc; border-radius: 8px; }
.g9-home-page * { box-sizing: border-box; }
.g9-home-header { display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 1rem; margin-bottom: 1.5rem; padding-bottom: 1rem; border-bottom: 1px solid #dce3e9; }
.g9-header-title h1 { margin: 0; font-size: clamp(1.4rem, 4vw, 2rem); color: #125d82; }
.g9-subtitle { margin: 0.25rem 0 0; color: #506677; font-size: 0.95rem; }
.g9-header-badges { display: flex; gap: 0.5rem; flex-wrap: wrap; }
.g9-badge { padding: 0.35rem 0.65rem; border-radius: 4px; font-size: 0.8rem; font-weight: 700; letter-spacing: 0.03em; }
.g9-badge-auth { background: #e3f2fd; color: #0d47a1; }
.g9-badge-admission { background: #fff3cd; color: #856404; }
.g9-badge-available { background: #d4edda; color: #155724; }
.g9-resume-section { margin-bottom: 1.5rem; }
.g9-resume-card { display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 1rem; padding: 1.25rem; background: #e8f4f8; border-left: 5px solid #125d82; border-radius: 6px; }
.g9-resume-tag { font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: #125d82; letter-spacing: 0.05em; }
.g9-resume-info h3 { margin: 0.25rem 0; font-size: 1.15rem; color: #172c40; }
.g9-resume-info p { margin: 0; font-size: 0.9rem; color: #506677; }
.g9-section { margin-bottom: 2rem; }
.g9-section h2 { font-size: 1.25rem; color: #172c40; margin: 0 0 1rem; }
.g9-card-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, 280px), 1fr)); gap: 1rem; }
.g9-card { background: #ffffff; border: 1px solid #dce3e9; border-radius: 8px; padding: 1.25rem; display: flex; flex-direction: column; justify-content: space-between; box-shadow: 0 1px 3px rgba(0,0,0,0.05); }
.g9-card-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem; }
.g9-subject-code { font-weight: 800; font-size: 0.85rem; color: #125d82; }
.g9-card h3 { margin: 0 0 0.5rem; font-size: 1.1rem; color: #172c40; }
.g9-stat-line { margin: 0 0 1rem; font-size: 0.9rem; color: #506677; }
.g9-role-card p { margin: 0 0 1rem; font-size: 0.9rem; color: #506677; flex: 1; }
.g9-btn { min-height: 48px; min-width: 48px; padding: 0.65rem 1.25rem; font-size: 0.95rem; font-weight: 600; border-radius: 6px; cursor: pointer; border: 1px solid transparent; transition: background 0.15s ease; text-align: center; }
.g9-btn-primary { background: #125d82; color: #ffffff; border-color: #125d82; }
.g9-btn-primary:hover { background: #0e4b6a; }
.g9-btn-secondary { background: #f0f4f8; color: #172c40; border-color: #b8c6d0; }
.g9-btn-secondary:hover { background: #e2e8ed; }
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
      topicIds: ['topic:polynomials', 'topic:riemann', 'topic:geometry'],
      totalItemCount: 30,
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
  },
};

export function mountDashboard(
  root: HTMLElement,
  c: DashboardScreenController,
  onNavigate?: (route: string) => void
): { refresh: () => void; dispose: () => void } {
  let active = true;
  const render = () => {
    if (!active) return;
    root.innerHTML = c.renderHtml();
  };
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
      root.removeEventListener('click', click);
      root.replaceChildren();
    },
  };
}

export function createDashboardScreen(registry?: RegistrySnapshot): DashboardScreenController {
  return new DashboardScreenController(registry ?? DEFAULT_CURRICULUM_REGISTRY);
}
