import {refOk} from '../runtime/progress.ts';
import {sameRef} from '../runtime/loader.ts';
import {getModelRegistry} from '../runtime/models.ts';
import type {CognitiveController} from './cognitive-controller.ts';
import type {Ref,Checkpoint} from '../runtime/types.ts';
/**
 * web/journeys/core1a.ts
 * A31 — Core1A Teaching Journey Runtime.
 *
 * Implements:
 * - Native blueprint BP-TEACHING-CORE1A@1.0.0
 * - Nine ordered instructional roles (A1 through A9):
 *   A1: Phenomenon / Orientation
 *   A2: Prerequisite Conventions (axes, signs, reference states, domains)
 *   A3: Physical Model & Representation Bridge (picture, symbols, words)
 *   A4: Law, Derivations & Conditions (inferential jumps, why_valid steps)
 *   A5: Scientific Simulation / Read the Model
 *   A6: Reasoning Construction & Completed Worked Example
 *   A7: Misconception Alert & Diagnostic Repair
 *   A8: Boundary & Changed Conditions
 *   A9: Synthesis Task & Reflection
 * - Three distinct progressive anchors:
 *   FOUNDATION, CONNECTED, ADVANCED
 * - Rejection of recycled synthesis task (N32 invariant)
 * - Scientific interactive model prediction & observation gating
 * - Fresh task route eligibility gating: route only if eligible!
 *   (Gated on lesson validity, completed units, non-stale status)
 * - Strict pedagogical precommit masking: no answer leakage
 * - Full draft serialization for tablet session recovery
 *
 * No academic approval inferred from software validation.
 */

export const CORE1A_BLUEPRINT_ID = 'BP-TEACHING-CORE1A@1.0.0';

export type Core1ARole = 'A1' | 'A2' | 'A3' | 'A4' | 'A5' | 'A6' | 'A7' | 'A8' | 'A9';

export const CORE1A_ORDERED_ROLES: readonly Core1ARole[] = [
  'A1',
  'A2',
  'A3',
  'A4',
  'A5',
  'A6',
  'A7',
  'A8',
  'A9',
] as const;

export type IntrinsicDepthBadge = 'EASY' | 'MEDIUM' | 'HARD';

export type AnchorLevel = 'FOUNDATION' | 'CONNECTED' | 'ADVANCED';

export const ANCHOR_LEVELS: readonly AnchorLevel[] = [
  'FOUNDATION',
  'CONNECTED',
  'ADVANCED',
] as const;

export interface ExactRef {
  readonly type: string;
  readonly id: string;
  readonly revision: number;
  readonly sha256: string;
}

export interface RepresentationCorrespondence {
  readonly pictureElement: string;
  readonly symbol: string;
  readonly inWords: string;
}

export interface DerivationStep {
  readonly stepNumber: number;
  readonly expression: string;
  readonly whyValid: string;
  readonly sourceRef?: string;
}

export interface MisconceptionItem {
  readonly wrongIdea: string;
  readonly diagnosticPrompt: string;
  readonly diagnosticOptions?: readonly string[];
  readonly repair: string;
}

export interface Core1AUnitData {
  readonly role: Core1ARole;
  readonly title: string;
  readonly summary: string;
  readonly bodyText: string;
  readonly blockRefs: readonly ExactRef[];
  readonly evidenceRefs: readonly ExactRef[];
  readonly conventions?: readonly string[];
  readonly representationBridge?: readonly RepresentationCorrespondence[];
  readonly derivationSteps?: readonly DerivationStep[];
  readonly workedExample?: {
    readonly problemPrompt: string;
    readonly fullReasoningSteps: readonly string[];
    readonly solutionResult: string;
  };
  readonly misconception?: MisconceptionItem;
  readonly boundaryConditions?: readonly string[];
  readonly selfCheckPrompt?: string;
}

export interface ProgressiveAnchor {
  readonly level: AnchorLevel;
  readonly taskRef: ExactRef;
  readonly title: string;
  readonly prompt: string;
  readonly solutionRef: ExactRef;
  readonly solutionSteps: readonly string[];
  readonly warrantRefs: readonly ExactRef[];
}

export interface Core1AModelConfig {
  readonly modelId: string;
  readonly modelName: string;
  readonly defaultParameters: Record<string, number>;
  readonly parameterBounds: Record<string, { readonly min: number; readonly max: number }>;
  readonly qualitativePredictionPrompt: string;
  readonly predictionOptions: readonly string[];
  readonly expectedPredictionIndex: number;
  readonly observationNote: string;
}

