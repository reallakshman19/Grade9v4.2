// A26 normalized ink, mounted in the Wave 9 work area. Not a persistence receipt.
import {InkEngine,type WorkArtifactData} from '../runtime/ink.ts';
import type {WorkArtifact} from '../runtime/types.ts';
const ns='http://www.w3.org/2000/svg',WIDTH=1000,HEIGHT=600;
export function mountWave9Ink(parent:HTMLElement,prior?:WorkArtifact){
 const engine=new InkEngine(WIDTH,HEIGHT);
 if(prior){if(prior.kind!=='INK')throw Error('INK_ARTIFACT_REQUIRED');engine.importArtifact({id:prior.id,...prior.value as unknown as Omit<WorkArtifactData,'id'>});engine.resizeViewport(WIDTH,HEIGHT);}
 const panel=document.createElement('fieldset');panel.style.cssText='min-width:0;max-width:100%;padding:8px;margin:8px 0';
 const title=document.createElement('legend');title.textContent='Optional digital ink';panel.append(title);parent.append(panel);
 const hidden=document.createElement('input');hidden.type='hidden';hidden.dataset.field='__ink';panel.append(hidden);
 const tools=document.createElement('div');tools.className='w9-controls';panel.append(tools);
 const svg=document.createElementNS(ns,'svg');svg.setAttribute('viewBox','0 0 '+WIDTH+' '+HEIGHT);svg.setAttribute('role','img');svg.setAttribute('aria-label','Learner ink scratchpad. Typed working is the keyboard alternative.');svg.dataset.ink='true';svg.style.cssText='display:block;width:100%;height:auto;background:#fff;border:1px solid #63798b;touch-action:none;aspect-ratio:5/3';panel.append(svg);
 const status=document.createElement('p');status.setAttribute('role','status');panel.append(status);
 function draw(){
  svg.replaceChildren();
  for(const s of engine.getStrokes()){const line=document.createElementNS(ns,'polyline');line.setAttribute('points',s.points.map(p=>p.x*WIDTH+','+p.y*HEIGHT).join(' '));line.setAttribute('fill','none');line.setAttribute('stroke',s.color);line.setAttribute('stroke-width',String(s.width*2));line.setAttribute('stroke-linecap','round');line.setAttribute('stroke-linejoin','round');if(s.tool==='highlighter')line.setAttribute('opacity','.4');svg.append(line);}
  const points=engine.getInProgressPoints();if(points.length&&engine.getTool()!=='eraser'){const line=document.createElementNS(ns,'polyline');line.setAttribute('points',points.map(p=>p.x*WIDTH+','+p.y*HEIGHT).join(' '));line.setAttribute('fill','none');line.setAttribute('stroke',engine.getColor());line.setAttribute('stroke-width','4');svg.append(line);}
  hidden.value=JSON.stringify(engine.exportArtifact());status.textContent=engine.getStrokes().length+' stroke(s) in editor.';
 }
 const button=(label:string,run:()=>void)=>{const b=document.createElement('button');b.type='button';b.textContent=label;b.addEventListener('click',()=>{if(!hidden.disabled){run();draw();}});tools.append(b);};
 for(const [label,tool] of [['Pen','pen'],['Highlighter','highlighter'],['Eraser','eraser']] as const)button(label,()=>{engine.setTool(tool);engine.setWidth(tool==='highlighter'?8:2);});
 button('Undo ink',()=>{engine.undo();});button('Redo ink',()=>{engine.redo();});button('Clear ink',()=>{engine.clear();});
 let pointer:number|null=null;
 function pos(e:PointerEvent){const r=svg.getBoundingClientRect();return [(e.clientX-r.left)*WIDTH/r.width,(e.clientY-r.top)*HEIGHT/r.height,e.pressure>0?e.pressure:.5] as const;}
 const cancel=()=>{pointer=null;engine.pointerCancel();draw();};
 svg.addEventListener('pointerdown',e=>{if(hidden.disabled||pointer!==null||e.button!==0)return;e.preventDefault();try{pointer=e.pointerId;svg.setPointerCapture(e.pointerId);engine.pointerDown(...pos(e));draw();}catch{cancel();}});
 svg.addEventListener('pointermove',e=>{if(pointer!==e.pointerId)return;if(hidden.disabled){cancel();return;}try{engine.pointerMove(...pos(e));draw();}catch{cancel();}});
 svg.addEventListener('pointerup',e=>{if(pointer!==e.pointerId)return;pointer=null;if(hidden.disabled){engine.pointerCancel();draw();return;}try{engine.pointerUp();}catch{engine.pointerCancel();}draw();});
 svg.addEventListener('pointercancel',cancel);svg.addEventListener('lostpointercapture',()=>{if(pointer!==null)cancel();});
 hidden.addEventListener('w9-restore',()=>{engine.importArtifact(JSON.parse(hidden.value));engine.resizeViewport(WIDTH,HEIGHT);draw();});
 draw();
 return {async capture(sessionId:string):Promise<WorkArtifact|null>{engine.pointerCancel();draw();return engine.getStrokes().length?engine.toWorkArtifact(sessionId):null;}};
}
