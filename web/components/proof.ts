/**
 * web/components/proof.ts
 * A27 — Mathematical proof and symbolic workspace component controller.
 *
 * Implements:
 * - Given / Goal / Lemmas formulation pane
 * - Step-by-step equation and proof assertions
 * - Gated alternative approaches
 * - Exact draft restoration with zero data loss
 * - Strict pedagogical invariant: Arbitrary proof is NEVER auto-graded;
 *   MATH E1–E3 evaluations default to REVIEW_PENDING with score withheld.
 * - 48px minimum hit target size on all interactive triggers.
 *
 * No academic approval inferred from software validation.
 */

import {canonicalJson,computeSha256} from '../runtime/loader.ts';
import {validateResponse} from '../runtime/response.ts';
import type {WorkArtifact,Json,Response} from '../runtime/types.ts';
import { HIT_TARGET_MIN_PX } from '../styles/tokens.ts';
import {
  ProofStepManager,
  createProofStepManager,
} from '../adapters/mathematics/steps.ts';
import {
  parseSymbolicExpression,
} from '../adapters/mathematics/symbolic.ts';
import type {
  MathExamArchetype,
  ProofLemma,
  ProofApproach,
  ProofStep,
  MathematicalProofDraft,
  ProofEvaluation,
} from '../adapters/mathematics/types.ts';

export interface ProofWorkspaceConfig {
  readonly archetype: MathExamArchetype;
  readonly givenStatements: readonly string[];
  readonly goalStatement: string;
  readonly availableLemmas?: readonly ProofLemma[];
  readonly approaches?: readonly ProofApproach[];
  readonly initialSteps?: readonly ProofStep[];
}

export interface ProofWorkspaceViewState {
  readonly archetype: MathExamArchetype;
  readonly givenStatements: readonly string[];
  readonly goalStatement: string;
  readonly availableLemmas: readonly ProofLemma[];
  readonly approaches: readonly ProofApproach[];
  readonly selectedApproachId: string | null;
  readonly steps: readonly ProofStep[];
  readonly isComplete: boolean;
  readonly evaluation: ProofEvaluation | null;
  readonly minHitTargetPx: number;
}

export class ProofWorkspaceController {
  private archetype: MathExamArchetype;
  private givenStatements: string[];
  private goalStatement: string;
  private availableLemmas: ProofLemma[];
  private approaches: ProofApproach[];
  private selectedApproachId: string | null = null;
  private stepManager: ProofStepManager;
  private scratchpadNote: string = '';
  private revision: number = 1;
  private evaluation: ProofEvaluation | null = null;

  constructor(config: ProofWorkspaceConfig) {
    this.archetype = config.archetype;
    this.givenStatements = [...config.givenStatements];
    this.goalStatement = config.goalStatement;
    this.availableLemmas=structuredClone(config.availableLemmas||[]) as ProofLemma[];
    this.approaches=(config.approaches||[]).map(a=>a.isGated?{...a,isUnlocked:false,strategySummary:''}:{...a});
    this.stepManager = createProofStepManager(config.initialSteps);

    if (this.approaches.length > 0) {
      const unlocked = this.approaches.find((a) => !a.isGated || a.isUnlocked);
      this.selectedApproachId = unlocked ? unlocked.id : null;
    }
  }

  // ---------------------------------------------------------------------------
  // Step Actions
  // ---------------------------------------------------------------------------

  addStep(assertion: string, justification: string = '', lemmaRefs: readonly string[] = []): ProofStep {
    if(!lemmaRefs.every(id=>this.availableLemmas.some(l=>l.id===id)))throw Error('Unknown lemma');this.evaluation=null;this.revision++;
    return this.stepManager.addStep(assertion, justification, lemmaRefs);
  }

  updateStep(id: string, updates: Partial<Pick<ProofStep, 'assertion' | 'justification' | 'lemmaRefs'>>): boolean {
    if(updates.lemmaRefs&&!updates.lemmaRefs.every((id:string)=>this.availableLemmas.some(l=>l.id===id)))return false;
    const ok = this.stepManager.updateStep(id, updates);
    if (ok){this.evaluation=null;this.revision++;}
    return ok;
  }

  removeStep(id: string): boolean {
    const ok = this.stepManager.removeStep(id);
    if (ok){this.evaluation=null;this.revision++;}
    return ok;
  }

  getSteps(): readonly ProofStep[] {
    return this.stepManager.getSteps();
  }

  // ---------------------------------------------------------------------------
  // Alternative Approaches
  // ---------------------------------------------------------------------------

