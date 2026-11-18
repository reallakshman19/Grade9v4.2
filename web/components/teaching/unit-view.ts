import {escapeHtml as e} from '../../runtime/rendering.ts';
import {publicUnit,type Core1AUnitData,type Core1ARole,type IntrinsicDepthBadge} from '../../journeys/core1a.ts';
export interface UnitViewConfig{readonly unitData?:Core1AUnitData;readonly initialRole?:Core1ARole;readonly initialDepth?:IntrinsicDepthBadge}
export class Core1AUnitViewController{
 private data:Core1AUnitData|null=null;private role:Core1ARole='A1';private depth:IntrinsicDepthBadge='MEDIUM';private zoom=1;
 constructor(c:UnitViewConfig={}){this.role=c.initialRole??'A1';this.setDepthMode(c.initialDepth??'MEDIUM');if(c.unitData)this.setUnitData(c.unitData);}
 setUnitData(u:Core1AUnitData|null){this.data=u?publicUnit(u):null;if(u)this.role=u.role;}
 setDepthMode(d:IntrinsicDepthBadge){if(!['EASY','MEDIUM','HARD'].includes(d))throw Error('Invalid depth');this.depth=d;}getDepthMode(){return this.depth;}
 toggleWorkedExample(){return false;}setFigureZoom(v:number){if(!Number.isFinite(v))throw Error('Invalid zoom');this.zoom=Math.min(3,Math.max(1,v));}getFigureZoom(){return this.zoom;}
 getViewState(){return {role:this.role,title:this.data?.title??'Unit unavailable',isAvailable:!!this.data,depthMode:this.depth,isWorkedExampleOpen:false,figureZoomScale:this.zoom,minHitTargetPx:48};}
 render(){const u=this.data;if(!u)return '<section role="status">Unit unavailable</section>';const list=(xs:readonly string[])=>'<ul>'+xs.map(x=>'<li>'+e(x)+'</li>').join('')+'</ul>';
 return '<article class="g9-unit-view" data-role="'+u.role+'"><h2>'+e(u.title)+'</h2><p>'+e(u.summary)+'</p><p>'+e(u.bodyText)+'</p>'+list(u.conventions??[])+list((u.representationBridge??[]).map(x=>x.pictureElement+' — '+x.symbol+' — '+x.inWords))+list((u.derivationSteps??[]).map(x=>x.expression+' — '+x.whyValid))+list(u.boundaryConditions??[])+(u.workedExample?'<p>'+e(u.workedExample.problemPrompt)+'</p><button disabled style="min-height:48px">Reviewed reasoning unavailable</button>':'')+(u.misconception?'<p>'+e(u.misconception.diagnosticPrompt)+'</p>':'')+'<p>'+e(u.selfCheckPrompt??'')+'</p><p>Block refs: '+e(u.blockRefs.map(r=>r.id).join(', '))+'</p><p>Warrants: '+e(u.evidenceRefs.map(r=>r.id).join(', '))+'</p></article>';}
}
export type UnitViewState=ReturnType<Core1AUnitViewController['getViewState']>;
