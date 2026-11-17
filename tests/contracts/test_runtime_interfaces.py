"""A12 contract tests: strict compiler, wire examples and discriminating negatives."""
import copy
import json
import shutil
import subprocess
import tempfile
import unittest
from pathlib import Path

from jsonschema import Draft202012Validator

ROOT = Path(__file__).resolve().parents[2]
RUNTIME = ROOT / 'web' / 'runtime'
SCHEMAS = ROOT / 'schemas' / 'platform'
REF = dict(type='FRESH_TASK', id='task:one', revision=1, sha256='a'*64)
VALUES = {
    'SINGLE_CHOICE': 'A', 'MULTIPLE_CHOICE': ['A', 'B'],
    'INTEGER': '9007199254740993', 'NUMERIC_QUANTITY': {'decimal':'1.250','unit':'m'},
    'SYMBOLIC_EXPRESSION':'x+1', 'CONSTRUCTED_RESPONSE':'because',
    'MATHEMATICAL_PROOF':'proof', 'CHEMICAL_STRUCTURE':{'format':'SMILES','data':'C'},
    'REACTION_MECHANISM':['step'], 'DATA_TABLE':[['a',None]],
    'GRAPH':{'points':[['1','2']]}, 'EXPERIMENT_ANALYSIS':{'observations':['x'],'conclusion':'y'},
    'MULTIPART':{'a':{'kind':'MULTIPART','value':{'b':{'kind':'INTEGER','value':'2'}}}},
}
BAD_VALUES = dict(zip(VALUES, [1, 'A', 1, 1.25, [], False, [], 'C', 42, [{'a':42}], None, False, {'a':42}]))
RESPONSE = {'kind':'NUMERIC_QUANTITY','value':VALUES['NUMERIC_QUANTITY']}
PAYLOADS = {
    'PREDICTION_COMMITTED':dict(prediction='x',artifact_ids=[]),
    'HELP_EXPOSED':dict(capability='H1',asset_ref={**REF,'type':'ASSET'},ordinal=1),
    'FIRST_COMMITTED':dict(responses={'q':RESPONSE},work=[],help_event_ids=[]),
    'RECONSTRUCTION_COMMITTED':dict(first_event_id='evt:first',comparison={'step':{'aligned':True}},reference_ref={**REF,'type':'SOLUTION'}),
    'DIAGNOSIS_COMMITTED':dict(move_id='move:one',why='error'),
    'REPAIR_COMMITTED':dict(first_event_id='evt:first',work=['repair'],why='fixed'),
    'BOUNDARY_COMMITTED':dict(boundary_task_ref=REF,responses={'q':RESPONSE},work=[],help_event_ids=[]),
    'BOUNDARY_FEEDBACK_VIEWED':dict(boundary_event_id='evt:boundary',reference_ref={**REF,'type':'SOLUTION'}),
    'SOURCE_RETURNED':dict(origin_session_id='session:one',origin_ref=REF,cursor=0),
}
EVENT = dict(schema_version='g9-cognitive-event/1',event_id='evt:one',journey_id='journey:one',release_id='release:one',task_instance_id='instance:one',task_ref=REF,sequence=1,previous_sha256=None,at='2026-11-17T00:00:00Z')


def schema(name):
    return json.loads((SCHEMAS / (name+'.schema.json')).read_text(encoding='utf-8'))


def literal(value):
    return json.dumps(value, ensure_ascii=False)


