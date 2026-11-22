import json
from pathlib import Path
import pytest
from grade9build.crosswalk import MigrationCrosswalkEngine, ROOT

PORT_DIR = Path("D:/CodeD/g9v42-local-compatibility-port")

def test_source_manifest_integrity():
    manifest_file = ROOT / "docs/migration/source-manifest.json"
    assert manifest_file.is_file(), "source-manifest.json must exist"
    data = json.loads(manifest_file.read_text(encoding="utf-8"))

    assert data["schema_version"] == "g9-source-manifest/1.0"
    assert data["total_tracked_paths"] == 5291
    assert data["counts_by_repository"]["v35"] == 2657
    assert data["counts_by_repository"]["v41"] == 2634
    assert data["distinct_git_blobs"] == 4592

def test_capability_inventory_integrity():
    inv_file = ROOT / "docs/migration/capability-inventory.json"
    assert inv_file.is_file(), "capability-inventory.json must exist"
    data = json.loads(inv_file.read_text(encoding="utf-8"))

    assert data["schema_version"] == "g9-capability-inventory/1.0"
    assert data["total_candidates"] == 2002
    assert data["population_breakdown"]["CHEMISTRY_ADAPTER"] == 14
    assert data["population_breakdown"]["CHEMISTRY_QRT_CANDIDATE"] == 252
    assert data["population_breakdown"]["PHYSICS_AUTHOR_ROW"] == 132
    assert data["population_breakdown"]["NSEJS_QUESTION_IDENTITY"] == 267
    assert data["population_breakdown"]["HTML_EXECUTION_CONTEXT_CANDIDATE"] == 884

def test_crosswalk_conservation_equation():
    crosswalk_file = ROOT / "docs/migration/migration-crosswalk.json"
    summary_file = ROOT / "docs/migration/conservation-summary.json"
    assert crosswalk_file.is_file()
    assert summary_file.is_file()

    crosswalk = json.loads(crosswalk_file.read_text(encoding="utf-8"))
    summary = json.loads(summary_file.read_text(encoding="utf-8"))

    assert len(crosswalk) == 2002
    eq = summary["conservation_equation"]

    # Test exact conservation equation:
    # Eligible = Verified Parity + Outstanding + Approved Exclusions
    assert eq["eligible_capabilities"] == eq["verified_parity"] + eq["outstanding"] + eq["approved_exclusions"]
    assert eq["eligible_capabilities"] == len(crosswalk)
    assert eq["verified_parity"] > 0
    assert summary["actual_approved_compatibility_mappings"] == eq["verified_parity"]

    # All 8 conservation counters must be non-null integers
    counters = summary["conservation_counters"]
    assert len(counters) == 8
    for k, v in counters.items():
        assert isinstance(v, int), f"Counter {k} must be an integer, got {v}"
        assert v >= 0, f"Counter {k} must be non-negative"

def test_crosswalk_records_structure():
    crosswalk_file = ROOT / "docs/migration/migration-crosswalk.json"
    crosswalk = json.loads(crosswalk_file.read_text(encoding="utf-8"))

    valid_dispositions = {
        "PARITY_VERIFIED",
        "MAPPED_PENDING_PORT",
        "UNMAPPED",
        "HELD",
        "HELD_PENDING_OWNER_SCOPE_DECISION",
        "AUTHORING_GAP_SOURCE_INCOMPLETE",
        "EXCLUDED_APPROVED",
    }

    for row in crosswalk:
        assert "capability_id" in row
        assert "population" in row
        assert "source" in row
        assert "classification" in row
        assert "target" in row
        assert "evidence" in row
        assert row["disposition"] in valid_dispositions
        assert row["source"]["repository"] in ("v35", "v41")
        assert len(row["source"]["git_blob"]) == 40