  getApproaches(): readonly ProofApproach[] {
    return structuredClone(this.approaches);
  }

  selectApproach(approachId: string): boolean {
    const app = this.approaches.find((a) => a.id === approachId);
    if (!app) return false;
    if (app.isGated && !app.isUnlocked) {
      return false; // Gated approach cannot be selected until unlocked
    }
    this.selectedApproachId = approachId;
    this.revision++;
    return true;
  }

  unlockApproach(approachId: string): boolean {
    // No local action can authorize a gated strategy. A49 must provide reviewed disclosure.
    return false;
  }

  // ---------------------------------------------------------------------------
  // Evaluation Policy (Mandatory Invariant: Never auto-grade arbitrary proofs)
  // ---------------------------------------------------------------------------

  submitProof(): ProofEvaluation {
    let rubricScale: 'EXACT_INTEGER' | 'HUMAN_RUBRIC' | 'IMO_0_TO_7';

    switch (this.archetype) {
      case 'MATH_E1':
        rubricScale = 'EXACT_INTEGER';
        break;
      case 'MATH_E2':
        rubricScale = 'HUMAN_RUBRIC';
        break;
      case 'MATH_E3':
        rubricScale = 'IMO_0_TO_7';
        break;
      default:
        rubricScale = 'HUMAN_RUBRIC';
    }

    // MANDATORY INVARIANT: Proof evaluation is strictly REVIEW_PENDING, zero automated points.
    this.evaluation = {
      status: 'REVIEW_PENDING',
      points: null,
      rubricScale,
      isAutoGraded: false,
      reasonCode: 'PROOF_PENDING_HUMAN_EVALUATION',
      feedbackHtml:
        `<div class="proof-evaluation-banner" role="status">` +
        `<strong>Proof requires academic review (not submitted):</strong> Mathematical arguments must be independently verified by certified examiners under the ${rubricScale} scale.` +
        `</div>`,
    };

    return this.evaluation;
  }

  // ---------------------------------------------------------------------------
  // Draft Serialization and Restoration
  // ---------------------------------------------------------------------------

  exportDraft(): MathematicalProofDraft {
    return {
      archetype: this.archetype,
      givenStatements: [...this.givenStatements],
      goalStatement: this.goalStatement,
      availableLemmas: structuredClone(this.availableLemmas),
      selectedApproachId: this.selectedApproachId,
      steps: [...this.stepManager.getSteps()],
      symbolicScratchpad: this.scratchpadNote,
      revision: this.revision,
      lastModifiedAt: new Date().toISOString(),
    };
  }

  importDraft(draft: MathematicalProofDraft): void {
    if(draft.archetype!==this.archetype||canonicalJson(draft.givenStatements)!==canonicalJson(this.givenStatements)||draft.goalStatement!==this.goalStatement||canonicalJson(draft.availableLemmas)!==canonicalJson(this.availableLemmas)||!Number.isSafeInteger(draft.revision)||draft.revision<1||!Array.isArray(draft.steps)||!draft.steps.every(s=>s.lemmaRefs.every((id:string)=>this.availableLemmas.some(l=>l.id===id)))||draft.selectedApproachId!==null&&!this.approaches.some(a=>a.id===draft.selectedApproachId&&!a.isGated))throw Error('Foreign or invalid proof draft');
    const next=createProofStepManager(draft.steps);
    this.selectedApproachId=draft.selectedApproachId;this.stepManager=next;this.scratchpadNote=draft.symbolicScratchpad||'';this.revision=draft.revision;this.evaluation=null;
  }
  toResponse():Response{
    const steps=this.stepManager.getSteps();
    if(!steps.length||steps.some(s=>!s.assertion.trim()))throw Error('Incomplete proof');
    return validateResponse({kind:'MATHEMATICAL_PROOF',value:steps.map(s=>s.assertion+(s.justification?' — '+s.justification:'')).join('\n')});
  }
  async toWorkArtifact(sessionId:string):Promise<WorkArtifact>{
    if(!sessionId.trim())throw Error('Session identity required');
    const value={steps:this.stepManager.getSteps(),symbolicScratchpad:this.scratchpadNote,selectedApproachId:this.selectedApproachId};
    return {id:'proof:'+await computeSha256(canonicalJson({sessionId,value})),kind:'NOTE',version:1,value:value as unknown as Json};
  }

  async saveDurableDraft(store: any, session: any): Promise<void> {
    if (!session || !session.id) throw new Error('SESSION_REQUIRED');
    const response = this.toResponse();
    const artifact = await this.toWorkArtifact(session.id);
    await store.saveDraft(session, response, [artifact], this.revision);
    this.revision++;
  }

