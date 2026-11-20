/**
 * web/pages/motion-plane.ts
 * A69 Pilot 3 — Motion in a Plane Functional-Parity Interactive Suite.
 *
 * Implements:
 * - Tab 1 (tab-projectile): Ground-to-ground 2D projectile kinematics, complementary angle toggle,
 *   live telemetry (T, H, R, ux), canvas trajectory animation, and launch/reset lifecycle.
 * - Tab 2 (tab-banking): Centripetal road banking with lateral tire friction, normal/friction forces,
 *   optimum speed, maximum safe speed, and real-time skid regime classification.
 * - Tab 3 (tab-practice): Dual-role educational activities:
 *   - CORE1B Active Recall: The Independent Velocity Principle with commit-first verification.
 *   - CORE2 Practice: Progressive hint ladder for flat curve centripetal dynamics.
 * - Transparent formative badging: [Formative Self-Check · Diagnostic Practice (HOLD)].
 * - Standardized 12.7" tablet touch ergonomics (>= 48px hit targets, >= 56px primary CTAs).
 *
 * No academic approval inferred from software validation.
 */

import { escapeHtml } from '../runtime/rendering.ts';
import { HIT_TARGET_MIN_PX, HIT_TARGET_PRIMARY_PX } from '../styles/tokens.ts';

export type MotionTabId = 'tab-projectile' | 'tab-banking' | 'tab-practice';

export interface ProjectileState {
  u: number;      // 5..50 m/s
  theta: number;  // 5..85 deg
  g: number;      // 5..15 m/s^2
  isAnimating: boolean;
  animT: number;
}

export interface BankingState {
  speed: number;     // 0..40 m/s
  bankAngle: number; // 0..45 deg
  radius: number;    // 20..150 m
  mu: number;        // 0.0..0.8
}

export interface ProjectileTelemetry {
  T: number;
  H: number;
  R: number;
  ux: number;
}

export interface BankingTelemetry {
  vOpt: number;
  normalForce: number;      // in kN
  frictionForce: number;    // in kN
  isFrictionUpward: boolean;
  vMax: number;             // Infinity if no limit
  regime: 'IDEAL' | 'LOW_SPEED' | 'HIGH_SPEED' | 'SKIDDING';
  regimeLabel: string;
  regimeExplanation: string;
}

export class MotionPlaneController {
  private activeTab: MotionTabId = 'tab-projectile';
  private projectile: ProjectileState = {
    u: 20,
    theta: 45,
    g: 9.8,
    isAnimating: false,
    animT: 0,
  };
  private banking: BankingState = {
    speed: 15,
    bankAngle: 20,
    radius: 60,
    mu: 0.3,
  };
  private reconAnswerVisible: boolean = false;
  private animTimer: ReturnType<typeof setInterval> | null = null;
  private listeners: Array<() => void> = [];

  constructor() {}

  // ---------------------------------------------------------------------------
  // Tab Navigation
  // ---------------------------------------------------------------------------

  getActiveTab(): MotionTabId {
    return this.activeTab;
  }

  setActiveTab(tab: MotionTabId): void {
    this.activeTab = tab;
    this.notify();
  }

  // ---------------------------------------------------------------------------
  // Projectile Kinematics (Tab 1)
  // ---------------------------------------------------------------------------

  getProjectileState(): Readonly<ProjectileState> {
    return this.projectile;
  }

  setProjectileU(u: number): void {
    this.projectile.u = Math.max(5, Math.min(50, u));
    this.notify();
  }

  setProjectileTheta(theta: number): void {
    this.projectile.theta = Math.max(5, Math.min(85, theta));
    this.notify();
  }

  setProjectileG(g: number): void {
    this.projectile.g = Math.max(5, Math.min(15, g));
    this.notify();
  }

  toggleComplementaryAngle(): void {
    this.projectile.theta = 90 - this.projectile.theta;
    this.notify();
  }

  getProjectileTelemetry(): ProjectileTelemetry {
    const { u, theta, g } = this.projectile;
    const rad = (theta * Math.PI) / 180;
    const T = (2 * u * Math.sin(rad)) / g;
    const H = (u * u * Math.sin(rad) * Math.sin(rad)) / (2 * g);
    const R = (u * u * Math.sin(2 * rad)) / g;
    const ux = u * Math.cos(rad);
    return { T, H, R, ux };
  }

