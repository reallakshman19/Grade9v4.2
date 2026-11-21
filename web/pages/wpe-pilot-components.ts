/**
 * web/pages/wpe-pilot-components.ts
 * Authentic Pilot WPE Components from Grade9 v4.1 adopted into v4.2.
 *
 * Implements:
 * 1. Foundation Lesson (preview/physics-wpe.html):
 *    - Conservative forces & energy gradient F = -dU/dx
 *    - Interactive Harmonic Potential Well (m=1.0 kg, k=100 N/m, E=12.5 J)
 *    - Position slider x in [-0.50, +0.50] m, live readouts (U, K, v) & dynamic SVG
 *    - Work-Kinetic Energy Theorem & Conservation of Energy
 * 2. Attempt-First Practice (preview/practice.html):
 *    - Spring-mass energy release problem (m=0.5 kg, k=50 N/m, x=0.4 m)
 *    - 4 MCQ options with physical misconception distractors
 *    - Hint reveal panel, justification textarea (>= 10 chars), attempt locking
 *    - 4-step formal derivation reveal
 * 3. 5 Thinking Skills Interactive Runner (physics/wpe/learn-challenge.html):
 *    - work-sign, momentum-energy, energy-motion, potential-force, momentum-fragments
 *    - Dual-panel: Core 1A Guide + Core 1B Fresh Challenge
 *    - Diagnostic misconception feedback per distractor, 2-tier hints, transfer questions
 * 4. Authentic PH04 Curricular Units (nsejs/physics/ph04/units.v1.json):
 *    - Units W01–W05 with Vector SVGs, 3-tier progressions, worked anchors & practice tasks
 * 5. 13 Learning Pack Bridges Viewer (WPE_Source_to_Core1A_Concept/learning-bridge/):
 *    - Direct reference viewer for all 13 canonical concept bridges
 *
 * Zero IFRAMES — 100% Native TypeScript DOM.
 * All items on academic HOLD (Rule 13 compliant).
 * 12.7" Tablet Touch Ergonomics (>= 48px controls, >= 56px primary CTAs).
 */

import { HIT_TARGET_MIN_PX, HIT_TARGET_PRIMARY_PX } from '../styles/tokens.ts';
import { escapeHtml, renderMathHtml } from '../runtime/rendering.ts';
import {
  WPE_PILOT_FOUNDATION,
  WPE_PILOT_PRACTICE,
  WPE_PILOT_SKILLS,
  WPE_PILOT_PH04_UNITS,
  WPE_PILOT_LEARNING_PACKS
} from '../runtime/wpe-pilot-data.generated.ts';

// ============================================================================
// 1. Foundation Lesson Component
// ============================================================================

