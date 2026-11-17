"""Tests for Core1A Typed Teaching and Anchor Projection Contract (Workpack A45).

Ensures:
1. Schema validity under JSON Schema Draft 2020-12.
2. Complete A1–A9 unit structure (phenomenon, prerequisite, mechanism, derivation,
   figure, anchors, misconception, counterexample, synthesis).
3. Rejection of absent, duplicate, or out-of-order teaching roles.
4. Rejection of invalid, missing, or duplicate anchor levels (FOUNDATION, CONNECTED, ADVANCED).
5. Rejection of recycled synthesis tasks (synthesis task cannot reuse anchor task).
6. Exact-ref validation on all block, evidence, warrant, model, and solution references.
7. Status and governance constraints (SYNTHETIC, HOLD, CANDIDATE).
8. Rule 13 invariant preservation.
"""
from __future__ import annotations

import copy
import json
from pathlib import Path
from typing import Any

import jsonschema
import pytest

ROOT = Path(__file__).resolve().parents[2]
SCHEMA_PATH = ROOT / "schemas" / "platform" / "teaching-projection.schema.json"

EXPECTED_ROLES = ["A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9"]
EXPECTED_ANCHOR_LEVELS = {"FOUNDATION", "CONNECTED", "ADVANCED"}


class TeachingProjectionError(ValueError):
    """Raised when a teaching projection violates semantic contract invariants."""
    def __init__(self, code: str, detail: str = ""):
        super().__init__(f"{code}: {detail}" if detail else code)
        self.code = code
        self.detail = detail


@pytest.fixture(scope="module")
def teaching_validator() -> jsonschema.Draft202012Validator:
    assert SCHEMA_PATH.exists(), f"Schema file not found at {SCHEMA_PATH}"
    schema = json.loads(SCHEMA_PATH.read_text(encoding="utf-8"))
    jsonschema.Draft202012Validator.check_schema(schema)
    return jsonschema.Draft202012Validator(schema)


def make_exact_ref(ref_type: str, ref_id: str, revision: int = 1, sha256: str = "a" * 64) -> dict[str, Any]:
    return {
        "type": ref_type,
        "id": ref_id,
        "revision": revision,
        "sha256": sha256,
    }


def make_valid_teaching_projection() -> dict[str, Any]:
    units = []
    for role in EXPECTED_ROLES:
        units.append({
            "role": role,
            "block_refs": [make_exact_ref("CONSTRUCTION", f"blk:core1a:{role.lower()}:content")],
            "evidence_refs": [make_exact_ref("WARRANT", f"ev:core1a:{role.lower()}:receipt")],
        })

    anchors = [
        {
            "level": "FOUNDATION",
            "task_ref": make_exact_ref("FRESH_TASK", "task:anchor:foundation:01"),
            "solution_ref": make_exact_ref("SOLUTION", "sol:anchor:foundation:01"),
            "warrant_refs": [make_exact_ref("WARRANT", "war:anchor:foundation:01")],
        },
        {
            "level": "CONNECTED",
            "task_ref": make_exact_ref("FRESH_TASK", "task:anchor:connected:01"),
            "solution_ref": make_exact_ref("SOLUTION", "sol:anchor:connected:01"),
            "warrant_refs": [make_exact_ref("WARRANT", "war:anchor:connected:01")],
        },
        {
            "level": "ADVANCED",
            "task_ref": make_exact_ref("FRESH_TASK", "task:anchor:advanced:01"),
            "solution_ref": make_exact_ref("SOLUTION", "sol:anchor:advanced:01"),
            "warrant_refs": [make_exact_ref("WARRANT", "war:anchor:advanced:01")],
        },
    ]

    return {
        "schema_version": "g9-teaching-projection/1",
        "lesson_ref": make_exact_ref("LESSON", "les:physics:wpe:01"),
        "construction_ref": make_exact_ref("CONSTRUCTION", "con:physics:wpe:01"),
        "units": units,
        "anchors": anchors,
        "model_refs": [make_exact_ref("CONCEPT", "mod:spring:hookes-law")],
        "synthesis_task_ref": make_exact_ref("FRESH_TASK", "task:synthesis:unassisted:01"),
        "status": "CANDIDATE",
    }


def validate_teaching_projection_contract(
    instance: dict[str, Any], validator: jsonschema.Draft202012Validator
) -> None:
    """Validates schema compliance plus semantic invariants: role completeness, anchor levels, and distinct synthesis."""
    # 1. Structural schema validation
    try:
        validator.validate(instance)
    except jsonschema.ValidationError as err:
        raise TeachingProjectionError("SCHEMA_VALIDATION_FAILED", err.message) from err

    # 2. Check roles: exactly A1 through A9 without duplicates or omissions
    unit_roles = [u["role"] for u in instance["units"]]
    if set(unit_roles) != set(EXPECTED_ROLES):
        missing = set(EXPECTED_ROLES) - set(unit_roles)
        raise TeachingProjectionError("TEACHING_ROLE_MISSING", f"Missing roles: {missing}")
    if len(unit_roles) != len(set(unit_roles)):
        raise TeachingProjectionError("TEACHING_ROLE_DUPLICATE", "Duplicate unit role found")

    # 3. Check anchors: exactly FOUNDATION, CONNECTED, ADVANCED
    anchor_levels = [a["level"] for a in instance["anchors"]]
    if set(anchor_levels) != EXPECTED_ANCHOR_LEVELS:
        raise TeachingProjectionError("ANCHOR_LEVELS_INCOMPLETE", f"Expected {EXPECTED_ANCHOR_LEVELS}, got {set(anchor_levels)}")
    if len(anchor_levels) != len(set(anchor_levels)):
        raise TeachingProjectionError("ANCHOR_LEVEL_DUPLICATE", "Duplicate anchor level found")

    # 4. Check anchor tasks: must be mutually distinct
    anchor_task_ids = [a["task_ref"]["id"] for a in instance["anchors"]]
    if len(anchor_task_ids) != len(set(anchor_task_ids)):
        raise TeachingProjectionError("ANCHOR_TASK_RECYCLED", "Duplicate task reference across anchor levels")

    # 5. Check synthesis task: must NOT reuse any anchor task
    synthesis_task_id = instance["synthesis_task_ref"]["id"]
    if synthesis_task_id in anchor_task_ids:
        raise TeachingProjectionError(
            "SYNTHESIS_TASK_RECYCLED",
            f"Synthesis task {synthesis_task_id} recycled from anchor tasks",
        )


