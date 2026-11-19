// W9-INT-03: trusted host only. No static learner release or URL-derived authority.
import {Router} from '../app/router.ts';
import {composeWave9,type Wave9Catalog,type LiveAuthorization} from '../runtime/wave9-authority.ts';
import type {StorageDriver} from '../runtime/storage.ts';
import type {DefaultProgressStore} from '../runtime/progress.ts';
import type {StandardAssessmentEngine} from '../runtime/assessment.ts';
import {CORE1_ORIENTATION_BLOCKS} from '../journeys/core1.ts';
import {Core1BTransferJourney,transferDefinitionDigest,type Core1BTransferDefinition} from '../journeys/core1b.ts';
import {SupportedPracticeWorkspace} from '../journeys/supported-practice.ts';
import {sameRef} from '../runtime/loader.ts';
import {mountWave9Ink} from '../components/wave9-ink.ts';
import {structuredKinds,structuredResponseEditor} from '../components/wave9-structured-editors.ts';
import type {SupportedLocale,PresentationLevel} from '../runtime/presentation.ts';
import type {AssetLoader} from '../runtime/presentation.ts';
import {validateResponse} from '../runtime/response.ts';
import type {Kind,Response,WorkArtifact,JsonObject,Ref} from '../runtime/types.ts';
type Runtime=Awaited<ReturnType<typeof composeWave9>>;
type Option={readonly id:string;readonly label:string};
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
const structured=structuredKinds;
const supported=(k:Kind,opts?:readonly Option[])=>strings.includes(k)||k==='NUMERIC_QUANTITY'||structured.includes(k)||(['SINGLE_CHOICE','MULTIPLE_CHOICE'].includes(k)&&!!opts?.length);
function responseField(parent:HTMLElement,id:string,kind:Kind,old?:Response,opts?:readonly Option[]):()=>Response{
 if((kind==='SINGLE_CHOICE'||kind==='MULTIPLE_CHOICE')&&opts?.length){
  const label=el('label',id+' ('+kind+')'),s=el('select');s.multiple=kind==='MULTIPLE_CHOICE';s.dataset.field=id;
  if(!s.multiple){const empty=el('option','Choose…');empty.value='';empty.disabled=true;empty.selected=true;s.append(empty);}
  const prior=old?.kind==='SINGLE_CHOICE'?[old.value]:old?.kind==='MULTIPLE_CHOICE'?old.value:[];
  for(const opt of opts){const o=el('option',opt.label);o.value=opt.id;if(prior.includes(opt.id))o.selected=true;s.append(o);}
  label.append(s);parent.append(label);return ()=>validateResponse({kind,value:s.multiple?Array.from(s.selectedOptions,o=>o.value):s.value});
 }
 if(structured.includes(kind))return structuredResponseEditor(parent,id,kind,old);
 if(strings.includes(kind)){const i=field(parent,id+' ('+kind+')',old?.kind===kind&&typeof old.value==='string'?old.value:'',kind!=='INTEGER');i.dataset.field=id;return ()=>validateResponse({kind,value:i.value});}
 if(kind==='NUMERIC_QUANTITY'){const a=field(parent,id+' — decimal',old?.kind==='NUMERIC_QUANTITY'?old.value.decimal:''),b=field(parent,id+' — unit',old?.kind==='NUMERIC_QUANTITY'?old.value.unit:'');a.dataset.field=id+':decimal';b.dataset.field=id+':unit';return ()=>validateResponse({kind,value:{decimal:a.value,unit:b.value}});}
 parent.append(el('p','Unsupported response editor: '+kind));return ()=>{throw Error('EDITOR_UNAVAILABLE');};
}
function note(id:string,value:string):WorkArtifact{if(!value.trim())throw Error('WORKING_REQUIRED');return {id,kind:'NOTE',version:1,value};}
async function captureWork(ink:ReturnType<typeof mountWave9Ink>,sessionId:string,previous:WorkArtifact|undefined,text:string){const work:WorkArtifact[]=text.trim()?[note(previous&&previous.value===text?previous.id:'work:'+crypto.randomUUID(),text)]:[];const drawing=await ink.capture(sessionId);if(drawing)work.push(drawing);if(!work.length)throw Error('WORKING_REQUIRED');return work;}
export class Wave9WorkspaceHost{
 readonly #root:HTMLElement;readonly #router:Router;readonly #catalog:Wave9Catalog;readonly #runtime:Runtime;readonly #journey:Core1BTransferJourney|null;readonly #practice:SupportedPracticeWorkspace|null;
 #epoch=0;#busy=false;#active=false;#closed=false;#locale:SupportedLocale='en-US';#level:PresentationLevel='FORMAL';
 constructor(root:HTMLElement,router:Router,catalog:Wave9Catalog,runtime:Runtime,journey:Core1BTransferJourney|null,practice:SupportedPracticeWorkspace|null){this.#root=root;this.#router=router;this.#catalog=structuredClone(catalog);this.#runtime=runtime;this.#journey=journey;this.#practice=practice;}
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
 #button(parent:HTMLElement,label:string,action:string,epoch:number,run:()=>Promise<unknown>,preserve=false){const b=el('button',label);b.type='button';b.dataset.action=action;parent.append(b);b.addEventListener('click',()=>{void this.#act(epoch,run,preserve);});return b;}
 async #act(epoch:number,run:()=>Promise<unknown>,preserve=false){
  if(epoch!==this.#epoch||!this.#active||this.#busy)return;this.#busy=true;
  const view=this.#root.querySelector('.g9-w9')!,status=el('p','Checking durable state…');status.setAttribute('role','status');view.append(status);
  const local=preserve?Array.from(view.querySelectorAll<HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement>('[data-field]'),n=>({key:n.dataset.field!,value:n.value,selected:n instanceof HTMLSelectElement&&n.multiple?Array.from(n.selectedOptions,o=>o.value):null})):[];
  for(const n of view.querySelectorAll<HTMLButtonElement|HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement>('button,input,textarea,select'))n.disabled=true;
  for(const n of view.querySelectorAll('[data-protected]'))n.remove();
  try{await run();if(epoch===this.#epoch&&this.#active){await this.#render(epoch);for(const n of this.#root.querySelectorAll<HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement>('[data-field]')){const v=local.find(x=>x.key===n.dataset.field);if(v){if(n instanceof HTMLSelectElement&&v.selected)for(const o of n.options)o.selected=v.selected.includes(o.value);else{n.value=v.value;n.dispatchEvent(new Event('w9-restore'));}}}}}
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
   if(p.print)this.#button(primary,'Get reviewed PDF','print-pdf',epoch,async()=>{
    const bytes=await r.readPrintPDF(cp);if(!bytes||epoch!==this.#epoch||!this.#active)throw Error('PRINT_NOT_AUTHORIZED');
    const url=URL.createObjectURL(new Blob([new Uint8Array(bytes)],{type:'application/pdf'})),link=el('a');link.href=url;link.download='reviewed-orientation.pdf';link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
   });
   else primary.append(el('p','Print unavailable until exact native authorization is supplied.'));
   primary.append(el('p','Lesson launch requires separate native authorization.'));
  }else if(c.role==='CORE2A'){
   identity.append(el('h1','Supported application'));primary.dataset.slot='attempt';
   const inBoundary=e.snapshot.stage==='BOUNDARY_TEST';
   const variants=p.presentations??[{locale:'en-US' as const,level:'FORMAL' as const,asset:p.projection!}];
   const selected=variants.find(v=>v.locale===this.#locale&&v.level===this.#level);
   const text=!inBoundary&&selected?await r.presentation.read(selected.asset,this.#locale,this.#level,cp):null;
   const selector=el('select');selector.setAttribute('aria-label','Reviewed presentation');selector.dataset.presentation='true';
   for(const [i,v] of variants.entries()){const option=el('option',v.locale+' · '+v.level);option.value=String(i);option.selected=v===selected;selector.append(option);}
   if(!inBoundary)identity.append(selector);
   if(!inBoundary)this.#button(identity,'Change presentation','presentation',epoch,async()=>{const v=variants[Number(selector.value)];if(!v)throw Error('PRESENTATION_UNAVAILABLE');this.#locale=v.locale;this.#level=v.level;},true);
   if(text){const content=protect(el('p',text.text));content.lang=text.locale;primary.append(content);const symbols=el('dl');for(const [symbol,unit] of Object.entries(text.symbolsAndUnits))symbols.append(el('dt',symbol),el('dd',unit));primary.append(protect(symbols));}
   else if(!inBoundary)primary.append(el('p','Exact reviewed presentation unavailable. No translation or level fallback.'));
   const support=el('aside');support.dataset.slot='support';grid.append(support);
   const reasoning=el('section');reasoning.dataset.slot='reasoning';primary.append(reasoning);
   const practice=this.#practice;
   if(!practice){reasoning.append(el('p','Practice submission unavailable: exact assessment binding required.'));}
   else if(e.snapshot.stage==='PREDICT'){
    const pred=field(primary,'Initial prediction','',true);this.#button(primary,'Commit prediction','practice-predict',epoch,async()=>{await practice.predict(cp,pred.value);});
   }else if(e.snapshot.stage==='ATTEMPT'){
    const draft=await practice.draft(cp),opts=p.choices?.first??{},editors=Object.entries(e.context.firstFields).map(([id,k])=>[id,responseField(primary,id,k,draft?.responses[id],opts[id])] as const);
    const prev=draft?.work.find(w=>w.kind==='NOTE'),work=field(primary,'Show your working',typeof prev?.value==='string'?prev.value:'',true);work.dataset.field='working';
    const ink=mountWave9Ink(primary,draft?.work.find(w=>w.kind==='INK'));
    const capture=async()=>({values:Object.fromEntries(editors.map(([id,read])=>[id,read()])),work:await captureWork(ink,e.session.id,prev,work.value)});
    const available=Object.entries(e.context.firstFields).every(([id,k])=>supported(k,opts[id]));
    this.#button(primary,'Save practice draft','practice-save',epoch,async()=>{const v=await capture();await practice.save(cp,v.values,v.work,draft?.revision??0);}).disabled=!available;
    this.#button(primary,'Commit practice attempt','practice-commit',epoch,async()=>{const v=await capture();const saved=await practice.save(cp,v.values,v.work,draft?.revision??0);await practice.commit(cp,v.values,v.work,saved.revision);}).disabled=!available;
    for(const t of await practice.readSupport(cp))support.append(protect(el('p',t)));
    const count=e.events.filter(v=>v.event_type==='HELP_EXPOSED'&&['H1','H2','H3'].includes(v.payload.capability)).length;
    const cap=(['H1','H2','H3'] as const)[count],grant=c.grants.find(g=>g.capability===cap);
    if(grant&&cap&&await r.controller.canRequest(cap,grant.asset,cp))this.#button(support,'Request practice support','practice-hint',epoch,async()=>{await practice.request(cp,cap,grant.asset);},true);
    reasoning.append(el('p','Independent check and reviewed reference remain withheld until the first attempt is committed.'));
   }else if(inBoundary&&practice.hasBoundary()){
    const stimulus=await practice.boundaryStimulus(cp);if(stimulus===null)throw Error('PRACTICE_BOUNDARY_UNAVAILABLE');
    primary.append(el('h2','Independent post-repair boundary'),protect(el('p',stimulus)));
    reasoning.append(el('p','Prior references and crux withheld during the independent boundary. No help is available.'));
    if(!e.snapshot.boundaryAttemptId){
     const draft=await practice.boundaryDraft(cp),opts=p.choices?.boundary??{},editors=Object.entries(e.context.boundaryFields).map(([id,k])=>[id,responseField(primary,id,k,draft?.responses[id],opts[id])] as const);
     const prev=draft?.work.find(w=>w.kind==='NOTE'),work=field(primary,'Show your boundary working',typeof prev?.value==='string'?prev.value:'',true);work.dataset.field='working';
     const ink=mountWave9Ink(primary,draft?.work.find(w=>w.kind==='INK'));
     const capture=async()=>({values:Object.fromEntries(editors.map(([id,read])=>[id,read()])),work:await captureWork(ink,c.boundarySessionId,prev,work.value)});
     const available=Object.entries(e.context.boundaryFields).every(([id,k])=>supported(k,opts[id]));
     this.#button(primary,'Save boundary draft','practice-boundary-save',epoch,async()=>{const v=await capture();await practice.saveBoundary(cp,v.values,v.work,draft?.revision??0);}).disabled=!available;
     this.#button(primary,'Commit independent boundary','practice-boundary-commit',epoch,async()=>{const v=await capture(),saved=await practice.saveBoundary(cp,v.values,v.work,draft?.revision??0);await practice.commitBoundary(cp,v.values,v.work,saved.revision);}).disabled=!available;
    }else this.#button(primary,'View independent boundary feedback','practice-boundary-feedback',epoch,async()=>{await practice.boundaryFeedback(cp);});
   }else if(inBoundary){reasoning.append(el('p','Repair recorded. New independent boundary assessment remains unavailable; no completion or mastery inferred.'));}
   else if(e.snapshot.stage==='COMPLETE'){
    const txt=await practice.readBoundaryReference(cp);if(txt===null)throw Error('BOUNDARY_REFERENCE_UNAVAILABLE');
    reasoning.append(el('h2','Independent boundary feedback'),protect(el('p',txt)),el('p','Durable repair and boundary recorded. No mastery or academic approval inferred.'));
   }else if(e.snapshot.firstAttemptId){
    reasoning.append(el('h2','Reviewed reasoning'));const crux=await practice.readCrux(cp),reference=await practice.readReference(cp);
    if(crux!==null){reasoning.append(el('h3','Application crux'),protect(el('p',crux)));}if(reference!==null){reasoning.append(el('h3','Reviewed reference'),protect(el('p',reference)));}
    const check=await r.practice!.readIndependentCheck(cp);
    reasoning.append(el('h3','Independent check'),protect(el('p',check.status==='CHECK_PASSED'?'Qualified typed check passed — not mastery.':check.status==='CHECK_DIVERGED'?'Qualified typed check diverged — not mastery.':'Review pending.')));
    if(check.status==='CHECK_DIVERGED')reasoning.append(el('p','Failure signal: review the mismatch and record a repair. The separate check is not a new post-repair boundary.'));
    if(e.snapshot.stage==='RECONSTRUCT'&&reference!==null){
     const original=await practice.original(cp);if(original)reasoning.append(el('h3','Your committed response'),protect(el('pre',JSON.stringify(original.response,null,2))));
     const inputs=(await practice.moves(cp)).map(m=>[m,field(primary,'Compare '+m,'',true)] as const);
     this.#button(primary,'Record comparison','practice-compare',epoch,async()=>{await practice.compare(cp,Object.fromEntries(inputs.map(([m,i])=>[m,{observation:i.value} as JsonObject])));});
    }else if(e.snapshot.stage==='DIAGNOSE'){
     const opts=[...await practice.moves(cp),'UNSURE','NO_DIVERGENCE'],s=select(primary,'Divergence',opts),why=field(primary,'Why?','',true);
     this.#button(primary,'Record diagnosis','practice-diagnose',epoch,async()=>{await practice.diagnose(cp,choice(s,opts),why.value);});
    }else if(e.snapshot.stage==='REPAIR'){
     const why=field(primary,'Repair explanation','',true),work=field(primary,'New repair working','',true);
     this.#button(primary,'Record repair','practice-repair',epoch,async()=>{await practice.repair(cp,why.value,[note('work:'+crypto.randomUUID(),work.value)]);});
    }else if(e.snapshot.stage==='BOUNDARY_TEST')reasoning.append(el('p','Repair recorded. New independent boundary assessment remains unavailable; no completion or mastery inferred.'));
   }
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
    const kinds=v.stage==='ATTEMPT'?e.context.firstFields:e.context.boundaryFields,old=j.getResponses(),opts=(v.stage==='ATTEMPT'?p.choices?.first:p.choices?.boundary)??{},editors=Object.entries(kinds).map(([id,k])=>[id,responseField(primary,id,k,old[id],opts[id])] as const);
    const previous=j.getWork().find(x=>x.kind==='NOTE'),work=field(primary,'Show your working',typeof previous?.value==='string'?previous.value:'',true);work.dataset.field='working';
    const ink=mountWave9Ink(primary,j.getWork().find(w=>w.kind==='INK'));
    const capture=async()=>{const values=Object.fromEntries(editors.map(([id,read])=>[id,read()]));j.setResponses(values,await captureWork(ink,v.stage==='ATTEMPT'?e.session.id:c.boundarySessionId,previous,work.value));};
    const available=Object.entries(kinds).every(([id,k])=>supported(k,opts[id]));
    this.#button(controls,'Save draft','save',epoch,async()=>{await capture();await j.saveDraft();}).disabled=!available;
    this.#button(controls,'Commit attempt','commit',epoch,async()=>{await capture();await j.saveDraft();await(v.stage==='ATTEMPT'?j.commitFirstAttempt():j.commitBoundaryAttempt());}).disabled=!available;
    if(v.stage==='ATTEMPT'){
     const used=j.getExposedHints();for(const h of used){const txt=await j.readHint(h.level);if(txt!==null)support.append(protect(el('p',txt)));}
     const next=d.hints[used.length];if(next&&await r.controller.canRequest(next.level,next.assetRef as Ref,cp))this.#button(support,'Request hint','hint',epoch,async()=>{await j.requestHint();},true);
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
    if(returned){primary.append(el('p','Source return recorded. Original cursor: '+returned.cursor+'.'));const dest=p.sourceRoute;if(dest&&dest.sessionId===returned.sessionId&&sameRef(dest.origin,returned.ref)&&dest.cursor===returned.cursor){this.#button(controls,'Open authorized source route','open-source',epoch,async()=>{const current=await t.readSourceReturn(cp);if(!current||current.sessionId!==dest.sessionId||!sameRef(current.ref,dest.origin)||current.cursor!==dest.cursor)throw Error('SOURCE_ROUTE_STALE');const href=this.#router.toHref('/role/'+dest.role+'/'+encodeURIComponent(dest.resourceId)),match=this.#router.match(href);if(match.type!=='ROLE'||match.params.coreRole!==dest.role||match.params.resourceId!==dest.resourceId)throw Error('SOURCE_ROUTE_MISMATCH');const source=dest.projection?await r.readReturnedSource(cp):null;if(dest.projection&&!source)throw Error('SOURCE_PROJECTION_UNAVAILABLE');if(epoch!==this.#epoch||!this.#active)return;this.#active=false;this.#epoch++;if(source){const frame=this.#frame();frame.dataset.role=source.role;frame.append(el('h1','Returned source'),el('p','Original cursor: '+source.cursor),protect(el('p',source.text)));this.#root.replaceChildren(frame);}else this.#hold('Authorized source route selected; destination mounting requires the trusted host.');this.#router.navigate(href);});}else primary.append(el('p','No authorized destination route.'));}
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
  // Constructor validates and strips protected fields exactly once. Never revalidate a sealed projection as raw input.
  j=new Core1BTransferJourney(definition,{controller:runtime.controller,driver:deps.driver,progress:deps.progress,engine:deps.engine,definitionSha256:c.page.transferDefinitionSha256!,boundarySessionId:c.boundarySessionId,assessmentA:c.page.assessmentA!,assessmentB:c.page.assessmentB!,loadProtected:deps.load});
 }
 const practice=c.role==='CORE2A'&&c.page.practiceAssessment&&deps.engine?new SupportedPracticeWorkspace(runtime.controller,deps.progress,deps.engine,c.page.practiceAssessment,deps.load,c.page.practiceBoundary?{driver:deps.driver,sessionId:c.boundarySessionId,assessment:c.page.practiceBoundary.assessment}:undefined):null;
 return new Wave9WorkspaceHost(root,router,c,runtime,j,practice);
}
