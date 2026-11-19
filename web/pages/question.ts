/**
 * web/pages/question.ts
 * A24 — Question interactive page controller.
 *
 * Implements:
 * - Dynamic question loading and workspace binding
 * - Session state progression (LOADING, INTERACTIVE, SUBMITTED, HOLD_LOCKED, ERROR)
 * - Reviewed feedback display with explanation and scoring breakdown
 * - Safe return and back-stack integration
 * - Diagnostic DOM mount with responsive split layout and 48px touch targets
 *
 * No academic approval inferred from software validation.
 */

import {
  createQuestionWorkspace,
  QuestionWorkspaceController,
} from '../components/question-workspace.ts';
import type {
  WorkspaceQuestionDescriptor,
  QuestionWorkspaceViewState,WorkspaceBinding,
} from '../components/question-workspace.ts';
import type { EvaluationResult } from '../components/response/types.ts';
import { escapeHtml } from '../runtime/rendering.ts';
import { HIT_TARGET_MIN_PX, HIT_TARGET_PRIMARY_PX } from '../styles/tokens.ts';

export type QuestionPageStatus =
  | 'LOADING'
  | 'INTERACTIVE'
  | 'EVALUATING'
  | 'FEEDBACK_SHOWN'
  | 'HOLD_LOCKED'
  | 'ERROR';

export interface QuestionPageViewState {
  readonly pageStatus: QuestionPageStatus;
  readonly workspaceState: QuestionWorkspaceViewState | null;
  readonly evaluation: EvaluationResult | null;
  readonly returnRoute: string;
  readonly errorMessage?: string;
}

export class QuestionPageController {
  private workspace: QuestionWorkspaceController | null = null;
  private status: QuestionPageStatus = 'LOADING';
  private evaluationResult: EvaluationResult | null = null;
  private subjectCode: string;
  private topicCode: string;

  constructor(subjectCode: string = 'phys', topicCode: string = 'wpe') {
    this.subjectCode = subjectCode;
    this.topicCode = topicCode;
  }

  loadQuestion(question: WorkspaceQuestionDescriptor,binding?:WorkspaceBinding): void {
    this.evaluationResult=null;this.workspace = createQuestionWorkspace(question,undefined,binding);
    if (question.status === 'HOLD') {
      this.status = 'HOLD_LOCKED';
    } else {
      this.status = 'INTERACTIVE';
    }
  }

  setError(message: string): void {
    this.workspace = null;
    this.status = 'ERROR';
  }

  getWorkspace(): QuestionWorkspaceController | null {
    return this.workspace;
  }

  async submit(): Promise<EvaluationResult | null> {
    if (!this.workspace) return null;
    this.status = 'EVALUATING';
    try{const result=await this.workspace.submit();this.evaluationResult=result;this.status=this.workspace.getViewState().isLocked?'FEEDBACK_SHOWN':result.academicHold?'HOLD_LOCKED':'INTERACTIVE';return result;}catch(e){this.status='INTERACTIVE';throw e;}
  }

  getViewState(): QuestionPageViewState {
    const returnRoute = `/topic/${this.subjectCode.toLowerCase()}/${this.topicCode.toLowerCase()}`;
    return {
      pageStatus: this.status,
      workspaceState: this.workspace ? this.workspace.getViewState() : null,
      evaluation: this.evaluationResult,
      returnRoute,
    };
  }

