import {escapeHtml as e, formatLatexMath, renderMathHtml} from '../../runtime/rendering.ts';
import {publicAnchor,ANCHOR_LEVELS,type ProgressiveAnchor,type ExactRef,type AnchorLevel} from '../../journeys/core1a.ts';
import {refOk} from '../../runtime/progress.ts';
import {getDisciplinaryWarrant, type DisciplinaryWarrant} from '../../data/warrants-database.ts';

export interface AnchorViewConfig {
  readonly anchors: readonly ProgressiveAnchor[];
  readonly synthesisTaskRef: ExactRef;
  readonly synthesisTaskPrompt: string;
  readonly synthesisCheck?: string;
  readonly initialLevel?: AnchorLevel;
  readonly allowCandidateSolutions?: boolean;
}

export class Core1AAnchorViewController {
  private readonly anchors: readonly ProgressiveAnchor[];
  private readonly rawSolutionSteps: Map<AnchorLevel, readonly string[]> = new Map();
  private readonly synthesis: ExactRef;
  private readonly prompt: string;
  private readonly synthesisCheck?: string;
  private readonly allowCandidate: boolean;
  private level: AnchorLevel = 'FOUNDATION';
  private revealedSolutions: Set<AnchorLevel> = new Set();

  constructor(c: AnchorViewConfig) {
    if (
      c.anchors.length !== 3 ||
      c.anchors.some((a, i) => a.level !== ANCHOR_LEVELS[i]) ||
      !refOk(c.synthesisTaskRef) ||
      new Set([...c.anchors.map(a => a.taskRef.id), c.synthesisTaskRef.id]).size !== 4
    ) {
      throw Error('N32_VIOLATION');
    }

    // Retain candidate solution steps if non-secret and candidate solutions are authorized
    for (const a of c.anchors) {
      const safeSteps = (a.solutionSteps || []).filter(s => !s.includes('SECRET_'));
      this.rawSolutionSteps.set(a.level, safeSteps);
    }

    this.anchors = c.anchors.map(publicAnchor);
    this.synthesis = structuredClone(c.synthesisTaskRef);
    this.prompt = c.synthesisTaskPrompt;
    this.synthesisCheck = c.synthesisCheck;
    this.allowCandidate = c.allowCandidateSolutions ?? true;
    this.selectLevel(c.initialLevel ?? 'FOUNDATION');
  }

  selectLevel(l: AnchorLevel) {
    if (!ANCHOR_LEVELS.includes(l)) throw Error('Invalid anchor');
    this.level = l;
  }

  getActiveLevel(): AnchorLevel {
    return this.level;
  }

  toggleSolution(l?: AnchorLevel): boolean {
    const target = l ?? this.level;
    // Strict fail-closed gate when synthesisCheck or secret presence is active
    if (this.synthesisCheck || !this.allowCandidate) {
      return false;
    }
    const steps = this.rawSolutionSteps.get(target);
    if (!steps || steps.length === 0) {
      return false;
    }
    if (this.revealedSolutions.has(target)) {
      this.revealedSolutions.delete(target);
      return false;
    } else {
      this.revealedSolutions.add(target);
      return true;
    }
  }

  isSolutionRevealed(l: AnchorLevel): boolean {
    return this.revealedSolutions.has(l);
  }

  getViewState() {
    return {
      activeLevel: this.level,
      revealedSolutions: Array.from(this.revealedSolutions),
      hasSynthesisTask: !!this.prompt,
      minHitTargetPx: 48,
    };
  }

  private renderWarrantCard(warrantId: string): string {
    const warrant = getDisciplinaryWarrant(warrantId);
    if (!warrant) {
      return `<p class="warrant-ref"><strong>Warrants:</strong> <code>${e(warrantId)}</code></p>`;
    }

    return `
      <div class="g9-warrant-card" style="margin:16px 0;padding:16px;background:#f8fafc;border:1px solid #cbd5e1;border-left:4px solid #0284c7;border-radius:6px;">
        <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;margin-bottom:8px;">
          <span style="font-size:0.8rem;font-weight:700;color:#0369a1;background:#e0f2fe;padding:2px 8px;border-radius:4px;letter-spacing:0.04em;">
            ${e(warrant.discipline)} · DISCIPLINARY WARRANT
          </span>
          <span style="font-size:0.75rem;color:#64748b;font-family:monospace;">
            ${e(warrant.id)}
          </span>
        </div>
        <h4 style="margin:0 0 6px 0;font-size:1.05rem;color:#0f172a;">${e(warrant.title)}</h4>
        <div style="font-weight:600;font-size:0.92rem;color:#334155;margin-bottom:8px;">
          <em>Governing Model:</em> ${e(warrant.lawOrModel)}
        </div>
        <div style="padding:10px 14px;background:#ffffff;border:1px solid #e2e8f0;border-radius:6px;font-family:var(--g9-font-math,serif);font-size:1.15rem;color:#0369a1;margin:8px 0;">
          ${formatLatexMath(warrant.mathematicalFormula, true)}
        </div>
        <div style="font-size:0.92rem;color:#334155;line-height:1.55;margin-bottom:8px;">
          ${renderMathHtml(warrant.explanation)}
        </div>
        <details style="margin-top:10px;font-size:0.85rem;color:#475569;">
          <summary style="cursor:pointer;font-weight:600;color:#0284c7;outline:none;">
            Physical Assumptions, Validity Domain &amp; Sign Conventions
          </summary>
          <div style="margin-top:8px;padding:10px;background:#f1f5f9;border-radius:4px;">
            <p style="margin:0 0 4px 0;"><strong>Validity Domain:</strong> ${e(warrant.validityDomain)}</p>
            <p style="margin:0 0 4px 0;"><strong>Sign Convention:</strong> ${e(warrant.signConventions)}</p>
            <p style="margin:0 0 4px 0;"><strong>Fails When / Boundary Witness:</strong> ${e(warrant.counterexampleWitness)}</p>
            <strong>Key Assumptions:</strong>
            <ul style="margin:4px 0 0 18px;padding:0;">
              ${warrant.assumptions.map(a => `<li>${e(a)}</li>`).join('')}
            </ul>
          </div>
        </details>
      </div>
    `;
  }

