/**
 * web/pages/redox-adaptive.ts
 * A69 / Workpack A69-02 — Redox Adaptive Hard-Concept Visual Proof Workbench.
 *
 * Migrated from exact pinned v3.5 source custody:
 * - Repository: Grade9v3.5 (commit 8a02a8eb23ea37a7d8acb74d1bc193dd17657e5b)
 * - Source path: public/chemistry/redox/explorers/redox_reactions/adaptive-hard-concept-proof.html (blob f173e1f8...)
 *
 * Implements:
 * 1. Three canonical hard-concept blocks:
 *    - Block 0: Default rule breaks (CrO5 peroxide structural exception, formal Cr oxidation state +6).
 *    - Block 1: Reaction-dependent n-factor (KMnO4 medium-dependent reduction: +7 -> +2, +4, +6).
 *    - Block 2: Multi-centre electron equivalence (FeC2O4 dual-centre donor vs Cr2O7^2- acceptance).
 * 2. Two-attempt routing state machine:
 *    - OPEN -> READY (both independent first pass), REINFORCE (mixed/helped), REBUILD (both missed).
 *    - First-attempt memory invariant: Subsequent corrections update solve status but preserve
 *      initial route verdict until explicit resetBlock().
 * 3. Multi-depth vector SVG visual representations (V0 to V3).
 * 4. Formative self-check classification:
 *    - Explicitly badged as formative diagnostic drill.
 *    - Local verification only; disclaims secure examination assessment.
 * 5. Touch ergonomics: >= 48px interactive bounds, zero horizontal overflow.
 *
 * No academic approval inferred from software validation.
 */

import { HIT_TARGET_MIN_PX, HIT_TARGET_PRIMARY_PX } from '../styles/tokens.ts';
import { escapeHtml } from '../runtime/rendering.ts';

export type RedoxRouteState = 'OPEN' | 'READY' | 'REINFORCE' | 'REBUILD';

export interface RedoxBlockDefinition {
  readonly kicker: string;
  readonly title: string;
  readonly why: string;
  readonly conceptPrompt: string;
  readonly options: readonly string[];
  readonly conceptAnswer: number;
  readonly implementationPrompt: string;
  readonly implementationAnswers: readonly string[];
  readonly hints: readonly string[];
  readonly transfer: string;
  readonly repair: string;
}

export interface RedoxBlockProgress {
  hintDepth: number;
  hintUsed: boolean;
  conceptFirst: boolean | null;
  conceptSolved: boolean;
  lastChoice: number | null;
  implFirst: boolean | null;
  implSolved: boolean;
  implLast: string;
  repairOpen: boolean;
  transferOpen: boolean;
}

export const REDOX_BLOCKS: readonly RedoxBlockDefinition[] = [
  {
    kicker: 'Hard concept 1 · structural exception',
    title: 'When a familiar oxidation-state rule stops being sufficient',
    why: 'The learner may know ordinary oxidation-number rules but still fail when structure changes the valid oxygen assignment. The hard move is deciding that formula-only bookkeeping is unsafe.',
    conceptPrompt: 'CrO₅ gives Cr = +10 if every oxygen is assigned −2. What is the best next move?',
    options: [
      'Accept +10 because the arithmetic closes.',
      'Inspect the structure for O–O peroxide bonds before assigning every oxygen.',
      'Replace every oxygen by its average oxidation state.',
    ],
    conceptAnswer: 1,
    implementationPrompt: 'CrO₅ has four peroxide O atoms at −1 and one oxo O at −2. Enter the formal oxidation state of Cr.',
    implementationAnswers: ['6', '+6'],
    hints: [
      'Default oxidation-state rules have structural exceptions; first ask whether oxygen occurs in an O–O unit.',
      'The CrO₅ butterfly contains two O–O peroxide links: four peroxide oxygens are formally −1.',
      'Charge ledger: x + 4(−1) + (−2) = 0. Solve for x.',
    ],
    transfer: 'REDOX-Q09 · peroxo acids / peroxide oxygen assignment',
    repair: 'Full repair: use the structure-aware oxidation-state explorer. Compare the blanket O = −2 model with explicit peroxide O–O connectivity.',
  },
  {
    kicker: 'Hard concept 2 · reaction-dependent n-factor',
    title: 'n-factor belongs to the reaction pathway, not the reagent label',
    why: 'Memorising "KMnO₄ has n = 5" fails when the product changes. The causal chain is medium → product → final Mn oxidation state → electron uptake.',
    conceptPrompt: 'Why can MnO₄⁻ have n-factors 5, 3, or 1 in different reaction conditions?',
    options: [
      'Its molar mass changes with pH.',
      'The final manganese product changes, so the oxidation-state drop and electron uptake change.',
      'n-factor is chosen only to make N₁V₁ = N₂V₂ work.',
    ],
    conceptAnswer: 1,
    implementationPrompt: 'For MnO₄⁻ → MnO₂, Mn changes from +7 to +4. Enter the n-factor per MnO₄⁻.',
    implementationAnswers: ['3'],
    hints: [
      'Start from the manganese oxidation state in permanganate: +7.',
      'For MnO₂ the final manganese oxidation state is +4.',
      'The change +7 → +4 means a gain of 3 electrons per MnO₄⁻.',
    ],
    transfer: 'REDOX-Q02 · reaction-dependent KMnO₄ n-factor',
    repair: 'Full repair: branch the same MnO₄⁻ reactant to Mn²⁺, MnO₂ and MnO₄²⁻; derive 5, 3 and 1 from the three oxidation-state drops.',
  },
  {
    kicker: 'Hard concept 3 · electron equivalence',
    title: 'Count every redox-active contribution before using stoichiometry',
    why: 'A formula unit can contain more than one electron-donating component. Equivalent chemistry becomes reliable only after the total electron inventory is built.',
    conceptPrompt: 'When FeC₂O₄ is oxidised to Fe³⁺ and CO₂, which part of FeC₂O₄ contributes to electron donation?',
    options: [
      'Only Fe²⁺.',
      'Only oxalate.',
      'Both Fe²⁺ and oxalate.',
    ],
    conceptAnswer: 2,
    implementationPrompt: 'Fe²⁺ gives 1 e⁻ and C₂O₄²⁻ gives 2 e⁻. Dichromate accepts 6 e⁻ per Cr₂O₇²⁻. Enter the mole ratio FeC₂O₄ : Cr₂O₇²⁻.',
    implementationAnswers: ['2:1', '2/1', '2'],
    hints: [
      'Do not stop after the metal ion. Ask whether the carbon/oxalate fragment also changes oxidation state.',
      'Per FeC₂O₄: Fe contributes 1 e⁻ and oxalate contributes 2 e⁻.',
      'Total donation is 3 e⁻ per FeC₂O₄; dichromate accepts 6 e⁻. Match electron totals.',
    ],
    transfer: 'REDOX-Q05 · FeC₂O₄ vs dichromate electron-equivalence ratio',
    repair: 'Full repair: separate Fe²⁺ and oxalate into two donor ledgers, total them to 3 e⁻ per formula unit, then match against the 6 e⁻ dichromate acceptance.',
  },
];

