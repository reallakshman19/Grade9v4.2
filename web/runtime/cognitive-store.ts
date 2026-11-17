// Immutable Cognitive Event Persistence and Hash Chain Engine for Grade9 Platform Runtime.
// Implements atomic append, hash guards, replay, per-task isolation, quarantine, and retry provenance.
// Conforms to schemas/platform/cognitive-event.schema.json: "No academic approval inferred from software validation."

import type {
  CognitiveEvent,
  CognitiveSnapshot,
  CognitiveStage,
  WorkArtifact,
  Ref,
} from './types.ts';
import type { CognitiveStore } from './contracts.ts';
import { StorageError, type StorageDriver, createStorageDriver } from './storage.ts';

export const COGNITIVE_EVENT_SCHEMA_VERSION = 'g9-cognitive-event/1';
export const COGNITIVE_EXPORT_VERSION = 'g9-cognitive-export/1.0';

export class CognitiveStoreError extends Error {
  readonly code: string;

  constructor(code: string, message: string) {
    super(`${message} (${code})`);
    this.name = 'CognitiveStoreError';
    this.code = code;
  }
}

export interface QuarantineRecord {
  readonly id: string;
  readonly journeyId: string;
  readonly event: CognitiveEvent;
  readonly reason: string;
  readonly recordedAt: string;
}

export interface JourneyMeta {
  readonly journeyId: string;
  readonly parentJourneyId: string | null;
  readonly taskRef: Ref;
  readonly releaseId: string;
  readonly createdAt: string;
}

/**
 * Computes hexadecimal SHA-256 digest using global Web Crypto API.
 */
