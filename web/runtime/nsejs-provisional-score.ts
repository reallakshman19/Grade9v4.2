/**
 * Authored-key NSEJS practice diagnostic. NOT an official grade, reviewed key,
 * academic admission or a replacement for StandardAssessmentEngine.
 *
 * Only called after a qualifying durable SIMULATED_EXAM commit. Three questions
 * are held for explicit demonstrated source defects (1,3,16); all other scores
 * are provisional and may change only with a separately versioned question set.
 * Never use this projection to mutate Attempt.grade or allow solutions.
 */
import {NSEJS_MOCK1_QUESTIONS} from '../pages/nsejs-mock1-data.ts';
import type {SealedPaperReview} from './sealed-paper-review.ts';
import type {Response} from './types.ts';
import type {PaperQuestionPart} from '../pages/paper.ts';

export const NSEJS_DIAGNOSTIC_REVISION='nsejs-mock1-authored-key-v1-provisional';
export const NSEJS_HELD_QUESTIONS:Readonly<Record<number,string>>=Object.freeze({
  1:'Source derivation does not match any option (catch-up time about 15.66 s).',
  3:'Source computation gives 7.5 m/s but no option matches.',
  16:'Calculated beat frequency is about 70.83 Hz, but no option matches.',
});

export type DiagnosticStatus='PROVISIONAL_CORRECT'|'PROVISIONAL_INCORRECT'|'UNANSWERED'|'KEY_HOLD';
export interface DiagnosticQuestion {
  readonly partId:string;
  readonly number:number;
  readonly sectionId:string;
  readonly topic:string;
  readonly selected:'A'|'B'|'C'|'D'|null;
  readonly status:DiagnosticStatus;
  readonly points:number|null;
  readonly maxPoints:number;
  readonly issue:string|null;
}
export interface DiagnosticSection {
  readonly sectionId:string;
  readonly title:string;
  readonly attempted:number;
  readonly correct:number;
  readonly incorrect:number;
  readonly held:number;
  readonly unanswered:number;
  readonly points:number;
  readonly eligibleMax:number;
}
export interface NsejsDiagnosticScore {
  readonly status:'PROVISIONAL_AUTHOR_KEY';
  readonly revision:typeof NSEJS_DIAGNOSTIC_REVISION;
  readonly totalQuestions:60;
  readonly paperMax:180;
  readonly scorableMax:number;
  readonly netScore:number;
  readonly correct:number;
  readonly incorrect:number;
  readonly held:number;
  readonly attempted:number;
  readonly unanswered:number;
  readonly scoreAccuracyPercent:number|null;
  readonly questions:readonly DiagnosticQuestion[];
  readonly sections:readonly DiagnosticSection[];
}

const KEYS='B'+'A'.repeat(59);
// Freeze the authored dataset mapping for this scoring revision. Do not silently
// re-use the same key revision after a question/key change.
export function calculateNsejsDiagnostic(
 review:SealedPaperReview|null,
 parts:readonly Pick<PaperQuestionPart,'id'|'partKey'|'sectionId'|'maxPoints'|'archetypeId'|'label'>[],
 getResponse:(id:string)=>Response|undefined,
):NsejsDiagnosticScore|null{
 if(!review||review.status!=='REVIEW_PENDING'||review.paperId!=='paper:nsejs-2024-mock-1'||
    review.parts.length!==60||parts.length!==60||NSEJS_MOCK1_QUESTIONS.length!==60)return null;
 const questions:DiagnosticQuestion[]=[];
 for(let i=0;i<60;i++){
   const q=NSEJS_MOCK1_QUESTIONS[i],p=parts[i],r=review.parts[i],num=i+1;
   const subject=i<20?'physics':i<40?'chemistry':'biology';
   const prefix=subject==='physics'?'p':subject==='chemistry'?'c':'b';
   const expectedId='nsejs-'+prefix+'-'+String(num).padStart(2,'0');
   const expectedArchetype='NSEJS-'+subject.toUpperCase()+'-MCQ';
   const expectedSection='sec-nsejs-'+subject;
   // Refuse to grade an unrelated, reordered, tampered or re-keyed paper.
   if(!q||!p||!r||q.partNumber!==num||q.correctOption!==KEYS[i]||
      q.subject!==subject.toUpperCase()||q.sectionId!==expectedSection||
      p.id!==expectedId||p.partKey!==String(num)||p.sectionId!==expectedSection||
      p.archetypeId!==expectedArchetype||p.maxPoints!==3||
      r.partId!==p.id||r.sectionId!==p.sectionId||r.partKey!==p.partKey||
      q.options.length!==4||!q.options.every(x=>typeof x==='string'&&x.trim())||
      !q.stem.trim()||!q.solutionHtml.trim())return null;
   const response=getResponse(p.id);
   const selected=response?.kind==='SINGLE_CHOICE'?response.value:null;
   if((r.responseState==='RECORDED')!==!!response||
      (response!==undefined&&(!['A','B','C','D'].includes(String(selected)))))return null;
   const held=Object.hasOwn(NSEJS_HELD_QUESTIONS,num);
   const status:DiagnosticStatus=held?'KEY_HOLD':!response?'UNANSWERED':
     selected===q.correctOption?'PROVISIONAL_CORRECT':'PROVISIONAL_INCORRECT';
   const points=held?null:status==='PROVISIONAL_CORRECT'?3:status==='PROVISIONAL_INCORRECT'?-1:0;
   questions.push({
     partId:p.id,number:num,sectionId:p.sectionId,topic:q.topic,
     selected:selected as ('A'|'B'|'C'|'D'|null),status,points,maxPoints:3,
     issue:held?NSEJS_HELD_QUESTIONS[num]:null,
   });
 }
 const sections:DiagnosticSection[]=review.sections.map(s=>{
   const list=questions.filter(q=>q.sectionId===s.sectionId);
   return {
     sectionId:s.sectionId,title:s.title,
     attempted:list.filter(q=>q.selected!==null).length,
     correct:list.filter(q=>q.status==='PROVISIONAL_CORRECT').length,
     incorrect:list.filter(q=>q.status==='PROVISIONAL_INCORRECT').length,
     held:list.filter(q=>q.status==='KEY_HOLD').length,
     unanswered:list.filter(q=>q.status==='UNANSWERED').length,
     points:list.reduce((n,q)=>n+(q.points??0),0),
     eligibleMax:list.filter(q=>q.status!=='KEY_HOLD').length*3,
   };
 });
 if(sections.length!==3||sections.reduce((n,s)=>n+s.attempted,0)!==review.recordedCount||
    questions.filter(q=>q.selected===null).length!==review.unansweredCount)return null;
 const correct=questions.filter(q=>q.status==='PROVISIONAL_CORRECT').length;
 const incorrect=questions.filter(q=>q.status==='PROVISIONAL_INCORRECT').length;
 const attempted=questions.filter(q=>q.selected!==null).length;
 const eligible=correct+incorrect;
 return {
   status:'PROVISIONAL_AUTHOR_KEY',revision:NSEJS_DIAGNOSTIC_REVISION,
   totalQuestions:60,paperMax:180,scorableMax:(60-Object.keys(NSEJS_HELD_QUESTIONS).length)*3,
   netScore:correct*3-incorrect,correct,incorrect,
   held:Object.keys(NSEJS_HELD_QUESTIONS).length,
   attempted,unanswered:60-attempted,
   scoreAccuracyPercent:eligible?Math.round(correct/eligible*1000)/10:null,
   questions,sections,
 };
}
