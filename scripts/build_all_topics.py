#!/usr/bin/env python3
"""
Comprehensive builder for all remaining Physics topic workspaces:
1. motion-1d/index.html
2. motion-2d/index.html
3. nlm/index.html
4. vectors/index.html
"""

import os
import sys
sys.path.insert(0, os.path.abspath("."))
from scripts.generate_workspaces_full import build_motion_1d

def build_motion_2d():
    return """<!doctype html>
<html lang="en" data-g9-shell>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Motion in a Plane (2D) Workspace · Grade9V3.5</title>
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
      <a href="../../index.html">Home</a> <span>/</span> <a href="../../physics/index.html">Physics</a> <span>/</span> <span>Motion in a Plane (2D)</span>
    </div>
  </nav>

  <main class="g9-container">
    <!-- Hero Workspace Header -->
    <div class="g9-hero" style="margin-bottom:1.5rem;">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:12px;">
        <div>
          <div style="display:flex;gap:8px;align-items:center;margin-bottom:6px;">
            <span class="unit-tag" style="background:#e0f2fe;color:#0284c7;">Physics · 2D Kinematics</span>
            <span class="unit-tag" style="background:#dcfce7;color:#166534;">Core 1A Structured Theory</span>
            <span class="unit-tag" style="background:#fef3c7;color:#b45309;">6 Complete Learning Units</span>
          </div>
          <h1 class="g9-hero-title" style="margin:0 0 6px;">Motion in a Plane (2D) Workspace</h1>
          <p class="g9-hero-subtitle" style="margin:0;">Complete structured study curriculum: orthogonal vector decomposition, ground-to-ground projectile invariants, parabolic trajectory equations, elevated clifftop launches, relative 2D velocity (rain-man & river-boat), and uniform circular motion kinematics.</p>
        </div>
      </div>
    </div>

    <!-- Quick Action Launch Bar -->
    <div style="display:flex;gap:10px;flex-wrap:wrap;margin-bottom:1.5rem;padding:12px 16px;background:var(--bg-soft, #f8fafc);border:1px solid var(--border, #e2e8f0);border-radius:12px;">
      <a class="g9-btn-action g9-btn-explore" href="../../physics/motion-2d/explorers/motion-in-a-plane/index.html" style="font-weight:700;">
        ⚡ Motion in a Plane Research Suite &rarr;
      </a>
      <a class="g9-btn-action g9-btn-explore" href="../../physics/motion-in-2d/explorers/motions_in_2d/index.html" style="font-weight:700;">
        ⚡ 2D Master Kinematic Engine &rarr;
      </a>
      <a class="g9-btn-action g9-btn-learn" href="../../physics/motion-2d/core1a.html" style="font-weight:700;">
        📖 Core Study (Core 1A) &rarr;
      </a>
      <a class="g9-btn-action g9-btn-qb" href="../../question-bank/index.html?subject=Physics&topic=motion-2d&mode=study" style="font-weight:700;">
        🎯 Practice in Question Bank (Core 2) &rarr;
      </a>
      <a class="g9-btn-action g9-btn-learn" href="../../standalone/practice/core1a-physics-motion-2d-ncert-tablet.html" style="font-weight:700;">
        📱 Dedicated Fullscreen Tablet App &rarr;
      </a>
    </div>

    <!-- Sticky Concept Jump Navigation -->
    <div class="jump-nav" aria-label="Quick Jump to Study Units">
      <span style="font-size:0.85rem;font-weight:800;color:var(--text-muted);align-self:center;margin-right:4px;">Jump to Unit:</span>
      <a href="#unit-1" class="jump-chip">1. Orthogonal Independence</a>
      <a href="#unit-2" class="jump-chip">2. Canonical Invariants</a>
      <a href="#unit-3" class="jump-chip">3. Trajectory Parabola</a>
      <a href="#unit-4" class="jump-chip">4. Elevated Clifftop Launch</a>
      <a href="#unit-5" class="jump-chip">5. Relative 2D Motion</a>
      <a href="#unit-6" class="jump-chip">6. Circular Kinematics</a>
    </div>

    <!-- STUDY UNIT 1 -->
    <article class="study-unit-card" id="unit-1">
      <div class="study-unit-header">
        <div>
          <span class="unit-tag">Unit 1 of 6 · Kinematic Decomposition</span>
          <h2 class="unit-title">Orthogonal Independence &amp; The Shared Clock</h2>
        </div>
        <div class="formula-tag">x(t) = (u cosθ)t &nbsp;|&nbsp; y(t) = (u sinθ)t - ½gt²</div>
      </div>

      <div class="key-step-box">
        <div class="key-step-title">⚡ The Crucial Inferential Step</div>
        <p style="margin:0;font-size:0.95rem;line-height:1.5;">In projectile motion, horizontal motion (x) and vertical motion (y) are <strong>completely uncoupled, independent one-dimensional motions</strong>. The horizontal acceleration is strictly zero (<strong>a_x = 0</strong>), while vertical acceleration is constant gravitational free fall (<strong>a_y = -g</strong>). They are linked solely by one scalar parameter: <strong>time t (the shared clock)</strong>.</p>
      </div>

      <!-- SVG Illustration -->
      <div style="background:#ffffff;border:1px solid #cbd5e1;border-radius:10px;padding:12px;margin:1rem 0;text-align:center;">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 460 220" style="max-width:100%;height:auto;max-height:220px;">
          <defs>
            <marker id="arr-blue" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#0284c7"/></marker>
            <marker id="arr-red" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#dc2626"/></marker>
            <marker id="arr-green" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#16a34a"/></marker>
          </defs>
          <!-- Axes -->
          <line x1="40" y1="180" x2="420" y2="180" stroke="#475569" stroke-width="2"/>
          <line x1="40" y1="180" x2="40" y2="20" stroke="#475569" stroke-width="2"/>
          <text x="420" y="200" fill="#64748b" font-size="14" font-weight="700" font-family="system-ui">x (Horizontal)</text>
          <text x="15" y="25" fill="#64748b" font-size="14" font-weight="700" font-family="system-ui">y</text>
          <!-- Parabola Path -->
          <path d="M 40 180 Q 220 20 400 180" fill="none" stroke="#0284c7" stroke-width="3"/>
          <!-- Launch Vector -->
          <line x1="40" y1="180" x2="110" y2="105" stroke="#0284c7" stroke-width="3" marker-end="url(#arr-blue)"/>
          <text x="115" y="100" fill="#0284c7" font-size="15" font-weight="800" font-family="system-ui">u</text>
          <!-- Components -->
          <line x1="40" y1="180" x2="110" y2="180" stroke="#16a34a" stroke-width="2.5" marker-end="url(#arr-green)"/>
          <text x="75" y="198" fill="#16a34a" font-size="13" font-weight="700" font-family="system-ui">u_x = u cosθ</text>
          <line x1="40" y1="180" x2="40" y2="105" stroke="#ca8a04" stroke-width="2.5"/>
          <text x="46" y="145" fill="#ca8a04" font-size="13" font-weight="700" font-family="system-ui">u_y = u sinθ</text>
          <!-- Apex Marker -->
          <circle cx="220" cy="100" r="5" fill="#0284c7"/>
          <line x1="220" y1="100" x2="270" y2="100" stroke="#16a34a" stroke-width="2.5" marker-end="url(#arr-green)"/>
          <text x="275" y="105" fill="#16a34a" font-size="13" font-weight="700" font-family="system-ui">v_x = u cosθ</text>
          <line x1="220" y1="100" x2="220" y2="145" stroke="#dc2626" stroke-width="2.5" marker-end="url(#arr-red)"/>
          <text x="228" y="135" fill="#dc2626" font-size="13" font-weight="700" font-family="system-ui">g (down)</text>
          <text x="220" y="80" fill="#0f172a" font-size="14" font-weight="800" text-anchor="middle" font-family="system-ui">Apex: v_y = 0, but v_x ≠ 0!</text>
        </svg>
      </div>

      <div class="derivation-steps">
        <div class="step-item">
          <span class="step-badge">1</span>
          <div class="step-content">
            <strong>Horizontal Kinematic Channel (No Force)</strong>
            <em>Σ F_x = 0 ⇒ a_x = 0. Velocity is invariant: v_x(t) = u cosθ. Position: x(t) = (u cosθ)t.</em>
          </div>
        </div>
        <div class="step-item">
          <span class="step-badge">2</span>
          <div class="step-content">
            <strong>Vertical Kinematic Channel (Uniform Gravity)</strong>
            <em>Σ F_y = -mg ⇒ a_y = -g. Velocity: v_y(t) = u sinθ - gt. Position: y(t) = (u sinθ)t - ½gt².</em>
          </div>
        </div>
        <div class="step-item">
          <span class="step-badge">3</span>
          <div class="step-content">
            <strong>The Shared Parameter</strong>
            <em>Solve t from the constraint of one channel and substitute into the other channel.</em>
          </div>
        </div>
      </div>

      <div class="worked-box">
        <div class="worked-title">💡 The Bullet Paradox: Dropped vs. Fired Horizontally</div>
        <p style="margin:0 0 8px;font-size:0.92rem;line-height:1.5;"><strong>Problem:</strong> A high-velocity bullet is fired horizontally at 500 m/s from a height of 19.6 m above level ground. At the exact same microsecond, a second bullet is dropped from rest from the same height. Which bullet strikes the ground first?</p>
        <div style="background:var(--bg-card, #fff);border:1px solid #e2e8f0;border-radius:8px;padding:10px 14px;font-size:0.9rem;line-height:1.5;">
          <strong>Solution:</strong><br>
          1. Vertical motion equation for both bullets: y = ½gt² (since initial vertical velocity u_y = 0 for both).<br>
          2. Time to reach ground: t = √(2h / g) = √(2 × 19.6 / 9.8) = √4 = <strong>2.00 s</strong>.<br>
          3. <strong>Both bullets strike the ground at the EXACT same instant!</strong> The fired bullet travels 500 × 2 = 1000 m horizontally, but its vertical descent is completely unaffected by its horizontal speed.
        </div>
      </div>

      <div class="trap-box">
        <div class="trap-title">⚠️ Common Trap &amp; Error Prevention</div>
        <p style="margin:0;font-size:0.92rem;"><strong>Trap:</strong> Believing that horizontal velocity "carries" or lifts the projectile, delaying its landing time.<br>
        <strong>Repair:</strong> Gravity acts only vertically and is blind to horizontal motion. Orthogonal independence is strict and absolute.</p>
      </div>
    </article>

    <!-- STUDY UNIT 2 -->
    <article class="study-unit-card" id="unit-2">
      <div class="study-unit-header">
        <div>
          <span class="unit-tag">Unit 2 of 6 · Canonical Invariants</span>
          <h2 class="unit-title">The Three Ground-to-Ground Projectile Invariants</h2>
        </div>
        <div class="formula-tag">T = 2u sinθ / g &nbsp;|&nbsp; H_max = u² sin²θ / (2g) &nbsp;|&nbsp; R = u² sin 2θ / g</div>
      </div>

      <div class="key-step-box">
        <div class="key-step-title">⚡ The Crucial Inferential Step</div>
        <p style="margin:0;font-size:0.95rem;line-height:1.5;">For ground-to-ground level flight, all three canonical metrics derive directly from the vertical channel: <strong>Time of Flight (T)</strong> comes from y = 0; <strong>Maximum Height (H_max)</strong> comes from v_y = 0; and <strong>Horizontal Range (R)</strong> is the horizontal distance covered during total flight time T: <strong>R = u_x · T</strong>.</p>
      </div>

      <div class="derivation-steps">
        <div class="step-item">
          <span class="step-badge">1</span>
          <div class="step-content">
            <strong>Time of Flight T</strong>
            <em>Set y = 0 ⇒ t(u sinθ - ½gt) = 0 ⇒ <strong>T = (2u sinθ)/g</strong>. Note: t_apex = T/2 = (u sinθ)/g.</em>
          </div>
        </div>
        <div class="step-item">
          <span class="step-badge">2</span>
          <div class="step-content">
            <strong>Maximum Height H_max</strong>
            <em>At peak, v_y = 0 ⇒ 0 = (u sinθ)² - 2g H_max ⇒ <strong>H_max = (u² sin²θ)/(2g)</strong>.</em>
          </div>
        </div>
        <div class="step-item">
          <span class="step-badge">3</span>
          <div class="step-content">
            <strong>Horizontal Range R</strong>
            <em>R = u_x · T = (u cosθ) · (2u sinθ / g) = u² (2 sinθ cosθ) / g = <strong>u² sin(2θ) / g</strong>.</em>
          </div>
        </div>
        <div class="step-item">
          <span class="step-badge">4</span>
          <div class="step-content">
            <strong>Maximum Range Condition</strong>
            <em>sin(2θ) reaches its mathematical maximum of 1 when 2θ = 90° ⇒ <strong>θ = 45°</strong>. R_max = u²/g = 4 H_max.</em>
          </div>
        </div>
      </div>

      <div class="worked-box">
        <div class="worked-title">💡 Worked Problem: The 45° Range-to-Height Relation</div>
        <p style="margin:0 0 8px;font-size:0.92rem;line-height:1.5;"><strong>Problem:</strong> Prove that when a projectile is launched at θ = 45° to achieve maximum range, its maximum height is exactly one-fourth of the range: R_max = 4 H_max.</p>
        <div style="background:var(--bg-card, #fff);border:1px solid #e2e8f0;border-radius:8px;padding:10px 14px;font-size:0.9rem;line-height:1.5;">
          <strong>Solution:</strong><br>
          1. At θ = 45°: R_max = u² sin(90°) / g = <strong>u²/g</strong>.<br>
          2. At θ = 45°: H_max = u² sin²(45°) / (2g) = u² (1/√2)² / (2g) = u²(1/2)/(2g) = <strong>u² / (4g)</strong>.<br>
          3. Dividing: R_max / H_max = (u²/g) / (u² / 4g) = <strong>4</strong>.<br>
          Therefore: <strong>R = 4 H cotθ</strong> for any launch angle θ! At θ = 45°, cot(45°) = 1 ⇒ R = 4H.
        </div>
      </div>

      <div class="trap-box">
        <div class="trap-title">⚠️ The Apex Fallacy</div>
        <p style="margin:0;font-size:0.92rem;"><strong>Trap:</strong> Stating that velocity is zero at the highest point of projectile flight.<br>
        <strong>Repair:</strong> Only the VERTICAL velocity component v_y vanishes! The horizontal component v_x = u cosθ is at full speed. Net velocity at apex is (u cosθ) î, NEVER zero.</p>
      </div>
    </article>

    <!-- STUDY UNIT 3 -->
    <article class="study-unit-card" id="unit-3">
      <div class="study-unit-header">
        <div>
          <span class="unit-tag">Unit 3 of 6 · Trajectory Geometry</span>
          <h2 class="unit-title">Trajectory Parabola &amp; Complementary Angle Invariance</h2>
        </div>
        <div class="formula-tag">y = x tanθ - gx²/(2u² cos²θ) &nbsp;|&nbsp; R(θ) = R(90° - θ)</div>
      </div>

      <div class="key-step-box">
        <div class="key-step-title">⚡ The Crucial Inferential Step</div>
        <p style="margin:0;font-size:0.95rem;line-height:1.5;">Eliminating time t = x / (u cosθ) reveals that the spatial path y(x) is an inverted <strong>Cartesian parabola</strong> of the form y = Ax - Bx². Furthermore, any two complementary launch angles <strong>θ and (90° - θ)</strong> produce the <strong>EXACT same horizontal range R</strong> for the same initial speed u!</p>
      </div>

      <div class="derivation-steps">
        <div class="step-item">
          <span class="step-badge">1</span>
          <div class="step-content">
            <strong>Trajectory Equation Derivation</strong>
            <em>From x = (u cosθ)t ⇒ t = x / (u cosθ). Substitute into y = (u sinθ)t - ½gt² ⇒ <strong>y = x tanθ - [g / (2u² cos²θ)] x²</strong>.</em>
          </div>
        </div>
        <div class="step-item">
          <span class="step-badge">2</span>
          <div class="step-content">
            <strong>Range Form of Trajectory</strong>
            <em>Factor out x tanθ: y = x tanθ [1 - x / R], where R = u² sin 2θ / g.</em>
          </div>
        </div>
        <div class="step-item">
          <span class="step-badge">3</span>
          <div class="step-content">
            <strong>Proof of Complementary Angle Range Equality</strong>
            <em>Replace θ with (90° - θ): R(90° - θ) = u² sin(2(90° - θ)) / g = u² sin(180° - 2θ) / g. Since sin(180° - φ) = sin φ, R(90° - θ) = <strong>u² sin 2θ / g = R(θ)</strong>.</em>
          </div>
        </div>
      </div>

      <div class="worked-box">
        <div class="worked-title">💡 Classic Olympiad Problem: Flight Times of Complementary Arcs</div>
        <p style="margin:0 0 8px;font-size:0.92rem;line-height:1.5;"><strong>Problem:</strong> Two projectiles are fired with the same speed u at complementary angles θ₁ = θ and θ₂ = 90° - θ, covering the same range R. Let their times of flight be T₁ and T₂. Find the relationship between T₁·T₂ and R.</p>
        <div style="background:var(--bg-card, #fff);border:1px solid #e2e8f0;border-radius:8px;padding:10px 14px;font-size:0.9rem;line-height:1.5;">
          <strong>Solution:</strong><br>
          1. T₁ = 2u sinθ / g.<br>
          2. T₂ = 2u sin(90° - θ) / g = 2u cosθ / g.<br>
          3. Multiply: T₁ · T₂ = (2u sinθ / g) × (2u cosθ / g) = (2/g) × [u² (2 sinθ cosθ) / g] = <strong>(2/g) · R</strong>.<br>
          Therefore: <strong>R = ½ g T₁ T₂</strong> (Independent of launch velocity and angle!).
        </div>
      </div>

      <div class="trap-box">
        <div class="trap-title">⚠️ Common Trap &amp; Error Prevention</div>
        <p style="margin:0;font-size:0.92rem;"><strong>Trap:</strong> Assuming the complementary paths have equal heights or flight times.<br>
        <strong>Repair:</strong> Only the range R is equal! The steeper angle (e.g. 60° vs 30°) reaches a much higher peak (H₂ / H₁ = tan²θ) and stays in the air longer (T₂ / T₁ = tanθ).</p>
      </div>
    </article>

    <!-- STUDY UNIT 4 -->
    <article class="study-unit-card" id="unit-4">
      <div class="study-unit-header">
        <div>
          <span class="unit-tag">Unit 4 of 6 · Asymmetric Flight</span>
          <h2 class="unit-title">Elevated Clifftop Launches &amp; Impact Telemetry</h2>
        </div>
        <div class="formula-tag">y(t) = h + (u sinθ)t - ½gt² = 0 &nbsp;|&nbsp; v_impact = √(u² + 2gh)</div>
      </div>

      <div class="key-step-box">
        <div class="key-step-title">⚡ The Crucial Inferential Step</div>
        <p style="margin:0;font-size:0.95rem;line-height:1.5;">When launched from an elevated cliff of height <strong>h</strong> above ground, landing occurs below the launch plane (y = -h). The canonical range formula fails completely. Flight time must be solved via the quadratic formula. By <strong>Conservation of Mechanical Energy</strong>, the final impact speed is <strong>v = √(u² + 2gh)</strong>, completely invariant of launch angle θ!</p>
      </div>

      <div class="derivation-steps">
        <div class="step-item">
          <span class="step-badge">1</span>
          <div class="step-content">
            <strong>Vertical Quadratic for Time of Flight</strong>
            <em>Take launch position as origin (0, 0). Ground level is at y = -h. Equation: -h = (u sinθ)t - ½gt² ⇒ <strong>½gt² - (u sinθ)t - h = 0</strong>.</em>
          </div>
        </div>
        <div class="step-item">
          <span class="step-badge">2</span>
          <div class="step-content">
            <strong>Horizontal Drift Range</strong>
            <em>Horizontal velocity is constant: x_drift = (u cosθ) · t_land.</em>
          </div>
        </div>
        <div class="step-item">
          <span class="step-badge">3</span>
          <div class="step-content">
            <strong>Impact Velocity &amp; Direction Angle</strong>
            <em>v_x = u cosθ, v_y = u sinθ - g t_land. Impact angle below horizontal: tan φ = |v_y| / v_x. Speed: v = √(v_x² + v_y²) = √(u² + 2gh).</em>
          </div>
        </div>
      </div>

      <div class="worked-box">
        <div class="worked-title">💡 Worked Problem: Horizontal Cliff Launch</div>
        <p style="margin:0 0 8px;font-size:0.92rem;line-height:1.5;"><strong>Problem:</strong> A rock is kicked horizontally off a clifftop of height h = 45 m with initial speed u = 20 m/s (g = 10 m/s²). Find (a) time of flight, (b) horizontal drift, and (c) impact speed and angle.</p>
        <div style="background:var(--bg-card, #fff);border:1px solid #e2e8f0;border-radius:8px;padding:10px 14px;font-size:0.9rem;line-height:1.5;">
          <strong>Solution:</strong><br>
          1. Initial vertical velocity u_y = 0 ⇒ 45 = ½(10)t² ⇒ 5t² = 45 ⇒ t = <strong>3.0 s</strong>.<br>
          2. Horizontal drift: x = u_x · t = 20 × 3 = <strong>60 m</strong>.<br>
          3. Final velocity components: v_x = 20 m/s, v_y = 0 - 10(3) = -30 m/s.<br>
          4. Impact speed: v = √(20² + (-30)²) = √(400 + 900) = √1300 = <strong>36.06 m/s</strong>.<br>
          5. Impact angle: tan φ = 30 / 20 = 1.5 ⇒ φ = <strong>56.3° below horizontal</strong>.
        </div>
      </div>

      <div class="trap-box">
        <div class="trap-title">⚠️ Common Trap &amp; Error Prevention</div>
        <p style="margin:0;font-size:0.92rem;"><strong>Trap:</strong> Blindly applying R = u² sin 2θ / g for clifftop or trench problems.<br>
        <strong>Repair:</strong> That formula holds ONLY when launch elevation and landing elevation are identical (Δy = 0). For any height difference, use the full kinematic equations.</p>
      </div>
    </article>

    <!-- STUDY UNIT 5 -->
    <article class="study-unit-card" id="unit-5">
      <div class="study-unit-header">
        <div>
          <span class="unit-tag">Unit 5 of 6 · Multi-Body Kinematics</span>
          <h2 class="unit-title">Relative Velocity in Two Dimensions (Rain-Man &amp; River-Boat)</h2>
        </div>
        <div class="formula-tag">v_rel = v_A - v_B &nbsp;|&nbsp; t_cross = d / (v_b sinθ) &nbsp;|&nbsp; drift = (v_r + v_b cosθ)t</div>
      </div>

      <div class="key-step-box">
        <div class="key-step-title">⚡ The Crucial Inferential Step</div>
        <p style="margin:0;font-size:0.95rem;line-height:1.5;">Relative velocity in 2D is the vector subtraction: <strong>v_A/B = v_A - v_B</strong>. In river crossing, the time required to cross the river depends EXCLUSIVELY on the component of velocity perpendicular to the banks: <strong>t = width / v_perpendicular</strong>. Downstream water current affects only the horizontal drift, NEVER the crossing time!</p>
      </div>

      <div class="derivation-steps">
        <div class="step-item">
          <span class="step-badge">1</span>
          <div class="step-content">
            <strong>Shortest Time River Crossing</strong>
            <em>Steer perpendicular to banks (θ = 90°). Time t_min = d / v_b (minimum possible). Drift = v_river · t_min.</em>
          </div>
        </div>
        <div class="step-item">
          <span class="step-badge">2</span>
          <div class="step-content">
            <strong>Shortest Path (Zero Drift) Crossing</strong>
            <em>Resultant ground velocity must be perpendicular to bank: v_bx + v_river = 0 ⇒ v_b cosθ = -v_r ⇒ <strong>cosθ = -v_r / v_b</strong>. (Possible only if swimmer speed v_b > river speed v_r).</em>
          </div>
        </div>
        <div class="step-item">
          <span class="step-badge">3</span>
          <div class="step-content">
            <strong>Rain-Man Umbrella Tilt Angle</strong>
            <em>Rain falls at v_r ĵ. Man runs at v_m î. Relative velocity of rain to man: v_rel = -v_m î - v_r ĵ. Umbrella tilt angle from vertical: <strong>tan θ = v_m / v_r (tilted forward)</strong>.</em>
          </div>
        </div>
      </div>

      <div class="worked-box">
        <div class="worked-title">💡 Worked Problem: River Crossing Speed &amp; Drift</div>
        <p style="margin:0 0 8px;font-size:0.92rem;line-height:1.5;"><strong>Problem:</strong> A river of width d = 500 m flows east at v_r = 3 m/s. A motorboat can travel at v_b = 5 m/s in still water. (a) Find minimum time to cross. (b) Find direction to steer to land directly opposite on the other bank (zero drift).</p>
        <div style="background:var(--bg-card, #fff);border:1px solid #e2e8f0;border-radius:8px;padding:10px 14px;font-size:0.9rem;line-height:1.5;">
          <strong>Solution:</strong><br>
          1. Minimum time: Head directly North across stream (θ = 90°).<br>
          t_min = d / v_b = 500 m / 5 m/s = <strong>100 s</strong>. Downstream drift = 3 m/s × 100 s = 300 m.<br>
          2. Zero drift: Need net horizontal velocity = 0 ⇒ 5 cosθ + 3 = 0 ⇒ cosθ = -3/5 ⇒ θ = <strong>126.87° from river flow (36.87° upstream)</strong>.<br>
          Net crossing speed = √(5² - 3²) = 4 m/s. Crossing time for zero drift = 500 / 4 = 125 s.
        </div>
      </div>

      <div class="trap-box">
        <div class="trap-title">⚠️ Common Trap &amp; Error Prevention</div>
        <p style="margin:0;font-size:0.92rem;"><strong>Trap:</strong> Thinking river current slows down the perpendicular crossing time when steering directly across.<br>
        <strong>Repair:</strong> The crossing time is exactly the same whether the river flows at 1 m/s or 100 m/s, because orthogonal components do not interfere.</p>
      </div>
    </article>

    <!-- STUDY UNIT 6 -->
    <article class="study-unit-card" id="unit-6">
      <div class="study-unit-header">
        <div>
          <span class="unit-tag">Unit 6 of 6 · Rotational Kinematics</span>
          <h2 class="unit-title">Uniform Circular Motion: Tangential Speed &amp; Centripetal Acceleration</h2>
        </div>
        <div class="formula-tag">v = ω·r &nbsp;|&nbsp; a_c = v²/r = ω²r &nbsp;|&nbsp; T = 2π/ω</div>
      </div>

      <div class="key-step-box">
        <div class="key-step-title">⚡ The Crucial Inferential Step</div>
        <p style="margin:0;font-size:0.95rem;line-height:1.5;">In Uniform Circular Motion (UCM), <strong>speed |v| is strictly constant</strong>, yet <strong>acceleration is NON-ZERO</strong>! Velocity is a vector; because its direction continuously rotates tangent to the circle, the rate of change of direction produces an inward-directed <strong>centripetal acceleration a_c = v²/r</strong>. Centripetal acceleration is strictly perpendicular to velocity at every instant (hence doing zero work).</p>
      </div>

      <div class="derivation-steps">
        <div class="step-item">
          <span class="step-badge">1</span>
          <div class="step-content">
            <strong>Angular &amp; Linear Velocity Relation</strong>
            <em>Arc length s = r θ ⇒ differentiating with respect to time: ds/dt = r (dθ/dt) ⇒ <strong>v = ω r</strong>.</em>
          </div>
        </div>
        <div class="step-item">
          <span class="step-badge">2</span>
          <div class="step-content">
            <strong>Centripetal Acceleration Proof</strong>
            <em>Position r(t) = r(cos ωt î + sin ωt ĵ). Velocity v(t) = dr/dt = ωr(-sin ωt î + cos ωt ĵ). Acceleration a(t) = dv/dt = -ω²r(cos ωt î + sin ωt ĵ) = <strong>-ω² r</strong> (directed strictly opposite radius vector, i.e. radially inward).</em>
          </div>
        </div>
        <div class="step-item">
          <span class="step-badge">3</span>
          <div class="step-content">
            <strong>Work Done in UCM is Zero</strong>
            <em>Since a_c is strictly perpendicular to instantaneous displacement (a_c · v = 0), the power P = F · v = 0. Kinetic energy is strictly conserved.</em>
          </div>
        </div>
      </div>

      <div class="worked-box">
        <div class="worked-title">💡 Worked Problem: High-Speed Centrifuge Acceleration</div>
        <p style="margin:0 0 8px;font-size:0.92rem;line-height:1.5;"><strong>Problem:</strong> A laboratory centrifuge spins test tubes in a circle of radius r = 10 cm at 6000 rpm. Determine the centripetal acceleration experienced by the sample in terms of g (take g = 9.8 m/s²).</p>
        <div style="background:var(--bg-card, #fff);border:1px solid #e2e8f0;border-radius:8px;padding:10px 14px;font-size:0.9rem;line-height:1.5;">
          <strong>Solution:</strong><br>
          1. Angular speed ω = 6000 × (2π / 60) = 200π rad/s ≈ 628.32 rad/s.<br>
          2. Radius r = 0.10 m.<br>
          3. Centripetal acceleration: a_c = ω² r = (200π)² × 0.10 = 40000π² × 0.10 = 4000π² ≈ <strong>39,478 m/s²</strong>.<br>
          4. In units of g: 39,478 / 9.8 = <strong>4,028 g</strong>!
        </div>
      </div>

      <div class="trap-box">
        <div class="trap-title">⚠️ Common Trap &amp; Error Prevention</div>
        <p style="margin:0;font-size:0.92rem;"><strong>Trap:</strong> Confusing constant speed with zero acceleration in circular motion.<br>
        <strong>Repair:</strong> Acceleration measures the vector rate of change of velocity (dv/dt). Even when speed is constant, rotating the direction of the vector produces centripetal acceleration.</p>
      </div>
    </article>

    <!-- Bottom Return & Practice Navigation -->
    <div style="text-align:center;margin:3rem 0 1rem;padding:2rem;background:var(--bg-soft, #f8fafc);border-radius:14px;border:1px solid var(--border, #e2e8f0);">
      <h3 style="margin:0 0 0.5rem;font-size:1.3rem;font-weight:800;color:var(--text-main);">Ready to Test Your Mastery?</h3>
      <p style="color:var(--text-muted);margin:0 0 1.25rem;">Apply these 6 foundational concepts to authentic Olympiad &amp; JEE past-paper questions in the Question Bank.</p>
      <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap;">
        <a class="g9-btn-action g9-btn-qb" href="../../question-bank/index.html?subject=Physics&topic=motion-2d&mode=study" style="font-weight:800;font-size:1rem;padding:12px 24px;">
          🎯 Practice Motion 2D in Question Bank &rarr;
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

def build_nlm():
    return """<!doctype html>
