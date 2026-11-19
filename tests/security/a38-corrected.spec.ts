// A38 executable negatives against the real runtime, not test-local validators.
import {test} from 'node:test';
import assert from 'node:assert/strict';
import {Router} from '../../web/app/router.ts';
import {NonceManager,PROTECTED_EVENT_TYPES,validateBridgeMessage} from '../../web/application-host/bridge.ts';
import {sanitizeMarkup} from '../../web/runtime/rendering.ts';
import {findDuplicateKeyInJson} from '../../web/runtime/response.ts';
import {fixture} from '../fixtures/wave9-synthetic.ts';
import {artifact,firstResponses} from '../fixtures/wave8-synthetic.ts';
import {MemoryStorageDriver,StorageError} from '../../web/runtime/storage.ts';
import {VerifiedSearchIndex} from '../../web/runtime/search.ts';
import {ManifestLoader,canonicalJson,computeSha256} from '../../web/runtime/loader.ts';
import {searchFixture} from '../fixtures/search-wire.ts';
test('A38 real router rejects unsafe decoded paths and duplicate query keys; bridge denies forbidden commands and replays',()=>{
 const r=new Router({basePath:'/grade9',useHash:true});
 for(const p of ['/question/%2e%2e','/question/a%2Fb','/question/a%5Cb','/question/a%00b','/question/%ZZ','/search?q=a&q=b','/search?__proto__=x','//attacker.invalid/question/a','javascript:alert(1)'])assert.equal(r.match(p).type,'NOT_FOUND',p);
 const origin='https://isolated.example.test',n=new NonceManager('session:a38'),env={type:'APP_READY',nonce:n.current,sessionId:'session:a38',sequence:1};
 for(const type of PROTECTED_EVENT_TYPES)assert.equal(validateBridgeMessage({origin,data:{...env,type}},origin,n,env.sessionId,'seq-1')?.reason,'PROTECTED_EVENT');
 assert.equal(validateBridgeMessage({origin:'https://other.example.test',data:env},origin,n,env.sessionId,'seq-1')?.reason,'WRONG_ORIGIN');
 assert.equal(validateBridgeMessage({origin,data:{...env,payload:{answer:'marker'}}},origin,n,env.sessionId,'seq-1')?.reason,'INVALID_PAYLOAD');
 assert.equal(validateBridgeMessage({origin,data:env},origin,n,env.sessionId,'seq-1'),null);
 assert.equal(validateBridgeMessage({origin,data:env},origin,n,env.sessionId,'seq-1')?.reason,'REPLAY');
 assert(findDuplicateKeyInJson('{"id":1,"\\u0069d":2}'));
 const clean=sanitizeMarkup('<script>globalThis.A38=1</script><img src=x onerror=alert(1)><b onclick=alert(2)>text</b>');
 assert(!/<script|<img|onclick=|onerror=/i.test(clean.html));
});
test('A38 actual A49 precommit fetch denial, quota rollback, stale/revoked evidence',async()=>{
 const d=new MemoryStorageDriver(),x=await fixture('CORE2B','4',d),a=await x.compose();
 let cp=(await a.controller.begin()).checkpoint,reads=x.reads();
 assert.equal(await a.feedback.readFirstReference(cp),null);assert.equal(await a.feedback.readBoundaryReference(cp),null);assert.equal(x.reads(),reads);
 const {Core1BTransferJourney}=await import('../../web/journeys/core1b.ts');
 const j=new Core1BTransferJourney(x.f.definition,{controller:a.controller,driver:d,progress:x.progress,engine:x.f.binding.engine,definitionSha256:x.f.binding.definitionSha256,boundarySessionId:x.f.bs.id,assessmentA:x.f.binding.assessmentA,assessmentB:x.f.binding.assessmentB,loadProtected:x.load});
 await j.start();await j.predict(0);j.setResponses(firstResponses,[artifact('work:a38:first')]);await j.saveDraft();cp=j.getCheckpoint()!;
 const before=await a.controller.readEvidence(cp);d.setFailureHook((s,op)=>s==='attempts'&&op==='put'?new StorageError('QUOTA_EXCEEDED','synthetic quota fault'):null);
 await assert.rejects(j.commitFirstAttempt());d.setFailureHook(null);
 const after=await a.controller.readEvidence(cp);assert.deepEqual(after.snapshot,before.snapshot);assert.equal(after.attempts.length,0);assert.equal(await a.feedback.readFirstReference(cp),null);
 const restored=new Core1BTransferJourney(x.f.definition,{controller:a.controller,driver:d,progress:x.progress,engine:x.f.binding.engine,definitionSha256:x.f.binding.definitionSha256,boundarySessionId:x.f.bs.id,assessmentA:x.f.binding.assessmentA,assessmentB:x.f.binding.assessmentB,loadProtected:x.load});
 await restored.start();assert.deepEqual(restored.getResponses(),firstResponses);await restored.commitFirstAttempt();
 const next=restored.getCheckpoint()!;assert.equal(await a.feedback.readFirstReference(cp),null);assert.equal(await a.feedback.readFirstReference(next),'REVIEWED_FIRST_REFERENCE');x.revoke();assert.equal(await a.feedback.readFirstReference(next),null);
});
test('A38 100k manifest is explicitly unsupported, rejected before loading shards',async()=>{
 const w=searchFixture().actual,l=new ManifestLoader([{releaseId:w.pins.releaseId,digest:w.pins.releaseDigest}]),release=await l.loadFromData(w.release,w.pins.releaseDigest);
 const m=JSON.parse(w.manifest);m.total_items=100000;const {manifest_digest,...body}=m;m.manifest_digest=await computeSha256(canonicalJson(body));let loads=0;
 await assert.rejects(VerifiedSearchIndex.open({pins:{...w.pins,manifestDigest:m.manifest_digest},releaseLoader:l,release,manifestBytes:JSON.stringify(m),live:async()=>true,loadShard:async()=>{loads++;return ''}}),/SEARCH_SCOPE_MISMATCH/);assert.equal(loads,0);
});
