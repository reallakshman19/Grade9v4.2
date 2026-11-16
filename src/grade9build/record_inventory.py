"""Grade9v4.2 Record Inventory and Extraction Engine (Workpack A07).

Extracts source record occurrences and leaf paths from dual-source repositories,
computes canonical record digests, manages RFC 6901 JSON pointer locators, and
strictly preserves distinct populations (such as the 267 vs 288 problem banks)
without implicit merging.
"""

import hashlib
import json
from pathlib import Path
from typing import Dict, List, Any, Iterator, Tuple, Optional

def rfc6901_escape(token: str) -> str:
    """Escape a JSON pointer reference token according to RFC 6901."""
    return str(token).replace("~", "~0").replace("/", "~1")

def extract_leaf_pointers(obj: Any, prefix: str = "") -> Iterator[Tuple[str, Any]]:
    """Recursively enumerate all leaf pointers and scalar/empty values in RFC 6901 format."""
    if isinstance(obj, dict) and obj:
        for k, v in obj.items():
            yield from extract_leaf_pointers(v, prefix + "/" + rfc6901_escape(k))
    elif isinstance(obj, list) and obj:
        for i, v in enumerate(obj):
            yield from extract_leaf_pointers(v, prefix + "/" + str(i))
    else:
        yield prefix, obj

def canonical_json_digest(data: Any) -> str:
    """Produce deterministic SHA-256 hex digest of JSON-serializable structure."""
    canonical_bytes = json.dumps(data, sort_keys=True, separators=(",", ":"), ensure_ascii=True).encode("utf-8")
    return hashlib.sha256(canonical_bytes).hexdigest()

class RecordOccurrence:
    """Represents a single immutable record occurrence extracted from a source artifact."""

    def __init__(
        self,
        snapshot_id: str,
        source_path: str,
        record_locator: str,
        occurrence_id: str,
        payload: Dict[str, Any],
        source_blob_sha: Optional[str] = None,
        source_sha256: Optional[str] = None,
        claimed_external_id: Optional[str] = None,
        subject_claim: Optional[str] = None,
        population_id: Optional[str] = None,
        rights_class: str = "INTERNAL_RESEARCH",
        disposition: str = "PRESERVED_IN_CUSTODY"
    ):
        self.snapshot_id = snapshot_id
        self.source_path = source_path
        self.record_locator = record_locator
        self.occurrence_id = occurrence_id
        self.payload = payload
        self.source_blob_sha = source_blob_sha or ""
        self.source_sha256 = source_sha256 or ""
        self.claimed_external_id = claimed_external_id
        self.subject_claim = subject_claim
        self.population_id = population_id
        self.rights_class = rights_class
        self.disposition = disposition
        self.record_digest = canonical_json_digest(payload)

    def get_leaf_map(self) -> Dict[str, Any]:
        """Return dictionary mapping all RFC 6901 JSON pointer paths to their values."""
        return dict(extract_leaf_pointers(self.payload))

    def to_dict(self) -> Dict[str, Any]:
        return {
            "snapshot_id": self.snapshot_id,
            "source_path": self.source_path,
            "record_locator": self.record_locator,
            "occurrence_id": self.occurrence_id,
            "record_digest": self.record_digest,
            "claimed_external_id": self.claimed_external_id,
            "subject_claim": self.subject_claim,
            "population_id": self.population_id,
            "rights_class": self.rights_class,
            "disposition": self.disposition,
            "leaf_count": len(self.get_leaf_map()),
            "source_blob_sha": self.source_blob_sha,
            "source_sha256": self.source_sha256
        }

class RecordInventoryEngine:
    """Manages collections of record occurrences, population separation, and leaf catalogs."""

    def __init__(self):
        self.records: List[RecordOccurrence] = []
        self._occurrence_ids: set = set()
        self.populations: Dict[str, List[RecordOccurrence]] = {}

    def add_record(self, record: RecordOccurrence) -> None:
        if record.occurrence_id in self._occurrence_ids:
            raise ValueError(f"Duplicate occurrence ID rejected: {record.occurrence_id}")
        self._occurrence_ids.add(record.occurrence_id)
        self.records.append(record)

        pop = record.population_id or "default"
        if pop not in self.populations:
            self.populations[pop] = []
        self.populations[pop].append(record)

    def extract_records_from_payload(
        self,
        snapshot_id: str,
        source_path: str,
        raw_data: Any,
        source_sha256: str = "",
        population_id: Optional[str] = None
    ) -> List[RecordOccurrence]:
        """Extract occurrences from dict or list payloads."""
        extracted = []
        if isinstance(raw_data, list):
            for idx, item in enumerate(raw_data):
                loc = f"/{idx}"
                oid = f"{source_path}#{idx}"
                ext_id = item.get("id") or item.get("question_id") if isinstance(item, dict) else None
                rec = RecordOccurrence(
                    snapshot_id=snapshot_id,
                    source_path=source_path,
                    record_locator=loc,
                    occurrence_id=oid,
                    payload=item if isinstance(item, dict) else {"value": item},
                    source_sha256=source_sha256,
                    claimed_external_id=str(ext_id) if ext_id else None,
                    population_id=population_id
                )
                self.add_record(rec)
                extracted.append(rec)
        elif isinstance(raw_data, dict):
            # Check if container has items or questions list
            items_list = raw_data.get("questions") or raw_data.get("items") or raw_data.get("records")
            if isinstance(items_list, list):
                for idx, item in enumerate(items_list):
                    loc = f"/questions/{idx}" if "questions" in raw_data else f"/items/{idx}"
                    oid = f"{source_path}#{idx}"
                    ext_id = item.get("id") or item.get("question_id") if isinstance(item, dict) else None
                    rec = RecordOccurrence(
                        snapshot_id=snapshot_id,
                        source_path=source_path,
                        record_locator=loc,
                        occurrence_id=oid,
                        payload=item if isinstance(item, dict) else {"value": item},
                        source_sha256=source_sha256,
                        claimed_external_id=str(ext_id) if ext_id else None,
                        population_id=population_id
                    )
                    self.add_record(rec)
                    extracted.append(rec)
            else:
                oid = f"{source_path}#0"
                rec = RecordOccurrence(
                    snapshot_id=snapshot_id,
                    source_path=source_path,
                    record_locator="",
                    occurrence_id=oid,
                    payload=raw_data,
                    source_sha256=source_sha256,
                    population_id=population_id
                )
                self.add_record(rec)
                extracted.append(rec)
        return extracted
