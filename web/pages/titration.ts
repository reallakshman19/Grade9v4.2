/**
 * web/pages/titration.ts
 * A69 / Workpack A28 — Multi-Step Volumetric Titration Simulator.
 *
 * Implements:
 * 1. Piecewise analytical titration model across 5 chemical equilibrium regimes:
 *    - Regime 1 (V_b = 0): Initial weak-acid equilibrium [H+] = sqrt(Ka * Ca).
 *    - Regime 2 (0 < V_b < V_eq): Buffer region governed by Henderson-Hasselbalch.
 *      At half-equivalence (V_b = 12.5 mL), pH = pKa = 4.745.
 *    - Regime 3 (near equivalence): Quadratic equilibrium ensuring smooth continuity.
 *    - Regime 4 (V_b = V_eq = 25.0 mL): Salt hydrolysis [OH-] = sqrt((Kw / Ka) * C_salt) => pH = 8.72.
 *    - Regime 5 (V_b > V_eq): Excess strong base [OH-] = (Cb*Vb - Ca*Va) / (Va + Vb) => pH = 14 + log10[OH-].
 * 2. Strong acid / Strong base regime (HCl + NaOH, equivalence at pH = 7.00).
 * 3. Real-time indicator transitions:
 *    - Phenolphthalein: Colorless (pH < 8.2) -> Pale Pink (8.2..10.0) -> Vivid Magenta (pH > 10.0).
 *    - Methyl Orange: Red (pH < 3.1) -> Orange (3.1..4.4) -> Yellow (pH > 4.4).
 * 4. Interactive volumetric buret dispensing (0.1, 0.5, 1.0, 5.0 mL increments).
 * 5. Dynamic SVG curve rendering and digital conical flask visualization.
 * 6. Accessible tabular volume log and diagnostic estimation drill.
 * 7. Touch targets >= 48px, zero horizontal overflow.
 *
 * No academic approval inferred from software validation.
 */

import { HIT_TARGET_MIN_PX, HIT_TARGET_PRIMARY_PX } from '../styles/tokens.ts';
import { escapeHtml } from '../runtime/rendering.ts';

export type TitrationMode = 'WEAK_STRONG' | 'STRONG_STRONG';
export type ChemicalIndicator = 'PHENOLPHTHALEIN' | 'METHYL_ORANGE';

export interface TitrationLogEntry {
  readonly volumeAddedMl: number;
  readonly totalVolumeMl: number;
  readonly pH: number;
  readonly indicatorColor: string;
  readonly timestamp: string;
}

export interface TitrationConfig {
  readonly mode: TitrationMode;
  readonly analyteVolumeMl: number; // Va = 25.0 mL
  readonly analyteConcentrationM: number; // Ca = 0.100 M
  readonly titrantConcentrationM: number; // Cb = 0.100 M
  readonly Ka: number; // 1.80e-5 for CH3COOH
  readonly Kw: number; // 1.00e-14
}

export const DEFAULT_TITRATION_CONFIG: TitrationConfig = {
  mode: 'WEAK_STRONG',
  analyteVolumeMl: 25.0,
  analyteConcentrationM: 0.100,
  titrantConcentrationM: 0.100,
  Ka: 1.80e-5,
  Kw: 1.00e-14,
};

/**
 * Pure analytical oracle calculating exact pH for given titrant volume.
 */
export function calculateTitrationPh(
  volAddedMl: number,
  config: TitrationConfig = DEFAULT_TITRATION_CONFIG
): number {
  const Va = config.analyteVolumeMl;
  const Ca = config.analyteConcentrationM;
  const Cb = config.titrantConcentrationM;
  const Kw = config.Kw;
  const Ka = config.Ka;
  const Vb = Math.max(0, volAddedMl);
  const Vtotal = Va + Vb;

  const Veq = (Ca * Va) / Cb; // 25.0 mL

  if (config.mode === 'STRONG_STRONG') {
    if (Vb === 0) {
      return -Math.log10(Ca);
    }
    if (Math.abs(Vb - Veq) < 1e-6) {
      return 7.00;
    }
    if (Vb < Veq) {
      const molesAcidRemaining = Ca * Va - Cb * Vb;
      const concH = molesAcidRemaining / Vtotal;
      return -Math.log10(Math.max(1e-14, concH));
    } else {
      const molesBaseExcess = Cb * Vb - Ca * Va;
      const concOH = molesBaseExcess / Vtotal;
      const concH = Kw / Math.max(1e-14, concOH);
      return -Math.log10(Math.max(1e-14, concH));
    }
  }

  // --- WEAK ACID / STRONG BASE (CH3COOH + NaOH) ---
  const pKa = -Math.log10(Ka); // 4.745

  // 1. Initial weak acid before titrant addition (Vb = 0)
  if (Vb <= 1e-4) {
    const concH = Math.sqrt(Ka * Ca);
    return -Math.log10(concH); // ~2.87
  }

  // 4. Exact Equivalence Point (Vb = Veq)
  if (Math.abs(Vb - Veq) < 1e-4) {
    const Csalt = (Ca * Va) / Vtotal; // 0.050 M
    const concOH = Math.sqrt((Kw / Ka) * Csalt);
    const pOH = -Math.log10(concOH);
    return 14.00 - pOH; // ~8.72
  }

  // 5. Post-Equivalence (Vb > Veq)
  if (Vb > Veq) {
    const molesBaseExcess = Cb * Vb - Ca * Va;
    const concOH = molesBaseExcess / Vtotal;
    const pOH = -Math.log10(concOH);
    return 14.00 - pOH; // ~12.52 at 50 mL
  }

  // 3. Near-Equivalence Boundary (24.7 mL <= Vb < 25.0 mL)
  // Quadratic equilibrium to prevent Henderson-Hasselbalch divergence
  if (Vb >= Veq - 0.3) {
    const molesHA = Ca * Va - Cb * Vb;
    const molesA = Cb * Vb;
    const concHA = molesHA / Vtotal;
    const concA = molesA / Vtotal;
    // [H+]^2 + (Ka + [A-])[H+] - Ka[HA] = 0
    const b = Ka + concA;
    const c = -Ka * concHA;
    const concH = (-b + Math.sqrt(b * b - 4 * c)) / 2;
    return -Math.log10(Math.max(1e-14, concH));
  }

  // 2. Buffer Region (0 < Vb < 24.7 mL)
  // Henderson-Hasselbalch: pH = pKa + log10([A-] / [HA])
  const molesA = Cb * Vb;
  const molesHA = Ca * Va - Cb * Vb;
  const ratio = molesA / molesHA;
  return pKa + Math.log10(ratio);
}

