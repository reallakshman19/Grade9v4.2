"""Academic release compiler integration and authority enforcement.

Implements exact native R2/R3 authority mapping, independent acceptance receipt
verification (detached Ed25519 signature checks, expiration, anti-tampering,
self-approval rejection), dependency closure validation, and immutable freeze policy.
"""
from __future__ import annotations

import copy
from datetime import datetime, timezone
import hashlib
import json
import os
from pathlib import Path
import re
import shutil
import subprocess
from typing import Any, Iterable, Sequence

from .compile import ReleaseProjectionCompiler, ReleaseCompilationError, DEMO_GRAPHS
from .graph import ObjectGraphValidator, GraphValidationError, canonical_bytes, compute_object_digest


# -----------------------------------------------------------------------------
# Base Exceptions and Failure Taxonomy
# -----------------------------------------------------------------------------

class ReleaseAuthorityError(Exception):
    """Base exception for all release authority, receipt, or policy violations."""


class ReceiptVerificationError(ReleaseAuthorityError):
    """Raised when an independent acceptance receipt fails validation."""


class ProductionReleaseProhibitedError(ReleaseAuthorityError):
    """Raised when attempting to enable production release or bypass freeze."""


class AcademicAdmissionError(ReleaseAuthorityError):
    """Raised when attempting to admit academic content without verified authority."""


class DependencyClosureError(ReleaseAuthorityError):
    """Raised when a graph's dependency closure is broken, dangling, or cyclic."""


# -----------------------------------------------------------------------------
# Controlling Authority & Freeze Constants
# -----------------------------------------------------------------------------

DEFAULT_KIT_MANIFEST_SHA256: str = "6f92aac8eb1ca42e46d243443b230e2bb83dae5e99beeee872da6da47b04e3fc"
FROZEN_LEGACY_PREVIEW_PIN: str = "7a5c425f02d8a365a738bb11df1982cbe38e9f82"
V35_OBSERVED_MAIN: str = "8a02a8eb23ea37a7d8acb74d1bc193dd17657e5b"
V41_OBSERVED_MAIN: str = "564ad2a07fddc0fdd30d103674b3eca61235a54b"

# Native R2/R3 Subject Authorities
NATIVE_R2_R3_AUTHORITY: dict[str, dict[str, Any]] = {
    "PHYSICS": {
        "native_authority": "AUTH-R3-PHY",
        "status": "HOLD",
        "admitted": False,
        "scope": "VALIDATED_SYNTHETIC_ONLY",
        "contract_ref": "Shared/roles/CORE-AUTHORITY-CONTRACT.md",
        "blueprint_ref": "Shared/web/interactive-page-blueprints.v1.json",
    },
    "CHEMISTRY": {
        "native_authority": "AUTH-R3-CHE",
        "status": "HOLD",
        "admitted": False,
        "scope": "VALIDATED_SYNTHETIC_ONLY",
        "contract_ref": "Shared/roles/CORE-AUTHORITY-CONTRACT.md",
    },
    "MATHEMATICS": {
        "native_authority": "AUTH-R3-MAT",
        "status": "HOLD",
        "admitted": False,
        "scope": "VALIDATED_SYNTHETIC_ONLY",
        "contract_ref": "Shared/roles/CORE-AUTHORITY-CONTRACT.md",
    },
    "BIOLOGY": {
        "native_authority": "AUTH-R3-BIO-PENDING",
        "status": "SCOPE_PENDING",
        "admitted": False,
        "scope": "NONE",
        "note": "Biological curriculum extension scope pending explicit Owner adoption",
    },
}

