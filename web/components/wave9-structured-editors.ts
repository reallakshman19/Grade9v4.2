// Typed, keyboard-accessible structured inputs. No page-local scientific evaluator.
// Graph is an uncalibrated preview of learner points; no invented physical axis labels.
import {validateResponse,NUMERIC_DECIMAL_REGEX} from '../runtime/response.ts';
import type {Kind,Response} from '../runtime/types.ts';
export const structuredKinds:readonly Kind[]=['CHEMICAL_STRUCTURE','REACTION_MECHANISM','DATA_TABLE','GRAPH','EXPERIMENT_ANALYSIS'];
const node=<K extends keyof HTMLElementTagNameMap>(tag:K,text?:string)=>{const e=document.createElement(tag);if(text!==undefined)e.textContent=text;return e;};
const MAX=20;
const btn=(parent:HTMLElement,label:string,run:()=>void)=>{const b=node('button',label);b.type='button';b.addEventListener('click',run);parent.append(b);return b;};
function input(parent:HTMLElement,label:string,value:string,change:(v:string)=>void){const l=node('label',label),i=node('input');i.value=value;i.addEventListener('input',()=>change(i.value));l.append(i);parent.append(l);return i;}
const ns='http://www.w3.org/2000/svg';
function plot(parent:HTMLElement,points:readonly (readonly string[])[]){
 const valid=points.filter(p=>p.length===2&&p.every(v=>NUMERIC_DECIMAL_REGEX.test(v)&&Number.isFinite(Number(v)))).map(p=>p.map(Number));
 const svg=document.createElementNS(ns,'svg');svg.setAttribute('viewBox','0 0 300 180');svg.setAttribute('role','img');svg.setAttribute('aria-label','Preview of learner-entered numeric points; axes scaled to the points');
 svg.style.cssText='width:100%;max-width:440px;height:auto;display:block';
 const line=(x1:number,y1:number,x2:number,y2:number)=>{const l=document.createElementNS(ns,'line');for(const [k,v] of Object.entries({x1,y1,x2,y2}))l.setAttribute(k,String(v));l.setAttribute('stroke','currentColor');svg.append(l);};
 line(28,10,28,152);line(28,152,290,152);
 if(valid.length){const xs=valid.map(p=>p[0]),ys=valid.map(p=>p[1]),minX=Math.min(...xs),maxX=Math.max(...xs),minY=Math.min(...ys),maxY=Math.max(...ys);
 const scale=(n:number,min:number,max:number)=>max===min?.5:(n/Math.max(1,Math.abs(min),Math.abs(max))-min/Math.max(1,Math.abs(min),Math.abs(max)))/(max/Math.max(1,Math.abs(min),Math.abs(max))-min/Math.max(1,Math.abs(min),Math.abs(max)));
 for(const [x,y] of valid){const c=document.createElementNS(ns,'circle');c.setAttribute('cx',String(28+262*scale(x,minX,maxX)));c.setAttribute('cy',String(152-142*scale(y,minY,maxY)));c.setAttribute('r','4');c.setAttribute('fill','#125d82');svg.append(c);}
 }
 parent.replaceChildren(svg,node('p','Preview only: '+valid.length+' numeric point(s). No automatic correctness judgment.'));
}
export function structuredResponseEditor(parent:HTMLElement,id:string,kind:Kind,old?:Response):()=>Response{
 const frame=node('fieldset');frame.dataset.editor=kind;frame.style.cssText='min-width:0;max-width:100%;padding:8px;margin:8px 0;border:1px solid #ccd7e1';frame.append(node('legend',id+' — '+kind.replaceAll('_',' ')));parent.append(frame);
 const state=node('input');state.type='hidden';state.dataset.field=id;frame.append(state);
 const body=node('div');frame.append(body);
 let v:any=old?.kind===kind?structuredClone(old.value):kind==='GRAPH'?{points:[['','']]}:kind==='DATA_TABLE'?[[null,null]]:kind==='CHEMICAL_STRUCTURE'?{format:'',data:''}:kind==='EXPERIMENT_ANALYSIS'?{observations:[''],conclusion:''}:[''];
 const sync=()=>{state.value=JSON.stringify(v);};
 function render(){
  body.replaceChildren();
  const scroll=node('div');scroll.style.cssText='overflow-x:auto;max-width:100%';body.append(scroll);
  if(kind==='GRAPH'||kind==='DATA_TABLE'){
   const rows:(string|null)[][]=kind==='GRAPH'?v.points:v;
   if(rows.length>MAX||rows.some(r=>r.length>MAX))throw Error('EDITOR_CAPACITY_EXCEEDED');
   const table=node('table');table.style.cssText='border-collapse:collapse;width:100%';scroll.append(table);
   const head=node('tr'),columns=kind==='GRAPH'?2:Math.max(1,...rows.map(r=>r.length));for(let c=0;c<columns;c++)head.append(node('th',kind==='GRAPH'?['x','y'][c]:'Column '+(c+1)));table.append(head);
   const preview=node('div');if(kind==='GRAPH')body.append(preview);
   const update=()=>{sync();if(kind==='GRAPH')plot(preview,rows as string[][]);};
   rows.forEach((row,r)=>{const tr=node('tr');for(let c=0;c<columns;c++){const td=node('td');td.style.minWidth='88px';input(td,'Row '+(r+1)+' '+(kind==='GRAPH'?['x','y'][c]:'column '+(c+1)),row[c]??'',text=>{row[c]=kind==='DATA_TABLE'&&text===''?null:text;update();});tr.append(td);}table.append(tr);});
   btn(body,'Add row',()=>{if(rows.length<MAX){rows.push(Array.from({length:columns},()=>kind==='GRAPH'?'':null));sync();render();}}).disabled=rows.length>=MAX;
   btn(body,'Remove last row',()=>{if(rows.length>1){rows.pop();sync();render();}}).disabled=rows.length<=1;
   if(kind==='DATA_TABLE'){btn(body,'Add column',()=>{if(columns<MAX){for(const row of rows)while(row.length<=columns)row.push(null);sync();render();}}).disabled=columns>=MAX;btn(body,'Remove last column',()=>{if(columns>1){for(const row of rows)row.splice(columns-1);sync();render();}}).disabled=columns<=1;}
   update();
  }else if(kind==='CHEMICAL_STRUCTURE'){
   input(body,'Structure format',v.format,text=>{v.format=text;sync();});input(body,'Structure notation',v.data,text=>{v.data=text;sync();});
   body.append(node('p','Enter the requested chemical notation. No structure or valence inference is performed.'));
  }else{
   const list:string[]=kind==='EXPERIMENT_ANALYSIS'?v.observations:v;if(list.length>MAX)throw Error('EDITOR_CAPACITY_EXCEEDED');
   list.forEach((value,i)=>input(body,(kind==='EXPERIMENT_ANALYSIS'?'Observation ':'Step ')+(i+1),value,text=>{list[i]=text;sync();}));
   btn(body,'Add entry',()=>{if(list.length<MAX){list.push('');sync();render();}}).disabled=list.length>=MAX;
   btn(body,'Remove last entry',()=>{if(list.length>1){list.pop();sync();render();}}).disabled=list.length<=1;
   if(kind==='EXPERIMENT_ANALYSIS')input(body,'Conclusion',v.conclusion,text=>{v.conclusion=text;sync();});
  }
 }
 state.addEventListener('w9-restore',()=>{v=JSON.parse(state.value);render();});
 sync();render();
 return ()=>{
  // Numeric graph coordinates retain exact learner strings; the preview never changes them.
  if(kind==='GRAPH'&&v.points.some((p:string[])=>p.some(n=>!NUMERIC_DECIMAL_REGEX.test(n)||!Number.isFinite(Number(n)))))throw Error('INVALID_GRAPH_COORDINATE');
  return validateResponse({kind,value:structuredClone(v)});
 };
}
