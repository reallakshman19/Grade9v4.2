/**
 * web/pages/workbenches/linear-coordinates.ts
 * Workpack A69 / v3.5 Parity — Polynomials & Coordinate Geometry Research Suite
 *
 * Adopts full functional parity from:
 * standalone/mathematics-polynomials-and-coordinates-suite.html
 *
 * Implements:
 * 1. Tab 1: 2D Cartesian Coordinate Plane, Point Projections, Telemetry HUD & Linear Systems Solver
 * 2. Tab 2: Polynomial Remainder Theorem (P(k)), Synthetic Division, & Cubic Algebraic Identities
 * 3. Tab 3: Learner Quality Contract Blueprints (CORE1, CORE1B, CORE2)
 *
 * Pure Native DOM (No iframes).
 * 12.7" Tablet Touch Ergonomics: >= 48px hit targets, zero horizontal overflow.
 * Academic Status: HOLD (Formative Simulation Mode)
 */

import { escapeHtml, renderMathHtml } from '../../runtime/rendering.ts';
import { HIT_TARGET_MIN_PX, HIT_TARGET_PRIMARY_PX } from '../../styles/tokens.ts';

export interface LinearLine {
  a: number;
  b: number;
  c: number;
}

export interface CoordPoint {
  x: number;
  y: number;
}

export interface PolyCubic {
  a: number;
  b: number;
  c: number;
  d: number;
  k: number;
}

export class LinearCoordinatesController {
  private activeTab: 'coords' | 'poly' | 'blueprints' = 'coords';

  // Tab 1: Cartesian point
  private point: CoordPoint = { x: 4, y: 3 };

  // Tab 1: Linear lines
  private line1: LinearLine = { a: 2, b: 1, c: 5 }; // 2x + y = 5
  private line2: LinearLine = { a: 1, b: -1, c: 1 }; // x - y = 1 (Intersection at (2, 1))

  // Tab 2: Polynomial Remainder Theorem P(x) = ax^3 + bx^2 + cx + d, divisor (x - k)
  private poly: PolyCubic = { a: 1, b: -3, c: 4, d: -12, k: 3 };

  // Tab 2: Cubic Identity variables a, b, c
  private idA = 2;
  private idB = 3;
  private idC = -5;

  getActiveTab(): 'coords' | 'poly' | 'blueprints' { return this.activeTab; }
  setActiveTab(tab: 'coords' | 'poly' | 'blueprints'): void { this.activeTab = tab; }

  // Point methods
  getPoint(): CoordPoint { return { ...this.point }; }
  setPoint(x: number, y: number): void {
    this.point = { x: Math.round(x * 10) / 10, y: Math.round(y * 10) / 10 };
  }

  getQuadrantInfo(): {
    quadrant: string;
    distX: number;
    distY: number;
    radius: number;
    thetaDeg: number;
  } {
    const { x, y } = this.point;
    let quadrant = 'Origin (0, 0)';
    if (x > 0 && y > 0) quadrant = 'Quadrant I (+, +)';
    else if (x < 0 && y > 0) quadrant = 'Quadrant II (−, +)';
    else if (x < 0 && y < 0) quadrant = 'Quadrant III (−, −)';
    else if (x > 0 && y < 0) quadrant = 'Quadrant IV (+, −)';
    else if (x === 0 && y !== 0) quadrant = 'On Y-Axis (Abscissa = 0)';
    else if (x !== 0 && y === 0) quadrant = 'On X-Axis (Ordinate = 0)';

    const distX = Math.abs(y);
    const distY = Math.abs(x);
    const radius = Math.sqrt(x * x + y * y);
    const thetaRad = Math.atan2(y, x);
    let thetaDeg = (thetaRad * 180) / Math.PI;
    if (thetaDeg < 0) thetaDeg += 360;

    return {
      quadrant,
      distX: Math.round(distX * 100) / 100,
      distY: Math.round(distY * 100) / 100,
      radius: Math.round(radius * 100) / 100,
      thetaDeg: Math.round(thetaDeg * 10) / 10,
    };
  }

  getPointTelemetry() {
    return this.getQuadrantInfo();
  }

  // Linear system methods
  getLine1(): LinearLine { return { ...this.line1 }; }
  getLine2(): LinearLine { return { ...this.line2 }; }

  setLine1(updates: Partial<LinearLine>): void {
    this.line1 = { ...this.line1, ...updates };
  }

  setLine2(updates: Partial<LinearLine>): void {
    this.line2 = { ...this.line2, ...updates };
  }

  getSystemSolution(): {
    delta: number;
    status: 'UNIQUE' | 'PARALLEL_NO_SOLUTION' | 'COINCIDENT_INFINITE';
    intersection: { x: number; y: number } | null;
  } {
    const { a: a1, b: b1, c: c1 } = this.line1;
    const { a: a2, b: b2, c: c2 } = this.line2;

    const delta = a1 * b2 - a2 * b1;

    if (Math.abs(delta) < 1e-6) {
      const deltaX = c1 * b2 - c2 * b1;
      const deltaY = a1 * c2 - a2 * c1;
      if (Math.abs(deltaX) < 1e-6 && Math.abs(deltaY) < 1e-6) {
        return { delta: 0, status: 'COINCIDENT_INFINITE', intersection: null };
      }
      return { delta: 0, status: 'PARALLEL_NO_SOLUTION', intersection: null };
    }

    const x = (c1 * b2 - c2 * b1) / delta;
    const y = (a1 * c2 - a2 * c1) / delta;
    return { delta, status: 'UNIQUE', intersection: { x, y } };
  }

