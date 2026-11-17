"""A14 regression and hostile-input tests. No browser or production claim."""
import copy
import json
import sys
from pathlib import Path
import pytest

ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ROOT / "src"))
from grade9build.compile import ReleaseProjectionCompiler, ReleaseCompilationError, is_capability_visible, STAGES, CAPABILITIES
from grade9build.graph import canonical_bytes, compute_object_digest


def load(name):
    data = json.loads((ROOT / "fixtures/synthetic" / name).read_text(encoding="utf-8"))
    return data if isinstance(data, list) else data["objects"]


def ref(o):
    return {**{k:o[k] for k in ("type", "id", "revision")}, "sha256":compute_object_digest(o)}


@pytest.fixture
def graph():
    return load("graph.json")


@pytest.fixture
def wpe():
    return load("wpe-vertical-slice.json")


@pytest.fixture
def compiler():
    return ReleaseProjectionCompiler()


def rehash(graph):
    """Rebind modified graph in topological order, so content attacks are coherent."""
    index = {o["id"]: o for o in graph}
    done = set()
    def walk(value):
        if isinstance(value, dict):
            if set(value) == {"type", "id", "revision", "sha256"}:
                target = index[value["id"]]
                visit(target)
                value.update(ref(target))
            else:
                for v in value.values(): walk(v)
        elif isinstance(value, list):
            for v in value: walk(v)
    def visit(o):
        if o["id"] in done: return
        for k in ("dependencies", "source_lineage_refs", "payload"): walk(o[k])
        done.add(o["id"])
    for o in graph: visit(o)
    return graph


@pytest.mark.parametrize("name,count", [("graph.json",8),("wpe-vertical-slice.json",33)])
def test_determinism_and_closure(compiler,name,count):
    g=load(name); before=copy.deepcopy(g)
    a=compiler.compile_release(g); b=compiler.compile_release(list(reversed(g)))
    assert canonical_bytes(a)==canonical_bytes(b)
    assert a["total_objects"]==count and g==before
    assert a["release_digest"]==compute_object_digest({k:v for k,v in a.items() if k!="release_digest"})
    assert a["graph_digest"]==compute_object_digest(sorted(g,key=lambda o:o["id"]))
    assert a["target_mode"]=="DEMO" and a["demo_banner"] is True
    assert a["academic_admission"]=="HOLD" and a["production_release"]=="NONE"
    assert not a["learner_release"] and a["ui_freeze"]=="NOT_GRANTED"
    for view in a["projections"]["learner_precommit"]:
        assert all(view[k]==ref(next(o for o in g if o["id"]==view["id"]))[k] for k in ("type","id","revision","sha256"))


@pytest.mark.parametrize("name", ["graph.json","wpe-vertical-slice.json"])
def test_public_bytes_never_contain_protected_data(compiler,name):
    g=load(name); p=compiler.compile_release(g); raw=canonical_bytes(p).decode()
    assert p["projections"]["learner_postcommit"]==[]
    assert p["projections"]["assessment_contracts"]==[]
    assert p["projections"]["search_index"]==[]
    for o in g:
        if o["type"] in {"SOLUTION","ASSESSMENT","ASSET","CONSTRUCTION","PRESENTATION","RELATIONSHIP"}:
            assert o["id"] not in raw
            assert compute_object_digest(o) not in raw
            for k in ("text","correct_option_ids","steps","rubric","diagnosis","repair_prompt","crux"):
                if k in o["payload"]:
                    assert json.dumps(o["payload"][k],ensure_ascii=False,separators=(",",":")) not in raw or k=="correct_option_ids"
    assert "correct_option_ids" not in raw
    assert "solution_text" not in raw
    assert "worked_steps" not in raw


def test_wpe_boundary_and_anchors_not_initial(compiler,wpe):
    p=compiler.compile_release(wpe)
    assert {v["id"] for v in p["projections"]["learner_precommit"]}=={"demo:wpe:source","demo:wpe:fresh"}
    for o in wpe:
        if o["type"]=="FRESH_TASK" and o["id"]!="demo:wpe:fresh":
            assert o["id"] not in canonical_bytes(p).decode()
            assert o["payload"]["stem"] not in canonical_bytes(p).decode()
    assert len(p["projections"]["learner_precommit"][0]["fields"])==2


