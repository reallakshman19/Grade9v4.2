"""A40 diagnostic-only release integration. The real R4 receipt protocol is
unavailable; the explicitly synthetic verifier tests mechanics, never admission."""
from __future__ import annotations
import copy
from dataclasses import dataclass
from datetime import datetime, timezone, timedelta
import hashlib
import os
from pathlib import Path
import re
import shutil
import stat
import subprocess
import tempfile
from .compile import ReleaseProjectionCompiler
from .graph import ObjectGraphValidator, canonical_bytes, compute_object_digest
from .record_inventory import parse_source_bytes

class ReleaseAuthorityError(ValueError): pass
class ReceiptVerificationError(ReleaseAuthorityError): pass
class ProductionReleaseProhibitedError(ReleaseAuthorityError): pass
class DependencyClosureError(ReleaseAuthorityError): pass

KIT_MANIFEST_SHA256="6f92aac8eb1ca42e46d243443b230e2bb83dae5e99beeee872da6da47b04e3fc"
V35="8a02a8eb23ea37a7d8acb74d1bc193dd17657e5b"
V41="564ad2a07fddc0fdd30d103674b3eca61235a54b"
_NATIVE_PINS=(
 ("v35",V35,"Shared/roles/CORE-AUTHORITY-CONTRACT.md","304ad36a502a81f7174f3b52b9622f6e4a47d21c"),
 ("v41",V41,"docs/agent-entry/production-control-r3/policy.v1.json","0a1823944449fb6fa1b7a5f10949b18c6ef2ab11"),
 ("v41",V41,"docs/agent-entry/production-control-r3/subject-profiles.v1.json","d99a86abed54649ff21ea6412260bfa868c32ce4"),
 ("v41",V41,"docs/agent-entry/quality-gate-r2/quality-policy.v1.json","ac8ed9bd65519ddfd5a881c2a505000090996452"))
_SUBJECTS=(("Physics","R2_PILOT_HOLD","GOLDEN_DESIGN_ONLY_PENDING_INDEPENDENT_ADOPTION"),
 ("Mathematics","SUBJECT_AUTHORITY_PENDING","HOLD_SUBJECT_AUTHORITY"),
 ("Chemistry","SUBJECT_AUTHORITY_PENDING","HOLD_SUBJECT_AUTHORITY"),
 ("Biology","EXPLICIT_SCOPE_AND_SUBJECT_AUTHORITY_PENDING","HOLD_SUBJECT_AUTHORITY"))
_T="CANONICAL_ACADEMIC_TRUTH"
_S="AUTHORIZED_SOURCE_CUSTODY"
_D="ELIGIBLE_REVIEWED_DEMAND"
_P="AUTHORED_PRACTICE"
_L="LEARNER_SUPPORT_INPUT"
_E="PRIOR_EXPOSURE"

def native_authority_report():
    roles={r:{"required_authority":[_T],"forbidden_authority_substitution":[_S,_L]} for r in ("CORE1","CORE1A","CORE1B")}
    roles["CORE2"]={"required_authority":[_S],"forbidden_authority_substitution":[_P,_T]}
    for r in ("CORE2A","CORE2B"):
        roles[r]={"required_authority":[_T]+([_E] if r=="CORE2B" else []),
                  "one_of_authority":[_D,_P],"optional_authority":[_L],"forbidden_authority_substitution":[_L]}
    return {"source_pins":[{"snapshot":s,"commit":c,"path":p,"git_blob":b} for s,c,p,b in _NATIVE_PINS],
       "subject_authorities":{s:{"native_r3_state":r,"native_profile_state":p,"admitted":False,"academic_admission":"HOLD"} for s,r,p in _SUBJECTS},
       "native_core_authority":roles,
       "native_r2":{"activation":"PILOT_AWAITING_OWNER_GOLDEN","owner_accepted_golden_head":None,"owner_golden_receipt_path":None,"production_enabled":False,"minimum_independent_sample_fraction":0.2},
       "native_r3":{"phase":"FREEZE_PENDING_GOLDEN","legacy_preview_baseline":"7a5c425f02d8a365a738bb11df1982cbe38e9f82","accepted_golden":None,"production_enabled":False,"academic_release_enabled":False,"d31":"PAUSED","trust_source":"G9_R3_TRUST_JSON (repository administrator configured, not candidate Git)","publication":"SIGNED_EXPLICIT_MANIFEST_ONLY"},
       "v42":{"academic_admission":"HOLD","production_release":"NONE","ui_freeze":"NOT_GRANTED","independent_review":"NOT_COMPLETED","engineering_delivery":"OWNER_DIRECTED_NONBLOCKING_REVIEW","actual_r4_protocol":"NOT_VERIFIED"},
       "scope":"PINNED_NATIVE_AUTHORITY_CROSSWALK_NOT_SEMANTIC_ADMISSION"}

