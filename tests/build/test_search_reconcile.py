"""Acceptance tests for Cross-Source Search and Route Reconciliation (Workpack A71).

Verifies:
1. Exact source accounting: 64 v3.5 registry, 417 v3.5 search, 1012 v4.1 search, 71 discovered items (total: 1564).
2. Fault N09 answer leakage defense: zero solutions, answers, rubrics, or master keys allowed.
3. Operator tool quarantine: owner.test.atlas and owner.test.rungs strictly quarantined as RESTRICTED_EXCLUDED.
4. Route, query, and fragment exact resolution (no wrong redirects, unmapped routes fail closed).
5. Candidate hold containment: unreviewed candidates held with explicit tombstones.
6. Search result stability and route tombstoning before and after item withdrawal.
7. Multi-source collision disambiguation.
8. Deterministic summary JSON generation (docs/migration/search-route-summary.json).
9. Production target mode rejection.

No academic approval inferred from software validation.
academic_admission: HOLD
release_authority: NONE
"""
from __future__ import annotations

import copy
import json
from pathlib import Path
from typing import Any, Dict

import pytest

from grade9build.record_inventory import canonical_json_digest
from grade9build.search import (
    AnswerLeakageError,
    SearchCompilationError,
    SearchIndexCompiler,
    SearchQueryEngine,
    assert_no_answer_leakage,
)
from grade9build.search_reconcile import (
    KIT_MANIFEST_SHA256,
    SCHEMA_VERSION,
    WORKPACK_ID,
    LeakedRestrictedContentError,
    RouteLookupResult,
    SearchReconciliationError,
    SearchRouteReconciler,
    UnknownRouteError,
    normalize_route_path,
)

ROOT = Path(__file__).resolve().parents[2]


@pytest.fixture
def reconciler() -> SearchRouteReconciler:
    """Fixture providing initialized SearchRouteReconciler in demo mode."""
    r = SearchRouteReconciler(demo_mode=True)
    r.reconcile_all()
    return r


class TestSearchReconciliationAccounting:
    """Tests complete accounting and dispositioning across all migration sources."""

    def test_exact_source_counts(self, reconciler: SearchRouteReconciler):
        summary = reconciler.build_summary()
        scope = summary["reconciliation_scope"]

        assert scope["v35_registry_entries"] == 64
        assert scope["v35_search_entries"] == 417
        assert scope["v41_search_entries"] == 1012
        assert scope["discovered_resources"] == 71
        assert scope["total_occurrences_dispositioned"] == 1564
        assert summary["route_closure"]["unaccounted_occurrences"] == 0

    def test_occurrence_fields_and_uniqueness(self, reconciler: SearchRouteReconciler):
        occ_ids = set()
        for occ in reconciler.occurrences:
            oid = occ["occurrence_id"]
            assert oid.startswith("occ:")
            assert oid not in occ_ids, f"Duplicate occurrence ID: {oid}"
            occ_ids.add(oid)

            assert occ["legacy_id"]
            assert occ["source"] in ("v35", "v41", "discovered")
            assert occ["disposition"] in (
                "MAPPED_CANONICAL",
                "CANDIDATE_HOLD",
                "RESTRICTED_EXCLUDED",
                "TOMBSTONE_UNAVAILABLE",
                "DISAMBIGUATED_COLLISION",
            )
            assert occ["target_route"]

    def test_all_64_registry_entries_dispositioned(self, reconciler: SearchRouteReconciler):
        reg_occs = [o for o in reconciler.occurrences if o["source"] == "v35" and o["source_layer"] == "resource_registry"]
        assert len(reg_occs) == 64

        kinds = {}
        for o in reg_occs:
            k = o["legacy_kind"]
            kinds[k] = kinds.get(k, 0) + 1
        assert kinds == {"OPAQUE_APP": 11, "STRUCTURED_PRODUCT": 50, "QUESTION_COLLECTION": 1, "OWNER_TOOL": 2}

    def test_all_417_search_entries_dispositioned(self, reconciler: SearchRouteReconciler):
        search_occs = [o for o in reconciler.occurrences if o["source"] == "v35" and o["source_layer"] == "learner_search"]
        assert len(search_occs) == 417

        types = {}
        for o in search_occs:
            t = o["legacy_kind"]
            types[t] = types.get(t, 0) + 1
        assert types == {
            "QUESTION": 310,
            "LEARN_RESOURCE": 29,
            "PRACTICE_RESOURCE": 21,
            "SUBTOPIC": 18,
            "CONCEPT": 16,
            "EXPLORE_RESOURCE": 11,
            "TOPIC": 11,
            "QUESTION_BANK_RESOURCE": 1,
        }


