"""Resource registry and eligibility projection compiler for synthetic demo builds."""
from __future__ import annotations

import copy
import hashlib
import json
import re
from pathlib import Path
from typing import Any, Dict, Iterable, List, Optional, Set

import jsonschema

from .record_inventory import canonical_json_digest

ROOT = Path(__file__).resolve().parents[2]
DEFAULT_RESOURCE_SCHEMA_PATH = ROOT / "contracts" / "resources" / "resource-projection.schema.json"

RESTRICTED_SOURCE_PATTERNS = [
    re.compile(r"(?:^|/)(?:custody|restricted|private|\.git|secrets|credentials|keys)(?:/|$)"),
]

SHA256_RE = re.compile(r"^[0-9a-f]{64}$")
COMMIT_RE = re.compile(r"^[0-9a-f]{40}$")


class ResourceRegistryError(Exception):
    """Base exception for resource registry and compilation operations."""
    pass


class ResourceEligibilityError(ResourceRegistryError):
    """Raised when a resource violates governance, audience, or target eligibility gates."""
    pass


class StaleReferenceError(ResourceRegistryError):
    """Raised when a resource contains missing, unresolved, or stale references."""
    pass


class RouteResolutionError(ResourceRegistryError):
    """Raised when a route or alias cannot be resolved."""
    pass


def load_resource_schema(schema_path: Optional[Path] = None) -> Dict[str, Any]:
    """Loads the canonical resource projection schema."""
    path = schema_path or DEFAULT_RESOURCE_SCHEMA_PATH
    if not path.is_file():
        raise ResourceRegistryError(f"Resource schema not found at: {path}")
    return json.loads(path.read_text(encoding="utf-8"))


def is_learner_routable(resource: Dict[str, Any]) -> bool:
    """Evaluates whether a resource satisfies full declared eligibility for learner routing."""
    if resource.get("audience") != "LEARNER":
        return False
    if resource.get("kind") in ("OWNER_TOOL", "RUNTIME_HOST"):
        return False
    gov = resource.get("governance", {})
    if gov.get("rights") != "CLEARED":
        return False
    if gov.get("academic") != "ADMITTED":
        return False
    if gov.get("technical") != "PASS":
        return False
    if gov.get("release") != "ELIGIBLE":
        return False
    if not gov.get("receipt_refs"):
        return False
    if resource.get("integration") == "PRESERVED":
        return False
    return True