/**
 * Returns solution hex color and human label based on active indicator and pH.
 */
export function getIndicatorColor(
  pH: number,
  indicator: ChemicalIndicator
): { hex: string; label: string } {
  if (indicator === 'PHENOLPHTHALEIN') {
    if (pH < 8.2) {
      return { hex: '#f8fafc', label: 'Colorless' };
    }
    if (pH <= 10.0) {
      const alpha = (pH - 8.2) / 1.8;
      return { hex: `rgba(244, 114, 182, ${Math.min(0.85, 0.2 + alpha * 0.65)})`, label: 'Pale Pink' };
    }
    return { hex: '#db2777', label: 'Vivid Magenta' };
  } else {
    // METHYL_ORANGE
    if (pH < 3.1) {
      return { hex: '#ef4444', label: 'Red' };
    }
    if (pH <= 4.4) {
      return { hex: '#f97316', label: 'Orange' };
    }
    return { hex: '#eab308', label: 'Yellow' };
  }
}

export class TitrationSimulatorController {
  private config: TitrationConfig;
  private currentVolumeAddedMl: number = 0;
  private indicator: ChemicalIndicator = 'PHENOLPHTHALEIN';
  private log: TitrationLogEntry[] = [];
  private unknownTargetConcentration: number = 0.085; // Diagnostic challenge target
  private estimationSubmitted: boolean = false;
  private lastEstimationFeedback: string | null = null;
  private lastEstimationIsCorrect: boolean | null = null;

  constructor(config?: Partial<TitrationConfig>) {
    this.config = { ...DEFAULT_TITRATION_CONFIG, ...config };
    this.recordStep(0);
  }

  getConfig(): TitrationConfig {
    return structuredClone(this.config);
  }

  exportState(): {
    config: TitrationConfig;
    currentVolumeAddedMl: number;
    indicator: ChemicalIndicator;
    log: TitrationLogEntry[];
  } {
    return {
      config: structuredClone(this.config),
      currentVolumeAddedMl: this.currentVolumeAddedMl,
      indicator: this.indicator,
      log: structuredClone(this.log),
    };
  }

  restoreState(state: {
    config: TitrationConfig;
    currentVolumeAddedMl: number;
    indicator: ChemicalIndicator;
    log: TitrationLogEntry[];
  }): void {
    if (!state || typeof state !== 'object' || !state.config || typeof state.currentVolumeAddedMl !== 'number') {
      throw new Error('Foreign or invalid titration simulator state');
    }
    this.config = structuredClone(state.config);
    this.currentVolumeAddedMl = state.currentVolumeAddedMl;
    this.indicator = state.indicator;
    this.log = structuredClone(state.log || []);
  }

  setMode(mode: TitrationMode): void {
    this.config = { ...this.config, mode };
    this.reset();
  }

  setIndicator(indicator: ChemicalIndicator): void {
    this.indicator = indicator;
  }

  getIndicator(): ChemicalIndicator {
    return this.indicator;
  }

  getCurrentVolumeAdded(): number {
    return this.currentVolumeAddedMl;
  }

  getCurrentPh(): number {
    return calculateTitrationPh(this.currentVolumeAddedMl, this.config);
  }

  getCurrentIndicatorColor(): { hex: string; label: string } {
    return getIndicatorColor(this.getCurrentPh(), this.indicator);
  }

  getLog(): readonly TitrationLogEntry[] {
    return structuredClone(this.log);
  }

  dispense(amountMl: number): void {
    const validAmount = Math.max(0, amountMl);
    this.currentVolumeAddedMl = Math.min(60.0, this.currentVolumeAddedMl + validAmount);
    this.recordStep(this.currentVolumeAddedMl);
  }

  reset(): void {
    this.currentVolumeAddedMl = 0;
    this.log = [];
    this.estimationSubmitted = false;
    this.lastEstimationFeedback = null;
    this.lastEstimationIsCorrect = null;
    this.recordStep(0);
  }

  submitUnknownEstimation(estimatedMolarity: number): { isCorrect: boolean; feedback: string } {
    this.estimationSubmitted = true;
    const diff = Math.abs(estimatedMolarity - this.unknownTargetConcentration);
    const percentErr = (diff / this.unknownTargetConcentration) * 100;

    if (percentErr <= 3.0) {
      const feedback = `Excellent! Estimated ${estimatedMolarity.toFixed(3)} M matches true concentration ${this.unknownTargetConcentration.toFixed(3)} M (within 3% experimental tolerance).`;
      this.lastEstimationFeedback = feedback;
      this.lastEstimationIsCorrect = true;
      return { isCorrect: true, feedback };
    } else {
      const feedback = `Estimation ${estimatedMolarity.toFixed(3)} M deviates by ${percentErr.toFixed(1)}% from target (${this.unknownTargetConcentration.toFixed(3)} M). Review the equivalence inflection point.`;
      this.lastEstimationFeedback = feedback;
      this.lastEstimationIsCorrect = false;
      return { isCorrect: false, feedback };
    }
  }

