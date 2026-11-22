/**
 * web/pages/workbenches/motion-suite.ts
 * Workpack A69 / v3.5 Parity — Motion in 1D & 2D Kinematics Master Suite
 *
 * Implements:
 * - 1D kinematics simulation: s-t, v-t, a-t relationships under constant/variable acceleration
 * - 2D projectile kinematics: angle, initial speed, trajectory y(x), flight time, maximum height, range
 * - Relative motion frame transform: v_AB = v_A - v_B
 * - 12.7" tablet touch ergonomics (>= 48px hit targets, zero horizontal overflow)
 * - Academic status: HOLD (Formative Simulation Mode)
 */

import { escapeHtml } from '../../runtime/rendering.ts';
import { HIT_TARGET_MIN_PX } from '../../styles/tokens.ts';

export interface Motion1DState {
  initialVelocity: number; // m/s
  acceleration: number;    // m/s^2
  time: number;            // s
}

export interface ProjectileState {
  initialSpeed: number;    // m/s
  launchAngleDeg: number;  // degrees
  gravity: number;         // m/s^2 (default 9.8)
}

export class MotionSuiteController {
  private activeTab: '1D' | 'PROJECTILE' | 'RELATIVE' = '1D';
  private state1D: Motion1DState = { initialVelocity: 10, acceleration: 2, time: 5 };
  private stateProj: ProjectileState = { initialSpeed: 25, launchAngleDeg: 45, gravity: 9.8 };
  private vA: number = 20; // m/s
  private vB: number = -15; // m/s

  getActiveTab(): '1D' | 'PROJECTILE' | 'RELATIVE' {
    return this.activeTab;
  }

  setActiveTab(tab: '1D' | 'PROJECTILE' | 'RELATIVE'): void {
    this.activeTab = tab;
  }

  update1D(updates: Partial<Motion1DState>): void {
    this.state1D = { ...this.state1D, ...updates };
  }

  get1DResults(): { velocity: number; displacement: number } {
    const { initialVelocity, acceleration, time } = this.state1D;
    const velocity = initialVelocity + acceleration * time;
    const displacement = initialVelocity * time + 0.5 * acceleration * time * time;
    return { velocity, displacement };
  }

  updateProjectile(updates: Partial<ProjectileState>): void {
    this.stateProj = { ...this.stateProj, ...updates };
  }

  getProjectileResults(): {
    vx: number;
    vy0: number;
    timeOfFlight: number;
    maxHeight: number;
    range: number;
  } {
    const { initialSpeed, launchAngleDeg, gravity } = this.stateProj;
    const rad = (launchAngleDeg * Math.PI) / 180;
    const vx = initialSpeed * Math.cos(rad);
    const vy0 = initialSpeed * Math.sin(rad);
    const timeOfFlight = (2 * vy0) / gravity;
    const maxHeight = (vy0 * vy0) / (2 * gravity);
    const range = vx * timeOfFlight;
    return { vx, vy0, timeOfFlight, maxHeight, range };
  }

  updateRelative(vA: number, vB: number): void {
    this.vA = vA;
    this.vB = vB;
  }

  getRelativeResults(): { vAB: number; vBA: number } {
    return {
      vAB: this.vA - this.vB,
      vBA: this.vB - this.vA,
    };
  }

  getState1D(): Motion1DState {
    return { ...this.state1D };
  }

  getStateProj(): ProjectileState {
    return { ...this.stateProj };
  }

  getRelativeVelocities(): { vA: number; vB: number } {
    return { vA: this.vA, vB: this.vB };
  }
}

