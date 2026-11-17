"""A62 diagnostic resource registry; no learner publication authority."""
from __future__ import annotations

import copy
import hashlib
import json
import re
from pathlib import Path
from jsonschema import Draft202012Validator, ValidationError
from .graph import compute_object_digest
from .compile import ReleaseProjectionCompiler, ReleaseCompilationError

ROOT = Path(__file__).resolve().parents[2]
DEFAULT_RESOURCE_SCHEMA_PATH = ROOT / 'contracts/resources/resource-projection.schema.json'
ROLES = ('CORE1','CORE1A','CORE1B','CORE2','CORE2A','CORE2B','EXPLORER')
FORBIDDEN = frozenset({'custody','restricted','private','.git','secrets','credentials','keys','internal','owner','lab','node_modules'})
SCHEMA_SHA = 'dc8ea324c3b7d8c88de37cb0b7094aa69dda1f04'

class ResourceRegistryError(ValueError): pass
class ResourceEligibilityError(ResourceRegistryError): pass
class StaleReferenceError(ResourceRegistryError): pass
class RouteResolutionError(ResourceRegistryError): pass


def load_resource_schema(schema_path=None):
    try:
        raw = Path(schema_path or DEFAULT_RESOURCE_SCHEMA_PATH).read_bytes()
        if hashlib.sha1(b'blob '+str(len(raw)).encode()+b'\0'+raw).hexdigest() != SCHEMA_SHA:
            raise ResourceRegistryError('RESOURCE_SCHEMA_PIN_MISMATCH')
        return json.loads(raw)
    except (OSError, ValueError) as exc:
        raise ResourceRegistryError('RESOURCE_SCHEMA_UNAVAILABLE_OR_UNPINNED') from None


def _release_id(value):
    if type(value) is not str or not re.fullmatch(r'RELEASE-[A-Z0-9-]{1,48}', value):
        raise ResourceEligibilityError('INVALID_RELEASE_ID')
    return value


def _path(value, *, alias=False):
    # No decoding or normalization of ambiguous paths. Legacy aliases can be
    # bare IDs in known namespaces, not arbitrary URL schemes or commands.
    if type(value) is not str or not value or len(value)>512:
        raise ResourceRegistryError('UNSAFE_PATH')
    if alias and value.startswith('/'):
        value=value[1:]
    if not re.fullmatch(r'[A-Za-z0-9_.:/-]+',value):
        raise ResourceRegistryError('UNSAFE_PATH')
    parts=value.split('/')
    if any(p in ('','.','..') or p.casefold() in FORBIDDEN for p in parts):
        raise ResourceRegistryError('UNSAFE_PATH')
    if ':' in value and (not alias or len(parts)!=1 or not re.fullmatch(r'(?:act|res|demo):[A-Za-z0-9_.:-]+',value)):
        raise ResourceRegistryError('UNSAFE_PATH')
    return value


def _validate(resource, validator):
    try:
        validator.validate(resource)
        compute_object_digest(resource)
    except (ValidationError, TypeError, ValueError, RecursionError):
        raise ResourceEligibilityError('INVALID_RESOURCE_SCHEMA') from None
    if type(resource['revision']) is not int:
        raise ResourceEligibilityError('INVALID_REVISION')
    for o in resource['origins']:
        _path(o['path'])
    if resource['entrypoint'] is not None:
        _path(resource['entrypoint'])
    for a in resource['aliases']:
        _path(a,alias=True)
    return resource


def _verify_origins(resource, origin_bytes):
    # Caller supplies bytes from a controlled source checkout. Digest equality
    # is content integrity, not authentication of the claimed source commit.
    if type(origin_bytes) is not dict:
        raise StaleReferenceError('ORIGIN_BYTES_REQUIRED')
    seen=set()
    for o in resource['origins']:
        key=(o['snapshot_id'],o['commit'],o['path'])
        if key in seen:
            raise StaleReferenceError('DUPLICATE_ORIGIN')
        seen.add(key)
        raw=origin_bytes.get(key)
        if type(raw) is not bytes or hashlib.sha256(raw).hexdigest()!=o['sha256']:
            raise StaleReferenceError('ORIGIN_BYTES_MISSING_OR_STALE')


def _declared_eligible(resource):
    g=resource['governance']
    return (resource['audience']=='LEARNER' and resource['kind'] not in ('OWNER_TOOL','RUNTIME_HOST')
            and resource['integration']!='PRESERVED' and g['rights']=='CLEARED'
            and g['academic']=='ADMITTED' and g['technical']=='PASS' and g['release']=='ELIGIBLE'
            and bool(g['receipt_refs']))


def is_learner_routable(resource):
    """No independent receipt/route verifier exists in the diagnostic target."""
    return False