def verify_native_sources(documents):
    expected={(s,p):b for s,_,p,b in _NATIVE_PINS}
    if type(documents) is not dict or set(documents)!=set(expected):raise ReleaseAuthorityError("NATIVE_SOURCE_SET_MISMATCH")
    for k,blob in expected.items():
        raw=documents[k]
        if type(raw) is not bytes or hashlib.sha1(b"blob "+str(len(raw)).encode()+b"\0"+raw).hexdigest()!=blob:
            raise ReleaseAuthorityError("NATIVE_SOURCE_BLOB_MISMATCH")
    try:
        fence=chr(96)*3
        core=documents[("v35",_NATIVE_PINS[0][2])].decode("utf-8").split(fence+"core-authority\n",1)[1].split("\n"+fence,1)[0]
        roles=parse_source_bytes(core.encode())["roles"]
        r3=parse_source_bytes(documents[("v41",_NATIVE_PINS[1][2])])
        profiles=parse_source_bytes(documents[("v41",_NATIVE_PINS[2][2])])["profiles"]
        r2=parse_source_bytes(documents[("v41",_NATIVE_PINS[3][2])])
        report=native_authority_report()
        if roles!=report["native_core_authority"] or any(r3[k]!=v for k,v in report["native_r3"].items()) or any(r2[k]!=v for k,v in report["native_r2"].items()) or any(r3["subjects"][s]!=r or profiles[s]["state"]!=p or profiles[s]["accepted_golden"] is not None for s,r,p in _SUBJECTS):raise ValueError("crosswalk")
    except (ValueError,KeyError,TypeError,IndexError,UnicodeError):
        raise ReleaseAuthorityError("NATIVE_AUTHORITY_CROSSWALK_MISMATCH") from None
    return {"status":"EXACT_NATIVE_SOURCE_CROSSWALK_VERIFIED","documents":len(expected),"academic_admission":"HOLD"}

def sha(raw):return hashlib.sha256(raw).hexdigest()
def hexid(s,n):return type(s) is str and bool(re.fullmatch("[0-9a-f]{"+str(n)+"}",s))
def ident(s):return type(s) is str and bool(re.fullmatch("[A-Za-z][A-Za-z0-9._:-]{1,127}",s))
def wp(s):return type(s) is str and bool(re.fullmatch("A[0-9]{2}",s))
def keys(x,k):return type(x) is dict and set(x)==set(k)
def seq(x,p,nonempty=True):return type(x) is list and (bool(x) or not nonempty) and all(p(v) for v in x) and len(set(x))==len(x)
def require(v,code):
    if not v:raise ReceiptVerificationError(code)
def parse(raw):
    try:return parse_source_bytes(raw)
    except (ValueError,TypeError,UnicodeError,RecursionError):raise ReceiptVerificationError("INVALID_RECEIPT_JSON") from None

class ExternalFiles:
    """Descriptor-relative bounded no-follow reads; not an ACL certificate."""
    def __init__(self,root,repo):
        try:
            self.root=Path(root).absolute();self.repo=Path(repo).resolve(strict=True)
            require(self.root.resolve(strict=True)==self.root and self.root.is_dir() and not self.root.is_relative_to(self.repo) and not self.repo.is_relative_to(self.root),"EXTERNAL_CUSTODY_REQUIRED")
        except OSError:raise ReceiptVerificationError("EXTERNAL_CUSTODY_REQUIRED") from None
        require(hasattr(os,"O_NOFOLLOW") and hasattr(os,"O_DIRECTORY"),"SECURE_FILE_OPEN_UNAVAILABLE")
    def read(self,name,limit):
        require(type(name) is str and bool(re.fullmatch("[A-Za-z0-9._-]+",name)) and name not in (".",".."),"INVALID_CUSTODY_FILENAME")
        try:
            d=os.open(self.root,os.O_RDONLY|os.O_DIRECTORY|os.O_NOFOLLOW)
            try:
                fd=os.open(name,os.O_RDONLY|os.O_NOFOLLOW|os.O_NONBLOCK,dir_fd=d)
                with os.fdopen(fd,"rb") as f:
                    st=os.fstat(f.fileno())
                    require(stat.S_ISREG(st.st_mode) and st.st_nlink==1 and st.st_size<=limit,"INVALID_CUSTODY_FILE")
                    raw=f.read(limit+1);require(len(raw)==st.st_size and len(raw)<=limit,"CUSTODY_FILE_CHANGED")
                    return raw
            finally:os.close(d)
        except OSError:raise ReceiptVerificationError("CUSTODY_FILE_UNAVAILABLE") from None

