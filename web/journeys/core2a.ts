// A67: independent typed check uses A18's qualified committed-attempt readback.
import {sameRef} from '../runtime/loader.ts';
import {DefaultProgressStore,refOk} from '../runtime/progress.ts';
import {CognitiveController} from './cognitive-controller.ts';
import type {Checkpoint,Ref,TaskRef} from '../runtime/types.ts';
export const CORE2A_BLUEPRINT_ID='BP-CORE2A-SUPPORTED-APPLICATION@1.1.0';
export type CheckResult={readonly status:'REVIEW_PENDING'|'CHECK_PASSED'|'CHECK_DIVERGED';readonly valid:boolean|null;readonly mastery:false};
const pending=():CheckResult=>({status:'REVIEW_PENDING',valid:null,mastery:false});
export function pendingSelfCheck(working:string):CheckResult{
 if(typeof working!=='string'||!working.trim())throw Error('WORKING_REQUIRED');
 return pending();
}
export interface ReviewedPracticeCheck {
 readonly releaseId:string;readonly practiceSessionId:string;readonly practiceTask:TaskRef;
 readonly checkSessionId:string;readonly checkTask:TaskRef;readonly assessment:Ref<'ASSESSMENT'>;readonly attemptId:string;
 readonly review:Ref<'APPROVAL'>;
}
// This provider belongs to trusted bootstrap, not a route, authored task, or learner draft.
// It must verify familiar family, learner eligibility, distinct check, provenance and review.
export interface PracticeCheckAuthority {
 reviewedCheck(sessionId:string,task:TaskRef,releaseId:string):Promise<ReviewedPracticeCheck|null>;
}
const resultCodes:Readonly<Record<string,readonly [string,readonly string[]]>>={
 SINGLE_CHOICE:['CORRECT_CHOICE',['INCORRECT_CHOICE']],
 MULTIPLE_CHOICE:['CORRECT_SET',['INCORRECT_SET']],
 INTEGER:['CORRECT_INTEGER',['INCORRECT_INTEGER']],
 NUMERIC_QUANTITY:['CORRECT_QUANTITY',['OUT_OF_TOLERANCE','DIMENSION_MISMATCH']]
};
export class Core2ASupportedJourney {
 readonly #controller:CognitiveController;readonly #progress:DefaultProgressStore;readonly #authority:PracticeCheckAuthority;
 constructor(controller:CognitiveController,progress:DefaultProgressStore,authority:PracticeCheckAuthority){this.#controller=controller;this.#progress=progress;this.#authority=authority;}
 async readIndependentCheck(checkpoint:Checkpoint):Promise<CheckResult>{
  try{
   const cp=structuredClone(checkpoint),e=await this.#controller.readEvidence(cp),task=e.context.task as TaskRef;
   if(!['QUESTION','FRESH_TASK'].includes(task.type))return pending();
   const p=await this.#authority.reviewedCheck(e.session.id,task,e.session.releaseId);
   if(!p||p.releaseId!==e.session.releaseId||p.practiceSessionId!==e.session.id||!sameRef(p.practiceTask,task)||p.checkSessionId===e.session.id||p.checkSessionId===e.origin.id||!refOk(p.checkTask)||!['QUESTION','FRESH_TASK'].includes(p.checkTask.type)||p.checkTask.id===task.id||p.checkTask.sha256===task.sha256||!refOk(p.assessment)||p.assessment.type!=='ASSESSMENT'||!refOk(p.review)||p.review.type!=='APPROVAL')return pending();
   const a=await this.#progress.committedAttempt(p.checkSessionId,p.attemptId);
   if(!a||a.releaseId!==p.releaseId||!sameRef(a.item,p.checkTask)||!a.assessmentRef||!sameRef(a.assessmentRef,p.assessment)||a.hintIds.length||a.grade.status!=='SCORED'||a.grade.maxPoints<=0)return pending();
   const codes=resultCodes[a.response.kind];
   if(!codes)return pending();
   const after=await this.#controller.readEvidence(cp),q=await this.#authority.reviewedCheck(after.session.id,after.context.task as TaskRef,after.session.releaseId);
   if(!q||q.releaseId!==p.releaseId||q.practiceSessionId!==p.practiceSessionId||!sameRef(q.practiceTask,p.practiceTask)||q.checkSessionId!==p.checkSessionId||!sameRef(q.checkTask,p.checkTask)||!sameRef(q.assessment,p.assessment)||q.attemptId!==p.attemptId||!sameRef(q.review,p.review))return pending();
   if(a.grade.reasonCode===codes[0]&&a.grade.points===a.grade.maxPoints)return {status:'CHECK_PASSED',valid:true,mastery:false};
   if(codes[1].includes(a.grade.reasonCode)&&a.grade.points<a.grade.maxPoints)return {status:'CHECK_DIVERGED',valid:false,mastery:false};
   return pending();
  }catch{return pending();}
 }
}
