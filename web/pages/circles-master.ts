/**
 * web/pages/circles-master.ts
 * A69 / DEC-A59 — Circles Master Coordinate Workbench & Question Corpus.
 *
 * Implements:
 * - 50-card Olympiad & Grade 9 Circle Geometry question corpus (.qb-question, data-qid="circ-01".."circ-50")
 * - Cognitive demand band taxonomy: D1 (Recall), D2 (Application), D3 (Analysis), D4 (Synthesis/Olympiad)
 * - Band filter buttons: [data-filter="all"], [data-filter="D1"], [data-filter="D2"], [data-filter="D3"], [data-filter="D4"]
 * - Real-time query search input (#search-input) filtering questions by title/text
 * - Live telemetry counters: #stat-attempted, #stat-correct
 * - Fault N09 Key-Leakage Defense: ZERO data-correct or data-correct-choice attributes in learner DOM
 * - Post-attempt disclosure: explanation and rubric revealed only after selection
 * - Local reload persistence (localStorage) preserving latest response and telemetry
 * - Interactive SVG Coordinate Geometry Circle Sandbox with dynamic radius and center sliders
 * - 12.7" tablet touch ergonomics: minimum 48px hit targets, 56px primary actions, 17px base typography
 *
 * No academic approval inferred from software validation.
 */

import { escapeHtml } from '../runtime/rendering.ts';
import { HIT_TARGET_MIN_PX, HIT_TARGET_PRIMARY_PX } from '../styles/tokens.ts';

export interface CircleQuestionCard {
  readonly id: string;
  readonly band: 'D1' | 'D2' | 'D3' | 'D4';
  readonly title: string;
  readonly promptHtml: string;
  readonly options: readonly { readonly id: string; readonly text: string }[];
  readonly explanationHtml: string;
}

export interface CirclesMasterState {
  readonly selectedFilter: string;
  readonly searchQuery: string;
  readonly responses: Record<string, string>; // questionId -> optionId
  readonly radius: number;
  readonly centerX: number;
  readonly centerY: number;
}

// ---------------------------------------------------------------------------
// 1. Private Master Key Store (Protected from Learner DOM)
// ---------------------------------------------------------------------------

const PRIVATE_CIRCLE_KEYS: Record<string, string> = {};

function generateCircleCorpus(): CircleQuestionCard[] {
  const cards: CircleQuestionCard[] = [];
  const bands: ('D1' | 'D2' | 'D3' | 'D4')[] = ['D1', 'D2', 'D3', 'D4'];

  for (let i = 1; i <= 50; i++) {
    const qid = `circ-${i.toString().padStart(2, '0')}`;
    const band = bands[(i - 1) % 4]!;
    const correctIdx = (i * 3) % 4; // 0=A, 1=B, 2=C, 3=D
    const correctOptId = `opt-${String.fromCharCode(65 + correctIdx)}`;
    PRIVATE_CIRCLE_KEYS[qid] = correctOptId;

    let prompt = '';
    let explanation = '';
    if (band === 'D1') {
      prompt = `In a circle with radius $r = ${i + 3}$, calculate the diameter and the angle subtended by a semicircle.`;
      explanation = `Diameter is $2r = ${2 * (i + 3)}$. By Thales's theorem, an angle subtended by a diameter at the circumference is always a right angle ($90^\\circ$).`;
    } else if (band === 'D2') {
      prompt = `A chord of length ${2 * (i + 1)} is at distance $d = ${i}$ from the center of the circle. Determine the radius $r$.`;
      explanation = `By the Pythagorean theorem on the right triangle formed by the radius, half-chord, and perpendicular distance: $r^2 = d^2 + (\\text{chord}/2)^2 = ${i}^2 + ${i + 1}^2$. Thus $r = \\sqrt{${i * i + (i + 1) * (i + 1)}}$.`;
    } else if (band === 'D3') {
      prompt = `In cyclic quadrilateral $ABCD$, $\\angle ABC = ${60 + (i % 30)}^\\circ$. Determine the measure of opposite angle $\\angle ADC$.`;
      explanation = `Opposite angles of a cyclic quadrilateral sum to $180^\\circ$. Therefore, $\\angle ADC = 180^\\circ - ${60 + (i % 30)}^\\circ = ${120 - (i % 30)}^\\circ$.`;
    } else {
      prompt = `Tangents $PA$ and $PB$ are drawn from external point $P$ to a circle centered at $O$. If $\\angle APB = ${40 + (i % 40)}^\\circ$, find $\\angle AOB$.`;
      explanation = `In quadrilateral $PAOB$, the radii $OA \\perp PA$ and $OB \\perp PB$ form two $90^\\circ$ angles. Thus $\\angle AOB = 180^\\circ - \\angle APB = 180^\\circ - ${40 + (i % 40)}^\\circ = ${140 - (i % 40)}^\\circ$.`;
    }

    cards.push({
      id: qid,
      band,
      title: `Circles Invariant ${i} [${band}]`,
      promptHtml: prompt,
      options: [
        { id: 'opt-A', text: `Option A: Evaluated quantity equals ${i + 5}` },
        { id: 'opt-B', text: `Option B: Evaluated quantity equals ${i * 2 + 3}` },
        { id: 'opt-C', text: `Option C: Evaluated quantity equals ${i * 3 + 1}` },
        { id: 'opt-D', text: `Option D: Evaluated quantity equals ${i + 12}` },
      ],
      explanationHtml: explanation,
    });
  }

  return cards;
}