  launchProjectile(): void {
    this.resetProjectile();
    this.projectile.isAnimating = true;
    const { T } = this.getProjectileTelemetry();
    const dt = 0.03;
    this.animTimer = setInterval(() => {
      this.projectile.animT += dt;
      if (this.projectile.animT >= T) {
        this.projectile.animT = T;
        this.projectile.isAnimating = false;
        if (this.animTimer) clearInterval(this.animTimer);
        this.animTimer = null;
      }
      this.notify();
    }, 30);
    this.notify();
  }

  resetProjectile(): void {
    if (this.animTimer) {
      clearInterval(this.animTimer);
      this.animTimer = null;
    }
    this.projectile.isAnimating = false;
    this.projectile.animT = 0;
    this.notify();
  }

  // ---------------------------------------------------------------------------
  // Road Banking with Friction (Tab 2)
  // ---------------------------------------------------------------------------

  getBankingState(): Readonly<BankingState> {
    return this.banking;
  }

  setBankingSpeed(speed: number): void {
    this.banking.speed = Math.max(0, Math.min(40, speed));
    this.notify();
  }

  setBankingAngle(angle: number): void {
    this.banking.bankAngle = Math.max(0, Math.min(45, angle));
    this.notify();
  }

  setBankingRadius(radius: number): void {
    this.banking.radius = Math.max(20, Math.min(150, radius));
    this.notify();
  }

  setBankingMu(mu: number): void {
    this.banking.mu = Math.max(0.0, Math.min(0.8, mu));
    this.notify();
  }

  getBankingTelemetry(): BankingTelemetry {
    const { speed, bankAngle, radius, mu } = this.banking;
    const thetaRad = (bankAngle * Math.PI) / 180;
    const gLocal = 9.8;
    const carMass = 1000; // standard vehicle mass

    const vOpt = Math.sqrt(radius * gLocal * Math.tan(thetaRad));
    const denomMax = 1 - mu * Math.tan(thetaRad);
    const vMax = denomMax > 0 ? Math.sqrt((radius * gLocal * (Math.tan(thetaRad) + mu)) / denomMax) : Infinity;

    const frictionSigned = carMass * (gLocal * Math.sin(thetaRad) - ((speed * speed) / radius) * Math.cos(thetaRad));
    const normalForce = carMass * (gLocal * Math.cos(thetaRad) + ((speed * speed) / radius) * Math.sin(thetaRad));

    let regime: BankingTelemetry['regime'] = 'IDEAL';
    let regimeLabel = 'Ideal Speed (f = 0)';
    let regimeExplanation = 'Normal force alone provides full centripetal acceleration. Zero lateral tire friction!';

    if (Math.abs(speed - vOpt) < 0.5) {
      regime = 'IDEAL';
      regimeLabel = 'Ideal Speed (f = 0)';
      regimeExplanation = 'Normal force alone provides full centripetal acceleration. Zero lateral tire friction!';
    } else if (speed < vOpt) {
      regime = 'LOW_SPEED';
      regimeLabel = 'Low Speed: f Upwards';
      regimeExplanation = 'Vehicle tends to slip downhill; static friction points up the incline to maintain elevation.';
    } else if (speed <= vMax) {
      regime = 'HIGH_SPEED';
      regimeLabel = 'High Speed: f Downwards';
      regimeExplanation = 'Vehicle tends to skid outwards; static friction pulls down into the curve to assist turning.';
    } else {
      regime = 'SKIDDING';
      regimeLabel = 'SKIDDING OUTWARD!';
      regimeExplanation = 'Velocity exceeds maximum allowable friction threshold. Lateral skid inevitable!';
    }

    return {
      vOpt,
      normalForce: normalForce / 1000,
      frictionForce: Math.abs(frictionSigned) / 1000,
      isFrictionUpward: frictionSigned > 0,
      vMax,
      regime,
      regimeLabel,
      regimeExplanation,
    };
  }

  // ---------------------------------------------------------------------------
  // Active Reconstruction & Practice (Tab 3)
  // ---------------------------------------------------------------------------

  isReconAnswerVisible(): boolean {
    return this.reconAnswerVisible;
  }

  revealReconAnswer(): void {
    this.reconAnswerVisible = true;
    this.notify();
  }

  // ---------------------------------------------------------------------------
  // Subscription Lifecycle
  // ---------------------------------------------------------------------------

  subscribe(listener: () => void): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  private notify(): void {
    for (const listener of this.listeners) {
      listener();
    }
  }