  getEstimationStatus(): { submitted: boolean; isCorrect: boolean | null; feedback: string | null } {
    return {
      submitted: this.estimationSubmitted,
      isCorrect: this.lastEstimationIsCorrect,
      feedback: this.lastEstimationFeedback,
    };
  }

  private recordStep(vol: number): void {
    const pH = calculateTitrationPh(vol, this.config);
    const color = getIndicatorColor(pH, this.indicator);
    this.log.push({
      volumeAddedMl: vol,
      totalVolumeMl: this.config.analyteVolumeMl + vol,
      pH: parseFloat(pH.toFixed(2)),
      indicatorColor: color.label,
      timestamp: new Date().toISOString(),
    });
  }

  generateFlaskSvg(): string {
    const ph = this.getCurrentPh();
    const indColor = this.getCurrentIndicatorColor();
    return `<svg width="140" height="160" viewBox="0 0 140 160" style="display:block;" role="img" aria-label="Digital conical flask containing solution with pH ${ph.toFixed(2)}">
      <!-- Flask Outline -->
      <path d="M 50 10 L 90 10 L 90 45 L 130 135 A 15 15 0 0 1 115 155 L 25 155 A 15 15 0 0 1 10 135 L 50 45 Z" fill="none" stroke="#64748b" stroke-width="4" stroke-linejoin="round" />
      <!-- Solution Liquid -->
      <path d="M 22 135 L 118 135 A 15 15 0 0 1 115 153 L 25 153 A 15 15 0 0 1 22 135 Z" fill="${indColor.hex}" />
      <!-- Stir bar -->
      <rect x="58" y="146" width="24" height="4" rx="2" fill="#334155" />
    </svg>`;
  }

  /**
   * Generates a 600x320 SVG graph plotting the analytical titration curve.
   */
  generateCurveSvg(): string {
    const width = 600;
    const height = 320;
    const padLeft = 50;
    const padRight = 30;
    const padTop = 30;
    const padBottom = 40;

    const plotWidth = width - padLeft - padRight;
    const plotHeight = height - padTop - padBottom;

    const mapX = (v: number) => padLeft + (v / 50.0) * plotWidth;
    const mapY = (ph: number) => height - padBottom - (ph / 14.0) * plotHeight;

    // Generate analytical points from V = 0 to 50 mL
    const points: [number, number][] = [];
    for (let v = 0; v <= 50; v += 0.5) {
      const ph = calculateTitrationPh(v, this.config);
      points.push([mapX(v), mapY(ph)]);
    }

    const pathData = points
      .map(([x, y], i) => `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`)
      .join(' ');

    const curX = mapX(this.currentVolumeAddedMl);
    const curY = mapY(this.getCurrentPh());

    // Grid lines for pH 2, 4, 6, 8, 10, 12, 14
    let gridLines = '';
    for (let ph = 2; ph <= 14; ph += 2) {
      const y = mapY(ph);
      gridLines += `
        <line x1="${padLeft}" y1="${y}" x2="${width - padRight}" y2="${y}" stroke="#e2e8f0" stroke-width="1" />
        <text x="${padLeft - 8}" y="${y + 4}" text-anchor="end" font-size="14" fill="#64748b" font-family="monospace">${ph}</text>
      `;
    }

    // Grid lines for Volume 10, 20, 30, 40, 50 mL
    for (let v = 10; v <= 50; v += 10) {
      const x = mapX(v);
      gridLines += `
        <line x1="${x}" y1="${padTop}" x2="${x}" y2="${height - padBottom}" stroke="#e2e8f0" stroke-width="1" />
        <text x="${x}" y="${height - padBottom + 16}" text-anchor="middle" font-size="14" fill="#64748b" font-family="monospace">${v}</text>
      `;
    }

    return `
      <svg viewBox="0 0 ${width} ${height}" style="width:100%;height:320px;display:block;background:#ffffff;border-radius:8px;" role="img" aria-label="Analytical titration pH curve">
        <!-- Axes -->
        <line x1="${padLeft}" y1="${height - padBottom}" x2="${width - padRight}" y2="${height - padBottom}" stroke="#94a3b8" stroke-width="2" />
        <line x1="${padLeft}" y1="${padTop}" x2="${padLeft}" y2="${height - padBottom}" stroke="#94a3b8" stroke-width="2" />

        ${gridLines}

        <!-- Axis Labels -->
        <text x="${width / 2}" y="${height - 8}" text-anchor="middle" font-size="14" font-weight="700" fill="#334155">Titrant Volume Added (mL)</text>
        <text x="16" y="${height / 2}" text-anchor="middle" transform="rotate(-90, 16, ${height / 2})" font-size="14" font-weight="700" fill="#334155">pH</text>

        <!-- Titration Curve Path -->
        <path d="${pathData}" fill="none" stroke="#0284c7" stroke-width="3" stroke-linecap="round" />

        <!-- Equivalence Marker (V = 25.0 mL) -->
        <line x1="${mapX(25)}" y1="${padTop}" x2="${mapX(25)}" y2="${height - padBottom}" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="4" />
        <circle cx="${mapX(25)}" cy="${mapY(calculateTitrationPh(25, this.config))}" r="4" fill="#f59e0b" />
        <text x="${mapX(25) + 6}" y="${mapY(calculateTitrationPh(25, this.config)) - 6}" font-size="14" font-weight="700" fill="#d97706">Equivalence (25 mL)</text>

        <!-- Current Operating Point Crosshair -->
        ${this.currentVolumeAddedMl <= 50 ? `
          <line x1="${curX}" y1="${padTop}" x2="${curX}" y2="${height - padBottom}" stroke="#ef4444" stroke-width="1" stroke-dasharray="2" />
          <line x1="${padLeft}" y1="${curY}" x2="${width - padRight}" y2="${curY}" stroke="#ef4444" stroke-width="1" stroke-dasharray="2" />
          <circle cx="${curX}" cy="${curY}" r="6" fill="#ef4444" stroke="#ffffff" stroke-width="2" />
          <text x="${curX + 8}" y="${curY - 8}" font-size="14" font-weight="800" fill="#dc2626">pH: ${this.getCurrentPh().toFixed(2)}</text>
        ` : ''}
      </svg>
    `;
  }

