"""Comprehensive authority, receipt verification, freeze policy, and release integration tests.

Verifies:
- Tampered/stale/unsigned receipts are strictly rejected fail-closed
- Reviewer self-approval and unauthorized reviewers are rejected
- Custody boundary isolation (receipts and keys external to target repo)
- Git lineage and tree integrity verification
- Dependency closure DAG verification and corruption rejection
- Strict R2/R3 authority mapping and immutable freeze policy invariants
- AcademicReleaseIntegrator end-to-end integration
"""
from __future__ import annotations

import copy
from datetime import datetime, timezone, timedelta
import json
import os
from pathlib import Path
import shutil
import subprocess
import sys
import tempfile
import unittest

ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ROOT / "src"))

from grade9build.release_integration import (
    AcademicReleaseIntegrator,
    DependencyClosureValidator,
    PrerequisiteAuditor,
    ReceiptVerifier,
    ReleaseAuthorityError,
    ReceiptVerificationError,
    ProductionReleaseProhibitedError,
    AcademicAdmissionError,
    DependencyClosureError,
    DEFAULT_KIT_MANIFEST_SHA256,
    FROZEN_LEGACY_PREVIEW_PIN,
    NATIVE_R2_R3_AUTHORITY,
    NATIVE_CONTRACT_MAP,
    R3_FREEZE_POLICY,
    find_openssl,
    run_openssl_sign,
    run_openssl_verify,
)
from grade9build.graph import canonical_bytes, compute_object_digest


ROOT = Path(__file__).resolve().parents[2]


