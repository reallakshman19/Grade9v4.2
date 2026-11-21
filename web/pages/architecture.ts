/**
 * web/pages/architecture.ts
 * Restoration of Grade9v4.1 '🧭 Architecture' Primary Navigation Tab.
 *
 * Implements:
 * - Full parity with v4.1's fifth primary navigation tab ("Architecture & Documentation")
 * - Interactive access to:
 *   1. Complete Core1A / Core1B Agent Authoring Field Guide (core1ab-agent-guide.html)
 *   2. The Architecture Guidebook (guidebook.html)
 *   3. Core2-Led Source-to-Learning Pipeline & Benchmarks (core2-source-to-learning-pipeline.html)
 *   4. Production Checklist · Core2 Tablet QA (production-checklist.html)
 *   5. Independent Audit Field Guide (review-guide.html)
 *   6. Pipeline Flowchart (pipeline-flowchart.html)
 *   7. The 9 Learning Blueprint Panels (Governance, Source, Demands, QRT, Blueprint/Adapter, Core, QA, Context, Evidence)
 * - 12.7" tablet touch ergonomics (HIT_TARGET_MIN_PX >= 48px, HIT_TARGET_PRIMARY_PX >= 56px)
 * - Strict academic status: HOLD (Diagnostic / Authoring Mode Authorized)
 */

import { escapeHtml } from '../runtime/rendering.ts';
import { HIT_TARGET_MIN_PX, HIT_TARGET_PRIMARY_PX } from '../styles/tokens.ts';
import { ARCHITECTURE_DOCS_CONTENT, ARCHITECTURE_DOCS_CSS } from '../data/architecture-docs-content.ts';

export interface ArchitectureDocDescriptor {
  readonly id: string;
  readonly title: string;
  readonly subtitle: string;
  readonly category: 'GUIDE' | 'PIPELINE' | 'CHECKLIST' | 'REVIEW';
  readonly sourcePath: string;
  readonly summaryHtml: string;
}

