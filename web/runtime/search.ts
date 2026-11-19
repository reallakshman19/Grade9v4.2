/**
 * web/runtime/search.ts
 * Workpack A35: Universal search runtime engine and shard manager.
 *
 * Implements:
 * - Deterministic scoring, weighting, and tie-breaking (score descending, ID ascending).
 * - Exact ID boost (10.0), exact title (8.0), title tokens (5.0), concept aliases (3.0), summary tokens (1.0).
 * - Unicode NFKC + casefold normalization.
 * - Formula token preservation (e.g. subscript, superscript, chemical formulas).
 * - Facet filtering: intersection across dimensions (AND), union within dimensions (OR).
 * - Fault N26 stale shard and release mismatch defense: verified release ID and SHA-256 digests.
 * - Lazy shard management: on-demand shard loading without mixing stale data.
 * - Typo and prefix suggestions with Damerau-Levenshtein distance calculation.
 * - Withdrawal stability: withdrawing an item tombstones its route and excludes it from search results.
 * - Worker bridge support for off-main-thread indexing.
 *
 * No academic approval inferred from software validation.
 * academic_admission: HOLD
 * release_authority: NONE
 */

import { escapeHtml } from './rendering.ts';

export interface SearchItem {
  readonly id: string;
  readonly revision: number;
  readonly releaseId: string;
  readonly route: string;
  readonly kind: string;
  readonly subjectIds: readonly string[];
  readonly programmeIds: readonly string[];
  readonly editionIds: readonly string[];
  readonly conceptIds: readonly string[];
  readonly title: string;
  readonly summary: string;
  readonly reviewedTerms: readonly string[];
  readonly publicFacets: Readonly<Record<string, readonly string[]>>;
}

export interface SearchShardMeta {
  readonly shard_id: string;
  readonly subject_id: string;
  readonly item_count: number;
  readonly sha256: string;
  readonly uncompressed_bytes?: number;
}

export interface SearchManifest {
  readonly schema_version: string;
  readonly release_id: string;
  readonly release_digest: string;
  readonly target_mode: 'DEMO' | 'PRODUCTION';
  readonly demo_banner: boolean;
  readonly total_items: number;
  readonly boost_rules: Readonly<Record<string, number>>;
  readonly normalization: string;
  readonly shards: readonly SearchShardMeta[];
  readonly manifest_digest: string;
}

export interface SearchFacetCriteria {
  readonly subject?: readonly string[];
  readonly role?: readonly string[];
  readonly kind?: readonly string[];
  readonly topic?: readonly string[];
  readonly band?: readonly string[];
}

export interface SearchResultItem {
  readonly item: SearchItem;
  readonly score: number;
  readonly matchReasons: readonly string[];
}

export interface SearchQueryResult {
  readonly results: readonly SearchResultItem[];
  readonly totalMatches: number;
  readonly suggestion: string | null;
  readonly executionTimeMs: number;
}

export interface SearchQueryOptions {
  readonly limit?: number;
  readonly offset?: number;
  readonly facets?: SearchFacetCriteria;
}

export class SearchRuntimeError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'SearchRuntimeError';
  }
}

export class StaleShardError extends SearchRuntimeError {
  constructor(message: string) {
    super(message);
    this.name = 'StaleShardError';
  }
}

export class AnswerLeakageError extends SearchRuntimeError {
  constructor(message: string) {
    super(message);
    this.name = 'AnswerLeakageError';
  }
}

const FORBIDDEN_ANSWER_KEYS = new Set([
  'assessment.raw_claim',
  'raw_claim',
  'answer',
  'answers',
  'solution',
  'solutions',
  'worked_steps',
  'master_key',
  'rubric',
  'reference_solution',
  'private_notes',
  'secret',
  'crux_revealed',
  'privatemoves',
  'privatemoveref',
  'private_rubric',
]);