def git(repo,*args):
    try:r=subprocess.run(["git","-C",str(repo),*args],capture_output=True,timeout=15)
    except (OSError,subprocess.TimeoutExpired):raise ReceiptVerificationError("GIT_VERIFICATION_UNAVAILABLE") from None
    require(r.returncode==0,"GIT_SCOPE_MISMATCH");return r.stdout.strip()

def verify_signature(files,key,raw,sig):
    require(len(key)==44 and key[:12]==bytes.fromhex("302a300506032b6570032100"),"ED25519_KEY_REQUIRED")
    require(len(sig)==64,"DETACHED_SIGNATURE_REQUIRED")
    openssl=shutil.which("openssl");require(openssl is not None,"OPENSSL_UNAVAILABLE")
    with tempfile.TemporaryDirectory(prefix="a40-verify-",dir=files.root) as tmp:
        p=Path(tmp)
        for n,b in (("key.der",key),("receipt",raw),("sig",sig)):(p/n).write_bytes(b)
        try:r=subprocess.run([openssl,"pkeyutl","-verify","-pubin","-keyform","DER","-inkey",str(p/"key.der"),"-rawin","-in",str(p/"receipt"),"-sigfile",str(p/"sig")],capture_output=True,timeout=15)
        except (OSError,subprocess.TimeoutExpired):raise ReceiptVerificationError("SIGNATURE_VERIFICATION_UNAVAILABLE") from None
        require(r.returncode==0,"INVALID_DETACHED_SIGNATURE")

_SCOPE=("workpack","base_commit","candidate_commit","candidate_tree","author_ids","evidence_sha256","prerequisites")
_RECEIPT=("schema","workpack","decision","base_commit","candidate_commit","candidate_tree","kit_manifest_sha256","plan_sha256","reviewer_id","reviewed_at","test_evidence_sha256")
@dataclass(frozen=True)
class SyntheticTrustPins:
    trust_sha256:str
    plan_sha256:str
    kit_manifest_sha256:str
    target_commit:str

