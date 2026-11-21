import {escapeHtml as e, renderMathHtml} from '../runtime/rendering.ts';
import {Core1BTransferJourney,TRANSFER_ORDERED_STAGES,type Core1BTransferDefinition,type TransferBinding,type Core1BDraft,type TransferStage} from '../journeys/core1b.ts';
import type {JsonObject,Response,WorkArtifact} from '../runtime/types.ts';
import { UNIFIED_QUESTION_DATABASE } from '../runtime/unified-question-database.ts';
import { recordActiveLearnerSession } from '../runtime/learner-activity.ts';
export type DisplayOrientation='LANDSCAPE'|'PORTRAIT';
export type TransferScreenState='loading'|'error'|'populated'|'pending review'|'stale origin'|'save blocked'|'stale event'|'assisted'|'boundary locked';
export interface TransferPageConfig{readonly transferDefinition?:Core1BTransferDefinition;readonly topicCode?:string;readonly binding?:TransferBinding;readonly orientation?:DisplayOrientation;readonly initialState?:TransferScreenState;readonly errorMessage?:string}
const ref = <T extends import('../runtime/types.ts').Ref['type']>(type: T, id: string, shaChar = 'a'): import('../runtime/types.ts').Ref<T> => ({type, id, revision: 1, sha256: shaChar.repeat(64)});

