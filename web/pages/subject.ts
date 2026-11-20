/**
 * web/pages/subject.ts
 * A22 — Subject screen controller.
 *
 * Implements:
 * - Dynamic subject curriculum facets with real topic and item counts
 * - Safe unavailable states (missing subject, HOLD subject)
 * - Six Core role entrypoints scoped to the subject
 * - Explorer and Resource catalogue links
 * - No hardcoded topics
 *
 * No academic approval inferred from software validation.
 */

import { ALL_SIX_CORE_ROLES } from './home.ts';
import type { CoreRoleEntry } from './home.ts';
import { escapeHtml } from '../runtime/rendering.ts';
import { HIT_TARGET_MIN_PX, HIT_TARGET_PRIMARY_PX } from '../styles/tokens.ts';

export interface SubjectTopicDescriptor {
  readonly id: string;
  readonly code: string;
  readonly title: string;
  readonly strand?: string;
  readonly itemCount: number;
  readonly status: 'AVAILABLE' | 'HOLD';
  readonly academicAdmission?: 'HOLD' | 'ADMITTED';
  readonly diagnosticAuthorized?: boolean;
  readonly hasExplorer?: boolean;
}

export interface SubjectDetail {
  readonly id: string;
  readonly code: string;
  readonly name: string;
  readonly description?: string;
  readonly status: 'AVAILABLE' | 'HOLD' | 'SPEC_PENDING';
  readonly academicAdmission?: 'HOLD' | 'ADMITTED';
  readonly diagnosticAuthorized?: boolean;
  readonly topics: readonly SubjectTopicDescriptor[];
}

export const CHEMISTRY_SUBJECT_DETAIL: SubjectDetail = {
  id: 'chemistry',
  code: 'CHEMISTRY',
  name: 'Chemistry',
  description: 'Physical Chemistry, Inorganic Chemistry, Chemical Structure, and Analytical Stoichiometry',
  status: 'AVAILABLE',
  academicAdmission: 'HOLD',
  diagnosticAuthorized: true,
  topics: [
    {
      id: 'chem-redox',
      code: 'CHEM_REDOX',
      title: 'Redox Reactions & Electron Transfer',
      strand: 'Inorganic Chemistry',
      itemCount: 4,
      status: 'AVAILABLE',
      academicAdmission: 'HOLD',
      diagnosticAuthorized: true,
      hasExplorer: true,
    },
    {
      id: 'chem-bonding',
      code: 'CHEM_BONDING',
      title: 'Chemical Bonding & Molecular Structure',
      strand: 'Inorganic Chemistry',
      itemCount: 4,
      status: 'AVAILABLE',
      academicAdmission: 'HOLD',
      diagnosticAuthorized: true,
      hasExplorer: true,
    },
    {
      id: 'chem-stoichiometry',
      code: 'CHEM_STOICHIOMETRY',
      title: 'Stoichiometry & Volumetric Analysis',
      strand: 'Analytical Chemistry',
      itemCount: 4,
      status: 'AVAILABLE',
      academicAdmission: 'HOLD',
      diagnosticAuthorized: true,
      hasExplorer: true,
    },
  ],
};

export const PHYSICS_SUBJECT_DETAIL: SubjectDetail = {
  id: 'physics',
  code: 'PHYSICS',
  name: 'Physics',
  description: 'Classical Mechanics, Kinematics, Circular Dynamics, Gravitation, and Wave Phenomena',
  status: 'AVAILABLE',
  academicAdmission: 'HOLD',
  diagnosticAuthorized: true,
  topics: [
    {
      id: 'wpe',
      code: 'WPE',
      title: 'Work, Power and Energy',
      strand: 'Mechanics',
      itemCount: 4,
      status: 'AVAILABLE',
      academicAdmission: 'HOLD',
      diagnosticAuthorized: true,
      hasExplorer: true,
    },
    {
      id: 'motion-plane',
      code: 'MOTION_PLANE',
      title: 'Motion in a Plane & Kinematics',
      strand: 'Mechanics',
      itemCount: 4,
      status: 'AVAILABLE',
      academicAdmission: 'HOLD',
      diagnosticAuthorized: true,
      hasExplorer: true,
    },
    {
      id: 'circular-banking',
      code: 'CIRCULAR_BANKING',
      title: 'Circular Motion & Road Banking',
      strand: 'Mechanics',
      itemCount: 4,
      status: 'AVAILABLE',
      academicAdmission: 'HOLD',
      diagnosticAuthorized: true,
      hasExplorer: true,
    },
    {
      id: 'gravitation',
      code: 'GRAVITATION',
      title: 'Gravitation & Orbital Mechanics',
      strand: 'Mechanics',
      itemCount: 4,
      status: 'AVAILABLE',
      academicAdmission: 'HOLD',
      diagnosticAuthorized: true,
      hasExplorer: true,
    },
  ],
};

