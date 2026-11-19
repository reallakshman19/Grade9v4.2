import {test} from 'node:test';
import assert from 'node:assert/strict';
import {evaluateWpeModel} from '../../web/adapters/physics/models/wpe-oracles.ts';
test('A38 10k real WPE numerical evaluations, bounded synthetic throughput measurement',()=>{
 const start=performance.now();let sum=0;
 for(let i=0;i<10000;i++){const x=evaluateWpeModel('SPRING_CONTACT',{k:200,x:.5,m:1,friction:5,distance:3});assert.equal(x.release_energy,25);assert.equal(x.final_energy,10);assert.equal(x.boundary_distance,5);sum+=x.final_energy;}
 const elapsed=performance.now()-start;assert.equal(sum,100000);assert(elapsed<2000);console.log('A38 synthetic model benchmark',JSON.stringify({evaluations:10000,elapsedMs:elapsed,opsPerSecond:10000000/elapsed,budgetMs:2000}));
});
