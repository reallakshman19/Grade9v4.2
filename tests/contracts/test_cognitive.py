"""A47 synthetic contract oracle. No persistence or independent academic authority."""
from copy import deepcopy
from dataclasses import dataclass, replace
from datetime import datetime
import hashlib
import json
from pathlib import Path

import pytest
from jsonschema import Draft202012Validator, FormatChecker

ROOT = Path(__file__).resolve().parents[2] / 'schemas' / 'platform'

def schema(name):
    return json.loads((ROOT / (name + '.schema.json')).read_text(encoding='utf-8'))

def validator(name):
    return Draft202012Validator(schema(name), format_checker=FormatChecker())

class CognitiveContractError(ValueError):
    def __init__(self, code):
        self.code = code
        super().__init__(code)

def require(ok, code):
    if not ok:
        raise CognitiveContractError(code)

def identity(ref):
    return (ref['type'], ref['id'], ref['revision'], ref['sha256'])

def digest(value):
    return hashlib.sha256(json.dumps(value, sort_keys=True, ensure_ascii=False,
                                    separators=(',', ':'), allow_nan=False).encode('utf-8')).hexdigest()

@dataclass(frozen=True)
class ReplayContext:
    # All inputs must come from the caller's trusted release/session state, not replay bytes.
    release: str
    task: tuple
    journey: str
    instance: str
    boundary_task: tuple
    origin: tuple
    help_assets: tuple  # (capability, exact asset identity) pairs
    first_reference: tuple
    boundary_reference: tuple
    first_fields: tuple  # (field id, response kind) pairs; required fields
    boundary_fields: tuple
    moves: tuple
    capabilities: frozenset
    mode: str = 'PRACTICE'

@dataclass(frozen=True)
class Checkpoint:
    sequence: int
    sha256: str | None
    stage: str
    returned: bool = False

TRANSITIONS = {
    'PREDICTION_COMMITTED': ('PREDICT', 'ATTEMPT'),
    'FIRST_COMMITTED': ('ATTEMPT', 'RECONSTRUCT'),
    'RECONSTRUCTION_COMMITTED': ('RECONSTRUCT', 'DIAGNOSE'),
    'DIAGNOSIS_COMMITTED': ('DIAGNOSE', 'REPAIR'),
    'REPAIR_COMMITTED': ('REPAIR', 'BOUNDARY_TEST'),
    'BOUNDARY_COMMITTED': ('BOUNDARY_TEST', 'BOUNDARY_TEST'),
    'BOUNDARY_FEEDBACK_VIEWED': ('BOUNDARY_TEST', 'COMPLETE'),
    'SOURCE_RETURNED': ('COMPLETE', 'COMPLETE'),
}