export class RedoxAdaptiveController {
  private currentBlockIndex: number = 0;
  private progress: RedoxBlockProgress[];

  constructor(initialBlock: number = 0) {
    this.currentBlockIndex = Math.max(0, Math.min(2, initialBlock));
    this.progress = REDOX_BLOCKS.map(() => ({
      hintDepth: 0,
      hintUsed: false,
      conceptFirst: null,
      conceptSolved: false,
      lastChoice: null,
      implFirst: null,
      implSolved: false,
      implLast: '',
      repairOpen: false,
      transferOpen: false,
    }));
  }

  getCurrentBlockIndex(): number {
    return this.currentBlockIndex;
  }

  selectBlock(index: number): void {
    if (index >= 0 && index < REDOX_BLOCKS.length) {
      this.currentBlockIndex = index;
    }
  }

  getCurrentBlock(): RedoxBlockDefinition {
    return REDOX_BLOCKS[this.currentBlockIndex]!;
  }

  getProgress(index?: number): RedoxBlockProgress {
    const idx = index !== undefined ? index : this.currentBlockIndex;
    return structuredClone(this.progress[idx]!);
  }

  exportState(): { currentBlockIndex: number; progress: RedoxBlockProgress[] } {
    return {
      currentBlockIndex: this.currentBlockIndex,
      progress: structuredClone(this.progress),
    };
  }

  restoreState(state: { currentBlockIndex: number; progress: RedoxBlockProgress[] }): void {
    if (
      !state ||
      typeof state !== 'object' ||
      !Array.isArray(state.progress) ||
      state.progress.length !== REDOX_BLOCKS.length ||
      typeof state.currentBlockIndex !== 'number' ||
      state.currentBlockIndex < 0 ||
      state.currentBlockIndex >= REDOX_BLOCKS.length
    ) {
      throw new Error('Foreign or invalid redox adaptive state');
    }
    this.currentBlockIndex = state.currentBlockIndex;
    this.progress = structuredClone(state.progress);
  }

  getRouteState(index?: number): RedoxRouteState {
    const idx = index !== undefined ? index : this.currentBlockIndex;
    const p = this.progress[idx]!;
    if (p.conceptFirst === null || p.implFirst === null) return 'OPEN';
    if (p.conceptFirst && p.implFirst && !p.hintUsed) return 'READY';
    if (!p.conceptFirst && !p.implFirst) return 'REBUILD';
    return 'REINFORCE';
  }

  checkConcept(choiceIndex: number): boolean {
    const b = REDOX_BLOCKS[this.currentBlockIndex]!;
    const p = this.progress[this.currentBlockIndex]!;
    const isOk = choiceIndex === b.conceptAnswer;

    if (p.conceptFirst === null) {
      p.conceptFirst = isOk;
    }
    p.lastChoice = choiceIndex;
    if (isOk) {
      p.conceptSolved = true;
    }
    return isOk;
  }

  checkImplementation(rawInput: string): boolean {
    const b = REDOX_BLOCKS[this.currentBlockIndex]!;
    const p = this.progress[this.currentBlockIndex]!;
    const norm = (v: string) =>
      String(v || '')
        .toLowerCase()
        .replace(/\s+/g, '')
        .replace(/[−–—]/g, '-');
    const inputNorm = norm(rawInput);
    const isOk = b.implementationAnswers.some((a) => norm(a) === inputNorm);

    if (p.implFirst === null) {
      p.implFirst = isOk;
    }
    p.implLast = rawInput;
    if (isOk) {
      p.implSolved = true;
    }
    return isOk;
  }

  revealHint(): number {
    const b = REDOX_BLOCKS[this.currentBlockIndex]!;
    const p = this.progress[this.currentBlockIndex]!;
    if (p.hintDepth < b.hints.length) {
      p.hintDepth++;
      p.hintUsed = true;
    }
    return p.hintDepth;
  }

  resetBlock(): void {
    this.progress[this.currentBlockIndex] = {
      hintDepth: 0,
      hintUsed: false,
      conceptFirst: null,
      conceptSolved: false,
      lastChoice: null,
      implFirst: null,
      implSolved: false,
      implLast: '',
      repairOpen: false,
      transferOpen: false,
    };
  }

  showRepair(): void {
    const p = this.progress[this.currentBlockIndex]!;
    p.repairOpen = true;
    p.transferOpen = false;
  }

  showTransfer(): void {
    const p = this.progress[this.currentBlockIndex]!;
    p.transferOpen = true;
    p.repairOpen = false;
  }

  // --- Visual Representation Generators ---

  renderVisualDepthSvg(): string {
    return this.generateVisualSvg();
  }

