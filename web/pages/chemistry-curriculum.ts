/**
 * web/pages/chemistry-curriculum.ts
 * Wave 12 — Chemistry Curriculum Explorer & 14 Topic Adapters (C01–C14) Expansion.
 *
 * Implements:
 * - 14-Adapter Chemistry Syllabus Navigator (C01 to C14) across Junior Foundation and Olympiad Core
 * - 84-Subtopic Register with Entry Questions, Core Summaries, Diagnostic Misconceptions & Deep Dives
 * - 252-Instance QRT Cognitive Demand Explorer (EXPLAIN, MODEL, JUSTIFY, REPRESENT, SYNTHESIZE; D3/D4)
 * - 165 Authentic Chemistry Questions (119 NSEJS Core2 + 46 v3.5 Competitive Bank) with Fault N09 Answer Isolation
 * - Interactive Stoichiometry & Atom Conservation Ledger Workbench
 * - 12.7" Tablet Touch Ergonomics (>=48px min, >=56px primary actions, zero horizontal overflow)
 *
 * No academic approval inferred from software validation.
 */

import { escapeHtml, renderMathHtml } from '../runtime/rendering.ts';
import { HIT_TARGET_MIN_PX, HIT_TARGET_PRIMARY_PX } from '../styles/tokens.ts';
import { UNIFIED_QUESTION_DATABASE } from '../runtime/unified-question-database.ts';
import {
  CHEMISTRY_ADAPTERS,
  CHEMISTRY_SUBTOPICS,
  CHEMISTRY_QRT_TASKS,
  CHEMISTRY_AUTHENTIC_QUESTIONS,
  type ChemistryAdapterDescriptor,
  type ChemistrySubtopicDescriptor,
  type ChemistryQrtDescriptor,
  type ChemistryQuestionDescriptor,
} from './chemistry-data.generated.ts';

export {
  CHEMISTRY_ADAPTERS,
  CHEMISTRY_SUBTOPICS,
  CHEMISTRY_QRT_TASKS,
  CHEMISTRY_AUTHENTIC_QUESTIONS,
  type ChemistryAdapterDescriptor,
  type ChemistrySubtopicDescriptor,
  type ChemistryQrtDescriptor,
  type ChemistryQuestionDescriptor,
};

export type ChemTab = 'adapters' | 'subtopics' | 'qrts' | 'bank' | 'workbench';
export type ChemTierFilter = 'ALL' | 'FOUNDATION' | 'OLYMPIAD';

export interface ChemistryCurriculumState {
  activeTab: ChemTab;
  tierFilter: ChemTierFilter;
  searchQuery: string;
  selectedAdapterId: string | null;
  selectedSubtopicId: string | null;
  selectedQrtOperation: string;
  selectedQrtBand: string;
  expandedSubtopics: Set<string>;
  revealedHints: Set<string>;
  selectedAnswers: Map<string, string>;
  committedQrts: Set<string>;
  committedAnswers: Set<string>;
  // Stoichiometry workbench state
  activeReactionIndex: number;
  stoichCoefficients: number[];
}

export interface ReactionPreset {
  readonly id: string;
  readonly name: string;
  readonly reactants: readonly { formula: string; defaultCoeff: number; balancedCoeff: number; elements: Record<string, number> }[];
  readonly products: readonly { formula: string; defaultCoeff: number; balancedCoeff: number; elements: Record<string, number> }[];
  readonly note: string;
}

export const REACTION_PRESETS: readonly ReactionPreset[] = [
  {
    id: 'haber',
    name: 'Haber-Bosch Ammonia Synthesis (C08/C12)',
    reactants: [
      { formula: 'N₂', defaultCoeff: 1, balancedCoeff: 1, elements: { N: 2 } },
      { formula: 'H₂', defaultCoeff: 1, balancedCoeff: 3, elements: { H: 2 } },
    ],
    products: [
      { formula: 'NH₃', defaultCoeff: 1, balancedCoeff: 2, elements: { N: 1, H: 3 } },
    ],
    note: 'Exothermic gas-phase synthesis under 200 atm and iron catalyst.',
  },
  {
    id: 'combustion',
    name: 'Methane Complete Combustion (C08/C11)',
    reactants: [
      { formula: 'CH₄', defaultCoeff: 1, balancedCoeff: 1, elements: { C: 1, H: 4 } },
      { formula: 'O₂', defaultCoeff: 1, balancedCoeff: 2, elements: { O: 2 } },
    ],
    products: [
      { formula: 'CO₂', defaultCoeff: 1, balancedCoeff: 1, elements: { C: 1, O: 2 } },
      { formula: 'H₂O', defaultCoeff: 1, balancedCoeff: 2, elements: { H: 2, O: 1 } },
    ],
    note: 'Hydrocarbon oxidation yielding carbon dioxide and steam.',
  },
  {
    id: 'thermite',
    name: 'Thermite Redox Displacement (C10/C13)',
    reactants: [
      { formula: 'Fe₂O₃', defaultCoeff: 1, balancedCoeff: 1, elements: { Fe: 2, O: 3 } },
      { formula: 'Al', defaultCoeff: 1, balancedCoeff: 2, elements: { Al: 1 } },
    ],
    products: [
      { formula: 'Fe', defaultCoeff: 1, balancedCoeff: 2, elements: { Fe: 1 } },
      { formula: 'Al₂O₃', defaultCoeff: 1, balancedCoeff: 1, elements: { Al: 2, O: 3 } },
    ],
    note: 'Extreme exothermic reduction of iron oxide by aluminium.',
  },
  {
    id: 'neutralisation',
    name: 'Hydrochloric Acid & Sodium Hydroxide (C06/C09)',
    reactants: [
      { formula: 'HCl', defaultCoeff: 1, balancedCoeff: 1, elements: { H: 1, Cl: 1 } },
      { formula: 'NaOH', defaultCoeff: 1, balancedCoeff: 1, elements: { Na: 1, O: 1, H: 1 } },
    ],
    products: [
      { formula: 'NaCl', defaultCoeff: 1, balancedCoeff: 1, elements: { Na: 1, Cl: 1 } },
      { formula: 'H₂O', defaultCoeff: 1, balancedCoeff: 1, elements: { H: 2, O: 1 } },
    ],
    note: 'Classic strong acid and strong base enthalpy neutralization.',
  },
  {
    id: 'acid-carbonate',
    name: 'Calcium Carbonate & Acid Effervescence (C08/C09)',
    reactants: [
      { formula: 'CaCO₃', defaultCoeff: 1, balancedCoeff: 1, elements: { Ca: 1, C: 1, O: 3 } },
      { formula: 'HCl', defaultCoeff: 1, balancedCoeff: 2, elements: { H: 1, Cl: 1 } },
    ],
    products: [
      { formula: 'CaCl₂', defaultCoeff: 1, balancedCoeff: 1, elements: { Ca: 1, Cl: 2 } },
      { formula: 'H₂O', defaultCoeff: 1, balancedCoeff: 1, elements: { H: 2, O: 1 } },
      { formula: 'CO₂', defaultCoeff: 1, balancedCoeff: 1, elements: { C: 1, O: 2 } },
    ],
    note: 'Formation of calcium chloride, water, and carbon dioxide gas.',
  },
];

export class ChemistryCurriculumController {
  private state: ChemistryCurriculumState;
  private listeners: Array<() => void> = [];

  constructor(initialAdapterId: string | null = null, initialTab: ChemTab = 'adapters') {
    const defaultReaction = REACTION_PRESETS[0];
    const initialCoeffs = [
      ...defaultReaction.reactants.map(r => r.defaultCoeff),
      ...defaultReaction.products.map(p => p.defaultCoeff),
    ];

    this.state = {
      activeTab: initialTab,
      tierFilter: 'ALL',
      searchQuery: '',
      selectedAdapterId: initialAdapterId,
      selectedSubtopicId: null,
      selectedQrtOperation: 'ALL',
      selectedQrtBand: 'ALL',
      expandedSubtopics: new Set<string>(),
      revealedHints: new Set<string>(),
      selectedAnswers: new Map<string, string>(),
      committedQrts: new Set<string>(),
      committedAnswers: new Set<string>(),
      activeReactionIndex: 0,
      stoichCoefficients: initialCoeffs,
    };
  }

  public getState(): Readonly<ChemistryCurriculumState> {
    return this.state;
  }

  public subscribe(fn: () => void): () => void {
    this.listeners.push(fn);
    return () => {
      this.listeners = this.listeners.filter(l => l !== fn);
    };
  }

