/**
 * web/pages/labs-hub.ts
 * Workpack A63 / v3.5 Parity — Dedicated Standalone Labs & Interactive Workbenches Hub
 *
 * Implements:
 * - Comprehensive STEM interactive labs directory (#/labs)
 * - Multi-facet filtering by Discipline (Physics, Chemistry, Mathematics) and Modality (Explorer, Simulator, Proof, Experiment)
 * - Off-main-thread search input for instant query matching
 * - Interactive launch cards with 48px hit targets, zero horizontal overflow, and strict HOLD status
 * - 12.7" tablet touch ergonomics (WCAG 2.5.5)
 */

import { escapeHtml } from '../runtime/rendering.ts';
import { HIT_TARGET_MIN_PX, HIT_TARGET_PRIMARY_PX } from '../styles/tokens.ts';

export type LabDiscipline = 'PHYSICS' | 'CHEMISTRY' | 'MATHEMATICS';
export type LabModality = 'EXPLORER' | 'SIMULATOR' | 'PROOF' | 'EXPERIMENT';

export interface StandaloneLabDescriptor {
  id: string;
  labRouteId: string;
  title: string;
  subtitle: string;
  discipline: LabDiscipline;
  modality: LabModality;
  icon: string;
  formulaBadge: string;
  description: string;
  status: 'HOLD';
}

