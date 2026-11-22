import assert from 'node:assert/strict';
import {test} from 'node:test';
import {createNsejsPaperWorkspaceConfig} from '../../web/runtime/nsejs-session.ts';
import {calculateNsejsDiagnostic,NSEJS_HELD_QUESTIONS} from '../../web/runtime/nsejs-provisional-score.ts';
import type {SealedPaperReview} from '../../web/runtime/sealed-paper-review.ts';
import type {Response} from '../../web/runtime/types.ts';

const cfg=createNsejsPaperWorkspaceConfig();
function setup(answers:Record<string,string>,config=cfg){
 const responses=new Map<string,Response>();
 for(const [id,value] of Object.entries(answers))responses.set(id,{kind:'SINGLE_CHOICE',value});
 const review:SealedPaperReview={
  paperId:config.paperId,status:'REVIEW_PENDING',maxMarks:180,totalScore:null,accuracy:null,
  recordedCount:responses.size,unansweredCount:60-responses.size,
  parts:config.parts.map(p=>({partId:p.id,partKey:p.partKey,sectionId:p.sectionId,
    responseState:responses.has(p.id)?'RECORDED':'UNANSWERED',points:null})),
  sections:config.sections.map(sec=>({sectionId:sec.id,title:sec.title,
    recordedCount:sec.partIds.filter(id=>responses.has(id)).length,
    unansweredCount:sec.partIds.filter(id=>!responses.has(id)).length})),
 };
 return {review,responses,grade:()=>calculateNsejsDiagnostic(review,config.parts,id=>responses.get(id))};
}
test('NSEJS authored provisional score applies +3/-1/0, excludes defective questions',()=>{
 const {grade}=setup({'nsejs-p-01':'B','nsejs-p-02':'A','nsejs-p-04':'B','nsejs-c-21':'A','nsejs-b-41':'A'});
 const r=grade();assert(r);assert.equal(r.netScore,8);assert.equal(r.scorableMax,171);
 assert.equal(r.paperMax,180);assert.equal(r.correct,3);assert.equal(r.incorrect,1);assert.equal(r.attempted,5);
 assert.equal(r.unanswered,55);assert.equal(r.held,3);assert.equal(r.scoreAccuracyPercent,75);
 assert.equal(r.questions[0].status,'KEY_HOLD');assert.equal(r.questions[0].points,null);
 assert.equal(r.questions[2].status,'KEY_HOLD');assert.equal(r.questions[15].status,'KEY_HOLD');
 assert.equal(r.questions[1].points,3);assert.equal(r.questions[3].points,-1);
 assert.deepEqual(r.sections.map(s=>[s.points,s.held]),[[2,3],[3,0],[3,0]]);
 assert.equal(Object.keys(NSEJS_HELD_QUESTIONS).length,3);
 assert.doesNotMatch(JSON.stringify(r),/solutionHtml|correctOption|modelAnswer|officialKey/);
});
test('single submitted wrong-key Q1 remains held rather than being falsely graded',()=>{
 const r=setup({'nsejs-p-01':'B'}).grade();
 assert(r);assert.equal(r.netScore,0);assert.equal(r.correct,0);assert.equal(r.incorrect,0);
 assert.equal(r.attempted,1);assert.equal(r.scoreAccuracyPercent,null);
});
test('unanswered 60 questions do not invent accuracy or marks',()=>{
 const r=setup({}).grade();assert(r);assert.equal(r.netScore,0);assert.equal(r.scoreAccuracyPercent,null);
 assert.equal(r.unanswered,60);assert.equal(r.scorableMax,171);
});
test('unbound/foreign/reordered scores fail closed',()=>{
 const x=setup({'nsejs-p-02':'A'});
 assert.equal(calculateNsejsDiagnostic({...x.review,paperId:'paper:ioqm-challenge-a'},cfg.parts,id=>x.responses.get(id)),null);
 assert.equal(calculateNsejsDiagnostic({...x.review,parts:x.review.parts.slice().reverse()},cfg.parts,id=>x.responses.get(id)),null);
 assert.equal(calculateNsejsDiagnostic(x.review,cfg.parts.slice().reverse(),id=>x.responses.get(id)),null);
 assert.equal(calculateNsejsDiagnostic(x.review,cfg.parts,id=>id==='nsejs-p-02'?{kind:'INTEGER',value:'10'}:x.responses.get(id)),null);
 assert.equal(calculateNsejsDiagnostic({...x.review,recordedCount:59},cfg.parts,id=>x.responses.get(id)),null);
});
