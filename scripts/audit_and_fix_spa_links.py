#!/usr/bin/env python3
import os
import re
from pathlib import Path

def get_rel_root(file_path: Path) -> str:
    # file_path is relative to workspace root (e.g., 'web/public/topics/fluids/index.html')
    # If path starts with 'web/public/', root SPA is at 'web/public/index.html' -> but wait:
    # in Vite publicDir is 'web/public', which serves as '/' in the dev server.
    # But in 'web/', the root SPA entry is 'web/index.html'.
    # In both cases, from 'web/public/topics/fluids/index.html',
    # relative to web/public, it is 2 levels deep: '../../index.html'.
    # From 'web/chemistry/bonding/index.html', relative to web, it is 2 levels deep: '../../index.html'.
    parts = file_path.parts
    if 'public' in parts:
        pub_idx = parts.index('public')
        depth = len(parts) - 1 - (pub_idx + 1)
    elif 'web' in parts:
        web_idx = parts.index('web')
        depth = len(parts) - 1 - (web_idx + 1)
    else:
        depth = 0
    
    if depth <= 0:
        return './'
    return '../' * depth

def audit():
    html_files = []
    for root, dirs, files in os.walk('web'):
        for f in files:
            if f.endswith('.html'):
                p = Path(root) / f
                if p == Path('web/index.html'):
                    continue
                html_files.append(p)

    print(f'Total subpage HTML files: {len(html_files)}')
    modified_count = 0
    total_links_fixed = 0

    for p in html_files:
        content = p.read_text(encoding='utf-8', errors='ignore')
        rel_root = get_rel_root(p)
        target_root_index = f'{rel_root}index.html'

        # Regex to find href="#/..."
        # Replace href="#/..." with href="{target_root_index}#/..."
        # Avoid already replaced href="...index.html#/..."
        pattern = re.compile(r'href=([\"\'])#/(.*?)\1')
        matches = pattern.findall(content)
        if matches:
            total_links_fixed += len(matches)
            modified_count += 1
            new_content = pattern.sub(rf'href=\1{target_root_index}#/\2\1', content)
            p.write_text(new_content, encoding='utf-8')
            print(f'Fixed {len(matches)} links in: {p} (rel_root={rel_root})')

    print(f'\nDone! Modified {modified_count} files, fixed {total_links_fixed} broken SPA links.')

if __name__ == '__main__':
    audit()