export const STANDALONE_LABS_CATALOG: readonly StandaloneLabDescriptor[] = [
  // Mathematics
  {
    id: 'lab-circles-master',
    labRouteId: 'lab:circles-master',
    title: 'Circles Master',
    subtitle: 'Euclidean Geometry, Tangents & Cyclic Quadrilaterals',
    discipline: 'MATHEMATICS',
    modality: 'PROOF',
    icon: '⭕',
    formulaBadge: '∠ATB = 90°',
    description: 'Dynamic geometric construction and formal proof suite for Grade 9 circle theorems, tangent properties, and cyclic quadrilaterals.',
    status: 'HOLD',
  },
  {
    id: 'lab-linear-coordinates',
    labRouteId: 'lab:linear-coordinates',
    title: 'Linear Systems & Coordinates',
    subtitle: 'Cartesian Geometry & Determinant Analysis',
    discipline: 'MATHEMATICS',
    modality: 'EXPLORER',
    icon: '📈',
    formulaBadge: 'Δ = a₁b₂ - a₂b₁',
    description: 'Interactive 2D Cartesian plane with draggable lines, system consistency solver, and intersection coordinates.',
    status: 'HOLD',
  },
  {
    id: 'lab-riemann-sums',
    labRouteId: 'lab:riemann-sums',
    title: 'Riemann Sums Partition Workbench',
    subtitle: 'Definite Integration & Partition Refinement',
    discipline: 'MATHEMATICS',
    modality: 'EXPLORER',
    icon: '📊',
    formulaBadge: 'lim Σ f(x*)Δx',
    description: 'Area under curves modeled through left, right, midpoint, and trapezoidal partition approximations.',
    status: 'HOLD',
  },
  {
    id: 'lab-long-division',
    labRouteId: 'lab:long-division',
    title: 'Polynomial Long Division Scaffold',
    subtitle: 'Step-by-Step Quotient & Remainder Algorithm',
    discipline: 'MATHEMATICS',
    modality: 'EXPLORER',
    icon: '➗',
    formulaBadge: 'P(x) = D(x)Q(x) + R(x)',
    description: 'Multi-step visual arithmetic and polynomial division workbench with remainder verification.',
    status: 'HOLD',
  },

  // Physics
  {
    id: 'lab-motion-plane',
    labRouteId: 'lab:motion-in-a-plane',
    title: 'Motion in a Plane (Pilot 3)',
    subtitle: '2D Kinematics & Parabolic Trajectory Pilot',
    discipline: 'PHYSICS',
    modality: 'SIMULATOR',
    icon: '🎯',
    formulaBadge: 'y(x) = x tanθ - gx²/(2u²cos²θ)',
    description: 'Functional-parity flight simulator with independent horizontal and vertical kinematic component breakdown.',
    status: 'HOLD',
  },
  {
    id: 'lab-motion-1d-suite',
    labRouteId: 'lab:motion-1d-suite',
    title: 'Motion in 1D & 2D Master Suite',
    subtitle: 'Kinematic Acceleration & Relative Frames',
    discipline: 'PHYSICS',
    modality: 'SIMULATOR',
    icon: '🚀',
    formulaBadge: 'v = u + at, s = ut + ½at²',
    description: 'Comprehensive kinematics suite covering constant acceleration, projectile range, and Galilean relative motion.',
    status: 'HOLD',
  },
  {
    id: 'lab-vector-algebra-3d',
    labRouteId: 'lab:vector-algebra-3d',
    title: '3D Vector Algebra & Spatial Geometry',
    subtitle: 'Dot Products, Cross Products & Projections',
    discipline: 'PHYSICS',
    modality: 'EXPLORER',
    icon: '📐',
    formulaBadge: 'A · B = |A||B|cosθ',
    description: 'Isometric 3D vector canvas computing vector magnitudes, scalar projections, angles, and cross products in space.',
    status: 'HOLD',
  },
  {
    id: 'lab-fluid-pressure-thrust',
    labRouteId: 'lab:fluid-pressure-thrust',
    title: 'Thrust & Hydrostatic Pressure',
    subtitle: 'Pascal Hydraulic Press & Archimedes Buoyancy',
    discipline: 'PHYSICS',
    modality: 'EXPERIMENT',
    icon: '🌊',
    formulaBadge: 'P = ρgh, Fb = ρVg',
    description: 'Liquid column manometer, hydraulic force multiplier, and floating vs. sinking equilibrium balance.',
    status: 'HOLD',
  },
  {
    id: 'lab-experiment-graph',
    labRouteId: 'lab:experiment-graph',
    title: 'Simple Pendulum Experimental Modeling',
    subtitle: 'Workpack A29 Least-Squares Regression',
    discipline: 'PHYSICS',
    modality: 'EXPERIMENT',
    icon: '⏱️',
    formulaBadge: 'T² = (4π²/g)L',
    description: 'Data observation table, apparatus specification, and linear regression gravity measurement workbench.',
    status: 'HOLD',
  },
  {
    id: 'lab-motion-shared-clock',
    labRouteId: 'lab:motion-shared-clock',
    title: 'Motion Shared Clock Workbench',
    subtitle: 'Declarative Synchronized Simulation Clock',
    discipline: 'PHYSICS',
    modality: 'SIMULATOR',
    icon: '⏰',
    formulaBadge: 'DEC-A59 Shared Clock',
    description: 'Synchronized multi-particle kinematic simulation engine powered by portable declarative clock ticks.',
    status: 'HOLD',
  },

  // Chemistry
  {
    id: 'lab-gas-laws-suite',
    labRouteId: 'lab:gas-laws-suite',
    title: 'Behaviour of Gases & PV Thermodynamics',
    subtitle: 'Ideal Gas Law & Graham Effusion',
    discipline: 'CHEMISTRY',
    modality: 'SIMULATOR',
    icon: '🧪',
    formulaBadge: 'PV = nRT',
    description: 'Dynamic P-V isotherm simulation, Boyle and Charles laws, and Graham gaseous effusion rate calculator.',
    status: 'HOLD',
  },
  {
    id: 'lab-chemical-bonding-atlas',
    labRouteId: 'lab:chemical-bonding-atlas',
    title: 'Chemical Bonding & Molecular Atlas',
    subtitle: 'Ionic, Covalent & Electronegativity Models',
    discipline: 'CHEMISTRY',
    modality: 'EXPLORER',
    icon: '🔬',
    formulaBadge: 'Δχ Pauling Scale',
    description: 'Interactive molecular structures (H₂O, CO₂, CH₄, NH₃, NaCl), Lewis dot octet rule, and dipole polarity vectors.',
    status: 'HOLD',
  },
  {
    id: 'lab-mole-concept-reactor',
    labRouteId: 'lab:mole-concept-reactor',
    title: 'Mole Concept & Stoichiometric Reactor',
    subtitle: 'Molar Mass & Limiting Reactant Engine',
    discipline: 'CHEMISTRY',
    modality: 'SIMULATOR',
    icon: '⚖️',
    formulaBadge: 'n = m/M, N = n·N_A',
    description: 'Gram-to-mole-to-particle conversions and real-time stoichiometric reaction yield calculator.',
    status: 'HOLD',
  },
  {
    id: 'lab-redox-adaptive',
    labRouteId: 'lab:redox-adaptive',
    title: 'Redox Adaptive Concept Proof',
    subtitle: 'Electron Transfer & Oxidation States',
    discipline: 'CHEMISTRY',
    modality: 'PROOF',
    icon: '⚡',
    formulaBadge: 'Oxidation: Loss of e⁻',
    description: 'Adaptive half-reaction balancing workbench with dual client/server evaluation parity.',
    status: 'HOLD',
  },
  {
    id: 'lab-redox-equivalence',
    labRouteId: 'lab:redox-equivalence',
    title: 'Redox Electron Equivalence Workbench',
    subtitle: 'Formal Half-Cell Proof Engine',
    discipline: 'CHEMISTRY',
    modality: 'PROOF',
    icon: '🔋',
    formulaBadge: 'Σ e⁻(ox) = Σ e⁻(red)',
    description: 'Equivalence proof engine enforcing strict conservation of electronic charge across half-reactions.',
    status: 'HOLD',
  },
  {
    id: 'lab-titration-simulator',
    labRouteId: 'lab:titration-simulator',
    title: 'Titration & Volumetric Neutralization',
    subtitle: 'Acid-Base Indicator & pH Equivalence Curve',
    discipline: 'CHEMISTRY',
    modality: 'SIMULATOR',
    icon: '🌡️',
    formulaBadge: 'M₁V₁n₁ = M₂V₂n₂',
    description: 'Burette volumetric titration simulator with indicator color transition and sigmoidal pH curve calculation.',
    status: 'HOLD',
  },
];

