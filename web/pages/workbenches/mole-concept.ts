/**
 * web/pages/workbenches/mole-concept.ts
 * Workpack A69 / v3.5 Parity — Mole Concept & Stoichiometric Reactor
 *
 * Implements:
 * - Mole calculations: n = m / M, N = n * N_A (N_A = 6.022e23), V_STP = n * 22.4 L
 * - Common compound molar mass library: H2O, CO2, NaCl, CaCO3, C6H12O6, H2SO4
 * - Stoichiometric reaction engine and limiting reactant determination
 * - 12.7" tablet touch ergonomics (>= 48px hit targets, zero horizontal overflow)
 * - Academic status: HOLD (Formative Simulation Mode)
 */

import { escapeHtml } from '../../runtime/rendering.ts';
import { HIT_TARGET_MIN_PX } from '../../styles/tokens.ts';

const NA = 6.02214076e23;

export interface CompoundEntry {
  formula: string;
  name: string;
  molarMass: number; // g/mol
}

export const COMMON_COMPOUNDS: readonly CompoundEntry[] = [
  { formula: 'H₂O', name: 'Water', molarMass: 18.015 },
  { formula: 'CO₂', name: 'Carbon Dioxide', molarMass: 44.01 },
  { formula: 'NaCl', name: 'Sodium Chloride', molarMass: 58.44 },
  { formula: 'CaCO₃', name: 'Calcium Carbonate', molarMass: 100.09 },
  { formula: 'C₆H₁₂O₆', name: 'Glucose', molarMass: 180.16 },
  { formula: 'H₂SO₄', name: 'Sulfuric Acid', molarMass: 98.08 },
];

export class MoleConceptController {
  private selectedFormula: string = 'H₂O';
  private inputMassG: number = 36.03; // g (approx 2 moles H2O)

  // Stoichiometry Reaction: 2 H2 + O2 -> 2 H2O
  private massH2: number = 4.0;  // g
  private massO2: number = 32.0; // g

  getSelectedCompound(): CompoundEntry {
    return COMMON_COMPOUNDS.find(c => c.formula === this.selectedFormula) || COMMON_COMPOUNDS[0];
  }

  selectCompound(formula: string): void {
    if (COMMON_COMPOUNDS.some(c => c.formula === formula)) {
      this.selectedFormula = formula;
    }
  }

  setInputMass(m: number): void {
    this.inputMassG = Math.max(0, m);
  }

  getInputMass(): number {
    return this.inputMassG;
  }

  getMoleResults(): { moles: number; particles: number; volumeStpL: number } {
    const c = this.getSelectedCompound();
    const moles = this.inputMassG / c.molarMass;
    const particles = moles * NA;
    const volumeStpL = moles * 22.414;
    return { moles, particles, volumeStpL };
  }

  setStoichiometryInputs(massH2: number, massO2: number): void {
    this.massH2 = Math.max(0, massH2);
    this.massO2 = Math.max(0, massO2);
  }

  getStoichiometryInputs(): { massH2: number; massO2: number } {
    return { massH2: this.massH2, massO2: this.massO2 };
  }

  getStoichiometryResults(): {
    molH2: number;
    molO2: number;
    limitingReagent: 'H₂' | 'O₂' | 'EXACT_EQUIVALENCE';
    yieldWaterMoles: number;
    yieldWaterGrams: number;
    excessMoles: number;
  } {
    const mmH2 = 2.016;
    const mmO2 = 31.998;
    const mmH2O = 18.015;

    const molH2 = this.massH2 / mmH2;
    const molO2 = this.massO2 / mmO2;

    // Reaction: 2 H2 + 1 O2 -> 2 H2O
    // Requires 2 mol H2 per 1 mol O2
    const neededO2ForH2 = molH2 / 2;

    let limitingReagent: 'H₂' | 'O₂' | 'EXACT_EQUIVALENCE' = 'EXACT_EQUIVALENCE';
    let yieldWaterMoles = 0;
    let excessMoles = 0;

    if (molO2 > neededO2ForH2 + 1e-6) {
      limitingReagent = 'H₂';
      yieldWaterMoles = molH2;
      excessMoles = molO2 - neededO2ForH2;
    } else if (molO2 < neededO2ForH2 - 1e-6) {
      limitingReagent = 'O₂';
      yieldWaterMoles = molO2 * 2;
      excessMoles = molH2 - molO2 * 2;
    } else {
      limitingReagent = 'EXACT_EQUIVALENCE';
      yieldWaterMoles = molH2;
      excessMoles = 0;
    }

    const yieldWaterGrams = yieldWaterMoles * mmH2O;
    return { molH2, molO2, limitingReagent, yieldWaterMoles, yieldWaterGrams, excessMoles };
  }
}