  dispose(): void {
    if (this.animTimer) {
      clearInterval(this.animTimer);
      this.animTimer = null;
    }
    this.listeners = [];
  }
}

// ---------------------------------------------------------------------------
// HTML Mount Function
// ---------------------------------------------------------------------------

export function mountMotionPlane(
  root: HTMLElement,
  controller: MotionPlaneController,
  onNavigate?: (route: string) => void
): { dispose: () => void; refresh: () => void } {
  let active = true;

  const render = () => {
    if (!active) return;
    const activeTab = controller.getActiveTab();
    const proj = controller.getProjectileState();
    const projTelem = controller.getProjectileTelemetry();
    const bank = controller.getBankingState();
    const bankTelem = controller.getBankingTelemetry();
    const reconOpen = controller.isReconAnswerVisible();

    root.innerHTML = `
      <div class="motion-plane-container g9-motion-suite" style="display:flex;flex-direction:column;gap:1.5rem;max-width:1400px;margin:0 auto;padding:1.5rem;box-sizing:border-box;">
        
        <!-- Header & Breadcrumbs -->
        <header style="padding-bottom:1.25rem;border-bottom:2px solid #e2e8f0;">
          <div style="display:flex;gap:8px;font-size:0.9rem;color:#64748b;margin-bottom:0.5rem;">
            <a href="#/home" style="color:#0284c7;text-decoration:none;font-weight:600;">Home</a> &gt; 
            <a href="#/subject/physics" style="color:#0284c7;text-decoration:none;font-weight:600;">Physics</a> &gt; 
            <span>Motion in a Plane Interactive Suite</span>
          </div>
          <div style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:flex-start;gap:1rem;">
            <div>
              <div style="display:flex;gap:8px;align-items:center;margin-bottom:0.5rem;">
                <span style="font-size:0.8rem;font-weight:800;background:#e0f2fe;color:#0369a1;padding:3px 8px;border-radius:4px;">A69 PILOT 3 · NATIVE FUNCTIONAL PARITY</span>
                <span style="font-size:0.8rem;font-weight:700;background:#fee2e2;color:#991b1b;padding:3px 8px;border-radius:4px;">Academic Status: HOLD (Diagnostic Mode Authorized)</span>
              </div>
              <h1 style="margin:0 0 0.5rem;font-size:2.2rem;font-weight:800;color:#0f172a;">🚀 Motion in a Plane Interactive Suite</h1>
              <p style="margin:0;color:#475569;font-size:1.15rem;max-width:900px;line-height:1.5;">
                2D kinematics, projectile flight equations, complementary angle trajectory invariance, and banked curves with lateral tire friction.
              </p>
            </div>
            
            <div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:8px;padding:8px 16px;text-align:right;">
              <span style="font-size:0.85rem;font-weight:800;color:#1e40af;">[Formative Self-Check · Diagnostic Practice (HOLD)]</span>
              <div style="font-size:0.8rem;color:#64748b;">Not a Summative Examination</div>
            </div>
          </div>
        </header>

        <!-- Tab Bar -->
        <div style="display:flex;flex-wrap:wrap;gap:8px;border-bottom:2px solid #e2e8f0;padding-bottom:12px;" role="tablist">
          <button type="button" class="tab-btn" data-tab="tab-projectile" style="min-height:${HIT_TARGET_MIN_PX}px;padding:10px 20px;background:${activeTab === 'tab-projectile' ? '#0284c7' : '#f1f5f9'};color:${activeTab === 'tab-projectile' ? '#ffffff' : '#0f172a'};border:none;border-radius:6px;font-weight:700;font-size:1rem;cursor:pointer;">
            1. 🎯 Ground-to-Ground Projectile
          </button>
          <button type="button" class="tab-btn" data-tab="tab-banking" style="min-height:${HIT_TARGET_MIN_PX}px;padding:10px 20px;background:${activeTab === 'tab-banking' ? '#0284c7' : '#f1f5f9'};color:${activeTab === 'tab-banking' ? '#ffffff' : '#0f172a'};border:none;border-radius:6px;font-weight:700;font-size:1rem;cursor:pointer;">
            2. 🏎️ Banked Curve with Friction
          </button>
          <button type="button" class="tab-btn" data-tab="tab-practice" style="min-height:${HIT_TARGET_MIN_PX}px;padding:10px 20px;background:${activeTab === 'tab-practice' ? '#0284c7' : '#f1f5f9'};color:${activeTab === 'tab-practice' ? '#ffffff' : '#0f172a'};border:none;border-radius:6px;font-weight:700;font-size:1rem;cursor:pointer;">
            3. 💡 Active Reconstruction &amp; Practice
          </button>
        </div>

        <!-- Tab 1: Projectile -->
        <div id="tab-projectile" class="tab-pane" style="display:${activeTab === 'tab-projectile' ? 'flex' : 'none'};flex-direction:column;gap:1.5rem;">
          <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(min(100%, 300px), 1fr));gap:1rem;background:#f8fafc;padding:1.25rem;border-radius:10px;border:1px solid #e2e8f0;">
            <div>
              <div style="display:flex;justify-content:space-between;margin-bottom:4px;font-weight:700;">
                <label for="sliderU">Launch Velocity (u):</label>
                <span id="valU" style="color:#0284c7;">${proj.u} m/s</span>
              </div>
              <input type="range" id="sliderU" min="5" max="50" value="${proj.u}" step="1" aria-label="Launch Velocity" style="width:100%;height:48px;min-height:${HIT_TARGET_MIN_PX}px;cursor:pointer;" />
            </div>

            <div>
              <div style="display:flex;justify-content:space-between;margin-bottom:4px;font-weight:700;">
                <label for="sliderTheta">Launch Angle (θ):</label>
                <span id="valTheta" style="color:#0284c7;">${proj.theta}°</span>
              </div>
              <input type="range" id="sliderTheta" min="5" max="85" value="${proj.theta}" step="1" aria-label="Launch Angle" style="width:100%;height:48px;min-height:${HIT_TARGET_MIN_PX}px;cursor:pointer;" />
            </div>

            <div>
              <div style="display:flex;justify-content:space-between;margin-bottom:4px;font-weight:700;">
                <label for="sliderG">Gravity (g):</label>
                <span id="valG" style="color:#0284c7;">${proj.g.toFixed(1)} m/s²</span>
              </div>
              <input type="range" id="sliderG" min="5" max="15" value="${proj.g}" step="0.2" aria-label="Gravity" style="width:100%;height:48px;min-height:${HIT_TARGET_MIN_PX}px;cursor:pointer;" />
            </div>
          </div>

          <!-- Actions & Complementary Angle Toggle -->
          <div style="display:flex;flex-wrap:wrap;gap:12px;align-items:center;">
            <button type="button" id="projLaunchBtn" style="min-height:${HIT_TARGET_PRIMARY_PX}px;padding:12px 24px;background:#0284c7;color:white;border:none;border-radius:8px;font-weight:700;font-size:1.05rem;cursor:pointer;">
              🚀 Launch Projectile
            </button>
            <button type="button" id="projResetBtn" style="min-height:${HIT_TARGET_PRIMARY_PX}px;padding:12px 20px;background:#f1f5f9;color:#0f172a;border:1px solid #cbd5e1;border-radius:8px;font-weight:700;cursor:pointer;">
              🔄 Reset
            </button>
            <button type="button" id="projCompBtn" style="min-height:${HIT_TARGET_PRIMARY_PX}px;padding:12px 20px;background:#f0fdf4;color:#166534;border:1px solid #bbf7d0;border-radius:8px;font-weight:700;cursor:pointer;">
              📐 Complementary Angle (θ ↔ 90° - θ)
            </button>
          </div>

          <!-- Live Analytical Telemetry Grid -->
          <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(min(100%, 220px), 1fr));gap:1rem;">
            <div style="background:#ffffff;border:1px solid #cbd5e1;border-radius:8px;padding:1rem;">
              <div style="font-size:0.8rem;font-weight:700;color:#64748b;">Flight Time (T)</div>
              <div style="font-size:1.6rem;font-weight:800;color:#0f172a;"><span id="telemT">${projTelem.T.toFixed(2)}</span> s</div>
              <div style="font-size:0.75rem;color:#64748b;">T = 2u sin(θ)/g</div>
            </div>

            <div style="background:#ffffff;border:1px solid #cbd5e1;border-radius:8px;padding:1rem;">
              <div style="font-size:0.8rem;font-weight:700;color:#64748b;">Max Apex Height (H)</div>
              <div style="font-size:1.6rem;font-weight:800;color:#0f172a;"><span id="telemH">${projTelem.H.toFixed(2)}</span> m</div>
              <div style="font-size:0.75rem;color:#64748b;">H = u² sin²(θ)/(2g)</div>
            </div>

            <div style="background:#ffffff;border:1px solid #cbd5e1;border-radius:8px;padding:1rem;">
              <div style="font-size:0.8rem;font-weight:700;color:#64748b;">Horizontal Range (R)</div>
              <div style="font-size:1.6rem;font-weight:800;color:#0f172a;"><span id="telemR">${projTelem.R.toFixed(2)}</span> m</div>
              <div style="font-size:0.75rem;color:#64748b;">R = u² sin(2θ)/g</div>
            </div>

            <div style="background:#ffffff;border:1px solid #cbd5e1;border-radius:8px;padding:1rem;">
              <div style="font-size:0.8rem;font-weight:700;color:#64748b;">Horizontal Velocity (ux)</div>
              <div style="font-size:1.6rem;font-weight:800;color:#0f172a;"><span id="telemUx">${projTelem.ux.toFixed(2)}</span> m/s</div>
              <div style="font-size:0.75rem;color:#64748b;">ux = u cos(θ)</div>
            </div>
          </div>

          <!-- Canvas Visualizer -->
          <div style="background:#0f172a;border-radius:12px;padding:1rem;position:relative;">
            <canvas id="projCanvas" width="1000" height="400" style="width:100%;height:auto;display:block;border-radius:8px;background:#090d16;"></canvas>
            <div style="position:absolute;bottom:20px;left:25px;color:#94a3b8;font-size:0.85rem;">
              Ground Level (y = 0) · Invariant Range under Complementary Launch Angles
            </div>
          </div>
        </div>

        <!-- Tab 2: Banking -->
        <div id="tab-banking" class="tab-pane" style="display:${activeTab === 'tab-banking' ? 'flex' : 'none'};flex-direction:column;gap:1.5rem;">
          <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(min(100%, 250px), 1fr));gap:1rem;background:#f8fafc;padding:1.25rem;border-radius:10px;border:1px solid #e2e8f0;">
            <div>
              <div style="display:flex;justify-content:space-between;margin-bottom:4px;font-weight:700;">
                <label for="sliderSpeed">Vehicle Speed (v):</label>
                <span id="valSpeed" style="color:#0284c7;">${bank.speed} m/s</span>
              </div>
              <input type="range" id="sliderSpeed" min="0" max="40" value="${bank.speed}" step="1" aria-label="Vehicle Speed" style="width:100%;height:48px;min-height:${HIT_TARGET_MIN_PX}px;cursor:pointer;" />
            </div>

            <div>
              <div style="display:flex;justify-content:space-between;margin-bottom:4px;font-weight:700;">
                <label for="sliderBankAngle">Banking Angle (θ):</label>
                <span id="valBankAngle" style="color:#0284c7;">${bank.bankAngle}°</span>
              </div>
              <input type="range" id="sliderBankAngle" min="0" max="45" value="${bank.bankAngle}" step="1" aria-label="Banking Angle" style="width:100%;height:48px;min-height:${HIT_TARGET_MIN_PX}px;cursor:pointer;" />
            </div>

            <div>
              <div style="display:flex;justify-content:space-between;margin-bottom:4px;font-weight:700;">
                <label for="sliderRadius">Curve Radius (R):</label>
                <span id="valRadius" style="color:#0284c7;">${bank.radius} m</span>
              </div>
              <input type="range" id="sliderRadius" min="20" max="150" value="${bank.radius}" step="5" aria-label="Curve Radius" style="width:100%;height:48px;min-height:${HIT_TARGET_MIN_PX}px;cursor:pointer;" />
            </div>

            <div>
              <div style="display:flex;justify-content:space-between;margin-bottom:4px;font-weight:700;">
                <label for="sliderMu">Friction Coeff (μ):</label>
                <span id="valMu" style="color:#0284c7;">${bank.mu.toFixed(2)}</span>
              </div>
              <input type="range" id="sliderMu" min="0.0" max="0.8" value="${bank.mu}" step="0.05" aria-label="Friction Coefficient" style="width:100%;height:48px;min-height:${HIT_TARGET_MIN_PX}px;cursor:pointer;" />
            </div>
          </div>

          <!-- Dynamic Skid Regime Alert Banner -->
          <div style="background:#ffffff;border:2px solid ${bankTelem.regime === 'IDEAL' ? '#22c55e' : bankTelem.regime === 'SKIDDING' ? '#ef4444' : '#eab308'};border-radius:8px;padding:1rem 1.25rem;">
            <div style="display:flex;align-items:center;gap:10px;margin-bottom:4px;">
              <span style="font-size:1.4rem;">${bankTelem.regime === 'IDEAL' ? '✅' : bankTelem.regime === 'SKIDDING' ? '⚠️' : 'ℹ️'}</span>
              <strong id="bankRegimeBadge" class="regime-badge" style="font-size:1.15rem;color:${bankTelem.regime === 'IDEAL' ? '#16a34a' : bankTelem.regime === 'SKIDDING' ? '#dc2626' : '#ca8a04'};">
                ${escapeHtml(bankTelem.regimeLabel)}
              </strong>
            </div>
            <p id="regimeExplanation" style="margin:0;color:#475569;font-size:0.95rem;">
              ${escapeHtml(bankTelem.regimeExplanation)}
            </p>
          </div>

          <!-- Banking Telemetry Grid -->
          <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(min(100%, 220px), 1fr));gap:1rem;">
            <div style="background:#ffffff;border:1px solid #cbd5e1;border-radius:8px;padding:1rem;">
              <div style="font-size:0.8rem;font-weight:700;color:#64748b;">Optimum Speed (v_opt)</div>
              <div style="font-size:1.6rem;font-weight:800;color:#0284c7;"><span id="telemOptSpeed">${bankTelem.vOpt.toFixed(1)}</span> m/s</div>
              <div style="font-size:0.75rem;color:#64748b;">v_opt = sqrt(R g tan(θ))</div>
            </div>

            <div style="background:#ffffff;border:1px solid #cbd5e1;border-radius:8px;padding:1rem;">
              <div style="font-size:0.8rem;font-weight:700;color:#64748b;">Normal Force (N)</div>
              <div style="font-size:1.6rem;font-weight:800;color:#0f172a;"><span id="telemNormal">${bankTelem.normalForce.toFixed(1)}</span> kN</div>
              <div style="font-size:0.75rem;color:#64748b;">m(g cosθ + v²/R sinθ)</div>
            </div>

            <div style="background:#ffffff;border:1px solid #cbd5e1;border-radius:8px;padding:1rem;">
              <div style="font-size:0.8rem;font-weight:700;color:#64748b;">Lateral Tire Friction (f)</div>
              <div style="font-size:1.6rem;font-weight:800;color:#0f172a;">
                <span id="telemFriction">${bankTelem.frictionForce.toFixed(2)} kN ${bankTelem.isFrictionUpward ? '(Up)' : '(Down)'}</span>
              </div>
              <div style="font-size:0.75rem;color:#64748b;">f = m(g sinθ - v²/R cosθ)</div>
            </div>

            <div style="background:#ffffff;border:1px solid #cbd5e1;border-radius:8px;padding:1rem;">
              <div style="font-size:0.8rem;font-weight:700;color:#64748b;">Max Safe Speed (v_max)</div>
              <div style="font-size:1.6rem;font-weight:800;color:#0f172a;">
                <span id="telemMaxSpeed">${bankTelem.vMax === Infinity ? 'No limit' : bankTelem.vMax.toFixed(1) + ' m/s'}</span>
              </div>
              <div style="font-size:0.75rem;color:#64748b;">sqrt(R g (tanθ + μ)/(1 - μ tanθ))</div>
            </div>
          </div>
        </div>

        <!-- Tab 3: Practice -->
        <div id="tab-practice" class="tab-pane" style="display:${activeTab === 'tab-practice' ? 'flex' : 'none'};flex-direction:column;gap:1.5rem;">
          
          <!-- CORE1B Reconstruction Active Recall -->
          <section class="core-block" data-core="CORE1B" style="background:#ffffff;border:1px solid #cbd5e1;border-radius:10px;padding:1.5rem;">
            <div style="display:flex;gap:8px;margin-bottom:0.5rem;">
              <span class="core-tag" style="font-size:0.75rem;font-weight:800;background:#e0f2fe;color:#0369a1;padding:2px 8px;border-radius:4px;">CORE1B · RECONSTRUCTION</span>
            </div>
            <h2 style="margin:0 0 0.5rem;font-size:1.4rem;color:#0f172a;">Active Recall Task: The Independent Velocity Principle</h2>
            <p style="margin:0 0 1rem;color:#475569;font-size:1.05rem;">
              Explain why a bullet fired horizontally from a rifle and a bullet dropped vertically from the exact same height hit level ground at the identical instant (assuming negligible air drag).
            </p>

            <div class="attempt-box" style="display:flex;flex-direction:column;gap:10px;margin-bottom:1rem;">
              <label for="reconInput" style="font-size:0.9rem;font-weight:600;color:#64748b;">
                Write your physical reasoning before revealing the model verification:
              </label>
              <textarea id="reconInput" class="attempt-input" placeholder="Type your answer here..." style="width:100%;min-height:90px;padding:10px;border:1px solid #cbd5e1;border-radius:6px;font-size:1rem;font-family:inherit;box-sizing:border-box;"></textarea>
              <button type="button" id="reconRevealBtn" class="recon-reveal-btn" style="align-self:flex-start;min-height:${HIT_TARGET_MIN_PX}px;padding:10px 20px;background:#0284c7;color:white;border:none;border-radius:6px;font-weight:700;cursor:pointer;">
                Check Understanding &amp; Reveal Model Answer
              </button>
            </div>

            <div id="reconAnswer" style="display:${reconOpen ? 'block' : 'none'};background:#f0fdf4;border:1px solid #bbf7d0;border-radius:8px;padding:1rem;margin-top:1rem;">
              <div style="font-family:monospace;font-size:1.1rem;font-weight:700;color:#166534;margin-bottom:0.5rem;">
                y(t) = h - 0.5 * g * t²  ==>  t_ground = sqrt(2h / g)
              </div>
              <p style="margin:0;color:#166534;font-size:0.95rem;line-height:1.5;">
                <strong>Model Answer:</strong> Vertical motion is dictated exclusively by downward gravitational acceleration g. Because both bullets begin with zero initial vertical velocity (uy = 0), their vertical positions at every instant follow y(t) = h - 0.5*g*t². The horizontal velocity ux changes only horizontal displacement (x = ux * t) and has no bearing on vertical fall time.
              </p>
            </div>
          </section>

          <!-- CORE2 Practice Problem with Progressive Hint Ladder -->
          <section class="core-block" data-core="CORE2" style="background:#ffffff;border:1px solid #cbd5e1;border-radius:10px;padding:1.5rem;">
            <div style="display:flex;gap:8px;margin-bottom:0.5rem;">
              <span class="core-tag" style="font-size:0.75rem;font-weight:800;background:#fef3c7;color:#92400e;padding:2px 8px;border-radius:4px;">CORE2 · PRACTICE</span>
            </div>
            <h2 style="margin:0 0 0.5rem;font-size:1.4rem;color:#0f172a;">Practice Problem with Progressive Hint Ladder</h2>
            <p style="margin:0 0 1rem;color:#475569;font-size:1.05rem;">
              <strong>Question:</strong> A stunt motorcycle enters a flat curve of radius R = 50 m. If the coefficient of static friction is μs = 0.50, what is the maximum velocity the motorcycle can round the turn without skidding? (Take g = 9.8 m/s²).
            </p>

            <details class="reveal-block" style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:6px;padding:10px 14px;margin-bottom:8px;">
              <summary style="font-weight:700;color:#0284c7;cursor:pointer;">💡 Hint 1: Governing Force Balance</summary>
              <p style="margin:8px 0 0;color:#475569;font-size:0.95rem;">
                On an unbanked flat road (θ = 0), the only horizontal force providing centripetal acceleration is static friction: fs = m * v² / r.
              </p>
            </details>

            <details class="reveal-block" style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:6px;padding:10px 14px;margin-bottom:8px;">
              <summary style="font-weight:700;color:#0284c7;cursor:pointer;">💡 Hint 2: Maximum Static Friction Limit</summary>
              <p style="margin:8px 0 0;color:#475569;font-size:0.95rem;">
                The maximum static friction before slipping is f_max = μs * N = μs * m * g. Equate this to required centripetal force: m * v_max² / r = μs * m * g.
              </p>
            </details>

            <details class="reveal-block" style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:6px;padding:10px 14px;">
              <summary style="font-weight:700;color:#166534;cursor:pointer;">🎯 Reveal Final Worked Solution</summary>
              <div style="margin-top:8px;color:#166534;font-size:0.95rem;line-height:1.5;">
                <p style="margin:0 0 4px;">Cancelling mass m gives: v_max = sqrt(μs * r * g).</p>
                <p style="margin:0;">Substitute values: v_max = sqrt(0.50 * 50 * 9.8) = sqrt(245) ≈ <strong>15.65 m/s</strong>.</p>
              </div>
            </details>
          </section>

        </div>

      </div>
    `;

    bindEvents();
    drawTrajectoryCanvas();
  };

  const bindEvents = () => {
    // Tab switching
    root.querySelectorAll<HTMLButtonElement>('.tab-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const tab = btn.dataset.tab as MotionTabId;
        if (tab) controller.setActiveTab(tab);
      });
    });

    // Projectile sliders
    const sliderU = root.querySelector<HTMLInputElement>('#sliderU');
    sliderU?.addEventListener('input', () => controller.setProjectileU(Number(sliderU.value)));

    const sliderTheta = root.querySelector<HTMLInputElement>('#sliderTheta');
    sliderTheta?.addEventListener('input', () => controller.setProjectileTheta(Number(sliderTheta.value)));

    const sliderG = root.querySelector<HTMLInputElement>('#sliderG');
    sliderG?.addEventListener('input', () => controller.setProjectileG(Number(sliderG.value)));

    // Projectile buttons
    root.querySelector<HTMLButtonElement>('#projCompBtn')?.addEventListener('click', () => {
      controller.toggleComplementaryAngle();
    });

    root.querySelector<HTMLButtonElement>('#projLaunchBtn')?.addEventListener('click', () => {
      controller.launchProjectile();
    });

    root.querySelector<HTMLButtonElement>('#projResetBtn')?.addEventListener('click', () => {
      controller.resetProjectile();
    });

    // Banking sliders
    const sliderSpeed = root.querySelector<HTMLInputElement>('#sliderSpeed');
    sliderSpeed?.addEventListener('input', () => controller.setBankingSpeed(Number(sliderSpeed.value)));

    const sliderBankAngle = root.querySelector<HTMLInputElement>('#sliderBankAngle');
    sliderBankAngle?.addEventListener('input', () => controller.setBankingAngle(Number(sliderBankAngle.value)));

    const sliderRadius = root.querySelector<HTMLInputElement>('#sliderRadius');
    sliderRadius?.addEventListener('input', () => controller.setBankingRadius(Number(sliderRadius.value)));

    const sliderMu = root.querySelector<HTMLInputElement>('#sliderMu');
    sliderMu?.addEventListener('input', () => controller.setBankingMu(Number(sliderMu.value)));

    // Practice button
    const reveal = () => controller.revealReconAnswer();
    root.querySelector<HTMLButtonElement>('#reconRevealBtn')?.addEventListener('click', reveal);
    root.querySelector<HTMLButtonElement>('#reconCheckBtn')?.addEventListener('click', reveal);
  };

  const drawTrajectoryCanvas = () => {
    const canvas = root.querySelector<HTMLCanvasElement>('#projCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    // Ground line
    const groundY = h - 40;
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, groundY);
    ctx.lineTo(w, groundY);
    ctx.stroke();

    const proj = controller.getProjectileState();
    const telem = controller.getProjectileTelemetry();

    // Scale mapping: map max range to ~80% canvas width, max height to ~70% canvas height
    const scaleX = (w * 0.8) / Math.max(10, telem.R);
    const scaleY = (h * 0.7) / Math.max(5, telem.H);
    const originX = 50;

    // Draw full theoretical trajectory curve
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 3;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    const steps = 100;
    const rad = (proj.theta * Math.PI) / 180;
    for (let i = 0; i <= steps; i++) {
      const t = (telem.T * i) / steps;
      const x = proj.u * Math.cos(rad) * t;
      const y = proj.u * Math.sin(rad) * t - 0.5 * proj.g * t * t;
      const cx = originX + x * scaleX;
      const cy = groundY - y * scaleY;
      if (i === 0) ctx.moveTo(cx, cy);
      else ctx.lineTo(cx, cy);
    }
    ctx.stroke();
    ctx.setLineDash([]);

    // Draw animated projectile ball
    const animT = proj.animT;
    const curX = proj.u * Math.cos(rad) * animT;
    const curY = proj.u * Math.sin(rad) * animT - 0.5 * proj.g * animT * animT;
    const ballX = originX + curX * scaleX;
    const ballY = groundY - Math.max(0, curY) * scaleY;

    ctx.fillStyle = '#f59e0b';
    ctx.beginPath();
    ctx.arc(ballX, ballY, 8, 0, 2 * Math.PI);
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.stroke();
  };

  const unsubscribe = controller.subscribe(() => {
    render();
  });

  render();

  return {
    dispose: () => {
      active = false;
      unsubscribe();
      controller.dispose();
      root.replaceChildren();
    },
    refresh: () => {
      render();
    },
  };
}
