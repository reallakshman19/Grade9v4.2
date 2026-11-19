// A36 host-mounted personal study pages. No public shell or URL-derived authority.
import type {PersonalStudyStore} from '../runtime/personal-study.ts';
import {Router} from '../app/router.ts';
export type PersonalTab='progress'|'mistakes'|'bookmarks'|'settings';
export const el=<K extends keyof HTMLElementTagNameMap>(tag:K,text?:string)=>{const n=document.createElement(tag);if(text!==undefined)n.textContent=text;return n;};
export interface PersonalContext{store:PersonalStudyStore;box:HTMLElement;action:(run:()=>Promise<unknown>,preserve?:()=>void)=>void;button:(parent:HTMLElement,label:string,run:()=>Promise<unknown>,id?:string)=>HTMLButtonElement;launch:(r:import('../runtime/types.ts').Ref)=>Promise<unknown>}
export type RenderPersonal=(ctx:PersonalContext)=>Promise<void>;
const css='.g9-personal{min-width:0;max-width:100%;overflow-wrap:anywhere;line-height:1.55}.g9-personal *{box-sizing:border-box;min-width:0}.g9-personal .controls{display:flex;gap:8px;flex-wrap:wrap;margin:8px 0}.g9-personal button,.g9-personal select,.g9-personal input,.g9-personal textarea{font:inherit;min-height:48px;min-width:48px;max-width:100%;padding:8px;border:1px solid #63798b;border-radius:6px;white-space:normal;overflow-wrap:anywhere}.g9-personal textarea{width:100%;min-height:96px}.g9-personal label{display:block;margin:8px 0}.g9-personal article{border:1px solid #b8c6d0;border-radius:8px;padding:12px;margin:8px 0}.g9-personal pre{white-space:pre-wrap;overflow-wrap:anywhere;font:inherit}.g9-personal :focus-visible{outline:3px solid #125d82;outline-offset:2px}.g9-personal [data-grid]{display:grid;grid-template-columns:minmax(0,1fr);gap:8px}@media(min-width:1000px){.g9-personal [data-grid]{grid-template-columns:repeat(2,minmax(0,1fr))}}';
export class PersonalPageHost{
 readonly #root:HTMLElement;readonly #store:PersonalStudyStore;readonly #router:Router;readonly #renderers:Readonly<Record<PersonalTab,RenderPersonal>>;#epoch=0;#closed=false;#busy=false;#tab:PersonalTab='progress';#off:()=>void;
 constructor(root:HTMLElement,store:PersonalStudyStore,router:Router,renderers:Readonly<Record<PersonalTab,RenderPersonal>>){this.#root=root;this.#store=store;this.#router=router;this.#renderers=renderers;this.#off=router.subscribe(()=>this.close());}
 async open(tab:PersonalTab='progress'){if(this.#closed||this.#busy||!Object.hasOwn(this.#renderers,tab))return false;this.#tab=tab;return this.#refresh();}
 #frame(){const box=el('main');box.className='g9-personal';box.append(el('style',css),el('h1','Personal study'),el('p','Diagnostic evidence only · Academic admission HOLD · No mastery, competency, or exam-readiness inference'));return box;}
 #hold(message:string){const box=this.#frame(),p=el('p',message);p.setAttribute('role','status');box.append(p);const b=el('button','Reload verified state');b.addEventListener('click',()=>{void this.open(this.#tab);});box.append(b);this.#root.replaceChildren(box);}
 async #refresh(){
  if(this.#closed)return false;const epoch=++this.#epoch;this.#hold('Checking personal evidence…');
  try{
   const p=await this.#store.profile(),box=this.#frame();box.style.fontSize=(p.fontStep/20)+'em';const nav=el('nav');nav.className='controls';nav.setAttribute('aria-label','Personal study sections');box.append(nav);
   for(const tab of ['progress','mistakes','bookmarks','settings'] as const){const b=el('button',tab[0].toUpperCase()+tab.slice(1));b.type='button';b.dataset.tab=tab;b.setAttribute('aria-pressed',String(tab===this.#tab));b.addEventListener('click',()=>{void this.open(tab);});nav.append(b);}
   const action=(run:()=>Promise<unknown>,preserve?:()=>void)=>{void this.#act(epoch,run,preserve);};
   const button=(parent:HTMLElement,label:string,run:()=>Promise<unknown>,id?:string)=>{const b=el('button',label);b.type='button';if(id)b.dataset.action=id;b.addEventListener('click',()=>action(run));parent.append(b);return b;};
   await this.#renderers[this.#tab]({store:this.#store,box,action,button,launch:r=>this.#store.launch(r,this.#router,()=>!this.#closed&&epoch===this.#epoch)});
   await this.#store.assertLive();if(this.#closed||epoch!==this.#epoch)return false;this.#root.replaceChildren(box);return true;
  }catch{if(!this.#closed&&epoch===this.#epoch)this.#hold('Personal evidence unavailable or unauthorized. No unverified progress is displayed.');return false;}
 }
 async #act(epoch:number,run:()=>Promise<unknown>,preserve?:()=>void){
  if(this.#closed||this.#busy||epoch!==this.#epoch)return;this.#busy=true;
  const box=this.#root.querySelector('.g9-personal')!,status=el('p','Checking durable state…');status.setAttribute('role','status');box.append(status);
  for(const n of box.querySelectorAll<HTMLButtonElement|HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement>('button,input,textarea,select'))n.disabled=true;
  try{await run();if(!this.#closed&&epoch===this.#epoch){await this.#refresh();preserve?.();}}
  catch{if(!this.#closed&&epoch===this.#epoch){try{await this.#store.assertLive();status.textContent='Operation not verified. No success claimed. Copy unsaved notes before reloading.';for(const n of box.querySelectorAll<HTMLTextAreaElement>('textarea'))n.disabled=false;const b=el('button','Reload verified state');b.addEventListener('click',()=>{void this.open(this.#tab);});box.append(b);}catch{this.#hold('Personal authorization unavailable.');}}}
  finally{this.#busy=false;}
 }
 close(){if(this.#closed)return;this.#closed=true;this.#epoch++;this.#off();this.#root.replaceChildren();}
}
