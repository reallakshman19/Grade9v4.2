"""Acceptance tests for search compiler and release index (Workpack A34).

Verifies:
1. Deterministic compilation and byte-identical manifest/shard digests.
2. Fault N09 answer leakage rejection: private solutions, answers, or rubrics fail compilation.
3. Fault N26 stale release shard rejection: mismatched releaseId or modified digests fail verification.
4. Item withdrawal and tombstone handling.
5. Deterministic scoring, weighting, and alphabetical tie-breaking.
6. Facet filtering logic (intersection across dimensions, union within dimensions).
7. Unicode NFKC case-fold normalization.
8. Candidate and hold containment: zero unreleased items indexed.
9. Full compilation spanning A14 release, A62 resources, and A53 reasoning cells.
10. Production target mode rejection.

No academic approval inferred from software validation.
"""
from __future__ import annotations

import copy
import json
from pathlib import Path
from typing import Any, Dict

import pytest

from grade9build.search import (
    AnswerLeakageError,
    SearchCompilationError,
    SearchIndexCompiler,
    SearchQueryEngine,
    StaleShardError,
    assert_no_answer_leakage,
    normalize_query,
    tokenize,
)


def make_mock_release_package(release_id: str = "RELEASE-DEMO-01") -> Dict[str, Any]:
    return {
        "schema_version": "g9-release-projection/1.0",
        "release_id": release_id,
        "target_mode": "DEMO",
        "release_digest": "a" * 64,
        "projections": {
            "search_index": [
                {
                    "id": "que:physics:cart-collision",
                    "revision": 1,
                    "kind": "QUESTION",
                    "subjectIds": ["PHYSICS"],
                    "title": "Cart Spring Collision Dynamics",
                    "summary": "Calculate maximum compression of a spring during cart collision.",
                    "reviewed_terms": ["cart", "collision", "spring", "energy"],
                    "public_facets": {"subject": "PHYSICS", "role": "CORE2"},
                },
                {
                    "id": "concept:physics:hooke-law",
                    "revision": 1,
                    "kind": "CONCEPT",
                    "subjectIds": ["PHYSICS"],
                    "title": "Hooke's Law and Elastic Potential",
                    "summary": "Relationship between restoring force and spring elongation.",
                    "reviewed_terms": ["hooke", "elastic", "spring", "force"],
                    "public_facets": {"subject": "PHYSICS", "role": "CORE1A"},
                },
                {
                    "id": "que:chem:redox-half",
                    "revision": 1,
                    "kind": "QUESTION",
                    "subjectIds": ["CHEMISTRY"],
                    "title": "Redox Half Equations",
                    "summary": "Balancing oxidation-reduction half reactions in acidic solution.",
                    "reviewed_terms": ["redox", "oxidation", "reduction", "electrons"],
                    "public_facets": {"subject": "CHEMISTRY", "role": "CORE1B"},
                },
            ]
        },
    }


def make_mock_resources_projection() -> Dict[str, Any]:
    return {
        "schema_version": "g9-resource-registry-projection/1.0",
        "release_id": "RELEASE-DEMO-01",
        "search_index": [
            {
                "id": "res:sim:two-body",
                "revision": 1,
                "kind": "STRUCTURED_PRODUCT",
                "subject_id": "PHYSICS",
                "title": "Two-Body Orbital Simulation",
                "summary": "Interactive simulation of gravitational interaction between two masses.",
                "reviewed_terms": ["orbit", "gravity", "two-body", "simulation"],
                "public_facets": {"subject": "PHYSICS", "role": "EXPLORER"},
            }
        ],
    }


