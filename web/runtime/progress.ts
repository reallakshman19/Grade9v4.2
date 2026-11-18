// Progress Store and Export/Import Subsystem for Grade9 Platform Runtime.
// Implements transactional drafts, attempts, artifacts, local export/import, conflict resolution, and legacy migration.
// Conforms to R4 engineering contracts: "No academic approval inferred from software validation."

import type { Session, Attempt, WorkArtifact, Response, Draft, CognitiveDraftLineage, CognitiveSnapshot } from './types.ts';
import type { ProgressStore } from './contracts.ts';
import {
  StorageError,
  type StorageDriver,
  type DraftRecord,
  createStorageDriver,
} from './storage.ts';
import { canonicalJson, sameRef } from './loader.ts';
import { validateResponse, findDuplicateKeyInJson } from './response.ts';

export const STORAGE_EXPORT_VERSION = 'g9-storage-export/1.0';
export const LEGACY_EXPORT_VERSION = 'g9-legacy-export/0.9';

export interface ExportDataPayload {
  readonly sessions: readonly Session[];
  readonly drafts: readonly DraftRecord[];
  readonly attempts: readonly Attempt[];
  readonly artifacts: readonly WorkArtifact[];
}

export interface ExportBundle {
  readonly schema_version: typeof STORAGE_EXPORT_VERSION;
  readonly exported_at: string;
  readonly checksum: string;
  readonly data: ExportDataPayload;
}

export interface LegacyExportPayload {
  readonly export_version?: string;
  readonly legacy?: boolean;
  readonly version?: string;
  readonly exported_at?: string;
  readonly sessions?: readonly any[];
  readonly attempts?: readonly any[];
  readonly work?: readonly any[];
}

/**
 * Computes hexadecimal SHA-256 digest using global Web Crypto API.
 */
