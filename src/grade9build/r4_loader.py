"""A39 / A71: Authenticated External R4 Execution Kit Discovery Loader.

The external R4 Execution Kit (Grade9v4.2_Execution_Kit_R4) resides outside the
target repository and maintains a separate custody authority. Its artifacts are
authenticated against the pinned manifest digest (6f92aac8...) and never
conflated with Git-tree source objects.
"""
from __future__ import annotations

import hashlib
import json
import os
from pathlib import Path
from typing import Any, Dict, List, Optional

EXPECTED_KIT_MANIFEST_SHA256 = (
    "6f92aac8eb1ca42e46d243443b230e2bb83dae5e99beeee872da6da47b04e3fc"
)
EXPECTED_OBSERVED_INVENTORY_SHA256 = (
    "5eb61fbea1c1c1bd93fc98009c054530614e29e6c3008e8929e52aacf6a62195"
)
OBSERVED_INVENTORY_REL_PATH = "04-migration/v35-observed-inventory.json"


class ExternalR4LoaderError(ValueError):
    """Raised when external R4 kit verification, manifest, or checksum checks fail."""
    pass


class ExternalR4DiscoveryLoader:
    """Authenticates external R4 execution kit and extracts verified discovery records."""

    def __init__(self, kit_root: Optional[Path] = None):
        root = kit_root or os.environ.get("G9_R4_KIT")
        if not root:
            raise ExternalR4LoaderError("G9_R4_KIT_LOCATION_REQUIRED")
        self.kit_root = Path(root).resolve(strict=True)
        if not self.kit_root.is_dir():
            raise ExternalR4LoaderError("G9_R4_KIT_DIR_MISSING")
        self.manifest = self._verify_manifest()

    def _verify_manifest(self) -> Dict[str, str]:
        manifest_path = self.kit_root / "MANIFEST.sha256.json"
        if not manifest_path.is_file():
            raise ExternalR4LoaderError("R4_MANIFEST_FILE_MISSING")
        raw = manifest_path.read_bytes()
        digest = hashlib.sha256(raw).hexdigest()
        if digest != EXPECTED_KIT_MANIFEST_SHA256:
            raise ExternalR4LoaderError(f"R4_MANIFEST_DIGEST_MISMATCH: {digest}")
        data = json.loads(raw.decode("utf-8"))
        if not isinstance(data, dict):
            raise ExternalR4LoaderError("R4_MANIFEST_NOT_OBJECT")
        files = data.get("files")
        if not isinstance(files, dict) or len(files) != 147:
            raise ExternalR4LoaderError(f"R4_MANIFEST_FILES_COUNT_INVALID: {len(files) if isinstance(files, dict) else 'none'}")
        return files

    def load_discovered_inventory(self) -> Dict[str, Any]:
        """Loads and verifies 04-migration/v35-observed-inventory.json from the external kit."""
        target = self.kit_root / OBSERVED_INVENTORY_REL_PATH
        if not target.is_file():
            raise ExternalR4LoaderError("R4_OBSERVED_INVENTORY_FILE_MISSING")
        raw = target.read_bytes()
        digest = hashlib.sha256(raw).hexdigest()
        if digest != EXPECTED_OBSERVED_INVENTORY_SHA256:
            raise ExternalR4LoaderError(f"R4_OBSERVED_INVENTORY_DIGEST_MISMATCH: {digest}")
        if self.manifest.get(OBSERVED_INVENTORY_REL_PATH) != digest:
            raise ExternalR4LoaderError("R4_MANIFEST_INVENTORY_DIGEST_MISMATCH")
        data = json.loads(raw.decode("utf-8"))
        return data

    def extract_discovered_resource_occurrences(self) -> List[Dict[str, Any]]:
        """Extracts the 71 cataloged discovered resource occurrences with external R4 provenance."""
        data = self.load_discovered_inventory()
        occurrences: List[Dict[str, Any]] = []

        # 1. 38 Standalone HTML apps
        standalone_items = data.get("standalone_html", [])
        for item in standalone_items:
            path = item.get("path")
            occurrences.append({
                "source_path": path,
                "kind": "STANDALONE_HTML",
                "population": "r4_discovered",
                "origin": "EXTERNAL_R4_KIT",
                "manifest_sha256": EXPECTED_KIT_MANIFEST_SHA256,
                "git_blob": item.get("git_blob"),
                "size": item.get("size"),
                "audit_status": item.get("audit_status", "NOT_BROWSER_AUDITED"),
                "entrypoint": f"/{path}" if path else None,
                "disposition": "CANDIDATE_HOLD",
            })

        # 2. 22 Root library packages
        root_packages = data.get("root_library_packages", [])
        for pkg in root_packages:
            pkg_path = pkg if isinstance(pkg, str) else pkg.get("path")
            pkg_id = Path(pkg_path).stem if pkg_path else None
            occurrences.append({
                "source_path": pkg_path,
                "kind": "ROOT_LIBRARY_PACKAGE",
                "population": "r4_discovered",
                "origin": "EXTERNAL_R4_KIT",
                "manifest_sha256": EXPECTED_KIT_MANIFEST_SHA256,
                "package_id": pkg_id,
                "entrypoint": pkg_path,
                "disposition": "CANDIDATE_HOLD",
            })

        # 3. 11 Registered opaque explorer entrypoints
        explorers = data.get("registered_opaque_explorer_entrypoints", [])
        for exp in explorers:
            entrypoint = exp if isinstance(exp, str) else exp.get("entrypoint")
            exp_id = Path(entrypoint).parent.name if entrypoint else None
            occurrences.append({
                "source_path": entrypoint,
                "kind": "OPAQUE_EXPLORER_ENTRYPOINT",
                "population": "r4_discovered",
                "origin": "EXTERNAL_R4_KIT",
                "manifest_sha256": EXPECTED_KIT_MANIFEST_SHA256,
                "explorer_id": exp_id,
                "entrypoint": entrypoint,
                "disposition": "CANDIDATE_HOLD",
            })

        if len(occurrences) != 71:
            raise ExternalR4LoaderError(
                f"DISCOVERED_OCCURRENCES_COUNT_MISMATCH: expected 71, got {len(occurrences)}"
            )

        return occurrences
