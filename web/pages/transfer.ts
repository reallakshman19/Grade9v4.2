import {escapeHtml as e} from '../runtime/rendering.ts';
import {Core1BTransferJourney,TRANSFER_ORDERED_STAGES,type Core1BTransferDefinition,type TransferBinding,type Core1BDraft,type TransferStage} from '../journeys/core1b.ts';
import type {JsonObject,Response,WorkArtifact} from '../runtime/types.ts';
export type DisplayOrientation='LANDSCAPE'|'PORTRAIT';
export type TransferScreenState='loading'|'error'|'populated'|'pending review'|'stale origin'|'save blocked'|'stale event'|'assisted'|'boundary locked';
export interface TransferPageConfig{readonly transferDefinition?:Core1BTransferDefinition;readonly binding?:TransferBinding;readonly orientation?:DisplayOrientation;readonly initialState?:TransferScreenState;readonly errorMessage?:string}
export class Core1BTransferPageController{
 private journey:Core1BTransferJourney|null=null;private orientation:DisplayOrientation='LANDSCAPE';
 constructor(c:TransferPageConfig){this.setOrientation(c.orientation??'LANDSCAPE');if(c.transferDefinition)this.journey=new Core1BTransferJourney(c.transferDefinition,c.binding);}
 getJourney(){if(!this.journey)throw Error('Transfer unavailable');return this.journey;}
 start(){return this.getJourney().start();}restore(){return this.getJourney().restore();}
 actionPredict(i:number){return this.getJourney().predict(i);}
 actionRespond(values:Readonly<Record<string,Response>>,work:readonly WorkArtifact[]){this.getJourney().setResponses(values,work);}
 saveDraft(){return this.getJourney().saveDraft();}
 actionCommitFirst(){return this.getJourney().commitFirstAttempt();}actionCompare(values:Readonly<Record<string,JsonObject>>){return this.getJourney().completeReconstruction(values);}
 actionDiagnose(move:string,why:string){return this.getJourney().commitDiagnosis(move,why);}
 actionRepair(why:string,work:readonly WorkArtifact[]){return this.getJourney().commitRepair(why,work);}
 actionCommitBoundary(){return this.getJourney().commitBoundaryAttempt();}actionBoundaryFeedback(){return this.getJourney().viewBoundaryFeedback();}
 actionReturnSource(){return this.getJourney().returnToSource();}actionReturn(){return '/home';}requestHint(){return this.getJourney().requestHint();}
 setOrientation(o:DisplayOrientation){if(!['LANDSCAPE','PORTRAIT'].includes(o))throw Error('Invalid orientation');this.orientation=o;}getOrientation(){return this.orientation;}
 toDraft(){return this.journey?.toDraft()??null;}restoreDraft(d:Core1BDraft){return this.getJourney().restoreDraft(d);}
 getViewState(){const j=this.journey,d=j?.getDefinition();return {screenState:(!j?'loading':j.isSaveBlocked()?'save blocked':!j.isReady()?'pending review':j.isAssistedAttempt()?'assisted':'populated') as TransferScreenState,journeyId:d?.journeyId??'',currentStage:j?.getStage()??'PREDICT' as TransferStage,orientation:this.orientation,isAssisted:j?.isAssistedAttempt()??false,isFirstAttemptCommitted:j?.isFirstAttemptCommitted()??false,isBoundaryCommitted:j?.isBoundaryCommitted()??false,exposedHints:j?.getExposedHints()??[],originId:d?.originRef.id??'',ready:j?.isReady()??false,minHitTargetPx:48};}
 async renderBoundaryStimulus(){const text=await this.getJourney().readBoundaryStimulus();return text===null?'<p>Boundary stimulus withheld</p>':'<pre>'+e(text)+'</pre>';}
 async renderReviewedReference(){const j=this.getJourney();if(!j.isReady())return '<p>Reviewed reference unavailable</p>';const text=j.isBoundaryCommitted()?await j.getTaskBSolution():await j.getTaskASolution();return text===null?'<p>Reviewed reference withheld</p>':'<pre>'+e(text)+'</pre>';}
 render(){const s=this.getViewState(),j=this.journey,d=j?.getDefinition();if(!d)return '<p>Transfer unavailable</p>';const task=s.currentStage==='BOUNDARY_TEST'?d.boundaryTaskB:d.freshTaskA;
 const control=(name:string)=>'<button data-action="'+name+'" style="min-height:48px;min-width:48px" '+(!s.ready?'disabled':'')+'>'+e(name)+'</button>';
 return '<main class="g9-transfer-page" data-stage="'+s.currentStage+'" data-orientation="'+s.orientation+'"><h1>'+e(task.title)+'</h1><p>State: '+e(s.screenState)+'</p><nav>'+TRANSFER_ORDERED_STAGES.map(x=>'<span aria-current="'+(x===s.currentStage?'step':'false')+'">'+x+'</span>').join(' ')+'</nav><p>'+e(task.prompt)+'</p><p>'+e(task.conditions.join('; '))+'</p><div>'+ (s.currentStage==='PREDICT'?'<p>'+e(d.qualitativePredictionPrompt)+'</p>'+d.predictionOptions.map((o,i)=>'<label><input type="radio" name="prediction" value="'+i+'" '+(!s.ready?'disabled':'')+'>'+e(o)+'</label>').join('')+control('predict'):s.currentStage==='ATTEMPT'||s.currentStage==='BOUNDARY_TEST'?'<pre>'+e(JSON.stringify(j!.getResponses()))+'</pre>'+control('save-draft')+control(s.currentStage==='ATTEMPT'?'commit-first':s.isBoundaryCommitted?'boundary-feedback':'commit-boundary'):control(s.currentStage==='RECONSTRUCT'?'compare':s.currentStage==='DIAGNOSE'?'diagnose':s.currentStage==='REPAIR'?'repair':'return-source'))+'</div><p>Protected content requires a current reviewed read. No academic approval inferred.</p></main>';}
}
export type TransferPageViewState=ReturnType<Core1BTransferPageController['getViewState']>;