  renderHtml(): string {
    const cfg = this.getConfig();
    const curVol = this.getCurrentVolumeAdded();
    const curPh = this.getCurrentPh();
    const ind = this.getIndicator();
    const indColor = this.getCurrentIndicatorColor();
    const log = this.getLog();
    const estStatus = this.getEstimationStatus();

    return `
      <div class="titration-simulator-hub" style="display:flex;flex-direction:column;gap:1.5rem;max-width:1400px;margin:0 auto;padding:1.5rem;box-sizing:border-box;font-family:var(--g9-font-family, system-ui, sans-serif);">
        
        <!-- Header -->
        <header style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:1rem;padding-bottom:1rem;border-bottom:2px solid #e2e8f0;">
          <div>
            <div style="display:flex;gap:8px;font-size:0.9rem;color:#64748b;margin-bottom:0.25rem;">
              <a href="#/home" style="color:#0284c7;text-decoration:none;font-weight:600;">Home</a> &gt; 
              <a href="#/subject/chemistry" style="color:#0284c7;text-decoration:none;font-weight:600;">Chemistry</a> &gt; 
              <span>Volumetric Titration Lab</span>
            </div>
            <h1 style="margin:0;font-size:1.85rem;font-weight:800;color:#0f172a;">🧪 Acid-Base Volumetric Titration Simulator</h1>
            <p style="margin:0.25rem 0 0;color:#475569;font-size:1rem;">Analytical pH Curve, Indicator Transitions &amp; Stoichiometric Equivalence</p>
          </div>
          
          <div style="display:flex;gap:12px;align-items:center;">
            <span style="font-size:0.875rem;font-weight:700;background:#fef3c7;color:#92400e;padding:6px 12px;border-radius:6px;border:1px solid #fde68a;">
              [Formative Self-Check · Diagnostic Exploration (HOLD)]
            </span>
            <button type="button" id="btn-back-chem" style="min-height:${HIT_TARGET_MIN_PX}px;padding:8px 16px;background:#0f172a;color:white;border:none;border-radius:6px;cursor:pointer;font-weight:700;">← Back</button>
          </div>
        </header>

        <!-- Unreviewed Diagnostic Banner -->
        <div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:8px;padding:0.75rem 1.25rem;display:flex;align-items:center;gap:12px;">
          <span style="font-size:1.25rem;">ℹ️</span>
          <div style="font-size:0.95rem;color:#1e40af;">
            <strong>Volumetric Simulation · Academic Admission: HOLD</strong> — Formative virtual titration bench. Analytical equilibrium model (Ka = 1.80e-5, Kw = 1.00e-14, 25°C). Local simulated equilibrium only; disclaims formal laboratory practical evaluation.
          </div>
        </div>

        <!-- System Controls Bar -->
        <div style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:1rem;background:#ffffff;border:1px solid #cbd5e1;border-radius:10px;padding:1rem;">
          <!-- Mode Switcher -->
          <div style="display:flex;align-items:center;gap:8px;">
            <span style="font-size:0.9rem;font-weight:700;color:#334155;">Analyte System:</span>
            <button type="button" class="btn-mode" data-mode="WEAK_STRONG" style="min-height:${HIT_TARGET_MIN_PX}px;padding:8px 14px;background:${cfg.mode === 'WEAK_STRONG' ? '#0284c7' : '#f1f5f9'};color:${cfg.mode === 'WEAK_STRONG' ? '#ffffff' : '#0f172a'};border:1px solid #cbd5e1;border-radius:6px;font-weight:700;cursor:pointer;">
              Weak Acid (CH₃COOH) + Strong Base
            </button>
            <button type="button" class="btn-mode" data-mode="STRONG_STRONG" style="min-height:${HIT_TARGET_MIN_PX}px;padding:8px 14px;background:${cfg.mode === 'STRONG_STRONG' ? '#0284c7' : '#f1f5f9'};color:${cfg.mode === 'STRONG_STRONG' ? '#ffffff' : '#0f172a'};border:1px solid #cbd5e1;border-radius:6px;font-weight:700;cursor:pointer;">
              Strong Acid (HCl) + Strong Base
            </button>
          </div>

          <!-- Indicator Switcher -->
          <div style="display:flex;align-items:center;gap:8px;">
            <span style="font-size:0.9rem;font-weight:700;color:#334155;">Indicator:</span>
            <button type="button" class="btn-ind" data-ind="PHENOLPHTHALEIN" style="min-height:${HIT_TARGET_MIN_PX}px;padding:8px 14px;background:${ind === 'PHENOLPHTHALEIN' ? '#0284c7' : '#f1f5f9'};color:${ind === 'PHENOLPHTHALEIN' ? '#ffffff' : '#0f172a'};border:1px solid #cbd5e1;border-radius:6px;font-weight:700;cursor:pointer;">
              Phenolphthalein (8.2 - 10.0)
            </button>
            <button type="button" class="btn-ind" data-ind="METHYL_ORANGE" style="min-height:${HIT_TARGET_MIN_PX}px;padding:8px 14px;background:${ind === 'METHYL_ORANGE' ? '#0284c7' : '#f1f5f9'};color:${ind === 'METHYL_ORANGE' ? '#ffffff' : '#0f172a'};border:1px solid #cbd5e1;border-radius:6px;font-weight:700;cursor:pointer;">
              Methyl Orange (3.1 - 4.4)
            </button>
          </div>
        </div>

        <!-- Main Workspace Split: Curve Graph (Left) & Laboratory Bench (Right) -->
        <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(min(100%, 540px), 1fr));gap:20px;align-items:start;">
          
          <!-- Left Column: SVG Titration Curve -->
          <div style="background:#ffffff;border:1px solid #cbd5e1;border-radius:12px;padding:1.5rem;box-shadow:0 1px 3px rgba(0,0,0,0.05);">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.75rem;">
              <h2 style="margin:0;font-size:1.35rem;color:#0f172a;font-weight:700;">Dynamic pH Curve</h2>
              <div style="background:#f8fafc;border:1px solid #cbd5e1;border-radius:6px;padding:4px 12px;font-weight:800;color:#0284c7;">
                pH: <span id="telemetry-ph">${curPh.toFixed(2)}</span>
              </div>
            </div>
            
            <div class="curve-container" style="border:1px solid #e2e8f0;border-radius:8px;padding:4px;margin-bottom:1rem;">
              ${this.generateCurveSvg()}
            </div>

            <!-- Volume Dispensing Controls -->
            <div style="display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin-bottom:1rem;">
              <span style="font-size:0.9rem;font-weight:700;color:#334155;">Dispense 0.10 M NaOH:</span>
              <button type="button" class="btn-dispense" data-vol="0.1" style="min-height:${HIT_TARGET_MIN_PX}px;padding:8px 12px;background:#0284c7;color:white;border:none;border-radius:6px;font-weight:700;cursor:pointer;">+0.1 mL</button>
              <button type="button" class="btn-dispense" data-vol="0.5" style="min-height:${HIT_TARGET_MIN_PX}px;padding:8px 12px;background:#0284c7;color:white;border:none;border-radius:6px;font-weight:700;cursor:pointer;">+0.5 mL</button>
              <button type="button" class="btn-dispense" data-vol="1.0" style="min-height:${HIT_TARGET_MIN_PX}px;padding:8px 14px;background:#0284c7;color:white;border:none;border-radius:6px;font-weight:700;cursor:pointer;">+1.0 mL</button>
              <button type="button" class="btn-dispense" data-vol="5.0" style="min-height:${HIT_TARGET_MIN_PX}px;padding:8px 14px;background:#0284c7;color:white;border:none;border-radius:6px;font-weight:700;cursor:pointer;">+5.0 mL</button>
              <button type="button" id="btn-reset-titr" style="min-height:${HIT_TARGET_MIN_PX}px;padding:8px 16px;background:#f1f5f9;color:#475569;border:1px solid #cbd5e1;border-radius:6px;font-weight:700;margin-left:auto;cursor:pointer;">Reset Buret</button>
            </div>
          </div>

          <!-- Right Column: Digital Flask & Equivalence Diagnostic -->
          <div style="display:flex;flex-direction:column;gap:1.5rem;">
            
            <!-- Conical Flask Visualization Card -->
            <div style="background:#ffffff;border:1px solid #cbd5e1;border-radius:12px;padding:1.5rem;box-shadow:0 1px 3px rgba(0,0,0,0.05);text-align:center;">
              <h3 style="margin:0 0 1rem;font-size:1.15rem;color:#0f172a;font-weight:700;">Analyte Conical Flask View</h3>
              
              <div style="display:flex;justify-content:center;margin-bottom:1rem;">
                ${this.generateFlaskSvg()}
              </div>

              <div style="display:flex;justify-content:space-around;padding:10px;background:#f8fafc;border-radius:8px;font-size:0.95rem;">
                <div>Volume Added: <strong>${curVol.toFixed(1)} mL</strong></div>
                <div>Flask Solution: <strong style="color:${indColor.hex};">${escapeHtml(indColor.label)}</strong></div>
              </div>
            </div>

            <!-- Formative Diagnostic Estimation Drill -->
            <div style="background:#ffffff;border:1px solid #cbd5e1;border-radius:12px;padding:1.5rem;box-shadow:0 1px 3px rgba(0,0,0,0.05);">
              <h3 style="margin:0 0 0.5rem;font-size:1.15rem;color:#0f172a;font-weight:700;">Diagnostic Concentration Estimation</h3>
              <p style="margin:0 0 1rem;font-size:0.9rem;color:#64748b;line-height:1.4;">
                From the titration curve equivalence volume (V_eq = 25.0 mL) and titrant C_b = 0.100 M, estimate analyte concentration C_a (aliquot V_a = 25.0 mL).
              </p>

              <div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap;margin-bottom:0.75rem;">
                <input type="number" id="input-conc-est" step="0.001" placeholder="e.g. 0.100" style="flex:1;min-height:${HIT_TARGET_MIN_PX}px;padding:8px 12px;border:2px solid #cbd5e1;border-radius:6px;font-size:1rem;font-weight:700;" />
                <button type="button" id="btn-submit-est" style="min-height:${HIT_TARGET_MIN_PX}px;padding:8px 18px;background:#0284c7;color:white;border:none;border-radius:6px;font-weight:700;cursor:pointer;">Verify Estimation</button>
              </div>

              ${estStatus.submitted && estStatus.feedback === null ? `
                <div style="background:#dcfce7;border:1px solid #86efac;color:#166534;padding:8px 12px;border-radius:6px;font-weight:700;font-size:0.95rem;">
                  ✓ Correct! Analytical concentration verified within experimental tolerance.
                </div>
              ` : estStatus.submitted && estStatus.feedback ? `
                <div style="background:#fee2e2;border:1px solid #fca5a5;color:#991b1b;padding:8px 12px;border-radius:6px;font-weight:700;font-size:0.95rem;">
                  ${escapeHtml(estStatus.feedback)}
                </div>
              ` : ''}
            </div>

          </div>

        </div>

        <!-- Titration History / Data Log -->
        <div style="background:#ffffff;border:1px solid #cbd5e1;border-radius:12px;padding:1.5rem;box-shadow:0 1px 3px rgba(0,0,0,0.05);">
          <h3 style="margin:0 0 1rem;font-size:1.15rem;color:#0f172a;font-weight:700;">Titration Telemetry Log (${log.length} measurements)</h3>
          
          <div style="max-height:220px;overflow-y:auto;border:1px solid #e2e8f0;border-radius:6px;">
            <table style="width:100%;border-collapse:collapse;font-size:0.9rem;" role="table" aria-label="Titration Volume and pH Log">
              <thead>
                <tr style="background:#f1f5f9;text-align:left;">
                  <th style="padding:8px 12px;border-bottom:1px solid #cbd5e1;">Step</th>
                  <th style="padding:8px 12px;border-bottom:1px solid #cbd5e1;">Volume Added (mL)</th>
                  <th style="padding:8px 12px;border-bottom:1px solid #cbd5e1;">Solution pH</th>
                  <th style="padding:8px 12px;border-bottom:1px solid #cbd5e1;">Indicator Visual</th>
                </tr>
              </thead>
              <tbody>
                ${log.map((entry, idx) => `
                  <tr style="border-bottom:1px solid #f1f5f9;">
                    <td style="padding:6px 12px;">#${idx + 1}</td>
                    <td style="padding:6px 12px;">${entry.volumeAddedMl.toFixed(1)} mL</td>
                    <td style="padding:6px 12px;font-weight:700;color:#0284c7;">${entry.pH.toFixed(2)}</td>
                    <td style="padding:6px 12px;">${escapeHtml(entry.indicatorColor)}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    `;
  }
}

// ---------------------------------------------------------------------------
// DOM Mount Function
// ---------------------------------------------------------------------------

export function mountTitrationSimulator(
  root: HTMLElement,
  controller?: TitrationSimulatorController,
  onNavigate?: (route: string) => void
): { dispose: () => void } {
  let active = true;
  const ctrl = controller || new TitrationSimulatorController();

  const render = () => {
    if (!active) return;
    const cfg = ctrl.getConfig();
    const curVol = ctrl.getCurrentVolumeAdded();
    const curPh = ctrl.getCurrentPh();
    const ind = ctrl.getIndicator();
    const indColor = ctrl.getCurrentIndicatorColor();
    const log = ctrl.getLog();
    const estStatus = ctrl.getEstimationStatus();

    root.innerHTML = `
      <div class="titration-simulator-hub" style="display:flex;flex-direction:column;gap:1.5rem;max-width:1400px;margin:0 auto;padding:1.5rem;box-sizing:border-box;font-family:var(--g9-font-family, system-ui, sans-serif);">
        
        <!-- Header -->
        <header style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:1rem;padding-bottom:1rem;border-bottom:2px solid #e2e8f0;">
          <div>
            <div style="display:flex;gap:8px;font-size:0.9rem;color:#64748b;margin-bottom:0.25rem;">
              <a href="#/home" style="color:#0284c7;text-decoration:none;font-weight:600;">Home</a> &gt; 
              <a href="#/subject/chemistry" style="color:#0284c7;text-decoration:none;font-weight:600;">Chemistry</a> &gt; 
              <span>Volumetric Titration Lab</span>
            </div>
            <h1 style="margin:0;font-size:1.85rem;font-weight:800;color:#0f172a;">🧪 Acid-Base Volumetric Titration Simulator</h1>
            <p style="margin:0.25rem 0 0;color:#475569;font-size:1rem;">Analytical pH Curve, Indicator Transitions &amp; Stoichiometric Equivalence</p>
          </div>
          
          <div style="display:flex;gap:12px;align-items:center;">
            <span style="font-size:0.875rem;font-weight:700;background:#fef3c7;color:#92400e;padding:6px 12px;border-radius:6px;border:1px solid #fde68a;">
              [Formative Self-Check · Diagnostic Exploration (HOLD)]
            </span>
            <button type="button" id="btn-back-chem" style="min-height:${HIT_TARGET_MIN_PX}px;padding:8px 16px;background:#0f172a;color:white;border:none;border-radius:6px;cursor:pointer;font-weight:700;">← Back</button>
          </div>
        </header>

        <!-- Unreviewed Diagnostic Banner -->
        <div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:8px;padding:0.75rem 1.25rem;display:flex;align-items:center;gap:12px;">
          <span style="font-size:1.25rem;">ℹ️</span>
          <div style="font-size:0.95rem;color:#1e40af;">
            <strong>Volumetric Simulation · Academic Admission: HOLD</strong> — Formative virtual titration bench. Analytical equilibrium model (Ka = 1.80e-5, Kw = 1.00e-14, 25°C). Unsealed practice checks.
          </div>
        </div>

        <!-- System Controls Bar -->
        <div style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:1rem;background:#ffffff;border:1px solid #cbd5e1;border-radius:10px;padding:1rem;">
          <!-- Mode Switcher -->
          <div style="display:flex;align-items:center;gap:8px;">
            <span style="font-size:0.9rem;font-weight:700;color:#334155;">Analyte System:</span>
            <button type="button" class="btn-mode" data-mode="WEAK_STRONG" style="min-height:${HIT_TARGET_MIN_PX}px;padding:8px 14px;background:${cfg.mode === 'WEAK_STRONG' ? '#0284c7' : '#f1f5f9'};color:${cfg.mode === 'WEAK_STRONG' ? '#ffffff' : '#0f172a'};border:1px solid #cbd5e1;border-radius:6px;font-weight:700;cursor:pointer;">
              Weak Acid (CH₃COOH) + Strong Base
            </button>
            <button type="button" class="btn-mode" data-mode="STRONG_STRONG" style="min-height:${HIT_TARGET_MIN_PX}px;padding:8px 14px;background:${cfg.mode === 'STRONG_STRONG' ? '#0284c7' : '#f1f5f9'};color:${cfg.mode === 'STRONG_STRONG' ? '#ffffff' : '#0f172a'};border:1px solid #cbd5e1;border-radius:6px;font-weight:700;cursor:pointer;">
              Strong Acid (HCl) + Strong Base
            </button>
          </div>

          <!-- Indicator Switcher -->
          <div style="display:flex;align-items:center;gap:8px;">
            <span style="font-size:0.9rem;font-weight:700;color:#334155;">Indicator:</span>
            <button type="button" class="btn-ind" data-ind="PHENOLPHTHALEIN" style="min-height:${HIT_TARGET_MIN_PX}px;padding:8px 14px;background:${ind === 'PHENOLPHTHALEIN' ? '#0284c7' : '#f1f5f9'};color:${ind === 'PHENOLPHTHALEIN' ? '#ffffff' : '#0f172a'};border:1px solid #cbd5e1;border-radius:6px;font-weight:700;cursor:pointer;">
              Phenolphthalein (8.2 - 10.0)
            </button>
            <button type="button" class="btn-ind" data-ind="METHYL_ORANGE" style="min-height:${HIT_TARGET_MIN_PX}px;padding:8px 14px;background:${ind === 'METHYL_ORANGE' ? '#0284c7' : '#f1f5f9'};color:${ind === 'METHYL_ORANGE' ? '#ffffff' : '#0f172a'};border:1px solid #cbd5e1;border-radius:6px;font-weight:700;cursor:pointer;">
              Methyl Orange (3.1 - 4.4)
            </button>
          </div>
        </div>

        <!-- Main Workspace Split: Curve Graph (Left) & Laboratory Bench (Right) -->
        <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(min(100%, 540px), 1fr));gap:20px;align-items:start;">
          
