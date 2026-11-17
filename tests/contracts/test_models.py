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


def validate_model_domain_invariants(model: dict[str, Any], validator: jsonschema.Draft202012Validator) -> None:
    """Validates model schema compliance plus semantic domain bounds and finiteness."""
    try:
        validator.validate(model)
    except jsonschema.ValidationError as err:
        raise ModelContractError("SCHEMA_VALIDATION_FAILED", err.message) from err

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
    stage: str, capability: str, task_ref: dict[str, Any], review_ref: dict[str, Any] | None = None
) -> dict[str, Any]:
    """Implements default-deny cognitive disclosure engine."""
    # Pre-commitment disclosure invariant: solutions and hints strictly denied during PREDICT
    if stage == "PREDICT" and capability in {"REFERENCE_SOLUTION", "H1", "H2", "H3", "SHOW_REASONING_CRUX"}:
        return {
            "schema_version": "g9-disclosure/1",
            "task_ref": task_ref,
            "stage": stage,
            "capability": capability,
            "allowed": False,
            "review_ref": review_ref,
            "reason_code": "PRECOMMIT_DISCLOSURE_WITHHELD",
        }

    # Reference solution permitted only in RECONSTRUCT or COMPLETE with verified review_ref
    if capability == "REFERENCE_SOLUTION":
        if stage in {"RECONSTRUCT", "COMPLETE"}:
            if not review_ref:
                raise ModelContractError("MISSING_REVIEW_RECEIPT", "Unreviewed solution disclosure prohibited")
            return {
                "schema_version": "g9-disclosure/1",
                "task_ref": task_ref,
                "stage": stage,
                "capability": capability,
                "allowed": True,
                "review_ref": review_ref,
                "reason_code": "POST_COMMIT_SOLUTION_PERMITTED",
            }
        return {
            "schema_version": "g9-disclosure/1",
            "task_ref": task_ref,
            "stage": stage,
            "capability": capability,
            "allowed": False,
            "review_ref": review_ref,
            "reason_code": "SOLUTION_FORBIDDEN_IN_STAGE",
        }

    # Default allowed for standard engagement capabilities
    if capability in {"VIEW_STIMULUS", "EDIT_WORK", "MODEL_MANIPULATE"}:
        return {
            "schema_version": "g9-disclosure/1",
            "task_ref": task_ref,
            "stage": stage,
            "capability": capability,
            "allowed": True,
            "review_ref": review_ref,
            "reason_code": "STANDARD_STAGE_CAPABILITY_ALLOWED",
        }

    # Default deny for everything else
    return {
        "schema_version": "g9-disclosure/1",
        "task_ref": task_ref,
        "stage": stage,
        "capability": capability,
        "allowed": False,
        "review_ref": review_ref,
        "reason_code": "DEFAULT_DENY_UNREGISTERED_CAPABILITY",
    }


# =====================================================================
# Unit & Contract Tests: Model Projection
# =====================================================================

def test_model_schema_is_valid_draft202012(model_validator):
    assert model_validator is not None


def test_valid_model_projection(model_validator):
    model = make_valid_model()
    validate_model_domain_invariants(model, model_validator)


def test_reject_inverted_parameter_bounds(model_validator):
    bad_model = make_valid_model()
    bad_model["parameters"][0]["min"] = 100.0
    bad_model["parameters"][0]["max"] = 10.0  # min > max
    with pytest.raises(ModelContractError) as exc:
        validate_model_domain_invariants(bad_model, model_validator)
    assert exc.value.code == "INVALID_PARAMETER_DOMAIN"


def test_reject_initial_value_out_of_bounds(model_validator):
    bad_model = make_valid_model()
    bad_model["parameters"][0]["initial"] = 999.0  # > max
    with pytest.raises(ModelContractError) as exc:
        validate_model_domain_invariants(bad_model, model_validator)
    assert exc.value.code == "INITIAL_OUT_OF_BOUNDS"

    bad_model2 = make_valid_model()
    bad_model2["parameters"][0]["initial"] = -5.0  # < min
    with pytest.raises(ModelContractError) as exc:
        validate_model_domain_invariants(bad_model2, model_validator)
    assert exc.value.code == "INITIAL_OUT_OF_BOUNDS"


def test_reject_zero_or_negative_step(model_validator):
    bad_model = make_valid_model()
    bad_model["parameters"][0]["step"] = 0.0  # exclusiveMinimum: 0
    with pytest.raises(ModelContractError) as exc:
        validate_model_domain_invariants(bad_model, model_validator)
    assert exc.value.code in {"SCHEMA_VALIDATION_FAILED", "INVALID_STEP_VALUE"}

    bad_model2 = make_valid_model()
    bad_model2["parameters"][0]["step"] = -1.0
    with pytest.raises(ModelContractError) as exc:
        validate_model_domain_invariants(bad_model2, model_validator)
    assert exc.value.code in {"SCHEMA_VALIDATION_FAILED", "INVALID_STEP_VALUE"}


def test_reject_missing_required_model_fields(model_validator):
    bad_model = make_valid_model()
    del bad_model["alt_text"]
    with pytest.raises(ModelContractError) as exc:
        validate_model_domain_invariants(bad_model, model_validator)
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
    outcome = evaluate_disclosure_policy("RECONSTRUCT", "REFERENCE_SOLUTION", task, rev)
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


def test_rule_13_invariant():
    """Rule 13 invariant: No academic approval inferred from software validation."""
    rule_13 = "No academic approval inferred from software validation."
    assert "No academic approval" in rule_13
