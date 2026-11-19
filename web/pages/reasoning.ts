// A53 forward reconciliation of #84. Host-only, public diagnostic projections only.
import {ReasoningMatrixComponent,QRT_OPERATIONS,DEMAND_BANDS,evaluateCellState,type QrtOperation,type DemandBand} from '../components/reasoning-matrix.ts';
import {ManifestLoader,canonicalJson,computeSha256,sameRef,type ReleaseManifest} from '../runtime/loader.ts';
import {refOk} from '../runtime/progress.ts';
import {Router} from '../app/router.ts';
import type {ReasoningCell,Ref} from '../runtime/types.ts';
export interface ReasoningCatalog{
 readonly schema:'g9-a53-diagnostic/1';readonly learnerId:string;readonly releaseId:string;
 readonly subjectId:ReasoningCell['subject_id'];readonly topic:Ref;readonly title:string;
 readonly cells:readonly ReasoningCell[];
 readonly routes:readonly {readonly cellId:string;readonly task:Ref<'QUESTION'>;readonly review:Ref<'APPROVAL'>}[];
 readonly topicRoute?:{readonly subjectId:string;readonly topicId:string;readonly review:Ref<'APPROVAL'>};
}
type Live=(scope:{learnerId:string;releaseId:string;catalogSha256:string})=>Promise<boolean>;
const id=(x:unknown):x is string=>typeof x==='string'&&/^[A-Za-z][A-Za-z0-9._:-]{2,127}$/.test(x);
const text=(x:unknown):x is string=>typeof x==='string'&&x.trim().length>0&&x.length<=1000;
export class ReasoningPageController{
 readonly #c:ReasoningCatalog;readonly #pin:string;readonly #matrix:ReasoningMatrixComponent;
 readonly #loader:ManifestLoader;readonly #manifest:ReleaseManifest;readonly #router:Router;readonly #live:Live;
 #selected:{op:QrtOperation;band:DemandBand}|null=null;
 private constructor(c:ReasoningCatalog,pin:string,loader:ManifestLoader,manifest:ReleaseManifest,router:Router,live:Live){
  this.#c=structuredClone(c);this.#pin=pin;this.#matrix=new ReasoningMatrixComponent(c.cells);this.#loader=loader;this.#manifest=manifest;this.#router=router;this.#live=live;
 }
 static async create(raw:ReasoningCatalog,pin:string,loader:ManifestLoader,manifest:ReleaseManifest,router:Router,live:Live){
  const c=structuredClone(raw);
  if(!/^[a-f0-9]{64}$/.test(pin)||await computeSha256(canonicalJson(c))!==pin)throw Error('CATALOG_PIN_MISMATCH');
  if(c.schema!=='g9-a53-diagnostic/1'||!text(c.learnerId)||c.releaseId!==manifest.release_id||manifest.target_mode!=='DEMO'||manifest.learner_release!==false||!['PHYSICS','CHEMISTRY','MATHEMATICS','BIOLOGY'].includes(c.subjectId)||!refOk(c.topic)||!text(c.title)||!Array.isArray(c.cells)||!Array.isArray(c.routes)||c.cells.some(v=>v.subject_id!==c.subjectId||!sameRef(v.topic_ref,c.topic)))throw Error('INVALID_REASONING_CATALOG');
  const ctrl=new ReasoningPageController(c,pin,loader,manifest,router,live);
  for(const r of c.routes){
   const cell=c.cells.find(v=>v.cell_id===r.cellId);
   if(!cell||evaluateCellState(cell)!=='SYNTHETIC_STRUCTURAL'||!refOk(r.task)||r.task.type!=='QUESTION'||!refOk(r.review)||r.review.type!=='APPROVAL'||![cell.main,...cell.instances].some(t=>t&&sameRef(t,r.task)))throw Error('INVALID_REASONING_ROUTE');
   loader.resolveItem(manifest,r.task,'PRECOMMIT',c.releaseId);
  }
  if(new Set(c.routes.map(r=>r.cellId+':'+r.task.id)).size!==c.routes.length)throw Error('DUPLICATE_REASONING_ROUTE');
  if(c.topicRoute&&(!id(c.topicRoute.subjectId)||!id(c.topicRoute.topicId)||c.topicRoute.subjectId.toUpperCase()!==c.subjectId||c.topicRoute.topicId!==c.topic.id||!refOk(c.topicRoute.review)||c.topicRoute.review.type!=='APPROVAL'))throw Error('INVALID_TOPIC_ROUTE');
  if(!await ctrl.#active())throw Error('REASONING_AUTHORITY_REQUIRED');return ctrl;
 }
 async #active(){return this.#loader.getCached(this.#c.releaseId)===this.#manifest&&await this.#live({learnerId:this.#c.learnerId,releaseId:this.#c.releaseId,catalogSha256:this.#pin})===true;}
 select(op:QrtOperation,band:DemandBand){if(!QRT_OPERATIONS.includes(op)||!DEMAND_BANDS.includes(band))throw Error('INVALID_COORDINATE');this.#selected={op,band};}
 async view(){
  if(!await this.#active())throw Error('REASONING_AUTHORITY_REQUIRED');
  const selected=this.#selected?this.#matrix.getCell(this.#selected.op,this.#selected.band):null;
  const cells=QRT_OPERATIONS.flatMap(op=>DEMAND_BANDS.map(band=>{const c=this.#matrix.getCell(op,band);return {op,band,state:evaluateCellState(c),id:c?.cell_id??null};}));
  const tasks=selected&&evaluateCellState(selected)==='SYNTHETIC_STRUCTURAL'?[...(selected.main?[{kind:'MAIN',ref:selected.main}]:[]),...selected.instances.map(ref=>({kind:'INSTANCE',ref}))].map(v=>({kind:v.kind,ref:structuredClone(v.ref),navigable:this.#c.routes.some(r=>r.cellId===selected.cell_id&&sameRef(r.task,v.ref))})):[]; 
  if(!await this.#active())throw Error('REASONING_AUTHORITY_REQUIRED');
  return {title:this.#c.title,subject:this.#c.subjectId,cells,selected:selected?{id:selected.cell_id,state:evaluateCellState(selected),tasks}:null,summary:this.#matrix.getSummary(),topicReturn:!!this.#c.topicRoute,academicAdmission:'HOLD' as const};
 }
 async launch(target:Ref){
  const s=this.#selected&&this.#matrix.getCell(this.#selected.op,this.#selected.band);
  if(!s||evaluateCellState(s)!=='SYNTHETIC_STRUCTURAL'||!refOk(target)||target.type!=='QUESTION'||!await this.#active())return null;
  const grant=this.#c.routes.find(r=>r.cellId===s.cell_id&&sameRef(r.task,target));
  if(!grant)return null;
  try{
   this.#loader.resolveItem(this.#manifest,grant.task,'PRECOMMIT',this.#c.releaseId);
   const href=this.#router.toHref('/question/'+encodeURIComponent(grant.task.id)),match=this.#router.match(href);
   if(match.type!=='QUESTION'||match.params.questionId!==grant.task.id||!await this.#active())return null;
   this.#router.navigate(href);return href;
  }catch{return null;}
 }
 async returnToTopic(){
  const r=this.#c.topicRoute;if(!r||!await this.#active())return null;
  const href=this.#router.toHref('/subject/'+encodeURIComponent(r.subjectId)+'/topic/'+encodeURIComponent(r.topicId)),m=this.#router.match(href);
  if(m.type!=='TOPIC'||m.params.subjectId!==r.subjectId||m.params.topicId!==r.topicId||!await this.#active())return null;
  this.#router.navigate(href);return href;
 }
}
const el=<K extends keyof HTMLElementTagNameMap>(tag:K,text?:string)=>{const e=document.createElement(tag);if(text!==undefined)e.textContent=text;return e;};
export function mountReasoningPage(root:HTMLElement,c:ReasoningPageController){
 let epoch=0,closed=false,focus=0;
 const css='.g9-a53{min-width:0;overflow-wrap:anywhere}.g9-a53 .cells{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px}.g9-a53 button{min-height:48px;min-width:48px;max-width:100%;white-space:normal;overflow-wrap:anywhere;margin:0;padding:8px;font:inherit}.g9-a53 section{margin:12px 0}.g9-a53 button:focus-visible{outline:3px solid #125d82}@media(max-width:699px){.g9-a53 .cells{grid-template-columns:minmax(0,1fr)}}';
 function hold(){root.replaceChildren(el('p','Reviewed diagnostic curriculum unavailable.'));}
 async function refresh(restoreFocus=false){
  if(closed)return;const n=++epoch;root.replaceChildren(el('p','Checking curriculum authority…'));
  try{
   const v=await c.view();if(n!==epoch||closed)return;
   const box=el('main');box.className='g9-a53';box.append(el('style',css),el('h1',v.title),el('p','Diagnostic structural coverage only. Academic admission HOLD; no mastery or certification inferred.'));
   const grid=el('section');grid.className='cells';grid.setAttribute('aria-label','QRT cognitive demand cells');box.append(grid);
   const buttons:HTMLButtonElement[]=[];
   for(const [i,m] of v.cells.entries()){const b=el('button',m.op+' '+m.band+' — '+m.state.replaceAll('_',' '));b.type='button';b.dataset.coord=m.op+':'+m.band;b.tabIndex=i===focus?0:-1;b.addEventListener('click',()=>{focus=i;c.select(m.op,m.band);void refresh(true);});b.addEventListener('keydown',e=>{const d=({ArrowLeft:-1,ArrowRight:1,ArrowUp:-4,ArrowDown:4} as Record<string,number>)[e.key];if(d===undefined)return;e.preventDefault();focus=(i+d+28)%28;buttons.forEach((x,j)=>x.tabIndex=j===focus?0:-1);buttons[focus].focus();});buttons.push(b);grid.append(b);}
   const detail=el('section');detail.setAttribute('aria-label','Cell inspector');box.append(detail);
   if(v.selected){detail.append(el('h2',v.selected.id),el('p',v.selected.state));
    for(const t of v.selected.tasks){const p=el('p',t.kind+': '+t.ref.id+' r'+t.ref.revision);detail.append(p);if(t.navigable){const b=el('button','Open '+t.kind.toLowerCase()+' question');b.type='button';b.addEventListener('click',async()=>{root.replaceChildren(el('p','Checking route…'));const path=await c.launch(t.ref);if(path)root.replaceChildren(el('p','Authorized diagnostic route selected.'));else hold();});detail.append(b);}}
   }else detail.append(el('p','Select a cell.'));
   if(v.topicReturn){const b=el('button','Return to topic');b.type='button';b.addEventListener('click',async()=>{root.replaceChildren(el('p','Checking route…'));if(await c.returnToTopic())root.replaceChildren(el('p','Authorized topic route selected.'));else hold();});box.append(b);}
   root.replaceChildren(box);if(restoreFocus)buttons[focus].focus();
  }catch{if(n===epoch&&!closed)hold();}
 }
 return {refresh,close(){closed=true;epoch++;root.replaceChildren();}};
}
