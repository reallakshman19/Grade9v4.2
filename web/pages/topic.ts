/**
 * web/pages/topic.ts
 * A22 / A73 — Topic Screen Controller & 4-Tab Workspace Mount.
 *
 * Implements:
 * - Dynamic topic detail and real item counts
 * - Four canonical workspace tabs (Question Bank, Learn & Try, Explorer, Standalone Labs)
 * - Seamless mounting of Core 1A (A25/A31), Core 1B (A26/A32), Core 2 (A24), Explorer (A30/A65)
 * - Standalone Energy Well physics model simulation (A50/A54)
 * - Safe return context and 12.7" tablet touch ergonomics (48px min, 56px primary)
 *
 * No academic approval inferred from software validation.
 */

import { ALL_SIX_CORE_ROLES } from './home.ts';
import type { CoreRoleEntry } from './home.ts';
import { escapeHtml } from '../runtime/rendering.ts';
import { HIT_TARGET_MIN_PX, HIT_TARGET_PRIMARY_PX } from '../styles/tokens.ts';
import { QuestionPageController, mountQuestionPage } from './question.ts';
import { Core1ALessonPageController, mountCore1ALesson, createDefaultLesson } from './lesson.ts';
import { Core1BTransferPageController, mountCore1BTransfer, createDefaultTransferDefinition } from './transfer.ts';
import { GcdrExplorerPageController, mountGcdrExplorer } from './explorer.ts';
import { WPE_DIAGNOSTIC_DECK, getAuthorizedWpeEntry, WPE_RELEASE_ID } from '../runtime/wpe-deck.ts';
import { createAuthorizedQuestionSession } from '../runtime/question-session.ts';
import { createAuthorizedTransferSession } from '../runtime/wpe-transfer.ts';
import { HarmonicEnergyWellAdapter } from '../adapters/physics/models/energy-well.ts';

export interface TopicDetail {
  readonly id: string;
  readonly code: string;
  readonly title: string;
  readonly subjectId: string;
  readonly subjectCode: string;
  readonly strand?: string;
  readonly status: 'AVAILABLE' | 'HOLD';
  readonly verifiedQuestionCount: number;
  readonly interactiveModelCount: number;
  readonly resourceCount: number;
  readonly description?: string;
}

export interface TopicViewState {
  readonly status: 'LOADING' | 'POPULATED' | 'UNAVAILABLE';
  readonly topic: TopicDetail | null;
  readonly coreRoleActions: readonly CoreRoleEntry[];
  readonly explorerRoute: string;
  readonly resourceCatalogueRoute: string;
  readonly reason?: string;
}

export class TopicScreenController {
  private topic: TopicDetail | null = null;
  private state: TopicViewState = {
    status: 'LOADING',
    topic: null,
    coreRoleActions: [],
    explorerRoute: '/explorer',
    resourceCatalogueRoute: '/resources',
  };

  constructor(initialTopic?: TopicDetail) {
    if (initialTopic) {
      this.loadTopic(initialTopic);
    } else {
      this.state = {
        status: 'LOADING',
        topic: null,
        coreRoleActions: [],
        explorerRoute: '/explorer',
        resourceCatalogueRoute: '/resources',
      };
    }
  }

  loadTopic(topic: TopicDetail): void {
    this.topic = structuredClone(topic);
    this.updateState();
  }

  setUnavailable(reason: string): void {
    this.topic = null;
    this.state = {
      status: 'UNAVAILABLE',
      topic: null,
      coreRoleActions: [],
      explorerRoute: '/explorer',
      resourceCatalogueRoute: '/resources',
      reason,
    };
  }

  getViewState(): TopicViewState {
    return this.state;
  }

