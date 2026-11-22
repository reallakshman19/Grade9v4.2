/**
 * web/pages/chemistry-hub.ts
 * Grade9 v3.5 Parity — Chemistry Hub & Master Suite Ecosystem.
 *
 * Implements:
 * - Dedicated Chemistry Hub (#/chemistry and #/chemistry-hub) matching https://reallakshman19.github.io/Grade9v3.5/chemistry/index.html
 * - 4 Core Topic Workspaces (Chemical Bonding, Behaviour of Gases, Mole Concept, Redox Reactions)
 * - 4 Interactive Explorers & Master Visual Suites with top-level standalone launching (NO IFRAMES)
 * - Cross-navigation between v3.5 4-Core Hub and Wave 12 14-Adapter Syllabus Navigator (#/curriculum/chemistry)
 * - 12.7" tablet touch ergonomics (>= 48px hit targets, zero horizontal overflow)
 * - Academic status: HOLD (Formative Simulation Mode)
 *
 * No academic approval inferred from software validation.
 */

import { escapeHtml } from '../runtime/rendering.ts';
import { HIT_TARGET_MIN_PX, HIT_TARGET_PRIMARY_PX } from '../styles/tokens.ts';

export interface CoreTopicDescriptor {
  readonly id: string;
  readonly topicRouteId: string;
  readonly code: string;
  readonly title: string;
  readonly subtitle: string;
  readonly description: string;
  readonly badge: string;
  readonly standalonePath: string;
  readonly derivationPath: string;
}

export interface MasterSuiteDescriptor {
  readonly id: string;
  readonly title: string;
  readonly subtitle: string;
  readonly description: string;
  readonly badge: string;
  readonly canvasCount: number;
  readonly tabCount: number;
  readonly suiteUrl: string;
  readonly icon: string;
}

export const CORE_TOPICS: readonly CoreTopicDescriptor[] = [
  {
    id: 'chem-bonding',
    topicRouteId: 'subject/chemistry/topic/chem-bonding',
    code: 'BONDING',
    title: 'Chemical Bonding & Molecular Structure',
    subtitle: 'VSEPR 3D, Lewis formal charges, and dipole vector sums',
    description: 'Lewis formal charge accounting, 3D VSEPR electron geometry, dipole moment cancellation, PCl₅ axial elongation, and MOT energy crossover ladder.',
    badge: 'Core Study',
    standalonePath: './chemistry/bonding/index.html',
    derivationPath: './chemistry/bonding/core1a.html',
  },
  {
    id: 'chem-gases',
    topicRouteId: 'subject/chemistry/topic/chem-gases',
    code: 'GASES',
    title: 'Behaviour of Gases & Real Gas Thermodynamics',
    subtitle: 'Kinetic theory, Maxwell distributions, and van der Waals parameters',
    description: 'Ideal gas law (PV = nRT), Maxwell-Boltzmann speed distributions with area conservation, real particle halos (a vs b), compressibility factor Z, and Andrews isotherms.',
    badge: 'Core Study',
    standalonePath: './chemistry/gases/index.html',
    derivationPath: './chemistry/gases/core1a.html',
  },
  {
    id: 'chem-mole',
    topicRouteId: 'subject/chemistry/topic/chem-stoichiometry',
    code: 'MOLE',
    title: 'Mole Concept & Stoichiometry',
    subtitle: 'Particle counting, limiting reagents, and eudiometry tubes',
    description: 'Mass-to-mole-to-particle transformations, limiting reagent lock-and-key assembly, multi-step sequential reaction yields, concentration invariants, and eudiometry combustion.',
    badge: 'Core Study',
    standalonePath: './chemistry/some-basic-concepts/index.html',
    derivationPath: './chemistry/some-basic-concepts/core1a.html',
  },
  {
    id: 'chem-redox',
    topicRouteId: 'subject/chemistry/topic/chem-redox',
    code: 'REDOX',
    title: 'Redox Reactions & Electron Transfer',
    subtitle: 'Oxidation numbers, coupled half-cells, and electrochemical potential',
    description: 'Structure-aware oxidation state bookkeeping (CrO₅ butterfly exception), coupled electron conveyor, ion-electron balancing, n-factor matrix, and Galvanic cells.',
    badge: 'Core Study',
    standalonePath: './chemistry/redox/index.html',
    derivationPath: './chemistry/redox/core1a.html',
  },
];