  private notify(): void {
    for (const listener of this.listeners) {
      listener();
    }
  }

  public setActiveTab(tab: ChemTab): void {
    this.state.activeTab = tab;
    this.notify();
  }

  public setTierFilter(tier: ChemTierFilter): void {
    this.state.tierFilter = tier;
    this.notify();
  }

  public setSearchQuery(q: string): void {
    this.state.searchQuery = q;
    this.notify();
  }

  public selectAdapter(adapterId: string | null): void {
    this.state.selectedAdapterId = adapterId;
    this.notify();
  }

  public selectSubtopic(subtopicId: string | null): void {
    this.state.selectedSubtopicId = subtopicId;
    this.notify();
  }

  public setQrtOperation(op: string): void {
    this.state.selectedQrtOperation = op;
    this.notify();
  }

  public setQrtBand(band: string): void {
    this.state.selectedQrtBand = band;
    this.notify();
  }

  public toggleSubtopicExpanded(subtopicId: string): void {
    if (this.state.expandedSubtopics.has(subtopicId)) {
      this.state.expandedSubtopics.delete(subtopicId);
    } else {
      this.state.expandedSubtopics.add(subtopicId);
    }
    this.notify();
  }

  public toggleHint(qid: string): void {
    if (this.state.revealedHints.has(qid)) {
      this.state.revealedHints.delete(qid);
    } else {
      this.state.revealedHints.add(qid);
    }
    this.notify();
  }

  public selectOption(qid: string, optKey: string): void {
    this.state.selectedAnswers.set(qid, optKey);
    this.notify();
  }

  public commitQrt(instanceId: string): void {
    this.state.committedQrts.add(instanceId);
    this.notify();
  }

  public resetQrt(instanceId: string): void {
    this.state.committedQrts.delete(instanceId);
    this.notify();
  }

  public commitAnswer(qid: string): void {
    this.state.committedAnswers.add(qid);
    this.notify();
  }

  public resetAnswer(qid: string): void {
    this.state.committedAnswers.delete(qid);
    this.state.selectedAnswers.delete(qid);
    this.notify();
  }

  public selectReaction(index: number): void {
    if (index >= 0 && index < REACTION_PRESETS.length) {
      this.state.activeReactionIndex = index;
      const rxn = REACTION_PRESETS[index];
      this.state.stoichCoefficients = [
        ...rxn.reactants.map(r => r.defaultCoeff),
        ...rxn.products.map(p => p.defaultCoeff),
      ];
      this.notify();
    }
  }

  public adjustCoefficient(index: number, delta: number): void {
    const current = this.state.stoichCoefficients[index] ?? 1;
    const nextVal = Math.max(1, Math.min(12, current + delta));
    this.state.stoichCoefficients[index] = nextVal;
    this.notify();
  }

  public resetReaction(): void {
    this.selectReaction(this.state.activeReactionIndex);
  }

  public applyBalancedReaction(): void {
    const rxn = REACTION_PRESETS[this.state.activeReactionIndex];
    this.state.stoichCoefficients = [
      ...rxn.reactants.map(r => r.balancedCoeff),
      ...rxn.products.map(p => p.balancedCoeff),
    ];
    this.notify();
  }
}