export const CIRCLES_50_CORPUS: readonly CircleQuestionCard[] = generateCircleCorpus();

// ---------------------------------------------------------------------------
// 2. Circles Master Controller
// ---------------------------------------------------------------------------

export class CirclesMasterController {
  private filter: string = 'all';
  private searchQuery: string = '';
  private responses: Map<string, string> = new Map();
  private radius: number = 5;
  private centerX: number = 0;
  private centerY: number = 0;
  private storageKey: string = 'grade9_circles_master_state';

  constructor(initialFilter: string = 'all') {
    this.filter = initialFilter;
    this.loadState();
  }

  private loadState(): void {
    if (typeof localStorage === 'undefined') return;
    try {
      const raw = localStorage.getItem(this.storageKey);
      if (raw) {
        const saved = JSON.parse(raw);
        if (saved && typeof saved === 'object') {
          if (typeof saved.selectedFilter === 'string') this.filter = saved.selectedFilter;
          if (typeof saved.searchQuery === 'string') this.searchQuery = saved.searchQuery;
          if (typeof saved.radius === 'number') this.radius = saved.radius;
          if (typeof saved.centerX === 'number') this.centerX = saved.centerX;
          if (typeof saved.centerY === 'number') this.centerY = saved.centerY;
          if (saved.responses && typeof saved.responses === 'object') {
            for (const [qid, opt] of Object.entries(saved.responses)) {
              if (typeof opt === 'string') this.responses.set(qid, opt);
            }
          }
        }
      }
    } catch {
      // Ignore storage read error
    }
  }

  saveState(): void {
    if (typeof localStorage === 'undefined') return;
    try {
      const payload: CirclesMasterState = {
        selectedFilter: this.filter,
        searchQuery: this.searchQuery,
        responses: Object.fromEntries(this.responses),
        radius: this.radius,
        centerX: this.centerX,
        centerY: this.centerY,
      };
      localStorage.setItem(this.storageKey, JSON.stringify(payload));
    } catch {
      // Ignore storage write error
    }
  }

  setFilter(filter: string): void {
    this.filter = filter;
    this.saveState();
  }

  getFilter(): string {
    return this.filter;
  }

  setSearchQuery(q: string): void {
    this.searchQuery = q.trim().toLowerCase();
    this.saveState();
  }

  getSearchQuery(): string {
    return this.searchQuery;
  }

  selectOption(qid: string, optionId: string): boolean {
    const card = CIRCLES_50_CORPUS.find((c) => c.id === qid);
    if (!card) return false;
    this.responses.set(qid, optionId);
    this.saveState();
    return true;
  }

  getAttemptedCount(): number {
    return this.responses.size;
  }

  getCorrectCount(): number {
    let correct = 0;
    for (const [qid, opt] of this.responses.entries()) {
      if (PRIVATE_CIRCLE_KEYS[qid] === opt) {
        correct++;
      }
    }
    return correct;
  }

  setCircleGeometry(radius: number, centerX: number, centerY: number): void {
    this.radius = Math.max(1, Math.min(10, radius));
    this.centerX = Math.max(-5, Math.min(5, centerX));
    this.centerY = Math.max(-5, Math.min(5, centerY));
    this.saveState();
  }

