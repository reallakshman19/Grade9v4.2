import {ManifestLoader,computeManifestContentDigest,computeSha256,canonicalJson,type ReleaseManifest} from '../../web/runtime/loader.ts';
import {ReasoningPageController,type ReasoningCatalog} from '../../web/pages/reasoning.ts';
import {Router} from '../../web/app/router.ts';
import type {ReasoningCell,Ref} from '../../web/runtime/types.ts';
const ref=<T extends Ref['type']>(type:T,id:string,sha256:string):Ref<T>=>({type,id,revision:1,sha256});
export async function a53Fixture(){
 const q=ref('QUESTION','question:synthetic:main','1'.repeat(64)),i1=ref('QUESTION','question:synthetic:one','2'.repeat(64)),i2=ref('FRESH_TASK','fresh:synthetic:two','3'.repeat(64));
 const topic=ref('CONCEPT','topic:synthetic','4'.repeat(64)),contract=ref('QRT','qrt:synthetic','5'.repeat(64)),review=ref('APPROVAL','approval:synthetic','6'.repeat(64));
 const cell:ReasoningCell={schema_version:'g9-reasoning-cell/1',cell_id:'cell:synthetic',subject_id:'PHYSICS',topic_ref:topic,operation:'APPLY',demand_band:'D2',native_contract_ref:contract,main:q,instances:[i1,i2],status:'SYNTHETIC',c06_v11:true};
 const manifest:ReleaseManifest={schema_version:'g9-release-projection/1.1',release_id:'release:a53:synthetic',target_mode:'DEMO',demo_banner:true,academic_admission:'HOLD',production_release:'NONE',artifact_scope:'PUBLIC_SAFE_DIAGNOSTIC_ONLY',learner_release:false,release_digest:'0'.repeat(64),projections:{learner_precommit:[q,i1].map(r=>({...r,stem:'Synthetic question',subject_id:'PHYSICS',demo:true,asset_refs:[]})),learner_postcommit:[],search_index:[],assessment_contracts:[]}};
 const m={...manifest,release_digest:await computeManifestContentDigest(manifest)},loader=new ManifestLoader([{releaseId:m.release_id,digest:m.release_digest}]),loaded=await loader.loadFromData(JSON.stringify(m),m.release_digest);
 const catalog:ReasoningCatalog={schema:'g9-a53-diagnostic/1',learnerId:'synthetic-learner',releaseId:m.release_id,subjectId:'PHYSICS',topic,title:'Synthetic reasoning',cells:[cell],routes:[{cellId:cell.cell_id,task:q,review}],topicRoute:{subjectId:'physics',topicId:topic.id,review}};
 const pin=await computeSha256(canonicalJson(catalog)),router=new Router({basePath:'/grade9',useHash:true});let enabled=true;
 const live=async(s:{learnerId:string;releaseId:string;catalogSha256:string})=>enabled&&s.learnerId===catalog.learnerId&&s.releaseId===catalog.releaseId&&s.catalogSha256===pin;
 const create=(c:ReasoningCatalog=catalog,d=pin)=>ReasoningPageController.create(c,d,loader,loaded,router,live);
 return {q,i1,i2,cell,catalog,pin,create,loader,router,revoke:()=>{enabled=false;}};
}
