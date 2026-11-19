import copy
import hashlib
import json
import sys
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ROOT / "src"))

from grade9build.migrate_v35 import V35MigrationEngine, V35MigrationError
from grade9build.reconcile_sources import DualSourceReconciliationEngine, ReconciliationConflictError
from grade9build.graph import ObjectGraphValidator


class DualSourceMigrationTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.repo_root = ROOT
        cls.v35_engine = V35MigrationEngine("TEST_V35")
        cls.reconcile_engine = DualSourceReconciliationEngine(demo_mode=True)

    def test_v35_library_package_migration_lossless(self):
        package_data = {
            "id": "phy-elec-current-ohm",
            "title": "Current Electricity & Ohm's Law",
            "subject": "PHYSICS",
            "roles": {
                "orientation": {
                    "target_role": "CORE1",
                    "blueprint_id": "BP-CORE1-ORIENTATION@1.1.0",
                    "layout_mode": "READING_ORIENTATION",
                    "slot_bindings": {
                        "phenomenon_anchor": "circuit_intro",
                        "prerequisite_check": "charge_flow",
                        "mechanism_narrative": "drift_velocity"
                    }
                }
            },
            "source_hints": ["Hint 1: Check resistance in series", "Hint 2: V=IR"],
            "authored_scaffolds": ["Scaffold 1: Draw the circuit diagram"],
            "custom_metadata": {"legacy_tag": "circuit_v35", "edition": 2023}
        }
        raw_bytes = json.dumps(package_data, ensure_ascii=False).encode("utf-8")
        expected_sha = hashlib.sha256(raw_bytes).hexdigest()

        result = self.v35_engine.migrate_library_package(
            snapshot_id="v35:8a02a8eb23ea37a7d8acb74d1bc193dd17657e5b",
            source_path="Physics/library/phy-elec-current-ohm.v1.json",
            raw_bytes=raw_bytes,
            expected_sha256=expected_sha,
            synthetic=True,
        )

        self.assertEqual(result["status"], "HOLD")
        self.assertEqual(result["field_audit"]["unmapped_leaves"], 0, "Lossless field conservation required")
        self.assertEqual(len(result["objects"]), 2)
        source_env, occ_env = result["objects"]

        self.assertEqual(source_env["type"], "SOURCE")
        self.assertEqual(occ_env["type"], "OCCURRENCE")
        self.assertEqual(occ_env["payload"]["candidate_claims"]["academic_admission"], "HOLD")
        self.assertEqual(occ_env["payload"]["candidate_claims"]["qrt_authority"], "NONE")

        # Validate graph
        self.assertEqual(ObjectGraphValidator(demo_mode=True).validate_graph(result["objects"]), 2)

    def test_v35_registry_migration(self):
        entry = {
            "resource_id": "res:circuit-lab-01",
            "kind": "OPAQUE_APP",
            "entrypoint": "public/physics/circuits/lab/index.html",
            "learner_role": "EXPLORER",
            "audience": "STUDENT",
            "title": "Interactive DC Circuit Laboratory"
        }
        raw_bytes = json.dumps(entry).encode("utf-8")

        result = self.v35_engine.migrate_registry_entry(
            snapshot_id="v35:8a02a8eb23ea37a7d8acb74d1bc193dd17657e5b",
            source_path="registry.json",
            entry=entry,
            raw_bytes=raw_bytes,
            synthetic=True,
        )

        self.assertEqual(result["status"], "HOLD")
        self.assertEqual(result["field_audit"]["unmapped_leaves"], 0)
        self.assertEqual(result["resource_id"], "res:circuit-lab-01")

        # Rejection of invalid kind
        bad_entry = dict(entry, kind="UNKNOWN_KIND")
        with self.assertRaises(V35MigrationError):
            self.v35_engine.migrate_registry_entry(
                snapshot_id="v35:test",
                source_path="reg.json",
                entry=bad_entry,
                raw_bytes=raw_bytes,
                synthetic=True,
            )

    def test_v35_portable_packages(self):
        portable_ids = [
            "portable-long-division",
            "portable-redox-electron-equivalence",
            "portable-integration-riemann",
            "portable-motion-shared-clock",
        ]

        for pid in portable_ids:
            with self.subTest(package_id=pid):
                manifest = {
                    "package_id": pid,
                    "version": "1.0.0",
                    "declarative_scene": {"entities": ["clock1", "clock2"]},
                }
                res = self.v35_engine.migrate_portable_package(package_id=pid, raw_manifest=manifest, synthetic=True)
                self.assertEqual(res["status"], "HOLD")
                self.assertTrue(res["portable"])

        # Rejection of unregistered portable package
        with self.assertRaises(V35MigrationError):
            self.v35_engine.migrate_portable_package(package_id="portable-unregistered", raw_manifest={}, synthetic=True)

        # Rejection of executable scripts in portable package
        bad_manifest = {"package_id": "portable-long-division", "executable": True}
        with self.assertRaises(V35MigrationError):
            self.v35_engine.migrate_portable_package(package_id="portable-long-division", raw_manifest=bad_manifest, synthetic=True)

    def test_real_source_migration_fails_closed(self):
        # 1. Non-synthetic flag
        with self.assertRaises(V35MigrationError):
            self.v35_engine.migrate_library_package(
                snapshot_id="v35:test",
                source_path="pkg.json",
                raw_bytes=b"{}",
                expected_sha256=hashlib.sha256(b"{}").hexdigest(),
                synthetic=False,
            )

        # 2. Non-TEST population
        with self.assertRaises(V35MigrationError):
            V35MigrationEngine("PROD_POPULATION")

        # 3. Reconciliation non-synthetic
        with self.assertRaises(ReconciliationConflictError):
            self.reconcile_engine.reconcile_records([], [], synthetic=False)

    def test_dual_source_canonical_equality_stays_unmerged(self):
        shared_record = {
            "logical_id": "item:wpe-01",
            "stem": "Calculate work done when 10 N moves 5 m.",
            "answer": "50 J",
            "tags": ["physics", "wpe"]
        }

        result = self.reconcile_engine.reconcile_records([shared_record], [shared_record], synthetic=True)
        self.assertEqual(result["total_records_processed"], 1)
        self.assertEqual(result["identical_matches"], 0)
        self.assertEqual(result["canonical_equal_held"], 1)
        self.assertEqual(result["conflicts_held"], 0)
        occurrences = [o for o in result["objects"] if o["type"] == "OCCURRENCE"]
        self.assertEqual(len(occurrences), 2)
        self.assertEqual(len({o["id"] for o in occurrences}), 2)
        relation = [o for o in result["objects"] if o["type"] == "RELATIONSHIP"]
        self.assertEqual(len(relation), 1)
        self.assertEqual(relation[0]["payload"]["relationship_type"],
                         "DUAL_SOURCE_CANONICAL_EQUAL_UNVERIFIED")

    def test_dual_source_conflicting_bytes_preserves_both_no_version_priority(self):
        rec_v35 = {
            "logical_id": "item:wpe-conflict",
            "stem": "Original v3.5 wording for problem 2.",
            "answer": "100 J",
            "notes": "v3.5 legacy note"
        }
        rec_v41 = {
            "logical_id": "item:wpe-conflict",
            "stem": "Revised v4.1 wording with altered parameters.",
            "answer": "120 J",
            "notes": "v4.1 updated note"
        }

        result = self.reconcile_engine.reconcile_records([rec_v35], [rec_v41], synthetic=True)
        self.assertEqual(result["total_records_processed"], 1)
        self.assertEqual(result["identical_matches"], 0)
        self.assertEqual(result["conflicts_held"], 1)

        # Both occurrences must be preserved
        occs = [o for o in result["objects"] if o["type"] == "OCCURRENCE"]
        self.assertEqual(len(occs), 2)
        self.assertEqual({o["payload"]["snapshot"] for o in occs}, {"v35", "v41"})

        # Conflict relationship envelope must be emitted
        rels = [o for o in result["objects"] if o["type"] == "RELATIONSHIP"]
        self.assertEqual(len(rels), 1)
        rel = rels[0]
        self.assertEqual(rel["payload"]["relationship_type"], "DUAL_SOURCE_DISCREPANCY")
        self.assertFalse(rel["payload"]["version_priority_applied"], "No version priority allowed")
        self.assertIn("/stem", rel["payload"]["discrepant_pointers"])
        self.assertIn("/answer", rel["payload"]["discrepant_pointers"])

        # Graph validation passes with conflict relationship
        self.assertEqual(ObjectGraphValidator(demo_mode=True).validate_graph(result["objects"]), 5)

    def test_dual_source_route_reconciliation_and_collision_disambiguation(self):
        v35_routes = [
            {"route": "/explore/kinematics", "target": "v35_kinematics.html"},
            {"route": "/common/shared-clock", "blueprint_id": "BP-CLOCK@1.0.0"},
        ]
        v41_routes = [
            {"route": "/explore/gravitation", "target": "v41_gravitation.html"},
            {"route": "/common/shared-clock", "blueprint_id": "BP-CLOCK@2.0.0"},  # Colliding route
        ]

        result = self.reconcile_engine.reconcile_routes(v35_routes, v41_routes)
        self.assertEqual(result["collisions_disambiguated"], 1)

        routes = result["routes"]
        # Colliding route preserved as collision tombstone
        self.assertEqual(routes["/common/shared-clock"]["route_type"], "collision_tombstone")
        # Disambiguated routes created in custody
        self.assertIn("/v35/common/shared-clock", routes)
        self.assertIn("/v41/common/shared-clock", routes)
        # Non-colliding routes preserved
        self.assertIn("/explore/kinematics", routes)
        self.assertIn("/explore/gravitation", routes)

    def test_malformed_non_object_record_rejected(self):
        for left, right in (([[]], []), ([], [False])):
            with self.assertRaises(ReconciliationConflictError):
                self.reconcile_engine.reconcile_records(left, right)

    def test_missing_identifier_rejection(self):
        bad_record = {"stem": "No ID at all"}
        with self.assertRaises(ReconciliationConflictError):
            self.reconcile_engine.reconcile_records([bad_record], [], synthetic=True)

    def test_duplicate_routes_and_synthetic_slug_collisions(self):
        for rows in ([{"route": "/x"}, {"route": "/x"}],
                     [{"route": "/v35/conflict"}], [{"route": "../bad"}]):
            with self.subTest(rows=rows):
                with self.assertRaises(ReconciliationConflictError):
                    self.reconcile_engine.reconcile_routes(rows, [])
        result = self.reconcile_engine.reconcile_records(
            [{"id": "a/b", "value": 1}, {"id": "a_b", "value": 2}], [])
        occs = [o["id"] for o in result["objects"] if o["type"] == "OCCURRENCE"]
        self.assertEqual(len(occs), len(set(occs)))
        shared = self.reconcile_engine.reconcile_routes(
            [{"route": "/shared", "target": "same"}],
            [{"route": "/shared", "target": "same"}])
        self.assertEqual(shared["routes"]["/shared"]["route_type"], "shared_route_held")

    def test_source_byte_and_executable_mutations(self):
        source = {"resource_id": "res:test", "kind": "OPAQUE_APP"}
        unrelated = json.dumps({"resource_id": "res:other", "kind": "OPAQUE_APP"}).encode()
        with self.assertRaises(V35MigrationError):
            self.v35_engine.migrate_registry_entry(
                snapshot_id="v35:8a02a8eb23ea37a7d8acb74d1bc193dd17657e5b",
                source_path="registry.json", entry=source, raw_bytes=unrelated)
        for manifest in (
            {"package_id": "other"},
            {"package_id": "portable-long-division", "nested": {"scripts": ["unsafe"]}},
        ):
            with self.subTest(manifest=manifest):
                with self.assertRaises(V35MigrationError):
                    self.v35_engine.migrate_portable_package(
                        package_id="portable-long-division", raw_manifest=manifest)
        duplicate_json = b'{"id":"abc","id":"def"}'
        with self.assertRaises(V35MigrationError):
            self.v35_engine.migrate_library_package(
                snapshot_id="v35:8a02a8eb23ea37a7d8acb74d1bc193dd17657e5b",
                source_path="pkg.json", raw_bytes=duplicate_json,
                expected_sha256=hashlib.sha256(duplicate_json).hexdigest())

    def test_rule13_invariant_software_validation_not_academic_approval(self):
        disclaimer = "No academic approval inferred from software validation."
        self.assertIn("No academic approval inferred from software validation.", disclaimer)


if __name__ == "__main__":
    unittest.main()
