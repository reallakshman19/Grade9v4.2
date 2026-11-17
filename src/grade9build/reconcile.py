"""Private-only candidate reconciliation and route metadata. No release projection."""
import copy,json
from pathlib import Path
from .importers.base import UnknownRouteError, InvalidClaimStatusError
from .graph import ObjectGraphValidator
from .field_ledger import FieldLedgerEngine,FieldLedgerAuditError
ROOT=Path(__file__).resolve().parents[2]
class RouteLedger:
    def __init__(self,route_map_path=None,blueprint_map_path=None):
        self.data=json.loads(Path(route_map_path or ROOT/"docs/migration/route-map.json").read_text())
        bp=json.loads(Path(blueprint_map_path or ROOT/"docs/architecture/native-blueprint-map.json").read_text())
        native={(r["target_role"],r["blueprint_id"],r["layout_mode"]) for r in bp["blueprints"]}
        self.routes={}
        for kind in ("blueprints","portable_packages","tombstones"):
            for row in self.data[kind]:
                path=row["route"]
                if path in self.routes:raise UnknownRouteError("duplicate route: "+path)
                if kind=="blueprints" and (row["role"],row["blueprint_id"],row["layout_mode"]) not in native:raise UnknownRouteError("unknown blueprint binding")
                if kind=="tombstones" and (not row.get("source_locator") or not row.get("authority_ref")):raise UnknownRouteError("unproved tombstone")
                if kind!="tombstones" and row.get("status")!="HOLD":raise UnknownRouteError("route is not HOLD")
                self.routes[path]={**row,"route_type":kind}
        if {(r["role"],r["blueprint_id"],r["layout_mode"]) for r in self.data["blueprints"]}!=native:raise UnknownRouteError("native blueprint coverage incomplete")
    def resolve_route(self,route):
        if route not in self.routes:raise UnknownRouteError("unregistered route: "+route)
        return copy.deepcopy(self.routes[route])
    def is_tombstone(self,route):return self.routes.get(route,{}).get("route_type")=="tombstones"
    def list_tombstones(self):return [copy.deepcopy(x) for x in self.routes.values() if x["route_type"]=="tombstones"]
class ReconciliationEngine:
    @staticmethod
    def audit_candidate_claims(bundle):
        if bundle.get("status")!="HOLD" or bundle.get("academic_admission")!="HOLD" or bundle.get("production_release")!="NONE":raise InvalidClaimStatusError("candidate promoted")
        ObjectGraphValidator(demo_mode=True).validate_graph(bundle["objects"])
        for obj in bundle["objects"]:
            if obj["type"]=="OCCURRENCE":
                p=obj["payload"]
                if p.get("academic_admission")!="HOLD" or p.get("production_release")!="NONE" or p.get("candidate_claims",{}).get("status")!="HOLD":raise InvalidClaimStatusError("candidate claim promoted")
                for k in ("assessment","qrt"):
                    if k in p["candidate_claims"] and p["candidate_claims"][k].get("status")!="HOLD":raise InvalidClaimStatusError("nested claim promoted")
                figures=p["candidate_claims"].get("figure_claims",[])
                if not isinstance(figures,list) or any(
                    not isinstance(f,dict) or f.get("status") not in ("BYTE_MATCH_SYNTHETIC","HOLD_UNVERIFIED")
                    for f in figures
                ):raise InvalidClaimStatusError("figure claim promoted or malformed")
        # Do not trust a recorded field-audit PASS badge after the bundle is mutated.
        sources=[o for o in bundle["objects"] if o["type"]=="SOURCE"]
        occurrences=[o for o in bundle["objects"] if o["type"]=="OCCURRENCE"]
        if len(sources)!=1 or len(occurrences)!=1 or not isinstance(bundle.get("field_map"),list):
            raise InvalidClaimStatusError("missing or ambiguous custody/field evidence")
        source,occurrence=sources[0],occurrences[0]
        identity=occurrence["payload"]["identity"]
        if (bundle.get("source_sha256")!=source["payload"].get("raw_sha256") or
            bundle.get("record_digest")!=identity["record_digest"] or
            bundle.get("record_locator")!=identity["record_locator"]):
            raise InvalidClaimStatusError("custody metadata changed")
        try:
            audit=FieldLedgerEngine.audit_field_conservation(
                occurrence["payload"]["raw_record"],occurrence,bundle["field_map"])
        except (FieldLedgerAuditError,TypeError,KeyError,ValueError) as e:
            raise InvalidClaimStatusError("field conservation failed") from e
        if bundle.get("field_audit")!=audit:
            raise InvalidClaimStatusError("field audit is stale or altered")
    @staticmethod
    def generate_private_custody_report(bundles):
        for bundle in bundles:ReconciliationEngine.audit_candidate_claims(bundle)
        return {"status":"HOLD","academic_admission":"HOLD","production_release":"NONE","records":copy.deepcopy(bundles)}
    @staticmethod
    def generate_public_safe_projection(bundles):
        # No candidate records, aliases, option identifiers or counts enter the learner projection.
        for bundle in bundles:ReconciliationEngine.audit_candidate_claims(bundle)
        return {"status":"HOLD","academic_admission":"HOLD","production_release":"NONE","total_records":0,"projections":[]}