export const ARCHITECTURE_DOCS: readonly ArchitectureDocDescriptor[] = [
  {
    id: 'core1ab-guide',
    title: 'Complete Core1A / Core1B Agent Authoring Field Guide',
    subtitle: 'From source research and QRT reasoning to textbook-quality teaching, fresh protected reconstruction, and evidence packets',
    category: 'GUIDE',
    sourcePath: 'architecture/core1ab-agent-guide.html',
    summaryHtml: `
      <p>A subject-independent operational playbook for curriculum author agents:</p>
      <ul>
        <li><strong>Syllabus &amp; Exam Intake:</strong> Pinned source identity, rights, and custody separation.</li>
        <li><strong>Cognitive Demand &amp; QRT:</strong> 7 operations, 5-factor rubric bounds [0..2], and shortest valid reasoning route.</li>
        <li><strong>Blueprint &amp; Adapter Binding:</strong> Dynamic crux binding and commit-first inert derivations.</li>
        <li><strong>Core 1A &amp; 1B Construction:</strong> Dual-route pedagogical architecture, active recall, and misconception diagnosis.</li>
        <li><strong>Evidence Receipts:</strong> B1–B7 correspondence witnesses and independent review handoffs.</li>
      </ul>
    `,
  },
  {
    id: 'guidebook',
    title: 'Subtopic → Demands → QRT → Blueprint + Adapter → Core1A',
    subtitle: 'Practical illustrated methodology connecting source problem analysis to student-facing learning',
    category: 'GUIDE',
    sourcePath: 'architecture/guidebook.html',
    summaryHtml: `
      <p>The core architectural guidebook detailing the transformation pipeline:</p>
      <ul>
        <li>Two distinct routes: Direct Exam Practice (Core 2A) vs. Foundational Learning (Core 1A).</li>
        <li>Decisive move isolation and cognitive load distribution.</li>
        <li>Mathematical and scientific warrants for physics, chemistry, and mathematics.</li>
        <li>Blind review hygiene and fail-closed quality gates.</li>
      </ul>
    `,
  },
  {
    id: 'pipeline-benchmarks',
    title: 'Core2-Led Source-to-Learning Pipeline & Benchmarks',
    subtitle: 'Automated runbook and benchmark specifications across subjects and difficulty tiers',
    category: 'PIPELINE',
    sourcePath: 'architecture/core2-source-to-learning-pipeline.html',
    summaryHtml: `
      <p>Pipeline benchmark criteria and automated gate specifications:</p>
      <ul>
        <li>Bounded Transfer Protocols: Work Order → Delivery → Repair Return → Evidence Receipt.</li>
        <li>4-Gate Zero-Escape Foolproof Verification.</li>
        <li>Benchmark timing targets: Sub-200ms DOM rendering and offline state durability.</li>
      </ul>
    `,
  },
  {
    id: 'production-checklist',
    title: 'Production Checklist · Core2 Tablet QA',
    subtitle: '12.7-inch tablet acceptance criteria, touch target ergonomics, and viewport audits',
    category: 'CHECKLIST',
    sourcePath: 'architecture/production-checklist.html',
    summaryHtml: `
      <p>Repeatable release checklist for production tablet readiness:</p>
      <ul>
        <li><strong>Required Viewports:</strong> 1600×1000 (Landscape), 1000×1600 (Portrait), 1366×854, 854×1366, 1280×800, 800×1280, 390×844.</li>
        <li><strong>Touch Ergonomics:</strong> All interactive elements &ge; 48px; primary actions &ge; 56px.</li>
        <li><strong>Zero Horizontal Overflow:</strong> Strict document width containment across rotation.</li>
        <li><strong>Accessible Typography:</strong> 17px base typography scaling up to 30px with readable MathML.</li>
      </ul>
    `,
  },
  {
    id: 'review-guide',
    title: 'Independent Review & Source-Only Audit Field Guide',
    subtitle: 'Protocol for blind evaluation, custody protection, and academic holding boundaries',
    category: 'REVIEW',
    sourcePath: 'architecture/review-guide.html',
    summaryHtml: `
      <p>Field manual governing the independent reviewer role:</p>
      <ul>
        <li>Source-only evaluation: Reviewing without author contamination.</li>
        <li>Answer-key isolation (Fault N09): Keeping protected keys strictly outside client bundles.</li>
        <li>Academic admission: Distinct tracking of software tests vs. academic approval.</li>
      </ul>
    `,
  },
  {
    id: 'manifesto',
    title: 'Grade9 Engineering & Curriculum Architecture Manifesto',
    subtitle: 'Foundational principles governing dual-route learning, cognitive demand, and immutable evidence bounds',
    category: 'GUIDE',
    sourcePath: 'architecture/manifesto.html',
    summaryHtml: `
      <p>The philosophical and technical charter of the Grade9 project:</p>
      <ul>
        <li><strong>Truthful Exactness:</strong> Never invent scientific or historical truths; fail closed on missing custody.</li>
        <li><strong>Cognitive Separation:</strong> Keep student-facing scaffolding distinct from raw examination test keys.</li>
        <li><strong>Dual-Engine Audits:</strong> Require simultaneous headless test assertions and live viewport visual proofs.</li>
      </ul>
    `,
  },
  {
    id: 'pipeline',
    title: 'Curriculum Generation & Authoring Pipeline Architecture',
    subtitle: 'End-to-end transformation workflow from authentic source intake to interactive tablet workbenches',
    category: 'PIPELINE',
    sourcePath: 'architecture/pipeline.html',
    summaryHtml: `
      <p>Stage-by-stage architecture of the authoring toolchain:</p>
      <ul>
        <li>Source intake &amp; SHA-256 fingerprinting.</li>
        <li>QRT cognitive demand factorization across 7 core operations.</li>
        <li>Commit-first inert derivation binding and pedagogical hints.</li>
        <li>Multi-engine packaging into single-file portable packages and reactive HTML5 components.</li>
      </ul>
    `,
  },
  {
    id: 'roadmap',
    title: 'Architecture & Migration Multi-Wave Roadmap',
    subtitle: 'Stepwise progression across 17 engineering waves to achieve full parity and verifiable closure',
    category: 'PIPELINE',
    sourcePath: 'architecture/roadmap.html',
    summaryHtml: `
      <p>The engineering roadmap to complete legacy migration parity:</p>
      <ul>
        <li>Wave 1–10: Foundation, Core 1A/1B, Core 2A/2B, and GCDR Explorers.</li>
        <li>Wave 11–13: NSEJS Physics 12-Chapter syllabus and Chemistry 14-Topic adapters.</li>
        <li>Wave 14–16: Core 2 Question Bank, Standalone Labs, and Curricular Subtopics.</li>
        <li>Wave 17–19: Curricular mirrors, developer collateral reconciliation, and authoring gap conservation.</li>
      </ul>
    `,
  },
  {
    id: 'overview',
    title: 'Architecture & System Overview Index',
    subtitle: 'Central directory and navigation hub for all Grade9 technical specifications and operational runbooks',
    category: 'GUIDE',
    sourcePath: 'architecture/index.html',
    summaryHtml: `
      <p>Complete index of all architectural standards, runbooks, and design specifications across the Grade9 platform.</p>
    `,
  },
  {
    id: 'benchmarks',
    title: 'Quality Calibration Specimens & Tablet Benchmarks',
    subtitle: '22 historical calibration specimens, tablet benchmark specifications, and S1-motion2d multi-core test fixtures',
    category: 'CHECKLIST',
    sourcePath: 'benchmarks/core1a-motion-in-a-plane-tablet.html',
    summaryHtml: `
      <p>Quality calibration specimens and tablet benchmark specifications:</p>
      <ul>
        <li>Core 1A Motion in a Plane tablet baseline specimens.</li>
        <li>S1-motion2d six-core calibration HTML suites (Core1, Core1A, Core1B, Core2, Core2A, Core2B).</li>
        <li>12.7" tablet responsive geometry and sub-200ms rendering performance criteria.</li>
      </ul>
    `,
  },
  {
    id: 'workspace-audit',
    title: 'Workspace Legacy ChatGPT & Scraped Olympiad Research Logs',
    subtitle: '59 historical developer transcripts, prompt runs, and IAPT olympiad oracle research snapshots',
    category: 'REVIEW',
    sourcePath: 'workspace/legacy/g9v3.5/chatgpt/output/WPE_Core2_Academic_Review_R1_20261031/index.html',
    summaryHtml: `
      <p>Developer review logs and scraped official olympiad research:</p>
      <ul>
        <li>WPE Core 2 Academic Review research runs from October 2026.</li>
        <li>IAPT official website mirrors and Junior Science Olympiad syllabus references.</li>
        <li>Prompt composer transcripts and derivation proofs preserved under custody isolation.</li>
      </ul>
    `,
  },
  {
    id: 'evidence-packets',
    title: 'Historical Review Evidence Packets & Verification Checkers',
    subtitle: '31 review packets, correspondence check outputs, and PR353 audit artifacts',
    category: 'REVIEW',
    sourcePath: 'evidence/reviews/pr353/packet-check/review/index.html',
    summaryHtml: `
      <p>Historical PR review evidence packets and check outputs:</p>
      <ul>
        <li>PR353 packet checks: product, review, and rendered core receipts.</li>
        <li>B1–B7 correspondence witnesses and independent review handoffs.</li>
        <li>Automated packet verification receipts and cryptographic digests.</li>
      </ul>
    `,
  },
  {
    id: 'preview-batches',
    title: 'Ephemeral Build Previews & Alpha Boards',
    subtitle: '34 build batch previews, alpha boards, and temporary test containers',
    category: 'GUIDE',
    sourcePath: 'preview/alpha-board.html',
    summaryHtml: `
      <p>Development preview containers and batch testing harnesses:</p>
      <ul>
        <li>Alpha board development layouts and route monitors.</li>
        <li>Batch preview containers (b02, b03, etc.) for multi-subtopic validation.</li>
        <li>Diagnostic fallback containers and 404 test pages.</li>
      </ul>
    `,
  },
  {
    id: 'test-fixtures',
    title: 'Test Harness Fixtures & Browser Host Containers',
    subtitle: '6 test harness fixtures for portable workbenches and QRT smoke tests',
    category: 'CHECKLIST',
    sourcePath: 'tests/fixtures/portable-workbench/external-host.html',
    summaryHtml: `
      <p>Test harness fixtures used by headless Playwright and Node test runners:</p>
      <ul>
        <li>External host test harnesses for standalone portable workbenches.</li>
        <li>QRT cognitive demand interactive smoke test runners.</li>
        <li>Research-first regression preview fixtures.</li>
      </ul>
    `,
  },
  {
    id: 'developer-tools',
    title: 'Developer Diagnostic Tools & Run Builders',
    subtitle: '3 builder and runtime inspection tools',
    category: 'PIPELINE',
    sourcePath: 'tools/run-builder/index.html',
    summaryHtml: `
      <p>Developer tooling and pipeline builders:</p>
      <ul>
        <li>Curriculum run builder and execution pipeline monitor.</li>
        <li>Library question indexer and asset registry browser.</li>
      </ul>
    `,
  },
  {
    id: 'peer-review',
    title: 'Physics & Multi-Disciplinary Parity Review',
    subtitle: 'Independent peer review notes and preview validations',
    category: 'REVIEW',
    sourcePath: 'review/physics/ph09-ph12-wpe-parity-r1/preview.html',
    summaryHtml: `
      <p>Physics syllabus review notes and validation checkpoints for chapters PH09 through PH12.</p>
    `,
  },
];