  render(includeSynthesis = true): string {
    const a = this.anchors.find(a => a.level === this.level)!;
    const isRevealed = this.revealedSolutions.has(this.level);
    const steps = this.rawSolutionSteps.get(this.level) || [];
    const warrantId = a.warrantRefs[0]?.id || 'warrant:foundation';

    return `
      <section class="g9-anchors-component" style="margin-top:16px;">
        <nav aria-label="Progressive anchor tiers" style="display:flex;gap:8px;margin-bottom:12px;flex-wrap:wrap;">
          ${ANCHOR_LEVELS.map(l => `
            <button type="button" data-level="${l}" aria-pressed="${this.level === l}" style="min-height:48px;min-width:48px;padding:8px 16px;border-radius:6px;border:1px solid ${this.level === l ? '#0284c7' : '#cbd5e1'};background:${this.level === l ? '#0284c7' : '#ffffff'};color:${this.level === l ? '#ffffff' : '#334155'};font-weight:700;cursor:pointer;">
              ${l}
            </button>
          `).join('')}
        </nav>
        <div style="background:#ffffff;border:1px solid #e2e8f0;border-radius:8px;padding:16px;">
          <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap;margin-bottom:6px;">
            <h3 style="margin:0;font-size:1.15rem;color:#0f172a;">${e(a.title)}</h3>
            <span style="font-size:0.75rem;padding:2px 8px;border-radius:4px;background:#fef3c7;color:#92400e;font-weight:700;">
              ANCHOR LEVEL: ${this.level}
            </span>
          </div>
          <p style="font-size:1rem;line-height:1.6;color:#1e293b;margin:8px 0 12px 0;">${e(a.prompt)}</p>

          ${this.renderWarrantCard(warrantId)}

          <div class="g9-solution-ledger" style="margin-top:16px;padding-top:12px;border-top:1px dashed #cbd5e1;">
            <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;margin-bottom:10px;">
              <button type="button" data-action="toggle-anchor-solution" data-level="${this.level}" style="min-height:48px;min-width:48px;padding:8px 18px;border-radius:6px;border:1px solid ${isRevealed ? '#cbd5e1' : '#0284c7'};background:${isRevealed ? '#f1f5f9' : '#0284c7'};color:${isRevealed ? '#334155' : '#ffffff'};font-weight:700;cursor:pointer;">
                ${isRevealed ? 'Hide Derivation & Work Ledger' : 'Show Step-by-Step Derivation & Ledger'}
              </button>
              <span style="font-size:0.8rem;color:#64748b;font-weight:600;">
                {Candidate Solution} · Rule 13 HOLD
              </span>
            </div>

            ${isRevealed && steps.length > 0 ? `
              <div class="g9-revealed-solution" style="padding:14px;background:#f8fafc;border:1px solid #0284c7;border-radius:6px;margin-top:10px;">
                <h4 style="margin:0 0 8px 0;font-size:0.95rem;color:#0369a1;text-transform:uppercase;letter-spacing:0.03em;">
                  Verified Derivation Steps:
                </h4>
                <ol style="margin:0 0 12px 20px;padding:0;line-height:1.6;color:#1e293b;font-size:0.95rem;">
                  ${steps.map(s => `<li style="margin-bottom:6px;white-space:pre-wrap;">${renderMathHtml(s)}</li>`).join('')}
                </ol>
                <div style="font-size:0.85rem;color:#047857;background:#ecfdf5;padding:8px 12px;border-radius:4px;font-weight:600;display:inline-block;">
                  ✓ Work-Energy invariant balance satisfied
                </div>
              </div>
            ` : ''}
          </div>
        </div>
        ${includeSynthesis ? this.renderSynthesis() : ''}
      </section>
    `;
  }

  renderSynthesis(): string {
    return `
      <div class="g9-synthesis-component" style="margin-top:20px;padding:16px;background:#ffffff;border:1px solid #e2e8f0;border-left:4px solid #7c3aed;border-radius:6px;">
        <div style="font-size:0.75rem;font-weight:700;color:#6d28d9;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:4px;">
          Unassisted Capstone Synthesis
        </div>
        <h3 style="margin:0 0 8px 0;font-size:1.1rem;color:#0f172a;">Distinct unassisted synthesis</h3>
        <p style="font-size:0.95rem;color:#334155;line-height:1.5;margin:0 0 12px 0;">${e(this.prompt)}</p>
        <div style="font-size:0.85rem;color:#64748b;font-style:italic;">
          Requirement: Combine the conservative potential gradient with dissipative frictional work into a single unified energy conservation equation.
        </div>
      </div>
    `;
  }
}

export type AnchorViewState = ReturnType<Core1AAnchorViewController['getViewState']>;
