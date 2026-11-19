import {escapeHtml as e} from '../runtime/rendering.ts';
import {ComparisonViewerController,DiagnosticPanelController,RepairWorkspaceController} from '../components/reflection/index.ts';
import type {Core1BTransferJourney,DiagnosticRule} from '../journeys/core1b.ts';
import type {JsonObject,Response,WorkArtifact} from '../runtime/types.ts';
export type DisplayOrientation='LANDSCAPE'|'PORTRAIT';
export type ReflectionScreenState='loading'|'error'|'populated'|'unavailable'|'pending';
export interface ReflectionPageConfig{readonly attemptId?:string;readonly originalAttemptText?:string;readonly canonicalReasoning?:readonly string[];readonly diagnosticRules?:readonly DiagnosticRule[];readonly boundaryTaskPrompt?:string;readonly boundarySolution?:readonly string[];readonly orientation?:DisplayOrientation;readonly initialState?:ReflectionScreenState;readonly errorMessage?:string;readonly journey?:Core1BTransferJourney}
export class ReflectionPageController{
 private readonly j?:Core1BTransferJourney;private tab:'compare'|'diagnose'|'repair'|'history'='compare';private orientation:DisplayOrientation='LANDSCAPE';
 private readonly compare:ComparisonViewerController;private readonly diag:DiagnosticPanelController;private readonly repair:RepairWorkspaceController;
 constructor(c:ReflectionPageConfig){this.j=c.journey;this.setOrientation(c.orientation??'LANDSCAPE');this.compare=new ComparisonViewerController({journey:this.j});this.diag=new DiagnosticPanelController({journey:this.j});this.repair=new RepairWorkspaceController({journey:this.j});}
 private bound(){if(!this.j?.isReady())throw Error('DURABLE_REFLECTION_REQUIRED');return this.j;}
 actionCompare(moveNumber?:number){this.tab='compare';if(moveNumber!==undefined)this.compare.selectMove(moveNumber);}
 async commitComparison(values:Readonly<Record<string,JsonObject>>){return this.bound().completeReconstruction(values);}
 async actionDiagnose(code?:string,why?:string){this.tab='diagnose';if(code!==undefined){if(why===undefined)throw Error('DIAGNOSIS_REASON_REQUIRED');return this.bound().commitDiagnosis(code,why);}}
 async actionRepair(text?:string,work:readonly WorkArtifact[]=[]){this.tab='repair';if(text!==undefined)return this.bound().commitRepair(text,work);}
 async actionHistory(){this.tab='history';return this.j?.isReady()?this.j.readHistory():[];}
 setBoundaryResponse(values:Readonly<Record<string,Response>>,work:readonly WorkArtifact[]){this.bound().setResponses(values,work);}
 commitBoundary(){return this.bound().commitBoundaryAttempt();}viewBoundaryFeedback(){return this.bound().viewBoundaryFeedback();}
 setOrientation(o:DisplayOrientation){if(!['LANDSCAPE','PORTRAIT'].includes(o))throw Error('Invalid orientation');this.orientation=o;}getOrientation(){return this.orientation;}
 getViewState(){const stage=this.j?.getStage();return {screenState:(this.j?.isReady()&&this.j.isFirstAttemptCommitted()?'populated':'pending') as ReflectionScreenState,attemptId:'',activeTab:this.tab,orientation:this.orientation,isDiagnosisCommitted:!!this.j?.isReady()&&['REPAIR','BOUNDARY_TEST','COMPLETE'].includes(stage??''),isRepairCommitted:!!this.j?.isReady()&&['BOUNDARY_TEST','COMPLETE'].includes(stage??''),isBoundaryCommitted:!!this.j?.isReady()&&this.j.isBoundaryCommitted(),minHitTargetPx:48};}
 render(){return '<main class="g9-reflection-page" data-orientation="'+this.orientation+'"><h1>Reconstruction and diagnosis</h1><nav>'+['compare','diagnose','repair','history'].map(t=>'<button style="min-height:48px;min-width:48px" data-action="'+t+'">'+t+'</button>').join('')+'</nav>'+(this.tab==='compare'?this.compare.render():this.tab==='diagnose'?this.diag.render():this.tab==='repair'?this.repair.render():'<p>Verified history requires a durable read.</p>')+'</main>';}
 async renderReviewed(){if(!this.j?.isReady())return this.render();if(this.tab==='compare')return this.compare.renderReviewed();if(this.tab==='diagnose')return this.diag.renderReviewed();if(this.tab==='history')return '<pre>'+e(JSON.stringify(await this.j.readHistory(),null,2))+'</pre>';return this.repair.render();}
}
export type ReflectionPageViewState=ReturnType<ReflectionPageController['getViewState']>;

