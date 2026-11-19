import {test} from 'node:test';
import assert from 'node:assert/strict';
import {a53Fixture} from '../fixtures/a53-synthetic.ts';
import {validateC06,evaluateCellState,ReasoningMatrixComponent} from '../../web/components/reasoning-matrix.ts';
test('A53 strict structural validation, distinct refs and no candidate promotion',async()=>{
 const x=await a53Fixture();assert.equal(validateC06(x.cell).valid,true);assert.equal(evaluateCellState(x.cell),'SYNTHETIC_STRUCTURAL');
 assert.equal(evaluateCellState({...x.cell,status:'CANDIDATE'}),'PENDING_REVIEW');assert.equal(evaluateCellState({...x.cell,c06_v11:false}),'PENDING_REVIEW');
 assert.equal(validateC06({...x.cell,instances:[x.i1,{...x.i2,sha256:x.i1.sha256}]}).valid,false);
 assert.equal(validateC06({...x.cell,instances:[x.i1,{...x.i2,sha256:'bad'}]}).valid,false);
 assert.throws(()=>new ReasoningMatrixComponent([x.cell,{...x.cell,cell_id:'cell:alias'}]),/DUPLICATE_CELL/);
});
test('A53 exact pin and manifest-backed route; wrong revision, held/fresh/foreign task and revoked catalog denied',async()=>{
 const x=await a53Fixture(),c=await x.create();assert.equal((await c.view()).cells.length,28);c.select('APPLY','D2');
 assert.equal(await c.launch(x.i1),null);assert.equal(await c.launch(x.i2),null);assert.equal(await c.launch({...x.q,revision:2}),null);
 assert.equal(await c.launch(x.q),'/grade9/#/question/question%3Asynthetic%3Amain');assert.equal(x.router.getCurrent().params.questionId,x.q.id);
 assert.equal(await c.returnToTopic(),'/grade9/#/subject/physics/topic/topic%3Asynthetic');
 const altered=structuredClone(x.catalog);Object.assign(altered,{title:'Changed'});await assert.rejects(x.create(altered),/CATALOG_PIN_MISMATCH/);
 x.revoke();assert.equal(await c.launch(x.q),null);await assert.rejects(c.view());
});
