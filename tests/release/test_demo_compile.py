"""Contract and verification tests for Workpack A14 release projection compiler."""
import copy
import json
import unittest
from pathlib import Path
import sys

SRC_DIR = Path(__file__).resolve().parent.parent.parent / "src"
if str(SRC_DIR) not in sys.path:
    sys.path.insert(0, str(SRC_DIR))

from grade9build.compile import (
    ReleaseProjectionCompiler,
    ReleaseCompilationError,
    is_capability_visible,
)
from grade9build.record_inventory import canonical_json_digest

ROOT = Path(__file__).resolve().parents[2]
FIXTURES_DIR = ROOT / "fixtures" / "synthetic"


class TestDemoReleaseCompiler(unittest.TestCase):
    """Test suite covering deterministic compilation, security gates, and projection visibility."""

    def setUp(self):
        self.compiler = ReleaseProjectionCompiler(target_mode="DEMO")
        # Load canonical synthetic graph fixture
        graph_path = FIXTURES_DIR / "graph.json"
        self.raw_graph = json.loads(graph_path.read_text(encoding="utf-8"))

    def test_deterministic_byte_identical_builds(self):
        """Two compilation runs over the same graph produce byte-identical release output."""
        res1 = self.compiler.compile_release(self.raw_graph, release_id="RELEASE-TEST-01")
        res2 = self.compiler.compile_release(self.raw_graph, release_id="RELEASE-TEST-01")

        bytes1 = json.dumps(res1, sort_keys=True, separators=(",", ":")).encode("utf-8")
        bytes2 = json.dumps(res2, sort_keys=True, separators=(",", ":")).encode("utf-8")

        self.assertEqual(bytes1, bytes2, "Builds must be 100% byte-identical")
        self.assertEqual(res1["release_digest"], res2["release_digest"])

    def test_negative_hold_item_rejection_n08(self):
        """Objects with status HOLD fail closed immediately (N08)."""
        tampered_graph = copy.deepcopy(self.raw_graph)
        tampered_graph[0]["status"] = "HOLD"

        with self.assertRaises(ReleaseCompilationError) as ctx:
            self.compiler.compile_release(tampered_graph)
        self.assertIn("status HOLD", str(ctx.exception))

    def test_negative_dangling_reference_rejection(self):
        """Referencing a missing dependency ID causes compilation to fail closed."""
        tampered_graph = copy.deepcopy(self.raw_graph)
        tampered_graph.append({
            "schema_version": "engineering-projection/1",
            "type": "QUESTION",
            "id": "question:dangling",
            "revision": 1,
            "status": "SYNTHETIC",
            "dependencies": [
                {
                    "type": "WARRANT",
                    "id": "warrant:non_existent",
                    "revision": 1,
                    "sha256": "0" * 64,
                }
            ],
            "payload": {"stem": "Dangling test"},
        })

        with self.assertRaises(ReleaseCompilationError) as ctx:
            self.compiler.compile_release(tampered_graph)
        self.assertIn("Dangling reference", str(ctx.exception))

    def test_negative_stale_dependency_digest_rejection_n05(self):
        """Stale dependency SHA-256 causes compilation to fail closed (N05)."""
        tampered_graph = copy.deepcopy(self.raw_graph)
        # Find an object with dependencies
        obj_with_deps = next(o for o in tampered_graph if o.get("dependencies"))
        obj_with_deps["dependencies"][0]["sha256"] = "f" * 64

        with self.assertRaises(ReleaseCompilationError) as ctx:
            self.compiler.compile_release(tampered_graph)
        self.assertIn("Stale dependency digest", str(ctx.exception))

    def test_negative_missing_mandatory_asset_rejection_n07(self):
        """Missing mandatory referenced asset causes compilation to fail closed (N07)."""
        tampered_graph = copy.deepcopy(self.raw_graph)
        tampered_graph[0]["asset_claims"] = [
            {"asset_id": "diagram_01.svg", "mandatory": True, "classification": "MISSING"}
        ]

        with self.assertRaises(ReleaseCompilationError) as ctx:
            self.compiler.compile_release(tampered_graph, available_assets=set())
        self.assertIn("Missing mandatory asset", str(ctx.exception))

    def test_production_target_mode_strictly_rejected(self):
        """Compiler strictly rejects production target mode; only DEMO is permitted."""
        with self.assertRaises(ReleaseCompilationError) as ctx:
            ReleaseProjectionCompiler(target_mode="PRODUCTION")
        self.assertIn("Production release compilation is strictly prohibited", str(ctx.exception))

    def test_precommit_projection_sanitized_no_solution_leak(self):
        """Learner precommit view withholds all solutions, worked steps, and rubrics."""
        release = self.compiler.compile_release(self.raw_graph)
        precommit_views = release["projections"]["learner_precommit"]

        self.assertGreater(len(precommit_views), 0)
        for view in precommit_views:
            self.assertNotIn("solution", view)
            self.assertNotIn("solution_text", view)
            self.assertNotIn("crux", view)
            self.assertNotIn("answer", view)

    def test_search_index_projection_sanitized_n09(self):
        """Public search index projection withholds raw answers and private fields (N09)."""
        release = self.compiler.compile_release(self.raw_graph)
        search_entries = release["projections"]["search_index"]

        self.assertGreater(len(search_entries), 0)
        for entry in search_entries:
            self.assertIn("id", entry)
            self.assertIn("title", entry)
            self.assertNotIn("answer", entry)
            self.assertNotIn("raw_claim", entry)
            self.assertNotIn("private_raw_record", entry)

    def test_stage_visibility_rules(self):
        """Tests disclosure visibility across stages, allowed capabilities, and exam modes."""
        allowed = {"H1", "REFERENCE_SOLUTION", "BOUNDARY_REFERENCE", "SOURCE_RETURN", "SHOW_REASONING_CRUX"}

        # Basic interaction always visible
        self.assertTrue(is_capability_visible("PREDICT", "VIEW_STIMULUS"))
        self.assertTrue(is_capability_visible("ATTEMPT", "EDIT_WORK"))

        # In ATTEMPT stage before first commit, hints are visible
        self.assertTrue(is_capability_visible("ATTEMPT", "H1", allowed_capabilities=allowed))
        # But solutions are NOT visible
        self.assertFalse(is_capability_visible("ATTEMPT", "REFERENCE_SOLUTION", allowed_capabilities=allowed))

        # After first commit in RECONSTRUCT stage, reference solution and crux become visible
        self.assertTrue(
            is_capability_visible(
                "RECONSTRUCT", "REFERENCE_SOLUTION", first_committed=True, allowed_capabilities=allowed
            )
        )
        self.assertTrue(
            is_capability_visible(
                "RECONSTRUCT", "SHOW_REASONING_CRUX", first_committed=True, allowed_capabilities=allowed
            )
        )

        # In COMPLETE stage, source return becomes visible
        self.assertTrue(is_capability_visible("COMPLETE", "SOURCE_RETURN", allowed_capabilities=allowed))

        # In SIMULATED_EXAM mode, hints and disclosures are strictly blocked
        self.assertFalse(
            is_capability_visible(
                "ATTEMPT", "H1", allowed_capabilities=allowed, is_exam=True
            )
        )
        self.assertFalse(
            is_capability_visible(
                "RECONSTRUCT", "REFERENCE_SOLUTION", first_committed=True, allowed_capabilities=allowed, is_exam=True
            )
        )

    def test_wpe_vertical_slice_compiles_cleanly(self):
        """The 33-object WPE vertical slice fixture compiles cleanly in DEMO mode."""
        wpe_path = FIXTURES_DIR / "wpe-vertical-slice.json"
        wpe_slice = json.loads(wpe_path.read_text(encoding="utf-8"))
        res = self.compiler.compile_release(wpe_slice["objects"], release_id="RELEASE-WPE-01")
        self.assertEqual(res["total_objects"], 33)
        self.assertEqual(res["target_mode"], "DEMO")
        self.assertTrue(res["demo_banner"])
        self.assertEqual(res["academic_admission"], "HOLD")
        self.assertIn("learner_precommit", res["projections"])
        self.assertIn("learner_postcommit", res["projections"])
        self.assertIn("search_index", res["projections"])


if __name__ == "__main__":
    unittest.main()
