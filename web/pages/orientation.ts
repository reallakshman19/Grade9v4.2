/**
 * web/pages/orientation.ts
 * Core 1 — Reading Orientation Workspace Page Controller & Renderer.
 *
 * Implements:
 * - Native blueprint BP-CORE1-ORIENTATION@1.1.0
 * - Layout mode: READING_ORIENTATION
 * - Slots: ['identity', 'orientation']
 *   - Slot 'identity' (2 blocks): ['identity_scope', 'learner_metadata']
 *   - Slot 'orientation' (7 blocks):
 *     ['objects_conventions', 'canonical_representation', 'governing_relations',
 *      'compact_anchor', 'hard_transition_map', 'exclusions_extensions', 'orientation_closure']
 * - 12.7" Tablet touch ergonomics (48px min, 56px primary, 17px body text)
 * - Safe bidirectional return navigation
 *
 * No academic approval inferred from software validation.
 */

import { escapeHtml } from '../runtime/rendering.ts';
import { HIT_TARGET_MIN_PX, HIT_TARGET_PRIMARY_PX } from '../styles/tokens.ts';
import {
  CORE1_ORIENTATION_BLUEPRINT_ID,
  type Core1OrientationProjection,
  type OrientationBlock,
} from '../journeys/core1.ts';
import type { Ref } from '../runtime/types.ts';

export type DisplayOrientation = 'LANDSCAPE' | 'PORTRAIT';
export type OrientationScreenState = 'loading' | 'error' | 'populated' | 'unreviewed';

export interface OrientationPageConfig {
  readonly projection?: Core1OrientationProjection;
  readonly orientation?: DisplayOrientation;
  readonly returnRoute?: string;
  readonly initialState?: OrientationScreenState;
  readonly errorMessage?: string;
}

const mockRef = <T extends Ref['type']>(type: T, id: string): Ref<T> => ({
  type,
  id,
  revision: 1,
  sha256: 'a'.repeat(64),
});

export function createDefaultWpeOrientationProjection(): Core1OrientationProjection {
  return {
    blueprint: CORE1_ORIENTATION_BLUEPRINT_ID,
    source: mockRef('PRESENTATION', 'presentation:physics-wpe-orientation'),
    topicId: 'topic:wpe',
    blocks: {
      identity_scope: 'Work, Power, and Energy: Fundamental Mechanical Relations & Reference Conventions.',
      learner_metadata: 'Grade 9 Foundation · Core 1 Reading Orientation · Diagnostic Status: HOLD',
      objects_conventions: 'Conventions: 1D motion along x-axis. Rightward displacement (+x) is positive. Force vectors projected along displacement direction. Reference ground state U(0) = 0 J.',
      canonical_representation: 'Representations: Free-body diagram (FBD) with applied, gravitational, and frictional vectors. Analytical potential well curve U(x) = 1/2 k x² with kinetic energy trade-off.',
      governing_relations: 'Governing Relations: Mechanical work W = ∫ F · dr = F d cos(θ). Work-Energy Theorem: W_net = ΔK. Conservation of Mechanical Energy: ΔE_mech = W_nc.',
      compact_anchor: 'Compact Anchor: Total mechanical energy E = K + U remains strictly constant in closed conservative systems. Non-conservative work directly quantifies thermal/frictional dissipation.',
      hard_transition_map: 'Transition Map: Static equilibrium → Constant net force dynamics → Conservative spring/gravity exchange → Non-conservative dissipative pathways.',
      exclusions_extensions: 'Exclusions: Relativistic speeds (v << c) and quantum limits excluded. Mass m is assumed invariant. Air resistance modeled as quadratic perturbation in Core 2B only.',
      orientation_closure: 'Orientation Closure: You have completed the foundational orientation. Proceed to Core 1A for 9-unit progressive concept construction.',
    },
  };
}

export class Core1OrientationPageController {
  private projection: Core1OrientationProjection | null = null;
  private orientation: DisplayOrientation = 'LANDSCAPE';
  private state: OrientationScreenState = 'loading';
  private error = '';
  private returnRoute = '#/subject/physics/topic/wpe/learn-try';

  constructor(config: OrientationPageConfig = {}) {
    this.setOrientation(config.orientation ?? 'LANDSCAPE');
    this.returnRoute = config.returnRoute ?? '#/subject/physics/topic/wpe/learn-try';
    const proj = config.projection ?? createDefaultWpeOrientationProjection();
    if (proj) {
      this.projection = proj;
      this.state = config.initialState ?? 'populated';
    } else {
      this.state = config.initialState ?? 'loading';
      this.error = config.errorMessage ?? '';
    }
  }

  setOrientation(o: DisplayOrientation): void {
    if (!['LANDSCAPE', 'PORTRAIT'].includes(o)) throw new Error('Invalid orientation');
    this.orientation = o;
  }

