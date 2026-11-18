import { describe,it } from 'node:test';
import assert from 'node:assert/strict';
import { ManifestLoader, computeManifestContentDigest, computeSha256 } from '../../web/runtime/loader.ts';
import { Router } from '../../web/app/router.ts';
import type { ReleaseManifest } from '../../web/runtime/loader.ts';
const ref={type:'QUESTION' as const,id:'que:physics:wpe:01',revision:1,sha256:'a'.repeat(64)};
async function fixture(){
 const m:ReleaseManifest={schema_version:'g9-release-projection/1.1',release_id:'RELEASE-DEMO-01',target_mode:'DEMO',demo_banner:true,academic_admission:'HOLD',production_release:'NONE',artifact_scope:'PUBLIC_SAFE_DIAGNOSTIC_ONLY',learner_release:false,release_digest:'0'.repeat(64),projections:{learner_precommit:[{...ref,stem:'Synthetic question',subject_id:'PHYSICS',demo:true,asset_refs:[]}],learner_postcommit:[],search_index:[],assessment_contracts:[]}};
 return {...m,release_digest:await computeManifestContentDigest(m)};
}
describe('ManifestLoader',()=>{
 it('verifies actual content and resolves exact immutable reference',async()=>{const m=await fixture(),l=new ManifestLoader([{releaseId:m.release_id,digest:m.release_digest}]);const loaded=await l.loadFromData(JSON.stringify(m),m.release_digest);assert.equal(l.getCached(m.release_id),loaded);assert.equal(l.resolveItem<{stem:string}>(loaded,ref,'PRECOMMIT',m.release_id).stem,'Synthetic question');assert(Object.isFrozen(loaded.projections.learner_precommit[0]));l.clearCache();assert.equal(l.getCached(m.release_id),null);});
 it('rejects nested mutation even with unchanged declared digest',async()=>{const m=await fixture();const bad=JSON.parse(JSON.stringify(m));bad.projections.learner_precommit[0].stem='Altered';await assert.rejects(new ManifestLoader([{releaseId:m.release_id,digest:m.release_digest}]).loadFromData(JSON.stringify(bad),m.release_digest),/DIGEST_MISMATCH/);});
 it('rejects missing or stale trusted digest',async()=>{const m=await fixture(),l=new ManifestLoader([{releaseId:m.release_id,digest:m.release_digest}]);await assert.rejects(l.loadFromData(JSON.stringify(m)),/STALE_MANIFEST_HASH/);await assert.rejects(l.loadFromData(JSON.stringify(m),'b'.repeat(64)),/STALE_MANIFEST_HASH/);});
 it('rejects malformed JSON and missing metadata',async()=>{const l=new ManifestLoader();for(const s of ['{','null','{}'])await assert.rejects(l.loadFromData(s),/MALFORMED_PROJECTION/);});
 it('rejects private postcommit data even when rehashed',async()=>{const m=await fixture();const bad={...m,projections:{...m.projections,learner_postcommit:[{answer:'secret'}]}};const digest=await computeManifestContentDigest(bad);await assert.rejects(new ManifestLoader([{releaseId:m.release_id,digest}]).loadFromData(JSON.stringify({...bad,release_digest:digest}),digest),/PROTECTED_PROJECTION/);});
 it('denies postcommit and forged refs, unknown or stale revisions, unverified objects',async()=>{const m=await fixture(),l=new ManifestLoader([{releaseId:m.release_id,digest:m.release_digest}]),loaded=await l.loadFromData(JSON.stringify(m),m.release_digest);assert.throws(()=>l.resolveItem(m,ref,'PRECOMMIT',m.release_id),/DIGEST_MISMATCH/);assert.throws(()=>l.resolveItem(loaded,ref,'POSTCOMMIT',m.release_id),/PROTECTED_PROJECTION/);assert.throws(()=>l.resolveItem(loaded,{...ref,sha256:'b'.repeat(64)},'PRECOMMIT',m.release_id),/DIGEST_MISMATCH/);assert.throws(()=>l.resolveItem(loaded,{...ref,id:'missing'},'PRECOMMIT',m.release_id),/ITEM_NOT_FOUND/);assert.throws(()=>l.resolveItem(loaded,{...ref,revision:2},'PRECOMMIT',m.release_id),/INVALID_REVISION/);});
 it('hashes known bytes',async()=>assert.equal(await computeSha256('abc'),'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad'));
});
describe('Router', () => {
  it('normalizes basePaths and strips them cleanly', () => {
    const router1 = new Router({ basePath: '/Grade9v4.2/' });
    assert.equal(router1.basePath, '/Grade9v4.2');
    assert.equal(router1.stripBasePath('/Grade9v4.2/subject/physics'), '/subject/physics');

    const router2 = new Router({ basePath: 'subpath' });
    assert.equal(router2.basePath, '/subpath');
    assert.equal(router2.stripBasePath('/subpath/'), '/');
  });

  it('matches Home route', () => {
    const router = new Router({ basePath: '/Grade9v4.2' });
    const match = router.match('/Grade9v4.2/');
    assert.equal(match.type, 'HOME');
    assert.equal(match.path, '/');
  });

  it('matches Subject route and extracts parameters', () => {
    const router = new Router({ basePath: '/Grade9v4.2' });
    const match = router.match('/Grade9v4.2/subject/physics');
    assert.equal(match.type, 'SUBJECT');
    assert.equal(match.params.subjectId, 'physics');
  });

  it('matches Topic route and extracts multiple parameters', () => {
    const router = new Router();
    const match = router.match('/subject/physics/topic/wpe');
    assert.equal(match.type, 'TOPIC');
    assert.equal(match.params.subjectId, 'physics');
    assert.equal(match.params.topicId, 'wpe');
  });

  it('matches Question route with encoded identifiers', () => {
    const router = new Router();
    const match = router.match('/question/que%3Aphysics%3Awpe%3A01');
    assert.equal(match.type, 'QUESTION');
    assert.equal(match.params.questionId, 'que:physics:wpe:01');
  });

  it('matches Role route with Core role and resource ID', () => {
    const router = new Router();
    const match = router.match('/role/CORE1A/res%3Aphysics%3A01');
    assert.equal(match.type, 'ROLE');
    assert.equal(match.params.coreRole, 'CORE1A');
    assert.equal(match.params.resourceId, 'res:physics:01');
  });

  it('matches Search route and parses query parameters', () => {
    const router = new Router();
    const match = router.match('/search?q=kinetic+energy&mode=quick#results');
    assert.equal(match.type, 'SEARCH');
    assert.equal(match.query.q, 'kinetic energy');
    assert.equal(match.query.mode, 'quick');
    assert.equal(match.hash, 'results');
  });

  it('matches Exam paper route', () => {
    const router = new Router();
    const match = router.match('/exam/paper-2026-physics');
    assert.equal(match.type, 'EXAM');
    assert.equal(match.params.paperId, 'paper-2026-physics');
  });

  it('returns NOT_FOUND for unknown routes', () => {
    const router = new Router();
    const match = router.match('/unknown/deep/invalid/route');
    assert.equal(match.type, 'NOT_FOUND');
  });

  it('generates base-aware URLs with toHref', () => {
    const router = new Router({ basePath: '/Grade9v4.2' });
    assert.equal(
      router.toHref('/subject/physics', { view: 'grid' }),
      '/Grade9v4.2/subject/physics?view=grid'
    );

    const hashRouter = new Router({ basePath: '/Grade9v4.2', useHash: true });
    assert.equal(
      hashRouter.toHref('/subject/physics'),
      '/Grade9v4.2/#/subject/physics'
    );
  });

  it('supports safe return navigation with back() and fallback', () => {
    const router = new Router();
    router.navigate('/subject/physics');
    router.navigate('/subject/physics/topic/wpe');
    router.navigate('/question/que:01');

    // Return to topic
    const prev1 = router.back('/subject/physics');
    assert.equal(prev1.type, 'TOPIC');
    assert.equal(prev1.params.topicId, 'wpe');

    // Return to subject
    const prev2 = router.back('/');
    assert.equal(prev2.type, 'SUBJECT');

    // Return to home
    const prev3 = router.back('/');
    assert.equal(prev3.type, 'HOME');

    // Empty stack falls back safely without error
    const fallback = router.back('/subject/physics');
    assert.equal(fallback.type, 'SUBJECT');
  });

  it('supports listener subscription and unsubscription', () => {
    const router = new Router();
    let callCount = 0;
    let lastPath = '';

    const unsubscribe = router.subscribe((match) => {
      callCount += 1;
      lastPath = match.path;
    });

    router.navigate('/subject/chemistry');
    assert.equal(callCount, 1);
    assert.equal(lastPath, '/subject/chemistry');

    unsubscribe();
    router.navigate('/subject/mathematics');
    assert.equal(callCount, 1); // Not called after unsubscribe
  });
});