export const MASTER_SUITES: readonly MasterSuiteDescriptor[] = [
  {
    id: 'suite-bonding',
    title: 'Chemical Bonding & Molecular Structure 3D Suite',
    subtitle: '7 Visual Tabs · 7 HTML5 Canvases · 3D VSEPR & MOT Rig',
    description: 'Lewis formal charges, 3D VSEPR electron repulsion, vectorial net dipole cancellation, PCl₅ axial elongation, and MOT 2s-2p mixing crossover ladder.',
    badge: 'Interactive Master Suite',
    canvasCount: 7,
    tabCount: 7,
    suiteUrl: './chemistry/bonding/explorers/chemical_bonding/index.html',
    icon: '🔬',
  },
  {
    id: 'suite-gases',
    title: 'Behaviour of Gases & Real Gases Master Suite',
    subtitle: '7 Visual Tabs · 7 HTML5 Canvases · Piston & Maxwell Rig',
    description: 'Piston-cylinder kinetic momentum, Maxwell-Boltzmann speed curves, real particle halos (sheath a vs excluded core b), compressibility Z vs P, and Andrews isotherms.',
    badge: 'Interactive Master Suite',
    canvasCount: 7,
    tabCount: 7,
    suiteUrl: './chemistry/gases/explorers/behaviour_of_gases/index.html',
    icon: '💨',
  },
  {
    id: 'suite-mole',
    title: 'Mole Concept & Stoichiometry Master Suite',
    subtitle: '7 Visual Tabs · 7 HTML5 Canvases · Lock & Key Assembly',
    description: 'Avogadro gear scale (n = m/M), limiting reagent lock-and-key animation, sequential reaction yield multiplier, concentration thermal invariants, and eudiometry tube.',
    badge: 'Interactive Master Suite',
    canvasCount: 7,
    tabCount: 7,
    suiteUrl: './chemistry/some-basic-concepts/explorers/mole_concept/index.html',
    icon: '⚖️',
  },
  {
    id: 'suite-redox',
    title: 'Redox Reactions & Electrochemistry Master Suite',
    subtitle: '8 Visual Tabs · 9 HTML5 Canvases · 74 Mapped JEE PYQs',
    description: 'Structure-aware oxidation bookkeeping, electron conveyor, ion-electron balancing, n-factor equivalence matrix, volumetric redox titration, and galvanic Daniell cell.',
    badge: 'Interactive Master Suite',
    canvasCount: 9,
    tabCount: 8,
    suiteUrl: './chemistry/redox/explorers/redox_reactions/index.html',
    icon: '⚡',
  },
];

export class ChemistryHubController {
  private activeFilter: 'ALL' | 'CORE' | 'SUITES' = 'ALL';

  setFilter(f: 'ALL' | 'CORE' | 'SUITES'): void {
    this.activeFilter = f;
  }

  getFilter(): 'ALL' | 'CORE' | 'SUITES' {
    return this.activeFilter;
  }

  getCoreTopics(): readonly CoreTopicDescriptor[] {
    return CORE_TOPICS;
  }

  getMasterSuites(): readonly MasterSuiteDescriptor[] {
    return MASTER_SUITES;
  }
}

