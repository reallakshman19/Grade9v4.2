"""Tests for portable workbench compatibility decision and contract invariants (Workpack A59).

Ensures:
1. Architectural decision record compliance (docs/architecture/portable-compatibility.json).
2. Four package shapes, version seams, and schema invariants.
3. Proof vs. canonical authority distinction.
4. Kinematics same-time vs. mixed-time rules and physical invariant preservation.
5. Fail-closed rejection rules for executable payloads, pixel placements, version mismatches,
   and ungrounded canonical claims.
6. Isolated application bridge security, containment, and offline invariants.
"""
from __future__ import annotations

import copy
import hashlib
import json
import os
from pathlib import Path
from typing import Any

import pytest

ROOT = Path(__file__).resolve().parents[2]
DOCS_PATH = ROOT / "docs" / "architecture" / "portable-compatibility.json"
def read_pinned_custody_package(pkg_id: str, expected: dict[str, Any]) -> dict[str, Any]:
    """Fail closed without all four original, immutable source packages."""
    raw_root = os.environ.get("G9_V35_PORTABLE_PACKAGES")
    if not raw_root:
        pytest.fail("MISSING_CUSTODY: G9_V35_PORTABLE_PACKAGES is required for A59 acceptance")
    root = Path(raw_root).resolve(strict=True)
    if not root.is_dir():
        pytest.fail("MISSING_CUSTODY: portable package custody directory does not exist")
    filepath = root / (pkg_id + ".json")
    if filepath.is_symlink() or not filepath.is_file() or not filepath.resolve().is_relative_to(root):
        pytest.fail("MISSING_CUSTODY: immutable package missing or unsafe: " + pkg_id)
    original = filepath.read_bytes()
    assert hashlib.sha256(original).hexdigest() == expected["sha256"], "SHA-256 mismatch: " + pkg_id
    assert len(original) == expected["byte_count"], "byte count mismatch: " + pkg_id

    def unique_pairs(pairs):
        obj = {}
        for key, value in pairs:
            if key in obj:
                raise ValueError("duplicate original JSON key: " + key)
            obj[key] = value
        return obj
    return json.loads(original.decode("utf-8"), object_pairs_hook=unique_pairs)


# Native contract version constants
PACKAGE_SCHEMA = "portable-workbench-package"
PACKAGE_VERSION = "1.0.0"
COMPONENT_API_VERSION = "0.1.0"
TRANSFORMATION_IR_VERSION = "0.1.0"
ADAPTER_API_VERSION = "0.2.0"
SCENE_PACKAGE_VERSION = "1.0.0"
DECLARATIVE_ADAPTER_ID = "declarative-transfer-v1"
NON_CANONICAL_PROVENANCE_AUTHORITY = "NON_CANONICAL_COMPILED_PROOF"
CANONICAL_PROVENANCE_AUTHORITY = "CANONICAL_COMPILED_RESOURCE"

EXECUTABLE_KEYS = {
    "script", "javascript", "eval", "function", "handler",
    "onclick", "onload", "onerror", "sourcecode", "executable",
}
PIXEL_KEYS = {"x", "y", "left", "top", "width", "height"}


class PortableValidationError(ValueError):
    """Raised when a portable workbench package violates contract invariants."""
    def __init__(self, code: str, detail: str = ""):
        super().__init__(f"{code}: {detail}" if detail else code)
        self.code = code
        self.detail = detail


def _require(condition: bool, code: str, detail: str = "") -> None:
    if not condition:
        raise PortableValidationError(code, detail)