export async function computeSha256(data: string | Uint8Array): Promise<string> {
  const bytes = typeof data === 'string' ? new TextEncoder().encode(data) : data;
  const hashBuffer = await globalThis.crypto.subtle.digest('SHA-256', new Uint8Array(bytes));
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Detects whether an imported payload is in legacy export format.
 */
export function isLegacyExport(obj: any): boolean {
  if (typeof obj !== 'object' || obj === null) return false;
  if (obj.schema_version === STORAGE_EXPORT_VERSION) return false;
  return obj.schema_version===undefined&&obj.export_version===LEGACY_EXPORT_VERSION;
}

/**
 * Migrates a legacy export payload into the modern ExportBundle schema.
 */
export async function migrateLegacyExport(raw:any):Promise<ExportBundle>{
  // Never invent exact references, session IDs, grades or answers from incomplete legacy exports.
  const data:ExportDataPayload={sessions:raw.sessions??[],drafts:[],attempts:(raw.attempts??[]).map((a:any)=>({...a,cognitive:a.cognitive??null,grade:{status:'REVIEW_PENDING',points:null,maxPoints:a.grade?.maxPoints??0,reasonCode:'MIGRATED_UNVERIFIED'}})),artifacts:raw.work??[]};
  validateBundleData(data);
  return {schema_version:STORAGE_EXPORT_VERSION,exported_at:raw.exported_at??new Date().toISOString(),checksum:await computeSha256(JSON.stringify(data)),data};
}
const eq=(a:unknown,b:unknown)=>a===undefined||b===undefined?a===b:canonicalJson(a)===canonicalJson(b);
function check(condition:unknown,message:string):asserts condition{if(!condition)throw new StorageError('INVALID_RECORD',message);}
export function refOk(x:any){return x&&Object.keys(x).sort().join(',')==='id,revision,sha256,type'&&typeof x.id==='string'&&/^[A-Za-z][A-Za-z0-9._:-]{2,127}$/.test(x.id)&&['SOURCE','OCCURRENCE','QUESTION','ASSESSMENT','WARRANT','QRT','CONSTRUCTION','LESSON','FRESH_TASK','SOLUTION','RELATIONSHIP','PRESENTATION','CONCEPT','ASSET','PROGRAMME','EXAM_EDITION','PAPER','STIMULUS','APPROVAL','RELEASE','SUBJECT_PROFILE'].includes(x.type)&&Number.isSafeInteger(x.revision)&&x.revision>0&&typeof x.sha256==='string'&&/^[a-f0-9]{64}$/.test(x.sha256);}
const nonblank=(x:unknown):x is string=>typeof x==='string'&&x.trim().length>0;
export function timestamp(x:unknown):x is string {
  if(typeof x!=='string')return false;
  const m=/^(\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d)(?:\.(\d{1,3}))?(?:Z|\+00:00)$/.exec(x);
  if(!m||!Number.isFinite(Date.parse(x)))return false;
  return new Date(x).toISOString()===m[1]+'.'+(m[2]??'').padEnd(3,'0')+'Z';
}
const uniqueStrings=(x:unknown)=>Array.isArray(x)&&x.every(nonblank)&&new Set(x).size===x.length;
function sessionOk(s:any){return s&&nonblank(s.id)&&refOk(s.item)&&['QUESTION','FRESH_TASK'].includes(s.item.type)&&nonblank(s.releaseId)&&['LEARN','PRACTICE','SIMULATED_EXAM'].includes(s.mode)&&uniqueStrings(s.attemptIds)&&s.attemptIds.length<=1&&Number.isSafeInteger(s.cursor)&&s.cursor>=0&&(s.mode!=='SIMULATED_EXAM'||timestamp(s.deadlineAt))&&(s.contentRevision===undefined||nonblank(s.contentRevision))&&(s.draftId===null||s.draftId===s.id)&&(s.origin===null||refOk(s.origin))&&(s.returnRoute===undefined||s.returnRoute===null||typeof s.returnRoute==='string');}
function sameSession(a:Session,b:Session){return sameRef(a.item,b.item)&&a.releaseId===b.releaseId&&a.mode===b.mode&&eq(a.origin,b.origin)&&(a.returnRoute??null)===(b.returnRoute??null)&&(a.deadlineAt??null)===(b.deadlineAt??null)&&(a.contentRevision??null)===(b.contentRevision??null);}
function artifactOk(x:any){if(!x||Object.keys(x).sort().join(',')!=='id,kind,value,version'||!nonblank(x.id)||x.version!==1||!['NOTE','EQUATION','INK','TABLE','GRAPH','STRUCTURE','ATTACHMENT'].includes(x.kind))return false;try{canonicalJson(x.value);return x.value!==undefined;}catch{return false;}}
function validateAttempt(a:any){check(a&&nonblank(a.id)&&nonblank(a.sessionId)&&nonblank(a.releaseId)&&refOk(a.item)&&Array.isArray(a.work)&&a.work.every(artifactOk)&&new Set(a.work.map((w:WorkArtifact)=>w.id)).size===a.work.length&&uniqueStrings(a.hintIds)&&timestamp(a.submittedAt)&&a.cognitive!==undefined&&a.grade&&Number.isFinite(a.grade.maxPoints)&&a.grade.maxPoints>=0&&((a.grade.status==='SCORED'&&Number.isFinite(a.grade.points)&&a.grade.points>=0&&a.grade.points<=a.grade.maxPoints)||(['REVIEW_PENDING','INVALID','UNSUPPORTED'].includes(a.grade.status)&&a.grade.points===null)),'Invalid attempt');validateResponse(a.response);if(a.assessmentRef!==undefined)check(refOk(a.assessmentRef)&&a.assessmentRef.type==='ASSESSMENT'&&nonblank(a.scoringVersion),'Invalid assessment binding');if(a.cognitive!==null){const c=a.cognitive;check(c&&c.journey&&nonblank(c.journey.journeyId)&&nonblank(c.journey.taskInstanceId)&&c.journey.releaseId===a.releaseId&&refOk(c.journey.task)&&nonblank(c.originSessionId)&&refOk(c.originRef)&&Number.isSafeInteger(c.originCursor)&&c.originCursor>=0,'Invalid cognitive lineage');}}
export function validateBundleData(data:any):void{
  check(data&&['sessions','drafts','attempts','artifacts'].every(k=>Array.isArray(data[k])),'Invalid export structure');
  for(const [name,key] of [['sessions','id'],['drafts','sessionId'],['attempts','id'],['artifacts','id']]){const ids=new Set();for(const x of data[name]){check(x&&typeof x[key]==='string'&&!ids.has(x[key]),'Duplicate or missing record identity');ids.add(x[key]);}}
  for(const s of data.sessions){check(sessionOk(s)&&s.attemptIds.length<=1,'Invalid session or multiple attempts');for(const id of s.attemptIds)check(data.attempts.some((a:Attempt)=>a.id===id&&a.sessionId===s.id),'Session has missing or foreign attempt');check(s.draftId===null?!data.drafts.some((d:DraftRecord)=>d.sessionId===s.id):data.drafts.some((d:DraftRecord)=>d.sessionId===s.id),'Session draft link mismatch');}
  for(const a of data.attempts){validateAttempt(a);const s=data.sessions.find((s:Session)=>s.id===a.sessionId);check(s&&s.releaseId===a.releaseId&&sameRef(s.item,a.item)&&s.attemptIds.includes(a.id),'Orphan or mismatched attempt');if(a.cognitive){const origin=data.sessions.find((s:Session)=>s.id===a.cognitive.originSessionId);check(origin&&origin.releaseId===a.releaseId&&sameRef(origin.item,a.cognitive.originRef),'Missing cognitive origin');}}
  for(const d of data.drafts){check(data.sessions.some((s:Session)=>s.id===d.sessionId)&&Number.isSafeInteger(d.revision)&&d.revision>0&&Array.isArray(d.artifacts)&&d.artifacts.every(artifactOk),'Invalid draft');validateResponse(d.response);if(d.cognitive){const ses=data.sessions.find((s:Session)=>s.id===d.sessionId);const origin=data.sessions.find((s:Session)=>s.id===d.cognitive.originSessionId);check(ses&&origin&&origin.releaseId===ses.releaseId&&sameRef(origin.item,d.cognitive.originRef)&&d.cognitive.journey?.releaseId===ses.releaseId&&refOk(d.cognitive.journey.task),'Invalid cognitive draft origin');}}
  for(const a of data.artifacts)check(artifactOk(a),'Invalid artifact');
  const owners=new Map<string,string>();for(const [owner,work] of [...data.attempts.map((a:Attempt)=>[a.sessionId,a.work]),...data.drafts.map((d:DraftRecord)=>[d.sessionId,d.artifacts])] as [string,readonly WorkArtifact[]][]){for(const w of work){const canonical=data.artifacts.find((a:WorkArtifact)=>a.id===w.id);check(canonical&&eq(canonical,w),'Missing or conflicting canonical artifact');check(!owners.has(w.id)||owners.get(w.id)===owner,'Artifact belongs to another session');owners.set(w.id,owner);}}
}
// Verify draft against the exact persisted stage and event checkpoint, not a mutable UI flag.
export async function verifyDraftLineage(tx:import('./storage.ts').TransactionContext,session:Session,lineage:CognitiveDraftLineage,verifiedHistoricalSnapshot?:CognitiveSnapshot):Promise<void>{
  const j=lineage.journey;check(j&&refOk(j.task)&&j.releaseId===session.releaseId&&session.mode!=='SIMULATED_EXAM'&&nonblank(j.journeyId)&&nonblank(j.taskInstanceId),'Invalid cognitive draft identity');
  const meta=await tx.get<{journey:unknown;parentJourney:unknown;origin?:{sessionId:string;ref:unknown;cursor:number}}>('cognitive_journeys',j.journeyId);
  const snap=verifiedHistoricalSnapshot??await tx.get<CognitiveSnapshot>('cog_snap:'+j.journeyId,j.journeyId);
  check(meta&&eq(meta.journey,j)&&snap&&eq(snap.journey,j)&&eq(snap.checkpoint,lineage.checkpoint)&&snap.stage===lineage.stage&&snap.stage!=='COMPLETE','Missing or stale cognitive draft checkpoint');
  check(eq(meta.parentJourney,lineage.parentJourney),'Draft retry lineage differs');
  const first=snap.firstAttemptId?await tx.get<{id:string}>('cognitive_event_attempt',snap.firstAttemptId):undefined;
  check(lineage.firstAttemptId===(first?.id??null),'Draft first attempt differs');
  const origin=await tx.get<Session>('sessions',lineage.originSessionId);
  check(origin&&origin.releaseId===j.releaseId&&sameRef(origin.item,lineage.originRef)&&Number.isSafeInteger(lineage.originCursor)&&lineage.originCursor>=0,'Draft origin missing');
  check(!meta.origin||eq(meta.origin,{sessionId:lineage.originSessionId,ref:lineage.originRef,cursor:lineage.originCursor}),'Draft origin differs');
  if(snap.stage!=='BOUNDARY_TEST')check(sameRef(session.item,j.task),'Draft task differs');
  else check(!sameRef(session.item,j.task),'Boundary draft requires distinct task');
}
async function immutablePut<T>(tx:import('./storage.ts').TransactionContext,s:string,id:string,value:T){const existing=await tx.get<T>(s,id);if(existing!==undefined&&!eq(existing,value))throw new StorageError('RECORD_CONFLICT','Conflicting '+s+' identity '+id);if(existing===undefined)await tx.put(s,id,value);}
/**
 * Standard implementation of ProgressStore.
 * Governs draft management, attempt logging, export bundles, and atomic verification.
 */
export class DefaultProgressStore implements ProgressStore {
  private readonly driver: StorageDriver;
  private readonly verifyAttempt: (attempt:Attempt)=>Promise<boolean>;
  // Trusted controller must recompute grade using a verified release/task/assessment/scoring binding.
  // Default permits unverified non-scored local history only.
  constructor(driver:StorageDriver,verifyAttempt:(attempt:Attempt)=>Promise<boolean>=async()=>false) {
    this.driver=driver;this.verifyAttempt=verifyAttempt;
  }
  private async qualify(attempt:Attempt):Promise<boolean>{
    validateAttempt(attempt);
    const verified=!!attempt.assessmentRef&&!!attempt.scoringVersion&&await this.verifyAttempt(structuredClone(attempt));
    if(attempt.grade.status==='SCORED'&&!verified)throw new StorageError('UNVERIFIED_GRADE','Scored attempt requires trusted assessment recomputation');
    return verified;
  }

  /**
   * Saves a draft response and associated artifacts atomically.
   * If storage fails (quota, aborted), throws StorageError without pretending success ("no fake Saved").
   */
  async saveDraft(
    session: Session,
    response: Response,
    artifacts: readonly WorkArtifact[], expectedRevision=0,cognitive:CognitiveDraftLineage|null=null
  ): Promise<void> {
    // Snapshot caller values before awaiting a transaction.
    session=structuredClone(session);response=structuredClone(response);artifacts=structuredClone(artifacts);cognitive=structuredClone(cognitive);
    validateResponse(response);check(sessionOk(session)&&artifacts.every(artifactOk)&&new Set(artifacts.map(a=>a.id)).size===artifacts.length,'Invalid draft');

    await this.driver.transaction(
      ['drafts', 'sessions', 'artifacts','artifact_owners',...(cognitive?['cognitive_journeys','cognitive_event_attempt','cog_snap:'+cognitive.journey.journeyId]:[])],
      'readwrite',
      async (tx) => {
        const existing = await tx.get<DraftRecord>('drafts', session.id);
        const priorSession=await tx.get<Session>('sessions',session.id);
        if(priorSession&&!sameSession(priorSession,session))throw new StorageError('RECORD_CONFLICT','Session identity mismatch');
        check((existing?.revision??0)===expectedRevision,'Stale draft revision');
        if(session.mode==='SIMULATED_EXAM'){check(!!priorSession&&priorSession.attemptIds.length===0&&timestamp(priorSession.deadlineAt)&&Date.now()<=Date.parse(priorSession.deadlineAt!),'Exam draft locked or deadline passed');}
        check(!!priorSession||session.attemptIds.length===0,'New session cannot claim previous attempts');
        if(cognitive){check(!!priorSession&&(!['ATTEMPT','BOUNDARY_TEST'].includes(cognitive.stage)||priorSession.attemptIds.length===0),'Cognitive attempt draft session is committed or missing');await verifyDraftLineage(tx,session,cognitive);}
        check(!existing?.cognitive||cognitive&&eq(existing.cognitive.journey,cognitive.journey),'Cannot overwrite cognitive draft with foreign or ordinary draft');
        const revision = existing ? existing.revision + 1 : 1;

        const draft: DraftRecord = {
          sessionId: session.id,
          response,
          artifacts,
          savedAt: new Date().toISOString(),
          revision,cognitive,
        };

        await tx.put('drafts', session.id, draft);
        await tx.put('sessions', session.id, {
          ...session,
          attemptIds:priorSession?.attemptIds??session.attemptIds,
          draftId: session.id,
        });

        for (const art of artifacts) {
          await immutablePut(tx,'artifact_owners',art.id,session.id);
          await immutablePut(tx,'artifacts',art.id,art);
        }
      }
    );
  }

  /**
   * Loads draft record for a session, returning null if no draft exists.
   */
  async loadDraft(sessionId:string):Promise<(Draft&DraftRecord)|null>{
    const initial=await this.driver.get<DraftRecord>('drafts',sessionId);if(!initial)return null;
    const lineage=initial.cognitive;
    return this.driver.transaction(['drafts','sessions','artifacts','artifact_owners',...(lineage?['cog_snap:'+lineage.journey.journeyId]:[])],'readonly',async tx=>{
      const draft=await tx.get<DraftRecord>('drafts',sessionId);if(!draft)return null;
      check(eq(draft,initial),'Draft changed during read; retry');
      const session=await tx.get<Session>('sessions',sessionId);check(session,'Draft missing session');
      if(session.mode==='SIMULATED_EXAM'||draft.cognitive){check(session.draftId===sessionId&&(!(session.mode==='SIMULATED_EXAM'||draft.cognitive&&['ATTEMPT','BOUNDARY_TEST'].includes(draft.cognitive.stage))||session.attemptIds.length===0),'Invalid exam draft lineage');for(const a of draft.artifacts){check(artifactOk(a)&&eq(await tx.get('artifacts',a.id),a)&&await tx.get('artifact_owners',a.id)===sessionId,'Invalid exam draft artifact closure');}}
      const snapshot=lineage?await tx.get<CognitiveSnapshot>('cog_snap:'+lineage.journey.journeyId,lineage.journey.journeyId):undefined;
      const cognitiveStale=!!lineage&&(!snapshot||!eq(snapshot.journey,lineage.journey)||snapshot.stage!==lineage.stage||!eq(snapshot.checkpoint,lineage.checkpoint));
      return {...draft,session,cognitive:draft.cognitive??null,cognitiveStale};
    });
  }

  /**
   * Appends an attempt, updating session attemptIds and persisting work artifacts.
   * Idempotent on identical attempt, rejects conflicting attempt with RECORD_CONFLICT.
   */
  static readonly attemptStores=['attempts','sessions','artifacts','drafts','artifact_owners','attempt_authority'] as const;
  async appendAttempt(attempt:Attempt):Promise<void>{
    attempt=structuredClone(attempt);check(attempt.cognitive===null,'Cognitive attempts must commit with their event in one transaction');
    await this.driver.transaction(DefaultProgressStore.attemptStores,'readwrite',tx=>this.commitAttempt(tx,attempt));
  }
  async appendQualifiedAttempt(attempt:Attempt,expectedDraftRevision?:number):Promise<void>{
    attempt=structuredClone(attempt);check(attempt.cognitive===null,'Cognitive attempts must commit with their event');
    await this.driver.transaction(DefaultProgressStore.attemptStores,'readwrite',tx=>this.commitAttempt(tx,attempt,true,expectedDraftRevision));
  }
  // For A48's atomic transaction. The same validated write path is used by both APIs.
  async commitAttempt(tx:import('./storage.ts').TransactionContext,attempt:Attempt,requireQualified=false,expectedDraftRevision?:number):Promise<void>{
    attempt=structuredClone(attempt);validateAttempt(attempt);
    const session=await tx.get<Session>('sessions',attempt.sessionId);
    if(!session||!sessionOk(session)||!sameRef(session.item,attempt.item)||session.releaseId!==attempt.releaseId)throw new StorageError('RECORD_CONFLICT','Attempt missing matching session');
    const old=await tx.get<Attempt>('attempts',attempt.id);
    if(old){if(!eq(old,attempt)||!session.attemptIds.includes(attempt.id))throw new StorageError('RECORD_CONFLICT','Conflicting attempt identity');const qualified=await this.qualify(attempt);check(!requireQualified||qualified&&await tx.get('attempt_authority',attempt.id)==='LOCAL_VERIFIED_SCORE','Existing attempt not qualified');return;}
    if(expectedDraftRevision!==undefined){const draft=await tx.get<DraftRecord>('drafts',session.id);check(Number.isSafeInteger(expectedDraftRevision)&&expectedDraftRevision>=0&&(draft?.revision??0)===expectedDraftRevision,'Stale draft revision at commitment');}
    const qualified=await this.qualify(attempt);check(!requireQualified||qualified,'Unqualified commitment');
    if(session.mode==='SIMULATED_EXAM')check(timestamp(session.deadlineAt)&&Date.now()<=Date.parse(session.deadlineAt!)&&Date.parse(attempt.submittedAt)<=Date.parse(session.deadlineAt!),'Exam submission deadline passed or unavailable');
    check(session.attemptIds.length===0,'Session already contains a committed attempt; use a new exact retry session');
    for(const art of attempt.work){await immutablePut(tx,'artifact_owners',art.id,attempt.sessionId);await immutablePut(tx,'artifacts',art.id,art);}
    await tx.put('attempts',attempt.id,attempt);
    await tx.put('attempt_authority',attempt.id,qualified?'LOCAL_VERIFIED_SCORE':'LOCAL_UNVERIFIED');
    await tx.put('sessions',session.id,{...session,attemptIds:[...session.attemptIds,attempt.id],draftId:null});
    await tx.delete('drafts',session.id);
  }

  // Read-only qualification of a stored attempt inside the caller's evidence transaction.
  async verifyQualifiedStoredAttempt(tx:import('./storage.ts').TransactionContext,a:Attempt):Promise<boolean>{
    const session=await tx.get<Session>('sessions',a.sessionId);
    if(!session||!eq(await tx.get('attempts',a.id),a)||!session.attemptIds.includes(a.id)||session.releaseId!==a.releaseId||!sameRef(session.item,a.item)||await tx.get('attempt_authority',a.id)!=='LOCAL_VERIFIED_SCORE'||!await this.qualify(a))return false;
    for(const w of a.work)if(!eq(await tx.get('artifacts',w.id),w)||await tx.get('artifact_owners',w.id)!==a.sessionId)return false;
    return true;
  }
  async committedAttempt(sessionId:string,attemptId:string):Promise<Attempt|null>{
    return this.driver.transaction(DefaultProgressStore.attemptStores,'readonly',async tx=>{
      const a=await tx.get<Attempt>('attempts',attemptId),session=await tx.get<Session>('sessions',sessionId);
      if(!a||!session||a.sessionId!==sessionId||a.releaseId!==session.releaseId||!sameRef(a.item,session.item)||!session.attemptIds.includes(attemptId)||await tx.get('attempt_authority',attemptId)!=='LOCAL_VERIFIED_SCORE')return null;
      if(!await this.qualify(a))return null;
      for(const w of a.work)if(!eq(await tx.get('artifacts',w.id),w)||await tx.get('artifact_owners',w.id)!==sessionId)return null;
      return a;
    });
  }
  // Shared restore transaction, used by A48. Imports are historical, never disclosure receipts.
  async restoreEmpty(tx:import('./storage.ts').TransactionContext,data:ExportDataPayload):Promise<void>{
    validateBundleData(data);
    for(const store of DefaultProgressStore.attemptStores)check((await tx.getAll(store)).length===0,'Restore requires empty progress stores');
    for(const a of data.attempts)await this.qualify(a);
    for(const session of data.sessions)await tx.put('sessions',session.id,session);
    for(const artifact of data.artifacts)await tx.put('artifacts',artifact.id,artifact);
    for(const draft of data.drafts){await tx.put('drafts',draft.sessionId,draft);for(const art of draft.artifacts)await immutablePut(tx,'artifact_owners',art.id,draft.sessionId);}
    for(const a of data.attempts){await tx.put('attempts',a.id,a);await tx.put('attempt_authority',a.id,'IMPORTED_UNAUTHENTICATED');for(const art of a.work)await immutablePut(tx,'artifact_owners',art.id,a.sessionId);}
  }

  /**
   * Exports all sessions, drafts, attempts, and artifacts into an integrity-checked JSON Blob.
   */
  async exportAll(): Promise<Blob> {
    const [sessions,drafts,attempts,artifacts]=await this.driver.transaction(['sessions','drafts','attempts','artifacts'],'readonly',tx=>Promise.all([tx.getAll<Session>('sessions'),tx.getAll<DraftRecord>('drafts'),tx.getAll<Attempt>('attempts'),tx.getAll<WorkArtifact>('artifacts')]));

    const data: ExportDataPayload = {
      sessions: Object.freeze([...sessions]),
      drafts: Object.freeze([...drafts]),
      attempts: Object.freeze([...attempts]),
      artifacts: Object.freeze([...artifacts]),
    };

    const canonicalDataJson = JSON.stringify(data);
    const checksum = await computeSha256(canonicalDataJson);

    const bundle: ExportBundle = {
      schema_version: STORAGE_EXPORT_VERSION,
      exported_at: new Date().toISOString(),
      checksum,
      data,
    };

    const raw = JSON.stringify(bundle, null, 2);
    return new Blob([raw], { type: 'application/json' });
  }

  /**
   * Imports an export Blob, verifying checksum and handling duplicate merges / conflicts.
   * Supports migrating legacy exports (Fault L19 and acceptance bounds).
   */
  async importVerified(blob: Blob): Promise<void> {
    const rawText = await blob.text();
    let parsed: any;

    try {
      if(findDuplicateKeyInJson(rawText))throw new Error('Duplicate JSON key');
      parsed = JSON.parse(rawText);
    } catch (err: unknown) {
      throw new StorageError(
        'INVALID_JSON',
        `Failed to parse import bundle JSON: ${err instanceof Error ? err.message : String(err)}`
      );
    }

    check(parsed&&typeof parsed==='object','Invalid bundle');
    let bundle: ExportBundle;

    if (isLegacyExport(parsed)) {
      bundle = await migrateLegacyExport(parsed);
    } else {
      if (parsed.schema_version !== STORAGE_EXPORT_VERSION) {
        throw new StorageError(
          'UNSUPPORTED_SCHEMA_VERSION',
          `Unsupported export schema version '${parsed.schema_version}'`
        );
      }

      if (!parsed.checksum || typeof parsed.checksum !== 'string') {
        throw new StorageError('INVALID_CHECKSUM', "Missing required string 'checksum'");
      }

      const calculatedChecksum = await computeSha256(JSON.stringify(parsed.data));
      if (calculatedChecksum !== parsed.checksum) {
        throw new StorageError(
          'INVALID_CHECKSUM',
          `Checksum mismatch: expected '${parsed.checksum}', calculated '${calculatedChecksum}'`
        );
      }

      bundle = parsed as ExportBundle;
    }

    validateBundleData(bundle.data);
    check(bundle.data.attempts.every(a=>a.cognitive===null)&&bundle.data.drafts.every(d=>!d.cognitive),'Cognitive history requires the complete A48 archive');
    for(const a of bundle.data.attempts)await this.qualify(a);
    // Execute atomic import transaction
    await this.driver.transaction(
      ['sessions', 'drafts', 'attempts', 'artifacts','artifact_owners','attempt_authority'],
      'readwrite',
      async (tx) => {
        // Import Sessions
        for (const ses of bundle.data.sessions ?? []) {
          const existing = await tx.get<Session>('sessions', ses.id);
          if (!existing) {
            await tx.put('sessions', ses.id, ses);
          } else {
            if(!sameSession(existing,ses))throw new StorageError('RECORD_CONFLICT','Session identity mismatch');
            // Merge attempt IDs
            const mergedAttemptIds = Array.from(
              new Set([...(existing.attemptIds ?? []), ...(ses.attemptIds ?? [])])
            );
            check(mergedAttemptIds.length<=1,'Imported session contains multiple commitments');
            await tx.put('sessions', ses.id, {
              ...existing,
              attemptIds: mergedAttemptIds,
              draftId: existing.draftId??ses.draftId,
            });
          }
        }

        // Import Drafts
        for (const draft of bundle.data.drafts ?? []) {
          for(const art of draft.artifacts)await immutablePut(tx,'artifact_owners',art.id,draft.sessionId);
          const existing = await tx.get<DraftRecord>('drafts', draft.sessionId);
          if(existing&&draft.revision===existing.revision&&!eq(existing,draft))throw new StorageError('RECORD_CONFLICT','Draft conflict');
          if (!existing || draft.revision > existing.revision) {
            await tx.put('drafts', draft.sessionId, draft);
          }
        }

        // Import Attempts (Fault L19: duplicate browser data imported twice -> no duplicate record)
        for (const att of bundle.data.attempts ?? []) {
          const before=await tx.get('attempts',att.id);await immutablePut(tx,'attempts',att.id,att);
          if(!before)await tx.put('attempt_authority',att.id,'IMPORTED_UNAUTHENTICATED');
          for(const art of att.work)await immutablePut(tx,'artifact_owners',art.id,att.sessionId);
        }

        // Import Artifacts
        for (const art of bundle.data.artifacts ?? []) {
          await immutablePut(tx,'artifacts',art.id,art);
        }
      }
    );
  }
}
