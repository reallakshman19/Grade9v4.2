import {escapeHtml as e} from '../runtime/rendering.ts';
import {Core1ATeachingJourney,CORE1A_ORDERED_ROLES,ANCHOR_LEVELS,type Core1ALessonDefinition,type Core1ARole,type Core1ADraft,type AnchorLevel,type IntrinsicDepthBadge} from '../journeys/core1a.ts';
import {Core1AUnitViewController,Core1AAnchorViewController,Core1AModelStageController} from '../components/teaching/index.ts';
export type DisplayOrientation='LANDSCAPE'|'PORTRAIT';
export type LessonScreenState='loading'|'error'|'populated'|'no fresh task'|'stale lesson'|'missing unit'|'invalid model domain'|'no eligible fresh task';
export interface LessonPageConfig{readonly lessonDefinition?:Core1ALessonDefinition;readonly orientation?:DisplayOrientation;readonly initialState?:LessonScreenState;readonly errorMessage?:string}
const ref = <T extends import('../runtime/types.ts').Ref['type']>(type: T, id: string): import('../runtime/types.ts').Ref<T> => ({type, id, revision: 1, sha256: 'a'.repeat(64)});

export function createDefaultLesson(): Core1ALessonDefinition {
  return {
    lessonRef: ref('LESSON', 'lesson:physics-wpe'),
    constructionRef: ref('CONSTRUCTION', 'construction:physics-wpe'),
    title: 'Work, Power and Potential Energy',
    subject: 'PHYSICS',
    topicId: 'topic:wpe',
    depthBadge: 'MEDIUM',
    status: 'SYNTHETIC',
    units: CORE1A_ORDERED_ROLES.map(role => ({
      role,
      title: 'Unit ' + role,
      summary: 'Core concept summary for ' + role,
      bodyText: 'Structured conceptual exploration and invariant principles for ' + role,
      blockRefs: [ref('SOURCE', 'source:' + role)],
      evidenceRefs: [ref('WARRANT', 'warrant:' + role)],
      ...(role === 'A6' ? {workedExample: {problemPrompt: 'Worked problem example', fullReasoningSteps: ['Step 1: Identify energy states', 'Step 2: Apply work-energy theorem'], solutionResult: 'Work done W = ΔK + ΔU'}} : {}),
      ...(role === 'A7' ? {misconception: {wrongIdea: 'Work is always positive', diagnosticPrompt: 'What happens when friction opposes motion?', repair: 'Frictional work opposes velocity vector and is negative'}} : {})
    })),
    anchors: ANCHOR_LEVELS.map(level => ({
      level,
      taskRef: ref('QUESTION', 'question:' + level),
      title: level + ' Anchor',
      prompt: 'Evaluate the physical anchor scenario at ' + level + ' depth',
      solutionRef: ref('SOLUTION', 'solution:' + level),
      solutionSteps: ['Balance applied force against conservative field gradient'],
      warrantRefs: [ref('WARRANT', 'warrant:' + level)]
    })),
    modelConfig: {
      modelId: 'PHYS-MODEL-ENERGY-WELL',
      modelName: 'Potential Well Dynamics',
      defaultParameters: {x: 0},
      parameterBounds: {x: {min: -0.5, max: 0.5}},
      qualitativePredictionPrompt: 'Predict potential energy change as displacement x increases',
      predictionOptions: ['Increases parabolically', 'Remains constant', 'Decreases linearly'],
      expectedPredictionIndex: 0,
      observationNote: 'U(x) = 0.5 * k * x^2'
    },
    synthesisTaskRef: ref('QUESTION', 'question:synthesis'),
    synthesisTaskPrompt: 'Synthesize the conservation laws under non-conservative frictional dissipation',
    freshTaskRef: ref('FRESH_TASK', 'fresh:wpe-01')
  };
}

