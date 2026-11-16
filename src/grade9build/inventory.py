"""Lossless Git inventory. Full ledgers belong in private custody; public summaries are aggregate."""
from __future__ import annotations
import argparse
import hashlib
import json
import os
from pathlib import Path
import re
import subprocess

MODES = {"100644": ("FILE", 0o644), "100755": ("FILE", 0o755), "120000": ("SYMLINK", 0o777)}
PINS = {"v35": ("8a02a8eb23ea37a7d8acb74d1bc193dd17657e5b", "c00cd1dc4ce65d5e8602de133d07e30a4934ad6a"), "v41": ("564ad2a07fddc0fdd30d103674b3eca61235a54b", "703ee4d6ffcd0021a1dc1f8fda1cec61e149d149")}
LFS = b"version https://git-lfs.github.com/spec/v1\n"


def git(repo, *args, input=None):
    return subprocess.run(["git", "--no-replace-objects", "-C", str(repo), *args], input=input, check=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE).stdout


def git_mode_to_unix(mode):
    return MODES[mode][1]


def git_mode_to_kind(mode):
    return MODES[mode][0]


def tree_entries(repo, commit):
    raw = git(repo, "ls-tree", "-rlz", "--full-tree", commit)
    if raw and not raw.endswith(b"\0"):
        raise ValueError("truncated tree listing")
    result = []
    seen = set()
    for entry in raw.split(b"\0")[:-1]:
        meta, path = entry.split(b"\t", 1)
        mode, kind, oid, size = meta.decode("ascii").split()
        name = path.decode("utf-8", "strict")  # non-UTF8 names block; never lossy-decode
        if name in seen or not name or not re.fullmatch(r"[0-9a-f]{40}", oid):
            raise ValueError("duplicate path or invalid object identity")
        seen.add(name)
        if (mode, kind) == ("160000", "commit") and size == "-":
            result.append((name, mode, oid, None)); continue
        if mode not in MODES or kind != "blob" or not size.isdecimal():
            raise ValueError("unsupported tree entry")
        result.append((name, mode, oid, int(size)))
    return result


def read_blob(repo, oid, size):
    # One object per subprocess: bounded memory and unambiguous framing.
    raw = git(repo, "cat-file", "--batch", input=(oid+"\n").encode("ascii"))
    header, sep, body = raw.partition(b"\n")
    if not sep or header != f"{oid} blob {size}".encode("ascii") or len(body) != size+1 or not body.endswith(b"\n"):
        raise ValueError("missing, malformed or truncated blob response")
    data = body[:-1]
    if hashlib.sha1(f"blob {size}\0".encode()+data).hexdigest() != oid:
        raise ValueError("Git blob identity mismatch")
    return data


def inspect_snapshot(repo, commit, snapshot_id, expected_tree=None):
    repo = Path(repo).resolve(strict=True)
    resolved = git(repo, "rev-parse", "--verify", "--end-of-options", commit+"^{commit}").decode().strip()
    tree = git(repo, "rev-parse", resolved+"^{tree}").decode().strip()
    if expected_tree is not None and tree != expected_tree:
        raise ValueError("wrong source tree")
    for key,pin in PINS.items():
        if snapshot_id.startswith(f"grade9{key}:") and (snapshot_id != f"grade9{key}:{pin[0]}" or (resolved,tree) != pin):
            raise ValueError("wrong source pin")
    records, objects, gaps = [], [], []
    for path, mode, oid, size in tree_entries(repo, resolved):
        if mode == "160000":
            gaps.append({"path":path,"kind":"GITLINK","commit":oid,"status":"BLOCKED_SUBMODULE_CUSTODY"}); continue
        data = read_blob(repo, oid, size)
        row = {"snapshot_id":snapshot_id,"path":path,"kind":git_mode_to_kind(mode),"size":size,"sha256":hashlib.sha256(data).hexdigest(),"mode":git_mode_to_unix(mode)}
        records.append(row); objects.append({"path":path,"git_blob":oid,"git_mode":mode})
        if data.startswith(LFS):
            gaps.append({"path":path,"kind":"LFS_POINTER","status":"BLOCKED_LFS_PAYLOAD_CUSTODY"})
    return {"commit":resolved,"tree":tree,"records":sorted(records,key=lambda r:r["path"]),"objects":sorted(objects,key=lambda r:r["path"]),"gaps":gaps,"owner_local_scope":"NOT_INSPECTED_SEPARATE_CUSTODY_REQUIRED"}


def enumerate_git_snapshot(repo_path, commit, snapshot_id):
    result=inspect_snapshot(repo_path,commit,snapshot_id)
    if result["gaps"]: raise ValueError("unresolved non-blob or LFS custody; use inspect_snapshot")
    return result["records"]


def validate_inventory_data(records, schema_path=None):
    errors=[]; seen=set()
    for row in records:
        key=(row.get("snapshot_id"),row.get("path"))
        if key in seen: errors.append("Duplicate entry: "+repr(key))
        seen.add(key)
        if set(row) != {"snapshot_id","path","kind","size","sha256","mode"} or not isinstance(row.get("path"),str) or not row.get("path") or not isinstance(row.get("snapshot_id"),str) or not re.fullmatch(r"[A-Za-z][A-Za-z0-9._:-]{2,127}",row["snapshot_id"]) or row.get("kind") not in ("FILE","SYMLINK") or type(row.get("size")) is not int or row["size"]<0 or not re.fullmatch(r"[0-9a-f]{64}",str(row.get("sha256"))) or row.get("mode") not in ({420,493} if row.get("kind")=="FILE" else {511}): errors.append("Invalid record: "+repr(key))
    if schema_path is not None:
        from jsonschema import Draft202012Validator
        errors.extend(e.message for e in Draft202012Validator(json.loads(Path(schema_path).read_text())).iter_errors(records))
    return not errors, errors


def main():
    p=argparse.ArgumentParser(); p.add_argument("--repo",required=True); p.add_argument("--commit",required=True); p.add_argument("--snapshot-id",required=True); p.add_argument("--expected-tree",required=True); p.add_argument("--output",required=True,help="private custody output outside target"); p.add_argument("--schema",required=True); p.add_argument("--target-root",required=True)
    a=p.parse_args(); out=Path(a.output).resolve(); target=Path(a.target_root).resolve(); source=Path(a.repo).resolve()
    if out.is_relative_to(target) or out.is_relative_to(source): raise ValueError("inventory output must be external to target and source")
    r=inspect_snapshot(source,a.commit,a.snapshot_id,a.expected_tree); ok,errors=validate_inventory_data(r["records"],a.schema)
    if not ok: raise ValueError(errors)
    out.parent.mkdir(parents=True,exist_ok=True); out.write_text(json.dumps(r,indent=2)+"\n",encoding="utf-8")
    raise SystemExit(1 if r["gaps"] else 0)

if __name__ == "__main__": main()