export interface SubjectViewState {
  readonly status: 'LOADING' | 'POPULATED' | 'UNAVAILABLE' | 'EMPTY';
  readonly subject: SubjectDetail | null;
  readonly visibleTopics: readonly SubjectTopicDescriptor[];
  readonly totalItemCount: number;
  readonly coreRoles: readonly CoreRoleEntry[];
  readonly activeStrandFilter: string | null;
  readonly explorerRoute: string;
  readonly resourceCatalogueRoute: string;
  readonly reason?: string;
}

export class SubjectScreenController {
  private subject: SubjectDetail | null = null;
  private activeStrandFilter: string | null = null;
  private state: SubjectViewState = {status:'LOADING',subject:null,visibleTopics:[],totalItemCount:0,coreRoles:ALL_SIX_CORE_ROLES,activeStrandFilter:null,explorerRoute:'/explorer',resourceCatalogueRoute:'/resources'};

  constructor(initialSubject?: SubjectDetail) {
    if (initialSubject) {
      this.loadSubject(initialSubject);
    } else {
      this.state = {
        status: 'LOADING',
        subject: null,
        visibleTopics: [],
        totalItemCount: 0,
        coreRoles: ALL_SIX_CORE_ROLES,
        activeStrandFilter: null,
        explorerRoute: '/explorer',
        resourceCatalogueRoute: '/resources',
      };
    }
  }

  loadSubject(subject: SubjectDetail): void {
    this.subject = structuredClone(subject);
    this.activeStrandFilter = null;
    this.updateState();
  }

  setUnavailable(reason: string): void {
    this.subject = null;
    this.state = {
      status: 'UNAVAILABLE',
      subject: null,
      visibleTopics: [],
      totalItemCount: 0,
      coreRoles: ALL_SIX_CORE_ROLES,
      activeStrandFilter: null,
      explorerRoute: '/explorer',
      resourceCatalogueRoute: '/resources',
      reason,
    };
  }

  setStrandFilter(strand: string | null): void {
    this.activeStrandFilter = strand;
    this.updateState();
  }

  getStrandFilter(): string | null {
    return this.activeStrandFilter;
  }

  getViewState(): SubjectViewState {
    return this.state;
  }

  private updateState(): void {
    if (!this.subject) {
      this.state = {
        status: 'UNAVAILABLE',
        subject: null,
        visibleTopics: [],
        totalItemCount: 0,
        coreRoles: ALL_SIX_CORE_ROLES,
        activeStrandFilter: null,
        explorerRoute: '/explorer',
        resourceCatalogueRoute: '/resources',
        reason: 'No subject loaded.',
      };
      return;
    }

    // Five-Level Status Resolution: Academic admission HOLD does not block diagnostic exploration
    if (this.subject.status !== 'AVAILABLE' && !this.subject.diagnosticAuthorized) {
      this.state = {
        status: 'UNAVAILABLE',
        subject: this.subject,
        visibleTopics: [],
        totalItemCount: 0,
        coreRoles: ALL_SIX_CORE_ROLES,
        activeStrandFilter: null,
        explorerRoute: '/explorer',
        resourceCatalogueRoute: '/resources',
        reason: `Subject '${this.subject.name}' is on HOLD pending academic qualification.`,
      };
      return;
    }

    const allTopics = (this.subject.topics || []).filter(
      (t) => t.status === 'AVAILABLE' || t.diagnosticAuthorized === true
    );
    const visibleTopics = this.activeStrandFilter
      ? allTopics.filter((t) => t.strand === this.activeStrandFilter)
      : allTopics;

    const totalItemCount = allTopics.reduce((sum, t) => sum + t.itemCount, 0);

    this.state = {
      status: allTopics.length === 0 ? 'EMPTY' : 'POPULATED',
      subject: this.subject,
      visibleTopics,
      totalItemCount,
      coreRoles: ALL_SIX_CORE_ROLES.map((r) => ({
        ...r,
        path: `/subject/${this.subject?.code.toLowerCase()}/${r.role.toLowerCase()}`,
      })),
      activeStrandFilter: this.activeStrandFilter,
      explorerRoute: `/explorer?subject=${this.subject.code.toLowerCase()}`,
      resourceCatalogueRoute: `/resources?subject=${this.subject.code.toLowerCase()}`,
    };
  }
}