export function createDefaultTransferDefinition(topicCode?: string): Core1BTransferDefinition {
  if (topicCode) {
    const matches = UNIFIED_QUESTION_DATABASE.query({ topic: topicCode, pageSize: 10 });
    if (matches.items.length >= 2) {
      const qA = matches.items[0];
      const qB = matches.items[1];
      return {
        journeyId: `journey:${topicCode.toLowerCase()}-transfer`,
        originRef: ref('LESSON', `lesson:${topicCode.toLowerCase()}-origin`, '0'),
        freshTaskA: {
          taskRef: ref('FRESH_TASK', `fresh:${qA.id}`, '1'),
          title: `Fresh Transfer Task A — ${qA.title}`,
          prompt: qA.stem,
          conditions: qA.options ? qA.options.map(o => `${o.id}: ${o.text}`) : ['Standard boundary conditions apply'],
          solutionRef: ref('SOLUTION', `solution:${qA.id}`),
          solutionSteps: qA.steps && qA.steps.length > 0 ? qA.steps : ['Isolate governing principle and execute step derivation.'],
          ...(qA.kind === 'NUMERIC_QUANTITY' || qA.kind === 'INTEGER' ? { targetNumeric: { value: 0, unit: 'arb', tolerance: 0.1 } } : {}),
        },
        boundaryTaskB: {
          taskRef: ref('FRESH_TASK', `fresh:${qB.id}`, '2'),
          title: `Boundary Transfer Task B — ${qB.title}`,
          prompt: qB.stem,
          conditions: qB.options ? qB.options.map(o => `${o.id}: ${o.text}`) : ['Changed cognitive demand boundary'],
          solutionRef: ref('SOLUTION', `solution:${qB.id}`),
          solutionSteps: qB.steps && qB.steps.length > 0 ? qB.steps : ['Verify asymptotic limit or boundary constraint.'],
        },
        hints: [
          { level: 'H1', assetRef: ref('ASSET', `asset:${qA.id}-h1`), text: qA.hints?.[0] || 'Consider baseline physical law', guidance: 'Isolate initial and final state' },
          { level: 'H2', assetRef: ref('ASSET', `asset:${qA.id}-h2`), text: qA.hints?.[1] || 'Apply energy or conservation theorem', guidance: 'Check boundary work ledger' },
          { level: 'H3', assetRef: ref('ASSET', `asset:${qA.id}-h3`), text: qA.hints?.[2] || 'Execute decisive crux calculation', guidance: 'Solve for final target quantity' },
        ],
        diagnosticRules: [
          { code: `move:${topicCode.toLowerCase()}-check`, label: 'Conservation Verification', misconceptionDescription: qA.trapWarning || 'Omission of non-conservative work', correctiveGuidance: 'Account for all dissipations' },
        ],
        qualitativePredictionPrompt: `Predict the system response when parameter values are doubled in ${qA.title}`,
        predictionOptions: ['Response increases', 'Response decreases', 'Response remains invariant'],
        expectedPredictionIndex: 0,
        status: 'SYNTHETIC',
      };
    }
  }
  const origin = ref('LESSON', 'lesson:wpe-origin', '0');
  const taskA = ref('FRESH_TASK', 'fresh:wpe-task-a', '1');
  const taskB = ref('FRESH_TASK', 'fresh:wpe-task-b', '2');
  const solA = ref('SOLUTION', 'solution:wpe-a');
  const solB = ref('SOLUTION', 'solution:wpe-b');
  return {
    journeyId: 'journey:wpe-transfer',
    originRef: origin,
    freshTaskA: {
      taskRef: taskA,
      title: 'Fresh Transfer Task A — Incline with Friction',
      prompt: 'A 5 kg crate slides down a 30-degree incline of length 10 m with coefficient of kinetic friction μ = 0.2. Calculate the work done by friction and final kinetic energy.',
      conditions: ['Incline angle θ = 30°', 'Distance d = 10 m', 'Friction coeff μ = 0.2'],
      solutionRef: solA,
      solutionSteps: [
        '1. Normal force balance perpendicular to incline: N = mg cos(30°) = 5 kg * 10 m/s² * 0.8660 = 43.30 N.',
        '2. Kinetic friction force magnitude: f_k = μ_k * N = 0.2 * 43.30 N = 8.66 N.',
        '3. Dissipative friction work: W_f = -f_k * d = -8.66 N * 10 m = -86.60 J.',
        '4. Gravitational potential conversion: W_g = mgh = mg (d sin 30°) = 5 * 10 * (10 * 0.5) = +250.0 J.',
        '5. Net work theorem: ΔK = K_f - K_i = W_net = W_g + W_f = 250.0 - 86.60 = 163.40 J.'
      ],
      targetNumeric: { value: 84.87, unit: 'J', tolerance: 0.5 },
    },
    boundaryTaskB: {
      taskRef: taskB,
      title: 'Boundary Transfer Task B — Variable Drag',
      prompt: 'Verify energy conservation when quadratic aerodynamic drag is introduced along the incline.',
      conditions: ['Quadratic drag F_d = -c * v^2'],
      solutionRef: solB,
      solutionSteps: [
        '1. Differential equation of motion along incline: m (dv/dt) = mg (sin 30° - μ cos 30°) - c v^2.',
        '2. Net driving force without drag: F_drive = mg (sin 30° - μ cos 30°) = 5 * 10 * (0.5 - 0.2 * 0.866) = 16.34 N.',
        '3. Terminal velocity reached when net acceleration dv/dt = 0: c v_term^2 = F_drive => v_term = sqrt(F_drive / c).',
        '4. Spatial integration: ∫ m v dv = ∫ [F_drive - c v^2] dx, yielding asymptotic approach toward terminal speed.',
        '5. Mechanical energy ledger: ΔE_mech = W_friction + W_drag < 0, demonstrating strictly monotonic mechanical dissipation.'
      ],
    },
    hints: [
      { level: 'H1', assetRef: ref('ASSET', 'asset:hint-1'), text: 'Consider normal force perpendicular to incline', guidance: 'Normal force is mg cos(θ), not mg' },
      { level: 'H2', assetRef: ref('ASSET', 'asset:hint-2'), text: 'Work-energy theorem relates net work to change in kinetic energy', guidance: 'W_net = W_grav + W_fric = ΔK' },
      { level: 'H3', assetRef: ref('ASSET', 'asset:hint-3'), text: 'Crux Resolution: Compute friction work W_f = -μ N d = -86.60 J and final kinetic energy K_f = W_net = mgh + W_f = 250 - 86.60 = 163.40 J', guidance: 'Substitute values directly into the four-force energy ledger' },
    ],
    diagnosticRules: [
      { code: 'move:normal-force', label: 'Normal Force Calculation', misconceptionDescription: 'Using mg instead of mg cos(θ)', correctiveGuidance: 'Project gravity perpendicular to the surface' },
      { code: 'move:friction-sign', label: 'Friction Sign Error', misconceptionDescription: 'Adding friction work as positive energy instead of negative dissipation', correctiveGuidance: 'Friction always opposes instantaneous displacement vector (W_f < 0)' },
      { code: 'move:drag-limit', label: 'Drag Asymptotic Misconception', misconceptionDescription: 'Assuming constant speed on an accelerating ramp with drag', correctiveGuidance: 'Terminal speed is only approached asymptotically as v increases toward sqrt(F_drive / c)' }
    ],
    qualitativePredictionPrompt: 'Predict whether friction work increases or decreases as incline angle steepens',
    predictionOptions: ['Friction work decreases', 'Friction work increases', 'Friction work stays constant'],
    expectedPredictionIndex: 0,
    status: 'SYNTHETIC',
  };
}

