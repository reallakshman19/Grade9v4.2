/**
 * web/runtime/legacy-import/types.ts
 * A72 — Legacy learner-state export/import interfaces and contracts.
 *
 * Strict adherence to:
 * - No direct cross-origin access (imports must be explicit user-authorized bundles).
 * - Old history is NEVER promoted to protected evidence or mastery (Rule N20).
 * - Unknown device data remains unknown (unverified device fingerprint).
 * - Idempotent import with atomic rollback.
 *
 * No academic approval inferred from software validation.
 */

export const LEGACY_IMPORT_SCHEMA_VERSION = 'g9-legacy-import/1.0';

export type DeviceTrustLevel = 'KNOWN_DEVICE' | 'UNKNOWN_DEVICE';

export interface UserExportAuthorization {
  readonly consentGranted: boolean;
  readonly authorizedAt: string;
  readonly sourceOrigin: string;
  readonly deviceFingerprint: string;
  readonly userSignature?: string;
}

export interface LegacyAttemptRecord {
  readonly id?: string;
  readonly attemptId?: string;
  readonly sessionId?: string;
  readonly itemId: string;
  readonly revision?: number;
  readonly response: {
    readonly kind: string;
    readonly value: unknown;
    readonly selectedOptionId?: string;
  };
  readonly submittedAt?: string;
  readonly at?: string;
  readonly score?: number | null;
  readonly mastery?: boolean; // Legacy untrusted flag
  readonly isProtected?: boolean; // Legacy untrusted flag
  readonly notes?: string;
}

export interface LegacySessionRecord {
  readonly id?: string;
  readonly sessionId?: string;
  readonly startedAt?: string;
  readonly completedAt?: string;
  readonly topicId?: string;
  readonly mode?: string;
}

export interface LegacyArtifactRecord {
  readonly id: string;
  readonly type: 'STYLUS_DRAWING' | 'NOTES' | 'CALCULATION';
  readonly content: string;
  readonly createdAt?: string;
}

export interface LegacyLearnerStateBundle {
  readonly export_version?: string;
  readonly schema_version?: string;
  readonly legacy?: boolean;
  readonly origin: string;
  readonly deviceId?: string;
  readonly exportedAt: string;
  readonly sessions?: readonly LegacySessionRecord[];
  readonly attempts?: readonly LegacyAttemptRecord[];
  readonly artifacts?: readonly LegacyArtifactRecord[];
  readonly rawStorageDump?: Record<string, string>;
}

export interface NormalizedAttempt {
  readonly id: string;
  readonly sessionId: string;
  readonly itemId: string;
  readonly revision: number;
  readonly response: {
    readonly kind: string;
    readonly value: unknown;
    readonly selectedOptionId?: string;
  };
  readonly submittedAt: string;
  readonly grade: {
    readonly status: 'REVIEW_PENDING';
    readonly points: null;
    readonly maxPoints: number;
    readonly reasonCode: 'MIGRATED_FROM_LEGACY';
  };
  readonly isProtectedEvidence: false; // Invariant: Old history is NOT protected evidence
  readonly masteryEligible: false;    // Invariant: Old history cannot claim mastery
  readonly originDeviceTrust: DeviceTrustLevel;
}

export interface NormalizedSession {
  readonly id: string;
  readonly startedAt: string;
  readonly completedAt?: string;
  readonly topicId?: string;
  readonly releaseId: string;
}

export interface DryRunIssue {
  readonly code: 'INVALID_OPTION' | 'STALE_REVISION' | 'UNMAPPED_KEY' | 'UNKNOWN_ORIGIN' | 'MALFORMED_RECORD';
  readonly message: string;
  readonly recordId?: string;
}

export interface DryRunReport {
  readonly valid: boolean;
  readonly sourceOrigin: string;
  readonly deviceTrust: DeviceTrustLevel;
  readonly totalSessions: number;
  readonly totalAttempts: number;
  readonly totalArtifacts: number;
  readonly mappedAttempts: number;
  readonly duplicateAttempts: number;
  readonly unmappedKeys: readonly string[];
  readonly issues: readonly DryRunIssue[];
}

export interface ImportResult {
  readonly success: boolean;
  readonly dryRun: boolean;
  readonly importedSessionsCount: number;
  readonly importedAttemptsCount: number;
  readonly importedArtifactsCount: number;
  readonly duplicateAttemptsCount: number;
  readonly deviceTrust: DeviceTrustLevel;
  readonly rollbackOccurred: boolean;
  readonly error?: string;
}

export interface ValidatedItemDescriptor {
  readonly id: string;
  readonly revision: number;
  readonly validOptionIds: readonly string[];
}
