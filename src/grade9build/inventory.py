"""Grade9v4.2 — Automated Byte Inventory Engine (Workpack A02).

Enumerates and verifies migration custody sources and target trees,
generating deterministic, schema-compliant byte inventories matching
02-contracts/schemas/inventory.schema.json.
"""

from __future__ import annotations

import argparse
import hashlib
import json
import os
from pathlib import Path
import stat
import subprocess
import sys
from typing import Any, Dict, List, Optional, Tuple


GIT_MODE_MAP = {
    "100644": 0o644,  # 420 - Standard regular file
    "100755": 0o755,  # 493 - Executable file
    "120000": 0o777,  # 511 - Symbolic link
}


def git_mode_to_unix(git_mode_str: str) -> int:
    """Translate git tree mode string (e.g. '100644') to Unix mode integer."""
    if git_mode_str in GIT_MODE_MAP:
        return GIT_MODE_MAP[git_mode_str]
    try:
        raw_mode = int(git_mode_str, 8)
        return stat.S_IMODE(raw_mode)
    except ValueError:
        return 0o644


def git_mode_to_kind(git_mode_str: str) -> str:
    """Determine KIND from git tree mode ('FILE' or 'SYMLINK')."""
    if git_mode_str.startswith("12"):
        return "SYMLINK"
    return "FILE"


def enumerate_git_snapshot(
    repo_path: str | Path,
    commit: str,
    snapshot_id: str,
) -> List[Dict[str, Any]]:
    """Enumerate all tracked objects in a git repository commit using batch streaming.

    Returns a deterministically sorted list of inventory records matching inventory.schema.json.
    """
    repo = Path(repo_path).resolve(strict=True)

    # 1. Run git ls-tree to list all blobs and metadata
    cmd = ["git", "-C", str(repo), "ls-tree", "-r", "-l", "--full-name", commit]
    proc = subprocess.run(cmd, capture_output=True, text=True, check=True)

    lines = [line.strip() for line in proc.stdout.splitlines() if line.strip()]
    if not lines:
        return []

    parsed_entries: List[Tuple[str, str, str, int, str]] = []
    for line in lines:
        # Format: <mode> SP <type> SP <object> SP <object-size> TAB <file>
        parts = line.split(maxsplit=4)
        if len(parts) < 5:
            continue
        mode_str, obj_type, blob_sha, size_str, path_str = parts
        size = int(size_str.strip()) if size_str.strip() != "-" else 0
        parsed_entries.append((mode_str, obj_type, blob_sha, size, path_str))

    # 2. Batch stream blob contents to compute exact SHA-256 digests
    cat_proc = subprocess.Popen(
        ["git", "-C", str(repo), "cat-file", "--batch"],
        stdin=subprocess.PIPE,
        stdout=subprocess.PIPE,
    )

    stdin_payload = "\n".join(e[2] for e in parsed_entries) + "\n"
    stdout_data, _ = cat_proc.communicate(stdin_payload.encode("utf-8"))

    # 3. Parse batch stream
    idx = 0
    records: List[Dict[str, Any]] = []

    for mode_str, obj_type, blob_sha, expected_size, path_str in parsed_entries:
        header_end = stdout_data.find(b"\n", idx)
        if header_end == -1:
            break
        header = stdout_data[idx:header_end].decode("utf-8")
        h_parts = header.split()
        if len(h_parts) >= 3 and h_parts[1] == "missing":
            raise ValueError(f"Missing git blob: {blob_sha} for path {path_str}")

        sha, actual_type, size = h_parts[0], h_parts[1], int(h_parts[2])
        idx = header_end + 1
        content_bytes = stdout_data[idx:idx + size]
        idx += size + 1  # git batch adds trailing newline

        sha256_digest = hashlib.sha256(content_bytes).hexdigest()
        kind = git_mode_to_kind(mode_str)
        unix_mode = git_mode_to_unix(mode_str)

        # Normalize path to POSIX forward slashes
        clean_path = Path(path_str).as_posix()

        records.append({
            "snapshot_id": snapshot_id,
            "path": clean_path,
            "kind": kind,
            "size": size,
            "sha256": sha256_digest,
            "mode": unix_mode,
        })

    # Sort deterministically by (snapshot_id, path)
    records.sort(key=lambda x: (x["snapshot_id"], x["path"]))
    return records


def validate_inventory_data(
    records: List[Dict[str, Any]],
    schema_path: Optional[str | Path] = None,
) -> Tuple[bool, List[str]]:
    """Validate inventory records against inventory.schema.json and uniqueness constraints."""
    errors: List[str] = []

    # 1. Uniqueness check on (snapshot_id, path)
    seen_keys = set()
    for i, r in enumerate(records):
        key = (r.get("snapshot_id"), r.get("path"))
        if key in seen_keys:
            errors.append(f"Duplicate entry at index {i}: {key}")
        seen_keys.add(key)

    # 2. Schema validation if jsonschema is available
    if schema_path is not None:
        sp = Path(schema_path).resolve(strict=True)
        schema_json = json.loads(sp.read_text(encoding="utf-8"))
        try:
            from jsonschema import Draft202012Validator
            validator = Draft202012Validator(schema_json)
            for err in validator.iter_errors(records):
                errors.append(f"Schema error at {list(err.path)}: {err.message}")
        except ImportError:
            # Fallback basic type checks if jsonschema not installed
            for i, r in enumerate(records):
                for req in ["snapshot_id", "path", "kind", "size", "sha256", "mode"]:
                    if req not in r:
                        errors.append(f"Missing required field '{req}' at record {i}")
                if r.get("kind") not in ("FILE", "SYMLINK"):
                    errors.append(f"Invalid kind '{r.get('kind')}' at record {i}")

    return len(errors) == 0, errors


def main() -> None:
    parser = argparse.ArgumentParser(description="Grade9v4.2 Automated Byte Inventory Generator")
    parser.add_argument("--repo", required=True, help="Path to git repository")
    parser.add_argument("--commit", default="HEAD", help="Commit SHA or ref (default: HEAD)")
    parser.add_argument("--snapshot-id", required=True, help="Snapshot identifier string")
    parser.add_argument("--output", required=True, help="Output JSON path")
    parser.add_argument("--schema", default=None, help="Path to inventory.schema.json for validation")

    args = parser.parse_args()

    records = enumerate_git_snapshot(args.repo, args.commit, args.snapshot_id)
    print(f"Enumerated {len(records)} items from {args.repo} at {args.commit}")

    if args.schema:
        ok, errors = validate_inventory_data(records, args.schema)
        if not ok:
            print("Validation FAILED with errors:", file=sys.stderr)
            for err in errors[:10]:
                print(f"  - {err}", file=sys.stderr)
            sys.exit(1)
        print("Schema validation: PASSED")

    out_p = Path(args.output).resolve()
    out_p.parent.mkdir(parents=True, exist_ok=True)
    out_p.write_text(json.dumps(records, indent=2) + "\n", encoding="utf-8")
    print(f"Successfully wrote inventory to: {out_p}")


if __name__ == "__main__":
    main()
