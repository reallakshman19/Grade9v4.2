/** A30: synthetic paper controller. The authorized multipart task and A18
 * transaction are the only score/commit authority. Local snapshots are not receipts. */
import { HIT_TARGET_MIN_PX } from '../styles/tokens.ts';
import {PartNavigationController,type QuestionPartDescriptor,type PaperSectionDescriptor} from '../components/part-navigation.ts';
import {escapeHtml,sanitizeMarkup} from '../runtime/rendering.ts';
import {canonicalJson,computeSha256,sameRef} from '../runtime/loader.ts';
import {validateResponse} from '../runtime/response.ts';
import {StandardAssessmentEngine,SCORING_VERSION} from '../runtime/assessment.ts';
import {DefaultProgressStore,refOk,timestamp} from '../runtime/progress.ts';
import {Session} from '../runtime/session.ts';
import type {Attempt,Ref,TaskRef,Response,Kind,WorkArtifact,Json,Session as SessionRecord,Grade} from '../runtime/types.ts';
export type ExamAidKind='FORMULA_SHEET'|'PERIODIC_TABLE'|'CALCULATOR'|'SCRATCHPAD';
const aidKinds:readonly ExamAidKind[]=['FORMULA_SHEET','PERIODIC_TABLE','CALCULATOR','SCRATCHPAD'];
export interface SharedStimulus {readonly id:string;readonly title:string;readonly contentHtml:string;readonly mediaRef?:string}
export interface PaperQuestionPart extends QuestionPartDescriptor {
 readonly promptHtml:string;readonly responseKind?:Kind;
 /** Deprecated legacy input; intentionally discarded, never returned. */
 readonly solutionHtml?:string;readonly rubric?:{readonly criteria:readonly {readonly name:string;readonly points:number}[]};
}
export interface PaperWorkspaceConfig {readonly paperId:string;readonly paperTitle:string;readonly durationSeconds:number;readonly sections:readonly PaperSectionDescriptor[];readonly parts:readonly PaperQuestionPart[];readonly stimuli?:readonly SharedStimulus[];readonly allowedAids?:readonly ExamAidKind[]}
export interface PaperBinding {
 readonly paper:Ref<'PAPER'>;readonly definitionSha256:string;readonly task:TaskRef;readonly assessment:Ref<'ASSESSMENT'>;readonly releaseId:string;readonly attemptId:string;
 readonly session:Session;readonly progress:DefaultProgressStore;readonly engine:StandardAssessmentEngine;
 /** Trusted release bootstrap must verify actual mandatory stimulus/asset bytes and policy. */
 readonly verifyRequiredAssets:()=>Promise<boolean>;
}
type NavState=ReturnType<PartNavigationController['exportState']>;
export interface ExamTimerState {readonly durationSeconds:number;readonly elapsedSeconds:number;readonly remainingSeconds:number;readonly isPaused:boolean;readonly isExpired:boolean;readonly startedAt:string;readonly lastTickAt:string}
/** Absolute deadline, not tick count. A bound clock never pauses or accepts imported state. */
export class ExamTimer {
 private readonly durationSeconds:number;private readonly deadline:number;private readonly clock:()=>number;private floor:number;
 constructor(durationSeconds:number,deadlineAt?:string,clock:()=>number=Date.now){
  if(!Number.isSafeInteger(durationSeconds)||durationSeconds<1||durationSeconds>86400)throw Error('Invalid exam duration');
  this.durationSeconds=durationSeconds;this.clock=clock;this.floor=clock();this.deadline=deadlineAt===undefined?this.floor+durationSeconds*1000:Date.parse(deadlineAt);
  if(!Number.isFinite(this.deadline)||!Number.isFinite(this.floor))throw Error('Invalid deadline');
 }
 private now(){this.floor=Math.max(this.floor,this.clock());return this.floor;}
 getRemainingSeconds(){return Math.max(0,Math.min(this.durationSeconds,Math.ceil((this.deadline-this.now())/1000)));}
 getElapsedSeconds(){return this.durationSeconds-this.getRemainingSeconds();}
 getDurationSeconds(){return this.durationSeconds;}
 isExpired(){return this.now()>=this.deadline;}
 exportState():ExamTimerState{const remaining=this.getRemainingSeconds();return {durationSeconds:this.durationSeconds,elapsedSeconds:this.durationSeconds-remaining,remainingSeconds:remaining,isPaused:false,isExpired:this.isExpired(),startedAt:new Date(this.deadline-this.durationSeconds*1000).toISOString(),lastTickAt:new Date(this.floor).toISOString()};}
}
export type PaperEvaluationStatus='SCORED'|'REVIEW_PENDING'|'INCOMPLETE'|'HOLD';
export interface PartAttemptResult{readonly partId:string;readonly archetypeId:string;readonly status:'SCORED'|'REVIEW_PENDING'|'UNANSWERED';readonly points:number|null;readonly maxPoints:number;readonly responseValue:unknown}
export interface PaperEvaluationResult{readonly status:PaperEvaluationStatus;readonly totalPoints:number|null;readonly maxPoints:number;readonly partResults:readonly PartAttemptResult[];readonly isFinal:boolean;readonly summaryFeedback:string}
export interface PaperViewState{readonly paperId:string;readonly paperTitle:string;readonly isCommitted:boolean;readonly activePartId:string;readonly activeStimulus:SharedStimulus|null;readonly timer:ExamTimerState;readonly allowedAids:readonly ExamAidKind[];readonly activeAid:ExamAidKind|null;readonly evaluation:PaperEvaluationResult|null;readonly minHitTargetPx:number;readonly ready:boolean;readonly busy:boolean;readonly dirty:boolean}
type PublicPart=Omit<PaperQuestionPart,'solutionHtml'|'rubric'>;
function publicPart(p:PaperQuestionPart):PublicPart{
 return {id:p.id,partKey:p.partKey,sectionId:p.sectionId,label:p.label,maxPoints:p.maxPoints,archetypeId:p.archetypeId,promptHtml:sanitizeMarkup(p.promptHtml).html,...(p.responseKind?{responseKind:p.responseKind}:{}),...(p.isOptional!==undefined?{isOptional:p.isOptional}:{}),...(p.sharedStimulusId?{sharedStimulusId:p.sharedStimulusId}:{})};
}
function definition(config:PaperWorkspaceConfig){
 return {paperId:config.paperId,paperTitle:config.paperTitle,durationSeconds:config.durationSeconds,sections:config.sections.map(s=>({id:s.id,title:s.title,partIds:[...s.partIds],...(s.instructions!==undefined?{instructions:s.instructions}:{}),...(s.timeLimitSeconds!==undefined?{timeLimitSeconds:s.timeLimitSeconds}:{})})),parts:config.parts.map(publicPart),stimuli:(config.stimuli??[]).map(s=>({id:s.id,title:s.title,contentHtml:sanitizeMarkup(s.contentHtml).html,...(s.mediaRef?{mediaRef:s.mediaRef}:{})})),allowedAids:[...(config.allowedAids??[])]};
}
export async function paperDefinitionDigest(config:PaperWorkspaceConfig){return computeSha256(canonicalJson(definition(config)));}
function exactMax(parts:readonly PublicPart[]):number{
 let n=0n;for(const p of parts){if(!Number.isFinite(p.maxPoints)||p.maxPoints<0||p.maxPoints>1e9||!/^\d+(?:\.\d{1,6})?$/.test(String(p.maxPoints)))throw Error('Invalid paper max points');const [a,b='']=String(p.maxPoints).split('.');n+=BigInt(a+b.padEnd(6,'0'));}if(n>1000000000000000n)throw Error('Paper points exceed score domain');return Number(n)/1e6;
}
export class PaperWorkspaceController{
 private readonly config:ReturnType<typeof definition>;private readonly paperId:string;private readonly paperTitle:string;private readonly parts:readonly PublicPart[];private readonly navigation:PartNavigationController;private readonly binding?:PaperBinding;
 private timer:ExamTimer;private sessionRecord:SessionRecord|null=null;private responses=new Map<string,Response>();private work:readonly WorkArtifact[]=[];private activeAid:ExamAidKind|null=null;private evaluationResult:PaperEvaluationResult|null=null;private committed=false;private ready=false;private busy=false;private dirty=false;private revision=0;private readonly maxPoints:number;
 constructor(config:PaperWorkspaceConfig,binding?:PaperBinding){
  this.config=definition(config);this.paperId=this.config.paperId;this.paperTitle=this.config.paperTitle;this.parts=this.config.parts;this.maxPoints=exactMax(this.parts);
  this.navigation=new PartNavigationController({sections:this.config.sections,parts:this.parts});
  if(!this.paperId||new Set(this.config.stimuli.map(s=>s.id)).size!==this.config.stimuli.length||this.config.parts.some(p=>p.sharedStimulusId&&!this.config.stimuli.some(s=>s.id===p.sharedStimulusId))||this.config.allowedAids.some(a=>!aidKinds.includes(a))||new Set(this.config.allowedAids).size!==this.config.allowedAids.length)throw Error('Invalid paper definition');
  this.binding=binding&&{...binding,paper:structuredClone(binding.paper),task:structuredClone(binding.task),assessment:structuredClone(binding.assessment)};
  this.timer=new ExamTimer(config.durationSeconds);
 }
 getPaperId(){return this.paperId;}getPaperTitle(){return this.paperTitle;}
 getNavigation(){return this.navigation;}
 getTimer(){return this.timer;}
 private async bound():Promise<SessionRecord>{
  const b=this.binding;if(!b||!refOk(b.paper)||b.paper.type!=='PAPER'||b.paper.id!==this.paperId||!refOk(b.task)||!refOk(b.assessment)||b.definitionSha256!==await computeSha256(canonicalJson(this.config))||!b.attemptId.trim())throw Error('PAPER_NOT_AUTHORIZED');
  const s=await b.session.snapshot();
  if(s.mode!=='SIMULATED_EXAM'||s.releaseId!==b.releaseId||!sameRef(s.item,b.task)||!timestamp(s.deadlineAt))throw Error('PAPER_SESSION_MISMATCH');
  const spec=b.engine.describeMultipart(b.assessment,b.task);
  if(!spec||Object.keys(spec).length!==this.parts.length||this.parts.some(p=>!Object.hasOwn(spec,p.id)||spec[p.id].maxPoints!==p.maxPoints||spec[p.id].kind!==p.responseKind||p.isOptional)||this.config.sections.some(s=>s.timeLimitSeconds!==undefined))throw Error('UNSUPPORTED_OR_UNBOUND_PAPER_CONTRACT');
  if(this.sessionRecord&&(s.id!==this.sessionRecord.id||s.deadlineAt!==this.sessionRecord.deadlineAt||s.contentRevision!==this.sessionRecord.contentRevision))throw Error('PAPER_SESSION_CHANGED');
  if(!this.sessionRecord)this.timer=new ExamTimer(this.config.durationSeconds,s.deadlineAt);
  this.sessionRecord=s;return s;
 }
 private editable(){return this.ready&&!this.busy&&!this.committed&&!this.timer.isExpired();}
 setPartResponse(partId:string,value:unknown):boolean{
  const p=this.parts.find(x=>x.id===partId);if(!p||!this.editable())return false;
  try{const v=validateResponse(value);if(v.kind!==p.responseKind)return false;this.responses.set(partId,structuredClone(v));this.navigation.setPartStatus(partId,'ATTEMPTED');this.dirty=true;return true;}catch{return false;}
 }
 getPartResponse(partId:string){return structuredClone(this.responses.get(partId));}
 updateWork(work:readonly WorkArtifact[]):boolean{
  if(!this.editable()||work.some(w=>w.id.startsWith('paper-state:')))return false;this.work=structuredClone(work);this.dirty=true;return true;
 }
 openAid(aid:ExamAidKind):{allowed:boolean;content?:string;error?:string}{
  if(!this.editable()||!this.config.allowedAids.includes(aid))return {allowed:false,error:'Aid forbidden by examination rules or unqualified session.'};this.activeAid=aid;return {allowed:true,content:'Configured aid: '+aid};
 }
 closeAid(){this.activeAid=null;}
 getSolution(_partId:string):{allowed:boolean;solutionHtml?:string;error?:string}{return {allowed:false,error:'Solutions sealed by simulated examination policy; separate authorized review required.'};}
 private wire():Response{return validateResponse({kind:'MULTIPART',value:Object.fromEntries(this.responses)});}
 private async stateArtifact(s:SessionRecord,response:Response):Promise<WorkArtifact>{
  const nav=this.navigation.exportState();for(const p of this.parts){nav.statuses[p.id]=this.responses.has(p.id)?'ATTEMPTED':nav.statuses[p.id]==='UNVISITED'?'UNVISITED':'VIEWED';}
  const value={schema:'g9-paper-editor/1',paper:this.binding!.paper,definitionSha256:this.binding!.definitionSha256,assessment:this.binding!.assessment,sessionId:s.id,releaseId:s.releaseId,deadlineAt:s.deadlineAt,navigation:nav,responseSha256:await computeSha256(canonicalJson(response))};
  return {id:'paper-state:'+await computeSha256(canonicalJson(value)),kind:'NOTE',version:1,value:value as unknown as Json};
 }
 private async hydrate(s:SessionRecord,response:Response,artifacts:readonly WorkArtifact[]){
  if(response.kind!=='MULTIPART')throw Error('INVALID_PAPER_RESPONSE');
  const next=new Map<string,Response>();for(const [id,v] of Object.entries(response.value)){const p=this.parts.find(x=>x.id===id);if(!p||p.responseKind!==v.kind)throw Error('FOREIGN_PAPER_PART');next.set(id,validateResponse(v));}
  const states=artifacts.filter(w=>w.id.startsWith('paper-state:'));if(states.length!==1)throw Error('PAPER_STATE_MISSING');
  const a=states[0],v=a.value as any;
  if(a.kind!=='NOTE'||a.version!==1||a.id!=='paper-state:'+await computeSha256(canonicalJson(v))||v.schema!=='g9-paper-editor/1'||!sameRef(v.paper,this.binding!.paper)||v.definitionSha256!==this.binding!.definitionSha256||!sameRef(v.assessment,this.binding!.assessment)||v.sessionId!==s.id||v.releaseId!==s.releaseId||v.deadlineAt!==s.deadlineAt||v.responseSha256!==await computeSha256(canonicalJson(response)))throw Error('PAPER_STATE_MISMATCH');
  const nav=v.navigation as NavState;for(const p of this.parts)if(nav.statuses[p.id]==='COMPLETED'||(nav.statuses[p.id]==='ATTEMPTED')!==next.has(p.id))throw Error('PAPER_NAVIGATION_MISMATCH');
  this.navigation.restoreState(nav);this.responses=next;this.work=structuredClone(artifacts.filter(w=>w!==a));
 }
 private sealed():PaperEvaluationResult{
  return {status:'REVIEW_PENDING',totalPoints:null,maxPoints:this.maxPoints,partResults:this.parts.map(p=>({partId:p.id,archetypeId:p.archetypeId,status:this.responses.has(p.id)?'REVIEW_PENDING':'UNANSWERED',points:null,maxPoints:p.maxPoints,responseValue:structuredClone(this.responses.get(p.id)??null)})),isFinal:false,summaryFeedback:'Durably committed. Scores and solutions sealed by examination policy; separate authorized review required.'};
 }
 private async recover(s:SessionRecord):Promise<boolean>{
  if(!s.attemptIds.length)return false;const b=this.binding!,a=await b.progress.committedAttempt(s.id,b.attemptId);
  if(!a||a.id!==b.attemptId||!a.assessmentRef||!sameRef(a.assessmentRef,b.assessment)||a.scoringVersion!==SCORING_VERSION||a.cognitive!==null||a.hintIds.length)throw Error('UNQUALIFIED_PAPER_COMMIT');
  await this.hydrate(s,a.response,a.work);this.committed=true;this.activeAid=null;this.evaluationResult=this.sealed();this.dirty=false;return true;
 }
 async restore():Promise<void>{
  if(this.busy)throw Error('PAPER_BUSY');this.busy=true;this.ready=false;
  try{const s=await this.bound();if(!await this.recover(s)){const d=await this.binding!.progress.loadDraft(s.id);if(d){if(d.cognitive||d.session.id!==s.id||d.session.releaseId!==s.releaseId||!sameRef(d.session.item,s.item)||d.session.deadlineAt!==s.deadlineAt)throw Error('FOREIGN_PAPER_DRAFT');await this.hydrate(s,d.response,d.artifacts);this.revision=d.revision;}else{this.responses.clear();this.work=[];this.revision=0;}this.committed=false;this.evaluationResult=null;this.dirty=false;}this.ready=true;}finally{this.busy=false;}
 }
 async saveDraft():Promise<void>{
  if(!this.editable())throw Error('PAPER_LOCKED');this.busy=true;
  try{const b=this.binding!,s=await this.bound();if(s.attemptIds.length)throw Error('PAPER_COMMITTED');const response=this.wire(),art=await this.stateArtifact(s,response);await b.progress.saveDraft(s,response,[...this.work,art],this.revision);this.revision++;this.dirty=false;}finally{this.busy=false;}
 }
 async submitPaper():Promise<PaperEvaluationResult>{
  if(!this.ready||this.busy)throw Error('PAPER_NOT_READY');this.busy=true;
  try{const b=this.binding!,s=await this.bound();if(s.attemptIds.length){if(!this.committed)throw Error('PAPER_ALREADY_COMMITTED_RESTORE_REQUIRED');if(await this.recover(s))return structuredClone(this.evaluationResult!);}
   if(this.timer.isExpired())throw Error('PAPER_DEADLINE_PASSED');if(!await b.verifyRequiredAssets())throw Error('REQUIRED_ASSET_UNAVAILABLE');
   const response=this.wire(),grade=await b.engine.evaluate(response,b.assessment,'SIMULATED_EXAM',b.task);
   if(grade.status==='UNSUPPORTED'||grade.status==='INVALID'&&grade.reasonCode!=='MISSING_REQUIRED_PART')throw Error('PAPER_RESPONSE_INVALID');
   // Incomplete-but-nonempty multipart attempts retain exact A17 INVALID/missing grade;
   // no total is inferred and the examination UI does not expose private part grades.
   const art=await this.stateArtifact(s,response);
   const attempt:Attempt={id:b.attemptId,sessionId:s.id,releaseId:s.releaseId,item:b.task,response,work:[...this.work,art],hintIds:[],submittedAt:new Date().toISOString(),grade,assessmentRef:b.assessment,scoringVersion:SCORING_VERSION,cognitive:null};
   const committed=await b.session.appendAttempt(attempt,this.revision);await this.hydrate(s,committed.response,committed.work);this.committed=true;this.activeAid=null;this.evaluationResult=this.sealed();this.dirty=false;return structuredClone(this.evaluationResult);
  }finally{this.busy=false;}
 }
 /** Diagnostic snapshot only. Cannot restore a commitment or deadline from caller bytes. */
 exportSession(){return {paperId:this.paperId,isCommitted:this.committed,timerState:this.timer.exportState(),navigationState:this.navigation.exportState(),responses:structuredClone(Object.fromEntries(this.responses))};}
 restoreSession(_saved:unknown):never{throw Error('Use durable restore(); untrusted snapshots cannot restore exam authority');}
 getViewState():PaperViewState{
  const active=this.navigation.getActivePart();return {paperId:this.paperId,paperTitle:this.paperTitle,isCommitted:this.committed,activePartId:this.navigation.getActivePartId(),activeStimulus:structuredClone(this.config.stimuli.find(s=>s.id===active?.sharedStimulusId)??null),timer:this.timer.exportState(),allowedAids:this.ready&&!this.committed&&!this.timer.isExpired()?[...this.config.allowedAids]:[],activeAid:this.activeAid,evaluation:structuredClone(this.evaluationResult),minHitTargetPx:HIT_TARGET_MIN_PX,ready:this.ready,busy:this.busy,dirty:this.dirty};
 }
  render(): string {
    const state = this.getViewState();
    const activePart = this.parts.find((p) => p.id === state.activePartId);
    const navHtml = this.navigation.renderHtml();

    const mins = Math.floor(state.timer.remainingSeconds / 60);
    const secs = state.timer.remainingSeconds % 60;
    const timeDisplay = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;

    const aidsHtml = state.allowedAids
      .map(
        (aid) => `
        <button class="aid-toggle-btn" data-aid="${aid}" style="min-height: ${HIT_TARGET_MIN_PX}px; min-width: ${HIT_TARGET_MIN_PX}px; padding: 8px 12px; background: ${state.activeAid === aid ? '#dbeafe' : '#f1f5f9'}; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 13px; font-weight: 600;">
          ${aid.replace(/_/g, ' ')}
        </button>`
      )
      .join('');

    const stimulusHtml = state.activeStimulus
      ? `<aside class="shared-stimulus-pane" aria-label="Shared Stimulus" style="flex: 1; padding: 16px; background: #fdfbf7; border: 1px solid #fef08a; border-radius: 8px; margin-bottom: 16px;">
          <h3 style="margin-top: 0; font-size: 16px; color: #854d0e;">Stimulus: ${escapeHtml(String(state.activeStimulus.title))}</h3>
          <div>${state.activeStimulus.contentHtml}</div>
        </aside>`
      : '';

    return `
      <div class="paper-workspace" style="display: flex; flex-direction: column; gap: 16px; max-width: 1200px; margin: 0 auto; padding: 16px;">
        <header class="paper-header" style="display: flex; justify-content: space-between; align-items: center; padding-bottom: 12px; border-bottom: 2px solid #e2e8f0;">
          <div>
            <h1 style="margin: 0; font-size: 20px; color: #0f172a;">${escapeHtml(String(this.paperTitle))}</h1>
            <span style="font-size: 13px; color: #64748b;">Archetypes: ${escapeHtml(String(this.parts.map((p) => p.archetypeId).join(', ')))}</span>
          </div>
          <div class="timer-badge" style="display: flex; align-items: center; gap: 8px; padding: 8px 16px; background: ${state.timer.isExpired ? '#fee2e2' : '#f8fafc'}; border: 1px solid #cbd5e1; border-radius: 8px;">
            <span style="font-size: 14px; font-weight: 600; color: ${state.timer.isExpired ? '#991b1b' : '#1e293b'};">⏱ Time Remaining: ${timeDisplay}</span>
          </div>
        </header>

        <div class="aids-bar" style="display: flex; gap: 8px; align-items: center;">
          <span style="font-size: 13px; font-weight: 600; color: #475569;">Configured Aids:</span>
          ${aidsHtml || '<span style="font-size: 13px; color: #94a3b8;">None permitted</span>'}
        </div>

        <div class="paper-layout" style="display: grid; grid-template-columns: 280px 1fr; gap: 20px;">
          <aside class="paper-sidebar">
            ${navHtml}
          </aside>

          <main class="paper-content" style="display: flex; flex-direction: column;">
            ${stimulusHtml}
            <article class="question-part-pane" style="padding: 16px; background: #ffffff; border: 1px solid #cbd5e1; border-radius: 8px;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                <h2 style="margin: 0; font-size: 18px;">Part ${escapeHtml(String(activePart?.partKey))}: ${escapeHtml(String(activePart?.label || ''))}</h2>
                <span style="font-size: 13px; background: #f1f5f9; padding: 4px 8px; border-radius: 4px;">[${escapeHtml(String(activePart?.archetypeId))}] ${escapeHtml(String(activePart?.maxPoints))} pts</span>
              </div>
              <div class="part-prompt" style="font-size: 15px; margin-bottom: 16px;">
                ${activePart?.promptHtml || '<p>No part selected.</p>'}
              </div>
            </article>

            <div style="margin-top: 16px; display: flex; justify-content: flex-end;">
              <button id="submit-paper-btn" ${!state.ready||state.busy||state.isCommitted||state.timer.isExpired?'disabled':''} style="min-height: ${HIT_TARGET_MIN_PX}px; min-width: ${HIT_TARGET_MIN_PX}px; padding: 12px 24px; background: #16a34a; color: #ffffff; border: none; border-radius: 6px; font-size: 16px; font-weight: 600;">
                Submit Complete Paper
              </button>
            </div>
          </main>
        </div>
      </div>
    `;
  }
}
