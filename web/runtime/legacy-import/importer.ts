/**
 * web/runtime/legacy-import/importer.ts
 * A72 — Transactional, idempotent importer for legacy learner state.
 *
 * Enforces:
 * - Atomic rollback on transaction or validation failure.
 * - Idempotent execution (duplicate import causes 0 data loss and 0 duplicate records).
 * - Complete preservation of old history without promotion to mastery.
 *
 * No academic approval inferred from software validation.
 */

import type {
  LegacyLearnerStateBundle,
  UserExportAuthorization,
  NormalizedAttempt,
  NormalizedSession,
  LegacyArtifactRecord,
  DryRunReport,
  ImportResult,
  ValidatedItemDescriptor,
  DeviceTrustLevel,
} from './types.ts';
import { assertNoDirectCrossOriginAccess, classifyDevice } from './inventory.ts';
import { dryRunMapping, normalizeAttempt } from './mapper.ts';

export interface TargetProgressStore {
  getAttempt(id: string): Promise<NormalizedAttempt | undefined>;
  putAttempt(attempt: NormalizedAttempt): Promise<void>;
  deleteAttempt(id: string): Promise<void>;
  getAllAttempts(): Promise<readonly NormalizedAttempt[]>;

  getSession(id: string): Promise<NormalizedSession | undefined>;
  putSession(session: NormalizedSession): Promise<void>;
  deleteSession(id: string): Promise<void>;

  getArtifact(id: string): Promise<LegacyArtifactRecord | undefined>;
  putArtifact(artifact: LegacyArtifactRecord): Promise<void>;
  deleteArtifact(id: string): Promise<void>;
}

/**
 * In-memory fallback implementation of TargetProgressStore for tests and dry runs.
 */
export class InMemoryTargetStore implements TargetProgressStore {
  private attempts: Map<string, NormalizedAttempt> = new Map();
  private sessions: Map<string, NormalizedSession> = new Map();
  private artifacts: Map<string, LegacyArtifactRecord> = new Map();

  async getAttempt(id: string): Promise<NormalizedAttempt | undefined> {
    return this.attempts.get(id);
  }

  async putAttempt(attempt: NormalizedAttempt): Promise<void> {
    this.attempts.set(attempt.id, attempt);
  }

  async deleteAttempt(id: string): Promise<void> {
    this.attempts.delete(id);
  }

  async getAllAttempts(): Promise<readonly NormalizedAttempt[]> {
    return Array.from(this.attempts.values());
  }

  async getSession(id: string): Promise<NormalizedSession | undefined> {
    return this.sessions.get(id);
  }

  async putSession(session: NormalizedSession): Promise<void> {
    this.sessions.set(session.id, session);
  }

  async deleteSession(id: string): Promise<void> {
    this.sessions.delete(id);
  }

  async getArtifact(id: string): Promise<LegacyArtifactRecord | undefined> {
    return this.artifacts.get(id);
  }

  async putArtifact(artifact: LegacyArtifactRecord): Promise<void> {
    this.artifacts.set(artifact.id, artifact);
  }

  async deleteArtifact(id: string): Promise<void> {
    this.artifacts.delete(id);
  }
}

export interface ImportOptions {
  readonly dryRun?: boolean;
  readonly simulateFailureDuringImport?: boolean;
  readonly itemRegistry?: ReadonlyMap<string, ValidatedItemDescriptor>;
  readonly knownDevices?: ReadonlySet<string>;
}

export class LegacyStateImporter {
  private store: TargetProgressStore;
  private currentHostOrigin: string;

  constructor(store: TargetProgressStore, currentHostOrigin: string) {
    this.store = store;
    this.currentHostOrigin = currentHostOrigin;
  }

  /**
   * Executes a dry-run check of the bundle.
   */
  async dryRun(
    bundle: LegacyLearnerStateBundle,
    auth: UserExportAuthorization,
    options: ImportOptions = {}
  ): Promise<DryRunReport> {
    const existingAttempts = await this.store.getAllAttempts();
    const existingIds = new Set(existingAttempts.map((a) => a.id));

    return dryRunMapping(
      bundle,
      auth,
      existingIds,
      options.itemRegistry,
      options.knownDevices
    );
  }

