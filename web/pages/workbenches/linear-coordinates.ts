/**
 * web/pages/workbenches/linear-coordinates.ts
 * Workpack A69 / v3.5 Parity — Linear Systems & Cartesian Coordinates Explorer
 *
 * Implements:
 * - System of linear equations: L1: a1 x + b1 y = c1, L2: a2 x + b2 y = c2
 * - Determinant discriminant: Delta = a1*b2 - a2*b1
 * - Intersection locus (x*, y*) computation for unique solutions
 * - Parallel / Inconsistent and Coincident / Dependent line detection
 * - Interactive 2D Cartesian SVG plane with line rendering and intersection marker
 * - 12.7" tablet touch ergonomics (>= 48px hit targets, zero horizontal overflow)
 * - Academic status: HOLD (Formative Simulation Mode)
 */

import { escapeHtml } from '../../runtime/rendering.ts';
import { HIT_TARGET_MIN_PX } from '../../styles/tokens.ts';

export interface LinearLine {
  a: number;
  b: number;
  c: number;
}

export class LinearCoordinatesController {
  private line1: LinearLine = { a: 2, b: 1, c: 5 }; // 2x + y = 5
  private line2: LinearLine = { a: 1, b: -1, c: 1 }; // x - y = 1 (Intersection at (2, 1))

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
      // Check consistency: a1*c2 - a2*c1 and b1*c2 - b2*c1
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
    const l1 = ctrl.getLine1();
    const l2 = ctrl.getLine2();
    const sol = ctrl.getSystemSolution();