  getOrientation(): DisplayOrientation {
    return this.orientation;
  }

  getProjection(): Core1OrientationProjection | null {
    return this.projection;
  }

  getReturnRoute(): string {
    return this.returnRoute;
  }

  getViewState() {
    return {
      screenState: this.state,
      orientation: this.orientation,
      projection: this.projection,
      error: this.error,
      returnRoute: this.returnRoute,
      minHitTargetPx: HIT_TARGET_MIN_PX,
      primaryHitTargetPx: HIT_TARGET_PRIMARY_PX,
    };
  }

  render(): string {
    const s = this.getViewState();
    const p = s.projection;

    if (s.screenState === 'loading') {
      return `
        <div class="g9-orientation-loading" style="padding:2rem;text-align:center;font-size:17px;color:#475569;">
          <p>Loading orientation workspace...</p>
        </div>
      `;
    }

    if (s.screenState === 'error' || !p) {
      return `
        <div class="g9-orientation-error" style="padding:2rem;background:#fef2f2;border:1px solid #f87171;border-radius:8px;color:#991b1b;font-size:17px;">
          <h2>Orientation Unavailable</h2>
          <p>${escapeHtml(s.error || 'Failed to load authorized orientation projection.')}</p>
          <button type="button" data-action="return-origin" style="min-height:${HIT_TARGET_MIN_PX}px;padding:8px 16px;background:#991b1b;color:white;border:none;border-radius:6px;cursor:pointer;font-weight:700;">← Return</button>
        </div>
      `;
    }

    const b = p.blocks;

    return `
      <main class="g9-orientation-page" data-role="CORE1" data-orientation="${s.orientation}" style="display:flex;flex-direction:column;gap:1.5rem;font-family:system-ui,-apple-system,sans-serif;font-size:17px;line-height:1.6;color:#0f172a;max-width:100%;box-sizing:border-box;">
        
        <!-- Slot: identity (full width) -->
        <section data-slot="identity" style="background:#f8fafc;border:1px solid #cbd5e1;border-radius:8px;padding:1.5rem;">
          <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:12px;margin-bottom:0.75rem;">
            <div>
              <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;">
                <span style="font-size:0.875rem;font-weight:800;color:#0284c7;background:#e0f2fe;padding:2px 8px;border-radius:4px;">CORE1</span>
                <span style="font-size:0.875rem;font-weight:700;color:#b45309;background:#fef3c7;padding:2px 8px;border-radius:4px;">DIAGNOSTIC (HOLD)</span>
                <span style="font-size:0.875rem;color:#64748b;">BP-CORE1-ORIENTATION@1.1.0</span>
              </div>
              <h1 style="margin:0;font-size:1.85rem;font-weight:800;color:#0f172a;">Reading Orientation Workspace</h1>
            </div>
            <button type="button" data-action="return-origin" style="min-height:${HIT_TARGET_MIN_PX}px;padding:10px 18px;background:#ffffff;border:1px solid #cbd5e1;border-radius:6px;cursor:pointer;font-weight:700;font-size:0.95rem;color:#0f172a;">← Return to Topic Hub</button>
          </div>
          <p style="margin:0 0 0.5rem;color:#334155;font-weight:600;">${escapeHtml(b.identity_scope)}</p>
          <p style="margin:0;font-size:0.95rem;color:#64748b;">${escapeHtml(b.learner_metadata)}</p>
        </section>

        <!-- Slot: orientation (7 accepted blocks) -->
        <section data-slot="orientation" style="display:flex;flex-direction:column;gap:1.25rem;">
          
          <!-- Block 1: Objects & Conventions -->
          <article class="g9-orientation-card" data-block="objects_conventions" style="background:#ffffff;border:1px solid #e2e8f0;border-radius:8px;padding:1.5rem;box-shadow:0 1px 3px rgba(0,0,0,0.05);">
            <h2 style="margin:0 0 0.75rem;font-size:1.3rem;font-weight:700;color:#0369a1;">1. Coordinate Conventions &amp; Reference Frames</h2>
            <p style="margin:0;color:#334155;">${escapeHtml(b.objects_conventions)}</p>
          </article>

          <!-- Block 2: Canonical Representation -->
          <article class="g9-orientation-card" data-block="canonical_representation" style="background:#ffffff;border:1px solid #e2e8f0;border-radius:8px;padding:1.5rem;box-shadow:0 1px 3px rgba(0,0,0,0.05);">
            <h2 style="margin:0 0 0.75rem;font-size:1.3rem;font-weight:700;color:#0369a1;">2. Canonical Representation &amp; Mathematical Bridge</h2>
            <p style="margin:0;color:#334155;">${escapeHtml(b.canonical_representation)}</p>
          </article>

          <!-- Block 3: Governing Relations -->
          <article class="g9-orientation-card" data-block="governing_relations" style="background:#ffffff;border:1px solid #e2e8f0;border-radius:8px;padding:1.5rem;box-shadow:0 1px 3px rgba(0,0,0,0.05);">
            <h2 style="margin:0 0 0.75rem;font-size:1.3rem;font-weight:700;color:#0369a1;">3. Governing Physical Relations &amp; Invariants</h2>
            <div style="background:#f1f5f9;border-left:4px solid #0284c7;padding:1rem 1.25rem;border-radius:0 6px 6px 0;margin-bottom:0.5rem;font-family:monospace;font-size:1.05rem;">
              ${escapeHtml(b.governing_relations)}
            </div>
          </article>

          <!-- Block 4: Compact Anchor Summary -->
          <article class="g9-orientation-card" data-block="compact_anchor" style="background:#ffffff;border:1px solid #e2e8f0;border-radius:8px;padding:1.5rem;box-shadow:0 1px 3px rgba(0,0,0,0.05);">
            <h2 style="margin:0 0 0.75rem;font-size:1.3rem;font-weight:700;color:#0369a1;">4. Compact Anchor Invariant Summary</h2>
            <p style="margin:0;color:#334155;">${escapeHtml(b.compact_anchor)}</p>
          </article>

          <!-- Block 5: Hard Transition Map -->
          <article class="g9-orientation-card" data-block="hard_transition_map" style="background:#ffffff;border:1px solid #e2e8f0;border-radius:8px;padding:1.5rem;box-shadow:0 1px 3px rgba(0,0,0,0.05);">
            <h2 style="margin:0 0 0.75rem;font-size:1.3rem;font-weight:700;color:#0369a1;">5. Hard Transition Map &amp; Condition Boundaries</h2>
            <p style="margin:0;color:#334155;">${escapeHtml(b.hard_transition_map)}</p>
          </article>

          <!-- Block 6: Exclusions & Extensions -->
          <article class="g9-orientation-card" data-block="exclusions_extensions" style="background:#ffffff;border:1px solid #e2e8f0;border-radius:8px;padding:1.5rem;box-shadow:0 1px 3px rgba(0,0,0,0.05);">
            <h2 style="margin:0 0 0.75rem;font-size:1.3rem;font-weight:700;color:#0369a1;">6. Domain Boundaries &amp; Approximation Exclusions</h2>
            <p style="margin:0;color:#334155;">${escapeHtml(b.exclusions_extensions)}</p>
          </article>

          <!-- Block 7: Orientation Closure -->
          <article class="g9-orientation-card" data-block="orientation_closure" style="background:#f0fdf4;border:1px solid #86efac;border-radius:8px;padding:1.5rem;box-shadow:0 1px 3px rgba(0,0,0,0.05);">
            <h2 style="margin:0 0 0.75rem;font-size:1.3rem;font-weight:700;color:#166534;">7. Orientation Closure &amp; Learning Readiness</h2>
            <p style="margin:0 0 1.25rem;color:#166534;">${escapeHtml(b.orientation_closure)}</p>
            <div style="display:flex;gap:12px;flex-wrap:wrap;">
              <button type="button" data-action="advance-core1a" style="min-height:${HIT_TARGET_PRIMARY_PX}px;padding:12px 24px;background:#0284c7;color:white;border:none;border-radius:8px;cursor:pointer;font-weight:700;font-size:1rem;">Launch Core 1A: Concept Construction →</button>
            </div>
          </article>

        </section>
      </main>
    `;
  }
}

export function mountCore1Orientation(
  root: HTMLElement,
  controller: Core1OrientationPageController,
  onNavigate?: (route: string) => void
): { dispose: () => void; refresh: () => void } {
  let active = true;

  const render = () => {
    if (!active) return;
    root.innerHTML = controller.render();

    const returnBtn = root.querySelector<HTMLButtonElement>('button[data-action="return-origin"]');
    if (returnBtn) {
      returnBtn.addEventListener('click', () => {
        const route = controller.getReturnRoute();
        if (onNavigate) {
          onNavigate(route);
        } else if (typeof window !== 'undefined') {
          window.location.hash = route.startsWith('#') ? route : '#' + route;
        }
      });
    }

    const advanceBtn = root.querySelector<HTMLButtonElement>('button[data-action="advance-core1a"]');
    if (advanceBtn) {
      advanceBtn.addEventListener('click', () => {
        const route = '#/subject/physics/topic/wpe/learn-try?role=CORE1A';
        if (onNavigate) {
          onNavigate(route);
        } else if (typeof window !== 'undefined') {
          window.location.hash = route;
        }
      });
    }
  };

  render();

  return {
    dispose: () => {
      active = false;
      root.innerHTML = '';
    },
    refresh: () => {
      render();
    },
  };
}
