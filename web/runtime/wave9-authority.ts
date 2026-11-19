// W9-INT-02: trusted composition seam, not a public learner-side authority.
// The authenticated server/release bootstrap must supply a provisioned digest and
// live authorization check. Never derive either from route, local storage or request data.
// No production catalog, private content, secret or approved academic receipt is bundled.
import {canonicalJson,computeSha256,sameRef} from './loader.ts';
import {DefaultProgressStore,refOk} from './progress.ts';
import {DefaultCognitiveStore} from './cognitive-store.ts';
import type {StorageDriver} from './storage.ts';
import {CognitiveController,type CognitiveAuthority,type ReviewedTaskContext} from '../journeys/cognitive-controller.ts';
import {Core2BTransferJourney,type ReviewedTransfer,type TransferAuthority} from '../journeys/core2b.ts';
import {Core2ASupportedJourney,type ReviewedPracticeCheck,type PracticeCheckAuthority} from '../journeys/core2a.ts';
import {ProgressivePresentationController,StageGatedFeedbackController,strictObject,exactKeys,nonblank,type SupportedLocale,type PresentationLevel,type AssetLoader} from './presentation.ts';
import {Core1OrientationJourney} from '../journeys/core1.ts';
import type {Checkpoint,DisclosureCapability,JourneyKey,Ref,Session,TaskRef} from './types.ts';