export class Core1ALessonPageController{
 private journey:Core1ATeachingJourney|null=null;private orientation:DisplayOrientation='LANDSCAPE';private state:LessonScreenState='loading';private error='';private anchor:AnchorLevel='FOUNDATION';
 constructor(config:LessonPageConfig = {}){
  this.setOrientation(config.orientation??'LANDSCAPE');
  const def = config.lessonDefinition ?? createDefaultLesson();
  if(def){try{this.journey=new Core1ATeachingJourney(def);this.state='populated';}catch{this.state='error';this.error='Invalid lesson definition';}}
  else this.state=config.initialState??'loading';
 }
 private j(){if(!this.journey)throw Error('Lesson unavailable');return this.journey;}
 actionSection(role:Core1ARole){this.j().selectSection(role);}
 actionExample(role?:Core1ARole){return this.j().toggleWorkedExample(role??this.j().getActiveRole());}
 actionFreshTask(){return {allowed:false,reason:this.journey?.getFreshRouteRejectionReason()??'Lesson unavailable'};}
 actionReturn(){return '/home';}
 actionPredictModel(i:number){this.j().predictModel(i);}
 actionObserveModel(){return this.j().observeModel();}
 actionDepth(d?:IntrinsicDepthBadge){const j=this.j(),cur=j.getCurrentDepthView(),next=d??(cur==='EASY'?'MEDIUM':cur==='MEDIUM'?'HARD':'EASY');j.setDepthView(next);return next;}
 actionModelFit(){return this.j().checkModelFit();}
 updateModelParameter(k:string,v:number){this.j().updateModelParameter(k,v);}
 selectAnchorTab(level:AnchorLevel){if(!ANCHOR_LEVELS.includes(level))throw Error('Invalid anchor');this.anchor=level;}
 toggleAnchorSolution(level?:AnchorLevel){return this.j().toggleAnchorSolution(level??this.anchor);}
 setOrientation(o:DisplayOrientation){if(!['LANDSCAPE','PORTRAIT'].includes(o))throw Error('Invalid orientation');this.orientation=o;}
 getOrientation(){return this.orientation;}
 toDraft(){return this.journey?.toDraft()??null;}restoreDraft(d:Core1ADraft){this.j().restoreDraft(d);}
 getViewState(){const j=this.journey,l=j?.getLesson();return {screenState:l?.status==='STALE'?'stale lesson':this.state,lessonId:l?.lessonRef.id??'',title:l?.title??'Lesson unavailable',subject:l?.subject??'',topicId:l?.topicId??'',activeUnitRole:j?.getActiveRole()??'A1',activeUnitTitle:j?.getActiveUnit().title??'',orientation:this.orientation,completedRoles:j?.getCompletedRoles()??[],visitedRoles:j?.getVisitedRoles()??[],currentDepth:j?.getCurrentDepthView()??'MEDIUM',modelObserved:false,modelPredicted:j?.getModelPrediction().index!=null,modelFitValid:j?.checkModelFit().valid??false,canRouteFresh:false,freshRouteRejectionReason:j?.getFreshRouteRejectionReason()??'Lesson unavailable',minHitTargetPx:48};}
 render(){const s=this.getViewState();if(!this.journey)return '<section role="status">'+e(this.error||s.title)+'</section>';const j=this.journey,l=j.getLesson(),u=new Core1AUnitViewController({unitData:j.getActiveUnit(),initialDepth:j.getCurrentDepthView()});const a=new Core1AAnchorViewController({anchors:l.anchors,synthesisTaskRef:l.synthesisTaskRef,synthesisTaskPrompt:l.synthesisTaskPrompt,initialLevel:this.anchor});const m=new Core1AModelStageController({...l.modelConfig,defaultParameters:j.getModelParameters()},j.getCurrentDepthView());if(j.getModelPrediction().index!==null)m.predict(j.getModelPrediction().index!);
 const active=s.activeUnitRole,identity=['A1','A2'].includes(active),construction=['A3','A4','A5','A6'].includes(active);
 return '<main class="g9-lesson-page" data-orientation="'+s.orientation+'" data-role="CORE1A"><style>'+lessonCss+'</style>'+
 '<section data-slot="identity"><h1>'+e(l.title)+'</h1><p>Unverified teaching diagnostic; no reviewed route or academic admission.</p>'+
 '<nav aria-label="Teaching sections">'+CORE1A_ORDERED_ROLES.map(role=>'<button type="button" data-role="'+role+'" aria-pressed="'+(active===role)+'">'+role+'</button>').join('')+'</nav>'+
 '<nav aria-label="Explanation depth">'+(['EASY','MEDIUM','HARD'] as const).map(d=>'<button type="button" data-depth="'+d+'" aria-pressed="'+(s.currentDepth===d)+'">'+d+'</button>').join('')+'</nav>'+
 (identity?u.render():'')+'</section><section data-slot="construction"><h2>Construction</h2>'+(construction?u.render():'')+m.render()+a.render(false)+'</section>'+
 '<section data-slot="repair_closure"><h2>Repair and closure</h2>'+(!identity&&!construction?u.render():'')+a.renderSynthesis()+'<button disabled>Fresh transfer unavailable</button></section><p role="status" data-lesson-status></p></main>';}
}
export type LessonPageViewState=ReturnType<Core1ALessonPageController['getViewState']>;

