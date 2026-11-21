import {escapeHtml as e} from '../runtime/rendering.ts';
import {Core1ATeachingJourney,CORE1A_ORDERED_ROLES,ANCHOR_LEVELS,type Core1ALessonDefinition,type Core1ARole,type Core1ADraft,type AnchorLevel,type IntrinsicDepthBadge} from '../journeys/core1a.ts';
import {Core1AUnitViewController,Core1AAnchorViewController,Core1AModelStageController} from '../components/teaching/index.ts';
import { UNIFIED_QUESTION_DATABASE } from '../runtime/unified-question-database.ts';
import { recordActiveLearnerSession } from '../runtime/learner-activity.ts';
export type DisplayOrientation='LANDSCAPE'|'PORTRAIT';
export type LessonScreenState='loading'|'error'|'populated'|'no fresh task'|'stale lesson'|'missing unit'|'invalid model domain'|'no eligible fresh task';
export interface LessonPageConfig{readonly lessonDefinition?:Core1ALessonDefinition;readonly topicCode?:string;readonly orientation?:DisplayOrientation;readonly initialState?:LessonScreenState;readonly errorMessage?:string}
const ref = <T extends import('../runtime/types.ts').Ref['type']>(type: T, id: string): import('../runtime/types.ts').Ref<T> => ({type, id, revision: 1, sha256: 'a'.repeat(64)});