class PrerequisiteAuditor:
    """Synthetic protocol: host pins and verified evidence, never caller audit."""
    def audit_prerequisites(self,*,repo,external_root,pins:SyntheticTrustPins,now=None):
        require(type(pins) is SyntheticTrustPins and all(hexid(v,64) for v in (pins.trust_sha256,pins.plan_sha256,pins.kit_manifest_sha256)) and hexid(pins.target_commit,40),"TRUSTED_PINS_REQUIRED")
        files=ExternalFiles(external_root,repo)
        require(pins.kit_manifest_sha256!=KIT_MANIFEST_SHA256,"REAL_R4_PROTOCOL_NOT_VERIFIED")
        trust_raw=files.read("synthetic-trust.json",1000000);plan_raw=files.read("synthetic-plan.json",2000000);kit=files.read("synthetic-kit-manifest.json",2000000)
        require(sha(trust_raw)==pins.trust_sha256 and sha(plan_raw)==pins.plan_sha256 and sha(kit)==pins.kit_manifest_sha256,"TRUST_OR_PLAN_PIN_MISMATCH")
        trust,plan,kdoc=map(parse,(trust_raw,plan_raw,kit))
        require(kdoc=={"schema":"g9-a40-synthetic-kit/1","purpose":"TEST_ONLY"},"SYNTHETIC_KIT_REQUIRED")
        require(keys(trust,("schema","reviewers")) and trust["schema"]=="g9-a40-synthetic-trust/1" and type(trust["reviewers"]) is list and bool(trust["reviewers"]),"INVALID_TRUST_ROSTER")
        roster={};keypins=set()
        for row in trust["reviewers"]:
            require(keys(row,("id","spki_sha256","workpacks","revoked")) and ident(row["id"]) and hexid(row["spki_sha256"],64) and seq(row["workpacks"],wp) and type(row["revoked"]) is bool,"INVALID_REVIEWER")
            require(row["id"] not in roster and row["spki_sha256"] not in keypins,"REVIEWER_OR_KEY_ALIAS")
            roster[row["id"]]=row;keypins.add(row["spki_sha256"])
        require(keys(plan,("schema","target_workpack","target_commit","kit_manifest_sha256","scopes")) and plan["schema"]=="g9-a40-synthetic-plan/1" and plan["target_workpack"]=="A40" and plan["target_commit"]==pins.target_commit and plan["kit_manifest_sha256"]==pins.kit_manifest_sha256 and type(plan["scopes"]) is list,"INVALID_PLAN_SCOPE")
        scopes={}
        for s in plan["scopes"]:
            require(keys(s,_SCOPE) and wp(s["workpack"]) and s["workpack"] not in scopes and all(hexid(s[k],40) for k in ("base_commit","candidate_commit","candidate_tree")) and hexid(s["evidence_sha256"],64) and seq(s["author_ids"],ident) and seq(s["prerequisites"],wp,False),"INVALID_WORKPACK_SCOPE")
            scopes[s["workpack"]]=s
        require("A40" in scopes and scopes["A40"]["candidate_commit"]==pins.target_commit and bool(scopes["A40"]["prerequisites"]),"TARGET_SCOPE_REQUIRED")
        visiting=set();visited=set();order=[]
        def visit(w):
            require(w in scopes and w not in visiting,"MISSING_OR_CYCLIC_PREREQUISITE")
            if w in visited:return
            visiting.add(w)
            for pre in scopes[w]["prerequisites"]:visit(pre)
            visiting.remove(w);visited.add(w);order.append(w)
        visit("A40");require(visited==set(scopes),"UNRELATED_PLAN_SCOPE")
        require(git(files.repo,"rev-parse","HEAD").decode()==pins.target_commit and not git(files.repo,"status","--porcelain","--untracked-files=all"),"TARGET_CHECKOUT_MISMATCH")
        for w in order:
            s=scopes[w]
            for k in ("base_commit","candidate_commit"):require(git(files.repo,"cat-file","-t",s[k])==b"commit","GIT_COMMIT_REQUIRED")
            require(git(files.repo,"rev-parse",s["candidate_commit"]+"^{tree}").decode()==s["candidate_tree"],"GIT_TREE_MISMATCH")
            git(files.repo,"merge-base","--is-ancestor",s["base_commit"],s["candidate_commit"])
            git(files.repo,"merge-base","--is-ancestor",s["candidate_commit"],pins.target_commit)
            for pre in s["prerequisites"]:git(files.repo,"merge-base","--is-ancestor",scopes[pre]["candidate_commit"],s["base_commit"])
        clock=now if now is not None else datetime.now(timezone.utc)
        require(isinstance(clock,datetime) and clock.tzinfo is not None and clock.utcoffset() is not None,"TRUSTED_CLOCK_REQUIRED")
        clock=clock.astimezone(timezone.utc);checked=[]
        for w in order[:-1]:
            s=scopes[w];raw=files.read(w+".json",128000);sig=files.read(w+".sig",64);evidence=files.read(w+".evidence",50000000);r=parse(raw)
            require(keys(r,_RECEIPT) and r["schema"]=="g9-a40-synthetic-receipt/1" and r["decision"]=="SYNTHETIC_ACCEPTED" and raw==canonical_bytes(r),"INVALID_SYNTHETIC_RECEIPT")
            require(r["workpack"]==w and all(r[k]==s[k] for k in ("base_commit","candidate_commit","candidate_tree")) and r["kit_manifest_sha256"]==pins.kit_manifest_sha256 and r["plan_sha256"]==pins.plan_sha256 and r["test_evidence_sha256"]==s["evidence_sha256"]==sha(evidence),"RECEIPT_OR_EVIDENCE_SCOPE_MISMATCH")
            require(ident(r["reviewer_id"]) and r["reviewer_id"] in roster,"UNAUTHORIZED_REVIEWER");reviewer=roster[r["reviewer_id"]]
            require(not reviewer["revoked"] and w in reviewer["workpacks"],"UNAUTHORIZED_REVIEWER")
            require(r["reviewer_id"] not in s["author_ids"],"SELF_APPROVAL_PROHIBITED")
            require(type(r["reviewed_at"]) is str and bool(re.fullmatch(r"\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z",r["reviewed_at"])),"INVALID_REVIEW_TIME")
            try:reviewed=datetime.strptime(r["reviewed_at"],"%Y-%m-%dT%H:%M:%SZ").replace(tzinfo=timezone.utc)
            except ValueError:raise ReceiptVerificationError("INVALID_REVIEW_TIME") from None
            require(timedelta(0)<=clock-reviewed<=timedelta(days=30),"STALE_OR_FUTURE_RECEIPT")
            key=files.read("reviewer-"+reviewer["spki_sha256"]+".der",44)
            require(sha(key)==reviewer["spki_sha256"],"REVIEWER_KEY_PIN_MISMATCH");verify_signature(files,key,raw,sig)
            checked.append({"workpack":w,"status":"SYNTHETIC_SIGNATURE_AND_SCOPE_VERIFIED","receipt_sha256":sha(raw)})
        return {"status":"SYNTHETIC_PREREQUISITES_VERIFIED_NOT_ACCEPTANCE","verified":checked,"actual_r4_prerequisites":"NOT_RUN","independent_acceptance":"NOT_GRANTED","academic_admission":"HOLD","production_release":"NONE"}

