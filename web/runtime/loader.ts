// Public projection loader. Protected assessment and solution data belong to a separate service.
import type { Ref } from './types.ts';
import { findDuplicateKeyInJson,isResponseKind } from './response.ts';
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
// Python sorts Unicode scalar values, not UTF-16 code units. Manifest numbers are restricted separately.
function codePointCompare(a:string,b:string):number{const x=Array.from(a),y=Array.from(b);for(let i=0;i<Math.min(x.length,y.length);i++){const d=x[i].codePointAt(0)!-y[i].codePointAt(0)!;if(d)return d;}return x.length-y.length;}
// The generic local canonicalizer is not a general Python decimal wire format.
export function canonicalJson(value:unknown):string {
  if(value===null||typeof value==='string'||typeof value==='boolean')return JSON.stringify(value);
  if(typeof value==='number'&&Number.isFinite(value))return JSON.stringify(value);
  if(Array.isArray(value))return '['+value.map(canonicalJson).join(',')+']';
  if(value&&typeof value==='object')return '{'+Object.keys(value).sort(codePointCompare).map(k=>JSON.stringify(k)+':'+canonicalJson((value as Record<string,unknown>)[k])).join(',')+'}';
  throw new LoaderError('MALFORMED_PROJECTION','Non-JSON value');
}
export async function computeManifestContentDigest(manifest:ReleaseManifest):Promise<string>{
  const {release_digest:_,...content}=manifest;return computeSha256(canonicalJson(content));
}
export function sameRef(a:Ref,b:Ref):boolean{return !!a&&!!b&&a.type===b.type&&a.id===b.id&&a.revision===b.revision&&a.sha256===b.sha256;}
const hex=/^[0-9a-f]{64}$/;
const idPattern=/^[A-Za-z][A-Za-z0-9._:-]{2,127}$/;
function manifestDomain(x:unknown):boolean{if(x===null||typeof x==='boolean')return true;if(typeof x==='string')return !/[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?<![\uD800-\uDBFF])[\uDC00-\uDFFF]/u.test(x);if(typeof x==='number')return Number.isSafeInteger(x)&&!Object.is(x,-0);if(Array.isArray(x))return x.every(manifestDomain);return !!x&&typeof x==='object'&&Object.entries(x).every(([k,v])=>manifestDomain(k)&&manifestDomain(v));}
const envelopeKeys=new Set(['schema_version','release_id','target_mode','demo_banner','academic_admission','production_release','artifact_scope','learner_release','release_digest','projections','ui_freeze','fixture_id','graph_digest','total_objects','search_status','protected_projection_status','visibility_policy']);
function publicEnvelope(m:ReleaseManifest):boolean{const x=m as unknown as Record<string,unknown>;if(Object.keys(x).some(k=>!envelopeKeys.has(k))||m.academic_admission!=='HOLD'||m.production_release!=='NONE')return false;for(const k of ['fixture_id','search_status','protected_projection_status'])if(x[k]!==undefined&&typeof x[k]!=='string')return false;if(x.ui_freeze!==undefined&&x.ui_freeze!=='NOT_GRANTED')return false;if(x.graph_digest!==undefined&&(typeof x.graph_digest!=='string'||!hex.test(x.graph_digest)))return false;if(x.total_objects!==undefined&&(!Number.isSafeInteger(x.total_objects)||Number(x.total_objects)<0))return false;const v=x.visibility_policy;if(v!==undefined){if(!v||typeof v!=='object'||Array.isArray(v))return false;const p=v as Record<string,unknown>;if(Object.keys(p).sort().join(',')!=='capabilities,protected_content_in_static_bundle,runtime_disclosure_service,scope,stages'||p.protected_content_in_static_bundle!==false||p.scope!=='STAGE_CONSTRAINTS_ONLY_NOT_AUTHORIZATION'||p.runtime_disclosure_service!=='NOT_IMPLEMENTED'||!Array.isArray(p.stages)||!p.stages.every(y=>typeof y==='string'&&['PREDICT','ATTEMPT','RECONSTRUCT','DIAGNOSE','REPAIR','BOUNDARY_TEST','COMPLETE'].includes(y))||!Array.isArray(p.capabilities)||!p.capabilities.every(y=>typeof y==='string'&&['VIEW_STIMULUS','EDIT_WORK','MODEL_MANIPULATE','MODEL_AUTO_CALCULATE','H1','H2','H3','REFERENCE_SOLUTION','BOUNDARY_REFERENCE','SOURCE_RETURN','READ_ANCHOR','SHOW_REASONING_CRUX'].includes(y)))return false;}return true;}
function freeze<T>(x:T):T{if(x&&typeof x==='object'){for(const v of Object.values(x))freeze(v);Object.freeze(x);}return x;}
function validRef(x:unknown):x is Ref {
  if(!x||typeof x!=='object')return false;const a=x as Ref;
  return (a.type==='QUESTION'||a.type==='FRESH_TASK')&&typeof a.id==='string'&&idPattern.test(a.id)&&Number.isSafeInteger(a.revision)&&a.revision>0&&typeof a.sha256==='string'&&hex.test(a.sha256);
}
const permitted=new Set(['type','id','revision','sha256','stem','subject_id','demo','asset_refs','response_kind','options','fields','prediction_prompt']);
function validItem(x:unknown):boolean {
  if(!validRef(x))return false;const a=x as Ref & Record<string,unknown>;
  if(Object.keys(a).some(k=>!permitted.has(k))||typeof a.stem!=='string'||!a.stem.trim()||typeof a.subject_id!=='string'||!['PHYSICS','CHEMISTRY','MATHEMATICS'].includes(a.subject_id)||a.demo!==true||!Array.isArray(a.asset_refs)||a.asset_refs.length!==0)return false;
  if(a.options!==undefined&&(!Array.isArray(a.options)||a.options.some(v=>!v||typeof v!=='object'||Object.keys(v).sort().join(',')!=='id,text'||typeof v.id!=='string'||typeof v.text!=='string')))return false;
  if(a.fields!==undefined&&(!Array.isArray(a.fields)||a.fields.some(v=>!v||typeof v!=='object'||Object.keys(v).sort().join(',')!=='id,kind,prompt,required'||typeof v.id!=='string'||typeof v.kind!=='string'||typeof v.prompt!=='string'||typeof v.required!=='boolean')))return false;
  if(Array.isArray(a.options)&&new Set(a.options.map(v=>v.id)).size!==a.options.length||Array.isArray(a.fields)&&new Set(a.fields.map(v=>v.id)).size!==a.fields.length)return false;
  return (a.response_kind===undefined||isResponseKind(a.response_kind))&&(a.prediction_prompt===undefined||typeof a.prediction_prompt==='string');
}
export class ManifestLoader {
  private readonly cache=new Map<string,ReleaseManifest>();
  private readonly verified=new WeakSet<ReleaseManifest>();
  private readonly pins:ReadonlyMap<string,string>;
  // Only the trusted release bootstrap may supply these pins; a caller's hash is not authority.
  constructor(pins:readonly {readonly releaseId:string;readonly digest:string}[]=[]){const map=new Map<string,string>();for(const pin of pins){if(!hex.test(pin.digest)||map.has(pin.releaseId))throw new LoaderError('STALE_MANIFEST_HASH','Invalid or duplicate release pin');map.set(pin.releaseId,pin.digest);}this.pins=map;}
  async loadFromData(rawData:string|Uint8Array,expectedDigest?:string):Promise<ReleaseManifest>{
    let m:ReleaseManifest;
    try {const raw=typeof rawData==='string'?rawData:new TextDecoder('utf-8',{fatal:true}).decode(rawData);if(findDuplicateKeyInJson(raw))throw Error('Duplicate decoded JSON key');m=JSON.parse(raw);}catch(e){throw new LoaderError('MALFORMED_PROJECTION','Invalid JSON',e);}
    if(!m||m.schema_version!=='g9-release-projection/1.1'||typeof m.release_id!=='string'||!m.release_id||!hex.test(m.release_digest)||m.target_mode!=='DEMO'||m.demo_banner!==true||m.artifact_scope!=='PUBLIC_SAFE_DIAGNOSTIC_ONLY'||m.learner_release!==false||!m.projections)throw new LoaderError('MALFORMED_PROJECTION','Invalid public projection metadata');
    if(!manifestDomain(m)||!publicEnvelope(m))throw new LoaderError('MALFORMED_PROJECTION','Unsupported public projection domain or envelope');
    if(!expectedDigest||!hex.test(expectedDigest)||m.release_digest!==expectedDigest||this.pins.get(m.release_id)!==expectedDigest)throw new LoaderError('STALE_MANIFEST_HASH','Trusted digest required and must match');
    if(await computeManifestContentDigest(m)!==expectedDigest)throw new LoaderError('DIGEST_MISMATCH','Manifest content digest differs');
    const p=m.projections;
    if(Object.keys(p).sort().join(',')!=='assessment_contracts,learner_postcommit,learner_precommit,search_index')throw new LoaderError('PROTECTED_PROJECTION','Unknown projection member');
    const cached=this.cache.get(m.release_id);if(cached&&cached.release_digest!==m.release_digest)throw new LoaderError('STALE_MANIFEST_HASH','Conflicting release identity');
    if(!Array.isArray(p.learner_precommit)||p.learner_precommit.some(x=>!validItem(x))||new Set(p.learner_precommit.map(x=>x.id)).size!==p.learner_precommit.length||[p.learner_postcommit,p.search_index,p.assessment_contracts].some(x=>!Array.isArray(x)||x.length!==0))throw new LoaderError('PROTECTED_PROJECTION','Unexpected public projection content');
    freeze(m);this.verified.add(m);this.cache.set(m.release_id,m);return m;
  }
  async fetchManifest(url:string,expectedDigest?:string,fetchFn:typeof fetch=globalThis.fetch):Promise<ReleaseManifest>{
    let response:globalThis.Response;try{response=await fetchFn(url);}catch(e){throw new LoaderError('FETCH_FAILED','Network request failed',e);}
    if(!response.ok)throw new LoaderError('MANIFEST_NOT_FOUND','HTTP '+response.status);
    return this.loadFromData(await response.text(),expectedDigest);
  }
  resolveItem<T=unknown>(manifest:ReleaseManifest,ref:Ref,mode:'PRECOMMIT'|'POSTCOMMIT'='PRECOMMIT',expectedReleaseId?:string):T{
    if(!expectedReleaseId||expectedReleaseId!==manifest.release_id||this.cache.get(expectedReleaseId)!==manifest||!this.verified.has(manifest))throw new LoaderError('DIGEST_MISMATCH','Unverified manifest');
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
