"""A39: exact Git-byte conservation and bounded migration closure.

Full native behavior/state compatibility requires external, reviewed, domain-specific
evidence. A preserved byte or held occurrence is NOT an approved mapping.
Only aggregate results leave the temporary private workspace.
"""
from __future__ import annotations
import argparse
import hashlib
import json
import os
from pathlib import Path
import tempfile
from .inventory import PINS, git, inspect_snapshot, validate_inventory_data
from .restore import restore_snapshot_from_git, restore_from_backup, read_entry
from .record_inventory import RecordInventoryEngine, canonical_json_digest, parse_source_bytes
from .field_ledger import FieldLedgerEngine, FieldLedgerAuditError
from .search_reconcile import SOURCE_PINS, SearchRouteReconciler

CONSERVATION_COUNTERS = (
    "unaccounted_resource_occurrences","unmapped_search_entries","unmapped_app_contexts",
    "missing_dependency_edges","unmapped_interactions","unexplained_behavior_differences",
    "unresolved_state_mappings","unapproved_exclusions",
)
EXPECTED = {"v35":(2657,96373813),"v41":(2634,113853741)}
EXPECTED_DISTINCT_BLOBS=4592

class ConservationVerificationError(ValueError): pass

def require(v,code):
    if not v:raise ConservationVerificationError(code)

class ConservationChecker:
    @staticmethod
    def inspect_source(repo,key):
        commit,tree=PINS[key]
        require(git(repo,"rev-parse","HEAD").decode().strip()==commit,"CHECKOUT_COMMIT_MISMATCH")
        require(git(repo,"rev-parse","HEAD^{tree}").decode().strip()==tree,"CHECKOUT_TREE_MISMATCH")
        require(not git(repo,"status","--porcelain","--untracked-files=no"),"TRACKED_SOURCE_CHANGED")
        info=inspect_snapshot(repo,commit,"grade9"+key+":"+commit,tree)
        require(not info["gaps"],"SOURCE_OBJECT_CUSTODY_GAP")
        rows=info["records"];valid,_=validate_inventory_data(rows)
        require(valid and (len(rows),sum(r["size"] for r in rows))==EXPECTED[key],"SOURCE_INVENTORY_MISMATCH")
        return info

    @staticmethod
    def audit_field_conservation(source,target,field_maps,*,private_record=None):
        try:return FieldLedgerEngine.audit_field_conservation(source,target,field_maps,private_record=private_record)
        except (FieldLedgerAuditError,KeyError,TypeError,ValueError) as e:
            raise ConservationVerificationError("FIELD_CONSERVATION_FAILED") from e

    @staticmethod
    def audit_occurrence_ledger(records,entries,*,trusted_scope_digest):
        """Verify exact source occurrence identity/digest, not logical ID sets.
        A held row can prove accounting only, never functional mapping.
        Independently provisioned scope pin protects against omission/replacement.
        """
        require(type(records) in (list,tuple) and type(entries) is list,"INVALID_OCCURRENCE_LEDGER")
        receipts=[r.to_dict() for r in records]
        require(canonical_json_digest(receipts)==trusted_scope_digest,"OCCURRENCE_SCOPE_PIN_MISMATCH")
        by_id={r.occurrence_id:r for r in records}
        require(len(by_id)==len(records),"DUPLICATE_SOURCE_OCCURRENCE")
        seen=set()
        for row in entries:
            require(type(row) is dict and set(row)=={"occurrence_id","record_digest","disposition"},"INVALID_OCCURRENCE_ROW")
            key=row["occurrence_id"]
            require(type(key) is str and key in by_id and key not in seen,"UNKNOWN_OR_DUPLICATE_OCCURRENCE")
            require(row["record_digest"]==by_id[key].record_digest,"OCCURRENCE_DIGEST_MISMATCH")
            # No arbitrary mapping/exclusion/approval status is accepted here.
            require(row["disposition"]=="PRESERVED_PRIVATE_HOLD","UNVERIFIED_DISPOSITION")
            seen.add(key)
        return {"scope_occurrences":len(records),"accounted_private_hold":len(seen),
                "unaccounted":len(records)-len(seen),"approved_mappings":0}

    @staticmethod
    def verify_conservation_summary(summary,*,recomputed):
        """An asserted badge or eight zeros cannot replace a recomputed result.
        Even the bounded actual summary never grants full technical acceptance.
        """
        require(type(summary) is dict and type(recomputed) is dict and canonical_json_digest(summary)==canonical_json_digest(recomputed),"SUMMARY_REPLAY_MISMATCH")
        require(summary.get("status")=="HOLD" and summary.get("academic_admission")=="HOLD" and summary.get("production_release")=="NONE" and summary.get("ui_freeze")=="NOT_GRANTED","UNAUTHORIZED_SUMMARY")
        require(summary.get("conservation_counters")=={k:None for k in CONSERVATION_COUNTERS},"FULL_COUNTERS_NOT_VERIFIED")
        return True

