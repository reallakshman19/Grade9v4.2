/**
 * web/pages/workbenches/vector-algebra.ts
 * Workpack A69 / v3.5 Parity — 3D Vector Algebra & Spatial Geometry Workbench
 *
 * Implements:
 * - 3D vector components A = (Ax, Ay, Az) and B = (Bx, By, Bz)
 * - Magnitudes, dot product, angle between vectors, cross product, projection
 * - 2D isometric projection canvas rendering 3D coordinate system and vector arrows
 * - 12.7" tablet touch ergonomics (>= 48px hit targets, zero horizontal overflow)
 * - Academic status: HOLD (Formative Simulation Mode)
 */

import { escapeHtml } from '../../runtime/rendering.ts';
import { HIT_TARGET_MIN_PX } from '../../styles/tokens.ts';

export interface Vector3D {
  x: number;
  y: number;
  z: number;
}

export class VectorAlgebraController {
  private vA: Vector3D = { x: 3, y: 4, z: 2 };
  private vB: Vector3D = { x: 1, y: -2, z: 4 };

  getVectorA(): Vector3D {
    return { ...this.vA };
  }

  getVectorB(): Vector3D {
    return { ...this.vB };
  }

  setVectorA(v: Partial<Vector3D>): void {
    this.vA = { ...this.vA, ...v };
  }

  setVectorB(v: Partial<Vector3D>): void {
    this.vB = { ...this.vB, ...v };
  }

  magnitude(v: Vector3D): number {
    return Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z);
  }

  dotProduct(): number {
    return this.vA.x * this.vB.x + this.vA.y * this.vB.y + this.vA.z * this.vB.z;
  }

  angleDeg(): number {
    const magA = this.magnitude(this.vA);
    const magB = this.magnitude(this.vB);
    if (magA === 0 || magB === 0) return 0;
    const cosTheta = Math.max(-1, Math.min(1, this.dotProduct() / (magA * magB)));
    return (Math.acos(cosTheta) * 180) / Math.PI;
  }

  crossProduct(): Vector3D {
    return {
      x: this.vA.y * this.vB.z - this.vA.z * this.vB.y,
      y: this.vA.z * this.vB.x - this.vA.x * this.vB.z,
      z: this.vA.x * this.vB.y - this.vA.y * this.vB.x,
    };
  }

  addition(): Vector3D {
    return {
      x: this.vA.x + this.vB.x,
      y: this.vA.y + this.vB.y,
      z: this.vA.z + this.vB.z,
    };
  }

  scalarProjectionOnB(): number {
    const magB = this.magnitude(this.vB);
    return magB === 0 ? 0 : this.dotProduct() / magB;
  }
}