def validate_event_chain_isolation(events, *, context: ReplayContext, checkpoint: Checkpoint):
    """Validate exact expected identity and head, then replay; never infer authority from events.

    A trusted checkpoint is a caller obligation. Hashes alone do not authenticate a store.
    This oracle models reviewed required-field-only tasks, no exam teaching aids, and no
    boundary assistance (the current event protocol has no boundary help exposure event).
    """
    v = validator('cognitive-event')
    require(checkpoint.sequence == len(events), 'CHECKPOINT_LENGTH')
    require(context.mode in {'LEARN', 'PRACTICE', 'SIMULATED_EXAM'}, 'UNKNOWN_MODE')
    require(context.task[0] in {'QUESTION', 'FRESH_TASK'} and context.boundary_task[0] in {'QUESTION', 'FRESH_TASK'}, 'TASK_TYPE')
    require(context.task[:2] != context.boundary_task[:2], 'BOUNDARY_ALIAS')
    stage, last, last_time, returned = 'PREDICT', None, None, False
    first = boundary = None
    seen, help_ids, hints = set(), [], []
    def allowed(cap):
        return context.mode != 'SIMULATED_EXAM' and cap in context.capabilities
    def responses(payload, fields):
        expected = dict(fields)
        require(bool(expected) and len(expected) == len(fields), 'INVALID_FIELD_SPEC')
        require(set(payload['responses']) == set(expected), 'RESPONSE_FIELDS')
        require(all(value['kind'] == expected[key] for key, value in payload['responses'].items()), 'RESPONSE_KIND')
    for index, event in enumerate(events, 1):
        require(v.is_valid(event), 'EVENT_SCHEMA_INVALID')
        require((event['release_id'], identity(event['task_ref']), event['journey_id'], event['task_instance_id']) == (context.release, context.task, context.journey, context.instance), 'CROSS_TASK_CONTAMINATION')
        require(event['sequence'] == index, 'NON_MONOTONIC_SEQUENCE')
        require(event['event_id'] not in seen, 'DUPLICATE_EVENT_ID')
        seen.add(event['event_id'])
        require(event['previous_sha256'] == last, 'BROKEN_EVENT_CHAIN')
        at = datetime.fromisoformat(event['at'].replace('Z', '+00:00'))
        require(last_time is None or at >= last_time, 'EVENT_TIME_REGRESSION')
        last_time = at
        typ, p, eid = event['event_type'], event['payload'], event['event_id']
        if typ == 'HELP_EXPOSED':
            cap = p['capability']
            require(stage == 'ATTEMPT' and allowed(cap), 'FORBIDDEN_HELP_EXPOSURE')
            require((cap, identity(p['asset_ref'])) in context.help_assets, 'FOREIGN_HELP_ASSET')
            require(p['ordinal'] == len(help_ids) + 1, 'HELP_ORDINAL_MISMATCH')
            if cap in ('H1', 'H2', 'H3'):
                require(len(hints) < 3 and cap == ('H1', 'H2', 'H3')[len(hints)], 'HELP_OUT_OF_ORDER')
                hints.append(cap)
            help_ids.append(eid)
        else:
            require(typ in TRANSITIONS and stage == TRANSITIONS[typ][0], 'ILLEGAL_EVENT_TRANSITION')
            if typ == 'PREDICTION_COMMITTED':
                require(bool(p['prediction'].strip()), 'EMPTY_PREDICTION')
            elif typ == 'FIRST_COMMITTED':
                require(first is None and p['help_event_ids'] == help_ids, 'INVALID_FIRST_COMMIT')
                responses(p, context.first_fields)
                first = eid
            elif typ == 'RECONSTRUCTION_COMMITTED':
                require(first and p['first_event_id'] == first and allowed('REFERENCE_SOLUTION') and identity(p['reference_ref']) == context.first_reference, 'UNREVIEWED_RECONSTRUCTION')
                require(set(p['comparison']) == set(context.moves) and bool(context.moves), 'UNREVIEWED_MOVES')
            elif typ == 'DIAGNOSIS_COMMITTED':
                require(p['move_id'] in (*context.moves, 'NO_DIVERGENCE', 'UNSURE') and bool(p['why'].strip()), 'INVALID_DIAGNOSIS')
            elif typ == 'REPAIR_COMMITTED':
                require(p['first_event_id'] == first and bool(p['work']) and bool(p['why'].strip()), 'INVALID_REPAIR')
            elif typ == 'BOUNDARY_COMMITTED':
                require(boundary is None and identity(p['boundary_task_ref']) == context.boundary_task and bool(p['work']), 'INVALID_BOUNDARY_COMMIT')
                require(p['help_event_ids'] == [], 'UNVERIFIED_BOUNDARY_HELP')
                responses(p, context.boundary_fields)
                boundary = eid
            elif typ == 'BOUNDARY_FEEDBACK_VIEWED':
                require(boundary and p['boundary_event_id'] == boundary and allowed('BOUNDARY_REFERENCE') and identity(p['reference_ref']) == context.boundary_reference, 'PREMATURE_BOUNDARY_FEEDBACK')
            elif typ == 'SOURCE_RETURNED':
                require(not returned and allowed('SOURCE_RETURN') and (p['origin_session_id'], identity(p['origin_ref']), p['cursor']) == context.origin, 'INVALID_SOURCE_RETURN')
                returned = True
            stage = TRANSITIONS[typ][1]
        last = digest(event)
    require((last, stage, returned) == (checkpoint.sha256, checkpoint.stage, checkpoint.returned), 'CHECKPOINT_MISMATCH')
    return dict(stage=stage, first_event_id=first, boundary_event_id=boundary, last_sha256=last, assisted=bool(help_ids), returned=returned)