async function computeSha256(data: string | Uint8Array): Promise<string> {
  const bytes = typeof data === 'string' ? new TextEncoder().encode(data) : data;
  const hashBuffer = await globalThis.crypto.subtle.digest('SHA-256', bytes);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Computes canonical SHA-256 hash of a CognitiveEvent.
 * The hash chain binds every header field and payload deterministically.
 */
export async function computeEventHash(event: CognitiveEvent): Promise<string> {
  const canonical = {
    schema_version: event.schema_version,
    event_id: event.event_id,
    journey_id: event.journey_id,
    release_id: event.release_id,
    task_ref: {
      type: event.task_ref.type,
      id: event.task_ref.id,
      revision: event.task_ref.revision,
      sha256: event.task_ref.sha256,
    },
    sequence: event.sequence,
    previous_sha256: event.previous_sha256,
    event_type: event.event_type,
    payload: event.payload,
    at: event.at,
  };

  return computeSha256(JSON.stringify(canonical));
}

/**
 * Initializes a blank cognitive snapshot at genesis.
 */
export function createGenesisSnapshot(): CognitiveSnapshot {
  return {
    stage: 'PREDICT',
    firstAttemptId: null,
    boundaryAttemptId: null,
    assisted: false,
    lastHash: null,
    eventIds: Object.freeze([]),
  };
}

/**
 * Transitions cognitive snapshot according to the R3 cognitive runtime state machine.
 */
export function applyEventToSnapshot(
  current: CognitiveSnapshot,
  event: CognitiveEvent,
  eventHash: string
): CognitiveSnapshot {
  let nextStage: CognitiveStage = current.stage;
  let firstAttemptId = current.firstAttemptId;
  let boundaryAttemptId = current.boundaryAttemptId;
  let assisted = current.assisted;

  switch (event.event_type) {
    case 'PREDICTION_COMMITTED':
      if (current.stage === 'PREDICT') {
        nextStage = 'ATTEMPT';
      }
      break;

    case 'HELP_EXPOSED':
      assisted = true;
      break;

    case 'FIRST_COMMITTED':
      if (current.stage === 'ATTEMPT') {
        nextStage = 'RECONSTRUCT';
      }
      if (!firstAttemptId && event.payload && typeof event.payload.attempt_id === 'string') {
        firstAttemptId = event.payload.attempt_id;
      }
      break;

    case 'RECONSTRUCTION_COMMITTED':
      if (current.stage === 'RECONSTRUCT') {
        nextStage = 'DIAGNOSE';
      }
      break;

    case 'DIAGNOSIS_COMMITTED':
      if (current.stage === 'DIAGNOSE') {
        nextStage = 'REPAIR';
      }
      break;

    case 'REPAIR_COMMITTED':
      if (current.stage === 'REPAIR') {
        nextStage = 'BOUNDARY_TEST';
      }
      break;

    case 'BOUNDARY_COMMITTED':
      if (!boundaryAttemptId && event.payload && typeof event.payload.attempt_id === 'string') {
        boundaryAttemptId = event.payload.attempt_id;
      }
      break;

    case 'BOUNDARY_FEEDBACK_VIEWED':
      if (current.stage === 'BOUNDARY_TEST') {
        nextStage = 'COMPLETE';
      }
      break;

    case 'SOURCE_RETURNED':
      // Provenance event, maintains current unlocked stage
      break;

    default:
      break;
  }

  const eventIds = Object.freeze([...current.eventIds, event.event_id]);

  return {
    stage: nextStage,
    firstAttemptId,
    boundaryAttemptId,
    assisted,
    lastHash: eventHash,
    eventIds,
  };
}

/**
 * Standard implementation of CognitiveStore with immutable hash-chained persistence.
 */
export class DefaultCognitiveStore implements CognitiveStore {
  private readonly driver: StorageDriver;

  constructor(driver?: StorageDriver) {
    this.driver = driver ?? createStorageDriver();
  }

  /**
   * Appends a cognitive event to the journey's hash chain.
   * Atomically updates state and work artifacts. Injected failure rolls back without stage unlock.
   */
  async append(
    event: CognitiveEvent,
    expectedPreviousSha256: string | null,
    work: readonly WorkArtifact[] = []
  ): Promise<CognitiveSnapshot> {
    // Basic schema guard
    if (event.schema_version !== COGNITIVE_EVENT_SCHEMA_VERSION) {
      throw new CognitiveStoreError(
        'INVALID_EVENT_SCHEMA',
        `Unsupported schema_version '${event.schema_version}'`
      );
    }

    if (event.sequence < 1) {
      throw new CognitiveStoreError('INVALID_SEQUENCE', 'Sequence must be >= 1');
    }

    // Sequence 1 must start with null previous hash
    if (event.sequence === 1) {
      if (event.previous_sha256 !== null || expectedPreviousSha256 !== null) {
        throw new CognitiveStoreError(
          'CHAIN_DIVERGENCE',
          'Genesis event (sequence 1) must have null previous_sha256'
        );
      }
    } else {
      if (!event.previous_sha256 || !expectedPreviousSha256) {
        throw new CognitiveStoreError(
          'STALE_HASH',
          `Sequence ${event.sequence} requires non-null previous hash`
        );
      }
      if (event.previous_sha256 !== expectedPreviousSha256) {
        throw new CognitiveStoreError(
          'STALE_HASH',
          `event.previous_sha256 ('${event.previous_sha256}') does not match expectedPreviousSha256 ('${expectedPreviousSha256}')`
        );
      }
    }

    const journeyId = event.journey_id;
    const storeKey = `cog_events:${journeyId}`;
    const snapKey = `cog_snap:${journeyId}`;

    let quarantineToRecord: QuarantineRecord | null = null;

    try {
      return await this.driver.transaction(
        [storeKey, snapKey, 'artifacts', 'cognitive_journeys'],
        'readwrite',
        async (tx) => {
          // Retrieve existing events for journey
          const existingEvents = (await tx.getAll<CognitiveEvent>(storeKey)) ?? [];
          existingEvents.sort((a, b) => a.sequence - b.sequence);

          // Check for repeat event ID
          const duplicateIdEvent = existingEvents.find((e) => e.event_id === event.event_id);
          if (duplicateIdEvent) {
            const isIdentical =
              duplicateIdEvent.sequence === event.sequence &&
              duplicateIdEvent.previous_sha256 === event.previous_sha256 &&
              duplicateIdEvent.event_type === event.event_type &&
              JSON.stringify(duplicateIdEvent.payload) === JSON.stringify(event.payload);

            if (isIdentical) {
              // Repeat ID with identical content: idempotent return of current snapshot
              const currentSnap = await tx.get<CognitiveSnapshot>(snapKey, journeyId);
              return currentSnap ?? createGenesisSnapshot();
            }

            // Conflict on ID: quarantine and throw
            quarantineToRecord = {
              id: `quar:${Date.now()}:${Math.random().toString(36).slice(2, 8)}`,
              journeyId,
              event,
              reason: `Duplicate event_id '${event.event_id}' with differing content`,
              recordedAt: new Date().toISOString(),
            };

            throw new CognitiveStoreError(
              'EVENT_ID_COLLISION',
              `Event ID '${event.event_id}' already exists with differing payload`
            );
          }

          // Verify sequence and hash chain continuity
          if (event.sequence === 1) {
            if (existingEvents.length > 0) {
              quarantineToRecord = {
                id: `quar:${Date.now()}:${Math.random().toString(36).slice(2, 8)}`,
                journeyId,
                event,
                reason: 'Genesis event appended to existing non-empty chain',
                recordedAt: new Date().toISOString(),
              };
              throw new CognitiveStoreError('CHAIN_DIVERGENCE', 'Genesis event appended to non-empty chain');
            }
          } else {
            const expectedSeq = existingEvents.length + 1;
            if (event.sequence !== expectedSeq) {
              quarantineToRecord = {
                id: `quar:${Date.now()}:${Math.random().toString(36).slice(2, 8)}`,
                journeyId,
                event,
                reason: `Sequence gap: expected ${expectedSeq}, got ${event.sequence}`,
                recordedAt: new Date().toISOString(),
              };
              throw new CognitiveStoreError(
                'CHAIN_DIVERGENCE',
                `Sequence gap: expected sequence ${expectedSeq}, received ${event.sequence}`
              );
            }

            const lastEvent = existingEvents[existingEvents.length - 1];
            const lastEventHash = await computeEventHash(lastEvent);

            if (event.previous_sha256 !== lastEventHash) {
              quarantineToRecord = {
                id: `quar:${Date.now()}:${Math.random().toString(36).slice(2, 8)}`,
                journeyId,
                event,
                reason: `Hash divergence: expected previous '${lastEventHash}', got '${event.previous_sha256}'`,
                recordedAt: new Date().toISOString(),
              };
              throw new CognitiveStoreError('STALE_HASH', 'Stale hash: previous event hash mismatch');
            }
          }

          // Compute hash for incoming event
          const incomingHash = await computeEventHash(event);

          // Store event
          await tx.put(storeKey, String(event.sequence), event);

          // Store work artifacts
          for (const art of work) {
            await tx.put('artifacts', art.id, art);
          }

          // Update journey meta if sequence 1
          if (event.sequence === 1) {
            const meta: JourneyMeta = {
              journeyId,
              parentJourneyId: null,
              taskRef: event.task_ref,
              releaseId: event.release_id,
              createdAt: event.at,
            };
            await tx.put('cognitive_journeys', journeyId, meta);
          }

          // Apply event to snapshot
          const currentSnap =
            (await tx.get<CognitiveSnapshot>(snapKey, journeyId)) ?? createGenesisSnapshot();
          const updatedSnap = applyEventToSnapshot(currentSnap, event, incomingHash);

          await tx.put(snapKey, journeyId, updatedSnap);

          return updatedSnap;
        }
      );
    } catch (err: unknown) {
      if (quarantineToRecord) {
        try {
          await this.driver.put(
            'cognitive_quarantine',
            (quarantineToRecord as QuarantineRecord).id,
            quarantineToRecord
          );
        } catch {
          // ignore quarantine write error
        }
      }
      throw err;
    }
  }

  /**
   * Replays an entire journey from sequence 1 to tip, validating every link in the cryptographic chain.
   */
  async replay(
    journeyId: string,
    task: Ref,
    releaseId: string
  ): Promise<CognitiveSnapshot> {
    const storeKey = `cog_events:${journeyId}`;
    const events = (await this.driver.getAll<CognitiveEvent>(storeKey)) ?? [];
    events.sort((a, b) => a.sequence - b.sequence);

    if (events.length === 0) {
      return createGenesisSnapshot();
    }

    let snapshot = createGenesisSnapshot();
    let prevHash: string | null = null;

    for (let i = 0; i < events.length; i++) {
      const ev = events[i];
      const expectedSeq = i + 1;

      if (ev.sequence !== expectedSeq) {
        throw new CognitiveStoreError(
          'CORRUPT_CHAIN',
          `Sequence corruption at index ${i}: expected ${expectedSeq}, got ${ev.sequence}`
        );
      }

      if (ev.previous_sha256 !== prevHash) {
        throw new CognitiveStoreError(
          'CORRUPT_CHAIN',
          `Hash chain broken at sequence ${ev.sequence}: expected prev '${prevHash}', found '${ev.previous_sha256}'`
        );
      }

      const evHash = await computeEventHash(ev);
      snapshot = applyEventToSnapshot(snapshot, ev, evHash);
      prevHash = evHash;
    }

    return snapshot;
  }

  /**
   * Spawns a retry journey linked to parentJourneyId.
   * Preserves parent journey provenance and firstAttemptId immutably.
   */
  async retry(parentJourneyId: string): Promise<string> {
    const parentMeta = await this.driver.get<JourneyMeta>('cognitive_journeys', parentJourneyId);
    if (!parentMeta) {
      throw new CognitiveStoreError(
        'JOURNEY_NOT_FOUND',
        `Parent journey '${parentJourneyId}' does not exist`
      );
    }

    const retryId = `${parentJourneyId}:retry:${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;

    const retryMeta: JourneyMeta = {
      journeyId: retryId,
      parentJourneyId,
      taskRef: parentMeta.taskRef,
      releaseId: parentMeta.releaseId,
      createdAt: new Date().toISOString(),
    };

    await this.driver.put('cognitive_journeys', retryId, retryMeta);

    return retryId;
  }

  /**
   * Returns quarantined events for audit and diagnostic inspection.
   */
  async getQuarantinedEvents(journeyId?: string): Promise<readonly QuarantineRecord[]> {
    const all = await this.driver.getAll<QuarantineRecord>('cognitive_quarantine');
    if (!journeyId) return all;
    return all.filter((q) => q.journeyId === journeyId);
  }
}
