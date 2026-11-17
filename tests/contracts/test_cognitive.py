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
import hashlib
from datetime import datetime, timedelta
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
    return jsonschema.Draft202012Validator(schema, format_checker=jsonschema.FormatChecker())


@pytest.fixture(scope="module")
def cell_validator() -> jsonschema.Draft202012Validator:
    assert CELL_SCHEMA_PATH.exists(), f"Missing schema at {CELL_SCHEMA_PATH}"
    schema = json.loads(CELL_SCHEMA_PATH.read_text(encoding="utf-8"))
    jsonschema.Draft202012Validator.check_schema(schema)
    return jsonschema.Draft202012Validator(schema, format_checker=jsonschema.FormatChecker())


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
        "task_instance_id": "inst:wpe:01",
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



def _exact_ref_identity(ref: dict[str, Any]) -> tuple:
    """Exact revision and digest are part of task/source identity."""
    return (ref["type"], ref["id"], ref["revision"], ref["sha256"])


def _event_digest(event: dict[str, Any]) -> str:
    """R4 wpe_oracles.canon: SHA256(sorted UTF-8 JSON, compact, no NaN)."""
    raw = json.dumps(event, sort_keys=True, ensure_ascii=False,
                     separators=(",", ":"), allow_nan=False).encode("utf-8")
    return hashlib.sha256(raw).hexdigest()


def validate_reasoning_cell_contract(
    cell: dict[str, Any], validator: jsonschema.Draft202012Validator
) -> None:
    """Structural C06 validation plus logical MAIN/INSTANCE identity checks.

    These are synthetic contract checks, not signed academic admission.
    """
    try:
        validator.validate(cell)
    except jsonschema.ValidationError as exc:
        raise CognitiveContractError("SCHEMA_VALIDATION_FAILED", exc.message) from exc
    instances = cell["instances"]
    identities = [(ref["type"], ref["id"]) for ref in instances]
    if len(identities) != len(set(identities)):
        raise CognitiveContractError("C06_DUPLICATE_INSTANCE",
                                     "INSTANCE identity reused across revisions or hashes")
    main = cell["main"]
    main_id = (main["type"], main["id"]) if main is not None else None
    if main_id is not None and main_id in identities:
        raise CognitiveContractError("C06_MAIN_INSTANCE_ALIAS", "MAIN reused as INSTANCE")
    if cell["c06_v11"] and (main is None or len(instances) < 2):
        raise CognitiveContractError("C06_MAIN_OR_INSTANCES_MISSING",
                                     "C06 requires one MAIN and two distinct INSTANCE tasks")


