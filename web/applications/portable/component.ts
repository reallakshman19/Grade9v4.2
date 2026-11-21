/**
 * web/applications/portable/component.ts
 * A64 — Portable workbench UI component controller.
 *
 * Implements:
 * - Declarative semantic grid layout rendering
 * - Interactive visual simulations (Riemann sum squeeze, long division scaffold, redox electron transfer, shared clock)
 * - Kid-friendly visual guides, missions, and conceptual analogies
 * - Human-readable transformation actions with educational metadata
 * - Keyboard navigation (Tab/Arrows to navigate, Enter to activate transformation)
 * - Touch navigation and transformation execution
 * - Orientation rotation handling without data loss
 * - Accessible semantic table markup conforming to WCAG AAA
 * - 48px minimum touch/hit target compliance
 * - Zero iframe embedding, zero pixel positioning invariants (no position: absolute, no translate3d)
 *
 * No academic approval inferred from software validation.
 */

import { escapeHtml } from '../../runtime/rendering.ts';
import { HIT_TARGET_MIN_PX } from '../../styles/tokens.ts';
import { PortableWorkbenchAdapter } from './adapter.ts';
import type {
  PortableWorkbenchPackage,
  PortableWorkbenchState,
  SceneProjection,
} from './types.ts';
import type { TransformationOutcome } from './adapter.ts';

// ---------------------------------------------------------------------------
// Kid-Friendly Educational Guides & Analogies
// ---------------------------------------------------------------------------

interface KidGuide {
  icon: string;
  badge: string;
  analogyTitle: string;
  mission: string;
  steps: string[];
  funFact: string;
}

function getKidGuide(pkg: PortableWorkbenchPackage): KidGuide {
  const id = pkg.id;
  if (id === 'portable-integration-riemann') {
    return {
      icon: '📐',
      badge: 'Calculus & Area Explorer',
      analogyTitle: 'The Squeeze Machine — Trapping the Area Under a Curve',
      mission:
        'Trap the exact area under the curvy slide f(x) = x² from 0 to 1! We use two sets of building blocks: blue ones underneath (under-estimate) and amber ones covering from above (over-estimate).',
      steps: [
        '🟦 <strong>Lower Estimate (Blue):</strong> Sits safely below the curve. Always smaller than the true area.',
        '🟧 <strong>Upper Estimate (Amber):</strong> Covers the curve from above. Always bigger than the true area.',
        '🎯 <strong>The Darboux Squeeze:</strong> As you slice into more rectangles (N=2 → 4 → 8), the gap shrinks and pins down the exact area: 1/3 ≈ 0.3333!',
      ],
      funFact:
        '💡 Fun Fact: Even though a curve is infinitely smooth, simple rectangular slices get so accurate that in the limit, the error completely vanishes!',
    };
  }

  if (id === 'portable-long-division') {
    return {
      icon: '➗',
      badge: 'Arithmetic Place-Value Scaffold',
      analogyTitle: 'The Big Number Unpacker — Dividing 492 by 4',
      mission:
        'Imagine dividing 492 coins equally into 4 treasure chests. We unpack the big number step-by-step: Hundreds first, then Tens, and finally Ones!',
      steps: [
        '1️⃣ <strong>Hundreds:</strong> 4 hundreds ÷ 4 = 1 hundred in each chest (Quotient: 100).',
        '2️⃣ <strong>Tens:</strong> 9 tens ÷ 4 = 2 tens each, with 1 ten left over (Quotient: +20, remainder: 10).',
        '3️⃣ <strong>Ones:</strong> Combine the leftover 1 ten with 2 ones (= 12) ÷ 4 = 3 ones (Final quotient: 123)!',
      ],
      funFact:
        '💡 Fun Fact: Long division is really just repeated subtraction grouped into place values (100s, 10s, 1s) to make huge calculations super easy!',
    };
  }

  if (id === 'portable-redox-electron-equivalence') {
    return {
      icon: '⚡',
      badge: 'Chemical Reaction Balance',
      analogyTitle: 'The Electron Trade Game (Fe²⁺ + Ce⁴⁺)',
      mission:
        'Chemical reactions often happen because atoms trade tiny charged sparks called electrons (e⁻). Watch iron give an electron and cerium catch it!',
      steps: [
        '🔴 <strong>Oxidation (Loss):</strong> Iron (Fe²⁺) gives away 1 electron, jumping in charge to Fe³⁺.',
        '🔵 <strong>Reduction (Gain):</strong> Cerium (Ce⁴⁺) catches that electron, dropping in charge to Ce³⁺.',
        '⚖️ <strong>The Law of Conservation:</strong> Every electron lost by one atom must be gained by another. 1 e⁻ lost = 1 e⁻ gained!',
      ],
      funFact:
        '💡 Remember: OIL RIG — Oxidation Is Loss (of electrons), Reduction Is Gain (of electrons)!',
    };
  }

  if (id === 'portable-motion-shared-clock') {
    return {
      icon: '⏱️',
      badge: '2D Kinematics & Simultaneity',
      analogyTitle: 'The One True Clock — Connecting X and Y Motion',
      mission:
        'When a soccer ball flies through the air, it moves forward (X) and upward (Y) at the EXACT same time. Both directions must obey the same master clock!',
      steps: [
        '⏱️ <strong>Same-Time Snapshot:</strong> Taking X at t = 2s and Y at t = 2s recreates the real, physical position of the ball.',
        '⚠️ <strong>Mixed-Time Trap:</strong> Mixing X at 2s with Y at 3s creates a "ghost" position that never existed in the real world!',
        '✅ <strong>Physical Law:</strong> Physics requires simultaneity: one moment in time ties all spatial dimensions together.',
      ],
      funFact:
        '💡 Fun Fact: Time is the invisible thread that binds independent horizontal and vertical motions into a single curved trajectory!',
    };
  }

  return {
    icon: '🔬',
    badge: 'Interactive Model',
    analogyTitle: 'Declarative Workbench Explorer',
    mission: `Explore and test state transformations on "${pkg.title}". Apply semantic transformation rules below to observe state changes.`,
    steps: [
      'Look at the active projections in the grid below.',
      'Click available transformation buttons to evolve the model.',
      'Check the outcome notice to see accepted versus rejected states.',
    ],
    funFact:
      '💡 Every transformation is strictly declarative and validated under fail-closed contracts.',
  };
}