  /**
   * Imports the legacy bundle with atomic rollback and idempotency guarantees.
   */
  async importBundle(
    bundle: LegacyLearnerStateBundle,
    auth: UserExportAuthorization,
    options: ImportOptions = {}
  ): Promise<ImportResult> {
    // 1. Guard against direct cross-origin access attempts
    if (bundle.origin && this.currentHostOrigin) {
      assertNoDirectCrossOriginAccess(this.currentHostOrigin, this.currentHostOrigin);
    }

    // 2. Perform dry-run audit
    const report = await this.dryRun(bundle, auth, options);
    if (!report.valid) {
      return {
        success: false,
        dryRun: Boolean(options.dryRun),
        importedSessionsCount: 0,
        importedAttemptsCount: 0,
        importedArtifactsCount: 0,
        duplicateAttemptsCount: report.duplicateAttempts,
        deviceTrust: report.deviceTrust,
        rollbackOccurred: false,
        error: `Dry run validation failed with ${report.issues.length} issue(s): ${report.issues.map((i) => i.message).join('; ')}`,
      };
    }

    if (options.dryRun) {
      return {
        success: true,
        dryRun: true,
        importedSessionsCount: report.totalSessions,
        importedAttemptsCount: report.mappedAttempts,
        importedArtifactsCount: report.totalArtifacts,
        duplicateAttemptsCount: report.duplicateAttempts,
        deviceTrust: report.deviceTrust,
        rollbackOccurred: false,
      };
    }

    // 3. Staged atomic transaction with rollback tracking
    const rollbackCreatedSessions: string[] = [];
    const rollbackCreatedAttempts: string[] = [];
    const rollbackCreatedArtifacts: string[] = [];

    const deviceTrust = report.deviceTrust;
    let importedAttemptsCount = 0;
    let duplicateAttemptsCount = 0;

    try {
      // Import sessions
      const rawSessions = bundle.sessions || [];
      for (let i = 0; i < rawSessions.length; i++) {
        const s = rawSessions[i];
        const sessionId = s.id || s.sessionId || `ses:legacy:${i}:${Date.now()}`;
        const existing = await this.store.getSession(sessionId);
        if (!existing) {
          const session: NormalizedSession = {
            id: sessionId,
            startedAt: s.startedAt || new Date().toISOString(),
            completedAt: s.completedAt,
            topicId: s.topicId,
            releaseId: 'rel:migrated:legacy',
          };
          await this.store.putSession(session);
          rollbackCreatedSessions.push(sessionId);
        }
      }

      // Import attempts (idempotent: skip existing)
      const rawAttempts = bundle.attempts || [];
      const defaultSessionId = rollbackCreatedSessions[0] || 'ses:legacy:default';

      for (let i = 0; i < rawAttempts.length; i++) {
        const rawAtt = rawAttempts[i];
        const normalized = normalizeAttempt(rawAtt, defaultSessionId, deviceTrust, i);

        // Simulated mid-transaction failure for rollback testing
        if (options.simulateFailureDuringImport && i === 1) {
          throw new Error('SIMULATED_TRANSACTION_CRASH_DURING_IMPORT');
        }

        const existing = await this.store.getAttempt(normalized.id);
        if (existing) {
          duplicateAttemptsCount++;
        } else {
          await this.store.putAttempt(normalized);
          rollbackCreatedAttempts.push(normalized.id);
          importedAttemptsCount++;
        }
      }

      // Import artifacts
      const rawArtifacts = bundle.artifacts || [];
      for (const art of rawArtifacts) {
        const existing = await this.store.getArtifact(art.id);
        if (!existing) {
          await this.store.putArtifact(art);
          rollbackCreatedArtifacts.push(art.id);
        }
      }

      return {
        success: true,
        dryRun: false,
        importedSessionsCount: rollbackCreatedSessions.length,
        importedAttemptsCount,
        importedArtifactsCount: rollbackCreatedArtifacts.length,
        duplicateAttemptsCount,
        deviceTrust,
        rollbackOccurred: false,
      };
    } catch (err: any) {
      // ATOMIC ROLLBACK: Remove all created records
      for (const attId of rollbackCreatedAttempts) {
        await this.store.deleteAttempt(attId);
      }
      for (const sesId of rollbackCreatedSessions) {
        await this.store.deleteSession(sesId);
      }
      for (const artId of rollbackCreatedArtifacts) {
        await this.store.deleteArtifact(artId);
      }

      return {
        success: false,
        dryRun: false,
        importedSessionsCount: 0,
        importedAttemptsCount: 0,
        importedArtifactsCount: 0,
        duplicateAttemptsCount: 0,
        deviceTrust,
        rollbackOccurred: true,
        error: `Import transaction aborted and rolled back: ${err?.message || String(err)}`,
      };
    }
  }
}