it('round trips static hash links, preserves equals, rejects malformed routes',()=>{const r=new Router({basePath:'/Grade9v4.2',useHash:true});assert.equal(r.match(r.toHref('/question/q1',{q:'a=b'})).params.questionId,'q1');assert.equal(r.match(r.toHref('/search',{q:'a=b'})).query.q,'a=b');assert.equal(r.match('/question/%ZZ').type,'NOT_FOUND');assert.equal(r.stripBasePath('/Grade9v4.2-other'),'/Grade9v4.2-other');});

import {readFileSync} from 'node:fs';
it('loads real Python compiler output when provided by the hosted integration job',async()=>{const path=process.env.G9_COMPILED_PROJECTION;if(!path)return;const raw=readFileSync(path,'utf8'),m=JSON.parse(raw);const l=new ManifestLoader([{releaseId:m.release_id,digest:m.release_digest}]),loaded=await l.loadFromData(raw,m.release_digest);for(const x of loaded.projections.learner_precommit)assert.equal(l.resolveItem(loaded,x,'PRECOMMIT',m.release_id),x);});

it('rejects duplicate decoded manifest keys and self-authorized digests',async()=>{const m=await fixture(),l=new ManifestLoader([{releaseId:m.release_id,digest:m.release_digest}]);await assert.rejects(l.loadFromData(JSON.stringify(m).replace('{','{"release_id":"other",'),m.release_digest),/MALFORMED_PROJECTION/);await assert.rejects(new ManifestLoader().loadFromData(JSON.stringify(m),m.release_digest),/STALE_MANIFEST_HASH/);});