<html lang="en" data-g9-shell>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Newton's Laws of Motion Workspace · Grade9V3.5</title>
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
      <a href="../../index.html">Home</a> <span>/</span> <a href="../../physics/index.html">Physics</a> <span>/</span> <span>Newton's Laws of Motion</span>
    </div>
  </nav>

  <main class="g9-container">
    <!-- Hero Workspace Header -->
    <div class="g9-hero" style="margin-bottom:1.5rem;">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:12px;">
        <div>
          <div style="display:flex;gap:8px;align-items:center;margin-bottom:6px;">
            <span class="unit-tag" style="background:#e0f2fe;color:#0284c7;">Physics · Classical Dynamics</span>
            <span class="unit-tag" style="background:#dcfce7;color:#166534;">Core 1A Structured Theory</span>
            <span class="unit-tag" style="background:#fef3c7;color:#b45309;">6 Complete Learning Units</span>
          </div>
          <h1 class="g9-hero-title" style="margin:0 0 6px;">Newton's Laws of Motion Workspace</h1>
          <p class="g9-hero-subtitle" style="margin:0;">Complete structured study curriculum: first law & inertial frames, free-body diagram isolation rules, second law & Atwood pulley string constraints, momentum & impulse, third law interaction pairs, and static-to-kinetic friction thresholds.</p>
        </div>
      </div>
    </div>

    <!-- Quick Action Launch Bar -->
    <div style="display:flex;gap:10px;flex-wrap:wrap;margin-bottom:1.5rem;padding:12px 16px;background:var(--bg-soft, #f8fafc);border:1px solid var(--border, #e2e8f0);border-radius:12px;">
      <a class="g9-btn-action g9-btn-explore" href="../../physics/nlm/explorers/atwood-pulleys/index.html" style="font-weight:700;">
        ⚡ Atwood Machine &amp; Pulley Suite &rarr;
      </a>
      <a class="g9-btn-action g9-btn-explore" href="../../physics/nlm/explorers/friction-threshold/index.html" style="font-weight:700;">
        🛑 Friction Threshold Explorer &rarr;
      </a>
      <a class="g9-btn-action g9-btn-explore" href="../../physics/nlm/explorers/connected-blocks/index.html" style="font-weight:700;">
        📦 Connected Blocks Suite &rarr;
      </a>
      <a class="g9-btn-action g9-btn-qb" href="../../question-bank/index.html?subject=Physics&topic=nlm&mode=study" style="font-weight:700;">
        🎯 Practice in Question Bank (Core 2) &rarr;
      </a>
      <a class="g9-btn-action g9-btn-learn" href="../../standalone/practice/core1a-physics-nlm-tablet.html" style="font-weight:700;">
        📱 Dedicated Fullscreen Tablet App &rarr;
      </a>
    </div>

    <!-- Sticky Concept Jump Navigation -->
    <div class="jump-nav" aria-label="Quick Jump to Study Units">
      <span style="font-size:0.85rem;font-weight:800;color:var(--text-muted);align-self:center;margin-right:4px;">Jump to Unit:</span>
      <a href="#unit-1" class="jump-chip">1. First Law &amp; Inertia</a>
      <a href="#unit-2" class="jump-chip">2. FBD Isolation Rules</a>
      <a href="#unit-3" class="jump-chip">3. Newton II &amp; Atwood</a>
      <a href="#unit-4" class="jump-chip">4. Momentum &amp; Impulse</a>
      <a href="#unit-5" class="jump-chip">5. Third Law Pairs</a>
      <a href="#unit-6" class="jump-chip">6. Friction Threshold</a>
    </div>

    <!-- STUDY UNIT 1 -->
    <article class="study-unit-card" id="unit-1">
      <div class="study-unit-header">
        <div>
          <span class="unit-tag">Unit 1 of 6 · Inertial Foundations</span>
          <h2 class="unit-title">The First Law, Inertia &amp; Reference Frames</h2>
        </div>
        <div class="formula-tag">Σ F_ext = 0 ⇔ v = constant</div>
      </div>

      <div class="key-step-box">
        <div class="key-step-title">⚡ The Crucial Inferential Step</div>
        <p style="margin:0;font-size:0.95rem;line-height:1.5;"><strong>Motion does NOT require force.</strong> An object at rest remains at rest, and an object in motion continues at constant velocity in a straight line, unless acted upon by a non-zero net external force. Force is the agent of <em>change in velocity (acceleration)</em>, never the maintainer of motion.</p>
      </div>

      <!-- SVG Illustration -->
      <div style="background:#ffffff;border:1px solid #cbd5e1;border-radius:10px;padding:12px;margin:1rem 0;text-align:center;">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 460 180" style="max-width:100%;height:auto;max-height:180px;">
          <defs>
            <marker id="arr-green2" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#16a34a"/></marker>
            <marker id="arr-red2" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#dc2626"/></marker>
            <marker id="arr-blue2" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#0284c7"/></marker>
          </defs>
          <!-- Surface -->
          <line x1="30" y1="140" x2="430" y2="140" stroke="#475569" stroke-width="3" />
          <text x="50" y="165" font-size="14" fill="#64748b" font-family="system-ui">Frictionless Inertial Track (Ice Surface)</text>
          <!-- Glider -->
          <rect x="180" y="80" width="100" height="60" rx="6" fill="#e0f2fe" stroke="#0284c7" stroke-width="2.5" />
          <text x="230" y="115" font-size="16" font-weight="800" fill="#0369a1" text-anchor="middle" font-family="system-ui">Mass m</text>
          <!-- Normal Force N -->
          <line x1="230" y1="80" x2="230" y2="25" stroke="#16a34a" stroke-width="3" marker-end="url(#arr-green2)"/>
          <text x="240" y="45" font-size="14" font-weight="700" fill="#16a34a" font-family="system-ui">N (Normal)</text>
          <!-- Gravity mg -->
          <line x1="230" y1="140" x2="230" y2="175" stroke="#dc2626" stroke-width="3" marker-end="url(#arr-red2)"/>
          <text x="240" y="172" font-size="14" font-weight="700" fill="#dc2626" font-family="system-ui">mg</text>
          <!-- Velocity Vector -->
          <line x1="280" y1="110" x2="360" y2="110" stroke="#0284c7" stroke-width="3" marker-end="url(#arr-blue2)"/>
          <text x="320" y="95" font-size="14" font-weight="800" fill="#0284c7" font-family="system-ui">v = const (a = 0)</text>
        </svg>
      </div>

      <div class="derivation-steps">
        <div class="step-item">
          <span class="step-badge">1</span>
          <div class="step-content">
            <strong>Galileo's Incline Thought Experiment</strong>
            <em>A ball rolling down an incline and up another incline rises to the same height. If the second incline is horizontal, the ball must travel forever to reach that height.</em>
          </div>
        </div>
        <div class="step-item">
          <span class="step-badge">2</span>
          <div class="step-content">
            <strong>Definition of Inertial Reference Frame</strong>
            <em>A frame of reference in which Newton's First Law holds true without invoking pseudo-forces. Any frame moving at constant velocity relative to an inertial frame is also inertial.</em>
          </div>
        </div>
        <div class="step-item">
          <span class="step-badge">3</span>
          <div class="step-content">
            <strong>Equilibrium Criterion</strong>
            <em>Equilibrium means zero acceleration (a = 0). It does NOT mean velocity is zero! Static equilibrium (v = 0) and dynamic equilibrium (v = const) both require Σ F = 0.</em>
          </div>
        </div>
      </div>

      <div class="worked-box">
        <div class="worked-title">💡 The Constant-Speed Elevator Problem</div>
        <p style="margin:0 0 8px;font-size:0.92rem;line-height:1.5;"><strong>Problem:</strong> A person of mass m = 70 kg stands on a weighing scale inside an elevator moving upward at a constant speed of 8 m/s. What does the scale read? What if the elevator moves downward at 8 m/s?</p>
        <div style="background:var(--bg-card, #fff);border:1px solid #e2e8f0;border-radius:8px;padding:10px 14px;font-size:0.9rem;line-height:1.5;">
          <strong>Solution:</strong><br>
          1. In both cases, velocity is constant ⇒ acceleration a = 0.<br>
          2. Vertical FBD: N - mg = m(a) = 0 ⇒ <strong>N = mg = 70 × 9.8 = 686 N</strong>.<br>
          3. The scale reads exactly 70 kg (686 N) whether stationary, moving up at 8 m/s, or moving down at 8 m/s. Scale reading changes ONLY when the elevator accelerates!
        </div>
      </div>

      <div class="trap-box">
        <div class="trap-title">⚠️ Common Trap &amp; Error Prevention</div>
        <p style="margin:0;font-size:0.92rem;"><strong>Trap:</strong> Thinking that because the elevator is moving upward, the scale must push up harder (N > mg).<br>
        <strong>Repair:</strong> If N were greater than mg, the net force would be upward, causing the elevator to accelerate upward! Constant velocity demands N = mg.</p>
      </div>
    </article>

    <!-- STUDY UNIT 2 -->
    <article class="study-unit-card" id="unit-2">
      <div class="study-unit-header">
        <div>
          <span class="unit-tag">Unit 2 of 6 · Modeling Discipline</span>
          <h2 class="unit-title">Free Body Diagrams (FBD) &amp; System Isolation Rules</h2>
        </div>
        <div class="formula-tag">Choose Body Boundary → Draw ONLY External Forces Acting ON the Body</div>
      </div>

      <div class="key-step-box">
        <div class="key-step-title">⚡ The Crucial Inferential Step</div>
        <p style="margin:0;font-size:0.95rem;line-height:1.5;">A Free Body Diagram (FBD) must isolate a single chosen body and include <strong>ONLY external forces exerted BY other bodies ON that chosen body</strong>. Never include forces exerted by the chosen body on its surroundings. Normal force N is strictly perpendicular to the contact interface; friction f is strictly parallel.</p>
      </div>

      <div class="derivation-steps">
        <div class="step-item">
          <span class="step-badge">1</span>
          <div class="step-content">
            <strong>Step 1: Declare the System Boundary</strong>
            <em>Isolate Body A from all tables, ropes, and adjacent bodies. Represent it as a point mass or bounded silhouette.</em>
          </div>
        </div>
        <div class="step-item">
          <span class="step-badge">2</span>
          <div class="step-content">
            <strong>Step 2: Non-Contact Field Forces</strong>
            <em>Draw gravity W = mg acting vertically downward from the center of mass.</em>
          </div>
        </div>
        <div class="step-item">
          <span class="step-badge">3</span>
          <div class="step-content">
            <strong>Step 3: Contact Forces at Boundaries</strong>
            <em>Every physical contact point creates a force: strings pull inward along length (Tension T); solid surfaces push perpendicularly inward (Normal N) and resist tangential slip (Friction f).</em>
          </div>
        </div>
        <div class="step-item">
          <span class="step-badge">4</span>
          <div class="step-content">
            <strong>Step 4: Coordinate Resolution</strong>
            <em>Align coordinate axes with acceleration (e.g. parallel and perpendicular to an inclined plane). Resolve all off-axis vectors.</em>
          </div>
        </div>
      </div>

      <div class="worked-box">
        <div class="worked-title">💡 Worked Problem: Block on Inclined Plane</div>
        <p style="margin:0 0 8px;font-size:0.92rem;line-height:1.5;"><strong>Problem:</strong> A block of mass m = 10 kg sits at rest on a rough plane inclined at θ = 30° to the horizontal. Evaluate the normal reaction N and static friction force f_s.</p>
        <div style="background:var(--bg-card, #fff);border:1px solid #e2e8f0;border-radius:8px;padding:10px 14px;font-size:0.9rem;line-height:1.5;">
          <strong>Solution:</strong><br>
          1. Resolve weight mg into components: perpendicular = mg cosθ; parallel down slope = mg sinθ.<br>
          2. Perpendicular equilibrium: Σ F_perp = N - mg cos 30° = 0 ⇒ N = 10 × 9.8 × (√3/2) = <strong>84.87 N</strong>.<br>
          3. Parallel equilibrium: Σ F_parallel = mg sin 30° - f_s = 0 ⇒ f_s = 10 × 9.8 × 0.5 = <strong>49.00 N (up the incline)</strong>.<br>
          Notice: Normal reaction N is NOT mg! N = mg cosθ.</p>
        </div>
      </div>

      <div class="trap-box">
        <div class="trap-title">⚠️ Common Trap &amp; Error Prevention</div>
        <p style="margin:0;font-size:0.92rem;"><strong>Trap:</strong> Drawing "ma" as a force on an FBD, or writing N = mg automatically.<br>
        <strong>Repair:</strong> "ma" is the RESULTANT acceleration product (Σ F = ma), NOT a physical force! Only draw real physical interactions (gravity, normal, tension, friction).</p>
      </div>
    </article>

    <!-- STUDY UNIT 3 -->
    <article class="study-unit-card" id="unit-3">
      <div class="study-unit-header">
        <div>
          <span class="unit-tag">Unit 3 of 6 · Dynamics &amp; Constraints</span>
          <h2 class="unit-title">Newton's Second Law &amp; Atwood Pulley Constraints</h2>
        </div>
        <div class="formula-tag">Σ F = m a &nbsp;|&nbsp; a = (m₂ - m₁)g / (m₁ + m₂) &nbsp;|&nbsp; T = 2m₁m₂ g / (m₁ + m₂)</div>
      </div>

      <div class="key-step-box">
        <div class="key-step-title">⚡ The Crucial Inferential Step</div>
        <p style="margin:0;font-size:0.95rem;line-height:1.5;">For connected bodies linked by inextensible taut strings, the geometric string constraint <strong>L = x₁ + x₂ = constant</strong> requires acceleration magnitudes to be identical: <strong>a₁ = a₂ = a</strong>. Write the Second Law equation for each body separately, then sum or substitute to eliminate the internal constraint force (Tension T).</p>
      </div>

      <div class="derivation-steps">
        <div class="step-item">
          <span class="step-badge">1</span>
          <div class="step-content">
            <strong>Equation for Ascending Mass m₁</strong>
            <em>Tension pulls up, gravity pulls down: T - m₁ g = m₁ a.</em>
          </div>
        </div>
        <div class="step-item">
          <span class="step-badge">2</span>
          <div class="step-content">
            <strong>Equation for Descending Mass m₂ (m₂ > m₁)</strong>
            <em>Gravity pulls down, tension pulls up: m₂ g - T = m₂ a.</em>
          </div>
        </div>
        <div class="step-item">
          <span class="step-badge">3</span>
          <div class="step-content">
            <strong>Sum to Eliminate Tension T</strong>
            <em>(T - m₁ g) + (m₂ g - T) = (m₁ + m₂) a ⇒ (m₂ - m₁) g = (m₁ + m₂) a ⇒ <strong>a = (m₂ - m₁)g / (m₁ + m₂)</strong>.</em>
          </div>
        </div>
        <div class="step-item">
          <span class="step-badge">4</span>
          <div class="step-content">
            <strong>Substitute to Solve String Tension T</strong>
            <em>T = m₁ (g + a) = m₁ [g + (m₂ - m₁)g / (m₁ + m₂)] = <strong>2 m₁ m₂ g / (m₁ + m₂)</strong>.</em>
          </div>
        </div>
      </div>

      <div class="worked-box">
        <div class="worked-title">💡 Worked Problem: Standard Atwood Machine</div>
        <p style="margin:0 0 8px;font-size:0.92rem;line-height:1.5;"><strong>Problem:</strong> Two masses m₁ = 3 kg and m₂ = 5 kg are suspended over a light frictionless pulley. Take g = 10 m/s². Determine the system acceleration and the tension in the string.</p>
        <div style="background:var(--bg-card, #fff);border:1px solid #e2e8f0;border-radius:8px;padding:10px 14px;font-size:0.9rem;line-height:1.5;">
          <strong>Solution:</strong><br>
          1. System acceleration: a = (5 - 3) × 10 / (5 + 3) = 2 × 10 / 8 = 20 / 8 = <strong>2.50 m/s²</strong>.<br>
          2. String tension: T = 2 × 3 × 5 × 10 / (3 + 5) = 300 / 8 = <strong>37.50 N</strong>.<br>
          3. Notice: For m₂ = 5 kg, gravity is 50 N, but tension is only 37.5 N (net downward force = 12.5 N = 5 × 2.5 N). Tension is NOT 50 N!</p>
        </div>
      </div>

      <div class="trap-box">
        <div class="trap-title">⚠️ Common Trap &amp; Error Prevention</div>
        <p style="margin:0;font-size:0.92rem;"><strong>Trap:</strong> Assuming tension equals the weight of the heavier block (T = m₂ g).<br>
        <strong>Repair:</strong> If T were equal to m₂ g, block 2 would not accelerate downward! T is strictly less than m₂ g during downward acceleration.</p>
      </div>
    </article>

    <!-- STUDY UNIT 4 -->
    <article class="study-unit-card" id="unit-4">
      <div class="study-unit-header">
        <div>
          <span class="unit-tag">Unit 4 of 6 · Momentum &amp; Impacts</span>
          <h2 class="unit-title">Momentum, Impulse &amp; Average Impact Forces</h2>
        </div>
        <div class="formula-tag">p = m v &nbsp;|&nbsp; J = Δp = ∫ F dt = F_avg · Δt</div>
      </div>

      <div class="key-step-box">
        <div class="key-step-title">⚡ The Crucial Inferential Step</div>
        <p style="margin:0;font-size:0.95rem;line-height:1.5;">Momentum is a <strong>signed vector quantity p = m v</strong>. Rebounding from a wall produces double the momentum change of stopping: <strong>Δp = m(v - (-u)) = 2mu</strong>. Impulse J equals this change in momentum. To minimize destructive impact force F_avg, the collision duration <strong>Δt must be prolonged</strong> (the fundamental engineering principle of airbags, crumple zones, and catching cricket balls with soft hands).</p>
      </div>

      <div class="derivation-steps">
        <div class="step-item">
          <span class="step-badge">1</span>
          <div class="step-content">
            <strong>Impulse-Momentum Theorem</strong>
            <em>From Newton II: F = dp/dt ⇒ F dt = dp ⇒ <strong>J = ∫ F dt = Δp = m v_final - m v_initial</strong>.</em>
          </div>
        </div>
        <div class="step-item">
          <span class="step-badge">2</span>
          <div class="step-content">
            <strong>Average Impact Force</strong>
            <em>F_avg = Δp / Δt. For a fixed momentum change, peak force is inversely proportional to collision contact time Δt.</em>
          </div>
        </div>
      </div>

      <div class="worked-box">
        <div class="worked-title">💡 Worked Problem: Rebounding Cricket Ball Force</div>
        <p style="margin:0 0 8px;font-size:0.92rem;line-height:1.5;"><strong>Problem:</strong> A cricket ball of mass m = 0.15 kg strikes a batsman's bat horizontally at u = 25 m/s and rebounds in the opposite direction at v = 25 m/s. The contact duration is Δt = 0.002 s. Find the impulse delivered and the average force exerted on the bat.</p>
        <div style="background:var(--bg-card, #fff);border:1px solid #e2e8f0;border-radius:8px;padding:10px 14px;font-size:0.9rem;line-height:1.5;">
          <strong>Solution:</strong><br>
          1. Choose incoming direction as negative (-25 m/s) and rebound direction as positive (+25 m/s).<br>
          2. Δp = m(v_f - v_i) = 0.15 × (25 - (-25)) = 0.15 × 50 = <strong>+7.50 N·s</strong>.<br>
          3. Impulse J = <strong>7.50 N·s</strong>.<br>
          4. Average force: F_avg = J / Δt = 7.50 / 0.002 = <strong>3,750 N</strong> (Over 380 kg of force!).
        </div>
      </div>

      <div class="trap-box">
        <div class="trap-title">⚠️ Common Trap &amp; Error Prevention</div>
        <p style="margin:0;font-size:0.92rem;"><strong>Trap:</strong> Subtracting speeds as scalars: Δp = m(25 - 25) = 0.<br>
        <strong>Repair:</strong> Velocity is a vector! Direction reversal turns the minus sign into an addition: 25 - (-25) = 50 m/s.</p>
      </div>
    </article>

    <!-- STUDY UNIT 5 -->
    <article class="study-unit-card" id="unit-5">
      <div class="study-unit-header">
        <div>
          <span class="unit-tag">Unit 5 of 6 · Relational Dynamics</span>
          <h2 class="unit-title">Newton's Third Law Action-Reaction Pairs</h2>
        </div>
        <div class="formula-tag">F_{A→B} = -F_{B→A} &nbsp;(Equal, Opposite, on DIFFERENT Bodies)</div>
      </div>

      <div class="key-step-box">
        <div class="key-step-title">⚡ The Crucial Inferential Step</div>
        <p style="margin:0;font-size:0.95rem;line-height:1.5;">Every single force is a mutual interaction between TWO bodies. If Body A exerts force F on Body B, Body B simultaneously exerts an equal and opposite force -F on Body A. Action and reaction <strong>CANNOT cancel each other out because they act on TWO DIFFERENT bodies</strong>!</p>
      </div>

      <div class="derivation-steps">
        <div class="step-item">
          <span class="step-badge">1</span>
          <div class="step-content">
            <strong>The 4 Invariant Criteria of Newton III Pairs</strong>
            <em>1. Equal in magnitude.<br>2. Opposite in direction.<br>3. Act simultaneously.<br>4. <strong>Act on two completely different bodies of the exact same physical origin</strong> (e.g. both gravitational, or both electromagnetic).</em>
          </div>
        </div>
        <div class="step-item">
          <span class="step-badge">2</span>
          <div class="step-content">
            <strong>Internal vs. External Cancellation</strong>
            <em>When both bodies are grouped into a single combined system (A + B), internal action-reaction pairs sum vectorially to zero, leaving system acceleration determined strictly by external forces.</em>
          </div>
        </div>
      </div>

      <div class="worked-box">
        <div class="worked-title">💡 Classic Concept Check: The Book on the Table</div>
        <p style="margin:0 0 8px;font-size:0.92rem;line-height:1.5;"><strong>Question:</strong> A book rests on a table. The normal reaction N pushes upward on the book, and gravity mg pulls downward on the book. Are N and mg a Newton's Third Law action-reaction pair?</p>
        <div style="background:var(--bg-card, #fff);border:1px solid #e2e8f0;border-radius:8px;padding:10px 14px;font-size:0.9rem;line-height:1.5;">
          <strong>Answer: NO! Absolutely not!</strong><br>
          1. Both N and mg act on the SAME body (the book). Action-reaction pairs must act on DIFFERENT bodies.<br>
          2. They have completely different physical origins (N is contact electromagnetic repulsion between atomic electron clouds; mg is long-range gravitational pull of Earth).<br>
          • The true partner of upward normal N on the book is: <strong>Downward contact normal push on the TABLE</strong>.<br>
          • The true partner of downward gravity mg on the book is: <strong>Upward gravitational pull of the book on PLANET EARTH</strong>!
        </div>
      </div>

      <div class="trap-box">
        <div class="trap-title">⚠️ Common Trap &amp; Error Prevention</div>
        <p style="margin:0;font-size:0.92rem;"><strong>Trap:</strong> Confusing balanced forces on one body (Σ F = 0) with a Third Law interaction pair.<br>
        <strong>Repair:</strong> If two forces act on the same object, they are NEVER an action-reaction pair.</p>
      </div>
    </article>

    <!-- STUDY UNIT 6 -->
    <article class="study-unit-card" id="unit-6">
      <div class="study-unit-header">
        <div>
          <span class="unit-tag">Unit 6 of 6 · Interfacial Thresholds</span>
          <h2 class="unit-title">Static vs. Kinetic Friction &amp; The Stick-Slip Threshold</h2>
        </div>
        <div class="formula-tag">f_s ≤ μ_s N &nbsp;|&nbsp; f_lim = μ_s N &nbsp;|&nbsp; f_k = μ_k N &nbsp;(μ_k &lt; μ_s)</div>
      </div>

      <div class="key-step-box">
        <div class="key-step-title">⚡ The Crucial Inferential Step</div>
        <p style="margin:0;font-size:0.95rem;line-height:1.5;">Static friction is an <strong>adaptive, self-adjusting reaction force</strong>. It is NOT automatically equal to μ_s N! It matches the applied tangential force exactly (f_s = F_applied) up to the limiting threshold <strong>f_lim = μ_s N</strong>. The instant applied force exceeds f_lim, atomic cold welds shear, relative slip begins, and friction drops to the constant kinetic value <strong>f_k = μ_k N</strong>.</p>
      </div>

      <div class="derivation-steps">
        <div class="step-item">
          <span class="step-badge">1</span>
          <div class="step-content">
            <strong>Static Regime (f_s ≤ μ_s N)</strong>
            <em>System is at relative rest (a_rel = 0). Static friction adjusts to whatever value is required to maintain equilibrium: f_s = F_parallel.</em>
          </div>
        </div>
        <div class="step-item">
          <span class="step-badge">2</span>
          <div class="step-content">
            <strong>Impending Motion Threshold</strong>
            <em>f_max = μ_s N. On an inclined plane, impending slip occurs at the angle of repose: tan θ_repose = μ_s.</em>
          </div>
        </div>
        <div class="step-item">
          <span class="step-badge">3</span>
          <div class="step-content">
            <strong>Kinetic Sliding Regime (F_applied > μ_s N)</strong>
            <em>Surfaces slide relative to each other. Friction magnitude is constant: f_k = μ_k N, directed strictly opposite the relative velocity vector.</em>
          </div>
        </div>
      </div>

      <div class="worked-box">
        <div class="worked-title">💡 Worked Problem: The 3-Stage Friction Test</div>
        <p style="margin:0 0 8px;font-size:0.92rem;line-height:1.5;"><strong>Problem:</strong> A block of mass m = 10 kg sits on a horizontal floor with μ_s = 0.50 and μ_k = 0.40 (take g = 10 m/s²). Normal N = 100 N. Find the friction force and acceleration when pulled horizontally with: (a) F = 30 N, (b) F = 50 N, and (c) F = 70 N.</p>
        <div style="background:var(--bg-card, #fff);border:1px solid #e2e8f0;border-radius:8px;padding:10px 14px;font-size:0.9rem;line-height:1.5;">
          <strong>Solution:</strong><br>
          • Threshold check: Limiting static friction f_lim = μ_s N = 0.50 × 100 = <strong>50 N</strong>. Kinetic friction f_k = μ_k N = 0.40 × 100 = <strong>40 N</strong>.<br>
          1. <strong>F = 30 N:</strong> Since 30 N &lt; 50 N, block does NOT slip! Friction adjusts to match applied force: <strong>f_s = 30 N</strong> (NOT 50 N!), acceleration a = <strong>0 m/s²</strong>.<br>
          2. <strong>F = 50 N:</strong> Impending slip threshold. Friction reaches maximum: <strong>f_s = 50 N</strong>, acceleration a = <strong>0 m/s²</strong>.<br>
          3. <strong>F = 70 N:</strong> Since 70 N > 50 N, block SLIPS! Friction instantly drops to kinetic: <strong>f_k = 40 N</strong>. Net force = 70 - 40 = 30 N. Acceleration a = 30 / 10 = <strong>3.00 m/s²</strong>.
        </div>
      </div>

      <div class="trap-box">
        <div class="trap-title">⚠️ Common Trap &amp; Error Prevention</div>
        <p style="margin:0;font-size:0.92rem;"><strong>Trap:</strong> Setting f = μ_s N = 50 N when pulled with 30 N, concluding that the block accelerates backwards at 2 m/s²!<br>
        <strong>Repair:</strong> Friction is a passive reaction. It can never cause an object to move by itself; it only resists external applied forces up to its maximum threshold.</p>
      </div>
    </article>

    <!-- Bottom Return & Practice Navigation -->
    <div style="text-align:center;margin:3rem 0 1rem;padding:2rem;background:var(--bg-soft, #f8fafc);border-radius:14px;border:1px solid var(--border, #e2e8f0);">
      <h3 style="margin:0 0 0.5rem;font-size:1.3rem;font-weight:800;color:var(--text-main);">Ready to Test Your Mastery?</h3>
      <p style="color:var(--text-muted);margin:0 0 1.25rem;">Apply these 6 foundational concepts to authentic Olympiad &amp; JEE past-paper questions in the Question Bank.</p>
      <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap;">
        <a class="g9-btn-action g9-btn-qb" href="../../question-bank/index.html?subject=Physics&topic=nlm&mode=study" style="font-weight:800;font-size:1rem;padding:12px 24px;">
          🎯 Practice NLM in Question Bank &rarr;
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

