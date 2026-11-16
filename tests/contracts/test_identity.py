"""Unit and Contract Test Suite for Identity and Occurrence Schemas (Workpack A06)."""

import json
import re
import unittest
from pathlib import Path

REPO_ROOT = Path("D:/CodeD/g9v4.2")
EXACT_REF_SCHEMA_PATH = REPO_ROOT / "schemas/platform/exact-ref.schema.json"
IDENTITY_SCHEMA_PATH = REPO_ROOT / "schemas/platform/identity.schema.json"

class TestIdentityAndOccurrenceSchemas(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        with open(EXACT_REF_SCHEMA_PATH, "r", encoding="utf-8") as f:
            cls.exact_ref_schema = json.load(f)
        with open(IDENTITY_SCHEMA_PATH, "r", encoding="utf-8") as f:
            cls.identity_schema = json.load(f)

    def validate_exact_ref(self, ref):
        required = set(self.exact_ref_schema["required"])
        self.assertEqual(set(ref.keys()), required)
        self.assertIn(ref["type"], self.exact_ref_schema["properties"]["type"]["enum"])
        self.assertTrue(re.match(self.exact_ref_schema["properties"]["id"]["pattern"], ref["id"]))
        self.assertGreaterEqual(ref["revision"], 1)
        self.assertTrue(re.match(self.exact_ref_schema["properties"]["sha256"]["pattern"], ref["sha256"]))

    def validate_identity(self, record):
        required = set(self.identity_schema["required"])
        self.assertEqual(set(record.keys()), required)
        self.assertTrue(re.match(self.identity_schema["properties"]["logical_id"]["pattern"], record["logical_id"]))
        self.assertTrue(re.match(self.identity_schema["properties"]["occurrence_id"]["pattern"], record["occurrence_id"]))
        self.assertTrue(re.match(self.identity_schema["properties"]["snapshot_id"]["pattern"], record["snapshot_id"]))
        self.validate_exact_ref(record["source_ref"])
        self.assertTrue(re.match(r"^[0-9a-f]{64}$", record["occurrence_digest"]))
        self.assertIn(record["status"], self.identity_schema["properties"]["status"]["enum"])

        merge = record["merge_decision"]
        self.assertIn(merge["decision_type"], self.identity_schema["properties"]["merge_decision"]["properties"]["decision_type"]["enum"])
        if merge["decision_type"] == "APPROVED_MERGE":
            self.assertIsNotNone(merge["authorizer"], "Approved merge must have explicit authorizer")
            self.assertIsNotNone(merge["justification"], "Approved merge must have explicit justification")

    def test_valid_exact_ref_fixture(self):
        ref = {
            "type": "QUESTION",
            "id": "phys.motion.q101",
            "revision": 1,
            "sha256": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
        }
        self.validate_exact_ref(ref)

    def test_exact_ref_rejects_malformed_hashes(self):
        bad_hashes = [
            "not-a-hash",
            "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b85",   # 63 chars
            "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b8555",  # 65 chars
            "E3B0C44298FC1C149AFBF4C8996FB92427AE41E4649B934CA495991B7852B855"   # uppercase
        ]
        pattern = self.exact_ref_schema["properties"]["sha256"]["pattern"]
        for bh in bad_hashes:
            self.assertIsNone(re.match(pattern, bh), f"Should reject invalid sha256: {bh}")

    def test_exact_ref_rejects_invalid_type(self):
        allowed_types = set(self.exact_ref_schema["properties"]["type"]["enum"])
        self.assertNotIn("UNKNOWN_CONTAINER", allowed_types)
        self.assertNotIn("UNIVERSAL_CONTAINER", allowed_types)

    def test_valid_identity_fixture_unmerged(self):
        record = {
            "logical_id": "math.circle.theorems.crux",
            "occurrence_id": "math.circle.theorems.crux#1",
            "snapshot_id": "grade9v35:8a02a8eb23ea37a7d8acb74d1bc193dd17657e5b",
            "legacy_aliases": [
                "Mathematics/research/circle_geometry.json#item42",
                "NSEJS_2024_MATH_Q14"
            ],
            "source_ref": {
                "type": "QUESTION",
                "id": "math.circle.theorems.crux",
                "revision": 1,
                "sha256": "4b227777d4dd1fc61c6f884f48641d02b4d121d3fd328cb08b5531fcacdabf8a"
            },
            "occurrence_digest": "4b227777d4dd1fc61c6f884f48641d02b4d121d3fd328cb08b5531fcacdabf8a",
            "merge_decision": {
                "decision_type": "UNMERGED",
                "authorizer": None,
                "justification": None,
                "related_occurrences": []
            },
            "status": "CANDIDATE"
        }
        self.validate_identity(record)

    def test_valid_identity_fixture_approved_merge(self):
        record = {
            "logical_id": "chem.bonding.hybridization",
            "occurrence_id": "chem.bonding.hybridization#2",
            "snapshot_id": "grade9v41:564ad2a07fddc0fdd30d103674b3eca61235a54b",
            "legacy_aliases": ["chem_bonding_suite_q07", "NSEJS_2023_CHEM_07"],
            "source_ref": {
                "type": "QUESTION",
                "id": "chem.bonding.hybridization",
                "revision": 2,
                "sha256": "ef2d127de37b942baad06145e54b0c619a1f22327b2ebbcfbec78f5564afe39d"
            },
            "occurrence_digest": "ef2d127de37b942baad06145e54b0c619a1f22327b2ebbcfbec78f5564afe39d",
            "merge_decision": {
                "decision_type": "APPROVED_MERGE",
                "authorizer": "ACADEMIC_AUTHORITY",
                "justification": "Exact byte match and pedagogical equivalence confirmed in ADR-A05-01",
                "related_occurrences": ["chem.bonding.hybridization#1"]
            },
            "status": "ACTIVE"
        }
        self.validate_identity(record)

    def test_rejection_of_unauthorized_merge(self):
        bad_merge_record = {
            "logical_id": "phy.kin.motion1d",
            "occurrence_id": "phy.kin.motion1d#1",
            "snapshot_id": "grade9v35:8a02a8eb23ea37a7d8acb74d1bc193dd17657e5b",
            "legacy_aliases": ["old_kin_1d"],
            "source_ref": {
                "type": "QUESTION",
                "id": "phy.kin.motion1d",
                "revision": 1,
                "sha256": "1111111111111111111111111111111111111111111111111111111111111111"
            },
            "occurrence_digest": "1111111111111111111111111111111111111111111111111111111111111111",
            "merge_decision": {
                "decision_type": "APPROVED_MERGE",
                "authorizer": None,  # Unauthorized: missing required authorizer
                "justification": None,
                "related_occurrences": []
            },
            "status": "HOLD"
        }
        with self.assertRaises(AssertionError):
            self.validate_identity(bad_merge_record)

    def test_duplicate_occurrence_id_detection(self):
        collection = [
            {"occurrence_id": "phys.force.friction#1"},
            {"occurrence_id": "phys.force.friction#2"},
            {"occurrence_id": "phys.force.friction#1"}  # Duplicate!
        ]
        seen = set()
        duplicates = []
        for item in collection:
            oid = item["occurrence_id"]
            if oid in seen:
                duplicates.append(oid)
            seen.add(oid)
        self.assertEqual(duplicates, ["phys.force.friction#1"])

if __name__ == "__main__":
    unittest.main()