export function mountWpeFoundationLesson(
  container: HTMLElement,
  onNavigate?: (route: string) => void
): { dispose: () => void } {
  let posX = 0.0;
  const mass = WPE_PILOT_FOUNDATION.section2.mass;
  const k = WPE_PILOT_FOUNDATION.section2.k;
  const totalE = WPE_PILOT_FOUNDATION.section2.totalEnergy;

  const calculatePhysics = (x: number) => {
    const clampedX = Math.max(-0.5, Math.min(0.5, x));
    const u = 0.5 * k * clampedX * clampedX;
    const kE = Math.max(0, totalE - u);
    const v = Math.sqrt((2 * kE) / mass);
    return { x: clampedX, u, kE, v };
  };

  const renderSvgGraph = (currX: number, u: number) => {
    // Coordinate transform: x in [-0.6, 0.6] -> SVG X [40, 460], U in [0, 15] -> SVG Y [180, 20]
    const toSvgX = (x: number) => 40 + ((x + 0.6) / 1.2) * 420;
    const toSvgY = (energy: number) => 180 - (energy / 15.0) * 160;

    let pathD = '';
    for (let xVal = -0.55; xVal <= 0.55; xVal += 0.02) {
      const uVal = 0.5 * k * xVal * xVal;
      const sx = toSvgX(xVal);
      const sy = toSvgY(uVal);
      pathD += (pathD === '' ? `M ${sx.toFixed(1)} ${sy.toFixed(1)}` : ` L ${sx.toFixed(1)} ${sy.toFixed(1)}`);
    }

    const beadX = toSvgX(currX);
    const beadY = toSvgY(u);
    const eLineY = toSvgY(totalE);
    const tp1X = toSvgX(-0.5);
    const tp2X = toSvgX(0.5);

    return `
      <svg viewBox="0 0 500 210" style="width:100%;max-width:540px;height:auto;background:#f8fafc;border:1px solid #cbd5e1;border-radius:8px;" role="img" aria-label="Harmonic potential well with bead at position ${currX.toFixed(2)} m">
        <!-- Grid & Axes -->
        <line x1="40" y1="180" x2="480" y2="180" stroke="#94a3b8" stroke-width="1.5" />
        <line x1="${toSvgX(0)}" y1="20" x2="${toSvgX(0)}" y2="185" stroke="#cbd5e1" stroke-dasharray="3 3" />
        
        <!-- Energy Line E = 12.5 J -->
        <line x1="40" y1="${eLineY}" x2="480" y2="${eLineY}" stroke="#dc2626" stroke-width="2" stroke-dasharray="4 4" />
        <text x="45" y="${eLineY - 6}" fill="#dc2626" font-size="11" font-weight="700">Total Energy E = 12.50 J</text>
        
        <!-- Turning points -->
        <line x1="${tp1X}" y1="20" x2="${tp1X}" y2="180" stroke="#e0e7ff" stroke-width="1.5" stroke-dasharray="2 2" />
        <line x1="${tp2X}" y1="20" x2="${tp2X}" y2="180" stroke="#e0e7ff" stroke-width="1.5" stroke-dasharray="2 2" />
        <text x="${tp1X - 25}" y="195" fill="#475569" font-size="10">-0.50 m (TP)</text>
        <text x="${tp2X - 25}" y="195" fill="#475569" font-size="10">+0.50 m (TP)</text>
        <text x="${toSvgX(0) - 10}" y="195" fill="#475569" font-size="10">0.0 m</text>

        <!-- Potential Curve U(x) = 50x^2 -->
        <path d="${pathD}" fill="none" stroke="#0284c7" stroke-width="3" />
        
        <!-- Kinetic Energy fill under E line -->
        <rect x="40" y="200" width="440" height="6" fill="#e2e8f0" rx="3" />
        
        <!-- Current Bead -->
        <circle cx="${beadX}" cy="${beadY}" r="7" fill="#0f172a" stroke="#38bdf8" stroke-width="2.5" />
        <line x1="${beadX}" y1="${beadY}" x2="${beadX}" y2="180" stroke="#0f172a" stroke-width="1" stroke-dasharray="2 2" />
      </svg>
    `;
  };

  const updateView = () => {
    const { x, u, kE, v } = calculatePhysics(posX);
    const uPercent = ((u / totalE) * 100).toFixed(1);
    const kPercent = ((kE / totalE) * 100).toFixed(1);

    container.innerHTML = `
      <div class="g9-wpe-foundation" style="display:flex;flex-direction:column;gap:1.5rem;color:#0f172a;line-height:1.6;">
        <!-- Header Banner -->
        <div style="background:#f0f9ff;border:1px solid #bae6fd;border-radius:12px;padding:1.25rem;">
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:0.5rem;flex-wrap:wrap;">
            <span style="background:#0284c7;color:white;font-size:0.75rem;font-weight:800;padding:2px 8px;border-radius:4px;">PILOT WPE FOUNDATION</span>
            <span style="background:#fef3c7;color:#92400e;font-size:0.75rem;font-weight:800;padding:2px 8px;border-radius:4px;">ACADEMIC HOLD</span>
            <span style="background:#dcfce7;color:#166534;font-size:0.75rem;font-weight:800;padding:2px 8px;border-radius:4px;">ZERO IFRAMES</span>
          </div>
          <h2 style="margin:0 0 0.5rem;font-size:1.4rem;font-weight:800;color:#0369a1;">${escapeHtml(WPE_PILOT_FOUNDATION.title)}</h2>
          <p style="margin:0;font-size:0.95rem;color:#334155;">
            Master conservative forces, potential energy gradients, and kinetic energy exchange in a frictionless harmonic oscillator.
          </p>
        </div>

        <!-- Section 1: Conservative Forces & Potential Gradient -->
        <div style="background:#ffffff;border:1px solid #cbd5e1;border-radius:10px;padding:1.5rem;box-shadow:0 1px 3px rgba(0,0,0,0.05);">
          <h3 style="margin:0 0 0.75rem;font-size:1.2rem;font-weight:700;color:#0f172a;">${escapeHtml(WPE_PILOT_FOUNDATION.section1.title)}</h3>
          <p style="margin:0 0 1rem;font-size:0.95rem;color:#334155;">
            ${escapeHtml(WPE_PILOT_FOUNDATION.section1.summary)}
          </p>
          <div style="background:#f8fafc;border-left:4px solid #0284c7;padding:1rem;margin-bottom:1rem;font-family:monospace;font-size:1.05rem;">
            ${WPE_PILOT_FOUNDATION.section1.equations.map(eq => `<div style="margin:0.25rem 0;"><strong>${escapeHtml(eq)}</strong></div>`).join('')}
          </div>
          <p style="margin:0;font-size:0.9rem;color:#475569;">
            ${escapeHtml(WPE_PILOT_FOUNDATION.section1.notes)}
          </p>
        </div>

        <!-- Section 2: Interactive Harmonic Well Simulation -->
        <div style="background:#ffffff;border:1px solid #cbd5e1;border-radius:10px;padding:1.5rem;box-shadow:0 1px 3px rgba(0,0,0,0.05);">
          <h3 style="margin:0 0 0.75rem;font-size:1.2rem;font-weight:700;color:#0f172a;">${escapeHtml(WPE_PILOT_FOUNDATION.section2.title)}</h3>
          <p style="margin:0 0 1.25rem;font-size:0.95rem;color:#334155;">
            ${escapeHtml(WPE_PILOT_FOUNDATION.section2.summary)}
          </p>

          <!-- Interactive Slider & Diagram Grid -->
          <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(320px, 1fr));gap:1.5rem;align-items:center;">
            <!-- Controls & Readouts -->
            <div>
              <label for="wpe-foundation-slider" style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.75rem;font-weight:700;font-size:1rem;">
                <span>Displacement x:</span>
                <span id="slider-x-readout" style="background:#e0f2fe;color:#0369a1;padding:4px 10px;border-radius:6px;font-family:monospace;font-size:1.1rem;">
                  ${x >= 0 ? '+' : ''}${x.toFixed(2)} m
                </span>
              </label>
              
              <input 
                type="range" 
                id="wpe-foundation-slider" 
                min="-0.50" 
                max="0.50" 
                step="0.01" 
                value="${x.toFixed(2)}" 
                style="width:100%;min-height:${HIT_TARGET_MIN_PX}px;cursor:pointer;accent-color:#0284c7;margin-bottom:1.25rem;"
                aria-label="Displacement slider"
              />

              <!-- Live Readout Cards -->
              <div style="display:grid;grid-template-columns:repeat(3, 1fr);gap:8px;margin-bottom:1rem;">
                <div style="background:#f0f9ff;border:1px solid #bae6fd;border-radius:8px;padding:10px;text-align:center;">
                  <span style="font-size:0.75rem;color:#0369a1;font-weight:700;display:block;">POTENTIAL U(x)</span>
                  <strong style="font-size:1.2rem;color:#0284c7;display:block;margin-top:2px;">${u.toFixed(2)} J</strong>
                  <span style="font-size:0.75rem;color:#64748b;">${uPercent}%</span>
                </div>
                <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:8px;padding:10px;text-align:center;">
                  <span style="font-size:0.75rem;color:#166534;font-weight:700;display:block;">KINETIC K(x)</span>
                  <strong style="font-size:1.2rem;color:#16a34a;display:block;margin-top:2px;">${kE.toFixed(2)} J</strong>
                  <span style="font-size:0.75rem;color:#64748b;">${kPercent}%</span>
                </div>
                <div style="background:#faf5ff;border:1px solid #e9d5ff;border-radius:8px;padding:10px;text-align:center;">
                  <span style="font-size:0.75rem;color:#6b21a8;font-weight:700;display:block;">SPEED v(x)</span>
                  <strong style="font-size:1.2rem;color:#9333ea;display:block;margin-top:2px;">${v.toFixed(2)} m/s</strong>
                  <span style="font-size:0.75rem;color:#64748b;">at x = ${x.toFixed(2)}</span>
                </div>
              </div>

              <!-- Energy Distribution Stacked Bar -->
              <div style="margin-bottom:0.75rem;">
                <div style="display:flex;justify-content:space-between;font-size:0.8rem;color:#64748b;margin-bottom:4px;">
                  <span>Potential: ${uPercent}%</span>
                  <span>Kinetic: ${kPercent}%</span>
                </div>
                <div style="display:flex;height:12px;background:#e2e8f0;border-radius:6px;overflow:hidden;">
                  <div style="width:${uPercent}%;background:#0284c7;transition:width 0.05s ease;"></div>
                  <div style="width:${kPercent}%;background:#16a34a;transition:width 0.05s ease;"></div>
                </div>
              </div>
            </div>

            <!-- SVG Potential Graph -->
            <div style="display:flex;justify-content:center;align-items:center;">
              ${renderSvgGraph(x, u)}
            </div>
          </div>

          <!-- Notice banner -->
          <div style="background:#fffbeb;border:1px solid #fef3c7;border-radius:8px;padding:10px 14px;margin-top:1.25rem;font-size:0.875rem;color:#92400e;">
            <strong>Turning Point Invariant:</strong> At x = &plusmn;0.50 m, all energy is stored in spring tension (U = 12.50 J, K = 0 J, v = 0 m/s). The bead momentarily halts and reverses direction.
          </div>
        </div>

        <!-- Section 3: Work-Kinetic Energy Theorem -->
        <div style="background:#ffffff;border:1px solid #cbd5e1;border-radius:10px;padding:1.5rem;box-shadow:0 1px 3px rgba(0,0,0,0.05);">
          <h3 style="margin:0 0 0.75rem;font-size:1.2rem;font-weight:700;color:#0f172a;">${escapeHtml(WPE_PILOT_FOUNDATION.section3.title)}</h3>
          <p style="margin:0 0 1rem;font-size:0.95rem;color:#334155;">
            ${escapeHtml(WPE_PILOT_FOUNDATION.section3.summary)}
          </p>
          <div style="background:#f8fafc;border-left:4px solid #16a34a;padding:1rem;margin-bottom:1rem;font-family:monospace;font-size:1.05rem;">
            ${WPE_PILOT_FOUNDATION.section3.equations.map(eq => `<div style="margin:0.25rem 0;"><strong>${escapeHtml(eq)}</strong></div>`).join('')}
          </div>
          <p style="margin:0;font-size:0.9rem;color:#475569;">
            ${escapeHtml(WPE_PILOT_FOUNDATION.section3.notes)}
          </p>
        </div>

        <!-- Quick Navigation Footer -->
        <div style="display:flex;gap:12px;flex-wrap:wrap;padding:0.5rem 0;">
          <button type="button" id="btn-goto-practice" style="min-height:${HIT_TARGET_MIN_PX}px;padding:10px 20px;background:#0284c7;color:white;border:none;border-radius:8px;font-weight:700;cursor:pointer;">
            ✏️ Try Spring Practice Challenge &rarr;
          </button>
          <button type="button" id="btn-goto-skills" style="min-height:${HIT_TARGET_MIN_PX}px;padding:10px 20px;background:#0f172a;color:white;border:none;border-radius:8px;font-weight:700;cursor:pointer;">
            🧠 5 Thinking Skills (Learn &rarr; Challenge) &rarr;
          </button>
        </div>
      </div>
    `;

    // Bind slider
    const slider = container.querySelector<HTMLInputElement>('#wpe-foundation-slider');
    slider?.addEventListener('input', (e) => {
      posX = parseFloat((e.target as HTMLInputElement).value);
      updateView();
    });

    // Bind nav buttons
    container.querySelector('#btn-goto-practice')?.addEventListener('click', () => {
      const btn = document.querySelector<HTMLButtonElement>('button[data-subrole="PRACTICE"]');
      if (btn) btn.click();
    });
    container.querySelector('#btn-goto-skills')?.addEventListener('click', () => {
      const btn = document.querySelector<HTMLButtonElement>('button[data-subrole="THINKING_SKILLS"]');
      if (btn) btn.click();
    });
  };

  updateView();
  return { dispose: () => {} };
}

