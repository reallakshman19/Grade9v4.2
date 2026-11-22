#!/usr/bin/env python3
"""
scripts/reconcile_platform_html_links.py
Audits and reconciles broken relative paths, asset references, and legacy links
across all 186 standalone and ported HTML files in web/.
"""

import os
import re
from pathlib import Path

# Mapping of known broken targets to canonical routes or valid relative paths
EXACT_REPLACEMENTS = {
    # Atlas links
    "../../atlas/index.html#bonding": "#/subject/chemistry/topic/bonding",
    "../../atlas/index.html#gases": "#/subject/chemistry/topic/gases",
    "../../atlas/index.html#mole": "#/subject/chemistry/topic/stoichiometry",
    "../../atlas/index.html#redox": "#/subject/chemistry/topic/redox",
    "../../atlas/index.html#nlm": "#/subject/physics/topic/nlm",
    "../../atlas/index.html#fluids": "#/subject/physics/topic/fluids",
    "../../atlas/index.html#motion-1d": "#/subject/physics/topic/motion-1d",
    "../../atlas/index.html#motion-2d": "#/subject/physics/topic/motion-plane",
    "../../atlas/index.html#vectors": "#/subject/mathematics/topic/vectors",
    "../../atlas/index.html#coordinate-geometry": "#/subject/mathematics/topic/coord-geom",
    "../../atlas/index.html#euclids-geometry": "#/subject/mathematics/topic/euclid",
    "../../atlas/index.html#polynomials": "#/subject/mathematics/topic/polynomials",
    "../../atlas/index.html#theory-of-equations": "#/subject/mathematics/topic/theory-equations",
    "../../atlas/index.html": "#/home",

    # Subject relative links
    "../../physics/index.html": "#/subject/physics",
    "../physics/index.html": "#/subject/physics",
    "/physics/index.html": "#/subject/physics",
    "../public/physics/index.html": "#/subject/physics",
    "../../mathematics/index.html": "#/subject/mathematics",
    "/mathematics/index.html": "#/subject/mathematics",
    "../../mathematics/linear-equations/index.html": "#/subject/mathematics/topic/linear-equations",
    "../../architecture/index.html": "#/architecture",
    "../../../architecture/index.html": "#/architecture",
    "../official-sources.html": "#/architecture",
    "../../tools/run-builder/index.html": "#/architecture",
    "../../test/index.html": "#/home",
    "../../test/imo-grade9/core1a.html": "#/subject/mathematics",
    "../mathematics-imo-grade9-master-suite.html": "#/subject/mathematics",

    # Question map biology links
    "../core2/question-map.html#biology": "#/subject/biology",
    "../core2/question-map.html#module-bio-organisation-living-world-r1": "#/subject/biology",
    "../core2/question-map.html#module-bio-viral-genetics-d3-r1": "#/subject/biology",
    "../core2/question-map.html#module-bio-life-processes-r1": "#/subject/biology",
    "../core2/question-map.html#module-bio-immunology-defense-d3-r1": "#/subject/biology",
    "../core2/question-map.html#module-bio-genetics-coordination-r1": "#/subject/biology",
    "../core2/question-map.html#module-bio-environment-resources-r1": "#/subject/biology",

    # Math practice links from imo suite
    "practice/core2-mathematics-reasoning-grade9-master.html": "#/subject/mathematics",
    "practice/core2-mathematics-polynomials-grade9-master.html": "#/subject/mathematics/topic/polynomials",
    "practice/core2-mathematics-commercial-math-grade9-master.html": "#/subject/mathematics",
    "practice/core2-mathematics-linear-equations-grade9-master.html": "#/subject/mathematics/topic/linear-equations",
    "practice/core2-mathematics-surface-areas-volumes-grade9-master.html": "#/subject/mathematics",
    "practice/core2-mathematics-statistics-grade9-master.html": "#/subject/mathematics",
    "practice/core2-mathematics-coordinate-geometry-grade9-master.html": "#/subject/mathematics/topic/coord-geom",
    "practice/core2-mathematics-euclid-grade9-master.html": "#/subject/mathematics/topic/euclid",
    "practice/core2-mathematics-lines-and-angles-grade9-master.html": "#/subject/mathematics/topic/euclid",
    "practice/core2-mathematics-triangles-grade9-master.html": "#/subject/mathematics/topic/euclid",
    "practice/core2-mathematics-probability-grade9-master.html": "#/subject/mathematics",
    "practice/core2-mathematics-heron-grade9-master.html": "#/subject/mathematics",
    "practice/core2-mathematics-quadrilaterals-grade9-master.html": "#/subject/mathematics/topic/euclid",
    "practice/core2-mathematics-circles-grade9-master.html": "#/labs/lab:circles-master",

    # Double public path fixes in web/public/standalone
    "../public/vendor/katex/0.16.8/katex.min.css": "../vendor/katex/0.16.8/katex.min.css",
    "../public/vendor/katex/0.16.8/katex.min.js": "../vendor/katex/0.16.8/katex.min.js",
    "../public/vendor/katex/0.16.8/contrib/auto-render.min.js": "../vendor/katex/0.16.8/contrib/auto-render.min.js",
    "../../public/vendor/tailwind/3.4.17/tailwind-play.js": "../../vendor/tailwind/3.4.17/tailwind-play.js",
    "../../public/css/site.css": "../../css/site.css",
    "../../public/core-learning/data.js": "../../core-learning/data.js",
    "../../public/js/display-controls.js": "../../js/display-controls.js",
    "../../public/js/site-header.js": "../../js/site-header.js",
    "../../public/data/data.js": "../../data/data.js",
    "../../public/motion-session/app.mjs": "../../motion-session/app.mjs",
    "../../../public/index.html": "#/home",
    "../../public/index.html": "#/home",
    "../public/index.html": "#/home",
}

