/**
 * web/pages/physics-library.ts
 * Wave 13 — v3.5 Physics Curriculum Full Package (20 Library Packages) & 208 Authentic Library Questions.
 *
 * Implements:
 * - 22 Library Packages Navigator (20 Physics + 2 Mathematics) spanning Kinematics, Dynamics,
 *   Gravitation, Fluids, Electricity, Magnetism, Optics, Oscillations, Waves, Thermodynamics, and Algebra
 * - 208 Authentic Library Questions with Fault N09 Answer Isolation (withholding raw answers)
 * - Interactive Kinematics Trajectory Simulator Workbench with SVG parabola & celestial gravity presets
 * - 12.7" Tablet Touch Ergonomics (>=48px min, >=56px primary actions, zero horizontal overflow)
 *
 * No academic approval inferred from software validation.
 */

import { escapeHtml } from '../runtime/rendering.ts';
import { HIT_TARGET_MIN_PX, HIT_TARGET_PRIMARY_PX } from '../styles/tokens.ts';
import {
  LIBRARY_PACKAGES,
  LIBRARY_QUESTIONS,
  type LibraryPackageDescriptor,
  type LibraryQuestionDescriptor,
} from './physics-library-data.generated.ts';

export {
  LIBRARY_PACKAGES,
  LIBRARY_QUESTIONS,
  type LibraryPackageDescriptor,
  type LibraryQuestionDescriptor,
};

export type PhysLibTab = 'packages' | 'questions' | 'simulator';
export type PhysLibDomainFilter = 'ALL' | 'KINEMATICS' | 'DYNAMICS' | 'WAVES_OPTICS' | 'ELECTROMAGNETISM' | 'MATHEMATICS';

export interface PhysicsLibraryState {
  activeTab: PhysLibTab;
  domainFilter: PhysLibDomainFilter;
  searchQuery: string;
  selectedPackageId: string | null;
  expandedPackages: Set<string>;
  revealedHints: Set<string>;
  selectedAnswers: Map<string, string>;
  // Kinematics Simulator state
  launchSpeed: number; // m/s
  launchAngle: number; // degrees
  gravity: number; // m/s^2
}

export const GRAVITY_PRESETS = [
  { name: 'Earth (9.8 m/s²)', value: 9.8 },
  { name: 'Moon (1.6 m/s²)', value: 1.6 },
  { name: 'Mars (3.7 m/s²)', value: 3.7 },
  { name: 'Jupiter (24.8 m/s²)', value: 24.8 },
];

export class PhysicsLibraryController {
  private state: PhysicsLibraryState;
  private listeners: Array<() => void> = [];

  constructor(initialPackageId: string | null = null, initialTab: PhysLibTab = 'packages') {
    this.state = {
      activeTab: initialTab,
      domainFilter: 'ALL',
      searchQuery: '',
      selectedPackageId: initialPackageId,
      expandedPackages: new Set<string>(),
      revealedHints: new Set<string>(),
      selectedAnswers: new Map<string, string>(),
      launchSpeed: 40,
      launchAngle: 45,
      gravity: 9.8,
    };
  }

