import {test} from 'node:test';
import assert from 'node:assert/strict';
import {legacyPage,paths,measure,report} from './legacy_pilot_harness.spec.ts';
test('A69 pinned native circles master: actual question corpus, filters, feedback and local latest-response behavior',{timeout:60000},async()=>{
 const h=await legacyPage(paths.circles);try{
  const p=h.page,card=p.locator('.qb-question'),count=await card.count();
  assert(count===50,'actual source corpus changed');
  const keys=await p.evaluate(()=>{const cards=[...document.querySelectorAll('.qb-question')];return {cards:cards.length,unique:new Set(cards.map(c=>c.getAttribute('data-qid'))).size,withKeys:cards.filter(c=>c.hasAttribute('data-correct-choice')&&c.querySelector('[data-correct=true]')).length};});
  assert(keys.unique===50&&keys.withKeys===50,'source key/corpus identity mismatch');
  const first=card.first(),band=await first.getAttribute('data-band');
  assert(band&&/^D[1-4]$/.test(band),'source band missing');
  await p.locator('[data-filter="'+band+'"]').click();const filtered=await card.evaluateAll(nodes=>nodes.filter(n=>getComputedStyle(n).display!=='none').length);
  assert(filtered>0&&filtered<=count,'native band filter failed');
  await p.locator('[data-filter=all]').click();await p.locator('#search-input').fill('A69-NONEXISTENT-QUERY');assert(await card.evaluateAll(nodes=>nodes.every(n=>getComputedStyle(n).display==='none')),'native search did not filter');await p.locator('#search-input').fill('');
  await first.locator('[data-correct=false]').first().click();assert((await p.locator('#stat-attempted').innerText()).trim()==='1');assert((await p.locator('#stat-correct').innerText()).trim()==='0');
  await first.locator('[data-correct=true]').click();assert((await p.locator('#stat-attempted').innerText()).trim()==='1');assert((await p.locator('#stat-correct').innerText()).trim()==='1');
  await p.reload({waitUntil:'domcontentloaded'});assert((await p.locator('#stat-attempted').innerText()).trim()==='1');assert((await p.locator('#stat-correct').innerText()).trim()==='1');
  const layout=await measure(p,'button,input,select');report('circles',{actualQuestionCards:count,precommitKeyedCards:keys.withKeys,latestResponseOverwritesPrior:true,localReload:true,layout,geometryPointDatasetClaim:'CONTRADICTED',targetCorpusMapping:'NOT_RUN'});
 }finally{await h.close();}
});
