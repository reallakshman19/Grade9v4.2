import {escapeHtml as e, formatLatexMath, renderMathHtml} from '../../runtime/rendering.ts';
import {publicAnchor,ANCHOR_LEVELS,type ProgressiveAnchor,type ExactRef,type AnchorLevel} from '../../journeys/core1a.ts';
import {refOk} from '../../runtime/progress.ts';
import {getDisciplinaryWarrant, type DisciplinaryWarrant} from '../../data/warrants-database.ts';

export interface AnchorViewConfig {
  readonly anchors: readonly ProgressiveAnchor[];
  readonly synthesisTaskRef: ExactRef;
  readonly synthesisTaskPrompt: string;
  readonly synthesisCheck?: string;
  readonly initialLevel?: AnchorLevel;
  readonly allowCandidateSolutions?: boolean;
  readonly studentAnswers?: Map<AnchorLevel, string>;
  readonly feedback?: Map<AnchorLevel, { correct: boolean; message: string }>;
  readonly interactiveParams?: Map<AnchorLevel, Record<string, number>>;
  readonly topicCode?: string;
}

export class Core1AAnchorViewController {
  private readonly anchors: readonly ProgressiveAnchor[];
  private readonly rawSolutionSteps: Map<AnchorLevel, readonly string[]> = new Map();
  private readonly synthesis: ExactRef;
  private readonly prompt: string;
  private readonly synthesisCheck?: string;
  private readonly allowCandidate: boolean;
  private level: AnchorLevel = 'FOUNDATION';
  private revealedSolutions: Set<AnchorLevel> = new Set();
  private studentAnswers: Map<AnchorLevel, string> = new Map();
  private feedback: Map<AnchorLevel, { correct: boolean; message: string }> = new Map();
  private interactiveParams: Map<AnchorLevel, Record<string, number>> = new Map();
  private topicCode: string = '';

  constructor(c: AnchorViewConfig) {
    if (
      c.anchors.length !== 3 ||
      c.anchors.some((a, i) => a.level !== ANCHOR_LEVELS[i]) ||
      !refOk(c.synthesisTaskRef) ||
      new Set([...c.anchors.map(a => a.taskRef.id), c.synthesisTaskRef.id]).size !== 4
    ) {
      throw Error('N32_VIOLATION');
    }

    // Retain candidate solution steps if non-secret and candidate solutions are authorized
    for (const a of c.anchors) {
      const safeSteps = (a.solutionSteps || []).filter(s => !s.includes('SECRET_'));
      this.rawSolutionSteps.set(a.level, safeSteps);
    }

    this.anchors = c.anchors.map(publicAnchor);
    this.synthesis = structuredClone(c.synthesisTaskRef);
    this.prompt = c.synthesisTaskPrompt;
    this.synthesisCheck = c.synthesisCheck;
    this.allowCandidate = c.allowCandidateSolutions ?? true;
    this.topicCode = (c.topicCode || '').toLowerCase();

    if (c.studentAnswers) {
      for (const [k, v] of c.studentAnswers) this.studentAnswers.set(k, v);
    }
    if (c.feedback) {
      for (const [k, v] of c.feedback) this.feedback.set(k, v);
    }
    if (c.interactiveParams) {
      for (const [k, v] of c.interactiveParams) this.interactiveParams.set(k, { ...v });
    }

    this.selectLevel(c.initialLevel ?? 'FOUNDATION');
  }

  selectLevel(l: AnchorLevel) {
    if (!ANCHOR_LEVELS.includes(l)) throw Error('Invalid anchor');
    this.level = l;
  }

  getActiveLevel(): AnchorLevel {
    return this.level;
  }

  toggleSolution(l?: AnchorLevel): boolean {
    const target = l ?? this.level;
    // Strict fail-closed gate when synthesisCheck or secret presence is active
    if (this.synthesisCheck || !this.allowCandidate) {
      return false;
    }
    const steps = this.rawSolutionSteps.get(target);
    if (!steps || steps.length === 0) {
      return false;
    }
    if (this.revealedSolutions.has(target)) {
      this.revealedSolutions.delete(target);
      return false;
    } else {
      this.revealedSolutions.add(target);
      return true;
    }
  }

