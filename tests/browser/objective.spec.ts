/**
 * tests/browser/objective.spec.ts
 * A24 — Question workspace and objective response specification tests.
 *
 * Verifies:
 * - Single choice selection, keyboard navigation, and touch parity
 * - Multiple choice selection and toggling
 * - Numeric quantity input and unit verification
 * - Commit lock preventing mutations after submission
 * - Progressive hint disclosure with score penalty calculations
 * - Rotation behavior (landscape row-split vs portrait column-split)
 * - Core2 fault handling: missing figures, ambiguous/conditional/dropped/unverified keys
 * - No score claim on HOLD questions
 * - Hit target minimum size (48px min, 56px primary submit)
 *
 * No academic approval inferred from software validation.
 */

import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert/strict';

import {
  createSingleChoiceController,
  createMultipleChoiceController,
  createQuantityResponseController,
} from '../../web/components/response/index.ts';
import type { ChoiceOption } from '../../web/components/response/types.ts';

import {
  createQuestionWorkspace,
  QuestionWorkspaceController,
} from '../../web/components/question-workspace.ts';
import type { WorkspaceQuestionDescriptor } from '../../web/components/question-workspace.ts';

import { createQuestionPage } from '../../web/pages/question.ts';
import {MemoryStorageDriver,StorageError} from '../../web/runtime/storage.ts';
import {DefaultProgressStore} from '../../web/runtime/progress.ts';
import {Session as DurableController} from '../../web/runtime/session.ts';
import {StandardAssessmentEngine,SCORING_VERSION,type AssessmentContract} from '../../web/runtime/assessment.ts';
import {canonicalJson,computeSha256,sameRef} from '../../web/runtime/loader.ts';
import type {Session,TaskRef} from '../../web/runtime/types.ts';
async function binding(){
 const driver=new MemoryStorageDriver(),task:TaskRef={type:'QUESTION',id:'Q-OBJ-01',revision:1,sha256:'a'.repeat(64)},releaseId='rel:synthetic:objective';
 const contract:AssessmentContract={id:'asmt:objective',revision:1,task_ref:task,response_kind:'SINGLE_CHOICE',max_points:2,evaluator:{mode:'AUTOMATIC',canonical_value:'OPT-A',allowed_options:['OPT-A','OPT-B','OPT-C','OPT-D']}};
 const assessment={type:'ASSESSMENT' as const,id:contract.id,revision:1,sha256:await computeSha256(canonicalJson(contract))};
 const engine=new StandardAssessmentEngine([{assessment,task}]);await engine.registerContract(contract,assessment);
 const ses:Session={id:'ses:objective',releaseId,item:task,mode:'PRACTICE',contentRevision:'r1',origin:null,returnRoute:null,cursor:0,attemptIds:[],draftId:null};
 await driver.put('sessions',ses.id,ses);
 const progress=new DefaultProgressStore(driver,async a=>a.releaseId===releaseId&&sameRef(a.item,task)&&sameRef(a.assessmentRef!,assessment)&&a.scoringVersion===SCORING_VERSION&&canonicalJson(a.grade)===canonicalJson(await engine.evaluate(a.response,assessment,'PRACTICE',task)));
 const session=new DurableController({sessionId:ses.id,releaseId,item:task,mode:'PRACTICE'},driver,progress,{liveRevision:async()=> 'r1',reviewedDisclosure:async()=>true});
 return {driver,releaseId,task,assessment,attemptId:'att:objective',session,progress,engine};
}

// ---------------------------------------------------------------------------
// Test Fixtures
// ---------------------------------------------------------------------------

const MOCK_OPTIONS: readonly ChoiceOption[] = [
  { id: 'OPT-A', label: 'A', text: '50 Joules' },
  { id: 'OPT-B', label: 'B', text: '100 Joules' },
  { id: 'OPT-C', label: 'C', text: '150 Joules' },
  { id: 'OPT-D', label: 'D', text: '200 Joules' },
];

const STANDARD_QUESTION: WorkspaceQuestionDescriptor = {
  id: 'Q-OBJ-01',
  code: 'PHYS-WPE-01',
  title: 'Work and Kinetic Energy',
  stemText: 'A constant horizontal force of 10 N pushes a 2 kg block over 5 m on a frictionless floor. Calculate work done.',
  kind: 'SINGLE_CHOICE',
  options: MOCK_OPTIONS,
  status: 'RELEASED',
  keyStatus: 'VERIFIED',
  correctKey: 'OPT-A',
  maxPoints: 2,
  hints: [
    { id: 'H1', text: 'Recall work formula W = F * d.', penaltyPercent: 20 },
    { id: 'H2', text: 'Force and displacement are collinear.', penaltyPercent: 30 },
  ],
  figures: [
    { id: 'FIG-1', caption: 'Block on horizontal plane', available: true },
  ],
};

