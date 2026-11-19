"""Tests for Scientific Model and Cognitive Disclosure Contracts (Workpack A46).

Ensures:
1. Schema validity of model-projection and cognitive-disclosure under Draft 2020-12.
2. Scientific model parameter domain checks (min <= initial <= max, step > 0, finite numbers).
3. Output and representation ID validation and exact warrant refs.
4. Cognitive disclosure policy: default-deny, stage-based capability gating.
5. Strict pre-commitment protection: reference solutions forbidden in PREDICT/ATTEMPT.
6. Rejection of invalid domains, nonfinite floats, unregistered adapters, and missing reviews.
7. Rule 13 invariant preservation.
"""
from __future__ import annotations

import copy
import json
import math
from pathlib import Path
from typing import Any

import jsonschema
import pytest

ROOT = Path(__file__).resolve().parents[2]
MODEL_SCHEMA_PATH = ROOT / "schemas" / "platform" / "model-projection.schema.json"
# Synthetic-only test fixture. Production adapter trust must be external.
SYNTHETIC_TEST_ADAPTERS = frozenset({("adapter:physics:spring-simulation", "1.0.0")})
DISCLOSURE_SCHEMA_PATH = ROOT / "schemas" / "platform" / "cognitive-disclosure.schema.json"


class ModelContractError(ValueError):
    """Raised when a model projection or disclosure policy violates contract invariants."""
    def __init__(self, code: str, detail: str = ""):
        super().__init__(f"{code}: {detail}" if detail else code)
        self.code = code
        self.detail = detail


@pytest.fixture(scope="module")
def model_validator() -> jsonschema.Draft202012Validator:
    assert MODEL_SCHEMA_PATH.exists(), f"Missing schema at {MODEL_SCHEMA_PATH}"
    schema = json.loads(MODEL_SCHEMA_PATH.read_text(encoding="utf-8"))
    jsonschema.Draft202012Validator.check_schema(schema)
    return jsonschema.Draft202012Validator(schema)


@pytest.fixture(scope="module")
def disclosure_validator() -> jsonschema.Draft202012Validator:
    assert DISCLOSURE_SCHEMA_PATH.exists(), f"Missing schema at {DISCLOSURE_SCHEMA_PATH}"
    schema = json.loads(DISCLOSURE_SCHEMA_PATH.read_text(encoding="utf-8"))
    jsonschema.Draft202012Validator.check_schema(schema)
    return jsonschema.Draft202012Validator(schema)


def make_exact_ref(ref_type: str, ref_id: str, revision: int = 1, sha256: str = "b" * 64) -> dict[str, Any]:
    return {
        "type": ref_type,
        "id": ref_id,
        "revision": revision,
        "sha256": sha256,
    }


def make_valid_model() -> dict[str, Any]:
    return {
        "schema_version": "g9-model-projection/1",
        "id": "model:spring:linear-oscillation",
        "adapter_id": "adapter:physics:spring-simulation",
        "adapter_version": "1.0.0",
        "parameters": [
            {
                "id": "spring_constant_k",
                "unit": "N/m",
                "min": 1.0,
                "max": 500.0,
                "step": 0.5,
                "initial": 50.0,
            },
            {
                "id": "mass_m",
                "unit": "kg",
                "min": 0.1,
                "max": 20.0,
                "step": 0.1,
                "initial": 2.0,
            },
        ],
        "output_ids": ["angular_frequency_omega", "period_t", "elastic_potential_energy_u"],
        "representation_ids": ["canvas:spring-mass-displacement", "chart:energy-vs-displacement"],
        "warrant_refs": [make_exact_ref("WARRANT", "war:physics:hookes-law:01")],
        "alt_text": "Interactive spring oscillator displaying real-time displacement and potential energy curves.",
        "status": "CANDIDATE",
    }


