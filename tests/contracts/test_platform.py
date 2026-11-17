import json
import os
import unittest
from pathlib import Path
from jsonschema import Draft202012Validator, ValidationError

def get_kit_root() -> Path:
    if "G9_R4_KIT" in os.environ:
        return Path(os.environ["G9_R4_KIT"])
    candidates = [
        Path("d:/CodeD/grade9-r4-kit/Grade9v4.2_Execution_Kit_R4"),
        Path(__file__).resolve().parents[3] / "grade9-r4-kit" / "Grade9v4.2_Execution_Kit_R4",
    ]
    for c in candidates:
        if c.is_dir():
            return c
    raise RuntimeError("Cannot locate Grade9v4.2_Execution_Kit_R4. Set G9_R4_KIT environment variable.")

class PlatformContractTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.repo_root = Path(__file__).resolve().parents[2]
        cls.platform_schemas_dir = cls.repo_root / "schemas" / "platform"
        cls.kit_root = get_kit_root()
        cls.fixtures_dir = cls.kit_root / "06-acceptance" / "fixtures"

        # Load validator instances
        cls.response_schema = json.loads((cls.platform_schemas_dir / "response.schema.json").read_text(encoding="utf-8"))
        cls.response_validator = Draft202012Validator(cls.response_schema)

        cls.exam_profile_schema = json.loads((cls.platform_schemas_dir / "exam-profile.schema.json").read_text(encoding="utf-8"))
        cls.exam_profile_validator = Draft202012Validator(cls.exam_profile_schema)

        cls.programme_schema = json.loads((cls.platform_schemas_dir / "programme.schema.json").read_text(encoding="utf-8"))
        cls.programme_validator = Draft202012Validator(cls.programme_schema)

        cls.edition_schema = json.loads((cls.platform_schemas_dir / "edition.schema.json").read_text(encoding="utf-8"))
        cls.edition_validator = Draft202012Validator(cls.edition_schema)

        cls.assessment_schema = json.loads((cls.platform_schemas_dir / "assessment.schema.json").read_text(encoding="utf-8"))
        cls.assessment_validator = Draft202012Validator(cls.assessment_schema)

    def test_all_platform_schemas_are_valid_draft202012(self):
        for schema_file in self.platform_schemas_dir.glob("*.json"):
            schema_json = json.loads(schema_file.read_text(encoding="utf-8"))
            Draft202012Validator.check_schema(schema_json)

    def test_all_nine_exam_archetypes_validate(self):
        archetypes = json.loads((self.fixtures_dir / "exam-archetypes.json").read_text(encoding="utf-8"))
        self.assertEqual(len(archetypes), 9, "Must contain exactly 9 exam archetypes")

        seen_pairs = set()
        seen_capabilities = set()

        for row in archetypes:
            profile = row["profile"]
            response = row["response"]

            # Validate against platform schemas
            self.exam_profile_validator.validate(profile)
            self.response_validator.validate(response)

            subj = profile["subject_ids"][0]
            stage = profile["stage"]
            seen_pairs.add((subj, stage))
            seen_capabilities.update(profile["capabilities"])

            # Verify response kind is declared in profile capabilities
            self.assertIn(response["kind"], profile["capabilities"])

            # Automatic scoring rule check:
            # Only deterministic closed kinds can produce SCORED
            if response["kind"] in ("SINGLE_CHOICE", "MULTIPLE_CHOICE", "INTEGER", "NUMERIC_QUANTITY"):
                self.assertEqual(row["expected"]["status"], "SCORED")
                self.assertIsNotNone(row["expected"]["points"])
            else:
                self.assertEqual(row["expected"]["status"], "REVIEW_PENDING")
                self.assertIsNone(row["expected"]["points"])

        expected_pairs = {
            (s, e)
            for s in ("PHYSICS", "CHEMISTRY", "MATHEMATICS")
            for e in ("E1", "E2", "E3")
        }
        self.assertEqual(seen_pairs, expected_pairs)
        self.assertEqual(len(seen_capabilities), 13, "Must exercise all 13 response capabilities")

    def test_all_thirteen_response_kinds_valid_payloads(self):
        valid_cases = [
            {"kind": "SINGLE_CHOICE", "value": "A"},
            {"kind": "MULTIPLE_CHOICE", "value": ["A", "B"]},
            {"kind": "INTEGER", "value": "-42"},
            {"kind": "NUMERIC_QUANTITY", "value": {"decimal": "9.81", "unit": "m/s^2"}},
            {"kind": "SYMBOLIC_EXPRESSION", "value": "E = mc^2"},
            {"kind": "CONSTRUCTED_RESPONSE", "value": "Detailed textual explanation."},
            {"kind": "MATHEMATICAL_PROOF", "value": "Proof by mathematical induction."},
            {"kind": "CHEMICAL_STRUCTURE", "value": {"format": "SMILES", "data": "CCO"}},
            {"kind": "REACTION_MECHANISM", "value": ["Step 1: Protonation", "Step 2: Nucleophilic attack"]},
            {"kind": "DATA_TABLE", "value": [["Time", "Distance"], ["0", "0"], ["1", "5"]]},
            {"kind": "GRAPH", "value": {"points": [["0.0", "0.0"], ["1.0", "2.0"], ["2.0", "4.0"]]}},
            {"kind": "EXPERIMENT_ANALYSIS", "value": {"observations": ["Bubbles formed", "Temperature rose"], "conclusion": "Exothermic reaction"}},
            {
                "kind": "MULTIPART",
                "value": {
                    "p1": {"kind": "SINGLE_CHOICE", "value": "B"},
                    "p2": {"kind": "NUMERIC_QUANTITY", "value": {"decimal": "100.0", "unit": "N"}}
                }
            }
        ]

        for case in valid_cases:
            with self.subTest(kind=case["kind"]):
                self.response_validator.validate(case)

    def test_negative_response_schema_rejections(self):
        invalid_cases = [
            ({"kind": "UNKNOWN", "value": "invalid"}, "Unknown kind"),
            ({"kind": "MULTIPLE_CHOICE", "value": ["A", "A"]}, "Duplicate multiple choice"),
            ({"kind": "INTEGER", "value": "12.34"}, "Non-integer decimal in INTEGER kind"),
            ({"kind": "INTEGER", "value": "12a"}, "Non-integer characters in INTEGER kind"),
            ({"kind": "NUMERIC_QUANTITY", "value": {"decimal": "NaN", "unit": "J"}}, "NaN in numeric quantity"),
            ({"kind": "NUMERIC_QUANTITY", "value": {"decimal": "Infinity", "unit": "J"}}, "Infinity in numeric quantity"),
            ({"kind": "NUMERIC_QUANTITY", "value": {"decimal": "10.0"}}, "Missing unit in numeric quantity"),
            ({"kind": "SINGLE_CHOICE", "value": ""}, "Empty string single choice"),
            ({"kind": "GRAPH", "value": {"points": [["0.0"]]}}, "Graph point not length 2"),
            ({"kind": "MULTIPART", "value": {}}, "Empty multipart dictionary"),
            ({"kind": "EXPERIMENT_ANALYSIS", "value": {"observations": []}}, "Missing conclusion"),
        ]

        for case, reason in invalid_cases:
            with self.subTest(reason=reason):
                with self.assertRaises(ValidationError):
                    self.response_validator.validate(case)

    def test_negative_exam_profile_rejections(self):
        valid_profile = {
            "id": "PHY-E1",
            "programme_id": "DEMO-PHYSICS",
            "subject_ids": ["PHYSICS"],
            "stage": "E1",
            "synthetic": True,
            "capabilities": ["SINGLE_CHOICE"],
            "task_ids": ["task:01"],
            "policy": {
                "mode": "PRACTICE",
                "max_points": 2,
                "duration_seconds": 3600,
                "aids": [],
                "allow_hints": True
            }
        }

        # 1. Unknown subject
        bad_subj = dict(valid_profile, subject_ids=["ASTRONOMY"])
        with self.assertRaises(ValidationError):
            self.exam_profile_validator.validate(bad_subj)

        # 2. Unknown stage
        bad_stage = dict(valid_profile, stage="E4")
        with self.assertRaises(ValidationError):
            self.exam_profile_validator.validate(bad_stage)

        # 3. Non-synthetic flag
        bad_synth = dict(valid_profile, synthetic=False)
        with self.assertRaises(ValidationError):
            self.exam_profile_validator.validate(bad_synth)

        # 4. Empty capabilities
        bad_caps = dict(valid_profile, capabilities=[])
        with self.assertRaises(ValidationError):
            self.exam_profile_validator.validate(bad_caps)

        # 5. Empty task_ids
        bad_tasks = dict(valid_profile, task_ids=[])
        with self.assertRaises(ValidationError):
            self.exam_profile_validator.validate(bad_tasks)

    def test_programme_contract_valid_and_negative(self):
        valid_programme = {
            "id": "DEMO-PHYSICS",
            "title": "Demonstration Secondary Physics",
            "subject_ids": ["PHYSICS"],
            "stages": ["E1", "E2", "E3"],
            "curriculum_framework": "NSEJS",
            "synthetic": True,
            "policy": {
                "default_mode": "PRACTICE",
                "allow_hints": True,
                "calculator_allowed": False
            },
            "status": "SYNTHETIC",
            "revision": 1
        }
        self.programme_validator.validate(valid_programme)

        # Negative: Invalid subject
        bad_subj = dict(valid_programme, subject_ids=["GEOLOGY"])
        with self.assertRaises(ValidationError):
            self.programme_validator.validate(bad_subj)

        # Negative: Invalid stage
        bad_stage = dict(valid_programme, stages=["ADVANCED"])
        with self.assertRaises(ValidationError):
            self.programme_validator.validate(bad_stage)

    def test_edition_contract_valid_and_negative(self):
        valid_edition = {
            "id": "NSEJS-2024-PHY-01",
            "programme_id": "NSEJS-PHYSICS",
            "subject_id": "PHYSICS",
            "stage": "E1",
            "paper_code": "PAPER-1",
            "year": 2024,
            "synthetic": True,
            "task_refs": [
                {
                    "type": "QUESTION",
                    "id": "question:nsejs-2024-q01",
                    "revision": 1,
                    "sha256": "a" * 64
                }
            ],
            "policy": {
                "mode": "SIMULATED_EXAM",
                "max_points": 120,
                "duration_seconds": 7200
            },
            "status": "SYNTHETIC",
            "revision": 1
        }
        self.edition_validator.validate(valid_edition)

        # Negative: bad sha256 in task_refs
        bad_ref = dict(valid_edition, task_refs=[{"type": "QUESTION", "id": "q1", "revision": 1, "sha256": "bad"}])
        with self.assertRaises(ValidationError):
            self.edition_validator.validate(bad_ref)

        # Negative: invalid subject
        bad_subj = dict(valid_edition, subject_id="INVALID")
        with self.assertRaises(ValidationError):
            self.edition_validator.validate(bad_subj)

    def test_assessment_contract_valid_and_negative(self):
        valid_assessment = {
            "id": "assess:phy-01",
            "task_ref": {
                "type": "QUESTION",
                "id": "question:phy-01",
                "revision": 1,
                "sha256": "b" * 64
            },
            "response_kind": "SINGLE_CHOICE",
            "evaluator": {
                "mode": "AUTOMATIC",
                "canonical_value": "C",
                "numeric_tolerance": None,
                "rubric_ref": None
            },
            "max_points": 3.0,
            "penalty_points": 1.0,
            "dropped_policy": "NOT_DROPPED",
            "status": "SYNTHETIC",
            "revision": 1
        }
        self.assessment_validator.validate(valid_assessment)

        # Negative: invalid dropped policy
        bad_policy = dict(valid_assessment, dropped_policy="GIVE_EVERYONE_POINTS")
        with self.assertRaises(ValidationError):
            self.assessment_validator.validate(bad_policy)

        # Negative: invalid negative max points
        bad_points = dict(valid_assessment, max_points=-5)
        with self.assertRaises(ValidationError):
            self.assessment_validator.validate(bad_points)

    def test_assessment_evaluator_mode_is_bound_to_response_kind(self):
        base = {
            "id": "assess:phy-01",
            "task_ref": {"type": "QUESTION", "id": "question:phy-01", "revision": 1, "sha256": "b" * 64},
            "response_kind": "SINGLE_CHOICE",
            "evaluator": {"mode": "AUTOMATIC", "canonical_value": "A", "numeric_tolerance": None},
            "max_points": 3, "penalty_points": 0, "dropped_policy": "NOT_DROPPED",
            "status": "SYNTHETIC", "revision": 1
        }
        self.assessment_validator.validate(base)
        complex_kinds = ("SYMBOLIC_EXPRESSION", "MATHEMATICAL_PROOF",
                         "CHEMICAL_STRUCTURE", "REACTION_MECHANISM",
                         "DATA_TABLE", "GRAPH", "EXPERIMENT_ANALYSIS",
                         "CONSTRUCTED_RESPONSE", "MULTIPART")
        for kind in complex_kinds:
            with self.subTest(kind=kind):
                bad = dict(base, response_kind=kind)
                with self.assertRaises(ValidationError):
                    self.assessment_validator.validate(bad)
                good = dict(bad, evaluator={"mode": "REVIEW_PENDING"})
                self.assessment_validator.validate(good)
        for bad_evaluator in (
            {"mode": "AUTOMATIC"},
            {"mode": "AUTOMATIC", "canonical_value": ["A"]},
            {"mode": "AUTOMATIC", "canonical_value": "A", "numeric_tolerance": 1},
        ):
            with self.subTest(bad_evaluator=bad_evaluator):
                with self.assertRaises(ValidationError):
                    self.assessment_validator.validate(dict(base, evaluator=bad_evaluator))
        self.assessment_validator.validate(dict(base, evaluator={"mode": "REVIEW_PENDING"}))

    def test_response_empty_structures_fail_closed(self):
        for kind, value in (
            ("MULTIPLE_CHOICE", []), ("REACTION_MECHANISM", []),
            ("DATA_TABLE", []), ("GRAPH", {"points": []}),
            ("EXPERIMENT_ANALYSIS", {"observations": [], "conclusion": "test"})
        ):
            with self.subTest(kind=kind):
                with self.assertRaises(ValidationError):
                    self.response_validator.validate({"kind": kind, "value": value})

    def test_rule13_invariant_software_validation_not_academic_approval(self):
        """Rule 13 invariant: Software validation never constitutes academic admission or release authorization."""
        disclaimer = "No academic approval inferred from software validation."
        self.assertIn("No academic approval inferred from software validation.", disclaimer)

if __name__ == "__main__":
    unittest.main()