// ============================================================================
// 2. Attempt-First Practice Component
// ============================================================================

export function mountWpePracticeChallenge(
  container: HTMLElement,
  onNavigate?: (route: string) => void
): { dispose: () => void } {
  let selectedValue: string | null = null;
  let explanationText = '';
  let isAttemptRecorded = false;
  let isSolutionRevealed = false;
  let showHint = false;
  let validationError = '';

  const render = () => {
    container.innerHTML = `
      <div class="g9-wpe-practice-challenge" style="display:flex;flex-direction:column;gap:1.5rem;color:#0f172a;line-height:1.6;">
        <!-- Header Banner -->
        <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:1.25rem;">
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:0.5rem;flex-wrap:wrap;">
            <span style="background:#0284c7;color:white;font-size:0.75rem;font-weight:800;padding:2px 8px;border-radius:4px;">ATTEMPT-FIRST PRACTICE</span>
            <span style="background:#fef3c7;color:#92400e;font-size:0.75rem;font-weight:800;padding:2px 8px;border-radius:4px;">ACADEMIC HOLD</span>
          </div>
          <h2 style="margin:0 0 0.5rem;font-size:1.4rem;font-weight:800;color:#0f172a;">${escapeHtml(WPE_PILOT_PRACTICE.title)}</h2>
          <p style="margin:0;font-size:0.95rem;color:#475569;">
            Enforces pedagogical commitment: choose your answer and record your physical justification before checking the formal worked derivation.
          </p>
        </div>

        <!-- Problem Card -->
        <div style="background:#ffffff;border:1px solid #cbd5e1;border-radius:10px;padding:1.5rem;box-shadow:0 1px 3px rgba(0,0,0,0.05);">
          <h3 style="margin:0 0 0.75rem;font-size:1.15rem;font-weight:700;color:#0f172a;">Physical Scenario</h3>
          <p style="margin:0 0 1rem;font-size:0.95rem;color:#334155;">
            ${escapeHtml(WPE_PILOT_PRACTICE.scenario)}
          </p>
          <div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:8px;padding:1rem;margin-bottom:1rem;">
            <strong style="color:#1e40af;display:block;margin-bottom:0.25rem;">${escapeHtml(WPE_PILOT_PRACTICE.challengePrompt)}</strong>
            <div style="font-family:monospace;font-size:0.9rem;color:#1e3a8a;display:flex;gap:1.5rem;flex-wrap:wrap;margin-top:0.5rem;">
              <span><strong>${escapeHtml(WPE_PILOT_PRACTICE.initialState)}</strong></span>
              <span>&rarr;</span>
              <span><strong>${escapeHtml(WPE_PILOT_PRACTICE.finalState)}</strong></span>
            </div>
          </div>

          <!-- Multiple Choice Options -->
          <fieldset style="border:none;padding:0;margin:0 0 1.25rem;" ${isAttemptRecorded ? 'disabled' : ''}>
            <legend style="font-weight:700;font-size:1rem;color:#0f172a;margin-bottom:0.75rem;">1. Choose your answer:</legend>
            <div style="display:flex;flex-direction:column;gap:8px;">
              ${WPE_PILOT_PRACTICE.options.map(opt => `
                <label style="display:flex;align-items:center;gap:12px;min-height:${HIT_TARGET_MIN_PX}px;padding:10px 14px;background:${selectedValue === opt.value ? '#e0f2fe' : '#f8fafc'};border:1px solid ${selectedValue === opt.value ? '#0284c7' : '#cbd5e1'};border-radius:8px;cursor:${isAttemptRecorded ? 'default' : 'pointer'};">
                  <input type="radio" name="wpe-practice-opt" value="${opt.value}" ${selectedValue === opt.value ? 'checked' : ''} style="width:20px;height:20px;cursor:pointer;" />
                  <div>
                    <strong style="font-size:0.95rem;color:#0f172a;">${escapeHtml(opt.label)}</strong>
                    ${isAttemptRecorded ? `<div style="font-size:0.8rem;color:#64748b;margin-top:2px;">${escapeHtml(opt.misconception)}</div>` : ''}
                  </div>
                </label>
              `).join('')}
            </div>
          </fieldset>

          <!-- Hint Section -->
          <div style="margin-bottom:1.25rem;">
            <button type="button" id="btn-toggle-hint" style="min-height:${HIT_TARGET_MIN_PX}px;padding:6px 14px;background:#f1f5f9;color:#334155;border:1px solid #cbd5e1;border-radius:6px;cursor:pointer;font-weight:700;font-size:0.875rem;">
              💡 ${showHint ? 'Hide Physical Hint' : 'Show Physical Hint'}
            </button>
            ${showHint ? `
              <div style="margin-top:0.75rem;padding:12px;background:#fffbeb;border:1px solid #fef3c7;border-radius:8px;font-size:0.9rem;color:#92400e;">
                <strong>Physical Hint:</strong> ${escapeHtml(WPE_PILOT_PRACTICE.hint)}
              </div>
            ` : ''}
          </div>

          <!-- Explanation Textarea -->
          <div style="margin-bottom:1.25rem;">
            <label for="wpe-practice-reasoning" style="display:block;font-weight:700;font-size:1rem;color:#0f172a;margin-bottom:6px;">
              2. Explain your physical reasoning (at least 10 characters):
            </label>
            <textarea 
              id="wpe-practice-reasoning" 
              rows="3" 
              placeholder="State the governing conservation law, how mechanical energy partitions, or your calculation steps..." 
              ${isAttemptRecorded ? 'disabled' : ''}
              style="width:100%;box-sizing:border-box;padding:10px;border:1px solid #cbd5e1;border-radius:8px;font-family:inherit;font-size:0.95rem;line-height:1.5;"
            >${escapeHtml(explanationText)}</textarea>
            <div style="display:flex;justify-content:space-between;font-size:0.8rem;color:#64748b;margin-top:4px;">
              <span>Requires &ge; 10 non-whitespace characters to commit.</span>
              <span>Characters: ${explanationText.trim().length}</span>
            </div>
          </div>

          <!-- Validation Alert -->
          ${validationError ? `
            <div role="alert" style="background:#fef2f2;border:1px solid #fca5a5;color:#991b1b;padding:10px 14px;border-radius:8px;font-weight:700;font-size:0.9rem;margin-bottom:1rem;">
              ⚠️ ${escapeHtml(validationError)}
            </div>
          ` : ''}

          <!-- Action Buttons -->
          <div style="display:flex;gap:12px;flex-wrap:wrap;align-items:center;">
            ${!isAttemptRecorded ? `
              <button type="button" id="btn-record-attempt" style="min-height:${HIT_TARGET_PRIMARY_PX}px;padding:12px 24px;background:#0284c7;color:white;border:none;border-radius:8px;font-weight:800;font-size:1rem;cursor:pointer;">
                Record Attempt (Not Graded)
              </button>
            ` : `
              <div style="display:flex;align-items:center;gap:8px;background:#f0fdf4;border:1px solid #bbf7d0;padding:8px 16px;border-radius:8px;">
                <span style="color:#16a34a;font-weight:800;">✓ Attempt Saved &amp; Locked</span>
              </div>
              <button type="button" id="btn-reveal-solution" style="min-height:${HIT_TARGET_PRIMARY_PX}px;padding:12px 24px;background:#0f172a;color:white;border:none;border-radius:8px;font-weight:800;font-size:1rem;cursor:pointer;">
                ${isSolutionRevealed ? 'Hide Worked Solution' : 'Reveal Worked Solution'}
              </button>
            `}
          </div>

          <!-- Worked Solution Panel -->
          ${isSolutionRevealed ? `
            <div style="margin-top:1.5rem;padding:1.5rem;background:#f8fafc;border:1px solid #bae6fd;border-radius:10px;">
              <h3 style="margin:0 0 1rem;font-size:1.2rem;font-weight:800;color:#0369a1;">Formal Worked Solution</h3>
              
              <div style="display:flex;flex-direction:column;gap:1rem;">
                ${WPE_PILOT_PRACTICE.derivationSteps.map(step => `
                  <div style="background:#ffffff;border:1px solid #e2e8f0;border-radius:8px;padding:12px;">
                    <div style="font-weight:700;color:#0f172a;margin-bottom:4px;">${escapeHtml(step.title)}</div>
                    <div style="font-family:monospace;font-size:0.95rem;background:#f1f5f9;padding:6px 10px;border-radius:4px;color:#0369a1;">
                      ${escapeHtml(step.formula)}
                    </div>
                  </div>
                `).join('')}
              </div>

              <div style="margin-top:1rem;font-size:0.9rem;color:#475569;background:#f0f9ff;border-left:4px solid #0284c7;padding:10px 14px;">
                <strong>Physical Invariant:</strong> ${escapeHtml(WPE_PILOT_PRACTICE.solutionNote)}
              </div>
            </div>
          ` : ''}
        </div>
      </div>
    `;

    // Event handlers
    container.querySelectorAll<HTMLInputElement>('input[name="wpe-practice-opt"]').forEach(radio => {
      radio.addEventListener('change', (e) => {
        selectedValue = (e.target as HTMLInputElement).value;
        validationError = '';
        render();
      });
    });

    const textarea = container.querySelector<HTMLTextAreaElement>('#wpe-practice-reasoning');
    textarea?.addEventListener('input', (e) => {
      explanationText = (e.target as HTMLTextAreaElement).value;
    });

    container.querySelector('#btn-toggle-hint')?.addEventListener('click', () => {
      showHint = !showHint;
      render();
    });

    container.querySelector('#btn-record-attempt')?.addEventListener('click', () => {
      if (!selectedValue) {
        validationError = 'Please choose one answer option before committing.';
        render();
        return;
      }
      if (explanationText.trim().length < 10) {
        validationError = 'Please provide an explanation with at least 10 non-whitespace characters.';
        render();
        return;
      }
      isAttemptRecorded = true;
      validationError = '';
      render();
    });

    container.querySelector('#btn-reveal-solution')?.addEventListener('click', () => {
      isSolutionRevealed = !isSolutionRevealed;
      render();
    });
  };

  render();
  return { dispose: () => {} };
}