export function createDefaultLesson(topicCode?: string): Core1ALessonDefinition {
  const roleTitles: Record<Core1ARole, { title: string; summary: string; bodyText: string }> = {
    A1: {
      title: 'Phenomenon: Work, Direction & Energy Transfer',
      summary: 'Deciding whether a force adds energy, removes energy, or does zero work (W = ∫ F · dr).',
      bodyText: 'A force does work on an object only when there is a component of displacement along the line of action of the force. If the force points in the direction of motion, work is positive and kinetic energy increases. If it opposes motion, work is negative and energy is removed. If the force is perpendicular to displacement (like the normal force on a flat track), the work done is exactly zero.'
    },
    A2: {
      title: 'Prerequisite Conventions: Coordinate Frames & Reference States',
      summary: 'Sign conventions, scalar dot products, and reference points for potential energy.',
      bodyText: 'We define reference coordinates where displacement Δx > 0 represents forward motion. For gravitational potential energy, U_g = mgh with U_g = 0 at the ground datum. For elastic potential energy, U_s = 0.5 * k * x^2 where x is displacement from the natural unstretched spring length.'
    },
    A3: {
      title: 'Representation Bridge: Free-Body Diagram to Energy Ledger',
      summary: 'Mapping individual force vectors to the four-force work ledger.',
      bodyText: 'To analyze a mechanical system like a cart on an incline: 1. Isolate the system boundary. 2. Identify every external force: motor thrust F, kinetic friction f, gravitational force mg, and normal reaction N. 3. Construct the signed work ledger: W_net = W_motor + W_f + W_g + W_N.'
    },
    A4: {
      title: 'Law & Conditions: Work-Kinetic Energy Theorem & Gradient Relation',
      summary: 'Derivation of W_net = ΔK and conservative force F = -dU/dx.',
      bodyText: 'Integrating Newton\'s Second Law along a spatial trajectory gives ∫ F_net dx = ∫ m v (dv/dx) dx = 0.5 * m * v_f^2 - 0.5 * m * v_i^2 = ΔK. For conservative fields, the work done along any closed loop is zero, defining potential energy U such that F = -dU/dx.'
    },
    A5: {
      title: 'Scientific Simulation: Reading One-Dimensional Potential Curves',
      summary: 'Potential landscapes, turning points, bound states, and equilibrium stability.',
      bodyText: 'Given an energy curve U(x), total mechanical energy E = K + U forms a horizontal line. Motion is physically accessible only where E >= U(x). The points where E = U(x) are turning points where speed v = 0. Local minima of U(x) represent points of stable equilibrium (dU/dx = 0, d^2U/dx^2 > 0).'
    },
    A6: {
      title: 'Reasoning Construction: Toy Cart Ramp Climb Worked Example',
      summary: 'Step-by-step energy ledger calculation for a 3 kg cart climbing a 2 m incline.',
      bodyText: 'Complete calculation of motor work (+30 J), friction loss (-6 J), and gravity work (-15 J), finding net work +9 J and final summit speed 2.45 m/s.'
    },
    A7: {
      title: 'Misconception Alert: Equal Momentum vs Equal Kinetic Energy',
      summary: 'Why equal momentum does NOT imply equal kinetic energy.',
      bodyText: 'A frequent error is assuming equal momentum means equal energy. Because K = p^2 / (2m), for two objects with identical momentum p, the lighter object has significantly greater kinetic energy.'
    },
    A8: {
      title: 'Boundary & Changed Demand: Insufficient Motor Thrust',
      summary: 'Evaluating the climb threshold when motor thrust drops to 10 N.',
      bodyText: 'What happens if motor thrust is reduced to 10 N? Over a hypothetical full climb, motor work would be only +20 J, while friction (-6 J) and gravity (-15 J) require -21 J. Net work would be -1 J. Since a cart starting from rest cannot have negative kinetic energy, the cart stops before reaching the summit.'
    },
    A9: {
      title: 'Synthesis: Coupled Two-Body Momentum & Energy Partition',
      summary: 'Energy partition between spring-released push-apart carts.',
      bodyText: 'When two carts of mass m1 and m2 are pushed apart by a compressed spring on a frictionless track, conservation of momentum gives p1 + p2 = 0 => |p1| = |p2| = p. The spring energy E_s = 0.5 * k * x^2 is partitioned as K1 / K2 = m2 / m1. The lighter cart receives the larger share of kinetic energy.'
    }
  };

  return {
    lessonRef: ref('LESSON', 'lesson:physics-wpe'),
    constructionRef: ref('CONSTRUCTION', 'construction:physics-wpe'),
    title: 'Work, Power and Energy: 5 Thinking Skills & Concept Construction',
    subject: 'PHYSICS',
    topicId: 'topic:wpe',
    depthBadge: 'MEDIUM',
    status: 'HOLD',
    units: CORE1A_ORDERED_ROLES.map(role => ({
      role,
      title: roleTitles[role].title,
      summary: roleTitles[role].summary,
      bodyText: roleTitles[role].bodyText,
      blockRefs: [ref('SOURCE', 'source:' + role)],
      evidenceRefs: [ref('WARRANT', 'warrant:' + role)],
      ...(role === 'A6' ? {
        workedExample: {
          problemPrompt: 'A 3 kg toy cart climbs a 2 m ramp rising 0.5 m with 15 N motor thrust and 3 N opposing friction. Find net work and final speed from rest.',
          fullReasoningSteps: [
            '1. System: Cart. Normal force is perpendicular to incline so W_N = 0 J.',
            '2. Motor work W_motor = +15 N * 2 m = +30 J.',
            '3. Friction work W_f = -3 N * 2 m = -6 J.',
            '4. Gravity work W_g = -mgh = -3 kg * 10 m/s^2 * 0.5 m = -15 J.',
            '5. Net work W_net = +30 - 6 - 15 = +9 J.',
            '6. By Work-Energy Theorem: K_f = W_net = 9 J. 0.5 * 3 * v^2 = 9 => v^2 = 6 => v = 2.45 m/s.'
          ],
          solutionResult: 'W_net = +9.0 J, v_final = 2.45 m/s (Cart successfully reaches the top flag)'
        }
      } : {}),
      ...(role === 'A7' ? {
        misconception: {
          wrongIdea: 'Objects with equal momentum have the same kinetic energy, or normal force always does work.',
          diagnosticPrompt: 'A 2 kg cart and a 4 kg cart have the same momentum p = 8 kg m/s. Which cart has more kinetic energy?',
          repair: 'Using K = p^2 / (2m): Cart A has 8^2 / (2*2) = 16 J, while Cart B has 8^2 / (2*4) = 8 J. Cart A has twice the kinetic energy because its mass is half as large.'
        }
      } : {})
    })),
    anchors: (() => {
      if (topicCode) {
        const matches = UNIFIED_QUESTION_DATABASE.query({ topic: topicCode, pageSize: 20 });
        if (matches.items.length >= 3) {
          const qFound = matches.items.find(q => q.difficultyBand === 'D1') || matches.items[0];
          const qConn = matches.items.find(q => q.difficultyBand === 'D2' || q.difficultyBand === 'D3') || matches.items[1];
          const qAdv = matches.items.find(q => q.difficultyBand === 'D4') || matches.items[2];
          return [
            {
              level: 'FOUNDATION' as const,
              taskRef: ref('QUESTION', qFound.id),
              title: `Foundation Anchor: ${qFound.title}`,
              prompt: qFound.stem,
              solutionRef: ref('SOLUTION', `solution:${qFound.id}`),
              solutionSteps: qFound.steps && qFound.steps.length > 0 ? qFound.steps : ['Verify fundamental definition and baseline formula application.'],
              warrantRefs: [ref('WARRANT', `warrant:${qFound.id}`)]
            },
            {
              level: 'CONNECTED' as const,
              taskRef: ref('QUESTION', qConn.id),
              title: `Connected Anchor: ${qConn.title}`,
              prompt: qConn.stem,
              solutionRef: ref('SOLUTION', `solution:${qConn.id}`),
              solutionSteps: qConn.steps && qConn.steps.length > 0 ? qConn.steps : ['Isolate boundary constraints and solve coupled algebraic conditions.'],
              warrantRefs: [ref('WARRANT', `warrant:${qConn.id}`)]
            },
            {
              level: 'ADVANCED' as const,
              taskRef: ref('QUESTION', qAdv.id),
              title: `Advanced Anchor: ${qAdv.title}`,
              prompt: qAdv.stem,
              solutionRef: ref('SOLUTION', `solution:${qAdv.id}`),
              solutionSteps: qAdv.steps && qAdv.steps.length > 0 ? qAdv.steps : ['Evaluate limiting conditions, extremal points, or dimensional constraints.'],
              warrantRefs: [ref('WARRANT', `warrant:${qAdv.id}`)]
            }
          ];
        }
      }
      return [
        {
          level: 'FOUNDATION' as const,
          taskRef: ref('QUESTION', 'question:anchor:foundation'),
          title: 'Foundation Anchor: Constant Force Work Balance',
          prompt: 'Evaluate the work done by a constant 20 N horizontal force over a 5 m displacement on a frictionless surface.',
          solutionRef: ref('SOLUTION', 'solution:anchor:foundation'),
          solutionSteps: ['W = F * d = 20 N * 5 m = 100 J', 'Initial kinetic energy = 0 => Final kinetic energy = 100 J'],
          warrantRefs: [ref('WARRANT', 'warrant:foundation')]
        },
        {
          level: 'CONNECTED' as const,
          taskRef: ref('QUESTION', 'question:anchor:connected'),
          title: 'Connected Anchor: Incline Ledger with Sliding Friction',
          prompt: 'A 5 kg crate slides down a 30° incline of length 10 m with friction coefficient μ = 0.2. Calculate net work and final speed.',
          solutionRef: ref('SOLUTION', 'solution:anchor:connected'),
          solutionSteps: [
            'Normal force N = mg cos(30°) = 5 * 10 * 0.866 = 43.3 N',
            'Friction force f = μN = 0.2 * 43.3 = 8.66 N',
            'Friction work W_f = -8.66 N * 10 m = -86.6 J',
            'Gravity work W_g = mgh = 5 * 10 * (10 * sin(30°)) = 250 J',
            'Net work W_net = 250 - 8.66 = 163.4 J => v = sqrt(2 * 163.4 / 5) = 8.08 m/s'
          ],
          warrantRefs: [ref('WARRANT', 'warrant:connected')]
        },
        {
          level: 'ADVANCED' as const,
          taskRef: ref('QUESTION', 'question:anchor:advanced'),
          title: 'Advanced Anchor: Multi-Well Potential Barrier Crossing',
          prompt: 'A particle of mass m = 1 kg moves in potential U(x) = (x^2 - 4)^2 J. Determine turning points and barrier crossing condition at x = 0.',
          solutionRef: ref('SOLUTION', 'solution:anchor:advanced'),
          solutionSteps: [
            'Potential minimum at x = ±2 m with U(±2) = 0 J',
            'Central potential barrier at x = 0 m with U(0) = (0 - 4)^2 = 16 J',
            'To cross from left well (x < 0) to right well (x > 0), total mechanical energy E must strictly exceed 16 J'
          ],
          warrantRefs: [ref('WARRANT', 'warrant:advanced')]
        }
      ];
    })(),
    modelConfig: {
      modelId: 'PHYS-MODEL-ENERGY-WELL',
      modelName: 'Potential Well Dynamics & Turning Points',
      defaultParameters: { x: 0 },
      parameterBounds: { x: { min: -3, max: 3 } },
      qualitativePredictionPrompt: 'Predict how kinetic energy K changes as displacement x moves from the well bottom (x = 2) toward the barrier (x = 0)',
      predictionOptions: [
        'K decreases as potential energy U increases, reaching minimum at the barrier peak',
        'K remains constant because total energy is conserved',
        'K increases linearly with displacement'
      ],
      expectedPredictionIndex: 0,
      observationNote: 'E = K + U(x) => K(x) = E - U(x). At turning points E = U(x) and K = 0.'
    },
    synthesisTaskRef: ref('QUESTION', 'question:synthesis:wpe'),
    synthesisTaskPrompt: 'Synthesize the conservation laws under coupled multi-force and non-conservative dissipation',
    freshTaskRef: ref('FRESH_TASK', 'fresh:wpe-01')
  };
}