def make_mock_reasoning_cells() -> list[Dict[str, Any]]:
    return [
        {
            "schema_version": "g9-reasoning-cell/1",
            "cell_id": "cell:physics:kin:apply-d2",
            "subject_id": "PHYSICS",
            "topic_ref": {"type": "CONCEPT", "id": "concept:kinematics", "revision": 1, "sha256": "b" * 64},
            "operation": "APPLY",
            "demand_band": "D2",
            "native_contract_ref": {"type": "WARRANT", "id": "warrant:kin", "revision": 1, "sha256": "c" * 64},
            "instances": [
                {"type": "QUESTION", "id": "que:kin:1", "revision": 1, "sha256": "d" * 64},
                {"type": "QUESTION", "id": "que:kin:2", "revision": 1, "sha256": "e" * 64},
            ],
            "main": {"type": "QUESTION", "id": "que:kin:main", "revision": 1, "sha256": "f" * 64},
            "status": "SYNTHETIC",
            "c06_v11": True,
        },
        # Candidate cell: must NOT be indexed
        {
            "schema_version": "g9-reasoning-cell/1",
            "cell_id": "cell:physics:unverified:hold",
            "subject_id": "PHYSICS",
            "topic_ref": {"type": "CONCEPT", "id": "concept:hold", "revision": 1, "sha256": "b" * 64},
            "operation": "MODEL",
            "demand_band": "D3",
            "native_contract_ref": {"type": "WARRANT", "id": "warrant:hold", "revision": 1, "sha256": "c" * 64},
            "instances": [],
            "main": None,
            "status": "HOLD",
            "c06_v11": False,
        },
    ]


# =====================================================================
# Tests
# =====================================================================

def test_deterministic_compilation_and_byte_identity():
    """Two compilation passes on the same release data produce identical outputs and manifest digests."""
    rel = make_mock_release_package()
    res = make_mock_resources_projection()
    cells = make_mock_reasoning_cells()

    compiler1 = SearchIndexCompiler(target_mode="DEMO")
    compiler2 = SearchIndexCompiler(target_mode="DEMO")

    out1 = compiler1.compile(rel, res, cells)
    out2 = compiler2.compile(rel, res, cells)

    assert out1["manifest"] == out2["manifest"]
    assert out1["manifest"]["manifest_digest"] == out2["manifest"]["manifest_digest"]
    assert json.dumps(out1, sort_keys=True) == json.dumps(out2, sort_keys=True)


def test_production_target_mode_rejection():
    """Compiling for PRODUCTION must be rejected."""
    with pytest.raises(SearchCompilationError, match="Production search compilation is strictly prohibited"):
        SearchIndexCompiler(target_mode="PRODUCTION")


def test_n09_answer_leakage_rejection():
    """Fault N09: Any private answer, solution, rubric, or raw claim fails compilation."""
    rel = make_mock_release_package()
    # Inject private answer leak into search item
    leaked_entry = copy.deepcopy(rel["projections"]["search_index"][0])
    leaked_entry["solution"] = "The cart velocity is v = sqrt(k/m) * x"
    rel["projections"]["search_index"].append(leaked_entry)

    compiler = SearchIndexCompiler(target_mode="DEMO")
    with pytest.raises(AnswerLeakageError, match="Fault N09: Prohibited answer or private field"):
        compiler.compile(rel)

    # Inject assessment.raw_claim
    rel2 = make_mock_release_package()
    rel2["projections"]["search_index"][0]["assessment.raw_claim"] = {"answer": "B"}
    with pytest.raises(AnswerLeakageError, match="Fault N09"):
        compiler.compile(rel2)


def test_n26_stale_release_shard_rejection():
    """Fault N26: Mismatched releaseId or tampered shard checksum fails verification."""
    rel = make_mock_release_package()
    compiler = SearchIndexCompiler(target_mode="DEMO")
    compiled = compiler.compile(rel)
    manifest = compiled["manifest"]

    # Valid shard verifies cleanly
    shard_id = manifest["shards"][0]["shard_id"]
    valid_shard = {
        "shard_id": shard_id,
        "release_id": manifest["release_id"],
        "item_count": manifest["shards"][0]["item_count"],
        "items": compiled["shards"][shard_id],
    }
    SearchIndexCompiler.verify_shard(manifest, valid_shard)

    # 1. Stale releaseId
    stale_shard = copy.deepcopy(valid_shard)
    stale_shard["release_id"] = "RELEASE-OLD-00"
    with pytest.raises(StaleShardError, match="Fault N26: Stale search shard release mismatch"):
        SearchIndexCompiler.verify_shard(manifest, stale_shard)

    # 2. Tampered content (checksum mismatch)
    tampered_shard = copy.deepcopy(valid_shard)
    tampered_shard["items"][0]["title"] = "Tampered Title"
    with pytest.raises(StaleShardError, match="Fault N26: Shard .* checksum mismatch"):
        SearchIndexCompiler.verify_shard(manifest, tampered_shard)


