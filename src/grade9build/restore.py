"""Private backup/restore. Use fresh isolated roots, never source or target trees."""
from __future__ import annotations
import argparse
import hashlib
import json
import os
from pathlib import Path
import stat
from .inventory import inspect_snapshot, read_blob, validate_inventory_data


def safe_rel_path(path_str):
    if not isinstance(path_str,str) or not path_str or "\\" in path_str or ":" in path_str or "\0" in path_str or any(p in ("", ".", "..") for p in path_str.split("/")):
        raise ValueError("Unsafe path: "+repr(path_str))
    return Path(path_str)


def scoped(records,snapshot_id=None):
    ok,errors=validate_inventory_data(records)
    if not ok: raise ValueError(errors)
    ids={r["snapshot_id"] for r in records}
    if snapshot_id is None:
        if len(ids)!=1: raise ValueError("exactly one snapshot required")
        snapshot_id=next(iter(ids))
    rows=[r for r in records if r["snapshot_id"]==snapshot_id]
    if not rows: raise ValueError("unknown or empty snapshot")
    paths={r["path"] for r in rows}
    for path in paths:
        rel=safe_rel_path(path)
        if any(str(p) in paths for p in rel.parents if str(p)!="."): raise ValueError("file/ancestor collision")
    return rows


def root_directory(root, fresh=False):
    p=Path(root).absolute()
    for q in [*reversed(p.parents),p]:
        if q.is_symlink(): raise ValueError("symlink root/ancestor")
    if fresh: p.mkdir(mode=0o700,parents=False,exist_ok=False)
    if not p.is_dir(): raise ValueError("root is not directory")
    return p


def checked_dest(root,rel,create=False):
    p=root
    for part in rel.parts[:-1]:
        p=p/part
        if create and not p.exists() and not p.is_symlink(): p.mkdir(mode=0o700)
        if p.is_symlink() or not p.is_dir(): raise ValueError("unsafe parent")
    return p/rel.name


def restore_file_bytes(data,dest_path,mode=0o644,expected_sha256=None,kind="FILE"):
    if expected_sha256 is not None and hashlib.sha256(data).hexdigest()!=expected_sha256: raise ValueError("SHA-256 mismatch")
    if kind=="SYMLINK":
        if mode!=0o777: raise ValueError("unsupported symlink mode")
        link=os.fsdecode(data); os.symlink(link,dest_path)  # preserve bytes; never traverse link
    elif kind=="FILE":
        if mode not in (0o644,0o755): raise ValueError("unsupported file mode")
        fd=os.open(dest_path,os.O_WRONLY|os.O_CREAT|os.O_EXCL|os.O_NOFOLLOW,mode)
        with os.fdopen(fd,"wb") as f:
            f.write(data); os.fchmod(f.fileno(),mode)
    else: raise ValueError("unsupported kind")


def restore_snapshot_from_git(repo_path,commit,inventory_records,target_root,snapshot_id=None):
    rows=scoped(inventory_records,snapshot_id); info=inspect_snapshot(repo_path,commit,rows[0]["snapshot_id"])
    if info["gaps"] or info["records"]!=sorted(rows,key=lambda r:r["path"]): raise ValueError("inventory does not equal complete source snapshot")
    objects={x["path"]:x for x in info["objects"]}; root=root_directory(target_root,True)
    for r in rows:
        dest=checked_dest(root,safe_rel_path(r["path"]),True)
        restore_file_bytes(read_blob(repo_path,objects[r["path"]]["git_blob"],r["size"]),dest,r["mode"],r["sha256"],r["kind"])
    verify_restored_directory(rows,root); return len(rows)


def read_entry(root,r):
    dest=checked_dest(root,safe_rel_path(r["path"])); st=dest.lstat()
    if r["kind"]=="SYMLINK":
        if not stat.S_ISLNK(st.st_mode): raise ValueError("kind mismatch")
        data=os.fsencode(os.readlink(dest))
    else:
        if not stat.S_ISREG(st.st_mode): raise ValueError("kind mismatch")
        fd=os.open(dest,os.O_RDONLY|os.O_NOFOLLOW)
        with os.fdopen(fd,"rb") as f:
            if os.fstat(f.fileno())!=st: raise ValueError("file changed during verification")
            data=f.read()
    if stat.S_IMODE(st.st_mode)!=r["mode"]: raise ValueError("mode mismatch")
    if len(data)!=r["size"] or hashlib.sha256(data).hexdigest()!=r["sha256"]: raise ValueError("size or digest mismatch")
    return data


def verify_restored_directory(inventory_records,target_root,snapshot_id=None,allow_extra_files=False):
    if allow_extra_files: raise ValueError("strict verification cannot allow extras")
    rows=scoped(inventory_records,snapshot_id); root=root_directory(target_root)
    expected={r["path"] for r in rows}; dirs={str(p) for x in expected for p in Path(x).parents if str(p)!="."}; actual=set(); actual_dirs=set()
    for parent,subdirs,files in os.walk(root,followlinks=False):
        for name in subdirs[:]:
            p=Path(parent)/name
            if p.is_symlink(): actual.add(p.relative_to(root).as_posix()); subdirs.remove(name)
            else: actual_dirs.add(p.relative_to(root).as_posix())
        for name in files: actual.add((Path(parent)/name).relative_to(root).as_posix())
    if expected!=actual or dirs!=actual_dirs: raise ValueError("missing or unaccounted paths")
    for r in rows: read_entry(root,r)
    return {"status":"VERIFIED","verified_files":len(rows),"total_bytes":sum(r["size"] for r in rows),"tamper_detected":False,"unaccounted_files":0}


def restore_from_backup(records,backup_root,target_root,snapshot_id=None):
    rows=scoped(records,snapshot_id); source=root_directory(backup_root)
    verify_restored_directory(rows,source); dest=root_directory(target_root,True)
    for r in rows: restore_file_bytes(read_entry(source,r),checked_dest(dest,safe_rel_path(r["path"]),True),r["mode"],r["sha256"],r["kind"])
    return verify_restored_directory(rows,dest)


def main():
    p=argparse.ArgumentParser(); p.add_argument("--inventory",required=True); p.add_argument("--snapshot-id",required=True); p.add_argument("--restore-root",required=True); p.add_argument("--backup-root"); p.add_argument("--target-root",required=True); p.add_argument("--repo"); p.add_argument("--commit"); p.add_argument("--verify-only",action="store_true")
    a=p.parse_args(); data=json.loads(Path(a.inventory).read_text()); rows=data["records"] if isinstance(data,dict) else data
    for path in [a.restore_root,a.backup_root]:
        if path and any(Path(path).resolve().is_relative_to(Path(root).resolve()) or Path(root).resolve().is_relative_to(Path(path).resolve()) for root in [a.target_root,a.repo] if root): raise ValueError("backup/restore must be outside source and target")
    if a.verify_only: result=verify_restored_directory(rows,a.restore_root,a.snapshot_id)
    else:
        if not (a.repo and a.commit and a.backup_root): raise ValueError("backup requires repo, commit and separate backup root")
        restore_snapshot_from_git(a.repo,a.commit,rows,a.backup_root,a.snapshot_id); result=restore_from_backup(rows,a.backup_root,a.restore_root,a.snapshot_id)
    print(json.dumps(result))

if __name__=="__main__": main()
