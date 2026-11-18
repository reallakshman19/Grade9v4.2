import {it} from 'node:test';
import assert from 'node:assert/strict';
import {MemoryStorageDriver,StorageError} from '../../web/runtime/storage.ts';
import {LegacyStateImporter,classifyNativeKey} from '../../web/runtime/legacy-import/index.ts';
import {computeSha256} from '../../web/runtime/loader.ts';
const item={type:'QUESTION' as const,id:'que:legacy:r3',revision:1,sha256:'a'.repeat(64)},at='2026-11-17T12:00:00Z';
const origin='https://example.invalid',session={id:'ses:legacy:r3',startedAt:at},attempt={id:'att:legacy:r3',sessionId:session.id,itemId:item.id,revision:1,submittedAt:at,response:{kind:'SINGLE_CHOICE',value:'A'},mastery:true};
const envelope={schema_version:'g9-legacy-import/1.0',origin,exportedAt:at,sessions:[session],attempts:[attempt]};
const auth={authorize:async(_digest:string,o:string)=>o===origin,resolveItem:async(id:string,revision:number)=>id===item.id&&revision===1?{ref:item,optionIds:['A']}:null};
it('A72 preserves exact authorized bytes, maps only history and is idempotent',async()=>{
 const d=new MemoryStorageDriver(),i=new LegacyStateImporter(d,auth),raw=JSON.stringify(envelope),sha=await computeSha256(raw);
 const report=await i.importBundle(raw);assert.equal(report.disposition,'MAPPED_HISTORY');assert.equal(report.rows[0].grade.status,'REVIEW_PENDING');assert.equal(report.rows[0].masteryEligible,false);assert.equal(report.rows[0].protectedEvidence,false);
 assert.deepEqual(await i.importBundle(raw),report);assert.equal((await d.getAll('legacy_history')).length,1);assert.equal((await d.get<{raw:string}>('legacy_raw_exports',sha))?.raw,raw);assert.equal((await d.getAll('attempts')).length,0);
});
it('A72 observed native key families quarantine unmapped data rather than invent evidence',async()=>{
 const d=new MemoryStorageDriver(),i=new LegacyStateImporter(d,auth);
 const keys=['gx1:/path:digest','grade9v3_atlas_matrix','grade9v3_prompt_composer_handoff_v1','g9-theme','G9V41:PHYSICS:R2:uid:rev:hash','G9V41:PHYSICS:QUALITY-R2:STUDY:u:r','g9-physics-agent2-core1b-v1:q','g9:nsejs:iapt-link-note:v1:r:s:2024:CODE51:Q01','g9:nsejs:author-core1b:v1:s:d:u:h'];
 for(const key of keys)assert(classifyNativeKey(key));
 const raw=JSON.stringify({...envelope,rawStorageDump:Object.fromEntries(keys.map(k=>[k,'{}']))});const report=await i.importBundle(raw);assert.equal(report.disposition,'QUARANTINED');assert.equal(report.rows.length,0);assert.equal((await d.get<{raw:string}>('legacy_raw_exports',await computeSha256(raw)))?.raw,raw);assert.equal((await d.getAll('attempts')).length,0);
});
it('A72 transaction failure, unknown origin and wrong option fail closed',async()=>{
 const d=new MemoryStorageDriver(),i=new LegacyStateImporter(d,auth);
 const raw=JSON.stringify(envelope);d.setFailureHook((s,a)=>s==='legacy_raw_exports'&&a==='put'?new StorageError('TRANSACTION_ABORTED','test'):null);await assert.rejects(i.importBundle(raw));d.setFailureHook(null);assert.equal((await d.getAll('legacy_history')).length,0);
 await assert.rejects(i.importBundle(JSON.stringify({...envelope,origin:'https://other.invalid'})),/NOT_AUTHORIZED/);
 const bad=await i.importBundle(JSON.stringify({...envelope,attempts:[{...attempt,response:{kind:'SINGLE_CHOICE',value:'B'}}]}));assert.equal(bad.disposition,'QUARANTINED');
});
