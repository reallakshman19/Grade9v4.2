#!/usr/bin/env python3
"""
scripts/audit_workbench_fixtures.py
Test suite to verify that:
1. All golden fixtures pass validation without errors.
2. All fault fixtures are rejected with exact expected error codes.
"""

import sys
import json
from pathlib import Path

# Add script directory to sys.path
SCRIPT_DIR = Path(__file__).resolve().parent
sys.path.insert(0, str(SCRIPT_DIR))

from validate_workbench_package import validate_package

FIXTURES_DIR = SCRIPT_DIR.parent / 'fixtures'
GOLDEN_DIR = FIXTURES_DIR / 'golden'
FAULTS_DIR = FIXTURES_DIR / 'faults'

EXPECTED_FAULTS = {
    'fault_executable_payload.json': 'PORTABLE_EXECUTABLE_FIELD_FORBIDDEN',
    'fault_pixel_coordinates.json': 'PORTABLE_PIXEL_COORDINATE_FORBIDDEN',
    'fault_version_seam_mismatch.json': 'PORTABLE_COMPONENTAPIVERSION_MISMATCH',
    'fault_missing_canonical_provenance.json': 'PORTABLE_CANONICAL_RESOURCE_REF_REQUIRED'
}

def main():
    passed_golden = 0
    total_golden = 0

    print("=== 1. AUDITING GOLDEN FIXTURES (MUST PASS) ===")
    for g_path in sorted(GOLDEN_DIR.glob('*.json')):
        total_golden += 1
        with open(g_path, 'r', encoding='utf-8') as f:
            pkg = json.load(f)
        is_valid, errors = validate_package(pkg)
        if is_valid:
            print(f"  ✅ PASS: {g_path.name}")
            passed_golden += 1
        else:
            print(f"  ❌ FAIL: {g_path.name}")
            for e in errors:
                print(f"       {e}")

    passed_faults = 0
    total_faults = 0

    print("\n=== 2. AUDITING FAULT FIXTURES (MUST FAIL CLOSED) ===")
    for f_name, exp_code in EXPECTED_FAULTS.items():
        total_faults += 1
        f_path = FAULTS_DIR / f_name
        if not f_path.exists():
            print(f"  ❌ MISSING FAULT FIXTURE: {f_name}")
            continue

        with open(f_path, 'r', encoding='utf-8') as f:
            pkg = json.load(f)
        is_valid, errors = validate_package(pkg)
        if not is_valid and any(exp_code in e for e in errors):
            print(f"  🛡️ PASS (REJECTED CORRECTLY): {f_name} -> caught '{exp_code}'")
            passed_faults += 1
        else:
            print(f"  ❌ UNCAUGHT OR UNEXPECTED: {f_name}")
            print(f"       Expected error containing: {exp_code}")
            print(f"       Received errors: {errors}")

    print("\n=== AUDIT SUMMARY ===")
    print(f"Golden Fixtures: {passed_golden}/{total_golden} passed")
    print(f"Fault Fixtures:  {passed_faults}/{total_faults} rejected fail-closed")

    if passed_golden == total_golden and passed_faults == total_faults:
        print("\n🎉 ALL AUDITS PASSED WITH ZERO TOLERANCE!")
        sys.exit(0)
    else:
        print("\n💥 AUDIT VERIFICATION FAILED!")
        sys.exit(1)

if __name__ == '__main__':
    main()
