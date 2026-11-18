"""A62 operator registry and fail-closed public projection regressions."""
import copy
import hashlib
import json
import sys
from pathlib import Path
import pytest

ROOT=Path(__file__).resolve().parents[2]
sys.path.insert(0,str(ROOT/'src'))
from grade9build.graph import compute_object_digest
from grade9build.compile import ReleaseProjectionCompiler
from grade9build.resource_registry import (
    ResourceRegistry, ResourceProjectionCompiler, ResourceRegistryError,
    ResourceEligibilityError, StaleReferenceError, RouteResolutionError,
    compile_resource_projection, is_learner_routable, ROLES, load_resource_schema)

RELEASE='RELEASE-DEMO-01'
RAW=b'Synthetic operator-only test asset; not reviewed or deployable.'


def candidate(rid='res:test:one'):
    return {'schema_version':'g9-resource-projection/1','resource_id':rid,'revision':1,
            'kind':'OPAQUE_APP','audience':'LEARNER','title':'Operator fixture',
            'aliases':['legacy/demo.html','act:demo'],'subject_id':'PHYSICS',
            'topic_refs':['demo-topic'],'capability_refs':['demo-cap'],'core_roles':['EXPLORER','CORE1A'],
            'origins':[{'snapshot_id':'synthetic-test','commit':'a'*40,'path':'standalone/demo.html',
                        'sha256':hashlib.sha256(RAW).hexdigest()}],
            'entrypoint':'apps/demo/index.html','integration':'ISOLATED_HOST','capabilities':['demo.slider'],
            'governance':{'rights':'HOLD','academic':'HOLD','technical':'UNTESTED','release':'HOLD','receipt_refs':[]},
            'search_visibility':'EXCLUDED'}


def forged():
    r=candidate(); r['governance']={'rights':'CLEARED','academic':'ADMITTED','technical':'PASS','release':'ELIGIBLE','receipt_refs':['invented-receipt']};r['search_visibility']='LEARNER';return r


def origins(r):
    return {(o['snapshot_id'],o['commit'],o['path']):RAW for o in r['origins']}


def identity(r):
    return {'revision':r['revision'],'release_id':RELEASE,'sha256':compute_object_digest(r)}


@pytest.fixture(params=['graph.json','wpe-vertical-slice.json'])
def closure(request):
    g=json.loads((ROOT/'fixtures/synthetic'/request.param).read_text())
    return ReleaseProjectionCompiler().compile_release(g if isinstance(g,list) else g['objects'])


def test_empty_projection_deterministic(closure):
    a=compile_resource_projection([],release_closure=closure)
    b=compile_resource_projection([],release_closure=copy.deepcopy(closure))
    assert a==b and a['a14_release_digest']==closure['release_digest']
    assert a['registry_digest']==compute_object_digest({k:v for k,v in a.items() if k!='registry_digest'})
    assert a['resources']==a['search_index']==[] and a['routes']=={}
    assert set(a['role_facets'])==set(ROLES) and all(not v for v in a['role_facets'].values())
    assert a['total_resources']==0 and a['learner_release'] is False and a['academic_admission']=='HOLD'
    assert a['production_release']=='NONE' and a['ui_freeze']=='NOT_GRANTED'


@pytest.mark.parametrize('mutate',[lambda x:x.update(release_id='RELEASE-OTHER'),lambda x:x.update(learner_release=True),
    lambda x:x.update(fixture_id='forged'),lambda x:x['projections']['search_index'].append({'id':'forged'}),
    lambda x:x.update(artifact_scope='PUBLIC_RELEASE'),lambda x:x.update(total_objects=99),
    lambda x:x['projections']['learner_precommit'][0].update(stem='PRIVATE-ANSWER'),
    lambda x:x.update(extra='private'),lambda x:x.update(demo_banner=1)])
def test_coherently_forged_closure_rejected(closure,mutate):
    c=copy.deepcopy(closure);mutate(c);c['release_digest']=compute_object_digest({k:v for k,v in c.items() if k!='release_digest'})
    with pytest.raises(StaleReferenceError): compile_resource_projection([],release_closure=c)


@pytest.mark.parametrize('closure',[None,{},[],{'release_id':RELEASE,'fixture_id':[]}])
def test_missing_closure(closure):
    with pytest.raises(StaleReferenceError):compile_resource_projection([],release_closure=closure)


@pytest.mark.parametrize('strict',[False,None,0,1,'true'])
def test_governance_bypass_rejected(closure,strict):
    with pytest.raises(ResourceEligibilityError,match='BYPASS'):compile_resource_projection([],release_closure=closure,strict_governance=strict)


@pytest.mark.parametrize('mode',['PRODUCTION','REVIEW','',None])
def test_production_rejected(mode):
    with pytest.raises(ResourceEligibilityError):ResourceProjectionCompiler(mode)


def test_hold_rejected(closure):
    r=candidate()
    with pytest.raises(ResourceEligibilityError,match='HOLD'):compile_resource_projection([r],release_closure=closure,origin_bytes=origins(r))


def test_receipt_strings_and_caller_sets_not_authority(closure):
    r=forged()
    assert not is_learner_routable(r)
    with pytest.raises(ResourceEligibilityError,match='NO_VERIFIED_RESOURCE_RELEASE_AUTHORITY'):
        compile_resource_projection([r],release_closure=closure,origin_bytes=origins(r),known_topics={'demo-topic'},known_capabilities={'demo-cap'})