def validate_event_chain_isolation(
    events: list[dict[str, Any]], *, allowed_capabilities=(), reviewed_references=()
) -> dict[str, Any]:
    """Tamper-evident synthetic R4 replay oracle, NOT an authenticated event store.

    External authorization for capabilities/references is a caller obligation.
    A browser storage chain alone is not trusted independent evidence.
    """
    validator = jsonschema.Draft202012Validator(
        json.loads(EVENT_SCHEMA_PATH.read_text(encoding="utf-8")),
        format_checker=jsonschema.FormatChecker())
    permitted = frozenset(allowed_capabilities)
    reviewed = frozenset(reviewed_references)
    seen, last, last_time = set(), None, None
    first = boundary = None
    help_ids, hints = [], []
    returned, stage, baseline = False, "PREDICT", None
    transitions = {
        "PREDICTION_COMMITTED": ("PREDICT", "ATTEMPT"),
        "FIRST_COMMITTED": ("ATTEMPT", "RECONSTRUCT"),
        "RECONSTRUCTION_COMMITTED": ("RECONSTRUCT", "DIAGNOSE"),
        "DIAGNOSIS_COMMITTED": ("DIAGNOSE", "REPAIR"),
        "REPAIR_COMMITTED": ("REPAIR", "BOUNDARY_TEST"),
        "BOUNDARY_COMMITTED": ("BOUNDARY_TEST", "BOUNDARY_TEST"),
        "BOUNDARY_FEEDBACK_VIEWED": ("BOUNDARY_TEST", "COMPLETE"),
        "SOURCE_RETURNED": ("COMPLETE", "COMPLETE"),
    }
    for index, event in enumerate(events, 1):
        try:
            validator.validate(event)
        except jsonschema.ValidationError as exc:
            raise CognitiveContractError("EVENT_SCHEMA_INVALID", exc.message) from exc
        group = (event["release_id"], _exact_ref_identity(event["task_ref"]),
                 event["journey_id"], event["task_instance_id"])
        if baseline is None:
            baseline = group
        elif group != baseline:
            raise CognitiveContractError("CROSS_TASK_CONTAMINATION",
                                         "exact release/task/journey/instance changed")
        if event["sequence"] != index:
            raise CognitiveContractError("NON_MONOTONIC_SEQUENCE", f"expected {index}")
        if event["event_id"] in seen:
            raise CognitiveContractError("DUPLICATE_EVENT_ID", event["event_id"])
        seen.add(event["event_id"])
        if event["previous_sha256"] != last:
            raise CognitiveContractError("BROKEN_EVENT_CHAIN", f"sequence {index}")
        try:
            at = datetime.fromisoformat(event["at"].replace("Z", "+00:00"))
        except ValueError as exc:
            raise CognitiveContractError("INVALID_EVENT_TIMESTAMP", event["at"]) from exc
        if at.utcoffset() != timedelta(0) or (last_time is not None and at < last_time):
            raise CognitiveContractError("EVENT_TIME_REGRESSION", event["at"])
        last_time = at
        typ, payload, event_id = event["event_type"], event["payload"], event["event_id"]
        if typ == "HELP_EXPOSED":
            cap = payload["capability"]
            if stage != "ATTEMPT" or cap not in permitted:
                raise CognitiveContractError("FORBIDDEN_HELP_EXPOSURE", cap)
            if payload["ordinal"] != len(help_ids) + 1:
                raise CognitiveContractError("HELP_ORDINAL_MISMATCH", event_id)
            if cap in ("H1", "H2", "H3"):
                ordered = ("H1", "H2", "H3")
                if len(hints) >= 3 or cap != ordered[len(hints)]:
                    raise CognitiveContractError("HELP_OUT_OF_ORDER", cap)
                hints.append(cap)
            help_ids.append(event_id)
        else:
            if typ not in transitions or stage != transitions[typ][0]:
                raise CognitiveContractError("ILLEGAL_EVENT_TRANSITION",
                                             f"{stage} -> {typ}")
            if typ == "PREDICTION_COMMITTED":
                if not payload["prediction"].strip():
                    raise CognitiveContractError("EMPTY_PREDICTION", event_id)
            elif typ == "FIRST_COMMITTED":
                if first or not payload["responses"] or payload["help_event_ids"] != help_ids:
                    raise CognitiveContractError("INVALID_FIRST_COMMIT", event_id)
                first = event_id
            elif typ == "RECONSTRUCTION_COMMITTED":
                if (not first or payload["first_event_id"] != first or
                    not payload["comparison"] or "REFERENCE_SOLUTION" not in permitted or
                    _exact_ref_identity(payload["reference_ref"]) not in reviewed):
                    raise CognitiveContractError("UNREVIEWED_RECONSTRUCTION", event_id)
            elif typ == "DIAGNOSIS_COMMITTED":
                if not payload["move_id"] or not payload["why"].strip():
                    raise CognitiveContractError("INVALID_DIAGNOSIS", event_id)
            elif typ == "REPAIR_COMMITTED":
                if (payload["first_event_id"] != first or not payload["work"] or
                    not payload["why"].strip()):
                    raise CognitiveContractError("INVALID_REPAIR", event_id)
            elif typ == "BOUNDARY_COMMITTED":
                b_ref = payload["boundary_task_ref"]
                if (boundary or (b_ref["type"], b_ref["id"]) ==
                    (event["task_ref"]["type"], event["task_ref"]["id"]) or
                    not payload["responses"] or not payload["work"]):
                    raise CognitiveContractError("INVALID_BOUNDARY_COMMIT", event_id)
                boundary = event_id
            elif typ == "BOUNDARY_FEEDBACK_VIEWED":
                if (not boundary or payload["boundary_event_id"] != boundary or
                    "BOUNDARY_REFERENCE" not in permitted or
                    _exact_ref_identity(payload["reference_ref"]) not in reviewed):
                    raise CognitiveContractError("PREMATURE_BOUNDARY_FEEDBACK", event_id)
            elif typ == "SOURCE_RETURNED":
                if returned or "SOURCE_RETURN" not in permitted or not payload["origin_session_id"]:
                    raise CognitiveContractError("INVALID_SOURCE_RETURN", event_id)
                returned = True
            stage = transitions[typ][1]
        last = _event_digest(event)
    return {"stage": stage, "first_event_id": first, "boundary_event_id": boundary,
            "last_sha256": last, "assisted": bool(help_ids)}


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
    evt2["previous_sha256"] = _event_digest(evt1)
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
    assert exc.value.code in {"C06_MISSING_MAIN", "SCHEMA_VALIDATION_FAILED"}


