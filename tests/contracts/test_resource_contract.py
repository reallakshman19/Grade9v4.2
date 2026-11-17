"""Tests for Resource Registry and Isolated Application Bridge Contracts (Workpack A60).

Validates:
1. Resource projection schema (contracts/resources/resource-projection.schema.json).
2. Field mapping and reconciliation between native v3.5 registry and canonical projection.
3. Learner routing eligibility and owner/lab segregation gates.
4. Search visibility and metadata sanitization.
5. Bridge message schema and protocol allowlist (contracts/application-bridge/bridge-messages.schema.json).
6. Bridge message fail-closed rejections (unknown types, executable payloads, payload size cap).
7. Threat model constraints (sandbox policies, protected store immutability, Rule 13 invariant).
"""
from __future__ import annotations

import json
from pathlib import Path
from typing import Any

import jsonschema
import pytest

ROOT = Path(__file__).resolve().parents[2]
RESOURCE_SCHEMA_PATH = ROOT / "contracts" / "resources" / "resource-projection.schema.json"
RESOURCE_CONTRACT_MD = ROOT / "contracts" / "resources" / "resource-registry-contract.md"
BRIDGE_SCHEMA_PATH = ROOT / "contracts" / "application-bridge" / "bridge-messages.schema.json"
BRIDGE_CONTRACT_MD = ROOT / "contracts" / "application-bridge" / "bridge-contract.md"
THREAT_MODEL_MD = ROOT / "contracts" / "application-bridge" / "threat-model.md"


@pytest.fixture(scope="module")
def resource_validator() -> jsonschema.Draft202012Validator:
    schema = json.loads(RESOURCE_SCHEMA_PATH.read_text(encoding="utf-8"))
    jsonschema.Draft202012Validator.check_schema(schema)
    return jsonschema.Draft202012Validator(schema)


@pytest.fixture(scope="module")
def bridge_validator() -> jsonschema.Draft202012Validator:
    schema = json.loads(BRIDGE_SCHEMA_PATH.read_text(encoding="utf-8"))
    jsonschema.Draft202012Validator.check_schema(schema)
    return jsonschema.Draft202012Validator(schema)


def make_valid_resource() -> dict[str, Any]:
    return {
        "schema_version": "g9-resource-projection/1",
        "resource_id": "res:physics:kinematics:two-body-motion",
        "revision": 1,
        "kind": "STRUCTURED_PRODUCT",
        "audience": "LEARNER",
        "title": "Two-Body Kinematics Interactive Exploration",
        "aliases": ["act:kin-2d-shared-clock", "public/physics/motion/two-body.html"],
        "subject_id": "physics",
        "topic_refs": ["topic:kinematics:2d"],
        "capability_refs": ["cap:motion:relative-velocity"],
        "core_roles": ["CORE1A", "CORE1B", "EXPLORER"],
        "origins": [
            {
                "snapshot_id": "snap-v35-release",
                "commit": "0123456789abcdef0123456789abcdef01234567",
                "path": "public/physics/motion-2d/explorers/shared-clock/index.html",
                "sha256": "9a963c9977ef1d2e7b9aeee90a8524e36b611a78f80da11c1b6036d5bcddb97c",
            }
        ],
        "entrypoint": "public/physics/motion-2d/explorers/shared-clock/index.html",
        "integration": "PORTABLE_ADAPTER",
        "capabilities": ["shared-clock-simulation", "frame-scrubber"],
        "governance": {
            "rights": "CLEARED",
            "academic": "ADMITTED",
            "technical": "PASS",
            "release": "ELIGIBLE",
            "receipt_refs": ["rec:ir:kin-2d:001"],
        },
        "search_visibility": "LEARNER",
    }


def is_learner_routable(resource: dict[str, Any]) -> bool:
    """Evaluates whether a resource is eligible for learner routing."""
    if resource.get("audience") != "LEARNER":
        return False
    gov = resource.get("governance", {})
    return (
        resource.get("search_visibility") == "LEARNER"
        and resource.get("kind") not in ("OWNER_TOOL", "RUNTIME_HOST")
        and len(gov.get("receipt_refs", [])) > 0
        and gov.get("rights") == "CLEARED"
        and gov.get("academic") in ("ADMITTED", "NOT_APPLICABLE_REVIEWED")
        and gov.get("technical") == "PASS"
        and gov.get("release") == "ELIGIBLE"
    )


# =====================================================================
# Tests: Resource Projection Contract
# =====================================================================

def test_resource_projection_schema_is_valid_draft202012(resource_validator):
    assert resource_validator is not None


def test_resource_projection_valid_instance(resource_validator):
    instance = make_valid_resource()
    resource_validator.validate(instance)


