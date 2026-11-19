"""Ephemeral synthetic keys and Git history, never actual acceptance receipts."""
import copy
from dataclasses import replace
from datetime import datetime,timezone,timedelta
import hashlib
import json
from pathlib import Path
import subprocess
import pytest
from grade9build.compile import ReleaseProjectionCompiler,ReleaseCompilationError
from grade9build.graph import canonical_bytes
from grade9build.release_integration import (AcademicReleaseIntegrator,DependencyClosureError,PrerequisiteAuditor,SyntheticTrustPins,ReceiptVerificationError,ReleaseAuthorityError,ProductionReleaseProhibitedError,native_authority_report,verify_native_sources,KIT_MANIFEST_SHA256)
ROOT=Path(__file__).resolve().parents[2]
NOW=datetime(2026,11,19,7,0,0,tzinfo=timezone.utc)
def sha(b):return hashlib.sha256(b).hexdigest()
def run(*a):return subprocess.run(a,check=True,capture_output=True).stdout
def git(repo,*a):return run("git","-C",str(repo),*a).decode().strip()
def write(root,name,raw):(root/name).write_bytes(raw)
def data(root,name,v):
    raw=canonical_bytes(v);write(root,name,raw);return sha(raw)
def stamp(t):return t.strftime("%Y-%m-%dT%H:%M:%SZ")
@pytest.fixture
def authority(tmp_path):
    repo=tmp_path/"repo";repo.mkdir();ext=tmp_path/"external";ext.mkdir(mode=0o700)
    git(repo,"init","-q");git(repo,"config","user.email","synthetic@example.invalid");git(repo,"config","user.name","synthetic")
    commits=[];trees=[]
    for i in range(4):
        (repo/"marker").write_text(str(i));git(repo,"add","marker");git(repo,"commit","-qm",str(i));commits.append(git(repo,"rev-parse","HEAD"));trees.append(git(repo,"rev-parse","HEAD^{tree}"))
    for name in ("reviewer","other"):
        run("openssl","genpkey","-algorithm","ED25519","-out",str(ext/(name+".pem")))
        run("openssl","pkey","-in",str(ext/(name+".pem")),"-pubout","-outform","DER","-out",str(ext/(name+".der")))
    key=(ext/"reviewer.der").read_bytes();kp=sha(key);write(ext,"reviewer-"+kp+".der",key)
    trust={"schema":"g9-a40-synthetic-trust/1","reviewers":[{"id":"synthetic-reviewer","spki_sha256":kp,"workpacks":["A38","A39"],"revoked":False}]}
    kit=data(ext,"synthetic-kit-manifest.json",{"schema":"g9-a40-synthetic-kit/1","purpose":"TEST_ONLY"})
    scopes=[]
    for i,w in enumerate(("A38","A39","A40")):
        ev=("synthetic evidence "+w).encode();write(ext,w+".evidence",ev)
        scopes.append({"workpack":w,"base_commit":commits[i],"candidate_commit":commits[i+1],"candidate_tree":trees[i+1],"author_ids":["synthetic-author"],"evidence_sha256":sha(ev),"prerequisites":[] if i==0 else ["A38" if i==1 else "A39"]})
    plan={"schema":"g9-a40-synthetic-plan/1","target_workpack":"A40","target_commit":commits[-1],"kit_manifest_sha256":kit,"scopes":scopes}
    def provision():return SyntheticTrustPins(data(ext,"synthetic-trust.json",trust),data(ext,"synthetic-plan.json",plan),kit,commits[-1])
    pins=provision()
    def sign(w,patch=None,signer="reviewer",p=pins):
        s=next(x for x in scopes if x["workpack"]==w)
        r={"schema":"g9-a40-synthetic-receipt/1","workpack":w,"decision":"SYNTHETIC_ACCEPTED","base_commit":s["base_commit"],"candidate_commit":s["candidate_commit"],"candidate_tree":s["candidate_tree"],"kit_manifest_sha256":kit,"plan_sha256":p.plan_sha256,"reviewer_id":"synthetic-reviewer","reviewed_at":stamp(NOW),"test_evidence_sha256":s["evidence_sha256"]}
        r.update(patch or {});data(ext,w+".json",r)
        run("openssl","pkeyutl","-sign","-inkey",str(ext/(signer+".pem")),"-rawin","-in",str(ext/(w+".json")),"-out",str(ext/(w+".sig")))
    sign("A38");sign("A39")
    def audit(p=pins,root=ext,clock=NOW):return PrerequisiteAuditor().audit_prerequisites(repo=repo,external_root=root,pins=p,now=clock)
    return dict(repo=repo,ext=ext,pins=pins,trust=trust,plan=plan,scopes=scopes,sign=sign,audit=audit,provision=provision,kp=kp,commits=commits)