def _scan_for_forbidden_data(value: Any, path: str = "package") -> None:
    """Recursively scans data payloads to reject executable fields and pixel placements."""
    _require(not callable(value), "PORTABLE_EXECUTABLE_VALUE_FORBIDDEN", path)
    if isinstance(value, dict):
        for key, child in value.items():
            _require(isinstance(key, str) and key.strip(), "PORTABLE_FIELD_NAME_INVALID", path)
            _require(
                key.lower() not in EXECUTABLE_KEYS,
                "PORTABLE_EXECUTABLE_FIELD_FORBIDDEN",
                f"{path}.{key}",
            )
            if key == "placement" and isinstance(child, dict):
                for pixel in PIXEL_KEYS:
                    _require(
                        pixel not in child,
                        "PORTABLE_PIXEL_COORDINATE_FORBIDDEN",
                        f"{path}.{key}.{pixel}",
                    )
            _scan_for_forbidden_data(child, f"{path}.{key}")
    elif isinstance(value, list):
        for index, child in enumerate(value):
            _scan_for_forbidden_data(child, f"{path}[{index}]")
    else:
        _require(
            value is None or isinstance(value, (str, int, float, bool)),
            "PORTABLE_DATA_TYPE_UNSUPPORTED",
            path,
        )


def validate_portable_package(package: dict[str, Any]) -> dict[str, Any]:
    """Pure fail-closed validator for portable workbench packages."""
    _require(isinstance(package, dict), "PORTABLE_PACKAGE_REQUIRED")
    _scan_for_forbidden_data(package)

    expected_versions = {
        "schemaVersion": PACKAGE_SCHEMA,
        "packageVersion": PACKAGE_VERSION,
        "componentApiVersion": COMPONENT_API_VERSION,
        "transformationIrVersion": TRANSFORMATION_IR_VERSION,
        "adapterApiVersion": ADAPTER_API_VERSION,
        "scenePackageVersion": SCENE_PACKAGE_VERSION,
    }
    for key, value in expected_versions.items():
        _require(
            package.get(key) == value,
            f"PORTABLE_{key.upper()}_MISMATCH",
            f"Expected {value}, got {package.get(key)}",
        )

    _require(isinstance(package.get("id"), str) and package["id"].strip(), "PORTABLE_PACKAGE_ID_REQUIRED")
    _require(isinstance(package.get("title"), str) and package["title"].strip(), "PORTABLE_PACKAGE_TITLE_REQUIRED")

    # Array validation
    for field in ("sourceRefs", "sceneRefs", "representationRefs", "assetRefs", "accessibilityRefs"):
        val = package.get(field)
        _require(isinstance(val, list), f"PORTABLE_{field.upper()}_INVALID")
        for item in val:
            _require(isinstance(item, str) and item.strip(), f"PORTABLE_{field.upper()}_INVALID")
        _require(len(val) == len(set(val)), f"PORTABLE_{field.upper()}_DUPLICATE")

    _require(isinstance(package.get("questionBindings"), list), "PORTABLE_QUESTION_BINDINGS_INVALID")

    # Provenance validation
    provenance = package.get("provenance")
    _require(isinstance(provenance, dict), "PORTABLE_PROVENANCE_REQUIRED")
    authority = provenance.get("authority")
    _require(
        authority in {NON_CANONICAL_PROVENANCE_AUTHORITY, CANONICAL_PROVENANCE_AUTHORITY},
        "PORTABLE_PROVENANCE_AUTHORITY_INVALID",
        str(authority),
    )

    if authority == CANONICAL_PROVENANCE_AUTHORITY:
        resource_ref = package.get("resourceRef")
        _require(isinstance(resource_ref, str) and resource_ref.strip(), "PORTABLE_CANONICAL_RESOURCE_REF_REQUIRED")
        provenance_resource_ref = provenance.get("resourceRef")
        _require(
            isinstance(provenance_resource_ref, str) and provenance_resource_ref.strip(),
            "PORTABLE_CANONICAL_RESOURCE_REF_REQUIRED",
        )
        _require(
            provenance_resource_ref == resource_ref,
            "PORTABLE_CANONICAL_RESOURCE_REF_MISMATCH",
            f"Top: {resource_ref}, Provenance: {provenance_resource_ref}",
        )
        representation_ref = provenance.get("representationRef")
        _require(
            isinstance(representation_ref, str) and representation_ref.strip(),
            "PORTABLE_CANONICAL_REPRESENTATION_REF_REQUIRED",
        )
        _require(
            representation_ref in package["representationRefs"],
            "PORTABLE_CANONICAL_REPRESENTATION_REF_MISMATCH",
            representation_ref,
        )
        prov_source_refs = provenance.get("sourceRefs")
        _require(
            isinstance(prov_source_refs, list) and len(prov_source_refs) > 0,
            "PORTABLE_CANONICAL_SOURCE_REFS_REQUIRED",
        )
        _require(
            prov_source_refs == package["sourceRefs"],
            "PORTABLE_CANONICAL_SOURCE_REFS_MISMATCH",
        )

    # Scene validation
    scene = package.get("scene")
    _require(isinstance(scene, dict), "PORTABLE_SCENE_REQUIRED")
    _require(scene.get("apiVersion") == COMPONENT_API_VERSION, "PORTABLE_COMPONENT_API_VERSION_MISMATCH")
    _require(isinstance(scene.get("sceneVersion"), str) and scene["sceneVersion"].strip(), "PORTABLE_SCENE_VERSION_REQUIRED")
    _require(isinstance(scene.get("id"), str) and scene["id"].strip(), "PORTABLE_SCENE_ID_REQUIRED")
    _require(package.get("sceneRefs") == [scene["id"]], "PORTABLE_SCENE_REFS_MISMATCH")

    grids = scene.get("grids")
    _require(isinstance(grids, list) and len(grids) > 0, "PORTABLE_SCENE_GRIDS_REQUIRED")
    grid_index = {}
    for grid in grids:
        gid = grid.get("id")
        _require(isinstance(gid, str) and gid.strip(), "PORTABLE_SCENE_GRID_ID_REQUIRED")
        _require(gid not in grid_index, "PORTABLE_SCENE_GRID_ID_DUPLICATE")
        rows = grid.get("rows")
        cols = grid.get("columns")
        _require(isinstance(rows, list) and len(rows) > 0, "PORTABLE_SCENE_GRID_ROWS_INVALID")
        _require(isinstance(cols, list) and len(cols) > 0, "PORTABLE_SCENE_GRID_COLUMNS_INVALID")
        grid_index[gid] = {"rows": rows, "columns": cols}

    # Verify placement of entities/projections
    for cat in ("entities", "projections", "targets", "canonicalTransformations"):
        items = scene.get(cat) or []
        _require(isinstance(items, list), f"PORTABLE_SCENE_{cat.upper()}_INVALID")
        for item in items:
            placement = item.get("placement")
            if placement is not None:
                _require(isinstance(placement, dict), "PORTABLE_PLACEMENT_REQUIRED")
                _require(set(placement) == {"grid", "row", "column"}, "PORTABLE_PLACEMENT_FIELDS_INVALID")
                grid = grid_index.get(placement["grid"])
                _require(grid is not None, "PORTABLE_PLACEMENT_GRID_UNKNOWN")
                _require(placement["row"] in grid["rows"], "PORTABLE_PLACEMENT_ROW_UNKNOWN")
                _require(placement["column"] in grid["columns"], "PORTABLE_PLACEMENT_COLUMN_UNKNOWN")

    # Adapter validation
    adapter = package.get("adapter")
    _require(isinstance(adapter, dict), "PORTABLE_ADAPTER_REQUIRED")
    _require(adapter.get("id") == DECLARATIVE_ADAPTER_ID, "PORTABLE_ADAPTER_ID_MISMATCH")
    _require(adapter.get("apiVersion") == ADAPTER_API_VERSION, "PORTABLE_ADAPTER_API_VERSION_MISMATCH")
    rules = adapter.get("rules")
    _require(isinstance(rules, list) and len(rules) > 0, "PORTABLE_ADAPTER_RULES_REQUIRED")
    for rule in rules:
        _require(isinstance(rule, dict), "PORTABLE_ADAPTER_RULE_INVALID")
        _require(isinstance(rule.get("id"), str) and rule["id"].strip(), "PORTABLE_ADAPTER_RULE_ID_REQUIRED")

    _require(isinstance(package.get("injections"), list), "PORTABLE_INJECTIONS_INVALID")
    return package