export const BLUEPRINT_CARDS = [
  { num: '01', icon: '🛡️', title: 'GOVERNANCE', name: 'Scope & Authority', desc: 'Product boundaries, Owner instructions, implementation status, and delivery policies.' },
  { num: '02', icon: '📂', title: 'SOURCE', name: 'Intake & Custody', desc: 'Separated question-paper, textbook, diagram, and exposition evidence with SHA-256 digests.' },
  { num: '03', icon: '✍️', title: 'DEMANDS', name: 'SL1, P1 & SL2', desc: 'Source identity, first-attempt evidence, decisive move, and intrinsic-demand factors.' },
  { num: '04', icon: '🧠', title: 'QRT', name: 'Cognitive Demand', desc: '7 operations, 5-factor rubric bounds [0..2], and shortest valid reasoning route.' },
  { num: '05', icon: '🧩', title: 'SUBJECT', name: 'Blueprint & Adapter', desc: 'Physics D3/D4, Mathematics, and Chemistry topic bindings with scientific warrants.' },
  { num: '06', icon: '💡', title: 'CORE', name: 'Construct & Reconstruct', desc: 'Core2 exact questions, Core1A sufficient teaching, Core1B fresh reasoning, and B1–B7 witnesses.' },
  { num: '07', icon: '✅', title: 'CHECKS', name: 'QA & Publication', desc: 'Technical automated checks vs. independent reviewer gates and fail-closed decisions.' },
  { num: '08', icon: '🗺️', title: 'CONTEXT', name: 'Onboarding & Workflow', desc: 'Reading sequence, active path maps, dependencies, and dated immutable checkpoints.' },
  { num: '09', icon: '🔬', title: 'EVIDENCE', name: 'Review Examples', desc: 'Read-only technical construction candidates and QRT evidence packets under HOLD.' },
];

