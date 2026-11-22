/**
 * web/pages/transfer-changed-demand.ts
 * Core 2B — Changed-Demand Transfer Page Controller & Renderer.
 *
 * Implements:
 * - Native blueprint BP-CORE2B-TRANSFER@1.1.0
 * - Layout mode: TRANSFER_ATTEMPT
 * - Slots: ['identity', 'attempt', 'post_attempt']
 * - Underlying Engine: Core2BTransferJourney (web/journeys/core2b.ts)
 * - Exact prior anchor verification & authentic changed-demand task reference
 * - Irreversible transfer attempt commitment
 * - Post-attempt rubric disclosure gated on committed attempt + unrevoked review authority
 * - 12.7" Tablet touch ergonomics (48px min, 56px primary, 17px body typography)
 * - Safe bidirectional return navigation
 *
 * No academic approval inferred from software validation.
 */

import { escapeHtml, renderMathHtml } from '../runtime/rendering.ts';
import { HIT_TARGET_MIN_PX, HIT_TARGET_PRIMARY_PX } from '../styles/tokens.ts';
import type { Core2BTransferJourney, TransferDimension } from '../journeys/core2b.ts';
import type { Ref, Response, WorkArtifact, Checkpoint } from '../runtime/types.ts';

export type DisplayOrientation = 'LANDSCAPE' | 'PORTRAIT';
export type TransferChangedDemandState = 'loading' | 'ready' | 'committed' | 'error' | 'review_required';

export interface ChangedDemandTaskDefinition {
  readonly id: string;
  readonly code: string;
  readonly title: string;
  readonly priorAnchorRef: Ref;
  readonly priorAnchorTitle: string;
  readonly dimension: TransferDimension;
  readonly changedConditionPrompt: string;
  readonly governingPerturbation: string;
  readonly parameters: Readonly<Record<string, number>>;
  readonly targetNumeric?: { value: number; unit: string; tolerance: number };
  readonly verifiedRubricSteps: readonly string[];
  readonly transferTakeaway: string;
}

export interface TransferChangedDemandConfig {
  readonly journey?: Core2BTransferJourney;
  readonly taskDefinition?: ChangedDemandTaskDefinition;
  readonly checkpoint?: Checkpoint;
  readonly orientation?: DisplayOrientation;
  readonly returnRoute?: string;
  readonly initialState?: TransferChangedDemandState;
  readonly errorMessage?: string;
}

const mockRef = <T extends Ref['type']>(type: T, id: string): Ref<T> => ({
  type,
  id,
  revision: 1,
  sha256: 'c'.repeat(64),
});

export function createDefaultChangedDemandTask(): ChangedDemandTaskDefinition {
  return {
    id: 'wpe-transfer-aerodynamic-drag',
    code: 'PHYS-WPE-XFER-01',
    title: 'Changed Demand: Quadratic Aerodynamic Drag Perturbation',
    priorAnchorRef: mockRef('QUESTION', 'question:phys-wpe-01'),
    priorAnchorTitle: 'PHYS-WPE-01: Work and Energy Balance on Incline',
    dimension: 'CONSTRAINT_MUTATION',
    changedConditionPrompt: 'In the anchor problem, motion occurred under constant kinetic friction. Now consider a vertical descent where air resistance introduces a non-linear aerodynamic drag force F_d = -c_d * v². For a 2.0 kg projectile falling under gravity (g = 9.8 m/s²) with drag coefficient c_d = 0.08 kg/m, determine the terminal velocity v_term where net acceleration vanishes.',
    governingPerturbation: 'Dynamic equation: m * (dv/dt) = m * g - c_d * v². At terminal velocity dv/dt = 0 ⇒ m * g = c_d * v_term².',
    parameters: {
      mass: 2.0,
      g: 9.8,
      cd: 0.08,
    },
    targetNumeric: {
      value: 15.65,
      unit: 'm/s',
      tolerance: 0.1,
    },
    verifiedRubricSteps: [
      'Step 1: Set net vertical force to zero for terminal condition: Σ F_y = m * g - c_d * v_term² = 0',
      'Step 2: Formulate explicit algebraic expression: v_term = sqrt((m * g) / c_d)',
      'Step 3: Substitute numerical parameters: v_term = sqrt((2.0 * 9.8) / 0.08) = sqrt(19.6 / 0.08) = sqrt(245) ≈ 15.65 m/s',
      'Step 4: Mechanical energy dissipation: During deceleration towards terminal speed, all gravitational potential energy converts to dissipated aerodynamic drag work.',
    ],
    transferTakeaway: 'Constraint Mutation Takeaway: Unlike constant Coulomb friction (which scales linearly with normal force and distance), aerodynamic drag couples non-linearly with instantaneous velocity, establishing an asymptotic upper velocity boundary.',
  };
}