def test_valid_transitive_synthetic_receipts_and_unchanged_public_manifest(authority):
    a=authority;r=a["audit"]();assert [v["workpack"] for v in r["verified"]]==["A38","A39"]
    assert r["independent_acceptance"]=="NOT_GRANTED"
    for n in ("graph.json","wpe.json"):
        raw=(ROOT/"fixtures/synthetic"/n).read_bytes();i=AcademicReleaseIntegrator()
        expected=ReleaseProjectionCompiler().compile_release(json.loads(raw),"RELEASE-ACADEMIC-DEMO-01")
        x=i.compile_with_evidence(raw,repo=a["repo"],external_root=a["ext"],pins=a["pins"],now=NOW)
        assert x.manifest==expected==i.integrate_release(raw)
        assert x.operator_report["prerequisites"]==r and x.operator_report["manifest_digest"]==expected["release_digest"]
        assert "prerequisites" not in x.manifest and x.manifest["learner_release"] is False
        assert x.manifest["academic_admission"]=="HOLD" and all(x.manifest["projections"][k]==[] for k in ("learner_postcommit","search_index","assessment_contracts"))

@pytest.mark.parametrize("mutation,code",[
 ("missing","CUSTODY_FILE_UNAVAILABLE"),("empty","DETACHED_SIGNATURE_REQUIRED"),("garbage","INVALID_DETACHED_SIGNATURE"),
 ("wrong_signer","INVALID_DETACHED_SIGNATURE"),("changed_key","REVIEWER_KEY_PIN_MISMATCH"),("tampered","INVALID_DETACHED_SIGNATURE"),
 ("evidence","RECEIPT_OR_EVIDENCE_SCOPE_MISMATCH"),("duplicate","INVALID_RECEIPT_JSON"),("noncanonical","INVALID_SYNTHETIC_RECEIPT"),
 ("wrong_tree","RECEIPT_OR_EVIDENCE_SCOPE_MISMATCH"),("wrong_plan","RECEIPT_OR_EVIDENCE_SCOPE_MISMATCH"),("real_decision","INVALID_SYNTHETIC_RECEIPT"),
 ("future","STALE_OR_FUTURE_RECEIPT"),("expired","STALE_OR_FUTURE_RECEIPT"),("naive","INVALID_REVIEW_TIME"),
 ("foreign_reviewer","UNAUTHORIZED_REVIEWER"),("symlink","CUSTODY_FILE_UNAVAILABLE"),("hardlink","INVALID_CUSTODY_FILE")])
def test_receipt_negatives(authority,mutation,code):
    a=authority;e=a["ext"];s=a["sign"]
    if mutation=="missing":(e/"A38.sig").unlink()
    elif mutation=="empty":write(e,"A38.sig",b"")
    elif mutation=="garbage":write(e,"A38.sig",b"x"*64)
    elif mutation=="wrong_signer":s("A38",signer="other")
    elif mutation=="changed_key":write(e,"reviewer-"+a["kp"]+".der",(e/"other.der").read_bytes())
    elif mutation=="tampered":
        r=json.loads((e/"A38.json").read_bytes());r["reviewed_at"]=stamp(NOW-timedelta(seconds=1));data(e,"A38.json",r)
    elif mutation=="evidence":write(e,"A38.evidence",b"altered")
    elif mutation=="duplicate":write(e,"A38.json",b'{"workpack":"A38","workpack":"A39"}')
    elif mutation=="noncanonical":write(e,"A38.json",(e/"A38.json").read_bytes()+b"\n")
    elif mutation=="wrong_tree":s("A38",{"candidate_tree":"a"*40})
    elif mutation=="wrong_plan":s("A38",{"plan_sha256":"a"*64})
    elif mutation=="real_decision":s("A38",{"decision":"ACCEPTED"})
    elif mutation=="future":s("A38",{"reviewed_at":stamp(NOW+timedelta(seconds=1))})
    elif mutation=="expired":s("A38",{"reviewed_at":stamp(NOW-timedelta(days=31))})
    elif mutation=="naive":s("A38",{"reviewed_at":"2026-11-19T07:00:00"})
    elif mutation=="foreign_reviewer":s("A38",{"reviewer_id":"other-reviewer"})
    elif mutation=="symlink":
        (e/"A38.sig").rename(e/"copy.sig");(e/"A38.sig").symlink_to(e/"copy.sig")
    elif mutation=="hardlink":
        import os
        os.link(e/"A38.sig",e/"copy.sig")
    with pytest.raises(ReceiptVerificationError,match=code):a["audit"]()

@pytest.mark.parametrize("mutation,code",[
 ("self","SELF_APPROVAL_PROHIBITED"),("revoked","UNAUTHORIZED_REVIEWER"),("role","UNAUTHORIZED_REVIEWER"),("alias","REVIEWER_OR_KEY_ALIAS"),
 ("missing_transitive","MISSING_OR_CYCLIC_PREREQUISITE"),("cycle","MISSING_OR_CYCLIC_PREREQUISITE"),("unrelated","UNRELATED_PLAN_SCOPE"),
 ("tree","GIT_TREE_MISMATCH"),("lineage","GIT_SCOPE_MISMATCH"),("dependent_base","GIT_SCOPE_MISMATCH")])