@pytest.mark.parametrize('field,value',[('rights','HOLD'),('academic','HOLD'),('technical','FAIL'),('technical','UNTESTED'),('release','HOLD'),('receipt_refs',[])])
def test_each_governance_gate(closure,field,value):
    r=forged();r['search_visibility']='EXCLUDED';r['governance'][field]=value
    with pytest.raises(ResourceEligibilityError,match='HOLD'):compile_resource_projection([r],release_closure=closure,origin_bytes=origins(r))


@pytest.mark.parametrize('field,value',[('audience','OWNER'),('audience','LAB'),('audience','INTERNAL'),('kind','RUNTIME_HOST'),('integration','PRESERVED')])
def test_nonlearner_or_preserved_excluded(closure,field,value):
    r=forged();r['search_visibility']='EXCLUDED';r[field]=value
    with pytest.raises(ResourceEligibilityError,match='HOLD'):compile_resource_projection([r],release_closure=closure,origin_bytes=origins(r))


def test_origin_bytes_required(closure):
    r=forged()
    for b in (None,{}, {next(iter(origins(r))):b'wrong bytes'}, {next(iter(origins(r))):RAW.decode()}):
        with pytest.raises(StaleReferenceError):compile_resource_projection([r],release_closure=closure,origin_bytes=b)


@pytest.mark.parametrize('bad',['../x','x/../y','x//y','/x','x\\y','x/%2e%2e/y','https://x','x?y','x#y','x\n','x/PRIVATE/y','x/.git/y','x/credentials/y','x/owner/y','x/./y','x/','x/INTERNAL/y','x/\u2215y'])
@pytest.mark.parametrize('field',['entrypoint','origin','alias'])
def test_unsafe_paths_rejected_atomically(bad,field):
    if field=='alias' and bad=='/x':pytest.skip('one leading slash is a valid legacy alias')
    r=candidate();reg=ResourceRegistry()
    if field=='origin':r['origins'][0]['path']=bad
    elif field=='alias':r['aliases']=[bad]
    else:r[field]=bad
    with pytest.raises(ResourceRegistryError):reg.register(r,origin_bytes=origins(r))
    assert reg.list_resources()==[] and reg.list_routes()=={}


def test_alias_identity_and_defensive_copies():
    r=candidate();reg=ResourceRegistry();reg.register(r,origin_bytes=origins(r));i=identity(r)
    for route in ('/resources/res:test:one','legacy/demo.html','/legacy/demo.html','act:demo','/apps/demo/index.html'):
        assert reg.resolve_route(route,**i)==r
    assert reg.resolve(r['resource_id'],**i)==r
    assert reg.get_resources_for_role('EXPLORER')==[r]
    assert reg.get_resources_for_role('CORE2')==[]
    assert not reg.eligible_for_role(r['resource_id'],'EXPLORER','PREDICT',**i)
    reg.resolve(r['resource_id'],**i)['title']='mutated';r['title']='also mutated'
    assert reg.get(r['resource_id'])['title']=='Operator fixture'
    assert reg.resolve(r['resource_id'],**i)['title']=='Operator fixture'


@pytest.mark.parametrize('patch',[{'revision':2},{'revision':True},{'revision':None},{'sha256':'f'*64},{'sha256':None},{'release_id':'RELEASE-STALE'},{'release_id':None}])
def test_exact_identity_required(patch):
    r=candidate();reg=ResourceRegistry();reg.register(r,origin_bytes=origins(r));i={**identity(r),**patch}
    with pytest.raises(StaleReferenceError):reg.resolve(r['resource_id'],**i)
    with pytest.raises(StaleReferenceError):reg.resolve_route('act:demo',**i)


def test_route_collision_rolls_back():
    r=candidate();reg=ResourceRegistry();reg.register(r,origin_bytes=origins(r));before=reg.list_routes()
    other=candidate('res:test:two');other['aliases']=['new-alias','act:demo'];other['entrypoint']='new/index.html'
    with pytest.raises(ResourceRegistryError,match='ROUTE_COLLISION'):reg.register(other,origin_bytes=origins(other))
    assert reg.list_routes()==before and reg.list_resources()==[r] and reg.get(other['resource_id']) is None
    with pytest.raises(RouteResolutionError):reg.resolve_route('new-alias',**identity(other))
    with pytest.raises(ResourceRegistryError,match='DUPLICATE'):reg.register(r,origin_bytes=origins(r))


def test_origin_duplicates_and_missing_bytes():
    r=candidate();reg=ResourceRegistry()
    with pytest.raises(StaleReferenceError):reg.register(r)
    r['origins'].append(copy.deepcopy(r['origins'][0]))
    with pytest.raises(StaleReferenceError,match='DUPLICATE'):reg.register(r,origin_bytes=origins(r))
    assert not reg.list_routes()


def test_schema_cannot_be_weakened(tmp_path):
    p=tmp_path/'schema.json';p.write_text('{}')
    with pytest.raises(ResourceRegistryError):ResourceRegistry(p)
    assert load_resource_schema()['additionalProperties'] is False


def test_private_payload_not_forwarded(closure):
    r=forged();r['title']='PRIVATE-KEY-SECRET';r['aliases']=['private-secret-answer'];r['governance']['receipt_refs']=['private-receipt']
    with pytest.raises(ResourceEligibilityError) as exc:compile_resource_projection([r],release_closure=closure,origin_bytes=origins(r))
    assert 'PRIVATE' not in str(exc.value) and 'private' not in str(exc.value)
    assert 'private' not in json.dumps(compile_resource_projection([],release_closure=closure)).lower()