  render(): string {
    const s = this.getViewState();
    const ws = s.workspaceState;
    if (!ws) {
      return `<main class="g9-question-page" data-role="CORE2"><section data-slot="identity"><h1>Question unavailable</h1><p>${escapeHtml(s.errorMessage || 'No question bound.')}</p></section></main>`;
    }
    const q = ws.question;
    const isLandscape = ws.layout.orientation === 'LANDSCAPE';

    let stimulusHtml = `<div class="g9-stimulus-content"><h2 style="margin:0 0 8px 0;font-size:18px;">${escapeHtml(q.title)}</h2><p style="white-space:pre-wrap;overflow-wrap:anywhere;">${escapeHtml(q.stemText)}</p>`;
    if (q.figures && q.figures.length > 0) {
      stimulusHtml += `<div class="g9-stimulus-figures" style="margin-top:12px;">` + q.figures.map(f => `<figure style="margin:0 0 8px 0;"><figcaption>${escapeHtml(f.caption)}</figcaption><div style="padding:16px;background:#f8fafc;border:1px dashed #cbd5e1;border-radius:6px;min-height:64px;display:flex;align-items:center;justify-content:center;">${f.available ? '<span>Figure: ' + escapeHtml(f.id) + '</span>' : '<span style="color:#ef4444;">[Figure unavailable / withheld]</span>'}</div></figure>`).join('') + `</div>`;
    }
    stimulusHtml += `</div>`;

    let responseHtml = `<div class="g9-response-content">`;
    if (q.kind === 'SINGLE_CHOICE' && q.options) {
      responseHtml += `<fieldset style="border:none;padding:0;margin:0 0 16px 0;"><legend style="font-weight:600;margin-bottom:8px;">Select an option:</legend>` + q.options.map((opt: any) => `<label style="display:flex;align-items:center;gap:8px;min-height:48px;padding:4px 0;"><input type="radio" name="response-option" value="${escapeHtml(opt.id)}" style="min-width:48px;min-height:48px;" ${ws.isLocked ? 'disabled' : ''}><span>${escapeHtml(opt.text || opt.label || opt.id)}</span></label>`).join('') + `</fieldset>`;
    } else if (q.kind === 'MULTIPLE_CHOICE' && q.options) {
      responseHtml += `<fieldset style="border:none;padding:0;margin:0 0 16px 0;"><legend style="font-weight:600;margin-bottom:8px;">Select all that apply:</legend>` + q.options.map((opt: any) => `<label style="display:flex;align-items:center;gap:8px;min-height:48px;padding:4px 0;"><input type="checkbox" name="response-option" value="${escapeHtml(opt.id)}" style="min-width:48px;min-height:48px;" ${ws.isLocked ? 'disabled' : ''}><span>${escapeHtml(opt.text || opt.label || opt.id)}</span></label>`).join('') + `</fieldset>`;
    } else {
      responseHtml += `<div style="margin-bottom:16px;"><label style="display:block;margin-bottom:6px;font-weight:600;">Your answer:</label><input type="text" id="g9-quantity-input" placeholder="Value..." style="min-height:48px;padding:8px 12px;border:1px solid #cbd5e1;border-radius:6px;width:100%;max-width:320px;" ${ws.isLocked ? 'disabled' : ''}></div>`;
    }

    responseHtml += `<div class="g9-workspace-actions" style="display:flex;gap:12px;flex-wrap:wrap;align-items:center;margin-top:16px;">
      <button type="button" id="g9-submit-btn" style="min-height:${HIT_TARGET_PRIMARY_PX}px;min-width:${HIT_TARGET_PRIMARY_PX}px;padding:12px 24px;font-weight:700;font-size:16px;background:#2563eb;color:#ffffff;border:none;border-radius:6px;cursor:pointer;" ${!ws.canSubmit ? 'disabled' : ''}>Submit Solution</button>
      <button type="button" id="g9-hint-btn" style="min-height:${HIT_TARGET_MIN_PX}px;min-width:${HIT_TARGET_MIN_PX}px;padding:8px 16px;background:#f1f5f9;border:1px solid #cbd5e1;border-radius:6px;cursor:pointer;" ${ws.unlockedHintCount >= ws.totalHintsCount ? 'disabled' : ''}>Get Hint (${ws.unlockedHintCount}/${ws.totalHintsCount})</button>
    </div>`;

    if (s.evaluation) {
      responseHtml += `<div class="g9-evaluation-feedback" style="margin-top:16px;padding:12px;border-radius:6px;background:#f0fdf4;border:1px solid #86efac;"><strong>Status: ${escapeHtml(s.evaluation.status)}</strong> (${s.evaluation.rawPoints ?? 0}/${s.evaluation.maxPoints} pts)<p style="margin:4px 0 0 0;font-size:13px;color:#475569;">Reason: ${escapeHtml(s.evaluation.reasonCode)}</p></div>`;
    }
    responseHtml += `<p role="status" data-question-status></p></div>`;

    return `<main class="g9-question-page" data-role="CORE2" data-orientation="${ws.layout.orientation}"><style>${questionCss}</style>
      <section data-slot="identity">
        <h1 style="margin:0 0 4px 0;font-size:20px;">${escapeHtml(q.title)}</h1>
        <div style="font-size:13px;color:#64748b;">Code: ${escapeHtml(q.code)} | Status: ${escapeHtml(q.status)} | Key: ${escapeHtml(q.keyStatus)}</div>
      </section>
      <div class="g9-workspace-split">
        <section data-slot="stimulus">
          ${stimulusHtml}
        </section>
        <section data-slot="response">
          ${responseHtml}
        </section>
      </div>
    </main>`;
  }
}

