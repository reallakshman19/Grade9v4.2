import {fixture} from './wave9-synthetic.ts';
import {DefaultProgressStore} from '../../web/runtime/progress.ts';
import {MemoryStorageDriver,type StorageDriver} from '../../web/runtime/storage.ts';
import {PersonalStudyStore,type PersonalScope} from '../../web/runtime/personal-study.ts';
import {ManifestLoader,canonicalJson,computeSha256,computeManifestContentDigest,type ReleaseManifest} from '../../web/runtime/loader.ts';
import {ref,artifact,firstResponses} from './wave8-synthetic.ts';
import {SupportedPracticeWorkspace} from '../../web/journeys/supported-practice.ts';
import type {Session,Ref} from '../../web/runtime/types.ts';
export async function personalFixture(driver:StorageDriver=new MemoryStorageDriver(),populate=true){
 const x=await fixture('CORE2A','5',driver,populate);
 const a=await x.compose();
 if(populate){const p=new SupportedPracticeWorkspace(a.controller,x.progress,x.f.binding.engine,x.f.binding.assessmentA,x.load);
  let cp=(await a.controller.begin()).checkpoint;cp=(await p.predict(cp,'prediction')).verified.snapshot.checkpoint;
  await p.request(cp,'H1',x.hint);cp=(await a.controller.readEvidence()).snapshot.checkpoint;
  await p.save(cp,firstResponses,[artifact('work:a36:first')],0);
  cp=(await p.commit(cp,firstResponses,[artifact('work:a36:first')],1)).verified.snapshot.checkpoint;
  cp=(await p.compare(cp,{'move:one':{observation:'first'},'move:two':{observation:'second'}})).verified.snapshot.checkpoint;
  cp=(await p.diagnose(cp,'UNSURE','review')).verified.snapshot.checkpoint;
  await p.repair(cp,'repair',[artifact('work:a36:repair')]);
 }
 const target=x.cs.item as Ref<'QUESTION'>,m:ReleaseManifest={schema_version:'g9-release-projection/1.1',release_id:x.f.key.releaseId,target_mode:'DEMO',demo_banner:true,academic_admission:'HOLD',production_release:'NONE',artifact_scope:'PUBLIC_SAFE_DIAGNOSTIC_ONLY',learner_release:false,release_digest:'0'.repeat(64),projections:{learner_precommit:[{...target,stem:'Synthetic diagnostic question',subject_id:'PHYSICS',demo:true,asset_refs:[]}],learner_postcommit:[],search_index:[],assessment_contracts:[]}};
 const manifest={...m,release_digest:await computeManifestContentDigest(m)},loader=new ManifestLoader([{releaseId:m.release_id,digest:manifest.release_digest}]),release=await loader.loadFromData(JSON.stringify(manifest),manifest.release_digest);
 const scope:PersonalScope={schema:'g9-a36-scope/1',learnerId:'synthetic-learner',releaseId:m.release_id,releaseDigest:manifest.release_digest,sessions:[x.f.os,x.f.as,x.f.bs,x.as,x.cs].map(s=>({id:s.id,releaseId:s.releaseId,item:s.item})),journeys:[x.f.key],bookmarks:[{ref:target,title:'Synthetic diagnostic question',review:ref('APPROVAL','approval:a36:bookmark')}],allowRestore:true};
 let active=true;
 const open=async(s:PersonalScope=scope,d:StorageDriver=driver,progress:DefaultProgressStore=x.progress)=>{const pin=await computeSha256(canonicalJson(s));return PersonalStudyStore.open(s,pin,d,progress,loader,release,async v=>active&&v.learnerId===s.learnerId&&v.releaseId===s.releaseId&&v.scopeDigest===pin);};
 // Same trusted verifier as source fixture, but fresh isolated target driver.
 const restore=async(d:StorageDriver)=>open(scope,d,new DefaultProgressStore(d,async att=>{if(!att.assessmentRef)return false;const source=await x.progress.committedAttempt(att.sessionId,att.id);return !!source&&canonicalJson(source)===canonicalJson(att);}));
 return {x,scope,target,open,restore,driver,revoke:()=>{active=false;}};
}
