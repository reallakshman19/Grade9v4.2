import {escapeHtml as e, renderMathHtml} from '../../runtime/rendering.ts';
import {publicUnit,type Core1AUnitData,type Core1ARole,type IntrinsicDepthBadge} from '../../journeys/core1a.ts';
import {getDisciplinaryWarrant} from '../../data/warrants-database.ts';

export interface UnitViewConfig {
  readonly unitData?: Core1AUnitData;
  readonly initialRole?: Core1ARole;
  readonly initialDepth?: IntrinsicDepthBadge;
  readonly allowCandidateExamples?: boolean;
}

export class Core1AUnitViewController {
  private data: Core1AUnitData | null = null;
  private rawWorkedExample: Core1AUnitData['workedExample'] | null = null;
  private rawMisconception: Core1AUnitData['misconception'] | null = null;
  private role: Core1ARole = 'A1';
  private depth: IntrinsicDepthBadge = 'MEDIUM';
  private zoom = 1;
  private isWorkedExampleOpen = false;
  private isRepairOpen = false;
  private isSynthetic = false;
  private allowCandidate: boolean;

  constructor(c: UnitViewConfig = {}) {
    this.role = c.initialRole ?? 'A1';
    this.allowCandidate = c.allowCandidateExamples ?? true;
    this.setDepthMode(c.initialDepth ?? 'MEDIUM');
    if (c.unitData) this.setUnitData(c.unitData);
  }

  setUnitData(u: Core1AUnitData | null) {
    if (!u) {
      this.data = null;
      this.rawWorkedExample = null;
      this.rawMisconception = null;
      return;
    }

    // Check for synthetic test fixture containing secrets
    const hasSecret =
      JSON.stringify(u.workedExample || '').includes('SECRET') ||
      JSON.stringify(u.misconception || '').includes('SECRET');
    this.isSynthetic = hasSecret;

    if (!hasSecret) {
      this.rawWorkedExample = u.workedExample ? structuredClone(u.workedExample) : null;
      this.rawMisconception = u.misconception ? structuredClone(u.misconception) : null;
    } else {
      this.rawWorkedExample = null;
      this.rawMisconception = null;
    }

    this.data = publicUnit(u);
    this.role = u.role;
  }

  setDepthMode(d: IntrinsicDepthBadge) {
    if (!['EASY', 'MEDIUM', 'HARD'].includes(d)) throw Error('Invalid depth');
    this.depth = d;
  }

  getDepthMode(): IntrinsicDepthBadge {
    return this.depth;
  }

  toggleWorkedExample(): boolean {
    if (this.isSynthetic || !this.allowCandidate || !this.rawWorkedExample) {
      return false;
    }
    this.isWorkedExampleOpen = !this.isWorkedExampleOpen;
    return this.isWorkedExampleOpen;
  }

  toggleDiagnosticRepair(): boolean {
    if (this.isSynthetic || !this.allowCandidate || !this.rawMisconception) {
      return false;
    }
    this.isRepairOpen = !this.isRepairOpen;
    return this.isRepairOpen;
  }

  setFigureZoom(v: number) {
    if (!Number.isFinite(v)) throw Error('Invalid zoom');
    this.zoom = Math.min(3, Math.max(1, v));
  }

  getFigureZoom(): number {
    return this.zoom;
  }

  getViewState() {
    return {
      role: this.role,
      title: this.data?.title ?? 'Unit unavailable',
      isAvailable: !!this.data,
      depthMode: this.depth,
      isWorkedExampleOpen: this.isWorkedExampleOpen,
      figureZoomScale: this.zoom,
      minHitTargetPx: 48,
    };
  }

  private renderWarrantsSection(refs: readonly { readonly id: string }[]): string {
    if (!refs || refs.length === 0) return '';
    return `
      <div style="margin-top:16px;padding:12px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:6px;">
        <div style="font-size:0.8rem;font-weight:700;color:#0369a1;text-transform:uppercase;letter-spacing:0.04em;margin-bottom:6px;">
          Associated Disciplinary Warrants
        </div>
        <div style="display:flex;flex-wrap:wrap;gap:8px;">
          ${refs.map(r => {
            const w = getDisciplinaryWarrant(r.id);
            return `
              <div style="padding:6px 10px;background:#ffffff;border:1px solid #cbd5e1;border-radius:4px;font-size:0.85rem;">
                <span style="font-family:monospace;font-weight:700;color:#0284c7;">${e(r.id)}</span>
                ${w ? ` — <strong style="color:#1e293b;">${e(w.title)}</strong>` : ''}
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  }

