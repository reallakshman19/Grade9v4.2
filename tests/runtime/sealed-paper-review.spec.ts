import assert from 'node:assert/strict';
import {test} from 'node:test';
import {deriveSealedPaperReview} from '../../web/runtime/sealed-paper-review.ts';
import type {PaperViewState} from '../../web/pages/paper.ts';

const parts=[
  {id:'p-1',partKey:'1',sectionId:'physics',archetypeId:'PHY-E1',maxPoints:3},
  {id:'p-2',partKey:'2',sectionId:'physics',archetypeId:'PHY-E1',maxPoints:3},
  {id:'p-3',partKey:'3',sectionId:'math',archetypeId:'MTH-E1',maxPoints:4},
];
const sections=[
  {id:'physics',title:'Physics',partIds:['p-1','p-2']},
  {id:'math',title:'Mathematics',partIds:['p-3']},
];
const pending={
  status:'REVIEW_PENDING' as const,totalPoints:null,maxPoints:10,isFinal:false,
  summaryFeedback:'Scores sealed by exam policy',
  partResults:[
    {partId:'p-1',archetypeId:'PHY-E1',status:'REVIEW_PENDING' as const,points:null,maxPoints:3,responseValue:{kind:'SINGLE_CHOICE',value:'B'}},
    {partId:'p-2',archetypeId:'PHY-E1',status:'UNANSWERED' as const,points:null,maxPoints:3,responseValue:null},
    {partId:'p-3',archetypeId:'MTH-E1',status:'REVIEW_PENDING' as const,points:null,maxPoints:4,responseValue:{kind:'INTEGER',value:'99'}},
  ],
};
const state={
  paperId:'paper:synthetic',ready:true,isCommitted:true,evaluation:pending,
} as PaperViewState;

test('mock-paper review counts answers but cannot invent IOQM marks, answers or correctness',()=>{
  const r=deriveSealedPaperReview(state,parts,sections);
  assert(r);assert.equal(r.status,'REVIEW_PENDING');
  assert.equal(r.recordedCount,2);assert.equal(r.unansweredCount,1);
  assert.equal(r.totalScore,null);assert.equal(r.accuracy,null);
  assert.equal(r.maxMarks,10);
  assert.deepEqual(r.sections.map(s=>[s.title,s.recordedCount,s.unansweredCount]),[['Physics',1,1],['Mathematics',1,0]]);
  assert.deepEqual(r.parts.map(p=>[p.responseState,p.points]),[['RECORDED',null],['UNANSWERED',null],['RECORDED',null]]);
  assert.doesNotMatch(JSON.stringify(r),/correctOption|correctKey|solutionHtml|responseValue|SCORED|99|OPT-A/);
});
test('source self-attestation, scored snippets and mismatched identities cannot unseal an exam review',()=>{
  assert.equal(deriveSealedPaperReview({...state,isCommitted:false},parts,sections),null);
  assert.equal(deriveSealedPaperReview({...state,ready:false},parts,sections),null);
  assert.equal(deriveSealedPaperReview({...state,evaluation:{...pending,status:'SCORED'}},parts,sections),null);
  assert.equal(deriveSealedPaperReview({...state,evaluation:{...pending,isFinal:true}},parts,sections),null);
  assert.equal(deriveSealedPaperReview({...state,evaluation:{...pending,totalPoints:7}},parts,sections),null);
  assert.equal(deriveSealedPaperReview({...state,evaluation:{...pending,partResults:pending.partResults.map((r,i)=>i===0?{...r,points:3}:r)}},parts,sections),null);
  assert.equal(deriveSealedPaperReview({...state,evaluation:{...pending,partResults:pending.partResults.map((r,i)=>i===0?{...r,partId:'foreign'}:r)}},parts,sections),null);
  assert.equal(deriveSealedPaperReview(state,parts,[{...sections[0],partIds:['p-1','p-2','p-3']},sections[1]]),null);
});