def validate_reasoning_cell_contract(cell, *, expected_cell_digest=None):
    """Structural and logical identity checks only; optional external exact reviewed-cell binding."""
    require(validator('reasoning-cell').is_valid(cell), 'CELL_SCHEMA_INVALID')
    ids = [identity(ref)[:2] for ref in cell['instances']]
    require(len(ids) == len(set(ids)), 'C06_DUPLICATE_INSTANCE')
    require(cell['main'] is None or identity(cell['main'])[:2] not in ids, 'C06_MAIN_INSTANCE_ALIAS')
    if expected_cell_digest is not None:
        require(digest(cell) == expected_cell_digest, 'CELL_REVIEW_BINDING_MISMATCH')
    # Never infer a QRT classification, combined inference, or academic admission.


def ref(kind, name, revision=1):
    return dict(type=kind, id=name, revision=revision, sha256='a'*64)

TASK = ref('FRESH_TASK', 'task:first')
BOUNDARY = ref('FRESH_TASK', 'task:boundary')
ASSET = ref('ASSET', 'asset:hint')
SOLUTION = ref('SOLUTION', 'solution:first')
BOUNDARY_SOLUTION = ref('SOLUTION', 'solution:boundary')
ORIGIN = ref('QUESTION', 'question:source')
CONTEXT = ReplayContext('release:one', identity(TASK), 'journey:one', 'instance:one', identity(BOUNDARY), ('session:origin', identity(ORIGIN), 4), (('H1', identity(ASSET)),), identity(SOLUTION), identity(BOUNDARY_SOLUTION), (('q', 'SINGLE_CHOICE'),), (('b', 'INTEGER'),), ('move:one',), frozenset({'H1', 'REFERENCE_SOLUTION', 'BOUNDARY_REFERENCE', 'SOURCE_RETURN'}))

def rehash(events):
    for i, event in enumerate(events):
        event['sequence'] = i + 1
        event['previous_sha256'] = digest(events[i-1]) if i else None
    return events

def chain():
    payloads = [
        ('PREDICTION_COMMITTED', dict(prediction='prediction', artifact_ids=[])),
        ('HELP_EXPOSED', dict(capability='H1', asset_ref=ASSET, ordinal=1)),
        ('FIRST_COMMITTED', dict(responses={'q':{'kind':'SINGLE_CHOICE','value':'A'}}, work=['work'], help_event_ids=['evt:2'])),
        ('RECONSTRUCTION_COMMITTED', dict(first_event_id='evt:3', comparison={'move:one':{'aligned':True}}, reference_ref=SOLUTION)),
        ('DIAGNOSIS_COMMITTED', dict(move_id='move:one', why='reason')),
        ('REPAIR_COMMITTED', dict(first_event_id='evt:3', work=['repair'], why='reason')),
        ('BOUNDARY_COMMITTED', dict(boundary_task_ref=BOUNDARY, responses={'b':{'kind':'INTEGER','value':'2'}}, work=['work'], help_event_ids=[])),
        ('BOUNDARY_FEEDBACK_VIEWED', dict(boundary_event_id='evt:7', reference_ref=BOUNDARY_SOLUTION)),
        ('SOURCE_RETURNED', dict(origin_session_id='session:origin', origin_ref=ORIGIN, cursor=4)),
    ]
    return rehash([dict(schema_version='g9-cognitive-event/1', event_id=f'evt:{i}', journey_id=CONTEXT.journey, release_id=CONTEXT.release, task_instance_id=CONTEXT.instance, task_ref=deepcopy(TASK), event_type=kind, payload=deepcopy(payload), at=f'2026-11-17T00:{i:02d}:00Z') for i,(kind,payload) in enumerate(payloads,1)])