  // Polynomial methods
  getPoly(): PolyCubic { return { ...this.poly }; }
  setPoly(updates: Partial<PolyCubic>): void {
    this.poly = { ...this.poly, ...updates };
  }

  evaluateRemainder(): {
    remainder: number;
    isRoot: boolean;
    quotient: { q2: number; q1: number; q0: number };
    steps: string[];
  } {
    const { a, b, c, d, k } = this.poly;
    const remainder = a * k * k * k + b * k * k + c * k + d;
    const q2 = a;
    const q1 = b + k * q2;
    const q0 = c + k * q1;

    const steps = [
      `Step 1: Leading coefficient q₂ = a = ${q2}`,
      `Step 2: Linear term q₁ = b + k·q₂ = ${b} + (${k})·(${q2}) = ${q1}`,
      `Step 3: Constant term q₀ = c + k·q₁ = ${c} + (${k})·(${q1}) = ${q0}`,
      `Step 4: Remainder R = d + k·q₀ = ${d} + (${k})·(${q0}) = ${remainder}`,
      `Identity: P(x) = (x - ${k})(${q2}x² + ${q1}x + ${q0}) + (${remainder})`,
    ];

    return {
      remainder,
      isRoot: remainder === 0,
      quotient: { q2, q1, q0 },
      steps,
    };
  }

  // Cubic identity methods
  getCubicIdentityVars(): { a: number; b: number; c: number } {
    return { a: this.idA, b: this.idB, c: this.idC };
  }

  setCubicIdentityVars(a: number, b: number, c: number): void {
    this.idA = a;
    this.idB = b;
    this.idC = c;
  }

  forceZeroSum(): void {
    this.idC = -(this.idA + this.idB);
  }

  evaluateCubicIdentity(): {
    sumABC: number;
    lhs: number;
    rhs: number;
    factor2: number;
    isZeroSum: boolean;
  } {
    const { idA: a, idB: b, idC: c } = this;
    const sumABC = a + b + c;
    const lhs = a * a * a + b * b * b + c * c * c - 3 * a * b * c;
    const factor2 = a * a + b * b + c * c - (a * b + b * c + c * a);
    const rhs = sumABC * factor2;

    return {
      sumABC,
      lhs,
      rhs,
      factor2,
      isZeroSum: sumABC === 0,
    };
  }
}