def test_separate_exact_operator_artifact(compiler,graph,wpe):
    question=ref(graph[0]); p=compiler.compile_operator_diagnostic(graph,question)
    assert p["artifact_scope"]=="OPERATOR_ONLY_DO_NOT_PUBLISH"
    assert p["assessment_contracts"][0]["payload"]["correct_option_ids"]==["B"]
    assert p["postcommit"]==[]
    for task,stage,commit in [("demo:wpe:fresh","RECONSTRUCT","FIRST"),("demo:wpe:boundary","BOUNDARY_TEST","BOUNDARY")]:
        t=ref(next(o for o in wpe if o["id"]==task)); d=compiler.compile_operator_diagnostic(wpe,t)
        assert len(d["postcommit"])==1 and d["assessment_contracts"]==[]
        assert d["postcommit"][0]["requires_stage"]==stage and d["postcommit"][0]["requires_durable_commit"]==commit
        assert d["runtime_authorization"]=="NOT_IMPLEMENTED"
        with pytest.raises(ReleaseCompilationError,match="EXACT_TASK_REQUIRED"):
            compiler.compile_operator_diagnostic(wpe,{**t,"revision":2})


@pytest.mark.parametrize("status", ["HOLD","CANDIDATE","WITHDRAWN","ACCEPTED",None])
def test_non_synthetic_rejected(compiler,graph,status):
    graph[0]["status"]=status
    with pytest.raises(ReleaseCompilationError,match="NON_SYNTHETIC_OR_HOLD"):
        compiler.compile_release(graph)


@pytest.mark.parametrize("mode", ["PRODUCTION","PUBLIC","PAGES","RELEASE",None])
def test_no_production(mode):
    with pytest.raises(ReleaseCompilationError,match="PRODUCTION_TARGET_PROHIBITED"):
        ReleaseProjectionCompiler(mode)


@pytest.mark.parametrize("mutation", ["stale","revision","type","dangling","missing_sha","payload_ref","lineage","duplicate","cycle","cross_subject","typed_edge","bad_envelope","nan"])
def test_bad_graph(compiler,graph,mutation):
    dep=graph[1]["dependencies"][0]
    if mutation=="stale": dep["sha256"]="f"*64
    elif mutation=="revision": dep["revision"]=2
    elif mutation=="type": dep["type"]="WARRANT"
    elif mutation=="dangling": dep["id"]="demo:missing"
    elif mutation=="missing_sha": del dep["sha256"]
    elif mutation=="payload_ref": graph[0]["payload"]["foreign_ref"]=ref(graph[1])
    elif mutation=="lineage": graph[0]["source_lineage_refs"]=[ref(graph[1])]
    elif mutation=="duplicate": graph.append(copy.deepcopy(graph[0]))
    elif mutation=="cycle": graph[0]["dependencies"]=[ref(graph[1])]
    elif mutation=="cross_subject": graph[1]["subject_id"]="CHEMISTRY"; rehash(graph)
    elif mutation=="typed_edge": graph[4]["dependencies"]=[]; rehash(graph)
    elif mutation=="bad_envelope": graph[0]["secret"]="PRIVATE-SENTINEL"
    elif mutation=="nan": graph[0]["payload"]["bad"]=float("nan")
    with pytest.raises(ReleaseCompilationError) as error: compiler.compile_release(graph)
    assert "PRIVATE-SENTINEL" not in str(error.value)


@pytest.mark.parametrize("claim", [{"mandatory":True,"asset_id":"missing"},{"mandatory":True,"digest":"a"*64},{"mandatory":True,"classification":"PRESENT"},{"mandatory":False,"content_sha256":"a"*64}])
def test_asset_claim_is_not_bytes(compiler,graph,claim):
    graph[0]["asset_claims"]=[claim]
    with pytest.raises(ReleaseCompilationError,match="UNVERIFIED_ASSET_CLAIM"): compiler.compile_release(graph)


