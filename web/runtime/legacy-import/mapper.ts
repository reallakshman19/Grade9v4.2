/**
 * web/runtime/legacy-import/mapper.ts
 * A72 — Dry-run mapping and normalization for legacy learner state.
 *
 * Implements:
 * - Option validity verification against item manifest
 * - Revision consistency check
 * - Strict pedagogical bound: Old history cannot claim new protected evidence or mastery
 * - Dry-run projection without store mutations
 *
 * No academic approval inferred from software validation.
 */

import type {
  LegacyLearnerStateBundle,
  LegacyAttemptRecord,
  NormalizedAttempt,
  NormalizedSession,
  UserExportAuthorization,
  DryRunReport,
  DryRunIssue,
  ValidatedItemDescriptor,
  DeviceTrustLevel,
} from './types.ts';
import { isKnownLegacyOrigin, classifyDevice } from './inventory.ts';

/**
 * Computes deterministic attempt ID if legacy record lacks one.
 */
function deriveAttemptId(attempt: LegacyAttemptRecord, fallbackIndex: number): string {
  if (attempt.id) return attempt.id;
  if (attempt.attemptId) return attempt.attemptId;
  const time = attempt.submittedAt || attempt.at || '0';
  return `att:legacy:${attempt.itemId}:${time}:${fallbackIndex}`;
}

/**
 * Validates attempt against target item descriptor (revisions, option IDs).
 */
export function validateAttemptRecord(
  attempt: LegacyAttemptRecord,
  itemDescriptor?: ValidatedItemDescriptor
): readonly DryRunIssue[] {
  const issues: DryRunIssue[] = [];

  if (!attempt.itemId || typeof attempt.itemId !== 'string') {
    issues.push({
      code: 'MALFORMED_RECORD',
      message: 'Attempt record missing itemId',
      recordId: attempt.id || attempt.attemptId,
    });
    return issues;
  }

  if (itemDescriptor) {
    if (attempt.revision !== undefined && attempt.revision !== itemDescriptor.revision) {
      issues.push({
        code: 'STALE_REVISION',
        message: `Attempt revision ${attempt.revision} does not match current target revision ${itemDescriptor.revision}`,
        recordId: attempt.id || attempt.attemptId,
      });
    }

    if (attempt.response && attempt.response.selectedOptionId) {
      if (!itemDescriptor.validOptionIds.includes(attempt.response.selectedOptionId)) {
        issues.push({
          code: 'INVALID_OPTION',
          message: `Option ID '${attempt.response.selectedOptionId}' is not in valid target options [${itemDescriptor.validOptionIds.join(', ')}]`,
          recordId: attempt.id || attempt.attemptId,
        });
      }
    }
  }

  return issues;
}

/**
 * Normalizes a single legacy attempt record into Grade9 v4.2 representation.
 * Explicitly locks out mastery and protected evidence claims.
 */
export function normalizeAttempt(
  raw: LegacyAttemptRecord,
  sessionId: string,
  deviceTrust: DeviceTrustLevel,
  fallbackIndex: number
): NormalizedAttempt {
  const attemptId = deriveAttemptId(raw, fallbackIndex);

  return {
    id: attemptId,
    sessionId: raw.sessionId || sessionId,
    itemId: raw.itemId,
    revision: raw.revision ?? 1,
    response: {
      kind: raw.response?.kind || 'SINGLE_CHOICE',
      value: raw.response?.value ?? raw.response?.selectedOptionId ?? 'LEGACY_VALUE',
      selectedOptionId: raw.response?.selectedOptionId,
    },
    submittedAt: raw.submittedAt || raw.at || new Date().toISOString(),
    grade: {
      status: 'REVIEW_PENDING',
      points: null,
      maxPoints: 1,
      reasonCode: 'MIGRATED_FROM_LEGACY',
    },
    isProtectedEvidence: false, // MANDATORY INVARIANT: never promoted to protected evidence
    masteryEligible: false,    // MANDATORY INVARIANT: old history cannot claim mastery
    originDeviceTrust: deviceTrust,
  };
}

/**
 * Executes dry-run mapping without modifying persistence stores.
 */
export function dryRunMapping(
  bundle: LegacyLearnerStateBundle,
  auth: UserExportAuthorization,
  existingAttemptIds: ReadonlySet<string>,
  itemRegistry: ReadonlyMap<string, ValidatedItemDescriptor> = new Map(),
  knownDevices: ReadonlySet<string> = new Set()
): DryRunReport {
  const issues: DryRunIssue[] = [];

  if (!auth.consentGranted) {
    issues.push({
      code: 'MALFORMED_RECORD',
      message: 'User authorization consent not granted for export/import.',
    });
  }

  if (!isKnownLegacyOrigin(bundle.origin)) {
    issues.push({
      code: 'UNKNOWN_ORIGIN',
      message: `Bundle origin '${bundle.origin}' is not a recognized historical Grade9 origin.`,
    });
  }

  const deviceTrust = classifyDevice(bundle.deviceId, knownDevices);

  const rawSessions = bundle.sessions || [];
  const rawAttempts = bundle.attempts || [];
  const rawArtifacts = bundle.artifacts || [];

  let duplicateAttempts = 0;
  let mappedAttempts = 0;

  for (let i = 0; i < rawAttempts.length; i++) {
    const rawAtt = rawAttempts[i];
    const itemDesc = itemRegistry.get(rawAtt.itemId);
    const itemIssues = validateAttemptRecord(rawAtt, itemDesc);
    for (const issue of itemIssues) {
      issues.push(issue);
    }

    const attId = deriveAttemptId(rawAtt, i);
    if (existingAttemptIds.has(attId)) {
      duplicateAttempts++;
    } else {
      mappedAttempts++;
    }
  }

  const unmappedKeys: string[] = [];
  if (bundle.rawStorageDump) {
    for (const key of Object.keys(bundle.rawStorageDump)) {
      if (!key.startsWith('g9_')) {
        unmappedKeys.push(key);
        issues.push({
          code: 'UNMAPPED_KEY',
          message: `Storage key '${key}' does not match any known Grade9 persistence schema.`,
        });
      }
    }
  }

  return {
    valid: issues.length === 0,
    sourceOrigin: bundle.origin,
    deviceTrust,
    totalSessions: rawSessions.length,
    totalAttempts: rawAttempts.length,
    totalArtifacts: rawArtifacts.length,
    mappedAttempts,
    duplicateAttempts,
    unmappedKeys,
    issues,
  };
}