def checkpoint(events, stage='COMPLETE', returned=True):
    return Checkpoint(len(events), digest(events[-1]) if events else None, stage, returned)

def test_schema_parity():
    for name in ('cognitive-event', 'reasoning-cell', 'response'):
        Draft202012Validator.check_schema(schema(name))
    assert schema('cognitive-event')['$defs']['response'] == schema('response')

def test_complete_and_prefix():
    events = chain()
    snap = validate_event_chain_isolation(events, context=CONTEXT, checkpoint=checkpoint(events))
    assert (snap['stage'], snap['first_event_id'], snap['boundary_event_id'], snap['assisted'], snap['returned']) == ('COMPLETE','evt:3','evt:7',True,True)
    for n, stage in enumerate(['PREDICT','ATTEMPT','ATTEMPT','RECONSTRUCT','DIAGNOSE','REPAIR','BOUNDARY_TEST','BOUNDARY_TEST','COMPLETE']):
        prefix = events[:n]
        assert validate_event_chain_isolation(prefix, context=CONTEXT, checkpoint=checkpoint(prefix,stage,False))['stage'] == stage

@pytest.mark.parametrize('index', range(9))
def test_every_payload_required(index):
    event = chain()[index]
    assert validator('cognitive-event').is_valid(event)
    event['payload'] = {}
    assert not validator('cognitive-event').is_valid(event)

@pytest.mark.parametrize('bad', [{'value':'A'}, {'kind':'NUMERIC_RESPONSE','value':0.4,'unit':'m'}, {'kind':'INTEGER','value':2}, {'kind':'MULTIPART','value':{'p':{'kind':'INTEGER','value':2}}}])
@pytest.mark.parametrize('index', [2,6])
def test_nested_response_rejects_bad_wire(index,bad):
    event = chain()[index]
    event['payload']['responses'] = {'field':bad}
    assert not validator('cognitive-event').is_valid(event)

