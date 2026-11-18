/**
 * web/components/chemical-work.ts
 * A28 — Chemical representation workspace component controller.
 *
 * Implements:
 * - Structure capture (SMILES, Formula, SVG diagram preview)
 * - Accessible text representation for screen readers
 * - Reaction mechanism steps builder and progression
 * - Chemical equation stoichiometry balance checker
 * - Spectra viewer and accessible peak data
 * - Keyboard-only alternative for all chemical manipulation
 * - Exact draft restoration with zero data loss
 * - Strict pedagogical invariant: CHEM E2 & E3 work is NEVER auto-graded;
 *   evaluations default to REVIEW_PENDING with score withheld (points: null).
 * - 48px minimum hit target size on all interactive buttons and inputs.
 *
 * No academic approval inferred from software validation.
 */

import { HIT_TARGET_MIN_PX } from '../styles/tokens.ts';
import {
  parseFormula,
  formatHillFormula,
  calculateMolarMass,
  validateSMILES,
  generateAccessibleStructureText,
  renderStructureSvg,
} from '../adapters/chemistry/structure.ts';
import {
  checkReactionBalance,
  ReactionMechanismManager,
} from '../adapters/chemistry/reactions.ts';
import {
  generateAccessibleSpectraText,
  renderSpectrumSvg,
} from '../adapters/chemistry/spectra.ts';
import type {
  ChemExamArchetype,
  ChemicalStructureData,
  ReactionStep,
  ChemicalSpectrum,
  ChemicalWorkDraft,
  ChemicalEvaluation,
} from '../adapters/chemistry/types.ts';
import type { ReactionBalanceResult } from '../adapters/chemistry/reactions.ts';

export type ChemicalWorkspaceTab = 'STRUCTURE' | 'MECHANISM' | 'EQUATION' | 'SPECTRA';

export interface ChemicalWorkConfig {
  readonly archetype: ChemExamArchetype;
  readonly initialStructure?: ChemicalStructureData;
  readonly initialSteps?: readonly ReactionStep[];
  readonly initialEquation?: string;
  readonly spectra?: readonly ChemicalSpectrum[];
  readonly maxPoints?: number;
  readonly learnerNotes?: string;
}

export interface ChemicalWorkViewState {
  readonly archetype: ChemExamArchetype;
  readonly activeTab: ChemicalWorkspaceTab;
  readonly structure?: ChemicalStructureData;
  readonly structureSvg: string;
  readonly accessibleStructureText: string;
  readonly mechanismSteps: readonly ReactionStep[];
  readonly accessibleMechanismSummary: string;
  readonly equation: string;
  readonly balanceResult: ReactionBalanceResult;
  readonly spectra: readonly ChemicalSpectrum[];
  readonly activeSpectrumId: string | null;
  readonly learnerNotes: string;
  readonly evaluation: ChemicalEvaluation | null;
  readonly minHitTargetPx: number;
}

export class ChemicalWorkWorkspaceController {
  private archetype: ChemExamArchetype;
  private activeTab: ChemicalWorkspaceTab = 'STRUCTURE';
  private structure: ChemicalStructureData | null = null;
  private mechanismManager: ReactionMechanismManager;
  private equation: string = '';
  private spectra: ChemicalSpectrum[] = [];
  private activeSpectrumId: string | null = null;
  private learnerNotes: string = '';
  private maxPoints: number = 10;
  private revision: number = 1;
  private evaluation: ChemicalEvaluation | null = null;

  constructor(config: ChemicalWorkConfig) {
    this.archetype = config.archetype;
    this.mechanismManager = new ReactionMechanismManager(config.initialSteps || []);
    this.equation = config.initialEquation || '';
    this.spectra = config.spectra ? [...config.spectra] : [];
    this.activeSpectrumId = this.spectra.length > 0 ? this.spectra[0]!.id : null;
    this.maxPoints = config.maxPoints ?? 10;
    this.learnerNotes = config.learnerNotes || '';

    if (config.initialStructure) {
      this.setStructure(config.initialStructure);
    }
  }

  // --- Active Tab Management ---

  getActiveTab(): ChemicalWorkspaceTab {
    return this.activeTab;
  }

  setActiveTab(tab: ChemicalWorkspaceTab): void {
    this.activeTab = tab;
  }

  // --- Structure Operations ---

  getStructure(): ChemicalStructureData | null {
    return this.structure;
  }

