"""A34: deterministic, pinned diagnostic search index. No learner release admission.

Only exact QUESTION references in a verified A14 precommit projection and a separately
provisioned, reviewed metadata/route catalog may be indexed. The catalog is a trusted
bootstrap input, not a learner request. The compiler never copies legacy search text,
protected projections, or guesses routes. Production and FRESH_TASK indexing are held.
"""
from __future__ import annotations

import copy
import re
import unicodedata
from urllib.parse import quote
from .record_inventory import canonical_json_digest, parse_source_bytes

HEX = re.compile(r"^[0-9a-f]{64}$")
ID = re.compile(r"^[A-Za-z][A-Za-z0-9._:-]{2,127}$")
SUBJECTS = frozenset({"PHYSICS", "CHEMISTRY", "MATHEMATICS"})
DEFAULT_BOOST_RULES = {"exact_id": 10, "exact_title": 8, "title_tokens": 5,
                       "concept_aliases": 3, "summary_tokens": 1}
FORBIDDEN_ANSWER_KEYS = frozenset({
    "answer", "answers", "solution", "solutions", "workedsteps", "masterkey",
    "rubric", "referencesolution", "privatenotes", "secret", "rawclaim",
    "cruxrevealed", "privatemoves", "privatemoveref", "privaterubric", "assessmentrawclaim",
})
CATALOG_SCHEMA = "g9-search-catalog/1"
INDEX_SCHEMA = "g9-search-index/1.1"
FACETS = frozenset({"subject", "kind", "programme", "edition", "concept"})


class SearchCompilationError(ValueError):
    pass


class AnswerLeakageError(SearchCompilationError):
    pass


class StaleShardError(SearchCompilationError):
    pass


def require(condition, code):
    if not condition:
        raise SearchCompilationError(code)


def exact_keys(value, keys):
    return type(value) is dict and set(value) == set(keys)


def digest(value):
    return type(value) is str and bool(HEX.fullmatch(value))


def stable_id(value):
    return type(value) is str and bool(ID.fullmatch(value))


def exact_ref(value, kind):
    return (exact_keys(value, ("type", "id", "revision", "sha256"))
            and value["type"] == kind and stable_id(value["id"])
            and type(value["revision"]) is int and 0 < value["revision"] <= 2**53-1
            and digest(value["sha256"]))


def safe_text(value, limit=1000):
    return (type(value) is str and 0 < len(value.strip()) <= limit and len(value) <= limit
            and not any(unicodedata.category(c) in ("Cc", "Cs", "Cf") for c in value))


def string_list(value, predicate, limit=128):
    return (type(value) is list and len(value) <= limit
            and all(predicate(v) for v in value) and len(set(value)) == len(value))


def normalize_query(text):
    require(type(text) is str, "INVALID_QUERY")
    return re.sub(r"\s+", " ", unicodedata.normalize("NFKC", text).casefold()).strip()


def tokenize(text):
    return [v for v in re.split(r"[\s,;:.!?()\[\]{}\"'=]+", normalize_query(text)) if v]


def assert_no_answer_leakage(data, path=""):
    # Defense in depth only. Arbitrary text cannot be proven safe by key scanning.
    # Strict allowlisted shapes and a separately trusted metadata catalog are mandatory.
    if type(data) is dict:
        for k, v in data.items():
            if type(k) is not str:
                raise AnswerLeakageError("N09_INVALID_KEY")
            key = re.sub(r"[^a-z0-9]", "", unicodedata.normalize("NFKC", k).casefold())
            if key in FORBIDDEN_ANSWER_KEYS:
                raise AnswerLeakageError("N09_PROTECTED_FIELD")
            assert_no_answer_leakage(v)
    elif type(data) is list:
        for v in data:
            assert_no_answer_leakage(v)


def question_route(ref):
    require(exact_ref(ref, "QUESTION"), "EXACT_QUESTION_REQUIRED")
    return "/question/" + quote(ref["id"], safe="")


