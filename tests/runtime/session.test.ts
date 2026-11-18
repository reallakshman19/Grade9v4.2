import {it} from 'node:test';
import assert from 'node:assert/strict';
import {MemoryStorageDriver,StorageError} from '../../web/runtime/storage.ts';
import {DefaultProgressStore} from '../../web/runtime/progress.ts';
import {Session as Controller} from '../../web/runtime/session.ts';
import {StandardAssessmentEngine,SCORING_VERSION,type AssessmentContract} from '../../web/runtime/assessment.ts';
import {canonicalJson,computeSha256} from '../../web/runtime/loader.ts';
import type {Attempt,Session,TaskRef} from '../../web/runtime/types.ts';
const item:TaskRef={type:'QUESTION',id:'que:session:r3',revision:1,sha256:'a'.repeat(64)},releaseId='RELEASE-DEMO-01';
async function fixture(mode:Session['mode']='PRACTICE',deadlineAt?:string){
 const d=new MemoryStorageDriver(),contract:AssessmentContract={id:'asmt:session:r3',revision:1,task_ref:item,response_kind:'INTEGER',max_points:2,evaluator:{mode:'AUTOMATIC',canonical_value:'7'}};
 const assessment={type:'ASSESSMENT' as const,id:contract.id,revision:1,sha256:await computeSha256(canonicalJson(contract))};
 const engine=new StandardAssessmentEngine([{assessment,task:item}]);await engine.registerContract(contract,assessment);
 const response={kind:'INTEGER' as const,value:'7'},grade=await engine.evaluate(response,assessment,mode,item);
 const session:Session={id:'ses:session:r3',releaseId,item,mode,contentRevision:'r3',deadlineAt:deadlineAt??null,origin:null,returnRoute:null,cursor:0,attemptIds:[],draftId:null};
 const attempt:Attempt={id:'att:session:r3',sessionId:session.id,releaseId,item,response,work:[],hintIds:[],submittedAt:new Date().toISOString(),grade,assessmentRef:assessment,scoringVersion:SCORING_VERSION,cognitive:null};
 const p=new DefaultProgressStore(d,async a=>a.releaseId===releaseId&&canonicalJson(a.assessmentRef)===canonicalJson(assessment)&&canonicalJson(a.grade)===canonicalJson(await engine.evaluate(a.response,assessment,mode,item)));
 const auth={liveRevision:async()=> 'r3',reviewedDisclosure:async()=>true};
 const config={sessionId:session.id,releaseId,item,mode};
 await d.put('sessions',session.id,session);return {d,p,session,attempt,controller:new Controller(config,d,p,auth),config,auth};
}
it('A19 qualified attempt is atomic, immutable and exact; disclosure follows durable save',async()=>{
 const {d,controller,attempt,session,p,config,auth}=await fixture();
 assert.equal((await controller.disclosure('SOLUTION',attempt.id,item)).verdict,'BLOCKED');
 d.setFailureHook((s,a)=>s==='sessions'&&a==='put'?new StorageError('TRANSACTION_ABORTED','test'):null);
 await assert.rejects(controller.appendAttempt(attempt));d.setFailureHook(null);assert.equal(await d.get('attempts',attempt.id),undefined);
 assert.equal((await controller.disclosure('SOLUTION',attempt.id,item)).verdict,'BLOCKED');
 await controller.appendAttempt(attempt);
 assert.equal((await controller.disclosure('SOLUTION',attempt.id,item)).verdict,'PERMITTED');
 assert.equal((await controller.disclosure('SOLUTION',attempt.id,{...item,revision:2})).verdict,'BLOCKED');
 const denied=new Controller(config,d,p,{...auth,reviewedDisclosure:async()=>false});
 assert.equal((await denied.disclosure('SOLUTION',attempt.id,item)).verdict,'BLOCKED');
 await controller.appendAttempt(attempt);assert.equal((await d.getAll('attempts')).length,1);
 await assert.rejects(controller.appendAttempt({...attempt,id:'att:other'}));
 assert.deepEqual((await controller.snapshot()).attemptIds,[attempt.id]);
});
it('A19 exam precedence and stale revisions block submission or disclosure',async()=>{
 const old=await fixture('SIMULATED_EXAM','2000-01-01T00:00:00Z');await assert.rejects(old.controller.appendAttempt(old.attempt),/SUBMISSION_BLOCKED/);assert.equal((await old.d.getAll('attempts')).length,0);
 const live=await fixture('SIMULATED_EXAM','2099-01-01T00:00:00Z');await live.controller.appendAttempt(live.attempt);assert.equal((await live.controller.disclosure('SOLUTION',live.attempt.id,item)).verdict,'BLOCKED');
 const f=await fixture(),stale=new Controller(f.config,f.d,f.p,{...f.auth,liveRevision:async()=> 'other'});await assert.rejects(stale.appendAttempt(f.attempt),/SUBMISSION_BLOCKED/);
});
it('A19 cannot persist an unqualified pending attempt then report failure',async()=>{
 const f=await fixture(),p=new DefaultProgressStore(f.d),c=new Controller(f.config,f.d,p,f.auth);
 const a={...f.attempt,grade:{status:'REVIEW_PENDING' as const,points:null,maxPoints:2,reasonCode:'MANUAL_REVIEW_REQUIRED'}};
 await assert.rejects(c.appendAttempt(a),/Unqualified commitment/);
 assert.equal(await f.d.get('attempts',a.id),undefined);
});