def test_c06_rejects_insufficient_instances(cell_validator):
    cell = make_valid_cell()
    cell["c06_v11"] = True
    cell["instances"] = [make_exact_ref("QUESTION", "que:instance:single")]  # Only 1 instance
    with pytest.raises(CognitiveContractError) as exc:
        validate_reasoning_cell_contract(cell, cell_validator)
    assert exc.value.code in {"C06_INSUFFICIENT_INSTANCES", "SCHEMA_VALIDATION_FAILED"}


def test_c06_rejects_duplicate_instance_references(cell_validator):
    cell = make_valid_cell()
    cell["c06_v11"] = True
    # Two identical instance references
    inst = make_exact_ref("QUESTION", "que:instance:wpe:01")
    cell["instances"] = [inst, copy.deepcopy(inst)]
    with pytest.raises(CognitiveContractError) as exc:
        validate_reasoning_cell_contract(cell, cell_validator)
    assert exc.value.code in {"C06_DUPLICATE_INSTANCE", "SCHEMA_VALIDATION_FAILED"}



# All following cases are synthetic technical controls. None validates
# an Ed25519 receipt, browser persistence, or academic QRT classification.
_EVENT_ORDER = [
    "PREDICTION_COMMITTED", "HELP_EXPOSED", "FIRST_COMMITTED",
    "RECONSTRUCTION_COMMITTED", "DIAGNOSIS_COMMITTED", "REPAIR_COMMITTED",
    "BOUNDARY_COMMITTED", "BOUNDARY_FEEDBACK_VIEWED", "SOURCE_RETURNED",
]


def make_valid_chain() -> list[dict[str, Any]]:
    events = [make_valid_event(event_type) for event_type in _EVENT_ORDER]
    events[2]["payload"]["help_event_ids"] = [events[1]["event_id"]]
    events[7]["payload"]["boundary_event_id"] = events[6]["event_id"]
    for index, event in enumerate(events):
        event["sequence"] = index + 1
        event["previous_sha256"] = _event_digest(events[index - 1]) if index else None
    return events


def _reviewed_refs(events):
    return frozenset({
        _exact_ref_identity(events[3]["payload"]["reference_ref"]),
        _exact_ref_identity(events[7]["payload"]["reference_ref"]),
    })


def _replay_candidate(events, *, allow=None, reviewed=None):
    if allow is None:
        allow = {"H1", "REFERENCE_SOLUTION", "BOUNDARY_REFERENCE", "SOURCE_RETURN"}
    if reviewed is None:
        reviewed = _reviewed_refs(make_valid_chain())
    return validate_event_chain_isolation(events, allowed_capabilities=allow,
                                          reviewed_references=reviewed)


def test_a47_full_nine_event_chain_is_valid_and_hash_bound():
    chain = make_valid_chain()
    snapshot = _replay_candidate(chain)
    assert snapshot["stage"] == "COMPLETE"
    assert snapshot["first_event_id"] == chain[2]["event_id"]
    assert snapshot["boundary_event_id"] == chain[6]["event_id"]
    assert snapshot["last_sha256"] == _event_digest(chain[-1])
    assert snapshot["assisted"] is True