class ResourceRegistry:
    """In-memory registry of validated resource projections supporting runtime resolution."""

    def __init__(self, schema_path: Optional[Path] = None) -> None:
        self.schema = load_resource_schema(schema_path)
        self.validator = jsonschema.Draft202012Validator(self.schema)
        self._resources: Dict[str, Dict[str, Any]] = {}
        self._routes: Dict[str, str] = {}
        self._role_index: Dict[str, Set[str]] = {
            "CORE1": set(),
            "CORE1A": set(),
            "CORE1B": set(),
            "CORE2": set(),
            "CORE2A": set(),
            "CORE2B": set(),
            "EXPLORER": set(),
        }

    def register(self, resource: Dict[str, Any]) -> None:
        """Validates and registers a resource projection."""
        self.validator.validate(resource)

        res_id = resource["resource_id"]
        if res_id in self._resources:
            raise ResourceRegistryError(f"Duplicate resource registration: '{res_id}'")

        # Canonical route
        canonical_route = f"/resources/{res_id}"
        if canonical_route in self._routes:
            raise ResourceRegistryError(f"Route collision on canonical route '{canonical_route}'")
        self._routes[canonical_route] = res_id

        # Entrypoint route if defined
        entrypoint = resource.get("entrypoint")
        if entrypoint:
            entry_route = f"/{entrypoint.lstrip('/')}"
            if entry_route in self._routes and self._routes[entry_route] != res_id:
                raise ResourceRegistryError(f"Route collision on entrypoint route '{entry_route}'")
            self._routes[entry_route] = res_id

        # Aliases
        for alias in resource.get("aliases", []):
            alias_route = alias if alias.startswith("/") else f"/{alias}"
            if alias_route in self._routes and self._routes[alias_route] != res_id:
                raise ResourceRegistryError(f"Route collision on alias '{alias_route}'")
            self._routes[alias_route] = res_id

        # Roles
        for role in resource.get("core_roles", []):
            if role in self._role_index:
                self._role_index[role].add(res_id)

        self._resources[res_id] = copy.deepcopy(resource)

    def get(self, resource_id: str) -> Optional[Dict[str, Any]]:
        """Retrieves a resource by canonical ID, or None if not found."""
        res = self._resources.get(resource_id)
        return copy.deepcopy(res) if res is not None else None

    def resolve_resource(self, resource_id: str) -> Dict[str, Any]:
        """Resolves a resource by canonical ID, raising RouteResolutionError if not found."""
        res = self._resources.get(resource_id)
        if res is None:
            raise RouteResolutionError(f"Resource not found: '{resource_id}'")
        return copy.deepcopy(res)

    def resolve_route(self, route_or_alias: str) -> Dict[str, Any]:
        """Resolves a route or legacy alias to its canonical resource."""
        normalized = route_or_alias if route_or_alias.startswith("/") else f"/{route_or_alias}"
        res_id = self._routes.get(normalized)
        if not res_id:
            # Also try without leading slash for legacy paths
            res_id = self._routes.get(route_or_alias)
        if not res_id:
            raise RouteResolutionError(f"Route or alias not found: '{route_or_alias}'")
        return self.resolve_resource(res_id)

    def resolve(self, resource_id: str, revision: int = 1, release_id: Optional[str] = None) -> Dict[str, Any]:
        """TypeScript runtime contract method: resolve(id, revision, releaseId)."""
        res = self.resolve_resource(resource_id)
        if res.get("revision") != revision:
            raise RouteResolutionError(
                f"Resource revision mismatch for '{resource_id}': expected {revision}, got {res.get('revision')}"
            )
        return res

    def eligible_for_role(self, resource_id: str, role: str, stage: Optional[str] = None) -> bool:
        """TypeScript runtime contract method: eligibleForRole(id, role, stage)."""
        res = self._resources.get(resource_id)
        if not res:
            return False
        if not is_learner_routable(res):
            return False
        if role not in res.get("core_roles", []):
            return False
        return True

    def list_resources(self) -> List[Dict[str, Any]]:
        """Returns all registered resources sorted by canonical ID."""
        return [copy.deepcopy(self._resources[k]) for k in sorted(self._resources.keys())]

    def list_routes(self) -> Dict[str, str]:
        """Returns all registered routes and aliases mapped to resource IDs."""
        return {k: self._routes[k] for k in sorted(self._routes.keys())}

    def get_resources_for_role(self, role: str) -> List[Dict[str, Any]]:
        """Returns all resources associated with a given core role."""
        ids = self._role_index.get(role, set())
        return [copy.deepcopy(self._resources[k]) for k in sorted(ids)]


