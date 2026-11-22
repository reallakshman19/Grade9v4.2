#!/usr/bin/env python3
"""
scripts/reconcile_biology_assets.py
Reconciles path references, inserts Section 19 governance banners,
and aligns navigation links in all standalone Biology HTML pages and scripts.
"""

import os
import re

GOV_BANNER = """  <div style="background:#fef3c7;border-bottom:1px solid #fde68a;padding:8px 16px;text-align:center;font-size:0.875rem;color:#92400e;font-weight:600;">
    Academic Status: HOLD · Formative Exploration Mode (Grade9 v4.1 Parity Candidate) · No academic approval inferred from software validation.
  </div>"""

MODERN_HEADER = """  <header class="mast">
    <div class="container top">
      <a class="logo" href="../index.html#/home"><i>G9</i>Grade9 STEM</a>
      <nav class="tabs" aria-label="STEM subject navigation">
        <a href="../index.html#/home">🏠 Home</a>
        <a href="../index.html#/subject/physics">⚛ Physics</a>
        <a href="../chemistry/index.html">🧪 Chemistry</a>
        <a href="index.html" aria-current="page" style="font-weight:800;color:#16a34a;">🧬 Biology</a>
        <a href="../index.html#/subject/mathematics">📐 Mathematics</a>
        <a href="../index.html#/bank">📋 Question Bank</a>
        <a href="../index.html#/competitive/exam:nsejs">🏆 Competitive</a>
        <a href="../index.html#/architecture">🧭 Architecture</a>
      </nav>
    </div>
  </header>"""

CORE1_HEADER = """<header class="mast">
  <div class="container top">
    <a class="logo" href="../../../index.html#/home"><i>G9</i>Grade9 STEM</a>
    <nav class="tabs" aria-label="STEM subject navigation">
      <a href="../../../index.html#/home">🏠 Home</a>
      <a href="../../../index.html#/subject/physics">⚛ Physics</a>
      <a href="../../../chemistry/index.html">🧪 Chemistry</a>
      <a href="../../index.html" aria-current="page" style="font-weight:800;color:#16a34a;">🧬 Biology</a>
      <a href="../../../index.html#/subject/mathematics">📐 Mathematics</a>
      <a href="../../../index.html#/bank">📋 Question Bank</a>
    </nav>
  </div>
</header>"""

def reconcile_reader(reader_path):
    if not os.path.exists(reader_path):
        return
    with open(reader_path, "r", encoding="utf-8") as f:
        js = f.read()

    # Robust fetch logic
    old_fetch_block = """      const resp = await fetch("../data/biology-core2-candidates.v1.json");
      if (!resp.ok) throw new Error("HTTP " + resp.status + " while loading Biology question bank data.");
      const data = await resp.json();"""

    new_fetch_block = """      let data = null;
      const candidatePaths = [
        "./data/biology-core2-candidates.v1.json",
        "../data/biology-core2-candidates.v1.json",
        "/data/biology-core2-candidates.v1.json",
        "/biology/data/biology-core2-candidates.v1.json"
      ];
      for (const p of candidatePaths) {
        try {
          const resp = await fetch(p);
          if (resp.ok) {
            data = await resp.json();
            break;
          }
        } catch (_) {}
      }
      if (!data) throw new Error("Could not load biology-core2-candidates.v1.json from any known path.");"""

    if old_fetch_block in js:
        js = js.replace(old_fetch_block, new_fetch_block)
    elif "const resp = await fetch(" in js:
        # regex replace fetch call
        js = re.sub(
            r'const resp = await fetch\("[^"]+"\);\s*if \(!resp\.ok\)[^;]+;\s*const data = await resp\.json\(\);',
            new_fetch_block,
            js
        )

    # Robust figure img src
    js = js.replace('img.src = "../assets/" + fig;', 'img.src = "assets/" + fig;\n        img.onerror = function() { img.src = "../assets/" + fig; };')

    with open(reader_path, "w", encoding="utf-8") as f:
        f.write(js)
    print(f"Reconciled reader: {reader_path}")

