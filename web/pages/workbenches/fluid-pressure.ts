/**
 * web/pages/workbenches/fluid-pressure.ts
 * Workpack A69 / v3.5 Parity — Thrust & Hydrostatic Pressure Apparatus
 *
 * Implements:
 * - Liquid column hydrostatic pressure: P = P0 + ρgh
 * - Pascal's hydraulic press principle: F1 / A1 = F2 / A2
 * - Archimedes' buoyant force balance: Fb = ρ_fluid * V_submerged * g
 * - 12.7" tablet touch ergonomics (>= 48px hit targets, zero horizontal overflow)
 * - Academic status: HOLD (Formative Simulation Mode)
 */

import { escapeHtml } from '../../runtime/rendering.ts';
import { HIT_TARGET_MIN_PX } from '../../styles/tokens.ts';

export class FluidPressureController {
  private activeMode: 'HYDROSTATIC' | 'PASCAL' | 'BUOYANCY' = 'HYDROSTATIC';

  // Hydrostatic
  private density: number = 1000; // kg/m^3 (water)
  private depth: number = 4.0;    // m
  private atmosphericP: number = 101325; // Pa

  // Pascal Hydraulic
  private f1: number = 50;        // N
  private a1: number = 0.01;      // m^2
  private a2: number = 0.25;      // m^2

  // Buoyancy
  private objVolume: number = 0.05; // m^3
  private objMass: number = 40;     // kg (density = 800 kg/m^3 -> floats in water)

  getActiveMode(): 'HYDROSTATIC' | 'PASCAL' | 'BUOYANCY' {
    return this.activeMode;
  }

  setActiveMode(m: 'HYDROSTATIC' | 'PASCAL' | 'BUOYANCY'): void {
    this.activeMode = m;
  }

  setHydrostatic(density: number, depth: number): void {
    this.density = density;
    this.depth = depth;
  }

  getHydrostaticResults(): { gaugePressure: number; totalPressure: number } {
    const g = 9.8;
    const gaugePressure = this.density * g * this.depth;
    const totalPressure = this.atmosphericP + gaugePressure;
    return { gaugePressure, totalPressure };
  }

  setPascal(f1: number, a2: number): void {
    this.f1 = f1;
    this.a2 = a2;
  }

  getPascalResults(): { f2: number; mechanicalAdvantage: number } {
    const mechanicalAdvantage = this.a2 / this.a1;
    const f2 = this.f1 * mechanicalAdvantage;
    return { f2, mechanicalAdvantage };
  }

  setBuoyancy(objMass: number, objVolume: number): void {
    this.objMass = objMass;
    this.objVolume = objVolume;
  }

  getBuoyancyResults(): {
    objDensity: number;
    buoyantForceMax: number;
    weight: number;
    submergedFraction: number;
    status: 'FLOATS' | 'NEUTRALLY_BUOYANT' | 'SINKS';
  } {
    const g = 9.8;
    const objDensity = this.objMass / this.objVolume;
    const weight = this.objMass * g;
    const buoyantForceMax = this.density * this.objVolume * g;

    let submergedFraction = objDensity / this.density;
    let status: 'FLOATS' | 'NEUTRALLY_BUOYANT' | 'SINKS' = 'FLOATS';

    if (submergedFraction >= 1.0) {
      submergedFraction = 1.0;
      status = objDensity > this.density ? 'SINKS' : 'NEUTRALLY_BUOYANT';
    }

    return { objDensity, buoyantForceMax, weight, submergedFraction, status };
  }

  getDensity(): number { return this.density; }
  getDepth(): number { return this.depth; }
  getF1(): number { return this.f1; }
  getA2(): number { return this.a2; }
  getObjMass(): number { return this.objMass; }
  getObjVolume(): number { return this.objVolume; }
}

