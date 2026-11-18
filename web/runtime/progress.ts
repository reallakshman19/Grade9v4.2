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
  return (
    obj.export_version === LEGACY_EXPORT_VERSION ||
    obj.legacy === true ||
    obj.version === '1.0' ||
    ('attempts' in obj && !('data' in obj))
  );
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
function refOk(x:any){return x&&typeof x.id==='string'&&typeof x.type==='string'&&Number.isSafeInteger(x.revision)&&x.revision>0&&/^[a-f0-9]{64}$/.test(x.sha256);}
function artifactOk(x:any){return x&&typeof x.id==='string'&&x.version===1&&['NOTE','EQUATION','INK','TABLE','GRAPH','STRUCTURE','ATTACHMENT'].includes(x.kind)&&x.value!==undefined;}
function validateAttempt(a:any){check(a&&typeof a.id==='string'&&typeof a.sessionId==='string'&&typeof a.releaseId==='string'&&refOk(a.item)&&Array.isArray(a.work)&&a.work.every(artifactOk)&&Array.isArray(a.hintIds)&&typeof a.submittedAt==='string'&&a.cognitive!==undefined&&a.grade&&Number.isFinite(a.grade.maxPoints)&&a.grade.maxPoints>=0&&((a.grade.status==='SCORED'&&Number.isFinite(a.grade.points)&&a.grade.points>=0&&a.grade.points<=a.grade.maxPoints)||(['REVIEW_PENDING','INVALID','UNSUPPORTED'].includes(a.grade.status)&&a.grade.points===null)),'Invalid attempt');validateResponse(a.response);}
function validateBundleData(data:any):void{
  check(data&&['sessions','drafts','attempts','artifacts'].every(k=>Array.isArray(data[k])),'Invalid export structure');
  for(const [name,key] of [['sessions','id'],['drafts','sessionId'],['attempts','id'],['artifacts','id']]){const ids=new Set();for(const x of data[name]){check(x&&typeof x[key]==='string'&&!ids.has(x[key]),'Duplicate or missing record identity');ids.add(x[key]);}}
  for(const s of data.sessions)check(refOk(s.item)&&typeof s.releaseId==='string'&&['LEARN','PRACTICE','SIMULATED_EXAM'].includes(s.mode)&&Array.isArray(s.attemptIds)&&Number.isSafeInteger(s.cursor)&&s.cursor>=0,'Invalid session');
  for(const a of data.attempts){validateAttempt(a);const s=data.sessions.find((s:Session)=>s.id===a.sessionId);check(s&&s.releaseId===a.releaseId&&sameRef(s.item,a.item)&&s.attemptIds.includes(a.id),'Orphan or mismatched attempt');}
  for(const d of data.drafts){check(data.sessions.some((s:Session)=>s.id===d.sessionId)&&Number.isSafeInteger(d.revision)&&d.revision>0&&Array.isArray(d.artifacts)&&d.artifacts.every(artifactOk),'Invalid draft');validateResponse(d.response);}
  for(const a of data.artifacts)check(artifactOk(a),'Invalid artifact');
}
async function immutablePut<T>(tx:import('./storage.ts').TransactionContext,s:string,id:string,value:T){const existing=await tx.get<T>(s,id);if(existing!==undefined&&!eq(existing,value))throw new StorageError('RECORD_CONFLICT','Conflicting '+s+' identity '+id);if(existing===undefined)await tx.put(s,id,value);}
/**
 * Standard implementation of ProgressStore.
 * Governs draft management, attempt logging, export bundles, and atomic verification.
 */
export class DefaultProgressStore implements ProgressStore {
  private readonly driver: StorageDriver;

  constructor(driver: StorageDriver) {
    this.driver = driver;
  }

  /**
   * Saves a draft response and associated artifacts atomically.
   * If storage fails (quota, aborted), throws StorageError without pretending success ("no fake Saved").
   */
  async saveDraft(
    session: Session,
    response: Response,
    artifacts: readonly WorkArtifact[]
  ): Promise<void> {
    // Validate response schema before persisting
    validateResponse(response);

    await this.driver.transaction(
      ['drafts', 'sessions', 'artifacts'],
      'readwrite',
      async (tx) => {
        const existing = await tx.get<DraftRecord>('drafts', session.id);
        const priorSession=await tx.get<Session>('sessions',session.id);
        if(priorSession&&(!sameRef(priorSession.item,session.item)||priorSession.releaseId!==session.releaseId))throw new StorageError('RECORD_CONFLICT','Session identity mismatch');
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
  async appendAttempt(attempt: Attempt): Promise<void> {
    validateAttempt(attempt);
    await this.driver.transaction(
      ['attempts', 'sessions', 'artifacts','drafts'],
      'readwrite',
      async (tx) => {
        const existing = await tx.get<Attempt>('attempts', attempt.id);
        if (existing) {
          // Compare content for conflict
          const isIdentical = eq(existing,attempt);

          if (!isIdentical) {
            throw new StorageError(
              'RECORD_CONFLICT',
              `Attempt with id '${attempt.id}' already exists with differing data`
            );
          }
          // Identical attempt: no-op (idempotent duplicate append)
          return;
        }

        await tx.put('attempts', attempt.id, attempt);

        const session = await tx.get<Session>('sessions', attempt.sessionId);
        if(!session||session.releaseId!==attempt.releaseId||!sameRef(session.item,attempt.item))throw new StorageError('RECORD_CONFLICT','Attempt missing matching session');
        if (session) {
          const attemptIds = session.attemptIds ? [...session.attemptIds] : [];
          if (!attemptIds.includes(attempt.id)) {
            attemptIds.push(attempt.id);
          }
          await tx.put('sessions', session.id, {
            ...session,
            attemptIds,
            draftId: null, // Clear active draft on commit
          });
          await tx.delete('drafts',session.id);
        }

        for (const art of attempt.work) {
          await immutablePut(tx,'artifacts',art.id,art);
        }
      }
    );
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
    // Execute atomic import transaction
    await this.driver.transaction(
      ['sessions', 'drafts', 'attempts', 'artifacts'],
      'readwrite',
      async (tx) => {
        // Import Sessions
        for (const ses of bundle.data.sessions ?? []) {
          const existing = await tx.get<Session>('sessions', ses.id);
          if (!existing) {
            await tx.put('sessions', ses.id, ses);
          } else {
            if(existing.releaseId!==ses.releaseId||!sameRef(existing.item,ses.item))throw new StorageError('RECORD_CONFLICT','Session identity mismatch');
            // Merge attempt IDs
            const mergedAttemptIds = Array.from(
              new Set([...(existing.attemptIds ?? []), ...(ses.attemptIds ?? [])])
            );
            await tx.put('sessions', ses.id, {
              ...existing,
              attemptIds: mergedAttemptIds,
            });
          }
        }

        // Import Drafts
        for (const draft of bundle.data.drafts ?? []) {
          const existing = await tx.get<DraftRecord>('drafts', draft.sessionId);
          if(existing&&draft.revision===existing.revision&&!eq(existing,draft))throw new StorageError('RECORD_CONFLICT','Draft conflict');
          if (!existing || draft.revision > existing.revision) {
            await tx.put('drafts', draft.sessionId, draft);
          }
        }

        // Import Attempts (Fault L19: duplicate browser data imported twice -> no duplicate record)
        for (const att of bundle.data.attempts ?? []) {
          await immutablePut(tx,'attempts',att.id,att);
        }

        // Import Artifacts
        for (const art of bundle.data.artifacts ?? []) {
          await immutablePut(tx,'artifacts',art.id,art);
        }
      }
    );
  }
}
