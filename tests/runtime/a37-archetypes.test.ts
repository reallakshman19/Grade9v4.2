// Producer-declared nine archetype groups; synthetic capability checks only.
// Exercise actual assessment + qualified A19 persistence; not native exam parity.
import {test} from 'node:test';
import assert from 'node:assert/strict';
import {MemoryStorageDriver} from '../../web/runtime/storage.ts';
import {DefaultProgressStore} from '../../web/runtime/progress.ts';
import {Session as SessionController} from '../../web/runtime/session.ts';
import {StandardAssessmentEngine,SCORING_VERSION,type AssessmentContract} from '../../web/runtime/assessment.ts';
import {computeSha256,canonicalJson,sameRef} from '../../web/runtime/loader.ts';
import {ref,artifact} from '../fixtures/wave8-synthetic.ts';
import type {Response,Attempt,Session} from '../../web/runtime/types.ts';
const groups:Record<string,Response[]>={
 'PHY-E1':[{kind:'SINGLE_CHOICE',value:'B'},{kind:'MULTIPLE_CHOICE',value:['A','C']}],
 'CHM-E1':[{kind:'SINGLE_CHOICE',value:'C'},{kind:'INTEGER',value:'6'}],
 'MTH-E1':[{kind:'SINGLE_CHOICE',value:'A'},{kind:'INTEGER',value:'-15'}],
 'PHY-E2':[{kind:'NUMERIC_QUANTITY',value:{decimal:'19.6',unit:'m/s'}},{kind:'CONSTRUCTED_RESPONSE',value:'Synthetic reasoning'}],
 'MTH-E2':[{kind:'SYMBOLIC_EXPRESSION',value:'x^2+2*x+1'},{kind:'NUMERIC_QUANTITY',value:{decimal:'3.14159',unit:'rad'}}],
 'MTH-E3':[{kind:'MATHEMATICAL_PROOF',value:'Synthetic proof'},{kind:'CONSTRUCTED_RESPONSE',value:'Synthetic conclusion'}],
 'CHM-E2':[{kind:'CHEMICAL_STRUCTURE',value:{format:'SMILES',data:'CCO'}},{kind:'REACTION_MECHANISM',value:['Synthetic step']}],
 'PHY-E3':[{kind:'DATA_TABLE',value:[['0','0'],['1','9.8']]},{kind:'GRAPH',value:{points:[['0','0'],['1','9.8']]}},{kind:'EXPERIMENT_ANALYSIS',value:{observations:['Synthetic observation'],conclusion:'Synthetic conclusion'}}],
 'CHM-E3':[{kind:'DATA_TABLE',value:[['0','2.1'],['25','7']]},{kind:'GRAPH',value:{points:[['0','2.1'],['25','7']]}},{kind:'EXPERIMENT_ANALYSIS',value:{observations:['Synthetic observation'],conclusion:'Synthetic conclusion'}}]
};
for(const [group,responses] of Object.entries(groups))test('A37 '+group+' actual typed qualification and durable exam commit',async()=>{
 const driver=new MemoryStorageDriver();
 for(const [i,response] of responses.entries()){
  const task=ref('QUESTION','question:golden:'+group+':'+i),automatic=['SINGLE_CHOICE','MULTIPLE_CHOICE','INTEGER','NUMERIC_QUANTITY'].includes(response.kind);
  const contract:AssessmentContract={id:'assessment:golden:'+group+':'+i,revision:1,task_ref:task,response_kind:response.kind,max_points:1,evaluator:automatic?{mode:'AUTOMATIC',canonical_value:response.value,...(['SINGLE_CHOICE','MULTIPLE_CHOICE'].includes(response.kind)?{allowed_options:['A','B','C']}:{}),...(response.kind==='NUMERIC_QUANTITY'?{numeric_tolerance:0}:{})}:{mode:'REVIEW_PENDING'}};
  const assessment=ref('ASSESSMENT',contract.id,await computeSha256(canonicalJson(contract))),engine=new StandardAssessmentEngine([{assessment,task}]);await engine.registerContract(contract,assessment);
  const progress=new DefaultProgressStore(driver,async a=>!!a.assessmentRef&&sameRef(a.assessmentRef,assessment)&&a.scoringVersion===SCORING_VERSION&&sameRef(a.item,task)&&canonicalJson(a.grade)===canonicalJson(await engine.evaluate(a.response,assessment,'SIMULATED_EXAM',task)));
  const s:Session={id:'session:golden:'+group+':'+i,releaseId:'release:golden:archetypes',item:task,origin:null,returnRoute:null,mode:'SIMULATED_EXAM',contentRevision:'r1',deadlineAt:new Date(Date.now()+60000).toISOString(),cursor:0,attemptIds:[],draftId:null};await driver.put('sessions',s.id,s);
  const controller=new SessionController({sessionId:s.id,releaseId:s.releaseId,item:task,mode:s.mode},driver,progress,{liveRevision:async()=> 'r1',reviewedDisclosure:async()=>true});
  const grade=await engine.evaluate(response,assessment,s.mode,task);assert.equal(grade.status,automatic?'SCORED':'REVIEW_PENDING');assert.equal(grade.points,automatic?1:null);
  const a:Attempt={id:'attempt:golden:'+group+':'+i,sessionId:s.id,releaseId:s.releaseId,item:task,response,work:[artifact('work:golden:'+group+':'+i)],hintIds:[],submittedAt:new Date().toISOString(),grade,assessmentRef:assessment,scoringVersion:SCORING_VERSION,cognitive:null};
  await progress.saveDraft(s,response,a.work,0);await controller.appendAttempt(a,1);assert.deepEqual(await progress.committedAttempt(s.id,a.id),a);
  assert.equal((await controller.disclosure('CORRECTNESS',a.id,task)).verdict,'BLOCKED');assert.equal((await controller.disclosure('SOLUTION',a.id,task)).verdict,'BLOCKED');
  await assert.rejects(controller.appendAttempt({...a,id:a.id+':duplicate'},0));assert.equal((await controller.snapshot()).attemptIds.length,1);
 }
 assert.equal((await driver.getAll('attempts')).length,responses.length);
});