  generateVisualSvg(depth?: number): string {
    const p = this.progress[this.currentBlockIndex]!;
    const d = depth !== undefined ? depth : p.hintDepth;
    const b = REDOX_BLOCKS[this.currentBlockIndex]!;

    const node = (x: number, y: number, label: string, sub: string, fill: string) =>
      `<circle cx="${x}" cy="${y}" r="34" fill="${fill}" />
       <text x="${x}" y="${y + 4}" text-anchor="middle" font-size="16" font-family="monospace" font-weight="800" fill="#f8fafc">${label}</text>
       ${sub ? `<text x="${x}" y="${y + 22}" text-anchor="middle" font-size="14" font-family="monospace" font-weight="700" fill="#94a3b8">${sub}</text>` : ''}`;

    const line = (x1: number, y1: number, x2: number, y2: number, color: string, w: number = 3) =>
      `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="${w}" stroke-linecap="round" />`;

    const arrow = (x1: number, y1: number, x2: number, y2: number, color: string) =>
      `${line(x1, y1, x2, y2, color, 3)}
       <polygon points="${x2},${y2} ${x2 - 13},${y2 - 7} ${x2 - 13},${y2 + 7}" fill="${color}" />`;

    let inner = `<text x="18" y="24" font-size="14" font-family="monospace" font-weight="700" fill="#94a3b8">VISUAL DEPTH V${d} · ${b.kicker.toUpperCase()}</text>`;

    if (this.currentBlockIndex === 0) {
      inner += `<text x="320" y="58" text-anchor="middle" font-size="18" font-family="monospace" font-weight="800" fill="#f8fafc">CrO₅</text>`;
      inner += node(320, 125, 'Cr', '?', '#7c3aed');
      if (d === 0) {
        inner += `<text x="52" y="215" font-size="16" font-family="monospace" font-weight="800" fill="#f8fafc">Blanket O = −2  ⇒  Cr = +10 ?</text>`;
        inner += `<text x="52" y="246" font-size="14" font-family="sans-serif" fill="#94a3b8">Arithmetic can close while the model is wrong.</text>`;
      } else {
        inner += node(320, 50, 'O', d >= 3 ? '−2' : '', '#0284c7');
        inner += node(190, 135, 'O', d >= 2 ? '−1' : '', '#d97706');
        inner += node(245, 205, 'O', d >= 2 ? '−1' : '', '#d97706');
        inner += node(395, 205, 'O', d >= 2 ? '−1' : '', '#d97706');
        inner += node(450, 135, 'O', d >= 2 ? '−1' : '', '#d97706');

        inner += line(300, 102, 320, 78, '#64748b', 2);
        inner += line(288, 135, 220, 145, '#64748b', 2);
        inner += line(290, 150, 270, 185, '#64748b', 2);
        inner += line(350, 150, 370, 185, '#64748b', 2);
        inner += line(352, 135, 420, 145, '#64748b', 2);

        if (d >= 2) {
          inner += line(210, 155, 230, 185, '#f59e0b', 5);
          inner += line(410, 185, 430, 155, '#f59e0b', 5);
          inner += `<text x="80" y="272" font-size="14" font-family="monospace" font-weight="800" fill="#6ee7b7">O—O peroxide</text>`;
          inner += `<text x="430" y="272" font-size="14" font-family="monospace" font-weight="800" fill="#6ee7b7">O—O peroxide</text>`;
        }
        if (d >= 3) {
          inner += `<text x="48" y="315" font-size="14" font-family="monospace" font-weight="800" fill="#6ee7b7">x + 4(−1) + (−2) = 0</text>`;
          inner += `<text x="48" y="338" font-size="14" font-family="sans-serif" fill="#94a3b8">Structure changes assignments; charge conservation still governs.</text>`;
        }
      }
    } else if (this.currentBlockIndex === 1) {
      inner += node(175, 165, 'Mn', '+7', '#7c3aed');
      inner += `<text x="175" y="90" text-anchor="middle" font-size="18" font-family="monospace" font-weight="800" fill="#f8fafc">MnO₄⁻</text>`;
      if (d === 0) {
        inner += `<text x="62" y="262" font-size="16" font-family="monospace" font-weight="800" fill="#f8fafc">One reagent. Is n always 5?</text>`;
      } else {
        const ys = [80, 165, 250];
        const labs = ['Mn²⁺', 'MnO₂', 'MnO₄²⁻'];
        const os = ['+2', '+4', '+6'];
        const es = ['5 e⁻', '3 e⁻', '1 e⁻'];
        ys.forEach((y, i) => {
          inner += arrow(220, 165, 430, y, '#64748b');
          inner += node(470, y, 'Mn', d >= 2 ? os[i]! : '', i === 1 ? '#d97706' : '#0369a1');
          inner += `<text x="520" y="${y + 4}" font-size="16" font-family="monospace" font-weight="800" fill="#f8fafc">${labs[i]}</text>`;
          if (d >= 3) {
            inner += `<text x="520" y="${y + 24}" font-size="14" font-family="monospace" font-weight="800" fill="#6ee7b7">gain ${es[i]}</text>`;
          }
        });
        if (d >= 2) {
          inner += `<text x="52" y="310" font-size="14" font-family="sans-serif" fill="#94a3b8">Different product ⇒ different final Mn oxidation state.</text>`;
        }
        if (d >= 3) {
          inner += `<text x="52" y="336" font-size="14" font-family="monospace" font-weight="800" fill="#6ee7b7">product → ΔO.S. → electrons → n-factor</text>`;
        }
      }
    } else {
      inner += `<text x="160" y="62" text-anchor="middle" font-size="18" font-family="monospace" font-weight="800" fill="#f8fafc">FeC₂O₄</text>`;
      inner += `<text x="500" y="62" text-anchor="middle" font-size="18" font-family="monospace" font-weight="800" fill="#f8fafc">Cr₂O₇²⁻</text>`;
      if (d === 0) {
        inner += node(160, 155, 'donor', '? e⁻', '#0369a1');
        inner += node(500, 155, 'accept', '6 e⁻', '#7c3aed');
        inner += arrow(210, 155, 448, 155, '#64748b');
        inner += `<text x="68" y="258" font-size="16" font-family="monospace" font-weight="800" fill="#f8fafc">How many e⁻ does one FeC₂O₄ donate?</text>`;
      } else {
        inner += node(105, 155, 'Fe²⁺', d >= 2 ? '1 e⁻' : '', '#0284c7');
        inner += node(240, 155, 'C₂O₄²⁻', d >= 2 ? '2 e⁻' : '', '#d97706');
        if (d >= 1) {
          inner += `<text x="52" y="230" font-size="14" font-family="sans-serif" fill="#94a3b8">Count both redox-active parts of the formula unit.</text>`;
        }
        if (d >= 2) {
          inner += `<text x="52" y="270" font-size="14" font-family="monospace" font-weight="800" fill="#6ee7b7">1 e⁻ + 2 e⁻ = 3 e⁻ per FeC₂O₄</text>`;
        }
        if (d >= 3) {
          inner += node(500, 155, 'Cr₂O₇²⁻', '6 e⁻', '#7c3aed');
          inner += arrow(290, 155, 448, 155, '#8b5cf6');
          inner += `<text x="52" y="312" font-size="14" font-family="monospace" font-weight="800" fill="#6ee7b7">2 × 3 e⁻ = 1 × 6 e⁻</text>`;
          inner += `<text x="52" y="336" font-size="14" font-family="sans-serif" fill="#94a3b8">Stoichiometric ratio emerges from electron matching.</text>`;
        }
      }
    }

    return `<svg viewBox="0 0 640 350" style="width:100%;height:350px;display:block;background:#040711;border-radius:12px;" role="img" aria-label="Visual depth diagram for ${escapeHtml(b.title)}">${inner}</svg>`;
  }

