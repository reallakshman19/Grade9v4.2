"""Grade9v4.2 Object Graph and Dependency Validation Engine (Workpack A08).

Validates exact cryptographic references, typed edges, directed acyclic graph (DAG)
invariants, cross-subject isolation rules, hash protocols, and self-approval prohibitions.
"""

import hashlib
import json
from typing import Dict, List, Any, Tuple, Set, Optional

class GraphValidationError(ValueError):
    """Raised when object graph dependencies, cycles, or edge rules are violated."""
    pass

def object_key(obj: Dict[str, Any]) -> Tuple[str, str, int]:
    """Extract canonical (type, id, revision) identity key."""
    return (str(obj.get("type")), str(obj.get("id")), int(obj.get("revision", 1)))

def canonical_bytes(obj: Any) -> bytes:
    """Return deterministic canonical UTF-8 bytes for JSON structure."""
    return json.dumps(obj, sort_keys=True, separators=(",", ":"), ensure_ascii=True).encode("utf-8")

def compute_object_digest(obj: Dict[str, Any]) -> str:
    """Compute SHA-256 digest of object canonical representation."""
    return hashlib.sha256(canonical_bytes(obj)).hexdigest()

class ObjectGraphValidator:
    """Validates structural, cryptographic, and dependency rules across platform object graphs."""

    ALLOWED_STATUSES = {"SYNTHETIC", "CANDIDATE", "HOLD", "ACTIVE", "WITHDRAWN"}

    TYPED_EDGE_RULES = {
        "ASSESSMENT": {"QUESTION"},
        "LESSON": {"CONSTRUCTION", "CONCEPT"},
        "FRESH_TASK": {"CONSTRUCTION", "CONCEPT"},
        "SOLUTION": {"QUESTION", "FRESH_TASK"},
        "QRT": {"QUESTION", "OCCURRENCE"}
    }

    def __init__(self, demo_mode: bool = False):
        self.demo_mode = demo_mode
        self.index: Dict[Tuple[str, str, int], Dict[str, Any]] = {}
        self.edges: Dict[Tuple[str, str, int], List[Tuple[str, str, int]]] = {}

    def add_object(self, obj: Dict[str, Any]) -> None:
        """Register object into graph index."""
        k = object_key(obj)
        if k in self.index:
            raise GraphValidationError(f"duplicate object {k}")

        status = obj.get("status")
        if status not in self.ALLOWED_STATUSES:
            raise GraphValidationError(f"invalid status '{status}' on object {k}")

        if self.demo_mode and status != "SYNTHETIC":
            raise GraphValidationError(f"non-synthetic in demo graph: {k} has status {status}")

        self.index[k] = obj
        self.edges[k] = []

    def validate_graph(self, objects: Optional[List[Dict[str, Any]]] = None) -> int:
        """Execute full validation on registered objects (or a provided list)."""
        if objects is not None:
            self.index.clear()
            self.edges.clear()
            for obj in objects:
                self.add_object(obj)

        # 1. Referential integrity: check all dependency and lineage references exist
        for k, obj in self.index.items():
            refs = obj.get("dependencies", []) + obj.get("source_lineage_refs", [])
            for ref in refs:
                ref_k = object_key(ref)
                if ref_k not in self.index:
                    raise GraphValidationError(f"missing ref {ref_k} required by {k}")
                self.edges[k].append(ref_k)

        # 2. Cycle detection via Depth-First Search (DAG guarantee)
        visiting: Set[Tuple[str, str, int]] = set()
        done: Set[Tuple[str, str, int]] = set()

        def dfs(node: Tuple[str, str, int]) -> None:
            if node in visiting:
                raise GraphValidationError(f"cycle detected at node {node}")
            if node in done:
                return
            visiting.add(node)
            for neighbor in self.edges.get(node, []):
                dfs(neighbor)
            visiting.remove(node)
            done.add(node)

        for node in self.edges:
            dfs(node)

        # 3. Digest verification, self-approval, typed edge rules, and relationship endpoints
        for k, obj in self.index.items():
            refs = obj.get("dependencies", []) + obj.get("source_lineage_refs", [])
            obj_type = k[0]
            obj_subject = obj.get("subject_id")

            # Self-approval prohibition
            if obj_type == "APPROVAL":
                for ref in refs:
                    ref_k = object_key(ref)
                    if ref_k == k:
                        raise GraphValidationError(f"self-approved object rejected: {k}")

            for ref in refs:
                ref_k = object_key(ref)
                target_obj = self.index[ref_k]
                computed_digest = compute_object_digest(target_obj)
                expected_digest = ref.get("sha256")
                if computed_digest != expected_digest:
                    raise GraphValidationError(
                        f"stale digest {ref_k}: expected {expected_digest}, computed {computed_digest}"
                    )

                # Cross-subject isolation rule
                ref_subject = target_obj.get("subject_id")
                if (obj_subject is not None and ref_subject is not None and
                    obj_subject != ref_subject and obj_type != "RELATIONSHIP"):
                    raise GraphValidationError(
                        f"cross-subject violation: {k} ({obj_subject}) cannot directly depend on {ref_k} ({ref_subject})"
                    )

            # Typed edge constraints
            if obj_type in self.TYPED_EDGE_RULES:
                allowed_target_types = self.TYPED_EDGE_RULES[obj_type]
                dep_types = {ref["type"] for ref in obj.get("dependencies", [])}
                if not dep_types.intersection(allowed_target_types):
                    raise GraphValidationError(
                        f"typed edge violation on {k}: must depend on one of {allowed_target_types}, found {dep_types}"
                    )

            # Relationship endpoint consistency
            if obj_type == "RELATIONSHIP":
                payload = obj.get("payload", {})
                from_ref = payload.get("from")
                to_ref = payload.get("to")
                if not from_ref or not to_ref:
                    raise GraphValidationError(f"relationship {k} missing from/to payload")

                deps = obj.get("dependencies", [])
                if from_ref not in deps or to_ref not in deps:
                    raise GraphValidationError(f"relationship endpoint not dependency on {k}")

        return len(self.index)