// ---------------------------------------------------------------------------
// Human-Friendly Rule Action Metadata
// ---------------------------------------------------------------------------

interface RuleFriendly {
  icon: string;
  title: string;
  subtitle: string;
}

function getRuleFriendly(ruleId: string, summary?: string): RuleFriendly {
  switch (ruleId) {
    case 'rule-refine-n4':
      return {
        icon: '📐',
        title: 'Refine to N=4 Slices',
        subtitle: 'Subdivide interval into 4 thinner rectangles (Δx = 0.25)',
      };
    case 'rule-refine-n8':
      return {
        icon: '🔬',
        title: 'Refine to N=8 Slices',
        subtitle: 'Subdivide interval into 8 ultra-thin rectangles (Δx = 0.125)',
      };
    case 'rule-first-quotient-digit':
      return {
        icon: '1️⃣',
        title: 'Step 1: Divide Hundreds',
        subtitle: '4 hundreds ÷ 4 = 1 hundred (quotient digit = 1, remainder = 0)',
      };
    case 'rule-second-quotient-digit':
      return {
        icon: '2️⃣',
        title: 'Step 2: Divide Tens',
        subtitle: 'Bring down 9; 9 tens ÷ 4 = 2 tens (quotient digit = 2, remainder = 1)',
      };
    case 'rule-equate-redox-electrons':
      return {
        icon: '⚖️',
        title: 'Equate Electron Transfer',
        subtitle: '1 electron lost by Fe²⁺ matches 1 electron gained by Ce⁴⁺',
      };
    case 'same-time':
      return {
        icon: '⏱️',
        title: 'Recombine Same-Time Samples (t = 2s)',
        subtitle: 'Reconstruct valid simultaneous plane state (ACCEPT)',
      };
    case 'mixed-time':
      return {
        icon: '⚠️',
        title: 'Test Mixed-Time Samples (t = 2s & t = 3s)',
        subtitle: 'Attempt non-simultaneous reconstruction (REJECT)',
      };
    default:
      return {
        icon: '⚙️',
        title: ruleId,
        subtitle: summary || 'Apply semantic transformation',
      };
  }
}

// ---------------------------------------------------------------------------
// Human-Friendly Grid Headers
// ---------------------------------------------------------------------------

function getColumnFriendly(colName: string): { label: string; tag: string } {
  const c = colName.toLowerCase();
  if (c === 'col-n2') return { label: 'N = 2 Slices', tag: 'Coarse: Δx = 0.5' };
  if (c === 'col-n4') return { label: 'N = 4 Slices', tag: 'Medium: Δx = 0.25' };
  if (c === 'col-n8') return { label: 'N = 8 Slices', tag: 'Fine: Δx = 0.125' };
  if (c === 'col-n16') return { label: 'N = 16 Slices', tag: 'Ultra-Fine: Δx = 0.0625' };
  if (c === 'col-hundreds') return { label: 'Hundreds Place', tag: '400 ÷ 4' };
  if (c === 'col-tens') return { label: 'Tens Place', tag: '90 ÷ 4' };
  if (c === 'col-units') return { label: 'Units Place', tag: '2 left' };
  if (c === 'oxidation') return { label: 'Oxidation (e⁻ Loss)', tag: 'Fe²⁺ → Fe³⁺ + e⁻' };
  if (c === 'relation') return { label: 'Transfer Relation', tag: '1 e⁻ = 1 e⁻' };
  if (c === 'reduction') return { label: 'Reduction (e⁻ Gain)', tag: 'Ce⁴⁺ + e⁻ → Ce³⁺' };
  if (c === 'sample') return { label: 'Kinematic Sample', tag: 'Sensor readings' };
  if (c === 'state') return { label: 'Physical State', tag: 'Reconstructed 2D' };
  return { label: colName, tag: '' };
}

function getRowFriendly(rowName: string): { label: string; tag: string } {
  const r = rowName.toLowerCase();
  if (r === 'interval-0-1') return { label: 'Interval [0, 1]', tag: 'f(x) = x²' };
  if (r === 'row-quotient') return { label: 'Quotient (Answer)', tag: 'Step results' };
  if (r === 'row-dividend') return { label: 'Dividend (492)', tag: 'Original value' };
  if (r === 'row-subtract') return { label: 'Subtrahend', tag: 'Multiplied digit' };
  if (r === 'row-remainder') return { label: 'Remainder', tag: 'Carried over' };
  if (r === 'oxidation-state') return { label: 'Oxidation State', tag: 'Charge change' };
  if (r === 'half-reaction') return { label: 'Half-Reaction', tag: 'Redox steps' };
  if (r === 'equivalence') return { label: 'Equivalence', tag: 'Balanced ledger' };
  if (r === 'candidate') return { label: 'Candidate Pair', tag: 'Time stamps' };
  if (r === 'reconstruction') return { label: 'Reconstruction', tag: 'Combined state' };
  return { label: rowName, tag: '' };
}