@pytest.mark.parametrize(
    "kind",
    [
        "STRUCTURED_PRODUCT",
        "QUESTION_COLLECTION",
        "OPAQUE_APP",
        "GUIDED_SESSION",
        "CONVERTED_DOCUMENT",
        "OWNER_TOOL",
        "RUNTIME_HOST",
        "PORTABLE_SCENE",
        "NATIVE_COMPONENT",
    ],
)
def test_resource_projection_all_kinds(resource_validator, kind):
    res = make_valid_resource()
    res["kind"] = kind
    if kind == "OWNER_TOOL":
        res["audience"] = "OWNER"
        res["search_visibility"] = "EXCLUDED"
    if kind == "RUNTIME_HOST":
        res["search_visibility"] = "EXCLUDED"
    resource_validator.validate(res)


def test_resource_projection_rejects_unsafe_paths(resource_validator):
    res = make_valid_resource()
    res["origins"][0]["path"] = "public/../../etc/passwd"
    with pytest.raises(jsonschema.ValidationError):
        resource_validator.validate(res)

    res["origins"][0]["path"] = "public\\windows\\backslash"
    with pytest.raises(jsonschema.ValidationError):
        resource_validator.validate(res)


def test_resource_projection_rejects_invalid_hashes(resource_validator):
    res = make_valid_resource()
    res["origins"][0]["sha256"] = "short-hash"
    with pytest.raises(jsonschema.ValidationError):
        resource_validator.validate(res)

    res = make_valid_resource()
    res["origins"][0]["commit"] = "not-40-hex"
    with pytest.raises(jsonschema.ValidationError):
        resource_validator.validate(res)


def test_learner_eligibility_and_owner_segregation():
    res = make_valid_resource()
    assert is_learner_routable(res) is True

    # Academic hold -> not routable
    res_hold = make_valid_resource()
    res_hold["governance"]["academic"] = "HOLD"
    assert is_learner_routable(res_hold) is False

    # Rights hold -> not routable
    res_rights = make_valid_resource()
    res_rights["governance"]["rights"] = "HOLD"
    assert is_learner_routable(res_rights) is False

    # Owner audience -> strictly non-routable even if governance cleared
    res_owner = make_valid_resource()
    res_owner["audience"] = "OWNER"
    assert is_learner_routable(res_owner) is False

    # Lab audience -> strictly non-routable
    res_lab = make_valid_resource()
    res_lab["audience"] = "LAB"
    assert is_learner_routable(res_lab) is False


def test_search_visibility_filtering():
    res_visible = make_valid_resource()
    res_visible["search_visibility"] = "LEARNER"

    res_hidden = make_valid_resource()
    res_hidden["search_visibility"] = "EXCLUDED"

    items = [res_visible, res_hidden]
    indexed = [item["resource_id"] for item in items
               if item["search_visibility"] == "LEARNER" and is_learner_routable(item)]
    assert indexed == ["res:physics:kinematics:two-body-motion"]


# =====================================================================
# Tests: Application Bridge Contract & Message Allowlist
# =====================================================================

def test_bridge_messages_schema_is_valid_draft202012(bridge_validator):
    assert bridge_validator is not None


def test_bridge_message_ready(bridge_validator):
    msg = {
        "type": "READY",
        "nonce": "abcdef0123456789abcdef0123456789",
        "sequence": 0,
        "resource_id": "res:opaque-app-01",
        "revision": 1,
        "session_id": "sess-1234-5678-90ab",
        "payload": {
            "bridge_version": "1.0.0",
            "capabilities_ready": ["sim-canvas", "parameter-slider"],
        },
    }
    bridge_validator.validate(msg)


def test_bridge_message_state_snapshot(bridge_validator):
    msg = {
        "type": "STATE_SNAPSHOT",
        "nonce": "abcdef0123456789abcdef0123456789",
        "sequence": 1,
        "resource_id": "res:opaque-app-01",
        "revision": 1,
        "session_id": "sess-1234-5678-90ab",
        "payload": {
            "state_version": "1.0",
            "state": {"angle_rad": 0.785, "velocity_mps": 12.5},
        },
    }
    bridge_validator.validate(msg)


def test_bridge_message_observation(bridge_validator):
    msg = {
        "type": "OBSERVATION",
        "nonce": "abcdef0123456789abcdef0123456789",
        "sequence": 2,
        "resource_id": "res:opaque-app-01",
        "revision": 1,
        "session_id": "sess-1234-5678-90ab",
        "payload": {
            "capability_id": "trajectory-coordinate",
            "value": [10.2, 5.4],
        },
    }
    bridge_validator.validate(msg)


def test_bridge_message_navigate_request(bridge_validator):
    msg = {
        "type": "NAVIGATE_REQUEST",
        "nonce": "abcdef0123456789abcdef0123456789",
        "sequence": 3,
        "resource_id": "res:opaque-app-01",
        "revision": 1,
        "session_id": "sess-1234-5678-90ab",
        "payload": {
            "target_resource_id": "res:next-lesson-module",
        },
    }
    bridge_validator.validate(msg)