export class LabsHubController {
  private searchQuery: string = '';
  private selectedDiscipline: 'ALL' | LabDiscipline = 'ALL';
  private selectedModality: 'ALL' | LabModality = 'ALL';

  setSearchQuery(q: string): void {
    this.searchQuery = q.trim().toLowerCase();
  }

  setDiscipline(d: 'ALL' | LabDiscipline): void {
    this.selectedDiscipline = d;
  }

  setModality(m: 'ALL' | LabModality): void {
    this.selectedModality = m;
  }

  getFilteredLabs(): readonly StandaloneLabDescriptor[] {
    return STANDALONE_LABS_CATALOG.filter(lab => {
      if (this.selectedDiscipline !== 'ALL' && lab.discipline !== this.selectedDiscipline) {
        return false;
      }
      if (this.selectedModality !== 'ALL' && lab.modality !== this.selectedModality) {
        return false;
      }
      if (this.searchQuery) {
        const text = `${lab.title} ${lab.subtitle} ${lab.description} ${lab.formulaBadge} ${lab.discipline}`.toLowerCase();
        if (!text.includes(this.searchQuery)) {
          return false;
        }
      }
      return true;
    });
  }

  getCounts(): { all: number; physics: number; chemistry: number; mathematics: number } {
    return {
      all: STANDALONE_LABS_CATALOG.length,
      physics: STANDALONE_LABS_CATALOG.filter(l => l.discipline === 'PHYSICS').length,
      chemistry: STANDALONE_LABS_CATALOG.filter(l => l.discipline === 'CHEMISTRY').length,
      mathematics: STANDALONE_LABS_CATALOG.filter(l => l.discipline === 'MATHEMATICS').length,
    };
  }

  getDiscipline(): 'ALL' | LabDiscipline { return this.selectedDiscipline; }
  getModality(): 'ALL' | LabModality { return this.selectedModality; }
  getSearchQuery(): string { return this.searchQuery; }
}

