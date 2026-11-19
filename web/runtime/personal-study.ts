// A36: personal evidence and preferences, host-only composition.
// Driver must be a dedicated authenticated learner's database, not a shared
// browser-wide store. The host supplies a separately trusted scope pin and
// live authorization; local hashes and imported archives are not authority.
import {DefaultCognitiveStore,COGNITIVE_EXPORT_VERSION,type JourneyMeta} from './cognitive-store.ts';
import {DefaultProgressStore,refOk,validateBundleData,type ExportDataPayload} from './progress.ts';
import {IndexedDBStorageDriver,MemoryStorageDriver,StorageError,type StorageDriver} from './storage.ts';
import {ManifestLoader,canonicalJson,computeSha256,sameRef,type ReleaseManifest} from './loader.ts';
import {findDuplicateKeyInJson} from './response.ts';
import {Router} from '../app/router.ts';
import type {Attempt,Checkpoint,CognitiveEvent,JourneyKey,Ref,Session} from './types.ts';
export interface PersonalScope{
 readonly schema:'g9-a36-scope/1';readonly learnerId:string;readonly releaseId:string;readonly releaseDigest:string;
 readonly sessions:readonly {readonly id:string;readonly releaseId:string;readonly item:Ref}[];
 readonly journeys:readonly JourneyKey[];
 readonly bookmarks:readonly {readonly ref:Ref<'QUESTION'>;readonly title:string;readonly review:Ref<'APPROVAL'>}[];
 readonly allowRestore:boolean;
}
export type PersonalLive=(scope:{learnerId:string;releaseId:string;scopeDigest:string})=>Promise<boolean>;
export interface Bookmark{readonly id:string;readonly target:Ref<'QUESTION'>;readonly title:string;readonly notes:string;readonly savedAt:string}
export interface PersonalProfile{readonly schema:'g9-a36-profile/1';readonly learnerId:string;readonly revision:number;readonly fontStep:number;readonly bookmarks:readonly Bookmark[]}
export type EvidenceCategory='FIRST_ATTEMPT'|'ASSISTED'|'REPAIR'|'BOUNDARY_CHECK'|'ORDINARY_ATTEMPT'|'HISTORICAL_UNVERIFIED';
export interface ProgressRow{readonly id:string;readonly ref:Ref;readonly releaseId:string;readonly category:EvidenceCategory;readonly at:string;readonly status:string;readonly available:boolean}
export interface MistakeRow{readonly id:string;readonly ref:Ref;readonly releaseId:string;readonly at:string;readonly reason:string;readonly response:Attempt['response']|null;readonly diagnosis:string|null;readonly repairRecorded:boolean;readonly available:boolean}
type Archive={schema_version:string;checksum:string;data:{progress:ExportDataPayload;journeys:readonly {meta:JourneyMeta;checkpoint:Checkpoint;events:readonly {event:CognitiveEvent;workDigests:readonly string[];attempt:{id:string;sha256:string}|null}[]}[]}};
const STORE='personal_a36',KEY='profile',PROBE='personal_a36_probe';
const eq=(a:unknown,b:unknown)=>canonicalJson(a)===canonicalJson(b);
const hex=(s:unknown)=>typeof s==='string'&&/^[a-f0-9]{64}$/.test(s);
const text=(s:unknown,n=1000):s is string=>typeof s==='string'&&s.length<=n&&!!s.trim()&&!/[\p{Cs}]/u.test(s);
const exact=(v:unknown,keys:readonly string[]):boolean=>!!v&&typeof v==='object'&&!Array.isArray(v)&&Object.keys(v).sort().join(',')===[...keys].sort().join(',');
const check=(v:unknown,code:string)=>{if(!v)throw Error(code);};
const unique=(v:readonly string[])=>new Set(v).size===v.length;
const refKey=(r:Ref)=>canonicalJson(r);
const failureCodes=new Set(['INCORRECT_CHOICE','INCORRECT_SET','INCORRECT_INTEGER','OUT_OF_TOLERANCE','DIMENSION_MISMATCH']);
const initial=(learnerId:string):PersonalProfile=>({schema:'g9-a36-profile/1',learnerId,revision:0,fontStep:20,bookmarks:[]});
function profileOk(p:PersonalProfile,learner:string){
 return exact(p,['schema','learnerId','revision','fontStep','bookmarks'])&&p.schema==='g9-a36-profile/1'&&p.learnerId===learner&&Number.isSafeInteger(p.revision)&&p.revision>=0&&Number.isInteger(p.fontStep)&&p.fontStep>=17&&p.fontStep<=30&&Array.isArray(p.bookmarks)&&p.bookmarks.length<=1000&&unique(p.bookmarks.map(b=>b.id))&&unique(p.bookmarks.map(b=>refKey(b.target)))&&p.bookmarks.every(b=>exact(b,['id','target','title','notes','savedAt'])&&text(b.id,128)&&refOk(b.target)&&b.target.type==='QUESTION'&&text(b.title)&&typeof b.notes==='string'&&b.notes.length<=10000&&!/[\p{Cs}]/u.test(b.notes)&&typeof b.savedAt==='string'&&Number.isFinite(Date.parse(b.savedAt)));
}
async function parseArchive(blob:Blob):Promise<Archive>{
 check(blob.size<=50_000_000,'BACKUP_TOO_LARGE');const raw=await blob.text();check(!findDuplicateKeyInJson(raw),'DUPLICATE_BACKUP_KEY');
 const a=JSON.parse(raw) as Archive;
 check(exact(a,['schema_version','checksum','data'])&&a.schema_version===COGNITIVE_EXPORT_VERSION&&exact(a.data,['progress','journeys'])&&Array.isArray(a.data.journeys)&&hex(a.checksum)&&await computeSha256(canonicalJson(a.data))===a.checksum,'INVALID_COGNITIVE_BACKUP');
 validateBundleData(a.data.progress);return a;
}
export class PersonalStudyStore{
 readonly #scope:PersonalScope;readonly #pin:string;readonly #driver:StorageDriver;readonly #progress:DefaultProgressStore;readonly #cognitive:DefaultCognitiveStore;readonly #loader:ManifestLoader;readonly #release:ReleaseManifest;readonly #live:PersonalLive;
 private constructor(s:PersonalScope,pin:string,driver:StorageDriver,progress:DefaultProgressStore,loader:ManifestLoader,release:ReleaseManifest,live:PersonalLive){this.#scope=s;this.#pin=pin;this.#driver=driver;this.#progress=progress;this.#cognitive=new DefaultCognitiveStore(driver,progress);this.#loader=loader;this.#release=release;this.#live=live;}
 static async open(raw:PersonalScope,pin:string,driver:StorageDriver,progress:DefaultProgressStore,loader:ManifestLoader,release:ReleaseManifest,live:PersonalLive){
  const s=structuredClone(raw);
  check(hex(pin)&&await computeSha256(canonicalJson(s))===pin,'PERSONAL_SCOPE_PIN_MISMATCH');
  check(exact(s,['schema','learnerId','releaseId','releaseDigest','sessions','journeys','bookmarks','allowRestore'])&&s.schema==='g9-a36-scope/1'&&text(s.learnerId,256)&&s.releaseId===release.release_id&&s.releaseDigest===release.release_digest&&loader.getCached(s.releaseId)===release&&release.learner_release===false&&release.academic_admission==='HOLD'&&typeof s.allowRestore==='boolean'&&Array.isArray(s.sessions)&&Array.isArray(s.journeys)&&Array.isArray(s.bookmarks),'INVALID_PERSONAL_SCOPE');
  check(s.sessions.length<=10000&&unique(s.sessions.map(v=>v.id))&&s.sessions.every(v=>exact(v,['id','releaseId','item'])&&text(v.id,256)&&text(v.releaseId,256)&&refOk(v.item))&&unique(s.journeys.map(v=>v.journeyId))&&unique(s.journeys.map(v=>v.taskInstanceId))&&s.journeys.every(v=>exact(v,['journeyId','taskInstanceId','task','releaseId'])&&text(v.journeyId,256)&&text(v.taskInstanceId,256)&&text(v.releaseId,256)&&refOk(v.task)&&['QUESTION','FRESH_TASK'].includes(v.task.type)),'INVALID_EVIDENCE_SCOPE');
  check(unique(s.bookmarks.map(v=>refKey(v.ref)))&&s.bookmarks.every(v=>exact(v,['ref','title','review'])&&refOk(v.ref)&&v.ref.type==='QUESTION'&&text(v.title)&&refOk(v.review)&&v.review.type==='APPROVAL'),'INVALID_BOOKMARK_SCOPE');
  for(const b of s.bookmarks)loader.resolveItem(release,b.ref,'PRECOMMIT',s.releaseId);
  const store=new PersonalStudyStore(s,pin,driver,progress,loader,release,live);await store.assertLive();return store;
 }
 async assertLive(){if(this.#loader.getCached(this.#scope.releaseId)!==this.#release||await this.#live({learnerId:this.#scope.learnerId,releaseId:this.#scope.releaseId,scopeDigest:this.#pin})!==true||this.#loader.getCached(this.#scope.releaseId)!==this.#release)throw Error('PERSONAL_AUTHORITY_REQUIRED');}
 #available(r:Ref,releaseId=this.#scope.releaseId){return releaseId===this.#scope.releaseId&&this.#scope.bookmarks.some(b=>sameRef(b.ref,r));}
 #checkArchive(a:Archive){
  const s=this.#scope;
  check(a.data.progress.sessions.every(v=>s.sessions.some(b=>b.id===v.id&&b.releaseId===v.releaseId&&sameRef(b.item,v.item)))&&a.data.journeys.every(v=>s.journeys.some(j=>eq(j,v.meta.journey))),'FOREIGN_ARCHIVE_SCOPE');
 }
 async #archive(){
  await this.assertLive();const blob=await this.#cognitive.exportAll(),a=await parseArchive(blob);this.#checkArchive(a);await this.assertLive();return {blob,a};
 }
 async evidence(){
  const {a}=await this.#archive(),rows:ProgressRow[]=[],mistakes:MistakeRow[]=[];
  const attempts=new Map(a.data.progress.attempts.map(v=>[v.id,v])),liveIds=new Set<string>(),seen=new Set<string>();
  const add=(att:Attempt,cat:EvidenceCategory,qualified:boolean,diagnosis:string|null=null,repair=false)=>{
   const available=this.#available(att.item,att.releaseId);
   rows.push({id:att.id,ref:structuredClone(att.item),releaseId:att.releaseId,category:cat,at:att.submittedAt,status:qualified?att.grade.status:'HISTORICAL_UNVERIFIED',available});
   if(qualified){
    const grades=[att.grade,...Object.values(att.grade.parts??{})],reason=grades.find(g=>g.status==='SCORED'&&g.points<g.maxPoints&&failureCodes.has(g.reasonCode))?.reasonCode;
    // A diagnosis is the learner's recorded selection, not a verified cause.
    if(reason||diagnosis!==null)mistakes.push({id:att.id,ref:structuredClone(att.item),releaseId:att.releaseId,at:att.submittedAt,reason:reason??'LEARNER_RECORDED_DIAGNOSIS',response:structuredClone(att.response),diagnosis,repairRecorded:repair,available});
   }
  };
  for(const j of a.data.journeys){
   if(j.meta.imported)continue;
   const e=await this.#cognitive.readForDisclosure(j.meta.journey,j.checkpoint);
   const first=e.events.find(v=>v.event_type==='FIRST_COMMITTED'),boundary=e.events.find(v=>v.event_type==='BOUNDARY_COMMITTED'),diag=e.events.find(v=>v.event_type==='DIAGNOSIS_COMMITTED'),repair=e.events.find(v=>v.event_type==='REPAIR_COMMITTED');
   if(first){const att=e.attempts[0];check(att&&eq(attempts.get(att.id),att),'EVIDENCE_CHANGED');liveIds.add(att.id);seen.add(att.id);add(att,first.payload.help_event_ids.length?'ASSISTED':'FIRST_ATTEMPT',true,diag?.payload.move_id??null,!!repair);}
   if(repair&&first){rows.push({id:repair.event_id,ref:structuredClone(j.meta.journey.task),releaseId:j.meta.journey.releaseId,category:'REPAIR',at:repair.at,status:'REPAIR_RECORDED_NOT_CORRECTNESS',available:this.#available(j.meta.journey.task,j.meta.journey.releaseId)});}
   if(boundary){const att=e.attempts[1];check(att&&eq(attempts.get(att.id),att),'EVIDENCE_CHANGED');liveIds.add(att.id);seen.add(att.id);add(att,'BOUNDARY_CHECK',true);}
  }
  for(const att of attempts.values()){
   if(seen.has(att.id))continue;
   const verified=att.cognitive===null?await this.#progress.committedAttempt(att.sessionId,att.id):null;
   if(verified){check(eq(verified,att),'EVIDENCE_CHANGED');add(att,'ORDINARY_ATTEMPT',true);}
   else add(att,'HISTORICAL_UNVERIFIED',false);
  }
  await this.assertLive();const order=(x:{at:string;id:string},y:{at:string;id:string})=>y.at.localeCompare(x.at)||x.id.localeCompare(y.id);
  return {rows:rows.sort(order),mistakes:mistakes.sort(order),academicAdmission:'HOLD' as const};
 }
 async profile(){
  await this.assertLive();const p=await this.#driver.get<PersonalProfile>(STORE,KEY)??initial(this.#scope.learnerId);check(profileOk(p,this.#scope.learnerId),'INVALID_PERSONAL_PROFILE');await this.assertLive();return structuredClone(p);
 }
 async #update(revision:number,edit:(p:PersonalProfile)=>PersonalProfile){
  await this.assertLive();const saved=await this.#driver.transaction([STORE],'readwrite',async tx=>{
   const p=await tx.get<PersonalProfile>(STORE,KEY)??initial(this.#scope.learnerId);
   check(profileOk(p,this.#scope.learnerId)&&p.revision===revision&&revision<Number.MAX_SAFE_INTEGER,'STALE_PERSONAL_REVISION');
   const n={...edit(p),revision:revision+1};check(profileOk(n,this.#scope.learnerId),'INVALID_PERSONAL_UPDATE');
   // No external live callback inside storage transaction (may itself read this driver).
   await tx.put(STORE,KEY,n);return n;
  });await this.assertLive();return structuredClone(saved);
 }
 async setFontStep(revision:number,step:number){check(Number.isInteger(step)&&step>=17&&step<=30,'INVALID_FONT_STEP');return this.#update(revision,p=>({...p,fontStep:step}));}
 async addBookmark(revision:number,target:Ref<'QUESTION'>,notes=''){
  const r=structuredClone(target),grant=this.#scope.bookmarks.find(b=>sameRef(b.ref,r));check(grant&&refOk(r)&&this.#available(r),'BOOKMARK_NOT_AUTHORIZED');
  this.#loader.resolveItem(this.#release,r,'PRECOMMIT',this.#scope.releaseId);
  return this.#update(revision,p=>{check(!p.bookmarks.some(b=>sameRef(b.target,r)),'DUPLICATE_BOOKMARK');return {...p,bookmarks:[...p.bookmarks,{id:'bookmark:'+crypto.randomUUID(),target:r,title:grant!.title,notes,savedAt:new Date().toISOString()}]};});
 }
 async editBookmark(revision:number,id:string,notes:string){return this.#update(revision,p=>{check(p.bookmarks.some(b=>b.id===id),'BOOKMARK_NOT_FOUND');return {...p,bookmarks:p.bookmarks.map(b=>b.id===id?{...b,notes}:b)};});}
 async removeBookmark(revision:number,id:string){return this.#update(revision,p=>{check(p.bookmarks.some(b=>b.id===id),'BOOKMARK_NOT_FOUND');return {...p,bookmarks:p.bookmarks.filter(b=>b.id!==id)};});}
 async library(){const p=await this.profile();return {revision:p.revision,bookmarks:p.bookmarks.map(b=>({...b,available:this.#available(b.target)})),eligible:this.#scope.bookmarks.map(b=>({ref:structuredClone(b.ref),title:b.title}))};}
 async launch(target:Ref,router:Router,stillCurrent:()=>boolean=()=>true){
  const r=structuredClone(target);await this.assertLive();if(!stillCurrent()||!refOk(r)||r.type!=='QUESTION'||!this.#available(r))return null;
  this.#loader.resolveItem(this.#release,r,'PRECOMMIT',this.#scope.releaseId);
  const href=router.toHref('/question/'+encodeURIComponent(r.id)),m=router.match(href);
  if(m.type!=='QUESTION'||m.params.questionId!==r.id||Object.keys(m.query).length||m.hash)return null;
  await this.assertLive();if(!stillCurrent())return null;router.navigate(href);return href;
 }
 async diagnostics(){
  await this.assertLive();const mode=this.#driver instanceof IndexedDBStorageDriver?'INDEXEDDB':this.#driver instanceof MemoryStorageDriver?'MEMORY_VOLATILE':'UNKNOWN';
  try{await this.#driver.transaction([PROBE],'readwrite',async tx=>{const id=crypto.randomUUID();await tx.put(PROBE,id,{id});check((await tx.get<{id:string}>(PROBE,id))?.id===id,'PROBE_READBACK_FAILED');await tx.delete(PROBE,id);});await this.assertLive();return {mode,status:'WRITABLE' as const};}
  catch(e){await this.assertLive();return {mode,status:e instanceof StorageError&&e.code==='QUOTA_EXCEEDED'||e instanceof DOMException&&e.name==='QuotaExceededError'?'QUOTA_EXCEEDED' as const:'BLOCKED' as const};}
 }
 // Whole cognitive archive only, no lossy A18-only export of cognitive records.
 // A separately authenticated, dedicated learner storage scope is mandatory.
 async exportProgress(){return (await this.#archive()).blob;}
 async importProgress(blob:Blob){
  await this.assertLive();check(this.#scope.allowRestore,'RESTORE_NOT_AUTHORIZED');
  const a=await parseArchive(blob);this.#checkArchive(a);await this.assertLive();
  await this.#cognitive.importVerified(blob);
  // A48 restores atomically into empty evidence stores; imported data is history,
  // never local verified/disclosure authority. Do not claim a merge.
  await this.assertLive();return {attempts:a.data.progress.attempts.length,journeys:a.data.journeys.length};
 }
 // Profile backup is separate; no cross-archive atomicity is promised.
 async exportProfile(){const p=await this.profile(),data={...p};return new Blob([JSON.stringify({schema:'g9-a36-profile-backup/1',data,checksum:await computeSha256(canonicalJson(data))})],{type:'application/json'});}
 async importProfile(blob:Blob){
  await this.assertLive();check(this.#scope.allowRestore&&blob.size<=12_000_000,'PROFILE_RESTORE_NOT_AUTHORIZED');
  const raw=await blob.text();check(!findDuplicateKeyInJson(raw),'DUPLICATE_PROFILE_KEY');const b=JSON.parse(raw);
  check(exact(b,['schema','data','checksum'])&&b.schema==='g9-a36-profile-backup/1'&&profileOk(b.data,this.#scope.learnerId)&&await computeSha256(canonicalJson(b.data))===b.checksum,'INVALID_PROFILE_BACKUP');
  return this.#update(0,p=>({...p,fontStep:b.data.fontStep,bookmarks:structuredClone(b.data.bookmarks)}));
 }
}
