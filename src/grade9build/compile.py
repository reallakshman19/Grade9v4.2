"""Release projection compiler for deterministic synthetic demo builds."""
from __future__ import annotations

import copy
import hashlib
import json
from typing import Any, Dict, Iterable, List, Optional, Set

from .graph import ObjectGraphValidator
from .record_inventory import canonical_json_digest


class ReleaseCompilationError(Exception):
    """Raised when release compilation fails due to invariant violations or security gates."""
    pass


HELP_CAPABILITIES = {"H1", "H2", "H3"}


def is_capability_visible(
    stage: str,
    capability: str,
    first_committed: bool = False,
    boundary_committed: bool = False,
    allowed_capabilities: Iterable[str] = (),
    is_exam: bool = False,
) -> bool:
    """Stage-gated capability and disclosure visibility rules conforming to R3/R4 contracts."""
    allowed = set(allowed_capabilities)

    # Basic interaction is always visible unless exam mode blocks specific features
    if capability in {"VIEW_STIMULUS", "EDIT_WORK"}:
        return True

    # Exam mode strictly disables all hints, disclosures, and reference solutions before submission
    if is_exam:
        return False

    if capability == "REFERENCE_SOLUTION":
        return (
            capability in allowed
            and first_committed
            and stage in {"RECONSTRUCT", "DIAGNOSE", "REPAIR", "BOUNDARY_TEST", "COMPLETE"}
        )

    if capability == "BOUNDARY_REFERENCE":
        return (
            capability in allowed
            and boundary_committed
            and stage in {"BOUNDARY_TEST", "COMPLETE"}
        )

    if capability == "SOURCE_RETURN":
        return stage == "COMPLETE" and capability in allowed

    if capability == "SHOW_REASONING_CRUX":
        return (
            first_committed
            and stage in {"RECONSTRUCT", "DIAGNOSE", "REPAIR", "BOUNDARY_TEST", "COMPLETE"}
            and capability in allowed
        )

    # Progressive scaffolds / hints are only visible in ATTEMPT stage before first commit
    return stage == "ATTEMPT" and capability in HELP_CAPABILITIES and capability in allowed


