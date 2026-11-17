"""Structural graph verification. No approval or release authority inferred."""
import hashlib
import json
from pathlib import Path
from jsonschema import Draft202012Validator, ValidationError
def canonical_bytes(value):
    return json.dumps(value, ensure_ascii=False, sort_keys=True, separators=(",", ":"), allow_nan=False).encode("utf-8")

SCHEMAS=Path(__file__).resolve().parents[2]/"schemas/platform"
class GraphValidationError(ValueError): pass

def object_key(obj): return (obj["type"],obj["id"],obj["revision"])
def compute_object_digest(obj): return hashlib.sha256(canonical_bytes(obj)).hexdigest()

def payload_refs(value):
    if isinstance(value,dict):
        if set(value)=={"type","id","revision","sha256"}: yield value
        else:
            for item in value.values(): yield from payload_refs(item)
    elif isinstance(value,list):
        for item in value: yield from payload_refs(item)

class ObjectGraphValidator:
    # These are structural dependencies demonstrated by the R4 fixtures; other edges are not automatically authorized.
    RULES={"ASSESSMENT":({"QUESTION"},{"QUESTION","WARRANT","SOURCE","OCCURRENCE"}),
           "LESSON":({"CONSTRUCTION","CONCEPT"},{"CONSTRUCTION","CONCEPT","PRESENTATION","ASSET","FRESH_TASK","SOLUTION","WARRANT"}),
           "FRESH_TASK":({"CONSTRUCTION","CONCEPT","FRESH_TASK"},{"CONSTRUCTION","CONCEPT","FRESH_TASK","WARRANT","ASSET","STIMULUS"}),
           "SOLUTION":({"QUESTION","FRESH_TASK"},{"QUESTION","FRESH_TASK","WARRANT","ASSET","STIMULUS"}),
           "QRT":({"QUESTION","OCCURRENCE"},{"QUESTION","OCCURRENCE","SOURCE","WARRANT","CONCEPT"})}
    def __init__(self,demo_mode=False):
        self.demo_mode=demo_mode; self.index={}; self.edges={}
        self.schema=Draft202012Validator(json.loads((SCHEMAS/"object-envelope.schema.json").read_text()))
        self.ref_schema=Draft202012Validator(json.loads((SCHEMAS/"exact-ref.schema.json").read_text()))
    def add_object(self,obj):
        try: self.schema.validate(obj); canonical_bytes(obj)
        except (ValidationError,ValueError,TypeError) as e: raise GraphValidationError("invalid object schema: "+str(e)) from e
        k=object_key(obj)
        if k in self.index: raise GraphValidationError("duplicate object "+str(k))
        if self.demo_mode and obj["status"]!="SYNTHETIC": raise GraphValidationError("non-synthetic in demo graph")
        if obj["type"] in {"APPROVAL","RELEASE"} and obj["status"]!="SYNTHETIC": raise GraphValidationError("external approval/release verifier not configured")
        self.index[k]=obj
    def validate_graph(self,objects=None):
        if objects is not None:
            self.index={}
            for o in objects: self.add_object(o)
        else:
            saved=list(self.index.values()); self.index={}
            for o in saved:self.add_object(o)
        self.edges={k:[] for k in self.index}
        digests={k:compute_object_digest(o) for k,o in self.index.items()}
        for k,o in self.index.items():
            refs=o["dependencies"]+o["source_lineage_refs"]
            for ref in refs:
                target=object_key(ref)
                if target not in self.index: raise GraphValidationError("missing ref "+str(target))
                if digests[target]!=ref["sha256"]: raise GraphValidationError("stale digest "+str(target))
                self.edges[k].append(target)
                s,t=o["subject_id"],self.index[target]["subject_id"]
                if s and t and s!=t and o["type"]!="RELATIONSHIP": raise GraphValidationError("cross-subject violation")
            payload=o["payload"]
            if o["type"]=="OCCURRENCE" and "identity" in payload:
                identity=payload["identity"]
                try: Draft202012Validator(json.loads((SCHEMAS/"identity.schema.json").read_text())).validate(identity)
                except ValidationError as e:raise GraphValidationError("invalid occurrence identity") from e
                locator=[identity["snapshot_id"],identity["source_path"],identity["record_locator"]]
                if identity["occurrence_id"]!=o["id"] or o["id"]!="occ:"+compute_object_digest(locator) or compute_object_digest(payload["raw_record"])!=identity["record_digest"]:raise GraphValidationError("occurrence identity or record digest mismatch")
                if identity["source_ref"] not in o["source_lineage_refs"]:raise GraphValidationError("occurrence source mismatch")
                # Raw legacy records and claims are evidence, not canonical target references.
                payload={"identity":identity}
            for ref in payload_refs(payload):
                if ref not in refs: raise GraphValidationError("payload reference not dependency")
            if o["type"] in self.RULES:
                required,allowed=self.RULES[o["type"]]; types={r["type"] for r in o["dependencies"]}
                if not types&required or not types<=allowed: raise GraphValidationError("typed edge violation")
            if o["type"]=="ASSESSMENT":
                q=o["payload"].get("question")
                if not isinstance(q,dict) or q.get("type")!="QUESTION" or q not in o["dependencies"]: raise GraphValidationError("assessment question binding mismatch")
            if o["type"]=="RELATIONSHIP":
                for field in ("from","to"):
                    ref=o["payload"].get(field)
                    if not isinstance(ref,dict) or ref not in refs: raise GraphValidationError("relationship endpoint not dependency")
        # Iterative cycle detection (deep graphs do not exhaust Python recursion).
        indegree={k:len(set(v)) for k,v in self.edges.items()}; reverse={k:[] for k in self.edges}
        for k,v in self.edges.items():
            for target in set(v):reverse[target].append(k)
        ready=[k for k,n in indegree.items() if not n]; count=0
        while ready:
            k=ready.pop();count+=1
            for dependent in reverse[k]:
                indegree[dependent]-=1
                if not indegree[dependent]:ready.append(dependent)
        if count!=len(self.index):raise GraphValidationError("cycle detected")
        return count