export interface Core1ALessonDefinition {
  readonly lessonRef: ExactRef;
  readonly constructionRef: ExactRef;
  readonly title: string;
  readonly subject: string;
  readonly topicId: string;
  readonly depthBadge: IntrinsicDepthBadge;
  readonly status: 'SYNTHETIC' | 'HOLD' | 'CANDIDATE' | 'STALE' | 'APPROVED';
  readonly units: readonly Core1AUnitData[];
  readonly anchors: readonly ProgressiveAnchor[];
  readonly modelConfig: Core1AModelConfig;
  readonly synthesisTaskRef: ExactRef;
  readonly synthesisTaskPrompt: string;
  readonly freshTaskRef?: ExactRef;
}

export interface Core1ADraft {
  readonly lessonId:string;
  readonly lessonRef:ExactRef;
  readonly activeUnitRole: Core1ARole;
  readonly completedRoles: readonly Core1ARole[];
  readonly modelParameters: Record<string, number>;
  readonly modelPredictionIndex: number | null;
  readonly modelObserved: boolean;
  readonly revealedAnchorSolutions: readonly AnchorLevel[];
  readonly revealedWorkedExamples: readonly Core1ARole[];
  readonly depthView: IntrinsicDepthBadge;
  readonly learnerNotes: string;
}

export class Core1AValidationError extends Error {
  readonly code: string;
  constructor(code: string, message: string) {
    super(`${code}: ${message}`);
    this.name = 'Core1AValidationError';
    this.code = code;
  }
}