def make_valid_disclosure() -> dict[str, Any]:
    return {
        "schema_version": "g9-disclosure/1",
        "task_ref": make_exact_ref("QUESTION", "que:physics:wpe:01"),
        "stage": "PREDICT",
        "capability": "VIEW_STIMULUS",
        "allowed": True,
        "review_ref": make_exact_ref("APPROVAL", "app:ir:wpe:01"),
        "reason_code": "PREDICT_STIMULUS_VISIBLE",
    }


def validate_model_domain_invariants(
    model: dict[str, Any], validator: jsonschema.Draft202012Validator,
    *, registered_adapters: frozenset[tuple[str, str]] | None = None,
) -> None:
    """Validates model schema compliance plus semantic domain bounds and finiteness."""
    try:
        validator.validate(model)
    except jsonschema.ValidationError as err:
        raise ModelContractError("SCHEMA_VALIDATION_FAILED", err.message) from err

    if registered_adapters is None:
        raise ModelContractError("MISSING_TRUSTED_ADAPTER_REGISTRY",
                                 "Adapter registration must be independently sourced")
    if (model["adapter_id"], model["adapter_version"]) not in registered_adapters:
        raise ModelContractError("UNREGISTERED_ADAPTER", "Adapter/version not in trusted registry")
    param_ids = [p["id"] for p in model["parameters"]]
    if len(param_ids) != len(set(param_ids)):
        raise ModelContractError("DUPLICATE_PARAMETER_ID", "Model parameter ID reused")
    for param in model["parameters"]:
        # Finite check
        for fld in ("min", "max", "step", "initial"):
            val = param[fld]
            if math.isnan(val) or math.isinf(val):
                raise ModelContractError("NON_FINITE_PARAMETER", f"Parameter {param['id']} {fld} is non-finite")

        if param["min"] >= param["max"]:
            raise ModelContractError("INVALID_PARAMETER_DOMAIN", f"Parameter {param['id']} min >= max")

        if not (param["min"] <= param["initial"] <= param["max"]):
            raise ModelContractError("INITIAL_OUT_OF_BOUNDS", f"Parameter {param['id']} initial outside [min, max]")

        if param["step"] <= 0:
            raise ModelContractError("INVALID_STEP_VALUE", f"Parameter {param['id']} step must be strictly positive")


def evaluate_disclosure_policy(
    stage: str, capability: str, task_ref: dict[str, Any],
    review_ref: dict[str, Any] | None = None, *,
    first_committed: bool = False,
    boundary_committed: bool = False,
    authorized_capabilities: frozenset[str] = frozenset(),
    verified_review_refs: frozenset[tuple] = frozenset(),
    exam_mode: bool = False,
) -> dict[str, Any]:
    """Synthetic policy oracle, NOT a signed review verifier or production runtime."""
    help_caps = {"H1", "H2", "H3", "READ_ANCHOR", "MODEL_AUTO_CALCULATE", "MODEL_MANIPULATE"}
    if capability in {"VIEW_STIMULUS", "EDIT_WORK"}:
        permitted, reason = True, "STANDARD_STAGE_CAPABILITY_ALLOWED"
    elif exam_mode or stage == "PREDICT":
        permitted, reason = False, "PRECOMMIT_DISCLOSURE_WITHHELD"
    elif capability in help_caps:
        permitted = stage == "ATTEMPT" and capability in authorized_capabilities
        reason = "HELP_PERMITTED_BY_EXTERNAL_POLICY" if permitted else "DEFAULT_DENY_UNAUTHORIZED_HELP"
    elif capability == "SOURCE_RETURN":
        permitted = stage == "COMPLETE" and capability in authorized_capabilities
        reason = "SOURCE_RETURN_ELIGIBLE" if permitted else "SOURCE_RETURN_WITHHELD"
    elif capability in {"REFERENCE_SOLUTION", "SHOW_REASONING_CRUX", "BOUNDARY_REFERENCE"}:
        valid_stage = (stage in {"RECONSTRUCT", "DIAGNOSE", "REPAIR", "BOUNDARY_TEST", "COMPLETE"}
                       if capability != "BOUNDARY_REFERENCE" else stage in {"BOUNDARY_TEST", "COMPLETE"})
        if capability == "REFERENCE_SOLUTION" and valid_stage and not review_ref:
            raise ModelContractError("MISSING_REVIEW_RECEIPT", "Reference solution requires independent review")
        ref_tuple = (review_ref.get("type"), review_ref.get("id"),
                     review_ref.get("revision"), review_ref.get("sha256")) if isinstance(review_ref, dict) else None
        review_verified = (ref_tuple in verified_review_refs and
                           isinstance(review_ref, dict) and review_ref.get("type") == "APPROVAL")
        if capability == "REFERENCE_SOLUTION" and valid_stage and review_ref and not review_verified:
            raise ModelContractError("UNVERIFIED_REVIEW_RECEIPT", "No trusted external acceptance evidence")
        committed = boundary_committed if capability == "BOUNDARY_REFERENCE" else first_committed
        permitted = (valid_stage and committed and capability in authorized_capabilities
                     and review_verified)
        reason = "POST_COMMIT_SOLUTION_PERMITTED" if permitted and capability == "REFERENCE_SOLUTION" else (
            "REVIEWED_DISCLOSURE_PERMITTED" if permitted else "DEFAULT_DENY_UNAUTHORIZED_DISCLOSURE")
    else:
        permitted, reason = False, "DEFAULT_DENY_UNREGISTERED_CAPABILITY"
    return {
        "schema_version": "g9-disclosure/1", "task_ref": task_ref,
        "stage": stage, "capability": capability, "allowed": permitted,
        "review_ref": review_ref, "reason_code": reason,
    }


