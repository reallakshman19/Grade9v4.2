#!/usr/bin/env python3
"""
Generate complete, authentic, rich Core Study Workspaces for all Physics topics in Grade9V3.5:
1. Motion in One Dimension (web/public/physics/motion-1d/index.html)
2. Motion in a Plane (2D) (web/public/physics/motion-2d/index.html)
3. Newton's Laws of Motion (web/public/physics/nlm/index.html)
4. Vector Methods in Physics (web/public/physics/vectors/index.html)

Each page contains:
- Portal header & breadcrumbs
- Quick action launch bar (Question Bank & Explorers)
- Sticky concept jump navigation
- 6 Comprehensive learning units with deep mathematical derivations, SVG diagrams (>=14px typography),
  worked Olympiad / authentic past-paper anchor problems, common trap prevention, and quick check grids.
- 100% Top-level native HTML (zero iframe).
"""

import os
import sys

COMMON_STYLE = """
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
"""

def get_header(topic_title, breadcrumb_label):
    return f"""<!doctype html>
<html lang="en" data-g9-shell>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{topic_title} Workspace · Grade9V3.5</title>
  <link rel="stylesheet" href="../../css/modern-learner.css">
  <style>
{COMMON_STYLE}
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
      <a href="../../index.html">Home</a> <span>/</span> <a href="../../physics/index.html">Physics</a> <span>/</span> <span>{breadcrumb_label}</span>
    </div>
  </nav>

  <main class="g9-container">
"""

def get_footer(topic_qb_topic):
    return f"""
    <!-- Bottom Return & Practice Navigation -->
    <div style="text-align:center;margin:3rem 0 1rem;padding:2rem;background:var(--bg-soft, #f8fafc);border-radius:14px;border:1px solid var(--border, #e2e8f0);">
      <h3 style="margin:0 0 0.5rem;font-size:1.3rem;font-weight:800;color:var(--text-main);">Ready to Test Your Mastery?</h3>
      <p style="color:var(--text-muted);margin:0 0 1.25rem;">Apply these 6 foundational concepts to authentic Olympiad &amp; JEE past-paper questions in the Question Bank.</p>
      <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap;">
        <a class="g9-btn-action g9-btn-qb" href="../../question-bank/index.html?subject=Physics&topic={topic_qb_topic}&mode=study" style="font-weight:800;font-size:1rem;padding:12px 24px;">
          🎯 Practice in Question Bank &rarr;
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
</html>
"""

print("Base generator template defined successfully.")
