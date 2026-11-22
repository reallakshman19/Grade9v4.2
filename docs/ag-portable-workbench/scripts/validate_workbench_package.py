#!/usr/bin/env python3
"""
scripts/validate_workbench_package.py
A64 / DEC-A59 — Pure fail-closed validator for Declarative Portable Workbench Packages.

Enforces all 15 fail-closed rules:
1. PORTABLE_EXECUTABLE_FIELD_FORBIDDEN: blocks executable keywords in keys and string values
2. PORTABLE_PIXEL_COORDINATE_FORBIDDEN: blocks absolute pixel positioning in projections
3. PORTABLE_VERSION_MISMATCH: enforces strict 5-part version seam alignment
4. PORTABLE_CANONICAL_CONSTRAINTS: enforces provenance bindings for CANONICAL authority
5. PORTABLE_SCENE_INTEGRITY: verifies grid, row, column, entity, target, and transform referential integrity
"""

import sys
import json
import re
from pathlib import Path
from typing import Any, Dict, List, Tuple

FORBIDDEN_EXECUTABLE_KEYWORDS = {
    'script', 'javascript', 'eval', 'function', 'handler',
    'onclick', 'onload', 'onerror', 'sourcecode', 'executable'
}

FORBIDDEN_PIXEL_PLACEMENT_KEYS = {'x', 'y', 'left', 'top', 'width', 'height'}

EXPECTED_VERSION_SEAMS = {
    'schemaVersion': 'portable-workbench-package',
    'packageVersion': '1.0.0',
    'componentApiVersion': '0.1.0',
    'transformationIrVersion': '0.1.0',
    'adapterApiVersion': '0.2.0',
    'scenePackageVersion': '1.0.0',
    'declarativeAdapterId': 'declarative-transfer-v1'
}

def scan_executable_payloads(obj: Any, path: str = '') -> List[str]:
    errors = []
    if isinstance(obj, dict):
        for k, v in obj.items():
            lower_k = k.lower()
            if any(kw in lower_k for kw in FORBIDDEN_EXECUTABLE_KEYWORDS):
                errors.append(f"PORTABLE_EXECUTABLE_FIELD_FORBIDDEN: field '{path}.{k}' matches forbidden executable keyword")
            if isinstance(v, str):
                lower_v = v.lower()
                if any(kw in lower_v for kw in ['javascript:', '<script', 'onload=', 'onerror=', 'onclick=']):
                    errors.append(f"PORTABLE_EXECUTABLE_FIELD_FORBIDDEN: value at '{path}.{k}' contains executable script pattern")
            errors.extend(scan_executable_payloads(v, f"{path}.{k}" if path else k))
    elif isinstance(obj, list):
        for idx, item in enumerate(obj):
            errors.extend(scan_executable_payloads(item, f"{path}[{idx}]"))
    return errors