def reconcile_index_html(html_path):
    if not os.path.exists(html_path):
        return
    with open(html_path, "r", encoding="utf-8") as f:
        html = f.read()

    # Replace CSS references
    html = html.replace('href="../../site.css"', 'href="../css/site.css"')
    html = html.replace('href="../../css/tablet-12-7.css"', 'href="../css/tablet-12-7.css"')
    html = html.replace('href="../../css/site-search.css"', 'href="../css/tablet-12-7.css"')

    # Replace Header
    m = re.search(r'<header class="mast">.*?</header>', html, re.DOTALL)
    if m:
        html = html[:m.start()] + MODERN_HEADER + "\n" + GOV_BANNER + html[m.end():]
    else:
        # Insert after <body>
        html = html.replace('<body>', '<body>\n' + MODERN_HEADER + '\n' + GOV_BANNER)

    # Breadcrumbs
    html = html.replace(
        '<div class="hero-breadcrumbs">\n        <a href="../../index.html">Home</a> / <a href="../index.html">NSEJS</a> / <span>Biology Topics</span>\n      </div>',
        '<div class="hero-breadcrumbs">\n        <a href="../index.html#/home">Home</a> / <a href="../index.html#/subject/biology">Subjects</a> / <span>Biology Topics</span>\n      </div>'
    )
    html = html.replace(
        '<div class="hero-breadcrumbs">\r\n        <a href="../../index.html">Home</a> / <a href="../index.html">NSEJS</a> / <span>Biology Topics</span>\r\n      </div>',
        '<div class="hero-breadcrumbs">\n        <a href="../index.html#/home">Home</a> / <a href="../index.html#/subject/biology">Subjects</a> / <span>Biology Topics</span>\n      </div>'
    )

    # Script tags at bottom
    html = html.replace('src="../js/core2-biology-reader.js?v=4.1.5"', 'src="./js/core2-biology-reader.js"')
    html = html.replace('src="../js/core2-biology-reader.js"', 'src="./js/core2-biology-reader.js"')
    # Remove missing external site-search script if present
    html = re.sub(r'<script src="\.\./\.\./js/site-search\.js"[^>]*></script>', '', html)
    html = re.sub(r'<script defer src="\.\./js/skip-mandatory-response\.js"[^>]*></script>', '', html)

    with open(html_path, "w", encoding="utf-8") as f:
        f.write(html)
    print(f"Reconciled: {html_path}")

def reconcile_core1_unit(html_path):
    if not os.path.exists(html_path):
        return
    with open(html_path, "r", encoding="utf-8") as f:
        html = f.read()

    # Fix CSS links
    html = html.replace('href="../../../../site.css"', 'href="../../../css/site.css"')
    html = html.replace('href="../../../../css/tablet-12-7.css"', 'href="../../../css/tablet-12-7.css"')
    html = html.replace('href="../../../site.css"', 'href="../../../css/site.css"')
    html = html.replace('href="../../../css/tablet-12-7.css"', 'href="../../../css/tablet-12-7.css"')

    # Replace header
    m = re.search(r'<header class="mast">.*?</header>', html, re.DOTALL)
    if m:
        html = html[:m.start()] + CORE1_HEADER + "\n" + GOV_BANNER + html[m.end():]
    else:
        html = html.replace('<body>', '<body>\n' + CORE1_HEADER + '\n' + GOV_BANNER)

    # Fix breadcrumb links
    html = html.replace('href="../../../../index.html"', 'href="../../../index.html#/home"')
    html = html.replace('href="../../../index.html"', 'href="../../../index.html#/home"')

    with open(html_path, "w", encoding="utf-8") as f:
        f.write(html)
    print(f"Reconciled core1 unit: {html_path}")

def reconcile_redirect(html_path):
    if not os.path.exists(html_path):
        return
    with open(html_path, "r", encoding="utf-8") as f:
        html = f.read()
    html = html.replace('href="../../site.css"', 'href="../css/site.css"')
    html = html.replace('href="../../css/tablet-12-7.css"', 'href="../css/tablet-12-7.css"')
    html = html.replace('href="../../../site.css"', 'href="../../css/site.css"')
    html = html.replace('href="../../../css/tablet-12-7.css"', 'href="../../css/tablet-12-7.css"')
    with open(html_path, "w", encoding="utf-8") as f:
        f.write(html)
    print(f"Reconciled redirect: {html_path}")

def main():
    dirs = [
        r"d:\CodeD\g9v4.2-2\web\biology",
        r"d:\CodeD\g9v4.2-2\web\public\biology"
    ]
    for d in dirs:
        reconcile_reader(os.path.join(d, "js", "core2-biology-reader.js"))
        reconcile_index_html(os.path.join(d, "index.html"))
        reconcile_redirect(os.path.join(d, "authored-practice.html"))
        reconcile_redirect(os.path.join(d, "question-bank.html"))
        reconcile_redirect(os.path.join(d, "core1", "index.html"))
        reconcile_core1_unit(os.path.join(d, "core1", "bio-viral-genetics-d3-r1", "index.html"))
        reconcile_core1_unit(os.path.join(d, "core1", "bio-immunology-defense-d3-r1", "index.html"))
        reconcile_core1_unit(os.path.join(d, "core1", "bio-genetics-coordination-r1", "index.html"))

if __name__ == "__main__":
    main()