def resolve_portable_target(
    requested_resource_ref: str,
    atlas_targets: dict[str, dict[str, Any]],
    packages: dict[str, dict[str, Any]],
) -> dict[str, Any]:
    """Simulates canonical AtlasIndex resolver binding to portable packages."""
    target = atlas_targets.get(requested_resource_ref)
    if not target or target.get("availability", {}).get("resource") != "READY":
        raise PortableValidationError("VISUAL_REF_UNAVAILABLE", requested_resource_ref)

    if target.get("availability", {}).get("portable_package") != "READY":
        raise PortableValidationError("STANDALONE_PACKAGE_UNAVAILABLE", requested_resource_ref)

    package_ref = target.get("portable_package_ref")
    if not package_ref:
        raise PortableValidationError("PORTABLE_PACKAGE_REF_MISSING", requested_resource_ref)

    pkg = packages.get(package_ref)
    if not pkg:
        raise PortableValidationError("PORTABLE_PACKAGE_NOT_FOUND", package_ref)

    validated = validate_portable_package(pkg)
    if validated["provenance"]["authority"] != CANONICAL_PROVENANCE_AUTHORITY:
        raise PortableValidationError("PORTABLE_CANONICAL_PROVENANCE_REQUIRED", package_ref)

    if validated["resourceRef"] != target["resource_ref"]:
        raise PortableValidationError("PORTABLE_RESOURCE_BINDING_MISMATCH", f"{validated['resourceRef']} != {target['resource_ref']}")

    rep_ref = validated["provenance"]["representationRef"]
    if rep_ref not in target.get("representation_refs", []):
        raise PortableValidationError("PORTABLE_REPRESENTATION_BINDING_MISMATCH", rep_ref)

    return {
        "resource_ref": target["resource_ref"],
        "portable_package_ref": package_ref,
        "representation_ref": rep_ref,
        "status": "BOUND",
    }