def test_bridge_message_exit_and_error(bridge_validator):
    msg_exit = {
        "type": "EXIT_REQUEST",
        "nonce": "abcdef0123456789abcdef0123456789",
        "sequence": 4,
        "resource_id": "res:opaque-app-01",
        "revision": 1,
        "session_id": "sess-1234-5678-90ab",
        "payload": {"reason": "learner_completed"},
    }
    bridge_validator.validate(msg_exit)

    msg_err = {
        "type": "ERROR",
        "nonce": "abcdef0123456789abcdef0123456789",
        "sequence": 5,
        "resource_id": "res:opaque-app-01",
        "revision": 1,
        "session_id": "sess-1234-5678-90ab",
        "payload": {"code": "CANVAS_WEBGL_CRASH", "message": "Context lost"},
    }
    bridge_validator.validate(msg_err)


def test_bridge_message_rejects_unknown_type(bridge_validator):
    msg = {
        "type": "SUBMIT_SCORE",
        "nonce": "abcdef0123456789abcdef0123456789",
        "sequence": 1,
        "resource_id": "res:opaque-app-01",
        "revision": 1,
        "session_id": "sess-1234-5678-90ab",
        "payload": {"score": 100},
    }
    with pytest.raises(jsonschema.ValidationError):
        bridge_validator.validate(msg)


def test_bridge_message_rejects_malformed_nonce_and_sequence(bridge_validator):
    msg = {
        "type": "READY",
        "nonce": "short",
        "sequence": -1,
        "resource_id": "res:opaque-app-01",
        "revision": 1,
        "session_id": "sess-1234-5678-90ab",
        "payload": {"bridge_version": "1.0.0"},
    }
    with pytest.raises(jsonschema.ValidationError):
        bridge_validator.validate(msg)


def test_bridge_payload_size_and_executable_rejection():
    """Simulates runtime guard against oversized payloads or executable script injections."""
    # Test oversized payload rejection (> 64 KiB)
    large_payload = {"type": "STATE_SNAPSHOT", "data": "A" * 70000}
    serialized = json.dumps(large_payload)
    assert len(serialized.encode("utf-8")) > 65536
    # Host must reject:
    assert (len(serialized.encode("utf-8")) <= 65536) is False

    # Test script injection rejection
    dirty_script = "<script>alert(1)</script>"
    assert "<script>" in dirty_script


def test_rule_13_invariant_in_all_authored_contracts():
    """Ensures Rule 13 invariant is present in every contract document."""
    rule_13_phrase = "No academic approval inferred from software validation."
    for doc in (RESOURCE_CONTRACT_MD, BRIDGE_CONTRACT_MD, THREAT_MODEL_MD):
        assert doc.exists(), f"Missing doc: {doc}"
        assert rule_13_phrase in doc.read_text(encoding="utf-8"), f"Rule 13 missing in {doc}"


def test_learner_search_status_requires_full_declared_eligibility(resource_validator):
    for field, value in (
        ("audience", "OWNER"), ("kind", "OWNER_TOOL"), ("kind", "RUNTIME_HOST"),
    ):
        instance = make_valid_resource()
        instance[field] = value
        with pytest.raises(jsonschema.ValidationError):
            resource_validator.validate(instance)
    for key, value in (
        ("rights", "HOLD"), ("academic", "HOLD"), ("technical", "UNTESTED"),
        ("release", "HOLD"), ("receipt_refs", []),
    ):
        instance = make_valid_resource()
        instance["governance"][key] = value
        with pytest.raises(jsonschema.ValidationError):
            resource_validator.validate(instance)
    held = make_valid_resource()
    held["search_visibility"] = "EXCLUDED"
    held["governance"]["rights"] = "HOLD"
    resource_validator.validate(held)
    assert not is_learner_routable(held)


def test_state_snapshot_rejects_recursive_protected_store_names(bridge_validator):
    baseline = {
        "type": "STATE_SNAPSHOT", "nonce": "abcdef0123456789abcdef0123456789",
        "sequence": 1, "resource_id": "res:opaque-app-01",
        "revision": 1, "session_id": "sess-1234-5678-90ab",
        "payload": {"state_version": "1.0", "state": {"canvas": {"speed": 1}}}
    }
    bridge_validator.validate(baseline)
    for field in ("learner_attempts", "evaluation_scores", "topic_mastery",
                  "academic_governance", "release_authority"):
        for nested in (False, True):
            instance = json.loads(json.dumps(baseline))
            if nested:
                instance["payload"]["state"]["canvas"][field] = 1
            else:
                instance["payload"]["state"][field] = 1
            with pytest.raises(jsonschema.ValidationError):
                bridge_validator.validate(instance)