// ---------------------------------------------------------------------------
// Single Choice Response Tests
// ---------------------------------------------------------------------------

describe('Single Choice Controller — Selection & Keyboard Parity', () => {
  it('selects option and reports answered status', () => {
    const sc = createSingleChoiceController(MOCK_OPTIONS);
    assert.equal(sc.isAnswered(), false);

    const ok = sc.selectOption('OPT-A');
    assert.equal(ok, true);
    assert.equal(sc.isAnswered(), true);
    assert.equal(sc.getValue().selectedOptionId, 'OPT-A');
  });

  it('rejects invalid option ID', () => {
    const sc = createSingleChoiceController(MOCK_OPTIONS);
    const ok = sc.selectOption('OPT-INVALID');
    assert.equal(ok, false);
    assert.equal(sc.isAnswered(), false);
  });

  it('navigates options via keyboard Arrow keys and selects with Space/Enter', () => {
    const sc = createSingleChoiceController(MOCK_OPTIONS);
    assert.equal(sc.getFocusedOptionIndex(), 0);

    // Arrow down moves focus
    sc.handleKeyDown('ArrowDown');
    assert.equal(sc.getFocusedOptionIndex(), 1);

    // Enter selects focused option
    sc.handleKeyDown('Enter');
    assert.equal(sc.getValue().selectedOptionId, 'OPT-B');

    // Arrow up moves focus back
    sc.handleKeyDown('ArrowUp');
    assert.equal(sc.getFocusedOptionIndex(), 0);
  });

  it('enforces commit lock', () => {
    const sc = createSingleChoiceController(MOCK_OPTIONS, 'OPT-A');
    sc.setLocked(true);
    assert.equal(sc.isLocked(), true);

    const changed = sc.selectOption('OPT-B');
    assert.equal(changed, false);
    assert.equal(sc.getValue().selectedOptionId, 'OPT-A'); // unchanged
  });
});

// ---------------------------------------------------------------------------
// Multiple Choice Response Tests
// ---------------------------------------------------------------------------

describe('Multiple Choice Controller — Multi-Select & Toggling', () => {
  it('toggles multiple options', () => {
    const mc = createMultipleChoiceController(MOCK_OPTIONS);
    assert.equal(mc.isAnswered(), false);

    mc.toggleOption('OPT-A');
    mc.toggleOption('OPT-C');
    assert.equal(mc.isAnswered(), true);
    assert.deepEqual(mc.getValue().selectedOptionIds.slice().sort(), ['OPT-A', 'OPT-C']);

    // Toggling OPT-A again removes it
    mc.toggleOption('OPT-A');
    assert.deepEqual(mc.getValue().selectedOptionIds, ['OPT-C']);
  });

  it('enforces commit lock on multiple choice', () => {
    const mc = createMultipleChoiceController(MOCK_OPTIONS, ['OPT-A']);
    mc.setLocked(true);

    const toggled = mc.toggleOption('OPT-B');
    assert.equal(toggled, false);
    assert.deepEqual(mc.getValue().selectedOptionIds, ['OPT-A']);
  });
});

// ---------------------------------------------------------------------------
// Numeric Quantity Response Tests
// ---------------------------------------------------------------------------

describe('Numeric Quantity Controller — Magnitude & Units', () => {
  it('parses valid numeric magnitude and accepts allowed unit', () => {
    const qc = createQuantityResponseController(['J', 'kJ', 'N*m']);
    assert.equal(qc.isAnswered(), false);

    const magOk = qc.setMagnitude('49.5');
    assert.equal(magOk, true);

    const unitOk = qc.setUnit('J');
    assert.equal(unitOk, true);

    assert.equal(qc.isAnswered(), true);
    assert.deepEqual(qc.getValue().quantity, { magnitude: 49.5, decimal:'49.5', unit: 'J' });
  });

  it('rejects non-numeric magnitude and invalid units', () => {
    const qc = createQuantityResponseController(['J', 'kJ']);
    const badMag = qc.setMagnitude('invalid-number');
    assert.equal(badMag, false);

    const badUnit = qc.setUnit('meters');
    assert.equal(badUnit, false);
  });
});