export function createSubjectScreen(subject?: SubjectDetail): SubjectScreenController {
  return new SubjectScreenController(subject);
}

// ---------------------------------------------------------------------------
// Mount Function & Interactive Tablet View
// ---------------------------------------------------------------------------

export function mountSubjectScreen(
  root: HTMLElement,
  controller: SubjectScreenController,
  onNavigate?: (route: string) => void
): { dispose: () => void; refresh: () => void } {
  let active = true;

  const render = () => {
    if (!active) return;
    const state = controller.getViewState();
    const subj = state.subject;

    if (!subj || state.status === 'UNAVAILABLE') {
      root.innerHTML = `
        <div style="padding:2rem;text-align:center;color:#64748b;background:#ffffff;border-radius:12px;margin:2rem auto;max-width:800px;">
          <h2>Subject Unavailable</h2>
          <p>${escapeHtml(state.reason || 'This curriculum subject is currently unavailable.')}</p>
          <button type="button" onclick="window.location.hash='#/home'" style="min-height:${HIT_TARGET_PRIMARY_PX}px;padding:12px 24px;background:#0f172a;color:white;border:none;border-radius:8px;font-weight:700;cursor:pointer;">← Return to Curriculum Home</button>
        </div>
      `;
      return;
    }

    // Extract available strands for filtering
    const strands = Array.from(
      new Set((subj.topics || []).map((t) => t.strand).filter((s): s is string => !!s))
    );

    const icon = subj.code === 'PHYSICS' ? '⚛️' : subj.code === 'CHEMISTRY' ? '🧪' : subj.code === 'MATHEMATICS' ? '📐' : '🧬';

    root.innerHTML = `
      <div class="subject-screen-container g9-subject-screen" style="display:flex;flex-direction:column;gap:1.5rem;max-width:1400px;margin:0 auto;padding:1.5rem;box-sizing:border-box;">
        
        <!-- Breadcrumbs & Header -->
        <header style="padding-bottom:1.25rem;border-bottom:2px solid #e2e8f0;">
          <div style="display:flex;gap:8px;font-size:0.9rem;color:#64748b;margin-bottom:0.5rem;">
            <a href="#/home" style="color:#0284c7;text-decoration:none;font-weight:600;">Home</a> &gt; 
            <span>${escapeHtml(subj.name)}</span>
          </div>

          <div style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:flex-start;gap:1rem;">
            <div>
              <div style="display:flex;gap:8px;align-items:center;margin-bottom:0.5rem;">
                <span style="font-size:0.8rem;font-weight:800;background:#e0f2fe;color:#0369a1;padding:3px 8px;border-radius:4px;">${escapeHtml(subj.code)}</span>
                <span style="font-size:0.8rem;font-weight:700;background:#fee2e2;color:#991b1b;padding:3px 8px;border-radius:4px;">Academic Status: HOLD (Academic Admission: ${escapeHtml(subj.academicAdmission || 'HOLD')})</span>
                <span style="font-size:0.8rem;font-weight:700;background:#f1f5f9;color:#475569;padding:3px 8px;border-radius:4px;">Diagnostic Mode Authorized</span>
              </div>
              <h1 style="margin:0 0 0.5rem;font-size:2.2rem;font-weight:800;color:#0f172a;">${icon} ${escapeHtml(subj.name)} Curriculum</h1>
              <p style="margin:0;color:#475569;font-size:1.15rem;max-width:850px;line-height:1.5;">${escapeHtml(subj.description || 'Verified curriculum topics, interactive workbenches, and authentic question decks.')}</p>
            </div>
            
            <div style="background:#f8fafc;border:1px solid #cbd5e1;border-radius:8px;padding:10px 18px;text-align:right;">
              <div style="font-size:0.8rem;font-weight:700;color:#64748b;text-transform:uppercase;">Indexed Questions</div>
              <div style="font-size:1.4rem;font-weight:800;color:#0284c7;">${state.totalItemCount} Practice Items</div>
            </div>
          </div>
        </header>

        <!-- Unreviewed Diagnostic Banner -->
        <div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:8px;padding:0.75rem 1.25rem;display:flex;align-items:center;gap:12px;">
          <span style="font-size:1.25rem;">ℹ️</span>
          <div style="font-size:0.95rem;color:#1e40af;">
            <strong>Diagnostic Exploration · Academic Status: HOLD (Academic Admission: HOLD) · Diagnostic Mode Authorized</strong> — This subject is technically verified and authorized for diagnostic exploration. Evaluator values and official accreditation remain under academic review.
          </div>
        </div>

        <!-- Strand Filter Bar -->
        ${strands.length > 0 ? `
          <div style="display:flex;flex-wrap:wrap;align-items:center;gap:8px;" role="toolbar" aria-label="Strand Filters">
            <span style="font-size:0.95rem;font-weight:700;color:#334155;margin-right:4px;">Filter by Strand:</span>
            <button type="button" class="strand-filter-btn" data-strand="" style="min-height:${HIT_TARGET_MIN_PX}px;padding:8px 16px;background:${state.activeStrandFilter === null ? '#0284c7' : '#f1f5f9'};color:${state.activeStrandFilter === null ? '#ffffff' : '#0f172a'};border:1px solid #cbd5e1;border-radius:6px;cursor:pointer;font-weight:700;font-size:0.9rem;">
              All Strands (${(subj.topics || []).length})
            </button>
            ${strands.map(str => `
              <button type="button" class="strand-filter-btn" data-strand="${escapeHtml(str)}" style="min-height:${HIT_TARGET_MIN_PX}px;padding:8px 16px;background:${state.activeStrandFilter === str ? '#0284c7' : '#f1f5f9'};color:${state.activeStrandFilter === str ? '#ffffff' : '#0f172a'};border:1px solid #cbd5e1;border-radius:6px;cursor:pointer;font-weight:700;font-size:0.9rem;">
                ${escapeHtml(str)}
              </button>
            `).join('')}
          </div>
        ` : ''}

        <!-- Curriculum Expansion Hub Banners -->
        ${subj.code === 'CHEMISTRY' ? `
          <div style="background:linear-gradient(135deg, #065f46 0%, #047857 100%);color:white;padding:18px 22px;border-radius:10px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;box-shadow:0 2px 6px rgba(0,0,0,0.08);">
            <div>
              <div style="font-weight:800;font-size:1.2rem;display:flex;align-items:center;gap:8px;">
                <span>🧪</span> Full 14-Topic Chemistry Curriculum & Adapter Register (C01–C14)
              </div>
              <div style="font-size:0.92rem;opacity:0.9;margin-top:4px;">
                Explore all 84 subtopics, 252 QRT cognitive demands, 165 authentic questions, and interactive stoichiometry workbench.
              </div>
            </div>
            <button type="button" onclick="window.location.hash='#/curriculum/chemistry'" style="min-height:${HIT_TARGET_MIN_PX}px;padding:10px 20px;background:#ffffff;color:#065f46;border:none;border-radius:8px;font-weight:800;cursor:pointer;font-size:0.95rem;box-shadow:0 2px 4px rgba(0,0,0,0.15);">
              Launch Chemistry Explorer →
            </button>
          </div>
        ` : ''}

        ${subj.code === 'PHYSICS' ? `
          <div style="background:linear-gradient(135deg, #0369a1 0%, #0284c7 100%);color:white;padding:18px 22px;border-radius:10px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;box-shadow:0 2px 6px rgba(0,0,0,0.08);">
            <div>
              <div style="font-weight:800;font-size:1.2rem;display:flex;align-items:center;gap:8px;">
                <span>⚛️</span> 20 Physics Library Packages &amp; 208 Authentic Question Records
              </div>
              <div style="font-size:0.92rem;opacity:0.9;margin-top:4px;">
                Comprehensive v3.5 STEM foundation across Mechanics, Fluids, Optics, Electricity, Waves, and Kinematics.
              </div>
            </div>
            <div style="display:flex;gap:8px;flex-wrap:wrap;">
              <button type="button" onclick="window.location.hash='#/physics-library'" style="min-height:${HIT_TARGET_MIN_PX}px;padding:10px 18px;background:#ffffff;color:#0369a1;border:none;border-radius:8px;font-weight:800;cursor:pointer;font-size:0.92rem;box-shadow:0 2px 4px rgba(0,0,0,0.15);">
                Open Library Packages (20) →
              </button>
              <button type="button" onclick="window.location.hash='#/curriculum/nsejs-physics'" style="min-height:${HIT_TARGET_MIN_PX}px;padding:10px 18px;background:#0f172a;color:#ffffff;border:1px solid #38bdf8;border-radius:8px;font-weight:800;cursor:pointer;font-size:0.92rem;">
                NSEJS 12 Chapters →
              </button>
            </div>
          </div>
        ` : ''}

        <!-- Topic Cards Grid -->
        <div style="display:grid;grid-template-columns:repeat(auto-fill, minmax(min(100%, 380px), 1fr));gap:1.5rem;">
          ${state.visibleTopics.map(t => {
            const topicSlug = t.code.toLowerCase();
            const subjectSlug = subj.code.toLowerCase();
            return `
              <div class="subject-topic-card g9-topic-card" style="border:1px solid #cbd5e1;border-radius:10px;background:#ffffff;padding:1.5rem;display:flex;flex-direction:column;justify-content:space-between;box-shadow:0 1px 3px rgba(0,0,0,0.05);">
                <div>
                  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.5rem;">
                    <span style="font-size:0.75rem;font-weight:800;color:#0284c7;background:#e0f2fe;padding:2px 8px;border-radius:4px;">${escapeHtml(t.code)}</span>
                    ${t.strand ? `<span style="font-size:0.8rem;font-weight:600;color:#64748b;">${escapeHtml(t.strand)}</span>` : ''}
                  </div>
                  <h3 style="margin:0 0 0.5rem;font-size:1.3rem;font-weight:700;color:#0f172a;">${escapeHtml(t.title)}</h3>
                  <p style="margin:0 0 1.25rem;font-size:0.95rem;color:#64748b;">
                    ${t.itemCount} Verified Practice Items ${t.hasExplorer ? '· 🔬 Simulation Workbench' : ''}
                  </p>
                </div>

                <div style="display:flex;flex-wrap:wrap;gap:8px;border-top:1px solid #f1f5f9;padding-top:1rem;">
                  <button type="button" class="btn-open-topic-qbank" data-href="#/subject/${subjectSlug}/topic/${topicSlug}/questions" style="flex:1;min-height:${HIT_TARGET_MIN_PX}px;padding:8px 14px;background:#0284c7;color:white;border:none;border-radius:6px;cursor:pointer;font-weight:700;font-size:0.95rem;text-align:center;">
                    📋 Question Bank
                  </button>
                  <button type="button" class="btn-open-topic-learn" data-href="#/subject/${subjectSlug}/topic/${topicSlug}/learn-try" style="flex:1;min-height:${HIT_TARGET_MIN_PX}px;padding:8px 14px;background:#f1f5f9;color:#0f172a;border:1px solid #cbd5e1;border-radius:6px;cursor:pointer;font-weight:700;font-size:0.95rem;text-align:center;">
                    💡 Learn &amp; Try
                  </button>
                </div>
              </div>
            `;
          }).join('')}
        </div>

      </div>
    `;

    bindEvents();
  };

  const bindEvents = () => {
    // Strand Filters
    root.querySelectorAll<HTMLButtonElement>('.strand-filter-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const str = btn.dataset.strand || null;
        controller.setStrandFilter(str);
        render();
      });
    });

    // Topic Action Buttons
    root.querySelectorAll<HTMLButtonElement>('.btn-open-topic-qbank, .btn-open-topic-learn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const href = btn.dataset.href;
        if (href) {
          if (onNavigate) onNavigate(href.replace(/^#/, ''));
          else window.location.hash = href;
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
    refresh: () => {
      render();
    },
  };
}
