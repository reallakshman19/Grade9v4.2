// Test-only host composition. No production entrypoint or academic authority.
// Actual A14/A34 bytes, A35 search worker, A24 source controller, A19 session,
// A48/A49 transfer, A36 progress and archive share a single exact learner store.
import {fixture} from './wave9-synthetic.ts';
import {ref,artifact} from './wave8-synthetic.ts';
import type {WireFixture} from './search-wire.ts';
import {ManifestLoader,canonicalJson,computeSha256,sameRef} from '../../web/runtime/loader.ts';
import {StandardAssessmentEngine,type AssessmentContract} from '../../web/runtime/assessment.ts';
import {DefaultProgressStore} from '../../web/runtime/progress.ts';
import {IndexedDBStorageDriver,MemoryStorageDriver} from '../../web/runtime/storage.ts';
import {Session as SessionController} from '../../web/runtime/session.ts';
import type {Session,Ref,TaskRef} from '../../web/runtime/types.ts';
import {Router} from '../../web/app/router.ts';
import {SearchEngine} from '../../web/runtime/search.ts';
import {UniversalSearchPageController} from '../../web/pages/search.ts';
import {createQuestionPage} from '../../web/pages/question.ts';
import {createWave9WorkspaceHost} from '../../web/pages/wave9-workspace.ts';
import {PersonalStudyStore,type PersonalScope} from '../../web/runtime/personal-study.ts';
import {createPersonalStudyHost} from '../../web/pages/personal-study.ts';
import {ReasoningPageController,mountReasoningPage,type ReasoningCatalog} from '../../web/pages/reasoning.ts';
import type {ReasoningCell} from '../../web/runtime/types.ts';
const el=<K extends keyof HTMLElementTagNameMap>(tag:K,text?:string)=>{const n=document.createElement(tag);if(text!==undefined)n.textContent=text;return n;};
export async function mountGolden(root:HTMLElement,wire:WireFixture,db:string){
 const driver=new IndexedDBStorageDriver({dbName:db}),loader=new ManifestLoader([{releaseId:wire.pins.releaseId,digest:wire.pins.releaseDigest}]),release=await loader.loadFromData(wire.release,wire.pins.releaseDigest);
 const row=release.projections.learner_precommit.find(r=>r.type==='QUESTION'&&r.id==='demo:q:001')!;
 const task={type:'QUESTION',id:row.id,revision:row.revision,sha256:row.sha256} satisfies TaskRef;
 const item=loader.resolveItem<{stem:string;options:readonly {id:string;text:string}[]}>(release,task,'PRECOMMIT',release.release_id);
 // Canonical synthetic graph specifies option B. This is test-only assessment,
 // not a claim that the A14 diagnostic manifest carries an approved key.
 const contract:AssessmentContract={id:'assessment:golden:source',revision:1,task_ref:task,response_kind:'SINGLE_CHOICE',max_points:1,evaluator:{mode:'AUTOMATIC',canonical_value:'B',allowed_options:item.options.map(o=>o.id)}};
 const assessment=ref('ASSESSMENT',contract.id,await computeSha256(canonicalJson(contract))),engine=new StandardAssessmentEngine([{assessment,task}]);await engine.registerContract(contract,assessment);
 const x=await fixture('CORE2B','4',driver,true,{origin:task,releaseId:release.release_id,extra:{engine,assessment}});
 const router=new Router({basePath:'/grade9',useHash:true}),retry:Session={...x.f.os,id:'session:golden:retry',origin:task,attemptIds:[],draftId:null};
 let active=true,host:Awaited<ReturnType<typeof createWave9WorkspaceHost>>|null=null,personalHost:ReturnType<typeof createPersonalStudyHost>|null=null,search:UniversalSearchPageController|null=null,qrtHost:ReturnType<typeof mountReasoningPage>|null=null;
 const scope:PersonalScope={schema:'g9-a36-scope/1',learnerId:wire.pins.learnerId,releaseId:release.release_id,releaseDigest:release.release_digest,sessions:[x.f.os,x.f.as,x.f.bs,x.as,x.cs,retry].map(s=>({id:s.id,releaseId:s.releaseId,item:s.item})),journeys:[x.f.key],bookmarks:[{ref:task,title:'Synthetic source question',review:ref('APPROVAL','approval:golden:bookmark')}],allowRestore:true};
 const scopePin=await computeSha256(canonicalJson(scope)),live=async(s:{learnerId:string;releaseId:string;scopeDigest:string})=>active&&s.learnerId===scope.learnerId&&s.releaseId===scope.releaseId&&s.scopeDigest===scopePin;
 const personal=await PersonalStudyStore.open(scope,scopePin,driver,x.progress,loader,release,live);
 const routed:string[]=[];router.subscribe(m=>routed.push(m.path));
 const frame=(title:string)=>{const m=el('main');m.className='golden-source';m.append(el('style','.golden-source{max-width:100%;overflow-wrap:anywhere}.golden-source button,.golden-source select{font:inherit;min-width:48px;min-height:48px;max-width:100%;margin:4px;padding:8px}.golden-source label{display:block}'),el('h1',title),el('p','Synthetic engineering fixture · academic HOLD'));root.replaceChildren(m);return m;};
 const button=(m:HTMLElement,title:string,action:string,run:()=>Promise<void>)=>{const b=el('button',title);b.type='button';b.dataset.golden=action;b.addEventListener('click',async()=>{if(b.disabled)return;b.disabled=true;try{await run();}catch(e){m.append(el('p','Operation blocked: '+(e instanceof Error?e.message:'unknown')));}});m.append(b);return b;};
 const originalId='attempt:golden:original',retryId='attempt:golden:retry';
 const currentOriginal=()=>x.progress.committedAttempt(x.f.os.id,originalId);
 const runtime=await x.compose();
 async function source(s:Session,attemptId:string,isRetry=false){
  if(!active||!sameRef(s.item,task)||s.releaseId!==release.release_id)throw Error('SOURCE_SCOPE');
  const m=frame(isRetry?'Source reattempt':'Source question');m.append(el('p',item.stem),el('p','Original cursor: '+s.cursor));
  const session=new SessionController({sessionId:s.id,releaseId:s.releaseId,item:task,mode:s.mode},driver,x.progress,{liveRevision:async()=>active?'r1':'revoked',reviewedDisclosure:async(_s,a,k,r)=>active&&!!a&&k==='CORRECTNESS'&&sameRef(r,task)});
  const page=createQuestionPage('physics','wpe');
  // RELEASED/VERIFIED are legacy A24 enum values for this synthetic test binding
  // only; no release or admission status is changed in the real manifest.
  page.loadQuestion({id:task.id,code:task.id,title:'Synthetic source',stemText:item.stem,kind:'SINGLE_CHOICE',options:item.options.map(o=>({...o,label:o.id})),status:'RELEASED',keyStatus:'VERIFIED',maxPoints:1},{releaseId:s.releaseId,task,assessment,attemptId,session,progress:x.progress,engine});
  const workspace=page.getWorkspace()!,label=el('label','Choose response'),sel=el('select');
  for(const option of item.options){const o=el('option',option.text);o.value=option.id;sel.append(o);}label.append(sel);m.append(label);
  button(m,'Commit source response','source-commit',async()=>{
   if(!active)throw Error('REVOKED');workspace.updateResponse({kind:'SINGLE_CHOICE',selectedOptionId:sel.value});workspace.updateWork([artifact('work:'+attemptId,'Synthetic learner work')]);await workspace.saveDraft();
   const result=await page.submit(),a=await x.progress.committedAttempt(s.id,attemptId);
   if(!a||!result||result.rawPoints===null)throw Error('SOURCE_COMMIT_NOT_VERIFIED');
   sel.disabled=true;m.append(el('p','Source result: '+result.status));
   if(!isRetry&&a.grade.status==='SCORED'&&a.grade.reasonCode==='INCORRECT_CHOICE'){
    button(m,'Open reviewed recovery transfer','recovery',async()=>{
     const before=await currentOriginal();if(!active||!before||before.grade.reasonCode!=='INCORRECT_CHOICE'||!sameRef(before.item,task))throw Error('RECOVERY_NOT_AUTHORIZED');
     host=await createWave9WorkspaceHost(root,router,x.c,x.digest,{driver,progress:x.progress,live:x.live,load:x.load,engine:x.f.binding.engine,definition:x.f.definition});
     router.navigate(host.href());if(!await host.open(host.href()))throw Error('TRANSFER_UNAVAILABLE');
    });
   }
   if(isRetry)button(m,'View personal progress','personal',async()=>{personalHost=createPersonalStudyHost(root,personal,router);await personalHost.open('progress');});
  });
 }
 router.subscribe(m=>{
  if(m.type==='QUESTION'&&m.params.questionId===task.id&&active){void source(x.f.os,originalId).catch(e=>{root.replaceChildren(el('p','Source unavailable: '+String(e)));});}
  if(m.type==='ROLE'&&m.params.coreRole==='CORE2'&&m.params.resourceId===x.c.page?.sourceRoute?.resourceId&&active){
   // The actual Wave9 host has already mounted its reviewed source text. Add
   // a test-only retry control after exact persisted return and origin checks.
   void (async()=>{
    const e=await runtime.controller.readEvidence(),o=await runtime.transfer!.readSourceReturn(e.snapshot.checkpoint),origin=await driver.get<Session>('sessions',x.f.os.id);
    if(!o||!origin||o.sessionId!==origin.id||!sameRef(o.ref,task)||o.cursor!==origin.cursor||!await currentOriginal())throw Error('RETURN_IDENTITY_MISMATCH');
    button(root,'Start separate source reattempt','retry',async()=>{
     if(!active||!await runtime.transfer!.readSourceReturn(e.snapshot.checkpoint)||!await currentOriginal())throw Error('RETRY_NOT_AUTHORIZED');
     if(await driver.get('sessions',retry.id))throw Error('RETRY_ALREADY_EXISTS');await driver.put('sessions',retry.id,retry);await source(retry,retryId,true);
    });
   })().catch(e=>root.replaceChildren(el('p','Return unavailable: '+String(e))));
  }
 });
 const makeSearch=()=>SearchEngine.open({pins:wire.pins,releaseLoader:loader,release,manifestBytes:wire.manifest,loadShard:async m=>wire.shards[m.shard_id],live:async p=>active&&canonicalJson(p)===canonicalJson(wire.pins)});
 async function openSearch(){qrtHost?.close();router.navigate(router.toHref('/search'));const mount=el('div');root.replaceChildren(mount);search=new UniversalSearchPageController(mount,router,makeSearch);await search.open(router.toHref('/search'));}
 async function openQrt(){
  const topic=ref('CONCEPT','topic:golden'),review=ref('APPROVAL','approval:golden:qrt'),cell:ReasoningCell={schema_version:'g9-reasoning-cell/1',cell_id:'cell:golden',subject_id:'PHYSICS',topic_ref:topic,operation:'APPLY',demand_band:'D2',native_contract_ref:ref('QRT','qrt:golden'),main:task,instances:[ref('QUESTION','question:golden:i1','1'.repeat(64)),ref('FRESH_TASK','fresh:golden:i2','2'.repeat(64))],status:'SYNTHETIC',c06_v11:true};
  const c:ReasoningCatalog={schema:'g9-a53-diagnostic/1',learnerId:scope.learnerId,releaseId:scope.releaseId,subjectId:'PHYSICS',topic,title:'Golden QRT diagnostic',cells:[cell],routes:[{cellId:cell.cell_id,task,review}]};
  const pin=await computeSha256(canonicalJson(c)),ctrl=await ReasoningPageController.create(c,pin,loader,release,router,async s=>active&&s.catalogSha256===pin&&s.learnerId===scope.learnerId&&s.releaseId===scope.releaseId);
  const mount=el('div');root.replaceChildren(mount);qrtHost=mountReasoningPage(mount,ctrl);await qrtHost.refresh();
 }
 await openQrt();
 return {x,driver,router,routed,personal,scope,openSearch,runtime,task,originalId,retryId,
  async snapshot(){const e=await runtime.controller.readEvidence(),a=await currentOriginal(),b=await x.progress.committedAttempt(retry.id,retryId);return {events:e.events.map(v=>v.event_type),checkpoint:e.snapshot.checkpoint,origin:e.meta.origin,original:a,retry:b,count:(await driver.getAll('attempts')).length};},
  async backup(){const blob=await personal.exportProgress(),target=new MemoryStorageDriver(),p=await PersonalStudyStore.open(scope,scopePin,target,new DefaultProgressStore(target,x.verify),loader,release,live);const receipt=await p.importProgress(blob),e=await p.evidence();return {receipt,historical:e.rows.filter(r=>r.category==='HISTORICAL_UNVERIFIED').length,verified:!!await new DefaultProgressStore(target,x.verify).committedAttempt(x.f.os.id,originalId),original:await target.get('attempts',originalId)};},
  revoke(){active=false;x.revoke();}
 };
}