export class Core1ALessonPageController{
 private journey:Core1ATeachingJourney|null=null;private orientation:DisplayOrientation='LANDSCAPE';private state:LessonScreenState='loading';private error='';private anchor:AnchorLevel='FOUNDATION';
 constructor(config:LessonPageConfig = {}){
  this.setOrientation(config.orientation??'LANDSCAPE');
  const def = config.lessonDefinition ?? createDefaultLesson(config.topicCode);
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
 const syncLearnerSession = () => {
  try {
   const vs = c.getViewState();
   const roleIdx = CORE1A_ORDERED_ROLES.indexOf(vs.activeUnitRole as any);
   const progress = Math.min(100, Math.max(15, Math.round(((roleIdx + 1) / CORE1A_ORDERED_ROLES.length) * 100)));
   recordActiveLearnerSession({
    sessionId: vs.lessonId || 'session:wpe-core1a',
    subjectId: 'subject:' + (vs.subject?.toLowerCase() || 'physics'),
    topicId: 'topic:' + (vs.topicId?.toLowerCase() || 'wpe'),
    title: vs.title || 'Physics — Work, Power & Energy (Core 1A)',
    route: '/learning/core1a',
    progressPercent: progress,
    lastActiveAt: new Date().toISOString(),
    statusText: `Section ${vs.activeUnitRole}: ${vs.activeUnitTitle}`,
    role: 'CORE1A',
   });
  } catch {}
 };
 const render=(focus?:{key:string;value:string})=>{
  if(!active)return;
  root.innerHTML=c.render();
  syncLearnerSession();
  if(focus){const nodes=root.querySelectorAll<HTMLElement>('button');for(const n of nodes)if(n.getAttribute(focus.key)===focus.value){n.focus({preventScroll:true});break;}}
 };
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
