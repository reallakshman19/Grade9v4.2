"""Unit and Integration Test Suite for Object Graph and Dependency Validation (Workpack A08)."""

import copy
import json
import sys
import unittest
from pathlib import Path

SRC_DIR = Path(__file__).resolve().parent.parent.parent / "src"
if str(SRC_DIR) not in sys.path:
    sys.path.insert(0, str(SRC_DIR))

from grade9build.graph import (
    ObjectGraphValidator,
    GraphValidationError,
    compute_object_digest,
    object_key
)

FIXTURE_PATH = Path("D:/CodeD/grade9-r4-kit/Grade9v4.2_Execution_Kit_R4/06-acceptance/fixtures/graph.json")

class TestObjectGraphValidation(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        with open(FIXTURE_PATH, "r", encoding="utf-8") as f:
            cls.fixture_graph = json.load(f)

    def test_valid_reference_fixture_passes(self):
        validator = ObjectGraphValidator(demo_mode=True)
        count = validator.validate_graph(copy.deepcopy(self.fixture_graph))
        self.assertEqual(count, 8)

    def test_missing_ref_rejection(self):
        graph = copy.deepcopy(self.fixture_graph)
        graph.pop(0)  # Remove demo:q:001
        validator = ObjectGraphValidator(demo_mode=True)
        with self.assertRaisesRegex(GraphValidationError, "missing ref"):
            validator.validate_graph(graph)

    def test_stale_or_tampered_digest_rejection(self):
        graph = copy.deepcopy(self.fixture_graph)
        graph[0]["payload"]["stem"] = "Tampered question stem that changes digest!"
        validator = ObjectGraphValidator(demo_mode=True)
        with self.assertRaisesRegex(GraphValidationError, "stale digest"):
            validator.validate_graph(graph)

    def test_duplicate_object_rejection(self):
        graph = copy.deepcopy(self.fixture_graph)
        graph.append(copy.deepcopy(graph[0]))  # Duplicate demo:q:001
        validator = ObjectGraphValidator(demo_mode=True)
        with self.assertRaisesRegex(GraphValidationError, "duplicate object"):
            validator.validate_graph(graph)

    def test_cycle_rejection(self):
        graph = copy.deepcopy(self.fixture_graph)
        # Create circular dependency: demo:q:001 -> demo:c:001 -> demo:q:001
        graph[0]["dependencies"].append({
            "type": "CONSTRUCTION",
            "id": "demo:c:001",
            "revision": 1,
            "sha256": "placeholder"
        })
        validator = ObjectGraphValidator(demo_mode=False)
        with self.assertRaisesRegex(GraphValidationError, "cycle detected"):
            validator.validate_graph(graph)

    def test_relationship_endpoint_consistency(self):
        graph = copy.deepcopy(self.fixture_graph)
        rel = graph[-1]
        rel["dependencies"].pop()  # Drop endpoint dependency
        validator = ObjectGraphValidator(demo_mode=True)
        with self.assertRaisesRegex(GraphValidationError, "relationship endpoint not dependency"):
            validator.validate_graph(graph)

    def test_self_approved_object_rejection(self):
        self_approval = {
            "schema_version": "engineering-projection/1",
            "type": "APPROVAL",
            "id": "self:approval:001",
            "revision": 1,
            "subject_id": "PHYSICS",
            "payload": {"reason": "self approval"},
            "dependencies": [
                {
                    "type": "APPROVAL",
                    "id": "self:approval:001",
                    "revision": 1,
                    "sha256": "dummy"
                }
            ],
            "source_lineage_refs": [],
            "status": "CANDIDATE"
        }
        # Self-approval creates cycle A -> A, which is caught either as cycle or self-approval
        validator = ObjectGraphValidator(demo_mode=False)
        with self.assertRaises(GraphValidationError):
            validator.validate_graph([self_approval])

    def test_typed_edge_violation_rejection(self):
        graph = copy.deepcopy(self.fixture_graph)
        # Force ASSESSMENT to depend on LESSON instead of QUESTION
        assessment = graph[1]
        lesson_digest = compute_object_digest(graph[3])
        assessment["dependencies"] = [
            {
                "type": "LESSON",
                "id": "demo:l:001",
                "revision": 1,
                "sha256": lesson_digest
            }
        ]
        validator = ObjectGraphValidator(demo_mode=True)
        with self.assertRaisesRegex(GraphValidationError, "typed edge violation"):
            validator.validate_graph(graph)

    def test_cross_subject_violation_rejection(self):
        graph = copy.deepcopy(self.fixture_graph)
        # Change QUESTION subject to CHEMISTRY while dependent ASSESSMENT remains PHYSICS
        graph[0]["subject_id"] = "CHEMISTRY"
        new_q_digest = compute_object_digest(graph[0])
        # Update references with new digest so it fails specifically on cross-subject check
        for obj in graph[1:]:
            for dep in obj["dependencies"]:
                if dep["id"] == "demo:q:001":
                    dep["sha256"] = new_q_digest
        validator = ObjectGraphValidator(demo_mode=True)
        with self.assertRaisesRegex(GraphValidationError, "cross-subject violation"):
            validator.validate_graph(graph)

    def test_unrelated_changes_do_not_invalidate_others(self):
        graph = copy.deepcopy(self.fixture_graph)
        validator = ObjectGraphValidator(demo_mode=True)
        self.assertEqual(validator.validate_graph(graph), 8)

        # Add an independent synthetic question node
        independent_node = {
            "schema_version": "engineering-projection/1",
            "type": "QUESTION",
            "id": "independent:q:002",
            "revision": 1,
            "subject_id": "PHYSICS",
            "payload": {"stem": "What is energy?"},
            "dependencies": [],
            "source_lineage_refs": [],
            "status": "SYNTHETIC"
        }
        graph.append(independent_node)
        self.assertEqual(validator.validate_graph(graph), 9)

if __name__ == "__main__":
    unittest.main()
