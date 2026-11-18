/**
 * web/journeys/explorer.ts
 * A65 — GCDR (Guided Conceptual Discovery & Reconstruction) Explorer Journey Runtime.
 *
 * Implements:
 * - Native blueprint BP-EXPLORER-GCDR@1.0.0
 * - Ten ordered cognitive exploration stages:
 *   1. PREDICT
 *   2. MANIPULATE
 *   3. OBSERVE
 *   4. CONTRADICT
 *   5. DECONSTRUCT
 *   6. RECONSTRUCT
 *   7. INVARIANT
 *   8. BOUNDARY
 *   9. FADE
 *   10. TRANSFER
 * - State-bound helper contracts:
 *   Teacher's Chalkboard, Trap Alert, Independent Check, Transfer Takeaway, Exactness Badge
 * - Truthful fidelity and binding labels:
 *   CANONICAL_BINDING, PARTIAL_BINDING, UNBOUND_EXTENSION
 * - Strict pedagogical invariant: Simulations are NEVER badged as academic proof.
 * - No answer leakage before learner commitment.
 *
 * No academic approval inferred from software validation.
 */

export const GCDR_BLUEPRINT_ID = 'BP-EXPLORER-GCDR@1.0.0';

export type GcdrStage =
  | 'PREDICT'
  | 'MANIPULATE'
  | 'OBSERVE'
  | 'CONTRADICT'
  | 'DECONSTRUCT'
  | 'RECONSTRUCT'
  | 'INVARIANT'
  | 'BOUNDARY'
  | 'FADE'
  | 'TRANSFER';

export const GCDR_ORDERED_STAGES:readonly GcdrStage[]=Object.freeze([
  'PREDICT',
  'MANIPULATE',
  'OBSERVE',
  'CONTRADICT',
  'DECONSTRUCT',
  'RECONSTRUCT',
  'INVARIANT',
  'BOUNDARY',
  'FADE',
  'TRANSFER',
] as const);

export type GcdrFidelity = 'NUMERICAL_EXACT' | 'QUALITATIVE_SYNTHETIC' | 'APPROXIMATE';

export type GcdrBindingStatus = 'CANONICAL_BINDING' | 'PARTIAL_BINDING' | 'UNBOUND_EXTENSION';

export interface ExactnessBadge {
  readonly fidelity: GcdrFidelity;
  readonly binding: GcdrBindingStatus;
  readonly academicClaimDisclaimer: string;
}

export interface GcdrHelperStates {
  readonly chalkboardNote?: string;
  readonly trapAlert?: string;
  readonly independentCheckPrompt?: string;
  readonly transferTakeaway?: string;
  readonly exactnessBadge: ExactnessBadge;
}

export interface GcdrStageContext {
  readonly stage: GcdrStage;
  readonly title: string;
  readonly instructions: string;
  readonly requiredAction: string;
  readonly allowedHelpers: readonly ('CHALKBOARD' | 'TRAP_ALERT' | 'INDEPENDENT_CHECK' | 'TAKEAWAY')[];
}

