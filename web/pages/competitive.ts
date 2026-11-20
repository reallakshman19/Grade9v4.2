/**
 * web/pages/competitive.ts
 * A30 / A22 — Competitive Olympiad Hub Screen Controller & Mount.
 *
 * Implements:
 * - Official profile for Indian Olympiad Qualifier in Mathematics (IOQM)
 * - Conducting Body: Mathematics Teachers’ Association (India) / HBCSE
 * - Category: Junior Olympiad
 * - Historical Paper Archive separation: Historical years (2020-2024) recorded under HOLD
 * - Year-specific scoring evolution (2020: 8/13/9, 2022: PRMO variant, 2024: 10/10/10)
 * - Direct launcher for IOQM Challenge Paper A (Authored Mock modeling 2024 HBCSE format)
 * - 12.7" tablet touch ergonomics (48px min, 56px primary, 17px base typography)
 *
 * No academic approval inferred from software validation.
 */

import { escapeHtml } from '../runtime/rendering.ts';
import { HIT_TARGET_MIN_PX, HIT_TARGET_PRIMARY_PX } from '../styles/tokens.ts';
import { DEFAULT_APP_REGISTRY, type CompetitiveExamDescriptor } from '../runtime/registry/index.ts';

export interface CompetitiveExamViewState {
  readonly exam: CompetitiveExamDescriptor | null;
  readonly selectedYear: number;
  readonly activeSyllabusTab: string;
  readonly status: 'AVAILABLE' | 'HOLD';
  readonly reason?: string;
}

export class CompetitiveExamScreenController {
  private exam: CompetitiveExamDescriptor | null = null;
  private selectedYear: number = 2024;
  private activeSyllabusTab: string = 'algebra';

  constructor(examId: string = 'exam:ioqm') {
    const found = DEFAULT_APP_REGISTRY.competitiveExams.find(
      (e) => e.id === examId || e.code.toLowerCase() === examId.toLowerCase()
    );
    this.exam = found || null;
    if (this.exam && this.exam.availableYears.length > 0) {
      this.selectedYear = this.exam.availableYears[this.exam.availableYears.length - 1]!;
    }
  }

  getExam(): CompetitiveExamDescriptor | null {
    return this.exam;
  }

  setSelectedYear(year: number): void {
    this.selectedYear = year;
  }

  getSelectedYear(): number {
    return this.selectedYear;
  }

  setSyllabusTab(tab: string): void {
    this.activeSyllabusTab = tab;
  }

  getSyllabusTab(): string {
    return this.activeSyllabusTab;
  }

  getViewState(): CompetitiveExamViewState {
    return {
      exam: this.exam,
      selectedYear: this.selectedYear,
      activeSyllabusTab: this.activeSyllabusTab,
      status: this.exam?.availability === 'AVAILABLE' ? 'AVAILABLE' : 'HOLD',
      reason: this.exam ? undefined : 'Exam descriptor not found.',
    };
  }
}

export function createCompetitiveExamScreen(examId?: string): CompetitiveExamScreenController {
  return new CompetitiveExamScreenController(examId);
}