export function mountLinearCoordinatesWorkbench(
  root: HTMLElement,
  controller?: LinearCoordinatesController,
  onNavigate?: (route: string) => void
): { dispose: () => void } {
  const ctrl = controller ?? new LinearCoordinatesController();
  let active = true;

  const render = () => {
    if (!active) return;
    const tab = ctrl.getActiveTab();
    const pt = ctrl.getPoint();
    const qInfo = ctrl.getQuadrantInfo();
    const l1 = ctrl.getLine1();
    const l2 = ctrl.getLine2();
    const sol = ctrl.getSystemSolution();
    const poly = ctrl.getPoly();
    const remData = ctrl.evaluateRemainder();
    const idVars = ctrl.getCubicIdentityVars();
    const idData = ctrl.evaluateCubicIdentity();

    // Map point (-8..8) to SVG viewbox (0..400)
    const toSvgX = (x: number) => 200 + x * 22;
    const toSvgY = (y: number) => 200 - y * 22;

    const pxX = toSvgX(pt.x);
    const pxY = toSvgY(pt.y);
    const projXX = toSvgX(pt.x);
    const projXY = toSvgY(0);
    const projYX = toSvgX(0);
    const projYY = toSvgY(pt.y);

    root.innerHTML = `
      <div class="linear-coordinates-container" style="max-width:1400px;margin:0 auto;padding:1.5rem;box-sizing:border-box;font-family:var(--g9-font-family, system-ui,-apple-system,sans-serif);color:#0f172a;">
        <header style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:1rem;padding-bottom:1.25rem;border-bottom:2px solid #e2e8f0;margin-bottom:1.5rem;">
          <div>
            <div style="display:flex;gap:8px;font-size:0.9rem;color:#64748b;margin-bottom:0.25rem;flex-wrap:wrap;align-items:center;">
              <a href="#/home" style="color:#0284c7;text-decoration:none;font-weight:600;">Home</a> &gt;
              <a href="#/subject/mathematics" style="color:#0284c7;text-decoration:none;font-weight:600;">Mathematics</a> &gt;
              <a href="#/labs" style="color:#0284c7;text-decoration:none;font-weight:600;">Standalone Labs</a> &gt; 
              <span>Polynomials &amp; Coordinate Geometry Suite</span>
            </div>
            <div style="display:flex;gap:8px;align-items:center;">
              <span style="font-size:0.875rem;font-weight:800;background:#e0f2fe;color:#0369a1;padding:3px 8px;border-radius:4px;">MATHEMATICS RESEARCH SUITE</span>
              <span style="font-size:0.875rem;font-weight:700;background:#fee2e2;color:#991b1b;padding:3px 8px;border-radius:4px;">Academic Status: HOLD</span>
              <span style="font-size:0.875rem;font-weight:700;background:#f1f5f9;color:#475569;padding:3px 8px;border-radius:4px;">GRADE9 v3.5 PARITY</span>
            </div>
            <h1 style="margin:0.5rem 0 0;font-size:1.9rem;font-weight:800;color:#0f172a;">📐 Polynomials &amp; Coordinate Geometry Research Suite</h1>
          </div>
          <div style="display:flex;gap:8px;flex-wrap:wrap;">
            <button type="button" id="btn-return-math" style="min-height:${HIT_TARGET_MIN_PX}px;padding:8px 16px;background:#0284c7;color:white;border:none;border-radius:6px;cursor:pointer;font-weight:700;">
              ← Return to Mathematics Hub
            </button>
            <button type="button" id="btn-return-labs" style="min-height:${HIT_TARGET_MIN_PX}px;padding:8px 16px;background:#0f172a;color:white;border:none;border-radius:6px;cursor:pointer;font-weight:700;">
              ← Labs Hub
            </button>
          </div>
        </header>

        <!-- Suite Tab Navigation -->
        <nav class="suite-tabs" role="tablist" style="display:flex;gap:8px;margin-bottom:1.5rem;border-bottom:1px solid #cbd5e1;padding-bottom:8px;">
          <button type="button" class="tab-btn ${tab === 'coords' ? 'active' : ''}" data-tab="coords" style="min-height:${HIT_TARGET_MIN_PX}px;padding:10px 18px;background:${tab === 'coords' ? '#0284c7' : '#f8fafc'};color:${tab === 'coords' ? '#ffffff' : '#475569'};border:1px solid ${tab === 'coords' ? '#0284c7' : '#cbd5e1'};border-radius:6px;cursor:pointer;font-weight:700;">
            1. 📈 2D Cartesian Coordinates &amp; Systems
          </button>
          <button type="button" class="tab-btn ${tab === 'poly' ? 'active' : ''}" data-tab="poly" style="min-height:${HIT_TARGET_MIN_PX}px;padding:10px 18px;background:${tab === 'poly' ? '#0284c7' : '#f8fafc'};color:${tab === 'poly' ? '#ffffff' : '#475569'};border:1px solid ${tab === 'poly' ? '#0284c7' : '#cbd5e1'};border-radius:6px;cursor:pointer;font-weight:700;">
            2. ➗ Remainder Theorem &amp; Cubic Identities
          </button>
          <button type="button" class="tab-btn ${tab === 'blueprints' ? 'active' : ''}" data-tab="blueprints" style="min-height:${HIT_TARGET_MIN_PX}px;padding:10px 18px;background:${tab === 'blueprints' ? '#0284c7' : '#f8fafc'};color:${tab === 'blueprints' ? '#ffffff' : '#475569'};border:1px solid ${tab === 'blueprints' ? '#0284c7' : '#cbd5e1'};border-radius:6px;cursor:pointer;font-weight:700;">
            3. 📜 Quality Contract Blueprints
          </button>
        </nav>

        ${tab === 'coords' ? `
          <!-- TAB 1: CARTESIAN PLANE & LINEAR SYSTEMS -->
          <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(min(100%, 360px), 1fr));gap:2rem;">
            <!-- Interactive Coordinate Canvas Panel -->
            <div>
              <div style="background:#ffffff;border:1px solid #e2e8f0;border-radius:8px;padding:1.25rem;box-shadow:0 1px 3px rgba(0,0,0,0.05);">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem;">
                  <h3 style="margin:0;font-size:1.15rem;font-weight:700;">Cartesian Coordinate Plane</h3>
                  <button type="button" id="btn-reset-origin" style="min-height:${HIT_TARGET_MIN_PX}px;padding:6px 14px;background:#f1f5f9;border:1px solid #cbd5e1;border-radius:6px;cursor:pointer;font-weight:600;">Reset (0,0)</button>
                </div>

                <div class="canvas-wrap" style="background:#f8fafc;border:1px solid #cbd5e1;border-radius:8px;display:flex;justify-content:center;padding:10px;">
                  <svg id="coord-svg" width="380" height="380" viewBox="0 0 400 400" style="touch-action:none;user-select:none;">
                    <!-- Grid background -->
                    <defs>
                      <pattern id="grid" width="22" height="22" patternUnits="userSpaceOnUse">
                        <path d="M 22 0 L 0 0 0 22" fill="none" stroke="#e2e8f0" stroke-width="1"/>
                      </pattern>
                    </defs>
                    <rect width="400" height="400" fill="url(#grid)" />

                    <!-- Axes -->
                    <line x1="0" y1="200" x2="400" y2="200" stroke="#64748b" stroke-width="2"/>
                    <line x1="200" y1="0" x2="200" y2="400" stroke="#64748b" stroke-width="2"/>
                    <text x="385" y="195" font-size="14" font-weight="700" fill="#475569">X</text>
                    <text x="205" y="15" font-size="14" font-weight="700" fill="#475569">Y</text>

                    <!-- Vector OP -->
                    <line x1="200" y1="200" x2="${pxX}" y2="${pxY}" stroke="#0284c7" stroke-width="3"/>

                    <!-- Orthogonal Projections -->
                    <line x1="${pxX}" y1="${pxY}" x2="${projXX}" y2="${projXY}" stroke="#9333ea" stroke-width="1.5" stroke-dasharray="4,4"/>
                    <line x1="${pxX}" y1="${pxY}" x2="${projYX}" y2="${projYY}" stroke="#10b981" stroke-width="1.5" stroke-dasharray="4,4"/>

                    <!-- Projection Points -->
                    <circle cx="${projXX}" cy="${projXY}" r="4" fill="#9333ea" />
                    <circle cx="${projYX}" cy="${projYY}" r="4" fill="#10b981" />

                    <!-- Point P -->
                    <circle cx="${pxX}" cy="${pxY}" r="8" fill="#e11d48" stroke="#ffffff" stroke-width="2" style="cursor:pointer;"/>
                    <text x="${pxX + 10}" y="${pxY - 10}" font-size="14" font-weight="800" fill="#e11d48">P(${pt.x}, ${pt.y})</text>
                  </svg>
                </div>

                <!-- Presets -->
                <div style="margin-top:1rem;">
                  <label style="display:block;font-size:0.875rem;font-weight:700;color:#64748b;margin-bottom:0.5rem;">Preset Coordinates:</label>
                  <div style="display:flex;flex-wrap:wrap;gap:8px;">
                    <button type="button" class="preset-btn" data-x="4" data-y="3" style="min-height:${HIT_TARGET_MIN_PX}px;padding:6px 12px;background:#f8fafc;border:1px solid #cbd5e1;border-radius:6px;font-size:0.875rem;cursor:pointer;font-weight:600;">P(4, 3) [Q I]</button>
                    <button type="button" class="preset-btn" data-x="-5" data-y="2" style="min-height:${HIT_TARGET_MIN_PX}px;padding:6px 12px;background:#f8fafc;border:1px solid #cbd5e1;border-radius:6px;font-size:0.875rem;cursor:pointer;font-weight:600;">P(−5, 2) [Q II]</button>
                    <button type="button" class="preset-btn" data-x="-4" data-y="-4" style="min-height:${HIT_TARGET_MIN_PX}px;padding:6px 12px;background:#f8fafc;border:1px solid #cbd5e1;border-radius:6px;font-size:0.875rem;cursor:pointer;font-weight:600;">P(−4, −4) [Q III]</button>
                    <button type="button" class="preset-btn" data-x="5" data-y="-3" style="min-height:${HIT_TARGET_MIN_PX}px;padding:6px 12px;background:#f8fafc;border:1px solid #cbd5e1;border-radius:6px;font-size:0.875rem;cursor:pointer;font-weight:600;">P(5, −3) [Q IV]</button>
                    <button type="button" class="preset-btn" data-x="6" data-y="0" style="min-height:${HIT_TARGET_MIN_PX}px;padding:6px 12px;background:#f8fafc;border:1px solid #cbd5e1;border-radius:6px;font-size:0.875rem;cursor:pointer;font-weight:600;">P(6, 0) [X-axis]</button>
                    <button type="button" class="preset-btn" data-x="0" data-y="-5" style="min-height:${HIT_TARGET_MIN_PX}px;padding:6px 12px;background:#f8fafc;border:1px solid #cbd5e1;border-radius:6px;font-size:0.875rem;cursor:pointer;font-weight:600;">P(0, −5) [Y-axis]</button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Telemetry & Linear Systems Panel -->
            <div style="display:flex;flex-direction:column;gap:1.5rem;">
              <!-- Point Telemetry HUD -->
              <div style="background:#ffffff;border:1px solid #e2e8f0;border-radius:8px;padding:1.25rem;box-shadow:0 1px 3px rgba(0,0,0,0.05);">
                <h3 style="margin:0 0 1rem;font-size:1.15rem;font-weight:700;">Point Telemetry HUD</h3>
                <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.75rem;">
                  <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:6px;padding:0.75rem;">
                    <span style="font-size:0.875rem;color:#64748b;">Coordinates</span>
                    <div id="hud-coords" style="font-size:1.2rem;font-weight:800;color:#0f172a;">(${pt.x}, ${pt.y})</div>
                  </div>
                  <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:6px;padding:0.75rem;">
                    <span style="font-size:0.875rem;color:#64748b;">Location</span>
                    <div id="hud-quadrant" style="font-size:1.05rem;font-weight:700;color:#0284c7;">${escapeHtml(qInfo.quadrant)}</div>
                  </div>
                  <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:6px;padding:0.75rem;">
                    <span style="font-size:0.875rem;color:#64748b;">Distance to X-axis |y|</span>
                    <div style="font-size:1.1rem;font-weight:700;color:#9333ea;">${qInfo.distX} units</div>
                  </div>
                  <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:6px;padding:0.75rem;">
                    <span style="font-size:0.875rem;color:#64748b;">Distance to Y-axis |x|</span>
                    <div style="font-size:1.1rem;font-weight:700;color:#10b981;">${qInfo.distY} units</div>
                  </div>
                  <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:6px;padding:0.75rem;">
                    <span style="font-size:0.875rem;color:#64748b;">Radius |OP|</span>
                    <div style="font-size:1.1rem;font-weight:700;color:#0284c7;">${qInfo.radius}</div>
                  </div>
                  <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:6px;padding:0.75rem;">
                    <span style="font-size:0.875rem;color:#64748b;">Angle θ</span>
                    <div style="font-size:1.1rem;font-weight:700;color:#d97706;">${qInfo.thetaDeg}°</div>
                  </div>
                </div>
              </div>

              <!-- Linear Systems (2 Equations) Solver -->
              <div style="background:#ffffff;border:1px solid #e2e8f0;border-radius:8px;padding:1.25rem;box-shadow:0 1px 3px rgba(0,0,0,0.05);">
                <h3 style="margin:0 0 1rem;font-size:1.15rem;font-weight:700;">System of Linear Equations</h3>
                <div style="display:flex;flex-direction:column;gap:0.75rem;">
                  <div style="display:flex;align-items:center;gap:8px;">
                    <span style="font-weight:700;width:30px;">L₁:</span>
                    <input type="number" id="l1-a" value="${l1.a}" style="width:60px;min-height:44px;padding:4px;border:1px solid #cbd5e1;border-radius:4px;text-align:center;font-weight:700;"> x +
                    <input type="number" id="l1-b" value="${l1.b}" style="width:60px;min-height:44px;padding:4px;border:1px solid #cbd5e1;border-radius:4px;text-align:center;font-weight:700;"> y =
                    <input type="number" id="l1-c" value="${l1.c}" style="width:60px;min-height:44px;padding:4px;border:1px solid #cbd5e1;border-radius:4px;text-align:center;font-weight:700;">
                  </div>
                  <div style="display:flex;align-items:center;gap:8px;">
                    <span style="font-weight:700;width:30px;">L₂:</span>
                    <input type="number" id="l2-a" value="${l2.a}" style="width:60px;min-height:44px;padding:4px;border:1px solid #cbd5e1;border-radius:4px;text-align:center;font-weight:700;"> x +
                    <input type="number" id="l2-b" value="${l2.b}" style="width:60px;min-height:44px;padding:4px;border:1px solid #cbd5e1;border-radius:4px;text-align:center;font-weight:700;"> y =
                    <input type="number" id="l2-c" value="${l2.c}" style="width:60px;min-height:44px;padding:4px;border:1px solid #cbd5e1;border-radius:4px;text-align:center;font-weight:700;">
                  </div>

                  <div style="margin-top:0.5rem;padding:0.75rem;background:#f0fdf4;border:1px solid #bbf7d0;border-radius:6px;">
                    <div style="font-weight:700;color:#166534;font-size:0.95rem;">
                      Determinant: Δ = ${sol.delta} · Status: ${escapeHtml(sol.status)}
                    </div>
                    ${sol.intersection ? `
                      <div style="font-size:1.1rem;font-weight:800;color:#15803d;margin-top:4px;">
                        Unique Intersection: (${sol.intersection.x.toFixed(2)}, ${sol.intersection.y.toFixed(2)})
                      </div>
                    ` : `
                      <div style="font-size:0.95rem;color:#b45309;margin-top:4px;">
                        ${sol.status === 'PARALLEL_NO_SOLUTION' ? 'Lines are parallel; zero solution intersection.' : 'Lines are coincident; infinitely many solutions.'}
                      </div>
                    `}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ` : tab === 'poly' ? `
          <!-- TAB 2: POLYNOMIAL REMAINDER & CUBIC IDENTITIES -->
          <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(min(100%, 360px), 1fr));gap:2rem;">
            <!-- Polynomial Remainder Theorem Panel -->
            <div style="background:#ffffff;border:1px solid #e2e8f0;border-radius:8px;padding:1.5rem;box-shadow:0 1px 3px rgba(0,0,0,0.05);">
              <h3 style="margin:0 0 0.5rem;font-size:1.2rem;font-weight:700;">Polynomial Remainder Theorem Calculator</h3>
              <p style="margin:0 0 1.25rem;font-size:0.95rem;color:#64748b;">
                ${renderMathHtml('Evaluates $P(x) = ax^3 + bx^2 + cx + d$ divided by $(x - k)$ with real-time synthetic division quotient steps.')}
              </p>

              <div style="display:flex;flex-direction:column;gap:1rem;">
                <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;">
                  <input type="number" id="poly-a" value="${poly.a}" style="width:50px;min-height:44px;text-align:center;border:1px solid #cbd5e1;border-radius:4px;font-weight:700;"> x³ +
                  <input type="number" id="poly-b" value="${poly.b}" style="width:50px;min-height:44px;text-align:center;border:1px solid #cbd5e1;border-radius:4px;font-weight:700;"> x² +
                  <input type="number" id="poly-c" value="${poly.c}" style="width:50px;min-height:44px;text-align:center;border:1px solid #cbd5e1;border-radius:4px;font-weight:700;"> x +
                  <input type="number" id="poly-d" value="${poly.d}" style="width:50px;min-height:44px;text-align:center;border:1px solid #cbd5e1;border-radius:4px;font-weight:700;">
                </div>

                <div style="display:flex;align-items:center;gap:8px;">
                  <span style="font-weight:700;">Divisor: (x − k) with k =</span>
                  <input type="number" id="poly-k" value="${poly.k}" style="width:60px;min-height:44px;text-align:center;border:1px solid #cbd5e1;border-radius:4px;font-weight:700;">
                </div>

                <!-- Synthetic Division Step-by-Step HUD -->
                <div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:8px;padding:1rem;">
                  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.5rem;">
                    <span style="font-weight:800;color:#1e40af;font-size:1.1rem;">
                      Remainder R = P(${poly.k}) = ${remData.remainder}
                    </span>
                    <span style="font-size:0.875rem;font-weight:700;padding:3px 8px;border-radius:4px;background:${remData.isRoot ? '#dcfce7;color:#15803d;' : '#fee2e2;color:#991b1b;'}">
                      ${remData.isRoot ? '✓ (x − k) IS A FACTOR' : '✗ NOT A FACTOR'}
                    </span>
                  </div>

                  <div style="font-family:var(--g9-font-mono, monospace);font-size:0.9rem;color:#1e3a8a;display:flex;flex-direction:column;gap:4px;">
                    ${remData.steps.map(s => `<div>${escapeHtml(s)}</div>`).join('')}
                  </div>
                </div>

                <!-- Polynomial Presets -->
                <div>
                  <span style="font-size:0.875rem;font-weight:700;color:#64748b;">Presets:</span>
                  <div style="display:flex;flex-wrap:wrap;gap:8px;margin-top:4px;">
                    <button type="button" class="poly-preset-btn" data-a="1" data-b="-3" data-c="4" data-d="-12" data-k="3" style="min-height:${HIT_TARGET_MIN_PX}px;padding:6px 12px;background:#f8fafc;border:1px solid #cbd5e1;border-radius:6px;cursor:pointer;font-size:0.875rem;">x³ − 3x² + 4x − 12 [k=3]</button>
                    <button type="button" class="poly-preset-btn" data-a="2" data-b="-5" data-c="7" data-d="-4" data-k="1" style="min-height:${HIT_TARGET_MIN_PX}px;padding:6px 12px;background:#f8fafc;border:1px solid #cbd5e1;border-radius:6px;cursor:pointer;font-size:0.875rem;">2x³ − 5x² + 7x − 4 [k=1]</button>
                    <button type="button" class="poly-preset-btn" data-a="1" data-b="-6" data-c="11" data-d="-6" data-k="2" style="min-height:${HIT_TARGET_MIN_PX}px;padding:6px 12px;background:#f8fafc;border:1px solid #cbd5e1;border-radius:6px;cursor:pointer;font-size:0.875rem;">x³ − 6x² + 11x − 6 [k=2]</button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Cubic Algebraic Identities Panel -->
            <div style="background:#ffffff;border:1px solid #e2e8f0;border-radius:8px;padding:1.5rem;box-shadow:0 1px 3px rgba(0,0,0,0.05);">
              <h3 style="margin:0 0 0.5rem;font-size:1.2rem;font-weight:700;">Cubic Algebraic Identity Dynamics</h3>
              <p style="margin:0 0 1.25rem;font-size:0.95rem;color:#64748b;">
                ${renderMathHtml('Visualizes $a³ + b³ + c³ − 3abc = (a+b+c)(a² + b² + c² − ab − bc − ca)$ and the conditional zero-sum identity ($a+b+c=0 \\implies a³+b³+c³ = 3abc$).')}
              </p>

              <div style="display:flex;flex-direction:column;gap:1.25rem;">
                <div>
                  <div style="display:flex;justify-content:space-between;font-weight:700;margin-bottom:4px;">
                    <span>Variable a = ${idVars.a}</span>
                    <span>Variable b = ${idVars.b}</span>
                    <span>Variable c = ${idVars.c}</span>
                  </div>
                  <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;">
                    <input type="range" id="slider-a" min="-10" max="10" value="${idVars.a}" style="min-height:${HIT_TARGET_MIN_PX}px;">
                    <input type="range" id="slider-b" min="-10" max="10" value="${idVars.b}" style="min-height:${HIT_TARGET_MIN_PX}px;">
                    <input type="range" id="slider-c" min="-10" max="10" value="${idVars.c}" style="min-height:${HIT_TARGET_MIN_PX}px;">
                  </div>
                </div>

                <button type="button" id="btn-force-zerosum" style="min-height:${HIT_TARGET_MIN_PX}px;padding:10px 18px;background:#0284c7;color:white;border:none;border-radius:6px;font-weight:700;cursor:pointer;">
                  ⚡ Force Zero Sum Condition (a + b + c = 0)
                </button>

                <!-- Real-time Verification Card -->
                <div style="background:${idData.isZeroSum ? '#f0fdf4' : '#f8fafc'};border:1px solid ${idData.isZeroSum ? '#bbf7d0' : '#cbd5e1'};border-radius:8px;padding:1.25rem;">
                  <div style="font-size:0.9rem;color:#64748b;margin-bottom:4px;">Sum (a + b + c) = ${idData.sumABC}</div>
                  <div style="font-size:1.15rem;font-weight:800;color:${idData.isZeroSum ? '#15803d' : '#0f172a'};">
                    LHS (a³ + b³ + c³ − 3abc) = ${idData.lhs}
                  </div>
                  <div style="font-size:1.15rem;font-weight:800;color:${idData.isZeroSum ? '#15803d' : '#0f172a'};">
                    RHS (a+b+c)·Factor = ${idData.rhs}
                  </div>

                  ${idData.isZeroSum ? `
                    <div style="margin-top:0.75rem;padding:0.75rem;background:#dcfce7;border-radius:6px;font-weight:700;color:#166534;font-size:0.95rem;">
                      ⭐ CONDITIONAL IDENTITY VERIFIED:<br>
                      Since a + b + c = 0, therefore a³ + b³ + c³ = 3abc = ${3 * idVars.a * idVars.b * idVars.c}
                    </div>
                  ` : ''}
                </div>
              </div>
            </div>
          </div>
        ` : `
          <!-- TAB 3: QUALITY BLUEPRINTS -->
          <div style="background:#ffffff;border:1px solid #e2e8f0;border-radius:8px;padding:1.5rem;box-shadow:0 1px 3px rgba(0,0,0,0.05);">
            <h3 style="margin:0 0 0.5rem;font-size:1.2rem;font-weight:700;">Learner Quality Contract Blueprint Suite</h3>
            <p style="margin:0 0 1.5rem;font-size:0.9rem;color:#64748b;">
              Adheres strictly to docs/plans/phase1/QUALITY-CONTRACT.md (CORE1 Orientation, CORE1B Mandatory Commitment Reconstruction, CORE2 Multi-Rung Practice).
            </p>

            <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(300px, 1fr));gap:1.5rem;">
              <div style="border:1px solid #cbd5e1;border-radius:8px;padding:1.25rem;background:#f8fafc;">
                <div style="display:inline-block;padding:3px 8px;background:#e0f2fe;color:#0369a1;border-radius:4px;font-size:0.875rem;font-weight:800;margin-bottom:0.5rem;">CORE 1 ORIENTATION</div>
                <h4 style="margin:0 0 0.5rem;font-size:1.1rem;font-weight:700;">Interactive 2D Verification</h4>
                <p style="margin:0;font-size:0.9rem;color:#475569;line-height:1.5;">
                  Learners visually interact with Cartesian quadrants, orthogonal distance projections, and real-time remainder values before formal derivation.
                </p>
              </div>

              <div style="border:1px solid #cbd5e1;border-radius:8px;padding:1.25rem;background:#f8fafc;">
                <div style="display:inline-block;padding:3px 8px;background:#fef3c7;color:#92400e;border-radius:4px;font-size:0.875rem;font-weight:800;margin-bottom:0.5rem;">CORE 1B COMMITMENT</div>
                <h4 style="margin:0 0 0.5rem;font-size:1.1rem;font-weight:700;">Step-by-Step Synthetic Proof</h4>
                <p style="margin:0;font-size:0.9rem;color:#475569;line-height:1.5;">
                  Requires durable student derivation of remainder and quotient steps without premature key disclosure (Fault N09 key defense).
                </p>
              </div>

              <div style="border:1px solid #cbd5e1;border-radius:8px;padding:1.25rem;background:#f8fafc;">
                <div style="display:inline-block;padding:3px 8px;background:#dcfce7;color:#166534;border-radius:4px;font-size:0.875rem;font-weight:800;margin-bottom:0.5rem;">CORE 2 PRACTICE</div>
                <h4 style="margin:0 0 0.5rem;font-size:1.1rem;font-weight:700;">Multi-Rung Problem Bank</h4>
                <p style="margin:0;font-size:0.9rem;color:#475569;line-height:1.5;">
                  Connects polynomial factoring and algebraic identities to competitive Olympiad and JEE foundation benchmarks.
                </p>
              </div>
            </div>
          </div>
        `}
      </div>
    `;

    bindEvents();
  };

  const bindEvents = () => {
    // Navigation return buttons
    root.querySelector<HTMLButtonElement>('#btn-return-math')?.addEventListener('click', () => {
      if (onNavigate) onNavigate('subject/mathematics');
      else window.location.hash = '#/subject/mathematics';
    });
    root.querySelector<HTMLButtonElement>('#btn-return-labs')?.addEventListener('click', () => {
      if (onNavigate) onNavigate('labs');
      else window.location.hash = '#/labs';
    });

    // Tab buttons
    root.querySelectorAll<HTMLButtonElement>('.tab-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const tab = btn.dataset.tab as any;
        if (tab) {
          ctrl.setActiveTab(tab);
          render();
        }
      });
    });

    // Tab 1: SVG Coordinate Plane click & drag
    const svg = root.querySelector<SVGSVGElement>('#coord-svg');
    if (svg) {
      const handleSvgPointer = (e: MouseEvent | TouchEvent) => {
        const rect = svg.getBoundingClientRect();
        const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
        const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
        const clickX = clientX - rect.left;
        const clickY = clientY - rect.top;

        // Scale to 400x400 SVG coords
        const svgX = (clickX / rect.width) * 400;
        const svgY = (clickY / rect.height) * 400;

        const mathX = (svgX - 200) / 22;
        const mathY = (200 - svgY) / 22;

        ctrl.setPoint(mathX, mathY);
        render();
      };

      svg.addEventListener('click', handleSvgPointer);
    }

    // Tab 1: Reset origin button
    root.querySelector<HTMLButtonElement>('#btn-reset-origin')?.addEventListener('click', () => {
      ctrl.setPoint(0, 0);
      render();
    });

    // Tab 1: Presets
    root.querySelectorAll<HTMLButtonElement>('.preset-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const x = parseFloat(btn.dataset.x || '0');
        const y = parseFloat(btn.dataset.y || '0');
        ctrl.setPoint(x, y);
        render();
      });
    });

    // Tab 1: Linear lines inputs
    ['l1-a', 'l1-b', 'l1-c', 'l2-a', 'l2-b', 'l2-c'].forEach((id) => {
      root.querySelector<HTMLInputElement>(`#${id}`)?.addEventListener('input', () => {
        const a1 = parseFloat(root.querySelector<HTMLInputElement>('#l1-a')?.value || '2');
        const b1 = parseFloat(root.querySelector<HTMLInputElement>('#l1-b')?.value || '1');
        const c1 = parseFloat(root.querySelector<HTMLInputElement>('#l1-c')?.value || '5');
        const a2 = parseFloat(root.querySelector<HTMLInputElement>('#l2-a')?.value || '1');
        const b2 = parseFloat(root.querySelector<HTMLInputElement>('#l2-b')?.value || '-1');
        const c2 = parseFloat(root.querySelector<HTMLInputElement>('#l2-c')?.value || '1');

        ctrl.setLine1({ a: a1, b: b1, c: c1 });
        ctrl.setLine2({ a: a2, b: b2, c: c2 });
        render();
      });
    });

    // Tab 2: Polynomial inputs
    ['poly-a', 'poly-b', 'poly-c', 'poly-d', 'poly-k'].forEach((id) => {
      root.querySelector<HTMLInputElement>(`#${id}`)?.addEventListener('input', () => {
        const a = parseFloat(root.querySelector<HTMLInputElement>('#poly-a')?.value || '1');
        const b = parseFloat(root.querySelector<HTMLInputElement>('#poly-b')?.value || '0');
        const c = parseFloat(root.querySelector<HTMLInputElement>('#poly-c')?.value || '0');
        const d = parseFloat(root.querySelector<HTMLInputElement>('#poly-d')?.value || '0');
        const k = parseFloat(root.querySelector<HTMLInputElement>('#poly-k')?.value || '0');

        ctrl.setPoly({ a, b, c, d, k });
        render();
      });
    });

    // Tab 2: Polynomial Presets
    root.querySelectorAll<HTMLButtonElement>('.poly-preset-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const a = parseFloat(btn.dataset.a || '1');
        const b = parseFloat(btn.dataset.b || '0');
        const c = parseFloat(btn.dataset.c || '0');
        const d = parseFloat(btn.dataset.d || '0');
        const k = parseFloat(btn.dataset.k || '0');
        ctrl.setPoly({ a, b, c, d, k });
        render();
      });
    });

    // Tab 2: Cubic Identity Sliders
    ['slider-a', 'slider-b', 'slider-c'].forEach((id) => {
      root.querySelector<HTMLInputElement>(`#${id}`)?.addEventListener('input', () => {
        const a = parseInt(root.querySelector<HTMLInputElement>('#slider-a')?.value || '2', 10);
        const b = parseInt(root.querySelector<HTMLInputElement>('#slider-b')?.value || '3', 10);
        const c = parseInt(root.querySelector<HTMLInputElement>('#slider-c')?.value || '-5', 10);
        ctrl.setCubicIdentityVars(a, b, c);
        render();
      });
    });

    // Tab 2: Force Zero Sum
    root.querySelector<HTMLButtonElement>('#btn-force-zerosum')?.addEventListener('click', () => {
      ctrl.forceZeroSum();
      render();
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