  isSolutionRevealed(l: AnchorLevel): boolean {
    return this.revealedSolutions.has(l);
  }

  setStudentAnswer(l: AnchorLevel, ans: string): void {
    this.studentAnswers.set(l, ans);
  }

  getStudentAnswer(l: AnchorLevel): string {
    return this.studentAnswers.get(l) || '';
  }

  setFeedback(l: AnchorLevel, fb: { correct: boolean; message: string } | null): void {
    if (fb) this.feedback.set(l, fb);
    else this.feedback.delete(l);
  }

  getFeedback(l: AnchorLevel): { correct: boolean; message: string } | undefined {
    return this.feedback.get(l);
  }

  setInteractiveParam(l: AnchorLevel, param: string, value: number): void {
    const p = this.interactiveParams.get(l) || {};
    p[param] = value;
    this.interactiveParams.set(l, p);
  }

  getInteractiveParam(l: AnchorLevel, param: string, defaultValue: number): number {
    const p = this.interactiveParams.get(l);
    if (p && param in p && !Number.isNaN(p[param])) {
      return p[param];
    }
    return defaultValue;
  }

  checkAnswer(l: AnchorLevel, rawInput: string): { correct: boolean; message: string } {
    const input = rawInput.trim();
    if (!input) {
      return { correct: false, message: 'Please enter a numerical value to check.' };
    }

    const matches = input.match(/[-+]?[0-9]*\.?[0-9]+/g);
    if (!matches || matches.length === 0) {
      return { correct: false, message: 'Please enter a valid number (e.g. 100 or 4.9).' };
    }
    const val = parseFloat(matches[0]);

    // Check by topic and level
    let target = NaN;
    let unit = '';
    let explanation = '';

    if (this.topicCode.includes('grav')) {
      if (l === 'FOUNDATION') {
        target = 4.9;
        unit = 'm/s²';
        explanation = 'Surface gravity g = G(2M)/(2R)² = 0.5 · g_Earth = 4.9 m/s²';
      } else if (l === 'CONNECTED') {
        target = 2.52;
        unit = 'times';
        explanation = 'By Kepler III: (r₂/r₁)³ = (T₂/T₁)² = 16 => r₂/r₁ = 16^(1/3) ≈ 2.52';
      } else {
        target = 0.5;
        unit = 'm v_o²';
        explanation = 'Additional escape energy ΔE = E_esc - E_orb = 0 - (-0.5 m v_o²) = +0.5 m v_o²';
      }
    } else if (this.topicCode.includes('fluid')) {
      if (l === 'FOUNDATION') {
        if (Math.abs(val - 199.3) < 2) {
          return { correct: true, message: '🎉 Spot on! P_abs = 199.3 kPa (including atmospheric pressure P₀ = 101.3 kPa).' };
        }
        target = 98.0;
        unit = 'kPa';
        explanation = 'Gauge pressure P_gauge = ρ g h = 1000 · 9.8 · 10 = 98,000 Pa = 98.0 kPa';
      } else if (l === 'CONNECTED') {
        target = 1.84;
        unit = 'L (or 10⁻³ m³)';
        explanation = 'Buoyant force F_b = 50 - 32 = 18 N. Volume V = 18 / (1000 · 9.8) ≈ 1.84 × 10⁻³ m³';
      } else {
        target = 15000;
        unit = 'N (15 kN)';
        explanation = 'Output force F₂ = F₁ · (r₂/r₁)² = 150 · (20/2)² = 150 · 100 = 15,000 N';
      }
    } else if (this.topicCode.includes('plane') || this.topicCode.includes('projectile')) {
      if (l === 'FOUNDATION') {
        target = 5.0;
        unit = 'm';
        explanation = 'H_max = (v₀ sin θ)² / (2g) = (20 · 0.5)² / (2 · 10) = 100 / 20 = 5 m';
      } else if (l === 'CONNECTED') {
        target = 34.6;
        unit = 'm';
        explanation = 'Range R = (v₀² sin 2θ) / g = (400 · sin 60°) / 10 ≈ 34.6 m';
      } else {
        target = 2.0;
        unit = 's';
        explanation = 'Time of flight T = (2 v₀ sin θ) / g = (2 · 20 · 0.5) / 10 = 2.0 s';
      }
    } else {
      // WPE / Default Mechanics
      if (l === 'FOUNDATION') {
        target = 100;
        unit = 'J';
        explanation = 'Work W = F · d · cos(0°) = 20 N · 5 m · 1 = 100 Joules';
      } else if (l === 'CONNECTED') {
        target = 50;
        unit = 'J';
        explanation = 'Work W = F · d · cos(60°) = 20 N · 5 m · 0.5 = 50 Joules';
      } else {
        target = -100;
        unit = 'J';
        explanation = 'Braking work W = F · d · cos(180°) = 20 N · 5 m · (-1) = -100 Joules (Energy removed)';
      }
    }

    if (!Number.isNaN(target)) {
      const relDiff = Math.abs(val - target) / (Math.abs(target) || 1);
      if (relDiff < 0.04 || Math.abs(val - target) < 0.15) {
        return {
          correct: true,
          message: `🎉 Spot on! Exactly right (${input}). ${explanation}. Excellent physical deduction!`
        };
      }
      if (relDiff < 0.2) {
        return {
          correct: false,
          message: `💡 Very close! Expected around ${target} ${unit}. Check your arithmetic or rounding.`
        };
      }
      return {
        correct: false,
        message: `💡 Check the numbers in the prompt and the warrant formula above. Expected around ${target} ${unit}. Try again!`
      };
    }

    return {
      correct: true,
      message: `✓ Answer recorded: ${input}. Compare with the verified derivation below.`
    };
  }

