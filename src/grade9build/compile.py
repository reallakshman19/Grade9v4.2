"""Deterministic synthetic demo compiler. No production or runtime authority.

The public artifact is deliberately separate from operator-only answer material.
Static browser code cannot protect any answer bytes that have already been shipped.
Only the two exact, immutable R4 demo graphs are admitted by this compiler.
"""
from __future__ import annotations

import copy
import re
from typing import Any, Iterable

from .graph import ObjectGraphValidator, GraphValidationError, compute_object_digest


class ReleaseCompilationError(ValueError):
    """Fail-closed demo compilation error; never include private payload bytes."""


# Canonical SHA-256 of full graph sorted by object ID, using graph.py canonical bytes.
# These are fixture identities, not signed approval receipts. Adding new fixtures needs
# a separate reviewed code change; the input cannot supply its own trust policy.
DEMO_GRAPHS = {
    "eb0a02d04fb43c6f23b634d3fd2367972272c3a364b69de9c6e8f20fbb64e61f": (
        "R4-GRAPH", ("demo:q:001", "demo:f:001")),
    "e1c080193ee471b479b447cd99168fd8acddc66c2777fccfd07a2caef70ca152": (
        "R4-WPE-SPRING", ("demo:wpe:source", "demo:wpe:fresh")),
}
STAGES = ("PREDICT", "ATTEMPT", "RECONSTRUCT", "DIAGNOSE", "REPAIR", "BOUNDARY_TEST", "COMPLETE")
HELP_CAPABILITIES = frozenset({"H1", "H2", "H3", "MODEL_MANIPULATE", "MODEL_AUTO_CALCULATE", "READ_ANCHOR"})
POST_FIRST = frozenset(STAGES[2:])
CAPABILITIES = ("VIEW_STIMULUS", "EDIT_WORK", "MODEL_MANIPULATE", "MODEL_AUTO_CALCULATE", "H1", "H2", "H3", "REFERENCE_SOLUTION", "BOUNDARY_REFERENCE", "SOURCE_RETURN", "READ_ANCHOR", "SHOW_REASONING_CRUX")


def is_capability_visible(stage: str, capability: str, first_committed: bool = False,
                          boundary_committed: bool = False, allowed_capabilities: Iterable[str] = (),
                          is_exam: bool = False) -> bool:
    """Pure stage constraint, NOT a disclosure authorization or persistence check.

    The caller must supply a verified scoped policy/checkpoint. This function is
    never used to put protected bytes into a public static artifact.
    """
    if stage not in STAGES or capability not in CAPABILITIES:
        return False
    if any(type(x) is not bool for x in (first_committed, boundary_committed, is_exam)):
        return False
    if stage in ("PREDICT", "ATTEMPT") and first_committed:
        return False
    if boundary_committed and (not first_committed or stage not in ("BOUNDARY_TEST", "COMPLETE")):
        return False
    if stage in POST_FIRST and not first_committed:
        return False
    if stage == "COMPLETE" and not boundary_committed:
        return False
    if capability == "VIEW_STIMULUS":
        return True
    if capability == "EDIT_WORK":
        return stage != "COMPLETE"
    if is_exam or capability not in allowed_capabilities:
        return False
    if capability in HELP_CAPABILITIES:
        return stage == "ATTEMPT" and not first_committed
    if capability in ("REFERENCE_SOLUTION", "SHOW_REASONING_CRUX"):
        return first_committed and stage in POST_FIRST
    if capability == "BOUNDARY_REFERENCE":
        return boundary_committed and stage in ("BOUNDARY_TEST", "COMPLETE")
    if capability == "SOURCE_RETURN":
        return stage == "COMPLETE" and boundary_committed
    return False


def _ref(obj):
    return {"type": obj["type"], "id": obj["id"], "revision": obj["revision"],
            "sha256": compute_object_digest(obj)}


def _digest_package(package):
    return {**package, "release_digest": compute_object_digest(package)}


def _validated_graph(graph, available_assets):
    if type(graph) is not list or not graph or any(type(o) is not dict for o in graph):
        raise ReleaseCompilationError("INVALID_GRAPH")
    # Asset names or claimed digests are not verified bytes. No external asset
    # ingestion is implemented in this bounded demo compiler.
    if available_assets is not None and available_assets:
        raise ReleaseCompilationError("EXTERNAL_ASSETS_NOT_SUPPORTED")
    for o in graph:
        if o.get("status") != "SYNTHETIC":
            raise ReleaseCompilationError("NON_SYNTHETIC_OR_HOLD")
        if o.get("asset_claims"):
            raise ReleaseCompilationError("UNVERIFIED_ASSET_CLAIM")
        if o.get("source_lineage_refs") or o.get("type") in {"SOURCE", "OCCURRENCE", "APPROVAL", "RELEASE"}:
            raise ReleaseCompilationError("SOURCE_OR_AUTHORITY_OBJECT_NOT_PERMITTED")
    try:
        # Run the authoritative graph validator before consulting the fixture pin.
        # A malformed or stale dependency cannot be accepted merely by relabeling.
        if any(type(o.get("id")) is not str for o in graph):
            raise ReleaseCompilationError("INVALID_ID")
        if len({o["id"] for o in graph}) != len(graph):
            raise ReleaseCompilationError("DUPLICATE_ID")
        objects = sorted(copy.deepcopy(graph), key=lambda o: o["id"])
        ObjectGraphValidator(demo_mode=True).validate_graph(objects)
        digest = compute_object_digest(objects)
    except ReleaseCompilationError:
        raise
    except (GraphValidationError, ValueError, TypeError, KeyError, RecursionError) as exc:
        # Avoid forwarding the graph validator's exception text (which can include raw data).
        raise ReleaseCompilationError("INVALID_GRAPH_CLOSURE") from None
    if digest not in DEMO_GRAPHS:
        raise ReleaseCompilationError("UNPINNED_SYNTHETIC_GRAPH")
    return objects, digest


