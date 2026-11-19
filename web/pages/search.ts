// A35 diagnostic search host. No automatic public shell mount; the host must
// supply a factory that resolves current authorized pins and bytes on every reload.
import {Router} from '../app/router.ts';
import {SearchEngine,type SearchFacets,type SearchItem} from '../runtime/search.ts';
import {FACETS,type Facet} from '../runtime/search-model.ts';
const el=<K extends keyof HTMLElementTagNameMap>(tag:K,text?:string)=>{const n=document.createElement(tag);if(text!==undefined)n.textContent=text;return n;};
const css='.g9-search{min-width:0;max-width:100%;overflow-wrap:anywhere;line-height:1.5}.g9-search *{box-sizing:border-box;min-width:0}.g9-search .layout{display:grid;grid-template-columns:minmax(0,1fr);gap:16px}.g9-search button,.g9-search input[type=search]{font:inherit;min-height:48px;min-width:48px;max-width:100%;padding:8px;border:1px solid #63798b;border-radius:6px}.g9-search button[data-action=search]{min-height:56px}.g9-search input[type=search]{width:100%}.g9-search button{white-space:normal;overflow-wrap:anywhere}.g9-search .controls{display:flex;gap:8px;flex-wrap:wrap;margin:8px 0}.g9-search fieldset{border:1px solid #b8c6d0;margin:8px 0;padding:8px;min-width:0}.g9-search label.facet{display:flex;align-items:center;gap:8px;min-height:48px;cursor:pointer}.g9-search label.facet input{width:24px;height:24px;flex:none}.g9-search article{border:1px solid #b8c6d0;border-radius:8px;padding:12px;margin:8px 0}.g9-search :focus-visible{outline:3px solid #125d82;outline-offset:2px}@media(min-width:1000px){.g9-search .layout{grid-template-columns:minmax(0,1fr) minmax(240px,32%)}}';
export type SearchPageState='LOADING'|'RESULTS'|'ZERO_RESULTS'|'STALE_OR_UNAVAILABLE'|'CLOSED';
export class UniversalSearchPageController{
 readonly #root:HTMLElement;readonly #router:Router;readonly #factory:()=>Promise<SearchEngine>;
 #engine:SearchEngine|null=null;#epoch=0;#closed=false;#state:SearchPageState='LOADING';#query='';#facets:SearchFacets={};#offset=0;#off:()=>void;
 constructor(root:HTMLElement,router:Router,factory:()=>Promise<SearchEngine>){this.#root=root;this.#router=router;this.#factory=factory;this.#off=router.subscribe(m=>{if(m.type!=='SEARCH')this.close();});}
 getState(){return this.#state;}
 #frame(){const box=el('main');box.className='g9-search';box.append(el('style',css),el('h1','Find a question'),el('p','Diagnostic search · Academic admission HOLD · Review not completed'));return box;}
 #status(box:HTMLElement,text:string){const p=el('p',text);p.setAttribute('role','status');p.setAttribute('aria-live','polite');box.append(p);}
 #button(parent:HTMLElement,text:string,run:()=>void,action?:string){const b=el('button',text);b.type='button';if(action)b.dataset.action=action;b.addEventListener('click',run);parent.append(b);return b;}
 #unavailable(){this.#state='STALE_OR_UNAVAILABLE';this.#engine?.close();this.#engine=null;const box=this.#frame();this.#status(box,'Search index unavailable, stale or unauthorized. No cached results are displayed.');this.#button(box,'Reload verified search',()=>{void this.open(this.#router.toHref('/search'));},'reload');this.#root.replaceChildren(box);}
 async open(path:string){
  if(this.#closed)return false;const m=this.#router.match(path);
  if(m.type!=='SEARCH'||Object.keys(m.query).length||m.hash){this.#epoch++;this.#unavailable();return false;}
  const epoch=++this.#epoch;this.#engine?.close();this.#engine=null;this.#state='LOADING';const box=this.#frame();this.#status(box,'Verifying search index…');this.#root.replaceChildren(box);
  try{
   const e=await this.#factory();if(this.#closed||epoch!==this.#epoch){e.close();return false;}
   this.#engine=e;this.#offset=0;return await this.#render();
  }catch{if(!this.#closed&&epoch===this.#epoch)this.#unavailable();return false;}
 }
 async #render(){
  const e=this.#engine;if(!e||this.#closed)return false;const epoch=++this.#epoch;this.#state='LOADING';
  const pending=this.#frame();this.#status(pending,'Searching verified records…');this.#root.replaceChildren(pending);
  const query=this.#query,facets=structuredClone(this.#facets),offset=this.#offset;
  try{
   const [r,available]=await Promise.all([e.query({text:query,facets,limit:20,offset}),e.facets()]);
   if(this.#closed||epoch!==this.#epoch||e!==this.#engine)return false;
   const box=this.#frame(),form=el('form'),label=el('label','Search reviewed questions by topic, term or formula'),input=el('input');input.type='search';input.value=query;input.maxLength=1000;input.dataset.search='true';label.append(input);form.append(label);
   const tools=el('div');tools.className='controls';
   const submit=el('button','Search');submit.type='submit';submit.dataset.action='search';tools.append(submit);
   this.#button(tools,'Clear',()=>{this.#query='';this.#offset=0;void this.#render();},'clear');form.append(tools);
   const symbols=el('div');symbols.className='controls';symbols.setAttribute('aria-label','Formula symbols');
   for(const symbol of ['+','−','=','·','²','³','√','Δ','θ','π','→','λ'])this.#button(symbols,symbol,()=>{const start=input.selectionStart??input.value.length,end=input.selectionEnd??start;input.setRangeText(symbol,start,end,'end');this.#query=input.value;input.focus();});
   form.append(symbols);form.addEventListener('submit',ev=>{ev.preventDefault();this.#query=input.value;this.#offset=0;void this.#render();});
   input.addEventListener('input',()=>{this.#query=input.value;});box.append(form);
   const layout=el('div');layout.className='layout';box.append(layout);
   const result=el('section');result.setAttribute('aria-label','Search results');result.dataset.results='true';layout.append(result);
   this.#state=r.totalMatches?'RESULTS':'ZERO_RESULTS';
   this.#status(result,r.totalMatches?r.totalMatches+' matching diagnostic question(s).':'No matching reviewed diagnostic questions.');
   if(r.suggestion){const suggestion=r.suggestion;this.#button(result,'Did you mean: '+suggestion+'?',()=>{this.#query=suggestion;this.#offset=0;void this.#render();},'suggestion');}
   for(const row of r.results){
    const item=row.item,article=el('article');article.append(el('h2',item.title),el('p',item.summary),el('p','Practice question · '+item.subjectIds.join(', ')));
    this.#button(article,'Open diagnostic question',()=>{void this.#launch(item,epoch);},'open-question');result.append(article);
   }
   const pager=el('div');pager.className='controls';result.append(pager);
   if(offset>0)this.#button(pager,'Previous results',()=>{this.#offset=Math.max(0,offset-20);void this.#render();});
   if(offset+20<r.totalMatches)this.#button(pager,'Next results',()=>{this.#offset=offset+20;void this.#render();});
   const aside=el('aside');aside.setAttribute('aria-label','Search filters');layout.append(aside);aside.append(el('h2','Filter questions'));
   for(const k of FACETS){if(!available[k].length)continue;const fieldset=el('fieldset');fieldset.append(el('legend',k));for(const value of available[k]){
    const l=el('label',value);l.className='facet';const cb=el('input');cb.type='checkbox';cb.checked=!!facets[k]?.includes(value);cb.dataset.facet=k;cb.dataset.value=value;l.prepend(cb);
    cb.addEventListener('change',()=>{const values=new Set(this.#facets[k]??[]);if(cb.checked)values.add(value);else values.delete(value);this.#facets={...this.#facets,[k]:[...values]};this.#offset=0;void this.#render();});fieldset.append(l);
   }aside.append(fieldset);}
   this.#button(aside,'Clear filters',()=>{this.#facets={};this.#offset=0;void this.#render();},'clear-filters');
   this.#root.replaceChildren(box);return true;
  }catch{if(!this.#closed&&epoch===this.#epoch)this.#unavailable();return false;}
 }
 async #launch(item:SearchItem,epoch:number){
  const e=this.#engine;if(!e||this.#closed||epoch!==this.#epoch)return;
  // Hide metadata while checking live route authority; router subscription closes this host.
  const box=this.#frame();this.#status(box,'Checking exact route…');this.#root.replaceChildren(box);
  const href=await e.launch(item.source_ref,this.#router,()=>!this.#closed&&epoch===this.#epoch&&e===this.#engine);
  if(!href&&!this.#closed&&epoch===this.#epoch)this.#unavailable();
 }
 close(){if(this.#closed)return;this.#closed=true;this.#epoch++;this.#engine?.close();this.#engine=null;this.#off();this.#state='CLOSED';this.#root.replaceChildren();}
}
