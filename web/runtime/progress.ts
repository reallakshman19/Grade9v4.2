// Progress Store and Export/Import Subsystem for Grade9 Platform Runtime.
// Implements transactional drafts, attempts, artifacts, local export/import, conflict resolution, and legacy migration.
// Conforms to R4 engineering contracts: "No academic approval inferred from software validation."

import type { Session, Attempt, WorkArtifact, Response } from './types.ts';
import type { ProgressStore } from './contracts.ts';
import {
  StorageError,
  type StorageDriver,
  type DraftRecord,
  createStorageDriver,
} from './storage.ts';
import { validateResponse } from './response.ts';

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
  const hashBuffer = await globalThis.crypto.subtle.digest('SHA-256', bytes);
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
export async function migrateLegacyExport(raw: any): Promise<ExportBundle> {
  const sessions: Session[] = [];
  const attempts: Attempt[] = [];
  const artifacts: WorkArtifact[] = [];

  const rawSessions = Array.isArray(raw.sessions) ? raw.sessions : [];
  for (const s of rawSessions) {
    sessions.push({
      id: s.id ?? s.sessionId ?? `ses:migrated:${Math.random().toString(36).slice(2, 10)}`,
      releaseId: s.releaseId ?? 'rel:migrated:legacy',
      item: s.item ?? {
        type: 'QUESTION',
        id: s.itemId ?? 'demo:legacy:item',
        revision: 1,
        sha256: '0'.repeat(64),
      },
      origin: s.origin ?? null,
      returnRoute: s.returnRoute ?? null,
      mode: s.mode ?? 'PRACTICE',
      cursor: typeof s.cursor === 'number' ? s.cursor : 0,
      attemptIds: Array.isArray(s.attemptIds) ? s.attemptIds : [],
      draftId: s.draftId ?? null,
    });
  }

  const rawAttempts = Array.isArray(raw.attempts) ? raw.attempts : [];
  for (const a of rawAttempts) {
    const attemptId = a.id ?? `att:migrated:${Math.random().toString(36).slice(2, 10)}`;
    const attempt: Attempt = {
      id: attemptId,
      sessionId: a.sessionId ?? sessions[0]?.id ?? 'ses:migrated:unknown',
      item: a.item ?? {
        type: 'QUESTION',
        id: a.itemId ?? 'demo:legacy:item',
        revision: 1,
        sha256: '0'.repeat(64),
      },
      releaseId: a.releaseId ?? 'rel:migrated:legacy',
      response: a.response ?? { kind: 'SINGLE_CHOICE', value: 'legacy_value' },
      work: Array.isArray(a.work) ? a.work : [],
      hintIds: Array.isArray(a.hintIds) ? a.hintIds : [],
      submittedAt: a.submittedAt ?? a.at ?? new Date().toISOString(),
      grade: a.grade ?? {
        status: 'REVIEW_PENDING',
        points: null,
        maxPoints: 1,
        reasonCode: 'MIGRATED_FROM_LEGACY',
      },
    };
    attempts.push(attempt);
  }

  const data: ExportDataPayload = {
    sessions: Object.freeze(sessions),
    drafts: Object.freeze([]),
    attempts: Object.freeze(attempts),
    artifacts: Object.freeze(artifacts),
  };

  const canonicalJson = JSON.stringify(data);
  const checksum = await computeSha256(canonicalJson);

  return {
    schema_version: STORAGE_EXPORT_VERSION,
    exported_at: raw.exported_at ?? new Date().toISOString(),
    checksum,
    data,
  };
}

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
          draftId: session.id,
        });

        for (const art of artifacts) {
          await tx.put('artifacts', art.id, art);
        }
      }
    );
  }

  /**
   * Loads draft record for a session, returning null if no draft exists.
   */
  async loadDraft(sessionId: string): Promise<DraftRecord | null> {
    const draft = await this.driver.get<DraftRecord>('drafts', sessionId);
    return draft ?? null;
  }

  /**
   * Appends an attempt, updating session attemptIds and persisting work artifacts.
   * Idempotent on identical attempt, rejects conflicting attempt with RECORD_CONFLICT.
   */
  async appendAttempt(attempt: Attempt): Promise<void> {
    await this.driver.transaction(
      ['attempts', 'sessions', 'artifacts'],
      'readwrite',
      async (tx) => {
        const existing = await tx.get<Attempt>('attempts', attempt.id);
        if (existing) {
          // Compare content for conflict
          const isIdentical =
            existing.sessionId === attempt.sessionId &&
            existing.submittedAt === attempt.submittedAt &&
            JSON.stringify(existing.response) === JSON.stringify(attempt.response);

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
        }

        for (const art of attempt.work) {
          await tx.put('artifacts', art.id, art);
        }
      }
    );
  }

  /**
   * Exports all sessions, drafts, attempts, and artifacts into an integrity-checked JSON Blob.
   */
  async exportAll(): Promise<Blob> {
    const [sessions, drafts, attempts, artifacts] = await Promise.all([
      this.driver.getAll<Session>('sessions'),
      this.driver.getAll<DraftRecord>('drafts'),
      this.driver.getAll<Attempt>('attempts'),
      this.driver.getAll<WorkArtifact>('artifacts'),
    ]);

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
      parsed = JSON.parse(rawText);
    } catch (err: unknown) {
      throw new StorageError(
        'INVALID_JSON',
        `Failed to parse import bundle JSON: ${err instanceof Error ? err.message : String(err)}`
      );
    }

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
          if (!existing || draft.revision > existing.revision) {
            await tx.put('drafts', draft.sessionId, draft);
          }
        }

        // Import Attempts (Fault L19: duplicate browser data imported twice -> no duplicate record)
        for (const att of bundle.data.attempts ?? []) {
          const existing = await tx.get<Attempt>('attempts', att.id);
          if (!existing) {
            await tx.put('attempts', att.id, att);
          }
          // If existing is present and identical, skip cleanly without error
        }

        // Import Artifacts
        for (const art of bundle.data.artifacts ?? []) {
          const existing = await tx.get<WorkArtifact>('artifacts', art.id);
          if (!existing) {
            await tx.put('artifacts', art.id, art);
          }
        }
      }
    );
  }
}