@pytest.mark.parametrize('change,code', [
    ('release','CROSS_TASK_CONTAMINATION'), ('revision','CROSS_TASK_CONTAMINATION'), ('instance','CROSS_TASK_CONTAMINATION'), ('journey','CROSS_TASK_CONTAMINATION'), ('foreign_help','FOREIGN_HELP_ASSET'), ('foreign_boundary','INVALID_BOUNDARY_COMMIT'), ('boundary_help','UNVERIFIED_BOUNDARY_HELP'), ('origin','INVALID_SOURCE_RETURN'), ('cursor','INVALID_SOURCE_RETURN'), ('wrong_kind','RESPONSE_KIND'), ('missing_field','RESPONSE_FIELDS'), ('extra_field','RESPONSE_FIELDS'), ('wrong_reference','UNREVIEWED_RECONSTRUCTION'), ('wrong_boundary_reference','PREMATURE_BOUNDARY_FEEDBACK'), ('move','INVALID_DIAGNOSIS'), ('comparison','UNREVIEWED_MOVES'), ('duplicate','DUPLICATE_EVENT_ID'), ('time','EVENT_TIME_REGRESSION'), ('first_help','INVALID_FIRST_COMMIT'), ('premature','ILLEGAL_EVENT_TRANSITION'), ('ordinal','HELP_ORDINAL_MISMATCH'), ('event_instance','CROSS_TASK_CONTAMINATION'), ('boundary_link','PREMATURE_BOUNDARY_FEEDBACK'), ('unknown_field','EVENT_SCHEMA_INVALID'), ('missing_instance','EVENT_SCHEMA_INVALID'), ('forged_hash','BROKEN_EVENT_CHAIN'),
])
def test_rehashed_attacks(change,code):
    e = chain()
    if change in {'release','revision','instance','journey'}:
        for event in e:
            if change == 'release': event['release_id'] = 'release:stale'
            if change == 'revision': event['task_ref']['revision'] = 2
            if change == 'instance': event['task_instance_id'] = 'instance:foreign'
            if change == 'journey': event['journey_id'] = 'journey:foreign'
    elif change == 'foreign_help': e[1]['payload']['asset_ref'] = ref('ASSET','asset:foreign')
    elif change == 'foreign_boundary': e[6]['payload']['boundary_task_ref'] = ref('FRESH_TASK','task:foreign')
    elif change == 'boundary_help': e[6]['payload']['help_event_ids'] = ['evt:2']
    elif change == 'origin': e[8]['payload']['origin_ref'] = ref('QUESTION','question:foreign')
    elif change == 'cursor': e[8]['payload']['cursor'] = 99
    elif change == 'wrong_kind': e[2]['payload']['responses']['q'] = {'kind':'INTEGER','value':'1'}
    elif change == 'missing_field': e[2]['payload']['responses'] = {'other':{'kind':'SINGLE_CHOICE','value':'A'}}
    elif change == 'extra_field': e[2]['payload']['responses']['other'] = {'kind':'SINGLE_CHOICE','value':'A'}
    elif change == 'wrong_reference': e[3]['payload']['reference_ref'] = BOUNDARY_SOLUTION
    elif change == 'wrong_boundary_reference': e[7]['payload']['reference_ref'] = SOLUTION
    elif change == 'move': e[4]['payload']['move_id'] = 'move:foreign'
    elif change == 'comparison': e[3]['payload']['comparison'] = {'move:foreign':{}}
    elif change == 'duplicate': e[1]['event_id'] = e[0]['event_id']
    elif change == 'time': e[1]['at'] = '2026-11-16T00:00:00Z'
    elif change == 'first_help': e[2]['payload']['help_event_ids'] = []
    elif change == 'premature': e[2],e[3] = e[3],e[2]
    elif change == 'ordinal': e[1]['payload']['ordinal'] = 2
    elif change == 'event_instance': e[1]['task_instance_id'] = 'instance:foreign'
    elif change == 'boundary_link': e[7]['payload']['boundary_event_id'] = 'evt:other'
    elif change == 'unknown_field': e[0]['unknown'] = 1
    elif change == 'missing_instance': del e[1]['task_instance_id']
    rehash(e)
    if change == 'forged_hash': e[2]['previous_sha256'] = 'f'*64
    # Even when given a matching synthetic head, the external scoped semantics reject.
    with pytest.raises(CognitiveContractError,match=code):
        validate_event_chain_isolation(e, context=CONTEXT, checkpoint=checkpoint(e))

@pytest.mark.parametrize('cut', [0,1,4,8])
def test_stale_or_truncated_checkpoint(cut):
    e = chain()
    with pytest.raises(CognitiveContractError,match='CHECKPOINT_LENGTH'):
        validate_event_chain_isolation(e[:cut], context=CONTEXT, checkpoint=checkpoint(e))

def test_coherent_rewrite_and_exam_denial():
    e = chain(); head = checkpoint(e)
    e[2]['payload']['responses']['q']['value'] = 'B'; rehash(e)
    with pytest.raises(CognitiveContractError,match='CHECKPOINT_MISMATCH'):
        validate_event_chain_isolation(e, context=CONTEXT, checkpoint=head)
    with pytest.raises(CognitiveContractError,match='FORBIDDEN_HELP_EXPOSURE'):
        validate_event_chain_isolation(e, context=replace(CONTEXT,mode='SIMULATED_EXAM'), checkpoint=checkpoint(e))