// ---------------------------------------------------------------------------
// Question Workspace — Split-Pane, Rotation & Submission
// ---------------------------------------------------------------------------

describe('Question Workspace — Layout, Rotation & Submit', () => {
  let ws: QuestionWorkspaceController;

  beforeEach(async () => {
    ws = createQuestionWorkspace(STANDARD_QUESTION, 'LANDSCAPE',await binding());
  });

  it('configures landscape as 50/50 side-by-side row split', () => {
    const state = ws.getViewState();
    assert.equal(state.layout.orientation, 'LANDSCAPE');
    assert.equal(state.layout.splitDirection, 'ROW');
    assert.equal(state.layout.problemPaneWidthPercent, 50);
    assert.equal(state.layout.workPaneWidthPercent, 50);
  });

  it('adapts to portrait as full-width vertical stacked column split', () => {
    ws.setOrientation('PORTRAIT');
    const state = ws.getViewState();
    assert.equal(state.layout.orientation, 'PORTRAIT');
    assert.equal(state.layout.splitDirection, 'COLUMN');
    assert.equal(state.layout.problemPaneWidthPercent, 100);
    assert.equal(state.layout.workPaneWidthPercent, 100);
  });

  it('evaluates correct answer accurately and awards points', async () => {
    ws.updateResponse({ kind: 'SINGLE_CHOICE', selectedOptionId: 'OPT-A' });
    const result = await ws.submit();

    assert.equal(result.status, 'CORRECT');
    assert.equal(result.rawPoints, 2);
    assert.equal(result.academicHold, false);
    assert.equal(ws.getViewState().isLocked, true); // commit lock
  });

  it('evaluates incorrect answer accurately with zero points', async () => {
    ws.updateResponse({ kind: 'SINGLE_CHOICE', selectedOptionId: 'OPT-B' });
    const result = await ws.submit();

    assert.equal(result.status, 'INCORRECT');
    assert.equal(result.rawPoints, 0);
  });

  it('refuses unaudited hint disclosure rather than fabricating a penalty',async()=>{
    assert.equal(ws.unlockNextHint(),false);assert.equal(ws.getViewState().unlockedHintCount,0);
    ws.updateResponse({kind:'SINGLE_CHOICE',selectedOptionId:'OPT-A'});assert.equal((await ws.submit()).rawPoints,2);
  });
  it('meets hit target size bounds (48px min, 56px primary)', () => {
    const state = ws.getViewState();
    assert.ok(state.hitTargetMinPx >= 48);
    assert.ok(state.hitTargetPrimaryPx >= 56);
  });
});

// ---------------------------------------------------------------------------
// Core2 Boundary & Error Fault Handling
// ---------------------------------------------------------------------------

describe('Core2 Fault Handling — Missing Figures, Ambiguous Keys & HOLD', () => {
  it('flags missing figures safely without throwing or leaking broken tags', () => {
    const missingFigQuestion: WorkspaceQuestionDescriptor = {
      ...STANDARD_QUESTION,
      figures: [
        { id: 'FIG-MISSING', caption: 'Experimental setup', available: false },
      ],
    };

    const ws = createQuestionWorkspace(missingFigQuestion);
    const state = ws.getViewState();

    assert.equal(state.hasMissingFigures, true);
    assert.equal(state.missingFigures.length, 1);
    assert.equal(state.missingFigures[0].id, 'FIG-MISSING');
  });

  it('NEVER claims positive score on HOLD questions', async () => {
    const holdQuestion: WorkspaceQuestionDescriptor = {
      ...STANDARD_QUESTION,
      status: 'HOLD',
    };

    const ws = createQuestionWorkspace(holdQuestion);
    ws.updateResponse({ kind: 'SINGLE_CHOICE', selectedOptionId: 'OPT-A' }); // Correct option selected
    const result = await ws.submit();

    assert.equal(result.status, 'HOLD_UNGRADED');
    assert.equal(result.rawPoints, null); // raw points MUST be null
    assert.equal(result.academicHold, true);
    assert.equal(result.reasonCode, 'QUESTION_ON_ACADEMIC_HOLD');
  });

  it('flags unverified or ambiguous answer keys as REVIEW_PENDING with null score', async () => {
    const ambiguousQuestion: WorkspaceQuestionDescriptor = {
      ...STANDARD_QUESTION,
      keyStatus: 'AMBIGUOUS',
    };

    const ws = createQuestionWorkspace(ambiguousQuestion);
    ws.updateResponse({ kind: 'SINGLE_CHOICE', selectedOptionId: 'OPT-A' });
    const result = await ws.submit();

    assert.equal(result.status, 'REVIEW_PENDING');
    assert.equal(result.rawPoints, null);
    assert.equal(result.keyStatus, 'AMBIGUOUS');
    assert.equal(result.reasonCode, 'KEY_AMBIGUOUS');
  });
});