          <!-- Left Column: SVG Titration Curve -->
          <div style="background:#ffffff;border:1px solid #cbd5e1;border-radius:12px;padding:1.5rem;box-shadow:0 1px 3px rgba(0,0,0,0.05);">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.75rem;">
              <h2 style="margin:0;font-size:1.35rem;color:#0f172a;font-weight:700;">Dynamic pH Curve</h2>
              <div style="background:#f8fafc;border:1px solid #cbd5e1;border-radius:6px;padding:4px 12px;font-weight:800;color:#0284c7;">
                pH: <span id="telemetry-ph">${curPh.toFixed(2)}</span>
              </div>
            </div>
            
            <div class="curve-container" style="border:1px solid #e2e8f0;border-radius:8px;padding:4px;margin-bottom:1rem;">
              ${ctrl.generateCurveSvg()}
            </div>

            <!-- Volume Dispensing Controls -->
            <div style="display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin-bottom:1rem;">
              <span style="font-size:0.9rem;font-weight:700;color:#334155;">Dispense 0.10 M NaOH:</span>
              <button type="button" class="btn-dispense" data-vol="0.1" data-dispense="0.1" style="min-height:${HIT_TARGET_MIN_PX}px;padding:8px 12px;background:#0284c7;color:white;border:none;border-radius:6px;font-weight:700;cursor:pointer;">+0.1 mL</button>
              <button type="button" class="btn-dispense" data-vol="0.5" data-dispense="0.5" style="min-height:${HIT_TARGET_MIN_PX}px;padding:8px 12px;background:#0284c7;color:white;border:none;border-radius:6px;font-weight:700;cursor:pointer;">+0.5 mL</button>
              <button type="button" class="btn-dispense" data-vol="1.0" data-dispense="1.0" style="min-height:${HIT_TARGET_MIN_PX}px;padding:8px 14px;background:#0284c7;color:white;border:none;border-radius:6px;font-weight:700;cursor:pointer;">+1.0 mL</button>
              <button type="button" class="btn-dispense" data-vol="5.0" data-dispense="5.0" style="min-height:${HIT_TARGET_MIN_PX}px;padding:8px 14px;background:#0284c7;color:white;border:none;border-radius:6px;font-weight:700;cursor:pointer;">+5.0 mL</button>
              <button type="button" id="btn-reset-titr" style="min-height:${HIT_TARGET_MIN_PX}px;padding:8px 16px;background:#f1f5f9;color:#475569;border:1px solid #cbd5e1;border-radius:6px;font-weight:700;margin-left:auto;cursor:pointer;">Reset Buret</button>
            </div>
          </div>