def test_asset_names_not_proof(compiler,graph):
    with pytest.raises(ReleaseCompilationError,match="EXTERNAL_ASSETS_NOT_SUPPORTED"): compiler.compile_release(graph,available_assets={"fake.svg"})


@pytest.mark.parametrize("field", ["stem","title","summary","reviewed_terms","options","answer","private_raw_record","author_ref"])
def test_coherent_relabelled_text_or_nested_payload_rejected(compiler,graph,field):
    graph[0]["payload"][field]="PRIVATE-SENTINEL"
    rehash(graph)
    with pytest.raises(ReleaseCompilationError,match="UNPINNED_SYNTHETIC_GRAPH") as err: compiler.compile_release(graph)
    assert "PRIVATE-SENTINEL" not in str(err.value)


@pytest.mark.parametrize("kind", ["SOURCE","OCCURRENCE","APPROVAL","RELEASE"])
def test_private_and_authority_objects_never_emitted(compiler,graph,kind):
    graph.append({**copy.deepcopy(graph[0]),"type":kind,"id":"demo:forged","payload":{"private":"PRIVATE-SENTINEL"}})
    with pytest.raises(ReleaseCompilationError,match="SOURCE_OR_AUTHORITY_OBJECT_NOT_PERMITTED"): compiler.compile_release(graph)


@pytest.mark.parametrize("bad", [None,"", "RELEASE-../escape", "RELEASE-<script>","release-lowercase"])
def test_release_id(compiler,graph,bad):
    with pytest.raises(ReleaseCompilationError,match="INVALID_RELEASE_ID"): compiler.compile_release(graph,release_id=bad)


def test_unrecognized_synthetic_graph_not_implicitly_trusted(compiler,graph):
    graph[0]["payload"]["stem"]="Another seemingly harmless prompt"; rehash(graph)
    with pytest.raises(ReleaseCompilationError,match="UNPINNED_SYNTHETIC_GRAPH"): compiler.compile_release(graph)


@pytest.mark.parametrize("stage", STAGES)
@pytest.mark.parametrize("cap", CAPABILITIES)
def test_stage_visibility_exhaustive(stage,cap):
    first=stage in STAGES[2:]; boundary=stage=="COMPLETE"
    allowed=set(CAPABILITIES)
    expect=cap=="VIEW_STIMULUS" or cap=="EDIT_WORK" and stage!="COMPLETE" or cap in {"H1","H2","H3","MODEL_MANIPULATE","MODEL_AUTO_CALCULATE","READ_ANCHOR"} and stage=="ATTEMPT" or cap in {"REFERENCE_SOLUTION","SHOW_REASONING_CRUX"} and first or cap in {"SOURCE_RETURN","BOUNDARY_REFERENCE"} and boundary
    assert is_capability_visible(stage,cap,first,boundary,allowed)==expect
    assert is_capability_visible(stage,cap,first,boundary,allowed,True)==(cap=="VIEW_STIMULUS" or cap=="EDIT_WORK" and stage!="COMPLETE")
    if cap not in {"VIEW_STIMULUS","EDIT_WORK"}: assert not is_capability_visible(stage,cap,first,boundary,())


def test_incoherent_stage_and_checkpoint_denied():
    for stage,first,boundary in [("UNKNOWN",False,False),("PREDICT",True,False),("ATTEMPT",True,True),("RECONSTRUCT",False,False),("REPAIR",True,True),("COMPLETE",True,False),("BOUNDARY_TEST",False,True)]:
        assert not any(is_capability_visible(stage,c,first,boundary,CAPABILITIES) for c in CAPABILITIES)
    assert not is_capability_visible("ATTEMPT","UNKNOWN",allowed_capabilities=["UNKNOWN"])
    assert not is_capability_visible("ATTEMPT","H1",first_committed="false",allowed_capabilities=["H1"])
    assert is_capability_visible("BOUNDARY_TEST","BOUNDARY_REFERENCE",True,True,["BOUNDARY_REFERENCE"])
