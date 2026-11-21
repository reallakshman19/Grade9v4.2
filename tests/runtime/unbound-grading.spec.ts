import assert from 'node:assert/strict';
import {test} from 'node:test';
import {createQuestionWorkspace, type WorkspaceQuestionDescriptor} from '../../web/components/question-workspace.ts';
import {createQuestionPage} from '../../web/pages/question.ts';

const base:WorkspaceQuestionDescriptor={
  id:'unbound:q1',code:'Q1',title:'Unbound diagnostic',stemText:'Choose A.',
  kind:'SINGLE_CHOICE',options:[{id:'OPT-A',text:'A'},{id:'OPT-B',text:'B'}],
  status:'RELEASED',keyStatus:'VERIFIED',maxPoints:2,correctKey:'OPT-A',
};
test('unbound question never grades caller-supplied answer and never exposes client key',async()=>{
  const ws=createQuestionWorkspace(base);
  assert.equal(ws.getViewState().question.correctKey,undefined);
  ws.updateResponse({kind:'SINGLE_CHOICE',selectedOptionId:'OPT-A'});
  const result=await ws.submit();
  assert.deepEqual([result.status,result.rawPoints,result.reasonCode],['REVIEW_PENDING',null,'UNBOUND_ASSESSMENT']);
  assert.equal(ws.getViewState().isLocked,false);
  assert.equal(ws.getViewState().question.correctKey,undefined);
});
test('unbound missing key cannot grant default full marks',async()=>{
  const ws=createQuestionWorkspace({...base,correctKey:undefined});
  ws.updateResponse({kind:'SINGLE_CHOICE',selectedOptionId:'OPT-B'});
  const result=await ws.submit();
  assert.equal(result.status,'REVIEW_PENDING');
  assert.equal(result.rawPoints,null);
});
test('HOLD and ambiguous question status dominate any caller supplied key',async()=>{
  for(const [question,status] of [
    [{...base,status:'HOLD' as const},'HOLD_UNGRADED'],
    [{...base,keyStatus:'AMBIGUOUS' as const},'REVIEW_PENDING'],
  ] as const){
    const ws=createQuestionWorkspace(question);
    ws.updateResponse({kind:'SINGLE_CHOICE',selectedOptionId:'OPT-A'});
    const result=await ws.submit();
    assert.equal(result.status,status);
    assert.equal(result.rawPoints,null);
  }
  const page=createQuestionPage('phys','wpe');
  page.loadQuestion({...base,status:'HOLD'});
  assert.equal(page.getViewState().pageStatus,'HOLD_LOCKED');
  page.reset();
  assert.equal(page.getViewState().pageStatus,'HOLD_LOCKED');
});