export function assertNoAnswerLeakage(obj: unknown, path = ''): void {
  if (!obj || typeof obj !== 'object') return;
  if (Array.isArray(obj)) {
    for (let i = 0; i < obj.length; i++) {
      assertNoAnswerLeakage(obj[i], `${path}[${i}]`);
    }
    return;
  }
  const record = obj as Record<string, unknown>;
  for (const [k, v] of Object.entries(record)) {
    const lowerKey = k.toLowerCase();
    if (FORBIDDEN_ANSWER_KEYS.has(lowerKey)) {
      throw new AnswerLeakageError(`Fault N09: Prohibited private key '${k}' detected at '${path}.${k}'`);
    }
    assertNoAnswerLeakage(v, `${path}.${k}`);
  }
}

/**
 * Unicode NFKC + casefold normalization.
 */
export function normalizeQuery(text: string): string {
  if (typeof text !== 'string') return '';
  return text.normalize('NFKC').toLowerCase().trim();
}

/**
 * Tokenizes text preserving mathematical and chemical notation.
 */
export function tokenize(text: string): string[] {
  const normalized = normalizeQuery(text);
  if (!normalized) return [];
  // Split on punctuation/spaces, preserving numbers, formula subscripts/superscripts and letters
  return normalized
    .split(/[\s,;:.!?()[\]{}"'=]+/)
    .filter((tok) => tok.length > 0);
}

/**
 * Damerau-Levenshtein edit distance for typo detection.
 */
export function editDistance(a: string, b: string): number {
  if (a === b) return 0;
  if (!a.length) return b.length;
  if (!b.length) return a.length;

  const m = a.length;
  const n = b.length;
  const d: number[][] = [];

  for (let i = 0; i <= m; i++) {
    d[i] = [i];
  }
  for (let j = 0; j <= n; j++) {
    d[0][j] = j;
  }

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      d[i][j] = Math.min(
        d[i - 1][j] + 1, // deletion
        d[i][j - 1] + 1, // insertion
        d[i - 1][j - 1] + cost // substitution
      );
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) {
        d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1); // transposition
      }
    }
  }

  return d[m][n];
}

const DEFAULT_BOOSTS: Record<string, number> = {
  exact_id: 10.0,
  exact_title: 8.0,
  title_tokens: 5.0,
  concept_aliases: 3.0,
  summary_tokens: 1.0,
};

export class SearchEngine {
  private manifest: SearchManifest | null = null;
  private itemsById = new Map<string, SearchItem>();
  private loadedShards = new Set<string>();
  private withdrawnIds = new Set<string>();
  private vocabulary = new Set<string>();
  private boostRules = { ...DEFAULT_BOOSTS };

  constructor(manifest?: SearchManifest) {
    if (manifest) {
      this.loadManifest(manifest);
    }
  }

  public loadManifest(manifest: SearchManifest): void {
    if (manifest.target_mode !== 'DEMO') {
      throw new SearchRuntimeError('PRODUCTION_TARGET_PROHIBITED: Only DEMO target mode authorized.');
    }
    this.manifest = manifest;
    if (manifest.boost_rules) {
      this.boostRules = { ...this.boostRules, ...manifest.boost_rules };
    }
  }

  public getManifest(): SearchManifest | null {
    return this.manifest;
  }

  public isShardLoaded(shardId: string): boolean {
    return this.loadedShards.has(shardId);
  }

  public loadShard(
    shardMeta: SearchShardMeta,
    items: readonly SearchItem[],
    computedDigest: string
  ): void {
    if (!this.manifest) {
      throw new SearchRuntimeError('Manifest must be loaded before loading shards');
    }

    // Fault N26: Stale shard rejection
    if (shardMeta.sha256 !== computedDigest) {
      throw new StaleShardError(
        `Fault N26: Shard ${shardMeta.shard_id} digest mismatch: expected ${shardMeta.sha256}, got ${computedDigest}. Stale shard rejected.`
      );
    }

    // Verify release ID consistency across all items in shard
    for (const item of items) {
      if (item.releaseId !== this.manifest.release_id) {
        throw new StaleShardError(
          `Fault N26: Shard item ${item.id} releaseId (${item.releaseId}) does not match manifest releaseId (${this.manifest.release_id}).`
        );
      }
      assertNoAnswerLeakage(item, item.id);
      this.itemsById.set(item.id, item);

      // Collect terms for typo detection
      for (const tok of tokenize(item.title)) {
        if (tok.length >= 3) this.vocabulary.add(tok);
      }
      for (const term of item.reviewedTerms) {
        for (const tok of tokenize(term)) {
          if (tok.length >= 3) this.vocabulary.add(tok);
        }
      }
    }

    this.loadedShards.add(shardMeta.shard_id);
  }

