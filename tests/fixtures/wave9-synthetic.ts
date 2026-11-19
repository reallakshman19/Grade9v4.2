import {composeWave9,type Wave9Catalog,type SessionBinding} from '../../web/runtime/wave9-authority.ts';
import {computeSha256,canonicalJson,sameRef} from '../../web/runtime/loader.ts';
import type {StorageDriver} from '../../web/runtime/storage.ts';
import {DefaultProgressStore} from '../../web/runtime/progress.ts';
import {StandardAssessmentEngine,SCORING_VERSION,type AssessmentContract} from '../../web/runtime/assessment.ts';
import {Core1BTransferJourney} from '../../web/journeys/core1b.ts';
import {CORE1_ORIENTATION_BLUEPRINT_ID,CORE1_ORIENTATION_BLOCKS} from '../../web/journeys/core1.ts';
import {setupTransfer,throughRepair,firstResponses,boundaryResponses,artifact,ref} from './wave8-synthetic.ts';
import type {Attempt,CognitiveEvent,Ref,Session,TaskRef,Response} from '../../web/runtime/types.ts';
export const pin=(c:Wave9Catalog)=>computeSha256(canonicalJson(c));
export async function fixture(role:Wave9Catalog['role'],answer='4',driver?:StorageDriver,initialize=true,options?:{origin:TaskRef;releaseId:string;extra:{engine:StandardAssessmentEngine;assessment:Ref<'ASSESSMENT'>}}){
 const f=await setupTransfer(driver,initialize,options),b=await f.controller.describeBinding();
 const anchor=ref('QUESTION','question:wave9:anchor','b'.repeat(64)),check=ref('QUESTION','question:wave9:check','c'.repeat(64));
 const as:Session={...f.as,id:'session:wave9:anchor',item:anchor,attemptIds:[],draftId:null};
 const cs:Session={...f.as,id:'session:wave9:check',item:check,origin:f.first,attemptIds:[],draftId:null};
 if(initialize)for(const s of [as,cs])await f.driver.put('sessions',s.id,s);
 const contracts:AssessmentContract[]=[anchor,check].map((task_ref,i)=>({id:'asmt:wave9:'+i,revision:1,task_ref,response_kind:'INTEGER',max_points:1,evaluator:{mode:'AUTOMATIC',canonical_value:'4'}}));
 const refs=await Promise.all(contracts.map(async c=>ref('ASSESSMENT',c.id,await computeSha256(canonicalJson(c)))));
 const engine=new StandardAssessmentEngine(refs.map((assessment,i)=>({assessment,task:contracts[i].task_ref as TaskRef})));
 for(let i=0;i<2;i++)await engine.registerContract(contracts[i],refs[i]);
 const verify=async(a:Attempt)=>{
  if(!a.assessmentRef||a.releaseId!==f.key.releaseId||a.scoringVersion!==SCORING_VERSION)return false;
  const e=options&&sameRef(options.extra.assessment,a.assessmentRef)?options.extra.engine:refs.some(r=>sameRef(r,a.assessmentRef!))?engine:f.binding.engine;
  return canonicalJson(a.grade)===canonicalJson(await e.evaluate(a.response,a.assessmentRef,'PRACTICE',a.item as TaskRef));
 };
 const progress=new DefaultProgressStore(f.driver,verify);
 if(initialize)for(const [i,s] of [as,cs].entries()){
  const response:Response={kind:'INTEGER',value:i===0?'4':answer};
  const a:Attempt={id:'att:wave9:'+i,sessionId:s.id,item:s.item,releaseId:s.releaseId,response,work:[artifact('work:wave9:'+i)],hintIds:[],submittedAt:new Date().toISOString(),grade:await engine.evaluate(response,refs[i],'PRACTICE',s.item as TaskRef),cognitive:null,assessmentRef:refs[i],scoringVersion:SCORING_VERSION};
  await progress.appendQualifiedAttempt(a,0);
 }
 const asset=async(id:string,value:unknown)=>{const bytes=new TextEncoder().encode(JSON.stringify(value));f.bytes.set(id,bytes);return ref('PRESENTATION',id,await computeSha256(bytes));};
 const presentation=await asset('presentation:wave9:en',{source:f.first,locale:'en-US',level:'FORMAL',text:'Synthetic public presentation',symbolsAndUnits:{x:'m'}});
 const hindi=await asset('presentation:wave9:hi',{source:f.first,locale:'hi-IN',level:'FORMAL',text:'सिंथेटिक प्रस्तुति',symbolsAndUnits:{x:'m'}});
 const intuition=await asset('presentation:wave9:intuition',{source:f.first,locale:'en-US',level:'INTUITION',text:'Synthetic intuition',symbolsAndUnits:{x:'m'}});
 const orientation=await asset('presentation:wave9:orientation',{blueprint:CORE1_ORIENTATION_BLUEPRINT_ID,source:f.first,topicId:'topic:synthetic',blocks:Object.fromEntries(CORE1_ORIENTATION_BLOCKS.map(k=>[k,'Synthetic '+k]))});
 const hint=f.definition.hints[0].assetRef as Ref;
 const cruxBytes=new TextEncoder().encode('SYNTHETIC_REVIEWED_CRUX');const crux=ref('ASSET','asset:wave9:crux',await computeSha256(cruxBytes));f.bytes.set(crux.id,cruxBytes);
 const bind=(s:Session):SessionBinding=>({id:s.id,item:s.item,origin:s.origin,mode:'PRACTICE',contentRevision:'r1'});
 const sourceBytes=new TextEncoder().encode(JSON.stringify({origin:f.os.item,sessionId:f.os.id,cursor:f.os.cursor,role:options?'CORE2':'CORE1A',resourceId:'resource:synthetic:origin',text:'Synthetic returned source at original cursor'}));
 const source=ref('ASSET','asset:wave9:source',await computeSha256(sourceBytes));f.bytes.set(source.id,sourceBytes);
 // Small real, synthetic one-page PDF with a correct xref table; not a production receipt.
 const parts=['<< /Type /Catalog /Pages 2 0 R >>','<< /Type /Pages /Kids [3 0 R] /Count 1 >>','<< /Type /Page /Parent 2 0 R /MediaBox [0 0 300 200] /Contents 4 0 R >>','<< /Length 0 >>\nstream\nendstream'];let pdf='%PDF-1.4\n',offsets=[0];
 for(const [i,o] of parts.entries()){offsets.push(pdf.length);pdf+=(i+1)+' 0 obj\n'+o+'\nendobj\n';}const xref=pdf.length;pdf+='xref\n0 5\n0000000000 65535 f \n'+offsets.slice(1).map(n=>String(n).padStart(10,'0')+' 00000 n \n').join('')+'trailer\n<< /Size 5 /Root 1 0 R >>\nstartxref\n'+xref+'\n%%EOF\n';
 const pdfBytes=new TextEncoder().encode(pdf),pdfRef=ref('ASSET','asset:wave9:pdf',await computeSha256(pdfBytes));f.bytes.set(pdfRef.id,pdfBytes);
 const c:Wave9Catalog={schema:'g9-wave9-authority/1',learnerId:'synthetic-learner',role,journey:f.key,sessionId:f.as.id,originSessionId:f.os.id,boundarySessionId:f.bs.id,context:role==='CORE2A'?{...b.context,reasoningCrux:crux}:b.context,
 sessions:[f.as,f.os,f.bs,...(role==='CORE2A'?[cs]:role==='CORE2B'?[as]:[])].map(bind),
 grants:[{capability:'VIEW_STIMULUS',asset:f.first},{capability:'VIEW_STIMULUS',asset:f.bs.item},{capability:'VIEW_STIMULUS',asset:presentation},{capability:'VIEW_STIMULUS',asset:hindi},{capability:'VIEW_STIMULUS',asset:intuition},{capability:'VIEW_STIMULUS',asset:orientation},{capability:'REFERENCE_SOLUTION',asset:f.firstRef},{capability:'BOUNDARY_REFERENCE',asset:f.boundaryRef},{capability:'SOURCE_RETURN',asset:f.os.item},{capability:'H1',asset:hint},...(role==='CORE2A'?[{capability:'SHOW_REASONING_CRUX' as const,asset:crux}]:[])],
 ...(role==='CORE2A'?{practice:{releaseId:f.key.releaseId,practiceSessionId:f.as.id,practiceTask:f.first as TaskRef,checkSessionId:cs.id,checkTask:check,assessment:refs[1],attemptId:'att:wave9:1',review:ref('APPROVAL','approval:synthetic:check')}}:{}),
 ...(role==='CORE2B'?{transfer:{sessionId:f.as.id,releaseId:f.key.releaseId,task:f.first,origin:f.os.item,anchor,anchorSessionId:as.id,anchorAttemptId:'att:wave9:0',boundary:f.bs.item,dimension:'CONSTRAINT_MUTATION' as const,review:ref('APPROVAL','approval:synthetic:transfer'),capabilities:[{id:'synthetic:capability',teaching:options?ref('LESSON','lesson:golden:teaching'):f.os.item as Ref<'LESSON'>,receipt:ref('APPROVAL','approval:synthetic:teaching')}],scaffolds:[{capability:'H1' as const,asset:hint}]}}:{})};
 Object.assign(c,{page:{resourceId:'resource:wave9:'+role.toLowerCase(),review:ref('APPROVAL','approval:synthetic:page'),...(role==='CORE2B'?{transferDefinitionSha256:f.binding.definitionSha256,assessmentA:f.binding.assessmentA,assessmentB:f.binding.assessmentB,sourceRoute:{role:options?'CORE2':'CORE1A',resourceId:'resource:synthetic:origin',sessionId:f.os.id,origin:f.os.item,cursor:f.os.cursor,projection:source,review:ref('APPROVAL','approval:synthetic:source')}}:{projection:role==='CORE1'?orientation:presentation,...(role==='CORE2A'?{practiceAssessment:f.binding.assessmentA,practiceBoundary:{assessment:f.binding.assessmentB,review:ref('APPROVAL','approval:synthetic:practice-boundary')},presentations:[{locale:'en-US',level:'FORMAL',asset:presentation},{locale:'hi-IN',level:'FORMAL',asset:hindi},{locale:'en-US',level:'INTUITION',asset:intuition}]}:{print:{projection:orientation,pdf:pdfRef,review:ref('APPROVAL','approval:synthetic:pdf')}})})}});
 const digest=await pin(c);let enabled=true,learner='synthetic-learner',reads=0;
 const live=async(s:{learnerId:string;releaseId:string;catalogSha256:string})=>enabled&&s.learnerId===learner&&s.releaseId===f.key.releaseId&&s.catalogSha256===digest;
 const load=async(r:Ref)=>{reads++;return f.binding.loadProtected(r);};
 const compose=(catalog:Wave9Catalog=c,pinned=digest)=>composeWave9(catalog,pinned,f.driver,progress,live,load);
 return {f,c,digest,compose,progress,verify,live,load,presentation,orientation,pdfRef,pdfBytes,source,as,cs,hint,reads:()=>reads,revoke:()=>{enabled=false;},switchLearner:()=>{learner='foreign-learner';}};
}
