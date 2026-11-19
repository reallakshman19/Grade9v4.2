import {test} from 'node:test';
import assert from 'node:assert/strict';
import {ManifestLoader,computeManifestContentDigest,computeSha256,type ReleaseManifest} from '../../web/runtime/loader.ts';
import {diagnosticStem,ProgressivePresentationController,StageGatedFeedbackController} from '../../web/runtime/presentation.ts';
import {CORE1_ORIENTATION_BLUEPRINT_ID,CORE1_ORIENTATION_BLOCKS,parseOrientation,Core1OrientationJourney} from '../../web/journeys/core1.ts';
import {Core2ASupportedJourney,pendingSelfCheck} from '../../web/journeys/core2a.ts';
import {Core2BTransferJourney} from '../../web/journeys/core2b.ts';
import {getUIStateMessage} from '../../web/i18n/index.ts';
import {setupTransfer,throughFirst,throughRepair,boundaryResponses,artifact,ref} from '../fixtures/wave8-synthetic.ts';
const q=ref('QUESTION','question:wave9:synthetic');
async function manifest(){
 const m:ReleaseManifest={schema_version:'g9-release-projection/1.1',release_id:'release:wave9:demo',target_mode:'DEMO',demo_banner:true,academic_admission:'HOLD',production_release:'NONE',artifact_scope:'PUBLIC_SAFE_DIAGNOSTIC_ONLY',learner_release:false,release_digest:'0'.repeat(64),projections:{learner_precommit:[{...q,stem:'Synthetic source text',subject_id:'PHYSICS',demo:true,asset_refs:[]}],learner_postcommit:[],search_index:[],assessment_contracts:[]}};
 return {...m,release_digest:await computeManifestContentDigest(m)};
}
test('A33 uses exact pinned manifest, not caller digest or rewritten stem',async()=>{
 const m=await manifest(),loader=new ManifestLoader([{releaseId:m.release_id,digest:m.release_digest}]),loaded=await loader.loadFromData(JSON.stringify(m),m.release_digest);
 assert.equal(diagnosticStem(loader,loaded,q,m.release_id).stem,'Synthetic source text');
 assert.equal(diagnosticStem(loader,loaded,q,m.release_id).learnerRelease,false);
 assert.throws(()=>diagnosticStem(loader,structuredClone(loaded),q,m.release_id),/Unverified manifest/);
 assert.throws(()=>diagnosticStem(loader,loaded,{...q,sha256:'b'.repeat(64)},m.release_id),/Exact reference mismatch/);
 const changed=structuredClone(m);(changed.projections.learner_precommit[0] as Record<string,unknown>).stem='Changed';const digest=await computeManifestContentDigest(changed);
 await assert.rejects(loader.loadFromData(JSON.stringify({...changed,release_digest:digest}),digest),/Trusted digest/);
 assert.equal(await computeSha256('abc'),'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad');
});
test('A33 uses real A49 persisted evidence for reference and boundary disclosure',async()=>{
 const f=await setupTransfer(),j=f.make(),p=new StageGatedFeedbackController(f.controller,f.binding.loadProtected);
 await j.start();assert.equal(await p.readFirstReference(j.getCheckpoint()!),null);
 await j.predict(0);assert.equal(await p.readFirstReference(j.getCheckpoint()!),null);
 // A49 requires a real commit, not a caller stage or success flag.
 j.setResponses({a:{kind:'INTEGER',value:'7'},b:{kind:'CONSTRUCTED_RESPONSE',value:'independent working'}},[artifact('work:w9:first')]);await j.saveDraft();await j.commitFirstAttempt();
 const cp=j.getCheckpoint()!;assert.equal(await p.readFirstReference(cp),'REVIEWED_FIRST_REFERENCE');
 assert.equal(await p.readBoundaryReference(cp),null);
 const wrong=new StageGatedFeedbackController(f.controller,async()=>new TextEncoder().encode('wrong bytes'));
 assert.equal(await wrong.readFirstReference(cp),null);
 f.setEnabled(false);assert.equal(await p.readFirstReference(cp),null);
 f.setEnabled(true);await throughRepair(j);j.setResponses(boundaryResponses,[artifact('work:w9:boundary')]);await j.saveDraft();await j.commitBoundaryAttempt();
 assert.equal(await p.readBoundaryReference(j.getCheckpoint()!),'REVIEWED_BOUNDARY_REFERENCE');
 assert.equal(await p.readFirstReference(cp),null);
});
test('A33 unsupported locale and unreviewed presentation do not fall back',async()=>{
 const f=await setupTransfer(),j=f.make();await j.start();let calls=0;
 const p=new ProgressivePresentationController(f.controller,async()=>{calls++;return new Uint8Array();});
 assert.equal(await p.read(ref('PRESENTATION','presentation:unknown'),'hi-IN','FORMAL',j.getCheckpoint()!),null);assert.equal(calls,0);
 assert.notEqual(getUIStateMessage('pending','en-US'),getUIStateMessage('pending','hi-IN'));
 assert.throws(()=>getUIStateMessage('pending','constructor' as never),/TRANSLATION_UNAVAILABLE/);
});
test('A66 native structural map completeness is necessary, not authorization',async()=>{
 const obj={blueprint:CORE1_ORIENTATION_BLUEPRINT_ID,source:q,topicId:'synthetic:topic',blocks:Object.fromEntries(CORE1_ORIENTATION_BLOCKS.map(k=>[k,'Synthetic '+k]))};
 assert.ok(parseOrientation(JSON.stringify(obj),q));
 delete obj.blocks.orientation_closure;
 assert.equal(parseOrientation(JSON.stringify(obj),q),null);
 assert.equal(parseOrientation(JSON.stringify({...obj,source:ref('QUESTION','question:foreign')}),q),null);
 const f=await setupTransfer(),j=f.make();await j.start();
 const o=new Core1OrientationJourney(f.controller,f.binding.loadProtected);
 assert.equal(await o.read(ref('PRESENTATION','presentation:orientation'),j.getCheckpoint()!),null);assert.equal(o.canPrintPDF(),false);assert.equal(o.getLessonRoute(),null);
});
test('A67 cannot score open reasoning or unsupported knowledge by text heuristics',async()=>{
 for(const working of ['Wrong answer that is longer than twenty characters','Not 15 J, 15 J is wrong','15 J'])assert.deepEqual(pendingSelfCheck(working),{status:'REVIEW_PENDING',valid:null,mastery:false});
 assert.throws(()=>pendingSelfCheck(' '),/WORKING_REQUIRED/);
 const f=await setupTransfer(),j=f.make();await throughFirst(j);
 const p=new Core2ASupportedJourney(f.controller,f.progress,{reviewedCheck:async()=>null});
 assert.equal((await p.readIndependentCheck(j.getCheckpoint()!)).valid,null);
});
test('A68 missing review blocks even valid A49 journey, no protected fetch or writes',async()=>{
 const f=await setupTransfer();let loads=0;
 const t=new Core2BTransferJourney(f.controller,f.progress,{reviewedTransfer:async()=>null},async()=>{loads++;return new Uint8Array();});
 await assert.rejects(t.begin(),/TRANSFER_REVIEW_REQUIRED/);
 const j=f.make();await throughFirst(j);
 const cp=j.getCheckpoint()!;
 assert.equal(await t.readFirstReference(cp),null);assert.equal(await t.readBoundaryReference(cp),null);
 assert.equal(await t.readScaffold('H1',cp,'fake'),null);assert.equal(await t.readSourceReturn(cp),null);assert.equal(loads,0);
});