export function mountMotionSuite(
  root: HTMLElement,
  controller?: MotionSuiteController,
  onNavigate?: (route: string) => void
): { dispose: () => void } {
  const ctrl = controller ?? new MotionSuiteController();
  let active = true;

  const render = () => {
    if (!active) return;
    const tab = ctrl.getActiveTab();

    root.innerHTML = `
      <div class="motion-suite-container" style="max-width:1400px;margin:0 auto;padding:1.5rem;box-sizing:border-box;font-family:var(--g9-font-family, system-ui,-apple-system,sans-serif);color:#0f172a;">
        <header style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:1rem;padding-bottom:1.25rem;border-bottom:2px solid #e2e8f0;margin-bottom:1.5rem;">
          <div>
            <div style="display:flex;gap:8px;font-size:0.9rem;color:#64748b;margin-bottom:0.25rem;">
              <a href="#/labs" style="color:#0284c7;text-decoration:none;font-weight:600;">Standalone Labs</a> &gt; 
              <span>Motion in 1D &amp; 2D Suite</span>
            </div>
            <div style="display:flex;gap:8px;align-items:center;">
              <span style="font-size:0.875rem;font-weight:800;background:#e0f2fe;color:#0369a1;padding:3px 8px;border-radius:4px;">PHYSICS WORKBENCH</span>
              <span style="font-size:0.875rem;font-weight:700;background:#fee2e2;color:#991b1b;padding:3px 8px;border-radius:4px;">Academic Status: HOLD</span>
            </div>
            <h1 style="margin:0.5rem 0 0;font-size:1.9rem;font-weight:800;color:#0f172a;">🚀 Motion in 1D &amp; 2D Kinematics Master Suite</h1>
          </div>
          <button type="button" id="btn-return-labs" style="min-height:${HIT_TARGET_MIN_PX}px;padding:8px 18px;background:#0f172a;color:white;border:none;border-radius:6px;cursor:pointer;font-weight:700;">
            ← Return to Labs Hub
          </button>
        </header>

        <!-- Navigation Tabs -->
        <div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:1.5rem;">
          <button type="button" class="tab-btn ${tab === '1D' ? 'active' : ''}" data-tab="1D" style="min-height:${HIT_TARGET_MIN_PX}px;padding:10px 20px;border-radius:8px;font-weight:700;cursor:pointer;background:${tab === '1D' ? '#0284c7' : '#f1f5f9'};color:${tab === '1D' ? 'white' : '#475569'};border:1px solid ${tab === '1D' ? '#0284c7' : '#cbd5e1'};">
            1. 1D Constant Acceleration
          </button>
          <button type="button" class="tab-btn ${tab === 'PROJECTILE' ? 'active' : ''}" data-tab="PROJECTILE" style="min-height:${HIT_TARGET_MIN_PX}px;padding:10px 20px;border-radius:8px;font-weight:700;cursor:pointer;background:${tab === 'PROJECTILE' ? '#0284c7' : '#f1f5f9'};color:${tab === 'PROJECTILE' ? 'white' : '#475569'};border:1px solid ${tab === 'PROJECTILE' ? '#0284c7' : '#cbd5e1'};">
            2. 2D Projectile Motion
          </button>
          <button type="button" class="tab-btn ${tab === 'RELATIVE' ? 'active' : ''}" data-tab="RELATIVE" style="min-height:${HIT_TARGET_MIN_PX}px;padding:10px 20px;border-radius:8px;font-weight:700;cursor:pointer;background:${tab === 'RELATIVE' ? '#0284c7' : '#f1f5f9'};color:${tab === 'RELATIVE' ? 'white' : '#475569'};border:1px solid ${tab === 'RELATIVE' ? '#0284c7' : '#cbd5e1'};">
            3. Relative Motion Frames
          </button>
        </div>

        <!-- Tab Content -->
        <div style="background:#ffffff;border:1px solid #cbd5e1;border-radius:12px;padding:1.5rem;box-shadow:0 1px 3px rgba(0,0,0,0.05);">
          ${tab === '1D' ? render1DTab(ctrl) : tab === 'PROJECTILE' ? renderProjectileTab(ctrl) : renderRelativeTab(ctrl)}
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

    root.querySelectorAll<HTMLButtonElement>('.tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const t = btn.dataset.tab as any;
        if (t) {
          ctrl.setActiveTab(t);
          render();
        }
      });
    });

    // 1D Controls
    const uInput = root.querySelector<HTMLInputElement>('#input-1d-u');
    const aInput = root.querySelector<HTMLInputElement>('#input-1d-a');
    const tInput = root.querySelector<HTMLInputElement>('#input-1d-t');
    if (uInput && aInput && tInput) {
      const update = () => {
        ctrl.update1D({
          initialVelocity: parseFloat(uInput.value) || 0,
          acceleration: parseFloat(aInput.value) || 0,
          time: Math.max(0, parseFloat(tInput.value) || 0),
        });
        render();
      };
      uInput.addEventListener('input', update);
      aInput.addEventListener('input', update);
      tInput.addEventListener('input', update);
    }

    // Projectile Controls
    const speedInput = root.querySelector<HTMLInputElement>('#input-proj-speed');
    const angleInput = root.querySelector<HTMLInputElement>('#input-proj-angle');
    if (speedInput && angleInput) {
      const updateProj = () => {
        ctrl.updateProjectile({
          initialSpeed: Math.max(1, parseFloat(speedInput.value) || 1),
          launchAngleDeg: Math.min(90, Math.max(0, parseFloat(angleInput.value) || 0)),
        });
        render();
      };
      speedInput.addEventListener('input', updateProj);
      angleInput.addEventListener('input', updateProj);
    }

    // Relative Controls
    const vaInput = root.querySelector<HTMLInputElement>('#input-rel-va');
    const vbInput = root.querySelector<HTMLInputElement>('#input-rel-vb');
    if (vaInput && vbInput) {
      const updateRel = () => {
        ctrl.updateRelative(parseFloat(vaInput.value) || 0, parseFloat(vbInput.value) || 0);
        render();
      };
      vaInput.addEventListener('input', updateRel);
      vbInput.addEventListener('input', updateRel);
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

function render1DTab(ctrl: MotionSuiteController): string {
  const s = ctrl.getState1D();
  const res = ctrl.get1DResults();

  return `
    <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(min(100%, 360px), 1fr));gap:2rem;">
      <div>
        <h3 style="margin:0 0 1rem;font-size:1.3rem;color:#0f172a;">Kinematic Parameters</h3>
        <p style="color:#64748b;font-size:0.95rem;margin-bottom:1.5rem;">
          Configure linear motion equations: <code>v = u + at</code> and <code>s = ut + ½at²</code>.
        </p>

        <div style="margin-bottom:1.25rem;">
          <label for="input-1d-u" style="display:block;font-weight:700;margin-bottom:6px;font-size:0.95rem;">
            Initial Velocity u (m/s): <span style="color:#0284c7;">${s.initialVelocity}</span>
          </label>
          <input type="range" id="input-1d-u" min="-50" max="50" step="1" value="${s.initialVelocity}" style="width:100%;min-height:${HIT_TARGET_MIN_PX}px;" />
        </div>

        <div style="margin-bottom:1.25rem;">
          <label for="input-1d-a" style="display:block;font-weight:700;margin-bottom:6px;font-size:0.95rem;">
            Acceleration a (m/s²): <span style="color:#0284c7;">${s.acceleration}</span>
          </label>
          <input type="range" id="input-1d-a" min="-20" max="20" step="0.5" value="${s.acceleration}" style="width:100%;min-height:${HIT_TARGET_MIN_PX}px;" />
        </div>

        <div style="margin-bottom:1.5rem;">
          <label for="input-1d-t" style="display:block;font-weight:700;margin-bottom:6px;font-size:0.95rem;">
            Elapsed Time t (s): <span style="color:#0284c7;">${s.time}</span>
          </label>
          <input type="range" id="input-1d-t" min="0" max="20" step="0.5" value="${s.time}" style="width:100%;min-height:${HIT_TARGET_MIN_PX}px;" />
        </div>

        <div style="background:#f8fafc;border:1px solid #cbd5e1;border-radius:8px;padding:1rem;">
          <div style="font-weight:700;color:#0f172a;margin-bottom:6px;">Calculated State at t = ${s.time}s:</div>
          <div style="display:flex;justify-content:space-between;margin-bottom:4px;">
            <span style="color:#64748b;">Instantaneous Velocity v:</span>
            <strong style="color:#0284c7;">${res.velocity.toFixed(2)} m/s</strong>
          </div>
          <div style="display:flex;justify-content:space-between;">
            <span style="color:#64748b;">Total Displacement s:</span>
            <strong style="color:#059669;">${res.displacement.toFixed(2)} m</strong>
          </div>
        </div>
      </div>

      <div>
        <h3 style="margin:0 0 1rem;font-size:1.3rem;color:#0f172a;">Dynamic Position Diagram</h3>
        <div style="background:#0f172a;border-radius:8px;padding:1rem;color:white;min-height:220px;display:flex;flex-direction:column;justify-content:center;align-items:center;">
          <svg viewBox="0 0 500 160" style="width:100%;height:auto;max-height:160px;">
            <!-- Coordinate Track -->
            <line x1="40" y1="100" x2="460" y2="100" stroke="#475569" stroke-width="3" />
            <line x1="250" y1="90" x2="250" y2="110" stroke="#94a3b8" stroke-width="2" />
            <text x="250" y="130" fill="#94a3b8" font-size="14" text-anchor="middle">Origin (s = 0)</text>

            <!-- Object Marker -->
            ${(() => {
              const cx = Math.min(450, Math.max(50, 250 + res.displacement * 1.5));
              return `
                <circle cx="${cx}" cy="100" r="14" fill="#38bdf8" stroke="#ffffff" stroke-width="2" />
                <line x1="${cx}" y1="100" x2="${cx + res.velocity * 1.5}" y2="100" stroke="#f43f5e" stroke-width="3" marker-end="url(#arrow)" />
                <text x="${cx}" y="70" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">s = ${res.displacement.toFixed(1)}m</text>
              `;
            })()}
          </svg>
          <div style="font-size:0.875rem;color:#94a3b8;margin-top:8px;">
            Red vector represents velocity arrow <span style="color:#f43f5e;">v = ${res.velocity.toFixed(1)} m/s</span>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderProjectileTab(ctrl: MotionSuiteController): string {
  const p = ctrl.getStateProj();
  const res = ctrl.getProjectileResults();

  // Generate SVG path for trajectory
  const points: string[] = [];
  const dt = res.timeOfFlight / 30;
  for (let i = 0; i <= 30; i++) {
    const t = i * dt;
    const x = res.vx * t;
    const y = res.vy0 * t - 0.5 * p.gravity * t * t;
    const scaleX = 400 / Math.max(1, res.range);
    const scaleY = 140 / Math.max(1, res.maxHeight);
    const px = 50 + x * scaleX;
    const py = 180 - y * scaleY;
    points.push(`${px.toFixed(1)},${py.toFixed(1)}`);
  }

  return `
    <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(min(100%, 360px), 1fr));gap:2rem;">
      <div>
        <h3 style="margin:0 0 1rem;font-size:1.3rem;color:#0f172a;">Launch Parameters</h3>
        <p style="color:#64748b;font-size:0.95rem;margin-bottom:1.5rem;">
          2D Kinematic Decomposition: <code>v_x = u cos(θ)</code>, <code>v_y = u sin(θ) - gt</code>.
        </p>

        <div style="margin-bottom:1.25rem;">
          <label for="input-proj-speed" style="display:block;font-weight:700;margin-bottom:6px;font-size:0.95rem;">
            Initial Launch Speed u (m/s): <span style="color:#0284c7;">${p.initialSpeed}</span>
          </label>
          <input type="range" id="input-proj-speed" min="5" max="50" step="1" value="${p.initialSpeed}" style="width:100%;min-height:${HIT_TARGET_MIN_PX}px;" />
        </div>

        <div style="margin-bottom:1.5rem;">
          <label for="input-proj-angle" style="display:block;font-weight:700;margin-bottom:6px;font-size:0.95rem;">
            Launch Angle θ (degrees): <span style="color:#0284c7;">${p.launchAngleDeg}°</span>
          </label>
          <input type="range" id="input-proj-angle" min="5" max="85" step="1" value="${p.launchAngleDeg}" style="width:100%;min-height:${HIT_TARGET_MIN_PX}px;" />
        </div>

        <div style="background:#f8fafc;border:1px solid #cbd5e1;border-radius:8px;padding:1rem;">
          <div style="font-weight:700;color:#0f172a;margin-bottom:6px;">Trajectory Key Invariants:</div>
          <div style="display:flex;justify-content:space-between;margin-bottom:4px;">
            <span style="color:#64748b;">Time of Flight T:</span>
            <strong style="color:#0284c7;">${res.timeOfFlight.toFixed(2)} s</strong>
          </div>
          <div style="display:flex;justify-content:space-between;margin-bottom:4px;">
            <span style="color:#64748b;">Maximum Height H_max:</span>
            <strong style="color:#059669;">${res.maxHeight.toFixed(2)} m</strong>
          </div>
          <div style="display:flex;justify-content:space-between;">
            <span style="color:#64748b;">Horizontal Range R:</span>
            <strong style="color:#d97706;">${res.range.toFixed(2)} m</strong>
          </div>
        </div>
      </div>

      <div>
        <h3 style="margin:0 0 1rem;font-size:1.3rem;color:#0f172a;">2D Parabolic Path Visualization</h3>
        <div style="background:#0f172a;border-radius:8px;padding:1rem;min-height:220px;">
          <svg viewBox="0 0 500 220" style="width:100%;height:auto;max-height:220px;">
            <!-- Axes -->
            <line x1="50" y1="180" x2="470" y2="180" stroke="#475569" stroke-width="2" />
            <line x1="50" y1="20" x2="50" y2="180" stroke="#475569" stroke-width="2" />
            <text x="470" y="200" fill="#94a3b8" font-size="14" text-anchor="end">x (Range)</text>
            <text x="30" y="30" fill="#94a3b8" font-size="14">y (Height)</text>

            <!-- Parabolic Trajectory -->
            <polyline fill="none" stroke="#38bdf8" stroke-width="3" points="${points.join(' ')}" />

            <!-- Launch Vector -->
            ${(() => {
              const rad = (p.launchAngleDeg * Math.PI) / 180;
              const vx = 50 + Math.cos(rad) * 45;
              const vy = 180 - Math.sin(rad) * 45;
              return `<line x1="50" y1="180" x2="${vx}" y2="${vy}" stroke="#f43f5e" stroke-width="3" />`;
            })()}
          </svg>
          <div style="font-size:0.875rem;color:#94a3b8;margin-top:8px;text-align:center;">
            Simulated in gravity g = ${p.gravity} m/s². Air resistance neglected.
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderRelativeTab(ctrl: MotionSuiteController): string {
  const v = ctrl.getRelativeVelocities();
  const res = ctrl.getRelativeResults();

  return `
    <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(min(100%, 360px), 1fr));gap:2rem;">
      <div>
        <h3 style="margin:0 0 1rem;font-size:1.3rem;color:#0f172a;">Reference Frame Parameters</h3>
        <p style="color:#64748b;font-size:0.95rem;margin-bottom:1.5rem;">
          Galilean relativity in one dimension: <code>v_{AB} = v_A - v_B</code>.
        </p>

        <div style="margin-bottom:1.25rem;">
          <label for="input-rel-va" style="display:block;font-weight:700;margin-bottom:6px;font-size:0.95rem;">
            Velocity of Object A v_A (m/s): <span style="color:#0284c7;">${v.vA}</span>
          </label>
          <input type="range" id="input-rel-va" min="-40" max="40" step="1" value="${v.vA}" style="width:100%;min-height:${HIT_TARGET_MIN_PX}px;" />
        </div>

        <div style="margin-bottom:1.5rem;">
          <label for="input-rel-vb" style="display:block;font-weight:700;margin-bottom:6px;font-size:0.95rem;">
            Velocity of Object B v_B (m/s): <span style="color:#0284c7;">${v.vB}</span>
          </label>
          <input type="range" id="input-rel-vb" min="-40" max="40" step="1" value="${v.vB}" style="width:100%;min-height:${HIT_TARGET_MIN_PX}px;" />
        </div>

        <div style="background:#f8fafc;border:1px solid #cbd5e1;border-radius:8px;padding:1rem;">
          <div style="font-weight:700;color:#0f172a;margin-bottom:6px;">Relative Velocities:</div>
          <div style="display:flex;justify-content:space-between;margin-bottom:4px;">
            <span style="color:#64748b;">Velocity of A relative to B (v_AB):</span>
            <strong style="color:#0284c7;">${res.vAB.toFixed(1)} m/s</strong>
          </div>
          <div style="display:flex;justify-content:space-between;">
            <span style="color:#64748b;">Velocity of B relative to A (v_BA):</span>
            <strong style="color:#7c3aed;">${res.vBA.toFixed(1)} m/s</strong>
          </div>
        </div>
      </div>

      <div>
        <h3 style="margin:0 0 1rem;font-size:1.3rem;color:#0f172a;">Frame Diagram</h3>
        <div style="background:#0f172a;border-radius:8px;padding:1.5rem;color:white;min-height:220px;display:flex;flex-direction:column;justify-content:center;">
          <div style="margin-bottom:1.5rem;">
            <div style="font-size:0.9rem;color:#38bdf8;margin-bottom:4px;">Object A: v_A = ${v.vA} m/s</div>
            <div style="height:8px;background:#334155;border-radius:4px;position:relative;">
              <div style="position:absolute;left:50%;width:16px;height:16px;border-radius:50%;background:#38bdf8;top:-4px;transform:translateX(-50%);"></div>
            </div>
          </div>
          <div style="margin-bottom:1.5rem;">
            <div style="font-size:0.9rem;color:#f43f5e;margin-bottom:4px;">Object B: v_B = ${v.vB} m/s</div>
            <div style="height:8px;background:#334155;border-radius:4px;position:relative;">
              <div style="position:absolute;left:50%;width:16px;height:16px;border-radius:50%;background:#f43f5e;top:-4px;transform:translateX(-50%);"></div>
            </div>
          </div>
          <div style="padding:10px;background:#1e293b;border-radius:6px;font-size:0.9rem;">
            Observer on B sees A approaching / departing at <strong>${Math.abs(res.vAB).toFixed(1)} m/s</strong> in direction <strong>${res.vAB >= 0 ? '+x' : '-x'}</strong>.
          </div>
        </div>
      </div>
    </div>
  `;
}