  setStructure(data: ChemicalStructureData): void {
    const accessibleLabel = generateAccessibleStructureText(data);
    let formula = data.molecularFormula;
    let molarMass = data.molarMass;

    if (!formula) {
      if (data.format === 'FORMULA') {
        const counts = parseFormula(data.data);
        formula = formatHillFormula(counts);
        molarMass = calculateMolarMass(counts);
      } else if (data.format === 'SMILES') {
        const res = validateSMILES(data.data);
        if (res.isValid) {
          formula = res.estimatedFormula;
          molarMass = calculateMolarMass(res.atomCounts);
        }
      }
    }

    this.structure = {
      format: data.format,
      data: data.data,
      accessibleLabel,
      molecularFormula: formula,
      molarMass,
      iupacName: data.iupacName,
    };
    this.revision++;
  }

  /**
   * Keyboard-accessible structure input: sets structure using direct formula or SMILES text.
   */
  setStructureFromKeyboard(format: 'FORMULA' | 'SMILES', text: string, iupacName?: string): void {
    const trimmed = text.trim();
    if (!trimmed) {
      this.structure = null;
      this.revision++;
      return;
    }

    this.setStructure({
      format,
      data: trimmed,
      accessibleLabel: '',
      iupacName,
    });
  }

  // --- Reaction Mechanism Operations ---

  getMechanismSteps(): readonly ReactionStep[] {
    return this.mechanismManager.getSteps();
  }

  addMechanismStep(step: Omit<ReactionStep, 'stepNumber'>): ReactionStep {
    const res = this.mechanismManager.addStep(step);
    this.revision++;
    return res;
  }