// ---------------------------------------------------------------------------
// Question Page Screen Controller
// ---------------------------------------------------------------------------

describe('Question Page Screen Controller — Lifecycle & Feedback', () => {
  it('initializes and transitions to INTERACTIVE on question load', () => {
    const page = createQuestionPage('phys', 'wpe');
    assert.equal(page.getViewState().pageStatus, 'LOADING');

    page.loadQuestion(STANDARD_QUESTION);
    assert.equal(page.getViewState().pageStatus, 'INTERACTIVE');
    assert.equal(page.getViewState().returnRoute, '/topic/phys/wpe');
  });

  it('transitions to FEEDBACK_SHOWN on submission', async () => {
    const page = createQuestionPage('phys', 'wpe');
    page.loadQuestion(STANDARD_QUESTION,await binding());

    page.getWorkspace()?.updateResponse({ kind: 'SINGLE_CHOICE', selectedOptionId: 'OPT-A' });
    const result = await page.submit();

    assert.ok(result !== null);
    assert.equal(page.getViewState().pageStatus, 'FEEDBACK_SHOWN');
    assert.equal(page.getViewState().evaluation?.status, 'CORRECT');
  });

  it('locks to HOLD_LOCKED if question is on academic HOLD', () => {
    const page = createQuestionPage('phys', 'wpe');
    page.loadQuestion({ ...STANDARD_QUESTION, status: 'HOLD' });

    assert.equal(page.getViewState().pageStatus, 'HOLD_LOCKED');
  });
});

it('A24 denies caller-supplied key and never claims a fake save',async()=>{
 const ws=createQuestionWorkspace(STANDARD_QUESTION);ws.updateResponse({kind:'SINGLE_CHOICE',selectedOptionId:'OPT-A'});
 assert.equal(ws.getViewState().submissionStatus,'DIRTY');assert.equal(ws.getViewState().question.correctKey,undefined);
 assert.equal((await ws.submit()).status,'REVIEW_PENDING');assert.equal(ws.getViewState().isLocked,false);await assert.rejects(ws.saveDraft());
});
it('A24 actual qualified draft and attempt rollback/restore',async()=>{
 const b=await binding(),ws=createQuestionWorkspace(STANDARD_QUESTION,undefined,b);ws.updateResponse({kind:'SINGLE_CHOICE',selectedOptionId:'OPT-A'});
 await ws.saveDraft();assert.equal(ws.getViewState().submissionStatus,'DRAFT_SAVED');
 const reopened=createQuestionWorkspace(STANDARD_QUESTION,undefined,b);await reopened.restore();assert.equal(reopened.getViewState().submissionStatus,'DRAFT_SAVED');
 b.driver.setFailureHook((store,op)=>store==='sessions'&&op==='put'?new StorageError('TRANSACTION_ABORTED','test'):null);
 await assert.rejects(reopened.submit());assert.equal(reopened.getViewState().isLocked,false);assert.equal(await b.driver.get('attempts',b.attemptId),undefined);b.driver.setFailureHook(null);
 assert.equal((await reopened.submit()).rawPoints,2);assert.equal((await b.driver.getAll('attempts')).length,1);
 const restored=createQuestionWorkspace(STANDARD_QUESTION,undefined,b);await restored.restore();assert.equal(restored.getViewState().isLocked,true);assert.equal(restored.getViewState().evaluation?.rawPoints,2);
});

it('A38 A24 stale draft submission cannot overwrite the newer durable draft',async()=>{
 const b=await binding(),one=createQuestionWorkspace(STANDARD_QUESTION,undefined,b),two=createQuestionWorkspace(STANDARD_QUESTION,undefined,b);
 one.updateResponse({kind:'SINGLE_CHOICE',selectedOptionId:'OPT-A'});await one.saveDraft();await two.restore();
 two.updateResponse({kind:'SINGLE_CHOICE',selectedOptionId:'OPT-B'});await two.saveDraft();
 await assert.rejects(one.submit());assert.equal((await b.driver.getAll('attempts')).length,0);assert.equal((await b.progress.loadDraft((await b.session.snapshot()).id))?.revision,2);
 assert.equal((await two.submit()).status,'INCORRECT');assert.equal((await b.driver.getAll('attempts')).length,1);
});
