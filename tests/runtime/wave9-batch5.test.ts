import {test} from 'node:test';
import assert from 'node:assert/strict';
import {fixture,pin} from '../fixtures/wave9-synthetic.ts';
test('W9-INT-05 PDF exact pinned bytes, corruption and revocation fail closed',async()=>{
 const x=await fixture('CORE1'),a=await x.compose(),cp=(await a.controller.begin()).checkpoint;
 assert.deepEqual(await a.readPrintPDF(cp),x.pdfBytes);
 x.f.bytes.set(x.pdfRef.id,new TextEncoder().encode('%PDF-1.4\n%%EOF'));
 assert.equal(await a.readPrintPDF(cp),null);
 x.f.bytes.set(x.pdfRef.id,x.pdfBytes);x.revoke();assert.equal(await a.readPrintPDF(cp),null);
});
test('W9-INT-05 source projection cannot be read before durable source return',async()=>{
 const x=await fixture('CORE2B'),a=await x.compose(),cp=(await a.transfer!.begin()).checkpoint;
 const reads=x.reads();assert.equal(await a.readReturnedSource(cp),null);assert.equal(x.reads(),reads);
 const altered=structuredClone(x.c);Object.assign(altered.page!.sourceRoute!,{projection:x.f.firstRef});
 await assert.rejects(x.compose(altered,await pin(altered)),/INVALID_SOURCE_PROJECTION/);
});
test('W9-INT-05 locale/tier binding rejects duplicates',async()=>{
 const x=await fixture('CORE2A'),altered=structuredClone(x.c);Object.assign(altered.page!,{presentations:[altered.page!.presentations![0],altered.page!.presentations![0]]});
 await assert.rejects(x.compose(altered,await pin(altered)),/INVALID_PRESENTATION_BINDING/);
});