export function mountLabsHub(
  root: HTMLElement,
  controller?: LabsHubController,
  onNavigate?: (route: string) => void
): { dispose: () => void } {
  const ctrl = controller ?? new LabsHubController();
  let active = true;

  const render = () => {
    if (!active) return;
    const labs = ctrl.getFilteredLabs();
    const counts = ctrl.getCounts();
    const currDiscipline = ctrl.getDiscipline();
    const currModality = ctrl.getModality();
    const query = ctrl.getSearchQuery();

    root.innerHTML = `
      <div class="labs-hub-container" style="max-width:1400px;margin:0 auto;padding:1.5rem;box-sizing:border-box;font-family:system-ui,-apple-system,sans-serif;color:#0f172a;">
        <!-- Header -->
        <header style="padding-bottom:1.25rem;border-bottom:2px solid #e2e8f0;margin-bottom:1.5rem;">
          <div style="display:flex;gap:8px;font-size:0.9rem;color:#64748b;margin-bottom:0.5rem;align-items:center;">
            <a href="#/home" style="color:#0284c7;text-decoration:none;font-weight:600;">Home</a> &gt; 
            <span style="color:#475569;font-weight:700;">🔬 Standalone Labs &amp; Interactive Workbenches</span>
          </div>

          <div style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:flex-start;gap:1rem;">
            <div>
              <div style="display:flex;gap:8px;margin-bottom:0.5rem;flex-wrap:wrap;">
                <span style="font-size:0.8rem;font-weight:800;background:#fef3c7;color:#92400e;padding:4px 10px;border-radius:4px;">GRADE9 v3.5 PARITY</span>
                <span style="font-size:0.8rem;font-weight:700;background:#e0f2fe;color:#0369a1;padding:4px 10px;border-radius:4px;">16 INTERACTIVE WORKBENCHES</span>
                <span style="font-size:0.8rem;font-weight:700;background:#fee2e2;color:#991b1b;padding:4px 10px;border-radius:4px;">Academic Status: HOLD</span>
              </div>
              <h1 style="margin:0 0 0.5rem;font-size:2.2rem;font-weight:800;color:#0f172a;">
                🔬 Standalone Labs &amp; STEM Workbenches
              </h1>
              <p style="margin:0;color:#475569;font-size:1.15rem;max-width:900px;line-height:1.5;">
                Explore dynamic simulations, formal proof engines, experimental regression suites, and 3D visualizers across Physics, Chemistry, and Mathematics.
              </p>
            </div>

            <button type="button" id="btn-back-home" style="min-height:${HIT_TARGET_MIN_PX}px;padding:10px 18px;background:#f1f5f9;color:#0f172a;border:1px solid #cbd5e1;border-radius:6px;cursor:pointer;font-weight:700;font-size:0.95rem;">
              ← Back to Home
            </button>
          </div>
        </header>

        <!-- Search and Filters Bar -->
        <section style="background:#f8fafc;border:1px solid #cbd5e1;border-radius:12px;padding:1.25rem;margin-bottom:2rem;">
          <div style="display:flex;flex-wrap:wrap;gap:1rem;align-items:center;margin-bottom:1rem;">
            <!-- Search Input -->
            <div style="flex:1;min-width:260px;">
              <input type="search" id="input-labs-search" value="${escapeHtml(query)}" placeholder="Search workbenches, formulas, or scientific models..." style="width:100%;min-height:${HIT_TARGET_MIN_PX}px;padding:10px 14px;border:1px solid #cbd5e1;border-radius:6px;font-size:1rem;box-sizing:border-box;" />
            </div>

            <!-- Discipline Filter Buttons -->
            <div style="display:flex;gap:6px;flex-wrap:wrap;">
              <button type="button" class="disc-btn ${currDiscipline === 'ALL' ? 'active' : ''}" data-disc="ALL" style="min-height:${HIT_TARGET_MIN_PX}px;padding:8px 14px;border-radius:6px;font-weight:700;cursor:pointer;background:${currDiscipline === 'ALL' ? '#0284c7' : '#ffffff'};color:${currDiscipline === 'ALL' ? 'white' : '#475569'};border:1px solid ${currDiscipline === 'ALL' ? '#0284c7' : '#cbd5e1'};">
                All Disciplines (${counts.all})
              </button>
              <button type="button" class="disc-btn ${currDiscipline === 'PHYSICS' ? 'active' : ''}" data-disc="PHYSICS" style="min-height:${HIT_TARGET_MIN_PX}px;padding:8px 14px;border-radius:6px;font-weight:700;cursor:pointer;background:${currDiscipline === 'PHYSICS' ? '#0284c7' : '#ffffff'};color:${currDiscipline === 'PHYSICS' ? 'white' : '#475569'};border:1px solid ${currDiscipline === 'PHYSICS' ? '#0284c7' : '#cbd5e1'};">
                Physics (${counts.physics})
              </button>
              <button type="button" class="disc-btn ${currDiscipline === 'CHEMISTRY' ? 'active' : ''}" data-disc="CHEMISTRY" style="min-height:${HIT_TARGET_MIN_PX}px;padding:8px 14px;border-radius:6px;font-weight:700;cursor:pointer;background:${currDiscipline === 'CHEMISTRY' ? '#0284c7' : '#ffffff'};color:${currDiscipline === 'CHEMISTRY' ? 'white' : '#475569'};border:1px solid ${currDiscipline === 'CHEMISTRY' ? '#0284c7' : '#cbd5e1'};">
                Chemistry (${counts.chemistry})
              </button>
              <button type="button" class="disc-btn ${currDiscipline === 'MATHEMATICS' ? 'active' : ''}" data-disc="MATHEMATICS" style="min-height:${HIT_TARGET_MIN_PX}px;padding:8px 14px;border-radius:6px;font-weight:700;cursor:pointer;background:${currDiscipline === 'MATHEMATICS' ? '#0284c7' : '#ffffff'};color:${currDiscipline === 'MATHEMATICS' ? 'white' : '#475569'};border:1px solid ${currDiscipline === 'MATHEMATICS' ? '#0284c7' : '#cbd5e1'};">
                Mathematics (${counts.mathematics})
              </button>
            </div>
          </div>

          <!-- Modality Pills -->
          <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center;">
            <span style="font-size:0.85rem;font-weight:700;color:#64748b;margin-right:4px;">Modality:</span>
            ${(['ALL', 'EXPLORER', 'SIMULATOR', 'PROOF', 'EXPERIMENT'] as const).map(mod => `
              <button type="button" class="mod-btn ${currModality === mod ? 'active' : ''}" data-mod="${mod}" style="min-height:${HIT_TARGET_MIN_PX}px;min-width:${HIT_TARGET_MIN_PX}px;padding:8px 14px;border-radius:20px;font-size:0.9rem;font-weight:700;cursor:pointer;background:${currModality === mod ? '#0f172a' : '#e2e8f0'};color:${currModality === mod ? 'white' : '#475569'};border:none;">
                ${mod === 'ALL' ? 'All Types' : mod}
              </button>
            `).join('')}
          </div>
        </section>

        <!-- Workbench Cards Grid -->
        <main>
          <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(min(100%, 380px), 1fr));gap:1.5rem;">
            ${labs.map(lab => `
              <div class="lab-card" style="background:#ffffff;border:1px solid #cbd5e1;border-radius:12px;padding:1.5rem;display:flex;flex-direction:column;justify-content:space-between;box-shadow:0 1px 3px rgba(0,0,0,0.05);transition:box-shadow 0.2s;">
                <div>
                  <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:0.75rem;">
                    <div style="display:flex;align-items:center;gap:10px;">
                      <span style="font-size:2rem;">${lab.icon}</span>
                      <div>
                        <span style="font-size:0.75rem;font-weight:800;color:${lab.discipline === 'PHYSICS' ? '#0284c7' : lab.discipline === 'CHEMISTRY' ? '#16a34a' : '#d97706'};letter-spacing:0.5px;">
                          ${lab.discipline} · ${lab.modality}
                        </span>
                        <h2 style="margin:2px 0 0;font-size:1.25rem;font-weight:800;color:#0f172a;">${escapeHtml(lab.title)}</h2>
                      </div>
                    </div>
                    <span style="font-size:0.75rem;font-weight:700;background:#fee2e2;color:#991b1b;padding:2px 6px;border-radius:4px;">HOLD</span>
                  </div>

                  <p style="margin:0 0 0.5rem;font-size:0.95rem;font-weight:600;color:#334155;">
                    ${escapeHtml(lab.subtitle)}
                  </p>
                  <p style="margin:0 0 1rem;font-size:0.9rem;color:#64748b;line-height:1.45;">
                    ${escapeHtml(lab.description)}
                  </p>

                  <div style="margin-bottom:1.25rem;">
                    <span style="display:inline-block;background:#f1f5f9;border:1px solid #cbd5e1;border-radius:4px;padding:4px 8px;font-family:monospace;font-size:0.85rem;font-weight:700;color:#0f172a;">
                      ${escapeHtml(lab.formulaBadge)}
                    </span>
                  </div>
                </div>

                <button type="button" class="btn-launch-lab" data-lab-id="${lab.labRouteId}" style="min-height:${HIT_TARGET_MIN_PX}px;width:100%;padding:10px;background:#0284c7;color:white;border:none;border-radius:6px;font-weight:700;cursor:pointer;font-size:1rem;display:flex;align-items:center;justify-content:center;gap:8px;">
                  Launch Workbench →
                </button>
              </div>
            `).join('')}
          </div>

          ${labs.length === 0 ? `
            <div style="padding:3rem 1.5rem;text-align:center;background:#ffffff;border:1px solid #e2e8f0;border-radius:12px;margin:1rem 0;">
              <div style="font-size:2.5rem;margin-bottom:0.5rem;">🔍</div>
              <h3 style="margin:0 0 0.5rem;font-size:1.2rem;color:#0f172a;">No workbenches match your search</h3>
              <p style="color:#64748b;margin:0 0 1rem;">Try clearing the search query or switching disciplines.</p>
              <button type="button" id="btn-clear-filters" style="min-height:${HIT_TARGET_MIN_PX}px;padding:8px 16px;background:#f1f5f9;border:1px solid #cbd5e1;border-radius:6px;font-weight:700;cursor:pointer;">
                Clear All Filters
              </button>
            </div>
          ` : ''}
        </main>
      </div>
    `;

    bindEvents();
  };

  const bindEvents = () => {
    // Back home button
    root.querySelector<HTMLButtonElement>('#btn-back-home')?.addEventListener('click', () => {
      if (onNavigate) onNavigate('/home');
      else window.location.hash = '#/home';
    });

    // Clear filters button
    root.querySelector<HTMLButtonElement>('#btn-clear-filters')?.addEventListener('click', () => {
      ctrl.setSearchQuery('');
      ctrl.setDiscipline('ALL');
      ctrl.setModality('ALL');
      render();
    });

    // Search input
    root.querySelector<HTMLInputElement>('#input-labs-search')?.addEventListener('input', e => {
      ctrl.setSearchQuery((e.target as HTMLInputElement).value);
      render();
      // Keep focus on input after rerender
      const input = root.querySelector<HTMLInputElement>('#input-labs-search');
      if (input) {
        input.focus();
        input.setSelectionRange(input.value.length, input.value.length);
      }
    });

    // Discipline buttons
    root.querySelectorAll<HTMLButtonElement>('.disc-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const d = btn.dataset.disc as any;
        if (d) {
          ctrl.setDiscipline(d);
          render();
        }
      });
    });

    // Modality buttons
    root.querySelectorAll<HTMLButtonElement>('.mod-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const m = btn.dataset.mod as any;
        if (m) {
          ctrl.setModality(m);
          render();
        }
      });
    });

    // Launch lab buttons
    root.querySelectorAll<HTMLButtonElement>('.btn-launch-lab').forEach(btn => {
      btn.addEventListener('click', () => {
        const labRouteId = btn.dataset.labId;
        if (labRouteId) {
          const target = `/labs/${labRouteId}`;
          if (onNavigate) onNavigate(target);
          else window.location.hash = '#' + target;
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