export function mountFluidPressureWorkbench(
  root: HTMLElement,
  controller?: FluidPressureController,
  onNavigate?: (route: string) => void
): { dispose: () => void } {
  const ctrl = controller ?? new FluidPressureController();
  let active = true;

  const render = () => {
    if (!active) return;
    const mode = ctrl.getActiveMode();

    root.innerHTML = `
      <div class="fluid-pressure-container" style="max-width:1400px;margin:0 auto;padding:1.5rem;box-sizing:border-box;font-family:system-ui,-apple-system,sans-serif;color:#0f172a;">
        <header style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:1rem;padding-bottom:1.25rem;border-bottom:2px solid #e2e8f0;margin-bottom:1.5rem;">
          <div>
            <div style="display:flex;gap:8px;font-size:0.9rem;color:#64748b;margin-bottom:0.25rem;">
              <a href="#/labs" style="color:#0284c7;text-decoration:none;font-weight:600;">Standalone Labs</a> &gt; 
              <span>Fluid Pressure &amp; Thrust</span>
            </div>
            <div style="display:flex;gap:8px;align-items:center;">
              <span style="font-size:0.8rem;font-weight:800;background:#e0f2fe;color:#0369a1;padding:3px 8px;border-radius:4px;">PHYSICS FLUID MECHANICS</span>
              <span style="font-size:0.8rem;font-weight:700;background:#fee2e2;color:#991b1b;padding:3px 8px;border-radius:4px;">Academic Status: HOLD</span>
            </div>
            <h1 style="margin:0.5rem 0 0;font-size:1.9rem;font-weight:800;color:#0f172a;">🌊 Thrust &amp; Hydrostatic Pressure Apparatus</h1>
          </div>
          <button type="button" id="btn-return-labs" style="min-height:${HIT_TARGET_MIN_PX}px;padding:8px 18px;background:#0f172a;color:white;border:none;border-radius:6px;cursor:pointer;font-weight:700;">
            ← Return to Labs Hub
          </button>
        </header>

        <!-- Mode Buttons -->
        <div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:1.5rem;">
          <button type="button" class="mode-btn ${mode === 'HYDROSTATIC' ? 'active' : ''}" data-mode="HYDROSTATIC" style="min-height:${HIT_TARGET_MIN_PX}px;padding:10px 20px;border-radius:8px;font-weight:700;cursor:pointer;background:${mode === 'HYDROSTATIC' ? '#0284c7' : '#f1f5f9'};color:${mode === 'HYDROSTATIC' ? 'white' : '#475569'};border:1px solid ${mode === 'HYDROSTATIC' ? '#0284c7' : '#cbd5e1'};">
            1. Hydrostatic Column (P = ρgh)
          </button>
          <button type="button" class="mode-btn ${mode === 'PASCAL' ? 'active' : ''}" data-mode="PASCAL" style="min-height:${HIT_TARGET_MIN_PX}px;padding:10px 20px;border-radius:8px;font-weight:700;cursor:pointer;background:${mode === 'PASCAL' ? '#0284c7' : '#f1f5f9'};color:${mode === 'PASCAL' ? 'white' : '#475569'};border:1px solid ${mode === 'PASCAL' ? '#0284c7' : '#cbd5e1'};">
            2. Pascal's Hydraulic Lift
          </button>
          <button type="button" class="mode-btn ${mode === 'BUOYANCY' ? 'active' : ''}" data-mode="BUOYANCY" style="min-height:${HIT_TARGET_MIN_PX}px;padding:10px 20px;border-radius:8px;font-weight:700;cursor:pointer;background:${mode === 'BUOYANCY' ? '#0284c7' : '#f1f5f9'};color:${mode === 'BUOYANCY' ? 'white' : '#475569'};border:1px solid ${mode === 'BUOYANCY' ? '#0284c7' : '#cbd5e1'};">
            3. Archimedes' Buoyancy
          </button>
        </div>

        <div style="background:#ffffff;border:1px solid #cbd5e1;border-radius:12px;padding:1.5rem;box-shadow:0 1px 3px rgba(0,0,0,0.05);">
          ${mode === 'HYDROSTATIC' ? renderHydrostaticTab(ctrl) : mode === 'PASCAL' ? renderPascalTab(ctrl) : renderBuoyancyTab(ctrl)}
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

    // Hydrostatic Sliders
    const dSlider = root.querySelector<HTMLInputElement>('#slider-density');
    const hSlider = root.querySelector<HTMLInputElement>('#slider-depth');
    if (dSlider && hSlider) {
      const updateH = () => {
        ctrl.setHydrostatic(parseFloat(dSlider.value) || 1000, parseFloat(hSlider.value) || 0);
        render();
      };
      dSlider.addEventListener('input', updateH);
      hSlider.addEventListener('input', updateH);
    }

    // Pascal Sliders
    const f1Slider = root.querySelector<HTMLInputElement>('#slider-f1');
    const a2Slider = root.querySelector<HTMLInputElement>('#slider-a2');
    if (f1Slider && a2Slider) {
      const updateP = () => {
        ctrl.setPascal(parseFloat(f1Slider.value) || 10, parseFloat(a2Slider.value) || 0.05);
        render();
      };
      f1Slider.addEventListener('input', updateP);
      a2Slider.addEventListener('input', updateP);
    }

    // Buoyancy Sliders
    const mSlider = root.querySelector<HTMLInputElement>('#slider-mass');
    const vSlider = root.querySelector<HTMLInputElement>('#slider-vol');
    if (mSlider && vSlider) {
      const updateB = () => {
        ctrl.setBuoyancy(parseFloat(mSlider.value) || 10, parseFloat(vSlider.value) || 0.01);
        render();
      };
      mSlider.addEventListener('input', updateB);
      vSlider.addEventListener('input', updateB);
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

function renderHydrostaticTab(ctrl: FluidPressureController): string {
  const density = ctrl.getDensity();
  const depth = ctrl.getDepth();
  const res = ctrl.getHydrostaticResults();

  return `
    <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(min(100%, 360px), 1fr));gap:2rem;">
      <div>
        <h3 style="margin:0 0 1rem;font-size:1.25rem;color:#0f172a;">Column Parameters</h3>
        <p style="color:#64748b;font-size:0.95rem;margin-bottom:1.5rem;">
          Hydrostatic formula: <code>P = P_0 + ρgh</code>. Atmospheric pressure P_0 = 101.3 kPa.
        </p>

        <div style="margin-bottom:1.25rem;">
          <label for="slider-density" style="display:block;font-weight:700;margin-bottom:6px;font-size:0.95rem;">
            Fluid Density ρ (kg/m³): <span style="color:#0284c7;">${density}</span>
          </label>
          <input type="range" id="slider-density" min="700" max="13600" step="100" value="${density}" style="width:100%;min-height:${HIT_TARGET_MIN_PX}px;" />
          <div style="font-size:0.8rem;color:#64748b;margin-top:2px;">Gasoline (700), Water (1000), Seawater (1025), Mercury (13600)</div>
        </div>

        <div style="margin-bottom:1.5rem;">
          <label for="slider-depth" style="display:block;font-weight:700;margin-bottom:6px;font-size:0.95rem;">
            Depth Beneath Surface h (m): <span style="color:#0284c7;">${depth.toFixed(1)} m</span>
          </label>
          <input type="range" id="slider-depth" min="0" max="10" step="0.2" value="${depth}" style="width:100%;min-height:${HIT_TARGET_MIN_PX}px;" />
        </div>

        <div style="background:#f8fafc;border:1px solid #cbd5e1;border-radius:8px;padding:1rem;">
          <div style="font-weight:700;color:#0f172a;margin-bottom:6px;">Pressure Computations:</div>
          <div style="display:flex;justify-content:space-between;margin-bottom:4px;">
            <span style="color:#64748b;">Gauge Pressure (ρgh):</span>
            <strong style="color:#0284c7;">${(res.gaugePressure / 1000).toFixed(2)} kPa</strong>
          </div>
          <div style="display:flex;justify-content:space-between;">
            <span style="color:#64748b;">Absolute Total Pressure:</span>
            <strong style="color:#059669;">${(res.totalPressure / 1000).toFixed(2)} kPa</strong>
          </div>
        </div>
      </div>

      <div>
        <h3 style="margin:0 0 1rem;font-size:1.25rem;color:#0f172a;">Fluid Column Diagram</h3>
        <div style="background:#0f172a;border-radius:8px;padding:1rem;min-height:220px;display:flex;align-items:center;justify-content:center;">
          <svg viewBox="0 0 320 220" style="width:100%;height:auto;max-height:200px;">
            <!-- Tank Outline -->
            <rect x="80" y="20" width="160" height="180" fill="#1e293b" stroke="#475569" stroke-width="2" />
            <!-- Water Body -->
            <rect x="82" y="40" width="156" height="158" fill="#0284c7" opacity="0.4" />
            <line x1="80" y1="40" x2="240" y2="40" stroke="#38bdf8" stroke-width="2" />
            <text x="160" y="32" fill="#94a3b8" font-size="11" text-anchor="middle">Liquid Surface (P = P0)</text>

            <!-- Depth Marker -->
            ${(() => {
              const y = 40 + (depth / 10) * 150;
              return `
                <line x1="82" y1="${y}" x2="238" y2="${y}" stroke="#f43f5e" stroke-width="2" stroke-dasharray="4" />
                <circle cx="160" cy="${y}" r="6" fill="#f43f5e" />
                <text x="160" y="${Math.min(195, y + 18)}" fill="#f43f5e" font-size="12" font-weight="bold" text-anchor="middle">
                  h = ${depth.toFixed(1)}m · P = ${(res.totalPressure / 1000).toFixed(1)} kPa
                </text>
              `;
            })()}
          </svg>
        </div>
      </div>
    </div>
  `;
}

function renderPascalTab(ctrl: FluidPressureController): string {
  const f1 = ctrl.getF1();
  const a2 = ctrl.getA2();
  const res = ctrl.getPascalResults();

  return `
    <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(min(100%, 360px), 1fr));gap:2rem;">
      <div>
        <h3 style="margin:0 0 1rem;font-size:1.25rem;color:#0f172a;">Hydraulic Press Parameters</h3>
        <p style="color:#64748b;font-size:0.95rem;margin-bottom:1.5rem;">
          Incompressible fluid transmits pressure equally: <code>F_1 / A_1 = F_2 / A_2</code>. Input piston A_1 = 0.01 m².
        </p>

        <div style="margin-bottom:1.25rem;">
          <label for="slider-f1" style="display:block;font-weight:700;margin-bottom:6px;font-size:0.95rem;">
            Input Force F_1 (N): <span style="color:#0284c7;">${f1} N</span>
          </label>
          <input type="range" id="slider-f1" min="10" max="500" step="10" value="${f1}" style="width:100%;min-height:${HIT_TARGET_MIN_PX}px;" />
        </div>

        <div style="margin-bottom:1.5rem;">
          <label for="slider-a2" style="display:block;font-weight:700;margin-bottom:6px;font-size:0.95rem;">
            Output Piston Area A_2 (m²): <span style="color:#0284c7;">${a2.toFixed(2)} m²</span>
          </label>
          <input type="range" id="slider-a2" min="0.02" max="0.5" step="0.01" value="${a2}" style="width:100%;min-height:${HIT_TARGET_MIN_PX}px;" />
        </div>

        <div style="background:#f8fafc;border:1px solid #cbd5e1;border-radius:8px;padding:1rem;">
          <div style="font-weight:700;color:#0f172a;margin-bottom:6px;">Force Multiplication:</div>
          <div style="display:flex;justify-content:space-between;margin-bottom:4px;">
            <span style="color:#64748b;">Mechanical Advantage (A2 / A1):</span>
            <strong style="color:#0284c7;">${res.mechanicalAdvantage.toFixed(1)}×</strong>
          </div>
          <div style="display:flex;justify-content:space-between;">
            <span style="color:#64748b;">Output Lift Force F_2:</span>
            <strong style="color:#059669;">${res.f2.toFixed(1)} N</strong>
          </div>
        </div>
      </div>

      <div>
        <h3 style="margin:0 0 1rem;font-size:1.25rem;color:#0f172a;">U-Tube Hydraulic Schematic</h3>
        <div style="background:#0f172a;border-radius:8px;padding:1rem;min-height:220px;display:flex;align-items:center;justify-content:center;">
          <svg viewBox="0 0 360 200" style="width:100%;height:auto;max-height:180px;">
            <!-- Left Narrow Tube -->
            <rect x="40" y="60" width="40" height="100" fill="#1e293b" stroke="#475569" stroke-width="2" />
            <!-- Bottom Connecting Pipe -->
            <rect x="40" y="140" width="280" height="20" fill="#1e293b" stroke="#475569" stroke-width="2" />
            <!-- Right Wide Tube -->
            <rect x="200" y="40" width="120" height="120" fill="#1e293b" stroke="#475569" stroke-width="2" />

            <!-- Fluid -->
            <path d="M 42 100 L 78 100 L 78 142 L 202 142 L 202 90 L 318 90 L 318 158 L 42 158 Z" fill="#0284c7" opacity="0.5" />

            <!-- Left Piston -->
            <rect x="42" y="90" width="36" height="12" fill="#94a3b8" />
            <line x1="60" y1="50" x2="60" y2="88" stroke="#f43f5e" stroke-width="3" />
            <text x="60" y="42" fill="#f43f5e" font-size="11" font-weight="bold" text-anchor="middle">F1 = ${f1}N</text>

            <!-- Right Piston -->
            <rect x="202" y="80" width="116" height="14" fill="#94a3b8" />
            <line x1="260" y1="78" x2="260" y2="40" stroke="#4ade80" stroke-width="3" />
            <text x="260" y="32" fill="#4ade80" font-size="12" font-weight="bold" text-anchor="middle">F2 = ${res.f2.toFixed(0)}N</text>
          </svg>
        </div>
      </div>
    </div>
  `;
}

function renderBuoyancyTab(ctrl: FluidPressureController): string {
  const m = ctrl.getObjMass();
  const v = ctrl.getObjVolume();
  const res = ctrl.getBuoyancyResults();

  return `
    <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(min(100%, 360px), 1fr));gap:2rem;">
      <div>
        <h3 style="margin:0 0 1rem;font-size:1.25rem;color:#0f172a;">Submerged Object Parameters</h3>
        <p style="color:#64748b;font-size:0.95rem;margin-bottom:1.5rem;">
          Archimedes principle: <code>F_b = ρ_{fluid} V_{sub} g</code>. Gravitational weight: <code>W = mg</code>.
        </p>

        <div style="margin-bottom:1.25rem;">
          <label for="slider-mass" style="display:block;font-weight:700;margin-bottom:6px;font-size:0.95rem;">
            Object Mass m (kg): <span style="color:#0284c7;">${m} kg</span>
          </label>
          <input type="range" id="slider-mass" min="5" max="100" step="5" value="${m}" style="width:100%;min-height:${HIT_TARGET_MIN_PX}px;" />
        </div>

        <div style="margin-bottom:1.5rem;">
          <label for="slider-vol" style="display:block;font-weight:700;margin-bottom:6px;font-size:0.95rem;">
            Object Volume V (m³): <span style="color:#0284c7;">${v.toFixed(3)} m³</span>
          </label>
          <input type="range" id="slider-vol" min="0.01" max="0.1" step="0.005" value="${v}" style="width:100%;min-height:${HIT_TARGET_MIN_PX}px;" />
        </div>

        <div style="background:#f8fafc;border:1px solid #cbd5e1;border-radius:8px;padding:1rem;">
          <div style="font-weight:700;color:#0f172a;margin-bottom:6px;">Equilibrium Analysis:</div>
          <div style="display:flex;justify-content:space-between;margin-bottom:4px;">
            <span style="color:#64748b;">Object Density (m / V):</span>
            <strong style="color:#0284c7;">${res.objDensity.toFixed(1)} kg/m³</strong>
          </div>
          <div style="display:flex;justify-content:space-between;margin-bottom:4px;">
            <span style="color:#64748b;">Gravity Weight W:</span>
            <strong style="color:#e11d48;">${res.weight.toFixed(1)} N</strong>
          </div>
          <div style="display:flex;justify-content:space-between;margin-bottom:4px;">
            <span style="color:#64748b;">Maximum Buoyant Force F_b:</span>
            <strong style="color:#059669;">${res.buoyantForceMax.toFixed(1)} N</strong>
          </div>
          <div style="display:flex;justify-content:space-between;margin-top:6px;padding-top:6px;border-top:1px solid #e2e8f0;">
            <span style="color:#0f172a;font-weight:700;">Flotation Status:</span>
            <strong style="color:${res.status === 'FLOATS' ? '#059669' : res.status === 'SINKS' ? '#e11d48' : '#d97706'};">
              ${res.status} (${(res.submergedFraction * 100).toFixed(0)}% Submerged)
            </strong>
          </div>
        </div>
      </div>

      <div>
        <h3 style="margin:0 0 1rem;font-size:1.25rem;color:#0f172a;">Flotation Visualization</h3>
        <div style="background:#0f172a;border-radius:8px;padding:1rem;min-height:220px;display:flex;align-items:center;justify-content:center;">
          <svg viewBox="0 0 320 220" style="width:100%;height:auto;max-height:200px;">
            <!-- Water Tank -->
            <rect x="60" y="40" width="200" height="150" fill="#0284c7" opacity="0.3" stroke="#475569" stroke-width="2" />
            <line x1="60" y1="80" x2="260" y2="80" stroke="#38bdf8" stroke-width="2" />
            <text x="160" y="70" fill="#94a3b8" font-size="11" text-anchor="middle">Water Line (ρ = 1000 kg/m³)</text>

            <!-- Floating / Sinking Block -->
            ${(() => {
              const blockHeight = 60;
              const blockWidth = 70;
              let blockY = 80 - blockHeight * (1 - res.submergedFraction);
              if (res.status === 'SINKS') blockY = 190 - blockHeight;

              return `
                <rect x="125" y="${blockY}" width="${blockWidth}" height="${blockHeight}" fill="#fbbf24" stroke="#d97706" stroke-width="2" rx="4" />
                <text x="160" y="${blockY + 34}" fill="#78350f" font-size="11" font-weight="bold" text-anchor="middle">
                  ${m} kg
                </text>
              `;
            })()}
          </svg>
        </div>
      </div>
    </div>
  `;
}
