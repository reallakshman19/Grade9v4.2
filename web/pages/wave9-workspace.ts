// W9-INT-03: trusted host only. No static learner release or URL-derived authority.
import {Router} from '../app/router.ts';
import {composeWave9,type Wave9Catalog,type LiveAuthorization} from '../runtime/wave9-authority.ts';
import type {StorageDriver} from '../runtime/storage.ts';
import type {DefaultProgressStore} from '../runtime/progress.ts';
import type {StandardAssessmentEngine} from '../runtime/assessment.ts';
import {CORE1_ORIENTATION_BLOCKS} from '../journeys/core1.ts';
import {Core1BTransferJourney,publicTransfer,transferDefinitionDigest,type Core1BTransferDefinition} from '../journeys/core1b.ts';
import type {AssetLoader} from '../runtime/presentation.ts';
import {validateResponse} from '../runtime/response.ts';
import type {Kind,Response,WorkArtifact,JsonObject,Ref} from '../runtime/types.ts';
type Runtime=Awaited<ReturnType<typeof composeWave9>>;
export interface Wave9HostDependencies {
 readonly driver:StorageDriver;readonly progress:DefaultProgressStore;readonly live:LiveAuthorization;readonly load:AssetLoader;
 readonly engine?:StandardAssessmentEngine;readonly definition?:Core1BTransferDefinition;
}
const css=`
.g9-w9{box-sizing:border-box;width:100%;max-width:100%;min-width:0;color:#172c40;line-height:1.55;overflow-wrap:anywhere}
.g9-w9 *{box-sizing:border-box;min-width:0}
.g9-w9 h1,.g9-w9 h2,.g9-w9 h3{margin:.5rem 0}
.g9-w9 p,.g9-w9 pre{white-space:pre-wrap;overflow-wrap:anywhere;margin:.5rem 0;font:inherit}
.g9-w9 .w9-grid{display:grid;grid-template-columns:minmax(0,1fr);gap:16px}
.g9-w9 section,.g9-w9 aside{padding:12px;border:1px solid #ccd7e1;border-radius:8px}
.g9-w9 .w9-controls{display:flex;flex-wrap:wrap;gap:8px;margin:12px 0}
.g9-w9 button,.g9-w9 select,.g9-w9 input,.g9-w9 textarea{font:inherit;min-height:48px;min-width:48px;max-width:100%;border:1px solid #63798b;border-radius:6px;padding:8px}
.g9-w9 button{background:#f0f5fa;color:#172c40;cursor:pointer}
.g9-w9 button:disabled{opacity:.6;cursor:not-allowed}
.g9-w9 label{display:block;margin:8px 0}
.g9-w9 input,.g9-w9 textarea,.g9-w9 select{display:block;width:100%}
.g9-w9 textarea{min-height:100px;resize:vertical}
.g9-w9 :focus-visible{outline:3px solid #125d82;outline-offset:2px}
.g9-w9 .w9-print-notice{display:none}
@media(min-width:1000px){.g9-w9[data-role=CORE2A] .w9-grid,.g9-w9[data-role=CORE2B] .w9-grid{grid-template-columns:minmax(0,68fr) minmax(0,32fr)}}
@media print{.g9-w9>*:not(.w9-print-notice){display:none!important}.g9-w9 .w9-print-notice{display:block!important}}
`;
function el<K extends keyof HTMLElementTagNameMap>(tag:K,value?:string):HTMLElementTagNameMap[K]{const n=document.createElement(tag);if(value!==undefined)n.textContent=value;return n;}
function protect<T extends HTMLElement>(n:T):T{n.dataset.protected='true';return n;}
function field(parent:HTMLElement,label:string,value='',multiline=false){const l=el('label',label),i=multiline?el('textarea'):el('input');i.value=value;l.append(i);parent.append(l);return i;}
function select(parent:HTMLElement,label:string,options:readonly string[]){
 const l=el('label',label),s=el('select'),empty=el('option','Choose…');empty.value='';empty.disabled=true;empty.selected=true;s.append(empty);
 options.forEach((v,i)=>{const o=el('option',v);o.value=String(i);s.append(o);});l.append(s);parent.append(l);return s;
}
function choice(s:HTMLSelectElement,options:readonly string[]){if(s.value==='')throw Error('SELECTION_REQUIRED');const i=Number(s.value);if(!Number.isInteger(i)||i<0||i>=options.length)throw Error('SELECTION_REQUIRED');return options[i];}
const strings:readonly Kind[]=['INTEGER','CONSTRUCTED_RESPONSE','SYMBOLIC_EXPRESSION','MATHEMATICAL_PROOF'];
const supported=(k:Kind)=>strings.includes(k)||k==='NUMERIC_QUANTITY';
function responseField(parent:HTMLElement,id:string,kind:Kind,old?:Response):()=>Response{
 if(strings.includes(kind)){const i=field(parent,id+' ('+kind+')',old?.kind===kind&&typeof old.value==='string'?old.value:'',kind!=='INTEGER');i.dataset.field=id;return ()=>validateResponse({kind,value:i.value});}
 if(kind==='NUMERIC_QUANTITY'){const a=field(parent,id+' — decimal',old?.kind==='NUMERIC_QUANTITY'?old.value.decimal:''),b=field(parent,id+' — unit',old?.kind==='NUMERIC_QUANTITY'?old.value.unit:'');a.dataset.field=id+':decimal';b.dataset.field=id+':unit';return ()=>validateResponse({kind,value:{decimal:a.value,unit:b.value}});}
 parent.append(el('p','Unsupported response editor: '+kind));return ()=>{throw Error('EDITOR_UNAVAILABLE');};
}
function note(id:string,value:string):WorkArtifact{if(!value.trim())throw Error('WORKING_REQUIRED');return {id,kind:'NOTE',version:1,value};}
export class Wave9WorkspaceHost{
 readonly #root:HTMLElement;readonly #router:Router;readonly #catalog:Wave9Catalog;readonly #runtime:Runtime;readonly #journey:Core1BTransferJourney|null;
 #epoch=0;#busy=false;#active=false;#closed=false;
 constructor(root:HTMLElement,router:Router,catalog:Wave9Catalog,runtime:Runtime,journey:Core1BTransferJourney|null){this.#root=root;this.#router=router;this.#catalog=structuredClone(catalog);this.#runtime=runtime;this.#journey=journey;}
 href(){const p=this.#catalog.page;if(!p)throw Error('PAGE_NOT_AUTHORIZED');return this.#router.toHref('/role/'+this.#catalog.role+'/'+encodeURIComponent(p.resourceId));}
 #frame(){const box=el('main');box.className='g9-w9';box.dataset.role=this.#catalog.role;const banner=el('p','Diagnostic workspace · Academic admission HOLD · Review not completed');banner.setAttribute('role','status');const print=el('p','Printing unavailable: no verified exact-output print authorization.');print.className='w9-print-notice';box.append(el('style',css),banner,print);return box;}
 #hold(message:string){const box=this.#frame();box.append(el('h1','Workspace unavailable'),el('p',message));this.#root.replaceChildren(box);}
 async open(path:string){
  if(this.#closed)return false;const epoch=++this.#epoch;this.#active=false;this.#hold('Checking reviewed route…');
  const route=this.#router.match(path),p=this.#catalog.page;
  if(!p||route.type!=='ROLE'||route.params.coreRole!==this.#catalog.role||route.params.resourceId!==p.resourceId||Object.keys(route.query).length||route.hash){this.#hold('Route not authorized.');return false;}
  if(this.#busy){this.#hold('A previous operation is resolving. Reopen the reviewed route.');return false;}
  this.#active=true;this.#busy=true;
  try{if(this.#journey)await this.#journey.start();else await this.#runtime.controller.begin();if(epoch!==this.#epoch||!this.#active)return false;await this.#render(epoch);return epoch===this.#epoch&&this.#active;}
  catch{if(epoch===this.#epoch){this.#active=false;this.#hold('Reviewed route or durable state unavailable.');}return false;}finally{this.#busy=false;}
 }
 close(){this.#epoch++;this.#active=false;this.#closed=true;this.#root.replaceChildren();}
 #button(parent:HTMLElement,label:string,action:string,epoch:number,run:()=>Promise<unknown>){const b=el('button',label);b.type='button';b.dataset.action=action;parent.append(b);b.addEventListener('click',()=>{void this.#act(epoch,run);});return b;}
 async #act(epoch:number,run:()=>Promise<unknown>){
  if(epoch!==this.#epoch||!this.#active||this.#busy)return;this.#busy=true;
  const view=this.#root.querySelector('.g9-w9')!,status=el('p','Checking durable state…');status.setAttribute('role','status');view.append(status);
  for(const n of view.querySelectorAll<HTMLButtonElement|HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement>('button,input,textarea,select'))n.disabled=true;
  try{await run();if(epoch===this.#epoch&&this.#active)await this.#render(epoch);}
  catch{if(epoch===this.#epoch&&this.#active){for(const n of view.querySelectorAll('[data-protected]'))n.remove();status.textContent='Operation not verified. Feedback withheld. Copy unsaved working before reopening.';const reopen=el('button','Reopen verified route');reopen.type='button';reopen.addEventListener('click',()=>{void this.open(this.href());});view.append(reopen);}}
  finally{this.#busy=false;}
 }
 async #render(epoch:number){
  const r=this.#runtime,c=this.#catalog,p=c.page!,e=await r.controller.readEvidence(),cp=e.snapshot.checkpoint;
  const box=this.#frame(),identity=el('section');identity.dataset.slot='identity';box.append(identity);const grid=el('div');grid.className='w9-grid';box.append(grid);const primary=el('section');grid.append(primary);
  if(c.role==='CORE1'){
   identity.append(el('h1','Topic orientation'));primary.dataset.slot='orientation';
   const o=await r.orientation!.read(p.projection!,cp);if(!o)throw Error('ORIENTATION_UNAVAILABLE');
   for(const key of CORE1_ORIENTATION_BLOCKS){const dest=key==='identity_scope'||key==='learner_metadata'?identity:primary;dest.append(el('h3',key.replaceAll('_',' ')),protect(el('p',o.blocks[key])));}
   primary.append(el('p','Print and lesson launch are unavailable until exact native authorization is supplied.'));
  }else if(c.role==='CORE2A'){
   identity.append(el('h1','Supported application'));primary.dataset.slot='attempt';
   const text=await r.presentation.read(p.projection!,'en-US','FORMAL',cp);if(!text)throw Error('PRACTICE_UNAVAILABLE');primary.append(protect(el('p',text.text)));
   const support=el('aside');support.dataset.slot='reasoning';grid.append(support);const check=await r.practice!.readIndependentCheck(cp);
   support.append(el('h2','Independent check'),protect(el('p',check.status==='CHECK_PASSED'?'Qualified typed check passed — not mastery.':check.status==='CHECK_DIVERGED'?'Qualified typed check diverged — not mastery.':'Review pending.')),el('p','Reads an existing qualified check; does not submit new practice work.'));
  }else{
   const j=this.#journey!,t=r.transfer!,v=await t.view(cp);
   identity.append(el('h1','Changed-demand application'),el('p','Stage: '+v.stage+(v.assisted?' · Assisted':'')));
   primary.dataset.slot=v.firstCommitted?'post_attempt':'attempt';
   const stimulus=await t.readStimulus(cp);if(stimulus===null)throw Error('STIMULUS_UNAVAILABLE');primary.append(protect(el('p',stimulus)));
   const support=el('aside');grid.append(support);support.append(el('h2','Progress'),el('p',v.firstCommitted?'First attempt committed.':'First attempt not committed.'));
   const controls=el('div');controls.className='w9-controls';primary.append(controls);const d=j.getDefinition();
   if(v.stage==='PREDICT'){
    primary.insertBefore(protect(el('p',d.qualitativePredictionPrompt)),controls);const opts=d.predictionOptions,s=select(primary,'Prediction',opts);
    this.#button(controls,'Commit prediction','predict',epoch,async()=>{choice(s,opts);await j.predict(Number(s.value));});
   }else if(v.stage==='ATTEMPT'||v.stage==='BOUNDARY_TEST'&&!v.boundaryCommitted){
    const kinds=v.stage==='ATTEMPT'?e.context.firstFields:e.context.boundaryFields,old=j.getResponses(),editors=Object.entries(kinds).map(([id,k])=>[id,responseField(primary,id,k,old[id])] as const);
    const previous=j.getWork().find(x=>x.kind==='NOTE'),work=field(primary,'Show your working',typeof previous?.value==='string'?previous.value:'',true);work.dataset.field='working';
    const capture=()=>{j.setResponses(Object.fromEntries(editors.map(([id,read])=>[id,read()])),[note(previous?.id??'work:'+crypto.randomUUID(),work.value)]);};
    const available=Object.values(kinds).every(supported);
    this.#button(controls,'Save draft','save',epoch,async()=>{capture();await j.saveDraft();}).disabled=!available;
    this.#button(controls,'Commit attempt','commit',epoch,async()=>{capture();await j.saveDraft();await(v.stage==='ATTEMPT'?j.commitFirstAttempt():j.commitBoundaryAttempt());}).disabled=!available;
    if(v.stage==='ATTEMPT'){
     const used=j.getExposedHints();for(const h of used){const txt=await j.readHint(h.level);if(txt!==null)support.append(protect(el('p',txt)));}
     const next=d.hints[used.length];if(next&&await r.controller.canRequest(next.level,next.assetRef as Ref,cp))this.#button(support,'Request hint','hint',epoch,async()=>{capture();await j.saveDraft();await j.requestHint();}).disabled=!available;
    }
   }else if(v.stage==='RECONSTRUCT'){
    const txt=await j.getTaskASolution();if(txt===null)throw Error('REFERENCE_UNAVAILABLE');support.append(protect(el('p',txt)));
    const moves=await j.readReviewMoves(),inputs=moves.map(m=>[m,field(primary,'Compare '+m,'',true)] as const);
    this.#button(controls,'Commit comparison','compare',epoch,async()=>{await j.completeReconstruction(Object.fromEntries(inputs.map(([m,i])=>[m,{observation:i.value} as JsonObject])));});
   }else if(v.stage==='DIAGNOSE'){
    const opts=[...await j.readReviewMoves(),'UNSURE','NO_DIVERGENCE'],s=select(primary,'Divergence',opts),why=field(primary,'Why?','',true);
    this.#button(controls,'Commit diagnosis','diagnose',epoch,async()=>{await j.commitDiagnosis(choice(s,opts),why.value);});
   }else if(v.stage==='REPAIR'){
    const why=field(primary,'Repair explanation','',true),work=field(primary,'New repair working','',true);
    this.#button(controls,'Commit repair','repair',epoch,async()=>{await j.commitRepair(why.value,[note('work:'+crypto.randomUUID(),work.value)]);});
   }else if(v.stage==='BOUNDARY_TEST'&&v.boundaryCommitted){
    support.append(el('p','Boundary commitment verified.'));this.#button(controls,'View boundary feedback','boundary-feedback',epoch,async()=>{await j.viewBoundaryFeedback();});
   }else if(v.stage==='COMPLETE'){
    const txt=await j.getTaskBSolution();if(txt!==null)support.append(protect(el('p',txt)));const returned=await t.readSourceReturn(cp);
    if(returned)primary.append(el('p','Source return recorded. Original cursor: '+returned.cursor+'. Destination mounting requires a separately authorized route.'));
    else this.#button(controls,'Record source return','return-source',epoch,async()=>{await j.returnToSource();});
   }
  }
  await r.controller.readEvidence(cp);if(epoch===this.#epoch&&this.#active)this.#root.replaceChildren(box);
 }
}
export async function createWave9WorkspaceHost(root:HTMLElement,router:Router,catalog:Wave9Catalog,pin:string,deps:Wave9HostDependencies){
 const c=structuredClone(catalog),definition=deps.definition&&structuredClone(deps.definition),runtime=await composeWave9(c,pin,deps.driver,deps.progress,deps.live,deps.load);
 if(!c.page)throw Error('PAGE_BINDING_REQUIRED');let j:Core1BTransferJourney|null=null;
 if(c.role==='CORE2B'){
  if(!definition||!deps.engine||await transferDefinitionDigest(definition)!==c.page.transferDefinitionSha256)throw Error('TRANSFER_PAGE_DEFINITION_MISMATCH');
  const safe={...publicTransfer(definition),expectedPredictionIndex:-1};
  j=new Core1BTransferJourney(safe,{controller:runtime.controller,driver:deps.driver,progress:deps.progress,engine:deps.engine,definitionSha256:c.page.transferDefinitionSha256!,boundarySessionId:c.boundarySessionId,assessmentA:c.page.assessmentA!,assessmentB:c.page.assessmentB!,loadProtected:deps.load});
 }
 return new Wave9WorkspaceHost(root,router,c,runtime,j);
}
