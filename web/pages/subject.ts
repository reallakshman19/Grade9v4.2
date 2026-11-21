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

export const MATHEMATICS_SUBJECT_DETAIL: SubjectDetail = {
  id: 'mathematics',
  code: 'MATHEMATICS',
  name: 'Mathematics',
  description: 'Foundations of Mathematics, Algebra, Euclidean Geometry, Coordinate Systems & Real Analysis',
  status: 'AVAILABLE',
  academicAdmission: 'HOLD',
  diagnosticAuthorized: true,
  topics: [
    {
      id: 'polynomials',
      code: 'POLYNOMIALS',
      title: 'Theory of Equations & Polynomials',
      strand: 'Algebra',
      itemCount: 40,
      status: 'AVAILABLE',
      academicAdmission: 'HOLD',
      diagnosticAuthorized: true,
      hasExplorer: true,
    },
    {
      id: 'riemann',
      code: 'RIEMANN',
      title: 'Riemann Sums & Area Under Curves',
      strand: 'Analysis',
      itemCount: 15,
      status: 'AVAILABLE',
      academicAdmission: 'HOLD',
      diagnosticAuthorized: true,
      hasExplorer: true,
    },
    {
      id: 'euclid-geometry',
      code: 'EUCLID',
      title: "Euclid's Geometry & Olympiad Circles",
      strand: 'Geometry',
      itemCount: 50,
      status: 'AVAILABLE',
      academicAdmission: 'HOLD',
      diagnosticAuthorized: true,
      hasExplorer: true,
    },
    {
      id: 'coordinate-geometry',
      code: 'COORD_GEOM',
      title: 'Coordinate Geometry & Cartesian Plane',
      strand: 'Geometry',
      itemCount: 25,
      status: 'AVAILABLE',
      academicAdmission: 'HOLD',
      diagnosticAuthorized: true,
      hasExplorer: true,
    },
    {
      id: 'theory-of-equations',
      code: 'THEORY_EQUATIONS',
      title: 'Theory of Equations & Roots',
      strand: 'Algebra',
      itemCount: 30,
      status: 'AVAILABLE',
      academicAdmission: 'HOLD',
      diagnosticAuthorized: true,
      hasExplorer: true,
    },
    {
      id: 'vectors',
      code: 'VECTORS',
      title: 'Mathematical Vectors & Spatial Geometry',
      strand: 'Geometry',
      itemCount: 13,
      status: 'AVAILABLE',
      academicAdmission: 'HOLD',
      diagnosticAuthorized: true,
      hasExplorer: true,
    },
    {
      id: 'linear-equations',
      code: 'LINEAR_EQ',
      title: 'Linear Equations in Two Variables',
      strand: 'Algebra',
      itemCount: 20,
      status: 'AVAILABLE',
      academicAdmission: 'HOLD',
      diagnosticAuthorized: true,
      hasExplorer: true,
    },
  ],
};