def _verified_release(raw, pin):
    require(type(raw) is bytes and digest(pin), "TRUSTED_RELEASE_PIN_REQUIRED")
    try:
        m = parse_source_bytes(raw)
    except (ValueError, UnicodeError, TypeError):
        raise SearchCompilationError("INVALID_RELEASE_BYTES") from None
    require(type(m) is dict and m.get("release_digest") == pin
            and canonical_json_digest({k: v for k, v in m.items() if k != "release_digest"}) == pin,
            "RELEASE_PIN_MISMATCH")
    require(m.get("schema_version") == "g9-release-projection/1.1"
            and m.get("target_mode") == "DEMO" and m.get("demo_banner") is True
            and m.get("academic_admission") == "HOLD" and m.get("production_release") == "NONE"
            and m.get("artifact_scope") == "PUBLIC_SAFE_DIAGNOSTIC_ONLY"
            and m.get("learner_release") is False and stable_id(m.get("release_id")), "INVALID_RELEASE_SCOPE")
    p = m.get("projections")
    require(exact_keys(p, ("learner_precommit", "learner_postcommit", "search_index", "assessment_contracts"))
            and p["learner_postcommit"] == p["search_index"] == p["assessment_contracts"] == []
            and type(p["learner_precommit"]) is list, "PROTECTED_RELEASE_PROJECTION")
    items = {}
    permitted = {"type", "id", "revision", "sha256", "stem", "subject_id", "demo",
                 "asset_refs", "options", "fields", "response_kind", "prediction_prompt"}
    for row in p["learner_precommit"]:
        require(type(row) is dict and set(row) <= permitted and row.get("type") in ("QUESTION", "FRESH_TASK")
                and exact_ref({k: row.get(k) for k in ("type", "id", "revision", "sha256")}, row["type"])
                and row.get("subject_id") in SUBJECTS and row.get("demo") is True
                and row.get("asset_refs") == [] and type(row.get("stem")) is str
                and row["id"] not in items, "INVALID_PUBLIC_ITEM")
        assert_no_answer_leakage(row)
        items[row["id"]] = row
    return m, items


def _catalog(raw, pin, release):
    require(type(raw) is bytes and digest(pin), "TRUSTED_CATALOG_PIN_REQUIRED")
    try:
        c = parse_source_bytes(raw)
    except (ValueError, UnicodeError, TypeError):
        raise SearchCompilationError("INVALID_CATALOG_BYTES") from None
    require(canonical_json_digest(c) == pin, "CATALOG_PIN_MISMATCH")
    assert_no_answer_leakage(c)
    require(exact_keys(c, ("schema_version", "release_id", "release_digest", "entries", "withdrawn_ids"))
            and c["schema_version"] == CATALOG_SCHEMA and c["release_id"] == release["release_id"]
            and c["release_digest"] == release["release_digest"] and type(c["entries"]) is list
            and string_list(c["withdrawn_ids"], stable_id, 100000), "INVALID_SEARCH_CATALOG")
    return c


