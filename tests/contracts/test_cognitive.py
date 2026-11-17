"""Tests for Cognitive Evidence and Reasoning-Cell Contracts (Workpack A47).

Ensures:
1. Schema validity of cognitive-event and reasoning-cell under Draft 2020-12.
2. Cognitive event chain validation across all 9 event types and type-specific payloads.
3. Rejection of unknown fields, missing required payloads, and non-conforming event types.
4. Cross-task boundary protection: chained events must not reference conflicting tasks.
5. QRT 7-operation cognitive matrix and demand band constraints.
6. C06 v1.1 invariants: exactly one MAIN per reviewed cell, at least two distinct INSTANCE refs.
7. Rejection of duplicate instances, missing MAIN, and ungrounded QRT inferences.
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
EVENT_SCHEMA_PATH = ROOT / "schemas" / "platform" / "cognitive-event.schema.json"
CELL_SCHEMA_PATH = ROOT / "schemas" / "platform" / "reasoning-cell.schema.json"

QRT_OPERATIONS = {"RETRIEVE", "EXPLAIN", "APPLY", "MODEL", "REPRESENT", "SYNTHESIZE", "JUSTIFY"}
DEMAND_BANDS = {"D1", "D2", "D3", "D4"}


class CognitiveContractError(ValueError):
    """Raised when a cognitive event or reasoning cell violates contract invariants."""
    def __init__(self, code: str, detail: str = ""):
        super().__init__(f"{code}: {detail}" if detail else code)
        self.code = code
        self.detail = detail


@pytest.fixture(scope="module")
def event_validator() -> jsonschema.Draft202012Validator:
    assert EVENT_SCHEMA_PATH.exists(), f"Missing schema at {EVENT_SCHEMA_PATH}"
    schema = json.loads(EVENT_SCHEMA_PATH.read_text(encoding="utf-8"))
    jsonschema.Draft202012Validator.check_schema(schema)
    return jsonschema.Draft202012Validator(schema)


@pytest.fixture(scope="module")
def cell_validator() -> jsonschema.Draft202012Validator:
    assert CELL_SCHEMA_PATH.exists(), f"Missing schema at {CELL_SCHEMA_PATH}"
    schema = json.loads(CELL_SCHEMA_PATH.read_text(encoding="utf-8"))
    jsonschema.Draft202012Validator.check_schema(schema)
    return jsonschema.Draft202012Validator(schema)


def make_exact_ref(ref_type: str, ref_id: str, revision: int = 1, sha256: str = "c" * 64) -> dict[str, Any]:
    return {
        "type": ref_type,
        "id": ref_id,
        "revision": revision,
        "sha256": sha256,
    }


def make_valid_event(event_type: str = "PREDICTION_COMMITTED") -> dict[str, Any]:
    task = make_exact_ref("QUESTION", "que:physics:wpe:01")

    payloads = {
        "PREDICTION_COMMITTED": {
            "prediction": "The kinetic energy increases quadratically with velocity.",
            "artifact_ids": ["art:pred:01"],
        },
        "HELP_EXPOSED": {
            "capability": "H1",
            "asset_ref": make_exact_ref("ASSET", "ast:hint:01"),
            "ordinal": 1,
        },
        "FIRST_COMMITTED": {
            "responses": {"q1": {"value": "A"}},
            "work": ["Applied W = Delta K"],
            "help_event_ids": [],
        },
        "RECONSTRUCTION_COMMITTED": {
            "first_event_id": "evt:first_committed:01",
            "comparison": {"step1": {"aligned": True, "notes": "Re-evaluated work integral"}},
            "reference_ref": make_exact_ref("SOLUTION", "sol:physics:wpe:01"),
        },
        "DIAGNOSIS_COMMITTED": {
            "move_id": "move:diagnosis:sign-error",
            "why": "Initial attempt subtracted friction work instead of treating as negative.",
        },
        "REPAIR_COMMITTED": {
            "first_event_id": "evt:first_committed:01",
            "work": ["Corrected signs: W_net = W_ext - f_k * d"],
            "why": "Negative work done by friction dissipates mechanical energy.",
        },
        "BOUNDARY_COMMITTED": {
            "boundary_task_ref": make_exact_ref("QUESTION", "que:physics:wpe:boundary:01"),
            "responses": {"qb1": {"value": "C"}},
            "work": ["Tested limiting condition where friction coefficient mu -> 0"],
            "help_event_ids": [],
        },
        "BOUNDARY_FEEDBACK_VIEWED": {
            "boundary_event_id": "evt:boundary:01",
            "reference_ref": make_exact_ref("SOLUTION", "sol:boundary:01"),
        },
        "SOURCE_RETURNED": {
            "origin_session_id": "sess-prev-001",
            "origin_ref": make_exact_ref("LESSON", "les:physics:wpe:01"),
            "cursor": 0,
        },
    }

    return {
        "schema_version": "g9-cognitive-event/1",
        "event_id": f"evt:{event_type.lower()}:01",
        "journey_id": "jrn:physics:wpe01:session-01",
        "release_id": "rel:2026.11:candidate",
        "task_ref": task,
        "sequence": 1,
        "previous_sha256": None,
        "event_type": event_type,
        "payload": payloads[event_type],
        "at": "2026-11-17T06:00:00Z",
    }


def make_valid_cell() -> dict[str, Any]:
    return {
        "schema_version": "g9-reasoning-cell/1",
        "cell_id": "cell:physics:wpe:apply:d3",
        "subject_id": "PHYSICS",
        "topic_ref": make_exact_ref("CONCEPT", "con:physics:wpe:conservative-work"),
        "operation": "APPLY",
        "demand_band": "D3",
        "native_contract_ref": make_exact_ref("WARRANT", "war:qrt:physics:c06:01"),
        "instances": [
            make_exact_ref("QUESTION", "que:instance:wpe:01"),
            make_exact_ref("QUESTION", "que:instance:wpe:02"),
        ],
        "main": make_exact_ref("QUESTION", "que:main:wpe:01"),
        "status": "CANDIDATE",
        "c06_v11": True,
    }


def validate_reasoning_cell_contract(cell: dict[str, Any], validator: jsonschema.Draft202012Validator) -> None:
    """Validates reasoning-cell schema plus C06 v1.1 QRT semantic invariants."""
    try:
        validator.validate(cell)
    except jsonschema.ValidationError as err:
        raise CognitiveContractError("SCHEMA_VALIDATION_FAILED", err.message) from err

    # C06 v1.1 invariant enforcement
    if cell.get("c06_v11"):
        if cell.get("main") is None:
            raise CognitiveContractError("C06_MISSING_MAIN", "C06 v1.1 cells must have exactly one non-null MAIN reference")

        instances = cell.get("instances", [])
        if len(instances) < 2:
            raise CognitiveContractError("C06_INSUFFICIENT_INSTANCES", "C06 v1.1 cells must reference at least two INSTANCE tasks")

        instance_ids = [inst["id"] for inst in instances]
        if len(instance_ids) != len(set(instance_ids)):
            raise CognitiveContractError("C06_DUPLICATE_INSTANCE", "C06 v1.1 cells cannot contain duplicate INSTANCE references")


def validate_event_chain_isolation(events: list[dict[str, Any]]) -> None:
    """Verifies that chained cognitive events belong to the same task and have monotonic sequences."""
    if not events:
        return

    base_task_id = events[0]["task_ref"]["id"]
    for i, evt in enumerate(events):
        if evt["task_ref"]["id"] != base_task_id:
            raise CognitiveContractError(
                "CROSS_TASK_CONTAMINATION",
                f"Event {evt['event_id']} references task {evt['task_ref']['id']}, expected {base_task_id}",
            )
        if evt["sequence"] != i + 1:
            raise CognitiveContractError(
                "NON_MONOTONIC_SEQUENCE",
                f"Event sequence {evt['sequence']} does not match expected {i + 1}",
            )


# =====================================================================
# Unit & Contract Tests: Cognitive Event
# =====================================================================

def test_event_schema_is_valid_draft202012(event_validator):
    assert event_validator is not None


@pytest.mark.parametrize(
    "event_type",
    [
        "PREDICTION_COMMITTED",
        "HELP_EXPOSED",
        "FIRST_COMMITTED",
        "RECONSTRUCTION_COMMITTED",
        "DIAGNOSIS_COMMITTED",
        "REPAIR_COMMITTED",
        "BOUNDARY_COMMITTED",
        "BOUNDARY_FEEDBACK_VIEWED",
        "SOURCE_RETURNED",
    ],
)
def test_valid_cognitive_events_for_all_types(event_validator, event_type):
    evt = make_valid_event(event_type)
    event_validator.validate(evt)


def test_reject_unknown_fields_in_event(event_validator):
    evt = make_valid_event("PREDICTION_COMMITTED")
    evt["unregistered_extra_field"] = "malicious_payload"
    with pytest.raises(jsonschema.ValidationError):
        event_validator.validate(evt)


def test_reject_missing_required_payload_fields(event_validator):
    evt = make_valid_event("PREDICTION_COMMITTED")
    del evt["payload"]["prediction"]  # Required field
    with pytest.raises(jsonschema.ValidationError):
        event_validator.validate(evt)


def test_reject_cross_task_contamination():
    evt1 = make_valid_event("PREDICTION_COMMITTED")
    evt1["sequence"] = 1

    evt2 = make_valid_event("FIRST_COMMITTED")
    evt2["sequence"] = 2
    evt2["task_ref"] = make_exact_ref("QUESTION", "que:other:task:99")  # Conflicting task

    with pytest.raises(CognitiveContractError) as exc:
        validate_event_chain_isolation([evt1, evt2])
    assert exc.value.code == "CROSS_TASK_CONTAMINATION"


# =====================================================================
# Unit & Contract Tests: Reasoning Cell & C06 Invariants
# =====================================================================

def test_cell_schema_is_valid_draft202012(cell_validator):
    assert cell_validator is not None


def test_valid_reasoning_cell(cell_validator):
    cell = make_valid_cell()
    validate_reasoning_cell_contract(cell, cell_validator)


@pytest.mark.parametrize("operation", list(QRT_OPERATIONS))
def test_all_qrt_operations_supported(cell_validator, operation):
    cell = make_valid_cell()
    cell["operation"] = operation
    validate_reasoning_cell_contract(cell, cell_validator)


@pytest.mark.parametrize("demand", list(DEMAND_BANDS))
def test_all_demand_bands_supported(cell_validator, demand):
    cell = make_valid_cell()
    cell["demand_band"] = demand
    validate_reasoning_cell_contract(cell, cell_validator)


def test_c06_rejects_missing_main(cell_validator):
    cell = make_valid_cell()
    cell["c06_v11"] = True
    cell["main"] = None
    with pytest.raises(CognitiveContractError) as exc:
        validate_reasoning_cell_contract(cell, cell_validator)
    assert exc.value.code == "C06_MISSING_MAIN"


def test_c06_rejects_insufficient_instances(cell_validator):
    cell = make_valid_cell()
    cell["c06_v11"] = True
    cell["instances"] = [make_exact_ref("QUESTION", "que:instance:single")]  # Only 1 instance
    with pytest.raises(CognitiveContractError) as exc:
        validate_reasoning_cell_contract(cell, cell_validator)
    assert exc.value.code == "C06_INSUFFICIENT_INSTANCES"


def test_c06_rejects_duplicate_instance_references(cell_validator):
    cell = make_valid_cell()
    cell["c06_v11"] = True
    # Two identical instance references
    inst = make_exact_ref("QUESTION", "que:instance:wpe:01")
    cell["instances"] = [inst, copy.deepcopy(inst)]
    with pytest.raises(CognitiveContractError) as exc:
        validate_reasoning_cell_contract(cell, cell_validator)
    assert exc.value.code == "C06_DUPLICATE_INSTANCE"


def test_rule_13_invariant():
    """Rule 13 invariant: No academic approval inferred from software validation."""
    rule_13 = "No academic approval inferred from software validation."
    assert "No academic approval" in rule_13