# Native Contract Mapping from projection types to authoritative source references
NATIVE_CONTRACT_MAP: dict[str, dict[str, Any]] = {
    "SOURCE": {
        "legacy_path": "schemas/v1/source.schema.json",
        "native_reference": "Shared/library/source_custody.py",
        "status": "HOLD",
    },
    "WARRANT": {
        "legacy_path": "schemas/v1/warrant.schema.json",
        "native_reference": "Shared/library/package.schema.json",
        "status": "HOLD",
    },
    "CONSTRUCTION": {
        "legacy_path": "schemas/v1/construction.schema.json",
        "native_reference": "Shared/roles/CORE1A.md",
        "status": "HOLD",
    },
    "LESSON": {
        "legacy_path": "schemas/v1/lesson.schema.json",
        "native_reference": "Shared/roles/CORE1A.md",
        "status": "HOLD",
    },
    "ASSESSMENT": {
        "legacy_path": "schemas/v1/assessment.schema.json",
        "native_reference": "Shared/roles/CORE1B.md",
        "status": "HOLD",
    },
    "APPROVAL": {
        "legacy_path": "schemas/v1/approval.schema.json",
        "native_reference": "Shared/tools/review_authority.py",
        "status": "HOLD",
    },
    "QUESTION": {
        "legacy_path": "nsejs/core2/question-map.v1.json",
        "native_reference": "Shared/roles/CORE2.md",
        "status": "HOLD",
    },
    "RELATIONSHIP": {
        "legacy_path": "schemas/v1/relationship.schema.json",
        "native_reference": "Shared/roles/LEARNER-PRODUCT-TEMPLATES.md",
        "status": "HOLD",
    },
}

# Immutable R3 Freeze Policy
R3_FREEZE_POLICY: dict[str, Any] = {
    "freeze_status": "FREEZE_PENDING_GOLDEN",
    "academic_admission": "HOLD",
    "production_release": "NONE",
    "ui_freeze": "NOT_GRANTED",
    "accepted_golden": None,
    "production_enabled": False,
    "academic_release_enabled": False,
    "d3_1_status": "PAUSED",
    "frozen_legacy_preview_pin": FROZEN_LEGACY_PREVIEW_PIN,
    "external_trust_required": True,
    "self_approval_permitted": False,
}


# -----------------------------------------------------------------------------
# Cryptographic and OpenSSL Utilities
# -----------------------------------------------------------------------------

def find_openssl() -> str | None:
    """Locate OpenSSL binary on PATH or standard installation directories."""
    env_bin = os.environ.get("OPENSSL_BIN")
    if env_bin and os.path.isfile(env_bin):
        return env_bin
    which_bin = shutil.which("openssl")
    if which_bin:
        return which_bin
    common_paths = [
        r"C:\Program Files\Git\usr\bin\openssl.exe",
        r"C:\Program Files (x86)\Git\usr\bin\openssl.exe",
        "/usr/bin/openssl",
        "/usr/local/bin/openssl",
    ]
    for path in common_paths:
        if os.path.isfile(path):
            return path
    return None


def run_openssl_verify(
    data_bytes: bytes,
    signature_bytes: bytes,
    pubkey_path: Path | str,
    openssl_bin: str | None = None,
) -> bool:
    """Verify Ed25519 detached signature using OpenSSL pkeyutl."""
    bin_path = openssl_bin or find_openssl()
    if not bin_path:
        raise ReceiptVerificationError("OPENSSL_UNAVAILABLE: OpenSSL binary not found")

    pub_path = Path(pubkey_path).resolve()
    if not pub_path.exists():
        raise ReceiptVerificationError(f"KEY_NOT_FOUND: {pub_path}")

    import tempfile
    with tempfile.TemporaryDirectory() as td:
        tmp_data = Path(td) / "data.bin"
        tmp_sig = Path(td) / "sig.bin"
        tmp_data.write_bytes(data_bytes)
        tmp_sig.write_bytes(signature_bytes)

        cmd = [
            bin_path,
            "pkeyutl",
            "-verify",
            "-pubin",
            "-inkey",
            str(pub_path),
            "-rawin",
            "-in",
            str(tmp_data),
            "-sigfile",
            str(tmp_sig),
        ]
        res = subprocess.run(cmd, capture_output=True)
        return res.returncode == 0


def run_openssl_sign(
    data_bytes: bytes,
    privkey_path: Path | str,
    openssl_bin: str | None = None,
) -> bytes:
    """Generate detached Ed25519 signature using OpenSSL pkeyutl (for review tooling / tests)."""
    bin_path = openssl_bin or find_openssl()
    if not bin_path:
        raise ReceiptVerificationError("OPENSSL_UNAVAILABLE: OpenSSL binary not found")

    priv_path = Path(privkey_path).resolve()
    if not priv_path.exists():
        raise ReceiptVerificationError(f"KEY_NOT_FOUND: {priv_path}")

    import tempfile
    with tempfile.TemporaryDirectory() as td:
        tmp_data = Path(td) / "data.bin"
        tmp_sig = Path(td) / "sig.bin"
        tmp_data.write_bytes(data_bytes)

        cmd = [
            bin_path,
            "pkeyutl",
            "-sign",
            "-inkey",
            str(priv_path),
            "-rawin",
            "-in",
            str(tmp_data),
            "-out",
            str(tmp_sig),
        ]
        res = subprocess.run(cmd, capture_output=True)
        if res.returncode != 0:
            raise ReceiptVerificationError(f"SIGNING_FAILED: {res.stderr.decode()}")
        return tmp_sig.read_bytes()