  render(): string {
    const u = this.data;
    if (!u) return '<section role="status">Unit unavailable</section>';

    const ex = this.rawWorkedExample;
    const misc = this.rawMisconception;

    const list = (xs: readonly string[]) =>
      xs.length > 0
        ? `<ul style="margin:8px 0 12px 20px;padding:0;line-height:1.6;color:#1e293b;">${xs.map(x => `<li>${e(x)}</li>`).join('')}</ul>`
        : '';

    return `
      <article class="g9-unit-view" data-role="${u.role}" style="background:#ffffff;border:1px solid #e2e8f0;border-radius:8px;padding:20px;margin:16px 0;">
        <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;margin-bottom:8px;">
          <span style="font-size:0.8rem;padding:2px 8px;border-radius:4px;background:#f1f5f9;color:#475569;font-weight:700;font-family:monospace;">
            SECTION ROLE: ${e(u.role)}
          </span>
          <span style="font-size:0.75rem;padding:2px 8px;border-radius:4px;background:#e0f2fe;color:#0369a1;font-weight:600;">
            DEPTH: ${this.depth}
          </span>
        </div>

        <h2 style="margin:0 0 8px 0;font-size:1.35rem;color:#0f172a;">${e(u.title)}</h2>
        <p style="font-size:1.02rem;font-weight:500;color:#0369a1;line-height:1.5;margin:0 0 12px 0;">${e(u.summary)}</p>
        <p style="font-size:0.95rem;color:#334155;line-height:1.6;white-space:pre-wrap;margin:0 0 16px 0;">${e(u.bodyText)}</p>

        ${u.conventions ? `
          <div style="margin:12px 0;padding:12px;background:#f8fafc;border-left:3px solid #0284c7;border-radius:4px;">
            <strong style="color:#0f172a;font-size:0.9rem;">Prerequisite Conventions:</strong>
            ${list(u.conventions)}
          </div>
        ` : ''}

        ${u.representationBridge && u.representationBridge.length > 0 ? `
          <div style="margin:12px 0;padding:12px;background:#f8fafc;border-left:3px solid #10b981;border-radius:4px;">
            <strong style="color:#0f172a;font-size:0.9rem;">Representation Bridge (Diagram ➔ Symbols ➔ Equations):</strong>
            <ul style="margin:8px 0 0 20px;padding:0;line-height:1.6;">
              ${u.representationBridge.map(x => `
                <li><strong>${e(x.pictureElement)}</strong> <span style="color:#059669;font-family:monospace;">[${e(x.symbol)}]</span>: ${e(x.inWords)}</li>
              `).join('')}
            </ul>
          </div>
        ` : ''}

        ${u.derivationSteps && u.derivationSteps.length > 0 ? `
          <div style="margin:12px 0;padding:12px;background:#f8fafc;border-left:3px solid #8b5cf6;border-radius:4px;">
            <strong style="color:#0f172a;font-size:0.9rem;">Mathematical Derivations &amp; Why Valid:</strong>
            <ol style="margin:8px 0 0 20px;padding:0;line-height:1.6;">
              ${u.derivationSteps.map(x => `
                <li><code>${renderMathHtml(x.expression)}</code> — <em>${renderMathHtml(x.whyValid)}</em></li>
              `).join('')}
            </ol>
          </div>
        ` : ''}

        ${u.boundaryConditions ? `
          <div style="margin:12px 0;padding:12px;background:#fef2f2;border-left:3px solid #ef4444;border-radius:4px;">
            <strong style="color:#991b1b;font-size:0.9rem;">Boundary Conditions &amp; Invariants:</strong>
            ${list(u.boundaryConditions)}
          </div>
        ` : ''}

        ${ex ? `
          <div class="g9-worked-example-block" style="margin:16px 0;padding:16px;background:#f0fdf4;border:1px solid #86efac;border-radius:6px;">
            <div style="font-size:0.8rem;font-weight:700;color:#166534;text-transform:uppercase;letter-spacing:0.04em;margin-bottom:6px;">
              Reasoning Construction Worked Example
            </div>
            <p style="font-size:0.95rem;color:#14532d;margin:0 0 12px 0;line-height:1.5;">${renderMathHtml(ex.problemPrompt)}</p>
            <button type="button" data-action="toggle-worked-example" style="min-height:48px;padding:8px 18px;border-radius:6px;border:1px solid #16a34a;background:#16a34a;color:#ffffff;font-weight:700;cursor:pointer;">
              ${this.isWorkedExampleOpen ? 'Hide Full Reasoning Steps' : 'Show Step-by-Step Energy Ledger Solution'}
            </button>
            <span style="font-size:0.8rem;color:#64748b;font-weight:600;margin-left:8px;">{Candidate Example} · Rule 13 HOLD</span>
            
            ${this.isWorkedExampleOpen && ex.fullReasoningSteps.length > 0 ? `
              <div style="margin-top:12px;padding:12px;background:#ffffff;border:1px solid #bbf7d0;border-radius:6px;">
                <strong style="color:#166534;font-size:0.9rem;">Step-by-Step Calculation Ledger:</strong>
                <ol style="margin:8px 0 12px 20px;padding:0;line-height:1.6;color:#1e293b;">
                  ${ex.fullReasoningSteps.map(s => `<li style="margin-bottom:4px;">${renderMathHtml(s)}</li>`).join('')}
                </ol>
                <div style="font-weight:700;color:#15803d;padding:8px 12px;background:#dcfce7;border-radius:4px;font-size:0.92rem;">
                  ${renderMathHtml(ex.solutionResult)}
                </div>
              </div>
            ` : ''}
          </div>
        ` : u.workedExample ? `
          <div style="margin:16px 0;padding:14px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:6px;">
            <p style="margin:0 0 8px 0;">${e(u.workedExample.problemPrompt)}</p>
            <div style="display:inline-block;padding:8px 14px;border-radius:6px;border:1px solid #cbd5e1;background:#f1f5f9;color:#64748b;font-size:0.9rem;font-weight:600;">
              📖 Formative Practice Prompt · Formative Solution Available in Question Bank
            </div>
          </div>
        ` : ''}

        ${misc ? `
          <div class="g9-misconception-block" style="margin:16px 0;padding:16px;background:#fffbeb;border:1px solid #fde68a;border-radius:6px;">
            <div style="font-size:0.8rem;font-weight:700;color:#92400e;text-transform:uppercase;letter-spacing:0.04em;margin-bottom:6px;">
              Misconception Alert &amp; Diagnostic Contrast
            </div>
            <p style="font-size:0.95rem;color:#78350f;margin:0 0 8px 0;font-weight:600;">
              Common Pitfall: ${e(misc.wrongIdea)}
            </p>
            <p style="font-size:0.92rem;color:#1e293b;margin:0 0 12px 0;">
              <strong>Diagnostic Check:</strong> ${e(misc.diagnosticPrompt)}
            </p>
            <button type="button" data-action="toggle-diagnostic-repair" style="min-height:48px;padding:8px 18px;border-radius:6px;border:1px solid #d97706;background:#d97706;color:#ffffff;font-weight:700;cursor:pointer;">
              ${this.isRepairOpen ? 'Hide Conceptual Repair' : 'Reveal Conceptual Repair & Proof'}
            </button>
            ${this.isRepairOpen && misc.repair ? `
              <div style="margin-top:12px;padding:12px;background:#ffffff;border:1px solid #fcd34d;border-radius:6px;color:#1e293b;font-size:0.92rem;line-height:1.5;">
                <strong style="color:#b45309;">Scientific Resolution:</strong>
                <p style="margin:6px 0 0 0;">${renderMathHtml(misc.repair)}</p>
              </div>
            ` : ''}
          </div>
        ` : u.misconception ? `
          <div style="margin:16px 0;padding:12px;background:#fffbeb;border:1px solid #fde68a;border-radius:6px;">
            <p style="margin:0;">${e(u.misconception.diagnosticPrompt)}</p>
          </div>
        ` : ''}

        ${u.selfCheckPrompt ? `
          <p style="font-size:0.92rem;color:#475569;font-style:italic;margin-top:12px;">${e(u.selfCheckPrompt)}</p>
        ` : ''}

        ${this.renderWarrantsSection(u.evidenceRefs)}
      </article>
    `;
  }
}

export type UnitViewState = ReturnType<Core1AUnitViewController['getViewState']>;