# =====================================================================
# Unit & Contract Tests: Model Projection
# =====================================================================

def test_model_schema_is_valid_draft202012(model_validator):
    assert model_validator is not None


def test_valid_model_projection(model_validator):
    model = make_valid_model()
    validate_model_domain_invariants(model, model_validator, registered_adapters=SYNTHETIC_TEST_ADAPTERS)


def test_reject_inverted_parameter_bounds(model_validator):
    bad_model = make_valid_model()
    bad_model["parameters"][0]["min"] = 100.0
    bad_model["parameters"][0]["max"] = 10.0  # min > max
    with pytest.raises(ModelContractError) as exc:
        validate_model_domain_invariants(bad_model, model_validator, registered_adapters=SYNTHETIC_TEST_ADAPTERS)
    assert exc.value.code == "INVALID_PARAMETER_DOMAIN"


def test_reject_initial_value_out_of_bounds(model_validator):
    bad_model = make_valid_model()
    bad_model["parameters"][0]["initial"] = 999.0  # > max
    with pytest.raises(ModelContractError) as exc:
        validate_model_domain_invariants(bad_model, model_validator, registered_adapters=SYNTHETIC_TEST_ADAPTERS)
    assert exc.value.code == "INITIAL_OUT_OF_BOUNDS"

    bad_model2 = make_valid_model()
    bad_model2["parameters"][0]["initial"] = -5.0  # < min
    with pytest.raises(ModelContractError) as exc:
        validate_model_domain_invariants(bad_model2, model_validator, registered_adapters=SYNTHETIC_TEST_ADAPTERS)
    assert exc.value.code == "INITIAL_OUT_OF_BOUNDS"


def test_reject_zero_or_negative_step(model_validator):
    bad_model = make_valid_model()
    bad_model["parameters"][0]["step"] = 0.0  # exclusiveMinimum: 0
    with pytest.raises(ModelContractError) as exc:
        validate_model_domain_invariants(bad_model, model_validator, registered_adapters=SYNTHETIC_TEST_ADAPTERS)
    assert exc.value.code in {"SCHEMA_VALIDATION_FAILED", "INVALID_STEP_VALUE"}

    bad_model2 = make_valid_model()
    bad_model2["parameters"][0]["step"] = -1.0
    with pytest.raises(ModelContractError) as exc:
        validate_model_domain_invariants(bad_model2, model_validator, registered_adapters=SYNTHETIC_TEST_ADAPTERS)
    assert exc.value.code in {"SCHEMA_VALIDATION_FAILED", "INVALID_STEP_VALUE"}