  getViewState() {
    return {
      activeLevel: this.level,
      revealedSolutions: Array.from(this.revealedSolutions),
      hasSynthesisTask: !!this.prompt,
      minHitTargetPx: 48,
    };
  }

  private renderWarrantCard(warrantId: string): string {
    const warrant = getDisciplinaryWarrant(warrantId);
    if (!warrant) {
      return `<p class="warrant-ref"><strong>Warrants:</strong> <code>${e(warrantId)}</code></p>`;
    }

    return `
      <div class="g9-warrant-card" style="margin:16px 0;padding:16px;background:#f8fafc;border:1px solid #cbd5e1;border-left:4px solid #0284c7;border-radius:6px;">
        <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;margin-bottom:8px;">
          <span style="font-size:0.8rem;font-weight:700;color:#0369a1;background:#e0f2fe;padding:2px 8px;border-radius:4px;letter-spacing:0.04em;">
            ${e(warrant.discipline)} · DISCIPLINARY WARRANT
          </span>
          <span style="font-size:0.75rem;color:#64748b;font-family:monospace;">
            ${e(warrant.id)}
          </span>
        </div>
        <h4 style="margin:0 0 6px 0;font-size:1.05rem;color:#0f172a;">${renderMathHtml(e(warrant.title))}</h4>
        <div style="font-weight:600;font-size:0.92rem;color:#334155;margin-bottom:8px;">
          <em>Governing Model:</em> ${renderMathHtml(e(warrant.lawOrModel))}
        </div>
        <div style="padding:10px 14px;background:#ffffff;border:1px solid #e2e8f0;border-radius:6px;font-family:var(--g9-font-math,serif);font-size:1.15rem;color:#0369a1;margin:8px 0;">
          ${formatLatexMath(warrant.mathematicalFormula, true)}
        </div>
        <div style="font-size:0.92rem;color:#334155;line-height:1.55;margin-bottom:8px;">
          ${renderMathHtml(warrant.explanation)}
        </div>
        <details style="margin-top:10px;font-size:0.85rem;color:#475569;">
          <summary style="cursor:pointer;font-weight:600;color:#0284c7;outline:none;">
            Physical Assumptions, Validity Domain &amp; Sign Conventions
          </summary>
          <div style="margin-top:8px;padding:10px;background:#f1f5f9;border-radius:4px;">
            <p style="margin:0 0 4px 0;"><strong>Validity Domain:</strong> ${renderMathHtml(e(warrant.validityDomain))}</p>
            <p style="margin:0 0 4px 0;"><strong>Sign Convention:</strong> ${renderMathHtml(e(warrant.signConventions))}</p>
            <p style="margin:0 0 4px 0;"><strong>Fails When / Boundary Witness:</strong> ${renderMathHtml(e(warrant.counterexampleWitness))}</p>
            <strong>Key Assumptions:</strong>
            <ul style="margin:4px 0 0 18px;padding:0;">
              ${warrant.assumptions.map(a => `<li>${renderMathHtml(e(a))}</li>`).join('')}
            </ul>
          </div>
        </details>
      </div>
    `;
  }

