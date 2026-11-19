import {escapeHtml as e} from '../../runtime/rendering.ts';
import type {Core1BTransferJourney} from '../../journeys/core1b.ts';
import type {Response,WorkArtifact} from '../../runtime/types.ts';
export interface RepairWorkspaceConfig{readonly repairExplanation?:string;readonly isRepairCommitted?:boolean;readonly boundaryTaskPrompt?:string;readonly boundarySolution?:readonly string[];readonly isBoundaryCommitted?:boolean;readonly isSaveBlocked?:boolean;readonly journey?:Core1BTransferJourney}
export class RepairWorkspaceController{
 private readonly journey?:Core1BTransferJourney;private why='';private blocked=false;
 constructor(c:RepairWorkspaceConfig={}){this.journey=c.journey;this.blocked=!!c.isSaveBlocked;}
 updateRepairText(text:string){if(typeof text!=='string'||text.length>100000)throw Error('Invalid repair');this.why=text;}
 async commitRepair(work:readonly WorkArtifact[]){if(!this.journey||this.blocked)throw Error('DURABLE_REPAIR_REQUIRED');return this.journey.commitRepair(this.why,work);}
 updateBoundaryAttempt(values:Readonly<Record<string,Response>>,work:readonly WorkArtifact[]){if(!this.journey||this.blocked)throw Error('DURABLE_BOUNDARY_REQUIRED');this.journey.setResponses(values,work);}
 async commitBoundary(){if(!this.journey||this.blocked)throw Error('DURABLE_BOUNDARY_REQUIRED');return this.journey.commitBoundaryAttempt();}
 setSaveBlocked(blocked:boolean){if(blocked)this.blocked=true;} // Caller cannot clear a failed persistence guard.
 async getBoundaryFeedback(){if(!this.journey||this.blocked)return null;return this.journey.getTaskBSolution();}
 async viewBoundaryFeedback(){if(!this.journey||this.blocked)throw Error('DURABLE_BOUNDARY_REQUIRED');return this.journey.viewBoundaryFeedback();}
 getViewState(){return {repairExplanation:this.why,isRepairCommitted:false,boundaryTaskPrompt:'',isBoundaryCommitted:false,isSaveBlocked:this.blocked||!!this.journey?.isSaveBlocked(),canRevealBoundaryFeedback:false,minHitTargetPx:48};}
 render(){return '<section class="g9-repair-workspace"><p>Separate repair; original work is not editable.</p><textarea aria-label="Repair explanation" style="min-height:48px">'+e(this.why)+'</textarea><p>Boundary feedback requires verified durable commitment.</p></section>';}
}
export type RepairWorkspaceViewState=ReturnType<RepairWorkspaceController['getViewState']>;

