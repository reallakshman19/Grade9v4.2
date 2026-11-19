import {escapeHtml as e} from '../../runtime/rendering.ts';
import {publicAnchor,ANCHOR_LEVELS,type ProgressiveAnchor,type ExactRef,type AnchorLevel} from '../../journeys/core1a.ts';
import {refOk} from '../../runtime/progress.ts';
export interface AnchorViewConfig{readonly anchors:readonly ProgressiveAnchor[];readonly synthesisTaskRef:ExactRef;readonly synthesisTaskPrompt:string;readonly synthesisCheck?:string;readonly initialLevel?:AnchorLevel}
export class Core1AAnchorViewController{
 private readonly anchors:readonly ProgressiveAnchor[];private readonly synthesis:ExactRef;private readonly prompt:string;private level:AnchorLevel='FOUNDATION';
 constructor(c:AnchorViewConfig){if(c.anchors.length!==3||c.anchors.some((a,i)=>a.level!==ANCHOR_LEVELS[i])||!refOk(c.synthesisTaskRef)||new Set([...c.anchors.map(a=>a.taskRef.id),c.synthesisTaskRef.id]).size!==4)throw Error('N32_VIOLATION');this.anchors=c.anchors.map(publicAnchor);this.synthesis=structuredClone(c.synthesisTaskRef);this.prompt=c.synthesisTaskPrompt;this.selectLevel(c.initialLevel??'FOUNDATION');}
 selectLevel(l:AnchorLevel){if(!ANCHOR_LEVELS.includes(l))throw Error('Invalid anchor');this.level=l;}getActiveLevel(){return this.level;}toggleSolution(_l?:AnchorLevel){return false;}isSolutionRevealed(_l:AnchorLevel){return false;}
 getViewState(){return {activeLevel:this.level,revealedSolutions:[] as AnchorLevel[],hasSynthesisTask:!!this.prompt,minHitTargetPx:48};}
 render(includeSynthesis=true){const a=this.anchors.find(a=>a.level===this.level)!;return '<section class="g9-anchors-component"><nav>'+ANCHOR_LEVELS.map(l=>'<button data-level="'+l+'" style="min-height:48px;min-width:48px">'+l+'</button>').join('')+'</nav><h3>'+e(a.title)+'</h3><p>'+e(a.prompt)+'</p><p>Warrants: '+e(a.warrantRefs.map(w=>w.id).join(', '))+'</p><button disabled>Reviewed solution unavailable</button>'+(includeSynthesis?this.renderSynthesis():'')+'</section>';}
 renderSynthesis(){return '<h3>Distinct unassisted synthesis</h3><p>'+e(this.prompt)+'</p>';}
}
export type AnchorViewState=ReturnType<Core1AAnchorViewController['getViewState']>;
