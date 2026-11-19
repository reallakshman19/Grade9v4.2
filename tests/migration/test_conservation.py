"""tests/migration/test_conservation.py
Workpack A39: Migration conservation and compatibility verification tests.

Verifies:
1. All 8 conservation counters from dual-source-and-apps.md must be exactly 0 within approved scope.
2. Any unapproved discrepancy or unaccounted item blocks verification.
3. Field conservation audits every leaf with PRESERVE_EXACT or PRESERVED_PRIVATE.
4. Dual-source pins are immutably verified.
5. Summary schema and zero-loss compliance.

No academic approval inferred from software validation.
academic_admission: HOLD
release_authority: NONE
"""

import copy
import json
from pathlib import Path
import sys
import unittest

ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ROOT / "src"))

from grade9build.verify import (
    ConservationChecker,
    ConservationVerificationError,
    CONSERVATION_COUNTERS,
    V35_COMMIT,
    V41_COMMIT,
)


class TestConservationVerification(unittest.TestCase):
    def setUp(self):
        self.checker = ConservationChecker(ROOT)

    def test_dual_source_pins(self):
        valid_pins = {
            "v35_commit": V35_COMMIT,
            "v41_commit": V41_COMMIT,
        }
        self.assertTrue(self.checker.verify_dual_source_pins(valid_pins))

        with self.assertRaises(ConservationVerificationError):
            self.checker.verify_dual_source_pins({"v35_commit": "wrong_commit", "v41_commit": V41_COMMIT})

        with self.assertRaises(ConservationVerificationError):
            self.checker.verify_dual_source_pins({"v35_commit": V35_COMMIT, "v41_commit": "wrong_commit"})

    def test_all_conservation_counters_zero_pass(self):
        records = [{"id": "Q1"}, {"id": "Q2"}]
        search = [{"id": "S1"}]
        apps = [{"context_id": "APP1"}]
        deps = [("A", "B")]
        interactions = [{"id": "INT1"}]
        diffs = [{"id": "DIFF1"}]
        state = [{"key": "SK1"}]
        exclusions = [{"id": "EXCL1"}]

        counters = self.checker.calculate_conservation_counters(
            scope_records=records,
            mapped_records=records,
            search_entries=search,
            search_mappings=search,
            app_contexts=apps,
            mapped_contexts=apps,
            dependency_edges=deps,
            resolved_edges=deps,
            interactions=interactions,
            mapped_interactions=interactions,
            behavior_differences=diffs,
            reviewed_differences=diffs,
            state_mappings=state,
            resolved_state=state,
            exclusions=exclusions,
            approved_exclusions=exclusions,
        )

        for name in CONSERVATION_COUNTERS:
            self.assertEqual(counters[name], 0, f"Counter {name} was not 0")

    def test_unaccounted_discrepancies_block(self):
        records = [{"id": "Q1"}, {"id": "Q2"}]
        mapped = [{"id": "Q1"}]  # Missing Q2!

        counters = self.checker.calculate_conservation_counters(
            scope_records=records,
            mapped_records=mapped,
            search_entries=[],
            search_mappings=[],
            app_contexts=[],
            mapped_contexts=[],
            dependency_edges=[],
            resolved_edges=[],
            interactions=[],
            mapped_interactions=[],
            behavior_differences=[],
            reviewed_differences=[],
            state_mappings=[],
            resolved_state=[],
            exclusions=[],
            approved_exclusions=[],
        )

        self.assertEqual(counters["unaccounted_resource_occurrences"], 1)

    def test_field_conservation_audits(self):
        source = {
            "id": "item1",
            "stem": "Solve for x",
            "meta": {"private_tag": "internal"},
        }
        target = {
            "id": "item1",
            "stem": "Solve for x",
        }
        field_maps = [
            {"source": "/id", "disposition": "PRESERVE_EXACT", "target": "/id"},
            {"source": "/stem", "disposition": "PRESERVE_EXACT", "target": "/stem"},
            {"source": "/meta/private_tag", "disposition": "PRESERVED_PRIVATE", "reason": "internal metadata"},
        ]

        result = self.checker.audit_field_conservation(source, target, field_maps)
        self.assertEqual(result["status"], "PASS")
        self.assertEqual(result["unmapped_leaves"], 0)
        self.assertEqual(result["preserved_exact"], 2)
        self.assertEqual(result["preserved_private"], 1)

    def test_unmapped_field_leaf_fails(self):
        source = {
            "id": "item1",
            "stem": "Solve for x",
            "unmapped_field": 42,
        }
        target = {"id": "item1", "stem": "Solve for x"}
        field_maps = [
            {"source": "/id", "disposition": "PRESERVE_EXACT", "target": "/id"},
            {"source": "/stem", "disposition": "PRESERVE_EXACT", "target": "/stem"},
        ]

        result = self.checker.audit_field_conservation(source, target, field_maps)
        self.assertEqual(result["status"], "FAIL_UNMAPPED_LEAVES")
        self.assertEqual(result["unmapped_leaves"], 1)

    def test_conservation_summary_zero_loss_compliance(self):
        summary = {
            "academic_admission": "HOLD",
            "production_release": "NONE",
            "ui_freeze": "NOT_GRANTED",
            "conservation_counters": {c: 0 for c in CONSERVATION_COUNTERS},
        }
        self.assertTrue(self.checker.verify_conservation_summary(summary))

        # Failure on non-zero counter
        bad_summary = copy.deepcopy(summary)
        bad_summary["conservation_counters"]["missing_dependency_edges"] = 1
        with self.assertRaises(ConservationVerificationError):
            self.checker.verify_conservation_summary(bad_summary)

        # Failure on unauthorized status
        bad_status = copy.deepcopy(summary)
        bad_status["academic_admission"] = "RATIFIED"
        with self.assertRaises(ConservationVerificationError):
            self.checker.verify_conservation_summary(bad_status)


if __name__ == "__main__":
    unittest.main()