# =====================================================================
# Unit & Integration Tests for Workpack A59
# =====================================================================

def test_decision_record_structure_and_governance():
    """Validates the architectural decision document structure, pins, and Rule 13 invariant."""
    assert DOCS_PATH.exists(), f"Missing decision record: {DOCS_PATH}"
    data = json.loads(DOCS_PATH.read_text(encoding="utf-8"))

    assert data["workpack_id"] == "A59"
    assert data["decision_id"] == "DEC-A59-PORTABLE-COMPATIBILITY-01"
    assert data["status"] == "CANDIDATE"
    assert data["academic_admission"] == "HOLD"
    assert data["release_authority"] == "NONE"
    assert data["ui_implementation_freeze"] == "NOT_FROZEN"
    assert "No academic approval inferred from software validation." in data["rule_13_invariant"]

    # Decision details
    decision = data["decision"]
    assert decision["selected_strategy"] == "REUSE_ADAPTER_WITH_FAIL_CLOSED_VALIDATOR"
    assert decision["duplicate_runtime_authorized"] is False
    assert decision["independent_review_required"] is True

    # Version seams
    seams = data["version_seams"]
    assert seams["package_schema"] == "portable-workbench-package"
    assert seams["package_version"] == "1.0.0"
    assert seams["component_api_version"] == "0.1.0"
    assert seams["transformation_ir_version"] == "0.1.0"
    assert seams["adapter_api_version"] == "0.2.0"
    assert seams["scene_package_version"] == "1.0.0"
    assert seams["declarative_adapter_id"] == "declarative-transfer-v1"


def test_four_package_shapes_and_version_seams():
    """Audits the four packages from custody: shapes, version seams, and exact digests."""
    data = json.loads(DOCS_PATH.read_text(encoding="utf-8"))
    audited = {pkg["id"]: pkg for pkg in data["audited_packages"]}

    expected_ids = {
        "portable-long-division",
        "portable-redox-electron-equivalence",
        "portable-integration-riemann",
        "portable-motion-shared-clock",
    }
    assert set(audited.keys()) == expected_ids

    # Never silently pass by skipping unavailable private source bytes.
    for pkg_id, entry in audited.items():
        pkg_json = read_pinned_custody_package(pkg_id, entry)
        validated = validate_portable_package(pkg_json)
        assert validated["packageVersion"] == "1.0.0"
        assert validated["componentApiVersion"] == "0.1.0"
        assert validated["transformationIrVersion"] == "0.1.0"
        assert validated["adapterApiVersion"] == "0.2.0"
        assert validated["scenePackageVersion"] == "1.0.0"


