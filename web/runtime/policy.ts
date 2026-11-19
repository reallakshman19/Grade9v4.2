// A19 R2: policy derives from persisted evidence, never caller success booleans.
import type {Attempt,Session,Ref} from './types.ts';
import {sameRef} from './loader.ts';
export type PolicyVerdict='PERMITTED'|'BLOCKED';
export interface PolicyReport{readonly verdict:PolicyVerdict;readonly reason:string;readonly rule:string}
export type DisclosureKind='CORRECTNESS'|'SOLUTION'|'HINT';
export function submissionPermitted(session:Session,liveRevision:string,now=Date.now()):boolean{
  if(!session.contentRevision||session.contentRevision!==liveRevision)return false;
  return session.mode!=='SIMULATED_EXAM'||typeof session.deadlineAt==='string'&&Number.isFinite(Date.parse(session.deadlineAt))&&now<=Date.parse(session.deadlineAt);
}
export function disclosurePolicy(session:Session,attempt:Attempt|null,kind:DisclosureKind,liveRevision:string,requested:Ref,reviewed:boolean):PolicyReport{
  const allowed=session.mode!=='SIMULATED_EXAM'&&session.contentRevision===liveRevision&&!!session.contentRevision&&reviewed&&sameRef(session.item,requested)&&
    (kind==='HINT'?false:!!attempt&&attempt.sessionId===session.id&&attempt.releaseId===session.releaseId&&sameRef(attempt.item,session.item)&&session.attemptIds.includes(attempt.id));
  return {verdict:allowed?'PERMITTED':'BLOCKED',rule:'DURABLE_DISCLOSURE',reason:allowed?'Exact reviewed durable evidence':'Missing exact durable evidence, reviewed policy or exam restriction'};
}
