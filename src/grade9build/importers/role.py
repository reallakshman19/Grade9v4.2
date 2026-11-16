"""Role bindings validated against the pinned A57 native map, never a second allowlist."""
import json
from pathlib import Path
from .base import BaseImporter, ImporterError
ROOT=Path(__file__).resolve().parents[3]
class CoreRoleImporter(BaseImporter):
    def import_role_configuration(self, *, blueprint_map_path=None, **source_args):
        source,record,identity=self.prepare(**source_args)
        raw=record.payload
        if not isinstance(raw,dict):raise ImporterError("role configuration must be object")
        mapping=json.loads(Path(blueprint_map_path or ROOT/"docs/architecture/native-blueprint-map.json").read_text())
        rows=[b for b in mapping["blueprints"] if b["target_role"]==raw.get("role_id") and b["blueprint_id"]==raw.get("blueprint_id") and b["layout_mode"]==raw.get("layout_mode")]
        if len(rows)!=1:raise ImporterError("unregistered role/blueprint/layout combination")
        slots=raw.get("slot_bindings"); native_slots=rows[0]["native_slots"]
        if not isinstance(slots,dict) or not set(slots)<= {x["id"] for x in native_slots} or not {x["id"] for x in native_slots if x["required"]}<=set(slots):raise ImporterError("missing or unknown native slot")
        # No source-question authority is inferred from these bindings; actual semantic validation is HOLD.
        return self.finish(source,record,identity,{"status":"HOLD","role":raw["role_id"],"blueprint_id":raw["blueprint_id"],"layout_mode":raw["layout_mode"],"authority":"UNRESOLVED_PENDING_REVIEW"})