const nonblank=(s:unknown):s is string=>typeof s==='string'&&s.trim().length>0&&s.length<=100000;
const depthOk=(d:unknown):d is IntrinsicDepthBadge=>['EASY','MEDIUM','HARD'].includes(String(d));
export type PublicModelConfig=Omit<Core1AModelConfig,'expectedPredictionIndex'|'observationNote'>;
export function publicModel(c:Core1AModelConfig|PublicModelConfig):PublicModelConfig{
 const {modelId,modelName,defaultParameters,parameterBounds,qualitativePredictionPrompt,predictionOptions}=c;
 if(!nonblank(modelId)||!nonblank(modelName)||!nonblank(qualitativePredictionPrompt)||!Array.isArray(predictionOptions)||predictionOptions.length<2||!predictionOptions.every(nonblank)||!parameterBounds||!defaultParameters||Object.keys(defaultParameters).length!==Object.keys(parameterBounds).length||Object.keys(parameterBounds).some(k=>!Object.hasOwn(defaultParameters,k)||!Number.isFinite(parameterBounds[k].min)||!Number.isFinite(parameterBounds[k].max)||parameterBounds[k].min>parameterBounds[k].max||!Number.isFinite(defaultParameters[k])||defaultParameters[k]<parameterBounds[k].min||defaultParameters[k]>parameterBounds[k].max))throw Error('Invalid model definition');
 return structuredClone({modelId,modelName,defaultParameters,parameterBounds,qualitativePredictionPrompt,predictionOptions});
}
export function publicUnit(u:Core1AUnitData):Core1AUnitData{
 if(!CORE1A_ORDERED_ROLES.includes(u.role)||!nonblank(u.title)||typeof u.summary!=='string'||typeof u.bodyText!=='string'||!Array.isArray(u.blockRefs)||!Array.isArray(u.evidenceRefs)||![...u.blockRefs,...u.evidenceRefs].every(refOk))throw Error('Invalid unit');
 // No embedded worked solution, diagnostic repair or answer-bearing optional fields.
 const {role,title,summary,bodyText,blockRefs,evidenceRefs,conventions,representationBridge,derivationSteps,boundaryConditions,selfCheckPrompt}=u;
 return structuredClone({role,title,summary,bodyText,blockRefs,evidenceRefs,...(conventions?{conventions}:{}),...(representationBridge?{representationBridge}:{}),...(derivationSteps?{derivationSteps}:{}),...(boundaryConditions?{boundaryConditions}:{}),...(selfCheckPrompt?{selfCheckPrompt}:{}),...(u.workedExample?{workedExample:{problemPrompt:u.workedExample.problemPrompt,fullReasoningSteps:[],solutionResult:''}}:{}),...(u.misconception?{misconception:{wrongIdea:u.misconception.wrongIdea,diagnosticPrompt:u.misconception.diagnosticPrompt,repair:''}}:{})});
}
export function publicAnchor(a:ProgressiveAnchor):ProgressiveAnchor{
 if(!ANCHOR_LEVELS.includes(a.level)||!refOk(a.taskRef)||!refOk(a.solutionRef)||a.solutionRef.type!=='SOLUTION'||!a.warrantRefs.every(refOk)||!nonblank(a.title)||!nonblank(a.prompt))throw Error('Invalid anchor');
 const {level,taskRef,title,prompt,solutionRef,warrantRefs}=a;return structuredClone({level,taskRef,title,prompt,solutionRef,warrantRefs,solutionSteps:[]});
}
type PublicLesson=Omit<Core1ALessonDefinition,'modelConfig'> & {readonly modelConfig:PublicModelConfig};
export class Core1ATeachingJourney{
 private readonly lesson:PublicLesson;private activeUnitRole:Core1ARole='A1';private visited=new Set<Core1ARole>(['A1']);private parameters:Record<string,number>;private prediction:number|null=null;private depth:IntrinsicDepthBadge;private notes='';
 constructor(lesson:Core1ALessonDefinition){
  if(!refOk(lesson.lessonRef)||lesson.lessonRef.type!=='LESSON'||!refOk(lesson.constructionRef)||!refOk(lesson.synthesisTaskRef)||!nonblank(lesson.title)||!depthOk(lesson.depthBadge)||!['SYNTHETIC','HOLD','CANDIDATE','STALE','APPROVED'].includes(lesson.status)||lesson.units?.length!==9||lesson.units.some((u,i)=>u.role!==CORE1A_ORDERED_ROLES[i])||lesson.anchors?.length!==3||lesson.anchors.some((a,i)=>a.level!==ANCHOR_LEVELS[i]))throw Error('Invalid lesson identity or A1–A9/anchor sequence');
  const tasks=[...lesson.anchors.map(a=>a.taskRef),lesson.synthesisTaskRef,...(lesson.freshTaskRef?[lesson.freshTaskRef]:[])];
  if(tasks.some(t=>!refOk(t)||!['QUESTION','FRESH_TASK'].includes(t.type))||new Set(tasks.map(t=>t.id)).size!==tasks.length||lesson.freshTaskRef&&lesson.freshTaskRef.type!=='FRESH_TASK')throw Error('RECYCLED_OR_INVALID_TASK');
  const {lessonRef,constructionRef,title,subject,topicId,depthBadge,status,synthesisTaskRef,synthesisTaskPrompt,freshTaskRef}=lesson;
  this.lesson=structuredClone({lessonRef,constructionRef,title,subject,topicId,depthBadge,status,synthesisTaskRef,synthesisTaskPrompt,...(freshTaskRef?{freshTaskRef}:{}),units:lesson.units.map(publicUnit),anchors:lesson.anchors.map(publicAnchor),modelConfig:publicModel(lesson.modelConfig)});
  this.parameters=structuredClone(this.lesson.modelConfig.defaultParameters);this.depth=depthBadge;
 }
 getLesson(){return structuredClone(this.lesson);}
 getActiveRole(){return this.activeUnitRole;}getActiveUnit(){return structuredClone(this.lesson.units.find(u=>u.role===this.activeUnitRole)!);}
 selectSection(role:Core1ARole){if(!CORE1A_ORDERED_ROLES.includes(role))throw Error('Invalid role');this.activeUnitRole=role;this.visited.add(role);}
 nextSection(){this.selectSection(CORE1A_ORDERED_ROLES[Math.min(8,CORE1A_ORDERED_ROLES.indexOf(this.activeUnitRole)+1)]);return this.activeUnitRole;}
 previousSection(){this.selectSection(CORE1A_ORDERED_ROLES[Math.max(0,CORE1A_ORDERED_ROLES.indexOf(this.activeUnitRole)-1)]);return this.activeUnitRole;}
 // Visits are local navigation only, not verified completion.
 isRoleCompleted(_role:Core1ARole){return false;}getCompletedRoles():readonly Core1ARole[]{return [];}getVisitedRoles(){return [...this.visited];}
 getDepthBadge(){return this.lesson.depthBadge;}getCurrentDepthView(){return this.depth;}setDepthView(d:IntrinsicDepthBadge){if(!depthOk(d))throw Error('Invalid depth');this.depth=d;}
 getModelConfig(){return structuredClone(this.lesson.modelConfig);}getModelParameters(){return structuredClone(this.parameters);}
 updateModelParameter(k:string,v:number){const b=this.lesson.modelConfig.parameterBounds;if(!Object.hasOwn(b,k)||!Number.isFinite(v)||v<b[k].min||v>b[k].max)throw Error('INVALID_MODEL_DOMAIN');this.parameters[k]=v;}
 predictModel(i:number){if(!Number.isInteger(i)||i<0||i>=this.lesson.modelConfig.predictionOptions.length)throw Error('INVALID_PREDICTION_INDEX');this.prediction=i;}
 getModelPrediction(){return {index:this.prediction,isCorrect:null};}
 observeModel():never{throw Error('DURABLE_MODEL_EXPOSURE_REQUIRED');}isModelObserved(){return false;}
 checkModelFit(){return {valid:Object.keys(this.parameters).every(k=>Object.hasOwn(this.lesson.modelConfig.parameterBounds,k)&&Number.isFinite(this.parameters[k])),feedback:'Local parameter-domain check only; no academic model-fit claim.'};}
 async readModel(binding:Parameters<ReturnType<typeof getModelRegistry>['evaluateAuthorized']>[2]){
  if(this.prediction===null||this.lesson.status==='STALE')return null;return getModelRegistry().evaluateAuthorized(this.lesson.modelConfig.modelId,this.parameters,binding);
 }
 async readAnchor(level:AnchorLevel,controller:CognitiveController,checkpoint:Checkpoint,exposureId:string,load:(ref:Ref)=>Promise<Uint8Array>){
  const anchor=this.lesson.anchors.find(a=>a.level===level);if(!anchor||this.lesson.status==='STALE')return null;
  const evidence=await controller.readEvidence(checkpoint);if(!sameRef(evidence.context.task,anchor.taskRef as Ref))return null;
  return controller.readProtectedText('READ_ANCHOR',anchor.solutionRef as Ref,checkpoint,load,exposureId);
 }
 toggleWorkedExample(_role:Core1ARole){return false;}isWorkedExampleRevealed(_role:Core1ARole){return false;}
 toggleAnchorSolution(_level:AnchorLevel){return false;}isAnchorSolutionRevealed(_level:AnchorLevel){return false;}
 canRouteToFreshTransfer(){return false;}
 getFreshRouteRejectionReason(){return this.lesson.status==='STALE'?'stale lesson':!this.lesson.freshTaskRef?'no fresh task':'no eligible fresh task';}
 getFreshTransferRoute():never{throw Error('REVIEWED_FRESH_ELIGIBILITY_REQUIRED');}
 setLearnerNotes(notes:string){if(typeof notes!=='string'||notes.length>100000)throw Error('Invalid notes');this.notes=notes;}
 getLearnerNotes(){return this.notes;}
 toDraft():Core1ADraft{return {lessonId:this.lesson.lessonRef.id,lessonRef:structuredClone(this.lesson.lessonRef),activeUnitRole:this.activeUnitRole,completedRoles:[],modelParameters:this.getModelParameters(),modelPredictionIndex:this.prediction,modelObserved:false,revealedAnchorSolutions:[],revealedWorkedExamples:[],depthView:this.depth,learnerNotes:this.notes};}
 restoreDraft(d:Core1ADraft){
  if(d.lessonId!==this.lesson.lessonRef.id||!sameRef(d.lessonRef as Ref,this.lesson.lessonRef as Ref)||!CORE1A_ORDERED_ROLES.includes(d.activeUnitRole)||!depthOk(d.depthView)||!Array.isArray(d.completedRoles)||d.completedRoles.length||d.modelObserved!==false||!Array.isArray(d.revealedAnchorSolutions)||d.revealedAnchorSolutions.length||!Array.isArray(d.revealedWorkedExamples)||d.revealedWorkedExamples.length||typeof d.learnerNotes!=='string'||d.learnerNotes.length>100000||d.modelPredictionIndex!==null&&(!Number.isInteger(d.modelPredictionIndex)||d.modelPredictionIndex<0||d.modelPredictionIndex>=this.lesson.modelConfig.predictionOptions.length))throw Error('Invalid lesson draft authority or identity');
  const bounds=this.lesson.modelConfig.parameterBounds;if(!d.modelParameters||Object.keys(d.modelParameters).length!==Object.keys(bounds).length||Object.keys(bounds).some(k=>!Object.hasOwn(d.modelParameters,k)||!Number.isFinite(d.modelParameters[k])||d.modelParameters[k]<bounds[k].min||d.modelParameters[k]>bounds[k].max))throw Error('Invalid draft parameters');
  this.activeUnitRole=d.activeUnitRole;this.parameters=structuredClone(d.modelParameters);this.prediction=d.modelPredictionIndex;this.depth=d.depthView;this.notes=d.learnerNotes;this.visited=new Set([d.activeUnitRole]);
 }
}
