"""Unit and Regression Test Suite for Grade9v4.2 Inventory Engine (Workpack A02)."""

import hashlib
import json
import os
from pathlib import Path
import subprocess
import sys
import tempfile
import unittest

# Ensure src is on sys.path for local discovery
SRC_DIR = Path(__file__).resolve().parent.parent.parent / "src"
if str(SRC_DIR) not in sys.path:
    sys.path.insert(0, str(SRC_DIR))

from grade9build.inventory import (
    enumerate_git_snapshot,
    git_mode_to_kind,
    git_mode_to_unix,
    validate_inventory_data,
)


class TestInventoryEngine(unittest.TestCase):
    """Test suite covering byte inventory enumeration, modes, hashing, and schema validation."""

    def setUp(self):
        # Locate inventory schema in external execution kit
        kit_root = Path("D:/CodeD/grade9-r4-kit/Grade9v4.2_Execution_Kit_R4")
        self.schema_path = kit_root / "02-contracts/schemas/inventory.schema.json"
        self.assertTrue(self.schema_path.is_file(), f"Missing schema at {self.schema_path}")

    def test_mode_and_kind_translations(self):
        """Verify standard Git modes map to Unix modes and kinds."""
        self.assertEqual(git_mode_to_unix("100644"), 0o644)  # 420
        self.assertEqual(git_mode_to_unix("100755"), 0o755)  # 493
        self.assertEqual(git_mode_to_unix("120000"), 0o777)  # 511

        self.assertEqual(git_mode_to_kind("100644"), "FILE")
        self.assertEqual(git_mode_to_kind("100755"), "FILE")
        self.assertEqual(git_mode_to_kind("120000"), "SYMLINK")

    def test_schema_conformance_valid_fixture(self):
        """Verify schema accepts compliant synthetic inventory rows."""
        sample_rows = [
            {
                "snapshot_id": "test:sample1",
                "path": "docs/architecture/spec.md",
                "kind": "FILE",
                "size": 128,
                "sha256": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
                "mode": 420,
            },
            {
                "snapshot_id": "test:sample1",
                "path": "bin/run.sh",
                "kind": "FILE",
                "size": 64,
                "sha256": "ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad",
                "mode": 493,
            },
        ]
        ok, errors = validate_inventory_data(sample_rows, self.schema_path)
        self.assertTrue(ok, f"Expected valid rows to pass schema: {errors}")
        self.assertEqual(len(errors), 0)

    def test_rejection_of_duplicate_paths(self):
        """Verify inventory rejects duplicate (snapshot_id, path) combinations."""
        duplicate_rows = [
            {
                "snapshot_id": "snap:1",
                "path": "duplicate.json",
                "kind": "FILE",
                "size": 10,
                "sha256": "ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad",
                "mode": 420,
            },
            {
                "snapshot_id": "snap:1",
                "path": "duplicate.json",
                "kind": "FILE",
                "size": 20,
                "sha256": "cb7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad",
                "mode": 420,
            },
        ]
        ok, errors = validate_inventory_data(duplicate_rows, self.schema_path)
        self.assertFalse(ok)
        self.assertTrue(any("Duplicate entry" in e for e in errors))

    def test_rejection_of_invalid_kind_and_hash(self):
        """Verify inventory rejects invalid kind and malformed SHA-256."""
        invalid_rows = [
            {
                "snapshot_id": "snap:1",
                "path": "invalid_kind.txt",
                "kind": "DIRECTORY",  # Invalid enum
                "size": 0,
                "sha256": "not-a-valid-sha256",
                "mode": 420,
            }
        ]
        ok, errors = validate_inventory_data(invalid_rows, self.schema_path)
        self.assertFalse(ok)
        self.assertGreater(len(errors), 0)

    def test_synthetic_git_repo_enumeration(self):
        """Create a disposable Git repo, commit files, and verify enumeration accuracy."""
        with tempfile.TemporaryDirectory() as td:
            repo_path = Path(td)
            subprocess.run(["git", "init", str(repo_path)], capture_output=True, check=True)
            subprocess.run(["git", "-C", str(repo_path), "config", "user.name", "Test"], check=True)
            subprocess.run(["git", "-C", str(repo_path), "config", "user.email", "test@test.local"], check=True)

            # Create test files
            content_a = b"Canonical test content A\n"
            content_b = b"Executable test content B\n"

            file_a = repo_path / "data" / "alpha.txt"
            file_a.parent.mkdir(parents=True)
            file_a.write_bytes(content_a)

            file_b = repo_path / "bin" / "script.py"
            file_b.parent.mkdir(parents=True)
            file_b.write_bytes(content_b)

            subprocess.run(["git", "-C", str(repo_path), "add", "."], check=True)
            subprocess.run(["git", "-C", str(repo_path), "commit", "-m", "init test repo"], check=True)

            # Enumerate
            items = enumerate_git_snapshot(repo_path, "HEAD", "synthetic:test")
            self.assertEqual(len(items), 2)

            # Validate deterministic sorting
            paths = [r["path"] for r in items]
            self.assertEqual(paths, ["bin/script.py", "data/alpha.txt"])

            # Verify byte hashes
            self.assertEqual(items[1]["size"], len(content_a))
            self.assertEqual(items[1]["sha256"], hashlib.sha256(content_a).hexdigest())

            # Validate against schema
            ok, errors = validate_inventory_data(items, self.schema_path)
            self.assertTrue(ok, f"Synthetic repo inventory failed schema: {errors}")


if __name__ == "__main__":
    unittest.main()