const stageDefinitions:Record<GcdrStage,GcdrStageContext> = {
  PREDICT: {
    stage: 'PREDICT',
    title: '1. Predict Outcome',
    instructions: 'Formulate qualitative and quantitative expectations before running model parameters.',
    requiredAction: 'ENTER_PREDICTION',
    allowedHelpers: ['CHALKBOARD'],
  },
  MANIPULATE: {
    stage: 'MANIPULATE',
    title: '2. Interactive Manipulation',
    instructions: 'Vary system parameters across bounded domain to explore behavior.',
    requiredAction: 'ADJUST_PARAMETERS',
    allowedHelpers: ['CHALKBOARD'],
  },
  OBSERVE: {
    stage: 'OBSERVE',
    title: '3. Empirical Observation',
    instructions: 'Inspect live quantities and synchronized second-view telemetry.',
    requiredAction: 'LOG_OBSERVATION',
    allowedHelpers: ['CHALKBOARD'],
  },
  CONTRADICT: {
    stage: 'CONTRADICT',
    title: '4. Cognitive Contradiction',
    instructions: 'Identify divergences between initial intuition and observed physical constraints.',
    requiredAction: 'RECORD_CONTRADICTION',
    allowedHelpers: ['CHALKBOARD', 'TRAP_ALERT'],
  },
  DECONSTRUCT: {
    stage: 'DECONSTRUCT',
    title: '5. Model Deconstruction',
    instructions: 'Isolate underlying physical mechanisms, active forces, or state variables.',
    requiredAction: 'ISOLATE_MECHANISM',
    allowedHelpers: ['CHALKBOARD', 'TRAP_ALERT'],
  },
  RECONSTRUCT: {
    stage: 'RECONSTRUCT',
    title: '6. Principled Reconstruction',
    instructions: 'Rebuild the complete governing equation or derivation step-by-step.',
    requiredAction: 'RECONSTRUCT_DERIVATION',
    allowedHelpers: ['CHALKBOARD', 'TRAP_ALERT', 'INDEPENDENT_CHECK'],
  },
  INVARIANT: {
    stage: 'INVARIANT',
    title: '7. Physical Invariant Analysis',
    instructions: 'Verify conserved quantities (energy, momentum, mass) across state transitions.',
    requiredAction: 'TEST_CONSERVATION',
    allowedHelpers: ['CHALKBOARD', 'INDEPENDENT_CHECK'],
  },
  BOUNDARY: {
    stage: 'BOUNDARY',
    title: '8. Boundary Case Testing',
    instructions: 'Evaluate system behavior at extreme limits (zero, infinity, critical thresholds).',
    requiredAction: 'TEST_LIMITS',
    allowedHelpers: ['CHALKBOARD', 'INDEPENDENT_CHECK'],
  },
  FADE: {
    stage: 'FADE',
    title: '9. Scaffold Fading',
    instructions: 'Solve an unguided target problem without intermediate telemetry assistance.',
    requiredAction: 'SOLVE_UNSCAFFOLDED',
    allowedHelpers: ['CHALKBOARD'],
  },
  TRANSFER: {
    stage: 'TRANSFER',
    title: '10. General Transfer',
    instructions: 'Apply the underlying physical principles to an entirely fresh domain context.',
    requiredAction: 'APPLY_TRANSFER',
    allowedHelpers: ['CHALKBOARD', 'TAKEAWAY'],
  },
};