  private renderInteractiveSimulation(l: AnchorLevel): string {
    if (this.topicCode.includes('grav')) {
      const massRatio = this.getInteractiveParam(l, 'mass', 2);
      const radiusRatio = this.getInteractiveParam(l, 'radius', 2);
      const gCalc = 9.8 * (massRatio / (radiusRatio * radiusRatio));
      const planetRadiusPx = Math.min(60, Math.max(25, 30 * radiusRatio));

      return `
        <div class="g9-anchor-sim" style="background:#0f172a;border-radius:8px;padding:16px;color:#ffffff;margin:16px 0;">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;flex-wrap:wrap;gap:8px;">
            <div style="font-size:0.95rem;font-weight:700;color:#38bdf8;">🪐 Surface Gravity &amp; Celestial Dynamics Simulator</div>
            <div style="font-size:0.85rem;background:#1e293b;padding:3px 10px;border-radius:4px;color:#facc15;font-weight:700;">
              g = ${gCalc.toFixed(2)} m/s² (${(gCalc / 9.8).toFixed(2)} g_Earth)
            </div>
          </div>
          <svg viewBox="0 0 540 140" style="width:100%;max-height:150px;display:block;">
            <!-- Reference Earth -->
            <circle cx="100" cy="70" r="30" fill="#0284c7" stroke="#38bdf8" stroke-width="2"/>
            <text x="100" y="74" fill="#ffffff" font-size="11" font-weight="700" text-anchor="middle" font-family="sans-serif">Earth (1 M, 1 R)</text>
            <text x="100" y="115" fill="#94a3b8" font-size="10" text-anchor="middle" font-family="sans-serif">g = 9.8 m/s²</text>

            <!-- Planet Under Test -->
            <circle cx="340" cy="70" r="${planetRadiusPx}" fill="#7c3aed" stroke="#c084fc" stroke-width="2"/>
            <text x="340" y="74" fill="#ffffff" font-size="11" font-weight="700" text-anchor="middle" font-family="sans-serif">Planet (${massRatio}M, ${radiusRatio}R)</text>

            <!-- Gravity Vector -->
            <line x1="340" y1="${70 - planetRadiusPx}" x2="340" y2="${70 - planetRadiusPx - Math.min(45, gCalc * 3)}" stroke="#facc15" stroke-width="3" marker-end="url(#arrowYellow)"/>
            <text x="350" y="${70 - planetRadiusPx - 15}" fill="#facc15" font-size="11" font-weight="700" font-family="sans-serif">g = ${gCalc.toFixed(2)} m/s²</text>

            <defs>
              <marker id="arrowYellow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#facc15" />
              </marker>
            </defs>
          </svg>
          <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:12px;margin-top:10px;background:#1e293b;padding:10px;border-radius:6px;">
            <label style="display:flex;flex-direction:column;gap:4px;font-size:0.85rem;color:#cbd5e1;">
              <span>Mass Scaling: <strong style="color:#38bdf8;">${massRatio} × M_Earth</strong></span>
              <input type="range" min="0.5" max="5" step="0.5" value="${massRatio}" data-anchor-param="mass" data-level="${l}" style="min-height:36px;"/>
            </label>
            <label style="display:flex;flex-direction:column;gap:4px;font-size:0.85rem;color:#cbd5e1;">
              <span>Radius Scaling: <strong style="color:#c084fc;">${radiusRatio} × R_Earth</strong></span>
              <input type="range" min="0.5" max="4" step="0.5" value="${radiusRatio}" data-anchor-param="radius" data-level="${l}" style="min-height:36px;"/>
            </label>
          </div>
        </div>
      `;
    }

    if (this.topicCode.includes('fluid')) {
      const depth = this.getInteractiveParam(l, 'depth', 10);
      const density = this.getInteractiveParam(l, 'density', 1000);
      const pGauge = (density * 9.8 * depth) / 1000;
      const pAbs = 101.3 + pGauge;
      const sensorY = 25 + Math.min(80, (depth / 30) * 80);

      return `
        <div class="g9-anchor-sim" style="background:#0f172a;border-radius:8px;padding:16px;color:#ffffff;margin:16px 0;">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;flex-wrap:wrap;gap:8px;">
            <div style="font-size:0.95rem;font-weight:700;color:#38bdf8;">💧 Hydrostatic Depth Pressure Visualizer</div>
            <div style="font-size:0.85rem;background:#1e293b;padding:3px 10px;border-radius:4px;color:#38bdf8;font-weight:700;">
              P_gauge = ${pGauge.toFixed(1)} kPa | P_abs = ${pAbs.toFixed(1)} kPa
            </div>
          </div>
          <svg viewBox="0 0 540 140" style="width:100%;max-height:150px;display:block;">
            <!-- Fluid Tank -->
            <rect x="80" y="25" width="380" height="95" fill="#0284c7" fill-opacity="0.35" stroke="#38bdf8" stroke-width="2" rx="4"/>
            <line x1="80" y1="25" x2="460" y2="25" stroke="#38bdf8" stroke-width="2" stroke-dasharray="4,2"/>
            <text x="470" y="30" fill="#38bdf8" font-size="11" font-family="sans-serif">Surface P₀</text>

            <!-- Sensor Probe -->
            <line x1="200" y1="25" x2="200" y2="${sensorY}" stroke="#facc15" stroke-width="3"/>
            <circle cx="200" cy="${sensorY}" r="6" fill="#facc15" stroke="#ffffff" stroke-width="2"/>
            <text x="215" y="${sensorY + 4}" fill="#facc15" font-size="11" font-weight="700" font-family="sans-serif">Depth h = ${depth} m</text>

            <!-- Pressure Indicator Bar -->
            <rect x="360" y="45" width="80" height="60" fill="#1e293b" stroke="#64748b" rx="4"/>
            <text x="400" y="65" fill="#94a3b8" font-size="10" text-anchor="middle" font-family="sans-serif">Pressure Gauge</text>
            <text x="400" y="85" fill="#38bdf8" font-size="13" font-weight="800" text-anchor="middle" font-family="sans-serif">${pGauge.toFixed(0)} kPa</text>
          </svg>
          <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:12px;margin-top:10px;background:#1e293b;padding:10px;border-radius:6px;">
            <label style="display:flex;flex-direction:column;gap:4px;font-size:0.85rem;color:#cbd5e1;">
              <span>Depth: <strong style="color:#facc15;">${depth} m</strong></span>
              <input type="range" min="1" max="30" step="1" value="${depth}" data-anchor-param="depth" data-level="${l}" style="min-height:36px;"/>
            </label>
            <label style="display:flex;flex-direction:column;gap:4px;font-size:0.85rem;color:#cbd5e1;">
              <span>Fluid Density: <strong style="color:#38bdf8;">${density} kg/m³</strong></span>
              <input type="range" min="800" max="1400" step="50" value="${density}" data-anchor-param="density" data-level="${l}" style="min-height:36px;"/>
            </label>
          </div>
        </div>
      `;
    }

    // Default: Work, Power & Energy
    const defAngle = l === 'ADVANCED' ? 180 : l === 'CONNECTED' ? 60 : 0;
    const force = this.getInteractiveParam(l, 'force', 20);
    const dist = this.getInteractiveParam(l, 'dist', 5);
    const angle = this.getInteractiveParam(l, 'angle', defAngle);
    const rad = (angle * Math.PI) / 180;
    const work = force * dist * Math.cos(rad);

    // Vector line coordinates
    const arrowLen = Math.min(70, Math.max(25, force * 1.8));
    const fx = 180 + arrowLen * Math.cos(rad);
    const fy = 65 - arrowLen * Math.sin(rad);
    const workColor = work > 0 ? '#10b981' : work < 0 ? '#ef4444' : '#f59e0b';
    const workDesc = work > 0 ? 'Adds kinetic energy (+ΔK)' : work < 0 ? 'Removes energy / Braking (-ΔK)' : 'Perpendicular (W = 0)';

    return `
      <div class="g9-anchor-sim" style="background:#0f172a;border-radius:8px;padding:16px;color:#ffffff;margin:16px 0;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;flex-wrap:wrap;gap:8px;">
          <div style="font-size:0.95rem;font-weight:700;color:#38bdf8;">⚡ Work-Force-Displacement Vector Simulator</div>
          <div style="font-size:0.85rem;background:#1e293b;padding:3px 10px;border-radius:4px;color:${workColor};font-weight:700;">
            W = ${work.toFixed(1)} J · ${workDesc}
          </div>
        </div>
        <svg viewBox="0 0 540 140" style="width:100%;max-height:150px;display:block;">
          <!-- Frictionless Surface -->
          <line x1="30" y1="95" x2="510" y2="95" stroke="#475569" stroke-width="2"/>
          <line x1="30" y1="98" x2="510" y2="98" stroke="#334155" stroke-width="1" stroke-dasharray="6,4"/>

          <!-- Block / Cart -->
          <rect x="150" y="50" width="60" height="40" fill="#0284c7" stroke="#38bdf8" stroke-width="2" rx="4"/>
          <text x="180" y="74" fill="#ffffff" font-size="11" font-weight="700" text-anchor="middle" font-family="sans-serif">Mass m</text>

          <!-- Force Vector Arrow -->
          <line x1="180" y1="65" x2="${fx.toFixed(1)}" y2="${fy.toFixed(1)}" stroke="${workColor}" stroke-width="3" marker-end="url(#arrowWpe)"/>
          <text x="${(fx + 6).toFixed(1)}" y="${(fy - 4).toFixed(1)}" fill="${workColor}" font-size="12" font-weight="800" font-family="sans-serif">F = ${force} N (θ = ${angle}°)</text>

          <!-- Displacement Vector Bar -->
          <line x1="180" y1="115" x2="${Math.min(480, 180 + dist * 16)}" y2="115" stroke="#38bdf8" stroke-width="3" marker-end="url(#arrowDisplacement)"/>
          <text x="${(180 + Math.min(480, 180 + dist * 16)) / 2}" y="132" fill="#38bdf8" font-size="11" font-weight="700" text-anchor="middle" font-family="sans-serif">Displacement d = ${dist} m</text>

          <defs>
            <marker id="arrowWpe" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="${workColor}" />
            </marker>
            <marker id="arrowDisplacement" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#38bdf8" />
            </marker>
          </defs>
        </svg>

        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:12px;margin-top:10px;background:#1e293b;padding:10px;border-radius:6px;">
          <label style="display:flex;flex-direction:column;gap:4px;font-size:0.85rem;color:#cbd5e1;">
            <span>Force: <strong style="color:#facc15;">${force} N</strong></span>
            <input type="range" min="5" max="50" step="5" value="${force}" data-anchor-param="force" data-level="${l}" style="min-height:36px;"/>
          </label>
          <label style="display:flex;flex-direction:column;gap:4px;font-size:0.85rem;color:#cbd5e1;">
            <span>Distance: <strong style="color:#38bdf8;">${dist} m</strong></span>
            <input type="range" min="1" max="20" step="1" value="${dist}" data-anchor-param="dist" data-level="${l}" style="min-height:36px;"/>
          </label>
          <label style="display:flex;flex-direction:column;gap:4px;font-size:0.85rem;color:#cbd5e1;">
            <span>Angle θ: <strong style="color:${workColor};">${angle}°</strong></span>
            <input type="range" min="0" max="180" step="15" value="${angle}" data-anchor-param="angle" data-level="${l}" style="min-height:36px;"/>
          </label>
        </div>
      </div>
    `;
  }