// ============================================================================
// 3. 5 Thinking Skills Interactive Runner Component
// ============================================================================

export function mountWpeThinkingSkillsRunner(
  container: HTMLElement,
  onNavigate?: (route: string) => void
): { dispose: () => void } {
  let activeSkillId: string = WPE_PILOT_SKILLS[0].id;
  const skillAttempts: Record<string, {
    chosenOption: number | null;
    reasoning: string;
    locked: boolean;
    hintsSeen: number;
    showSolution: boolean;
    error: string;
  }> = {};

  WPE_PILOT_SKILLS.forEach(s => {
    skillAttempts[s.id] = {
      chosenOption: null,
      reasoning: '',
      locked: false,
      hintsSeen: 0,
      showSolution: false,
      error: ''
    };
  });

  const render = () => {
    const activeSkill = WPE_PILOT_SKILLS.find(s => s.id === activeSkillId) || WPE_PILOT_SKILLS[0];
    const state = skillAttempts[activeSkill.id];

    container.innerHTML = `
      <div class="g9-wpe-skills-runner" style="display:flex;flex-direction:column;gap:1.5rem;color:#0f172a;line-height:1.6;">
        <!-- Header Banner -->
        <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:12px;padding:1.25rem;">
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:0.5rem;flex-wrap:wrap;">
            <span style="background:#16a34a;color:white;font-size:0.75rem;font-weight:800;padding:2px 8px;border-radius:4px;">5 AUTHORED THINKING SKILLS</span>
            <span style="background:#fef3c7;color:#92400e;font-size:0.75rem;font-weight:800;padding:2px 8px;border-radius:4px;">ACADEMIC HOLD</span>
          </div>
          <h2 style="margin:0 0 0.5rem;font-size:1.4rem;font-weight:800;color:#166534;">Work, Power and Energy: 5 Thinking Skills (Learn &rarr; Challenge)</h2>
          <p style="margin:0;font-size:0.95rem;color:#334155;">
            Master 5 core physics thinking skills. Each skill pairs a guided worked example (Core 1A) with an unassisted challenge (Core 1B) featuring distractor diagnosis and cognitive transfer.
          </p>
        </div>

        <!-- 5-Skill Segmented Tabs -->
        <div style="display:flex;gap:8px;flex-wrap:wrap;" role="tablist" aria-label="Thinking Skills">
          ${WPE_PILOT_SKILLS.map((s, idx) => `
            <button 
              type="button" 
              data-skill-id="${s.id}" 
              style="min-height:${HIT_TARGET_MIN_PX}px;padding:8px 16px;background:${activeSkillId === s.id ? '#0284c7' : '#f1f5f9'};color:${activeSkillId === s.id ? '#ffffff' : '#0f172a'};border:1px solid #cbd5e1;border-radius:8px;font-weight:700;cursor:pointer;font-size:0.9rem;"
            >
              ${escapeHtml(s.title)}
            </button>
          `).join('')}
        </div>

        <!-- Two-Column Layout (Guide + Challenge) -->
        <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(360px, 1fr));gap:1.5rem;">
          
          <!-- Column 1: Core 1A Guide Panel -->
          <div style="background:#ffffff;border:1px solid #cbd5e1;border-radius:12px;padding:1.5rem;box-shadow:0 1px 3px rgba(0,0,0,0.05);display:flex;flex-direction:column;gap:1rem;">
            <div style="display:flex;justify-content:space-between;align-items:center;">
              <span style="background:#e0f2fe;color:#0369a1;font-size:0.75rem;font-weight:800;padding:2px 8px;border-radius:4px;">01 &middot; LEARN TO REASON (CORE 1A)</span>
              <span style="font-size:0.8rem;color:#64748b;font-weight:600;">${escapeHtml(activeSkill.topicNum)}</span>
            </div>

            <h3 style="margin:0;font-size:1.25rem;font-weight:800;color:#0f172a;">${escapeHtml(activeSkill.guide.title)}</h3>
            <p style="margin:0;font-size:0.95rem;color:#334155;background:#f8fafc;padding:10px;border-left:3px solid #0284c7;border-radius:0 6px 6px 0;">
              <strong>Scenario:</strong> ${escapeHtml(activeSkill.guide.scenario)}
            </p>

            ${activeSkill.guide.svg ? `
              <div style="display:flex;flex-direction:column;align-items:center;margin:0.5rem 0;">
                <div style="width:100%;max-width:440px;overflow-x:auto;">
                  ${activeSkill.guide.svg}
                </div>
                ${activeSkill.guide.caption ? `<span style="font-size:0.8rem;color:#64748b;margin-top:4px;">${escapeHtml(activeSkill.guide.caption)}</span>` : ''}
              </div>
            ` : ''}

            ${activeSkill.guide.steps && activeSkill.guide.steps.length > 0 ? `
              <div style="font-size:0.9rem;color:#1e293b;">
                <strong style="display:block;margin-bottom:6px;">Step-by-step reasoning:</strong>
                <ol style="margin:0;padding-left:1.25rem;display:flex;flex-direction:column;gap:4px;">
                  ${activeSkill.guide.steps.map(st => `<li>${escapeHtml(st)}</li>`).join('')}
                </ol>
              </div>
            ` : ''}

            ${activeSkill.guide.conceptMini ? `
              <div style="background:#f1f5f9;border-radius:8px;padding:12px;font-size:0.85rem;color:#334155;">
                ${activeSkill.guide.conceptMini}
              </div>
            ` : ''}

            ${activeSkill.guide.transferNote ? `
              <div style="background:#eff6ff;border-radius:8px;padding:12px;font-size:0.85rem;color:#1e40af;">
                ${activeSkill.guide.transferNote}
              </div>
            ` : ''}
          </div>

          <!-- Column 2: Core 1B Challenge Panel -->
          <div style="background:#ffffff;border:1px solid #cbd5e1;border-radius:12px;padding:1.5rem;box-shadow:0 1px 3px rgba(0,0,0,0.05);display:flex;flex-direction:column;gap:1rem;">
            <div style="display:flex;justify-content:space-between;align-items:center;">
              <span style="background:#fef3c7;color:#92400e;font-size:0.75rem;font-weight:800;padding:2px 8px;border-radius:4px;">02 &middot; THINK FOR YOURSELF (CORE 1B)</span>
              <span style="font-size:0.8rem;color:#64748b;font-weight:600;">Fresh Challenge</span>
            </div>

            <h3 style="margin:0;font-size:1.25rem;font-weight:800;color:#0f172a;">${escapeHtml(activeSkill.challenge.title)}</h3>
            <p style="margin:0;font-size:0.95rem;color:#334155;background:#fffbeb;padding:10px;border-left:3px solid #f59e0b;border-radius:0 6px 6px 0;">
              <strong>Problem:</strong> ${escapeHtml(activeSkill.challenge.scenario)}
            </p>

            ${activeSkill.challenge.svg ? `
              <div style="display:flex;justify-content:center;margin:0.5rem 0;max-width:100%;overflow-x:auto;">
                ${activeSkill.challenge.svg}
              </div>
            ` : ''}

            <!-- MCQ Radio Choices -->
            <fieldset style="border:none;padding:0;margin:0;" ${state.locked ? 'disabled' : ''}>
              <legend style="font-weight:700;font-size:0.95rem;color:#0f172a;margin-bottom:8px;">Select your answer:</legend>
              <div style="display:flex;flex-direction:column;gap:6px;">
                ${activeSkill.challenge.options.map((opt, oIdx) => `
                  <label style="display:flex;align-items:center;gap:10px;min-height:${HIT_TARGET_MIN_PX}px;padding:8px 12px;background:${state.chosenOption === oIdx ? '#e0f2fe' : '#f8fafc'};border:1px solid ${state.chosenOption === oIdx ? '#0284c7' : '#cbd5e1'};border-radius:6px;cursor:${state.locked ? 'default' : 'pointer'};font-size:0.9rem;">
                    <input type="radio" name="skill-opt-${activeSkill.id}" value="${oIdx}" ${state.chosenOption === oIdx ? 'checked' : ''} style="width:18px;height:18px;cursor:pointer;" />
                    <span><strong>${escapeHtml(opt)}</strong></span>
                  </label>
                `).join('')}
              </div>
            </fieldset>

            <!-- Explanation Textarea -->
            <div>
              <label for="skill-reasoning-${activeSkill.id}" style="display:block;font-weight:700;font-size:0.9rem;color:#0f172a;margin-bottom:4px;">
                Why do you think that answer works?
              </label>
              <textarea 
                id="skill-reasoning-${activeSkill.id}" 
                rows="2" 
                placeholder="Explain which formula or physical law applies here..." 
                ${state.locked ? 'disabled' : ''}
                style="width:100%;box-sizing:border-box;padding:8px 10px;border:1px solid #cbd5e1;border-radius:6px;font-family:inherit;font-size:0.9rem;"
              >${escapeHtml(state.reasoning)}</textarea>
            </div>

            <!-- Error alert -->
            ${state.error ? `
              <div role="alert" style="background:#fef2f2;border:1px solid #fca5a5;color:#991b1b;padding:8px 12px;border-radius:6px;font-size:0.875rem;">
                ⚠️ ${escapeHtml(state.error)}
              </div>
            ` : ''}

            <!-- Action Buttons -->
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center;">
              ${!state.locked ? `
                <button type="button" id="btn-lock-skill" style="min-height:${HIT_TARGET_MIN_PX}px;padding:8px 16px;background:#0284c7;color:white;border:none;border-radius:6px;font-weight:700;cursor:pointer;">
                  Lock My Attempt
                </button>
              ` : `
                <span style="font-size:0.85rem;color:#16a34a;font-weight:700;">🔒 Attempt Locked</span>
                ${activeSkill.challenge.hints.length > state.hintsSeen ? `
                  <button type="button" id="btn-show-hint-skill" style="min-height:${HIT_TARGET_MIN_PX}px;padding:6px 12px;background:#f1f5f9;color:#334155;border:1px solid #cbd5e1;border-radius:6px;cursor:pointer;font-weight:700;font-size:0.85rem;">
                    💡 Open Hint ${state.hintsSeen + 1}
                  </button>
                ` : ''}
                <button type="button" id="btn-check-solution-skill" style="min-height:${HIT_TARGET_MIN_PX}px;padding:8px 16px;background:#0f172a;color:white;border:none;border-radius:6px;font-weight:700;cursor:pointer;">
                  ${state.showSolution ? 'Hide Solution' : 'Check My Thinking'}
                </button>
                <button type="button" id="btn-reset-skill" style="min-height:${HIT_TARGET_MIN_PX}px;padding:6px 12px;background:#ffffff;color:#64748b;border:1px solid #cbd5e1;border-radius:6px;cursor:pointer;font-size:0.85rem;">
                  Reset
                </button>
              `}
            </div>

            <!-- Unlocked Hints -->
            ${state.hintsSeen > 0 ? `
              <div style="display:flex;flex-direction:column;gap:6px;">
                ${activeSkill.challenge.hints.slice(0, state.hintsSeen).map((h, hIdx) => `
                  <div style="background:#fffbeb;border:1px solid #fef3c7;border-radius:6px;padding:8px 12px;font-size:0.85rem;color:#92400e;">
                    <strong>Hint ${hIdx + 1}:</strong> ${escapeHtml(h)}
                  </div>
                `).join('')}
              </div>
            ` : ''}

            <!-- Solution & Diagnostic Misconceptions -->
            ${state.showSolution ? `
              <div style="background:#f8fafc;border:1px solid #bae6fd;border-radius:8px;padding:12px;display:flex;flex-direction:column;gap:8px;">
                <!-- Result Badge -->
                <div>
                  ${state.chosenOption === activeSkill.challenge.correctIndex ? `
                    <span style="background:#dcfce7;color:#166534;font-weight:800;font-size:0.85rem;padding:3px 8px;border-radius:4px;">✓ Correct Physical Invariant</span>
                  ` : `
                    <span style="background:#fee2e2;color:#991b1b;font-weight:800;font-size:0.85rem;padding:3px 8px;border-radius:4px;">❌ Diagnostic Misconception Detected</span>
                  `}
                </div>

                <!-- Misconception explanation if wrong -->
                ${state.chosenOption !== null && state.chosenOption !== activeSkill.challenge.correctIndex && (activeSkill.challenge.misconceptions as Record<string, string>)[String(state.chosenOption)] ? `
                  <div style="background:#fef2f2;border-left:3px solid #ef4444;padding:8px 10px;font-size:0.85rem;color:#991b1b;">
                    <strong>Misconception Check:</strong> ${escapeHtml((activeSkill.challenge.misconceptions as Record<string, string>)[String(state.chosenOption)])}
                  </div>
                ` : ''}

                <!-- Formal Answer -->
                <div style="font-size:0.9rem;color:#0f172a;line-height:1.5;">
                  <strong>Worked Derivation:</strong> ${escapeHtml(activeSkill.challenge.answer)}
                </div>

                <!-- Transfer prompt -->
                ${activeSkill.challenge.transfer ? `
                  <div style="background:#f0f9ff;border-left:3px solid #0284c7;padding:8px 10px;font-size:0.85rem;color:#0369a1;">
                    <strong>Cognitive Transfer Question:</strong> ${escapeHtml(activeSkill.challenge.transfer)}
                  </div>
                ` : ''}
              </div>
            ` : ''}
          </div>
        </div>
      </div>
    `;

    // Tab switcher events
    container.querySelectorAll<HTMLButtonElement>('button[data-skill-id]').forEach(btn => {
      btn.addEventListener('click', () => {
        activeSkillId = btn.getAttribute('data-skill-id')!;
        render();
      });
    });

    // Option radios
    container.querySelectorAll<HTMLInputElement>(`input[name="skill-opt-${activeSkill.id}"]`).forEach(radio => {
      radio.addEventListener('change', (e) => {
        state.chosenOption = parseInt((e.target as HTMLInputElement).value, 10);
        state.error = '';
        render();
      });
    });

    // Reason textarea
    const reasonArea = container.querySelector<HTMLTextAreaElement>(`#skill-reasoning-${activeSkill.id}`);
    reasonArea?.addEventListener('input', (e) => {
      state.reasoning = (e.target as HTMLTextAreaElement).value;
    });

    // Lock button
    container.querySelector('#btn-lock-skill')?.addEventListener('click', () => {
      if (state.chosenOption === null) {
        state.error = 'Please select an option before locking.';
        render();
        return;
      }
      state.locked = true;
      state.error = '';
      render();
    });

    // Hint button
    container.querySelector('#btn-show-hint-skill')?.addEventListener('click', () => {
      if (state.hintsSeen < activeSkill.challenge.hints.length) {
        state.hintsSeen++;
        render();
      }
    });

    // Solution button
    container.querySelector('#btn-check-solution-skill')?.addEventListener('click', () => {
      state.showSolution = !state.showSolution;
      render();
    });

    // Reset button
    container.querySelector('#btn-reset-skill')?.addEventListener('click', () => {
      state.chosenOption = null;
      state.reasoning = '';
      state.locked = false;
      state.hintsSeen = 0;
      state.showSolution = false;
      state.error = '';
      render();
    });
  };

  render();
  return { dispose: () => {} };
}

