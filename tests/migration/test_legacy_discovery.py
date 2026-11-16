"""Unit and invariant tests for LegacyDiscoveryEngine (Workpack A56)."""

import unittest
import json
import sys
from pathlib import Path

SRC_DIR = Path(__file__).resolve().parent.parent.parent / "src"
if str(SRC_DIR) not in sys.path:
    sys.path.insert(0, str(SRC_DIR))

from grade9build.legacy_discovery import LegacyDiscoveryEngine

REPO_ROOT = Path("D:/CodeD/g9v4.2")
INVENTORY_FILE = REPO_ROOT / "docs/migration/inventory-summary.json"

class TestLegacyDiscoveryEngine(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.engine = LegacyDiscoveryEngine.from_inventory_file(INVENTORY_FILE)

    def test_v35_file_count_conservation(self):
        self.assertEqual(len(self.engine.v35_entries), LegacyDiscoveryEngine.EXPECTED_TOTAL_FILES)
        self.assertEqual(len(self.engine.v35_entries), 2657)

    def test_html_path_enumeration_and_no_silent_dedup(self):
        catalog = self.engine.discover_html_catalog()
        self.assertEqual(catalog["total_html_paths"], LegacyDiscoveryEngine.EXPECTED_HTML_PATHS)
        self.assertEqual(catalog["total_html_paths"], 396)
        self.assertEqual(catalog["unique_blob_count"], LegacyDiscoveryEngine.EXPECTED_UNIQUE_BLOBS)
        self.assertEqual(catalog["unique_blob_count"], 252)
        # Duplicate groups must exist, proving multiple paths share identical blobs without silent drop
        self.assertGreater(catalog["duplicate_blob_count"], 0)
        total_in_groups = sum(len(paths) for paths in catalog["duplicate_groups"].values())
        self.assertGreater(total_in_groups, catalog["duplicate_blob_count"])

    def test_standalone_suites_discovery(self):
        standalone = self.engine.discover_standalone_suites()
        self.assertEqual(len(standalone), LegacyDiscoveryEngine.EXPECTED_STANDALONE)
        self.assertEqual(len(standalone), 38)
        for s in standalone:
            self.assertTrue(s["path"].startswith("standalone/"))
            self.assertTrue(s["path"].endswith(".html"))
            self.assertEqual(s["audit_status"], "NOT_BROWSER_AUDITED")

    def test_explorer_entrypoints_discovery(self):
        explorers = self.engine.discover_registered_explorer_entrypoints()
        self.assertEqual(len(explorers), LegacyDiscoveryEngine.EXPECTED_REGISTERED_EXPLORERS)
        self.assertEqual(len(explorers), 11)
        for e in explorers:
            self.assertTrue(e.startswith("public/"))
            self.assertIn("/explorers/", e)
            self.assertTrue(e.endswith("index.html"))

    def test_root_library_packages_discovery(self):
        packages = self.engine.discover_root_library_packages()
        self.assertEqual(len(packages), LegacyDiscoveryEngine.EXPECTED_ROOT_PACKAGES)
        self.assertEqual(len(packages), 22)
        for p in packages:
            self.assertTrue(p.endswith(".v1.json"))
            self.assertTrue(
                p.startswith("Physics/library/") or
                p.startswith("Chemistry/library/") or
                p.startswith("Mathematics/library/")
            )

    def test_portable_packages_discovery(self):
        portable = self.engine.discover_portable_packages()
        self.assertEqual(len(portable), LegacyDiscoveryEngine.EXPECTED_PORTABLE_PACKAGES)
        self.assertEqual(len(portable), 4)
        self.assertIn("portable-motion-shared-clock", portable)
        self.assertIn("portable-long-division", portable)

    def test_native_blueprints_binding(self):
        blueprints = self.engine.discover_native_blueprints()
        self.assertEqual(len(blueprints), LegacyDiscoveryEngine.EXPECTED_BLUEPRINTS)
        self.assertEqual(len(blueprints), 7)
        self.assertEqual(blueprints["CORE1"], "BP-CORE1-ORIENTATION@1.1.0")
        self.assertEqual(blueprints["CORE1A"], "BP-CORE1A-CONSTRUCTION@1.8.0")
        self.assertEqual(blueprints["CORE1B"], "BP-CORE1B-RECONSTRUCTION@1.1.0")
        self.assertEqual(blueprints["CORE2"], "BP-CORE2-SOURCE-QUESTION@1.11.0")
        self.assertEqual(blueprints["EXPLORER"], "BP-EXPLORER-GCDR@1.0.0")

    def test_generate_v35_summary_structure(self):
        summary = self.engine.generate_v35_inventory_summary()
        self.assertEqual(summary["workpack_id"], "A56")
        self.assertEqual(summary["status"], "PROPOSED")
        self.assertEqual(summary["academic_admission"], "HOLD")
        self.assertEqual(summary["ui_implementation_freeze"], "LOCKED_UNTIL_A61")
        self.assertEqual(summary["summary_counts"]["tracked_files"], 2657)
        self.assertEqual(summary["summary_counts"]["html_paths"], 396)
        self.assertEqual(summary["summary_counts"]["unique_html_blobs"], 252)
        self.assertEqual(summary["summary_counts"]["standalone_suites"], 38)
        self.assertEqual(summary["summary_counts"]["registered_opaque_explorers"], 11)
        self.assertEqual(summary["summary_counts"]["root_library_packages"], 22)
        self.assertEqual(summary["summary_counts"]["portable_package_ids"], 4)
        self.assertEqual(summary["summary_counts"]["native_blueprints"], 7)
        self.assertTrue(summary["discovery_invariants"]["silent_dedup_prohibited"])
        self.assertEqual(len(summary["html_path_catalog"]), 396)

if __name__ == "__main__":
    unittest.main()