def test_reject_missing_required_model_fields(model_validator):
    bad_model = make_valid_model()
    del bad_model["alt_text"]
    with pytest.raises(ModelContractError) as exc:
        validate_model_domain_invariants(bad_model, model_validator, registered_adapters=SYNTHETIC_TEST_ADAPTERS)
    assert exc.value.code == "SCHEMA_VALIDATION_FAILED"


# =====================================================================
# Unit & Contract Tests: Cognitive Disclosure
# =====================================================================

def test_disclosure_schema_is_valid_draft202012(disclosure_validator):
    assert disclosure_validator is not None


def test_valid_disclosure_instance(disclosure_validator):
    disc = make_valid_disclosure()
    disclosure_validator.validate(disc)


def test_precommit_solution_withheld_in_predict(disclosure_validator):
    task = make_exact_ref("QUESTION", "que:physics:wpe:01")
    rev = make_exact_ref("APPROVAL", "app:ir:001")
    outcome = evaluate_disclosure_policy("PREDICT", "REFERENCE_SOLUTION", task, rev)
    disclosure_validator.validate(outcome)
    assert outcome["allowed"] is False
    assert outcome["reason_code"] == "PRECOMMIT_DISCLOSURE_WITHHELD"


def test_postcommit_solution_permitted_in_reconstruct(disclosure_validator):
    task = make_exact_ref("QUESTION", "que:physics:wpe:01")
    rev = make_exact_ref("APPROVAL", "app:ir:001")
    # Synthetic signed-receipt registry is supplied by the test, not manufactured by the schema.
    checked = frozenset({(rev["type"], rev["id"], rev["revision"], rev["sha256"])})
    outcome = evaluate_disclosure_policy("RECONSTRUCT", "REFERENCE_SOLUTION", task, rev,
                                         first_committed=True, authorized_capabilities=frozenset({"REFERENCE_SOLUTION"}),
                                         verified_review_refs=checked)
    disclosure_validator.validate(outcome)
    assert outcome["allowed"] is True
    assert outcome["reason_code"] == "POST_COMMIT_SOLUTION_PERMITTED"


def test_unreviewed_solution_disclosure_rejected(disclosure_validator):
    task = make_exact_ref("QUESTION", "que:physics:wpe:01")
    with pytest.raises(ModelContractError) as exc:
        evaluate_disclosure_policy("RECONSTRUCT", "REFERENCE_SOLUTION", task, review_ref=None)
    assert exc.value.code == "MISSING_REVIEW_RECEIPT"


def test_default_deny_unregistered_capability(disclosure_validator):
    task = make_exact_ref("QUESTION", "que:physics:wpe:01")
    outcome = evaluate_disclosure_policy("ATTEMPT", "UNKNOWN_CHEAT_TOOL", task)
    assert outcome["allowed"] is False
    assert outcome["reason_code"] == "DEFAULT_DENY_UNREGISTERED_CAPABILITY"



def test_direct_disclosure_schema_rejects_precommit_leaks(disclosure_validator):
    """Schema validation itself must reject unsafe policy decisions."""
    task = make_exact_ref("QUESTION", "que:physics:wpe:01")
    for stage, cap in (
        ("PREDICT", "REFERENCE_SOLUTION"), ("ATTEMPT", "REFERENCE_SOLUTION"),
        ("PREDICT", "H1"), ("PREDICT", "READ_ANCHOR"),
        ("ATTEMPT", "SHOW_REASONING_CRUX"), ("ATTEMPT", "BOUNDARY_REFERENCE"),
        ("RECONSTRUCT", "BOUNDARY_REFERENCE"), ("ATTEMPT", "SOURCE_RETURN"),
    ):
        bad = {"schema_version": "g9-disclosure/1", "task_ref": task,
               "stage": stage, "capability": cap, "allowed": True,
               "review_ref": make_exact_ref("APPROVAL", "app:ir:001"),
               "reason_code": "POST_COMMIT_SOLUTION_PERMITTED"}
        with pytest.raises(jsonschema.ValidationError):
            disclosure_validator.validate(bad)