def test_proof_vs_canonical_authority_distinction():
    """Verifies that three packages remain non-canonical proof fixtures, and one is canonical."""
    data = json.loads(DOCS_PATH.read_text(encoding="utf-8"))
    audited = {pkg["id"]: pkg for pkg in data["audited_packages"]}

    # Non-canonical compiled proofs
    for proof_id in ("portable-long-division", "portable-redox-electron-equivalence", "portable-integration-riemann"):
        pkg = audited[proof_id]
        assert pkg["provenance_authority"] == "NON_CANONICAL_COMPILED_PROOF"
        assert pkg["academic_admission"] == "HOLD"
        assert pkg["disposition"] == "ADOPT_AS_PORTABLE_PROOF"

    # Canonical compiled resource
    motion_pkg = audited["portable-motion-shared-clock"]
    assert motion_pkg["provenance_authority"] == "CANONICAL_COMPILED_RESOURCE"
    assert motion_pkg["resource_ref"] == "ACT-KIN-2D-SHARED-CLOCK"
    assert motion_pkg["representation_ref"] == "REP-KIN-2D-SHARED-CLOCK"
    assert motion_pkg["disposition"] == "ADOPT_AS_CANONICAL_CANDIDATE"
    assert motion_pkg["academic_admission"] == "HOLD"


def test_kinematics_same_time_vs_mixed_time_rules():
    """Verifies physical invariants in portable-motion-shared-clock adapter rules."""
    data = json.loads(DOCS_PATH.read_text(encoding="utf-8"))
    expected = next(p for p in data["audited_packages"] if p["id"] == "portable-motion-shared-clock")
    pkg = read_pinned_custody_package("portable-motion-shared-clock", expected)

    rules = {r["id"]: r for r in pkg["adapter"]["rules"]}
    assert "same-time" in rules
    assert "mixed-time" in rules
    assert rules["same-time"]["outcome"] == "ACCEPT"
    assert rules["mixed-time"]["outcome"] == "REJECT"
    assert "single physical state" in rules["mixed-time"]["reason"]