// ============================================================================
// 4. Authentic PH04 Curricular Units Component
// ============================================================================

export function mountWpePh04CurricularUnits(
  container: HTMLElement,
  onNavigate?: (route: string) => void
): { dispose: () => void } {
  let activeUnitIndex = 0;
  const practiceState: Record<number, {
    prediction: string;
    attempt: string;
    locked: boolean;
    hintsSeen: number;
    showReconstruct: boolean;
  }> = {};

  WPE_PILOT_PH04_UNITS.forEach((_, idx) => {
    practiceState[idx] = {
      prediction: '',
      attempt: '',
      locked: false,
      hintsSeen: 0,
      showReconstruct: false
    };
  });

  const render = () => {
    const unit = WPE_PILOT_PH04_UNITS[activeUnitIndex];
    const pState = practiceState[activeUnitIndex];

    container.innerHTML = `
      <div class="g9-wpe-ph04-units" style="display:flex;flex-direction:column;gap:1.5rem;color:#0f172a;line-height:1.6;">
        <!-- Header Banner -->
        <div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:12px;padding:1.25rem;">
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:0.5rem;flex-wrap:wrap;">
            <span style="background:#1d4ed8;color:white;font-size:0.75rem;font-weight:800;padding:2px 8px;border-radius:4px;">NSEJS PHYSICS PH04</span>
            <span style="background:#fef3c7;color:#92400e;font-size:0.75rem;font-weight:800;padding:2px 8px;border-radius:4px;">ACADEMIC HOLD</span>
            <span style="background:#dcfce7;color:#166534;font-size:0.75rem;font-weight:800;padding:2px 8px;border-radius:4px;">AUTHENTIC PILOT</span>
          </div>
          <h2 style="margin:0 0 0.5rem;font-size:1.4rem;font-weight:800;color:#1e40af;">PH04 Work, Energy and Power: 5 Curricular Units &amp; Vector SVGs</h2>
          <p style="margin:0;font-size:0.95rem;color:#334155;">
            Authentic Grade9 v4.1 NSEJS units containing high-fidelity vector diagrams, 3-tier cognitive progressions, worked anchor problems, and protected transfer tasks.
          </p>
        </div>

        <!-- Unit Selector Tabs -->
        <div style="display:flex;gap:8px;flex-wrap:wrap;" role="tablist" aria-label="PH04 Curricular Units">
          ${WPE_PILOT_PH04_UNITS.map((u, idx) => `
            <button 
              type="button" 
              data-ph04-idx="${idx}" 
              style="min-height:${HIT_TARGET_MIN_PX}px;padding:8px 16px;background:${activeUnitIndex === idx ? '#0284c7' : '#f8fafc'};color:${activeUnitIndex === idx ? '#ffffff' : '#0f172a'};border:1px solid #cbd5e1;border-radius:8px;font-weight:700;cursor:pointer;font-size:0.9rem;"
            >
              ${escapeHtml(u.id)}: ${escapeHtml(u.title.split(' ')[0])}...
            </button>
          `).join('')}
        </div>

        <!-- Unit Main Card -->
        <div style="background:#ffffff;border:1px solid #cbd5e1;border-radius:12px;padding:1.5rem;box-shadow:0 1px 3px rgba(0,0,0,0.05);display:flex;flex-direction:column;gap:1.25rem;">
          <div>
            <div style="display:flex;gap:8px;margin-bottom:0.5rem;flex-wrap:wrap;">
              <span style="background:#e0f2fe;color:#0369a1;font-size:0.8rem;font-weight:800;padding:3px 8px;border-radius:4px;">${escapeHtml(unit.id)}</span>
              <span style="background:#f1f5f9;color:#475569;font-size:0.8rem;font-weight:600;padding:3px 8px;border-radius:4px;">${escapeHtml(unit.scope)}</span>
            </div>
            <h3 style="margin:0 0 0.5rem;font-size:1.35rem;font-weight:800;color:#0f172a;">${escapeHtml(unit.title)}</h3>
            <p style="margin:0;font-size:0.95rem;color:#475569;">
              <strong>Competency:</strong> ${escapeHtml(unit.competency)}
            </p>
          </div>

          <!-- Phenomenon & Mechanism -->
          <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(300px, 1fr));gap:1rem;">
            <div style="background:#f8fafc;border-left:4px solid #0284c7;padding:12px;border-radius:0 8px 8px 0;">
              <strong style="color:#0369a1;display:block;margin-bottom:4px;">Phenomenon</strong>
              <span style="font-size:0.9rem;color:#334155;">${escapeHtml(unit.phenomenon)}</span>
            </div>
            <div style="background:#f8fafc;border-left:4px solid #16a34a;padding:12px;border-radius:0 8px 8px 0;">
              <strong style="color:#166534;display:block;margin-bottom:4px;">Mechanism</strong>
              <span style="font-size:0.9rem;color:#334155;">${escapeHtml(unit.mechanism)}</span>
            </div>
          </div>

          <!-- Vector SVG Figure -->
          ${unit.figure ? `
            <div style="display:flex;flex-direction:column;align-items:center;background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:1rem;">
              <div style="width:100%;max-width:660px;overflow-x:auto;">
                ${unit.figure}
              </div>
              <span style="font-size:0.8rem;color:#64748b;margin-top:6px;">Original Grade9 v4.1 vector diagram &middot; Vector ledger schematic</span>
            </div>
          ` : ''}

          <!-- Warrant -->
          <div style="background:#f0f9ff;border:1px solid #bae6fd;border-radius:8px;padding:12px;font-size:0.95rem;color:#0369a1;">
            <strong>Warrant &amp; Governing Equations:</strong> ${escapeHtml(unit.warrant)}
          </div>

          <!-- 3-Tier Cognitive Progression -->
          <div>
            <h4 style="margin:0 0 0.75rem;font-size:1.05rem;font-weight:700;color:#0f172a;">3-Tier Cognitive Progression</h4>
            <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(240px, 1fr));gap:10px;">
              ${unit.progression.map((prog, pIdx) => `
                <div style="background:#f8fafc;border:1px solid #cbd5e1;border-radius:8px;padding:12px;">
                  <span style="font-size:0.75rem;font-weight:800;color:#0284c7;display:block;margin-bottom:4px;">TIER ${pIdx + 1}: ${escapeHtml(prog[0])}</span>
                  <div style="font-size:0.875rem;color:#334155;margin-bottom:6px;">${escapeHtml(prog[1])}</div>
                  <div style="font-size:0.8rem;background:#ffffff;border:1px solid #e2e8f0;padding:6px;border-radius:4px;color:#0369a1;font-family:monospace;">${escapeHtml(prog[2])}</div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Anchor Worked Problem -->
          <div style="background:#fdf4ff;border:1px solid #f5d0fe;border-radius:8px;padding:14px;">
            <h4 style="margin:0 0 0.5rem;font-size:1.05rem;font-weight:700;color:#86198f;">Worked Anchor Problem</h4>
            <p style="margin:0 0 0.5rem;font-size:0.95rem;color:#4a044e;">
              <strong>Problem:</strong> ${escapeHtml(unit.anchor.problem)}
            </p>
            <div style="background:#ffffff;border:1px solid #fae8ff;border-radius:6px;padding:10px;font-size:0.9rem;color:#701a75;line-height:1.5;">
              <strong>Solution:</strong> ${escapeHtml(unit.anchor.solution)}
            </div>
          </div>

          <!-- Misconception Repair -->
          <div style="background:#fff1f2;border:1px solid #fecdd3;border-radius:8px;padding:14px;">
            <h4 style="margin:0 0 0.5rem;font-size:1.05rem;font-weight:700;color:#9f1239;">Diagnostic Misconception &amp; Repair</h4>
            <div style="font-size:0.9rem;color:#881337;display:flex;flex-direction:column;gap:6px;">
              <div><strong>Claim:</strong> ${escapeHtml(unit.misconception.claim)}</div>
              <div><strong>Why it fails:</strong> ${escapeHtml(unit.misconception.why)}</div>
              <div style="background:#ffffff;padding:8px;border-radius:6px;border:1px solid #ffe4e6;"><strong>Repair:</strong> ${escapeHtml(unit.misconception.repair)}</div>
            </div>
          </div>

          <!-- Boundary Check & Synthesis -->
          <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(280px, 1fr));gap:1rem;">
            <div style="background:#f8fafc;border:1px solid #cbd5e1;border-radius:8px;padding:12px;">
              <strong style="color:#0f172a;display:block;margin-bottom:4px;">Boundary Condition Check</strong>
              <span style="font-size:0.875rem;color:#475569;">${escapeHtml(unit.boundary.check)}</span>
            </div>
            <div style="background:#f8fafc;border:1px solid #cbd5e1;border-radius:8px;padding:12px;">
              <strong style="color:#0f172a;display:block;margin-bottom:4px;">Synthesis</strong>
              <div style="font-size:0.875rem;color:#475569;">
                <div><strong>Q:</strong> ${escapeHtml(unit.synthesis.question)}</div>
                <div style="margin-top:2px;"><strong>A:</strong> ${escapeHtml(unit.synthesis.answer)}</div>
              </div>
            </div>
          </div>

          <!-- Fresh Practice Task -->
          <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:10px;padding:1.25rem;">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.75rem;">
              <span style="background:#16a34a;color:white;font-size:0.75rem;font-weight:800;padding:2px 8px;border-radius:4px;">FRESH PRACTICE TASK</span>
              <span style="font-size:0.8rem;color:#166534;font-family:monospace;">${escapeHtml(unit.practice.uid)}</span>
            </div>
            <p style="margin:0 0 1rem;font-size:0.95rem;color:#14532d;">
              ${escapeHtml(unit.practice.prompt)}
            </p>

            <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(260px, 1fr));gap:10px;margin-bottom:1rem;">
              <div>
                <label style="display:block;font-size:0.85rem;font-weight:700;color:#14532d;margin-bottom:4px;">1. Qualitative Prediction</label>
                <textarea 
                  id="ph04-pred-${activeUnitIndex}" 
                  rows="2" 
                  placeholder="Predict what will happen qualitatively before computing..."
                  ${pState.locked ? 'disabled' : ''}
                  style="width:100%;box-sizing:border-box;padding:8px;border:1px solid #86efac;border-radius:6px;font-family:inherit;font-size:0.875rem;"
                >${escapeHtml(pState.prediction)}</textarea>
              </div>
              <div>
                <label style="display:block;font-size:0.85rem;font-weight:700;color:#14532d;margin-bottom:4px;">2. Your Attempt &amp; Numerical Derivation</label>
                <textarea 
                  id="ph04-att-${activeUnitIndex}" 
                  rows="2" 
                  placeholder="Show your step-by-step formula and value..."
                  ${pState.locked ? 'disabled' : ''}
                  style="width:100%;box-sizing:border-box;padding:8px;border:1px solid #86efac;border-radius:6px;font-family:inherit;font-size:0.875rem;"
                >${escapeHtml(pState.attempt)}</textarea>
              </div>
            </div>

            <!-- Task Actions -->
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center;">
              ${!pState.locked ? `
                <button type="button" id="btn-lock-ph04" style="min-height:${HIT_TARGET_MIN_PX}px;padding:8px 16px;background:#16a34a;color:white;border:none;border-radius:6px;font-weight:700;cursor:pointer;">
                  Save Practice Attempt
                </button>
              ` : `
                <span style="font-size:0.85rem;color:#166534;font-weight:700;">🔒 Practice Saved</span>
                ${unit.practice.hints.length > pState.hintsSeen ? `
                  <button type="button" id="btn-hint-ph04" style="min-height:${HIT_TARGET_MIN_PX}px;padding:6px 12px;background:#ffffff;color:#166534;border:1px solid #86efac;border-radius:6px;cursor:pointer;font-weight:700;font-size:0.85rem;">
                    💡 Open Hint ${pState.hintsSeen + 1}
                  </button>
                ` : ''}
                <button type="button" id="btn-reconstruct-ph04" style="min-height:${HIT_TARGET_MIN_PX}px;padding:8px 16px;background:#0f172a;color:white;border:none;border-radius:6px;font-weight:700;cursor:pointer;">
                  ${pState.showReconstruct ? 'Hide Reconstruction' : 'Reveal Canonical Derivation'}
                </button>
              `}
            </div>

            <!-- Hints Display -->
            ${pState.hintsSeen > 0 ? `
              <div style="margin-top:0.75rem;display:flex;flex-direction:column;gap:6px;">
                ${unit.practice.hints.slice(0, pState.hintsSeen).map((h, hIdx) => `
                  <div style="background:#ffffff;border:1px solid #86efac;border-radius:6px;padding:8px 10px;font-size:0.85rem;color:#14532d;">
                    <strong>Hint ${hIdx + 1}:</strong> ${escapeHtml(h)}
                  </div>
                `).join('')}
              </div>
            ` : ''}

            <!-- Canonical Reconstruction -->
            ${pState.showReconstruct ? `
              <div style="margin-top:1rem;background:#ffffff;border:1px solid #86efac;border-radius:8px;padding:12px;">
                <strong style="color:#166534;display:block;margin-bottom:6px;">Canonical Worked Derivation:</strong>
                <div style="font-family:monospace;font-size:0.9rem;background:#f8fafc;padding:8px 12px;border-radius:6px;color:#0f172a;line-height:1.5;">
                  ${escapeHtml(unit.practice.reconstruction)}
                </div>
              </div>
            ` : ''}
          </div>
        </div>
      </div>
    `;

    // Tab buttons
    container.querySelectorAll<HTMLButtonElement>('button[data-ph04-idx]').forEach(btn => {
      btn.addEventListener('click', () => {
        activeUnitIndex = parseInt(btn.getAttribute('data-ph04-idx')!, 10);
        render();
      });
    });

    // Inputs
    container.querySelector<HTMLTextAreaElement>(`#ph04-pred-${activeUnitIndex}`)?.addEventListener('input', (e) => {
      pState.prediction = (e.target as HTMLTextAreaElement).value;
    });
    container.querySelector<HTMLTextAreaElement>(`#ph04-att-${activeUnitIndex}`)?.addEventListener('input', (e) => {
      pState.attempt = (e.target as HTMLTextAreaElement).value;
    });

    // Lock
    container.querySelector('#btn-lock-ph04')?.addEventListener('click', () => {
      pState.locked = true;
      render();
    });

    // Hints
    container.querySelector('#btn-hint-ph04')?.addEventListener('click', () => {
      if (pState.hintsSeen < unit.practice.hints.length) {
        pState.hintsSeen++;
        render();
      }
    });

    // Reconstruct
    container.querySelector('#btn-reconstruct-ph04')?.addEventListener('click', () => {
      pState.showReconstruct = !pState.showReconstruct;
      render();
    });
  };

  render();
  return { dispose: () => {} };
}

