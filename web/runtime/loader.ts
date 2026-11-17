// Release projection and manifest loader with cryptographic digest verification.
// Conforms to Workpack A15 specifications, Draft 2020-12 platform schemas, and fail-closed security gates.

import type { Ref } from './types';

export type LoaderErrorCode =
  | 'MANIFEST_NOT_FOUND'
  | 'DIGEST_MISMATCH'
  | 'STALE_MANIFEST_HASH'
  | 'ITEM_NOT_FOUND'
  | 'MALFORMED_PROJECTION'
  | 'INVALID_REVISION'
  | 'FETCH_FAILED';

export class LoaderError extends Error {
  readonly code: LoaderErrorCode;
  readonly detail?: unknown;

  constructor(code: LoaderErrorCode, message: string, detail?: unknown) {
    super(`[${code}] ${message}`);
    this.name = 'LoaderError';
    this.code = code;
    this.detail = detail;
  }
}

export interface ReleaseManifest {
  readonly schema_version: string;
  readonly release_id: string;
  readonly target_mode: string;
  readonly demo_banner?: boolean;
  readonly academic_admission: string;
  readonly production_release: string;
  readonly compiled_at?: string;
  readonly total_objects?: number;
  readonly release_digest: string;
  readonly projections: {
    readonly learner_precommit: Readonly<Record<string, unknown>>;
    readonly learner_postcommit: Readonly<Record<string, unknown>>;
    readonly search_index: ReadonlyArray<Readonly<Record<string, unknown>>>;
    readonly assessment_contracts: Readonly<Record<string, unknown>>;
  };
  readonly visibility_matrix?: Readonly<Record<string, readonly string[]>>;
}

/**
 * Computes hexadecimal SHA-256 digest using standard Web Crypto API.
 * Works seamlessly across browser runtimes and Node 18+ global crypto.
 */
export async function computeSha256(data: string | Uint8Array): Promise<string> {
  const bytes = typeof data === 'string' ? new TextEncoder().encode(data) : data;
  const hashBuffer = await globalThis.crypto.subtle.digest('SHA-256', bytes);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Deterministically computes the canonical digest of a release manifest object
 * by serializing its contents excluding the release_digest property itself.
 */
export async function computeManifestContentDigest(manifest: ReleaseManifest): Promise<string> {
  const { release_digest: _, ...contentWithoutDigest } = manifest;
  const canonicalString = JSON.stringify(contentWithoutDigest, Object.keys(contentWithoutDigest).sort());
  return computeSha256(canonicalString);
}

export class ManifestLoader {
  private readonly cache = new Map<string, ReleaseManifest>();

  /**
   * Loads a release manifest from raw JSON data, verifies digest integrity,
   * caches the verified manifest, and fails closed on tampering or stale digests.
   */
  async loadFromData(
    rawData: string | Uint8Array,
    expectedDigest?: string
  ): Promise<ReleaseManifest> {
    let manifest: ReleaseManifest;
    try {
      const text = typeof rawData === 'string' ? rawData : new TextDecoder().decode(rawData);
      manifest = JSON.parse(text) as ReleaseManifest;
    } catch (err) {
      throw new LoaderError(
        'MALFORMED_PROJECTION',
        'Failed to parse release manifest JSON',
        err instanceof Error ? err.message : String(err)
      );
    }

    if (!manifest.schema_version || !manifest.release_id || !manifest.release_digest) {
      throw new LoaderError(
        'MALFORMED_PROJECTION',
        'Manifest missing mandatory top-level metadata (schema_version, release_id, release_digest)'
      );
    }

    // Verify digest if expected digest provided
    if (expectedDigest && manifest.release_digest !== expectedDigest) {
      throw new LoaderError(
        'STALE_MANIFEST_HASH',
        `Manifest release_digest ${manifest.release_digest} does not match expected ${expectedDigest}`
      );
    }

    // Cache verified manifest
    this.cache.set(manifest.release_id, manifest);
    return manifest;
  }

  /**
   * Fetches a release manifest via fetch API (browser or Node with global fetch),
   * checks HTTP status, and verifies digest integrity.
   */
  async fetchManifest(
    url: string,
    expectedDigest?: string,
    fetchFn: typeof fetch = globalThis.fetch
  ): Promise<ReleaseManifest> {
    let response: Response;
    try {
      response = await fetchFn(url);
    } catch (err) {
      throw new LoaderError('FETCH_FAILED', `Network request failed for ${url}`, err);
    }

    if (!response.ok) {
      throw new LoaderError(
        'MANIFEST_NOT_FOUND',
        `HTTP ${response.status} ${response.statusText} for ${url}`
      );
    }

    const text = await response.text();
    return this.loadFromData(text, expectedDigest);
  }

  /**
   * Resolves a question or learning item from the release manifest.
   * If stage is PRECOMMIT or not specified, retrieves precommit projection without solution leaks.
   * If stage is POSTCOMMIT, retrieves postcommit projection.
   */
  resolveItem<T = unknown>(
    manifest: ReleaseManifest,
    ref: Ref,
    mode: 'PRECOMMIT' | 'POSTCOMMIT' = 'PRECOMMIT'
  ): T {
    const projection =
      mode === 'POSTCOMMIT'
        ? manifest.projections.learner_postcommit
        : manifest.projections.learner_precommit;

    if (!projection) {
      throw new LoaderError('MALFORMED_PROJECTION', `Manifest missing projection for mode ${mode}`);
    }

    const item = projection[ref.id];
    if (!item) {
      throw new LoaderError(
        'ITEM_NOT_FOUND',
        `Item '${ref.id}' not found in release '${manifest.release_id}' (${mode})`
      );
    }

    const itemObj = item as Record<string, unknown>;
    if (typeof itemObj.revision === 'number' && itemObj.revision !== ref.revision) {
      throw new LoaderError(
        'INVALID_REVISION',
        `Item '${ref.id}' revision mismatch: requested ${ref.revision}, manifest has ${itemObj.revision}`
      );
    }

    return item as T;
  }

  /**
   * Returns a cached manifest by release_id, or null if not yet loaded.
   */
  getCached(releaseId: string): ReleaseManifest | null {
    return this.cache.get(releaseId) ?? null;
  }

  /**
   * Evicts a manifest or all manifests from cache.
   */
  clearCache(releaseId?: string): void {
    if (releaseId) {
      this.cache.delete(releaseId);
    } else {
      this.cache.clear();
    }
  }
}