def test_item_withdrawal_and_tombstones():
    """Withdrawn item IDs are excluded from compiled search index."""
    rel = make_mock_release_package()
    compiler = SearchIndexCompiler(target_mode="DEMO")

    # Before withdrawal: 3 items from release package
    out_before = compiler.compile(rel)
    assert out_before["manifest"]["total_items"] == 3

    # Withdraw "que:chem:redox-half"
    withdrawn = {"que:chem:redox-half"}
    out_after = compiler.compile(rel, withdrawn_ids=withdrawn)
    assert out_after["manifest"]["total_items"] == 2
    assert all(itm["id"] != "que:chem:redox-half" for itm in out_after["items"])


def test_deterministic_scoring_ranking_and_tie_breaking():
    """Verifies exact boost weights and alphabetical ID tie-breaking."""
    items = [
        {
            "id": "que:physics:b",
            "title": "Spring Oscillation",
            "summary": "Motion of mass on a spring",
            "reviewed_terms": ["spring"],
            "subjectIds": ["PHYSICS"],
        },
        {
            "id": "que:physics:a",
            "title": "Spring Oscillation",
            "summary": "Motion of mass on a spring",
            "reviewed_terms": ["spring"],
            "subjectIds": ["PHYSICS"],
        },
        {
            "id": "concept:spring",
            "title": "Hooke Law",
            "summary": "Spring elasticity",
            "reviewed_terms": ["elasticity"],
            "subjectIds": ["PHYSICS"],
        },
    ]

    engine = SearchQueryEngine(items)
    results = engine.query("spring")

    # Both que:physics:a and que:physics:b have identical scores; a must precede b alphabetically
    assert len(results) == 3
    assert results[0]["id"] == "concept:spring"  # Exact ID token match boost: 10.0 + title/summary
    assert results[1]["id"] == "que:physics:a"   # Alphabetical tie-breaker: 'a' before 'b'
    assert results[2]["id"] == "que:physics:b"


def test_facet_filtering_logic():
    """Facets intersect across dimensions (AND) and union within dimension (OR)."""
    rel = make_mock_release_package()
    compiler = SearchIndexCompiler(target_mode="DEMO")
    compiled = compiler.compile(rel)

    engine = SearchQueryEngine(compiled["items"])

    # Union within dimension: subject = [PHYSICS, CHEMISTRY] -> all 3 match
    res_union = engine.query(facets={"subject": ["PHYSICS", "CHEMISTRY"]})
    assert len(res_union) == 3

    # Single subject: CHEMISTRY -> 1 match
    res_chem = engine.query(facets={"subject": ["CHEMISTRY"]})
    assert len(res_chem) == 1
    assert res_chem[0]["id"] == "que:chem:redox-half"

    # Intersection across dimensions: subject = PHYSICS AND role = CORE1A -> 1 match (Hooke)
    res_intersect = engine.query(facets={"subject": ["PHYSICS"], "role": ["CORE1A"]})
    assert len(res_intersect) == 1
    assert res_intersect[0]["id"] == "concept:physics:hooke-law"

    # Intersection yielding empty set
    res_empty = engine.query(facets={"subject": ["CHEMISTRY"], "role": ["CORE1A"]})
    assert len(res_empty) == 0


def test_unicode_nfkc_casefold_normalization():
    """Normalized query matches regardless of Unicode decomposed accents or uppercase."""
    assert normalize_query("  Héllo   WORLD  ") == "héllo world"
    assert tokenize("Force: F = m·a") == ["force", "f", "m·a"]

    items = [
        {
            "id": "concept:kin",
            "title": "Café Kinetic Friction",
            "summary": "Frictional forces",
            "reviewed_terms": ["friction"],
            "subjectIds": ["PHYSICS"],
        }
    ]
    engine = SearchQueryEngine(items)

    # Decomposed e + accent
    decomposed = "cafe\u0301"
    res = engine.query(decomposed)
    assert len(res) == 1
    assert res[0]["id"] == "concept:kin"


def test_candidate_and_hold_containment():
    """Hold and candidate cells are excluded from search index."""
    cells = make_mock_reasoning_cells()
    rel = make_mock_release_package()

    compiler = SearchIndexCompiler(target_mode="DEMO")
    compiled = compiler.compile(rel, reasoning_cells=cells)

    indexed_ids = [itm["id"] for itm in compiled["items"]]
    assert "cell:physics:kin:apply-d2" in indexed_ids
    assert "cell:physics:unverified:hold" not in indexed_ids
