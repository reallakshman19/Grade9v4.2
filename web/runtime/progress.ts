// Progress Store and Export/Import Subsystem for Grade9 Platform Runtime.
// Implements transactional drafts, attempts, artifacts, local export/import, conflict resolution, and legacy migration.
// Conforms to R4 engineering contracts: "No academic approval inferred from software validation."

import type { Session, Attempt, WorkArtifact, Response, Draft } from './types.ts';
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
const eq=(a:unknown,b:unknown)=>canonicalJson(a)===canonicalJson(b);
function check(condition:unknown,message:string):asserts condition{if(!condition)throw new StorageError('INVALID_RECORD',message);}
function refOk(x:any){return x&&Object.keys(x).sort().join(',')==='id,revision,sha256,type'&&typeof x.id==='string'&&x.id.trim().length>0&&typeof x.type==='string'&&Number.isSafeInteger(x.revision)&&x.revision>0&&typeof x.sha256==='string'&&/^[a-f0-9]{64}$/.test(x.sha256);}
const nonblank=(x:unknown):x is string=>typeof x==='string'&&x.trim().length>0;
const timestamp=(x:unknown)=>typeof x==='string'&&/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.\d+)?(?:Z|\+00:00)$/.test(x)&&Number.isFinite(Date.parse(x));
const uniqueStrings=(x:unknown)=>Array.isArray(x)&&x.every(nonblank)&&new Set(x).size===x.length;
function sessionOk(s:any){return s&&nonblank(s.id)&&refOk(s.item)&&['QUESTION','FRESH_TASK'].includes(s.item.type)&&nonblank(s.releaseId)&&['LEARN','PRACTICE','SIMULATED_EXAM'].includes(s.mode)&&uniqueStrings(s.attemptIds)&&Number.isSafeInteger(s.cursor)&&s.cursor>=0&&(s.draftId===null||s.draftId===s.id)&&(s.origin===null||refOk(s.origin))&&(s.returnRoute===undefined||s.returnRoute===null||typeof s.returnRoute==='string');}
function sameSession(a:Session,b:Session){return sameRef(a.item,b.item)&&a.releaseId===b.releaseId&&a.mode===b.mode&&eq(a.origin,b.origin)&&(a.returnRoute??null)===(b.returnRoute??null);}
function artifactOk(x:any){if(!x||Object.keys(x).sort().join(',')!=='id,kind,value,version'||!nonblank(x.id)||x.version!==1||!['NOTE','EQUATION','INK','TABLE','GRAPH','STRUCTURE','ATTACHMENT'].includes(x.kind))return false;try{canonicalJson(x.value);return x.value!==undefined;}catch{return false;}}
function validateAttempt(a:any){check(a&&nonblank(a.id)&&nonblank(a.sessionId)&&nonblank(a.releaseId)&&refOk(a.item)&&Array.isArray(a.work)&&a.work.every(artifactOk)&&new Set(a.work.map((w:WorkArtifact)=>w.id)).size===a.work.length&&uniqueStrings(a.hintIds)&&timestamp(a.submittedAt)&&a.cognitive!==undefined&&a.grade&&Number.isFinite(a.grade.maxPoints)&&a.grade.maxPoints>=0&&((a.grade.status==='SCORED'&&Number.isFinite(a.grade.points)&&a.grade.points>=0&&a.grade.points<=a.grade.maxPoints)||(['REVIEW_PENDING','INVALID','UNSUPPORTED'].includes(a.grade.status)&&a.grade.points===null)),'Invalid attempt');validateResponse(a.response);if(a.assessmentRef!==undefined)check(refOk(a.assessmentRef)&&a.assessmentRef.type==='ASSESSMENT'&&nonblank(a.scoringVersion),'Invalid assessment binding');if(a.cognitive!==null){const c=a.cognitive;check(c&&c.journey&&nonblank(c.journey.journeyId)&&nonblank(c.journey.taskInstanceId)&&c.journey.releaseId===a.releaseId&&refOk(c.journey.task)&&nonblank(c.originSessionId)&&refOk(c.originRef)&&Number.isSafeInteger(c.originCursor)&&c.originCursor>=0,'Invalid cognitive lineage');}}
function validateBundleData(data:any):void{
  check(data&&['sessions','drafts','attempts','artifacts'].every(k=>Array.isArray(data[k])),'Invalid export structure');
  for(const [name,key] of [['sessions','id'],['drafts','sessionId'],['attempts','id'],['artifacts','id']]){const ids=new Set();for(const x of data[name]){check(x&&typeof x[key]==='string'&&!ids.has(x[key]),'Duplicate or missing record identity');ids.add(x[key]);}}
  for(const s of data.sessions){check(sessionOk(s),'Invalid session');for(const id of s.attemptIds)check(data.attempts.some((a:Attempt)=>a.id===id&&a.sessionId===s.id),'Session has missing or foreign attempt');check(s.draftId===null?!data.drafts.some((d:DraftRecord)=>d.sessionId===s.id):data.drafts.some((d:DraftRecord)=>d.sessionId===s.id),'Session draft link mismatch');}
  for(const a of data.attempts){validateAttempt(a);const s=data.sessions.find((s:Session)=>s.id===a.sessionId);check(s&&s.releaseId===a.releaseId&&sameRef(s.item,a.item)&&s.attemptIds.includes(a.id),'Orphan or mismatched attempt');}
  for(const d of data.drafts){check(data.sessions.some((s:Session)=>s.id===d.sessionId)&&Number.isSafeInteger(d.revision)&&d.revision>0&&Array.isArray(d.artifacts)&&d.artifacts.every(artifactOk),'Invalid draft');validateResponse(d.response);}
  for(const a of data.artifacts)check(artifactOk(a),'Invalid artifact');
  const owners=new Map<string,string>();for(const [owner,work] of [...data.attempts.map((a:Attempt)=>[a.sessionId,a.work]),...data.drafts.map((d:DraftRecord)=>[d.sessionId,d.artifacts])] as [string,readonly WorkArtifact[]][]){for(const w of work){const canonical=data.artifacts.find((a:WorkArtifact)=>a.id===w.id);check(canonical&&eq(canonical,w),'Missing or conflicting canonical artifact');check(!owners.has(w.id)||owners.get(w.id)===owner,'Artifact belongs to another session');owners.set(w.id,owner);}}
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
    artifacts: readonly WorkArtifact[], expectedRevision=0
  ): Promise<void> {
    // Snapshot caller values before awaiting a transaction.
    session=structuredClone(session);response=structuredClone(response);artifacts=structuredClone(artifacts);
    validateResponse(response);check(sessionOk(session)&&artifacts.every(artifactOk)&&new Set(artifacts.map(a=>a.id)).size===artifacts.length,'Invalid draft');

    await this.driver.transaction(
      ['drafts', 'sessions', 'artifacts','artifact_owners'],
      'readwrite',
      async (tx) => {
        const existing = await tx.get<DraftRecord>('drafts', session.id);
        const priorSession=await tx.get<Session>('sessions',session.id);
        if(priorSession&&!sameSession(priorSession,session))throw new StorageError('RECORD_CONFLICT','Session identity mismatch');
        check((existing?.revision??0)===expectedRevision,'Stale draft revision');
        check(!!priorSession||session.attemptIds.length===0,'New session cannot claim previous attempts');
        const revision = existing ? existing.revision + 1 : 1;

        const draft: DraftRecord = {
          sessionId: session.id,
          response,
          artifacts,
          savedAt: new Date().toISOString(),
          revision,
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
    return this.driver.transaction(['drafts','sessions'],'readonly',async tx=>{const draft=await tx.get<DraftRecord>('drafts',sessionId);if(!draft)return null;const session=await tx.get<Session>('sessions',sessionId);check(session,'Draft missing session');return {...draft,session,cognitive:null};});
  }

  /**
   * Appends an attempt, updating session attemptIds and persisting work artifacts.
   * Idempotent on identical attempt, rejects conflicting attempt with RECORD_CONFLICT.
   */
  static readonly attemptStores=['attempts','sessions','artifacts','drafts','artifact_owners','attempt_authority'] as const;
  async appendAttempt(attempt:Attempt):Promise<void>{
    attempt=structuredClone(attempt);
    await this.driver.transaction(DefaultProgressStore.attemptStores,'readwrite',tx=>this.commitAttempt(tx,attempt));
  }
  // For A48's atomic transaction. The same validated write path is used by both APIs.
  async commitAttempt(tx:import('./storage.ts').TransactionContext,attempt:Attempt):Promise<void>{
    attempt=structuredClone(attempt);const qualified=await this.qualify(attempt);
    const session=await tx.get<Session>('sessions',attempt.sessionId);
    if(!session||!sameRef(session.item,attempt.item)||session.releaseId!==attempt.releaseId)throw new StorageError('RECORD_CONFLICT','Attempt missing matching session');
    const old=await tx.get<Attempt>('attempts',attempt.id);
    if(old){if(!eq(old,attempt)||!session.attemptIds.includes(attempt.id))throw new StorageError('RECORD_CONFLICT','Conflicting attempt identity');return;}
    for(const art of attempt.work){await immutablePut(tx,'artifact_owners',art.id,attempt.sessionId);await immutablePut(tx,'artifacts',art.id,art);}
    await tx.put('attempts',attempt.id,attempt);
    await tx.put('attempt_authority',attempt.id,qualified?'LOCAL_VERIFIED_SCORE':'LOCAL_UNVERIFIED');
    await tx.put('sessions',session.id,{...session,attemptIds:[...session.attemptIds,attempt.id],draftId:null});
    await tx.delete('drafts',session.id);
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