def transform_link(val: str, file_path: Path) -> str:
    # Check exact replacements first
    if val in EXACT_REPLACEMENTS:
        return EXACT_REPLACEMENTS[val]

    # Stale index.html links with fragments or queries
    # e.g. ../../index.html#/bank?subject=... or ../../../index.html#/home
    m = re.match(r'^(\.\./)+index\.html(#.*|\?.*)?$', val)
    if m:
        extra = m.group(2) or ''
        if extra.startswith('#'):
            return extra
        elif extra.startswith('?'):
            return f"#/bank{extra}"
        else:
            return "#/home"

    # Any remaining relative link pointing to a non-existent file
    clean_val = val.split('?')[0].split('#')[0]
    if clean_val and not val.startswith(('http://', 'https://', 'data:', 'mailto:', '#', 'javascript:')):
        target = (file_path.parent / clean_val).resolve()
        if not target.exists():
            if 'index.html' in val:
                return '#/home'
            if 'physics' in val:
                return '#/subject/physics'
            if 'mathematics' in val:
                return '#/subject/mathematics'
            if 'chemistry' in val:
                return '#/subject/chemistry'
            if 'biology' in val:
                return '#/subject/biology'
            if 'architecture' in val:
                return '#/architecture'
            if 'bank' in val:
                return '#/bank'

    return val

def reconcile_file(f: Path) -> int:
    try:
        content = f.read_text(encoding='utf-8', errors='ignore')
    except Exception:
        return 0

    replacements = 0

    def replace_attr(m):
        nonlocal replacements
        attr = m.group(1)
        val = m.group(2)
        new_val = transform_link(val, f)
        if new_val != val:
            replacements += 1
            return f'{attr}="{new_val}"'
        return m.group(0)

    new_content = re.sub(r'(href|src)=["\']([^"\']+)["\']', replace_attr, content)

    if replacements > 0:
        f.write_text(new_content, encoding='utf-8')

    return replacements

def main():
    html_files = list(Path('web').rglob('*.html'))
    print(f"Scanning and reconciling links in {len(html_files)} HTML files...")

    total_modified_files = 0
    total_replacements = 0

    for f in html_files:
        n = reconcile_file(f)
        if n > 0:
            total_modified_files += 1
            total_replacements += n

    print(f"Successfully reconciled {total_replacements} broken references across {total_modified_files} files.")

if __name__ == '__main__':
    main()
