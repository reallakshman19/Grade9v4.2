/**
 * Post-commit mock-paper review. This is an inventory of the learner's own
 * recorded responses, NOT a second assessment engine or disclosure authority.
 *
 * The durable PaperWorkspaceController exposes REVIEW_PENDING results for
 * simulated exams. Never derive correctness from browser-shipped answer keys,
 * never infer a mark for unanswered/attempted parts and never reveal solutions
 * merely because an exam was committed.
 */
import type {PaperViewState, PaperQuestionPart} from '../pages/paper.ts';
import type {PaperSectionDescriptor} from '../components/part-navigation.ts';

export interface SealedReviewPart {
  readonly partId:string;
  readonly partKey:string;
  readonly sectionId:string;
  readonly responseState:'RECORDED'|'UNANSWERED';
  readonly points:null;
}
export interface SealedReviewSection {
  readonly sectionId:string;
  readonly title:string;
  readonly recordedCount:number;
  readonly unansweredCount:number;
}
export interface SealedPaperReview {
  readonly status:'REVIEW_PENDING';
  readonly paperId:string;
  readonly totalScore:null;
  readonly accuracy:null;
  readonly maxMarks:number;
  readonly recordedCount:number;
  readonly unansweredCount:number;
  readonly sections:readonly SealedReviewSection[];
  readonly parts:readonly SealedReviewPart[];
}

/** Public safe projection: fail closed if anything suggests exposed scoring. */
export function deriveSealedPaperReview(
  state:PaperViewState,
  parts:readonly Pick<PaperQuestionPart,'id'|'partKey'|'sectionId'|'maxPoints'|'archetypeId'>[],
  sections:readonly PaperSectionDescriptor[],
):SealedPaperReview|null {
  const e=state.evaluation;
  if(!state.ready||!state.isCommitted||!e||e.status!=='REVIEW_PENDING'||
    e.totalPoints!==null||e.isFinal!==false||e.partResults.length!==parts.length)return null;
  if(!Number.isFinite(e.maxPoints)||e.maxPoints<0||!Number.isFinite(parts.reduce((n,p)=>n+p.maxPoints,0)))return null;
  const byId=new Map(e.partResults.map(r=>[r.partId,r]));
  if(byId.size!==parts.length||new Set(parts.map(p=>p.id)).size!==parts.length)return null;
  const rows:SealedReviewPart[]=[];
  for(const part of parts){
    const r=byId.get(part.id);
    if(!r||r.archetypeId!==part.archetypeId||r.maxPoints!==part.maxPoints||
      r.points!==null||(r.status!=='REVIEW_PENDING'&&r.status!=='UNANSWERED'))return null;
    rows.push({
      partId:part.id,partKey:part.partKey,sectionId:part.sectionId,
      responseState:r.status==='REVIEW_PENDING'?'RECORDED':'UNANSWERED',
      points:null,
    });
  }
  const sectionRows:SealedReviewSection[]=[];
  const seen=new Set<string>();
  for(const sec of sections){
    const ids=new Set(sec.partIds);
    if(ids.size!==sec.partIds.length||sec.partIds.some(id=>seen.has(id)))return null;
    for(const id of ids)seen.add(id);
    const matched=rows.filter(r=>r.sectionId===sec.id);
    if(matched.length!==ids.size||matched.some(r=>!ids.has(r.partId)))return null;
    sectionRows.push({
      sectionId:sec.id,title:sec.title,
      recordedCount:matched.filter(r=>r.responseState==='RECORDED').length,
      unansweredCount:matched.filter(r=>r.responseState==='UNANSWERED').length,
    });
  }
  if(seen.size!==rows.length||rows.some(r=>!seen.has(r.partId)))return null;
  return Object.freeze({
    status:'REVIEW_PENDING',paperId:state.paperId,totalScore:null,accuracy:null,
    maxMarks:e.maxPoints,
    recordedCount:rows.filter(r=>r.responseState==='RECORDED').length,
    unansweredCount:rows.filter(r=>r.responseState==='UNANSWERED').length,
    sections:Object.freeze(sectionRows),
    parts:Object.freeze(rows),
  });
}