def run_public_git_audit(v35,v41,*,temp_parent):
    repos={"v35":Path(v35),"v41":Path(v41)}
    parent=Path(temp_parent).resolve(strict=True)
    require(parent.is_dir() and not any(parent.is_relative_to(r.resolve()) or r.resolve().is_relative_to(parent) for r in repos.values()),"RESTORE_ROOT_NOT_ISOLATED")
    require(not parent.is_relative_to(Path.cwd().resolve()) and not Path.cwd().resolve().is_relative_to(parent),"RESTORE_ROOT_NOT_ISOLATED")
    checker=ConservationChecker();sources={};blobs=set();documents={};leaf_total=0
    with tempfile.TemporaryDirectory(prefix="g9-a39-private-",dir=parent) as td:
        temp=Path(td)
        for key,repo in repos.items():
            info=checker.inspect_source(repo,key);rows=info["records"]
            blobs.update(r["git_blob"] for r in info["objects"])
            backup=temp/(key+"-backup");restored=temp/(key+"-restore")
            restored_count=restore_snapshot_from_git(repo,info["commit"],rows,backup)
            replay=restore_from_backup(rows,backup,restored)
            require(restored_count==len(rows)==replay["verified_files"] and replay["total_bytes"]==sum(r["size"] for r in rows),"RESTORE_COUNT_MISMATCH")
            sources[key]={"commit":info["commit"],"tree":info["tree"],"tracked_paths":len(rows),
                          "tracked_bytes":replay["total_bytes"],"restore_verified_paths":replay["verified_files"],
                          "inventory_digest":canonical_json_digest(rows),"git_blob_custody_gaps":0}
            by_path={r["path"]:r for r in rows}
            for pin in SOURCE_PINS:
                if pin.snapshot.split(":")[0]!=key:continue
                r=by_path[pin.path]
                original=read_entry(backup,r);replayed=read_entry(restored,r)
                require(original==replayed,"PRIVATE_RECORD_BYTES_CHANGED")
                documents[pin.population]=replayed
                # Compare all leaves to the independently restored private record.
                source=parse_source_bytes(original);private=parse_source_bytes(replayed)
                ledger=FieldLedgerEngine.build_automatic_ledger(source,{})
                result=checker.audit_field_conservation(source,{},ledger,private_record=private)
                leaf_total+=result["preserved_private"]
        require(len(blobs)==EXPECTED_DISTINCT_BLOBS,"DISTINCT_BLOB_COUNT_MISMATCH")
        reconciler=SearchRouteReconciler();reconciler.ingest(documents)
        r4_kit=os.environ.get("G9_R4_KIT")
        if r4_kit and Path(r4_kit).is_dir():
            from .r4_loader import ExternalR4DiscoveryLoader
            loader=ExternalR4DiscoveryLoader(Path(r4_kit))
            r4_items=loader.extract_discovered_resource_occurrences()
            reconciler.ingest_r4_discovered(r4_items)
        summary=reconciler.build_summary()
        expected_total = 1564 if r4_kit and Path(r4_kit).is_dir() else 1493
        require(summary["total_occurrences"]==expected_total and summary["unaccounted_in_supplied_collections"]==0,"SEARCH_OCCURRENCE_MISMATCH")
        # Separate identity check over exact A03 occurrence witnesses; no logical-ID collapse.
        inventory=RecordInventoryEngine();records=[]
        for pin in SOURCE_PINS:
            raw=documents[pin.population]
            records.extend(r for r in inventory.extract_document(snapshot_id=pin.snapshot,source_path=pin.path,raw_bytes=raw,
                expected_sha256=hashlib.sha256(raw).hexdigest(),expected_blob_sha=pin.blob,population_id=pin.population,
                collection_paths=[pin.collection]) if r.kind=="RECORD")
        receipts=[r.to_dict() for r in records]
        ledger=[{"occurrence_id":r.occurrence_id,"record_digest":r.record_digest,"disposition":"PRESERVED_PRIVATE_HOLD"} for r in records]
        bounded=checker.audit_occurrence_ledger(records,ledger,trusted_scope_digest=canonical_json_digest(receipts))
        require(bounded["unaccounted"]==0,"OCCURRENCE_CLOSURE_FAILED")
    payload={"schema_version":"g9-conservation-summary/1.1","workpack_id":"A39","status":"HOLD","academic_admission":"HOLD",
             "production_release":"NONE","ui_freeze":"NOT_GRANTED","sources":sources,
             "git_tracked_paths":sum(v["tracked_paths"] for v in sources.values()),
             "git_tracked_bytes":sum(v["tracked_bytes"] for v in sources.values()),"distinct_git_blobs":len(blobs),
             "private_restore":"EPHEMERAL_GIT_BYTES_VERIFIED","private_source_document_leaves":leaf_total,
             "field_scope":"THREE_PINNED_JSON_DOCUMENTS_ONLY_PRIVATE_RESTORE_NOT_MIGRATED_TARGET",
             "supplied_occurrence_accounting":bounded,"search_disposition_counts":summary["disposition_counts"],
             "source_ledger_unaccounted_within_verified_inputs":bounded["unaccounted"],
             "supplied_search_occurrences":summary["supplied_search_occurrences"],
             "discovered_resource_occurrences":summary["discovered_resource_occurrences"],
             "candidate_extended_occurrences":summary["candidate_extended_occurrences"],
             "conservation_counters":{k:None for k in CONSERVATION_COUNTERS},
             "actual_approved_compatibility_mappings":0,
             "owner_local_ignored_scope":"NOT_RUN","external_r4":summary["external_r4_discovered_inventory"],"permanent_custody_acl":"NOT_VERIFIED",
             "native_behavior_state_equivalence":"NOT_RUN","full_target_field_conservation":"NOT_RUN"}
    return {**payload,"summary_digest":canonical_json_digest(payload)}

def main():
    p=argparse.ArgumentParser()
    p.add_argument("--v35-root",required=True,type=Path);p.add_argument("--v41-root",required=True,type=Path)
    p.add_argument("--temp-parent",required=True,type=Path);a=p.parse_args()
    try:
        report=run_public_git_audit(a.v35_root,a.v41_root,temp_parent=a.temp_parent)
    except Exception as e:
        # Never emit raw paths, payloads or subprocess diagnostics from custody.
        print(json.dumps({"status":"BLOCKED","exception_type":type(e).__name__,"code":str(e) if isinstance(e,ConservationVerificationError) else "PRIVATE_AUDIT_FAILED"}))
        raise SystemExit(1) from None
    print(json.dumps(report,sort_keys=True))
if __name__=="__main__":main()