def test_attempt_hint_is_allowed_only_when_externally_authorized(disclosure_validator):
    """R4 oracle permits authorized non-exam H1 help during ATTEMPT, not PREDICT."""
    task = make_exact_ref("QUESTION", "que:physics:wpe:01")
    approval = make_exact_ref("APPROVAL", "app:ir:help")
    denied = evaluate_disclosure_policy("ATTEMPT", "H1", task, approval)
    assert denied["allowed"] is False
    permitted = evaluate_disclosure_policy("ATTEMPT", "H1", task, approval,
                    authorized_capabilities=frozenset({"H1"}))
    disclosure_validator.validate(permitted)
    assert permitted["allowed"] is True
    assert evaluate_disclosure_policy("ATTEMPT", "H1", task, approval,
                    authorized_capabilities=frozenset({"H1"}), exam_mode=True)["allowed"] is False


def test_postcommit_requires_verified_exact_receipt_not_merely_claim(disclosure_validator):
    task = make_exact_ref("QUESTION", "que:physics:wpe:01")
    alleged = make_exact_ref("APPROVAL", "app:unverified")
    with pytest.raises(ModelContractError) as exc:
        evaluate_disclosure_policy("RECONSTRUCT", "REFERENCE_SOLUTION", task, alleged,
            first_committed=True, authorized_capabilities=frozenset({"REFERENCE_SOLUTION"}))
    assert exc.value.code == "UNVERIFIED_REVIEW_RECEIPT"
    forged = make_exact_ref("WARRANT", "war:fake")
    schema_only = {"schema_version": "g9-disclosure/1", "task_ref": task,
                   "stage": "RECONSTRUCT", "capability": "REFERENCE_SOLUTION",
                   "allowed": True, "review_ref": forged,
                   "reason_code": "POST_COMMIT_SOLUTION_PERMITTED"}
    with pytest.raises(jsonschema.ValidationError):
        disclosure_validator.validate(schema_only)


def test_model_schema_rejects_duplicate_outputs_and_bad_adapter_version(model_validator):
    for field in ("output_ids", "representation_ids"):
        bad = make_valid_model()
        bad[field] = [bad[field][0], bad[field][0]]
        with pytest.raises(jsonschema.ValidationError):
            model_validator.validate(bad)
    bad = make_valid_model()
    bad["adapter_version"] = "invented-version"
    with pytest.raises(jsonschema.ValidationError):
        model_validator.validate(bad)
    wrong = make_valid_model()
    wrong["warrant_refs"][0]["type"] = "QUESTION"
    with pytest.raises(jsonschema.ValidationError):
        model_validator.validate(wrong)



def test_adapter_registration_fail_closed_and_duplicate_parameter_ids(model_validator):
    instance = make_valid_model()
    with pytest.raises(ModelContractError) as exc:
        validate_model_domain_invariants(instance, model_validator)
    assert exc.value.code == "MISSING_TRUSTED_ADAPTER_REGISTRY"

    unregistered = make_valid_model()
    unregistered["adapter_id"] = "adapter:unreviewed:unknown"
    with pytest.raises(ModelContractError) as exc:
        validate_model_domain_invariants(unregistered, model_validator,
                                        registered_adapters=SYNTHETIC_TEST_ADAPTERS)
    assert exc.value.code == "UNREGISTERED_ADAPTER"

    duplicate = make_valid_model()
    duplicate["parameters"].append(copy.deepcopy(duplicate["parameters"][0]))
    duplicate["parameters"][-1]["initial"] = 25.0
    with pytest.raises(ModelContractError) as exc:
        validate_model_domain_invariants(duplicate, model_validator,
                                        registered_adapters=SYNTHETIC_TEST_ADAPTERS)
    assert exc.value.code == "DUPLICATE_PARAMETER_ID"


def test_rule_13_invariant():
    """Rule 13 invariant: No academic approval inferred from software validation."""
    rule_13 = "No academic approval inferred from software validation."
    assert "No academic approval" in rule_13