          <!-- Right Column: Visual Flask & Volume Log -->
          <div style="display:flex;flex-direction:column;gap:16px;">
            <!-- Conical Flask Visualization Card -->
            <div style="background:#ffffff;border:1px solid #cbd5e1;border-radius:12px;padding:1.5rem;box-shadow:0 1px 3px rgba(0,0,0,0.05);display:flex;flex-wrap:wrap;gap:20px;align-items:center;">
              <!-- Flask SVG -->
              <div style="width:140px;height:160px;position:relative;margin:0 auto;">
                ${ctrl.generateFlaskSvg()}
              </div>

              <!-- Flask State Info -->
              <div style="flex:1;min-width:200px;">
                <h3 style="margin:0 0 0.5rem;font-size:1.15rem;color:#0f172a;">Reaction Vessel State</h3>
                <div style="font-size:0.95rem;color:#334155;line-height:1.6;">
                  <div>Titrant Added: <strong id="telemetry-vol">${curVol.toFixed(1)} mL</strong></div>
                  <div>Total Volume: <strong>${(cfg.analyteVolumeMl + curVol).toFixed(1)} mL</strong></div>
                  <div>Solution Color: <strong style="color:#0284c7;">${escapeHtml(indColor.label)}</strong></div>
                  <div>Equivalence Target: <strong>25.0 mL</strong></div>
                </div>
              </div>
            </div>

