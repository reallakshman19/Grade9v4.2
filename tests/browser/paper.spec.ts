import {describe,it} from 'node:test';
import assert from 'node:assert/strict';
import {chromium} from 'playwright-core';
import {createServer} from 'vite';
import {PartNavigationController} from '../../web/components/part-navigation.ts';
import {ExamTimer,PaperWorkspaceController,paperDefinitionDigest,type PaperQuestionPart,type SharedStimulus,type PaperWorkspaceConfig} from '../../web/pages/paper.ts';
import {MemoryStorageDriver,StorageError} from '../../web/runtime/storage.ts';
import {DefaultProgressStore} from '../../web/runtime/progress.ts';
import {Session} from '../../web/runtime/session.ts';
import {StandardAssessmentEngine,SCORING_VERSION,type AssessmentContract} from '../../web/runtime/assessment.ts';
import {canonicalJson,computeSha256,sameRef} from '../../web/runtime/loader.ts';
import type {Response,Kind,TaskRef,Ref,Session as SessionRecord} from '../../web/runtime/types.ts';
const NINE_ARCHETYPE_PARTS: PaperQuestionPart[] = [
  // Section A: Physics
  {
    id: 'p-phy-e1',
    partKey: '1.1',
    sectionId: 'sec-phy',
    label: 'Kinematics Multiple Choice',
    maxPoints: 3,
    archetypeId: 'PHY-E1',
    promptHtml: '<p>Select the correct velocity vector.</p>',
    solutionHtml: '<p>Option B is correct due to constant acceleration.</p>',
  },
  {
    id: 'p-phy-e2',
    partKey: '1.2',
    sectionId: 'sec-phy',
    label: 'Two-Body Kinematics Constructed Numeric',
    maxPoints: 5,
    archetypeId: 'PHY-E2',
    promptHtml: '<p>Derive the meeting point of the two projectiles.</p>',
    solutionHtml: '<p>Intersection occurs at t = 2.45 s.</p>',
  },
  {
    id: 'p-phy-e3',
    partKey: '1.3',
    sectionId: 'sec-phy',
    label: 'Experimental Pendulum Graphing',
    maxPoints: 7,
    archetypeId: 'PHY-E3',
    promptHtml: '<p>Plot T^2 vs L and compute g with uncertainties.</p>',
    solutionHtml: '<p>Slope is 4.02 s^2/m yielding g = 9.82 m/s^2.</p>',
  },

  // Section B: Chemistry
  {
    id: 'p-chm-e1',
    partKey: '2.1',
    sectionId: 'sec-chm',
    label: 'Stoichiometry Integer Calculation',
    maxPoints: 3,
    archetypeId: 'CHM-E1',
    promptHtml: '<p>Enter stoichiometric coefficient for oxygen.</p>',
    solutionHtml: '<p>Coefficient is 5.</p>',
  },
  {
    id: 'p-chm-e2',
    partKey: '2.2',
    sectionId: 'sec-chm',
    label: 'Reaction Mechanism Arrow-Pushing',
    maxPoints: 6,
    archetypeId: 'CHM-E2',
    sharedStimulusId: 'stim-organic-synth',
    promptHtml: '<p>Draw the nucleophilic acyl substitution mechanism.</p>',
    solutionHtml: '<p>Tetrahedral intermediate forms with chloride departure.</p>',
  },
  {
    id: 'p-chm-e3',
    partKey: '2.3',
    sectionId: 'sec-chm',
    label: 'Spectroscopic Elucidation',
    maxPoints: 6,
    archetypeId: 'CHM-E3',
    sharedStimulusId: 'stim-organic-synth',
    promptHtml: '<p>Identify unknown ester from IR and NMR peaks.</p>',
    solutionHtml: '<p>Compound is ethyl acetate.</p>',
  },

  // Section C: Mathematics
  {
    id: 'p-mth-e1',
    partKey: '3.1',
    sectionId: 'sec-mth',
    label: 'Combinatorics Integer Result',
    maxPoints: 3,
    archetypeId: 'MTH-E1',
    promptHtml: '<p>Find the number of valid permutations.</p>',
    solutionHtml: '<p>Total permutations = 840.</p>',
  },
  {
    id: 'p-mth-e2',
    partKey: '3.2',
    sectionId: 'sec-mth',
    label: 'Symbolic Algebraic Expression',
    maxPoints: 5,
    archetypeId: 'MTH-E2',
    promptHtml: '<p>Simplify the rational trigonometric expression.</p>',
    solutionHtml: '<p>Simplifies to 2*sin(x)/(1+cos(x)).</p>',
  },
  {
    id: 'p-mth-e3',
    partKey: '3.3',
    sectionId: 'sec-mth',
    label: 'Olympiad Inequality Deductive Proof',
    maxPoints: 7,
    archetypeId: 'MTH-E3',
    promptHtml: '<p>Prove that sum(a/(b+c)) >= 3/2 for positive real a, b, c.</p>',
    solutionHtml: '<p>Follows directly from Nesbitt inequality via Cauchy-Schwarz.</p>',
  },
];

