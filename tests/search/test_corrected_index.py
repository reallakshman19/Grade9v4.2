"""A34/A71 bounded engineering tests. No academic or learner-release claims."""
import copy
import hashlib
import json
from pathlib import Path
import pytest
from grade9build.compile import ReleaseProjectionCompiler
from grade9build.record_inventory import canonical_bytes, canonical_json_digest
from grade9build.search import SearchIndexCompiler, SearchQueryEngine, SearchCompilationError, StaleShardError, AnswerLeakageError, normalize_query
from grade9build.search_reconcile import SearchRouteReconciler, SearchReconciliationError, SourcePin

ROOT = Path(__file__).resolve().parents[2]
REF_KEYS = ("type", "id", "revision", "sha256")


def ref(kind, id_, digest="a"*64):
    return {"type":kind, "id":id_, "revision":1, "sha256":digest}


@pytest.fixture
def inputs():
    graph = json.loads((ROOT/"fixtures/synthetic/graph.json").read_text())
    release = ReleaseProjectionCompiler().compile_release(graph)
    item = next(x for x in release["projections"]["learner_precommit"] if x["type"] == "QUESTION")
    target = {k:item[k] for k in REF_KEYS}
    entry = {"ref":target, "review":ref("APPROVAL","approval:synthetic:search"),
             "title":"Synthetic energy question", "summary":"Synthetic diagnostic metadata.",
             "reviewedTerms":["Energy", "H₂O"], "programmeIds":[], "editionIds":[], "conceptIds":[]}
    catalog = {"schema_version":"g9-search-catalog/1", "release_id":release["release_id"],
               "release_digest":release["release_digest"], "entries":[entry], "withdrawn_ids":[]}
    return release, catalog


def compile_index(release,catalog):
    return SearchIndexCompiler().compile(canonical_bytes(release), canonical_bytes(catalog),
       trusted_release_digest=release["release_digest"], trusted_catalog_digest=canonical_json_digest(catalog))


def query_engine(bundle, release, catalog):
    return SearchQueryEngine(bundle,canonical_bytes(release),canonical_bytes(catalog),
        trusted_release_digest=release["release_digest"],trusted_catalog_digest=canonical_json_digest(catalog))


def test_deterministic_real_a14_projection_and_exact_route(inputs):
    release,catalog=inputs
    a=compile_index(release,catalog)
    assert a==compile_index(release,catalog)
    assert a["manifest"]["learner_release"] is False
    assert release["projections"]["search_index"]==[]
    engine=query_engine(a,release,catalog)
    rows=engine.query("ＥＮＥＲＧＹ")
    assert len(rows)==1 and rows[0]["source_ref"]==catalog["entries"][0]["ref"]
    assert rows[0]["route"].startswith("/question/demo%3Aq%3A")
    assert normalize_query("Straße H₂O")=="strasse h2o"
    assert engine.query("",{"subject":rows[0]["subjectIds"]})
    assert engine.query("",{"subject":["OTHER"]})==[]
    rows[0]["title"]="mutation"
    assert engine.query("energy")[0]["title"]=="Synthetic energy question"
    assert "stem" not in rows[0] and "review" not in rows[0]


def test_release_and_catalog_pins_and_no_route_invention(inputs):
    release,catalog=inputs
    pin=canonical_json_digest(catalog)
    forged=copy.deepcopy(catalog);forged["entries"][0]["title"]="unreviewed"
    with pytest.raises(SearchCompilationError,match="CATALOG_PIN_MISMATCH"):
        SearchIndexCompiler().compile(canonical_bytes(release),canonical_bytes(forged),
            trusted_release_digest=release["release_digest"],trusted_catalog_digest=pin)
    forged=copy.deepcopy(release);forged["learner_release"]=True
    with pytest.raises(SearchCompilationError,match="RELEASE_PIN_MISMATCH"):
        compile_index(forged,catalog)
    for key,value in [("route","/learn/invented"),("status","APPROVED"),("privateMoveRef","secret")]:
        bad=copy.deepcopy(catalog);bad["entries"][0][key]=value
        with pytest.raises(SearchCompilationError):compile_index(release,bad)
    bad=copy.deepcopy(catalog);bad["entries"].append(copy.deepcopy(bad["entries"][0]))
    with pytest.raises(SearchCompilationError,match="DUPLICATE"):compile_index(release,bad)
    bad=copy.deepcopy(catalog);bad["entries"][0]["ref"]["revision"]=2
    with pytest.raises(SearchCompilationError,match="STALE"):compile_index(release,bad)
    bad=copy.deepcopy(catalog);bad["entries"][0]["ref"]=ref("FRESH_TASK","fresh:synthetic")
    with pytest.raises(SearchCompilationError):compile_index(release,bad)
    with pytest.raises(SearchCompilationError):SearchIndexCompiler("PRODUCTION")


