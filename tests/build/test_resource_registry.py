"""Acceptance tests for Resource Registry and Eligibility Projection Compiler (Workpack A62).

Validates:
1. Deterministic byte-identical build and canonical digest generation.
2. Rejection of HOLD status in rights, academic, and release governance (N08).
3. Rejection of owner/lab/internal audience and internal tool kinds.
4. Rejection of raw unisolated apps, PRESERVED integration, and restricted paths.
5. Rejection of stale topic, capability, or origin references.
6. Preservation of legacy aliases and six-core / explorer roles.
7. Route resolution for canonical IDs, entrypoints, and historical aliases.
8. Route collision detection.
9. Public-safe search metadata sanitization (no solutions, master keys, or rubrics).
10. Strict DEMO target mode enforcement (production mode rejection).
11. Conformance to runtime service contracts (resolve, eligible_for_role).
"""
from __future__ import annotations

import copy
import json
from pathlib import Path
from typing import Any, Dict

import pytest

from grade9build.resource_registry import (
    ResourceEligibilityError,
    ResourceProjectionCompiler,
    ResourceRegistry,
    ResourceRegistryError,
    RouteResolutionError,
    StaleReferenceError,
    compile_resource_projection,
    is_learner_routable,
)

ROOT = Path(__file__).resolve().parents[2]


