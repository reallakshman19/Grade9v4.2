"""Base adapter and migration importer protocol."""
from __future__ import annotations

import hashlib
import json
from typing import Any, Dict, Optional

from ..record_inventory import canonical_json_digest


class ImporterError(Exception):
    """Base exception for all migration adapter errors."""
    pass


class MissingFigureError(ImporterError):
    """Raised when a mandatory figure or asset reference is missing."""
    pass


class DefaultClassificationForbiddenError(ImporterError):
    """Raised when an importer attempts to assign default QRT or cognitive classifications."""
    pass


class InvalidClaimStatusError(ImporterError):
    """Raised when candidate claims attempt unauthorized promotion or verification."""
    pass


class UnknownRouteError(ImporterError):
    """Raised when an unregistered legacy route fails closed."""
    pass


class BaseImporter:
    """Base importer enforcing lossless source custody, exact hashes, and HOLD status."""

    VALID_POPULATIONS = {"LEGACY_267", "CANDIDATE_288"}

    def __init__(self, population_id: str = "LEGACY_267") -> None:
        if population_id not in self.VALID_POPULATIONS and not population_id.startswith("TEST_"):
            raise ImporterError(
                f"Invalid population_id '{population_id}'. Must be one of {self.VALID_POPULATIONS}"
            )
        self.population_id = population_id

    @staticmethod
    def compute_raw_hash(data: Any) -> str:
        """Compute SHA-256 hash of raw record data."""
        if isinstance(data, bytes):
            return hashlib.sha256(data).hexdigest()
        raw_bytes = json.dumps(data, sort_keys=True, separators=(",", ":")).encode("utf-8")
        return hashlib.sha256(raw_bytes).hexdigest()

    @staticmethod
    def compute_canonical_digest(data: Dict[str, Any]) -> str:
        """Compute RFC 8785 canonical JSON SHA-256 digest."""
        return canonical_json_digest(data)

    def verify_source_hash(self, data: Any, expected_hash: str) -> None:
        """Verify that actual raw data matches the recorded source hash."""
        actual_hash = self.compute_raw_hash(data)
        if actual_hash != expected_hash:
            raise ImporterError(
                f"Source hash mismatch: expected {expected_hash}, calculated {actual_hash}"
            )

    def build_envelope_scaffold(
        self,
        occurrence_id: str,
        legacy_alias: Optional[str],
        source_path: str,
        json_pointer: str,
        raw_source_hash: str,
        canonical_digest: str,
    ) -> Dict[str, Any]:
        """Construct the standard platform object envelope with strict HOLD invariants."""
        return {
            "schema_version": "g9-platform-envelope/1.0",
            "identity": {
                "logical_id": None,  # Explicitly unassigned; requires independent review
                "occurrence_id": occurrence_id,
                "legacy_alias": legacy_alias,
                "population_id": self.population_id,
            },
            "status": "HOLD",
            "academic_admission": "HOLD",
            "production_release": "NONE",
            "ui_freeze": "LOCKED_UNTIL_A61",
            "lineage": {
                "source_path": source_path,
                "json_pointer": json_pointer,
                "raw_source_hash": raw_source_hash,
                "canonical_digest": canonical_digest,
                "population_id": self.population_id,
            },
            "dependencies": [],
            "asset_claims": [],
            "payload": {},
            "private_raw_record": {},
        }
