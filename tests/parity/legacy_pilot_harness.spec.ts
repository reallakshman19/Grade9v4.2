// Exact Git-byte custody, not an owner-local archive or release authorization.
import {execFileSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import {readFileSync} from 'node:fs';
import {resolve,join} from 'node:path';
import assert from 'node:assert/strict';
import {chromium,type BrowserContext} from 'playwright-core';
export const commit='8a02a8eb23ea37a7d8acb74d1bc193dd17657e5b',tree='c00cd1dc4ce65d5e8602de133d07e30a4934ad6a';
export const paths={
 motion:'public/standalone/practice/physics-motion-in-a-plane-interactive-suite.html',
 redox:'public/chemistry/redox/explorers/redox_reactions/adaptive-hard-concept-proof.html',
 circles:'standalone/core2-mathematics-circles-grade9-master.html',
 motionPackage:'public/portable-workbench/packages/portable-motion-shared-clock.json',
 redoxPackage:'public/portable-workbench/packages/portable-redox-electron-equivalence.json',
 host:'public/portable-workbench/portable-host.mjs',
 runtime:'public/portable-workbench/runtime.mjs'
} as const;
const pins:Record<string,string>={
 [paths.motion]:'53c9072865945170568b5e4c55af114eca958920',[paths.redox]:'f173e1f8f93bc534135174a8d5769cd494f3dbc7',
 [paths.circles]:'ffdedb8c28d0285a5caf6307e2ca057406ca74e0',[paths.motionPackage]:'df9eff909bbca06457ce876dff20446a788f16b0',
 [paths.redoxPackage]:'30cb6104d193f65596e6db43948334ac7cb9e259',[paths.host]:'66d35256de777e8f1c1b450229018048dbb939e5',
 [paths.runtime]:'acc009580e76d092d3b92a7e34b1f576310049f4'
};
export function source(){
 const root=process.env.G9_A69_SOURCE_ROOT;if(!root)throw Error('Exact v3.5 source checkout required');
 const git=(...args:string[])=>execFileSync('git',['--no-replace-objects','-C',root,...args],{maxBuffer:20*1024*1024});
 assert(git('rev-parse','HEAD').toString().trim()===commit,'source commit mismatch');
 assert(git('rev-parse','HEAD^{tree}').toString().trim()===tree,'source tree mismatch');
 assert(!git('status','--porcelain','--untracked-files=no').toString().trim(),'source checkout changed');
 function read(path:string){
  assert(/^[A-Za-z0-9_./-]+$/.test(path)&&!path.split('/').includes('..'),'invalid source path');
  const blob=git('rev-parse',commit+':'+path).toString().trim();if(pins[path])assert(blob===pins[path],'source pin mismatch');
  const raw=git('cat-file','blob',blob);
  assert(createHash('sha1').update('blob '+raw.length+'\0').update(raw).digest('hex')===blob,'blob bytes mismatch');
  return raw;
 }
 function verifiedFile(path:string){const file=resolve(root,path);assert(read(path).equals(readFileSync(file)),'checkout byte mismatch');return file;}
 return {read,verifiedFile,root};
}
const origin='http://a69-legacy.invalid';
const allowedAsset=(p:string)=>/^public\/vendor\/katex\/0\.16\.8\/(?:katex\.min\.(?:js|css)|contrib\/auto-render\.min\.js|fonts\/[A-Za-z0-9_.-]+\.(?:woff2?|ttf))$/.test(p)||p==='public/css/tablet-12-7.css';
export async function legacyPage(entry:string){
 const s=source(),html=s.read(entry),browser=await chromium.launch({headless:true,args:['--disable-background-networking']});
 const context=await browser.newContext({viewport:{width:1366,height:854},serviceWorkers:'block',acceptDownloads:false});
 const blocked:string[]=[],served=new Set<string>();
 const cache=new Map<string,Buffer>([[entry,html]]);
 // Only exact pinned entry and its local styles/fonts/scripts. No target origin,
 // cookies, credentials, target database, server, learner host or remote fetch.
 await context.route('**/*',async route=>{
  const u=new URL(route.request().url()),p=u.pathname.slice(1);
  if(u.origin!==origin||u.search||!(p===entry||allowedAsset(p))){blocked.push(route.request().resourceType());await route.abort();return;}
  try{
   const raw=cache.get(p)??s.read(p);cache.set(p,raw);served.add(p);
   const type=p.endsWith('.html')?'text/html; charset=utf-8':p.endsWith('.js')?'text/javascript':p.endsWith('.css')?'text/css':p.endsWith('.woff2')?'font/woff2':p.endsWith('.woff')?'font/woff':'font/ttf';
   await route.fulfill({status:200,contentType:type,body:raw,headers:{'cache-control':'no-store','content-security-policy':"default-src 'none'; script-src 'self' 'unsafe-inline' data:; style-src 'self' 'unsafe-inline' data:; font-src 'self' data:; img-src 'self' data:; connect-src 'none'; frame-src 'none'; form-action 'none'; object-src 'none'; base-uri 'none'"}});
  }catch{await route.abort();}
 });
 const page=await context.newPage();await page.goto(origin+'/'+entry,{waitUntil:'domcontentloaded'});
 return {page,context,blocked,served,close:async()=>{await context.close();await browser.close();}};
}
export async function measure(page:Awaited<ReturnType<typeof legacyPage>>['page'],selector:string){
 let observations=0,small=0,overflow=0;
 for(const [width,height] of [[1366,854],[854,1366],[1000,1600],[1600,1000],[800,1280],[1280,800],[390,844]]){
  await page.setViewportSize({width,height});
  const r=await page.evaluate(sel=>{const nodes=[...document.querySelectorAll(sel)].map(n=>n.getBoundingClientRect()).filter(r=>r.width>0&&r.height>0);return {count:nodes.length,small:nodes.filter(r=>r.width<48||r.height<48).length,overflow:document.documentElement.scrollWidth>innerWidth};},selector);
  assert(r.count>0,'no visible controls');observations+=r.count;small+=r.small;overflow+=Number(r.overflow);
 }
 return {viewports:7,observations,below48:small,overflowViewports:overflow};
}
export function report(pilot:string,value:Record<string,unknown>){console.log('A69 '+pilot+' '+JSON.stringify(value));}