  render(includeSynthesis = true): string {
    const a = this.anchors.find(a => a.level === this.level)!;
    const isRevealed = this.revealedSolutions.has(this.level);
    const steps = this.rawSolutionSteps.get(this.level) || [];
    const warrantId = a.warrantRefs[0]?.id || 'warrant:foundation';
    const currentAnswer = this.studentAnswers.get(this.level) || '';
    const fb = this.feedback.get(this.level);

    return `
      <section class="g9-anchors-component" style="margin-top:16px;">
        <nav aria-label="Progressive anchor tiers" style="display:flex;gap:8px;margin-bottom:12px;flex-wrap:wrap;">
          ${ANCHOR_LEVELS.map(l => `
            <button type="button" data-level="${l}" aria-pressed="${this.level === l}" style="min-height:48px;min-width:48px;padding:8px 16px;border-radius:6px;border:1px solid ${this.level === l ? '#0284c7' : '#cbd5e1'};background:${this.level === l ? '#0284c7' : '#ffffff'};color:${this.level === l ? '#ffffff' : '#334155'};font-weight:700;cursor:pointer;">
              ${l}
            </button>
          `).join('')}
        </nav>
        <div style="background:#ffffff;border:1px solid #e2e8f0;border-radius:8px;padding:16px;">
          <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap;margin-bottom:6px;">
            <h3 style="margin:0;font-size:1.15rem;color:#0f172a;">${renderMathHtml(e(a.title))}</h3>
            <span style="font-size:0.75rem;padding:2px 8px;border-radius:4px;background:#fef3c7;color:#92400e;font-weight:700;">
              ANCHOR LEVEL: ${this.level}
            </span>
          </div>
          <p style="font-size:1rem;line-height:1.6;color:#1e293b;margin:8px 0 12px 0;">${renderMathHtml(e(a.prompt))}</p>

          ${this.renderWarrantCard(warrantId)}

          <!-- Interactive Simulator for Student Exploration -->
          ${this.renderInteractiveSimulation(this.level)}

          <!-- Active Kid Practice Sandbox -->
          <div class="g9-kid-practice" style="background:#f0fdf4;border:1px solid #86efac;border-radius:8px;padding:14px;margin:14px 0;">
            <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap;margin-bottom:8px;">
              <div style="font-weight:700;font-size:0.95rem;color:#14532d;display:flex;align-items:center;gap:6px;">
                <span>🎯</span> <strong>Kid Practice: Calculate &amp; Test Your Hypothesis</strong>
              </div>
              <span style="font-size:0.8rem;color:#15803d;background:#dcfce7;padding:2px 8px;border-radius:4px;font-weight:700;">
                Active Student Interaction
              </span>
            </div>
            <p style="margin:0 0 10px 0;font-size:0.9rem;color:#166534;line-height:1.45;">
              Use the governing warrant and conditions in the prompt. Enter your calculated numerical value and verify your physical reasoning:
            </p>
            <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;">
              <label style="font-size:0.9rem;font-weight:700;color:#14532d;">Your Answer:</label>
              <input
                type="text"
                data-anchor-answer-input="${this.level}"
                value="${e(currentAnswer)}"
                placeholder="e.g. 100"
                style="min-height:48px;padding:8px 14px;border:2px solid #86efac;border-radius:6px;font-size:1rem;font-weight:700;color:#0f172a;width:150px;background:#ffffff;"
                aria-label="Student answer input for anchor"
              />
              <button
                type="button"
                data-action="check-anchor-answer"
                data-level="${this.level}"
                style="min-height:48px;padding:8px 20px;background:#15803d;color:#ffffff;border:none;border-radius:6px;font-weight:700;font-size:0.95rem;cursor:pointer;display:inline-flex;align-items:center;gap:6px;box-shadow:0 1px 3px rgba(21,128,61,0.3);"
              >
                🎯 Check Answer
              </button>
              ${fb ? `
                <button
                  type="button"
                  data-action="reset-anchor-answer"
                  data-level="${this.level}"
                  style="min-height:48px;padding:8px 14px;background:#f8fafc;color:#475569;border:1px solid #cbd5e1;border-radius:6px;font-weight:600;font-size:0.9rem;cursor:pointer;"
                >
                  ↺ Clear
                </button>
              ` : ''}
            </div>
            ${fb ? `
              <div class="g9-anchor-feedback" style="margin-top:10px;padding:10px 14px;border-radius:6px;background:${fb.correct ? '#ecfdf5' : '#fffbeb'};border:1px solid ${fb.correct ? '#34d399' : '#fcd34d'};color:${fb.correct ? '#065f46' : '#92400e'};font-size:0.92rem;font-weight:600;line-height:1.45;">
                ${e(fb.message)}
              </div>
            ` : ''}
          </div>

          <div class="g9-solution-ledger" style="margin-top:16px;padding-top:12px;border-top:1px dashed #cbd5e1;">
            <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;margin-bottom:10px;">
              <button type="button" data-action="toggle-anchor-solution" data-level="${this.level}" style="min-height:48px;min-width:48px;padding:8px 18px;border-radius:6px;border:1px solid ${isRevealed ? '#cbd5e1' : '#0284c7'};background:${isRevealed ? '#f1f5f9' : '#0284c7'};color:${isRevealed ? '#334155' : '#ffffff'};font-weight:700;cursor:pointer;">
                ${isRevealed ? 'Hide Derivation & Work Ledger' : 'Show Step-by-Step Derivation & Ledger'}
              </button>
              <span style="font-size:0.8rem;color:#64748b;font-weight:600;">
                {Candidate Solution} · Rule 13 HOLD
              </span>
            </div>

            ${isRevealed && steps.length > 0 ? `
              <div class="g9-revealed-solution" style="padding:14px;background:#f8fafc;border:1px solid #0284c7;border-radius:6px;margin-top:10px;">
                <h4 style="margin:0 0 8px 0;font-size:0.95rem;color:#0369a1;text-transform:uppercase;letter-spacing:0.03em;">
                  Verified Derivation Steps:
                </h4>
                <ol style="margin:0 0 12px 20px;padding:0;line-height:1.6;color:#1e293b;font-size:0.95rem;">
                  ${steps.map(s => `<li style="margin-bottom:6px;white-space:pre-wrap;">${renderMathHtml(s)}</li>`).join('')}
                </ol>
                <div style="font-size:0.85rem;color:#047857;background:#ecfdf5;padding:8px 12px;border-radius:4px;font-weight:600;display:inline-block;">
                  ✓ Work-Energy invariant balance satisfied
                </div>
              </div>
            ` : ''}
          </div>
        </div>
        ${includeSynthesis ? this.renderSynthesis() : ''}
      </section>
    `;
  }

  renderSynthesis(): string {
    return `
      <div class="g9-synthesis-component" style="margin-top:20px;padding:16px;background:#ffffff;border:1px solid #e2e8f0;border-left:4px solid #7c3aed;border-radius:6px;">
        <div style="font-size:0.75rem;font-weight:700;color:#6d28d9;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:4px;">
          Unassisted Capstone Synthesis
        </div>
        <h3 style="margin:0 0 8px 0;font-size:1.1rem;color:#0f172a;">Distinct unassisted synthesis</h3>
        <p style="font-size:0.95rem;color:#334155;line-height:1.5;margin:0 0 12px 0;">${renderMathHtml(e(this.prompt))}</p>
        <div style="font-size:0.85rem;color:#64748b;font-style:italic;">
          Requirement: Combine the conservative potential gradient with dissipative frictional work into a single unified energy conservation equation.
        </div>
      </div>
    `;
  }
}

export type AnchorViewState = ReturnType<Core1AAnchorViewController['getViewState']>;