export class Core1BTransferPageController{
 private journey:Core1BTransferJourney|null=null;private orientation:DisplayOrientation='LANDSCAPE';
 constructor(c:TransferPageConfig = {}){
  this.setOrientation(c.orientation??'LANDSCAPE');
  const def = c.transferDefinition ?? createDefaultTransferDefinition(c.topicCode);
  this.journey = new Core1BTransferJourney(def, c.binding);
 }
 getJourney(){if(!this.journey)throw Error('Transfer unavailable');return this.journey;}
 start(){return this.getJourney().start();}restore(){return this.getJourney().restore();}
 actionPredict(i:number){return this.getJourney().predict(i);}
 actionRespond(values:Readonly<Record<string,Response>>,work:readonly WorkArtifact[]){this.getJourney().setResponses(values,work);}
 saveDraft(){return this.getJourney().saveDraft();}
 actionCommitFirst(){return this.getJourney().commitFirstAttempt();}actionCompare(values:Readonly<Record<string,JsonObject>>){return this.getJourney().completeReconstruction(values);}
 actionDiagnose(move:string,why:string){return this.getJourney().commitDiagnosis(move,why);}
 actionRepair(why:string,work:readonly WorkArtifact[]){return this.getJourney().commitRepair(why,work);}
 actionCommitBoundary(){return this.getJourney().commitBoundaryAttempt();}actionBoundaryFeedback(){return this.getJourney().viewBoundaryFeedback();}
 actionReturnSource(){return this.getJourney().returnToSource();}actionReturn(){return '#/subject/physics/topic/wpe/learn-try';}requestHint(){return this.getJourney().requestHint();}
 setOrientation(o:DisplayOrientation){if(!['LANDSCAPE','PORTRAIT'].includes(o))throw Error('Invalid orientation');this.orientation=o;}getOrientation(){return this.orientation;}
 toDraft(){return this.journey?.toDraft()??null;}restoreDraft(d:Core1BDraft){return this.getJourney().restoreDraft(d);}
 getViewState(){const j=this.journey,d=j?.getDefinition();return {screenState:(!j?'loading':j.isSaveBlocked()?'save blocked':!j.isReady()?'pending review':j.isAssistedAttempt()?'assisted':'populated') as TransferScreenState,journeyId:d?.journeyId??'',currentStage:j?.getStage()??'PREDICT' as TransferStage,orientation:this.orientation,isAssisted:j?.isAssistedAttempt()??false,isFirstAttemptCommitted:j?.isFirstAttemptCommitted()??false,isBoundaryCommitted:j?.isBoundaryCommitted()??false,exposedHints:j?.getExposedHints()??[],originId:d?.originRef.id??'',ready:j?.isReady()??false,minHitTargetPx:48};}
 async renderBoundaryStimulus(){const text=await this.getJourney().readBoundaryStimulus();return text===null?'<p>Boundary stimulus withheld</p>':'<pre>'+e(text)+'</pre>';}
 async renderReviewedReference(){const j=this.getJourney();if(!j.isReady())return '<p>Reviewed reference unavailable</p>';const text=j.isBoundaryCommitted()?await j.getTaskBSolution():await j.getTaskASolution();return text===null?'<p>Reviewed reference withheld</p>':'<pre>'+e(text)+'</pre>';}
 render(){const s=this.getViewState(),j=this.journey,d=j?.getDefinition();if(!d)return '<p>Transfer unavailable</p>';const task=s.currentStage==='BOUNDARY_TEST'?d.boundaryTaskB:d.freshTaskA;
 const control=(name:string)=>'<button type="button" data-action="'+name+'" style="min-height:48px;min-width:48px" '+(!s.ready?'disabled':'')+'>'+e(name)+'</button>';
 return '<main class="g9-transfer-page" data-role="CORE1B" data-stage="'+s.currentStage+'" data-orientation="'+s.orientation+'"><style>'+transferCss+'</style>'+
 '<section data-slot="identity"><h1>'+e(task.title)+'</h1><p>State: '+e(s.screenState)+'</p><nav aria-label="Transfer progression">'+TRANSFER_ORDERED_STAGES.map(x=>'<span aria-current="'+(x===s.currentStage?'step':'false')+'" style="display:inline-block;padding:8px;min-height:48px;">'+x+'</span>').join(' ')+'</nav></section>'+
 '<section data-slot="stage"><h2>Prompt & Conditions</h2><p>'+renderMathHtml(e(task.prompt))+'</p><p>'+renderMathHtml(e(task.conditions.join('; ')))+'</p><div>'+ (s.currentStage==='PREDICT'?'<p>'+renderMathHtml(e(d.qualitativePredictionPrompt))+'</p><div style="display:flex;flex-direction:column;gap:8px;">'+d.predictionOptions.map((o,i)=>'<label style="display:flex;align-items:center;gap:8px;min-height:48px;"><input type="radio" name="prediction" value="'+i+'" '+(!s.ready?'disabled':'')+'><span>'+renderMathHtml(e(o))+'</span></label>').join('')+'</div>'+control('predict'):s.currentStage==='ATTEMPT'||s.currentStage==='BOUNDARY_TEST'?'<pre>'+e(JSON.stringify(j!.getResponses()))+'</pre><div style="display:gap:8px;flex-wrap:wrap;">'+control('save-draft')+control(s.currentStage==='ATTEMPT'?'commit-first':s.isBoundaryCommitted?'boundary-feedback':'commit-boundary')+'</div>':control(s.currentStage==='RECONSTRUCT'?'compare':s.currentStage==='DIAGNOSE'?'diagnose':s.currentStage==='REPAIR'?'repair':'return-source'))+'</div></section>'+
 '<section data-slot="route"><h2>Route & Verification</h2><p>Protected content requires a current reviewed read. No academic approval inferred.</p><p role="status" data-transfer-status></p></section></main>';}
}
export type TransferPageViewState=ReturnType<Core1BTransferPageController['getViewState']>;

