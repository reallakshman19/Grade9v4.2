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
 const control=(name:string)=>'<button type="button" data-action="'+name+'" style="min-height:48px;min-width:48px" '+(!s.ready?'disabled':'')+'>'+e(name)+'</button>';
 return '<main class="g9-transfer-page" data-role="CORE1B" data-stage="'+s.currentStage+'" data-orientation="'+s.orientation+'"><style>'+transferCss+'</style>'+
 '<section data-slot="identity"><h1>'+e(task.title)+'</h1><p>State: '+e(s.screenState)+'</p><nav aria-label="Transfer progression">'+TRANSFER_ORDERED_STAGES.map(x=>'<span aria-current="'+(x===s.currentStage?'step':'false')+'" style="display:inline-block;padding:8px;min-height:48px;">'+x+'</span>').join(' ')+'</nav></section>'+
 '<section data-slot="stage"><h2>Prompt & Conditions</h2><p>'+e(task.prompt)+'</p><p>'+e(task.conditions.join('; '))+'</p><div>'+ (s.currentStage==='PREDICT'?'<p>'+e(d.qualitativePredictionPrompt)+'</p><div style="display:flex;flex-direction:column;gap:8px;">'+d.predictionOptions.map((o,i)=>'<label style="display:flex;align-items:center;gap:8px;min-height:48px;"><input type="radio" name="prediction" value="'+i+'" '+(!s.ready?'disabled':'')+'><span>'+e(o)+'</span></label>').join('')+'</div>'+control('predict'):s.currentStage==='ATTEMPT'||s.currentStage==='BOUNDARY_TEST'?'<pre>'+e(JSON.stringify(j!.getResponses()))+'</pre><div style="display:flex;gap:8px;flex-wrap:wrap;">'+control('save-draft')+control(s.currentStage==='ATTEMPT'?'commit-first':s.isBoundaryCommitted?'boundary-feedback':'commit-boundary')+'</div>':control(s.currentStage==='RECONSTRUCT'?'compare':s.currentStage==='DIAGNOSE'?'diagnose':s.currentStage==='REPAIR'?'repair':'return-source'))+'</div></section>'+
 '<section data-slot="route"><h2>Route & Verification</h2><p>Protected content requires a current reviewed read. No academic approval inferred.</p><p role="status" data-transfer-status></p></section></main>';}
}
export type TransferPageViewState=ReturnType<Core1BTransferPageController['getViewState']>;

const transferCss=`
.g9-transfer-page{box-sizing:border-box;width:100%;max-width:100%;min-width:0;display:flex;flex-direction:column;gap:16px;overflow-wrap:anywhere;font-family:system-ui,sans-serif}
.g9-transfer-page *{box-sizing:border-box;min-width:0}
.g9-transfer-page [data-slot]{width:100%;padding:12px;border:1px solid #ccd7e1;border-radius:8px}
.g9-transfer-page button,.g9-transfer-page input{min-height:48px;min-width:48px;max-width:100%;font:inherit}
.g9-transfer-page button{white-space:normal;overflow-wrap:anywhere;padding:8px 16px;border-radius:6px;border:1px solid #cbd5e1;background:#f8fafc;cursor:pointer}
.g9-transfer-page button:not(:disabled):hover{background:#f1f5f9}
.g9-transfer-page :focus-visible{outline:3px solid #125d82;outline-offset:2px}
`;

export function mountCore1BTransfer(root:HTMLElement,c:Core1BTransferPageController){
 let active=true;
 const render=()=>{if(!active)return;root.innerHTML=c.render();};
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