  renderHtml(): string {
    const b = this.getCurrentBlock();
    const p = this.getProgress();
    const state = this.getRouteState();
    const curIdx = this.getCurrentBlockIndex();

    let routeCopy = '';
    let routeClass = '';
    if (state === 'READY') {
      routeCopy = 'Independent first-pass success. Keep support low and move to the mapped JEE transfer item.';
      routeClass = 'background:#052e24;border-color:#047857;color:#a7f3d0;';
    } else if (state === 'REINFORCE') {
      routeCopy = 'The block is partly secure or help was used. Use a focused visual repair, then verify on a fresh implementation.';
      routeClass = 'background:#2a1a06;border-color:#a16207;color:#fde68a;';
    } else if (state === 'REBUILD') {
      routeCopy = 'Both first attempts missed. Rebuild this hard concept with the full representation before another exam item.';
      routeClass = 'background:#330814;border-color:#be123c;color:#fda4af;';
    } else {
      routeCopy = 'Checkpoint open: complete both demands. Hints are available, but using help intentionally changes the route from READY to reinforcement.';
      routeClass = 'background:#080d18;border-color:#334155;color:#94a3b8;';
    }

    return `
      <div class="redox-adaptive-hub" style="display:flex;flex-direction:column;gap:1.5rem;max-width:1400px;margin:0 auto;padding:1.5rem;box-sizing:border-box;font-family:var(--g9-font-family, system-ui, sans-serif);">
        
        <!-- Header -->
        <header style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:1rem;padding-bottom:1rem;border-bottom:2px solid #e2e8f0;">
          <div>
            <div style="display:flex;gap:8px;font-size:0.9rem;color:#64748b;margin-bottom:0.25rem;">
              <a href="#/home" style="color:#0284c7;text-decoration:none;font-weight:600;">Home</a> &gt; 
              <a href="#/subject/chemistry" style="color:#0284c7;text-decoration:none;font-weight:600;">Chemistry</a> &gt; 
              <span>Redox Adaptive Workbench</span>
            </div>
            <h1 style="margin:0;font-size:1.85rem;font-weight:800;color:#0f172a;">⚡ Redox Adaptive Visual Proof Workbench</h1>
            <p style="margin:0.25rem 0 0;color:#475569;font-size:1rem;">A69 Pilot 2 · Hard-Concept Diagnosis &amp; Electron Equivalence</p>
          </div>
          
          <div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap;">
            <button type="button" id="btn-launch-v35-suite" style="min-height:${HIT_TARGET_MIN_PX}px;padding:8px 16px;background:#0284c7;color:white;border:none;border-radius:6px;cursor:pointer;font-weight:700;">
              ⚡ Launch Redox Master Suite →
            </button>
            <span style="font-size:0.875rem;font-weight:700;background:#fef3c7;color:#92400e;padding:6px 12px;border-radius:6px;border:1px solid #fde68a;">
              [Formative Self-Check · Diagnostic Practice (HOLD)]
            </span>
            <button type="button" id="btn-back-chem" style="min-height:${HIT_TARGET_MIN_PX}px;padding:8px 16px;background:#0f172a;color:white;border:none;border-radius:6px;cursor:pointer;font-weight:700;">← Back</button>
          </div>
        </header>

        <!-- Unreviewed Diagnostic Banner -->
        <div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:8px;padding:0.75rem 1.25rem;display:flex;align-items:center;gap:12px;">
          <span style="font-size:1.25rem;">ℹ️</span>
          <div style="font-size:0.95rem;color:#1e40af;">
            <strong>A69 Pilot 2 Migrated Proof Workbench · Diagnostic Mode Authorized</strong> — Local verification only; disclaims secure examination assessment. All state transitions emulate authentic Grade9v3.5 adaptive proof behavior.
          </div>
        </div>

        <!-- 3-Block Selector Tabs -->
        <div style="display:flex;flex-wrap:wrap;gap:10px;" role="tablist" aria-label="Hard Concept Blocks">
          ${REDOX_BLOCKS.map((blk, idx) => `
            <button type="button" class="block-select-btn" data-index="${idx}" style="min-height:${HIT_TARGET_MIN_PX}px;padding:10px 18px;background:${idx === curIdx ? '#0284c7' : '#f1f5f9'};color:${idx === curIdx ? '#ffffff' : '#0f172a'};border:1px solid #cbd5e1;border-radius:6px;cursor:pointer;font-weight:700;font-size:0.95rem;">
              Block ${idx}: ${escapeHtml(blk.title)}
            </button>
          `).join('')}
        </div>

        <!-- Main Workbench Grid: Left Visual Proof & Right Problem Execution -->
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,480px),1fr));gap:1.5rem;align-items:start;">
          
          <!-- Left Column: Visual Representation & Advisory -->
          <div style="background:#ffffff;border:1px solid #cbd5e1;border-radius:12px;padding:1.5rem;box-shadow:0 1px 3px rgba(0,0,0,0.05);">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem;">
              <span style="font-size:0.875rem;font-weight:800;color:#0284c7;background:#e0f2fe;padding:2px 8px;border-radius:4px;">${escapeHtml(b.kicker)}</span>
              <span style="font-size:0.875rem;color:#64748b;">Visual Depth: <strong>V${p.hintDepth} / V3</strong></span>
            </div>
            
            <h2 style="margin:0 0 0.5rem;font-size:1.35rem;font-weight:700;color:#0f172a;">${escapeHtml(b.title)}</h2>
            <p style="margin:0 0 1rem;font-size:0.95rem;color:#475569;line-height:1.4;">${escapeHtml(b.why)}</p>

            <!-- SVG Visual Depth Diagram -->
            <div style="margin-bottom:1.25rem;">
              ${this.renderVisualDepthSvg()}
            </div>

            <!-- Route Advisory Box -->
            <div id="route" style="border:1px solid transparent;border-radius:8px;padding:12px 16px;${routeClass}">
              <div style="font-size:0.875rem;font-weight:800;text-transform:uppercase;margin-bottom:4px;letter-spacing:0.02em;">
                CHECKPOINT: <strong>${escapeHtml(state)}</strong>
              </div>
              <div style="font-size:0.9rem;line-height:1.4;">${escapeHtml(routeCopy)}</div>
            </div>
          </div>

          <!-- Right Column: Interactive Demands & Controls -->
          <div style="background:#ffffff;border:1px solid #cbd5e1;border-radius:12px;padding:1.5rem;box-shadow:0 1px 3px rgba(0,0,0,0.05);display:flex;flex-direction:column;gap:1.5rem;">
            
            <!-- Demand 1: Concept MCQ -->
            <div style="padding-bottom:1.25rem;border-bottom:1px solid #e2e8f0;">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
                <h3 style="margin:0;font-size:1.15rem;font-weight:700;color:#0f172a;">Demand 1 · Core Concept</h3>
                <span style="font-size:0.875rem;font-weight:700;color:${p.conceptSolved ? '#047857' : '#64748b'};background:${p.conceptSolved ? '#d1fae5' : '#f1f5f9'};padding:2px 8px;border-radius:4px;">
                  ${p.conceptSolved ? '✓ Solved' : 'Unsolved'}
                </span>
              </div>
              <p style="margin:0 0 1rem;font-size:0.95rem;color:#334155;line-height:1.4;">${escapeHtml(b.conceptPrompt)}</p>

              <!-- Option Buttons -->
              <div id="options" style="display:flex;flex-direction:column;gap:8px;">
                ${b.options.map((opt, optIdx) => {
                  const isSelected = p.lastChoice === optIdx;
                  return `
                    <button type="button" class="concept-opt-btn" data-opt-idx="${optIdx}" style="min-height:${HIT_TARGET_MIN_PX}px;padding:10px 14px;background:${isSelected ? (p.conceptSolved ? '#d1fae5' : '#fee2e2') : '#f8fafc'};color:#0f172a;border:1px solid ${isSelected ? (p.conceptSolved ? '#059669' : '#dc2626') : '#cbd5e1'};border-radius:6px;cursor:pointer;text-align:left;font-size:0.95rem;line-height:1.3;">
                      ${escapeHtml(opt)}
                    </button>
                  `;
                }).join('')}
              </div>
            </div>

            <!-- Demand 2: Implementation Value -->
            <div style="padding-bottom:1.25rem;border-bottom:1px solid #e2e8f0;">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
                <h3 style="margin:0;font-size:1.15rem;font-weight:700;color:#0f172a;">Demand 2 · Implementation</h3>
                <span style="font-size:0.875rem;font-weight:700;color:${p.implSolved ? '#047857' : '#64748b'};background:${p.implSolved ? '#d1fae5' : '#f1f5f9'};padding:2px 8px;border-radius:4px;">
                  ${p.implSolved ? '✓ Solved' : 'Unsolved'}
                </span>
              </div>
              <p style="margin:0 0 1rem;font-size:0.95rem;color:#334155;line-height:1.4;">${escapeHtml(b.implementationPrompt)}</p>

              <div style="display:flex;gap:10px;flex-wrap:wrap;">
                <input type="text" id="implementationInput" value="${escapeHtml(p.implLast)}" placeholder="e.g. 6 or 2:1" style="flex:1;min-height:${HIT_TARGET_MIN_PX}px;padding:8px 12px;font-size:1rem;border:1px solid #cbd5e1;border-radius:6px;">
                <button type="button" id="btn-check-impl" style="min-height:${HIT_TARGET_MIN_PX}px;padding:8px 20px;background:#0284c7;color:white;border:none;border-radius:6px;cursor:pointer;font-weight:700;">Check Value</button>
              </div>
            </div>

            <!-- Workbench Action Toolbar -->
            <div style="display:flex;flex-wrap:wrap;gap:8px;">
              <button type="button" id="hintButton" style="min-height:${HIT_TARGET_MIN_PX}px;padding:8px 14px;background:#f8fafc;color:#0369a1;border:1px solid #cbd5e1;border-radius:6px;cursor:pointer;font-weight:600;font-size:0.9rem;">
                💡 Reveal Hint (Depth ${p.hintDepth}/3)
              </button>
              <button type="button" id="repairButton" style="min-height:${HIT_TARGET_MIN_PX}px;padding:8px 14px;background:#f8fafc;color:#d97706;border:1px solid #cbd5e1;border-radius:6px;cursor:pointer;font-weight:600;font-size:0.9rem;">
                🔧 Focused Repair
              </button>
              <button type="button" id="transferButton" style="min-height:${HIT_TARGET_MIN_PX}px;padding:8px 14px;background:#f8fafc;color:#7e22ce;border:1px solid #cbd5e1;border-radius:6px;cursor:pointer;font-weight:600;font-size:0.9rem;">
                🎯 Mapped Transfer
              </button>
              <button type="button" id="resetButton" style="min-height:${HIT_TARGET_MIN_PX}px;padding:8px 14px;background:#f8fafc;color:#dc2626;border:1px solid #cbd5e1;border-radius:6px;cursor:pointer;font-weight:600;font-size:0.9rem;margin-left:auto;">
                ↺ Reset Block
              </button>
            </div>

            <!-- Expandable Repair Drawer -->
            ${p.repairOpen ? `
              <div style="background:#fffbeb;border:1px solid #fef3c7;border-radius:8px;padding:1rem;">
                <strong style="color:#b45309;font-size:0.9rem;display:block;margin-bottom:4px;">Focused Repair Protocol:</strong>
                <p style="margin:0;font-size:0.9rem;color:#78350f;line-height:1.4;">${escapeHtml(b.repair)}</p>
              </div>
            ` : ''}

            <!-- Expandable Transfer Drawer -->
            ${p.transferOpen ? `
              <div style="background:#faf5ff;border:1px solid #f3e8ff;border-radius:8px;padding:1rem;">
                <strong style="color:#6b21a8;font-size:0.9rem;display:block;margin-bottom:4px;">Mapped Transfer Protocol:</strong>
                <p style="margin:0;font-size:0.9rem;color:#581c87;line-height:1.4;">${escapeHtml(b.transfer)}</p>
              </div>
            ` : ''}
          </div>

        </div>

      </div>
    `;
  }
}

