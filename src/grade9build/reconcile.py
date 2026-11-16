"""Private-only candidate reconciliation and route metadata. No release projection."""
import copy,json
from pathlib import Path
from .importers.base import UnknownRouteError, InvalidClaimStatusError
from .graph import ObjectGraphValidator
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
    @staticmethod
    def generate_private_custody_report(bundles):
        for bundle in bundles:ReconciliationEngine.audit_candidate_claims(bundle)
        return {"status":"HOLD","academic_admission":"HOLD","production_release":"NONE","records":copy.deepcopy(bundles)}
    @staticmethod
    def generate_public_safe_projection(bundles):
        # No candidate records, aliases, option identifiers or counts enter the learner projection.
        for bundle in bundles:ReconciliationEngine.audit_candidate_claims(bundle)
        return {"status":"HOLD","academic_admission":"HOLD","production_release":"NONE","total_records":0,"projections":[]}