class TestAuthorityAndReceiptProtocol(unittest.TestCase):
    """Test receipt verification, anti-tampering, expiration, and self-approval checks."""

    @classmethod
    def setUpClass(cls) -> None:
        cls.openssl_bin = find_openssl()
        cls.has_openssl = cls.openssl_bin is not None

        # Generate a temporary Ed25519 keypair for cryptographic receipt testing
        cls.td = tempfile.TemporaryDirectory()
        cls.key_dir = Path(cls.td.name)
        cls.privkey = cls.key_dir / "ed25519_test.key"
        cls.pubkey = cls.key_dir / "ed25519_test.pub"

        if cls.has_openssl:
            subprocess.run(
                [cls.openssl_bin, "genpkey", "-algorithm", "Ed25519", "-out", str(cls.privkey)],
                check=True,
                capture_output=True,
            )
            subprocess.run(
                [cls.openssl_bin, "pkey", "-in", str(cls.privkey), "-pubout", "-out", str(cls.pubkey)],
                check=True,
                capture_output=True,
            )

    @classmethod
    def tearDownClass(cls) -> None:
        cls.td.cleanup()

    def _sample_receipt(self, **overrides) -> dict:
        now_iso = datetime.now(timezone.utc).isoformat()
        base = {
            "workpack": "A39",
            "decision": "ACCEPTED",
            "base_commit": "41262592d96784e94ab560312b35c03844c6a1fb",
            "candidate_commit": "2593a6fea7f4cfbbed70a8e104d86f6806237ee7",
            "candidate_tree": "a465063ae257a8ce390835459a9547d5b45b0aa9",
            "kit_manifest_sha256": DEFAULT_KIT_MANIFEST_SHA256,
            "reviewer_id": "rev-academic-sec-01",
            "reviewed_at": now_iso,
            "test_evidence_sha256": "015e88dc0b560f189086c7f1999e4f87245d579098ed461ed954b07e3ca41e9e",
        }
        base.update(overrides)
        return base

    def test_native_authority_mappings_and_status(self) -> None:
        """Verify native R2/R3 subject authorities and contract mappings."""
        self.assertEqual(NATIVE_R2_R3_AUTHORITY["PHYSICS"]["native_authority"], "AUTH-R3-PHY")
        self.assertEqual(NATIVE_R2_R3_AUTHORITY["PHYSICS"]["status"], "HOLD")
        self.assertFalse(NATIVE_R2_R3_AUTHORITY["PHYSICS"]["admitted"])

        self.assertEqual(NATIVE_R2_R3_AUTHORITY["CHEMISTRY"]["native_authority"], "AUTH-R3-CHE")
        self.assertEqual(NATIVE_R2_R3_AUTHORITY["CHEMISTRY"]["status"], "HOLD")

        self.assertEqual(NATIVE_R2_R3_AUTHORITY["MATHEMATICS"]["native_authority"], "AUTH-R3-MAT")
        self.assertEqual(NATIVE_R2_R3_AUTHORITY["MATHEMATICS"]["status"], "HOLD")

        # Biology scope must be pending and not admitted
        self.assertEqual(NATIVE_R2_R3_AUTHORITY["BIOLOGY"]["status"], "SCOPE_PENDING")
        self.assertFalse(NATIVE_R2_R3_AUTHORITY["BIOLOGY"]["admitted"])

        # Check native contract mappings
        for ptype in ("SOURCE", "WARRANT", "CONSTRUCTION", "LESSON", "ASSESSMENT", "APPROVAL", "QUESTION", "RELATIONSHIP"):
            self.assertIn(ptype, NATIVE_CONTRACT_MAP)
            self.assertEqual(NATIVE_CONTRACT_MAP[ptype]["status"], "HOLD")
            self.assertTrue(NATIVE_CONTRACT_MAP[ptype]["native_reference"])

    def test_freeze_policy_invariants(self) -> None:
        """Verify immutable R3 freeze policy attributes."""
        self.assertEqual(R3_FREEZE_POLICY["freeze_status"], "FREEZE_PENDING_GOLDEN")
        self.assertEqual(R3_FREEZE_POLICY["academic_admission"], "HOLD")
        self.assertEqual(R3_FREEZE_POLICY["production_release"], "NONE")
        self.assertEqual(R3_FREEZE_POLICY["ui_freeze"], "NOT_GRANTED")
        self.assertEqual(R3_FREEZE_POLICY["d3_1_status"], "PAUSED")
        self.assertIsNone(R3_FREEZE_POLICY["accepted_golden"])
        self.assertFalse(R3_FREEZE_POLICY["production_enabled"])
        self.assertFalse(R3_FREEZE_POLICY["academic_release_enabled"])
        self.assertEqual(R3_FREEZE_POLICY["frozen_legacy_preview_pin"], FROZEN_LEGACY_PREVIEW_PIN)

    def test_valid_receipt_verification_with_ed25519_signature(self) -> None:
        """Verify that a valid receipt with authentic detached signature passes."""
        if not self.has_openssl:
            self.skipTest("OpenSSL not available")

        receipt = self._sample_receipt()
        raw_bytes = canonical_bytes(receipt)
        sig = run_openssl_sign(raw_bytes, self.privkey, self.openssl_bin)

        verifier = ReceiptVerifier(trusted_reviewers={"rev-academic-sec-01"})
        res = verifier.verify_receipt(
            receipt=receipt,
            signature=sig,
            pubkey_path=self.pubkey,
            expected_workpack="A39",
            author_id="author-eng-01",
        )
        self.assertEqual(res["status"], "RECEIPT_VALIDATED")
        self.assertEqual(res["workpack"], "A39")
        self.assertEqual(res["reviewer_id"], "rev-academic-sec-01")

    def test_tampered_receipt_rejected(self) -> None:
        """Verify that any tampering with signed receipt bytes is rejected fail-closed."""
        if not self.has_openssl:
            self.skipTest("OpenSSL not available")

        receipt = self._sample_receipt()
        raw_bytes = canonical_bytes(receipt)
        sig = run_openssl_sign(raw_bytes, self.privkey, self.openssl_bin)

        # Alter the candidate tree after signing
        tampered_receipt = copy.deepcopy(receipt)
        tampered_receipt["candidate_tree"] = "0000000000000000000000000000000000000000"

        verifier = ReceiptVerifier(trusted_reviewers={"rev-academic-sec-01"})
        with self.assertRaises(ReceiptVerificationError) as ctx:
            verifier.verify_receipt(
                receipt=tampered_receipt,
                signature=sig,
                pubkey_path=self.pubkey,
            )
        self.assertIn("TAMPERED_RECEIPT", str(ctx.exception))

    def test_unsigned_receipt_rejected(self) -> None:
        """Verify that unsigned receipts (None or empty) are rejected fail-closed."""
        receipt = self._sample_receipt()
        verifier = ReceiptVerifier()

        with self.assertRaises(ReceiptVerificationError) as ctx:
            verifier.verify_receipt(receipt=receipt, signature=None)
        self.assertIn("UNSIGNED_RECEIPT", str(ctx.exception))

        with self.assertRaises(ReceiptVerificationError) as ctx:
            verifier.verify_receipt(receipt=receipt, signature=b"")
        self.assertIn("UNSIGNED_RECEIPT", str(ctx.exception))

    def test_stale_receipt_rejected_future(self) -> None:
        """Verify that receipts dated in the future beyond allowed clock drift are rejected."""
        future_dt = datetime.now(timezone.utc) + timedelta(hours=2)
        receipt = self._sample_receipt(reviewed_at=future_dt.isoformat())
        verifier = ReceiptVerifier()

        with self.assertRaises(ReceiptVerificationError) as ctx:
            verifier.verify_receipt(receipt=receipt, signature=b"mock-sig")
        self.assertIn("STALE_RECEIPT", str(ctx.exception))

    def test_stale_receipt_rejected_expired(self) -> None:
        """Verify that expired receipts older than TTL are rejected."""
        old_dt = datetime.now(timezone.utc) - timedelta(days=60)
        receipt = self._sample_receipt(reviewed_at=old_dt.isoformat())
        verifier = ReceiptVerifier(max_age_seconds=86400 * 30)

        with self.assertRaises(ReceiptVerificationError) as ctx:
            verifier.verify_receipt(receipt=receipt, signature=b"mock-sig")
        self.assertIn("STALE_RECEIPT", str(ctx.exception))

    def test_self_approval_rejected(self) -> None:
        """Verify that self-approval (author attempting to sign review receipt) is strictly prohibited."""
        receipt = self._sample_receipt(reviewer_id="engineer-author-01")
        verifier = ReceiptVerifier()

        with self.assertRaises(ReceiptVerificationError) as ctx:
            verifier.verify_receipt(
                receipt=receipt,
                signature=b"mock-sig",
                author_id="engineer-author-01",
            )
        self.assertIn("SELF_APPROVAL_PROHIBITED", str(ctx.exception))

    def test_unauthorized_reviewer_rejected(self) -> None:
        """Verify that a reviewer not in the trusted reviewer roster is rejected."""
        receipt = self._sample_receipt(reviewer_id="rogue-reviewer-99")
        verifier = ReceiptVerifier(trusted_reviewers={"authorized-rev-01", "authorized-rev-02"})

        with self.assertRaises(ReceiptVerificationError) as ctx:
            verifier.verify_receipt(receipt=receipt, signature=b"mock-sig")
        self.assertIn("UNAUTHORIZED_REVIEWER", str(ctx.exception))

    def test_scope_mismatch_rejected(self) -> None:
        """Verify that workpack ID or kit manifest hash mismatches are rejected."""
        verifier = ReceiptVerifier()

        # Workpack mismatch
        receipt_wp = self._sample_receipt(workpack="A01")
        with self.assertRaises(ReceiptVerificationError) as ctx:
            verifier.verify_receipt(receipt=receipt_wp, signature=b"mock-sig", expected_workpack="A40")
        self.assertIn("SCOPE_MISMATCH", str(ctx.exception))

        # Kit manifest digest mismatch
        receipt_kit = self._sample_receipt(kit_manifest_sha256="0000000000000000000000000000000000000000000000000000000000000000")
        with self.assertRaises(ReceiptVerificationError) as ctx:
            verifier.verify_receipt(receipt=receipt_kit, signature=b"mock-sig")
        self.assertIn("SCOPE_MISMATCH", str(ctx.exception))

    def test_invalid_decision_rejected(self) -> None:
        """Verify that non-ACCEPTED decisions (SUBMITTED, REJECTED, PENDING) are rejected."""
        verifier = ReceiptVerifier()
        for dec in ("SUBMITTED_FOR_REVIEW", "REJECTED", "PENDING", "HOLD", "PROPOSED"):
            receipt = self._sample_receipt(decision=dec)
            with self.assertRaises(ReceiptVerificationError) as ctx:
                verifier.verify_receipt(receipt=receipt, signature=b"mock-sig")
            self.assertIn("INVALID_DECISION", str(ctx.exception))

    def test_malformed_receipt_rejected(self) -> None:
        """Verify that receipts with missing fields or malformed hashes are rejected."""
        verifier = ReceiptVerifier()

        # Missing required field
        bad_receipt = self._sample_receipt()
        del bad_receipt["candidate_tree"]
        with self.assertRaises(ReceiptVerificationError) as ctx:
            verifier.verify_receipt(receipt=bad_receipt, signature=b"mock-sig")
        self.assertIn("MALFORMED_RECEIPT", str(ctx.exception))

        # Malformed candidate commit hash (not 40-char hex)
        bad_hash_receipt = self._sample_receipt(candidate_commit="not-a-valid-sha")
        with self.assertRaises(ReceiptVerificationError) as ctx:
            verifier.verify_receipt(receipt=bad_hash_receipt, signature=b"mock-sig")
        self.assertIn("MALFORMED_RECEIPT", str(ctx.exception))

    def test_git_tree_and_lineage_verification(self) -> None:
        """Verify git commit tree matching and ancestor checks against local git history."""
        # Use actual known commit and tree from A39
        receipt = self._sample_receipt(
            base_commit="41262592d96784e94ab560312b35c03844c6a1fb",
            candidate_commit="2593a6fea7f4cfbbed70a8e104d86f6806237ee7",
            candidate_tree="a465063ae257a8ce390835459a9547d5b45b0aa9",
        )
        verifier = ReceiptVerifier()

        # Pass with matching commit and tree
        res = verifier.verify_receipt(
            receipt=receipt,
            signature=b"mock-sig",
            repo_path=ROOT,
            current_base="2593a6fea7f4cfbbed70a8e104d86f6806237ee7",
        )
        self.assertEqual(res["status"], "RECEIPT_VALIDATED")

        # Fails when tree hash is forged
        forged_tree_receipt = self._sample_receipt(
            base_commit="41262592d96784e94ab560312b35c03844c6a1fb",
            candidate_commit="2593a6fea7f4cfbbed70a8e104d86f6806237ee7",
            candidate_tree="1111111111111111111111111111111111111111",
        )
        with self.assertRaises(ReceiptVerificationError) as ctx:
            verifier.verify_receipt(receipt=forged_tree_receipt, signature=b"mock-sig", repo_path=ROOT)
        self.assertIn("TREE_MISMATCH", str(ctx.exception))

        # Fails when candidate commit is not ancestor of current base
        unrelated_receipt = self._sample_receipt(
            base_commit="41262592d96784e94ab560312b35c03844c6a1fb",
            candidate_commit="2593a6fea7f4cfbbed70a8e104d86f6806237ee7",
            candidate_tree="a465063ae257a8ce390835459a9547d5b45b0aa9",
        )
        with self.assertRaises(ReceiptVerificationError) as ctx:
            # Using an ancestor as target base will fail ancestor check
            verifier.verify_receipt(
                receipt=unrelated_receipt,
                signature=b"mock-sig",
                repo_path=ROOT,
                current_base="41262592d96784e94ab560312b35c03844c6a1fb",
            )
        self.assertIn("LINEAGE_MISMATCH", str(ctx.exception))

    def test_custody_boundary_enforcement(self) -> None:
        """Verify that receipts directory or trusted keyfile inside repo path is rejected."""
        auditor = PrerequisiteAuditor()
        inside_receipts = ROOT / "internal_receipts"
        outside_key = self.pubkey

        with self.assertRaises(ReceiptVerificationError) as ctx:
            auditor.audit_prerequisites(
                workpack_id="A40",
                plan_path=ROOT / "fixtures/synthetic/graph.json",
                receipts_dir=inside_receipts,
                keyfile=outside_key,
                repo_path=ROOT,
                current_base="2593a6fea7f4cfbbed70a8e104d86f6806237ee7",
            )
        self.assertIn("EXTERNAL_CUSTODY_VIOLATION", str(ctx.exception))