const SECTIONS_FIXTURE = [
  { id: 'sec-phy', title: 'Section I: Physics', partIds: ['p-phy-e1', 'p-phy-e2', 'p-phy-e3'] },
  { id: 'sec-chm', title: 'Section II: Chemistry', partIds: ['p-chm-e1', 'p-chm-e2', 'p-chm-e3'] },
  { id: 'sec-mth', title: 'Section III: Mathematics', partIds: ['p-mth-e1', 'p-mth-e2', 'p-mth-e3'] },
];

const STIMULI_FIXTURE: SharedStimulus[] = [
  {
    id: 'stim-organic-synth',
    title: 'Multi-Step Ester Synthesis Reaction Sequence',
    contentHtml: '<p>Carboxylic acid refluxed with thionyl chloride followed by ethanol addition.</p>',
  },
];


const KINDS:Kind[]=['SINGLE_CHOICE','NUMERIC_QUANTITY','GRAPH','INTEGER','REACTION_MECHANISM','EXPERIMENT_ANALYSIS','INTEGER','SYMBOLIC_EXPRESSION','MATHEMATICAL_PROOF'];
const ANSWERS:Response[]=[{kind:'SINGLE_CHOICE',value:'B'},{kind:'NUMERIC_QUANTITY',value:{decimal:'2.45',unit:'s'}},{kind:'GRAPH',value:{points:[['1','4.02']]}},{kind:'INTEGER',value:'5'},{kind:'REACTION_MECHANISM',value:['step']},{kind:'EXPERIMENT_ANALYSIS',value:{observations:['peak'],conclusion:'candidate'}},{kind:'INTEGER',value:'840'},{kind:'SYMBOLIC_EXPRESSION',value:'x+1'},{kind:'MATHEMATICAL_PROOF',value:'Cauchy-Schwarz'}];
const full:PaperWorkspaceConfig={paperId:'paper:synthetic:nine',paperTitle:'Nine synthetic archetypes',durationSeconds:7200,sections:SECTIONS_FIXTURE,parts:NINE_ARCHETYPE_PARTS.map((p,i)=>({...p,responseKind:KINDS[i]})),stimuli:STIMULI_FIXTURE,allowedAids:['PERIODIC_TABLE','FORMULA_SHEET']};
const closed:PaperWorkspaceConfig={...full,paperId:'paper:synthetic:closed',parts:[full.parts[0],full.parts[3],full.parts[6]].map((p,i)=>({...p,maxPoints:[.1,.2,.3][i]})),sections:SECTIONS_FIXTURE.map((s,i)=>({...s,partIds:[full.parts[[0,3,6][i]].id]}))};
async function setup(config=full,deadlineAt=new Date(Date.now()+3600000).toISOString()){
 const driver=new MemoryStorageDriver(),task:TaskRef={type:'QUESTION',id:'que:paper:synthetic',revision:1,sha256:'a'.repeat(64)},releaseId='rel:synthetic:paper',paper:Ref<'PAPER'>={type:'PAPER',id:config.paperId,revision:1,sha256:'b'.repeat(64)};
 const parts:Record<string,AssessmentContract>={};for(const p of config.parts){const i=full.parts.findIndex(q=>q.id===p.id),answer=ANSWERS[i],mode=['SINGLE_CHOICE','INTEGER','NUMERIC_QUANTITY'].includes(answer.kind)?'AUTOMATIC':'REVIEW_PENDING';
 parts[p.id]={id:'asmt:'+p.id,task_ref:task,response_kind:answer.kind,max_points:p.maxPoints,evaluator:mode==='REVIEW_PENDING'?{mode}:{mode,canonical_value:answer.value,...(answer.kind==='SINGLE_CHOICE'?{allowed_options:['A','B','C']}:{})}};}
 const contract:AssessmentContract={id:'asmt:paper:synthetic',revision:1,task_ref:task,response_kind:'MULTIPART',max_points:config===closed?0.6:45,evaluator:{mode:'REVIEW_PENDING'},parts};
 // Nine original fixture maxima are 3+5+7+3+6+6+3+5+7 = 45.
 const assessment:Ref<'ASSESSMENT'>={type:'ASSESSMENT',id:contract.id,revision:1,sha256:await computeSha256(canonicalJson(contract))};
 const engine=new StandardAssessmentEngine([{assessment,task}]);await engine.registerContract(contract,assessment);
 const s:SessionRecord={id:'ses:paper',releaseId,item:task,mode:'SIMULATED_EXAM',deadlineAt,contentRevision:'r1',origin:null,returnRoute:null,cursor:0,attemptIds:[],draftId:null};
 await driver.put('sessions',s.id,s);
 const progress=new DefaultProgressStore(driver,async a=>a.releaseId===releaseId&&sameRef(a.item,task)&&!!a.assessmentRef&&sameRef(a.assessmentRef,assessment)&&a.scoringVersion===SCORING_VERSION&&canonicalJson(a.grade)===canonicalJson(await engine.evaluate(a.response,assessment,'SIMULATED_EXAM',task)));
 const session=new Session({sessionId:s.id,releaseId,item:task,mode:'SIMULATED_EXAM'},driver,progress,{liveRevision:async()=> 'r1',reviewedDisclosure:async()=>true});
 const binding={paper,definitionSha256:await paperDefinitionDigest(config),task,assessment,releaseId,attemptId:'att:paper',session,progress,engine,verifyRequiredAssets:async()=>true};
 const ws=new PaperWorkspaceController(config,binding);await ws.restore();return {driver,binding,ws,s};
}
function answerAll(ws:PaperWorkspaceController,config=full){for(const p of config.parts)assert.equal(ws.setPartResponse(p.id,ANSWERS[full.parts.findIndex(q=>q.id===p.id)]),true);}
describe('A30 navigation and time authority',()=>{
 it('navigates nine archetypes with flags and exact section closure',()=>{const n=new PartNavigationController({sections:full.sections,parts:full.parts});assert.equal(n.getActivePartId(),'p-phy-e1');n.toggleFlag('p-phy-e1');assert.equal(n.getSummaryCounts().flagged,1);assert(n.goToNextPart());assert(n.goToPreviousPart());assert(n.goToPart('p-mth-e3'));assert.equal(n.getActiveSection()?.id,'sec-mth');assert.throws(()=>n.restoreState({...n.exportState(),activePartId:'foreign'}));assert.throws(()=>new PartNavigationController({sections:full.sections,parts:[...full.parts,full.parts[0]]}));assert.equal((n.getParts()[0] as PaperQuestionPart).solutionHtml,undefined);});
 it('uses absolute deadline across reload and refuses clock rollback within an instance',()=>{let now=Date.parse('2026-11-18T09:00:00Z');const deadline=new Date(now+3600000).toISOString();const t=new ExamTimer(3600,deadline,()=>now);now+=10000;assert.equal(t.getRemainingSeconds(),3590);now+=5000;const reloaded=new ExamTimer(3600,deadline,()=>now);assert.equal(reloaded.getRemainingSeconds(),3585);now-=5000;assert.equal(reloaded.getRemainingSeconds(),3585);now=Date.parse(deadline);assert(reloaded.isExpired());assert.equal(reloaded.getRemainingSeconds(),0);});
 it('preview cannot save, submit, open aids or expose solution',async()=>{const w=new PaperWorkspaceController(full);assert.equal(w.setPartResponse(full.parts[0].id,3),false);assert.equal(w.openAid('PERIODIC_TABLE').allowed,false);assert.equal(w.getSolution(full.parts[0].id).allowed,false);await assert.rejects(w.restore());await assert.rejects(w.submitPaper());assert.throws(()=>w.restoreSession({...w.exportSession(),isCommitted:true}));assert.equal(w.getViewState().isCommitted,false);});
});
describe('A30 durable paper and exam policy',()=>{
 it('all nine archetypes commit as a single exact multipart attempt, pending total and sealed feedback',async()=>{const {ws,driver,binding}=await setup();answerAll(ws);assert.equal(ws.openAid('PERIODIC_TABLE').allowed,true);assert.equal(ws.openAid('CALCULATOR').allowed,false);ws.getNavigation().goToPart('p-chm-e2');assert.equal(ws.getViewState().activeStimulus?.id,'stim-organic-synth');assert.equal(ws.getSolution('p-phy-e1').allowed,false);
 const view=await ws.submitPaper();assert.equal(view.totalPoints,null);assert.equal(view.isFinal,false);assert(ws.getViewState().isCommitted);assert(view.partResults.every(p=>p.points===null));assert.equal(ws.getSolution('p-phy-e1').allowed,false);assert.equal(ws.openAid('PERIODIC_TABLE').allowed,false);assert.equal(ws.setPartResponse('p-phy-e1',ANSWERS[0]),false);
 const a:any=await driver.get('attempts',binding.attemptId);assert.equal(a.grade.status,'REVIEW_PENDING');assert.equal(a.grade.parts['p-phy-e1'].points,3);assert.equal(a.grade.parts['p-mth-e3'].points,null);assert.equal(Object.keys(a.response.value).length,9);assert.equal((await driver.getAll('attempts')).length,1);await ws.submitPaper();assert.equal((await driver.getAll('attempts')).length,1);
 });
 it('closed exact fractional grading persists but is not disclosed; arbitrary points rejected',async()=>{const {ws,driver,binding}=await setup(closed);assert.equal(ws.setPartResponse(closed.parts[0].id,1000),false);assert.equal(ws.setPartResponse(closed.parts[0].id,{kind:'INTEGER',value:'3'}),false);answerAll(ws,closed);ws.setPartResponse(closed.parts[1].id,{kind:'INTEGER',value:'99'});const result=await ws.submitPaper();const a:any=await driver.get('attempts',binding.attemptId);assert.equal(a.grade.status,'SCORED');assert.equal(a.grade.maxPoints,.6);assert.equal(a.grade.points,.4);assert.equal(result.totalPoints,null);assert(result.partResults.every(p=>p.points===null));});
 it('nonempty partial answer commits missing-part grade without fabricated total',async()=>{const {ws,driver,binding}=await setup();ws.setPartResponse(full.parts[0].id,ANSWERS[0]);const result=await ws.submitPaper();const a:any=await driver.get('attempts',binding.attemptId);assert.equal(a.grade.status,'INVALID');assert.equal(a.grade.reasonCode,'MISSING_REQUIRED_PART');assert.equal(a.grade.points,null);assert.equal(result.totalPoints,null);assert.equal(result.partResults.filter(p=>p.status==='UNANSWERED').length,8);});
 it('rejects empty, mismatched definition, expired deadline and unavailable required asset',async()=>{const {ws,binding,driver}=await setup();await assert.rejects(ws.submitPaper());const foreign=new PaperWorkspaceController({...full,paperTitle:'different'},binding);await assert.rejects(foreign.restore(),/PAPER_NOT_AUTHORIZED/);const blocked=new PaperWorkspaceController(full,{...binding,verifyRequiredAssets:async()=>false});await blocked.restore();answerAll(blocked);await assert.rejects(blocked.submitPaper(),/REQUIRED_ASSET_UNAVAILABLE/);assert.equal((await driver.getAll('attempts')).length,0);const expired=await setup(full,new Date(Date.now()-1000).toISOString());assert.equal(expired.ws.setPartResponse(full.parts[0].id,ANSWERS[0]),false);await assert.rejects(expired.ws.submitPaper(),/DEADLINE/);});
 it('draft CAS rejects stale save and stale commit, rollback preserves draft, restart recovers exact attempt',async()=>{const {ws,binding,driver,s}=await setup();answerAll(ws);ws.getNavigation().toggleFlag('p-phy-e2');ws.getNavigation().goToPart('p-chm-e2');await ws.saveDraft();const stale=new PaperWorkspaceController(full,binding);await stale.restore();const fresh=new PaperWorkspaceController(full,binding);await fresh.restore();assert.equal(fresh.getViewState().activePartId,'p-chm-e2');assert(fresh.getNavigation().isFlagged('p-phy-e2'));fresh.setPartResponse('p-chm-e1',{kind:'INTEGER',value:'6'});await fresh.saveDraft();await assert.rejects(stale.submitPaper(),/Stale draft revision/);await assert.rejects(stale.saveDraft(),/Stale draft revision/);assert.equal((await driver.getAll('attempts')).length,0);
 driver.setFailureHook((store,op)=>store==='sessions'&&op==='put'?new StorageError('TRANSACTION_ABORTED','injected'):null);await assert.rejects(fresh.submitPaper());assert.equal(fresh.getViewState().isCommitted,false);assert.equal((await driver.getAll('attempts')).length,0);assert.equal((await binding.progress.loadDraft(s.id))?.revision,2);driver.setFailureHook(null);await fresh.submitPaper();const restored=new PaperWorkspaceController(full,binding);await restored.restore();assert(restored.getViewState().isCommitted);assert.equal(restored.getPartResponse('p-chm-e1')?.value,'6');assert.equal(restored.getSolution('p-phy-e1').allowed,false);assert.equal((await driver.getAll('attempts')).length,1);assert.equal(await binding.progress.loadDraft(s.id),null);
 });
 it('history export/import cannot become a local examination commitment',async()=>{const {ws,binding,driver,s}=await setup();answerAll(ws);await ws.submitPaper();const blob=await binding.progress.exportAll();const clean=new MemoryStorageDriver(),p=new DefaultProgressStore(clean,async()=>true);await p.importVerified(blob);const session=new Session({sessionId:s.id,releaseId:s.releaseId,item:s.item,mode:s.mode},clean,p,{liveRevision:async()=> 'r1',reviewedDisclosure:async()=>true});const reopened=new PaperWorkspaceController(full,{...binding,session,progress:p});await assert.rejects(reopened.restore(),/UNQUALIFIED_PAPER_COMMIT/);assert.equal(reopened.getViewState().isCommitted,false);assert.equal(reopened.getSolution('p-phy-e1').allowed,false);});
});
it('actual Chromium: paper navigation/prompt cannot create active markup',async()=>{const browser=await chromium.launch({headless:true});try{const page=await browser.newPage();const w=new PaperWorkspaceController({...full,paperTitle:'<img src=x onerror=alert(1)>',parts:full.parts.map(p=>({...p,label:'" onmouseover="alert(1)',promptHtml:'<svg onload=alert(1)><p>safe</p>'}))});await page.setContent(w.render());assert.equal(await page.locator('img,svg,[onerror],[onmouseover],[onload]').count(),0);assert.equal(await page.locator('#submit-paper-btn').isDisabled(),true);assert.equal(await page.locator('.part-prompt p').textContent(),'safe');}finally{await browser.close();}});
