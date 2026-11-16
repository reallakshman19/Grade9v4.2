"""Contract and unit tests for Workpack A09 migration adapters and route ledger."""
import json
import unittest
from pathlib import Path
import sys

# Ensure src is on python path
SRC_DIR = Path(__file__).resolve().parent.parent.parent / "src"
if str(SRC_DIR) not in sys.path:
    sys.path.insert(0, str(SRC_DIR))

from grade9build.importers import (
    BaseImporter,
    ImporterError,
    MissingFigureError,
    DefaultClassificationForbiddenError,
    InvalidClaimStatusError,
    UnknownRouteError,
    QuestionImporter,
    CoreRoleImporter,
)
from grade9build.reconcile import RouteLedger, ReconciliationEngine


class TestMigrationAdaptersAndRouteLedger(unittest.TestCase):
    """Test suite covering field equivalence, route tombstones, and fail-closed security rules."""

    def setUp(self):
        self.question_importer = QuestionImporter(population_id="LEGACY_267")
        self.role_importer = CoreRoleImporter(population_id="LEGACY_267")
        self.route_ledger = RouteLedger()

    def test_field_equivalence_and_conservation(self):
        """Approved field mappings preserve source values and maintain 100% leaf conservation."""
        raw_record = {
            "id": "Q-GEO-042",
            "stem": "In triangle ABC, AB = AC. Prove angles B and C are congruent.",
            "options": [
                {"id": "opt_a", "text": "Angle B = Angle C"},
                {"id": "opt_b", "text": "Angle B != Angle C"}
            ],
            "answer": "opt_a",
            "op": "SYNTHESIZE",
            "band": "B2",
            "score": 1.0,
            "crux": "isosceles base angles theorem",
            "unmapped_custom_field": "confidential_author_notes"
        }

        envelope = self.question_importer.import_question(
            raw_record=raw_record,
            source_path="v35/content/geometry.json",
            json_pointer="/items/0",
        )

        # Field equivalence verification
        self.assertEqual(envelope["identity"]["legacy_alias"], "Q-GEO-042")
        self.assertEqual(envelope["payload"]["stem"], raw_record["stem"])
        self.assertEqual(len(envelope["payload"]["options"]), 2)
        self.assertEqual(envelope["assessment"]["raw_claim"], "opt_a")
        self.assertEqual(envelope["assessment"]["claim_status"], "HOLD")
        self.assertEqual(envelope["qrt"]["op"], "SYNTHESIZE")
        self.assertEqual(envelope["qrt"]["band"], "B2")
        self.assertEqual(envelope["qrt"]["score"], 1.0)
        self.assertEqual(envelope["qrt"]["crux"], "isosceles base angles theorem")

        # Unmapped fields conserved in private_raw_record
        self.assertIn("unmapped_custom_field", envelope["private_raw_record"])
        self.assertEqual(envelope["private_raw_record"]["unmapped_custom_field"], "confidential_author_notes")

    def test_source_hash_verification_and_tamper_rejection(self):
        """Importer validates raw source hash and rejects tampered data."""
        raw_record = {"id": "Q-001", "stem": "Test question"}
        correct_hash = BaseImporter.compute_raw_hash(raw_record)

        # Valid hash passes
        envelope = self.question_importer.import_question(
            raw_record=raw_record,
            source_path="test.json",
            json_pointer="/0",
            expected_source_hash=correct_hash
        )
        self.assertEqual(envelope["lineage"]["raw_source_hash"], correct_hash)

        # Tampered hash rejected
        tampered_hash = "0" * 64
        with self.assertRaises(ImporterError):
            self.question_importer.import_question(
                raw_record=raw_record,
                source_path="test.json",
                json_pointer="/0",
                expected_source_hash=tampered_hash
            )

    def test_candidate_claims_remain_raw_hold(self):
        """Candidate claims cannot be auto-verified on import and must remain raw HOLD."""
        raw_with_promoted_status = {
            "id": "Q-002",
            "stem": "Solve for x",
            "answer": {"value": 42, "status": "VERIFIED"}
        }

        with self.assertRaises(InvalidClaimStatusError):
            self.question_importer.import_question(
                raw_record=raw_with_promoted_status,
                source_path="test.json",
                json_pointer="/0"
            )

        # Reconciler rejects non-HOLD envelope status
        envelope = self.question_importer.import_question(
            raw_record={"id": "Q-003", "stem": "Simple stem"},
            source_path="test.json",
            json_pointer="/0"
        )
        ReconciliationEngine.audit_candidate_claims(envelope)

        envelope["status"] = "ACCEPTED"
        with self.assertRaises(InvalidClaimStatusError):
            ReconciliationEngine.audit_candidate_claims(envelope)

    def test_missing_mandatory_figure_fails_closed_n07(self):
        """Missing mandatory source figure triggers immediate fail-closed rejection (N07)."""
        raw_with_figure = {
            "id": "Q-FIG-001",
            "stem": "Refer to Figure 1 below.",
            "source_figures": [
                {"id": "fig_001.svg", "mandatory": True}
            ]
        }

        # Fails when asset is missing
        with self.assertRaises(MissingFigureError):
            self.question_importer.import_question(
                raw_record=raw_with_figure,
                source_path="test.json",
                json_pointer="/0",
                available_assets={}
            )

        # Passes when asset is provided
        envelope = self.question_importer.import_question(
            raw_record=raw_with_figure,
            source_path="test.json",
            json_pointer="/0",
            available_assets={"fig_001.svg": b"<svg></svg>"}
        )
        self.assertEqual(len(envelope["asset_claims"]), 1)
        self.assertEqual(envelope["asset_claims"][0]["classification"], "PRESENT")

    def test_default_classification_forbidden(self):
        """Unknown QRT fields remain unknown; injecting fallback defaults raises error."""
        raw_unknown_qrt = {
            "id": "Q-RAW-001",
            "stem": "Unclassified legacy problem"
        }

        envelope = self.question_importer.import_question(
            raw_record=raw_unknown_qrt,
            source_path="test.json",
            json_pointer="/0"
        )
        # Unknown fields are not populated with default values
        self.assertNotIn("op", envelope["qrt"])
        self.assertNotIn("band", envelope["qrt"])
        self.assertNotIn("score", envelope["qrt"])

        # Injected default fallback rejected
        raw_with_injected_default = {
            "id": "Q-RAW-002",
            "stem": "Question with fallback flag",
            "_has_default_fallback": True
        }
        with self.assertRaises(DefaultClassificationForbiddenError):
            self.question_importer.import_question(
                raw_record=raw_with_injected_default,
                source_path="test.json",
                json_pointer="/0"
            )

    def test_multiple_choice_duplicate_option_rejection_n12(self):
        """Multiple choice options with duplicate IDs are rejected (N12)."""
        raw_duplicate_options = {
            "id": "Q-MC-001",
            "stem": "What is 2 + 2?",
            "options": [
                {"id": "A", "text": "4"},
                {"id": "A", "text": "Four"}
            ]
        }

        with self.assertRaises(ImporterError) as ctx:
            self.question_importer.import_question(
                raw_record=raw_duplicate_options,
                source_path="test.json",
                json_pointer="/0"
            )
        self.assertIn("Duplicate option ID 'A'", str(ctx.exception))

    def test_multiple_choice_option_order_preservation(self):
        """Option order and attributes are preserved verbatim."""
        options = [
            {"id": "opt_3", "text": "Third"},
            {"id": "opt_1", "text": "First"},
            {"id": "opt_2", "text": "Second"}
        ]
        raw_record = {
            "id": "Q-MC-002",
            "stem": "Order test",
            "options": options
        }

        envelope = self.question_importer.import_question(
            raw_record=raw_record,
            source_path="test.json",
            json_pointer="/0"
        )
        self.assertEqual(envelope["payload"]["options"], options)

    def test_population_segregation(self):
        """Importer segregates 267 legacy vs 288 candidate populations."""
        importer_267 = QuestionImporter(population_id="LEGACY_267")
        importer_288 = QuestionImporter(population_id="CANDIDATE_288")

        env_267 = importer_267.import_question({"id": "Q1", "stem": "S1"}, "v35.json", "/0")
        env_288 = importer_288.import_question({"id": "Q1", "stem": "S1"}, "v41.json", "/0")

        self.assertEqual(env_267["identity"]["population_id"], "LEGACY_267")
        self.assertEqual(env_288["identity"]["population_id"], "CANDIDATE_288")
        self.assertNotEqual(env_267["identity"]["population_id"], env_288["identity"]["population_id"])

        # Invalid population rejected
        with self.assertRaises(ImporterError):
            QuestionImporter(population_id="UNAUTHORIZED_POPULATION")

    def test_unknown_route_fails_closed(self):
        """Unregistered or unknown route raises UnknownRouteError."""
        with self.assertRaises(UnknownRouteError):
            self.route_ledger.resolve_route("/unregistered/unknown/test-endpoint")

    def test_route_tombstone_resolution(self):
        """Deprecated routes correctly resolve to TOMBSTONE with reasons and quarantine refs."""
        res = self.route_ledger.resolve_route("/legacy/v35/flash-player.html")
        self.assertEqual(res["route_type"], "TOMBSTONE")
        self.assertEqual(res["status"], "TOMBSTONE")
        self.assertEqual(res["reason"], "OBSOLETE_FLASH_PLUGIN_DEPRECATED")
        self.assertIn("quarantine_ref", res)

    def test_core_role_importer_and_blueprint_binding(self):
        """CoreRoleImporter binds roles to registered blueprints with unresolved mode conflict."""
        role_env = self.role_importer.import_role_configuration(
            role_id="CORE1A",
            blueprint_id="BP-CORE1A-CONSTRUCTION@1.8.0",
            layout_mode="READING_CONSTRUCTION",
            slot_bindings={"reading_prose": "doc_ref_1"},
            source_path="roles/core1a.json",
            json_pointer="/role",
        )

        self.assertEqual(role_env["status"], "HOLD")
        self.assertEqual(role_env["payload"]["role"], "CORE1A")
        self.assertEqual(role_env["payload"]["blueprint_id"], "BP-CORE1A-CONSTRUCTION@1.8.0")
        self.assertEqual(role_env["payload"]["mode_conflict"], "UNRESOLVED_PENDING_OWNER_DECISION")

    def test_core1_role_never_accepts_source_question(self):
        """CORE1 role strictly rejects source question authority."""
        with self.assertRaises(ImporterError) as ctx:
            self.role_importer.import_role_configuration(
                role_id="CORE1",
                blueprint_id="BP-CORE1-ORIENTATION@1.1.0",
                layout_mode="READING_ORIENTATION",
                slot_bindings={"source_question_authority": True},
                source_path="roles/core1.json",
                json_pointer="/role",
            )
        self.assertIn("CORE1 role must never accept source question as authority", str(ctx.exception))

    def test_private_output_vs_public_safe_projection_n09(self):
        """Public projection strictly withholds raw answers and private fields (N09)."""
        raw_record = {
            "id": "Q-CONFIDENTIAL-01",
            "stem": "Exam question with protected answer",
            "options": [{"id": "1", "text": "Secret answer"}],
            "answer": "1",
            "private_examiner_notes": "Do not disclose before release"
        }

        envelope = self.question_importer.import_question(
            raw_record=raw_record,
            source_path="exams.json",
            json_pointer="/0"
        )

        # Private report contains all fields
        private_report = ReconciliationEngine.generate_private_custody_report([envelope])
        self.assertEqual(private_report["total_records"], 1)
        self.assertIn("private_examiner_notes", private_report["records"][0]["private_raw_record"])
        self.assertEqual(private_report["records"][0]["assessment"]["raw_claim"], "1")

        # Public projection withholds confidential fields
        public_proj = ReconciliationEngine.generate_public_safe_projection([envelope])
        self.assertEqual(public_proj["total_records"], 1)
        proj_item = public_proj["projections"][0]
        self.assertNotIn("private_raw_record", proj_item)
        self.assertNotIn("assessment", proj_item)
        self.assertEqual(proj_item["status"], "HOLD")
        self.assertEqual(proj_item["payload"]["options"][0]["text"], "[PROTECTED_OPTION]")


if __name__ == "__main__":
    unittest.main()