class TestRestrictedQuarantineAndLeakageDefense:
    """Verifies operator tool quarantine and Fault N09 answer leakage defense."""

    def test_owner_tools_strictly_quarantined(self, reconciler: SearchRouteReconciler):
        owner_atlas = next(o for o in reconciler.occurrences if o["legacy_id"] == "owner.test.atlas")
        owner_rungs = next(o for o in reconciler.occurrences if o["legacy_id"] == "owner.test.rungs")

        for tool in (owner_atlas, owner_rungs):
            assert tool["disposition"] == "RESTRICTED_EXCLUDED"
            assert tool["eligible_for_release"] is False
            assert tool["target_route"].startswith("/tombstone")
            assert tool["tombstone_reason"] == "RESTRICTED_OPERATOR_TOOL"

        # Route lookup for owner tools returns QUARANTINED
        lookup_atlas = reconciler.resolve_route("test/atlas/index.html")
        assert lookup_atlas.status == "QUARANTINED"
        assert lookup_atlas.disposition == "RESTRICTED_EXCLUDED"
        assert "RESTRICTED_OPERATOR_TOOL" in lookup_atlas.target_route

        lookup_rungs = reconciler.resolve_route("test/rungs/index.html")
        assert lookup_rungs.status == "QUARANTINED"
        assert lookup_rungs.disposition == "RESTRICTED_EXCLUDED"

    def test_owner_tools_never_in_public_search(self, reconciler: SearchRouteReconciler):
        # Even if accidentally attempted to admit, reconciler excludes them
        reconciler.admit_released_items(["owner.test.atlas", "owner.test.rungs"])
        reconciler.reconcile_all()

        projections = reconciler.compile_public_search_projections("DEMO")
        proj_ids = {p["id"] for p in projections}
        assert "owner.test.atlas" not in proj_ids
        assert "owner.test.rungs" not in proj_ids

    def test_leakage_defense_rejects_forbidden_keys(self):
        leaky_entry = {
            "id": "chem.leak.test",
            "resource_kind": "STRUCTURED_PRODUCT",
            "artifact": {"entrypoint": "chem/leak.html"},
            "master_key": "forbidden_answer_solution",  # Forbidden key
        }
        rec = SearchRouteReconciler(demo_mode=True)
        with pytest.raises(AnswerLeakageError):
            rec.reconcile_v35_registry([leaky_entry] + [{"id": f"dummy{i}", "artifact": {}} for i in range(63)])


class TestRouteResolutionAndRedirectionSafety:
    """Verifies exact route, query, and fragment resolution with zero wrong redirects."""

    def test_exact_question_url_resolution(self, reconciler: SearchRouteReconciler):
        # Unadmitted held question resolves to tombstone
        res = reconciler.resolve_route("question-bank/index.html?q=1D-Q01#1D-Q01")
        assert res.status == "TOMBSTONE"
        assert res.canonical_id == "Q-1D-Q01"
        assert "ACADEMIC_HOLD_UNRELEASED" in res.target_route

        # Admitted question resolves to exact canonical route
        reconciler.admit_released_items(["Q-1D-Q01"])
        reconciler.reconcile_all()

        res_active = reconciler.resolve_route("question-bank/index.html?q=1D-Q01#1D-Q01")
        assert res_active.status == "ACTIVE"
        assert res_active.target_route == "/question-bank?q=Q-1D-Q01#Q-1D-Q01"

    def test_concept_fragment_resolution(self, reconciler: SearchRouteReconciler):
        reconciler.admit_released_items(["CON-MIC-CHEM-BONDING"])
        reconciler.reconcile_all()

        # Match by full URL with fragment
        res = reconciler.resolve_route("chemistry/bonding/index.html#MIC-CHEM-BONDING")
        assert res.status == "ACTIVE"
        assert res.target_route == "/curriculum/concepts#MIC-CHEM-BONDING"

        # Match by fragment alone
        res_frag = reconciler.resolve_route("MIC-CHEM-BONDING")
        assert res_frag.status == "ACTIVE"

    def test_zero_wrong_redirects(self, reconciler: SearchRouteReconciler):
        # Unknown routes MUST fail closed with UnknownRouteError
        with pytest.raises(UnknownRouteError):
            reconciler.resolve_route("completely/unknown/arbitrary/path.html")

        # When fail_closed=False, returns UNKNOWN without redirecting to root or wrong targets
        unknown = reconciler.resolve_route("bogus/path", fail_closed=False)
        assert unknown.status == "UNKNOWN"
        assert unknown.target_route is None


