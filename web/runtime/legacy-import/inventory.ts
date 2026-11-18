/**
 * web/runtime/legacy-import/inventory.ts
 * A72 — Storage keys, legacy origin inventory, and origin security guards.
 *
 * Enforces:
 * - Whitelist of known historical origins (v3.5, v4.1, local dev)
 * - Known storage keys catalogue
 * - Direct cross-origin access prevention
 * - Device trust classification (unknown device remains unknown)
 *
 * No academic approval inferred from software validation.
 */

import type { DeviceTrustLevel } from './types.ts';

export const KNOWN_LEGACY_ORIGINS: ReadonlySet<string> = new Set([
  'https://grade9-v35.local',
  'https://grade9-v41.local',
  'http://localhost:8080',
  'http://127.0.0.1:8080',
]);

export const KNOWN_STORAGE_KEYS: ReadonlySet<string> = new Set([
  'g9_v35_sessions',
  'g9_v35_attempts',
  'g9_v35_scratchpad',
  'g9_v35_bookmarks',
  'g9_v41_learner_state',
  'g9_legacy_notes',
  'g9_legacy_response_cache',
]);

/**
 * Checks whether an origin is a recognized historical Grade9 deployment.
 */
export function isKnownLegacyOrigin(origin: string): boolean {
  return KNOWN_LEGACY_ORIGINS.has(origin);
}

/**
 * Strictly prevents direct cross-origin access (e.g. attempting to read
 * another origin's localStorage, IndexedDB, or cross-origin iframe DOM).
 *
 * Migration requires explicit file/blob export authorized by the user.
 */
export function assertNoDirectCrossOriginAccess(targetOrigin: string, currentOrigin: string): void {
  if (targetOrigin && currentOrigin && targetOrigin !== currentOrigin) {
    throw new Error(
      `SECURITY_VIOLATION: Direct cross-origin access from '${currentOrigin}' to '${targetOrigin}' is forbidden. ` +
      `Legacy state must be exported as a standalone authorized user bundle.`
    );
  }
}

/**
 * Classifies device trust.
 * If device is not in the recognized hardware/session registry, it remains UNKNOWN_DEVICE.
 */
export function classifyDevice(
  deviceId?: string,
  knownDevices: ReadonlySet<string> = new Set()
): DeviceTrustLevel {
  if (!deviceId || !knownDevices.has(deviceId)) {
    return 'UNKNOWN_DEVICE';
  }
  return 'KNOWN_DEVICE';
}