export function mountChemistryHub(
  root: HTMLElement,
  controller?: ChemistryHubController,
  onNavigate?: (route: string) => void
): { dispose: () => void } {
  const ctrl = controller ?? new ChemistryHubController();
  let active = true;

  const navigateTo = (route: string) => {
    if (onNavigate) {
      onNavigate(route);
    } else {
      window.location.hash = '#' + (route.startsWith('/') ? route : '/' + route);
    }
  };

  const launchStandaloneSuite = (url: string) => {
    // Top-level direct navigation with NO IFRAME as required
    window.location.href = url;
  };

  const render = () => {
    if (!active) return;
    const filter = ctrl.getFilter();
    const showCore = filter === 'ALL' || filter === 'CORE';
    const showSuites = filter === 'ALL' || filter === 'SUITES';

    root.innerHTML = `
      <div class="chemistry-hub-page" style="max-width:1440px;margin:0 auto;padding:1.5rem;box-sizing:border-box;font-family:system-ui,-apple-system,sans-serif;color:#0f172a;">
        <!-- Breadcrumb & Governance Banner -->
        <nav aria-label="Breadcrumb" style="display:flex;gap:8px;font-size:0.95rem;color:#64748b;margin-bottom:0.75rem;flex-wrap:wrap;align-items:center;">
          <a href="#/home" style="color:#0284c7;text-decoration:none;font-weight:600;min-height:36px;display:inline-flex;align-items:center;">Home</a> &gt; 
          <a href="#/subject/chemistry" style="color:#0284c7;text-decoration:none;font-weight:600;min-height:36px;display:inline-flex;align-items:center;">Chemistry</a> &gt; 
          <span style="font-weight:700;color:#0f172a;min-height:36px;display:inline-flex;align-items:center;">Chemistry Hub (v3.5 Parity)</span>
        </nav>

        <div style="background:#fef3c7;border:1px solid #fde68a;border-radius:8px;padding:0.75rem 1.25rem;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;margin-bottom:1.5rem;">
          <div style="display:flex;align-items:center;gap:10px;">
            <span style="font-size:1.25rem;">⚠️</span>
            <div style="font-size:0.9rem;color:#92400e;line-height:1.4;">
              <strong>Academic Status: HOLD</strong> · Formative Simulation &amp; Exploration Mode. Grade9 v3.5 Parity Candidate.
            </div>
          </div>
          <button type="button" id="btn-toggle-curriculum" style="min-height:${HIT_TARGET_MIN_PX}px;padding:8px 16px;background:#0f172a;color:#ffffff;border:none;border-radius:6px;font-weight:700;font-size:0.875rem;cursor:pointer;">
            Full 14-Adapter Syllabus (C01–C14) →
          </button>
        </div>

        <!-- Hero Section -->
        <header style="background:linear-gradient(135deg, #0f172a 0%, #1e293b 100%);color:white;border-radius:12px;padding:2rem;margin-bottom:2rem;box-shadow:0 4px 16px rgba(0,0,0,0.12);">
          <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:1.5rem;">
            <div>
              <div style="display:flex;gap:10px;align-items:center;margin-bottom:8px;">
                <span style="font-size:0.875rem;font-weight:800;background:#0284c7;color:white;padding:3px 10px;border-radius:4px;letter-spacing:0.04em;">GRADE9 V3.5 PARITY</span>
                <span style="font-size:0.875rem;font-weight:700;background:#334155;color:#e2e8f0;padding:3px 10px;border-radius:4px;">4 CORE WORKSPACES · 4 MASTER SUITES</span>
              </div>
              <h1 style="margin:0 0 0.5rem;font-size:2.2rem;font-weight:800;letter-spacing:-0.02em;">🧪 Chemistry Hub</h1>
              <p style="margin:0;color:#94a3b8;font-size:1.1rem;max-width:850px;line-height:1.5;">
                Select a topic workspace with Core 1A derivations or launch a visual simulation master suite. High-fidelity adoption from Grade9v3.5.
              </p>
            </div>
            <div style="display:flex;flex-direction:column;gap:8px;">
              <button type="button" id="btn-open-static-hub" style="min-height:${HIT_TARGET_PRIMARY_PX}px;padding:10px 20px;background:#0284c7;color:white;border:none;border-radius:8px;font-weight:700;font-size:0.95rem;cursor:pointer;display:inline-flex;align-items:center;gap:8px;">
                <span>⚡ Open Standalone Static Hub</span>
                <span>↗</span>
              </button>
            </div>
          </div>

          <!-- Filter Pills -->
          <div style="display:flex;gap:8px;margin-top:1.5rem;flex-wrap:wrap;">
            <button type="button" class="filter-btn" data-filter="ALL" style="min-height:${HIT_TARGET_MIN_PX}px;padding:8px 16px;border-radius:6px;font-weight:700;font-size:0.9rem;cursor:pointer;background:${filter === 'ALL' ? '#38bdf8' : '#334155'};color:${filter === 'ALL' ? '#0f172a' : '#ffffff'};border:none;">
              All Modules (${CORE_TOPICS.length + MASTER_SUITES.length})
            </button>
            <button type="button" class="filter-btn" data-filter="CORE" style="min-height:${HIT_TARGET_MIN_PX}px;padding:8px 16px;border-radius:6px;font-weight:700;font-size:0.9rem;cursor:pointer;background:${filter === 'CORE' ? '#38bdf8' : '#334155'};color:${filter === 'CORE' ? '#0f172a' : '#ffffff'};border:none;">
              Core Topic Workspaces (${CORE_TOPICS.length})
            </button>
            <button type="button" class="filter-btn" data-filter="SUITES" style="min-height:${HIT_TARGET_MIN_PX}px;padding:8px 16px;border-radius:6px;font-weight:700;font-size:0.9rem;cursor:pointer;background:${filter === 'SUITES' ? '#38bdf8' : '#334155'};color:${filter === 'SUITES' ? '#0f172a' : '#ffffff'};border:none;">
              Interactive Master Suites (${MASTER_SUITES.length})
            </button>
          </div>
        </header>

        ${showCore ? `
          <!-- Section 1: Core Topic Workspaces -->
          <section style="margin-bottom:2.5rem;">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem;flex-wrap:wrap;gap:8px;">
              <div>
                <h2 style="margin:0;font-size:1.45rem;font-weight:800;color:#0f172a;">Core Topic Workspaces</h2>
                <p style="margin:4px 0 0;font-size:0.95rem;color:#64748b;">Authentic curriculum workspaces with Core 1A derivations and question practice.</p>
              </div>
            </div>

            <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(min(100%, 340px), 1fr));gap:1.5rem;">
              ${CORE_TOPICS.map(t => `
                <div class="topic-card" style="background:#ffffff;border:1px solid #cbd5e1;border-radius:12px;padding:1.5rem;display:flex;flex-direction:column;justify-content:space-between;box-shadow:0 1px 3px rgba(0,0,0,0.05);transition:transform 0.15s ease, box-shadow 0.15s ease;">
                  <div>
                    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.75rem;">
                      <span style="font-size:0.875rem;font-weight:800;background:#e0f2fe;color:#0369a1;padding:3px 8px;border-radius:4px;">${escapeHtml(t.badge)}</span>
                      <span style="font-size:0.875rem;font-weight:700;color:#64748b;">${escapeHtml(t.code)}</span>
                    </div>
                    <h3 style="margin:0 0 0.5rem;font-size:1.25rem;font-weight:800;color:#0f172a;">${escapeHtml(t.title)}</h3>
                    <p style="margin:0 0 1rem;font-size:0.9rem;color:#475569;line-height:1.5;">${escapeHtml(t.description)}</p>
                  </div>
                  <div style="display:flex;flex-direction:column;gap:8px;margin-top:1rem;padding-top:1rem;border-top:1px solid #f1f5f9;">
                    <button type="button" class="btn-open-topic" data-route="${t.topicRouteId}" style="min-height:${HIT_TARGET_MIN_PX}px;padding:8px 16px;background:#0284c7;color:white;border:none;border-radius:6px;font-weight:700;font-size:0.9rem;cursor:pointer;display:flex;justify-content:space-between;align-items:center;">
                      <span>Open Topic Workspace</span>
                      <span>→</span>
                    </button>
                    <div style="display:flex;gap:8px;">
                      <button type="button" class="btn-open-derivation" data-url="${t.derivationPath}" style="flex:1;min-height:${HIT_TARGET_MIN_PX}px;padding:6px 12px;background:#f8fafc;color:#0f172a;border:1px solid #cbd5e1;border-radius:6px;font-weight:600;font-size:0.875rem;cursor:pointer;">
                        📖 Core 1A Derivation
                      </button>
                      <button type="button" class="btn-open-standalone-topic" data-url="${t.standalonePath}" style="flex:1;min-height:${HIT_TARGET_MIN_PX}px;padding:6px 12px;background:#f8fafc;color:#0f172a;border:1px solid #cbd5e1;border-radius:6px;font-weight:600;font-size:0.875rem;cursor:pointer;">
                        ⚡ v3.5 Workspace
                      </button>
                    </div>
                  </div>
                </div>
              `).join('')}
            </div>
          </section>
        ` : ''}

        ${showSuites ? `
          <!-- Section 2: Interactive Explorers & Master Visual Suites -->
          <section style="margin-bottom:2.5rem;">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem;flex-wrap:wrap;gap:8px;">
              <div>
                <h2 style="margin:0;font-size:1.45rem;font-weight:800;color:#0f172a;">Interactive Explorers &amp; Visual Suites</h2>
                <p style="margin:4px 0 0;font-size:0.95rem;color:#64748b;">Full-featured simulation laboratories with live HTML5 canvases and authentic JEE question banks.</p>
              </div>
            </div>

            <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(min(100%, 340px), 1fr));gap:1.5rem;">
              ${MASTER_SUITES.map(s => `
                <div class="suite-card" style="background:#0f172a;color:white;border-radius:12px;padding:1.5rem;display:flex;flex-direction:column;justify-content:space-between;box-shadow:0 4px 12px rgba(0,0,0,0.15);border:1px solid #1e293b;">
                  <div>
                    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.75rem;">
                      <span style="font-size:0.875rem;font-weight:800;background:#7c3aed;color:white;padding:3px 8px;border-radius:4px;">${escapeHtml(s.badge)}</span>
                      <span style="font-size:1.3rem;">${s.icon}</span>
                    </div>
                    <h3 style="margin:0 0 0.4rem;font-size:1.3rem;font-weight:800;color:#f8fafc;">${escapeHtml(s.title)}</h3>
                    <div style="font-size:0.875rem;color:#38bdf8;font-weight:700;margin-bottom:0.75rem;">${escapeHtml(s.subtitle)}</div>
                    <p style="margin:0 0 1rem;font-size:0.9rem;color:#94a3b8;line-height:1.5;">${escapeHtml(s.description)}</p>
                  </div>
                  <div style="display:flex;flex-direction:column;gap:8px;margin-top:1rem;padding-top:1rem;border-top:1px solid #1e293b;">
                    <!-- Direct top-level navigation, strictly NO IFRAMES -->
                    <button type="button" class="btn-launch-suite" data-url="${s.suiteUrl}" style="min-height:${HIT_TARGET_PRIMARY_PX}px;padding:10px 18px;background:#0284c7;color:white;border:none;border-radius:6px;font-weight:800;font-size:0.95rem;cursor:pointer;display:flex;justify-content:space-between;align-items:center;">
                      <span>⚡ Launch Master Suite (Standalone)</span>
                      <span>↗</span>
                    </button>
                  </div>
                </div>
              `).join('')}
            </div>
          </section>
        ` : ''}

        <!-- Specialized Interactive Drills -->
        <section style="background:#f8fafc;border:1px solid #cbd5e1;border-radius:12px;padding:1.5rem;margin-top:1rem;">
          <h3 style="margin:0 0 0.5rem;font-size:1.2rem;font-weight:800;color:#0f172a;">Specialized Analytical &amp; Proof Workbenches</h3>
          <p style="margin:0 0 1rem;font-size:0.9rem;color:#64748b;">Direct access to calibrated diagnostic workbenches.</p>
          <div style="display:flex;flex-wrap:wrap;gap:12px;">
            <button type="button" id="btn-quick-redox-adaptive" style="min-height:${HIT_TARGET_MIN_PX}px;padding:8px 16px;background:#ffffff;border:1px solid #cbd5e1;color:#0f172a;border-radius:6px;font-weight:700;cursor:pointer;">
              ⚡ Redox Adaptive Hard-Concept Proof (A69 Pilot 2)
            </button>
            <button type="button" id="btn-quick-titration" style="min-height:${HIT_TARGET_MIN_PX}px;padding:8px 16px;background:#ffffff;border:1px solid #cbd5e1;color:#0f172a;border-radius:6px;font-weight:700;cursor:pointer;">
              🌡️ Volumetric Neutralization Titrator
            </button>
            <button type="button" id="btn-quick-redox-portable" style="min-height:${HIT_TARGET_MIN_PX}px;padding:8px 16px;background:#ffffff;border:1px solid #cbd5e1;color:#0f172a;border-radius:6px;font-weight:700;cursor:pointer;">
              🔋 Redox Electron Equivalence (DEC-A59)
            </button>
          </div>
        </section>
      </div>
    `;

    bindEvents();
  };

  const bindEvents = () => {
    // Toggle full curriculum button
    root.querySelector('#btn-toggle-curriculum')?.addEventListener('click', () => {
      navigateTo('curriculum/chemistry');
    });

    // Open static hub top-level button (NO IFRAME)
    root.querySelector('#btn-open-static-hub')?.addEventListener('click', () => {
      launchStandaloneSuite('./chemistry/index.html');
    });

    // Filter pills
    root.querySelectorAll<HTMLButtonElement>('.filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const f = btn.dataset.filter as any;
        if (f) {
          ctrl.setFilter(f);
          render();
        }
      });
    });

    // Open topic workspace
    root.querySelectorAll<HTMLButtonElement>('.btn-open-topic').forEach(btn => {
      btn.addEventListener('click', () => {
        const route = btn.dataset.route;
        if (route) navigateTo(route);
      });
    });

    // Open Core 1A derivation top-level
    root.querySelectorAll<HTMLButtonElement>('.btn-open-derivation').forEach(btn => {
      btn.addEventListener('click', () => {
        const url = btn.dataset.url;
        if (url) launchStandaloneSuite(url);
      });
    });

    // Open v3.5 topic workspace top-level
    root.querySelectorAll<HTMLButtonElement>('.btn-open-standalone-topic').forEach(btn => {
      btn.addEventListener('click', () => {
        const url = btn.dataset.url;
        if (url) launchStandaloneSuite(url);
      });
    });

    // Launch Master Suite top-level (NO IFRAME)
    root.querySelectorAll<HTMLButtonElement>('.btn-launch-suite').forEach(btn => {
      btn.addEventListener('click', () => {
        const url = btn.dataset.url;
        if (url) launchStandaloneSuite(url);
      });
    });

    // Specialized drills
    root.querySelector('#btn-quick-redox-adaptive')?.addEventListener('click', () => {
      navigateTo('labs/lab:redox-adaptive');
    });
    root.querySelector('#btn-quick-titration')?.addEventListener('click', () => {
      navigateTo('labs/lab:titration-simulator');
    });
    root.querySelector('#btn-quick-redox-portable')?.addEventListener('click', () => {
      navigateTo('labs/lab:redox-equivalence');
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