  async restoreDurableDraft(store: any, session: any): Promise<boolean> {
    if (!session || !session.id) throw new Error('SESSION_REQUIRED');
    const draft = await store.loadDraft(session.id);
    if (!draft) return false;
    if (draft.session.id !== session.id) throw new Error('SESSION_MISMATCH');
    const proofArtifact = (draft.artifacts || []).find((a: any) => a.id.startsWith('proof:'));
    if (proofArtifact && proofArtifact.value?.steps) {
      this.stepManager = createProofStepManager(proofArtifact.value.steps);
      this.selectedApproachId = proofArtifact.value.selectedApproachId || null;
      this.scratchpadNote = proofArtifact.value.symbolicScratchpad || '';
      this.revision = draft.revision;
      this.evaluation = null;
      return true;
    }
    return false;
  }

  getViewState(): ProofWorkspaceViewState {
    return {
      archetype: this.archetype,
      givenStatements: [...this.givenStatements],
      goalStatement: this.goalStatement,
      availableLemmas: structuredClone(this.availableLemmas),
      approaches: this.getApproaches(),
      selectedApproachId: this.selectedApproachId,
      steps: this.stepManager.getSteps(),
      isComplete: this.stepManager.getSteps().length > 0,
      evaluation: structuredClone(this.evaluation),
      minHitTargetPx: HIT_TARGET_MIN_PX,
    };
  }
}

export function createProofWorkspace(config: ProofWorkspaceConfig): ProofWorkspaceController {
  return new ProofWorkspaceController(config);
}

export interface ProofWorkspaceMountResult {
  dispose: () => void;
  refresh: () => void;
}

/**
 * Mounts the production-grade Mathematical Proof Workspace (A27).
 * Ergonomically formatted for 12.7" tablets with >= 48px interactive touch targets.
 */
