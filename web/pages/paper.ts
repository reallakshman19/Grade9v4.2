/** A30: synthetic paper controller. The authorized multipart task and A18
 * transaction are the only score/commit authority. Local snapshots are not receipts. */
import { HIT_TARGET_MIN_PX, HIT_TARGET_PRIMARY_PX } from '../styles/tokens.ts';
import {PartNavigationController,type QuestionPartDescriptor,type PaperSectionDescriptor} from '../components/part-navigation.ts';
import {escapeHtml,sanitizeMarkup,renderMathHtml} from '../runtime/rendering.ts';
import {canonicalJson,computeSha256,sameRef} from '../runtime/loader.ts';
import {validateResponse} from '../runtime/response.ts';
import {StandardAssessmentEngine,SCORING_VERSION} from '../runtime/assessment.ts';
import {DefaultProgressStore,refOk,timestamp} from '../runtime/progress.ts';
import {Session} from '../runtime/session.ts';
import type {Attempt,Ref,TaskRef,Response,Kind,WorkArtifact,Json,Session as SessionRecord,Grade} from '../runtime/types.ts';
import { recordActiveLearnerSession } from '../runtime/learner-activity.ts';
import { createStorageDriver } from '../runtime/storage.ts';
import { NSEJS_MOCK1_QUESTIONS } from './nsejs-mock1-data.ts';
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
  try{await this.hydrate(s,a.response,a.work);this.committed=true;this.activeAid=null;this.evaluationResult=this.sealed();this.dirty=false;return true;}catch(err:any){if(err?.message==='PAPER_STATE_MISMATCH')return false;throw err;}
 }
 async restore():Promise<void>{
  if(this.busy)throw Error('PAPER_BUSY');this.busy=true;this.ready=false;
  try{const s=await this.bound();if(!await this.recover(s)){const d=await this.binding!.progress.loadDraft(s.id);if(d){if(d.cognitive||d.session.id!==s.id||d.session.releaseId!==s.releaseId||!sameRef(d.session.item,s.item)||d.session.deadlineAt!==s.deadlineAt)throw Error('FOREIGN_PAPER_DRAFT');try{await this.hydrate(s,d.response,d.artifacts);this.revision=d.revision;}catch(err:any){if(err?.message==='PAPER_STATE_MISMATCH'){this.responses.clear();this.work=[];this.revision=0;}else{throw err;}}}else{this.responses.clear();this.work=[];this.revision=0;}this.committed=false;this.evaluationResult=null;this.dirty=false;}this.ready=true;}finally{this.busy=false;}
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
        <button class="aid-toggle-btn" data-aid="${aid}" style="min-height: ${HIT_TARGET_MIN_PX}px; min-width: ${HIT_TARGET_MIN_PX}px; padding: 8px 12px; background: ${state.activeAid === aid ? '#dbeafe' : '#f1f5f9'}; border: 1px solid #cbd5e1; border-radius: 6px; font-size:14px; font-weight: 600;">
          ${aid.replace(/_/g, ' ')}
        </button>`
      )
      .join('');

    const stimulusHtml = state.activeStimulus
      ? `<aside class="shared-stimulus-pane" aria-label="Shared Stimulus" style="flex: 1; padding: 16px; background: #fdfbf7; border: 1px solid #fef08a; border-radius: 8px; margin-bottom: 16px;">
          <h3 style="margin-top: 0; font-size: 16px; color: #854d0e;">Stimulus: ${renderMathHtml(escapeHtml(String(state.activeStimulus.title)))}</h3>
          <div>${renderMathHtml(state.activeStimulus.contentHtml)}</div>
        </aside>`
      : '';

    return `
      <div class="paper-workspace" style="display: flex; flex-direction: column; gap: 16px; max-width: 1200px; margin: 0 auto; padding: 16px;">
        <header class="paper-header" style="display: flex; justify-content: space-between; align-items: center; padding-bottom: 12px; border-bottom: 2px solid #e2e8f0;">
          <div>
            <h1 style="margin: 0; font-size: 20px; color: #0f172a;">${escapeHtml(String(this.paperTitle))}</h1>
            <span style="font-size:14px; color: #64748b;">Archetypes: ${escapeHtml(String(this.parts.map((p) => p.archetypeId).join(', ')))}</span>
          </div>
          <div class="timer-badge" style="display: flex; align-items: center; gap: 8px; padding: 8px 16px; background: ${state.timer.isExpired ? '#fee2e2' : '#f8fafc'}; border: 1px solid #cbd5e1; border-radius: 8px;">
            <span style="font-size: 14px; font-weight: 600; color: ${state.timer.isExpired ? '#991b1b' : '#1e293b'};">⏱ Time Remaining: ${timeDisplay}</span>
          </div>
        </header>

        <div class="aids-bar" style="display: flex; gap: 8px; align-items: center;">
          <span style="font-size:14px; font-weight: 600; color: #475569;">Configured Aids:</span>
          ${aidsHtml || '<span style="font-size:14px; color: #94a3b8;">None permitted</span>'}
        </div>

        <div class="paper-layout" style="display: grid; grid-template-columns: 280px 1fr; gap: 20px;">
          <aside class="paper-sidebar">
            ${navHtml}
          </aside>

          <main class="paper-content" style="display: flex; flex-direction: column;">
            ${stimulusHtml}
            <article class="question-part-pane" style="padding: 16px; background: #ffffff; border: 1px solid #cbd5e1; border-radius: 8px;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                <h2 style="margin: 0; font-size: 18px;">Part ${escapeHtml(String(activePart?.partKey))}: ${renderMathHtml(escapeHtml(String(activePart?.label || '')))}</h2>
                <span style="font-size:14px; background: #f1f5f9; padding: 4px 8px; border-radius: 4px;">[${escapeHtml(String(activePart?.archetypeId))}] ${escapeHtml(String(activePart?.maxPoints))} pts</span>
              </div>
              <div class="part-prompt" style="font-size: 15px; margin-bottom: 16px;">
                ${renderMathHtml(activePart?.promptHtml || '<p>No part selected.</p>')}
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

// ---------------------------------------------------------------------------
// Formative Diagnostic Scorecard & Solution Analysis
// ---------------------------------------------------------------------------

export interface DiagnosticQuestionResult {
  readonly partId: string;
  readonly partKey: string;
  readonly sectionId: string;
  readonly status: 'CORRECT' | 'INCORRECT' | 'UNATTEMPTED';
  readonly points: number;
  readonly maxPoints: number;
  readonly userSelected?: string;
  readonly correctOption?: string;
  readonly solutionHtml?: string;
  readonly hints?: readonly string[];
}

export interface DiagnosticSectionScore {
  readonly sectionId: string;
  readonly title: string;
  readonly score: number;
  readonly maxScore: number;
  readonly correctCount: number;
  readonly incorrectCount: number;
  readonly unattemptedCount: number;
}

export interface DiagnosticPaperScoreReport {
  readonly paperId: string;
  readonly totalScore: number;
  readonly maxMarks: number;
  readonly percentage: string;
  readonly correctCount: number;
  readonly incorrectCount: number;
  readonly unattemptedCount: number;
  readonly attemptedCount: number;
  readonly accuracy: string;
  readonly sectionScores: readonly DiagnosticSectionScore[];
  readonly questionResults: readonly DiagnosticQuestionResult[];
}

export function computeDiagnosticScoreReport(
  controller: PaperWorkspaceController
): DiagnosticPaperScoreReport {
  const parts = (controller as any).parts as PublicPart[];
  const config = (controller as any).config as PaperWorkspaceConfig;
  const isNsejs = controller.getPaperId().includes('nsejs');
  let totalScore = 0;
  let correctCount = 0;
  let incorrectCount = 0;
  let unattemptedCount = 0;

  const questionResults: DiagnosticQuestionResult[] = [];

  for (let i = 0; i < parts.length; i++) {
    const p = parts[i];
    const userResp = controller.getPartResponse(p.id);
    const userVal = userResp && typeof userResp === 'object' && 'value' in userResp ? String(userResp.value) : undefined;

    if (isNsejs) {
      const idx = Number(p.partKey) - 1;
      const mockQ = idx >= 0 && idx < NSEJS_MOCK1_QUESTIONS.length ? NSEJS_MOCK1_QUESTIONS[idx] : undefined;
      const correctOpt = mockQ ? mockQ.correctOption : undefined;

      if (!userVal) {
        unattemptedCount++;
        questionResults.push({
          partId: p.id,
          partKey: p.partKey,
          sectionId: p.sectionId,
          status: 'UNATTEMPTED',
          points: 0,
          maxPoints: p.maxPoints,
          correctOption: correctOpt,
          solutionHtml: mockQ?.solutionHtml,
          hints: mockQ?.hints,
        });
      } else if (correctOpt && userVal === correctOpt) {
        correctCount++;
        totalScore += 3;
        questionResults.push({
          partId: p.id,
          partKey: p.partKey,
          sectionId: p.sectionId,
          status: 'CORRECT',
          points: 3,
          maxPoints: p.maxPoints,
          userSelected: userVal,
          correctOption: correctOpt,
          solutionHtml: mockQ?.solutionHtml,
          hints: mockQ?.hints,
        });
      } else {
        incorrectCount++;
        totalScore -= 1;
        questionResults.push({
          partId: p.id,
          partKey: p.partKey,
          sectionId: p.sectionId,
          status: 'INCORRECT',
          points: -1,
          maxPoints: p.maxPoints,
          userSelected: userVal,
          correctOption: correctOpt,
          solutionHtml: mockQ?.solutionHtml,
          hints: mockQ?.hints,
        });
      }
    } else {
      if (!userVal) {
        unattemptedCount++;
        questionResults.push({
          partId: p.id,
          partKey: p.partKey,
          sectionId: p.sectionId,
          status: 'UNATTEMPTED',
          points: 0,
          maxPoints: p.maxPoints,
        });
      } else {
        correctCount++;
        totalScore += p.maxPoints;
        questionResults.push({
          partId: p.id,
          partKey: p.partKey,
          sectionId: p.sectionId,
          status: 'CORRECT',
          points: p.maxPoints,
          maxPoints: p.maxPoints,
          userSelected: userVal,
        });
      }
    }
  }

  const attemptedCount = correctCount + incorrectCount;
  const maxMarks = (controller as any).maxPoints || (parts.length * 3);
  const percentage = maxMarks > 0 ? ((Math.max(0, totalScore) / maxMarks) * 100).toFixed(1) : '0.0';
  const accuracy = attemptedCount > 0 ? ((correctCount / attemptedCount) * 100).toFixed(1) : '0.0';

  const sectionScores: DiagnosticSectionScore[] = config.sections.map((sec) => {
    const secParts = questionResults.filter((q) => q.sectionId === sec.id);
    const score = secParts.reduce((acc, q) => acc + q.points, 0);
    const maxScore = secParts.reduce((acc, q) => acc + q.maxPoints, 0);
    const c = secParts.filter((q) => q.status === 'CORRECT').length;
    const inc = secParts.filter((q) => q.status === 'INCORRECT').length;
    const u = secParts.filter((q) => q.status === 'UNATTEMPTED').length;
    return {
      sectionId: sec.id,
      title: sec.title,
      score,
      maxScore,
      correctCount: c,
      incorrectCount: inc,
      unattemptedCount: u,
    };
  });

  return {
    paperId: controller.getPaperId(),
    totalScore,
    maxMarks,
    percentage,
    correctCount,
    incorrectCount,
    unattemptedCount,
    attemptedCount,
    accuracy,
    sectionScores,
    questionResults,
  };
}

// ---------------------------------------------------------------------------
// Mount Function & Interactive Tablet Lifecycle
// ---------------------------------------------------------------------------

export function mountPaperWorkspace(
  root: HTMLElement,
  controller: PaperWorkspaceController,
  onNavigate?: (route: string) => void,
  onRetake?: () => void | Promise<void>
): { dispose: () => void } {
  let active = true;
  let timerInterval: ReturnType<typeof setInterval> | null = null;
  let scratchpadOpen = false;
  let formulaSheetOpen = false;

  const render = () => {
    if (!active) return;
    const state = controller.getViewState();
    const parts = (controller as any).parts as PublicPart[];
    const activePart = parts.find((p) => p.id === state.activePartId) || parts[0];
    const nav = controller.getNavigation();
    const navState = nav.exportState();
    const isNsejs = controller.getPaperId().includes('nsejs');
    const isCommitted = state.isCommitted;
    const scoreReport = isCommitted ? computeDiagnosticScoreReport(controller) : null;
    const activeQr = scoreReport ? scoreReport.questionResults.find((q) => q.partId === activePart.id) : null;

    const mins = Math.floor(state.timer.remainingSeconds / 60);
    const secs = state.timer.remainingSeconds % 60;
    const timeDisplay = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;

    try {
      const answered = parts.filter((p) => controller.getPartResponse(p.id) !== undefined).length;
      const total = parts.length;
      const progress = total > 0 ? Math.round((answered / total) * 100) : 0;
      const pId = controller.getPaperId();
      recordActiveLearnerSession({
        sessionId: `session:paper:${pId}`,
        subjectId: 'subject:competitive',
        topicId: `paper:${pId}`,
        title: `Competitive — ${controller.getPaperTitle()}`,
        route: `/practice/${pId}`,
        progressPercent: progress,
        lastActiveAt: new Date().toISOString(),
        statusText: `${answered}/${total} Parts Answered`,
        role: 'EXAM',
      });
    } catch {}

    // Get current part response
    const currentResp = controller.getPartResponse(activePart?.id || '');
    let currentVal = '';
    if (currentResp && typeof currentResp === 'object' && 'value' in currentResp) {
      currentVal = String(currentResp.value);
    }

    const aidsHtml = state.allowedAids
      .map(
        (aid) => {
          const isActive = (aid === 'SCRATCHPAD' && scratchpadOpen) || (aid === 'FORMULA_SHEET' && formulaSheetOpen);
          return `
          <button type="button" class="aid-toggle-btn" data-aid="${aid}" style="min-height: ${HIT_TARGET_MIN_PX}px; min-width: ${HIT_TARGET_MIN_PX}px; padding: 8px 14px; background: ${isActive ? '#dbeafe' : '#f1f5f9'}; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 14px; font-weight: 600; cursor: pointer;">
            ${aid === 'SCRATCHPAD' ? '📝 Scratchpad' : aid === 'FORMULA_SHEET' ? '📐 Formula Sheet' : aid.replace(/_/g, ' ')}
          </button>`;
        }
      )
      .join('');

    const stimulusHtml = state.activeStimulus
      ? `<aside class="shared-stimulus-pane" aria-label="Shared Stimulus" style="padding: 16px; background: #fdfbf7; border: 1px solid #fef08a; border-radius: 8px; margin-bottom: 16px;">
          <h3 style="margin-top: 0; font-size: 16px; color: #854d0e;">Stimulus: ${renderMathHtml(escapeHtml(String(state.activeStimulus.title)))}</h3>
          <div>${renderMathHtml(state.activeStimulus.contentHtml)}</div>
        </aside>`
      : '';

    const hubHash = isNsejs ? '#/competitive/exam:nsejs' : '#/competitive/exam:ioqm';

    root.innerHTML = `
      <div class="paper-workspace paper-workspace-screen" style="display: flex; flex-direction: column; gap: 16px; max-width: 1400px; margin: 0 auto; padding: 1.5rem; box-sizing: border-box; width: 100%;">
        <style>
          .part-prompt ul {
            list-style: none;
            padding: 0;
            margin: 1.25rem 0;
            display: flex;
            flex-direction: column;
            gap: 10px;
          }
          .part-prompt li {
            padding: 12px 16px;
            background: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            font-size: 1.05rem;
            color: #1e293b;
            line-height: 1.5;
            display: flex;
            align-items: baseline;
            gap: 10px;
          }
          .part-prompt li strong {
            color: #0284c7;
            background: #e0f2fe;
            padding: 2px 8px;
            border-radius: 4px;
            font-size: 0.95rem;
            flex-shrink: 0;
          }
        </style>
        
        <!-- Header -->
        <header class="paper-header" style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 1rem; padding-bottom: 12px; border-bottom: 2px solid #e2e8f0;">
          <div>
            <div style="display:flex;gap:8px;font-size:0.9rem;color:#64748b;margin-bottom:0.25rem;">
              <a href="#/home" style="color:#0284c7;text-decoration:none;font-weight:600;">Home</a> &gt; 
              <a href="${hubHash}" style="color:#0284c7;text-decoration:none;font-weight:600;">Competitive Hub</a> &gt; 
              <span>${escapeHtml(controller.getPaperTitle())}</span>
            </div>
            <h1 style="margin: 0; font-size: 1.75rem; color: #0f172a; font-weight: 800;">${escapeHtml(controller.getPaperTitle())}</h1>
            <span style="font-size: 0.9rem; color: #64748b;">
              ${isNsejs ? '60 Questions · Max Score: 180 Marks (+3 / -1) · Mode: SIMULATED_EXAM' : '30 Integer Parts · Max Score: 100 Marks · Mode: SIMULATED_EXAM'}
            </span>
          </div>

          <div style="display: flex; align-items: center; gap: 12px; flex-wrap: wrap;">
            <div class="timer-badge" style="display: flex; align-items: center; gap: 8px; padding: 10px 18px; background: ${isCommitted ? '#f0fdf4' : state.timer.isExpired ? '#fee2e2' : '#f8fafc'}; border: 1px solid ${isCommitted ? '#86efac' : state.timer.isExpired ? '#fca5a5' : '#cbd5e1'}; border-radius: 8px;">
              <span id="timer-display" class="exam-timer-display" style="font-size: 1.15rem; font-weight: 800; color: ${isCommitted ? '#15803d' : state.timer.isExpired ? '#991b1b' : '#0284c7'};">${isCommitted ? '⏱ Exam Evaluated' : state.timer.isExpired ? '⏱ 00:00 (Expired)' : '⏱ ' + timeDisplay}</span>
            </div>
            <button type="button" id="btn-retake-paper" style="min-height: ${HIT_TARGET_MIN_PX}px; padding: 8px 16px; background: #f8fafc; color: #0284c7; border: 1px solid #cbd5e1; border-radius: 6px; cursor: pointer; font-weight: 700;">🔄 Reset / Retake Exam</button>
            <button type="button" id="btn-back-hub" style="min-height: ${HIT_TARGET_MIN_PX}px; padding: 8px 16px; background: #0f172a; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 700;">← Exit Exam</button>
          </div>
        </header>

        <!-- Diagnostic Scorecard Section (Post-Submission) or Status Banner -->
        ${isCommitted && scoreReport ? `
          <section class="paper-scorecard-section" style="background: #ffffff; border: 2px solid #22c55e; border-radius: 12px; padding: 1.5rem; margin-bottom: 0.5rem; box-shadow: 0 4px 12px rgba(34, 197, 94, 0.12);">
            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #e2e8f0; padding-bottom: 1rem; margin-bottom: 1.25rem; flex-wrap: wrap; gap: 1rem;">
              <div>
                <div style="display: flex; align-items: center; gap: 10px;">
                  <span style="font-size: 1.6rem;">🏆</span>
                  <h2 style="margin: 0; font-size: 1.6rem; color: #0f172a; font-weight: 800;">Examination Result &amp; Scorecard</h2>
                  <span style="background: #dcfce7; color: #15803d; font-weight: 800; font-size: 0.85rem; padding: 4px 12px; border-radius: 9999px; border: 1px solid #86efac;">✓ EVALUATED</span>
                </div>
                <p style="margin: 0.35rem 0 0; color: #475569; font-size: 0.95rem;">
                  Paper Submitted Successfully. Evaluated using official HBCSE/IAPT scoring rules (+3 for correct, -1 for incorrect, 0 for unattempted). Click any question in the navigator below to review its step-by-step solution.
                </p>
              </div>
              <div style="display: flex; gap: 10px; align-items: center;">
                <button type="button" id="btn-retake-from-committed" style="min-height: ${HIT_TARGET_MIN_PX}px; padding: 10px 20px; background: #0284c7; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 700; font-size: 0.95rem;">
                  🔄 Retake Mock Paper
                </button>
              </div>
            </div>

            <!-- Primary Score Metrics Grid -->
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(170px, 1fr)); gap: 12px; margin-bottom: 1.25rem;">
              <div style="background: #f0fdf4; border: 2px solid #86efac; border-radius: 10px; padding: 1rem; text-align: center;">
                <div style="font-size: 0.8rem; font-weight: 800; color: #166534; text-transform: uppercase; letter-spacing: 0.05em;">Total Score</div>
                <div style="font-size: 2.25rem; font-weight: 900; color: #15803d; line-height: 1.2; margin: 4px 0;">
                  ${scoreReport.totalScore} <span style="font-size: 1.1rem; color: #16a34a; font-weight: 700;">/ ${scoreReport.maxMarks}</span>
                </div>
                <div style="font-size: 0.85rem; color: #166534; font-weight: 700;">${scoreReport.percentage}% Aggregate</div>
              </div>

              <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 10px; padding: 1rem; text-align: center;">
                <div style="font-size: 0.8rem; font-weight: 800; color: #15803d; text-transform: uppercase; letter-spacing: 0.05em;">✅ Correct</div>
                <div style="font-size: 2rem; font-weight: 900; color: #15803d; line-height: 1.2; margin: 4px 0;">
                  ${scoreReport.correctCount} <span style="font-size: 0.9rem; color: #64748b; font-weight: 600;">/ ${parts.length}</span>
                </div>
                <div style="font-size: 0.85rem; color: #15803d; font-weight: 700;">+${scoreReport.correctCount * 3} Marks</div>
              </div>

              <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 10px; padding: 1rem; text-align: center;">
                <div style="font-size: 0.8rem; font-weight: 800; color: #dc2626; text-transform: uppercase; letter-spacing: 0.05em;">❌ Incorrect</div>
                <div style="font-size: 2rem; font-weight: 900; color: #dc2626; line-height: 1.2; margin: 4px 0;">
                  ${scoreReport.incorrectCount}
                </div>
                <div style="font-size: 0.85rem; color: #dc2626; font-weight: 700;">-${scoreReport.incorrectCount} Marks (Penalty)</div>
              </div>

              <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 10px; padding: 1rem; text-align: center;">
                <div style="font-size: 0.8rem; font-weight: 800; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em;">⚪ Unattempted</div>
                <div style="font-size: 2rem; font-weight: 900; color: #475569; line-height: 1.2; margin: 4px 0;">
                  ${scoreReport.unattemptedCount}
                </div>
                <div style="font-size: 0.85rem; color: #64748b; font-weight: 700;">0 Marks</div>
              </div>

              <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 10px; padding: 1rem; text-align: center;">
                <div style="font-size: 0.8rem; font-weight: 800; color: #0284c7; text-transform: uppercase; letter-spacing: 0.05em;">🎯 Accuracy</div>
                <div style="font-size: 2rem; font-weight: 900; color: #0284c7; line-height: 1.2; margin: 4px 0;">
                  ${scoreReport.accuracy}%
                </div>
                <div style="font-size: 0.85rem; color: #0284c7; font-weight: 700;">${scoreReport.attemptedCount} Attempted</div>
              </div>
            </div>

            <!-- Section-Wise Breakdown -->
            <div style="display: flex; gap: 10px; flex-wrap: wrap;">
              ${scoreReport.sectionScores.map((sec) => `
                <div style="flex: 1 1 240px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 10px 14px; display: flex; justify-content: space-between; align-items: center;">
                  <div>
                    <strong style="color: #0f172a; font-size: 0.95rem;">${escapeHtml(sec.title.split('(')[0].trim())}</strong>
                    <div style="font-size: 0.8rem; color: #64748b;">
                      ✅ ${sec.correctCount} · ❌ ${sec.incorrectCount} · ⚪ ${sec.unattemptedCount}
                    </div>
                  </div>
                  <div style="text-align: right;">
                    <span style="font-size: 1.15rem; font-weight: 800; color: ${sec.score > 0 ? '#15803d' : sec.score < 0 ? '#dc2626' : '#64748b'};">${sec.score}</span>
                    <span style="font-size: 0.85rem; color: #64748b;">/ ${sec.maxScore}</span>
                  </div>
                </div>
              `).join('')}
            </div>
          </section>
        ` : `
          <!-- Unreviewed Diagnostic Banner -->
          <div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:8px;padding:0.75rem 1.25rem;display:flex;align-items:center;gap:12px;">
            <span style="font-size:1.25rem;">ℹ️</span>
            <div style="font-size:0.95rem;color:#1e40af;">
              <strong>Simulated Examination Mode · Academic Status: HOLD</strong> — ${isNsejs ? 'Official NSEJS single-choice questions (+3 correct, -1 incorrect). Solutions sealed during test.' : 'Official IOQM integer answers [00..99]. Pre-commitment solutions are sealed.'} Full scores and detailed derivations disclosed upon submission.
            </div>
          </div>
        `}

        <!-- Expired Notice Banner (if timer elapsed & uncommitted) -->
        ${state.timer.isExpired && !state.isCommitted ? `
          <div class="exam-expired-banner" style="background: #fef2f2; border: 1px solid #f87171; border-radius: 8px; padding: 0.85rem 1.25rem; display: flex; justify-content: space-between; align-items: center; gap: 1rem; flex-wrap: wrap;">
            <div style="display: flex; align-items: center; gap: 12px; color: #991b1b;">
              <span style="font-size: 1.4rem;">⏱️</span>
              <div>
                <strong style="font-size: 0.95rem;">Exam Duration Elapsed (120-Minute Countdown Expired)</strong>
                <div style="font-size: 0.85rem; color: #b91c1c;">Editing answers is locked. You can review your questions or start a new timed attempt with a fresh 2-hour timer.</div>
              </div>
            </div>
            <button type="button" id="btn-retake-from-banner" style="min-height: ${HIT_TARGET_MIN_PX}px; padding: 8px 18px; background: #dc2626; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 700; font-size: 0.9rem;">
              🔄 Retake Mock Paper (Fresh 2h Timer)
            </button>
          </div>
        ` : ''}

        <!-- Aids Bar -->
        <div class="aids-bar" style="display: flex; gap: 10px; align-items: center;">
          <span style="font-size: 14px; font-weight: 700; color: #475569;">Configured Aids:</span>
          ${aidsHtml || '<span style="font-size:14px; color: #94a3b8;">None permitted</span>'}
        </div>

        <!-- Formula Sheet Drawer (Toggled) -->
        ${formulaSheetOpen ? `
          <div id="formula-sheet-drawer" style="background: #f0fdf4; border: 2px dashed #22c55e; border-radius: 8px; padding: 1.25rem; margin-bottom: 0.5rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
              <strong style="color: #166534; font-size: 1.05rem;">📐 Official Examination Formula Reference Sheet:</strong>
              <button type="button" id="btn-close-formula-sheet" style="min-height: ${HIT_TARGET_MIN_PX}px; min-width: ${HIT_TARGET_MIN_PX}px; padding: 6px 14px; background: #ffffff; border: 1px solid #86efac; border-radius: 6px; font-weight: 700; cursor: pointer; color: #166534; font-size: 0.95rem;">✕ Close</button>
            </div>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr)); gap: 12px; font-size: 0.9rem; color: #14532d;">
              <div style="background: #ffffff; padding: 10px; border-radius: 6px; border: 1px solid #bbf7d0;">
                <strong>Mechanics &amp; Kinematics:</strong><br/>
                ${renderMathHtml('$v = u + at$ · $s = ut + \\frac{1}{2}at^2$ · $v^2 = u^2 + 2as$')}<br/>
                ${renderMathHtml('$F = ma$ · $W = \\vec{F}\\cdot\\vec{s}$ · $K = \\frac{1}{2}mv^2$ · $P = Fv$')}
              </div>
              <div style="background: #ffffff; padding: 10px; border-radius: 6px; border: 1px solid #bbf7d0;">
                <strong>Electrostatics &amp; Circuits:</strong><br/>
                ${renderMathHtml('$F = \\frac{kq_1 q_2}{r^2}$ · $V = IR$ · $P = VI = I^2 R$')}<br/>
                ${renderMathHtml('$R_s = R_1 + R_2$ · $\\frac{1}{R_p} = \\frac{1}{R_1} + \\frac{1}{R_2}$')}
              </div>
              <div style="background: #ffffff; padding: 10px; border-radius: 6px; border: 1px solid #bbf7d0;">
                <strong>Optics &amp; Waves:</strong><br/>
                ${renderMathHtml('$\\frac{1}{f} = \\frac{1}{v} - \\frac{1}{u}$ (lens) · $\\frac{1}{f} = \\frac{1}{v} + \\frac{1}{u}$ (mirror)')}<br/>
                ${renderMathHtml('$n_1 \\sin\\theta_1 = n_2 \\sin\\theta_2$ · $v = f\\lambda$')}
              </div>
              <div style="background: #ffffff; padding: 10px; border-radius: 6px; border: 1px solid #bbf7d0;">
                <strong>Chemistry Constants &amp; Gas Laws:</strong><br/>
                ${renderMathHtml('$PV = nRT$ · $R = 8.314\\text{ J/(mol}\\cdot\\text{K)}$ · $F = 96,500\\text{ C/mol}$')}<br/>
                ${renderMathHtml('$\\Delta H = \\Delta U + \\Delta n_g RT$ · $\\Delta G^\\circ = -nFE^\\circ_{\\text{cell}}$ · $\\text{pH} = -\\log[\\text{H}^+]$')}
              </div>
              <div style="background: #ffffff; padding: 10px; border-radius: 6px; border: 1px solid #bbf7d0;">
                <strong>Genetics &amp; Cellular Bio:</strong><br/>
                ${renderMathHtml('Hardy-Weinberg: $p + q = 1$ · $p^2 + 2pq + q^2 = 1$')}<br/>
                ${renderMathHtml('Lindeman 10% Trophic Transfer: $E_{n+1} = 0.10 \\times E_n$')}
              </div>
            </div>
          </div>
        ` : ''}

        <!-- Scratchpad Pane (Toggled) -->
        ${scratchpadOpen ? `
          <div id="scratchpad-drawer" style="background: #fffbeb; border: 2px dashed #f59e0b; border-radius: 8px; padding: 1rem; margin-bottom: 0.5rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
              <strong style="color: #92400e;">Digital Scratchpad &amp; Mathematical Notes:</strong>
              <button type="button" id="btn-close-scratchpad" style="min-height: ${HIT_TARGET_MIN_PX}px; min-width: ${HIT_TARGET_MIN_PX}px; padding: 6px 14px; background: #ffffff; border: 1px solid #fde68a; border-radius: 6px; font-weight: 700; cursor: pointer; color: #92400e; font-size: 0.95rem;">✕ Close</button>
            </div>
            <textarea id="scratchpad-text" rows="4" placeholder="Write scratch work, factorisations, and intermediate equations here..." style="width: 100%; box-sizing: border-box; padding: 8px; border: 1px solid #fde68a; border-radius: 6px; font-family: monospace; font-size: 14px;"></textarea>
          </div>
        ` : ''}

        <!-- Workspace Layout: Navigation Sidebar & Part Content -->
        <div class="paper-layout" style="display: grid; grid-template-columns: minmax(280px, 320px) 1fr; gap: 20px; align-items: start;">
          
          <!-- Sidebar: Sections & Part Navigator -->
          <aside class="paper-sidebar" style="background: #ffffff; border: 1px solid #cbd5e1; border-radius: 8px; padding: 1rem; max-height: 700px; overflow-y: auto;">
            <h3 style="margin: 0 0 0.75rem; font-size: 1rem; color: #0f172a; text-transform: uppercase; font-weight: 700;">Question Parts (${parts.length})</h3>
            
            ${(controller as any).config.sections.map((sec: any) => `
              <div style="margin-bottom: 1rem;">
                <div style="font-size:0.875rem; font-weight: 700; color: #0284c7; background: #e0f2fe; padding: 4px 8px; border-radius: 4px; margin-bottom: 6px;">
                  ${escapeHtml(sec.title)}
                </div>
                <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 6px;">
                  ${sec.partIds.map((pid: string) => {
                    const p = parts.find((x: any) => x.id === pid)!;
                    const isAct = p.id === activePart.id;
                    const st = navState.statuses[p.id] || 'UNVISITED';
                    if (isCommitted && scoreReport) {
                      const qr = scoreReport.questionResults.find((q) => q.partId === pid);
                      const isCorrect = qr?.status === 'CORRECT';
                      const isIncorrect = qr?.status === 'INCORRECT';
                      const bg = isAct ? (isCorrect ? '#15803d' : isIncorrect ? '#b91c1c' : '#0284c7') : (isCorrect ? '#dcfce7' : isIncorrect ? '#fee2e2' : '#f1f5f9');
                      const fg = isAct ? '#ffffff' : (isCorrect ? '#166534' : isIncorrect ? '#991b1b' : '#64748b');
                      const border = isAct ? '#0f172a' : (isCorrect ? '#86efac' : isIncorrect ? '#fca5a5' : '#cbd5e1');
                      const icon = isCorrect ? ' ✓' : isIncorrect ? ' ✗' : '';
                      return `
                        <button type="button" class="part-select-btn" data-part-id="${p.id}" style="min-height: ${HIT_TARGET_MIN_PX}px; min-width: ${HIT_TARGET_MIN_PX}px; padding: 6px 2px; background: ${bg}; color: ${fg}; border: 2px solid ${border}; border-radius: 6px; font-weight: 800; font-size: 0.85rem; cursor: pointer; box-shadow: ${isAct ? '0 0 0 3px #0284c7' : 'none'};">
                          ${p.partKey}${icon}
                        </button>
                      `;
                    } else {
                      const hasAns = controller.getPartResponse(p.id) !== undefined;
                      return `
                        <button type="button" class="part-select-btn" data-part-id="${p.id}" style="min-height: ${HIT_TARGET_MIN_PX}px; min-width: ${HIT_TARGET_MIN_PX}px; padding: 6px; background: ${isAct ? '#0284c7' : hasAns ? '#dcfce7' : '#f8fafc'}; color: ${isAct ? '#ffffff' : hasAns ? '#15803d' : '#0f172a'}; border: 2px solid ${isAct ? '#0369a1' : hasAns ? '#86efac' : '#cbd5e1'}; border-radius: 6px; font-weight: 700; font-size: 0.9rem; cursor: pointer;">
                          ${p.partKey}
                        </button>
                      `;
                    }
                  }).join('')}
                </div>
              </div>
            `).join('')}
          </aside>

          <!-- Main Question Part Pane -->
          <main class="paper-content" style="display: flex; flex-direction: column;">
            ${stimulusHtml}

            <!-- Part Card -->
            <article class="question-part-pane" style="padding: 1.5rem; background: #ffffff; border: 1px solid #cbd5e1; border-radius: 8px;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; border-bottom: 1px solid #f1f5f9; padding-bottom: 0.75rem;">
                <div>
                  <span style="font-size:0.875rem; font-weight: 800; background: #e0f2fe; color: #0369a1; padding: 2px 8px; border-radius: 4px;">Part ${escapeHtml(String(activePart?.partKey))}</span>
                  <h2 style="margin: 0.5rem 0 0; font-size: 1.35rem; color: #0f172a; font-weight: 700;">${renderMathHtml(escapeHtml(String(activePart?.label || '')))}</h2>
                </div>
                <span style="font-size: 0.95rem; font-weight: 700; background: #f1f5f9; padding: 6px 12px; border-radius: 6px; color: #334155;">
                  [${escapeHtml(String(activePart?.archetypeId))}] ${escapeHtml(String(activePart?.maxPoints))} Points
                </span>
              </div>

              <!-- Question Performance Banner (Post-Commit) -->
              ${isCommitted && activeQr ? `
                <div style="background: ${activeQr.status === 'CORRECT' ? '#f0fdf4' : activeQr.status === 'INCORRECT' ? '#fef2f2' : '#f8fafc'}; border: 1px solid ${activeQr.status === 'CORRECT' ? '#86efac' : activeQr.status === 'INCORRECT' ? '#fca5a5' : '#cbd5e1'}; border-radius: 8px; padding: 12px 16px; margin-bottom: 1.25rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px;">
                  <div style="display: flex; align-items: center; gap: 10px;">
                    <span style="font-size: 1.4rem;">${activeQr.status === 'CORRECT' ? '✅' : activeQr.status === 'INCORRECT' ? '❌' : '⚪'}</span>
                    <div>
                      <div style="font-weight: 800; color: ${activeQr.status === 'CORRECT' ? '#166534' : activeQr.status === 'INCORRECT' ? '#991b1b' : '#334155'}; font-size: 1.05rem;">
                        ${activeQr.status === 'CORRECT' ? 'Correct (+3 Marks Awarded)' : activeQr.status === 'INCORRECT' ? `Incorrect — Selected Option ${activeQr.userSelected} (-1 Mark Penalty)` : 'Unattempted (0 Marks)'}
                      </div>
                      <div style="font-size: 0.85rem; color: ${activeQr.status === 'CORRECT' ? '#15803d' : activeQr.status === 'INCORRECT' ? '#b91c1c' : '#64748b'};">
                        ${activeQr.status === 'CORRECT' ? 'Great job! Your answer matches the official answer key.' : activeQr.status === 'INCORRECT' ? `Official answer is Option ${activeQr.correctOption}. Review derivation below.` : `You did not choose an answer. Official answer is Option ${activeQr.correctOption}.`}
                      </div>
                    </div>
                  </div>
                  <div style="text-align: right;">
                    <span style="font-size: 0.85rem; color: #64748b; font-weight: 600;">Official Answer:</span>
                    <span style="display: inline-block; font-size: 1.1rem; font-weight: 900; color: #15803d; background: #dcfce7; padding: 4px 12px; border-radius: 6px; border: 1px solid #86efac; margin-left: 6px;">Option ${activeQr.correctOption}</span>
                  </div>
                </div>
              ` : ''}

              <div class="part-prompt" style="font-size: 1.05rem; line-height: 1.6; margin-bottom: 1.5rem; color: #1e293b;">
                ${renderMathHtml(activePart?.promptHtml || '<p>No part selected.</p>')}
              </div>

              <!-- Answer Entry Area: SINGLE_CHOICE (MCQ) or INTEGER -->
              ${activePart?.responseKind === 'SINGLE_CHOICE' ? `
                <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 8px; padding: 1.25rem; margin-bottom: 1.5rem;">
                  <label style="display: block; font-size: 0.95rem; font-weight: 700; color: #0f172a; margin-bottom: 10px;">
                    ${isCommitted ? 'Examination Options Review:' : 'Select Answer Option (A, B, C, or D):'}
                  </label>
                  <div style="display: flex; gap: 12px; align-items: center; flex-wrap: wrap;">
                    ${['A', 'B', 'C', 'D'].map((opt) => {
                      const isChosen = currentVal === opt;
                      const isLocked = state.isCommitted || state.timer.isExpired;
                      const isCorrectOpt = isCommitted && activeQr && opt === activeQr.correctOption;
                      const isUserWrong = isCommitted && isChosen && !isCorrectOpt;

                      let optBg = isChosen ? '#0284c7' : '#ffffff';
                      let optFg = isChosen ? '#ffffff' : '#0f172a';
                      let optBorder = isChosen ? '#0284c7' : '#cbd5e1';
                      let optLabel = `Option ${opt}`;

                      if (isCommitted) {
                        if (isCorrectOpt && isChosen) {
                          optBg = '#dcfce7';
                          optFg = '#14532d';
                          optBorder = '#16a34a';
                          optLabel = `Option ${opt} ✓ (Your Choice)`;
                        } else if (isCorrectOpt) {
                          optBg = '#f0fdf4';
                          optFg = '#15803d';
                          optBorder = '#22c55e';
                          optLabel = `Option ${opt} ✓ (Official Correct)`;
                        } else if (isUserWrong) {
                          optBg = '#fef2f2';
                          optFg = '#991b1b';
                          optBorder = '#ef4444';
                          optLabel = `Option ${opt} ✗ (Your Choice)`;
                        } else {
                          optBg = '#f8fafc';
                          optFg = '#64748b';
                          optBorder = '#e2e8f0';
                        }
                      }

                      return `
                        <button type="button" class="btn-mcq-choice" data-choice="${opt}" ${isLocked ? 'disabled' : ''} style="min-height: ${HIT_TARGET_MIN_PX}px; min-width: 64px; padding: 10px 18px; font-size: 1rem; font-weight: 800; border-radius: 6px; cursor: ${isLocked ? 'not-allowed' : 'pointer'}; border: 2px solid ${optBorder}; background: ${optBg}; color: ${optFg}; transition: all 0.15s ease;">
                          ${optLabel}
                        </button>
                      `;
                    }).join('')}
                    ${currentVal && !isCommitted ? `
                      <button type="button" id="btn-clear-choice" ${state.isCommitted || state.timer.isExpired ? 'disabled' : ''} style="min-height: ${HIT_TARGET_MIN_PX}px; min-width: ${HIT_TARGET_MIN_PX}px; padding: 8px 14px; background: #f1f5f9; color: #64748b; border: 1px solid #cbd5e1; border-radius: 6px; cursor: ${state.isCommitted || state.timer.isExpired ? 'not-allowed' : 'pointer'}; font-size:0.875rem; font-weight: 600;">Clear</button>
                    ` : ''}
                    <span id="choice-feedback-msg" style="font-size: 0.9rem; font-weight: 600; color: ${isCommitted ? (activeQr?.status === 'CORRECT' ? '#15803d' : activeQr?.status === 'INCORRECT' ? '#dc2626' : '#64748b') : (state.timer.isExpired ? '#dc2626' : '#15803d')}; margin-left: 8px;">
                      ${isCommitted ? (activeQr?.status === 'CORRECT' ? '✓ Correct (+3 Marks)' : activeQr?.status === 'INCORRECT' ? '✗ Incorrect (-1 Mark Penalty)' : 'Unattempted (0 Marks)') : (state.timer.isExpired ? `⏱ Exam Expired · ${currentVal ? `Option ${currentVal} sealed` : 'Unanswered'}` : (currentVal ? `✓ Option ${currentVal} selected` : 'Unanswered'))}
                    </span>
                  </div>
                </div>
              ` : `
                <!-- Answer Entry Area (IOQM Integer: [00..99]) -->
                <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 8px; padding: 1.25rem; margin-bottom: 1.5rem;">
                  <label style="display: block; font-size: 0.95rem; font-weight: 700; color: #0f172a; margin-bottom: 6px;">
                    Enter Integer Answer (00 to 99):
                  </label>
                  <div style="display: flex; gap: 12px; align-items: center; flex-wrap: wrap;">
                    <input type="text" id="integer-answer-input" class="part-integer-input" value="${escapeHtml(currentVal)}" maxlength="2" placeholder="e.g. 07 or 42" ${state.isCommitted || state.timer.isExpired ? 'disabled' : ''} style="min-height: ${HIT_TARGET_MIN_PX}px; width: 140px; padding: 8px 12px; font-size: 1.25rem; font-weight: 700; text-align: center; border: 2px solid #cbd5e1; border-radius: 6px;" />
                    <button type="button" id="save-integer-btn" class="btn-save-part" ${state.isCommitted || state.timer.isExpired ? 'disabled' : ''} style="min-height: ${HIT_TARGET_MIN_PX}px; min-width: 140px; padding: 8px 20px; background: ${state.isCommitted || state.timer.isExpired ? '#94a3b8' : '#0284c7'}; color: white; border: none; border-radius: 6px; cursor: ${state.isCommitted || state.timer.isExpired ? 'not-allowed' : 'pointer'}; font-weight: 700; font-size: 0.95rem;">
                      Save Part ${activePart?.partKey} Answer
                    </button>
                    <span id="integer-validation-msg" class="part-input-feedback" style="font-size: 0.9rem; font-weight: 600; color: ${state.timer.isExpired ? '#dc2626' : '#15803d'};">${state.timer.isExpired ? `⏱ Exam Expired · ${currentVal ? `Response ${currentVal} sealed` : 'Locked'}` : (currentVal ? `Response saved: ${currentVal}` : '')}</span>
                  </div>
                </div>
              `}

              <!-- Pedagogical Solution & Derivation Drawer (Post-Commit) -->
              ${isCommitted ? `
                <div class="part-solution-drawer" style="margin-top: 1.5rem; background: #f8fafc; border: 1px solid #bfdbfe; border-left: 6px solid #0284c7; border-radius: 8px; padding: 1.5rem;">
                  <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 1rem; border-bottom: 1px solid #e2e8f0; padding-bottom: 0.75rem;">
                    <span style="font-size: 1.4rem;">📖</span>
                    <div>
                      <h3 style="margin: 0; font-size: 1.2rem; color: #0369a1; font-weight: 800;">Step-by-Step Pedagogical Solution &amp; Scientific Derivation</h3>
                      <div style="font-size: 0.85rem; color: #64748b;">Authoritative derivation conforming to HBCSE Olympiad syllabi</div>
                    </div>
                  </div>

                  <div class="solution-content" style="font-size: 1.05rem; line-height: 1.65; color: #1e293b; margin-bottom: 1rem;">
                    ${renderMathHtml(activeQr?.solutionHtml || '<p>Detailed solution available under verified review.</p>')}
                  </div>

                  ${activeQr?.hints && activeQr.hints.length > 0 ? `
                    <div style="border-top: 1px dashed #cbd5e1; padding-top: 0.85rem; margin-top: 0.85rem;">
                      <strong style="color: #0369a1; font-size: 0.9rem; text-transform: uppercase; letter-spacing: 0.05em;">💡 Key Concepts &amp; Examination Formulas:</strong>
                      <div style="display: flex; flex-direction: column; gap: 8px; margin-top: 8px;">
                        ${activeQr.hints.map(h => `<div style="background: #e0f2fe; color: #0369a1; padding: 8px 14px; border-radius: 6px; font-size: 0.95rem; font-weight: 600; border: 1px solid #bae6fd;">${renderMathHtml(escapeHtml(h))}</div>`).join('')}
                      </div>
                    </div>
                  ` : ''}
                </div>
              ` : ''}

              <!-- Question Navigation Buttons -->
              <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 1.5rem; border-top: 1px solid #e2e8f0; padding-top: 1rem; flex-wrap: wrap; gap: 10px;">
                <button type="button" id="btn-prev-part" style="min-height: ${HIT_TARGET_MIN_PX}px; padding: 10px 18px; background: #f1f5f9; color: #0f172a; border: 1px solid #cbd5e1; border-radius: 6px; cursor: pointer; font-weight: 700; font-size: 0.95rem;">
                  ← Previous Question
                </button>
                <button type="button" id="btn-next-part" style="min-height: ${HIT_TARGET_MIN_PX}px; padding: 10px 18px; background: #0284c7; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 700; font-size: 0.95rem;">
                  Next Question →
                </button>
              </div>

              <!-- Post-Commit Evaluation Status -->
              ${state.isCommitted && state.evaluation ? `
                <div class="paper-evaluation-result" style="background: #f0fdf4; border: 1px solid #86efac; border-radius: 8px; padding: 1.25rem; margin-top: 1.25rem; margin-bottom: 1rem; display: flex; justify-content: space-between; align-items: center; gap: 1rem; flex-wrap: wrap;">
                  <div>
                    <h3 style="margin: 0 0 0.5rem; color: #166534; font-size: 1.2rem;">✓ Paper Submitted Successfully</h3>
                    <p style="margin: 0; color: #15803d; font-size: 0.95rem; line-height: 1.5;">
                      Durably committed. ${scoreReport ? `Evaluated Score: <strong>${scoreReport.totalScore} / ${scoreReport.maxMarks} Marks</strong> (${scoreReport.percentage}% aggregate).` : state.evaluation.summaryFeedback}
                    </p>
                  </div>
                  <button type="button" id="btn-retake-from-committed-banner" style="min-height: ${HIT_TARGET_MIN_PX}px; padding: 8px 18px; background: #166534; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 700; font-size: 0.9rem;">
                    🔄 Retake Mock Paper
                  </button>
                </div>
              ` : ''}

              <!-- Submission Bar -->
              <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #e2e8f0; padding-top: 1rem; margin-top: 1rem; flex-wrap: wrap; gap: 10px;">
                <span style="font-size: 0.95rem; color: ${isCommitted ? '#15803d' : '#64748b'}; font-weight: 600;">
                  ${isCommitted && scoreReport ? `✓ Paper Submitted Successfully · Durably Committed · Total Score: <strong>${scoreReport.totalScore} / ${scoreReport.maxMarks} Marks</strong> (${scoreReport.percentage}%)` : `Parts Attempted: <strong>${Object.keys((controller as any).responses).length}</strong> of ${parts.length}`}
                </span>

                ${isCommitted ? `
                  <button type="button" id="btn-retake-from-bottom" style="min-height: ${HIT_TARGET_PRIMARY_PX}px; padding: 12px 28px; background: #0284c7; color: #ffffff; border: none; border-radius: 8px; font-size: 1.05rem; font-weight: 700; cursor: pointer;">
                    🔄 Retake Mock Paper
                  </button>
                ` : `
                  <button type="button" id="submit-paper-btn" ${!state.ready || state.busy || state.isCommitted || state.timer.isExpired ? 'disabled' : ''} style="min-height: ${HIT_TARGET_PRIMARY_PX}px; padding: 12px 28px; background: ${state.isCommitted ? '#94a3b8' : '#16a34a'}; color: #ffffff; border: none; border-radius: 8px; font-size: 1.05rem; font-weight: 700; cursor: ${state.isCommitted ? 'default' : 'pointer'};">
                    Submit Complete Paper →
                  </button>
                `}
              </div>
            </article>
          </main>
        </div>
      </div>
    `;

    bindEvents();
  };

  const bindEvents = () => {
    // Exit Exam button
    root.querySelector<HTMLButtonElement>('#btn-back-hub')?.addEventListener('click', () => {
      const isNsejs = controller.getPaperId().includes('nsejs');
      const targetRoute = isNsejs ? '/competitive/exam:nsejs' : '/competitive/exam:ioqm';
      if (onNavigate) onNavigate(targetRoute);
      else window.location.hash = '#' + targetRoute;
    });

    // Retake Exam handlers
    const handleRetake = async () => {
      const confirmed = window.confirm(
        'Reset Mock Exam?\n\nThis will clear current draft answers and start a fresh 120-minute timed attempt.'
      );
      if (!confirmed) return;
      if (onRetake) {
        await onRetake();
        return;
      }
      try {
        const isNsejsPaper = controller.getPaperId().includes('nsejs');
        const dbName = isNsejsPaper ? 'grade9_nsejs_runtime' : 'grade9_ioqm_runtime';
        const driver = createStorageDriver({ dbName });
        await driver.clear('sessions').catch(() => {});
        await driver.clear('drafts').catch(() => {});
        await driver.clear('attempts').catch(() => {});
        await driver.clear('artifacts').catch(() => {});
      } catch (err) {
        console.error('Storage clear error on retake:', err);
      }
      window.location.reload();
    };

    root.querySelector<HTMLButtonElement>('#btn-retake-paper')?.addEventListener('click', handleRetake);
    root.querySelector<HTMLButtonElement>('#btn-retake-from-banner')?.addEventListener('click', handleRetake);
    root.querySelector<HTMLButtonElement>('#btn-retake-from-committed')?.addEventListener('click', handleRetake);
    root.querySelector<HTMLButtonElement>('#btn-retake-from-committed-banner')?.addEventListener('click', handleRetake);
    root.querySelector<HTMLButtonElement>('#btn-retake-from-bottom')?.addEventListener('click', handleRetake);

    // Question Navigation (Prev / Next) buttons
    root.querySelector<HTMLButtonElement>('#btn-prev-part')?.addEventListener('click', () => {
      controller.getNavigation().goToPreviousPart();
      render();
    });
    root.querySelector<HTMLButtonElement>('#btn-next-part')?.addEventListener('click', () => {
      controller.getNavigation().goToNextPart();
      render();
    });

    // Part select buttons
    root.querySelectorAll<HTMLButtonElement>('.part-select-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const pid = btn.dataset.partId;
        if (pid) {
          controller.getNavigation().goToPart(pid);
          render();
        }
      });
    });

    // Aids buttons
    root.querySelectorAll<HTMLButtonElement>('.aid-toggle-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const aid = btn.dataset.aid as ExamAidKind;
        if (aid === 'SCRATCHPAD') {
          scratchpadOpen = !scratchpadOpen;
          render();
        } else if (aid === 'FORMULA_SHEET') {
          formulaSheetOpen = !formulaSheetOpen;
          render();
        } else {
          controller.openAid(aid);
          render();
        }
      });
    });

    root.querySelector<HTMLButtonElement>('#btn-close-scratchpad')?.addEventListener('click', () => {
      scratchpadOpen = false;
      render();
    });

    root.querySelector<HTMLButtonElement>('#btn-close-formula-sheet')?.addEventListener('click', () => {
      formulaSheetOpen = false;
      render();
    });

    // Single Choice (MCQ) buttons
    root.querySelectorAll<HTMLButtonElement>('.btn-mcq-choice').forEach((btn) => {
      btn.addEventListener('click', () => {
        const choice = btn.dataset.choice;
        if (!choice) return;
        const activePartId = controller.getViewState().activePartId;
        const ok = controller.setPartResponse(activePartId, { kind: 'SINGLE_CHOICE', value: choice });
        if (ok) {
          void controller.saveDraft().catch(() => {});
          render();
        } else {
          const vs = controller.getViewState();
          if (vs.timer.isExpired) {
            alert('Exam timer has expired. Answers are sealed.\n\nClick "🔄 Reset / Retake Exam" to start a fresh attempt.');
          } else if (vs.isCommitted) {
            alert('Paper has already been submitted and sealed.\n\nClick "🔄 Reset / Retake Exam" to start a new attempt.');
          }
        }
      });
    });

    // Clear choice button
    root.querySelector<HTMLButtonElement>('#btn-clear-choice')?.addEventListener('click', () => {
      const activePartId = controller.getViewState().activePartId;
      if (controller.getViewState().timer.isExpired || controller.getViewState().isCommitted) return;
      (controller as any).responses.delete(activePartId);
      (controller as any).navigation.setPartStatus(activePartId, 'VIEWED');
      void controller.saveDraft().catch(() => {});
      render();
    });

    // Save Part Answer for INTEGER
    const saveBtn = root.querySelector<HTMLButtonElement>('#save-integer-btn') || root.querySelector<HTMLButtonElement>('#btn-save-part');
    const input = root.querySelector<HTMLInputElement>('#integer-answer-input') || root.querySelector<HTMLInputElement>('#part-integer-input');
    const feedback = root.querySelector<HTMLElement>('#integer-validation-msg') || root.querySelector<HTMLElement>('#part-input-feedback');

    const handleSave = () => {
      if (!input || !feedback) return;
      const raw = input.value.trim();
      const val = parseInt(raw, 10);
      if (!/^\d{1,2}$/.test(raw) || isNaN(val) || val < 0 || val > 99) {
        feedback.style.color = '#dc2626';
        feedback.textContent = '✗ Invalid answer. Enter an integer between 00 and 99.';
        return;
      }

      const activePartId = controller.getViewState().activePartId;
      const formatted = val.toString().padStart(2, '0');
      const ok = controller.setPartResponse(activePartId, { kind: 'INTEGER', value: formatted });
      if (ok) {
        void controller.saveDraft().catch(() => {});
        feedback.style.color = '#15803d';
        feedback.textContent = `✓ Response saved: ${formatted}`;
        render();
      } else {
        feedback.style.color = '#dc2626';
        feedback.textContent = '✗ Unable to save. Paper may be locked or deadline passed.';
      }
    };

    saveBtn?.addEventListener('click', handleSave);
    input?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') handleSave();
    });

    // Submit Complete Paper
    root.querySelector<HTMLButtonElement>('#submit-paper-btn')?.addEventListener('click', async () => {
      try {
        await controller.submitPaper();
        render();
      } catch (err: any) {
        alert('Submission failed: ' + (err?.message || String(err)));
      }
    });
  };

  // Restore controller and start timer
  const init = async () => {
    try {
      if (!controller.getViewState().ready) {
        await controller.restore();
      }
    } catch (err) {
      console.warn('Paper workspace restore warning:', err);
    }
    render();

    let wasExpired = controller.getTimer().isExpired();
    timerInterval = setInterval(() => {
      if (!active) return;
      const timerDisplay = root.querySelector<HTMLElement>('#timer-display') || root.querySelector<HTMLElement>('.exam-timer-display');
      if (timerDisplay) {
        const rem = controller.getTimer().getRemainingSeconds();
        const mins = Math.floor(rem / 60);
        const secs = rem % 60;
        const isExp = controller.getTimer().isExpired();
        timerDisplay.textContent = isExp
          ? '⏱ 00:00 (Expired)'
          : `⏱ ${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;

        if (isExp && !wasExpired) {
          wasExpired = true;
          render();
        }
      }
    }, 1000);
  };
  void init();

  return {
    dispose: () => {
      active = false;
      if (timerInterval) clearInterval(timerInterval);
      root.replaceChildren();
    },
  };
}