def test_rejection_rules_fail_closed():
    """Tests all native rejection rules and error codes."""
    base_package = {
        "schemaVersion": PACKAGE_SCHEMA,
        "packageVersion": PACKAGE_VERSION,
        "componentApiVersion": COMPONENT_API_VERSION,
        "transformationIrVersion": TRANSFORMATION_IR_VERSION,
        "adapterApiVersion": ADAPTER_API_VERSION,
        "scenePackageVersion": SCENE_PACKAGE_VERSION,
        "id": "test-pkg",
        "title": "Test Package",
        "sourceRefs": ["src1"],
        "sceneRefs": ["scene1"],
        "representationRefs": ["rep1"],
        "assetRefs": [],
        "accessibilityRefs": [],
        "questionBindings": [],
        "provenance": {
            "authority": "NON_CANONICAL_COMPILED_PROOF",
            "sourceKind": "TEST_WITNESS",
            "sourceRefs": ["src1"],
        },
        "scene": {
            "apiVersion": "0.1.0",
            "sceneVersion": "1.0.0",
            "id": "scene1",
            "grids": [{"id": "grid1", "rows": ["r1"], "columns": ["c1"]}],
            "projections": [{"id": "p1", "placement": {"grid": "grid1", "row": "r1", "column": "c1"}}],
        },
        "adapter": {
            "id": DECLARATIVE_ADAPTER_ID,
            "apiVersion": ADAPTER_API_VERSION,
            "rules": [{"id": "rule1"}],
        },
        "injections": [],
    }

    # 1. Executable fields forbidden
    bad_exec = copy.deepcopy(base_package)
    bad_exec["script"] = "alert('xss')"
    with pytest.raises(PortableValidationError) as exc:
        validate_portable_package(bad_exec)
    assert exc.value.code == "PORTABLE_EXECUTABLE_FIELD_FORBIDDEN"

    bad_exec_nested = copy.deepcopy(base_package)
    bad_exec_nested["scene"]["projections"][0]["onclick"] = "doSomething()"
    with pytest.raises(PortableValidationError) as exc:
        validate_portable_package(bad_exec_nested)
    assert exc.value.code == "PORTABLE_EXECUTABLE_FIELD_FORBIDDEN"

    # 2. Pixel placement forbidden
    bad_pixel = copy.deepcopy(base_package)
    bad_pixel["scene"]["projections"][0]["placement"]["x"] = 100
    with pytest.raises(PortableValidationError) as exc:
        validate_portable_package(bad_pixel)
    assert exc.value.code == "PORTABLE_PIXEL_COORDINATE_FORBIDDEN"

    # 3. Version mismatch
    bad_ver = copy.deepcopy(base_package)
    bad_ver["componentApiVersion"] = "99.0.0"
    with pytest.raises(PortableValidationError) as exc:
        validate_portable_package(bad_ver)
    assert exc.value.code == "PORTABLE_COMPONENTAPIVERSION_MISMATCH"

    # 4. Canonical resourceRef required
    bad_canon = copy.deepcopy(base_package)
    bad_canon["provenance"]["authority"] = "CANONICAL_COMPILED_RESOURCE"
    with pytest.raises(PortableValidationError) as exc:
        validate_portable_package(bad_canon)
    assert exc.value.code == "PORTABLE_CANONICAL_RESOURCE_REF_REQUIRED"

    # 5. Canonical representationRef mismatch
    canon_ready = copy.deepcopy(base_package)
    canon_ready["provenance"]["authority"] = "CANONICAL_COMPILED_RESOURCE"
    canon_ready["resourceRef"] = "ACT-1"
    canon_ready["provenance"]["resourceRef"] = "ACT-1"
    canon_ready["provenance"]["representationRef"] = "REP-NOT-FOUND"
    with pytest.raises(PortableValidationError) as exc:
        validate_portable_package(canon_ready)
    assert exc.value.code == "PORTABLE_CANONICAL_REPRESENTATION_REF_MISMATCH"


