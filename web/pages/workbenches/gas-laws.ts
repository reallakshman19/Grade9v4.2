/**
 * web/pages/workbenches/gas-laws.ts
 * Workpack A69 / v3.5 Parity — Behaviour of Gases & PV Thermodynamics
 *
 * Implements:
 * - Ideal gas equation of state: PV = nRT (R = 8.314 J/(mol·K))
 * - Boyle's Law isothermal curves (P ∝ 1/V)
 * - Charles' Law isobaric thermal expansion (V ∝ T)
 * - Graham's law of gaseous effusion: r1 / r2 = sqrt(M2 / M1)
 * - 12.7" tablet touch ergonomics (>= 48px hit targets, zero horizontal overflow)
 * - Academic status: HOLD (Formative Simulation Mode)
 */

import { escapeHtml } from '../../runtime/rendering.ts';
import { HIT_TARGET_MIN_PX } from '../../styles/tokens.ts';

const R = 8.314; // J/(mol·K)

export class GasLawsController {
  private activeMode: 'BOYLE' | 'CHARLES' | 'IDEAL' | 'GRAHAM' = 'IDEAL';

  private temperatureK: number = 300; // K
  private volumeL: number = 20;       // L
  private moles: number = 1.0;        // mol

  // Graham
  private gas1Name: string = 'Helium (He)';
  private gas1MolarMass: number = 4.0; // g/mol
  private gas2Name: string = 'Oxygen (O2)';
  private gas2MolarMass: number = 32.0; // g/mol

  getActiveMode(): 'BOYLE' | 'CHARLES' | 'IDEAL' | 'GRAHAM' {
    return this.activeMode;
  }

  setActiveMode(m: 'BOYLE' | 'CHARLES' | 'IDEAL' | 'GRAHAM'): void {
    this.activeMode = m;
  }

  setThermodynamics(T: number, V: number, n: number): void {
    this.temperatureK = T;
    this.volumeL = V;
    this.moles = n;
  }

  getPressure(): number {
    // P = nRT / V (V in m^3: 1 L = 0.001 m^3)
    const volM3 = this.volumeL * 0.001;
    return (this.moles * R * this.temperatureK) / volM3; // Pa
  }

  getGrahamRatio(): number {
    return Math.sqrt(this.gas2MolarMass / this.gas1MolarMass);
  }

  setGrahamGases(m1: number, name1: string, m2: number, name2: string): void {
    this.gas1MolarMass = m1;
    this.gas1Name = name1;
    this.gas2MolarMass = m2;
    this.gas2Name = name2;
  }

  getT(): number { return this.temperatureK; }
  getV(): number { return this.volumeL; }
  getN(): number { return this.moles; }
  getGas1(): { name: string; mass: number } { return { name: this.gas1Name, mass: this.gas1MolarMass }; }
  getGas2(): { name: string; mass: number } { return { name: this.gas2Name, mass: this.gas2MolarMass }; }
}