  public withdrawItem(itemId: string): void {
    this.withdrawnIds.add(itemId);
  }

  public restoreItem(itemId: string): void {
    this.withdrawnIds.delete(itemId);
  }

  public isWithdrawn(itemId: string): boolean {
    return this.withdrawnIds.has(itemId);
  }

  public getAllLoadedItems(): SearchItem[] {
    const list: SearchItem[] = [];
    for (const [id, item] of this.itemsById.entries()) {
      if (!this.withdrawnIds.has(id)) {
        list.push(item);
      }
    }
    return list;
  }

  /**
   * Evaluates facet criteria against an item.
   * Intersect across dimensions (AND), union within dimensions (OR).
   */
  public matchesFacets(item: SearchItem, facets?: SearchFacetCriteria): boolean {
    if (!facets) return true;

    // Subject dimension
    if (facets.subject && facets.subject.length > 0) {
      const itemSubjects = item.subjectIds.map((s) => s.toUpperCase());
      const hasMatch = facets.subject.some((req) => itemSubjects.includes(req.toUpperCase()));
      if (!hasMatch) return false;
    }

    // Role dimension
    if (facets.role && facets.role.length > 0) {
      const itemRoles = (item.publicFacets['role'] || []).map((r) => r.toUpperCase());
      const hasMatch = facets.role.some((req) => itemRoles.includes(req.toUpperCase()));
      if (!hasMatch) return false;
    }

    // Kind dimension
    if (facets.kind && facets.kind.length > 0) {
      const itemKind = item.kind.toUpperCase();
      const hasMatch = facets.kind.some((req) => itemKind === req.toUpperCase());
      if (!hasMatch) return false;
    }

    // Topic dimension
    if (facets.topic && facets.topic.length > 0) {
      const itemTopics = (item.publicFacets['topic'] || []).map((t) => t.toLowerCase());
      const hasMatch = facets.topic.some((req) => itemTopics.includes(req.toLowerCase()));
      if (!hasMatch) return false;
    }

    // Band dimension
    if (facets.band && facets.band.length > 0) {
      const itemBands = (item.publicFacets['band'] || []).map((b) => b.toUpperCase());
      const hasMatch = facets.band.some((req) => itemBands.includes(req.toUpperCase()));
      if (!hasMatch) return false;
    }

    return true;
  }

  /**
   * Computes deterministic relevance score and match reasons for an item.
   */
  public computeScore(
    item: SearchItem,
    normalizedQuery: string,
    queryTokens: readonly string[]
  ): { score: number; matchReasons: string[] } {
    let score = 0.0;
    const matchReasons: string[] = [];

    const normId = normalizeQuery(item.id);
    const normTitle = normalizeQuery(item.title);
    const titleTokens = new Set(tokenize(item.title));
    const summaryTokens = new Set(tokenize(item.summary));

    const reviewedTermTokens = new Set<string>();
    const fullReviewedTerms = new Set<string>();
    for (const t of item.reviewedTerms) {
      const norm = normalizeQuery(t);
      fullReviewedTerms.add(norm);
      for (const tok of tokenize(norm)) {
        reviewedTermTokens.add(tok);
      }
    }
    const conceptIds = new Set(
      item.conceptIds.map((c) => normalizeQuery(c))
    );

    // Exact ID match boost
    if (normId === normalizedQuery) {
      score += this.boostRules.exact_id;
      matchReasons.push('Exact ID match');
    } else if (normId.includes(normalizedQuery)) {
      score += this.boostRules.exact_id * 0.5;
      matchReasons.push('Partial ID match');
    }

    // Exact title match boost
    if (normTitle === normalizedQuery) {
      score += this.boostRules.exact_title;
      matchReasons.push('Exact title match');
    } else if (normTitle.includes(normalizedQuery)) {
      score += this.boostRules.exact_title * 0.5;
      matchReasons.push('Title phrase match');
    }

    // Exact reviewed term / concept alias phrase match
    if (fullReviewedTerms.has(normalizedQuery) || conceptIds.has(normalizedQuery)) {
      score += this.boostRules.concept_aliases * 2;
      matchReasons.push('Exact concept/alias match');
    }

    // Token matches in title
    let matchedTitleTokens = 0;
    for (const tok of queryTokens) {
      if (titleTokens.has(tok)) {
        matchedTitleTokens++;
      }
    }
    if (matchedTitleTokens > 0) {
      score += matchedTitleTokens * this.boostRules.title_tokens;
      matchReasons.push(`Title token matches (${matchedTitleTokens})`);
    }

    // Concept / reviewed term token matches
    let matchedTerms = 0;
    for (const tok of queryTokens) {
      if (reviewedTermTokens.has(tok) || conceptIds.has(tok)) {
        matchedTerms++;
      }
    }
    if (matchedTerms > 0) {
      score += matchedTerms * this.boostRules.concept_aliases;
      matchReasons.push(`Concept alias token matches (${matchedTerms})`);
    }

    // Token matches in summary
    let matchedSummaryTokens = 0;
    for (const tok of queryTokens) {
      if (summaryTokens.has(tok)) {
        matchedSummaryTokens++;
      }
    }
    if (matchedSummaryTokens > 0) {
      score += matchedSummaryTokens * this.boostRules.summary_tokens;
      matchReasons.push(`Summary token matches (${matchedSummaryTokens})`);
    }

    return { score, matchReasons };
  }