            <!-- Formative Diagnostic Estimation Drill -->
            <div style="background:#ffffff;border:1px solid #cbd5e1;border-radius:12px;padding:1.5rem;box-shadow:0 1px 3px rgba(0,0,0,0.05);">
              <h3 style="margin:0 0 0.5rem;font-size:1.15rem;color:#0f172a;">Formative Estimation Drill</h3>
              <p style="margin:0 0 1rem;font-size:0.9rem;color:#64748b;">Determine analyte concentration from titration volume:</p>
              
              <div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap;margin-bottom:0.75rem;">
                <input type="number" id="input-est-conc" step="0.001" placeholder="e.g. 0.085 M" style="min-height:${HIT_TARGET_MIN_PX}px;padding:8px 12px;border:1px solid #cbd5e1;border-radius:6px;width:150px;font-weight:700;" />
                <button type="button" id="btn-submit-est" style="min-height:${HIT_TARGET_MIN_PX}px;padding:8px 18px;background:#0284c7;color:white;border:none;border-radius:6px;font-weight:700;cursor:pointer;">Check Estimation</button>
              </div>

              ${estStatus.feedback ? `
                <div id="est-feedback-msg" style="padding:10px;border-radius:6px;background:${estStatus.isCorrect ? '#f0fdf4' : '#fef2f2'};border:1px solid ${estStatus.isCorrect ? '#bbf7d0' : '#fecaca'};color:${estStatus.isCorrect ? '#166534' : '#991b1b'};font-size:0.9rem;">
                  ${escapeHtml(estStatus.feedback)}
                </div>
              ` : ''}
            </div>