def _initial_view(obj):
    payload = obj["payload"]
    # Only explicitly reviewed fixture IDs reach here. Do not forward arbitrary
    # nested objects or author-only metadata. Exact refs are of public tasks only.
    view = {**_ref(obj), "stem": payload["stem"], "subject_id": obj["subject_id"],
            "demo": True, "asset_refs": []}
    if "response_kind" in payload:
        view["response_kind"] = payload["response_kind"]
    if "options" in payload:
        view["options"] = [{"id": x["id"], "text": x["text"]} for x in payload["options"]]
    if "fields" in payload:
        view["fields"] = [{k: x[k] for k in ("id", "kind", "required", "prompt")} for x in payload["fields"]]
    if "prediction_prompt" in payload:
        view["prediction_prompt"] = payload["prediction_prompt"]
    return view


class ReleaseProjectionCompiler:
    """Generate in-memory artifacts only; never writes or deploys a release."""

    def __init__(self, target_mode: str = "DEMO") -> None:
        if target_mode != "DEMO":
            raise ReleaseCompilationError("PRODUCTION_TARGET_PROHIBITED")

    def compile_release(self, graph: list[dict[str, Any]], release_id: str = "RELEASE-DEMO-01",
                        available_assets: set[str] | None = None) -> dict[str, Any]:
        """Public-safe synthetic diagnostic projection, not an actual learner release."""
        if type(release_id) is not str or not re.fullmatch(r"RELEASE-[A-Z0-9-]{1,48}", release_id):
            raise ReleaseCompilationError("INVALID_RELEASE_ID")
        objects, digest = _validated_graph(graph, available_assets)
        name, ids = DEMO_GRAPHS[digest]
        index = {o["id"]: o for o in objects}
        return _digest_package({
            "schema_version": "g9-release-projection/1.1", "release_id": release_id,
            "target_mode": "DEMO", "demo_banner": True, "academic_admission": "HOLD",
            "production_release": "NONE", "ui_freeze": "NOT_GRANTED",
            "artifact_scope": "PUBLIC_SAFE_DIAGNOSTIC_ONLY", "learner_release": False,
            "fixture_id": name, "graph_digest": digest, "total_objects": len(objects),
            "projections": {"learner_precommit": [_initial_view(index[i]) for i in sorted(ids)],
                            "learner_postcommit": [], "search_index": [], "assessment_contracts": []},
            "search_status": "NO_REGISTERED_ELIGIBLE_LEARNER_ROUTES",
            "protected_projection_status": "SEPARATE_OPERATOR_DIAGNOSTIC_ONLY",
            "visibility_policy": {"stages": list(STAGES), "capabilities": list(CAPABILITIES),
                                  "scope": "STAGE_CONSTRAINTS_ONLY_NOT_AUTHORIZATION",
                                  "protected_content_in_static_bundle": False,
                                  "runtime_disclosure_service": "NOT_IMPLEMENTED"},
        })

    def compile_operator_diagnostic(self, graph: list[dict[str, Any]], task_ref: dict[str, Any]) -> dict[str, Any]:
        """Separate private, local-only test oracle for one exact task.

        Not a learner endpoint. Caller is responsible for access-controlled local
        custody; no runtime gate is implemented. Never copy this artifact into dist.
        """
        objects, digest = _validated_graph(graph, None)
        candidates = [o for o in objects if o["type"] in {"QUESTION", "FRESH_TASK"} and _ref(o) == task_ref]
        if len(candidates) != 1:
            raise ReleaseCompilationError("EXACT_TASK_REQUIRED")
        task = candidates[0]
        post = []
        assessments = []
        for o in objects:
            if task_ref not in o["dependencies"]:
                continue
            if o["type"] == "SOLUTION":
                stage = "BOUNDARY_TEST" if o["payload"].get("visibility") == "AFTER_BOUNDARY_COMMIT" else "RECONSTRUCT"
                post.append({"ref": _ref(o), "requires_stage": stage,
                             "requires_durable_commit": "BOUNDARY" if stage == "BOUNDARY_TEST" else "FIRST",
                             "payload": copy.deepcopy(o["payload"])})
            elif o["type"] == "ASSESSMENT" and o["payload"].get("question") == task_ref:
                assessments.append({"ref": _ref(o), "payload": copy.deepcopy(o["payload"])})
        return _digest_package({"schema_version": "g9-private-demo-diagnostic/1.0",
            "artifact_scope": "OPERATOR_ONLY_DO_NOT_PUBLISH", "graph_digest": digest,
            "academic_admission": "HOLD", "production_release": "NONE",
            "runtime_authorization": "NOT_IMPLEMENTED", "task_ref": _ref(task),
            "task": _initial_view(task), "postcommit": post, "assessment_contracts": assessments})