export interface SessionBinding {
 readonly id:string;readonly item:Ref;readonly origin:Ref|null;
 readonly contentRevision:string;readonly mode:'LEARN'|'PRACTICE';
}
export interface Wave9PageBinding {
 readonly resourceId:string;readonly review:Ref<'APPROVAL'>;
 readonly projection?:Ref<'PRESENTATION'>;
 readonly presentations?:readonly {readonly locale:SupportedLocale;readonly level:PresentationLevel;readonly asset:Ref<'PRESENTATION'>}[];
 readonly print?:{readonly projection:Ref<'PRESENTATION'>;readonly pdf:Ref<'ASSET'>;readonly review:Ref<'APPROVAL'>};
 readonly transferDefinitionSha256?:string;
 readonly assessmentA?:Ref<'ASSESSMENT'>;readonly assessmentB?:Ref<'ASSESSMENT'>;
 readonly practiceAssessment?:Ref<'ASSESSMENT'>;
 readonly choices?:{readonly first?:Readonly<Record<string,readonly {readonly id:string;readonly label:string}[]>>;readonly boundary?:Readonly<Record<string,readonly {readonly id:string;readonly label:string}[]>>};
 readonly sourceRoute?:{readonly role:'CORE1'|'CORE1A'|'CORE1B'|'CORE2'|'CORE2A'|'CORE2B';readonly resourceId:string;readonly sessionId:string;readonly origin:Ref;readonly cursor:number;readonly projection?:Ref<'ASSET'>;readonly review?:Ref<'APPROVAL'>};
}
export interface Wave9Catalog {
 readonly schema:'g9-wave9-authority/1';
 readonly learnerId:string;readonly role:'CORE1'|'CORE2A'|'CORE2B';
 readonly journey:JourneyKey;readonly sessionId:string;readonly originSessionId:string;readonly boundarySessionId:string;
 readonly context:ReviewedTaskContext;readonly sessions:readonly SessionBinding[];
 readonly grants:readonly {readonly capability:DisclosureCapability;readonly asset:Ref}[];
 readonly page?:Wave9PageBinding;
 readonly practice?:ReviewedPracticeCheck;
 readonly transfer?:ReviewedTransfer;
}
export interface LiveScope {
 readonly learnerId:string;readonly releaseId:string;readonly catalogSha256:string;
}
// This callback is a TRUSTED service dependency. It must verify the current authenticated
// principal, exact active release/catalog pin and revocation state, not echo request flags.
export type LiveAuthorization=(scope:LiveScope)=>Promise<boolean>;
const eq=(a:unknown,b:unknown)=>canonicalJson(a)===canonicalJson(b);
const text=(x:unknown):x is string=>typeof x==='string'&&!!x.trim()&&x.length<=256;
const task=(r:Ref)=>refOk(r)&&['QUESTION','FRESH_TASK'].includes(r.type);
const sameNullable=(a:Ref|null,b:Ref|null)=>a===null&&b===null||a!==null&&b!==null&&sameRef(a,b);
function requireThat(condition:unknown,code:string):asserts condition {if(!condition)throw Error(code);}
function validate(c:Wave9Catalog){
 const j=c.journey,x=c.context;
 requireThat(c.schema==='g9-wave9-authority/1'&&text(c.learnerId)&&['CORE1','CORE2A','CORE2B'].includes(c.role)&&text(j.journeyId)&&text(j.taskInstanceId)&&text(j.releaseId)&&task(j.task),'INVALID_CATALOG');
 requireThat(x.releaseId===j.releaseId&&sameRef(x.task,j.task)&&task(x.boundaryTask)&&x.boundaryTask.id!==j.task.id&&x.boundaryTask.sha256!==j.task.sha256&&refOk(x.firstReference)&&x.firstReference.type==='SOLUTION'&&refOk(x.boundaryReference)&&x.boundaryReference.type==='SOLUTION'&&x.firstReference.id!==x.boundaryReference.id&&x.firstReference.sha256!==x.boundaryReference.sha256,'INVALID_CONTEXT');
 requireThat(Array.isArray(c.sessions)&&c.sessions.length>=3&&c.sessions.every(s=>text(s.id)&&refOk(s.item)&&(s.origin===null||refOk(s.origin))&&text(s.contentRevision)&&['LEARN','PRACTICE'].includes(s.mode))&&new Set(c.sessions.map(s=>s.id)).size===c.sessions.length,'INVALID_SESSION_BINDINGS');
 const binding=(id:string)=>c.sessions.find(s=>s.id===id);
 const s=binding(c.sessionId),o=binding(c.originSessionId),b=binding(c.boundarySessionId);
 requireThat(s&&o&&b&&new Set([s.id,o.id,b.id]).size===3&&sameRef(s.item,j.task)&&sameRef(b.item,x.boundaryTask)&&s.origin&&sameRef(s.origin,o.item)&&b.origin&&sameRef(b.origin,o.item),'INVALID_ORIGIN_BOUNDARY');
 if(x.reasoningCrux)requireThat(c.role==='CORE2A'&&refOk(x.reasoningCrux)&&x.reasoningCrux.type==='ASSET'&&![j.task,x.boundaryTask,x.firstReference,x.boundaryReference].some(r=>r.id===x.reasoningCrux!.id||r.sha256===x.reasoningCrux!.sha256)&&!c.grants.some(g=>sameRef(g.asset,x.reasoningCrux!)&&g.capability!=='SHOW_REASONING_CRUX'),'INVALID_CRUX');
 requireThat(Array.isArray(c.grants)&&c.grants.every(g=>refOk(g.asset))&&new Set(c.grants.map(g=>canonicalJson(g))).size===c.grants.length,'INVALID_GRANTS');
 for(const g of c.grants){
  const a=g.asset,cap=g.capability;
  const valid=cap==='VIEW_STIMULUS'&&(sameRef(a,j.task)||sameRef(a,x.boundaryTask)||a.type==='PRESENTATION')||
    cap==='REFERENCE_SOLUTION'&&sameRef(a,x.firstReference)||
    cap==='SHOW_REASONING_CRUX'&&!!x.reasoningCrux&&sameRef(a,x.reasoningCrux)||
    cap==='BOUNDARY_REFERENCE'&&sameRef(a,x.boundaryReference)||
    cap==='SOURCE_RETURN'&&sameRef(a,o.item)||
    ['H1','H2','H3'].includes(cap)&&a.type==='ASSET';
  requireThat(valid,'INVALID_GRANT_BINDING');
 }
 if(c.page){
  const p=c.page;
  requireThat(/^[A-Za-z][A-Za-z0-9._:-]{2,127}$/.test(p.resourceId)&&refOk(p.review)&&p.review.type==='APPROVAL','INVALID_PAGE_BINDING');
  if(p.presentations){
   requireThat(c.role==='CORE2A'&&Array.isArray(p.presentations)&&p.presentations.length>0&&new Set(p.presentations.map(v=>v.locale+':'+v.level)).size===p.presentations.length&&new Set(p.presentations.map(v=>v.asset.id)).size===p.presentations.length&&p.presentations.every(v=>['en-US','hi-IN'].includes(v.locale)&&['INTUITION','MODEL','FORMAL'].includes(v.level)&&refOk(v.asset)&&v.asset.type==='PRESENTATION'&&c.grants.some(g=>g.capability==='VIEW_STIMULUS'&&sameRef(g.asset,v.asset)))&&p.presentations.some(v=>v.locale==='en-US'&&v.level==='FORMAL'&&sameRef(v.asset,p.projection!)),'INVALID_PRESENTATION_BINDING');
  }
  const isolated=(r:Ref)=>refOk(r)&&r.type==='ASSET'&&![j.task,x.boundaryTask,x.firstReference,x.boundaryReference,o.item,...c.grants.map(g=>g.asset)].some(a=>a.id===r.id||a.sha256===r.sha256);
  if(p.print)requireThat(c.role==='CORE1'&&sameRef(p.print.projection,p.projection!)&&isolated(p.print.pdf)&&refOk(p.print.review)&&p.print.review.type==='APPROVAL','INVALID_PRINT_BINDING');
  if(p.sourceRoute?.projection)requireThat(isolated(p.sourceRoute.projection)&&refOk(p.sourceRoute.review)&&p.sourceRoute.review!.type==='APPROVAL','INVALID_SOURCE_PROJECTION');
  else if(p.sourceRoute?.review)throw Error('SOURCE_PROJECTION_REQUIRED');
  if(p.practiceAssessment)requireThat(c.role==='CORE2A'&&refOk(p.practiceAssessment)&&p.practiceAssessment.type==='ASSESSMENT','INVALID_PRACTICE_ASSESSMENT');
  if(p.sourceRoute){const d=p.sourceRoute;requireThat(c.role==='CORE2B'&&['CORE1','CORE1A','CORE1B','CORE2','CORE2A','CORE2B'].includes(d.role)&&/^[A-Za-z][A-Za-z0-9._:-]{2,127}$/.test(d.resourceId)&&d.sessionId===o.id&&sameRef(d.origin,o.item)&&Number.isSafeInteger(d.cursor)&&d.cursor>=0,'INVALID_SOURCE_ROUTE');}
  if(p.choices){for(const side of ['first','boundary'] as const){const fields=side==='first'?x.firstFields:x.boundaryFields;for(const [id,opts] of Object.entries(p.choices[side]??{}))requireThat(Object.hasOwn(fields,id)&&['SINGLE_CHOICE','MULTIPLE_CHOICE'].includes(fields[id])&&Array.isArray(opts)&&opts.length>=2&&opts.every(o=>text(o.id)&&text(o.label))&&new Set(opts.map(o=>o.id)).size===opts.length,'INVALID_CHOICE_BINDING');}}
  if(c.role==='CORE2B')requireThat(!p.projection&&typeof p.transferDefinitionSha256==='string'&&/^[a-f0-9]{64}$/.test(p.transferDefinitionSha256)&&refOk(p.assessmentA)&&p.assessmentA!.type==='ASSESSMENT'&&refOk(p.assessmentB)&&p.assessmentB!.type==='ASSESSMENT','INVALID_TRANSFER_PAGE_BINDING');
  else requireThat(refOk(p.projection)&&p.projection!.type==='PRESENTATION'&&c.grants.some(g=>g.capability==='VIEW_STIMULUS'&&sameRef(g.asset,p.projection!))&&!p.transferDefinitionSha256&&!p.assessmentA&&!p.assessmentB,'INVALID_PROJECTION_PAGE_BINDING');
 }
 if(c.role==='CORE2A'){
  const p=c.practice,k=p&&binding(p.checkSessionId);
  requireThat(p&&k&&!c.transfer&&p.releaseId===j.releaseId&&p.practiceSessionId===s.id&&sameRef(p.practiceTask,j.task)&&task(p.checkTask)&&p.checkTask.id!==j.task.id&&p.checkTask.id!==x.boundaryTask.id&&p.checkTask.sha256!==j.task.sha256&&p.checkTask.sha256!==x.boundaryTask.sha256&&![s.id,o.id,b.id].includes(k.id)&&sameRef(k.item,p.checkTask)&&k.origin&&sameRef(k.origin,j.task)&&refOk(p.assessment)&&p.assessment.type==='ASSESSMENT'&&refOk(p.review)&&p.review.type==='APPROVAL'&&text(p.attemptId),'INVALID_PRACTICE_REVIEW');
 }else if(c.role==='CORE2B'){
  const p=c.transfer,k=p&&binding(p.anchorSessionId);
  requireThat(p&&k&&!c.practice&&p.releaseId===j.releaseId&&p.sessionId===s.id&&sameRef(p.task,j.task)&&sameRef(p.origin,o.item)&&sameRef(p.boundary,x.boundaryTask)&&task(p.anchor)&&p.anchor.id!==j.task.id&&p.anchor.id!==x.boundaryTask.id&&p.anchor.sha256!==j.task.sha256&&p.anchor.sha256!==x.boundaryTask.sha256&&![s.id,o.id,b.id].includes(k.id)&&sameRef(k.item,p.anchor)&&k.origin&&sameRef(k.origin,o.item)&&text(p.anchorAttemptId)&&refOk(p.review)&&p.review.type==='APPROVAL'&&['REPRESENTATION_SHIFT','CONSTRAINT_MUTATION','INFERENTIAL_INVERSION','COUPLING_EXPANSION'].includes(p.dimension),'INVALID_TRANSFER_REVIEW');
  requireThat(Array.isArray(p.capabilities)&&p.capabilities.length>0&&p.capabilities.every(k=>text(k.id)&&refOk(k.teaching)&&k.teaching.type==='LESSON'&&refOk(k.receipt)&&k.receipt.type==='APPROVAL')&&new Set(p.capabilities.map(k=>k.id)).size===p.capabilities.length,'INVALID_TAUGHT_CLOSURE');
  requireThat(Array.isArray(p.scaffolds)&&p.scaffolds.every(g=>['H1','H2','H3'].includes(g.capability)&&refOk(g.asset)&&g.asset.type==='ASSET'&&c.grants.some(a=>a.capability===g.capability&&sameRef(a.asset,g.asset)))&&new Set(p.scaffolds.map(g=>g.capability)).size===p.scaffolds.length&&c.grants.filter(g=>['H1','H2','H3'].includes(g.capability)).every(g=>p.scaffolds.some(a=>a.capability===g.capability&&sameRef(a.asset,g.asset))),'INVALID_TRANSFER_SCAFFOLD');
 }else requireThat(!c.practice&&!c.transfer,'ROLE_REVIEW_MISMATCH');
}
class BoundAuthority implements CognitiveAuthority,PracticeCheckAuthority,TransferAuthority{
 readonly #c:Wave9Catalog;readonly #scope:LiveScope;readonly #driver:StorageDriver;readonly #progress:DefaultProgressStore;readonly #live:LiveAuthorization;
 constructor(c:Wave9Catalog,digest:string,driver:StorageDriver,progress:DefaultProgressStore,live:LiveAuthorization){
  this.#c=structuredClone(c);this.#scope={learnerId:c.learnerId,releaseId:c.journey.releaseId,catalogSha256:digest};this.#driver=driver;this.#progress=progress;this.#live=live;
 }
 async #active(){return await this.#live(structuredClone(this.#scope))===true;}
 #matches(s:Session,b:SessionBinding){return s.id===b.id&&s.releaseId===this.#c.journey.releaseId&&sameRef(s.item,b.item)&&sameNullable(s.origin,b.origin)&&s.mode===b.mode&&s.contentRevision===b.contentRevision;}
 async #current(){
  if(!await this.#active())return false;
  for(const b of this.#c.sessions){const s=await this.#driver.get<Session>('sessions',b.id);if(!s||!this.#matches(s,b))return false;}
  const p=this.#c.transfer;
  if(p){const a=await this.#progress.committedAttempt(p.anchorSessionId,p.anchorAttemptId);if(!a||a.releaseId!==p.releaseId||!sameRef(a.item,p.anchor)||!a.work.length)return false;}
  return await this.#active();
 }
 async #bound(j:JourneyKey,s:Session){return eq(j,this.#c.journey)&&s.id===this.#c.sessionId&&this.#matches(s,this.#c.sessions.find(b=>b.id===s.id)!)&&await this.#current();}
 async liveRevision(s:Session){const b=this.#c.sessions.find(b=>b.id===s.id);return b&&this.#matches(s,b)&&await this.#current()?b.contentRevision:'';}
 async reviewedContext(j:JourneyKey,s:Session){return await this.#bound(j,s)?structuredClone(this.#c.context):null;}
 async allowed(j:JourneyKey,s:Session,capability:DisclosureCapability,asset:Ref){return await this.#bound(j,s)&&this.#c.grants.some(g=>g.capability===capability&&sameRef(g.asset,asset));}
 async boundaryAllowed(j:JourneyKey,boundary:Ref){return eq(j,this.#c.journey)&&sameRef(boundary,this.#c.context.boundaryTask)&&await this.#current();}
 async reviewedCheck(sessionId:string,task:TaskRef,releaseId:string){
  const p=this.#c.practice;
  return p&&p.practiceSessionId===sessionId&&p.releaseId===releaseId&&sameRef(p.practiceTask,task)&&await this.#current()?structuredClone(p):null;
 }
 async reviewedTransfer(s:Session){const p=this.#c.transfer;return p&&await this.#bound(this.#c.journey,s)?structuredClone(p):null;}
}
export async function composeWave9(
 catalog:Wave9Catalog,provisionedDigest:string,
 driver:StorageDriver,progress:DefaultProgressStore,
 live:LiveAuthorization,load:AssetLoader
){
 // Clone before the first await. Only the trusted bootstrap can provide this pin.
 const c=structuredClone(catalog);
 requireThat(/^[a-f0-9]{64}$/.test(provisionedDigest)&&await computeSha256(canonicalJson(c))===provisionedDigest,'CATALOG_PIN_MISMATCH');
 validate(c);
 const authority=new BoundAuthority(c,provisionedDigest,driver,progress,live);
 const controller=new CognitiveController({journey:c.journey,sessionId:c.sessionId,originSessionId:c.originSessionId},new DefaultCognitiveStore(driver,progress),driver,authority);
 // Controller is returned for trusted host composition only; do not expose it or the
 // catalog, loader, driver, or progress store to untrusted learner code.
 const orientation=c.role==='CORE1'?new Core1OrientationJourney(controller,load):null;
 const transfer=c.role==='CORE2B'?new Core2BTransferJourney(controller,progress,authority,load):null;
 // Separate artifact grants are pinned in the catalog and are never general stimulus/help grants.
 // The trusted asset service must independently enforce this same authorization.
 const readPrintPDF=async(checkpoint:Checkpoint):Promise<Uint8Array|null>=>{
  const p=c.page?.print,cp=structuredClone(checkpoint);
  try{
   if(!p||!orientation||!await orientation.read(p.projection,cp))return null;
   const bytes=Uint8Array.from(await load(structuredClone(p.pdf)));
   if(bytes.length<12||bytes.length>20000000||await computeSha256(bytes)!==p.pdf.sha256||!new TextDecoder().decode(bytes.subarray(0,8)).startsWith('%PDF-')||!new TextDecoder().decode(bytes.subarray(-1024)).trimEnd().endsWith('%%EOF')||!await orientation.read(p.projection,cp))return null;
   return bytes;
  }catch{return null;}
 };
 const readReturnedSource=async(checkpoint:Checkpoint)=>{
  const p=c.page?.sourceRoute,cp=structuredClone(checkpoint);
  try{
   if(!p?.projection||!transfer)return null;
   const match=async()=>{const o=await transfer.readSourceReturn(cp);return !!o&&o.sessionId===p.sessionId&&sameRef(o.ref,p.origin)&&o.cursor===p.cursor;};
   if(!await match())return null;
   const bytes=Uint8Array.from(await load(structuredClone(p.projection)));
   if(!bytes.length||bytes.length>2000000||await computeSha256(bytes)!==p.projection.sha256)return null;
   const raw=strictObject(new TextDecoder('utf-8',{fatal:true}).decode(bytes));
   if(!exactKeys(raw,['origin','sessionId','cursor','role','resourceId','text'])||!refOk(raw.origin)||!sameRef(raw.origin as Ref,p.origin)||raw.sessionId!==p.sessionId||raw.cursor!==p.cursor||raw.role!==p.role||raw.resourceId!==p.resourceId||!nonblank(raw.text)||!await match())return null;
   return {text:raw.text,cursor:p.cursor,role:p.role,resourceId:p.resourceId};
  }catch{return null;}
 };
 return {controller,presentation:new ProgressivePresentationController(controller,load),feedback:new StageGatedFeedbackController(controller,load),
  orientation,practice:c.role==='CORE2A'?new Core2ASupportedJourney(controller,progress,authority):null,transfer,readPrintPDF,readReturnedSource};
}
