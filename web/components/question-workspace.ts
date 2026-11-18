/**
 * web/components/question-workspace.ts
 * A24 — Question workspace split-pane layout and interaction controller.
 *
 * Implements:
 * - Shared problem stimulus & response/scratchpad split-pane
 * - Rotation awareness (landscape: side-by-side; portrait: stacked)
 * - Progressive hint disclosure policy
 * - Commit lock upon final submission
 * - Core2 fault handling: missing figures, ambiguous/conditional/dropped/unverified keys
 * - Strict prohibition of score claims on HOLD questions
 * - Hit target sizing (48px min, 56px primary submit)
 *
 * No academic approval inferred from software validation.
 */

import type {Attempt,Ref,TaskRef,Response,WorkArtifact} from '../runtime/types.ts';
import {Session} from '../runtime/session.ts';
import {DefaultProgressStore} from '../runtime/progress.ts';
import {StandardAssessmentEngine,SCORING_VERSION} from '../runtime/assessment.ts';
import {canonicalJson,sameRef} from '../runtime/loader.ts';
import {validateResponse} from '../runtime/response.ts';
import { HIT_TARGET_MIN_PX, HIT_TARGET_PRIMARY_PX } from '../styles/tokens.ts';
import type {
  ResponseKind,
  ResponseValue,
  SubmissionStatus,
  EvaluationResult,
  KeyEvaluationStatus,
} from './response/types.ts';

export interface QuestionFigure {
  readonly id: string;
  readonly caption: string;
  readonly available: boolean;
  readonly contentSha256?: string;
  readonly sourceUrl?: string;
}

export interface QuestionHint {
  readonly id: string;
  readonly text: string;
  readonly penaltyPercent: number;
}

export interface WorkspaceQuestionDescriptor {
  readonly id: string;
  readonly code: string;
  readonly title: string;
  readonly stemText: string;
  readonly kind: ResponseKind;
  readonly options?: readonly any[];
  readonly allowedUnits?: readonly string[];
  readonly figures?: readonly QuestionFigure[];
  readonly hints?: readonly QuestionHint[];
  readonly status: 'RELEASED' | 'WITHDRAWN' | 'HOLD';
  readonly keyStatus: KeyEvaluationStatus;
  readonly correctKey?: unknown;
  readonly maxPoints?: number;
}

export interface WorkspaceLayoutState {
  readonly orientation: 'LANDSCAPE' | 'PORTRAIT' | 'COMPACT';
  readonly splitDirection: 'ROW' | 'COLUMN';
  readonly problemPaneWidthPercent: number;
  readonly workPaneWidthPercent: number;
}

export interface QuestionWorkspaceViewState {
  readonly question: WorkspaceQuestionDescriptor;
  readonly submissionStatus: SubmissionStatus;
  readonly layout: WorkspaceLayoutState;
  readonly unlockedHintCount: number;
  readonly totalHintsCount: number;
  readonly currentHints: readonly QuestionHint[];
  readonly missingFigures: readonly QuestionFigure[];
  readonly hasMissingFigures: boolean;
  readonly keyStatus: KeyEvaluationStatus;
  readonly evaluation: EvaluationResult | null;
  readonly canSubmit: boolean;
  readonly isLocked: boolean;
  readonly hitTargetMinPx: number;
  readonly hitTargetPrimaryPx: number;
}

