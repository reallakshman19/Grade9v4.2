"""Exact-byte custody and explicit RFC 6901 occurrence extraction. No implicit merge."""
import copy
import hashlib
import json
import re
from pathlib import Path
from jsonschema import Draft202012Validator

SCHEMAS = Path(__file__).resolve().parents[2] / "schemas/platform"

def canonical_bytes(value):
    return json.dumps(value, ensure_ascii=False, sort_keys=True, separators=(",", ":"), allow_nan=False).encode("utf-8")

def canonical_json_digest(value):
    return hashlib.sha256(canonical_bytes(value)).hexdigest()

def parse_source_bytes(raw):
    if not isinstance(raw, bytes):
        raise ValueError("original bytes required")
    def pairs(items):
        out = {}
        for k, v in items:
            if k in out: raise ValueError("duplicate JSON key: " + k)
            out[k] = v
        return out
    def nonfinite(x): raise ValueError("nonfinite: " + x)
    return json.loads(raw.decode("utf-8"), object_pairs_hook=pairs, parse_constant=nonfinite)

def rfc6901_escape(token):
    return str(token).replace("~", "~0").replace("/", "~1")

def pointer_tokens(pointer):
    if not isinstance(pointer, str) or (pointer and not pointer.startswith("/")):
        raise ValueError("invalid pointer")
    if not pointer: return []
    tokens = pointer[1:].split("/")
    if any(re.search(r"~(?![01])", t) for t in tokens): raise ValueError("invalid pointer escape")
    return [t.replace("~1", "/").replace("~0", "~") for t in tokens]

def resolve_pointer(value, pointer):
    for token in pointer_tokens(pointer):
        if isinstance(value, dict): value = value[token]
        elif isinstance(value, list) and re.fullmatch(r"0|[1-9][0-9]*", token): value = value[int(token)]
        else: raise ValueError("pointer not resolvable: " + pointer)
    return value

def extract_leaf_pointers(obj, prefix=""):
    if isinstance(obj, dict) and obj:
        for k, v in obj.items(): yield from extract_leaf_pointers(v, prefix + "/" + rfc6901_escape(k))
    elif isinstance(obj, list) and obj:
        for i, v in enumerate(obj): yield from extract_leaf_pointers(v, prefix + "/" + str(i))
    else: yield prefix, obj

def validate_locator(snapshot_id, source_path, pointer):
    if not re.fullmatch(r"[a-z0-9][a-z0-9._-]*:[0-9a-f]{40}", snapshot_id): raise ValueError("exact snapshot required")
    if not isinstance(source_path, str) or not source_path or "\\" in source_path or ":" in source_path or any(t in ("", ".", "..") for t in source_path.split("/")):
        raise ValueError("unsafe source path")
    pointer_tokens(pointer)

def occurrence_id(snapshot_id, source_path, pointer):
    validate_locator(snapshot_id, source_path, pointer)
    return "occ:" + canonical_json_digest([snapshot_id, source_path, pointer])

def exact_ref(obj):
    return {**{k: obj[k] for k in ("type", "id", "revision")}, "sha256": canonical_json_digest(obj)}

def make_envelope(kind, id_, payload, *, subject_id=None, dependencies=(), lineage=(), status="HOLD"):
    return {"schema_version":"engineering-projection/1", "type":kind, "id":id_, "revision":1,
            "subject_id":subject_id, "payload":copy.deepcopy(payload), "dependencies":list(dependencies),
            "source_lineage_refs":list(lineage), "status":status}

def validate_identity(record):
    Draft202012Validator(json.loads((SCHEMAS / "identity.schema.json").read_text())).validate(record)
    if record["occurrence_id"] != occurrence_id(record["snapshot_id"], record["source_path"], record["record_locator"]):
        raise ValueError("occurrence identity mismatch")
    return record

class RecordOccurrence:
    def __init__(self, snapshot_id, source_path, record_locator, payload, source_blob_sha, source_sha256, population_id, kind):
        self.snapshot_id, self.source_path, self.record_locator = snapshot_id, source_path, record_locator
        self.occurrence_id = occurrence_id(snapshot_id, source_path, record_locator)
        self._payload = copy.deepcopy(payload)
        self.record_digest = canonical_json_digest(payload)
        self.source_blob_sha, self.source_sha256, self.population_id, self.kind = source_blob_sha, source_sha256, population_id, kind
    @property
    def payload(self): return copy.deepcopy(self._payload)
    def get_leaf_map(self): return dict(extract_leaf_pointers(self._payload))
    def to_dict(self):
        return {k: getattr(self,k) for k in ("snapshot_id","source_path","record_locator","occurrence_id","record_digest","source_blob_sha","source_sha256","population_id","kind")}

class RecordInventoryEngine:
    """Retains complete document and explicit collection occurrences; no guessed collection selection."""
    def __init__(self):
        self.records=[]; self._occurrence_ids=set(); self.populations={}
    def add_record(self, record):
        if record.occurrence_id in self._occurrence_ids: raise ValueError("duplicate occurrence")
        self._occurrence_ids.add(record.occurrence_id); self.records.append(record)
        self.populations.setdefault(record.population_id, []).append(record)
    def extract_document(self, *, snapshot_id, source_path, raw_bytes, expected_sha256, population_id, collection_paths, expected_blob_sha=None):
        validate_locator(snapshot_id, source_path, "")
        if not isinstance(population_id,str) or not population_id: raise ValueError("explicit population required")
        digest=hashlib.sha256(raw_bytes).hexdigest()
        if digest != expected_sha256: raise ValueError("source byte digest mismatch")
        blob=hashlib.sha1(b"blob "+str(len(raw_bytes)).encode()+b"\0"+raw_bytes).hexdigest()
        if expected_blob_sha is not None and blob != expected_blob_sha: raise ValueError("Git blob mismatch")
        data=parse_source_bytes(raw_bytes)
        if not isinstance(collection_paths,(list,tuple)) or len(set(collection_paths))!=len(collection_paths): raise ValueError("explicit unique collection paths required")
        # The root preserves all container fields, even empty/unknown arrays. Record counts exclude this document witness.
        entries=[("",data,"DOCUMENT")]
        for path in collection_paths:
            collection=resolve_pointer(data,path)
            if not isinstance(collection,list): raise ValueError("collection is not an array: "+path)
            entries.extend((path+"/"+str(i),v,"RECORD") for i,v in enumerate(collection))
        records=[RecordOccurrence(snapshot_id,source_path,loc,v,blob,digest,population_id,kind) for loc,v,kind in entries]
        ids=[r.occurrence_id for r in records]
        if len(set(ids))!=len(ids) or set(ids)&self._occurrence_ids: raise ValueError("duplicate occurrence")
        for record in records: self.add_record(record)
        return records