export function mountChemistryCurriculum(
  container: HTMLElement,
  controller: ChemistryCurriculumController,
  navigate?: (route: string) => void
): { dispose: () => void } {
  container.innerHTML = '';
  const root = document.createElement('div');
  root.className = 'chemistry-curriculum-root';
  root.style.cssText = 'min-width:0;max-width:100%;box-sizing:border-box;color:#0f172a;';
  container.appendChild(root);

  function render(): void {
    const state = controller.getState();
    const query = state.searchQuery.trim().toLowerCase();

    // Filter adapters
    const visibleAdapters = CHEMISTRY_ADAPTERS.filter(a => {
      if (state.tierFilter === 'FOUNDATION' && a.tier !== 'FOUNDATION') return false;
      if (state.tierFilter === 'OLYMPIAD' && a.tier !== 'OLYMPIAD') return false;
      if (!query) return true;
      return (
        a.id.toLowerCase().includes(query) ||
        a.title.toLowerCase().includes(query) ||
        a.coreConcepts.some(c => c.toLowerCase().includes(query)) ||
        a.description.toLowerCase().includes(query)
      );
    });

    // Filter subtopics
    const visibleSubtopics = CHEMISTRY_SUBTOPICS.filter(st => {
      if (state.selectedAdapterId && st.adapterId !== state.selectedAdapterId) return false;
      if (!query) return true;
      return (
        st.subtopicId.toLowerCase().includes(query) ||
        st.title.toLowerCase().includes(query) ||
        st.academicNotes.toLowerCase().includes(query) ||
        st.entryQuestion.toLowerCase().includes(query) ||
        st.coreSummary.toLowerCase().includes(query)
      );
    });

    // Filter QRTs
    const visibleQrts = CHEMISTRY_QRT_TASKS.filter(q => {
      if (state.selectedAdapterId && q.adapterId !== state.selectedAdapterId) return false;
      if (state.selectedQrtOperation !== 'ALL' && q.primaryOperation !== state.selectedQrtOperation) return false;
      if (state.selectedQrtBand !== 'ALL' && q.band !== state.selectedQrtBand) return false;
      if (!query) return true;
      return (
        q.instanceId.toLowerCase().includes(query) ||
        q.studentTask.toLowerCase().includes(query) ||
        q.wrongIdea.toLowerCase().includes(query) ||
        q.replacementRule.toLowerCase().includes(query)
      );
    });

    // Filter questions
    const visibleQuestions = CHEMISTRY_AUTHENTIC_QUESTIONS.filter(q => {
      if (state.selectedAdapterId && q.adapterId !== state.selectedAdapterId) return false;
      if (!query) return true;
      return (
        q.id.toLowerCase().includes(query) ||
        q.topic.toLowerCase().includes(query) ||
        q.stem.toLowerCase().includes(query)
      );
    });

    // Reaction calculations for Stoichiometry Tab
    const activeRxn = REACTION_PRESETS[state.activeReactionIndex];
    const totalReactants = activeRxn.reactants.length;
    const reactantCoeffs = state.stoichCoefficients.slice(0, totalReactants);
    const productCoeffs = state.stoichCoefficients.slice(totalReactants);

    const lhsElements: Record<string, number> = {};
    activeRxn.reactants.forEach((r, idx) => {
      const coeff = reactantCoeffs[idx] ?? 1;
      for (const [el, count] of Object.entries(r.elements)) {
        lhsElements[el] = (lhsElements[el] ?? 0) + count * coeff;
      }
    });

    const rhsElements: Record<string, number> = {};
    activeRxn.products.forEach((p, idx) => {
      const coeff = productCoeffs[idx] ?? 1;
      for (const [el, count] of Object.entries(p.elements)) {
        rhsElements[el] = (rhsElements[el] ?? 0) + count * coeff;
      }
    });

    const allElementKeys = Array.from(new Set([...Object.keys(lhsElements), ...Object.keys(rhsElements)])).sort();
    const isBalanced = allElementKeys.every(el => (lhsElements[el] ?? 0) === (rhsElements[el] ?? 0));

    root.innerHTML = `
      <div class="chemistry-curriculum-container" style="max-width:1400px;margin:0 auto;box-sizing:border-box;width:100%;">
      <!-- Header Banner -->
      <header style="background:linear-gradient(135deg, #065f46 0%, #047857 50%, #059669 100%);color:white;padding:24px 20px;border-radius:12px;margin-bottom:20px;box-shadow:0 4px 12px rgba(0,0,0,0.1);">
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:8px;flex-wrap:wrap;">
          <span style="font-size:2rem;line-height:1;">🧪</span>
          <h1 style="margin:0;font-size:1.75rem;font-weight:800;letter-spacing:-0.02em;">Chemistry Curriculum & 14 Topic Adapters (C01–C14)</h1>
          <span style="background:rgba(255,255,255,0.2);padding:4px 10px;border-radius:6px;font-size:0.875rem;font-weight:700;margin-left:auto;">Wave 12 Full Parity</span>
        </div>
        <p style="margin:0 0 16px 0;opacity:0.95;max-width:900px;font-size:1.05rem;">
          Complete 14-topic junior syllabus from foundations (Matter, Solutions, Atoms, Mole Concept, Bonding) to Olympiad core (Redox, Kinetics, Thermodynamics, Organics).
        </p>

        <!-- KPI Metrics Ribbon -->
        <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(160px, 1fr));gap:12px;background:rgba(0,0,0,0.18);padding:14px;border-radius:8px;">
          <div>
            <div style="font-size:0.875rem;text-transform:uppercase;letter-spacing:0.05em;opacity:0.85;">Topic Adapters</div>
            <div style="font-size:1.4rem;font-weight:800;">14 Adapters (C01–C14)</div>
          </div>
          <div>
            <div style="font-size:0.875rem;text-transform:uppercase;letter-spacing:0.05em;opacity:0.85;">Subtopics Register</div>
            <div style="font-size:1.4rem;font-weight:800;">84 Subtopics</div>
          </div>
          <div>
            <div style="font-size:0.875rem;text-transform:uppercase;letter-spacing:0.05em;opacity:0.85;">Cognitive Demand Tasks</div>
            <div style="font-size:1.4rem;font-weight:800;">252 QRT Tasks</div>
          </div>
          <div>
            <div style="font-size:0.875rem;text-transform:uppercase;letter-spacing:0.05em;opacity:0.85;">Authentic Questions</div>
            <div style="font-size:1.4rem;font-weight:800;">165 Questions</div>
          </div>
          <div>
            <div style="font-size:0.875rem;text-transform:uppercase;letter-spacing:0.05em;opacity:0.85;">Answer Isolation</div>
            <div style="font-size:1.1rem;font-weight:700;color:#a7f3d0;">🛡️ Fault N09 Active</div>
          </div>
        </div>
      </header>

      <!-- Navigation & Mode Tabs -->
      <div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:16px;">
        <button type="button" data-tab="adapters" style="min-height:${HIT_TARGET_MIN_PX}px;min-width:${HIT_TARGET_MIN_PX}px;padding:10px 18px;border-radius:8px;font-weight:700;cursor:pointer;background:${state.activeTab === 'adapters' ? '#047857' : '#e2e8f0'};color:${state.activeTab === 'adapters' ? '#ffffff' : '#1e293b'};border:none;box-shadow:${state.activeTab === 'adapters' ? '0 2px 4px rgba(4,120,87,0.3)' : 'none'};">
          🧭 1. Topic Adapters (14)
        </button>
        <button type="button" data-tab="subtopics" style="min-height:${HIT_TARGET_MIN_PX}px;min-width:${HIT_TARGET_MIN_PX}px;padding:10px 18px;border-radius:8px;font-weight:700;cursor:pointer;background:${state.activeTab === 'subtopics' ? '#047857' : '#e2e8f0'};color:${state.activeTab === 'subtopics' ? '#ffffff' : '#1e293b'};border:none;box-shadow:${state.activeTab === 'subtopics' ? '0 2px 4px rgba(4,120,87,0.3)' : 'none'};">
          📑 2. 84 Subtopics Register
        </button>
        <button type="button" data-tab="qrts" style="min-height:${HIT_TARGET_MIN_PX}px;min-width:${HIT_TARGET_MIN_PX}px;padding:10px 18px;border-radius:8px;font-weight:700;cursor:pointer;background:${state.activeTab === 'qrts' ? '#047857' : '#e2e8f0'};color:${state.activeTab === 'qrts' ? '#ffffff' : '#1e293b'};border:none;box-shadow:${state.activeTab === 'qrts' ? '0 2px 4px rgba(4,120,87,0.3)' : 'none'};">
          🎯 3. 252 QRT Cognitive Demands
        </button>
        <button type="button" data-tab="bank" style="min-height:${HIT_TARGET_MIN_PX}px;min-width:${HIT_TARGET_MIN_PX}px;padding:10px 18px;border-radius:8px;font-weight:700;cursor:pointer;background:${state.activeTab === 'bank' ? '#047857' : '#e2e8f0'};color:${state.activeTab === 'bank' ? '#ffffff' : '#1e293b'};border:none;box-shadow:${state.activeTab === 'bank' ? '0 2px 4px rgba(4,120,87,0.3)' : 'none'};">
          🏆 4. Authentic Question Bank (${visibleQuestions.length})
        </button>
        <button type="button" data-tab="workbench" style="min-height:${HIT_TARGET_MIN_PX}px;min-width:${HIT_TARGET_MIN_PX}px;padding:10px 18px;border-radius:8px;font-weight:700;cursor:pointer;background:${state.activeTab === 'workbench' ? '#047857' : '#e2e8f0'};color:${state.activeTab === 'workbench' ? '#ffffff' : '#1e293b'};border:none;box-shadow:${state.activeTab === 'workbench' ? '0 2px 4px rgba(4,120,87,0.3)' : 'none'};">
          ⚖️ 5. Stoichiometry Ledger
        </button>
      </div>

      <!-- Tier Filters & Search Bar -->
      <div style="background:#f8fafc;border:1px solid #cbd5e1;border-radius:8px;padding:12px 16px;margin-bottom:20px;display:flex;flex-wrap:wrap;gap:12px;align-items:center;">
        <div style="display:flex;align-items:center;gap:6px;">
          <span style="font-weight:700;font-size:0.9rem;color:#475569;">Scope:</span>
          <button type="button" data-tier="ALL" style="min-height:${HIT_TARGET_MIN_PX}px;min-width:${HIT_TARGET_MIN_PX}px;padding:6px 12px;border-radius:6px;font-size:0.875rem;font-weight:700;cursor:pointer;border:1px solid ${state.tierFilter === 'ALL' ? '#047857' : '#cbd5e1'};background:${state.tierFilter === 'ALL' ? '#d1fae5' : '#ffffff'};color:${state.tierFilter === 'ALL' ? '#065f46' : '#334155'};">
            All (14)
          </button>
          <button type="button" data-tier="FOUNDATION" style="min-height:${HIT_TARGET_MIN_PX}px;min-width:${HIT_TARGET_MIN_PX}px;padding:6px 12px;border-radius:6px;font-size:0.875rem;font-weight:700;cursor:pointer;border:1px solid ${state.tierFilter === 'FOUNDATION' ? '#047857' : '#cbd5e1'};background:${state.tierFilter === 'FOUNDATION' ? '#d1fae5' : '#ffffff'};color:${state.tierFilter === 'FOUNDATION' ? '#065f46' : '#334155'};">
            Junior Foundation (C01–C07)
          </button>
          <button type="button" data-tier="OLYMPIAD" style="min-height:${HIT_TARGET_MIN_PX}px;min-width:${HIT_TARGET_MIN_PX}px;padding:6px 12px;border-radius:6px;font-size:0.875rem;font-weight:700;cursor:pointer;border:1px solid ${state.tierFilter === 'OLYMPIAD' ? '#047857' : '#cbd5e1'};background:${state.tierFilter === 'OLYMPIAD' ? '#d1fae5' : '#ffffff'};color:${state.tierFilter === 'OLYMPIAD' ? '#065f46' : '#334155'};">
            Olympiad Core (C08–C14)
          </button>
        </div>

        ${state.selectedAdapterId ? `
          <div style="display:flex;align-items:center;gap:6px;background:#e0f2fe;border:1px solid #7dd3fc;padding:4px 10px;border-radius:6px;">
            <span style="font-size:0.875rem;font-weight:700;color:#0369a1;">Filtered: ${escapeHtml(state.selectedAdapterId)}</span>
            <button type="button" id="btn-clear-adapter" style="min-height:${HIT_TARGET_MIN_PX}px;min-width:${HIT_TARGET_MIN_PX}px;background:none;border:none;cursor:pointer;color:#0284c7;font-weight:800;font-size:1.2rem;line-height:1;display:flex;align-items:center;justify-content:center;" aria-label="Clear adapter filter">×</button>
          </div>
        ` : ''}

        <div style="margin-left:auto;flex:1;min-width:240px;max-width:360px;">
          <input
            type="search"
            id="chem-search-input"
            value="${escapeHtml(state.searchQuery)}"
            placeholder="Search concepts, adapters, QRTs..."
            aria-label="Search chemistry curriculum"
            style="width:100%;min-height:${HIT_TARGET_MIN_PX}px;padding:8px 12px;border:1px solid #cbd5e1;border-radius:6px;font-size:0.95rem;box-sizing:border-box;"
          />
        </div>
      </div>

      <!-- Tab Content Pane -->
      <main class="chem-tab-content">
        ${renderActiveTab()}
      </main>
      </div>
    `;

    function renderActiveTab(): string {
      switch (state.activeTab) {
        case 'adapters':
          return renderAdaptersView();
        case 'subtopics':
          return renderSubtopicsView();
        case 'qrts':
          return renderQrtsView();
        case 'bank':
          return renderBankView();
        case 'workbench':
          return renderWorkbenchView();
        default:
          return renderAdaptersView();
      }
    }

    // 1. Adapters Grid View
    function renderAdaptersView(): string {
      if (visibleAdapters.length === 0) {
        return `<div style="padding:40px;text-align:center;color:#64748b;font-weight:600;">No topic adapters match the selected filter.</div>`;
      }

      return `
        <div style="display:grid;grid-template-columns:repeat(auto-fill, minmax(360px, 1fr));gap:16px;">
          ${visibleAdapters.map(adapter => {
            const isSelected = state.selectedAdapterId === adapter.id;
            return `
              <div class="chem-adapter-card" style="border:1px solid ${isSelected ? '#047857' : '#e2e8f0'};border-left:5px solid ${adapter.tier === 'FOUNDATION' ? '#0284c7' : '#059669'};border-radius:10px;padding:18px;background:${isSelected ? '#f0fdf4' : '#ffffff'};box-shadow:0 1px 4px rgba(0,0,0,0.06);display:flex;flex-direction:column;">
                <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:8px;">
                  <div>
                    <span style="font-weight:800;font-size:1.15rem;color:#065f46;margin-right:8px;">${escapeHtml(adapter.id)}</span>
                    <span style="font-size:0.875rem;font-weight:700;padding:2px 8px;border-radius:4px;background:${adapter.tier === 'FOUNDATION' ? '#e0f2fe' : '#d1fae5'};color:${adapter.tier === 'FOUNDATION' ? '#0369a1' : '#065f46'};">
                      ${escapeHtml(adapter.tier)}
                    </span>
                  </div>
                  <span style="font-size:0.875rem;color:#64748b;font-weight:600;">Unit: ${escapeHtml(adapter.unitId)}</span>
                </div>

                <h3 style="margin:0 0 8px 0;font-size:1.15rem;font-weight:700;color:#0f172a;line-height:1.3;">
                  ${escapeHtml(adapter.title)}
                </h3>

                <p style="margin:0 0 14px 0;font-size:0.92rem;color:#475569;line-height:1.45;flex-grow:1;">
                  ${escapeHtml(adapter.description)}
                </p>

                <!-- Concepts cloud -->
                <div style="display:flex;flex-wrap:wrap;gap:4px;margin-bottom:14px;">
                  ${adapter.coreConcepts.slice(0, 5).map(concept => `
                    <span style="font-size:0.875rem;background:#f1f5f9;color:#334155;padding:2px 6px;border-radius:4px;font-family:monospace;">
                      ${escapeHtml(concept)}
                    </span>
                  `).join('')}
                </div>

                <!-- Footer with stats & actions -->
                <div style="display:flex;align-items:center;justify-content:space-between;border-top:1px solid #f1f5f9;padding-top:12px;gap:8px;flex-wrap:wrap;">
                  <div style="font-size:0.875rem;color:#64748b;">
                    <strong>${adapter.subtopicCount}</strong> subtopics • <strong>${adapter.qrtCount}</strong> QRTs
                  </div>
                  <div style="display:flex;gap:6px;">
                    <button type="button" data-action="explore-subtopics" data-adapter-id="${escapeHtml(adapter.id)}" style="min-height:${HIT_TARGET_MIN_PX}px;min-width:${HIT_TARGET_MIN_PX}px;padding:6px 12px;background:#047857;color:white;border:none;border-radius:6px;font-weight:700;font-size:0.875rem;cursor:pointer;">
                      Subtopics →
                    </button>
                    <button type="button" data-action="explore-qrts" data-adapter-id="${escapeHtml(adapter.id)}" style="min-height:${HIT_TARGET_MIN_PX}px;min-width:${HIT_TARGET_MIN_PX}px;padding:6px 12px;background:#f1f5f9;color:#0f172a;border:1px solid #cbd5e1;border-radius:6px;font-weight:700;font-size:0.875rem;cursor:pointer;">
                      QRTs
                    </button>
                  </div>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      `;
    }

    // 2. Subtopics Register View
    function renderSubtopicsView(): string {
      return `
        <div style="margin-bottom:16px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;">
          <div>
            <h2 style="margin:0;font-size:1.25rem;font-weight:700;">84 Subtopics Register</h2>
            <p style="margin:4px 0 0 0;font-size:0.9rem;color:#64748b;">Showing ${visibleSubtopics.length} of ${CHEMISTRY_SUBTOPICS.length} total subtopics.</p>
          </div>
        </div>

        <div style="display:flex;flex-direction:column;gap:12px;">
          ${visibleSubtopics.map(st => {
            const isExpanded = state.expandedSubtopics.has(st.subtopicId);
            return `
              <div class="subtopic-card" style="border:1px solid #e2e8f0;border-radius:8px;background:#ffffff;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.05);">
                <div
                  data-action="toggle-subtopic"
                  data-st-id="${escapeHtml(st.subtopicId)}"
                  style="display:flex;align-items:center;padding:14px 18px;background:${isExpanded ? '#f8fafc' : '#ffffff'};cursor:pointer;user-select:none;gap:12px;flex-wrap:wrap;"
                >
                  <span style="font-size:1rem;color:#047857;font-weight:800;">${isExpanded ? '▼' : '►'}</span>
                  <span style="font-family:monospace;font-weight:700;font-size:0.9rem;color:#047857;">${escapeHtml(st.subtopicId)}</span>
                  <h3 style="margin:0;font-size:1.05rem;font-weight:700;color:#0f172a;flex-grow:1;">${escapeHtml(st.title)}</h3>
                  <span style="font-size:0.875rem;background:#e2e8f0;padding:2px 8px;border-radius:4px;font-weight:600;color:#334155;">
                    ${escapeHtml(st.adapterId)}
                  </span>
                  <span style="font-size:0.875rem;background:#dcfce7;color:#166534;padding:2px 8px;border-radius:4px;font-weight:700;">
                    ${st.qrtCount} QRTs
                  </span>
                </div>

                ${isExpanded ? `
                  <div style="padding:16px 20px;border-top:1px solid #e2e8f0;background:#ffffff;">
                    <!-- Hook / Entry question -->
                    <div style="margin-bottom:12px;background:#f0fdf4;border-left:4px solid #10b981;padding:10px 14px;border-radius:4px;">
                      <div style="font-size:0.875rem;font-weight:700;text-transform:uppercase;color:#047857;letter-spacing:0.05em;margin-bottom:2px;">Inquiry Hook</div>
                      <div style="font-size:0.95rem;color:#065f46;font-style:italic;">"${escapeHtml(st.entryQuestion)}"</div>
                    </div>

                    <!-- Core teaching exposition -->
                    <div style="margin-bottom:14px;">
                      <h4 style="margin:0 0 4px 0;font-size:0.9rem;text-transform:uppercase;color:#64748b;letter-spacing:0.05em;">Core Phenomenological Exposition</h4>
                      <p style="margin:0;font-size:0.95rem;line-height:1.55;color:#1e293b;">${escapeHtml(st.coreSummary)}</p>
                    </div>

                    <!-- Misconception Alert -->
                    <div style="margin-bottom:14px;background:#fef2f2;border-left:4px solid #ef4444;padding:10px 14px;border-radius:4px;">
                      <div style="font-size:0.875rem;font-weight:700;text-transform:uppercase;color:#b91c1c;letter-spacing:0.05em;margin-bottom:2px;">Diagnostic Trap / Misconception</div>
                      <div style="font-size:0.92rem;color:#991b1b;line-height:1.45;">${escapeHtml(st.misconception)}</div>
                    </div>

                    <!-- Deep dive / boundary -->
                    <div style="margin-bottom:14px;background:#f0f9ff;border-left:4px solid #0284c7;padding:10px 14px;border-radius:4px;">
                      <div style="font-size:0.875rem;font-weight:700;text-transform:uppercase;color:#0369a1;letter-spacing:0.05em;margin-bottom:2px;">Olympiad Scope Boundary & Extension</div>
                      <div style="font-size:0.92rem;color:#075985;line-height:1.45;">${escapeHtml(st.deepDive)}</div>
                    </div>

                    <!-- Actions -->
                    <div style="display:flex;gap:8px;margin-top:14px;">
                      <button type="button" data-action="explore-qrts" data-adapter-id="${escapeHtml(st.adapterId)}" style="min-height:${HIT_TARGET_MIN_PX}px;min-width:${HIT_TARGET_MIN_PX}px;padding:8px 14px;background:#047857;color:white;border:none;border-radius:6px;font-weight:700;font-size:0.875rem;cursor:pointer;">
                        Inspect Associated QRT Tasks →
                      </button>
                    </div>
                  </div>
                ` : ''}
              </div>
            `;
          }).join('')}
        </div>
      `;
    }

    // 3. QRT Cognitive Demand Explorer View
    function renderQrtsView(): string {
      const ops = ['ALL', 'EXPLAIN', 'MODEL', 'JUSTIFY', 'REPRESENT', 'SYNTHESIZE', 'APPLY'];
      const bands = ['ALL', 'D1', 'D2', 'D3', 'D4'];

      return `
        <div style="margin-bottom:16px;">
          <h2 style="margin:0 0 6px 0;font-size:1.25rem;font-weight:700;">252 QRT Cognitive Demand Tasks</h2>
          <p style="margin:0 0 14px 0;font-size:0.9rem;color:#64748b;">
            Structured cognitive operations spanning D3 (Application & Analysis) and D4 (Olympiad-Grade Synthesis). Practice scientific modeling and verify your hypotheses.
          </p>

          <!-- Operation and Band Filters -->
          <div style="display:flex;flex-wrap:wrap;gap:12px;background:#f8fafc;padding:12px;border-radius:8px;border:1px solid #e2e8f0;">
            <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;">
              <span style="font-size:0.875rem;font-weight:700;color:#475569;">Operation:</span>
              ${ops.map(op => `
                <button type="button" data-qrt-op="${escapeHtml(op)}" style="min-height:${HIT_TARGET_MIN_PX}px;min-width:${HIT_TARGET_MIN_PX}px;padding:6px 12px;border-radius:6px;font-size:0.875rem;font-weight:700;cursor:pointer;border:1px solid ${state.selectedQrtOperation === op ? '#047857' : '#cbd5e1'};background:${state.selectedQrtOperation === op ? '#d1fae5' : '#ffffff'};color:${state.selectedQrtOperation === op ? '#065f46' : '#334155'};">
                  ${escapeHtml(op)}
                </button>
              `).join('')}
            </div>

            <div style="display:flex;align-items:center;gap:6px;margin-left:auto;">
              <span style="font-size:0.875rem;font-weight:700;color:#475569;">Band:</span>
              ${bands.map(b => `
                <button type="button" data-qrt-band="${escapeHtml(b)}" style="min-height:${HIT_TARGET_MIN_PX}px;min-width:${HIT_TARGET_MIN_PX}px;padding:6px 12px;border-radius:6px;font-size:0.875rem;font-weight:700;cursor:pointer;border:1px solid ${state.selectedQrtBand === b ? '#047857' : '#cbd5e1'};background:${state.selectedQrtBand === b ? '#d1fae5' : '#ffffff'};color:${state.selectedQrtBand === b ? '#065f46' : '#334155'};">
                  ${escapeHtml(b)}
                </button>
              `).join('')}
            </div>
          </div>
        </div>

        <div style="display:grid;grid-template-columns:repeat(auto-fill, minmax(420px, 1fr));gap:16px;">
          ${visibleQrts.slice(0, 50).map(qrt => {
            const isCommitted = state.committedQrts.has(qrt.instanceId);
            const figMatch = qrt.visualJob.match(/figures\/([a-zA-Z0-9_-]+\.svg)/);
            const figName = figMatch ? figMatch[1] : null;
            const cleanCheck = qrt.independentCheck.replace(/^Check:\s*/i, '');

            return `
              <div class="qrt-card" style="border:1px solid #cbd5e1;border-radius:10px;padding:18px;background:#ffffff;box-shadow:0 1px 4px rgba(0,0,0,0.06);display:flex;flex-direction:column;">
                <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;">
                  <span style="font-family:monospace;font-weight:800;font-size:0.9rem;color:#047857;">${escapeHtml(qrt.instanceId)}</span>
                  <div style="display:flex;gap:6px;">
                    <span style="font-size:0.85rem;padding:2px 8px;border-radius:4px;background:#dbeafe;color:#1e40af;font-weight:700;">${escapeHtml(qrt.primaryOperation)}</span>
                    <span style="font-size:0.85rem;padding:2px 8px;border-radius:4px;background:#fef3c7;color:#92400e;font-weight:700;">${escapeHtml(qrt.band)}</span>
                  </div>
                </div>

                <!-- Student Task Prompt -->
                <div style="margin-bottom:14px;font-size:0.98rem;color:#0f172a;line-height:1.5;font-weight:600;">
                  ${renderMathHtml(qrt.studentTask)}
                </div>

                <!-- Graphic Demonstration (if figure applies) -->
                ${figName ? `
                  <div style="margin-bottom:14px;border:1px solid #e2e8f0;border-radius:8px;background:#f8fafc;padding:6px;text-align:center;">
                    <img src="./figures/${figName}" alt="Scientific Demonstration: ${escapeHtml(figName)}" style="max-width:100%;max-height:160px;object-fit:contain;display:block;margin:0 auto;" onerror="this.parentElement.style.display='none';" loading="lazy"/>
                    <div style="font-size:0.78rem;color:#64748b;margin-top:4px;">Demonstration Figure · ${escapeHtml(figName)}</div>
                  </div>
                ` : ''}

                <!-- Pedagogical Trapped Idea & Decisive Rule -->
                <div style="margin-bottom:8px;background:#fef2f2;padding:8px 10px;border-radius:6px;font-size:0.88rem;color:#991b1b;line-height:1.45;">
                  <strong>⚠️ Trapped Idea:</strong> ${renderMathHtml(qrt.wrongIdea)}
                </div>
                <div style="margin-bottom:8px;background:#f0fdf4;padding:8px 10px;border-radius:6px;font-size:0.88rem;color:#166534;line-height:1.45;">
                  <strong>💡 Decisive Rule:</strong> ${renderMathHtml(qrt.replacementRule)}
                </div>

                <!-- Active Student Engagement / Hypothesis Commitment -->
                ${!isCommitted ? `
                  <div style="margin-top:auto;background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:12px;margin-bottom:8px;">
                    <div style="font-size:0.875rem;font-weight:700;color:#334155;margin-bottom:4px;">
                      🤔 Active Model Practice:
                    </div>
                    <p style="margin:0 0 10px 0;font-size:0.85rem;color:#64748b;line-height:1.4;">
                      Formulate your reasoning using the decisive rule above. Commit to check self-verification criteria.
                    </p>
                    <button
                      type="button"
                      data-action="commit-qrt"
                      data-qrt-id="${escapeHtml(qrt.instanceId)}"
                      style="min-height:${HIT_TARGET_MIN_PX}px;min-width:${HIT_TARGET_MIN_PX}px;padding:8px 16px;background:#047857;color:white;border:none;border-radius:6px;font-weight:700;font-size:0.88rem;cursor:pointer;display:inline-flex;align-items:center;gap:6px;box-shadow:0 1px 3px rgba(4,120,87,0.25);"
                    >
                      🎯 Commit Model &amp; Verify Criteria
                    </button>
                  </div>
                ` : `
                  <div style="margin-top:auto;display:flex;flex-direction:column;gap:8px;margin-bottom:8px;">
                    <div style="background:#f0f9ff;border-left:4px solid #0284c7;padding:10px 12px;border-radius:6px;font-size:0.88rem;color:#075985;line-height:1.4;">
                      <div style="font-weight:800;font-size:0.8rem;text-transform:uppercase;letter-spacing:0.04em;margin-bottom:2px;color:#0284c7;">🔍 Self-Verification Criterion:</div>
                      ${renderMathHtml(cleanCheck)}
                    </div>
                    <div style="display:flex;justify-content:flex-end;">
                      <button
                        type="button"
                        data-action="reset-qrt"
                        data-qrt-id="${escapeHtml(qrt.instanceId)}"
                        style="min-height:${HIT_TARGET_MIN_PX}px;min-width:${HIT_TARGET_MIN_PX}px;padding:6px 14px;background:#f1f5f9;color:#475569;border:1px solid #cbd5e1;border-radius:6px;font-weight:600;font-size:0.82rem;cursor:pointer;"
                      >
                        ↺ Rethink / Reset
                      </button>
                    </div>
                  </div>
                `}

                <!-- Curriculum Target & Verification Specs -->
                <div style="margin-top:auto;border-top:1px solid #f1f5f9;padding-top:8px;">
                  <details style="font-size:0.8rem;color:#64748b;cursor:pointer;">
                    <summary style="font-weight:600;color:#64748b;">Curriculum Criteria &amp; Target</summary>
                    <div style="margin-top:4px;"><strong>Visual Target:</strong> ${escapeHtml(qrt.visualJob)}</div>
                    <div style="margin-top:2px;"><strong>Check:</strong> ${escapeHtml(qrt.independentCheck)}</div>
                  </details>
                </div>
              </div>
            `;
          }).join('')}
        </div>
        ${visibleQrts.length > 50 ? `
          <div style="text-align:center;padding:16px;color:#64748b;font-size:0.9rem;">
            Showing first 50 of ${visibleQrts.length} filtered QRT tasks. Use the search bar above to pinpoint specific concepts.
          </div>
        ` : ''}
      `;
    }

    // 4. Authentic Question Bank View
    function renderBankView(): string {
      return `
        <div style="margin-bottom:16px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;">
          <div>
            <h2 style="margin:0;font-size:1.25rem;font-weight:700;">Authentic Chemistry Question Bank</h2>
            <p style="margin:4px 0 0 0;font-size:0.9rem;color:#64748b;">
              165 Official Questions (119 NSEJS Core 2 + 46 v3.5 Competitive Bank) with Formative Self-Assessment.
            </p>
          </div>
        </div>

        <div style="display:flex;flex-direction:column;gap:16px;">
          ${visibleQuestions.slice(0, 30).map(q => {
            const isHintRevealed = state.revealedHints.has(q.id);
            const userChoice = state.selectedAnswers.get(q.id);
            const isCommitted = state.committedAnswers.has(q.id);

            const unifiedEntry = UNIFIED_QUESTION_DATABASE.getById(q.id);
            const correctKey = unifiedEntry?.correctKey;
            const hasKey = !!correctKey && correctKey !== 'WITHHELD_CLIENT_SIDE_FAULT_N09';
            const cleanUserKey = userChoice ? userChoice.replace(/[()]/g, '').trim() : '';
            const cleanCorrectKey = hasKey ? correctKey.replace(/[()]/g, '').trim() : '';
            const isCorrect = hasKey && cleanUserKey.toUpperCase() === cleanCorrectKey.toUpperCase();

            return `
              <div class="chem-question-card" style="border:1px solid #cbd5e1;border-radius:10px;padding:20px;background:#ffffff;box-shadow:0 1px 4px rgba(0,0,0,0.06);">
                <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;flex-wrap:wrap;gap:8px;">
                  <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
                    <span style="font-family:monospace;font-weight:800;font-size:0.95rem;color:#047857;">${escapeHtml(q.id)}</span>
                    <span style="font-size:0.85rem;padding:2px 8px;border-radius:4px;background:#f1f5f9;color:#475569;font-weight:600;">${escapeHtml(q.sourceName)}</span>
                    <span style="font-size:0.85rem;padding:2px 8px;border-radius:4px;background:#e0f2fe;color:#0369a1;font-weight:600;">${escapeHtml(q.topic)}</span>
                  </div>
                  <span style="font-size:0.85rem;padding:2px 8px;border-radius:4px;background:#fef3c7;color:#92400e;font-weight:700;">Band ${escapeHtml(q.band)}</span>
                </div>

                <div style="font-size:1.02rem;color:#0f172a;line-height:1.55;margin-bottom:16px;">
                  ${renderMathHtml(q.stem)}
                </div>

                <!-- Options -->
                ${q.options.length > 0 ? `
                  <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(280px, 1fr));gap:8px;margin-bottom:16px;">
                    ${q.options.map(opt => {
                      const optKey = opt.slice(0, 3).trim();
                      const isSelected = userChoice === optKey;
                      let btnBg = '#ffffff';
                      let btnBorder = '#cbd5e1';
                      let btnColor = '#1e293b';

                      if (isSelected) {
                        if (isCommitted) {
                          if (hasKey) {
                            btnBg = isCorrect ? '#dcfce7' : '#fee2e2';
                            btnBorder = isCorrect ? '#16a34a' : '#dc2626';
                            btnColor = isCorrect ? '#14532d' : '#991b1b';
                          } else {
                            btnBg = '#e0f2fe';
                            btnBorder = '#0284c7';
                            btnColor = '#075985';
                          }
                        } else {
                          btnBg = '#d1fae5';
                          btnBorder = '#047857';
                          btnColor = '#065f46';
                        }
                      }

                      return `
                        <button
                          type="button"
                          data-action="select-option"
                          data-qid="${escapeHtml(q.id)}"
                          data-opt-key="${escapeHtml(optKey)}"
                          ${isCommitted ? 'disabled' : ''}
                          style="min-height:${HIT_TARGET_MIN_PX}px;min-width:${HIT_TARGET_MIN_PX}px;padding:10px 14px;border-radius:6px;border:1px solid ${btnBorder};background:${btnBg};color:${btnColor};font-size:0.92rem;text-align:left;cursor:${isCommitted ? 'default' : 'pointer'};font-weight:${isSelected ? '700' : '400'};box-shadow:${isSelected ? '0 1px 3px rgba(4,120,87,0.2)' : 'none'};"
                        >
                          ${renderMathHtml(opt)}
                        </button>
                      `;
                    }).join('')}
                  </div>
                ` : ''}

                <!-- Commit / Feedback Section -->
                ${userChoice && !isCommitted ? `
                  <div style="margin-bottom:16px;display:flex;align-items:center;gap:12px;flex-wrap:wrap;background:#f8fafc;padding:12px;border-radius:8px;border:1px solid #e2e8f0;">
                    <button
                      type="button"
                      data-action="commit-answer"
                      data-qid="${escapeHtml(q.id)}"
                      style="min-height:${HIT_TARGET_MIN_PX}px;min-width:${HIT_TARGET_MIN_PX}px;padding:9px 20px;background:#047857;color:white;border:none;border-radius:6px;font-weight:700;font-size:0.9rem;cursor:pointer;box-shadow:0 1px 3px rgba(4,120,87,0.3);"
                    >
                      🎯 Commit Selected Option ${escapeHtml(userChoice)}
                    </button>
                    <span style="font-size:0.875rem;color:#475569;">Click to verify your selection and inspect the scientific derivation.</span>
                  </div>
                ` : ''}

                ${isCommitted ? `
                  <div style="margin-bottom:16px;padding:12px 16px;border-radius:8px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;${
                    hasKey
                      ? (isCorrect ? 'background:#dcfce7;border:1px solid #86efac;color:#166534;' : 'background:#fee2e2;border:1px solid #fca5a5;color:#991b1b;')
                      : 'background:#f0fdf4;border:1px solid #bbf7d0;color:#166534;'
                  }">
                    <div style="font-weight:700;font-size:0.95rem;">
                      ${hasKey
                        ? (isCorrect
                            ? `✅ Correct! Option ${escapeHtml(userChoice ?? '')} matches the official answer.`
                            : `❌ Incorrect. You selected ${escapeHtml(userChoice ?? '')}, but the verified answer is (${escapeHtml(correctKey ?? '')}).`)
                        : `📝 Option ${escapeHtml(userChoice ?? '')} Committed (Formative Practice Mode). Trace the derivation below.`
                      }
                    </div>
                    <button
                      type="button"
                      data-action="reset-answer"
                      data-qid="${escapeHtml(q.id)}"
                      style="min-height:${HIT_TARGET_MIN_PX}px;padding:6px 14px;background:#ffffff;border:1px solid #cbd5e1;border-radius:6px;font-weight:700;font-size:0.82rem;cursor:pointer;color:#334155;"
                    >
                      ↺ Try Again
                    </button>
                  </div>
                ` : ''}

                <!-- Scaffolding and Hints -->
                <div style="border-top:1px solid #f1f5f9;padding-top:12px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;">
                  <button
                    type="button"
                    data-action="toggle-hint"
                    data-qid="${escapeHtml(q.id)}"
                    style="min-height:${HIT_TARGET_MIN_PX}px;min-width:${HIT_TARGET_MIN_PX}px;padding:8px 16px;background:${isHintRevealed || isCommitted ? '#e2e8f0' : '#047857'};color:${isHintRevealed || isCommitted ? '#1e293b' : '#ffffff'};border:none;border-radius:6px;font-weight:700;font-size:0.875rem;cursor:pointer;"
                  >
                    ${isHintRevealed || isCommitted ? 'Hide Hints & Steps' : '💡 Reveal Hints & Decisive Moves'}
                  </button>

                  <span style="font-size:0.85rem;background:#f1f5f9;color:#475569;padding:3px 8px;border-radius:4px;font-weight:600;">Practice Mode · Fault N09: Key Isolated</span>
                </div>

                ${(isHintRevealed || isCommitted) ? `
                  <div style="margin-top:12px;padding:14px;background:#f8fafc;border-radius:6px;border:1px solid #e2e8f0;">
                    ${q.hints.length > 0 ? `
                      <div style="margin-bottom:12px;">
                        <strong style="color:#047857;font-size:0.875rem;text-transform:uppercase;letter-spacing:0.04em;">Conceptual Scaffolding:</strong>
                        <ul style="margin:6px 0 0 0;padding-left:20px;font-size:0.92rem;color:#334155;line-height:1.5;">
                          ${q.hints.map(h => `<li>${renderMathHtml(h)}</li>`).join('')}
                        </ul>
                      </div>
                    ` : ''}
                    ${q.steps.length > 0 ? `
                      <div>
                        <strong style="color:#0284c7;font-size:0.875rem;text-transform:uppercase;letter-spacing:0.04em;">Decisive Solution Steps:</strong>
                        <ol style="margin:6px 0 0 0;padding-left:20px;font-size:0.92rem;color:#334155;line-height:1.5;">
                          ${q.steps.map(s => `<li>${renderMathHtml(s)}</li>`).join('')}
                        </ol>
                      </div>
                    ` : ''}
                  </div>
                ` : ''}
              </div>
            `;
          }).join('')}
        </div>

        ${visibleQuestions.length > 30 ? `
          <div style="text-align:center;padding:16px;color:#64748b;font-size:0.9rem;">
            Showing first 30 of ${visibleQuestions.length} questions. Use search bar to filter.
          </div>
        ` : ''}
      `;
    }

    // 5. Stoichiometry Workbench View
    function renderWorkbenchView(): string {
      return `
        <div style="margin-bottom:16px;">
          <h2 style="margin:0 0 6px 0;font-size:1.25rem;font-weight:700;">⚖️ Interactive Stoichiometry & Atom Conservation Ledger</h2>
          <p style="margin:0 0 16px 0;font-size:0.9rem;color:#64748b;">
            Verify the Law of Conservation of Mass (Lavoisier) and Daltonian atomic conservation in real time.
          </p>

          <!-- Reaction Selector -->
          <div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:20px;">
            ${REACTION_PRESETS.map((rxn, idx) => `
              <button
                type="button"
                data-action="select-rxn"
                data-rxn-idx="${idx}"
                style="min-height:${HIT_TARGET_MIN_PX}px;min-width:${HIT_TARGET_MIN_PX}px;padding:8px 14px;border-radius:6px;border:1px solid ${state.activeReactionIndex === idx ? '#047857' : '#cbd5e1'};background:${state.activeReactionIndex === idx ? '#d1fae5' : '#ffffff'};color:${state.activeReactionIndex === idx ? '#065f46' : '#1e293b'};font-weight:700;font-size:0.88rem;cursor:pointer;"
              >
                ${escapeHtml(rxn.name)}
              </button>
            `).join('')}
          </div>

          <!-- Active Reaction Equation Editor -->
          <div style="background:#ffffff;border:2px solid ${isBalanced ? '#10b981' : '#f59e0b'};border-radius:12px;padding:24px;box-shadow:0 4px 12px rgba(0,0,0,0.06);margin-bottom:20px;">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;flex-wrap:wrap;gap:8px;">
              <h3 style="margin:0;font-size:1.2rem;font-weight:800;color:#0f172a;">${escapeHtml(activeRxn.name)}</h3>
              <span style="padding:6px 14px;border-radius:20px;font-weight:800;font-size:0.9rem;background:${isBalanced ? '#dcfce7' : '#fef3c7'};color:${isBalanced ? '#166534' : '#92400e'};">
                ${isBalanced ? '⚖️ CONSERVATION SATISFIED (Balanced)' : '⚠️ MASS CONSERVATION VIOLATED (Unbalanced)'}
              </span>
            </div>

            <!-- Reaction visual math equation with step controls -->
            <div style="display:flex;align-items:center;justify-content:center;gap:12px;flex-wrap:wrap;padding:20px 10px;background:#f8fafc;border-radius:8px;margin-bottom:20px;">
              <!-- Reactants -->
              ${activeRxn.reactants.map((r, idx) => {
                const coeff = reactantCoeffs[idx] ?? 1;
                return `
                  ${idx > 0 ? '<span style="font-size:1.5rem;font-weight:700;color:#64748b;">+</span>' : ''}
                  <div style="display:flex;align-items:center;gap:8px;background:#ffffff;padding:8px 14px;border:1px solid #cbd5e1;border-radius:8px;">
                    <div style="display:flex;flex-direction:column;gap:4px;">
                      <button type="button" data-action="adjust-coeff" data-coeff-idx="${idx}" data-delta="1" style="min-height:${HIT_TARGET_MIN_PX}px;min-width:${HIT_TARGET_MIN_PX}px;background:#e2e8f0;border:none;border-radius:6px;cursor:pointer;font-weight:800;font-size:1.2rem;display:flex;align-items:center;justify-content:center;" aria-label="Increase coefficient">+</button>
                      <button type="button" data-action="adjust-coeff" data-coeff-idx="${idx}" data-delta="-1" style="min-height:${HIT_TARGET_MIN_PX}px;min-width:${HIT_TARGET_MIN_PX}px;background:#e2e8f0;border:none;border-radius:6px;cursor:pointer;font-weight:800;font-size:1.2rem;display:flex;align-items:center;justify-content:center;" aria-label="Decrease coefficient">−</button>
                    </div>
                    <span style="font-size:1.6rem;font-weight:800;color:#047857;min-width:28px;text-align:center;">${coeff}</span>
                    <span style="font-size:1.4rem;font-weight:700;color:#0f172a;letter-spacing:0.02em;">${escapeHtml(r.formula)}</span>
                  </div>
                `;
              }).join('')}

              <!-- Reaction Arrow -->
              <span style="font-size:1.8rem;font-weight:800;color:#047857;margin:0 8px;">→</span>

              <!-- Products -->
              ${activeRxn.products.map((p, idx) => {
                const pGlobalIdx = totalReactants + idx;
                const coeff = productCoeffs[idx] ?? 1;
                return `
                  ${idx > 0 ? '<span style="font-size:1.5rem;font-weight:700;color:#64748b;">+</span>' : ''}
                  <div style="display:flex;align-items:center;gap:8px;background:#ffffff;padding:8px 14px;border:1px solid #cbd5e1;border-radius:8px;">
                    <div style="display:flex;flex-direction:column;gap:4px;">
                      <button type="button" data-action="adjust-coeff" data-coeff-idx="${pGlobalIdx}" data-delta="1" style="min-height:${HIT_TARGET_MIN_PX}px;min-width:${HIT_TARGET_MIN_PX}px;background:#e2e8f0;border:none;border-radius:6px;cursor:pointer;font-weight:800;font-size:1.2rem;display:flex;align-items:center;justify-content:center;" aria-label="Increase coefficient">+</button>
                      <button type="button" data-action="adjust-coeff" data-coeff-idx="${pGlobalIdx}" data-delta="-1" style="min-height:${HIT_TARGET_MIN_PX}px;min-width:${HIT_TARGET_MIN_PX}px;background:#e2e8f0;border:none;border-radius:6px;cursor:pointer;font-weight:800;font-size:1.2rem;display:flex;align-items:center;justify-content:center;" aria-label="Decrease coefficient">−</button>
                    </div>
                    <span style="font-size:1.6rem;font-weight:800;color:#0284c7;min-width:28px;text-align:center;">${coeff}</span>
                    <span style="font-size:1.4rem;font-weight:700;color:#0f172a;letter-spacing:0.02em;">${escapeHtml(p.formula)}</span>
                  </div>
                `;
              }).join('')}
            </div>

            <!-- Atom Ledger Table -->
            <div style="overflow-x:auto;">
              <table style="width:100%;border-collapse:collapse;text-align:left;font-size:0.95rem;">
                <thead>
                  <tr style="border-bottom:2px solid #cbd5e1;background:#f1f5f9;">
                    <th style="padding:10px 14px;">Element</th>
                    <th style="padding:10px 14px;">Reactants (LHS)</th>
                    <th style="padding:10px 14px;">Products (RHS)</th>
                    <th style="padding:10px 14px;">Conservation Status</th>
                  </tr>
                </thead>
                <tbody>
                  ${allElementKeys.map(el => {
                    const lCount = lhsElements[el] ?? 0;
                    const rCount = rhsElements[el] ?? 0;
                    const match = lCount === rCount;
                    return `
                      <tr style="border-bottom:1px solid #e2e8f0;">
                        <td style="padding:10px 14px;font-weight:800;font-size:1.1rem;color:#0f172a;">${escapeHtml(el)}</td>
                        <td style="padding:10px 14px;font-weight:700;color:#047857;">${lCount} atoms</td>
                        <td style="padding:10px 14px;font-weight:700;color:#0284c7;">${rCount} atoms</td>
                        <td style="padding:10px 14px;">
                          ${match ? `
                            <span style="color:#166534;font-weight:700;">✓ Equal (${lCount})</span>
                          ` : `
                            <span style="color:#b91c1c;font-weight:700;">✗ Discrepancy (${lCount} vs ${rCount}, Δ=${Math.abs(lCount - rCount)})</span>
                          `}
                        </td>
                      </tr>
                    `;
                  }).join('')}
                </tbody>
              </table>
            </div>

            <!-- Workbench Actions -->
            <div style="display:flex;gap:12px;margin-top:20px;flex-wrap:wrap;">
              <button
                type="button"
                id="btn-auto-balance"
                style="min-height:${HIT_TARGET_PRIMARY_PX}px;min-width:${HIT_TARGET_MIN_PX}px;padding:12px 24px;background:#047857;color:white;border:none;border-radius:8px;font-weight:700;font-size:0.95rem;cursor:pointer;box-shadow:0 2px 4px rgba(4,120,87,0.25);"
              >
                ✨ Apply Exact Balanced Coefficients
              </button>
              <button
                type="button"
                id="btn-reset-reaction"
                style="min-height:${HIT_TARGET_PRIMARY_PX}px;min-width:${HIT_TARGET_MIN_PX}px;padding:12px 24px;background:#f1f5f9;color:#334155;border:1px solid #cbd5e1;border-radius:8px;font-weight:700;font-size:0.95rem;cursor:pointer;"
              >
                ↺ Reset to Unbalanced
              </button>
            </div>
          </div>
        </div>
      `;
    }
  }

  // Event handlers
  function handleClick(e: MouseEvent): void {
    const target = e.target as HTMLElement | null;
    if (!target) return;

    // Tabs
    const tabBtn = target.closest<HTMLButtonElement>('button[data-tab]');
    if (tabBtn && tabBtn.dataset.tab) {
      controller.setActiveTab(tabBtn.dataset.tab as ChemTab);
      return;
    }

    // Tiers
    const tierBtn = target.closest<HTMLButtonElement>('button[data-tier]');
    if (tierBtn && tierBtn.dataset.tier) {
      controller.setTierFilter(tierBtn.dataset.tier as ChemTierFilter);
      return;
    }

    // Clear adapter
    if (target.id === 'btn-clear-adapter' || target.closest('#btn-clear-adapter')) {
      controller.selectAdapter(null);
      return;
    }

    // Action: explore-subtopics
    const subtopicsBtn = target.closest<HTMLButtonElement>('button[data-action="explore-subtopics"]');
    if (subtopicsBtn && subtopicsBtn.dataset.adapterId) {
      controller.selectAdapter(subtopicsBtn.dataset.adapterId);
      controller.setActiveTab('subtopics');
      return;
    }

    // Action: explore-qrts
    const qrtsBtn = target.closest<HTMLButtonElement>('button[data-action="explore-qrts"]');
    if (qrtsBtn && qrtsBtn.dataset.adapterId) {
      controller.selectAdapter(qrtsBtn.dataset.adapterId);
      controller.setActiveTab('qrts');
      return;
    }

    // Action: toggle-subtopic
    const stToggle = target.closest<HTMLElement>('[data-action="toggle-subtopic"]');
    if (stToggle && stToggle.dataset.stId) {
      controller.toggleSubtopicExpanded(stToggle.dataset.stId);
      return;
    }

    // Action: QRT operation filter
    const qrtOpBtn = target.closest<HTMLButtonElement>('button[data-qrt-op]');
    if (qrtOpBtn && qrtOpBtn.dataset.qrtOp) {
      controller.setQrtOperation(qrtOpBtn.dataset.qrtOp);
      return;
    }

    // Action: QRT band filter
    const qrtBandBtn = target.closest<HTMLButtonElement>('button[data-qrt-band]');
    if (qrtBandBtn && qrtBandBtn.dataset.qrtBand) {
      controller.setQrtBand(qrtBandBtn.dataset.qrtBand);
      return;
    }

    // Action: toggle-hint
    const hintBtn = target.closest<HTMLButtonElement>('button[data-action="toggle-hint"]');
    if (hintBtn && hintBtn.dataset.qid) {
      controller.toggleHint(hintBtn.dataset.qid);
      return;
    }

    // Action: select-option
    const optBtn = target.closest<HTMLButtonElement>('button[data-action="select-option"]');
    if (optBtn && optBtn.dataset.qid && optBtn.dataset.optKey) {
      controller.selectOption(optBtn.dataset.qid, optBtn.dataset.optKey);
      return;
    }

    // Action: commit-qrt
    const commitQrtBtn = target.closest<HTMLButtonElement>('button[data-action="commit-qrt"]');
    if (commitQrtBtn && commitQrtBtn.dataset.qrtId) {
      controller.commitQrt(commitQrtBtn.dataset.qrtId);
      return;
    }

    // Action: reset-qrt
    const resetQrtBtn = target.closest<HTMLButtonElement>('button[data-action="reset-qrt"]');
    if (resetQrtBtn && resetQrtBtn.dataset.qrtId) {
      controller.resetQrt(resetQrtBtn.dataset.qrtId);
      return;
    }

    // Action: commit-answer
    const commitAnsBtn = target.closest<HTMLButtonElement>('button[data-action="commit-answer"]');
    if (commitAnsBtn && commitAnsBtn.dataset.qid) {
      controller.commitAnswer(commitAnsBtn.dataset.qid);
      return;
    }

    // Action: reset-answer
    const resetAnsBtn = target.closest<HTMLButtonElement>('button[data-action="reset-answer"]');
    if (resetAnsBtn && resetAnsBtn.dataset.qid) {
      controller.resetAnswer(resetAnsBtn.dataset.qid);
      return;
    }

    // Workbench: select reaction
    const rxnBtn = target.closest<HTMLButtonElement>('button[data-action="select-rxn"]');
    if (rxnBtn && rxnBtn.dataset.rxnIdx !== undefined) {
      controller.selectReaction(parseInt(rxnBtn.dataset.rxnIdx, 10));
      return;
    }

    // Workbench: adjust coeff
    const coeffBtn = target.closest<HTMLButtonElement>('button[data-action="adjust-coeff"]');
    if (coeffBtn && coeffBtn.dataset.coeffIdx !== undefined && coeffBtn.dataset.delta !== undefined) {
      controller.adjustCoefficient(
        parseInt(coeffBtn.dataset.coeffIdx, 10),
        parseInt(coeffBtn.dataset.delta, 10)
      );
      return;
    }

    // Workbench: auto-balance
    if (target.id === 'btn-auto-balance' || target.closest('#btn-auto-balance')) {
      controller.applyBalancedReaction();
      return;
    }

    // Workbench: reset
    if (target.id === 'btn-reset-reaction' || target.closest('#btn-reset-reaction')) {
      controller.resetReaction();
      return;
    }
  }

  function handleInput(e: Event): void {
    const target = e.target as HTMLInputElement | null;
    if (target && target.id === 'chem-search-input') {
      controller.setSearchQuery(target.value);
    }
  }

  root.addEventListener('click', handleClick);
  root.addEventListener('input', handleInput);

  const unsubscribe = controller.subscribe(() => {
    render();
  });

  render();

  return {
    dispose: () => {
      unsubscribe();
      root.removeEventListener('click', handleClick);
      root.removeEventListener('input', handleInput);
      root.innerHTML = '';
    },
  };
}
