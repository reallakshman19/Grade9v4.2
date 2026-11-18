// A68: transfer-specific admission around the corrected A48/A49 durable event engine.
// No combined task/solution object, local hash, save-success callback or locally asserted phase.
import {canonicalJson,sameRef} from '../runtime/loader.ts';
import {DefaultProgressStore,refOk} from '../runtime/progress.ts';
import {CognitiveController} from './cognitive-controller.ts';
import type {AssetLoader} from '../runtime/presentation.ts';
import type {Attempt,Checkpoint,CognitiveEvent,HelpCapability,Ref,Session,WorkArtifact} from '../runtime/types.ts';
export const CORE2B_BLUEPRINT_ID='BP-CORE2B-TRANSFER@1.1.0';
export type TransferDimension='REPRESENTATION_SHIFT'|'CONSTRAINT_MUTATION'|'INFERENTIAL_INVERSION'|'COUPLING_EXPANSION';
export interface ReviewedTransfer {
 readonly sessionId:string;readonly releaseId:string;readonly task:Ref;readonly origin:Ref;
 readonly anchor:Ref;readonly anchorSessionId:string;readonly anchorAttemptId:string;
 readonly boundary:Ref;readonly dimension:TransferDimension;readonly review:Ref<'APPROVAL'>;
 readonly capabilities:readonly {readonly id:string;readonly teaching:Ref<'LESSON'>;readonly receipt:Ref<'APPROVAL'>}[];
 readonly scaffolds:readonly {readonly capability:HelpCapability;readonly asset:Ref}[];
}
// A trusted service must verify the authenticated learner, exact anchor exposure, actual
// taught closure, semantic DECIDE difference, safe scaffolding, independent boundary and review.
// It must also enforce the same review in the A49 authority; a local object is not a receipt.
export interface TransferAuthority {
 reviewedTransfer(session:Session):Promise<ReviewedTransfer|null>;
}
export class Core2BTransferJourney {
 readonly #controller:CognitiveController;readonly #progress:DefaultProgressStore;readonly #authority:TransferAuthority;readonly #load:AssetLoader;
 constructor(controller:CognitiveController,progress:DefaultProgressStore,authority:TransferAuthority,load:AssetLoader){this.#controller=controller;this.#progress=progress;this.#authority=authority;this.#load=load;}
 async #review(session:Session,task:Ref,boundary:Ref,origin:Ref):Promise<ReviewedTransfer>{
  const result=await this.#authority.reviewedTransfer(structuredClone(session));
  if(!result)throw Error('TRANSFER_REVIEW_REQUIRED');
  const p=structuredClone(result);
  if(p.sessionId!==session.id||p.releaseId!==session.releaseId||!sameRef(p.task,task)||!sameRef(p.origin,origin)||!sameRef(p.boundary,boundary)||!refOk(p.anchor)||!['QUESTION','FRESH_TASK'].includes(p.anchor.type)||p.anchor.id===task.id||p.anchor.id===boundary.id||p.anchor.sha256===task.sha256||p.anchor.sha256===boundary.sha256||p.anchorSessionId===session.id||!refOk(p.review)||p.review.type!=='APPROVAL'||!['REPRESENTATION_SHIFT','CONSTRAINT_MUTATION','INFERENTIAL_INVERSION','COUPLING_EXPANSION'].includes(p.dimension))throw Error('TRANSFER_LINEAGE_MISMATCH');
  if(!Array.isArray(p.capabilities)||!p.capabilities.length||p.capabilities.some(x=>typeof x.id!=='string'||!x.id.trim()||!refOk(x.teaching)||x.teaching.type!=='LESSON'||!refOk(x.receipt)||x.receipt.type!=='APPROVAL')||new Set(p.capabilities.map(x=>x.id)).size!==p.capabilities.length)throw Error('TRANSFER_CLOSURE_REQUIRED');
  if(!Array.isArray(p.scaffolds)||p.scaffolds.some(x=>!['H1','H2','H3'].includes(x.capability)||!refOk(x.asset)||x.asset.type!=='ASSET')||new Set(p.scaffolds.map(x=>x.capability)).size!==p.scaffolds.length)throw Error('TRANSFER_SCAFFOLD_REVIEW_REQUIRED');
  const a=await this.#progress.committedAttempt(p.anchorSessionId,p.anchorAttemptId);
  if(!a||a.releaseId!==session.releaseId||!sameRef(a.item,p.anchor)||!a.work.length)throw Error('TRANSFER_ANCHOR_EVIDENCE_REQUIRED');
  // Re-resolve after durable read; revocation or changed review is not a reusable grant.
  const again=await this.#authority.reviewedTransfer(structuredClone(session));
  if(!again||canonicalJson(again)!==canonicalJson(p))throw Error('TRANSFER_REVIEW_CHANGED');
  return p;
 }
 async #evidence(cp:Checkpoint){
  const e=await this.#controller.readEvidence(cp);
  const review=await this.#review(e.session,e.context.task,e.context.boundaryTask,e.origin.item);
  return {e,review};
 }
 async begin(){
  const b=await this.#controller.describeBinding();
  await this.#review(b.session,b.context.task,b.context.boundaryTask,b.origin.item);
  const snapshot=await this.#controller.begin();
  return this.view(snapshot.checkpoint);
 }
 async view(checkpoint:Checkpoint){
  const cp=structuredClone(checkpoint),{e}=await this.#evidence(cp);
  const s=e.snapshot;
  // Deliberately exclude moves, boundary task, references, rubric, solution and raw events.
  return {stage:s.stage,checkpoint:structuredClone(s.checkpoint),firstCommitted:!!s.firstAttemptId,boundaryCommitted:!!s.boundaryAttemptId,assisted:s.assisted,academicAdmission:'HOLD' as const};
 }
 async commit(event:CognitiveEvent,checkpoint:Checkpoint,work:readonly WorkArtifact[],attempt?:Attempt,expectedDraftRevision?:number){
  const ev=structuredClone(event),cp=structuredClone(checkpoint),w=structuredClone(work),a=attempt&&structuredClone(attempt);
  const {review}=await this.#evidence(cp);
  if(ev.event_type==='HELP_EXPOSED'){
   const payload=ev.payload;
   if(!review.scaffolds.some(s=>s.capability===payload.capability&&sameRef(s.asset,payload.asset_ref)))throw Error('TRANSFER_SCAFFOLD_NOT_AUTHORIZED');
  }
  // A49/A48 own typed field validation, stage transition, CAS, persistence and readback.
  const snap=await this.#controller.commit(ev,cp,w,a,expectedDraftRevision);
  return this.view(snap.checkpoint);
 }
 async readStimulus(checkpoint:Checkpoint):Promise<string|null>{
  try{const cp=structuredClone(checkpoint),{e}=await this.#evidence(cp);
   const text=await this.#controller.readProtectedText('VIEW_STIMULUS',e.snapshot.stage==='BOUNDARY_TEST'?e.context.boundaryTask:e.context.task,cp,this.#load);
   await this.#evidence(cp);return text;
  }catch{return null;}
 }
 async readFirstReference(checkpoint:Checkpoint):Promise<string|null>{
  try{const cp=structuredClone(checkpoint),{e}=await this.#evidence(cp);const text=await this.#controller.readProtectedText('REFERENCE_SOLUTION',e.context.firstReference,cp,this.#load);await this.#evidence(cp);return text;}catch{return null;}
 }
 async readBoundaryReference(checkpoint:Checkpoint):Promise<string|null>{
  try{const cp=structuredClone(checkpoint),{e}=await this.#evidence(cp);const text=await this.#controller.readProtectedText('BOUNDARY_REFERENCE',e.context.boundaryReference,cp,this.#load);await this.#evidence(cp);return text;}catch{return null;}
 }
 async readScaffold(capability:HelpCapability,checkpoint:Checkpoint,exposureId:string):Promise<string|null>{
  try{const cp=structuredClone(checkpoint),{review}=await this.#evidence(cp),s=review.scaffolds.find(x=>x.capability===capability);if(!s)return null;const text=await this.#controller.readProtectedText(capability,s.asset,cp,this.#load,exposureId);await this.#evidence(cp);return text;}catch{return null;}
 }
 async readSourceReturn(checkpoint:Checkpoint){
  try{const cp=structuredClone(checkpoint),{e}=await this.#evidence(cp),o=e.meta.origin;
   if(!o||!await this.#controller.canDisplay('SOURCE_RETURN',o.ref,cp))return null;
   await this.#evidence(cp);return structuredClone(o);
  }catch{return null;}
 }
}