const transferCss=`
.g9-transfer-page{box-sizing:border-box;width:100%;max-width:100%;min-width:0;display:flex;flex-direction:column;gap:16px;overflow-wrap:anywhere;font-family:var(--g9-font-family, system-ui, sans-serif);font-size:17px;line-height:1.6;}
.g9-transfer-page *{box-sizing:border-box;min-width:0}
.g9-transfer-page [data-slot]{width:100%;padding:12px;border:1px solid #ccd7e1;border-radius:8px}
.g9-transfer-page button,.g9-transfer-page input{min-height:48px;min-width:48px;max-width:100%;font:inherit}
.g9-transfer-page button{white-space:normal;overflow-wrap:anywhere;padding:8px 16px;border-radius:6px;border:1px solid #cbd5e1;background:#f8fafc;cursor:pointer}
.g9-transfer-page button:not(:disabled):hover{background:#f1f5f9}
.g9-transfer-page :focus-visible{outline:3px solid #125d82;outline-offset:2px}
`;

export function mountCore1BTransfer(root:HTMLElement,c:Core1BTransferPageController){
 let active=true;
 const syncLearnerSession = () => {
  try {
   const vs = c.getViewState();
   const stageIdx = TRANSFER_ORDERED_STAGES.indexOf(vs.currentStage);
   const progress = Math.min(100, Math.max(15, Math.round(((stageIdx + 1) / TRANSFER_ORDERED_STAGES.length) * 100)));
   recordActiveLearnerSession({
    sessionId: vs.journeyId || 'session:wpe-core1b',
    subjectId: 'subject:physics',
    topicId: 'topic:wpe',
    title: 'Physics — Work, Power & Energy (Core 1B Transfer)',
    route: '/learning/core1b',
    progressPercent: progress,
    lastActiveAt: new Date().toISOString(),
    statusText: `Stage: ${vs.currentStage}`,
    role: 'CORE1B',
   });
  } catch {}
 };
 const render=()=>{if(!active)return;root.innerHTML=c.render();syncLearnerSession();};
 const status=(msg:string)=>{const n=root.querySelector('[data-transfer-status]');if(n)n.textContent=msg;};
 const click=async(event:Event)=>{
  const b=event.target instanceof Element?event.target.closest<HTMLButtonElement>('button'):null;if(!active||!b||b.disabled||!root.contains(b))return;
  const action=b.dataset.action;
  try{
   if(action==='predict'){
    const checked=root.querySelector<HTMLInputElement>('input[name=prediction]:checked');
    if(!checked){status('Select a prediction option.');return;}
    await c.actionPredict(Number(checked.value));render();
   }else if(action==='save-draft'){await c.saveDraft();render();}
   else if(action==='commit-first'){await c.actionCommitFirst();render();}
   else if(action==='compare'){await c.actionCompare({});render();}
   else if(action==='diagnose'){await c.actionDiagnose('default_misconception','Diagnostic observation');render();}
   else if(action==='repair'){await c.actionRepair('Conceptual repair formulation',[]);render();}
   else if(action==='commit-boundary'){await c.actionCommitBoundary();render();}
   else if(action==='boundary-feedback'){await c.actionBoundaryFeedback();render();}
   else if(action==='return-source'){await c.actionReturnSource();render();}
  }catch(e:any){status(e?.message??'Transfer error.');}
 };
 const change=(event:Event)=>{
  const n=event.target;if(!active||!(n instanceof HTMLInputElement)||!root.contains(n))return;
  if(n.name==='prediction')status('Prediction recorded; commit to proceed.');
 };
 root.addEventListener('click',click);root.addEventListener('change',change);render();
 return {refresh:()=>render(),dispose(){if(!active)return;active=false;root.removeEventListener('click',click);root.removeEventListener('change',change);root.replaceChildren();}};
}