class DependencyClosureValidator:
    def validate_graph(self,graph):
        try:
            if type(graph) is not list or not graph or any(type(o) is not dict or type(o.get("id")) is not str for o in graph) or len({o["id"] for o in graph})!=len(graph):raise ValueError("invalid graph")
            objects=sorted(copy.deepcopy(graph),key=lambda o:o["id"])
            count=ObjectGraphValidator(demo_mode=True).validate_graph(objects)
            return {"status":"STRUCTURAL_CLOSURE_VALID","total_objects":count,"graph_digest":compute_object_digest(objects)}
        except (ValueError,TypeError,KeyError,RecursionError):raise DependencyClosureError("INVALID_GRAPH_CLOSURE") from None

@dataclass(frozen=True)
class DiagnosticCompilation:
    manifest:dict
    operator_report:dict

class AcademicReleaseIntegrator:
    def __init__(self,target_mode="DEMO"):
        if target_mode!="DEMO":raise ProductionReleaseProhibitedError("PRODUCTION_TARGET_PROHIBITED")
    def integrate_release(self,graph_bytes,release_id="RELEASE-ACADEMIC-DEMO-01"):
        """Unchanged public A14 wire format; no audit or eligibility overrides."""
        try:
            if type(graph_bytes) is not bytes or len(graph_bytes)>10000000:raise ValueError("invalid bytes")
            graph=parse_source_bytes(graph_bytes)
        except (ValueError,TypeError,UnicodeError,RecursionError):raise ReleaseAuthorityError("INVALID_GRAPH_BYTES") from None
        closure=DependencyClosureValidator().validate_graph(graph)
        m=ReleaseProjectionCompiler().compile_release(graph,release_id)
        if m["graph_digest"]!=closure["graph_digest"] or m["total_objects"]!=closure["total_objects"] or m["target_mode"]!="DEMO" or m["academic_admission"]!="HOLD" or m["production_release"]!="NONE" or m["ui_freeze"]!="NOT_GRANTED" or m["learner_release"] is not False or m["artifact_scope"]!="PUBLIC_SAFE_DIAGNOSTIC_ONLY" or any(m["projections"][k]!=[] for k in ("learner_postcommit","search_index","assessment_contracts")):raise ReleaseAuthorityError("DIAGNOSTIC_PROJECTION_INVARIANT")
        return m
    def compile_with_evidence(self,graph_bytes,release_id="RELEASE-ACADEMIC-DEMO-01",*,repo=None,external_root=None,pins=None,now=None):
        m=self.integrate_release(graph_bytes,release_id)
        if repo is external_root is pins is None:
            audit={"status":"NOT_RUN_NO_EXTERNAL_SYNTHETIC_INPUTS","actual_r4_prerequisites":"NOT_RUN","independent_acceptance":"NOT_GRANTED"}
        else:
            require(repo is not None and external_root is not None and pins is not None,"COMPLETE_SYNTHETIC_SCOPE_REQUIRED")
            audit=PrerequisiteAuditor().audit_prerequisites(repo=repo,external_root=external_root,pins=pins,now=now)
        return DiagnosticCompilation(m,{"schema":"g9-a40-operator-diagnostic/1","artifact_scope":"OPERATOR_ONLY_DO_NOT_PUBLISH","manifest_digest":m["release_digest"],"graph_digest":m["graph_digest"],"authority":native_authority_report(),"prerequisites":audit,"academic_admission":"HOLD","production_release":"NONE","ui_freeze":"NOT_GRANTED"})