def validate_package(pkg: Dict[str, Any]) -> Tuple[bool, List[str]]:
    errors: List[str] = []

    # 1. Executable keywords scan
    exec_errors = scan_executable_payloads(pkg)
    if exec_errors:
        errors.extend(exec_errors)

    # 2. Version seams
    for seam_key, expected in EXPECTED_VERSION_SEAMS.items():
        if seam_key == 'declarativeAdapterId':
            continue
        val = pkg.get(seam_key)
        if val != expected:
            errors.append(f"PORTABLE_{seam_key.upper()}_MISMATCH: expected '{expected}', received '{val}'")

    # 3. Provenance & Authority bounds
    prov = pkg.get('provenance', {})
    auth = prov.get('authority')
    if auth == 'CANONICAL_COMPILED_RESOURCE':
        # Resource ref
        if not pkg.get('resourceRef'):
            errors.append("PORTABLE_CANONICAL_RESOURCE_REF_REQUIRED: authority is CANONICAL_COMPILED_RESOURCE but top-level resourceRef is missing")
        elif pkg.get('resourceRef') != prov.get('resourceRef'):
            errors.append(f"PORTABLE_CANONICAL_RESOURCE_REF_MISMATCH: resourceRef '{pkg.get('resourceRef')}' does not match provenance '{prov.get('resourceRef')}'")
        
        # Representation ref
        if not prov.get('representationRef'):
            errors.append("PORTABLE_CANONICAL_REPRESENTATION_REF_REQUIRED: authority is CANONICAL_COMPILED_RESOURCE but provenance.representationRef is missing")
        elif prov.get('representationRef') not in pkg.get('representationRefs', []):
            errors.append("PORTABLE_CANONICAL_REPRESENTATION_REF_MISMATCH: provenance.representationRef is not listed in top-level representationRefs")

        # Source refs
        if not prov.get('sourceRefs'):
            errors.append("PORTABLE_CANONICAL_SOURCE_REFS_REQUIRED: authority is CANONICAL_COMPILED_RESOURCE but provenance.sourceRefs is empty")
        elif prov.get('sourceRefs') != pkg.get('sourceRefs'):
            errors.append("PORTABLE_CANONICAL_SOURCE_REFS_MISMATCH: provenance.sourceRefs does not match top-level sourceRefs")

    # 4. Scene & Semantic Grid Invariants
    scene = pkg.get('scene', {})
    grids = {g.get('id'): g for g in scene.get('grids', [])}
    entities = {e.get('id'): e for e in scene.get('entities', [])}
    targets = {t.get('id'): t for t in scene.get('targets', [])}
    transforms = {tx.get('id'): tx for tx in scene.get('canonicalTransformations', [])}

    if not grids:
        errors.append("PORTABLE_SCENE_GRIDS_REQUIRED: scene must declare at least one semantic grid")

    for proj in scene.get('projections', []):
        placement = proj.get('placement', {})
        # Disallow pixel coordinate keys
        for pk in placement.keys():
            if pk.lower() in FORBIDDEN_PIXEL_PLACEMENT_KEYS:
                errors.append(f"PORTABLE_PIXEL_COORDINATE_FORBIDDEN: projection '{proj.get('id')}' placement uses forbidden pixel key '{pk}'")

        grid_id = placement.get('grid')
        if not grid_id or grid_id not in grids:
            errors.append(f"PORTABLE_PROJECTION_GRID_INVALID: projection '{proj.get('id')}' references missing grid '{grid_id}'")
        else:
            g = grids[grid_id]
            row = placement.get('row')
            col = placement.get('column')
            if row not in g.get('rows', []):
                errors.append(f"PORTABLE_PROJECTION_ROW_INVALID: projection '{proj.get('id')}' row '{row}' not in grid '{grid_id}' rows")
            if col not in g.get('columns', []):
                errors.append(f"PORTABLE_PROJECTION_COLUMN_INVALID: projection '{proj.get('id')}' col '{col}' not in grid '{grid_id}' columns")

        ent_ref = proj.get('entityRef')
        if ent_ref not in entities:
            errors.append(f"PORTABLE_PROJECTION_ENTITY_INVALID: projection '{proj.get('id')}' references missing entity '{ent_ref}'")

    # 5. Adapter Rules Invariants
    adapter = pkg.get('adapter', {})
    if adapter.get('id') != EXPECTED_VERSION_SEAMS['declarativeAdapterId']:
        errors.append(f"PORTABLE_DECLARATIVE_ADAPTER_MISMATCH: expected adapter id '{EXPECTED_VERSION_SEAMS['declarativeAdapterId']}', got '{adapter.get('id')}'")
    if adapter.get('apiVersion') != EXPECTED_VERSION_SEAMS['adapterApiVersion']:
        errors.append(f"PORTABLE_ADAPTERAPIVERSION_MISMATCH: expected adapter apiVersion '{EXPECTED_VERSION_SEAMS['adapterApiVersion']}', got '{adapter.get('apiVersion')}'")

    for rule in adapter.get('rules', []):
        s_ref = rule.get('sourceEntityRef')
        if s_ref and s_ref not in entities:
            errors.append(f"PORTABLE_RULE_SOURCE_ENTITY_INVALID: rule '{rule.get('id')}' sourceEntityRef '{s_ref}' not in entities")
        t_ref = rule.get('targetRef')
        if t_ref and t_ref not in targets:
            errors.append(f"PORTABLE_RULE_TARGET_INVALID: rule '{rule.get('id')}' targetRef '{t_ref}' not in targets")
        tx_ref = rule.get('transformationRef')
        if tx_ref and tx_ref not in transforms:
            errors.append(f"PORTABLE_RULE_TRANSFORMATION_INVALID: rule '{rule.get('id')}' transformationRef '{tx_ref}' not in transforms")

    return len(errors) == 0, errors

def main():
    if len(sys.argv) < 2:
        print("Usage: python validate_workbench_package.py <package.json>")
        sys.exit(1)

    file_path = Path(sys.argv[1])
    if not file_path.exists():
        print(f"Error: file '{file_path}' does not exist")
        sys.exit(1)

    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            pkg = json.load(f)
    except Exception as e:
        print(f"JSON Parse Error: {e}")
        sys.exit(2)

    is_valid, errors = validate_package(pkg)
    if is_valid:
        print(f"PASS: '{file_path.name}' satisfies all 15 fail-closed portable workbench rules.")
        sys.exit(0)
    else:
        print(f"FAIL: '{file_path.name}' violated {len(errors)} invariant rules:")
        for err in errors:
            print(f"  - {err}")
        sys.exit(1)

if __name__ == '__main__':
    main()
