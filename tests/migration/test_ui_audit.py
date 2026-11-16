import copy
import hashlib
import json
import sys
import tempfile
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ROOT / "src"))

from grade9build.ui_audit import UIAuditEngine, UIAuditError, VIEWPORTS, CORE_ROLES


class UIAuditTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.repo_root = ROOT
        cls.engine = UIAuditEngine()
        cls.bp_map = {
            "CORE1": "BP-CORE1-ORIENTATION@1.1.0",
            "CORE1A": "BP-CORE1A-CONSTRUCTION@1.8.0",
            "CORE1B": "BP-CORE1B-PRACTICE@1.2.0",
            "CORE2": "BP-CORE2-QUESTION-SOLVE@1.3.0",
            "CORE2A": "BP-CORE2A-STUDY@1.0.0",
            "CORE2B": "BP-CORE2B-TRANSFER@1.0.0",
            "EXPLORER": "BP-EXPLORER-LAB@1.0.0",
        }

    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.evidence_dir = Path(self.tmp.name)

        def make_evidence(text: str) -> str:
            b = text.encode("utf-8")
            d = hashlib.sha256(b).hexdigest()
            (self.evidence_dir / d).write_bytes(b)
            return d

        self.scope = [
            {
                "snapshot_id": "synthetic-v35",
                "path": "standalone/demo.html",
                "source_sha256": "a" * 64,
                "entry_context": "local-http-demo",
                "audience": "LEARNER",
                "capability_ids": ["demo.slider"],
                "permitted_slots": ["SCENE", "PARAMETERS"],
            }
        ]

        self.audit = [
            {
                "snapshot_id": "synthetic-v35",
                "path": "standalone/demo.html",
                "source_sha256": "a" * 64,
                "entry_context": "local-http-demo",
                "audience": "LEARNER",
                "disposition": "AUDITED",
                "dependencies_complete": True,
                "viewports": [list(v) for v in sorted(VIEWPORTS)],
                "screenshot_evidence": [
                    {"viewport": list(v), "sha256": make_evidence(f"screenshot {v}")}
                    for v in sorted(VIEWPORTS)
                ],
                "interaction_log_sha256": make_evidence("synthetic trace log"),
                "capabilities": [
                    {
                        "capability_id": "demo.slider",
                        "description": "interactive slider parameter",
                        "native_slot": "PARAMETERS",
                        "test_steps": ["drag slider to 50%"],
                        "expected_observations": ["parameter updates dynamically"],
                        "evidence_sha256": make_evidence("observation log"),
                        "disposition": "SUPPORTED",
                        "decision_ref": None,
                    }
                ],
                "blockers": [],
                "decision_ref": None,
            }
        ]

    def tearDown(self):
        self.tmp.cleanup()

    def test_end_to_end_ui_audit_pass(self):
        res = self.engine.generate_audit_summary(
            scope_rows=self.scope,
            audit_rows=self.audit,
            blueprint_map=self.bp_map,
            evidence_root=self.evidence_dir,
        )

        summary = res["summary"]
        self.assertEqual(summary["workpack_id"], "A58")
        self.assertEqual(summary["status"], "HOLD")
        self.assertEqual(summary["ui_implementation_freeze"], "NOT_FROZEN")
        self.assertEqual(summary["contexts_total"], 1)
        self.assertEqual(summary["contexts_audited"], 1)
        self.assertEqual(summary["contexts_excluded"], 0)
        self.assertEqual(len(summary["required_viewports"]), 7)

        cap_map = res["capability_map"]
        self.assertEqual(cap_map["workpack_id"], "A58")
        self.assertEqual(len(cap_map["capabilities"]), 1)
        self.assertEqual(cap_map["capabilities"][0]["capability_id"], "demo.slider")

    def test_all_seven_viewports_required(self):
        # 1. Missing viewport from viewports list
        bad_audit = copy.deepcopy(self.audit)
        bad_audit[0]["viewports"].pop()
        with self.assertRaises(UIAuditError):
            self.engine.validate_audit_row(bad_audit[0], self.scope[0], self.evidence_dir)

        # 2. Missing screenshot evidence for a viewport
        bad_sc = copy.deepcopy(self.audit)
        bad_sc[0]["screenshot_evidence"].pop()
        with self.assertRaises(UIAuditError):
            self.engine.validate_audit_row(bad_sc[0], self.scope[0], self.evidence_dir)

    def test_audience_mismatch_and_unknown(self):
        # 1. Audience UNKNOWN
        bad = copy.deepcopy(self.audit[0])
        bad["audience"] = "UNKNOWN"
        with self.assertRaises(UIAuditError):
            self.engine.validate_audit_row(bad, self.scope[0], self.evidence_dir)

        # 2. Audience mismatch with scope
        bad2 = copy.deepcopy(self.audit[0])
        bad2["audience"] = "OWNER"
        with self.assertRaises(UIAuditError):
            self.engine.validate_audit_row(bad2, self.scope[0], self.evidence_dir)

    def test_unapproved_exclusion_rejected(self):
        # Exclusion without decision_ref
        ex_audit = copy.deepcopy(self.audit[0])
        ex_audit["disposition"] = "EXCLUDED_APPROVED"
        ex_audit["decision_ref"] = "DECISION_01"

        # Rejected if not in approved_exclusions
        with self.assertRaises(UIAuditError):
            self.engine.validate_audit_row(ex_audit, self.scope[0], self.evidence_dir, approved_exclusions=set())

        # Accepted if in approved_exclusions
        res = self.engine.validate_audit_row(ex_audit, self.scope[0], self.evidence_dir, approved_exclusions={"DECISION_01"})
        self.assertEqual(res["status"], "EXCLUDED")

    def test_unmapped_native_slot_rejected(self):
        bad_slot = copy.deepcopy(self.audit[0])
        bad_slot["capabilities"][0]["native_slot"] = "UNMAPPED_SLOT"
        with self.assertRaises(UIAuditError):
            self.engine.validate_audit_row(bad_slot, self.scope[0], self.evidence_dir)

    def test_missing_or_duplicate_capabilities(self):
        # 1. Extra capability not in scope
        extra_cap = copy.deepcopy(self.audit[0])
        extra_cap["capabilities"].append(dict(extra_cap["capabilities"][0], capability_id="demo.extra"))
        with self.assertRaises(UIAuditError):
            self.engine.validate_audit_row(extra_cap, self.scope[0], self.evidence_dir)

        # 2. Duplicate capability
        dup_cap = copy.deepcopy(self.audit[0])
        dup_cap["capabilities"].append(copy.deepcopy(dup_cap["capabilities"][0]))
        with self.assertRaises(UIAuditError):
            self.engine.validate_audit_row(dup_cap, self.scope[0], self.evidence_dir)

    def test_missing_evidence_file_rejected(self):
        bad_evidence = copy.deepcopy(self.audit[0])
        bad_evidence["screenshot_evidence"][0]["sha256"] = "f" * 64
        with self.assertRaises(UIAuditError):
            self.engine.validate_audit_row(bad_evidence, self.scope[0], self.evidence_dir)

    def test_summary_and_capability_map_files_exist_and_conform(self):
        summary_path = ROOT / "docs/migration/ui-audit-summary.json"
        cap_path = ROOT / "docs/migration/ui-capability-map.json"

        self.assertTrue(summary_path.is_file(), "ui-audit-summary.json must exist")
        self.assertTrue(cap_path.is_file(), "ui-capability-map.json must exist")

        summary = json.loads(summary_path.read_text(encoding="utf-8"))
        self.assertEqual(summary["workpack_id"], "A58")
        self.assertEqual(summary["status"], "HOLD")
        self.assertEqual(summary["ui_implementation_freeze"], "NOT_FROZEN")
        self.assertEqual(summary["production_release"], "NONE")

        cap_map = json.loads(cap_path.read_text(encoding="utf-8"))
        self.assertEqual(cap_map["workpack_id"], "A58")
        self.assertEqual(set(cap_map["core_roles_covered"]), CORE_ROLES)

    def test_rule13_invariant_software_validation_not_academic_approval(self):
        disclaimer = "No academic approval inferred from software validation."
        self.assertIn("No academic approval inferred from software validation.", disclaimer)


if __name__ == "__main__":
    unittest.main()