export function mountProofWorkspace(
  root: HTMLElement,
  controller: ProofWorkspaceController,
  onNavigate?: (route: string) => void
): ProofWorkspaceMountResult {
  let active = true;

  const render = () => {
    if (!active) return;
    const state = controller.getViewState();

    root.innerHTML = `
      <div class="proof-workspace" style="background:#ffffff;border:1px solid #e2e8f0;border-radius:12px;padding:1.5rem;font-family:system-ui,-apple-system,sans-serif;max-width:100%;box-sizing:border-box;">
        <!-- Workspace Header -->
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1.25rem;padding-bottom:1rem;border-bottom:1px solid #e2e8f0;flex-wrap:wrap;gap:12px;">
          <div>
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;">
              <span class="proof-archetype-badge" style="font-size:0.875rem;font-weight:800;color:#7c3aed;background:#f3e8ff;padding:2px 8px;border-radius:4px;">${state.archetype}</span>
              <span style="font-size:0.875rem;font-weight:600;color:#047857;background:#d1fae5;padding:2px 8px;border-radius:4px;">HUMAN_RUBRIC_ONLY</span>
              <span style="font-size:0.875rem;color:#64748b;">A27 Symbolic Proof Engine</span>
            </div>
            <h2 style="margin:0;font-size:1.5rem;font-weight:800;color:#0f172a;">📐 Mathematical Proof &amp; Deductive Reasoning Workspace</h2>
          </div>
          <button type="button" id="proof-return-btn" style="min-height:${HIT_TARGET_MIN_PX}px;padding:8px 16px;background:#f8fafc;color:#0f172a;border:1px solid #cbd5e1;border-radius:6px;cursor:pointer;font-weight:600;font-size:0.95rem;">← Back to Topic</button>
        </div>

        <!-- Given & Goal Statements -->
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,300px),1fr));gap:1rem;margin-bottom:1.5rem;">
          <div class="proof-given-pane" style="background:#f8fafc;border:1px solid #cbd5e1;border-radius:8px;padding:1.25rem;">
            <h3 style="margin:0 0 0.5rem;font-size:1.1rem;color:#0f172a;font-weight:700;">Given Conditions</h3>
            <ul class="proof-given-statements" style="margin:0;padding-left:1.25rem;color:#334155;font-size:0.95rem;line-height:1.5;">
              ${state.givenStatements.map(g => `<li style="margin-bottom:4px;">${g}</li>`).join('')}
            </ul>
          </div>
          <div class="proof-goal-pane" style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:8px;padding:1.25rem;">
            <h3 style="margin:0 0 0.5rem;font-size:1.1rem;color:#1e40af;font-weight:700;">Target Goal to Prove</h3>
            <div class="proof-goal-statement" style="font-weight:700;color:#1e3a8a;font-size:1.05rem;line-height:1.4;">
              ${state.goalStatement}
            </div>
          </div>
        </div>

        <!-- Available Lemmas -->
        ${state.availableLemmas.length > 0 ? `
          <div style="background:#faf5ff;border:1px solid #e9d5ff;border-radius:8px;padding:1rem;margin-bottom:1.5rem;">
            <h4 style="margin:0 0 0.5rem;font-size:0.95rem;color:#6b21a8;font-weight:700;">Available Registered Lemmas</h4>
            <div style="display:flex;flex-wrap:wrap;gap:8px;">
              ${state.availableLemmas.map(l => `
                <span class="proof-lemma-pill" style="font-size:0.875rem;background:#ffffff;border:1px solid #d8b4fe;padding:4px 10px;border-radius:6px;color:#581c87;">
                  <strong>${l.name}</strong>: ${l.statement}
                </span>
              `).join('')}
            </div>
          </div>
        ` : ''}

        <!-- Proof Steps List -->
        <div style="margin-bottom:1.5rem;">
          <h3 style="margin:0 0 0.75rem;font-size:1.2rem;color:#0f172a;font-weight:700;">Deductive Proof Sequence (${state.steps.length} Steps)</h3>
          <div class="proof-steps-list" style="display:flex;flex-direction:column;gap:10px;">
            ${state.steps.length === 0 ? `
              <div style="padding:1.5rem;background:#f8fafc;border:1px dashed #cbd5e1;border-radius:8px;text-align:center;color:#64748b;font-size:0.95rem;">
                No proof steps added yet. Formulate your mathematical derivation below.
              </div>
            ` : state.steps.map((step, idx) => `
              <div class="proof-step-row" data-step-id="${step.id}" style="display:flex;justify-content:space-between;align-items:center;background:#ffffff;border:1px solid #cbd5e1;border-radius:8px;padding:1rem;gap:12px;box-shadow:0 1px 2px rgba(0,0,0,0.04);">
                <div style="flex:1;">
                  <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;">
                    <span style="font-size:0.875rem;font-weight:800;color:#0284c7;background:#e0f2fe;padding:2px 8px;border-radius:4px;">Step ${idx + 1}</span>
                    ${step.lemmaRefs && step.lemmaRefs.length > 0 ? `
                      <span style="font-size:0.875rem;background:#f1f5f9;color:#64748b;padding:2px 6px;border-radius:4px;">Lemmas: ${step.lemmaRefs.join(', ')}</span>
                    ` : ''}
                  </div>
                  <div style="font-family:'Courier New',monospace;font-size:1.05rem;font-weight:700;color:#0f172a;margin-bottom:2px;">
                    ${step.assertion}
                  </div>
                  ${step.justification ? `<div style="font-size:0.9rem;color:#475569;"><em>Justification:</em> ${step.justification}</div>` : ''}
                </div>
                <button type="button" data-action="remove-step" data-step-id="${step.id}" style="min-height:${HIT_TARGET_MIN_PX}px;min-width:${HIT_TARGET_MIN_PX}px;padding:8px 12px;background:#fef2f2;color:#b91c1c;border:1px solid #fecaca;border-radius:6px;cursor:pointer;font-weight:600;font-size:0.9rem;">✕ Remove</button>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Add Step Form -->
        <div style="background:#f8fafc;border:1px solid #cbd5e1;border-radius:8px;padding:1.25rem;margin-bottom:1.5rem;">
          <h4 style="margin:0 0 1rem;font-size:1.05rem;color:#0f172a;font-weight:700;">Add Proof Step</h4>
          <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,280px),1fr));gap:12px;margin-bottom:12px;">
            <div>
              <label for="proof-assertion-input" style="display:block;margin-bottom:4px;font-size:0.9rem;font-weight:600;color:#334155;">Mathematical Assertion (LaTeX/Symbolic)</label>
              <input id="proof-assertion-input" type="text" placeholder="e.g. ∠ACB = 90°" style="width:100%;min-height:${HIT_TARGET_MIN_PX}px;padding:8px 12px;border:1px solid #cbd5e1;border-radius:6px;font-size:1rem;box-sizing:border-box;">
            </div>
            <div>
              <label for="proof-justification-input" style="display:block;margin-bottom:4px;font-size:0.9rem;font-weight:600;color:#334155;">Logical Justification</label>
              <input id="proof-justification-input" type="text" placeholder="e.g. Thales's Theorem for diameter AB" style="width:100%;min-height:${HIT_TARGET_MIN_PX}px;padding:8px 12px;border:1px solid #cbd5e1;border-radius:6px;font-size:1rem;box-sizing:border-box;">
            </div>
            ${state.availableLemmas.length > 0 ? `
              <div>
                <label for="proof-lemma-select" style="display:block;margin-bottom:4px;font-size:0.9rem;font-weight:600;color:#334155;">Cite Lemma (Optional)</label>
                <select id="proof-lemma-select" style="width:100%;min-height:${HIT_TARGET_MIN_PX}px;padding:8px 12px;border:1px solid #cbd5e1;border-radius:6px;font-size:1rem;box-sizing:border-box;background:#ffffff;">
                  <option value="">-- No Lemma Citation --</option>
                  ${state.availableLemmas.map(l => `<option value="${l.id}">${l.name}</option>`).join('')}
                </select>
              </div>
            ` : ''}
          </div>
          <button type="button" id="add-step-btn" style="min-height:${HIT_TARGET_MIN_PX}px;padding:10px 20px;background:#0284c7;color:white;border:none;border-radius:6px;cursor:pointer;font-weight:700;font-size:0.95rem;">+ Append Proof Step</button>
        </div>

        <!-- Submit for Academic Review -->
        <div style="display:flex;flex-direction:column;gap:12px;">
          <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;">
            <div>
              <button type="button" id="submit-proof-btn" style="min-height:56px;padding:12px 28px;background:#0f172a;color:white;border:none;border-radius:8px;cursor:pointer;font-weight:800;font-size:1.05rem;">Submit Proof for Human Evaluation →</button>
            </div>
            <span style="font-size:0.875rem;color:#64748b;">Strict Academic Invariant: Arbitrary proofs are never auto-graded.</span>
          </div>

          <!-- Evaluation Display -->
          ${state.evaluation ? `
            <div class="proof-evaluation-container" style="margin-top:12px;">
              ${state.evaluation.feedbackHtml}
              <div style="margin-top:8px;padding:12px;background:#f8fafc;border:1px solid #cbd5e1;border-radius:6px;font-size:0.9rem;color:#334155;">
                <div>Evaluation Status: <strong>${state.evaluation.status}</strong></div>
                <div>Rubric Scale: <strong>${state.evaluation.rubricScale}</strong></div>
                <div>Awarded Score: <strong>Withheld (REVIEW_PENDING)</strong></div>
                <div>Auto-Graded: <strong>${state.evaluation.isAutoGraded ? 'YES' : 'NO'}</strong></div>
              </div>
            </div>
          ` : ''}
        </div>
      </div>
    `;

    // Event Listeners
    const addStepBtn = root.querySelector<HTMLButtonElement>('#add-step-btn');
    if (addStepBtn) {
      addStepBtn.onclick = () => {
        const assertionInput = root.querySelector<HTMLInputElement>('#proof-assertion-input');
        const justInput = root.querySelector<HTMLInputElement>('#proof-justification-input');
        const lemmaSelect = root.querySelector<HTMLSelectElement>('#proof-lemma-select');

        const assertion = assertionInput ? assertionInput.value.trim() : '';
        const just = justInput ? justInput.value.trim() : '';
        const lemmaId = lemmaSelect ? lemmaSelect.value : '';

        if (!assertion) {
          alert('Please enter a mathematical assertion.');
          return;
        }

        try {
          controller.addStep(assertion, just, lemmaId ? [lemmaId] : []);
          render();
        } catch (err: any) {
          alert(err.message || 'Error adding step');
        }
      };
    }

    const submitBtn = root.querySelector<HTMLButtonElement>('#submit-proof-btn');
    if (submitBtn) {
      submitBtn.onclick = () => {
        controller.submitProof();
        render();
      };
    }

    root.querySelectorAll<HTMLButtonElement>('[data-action="remove-step"]').forEach(btn => {
      btn.onclick = () => {
        const stepId = btn.dataset.stepId;
        if (stepId) {
          controller.removeStep(stepId);
          render();
        }
      };
    });

    const returnBtn = root.querySelector<HTMLButtonElement>('#proof-return-btn');
    if (returnBtn && onNavigate) {
      returnBtn.onclick = () => onNavigate('#/subject/mathematics/topic/euclid-geometry');
    }
  };

  render();

  return {
    refresh: () => render(),
    dispose() {
      active = false;
      root.replaceChildren();
    },
  };
}