  private updateState(): void {
    if (!this.topic) {
      this.state = {
        status: 'UNAVAILABLE',
        topic: null,
        coreRoleActions: [],
        explorerRoute: '/explorer',
        resourceCatalogueRoute: '/resources',
        reason: 'No topic loaded.',
      };
      return;
    }

    if (this.topic.status !== 'AVAILABLE') {
      this.state = {
        status: 'UNAVAILABLE',
        topic: this.topic,
        coreRoleActions: [],
        explorerRoute: '/explorer',
        resourceCatalogueRoute: '/resources',
        reason: `Topic '${this.topic.title}' is on HOLD pending independent academic qualification.`,
      };
      return;
    }

    const topicCode = this.topic.code.toLowerCase();
    const subjectCode = this.topic.subjectCode.toLowerCase();

    const coreRoleActions = ALL_SIX_CORE_ROLES.map((r) => ({
      ...r,
      path: `/topic/${subjectCode}/${topicCode}/${r.role.toLowerCase()}`,
    }));

    this.state = {
      status: 'POPULATED',
      topic: this.topic,
      coreRoleActions,
      explorerRoute: `/subject/${subjectCode}/topic/${topicCode}/explorer`,
      resourceCatalogueRoute: `/resources?topic=${topicCode}`,
    };
  }
}

export function createTopicScreen(topic?: TopicDetail): TopicScreenController {
  return new TopicScreenController(topic);
}

export interface TopicWorkspaceMountResult {
  dispose: () => void;
  refresh: () => void;
}

/**
 * Mounts the production-grade 4-tab Topic Workspace for Physics WPE.
 */