def test_atlas_target_binding_and_fail_closed_resolution():
    """Validates simulated AtlasIndex binding resolution against canonical packages."""
    canonical_pkg = {
        "schemaVersion": PACKAGE_SCHEMA,
        "packageVersion": PACKAGE_VERSION,
        "componentApiVersion": COMPONENT_API_VERSION,
        "transformationIrVersion": TRANSFORMATION_IR_VERSION,
        "adapterApiVersion": ADAPTER_API_VERSION,
        "scenePackageVersion": SCENE_PACKAGE_VERSION,
        "id": "portable-motion-shared-clock",
        "title": "Two-Body Kinematics — Shared-Clock Independent Trajectories",
        "sourceRefs": ["SRC-AUTHOR-KIN-2D-EXAMSIDE-ADAPTATION"],
        "sceneRefs": ["portable-motion-shared-clock-scene"],
        "representationRefs": ["REP-KIN-2D-SHARED-CLOCK"],
        "assetRefs": [],
        "accessibilityRefs": [],
        "questionBindings": [],
        "resourceRef": "ACT-KIN-2D-SHARED-CLOCK",
        "provenance": {
            "authority": "CANONICAL_COMPILED_RESOURCE",
            "sourceKind": "CANONICAL_RESOURCE",
            "sourceRefs": ["SRC-AUTHOR-KIN-2D-EXAMSIDE-ADAPTATION"],
            "resourceRef": "ACT-KIN-2D-SHARED-CLOCK",
            "representationRef": "REP-KIN-2D-SHARED-CLOCK",
        },
        "scene": {
            "apiVersion": "0.1.0",
            "sceneVersion": "1.0.0",
            "id": "portable-motion-shared-clock-scene",
            "grids": [{"id": "grid1", "rows": ["r1"], "columns": ["c1"]}],
            "projections": [{"id": "p1", "placement": {"grid": "grid1", "row": "r1", "column": "c1"}}],
        },
        "adapter": {
            "id": DECLARATIVE_ADAPTER_ID,
            "apiVersion": ADAPTER_API_VERSION,
            "rules": [{"id": "same-time", "outcome": "ACCEPT"}],
        },
        "injections": [],
    }

    atlas_targets = {
        "ACT-KIN-2D-SHARED-CLOCK": {
            "resource_ref": "ACT-KIN-2D-SHARED-CLOCK",
            "representation_refs": ["REP-KIN-2D-SHARED-CLOCK"],
            "portable_package_ref": "portable-motion-shared-clock",
            "availability": {
                "resource": "READY",
                "portable_package": "READY",
            },
        },
        "ACT-UNAVAILABLE": {
            "resource_ref": "ACT-UNAVAILABLE",
            "availability": {
                "resource": "HOLD",
                "portable_package": "UNAVAILABLE",
            },
        },
    }

    packages = {"portable-motion-shared-clock": canonical_pkg}

    # Successful resolution
    res = resolve_portable_target("ACT-KIN-2D-SHARED-CLOCK", atlas_targets, packages)
    assert res["status"] == "BOUND"
    assert res["portable_package_ref"] == "portable-motion-shared-clock"
    assert res["representation_ref"] == "REP-KIN-2D-SHARED-CLOCK"

    # Visual ref unavailable
    with pytest.raises(PortableValidationError) as exc:
        resolve_portable_target("ACT-UNKNOWN", atlas_targets, packages)
    assert exc.value.code == "VISUAL_REF_UNAVAILABLE"

    # Standalone/portable package unavailable
    with pytest.raises(PortableValidationError) as exc:
        resolve_portable_target("ACT-UNAVAILABLE", atlas_targets, packages)
    assert exc.value.code == "VISUAL_REF_UNAVAILABLE"

    # Resource binding mismatch
    mismatched_target = copy.deepcopy(atlas_targets)
    mismatched_target["ACT-KIN-2D-SHARED-CLOCK"]["resource_ref"] = "ACT-OTHER"
    with pytest.raises(PortableValidationError) as exc:
        resolve_portable_target("ACT-KIN-2D-SHARED-CLOCK", mismatched_target, packages)
    assert exc.value.code == "PORTABLE_RESOURCE_BINDING_MISMATCH"


def test_security_and_containment_invariants():
    """Validates isolated application bridge sandbox and containment constraints."""
    data = json.loads(DOCS_PATH.read_text(encoding="utf-8"))
    sec = data["security_and_containment"]

    assert sec["sandbox_mode"] == "ISOLATED_HOST"
    assert sec["iframe_sandbox_policy"] == "allow-scripts"
    assert "allow-same-origin" in sec["forbidden_permissions"]
    assert "allow-top-navigation" in sec["forbidden_permissions"]

    # Handshake
    hs = sec["handshake_protocol"]
    assert hs["initial_message"] == "READY"
    assert hs["nonce_validation"] == "MANDATORY_HOST_GENERATED"
    assert hs["window_proxy_check"] == "EXACT_PROXY"
    assert hs["payload_size_cap_bytes"] <= 65536

    # Protected stores isolation
    telem = sec["telemetry_policy"]
    assert telem["workbench_observations_untrusted"] is True
    assert telem["protected_stores_read_only_to_app"] is True
    assert "learner_attempts" in telem["protected_stores"]
    assert "evaluation_scores" in telem["protected_stores"]
    assert "topic_mastery" in telem["protected_stores"]

    # Offline invariants
    off = sec["offline_invariants"]
    assert off["remote_network_fetch_allowed"] is False
    assert off["external_script_tags_allowed"] is False
    assert off["external_cdn_dependencies_allowed"] is False
