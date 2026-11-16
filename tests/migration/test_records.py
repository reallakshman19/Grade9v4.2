"""Unit and Regression Test Suite for Record Inventory and Field Ledger (Workpack A07)."""

import json
import sys
import unittest
from pathlib import Path

SRC_DIR = Path(__file__).resolve().parent.parent.parent / "src"
if str(SRC_DIR) not in sys.path:
    sys.path.insert(0, str(SRC_DIR))

from grade9build.record_inventory import (
    rfc6901_escape,
    extract_leaf_pointers,
    canonical_json_digest,
    RecordOccurrence,
    RecordInventoryEngine
)
from grade9build.field_ledger import FieldLedgerEngine, FieldLedgerAuditError

class TestRecordInventoryAndLedger(unittest.TestCase):
    def test_rfc6901_pointer_escaping(self):
        self.assertEqual(rfc6901_escape("normal"), "normal")
        self.assertEqual(rfc6901_escape("with/slash"), "with~1slash")
        self.assertEqual(rfc6901_escape("with~tilde"), "with~0tilde")
        self.assertEqual(rfc6901_escape("both/and~together"), "both~1and~0together")

    def test_leaf_pointer_extraction(self):
        sample = {
            "a": 1,
            "b": {
                "c/d": "slash_key",
                "e~f": "tilde_key",
                "nested": {
                    "val": True
                }
            },
            "arr": ["first", "second", {"item": 3}],
            "empty_dict": {},
            "empty_list": [],
            "null_val": None
        }
        leaves = dict(extract_leaf_pointers(sample))
        self.assertEqual(leaves["/a"], 1)
        self.assertEqual(leaves["/b/c~1d"], "slash_key")
        self.assertEqual(leaves["/b/e~0f"], "tilde_key")
        self.assertEqual(leaves["/b/nested/val"], True)
        self.assertEqual(leaves["/arr/0"], "first")
        self.assertEqual(leaves["/arr/1"], "second")
        self.assertEqual(leaves["/arr/2/item"], 3)
        self.assertEqual(leaves["/empty_dict"], {})
        self.assertEqual(leaves["/empty_list"], [])
        self.assertIsNone(leaves["/null_val"])

    def test_canonical_json_digest_key_order_independence(self):
        d1 = {"z": 100, "a": "alpha", "m": [1, 2, 3]}
        d2 = {"a": "alpha", "m": [1, 2, 3], "z": 100}
        self.assertEqual(canonical_json_digest(d1), canonical_json_digest(d2))

    def test_field_conservation_positive(self):
        source = {
            "id": "legacy-item-01",
            "stem": "What is momentum?",
            "options": ["A", "B"],
            "metadata": {"custom_tag": "keep_private"},
            "raw_key": "unverified"
        }
        target = {
            "identity": {"legacy_alias": "legacy-item-01"},
            "payload": {
                "stem": "What is momentum?",
                "options": ["A", "B"]
            }
        }
        field_map = [
            {"source": "/id", "disposition": "PRESERVE_EXACT", "target": "/identity/legacy_alias"},
            {"source": "/stem", "disposition": "PRESERVE_EXACT", "target": "/payload/stem"},
            {"source": "/options/0", "disposition": "PRESERVE_EXACT", "target": "/payload/options/0"},
            {"source": "/options/1", "disposition": "PRESERVE_EXACT", "target": "/payload/options/1"},
            {"source": "/metadata/custom_tag", "disposition": "PRESERVED_PRIVATE", "reason": "internal metadata"},
            {"source": "/raw_key", "disposition": "PRESERVED_PRIVATE", "reason": "unverified author claim"}
        ]
        audit = FieldLedgerEngine.audit_field_conservation(source, target, field_map)
        self.assertEqual(audit["status"], "PASS")
        self.assertEqual(audit["total_source_leaves"], 6)
        self.assertEqual(audit["exact_matches"], 4)
        self.assertEqual(audit["preserved_private"], 2)
        self.assertEqual(audit["unmapped_leaves"], 0)

    def test_lost_field_negative_rejection(self):
        source = {"a": 1, "b": 2, "c": 3}
        target = {"a": 1, "b": 2}
        field_map = [
            {"source": "/a", "disposition": "PRESERVE_EXACT", "target": "/a"},
            {"source": "/b", "disposition": "PRESERVE_EXACT", "target": "/b"}
            # Notice: /c is omitted!
        ]
        with self.assertRaisesRegex(FieldLedgerAuditError, "unmapped source fields"):
            FieldLedgerEngine.audit_field_conservation(source, target, field_map)

    def test_value_mismatch_negative_rejection(self):
        source = {"key": "original_value"}
        target = {"key": "tampered_value"}
        field_map = [
            {"source": "/key", "disposition": "PRESERVE_EXACT", "target": "/key"}
        ]
        with self.assertRaisesRegex(FieldLedgerAuditError, "exact field mismatch"):
            FieldLedgerEngine.audit_field_conservation(source, target, field_map)

    def test_duplicate_mapping_negative_rejection(self):
        source = {"key": "value"}
        target = {"key": "value"}
        field_map = [
            {"source": "/key", "disposition": "PRESERVE_EXACT", "target": "/key"},
            {"source": "/key", "disposition": "PRESERVE_EXACT", "target": "/key"}
        ]
        with self.assertRaisesRegex(FieldLedgerAuditError, "duplicate source leaf mapping"):
            FieldLedgerEngine.audit_field_conservation(source, target, field_map)

    def test_missing_private_reason_negative_rejection(self):
        source = {"private_key": 42}
        target = {}
        field_map = [
            {"source": "/private_key", "disposition": "PRESERVED_PRIVATE", "reason": ""}
        ]
        with self.assertRaisesRegex(FieldLedgerAuditError, "missing private reason"):
            FieldLedgerEngine.audit_field_conservation(source, target, field_map)

    def test_population_segregation_267_vs_288(self):
        engine = RecordInventoryEngine()
        # Populate population A (267 occurrences)
        for i in range(267):
            rec = RecordOccurrence(
                snapshot_id="grade9v35:test",
                source_path="legacy/bank.json",
                record_locator=f"/{i}",
                occurrence_id=f"legacy.bank#{i}",
                payload={"question_num": i, "content": f"Problem {i}"},
                population_id="POP-267-LEGACY-BANK"
            )
            engine.add_record(rec)

        # Populate population B (288 occurrences: 50 Phys + 119 Chem + 119 Bio)
        for i in range(288):
            subj = "PHYSICS" if i < 50 else ("CHEMISTRY" if i < 169 else "BIOLOGY")
            rec = RecordOccurrence(
                snapshot_id="grade9v41:test",
                source_path=f"candidates/{subj.lower()}_bank.json",
                record_locator=f"/{i}",
                occurrence_id=f"candidate.{subj.lower()}#{i}",
                payload={"candidate_num": i, "subject": subj},
                population_id="POP-288-CANDIDATE-BANK"
            )
            engine.add_record(rec)

        self.assertEqual(len(engine.populations["POP-267-LEGACY-BANK"]), 267)
        self.assertEqual(len(engine.populations["POP-288-CANDIDATE-BANK"]), 288)
        self.assertEqual(len(engine.records), 555)
        # Ensure zero population ID collision or implicit merging
        pop267_ids = {r.occurrence_id for r in engine.populations["POP-267-LEGACY-BANK"]}
        pop288_ids = {r.occurrence_id for r in engine.populations["POP-288-CANDIDATE-BANK"]}
        self.assertEqual(len(pop267_ids.intersection(pop288_ids)), 0)

    def test_duplicate_occurrence_rejection(self):
        engine = RecordInventoryEngine()
        rec1 = RecordOccurrence(
            snapshot_id="test:snap",
            source_path="path.json",
            record_locator="/0",
            occurrence_id="dup#1",
            payload={"data": 1}
        )
        rec2 = RecordOccurrence(
            snapshot_id="test:snap",
            source_path="path.json",
            record_locator="/1",
            occurrence_id="dup#1",  # Collision!
            payload={"data": 2}
        )
        engine.add_record(rec1)
        with self.assertRaises(ValueError):
            engine.add_record(rec2)

if __name__ == "__main__":
    unittest.main()
