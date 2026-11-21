#!/usr/bin/env python3
"""
Full generator for all 4 physics topic workspaces:
1. motion-1d (Motion in One Dimension)
2. motion-2d (Motion in a Plane (2D))
3. nlm (Newton's Laws of Motion)
4. vectors (Vector Methods in Physics)
"""

import os

def build_motion_1d():
    return """<!doctype html>
<html lang="en" data-g9-shell>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Motion in One Dimension Workspace · Grade9V3.5</title>
  <link rel="stylesheet" href="../../css/modern-learner.css">
  <style>
    .study-unit-card {
      background: var(--bg-card, #ffffff);
      border: 1px solid var(--border, #e2e8f0);
      border-radius: var(--radius-md, 14px);
      padding: 1.5rem;
      margin-bottom: 2rem;
      box-shadow: var(--shadow-sm);
    }
    .study-unit-header {
      border-bottom: 2px solid var(--bg-soft, #f1f5f9);
      padding-bottom: 1rem;
      margin-bottom: 1.25rem;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      flex-wrap: wrap;
      gap: 10px;
    }
    .unit-tag {
      font-size: 0.82rem;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      padding: 3px 10px;
      border-radius: 999px;
      background: var(--accent-learn-bg, #eef2ff);
      color: var(--accent-learn, #4f46e5);
    }
    .unit-title {
      font-size: 1.35rem;
      font-weight: 800;
      color: var(--text-main, #0f172a);
      margin: 0.35rem 0 0;
    }
    .key-step-box {
      background: #eff6ff;
      border-left: 4px solid #3b82f6;
      border-radius: 0 10px 10px 0;
      padding: 12px 16px;
      margin: 1rem 0;
      color: #1e3a8a;
    }
    [data-theme="dark"] .key-step-box {
      background: #172554;
      border-left-color: #60a5fa;
      color: #dbeafe;
    }
    .key-step-title {
      font-size: 0.85rem;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-bottom: 4px;
      color: #2563eb;
    }
    [data-theme="dark"] .key-step-title {
      color: #93c5fd;
    }
    .derivation-steps {
      display: grid;
      gap: 10px;
      margin: 1.25rem 0;
    }
    .step-item {
      display: grid;
      grid-template-columns: 32px 1fr;
      gap: 12px;
      align-items: baseline;
      padding: 10px 12px;
      background: var(--bg-soft, #f8fafc);
      border-radius: 8px;
      border: 1px solid var(--border, #e2e8f0);
    }
    .step-badge {
      display: inline-grid;
      place-items: center;
      width: 28px;
      height: 28px;
      border-radius: 50%;
      background: var(--accent-learn, #4f46e5);
      color: #ffffff;
      font-weight: 800;
      font-size: 0.85rem;
    }
    .step-content strong {
      color: var(--text-main, #0f172a);
      display: block;
      margin-bottom: 2px;
    }
    .step-content em {
      font-style: normal;
      color: var(--text-muted, #64748b);
      font-size: 0.9rem;
      display: block;
    }
    .worked-box {
      border: 1px solid #cbd5e1;
      border-radius: 12px;
      padding: 1.25rem;
      background: var(--bg-soft, #f8fafc);
      margin: 1.25rem 0;
    }
    .worked-title {
      font-size: 0.95rem;
      font-weight: 800;
      color: #0369a1;
      display: flex;
      align-items: center;
      gap: 6px;
      margin-bottom: 8px;
    }
    .trap-box {
      background: #fff7ed;
      border: 1px solid #fed7aa;
      border-radius: 10px;
      padding: 12px 16px;
      color: #9a3412;
      margin: 1rem 0;
    }
    [data-theme="dark"] .trap-box {
      background: #2a1b0e;
      border-color: #7c2d12;
      color: #fdba74;
    }
    .trap-title {
      font-size: 0.85rem;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-bottom: 4px;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .quick-check-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 10px;
      margin-top: 1rem;
    }
    .check-card {
      border: 1px solid var(--border, #e2e8f0);
      border-radius: 8px;
      padding: 10px 14px;
      background: var(--bg-card, #ffffff);
    }
    .jump-nav {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin: 1.25rem 0 2rem;
      position: sticky;
      top: 60px;
      z-index: 20;
      background: rgba(248, 250, 252, 0.95);
      backdrop-filter: blur(8px);
      padding: 10px 0;
      border-bottom: 1px solid var(--border, #e2e8f0);
    }
    [data-theme="dark"] .jump-nav {
      background: rgba(13, 17, 23, 0.95);
    }
    .jump-chip {
      font-size: 0.85rem;
      font-weight: 700;
      padding: 6px 14px;
      border-radius: 999px;
      border: 1px solid var(--border, #e2e8f0);
      background: var(--bg-card, #ffffff);
      color: var(--text-main, #0f172a);
      text-decoration: none;
      transition: all 0.15s ease;
    }
    .jump-chip:hover {
      border-color: #38bdf8;
      background: #e0f2fe;
      color: #0369a1;
    }
    .formula-tag {
      font-family: ui-monospace, Menlo, Monaco, Consolas, monospace;
      font-size: 1.05rem;
      font-weight: 700;
      background: var(--bg-soft, #f1f5f9);
      padding: 3px 8px;
      border-radius: 6px;
      color: #0284c7;
      display: inline-block;
      margin: 4px 0;
    }
  </style>
</head>
<body>
  <header class="g9-shell-header">
    <div class="g9-header-inner">
      <a class="g9-brand" href="../../index.html">
        <span class="logo-icon">⚡</span>
        <span class="brand-title">Grade9V3.5</span>
        <span class="g9-brand-badge">Learner Platform</span>
      </a>
      <nav class="g9-header-nav" aria-label="Portal Navigation">
        <a href="../../index.html">Home</a>
        <a href="../../physics/index.html">Physics</a>
        <a href="../../chemistry/index.html">Chemistry</a>
        <a href="../../mathematics/index.html">Mathematics</a>
        <a href="../../question-bank/index.html">Question Bank</a>
      </nav>
      <div class="g9-header-actions">
        <button type="button" class="g9-header-btn g9-search-btn" data-g9-action="search" title="Search Grade9V3 (Ctrl/⌘ K)" aria-label="Search">
          <span class="g9-btn-icon">🔍</span>
          <span class="g9-btn-text">Search</span>
        </button>
        <button type="button" class="g9-header-btn g9-display-btn" data-g9-action="display" title="Display & Theme Settings" aria-label="Display & Theme">
          <span class="g9-btn-icon">🌙 / ☀️</span>
          <span class="g9-btn-text">Display</span>
        </button>
      </div>
    </div>
  </header>
  
  <nav class="g9-breadcrumb-bar" aria-label="Breadcrumb">
    <div class="g9-breadcrumbs">
      <a href="../../index.html">Home</a> <span>/</span> <a href="../../physics/index.html">Physics</a> <span>/</span> <span>Motion in One Dimension</span>
    </div>
  </nav>

  <main class="g9-container">
    <!-- Hero Workspace Header -->
    <div class="g9-hero" style="margin-bottom:1.5rem;">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:12px;">
        <div>
          <div style="display:flex;gap:8px;align-items:center;margin-bottom:6px;">
            <span class="unit-tag" style="background:#e0f2fe;color:#0284c7;">Physics · Kinematics</span>
            <span class="unit-tag" style="background:#dcfce7;color:#166534;">Core 1A Structured Theory</span>
            <span class="unit-tag" style="background:#fef3c7;color:#b45309;">6 Complete Learning Units</span>
          </div>
          <h1 class="g9-hero-title" style="margin:0 0 6px;">Motion in One Dimension Workspace</h1>
          <p class="g9-hero-subtitle" style="margin:0;">Complete structured study curriculum: distance vs. displacement, average velocity weighting, constant-acceleration kinematics hub, vertical free fall under gravity, calculus graphical area translation, and multi-stage pursuit & braking.</p>
        </div>
      </div>
    </div>

    <!-- Quick Action Launch Bar -->
    <div style="display:flex;gap:10px;flex-wrap:wrap;margin-bottom:1.5rem;padding:12px 16px;background:var(--bg-soft, #f8fafc);border:1px solid var(--border, #e2e8f0);border-radius:12px;">
      <a class="g9-btn-action g9-btn-explore" href="../../physics/motion-1d/explorers/motion_in_1d/index.html" style="font-weight:700;">
        ⚡ Motion in 1D Interactive Suite &rarr;
      </a>
      <a class="g9-btn-action g9-btn-learn" href="../../physics/motion-1d/core1a.html" style="font-weight:700;">
        📖 Core Study (All 11 Units) &rarr;
      </a>
      <a class="g9-btn-action g9-btn-qb" href="../../question-bank/index.html?subject=Physics&topic=motion-1d&mode=study" style="font-weight:700;">
        🎯 Practice in Question Bank (Core 2) &rarr;
      </a>
      <a class="g9-btn-action g9-btn-learn" href="../../standalone/practice/core1a-motion-1d-straight-line-tablet.html" style="font-weight:700;">
        📱 Dedicated Fullscreen Tablet App &rarr;
      </a>
    </div>

    <!-- Sticky Concept Jump Navigation -->
    <div class="jump-nav" aria-label="Quick Jump to Study Units">
      <span style="font-size:0.85rem;font-weight:800;color:var(--text-muted);align-self:center;margin-right:4px;">Jump to Unit:</span>
      <a href="#unit-1" class="jump-chip">1. Distance vs Displacement</a>
      <a href="#unit-2" class="jump-chip">2. Average Speed Weighting</a>
      <a href="#unit-3" class="jump-chip">3. Kinematic Equations Hub</a>
      <a href="#unit-4" class="jump-chip">4. Free Fall Under Gravity</a>
      <a href="#unit-5" class="jump-chip">5. Calculus Graphs &amp; Areas</a>
      <a href="#unit-6" class="jump-chip">6. Reaction &amp; Braking</a>
    </div>

    <!-- STUDY UNIT 1 -->
    <article class="study-unit-card" id="unit-1">
      <div class="study-unit-header">
        <div>
          <span class="unit-tag">Unit 1 of 6 · Kinematic Fundamentals</span>
          <h2 class="unit-title">Distance vs. Displacement &amp; Path Reversal</h2>
        </div>
        <div class="formula-tag">Δx = x_f - x_i &nbsp;|&nbsp; s = ∫ |v(t)| dt ≥ |Δx|</div>
      </div>

      <div class="key-step-box">
        <div class="key-step-title">⚡ The Crucial Inferential Step</div>
        <p style="margin:0;font-size:0.95rem;line-height:1.5;">Distance <em>s</em> is the total accumulated scalar length of path traversed. Displacement <em>Δx</em> is the net vector change in position from start to finish. In strictly unidirectional motion without reversal, <strong>s = |Δx|</strong>. The exact instant velocity changes sign (v = 0), distance continues monotonically increasing while displacement magnitude decreases: <strong>s > |Δx|</strong>.</p>
      </div>

      <!-- SVG Illustration -->
      <div style="background:#ffffff;border:1px solid #cbd5e1;border-radius:10px;padding:12px;margin:1rem 0;text-align:center;">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 460 180" style="max-width:100%;height:auto;max-height:180px;">
          <!-- Axis -->
          <line x1="30" y1="110" x2="430" y2="110" stroke="#475569" stroke-width="2.5" />
          <polygon points="430,105 442,110 430,115" fill="#475569" />
          <!-- Ticks -->
          <g stroke="#475569" stroke-width="1.5" font-size="14" font-weight="700" text-anchor="middle" fill="#334155" font-family="system-ui">
            <line x1="60" y1="102" x2="60" y2="118" /><text x="60" y="136">-2m</text>
            <line x1="120" y1="102" x2="120" y2="118" /><text x="120" y="136">0m</text>
            <line x1="180" y1="102" x2="180" y2="118" /><text x="180" y="136">+2m</text>
            <line x1="240" y1="102" x2="240" y2="118" /><text x="240" y="136">+4m</text>
            <line x1="300" y1="102" x2="300" y2="118" /><text x="300" y="136">+6m</text>
            <line x1="360" y1="102" x2="360" y2="118" /><text x="360" y="136">+8m</text>
          </g>
          <!-- Forward Leg 1: 0 to +8m -->
          <path d="M 120,95 Q 240,30 360,95" fill="none" stroke="#0284c7" stroke-width="3" stroke-dasharray="4,3" />
          <polygon points="360,95 352,85 348,97" fill="#0284c7" />
          <text x="240" y="42" fill="#0284c7" font-size="14" font-weight="700" text-anchor="middle" font-family="system-ui">Leg 1: +8 m (Forward)</text>
          <!-- Reverse Leg 2: +8 to +2m -->
          <path d="M 360,95 Q 270,165 180,95" fill="none" stroke="#dc2626" stroke-width="3" stroke-dasharray="4,3" />
          <polygon points="180,95 188,85 192,97" fill="#dc2626" />
          <text x="270" y="165" fill="#dc2626" font-size="14" font-weight="700" text-anchor="middle" font-family="system-ui">Leg 2: -6 m (Reversal)</text>
          <!-- Displacement Vector -->
          <line x1="120" y1="80" x2="180" y2="80" stroke="#16a34a" stroke-width="4" />
          <polygon points="180,80 172,74 172,86" fill="#16a34a" />
          <text x="150" y="70" fill="#16a34a" font-size="14" font-weight="800" text-anchor="middle" font-family="system-ui">Net Δx = +2 m</text>
          <circle cx="120" cy="110" r="5" fill="#0284c7" />
          <circle cx="360" cy="110" r="5" fill="#dc2626" />
          <circle cx="180" cy="110" r="5" fill="#16a34a" />
        </svg>
      </div>

      <div class="derivation-steps">
        <div class="step-item">
          <span class="step-badge">1</span>
          <div class="step-content">
            <strong>Establish Origin &amp; Fixed Sign Convention</strong>
            <em>Declare x = 0 and positive direction (e.g. rightwards/upwards positive). Never switch conventions mid-calculation.</em>
          </div>
        </div>
        <div class="step-item">
          <span class="step-badge">2</span>
          <div class="step-content">
            <strong>Identify Turning Points via v(t) = 0</strong>
            <em>Roots of instantaneous velocity equation partition the total journey into strictly monotonic directional segments.</em>
          </div>
        </div>
        <div class="step-item">
          <span class="step-badge">3</span>
          <div class="step-content">
            <strong>Integrate Absolute Speed for Path Distance</strong>
            <em>Total distance s = Σ |Δx_k| = ∫ |v(t)| dt. Each segment length is added as a positive scalar.</em>
          </div>
        </div>
        <div class="step-item">
          <span class="step-badge">4</span>
          <div class="step-content">
            <strong>Vector Subtraction for Net Displacement</strong>
            <em>Net displacement Δx = x_final - x_initial. Ratio |Δx| / s is always ≤ 1.</em>
          </div>
        </div>
      </div>

      <div class="worked-box">
        <div class="worked-title">💡 Worked Problem: Reversal Kinematics</div>
        <p style="margin:0 0 8px;font-size:0.92rem;line-height:1.5;"><strong>Problem:</strong> A particle starts at x = 0, moves to x = +8 m in 4 s, then reverses direction to x = +2 m in 2 s. Find total distance, net displacement, average speed, and average velocity.</p>
        <div style="background:var(--bg-card, #fff);border:1px solid #e2e8f0;border-radius:8px;padding:10px 14px;font-size:0.9rem;line-height:1.5;">
          <strong>Solution:</strong><br>
          1. Leg 1: Δx₁ = 8 - 0 = +8 m, length s₁ = 8 m.<br>
          2. Leg 2: Δx₂ = 2 - 8 = -6 m, length s₂ = 6 m.<br>
          3. Total distance: s = 8 + 6 = <strong>14 m</strong>.<br>
          4. Net displacement: Δx = x_f - x_i = 2 - 0 = <strong>+2 m</strong>.<br>
          5. Average speed = total distance / total time = 14 m / 6 s = <strong>2.33 m/s</strong>.<br>
          6. Average velocity = net displacement / total time = +2 m / 6 s = <strong>+0.33 m/s</strong>.
        </div>
      </div>

      <div class="trap-box">
        <div class="trap-title">⚠️ Common Trap &amp; Error Prevention</div>
        <p style="margin:0;font-size:0.92rem;"><strong>Trap:</strong> Evaluating ∫ v dt to find distance when velocity reverses sign.<br>
        <strong>Repair:</strong> ∫ v dt always evaluates net displacement Δx. Distance requires integrating absolute speed ∫ |v| dt or piecewise summing each segment length.</p>
      </div>
    </article>

    <!-- STUDY UNIT 2 -->
    <article class="study-unit-card" id="unit-2">
      <div class="study-unit-header">
        <div>
          <span class="unit-tag">Unit 2 of 6 · Kinematic Rates</span>
          <h2 class="unit-title">Average Speed: Equal-Time vs. Equal-Distance Weighting</h2>
        </div>
        <div class="formula-tag">v_time = (v₁ + v₂)/2 &nbsp;|&nbsp; v_dist = 2v₁v₂/(v₁ + v₂)</div>
      </div>

      <div class="key-step-box">
        <div class="key-step-title">⚡ The Crucial Inferential Step</div>
        <p style="margin:0;font-size:0.95rem;line-height:1.5;">Average speed is ALWAYS total distance divided by total elapsed time. When split equally in <strong>time</strong> (t₁ = t₂), the result is the <strong>Arithmetic Mean</strong> (biased toward higher speed). When split equally in <strong>distance</strong> (d₁ = d₂), the result is the <strong>Harmonic Mean</strong> (biased toward slower speed, because more time is spent at the lower speed). By the AM-HM inequality: <strong>v_harmonic ≤ v_arithmetic</strong>, equality holds iff v₁ = v₂.</p>
      </div>

      <div class="derivation-steps">
        <div class="step-item">
          <span class="step-badge">1</span>
          <div class="step-content">
            <strong>Equal Time Interval Derivation</strong>
            <em>Let total time T = 2t. Distance d = v₁ t + v₂ t. Average speed v_avg = d / T = (v₁ + v₂)t / (2t) = <strong>(v₁ + v₂)/2</strong>.</em>
          </div>
        </div>
        <div class="step-item">
          <span class="step-badge">2</span>
          <div class="step-content">
            <strong>Equal Distance Interval Derivation</strong>
            <em>Let total distance D = 2d. Times are t₁ = d/v₁ and t₂ = d/v₂. Total time T = d(1/v₁ + 1/v₂) = d(v₁ + v₂)/(v₁v₂).</em>
          </div>
        </div>
        <div class="step-item">
          <span class="step-badge">3</span>
          <div class="step-content">
            <strong>Harmonic Mean Formula</strong>
            <em>v_avg = 2d / [d(v₁ + v₂)/(v₁v₂)] = <strong>2v₁v₂ / (v₁ + v₂)</strong>.</em>
          </div>
        </div>
      </div>

      <div class="worked-box">
        <div class="worked-title">💡 Classic Application: Journey Return Speed</div>
        <p style="margin:0 0 8px;font-size:0.92rem;line-height:1.5;"><strong>Problem:</strong> A vehicle travels from Town A to Town B at 40 km/h and immediately returns from B to A along the same route at 60 km/h. What is the average speed of the round trip?</p>
        <div style="background:var(--bg-card, #fff);border:1px solid #e2e8f0;border-radius:8px;padding:10px 14px;font-size:0.9rem;line-height:1.5;">
          <strong>Solution:</strong><br>
          1. Equal distance segments (d outgoing = d return = d).<br>
          2. Apply Harmonic Mean: v_avg = 2 × 40 × 60 / (40 + 60) = 4800 / 100 = <strong>48 km/h</strong>.<br>
          3. Notice: (40 + 60)/2 = 50 km/h is completely FALSE because the car spent 1.5× more time traveling at the slower 40 km/h rate.
        </div>
      </div>

      <div class="trap-box">
        <div class="trap-title">⚠️ Common Trap &amp; Error Prevention</div>
        <p style="margin:0;font-size:0.92rem;"><strong>Trap:</strong> Applying arithmetic average (v₁ + v₂)/2 to equal distance problems.<br>
        <strong>Repair:</strong> Always check the weighting variable. Equal distance → Harmonic Mean. Equal time → Arithmetic Mean.</p>
      </div>
    </article>

    <!-- STUDY UNIT 3 -->
    <article class="study-unit-card" id="unit-3">
      <div class="study-unit-header">
        <div>
          <span class="unit-tag">Unit 3 of 6 · Mathematical Backbone</span>
          <h2 class="unit-title">Constant-Acceleration Kinematics Hub &amp; Parameter Elimination</h2>
        </div>
        <div class="formula-tag">v = u + at &nbsp;|&nbsp; s = ut + ½at² &nbsp;|&nbsp; v² = u² + 2as &nbsp;|&nbsp; s_n = u + a(n - ½)</div>
      </div>

      <div class="key-step-box">
        <div class="key-step-title">⚡ The Crucial Inferential Step</div>
        <p style="margin:0;font-size:0.95rem;line-height:1.5;">Every constant-acceleration problem connects five variables: <strong>u</strong> (initial velocity), <strong>v</strong> (final velocity), <strong>a</strong> (constant acceleration), <strong>s</strong> (displacement), and <strong>t</strong> (time). To solve in one algebraic step, select the equation that excludes the unknown parameter you neither know nor need.</p>
      </div>

      <div class="derivation-steps">
        <div class="step-item">
          <span class="step-badge">1</span>
          <div class="step-content">
            <strong>Missing s: Velocity-Time Line</strong>
            <em>v = u + at (Derived from definition of acceleration a = dv/dt = (v - u)/t).</em>
          </div>
        </div>
        <div class="step-item">
          <span class="step-badge">2</span>
          <div class="step-content">
            <strong>Missing v: Displacement Quadratic</strong>
            <em>s = ut + ½at² (Derived from v-t graph area: rectangle ut plus upper triangle ½ t(at)).</em>
          </div>
        </div>
        <div class="step-item">
          <span class="step-badge">3</span>
          <div class="step-content">
            <strong>Missing t: Work-Kinetic Energy Analogue</strong>
            <em>v² = u² + 2as (Derived by substituting t = (v - u)/a into s = (u + v)t / 2).</em>
          </div>
        </div>
        <div class="step-item">
          <span class="step-badge">4</span>
          <div class="step-content">
            <strong>Displacement in the n-th Second</strong>
            <em>s_n = s(n) - s(n-1) = [u·n + ½a·n²] - [u(n-1) + ½a(n-1)²] = <strong>u + ½a(2n - 1)</strong>.</em>
          </div>
        </div>
      </div>

      <div class="worked-box">
        <div class="worked-title">💡 Worked Problem: The n-th Second Ratio</div>
        <p style="margin:0 0 8px;font-size:0.92rem;line-height:1.5;"><strong>Problem:</strong> A body starts from rest (u = 0) with uniform acceleration a. Find the ratio of distances covered in the 1st, 2nd, and 3rd seconds.</p>
        <div style="background:var(--bg-card, #fff);border:1px solid #e2e8f0;border-radius:8px;padding:10px 14px;font-size:0.9rem;line-height:1.5;">
          <strong>Solution:</strong><br>
          1. Apply s_n = 0 + ½a(2n - 1):<br>
          • For n = 1: s₁ = ½a(2(1) - 1) = ½a(1).<br>
          • For n = 2: s₂ = ½a(2(2) - 1) = ½a(3).<br>
          • For n = 3: s₃ = ½a(2(3) - 1) = ½a(5).<br>
          2. Ratio s₁ : s₂ : s₃ = <strong>1 : 3 : 5</strong> (Galileo's Law of Odd Numbers).
        </div>
      </div>

      <div class="trap-box">
        <div class="trap-title">⚠️ Common Trap &amp; Error Prevention</div>
        <p style="margin:0;font-size:0.92rem;"><strong>Trap:</strong> Confusing distance in the n-th second (s_n) with total distance in n seconds (s(n)).<br>
        <strong>Repair:</strong> s(n) = ½an² grows quadratically (1 : 4 : 9), while s_n = ½a(2n-1) is the single-second increment growing as odd numbers (1 : 3 : 5).</p>
      </div>
    </article>

    <!-- STUDY UNIT 4 -->
    <article class="study-unit-card" id="unit-4">
      <div class="study-unit-header">
        <div>
          <span class="unit-tag">Unit 4 of 6 · Gravitational Kinematics</span>
          <h2 class="unit-title">Vertical Free Fall Under Gravity &amp; Reversal Invariance</h2>
        </div>
        <div class="formula-tag">H_max = u²/(2g) &nbsp;|&nbsp; t_up = t_down = u/g &nbsp;|&nbsp; T_flight = 2u/g</div>
      </div>

      <div class="key-step-box">
        <div class="key-step-title">⚡ The Crucial Inferential Step</div>
        <p style="margin:0;font-size:0.95rem;line-height:1.5;">Near Earth's surface in the absence of air drag, acceleration is invariant: <strong>a = -g = -9.8 m/s² (downward)</strong> at every single instant. At the absolute apex (highest point), instantaneous velocity vanishes (<strong>v = 0</strong>), but acceleration is STILL <strong>-g</strong>! Symmetrical vertical projection guarantees identical speeds at equal elevations on the upward and downward paths.</p>
      </div>

      <div class="derivation-steps">
        <div class="step-item">
          <span class="step-badge">1</span>
          <div class="step-content">
            <strong>Time of Ascent to Peak</strong>
            <em>Set v = 0 in v = u - gt ⇒ 0 = u - g·t_up ⇒ <strong>t_up = u/g</strong>.</em>
          </div>
        </div>
        <div class="step-item">
          <span class="step-badge">2</span>
          <div class="step-content">
            <strong>Maximum Elevation Height H_max</strong>
            <em>Substitute t_up into s = ut - ½gt² ⇒ H_max = u(u/g) - ½g(u/g)² = <strong>u²/(2g)</strong>.</em>
          </div>
        </div>
        <div class="step-item">
          <span class="step-badge">3</span>
          <div class="step-content">
            <strong>Return Time &amp; Speed Symmetry</strong>
            <em>Descent from rest at peak: H_max = ½ g t_down² ⇒ t_down = √(2H/g) = u/g. Total flight T = 2u/g. Impact velocity v = -u.</em>
          </div>
        </div>
      </div>

      <div class="worked-box">
        <div class="worked-title">💡 Worked Problem: Upward Projection Dual Times</div>
        <p style="margin:0 0 8px;font-size:0.92rem;line-height:1.5;"><strong>Problem:</strong> A ball is thrown upward at u = 30 m/s (take g = 10 m/s²). At what times is the ball at height h = 40 m above release?</p>
        <div style="background:var(--bg-card, #fff);border:1px solid #e2e8f0;border-radius:8px;padding:10px 14px;font-size:0.9rem;line-height:1.5;">
          <strong>Solution:</strong><br>
          1. Apply displacement quadratic: s = ut - ½gt² ⇒ 40 = 30t - 5t².<br>
          2. Rearrange: 5t² - 30t + 40 = 0 ⇒ t² - 6t + 8 = 0.<br>
          3. Factor: (t - 2)(t - 4) = 0 ⇒ <strong>t₁ = 2 s (ascending)</strong> and <strong>t₂ = 4 s (descending)</strong>.<br>
          4. Notice: Peak occurs at t_peak = u/g = 3 s, exactly halfway between 2 s and 4 s! Velocity at 2 s is +10 m/s; at 4 s is -10 m/s.
        </div>
      </div>

      <div class="trap-box">
        <div class="trap-title">⚠️ Common Trap &amp; Error Prevention</div>
        <p style="margin:0;font-size:0.92rem;"><strong>Trap:</strong> Assuming acceleration is zero at the peak because the object is momentarily at rest (v = 0).<br>
        <strong>Repair:</strong> If acceleration were zero at the peak, the net force would be zero and the object would remain frozen floating in mid-air! Acceleration is always -g.</p>
      </div>
    </article>

    <!-- STUDY UNIT 5 -->
    <article class="study-unit-card" id="unit-5">
      <div class="study-unit-header">
        <div>
          <span class="unit-tag">Unit 5 of 6 · Graphical &amp; Calculus Translation</span>
          <h2 class="unit-title">Calculus Translation: Slopes, Curvature &amp; Area Integrals</h2>
        </div>
        <div class="formula-tag">v(t) = dx/dt &nbsp;|&nbsp; a(t) = dv/dt &nbsp;|&nbsp; Δx = ∫ v dt &nbsp;|&nbsp; Δv = ∫ a dt</div>
      </div>

      <div class="key-step-box">
        <div class="key-step-title">⚡ The Crucial Inferential Step</div>
        <p style="margin:0;font-size:0.95rem;line-height:1.5;">The slope of position-time gives instantaneous velocity; the slope of velocity-time gives instantaneous acceleration. In reverse, the bounded geometric area under acceleration-time gives change in velocity (Δv), and the bounded area under velocity-time gives displacement (Δx). Area above the time axis is positive displacement; area below is negative displacement.</p>
      </div>

      <!-- SVG Graph -->
      <div style="background:#ffffff;border:1px solid #cbd5e1;border-radius:10px;padding:12px;margin:1rem 0;text-align:center;">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 460 200" style="max-width:100%;height:auto;max-height:200px;">
          <!-- Axes -->
          <line x1="50" y1="160" x2="420" y2="160" stroke="#475569" stroke-width="2" />
          <line x1="50" y1="160" x2="50" y2="20" stroke="#475569" stroke-width="2" />
          <text x="420" y="180" fill="#64748b" font-size="14" font-weight="700" font-family="system-ui">t (s)</text>
          <text x="15" y="30" fill="#64748b" font-size="14" font-weight="700" font-family="system-ui">v (m/s)</text>
          <!-- Shaded Area -->
          <polygon points="50,160 150,60 300,60 390,160" fill="rgba(2, 132, 199, 0.15)" stroke="none" />
          <polyline points="50,160 150,60 300,60 390,160" fill="none" stroke="#0284c7" stroke-width="3" />
          <!-- Markers -->
          <text x="100" y="105" fill="#0284c7" font-size="14" font-weight="700" text-anchor="middle" font-family="system-ui">Slope = a > 0</text>
          <text x="225" y="50" fill="#0284c7" font-size="14" font-weight="700" text-anchor="middle" font-family="system-ui">Slope = 0 (v = const)</text>
          <text x="350" y="105" fill="#dc2626" font-size="14" font-weight="700" text-anchor="middle" font-family="system-ui">Slope = a &lt; 0</text>
          <text x="225" y="125" fill="#0f172a" font-size="15" font-weight="800" text-anchor="middle" font-family="system-ui">Total Shaded Area = Net Displacement Δx</text>
        </svg>
      </div>

      <div class="worked-box">
        <div class="worked-title">💡 Worked Problem: Trapezoidal Velocity Profile</div>
        <p style="margin:0 0 8px;font-size:0.92rem;line-height:1.5;"><strong>Problem:</strong> An electric train accelerates uniformly from rest to 20 m/s in 10 s, cruises at constant speed for 30 s, and decelerates uniformly to rest in 10 s. Find total distance traveled.</p>
        <div style="background:var(--bg-card, #fff);border:1px solid #e2e8f0;border-radius:8px;padding:10px 14px;font-size:0.9rem;line-height:1.5;">
          <strong>Solution:</strong><br>
          1. Calculate area of trapezoid: Area = ½ × (parallel side 1 + parallel side 2) × height.<br>
          2. Bottom base = 10 + 30 + 10 = 50 s.<br>
          3. Top cruising base = 30 s.<br>
          4. Height = 20 m/s.<br>
          5. Total distance = ½ × (50 + 30) × 20 = ½ × 80 × 20 = <strong>800 m</strong>.
        </div>
      </div>

      <div class="trap-box">
        <div class="trap-title">⚠️ Common Trap &amp; Error Prevention</div>
        <p style="margin:0;font-size:0.92rem;"><strong>Trap:</strong> Confusing the shape of a graph with the physical trajectory.<br>
        <strong>Repair:</strong> A curved position-time graph does NOT mean the particle is moving along a curved path in 2D space! It means the particle is moving along a straight 1D line with changing speed (non-zero acceleration).</p>
      </div>
    </article>

    <!-- STUDY UNIT 6 -->
    <article class="study-unit-card" id="unit-6">
      <div class="study-unit-header">
        <div>
          <span class="unit-tag">Unit 6 of 6 · Real-World Dynamics</span>
          <h2 class="unit-title">Reaction Time, Stopping Distance &amp; Multi-Phase Motion</h2>
        </div>
        <div class="formula-tag">d_total = d_reaction + d_braking = u·t_r + u²/(2a)</div>
      </div>

      <div class="key-step-box">
        <div class="key-step-title">⚡ The Crucial Inferential Step</div>
        <p style="margin:0;font-size:0.95rem;line-height:1.5;">Real vehicle stopping consists of two strictly sequential physical regimes: <strong>Phase 1 (Human Reaction)</strong> where speed is constant (a = 0) and distance covered is <strong>d_r = u · t_r</strong>; followed by <strong>Phase 2 (Mechanical Braking)</strong> where brakes apply maximum constant deceleration a and distance covered is <strong>d_b = u² / (2a)</strong>. Notice that braking distance scales <em>quadratically</em> with speed (doubling speed quadruples braking distance!).</p>
      </div>

      <div class="derivation-steps">
        <div class="step-item">
          <span class="step-badge">1</span>
          <div class="step-content">
            <strong>Phase 1: Thinking Lag (Zero Acceleration)</strong>
            <em>During human perception/reaction time t_r, the vehicle continues at full velocity u: d_reaction = u · t_r.</em>
          </div>
        </div>
        <div class="step-item">
          <span class="step-badge">2</span>
          <div class="step-content">
            <strong>Phase 2: Work Done by Friction (v = 0)</strong>
            <em>0 = u² - 2 a d_braking ⇒ d_braking = u² / (2a).</em>
          </div>
        </div>
        <div class="step-item">
          <span class="step-badge">3</span>
          <div class="step-content">
            <strong>Total Stopping Envelope</strong>
            <em>d_stop = u · t_r + u² / (2a). If initial speed doubles (2u), thinking distance doubles, but braking distance quadruples!</em>
          </div>
        </div>
      </div>

      <div class="worked-box">
        <div class="worked-title">💡 Worked Problem: Emergency Stop Calculation</div>
        <p style="margin:0 0 8px;font-size:0.92rem;line-height:1.5;"><strong>Problem:</strong> A car travels at 72 km/h (20 m/s). The driver has a reaction time of 0.6 s, and the car's brakes produce a maximum deceleration of 5 m/s². Determine the total stopping distance.</p>
        <div style="background:var(--bg-card, #fff);border:1px solid #e2e8f0;border-radius:8px;padding:10px 14px;font-size:0.9rem;line-height:1.5;">
          <strong>Solution:</strong><br>
          1. Thinking distance: d_r = u × t_r = 20 m/s × 0.6 s = <strong>12 m</strong>.<br>
          2. Braking distance: d_b = u² / (2a) = (20)² / (2 × 5) = 400 / 10 = <strong>40 m</strong>.<br>
          3. Total stopping distance: d_total = 12 + 40 = <strong>52 m</strong>.
        </div>
      </div>

      <div class="trap-box">
        <div class="trap-title">⚠️ Common Trap &amp; Error Prevention</div>
        <p style="margin:0;font-size:0.92rem;"><strong>Trap:</strong> Applying braking deceleration during the thinking interval.<br>
        <strong>Repair:</strong> The vehicle cannot begin decelerating until the driver physically depresses the pedal. Always compute the reaction phase with a = 0.</p>
      </div>
    </article>

    <!-- Bottom Return & Practice Navigation -->
    <div style="text-align:center;margin:3rem 0 1rem;padding:2rem;background:var(--bg-soft, #f8fafc);border-radius:14px;border:1px solid var(--border, #e2e8f0);">
      <h3 style="margin:0 0 0.5rem;font-size:1.3rem;font-weight:800;color:var(--text-main);">Ready to Test Your Mastery?</h3>
      <p style="color:var(--text-muted);margin:0 0 1.25rem;">Apply these 6 foundational concepts to authentic Olympiad &amp; JEE past-paper questions in the Question Bank.</p>
      <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap;">
        <a class="g9-btn-action g9-btn-qb" href="../../question-bank/index.html?subject=Physics&topic=motion-1d&mode=study" style="font-weight:800;font-size:1rem;padding:12px 24px;">
          🎯 Practice Motion 1D in Question Bank &rarr;
        </a>
        <a class="g9-btn-action g9-btn-learn" href="../../physics/index.html" style="font-weight:800;font-size:1rem;padding:12px 24px;">
          ← Return to Physics Hub
        </a>
      </div>
    </div>
  </main>

  <footer class="g9-footer">
    <p>Grade9V3.5 Concept-Centred Learner Platform · Authentic Question Bank &amp; Complete Core Study Modules</p>
  </footer>
<script src="../../js/display-controls.js"></script>
<script src="../../js/site-header.js" data-site-root="../../"></script>
</body>
</html>"""

print("Generator script loaded.")