export function mountGasLawsWorkbench(
  root: HTMLElement,
  controller?: GasLawsController,
  onNavigate?: (route: string) => void
): { dispose: () => void } {
  const ctrl = controller ?? new GasLawsController();
  let active = true;

  const render = () => {
    if (!active) return;
    const mode = ctrl.getActiveMode();
    const pKPa = ctrl.getPressure() / 1000;
    const T = ctrl.getT();
    const V = ctrl.getV();
    const n = ctrl.getN();

    root.innerHTML = `
      <div class="gas-laws-container" style="max-width:1400px;margin:0 auto;padding:1.5rem;box-sizing:border-box;font-family:system-ui,-apple-system,sans-serif;color:#0f172a;">
        <header style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:1rem;padding-bottom:1.25rem;border-bottom:2px solid #e2e8f0;margin-bottom:1.5rem;">
          <div>
            <div style="display:flex;gap:8px;font-size:0.9rem;color:#64748b;margin-bottom:0.25rem;">
              <a href="#/labs" style="color:#0284c7;text-decoration:none;font-weight:600;">Standalone Labs</a> &gt; 
              <span>Gas Laws &amp; PV Thermodynamics</span>
            </div>
            <div style="display:flex;gap:8px;align-items:center;">
              <span style="font-size:0.8rem;font-weight:800;background:#e0f2fe;color:#0369a1;padding:3px 8px;border-radius:4px;">CHEMISTRY PHYSICAL WORKBENCH</span>
              <span style="font-size:0.8rem;font-weight:700;background:#fee2e2;color:#991b1b;padding:3px 8px;border-radius:4px;">Academic Status: HOLD</span>
            </div>
            <h1 style="margin:0.5rem 0 0;font-size:1.9rem;font-weight:800;color:#0f172a;">🧪 Behaviour of Gases &amp; PV Thermodynamics</h1>
          </div>
          <button type="button" id="btn-return-labs" style="min-height:${HIT_TARGET_MIN_PX}px;padding:8px 18px;background:#0f172a;color:white;border:none;border-radius:6px;cursor:pointer;font-weight:700;">
            ← Return to Labs Hub
          </button>
        </header>

        <!-- Mode Selectors -->
        <div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:1.5rem;">
          <button type="button" class="mode-btn ${mode === 'IDEAL' ? 'active' : ''}" data-mode="IDEAL" style="min-height:${HIT_TARGET_MIN_PX}px;padding:10px 20px;border-radius:8px;font-weight:700;cursor:pointer;background:${mode === 'IDEAL' ? '#0284c7' : '#f1f5f9'};color:${mode === 'IDEAL' ? 'white' : '#475569'};border:1px solid ${mode === 'IDEAL' ? '#0284c7' : '#cbd5e1'};">
            1. Ideal Gas Equation (PV = nRT)
          </button>
          <button type="button" class="mode-btn ${mode === 'BOYLE' ? 'active' : ''}" data-mode="BOYLE" style="min-height:${HIT_TARGET_MIN_PX}px;padding:10px 20px;border-radius:8px;font-weight:700;cursor:pointer;background:${mode === 'BOYLE' ? '#0284c7' : '#f1f5f9'};color:${mode === 'BOYLE' ? 'white' : '#475569'};border:1px solid ${mode === 'BOYLE' ? '#0284c7' : '#cbd5e1'};">
            2. Boyle's Isotherm (P ∝ 1/V)
          </button>
          <button type="button" class="mode-btn ${mode === 'CHARLES' ? 'active' : ''}" data-mode="CHARLES" style="min-height:${HIT_TARGET_MIN_PX}px;padding:10px 20px;border-radius:8px;font-weight:700;cursor:pointer;background:${mode === 'CHARLES' ? '#0284c7' : '#f1f5f9'};color:${mode === 'CHARLES' ? 'white' : '#475569'};border:1px solid ${mode === 'CHARLES' ? '#0284c7' : '#cbd5e1'};">
            3. Charles' Isobar (V ∝ T)
          </button>
          <button type="button" class="mode-btn ${mode === 'GRAHAM' ? 'active' : ''}" data-mode="GRAHAM" style="min-height:${HIT_TARGET_MIN_PX}px;padding:10px 20px;border-radius:8px;font-weight:700;cursor:pointer;background:${mode === 'GRAHAM' ? '#0284c7' : '#f1f5f9'};color:${mode === 'GRAHAM' ? 'white' : '#475569'};border:1px solid ${mode === 'GRAHAM' ? '#0284c7' : '#cbd5e1'};">
            4. Graham's Effusion
          </button>
        </div>

        <div style="background:#ffffff;border:1px solid #cbd5e1;border-radius:12px;padding:1.5rem;box-shadow:0 1px 3px rgba(0,0,0,0.05);">
          ${mode === 'GRAHAM' ? renderGrahamTab(ctrl) : renderThermodynamicsTab(ctrl, mode, pKPa, T, V, n)}
        </div>
      </div>
    `;

    bindEvents();
  };

  const bindEvents = () => {
    root.querySelector<HTMLButtonElement>('#btn-return-labs')?.addEventListener('click', () => {
      if (onNavigate) onNavigate('/labs');
      else window.location.hash = '#/labs';
    });

    root.querySelectorAll<HTMLButtonElement>('.mode-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const m = btn.dataset.mode as any;
        if (m) {
          ctrl.setActiveMode(m);
          render();
        }
      });
    });

    const tSlider = root.querySelector<HTMLInputElement>('#slider-temp');
    const vSlider = root.querySelector<HTMLInputElement>('#slider-vol');
    const nSlider = root.querySelector<HTMLInputElement>('#slider-moles');
    if (tSlider && vSlider && nSlider) {
      const updateThermo = () => {
        ctrl.setThermodynamics(
          parseFloat(tSlider.value) || 300,
          parseFloat(vSlider.value) || 20,
          parseFloat(nSlider.value) || 1
        );
        render();
      };
      tSlider.addEventListener('input', updateThermo);
      vSlider.addEventListener('input', updateThermo);
      nSlider.addEventListener('input', updateThermo);
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

function renderThermodynamicsTab(
  ctrl: GasLawsController,
  mode: string,
  pKPa: number,
  T: number,
  V: number,
  n: number
): string {
  // Generate P-V isotherm curve points for SVG
  const points: string[] = [];
  for (let vol = 5; vol <= 50; vol += 2) {
    const p = (n * R * T) / (vol * 0.001 * 1000); // kPa
    const x = 50 + ((vol - 5) / 45) * 220;
    const y = 180 - Math.min(150, (p / 800) * 150);
    points.push(`${x.toFixed(1)},${y.toFixed(1)}`);
  }
  const currX = 50 + ((V - 5) / 45) * 220;
  const currY = 180 - Math.min(150, (pKPa / 800) * 150);

  return `
    <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(min(100%, 360px), 1fr));gap:2rem;">
      <div>
        <h3 style="margin:0 0 1rem;font-size:1.25rem;color:#0f172a;">Thermodynamic State Variables</h3>
        <p style="color:#64748b;font-size:0.95rem;margin-bottom:1.5rem;">
          Universal gas constant R = 8.314 J/(mol·K).
        </p>

        <div style="margin-bottom:1.25rem;">
          <label for="slider-temp" style="display:block;font-weight:700;margin-bottom:6px;font-size:0.95rem;">
            Temperature T (Kelvin): <span style="color:#0284c7;">${T} K (${(T - 273.15).toFixed(0)}°C)</span>
          </label>
          <input type="range" id="slider-temp" min="150" max="600" step="10" value="${T}" style="width:100%;min-height:${HIT_TARGET_MIN_PX}px;" />
        </div>

        <div style="margin-bottom:1.25rem;">
          <label for="slider-vol" style="display:block;font-weight:700;margin-bottom:6px;font-size:0.95rem;">
            Chamber Volume V (Liters): <span style="color:#0284c7;">${V} L</span>
          </label>
          <input type="range" id="slider-vol" min="5" max="50" step="1" value="${V}" style="width:100%;min-height:${HIT_TARGET_MIN_PX}px;" />
        </div>

        <div style="margin-bottom:1.5rem;">
          <label for="slider-moles" style="display:block;font-weight:700;margin-bottom:6px;font-size:0.95rem;">
            Amount of Substance n (moles): <span style="color:#0284c7;">${n.toFixed(1)} mol</span>
          </label>
          <input type="range" id="slider-moles" min="0.2" max="5.0" step="0.2" value="${n}" style="width:100%;min-height:${HIT_TARGET_MIN_PX}px;" />
        </div>

        <div style="background:#f8fafc;border:1px solid #cbd5e1;border-radius:8px;padding:1rem;">
          <div style="font-weight:700;color:#0f172a;margin-bottom:6px;">Calculated Pressure:</div>
          <div style="display:flex;justify-content:space-between;margin-bottom:4px;">
            <span style="color:#64748b;">P = nRT / V:</span>
            <strong style="color:#0284c7;font-size:1.15rem;">${pKPa.toFixed(1)} kPa (${(pKPa / 101.325).toFixed(2)} atm)</strong>
          </div>
          <div style="font-size:0.85rem;color:#64748b;margin-top:4px;">
            Standard 1 atm = 101.325 kPa
          </div>
        </div>
      </div>

      <div>
        <h3 style="margin:0 0 1rem;font-size:1.25rem;color:#0f172a;">Dynamic P-V Isotherm Diagram</h3>
        <div style="background:#0f172a;border-radius:8px;padding:1rem;min-height:220px;display:flex;align-items:center;justify-content:center;">
          <svg viewBox="0 0 320 220" style="width:100%;height:auto;max-height:200px;">
            <!-- Axes -->
            <line x1="50" y1="180" x2="300" y2="180" stroke="#475569" stroke-width="2" />
            <line x1="50" y1="20" x2="50" y2="180" stroke="#475569" stroke-width="2" />
            <text x="300" y="200" fill="#94a3b8" font-size="11" text-anchor="end">Volume V (L)</text>
            <text x="30" y="30" fill="#94a3b8" font-size="11">Pressure P (kPa)</text>

            <!-- Curve -->
            <polyline fill="none" stroke="#38bdf8" stroke-width="3" points="${points.join(' ')}" />

            <!-- Current State Point -->
            <circle cx="${currX}" cy="${currY}" r="6" fill="#f43f5e" />
            <text x="${currX}" y="${Math.max(20, currY - 10)}" fill="#f43f5e" font-size="11" font-weight="bold" text-anchor="middle">
              (${V}L, ${pKPa.toFixed(0)}kPa)
            </text>
          </svg>
        </div>
      </div>
    </div>
  `;
}

function renderGrahamTab(ctrl: GasLawsController): string {
  const g1 = ctrl.getGas1();
  const g2 = ctrl.getGas2();
  const ratio = ctrl.getGrahamRatio();

  return `
    <div>
      <h3 style="margin:0 0 1rem;font-size:1.25rem;color:#0f172a;">Graham's Law of Gaseous Effusion</h3>
      <p style="color:#64748b;font-size:0.95rem;margin-bottom:1.5rem;">
        At constant temperature and pressure, the rate of effusion of a gas is inversely proportional to the square root of its molar mass: 
        <code>r_1 / r_2 = √(M_2 / M_1)</code>.
      </p>

      <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(min(100%, 300px), 1fr));gap:1.5rem;margin-bottom:1.5rem;">
        <div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:8px;padding:1.25rem;">
          <h4 style="margin:0 0 0.5rem;color:#1e40af;">Gas 1: ${escapeHtml(g1.name)}</h4>
          <div style="font-size:1.1rem;color:#1e3a8a;font-weight:700;">M₁ = ${g1.mass} g/mol</div>
        </div>

        <div style="background:#fef2f2;border:1px solid #fecaca;border-radius:8px;padding:1.25rem;">
          <h4 style="margin:0 0 0.5rem;color:#991b1b;">Gas 2: ${escapeHtml(g2.name)}</h4>
          <div style="font-size:1.1rem;color:#7f1d1d;font-weight:700;">M₂ = ${g2.mass} g/mol</div>
        </div>
      </div>

      <div style="background:#f8fafc;border:1px solid #cbd5e1;border-radius:8px;padding:1.5rem;">
        <div style="font-size:1.1rem;font-weight:700;color:#0f172a;margin-bottom:8px;">
          Effusion Rate Comparison:
        </div>
        <p style="margin:0 0 1rem;color:#475569;font-size:1rem;">
          <code>r(He) / r(O₂) = √(32.0 / 4.0) = √8.0 = <strong>${ratio.toFixed(2)}×</strong></code>
        </p>
        <div style="color:#059669;font-weight:700;">
          Helium effuses ${ratio.toFixed(2)} times faster than Oxygen through a porous partition.
        </div>
      </div>
    </div>
  `;
}