export const GCDR_STAGE_DEFINITIONS:Readonly<Record<GcdrStage,GcdrStageContext>>=Object.freeze(Object.fromEntries(Object.entries(stageDefinitions).map(([k,v])=>[k,Object.freeze({...v,allowedHelpers:Object.freeze([...v.allowedHelpers])})]))) as Readonly<Record<GcdrStage,GcdrStageContext>>;
// Local diagnostic transcript; no stage field or snapshot is an A48/A49 receipt.
export interface StageEvidence {readonly stage:GcdrStage;readonly response:string;readonly x:number;}
export interface GcdrExplorerDraft{
 readonly blueprintId:string;readonly explorerId:string;readonly currentStageIndex:number;
 readonly stageResponses:Record<string,string>;readonly modelParameters:Record<string,number>;
 readonly initialX:number;readonly evidence:readonly StageEvidence[];readonly isCompleted:boolean;
 readonly revision:number;readonly lastModifiedAt:string;
}
const validX=(x:unknown):x is number=>typeof x==='number'&&Number.isFinite(x)&&x>=-.5&&x<=.5;
const validText=(x:unknown):x is string=>typeof x==='string'&&x.trim().length>0&&x.length<=10000;
const validParams=(x:Record<string,number>)=>!!x&&Object.keys(x).length===1&&Object.hasOwn(x,'x')&&validX(x.x);
export class GcdrExplorerJourney {
 readonly blueprintId=GCDR_BLUEPRINT_ID;private readonly explorerId:string;private readonly initialX:number;
 private currentStageIndex=0;private evidence:StageEvidence[]=[];private pending:string|null=null;private x:number;private revision=1;
 constructor(explorerId:string,_helpers:GcdrHelperStates,initialParameters:Record<string,number>={x:0}){
  if(!explorerId.trim()||!validParams(initialParameters))throw Error('Invalid explorer identity or parameter domain');
  this.explorerId=explorerId;this.initialX=initialParameters.x;this.x=this.initialX;
 }
 getExplorerId(){return this.explorerId;}
 getCurrentStage(){return GCDR_ORDERED_STAGES[this.currentStageIndex]!;}
 getCurrentStageIndex(){return this.currentStageIndex;}
 getCurrentStageDefinition(){return structuredClone(GCDR_STAGE_DEFINITIONS[this.getCurrentStage()]);}
 getHelpers():GcdrHelperStates{
  // No caller-supplied labels or answer-bearing helpers are disclosure authority.
  return {exactnessBadge:{fidelity:'QUALITATIVE_SYNTHETIC',binding:'UNBOUND_EXTENSION',academicClaimDisclaimer:'Simulations are engineering exploration tools, not certified academic proofs.'}};
 }
 getModelParameters(){return {x:this.x};}
 setModelParameter(paramId:string,value:number):boolean{
  if(paramId!=='x'||!validX(value)||this.currentStageIndex!==this.evidence.length||this.getCurrentStage()!=='MANIPULATE')return false;
  this.x=value;this.revision++;return true;
 }
 getStageResponse(stage:GcdrStage){const e=this.evidence.find(x=>x.stage===stage);return e?.response??(stage===this.getCurrentStage()?this.pending:null);}
 setStageResponse(stage:GcdrStage,responseText:string):boolean{
  if(stage!==this.getCurrentStage()||this.currentStageIndex!==this.evidence.length||!validText(responseText))return false;
  this.pending=responseText.trim();this.revision++;return true;
 }
 isStageCompleted(stage:GcdrStage){return this.evidence.some(e=>e.stage===stage);}
 isCompleted(){return this.evidence.length===GCDR_ORDERED_STAGES.length;}
 advance():{success:boolean;error?:string}{
  if(this.currentStageIndex<this.evidence.length){if(this.currentStageIndex===9)return {success:false,error:'Local transcript already complete'};this.currentStageIndex++;this.revision++;return {success:true};}
  const stage=this.getCurrentStage();
  if(!validText(this.pending))return {success:false,error:'Cannot advance without recording learner response/evidence'};
  if(stage==='MANIPULATE'&&this.x===this.initialX)return {success:false,error:'Record a changed model parameter'};
  this.evidence.push({stage,response:this.pending,x:this.x});this.pending=null;
  if(this.currentStageIndex<9)this.currentStageIndex++;this.revision++;return {success:true};
 }
 goToStage(stage:GcdrStage):boolean{
  const i=GCDR_ORDERED_STAGES.indexOf(stage);if(i<0||i>Math.min(this.evidence.length,9)||this.pending!==null||this.evidence.length===1&&this.x!==this.initialX)return false;
  this.currentStageIndex=i;this.revision++;return true;
 }
 exportDraft():GcdrExplorerDraft{
  const stageResponses=Object.fromEntries(this.evidence.map(e=>[e.stage,e.response]));
  if(this.pending!==null)stageResponses[this.getCurrentStage()]=this.pending;
  return {blueprintId:this.blueprintId,explorerId:this.explorerId,currentStageIndex:this.currentStageIndex,stageResponses,modelParameters:{x:this.x},initialX:this.initialX,evidence:structuredClone(this.evidence),isCompleted:this.isCompleted(),revision:this.revision,lastModifiedAt:new Date().toISOString()};
 }
 restoreDraft(d:GcdrExplorerDraft){
  if(d.blueprintId!==this.blueprintId||d.explorerId!==this.explorerId||d.initialX!==this.initialX||!Number.isSafeInteger(d.revision)||d.revision<1||!Number.isInteger(d.currentStageIndex)||!Array.isArray(d.evidence)||d.evidence.length>10||d.currentStageIndex<0||d.currentStageIndex>Math.min(d.evidence.length,9)||d.isCompleted!==(d.evidence.length===10)||!validParams(d.modelParameters)||!d.stageResponses||typeof d.stageResponses!=='object'||Array.isArray(d.stageResponses))throw Error('Foreign or invalid explorer draft');
  let x=this.initialX;const seen=new Set<string>();
  for(const [i,e] of d.evidence.entries()){
   if(!e||e.stage!==GCDR_ORDERED_STAGES[i]||!validText(e.response)||!validX(e.x)||d.stageResponses[e.stage]!==e.response)throw Error('Invalid ordered explorer evidence');
   if(i===1){if(e.x===x)throw Error('Missing manipulation evidence');x=e.x;}else if(e.x!==x)throw Error('Unexpected parameter transition');seen.add(e.stage);
  }
  const current=GCDR_ORDERED_STAGES[d.currentStageIndex],pending=Object.hasOwn(d.stageResponses,current)&&!seen.has(current)?d.stageResponses[current]:null;
  if(pending!==null&&(!validText(pending)||d.currentStageIndex!==d.evidence.length)||Object.keys(d.stageResponses).some(k=>!seen.has(k)&&!(k===current&&pending!==null))||d.modelParameters.x!==x&&!(d.evidence.length===1&&d.currentStageIndex===1))throw Error('Invalid explorer response or parameter closure');
  this.evidence=structuredClone(d.evidence) as StageEvidence[];this.currentStageIndex=d.currentStageIndex;this.x=d.modelParameters.x;this.pending=pending;this.revision=d.revision;
 }
}