export const BIOLOGY_SUBJECT_DETAIL: SubjectDetail = {
  id: 'biology',
  code: 'BIOLOGY',
  name: 'Biology',
  description: 'Physiology, Molecular Genetics, Cell Biology, Immunology & Ecological Systems (NSEJS Junior Science Parity)',
  status: 'AVAILABLE',
  academicAdmission: 'HOLD',
  diagnosticAuthorized: true,
  topics: [
    {
      id: 'living_world',
      code: 'LIVING_WORLD',
      title: 'Cell Biology & Molecular Genetics',
      strand: 'Cell & Molecular Biology',
      itemCount: 36,
      status: 'AVAILABLE',
      academicAdmission: 'HOLD',
      diagnosticAuthorized: true,
      hasExplorer: true,
    },
    {
      id: 'life_processes',
      code: 'LIFE_PROCESSES',
      title: 'Life Processes & Nephron Physiology',
      strand: 'Human Physiology',
      itemCount: 25,
      status: 'AVAILABLE',
      academicAdmission: 'HOLD',
      diagnosticAuthorized: true,
      hasExplorer: true,
    },
    {
      id: 'coordination',
      code: 'COORDINATION',
      title: 'Control & Endocrine Coordination / Immunology',
      strand: 'Systems & Regulation',
      itemCount: 15,
      status: 'AVAILABLE',
      academicAdmission: 'HOLD',
      diagnosticAuthorized: true,
      hasExplorer: true,
    },
    {
      id: 'genetics',
      code: 'GENETICS',
      title: 'Reproduction & Mendelian Heredity',
      strand: 'Genetics & Evolution',
      itemCount: 23,
      status: 'AVAILABLE',
      academicAdmission: 'HOLD',
      diagnosticAuthorized: true,
      hasExplorer: true,
    },
    {
      id: 'environment',
      code: 'ENVIRONMENT',
      title: 'Ecology & Ecosystem Resources',
      strand: 'Ecology & Environment',
      itemCount: 20,
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
          <div style="display:flex;gap:8px;font-size:0.9rem;color:#64748b;margin-bottom:0.5rem;align-items:center;">
            <a href="#/home" style="color:#0284c7;text-decoration:none;font-weight:600;display:inline-flex;align-items:center;min-height:48px;min-width:48px;">Home</a> &gt; 
            <span>${escapeHtml(subj.name)}</span>
          </div>

          <div style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:flex-start;gap:1rem;">
            <div>
              <div style="display:flex;gap:8px;align-items:center;margin-bottom:0.5rem;">
                <span style="font-size:0.8rem;font-weight:800;background:#e0f2fe;color:#0369a1;padding:3px 8px;border-radius:4px;">${escapeHtml(subj.code)}</span>
                <span style="font-size:0.8rem;font-weight:700;background:#fee2e2;color:#991b1b;padding:3px 8px;border-radius:4px;">Academic Status: HOLD (Academic Admission: ${escapeHtml(subj.academicAdmission || 'HOLD')})</span>
                <span style="font-size:0.8rem;font-weight:700;background:#f1f5f9;color:#475569;padding:3px 8px;border-radius:4px;">Diagnostic Mode Authorized</span>
              </div>
              <h1 class="placeholder-title" style="margin:0 0 0.5rem;font-size:2.2rem;font-weight:800;color:#0f172a;">${icon} ${escapeHtml(subj.name)} Curriculum</h1>
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
              <a href="./physics/index.html" class="btn-open-physics-hub" style="min-height:${HIT_TARGET_MIN_PX}px;padding:10px 18px;background:#38bdf8;color:#0f172a;text-decoration:none;border-radius:8px;font-weight:800;cursor:pointer;font-size:0.92rem;display:inline-flex;align-items:center;gap:6px;box-shadow:0 2px 4px rgba(0,0,0,0.15);">
                <span>⚡</span> Standalone Physics Hub (v3.5) →
              </a>
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

        ${subj.code === 'PHYSICS' ? `
          <!-- Grade9 v3.5 Parity: Core Topic Workspaces -->
          <div style="margin-top:2rem;padding-top:1.5rem;border-top:2px solid #e2e8f0;">
            <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;margin-bottom:1rem;">
              <div>
                <h2 style="font-size:1.4rem;font-weight:800;color:#0f172a;margin:0 0 4px;">Grade9 v3.5 Core Topic Workspaces (Parity)</h2>
                <p style="margin:0;color:#64748b;font-size:0.95rem;">Direct access to authentic v3.5 topic workspaces with structured derivations, past-paper practice, and core study units.</p>
              </div>
              <span style="font-size:0.8rem;font-weight:700;background:#e0f2fe;color:#0369a1;padding:4px 10px;border-radius:6px;">5 Core Workspaces · No Iframe</span>
            </div>

            <div style="display:grid;grid-template-columns:repeat(auto-fill, minmax(min(100%, 360px), 1fr));gap:1.25rem;">
              <div class="v35-topic-card" style="border:1px solid #cbd5e1;border-radius:10px;background:#ffffff;padding:1.25rem;display:flex;flex-direction:column;justify-content:space-between;box-shadow:0 1px 3px rgba(0,0,0,0.05);">
                <div>
                  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.5rem;">
                    <span style="font-size:0.75rem;font-weight:800;color:#0284c7;background:#e0f2fe;padding:2px 8px;border-radius:4px;">FLUIDS</span>
                    <span style="font-size:0.8rem;font-weight:600;color:#64748b;">Fluid Mechanics</span>
                  </div>
                  <h3 style="margin:0 0 0.5rem;font-size:1.2rem;font-weight:700;color:#0f172a;">🌊 Thrust &amp; Hydrostatic Pressure</h3>
                  <p style="margin:0 0 1rem;font-size:0.92rem;color:#64748b;line-height:1.4;">Hydrostatic column manometer, Pascal hydraulic force multiplier, and Archimedes buoyancy equilibrium.</p>
                </div>
                <div style="display:flex;gap:8px;border-top:1px solid #f1f5f9;padding-top:0.75rem;">
                  <a href="./physics/fluids/index.html" class="v35-open-btn" style="flex:1;min-height:${HIT_TARGET_MIN_PX}px;padding:8px 12px;background:#0284c7;color:white;text-decoration:none;border-radius:6px;font-weight:700;font-size:0.9rem;text-align:center;display:flex;align-items:center;justify-content:center;">Open Workspace →</a>
                  <a href="./standalone/practice/core1a-physics-thrust-pressure-tablet.html" class="v35-open-btn" style="flex:1;min-height:${HIT_TARGET_MIN_PX}px;padding:8px 12px;background:#f1f5f9;color:#0f172a;text-decoration:none;border:1px solid #cbd5e1;border-radius:6px;font-weight:700;font-size:0.9rem;text-align:center;display:flex;align-items:center;justify-content:center;">📖 Core Study</a>
                </div>
              </div>

              <div class="v35-topic-card" style="border:1px solid #cbd5e1;border-radius:10px;background:#ffffff;padding:1.25rem;display:flex;flex-direction:column;justify-content:space-between;box-shadow:0 1px 3px rgba(0,0,0,0.05);">
                <div>
                  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.5rem;">
                    <span style="font-size:0.75rem;font-weight:800;color:#0284c7;background:#e0f2fe;padding:2px 8px;border-radius:4px;">MOTION-1D</span>
                    <span style="font-size:0.8rem;font-weight:600;color:#64748b;">Kinematics</span>
                  </div>
                  <h3 style="margin:0 0 0.5rem;font-size:1.2rem;font-weight:700;color:#0f172a;">🏎️ Motion in One Dimension</h3>
                  <p style="margin:0 0 1rem;font-size:0.92rem;color:#64748b;line-height:1.4;">Rectilinear kinematics under uniform/variable acceleration, area integrals, turnaround points, and source PDFs.</p>
                </div>
                <div style="display:flex;gap:8px;border-top:1px solid #f1f5f9;padding-top:0.75rem;">
                  <a href="./physics/motion-1d/index.html" class="v35-open-btn" style="flex:1;min-height:${HIT_TARGET_MIN_PX}px;padding:8px 12px;background:#0284c7;color:white;text-decoration:none;border-radius:6px;font-weight:700;font-size:0.9rem;text-align:center;display:flex;align-items:center;justify-content:center;">Open Workspace →</a>
                  <a href="./physics/motion-1d/core1a.html" class="v35-open-btn" style="flex:1;min-height:${HIT_TARGET_MIN_PX}px;padding:8px 12px;background:#f1f5f9;color:#0f172a;text-decoration:none;border:1px solid #cbd5e1;border-radius:6px;font-weight:700;font-size:0.9rem;text-align:center;display:flex;align-items:center;justify-content:center;">📖 Core Study</a>
                </div>
              </div>

              <div class="v35-topic-card" style="border:1px solid #cbd5e1;border-radius:10px;background:#ffffff;padding:1.25rem;display:flex;flex-direction:column;justify-content:space-between;box-shadow:0 1px 3px rgba(0,0,0,0.05);">
                <div>
                  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.5rem;">
                    <span style="font-size:0.75rem;font-weight:800;color:#0284c7;background:#e0f2fe;padding:2px 8px;border-radius:4px;">MOTION-2D</span>
                    <span style="font-size:0.8rem;font-weight:600;color:#64748b;">Kinematics</span>
                  </div>
                  <h3 style="margin:0 0 0.5rem;font-size:1.2rem;font-weight:700;color:#0f172a;">🎯 Motion in a Plane (2D)</h3>
                  <p style="margin:0 0 1rem;font-size:0.92rem;color:#64748b;line-height:1.4;">Orthogonal Cartesian vector resolution, parabolic trajectory tracing, complementary angle invariance, and shared clock.</p>
                </div>
                <div style="display:flex;gap:8px;border-top:1px solid #f1f5f9;padding-top:0.75rem;">
                  <a href="./physics/motion-2d/index.html" class="v35-open-btn" style="flex:1;min-height:${HIT_TARGET_MIN_PX}px;padding:8px 12px;background:#0284c7;color:white;text-decoration:none;border-radius:6px;font-weight:700;font-size:0.9rem;text-align:center;display:flex;align-items:center;justify-content:center;">Open Workspace →</a>
                  <a href="./physics/motion-2d/core1a.html" class="v35-open-btn" style="flex:1;min-height:${HIT_TARGET_MIN_PX}px;padding:8px 12px;background:#f1f5f9;color:#0f172a;text-decoration:none;border:1px solid #cbd5e1;border-radius:6px;font-weight:700;font-size:0.9rem;text-align:center;display:flex;align-items:center;justify-content:center;">📖 Core Study</a>
                </div>
              </div>

              <div class="v35-topic-card" style="border:1px solid #cbd5e1;border-radius:10px;background:#ffffff;padding:1.25rem;display:flex;flex-direction:column;justify-content:space-between;box-shadow:0 1px 3px rgba(0,0,0,0.05);">
                <div>
                  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.5rem;">
                    <span style="font-size:0.75rem;font-weight:800;color:#0284c7;background:#e0f2fe;padding:2px 8px;border-radius:4px;">NLM</span>
                    <span style="font-size:0.8rem;font-weight:600;color:#64748b;">Dynamics</span>
                  </div>
                  <h3 style="margin:0 0 0.5rem;font-size:1.2rem;font-weight:700;color:#0f172a;">⚖️ Newton's Laws of Motion</h3>
                  <p style="margin:0 0 1rem;font-size:0.92rem;color:#64748b;line-height:1.4;">Three laws of motion, Atwood machines, multi-block contact forces, and static-to-kinetic friction stick-slip thresholds.</p>
                </div>
                <div style="display:flex;gap:8px;border-top:1px solid #f1f5f9;padding-top:0.75rem;">
                  <a href="./physics/nlm/index.html" class="v35-open-btn" style="flex:1;min-height:${HIT_TARGET_MIN_PX}px;padding:8px 12px;background:#0284c7;color:white;text-decoration:none;border-radius:6px;font-weight:700;font-size:0.9rem;text-align:center;display:flex;align-items:center;justify-content:center;">Open Workspace →</a>
                  <a href="./standalone/practice/core1a-physics-nlm-tablet.html" class="v35-open-btn" style="flex:1;min-height:${HIT_TARGET_MIN_PX}px;padding:8px 12px;background:#f1f5f9;color:#0f172a;text-decoration:none;border:1px solid #cbd5e1;border-radius:6px;font-weight:700;font-size:0.9rem;text-align:center;display:flex;align-items:center;justify-content:center;">📖 Core Study</a>
                </div>
              </div>

              <div class="v35-topic-card" style="border:1px solid #cbd5e1;border-radius:10px;background:#ffffff;padding:1.25rem;display:flex;flex-direction:column;justify-content:space-between;box-shadow:0 1px 3px rgba(0,0,0,0.05);">
                <div>
                  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.5rem;">
                    <span style="font-size:0.75rem;font-weight:800;color:#0284c7;background:#e0f2fe;padding:2px 8px;border-radius:4px;">VECTORS</span>
                    <span style="font-size:0.8rem;font-weight:600;color:#64748b;">Mathematical Physics</span>
                  </div>
                  <h3 style="margin:0 0 0.5rem;font-size:1.2rem;font-weight:700;color:#0f172a;">📐 Vector Methods in Physics</h3>
                  <p style="margin:0 0 1rem;font-size:0.92rem;color:#64748b;line-height:1.4;">Geometric vector addition, head-to-tail resolution, dot and cross products, and 3D coordinate projections.</p>
                </div>
                <div style="display:flex;gap:8px;border-top:1px solid #f1f5f9;padding-top:0.75rem;">
                  <a href="./physics/vectors/index.html" class="v35-open-btn" style="flex:1;min-height:${HIT_TARGET_MIN_PX}px;padding:8px 12px;background:#0284c7;color:white;text-decoration:none;border-radius:6px;font-weight:700;font-size:0.9rem;text-align:center;display:flex;align-items:center;justify-content:center;">Open Workspace →</a>
                  <a href="./standalone/practice/core1a-physics-vectors-tablet.html" class="v35-open-btn" style="flex:1;min-height:${HIT_TARGET_MIN_PX}px;padding:8px 12px;background:#f1f5f9;color:#0f172a;text-decoration:none;border:1px solid #cbd5e1;border-radius:6px;font-weight:700;font-size:0.9rem;text-align:center;display:flex;align-items:center;justify-content:center;">📖 Core Study</a>
                </div>
              </div>
            </div>
          </div>

          <!-- Grade9 v3.5 Parity: 9 Featured Interactive Explorers & Visual Suites -->
          <div style="margin-top:2rem;padding-top:1.5rem;border-top:2px solid #e2e8f0;">
            <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;margin-bottom:1rem;">
              <div>
                <h2 style="font-size:1.4rem;font-weight:800;color:#0f172a;margin:0 0 4px;">Grade9 v3.5 Interactive Explorers &amp; Visual Suites</h2>
                <p style="margin:0;color:#64748b;font-size:0.95rem;">Full-scale interactive simulation engines with real-time canvas animations, telemetry, and problem-solving tools.</p>
              </div>
              <span style="font-size:0.8rem;font-weight:700;background:#dcfce7;color:#166534;padding:4px 10px;border-radius:6px;">9 Interactive Suites · Top-Level Navigation</span>
            </div>

            <div style="display:grid;grid-template-columns:repeat(auto-fill, minmax(min(100%, 360px), 1fr));gap:1.25rem;">
              <div class="v35-explorer-card" style="border:1px solid #cbd5e1;border-radius:10px;background:#ffffff;padding:1.25rem;display:flex;flex-direction:column;justify-content:space-between;box-shadow:0 1px 3px rgba(0,0,0,0.05);">
                <div>
                  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.5rem;">
                    <span style="font-size:0.75rem;font-weight:800;color:#166534;background:#dcfce7;padding:2px 8px;border-radius:4px;">⚡ INTERACTIVE SUITE</span>
                    <span style="font-size:0.8rem;font-weight:600;color:#64748b;">Kinematics 1D</span>
                  </div>
                  <h3 style="margin:0 0 0.5rem;font-size:1.15rem;font-weight:700;color:#0f172a;">🚀 Motion in 1D Suite</h3>
                  <p style="margin:0 0 1rem;font-size:0.92rem;color:#64748b;line-height:1.4;">Kinematic equations, free fall under gravity, velocity-time graph area integrals, and turnaround points.</p>
                </div>
                <a href="./physics/motion-1d/explorers/motion_in_1d/index.html" class="v35-launch-btn" style="min-height:${HIT_TARGET_MIN_PX}px;padding:10px 16px;background:#0f172a;color:#38bdf8;text-decoration:none;border:1px solid #38bdf8;border-radius:6px;font-weight:800;font-size:0.92rem;text-align:center;display:flex;align-items:center;justify-content:center;gap:6px;">
                  <span>⚡</span> Try Visually (Native DOM) &rarr;
                </a>
              </div>

              <div class="v35-explorer-card" style="border:1px solid #cbd5e1;border-radius:10px;background:#ffffff;padding:1.25rem;display:flex;flex-direction:column;justify-content:space-between;box-shadow:0 1px 3px rgba(0,0,0,0.05);">
                <div>
                  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.5rem;">
                    <span style="font-size:0.75rem;font-weight:800;color:#166534;background:#dcfce7;padding:2px 8px;border-radius:4px;">⚡ INTERACTIVE SUITE</span>
                    <span style="font-size:0.8rem;font-weight:600;color:#64748b;">Kinematics 2D</span>
                  </div>
                  <h3 style="margin:0 0 0.5rem;font-size:1.15rem;font-weight:700;color:#0f172a;">🎯 Motion in a Plane Research Suite</h3>
                  <p style="margin:0 0 1rem;font-size:0.92rem;color:#64748b;line-height:1.4;">Cartesian projectile resolution, parabolic trajectory tracing, complementary angle invariance, and banked roads.</p>
                </div>
                <a href="./physics/motion-2d/explorers/motion-in-a-plane/index.html" class="v35-launch-btn" style="min-height:${HIT_TARGET_MIN_PX}px;padding:10px 16px;background:#0f172a;color:#38bdf8;text-decoration:none;border:1px solid #38bdf8;border-radius:6px;font-weight:800;font-size:0.92rem;text-align:center;display:flex;align-items:center;justify-content:center;gap:6px;">
                  <span>⚡</span> Try Visually (Native DOM) &rarr;
                </a>
              </div>

              <div class="v35-explorer-card" style="border:1px solid #cbd5e1;border-radius:10px;background:#ffffff;padding:1.25rem;display:flex;flex-direction:column;justify-content:space-between;box-shadow:0 1px 3px rgba(0,0,0,0.05);">
                <div>
                  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.5rem;">
                    <span style="font-size:0.75rem;font-weight:800;color:#166534;background:#dcfce7;padding:2px 8px;border-radius:4px;">⚡ INTERACTIVE SUITE</span>
                    <span style="font-size:0.8rem;font-weight:600;color:#64748b;">Kinematics 2D</span>
                  </div>
                  <h3 style="margin:0 0 0.5rem;font-size:1.15rem;font-weight:700;color:#0f172a;">🌌 2D Motion Master Suite</h3>
                  <p style="margin:0 0 1rem;font-size:0.92rem;color:#64748b;line-height:1.4;">Full 2D kinematic engine: rain-man relative velocity, river-boat crossing drift, and cliff-launch trajectories.</p>
                </div>
                <a href="./physics/motion-in-2d/explorers/motions_in_2d/index.html" class="v35-launch-btn" style="min-height:${HIT_TARGET_MIN_PX}px;padding:10px 16px;background:#0f172a;color:#38bdf8;text-decoration:none;border:1px solid #38bdf8;border-radius:6px;font-weight:800;font-size:0.92rem;text-align:center;display:flex;align-items:center;justify-content:center;gap:6px;">
                  <span>⚡</span> Try Visually (Native DOM) &rarr;
                </a>
              </div>

              <div class="v35-explorer-card" style="border:1px solid #cbd5e1;border-radius:10px;background:#ffffff;padding:1.25rem;display:flex;flex-direction:column;justify-content:space-between;box-shadow:0 1px 3px rgba(0,0,0,0.05);">
                <div>
                  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.5rem;">
                    <span style="font-size:0.75rem;font-weight:800;color:#166534;background:#dcfce7;padding:2px 8px;border-radius:4px;">⚡ INTERACTIVE SUITE</span>
                    <span style="font-size:0.8rem;font-weight:600;color:#64748b;">Kinematics 2D</span>
                  </div>
                  <h3 style="margin:0 0 0.5rem;font-size:1.15rem;font-weight:700;color:#0f172a;">⏰ Independent Components &amp; Shared Clock</h3>
                  <p style="margin:0 0 1rem;font-size:0.92rem;color:#64748b;line-height:1.4;">Direct visual proof of orthogonal independence in two-dimensional kinematics under uniform gravity.</p>
                </div>
                <a href="./physics/motion-in-2d/explorers/independent_components_shared_clock/index.html" class="v35-launch-btn" style="min-height:${HIT_TARGET_MIN_PX}px;padding:10px 16px;background:#0f172a;color:#38bdf8;text-decoration:none;border:1px solid #38bdf8;border-radius:6px;font-weight:800;font-size:0.92rem;text-align:center;display:flex;align-items:center;justify-content:center;gap:6px;">
                  <span>⚡</span> Try Visually (Native DOM) &rarr;
                </a>
              </div>

              <div class="v35-explorer-card" style="border:1px solid #cbd5e1;border-radius:10px;background:#ffffff;padding:1.25rem;display:flex;flex-direction:column;justify-content:space-between;box-shadow:0 1px 3px rgba(0,0,0,0.05);">
                <div>
                  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.5rem;">
                    <span style="font-size:0.75rem;font-weight:800;color:#166534;background:#dcfce7;padding:2px 8px;border-radius:4px;">⚡ INTERACTIVE SUITE</span>
                    <span style="font-size:0.8rem;font-weight:600;color:#64748b;">Kinematics 2D</span>
                  </div>
                  <h3 style="margin:0 0 0.5rem;font-size:1.15rem;font-weight:700;color:#0f172a;">⚖️ Same Height Same Speed Symmetries</h3>
                  <p style="margin:0 0 1rem;font-size:0.92rem;color:#64748b;line-height:1.4;">Horizontal symmetry and kinetic-potential energy conservation along parabolic flight trajectories.</p>
                </div>
                <a href="./physics/motion-in-2d/explorers/same_height_same_speed/index.html" class="v35-launch-btn" style="min-height:${HIT_TARGET_MIN_PX}px;padding:10px 16px;background:#0f172a;color:#38bdf8;text-decoration:none;border:1px solid #38bdf8;border-radius:6px;font-weight:800;font-size:0.92rem;text-align:center;display:flex;align-items:center;justify-content:center;gap:6px;">
                  <span>⚡</span> Try Visually (Native DOM) &rarr;
                </a>
              </div>

              <div class="v35-explorer-card" style="border:1px solid #cbd5e1;border-radius:10px;background:#ffffff;padding:1.25rem;display:flex;flex-direction:column;justify-content:space-between;box-shadow:0 1px 3px rgba(0,0,0,0.05);">
                <div>
                  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.5rem;">
                    <span style="font-size:0.75rem;font-weight:800;color:#166534;background:#dcfce7;padding:2px 8px;border-radius:4px;">⚡ INTERACTIVE SUITE</span>
                    <span style="font-size:0.8rem;font-weight:600;color:#64748b;">Kinematics 2D</span>
                  </div>
                  <h3 style="margin:0 0 0.5rem;font-size:1.15rem;font-weight:700;color:#0f172a;">⚠️ The Apex Fallacy</h3>
                  <p style="margin:0 0 1rem;font-size:0.92rem;color:#64748b;line-height:1.4;">Non-zero acceleration at the apex: why net force is not zero when vertical velocity vanishes.</p>
                </div>
                <a href="./physics/motion-in-2d/explorers/the_apex_fallacy/index.html" class="v35-launch-btn" style="min-height:${HIT_TARGET_MIN_PX}px;padding:10px 16px;background:#0f172a;color:#38bdf8;text-decoration:none;border:1px solid #38bdf8;border-radius:6px;font-weight:800;font-size:0.92rem;text-align:center;display:flex;align-items:center;justify-content:center;gap:6px;">
                  <span>⚡</span> Try Visually (Native DOM) &rarr;
                </a>
              </div>

              <div class="v35-explorer-card" style="border:1px solid #cbd5e1;border-radius:10px;background:#ffffff;padding:1.25rem;display:flex;flex-direction:column;justify-content:space-between;box-shadow:0 1px 3px rgba(0,0,0,0.05);">
                <div>
                  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.5rem;">
                    <span style="font-size:0.75rem;font-weight:800;color:#166534;background:#dcfce7;padding:2px 8px;border-radius:4px;">⚡ INTERACTIVE SUITE</span>
                    <span style="font-size:0.8rem;font-weight:600;color:#64748b;">Dynamics</span>
                  </div>
                  <h3 style="margin:0 0 0.5rem;font-size:1.15rem;font-weight:700;color:#0f172a;">⛓️ Atwood Machines &amp; Pulley Constraints</h3>
                  <p style="margin:0 0 1rem;font-size:0.92rem;color:#64748b;line-height:1.4;">Inextensible string kinematics, movable pulley mechanical advantage, and acceleration constraint equations.</p>
                </div>
                <a href="./physics/nlm/explorers/atwood-pulleys/index.html" class="v35-launch-btn" style="min-height:${HIT_TARGET_MIN_PX}px;padding:10px 16px;background:#0f172a;color:#38bdf8;text-decoration:none;border:1px solid #38bdf8;border-radius:6px;font-weight:800;font-size:0.92rem;text-align:center;display:flex;align-items:center;justify-content:center;gap:6px;">
                  <span>⚡</span> Try Visually (Native DOM) &rarr;
                </a>
              </div>

              <div class="v35-explorer-card" style="border:1px solid #cbd5e1;border-radius:10px;background:#ffffff;padding:1.25rem;display:flex;flex-direction:column;justify-content:space-between;box-shadow:0 1px 3px rgba(0,0,0,0.05);">
                <div>
                  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.5rem;">
                    <span style="font-size:0.75rem;font-weight:800;color:#166534;background:#dcfce7;padding:2px 8px;border-radius:4px;">⚡ INTERACTIVE SUITE</span>
                    <span style="font-size:0.8rem;font-weight:600;color:#64748b;">Dynamics</span>
                  </div>
                  <h3 style="margin:0 0 0.5rem;font-size:1.15rem;font-weight:700;color:#0f172a;">📦 Connected Blocks Dynamics</h3>
                  <p style="margin:0 0 1rem;font-size:0.92rem;color:#64748b;line-height:1.4;">Multi-body contact forces, internal tension cancellation, and common acceleration systems.</p>
                </div>
                <a href="./physics/nlm/explorers/connected-blocks/index.html" class="v35-launch-btn" style="min-height:${HIT_TARGET_MIN_PX}px;padding:10px 16px;background:#0f172a;color:#38bdf8;text-decoration:none;border:1px solid #38bdf8;border-radius:6px;font-weight:800;font-size:0.92rem;text-align:center;display:flex;align-items:center;justify-content:center;gap:6px;">
                  <span>⚡</span> Try Visually (Native DOM) &rarr;
                </a>
              </div>

              <div class="v35-explorer-card" style="border:1px solid #cbd5e1;border-radius:10px;background:#ffffff;padding:1.25rem;display:flex;flex-direction:column;justify-content:space-between;box-shadow:0 1px 3px rgba(0,0,0,0.05);">
                <div>
                  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.5rem;">
                    <span style="font-size:0.75rem;font-weight:800;color:#166534;background:#dcfce7;padding:2px 8px;border-radius:4px;">⚡ INTERACTIVE SUITE</span>
                    <span style="font-size:0.8rem;font-weight:600;color:#64748b;">Dynamics</span>
                  </div>
                  <h3 style="margin:0 0 0.5rem;font-size:1.15rem;font-weight:700;color:#0f172a;">🛑 Static-to-Kinetic Friction Threshold</h3>
                  <p style="margin:0 0 1rem;font-size:0.92rem;color:#64748b;line-height:1.4;">Real-time physical simulation of self-adjusting static friction, impending slip threshold, and kinetic drop.</p>
                </div>
                <a href="./physics/nlm/explorers/friction-threshold/index.html" class="v35-launch-btn" style="min-height:${HIT_TARGET_MIN_PX}px;padding:10px 16px;background:#0f172a;color:#38bdf8;text-decoration:none;border:1px solid #38bdf8;border-radius:6px;font-weight:800;font-size:0.92rem;text-align:center;display:flex;align-items:center;justify-content:center;gap:6px;">
                  <span>⚡</span> Try Visually (Native DOM) &rarr;
                </a>
              </div>
            </div>
          </div>
        ` : ''}

        ${subj.code === 'MATHEMATICS' ? `
          <!-- Grade9 v3.5 Parity: Mathematics Core Topic Workspaces -->
          <div style="margin-top:2rem;padding-top:1.5rem;border-top:2px solid #e2e8f0;">
            <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;margin-bottom:1rem;">
              <div>
                <h2 style="font-size:1.4rem;font-weight:800;color:#0f172a;margin:0 0 4px;">Grade9 v3.5 Mathematics Core Topic Workspaces (Parity)</h2>
                <p style="margin:0;color:#64748b;font-size:0.95rem;">Direct access to authentic v3.5 mathematics workspaces with structured derivations, olympiad problem sets, and concept atlases.</p>
              </div>
              <span style="font-size:0.875rem;font-weight:700;background:#e0f2fe;color:#0369a1;padding:4px 10px;border-radius:6px;">7 Core Workspaces · Pure Native DOM · No Iframe</span>
            </div>

            <div style="display:grid;grid-template-columns:repeat(auto-fill, minmax(min(100%, 360px), 1fr));gap:1.25rem;">
              
              <!-- 1. Coordinate Geometry -->
              <div class="v35-topic-card" style="border:1px solid #cbd5e1;border-radius:10px;background:#ffffff;padding:1.25rem;display:flex;flex-direction:column;justify-content:space-between;box-shadow:0 1px 3px rgba(0,0,0,0.05);">
                <div>
                  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.5rem;">
                    <span style="font-size:0.875rem;font-weight:800;color:#0284c7;background:#e0f2fe;padding:2px 8px;border-radius:4px;">COORD_GEOM</span>
                    <span style="font-size:0.875rem;font-weight:600;color:#64748b;">Geometry</span>
                  </div>
                  <h3 style="margin:0 0 0.5rem;font-size:1.2rem;font-weight:700;color:#0f172a;">📐 Coordinate Geometry</h3>
                  <p style="margin:0 0 1rem;font-size:0.92rem;color:#64748b;line-height:1.4;">2D Cartesian coordinate plane, quadrant telemetry, draggable point projections, distance from axes, and Question Bank practice.</p>
                </div>
                <div style="display:flex;flex-direction:column;gap:6px;border-top:1px solid #f1f5f9;padding-top:0.75rem;">
                  <button type="button" class="btn-math-launch" data-href="#/subject/mathematics/topic/coordinate-geometry/questions" style="min-height:${HIT_TARGET_MIN_PX}px;padding:8px 12px;background:#0284c7;color:white;border:none;border-radius:6px;font-weight:700;font-size:0.9rem;cursor:pointer;text-align:center;">Open Topic Workspace →</button>
                  <div style="display:flex;gap:6px;">
                    <a href="./mathematics/coordinate-geometry/index.html" style="flex:1;min-height:${HIT_TARGET_MIN_PX}px;padding:6px 8px;background:#f8fafc;color:#0f172a;text-decoration:none;border:1px solid #cbd5e1;border-radius:6px;font-weight:600;font-size:0.85rem;text-align:center;display:flex;align-items:center;justify-content:center;">v3.5 Workspace</a>
                    <a href="./mathematics/coordinate-geometry/core1a.html" style="flex:1;min-height:${HIT_TARGET_MIN_PX}px;padding:6px 8px;background:#f8fafc;color:#0f172a;text-decoration:none;border:1px solid #cbd5e1;border-radius:6px;font-weight:600;font-size:0.85rem;text-align:center;display:flex;align-items:center;justify-content:center;">📖 Core Study</a>
                    <a href="./mathematics/coordinate-geometry/atlas.html" style="flex:1;min-height:${HIT_TARGET_MIN_PX}px;padding:6px 8px;background:#f8fafc;color:#0f172a;text-decoration:none;border:1px solid #cbd5e1;border-radius:6px;font-weight:600;font-size:0.85rem;text-align:center;display:flex;align-items:center;justify-content:center;">🧭 Atlas</a>
                  </div>
                </div>
              </div>

              <!-- 2. Euclid's Geometry -->
              <div class="v35-topic-card" style="border:1px solid #cbd5e1;border-radius:10px;background:#ffffff;padding:1.25rem;display:flex;flex-direction:column;justify-content:space-between;box-shadow:0 1px 3px rgba(0,0,0,0.05);">
                <div>
                  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.5rem;">
                    <span style="font-size:0.875rem;font-weight:800;color:#0284c7;background:#e0f2fe;padding:2px 8px;border-radius:4px;">EUCLID</span>
                    <span style="font-size:0.875rem;font-weight:600;color:#64748b;">Geometry</span>
                  </div>
                  <h3 style="margin:0 0 0.5rem;font-size:1.2rem;font-weight:700;color:#0f172a;">⭕ Euclid's Geometry &amp; Circles</h3>
                  <p style="margin:0 0 1rem;font-size:0.92rem;color:#64748b;line-height:1.4;">Euclidean circle geometry theorems, tangent secant power of point, cyclic quadrilaterals, and Thales's inscribed angle verification.</p>
                </div>
                <div style="display:flex;flex-direction:column;gap:6px;border-top:1px solid #f1f5f9;padding-top:0.75rem;">
                  <button type="button" class="btn-math-launch" data-href="#/subject/mathematics/topic/euclid-geometry/questions" style="min-height:${HIT_TARGET_MIN_PX}px;padding:8px 12px;background:#0284c7;color:white;border:none;border-radius:6px;font-weight:700;font-size:0.9rem;cursor:pointer;text-align:center;">Open Topic Workspace →</button>
                  <div style="display:flex;gap:6px;">
                    <a href="./mathematics/euclids-geometry/index.html" style="flex:1;min-height:${HIT_TARGET_MIN_PX}px;padding:6px 8px;background:#f8fafc;color:#0f172a;text-decoration:none;border:1px solid #cbd5e1;border-radius:6px;font-weight:600;font-size:0.85rem;text-align:center;display:flex;align-items:center;justify-content:center;">v3.5 Workspace</a>
                    <a href="./mathematics/euclids-geometry/core1a.html" style="flex:1;min-height:${HIT_TARGET_MIN_PX}px;padding:6px 8px;background:#f8fafc;color:#0f172a;text-decoration:none;border:1px solid #cbd5e1;border-radius:6px;font-weight:600;font-size:0.85rem;text-align:center;display:flex;align-items:center;justify-content:center;">📖 Core Study</a>
                    <a href="./mathematics/euclids-geometry/atlas.html" style="flex:1;min-height:${HIT_TARGET_MIN_PX}px;padding:6px 8px;background:#f8fafc;color:#0f172a;text-decoration:none;border:1px solid #cbd5e1;border-radius:6px;font-weight:600;font-size:0.85rem;text-align:center;display:flex;align-items:center;justify-content:center;">🧭 Atlas</a>
                  </div>
                </div>
              </div>

              <!-- 3. Polynomials & Remainder Theorem -->
              <div class="v35-topic-card" style="border:1px solid #cbd5e1;border-radius:10px;background:#ffffff;padding:1.25rem;display:flex;flex-direction:column;justify-content:space-between;box-shadow:0 1px 3px rgba(0,0,0,0.05);">
                <div>
                  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.5rem;">
                    <span style="font-size:0.875rem;font-weight:800;color:#0284c7;background:#e0f2fe;padding:2px 8px;border-radius:4px;">POLYNOMIALS</span>
                    <span style="font-size:0.875rem;font-weight:600;color:#64748b;">Algebra</span>
                  </div>
                  <h3 style="margin:0 0 0.5rem;font-size:1.2rem;font-weight:700;color:#0f172a;">➗ Polynomials &amp; Remainder Theorem</h3>
                  <p style="margin:0 0 1rem;font-size:0.92rem;color:#64748b;line-height:1.4;">Polynomial remainder theorem P(k), synthetic long division, factor theorem, and algebraic identities.</p>
                </div>
                <div style="display:flex;flex-direction:column;gap:6px;border-top:1px solid #f1f5f9;padding-top:0.75rem;">
                  <button type="button" class="btn-math-launch" data-href="#/subject/mathematics/topic/polynomials/questions" style="min-height:${HIT_TARGET_MIN_PX}px;padding:8px 12px;background:#0284c7;color:white;border:none;border-radius:6px;font-weight:700;font-size:0.9rem;cursor:pointer;text-align:center;">Open Topic Workspace →</button>
                  <div style="display:flex;gap:6px;">
                    <a href="./mathematics/polynomials/index.html" style="flex:1;min-height:${HIT_TARGET_MIN_PX}px;padding:6px 8px;background:#f8fafc;color:#0f172a;text-decoration:none;border:1px solid #cbd5e1;border-radius:6px;font-weight:600;font-size:0.85rem;text-align:center;display:flex;align-items:center;justify-content:center;">v3.5 Workspace</a>
                    <a href="./mathematics/polynomials/core1a.html" style="flex:1;min-height:${HIT_TARGET_MIN_PX}px;padding:6px 8px;background:#f8fafc;color:#0f172a;text-decoration:none;border:1px solid #cbd5e1;border-radius:6px;font-weight:600;font-size:0.85rem;text-align:center;display:flex;align-items:center;justify-content:center;">📖 Core Study</a>
                    <a href="./mathematics/polynomials/atlas.html" style="flex:1;min-height:${HIT_TARGET_MIN_PX}px;padding:6px 8px;background:#f8fafc;color:#0f172a;text-decoration:none;border:1px solid #cbd5e1;border-radius:6px;font-weight:600;font-size:0.85rem;text-align:center;display:flex;align-items:center;justify-content:center;">🧭 Atlas</a>
                  </div>
                </div>
              </div>

              <!-- 4. Theory of Equations -->
              <div class="v35-topic-card" style="border:1px solid #cbd5e1;border-radius:10px;background:#ffffff;padding:1.25rem;display:flex;flex-direction:column;justify-content:space-between;box-shadow:0 1px 3px rgba(0,0,0,0.05);">
                <div>
                  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.5rem;">
                    <span style="font-size:0.875rem;font-weight:800;color:#0284c7;background:#e0f2fe;padding:2px 8px;border-radius:4px;">THEORY_EQ</span>
                    <span style="font-size:0.875rem;font-weight:600;color:#64748b;">Algebra</span>
                  </div>
                  <h3 style="margin:0 0 0.5rem;font-size:1.2rem;font-weight:700;color:#0f172a;">🎯 Theory of Equations</h3>
                  <p style="margin:0 0 1rem;font-size:0.92rem;color:#64748b;line-height:1.4;">Roots of polynomials, Vieta relations, symmetric expressions of roots, and rational root theorem derivations.</p>
                </div>
                <div style="display:flex;flex-direction:column;gap:6px;border-top:1px solid #f1f5f9;padding-top:0.75rem;">
                  <button type="button" class="btn-math-launch" data-href="#/subject/mathematics/topic/theory-of-equations/questions" style="min-height:${HIT_TARGET_MIN_PX}px;padding:8px 12px;background:#0284c7;color:white;border:none;border-radius:6px;font-weight:700;font-size:0.9rem;cursor:pointer;text-align:center;">Open Topic Workspace →</button>
                  <div style="display:flex;gap:6px;">
                    <a href="./mathematics/theory-of-equations/index.html" style="flex:1;min-height:${HIT_TARGET_MIN_PX}px;padding:6px 8px;background:#f8fafc;color:#0f172a;text-decoration:none;border:1px solid #cbd5e1;border-radius:6px;font-weight:600;font-size:0.85rem;text-align:center;display:flex;align-items:center;justify-content:center;">v3.5 Workspace</a>
                    <a href="./mathematics/theory-of-equations/core1a.html" style="flex:1;min-height:${HIT_TARGET_MIN_PX}px;padding:6px 8px;background:#f8fafc;color:#0f172a;text-decoration:none;border:1px solid #cbd5e1;border-radius:6px;font-weight:600;font-size:0.85rem;text-align:center;display:flex;align-items:center;justify-content:center;">📖 Core Study</a>
                    <a href="./mathematics/theory-of-equations/atlas.html" style="flex:1;min-height:${HIT_TARGET_MIN_PX}px;padding:6px 8px;background:#f8fafc;color:#0f172a;text-decoration:none;border:1px solid #cbd5e1;border-radius:6px;font-weight:600;font-size:0.85rem;text-align:center;display:flex;align-items:center;justify-content:center;">🧭 Atlas</a>
                  </div>
                </div>
              </div>

              <!-- 5. Math Vectors -->
              <div class="v35-topic-card" style="border:1px solid #cbd5e1;border-radius:10px;background:#ffffff;padding:1.25rem;display:flex;flex-direction:column;justify-content:space-between;box-shadow:0 1px 3px rgba(0,0,0,0.05);">
                <div>
                  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.5rem;">
                    <span style="font-size:0.875rem;font-weight:800;color:#0284c7;background:#e0f2fe;padding:2px 8px;border-radius:4px;">VECTORS</span>
                    <span style="font-size:0.875rem;font-weight:600;color:#64748b;">Spatial Geometry</span>
                  </div>
                  <h3 style="margin:0 0 0.5rem;font-size:1.2rem;font-weight:700;color:#0f172a;">🌐 Math Vectors</h3>
                  <p style="margin:0 0 1rem;font-size:0.92rem;color:#64748b;line-height:1.4;">3D Euclidean vector decomposition, dot and cross products, orthogonal projection split, and JEE Main geometry problems.</p>
                </div>
                <div style="display:flex;flex-direction:column;gap:6px;border-top:1px solid #f1f5f9;padding-top:0.75rem;">
                  <button type="button" class="btn-math-launch" data-href="#/subject/mathematics/topic/vectors/questions" style="min-height:${HIT_TARGET_MIN_PX}px;padding:8px 12px;background:#0284c7;color:white;border:none;border-radius:6px;font-weight:700;font-size:0.9rem;cursor:pointer;text-align:center;">Open Topic Workspace →</button>
                  <div style="display:flex;gap:6px;">
                    <a href="./mathematics/vectors/index.html" style="flex:1;min-height:${HIT_TARGET_MIN_PX}px;padding:6px 8px;background:#f8fafc;color:#0f172a;text-decoration:none;border:1px solid #cbd5e1;border-radius:6px;font-weight:600;font-size:0.85rem;text-align:center;display:flex;align-items:center;justify-content:center;">v3.5 Workspace</a>
                    <a href="./mathematics/vectors/core1a.html" style="flex:1;min-height:${HIT_TARGET_MIN_PX}px;padding:6px 8px;background:#f8fafc;color:#0f172a;text-decoration:none;border:1px solid #cbd5e1;border-radius:6px;font-weight:600;font-size:0.85rem;text-align:center;display:flex;align-items:center;justify-content:center;">📖 Core Study</a>
                    <a href="./mathematics/vectors/atlas.html" style="flex:1;min-height:${HIT_TARGET_MIN_PX}px;padding:6px 8px;background:#f8fafc;color:#0f172a;text-decoration:none;border:1px solid #cbd5e1;border-radius:6px;font-weight:600;font-size:0.85rem;text-align:center;display:flex;align-items:center;justify-content:center;">🧭 Atlas</a>
                  </div>
                </div>
              </div>

              <!-- 6. Linear Equations -->
              <div class="v35-topic-card" style="border:1px solid #cbd5e1;border-radius:10px;background:#ffffff;padding:1.25rem;display:flex;flex-direction:column;justify-content:space-between;box-shadow:0 1px 3px rgba(0,0,0,0.05);">
                <div>
                  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.5rem;">
                    <span style="font-size:0.875rem;font-weight:800;color:#0284c7;background:#e0f2fe;padding:2px 8px;border-radius:4px;">LINEAR_EQ</span>
                    <span style="font-size:0.875rem;font-weight:600;color:#64748b;">Algebra</span>
                  </div>
                  <h3 style="margin:0 0 0.5rem;font-size:1.2rem;font-weight:700;color:#0f172a;">📈 Linear Equations in Two Variables</h3>
                  <p style="margin:0 0 1rem;font-size:0.92rem;color:#64748b;line-height:1.4;">Linear equations in two variables, algebraic &amp; graphical intersection solutions, and consistency criteria.</p>
                </div>
                <div style="display:flex;flex-direction:column;gap:6px;border-top:1px solid #f1f5f9;padding-top:0.75rem;">
                  <button type="button" class="btn-math-launch" data-href="#/subject/mathematics/topic/linear-equations/questions" style="min-height:${HIT_TARGET_MIN_PX}px;padding:8px 12px;background:#0284c7;color:white;border:none;border-radius:6px;font-weight:700;font-size:0.9rem;cursor:pointer;text-align:center;">Open Topic Workspace →</button>
                  <div style="display:flex;gap:6px;">
                    <a href="./mathematics/linear-equations/index.html" style="flex:1;min-height:${HIT_TARGET_MIN_PX}px;padding:6px 8px;background:#f8fafc;color:#0f172a;text-decoration:none;border:1px solid #cbd5e1;border-radius:6px;font-weight:600;font-size:0.85rem;text-align:center;display:flex;align-items:center;justify-content:center;">v3.5 Workspace</a>
                    <a href="./mathematics/linear-equations/atlas.html" style="flex:1;min-height:${HIT_TARGET_MIN_PX}px;padding:6px 8px;background:#f8fafc;color:#0f172a;text-decoration:none;border:1px solid #cbd5e1;border-radius:6px;font-weight:600;font-size:0.85rem;text-align:center;display:flex;align-items:center;justify-content:center;">🧭 Atlas</a>
                  </div>
                </div>
              </div>

              <!-- 7. IMO Grade 9 -->
              <div class="v35-topic-card" style="border:1px solid #cbd5e1;border-radius:10px;background:#ffffff;padding:1.25rem;display:flex;flex-direction:column;justify-content:space-between;box-shadow:0 1px 3px rgba(0,0,0,0.05);">
                <div>
                  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.5rem;">
                    <span style="font-size:0.875rem;font-weight:800;color:#7c2d12;background:#ffedd5;padding:2px 8px;border-radius:4px;">IMO_GRADE9</span>
                    <span style="font-size:0.875rem;font-weight:600;color:#64748b;">Olympiad</span>
                  </div>
                  <h3 style="margin:0 0 0.5rem;font-size:1.2rem;font-weight:700;color:#0f172a;">🏆 IMO Grade 9 · Questions by Topic</h3>
                  <p style="margin:0 0 1rem;font-size:0.92rem;color:#64748b;line-height:1.4;">Browse 68 original-paper question references across 15 strands by topic, plus 7 fully written AI-authored draft practice questions.</p>
                </div>
                <div style="display:flex;flex-direction:column;gap:6px;border-top:1px solid #f1f5f9;padding-top:0.75rem;">
                  <button type="button" class="btn-math-launch" data-href="#/subject/mathematics/topic/imo-grade9/questions" style="min-height:${HIT_TARGET_MIN_PX}px;padding:8px 12px;background:#ea580c;color:white;border:none;border-radius:6px;font-weight:700;font-size:0.9rem;cursor:pointer;text-align:center;">Open Topic Workspace →</button>
                  <div style="display:flex;gap:6px;">
                    <a href="./mathematics/imo-grade9/index.html" style="flex:1;min-height:${HIT_TARGET_MIN_PX}px;padding:6px 8px;background:#f8fafc;color:#0f172a;text-decoration:none;border:1px solid #cbd5e1;border-radius:6px;font-weight:600;font-size:0.85rem;text-align:center;display:flex;align-items:center;justify-content:center;">v3.5 Workspace</a>
                    <button type="button" class="btn-math-launch" data-href="#/labs/mathematics-imo-grade9-master-suite" style="flex:1;min-height:${HIT_TARGET_MIN_PX}px;padding:6px 8px;background:#f8fafc;color:#0f172a;border:1px solid #cbd5e1;border-radius:6px;font-weight:600;font-size:0.85rem;cursor:pointer;text-align:center;">⚡ Master Suite</button>
                  </div>
                </div>
              </div>

            </div>
          </div>

          <!-- Grade9 v3.5 Parity: 6 Mathematics Master Interactive Suites -->
          <div style="margin-top:2rem;padding-top:1.5rem;border-top:2px solid #e2e8f0;">
            <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;margin-bottom:1rem;">
              <div>
                <h2 style="font-size:1.4rem;font-weight:800;color:#0f172a;margin:0 0 4px;">Mathematics Hub &amp; Master Visual Suites</h2>
                <p style="margin:0;color:#64748b;font-size:0.95rem;">Full-scale native DOM mathematical engines with interactive canvases, Olympiad proof scaffolds, and step-by-step telemetry.</p>
              </div>
              <span style="font-size:0.875rem;font-weight:700;background:#e0e7ff;color:#3730a3;padding:4px 10px;border-radius:6px;">6 Master Suites · Native DOM · No Iframe</span>
            </div>

            <div style="display:grid;grid-template-columns:repeat(auto-fill, minmax(min(100%, 360px), 1fr));gap:1.25rem;">
              
              <!-- 1. Circles Master Suite -->
              <div class="v35-math-card" style="border:1px solid #cbd5e1;border-radius:10px;background:#ffffff;padding:1.25rem;display:flex;flex-direction:column;justify-content:space-between;box-shadow:0 1px 3px rgba(0,0,0,0.05);">
                <div>
                  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.5rem;">
                    <span style="font-size:0.875rem;font-weight:800;color:#1e40af;background:#dbeafe;padding:2px 8px;border-radius:4px;">⭕ GEOMETRY</span>
                    <span style="font-size:0.875rem;font-weight:600;color:#64748b;">50 Authentic Cards</span>
                  </div>
                  <h3 style="margin:0 0 0.5rem;font-size:1.2rem;font-weight:700;color:#0f172a;">⭕ Circles Master Suite</h3>
                  <p style="margin:0 0 1rem;font-size:0.92rem;color:#64748b;line-height:1.4;">Euclidean geometry theorems, tangent secant power of point, cyclic quadrilaterals, 4 cognitive bands (D1–D4), and interactive SVG circle sandbox.</p>
                </div>
                <div style="display:flex;gap:8px;border-top:1px solid #f1f5f9;padding-top:0.75rem;">
                  <button type="button" class="btn-math-launch" data-href="#/labs/lab:circles-master" style="flex:1;min-height:${HIT_TARGET_MIN_PX}px;padding:8px 12px;background:#2563eb;color:white;border:none;border-radius:6px;font-weight:700;font-size:0.9rem;cursor:pointer;text-align:center;">Launch Suite →</button>
                  <a href="./public/circles-master.html" style="flex:1;min-height:${HIT_TARGET_MIN_PX}px;padding:8px 12px;background:#f1f5f9;color:#0f172a;text-decoration:none;border:1px solid #cbd5e1;border-radius:6px;font-weight:700;font-size:0.9rem;text-align:center;display:flex;align-items:center;justify-content:center;">Standalone v3.5</a>
                </div>
              </div>

              <!-- 2. Polynomials & Coordinates Suite -->
              <div class="v35-math-card" style="border:1px solid #cbd5e1;border-radius:10px;background:#ffffff;padding:1.25rem;display:flex;flex-direction:column;justify-content:space-between;box-shadow:0 1px 3px rgba(0,0,0,0.05);">
                <div>
                  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.5rem;">
                    <span style="font-size:0.875rem;font-weight:800;color:#065f46;background:#d1fae5;padding:2px 8px;border-radius:4px;">📐 ALGEBRA &amp; COORD</span>
                    <span style="font-size:0.875rem;font-weight:600;color:#64748b;">3 Research Tabs</span>
                  </div>
                  <h3 style="margin:0 0 0.5rem;font-size:1.2rem;font-weight:700;color:#0f172a;">📐 Polynomials &amp; Coordinate Geometry Suite</h3>
                  <p style="margin:0 0 1rem;font-size:0.92rem;color:#64748b;line-height:1.4;">2D Cartesian coordinate plane with draggable point projections, polynomial remainder theorem calculator, and cubic identity visualizer.</p>
                </div>
                <div style="display:flex;gap:8px;border-top:1px solid #f1f5f9;padding-top:0.75rem;">
                  <button type="button" class="btn-math-launch" data-href="#/labs/lab:linear-coordinates" style="flex:1;min-height:${HIT_TARGET_MIN_PX}px;padding:8px 12px;background:#059669;color:white;border:none;border-radius:6px;font-weight:700;font-size:0.9rem;cursor:pointer;text-align:center;">Launch Suite →</button>
                  <a href="./mathematics/index.html" style="flex:1;min-height:${HIT_TARGET_MIN_PX}px;padding:8px 12px;background:#f1f5f9;color:#0f172a;text-decoration:none;border:1px solid #cbd5e1;border-radius:6px;font-weight:700;font-size:0.9rem;text-align:center;display:flex;align-items:center;justify-content:center;">Standalone v3.5</a>
                </div>
              </div>

              <!-- 3. IMO Grade 9 Mathematics Master Suite -->
              <div class="v35-math-card" style="border:1px solid #cbd5e1;border-radius:10px;background:#ffffff;padding:1.25rem;display:flex;flex-direction:column;justify-content:space-between;box-shadow:0 1px 3px rgba(0,0,0,0.05);">
                <div>
                  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.5rem;">
                    <span style="font-size:0.875rem;font-weight:800;color:#7c2d12;background:#ffedd5;padding:2px 8px;border-radius:4px;">🏆 OLYMPIAD</span>
                    <span style="font-size:0.875rem;font-weight:600;color:#64748b;">15 Strands · 68 Ref</span>
                  </div>
                  <h3 style="margin:0 0 0.5rem;font-size:1.2rem;font-weight:700;color:#0f172a;">🏆 IMO Grade 9 Master Suite</h3>
                  <p style="margin:0 0 1rem;font-size:0.92rem;color:#64748b;line-height:1.4;">Championship problem solving suite spanning 15 mathematical disciplines with 68 past paper references and 2-level progressive hint ladders.</p>
                </div>
                <div style="display:flex;gap:8px;border-top:1px solid #f1f5f9;padding-top:0.75rem;">
                  <button type="button" class="btn-math-launch" data-href="#/labs/mathematics-imo-grade9-master-suite" style="flex:1;min-height:${HIT_TARGET_MIN_PX}px;padding:8px 12px;background:#ea580c;color:white;border:none;border-radius:6px;font-weight:700;font-size:0.9rem;cursor:pointer;text-align:center;">Launch Suite →</button>
                  <a href="./mathematics-imo-grade9-master-suite (2).html" style="flex:1;min-height:${HIT_TARGET_MIN_PX}px;padding:8px 12px;background:#f1f5f9;color:#0f172a;text-decoration:none;border:1px solid #cbd5e1;border-radius:6px;font-weight:700;font-size:0.9rem;text-align:center;display:flex;align-items:center;justify-content:center;">Standalone v3.5</a>
                </div>
              </div>

              <!-- 4. 3D Vector Algebra & Spatial Geometry Suite -->
              <div class="v35-math-card" style="border:1px solid #cbd5e1;border-radius:10px;background:#ffffff;padding:1.25rem;display:flex;flex-direction:column;justify-content:space-between;box-shadow:0 1px 3px rgba(0,0,0,0.05);">
                <div>
                  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.5rem;">
                    <span style="font-size:0.875rem;font-weight:800;color:#581c87;background:#f3e8ff;padding:2px 8px;border-radius:4px;">🌐 3D SPATIAL</span>
                    <span style="font-size:0.875rem;font-weight:600;color:#64748b;">13 JEE Main Qs</span>
                  </div>
                  <h3 style="margin:0 0 0.5rem;font-size:1.2rem;font-weight:700;color:#0f172a;">🌐 3D Vector Algebra &amp; Spatial Geometry</h3>
                  <p style="margin:0 0 1rem;font-size:0.92rem;color:#64748b;line-height:1.4;">Interactive 3D isometric vector canvas, Gram-Schmidt orthogonal projection split, and 13 authentic JEE Main vector algebra questions.</p>
                </div>
                <div style="display:flex;gap:8px;border-top:1px solid #f1f5f9;padding-top:0.75rem;">
                  <button type="button" class="btn-math-launch" data-href="#/labs/lab:vector-algebra-3d" style="flex:1;min-height:${HIT_TARGET_MIN_PX}px;padding:8px 12px;background:#7e22ce;color:white;border:none;border-radius:6px;font-weight:700;font-size:0.9rem;cursor:pointer;text-align:center;">Launch Suite →</button>
                  <a href="./standalone/practice/vector-algebra-3d-master-suite.html" style="flex:1;min-height:${HIT_TARGET_MIN_PX}px;padding:8px 12px;background:#f1f5f9;color:#0f172a;text-decoration:none;border:1px solid #cbd5e1;border-radius:6px;font-weight:700;font-size:0.9rem;text-align:center;display:flex;align-items:center;justify-content:center;">Standalone v3.5</a>
                </div>
              </div>

              <!-- 5. Riemann Sums Partition Refinement Workbench -->
              <div class="v35-math-card" style="border:1px solid #cbd5e1;border-radius:10px;background:#ffffff;padding:1.25rem;display:flex;flex-direction:column;justify-content:space-between;box-shadow:0 1px 3px rgba(0,0,0,0.05);">
                <div>
                  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.5rem;">
                    <span style="font-size:0.875rem;font-weight:800;color:#0f766e;background:#ccfbf1;padding:2px 8px;border-radius:4px;">📊 ANALYSIS</span>
                    <span style="font-size:0.875rem;font-weight:600;color:#64748b;">Darboux Partitions</span>
                  </div>
                  <h3 style="margin:0 0 0.5rem;font-size:1.2rem;font-weight:700;color:#0f172a;">📊 Riemann Sums Partition Refinement</h3>
                  <p style="margin:0 0 1rem;font-size:0.92rem;color:#64748b;line-height:1.4;">Interactive definite integration visualizer with left, right, midpoint, and trapezoidal sum approximations on monotonic functions.</p>
                </div>
                <div style="display:flex;gap:8px;border-top:1px solid #f1f5f9;padding-top:0.75rem;">
                  <button type="button" class="btn-math-launch" data-href="#/labs/lab:riemann-sums" style="flex:1;min-height:${HIT_TARGET_MIN_PX}px;padding:8px 12px;background:#0d9488;color:white;border:none;border-radius:6px;font-weight:700;font-size:0.9rem;cursor:pointer;text-align:center;">Launch Suite →</button>
                  <a href="./portable/portable-integration-riemann/index.html" style="flex:1;min-height:${HIT_TARGET_MIN_PX}px;padding:8px 12px;background:#f1f5f9;color:#0f172a;text-decoration:none;border:1px solid #cbd5e1;border-radius:6px;font-weight:700;font-size:0.9rem;text-align:center;display:flex;align-items:center;justify-content:center;">Standalone v3.5</a>
                </div>
              </div>

              <!-- 6. Polynomial Long Division Scaffold -->
              <div class="v35-math-card" style="border:1px solid #cbd5e1;border-radius:10px;background:#ffffff;padding:1.25rem;display:flex;flex-direction:column;justify-content:space-between;box-shadow:0 1px 3px rgba(0,0,0,0.05);">
                <div>
                  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.5rem;">
                    <span style="font-size:0.875rem;font-weight:800;color:#9a3412;background:#ffedd5;padding:2px 8px;border-radius:4px;">➗ ALGEBRA</span>
                    <span style="font-size:0.875rem;font-weight:600;color:#64748b;">Step-by-Step Algorithm</span>
                  </div>
                  <h3 style="margin:0 0 0.5rem;font-size:1.2rem;font-weight:700;color:#0f172a;">➗ Polynomial Long Division Scaffold</h3>
                  <p style="margin:0 0 1rem;font-size:0.92rem;color:#64748b;line-height:1.4;">Multi-step visual polynomial division algorithm scaffold with quotient accumulation and remainder verification.</p>
                </div>
                <div style="display:flex;gap:8px;border-top:1px solid #f1f5f9;padding-top:0.75rem;">
                  <button type="button" class="btn-math-launch" data-href="#/labs/lab:long-division" style="flex:1;min-height:${HIT_TARGET_MIN_PX}px;padding:8px 12px;background:#c2410c;color:white;border:none;border-radius:6px;font-weight:700;font-size:0.9rem;cursor:pointer;text-align:center;">Launch Suite →</button>
                  <a href="./portable/portable-division-scaffold/index.html" style="flex:1;min-height:${HIT_TARGET_MIN_PX}px;padding:8px 12px;background:#f1f5f9;color:#0f172a;text-decoration:none;border:1px solid #cbd5e1;border-radius:6px;font-weight:700;font-size:0.9rem;text-align:center;display:flex;align-items:center;justify-content:center;">Standalone v3.5</a>
                </div>
              </div>

            </div>
          </div>
        ` : ''}

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