def test_shard_staleness_and_rehash_do_not_create_authority(inputs):
    release,catalog=inputs
    a=compile_index(release,catalog);m=a["manifest"];p=next(iter(a["shards"].values()))
    kwargs={"trusted_manifest_digest":m["manifest_digest"],"trusted_release_digest":release["release_digest"],
            "trusted_catalog_digest":canonical_json_digest(catalog)}
    SearchIndexCompiler.verify_shard(m,p,**kwargs)
    changed=copy.deepcopy(p);changed["items"][0]["title"]="forged"
    with pytest.raises(StaleShardError):SearchIndexCompiler.verify_shard(m,changed,**kwargs)
    m2=copy.deepcopy(m);m2["shards"][0]["sha256"]=canonical_json_digest(changed)
    m2["manifest_digest"]=canonical_json_digest({k:v for k,v in m2.items() if k!="manifest_digest"})
    with pytest.raises(StaleShardError):SearchIndexCompiler.verify_shard(m2,changed,**kwargs)
    with pytest.raises(StaleShardError):query_engine({"manifest":m2,"shards":{changed["shard_id"]:changed}},release,catalog)


def test_withdrawal_requires_new_pinned_catalog(inputs):
    release,catalog=inputs
    old=compile_index(release,catalog)
    c=copy.deepcopy(catalog);c["withdrawn_ids"]=[c["entries"][0]["ref"]["id"]]
    new=compile_index(release,c)
    assert new["manifest"]["total_items"]==0 and query_engine(new,release,c).query()==[]
    with pytest.raises(StaleShardError):query_engine(old,release,c)


def source(population,rows):
    raw=canonical_bytes(rows)
    blob=hashlib.sha1(b"blob "+str(len(raw)).encode()+b"\0"+raw).hexdigest()
    return SourcePin(population,"synthetic:"+"a"*40,"fixture/"+population+".json",blob,len(raw),len(rows)),raw


def inventory():
    a,raw=source("v35_search",[
        {"id":"legacy:one","url":"question.html?x=1#part","title":"Never publish private legacy text"},
        {"id":"legacy:two","url":"question.html?x=2#part"},
        {"id":"legacy:duplicate-one","url":"same.html"},
        {"id":"legacy:duplicate-two","url":"same.html"},
        {"id":"owner.test.atlas","url":"owner.html"},
        {"id":"legacy:invalid"},
    ])
    b,raw2=source("v41_search",[{"id":"legacy:one","url":"question.html?x=1#part"},
                               {"id":"legacy:owner-copy","url":"owner.html"}])
    r=SearchRouteReconciler([a,b]);r.ingest({a.population:raw,b.population:raw2})
    return r,a,b,raw,raw2


def test_occurrence_accounting_and_no_fallback():
    r,*_=inventory()
    assert r.build_summary()["total_occurrences"]==8
    assert sum(r.build_summary()["disposition_counts"].values())==8
    assert r.resolve_route("v35_search","question.html?x=1#part")["status"]=="TOMBSTONE"
    for bad in ("question.html","question.html?x=1","question.html?x=1#wrong","legacy:one","part"):
        assert r.resolve_route("v35_search",bad)=={"status":"UNKNOWN","target_route":None}
    assert r.resolve_route("v35_search","same.html")["reason"]=="AMBIGUOUS_ROUTE"
    assert r.resolve_route("v35_search","owner.html")["status"]=="QUARANTINED"
    assert r.resolve_route("v41_search","owner.html")["status"]=="QUARANTINED"
    assert "Never publish" not in json.dumps(r.build_summary())
    assert "owner.html" not in json.dumps(r.build_summary())


def test_exact_source_bytes_and_duplicate_keys_rejected():
    _,a,b,raw,raw2=inventory()
    r=SearchRouteReconciler([a,b])
    with pytest.raises(SearchReconciliationError):r.ingest({a.population:raw[:-1]+b" ",b.population:raw2})
    with pytest.raises(SearchReconciliationError):r.ingest({a.population:raw})


def test_exact_route_grant_and_withdrawal(inputs):
    release,catalog=inputs;r,*_=inventory()
    # The exact source locator determines identity; no lookup by legacy id is used.
    from grade9build.record_inventory import occurrence_id
    key=occurrence_id("synthetic:"+"a"*40,"fixture/v35_search.json","/0")
    rec=next(x for x in r.private_occurrence_receipts() if x["occurrence_id"]==key)
    target=catalog["entries"][0]["ref"]
    grant={"occurrence_id":key,"record_digest":rec["record_digest"],"target":target,
           "review":ref("APPROVAL","approval:synthetic:route")}
    def bind(c,grants):
        bundle=compile_index(release,c);cd=canonical_json_digest(c)
        m={"schema_version":"g9-a71-route-grants/1","release_digest":release["release_digest"],"catalog_digest":cd,"grants":grants}
        r.bind_diagnostic_routes(canonical_bytes(m),trusted_mapping_digest=canonical_json_digest(m),bundle=bundle,
            release_bytes=canonical_bytes(release),catalog_bytes=canonical_bytes(c),
            trusted_release_digest=release["release_digest"],trusted_catalog_digest=cd)
    bind(catalog,[grant])
    result=r.resolve_route("v35_search","question.html?x=1#part")
    assert result["status"]=="ACTIVE_DIAGNOSTIC" and result["target_ref"]==target
    assert r.resolve_route("v41_search","question.html?x=1#part")["status"]=="TOMBSTONE"
    assert r.resolve_route("v35_search","question.html?x=1#wrong")["status"]=="UNKNOWN"
    bad=copy.deepcopy(grant);bad["record_digest"]="b"*64
    with pytest.raises(SearchReconciliationError):bind(catalog,[bad])
    c=copy.deepcopy(catalog);c["withdrawn_ids"]=[target["id"]];bind(c,[grant])
    assert r.resolve_route("v35_search","question.html?x=1#part")["reason"]=="WITHDRAWN"