class TestDependencyClosureAndIntegrator(unittest.TestCase):
    """Test dependency closure validation and academic release integration compiler."""

    @classmethod
    def setUpClass(cls) -> None:
        cls.demo_graph = json.loads((ROOT / "fixtures/synthetic/graph.json").read_text(encoding="utf-8"))
        if not isinstance(cls.demo_graph, list):
            cls.demo_graph = cls.demo_graph["objects"]

    def test_dependency_closure_validation_success(self) -> None:
        """Verify valid synthetic demo graph closure."""
        validator = DependencyClosureValidator(demo_mode=True)
        res = validator.validate_graph(self.demo_graph)
        self.assertEqual(res["status"], "CLOSURE_VALID")
        self.assertEqual(res["total_objects"], 8)
        self.assertTrue(res["graph_digest"])

    def test_dependency_closure_dangling_ref_rejected(self) -> None:
        """Verify that dangling references are rejected fail-closed."""
        bad_graph = copy.deepcopy(self.demo_graph)
        # Add a dependency to non-existent object
        bad_graph[0]["dependencies"].append({
            "type": "QUESTION",
            "id": "nonexistent:q:999",
            "revision": 1,
            "sha256": "0000000000000000000000000000000000000000000000000000000000000000",
        })
        validator = DependencyClosureValidator(demo_mode=True)
        with self.assertRaises(DependencyClosureError) as ctx:
            validator.validate_graph(bad_graph)
        self.assertIn("GRAPH_VALIDATION_FAILURE", str(ctx.exception))

    def test_dependency_closure_digest_mismatch_rejected(self) -> None:
        """Verify that modified dependencies with stale or forged digest are rejected."""
        bad_graph = copy.deepcopy(self.demo_graph)
        # Modify the digest of an existing dependency
        bad_graph[1]["dependencies"][0]["sha256"] = "1111111111111111111111111111111111111111111111111111111111111111"
        validator = DependencyClosureValidator(demo_mode=True)
        with self.assertRaises(DependencyClosureError) as ctx:
            validator.validate_graph(bad_graph)
        self.assertIn("GRAPH_VALIDATION_FAILURE", str(ctx.exception))

    def test_dependency_closure_duplicate_id_rejected(self) -> None:
        """Verify that duplicate IDs within graph are rejected."""
        bad_graph = copy.deepcopy(self.demo_graph)
        bad_graph.append(copy.deepcopy(bad_graph[0]))
        validator = DependencyClosureValidator(demo_mode=True)
        with self.assertRaises(DependencyClosureError) as ctx:
            validator.validate_graph(bad_graph)
        self.assertIn("DUPLICATE_ID", str(ctx.exception))

    def test_production_target_prohibited(self) -> None:
        """Verify that attempts to compile for PRODUCTION target are blocked."""
        with self.assertRaises(ProductionReleaseProhibitedError) as ctx:
            AcademicReleaseIntegrator(target_mode="PRODUCTION")
        self.assertIn("PRODUCTION_TARGET_PROHIBITED", str(ctx.exception))

    def test_academic_release_integration_pipeline(self) -> None:
        """Verify successful integration compilation binding R2/R3 authority and freeze policy."""
        integrator = AcademicReleaseIntegrator(target_mode="DEMO")
        res = integrator.integrate_release(
            graph=self.demo_graph,
            release_id="RELEASE-ACADEMIC-DEMO-01",
            workpack_id="A40",
        )

        # Invariant checks
        self.assertEqual(res["target_mode"], "DEMO")
        self.assertEqual(res["academic_admission"], "HOLD")
        self.assertEqual(res["production_release"], "NONE")
        self.assertEqual(res["ui_freeze"], "NOT_GRANTED")
        self.assertTrue(res["demo_banner"])
        self.assertFalse(res["learner_release"])
        self.assertEqual(res["compiler_integration_status"], "FROZEN_ACADEMIC_DEMO_COMPLIANT")

        # Bound native authority checks
        self.assertIn("native_authorities", res)
        self.assertEqual(res["native_authorities"]["PHYSICS"]["native_authority"], "AUTH-R3-PHY")
        self.assertEqual(res["native_authorities"]["PHYSICS"]["status"], "HOLD")
        self.assertEqual(res["native_authorities"]["BIOLOGY"]["status"], "SCOPE_PENDING")

        # Freeze policy bound
        self.assertIn("r3_freeze_policy", res)
        self.assertEqual(res["r3_freeze_policy"]["freeze_status"], "FREEZE_PENDING_GOLDEN")
        self.assertEqual(res["r3_freeze_policy"]["d3_1_status"], "PAUSED")

        # Dependency closure verified
        self.assertIn("dependency_closure", res)
        self.assertEqual(res["dependency_closure"]["status"], "CLOSURE_VALID")
        self.assertEqual(res["dependency_closure"]["total_objects"], 8)

        # Public projection contains no protected answers or rubrics
        self.assertEqual(res["projections"]["learner_postcommit"], [])
        self.assertEqual(res["projections"]["assessment_contracts"], [])
        self.assertEqual(res["projections"]["search_index"], [])


if __name__ == "__main__":
    unittest.main()
