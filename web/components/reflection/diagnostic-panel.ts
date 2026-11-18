import {escapeHtml as e} from '../../runtime/rendering.ts';
import type {Core1BTransferJourney,DiagnosticRule} from '../../journeys/core1b.ts';
export interface DiagnosticPanelConfig{readonly rules?:readonly DiagnosticRule[];readonly initialSelectedCode?:string;readonly isCommitted?:boolean;readonly journey?:Core1BTransferJourney}
export class DiagnosticPanelController{
 private readonly journey?:Core1BTransferJourney;private code:string|null=null;
 constructor(c:DiagnosticPanelConfig){this.journey=c.journey;}
 selectCode(code:string){if(typeof code!=='string'||!code.trim())throw Error('Invalid diagnosis');this.code=code;}
 async commit(why:string){if(!this.journey||!this.code)throw Error('DURABLE_DIAGNOSIS_REQUIRED');return this.journey.commitDiagnosis(this.code,why);}
 getSelectedRule(){return null;}
 getViewState(){return {rules:[] as DiagnosticRule[],selectedCode:this.code,isCommitted:false,minHitTargetPx:48};}
 render(){return '<section class="g9-diagnostic-panel"><p>Diagnosis requires reviewed move identifiers and learner explanation.</p></section>';}
 async renderReviewed(){const j=this.journey;if(!j?.isReady()||j.getStage()!=='DIAGNOSE')return this.render();const moves=[...await j.readReviewMoves(),'UNSURE','NO_DIVERGENCE'];return '<section class="g9-diagnostic-panel">'+moves.map(m=>'<label style="min-height:48px"><input type="radio" name="diagnosis" value="'+e(m)+'">'+e(m)+'</label>').join('')+'<textarea aria-label="Why" style="min-height:48px"></textarea></section>';}
}
export type DiagnosticPanelViewState=ReturnType<DiagnosticPanelController['getViewState']>;
