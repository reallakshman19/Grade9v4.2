import json
from pathlib import Path
import subprocess
import pytest
from grade9build.crosswalk import ROOT

V35_ROOT = Path("D:/CodeD/custody/Grade9v3.5")
V41_ROOT = Path("D:/CodeD/custody/Grade9v4.1")

def test_source_manifest_matches_git_trees():
    manifest_file = ROOT / "docs/migration/source-manifest.json"
    assert manifest_file.is_file(), "source-manifest.json must exist"
    data = json.loads(manifest_file.read_text(encoding="utf-8"))

    v35_entries = data["sources"]["v35"]
    v41_entries = data["sources"]["v41"]

    assert len(v35_entries) == 2657
    assert len(v41_entries) == 2634
    assert len(v35_entries) + len(v41_entries) == 5291

    # Verify against actual Git custody tree entry counts
    if V35_ROOT.exists() and (V35_ROOT / ".git").exists():
        raw_v35 = subprocess.run(
            ["git", "-C", str(V35_ROOT), "ls-tree", "-r", "--name-only", data["pins"]["v35"]["commit"]],
            stdout=subprocess.PIPE, check=True
        ).stdout.decode("utf-8").strip().splitlines()
        assert len(raw_v35) == 2657
        assert [e["path"] for e in v35_entries] == sorted(raw_v35)

    if V41_ROOT.exists() and (V41_ROOT / ".git").exists():
        raw_v41 = subprocess.run(
            ["git", "-C", str(V41_ROOT), "ls-tree", "-r", "--name-only", data["pins"]["v41"]["commit"]],
            stdout=subprocess.PIPE, check=True
        ).stdout.decode("utf-8").strip().splitlines()
        assert len(raw_v41) == 2634
        assert [e["path"] for e in v41_entries] == sorted(raw_v41)