def cell():
    return dict(schema_version='g9-reasoning-cell/1',cell_id='cell:one',subject_id='PHYSICS',topic_ref=ref('CONCEPT','concept:one'),operation='APPLY',demand_band='D3',native_contract_ref=ref('WARRANT','warrant:one'),instances=[ref('QUESTION','question:a'),ref('QUESTION','question:b')],main=ref('QUESTION','question:c'),status='CANDIDATE',c06_v11=True)

@pytest.mark.parametrize('operation',['RETRIEVE','EXPLAIN','APPLY','MODEL','REPRESENT','SYNTHESIZE','JUSTIFY'])
@pytest.mark.parametrize('band',['D1','D2','D3','D4'])
def test_cell_matrix(operation,band):
    c=cell(); c.update(operation=operation,demand_band=band)
    validate_reasoning_cell_contract(c)

@pytest.mark.parametrize('change',['no_main','one_instance','duplicate','revision_alias','main_alias','bad_type','changed_classification'])
def test_cell_rejections(change):
    c=cell(); pinned=digest(c)
    if change=='no_main': c['main']=None
    elif change=='one_instance': c['instances'].pop()
    elif change=='duplicate': c['instances'][1]=deepcopy(c['instances'][0])
    elif change=='revision_alias': c['instances'][1]=dict(c['instances'][0],revision=2)
    elif change=='main_alias': c['main']=dict(c['instances'][0],sha256='b'*64)
    elif change=='bad_type': c['main']['type']='SOURCE'
    elif change=='changed_classification': c['operation']='MODEL'
    with pytest.raises(CognitiveContractError):
        validate_reasoning_cell_contract(c,expected_cell_digest=pinned if change=='changed_classification' else None)

@pytest.mark.parametrize('kind,value', [
    ('SINGLE_CHOICE','A'), ('MULTIPLE_CHOICE',['A','B']), ('INTEGER','9007199254740993'),
    ('NUMERIC_QUANTITY',{'decimal':'1.250','unit':'m'}), ('SYMBOLIC_EXPRESSION','x+1'),
    ('CONSTRUCTED_RESPONSE','text'), ('MATHEMATICAL_PROOF','proof'),
    ('CHEMICAL_STRUCTURE',{'format':'SMILES','data':'C'}), ('REACTION_MECHANISM',['step']),
    ('DATA_TABLE',[['x',None]]), ('GRAPH',{'points':[['1','2']]}),
    ('EXPERIMENT_ANALYSIS',{'observations':['x'],'conclusion':'y'}),
    ('MULTIPART',{'a':{'kind':'MULTIPART','value':{'b':{'kind':'INTEGER','value':'2'}}}}),
])
@pytest.mark.parametrize('index',[2,6])
def test_nested_response_positive_parity(index,kind,value):
    e=chain()[index]; e['payload']['responses']={'q':{'kind':kind,'value':value}}
    assert validator('response').is_valid(e['payload']['responses']['q'])
    assert validator('cognitive-event').is_valid(e)

@pytest.mark.parametrize('change',['missing_instance','bad_time','bad_genesis','bad_successor'])
def test_envelope_rejections(change):
    e=chain()
    if change=='missing_instance': del e[0]['task_instance_id']
    elif change=='bad_time': e[0]['at']='2026-11-17T04:00:00+04:00'
    elif change=='bad_genesis': e[0]['previous_sha256']='f'*64
    elif change=='bad_successor': e[1]['previous_sha256']=None
    assert not validator('cognitive-event').is_valid(e[1 if change=='bad_successor' else 0])

def test_no_help_and_empty_checkpoint():
    e=chain(); del e[1]; e[1]['payload']['help_event_ids']=[]; rehash(e)
    assert not validate_event_chain_isolation(e, context=CONTEXT, checkpoint=checkpoint(e))['assisted']
    assert validate_event_chain_isolation([],context=CONTEXT,checkpoint=Checkpoint(0,None,'PREDICT'))['stage']=='PREDICT'