class ReleaseProjectionCompiler:
    """Deterministic release compiler generating public-safe demo projections."""

    def __init__(self, target_mode: str = "DEMO") -> None:
        if target_mode != "DEMO":
            raise ReleaseCompilationError(
                f"Production release compilation is strictly prohibited (target_mode: {target_mode}). Only DEMO is permitted."
            )
        self.target_mode = target_mode

    def compile_release(
        self,
        graph: List[Dict[str, Any]],
        release_id: str = "RELEASE-DEMO-01",
        available_assets: Optional[Set[str]] = None,
    ) -> Dict[str, Any]:
        """Compile a platform object graph into a closed, deterministic release projection."""
        if not graph:
            raise ReleaseCompilationError("Cannot compile an empty graph")

        if available_assets is None:
            available_assets = set()

        # 1. Reject any candidate item with status HOLD (N08)
        for obj in graph:
            obj_id = obj.get("id", "unknown")
            if obj.get("status") == "HOLD":
                raise ReleaseCompilationError(
                    f"Cannot compile release: object '{obj_id}' has status HOLD (N08)"
                )
            if obj.get("academic_admission") == "HOLD" and obj.get("status") not in {"SYNTHETIC", "ACCEPTED"}:
                raise ReleaseCompilationError(
                    f"Cannot compile release: object '{obj_id}' has unadmitted status HOLD (N08)"
                )

        # 2. Referential integrity and cryptographic closure validation
        obj_map: Dict[str, Dict[str, Any]] = {o["id"]: o for o in graph}
        if len(obj_map) != len(graph):
            raise ReleaseCompilationError("Duplicate object IDs detected in release graph")

        for obj in graph:
            obj_id = obj["id"]
            deps = obj.get("dependencies", [])
            for dep in deps:
                dep_id = dep["id"]
                if dep_id not in obj_map:
                    raise ReleaseCompilationError(
                        f"Dangling reference: object '{obj_id}' references missing dependency '{dep_id}'"
                    )
                target_obj = obj_map[dep_id]
                if dep.get("type") and dep["type"] != target_obj.get("type"):
                    raise ReleaseCompilationError(
                        f"Type mismatch: dependency '{dep_id}' expected type '{dep.get('type')}', got '{target_obj.get('type')}'"
                    )
                # Digest verification (N05)
                expected_sha = dep.get("sha256")
                if expected_sha:
                    actual_sha = canonical_json_digest(target_obj)
                    if actual_sha != expected_sha:
                        raise ReleaseCompilationError(
                            f"Stale dependency digest: dependency '{dep_id}' referenced by '{obj_id}' has sha256 '{actual_sha}', expected '{expected_sha}' (N05)"
                        )

            # Asset references verification (N07)
            asset_claims = obj.get("asset_claims", [])
            for asset in asset_claims:
                asset_id = asset.get("asset_id") or asset.get("id")
                is_mandatory = bool(asset.get("mandatory", False))
                is_present = (
                    asset_id in available_assets
                    or asset.get("digest") is not None
                    or asset.get("content_sha256") is not None
                    or asset.get("classification") == "PRESENT"
                )
                if is_mandatory and not is_present:
                    raise ReleaseCompilationError(
                        f"Missing mandatory asset: object '{obj_id}' references missing mandatory asset '{asset_id}' (N07)"
                    )

        # 3. Cycle verification via ObjectGraphValidator
        validator = ObjectGraphValidator(demo_mode=True)
        validator.validate_graph(graph)

        # 4. Generate view-specific, stage-gated projections
        precommit_views: List[Dict[str, Any]] = []
        postcommit_views: List[Dict[str, Any]] = []
        search_entries: List[Dict[str, Any]] = []
        assessment_contracts: List[Dict[str, Any]] = []

        for obj in sorted(graph, key=lambda x: str(x.get("id", ""))):
            obj_type = obj.get("type")
            obj_id = obj.get("id", "")
            payload = copy.deepcopy(obj.get("payload", {}))

            # Filter Precommit View (NO answers, NO solutions, NO hints)
            if obj_type in {"QUESTION", "FRESH_TASK"}:
                precommit_item = {
                    "id": obj_id,
                    "type": obj_type,
                    "revision": obj.get("revision", 1),
                    "stem": payload.get("stem"),
                    "options": [
                        {"id": opt.get("id"), "text": opt.get("text")}
                        if isinstance(opt, dict) else str(opt)
                        for opt in payload.get("options", [])
                    ],
                    "asset_refs": [a.get("asset_id") or a.get("id") for a in obj.get("asset_claims", [])],
                }
                precommit_views.append(precommit_item)

            # Postcommit View (discloses reference solution, worked steps, and crux)
            if obj_type in {"SOLUTION", "CONSTRUCTION"}:
                postcommit_views.append({
                    "id": obj_id,
                    "type": obj_type,
                    "revision": obj.get("revision", 1),
                    "solution_text": payload.get("text") or payload.get("worked_steps"),
                    "crux": payload.get("crux"),
                })

            # Search Index Projection (Public-safe, no answer leak - N09)
            if obj_type in {"QUESTION", "LESSON", "CONCEPT"}:
                search_entry = {
                    "id": obj_id,
                    "revision": obj.get("revision", 1),
                    "releaseId": release_id,
                    "route": f"/{obj_type.lower()}/{obj_id}",
                    "kind": obj_type,
                    "title": payload.get("title") or payload.get("stem", "")[:60] or obj_id,
                    "summary": payload.get("summary") or "Synthetic curriculum component",
                    "reviewed_terms": payload.get("reviewed_terms", [obj_type.lower()]),
                    "public_facets": {
                        "type": obj_type,
                        "subject": obj.get("subject_id", "PHYSICS"),
                        "demo": True,
                    },
                }
                search_entries.append(search_entry)

            # Assessment evaluation contracts
            if obj_type in {"RUBRIC", "EVALUATOR_POLICY"}:
                assessment_contracts.append({
                    "id": obj_id,
                    "type": obj_type,
                    "payload": payload,
                })

        # 5. Assemble closed release package
        release_projection = {
            "schema_version": "g9-release-projection/1.0",
            "release_id": release_id,
            "target_mode": "DEMO",
            "demo_banner": True,
            "academic_admission": "HOLD",
            "production_release": "NONE",
            "compiled_at": "2026-11-17T00:00:00Z",
            "total_objects": len(graph),
            "projections": {
                "learner_precommit": precommit_views,
                "learner_postcommit": postcommit_views,
                "search_index": search_entries,
                "assessment_contracts": assessment_contracts,
            },
            "visibility_matrix": {
                "predict_stage_allowed": ["VIEW_STIMULUS", "EDIT_WORK"],
                "attempt_stage_allowed": ["VIEW_STIMULUS", "EDIT_WORK", "H1", "H2", "H3"],
                "reconstruct_stage_allowed": ["VIEW_STIMULUS", "EDIT_WORK", "REFERENCE_SOLUTION", "SHOW_REASONING_CRUX"],
                "boundary_stage_allowed": ["VIEW_STIMULUS", "EDIT_WORK", "REFERENCE_SOLUTION", "BOUNDARY_REFERENCE"],
                "complete_stage_allowed": ["VIEW_STIMULUS", "REFERENCE_SOLUTION", "BOUNDARY_REFERENCE", "SOURCE_RETURN"],
            },
        }

        # Compute deterministic canonical digest of release package
        raw_bytes = json.dumps(release_projection, sort_keys=True, separators=(",", ":")).encode("utf-8")
        release_projection["release_digest"] = hashlib.sha256(raw_bytes).hexdigest()

        return release_projection
