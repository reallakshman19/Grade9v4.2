// A35: exact browser verification of A34's pinned 1.1 search artifact.
// The trusted bootstrap supplies all three pins, authenticated live authorization,
// and shard transport. Never expose this factory to learner-controlled pin inputs.
import {ManifestLoader,canonicalJson,computeSha256,sameRef,type ReleaseManifest} from './loader.ts';
import {findDuplicateKeyInJson} from './response.ts';
import type {Ref} from './types.ts';
import {Router} from '../app/router.ts';
import {BOOST,FACETS,normalizeQuery,safeText,stringList,validateQuery,type SearchItem,type Facet,type QueryRequest,type RankedIds} from './search-model.ts';
export type {SearchItem,SearchFacets,QueryRequest} from './search-model.ts';
export {normalizeQuery,tokenize} from './search-model.ts';
const hex=/^[0-9a-f]{64}$/,id=/^[A-Za-z][A-Za-z0-9._:-]{2,127}$/,subjects=['PHYSICS','CHEMISTRY','MATHEMATICS'];
const keys=(x:unknown,k:readonly string[]):x is Record<string,unknown>=>!!x&&typeof x==='object'&&!Array.isArray(x)&&Object.keys(x).sort().join(',')===[...k].sort().join(',');
const digest=(x:unknown):x is string=>typeof x==='string'&&hex.test(x);
const stable=(x:unknown):x is string=>typeof x==='string'&&id.test(x);
const count=(x:unknown):x is number=>Number.isSafeInteger(x)&&Number(x)>=0&&Number(x)<=10000;
const ref=(x:unknown):x is Ref<'QUESTION'>=>keys(x,['type','id','revision','sha256'])&&x.type==='QUESTION'&&stable(x.id)&&Number.isSafeInteger(x.revision)&&Number(x.revision)>0&&digest(x.sha256);
const eq=(a:unknown,b:unknown)=>canonicalJson(a)===canonicalJson(b);
const requireThat=(v:unknown,code:string)=>{if(!v)throw Error(code);};
function parse(raw:string|Uint8Array,max=20000000):unknown{
 const s=typeof raw==='string'?raw:new TextDecoder('utf-8',{fatal:true}).decode(raw);
 if(s.length>max||findDuplicateKeyInJson(s))throw Error('INVALID_SEARCH_BYTES');return JSON.parse(s);
}
function domain(x:unknown):boolean{
 if(x===null||typeof x==='boolean')return true;
 if(typeof x==='string')return !/[\p{Cs}]/u.test(x);
 if(typeof x==='number')return Number.isSafeInteger(x)&&!Object.is(x,-0);
 if(Array.isArray(x))return x.every(domain);
 return !!x&&typeof x==='object'&&Object.entries(x).every(([k,v])=>domain(k)&&domain(v));
}
export interface SearchPins{readonly learnerId:string;readonly releaseId:string;readonly releaseDigest:string;readonly catalogDigest:string;readonly manifestDigest:string}
export type SearchLive=(scope:SearchPins)=>Promise<boolean>;
export interface ShardMeta{readonly shard_id:string;readonly subject_id:string;readonly item_count:number;readonly sha256:string}
export type ShardLoader=(meta:ShardMeta)=>Promise<string|Uint8Array>;
interface SearchManifest{readonly schema_version:'g9-search-index/1.1';readonly release_id:string;readonly release_digest:string;readonly catalog_digest:string;readonly manifest_digest:string;readonly target_mode:'DEMO';readonly demo_banner:true;readonly learner_release:false;readonly artifact_scope:'PUBLIC_SAFE_DIAGNOSTIC_ONLY';readonly academic_admission:'HOLD';readonly production_release:'NONE';readonly total_items:number;readonly boost_rules:typeof BOOST;readonly normalization:'UNICODE_NFKC_CASEFOLD';readonly shards:readonly ShardMeta[]}
export interface SearchOpen{readonly pins:SearchPins;readonly releaseLoader:ManifestLoader;readonly release:ReleaseManifest;readonly manifestBytes:string|Uint8Array;readonly loadShard:ShardLoader;readonly live:SearchLive}
const manifestKeys=['schema_version','release_id','release_digest','catalog_digest','manifest_digest','target_mode','demo_banner','learner_release','artifact_scope','academic_admission','production_release','total_items','boost_rules','normalization','shards'];
const rowKeys=['id','revision','source_ref','releaseId','route','kind','subjectIds','title','summary','reviewedTerms','programmeIds','editionIds','conceptIds','publicFacets'];
function validateRow(raw:unknown,m:SearchManifest,meta:ShardMeta,loader:ManifestLoader,release:ReleaseManifest):SearchItem{
 if(!keys(raw,rowKeys)||!ref(raw.source_ref)||raw.id!==raw.source_ref.id||raw.revision!==raw.source_ref.revision||raw.releaseId!==m.release_id||raw.kind!=='QUESTION'||raw.route!=='/question/'+encodeURIComponent(raw.source_ref.id)||!eq(raw.subjectIds,[meta.subject_id])||!safeText(raw.title)||!safeText(raw.summary,2000)||!stringList(raw.reviewedTerms,safeText)||!stringList(raw.programmeIds,stable)||!stringList(raw.editionIds,stable)||!stringList(raw.conceptIds,stable))throw Error('INVALID_SEARCH_ITEM');
 const actual=loader.resolveItem<{subject_id:string}>(release,raw.source_ref,'PRECOMMIT',m.release_id);
 if(actual.subject_id!==meta.subject_id||!keys(raw.publicFacets,FACETS)||!eq(raw.publicFacets,{subject:[meta.subject_id],kind:['QUESTION'],programme:raw.programmeIds,edition:raw.editionIds,concept:raw.conceptIds}))throw Error('SEARCH_FACET_BINDING');
 return structuredClone(raw) as unknown as SearchItem;
}
export class VerifiedSearchIndex{
 readonly #pins:SearchPins;readonly #loader:ManifestLoader;readonly #release:ReleaseManifest;readonly #live:SearchLive;
 readonly #rows:ReadonlyMap<string,SearchItem>;
 private constructor(o:SearchOpen,rows:readonly SearchItem[]){this.#pins=structuredClone(o.pins);this.#loader=o.releaseLoader;this.#release=o.release;this.#live=o.live;this.#rows=new Map(rows.map(v=>[v.id,structuredClone(v)]));}
 static async open(input:SearchOpen){
  const o={...input,pins:structuredClone(input.pins),manifestBytes:typeof input.manifestBytes==='string'?input.manifestBytes:Uint8Array.from(input.manifestBytes)},p=o.pins;
  requireThat(safeText(p.learnerId,256)&&stable(p.releaseId)&&[p.releaseDigest,p.catalogDigest,p.manifestDigest].every(digest)&&o.releaseLoader.getCached(p.releaseId)===o.release&&o.release.release_digest===p.releaseDigest&&o.release.release_id===p.releaseId&&o.release.learner_release===false&&o.release.academic_admission==='HOLD','TRUSTED_SEARCH_SCOPE_REQUIRED');
  requireThat(await o.live(structuredClone(p))===true,'SEARCH_AUTHORITY_REQUIRED');
  const raw=parse(o.manifestBytes);
  if(!keys(raw,manifestKeys)||!domain(raw))throw Error('INVALID_SEARCH_MANIFEST');
  const m=raw as unknown as SearchManifest,{manifest_digest,...body}=m;
  if(manifest_digest!==p.manifestDigest||await computeSha256(canonicalJson(body))!==p.manifestDigest)throw Error('N26_MANIFEST_PIN_MISMATCH');
  if(m.schema_version!=='g9-search-index/1.1'||m.release_id!==p.releaseId||m.release_digest!==p.releaseDigest||m.catalog_digest!==p.catalogDigest||m.target_mode!=='DEMO'||m.demo_banner!==true||m.learner_release!==false||m.artifact_scope!=='PUBLIC_SAFE_DIAGNOSTIC_ONLY'||m.academic_admission!=='HOLD'||m.production_release!=='NONE'||m.normalization!=='UNICODE_NFKC_CASEFOLD'||!eq(m.boost_rules,BOOST)||!count(m.total_items)||!Array.isArray(m.shards)||m.shards.length>3)throw Error('N26_SEARCH_SCOPE_MISMATCH');
  const seenShards=new Set<string>(),seenIds=new Set<string>(),rows:SearchItem[]=[];
  for(const meta of m.shards){
   if(!keys(meta,['shard_id','subject_id','item_count','sha256'])||!subjects.includes(meta.subject_id)||meta.shard_id!=='shard-'+meta.subject_id.toLowerCase()||seenShards.has(meta.shard_id)||!count(meta.item_count)||meta.item_count===0||!digest(meta.sha256))throw Error('INVALID_SEARCH_SHARD_META');
   seenShards.add(meta.shard_id);
  }
  // Complete verification is atomic: never expose partial results from good shards
  // while another required shard is corrupt, missing, or from a different release.
  if(m.shards.reduce((n,s)=>n+s.item_count,0)!==m.total_items)throw Error('N26_TOTAL_MISMATCH');
  for(const meta of m.shards){
   if(await o.live(structuredClone(p))!==true)throw Error('SEARCH_AUTHORITY_REQUIRED');
   const payload=parse(await o.loadShard(structuredClone(meta)));
   if(!keys(payload,['shard_id','release_id','release_digest','catalog_digest','item_count','items'])||!domain(payload)||payload.shard_id!==meta.shard_id||payload.release_id!==p.releaseId||payload.release_digest!==p.releaseDigest||payload.catalog_digest!==p.catalogDigest||payload.item_count!==meta.item_count||!Array.isArray(payload.items)||payload.items.length!==meta.item_count||await computeSha256(canonicalJson(payload))!==meta.sha256)throw Error('N26_STALE_OR_CORRUPT_SHARD');
   for(const raw of payload.items){const r=validateRow(raw,m,meta,o.releaseLoader,o.release);if(seenIds.has(r.id))throw Error('DUPLICATE_SEARCH_ITEM');seenIds.add(r.id);rows.push(r);}
  }
  const verified=new VerifiedSearchIndex(o,rows);await verified.assertLive();return verified;
 }
 async assertLive(){if(this.#loader.getCached(this.#pins.releaseId)!==this.#release||await this.#live(structuredClone(this.#pins))!==true)throw Error('SEARCH_AUTHORITY_REQUIRED');}
 async snapshot(){await this.assertLive();return [...this.#rows.values()].map(v=>structuredClone(v));}
 async facets(){
  await this.assertLive();
  return Object.fromEntries(FACETS.map(k=>[k,[...new Set([...this.#rows.values()].flatMap(r=>r.publicFacets[k]))].sort()])) as Record<Facet,string[]>;
 }
 async materialize(ranked:RankedIds,request:QueryRequest){
  await this.assertLive();const q=validateQuery(request);
  if(!ranked||!Array.isArray(ranked.results)||ranked.results.length>q.limit||!Number.isSafeInteger(ranked.totalMatches)||ranked.totalMatches<ranked.results.length||ranked.totalMatches>this.#rows.size||ranked.suggestion!==null&&!safeText(ranked.suggestion,40))throw Error('INVALID_WORKER_RESULT');
  const ids=new Set<string>(),results=ranked.results.map(r=>{
   const item=this.#rows.get(r.id);if(!item||ids.has(r.id)||!Number.isSafeInteger(r.score)||r.score<0||FACETS.some(k=>q.facets[k]?.length&&!q.facets[k]!.some(v=>item.publicFacets[k].includes(v))))throw Error('INVALID_WORKER_RESULT');
   ids.add(r.id);return {item:structuredClone(item),score:r.score};
  });
  await this.assertLive();return {results,totalMatches:ranked.totalMatches,suggestion:ranked.suggestion};
 }
 async launch(target:Ref<'QUESTION'>,router:Router){
  const r=structuredClone(target);await this.assertLive();if(!ref(r))return null;
  const item=this.#rows.get(r.id);if(!item||!sameRef(item.source_ref,r))return null;
  this.#loader.resolveItem(this.#release,r,'PRECOMMIT',this.#pins.releaseId);
  const href=router.toHref(item.route),m=router.match(href);
  if(m.type!=='QUESTION'||m.params.questionId!==r.id||Object.keys(m.query).length||m.hash)return null;
  await this.assertLive();router.navigate(href);return href;
 }
}
type WorkerReply={id:number;ok:true;result?:RankedIds}|{id:number;ok:false};
export class SearchEngine{
 readonly #index:VerifiedSearchIndex;readonly #worker:Worker;#id=0;#closed=false;
 readonly #pending=new Map<number,{resolve:(r:WorkerReply)=>void;reject:(e:Error)=>void;timer:ReturnType<typeof setTimeout>}>();
 private constructor(index:VerifiedSearchIndex){
  this.#index=index;this.#worker=new Worker(new URL('./search-worker.ts',import.meta.url),{type:'module'});
  this.#worker.addEventListener('message',(e:MessageEvent<WorkerReply>)=>{const r=e.data,p=r&&this.#pending.get(r.id);if(!p)return;this.#pending.delete(r.id);clearTimeout(p.timer);if(r.ok===true)p.resolve(r);else p.reject(Error('SEARCH_WORKER_REJECTED'));});
  this.#worker.addEventListener('error',()=>this.close());this.#worker.addEventListener('messageerror',()=>this.close());
 }
 static async open(o:SearchOpen){
  const index=await VerifiedSearchIndex.open(o),engine=new SearchEngine(index);
  try{await engine.#send({type:'INIT',items:await index.snapshot()});await index.assertLive();return engine;}catch(e){engine.close();throw e;}
 }
 #send(message:object):Promise<WorkerReply>{
  if(this.#closed)return Promise.reject(Error('SEARCH_WORKER_CLOSED'));
  return new Promise((resolve,reject)=>{const id=++this.#id;const timer=setTimeout(()=>{this.#pending.delete(id);reject(Error('SEARCH_WORKER_TIMEOUT'));this.close();},10000);this.#pending.set(id,{resolve,reject,timer});try{this.#worker.postMessage({...message,id});}catch{this.close();}});
 }
 async query(raw:QueryRequest){const q=validateQuery(raw);try{await this.#index.assertLive();const r=await this.#send({type:'QUERY',query:q});if(!r.ok||!r.result||this.#closed)throw Error('SEARCH_WORKER_REJECTED');const result=await this.#index.materialize(r.result,q);if(this.#closed)throw Error('SEARCH_WORKER_CLOSED');return result;}catch(e){this.close();throw e;}}
 async facets(){if(this.#closed)throw Error('SEARCH_WORKER_CLOSED');return this.#index.facets();}
 async launch(ref:Ref<'QUESTION'>,router:Router){if(this.#closed)return null;try{return await this.#index.launch(ref,router);}catch{this.close();return null;}}
 close(){if(this.#closed)return;this.#closed=true;this.#worker.terminate();for(const p of this.#pending.values()){clearTimeout(p.timer);p.reject(Error('SEARCH_WORKER_CLOSED'));}this.#pending.clear();}
}