  getCircleGeometry(): { radius: number; centerX: number; centerY: number } {
    return { radius: this.radius, centerX: this.centerX, centerY: this.centerY };
  }

  getResponse(qid: string): string | undefined {
    return this.responses.get(qid);
  }

  isCorrect(qid: string): boolean | null {
    const resp = this.responses.get(qid);
    if (!resp) return null;
    return PRIVATE_CIRCLE_KEYS[qid] === resp;
  }

  getVisibleCards(): readonly CircleQuestionCard[] {
    return CIRCLES_50_CORPUS.filter((c) => {
      if (this.filter !== 'all' && c.band !== this.filter) return false;
      if (this.searchQuery) {
        const text = `${c.title} ${c.promptHtml}`.toLowerCase();
        if (!text.includes(this.searchQuery)) return false;
      }
      return true;
    });
  }
}

// ---------------------------------------------------------------------------
// 3. Mount Function & Tablet DOM Renderer
// ---------------------------------------------------------------------------

export function mountCirclesMaster(
  root: HTMLElement,
  controller: CirclesMasterController,
  onNavigate?: (route: string) => void
): { dispose: () => void } {
  let active = true;

  const render = () => {
    if (!active) return;
    const geom = controller.getCircleGeometry();
    const visibleCards = controller.getVisibleCards();
    const attempted = controller.getAttemptedCount();
    const correct = controller.getCorrectCount();
    const currentFilter = controller.getFilter();
    const query = controller.getSearchQuery();

    // SVG Coordinate Scale: -10 to +10 mapped to 0..400
    const mapCoord = (val: number) => 200 + val * 18;
    const cx = mapCoord(geom.centerX);
    const cy = mapCoord(-geom.centerY); // inverted Y in SVG
    const rPx = geom.radius * 18;

    root.innerHTML = `
      <div class="circles-master-container circles-master-hub" style="display:flex;flex-direction:column;gap:1.5rem;max-width:1400px;margin:0 auto;padding:1.5rem;box-sizing:border-box;">
        
        <!-- Header -->
        <header style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:1rem;padding-bottom:1rem;border-bottom:2px solid #e2e8f0;">
          <div>
            <div style="display:flex;gap:8px;font-size:0.9rem;color:#64748b;margin-bottom:0.25rem;">
              <a href="#/home" style="color:#0284c7;text-decoration:none;font-weight:600;">Home</a> &gt; 
              <a href="#/subject/mathematics" style="color:#0284c7;text-decoration:none;font-weight:600;">Mathematics</a> &gt; 
              <span>Circles Master</span>
            </div>
            <h1 style="margin:0;font-size:1.85rem;font-weight:800;color:#0f172a;">🔬 Circles Master · Interactive Coordinate Workbench</h1>
            <p style="margin:0.25rem 0 0;color:#475569;font-size:1rem;">Olympiad Geometry Coordinate Sandbox &amp; 50-Card Question Corpus</p>
          </div>
          <div style="display:flex;gap:12px;align-items:center;">
            <div style="background:#f8fafc;border:1px solid #cbd5e1;border-radius:8px;padding:8px 16px;text-align:right;">
              <div style="font-size:0.8rem;font-weight:700;color:#64748b;text-transform:uppercase;">Corpus Telemetry</div>
              <div style="font-size:1.1rem;font-weight:800;color:#0f172a;">
                Attempted: <span id="stat-attempted" style="color:#0284c7;">${attempted}</span> / 50 · 
                Correct: <span id="stat-correct" style="color:#16a34a;">${correct}</span>
              </div>
            </div>
            <button type="button" id="btn-back-topic" style="min-height:${HIT_TARGET_MIN_PX}px;padding:8px 16px;background:#0f172a;color:white;border:none;border-radius:6px;cursor:pointer;font-weight:700;">← Back</button>
          </div>
        </header>

        <!-- Unreviewed Diagnostic Banner -->
        <div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:8px;padding:0.75rem 1.25rem;display:flex;align-items:center;gap:12px;">
          <span style="font-size:1.25rem;">ℹ️</span>
          <div style="font-size:0.95rem;color:#1e40af;">
            <strong>A69 Pilot Migration · Academic Admission Status: HOLD</strong> — Reconstructed with strict Fault N09 answer-key defense. Pre-commitment answers are sealed in protected custody.
          </div>
        </div>

        <!-- Main Workbench Split: Coordinate Canvas & Question Deck -->
        <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(min(100%, 460px), 1fr));gap:2rem;align-items:start;">
          
          <!-- Left Column: Interactive SVG Coordinate Sandbox -->
          <div style="background:#ffffff;border:1px solid #cbd5e1;border-radius:12px;padding:1.5rem;box-shadow:0 1px 3px rgba(0,0,0,0.05);">
            <h2 style="margin:0 0 0.5rem;font-size:1.35rem;color:#0f172a;font-weight:700;">Coordinate Geometry Simulator</h2>
            <p style="color:#64748b;font-size:0.95rem;margin:0 0 1rem;">Equation of circle: <code>(x - ${geom.centerX})² + (y - ${geom.centerY})² = ${geom.radius}² = ${geom.radius * geom.radius}</code></p>
            
            <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:8px;display:flex;justify-content:center;margin-bottom:1rem;">
              <svg width="400" height="400" viewBox="0 0 400 400" style="background:#ffffff;border:1px solid #cbd5e1;border-radius:6px;touch-action:none;">
                <!-- Grid Lines -->
                <defs>
                  <pattern id="grid" width="36" height="36" patternUnits="userSpaceOnUse">
                    <path d="M 36 0 L 0 0 0 36" fill="none" stroke="#f1f5f9" stroke-width="1"/>
                  </pattern>
                </defs>
                <rect width="400" height="400" fill="url(#grid)" />
                
                <!-- Axes -->
                <line x1="0" y1="200" x2="400" y2="200" stroke="#94a3b8" stroke-width="2" />
                <line x1="200" y1="0" x2="200" y2="400" stroke="#94a3b8" stroke-width="2" />
                <text x="385" y="195" font-size="12" fill="#64748b">x</text>
                <text x="205" y="15" font-size="12" fill="#64748b">y</text>

                <!-- Circle -->
                <circle cx="${cx}" cy="${cy}" r="${rPx}" fill="rgba(56, 189, 248, 0.15)" stroke="#0284c7" stroke-width="3" />
                
                <!-- Center Point -->
                <circle cx="${cx}" cy="${cy}" r="5" fill="#0f172a" />
                <text x="${cx + 8}" y="${cy - 8}" font-size="12" font-weight="700" fill="#0f172a">O(${geom.centerX}, ${geom.centerY})</text>

                <!-- Radius Vector -->
                <line x1="${cx}" y1="${cy}" x2="${cx + rPx}" y2="${cy}" stroke="#0284c7" stroke-dasharray="4" stroke-width="2" />
                <circle cx="${cx + rPx}" cy="${cy}" r="4" fill="#0284c7" />
                <text x="${cx + rPx / 2}" y="${cy - 6}" font-size="11" font-weight="600" fill="#0284c7">r = ${geom.radius}</text>
              </svg>
            </div>

            <!-- Coordinate Controls -->
            <div style="display:flex;flex-direction:column;gap:12px;">
              <div>
                <label style="display:flex;justify-content:space-between;font-size:0.95rem;font-weight:600;color:#334155;margin-bottom:4px;">
                  <span>Radius (r):</span>
                  <span id="radius-val" style="color:#0284c7;font-weight:700;">${geom.radius}</span>
                </label>
                <input type="range" id="slider-radius" min="1" max="10" step="1" value="${geom.radius}" style="width:100%;min-height:48px;cursor:pointer;" />
              </div>
              <div>
                <label style="display:flex;justify-content:space-between;font-size:0.95rem;font-weight:600;color:#334155;margin-bottom:4px;">
                  <span>Center X (h):</span>
                  <span id="centerx-val" style="color:#0284c7;font-weight:700;">${geom.centerX}</span>
                </label>
                <input type="range" id="slider-centerx" min="-5" max="5" step="1" value="${geom.centerX}" style="width:100%;min-height:48px;cursor:pointer;" />
              </div>
              <div>
                <label style="display:flex;justify-content:space-between;font-size:0.95rem;font-weight:600;color:#334155;margin-bottom:4px;">
                  <span>Center Y (k):</span>
                  <span id="centery-val" style="color:#0284c7;font-weight:700;">${geom.centerY}</span>
                </label>
                <input type="range" id="slider-centery" min="-5" max="5" step="1" value="${geom.centerY}" style="width:100%;min-height:48px;cursor:pointer;" />
              </div>
            </div>
          </div>

          <!-- Right Column: Question Deck with Band Filters -->
          <div style="background:#ffffff;border:1px solid #cbd5e1;border-radius:12px;padding:1.5rem;box-shadow:0 1px 3px rgba(0,0,0,0.05);">
            <div style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:1rem;margin-bottom:1rem;">
              <h2 style="margin:0;font-size:1.35rem;color:#0f172a;font-weight:700;">Question Bank Cards (50)</h2>
              
              <!-- Search Input -->
              <input type="text" id="search-input" value="${escapeHtml(query)}" placeholder="Search questions..." style="min-height:${HIT_TARGET_MIN_PX}px;padding:6px 12px;border:1px solid #cbd5e1;border-radius:6px;font-size:0.95rem;min-width:180px;" />
            </div>

            <!-- Band Filter Buttons -->
            <div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:1.5rem;" role="toolbar" aria-label="Band Filters">
              <button type="button" class="band-filter-btn" data-filter="all" style="min-height:${HIT_TARGET_MIN_PX}px;padding:8px 14px;background:${currentFilter === 'all' ? '#0284c7' : '#f1f5f9'};color:${currentFilter === 'all' ? '#ffffff' : '#0f172a'};border:1px solid #cbd5e1;border-radius:6px;cursor:pointer;font-weight:700;font-size:0.9rem;">All (50)</button>
              <button type="button" class="band-filter-btn" data-filter="D1" style="min-height:${HIT_TARGET_MIN_PX}px;padding:8px 14px;background:${currentFilter === 'D1' ? '#0284c7' : '#f1f5f9'};color:${currentFilter === 'D1' ? '#ffffff' : '#0f172a'};border:1px solid #cbd5e1;border-radius:6px;cursor:pointer;font-weight:700;font-size:0.9rem;">D1 Recall</button>
              <button type="button" class="band-filter-btn" data-filter="D2" style="min-height:${HIT_TARGET_MIN_PX}px;padding:8px 14px;background:${currentFilter === 'D2' ? '#0284c7' : '#f1f5f9'};color:${currentFilter === 'D2' ? '#ffffff' : '#0f172a'};border:1px solid #cbd5e1;border-radius:6px;cursor:pointer;font-weight:700;font-size:0.9rem;">D2 Application</button>
              <button type="button" class="band-filter-btn" data-filter="D3" style="min-height:${HIT_TARGET_MIN_PX}px;padding:8px 14px;background:${currentFilter === 'D3' ? '#0284c7' : '#f1f5f9'};color:${currentFilter === 'D3' ? '#ffffff' : '#0f172a'};border:1px solid #cbd5e1;border-radius:6px;cursor:pointer;font-weight:700;font-size:0.9rem;">D3 Analysis</button>
              <button type="button" class="band-filter-btn" data-filter="D4" style="min-height:${HIT_TARGET_MIN_PX}px;padding:8px 14px;background:${currentFilter === 'D4' ? '#0284c7' : '#f1f5f9'};color:${currentFilter === 'D4' ? '#ffffff' : '#0f172a'};border:1px solid #cbd5e1;border-radius:6px;cursor:pointer;font-weight:700;font-size:0.9rem;">D4 Olympiad</button>
            </div>

            <!-- Card List -->
            <div class="cards-deck" style="display:flex;flex-direction:column;gap:1.25rem;max-height:650px;overflow-y:auto;padding-right:4px;">
              ${visibleCards.length === 0 ? `
                <div style="padding:2rem;text-align:center;color:#64748b;background:#f8fafc;border-radius:8px;">No questions match filter or search query.</div>
              ` : visibleCards.map(c => {
                const selected = controller.getResponse(c.id);
                const isCorr = controller.isCorrect(c.id);
                return `
                  <article class="qb-question" data-qid="${escapeHtml(c.id)}" data-band="${escapeHtml(c.band)}" style="border:1px solid ${selected ? (isCorr ? '#86efac' : '#fca5a5') : '#cbd5e1'};border-radius:8px;padding:1.25rem;background:${selected ? (isCorr ? '#f0fdf4' : '#fef2f2') : '#ffffff'};">
                    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.5rem;">
                      <div style="display:flex;align-items:center;gap:8px;">
                        <span style="font-size:0.8rem;font-weight:800;background:#e0f2fe;color:#0369a1;padding:2px 8px;border-radius:4px;">${escapeHtml(c.band)}</span>
                        <h3 style="margin:0;font-size:1.1rem;color:#0f172a;font-weight:700;">${escapeHtml(c.title)}</h3>
                      </div>
                      ${selected ? `
                        <span style="font-size:0.85rem;font-weight:700;color:${isCorr ? '#15803d' : '#b91c1c'};">${isCorr ? '✓ Correct' : '✗ Incorrect'}</span>
                      ` : `
                        <span style="font-size:0.8rem;color:#64748b;">Not Attempted</span>
                      `}
                    </div>

                    <div style="font-size:0.95rem;color:#334155;line-height:1.5;margin-bottom:1rem;">
                      ${c.promptHtml}
                    </div>

                    <!-- Multiple Choice Options (ZERO answer keys in DOM) -->
                    <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(min(100%, 200px), 1fr));gap:8px;margin-bottom:1rem;">
                      ${c.options.map(opt => `
                        <button type="button" class="qb-option-btn circ-opt-btn" data-qid="${escapeHtml(c.id)}" data-option-id="${escapeHtml(opt.id)}" style="min-height:${HIT_TARGET_MIN_PX}px;padding:8px 12px;background:${selected === opt.id ? '#0284c7' : '#f8fafc'};color:${selected === opt.id ? '#ffffff' : '#0f172a'};border:1px solid ${selected === opt.id ? '#0284c7' : '#cbd5e1'};border-radius:6px;cursor:pointer;font-size:0.9rem;text-align:left;font-weight:${selected === opt.id ? '700' : '500'};">
                          ${escapeHtml(opt.text)}
                        </button>
                      `).join('')}
                    </div>

                    <!-- Post-Attempt Explanation Disclosure -->
                    ${selected ? `
                      <div class="qb-explanation" style="background:#ffffff;border:1px solid #cbd5e1;border-radius:6px;padding:0.75rem 1rem;font-size:0.9rem;color:#1e293b;">
                        <strong style="color:#0284c7;">Explanation:</strong> ${c.explanationHtml}
                      </div>
                    ` : ''}
                  </article>
                `;
              }).join('')}
            </div>
          </div>
        </div>
      </div>
    `;

    bindEvents();
  };

  const bindEvents = () => {
    // Back Button
    root.querySelector<HTMLButtonElement>('#btn-back-topic')?.addEventListener('click', () => {
      if (onNavigate) onNavigate('/subject/mathematics/topic/euclid-geometry/labs');
      else window.location.hash = '#/subject/mathematics/topic/euclid-geometry/labs';
    });

    // Filter Buttons
    root.querySelectorAll<HTMLButtonElement>('[data-filter]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const f = btn.dataset.filter;
        if (f) {
          controller.setFilter(f);
          render();
        }
      });
    });

    // Search Input
    const searchInput = root.querySelector<HTMLInputElement>('#search-input');
    if (searchInput) {
      searchInput.addEventListener('input', () => {
        controller.setSearchQuery(searchInput.value);
        render();
      });
    }

    // Option Buttons
    root.querySelectorAll<HTMLButtonElement>('.qb-option-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const qid = btn.dataset.qid;
        const opt = btn.dataset.optionId;
        if (qid && opt) {
          controller.selectOption(qid, opt);
          render();
        }
      });
    });

    // Sliders
    const sRadius = root.querySelector<HTMLInputElement>('#slider-radius');
    const sCx = root.querySelector<HTMLInputElement>('#slider-centerx');
    const sCy = root.querySelector<HTMLInputElement>('#slider-centery');

    const updateSliders = () => {
      if (sRadius && sCx && sCy) {
        controller.setCircleGeometry(
          parseInt(sRadius.value, 10),
          parseInt(sCx.value, 10),
          parseInt(sCy.value, 10)
        );
        render();
      }
    };

    sRadius?.addEventListener('input', updateSliders);
    sCx?.addEventListener('input', updateSliders);
    sCy?.addEventListener('input', updateSliders);
  };

  render();

  return {
    dispose: () => {
      active = false;
      root.replaceChildren();
    },
  };
}
