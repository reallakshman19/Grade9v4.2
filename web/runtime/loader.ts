// Public projection loader. Protected assessment and solution data belong to a separate service.
import type { Ref } from './types.ts';
export type LoaderErrorCode = 'MANIFEST_NOT_FOUND'|'DIGEST_MISMATCH'|'STALE_MANIFEST_HASH'|'ITEM_NOT_FOUND'|'MALFORMED_PROJECTION'|'INVALID_REVISION'|'FETCH_FAILED'|'PROTECTED_PROJECTION';
export class LoaderError extends Error {
  readonly code:LoaderErrorCode; readonly detail?:unknown;
  constructor(code: LoaderErrorCode, message: string, detail?: unknown) { super(message+' ('+code+')'); this.name='LoaderError';this.code=code;this.detail=detail; }
}
export interface ReleaseManifest {
  readonly schema_version:'g9-release-projection/1.1';
  readonly release_id:string; readonly target_mode:'DEMO'; readonly demo_banner:true;
  readonly academic_admission:string; readonly production_release:string;
  readonly artifact_scope:'PUBLIC_SAFE_DIAGNOSTIC_ONLY'; readonly learner_release:false;
  readonly release_digest:string;
  readonly projections:{readonly learner_precommit:readonly (Ref & Readonly<Record<string,unknown>>)[];readonly learner_postcommit:readonly unknown[];readonly search_index:readonly unknown[];readonly assessment_contracts:readonly unknown[]};
}
export async function computeSha256(data:string|Uint8Array):Promise<string>{
  const bytes=typeof data==='string'?new TextEncoder().encode(data):new Uint8Array(data);
  return Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',bytes)),b=>b.toString(16).padStart(2,'0')).join('');
}
// Match Python canonical JSON for the public projection's JSON strings, booleans and safe integers.
export function canonicalJson(value:unknown):string {
  if(value===null||typeof value==='string'||typeof value==='boolean')return JSON.stringify(value);
  if(typeof value==='number'&&Number.isFinite(value))return JSON.stringify(value);
  if(Array.isArray(value))return '['+value.map(canonicalJson).join(',')+']';
  if(value&&typeof value==='object')return '{'+Object.keys(value).sort().map(k=>JSON.stringify(k)+':'+canonicalJson((value as Record<string,unknown>)[k])).join(',')+'}';
  throw new LoaderError('MALFORMED_PROJECTION','Non-JSON value');
}
export async function computeManifestContentDigest(manifest:ReleaseManifest):Promise<string>{
  const {release_digest:_,...content}=manifest;return computeSha256(canonicalJson(content));
}
export function sameRef(a:Ref,b:Ref):boolean{return !!a&&!!b&&a.type===b.type&&a.id===b.id&&a.revision===b.revision&&a.sha256===b.sha256;}
const hex=/^[0-9a-f]{64}$/;
function freeze<T>(x:T):T{if(x&&typeof x==='object'){for(const v of Object.values(x))freeze(v);Object.freeze(x);}return x;}
function validRef(x:unknown):x is Ref {
  if(!x||typeof x!=='object')return false;const a=x as Ref;
  return (a.type==='QUESTION'||a.type==='FRESH_TASK')&&typeof a.id==='string'&&a.id.length>0&&Number.isSafeInteger(a.revision)&&a.revision>0&&hex.test(a.sha256);
}
const permitted=new Set(['type','id','revision','sha256','stem','subject_id','demo','asset_refs','response_kind','options','fields','prediction_prompt']);
function validItem(x:unknown):boolean {
  if(!validRef(x))return false;const a=x as Ref & Record<string,unknown>;
  if(Object.keys(a).some(k=>!permitted.has(k))||typeof a.stem!=='string'||typeof a.subject_id!=='string'||a.demo!==true||!Array.isArray(a.asset_refs)||a.asset_refs.length!==0)return false;
  if(a.options!==undefined&&(!Array.isArray(a.options)||a.options.some(v=>!v||typeof v!=='object'||Object.keys(v).sort().join(',')!=='id,text'||typeof v.id!=='string'||typeof v.text!=='string')))return false;
  if(a.fields!==undefined&&(!Array.isArray(a.fields)||a.fields.some(v=>!v||typeof v!=='object'||Object.keys(v).sort().join(',')!=='id,kind,prompt,required'||typeof v.id!=='string'||typeof v.kind!=='string'||typeof v.prompt!=='string'||typeof v.required!=='boolean')))return false;
  return (a.response_kind===undefined||typeof a.response_kind==='string')&&(a.prediction_prompt===undefined||typeof a.prediction_prompt==='string');
}
export class ManifestLoader {
  private readonly cache=new Map<string,ReleaseManifest>();
  private readonly verified=new WeakSet<ReleaseManifest>();
  async loadFromData(rawData:string|Uint8Array,expectedDigest?:string):Promise<ReleaseManifest>{
    let m:ReleaseManifest;
    try {m=JSON.parse(typeof rawData==='string'?rawData:new TextDecoder('utf-8',{fatal:true}).decode(rawData));}catch(e){throw new LoaderError('MALFORMED_PROJECTION','Invalid JSON',e);}
    if(!m||m.schema_version!=='g9-release-projection/1.1'||typeof m.release_id!=='string'||!m.release_id||!hex.test(m.release_digest)||m.target_mode!=='DEMO'||m.demo_banner!==true||m.artifact_scope!=='PUBLIC_SAFE_DIAGNOSTIC_ONLY'||m.learner_release!==false||!m.projections)throw new LoaderError('MALFORMED_PROJECTION','Invalid public projection metadata');
    if(!expectedDigest||!hex.test(expectedDigest)||m.release_digest!==expectedDigest)throw new LoaderError('STALE_MANIFEST_HASH','Trusted digest required and must match');
    if(await computeManifestContentDigest(m)!==expectedDigest)throw new LoaderError('DIGEST_MISMATCH','Manifest content digest differs');
    const p=m.projections;
    if(!Array.isArray(p.learner_precommit)||p.learner_precommit.some(x=>!validItem(x))||new Set(p.learner_precommit.map(x=>x.id)).size!==p.learner_precommit.length||[p.learner_postcommit,p.search_index,p.assessment_contracts].some(x=>!Array.isArray(x)||x.length!==0))throw new LoaderError('PROTECTED_PROJECTION','Unexpected public projection content');
    freeze(m);this.verified.add(m);this.cache.set(m.release_id,m);return m;
  }
  async fetchManifest(url:string,expectedDigest?:string,fetchFn:typeof fetch=globalThis.fetch):Promise<ReleaseManifest>{
    let response:globalThis.Response;try{response=await fetchFn(url);}catch(e){throw new LoaderError('FETCH_FAILED','Network request failed',e);}
    if(!response.ok)throw new LoaderError('MANIFEST_NOT_FOUND','HTTP '+response.status);
    return this.loadFromData(await response.text(),expectedDigest);
  }
  resolveItem<T=unknown>(manifest:ReleaseManifest,ref:Ref,mode:'PRECOMMIT'|'POSTCOMMIT'='PRECOMMIT'):T{
    if(!this.verified.has(manifest))throw new LoaderError('DIGEST_MISMATCH','Unverified manifest');
    if(mode!=='PRECOMMIT')throw new LoaderError('PROTECTED_PROJECTION','Protected content requires a separate authorization service');
    const item=manifest.projections.learner_precommit.find(x=>x.id===ref.id);
    if(!item)throw new LoaderError('ITEM_NOT_FOUND','Unknown item');
    if(item.revision!==ref.revision)throw new LoaderError('INVALID_REVISION','Revision mismatch');
    if(!sameRef(item,ref))throw new LoaderError('DIGEST_MISMATCH','Exact reference mismatch');
    return item as T;
  }
  getCached(releaseId:string):ReleaseManifest|null{return this.cache.get(releaseId)??null;}
  clearCache(releaseId?:string):void{if(releaseId)this.cache.delete(releaseId);else this.cache.clear();}
}
