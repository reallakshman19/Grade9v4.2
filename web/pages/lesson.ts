import {escapeHtml as e} from '../runtime/rendering.ts';
import {Core1ATeachingJourney,CORE1A_ORDERED_ROLES,ANCHOR_LEVELS,type Core1ALessonDefinition,type Core1ARole,type Core1ADraft,type AnchorLevel,type IntrinsicDepthBadge} from '../journeys/core1a.ts';
import {Core1AUnitViewController,Core1AAnchorViewController,Core1AModelStageController} from '../components/teaching/index.ts';
export type DisplayOrientation='LANDSCAPE'|'PORTRAIT';
export type LessonScreenState='loading'|'error'|'populated'|'no fresh task'|'stale lesson'|'missing unit'|'invalid model domain'|'no eligible fresh task';
export interface LessonPageConfig{readonly lessonDefinition?:Core1ALessonDefinition;readonly orientation?:DisplayOrientation;readonly initialState?:LessonScreenState;readonly errorMessage?:string}
export class Core1ALessonPageController{
 private journey:Core1ATeachingJourney|null=null;private orientation:DisplayOrientation='LANDSCAPE';private state:LessonScreenState='loading';private error='';private anchor:AnchorLevel='FOUNDATION';
 constructor(config:LessonPageConfig){this.setOrientation(config.orientation??'LANDSCAPE');if(config.lessonDefinition){try{this.journey=new Core1ATeachingJourney(config.lessonDefinition);this.state='populated';}catch{this.state='error';this.error='Invalid lesson definition';}}else this.state=config.initialState??'loading';}
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
 return '<main class="g9-lesson-page" data-orientation="'+s.orientation+'"><h1>'+e(l.title)+'</h1><p>Unverified teaching diagnostic; no reviewed route or academic admission.</p><nav>'+CORE1A_ORDERED_ROLES.map(role=>'<button data-role="'+role+'" style="min-height:48px;min-width:48px">'+role+'</button>').join('')+'</nav><div style="'+(s.orientation==='LANDSCAPE'?'display:grid;grid-template-columns:1fr 1fr':'display:flex;flex-direction:column')+'">'+u.render()+m.render()+a.render()+'</div><button disabled>Fresh transfer unavailable</button></main>';}
}
export type LessonPageViewState=ReturnType<Core1ALessonPageController['getViewState']>;