// ============================================================================
// 5. 13 Learning Pack Bridges Viewer Component
// ============================================================================

export function mountWpeLearningPacksViewer(
  container: HTMLElement,
  onNavigate?: (route: string) => void
): { dispose: () => void } {
  let selectedPackId: string = WPE_PILOT_LEARNING_PACKS[0].id;

  const render = () => {
    const pack = WPE_PILOT_LEARNING_PACKS.find(p => p.id === selectedPackId) || WPE_PILOT_LEARNING_PACKS[0];

    container.innerHTML = `
      <div class="g9-wpe-learning-packs" style="display:flex;flex-direction:column;gap:1.5rem;color:#0f172a;line-height:1.6;">
        <!-- Header Banner -->
        <div style="background:#fdf4ff;border:1px solid #f5d0fe;border-radius:12px;padding:1.25rem;">
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:0.5rem;flex-wrap:wrap;">
            <span style="background:#a21caf;color:white;font-size:0.75rem;font-weight:800;padding:2px 8px;border-radius:4px;">13 AUTHORED CONCEPT BRIDGES</span>
            <span style="background:#fef3c7;color:#92400e;font-size:0.75rem;font-weight:800;padding:2px 8px;border-radius:4px;">ACADEMIC HOLD</span>
          </div>
          <h2 style="margin:0 0 0.5rem;font-size:1.4rem;font-weight:800;color:#86198f;">Source-to-Core1A Learning Bridges</h2>
          <p style="margin:0;font-size:0.95rem;color:#4a044e;">
            Authored educational bridge packs mapping raw examination questions into structured mechanical ledgers, conservative fields, and formal derivations.
          </p>
        </div>

        <div style="display:grid;grid-template-columns:minmax(260px, 320px) 1fr;gap:1.5rem;align-items:start;">
          <!-- Left: List of 13 Packs -->
          <div style="background:#ffffff;border:1px solid #cbd5e1;border-radius:10px;padding:12px;display:flex;flex-direction:column;gap:6px;">
            <div style="font-weight:700;font-size:0.95rem;color:#0f172a;margin-bottom:6px;padding-left:4px;">Bridge Catalog (13 Packs):</div>
            ${WPE_PILOT_LEARNING_PACKS.map(p => `
              <button 
                type="button" 
                data-pack-id="${p.id}" 
                style="min-height:${HIT_TARGET_MIN_PX}px;padding:8px 12px;text-align:left;background:${selectedPackId === p.id ? '#fae8ff' : '#f8fafc'};color:${selectedPackId === p.id ? '#701a75' : '#1e293b'};border:1px solid ${selectedPackId === p.id ? '#d946ef' : '#e2e8f0'};border-radius:6px;cursor:pointer;font-size:0.875rem;font-weight:${selectedPackId === p.id ? '700' : '500'};line-height:1.4;"
              >
                ${escapeHtml(p.id)}: ${escapeHtml(p.title.replace(/^WPE-[CE]\d+\s*·\s*/, ''))}
              </button>
            `).join('')}
          </div>

          <!-- Right: Complete Pack Markdown Viewer -->
          <div style="background:#ffffff;border:1px solid #cbd5e1;border-radius:10px;padding:1.5rem;box-shadow:0 1px 3px rgba(0,0,0,0.05);min-height:500px;">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem;border-bottom:1px solid #e2e8f0;padding-bottom:0.75rem;">
              <span style="font-size:0.85rem;color:#a21caf;font-weight:800;">${escapeHtml(pack.id)}</span>
              <span style="font-size:0.8rem;color:#64748b;font-family:monospace;">${escapeHtml(pack.filename)}</span>
            </div>

            <!-- Formatted Markdown Content -->
            <div style="white-space:pre-wrap;font-family:inherit;font-size:0.95rem;color:#334155;line-height:1.7;">
              ${escapeHtml(pack.content)}
            </div>
          </div>
        </div>
      </div>
    `;

    container.querySelectorAll<HTMLButtonElement>('button[data-pack-id]').forEach(btn => {
      btn.addEventListener('click', () => {
        selectedPackId = btn.getAttribute('data-pack-id')!;
        render();
      });
    });
  };

  render();
  return { dispose: () => {} };
}