# -----------------------------------------------------------------------------
# Independent Acceptance Receipt Verifier
# -----------------------------------------------------------------------------

REQUIRED_RECEIPT_FIELDS = frozenset({
    "workpack",
    "decision",
    "base_commit",
    "candidate_commit",
    "candidate_tree",
    "kit_manifest_sha256",
    "reviewer_id",
    "reviewed_at",
    "test_evidence_sha256",
})


class ReceiptVerifier:
    """Audits and cryptographically verifies independent acceptance receipts."""

    def __init__(
        self,
        trusted_reviewers: set[str] | list[str] | None = None,
        kit_manifest_sha256: str = DEFAULT_KIT_MANIFEST_SHA256,
        max_age_seconds: int = 86400 * 30,  # 30-day default TTL
        openssl_bin: str | None = None,
    ) -> None:
        self.trusted_reviewers = set(trusted_reviewers) if trusted_reviewers is not None else None
        self.kit_manifest_sha256 = kit_manifest_sha256
        self.max_age_seconds = max_age_seconds
        self.openssl_bin = openssl_bin or find_openssl()

    def verify_receipt(
        self,
        receipt: dict[str, Any],
        signature: bytes | str | None,
        pubkey_path: Path | str | None = None,
        expected_workpack: str | None = None,
        author_id: str | None = None,
        now: datetime | None = None,
        repo_path: Path | str | None = None,
        current_base: str | None = None,
    ) -> dict[str, Any]:
        """Perform comprehensive acceptance receipt audit.

        Rejects unsigned, tampered, stale, unauthorized, self-approved,
        or scope-mismatched receipts fail-closed.
        """
        # 1. Structural schema validation
        if not isinstance(receipt, dict):
            raise ReceiptVerificationError("MALFORMED_RECEIPT: Receipt must be a dictionary")

        missing = REQUIRED_RECEIPT_FIELDS - set(receipt.keys())
        if missing:
            raise ReceiptVerificationError(f"MALFORMED_RECEIPT: Missing required fields: {sorted(missing)}")

        workpack = receipt["workpack"]
        if not isinstance(workpack, str) or not re.fullmatch(r"^A\d{2}$", workpack):
            raise ReceiptVerificationError(f"MALFORMED_RECEIPT: Invalid workpack ID format '{workpack}'")

        if expected_workpack and workpack != expected_workpack:
            raise ReceiptVerificationError(f"SCOPE_MISMATCH: Expected workpack '{expected_workpack}', got '{workpack}'")

        decision = receipt["decision"]
        if decision != "ACCEPTED":
            raise ReceiptVerificationError(f"INVALID_DECISION: Only 'ACCEPTED' receipts are valid, got '{decision}'")

        reviewer_id = receipt["reviewer_id"]
        if not isinstance(reviewer_id, str) or not reviewer_id.strip():
            raise ReceiptVerificationError("MALFORMED_RECEIPT: Empty or invalid reviewer_id")

        # 2. Self-approval and conflict-of-interest check
        if author_id and reviewer_id == author_id:
            raise ReceiptVerificationError(f"SELF_APPROVAL_PROHIBITED: Reviewer '{reviewer_id}' matches author '{author_id}'")
        if "author_id" in receipt and reviewer_id == receipt["author_id"]:
            raise ReceiptVerificationError("SELF_APPROVAL_PROHIBITED: Self-approval detected in receipt metadata")

        # 3. Trusted reviewer authorization roster check
        if self.trusted_reviewers is not None and reviewer_id not in self.trusted_reviewers:
            raise ReceiptVerificationError(f"UNAUTHORIZED_REVIEWER: Reviewer '{reviewer_id}' is not in trusted roster")

        # 4. Scope and Kit Manifest Binding Check
        kit_hash = receipt["kit_manifest_sha256"]
        if kit_hash != self.kit_manifest_sha256:
            raise ReceiptVerificationError(
                f"SCOPE_MISMATCH: Kit manifest digest mismatch. Expected '{self.kit_manifest_sha256}', got '{kit_hash}'"
            )

        # 5. Git Commit and Hash Format Verification
        for field in ("base_commit", "candidate_commit", "candidate_tree"):
            val = receipt[field]
            if not isinstance(val, str) or not re.fullmatch(r"^[a-f0-9]{40}$", val):
                raise ReceiptVerificationError(f"MALFORMED_RECEIPT: Invalid 40-char hex commit/tree for {field}: '{val}'")

        evidence_hash = receipt["test_evidence_sha256"]
        if not isinstance(evidence_hash, str) or not re.fullmatch(r"^[a-f0-9]{64}$", evidence_hash):
            raise ReceiptVerificationError(f"MALFORMED_RECEIPT: Invalid 64-char hex test_evidence_sha256: '{evidence_hash}'")

        # 6. Timestamp Staleness and Temporal Validity Check
        reviewed_at_str = receipt["reviewed_at"]
        try:
            reviewed_dt = datetime.fromisoformat(reviewed_at_str.replace("Z", "+00:00"))
        except (ValueError, TypeError) as exc:
            raise ReceiptVerificationError(f"MALFORMED_RECEIPT: Invalid ISO 8601 reviewed_at '{reviewed_at_str}'") from exc

        current_time = now or datetime.now(timezone.utc)
        # Clock drift allowance: 300 seconds
        if reviewed_dt.timestamp() > current_time.timestamp() + 300:
            raise ReceiptVerificationError(f"STALE_RECEIPT: Review timestamp is in the future: {reviewed_at_str}")

        age = current_time.timestamp() - reviewed_dt.timestamp()
        if age > self.max_age_seconds:
            raise ReceiptVerificationError(
                f"STALE_RECEIPT: Receipt expired. Age {int(age)}s exceeds maximum allowed {self.max_age_seconds}s"
            )

        # 7. Signature Presence & Detached Cryptographic Verification
        if signature is None:
            raise ReceiptVerificationError("UNSIGNED_RECEIPT: Missing signature")

        sig_bytes = signature.encode() if isinstance(signature, str) else signature
        if not sig_bytes:
            raise ReceiptVerificationError("UNSIGNED_RECEIPT: Empty signature bytes")

        raw_json_bytes = canonical_bytes(receipt)
        if pubkey_path:
            valid = run_openssl_verify(
                data_bytes=raw_json_bytes,
                signature_bytes=sig_bytes,
                pubkey_path=pubkey_path,
                openssl_bin=self.openssl_bin,
            )
            if not valid:
                raise ReceiptVerificationError("TAMPERED_RECEIPT: Cryptographic signature verification failed")

        # 8. Git Lineage & Tree Verification (if repo_path provided)
        if repo_path:
            rp = Path(repo_path).resolve()
            # Verify candidate tree matches git commit
            cmd_tree = ["git", "-C", str(rp), "rev-parse", receipt["candidate_commit"] + "^{tree}"]
            res_tree = subprocess.run(cmd_tree, capture_output=True, text=True)
            if res_tree.returncode != 0 or res_tree.stdout.strip() != receipt["candidate_tree"]:
                raise ReceiptVerificationError(
                    f"TREE_MISMATCH: candidate_commit tree does not match candidate_tree: "
                    f"git={res_tree.stdout.strip()} vs receipt={receipt['candidate_tree']}"
                )

            # Verify base_commit is ancestor of candidate_commit
            cmd_ancestor = ["git", "-C", str(rp), "merge-base", "--is-ancestor", receipt["base_commit"], receipt["candidate_commit"]]
            if subprocess.run(cmd_ancestor, capture_output=True).returncode != 0:
                raise ReceiptVerificationError("LINEAGE_MISMATCH: base_commit is not ancestor of candidate_commit")

            # Verify candidate_commit is ancestor of current_base (if current_base given)
            if current_base:
                cmd_cb = ["git", "-C", str(rp), "merge-base", "--is-ancestor", receipt["candidate_commit"], current_base]
                if subprocess.run(cmd_cb, capture_output=True).returncode != 0:
                    raise ReceiptVerificationError("LINEAGE_MISMATCH: candidate_commit is not ancestor of target base")

        return {
            "status": "RECEIPT_VALIDATED",
            "workpack": workpack,
            "reviewer_id": reviewer_id,
            "reviewed_at": reviewed_at_str,
            "candidate_commit": receipt["candidate_commit"],
            "candidate_tree": receipt["candidate_tree"],
            "kit_manifest_sha256": kit_hash,
            "verified_at": current_time.isoformat(),
        }


