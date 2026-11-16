"""Unit and Regression Test Suite for Grade9v4.2 Backup & Restore Verification (Workpack A03)."""

import hashlib
import json
import os
from pathlib import Path
import sys
import tempfile
import unittest

# Ensure src is on sys.path for local discovery
SRC_DIR = Path(__file__).resolve().parent.parent.parent / "src"
if str(SRC_DIR) not in sys.path:
    sys.path.insert(0, str(SRC_DIR))

from grade9build.restore import (
    restore_file_bytes,
    safe_rel_path,
    verify_restored_directory,
)


class TestRestoreEngine(unittest.TestCase):
    """Test suite covering byte restore, path safety guards, tamper detection, and verification."""

    def test_safe_rel_path_guards(self):
        """Verify path traversal, parent escapes, and absolute paths are strictly rejected."""
        self.assertEqual(safe_rel_path("docs/spec.md"), Path("docs/spec.md"))
        self.assertEqual(safe_rel_path("a/b/c.json"), Path("a/b/c.json"))

        with self.assertRaisesRegex(ValueError, "Unsafe absolute path"):
            safe_rel_path("/etc/passwd")

        with self.assertRaisesRegex(ValueError, "Unsafe absolute path"):
            safe_rel_path("\\Windows\\System32")

        with self.assertRaisesRegex(ValueError, "Unsafe absolute path"):
            safe_rel_path("C:/Users/file.txt")

        with self.assertRaisesRegex(ValueError, "Unsafe path traversal"):
            safe_rel_path("../escaped.txt")

        with self.assertRaisesRegex(ValueError, "Unsafe path traversal"):
            safe_rel_path("dir/../../evil.sh")

    def test_restore_and_verify_success(self):
        """Verify valid byte restoration and complete verification pass."""
        with tempfile.TemporaryDirectory() as td:
            root = Path(td)
            content_1 = b"Sample verification payload alpha\n"
            content_2 = b"Secondary payload beta\n"

            hash_1 = hashlib.sha256(content_1).hexdigest()
            hash_2 = hashlib.sha256(content_2).hexdigest()

            inventory = [
                {
                    "snapshot_id": "test:snap",
                    "path": "data/one.txt",
                    "kind": "FILE",
                    "size": len(content_1),
                    "sha256": hash_1,
                    "mode": 420,
                },
                {
                    "snapshot_id": "test:snap",
                    "path": "data/two.txt",
                    "kind": "FILE",
                    "size": len(content_2),
                    "sha256": hash_2,
                    "mode": 420,
                },
            ]

            # Perform restore
            restore_file_bytes(content_1, root / "data/one.txt", 0o644, hash_1)
            restore_file_bytes(content_2, root / "data/two.txt", 0o644, hash_2)

            # Verify
            res = verify_restored_directory(inventory, root, snapshot_id="test:snap")
            self.assertEqual(res["status"], "VERIFIED")
            self.assertEqual(res["verified_files"], 2)
            self.assertEqual(res["total_bytes"], len(content_1) + len(content_2))
            self.assertFalse(res["tamper_detected"])

    def test_tamper_detection(self):
        """Verify that altering content with identical length triggers tamper rejection."""
        with tempfile.TemporaryDirectory() as td:
            root = Path(td)
            content = b"Original pristine content\n"
            real_hash = hashlib.sha256(content).hexdigest()

            inventory = [
                {
                    "snapshot_id": "test:snap",
                    "path": "verified.txt",
                    "kind": "FILE",
                    "size": len(content),
                    "sha256": real_hash,
                    "mode": 420,
                }
            ]

            # Write tampered content of the exact same length (26 bytes)
            tampered_content = b"Original tampered content\n"
            self.assertEqual(len(tampered_content), len(content))
            restore_file_bytes(tampered_content, root / "verified.txt")

            with self.assertRaisesRegex(ValueError, "SHA-256 tamper/mismatch"):
                verify_restored_directory(inventory, root)

    def test_size_mismatch_detection(self):
        """Verify that changing file size triggers size mismatch rejection."""
        with tempfile.TemporaryDirectory() as td:
            root = Path(td)
            inventory = [
                {
                    "snapshot_id": "test:snap",
                    "path": "file.txt",
                    "kind": "FILE",
                    "size": 100,
                    "sha256": "ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad",
                    "mode": 420,
                }
            ]
            (root / "file.txt").write_bytes(b"short")

            with self.assertRaisesRegex(ValueError, "Size mismatch"):
                verify_restored_directory(inventory, root)

    def test_missing_file_detection(self):
        """Verify that an absent file triggers missing file rejection."""
        with tempfile.TemporaryDirectory() as td:
            root = Path(td)
            inventory = [
                {
                    "snapshot_id": "test:snap",
                    "path": "missing.txt",
                    "kind": "FILE",
                    "size": 10,
                    "sha256": "ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad",
                    "mode": 420,
                }
            ]

            with self.assertRaisesRegex(ValueError, "Missing restored file"):
                verify_restored_directory(inventory, root)

    def test_unaccounted_file_rejection(self):
        """Verify that extra unlisted files trigger unaccounted file rejection."""
        with tempfile.TemporaryDirectory() as td:
            root = Path(td)
            content = b"Authorized data"
            inventory = [
                {
                    "snapshot_id": "test:snap",
                    "path": "data.txt",
                    "kind": "FILE",
                    "size": len(content),
                    "sha256": hashlib.sha256(content).hexdigest(),
                    "mode": 420,
                }
            ]

            (root / "data.txt").write_bytes(content)
            (root / "rogue_extra.txt").write_bytes(b"unexpected")

            with self.assertRaisesRegex(ValueError, "Unaccounted files found"):
                verify_restored_directory(inventory, root, allow_extra_files=False)


if __name__ == "__main__":
    unittest.main()