  /**
   * Keyboard-accessible mechanism step builder.
   */
  addMechanismStepFromKeyboard(
    equation: string,
    reagents: string = '',
    conditions: string = '',
    mechanismType?: ReactionStep['mechanismType'],
    notes: string = ''
  ): ReactionStep {
    const id = `mech-step-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const accessibleDescription = `Step: ${equation}${reagents ? ', Reagents: ' + reagents : ''}${conditions ? ', Conditions: ' + conditions : ''}`;
    return this.addMechanismStep({
      id,
      equation,
      reagents,
      conditions,
      mechanismType,
      notes,
      accessibleDescription,
    });
  }

  updateMechanismStep(id: string, updates: Partial<Omit<ReactionStep, 'id' | 'stepNumber'>>): boolean {
    const res = this.mechanismManager.updateStep(id, updates);
    if (res) this.revision++;
    return res;
  }

  removeMechanismStep(id: string): boolean {
    const res = this.mechanismManager.removeStep(id);
    if (res) this.revision++;
    return res;
  }

  reorderMechanismSteps(fromIndex: number, toIndex: number): boolean {
    const res = this.mechanismManager.reorderSteps(fromIndex, toIndex);
    if (res) this.revision++;
    return res;
  }

  // --- Chemical Equation Operations ---

  getEquation(): string {
    return this.equation;
  }

  setEquation(eq: string): void {
    this.equation = eq;
    this.revision++;
  }

  checkBalance(): ReactionBalanceResult {
    return checkReactionBalance(this.equation);
  }

  // --- Spectra Operations ---

  getSpectra(): readonly ChemicalSpectrum[] {
    return [...this.spectra];
  }

  getActiveSpectrum(): ChemicalSpectrum | null {
    if (!this.activeSpectrumId) return null;
    return this.spectra.find((s) => s.id === this.activeSpectrumId) || null;
  }

  setActiveSpectrumId(id: string): void {
    if (this.spectra.some((s) => s.id === id)) {
      this.activeSpectrumId = id;
    }
  }

  addSpectrum(spectrum: ChemicalSpectrum): void {
    this.spectra.push(spectrum);
    if (!this.activeSpectrumId) {
      this.activeSpectrumId = spectrum.id;
    }
    this.revision++;
  }

  // --- Learner Notes ---

  getLearnerNotes(): string {
    return this.learnerNotes;
  }

  setLearnerNotes(notes: string): void {
    this.learnerNotes = notes;
    this.revision++;
  }

  // --- Draft State Persistence (Roundtrip) ---

  exportDraft(): ChemicalWorkDraft {
    return {
      archetype: this.archetype,
      structure: this.structure || undefined,
      mechanismSteps: this.mechanismManager.getSteps(),
      balancedEquation: this.equation || undefined,
      spectra: [...this.spectra],
      learnerNotes: this.learnerNotes,
      revision: this.revision,
      lastModifiedAt: new Date().toISOString(),
    };
  }

  restoreDraft(draft: ChemicalWorkDraft): void {
    this.archetype = draft.archetype;
    this.structure = draft.structure || null;
    this.mechanismManager = new ReactionMechanismManager(draft.mechanismSteps);
    this.equation = draft.balancedEquation || '';
    this.spectra = draft.spectra ? [...draft.spectra] : [];
    this.activeSpectrumId = this.spectra.length > 0 ? this.spectra[0]!.id : null;
    this.learnerNotes = draft.learnerNotes || '';
    this.revision = draft.revision + 1;
    this.evaluation = null;
  }

  // --- Pedagogical Invariant & Evaluation ---

  /**
   * Strictly enforces the pedagogical invariant:
   * Complex chemical structures (CHEM_E2) and reaction mechanisms/experimental spectra (CHEM_E3)
   * MUST NEVER be auto-graded. Evaluator returns REVIEW_PENDING with points: null.
   *
   * Only closed CHEM_E1 questions (e.g. stoichiometric integer or balanced single equation check)
   * may receive a deterministic score, or remain REVIEW_PENDING.
   */
  evaluate(): ChemicalEvaluation {
    if (this.archetype === 'CHEM_E2') {
      const evaluation: ChemicalEvaluation = {
        status: 'REVIEW_PENDING',
        points: null,
        maxPoints: this.maxPoints,
        feedback: 'Chemical structure and reaction mechanism derivations require expert chemical review. Score withheld.',
        isAutoGraded: false,
        rubricCriteria: [
          { name: 'Structural Correctness & Valency', maxPoints: 4, awardedPoints: null, reviewerNotes: null },
          { name: 'Arrow-Pushing Mechanism Sequence', maxPoints: 4, awardedPoints: null, reviewerNotes: null },
          { name: 'Reagents, Conditions & Intermediates', maxPoints: 2, awardedPoints: null, reviewerNotes: null },
        ],
      };
      this.evaluation = evaluation;
      return evaluation;
    }

    if (this.archetype === 'CHEM_E3') {
      const evaluation: ChemicalEvaluation = {
        status: 'REVIEW_PENDING',
        points: null,
        maxPoints: this.maxPoints,
        feedback: 'Experimental spectroscopic analysis and synthesis routes require domain assessment. Score withheld.',
        isAutoGraded: false,
        rubricCriteria: [
          { name: 'Spectral Peak Identification & Assignment', maxPoints: 5, awardedPoints: null, reviewerNotes: null },
          { name: 'Deductive Structure Elucidation', maxPoints: 5, awardedPoints: null, reviewerNotes: null },
        ],
      };
      this.evaluation = evaluation;
      return evaluation;
    }

    // CHEM_E1: Basic stoichiometry / closed equation
    const balance = this.checkBalance();
    if (!this.equation.trim()) {
      const evaluation: ChemicalEvaluation = {
        status: 'INVALID',
        points: 0,
        maxPoints: this.maxPoints,
        feedback: 'No chemical equation entered.',
        isAutoGraded: true,
      };
      this.evaluation = evaluation;
      return evaluation;
    }

    if (balance.isBalanced) {
      const evaluation: ChemicalEvaluation = {
        status: 'SCORED',
        points: this.maxPoints,
        maxPoints: this.maxPoints,
        feedback: 'Chemical equation is stoichiometrically balanced across all elements.',
        isAutoGraded: true,
      };
      this.evaluation = evaluation;
      return evaluation;
    } else {
      const imbalSummary = balance.imbalances
        .map((i) => `${i.element}: ${i.reactantCount} reactants vs ${i.productCount} products`)
        .join(', ');
      const evaluation: ChemicalEvaluation = {
        status: 'SCORED',
        points: 0,
        maxPoints: this.maxPoints,
        feedback: `Equation is not balanced: ${imbalSummary}.`,
        isAutoGraded: true,
      };
      this.evaluation = evaluation;
      return evaluation;
    }
  }

  // --- View State & HTML Rendering ---

  getViewState(): ChemicalWorkViewState {
    const balanceResult = this.checkBalance();
    const accessibleStructureText = this.structure
      ? generateAccessibleStructureText(this.structure)
      : 'No chemical structure specified.';
    const structureSvg = this.structure
      ? renderStructureSvg(this.structure)
      : '';
    const accessibleMechanismSummary = this.mechanismManager.generateAccessibleSummary();

    return {
      archetype: this.archetype,
      activeTab: this.activeTab,
      structure: this.structure || undefined,
      structureSvg,
      accessibleStructureText,
      mechanismSteps: this.mechanismManager.getSteps(),
      accessibleMechanismSummary,
      equation: this.equation,
      balanceResult,
      spectra: [...this.spectra],
      activeSpectrumId: this.activeSpectrumId,
      learnerNotes: this.learnerNotes,
      evaluation: this.evaluation,
      minHitTargetPx: HIT_TARGET_MIN_PX,
    };
  }

  /**
   * Renders static HTML with accessible semantic markup and 48px hit targets.
   */
  render(): string {
    const state = this.getViewState();

    const tabsHtml = `
      <div class="chem-tabs" role="tablist" style="display: flex; gap: 8px; margin-bottom: 16px;">
        <button role="tab" aria-selected="${state.activeTab === 'STRUCTURE'}" class="chem-tab-btn" data-tab="STRUCTURE" style="min-height: ${HIT_TARGET_MIN_PX}px; min-width: ${HIT_TARGET_MIN_PX}px; padding: 12px 20px; font-weight: 600;">Structure</button>
        <button role="tab" aria-selected="${state.activeTab === 'MECHANISM'}" class="chem-tab-btn" data-tab="MECHANISM" style="min-height: ${HIT_TARGET_MIN_PX}px; min-width: ${HIT_TARGET_MIN_PX}px; padding: 12px 20px; font-weight: 600;">Mechanism (${state.mechanismSteps.length})</button>
        <button role="tab" aria-selected="${state.activeTab === 'EQUATION'}" class="chem-tab-btn" data-tab="EQUATION" style="min-height: ${HIT_TARGET_MIN_PX}px; min-width: ${HIT_TARGET_MIN_PX}px; padding: 12px 20px; font-weight: 600;">Equation</button>
        <button role="tab" aria-selected="${state.activeTab === 'SPECTRA'}" class="chem-tab-btn" data-tab="SPECTRA" style="min-height: ${HIT_TARGET_MIN_PX}px; min-width: ${HIT_TARGET_MIN_PX}px; padding: 12px 20px; font-weight: 600;">Spectra (${state.spectra.length})</button>
      </div>
    `;

    let contentHtml = '';

    if (state.activeTab === 'STRUCTURE') {
      contentHtml = `
        <div class="chem-pane-structure" role="tabpanel">
          <div class="structure-preview" style="margin-bottom: 16px;">
            ${state.structureSvg || '<div class="empty-structure" style="padding: 24px; background: #f1f5f9; border-radius: 8px;">No structure captured yet. Type formula or SMILES below.</div>'}
          </div>
          <div class="sr-only" aria-live="polite">${state.accessibleStructureText}</div>
          <div class="keyboard-structure-input" style="display: flex; flex-direction: column; gap: 12px;">
            <label for="chem-input-data" style="font-weight: 600;">Structure Data (Formula or SMILES):</label>
            <input id="chem-input-data" type="text" value="${state.structure ? state.structure.data : ''}" placeholder="e.g. C2H5OH or CCO" style="min-height: ${HIT_TARGET_MIN_PX}px; padding: 10px 14px; font-size: 16px; border: 1px solid #cbd5e1; border-radius: 6px;" />
            <div style="font-size: 14px; color: #475569;">
              ${state.structure?.molecularFormula ? `Hill Formula: <strong>${state.structure.molecularFormula}</strong>` : ''}
              ${state.structure?.molarMass ? ` | Molar Mass: <strong>${state.structure.molarMass} g/mol</strong>` : ''}
            </div>
          </div>
        </div>
      `;
    } else if (state.activeTab === 'MECHANISM') {
      const stepsListHtml = state.mechanismSteps
        .map(
          (s) => `
          <li class="mechanism-step-item" style="padding: 12px; border: 1px solid #e2e8f0; border-radius: 6px; margin-bottom: 8px;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <strong>Step ${s.stepNumber}: ${s.equation}</strong>
              <button class="remove-step-btn" data-id="${s.id}" style="min-height: ${HIT_TARGET_MIN_PX}px; min-width: ${HIT_TARGET_MIN_PX}px; padding: 8px 12px; background: #fee2e2; border: 1px solid #f87171; border-radius: 6px;">Delete</button>
            </div>
            ${s.reagents ? `<div style="font-size: 13px; color: #475569;">Reagents: ${s.reagents}</div>` : ''}
            ${s.mechanismType ? `<div style="font-size: 13px; color: #2563eb;">Type: ${s.mechanismType}</div>` : ''}
          </li>`
        )
        .join('');

      contentHtml = `
        <div class="chem-pane-mechanism" role="tabpanel">
          <ol class="mechanism-steps-list" style="list-style: none; padding: 0;">
            ${stepsListHtml || '<p style="color: #64748b;">No reaction steps added yet.</p>'}
          </ol>
          <div class="sr-only" aria-live="polite">${state.accessibleMechanismSummary}</div>
          <button id="add-mechanism-step-btn" style="min-height: ${HIT_TARGET_MIN_PX}px; min-width: ${HIT_TARGET_MIN_PX}px; padding: 12px 20px; background: #2563eb; color: #ffffff; border-radius: 6px; font-weight: 600;">+ Add Mechanism Step</button>
        </div>
      `;
    } else if (state.activeTab === 'EQUATION') {
      const balanceBadge = state.balanceResult.isBalanced
        ? `<span style="background: #dcfce7; color: #166534; padding: 4px 10px; border-radius: 9999px; font-weight: 600;">Balanced</span>`
        : `<span style="background: #fee2e2; color: #991b1b; padding: 4px 10px; border-radius: 9999px; font-weight: 600;">Unbalanced</span>`;

      contentHtml = `
        <div class="chem-pane-equation" role="tabpanel">
          <div style="margin-bottom: 16px;">
            <label for="chem-equation-input" style="font-weight: 600; display: block; margin-bottom: 8px;">Reaction Equation:</label>
            <input id="chem-equation-input" type="text" value="${state.equation}" placeholder="e.g. 2 H2 + O2 -> 2 H2O" style="width: 100%; min-height: ${HIT_TARGET_MIN_PX}px; padding: 10px 14px; font-size: 16px; border: 1px solid #cbd5e1; border-radius: 6px;" />
          </div>
          <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
            <div>Status: ${balanceBadge}</div>
          </div>
          ${
            state.balanceResult.imbalances.length > 0
              ? `<ul style="color: #b91c1c; font-size: 14px;">${state.balanceResult.imbalances.map((i) => `<li>${i.element}: ${i.reactantCount} in reactants vs ${i.productCount} in products</li>`).join('')}</ul>`
              : ''
          }
        </div>
      `;
    } else if (state.activeTab === 'SPECTRA') {
      const activeSpec = this.getActiveSpectrum();
      const specSvg = activeSpec ? renderSpectrumSvg(activeSpec) : '';
      const accessibleSpecText = activeSpec ? generateAccessibleSpectraText(activeSpec) : 'No spectra available.';

      contentHtml = `
        <div class="chem-pane-spectra" role="tabpanel">
          <div class="spectra-preview" style="margin-bottom: 16px;">
            ${specSvg || '<p>No spectra available.</p>'}
          </div>
          <div class="sr-only" aria-live="polite">${accessibleSpecText}</div>
          <div class="spectra-table-container">
            <h4>Accessible Peak Table (Keyboard Alternative)</h4>
            <table style="width: 100%; border-collapse: collapse; font-size: 14px;" role="table" aria-label="Spectral Peaks">
              <thead>
                <tr style="background: #f1f5f9; text-align: left;">
                  <th style="padding: 8px; border: 1px solid #cbd5e1;">Position (${activeSpec?.unit || ''})</th>
                  <th style="padding: 8px; border: 1px solid #cbd5e1;">Intensity</th>
                  <th style="padding: 8px; border: 1px solid #cbd5e1;">Multiplicity</th>
                  <th style="padding: 8px; border: 1px solid #cbd5e1;">Assignment</th>
                </tr>
              </thead>
              <tbody>
                ${
                  activeSpec?.peaks
                    .map(
                      (p) => `
                  <tr>
                    <td style="padding: 8px; border: 1px solid #e2e8f0;">${p.position}</td>
                    <td style="padding: 8px; border: 1px solid #e2e8f0;">${(p.intensity * 100).toFixed(0)}%</td>
                    <td style="padding: 8px; border: 1px solid #e2e8f0;">${p.multiplicity || '-'}</td>
                    <td style="padding: 8px; border: 1px solid #e2e8f0;">${p.label || '-'}</td>
                  </tr>`
                    )
                    .join('') || '<tr><td colspan="4" style="padding: 8px;">No peaks</td></tr>'
                }
              </tbody>
            </table>
          </div>
        </div>
      `;
    }

    return `
      <section class="chemical-work-workspace" aria-label="Chemical Representation Workspace" data-archetype="${state.archetype}">
        ${tabsHtml}
        ${contentHtml}
      </section>
    `;
  }
}