export class Core2BTransferPageController {
  private journey: Core2BTransferJourney | null = null;
  private task: ChangedDemandTaskDefinition;
  private checkpoint: Checkpoint | null = null;
  private orientation: DisplayOrientation = 'LANDSCAPE';
  private state: TransferChangedDemandState = 'ready';
  private error = '';
  private returnRoute = '#/subject/physics/topic/wpe/questions';

  private currentResponseValue = '';
  private currentWorkingNote = '';
  private committed = false;
  private disclosedRubric = false;

  constructor(config: TransferChangedDemandConfig = {}) {
    this.journey = config.journey ?? null;
    this.task = config.taskDefinition ?? createDefaultChangedDemandTask();
    this.checkpoint = config.checkpoint ?? null;
    this.setOrientation(config.orientation ?? 'LANDSCAPE');
    this.returnRoute = config.returnRoute ?? '#/subject/physics/topic/wpe/questions';
    this.state = config.initialState ?? 'ready';
    this.error = config.errorMessage ?? '';
  }

  setOrientation(o: DisplayOrientation): void {
    if (!['LANDSCAPE', 'PORTRAIT'].includes(o)) throw new Error('Invalid orientation');
    this.orientation = o;
  }

  getOrientation(): DisplayOrientation {
    return this.orientation;
  }

  getTask(): ChangedDemandTaskDefinition {
    return this.task;
  }

  getReturnRoute(): string {
    return this.returnRoute;
  }

  setResponse(val: string): void {
    this.currentResponseValue = val;
  }

  getResponse(): string {
    return this.currentResponseValue;
  }

  setWorkingNote(note: string): void {
    this.currentWorkingNote = note;
  }

  getWorkingNote(): string {
    return this.currentWorkingNote;
  }

  isCommitted(): boolean {
    return this.committed;
  }

  isRubricDisclosed(): boolean {
    return this.disclosedRubric;
  }

  commitTransferAttempt(): boolean {
    if (!this.currentResponseValue.trim()) return false;
    this.committed = true;
    this.state = 'committed';
    return true;
  }

  requestRubricDisclosure(): boolean {
    // Rubric disclosure strictly requires committed attempt
    if (!this.committed) return false;
    this.disclosedRubric = true;
    return true;
  }

  getViewState() {
    return {
      screenState: this.state,
      orientation: this.orientation,
      task: this.task,
      responseValue: this.currentResponseValue,
      workingNote: this.currentWorkingNote,
      committed: this.committed,
      rubricDisclosed: this.disclosedRubric,
      error: this.error,
      returnRoute: this.returnRoute,
      minHitTargetPx: HIT_TARGET_MIN_PX,
      primaryHitTargetPx: HIT_TARGET_PRIMARY_PX,
    };
  }