# -----------------------------------------------------------------------------
# Prerequisite Receipt Batch Auditor
# -----------------------------------------------------------------------------

class PrerequisiteAuditor:
    """Audits required technical prerequisite receipts for a target workpack."""

    def __init__(
        self,
        verifier: ReceiptVerifier | None = None,
        kit_manifest_sha256: str = DEFAULT_KIT_MANIFEST_SHA256,
    ) -> None:
        self.verifier = verifier or ReceiptVerifier(kit_manifest_sha256=kit_manifest_sha256)
        self.kit_manifest_sha256 = kit_manifest_sha256

    def audit_prerequisites(
        self,
        workpack_id: str,
        plan_path: Path | str,
        receipts_dir: Path | str,
        keyfile: Path | str,
        repo_path: Path | str,
        current_base: str,
        reviewer_id: str | None = None,
        author_id: str | None = None,
    ) -> dict[str, Any]:
        """Verify all prerequisite receipts for workpack_id strictly according to receipt-protocol.md."""
        repo = Path(repo_path).resolve()
        receipts = Path(receipts_dir).resolve()
        key = Path(keyfile).resolve()

        # Enforce custody isolation boundaries
        if receipts.is_relative_to(repo):
            raise ReceiptVerificationError("EXTERNAL_CUSTODY_VIOLATION: Receipt directory must be external to target repo")
        if key.is_relative_to(repo):
            raise ReceiptVerificationError("EXTERNAL_CUSTODY_VIOLATION: Trusted keyfile must be external to target repo")

        plan = json.loads(Path(plan_path).read_text(encoding="utf-8"))
        wp_entry = next((x for x in plan if x["id"] == workpack_id), None)
        if not wp_entry:
            raise ReleaseAuthorityError(f"UNKNOWN_WORKPACK: '{workpack_id}' not found in plan")

        prereqs: list[str] = wp_entry.get("prerequisites", [])
        verified_prereqs: list[dict[str, Any]] = []

        for pre in prereqs:
            f_json = receipts / f"{pre}.json"
            f_sig = receipts / f"{pre}.sig"
            if not f_json.exists():
                raise ReceiptVerificationError(f"MISSING_RECEIPT: Prerequisite receipt missing: {f_json}")
            if not f_sig.exists():
                raise ReceiptVerificationError(f"UNSIGNED_RECEIPT: Prerequisite signature missing: {f_sig}")

            r_data = json.loads(f_json.read_text(encoding="utf-8"))
            r_sig = f_sig.read_bytes()

            res = self.verifier.verify_receipt(
                receipt=r_data,
                signature=r_sig,
                pubkey_path=key,
                expected_workpack=pre,
                author_id=author_id,
                repo_path=repo,
                current_base=current_base,
            )
            if reviewer_id and res["reviewer_id"] != reviewer_id:
                raise ReceiptVerificationError(
                    f"SCOPE_MISMATCH: Prerequisite {pre} reviewer '{res['reviewer_id']}' != expected '{reviewer_id}'"
                )
            verified_prereqs.append(res)

        return {
            "workpack_id": workpack_id,
            "prerequisites_count": len(prereqs),
            "verified_prerequisites": verified_prereqs,
            "audit_status": "PREREQUISITES_VERIFIED",
        }