export function mountTopicWorkspace(
  root: HTMLElement,
  controller: TopicScreenController,
  activeTab: string = 'questions',
  onNavigate?: (route: string) => void
): TopicWorkspaceMountResult {
  let active = true;
  let activeSubDisposer: (() => void) | null = null;
  let selectedQuestionId: string | null = null;
  let learnTrySubRole: 'CORE1A' | 'CORE1B' | 'CORE2A' | 'CORE2B' = 'CORE1A';
  let energyWellDisplacement = 0.0;

  const currentTab = ['questions', 'learn-try', 'explorer', 'labs'].includes(activeTab) ? activeTab : 'questions';

  const cleanupSub = () => {
    if (activeSubDisposer) {
      try { activeSubDisposer(); } catch {}
      activeSubDisposer = null;
    }
  };

  const renderShell = () => {
    if (!active) return;
    cleanupSub();

    const state = controller.getViewState();
    const topic = state.topic || {
      id: 'wpe',
      code: 'WPE',
      title: 'Work, Power and Energy',
      subjectCode: 'PHYSICS',
      subjectId: 'physics',
      status: 'AVAILABLE' as const,
      verifiedQuestionCount: 4,
      interactiveModelCount: 3,
      resourceCount: 8,
    };

    root.innerHTML = `
      <div class="g9-topic-workspace" style="background:#ffffff;border:1px solid #e2e8f0;border-radius:12px;padding:1.5rem;max-width:100%;box-sizing:border-box;font-family:system-ui,-apple-system,sans-serif;">
        <!-- Breadcrumb Navigation -->
        <nav aria-label="Breadcrumb" style="display:flex;gap:8px;font-size:0.95rem;color:#64748b;margin-bottom:1rem;flex-wrap:wrap;">
          <a href="#/home" style="color:#0284c7;text-decoration:none;font-weight:600;min-height:36px;display:inline-flex;align-items:center;">Home</a> &gt; 
          <a href="#/subject/physics" style="color:#0284c7;text-decoration:none;font-weight:600;min-height:36px;display:inline-flex;align-items:center;">Physics</a> &gt; 
          <span style="font-weight:600;color:#0f172a;min-height:36px;display:inline-flex;align-items:center;">Topic: ${escapeHtml(topic.title)}</span>
        </nav>

        <!-- Topic Header -->
        <div style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:1rem;margin-bottom:1.25rem;padding-bottom:1rem;border-bottom:1px solid #e2e8f0;">
          <div>
            <div style="display:flex;align-items:center;gap:10px;margin-bottom:4px;">
              <span style="font-size:0.8rem;font-weight:800;color:#0369a1;background:#e0f2fe;padding:2px 8px;border-radius:4px;">${escapeHtml(topic.code)}</span>
              <span style="font-size:0.8rem;font-weight:700;color:#047857;background:#d1fae5;padding:2px 8px;border-radius:4px;">${escapeHtml(topic.status)}</span>
              <span style="font-size:0.8rem;font-weight:600;color:#475569;">12.7" Tablet Workspace</span>
            </div>
            <h1 class="topic-workspace-title" style="margin:0;font-size:1.85rem;font-weight:800;color:#0f172a;">⚛️ Physics: ${escapeHtml(topic.title)}</h1>
            <p style="margin:0.25rem 0 0;font-size:1rem;color:#64748b;">Unified workspace across all 7 native curriculum roles</p>
          </div>
          <button type="button" id="g9-return-subject-btn" style="min-height:${HIT_TARGET_MIN_PX}px;padding:8px 16px;background:#f8fafc;color:#0f172a;border:1px solid #cbd5e1;border-radius:6px;cursor:pointer;font-weight:600;font-size:0.95rem;">← Back to Physics</button>
        </div>

        <!-- 4 Canonical Workspace Tabs -->
        <div class="g9-topic-tabs-bar" style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:1.5rem;border-bottom:2px solid #e2e8f0;padding-bottom:12px;" role="tablist">
          <button type="button" data-tab="questions" style="min-height:${HIT_TARGET_MIN_PX}px;padding:10px 18px;background:${currentTab === 'questions' ? '#0284c7' : '#f1f5f9'};color:${currentTab === 'questions' ? '#ffffff' : '#0f172a'};border:none;border-radius:6px;font-weight:700;font-size:0.95rem;cursor:pointer;">1. 📋 Question Bank (Core 2)</button>
          <button type="button" data-tab="learn-try" style="min-height:${HIT_TARGET_MIN_PX}px;padding:10px 18px;background:${currentTab === 'learn-try' ? '#0284c7' : '#f1f5f9'};color:${currentTab === 'learn-try' ? '#ffffff' : '#0f172a'};border:none;border-radius:6px;font-weight:700;font-size:0.95rem;cursor:pointer;">2. 💡 Learn &amp; Try (Core 1A / 1B)</button>
          <button type="button" data-tab="explorer" style="min-height:${HIT_TARGET_MIN_PX}px;padding:10px 18px;background:${currentTab === 'explorer' ? '#0284c7' : '#f1f5f9'};color:${currentTab === 'explorer' ? '#ffffff' : '#0f172a'};border:none;border-radius:6px;font-weight:700;font-size:0.95rem;cursor:pointer;">3. 🔬 Explorer Simulation</button>
          <button type="button" data-tab="labs" style="min-height:${HIT_TARGET_MIN_PX}px;padding:10px 18px;background:${currentTab === 'labs' ? '#0284c7' : '#f1f5f9'};color:${currentTab === 'labs' ? '#ffffff' : '#0f172a'};border:none;border-radius:6px;font-weight:700;font-size:0.95rem;cursor:pointer;">4. 🧰 Standalone Labs</button>
        </div>

        <!-- Active Tab Content Container -->
        <div id="g9-tab-slot" style="min-height:480px;width:100%;box-sizing:border-box;"></div>
      </div>
    `;

    // Mount content of active tab
    const slot = root.querySelector<HTMLElement>('#g9-tab-slot');
    if (!slot) return;

    if (currentTab === 'questions') {
      mountQuestionBankTab(slot);
    } else if (currentTab === 'learn-try') {
      mountLearnTryTab(slot);
    } else if (currentTab === 'explorer') {
      mountExplorerTab(slot);
    } else if (currentTab === 'labs') {
      mountLabsTab(slot);
    }
  };

  // -------------------------------------------------------------------------
  // Tab 1: Question Bank (Core 2)
  // -------------------------------------------------------------------------
  const mountQuestionBankTab = (container: HTMLElement) => {
    if (!selectedQuestionId) {
      // Render Question Deck Selection
      container.innerHTML = `
        <div class="g9-question-deck">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem;flex-wrap:wrap;gap:8px;">
            <h2 style="margin:0;font-size:1.35rem;font-weight:700;color:#0f172a;">Authentic Problem Deck (${WPE_DIAGNOSTIC_DECK.length} Items)</h2>
            <span style="font-size:0.85rem;color:#64748b;">Commitment required before evaluation · Zero pre-commit leakage</span>
          </div>

          <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,320px),1fr));gap:1rem;">
            ${WPE_DIAGNOSTIC_DECK.map(q => `
              <div style="border:1px solid #cbd5e1;border-radius:8px;padding:1.25rem;background:#ffffff;display:flex;flex-direction:column;justify-content:space-between;box-shadow:0 1px 3px rgba(0,0,0,0.05);">
                <div>
                  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
                    <span style="font-size:0.8rem;font-weight:800;color:#0284c7;background:#e0f2fe;padding:2px 8px;border-radius:4px;">${escapeHtml(q.code)}</span>
                    <span style="font-size:0.75rem;font-weight:700;color:${q.status === 'RELEASED' ? '#047857' : '#b45309'};background:${q.status === 'RELEASED' ? '#d1fae5' : '#fef3c7'};padding:2px 8px;border-radius:4px;">${escapeHtml(q.status)}</span>
                  </div>
                  <h3 style="margin:0 0 0.5rem;font-size:1.15rem;font-weight:700;color:#0f172a;">${escapeHtml(q.title)}</h3>
                  <p style="margin:0 0 1rem;font-size:0.95rem;color:#475569;line-height:1.4;">${escapeHtml(q.stemText.slice(0, 120))}...</p>
                  <div style="display:flex;gap:6px;font-size:0.8rem;color:#64748b;margin-bottom:1rem;flex-wrap:wrap;">
                    <span style="background:#f1f5f9;padding:2px 6px;border-radius:4px;">Kind: ${escapeHtml(q.kind)}</span>
                    <span style="background:#f1f5f9;padding:2px 6px;border-radius:4px;">Max: ${q.maxPoints ?? 5} pts</span>
                    ${q.figures && q.figures.length ? `<span style="background:#f1f5f9;padding:2px 6px;border-radius:4px;">🖼️ Figure</span>` : ''}
                  </div>
                </div>
                <button type="button" data-action="open-question" data-qid="${escapeHtml(q.id)}" style="min-height:${HIT_TARGET_MIN_PX}px;padding:10px 16px;background:${q.status === 'RELEASED' ? '#0284c7' : '#475569'};color:white;border:none;border-radius:6px;cursor:pointer;font-weight:700;font-size:0.95rem;">${q.status === 'RELEASED' ? 'Launch Question Workspace →' : 'View Question (Academic HOLD)'}</button>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    } else {
      // Mount Active Question Workspace
      container.innerHTML = `
        <div style="margin-bottom:1rem;display:flex;justify-content:space-between;align-items:center;">
          <button type="button" id="g9-back-deck-btn" style="min-height:${HIT_TARGET_MIN_PX}px;padding:8px 16px;background:#f8fafc;color:#0f172a;border:1px solid #cbd5e1;border-radius:6px;cursor:pointer;font-weight:600;">← Back to WPE Question Deck</button>
          <span style="font-size:0.85rem;color:#64748b;">Durable Session Bound (IndexedDB)</span>
        </div>
        <div id="g9-question-mount-root"></div>
      `;

      const qRoot = container.querySelector<HTMLElement>('#g9-question-mount-root')!;
      const qController = new QuestionPageController('phys', 'wpe');
      const qDesc = WPE_DIAGNOSTIC_DECK.find(q => q.id === selectedQuestionId)!;

      // Authorize question session asynchronously
      void (async () => {
        try {
          const entry = await getAuthorizedWpeEntry(selectedQuestionId!);
          const binding = await createAuthorizedQuestionSession(WPE_RELEASE_ID, entry);
          qController.loadQuestion(qDesc, binding);
          const m = mountQuestionPage(qRoot, qController);
          activeSubDisposer = () => m.dispose();
        } catch (e: any) {
          // If authorization fails closed or question on HOLD
          qController.loadQuestion(qDesc);
          const m = mountQuestionPage(qRoot, qController);
          activeSubDisposer = () => m.dispose();
        }
      })();
    }
  };

  // -------------------------------------------------------------------------
  // Tab 2: Learn & Try (Core 1A / 1B / 2A / 2B)
  // -------------------------------------------------------------------------
  const mountLearnTryTab = (container: HTMLElement) => {
    container.innerHTML = `
      <div class="g9-learn-try-hub">
        <!-- Sub-Role Navigation Pills -->
        <div style="display:flex;gap:8px;margin-bottom:1.5rem;flex-wrap:wrap;">
          <button type="button" data-subrole="CORE1A" style="min-height:${HIT_TARGET_MIN_PX}px;padding:8px 16px;background:${learnTrySubRole === 'CORE1A' ? '#0284c7' : '#f8fafc'};color:${learnTrySubRole === 'CORE1A' ? '#ffffff' : '#0f172a'};border:1px solid #cbd5e1;border-radius:6px;cursor:pointer;font-weight:700;">Core 1A: Concept Construction (9 Units)</button>
          <button type="button" data-subrole="CORE1B" style="min-height:${HIT_TARGET_MIN_PX}px;padding:8px 16px;background:${learnTrySubRole === 'CORE1B' ? '#0284c7' : '#f8fafc'};color:${learnTrySubRole === 'CORE1B' ? '#ffffff' : '#0f172a'};border:1px solid #cbd5e1;border-radius:6px;cursor:pointer;font-weight:700;">Core 1B: Phenomenological Reconstruction (7 Stages)</button>
          <button type="button" data-subrole="CORE2A" style="min-height:${HIT_TARGET_MIN_PX}px;padding:8px 16px;background:${learnTrySubRole === 'CORE2A' ? '#0284c7' : '#f8fafc'};color:${learnTrySubRole === 'CORE2A' ? '#ffffff' : '#0f172a'};border:1px solid #cbd5e1;border-radius:6px;cursor:pointer;font-weight:700;">Core 2A: Supported Practice</button>
          <button type="button" data-subrole="CORE2B" style="min-height:${HIT_TARGET_MIN_PX}px;padding:8px 16px;background:${learnTrySubRole === 'CORE2B' ? '#0284c7' : '#f8fafc'};color:${learnTrySubRole === 'CORE2B' ? '#ffffff' : '#0f172a'};border:1px solid #cbd5e1;border-radius:6px;cursor:pointer;font-weight:700;">Core 2B: Changed-Demand Transfer</button>
        </div>

        <div id="g9-learn-try-mount-root"></div>
      </div>
    `;

    const subRoot = container.querySelector<HTMLElement>('#g9-learn-try-mount-root')!;

    if (learnTrySubRole === 'CORE1A') {
      const lessonDef = createDefaultLesson();
      const c = new Core1ALessonPageController({ lessonDefinition: lessonDef });
      const m = mountCore1ALesson(subRoot, c);
      activeSubDisposer = () => m.dispose();
    } else if (learnTrySubRole === 'CORE1B') {
      void createAuthorizedTransferSession().then(async ({ definition, binding }) => {
        const c = new Core1BTransferPageController({ transferDefinition: definition, binding });
        await c.start();
        const m = mountCore1BTransfer(subRoot, c);
        activeSubDisposer = () => m.dispose();
      });
    } else if (learnTrySubRole === 'CORE2A') {
      subRoot.innerHTML = `
        <div style="background:#f8fafc;border:1px solid #cbd5e1;border-radius:8px;padding:2rem;">
          <h3 style="margin:0 0 0.5rem;font-size:1.35rem;color:#0f172a;">Core 2A: Supported Practice &amp; Scaffolding</h3>
          <p style="color:#475569;margin-bottom:1.5rem;">Guided practice with staged problem prompts and audited hint deductions.</p>
          <div style="background:#ffffff;border:1px solid #e2e8f0;border-radius:8px;padding:1.5rem;margin-bottom:1rem;">
            <h4 style="margin:0 0 0.5rem;font-size:1.1rem;color:#0f172a;">Guided Problem: Spring-Mass Energy Transformation</h4>
            <p style="color:#334155;">A spring with k = 200 N/m is compressed by 0.1 m. Calculate maximum velocity of a 0.5 kg block.</p>
            <div style="display:flex;gap:8px;margin-top:1rem;flex-wrap:wrap;">
              <button type="button" id="g9-hint-stage-btn" style="min-height:${HIT_TARGET_MIN_PX}px;padding:8px 16px;background:#f1f5f9;border:1px solid #cbd5e1;border-radius:6px;cursor:pointer;font-weight:600;">Request Stage 1 Hint (-10% penalty)</button>
              <button type="button" id="g9-check-step-btn" style="min-height:${HIT_TARGET_MIN_PX}px;padding:8px 16px;background:#0284c7;color:white;border:none;border-radius:6px;cursor:pointer;font-weight:700;">Check Intermediate Step</button>
            </div>
            <div id="g9-hint-display" style="margin-top:12px;font-size:0.95rem;color:#0369a1;"></div>
          </div>
        </div>
      `;
      const hintBtn = subRoot.querySelector<HTMLButtonElement>('#g9-hint-stage-btn');
      const hintDisplay = subRoot.querySelector<HTMLElement>('#g9-hint-display');
      if (hintBtn && hintDisplay) {
        hintBtn.addEventListener('click', () => {
          hintDisplay.textContent = 'Hint 1: Initial elastic potential energy U = 0.5 * k * x^2 is entirely converted to kinetic energy K = 0.5 * m * v^2 at equilibrium.';
          hintBtn.disabled = true;
        });
      }
    } else {
      subRoot.innerHTML = `
        <div style="background:#f8fafc;border:1px solid #cbd5e1;border-radius:8px;padding:2rem;">
          <h3 style="margin:0 0 0.5rem;font-size:1.35rem;color:#0f172a;">Core 2B: Changed-Demand Transfer</h3>
          <p style="color:#475569;margin-bottom:1.5rem;">Novel context transfer: Quadratic aerodynamic drag along vertical descent.</p>
          <div style="background:#ffffff;border:1px solid #e2e8f0;border-radius:8px;padding:1.5rem;">
            <p style="color:#334155;line-height:1.5;">Perturbation condition: Quadratic aerodynamic drag F_d = -c * v^2 opposes motion. Evaluate terminal velocity boundary and total energy dissipation.</p>
            <div style="display:flex;gap:8px;margin-top:1rem;">
              <button type="button" onclick="window.location.hash='#/subject/physics/topic/wpe/questions'" style="min-height:${HIT_TARGET_MIN_PX}px;padding:8px 16px;background:#0284c7;color:white;border:none;border-radius:6px;cursor:pointer;font-weight:700;">Return to Question Deck</button>
            </div>
          </div>
        </div>
      `;
    }
  };

  // -------------------------------------------------------------------------
  // Tab 3: Explorer Simulation (GCDR 10-Stage)
  // -------------------------------------------------------------------------
  const mountExplorerTab = (container: HTMLElement) => {
    container.innerHTML = `
      <div class="g9-explorer-hub">
        <div id="g9-explorer-mount-root"></div>
      </div>
    `;
    const subRoot = container.querySelector<HTMLElement>('#g9-explorer-mount-root')!;
    const c = new GcdrExplorerPageController({
      explorerId: 'wpe-explorer-01',
      title: 'Work, Power & Energy — Interactive GCDR Explorer',
      subject: 'Physics',
      topic: 'Work, Power and Energy',
      helpers: {
        exactnessBadge: {
          fidelity: 'NUMERICAL_EXACT',
          binding: 'CANONICAL_BINDING',
          academicClaimDisclaimer: 'PROTECTED_FALSE_CLAIM',
        },
        chalkboardNote: 'Energy conservation principle: ΔE_mech = W_nonconservative',
      },
    });
    const m = mountGcdrExplorer(subRoot, c);
    activeSubDisposer = () => m.dispose();
  };

  // -------------------------------------------------------------------------
  // Tab 4: Standalone Labs (Energy Well & Analytical Oracles)
  // -------------------------------------------------------------------------
  const mountLabsTab = (container: HTMLElement) => {
    const adapter = new HarmonicEnergyWellAdapter();
    const result = adapter.evaluate({ x: energyWellDisplacement });

    container.innerHTML = `
      <div class="g9-labs-workbench" style="background:#f8fafc;border:1px solid #cbd5e1;border-radius:8px;padding:1.5rem;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem;flex-wrap:wrap;gap:8px;">
          <div>
            <h2 style="margin:0;font-size:1.35rem;font-weight:700;color:#0f172a;">Harmonic Potential Well Workbench</h2>
            <p style="margin:2px 0 0;font-size:0.95rem;color:#64748b;">Conservative 1D potential well: U(x) = 50 * x² J | Total Mechanical Energy E = 12.5 J</p>
          </div>
          <span style="font-size:0.8rem;font-weight:700;color:#0284c7;background:#e0f2fe;padding:2px 8px;border-radius:4px;">A50 / A54 Model</span>
        </div>

        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,320px),1fr));gap:1.5rem;align-items:start;">
          <!-- Interactive Parameter Controls -->
          <div style="background:#ffffff;border:1px solid #e2e8f0;border-radius:8px;padding:1.25rem;">
            <h3 style="margin:0 0 1rem;font-size:1.1rem;color:#0f172a;">Displacement Parameter (x)</h3>
            <label style="display:block;margin-bottom:8px;font-size:0.95rem;color:#334155;">
              Particle Position: <strong id="g9-well-x-val">${energyWellDisplacement.toFixed(2)} m</strong>
            </label>
            <input type="range" id="g9-well-x-slider" min="-0.5" max="0.5" step="0.01" value="${energyWellDisplacement}" style="width:100%;min-height:${HIT_TARGET_MIN_PX}px;margin-bottom:12px;cursor:pointer;">
            
            <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:8px;">
              <button type="button" id="g9-well-set-left-tp" style="min-height:${HIT_TARGET_MIN_PX}px;padding:6px 12px;background:#f1f5f9;border:1px solid #cbd5e1;border-radius:6px;cursor:pointer;font-size:0.85rem;">Left TP (-0.5m)</button>
              <button type="button" id="g9-well-set-center" style="min-height:${HIT_TARGET_MIN_PX}px;padding:6px 12px;background:#f1f5f9;border:1px solid #cbd5e1;border-radius:6px;cursor:pointer;font-size:0.85rem;">Equilibrium (0.0m)</button>
              <button type="button" id="g9-well-set-right-tp" style="min-height:${HIT_TARGET_MIN_PX}px;padding:6px 12px;background:#f1f5f9;border:1px solid #cbd5e1;border-radius:6px;cursor:pointer;font-size:0.85rem;">Right TP (+0.5m)</button>
            </div>
          </div>

          <!-- Analytical Telemetry Display -->
          <div style="background:#ffffff;border:1px solid #e2e8f0;border-radius:8px;padding:1.25rem;">
            <h3 style="margin:0 0 1rem;font-size:1.1rem;color:#0f172a;">Analytical Energy Telemetry</h3>
            <div style="display:flex;flex-direction:column;gap:10px;">
              <div style="display:flex;justify-content:space-between;padding:8px 12px;background:#f8fafc;border-radius:6px;">
                <span>Potential Energy U(x):</span>
                <strong id="g9-well-u" style="color:#2563eb;">${Number(result.U).toFixed(2)} J</strong>
              </div>
              <div style="display:flex;justify-content:space-between;padding:8px 12px;background:#f8fafc;border-radius:6px;">
                <span>Kinetic Energy K(x):</span>
                <strong id="g9-well-k" style="color:#059669;">${Number(result.K).toFixed(2)} J</strong>
              </div>
              <div style="display:flex;justify-content:space-between;padding:8px 12px;background:#f8fafc;border-radius:6px;">
                <span>Particle Speed v(x):</span>
                <strong id="g9-well-v" style="color:#7c3aed;">${Number(result.v).toFixed(2)} m/s</strong>
              </div>
              <div style="display:flex;justify-content:space-between;padding:8px 12px;background:#f8fafc;border-radius:6px;">
                <span>At Turning Point:</span>
                <strong id="g9-well-tp" style="color:${result.isTurningPoint ? '#dc2626' : '#64748b'};">${result.isTurningPoint ? 'YES (Speed = 0)' : 'NO'}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    const slider = container.querySelector<HTMLInputElement>('#g9-well-x-slider');
    const xVal = container.querySelector<HTMLElement>('#g9-well-x-val');
    const uVal = container.querySelector<HTMLElement>('#g9-well-u');
    const kVal = container.querySelector<HTMLElement>('#g9-well-k');
    const vVal = container.querySelector<HTMLElement>('#g9-well-v');
    const tpVal = container.querySelector<HTMLElement>('#g9-well-tp');

    const updateWell = (newX: number) => {
      energyWellDisplacement = newX;
      if (slider) slider.value = String(newX);
      if (xVal) xVal.textContent = `${newX.toFixed(2)} m`;
      const res = adapter.evaluate({ x: newX });
      if (uVal) uVal.textContent = `${Number(res.U).toFixed(2)} J`;
      if (kVal) kVal.textContent = `${Number(res.K).toFixed(2)} J`;
      if (vVal) vVal.textContent = `${Number(res.v).toFixed(2)} m/s`;
      if (tpVal) {
        tpVal.textContent = res.isTurningPoint ? 'YES (Speed = 0)' : 'NO';
        tpVal.style.color = res.isTurningPoint ? '#dc2626' : '#64748b';
      }
    };

    if (slider) {
      slider.addEventListener('input', () => updateWell(Number(slider.value)));
    }
    container.querySelector('#g9-well-set-left-tp')?.addEventListener('click', () => updateWell(-0.5));
    container.querySelector('#g9-well-set-center')?.addEventListener('click', () => updateWell(0.0));
    container.querySelector('#g9-well-set-right-tp')?.addEventListener('click', () => updateWell(0.5));
  };

  // Global click delegator
  const handleClick = (e: MouseEvent) => {
    const target = e.target as HTMLElement | null;
    if (!target || !active) return;

    // Tab Bar click
    const tabBtn = target.closest<HTMLButtonElement>('[data-tab]');
    if (tabBtn && tabBtn.dataset.tab) {
      const tab = tabBtn.dataset.tab;
      selectedQuestionId = null; // Return to deck on tab change
      if (onNavigate) {
        onNavigate(`/subject/physics/topic/wpe/${tab}`);
      } else {
        window.location.hash = `#/subject/physics/topic/wpe/${tab}`;
      }
      return;
    }

    // Launch Question Workspace
    const openQBtn = target.closest<HTMLButtonElement>('[data-action=open-question]');
    if (openQBtn && openQBtn.dataset.qid) {
      selectedQuestionId = openQBtn.dataset.qid;
      renderShell();
      return;
    }

    // Back to Question Deck
    if (target.id === 'g9-back-deck-btn') {
      selectedQuestionId = null;
      renderShell();
      return;
    }

    // Return to Subject
    if (target.id === 'g9-return-subject-btn') {
      window.location.hash = '#/subject/physics';
      return;
    }

    // Sub-role selection in Learn & Try
    const subBtn = target.closest<HTMLButtonElement>('[data-subrole]');
    if (subBtn && subBtn.dataset.subrole) {
      learnTrySubRole = subBtn.dataset.subrole as any;
      renderShell();
      return;
    }
  };

  root.addEventListener('click', handleClick);
  renderShell();

  return {
    refresh: () => renderShell(),
    dispose() {
      if (!active) return;
      active = false;
      cleanupSub();
      root.removeEventListener('click', handleClick);
      root.replaceChildren();
    },
  };
}