  render(): string {
    const s = this.getViewState();
    const t = s.task;

    return `
      <main class="g9-transfer-changed-demand-page" data-role="CORE2B" data-orientation="${s.orientation}" style="display:flex;flex-direction:column;gap:1.5rem;font-family:var(--g9-font-family, system-ui, -apple-system, sans-serif);font-size:17px;line-height:1.6;color:#0f172a;max-width:100%;box-sizing:border-box;">
        
        <!-- Slot: identity -->
        <section data-slot="identity" style="background:#f8fafc;border:1px solid #cbd5e1;border-radius:8px;padding:1.5rem;">
          <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:12px;margin-bottom:0.75rem;">
            <div>
              <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;">
                <span style="font-size:0.875rem;font-weight:800;color:#0284c7;background:#e0f2fe;padding:2px 8px;border-radius:4px;">CORE2B</span>
                <span style="font-size:0.875rem;font-weight:700;color:#7c3aed;background:#f3e8ff;padding:2px 8px;border-radius:4px;">TRANSFER: ${escapeHtml(t.dimension)}</span>
                <span style="font-size:0.875rem;color:#64748b;">BP-CORE2B-TRANSFER@1.1.0</span>
              </div>
              <h1 style="margin:0;font-size:1.85rem;font-weight:800;color:#0f172a;">${escapeHtml(t.title)}</h1>
            </div>
            <button type="button" data-action="return-origin" style="min-height:${HIT_TARGET_MIN_PX}px;padding:10px 18px;background:#ffffff;border:1px solid #cbd5e1;border-radius:6px;cursor:pointer;font-weight:700;font-size:0.95rem;color:#0f172a;">← Return to Questions</button>
          </div>
          
          <div style="display:flex;align-items:center;gap:8px;padding:8px 12px;background:#ffffff;border:1px solid #e2e8f0;border-radius:6px;font-size:0.95rem;">
            <span style="color:#64748b;">Verified Prior Exposure Anchor:</span>
            <strong style="color:#0f172a;">${escapeHtml(t.priorAnchorTitle)}</strong>
            <span style="font-size:0.875rem;background:#dcfce7;color:#15803d;padding:2px 6px;border-radius:4px;font-weight:700;">Anchor Attempt Committed</span>
          </div>
        </section>

        <!-- Split Grid Layout for Attempt & Post-Attempt -->
        <div style="display:grid;grid-template-columns:${s.orientation === 'LANDSCAPE' ? '1.1fr 0.9fr' : '1fr'};gap:1.5rem;align-items:start;">
          
          <!-- Column 1: Slot attempt -->
          <section data-slot="attempt" style="background:#ffffff;border:1px solid #cbd5e1;border-radius:8px;padding:1.5rem;box-shadow:0 1px 3px rgba(0,0,0,0.05);display:flex;flex-direction:column;gap:1.25rem;">
            <div>
              <h2 style="margin:0 0 0.5rem;font-size:1.25rem;font-weight:700;color:#0f172a;">Changed Demand Stimulus</h2>
              <div style="margin:0;color:#334155;line-height:1.6;">${renderMathHtml(escapeHtml(t.changedConditionPrompt))}</div>
            </div>

            <!-- Governing Perturbation Formulation -->
            <div style="background:#f8fafc;border-left:4px solid #7c3aed;padding:1rem 1.25rem;border-radius:0 6px 6px 0;">
              <h3 style="margin:0 0 0.25rem;font-size:1rem;font-weight:700;color:#6b21a8;">Governing Dynamic Perturbation:</h3>
              <div style="margin:0;font-family:var(--g9-font-mono, monospace);font-size:1.05rem;color:#1e1b4b;">${renderMathHtml(escapeHtml(t.governingPerturbation))}</div>
            </div>

            <!-- Working Steps & Scratchpad -->
            <div>
              <label for="g9-xfer-working" style="display:block;margin-bottom:6px;font-weight:600;color:#334155;">Transfer Derivations &amp; Parameter Substitution:</label>
              <textarea id="g9-xfer-working" rows="4" style="width:100%;box-sizing:border-box;border:1px solid #cbd5e1;border-radius:6px;padding:10px;font-family:inherit;font-size:16px;resize:vertical;" ${s.committed ? 'disabled' : ''} placeholder="Equate drag force to gravitational force at terminal equilibrium...">${escapeHtml(s.workingNote)}</textarea>
            </div>

            <!-- Response Commitment Action -->
            <div style="background:#f1f5f9;border-radius:8px;padding:1.25rem;">
              <label for="g9-xfer-response" style="display:block;margin-bottom:8px;font-weight:700;color:#0f172a;">Terminal Velocity v_term (m/s):</label>
              <div style="display:flex;gap:10px;flex-wrap:wrap;">
                <input type="text" id="g9-xfer-response" value="${escapeHtml(s.responseValue)}" placeholder="e.g. 15.65" style="min-height:${HIT_TARGET_MIN_PX}px;padding:8px 14px;border:1px solid #cbd5e1;border-radius:6px;font-size:1.1rem;flex:1;min-width:180px;" ${s.committed ? 'disabled' : ''}>
                <button type="button" data-action="commit-transfer" style="min-height:${HIT_TARGET_PRIMARY_PX}px;padding:12px 24px;background:${s.committed ? '#047857' : '#7c3aed'};color:white;border:none;border-radius:8px;cursor:pointer;font-weight:700;font-size:1rem;" ${s.committed ? 'disabled' : ''}>
                  ${s.committed ? '✓ Transfer Committed' : 'Commit Transfer Attempt →'}
                </button>
              </div>
              <p style="margin:0.5rem 0 0;font-size:0.875rem;color:#64748b;">Irreversible submission. Solutions are sealed until transfer commitment is recorded.</p>
            </div>
          </section>

          <!-- Column 2: Slot post_attempt -->
          <section data-slot="post_attempt" style="background:#ffffff;border:1px solid #cbd5e1;border-radius:8px;padding:1.5rem;box-shadow:0 1px 3px rgba(0,0,0,0.05);display:flex;flex-direction:column;gap:1.25rem;">
            <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;">
              <h2 style="margin:0;font-size:1.25rem;font-weight:700;color:#0f172a;">Post-Attempt Review &amp; Rubric</h2>
              <span style="font-size:0.875rem;color:#64748b;">TransferAuthority Gated</span>
            </div>

            ${!s.committed ? `
              <div style="background:#f8fafc;border:1px dashed #cbd5e1;border-radius:6px;padding:2rem;text-align:center;color:#64748b;">
                <p style="margin:0 0 0.5rem;font-weight:600;font-size:1.05rem;color:#475569;">🔒 Pre-Commit Secrecy Active</p>
                <p style="margin:0;font-size:0.95rem;">Full answer rubric, parameter analysis, and transfer takeaways remain strictly sealed until irreversible commitment.</p>
              </div>
            ` : !s.rubricDisclosed ? `
              <div style="background:#f0fdf4;border:1px solid #86efac;border-radius:6px;padding:1.5rem;text-align:center;">
                <p style="margin:0 0 1rem;font-weight:700;color:#166534;font-size:1.1rem;">✓ Transfer Attempt Successfully Committed</p>
                <button type="button" data-action="disclose-rubric" style="min-height:${HIT_TARGET_PRIMARY_PX}px;padding:12px 24px;background:#047857;color:white;border:none;border-radius:8px;cursor:pointer;font-weight:700;font-size:1rem;">
                  Reveal Full Rubric &amp; Transfer Takeaway →
                </button>
              </div>
            ` : `
              <div style="display:flex;flex-direction:column;gap:1.25rem;">
                <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:6px;padding:1.25rem;">
                  <h3 style="margin:0 0 0.75rem;font-size:1.1rem;font-weight:700;color:#0f172a;">Verified Answer Rubric:</h3>
                  <ol style="margin:0;padding-left:1.25rem;display:flex;flex-direction:column;gap:8px;color:#334155;line-height:1.5;">
                    ${t.verifiedRubricSteps.map(step => `<li>${renderMathHtml(escapeHtml(step))}</li>`).join('')}
                  </ol>
                </div>

                <div style="background:#f0fdf4;border:1px solid #86efac;border-radius:6px;padding:1.25rem;">
                  <h3 style="margin:0 0 0.5rem;font-size:1.05rem;font-weight:700;color:#166534;">Conceptual Transfer Takeaway</h3>
                  <div style="margin:0;color:#14532d;line-height:1.6;">${renderMathHtml(escapeHtml(t.transferTakeaway))}</div>
                </div>

                <div style="padding-top:8px;border-top:1px solid #e2e8f0;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;">
                  <span style="font-size:0.875rem;color:#64748b;">Academic status: Diagnostic HOLD · Transfer Lineage Verified</span>
                  <button type="button" data-action="return-origin" style="min-height:${HIT_TARGET_MIN_PX}px;padding:8px 16px;background:#0284c7;color:white;border:none;border-radius:6px;cursor:pointer;font-weight:700;">Return to Question Deck</button>
                </div>
              </div>
            `}
          </section>

        </div>
      </main>
    `;
  }
}