def make_valid_resource(res_id: str = "res:physics:motion:kin-2d", **overrides: Any) -> Dict[str, Any]:
    """Helper creating a fully valid, learner-eligible resource projection."""
    data = {
        "schema_version": "g9-resource-projection/1",
        "resource_id": res_id,
        "revision": 1,
        "kind": "STRUCTURED_PRODUCT",
        "audience": "LEARNER",
        "title": "Two-Body Kinematics Simulation",
        "aliases": [f"act:{res_id.split(':')[-1]}", f"public/physics/{res_id.split(':')[-1]}.html"],
        "subject_id": "PHYSICS",
        "topic_refs": ["topic:kinematics:2d"],
        "capability_refs": ["cap:motion:relative-velocity"],
        "core_roles": ["CORE1A", "CORE1B", "EXPLORER"],
        "origins": [
            {
                "snapshot_id": "snap-v35-release",
                "commit": "0123456789abcdef0123456789abcdef01234567",
                "path": f"public/physics/{res_id.split(':')[-1]}/index.html",
                "sha256": "9a963c9977ef1d2e7b9aeee90a8524e36b611a78f80da11c1b6036d5bcddb97c",
            }
        ],
        "entrypoint": f"public/physics/{res_id.split(':')[-1]}/index.html",
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
    data.update(overrides)
    return data


# =====================================================================
# Tests: Deterministic Build & Digest
# =====================================================================

def test_deterministic_resource_compilation():
    """Compiling the same resource collection twice produces byte-identical output and digests."""
    res1 = make_valid_resource("res:physics:motion:a")
    res2 = make_valid_resource("res:physics:motion:b", aliases=["legacy/b.html"])

    compiler = ResourceProjectionCompiler(target_mode="DEMO")
    proj1 = compiler.compile([res2, res1])
    proj2 = compiler.compile([res1, res2])

    assert proj1 == proj2
    assert proj1["registry_digest"] == proj2["registry_digest"]

    # Verify JSON byte-identity
    b1 = json.dumps(proj1, sort_keys=True, separators=(",", ":")).encode("utf-8")
    b2 = json.dumps(proj2, sort_keys=True, separators=(",", ":")).encode("utf-8")
    assert b1 == b2


def test_production_target_mode_rejection():
    """Attempting to compile with target_mode other than DEMO must be rejected."""
    with pytest.raises(ResourceEligibilityError, match="Production release compilation is strictly prohibited"):
        ResourceProjectionCompiler(target_mode="PRODUCTION")

    with pytest.raises(ResourceEligibilityError, match="Production release compilation is strictly prohibited"):
        compile_resource_projection([make_valid_resource()], target_mode="PRODUCTION")


# =====================================================================
# Tests: Rejection of Ineligible Governance (HOLD, UNTESTED, Missing Receipts)
# =====================================================================

def test_reject_hold_in_rights_governance():
    """Resource with rights status HOLD is rejected from compilation."""
    res = make_valid_resource()
    res["governance"]["rights"] = "HOLD"
    res["search_visibility"] = "EXCLUDED"  # To satisfy schema allOf

    compiler = ResourceProjectionCompiler(target_mode="DEMO")
    with pytest.raises(ResourceEligibilityError, match="governance rights are HOLD"):
        compiler.compile([res])


def test_reject_hold_in_academic_governance():
    """Resource with academic status HOLD is rejected from compilation."""
    res = make_valid_resource()
    res["governance"]["academic"] = "HOLD"
    res["search_visibility"] = "EXCLUDED"

    compiler = ResourceProjectionCompiler(target_mode="DEMO")
    with pytest.raises(ResourceEligibilityError, match="academic admission is HOLD"):
        compiler.compile([res])


def test_reject_hold_in_release_governance():
    """Resource with release status HOLD is rejected from compilation."""
    res = make_valid_resource()
    res["governance"]["release"] = "HOLD"
    res["search_visibility"] = "EXCLUDED"

    compiler = ResourceProjectionCompiler(target_mode="DEMO")
    with pytest.raises(ResourceEligibilityError, match="release status is HOLD"):
        compiler.compile([res])


def test_reject_untested_or_failed_technical_status():
    """Resource with technical status UNTESTED or FAIL is rejected."""
    for bad_status in ("UNTESTED", "FAIL"):
        res = make_valid_resource()
        res["governance"]["technical"] = bad_status
        res["search_visibility"] = "EXCLUDED"

        compiler = ResourceProjectionCompiler(target_mode="DEMO")
        with pytest.raises(ResourceEligibilityError, match=f"technical status is {bad_status}"):
            compiler.compile([res])


def test_reject_missing_receipt_references():
    """Resource with empty receipt_refs is rejected."""
    res = make_valid_resource()
    res["governance"]["receipt_refs"] = []
    res["search_visibility"] = "EXCLUDED"

    compiler = ResourceProjectionCompiler(target_mode="DEMO")
    with pytest.raises(ResourceEligibilityError, match="no verified receipt references"):
        compiler.compile([res])


# =====================================================================
# Tests: Rejection of Owner/Lab/Internal Audiences and Internal Kinds
# =====================================================================

@pytest.mark.parametrize("bad_audience", ["OWNER", "LAB", "INTERNAL"])
def test_reject_owner_and_internal_audience(bad_audience: str):
    """Resources tagged for owner, lab, or internal audience are rejected from learner projection."""
    res = make_valid_resource()
    res["audience"] = bad_audience
    res["search_visibility"] = "EXCLUDED"

    compiler = ResourceProjectionCompiler(target_mode="DEMO")
    with pytest.raises(ResourceEligibilityError, match=f"has non-learner audience '{bad_audience}'"):
        compiler.compile([res])


@pytest.mark.parametrize("internal_kind", ["OWNER_TOOL", "RUNTIME_HOST"])
def test_reject_owner_tool_and_runtime_host(internal_kind: str):
    """Owner tools and runtime hosts are rejected from learner projection."""
    res = make_valid_resource()
    res["audience"] = "INTERNAL"
    res["kind"] = internal_kind
    res["search_visibility"] = "EXCLUDED"

    compiler = ResourceProjectionCompiler(target_mode="DEMO")
    with pytest.raises(ResourceEligibilityError):
        compiler.compile([res])


# =====================================================================
# Tests: Synthetic Target Integration & Restricted Path Rules
# =====================================================================

def test_reject_preserved_integration_in_synthetic_target():
    """Integration PRESERVED is restricted to private custody and rejected from synthetic learner targets."""
    res = make_valid_resource()
    res["integration"] = "PRESERVED"

    compiler = ResourceProjectionCompiler(target_mode="DEMO")
    with pytest.raises(ResourceEligibilityError, match="integration mode PRESERVED cannot be mounted"):
        compiler.compile([res])


@pytest.mark.parametrize(
    "restricted_path",
    [
        "custody/Grade9v3.5/raw.html",
        "restricted/keys/signing.key",
        "private/tools/debug.html",
        ".git/HEAD",
        "secrets/token.json",
    ],
)
def test_reject_restricted_source_paths(restricted_path: str):
    """Entrypoints referencing custody, restricted, private, or secrets are rejected."""
    res = make_valid_resource()
    res["entrypoint"] = restricted_path

    compiler = ResourceProjectionCompiler(target_mode="DEMO")
    with pytest.raises(ResourceEligibilityError, match="references restricted path"):
        compiler.compile([res])


def test_reject_unsafe_path_traversal():
    """Entrypoint containing path traversal (..) or leading / is rejected."""
    res = make_valid_resource()
    res["entrypoint"] = "public/../../../escaped.html"

    compiler = ResourceProjectionCompiler(target_mode="DEMO")
    with pytest.raises(ResourceEligibilityError):
        compiler.compile([res])


# =====================================================================
# Tests: Stale References & Referential Integrity
# =====================================================================

def test_reject_stale_topic_reference():
    """Referencing a topic not in known_topics raises StaleReferenceError."""
    res = make_valid_resource()
    res["topic_refs"] = ["topic:kinematics:unregistered"]

    compiler = ResourceProjectionCompiler(target_mode="DEMO")
    with pytest.raises(StaleReferenceError, match="references unknown or stale topic"):
        compiler.compile([res], known_topics={"topic:kinematics:2d"})


def test_reject_stale_capability_reference():
    """Referencing a capability not in known_capabilities raises StaleReferenceError."""
    res = make_valid_resource()
    res["capability_refs"] = ["cap:motion:stale-cap"]

    compiler = ResourceProjectionCompiler(target_mode="DEMO")
    with pytest.raises(StaleReferenceError, match="references unknown or stale capability"):
        compiler.compile([res], known_capabilities={"cap:motion:relative-velocity"})


def test_reject_invalid_origin_commit_or_sha256():
    """Origins with malformed commit hash or sha256 raise StaleReferenceError."""
    # Bad commit
    res_bad_commit = make_valid_resource()
    res_bad_commit["origins"][0]["commit"] = "not-a-40-hex-commit"
    compiler = ResourceProjectionCompiler(target_mode="DEMO")
    with pytest.raises(StaleReferenceError, match="origin reference is invalid"):
        compiler.compile([res_bad_commit])

    # Bad sha256
    res_bad_sha = make_valid_resource()
    res_bad_sha["origins"][0]["sha256"] = "short-hash"
    with pytest.raises(StaleReferenceError, match="origin reference is invalid"):
        compiler.compile([res_bad_sha])


# =====================================================================
# Tests: Legacy Aliases and Six-Core Roles Preservation
# =====================================================================

def test_preserve_legacy_aliases_and_role_indexing():
    """Legacy aliases and core roles are preserved and indexed in the projection."""
    res1 = make_valid_resource(
        "res:physics:kin:1",
        aliases=["legacy/kin1.html", "act:kin-1"],
        core_roles=["CORE1A", "EXPLORER"],
    )
    res2 = make_valid_resource(
        "res:physics:kin:2",
        aliases=["legacy/kin2.html"],
        core_roles=["CORE2", "CORE2A"],
    )

    proj = compile_resource_projection([res1, res2])

    # Verify aliases preserved in resources
    res_map = {r["resource_id"]: r for r in proj["resources"]}
    assert res_map["res:physics:kin:1"]["aliases"] == ["legacy/kin1.html", "act:kin-1"]
    assert res_map["res:physics:kin:2"]["aliases"] == ["legacy/kin2.html"]

    # Verify aliases preserved in routes table
    assert proj["routes"]["/legacy/kin1.html"] == "res:physics:kin:1"
    assert proj["routes"]["/act:kin-1"] == "res:physics:kin:1"
    assert proj["routes"]["/legacy/kin2.html"] == "res:physics:kin:2"

    # Verify role facets indexing
    assert "res:physics:kin:1" in proj["role_facets"]["CORE1A"]
    assert "res:physics:kin:1" in proj["role_facets"]["EXPLORER"]
    assert "res:physics:kin:2" in proj["role_facets"]["CORE2"]
    assert "res:physics:kin:2" in proj["role_facets"]["CORE2A"]


# =====================================================================
# Tests: Route Resolution & Registry Invariants
# =====================================================================

def test_all_registered_resources_resolve():
    """Every registered canonical ID, entrypoint, and alias resolves unambiguously."""
    res = make_valid_resource(
        "res:physics:motion:test",
        aliases=["legacy-alias-1", "legacy-alias-2"],
        entrypoint="public/apps/test/index.html",
    )

    registry = ResourceRegistry()
    registry.register(res)

    # Resolve by canonical ID
    assert registry.resolve_resource("res:physics:motion:test")["resource_id"] == "res:physics:motion:test"

    # Resolve by canonical route
    assert registry.resolve_route("/resources/res:physics:motion:test")["resource_id"] == "res:physics:motion:test"

    # Resolve by entrypoint route
    assert registry.resolve_route("/public/apps/test/index.html")["resource_id"] == "res:physics:motion:test"

    # Resolve by aliases
    assert registry.resolve_route("legacy-alias-1")["resource_id"] == "res:physics:motion:test"
    assert registry.resolve_route("/legacy-alias-2")["resource_id"] == "res:physics:motion:test"

    # Missing route raises RouteResolutionError
    with pytest.raises(RouteResolutionError):
        registry.resolve_route("/unknown/route")

    # Missing resource raises RouteResolutionError
    with pytest.raises(RouteResolutionError):
        registry.resolve_resource("res:nonexistent")


def test_route_collision_detection():
    """Registering two resources with colliding routes or aliases raises ResourceRegistryError."""
    res1 = make_valid_resource("res:test:01", aliases=["shared-alias"])
    res2 = make_valid_resource("res:test:02", aliases=["shared-alias"])

    registry = ResourceRegistry()
    registry.register(res1)
    with pytest.raises(ResourceRegistryError, match="Route collision on alias"):
        registry.register(res2)


# =====================================================================
# Tests: Public-Safe Search Metadata Sanitization
# =====================================================================

def test_only_eligible_public_safe_search_metadata():
    """Search entries contain only public-safe metadata; zero solutions or private annotations."""
    res = make_valid_resource("res:demo:search")
    proj = compile_resource_projection([res])

    assert len(proj["search_index"]) == 1
    entry = proj["search_index"][0]

    assert entry["id"] == "res:demo:search"
    assert entry["title"] == res["title"]
    assert entry["route"] == "/resources/res:demo:search"
    assert entry["kind"] == "STRUCTURED_PRODUCT"
    assert entry["public_facets"]["demo"] is True

    # Ensure prohibited fields do NOT exist in search index
    for forbidden in ("solution", "answers", "rubric", "worked_steps", "master_key", "internal"):
        assert forbidden not in entry


# =====================================================================
# Tests: Runtime Service Contract Conformance
# =====================================================================

def test_runtime_interface_contract_conformance():
    """Validates resolve(id, revision) and eligible_for_role(id, role, stage)."""
    res = make_valid_resource("res:contract:test", core_roles=["CORE1A", "EXPLORER"])
    registry = ResourceRegistry()
    registry.register(res)

    # resolve(id, revision)
    resolved = registry.resolve("res:contract:test", revision=1)
    assert resolved["resource_id"] == "res:contract:test"

    # Revision mismatch raises RouteResolutionError
    with pytest.raises(RouteResolutionError, match="Resource revision mismatch"):
        registry.resolve("res:contract:test", revision=2)

    # eligible_for_role
    assert registry.eligible_for_role("res:contract:test", role="CORE1A") is True
    assert registry.eligible_for_role("res:contract:test", role="EXPLORER") is True
    assert registry.eligible_for_role("res:contract:test", role="CORE2") is False
    assert registry.eligible_for_role("res:unknown", role="CORE1A") is False


def test_is_learner_routable_helper():
    """Tests the is_learner_routable helper across varying governance and audience inputs."""
    valid = make_valid_resource()
    assert is_learner_routable(valid) is True

    held = make_valid_resource()
    held["governance"]["release"] = "HOLD"
    assert is_learner_routable(held) is False

    internal = make_valid_resource()
    internal["audience"] = "INTERNAL"
    assert is_learner_routable(internal) is False
