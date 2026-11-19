import {test} from 'node:test';
import assert from 'node:assert/strict';
import {searchFixture,type WireFixture} from '../fixtures/search-wire.ts';
import {ManifestLoader,canonicalJson,computeSha256} from '../../web/runtime/loader.ts';
import {VerifiedSearchIndex} from '../../web/runtime/search.ts';
import {QueryModel,normalizeQuery} from '../../web/runtime/search-model.ts';
import {Router} from '../../web/app/router.ts';
const f=searchFixture();
async function setup(w:WireFixture,live=async()=>true){
 const l=new ManifestLoader([{releaseId:w.pins.releaseId,digest:w.pins.releaseDigest}]),release=await l.loadFromData(w.release,w.pins.releaseDigest);
 return {pins:w.pins,releaseLoader:l,release,manifestBytes:w.manifest,loadShard:async(m:{shard_id:string})=>w.shards[m.shard_id],live};
}
test('A35 consumes actual Python A14/A34 bytes and matches Python query vectors',async()=>{
 const o=await setup(f.actual),idx=await VerifiedSearchIndex.open(o),model=new QueryModel(await idx.snapshot());
 for(const [raw,norm] of f.vectors)assert.equal(normalizeQuery(raw),norm,JSON.stringify(raw));
 for(const q of f.actual.expected)assert.deepEqual(model.query({text:q.text}).results.map(v=>v.id),q.ids);
 const result=await idx.materialize(model.query({text:'energy'}),{text:'energy'});assert.equal(result.totalMatches,1);
 const target=result.results[0].item.source_ref,router=new Router({basePath:'/grade9',useHash:true});
 assert.equal(await idx.launch({...target,revision:2},router),null);
 assert.equal(await idx.launch(target,router),'/grade9/#/question/'+encodeURIComponent(target.id));
 assert.equal(router.getCurrent().params.questionId,target.id);
 const x=await idx.snapshot();(x[0] as any).title='changed';assert.notEqual((await idx.snapshot())[0].title,'changed');
});
test('A35 rejects duplicate manifest keys, stale shard, wrong pins, partial shard and same-hash claims',async()=>{
 const o=await setup(f.actual),m=JSON.parse(o.manifestBytes),sid=m.shards[0].shard_id,shard=JSON.parse(f.actual.shards[sid]);
 await assert.rejects(VerifiedSearchIndex.open({...o,manifestBytes:o.manifestBytes.replace('"schema_version"', '"schema_version":"duplicate","schema_version"')}),/INVALID_SEARCH_BYTES/);
 await assert.rejects(VerifiedSearchIndex.open({...o,pins:{...o.pins,catalogDigest:'b'.repeat(64)}}),/SCOPE_MISMATCH/);
 const modified=structuredClone(shard);modified.items[0].title='tampered';
 await assert.rejects(VerifiedSearchIndex.open({...o,loadShard:async()=>JSON.stringify(modified)}),/CORRUPT_SHARD/);
 await assert.rejects(VerifiedSearchIndex.open({...o,loadShard:async()=>{throw Error('missing');}}));
 m.shards[0].sha256=await computeSha256(canonicalJson(modified));const {manifest_digest,...body}=m;m.manifest_digest=await computeSha256(canonicalJson(body));
 await assert.rejects(VerifiedSearchIndex.open({...o,manifestBytes:JSON.stringify(m),loadShard:async()=>JSON.stringify(modified)}),/MANIFEST_PIN_MISMATCH/);
 const b=await setup(f.bench);let loads=0;
 await assert.rejects(VerifiedSearchIndex.open({...b,loadShard:async meta=>{if(++loads===2)throw Error('second shard missing');return f.bench.shards[meta.shard_id];}}));assert.equal(loads,2);
});
test('A35 exact row validation rejects rehashed forged target or protected field even under synthetic replacement pin',async()=>{
 const o=await setup(f.actual),m=JSON.parse(o.manifestBytes),p=JSON.parse(f.actual.shards[m.shards[0].shard_id]);
 for(const patch of [{route:'/question/foreign'},{privateMoveRef:'private'},{source_ref:{...p.items[0].source_ref,sha256:'b'.repeat(64)}}]){
  const s=structuredClone(p);Object.assign(s.items[0],patch);const n=structuredClone(m);n.shards[0].sha256=await computeSha256(canonicalJson(s));const {manifest_digest,...body}=n;n.manifest_digest=await computeSha256(canonicalJson(body));
  await assert.rejects(VerifiedSearchIndex.open({...o,pins:{...o.pins,manifestDigest:n.manifest_digest},manifestBytes:JSON.stringify(n),loadShard:async()=>JSON.stringify(s)}));
 }
});
test('A35 withdrawal and revocation never reuse old results',async()=>{
 let active=true;const o=await setup(f.actual,async()=>active),idx=await VerifiedSearchIndex.open(o),target=(await idx.snapshot())[0].source_ref;
 const old=new QueryModel(await idx.snapshot());active=false;
 await assert.rejects(idx.materialize(old.query({text:''}),{text:''}),/AUTHORITY/);
 await assert.rejects(idx.launch(target,new Router()),/AUTHORITY/);
 const fresh=await VerifiedSearchIndex.open(await setup(f.withdrawn));assert.deepEqual(await fresh.snapshot(),[]);assert.equal(await fresh.launch(target,new Router()),null);
 const b=await VerifiedSearchIndex.open(await setup(f.bench)),model=new QueryModel(await b.snapshot());
 const r=model.query({text:'energy',facets:{subject:['PHYSICS','CHEMISTRY'],kind:['QUESTION']},limit:5});
 assert.equal(r.totalMatches,996);assert.equal(r.results.length,5);
 assert.deepEqual(r.results.map(x=>x.id),[...r.results.map(x=>x.id)].sort());
 assert.equal(model.query({text:'enrgy'}).suggestion,'energy');
});

test('A35 canceled asynchronous route launch does not navigate after host replacement',async()=>{
 let gate:Promise<boolean>|null=null,releaseGate:((v:boolean)=>void)|null=null;
 const o=await setup(f.actual,async()=>gate?await gate:true),idx=await VerifiedSearchIndex.open(o),target=(await idx.snapshot())[0].source_ref,router=new Router();
 let current=true;gate=new Promise<boolean>(resolve=>{releaseGate=resolve;});
 const launch=idx.launch(target,router,()=>current);current=false;releaseGate!(true);
 assert.equal(await launch,null);assert.notEqual(router.getCurrent().type,'QUESTION');
});