class ResourceProjectionCompiler:
    """Deterministic compiler generating eligible resource projections for demo targets."""

    def __init__(self, target_mode: str = "DEMO", schema_path: Optional[Path] = None) -> None:
        if target_mode != "DEMO":
            raise ResourceEligibilityError(
                f"Production release compilation is strictly prohibited (target_mode: {target_mode}). Only DEMO is permitted."
            )
        self.target_mode = target_mode
        self.schema = load_resource_schema(schema_path)
        self.validator = jsonschema.Draft202012Validator(self.schema)

    def compile(
        self,
        resources: List[Dict[str, Any]],
        release_closure: Optional[Dict[str, Any]] = None,
        known_capabilities: Optional[Set[str]] = None,
        known_topics: Optional[Set[str]] = None,
        release_id: str = "RELEASE-DEMO-01",
        strict_governance: bool = True,
    ) -> Dict[str, Any]:
        """Compiles eligible resources into a closed, deterministic projection package."""
        if not resources:
            raise ResourceRegistryError("Cannot compile an empty resource collection")

        registry = ResourceRegistry()
        eligible_resources: List[Dict[str, Any]] = []
        routes_map: Dict[str, str] = {}
        search_entries: List[Dict[str, Any]] = []
        role_facets: Dict[str, List[str]] = {
            "CORE1": [],
            "CORE1A": [],
            "CORE1B": [],
            "CORE2": [],
            "CORE2A": [],
            "CORE2B": [],
            "EXPLORER": [],
        }

        # Extract topics and capabilities from release closure if available
        available_topics = set(known_topics) if known_topics is not None else None
        available_caps = set(known_capabilities) if known_capabilities is not None else None
        closure_objects: Optional[Dict[str, Dict[str, Any]]] = None

        if release_closure is not None:
            if "projections" in release_closure and "search_index" in release_closure["projections"]:
                if available_topics is None:
                    available_topics = set()
                if available_caps is None:
                    available_caps = set()
                for item in release_closure["projections"].get("search_index", []):
                    if item.get("kind") == "CONCEPT":
                        available_topics.add(item.get("id"))
            if "total_objects" in release_closure:
                closure_objects = {}

        for res in sorted(resources, key=lambda x: str(x.get("resource_id", ""))):
            res_id = res.get("resource_id", "unknown")

            # 1. Schema validation
            try:
                self.validator.validate(res)
            except jsonschema.ValidationError as err:
                if "origins" in err.path:
                    raise StaleReferenceError(f"Resource '{res_id}' origin reference is invalid: {err.message}") from err
                raise ResourceEligibilityError(f"Resource '{res_id}' fails schema: {err.message}") from err

            # 2. Reject HOLD governance in rights, academic, release (N08)
            gov = res.get("governance", {})
            if strict_governance:
                if gov.get("rights") == "HOLD":
                    raise ResourceEligibilityError(
                        f"Cannot compile: resource '{res_id}' governance rights are HOLD"
                    )
                if gov.get("academic") == "HOLD":
                    raise ResourceEligibilityError(
                        f"Cannot compile: resource '{res_id}' academic admission is HOLD"
                    )
                if gov.get("release") == "HOLD":
                    raise ResourceEligibilityError(
                        f"Cannot compile: resource '{res_id}' release status is HOLD"
                    )
                if gov.get("technical") in ("UNTESTED", "FAIL"):
                    raise ResourceEligibilityError(
                        f"Cannot compile: resource '{res_id}' technical status is {gov.get('technical')}"
                    )
                if not gov.get("receipt_refs"):
                    raise ResourceEligibilityError(
                        f"Cannot compile: resource '{res_id}' has no verified receipt references"
                    )

            # 3. Reject Owner/Internal audience and internal kinds
            audience = res.get("audience")
            kind = res.get("kind")
            if audience in ("OWNER", "LAB", "INTERNAL"):
                raise ResourceEligibilityError(
                    f"Cannot compile: resource '{res_id}' has non-learner audience '{audience}'"
                )
            if kind in ("OWNER_TOOL", "RUNTIME_HOST"):
                raise ResourceEligibilityError(
                    f"Cannot compile: resource '{res_id}' has internal kind '{kind}'"
                )

            # 4. Enforce synthetic target integration and entrypoint rules
            # "No raw app or restricted source in synthetic target"
            integration = res.get("integration")
            if integration == "PRESERVED":
                raise ResourceEligibilityError(
                    f"Cannot compile: resource '{res_id}' integration mode PRESERVED cannot be mounted in learner synthetic target"
                )

            entrypoint = res.get("entrypoint")
            if entrypoint:
                for pattern in RESTRICTED_SOURCE_PATTERNS:
                    if pattern.search(entrypoint):
                        raise ResourceEligibilityError(
                            f"Cannot compile: resource '{res_id}' references restricted path '{entrypoint}'"
                        )
                if ".." in entrypoint or entrypoint.startswith("/"):
                    raise ResourceEligibilityError(
                        f"Cannot compile: resource '{res_id}' has unsafe entrypoint traversal '{entrypoint}'"
                    )

            # 5. Referential integrity and stale references check
            if available_topics is not None:
                for topic in res.get("topic_refs", []):
                    if topic not in available_topics:
                        raise StaleReferenceError(
                            f"Cannot compile: resource '{res_id}' references unknown or stale topic '{topic}'"
                        )

            if available_caps is not None:
                for cap in res.get("capability_refs", []):
                    if cap not in available_caps:
                        raise StaleReferenceError(
                            f"Cannot compile: resource '{res_id}' references unknown or stale capability '{cap}'"
                        )

            for origin in res.get("origins", []):
                commit = origin.get("commit", "")
                sha256 = origin.get("sha256", "")
                path = origin.get("path", "")
                if not COMMIT_RE.match(commit):
                    raise StaleReferenceError(
                        f"Cannot compile: resource '{res_id}' origin commit '{commit}' is invalid"
                    )
                if not SHA256_RE.match(sha256):
                    raise StaleReferenceError(
                        f"Cannot compile: resource '{res_id}' origin sha256 '{sha256}' is invalid"
                    )
                for pattern in RESTRICTED_SOURCE_PATTERNS:
                    if pattern.search(path):
                        raise ResourceEligibilityError(
                            f"Cannot compile: resource '{res_id}' origin path '{path}' references restricted source"
                        )

            # Register in registry to ensure route and alias integrity
            registry.register(res)
            eligible_resources.append(copy.deepcopy(res))

            # Route mapping
            canonical_route = f"/resources/{res_id}"
            routes_map[canonical_route] = res_id
            if entrypoint:
                routes_map[f"/{entrypoint.lstrip('/')}"] = res_id
            for alias in res.get("aliases", []):
                alias_route = alias if alias.startswith("/") else f"/{alias}"
                routes_map[alias_route] = res_id

            # Role facets
            for role in res.get("core_roles", []):
                if role in role_facets:
                    role_facets[role].append(res_id)

            # 6. Public-safe search metadata (NO answers, solutions, rubrics, or internal notes)
            if res.get("search_visibility") == "LEARNER":
                search_entry = {
                    "id": res_id,
                    "revision": res.get("revision", 1),
                    "releaseId": release_id,
                    "route": canonical_route,
                    "aliases": copy.deepcopy(res.get("aliases", [])),
                    "kind": kind,
                    "title": res.get("title", ""),
                    "summary": f"Interactive curricular resource: {res.get('title', '')}",
                    "subject_id": res.get("subject_id", ""),
                    "topic_refs": copy.deepcopy(res.get("topic_refs", [])),
                    "capability_refs": copy.deepcopy(res.get("capability_refs", [])),
                    "core_roles": copy.deepcopy(res.get("core_roles", [])),
                    "public_facets": {
                        "subject": res.get("subject_id", ""),
                        "kind": kind,
                        "roles": copy.deepcopy(res.get("core_roles", [])),
                        "demo": True,
                    },
                }
                search_entries.append(search_entry)

        # 7. Assemble deterministic projection
        projection = {
            "schema_version": "g9-resource-registry-projection/1.0",
            "target_mode": "DEMO",
            "release_id": release_id,
            "demo_banner": True,
            "academic_admission": "HOLD",
            "production_release": "NONE",
            "compiled_at": "2026-11-17T00:00:00Z",
            "total_resources": len(eligible_resources),
            "resources": eligible_resources,
            "routes": {k: routes_map[k] for k in sorted(routes_map.keys())},
            "search_index": sorted(search_entries, key=lambda x: str(x.get("id", ""))),
            "role_facets": {k: sorted(role_facets[k]) for k in sorted(role_facets.keys())},
        }

        # Deterministic digest computation
        projection_digest = canonical_json_digest(projection)
        projection["registry_digest"] = projection_digest

        return projection


def compile_resource_projection(
    resources: List[Dict[str, Any]],
    target_mode: str = "DEMO",
    release_closure: Optional[Dict[str, Any]] = None,
    known_capabilities: Optional[Set[str]] = None,
    known_topics: Optional[Set[str]] = None,
    release_id: str = "RELEASE-DEMO-01",
    strict_governance: bool = True,
) -> Dict[str, Any]:
    """Convenience helper for compiling resource projections."""
    compiler = ResourceProjectionCompiler(target_mode=target_mode)
    return compiler.compile(
        resources=resources,
        release_closure=release_closure,
        known_capabilities=known_capabilities,
        known_topics=known_topics,
        release_id=release_id,
        strict_governance=strict_governance,
    )