@pytest.mark.parametrize("change,code", [
    ("forged", "BROKEN_EVENT_CHAIN"),
    ("duplicate_id", "DUPLICATE_EVENT_ID"),
    ("release", "CROSS_TASK_CONTAMINATION"),
    ("journey", "CROSS_TASK_CONTAMINATION"),
    ("task_sha", "CROSS_TASK_CONTAMINATION"),
    ("task_instance", "CROSS_TASK_CONTAMINATION"),
    ("sequence", "NON_MONOTONIC_SEQUENCE"),
    ("time", "EVENT_TIME_REGRESSION"),
    ("unreviewed", "UNREVIEWED_RECONSTRUCTION"),
    ("unauthorized_help", "FORBIDDEN_HELP_EXPOSURE"),
    ("first_missing_help", "INVALID_FIRST_COMMIT"),
    ("boundary_link", "PREMATURE_BOUNDARY_FEEDBACK"),
    ("precommit_solution", "ILLEGAL_EVENT_TRANSITION"),
])
def test_a47_chain_tampering_fails_closed(change, code):
    chain = make_valid_chain()
    allow = {"H1", "REFERENCE_SOLUTION", "BOUNDARY_REFERENCE", "SOURCE_RETURN"}
    reviewed = _reviewed_refs(chain)
    if change == "forged":
        chain[1]["previous_sha256"] = "f" * 64
    elif change == "duplicate_id":
        chain[1]["event_id"] = chain[0]["event_id"]
    elif change == "release":
        chain[1]["release_id"] = "rel:foreign:01"
    elif change == "journey":
        chain[1]["journey_id"] = "jrn:foreign:01"
    elif change == "task_sha":
        chain[1]["task_ref"]["sha256"] = "a" * 64
    elif change == "task_instance":
        chain[1]["task_instance_id"] = "inst:foreign:01"
    elif change == "sequence":
        chain[1]["sequence"] = 3
    elif change == "time":
        chain[1]["at"] = "2026-11-16T00:00:00Z"
    elif change == "unreviewed":
        reviewed = frozenset()
    elif change == "unauthorized_help":
        allow = frozenset()
    elif change == "first_missing_help":
        chain[2]["payload"]["help_event_ids"] = []
    elif change == "boundary_link":
        chain[7]["payload"]["boundary_event_id"] = "evt:missing:01"
    elif change == "precommit_solution":
        chain = [chain[3]]
        chain[0]["sequence"] = 1
        chain[0]["previous_sha256"] = None
    if change not in {"forged", "precommit_solution"}:
        for index, event in enumerate(chain):
            event["previous_sha256"] = _event_digest(chain[index - 1]) if index else None
    with pytest.raises(CognitiveContractError) as exc:
        validate_event_chain_isolation(chain, allowed_capabilities=allow,
                                       reviewed_references=reviewed)
    assert exc.value.code == code


def test_a47_schema_rejects_bad_genesis_predecessor_and_invalid_time(event_validator):
    events = make_valid_chain()
    for index, wrong in ((0, "0" * 64), (1, None)):
        event = copy.deepcopy(events[index])
        event["previous_sha256"] = wrong
        with pytest.raises(jsonschema.ValidationError):
            event_validator.validate(event)
    for timestamp in ("yesterday", "2026-11-17T01:00:00+04:00"):
        event = copy.deepcopy(events[0])
        event["at"] = timestamp
        with pytest.raises(jsonschema.ValidationError):
            event_validator.validate(event)


@pytest.mark.parametrize("kind", [
    "null_main", "zero_instances", "one_instance", "duplicate_instance",
    "wrong_main_type", "wrong_instance_type"
])
def test_a47_c06_direct_schema_rejections(cell_validator, kind):
    record = make_valid_cell()
    if kind == "null_main":
        record["main"] = None
    elif kind == "zero_instances":
        record["instances"] = []
    elif kind == "one_instance":
        record["instances"] = record["instances"][:1]
    elif kind == "duplicate_instance":
        record["instances"][1] = copy.deepcopy(record["instances"][0])
    elif kind == "wrong_main_type":
        record["main"]["type"] = "SOURCE"
    elif kind == "wrong_instance_type":
        record["instances"][0]["type"] = "SOURCE"
    with pytest.raises(jsonschema.ValidationError):
        cell_validator.validate(record)


@pytest.mark.parametrize("kind,expected", [
    ("main_as_instance", "C06_MAIN_INSTANCE_ALIAS"),
    ("same_instance_id_diff_hash", "C06_DUPLICATE_INSTANCE"),
    ("same_instance_id_diff_revision", "C06_DUPLICATE_INSTANCE"),
])
def test_a47_c06_logical_identity_rejections(cell_validator, kind, expected):
    record = make_valid_cell()
    if kind == "main_as_instance":
        record["main"] = copy.deepcopy(record["instances"][0])
    else:
        record["instances"][1]["id"] = record["instances"][0]["id"]
        if kind == "same_instance_id_diff_hash":
            record["instances"][1]["sha256"] = "d" * 64
        else:
            record["instances"][1]["revision"] = 2
    with pytest.raises(CognitiveContractError) as exc:
        validate_reasoning_cell_contract(record, cell_validator)
    assert exc.value.code == expected


def test_rule_13_invariant():
    """Rule 13 invariant: No academic approval inferred from software validation."""
    rule_13 = "No academic approval inferred from software validation."
    assert "No academic approval" in rule_13