// ---------------------------------------------------------------------------
// DOM Mount Function
// ---------------------------------------------------------------------------

export function mountRedoxAdaptive(
  root: HTMLElement,
  controller?: RedoxAdaptiveController,
  onNavigate?: (route: string) => void
): { dispose: () => void } {
  let active = true;
  const ctrl = controller || new RedoxAdaptiveController();

  const render = () => {
    if (!active) return;
    const b = ctrl.getCurrentBlock();
    const p = ctrl.getProgress();
    const state = ctrl.getRouteState();
    const curIdx = ctrl.getCurrentBlockIndex();

    let routeCopy = '';
    let routeClass = '';
    if (state === 'READY') {
      routeCopy = 'Independent first-pass success. Keep support low and move to the mapped JEE transfer item.';
      routeClass = 'background:#052e24;border-color:#047857;color:#a7f3d0;';
    } else if (state === 'REINFORCE') {
      routeCopy = 'The block is partly secure or help was used. Use a focused visual repair, then verify on a fresh implementation.';
      routeClass = 'background:#2a1a06;border-color:#a16207;color:#fde68a;';
    } else if (state === 'REBUILD') {
      routeCopy = 'Both first attempts missed. Rebuild this hard concept with the full representation before another exam item.';
      routeClass = 'background:#330814;border-color:#be123c;color:#fda4af;';
    } else {
      routeCopy = 'Checkpoint open: complete both demands. Hints are available, but using help intentionally changes the route from READY to reinforcement.';
      routeClass = 'background:#080d18;border-color:#334155;color:#94a3b8;';
    }

    root.innerHTML = `
      <div class="redox-adaptive-hub" style="display:flex;flex-direction:column;gap:1.5rem;max-width:1400px;margin:0 auto;padding:1.5rem;box-sizing:border-box;font-family:var(--g9-font-family, system-ui, sans-serif);">
        
        <!-- Header -->
        <header style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:1rem;padding-bottom:1rem;border-bottom:2px solid #e2e8f0;">
          <div>
            <div style="display:flex;gap:8px;font-size:0.9rem;color:#64748b;margin-bottom:0.25rem;">
              <a href="#/home" style="color:#0284c7;text-decoration:none;font-weight:600;">Home</a> &gt; 
              <a href="#/subject/chemistry" style="color:#0284c7;text-decoration:none;font-weight:600;">Chemistry</a> &gt; 
              <span>Redox Adaptive Workbench</span>
            </div>
            <h1 style="margin:0;font-size:1.85rem;font-weight:800;color:#0f172a;">⚡ Redox Adaptive Visual Proof Workbench</h1>
            <p style="margin:0.25rem 0 0;color:#475569;font-size:1rem;">A69 Pilot 2 · Hard-Concept Diagnosis &amp; Electron Equivalence</p>
          </div>
          
          <div style="display:flex;gap:12px;align-items:center;">
            <span style="font-size:0.875rem;font-weight:700;background:#fef3c7;color:#92400e;padding:6px 12px;border-radius:6px;border:1px solid #fde68a;">
              [Formative Self-Check · Diagnostic Practice (HOLD)]
            </span>
            <button type="button" id="btn-back-chem" style="min-height:${HIT_TARGET_MIN_PX}px;padding:8px 16px;background:#0f172a;color:white;border:none;border-radius:6px;cursor:pointer;font-weight:700;">← Back</button>
          </div>
        </header>

        <!-- Unreviewed Diagnostic Banner -->
        <div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:8px;padding:0.75rem 1.25rem;display:flex;align-items:center;gap:12px;">
          <span style="font-size:1.25rem;">ℹ️</span>
          <div style="font-size:0.95rem;color:#1e40af;">
            <strong>A69 Pilot 2 Migration · Academic Admission: HOLD</strong> — Formative diagnostic proof fixture. Local interactive checks verify conceptual pivots without secret-key examination grading.
          </div>
        </div>

        <!-- Block Selection Buttons (3 Blocks) -->
        <div class="blocks-toolbar" style="display:grid;grid-template-columns:repeat(auto-fit, minmax(280px, 1fr));gap:12px;" role="tablist" aria-label="Hard Concept Blocks">
          ${REDOX_BLOCKS.map((blk, idx) => {
            const isAct = idx === curIdx;
            const st = ctrl.getRouteState(idx);
            let dotColor = '#94a3b8';
            if (st === 'READY') dotColor = '#10b981';
            else if (st === 'REINFORCE') dotColor = '#f59e0b';
            else if (st === 'REBUILD') dotColor = '#ef4444';

            return `
              <button type="button" class="block-select-btn" id="blockBtn${idx}" data-index="${idx}" style="min-height:${HIT_TARGET_MIN_PX}px;padding:14px;text-align:left;border:2px solid ${isAct ? '#0284c7' : '#cbd5e1'};border-radius:10px;background:${isAct ? '#f0f9ff' : '#ffffff'};cursor:pointer;">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;">
                  <strong style="color:#0f172a;font-size:1rem;">${idx + 1} · ${escapeHtml(blk.kicker.split('·')[1]?.trim() || blk.kicker)}</strong>
                  <span class="status-dot" style="width:12px;height:12px;border-radius:50%;background:${dotColor};display:inline-block;"></span>
                </div>
                <div style="font-size:0.875rem;color:#64748b;">${escapeHtml(blk.title)}</div>
              </button>
            `;
          }).join('')}
        </div>

        <!-- Main Workbench Grid: Left Column (Prompts) & Right Column (Visual Depth SVG) -->
        <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(min(100%, 540px), 1fr));gap:20px;align-items:start;">
          
          <!-- Left Column: Challenge Cards -->
          <div style="display:flex;flex-direction:column;gap:16px;">
            <div style="background:#ffffff;border:1px solid #cbd5e1;border-radius:12px;padding:1.5rem;box-shadow:0 1px 3px rgba(0,0,0,0.05);">
              <div style="font-size:0.875rem;font-weight:800;color:#0284c7;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:4px;">${escapeHtml(b.kicker)}</div>
              <h2 style="margin:0 0 0.5rem;font-size:1.35rem;color:#0f172a;font-weight:700;">${escapeHtml(b.title)}</h2>
              <p style="margin:0 0 1.25rem;color:#64748b;font-size:0.95rem;line-height:1.5;">${escapeHtml(b.why)}</p>

              <!-- Demand 1: Concept Challenge -->
              <div style="border:1px solid #c7d2fe;border-radius:8px;padding:1rem;background:#f5f3ff;margin-bottom:1rem;">
                <div style="font-size:0.875rem;font-weight:800;color:#6366f1;text-transform:uppercase;margin-bottom:6px;">1. Conceptual Pivot</div>
                <div style="font-size:1rem;color:#1e1b4b;font-weight:600;margin-bottom:12px;">${escapeHtml(b.conceptPrompt)}</div>
                
                <div style="display:flex;flex-direction:column;gap:8px;">
                  ${b.options.map((opt, oIdx) => {
                    const isChosen = p.lastChoice === oIdx;
                    return `
                      <button type="button" class="concept-opt-btn" data-opt-idx="${oIdx}" style="min-height:${HIT_TARGET_MIN_PX}px;padding:10px 14px;text-align:left;border:1px solid ${isChosen ? '#6366f1' : '#cbd5e1'};border-radius:6px;background:${isChosen ? '#e0e7ff' : '#ffffff'};color:#0f172a;font-size:0.95rem;font-weight:${isChosen ? '700' : '500'};cursor:pointer;">
                        ${escapeHtml(opt)}
                      </button>
                    `;
                  }).join('')}
                </div>
              </div>

              <!-- Demand 2: Implementation Input -->
              <div style="border:1px solid #bae6fd;border-radius:8px;padding:1rem;background:#f0f9ff;margin-bottom:1rem;">
                <div style="font-size:0.875rem;font-weight:800;color:#0284c7;text-transform:uppercase;margin-bottom:6px;">2. Quantitative Implementation</div>
                <div style="font-size:1rem;color:#0c4a6e;font-weight:600;margin-bottom:12px;">${escapeHtml(b.implementationPrompt)}</div>

                <div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap;">
                  <input type="text" id="implementationInput" value="${escapeHtml(p.implLast)}" placeholder="Enter numerical / ratio answer" style="flex:1;min-height:${HIT_TARGET_MIN_PX}px;padding:8px 14px;border:2px solid #cbd5e1;border-radius:6px;font-size:1rem;font-weight:700;" />
                  <button type="button" id="btn-check-impl" style="min-height:${HIT_TARGET_MIN_PX}px;padding:8px 20px;background:#0284c7;color:white;border:none;border-radius:6px;font-weight:700;cursor:pointer;">Check Answer</button>
                </div>
              </div>

              <!-- Route Advisory State -->
              <div id="route" class="route-advisory-box" style="padding:14px;border-radius:8px;border:1px solid;font-size:0.95rem;line-height:1.5;${routeClass}">
                <div style="font-weight:800;font-size:0.875rem;margin-bottom:4px;text-transform:uppercase;">Routing Status: <strong>${state}</strong></div>
                <div>${escapeHtml(routeCopy)}</div>
              </div>

              <!-- Action Buttons -->
              <div style="display:flex;flex-wrap:wrap;gap:10px;margin-top:1rem;">
                <button type="button" id="repairButton" style="flex:1;min-height:${HIT_TARGET_MIN_PX}px;padding:8px 14px;background:#fef3c7;color:#92400e;border:1px solid #fde68a;border-radius:6px;cursor:pointer;font-weight:700;">Focused Repair</button>
                <button type="button" id="transferButton" style="flex:1;min-height:${HIT_TARGET_MIN_PX}px;padding:8px 14px;background:#ede9fe;color:#5b21b6;border:1px solid #ddd6fe;border-radius:6px;cursor:pointer;font-weight:700;">Mapped Transfer</button>
                <button type="button" id="resetButton" style="min-height:${HIT_TARGET_MIN_PX}px;padding:8px 16px;background:#f1f5f9;color:#475569;border:1px solid #cbd5e1;border-radius:6px;cursor:pointer;font-weight:700;">Reset Block</button>
              </div>

              <!-- Dynamic Repair / Transfer Views -->
              ${p.repairOpen ? `
                <div class="repair-pane" style="margin-top:1rem;background:#fffbeb;border:1px solid #fde68a;border-radius:8px;padding:1rem;">
                  <strong style="color:#92400e;display:block;margin-bottom:4px;">Focused Repair Pathway:</strong>
                  <div style="font-size:0.95rem;color:#78350f;">${escapeHtml(b.repair)}</div>
                </div>
              ` : ''}

              ${p.transferOpen ? `
                <div class="transfer-pane" style="margin-top:1rem;background:#f5f3ff;border:1px solid #ddd6fe;border-radius:8px;padding:1rem;">
                  <strong style="color:#5b21b6;display:block;margin-bottom:4px;">Mapped Transfer Item:</strong>
                  <div style="font-size:0.95rem;color:#4c1d95;">${escapeHtml(b.transfer)}</div>
                </div>
              ` : ''}
            </div>
          </div>

          <!-- Right Column: Visual Depth Representation & Hint Controls -->
          <div style="background:#ffffff;border:1px solid #cbd5e1;border-radius:12px;padding:1.5rem;box-shadow:0 1px 3px rgba(0,0,0,0.05);">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem;">
              <h3 style="margin:0;font-size:1.25rem;color:#0f172a;font-weight:700;">Visual Representation (V${p.hintDepth})</h3>
              <button type="button" id="hintButton" ${p.hintDepth >= b.hints.length ? 'disabled' : ''} style="min-height:${HIT_TARGET_MIN_PX}px;padding:8px 18px;background:${p.hintDepth >= b.hints.length ? '#f1f5f9' : '#047857'};color:${p.hintDepth >= b.hints.length ? '#94a3b8' : '#ffffff'};border:none;border-radius:6px;cursor:${p.hintDepth >= b.hints.length ? 'default' : 'pointer'};font-weight:700;">
                💡 Reveal Next Hint (${p.hintDepth}/${b.hints.length})
              </button>
            </div>

            <!-- SVG Visual Representation -->
            <div class="visual-svg-container" style="margin-bottom:1rem;border-radius:8px;overflow:hidden;border:1px solid #334155;">
              ${ctrl.generateVisualSvg()}
            </div>

            <!-- Hint Disclosures -->
            ${p.hintDepth > 0 ? `
              <div class="hints-deck" style="display:flex;flex-direction:column;gap:8px;">
                ${b.hints.slice(0, p.hintDepth).map((h, hIdx) => `
                  <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:6px;padding:10px 12px;font-size:0.95rem;color:#166534;">
                    <strong>Hint ${hIdx + 1}:</strong> ${escapeHtml(h)}
                  </div>
                `).join('')}
              </div>
            ` : ''}
          </div>

        </div>

      </div>
    `;

    bindEvents();
  };

  const bindEvents = () => {
    // Launch Redox Master Suite top-level
    root.querySelector<HTMLButtonElement>('#btn-launch-v35-suite')?.addEventListener('click', () => {
      window.location.href = './chemistry/redox/explorers/redox_reactions/index.html';
    });

    // Back navigation
    root.querySelector<HTMLButtonElement>('#btn-back-chem')?.addEventListener('click', () => {
      if (onNavigate) onNavigate('/subject/chemistry');
      else window.location.hash = '#/subject/chemistry';
    });

    // Block selector buttons
    root.querySelectorAll<HTMLButtonElement>('.block-select-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.dataset.index || '0', 10);
        ctrl.selectBlock(idx);
        render();
      });
    });

    // Concept option buttons
    root.querySelectorAll<HTMLButtonElement>('.concept-opt-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const optIdx = parseInt(btn.dataset.optIdx || '0', 10);
        ctrl.checkConcept(optIdx);
        render();
      });
    });

    // Implementation check button
    const implBtn = root.querySelector<HTMLButtonElement>('#btn-check-impl');
    const implInput = root.querySelector<HTMLInputElement>('#implementationInput');
    const handleImplCheck = () => {
      if (!implInput) return;
      ctrl.checkImplementation(implInput.value);
      render();
    };

    implBtn?.addEventListener('click', handleImplCheck);
    implInput?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') handleImplCheck();
    });

    // Hint button
    root.querySelector<HTMLButtonElement>('#hintButton')?.addEventListener('click', () => {
      ctrl.revealHint();
      render();
    });

    // Repair button
    root.querySelector<HTMLButtonElement>('#repairButton')?.addEventListener('click', () => {
      ctrl.showRepair();
      render();
    });

    // Transfer button
    root.querySelector<HTMLButtonElement>('#transferButton')?.addEventListener('click', () => {
      ctrl.showTransfer();
      render();
    });

    // Reset button
    root.querySelector<HTMLButtonElement>('#resetButton')?.addEventListener('click', () => {
      ctrl.resetBlock();
      render();
    });
  };

  render();

  return {
    dispose: () => {
      active = false;
      root.replaceChildren();
    },
  };
}