export function mountMoleConceptWorkbench(
  root: HTMLElement,
  controller?: MoleConceptController,
  onNavigate?: (route: string) => void
): { dispose: () => void } {
  const ctrl = controller ?? new MoleConceptController();
  let active = true;

  const render = () => {
    if (!active) return;
    const comp = ctrl.getSelectedCompound();
    const mass = ctrl.getInputMass();
    const moleRes = ctrl.getMoleResults();
    const stoichIn = ctrl.getStoichiometryInputs();
    const stoichRes = ctrl.getStoichiometryResults();

    root.innerHTML = `
      <div class="mole-concept-container" style="max-width:1400px;margin:0 auto;padding:1.5rem;box-sizing:border-box;font-family:var(--g9-font-family, system-ui,-apple-system,sans-serif);color:#0f172a;">
        <header style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:1rem;padding-bottom:1.25rem;border-bottom:2px solid #e2e8f0;margin-bottom:1.5rem;">
          <div>
            <div style="display:flex;gap:8px;font-size:0.9rem;color:#64748b;margin-bottom:0.25rem;">
              <a href="#/labs" style="color:#0284c7;text-decoration:none;font-weight:600;">Standalone Labs</a> &gt; 
              <span>Mole Concept &amp; Stoichiometry</span>
            </div>
            <div style="display:flex;gap:8px;align-items:center;">
              <span style="font-size:0.875rem;font-weight:800;background:#e0f2fe;color:#0369a1;padding:3px 8px;border-radius:4px;">CHEMISTRY QUANTITATIVE WORKBENCH</span>
              <span style="font-size:0.875rem;font-weight:700;background:#fee2e2;color:#991b1b;padding:3px 8px;border-radius:4px;">Academic Status: HOLD</span>
            </div>
            <h1 style="margin:0.5rem 0 0;font-size:1.9rem;font-weight:800;color:#0f172a;">⚖️ Mole Concept &amp; Stoichiometric Reactor</h1>
          </div>
          <div style="display:flex;gap:8px;flex-wrap:wrap;">
            <button type="button" id="btn-launch-v35-suite" style="min-height:${HIT_TARGET_MIN_PX}px;padding:8px 18px;background:#0284c7;color:white;border:none;border-radius:6px;cursor:pointer;font-weight:700;">
              ⚡ Launch Full Master Suite (Standalone) →
            </button>
            <button type="button" id="btn-return-labs" style="min-height:${HIT_TARGET_MIN_PX}px;padding:8px 18px;background:#0f172a;color:white;border:none;border-radius:6px;cursor:pointer;font-weight:700;">
              ← Return to Labs Hub
            </button>
          </div>
        </header>

        <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(min(100%, 360px), 1fr));gap:2rem;">
          <!-- Section 1: Mole & Mass Converter -->
          <div>
            <div style="background:#ffffff;border:1px solid #cbd5e1;border-radius:12px;padding:1.5rem;margin-bottom:1.5rem;">
              <h3 style="margin:0 0 1rem;font-size:1.25rem;color:#0f172a;">Part 1: Mole &amp; Particle Converter</h3>

              <div style="margin-bottom:1rem;">
                <label style="display:block;font-size:0.875rem;font-weight:700;margin-bottom:6px;color:#475569;">Select Chemical Substance:</label>
                <div style="display:flex;flex-wrap:wrap;gap:6px;">
                  ${COMMON_COMPOUNDS.map(c => `
                    <button type="button" class="comp-btn ${c.formula === comp.formula ? 'active' : ''}" data-formula="${c.formula}" style="min-height:${HIT_TARGET_MIN_PX}px;padding:6px 12px;border-radius:6px;font-size:0.9rem;font-weight:700;cursor:pointer;background:${c.formula === comp.formula ? '#0284c7' : '#f1f5f9'};color:${c.formula === comp.formula ? 'white' : '#475569'};border:1px solid ${c.formula === comp.formula ? '#0284c7' : '#cbd5e1'};">
                      ${escapeHtml(c.formula)}
                    </button>
                  `).join('')}
                </div>
              </div>

              <div style="margin-bottom:1.25rem;">
                <label for="input-mass" style="display:block;font-weight:700;margin-bottom:6px;font-size:0.95rem;">
                  Sample Mass m (grams): <span style="color:#0284c7;">${mass} g</span>
                </label>
                <input type="range" id="input-mass" min="1" max="250" step="1" value="${mass}" style="width:100%;min-height:${HIT_TARGET_MIN_PX}px;" />
              </div>

              <div style="background:#f8fafc;border:1px solid #cbd5e1;border-radius:8px;padding:1rem;">
                <div style="font-weight:700;color:#0f172a;margin-bottom:6px;">
                  Calculations for ${escapeHtml(comp.name)} (M = ${comp.molarMass} g/mol):
                </div>
                <div style="display:flex;justify-content:space-between;margin-bottom:4px;">
                  <span style="color:#64748b;">Amount of Substance (n = m/M):</span>
                  <strong style="color:#0284c7;">${moleRes.moles.toFixed(3)} mol</strong>
                </div>
                <div style="display:flex;justify-content:space-between;margin-bottom:4px;">
                  <span style="color:#64748b;">Number of Particles (n × N_A):</span>
                  <strong style="color:#059669;">${moleRes.particles.toExponential(3)}</strong>
                </div>
                <div style="display:flex;justify-content:space-between;">
                  <span style="color:#64748b;">Gas Volume at STP (n × 22.4 L):</span>
                  <strong style="color:#d97706;">${moleRes.volumeStpL.toFixed(2)} L</strong>
                </div>
              </div>
            </div>
          </div>

          <!-- Section 2: Limiting Reactant Stoichiometric Engine -->
          <div>
            <div style="background:#ffffff;border:1px solid #cbd5e1;border-radius:12px;padding:1.5rem;">
              <h3 style="margin:0 0 0.5rem;font-size:1.25rem;color:#0f172a;">Part 2: Stoichiometric Reactor</h3>
              <div style="font-size:0.95rem;color:#0284c7;font-weight:700;margin-bottom:1rem;">
                Reaction: 2 H₂ (g) + O₂ (g) → 2 H₂O (l)
              </div>

              <div style="margin-bottom:1.25rem;">
                <label for="input-stoich-h2" style="display:block;font-weight:700;margin-bottom:6px;font-size:0.95rem;">
                  Mass of H₂ reactant (g): <span style="color:#0284c7;">${stoichIn.massH2} g</span>
                </label>
                <input type="range" id="input-stoich-h2" min="1" max="40" step="1" value="${stoichIn.massH2}" style="width:100%;min-height:${HIT_TARGET_MIN_PX}px;" />
              </div>

              <div style="margin-bottom:1.5rem;">
                <label for="input-stoich-o2" style="display:block;font-weight:700;margin-bottom:6px;font-size:0.95rem;">
                  Mass of O₂ reactant (g): <span style="color:#0284c7;">${stoichIn.massO2} g</span>
                </label>
                <input type="range" id="input-stoich-o2" min="2" max="100" step="2" value="${stoichIn.massO2}" style="width:100%;min-height:${HIT_TARGET_MIN_PX}px;" />
              </div>

              <div style="background:#f8fafc;border:1px solid #cbd5e1;border-radius:8px;padding:1rem;">
                <div style="font-weight:700;color:#0f172a;margin-bottom:6px;">Reactor Outcome:</div>
                <div style="display:flex;justify-content:space-between;margin-bottom:4px;">
                  <span style="color:#64748b;">Moles of H₂ available:</span>
                  <strong>${stoichRes.molH2.toFixed(2)} mol</strong>
                </div>
                <div style="display:flex;justify-content:space-between;margin-bottom:4px;">
                  <span style="color:#64748b;">Moles of O₂ available:</span>
                  <strong>${stoichRes.molO2.toFixed(2)} mol</strong>
                </div>
                <div style="display:flex;justify-content:space-between;margin-bottom:6px;padding-top:4px;border-top:1px solid #e2e8f0;">
                  <span style="color:#0f172a;font-weight:700;">Limiting Reagent:</span>
                  <strong style="color:#e11d48;font-size:1.05rem;">${stoichRes.limitingReagent}</strong>
                </div>
                <div style="display:flex;justify-content:space-between;margin-bottom:4px;">
                  <span style="color:#64748b;">Theoretical H₂O Yield:</span>
                  <strong style="color:#059669;">${stoichRes.yieldWaterGrams.toFixed(2)} g (${stoichRes.yieldWaterMoles.toFixed(2)} mol)</strong>
                </div>
                <div style="display:flex;justify-content:space-between;">
                  <span style="color:#64748b;">Excess Reagent Remaining:</span>
                  <strong style="color:#475569;">${stoichRes.excessMoles.toFixed(2)} mol</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    bindEvents();
  };

  const bindEvents = () => {
    root.querySelector<HTMLButtonElement>('#btn-launch-v35-suite')?.addEventListener('click', () => {
      window.location.href = './chemistry/some-basic-concepts/explorers/mole_concept/index.html';
    });

    root.querySelector<HTMLButtonElement>('#btn-return-labs')?.addEventListener('click', () => {
      if (onNavigate) onNavigate('/labs');
      else window.location.hash = '#/labs';
    });

    root.querySelectorAll<HTMLButtonElement>('.comp-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const formula = btn.dataset.formula;
        if (formula) {
          ctrl.selectCompound(formula);
          render();
        }
      });
    });

    root.querySelector<HTMLInputElement>('#input-mass')?.addEventListener('input', e => {
      ctrl.setInputMass(parseFloat((e.target as HTMLInputElement).value) || 0);
      render();
    });

    const h2In = root.querySelector<HTMLInputElement>('#input-stoich-h2');
    const o2In = root.querySelector<HTMLInputElement>('#input-stoich-o2');
    if (h2In && o2In) {
      const updateStoich = () => {
        ctrl.setStoichiometryInputs(parseFloat(h2In.value) || 0, parseFloat(o2In.value) || 0);
        render();
      };
      h2In.addEventListener('input', updateStoich);
      o2In.addEventListener('input', updateStoich);
    }
  };

  render();

  return {
    dispose: () => {
      active = false;
      root.replaceChildren();
    },
  };
}