class SearchIndexCompiler:
    def __init__(self, target_mode="DEMO"):
        require(target_mode == "DEMO", "PRODUCTION_TARGET_PROHIBITED")

    def compile(self, release_bytes, catalog_bytes, *, trusted_release_digest, trusted_catalog_digest):
        m, items = _verified_release(release_bytes, trusted_release_digest)
        c = _catalog(catalog_bytes, trusted_catalog_digest, m)
        rows = {}
        for g in c["entries"]:
            require(exact_keys(g, ("ref", "review", "title", "summary", "reviewedTerms",
                                  "programmeIds", "editionIds", "conceptIds"))
                    and exact_ref(g["ref"], "QUESTION") and exact_ref(g["review"], "APPROVAL")
                    and safe_text(g["title"]) and safe_text(g["summary"], 2000)
                    and string_list(g["reviewedTerms"], safe_text)
                    and all(string_list(g[k], stable_id) for k in ("programmeIds", "editionIds", "conceptIds")),
                    "INVALID_REVIEWED_SEARCH_ENTRY")
            r = g["ref"]
            obj = items.get(r["id"])
            require(obj is not None and r == {k: obj[k] for k in ("type", "id", "revision", "sha256")}
                    and r["id"] not in rows, "UNKNOWN_STALE_OR_DUPLICATE_SEARCH_REF")
            subject = obj["subject_id"]
            rows[r["id"]] = {
                "id": r["id"], "revision": r["revision"], "source_ref": copy.deepcopy(r),
                "releaseId": m["release_id"], "route": question_route(r), "kind": "QUESTION",
                "subjectIds": [subject], "title": g["title"], "summary": g["summary"],
                "reviewedTerms": sorted(set(normalize_query(v) for v in g["reviewedTerms"])),
                "programmeIds": sorted(g["programmeIds"]), "editionIds": sorted(g["editionIds"]),
                "conceptIds": sorted(g["conceptIds"]),
                "publicFacets": {"subject": [subject], "kind": ["QUESTION"],
                                 "programme": sorted(g["programmeIds"]), "edition": sorted(g["editionIds"]),
                                 "concept": sorted(g["conceptIds"])},
            }
        require(set(c["withdrawn_ids"]) <= set(rows), "UNKNOWN_WITHDRAWAL")
        withdrawn = set(c["withdrawn_ids"])
        active = [rows[k] for k in sorted(rows) if k not in withdrawn]
        shards, metadata = {}, []
        for subject in sorted(SUBJECTS):
            records = [r for r in active if r["subjectIds"] == [subject]]
            if not records:
                continue
            sid = "shard-" + subject.lower()
            payload = {"shard_id": sid, "release_id": m["release_id"], "release_digest": trusted_release_digest,
                       "catalog_digest": trusted_catalog_digest, "item_count": len(records), "items": records}
            shards[sid] = payload
            metadata.append({"shard_id": sid, "subject_id": subject, "item_count": len(records),
                             "sha256": canonical_json_digest(payload)})
        manifest = {"schema_version": INDEX_SCHEMA, "release_id": m["release_id"],
                    "release_digest": trusted_release_digest, "catalog_digest": trusted_catalog_digest,
                    "target_mode": "DEMO", "demo_banner": True, "learner_release": False,
                    "artifact_scope": "PUBLIC_SAFE_DIAGNOSTIC_ONLY", "academic_admission": "HOLD",
                    "production_release": "NONE", "total_items": len(active),
                    "boost_rules": copy.deepcopy(DEFAULT_BOOST_RULES),
                    "normalization": "UNICODE_NFKC_CASEFOLD", "shards": metadata}
        manifest["manifest_digest"] = canonical_json_digest(manifest)
        bundle = {"manifest": manifest, "shards": shards}
        assert_no_answer_leakage(bundle)
        return bundle

    @staticmethod
    def verify_shard(manifest, payload, *, trusted_manifest_digest, trusted_release_digest,
                     trusted_catalog_digest):
        # This verifies exact separately pinned wire integrity; full semantic validation
        # uses verify_index, which rebuilds from the trusted release and catalog.
        if (not all(digest(x) for x in (trusted_manifest_digest, trusted_release_digest, trusted_catalog_digest))
                or type(manifest) is not dict or manifest.get("manifest_digest") != trusted_manifest_digest
                or canonical_json_digest({k: v for k, v in manifest.items() if k != "manifest_digest"}) != trusted_manifest_digest
                or manifest.get("schema_version") != INDEX_SCHEMA or manifest.get("target_mode") != "DEMO"
                or manifest.get("learner_release") is not False
                or manifest.get("release_digest") != trusted_release_digest
                or manifest.get("catalog_digest") != trusted_catalog_digest
                or not exact_keys(payload, ("shard_id", "release_id", "release_digest", "catalog_digest", "item_count", "items"))
                or payload["release_id"] != manifest.get("release_id")
                or payload["release_digest"] != trusted_release_digest or payload["catalog_digest"] != trusted_catalog_digest
                or type(payload["items"]) is not list or type(payload["item_count"]) is not int
                or payload["item_count"] != len(payload["items"])):
            raise StaleShardError("N26_STALE_OR_UNPINNED_SHARD")
        matches = [s for s in manifest.get("shards", []) if s.get("shard_id") == payload["shard_id"]]
        if (len(matches) != 1 or matches[0].get("item_count") != payload["item_count"]
                or matches[0].get("sha256") != canonical_json_digest(payload)):
            raise StaleShardError("N26_SHARD_INTEGRITY")
        assert_no_answer_leakage(payload)

    def verify_index(self, bundle, release_bytes, catalog_bytes, *, trusted_release_digest, trusted_catalog_digest):
        expected = self.compile(release_bytes, catalog_bytes, trusted_release_digest=trusted_release_digest,
                                trusted_catalog_digest=trusted_catalog_digest)
        if canonical_json_digest(bundle) != canonical_json_digest(expected):
            raise StaleShardError("N26_INDEX_MISMATCH")
        return copy.deepcopy(expected)


class SearchQueryEngine:
    def __init__(self, bundle, release_bytes, catalog_bytes, *, trusted_release_digest, trusted_catalog_digest):
        verified = SearchIndexCompiler().verify_index(bundle, release_bytes, catalog_bytes,
            trusted_release_digest=trusted_release_digest, trusted_catalog_digest=trusted_catalog_digest)
        self._items = [r for s in verified["shards"].values() for r in s["items"]]

    def query(self, text="", facets=None, limit=50):
        require(type(text) is str and len(text) <= 1000 and type(limit) is int and 0 <= limit <= 200,
                "INVALID_SEARCH_QUERY")
        filters = {} if facets is None else facets
        require(type(filters) is dict and set(filters) <= FACETS
                and all(string_list(v, safe_text) for v in filters.values()), "INVALID_SEARCH_FACETS")
        query = normalize_query(text)
        tokens = set(tokenize(query))
        results = []
        for row in self._items:
            if any(v and not set(v).intersection(row["publicFacets"][k]) for k, v in filters.items()):
                continue
            title = normalize_query(row["title"])
            score = (10 if query == normalize_query(row["id"]) else 0) + (8 if query == title else 0)
            score += 5 * len(tokens.intersection(tokenize(title)))
            score += 3 * len(tokens.intersection(t for term in row["reviewedTerms"] for t in tokenize(term)))
            score += len(tokens.intersection(tokenize(row["summary"])))
            if not query or score > 0:
                results.append((score, row["id"], row))
        return copy.deepcopy([r for _, _, r in sorted(results, key=lambda v: (-v[0], v[1]))[:limit]])
