import {escapeHtml as e} from '../../runtime/rendering.ts';
import type {Core1BTransferJourney} from '../../journeys/core1b.ts';
export interface ComparisonMove{readonly moveNumber:number;readonly canonicalStep:string;readonly learnerStep?:string;readonly status:'ALIGNED'|'DIVERGENT'|'OMITTED'|'UNCLASSIFIED';readonly note:string}
export interface ComparisonViewerConfig{readonly attemptId?:string;readonly immutableOriginalAttempt?:string;readonly canonicalReasoning?:readonly string[];readonly moves?:readonly ComparisonMove[];readonly journey?:Core1BTransferJourney}
export class ComparisonViewerController{
 private readonly journey?:Core1BTransferJourney;private selected:number|null=null;
 constructor(c:ComparisonViewerConfig){this.journey=c.journey;}
 selectMove(n:number){if(!Number.isSafeInteger(n)||n<1)throw Error('Invalid move');this.selected=n;}
 getOriginalAttempt(){return '';}
 getViewState(){return {attemptId:'',immutableOriginalAttempt:'',canonicalReasoning:[] as string[],moves:[] as ComparisonMove[],activeMoveIndex:this.selected,minHitTargetPx:48};}
 render(){return '<section class="g9-comparison-viewer"><p>Neutral comparison prompts. Original and reviewed reference require a verified durable first attempt.</p></section>';}
 async renderReviewed(){
  const j=this.journey;if(!j?.isReady())return this.render();const original=await j.readOriginalAttempt();if(!original)return this.render();
  const reference=await j.getTaskASolution();if(reference===null)return this.render();const moves=await j.readReviewMoves(),again=await j.readOriginalAttempt();if(!again||again.id!==original.id)return this.render();
  return '<section class="g9-comparison-viewer"><h3>Immutable committed original</h3><pre>'+e(JSON.stringify(original.response,null,2))+'</pre><pre>'+e(JSON.stringify(original.work,null,2))+'</pre><h3>Reviewed reference</h3><pre>'+e(reference)+'</pre><h3>Learner comparison</h3>'+moves.map(m=>'<label>'+e(m)+'<textarea data-move="'+e(m)+'" style="min-height:48px"></textarea></label>').join('')+'<p>Open work review pending where applicable; no automatic alignment classification.</p></section>';
 }
}
export type ComparisonViewState=ReturnType<ComparisonViewerController['getViewState']>;
