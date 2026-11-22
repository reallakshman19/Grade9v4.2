"""
tests/test_lot_engine.py
Unit & Behavioral Tests for QuestionLotEngine using standard unittest.
"""

import json
import unittest
from pathlib import Path
import sys

# Ensure src is on path
root_dir = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(root_dir / "src"))

from grade9build.lot_engine import QuestionLotEngine, LotValidationError

FIXTURE_PATH = Path(__file__).resolve().parents[1] / "fixtures/synthetic/sample_lot_30_circles.json"

class TestQuestionLotEngine(unittest.TestCase):

    def setUp(self):
        self.data = json.loads(FIXTURE_PATH.read_text(encoding="utf-8"))

    def test_lot_validation_success(self):
        engine = QuestionLotEngine(self.data)
        report = engine.validate_batch()

        self.assertEqual(report["status"], "VALID")
        self.assertEqual(report["question_count"], 30)
        self.assertEqual(report["distribution"]["D1"], 7)
        self.assertEqual(report["distribution"]["D2"], 12)
        self.assertEqual(report["distribution"]["D3"], 8)
        self.assertEqual(report["distribution"]["D4"], 3)

    def test_lot_validation_fails_on_wrong_count(self):
        self.data["questions"] = self.data["questions"][:25]  # 25 instead of 30
        engine = QuestionLotEngine(self.data)

        with self.assertRaises(LotValidationError) as ctx:
            engine.validate_batch()
        self.assertIn("Batch size violation", str(ctx.exception))

    def test_lot_validation_fails_on_score_mismatch(self):
        self.data["questions"][0]["difficulty_score"] = 99
        engine = QuestionLotEngine(self.data)

        with self.assertRaises(LotValidationError) as ctx:
            engine.validate_batch()
        self.assertIn("Score component mismatch", str(ctx.exception))

    def test_lot_validation_fails_on_deprecated_demand(self):
        self.data["questions"][0]["qrt_demand"] = "CALCULATE"
        engine = QuestionLotEngine(self.data)

        with self.assertRaises(LotValidationError) as ctx:
            engine.validate_batch()
        self.assertIn("CALCULATE", str(ctx.exception))

    def test_core1a_scaffolding(self):
        engine = QuestionLotEngine(self.data)
        core1a = engine.scaffold_core1a()

        self.assertEqual(core1a["schema_version"], "grade9v3-core1a-construction/v1")
        self.assertEqual(len(core1a["units"]), 9)
        self.assertEqual(len(core1a["linked_core2_refs"]), 30)
        self.assertEqual(len(core1a["structural_concept_ontology"]), 5)
        self.assertEqual(len(core1a["cognitive_conflict_matrix"]), 6)

    def test_core1b_scaffolding(self):
        engine = QuestionLotEngine(self.data)
        core1b = engine.scaffold_core1b()

        self.assertEqual(core1b["schema_version"], "grade9v3-core1b-reconstruction/v1")
        self.assertEqual(core1b["answer_before_attempt"], "FORBIDDEN")
        self.assertEqual(len(core1b["structural_reconstruction_scenarios"]), 4)

    def test_export_unified_entries(self):
        engine = QuestionLotEngine(self.data)
        entries = engine.export_unified_entries()

        self.assertEqual(len(entries), 30)
        for e in entries:
            self.assertEqual(e["status"], "RELEASED")
            self.assertEqual(e["keyState"], "WITHHELD_CLIENT_SIDE_FAULT_N09")
            self.assertEqual(e["subjectCode"], "MATH")
            self.assertEqual(e["topicCode"], "CIRCLES")
            self.assertEqual(len(e["options"]), 4)
            self.assertEqual(len(e["hints"]), 3)

if __name__ == "__main__":
    unittest.main()