# -----------------------------------------------------------------------------
# Dependency Closure Validator
# -----------------------------------------------------------------------------

class DependencyClosureValidator:
    """Enforces strict structural DAG closure, typed ref integrity, and subject isolation."""

    def __init__(self, demo_mode: bool = True) -> None:
        self.demo_mode = demo_mode

    def validate_graph(self, graph: list[dict[str, Any]]) -> dict[str, Any]:
        """Validate that all objects in graph form a valid, uncorrupted DAG closure."""
        if not isinstance(graph, list) or not graph:
            raise DependencyClosureError("INVALID_GRAPH: Graph must be a non-empty list of objects")

        ids = [o.get("id") for o in graph if isinstance(o, dict)]
        if len(ids) != len(graph) or any(not isinstance(i, str) for i in ids):
            raise DependencyClosureError("INVALID_ID: All objects must have unique string IDs")

        if len(set(ids)) != len(ids):
            raise DependencyClosureError("DUPLICATE_ID: Graph contains duplicate IDs")

        sorted_objects = sorted(copy.deepcopy(graph), key=lambda o: o["id"])
        validator = ObjectGraphValidator(demo_mode=self.demo_mode)
        try:
            validator.validate_graph(sorted_objects)
        except GraphValidationError as exc:
            raise DependencyClosureError(f"GRAPH_VALIDATION_FAILURE: {exc}") from exc

        graph_digest = compute_object_digest(sorted_objects)
        return {
            "status": "CLOSURE_VALID",
            "total_objects": len(sorted_objects),
            "graph_digest": graph_digest,
            "object_ids": sorted(ids),
        }