export function mountVectorAlgebraWorkbench(
  root: HTMLElement,
  controller?: VectorAlgebraController,
  onNavigate?: (route: string) => void
): { dispose: () => void } {
  const ctrl = controller ?? new VectorAlgebraController();
  let active = true;

  const render = () => {
    if (!active) return;
    const a = ctrl.getVectorA();
    const b = ctrl.getVectorB();
    const magA = ctrl.magnitude(a);
    const magB = ctrl.magnitude(b);
    const dot = ctrl.dotProduct();
    const angle = ctrl.angleDeg();
    const cross = ctrl.crossProduct();
    const magCross = ctrl.magnitude(cross);
    const sum = ctrl.addition();
    const proj = ctrl.scalarProjectionOnB();

    root.innerHTML = `
      <div class="vector-algebra-container" style="max-width:1400px;margin:0 auto;padding:1.5rem;box-sizing:border-box;font-family:system-ui,-apple-system,sans-serif;color:#0f172a;">
        <header style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:1rem;padding-bottom:1.25rem;border-bottom:2px solid #e2e8f0;margin-bottom:1.5rem;">
          <div>
            <div style="display:flex;gap:8px;font-size:0.9rem;color:#64748b;margin-bottom:0.25rem;">
              <a href="#/labs" style="color:#0284c7;text-decoration:none;font-weight:600;">Standalone Labs</a> &gt; 
              <span>3D Vector Algebra</span>
            </div>
            <div style="display:flex;gap:8px;align-items:center;">
              <span style="font-size:0.8rem;font-weight:800;background:#e0f2fe;color:#0369a1;padding:3px 8px;border-radius:4px;">MATHEMATICS &amp; PHYSICS WORKBENCH</span>
              <span style="font-size:0.8rem;font-weight:700;background:#fee2e2;color:#991b1b;padding:3px 8px;border-radius:4px;">Academic Status: HOLD</span>
            </div>
            <h1 style="margin:0.5rem 0 0;font-size:1.9rem;font-weight:800;color:#0f172a;">📐 3D Vector Algebra &amp; Spatial Geometry</h1>
          </div>
          <button type="button" id="btn-return-labs" style="min-height:${HIT_TARGET_MIN_PX}px;padding:8px 18px;background:#0f172a;color:white;border:none;border-radius:6px;cursor:pointer;font-weight:700;">
            ← Return to Labs Hub
          </button>
        </header>

        <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(min(100%, 360px), 1fr));gap:2rem;">
          <!-- Controls Panel -->
          <div>
            <div style="background:#ffffff;border:1px solid #cbd5e1;border-radius:12px;padding:1.5rem;margin-bottom:1.5rem;">
              <h3 style="margin:0 0 1rem;font-size:1.2rem;color:#0284c7;">Vector A Components (Cyan)</h3>
              <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;">
                <div>
                  <label for="vec-ax" style="display:block;font-size:0.85rem;font-weight:700;margin-bottom:4px;">A_x: ${a.x}</label>
                  <input type="range" id="vec-ax" min="-10" max="10" step="1" value="${a.x}" style="width:100%;min-height:${HIT_TARGET_MIN_PX}px;" />
                </div>
                <div>
                  <label for="vec-ay" style="display:block;font-size:0.85rem;font-weight:700;margin-bottom:4px;">A_y: ${a.y}</label>
                  <input type="range" id="vec-ay" min="-10" max="10" step="1" value="${a.y}" style="width:100%;min-height:${HIT_TARGET_MIN_PX}px;" />
                </div>
                <div>
                  <label for="vec-az" style="display:block;font-size:0.85rem;font-weight:700;margin-bottom:4px;">A_z: ${a.z}</label>
                  <input type="range" id="vec-az" min="-10" max="10" step="1" value="${a.z}" style="width:100%;min-height:${HIT_TARGET_MIN_PX}px;" />
                </div>
              </div>
              <div style="font-size:0.9rem;color:#64748b;margin-top:6px;">
                |A| = <strong>${magA.toFixed(2)}</strong>
              </div>
            </div>

            <div style="background:#ffffff;border:1px solid #cbd5e1;border-radius:12px;padding:1.5rem;margin-bottom:1.5rem;">
              <h3 style="margin:0 0 1rem;font-size:1.2rem;color:#ea580c;">Vector B Components (Orange)</h3>
              <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;">
                <div>
                  <label for="vec-bx" style="display:block;font-size:0.85rem;font-weight:700;margin-bottom:4px;">B_x: ${b.x}</label>
                  <input type="range" id="vec-bx" min="-10" max="10" step="1" value="${b.x}" style="width:100%;min-height:${HIT_TARGET_MIN_PX}px;" />
                </div>
                <div>
                  <label for="vec-by" style="display:block;font-size:0.85rem;font-weight:700;margin-bottom:4px;">B_y: ${b.y}</label>
                  <input type="range" id="vec-by" min="-10" max="10" step="1" value="${b.y}" style="width:100%;min-height:${HIT_TARGET_MIN_PX}px;" />
                </div>
                <div>
                  <label for="vec-bz" style="display:block;font-size:0.85rem;font-weight:700;margin-bottom:4px;">B_z: ${b.z}</label>
                  <input type="range" id="vec-bz" min="-10" max="10" step="1" value="${b.z}" style="width:100%;min-height:${HIT_TARGET_MIN_PX}px;" />
                </div>
              </div>
              <div style="font-size:0.9rem;color:#64748b;margin-top:6px;">
                |B| = <strong>${magB.toFixed(2)}</strong>
              </div>
            </div>

            <!-- Mathematical Invariants Results -->
            <div style="background:#f8fafc;border:1px solid #cbd5e1;border-radius:12px;padding:1.25rem;">
              <h4 style="margin:0 0 0.75rem;font-size:1.05rem;color:#0f172a;">Algebraic Relationships:</h4>
              <div style="display:flex;justify-content:space-between;margin-bottom:6px;font-size:0.95rem;">
                <span style="color:#64748b;">Dot Product (A · B):</span>
                <strong style="color:#0f172a;">${dot.toFixed(2)}</strong>
              </div>
              <div style="display:flex;justify-content:space-between;margin-bottom:6px;font-size:0.95rem;">
                <span style="color:#64748b;">Enclosed Angle (θ):</span>
                <strong style="color:#0284c7;">${angle.toFixed(1)}°</strong>
              </div>
              <div style="display:flex;justify-content:space-between;margin-bottom:6px;font-size:0.95rem;">
                <span style="color:#64748b;">Cross Product (A × B):</span>
                <strong style="color:#16a34a;">(${cross.x}, ${cross.y}, ${cross.z})</strong>
              </div>
              <div style="display:flex;justify-content:space-between;margin-bottom:6px;font-size:0.95rem;">
                <span style="color:#64748b;">Cross Product Magnitude |A × B|:</span>
                <strong style="color:#16a34a;">${magCross.toFixed(2)}</strong>
              </div>
              <div style="display:flex;justify-content:space-between;font-size:0.95rem;">
                <span style="color:#64748b;">Scalar Proj of A on B:</span>
                <strong style="color:#9333ea;">${proj.toFixed(2)}</strong>
              </div>
            </div>
          </div>

          <!-- 3D Isometric Canvas -->
          <div>
            <div style="background:#0f172a;border-radius:12px;padding:1.5rem;min-height:360px;display:flex;flex-direction:column;align-items:center;justify-content:center;">
              <h3 style="margin:0 0 1rem;font-size:1.1rem;color:#f8fafc;width:100%;text-align:left;">
                Isometric 3D Projection Canvas
              </h3>
              ${renderIsometricSvg(a, b, cross)}
              <div style="display:flex;gap:16px;flex-wrap:wrap;margin-top:1rem;font-size:0.85rem;color:#94a3b8;">
                <span style="display:flex;align-items:center;gap:4px;"><span style="display:inline-block;width:12px;height:12px;background:#38bdf8;border-radius:2px;"></span> Vector A</span>
                <span style="display:flex;align-items:center;gap:4px;"><span style="display:inline-block;width:12px;height:12px;background:#fb923c;border-radius:2px;"></span> Vector B</span>
                <span style="display:flex;align-items:center;gap:4px;"><span style="display:inline-block;width:12px;height:12px;background:#4ade80;border-radius:2px;"></span> Vector A × B</span>
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

    bindSlider('#vec-ax', val => ctrl.setVectorA({ x: val }));
    bindSlider('#vec-ay', val => ctrl.setVectorA({ y: val }));
    bindSlider('#vec-az', val => ctrl.setVectorA({ z: val }));
    bindSlider('#vec-bx', val => ctrl.setVectorB({ x: val }));
    bindSlider('#vec-by', val => ctrl.setVectorB({ y: val }));
    bindSlider('#vec-bz', val => ctrl.setVectorB({ z: val }));
  };

  render();

  return {
    dispose: () => {
      active = false;
      root.replaceChildren();
    },
  };
}

function project3DTo2D(x: number, y: number, z: number): { px: number; py: number } {
  // Isometric projection:
  // Origin at (250, 180)
  const originX = 250;
  const originY = 180;
  const scale = 14;
  const cos30 = Math.cos(Math.PI / 6);
  const sin30 = Math.sin(Math.PI / 6);

  const px = originX + (x - y) * cos30 * scale;
  const py = originY - z * scale + (x + y) * sin30 * scale;
  return { px, py };
}

function renderIsometricSvg(a: Vector3D, b: Vector3D, cross: Vector3D): string {
  const o = project3DTo2D(0, 0, 0);
  const xAxis = project3DTo2D(10, 0, 0);
  const yAxis = project3DTo2D(0, 10, 0);
  const zAxis = project3DTo2D(0, 0, 10);

  const ptA = project3DTo2D(a.x, a.y, a.z);
  const ptB = project3DTo2D(b.x, b.y, b.z);
  // Scale cross vector to prevent clipping
  const scaleCross = Math.min(1, 10 / Math.max(1, Math.max(Math.abs(cross.x), Math.abs(cross.y), Math.abs(cross.z))));
  const ptCross = project3DTo2D(cross.x * scaleCross, cross.y * scaleCross, cross.z * scaleCross);

  return `
    <svg viewBox="0 0 500 320" style="width:100%;height:auto;max-height:300px;">
      <!-- Grid Lines / Axes -->
      <line x1="${o.px}" y1="${o.py}" x2="${xAxis.px}" y2="${xAxis.py}" stroke="#475569" stroke-width="2" stroke-dasharray="4" />
      <line x1="${o.px}" y1="${o.py}" x2="${yAxis.px}" y2="${yAxis.py}" stroke="#475569" stroke-width="2" stroke-dasharray="4" />
      <line x1="${o.px}" y1="${o.py}" x2="${zAxis.px}" y2="${zAxis.py}" stroke="#475569" stroke-width="2" stroke-dasharray="4" />
      <text x="${xAxis.px + 8}" y="${xAxis.py + 4}" fill="#64748b" font-size="12">+X</text>
      <text x="${yAxis.px - 20}" y="${yAxis.py + 4}" fill="#64748b" font-size="12">+Y</text>
      <text x="${zAxis.px}" y="${zAxis.py - 8}" fill="#64748b" font-size="12" text-anchor="middle">+Z</text>

      <!-- Vector A (Cyan) -->
      <line x1="${o.px}" y1="${o.py}" x2="${ptA.px}" y2="${ptA.py}" stroke="#38bdf8" stroke-width="3.5" />
      <circle cx="${ptA.px}" cy="${ptA.py}" r="5" fill="#38bdf8" />
      <text x="${ptA.px + 8}" y="${ptA.py - 4}" fill="#38bdf8" font-size="13" font-weight="bold">A</text>

      <!-- Vector B (Orange) -->
      <line x1="${o.px}" y1="${o.py}" x2="${ptB.px}" y2="${ptB.py}" stroke="#fb923c" stroke-width="3.5" />
      <circle cx="${ptB.px}" cy="${ptB.py}" r="5" fill="#fb923c" />
      <text x="${ptB.px + 8}" y="${ptB.py - 4}" fill="#fb923c" font-size="13" font-weight="bold">B</text>

      <!-- Vector A x B (Green) -->
      <line x1="${o.px}" y1="${o.py}" x2="${ptCross.px}" y2="${ptCross.py}" stroke="#4ade80" stroke-width="3" stroke-dasharray="2,2" />
      <circle cx="${ptCross.px}" cy="${ptCross.py}" r="4" fill="#4ade80" />
      <text x="${ptCross.px + 8}" y="${ptCross.py - 4}" fill="#4ade80" font-size="12" font-weight="bold">A × B</text>

      <!-- Origin Node -->
      <circle cx="${o.px}" cy="${o.py}" r="4" fill="#ffffff" />
    </svg>
  `;
}