const questionCss = `
.g9-question-page{box-sizing:border-box;width:100%;max-width:100%;min-width:0;display:flex;flex-direction:column;gap:16px;padding:12px;overflow-wrap:anywhere;font-family:system-ui,sans-serif}
.g9-question-page *{box-sizing:border-box;min-width:0}
.g9-question-page [data-slot]{width:100%;padding:12px;border:1px solid #ccd7e1;border-radius:8px}
.g9-question-page .g9-workspace-split{display:flex;gap:16px;width:100%}
.g9-question-page[data-orientation=LANDSCAPE] .g9-workspace-split{flex-direction:row}
.g9-question-page[data-orientation=PORTRAIT] .g9-workspace-split,.g9-question-page[data-orientation=COMPACT] .g9-workspace-split{flex-direction:column}
.g9-question-page button,.g9-question-page input{min-height:48px;min-width:48px;max-width:100%;font:inherit}
.g9-question-page button{white-space:normal;overflow-wrap:anywhere}
.g9-question-page :focus-visible{outline:3px solid #125d82;outline-offset:2px}
@media(max-width:768px){.g9-question-page .g9-workspace-split{flex-direction:column!important}}
`;

export function mountQuestionPage(root: HTMLElement, c: QuestionPageController) {
  let active = true;
  const render = () => {
    if (!active) return;
    root.innerHTML = c.render();
  };
  const status = (message: string) => {
    const n = root.querySelector('[data-question-status]');
    if (n) n.textContent = message;
  };
  const click = async (event: Event) => {
    const b = event.target instanceof Element ? event.target.closest<HTMLButtonElement>('button') : null;
    if (!active || !b || b.disabled || !root.contains(b)) return;
    if (b.id === 'g9-submit-btn') {
      try {
        await c.submit();
        render();
      } catch (e: any) {
        status(e?.message ?? 'Submission error.');
      }
    } else if (b.id === 'g9-hint-btn') {
      const ws = c.getWorkspace();
      if (ws) {
        ws.unlockNextHint();
        render();
      }
    }
  };
  const change = (event: Event) => {
    const n = event.target;
    if (!active || !(n instanceof HTMLInputElement) || !root.contains(n)) return;
    const ws = c.getWorkspace();
    if (!ws) return;
    if (n.name === 'response-option') {
      if (n.type === 'radio') {
        ws.updateResponse({ kind: 'SINGLE_CHOICE', selectedOptionId: n.value });
      } else if (n.type === 'checkbox') {
        const checked = [...root.querySelectorAll<HTMLInputElement>('input[name=response-option]:checked')].map(x => x.value);
        ws.updateResponse({ kind: 'MULTIPLE_CHOICE', selectedOptionIds: checked });
      }
      const submitBtn = root.querySelector<HTMLButtonElement>('#g9-submit-btn');
      if (submitBtn) submitBtn.disabled = !ws.getViewState().canSubmit;
    }
  };
  const input = (event: Event) => {
    const n = event.target;
    if (!active || !(n instanceof HTMLInputElement) || !root.contains(n)) return;
    const ws = c.getWorkspace();
    if (!ws) return;
    if (n.id === 'g9-quantity-input') {
      ws.updateResponse({ kind: 'NUMERIC_QUANTITY', quantity: { decimal: n.value, magnitude: Number(n.value), unit: '' } });
    }
  };
  root.addEventListener('click', click);
  root.addEventListener('change', change);
  root.addEventListener('input', input);
  render();
  return {
    refresh: () => render(),
    dispose() {
      if (!active) return;
      active = false;
      root.removeEventListener('click', click);
      root.removeEventListener('change', change);
      root.removeEventListener('input', input);
      root.replaceChildren();
    }
  };
}

export function createQuestionPage(
  subjectCode?: string,
  topicCode?: string
): QuestionPageController {
  return new QuestionPageController(subjectCode, topicCode);
}