def test_plan_roster_negatives(authority,mutation,code):
    a=authority;sc=a["scopes"];tr=a["trust"]["reviewers"]
    if mutation=="self":sc[0]["author_ids"]=["synthetic-reviewer"]
    elif mutation=="revoked":tr[0]["revoked"]=True
    elif mutation=="role":tr[0]["workpacks"]=["A39"]
    elif mutation=="alias":tr.append({**tr[0],"id":"alias-reviewer"})
    elif mutation=="missing_transitive":sc[1]["prerequisites"]=["A37"]
    elif mutation=="cycle":sc[0]["prerequisites"]=["A39"]
    elif mutation=="unrelated":sc[1]["prerequisites"]=[]
    elif mutation=="tree":sc[0]["candidate_tree"]="a"*40
    elif mutation=="lineage":sc[0]["base_commit"]=a["commits"][2]
    elif mutation=="dependent_base":sc[1]["base_commit"]=a["commits"][0]
    p=a["provision"]();a["sign"]("A38",p=p);a["sign"]("A39",p=p)
    with pytest.raises(ReceiptVerificationError,match=code):a["audit"](p)

def test_out_of_band_pins_checkout_and_custody(authority):
    a=authority;p=a["pins"]
    with pytest.raises(ReceiptVerificationError,match="TRUST_OR_PLAN_PIN_MISMATCH"):a["audit"](replace(p,trust_sha256="a"*64))
    with pytest.raises(ReceiptVerificationError,match="REAL_R4_PROTOCOL_NOT_VERIFIED"):a["audit"](replace(p,kit_manifest_sha256=KIT_MANIFEST_SHA256))
    with pytest.raises(ReceiptVerificationError,match="EXTERNAL_CUSTODY_REQUIRED"):a["audit"](root=a["repo"])
    with pytest.raises(ReceiptVerificationError,match="TRUSTED_CLOCK_REQUIRED"):a["audit"](clock=NOW.replace(tzinfo=None))
    (a["repo"]/"marker").write_text("dirty")
    with pytest.raises(ReceiptVerificationError,match="TARGET_CHECKOUT_MISMATCH"):a["audit"]()

def test_native_and_freeze_no_caller_authority():
    r=native_authority_report()
    assert r["subject_authorities"]["Physics"]["native_r3_state"]=="R2_PILOT_HOLD"
    assert r["subject_authorities"]["Mathematics"]["native_r3_state"]=="SUBJECT_AUTHORITY_PENDING"
    assert r["subject_authorities"]["Biology"]["native_r3_state"]=="EXPLICIT_SCOPE_AND_SUBJECT_AUTHORITY_PENDING"
    assert r["native_core_authority"]["CORE2"]["required_authority"]==["AUTHORIZED_SOURCE_CUSTODY"]
    assert r["native_core_authority"]["CORE2B"]["required_authority"]==["CANONICAL_ACADEMIC_TRUTH","PRIOR_EXPOSURE"]
    r["native_r3"]["production_enabled"]=True;assert native_authority_report()["native_r3"]["production_enabled"] is False
    raw=(ROOT/"fixtures/synthetic/graph.json").read_bytes();i=AcademicReleaseIntegrator()
    assert i.compile_with_evidence(raw).operator_report["prerequisites"]["status"]=="NOT_RUN_NO_EXTERNAL_SYNTHETIC_INPUTS"
    with pytest.raises(TypeError):i.integrate_release(raw,prerequisite_audit={"status":"PASS"})
    with pytest.raises(ProductionReleaseProhibitedError):AcademicReleaseIntegrator("PRODUCTION")
    with pytest.raises(ReceiptVerificationError):i.compile_with_evidence(raw,repo=ROOT)
    with pytest.raises(ReleaseAuthorityError,match="NATIVE_SOURCE_SET_MISMATCH"):verify_native_sources({})
    with pytest.raises(ReleaseAuthorityError,match="NATIVE_SOURCE_BLOB_MISMATCH"):verify_native_sources({(v["snapshot"],v["path"]):b"fake" for v in r["source_pins"]})

def test_graph_closure_and_eligibility():
    i=AcademicReleaseIntegrator();raw=(ROOT/"fixtures/synthetic/graph.json").read_bytes();g=json.loads(raw)
    assert i.integrate_release(canonical_bytes(list(reversed(g))))==i.integrate_release(raw)
    with pytest.raises(ReleaseAuthorityError,match="INVALID_GRAPH_BYTES"):i.integrate_release(b'[{"id":"a","id":"b"}]')
    with pytest.raises(DependencyClosureError):i.integrate_release(canonical_bytes(g+[g[0]]))
    stale=copy.deepcopy(g);next(o for o in stale if o["dependencies"])["dependencies"][0]["sha256"]="a"*64
    with pytest.raises(DependencyClosureError):i.integrate_release(canonical_bytes(stale))
    changed=copy.deepcopy(g);next(o for o in changed if o["type"]=="QUESTION")["payload"]["stem"]="unreviewed"
    with pytest.raises((DependencyClosureError,ReleaseCompilationError)):i.integrate_release(canonical_bytes(changed))
    held=copy.deepcopy(g);held[0]["status"]="HOLD"
    with pytest.raises(DependencyClosureError):i.integrate_release(canonical_bytes(held))
