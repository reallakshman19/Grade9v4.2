"""Unit and invariant tests for Native Six-Core and Blueprint Reconciliation (Workpack A57)."""

import unittest
import json
from pathlib import Path

REPO_ROOT = Path("D:/CodeD/g9v4.2")
SIX_CORE_MAP_PATH = REPO_ROOT / "docs/architecture/native-six-core-map.json"
BLUEPRINT_MAP_PATH = REPO_ROOT / "docs/architecture/native-blueprint-map.json"

class TestNativeSixCoreReconciliation(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        with open(SIX_CORE_MAP_PATH, "r", encoding="utf-8") as f:
            cls.six_core = json.load(f)
        with open(BLUEPRINT_MAP_PATH, "r", encoding="utf-8") as f:
            cls.blueprints = json.load(f)

    def test_metadata_and_hold_invariants(self):
        self.assertEqual(self.six_core["workpack_id"], "A57")
        self.assertEqual(self.six_core["status"], "PROPOSED")
        self.assertEqual(self.six_core["academic_admission"], "HOLD")
        self.assertEqual(self.six_core["ui_implementation_freeze"], "LOCKED_UNTIL_A61")
        self.assertEqual(self.blueprints["ui_freeze"], "NOT_GRANTED (LOCKED_UNTIL_A61)")

    def test_all_seven_roles_and_blueprints_present(self):
        roles = {r["role"]: r for r in self.six_core["roles"]}
        expected_roles = {"CORE1", "CORE1A", "CORE1B", "CORE2", "CORE2A", "CORE2B", "EXPLORER"}
        self.assertEqual(set(roles.keys()), expected_roles)

        bp_ids = {b["blueprint_id"] for b in self.blueprints["blueprints"]}
        expected_bps = {
            "BP-CORE1-ORIENTATION@1.1.0",
            "BP-CORE1A-CONSTRUCTION@1.8.0",
            "BP-CORE1B-RECONSTRUCTION@1.1.0",
            "BP-CORE2-SOURCE-QUESTION@1.11.0",
            "BP-CORE2A-SUPPORTED-APPLICATION@1.1.0",
            "BP-CORE2B-TRANSFER@1.1.0",
            "BP-EXPLORER-GCDR@1.0.0"
        }
        self.assertEqual(bp_ids, expected_bps)

    def test_core1_never_accepts_source_question_as_authority(self):
        roles = {r["role"]: r for r in self.six_core["roles"]}
        self.assertEqual(roles["CORE1"]["prohibited_authority"], "SOURCE_QUESTION")
        self.assertEqual(roles["CORE1A"]["prohibited_authority"], "SOURCE_QUESTION")
        self.assertEqual(roles["CORE1B"]["prohibited_authority"], "SOURCE_QUESTION")
        self.assertIn("Canonical", roles["CORE1"]["authority"])
        self.assertIn("Canonical", roles["CORE1A"]["authority"])

    def test_core1b_coverage_matches_core1a_inferential_jump(self):
        roles = {r["role"]: r for r in self.six_core["roles"]}
        c1b_slots = {s["name"]: s for s in roles["CORE1B"]["slots"]}
        self.assertIn("microtopic_binding", c1b_slots)
        self.assertEqual(c1b_slots["microtopic_binding"]["target"], "CORE1A.inferential_jump")

    def test_six_stage_reconstruction_sequence(self):
        roles = {r["role"]: r for r in self.six_core["roles"]}
        c1b_slot_names = [s["name"] for s in roles["CORE1B"]["slots"]]
        expected_sequence = [
            "stage_1_predict",
            "stage_2_attempt",
            "stage_3_reconstruct",
            "stage_4_diagnose",
            "stage_5_repair",
            "stage_6_boundary_test"
        ]
        for stage in expected_sequence:
            self.assertIn(stage, c1b_slot_names)

    def test_core2a_vs_core2b_crux_and_decide_differentiation(self):
        roles = {r["role"]: r for r in self.six_core["roles"]}
        c2a_slots = {s["name"]: s for s in roles["CORE2A"]["slots"]}
        c2b_slots = {s["name"]: s for s in roles["CORE2B"]["slots"]}

        self.assertIn("crux_move_ref", c2a_slots)
        self.assertEqual(
            set(c2a_slots["crux_move_ref"]["allowed_operations"]),
            {"REPRESENT", "CONNECT", "TRANSFORM", "DECIDE"}
        )
        self.assertIn("protected_decide_move", c2b_slots)
        self.assertIn("changed_demand_specification", c2b_slots)

    def test_mode_conflict_recorded(self):
        conflicts = self.six_core.get("governance_conflicts", {})
        self.assertIn("self_study_vs_protected_attempt", conflicts)
        c = conflicts["self_study_vs_protected_attempt"]
        self.assertEqual(c["status"], "UNRESOLVED_PENDING_OWNER_DECISION")
        self.assertIn("STRICT_R2_PROTECTION", c["default_enforcement_rule"])

    def test_subject_adapters_scope_and_biology_hold(self):
        adapters = {a["subject"]: a for a in self.blueprints["subject_adapters"]}
        self.assertEqual(adapters["Physics"]["status"], "ADMITTED_TARGET_SCOPE")
        self.assertEqual(adapters["Chemistry"]["status"], "ADMITTED_TARGET_SCOPE")
        self.assertEqual(adapters["Mathematics"]["status"], "ADMITTED_TARGET_SCOPE")
        self.assertEqual(adapters["Biology"]["status"], "EXTENSION_CAPABLE_HOLD")

if __name__ == "__main__":
    unittest.main()