    root.innerHTML = `
      <div class="linear-coordinates-container" style="max-width:1400px;margin:0 auto;padding:1.5rem;box-sizing:border-box;font-family:system-ui,-apple-system,sans-serif;color:#0f172a;">
        <header style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:1rem;padding-bottom:1.25rem;border-bottom:2px solid #e2e8f0;margin-bottom:1.5rem;">
          <div>
            <div style="display:flex;gap:8px;font-size:0.9rem;color:#64748b;margin-bottom:0.25rem;">
              <a href="#/labs" style="color:#0284c7;text-decoration:none;font-weight:600;">Standalone Labs</a> &gt; 
              <span>Linear Coordinates &amp; Systems</span>
            </div>
            <div style="display:flex;gap:8px;align-items:center;">
              <span style="font-size:0.8rem;font-weight:800;background:#e0f2fe;color:#0369a1;padding:3px 8px;border-radius:4px;">MATHEMATICS ALGEBRA WORKBENCH</span>
              <span style="font-size:0.8rem;font-weight:700;background:#fee2e2;color:#991b1b;padding:3px 8px;border-radius:4px;">Academic Status: HOLD</span>
            </div>
            <h1 style="margin:0.5rem 0 0;font-size:1.9rem;font-weight:800;color:#0f172a;">📈 Linear Systems &amp; Cartesian Coordinates</h1>
          </div>
          <button type="button" id="btn-return-labs" style="min-height:${HIT_TARGET_MIN_PX}px;padding:8px 18px;background:#0f172a;color:white;border:none;border-radius:6px;cursor:pointer;font-weight:700;">
            ← Return to Labs Hub
          </button>
        </header>

        <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(min(100%, 360px), 1fr));gap:2rem;">
          <!-- Controls -->
          <div>
            <!-- Line 1 -->
            <div style="background:#ffffff;border:1px solid #cbd5e1;border-radius:12px;padding:1.5rem;margin-bottom:1.5rem;">
              <h3 style="margin:0 0 1rem;font-size:1.15rem;color:#0284c7;">
                Line 1 (Blue): <code>${l1.a}x + (${l1.b})y = ${l1.c}</code>
              </h3>
              <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;">
                <div>
                  <label for="slider-a1" style="display:block;font-size:0.85rem;font-weight:700;margin-bottom:4px;">a₁: ${l1.a}</label>
                  <input type="range" id="slider-a1" min="-5" max="5" step="1" value="${l1.a}" style="width:100%;min-height:${HIT_TARGET_MIN_PX}px;" />
                </div>
                <div>
                  <label for="slider-b1" style="display:block;font-size:0.85rem;font-weight:700;margin-bottom:4px;">b₁: ${l1.b}</label>
                  <input type="range" id="slider-b1" min="-5" max="5" step="1" value="${l1.b}" style="width:100%;min-height:${HIT_TARGET_MIN_PX}px;" />
                </div>
                <div>
                  <label for="slider-c1" style="display:block;font-size:0.85rem;font-weight:700;margin-bottom:4px;">c₁: ${l1.c}</label>
                  <input type="range" id="slider-c1" min="-10" max="10" step="1" value="${l1.c}" style="width:100%;min-height:${HIT_TARGET_MIN_PX}px;" />
                </div>
              </div>
            </div>

            <!-- Line 2 -->
            <div style="background:#ffffff;border:1px solid #cbd5e1;border-radius:12px;padding:1.5rem;margin-bottom:1.5rem;">
              <h3 style="margin:0 0 1rem;font-size:1.15rem;color:#ea580c;">
                Line 2 (Orange): <code>${l2.a}x + (${l2.b})y = ${l2.c}</code>
              </h3>
              <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;">
                <div>
                  <label for="slider-a2" style="display:block;font-size:0.85rem;font-weight:700;margin-bottom:4px;">a₂: ${l2.a}</label>
                  <input type="range" id="slider-a2" min="-5" max="5" step="1" value="${l2.a}" style="width:100%;min-height:${HIT_TARGET_MIN_PX}px;" />
                </div>
                <div>
                  <label for="slider-b2" style="display:block;font-size:0.85rem;font-weight:700;margin-bottom:4px;">b₂: ${l2.b}</label>
                  <input type="range" id="slider-b2" min="-5" max="5" step="1" value="${l2.b}" style="width:100%;min-height:${HIT_TARGET_MIN_PX}px;" />
                </div>
                <div>
                  <label for="slider-c2" style="display:block;font-size:0.85rem;font-weight:700;margin-bottom:4px;">c₂: ${l2.c}</label>
                  <input type="range" id="slider-c2" min="-10" max="10" step="1" value="${l2.c}" style="width:100%;min-height:${HIT_TARGET_MIN_PX}px;" />
                </div>
              </div>
            </div>

            <!-- System Analysis Result -->
            <div style="background:#f8fafc;border:1px solid #cbd5e1;border-radius:12px;padding:1.25rem;">
              <h4 style="margin:0 0 0.75rem;font-size:1.05rem;color:#0f172a;">Linear Algebra Analysis:</h4>
              <div style="display:flex;justify-content:space-between;margin-bottom:6px;">
                <span style="color:#64748b;">Determinant Δ (a₁b₂ - a₂b₁):</span>
                <strong style="color:#0f172a;">${sol.delta.toFixed(2)}</strong>
              </div>
              <div style="display:flex;justify-content:space-between;margin-bottom:6px;">
                <span style="color:#64748b;">System Consistency:</span>
                <strong style="color:${sol.status === 'UNIQUE' ? '#059669' : sol.status === 'COINCIDENT_INFINITE' ? '#0284c7' : '#e11d48'};">
                  ${sol.status.replace(/_/g, ' ')}
                </strong>
              </div>
              ${sol.intersection ? `
                <div style="display:flex;justify-content:space-between;padding-top:6px;border-top:1px solid #e2e8f0;">
                  <span style="color:#0f172a;font-weight:700;">Intersection Coordinate (x*, y*):</span>
                  <strong style="color:#0284c7;font-size:1.1rem;">
                    (${sol.intersection.x.toFixed(2)}, ${sol.intersection.y.toFixed(2)})
                  </strong>
                </div>
              ` : ''}
            </div>
          </div>

          <!-- Cartesian 2D SVG Graph -->
          <div>
            <div style="background:#0f172a;border-radius:12px;padding:1.5rem;min-height:360px;display:flex;flex-direction:column;align-items:center;justify-content:center;color:white;">
              <h3 style="margin:0 0 1rem;font-size:1.1rem;color:#f8fafc;width:100%;text-align:left;">
                Cartesian Coordinate Plane ([-6, 6] × [-6, 6])
              </h3>
              ${renderCartesianSvg(l1, l2, sol.intersection)}
              <div style="display:flex;gap:16px;flex-wrap:wrap;margin-top:1rem;font-size:0.85rem;color:#94a3b8;">
                <span style="display:flex;align-items:center;gap:4px;"><span style="display:inline-block;width:14px;height:3px;background:#38bdf8;"></span> Line 1</span>
                <span style="display:flex;align-items:center;gap:4px;"><span style="display:inline-block;width:14px;height:3px;background:#fb923c;"></span> Line 2</span>
                <span style="display:flex;align-items:center;gap:4px;"><span style="display:inline-block;width:8px;height:8px;background:#4ade80;border-radius:50%;"></span> Intersection Point</span>
              </div>
            </div>
          </div>
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

    const bindSlider = (id: string, setter: (val: number) => void) => {
      root.querySelector<HTMLInputElement>(id)?.addEventListener('input', e => {
        setter(parseFloat((e.target as HTMLInputElement).value) || 0);
        render();
      });
    };

    bindSlider('#slider-a1', val => ctrl.setLine1({ a: val }));
    bindSlider('#slider-b1', val => ctrl.setLine1({ b: val }));
    bindSlider('#slider-c1', val => ctrl.setLine1({ c: val }));
    bindSlider('#slider-a2', val => ctrl.setLine2({ a: val }));
    bindSlider('#slider-b2', val => ctrl.setLine2({ b: val }));
    bindSlider('#slider-c2', val => ctrl.setLine2({ c: val }));
  };

  render();

  return {
    dispose: () => {
      active = false;
      root.replaceChildren();
    },
  };
}

function renderCartesianSvg(l1: LinearLine, l2: LinearLine, inter: { x: number; y: number } | null): string {
  const originX = 160;
  const originY = 160;
  const scale = 22; // pixels per unit

  const mapPoint = (x: number, y: number) => ({
    px: originX + x * scale,
    py: originY - y * scale,
  });

  const getLineEndpoints = (line: LinearLine): { x1: number; y1: number; x2: number; y2: number } | null => {
    // line: ax + by = c
    if (Math.abs(line.b) > 1e-4) {
      // y = (c - ax) / b
      const xA = -7;
      const yA = (line.c - line.a * xA) / line.b;
      const xB = 7;
      const yB = (line.c - line.a * xB) / line.b;
      const pA = mapPoint(xA, yA);
      const pB = mapPoint(xB, yB);
      return { x1: pA.px, y1: pA.py, x2: pB.px, y2: pB.py };
    } else if (Math.abs(line.a) > 1e-4) {
      // Vertical line: x = c / a
      const xVal = line.c / line.a;
      const pA = mapPoint(xVal, -7);
      const pB = mapPoint(xVal, 7);
      return { x1: pA.px, y1: pA.py, x2: pB.px, y2: pB.py };
    }
    return null;
  };

  const pts1 = getLineEndpoints(l1);
  const pts2 = getLineEndpoints(l2);

  return `
    <svg viewBox="0 0 320 320" style="width:100%;max-width:320px;height:auto;background:#1e293b;border-radius:8px;">
      <!-- Grid -->
      ${[-5, -4, -3, -2, -1, 1, 2, 3, 4, 5].map(v => {
        const p = mapPoint(v, v);
        return `
          <line x1="${p.px}" y1="10" x2="${p.px}" y2="310" stroke="#334155" stroke-width="1" />
          <line x1="10" y1="${p.py}" x2="310" y2="${p.py}" stroke="#334155" stroke-width="1" />
        `;
      }).join('')}