def build_vectors():
    return """<!doctype html>
<html lang="en" data-g9-shell>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Vector Methods in Physics Workspace · Grade9V3.5</title>
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
      <a href="../../index.html">Home</a> <span>/</span> <a href="../../physics/index.html">Physics</a> <span>/</span> <span>Vector Methods in Physics</span>
    </div>
  </nav>

  <main class="g9-container">
    <!-- Hero Workspace Header -->
    <div class="g9-hero" style="margin-bottom:1.5rem;">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:12px;">
        <div>
          <div style="display:flex;gap:8px;align-items:center;margin-bottom:6px;">
            <span class="unit-tag" style="background:#e0f2fe;color:#0284c7;">Physics · Vector Algebra</span>
            <span class="unit-tag" style="background:#dcfce7;color:#166534;">Core 1A Structured Theory</span>
            <span class="unit-tag" style="background:#fef3c7;color:#b45309;">6 Complete Learning Units</span>
          </div>
          <h1 class="g9-hero-title" style="margin:0 0 6px;">Vector Methods in Physics Workspace</h1>
          <p class="g9-hero-subtitle" style="margin:0;">Complete structured study curriculum: scalars vs vectors, triangle & parallelogram addition laws, Cartesian component resolution, vector subtraction & relative velocity, scalar dot product invariants, and vector cross product right-hand rules.</p>
        </div>
      </div>
    </div>

    <!-- Quick Action Launch Bar -->
    <div style="display:flex;gap:10px;flex-wrap:wrap;margin-bottom:1.5rem;padding:12px 16px;background:var(--bg-soft, #f8fafc);border:1px solid var(--border, #e2e8f0);border-radius:12px;">
      <a class="g9-btn-action g9-btn-explore" href="../../standalone/practice/vector-algebra-3d-master-suite.html" style="font-weight:700;">
        ⚡ 3D Vector Algebra Master Suite &rarr;
      </a>
      <a class="g9-btn-action g9-btn-learn" href="../../standalone/practice/core1a-vector-add-sub-tablet.html" style="font-weight:700;">
        📐 Vector Add &amp; Subtract Tablet &rarr;
      </a>
      <a class="g9-btn-action g9-btn-qb" href="../../question-bank/index.html?subject=Physics&topic=vectors&mode=study" style="font-weight:700;">
        🎯 Practice in Question Bank (Core 2) &rarr;
      </a>
      <a class="g9-btn-action g9-btn-learn" href="../../standalone/practice/core1a-physics-vectors-tablet.html" style="font-weight:700;">
        📱 Dedicated Fullscreen Tablet App &rarr;
      </a>
    </div>

    <!-- Sticky Concept Jump Navigation -->
    <div class="jump-nav" aria-label="Quick Jump to Study Units">
      <span style="font-size:0.85rem;font-weight:800;color:var(--text-muted);align-self:center;margin-right:4px;">Jump to Unit:</span>
      <a href="#unit-1" class="jump-chip">1. Scalars vs Vectors</a>
      <a href="#unit-2" class="jump-chip">2. Vector Addition Laws</a>
      <a href="#unit-3" class="jump-chip">3. Cartesian Resolution</a>
      <a href="#unit-4" class="jump-chip">4. Vector Subtraction</a>
      <a href="#unit-5" class="jump-chip">5. Dot Product &amp; Work</a>
      <a href="#unit-6" class="jump-chip">6. Cross Product &amp; Torque</a>
    </div>

    <!-- STUDY UNIT 1 -->
    <article class="study-unit-card" id="unit-1">
      <div class="study-unit-header">
        <div>
          <span class="unit-tag">Unit 1 of 6 · Geometric Foundation</span>
          <h2 class="unit-title">Scalars, Vectors &amp; Geometric Translation Invariance</h2>
        </div>
        <div class="formula-tag">A = |A| · u_A &nbsp;|&nbsp; Parallel Transport Preserves Invariance</div>
      </div>

      <div class="key-step-box">
        <div class="key-step-title">⚡ The Crucial Inferential Step</div>
        <p style="margin:0;font-size:0.95rem;line-height:1.5;">A physical quantity is a <strong>vector</strong> only if it possesses magnitude, a specified directional orientation, AND obeys the <strong>parallelogram law of vector addition</strong>. (Quantities like electric current have direction, but add algebraically, so they are scalars!). A free vector in Euclidean space is completely invariant under parallel translation (shifting position without rotating preserves the vector).</p>
      </div>

      <div class="derivation-steps">
        <div class="step-item">
          <span class="step-badge">1</span>
          <div class="step-content">
            <strong>The Three Vector Tests</strong>
            <em>1. Has real positive magnitude.<br>2. Has unambiguous spatial direction.<br>3. Obeys the triangle / parallelogram addition law.</em>
          </div>
        </div>
        <div class="step-item">
          <span class="step-badge">2</span>
          <div class="step-content">
            <strong>Unit Vector Definition</strong>
            <em>A vector of magnitude 1 pointing along A: u_A = A / |A|. Any vector is its magnitude times its unit vector: A = |A| u_A.</em>
          </div>
        </div>
      </div>

      <div class="worked-box">
        <div class="worked-title">💡 Concept Counter-Example: Is Electric Current a Vector?</div>
        <p style="margin:0 0 8px;font-size:0.92rem;line-height:1.5;"><strong>Question:</strong> Current has both magnitude (e.g. 5 A) and direction (along a copper wire). Why is electric current classified as a scalar rather than a vector?</p>
        <div style="background:var(--bg-card, #fff);border:1px solid #e2e8f0;border-radius:8px;padding:10px 14px;font-size:0.9rem;line-height:1.5;">
          <strong>Answer:</strong><br>
          If two wires meet at an angle θ carrying 3 A and 4 A, the combined junction current is ALWAYS 3 + 4 = <strong>7 A</strong> (Kirchhoff's Current Law), regardless of whether the wire angle is 30°, 90°, or 180°! If current were a vector, the junction current at 90° would be √(3² + 4²) = 5 A. Because current does not obey vector addition, it is a <strong>scalar</strong>.
        </div>
      </div>

      <div class="trap-box">
        <div class="trap-title">⚠️ Common Trap &amp; Error Prevention</div>
        <p style="margin:0;font-size:0.92rem;"><strong>Trap:</strong> Assuming that "having a direction" is sufficient to make a physical quantity a vector.<br>
        <strong>Repair:</strong> The defining test of a vector is adherence to the vector addition law under coordinate rotations.</p>
      </div>
    </article>

    <!-- STUDY UNIT 2 -->
    <article class="study-unit-card" id="unit-2">
      <div class="study-unit-header">
        <div>
          <span class="unit-tag">Unit 2 of 6 · Composition of Vectors</span>
          <h2 class="unit-title">Vector Addition: Triangle &amp; Parallelogram Laws</h2>
        </div>
        <div class="formula-tag">R = √(A² + B² + 2AB cosθ) &nbsp;|&nbsp; tan α = (B sinθ) / (A + B cosθ)</div>
      </div>

      <div class="key-step-box">
        <div class="key-step-title">⚡ The Crucial Inferential Step</div>
        <p style="margin:0;font-size:0.95rem;line-height:1.5;">The resultant magnitude of two vectors A and B acting at angle θ ranges between <strong>|A - B| (when antiparallel, θ = 180°)</strong> and <strong>A + B (when collinear, θ = 0°)</strong>. Direct algebraic sum (A + B) is valid ONLY when θ = 0°. For perpendicular vectors (θ = 90°), the formula reduces directly to the Pythagorean theorem: <strong>R = √(A² + B²)</strong>.</p>
      </div>

      <!-- SVG Illustration -->
      <div style="background:#ffffff;border:1px solid #cbd5e1;border-radius:10px;padding:12px;margin:1rem 0;text-align:center;">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 460 200" style="max-width:100%;height:auto;max-height:200px;">
          <defs>
            <marker id="arr-v1" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#0284c7"/></marker>
            <marker id="arr-v2" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#16a34a"/></marker>
            <marker id="arr-res" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#dc2626"/></marker>
          </defs>
          <!-- Vector A -->
          <line x1="60" y1="150" x2="260" y2="150" stroke="#0284c7" stroke-width="3" marker-end="url(#arr-v1)"/>
          <text x="160" y="172" fill="#0284c7" font-size="15" font-weight="800" font-family="system-ui">Vector A</text>
          <!-- Vector B -->
          <line x1="60" y1="150" x2="160" y2="50" stroke="#16a34a" stroke-width="3" marker-end="url(#arr-v2)"/>
          <text x="90" y="90" fill="#16a34a" font-size="15" font-weight="800" font-family="system-ui">Vector B</text>
          <!-- Dashed Parallelogram Sides -->
          <line x1="260" y1="150" x2="360" y2="50" stroke="#94a3b8" stroke-width="2" stroke-dasharray="4,4"/>
          <line x1="160" y1="50" x2="360" y2="50" stroke="#94a3b8" stroke-width="2" stroke-dasharray="4,4"/>
          <!-- Diagonal Resultant R -->
          <line x1="60" y1="150" x2="360" y2="50" stroke="#dc2626" stroke-width="3.5" marker-end="url(#arr-res)"/>
          <text x="230" y="85" fill="#dc2626" font-size="16" font-weight="800" font-family="system-ui">Resultant R = A + B</text>
          <!-- Angle arc -->
          <path d="M 110,150 A 50,50 0 0,0 95,115" fill="none" stroke="#ca8a04" stroke-width="2"/>
          <text x="115" y="130" fill="#ca8a04" font-size="14" font-weight="700" font-family="system-ui">θ</text>
        </svg>
      </div>

      <div class="worked-box">
        <div class="worked-title">💡 Worked Problem: Resultant of Equal Forces at 120°</div>
        <p style="margin:0 0 8px;font-size:0.92rem;line-height:1.5;"><strong>Problem:</strong> Two forces of equal magnitude F act at an angle θ = 120° to each other. Find the magnitude and direction of their resultant.</p>
        <div style="background:var(--bg-card, #fff);border:1px solid #e2e8f0;border-radius:8px;padding:10px 14px;font-size:0.9rem;line-height:1.5;">
          <strong>Solution:</strong><br>
          1. Apply resultant formula: R = √(F² + F² + 2·F·F·cos 120°).<br>
          2. Since cos 120° = -0.5: R = √(2F² + 2F²(-0.5)) = √(2F² - F²) = √F² = <strong>F</strong>.<br>
          3. Direction: tan α = (F sin 120°) / (F + F cos 120°) = (F · √3/2) / (F - F/2) = (√3/2) / (1/2) = √3 ⇒ α = <strong>60°</strong>.<br>
          The resultant of two equal forces at 120° has magnitude EXACTLY EQUAL to each force, bisecting the angle!</p>
        </div>
      </div>

      <div class="trap-box">
        <div class="trap-title">⚠️ Common Trap &amp; Error Prevention</div>
        <p style="margin:0;font-size:0.92rem;"><strong>Trap:</strong> Adding vector magnitudes algebraically (e.g. 5 N + 5 N = 10 N) regardless of angle.<br>
        <strong>Repair:</strong> 5 N + 5 N can produce any value from 0 N (at 180°) to 10 N (at 0°). Always use the cosine addition law.</p>
      </div>
    </article>

    <!-- STUDY UNIT 3 -->
    <article class="study-unit-card" id="unit-3">
      <div class="study-unit-header">
        <div>
          <span class="unit-tag">Unit 3 of 6 · Cartesian Analysis</span>
          <h2 class="unit-title">Cartesian Resolution &amp; Orthogonal Unit Vectors</h2>
        </div>
        <div class="formula-tag">A = A_x î + A_y ĵ + A_z k̂ &nbsp;|&nbsp; A_x = A cosθ, A_y = A sinθ</div>
      </div>

      <div class="key-step-box">
        <div class="key-step-title">⚡ The Crucial Inferential Step</div>
        <p style="margin:0;font-size:0.95rem;line-height:1.5;">Any vector in 2D or 3D can be uniquely decomposed into mutually perpendicular projections along the standard Cartesian unit vectors (î, ĵ, k̂). To add N arbitrary vectors, simply resolve each vector into components, sum the components independently (<strong>R_x = Σ A_ix, R_y = Σ A_iy</strong>), and reassemble the final resultant magnitude via Pythagoras: <strong>|R| = √(R_x² + R_y²)</strong>.</p>
      </div>

      <div class="derivation-steps">
        <div class="step-item">
          <span class="step-badge">1</span>
          <div class="step-content">
            <strong>Trigonometric Projections</strong>
            <em>Adjacent component = Magnitude × cos(angle). Opposite component = Magnitude × sin(angle).</em>
          </div>
        </div>
        <div class="step-item">
          <span class="step-badge">2</span>
          <div class="step-content">
            <strong>Component-Wise Addition Rule</strong>
            <em>A + B = (A_x + B_x) î + (A_y + B_y) ĵ. This reduces complex multi-angle geometry into elementary arithmetic.</em>
          </div>
        </div>
        <div class="step-item">
          <span class="step-badge">3</span>
          <div class="step-content">
            <strong>Angle Recovery with Quadrant Awareness</strong>
            <em>tan θ = R_y / R_x. Check the signs of R_x and R_y to position θ in the correct Cartesian quadrant (I, II, III, or IV).</em>
          </div>
        </div>
      </div>

      <div class="worked-box">
        <div class="worked-title">💡 Worked Problem: Resultant of Three Concurrent Forces</div>
        <p style="margin:0 0 8px;font-size:0.92rem;line-height:1.5;"><strong>Problem:</strong> Three forces act on a particle: F₁ = 10 N along +x axis, F₂ = 20 N along +y axis, F₃ = 10 N along -x axis. Find the net resultant force.</p>
        <div style="background:var(--bg-card, #fff);border:1px solid #e2e8f0;border-radius:8px;padding:10px 14px;font-size:0.9rem;line-height:1.5;">
          <strong>Solution:</strong><br>
          1. Resolve into components:<br>
          • F₁ = 10 î + 0 ĵ.<br>
          • F₂ = 0 î + 20 ĵ.<br>
          • F₃ = -10 î + 0 ĵ.<br>
          2. Sum components: R_x = 10 + 0 - 10 = 0 N; R_y = 0 + 20 + 0 = 20 N.<br>
          3. Reassemble: R = 0 î + 20 ĵ ⇒ <strong>|R| = 20 N, pointing strictly along +y direction (90°)</strong>.
        </div>
      </div>

      <div class="trap-box">
        <div class="trap-title">⚠️ Common Trap &amp; Error Prevention</div>
        <p style="margin:0;font-size:0.92rem;"><strong>Trap:</strong> Blindly using cos for the horizontal axis when the problem gives the angle relative to the vertical axis.<br>
        <strong>Repair:</strong> The cosine component ALWAYS belongs to the axis adjacent to the reference angle θ.</p>
      </div>
    </article>

    <!-- STUDY UNIT 4 -->
    <article class="study-unit-card" id="unit-4">
      <div class="study-unit-header">
        <div>
          <span class="unit-tag">Unit 4 of 6 · Kinematic Transformations</span>
          <h2 class="unit-title">Vector Subtraction &amp; Change in State Vectors</h2>
        </div>
        <div class="formula-tag">A - B = A + (-B) &nbsp;|&nbsp; |Δv| = 2v sin(Δθ / 2) &nbsp;(UCM)</div>
      </div>

      <div class="key-step-box">
        <div class="key-step-title">⚡ The Crucial Inferential Step</div>
        <p style="margin:0;font-size:0.95rem;line-height:1.5;">Vector subtraction is defined as the addition of the negative vector: <strong>A - B = A + (-B)</strong>. In physics, acceleration is defined by change in velocity: <strong>a = Δv / Δt = (v_final - v_initial) / Δt</strong>. Even if speed is constant, rotating a velocity vector produces a non-zero subtraction difference vector Δv directed inward!</p>
      </div>

      <div class="derivation-steps">
        <div class="step-item">
          <span class="step-badge">1</span>
          <div class="step-content">
            <strong>Geometric Construction of -B</strong>
            <em>Reverse the arrowhead of vector B by exactly 180° while keeping its length unchanged. Add A and -B head-to-tail.</em>
          </div>
        </div>
        <div class="step-item">
          <span class="step-badge">2</span>
          <div class="step-content">
            <strong>Change in Velocity for Equal Speed v at Angle θ</strong>
            <em>|Δv| = √(v² + v² - 2v² cosθ) = √(2v²(1 - cosθ)) = √(2v² · 2 sin²(θ/2)) = <strong>2v sin(θ/2)</strong>.</em>
          </div>
        </div>
      </div>

      <div class="worked-box">
        <div class="worked-title">💡 Worked Problem: Car Turning a Right-Angle Corner</div>
        <p style="margin:0 0 8px;font-size:0.92rem;line-height:1.5;"><strong>Problem:</strong> A car travels east at speed v = 20 m/s and turns north onto a crossroad, continuing at the same speed v = 20 m/s. Calculate the change in velocity vector Δv and its direction.</p>
        <div style="background:var(--bg-card, #fff);border:1px solid #e2e8f0;border-radius:8px;padding:10px 14px;font-size:0.9rem;line-height:1.5;">
          <strong>Solution:</strong><br>
          1. Initial velocity: v_i = +20 î m/s (East).<br>
          2. Final velocity: v_f = +20 ĵ m/s (North).<br>
          3. Change in velocity: Δv = v_f - v_i = <strong>-20 î + 20 ĵ m/s</strong>.<br>
          4. Magnitude: |Δv| = √((-20)² + 20²) = √(400 + 400) = √800 = <strong>28.28 m/s</strong>.<br>
          5. Direction: tan θ = 20 / (-20) = -1 ⇒ <strong>North-West (135° from East)</strong>.<br>
          Notice: Even though speed did not change by a single m/s, the velocity change is 28.28 m/s!
        </div>
      </div>

      <div class="trap-box">
        <div class="trap-title">⚠️ Common Trap &amp; Error Prevention</div>
        <p style="margin:0;font-size:0.92rem;"><strong>Trap:</strong> Claiming Δv = 0 because speed remained 20 m/s before and after the turn.<br>
        <strong>Repair:</strong> Speed is a scalar (|v|); velocity is a vector. Direction change requires non-zero acceleration.</p>
      </div>
    </article>

    <!-- STUDY UNIT 5 -->
    <article class="study-unit-card" id="unit-5">
      <div class="study-unit-header">
        <div>
          <span class="unit-tag">Unit 5 of 6 · Energy &amp; Projections</span>
          <h2 class="unit-title">Scalar (Dot) Product: Geometric Projections &amp; Work Done</h2>
        </div>
        <div class="formula-tag">A · B = |A||B| cosθ = A_x B_x + A_y B_y + A_z B_z &nbsp;|&nbsp; A ⊥ B ⇔ A · B = 0</div>
      </div>

      <div class="key-step-box">
        <div class="key-step-title">⚡ The Crucial Inferential Step</div>
        <p style="margin:0;font-size:0.95rem;line-height:1.5;">The scalar (dot) product multiplies the magnitude of one vector by the <strong>collinear projection of the second vector onto the first</strong>: <strong>A · B = A (B cosθ)</strong>. The result is a pure SCALAR. In physics, Work is the dot product of force and displacement: <strong>W = F · d</strong>. If force is perpendicular to displacement (θ = 90°), the work done is STRICTLY ZERO.</p>
      </div>

      <div class="derivation-steps">
        <div class="step-item">
          <span class="step-badge">1</span>
          <div class="step-content">
            <strong>Orthonormal Basis Identities</strong>
            <em>î · î = ĵ · ĵ = k̂ · k̂ = 1. Cross-terms: î · ĵ = ĵ · k̂ = k̂ · î = 0.</em>
          </div>
        </div>
        <div class="step-item">
          <span class="step-badge">2</span>
          <div class="step-content">
            <strong>Orthogonality Test</strong>
            <em>Two non-zero vectors A and B are perpendicular if and only if their dot product vanishes: <strong>A · B = 0</strong>.</em>
          </div>
        </div>
        <div class="step-item">
          <span class="step-badge">3</span>
          <div class="step-content">
            <strong>Scalar Projection Formula</strong>
            <em>Projection of B onto A = B cosθ = <strong>(A · B) / |A|</strong>.</em>
          </div>
        </div>
      </div>

      <div class="worked-box">
        <div class="worked-title">💡 Worked Problem: Work Done by a 3D Force</div>
        <p style="margin:0 0 8px;font-size:0.92rem;line-height:1.5;"><strong>Problem:</strong> A force F = (3 î + 4 ĵ - 2 k̂) N displaces an object from point P(1, 2, 0) m to point Q(4, 6, 2) m. Evaluate the work done by the force and determine the angle between force and displacement.</p>
        <div style="background:var(--bg-card, #fff);border:1px solid #e2e8f0;border-radius:8px;padding:10px 14px;font-size:0.9rem;line-height:1.5;">
          <strong>Solution:</strong><br>
          1. Displacement vector: d = (4 - 1) î + (6 - 2) ĵ + (2 - 0) k̂ = 3 î + 4 ĵ + 2 k̂ m.<br>
          2. Work done: W = F · d = (3)(3) + (4)(4) + (-2)(2) = 9 + 16 - 4 = <strong>21.00 J</strong>.<br>
          3. Magnitudes: |F| = √(3² + 4² + (-2)²) = √(9 + 16 + 4) = √29 ≈ 5.385 N.<br>
          |d| = √(3² + 4² + 2²) = √(9 + 16 + 4) = √29 ≈ 5.385 m.<br>
          4. Angle: cos θ = (F · d) / (|F||d|) = 21 / (√29 × √29) = 21 / 29 ≈ 0.7241 ⇒ θ = <strong>43.6°</strong>.
        </div>
      </div>

      <div class="trap-box">
        <div class="trap-title">⚠️ Common Trap &amp; Error Prevention</div>
        <p style="margin:0;font-size:0.92rem;"><strong>Trap:</strong> Assigning a unit vector direction (î, ĵ, k̂) to the output of a dot product.<br>
        <strong>Repair:</strong> The dot product is a SCALAR; its result has magnitude and sign, but zero spatial direction.</p>
      </div>
    </article>

    <!-- STUDY UNIT 6 -->
    <article class="study-unit-card" id="unit-6">
      <div class="study-unit-header">
        <div>
          <span class="unit-tag">Unit 6 of 6 · Rotational Vectors</span>
          <h2 class="unit-title">Vector (Cross) Product: Torque &amp; Right-Hand Rules</h2>
        </div>
        <div class="formula-tag">A × B = (|A||B| sinθ) n̂ &nbsp;|&nbsp; A × B = -(B × A) &nbsp;|&nbsp; τ = r × F</div>
      </div>

      <div class="key-step-box">
        <div class="key-step-title">⚡ The Crucial Inferential Step</div>
        <p style="margin:0;font-size:0.95rem;line-height:1.5;">The vector (cross) product produces a <strong>new vector strictly perpendicular to the plane containing A and B</strong>, whose orientation is determined by the <strong>Right-Hand Screw Rule</strong>. Its magnitude equals the geometric area of the parallelogram spanned by A and B: <strong>|A × B| = AB sinθ</strong>. Unlike regular multiplication, the cross product is <strong>anti-commutative: A × B = -(B × A)</strong>!</p>
      </div>

      <div class="derivation-steps">
        <div class="step-item">
          <span class="step-badge">1</span>
          <div class="step-content">
            <strong>Right-Hand Screw Rule</strong>
            <em>Point right-hand fingers along vector A and curl them toward vector B through the smaller angle θ. Your extended thumb points along the unit normal vector n̂.</em>
          </div>
        </div>
        <div class="step-item">
          <span class="step-badge">2</span>
          <div class="step-content">
            <strong>Collinear &amp; Parallel Vectors Vanish</strong>
            <em>If A and B are parallel or antiparallel (θ = 0° or 180°), sin θ = 0 ⇒ <strong>A × B = 0</strong>. In particular, A × A = 0.</em>
          </div>
        </div>
        <div class="step-item">
          <span class="step-badge">3</span>
          <div class="step-content">
            <strong>Determinant Matrix Evaluation</strong>
            <em>A × B = det [î, ĵ, k̂; A_x, A_y, A_z; B_x, B_y, B_z] = î(A_y B_z - A_z B_y) - ĵ(A_x B_z - A_z B_x) + k̂(A_x B_y - A_y B_x).</em>
          </div>
        </div>
      </div>

      <div class="worked-box">
        <div class="worked-title">💡 Worked Problem: Rotational Torque on a Wrench</div>
        <p style="margin:0 0 8px;font-size:0.92rem;line-height:1.5;"><strong>Problem:</strong> A position vector r = (0.4 î + 0.2 ĵ) m locates a bolt. A force F = (-20 î + 50 ĵ) N is applied at the end of the wrench. Evaluate the torque vector τ = r × F acting about the origin.</p>
        <div style="background:var(--bg-card, #fff);border:1px solid #e2e8f0;border-radius:8px;padding:10px 14px;font-size:0.9rem;line-height:1.5;">
          <strong>Solution:</strong><br>
          1. Apply 2D cross product: r × F = (r_x F_y - r_y F_x) k̂.<br>
          2. r_x F_y = (0.4) × (50) = +20 N·m.<br>
          3. r_y F_x = (0.2) × (-20) = -4 N·m.<br>
          4. τ = (20 - (-4)) k̂ = <strong>+24 k̂ N·m</strong>.<br>
          The torque vector has magnitude <strong>24 N·m</strong> pointing strictly out of the page (+z direction, counter-clockwise rotation).
        </div>
      </div>

      <div class="trap-box">
        <div class="trap-title">⚠️ Common Trap &amp; Error Prevention</div>
        <p style="margin:0;font-size:0.92rem;"><strong>Trap:</strong> Commuting the order of terms: writing r × F = F × r.<br>
        <strong>Repair:</strong> Swapping the cross-product operands reverses the vector direction: F × r = -24 k̂ N·m (clockwise). Order matters strictly.</p>
      </div>
    </article>

    <!-- Bottom Return & Practice Navigation -->
    <div style="text-align:center;margin:3rem 0 1rem;padding:2rem;background:var(--bg-soft, #f8fafc);border-radius:14px;border:1px solid var(--border, #e2e8f0);">
      <h3 style="margin:0 0 0.5rem;font-size:1.3rem;font-weight:800;color:var(--text-main);">Ready to Test Your Mastery?</h3>
      <p style="color:var(--text-muted);margin:0 0 1.25rem;">Apply these 6 foundational concepts to authentic Olympiad &amp; JEE past-paper questions in the Question Bank.</p>
      <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap;">
        <a class="g9-btn-action g9-btn-qb" href="../../question-bank/index.html?subject=Physics&topic=vectors&mode=study" style="font-weight:800;font-size:1rem;padding:12px 24px;">
          🎯 Practice Vectors in Question Bank &rarr;
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

def main():
    root = "web/public/physics"
    targets = [
        ("motion-1d/index.html", build_motion_1d()),
        ("motion-2d/index.html", build_motion_2d()),
        ("nlm/index.html", build_nlm()),
        ("vectors/index.html", build_vectors()),
    ]
    for rel_path, content in targets:
        full_path = os.path.join(root, rel_path)
        with open(full_path, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"Generated: {full_path} ({len(content)} bytes)")

if __name__ == "__main__":
    main()