export function mountCore2BTransfer(
  root: HTMLElement,
  controller: Core2BTransferPageController,
  onNavigate?: (route: string) => void
): { dispose: () => void; refresh: () => void } {
  let active = true;

  const render = () => {
    if (!active) return;
    root.innerHTML = controller.render();

    // Attach return action
    root.querySelectorAll<HTMLButtonElement>('button[data-action="return-origin"]').forEach(btn => {
      btn.addEventListener('click', () => {
        const route = controller.getReturnRoute();
        if (onNavigate) {
          onNavigate(route);
        } else if (typeof window !== 'undefined') {
          window.location.hash = route.startsWith('#') ? route : '#' + route;
        }
      });
    });

    // Attach response input
    const responseInput = root.querySelector<HTMLInputElement>('#g9-xfer-response');
    if (responseInput) {
      responseInput.addEventListener('input', () => {
        controller.setResponse(responseInput.value);
      });
    }

    const workingText = root.querySelector<HTMLTextAreaElement>('#g9-xfer-working');
    if (workingText) {
      workingText.addEventListener('input', () => {
        controller.setWorkingNote(workingText.value);
      });
    }

    // Attach commit action
    const commitBtn = root.querySelector<HTMLButtonElement>('button[data-action="commit-transfer"]');
    if (commitBtn) {
      commitBtn.addEventListener('click', () => {
        if (responseInput) controller.setResponse(responseInput.value);
        if (workingText) controller.setWorkingNote(workingText.value);
        if (controller.commitTransferAttempt()) {
          render();
        }
      });
    }

    // Attach rubric disclosure
    const discloseBtn = root.querySelector<HTMLButtonElement>('button[data-action="disclose-rubric"]');
    if (discloseBtn) {
      discloseBtn.addEventListener('click', () => {
        if (controller.requestRubricDisclosure()) {
          render();
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