      <!-- Main Axes -->
      <line x1="10" y1="160" x2="310" y2="160" stroke="#64748b" stroke-width="2" />
      <line x1="160" y1="10" x2="160" y2="310" stroke="#64748b" stroke-width="2" />
      <text x="300" y="152" fill="#94a3b8" font-size="11" text-anchor="end">X</text>
      <text x="168" y="24" fill="#94a3b8" font-size="11">Y</text>

      <!-- Line 1 (Blue) -->
      ${pts1 ? `<line x1="${pts1.x1}" y1="${pts1.y1}" x2="${pts1.x2}" y2="${pts1.y2}" stroke="#38bdf8" stroke-width="2.5" />` : ''}

      <!-- Line 2 (Orange) -->
      ${pts2 ? `<line x1="${pts2.x1}" y1="${pts2.y1}" x2="${pts2.x2}" y2="${pts2.y2}" stroke="#fb923c" stroke-width="2.5" />` : ''}

      <!-- Intersection Dot (Green) -->
      ${inter ? (() => {
        const pt = mapPoint(inter.x, inter.y);
        if (pt.px >= 0 && pt.px <= 320 && pt.py >= 0 && pt.py <= 320) {
          return `
            <circle cx="${pt.px}" cy="${pt.py}" r="6" fill="#4ade80" stroke="#ffffff" stroke-width="2" />
          `;
        }
        return '';
      })() : ''}
    </svg>
  `;
}