export function mountCompetitiveExam(
  root: HTMLElement,
  controller: CompetitiveExamScreenController,
  onNavigate?: (route: string) => void
): { dispose: () => void } {
  let active = true;

  const render = () => {
    if (!active) return;
    const state = controller.getViewState();
    const exam = state.exam;

    if (!exam) {
      root.innerHTML = `
        <div style="padding:2rem;text-align:center;color:#64748b;">
          <h2>Competitive Exam Not Found</h2>
          <button type="button" onclick="window.location.hash='#/home'" style="min-height:${HIT_TARGET_PRIMARY_PX}px;padding:12px 24px;background:#0f172a;color:white;border:none;border-radius:8px;font-weight:700;cursor:pointer;">← Return Home</button>
        </div>
      `;
      return;
    }

    root.innerHTML = `
      <div class="competitive-exam-hub" style="display:flex;flex-direction:column;gap:1.5rem;max-width:1400px;margin:0 auto;padding:1.5rem;box-sizing:border-box;">
        
        <!-- Breadcrumb & Header -->
        <header style="padding-bottom:1.25rem;border-bottom:2px solid #e2e8f0;">
          <div style="display:flex;gap:8px;font-size:0.9rem;color:#64748b;margin-bottom:0.5rem;">
            <a href="#/home" style="color:#0284c7;text-decoration:none;font-weight:600;">Home</a> &gt; 
            <span style="color:#475569;font-weight:600;">Competitive Hub</span> &gt; 
            <span>${escapeHtml(exam.title)}</span>
          </div>

          <div style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:flex-start;gap:1rem;">
            <div>
              <div style="display:flex;gap:8px;margin-bottom:0.5rem;flex-wrap:wrap;">
                <span style="font-size:0.8rem;font-weight:800;background:#fef3c7;color:#92400e;padding:4px 10px;border-radius:4px;letter-spacing:0.5px;">${escapeHtml(exam.category)}</span>
                <span style="font-size:0.8rem;font-weight:700;background:#f1f5f9;color:#475569;padding:4px 10px;border-radius:4px;">Conducting Body: ${escapeHtml(exam.conductingBody)}</span>
                <span style="font-size:0.8rem;font-weight:700;background:#fee2e2;color:#991b1b;padding:4px 10px;border-radius:4px;">Academic Status: HOLD (Diagnostic Mode)</span>
              </div>
              <h1 style="margin:0 0 0.5rem;font-size:2.2rem;font-weight:800;color:#0f172a;">🏆 ${escapeHtml(exam.title)}</h1>
              <p style="margin:0;color:#475569;font-size:1.15rem;max-width:850px;line-height:1.5;">
                First tier of the Indian Mathematical Olympiad programme leading to the International Mathematical Olympiad (IMO).
              </p>
            </div>
            
            <button type="button" id="btn-back-home" style="min-height:${HIT_TARGET_MIN_PX}px;padding:10px 18px;background:#f1f5f9;color:#0f172a;border:1px solid #cbd5e1;border-radius:6px;cursor:pointer;font-weight:700;font-size:0.95rem;">← Back to Home</button>
          </div>
        </header>

        <!-- Primary Call to Action Card: Challenge Paper A -->
        <div style="background:linear-gradient(135deg, #0f172a 0%, #1e293b 100%);color:#ffffff;border-radius:12px;padding:2rem;display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:1.5rem;box-shadow:0 4px 6px -1px rgba(0,0,0,0.1);">
          <div style="max-width:750px;">
            <div style="display:flex;gap:8px;margin-bottom:0.5rem;">
              <span style="background:#38bdf8;color:#0f172a;font-size:0.75rem;font-weight:800;padding:2px 8px;border-radius:4px;text-transform:uppercase;">Simulation Mode</span>
              <span style="background:#334155;color:#f8fafc;font-size:0.75rem;font-weight:600;padding:2px 8px;border-radius:4px;">Authored Mock</span>
            </div>
            <h2 style="margin:0 0 0.5rem;font-size:1.6rem;font-weight:800;color:#ffffff;">IOQM 3-Hour Challenge Paper A</h2>
            <p style="margin:0 0 1rem;color:#cbd5e1;font-size:1rem;line-height:1.5;">
              Full-length timed simulated assessment conforming to the official 2024 HBCSE structure: 
              30 integer questions (10 × 2-mark, 10 × 3-mark, 10 × 5-mark = 100 marks), 180-minute countdown timer, integer inputs ([00..99]), and digital scratchpad.
            </p>
            <div style="display:flex;gap:1.5rem;flex-wrap:wrap;font-size:0.95rem;color:#94a3b8;">
              <span>⏱ Duration: <strong>180 Mins</strong></span>
              <span>📋 Questions: <strong>30 Parts</strong></span>
              <span>⭐ Marks: <strong>100</strong></span>
              <span>🚫 Calculators: <strong>Strictly Prohibited</strong></span>
            </div>
          </div>
          <button type="button" id="btn-start-challenge" style="min-height:${HIT_TARGET_PRIMARY_PX}px;min-width:240px;padding:16px 28px;background:#0284c7;color:white;border:none;border-radius:8px;cursor:pointer;font-weight:800;font-size:1.15rem;box-shadow:0 2px 4px rgba(0,0,0,0.2);transition:background 0.2s;">
            Start Timed Paper A →
          </button>
        </div>

        <!-- Historical Format Evolution & Structure Notice -->
        <div style="background:#f8fafc;border:1px solid #cbd5e1;border-radius:12px;padding:1.5rem;">
          <h3 style="margin:0 0 0.75rem;font-size:1.25rem;color:#0f172a;font-weight:700;">Official Examination Rules &amp; Historical Format Evolution</h3>
          <p style="color:#475569;font-size:0.95rem;line-height:1.5;margin:0 0 1rem;">
            IOQM questions do not follow a single static template across history. HBCSE and MTA have updated section distributions over time:
          </p>
          <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(min(100%, 280px), 1fr));gap:1rem;">
            <div style="background:#ffffff;border:1px solid #e2e8f0;border-radius:8px;padding:1rem;">
              <strong style="color:#0284c7;display:block;margin-bottom:4px;">2024–2025 Format (Current)</strong>
              <div style="font-size:0.9rem;color:#334155;">30 Questions · 100 Marks · 3 Hours</div>
              <ul style="margin:6px 0 0;padding-left:1.25rem;font-size:0.85rem;color:#64748b;">
                <li>Section A: 10 questions × 2 marks = 20 pts</li>
                <li>Section B: 10 questions × 3 marks = 30 pts</li>
                <li>Section C: 10 questions × 5 marks = 50 pts</li>
              </ul>
            </div>
            <div style="background:#ffffff;border:1px solid #e2e8f0;border-radius:8px;padding:1rem;">
              <strong style="color:#0284c7;display:block;margin-bottom:4px;">2020–2021 Format</strong>
              <div style="font-size:0.9rem;color:#334155;">30 Questions · 100 Marks · 3 Hours</div>
              <ul style="margin:6px 0 0;padding-left:1.25rem;font-size:0.85rem;color:#64748b;">
                <li>Section A: 8 questions × 2 marks = 16 pts</li>
                <li>Section B: 13 questions × 3 marks = 39 pts</li>
                <li>Section C: 9 questions × 5 marks = 45 pts</li>
              </ul>
            </div>
            <div style="background:#ffffff;border:1px solid #e2e8f0;border-radius:8px;padding:1rem;">
              <strong style="color:#0284c7;display:block;margin-bottom:4px;">2022 Format (PRMO Hybrid)</strong>
              <div style="font-size:0.9rem;color:#334155;">24 Questions · 100 Marks · 3 Hours</div>
              <ul style="margin:6px 0 0;padding-left:1.25rem;font-size:0.85rem;color:#64748b;">
                <li>10 questions × 2 marks = 20 pts</li>
                <li>12 questions × 5 marks = 60 pts</li>
                <li>2 questions × 10 marks = 20 pts</li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Historical Paper Archive (Honest HOLD Status) -->
        <div style="background:#ffffff;border:1px solid #cbd5e1;border-radius:12px;padding:1.5rem;">
          <h3 style="margin:0 0 0.5rem;font-size:1.25rem;color:#0f172a;font-weight:700;">Historical Paper Archive (2020–2024)</h3>
          <p style="color:#64748b;font-size:0.95rem;margin:0 0 1rem;">
            Original past examination papers are catalogued under <strong>HOLD</strong> pending question-level source custody, diagram digitization, and independent academic ratification.
          </p>
          <div style="display:flex;flex-wrap:wrap;gap:10px;">
            ${[2024, 2023, 2022, 2021, 2020].map(yr => `
              <div style="border:1px solid #cbd5e1;border-radius:8px;padding:10px 16px;background:#f8fafc;display:flex;align-items:center;gap:10px;">
                <span style="font-weight:700;color:#0f172a;">${yr} Past Paper</span>
                <span style="font-size:0.75rem;font-weight:800;background:#fee2e2;color:#991b1b;padding:2px 6px;border-radius:4px;">HOLD</span>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Syllabus Breakdown Tabs -->
        <div style="background:#ffffff;border:1px solid #cbd5e1;border-radius:12px;padding:1.5rem;">
          <h3 style="margin:0 0 1rem;font-size:1.25rem;color:#0f172a;font-weight:700;">Curriculum &amp; Syllabus Coverage</h3>
          
          <div style="display:flex;gap:8px;border-bottom:2px solid #e2e8f0;padding-bottom:8px;margin-bottom:1rem;flex-wrap:wrap;" role="tablist">
            <button type="button" class="syl-tab-btn" data-syl="algebra" style="min-height:${HIT_TARGET_MIN_PX}px;padding:8px 16px;background:${state.activeSyllabusTab === 'algebra' ? '#0284c7' : '#f1f5f9'};color:${state.activeSyllabusTab === 'algebra' ? '#ffffff' : '#0f172a'};border:none;border-radius:6px;cursor:pointer;font-weight:700;">Algebra &amp; Polynomials</button>
            <button type="button" class="syl-tab-btn" data-syl="geometry" style="min-height:${HIT_TARGET_MIN_PX}px;padding:8px 16px;background:${state.activeSyllabusTab === 'geometry' ? '#0284c7' : '#f1f5f9'};color:${state.activeSyllabusTab === 'geometry' ? '#ffffff' : '#0f172a'};border:none;border-radius:6px;cursor:pointer;font-weight:700;">Euclidean Geometry</button>
            <button type="button" class="syl-tab-btn" data-syl="number-theory" style="min-height:${HIT_TARGET_MIN_PX}px;padding:8px 16px;background:${state.activeSyllabusTab === 'number-theory' ? '#0284c7' : '#f1f5f9'};color:${state.activeSyllabusTab === 'number-theory' ? '#ffffff' : '#0f172a'};border:none;border-radius:6px;cursor:pointer;font-weight:700;">Number Theory</button>
            <button type="button" class="syl-tab-btn" data-syl="combinatorics" style="min-height:${HIT_TARGET_MIN_PX}px;padding:8px 16px;background:${state.activeSyllabusTab === 'combinatorics' ? '#0284c7' : '#f1f5f9'};color:${state.activeSyllabusTab === 'combinatorics' ? '#ffffff' : '#0f172a'};border:none;border-radius:6px;cursor:pointer;font-weight:700;">Combinatorics</button>
          </div>

          <div style="font-size:0.95rem;color:#334155;line-height:1.6;">
            ${state.activeSyllabusTab === 'algebra' ? `
              <p><strong>Core Topics:</strong> Factorisation, Vieta's formulas for quadratics and cubics, symmetric polynomials, roots of unity, inequalities (AM-GM, Cauchy-Schwarz), functional equations on integers.</p>
              <p>Mapped to topic: <a href="#/subject/mathematics/topic/polynomials" style="color:#0284c7;font-weight:600;text-decoration:none;">Theory of Equations &amp; Polynomials →</a></p>
            ` : state.activeSyllabusTab === 'geometry' ? `
              <p><strong>Core Topics:</strong> Inscribed angles, cyclic quadrilaterals, tangents, Ptolemy's theorem, power of a point, radical axis, orthocenter and circumcircle reflections, Menelaus and Ceva theorems.</p>
              <p>Mapped to topic: <a href="#/subject/mathematics/topic/euclid-geometry" style="color:#0284c7;font-weight:600;text-decoration:none;">Euclid's Geometry &amp; Circles →</a></p>
            ` : state.activeSyllabusTab === 'number-theory' ? `
              <p><strong>Core Topics:</strong> Divisibility, Euclidean algorithm, prime numbers, modular arithmetic, Chinese Remainder Theorem, Fermat's Little Theorem, Euler's totient function, Diophantine equations.</p>
            ` : `
              <p><strong>Core Topics:</strong> Pigeonhole Principle, permutations and combinations, inclusion-exclusion principle, bijections, double counting, recurrence relations, invariants and semi-invariants.</p>
            `}
          </div>
        </div>

      </div>
    `;

    bindEvents();
  };

  const bindEvents = () => {
    root.querySelector<HTMLButtonElement>('#btn-back-home')?.addEventListener('click', () => {
      if (onNavigate) onNavigate('/home');
      else window.location.hash = '#/home';
    });

    root.querySelector<HTMLButtonElement>('#btn-start-challenge')?.addEventListener('click', () => {
      if (onNavigate) onNavigate('/practice/ioqm-challenge-a');
      else window.location.hash = '#/practice/ioqm-challenge-a';
    });

    root.querySelectorAll<HTMLButtonElement>('.syl-tab-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const syl = btn.dataset.syl;
        if (syl) {
          controller.setSyllabusTab(syl);
          render();
        }
      });
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