const lessonCss=`
.g9-lesson-page{box-sizing:border-box;width:100%;max-width:100%;min-width:0;display:flex;flex-direction:column;gap:16px;overflow-wrap:anywhere;font:inherit}
.g9-lesson-page *{box-sizing:border-box;min-width:0}
.g9-lesson-page [data-slot]{width:100%;padding:12px;border:1px solid #ccd7e1;border-radius:8px}
.g9-lesson-page nav{display:flex;flex-wrap:wrap;gap:8px;margin:8px 0}
.g9-lesson-page button,.g9-lesson-page input{min-height:48px;min-width:48px;max-width:100%;font:inherit}
.g9-lesson-page button{padding:8px;white-space:normal;overflow-wrap:anywhere}
.g9-lesson-page button[aria-pressed=true]{outline:2px solid #125d82;outline-offset:-2px}
.g9-lesson-page .g9-model-stage-component label{display:flex;align-items:center;gap:8px;min-height:48px;margin:8px 0;flex-wrap:wrap}
.g9-lesson-page input[type=range]{flex:1 1 120px}
.g9-lesson-page :focus-visible{outline:3px solid #125d82;outline-offset:2px}
.g9-lesson-page p,.g9-lesson-page li{white-space:pre-wrap;overflow-wrap:anywhere}
`;
// Actual diagnostic DOM binding. This does not bootstrap reviewed content or
// authorize a worked example, numerical observation, fresh task or completion.
export function mountCore1ALesson(root:HTMLElement,c:Core1ALessonPageController){
 let active=true;
 const render=(focus?:{key:string;value:string})=>{if(!active)return;root.innerHTML=c.render();if(focus){const nodes=root.querySelectorAll<HTMLElement>('button');for(const n of nodes)if(n.getAttribute(focus.key)===focus.value){n.focus({preventScroll:true});break;}}};
 const status=(message:string)=>{const n=root.querySelector('[data-lesson-status]');if(n)n.textContent=message;};
 const click=(event:Event)=>{
  const b=event.target instanceof Element?event.target.closest<HTMLButtonElement>('button'):null;if(!active||!b||b.disabled||!root.contains(b))return;
  try{if(b.dataset.role){c.actionSection(b.dataset.role as Core1ARole);render({key:'data-role',value:b.dataset.role});}
   else if(b.dataset.level){c.selectAnchorTab(b.dataset.level as AnchorLevel);render({key:'data-level',value:b.dataset.level});}
   else if(b.dataset.depth){c.actionDepth(b.dataset.depth as IntrinsicDepthBadge);render({key:'data-depth',value:b.dataset.depth});}
  }catch{status('Invalid diagnostic control.');}
 };
 const input=(event:Event)=>{
  const n=event.target;if(!active||!(n instanceof HTMLInputElement)||!root.contains(n))return;
  try{if(n.type==='radio'&&n.name==='prediction'&&n.checked)c.actionPredictModel(Number(n.value));
   else if(n.type==='range'&&n.dataset.parameter)c.updateModelParameter(n.dataset.parameter,Number(n.value));
   else return;status('Local diagnostic input recorded; reviewed output remains withheld.');
  }catch{status('Invalid diagnostic input.');}
 };
 root.addEventListener('click',click);root.addEventListener('input',input);root.addEventListener('change',input);render();
 return {refresh:()=>render(),dispose(){if(!active)return;active=false;root.removeEventListener('click',click);root.removeEventListener('input',input);root.removeEventListener('change',input);root.replaceChildren();}};
}