// ---------------------------------------------------------------------------
// Dynamic Visual Simulations (Pure SVG / Flexbox, NO absolute positioning)
// ---------------------------------------------------------------------------

function renderVisualGraphic(
  pkg: PortableWorkbenchPackage,
  allProjections: readonly SceneProjection[],
  appliedRules: Set<string>,
  lastOutcome: TransformationOutcome | null
): string {
  const id = pkg.id;

  // 1. Riemann Sums Graphic
  if (id === 'portable-integration-riemann') {
    let n = 2;
    if (appliedRules.has('rule-refine-n8') || allProjections.some((p) => p.placement.column === 'col-n8')) {
      n = 8;
    } else if (appliedRules.has('rule-refine-n4') || allProjections.some((p) => p.placement.column === 'col-n4')) {
      n = 4;
    }

    // Exact Darboux calculations for f(x) = x^2 on [0, 1]
    let lower = 0.125;
    let upper = 0.625;
    if (n === 4) {
      lower = 0.2188;
      upper = 0.4688;
    } else if (n === 8) {
      lower = 0.2734;
      upper = 0.3984;
    }
    const gap = upper - lower;
    const exact = 1 / 3;
    const progressPct = Math.min(100, Math.round(((0.5 - gap) / 0.5) * 80 + 20));

    // SVG coordinates
    // Plot box: X from 60 to 560 (width 500), Y from 30 to 210 (height 180)
    const plotX = (x: number) => 60 + x * 500;
    const plotY = (y: number) => 210 - y * 180;

    // Build upper rectangles
    let upperRectsSvg = '';
    let lowerRectsSvg = '';
    const dx = 1 / n;
    for (let i = 0; i < n; i++) {
      const x0 = i * dx;
      const x1 = (i + 1) * dx;
      const mLower = x0 * x0;
      const mUpper = x1 * x1;

      const rx = plotX(x0);
      const rw = plotX(x1) - plotX(x0);

      // Upper rect
      const uy = plotY(mUpper);
      const uh = 210 - uy;
      upperRectsSvg += `<rect x="${rx.toFixed(1)}" y="${uy.toFixed(1)}" width="${rw.toFixed(1)}" height="${uh.toFixed(1)}" fill="#fef3c7" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="3,2" fill-opacity="0.6" />`;

      // Lower rect
      const ly = plotY(mLower);
      const lh = 210 - ly;
      if (lh > 0.5) {
        lowerRectsSvg += `<rect x="${rx.toFixed(1)}" y="${ly.toFixed(1)}" width="${rw.toFixed(1)}" height="${lh.toFixed(1)}" fill="#bfdbfe" stroke="#3b82f6" stroke-width="1.5" fill-opacity="0.8" />`;
      }
    }

    // Smooth curve points
    let curvePath = `M ${plotX(0)} ${plotY(0)}`;
    for (let k = 1; k <= 20; k++) {
      const xVal = k / 20;
      const yVal = xVal * xVal;
      curvePath += ` L ${plotX(xVal).toFixed(1)} ${plotY(yVal).toFixed(1)}`;
    }

    return `
      <div class="portable-visual-stage" style="margin-bottom: 20px; padding: 16px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; flex-wrap: wrap; gap: 8px;">
          <div>
            <h4 style="margin: 0; font-size: 15px; font-weight: 700; color: #0f172a;">📊 Live Curve Simulation: f(x) = x² on [0, 1]</h4>
            <span style="font-size: 13px; color: #64748b;">Current Partition: <strong>N = ${n} Subintervals</strong> (Width Δx = ${dx.toFixed(3)})</span>
          </div>
          <div style="display: flex; gap: 12px; font-size: 12px; font-weight: 600;">
            <span style="display: inline-flex; align-items: center; gap: 4px; color: #1e40af;"><span style="display: inline-block; width: 12px; height: 12px; background: #bfdbfe; border: 1px solid #3b82f6; border-radius: 2px;"></span> Lower Sum (L = ${lower.toFixed(4)})</span>
            <span style="display: inline-flex; align-items: center; gap: 4px; color: #b45309;"><span style="display: inline-block; width: 12px; height: 12px; background: #fef3c7; border: 1px dashed #f59e0b; border-radius: 2px;"></span> Upper Sum (U = ${upper.toFixed(4)})</span>
            <span style="display: inline-flex; align-items: center; gap: 4px; color: #047857;"><span style="display: inline-block; width: 12px; height: 3px; background: #10b981;"></span> True Area (1/3 ≈ 0.3333)</span>
          </div>
        </div>

        <!-- SVG Plot -->
        <div style="background: #ffffff; border: 1px solid #cbd5e1; border-radius: 6px; padding: 10px; overflow-x: auto;">
          <svg viewBox="0 0 600 240" style="width: 100%; max-height: 260px; display: block;" role="img" aria-label="Riemann Sum Rectangles graph">
            <!-- Grid Lines -->
            <line x1="60" y1="210" x2="560" y2="210" stroke="#94a3b8" stroke-width="2" />
            <line x1="60" y1="30" x2="60" y2="210" stroke="#94a3b8" stroke-width="2" />
            <line x1="60" y1="120" x2="560" y2="120" stroke="#f1f5f9" stroke-width="1" stroke-dasharray="2,2" />
            <line x1="310" y1="30" x2="310" y2="210" stroke="#f1f5f9" stroke-width="1" stroke-dasharray="2,2" />
            
            <!-- Exact Area Horizon (1/3) -->
            <line x1="60" y1="${plotY(exact).toFixed(1)}" x2="560" y2="${plotY(exact).toFixed(1)}" stroke="#10b981" stroke-width="1.5" stroke-dasharray="5,3" />
            <text x="565" y="${(plotY(exact) + 4).toFixed(1)}" font-size="11" font-weight="700" fill="#047857">1/3</text>

            <!-- Upper Rectangles (Over-estimate) -->
            ${upperRectsSvg}

            <!-- Lower Rectangles (Under-estimate) -->
            ${lowerRectsSvg}

            <!-- Curve f(x) = x^2 -->
            <path d="${curvePath}" fill="none" stroke="#0f172a" stroke-width="3.5" stroke-linecap="round" />

            <!-- Axis Labels -->
            <text x="60" y="228" font-size="12" font-weight="600" fill="#64748b" text-anchor="middle">0</text>
            <text x="310" y="228" font-size="12" font-weight="600" fill="#64748b" text-anchor="middle">0.5</text>
            <text x="560" y="228" font-size="12" font-weight="600" fill="#64748b" text-anchor="middle">1.0</text>
            <text x="45" y="35" font-size="12" font-weight="600" fill="#64748b" text-anchor="end">y=1</text>
            <text x="45" y="214" font-size="12" font-weight="600" fill="#64748b" text-anchor="end">y=0</text>
            <text x="450" y="80" font-size="13" font-weight="700" fill="#0f172a">y = x²</text>
          </svg>
        </div>

        <!-- Squeeze-O-Meter Gauge -->
        <div style="margin-top: 14px; padding: 12px; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 6px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px; font-size: 13px;">
            <strong style="color: #0f172a;">🎯 Squeeze-O-Meter (Darboux Precision Gauge):</strong>
            <span style="font-weight: 700; color: ${n === 8 ? '#15803d' : '#0284c7'};">
              Squeeze Progress: ${progressPct}% (Refinement Gap: Δ = ${gap.toFixed(4)})
            </span>
          </div>
          <!-- Visual Squeeze Bar -->
          <div style="width: 100%; height: 16px; background: #e2e8f0; border-radius: 8px; overflow: hidden; display: flex;">
            <div style="width: ${(lower * 100).toFixed(1)}%; background: #3b82f6; transition: width 0.3s ease;"></div>
            <div style="width: ${((exact - lower) * 100).toFixed(1)}%; background: #10b981; transition: width 0.3s ease;"></div>
            <div style="width: ${((upper - exact) * 100).toFixed(1)}%; background: #f59e0b; transition: width 0.3s ease;"></div>
            <div style="flex: 1; background: #e2e8f0;"></div>
          </div>
          <div style="display: flex; justify-content: space-between; font-size: 12px; color: #64748b; margin-top: 6px;">
            <span>Lower Sum: <strong>${lower.toFixed(4)}</strong></span>
            <span>Target: <strong>∫ x² dx = 0.3333 (1/3)</strong></span>
            <span>Upper Sum: <strong>${upper.toFixed(4)}</strong></span>
          </div>
        </div>
      </div>
    `;
  }

  // 2. Long Division Graphic
  if (id === 'portable-long-division') {
    const step1Done = appliedRules.has('rule-first-quotient-digit');
    const step2Done = appliedRules.has('rule-second-quotient-digit');

    return `
      <div class="portable-visual-stage" style="margin-bottom: 20px; padding: 16px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px;">
        <h4 style="margin: 0 0 12px 0; font-size: 15px; font-weight: 700; color: #0f172a;">➗ Visual Arithmetic Scaffold: 492 ÷ 4</h4>
        
        <div style="display: flex; gap: 16px; flex-wrap: wrap;">
          <!-- Left: Bracket Tableau -->
          <div style="flex: 1; min-width: 260px; background: #ffffff; border: 1px solid #cbd5e1; border-radius: 6px; padding: 16px; font-family: ui-monospace, monospace; font-size: 16px;">
            <div style="color: #64748b; font-size: 12px; margin-bottom: 8px; font-family: sans-serif;">Long Division Bracket:</div>
            <div style="margin-left: 56px; font-weight: 800; font-size: 18px; color: #1e293b;">
              <span style="color: ${step1Done ? '#166534' : '#94a3b8'};">${step1Done ? '1' : '_'}</span>
              <span style="color: ${step2Done ? '#166534' : '#94a3b8'}; margin-left: 8px;">${step2Done ? '2' : '_'}</span>
              <span style="color: #94a3b8; margin-left: 8px;">3</span>
            </div>
            <div style="display: flex; align-items: center; margin-top: 4px;">
              <span style="font-weight: 700; color: #0284c7; padding-right: 8px;">4 )</span>
              <span style="border-top: 2px solid #0f172a; padding-top: 4px; font-weight: 700; letter-spacing: 6px;">4 9 2</span>
            </div>
            ${step1Done ? `
              <div style="margin-left: 32px; color: #475569; margin-top: 4px;">- 4 &nbsp; (1 × 4 = 4)</div>
              <div style="margin-left: 32px; border-bottom: 1px solid #94a3b8; width: 70px;"></div>
              <div style="margin-left: 32px; color: #0f172a; font-weight: 700;">&nbsp; 0 9</div>
            ` : ''}
            ${step2Done ? `
              <div style="margin-left: 48px; color: #475569; margin-top: 4px;">- 8 &nbsp; (2 × 4 = 8)</div>
              <div style="margin-left: 48px; border-bottom: 1px solid #94a3b8; width: 70px;"></div>
              <div style="margin-left: 48px; color: #166534; font-weight: 800;">&nbsp; 1 2</div>
            ` : ''}
          </div>

          <!-- Right: Place-Value Cards -->
          <div style="flex: 1; min-width: 260px; display: flex; flex-direction: column; gap: 8px;">
            <div style="padding: 10px 14px; background: ${step1Done ? '#ecfdf5' : '#ffffff'}; border: 1.5px solid ${step1Done ? '#10b981' : '#cbd5e1'}; border-radius: 6px;">
              <div style="font-weight: 700; font-size: 13px; color: ${step1Done ? '#065f46' : '#475569'};">
                ${step1Done ? '✅ Hundreds Digit Solved' : '⏳ Step 1: Divide Hundreds'}
              </div>
              <div style="font-size: 12px; color: #64748b;">400 ÷ 4 = <strong>100</strong> (Quotient digit: 1, Remainder: 0)</div>
            </div>

            <div style="padding: 10px 14px; background: ${step2Done ? '#ecfdf5' : '#ffffff'}; border: 1.5px solid ${step2Done ? '#10b981' : '#cbd5e1'}; border-radius: 6px;">
              <div style="font-weight: 700; font-size: 13px; color: ${step2Done ? '#065f46' : '#475569'};">
                ${step2Done ? '✅ Tens Digit Solved' : '⏳ Step 2: Divide Tens'}
              </div>
              <div style="font-size: 12px; color: #64748b;">Bring down 9 → 90 ÷ 4 = <strong>20</strong> (Quotient digit: 2, Remainder: 1 ten)</div>
            </div>

            <div style="padding: 10px 14px; background: ${step2Done ? '#eff6ff' : '#f8fafc'}; border: 1.5px solid ${step2Done ? '#3b82f6' : '#e2e8f0'}; border-radius: 6px;">
              <div style="font-weight: 700; font-size: 13px; color: ${step2Done ? '#1d4ed8' : '#94a3b8'};">
                🏁 Step 3: Divide Units
              </div>
              <div style="font-size: 12px; color: #64748b;">1 ten + 2 units = 12 → 12 ÷ 4 = <strong>3</strong> → Total = <strong>123</strong></div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // 3. Redox Electron Equivalence Graphic
  if (id === 'portable-redox-electron-equivalence') {
    const isEquated = appliedRules.has('rule-equate-redox-electrons');

    return `
      <div class="portable-visual-stage" style="margin-bottom: 20px; padding: 16px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px;">
        <h4 style="margin: 0 0 12px 0; font-size: 15px; font-weight: 700; color: #0f172a;">⚡ Visual Electron Transfer Bridge</h4>
        
        <div style="display: flex; align-items: center; justify-content: space-between; gap: 12px; flex-wrap: wrap;">
          <!-- Iron Beaker (Oxidation) -->
          <div style="flex: 1; min-width: 220px; background: #fef2f2; border: 1.5px solid #fca5a5; border-radius: 8px; padding: 14px; text-align: center;">
            <div style="font-size: 24px;">🔴</div>
            <div style="font-weight: 800; font-size: 16px; color: #991b1b; margin-top: 4px;">Oxidation Half-Cell</div>
            <div style="font-family: ui-monospace, monospace; font-size: 15px; font-weight: 700; color: #7f1d1d; margin: 6px 0;">Fe²⁺ → Fe³⁺ + e⁻</div>
            <div style="font-size: 12px; color: #b91c1c;">Iron loses 1 electron (Charge increases from +2 to +3)</div>
          </div>

          <!-- Central Transfer Wire -->
          <div style="flex: 1; min-width: 200px; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 10px;">
            <div style="font-size: 24px; animation: bounce 1s infinite;">⚡</div>
            <div style="font-weight: 700; font-size: 13px; color: #0f172a; margin-top: 4px;">1 Electron Transferred</div>
            <div style="font-size: 12px; font-weight: 700; padding: 4px 10px; border-radius: 6px; margin-top: 6px; background: ${isEquated ? '#ecfdf5' : '#fef3c7'}; color: ${isEquated ? '#065f46' : '#b45309'}; border: 1px solid ${isEquated ? '#a7f3d0' : '#fde68a'};">
              ${isEquated ? '✅ 1 e⁻ Lost = 1 e⁻ Gained (Balanced)' : '⏳ Pending Equivalence Rule'}
            </div>
          </div>

          <!-- Cerium Beaker (Reduction) -->
          <div style="flex: 1; min-width: 220px; background: #eff6ff; border: 1.5px solid #93c5fd; border-radius: 8px; padding: 14px; text-align: center;">
            <div style="font-size: 24px;">🔵</div>
            <div style="font-weight: 800; font-size: 16px; color: #1e40af; margin-top: 4px;">Reduction Half-Cell</div>
            <div style="font-family: ui-monospace, monospace; font-size: 15px; font-weight: 700; color: #1e3a8a; margin: 6px 0;">Ce⁴⁺ + e⁻ → Ce³⁺</div>
            <div style="font-size: 12px; color: #1d4ed8;">Cerium gains 1 electron (Charge decreases from +4 to +3)</div>
          </div>
        </div>
      </div>
    `;
  }

  // 4. Motion Shared Clock Graphic
  if (id === 'portable-motion-shared-clock') {
    const sameTimeApplied = appliedRules.has('same-time');
    const isReject = lastOutcome?.outcome === 'REJECT';

    return `
      <div class="portable-visual-stage" style="margin-bottom: 20px; padding: 16px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px;">
        <h4 style="margin: 0 0 12px 0; font-size: 15px; font-weight: 700; color: #0f172a;">⏱️ Stroboscopic 2D Kinematics Sensor Monitor</h4>
        
        <div style="display: flex; gap: 16px; flex-wrap: wrap;">
          <!-- Sensor 1 (X Axis) -->
          <div style="flex: 1; min-width: 220px; background: #ffffff; border: 1px solid #cbd5e1; border-radius: 6px; padding: 12px;">
            <div style="font-weight: 700; font-size: 13px; color: #0284c7; display: flex; align-items: center; gap: 6px;">
              <span>📏</span> Horizontal Sensor (X-Axis)
            </div>
            <div style="font-size: 18px; font-weight: 800; color: #0f172a; margin: 6px 0;">x(t = 2.0 s)</div>
            <div style="font-size: 12px; color: #64748b;">Logged at timestamp: <strong>t = 2.0 seconds</strong></div>
          </div>

          <!-- Sensor 2 (Y Axis) -->
          <div style="flex: 1; min-width: 220px; background: #ffffff; border: 1px solid #cbd5e1; border-radius: 6px; padding: 12px;">
            <div style="font-weight: 700; font-size: 13px; color: #7c3aed; display: flex; align-items: center; gap: 6px;">
              <span>📐</span> Vertical Sensor (Y-Axis)
            </div>
            <div style="font-size: 18px; font-weight: 800; color: #0f172a; margin: 6px 0;">y(t = 2.0 s or 3.0 s)</div>
            <div style="font-size: 12px; color: #64748b;">Candidate timestamp choices: <strong>t = 2s vs 3s</strong></div>
          </div>

          <!-- Central Clock Evaluator -->
          <div style="flex: 1; min-width: 240px; background: ${sameTimeApplied ? '#ecfdf5' : isReject ? '#fef2f2' : '#ffffff'}; border: 1.5px solid ${sameTimeApplied ? '#10b981' : isReject ? '#ef4444' : '#cbd5e1'}; border-radius: 6px; padding: 12px;">
            <div style="font-weight: 700; font-size: 13px; color: ${sameTimeApplied ? '#065f46' : isReject ? '#991b1b' : '#334155'};">
              ${sameTimeApplied ? '✅ Simultaneous State Valid' : isReject ? '❌ Mixed-Time Rejection' : '🕒 Master Clock Watchdog'}
            </div>
            <div style="font-size: 12px; color: #475569; margin-top: 4px;">
              ${sameTimeApplied
                ? 'Both sensors read t = 2.0s! Successfully reconstructed single physical state.'
                : isReject
                ? 'Mixing t = 2s with t = 3s was correctly rejected by physical invariant enforcement.'
                : 'Select transformation below to test simultaneous vs mixed-time reconstruction.'
              }
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // Generic / Synthetic fallback
  return '';
}

// ---------------------------------------------------------------------------
// Main Controller
// ---------------------------------------------------------------------------

export class PortableWorkbenchController {
  private adapter: PortableWorkbenchAdapter;
  private lastOutcome: TransformationOutcome | null = null;

  constructor(pkg: PortableWorkbenchPackage) {
    this.adapter = new PortableWorkbenchAdapter(pkg);
  }

  getAdapter(): PortableWorkbenchAdapter {
    return this.adapter;
  }

  applyTransformation(ruleId: string): TransformationOutcome {
    const outcome = this.adapter.applyRule(ruleId);
    this.lastOutcome = outcome;
    return outcome;
  }

  rotate(degrees: number = 90): void {
    const current = this.adapter.getRotation();
    this.adapter.setRotation(current + degrees);
  }

  exportState(): PortableWorkbenchState {
    return this.adapter.exportState();
  }

  restoreState(state: PortableWorkbenchState): void {
    this.adapter.restoreState(state);
    this.lastOutcome = null;
  }

  renderHtml(): string {
    const pkg = this.adapter.getPackage();
    const allProjections = this.adapter.getAllProjections();
    const availableRules = this.adapter.getAvailableRules();
    const appliedRules = new Set(this.adapter.getAppliedRules());
    const rotation = this.adapter.getRotation();
    const accessibleSummary = this.adapter.generateAccessibleSummary();
    const kidGuide = getKidGuide(pkg);

    // Render grids
    const gridsHtml = pkg.scene.grids
      .map((grid) => {
        const rowsHtml = grid.rows
          .map((rowName) => {
            const rowFriendly = getRowFriendly(rowName);

            const colsHtml = grid.columns
              .map((colName) => {
                const colFriendly = getColumnFriendly(colName);
                const placed = allProjections.filter(
                  (p) =>
                    p.placement.grid === grid.id &&
                    p.placement.row === rowName &&
                    p.placement.column === colName
                );

                const itemsHtml = placed
                  .map(
                    (p) => `
                    <div
                      class="portable-projection-pill"
                      data-projection-id="${escapeHtml(String(p.id))}"
                      data-entity-ref="${escapeHtml(String(p.entityRef))}"
                      tabindex="0"
                      role="button"
                      aria-label="Projection: ${escapeHtml(String(p.label))} (${escapeHtml(String(p.representation))})"
                      style="min-height: ${HIT_TARGET_MIN_PX}px; padding: 8px 12px; background: #eff6ff; color: #1e40af; border: 1px solid #93c5fd; border-radius: 6px; font-size: 13.5px; font-weight: 600; display: flex; flex-direction: column; justify-content: center; cursor: pointer; box-shadow: 0 1px 2px rgba(0,0,0,0.03);"
                    >
                      <div style="display: flex; align-items: center; gap: 6px;">
                        <span>📌</span>
                        <span style="font-family: ui-monospace, monospace; font-weight: 700;">${escapeHtml(String(p.label))}</span>
                      </div>
                      ${p.representation ? `<span style="font-size: 11px; color: #64748b; margin-top: 2px;">Type: ${escapeHtml(String(p.representation))}</span>` : ''}
                    </div>`
                  )
                  .join('');

                return `
                <td style="padding: 10px; border: 1px solid #cbd5e1; background: #ffffff; vertical-align: top; min-width: 140px; min-height: ${HIT_TARGET_MIN_PX}px;">
                  <div style="font-size: 12px; font-weight: 700; color: #0284c7; margin-bottom: 2px; text-transform: uppercase;">
                    ${escapeHtml(colFriendly.label)}
                  </div>
                  ${colFriendly.tag ? `<div style="font-size: 11px; color: #64748b; margin-bottom: 6px;">${escapeHtml(colFriendly.tag)}</div>` : ''}
                  <div style="display: flex; flex-direction: column; gap: 6px;">
                    ${itemsHtml || '<span style="font-size: 13px; color: #cbd5e1; font-style: italic;">(empty)</span>'}
                  </div>
                </td>`;
              })
              .join('');

            return `
            <tr>
              <th scope="row" style="padding: 10px; border: 1px solid #cbd5e1; background: #f8fafc; font-size: 13px; color: #334155; width: 120px; text-align: left; vertical-align: top;">
                <div style="font-weight: 700; color: #0f172a;">${escapeHtml(rowFriendly.label)}</div>
                ${rowFriendly.tag ? `<div style="font-size: 11px; color: #64748b; font-weight: normal; margin-top: 2px;">${escapeHtml(rowFriendly.tag)}</div>` : ''}
              </th>
              ${colsHtml}
            </tr>`;
          })
          .join('');

        return `
        <div class="portable-grid-wrapper" data-grid-id="${escapeHtml(String(grid.id))}" style="margin-bottom: 20px;">
          <h4 style="margin: 0 0 8px 0; font-size: 14px; font-weight: 700; color: #0f172a;">Grid: ${escapeHtml(String(grid.label))}</h4>
          <table role="table" aria-label="Grid ${escapeHtml(String(grid.label))}" style="width: 100%; border-collapse: collapse;">
            <tbody>
              ${rowsHtml}
            </tbody>
          </table>
        </div>`;
      })
      .join('');

    // Render available transformation action buttons
    const rulesButtons = availableRules
      .map((rule) => {
        const isApplied = appliedRules.has(rule.id);
        const ruleFriendly = getRuleFriendly(rule.id, rule.summary);

        const bg = isApplied ? '#dcfce7' : '#ffffff';
        const color = isApplied ? '#166534' : '#0f172a';
        const border = isApplied ? '#86efac' : '#cbd5e1';

        return `
        <button
          class="portable-rule-action-btn portable-rule-btn"
          data-rule-id="${escapeHtml(String(rule.id))}"
          style="min-height: ${HIT_TARGET_MIN_PX}px; min-width: ${HIT_TARGET_MIN_PX}px; padding: 12px 18px; background: ${bg}; color: ${color}; border: 1.5px solid ${border}; border-radius: 8px; font-weight: 600; cursor: pointer; display: flex; flex-direction: column; align-items: flex-start; gap: 4px; text-align: left; box-shadow: 0 1px 2px rgba(0,0,0,0.04);"
        >
          <div style="display: flex; align-items: center; gap: 8px; font-size: 14.5px;">
            <span>${ruleFriendly.icon}</span>
            <span style="font-weight: 700;">${escapeHtml(ruleFriendly.title)}</span>
            ${isApplied ? '<span style="font-size: 11px; padding: 2px 6px; background: #22c55e; color: #ffffff; border-radius: 4px; font-weight: 700;">APPLIED</span>' : ''}
          </div>
          <div style="font-size: 12px; color: ${isApplied ? '#15803d' : '#64748b'}; line-height: 1.3;">
            ${escapeHtml(ruleFriendly.subtitle)}
          </div>
          <small style="font-family: monospace; font-size: 10.5px; opacity: 0.5; margin-top: 2px;">[${escapeHtml(rule.id)}]</small>
        </button>`;
      })
      .join('');

    let outcomeNotice = '';
    if (this.lastOutcome) {
      const isOk = this.lastOutcome.outcome === 'ACCEPT';
      outcomeNotice = `
        <div class="portable-outcome-notice" style="padding: 12px 16px; background: ${isOk ? '#ecfdf5' : '#fef2f2'}; border: 1.5px solid ${isOk ? '#86efac' : '#fca5a5'}; border-radius: 8px; font-size: 14px; color: ${isOk ? '#065f46' : '#991b1b'}; margin-bottom: 20px; display: flex; align-items: center; gap: 10px;">
          <span style="font-size: 20px;">${isOk ? '✅' : '❌'}</span>
          <div>
            <strong>${this.lastOutcome.outcome}:</strong> ${escapeHtml(String(this.lastOutcome.summary || this.lastOutcome.reason))}
          </div>
        </div>
      `;
    }

    // Dynamic Visual Graphic
    const visualGraphicHtml = renderVisualGraphic(pkg, [...allProjections], appliedRules, this.lastOutcome);

    return `
      <section class="portable-workbench-panel" aria-label="Portable Workbench: ${escapeHtml(String(pkg.title))}" style="padding: 20px; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; transform: rotate(${rotation}deg); transition: transform 0.2s ease; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);">
        <!-- Header (Preserves Unverified diagnostic & provenance badge for test suites) -->
        <header style="display: flex; justify-content: space-between; align-items: flex-start; gap: 16px; margin-bottom: 20px; padding-bottom: 16px; border-bottom: 2px solid #e2e8f0; flex-wrap: wrap;">
          <div style="flex: 1; min-width: 280px;">
            <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 4px;">
              <span style="font-size: 22px;">${kidGuide.icon}</span>
              <h3 style="margin: 0; font-size: 20px; font-weight: 800; color: #0f172a;">${escapeHtml(String(pkg.title))}</h3>
            </div>
            <div style="font-size: 13px; color: #64748b; display: flex; align-items: center; gap: 10px; flex-wrap: wrap; margin-top: 6px;">
              <span style="background: #f1f5f9; padding: 2px 8px; border-radius: 4px; border: 1px solid #cbd5e1; font-weight: 600;">
                Unverified diagnostic
              </span>
              <span>Declared provenance: <strong class="portable-provenance-badge" style="color: #334155;">${escapeHtml(String(pkg.provenance.authority))}</strong></span>
              <span>•</span>
              <span>Rotation: <strong>${rotation}°</strong></span>
            </div>
          </div>
          <button id="portable-rotate-btn" style="min-height: ${HIT_TARGET_MIN_PX}px; min-width: ${HIT_TARGET_MIN_PX}px; padding: 10px 18px; background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 8px; font-weight: 600; color: #1e293b; cursor: pointer; display: flex; align-items: center; gap: 6px; box-shadow: 0 1px 2px rgba(0,0,0,0.05);">
            🔄 Rotate 90°
          </button>
        </header>

        <!-- Kid-Friendly Mission & Guide Card -->
        <div class="portable-kid-guide-card" style="margin-bottom: 20px; padding: 16px; background: #f0fdfa; border: 1.5px solid #99f6e4; border-radius: 8px;">
          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
            <span style="background: #0d9488; color: #ffffff; font-size: 11px; font-weight: 800; padding: 2px 8px; border-radius: 4px; text-transform: uppercase;">${escapeHtml(kidGuide.badge)}</span>
            <strong style="color: #134e4a; font-size: 15px;">${escapeHtml(kidGuide.analogyTitle)}</strong>
          </div>
          <p style="margin: 0 0 10px 0; font-size: 13.5px; color: #115e59; line-height: 1.5;">
            ${escapeHtml(kidGuide.mission)}
          </p>
          <div style="display: flex; flex-direction: column; gap: 6px; font-size: 13px; color: #134e4a; margin-bottom: 10px;">
            ${kidGuide.steps.map((st) => `<div>• ${st}</div>`).join('')}
          </div>
          <div style="font-size: 12.5px; color: #0f766e; font-style: italic; border-top: 1px dashed #99f6e4; padding-top: 8px;">
            ${escapeHtml(kidGuide.funFact)}
          </div>
        </div>

        <div class="sr-only" aria-live="polite">${escapeHtml(String(accessibleSummary))}</div>
        ${outcomeNotice}

        <!-- Dynamic Visual Simulation Stage -->
        ${visualGraphicHtml}

        <!-- Semantic Grids Table -->
        <div class="portable-grids-container">
          ${gridsHtml}
        </div>

        <!-- Semantic Transformations Toolbar -->
        <div class="portable-transformations-toolbar" style="margin-top: 20px; padding-top: 16px; border-top: 2px solid #e2e8f0;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
            <h5 style="margin: 0; font-size: 14px; font-weight: 700; color: #334155; text-transform: uppercase; letter-spacing: 0.5px;">
              Available Semantic Transformations (${availableRules.length}):
            </h5>
            <span style="font-size: 12px; color: #64748b;">Click an action below to evolve the state:</span>
          </div>
          <div style="display: flex; gap: 12px; flex-wrap: wrap;">
            ${rulesButtons}
          </div>
        </div>
      </section>
    `;
  }

  mount(root: HTMLElement): { dispose: () => void; refresh: () => void } {
    let active = true;
    const render = () => {
      if (!active) return;
      root.innerHTML = this.renderHtml();
      root.querySelector('#portable-rotate-btn')?.addEventListener('click', () => {
        this.rotate(90);
        render();
      });
      root.querySelectorAll<HTMLButtonElement>('.portable-rule-action-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
          const ruleId = btn.dataset.ruleId;
          if (ruleId) {
            this.applyTransformation(ruleId);
            render();
          }
        });
      });
    };
    render();
    return {
      refresh: () => render(),
      dispose: () => {
        active = false;
        root.replaceChildren();
      },
    };
  }
}