// Only a trusted release bootstrap may construct this exact binding. No raw answer key
// or caller-supplied score authorizes commitment. An unbound workspace is a preview.
export interface WorkspaceBinding {
  readonly releaseId:string; readonly task:TaskRef;readonly assessment:Ref<'ASSESSMENT'>;
  readonly attemptId:string;readonly session:Session;readonly progress:DefaultProgressStore;readonly engine:StandardAssessmentEngine;
}
export class QuestionWorkspaceController {
  private question:WorkspaceQuestionDescriptor;
  private submissionStatus:SubmissionStatus='UNANSWERED';
  private currentResponse:ResponseValue|null=null;
  private orientation:'LANDSCAPE'|'PORTRAIT'|'COMPACT'='LANDSCAPE';
  private unlockedHintCount=0;
  private evaluation:EvaluationResult|null=null;
  private revision=0;
  private busy=false;
  private work:readonly WorkArtifact[]=[];
  private readonly binding?:WorkspaceBinding;
  constructor(question:WorkspaceQuestionDescriptor,initialOrientation:'LANDSCAPE'|'PORTRAIT'|'COMPACT'='LANDSCAPE',binding?:WorkspaceBinding){
    // Do not retain or return answer keys and hint text supplied by a UI descriptor.
    const {correctKey:_,hints:__,...publicQuestion}=question;
    this.question=structuredClone(publicQuestion);this.orientation=initialOrientation;this.binding=binding&&{...binding,task:structuredClone(binding.task),assessment:structuredClone(binding.assessment)};
  }
  setOrientation(orientation:'LANDSCAPE'|'PORTRAIT'|'COMPACT'):void{this.orientation=orientation;}
  updateResponse(response:ResponseValue):void{
    if(this.busy||this.submissionStatus==='COMMITTED_LOCKED')return;
    this.currentResponse=structuredClone(response);this.submissionStatus='DIRTY';this.evaluation=null;
  }
  updateWork(work:readonly WorkArtifact[]):void{if(this.busy||this.submissionStatus==='COMMITTED_LOCKED')return;this.work=structuredClone(work);this.submissionStatus='DIRTY';}
  private wire():Response {
    const x=this.currentResponse;if(!x||x.kind!==this.question.kind)throw Error('INVALID_RESPONSE_KIND');
    const options=this.question.options??[];
    if(x.kind==='SINGLE_CHOICE'){
      if(!x.selectedOptionId||!options.some(o=>o.id===x.selectedOptionId))throw Error('INVALID_OPTION');
      return validateResponse({kind:x.kind,value:x.selectedOptionId});
    }
    if(x.kind==='MULTIPLE_CHOICE'){
      if(!x.selectedOptionIds.every(id=>options.some(o=>o.id===id)))throw Error('INVALID_OPTION');
      return validateResponse({kind:x.kind,value:x.selectedOptionIds});
    }
    if(!x.quantity?.decimal||!x.quantity.unit||this.question.allowedUnits&&!this.question.allowedUnits.includes(x.quantity.unit))throw Error('INVALID_QUANTITY');
    return validateResponse({kind:x.kind,value:{decimal:x.quantity.decimal,unit:x.quantity.unit}});
  }
  private async boundSession(){
    const b=this.binding;if(!b)throw Error('WORKSPACE_NOT_AUTHORIZED');
    const ses=await b.session.snapshot();
    if(ses.releaseId!==b.releaseId||!sameRef(ses.item,b.task)||b.task.id!==this.question.id||ses.mode==='SIMULATED_EXAM')throw Error('WORKSPACE_IDENTITY_MISMATCH');
    return ses;
  }
  async saveDraft():Promise<void>{
    if(this.busy||this.submissionStatus==='COMMITTED_LOCKED')throw Error('WORKSPACE_LOCKED');this.busy=true;
    try{const b=this.binding,s=await this.boundSession();if(s.attemptIds.length)throw Error('WORKSPACE_COMMITTED');await b!.progress.saveDraft(s,this.wire(),this.work,this.revision);this.revision++;this.submissionStatus='DRAFT_SAVED';}finally{this.busy=false;}
  }
  // Hints require a separate A49 persisted exposure receipt, never a local count.
  unlockNextHint():boolean{return false;}
  private result(status:EvaluationResult['status'],reasonCode:string,points:number|null=null,maxPoints=this.question.maxPoints??0):EvaluationResult{
    return {status,rawPoints:points,maxPoints,keyStatus:this.question.keyStatus,academicHold:this.question.status==='HOLD',reasonCode};
  }
  private async displayCommitted(a:Attempt):Promise<EvaluationResult>{
    const b=this.binding!;this.submissionStatus='COMMITTED_LOCKED';
    const allowed=await b.session.disclosure('CORRECTNESS',a.id,b.task);
    if(allowed.verdict!=='PERMITTED'||a.grade.status!=='SCORED'||a.grade.points===null)return this.result('REVIEW_PENDING','DURABLE_COMMIT_REVIEW_PENDING',null,a.grade.maxPoints);
    return this.result(a.grade.points===a.grade.maxPoints?'CORRECT':a.grade.points===0?'INCORRECT':'PARTIAL',a.grade.reasonCode,a.grade.points,a.grade.maxPoints);
  }
  async restore():Promise<void>{
    if(this.busy)throw Error('WORKSPACE_BUSY');this.busy=true;
    try{const b=this.binding,s=await this.boundSession();if(s.attemptIds.length){const a=await b!.progress.committedAttempt(s.id,s.attemptIds[0]);if(!a||a.id!==b!.attemptId||!a.assessmentRef||!sameRef(a.assessmentRef,b!.assessment))throw Error('UNQUALIFIED_COMMIT');this.evaluation=await this.displayCommitted(a);return;}
      const d=await b!.progress.loadDraft(s.id);if(!d)return;if(d.cognitive||!sameRef(d.session.item,s.item)||d.session.releaseId!==s.releaseId)throw Error('FOREIGN_DRAFT');
      const v=d.response;if(v.kind==='SINGLE_CHOICE')this.currentResponse={kind:v.kind,selectedOptionId:v.value};else if(v.kind==='MULTIPLE_CHOICE')this.currentResponse={kind:v.kind,selectedOptionIds:v.value};else if(v.kind==='NUMERIC_QUANTITY')this.currentResponse={kind:v.kind,quantity:{decimal:v.value.decimal,magnitude:Number(v.value.decimal),unit:v.value.unit}};else throw Error('INVALID_DRAFT_KIND');this.wire();this.work=structuredClone(d.artifacts);this.revision=d.revision;this.submissionStatus='DRAFT_SAVED';
    }finally{this.busy=false;}
  }
  async submit():Promise<EvaluationResult>{
    if(this.submissionStatus==='COMMITTED_LOCKED'&&this.evaluation)return this.evaluation;
    if(this.busy)throw Error('WORKSPACE_BUSY');
    if(this.question.status==='HOLD')return this.result('HOLD_UNGRADED','QUESTION_ON_ACADEMIC_HOLD');
    if(this.question.status!=='RELEASED'||this.question.keyStatus!=='VERIFIED')return this.result('REVIEW_PENDING','KEY_'+this.question.keyStatus);
    if(!this.binding)return this.result('REVIEW_PENDING','WORKSPACE_NOT_AUTHORIZED');
    let response:Response;try{response=this.wire();}catch{return this.result('INVALID','INVALID_RESPONSE');}
    this.busy=true;this.submissionStatus='SUBMITTING';
    try{const b=this.binding,s=await this.boundSession();
      const existing=await b.progress.committedAttempt(s.id,b.attemptId);
      if(existing){if(canonicalJson(existing.response)!==canonicalJson(response)||!existing.assessmentRef||!sameRef(existing.assessmentRef,b.assessment))throw Error('COMMIT_CONFLICT');this.evaluation=await this.displayCommitted(existing);return this.evaluation;}
      const grade=await b.engine.evaluate(response,b.assessment,s.mode,b.task);
      if(grade.status==='INVALID'||grade.status==='UNSUPPORTED'){this.submissionStatus='DIRTY';return this.result('INVALID',grade.reasonCode,null,grade.maxPoints);}
      const attempt:Attempt={id:b.attemptId,sessionId:s.id,releaseId:s.releaseId,item:b.task,response,work:this.work,hintIds:[],submittedAt:new Date().toISOString(),grade,assessmentRef:b.assessment,scoringVersion:SCORING_VERSION,cognitive:null};
      const committed=await b.session.appendAttempt(attempt);this.evaluation=await this.displayCommitted(committed);return this.evaluation;
    }catch(e){if(!this.getViewState().isLocked)this.submissionStatus='DIRTY';throw e;}finally{this.busy=false;}
  }
  getViewState(): QuestionWorkspaceViewState {
    const allFigures = this.question.figures || [];
    const missingFigures = allFigures.filter((f) => !f.available);
    const hints = this.question.hints || [];
    const currentHints = hints.slice(0, this.unlockedHintCount);

    const isLandscape = this.orientation === 'LANDSCAPE';
    const layout: WorkspaceLayoutState = {
      orientation: this.orientation,
      splitDirection: isLandscape ? 'ROW' : 'COLUMN',
      problemPaneWidthPercent: isLandscape ? 50 : 100,
      workPaneWidthPercent: isLandscape ? 50 : 100,
    };

    const isLocked = this.submissionStatus === 'COMMITTED_LOCKED';
    const canSubmit = !this.busy&&!isLocked&&!!this.binding&&this.currentResponse!==null&&this.question.status==='RELEASED';

    return {
      question: structuredClone(this.question),
      submissionStatus: this.submissionStatus,
      layout,
      unlockedHintCount: this.unlockedHintCount,
      totalHintsCount: hints.length,
      currentHints,
      missingFigures,
      hasMissingFigures: missingFigures.length > 0,
      keyStatus: this.question.keyStatus,
      evaluation: this.evaluation,
      canSubmit,
      isLocked,
      hitTargetMinPx: HIT_TARGET_MIN_PX,
      hitTargetPrimaryPx: HIT_TARGET_PRIMARY_PX,
    };
  }
}

export function createQuestionWorkspace(
  question: WorkspaceQuestionDescriptor,
  orientation?: 'LANDSCAPE' | 'PORTRAIT' | 'COMPACT', binding?:WorkspaceBinding
): QuestionWorkspaceController {
  return new QuestionWorkspaceController(question, orientation,binding);
}
