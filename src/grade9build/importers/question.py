"""Private question-occurrence importer; no verified answer, QRT, or canonical question invented."""
import hashlib
import re
from .base import BaseImporter, ImporterError, MissingFigureError, DefaultClassificationForbiddenError
class QuestionImporter(BaseImporter):
    def import_question(self, *, available_assets=None, **source_args):
        source,record,identity=self.prepare(**source_args)
        raw=record.payload
        if not isinstance(raw,dict): raise ImporterError("question record must be object")
        assets={} if available_assets is None else available_assets
        if raw.get("_injected_defaults") or raw.get("_has_default_fallback"): raise DefaultClassificationForbiddenError("default classifications prohibited")
        if "options" in raw:
            options=raw["options"]
            if not isinstance(options,list):raise ImporterError("options must be an array")
            # Missing IDs must not silently vanish from a source option inventory.
            ids=[]
            for index, option in enumerate(options):
                if not isinstance(option,dict) or not isinstance(option.get("id"),str) or not option["id"].strip():
                    raise ImporterError("invalid or missing option ID at index "+str(index))
                ids.append(option["id"])
            if len(ids)!=len(set(ids)):raise ImporterError("duplicate option IDs")
        claims={"status":"HOLD","assessment":{"status":"HOLD","raw_claim":raw.get("answer")},"qrt":{"status":"HOLD","raw_claims":{k:raw[k] for k in ("op","band","score","crux") if k in raw}},"figure_claims":[]}
        for field in ("source_figures","figures"):
            if field not in raw:continue
            figs=raw[field]
            if not isinstance(figs,list): raise ImporterError("unresolved figure representation: "+field)
            for i,fig in enumerate(figs):
                if not isinstance(fig,dict) or not isinstance(fig.get("id"),str) or not isinstance(fig.get("mandatory"),bool):raise ImporterError("unresolved figure metadata")
                fid=fig["id"]; expected=fig.get("content_sha256"); actual=assets.get(fid)
                valid=isinstance(actual,bytes) and isinstance(expected,str) and bool(re.fullmatch(r"[0-9a-f]{64}",expected)) and hashlib.sha256(actual).hexdigest()==expected
                if fig["mandatory"] and not valid:raise MissingFigureError("mandatory figure bytes/digest unverified: "+fid)
                claims["figure_claims"].append({"source_field":field,"index":i,"asset_id":fid,"status":"BYTE_MATCH_SYNTHETIC" if valid else "HOLD_UNVERIFIED"})
        return self.finish(source,record,identity,claims)