export class ArchitecturePageController {
  private activeDocId: string | null = null;

  selectDoc(id: string | null): void {
    this.activeDocId = id;
  }

  getActiveDoc(): ArchitectureDocDescriptor | null {
    if (!this.activeDocId) return null;
    const clean = this.activeDocId.toLowerCase();
    return ARCHITECTURE_DOCS.find(d => 
      d.id === this.activeDocId || 
      d.id.toLowerCase() === clean ||
      d.sourcePath.toLowerCase().includes(clean)
    ) || null;
  }
}

export function mountArchitectureHub(
  root: HTMLElement,
  initialDocId?: string,
  onNavigate?: (route: string) => void
): { dispose: () => void } {
  const controller = new ArchitecturePageController();
  if (initialDocId) controller.selectDoc(initialDocId);

  const render = () => {
    const activeDoc = controller.getActiveDoc();

    root.innerHTML = `
      <div class="architecture-hub" style="max-width: 1400px; margin: 0 auto; padding: 1.5rem; box-sizing: border-box; font-family: system-ui, -apple-system, sans-serif; line-height: 1.55; color: #0f172a;">
        
        <!-- Breadcrumb & Top Bar -->
        <header style="padding-bottom: 1.25rem; border-bottom: 2px solid #e2e8f0; margin-bottom: 1.5rem;">
          <div style="display: flex; gap: 8px; font-size: 0.9rem; color: #64748b; margin-bottom: 0.5rem; align-items: center;">
            <a href="#/home" style="color: #0284c7; text-decoration: none; font-weight: 600;">Home</a> &gt; 
            <span style="color: #475569; font-weight: 700;">🧭 Architecture &amp; Pedagogy Hub</span>
            ${activeDoc ? `&gt; <span>${escapeHtml(activeDoc.title)}</span>` : ''}
          </div>

          <div style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: flex-start; gap: 1rem;">
            <div>
              <div style="display: flex; gap: 8px; margin-bottom: 0.5rem; flex-wrap: wrap;">
                <span style="font-size:0.875rem; font-weight: 800; background: #fef3c7; color: #92400e; padding: 4px 10px; border-radius: 4px; letter-spacing: 0.5px;">GRADE9 v4.1 PARITY</span>
                <span style="font-size:0.875rem; font-weight: 700; background: #e0f2fe; color: #0369a1; padding: 4px 10px; border-radius: 4px;">OPERATOR &amp; AUTHORING HUB</span>
                <span style="font-size:0.875rem; font-weight: 700; background: #fee2e2; color: #991b1b; padding: 4px 10px; border-radius: 4px;">Academic Status: HOLD</span>
              </div>
              <h1 style="margin: 0 0 0.5rem; font-size: 2.2rem; font-weight: 800; color: #0f172a;">🧭 How Do Great Lessons Get Made?</h1>
              <p style="margin: 0; color: #475569; font-size: 1.15rem; max-width: 900px; line-height: 1.5;">
                Explore what happens behind each lesson: where questions come from, how cognitive demand is measured via QRT, how subject Blueprints bind to topic adapters, and how lessons achieve production readiness.
              </p>
            </div>
            
            <button type="button" id="btn-back-home" style="min-height: ${HIT_TARGET_MIN_PX}px; padding: 10px 18px; background: #f1f5f9; color: #0f172a; border: 1px solid #cbd5e1; border-radius: 6px; cursor: pointer; font-weight: 700; font-size: 0.95rem;">
              ← Back to Home
            </button>
          </div>
        </header>

        <!-- Active Document Viewer (Modal or Embedded) -->
        ${activeDoc ? `
          <div id="active-doc-viewer" style="background: #ffffff; border: 2px solid #0284c7; border-radius: 12px; padding: 1.5rem; margin-bottom: 2.5rem; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.07);">
            <style>${ARCHITECTURE_DOCS_CSS}</style>
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1.25rem; border-bottom: 2px solid #e2e8f0; padding-bottom: 1rem; gap: 1rem; flex-wrap: wrap;">
              <div style="flex: 1; min-width: 280px;">
                <div style="display: flex; gap: 8px; align-items: center; margin-bottom: 0.5rem; flex-wrap: wrap;">
                  <span style="font-size:0.875rem; font-weight: 800; background: #0284c7; color: white; padding: 3px 10px; border-radius: 4px; letter-spacing: 0.5px;">${escapeHtml(activeDoc.category)}</span>
                  <span style="font-size:0.85rem; font-weight: 700; background: #e0f2fe; color: #0369a1; padding: 3px 10px; border-radius: 4px;">FULL DOCUMENT VIEWER</span>
                  <span style="font-size:0.85rem; font-weight: 700; background: #ecfdf5; color: #047857; padding: 3px 10px; border-radius: 4px;">Zero Remote Link Required</span>
                </div>
                <h2 style="margin: 0.25rem 0; font-size: 1.65rem; color: #0f172a; font-weight: 800;">${escapeHtml(activeDoc.title)}</h2>
                <p style="margin: 0; color: #64748b; font-size: 1rem;">${escapeHtml(activeDoc.subtitle)}</p>
              </div>
              <div style="display: flex; gap: 8px; align-items: center;">
                <button type="button" id="btn-scroll-doc-top" style="min-height: ${HIT_TARGET_MIN_PX}px; padding: 8px 14px; background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 6px; cursor: pointer; font-weight: 700; color: #475569;" title="Scroll to top of document">
                  ↑ Top
                </button>
                <button type="button" id="btn-close-doc" style="min-height: ${HIT_TARGET_MIN_PX}px; padding: 8px 18px; background: #fee2e2; color: #991b1b; border: 1px solid #fca5a5; border-radius: 6px; cursor: pointer; font-weight: 700;">
                  ✕ Close Document
                </button>
              </div>
            </div>

            <!-- Executive Summary Callout -->
            <aside class="callout" style="border-left: 4px solid #0284c7; background: #f0f9ff; padding: 14px 18px; border-radius: 6px; margin-bottom: 1.5rem; color: #0c4a6e; font-size: 0.95rem;">
              <strong style="display: block; margin-bottom: 6px; font-size: 1rem; color: #0369a1;">📋 Executive Overview:</strong>
              ${activeDoc.summaryHtml}
            </aside>

            <!-- Complete Ingested Full-Fidelity Document Content -->
            <div class="g9-arch-doc-container" style="max-height: 75vh; overflow-y: auto; padding: 1.25rem; border: 1px solid #e2e8f0; border-radius: 10px; background: #ffffff; box-shadow: inset 0 2px 4px rgba(0,0,0,0.02);">
              ${ARCHITECTURE_DOCS_CONTENT[activeDoc.id] || '<p style="color: #64748b; font-style: italic;">Document contents unavailable.</p>'}
            </div>
          </div>
        ` : ''}

        <!-- Primary Feature Cards: The Core Authoring Documents -->
        <section style="margin-bottom: 2.5rem;">
          <h2 style="font-size: 1.4rem; font-weight: 800; color: #0f172a; margin-bottom: 1rem;">
            📚 Core Authoring &amp; Review Guides
          </h2>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 380px), 1fr)); gap: 1.25rem;">
            ${ARCHITECTURE_DOCS.map(doc => `
              <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 10px; padding: 1.5rem; display: flex; flex-direction: column; justify-content: space-between; transition: box-shadow 0.2s;" class="doc-card">
                <div>
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                    <span style="font-size:0.875rem; font-weight: 800; background: #f1f5f9; color: #475569; padding: 2px 8px; border-radius: 4px;">${escapeHtml(doc.category)}</span>
                  </div>
                  <h3 style="margin: 0 0 0.5rem; font-size: 1.2rem; font-weight: 700; color: #0f172a;">${escapeHtml(doc.title)}</h3>
                  <p style="margin: 0 0 1rem; color: #64748b; font-size: 0.95rem; line-height: 1.5;">${escapeHtml(doc.subtitle)}</p>
                </div>
                <button type="button" class="btn-open-doc" data-doc-id="${doc.id}" style="min-height: ${HIT_TARGET_MIN_PX}px; width: 100%; padding: 10px; background: #0284c7; color: white; border: none; border-radius: 6px; font-weight: 700; cursor: pointer; font-size: 0.95rem;">
                  Inspect Architecture Guide →
                </button>
              </div>
            `).join('')}
          </div>
        </section>

        <!-- The 9 Learning Blueprint Panels (Authentic v4.1 Replication) -->
        <section style="margin-bottom: 2.5rem;">
          <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 1rem;">
            <h2 style="font-size: 1.4rem; font-weight: 800; color: #0f172a; margin: 0;">
              🧩 The 9-Stage Learning Blueprint
            </h2>
            <span style="font-size: 0.9rem; color: #64748b;">Complete Pedagogical Architecture</span>
          </div>

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr)); gap: 1rem;">
            ${BLUEPRINT_CARDS.map(b => `
              <div style="background: #ffffff; border: 1px solid #cbd5e1; border-radius: 8px; padding: 1.25rem; display: flex; flex-direction: column; justify-content: space-between;">
                <div>
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                    <span style="font-size: 1.4rem;">${b.icon}</span>
                    <span style="font-size:0.875rem; font-weight: 800; color: #94a3b8;">${b.num}</span>
                  </div>
                  <div style="font-size:0.875rem; font-weight: 800; color: #0284c7; letter-spacing: 0.5px;">${escapeHtml(b.title)}</div>
                  <h4 style="margin: 0.25rem 0 0.5rem; font-size: 1.1rem; color: #0f172a;">${escapeHtml(b.name)}</h4>
                  <p style="margin: 0; font-size: 0.9rem; color: #64748b; line-height: 1.45;">${escapeHtml(b.desc)}</p>
                </div>
              </div>
            `).join('')}
          </div>
        </section>

        <!-- Suggested Reading Order Panel -->
        <section style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 12px; padding: 1.5rem;">
          <h3 style="margin: 0 0 1rem; font-size: 1.2rem; color: #0f172a;">
            🧭 Standard Operating Sequence for Learning Module Authoring
          </h3>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 200px), 1fr)); gap: 1rem;">
            <div style="background: white; border: 1px solid #e2e8f0; border-radius: 6px; padding: 1rem;">
              <strong style="color: #0284c7;">1. Scope &amp; Intake</strong>
              <p style="margin: 0.5rem 0 0; font-size:0.875rem; color: #64748b;">Verify syllabus, exact exam identity, figures, and rights custody.</p>
            </div>
            <div style="background: white; border: 1px solid #e2e8f0; border-radius: 6px; padding: 1rem;">
              <strong style="color: #0284c7;">2. Demands &amp; QRT</strong>
              <p style="margin: 0.5rem 0 0; font-size:0.875rem; color: #64748b;">Score 7 operations, 5-factor rubric bounds, and shortest valid reasoning route.</p>
            </div>
            <div style="background: white; border: 1px solid #e2e8f0; border-radius: 6px; padding: 1rem;">
              <strong style="color: #0284c7;">3. Blueprint Binding</strong>
              <p style="margin: 0.5rem 0 0; font-size:0.875rem; color: #64748b;">Bind subject Blueprint to topic adapter; ensure commit-first derivations.</p>
            </div>
            <div style="background: white; border: 1px solid #e2e8f0; border-radius: 6px; padding: 1rem;">
              <strong style="color: #0284c7;">4. Dual Construction</strong>
              <p style="margin: 0.5rem 0 0; font-size:0.875rem; color: #64748b;">Build Core 1A sufficient teaching &amp; Core 1B fresh reconstruction with B1–B7 witnesses.</p>
            </div>
            <div style="background: white; border: 1px solid #e2e8f0; border-radius: 6px; padding: 1rem;">
              <strong style="color: #0284c7;">5. Tablet QA &amp; Review</strong>
              <p style="margin: 0.5rem 0 0; font-size:0.875rem; color: #64748b;">Run 12.7" multi-viewport headless audit and independent review receipt handoff.</p>
            </div>
          </div>
        </section>

      </div>
    `;

    bindEvents();
  };

  const bindEvents = () => {
    // Back home button
    root.querySelector<HTMLButtonElement>('#btn-back-home')?.addEventListener('click', () => {
      if (onNavigate) onNavigate('/home');
      else window.location.hash = '#/home';
    });

    // Close document viewer
    root.querySelector<HTMLButtonElement>('#btn-close-doc')?.addEventListener('click', () => {
      controller.selectDoc(null);
      render();
    });

    // Scroll document to top
    root.querySelector<HTMLButtonElement>('#btn-scroll-doc-top')?.addEventListener('click', () => {
      const container = root.querySelector<HTMLElement>('.g9-arch-doc-container');
      if (container) {
        container.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });

    // Intercept internal links and cross-doc links in the document container
    root.querySelector('.g9-arch-doc-container')?.addEventListener('click', (e) => {
      const target = (e.target as HTMLElement).closest('a');
      if (!target) return;
      const href = target.getAttribute('href');
      if (!href) return;

      // Internal anchor jumps (e.g. #start, #workflow, #intake)
      if (href.startsWith('#')) {
        e.preventDefault();
        const targetId = href.slice(1);
        if (targetId === 'top' || !targetId) {
          const container = root.querySelector<HTMLElement>('.g9-arch-doc-container');
          container?.scrollTo({ top: 0, behavior: 'smooth' });
          return;
        }
        const targetEl = root.querySelector<HTMLElement>(`#${CSS.escape(targetId)}`);
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        return;
      }

      // Inter-guide transitions (e.g. guidebook.html, review-guide.html)
      const docLinkMatch = href.match(/(core1ab-agent-guide|guidebook|core2-source-to-learning-pipeline|production-checklist|review-guide|index|alpha-board)\.html/);
      if (docLinkMatch) {
        e.preventDefault();
        const file = docLinkMatch[1];
        const docMap: Record<string, string> = {
          'core1ab-agent-guide': 'core1ab-guide',
          'guidebook': 'guidebook',
          'core2-source-to-learning-pipeline': 'pipeline-benchmarks',
          'production-checklist': 'production-checklist',
          'review-guide': 'review-guide',
          'index': 'overview',
          'alpha-board': 'preview-batches',
        };
        const targetDocId = docMap[file];
        if (targetDocId) {
          controller.selectDoc(targetDocId);
          render();
          root.querySelector('#active-doc-viewer')?.scrollIntoView({ behavior: 'smooth' });
        }
        return;
      }
    });

    // Open document buttons
    root.querySelectorAll<HTMLButtonElement>('.btn-open-doc').forEach(btn => {
      btn.addEventListener('click', () => {
        const docId = btn.dataset.docId;
        if (docId) {
          controller.selectDoc(docId);
          render();
          root.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  };

  render();

  return {
    dispose: () => {
      root.replaceChildren();
    },
  };
}
