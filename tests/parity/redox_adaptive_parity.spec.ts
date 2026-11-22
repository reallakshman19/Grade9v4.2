import {test} from 'node:test';
import assert from 'node:assert/strict';
import {legacyPage,paths,measure,report} from './legacy_pilot_harness.spec.ts';
test('A69 pinned native redox: all three blocks, failure/repair, first-attempt memory and independent transfer',{timeout:60000},async()=>{
 const h=await legacyPage(paths.redox);try{
  const p=h.page;let routes=0;
  // Only booleans/counts leave the private browser. Read the source oracle
  // in that context to drive native controls; never print or publish answers.
  const route=async()=> (await p.locator('#route strong').innerText()).trim();
  assert(await p.evaluate('blocks.length === 3 && blocks.every(b=>Number.isInteger(b.conceptAnswer)&&Array.isArray(b.implementationAnswers))'),'native embedded keys missing');
  for(let i=0;i<3;i++){
   await p.locator('#blockBtn'+i).click();assert(await route()==='CHECKPOINT OPEN');
   const wrong=await p.evaluate('((blocks[current].conceptAnswer+1)%blocks[current].options.length)') as number;
   await p.locator('#options button').nth(wrong).click();await p.locator('#implementationInput').fill('A69_INVALID_RESPONSE');await p.locator('[onclick="checkImplementation()"]').click();
   assert(await route()==='REBUILD','native rebuild missing');routes++;
   await p.locator('#repairButton').click();assert((await p.locator('#route').innerText()).includes('Focused repair'));await p.locator('#hintButton').click();
   const ok=await p.evaluate('blocks[current].conceptAnswer') as number;
   await p.locator('#options button').nth(ok).click();
   // Set exact answer inside isolated native context; trigger actual control.
   await p.evaluate("document.getElementById('implementationInput').value=blocks[current].implementationAnswers[0]");
   await p.locator('[onclick="checkImplementation()"]').click();assert(await route()==='REBUILD','first response rewritten');
   await p.locator('[onclick="resetBlock()"]').click();assert(await route()==='CHECKPOINT OPEN');
   await p.locator('#options button').nth(ok).click();
   await p.evaluate("document.getElementById('implementationInput').value=blocks[current].implementationAnswers[0]");
   await p.locator('[onclick="checkImplementation()"]').click();assert(await route()==='READY','native ready missing');routes++;
   await p.locator('#transferButton').click();assert((await p.locator('#route').innerText()).includes('Mapped transfer'));
  }
  const layout=await measure(p,'button,input,select');report('redox',{blocks:3,routeChecks:routes,embeddedAnswerOracle:true,layout,fullNativeBranchMigration:'NOT_IMPLEMENTED',academicAdmission:'HOLD'});
 }finally{await h.close();}
});