def compiler_source():
    lines = ["import type {Response, Ref, NativeCore, CognitiveEvent, Grade, Attempt, ModelProjection, ResourceIdentity, ReasoningCell} from './web/runtime/types';",
             "import type {Capability, Evaluator, CognitiveStore, DisclosureContext, ResourceRegistry, ModelEvaluationResult} from './web/runtime/contracts';"]
    def case(name, typ, value, bad=False):
        if bad:
            lines.append('// @ts-expect-error rejected contract shape')
        lines.append(f'const {name}: {typ} = {literal(value)};')
    for n,(kind,value) in enumerate(VALUES.items()):
        case(f'response{n}','Response',dict(kind=kind,value=value))
        case(f'badResponse{n}','Response',dict(kind=kind,value=BAD_VALUES[kind]),True)
    for n,(kind,payload) in enumerate(PAYLOADS.items()):
        event = dict(EVENT,event_type=kind,payload=payload)
        case(f'event{n}','CognitiveEvent',event)
        case(f'badEvent{n}','CognitiveEvent',dict(event,payload={}),True)
        case(f'noInstance{n}','CognitiveEvent',{k:v for k,v in event.items() if k!='task_instance_id'},True)
    for n,kind in enumerate(schema('exact-ref')['properties']['type']['enum']):
        case(f'ref{n}','Ref',dict(REF,type=kind))
    case('badRef','Ref',dict(REF,type='UNKNOWN'),True)
    for n,role in enumerate(['CORE1','CORE1A','CORE1B','CORE2','CORE2A','CORE2B']):
        case(f'role{n}','NativeCore',role)
    case('badRole','NativeCore','CORE3',True)
    case('badProof','Response',dict(kind='MATHEMATICAL_PROOF',value='x',proofSteps=['x']),True)
    case('badMulti','Response',dict(kind='MULTIPART',parts={'x':RESPONSE}),True)
    case('badGrade','Grade',dict(status='REVIEW_PENDING',points=1,maxPoints=1,reasonCode='x'),True)
    case('goodGrade','Grade',dict(status='REVIEW_PENDING',points=None,maxPoints=1,reasonCode='x'))
    case('badEval',"Evaluator<'MATHEMATICAL_PROOF'>",dict(mode='AUTOMATIC',canonical_value='x'),True)
    case('goodEval',"Evaluator<'INTEGER'>",dict(mode='AUTOMATIC',canonical_value='2'))
    lines.extend(["declare const attempt: Attempt;", "// @ts-expect-error immutable ID", "attempt.id = 'x';", "// @ts-expect-error immutable work", "attempt.work.push({id:'x',kind:'NOTE',version:1,value:'x'});", "declare const cap: Capability<'INTEGER'>;", "// @ts-expect-error mismatched capability response", "cap.mount(document.body,{kind:'SINGLE_CHOICE',value:'A'},()=>{});", "declare const store: CognitiveStore;", "// @ts-expect-error incomplete replay identity", "store.replay('journey',ref0,'release');", "declare const registry: ResourceRegistry;", "// @ts-expect-error incomplete lookup", "registry.resolve('resource',1,'release');", "// @ts-expect-error invalid model result", "const invalidModel: ModelEvaluationResult = {domainStatus:'INVALID',outputs:{x:1},representationState:{}};", "// @ts-expect-error invalid resource identity", "const badIdentity: ResourceIdentity = {resourceId:'x',revision:1,releaseId:'r'};", "// @ts-expect-error missing model schema fields", "const badModel: ModelProjection = {id:'m'};", "// @ts-expect-error unscoped disclosure", "const badDisclosure: DisclosureContext = {stage:'PREDICT',mode:'LEARN',capability:'H1',firstCommitted:false,boundaryCommitted:false,reviewRef:null};", "// @ts-expect-error missing reasoning cell fields", "const badCell: ReasoningCell = {cell_id:'c'};"])
    return '\n'.join(lines)+'\n'


class TestRuntimeInterfaces(unittest.TestCase):
    def test_response_wire_schema(self):
        s = schema('response')
        v = Draft202012Validator(s)
        self.assertEqual(set(VALUES), set(s['properties']['kind']['enum']))
        for kind,value in VALUES.items():
            with self.subTest(kind=kind):
                self.assertTrue(v.is_valid(dict(kind=kind,value=value)))
                self.assertFalse(v.is_valid(dict(kind=kind,value=BAD_VALUES[kind])))

    def test_event_wire_schema(self):
        s = schema('cognitive-event')
        v = Draft202012Validator(s)
        response = Draft202012Validator(schema('response'))
        self.assertEqual(set(PAYLOADS), set(s['properties']['event_type']['enum']))
        for kind,payload in PAYLOADS.items():
            with self.subTest(kind=kind):
                event = dict(EVENT,event_type=kind,payload=payload)
                self.assertTrue(v.is_valid(event))
                self.assertFalse(v.is_valid(dict(event,payload={})))
                missing = copy.deepcopy(event); del missing['task_instance_id']
                self.assertFalse(v.is_valid(missing))
                for value in payload.get('responses',{}).values():
                    self.assertTrue(response.is_valid(value))

    def test_strict_typescript_contracts(self):
        compiler = shutil.which('tsc')
        self.assertIsNotNone(compiler, 'tsc is required; Node strip-types is not a type check')
        with tempfile.TemporaryDirectory() as tmp:
            tmp = Path(tmp)
            shutil.copytree(RUNTIME,tmp/'web'/'runtime')
            (tmp/'probe.ts').write_text(compiler_source(),encoding='utf-8')
            res = subprocess.run([compiler,'--noEmit','--strict','--target','ES2022','--module','ESNext','--moduleResolution','bundler','--lib','ES2022,DOM','probe.ts'],cwd=tmp,capture_output=True,text=True)
            self.assertEqual(res.returncode,0,res.stdout+res.stderr)


if __name__ == '__main__':
    unittest.main()