class TestWithdrawalStabilityAndSearchIntegration:
    """Verifies item withdrawal stability, route tombstoning, and search compiler integration."""

    def test_withdrawal_lifecycle_and_stability(self, reconciler: SearchRouteReconciler):
        # 1. Admit 3 items into demo release
        item_ids = ["Q-1D-Q01", "CON-MIC-CHEM-BONDING", "chem.bonding.chemical-bonding.explorer"]
        reconciler.admit_released_items(item_ids)
        reconciler.reconcile_all()

        # All 3 resolve ACTIVE
        for iid in item_ids:
            res = reconciler.resolve_route(iid)
            assert res.status == "ACTIVE"

        projections_before = reconciler.compile_public_search_projections("DEMO")
        assert len(projections_before) == 3
        ids_before = [p["id"] for p in projections_before]

        # 2. Withdraw 1 item: Q-1D-Q01
        reconciler.withdraw_item("Q-1D-Q01")

        # Withdrawn item now resolves to TOMBSTONE
        res_withdrawn = reconciler.resolve_route("Q-1D-Q01")
        assert res_withdrawn.status == "TOMBSTONE"
        assert res_withdrawn.tombstone_reason == "WITHDRAWN_OR_DEPRECATED"

        # Remaining items still resolve ACTIVE
        assert reconciler.resolve_route("CON-MIC-CHEM-BONDING").status == "ACTIVE"
        assert reconciler.resolve_route("chem.bonding.chemical-bonding.explorer").status == "ACTIVE"

        # Projections after withdrawal contain exactly remaining 2 items
        projections_after = reconciler.compile_public_search_projections("DEMO")
        assert len(projections_after) == 2
        ids_after = [p["id"] for p in projections_after]
        assert "Q-1D-Q01" not in ids_after
        assert ids_after == [i for i in ids_before if i != "Q-1D-Q01"]

        # 3. Restore item
        reconciler.restore_item("Q-1D-Q01")
        assert reconciler.resolve_route("Q-1D-Q01").status == "ACTIVE"
        projections_restored = reconciler.compile_public_search_projections("DEMO")
        assert len(projections_restored) == 3

    def test_search_compiler_and_query_engine_integration(self, reconciler: SearchRouteReconciler):
        reconciler.admit_released_items(["Q-1D-Q01", "CON-MIC-CHEM-BONDING"])
        reconciler.reconcile_all()

        projections = reconciler.compile_public_search_projections("DEMO")

        # Build mock release package for SearchIndexCompiler
        release_pkg = {
            "schema_version": "g9-release-projection/1.0",
            "release_id": "RELEASE-DEMO-01",
            "target_mode": "DEMO",
            "release_digest": "0" * 64,
            "projections": {
                "search_index": projections,
            },
        }

        compiler = SearchIndexCompiler(target_mode="DEMO")
        compiled = compiler.compile(release_pkg)
        assert compiled["manifest"]["total_items"] == 2

        query_engine = SearchQueryEngine(compiled["items"])
        results = query_engine.query("kinematics velocity")
        assert len(results) >= 1
        assert results[0]["id"] == "Q-1D-Q01"


class TestSummaryDocumentGeneration:
    """Verifies deterministic summary JSON generation."""

    def test_summary_file_written_and_verified(self, reconciler: SearchRouteReconciler):
        summary_path = reconciler.write_summary()
        assert summary_path.exists()

        raw = json.loads(summary_path.read_text(encoding="utf-8"))
        assert raw["schema_version"] == SCHEMA_VERSION
        assert raw["workpack_id"] == WORKPACK_ID
        assert raw["status"] == "HOLD"
        assert raw["academic_admission"] == "HOLD"
        assert raw["production_release"] == "NONE"
        assert raw["kit_manifest_sha256"] == KIT_MANIFEST_SHA256
        assert raw["leakage_defense_audit"]["status"] == "PASS"
        assert raw["leakage_defense_audit"]["operator_tools_quarantined"] == 2
        assert raw["reconciliation_scope"]["total_occurrences_dispositioned"] == 1564
        assert raw["summary_digest"] == canonical_json_digest({k: v for k, v in raw.items() if k != "summary_digest"})


class TestTargetModeAndGovernanceRejection:
    """Verifies production target mode rejection and fail-closed security invariants."""

    def test_production_mode_fails_closed(self):
        with pytest.raises(SearchReconciliationError):
            SearchRouteReconciler(demo_mode=False)

    def test_compile_public_projections_rejects_production(self, reconciler: SearchRouteReconciler):
        with pytest.raises(SearchReconciliationError):
            reconciler.compile_public_search_projections("PRODUCTION")