  public getState(): Readonly<PhysicsLibraryState> {
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

  public setActiveTab(tab: PhysLibTab): void {
    this.state.activeTab = tab;
    this.notify();
  }

  public setDomainFilter(domain: PhysLibDomainFilter): void {
    this.state.domainFilter = domain;
    this.notify();
  }

  public setSearchQuery(q: string): void {
    this.state.searchQuery = q;
    this.notify();
  }

  public selectPackage(packageId: string | null): void {
    this.state.selectedPackageId = packageId;
    this.notify();
  }

  public togglePackageExpanded(packageId: string): void {
    if (this.state.expandedPackages.has(packageId)) {
      this.state.expandedPackages.delete(packageId);
    } else {
      this.state.expandedPackages.add(packageId);
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

  public setLaunchSpeed(speed: number): void {
    this.state.launchSpeed = Math.max(5, Math.min(100, speed));
    this.notify();
  }

  public setLaunchAngle(angle: number): void {
    this.state.launchAngle = Math.max(5, Math.min(85, angle));
    this.notify();
  }

  public setGravity(g: number): void {
    this.state.gravity = g;
    this.notify();
  }
}

export function mountPhysicsLibrary(
  container: HTMLElement,
  controller: PhysicsLibraryController,
  navigate?: (route: string) => void
): { dispose: () => void } {
  container.innerHTML = '';
  const root = document.createElement('div');
  root.className = 'physics-library-root';
  root.style.cssText = 'min-width:0;max-width:100%;box-sizing:border-box;color:#0f172a;';
  container.appendChild(root);

  function matchesDomain(domainFilter: PhysLibDomainFilter, pkgDomain: string, subj: string): boolean {
    if (domainFilter === 'ALL') return true;
    if (domainFilter === 'MATHEMATICS') return subj === 'MATHEMATICS';
    if (domainFilter === 'KINEMATICS') return pkgDomain.includes('Kinematics') || pkgDomain.includes('Motion');
    if (domainFilter === 'DYNAMICS') return pkgDomain.includes('Dynamics') || pkgDomain.includes('Mechanics') || pkgDomain.includes('Gravitation') || pkgDomain.includes('Energy');
    if (domainFilter === 'WAVES_OPTICS') return pkgDomain.includes('Waves') || pkgDomain.includes('Oscillations') || pkgDomain.includes('Optics');
    if (domainFilter === 'ELECTROMAGNETISM') return pkgDomain.includes('Electricity') || pkgDomain.includes('Magnetism');
    return true;
  }

  function render(): void {
    const state = controller.getState();
    const query = state.searchQuery.trim().toLowerCase();

    // Filter packages
    const visiblePackages = LIBRARY_PACKAGES.filter(p => {
      if (!matchesDomain(state.domainFilter, p.domain, p.subject)) return false;
      if (!query) return true;
      return (
        p.id.toLowerCase().includes(query) ||
        p.title.toLowerCase().includes(query) ||
        p.domain.toLowerCase().includes(query) ||
        p.scopeSummary.toLowerCase().includes(query) ||
        p.microtopics.some(m => m.toLowerCase().includes(query))
      );
    });

    // Filter questions
    const visibleQuestions = LIBRARY_QUESTIONS.filter(q => {
      if (state.selectedPackageId && q.packageId !== state.selectedPackageId) return false;
      if (!matchesDomain(state.domainFilter, q.domain, q.subject)) return false;
      if (!query) return true;
      return (
        q.id.toLowerCase().includes(query) ||
        q.stem.toLowerCase().includes(query) ||
        q.domain.toLowerCase().includes(query) ||
        q.failureSignal.toLowerCase().includes(query)
      );
    });

    // Kinematics calculations
    const v0 = state.launchSpeed;
    const rad = (state.launchAngle * Math.PI) / 180;
    const g = state.gravity;
    const timeOfFlight = (2 * v0 * Math.sin(rad)) / g;
    const maxHeight = (v0 * v0 * Math.sin(rad) * Math.sin(rad)) / (2 * g);
    const range = (v0 * v0 * Math.sin(2 * rad)) / g;

    root.innerHTML = `
      <!-- Header Banner -->
      <header style="background:linear-gradient(135deg, #0369a1 0%, #0284c7 50%, #0ea5e9 100%);color:white;padding:24px 20px;border-radius:12px;margin-bottom:20px;box-shadow:0 4px 12px rgba(0,0,0,0.1);">
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:8px;flex-wrap:wrap;">
          <span style="font-size:2rem;line-height:1;">⚛️</span>
          <h1 style="margin:0;font-size:1.75rem;font-weight:800;letter-spacing:-0.02em;">STEM Curriculum Library Packages & 208 Authentic Questions</h1>
          <span style="background:rgba(255,255,255,0.2);padding:4px 10px;border-radius:6px;font-size:0.875rem;font-weight:700;margin-left:auto;">Wave 13 Parity</span>
        </div>
        <p style="margin:0 0 16px 0;opacity:0.95;max-width:920px;font-size:1.05rem;">
          Official Grade9v3.5 core foundation: 20 Physics library packages spanning Mechanics, Fluids, Optics, Electricity, Waves, plus 2 Mathematics packages and 208 authentic questions.
        </p>

        <!-- KPI Metrics Ribbon -->
        <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(170px, 1fr));gap:12px;background:rgba(0,0,0,0.2);padding:14px;border-radius:8px;">
          <div>
            <div style="font-size:0.875rem;text-transform:uppercase;letter-spacing:0.05em;opacity:0.85;">Library Packages</div>
            <div style="font-size:1.4rem;font-weight:800;">22 Packages (20 Phy + 2 Math)</div>
          </div>
          <div>
            <div style="font-size:0.875rem;text-transform:uppercase;letter-spacing:0.05em;opacity:0.85;">Authentic Questions</div>
            <div style="font-size:1.4rem;font-weight:800;">208 Questions (137 Phy + 71 Math)</div>
          </div>
          <div>
            <div style="font-size:0.875rem;text-transform:uppercase;letter-spacing:0.05em;opacity:0.85;">STEM Domains</div>
            <div style="font-size:1.4rem;font-weight:800;">6 Domains Covered</div>
          </div>
          <div>
            <div style="font-size:0.875rem;text-transform:uppercase;letter-spacing:0.05em;opacity:0.85;">Answer Isolation</div>
            <div style="font-size:1.1rem;font-weight:700;color:#bae6fd;">🛡️ Fault N09 Active</div>
          </div>
        </div>
      </header>

      <!-- Navigation & Mode Tabs -->
      <div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:16px;">
        <button type="button" data-tab="packages" style="min-height:${HIT_TARGET_MIN_PX}px;min-width:${HIT_TARGET_MIN_PX}px;padding:10px 18px;border-radius:8px;font-weight:700;cursor:pointer;background:${state.activeTab === 'packages' ? '#0284c7' : '#e2e8f0'};color:${state.activeTab === 'packages' ? '#ffffff' : '#1e293b'};border:none;box-shadow:${state.activeTab === 'packages' ? '0 2px 4px rgba(2,132,199,0.3)' : 'none'};">
          📚 1. Library Packages (${visiblePackages.length})
        </button>
        <button type="button" data-tab="questions" style="min-height:${HIT_TARGET_MIN_PX}px;min-width:${HIT_TARGET_MIN_PX}px;padding:10px 18px;border-radius:8px;font-weight:700;cursor:pointer;background:${state.activeTab === 'questions' ? '#0284c7' : '#e2e8f0'};color:${state.activeTab === 'questions' ? '#ffffff' : '#1e293b'};border:none;box-shadow:${state.activeTab === 'questions' ? '0 2px 4px rgba(2,132,199,0.3)' : 'none'};">
          📑 2. Authentic Questions (${visibleQuestions.length})
        </button>
        <button type="button" data-tab="simulator" style="min-height:${HIT_TARGET_MIN_PX}px;min-width:${HIT_TARGET_MIN_PX}px;padding:10px 18px;border-radius:8px;font-weight:700;cursor:pointer;background:${state.activeTab === 'simulator' ? '#0284c7' : '#e2e8f0'};color:${state.activeTab === 'simulator' ? '#ffffff' : '#1e293b'};border:none;box-shadow:${state.activeTab === 'simulator' ? '0 2px 4px rgba(2,132,199,0.3)' : 'none'};">
          🎯 3. Kinematics Simulator
        </button>
      </div>

      <!-- Domain Filters & Search Bar -->
      <div style="background:#f8fafc;border:1px solid #cbd5e1;border-radius:8px;padding:12px 16px;margin-bottom:20px;display:flex;flex-wrap:wrap;gap:12px;align-items:center;">
        <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;">
          <span style="font-weight:700;font-size:0.9rem;color:#475569;">Domain:</span>
          ${renderDomainFilterBtn('ALL', 'All (22)')}
          ${renderDomainFilterBtn('KINEMATICS', 'Kinematics')}
          ${renderDomainFilterBtn('DYNAMICS', 'Dynamics')}
          ${renderDomainFilterBtn('WAVES_OPTICS', 'Waves & Optics')}
          ${renderDomainFilterBtn('ELECTROMAGNETISM', 'Electromagnetism')}
          ${renderDomainFilterBtn('MATHEMATICS', 'Mathematics (2)')}
        </div>

        ${state.selectedPackageId ? `
          <div style="display:flex;align-items:center;gap:6px;background:#e0f2fe;border:1px solid #7dd3fc;padding:4px 10px;border-radius:6px;">
            <span style="font-size:0.875rem;font-weight:700;color:#0369a1;">Package: ${escapeHtml(state.selectedPackageId)}</span>
            <button type="button" id="btn-clear-package" style="min-height:${HIT_TARGET_MIN_PX}px;min-width:${HIT_TARGET_MIN_PX}px;background:none;border:none;cursor:pointer;color:#0284c7;font-weight:800;font-size:1.2rem;line-height:1;display:flex;align-items:center;justify-content:center;" aria-label="Clear package filter">×</button>
          </div>
        ` : ''}

        <div style="margin-left:auto;flex:1;min-width:240px;max-width:360px;">
          <input
            type="search"
            id="lib-search-input"
            value="${escapeHtml(state.searchQuery)}"
            placeholder="Search packages, microtopics, questions..."
            aria-label="Search physics library"
            style="width:100%;min-height:${HIT_TARGET_MIN_PX}px;padding:8px 12px;border:1px solid #cbd5e1;border-radius:6px;font-size:0.95rem;box-sizing:border-box;"
          />
        </div>
      </div>

      <!-- Tab Content Pane -->
      <main class="phys-lib-content">
        ${renderActiveTab()}
      </main>
    `;

    function renderDomainFilterBtn(domain: PhysLibDomainFilter, label: string): string {
      const isSelected = state.domainFilter === domain;
      return `
        <button
          type="button"
          data-domain="${domain}"
          style="min-height:${HIT_TARGET_MIN_PX}px;min-width:${HIT_TARGET_MIN_PX}px;padding:6px 12px;border-radius:6px;font-size:0.875rem;font-weight:700;cursor:pointer;border:1px solid ${isSelected ? '#0284c7' : '#cbd5e1'};background:${isSelected ? '#e0f2fe' : '#ffffff'};color:${isSelected ? '#0369a1' : '#334155'};"
        >
          ${escapeHtml(label)}
        </button>
      `;
    }

    function renderActiveTab(): string {
      switch (state.activeTab) {
        case 'packages':
          return renderPackagesView();
        case 'questions':
          return renderQuestionsView();
        case 'simulator':
          return renderSimulatorView();
        default:
          return renderPackagesView();
      }
    }

    // 1. Packages Grid View
    function renderPackagesView(): string {
      if (visiblePackages.length === 0) {
        return `<div style="padding:40px;text-align:center;color:#64748b;font-weight:600;">No library packages match the selected domain filter.</div>`;
      }

      return `
        <div style="display:grid;grid-template-columns:repeat(auto-fill, minmax(360px, 1fr));gap:16px;">
          ${visiblePackages.map(pkg => {
            const isSelected = state.selectedPackageId === pkg.id;
            const isMath = pkg.subject === 'MATHEMATICS';
            const isExpanded = state.expandedPackages.has(pkg.id);

            return `
              <div class="library-package-card" style="border:1px solid ${isSelected ? '#0284c7' : '#e2e8f0'};border-left:5px solid ${isMath ? '#9333ea' : '#0284c7'};border-radius:10px;padding:18px;background:${isSelected ? '#f0f9ff' : '#ffffff'};box-shadow:0 1px 4px rgba(0,0,0,0.06);display:flex;flex-direction:column;">
                <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:8px;">
                  <div>
                    <span style="font-weight:800;font-size:0.875rem;color:${isMath ? '#7e22ce' : '#0369a1'};padding:2px 8px;border-radius:4px;background:${isMath ? '#f3e8ff' : '#e0f2fe'};margin-right:6px;">
                      ${escapeHtml(pkg.subject)}
                    </span>
                    <span style="font-size:0.875rem;font-weight:700;padding:2px 8px;border-radius:4px;background:#f1f5f9;color:#475569;">
                      ${escapeHtml(pkg.domain)}
                    </span>
                  </div>
                  <span style="font-size:0.875rem;color:#64748b;font-weight:700;">${pkg.questionCount} Qs</span>
                </div>

                <h3 style="margin:0 0 6px 0;font-size:1.15rem;font-weight:700;color:#0f172a;line-height:1.3;">
                  ${escapeHtml(pkg.title)}
                </h3>

                <div style="font-family:monospace;font-size:0.875rem;color:#64748b;margin-bottom:10px;">
                  ${escapeHtml(pkg.id)}
                </div>

                <p style="margin:0 0 12px 0;font-size:0.92rem;color:#475569;line-height:1.45;flex-grow:1;">
                  ${escapeHtml(pkg.scopeSummary)}
                </p>

                <!-- Microtopics pills -->
                ${pkg.microtopics.length > 0 ? `
                  <div style="display:flex;flex-wrap:wrap;gap:4px;margin-bottom:12px;">
                    ${pkg.microtopics.slice(0, 4).map(m => `
                      <span style="font-size:0.875rem;background:#f8fafc;border:1px solid #e2e8f0;color:#334155;padding:2px 6px;border-radius:4px;">
                        ${escapeHtml(m)}
                      </span>
                    `).join('')}
                    ${pkg.microtopics.length > 4 ? `
                      <span style="font-size:0.875rem;color:#64748b;padding:2px;">+${pkg.microtopics.length - 4} more</span>
                    ` : ''}
                  </div>
                ` : ''}

                <!-- Footer with actions -->
                <div style="display:flex;align-items:center;justify-content:space-between;border-top:1px solid #f1f5f9;padding-top:12px;gap:8px;flex-wrap:wrap;">
                  <button
                    type="button"
                    data-action="toggle-pkg-detail"
                    data-pkg-id="${escapeHtml(pkg.id)}"
                    style="min-height:${HIT_TARGET_MIN_PX}px;min-width:${HIT_TARGET_MIN_PX}px;padding:6px 12px;background:#f1f5f9;color:#334155;border:1px solid #cbd5e1;border-radius:6px;font-weight:700;font-size:0.875rem;cursor:pointer;"
                  >
                    ${isExpanded ? 'Hide Details' : 'Inspect Microtopics'}
                  </button>

                  <button
                    type="button"
                    data-action="view-pkg-questions"
                    data-pkg-id="${escapeHtml(pkg.id)}"
                    style="min-height:${HIT_TARGET_MIN_PX}px;min-width:${HIT_TARGET_MIN_PX}px;padding:6px 14px;background:#0284c7;color:white;border:none;border-radius:6px;font-weight:700;font-size:0.875rem;cursor:pointer;"
                  >
                    Questions (${pkg.questionCount}) →
                  </button>
                </div>

                ${isExpanded ? `
                  <div style="margin-top:12px;padding:12px;background:#f8fafc;border-radius:6px;border:1px solid #e2e8f0;font-size:0.875rem;">
                    <strong>All Microtopics (${pkg.microtopics.length}):</strong>
                    <ul style="margin:4px 0 8px 0;padding-left:18px;color:#334155;">
                      ${pkg.microtopics.map(m => `<li>${escapeHtml(m)}</li>`).join('')}
                    </ul>
                    ${pkg.curriculumMappings.length > 0 ? `
                      <strong>Curriculum Alignments:</strong>
                      <div style="color:#64748b;margin-top:2px;">${escapeHtml(pkg.curriculumMappings.join(' • '))}</div>
                    ` : ''}
                  </div>
                ` : ''}
              </div>
            `;
          }).join('')}
        </div>
      `;
    }

    // 2. Questions Explorer View
    function renderQuestionsView(): string {
      return `
        <div style="margin-bottom:16px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;">
          <div>
            <h2 style="margin:0;font-size:1.25rem;font-weight:700;">208 Authentic Library Questions</h2>
            <p style="margin:4px 0 0 0;font-size:0.9rem;color:#64748b;">
              Showing ${visibleQuestions.length} questions with progressive hint ladders and Fault N09 key isolation.
            </p>
          </div>
        </div>

        <div style="display:flex;flex-direction:column;gap:16px;">
          ${visibleQuestions.slice(0, 35).map(q => {
            const isHintRevealed = state.revealedHints.has(q.id);
            const userChoice = state.selectedAnswers.get(q.id);

            return `
              <div class="library-question-card" style="border:1px solid #cbd5e1;border-radius:10px;padding:20px;background:#ffffff;box-shadow:0 1px 4px rgba(0,0,0,0.06);">
                <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;flex-wrap:wrap;gap:8px;">
                  <div style="display:flex;align-items:center;gap:8px;">
                    <span style="font-family:monospace;font-weight:800;font-size:0.95rem;color:#0284c7;">${escapeHtml(q.id)}</span>
                    <span style="font-size:0.875rem;padding:2px 8px;border-radius:4px;background:#e0f2fe;color:#0369a1;font-weight:600;">${escapeHtml(q.domain)}</span>
                    <span style="font-size:0.875rem;padding:2px 8px;border-radius:4px;background:#f1f5f9;color:#475569;font-weight:600;">${escapeHtml(q.packageId)}</span>
                  </div>
                  <span style="font-size:0.875rem;padding:2px 8px;border-radius:4px;background:#fef3c7;color:#92400e;font-weight:700;">${escapeHtml(q.difficulty)}</span>
                </div>

                <div style="font-size:1.02rem;color:#0f172a;line-height:1.55;margin-bottom:16px;">
                  ${escapeHtml(q.stem)}
                </div>

                <!-- Options -->
                ${q.options.length > 0 ? `
                  <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(280px, 1fr));gap:8px;margin-bottom:16px;">
                    ${q.options.map(opt => {
                      const optKey = opt.slice(0, 3);
                      const isSelected = userChoice === optKey;
                      return `
                        <button
                          type="button"
                          data-action="select-option"
                          data-qid="${escapeHtml(q.id)}"
                          data-opt-key="${escapeHtml(optKey)}"
                          style="min-height:${HIT_TARGET_MIN_PX}px;min-width:${HIT_TARGET_MIN_PX}px;padding:10px 14px;border-radius:6px;border:1px solid ${isSelected ? '#0284c7' : '#cbd5e1'};background:${isSelected ? '#e0f2fe' : '#ffffff'};color:${isSelected ? '#0369a1' : '#1e293b'};font-size:0.92rem;text-align:left;cursor:pointer;font-weight:${isSelected ? '700' : '400'};"
                        >
                          ${escapeHtml(opt)}
                        </button>
                      `;
                    }).join('')}
                  </div>
                ` : ''}

                <!-- Scaffolding and Hints (Fault N09 Compliant) -->
                <div style="border-top:1px solid #f1f5f9;padding-top:12px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;">
                  <button
                    type="button"
                    data-action="toggle-hint"
                    data-qid="${escapeHtml(q.id)}"
                    style="min-height:${HIT_TARGET_MIN_PX}px;min-width:${HIT_TARGET_MIN_PX}px;padding:8px 16px;background:${isHintRevealed ? '#e2e8f0' : '#0284c7'};color:${isHintRevealed ? '#1e293b' : '#ffffff'};border:none;border-radius:6px;font-weight:700;font-size:0.875rem;cursor:pointer;"
                  >
                    ${isHintRevealed ? 'Hide Hints & Steps' : '💡 Reveal Hints & Scaffold Ladder'}
                  </button>

                  <span style="font-size:0.875rem;color:#64748b;font-family:monospace;">Fault N09: Key Isolated</span>
                </div>

                ${isHintRevealed ? `
                  <div style="margin-top:12px;padding:14px;background:#f8fafc;border-radius:6px;border:1px solid #e2e8f0;">
                    ${q.hints.length > 0 ? `
                      <div style="margin-bottom:10px;">
                        <strong style="color:#0284c7;font-size:0.875rem;text-transform:uppercase;">Conceptual Insights:</strong>
                        <ul style="margin:4px 0 0 0;padding-left:20px;font-size:0.9rem;color:#334155;line-height:1.45;">
                          ${q.hints.map(h => `<li>${escapeHtml(h)}</li>`).join('')}
                        </ul>
                      </div>
                    ` : ''}

                    ${q.hintLadder.length > 0 ? `
                      <div style="margin-bottom:10px;">
                        <strong style="color:#0369a1;font-size:0.875rem;text-transform:uppercase;">Progressive Hint Ladder:</strong>
                        <ol style="margin:4px 0 0 0;padding-left:20px;font-size:0.9rem;color:#334155;line-height:1.45;">
                          ${q.hintLadder.map(hl => `<li>${escapeHtml(hl)}</li>`).join('')}
                        </ol>
                      </div>
                    ` : ''}

                    <!-- Failure Signal Warning -->
                    <div style="background:#fef2f2;border-left:4px solid #ef4444;padding:8px 12px;border-radius:4px;margin-top:8px;">
                      <strong style="color:#b91c1c;font-size:0.875rem;text-transform:uppercase;">Diagnostic Failure Signal:</strong>
                      <div style="font-size:0.88rem;color:#991b1b;margin-top:2px;">${escapeHtml(q.failureSignal)}</div>
                    </div>
                  </div>
                ` : ''}
              </div>
            `;
          }).join('')}
        </div>

        ${visibleQuestions.length > 35 ? `
          <div style="text-align:center;padding:16px;color:#64748b;font-size:0.9rem;">
            Showing first 35 of ${visibleQuestions.length} filtered questions. Use search bar above to pinpoint specific topics.
          </div>
        ` : ''}
      `;
    }

    // 3. Interactive Kinematics Simulator View
    function renderSimulatorView(): string {
      // SVG Trajectory calculations
      const canvasWidth = 600;
      const canvasHeight = 240;
      const padding = 30;
      const drawWidth = canvasWidth - 2 * padding;
      const drawHeight = canvasHeight - 2 * padding;

      // Scale range and height to fit canvas
      const scaleX = drawWidth / Math.max(10, range);
      const scaleY = drawHeight / Math.max(5, maxHeight * 1.2);

      // Generate parabola points
      const points: string[] = [];
      const numSteps = 40;
      for (let i = 0; i <= numSteps; i++) {
        const t = (timeOfFlight * i) / numSteps;
        const x = v0 * Math.cos(rad) * t;
        const y = v0 * Math.sin(rad) * t - 0.5 * g * t * t;
        const px = padding + x * scaleX;
        const py = canvasHeight - padding - y * scaleY;
        points.push(`${px.toFixed(1)},${py.toFixed(1)}`);
      }
      const polyline = points.join(' ');

      const apexX = padding + (range / 2) * scaleX;
      const apexY = canvasHeight - padding - maxHeight * scaleY;

      return `
        <div style="margin-bottom:16px;">
          <h2 style="margin:0 0 6px 0;font-size:1.25rem;font-weight:700;">🎯 Interactive Kinematics & Projectile Motion Simulator</h2>
          <p style="margin:0 0 16px 0;font-size:0.9rem;color:#64748b;">
            Verify two-dimensional kinematics independence, parabolic trajectories, and gravity variations in real time.
          </p>

          <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(min(100%, 360px), 1fr));gap:20px;margin-bottom:20px;">
            <!-- Controls Column -->
            <div style="background:#ffffff;border:1px solid #cbd5e1;border-radius:10px;padding:20px;box-shadow:0 1px 4px rgba(0,0,0,0.06);display:flex;flex-direction:column;gap:16px;">
              <h3 style="margin:0;font-size:1.1rem;font-weight:700;color:#0f172a;">Kinematic Launch Parameters</h3>

              <!-- Speed Slider -->
              <div>
                <div style="display:flex;justify-content:space-between;margin-bottom:6px;">
                  <label for="slider-speed" style="font-weight:700;font-size:0.9rem;">Initial Speed (v₀):</label>
                  <strong style="color:#0284c7;font-size:1rem;">${v0} m/s</strong>
                </div>
                <input
                  type="range"
                  id="slider-speed"
                  min="10"
                  max="100"
                  step="5"
                  value="${v0}"
                  style="width:100%;min-height:${HIT_TARGET_MIN_PX}px;cursor:pointer;"
                />
              </div>

              <!-- Angle Slider -->
              <div>
                <div style="display:flex;justify-content:space-between;margin-bottom:6px;">
                  <label for="slider-angle" style="font-weight:700;font-size:0.9rem;">Launch Angle (θ):</label>
                  <strong style="color:#0284c7;font-size:1rem;">${state.launchAngle}°</strong>
                </div>
                <input
                  type="range"
                  id="slider-angle"
                  min="15"
                  max="85"
                  step="5"
                  value="${state.launchAngle}"
                  style="width:100%;min-height:${HIT_TARGET_MIN_PX}px;cursor:pointer;"
                />
              </div>

              <!-- Quick Angle Presets -->
              <div style="display:flex;gap:6px;flex-wrap:wrap;">
                <button type="button" data-action="set-angle" data-angle="45" style="min-height:${HIT_TARGET_MIN_PX}px;min-width:${HIT_TARGET_MIN_PX}px;padding:6px 12px;background:#f1f5f9;border:1px solid #cbd5e1;border-radius:6px;font-size:0.875rem;font-weight:700;cursor:pointer;">
                  Max Range (45°)
                </button>
                <button type="button" data-action="set-angle" data-angle="75" style="min-height:${HIT_TARGET_MIN_PX}px;min-width:${HIT_TARGET_MIN_PX}px;padding:6px 12px;background:#f1f5f9;border:1px solid #cbd5e1;border-radius:6px;font-size:0.875rem;font-weight:700;cursor:pointer;">
                  High Lob (75°)
                </button>
                <button type="button" data-action="set-angle" data-angle="20" style="min-height:${HIT_TARGET_MIN_PX}px;min-width:${HIT_TARGET_MIN_PX}px;padding:6px 12px;background:#f1f5f9;border:1px solid #cbd5e1;border-radius:6px;font-size:0.875rem;font-weight:700;cursor:pointer;">
                  Flat Shot (20°)
                </button>
              </div>

              <!-- Celestial Gravity Selector -->
              <div>
                <label for="select-gravity" style="font-weight:700;font-size:0.9rem;display:block;margin-bottom:6px;">Gravitational Acceleration (g):</label>
                <select id="select-gravity" style="width:100%;min-height:${HIT_TARGET_MIN_PX}px;padding:8px 12px;border:1px solid #cbd5e1;border-radius:6px;font-size:0.95rem;background:#ffffff;cursor:pointer;">
                  ${GRAVITY_PRESETS.map(preset => `
                    <option value="${preset.value}" ${Math.abs(g - preset.value) < 0.1 ? 'selected' : ''}>
                      ${escapeHtml(preset.name)}
                    </option>
                  `).join('')}
                </select>
              </div>
            </div>

            <!-- Trajectory Visualisation & Metrics Column -->
            <div style="background:#ffffff;border:1px solid #cbd5e1;border-radius:10px;padding:20px;box-shadow:0 1px 4px rgba(0,0,0,0.06);display:flex;flex-direction:column;">
              <h3 style="margin:0 0 12px 0;font-size:1.1rem;font-weight:700;color:#0f172a;">Computed Trajectory & Metrics</h3>

              <!-- Metrics Grid -->
              <div style="display:grid;grid-template-columns:repeat(3, 1fr);gap:8px;background:#f8fafc;padding:12px;border-radius:8px;margin-bottom:16px;">
                <div>
                  <div style="font-size:0.875rem;color:#64748b;text-transform:uppercase;font-weight:700;">Flight Time (T)</div>
                  <div style="font-size:1.25rem;font-weight:800;color:#0284c7;">${timeOfFlight.toFixed(2)} s</div>
                </div>
                <div>
                  <div style="font-size:0.875rem;color:#64748b;text-transform:uppercase;font-weight:700;">Max Height (H)</div>
                  <div style="font-size:1.25rem;font-weight:800;color:#047857;">${maxHeight.toFixed(1)} m</div>
                </div>
                <div>
                  <div style="font-size:0.875rem;color:#64748b;text-transform:uppercase;font-weight:700;">Range (R)</div>
                  <div style="font-size:1.25rem;font-weight:800;color:#b45309;">${range.toFixed(1)} m</div>
                </div>
              </div>

              <!-- SVG Trajectory Canvas -->
              <div style="background:#0f172a;border-radius:8px;padding:12px;display:flex;justify-content:center;align-items:center;margin-top:auto;">
                <svg viewBox="0 0 ${canvasWidth} ${canvasHeight}" style="width:100%;max-height:220px;overflow:visible;">
                  <!-- Ground line -->
                  <line x1="${padding - 10}" y1="${canvasHeight - padding}" x2="${canvasWidth - padding + 10}" y2="${canvasHeight - padding}" stroke="#475569" stroke-width="2" />
                  
                  <!-- Grid dashes -->
                  <line x1="${apexX}" y1="${canvasHeight - padding}" x2="${apexX}" y2="${apexY}" stroke="#334155" stroke-dasharray="4" />
                  
                  <!-- Parabolic path -->
                  <polyline points="${polyline}" fill="none" stroke="#38bdf8" stroke-width="3" />
                  
                  <!-- Apex point marker -->
                  <circle cx="${apexX}" cy="${apexY}" r="5" fill="#34d399" />
                  <text x="${apexX}" y="${apexY - 10}" fill="#34d399" font-size="14" font-family="var(--g9-font-family,system-ui,sans-serif)" text-anchor="middle" font-weight="bold">
                    H = ${maxHeight.toFixed(1)}m
                  </text>

                  <!-- Range end marker -->
                  <circle cx="${padding + range * scaleX}" cy="${canvasHeight - padding}" r="5" fill="#fbbf24" />
                  <text x="${padding + range * scaleX}" y="${canvasHeight - padding + 18}" fill="#fbbf24" font-size="14" font-family="var(--g9-font-family,system-ui,sans-serif)" text-anchor="middle" font-weight="bold">
                    R = ${range.toFixed(1)}m
                  </text>

                  <!-- Origin label -->
                  <circle cx="${padding}" cy="${canvasHeight - padding}" r="4" fill="#ffffff" />
                  <text x="${padding}" y="${canvasHeight - padding + 18}" fill="#94a3b8" font-size="14" font-family="var(--g9-font-family,system-ui,sans-serif)" text-anchor="middle">(0,0)</text>
                </svg>
              </div>
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

    // Tab buttons
    const tabBtn = target.closest<HTMLButtonElement>('button[data-tab]');
    if (tabBtn && tabBtn.dataset.tab) {
      controller.setActiveTab(tabBtn.dataset.tab as PhysLibTab);
      return;
    }

    // Domain buttons
    const domainBtn = target.closest<HTMLButtonElement>('button[data-domain]');
    if (domainBtn && domainBtn.dataset.domain) {
      controller.setDomainFilter(domainBtn.dataset.domain as PhysLibDomainFilter);
      return;
    }

    // Clear package
    if (target.id === 'btn-clear-package' || target.closest('#btn-clear-package')) {
      controller.selectPackage(null);
      return;
    }

    // Toggle package details
    const togglePkgBtn = target.closest<HTMLButtonElement>('button[data-action="toggle-pkg-detail"]');
    if (togglePkgBtn && togglePkgBtn.dataset.pkgId) {
      controller.togglePackageExpanded(togglePkgBtn.dataset.pkgId);
      return;
    }

    // View package questions
    const viewPkgQsBtn = target.closest<HTMLButtonElement>('button[data-action="view-pkg-questions"]');
    if (viewPkgQsBtn && viewPkgQsBtn.dataset.pkgId) {
      controller.selectPackage(viewPkgQsBtn.dataset.pkgId);
      controller.setActiveTab('questions');
      return;
    }

    // Toggle question hint
    const hintBtn = target.closest<HTMLButtonElement>('button[data-action="toggle-hint"]');
    if (hintBtn && hintBtn.dataset.qid) {
      controller.toggleHint(hintBtn.dataset.qid);
      return;
    }

    // Select option
    const optBtn = target.closest<HTMLButtonElement>('button[data-action="select-option"]');
    if (optBtn && optBtn.dataset.qid && optBtn.dataset.optKey) {
      controller.selectOption(optBtn.dataset.qid, optBtn.dataset.optKey);
      return;
    }

    // Quick angle preset
    const anglePresetBtn = target.closest<HTMLButtonElement>('button[data-action="set-angle"]');
    if (anglePresetBtn && anglePresetBtn.dataset.angle) {
      controller.setLaunchAngle(parseInt(anglePresetBtn.dataset.angle, 10));
      return;
    }
  }

  function handleInput(e: Event): void {
    const target = e.target as HTMLElement | null;
    if (!target) return;

    if (target.id === 'lib-search-input') {
      controller.setSearchQuery((target as HTMLInputElement).value);
    } else if (target.id === 'slider-speed') {
      controller.setLaunchSpeed(parseFloat((target as HTMLInputElement).value));
    } else if (target.id === 'slider-angle') {
      controller.setLaunchAngle(parseFloat((target as HTMLInputElement).value));
    }
  }

  function handleChange(e: Event): void {
    const target = e.target as HTMLSelectElement | null;
    if (target && target.id === 'select-gravity') {
      controller.setGravity(parseFloat(target.value));
    }
  }

  root.addEventListener('click', handleClick);
  root.addEventListener('input', handleInput);
  root.addEventListener('change', handleChange);

  const unsubscribe = controller.subscribe(() => {
    render();
  });

  render();

  return {
    dispose: () => {
      unsubscribe();
      root.removeEventListener('click', handleClick);
      root.removeEventListener('input', handleInput);
      root.removeEventListener('change', handleChange);
      root.innerHTML = '';
    },
  };
}
