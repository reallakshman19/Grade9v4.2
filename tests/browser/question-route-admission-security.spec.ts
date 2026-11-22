import {test} from 'node:test';
import assert from 'node:assert/strict';
import {chromium} from 'playwright-core';
import {createServer} from 'vite';

test('actual Chromium question page rejects hostile HTML and suppresses unapproved source answer hints', {timeout:60000},async()=>{
 const server=await createServer({server:{host:'127.0.0.1',port:0,strictPort:true}});
 await server.listen();const addr=server.httpServer!.address();assert(addr&&typeof addr!=='string');
 const browser=await chromium.launch({headless:true});
 try{
  const page=await browser.newPage();await page.goto('http://127.0.0.1:'+addr.port+'/test-host.html');
  await page.evaluate(async()=>{
    const {QuestionPageController,mountQuestionPage}=await import('/pages/question.ts' as string);
    const root=document.getElementById('app')!;
    const controller=new QuestionPageController('phys','wpe');
    controller.loadQuestion({
      id:'q-hostile-proof',code:'TEST-HOLD',title:'Safe question',
      stemText:'<p>Conserve energy.</p><img src=x onerror="window.__xss=1">',
      kind:'SINGLE_CHOICE',
      options:[{id:'OPT-A',text:'<svg onload="window.__xss=2"></svg> Option A'},{id:'OPT-B',text:'$x^{2}$'}],
      status:'HOLD',keyStatus:'UNVERIFIED',correctKey:'OPT-A',
      hints:[{id:'hint1',text:'PRIVATE-HINT',penaltyPercent:0}],
      solutionSteps:['PRIVATE-SOLUTION'],explanationHtml:'PRIVATE-EXPLANATION',
      figures:[{id:'figure-attack',caption:'Bad URL',available:true,sourceUrl:'javascript:window.__xss=3'}]
    });
    (window as any).__mounted=mountQuestionPage(root,controller);
  });
  await page.getByText('Conserve energy.').waitFor();
  assert.equal(await page.locator('main .g9-stimulus-content img').count(),0);
  assert.equal(await page.locator('main svg').count(),0);
  assert.equal(await page.evaluate(()=>(window as any).__xss??null),null);
  assert.equal(await page.getByText('PRIVATE-SOLUTION').count(),0);
  assert.equal(await page.getByText('PRIVATE-HINT').count(),0);
  assert.match(await page.locator('[data-slot=identity]').innerText(),/Key: UNVERIFIED/);
  assert.equal(await page.locator('#g9-hint-btn').isDisabled(),true);
  assert.equal(await page.locator('#g9-solution-toggle-btn').count(),0);
  await page.getByText('Worked solution awaiting reviewed release').waitFor();
  assert.equal(await page.getByText('PRIVATE-EXPLANATION').count(),0);
  await page.evaluate(()=>(window as any).__mounted?.dispose());
  await page.close();
 }finally{await browser.close();await server.close();}
});

test('actual question route does not invent VERIFIED key for corpus HOLD, nor substitute a sample for missing ID',{timeout:60000},async()=>{
 const server=await createServer({server:{host:'127.0.0.1',port:0,strictPort:true}});
 await server.listen();const addr=server.httpServer!.address();assert(addr&&typeof addr!=='string');
 const browser=await chromium.launch({headless:true});
 try{
  const page=await browser.newPage();await page.goto('http://127.0.0.1:'+addr.port+'/test-host.html');
  await page.evaluate(async()=>{
    const {UNIFIED_QUESTION_DATABASE}=await import('/runtime/unified-question-database.ts' as string);
    const {mountRoute}=await import('/app/main.ts' as string);
    UNIFIED_QUESTION_DATABASE.register({
      id:'q-hold-sim',code:'Q-HOLD',title:'Academic source on HOLD',
      stem:'A question with no approved admission',kind:'SINGLE_CHOICE',
      options:[{id:'OPT-A',text:'Option A'}],status:'RELEASED',
      academicAdmission:'HOLD',keyState:'VERIFIED',correctKey:'OPT-A',
      subjectCode:'PHYS',topicCode:'WPE',maxPoints:3,exam:'DEMO',difficultyBand:'D1',difficultyScore:1,qrtDemand:'VERIFY',
    } as any);
    mountRoute('#/question/q-hold-sim',document.getElementById('app')!);
  });
  await page.locator('[data-slot=identity] h1').getByText('Academic source on HOLD').waitFor();
  const identity=await page.locator('[data-slot=identity]').innerText();
  assert.match(identity,/Status: HOLD/);
  assert.match(identity,/Key: UNVERIFIED/);
  await page.evaluate(async()=>{
    const {mountRoute}=await import('/app/main.ts' as string);
    mountRoute('#/question/missing-q-never-fallback',document.getElementById('app')!);
  });
  await page.getByText('Question unavailable').waitFor();
  assert.equal(await page.getByText('Work and Kinetic Energy Balance').count(),0);
  await page.close();
 }finally{await browser.close();await server.close();}
});