  /**
   * Generates typo suggestion if query produces zero results.
   */
  public generateSuggestion(queryText: string): string | null {
    const tokens = tokenize(queryText);
    if (tokens.length === 0) return null;

    let hasCorrection = false;
    const correctedTokens: string[] = [];

    for (const tok of tokens) {
      if (this.vocabulary.has(tok) || tok.length < 4) {
        correctedTokens.push(tok);
        continue;
      }

      // Find closest vocabulary term with distance <= 2
      let bestTerm: string | null = null;
      let minDistance = 3;

      for (const vocab of this.vocabulary) {
        if (Math.abs(vocab.length - tok.length) > 2) continue;
        const dist = editDistance(tok, vocab);
        if (dist < minDistance && dist <= 2) {
          minDistance = dist;
          bestTerm = vocab;
        }
      }

      if (bestTerm && bestTerm !== tok) {
        correctedTokens.push(bestTerm);
        hasCorrection = true;
      } else {
        correctedTokens.push(tok);
      }
    }

    return hasCorrection ? correctedTokens.join(' ') : null;
  }

  /**
   * Executes deterministic query across loaded items.
   */
  public query(queryText: string, options: SearchQueryOptions = {}): SearchQueryResult {
    const startTime = performance.now();
    const normQuery = normalizeQuery(queryText);
    const queryTokens = tokenize(normQuery);

    const candidates: SearchResultItem[] = [];

    for (const [id, item] of this.itemsById.entries()) {
      if (this.withdrawnIds.has(id)) continue;
      if (!this.matchesFacets(item, options.facets)) continue;

      if (!normQuery) {
        // Empty query matches all facet-filtered items with base score 1.0
        candidates.push({ item, score: 1.0, matchReasons: ['Facet match'] });
        continue;
      }

      const { score, matchReasons } = this.computeScore(item, normQuery, queryTokens);
      if (score > 0) {
        candidates.push({ item, score, matchReasons });
      }
    }

    // Deterministic sort: score descending, then ID ascending (alphabetical tie-breaker)
    candidates.sort((a, b) => {
      if (Math.abs(b.score - a.score) > 1e-6) {
        return b.score - a.score;
      }
      return a.item.id.localeCompare(b.item.id);
    });

    const totalMatches = candidates.length;
    const limit = options.limit ?? 20;
    const offset = options.offset ?? 0;
    const pagedResults = candidates.slice(offset, offset + limit);

    let suggestion: string | null = null;
    if (totalMatches === 0 && normQuery.length > 2) {
      suggestion = this.generateSuggestion(normQuery);
    }

    const executionTimeMs = performance.now() - startTime;

    return {
      results: pagedResults,
      totalMatches,
      suggestion,
      executionTimeMs,
    };
  }
}