class ResourceRegistry:
    """Operator-only in-memory registry. No raw bytes, launch or public routes."""
    def __init__(self, schema_path=None, *, release_id='RELEASE-DEMO-01'):
        self.release_id=_release_id(release_id)
        self.validator=Draft202012Validator(load_resource_schema(schema_path))
        self._resources={}
        self._routes={}

    def register(self, resource, *, origin_bytes=None):
        resource=copy.deepcopy(resource)
        _validate(resource,self.validator)
        _verify_origins(resource,origin_bytes)
        rid=resource['resource_id']
        if rid in self._resources:
            raise ResourceRegistryError('DUPLICATE_RESOURCE_ID')
        routes={'/resources/'+rid}
        if resource['entrypoint'] is not None:
            routes.add('/'+_path(resource['entrypoint']))
        routes.update('/'+_path(a,alias=True) for a in resource['aliases'])
        if any(r in self._routes for r in routes):
            raise ResourceRegistryError('ROUTE_COLLISION')
        # All validation precedes mutation; failed registrations leave no routes.
        self._resources[rid]=resource
        self._routes.update({r:rid for r in routes})

    def get(self, resource_id):
        return copy.deepcopy(self._resources.get(resource_id))

    def resolve_resource(self, resource_id):
        r=self.get(resource_id)
        if r is None: raise RouteResolutionError('UNKNOWN_RESOURCE')
        return r

    def resolve(self, resource_id, revision=None, release_id=None, sha256=None):
        r=self.resolve_resource(resource_id)
        if (type(revision) is not int or revision!=r['revision'] or release_id!=self.release_id
                or sha256!=compute_object_digest(r)):
            raise StaleReferenceError('EXACT_RESOURCE_IDENTITY_REQUIRED')
        return r

    def resolve_route(self, route_or_alias, *, revision=None, release_id=None, sha256=None):
        # Canonical resource routes contain a resource namespace in segment 2.
        if type(route_or_alias) is str and re.fullmatch(r'/resources/[a-z0-9][a-z0-9_.:-]+',route_or_alias):
            route=route_or_alias
        else:
            route='/'+_path(route_or_alias,alias=True)
        rid=self._routes.get(route)
        if rid is None: raise RouteResolutionError('UNKNOWN_ROUTE')
        return self.resolve(rid,revision,release_id,sha256)

    def eligible_for_role(self, resource_id, role, stage=None, *, revision=None, release_id=None, sha256=None):
        # Role membership is not reviewed stage disclosure or launch authority.
        return False

    def list_resources(self):
        return [self.get(k) for k in sorted(self._resources)]

    def list_routes(self):
        return dict(sorted(self._routes.items()))  # operator alias inventory only

    def get_resources_for_role(self, role):
        return [r for r in self.list_resources() if role in r['core_roles']]


def _verify_closure(closure, release_id):
    """Rebuild the exact A14 public diagnostic, not just its self-claimed hash."""
    if type(closure) is not dict or closure.get('release_id')!=release_id:
        raise StaleReferenceError('EXACT_A14_CLOSURE_REQUIRED')
    fixture={'R4-GRAPH':'graph.json','R4-WPE-SPRING':'wpe-vertical-slice.json'}.get(closure.get('fixture_id')) if type(closure.get('fixture_id')) is str else None
    if fixture is None:
        raise StaleReferenceError('UNPINNED_A14_CLOSURE')
    try:
        graph=json.loads((ROOT/'fixtures/synthetic'/fixture).read_text(encoding='utf-8'))
        if isinstance(graph,dict): graph=graph['objects']
        expected=ReleaseProjectionCompiler().compile_release(graph,release_id=release_id)
        # Canonical digest compares types as well as values (bool vs integer).
        if compute_object_digest(closure)!=compute_object_digest(expected):
            raise StaleReferenceError('STALE_OR_FORGED_A14_CLOSURE')
    except (OSError, KeyError, TypeError, ReleaseCompilationError, ValueError, RecursionError):
        raise StaleReferenceError('STALE_OR_FORGED_A14_CLOSURE') from None
    return expected['release_digest']


class ResourceProjectionCompiler:
    """A14 has zero registered eligible routes; public A62 is therefore empty.

    Nonempty candidate sets fail closed. No caller-supplied set of receipt names,
    known topics or capabilities is a trusted release/approval verifier.
    """
    def __init__(self,target_mode='DEMO',schema_path=None):
        if target_mode!='DEMO': raise ResourceEligibilityError('PRODUCTION_TARGET_PROHIBITED')
        self.validator=Draft202012Validator(load_resource_schema(schema_path))

    def compile(self,resources,release_closure=None,known_capabilities=None,known_topics=None,
                release_id='RELEASE-DEMO-01',strict_governance=True,*,origin_bytes=None):
        release_id=_release_id(release_id)
        if strict_governance is not True: raise ResourceEligibilityError('GOVERNANCE_BYPASS_PROHIBITED')
        closure_digest=_verify_closure(release_closure,release_id)
        if type(resources) is not list: raise ResourceEligibilityError('INVALID_RESOURCE_COLLECTION')
        for r in resources:
            _validate(r,self.validator)
            if not _declared_eligible(r): raise ResourceEligibilityError('DECLARED_GOVERNANCE_OR_AUDIENCE_HOLD')
            _verify_origins(r,origin_bytes)
            # A14 exposes no authorized resource/capability/route closure.
            # Never allow caller sets or a syntactically valid receipt to supply it.
            raise ResourceEligibilityError('NO_VERIFIED_RESOURCE_RELEASE_AUTHORITY')
        projection={'schema_version':'g9-resource-registry-projection/1.1','target_mode':'DEMO',
                    'release_id':release_id,'a14_release_digest':closure_digest,'demo_banner':True,
                    'artifact_scope':'PUBLIC_SAFE_DIAGNOSTIC_ONLY','academic_admission':'HOLD',
                    'production_release':'NONE','ui_freeze':'NOT_GRANTED','learner_release':False,
                    'total_resources':0,'resources':[],'routes':{},'search_index':[],
                    'role_facets':{r:[] for r in ROLES},'status':'NO_VERIFIED_RESOURCE_RELEASE_AUTHORITY'}
        return {**projection,'registry_digest':compute_object_digest(projection)}


def compile_resource_projection(resources,target_mode='DEMO',**kwargs):
    return ResourceProjectionCompiler(target_mode).compile(resources,**kwargs)