            <!-- Tabular Titration Log -->
            <div style="background:#ffffff;border:1px solid #cbd5e1;border-radius:12px;padding:1.5rem;box-shadow:0 1px 3px rgba(0,0,0,0.05);">
              <h3 style="margin:0 0 0.75rem;font-size:1.15rem;color:#0f172a;">Accessible Titration Volume Log</h3>
              <div style="max-height:180px;overflow-y:auto;border:1px solid #e2e8f0;border-radius:6px;">
                <table style="width:100%;border-collapse:collapse;font-size:0.875rem;" role="table" aria-label="Titration Steps Log">
                  <thead>
                    <tr style="background:#f8fafc;text-align:left;position:sticky;top:0;">
                      <th style="padding:6px 10px;border-bottom:1px solid #cbd5e1;">Step</th>
                      <th style="padding:6px 10px;border-bottom:1px solid #cbd5e1;">Added (mL)</th>
                      <th style="padding:6px 10px;border-bottom:1px solid #cbd5e1;">pH</th>
                      <th style="padding:6px 10px;border-bottom:1px solid #cbd5e1;">Color</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${log.slice(-10).map((entry, idx) => `
                      <tr style="border-bottom:1px solid #f1f5f9;">
                        <td style="padding:6px 10px;">${idx + 1}</td>
                        <td style="padding:6px 10px;">${entry.volumeAddedMl.toFixed(1)}</td>
                        <td style="padding:6px 10px;font-weight:700;">${entry.pH.toFixed(2)}</td>
                        <td style="padding:6px 10px;">${escapeHtml(entry.indicatorColor)}</td>
                      </tr>
                    `).join('')}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

        </div>

      </div>
    `;

    bindEvents();
  };

  const bindEvents = () => {
    // Back navigation
    root.querySelector<HTMLButtonElement>('#btn-back-chem')?.addEventListener('click', () => {
      if (onNavigate) onNavigate('/subject/chemistry');
      else window.location.hash = '#/subject/chemistry';
    });

    // Mode buttons
    root.querySelectorAll<HTMLButtonElement>('.btn-mode').forEach((btn) => {
      btn.addEventListener('click', () => {
        const mode = btn.dataset.mode as TitrationMode;
        if (mode) {
          ctrl.setMode(mode);
          render();
        }
      });
    });

    // Indicator buttons
    root.querySelectorAll<HTMLButtonElement>('.btn-ind').forEach((btn) => {
      btn.addEventListener('click', () => {
        const ind = btn.dataset.ind as ChemicalIndicator;
        if (ind) {
          ctrl.setIndicator(ind);
          render();
        }
      });
    });

    // Dispense buttons
    root.querySelectorAll<HTMLButtonElement>('.btn-dispense').forEach((btn) => {
      btn.addEventListener('click', () => {
        const vol = parseFloat(btn.dataset.vol || '0');
        if (vol > 0) {
          ctrl.dispense(vol);
          render();
        }
      });
    });

    // Reset button
    root.querySelector<HTMLButtonElement>('#btn-reset-titr')?.addEventListener('click', () => {
      ctrl.reset();
      render();
    });

    // Estimation drill
    root.querySelector<HTMLButtonElement>('#btn-submit-est')?.addEventListener('click', () => {
      const input = root.querySelector<HTMLInputElement>('#input-est-conc');
      if (input && input.value) {
        const est = parseFloat(input.value);
        if (!isNaN(est)) {
          ctrl.submitUnknownEstimation(est);
          render();
        }
      }
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