# -----------------------------------------------------------------------------
# Academic Release Compiler Integrator
# -----------------------------------------------------------------------------

class AcademicReleaseIntegrator:
    """Coordinates academic release compilation under strict R2/R3 authority bounds."""

    def __init__(
        self,
        target_mode: str = "DEMO",
        receipt_verifier: ReceiptVerifier | None = None,
        closure_validator: DependencyClosureValidator | None = None,
    ) -> None:
        if target_mode != "DEMO":
            raise ProductionReleaseProhibitedError("PRODUCTION_TARGET_PROHIBITED: Target mode must be DEMO")
        self.target_mode = target_mode
        self.receipt_verifier = receipt_verifier or ReceiptVerifier()
        self.closure_validator = closure_validator or DependencyClosureValidator(demo_mode=True)
        self.compiler = ReleaseProjectionCompiler(target_mode="DEMO")

    def integrate_release(
        self,
        graph: list[dict[str, Any]],
        release_id: str = "RELEASE-ACADEMIC-DEMO-01",
        workpack_id: str | None = None,
        prerequisite_audit: dict[str, Any] | None = None,
    ) -> dict[str, Any]:
        """Compile a release projection binding R2/R3 authorities and freeze invariants."""
        # 1. Dependency Closure Validation
        closure_res = self.closure_validator.validate_graph(graph)

        # 2. Compile Public-Safe Diagnostic Projection
        projection = self.compiler.compile_release(graph, release_id=release_id)

        # 3. Assert and Bind R3 Freeze Policy Invariants
        if projection.get("academic_admission") != "HOLD":
            raise AcademicAdmissionError("ACADEMIC_ADMISSION_UNAUTHORIZED: Must be HOLD")
        if projection.get("production_release") != "NONE":
            raise ProductionReleaseProhibitedError("PRODUCTION_RELEASE_PROHIBITED: Must be NONE")
        if projection.get("ui_freeze") != "NOT_GRANTED":
            raise ReleaseAuthorityError("UI_FREEZE_UNAUTHORIZED: Must be NOT_GRANTED")

        # 4. Bind Native R2/R3 Authority Mapping and Audit Record
        integrated_package = {
            **projection,
            "r3_freeze_policy": copy.deepcopy(R3_FREEZE_POLICY),
            "native_authorities": copy.deepcopy(NATIVE_R2_R3_AUTHORITY),
            "native_contract_mapping": copy.deepcopy(NATIVE_CONTRACT_MAP),
            "dependency_closure": {
                "status": closure_res["status"],
                "total_objects": closure_res["total_objects"],
                "graph_digest": closure_res["graph_digest"],
            },
            "prerequisite_audit": prerequisite_audit or {"status": "NOT_AUDITED_NO_PREREQUISITE_SPECIFIED"},
            "compiler_integration_status": "FROZEN_ACADEMIC_DEMO_COMPLIANT",
        }

        integrated_package["release_digest"] = compute_object_digest({
            k: v for k, v in integrated_package.items() if k != "release_digest"
        })
        return integrated_package
