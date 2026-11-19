"""Emit in-memory synthetic compiler bytes for cross-language/browser tests only."""
import copy
import sys
import json
from pathlib import Path
from grade9build.compile import ReleaseProjectionCompiler
from grade9build.record_inventory import canonical_json_digest
from grade9build.search import SearchIndexCompiler, SearchQueryEngine, normalize_query

ROOT = Path(__file__).resolve().parents[2]
def build(release, withdrawn=False):
    entries=[]
    for row in release["projections"]["learner_precommit"]:
        if row["type"]!="QUESTION": continue
        key=row["id"]
        entries.append({"ref":{k:row[k] for k in ("type","id","revision","sha256")},
            "review":{"type":"APPROVAL","id":"approval:"+key,"revision":1,"sha256":"a"*64},
            "title":"Synthetic Straße energy H₂O "+key,
            "summary":"Diagnostic text <img src=x onerror=alert(1)>",
            "reviewedTerms":["Energy","H₂O","Straße","गति"],"programmeIds":["programme:synthetic"],
            "editionIds":["edition:synthetic"],"conceptIds":["concept:synthetic"]})
    c={"schema_version":"g9-search-catalog/1","release_id":release["release_id"],"release_digest":release["release_digest"],"entries":entries,"withdrawn_ids":[e["ref"]["id"] for e in entries] if withdrawn else []}
    rb=json.dumps(release,ensure_ascii=False);cb=json.dumps(c,ensure_ascii=False);cd=canonical_json_digest(c)
    kwargs={"trusted_release_digest":release["release_digest"],"trusted_catalog_digest":cd}
    b=SearchIndexCompiler().compile(rb.encode(),cb.encode(),**kwargs)
    engine=SearchQueryEngine(b,rb.encode(),cb.encode(),**kwargs)
    queries=["ＥＮＥＲＧＹ","STRASSE","H₂O","गति","unmatched","",entries[0]["ref"]["id"] if entries else ""]
    return {"release":rb,"manifest":json.dumps(b["manifest"],ensure_ascii=False),
        "shards":{k:json.dumps(v,ensure_ascii=False) for k,v in b["shards"].items()},
        "pins":{"learnerId":"synthetic-learner","releaseId":release["release_id"],"releaseDigest":release["release_digest"],"catalogDigest":cd,"manifestDigest":b["manifest"]["manifest_digest"]},
        "expected":[{"text":q,"ids":[r["id"] for r in engine.query(q)]} for q in queries]}

def main():
    graph=json.loads((ROOT/"fixtures/synthetic/graph.json").read_text())
    release=ReleaseProjectionCompiler().compile_release(graph)
    # Stress fixture only: 1493 generated synthetic public question shapes, not
    # source data, not an A14 released graph, no actual learner authorization.
    bench=copy.deepcopy(release);bench["release_id"]="RELEASE-SYNTHETIC-BENCH";bench.pop("fixture_id",None);bench.pop("graph_digest",None);bench.pop("total_objects",None)
    bench["projections"]["learner_precommit"]=[{"type":"QUESTION","id":f"question:bench:{i:04}","revision":1,"sha256":canonical_json_digest(["synthetic",i]),"stem":"Synthetic benchmark prompt","subject_id":["PHYSICS","CHEMISTRY","MATHEMATICS"][i%3],"demo":True,"asset_refs":[]} for i in range(10000 if '--scale' in sys.argv else 1493)]
    bench["release_digest"]=canonical_json_digest({k:v for k,v in bench.items() if k!="release_digest"})
    vectors=[(c,normalize_query(c)) for i in range(0x110000) if (c:=chr(i)).lower()!=c.casefold()]
    vectors.extend((v,normalize_query(v)) for v in ["Straße H₂O","ΟΣ","Δ E = ½mv²","गति","a\u0085b","ＡＢＣ","\ufeffx"])
    print(json.dumps({"actual":build(release),"withdrawn":build(release,True),"bench":build(bench),"vectors":vectors},ensure_ascii=False))

if __name__=="__main__":main()