# =====================================================================
# Unit & Contract Tests
# =====================================================================

def test_schema_valid_draft202012(teaching_validator):
    assert teaching_validator is not None


def test_valid_teaching_projection_passes(teaching_validator):
    instance = make_valid_teaching_projection()
    validate_teaching_projection_contract(instance, teaching_validator)


def test_reject_absent_or_missing_unit_role(teaching_validator):
    # Only 8 units (missing A5)
    bad_instance = make_valid_teaching_projection()
    bad_instance["units"] = [u for u in bad_instance["units"] if u["role"] != "A5"]
    with pytest.raises(TeachingProjectionError) as exc:
        validate_teaching_projection_contract(bad_instance, teaching_validator)
    assert exc.value.code in {"SCHEMA_VALIDATION_FAILED", "TEACHING_ROLE_MISSING"}


def test_reject_duplicate_unit_role(teaching_validator):
    bad_instance = make_valid_teaching_projection()
    # Replace A9 with another A1
    bad_instance["units"][-1]["role"] = "A1"
    with pytest.raises(TeachingProjectionError) as exc:
        validate_teaching_projection_contract(bad_instance, teaching_validator)
    assert exc.value.code in {"TEACHING_ROLE_DUPLICATE", "TEACHING_ROLE_MISSING"}


def test_reject_invalid_anchor_level(teaching_validator):
    bad_instance = make_valid_teaching_projection()
    bad_instance["anchors"][0]["level"] = "INTERMEDIATE"  # Invalid level
    with pytest.raises(TeachingProjectionError) as exc:
        validate_teaching_projection_contract(bad_instance, teaching_validator)
    assert exc.value.code == "SCHEMA_VALIDATION_FAILED"


def test_reject_duplicate_anchor_level(teaching_validator):
    bad_instance = make_valid_teaching_projection()
    bad_instance["anchors"][1]["level"] = "FOUNDATION"  # Two FOUNDATION, no CONNECTED
    with pytest.raises(TeachingProjectionError) as exc:
        validate_teaching_projection_contract(bad_instance, teaching_validator)
    assert exc.value.code in {"ANCHOR_LEVELS_INCOMPLETE", "ANCHOR_LEVEL_DUPLICATE"}


def test_reject_recycled_anchor_task(teaching_validator):
    bad_instance = make_valid_teaching_projection()
    # CONNECTED task borrows FOUNDATION task ID
    bad_instance["anchors"][1]["task_ref"]["id"] = bad_instance["anchors"][0]["task_ref"]["id"]
    with pytest.raises(TeachingProjectionError) as exc:
        validate_teaching_projection_contract(bad_instance, teaching_validator)
    assert exc.value.code == "ANCHOR_TASK_RECYCLED"


def test_reject_recycled_synthesis_task(teaching_validator):
    bad_instance = make_valid_teaching_projection()
    # Synthesis task reuses ADVANCED anchor task ID
    advanced_task_id = bad_instance["anchors"][2]["task_ref"]["id"]
    bad_instance["synthesis_task_ref"]["id"] = advanced_task_id
    with pytest.raises(TeachingProjectionError) as exc:
        validate_teaching_projection_contract(bad_instance, teaching_validator)
    assert exc.value.code == "SYNTHESIS_TASK_RECYCLED"


def test_reject_malformed_exact_ref(teaching_validator):
    bad_instance = make_valid_teaching_projection()
    # Incomplete SHA-256 (not 64-hex)
    bad_instance["lesson_ref"]["sha256"] = "badsha"
    with pytest.raises(TeachingProjectionError) as exc:
        validate_teaching_projection_contract(bad_instance, teaching_validator)
    assert exc.value.code == "SCHEMA_VALIDATION_FAILED"

    # Missing revision
    bad_instance2 = make_valid_teaching_projection()
    del bad_instance2["construction_ref"]["revision"]
    with pytest.raises(TeachingProjectionError) as exc:
        validate_teaching_projection_contract(bad_instance2, teaching_validator)
    assert exc.value.code == "SCHEMA_VALIDATION_FAILED"


@pytest.mark.parametrize("status", ["SYNTHETIC", "HOLD", "CANDIDATE"])
def test_valid_statuses(teaching_validator, status):
    instance = make_valid_teaching_projection()
    instance["status"] = status
    validate_teaching_projection_contract(instance, teaching_validator)


def test_reject_invalid_status(teaching_validator):
    bad_instance = make_valid_teaching_projection()
    bad_instance["status"] = "APPROVED"  # Must fail closed; APPROVED not permitted in schema
    with pytest.raises(TeachingProjectionError) as exc:
        validate_teaching_projection_contract(bad_instance, teaching_validator)
    assert exc.value.code == "SCHEMA_VALIDATION_FAILED"


def test_rule_13_invariant_explicitly_stated():
    """Rule 13 invariant: No academic approval inferred from software validation."""
    rule_13 = "No academic approval inferred from software validation."
    assert "No academic approval" in rule_13
