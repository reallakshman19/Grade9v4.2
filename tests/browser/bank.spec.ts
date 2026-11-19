/**
 * tests/browser/bank.spec.ts
 * A23 — Question bank filters and catalogue specification tests.
 *
 * Verifies:
 * - URL-persisted filters (serialization/deserialization)
 * - Exact release-only counts (withdrawn items excluded from public counts)
 * - Facet intersections (subject, topic, difficulty, role, search)
 * - Zero results state and filter clearing
 * - Stable deterministic pagination with boundary clamping
 * - Zero private metadata leakage (sanitized public question summary)
 * - Hit target minimum size (48px)
 *
 * No academic approval inferred from software validation.
 */

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import {
  serializeFilterToQueryParams,
  deserializeFilterFromQueryParams,
  createFilterPanel,
} from '../../web/components/filter-panel.ts';
import {
  createQuestionCard,
  sanitizePublicQuestionSummary,
} from '../../web/components/question-card.ts';
import {
  createQuestionBankScreen,
} from '../../web/pages/bank.ts';

// ---------------------------------------------------------------------------
// Test Fixtures
// ---------------------------------------------------------------------------

const SAMPLE_QUESTIONS = [
  {
    id: 'Q-PHYS-01',
    code: 'PHYS-01',
    stem: 'A block of mass 2kg slides on a frictionless horizontal plane...',
    subjectCode: 'PHYS',
    topicCode: 'WPE',
    difficulty: 'FOUNDATION',
    role: 'CORE1A',
    status: 'RELEASED',
    // Internal private data that MUST NOT leak:
    internalAnswerKey: 'C',
    custodyCommitSha: '1234567890abcdef',
    reviewNotes: 'Strictly confidential reviewer feedback',
  },
  {
    id: 'Q-PHYS-02',
    code: 'PHYS-02',
    stem: 'Calculate the total kinetic energy acquired when work done is 50J...',
    subjectCode: 'PHYS',
    topicCode: 'WPE',
    difficulty: 'INTERMEDIATE',
    role: 'CORE1B',
    status: 'RELEASED',
    internalAnswerKey: '50J',
  },
  {
    id: 'Q-PHYS-03',
    code: 'PHYS-03',
    stem: 'A non-conservative friction force acts across distance x...',
    subjectCode: 'PHYS',
    topicCode: 'WPE',
    difficulty: 'ADVANCED',
    role: 'CORE2A',
    status: 'WITHDRAWN', // Withdrawn question
  },
  {
    id: 'Q-MATH-01',
    code: 'MATH-01',
    stem: 'Solve the quadratic equivalence for roots alpha and beta...',
    subjectCode: 'MATH',
    topicCode: 'ALG',
    difficulty: 'FOUNDATION',
    role: 'CORE1A',
    status: 'RELEASED',
  },
  {
    id: 'Q-MATH-02',
    code: 'MATH-02',
    stem: 'Prove by mathematical induction that 2^n > n^2 for n >= 5...',
    subjectCode: 'MATH',
    topicCode: 'ALG',
    difficulty: 'OLYMPIAD',
    role: 'CORE2B',
    status: 'RELEASED',
  },
];

// ---------------------------------------------------------------------------
// Filter Panel & URL Persistence
// ---------------------------------------------------------------------------

describe('Filter Panel — URL Serialization and Deserialization', () => {
  it('serializes filter criteria to query params', () => {
    const params = serializeFilterToQueryParams({
      subject: 'PHYS',
      topic: 'WPE',
      difficulty: 'INTERMEDIATE',
      role: 'CORE1B',
      query: 'kinetic',
    });

    assert.equal(params.get('subject'), 'PHYS');
    assert.equal(params.get('topic'), 'WPE');
    assert.equal(params.get('difficulty'), 'INTERMEDIATE');
    assert.equal(params.get('role'), 'CORE1B');
    assert.equal(params.get('q'), 'kinetic');
  });

  it('deserializes filter criteria from query params', () => {
    const params = new URLSearchParams('subject=math&topic=alg&difficulty=olympiad&q=induction');
    const filter = deserializeFilterFromQueryParams(params);

    assert.equal(filter.subject, 'MATH');
    assert.equal(filter.topic, 'ALG');
    assert.equal(filter.difficulty, 'OLYMPIAD');
    assert.equal(filter.query, 'induction');
  });

  it('guarantees roundtrip fidelity through URLSearchParams', () => {
    const original = {
      subject: 'PHYS',
      topic: 'WPE',
      difficulty: 'ADVANCED' as const,
      query: 'friction',
    };

    const serialized = serializeFilterToQueryParams(original);
    const deserialized = deserializeFilterFromQueryParams(serialized);

    assert.deepEqual(deserialized, original);
  });

  it('enforces 48px minimum hit target size on filter controls', () => {
    const panel = createFilterPanel();
    assert.ok(panel.getMinHitTargetPx() >= 48);
  });
});

// ---------------------------------------------------------------------------
// Question Card & Zero Private Metadata
// ---------------------------------------------------------------------------

describe('Question Card — Public View & Zero Private Metadata', () => {
  it('strips internal answer keys, custody git hashes, and review notes', () => {
    const raw = SAMPLE_QUESTIONS[0];
    const card = createQuestionCard(raw,()=>true);
    const summary = card.getSummary();

    // Public properties present
    assert.equal(summary.id, 'Q-PHYS-01');
    assert.equal(summary.code, 'PHYS-01');
    assert.equal(summary.subjectCode, 'PHYS');
    assert.equal(summary.topicCode, 'WPE');
    assert.equal(summary.status, 'RELEASED');

    // Private properties ABSOLUTELY stripped
    assert.equal((summary as any).internalAnswerKey, undefined);
    assert.equal((summary as any).custodyCommitSha, undefined);
    assert.equal((summary as any).reviewNotes, undefined);
  });

  it('marks released question as attemptable and generates valid workspace path', () => {
    const card = createQuestionCard(SAMPLE_QUESTIONS[0],()=>true);
    const state = card.getViewState();

    assert.equal(state.isAttemptable, true);
    assert.equal(state.workspacePath, '/workspace/phys/wpe/Q-PHYS-01');
    assert.ok(state.minHitTargetPx >= 48);
  });

  it('marks withdrawn question as NOT attemptable', () => {
    const card = createQuestionCard(SAMPLE_QUESTIONS[2],()=>true); // WITHDRAWN
    assert.equal(card.isAttemptable(), false);
    assert.equal(card.getViewState().statusBadgeText, 'WITHDRAWN');
  });
});

// ---------------------------------------------------------------------------
// Question Bank Screen Controller — Facets, Counts & States
// ---------------------------------------------------------------------------

describe('Question Bank Screen — Facet Intersections & Release Counts', () => {
  it('computes exact release-only count excluding withdrawn questions', () => {
    const bank = createQuestionBankScreen(SAMPLE_QUESTIONS);
    const state = bank.getViewState();

    // 5 total questions, 1 is WITHDRAWN -> 4 RELEASED
    assert.equal(state.totalReleaseCount, 4);
    assert.equal(state.totalMatchingCount, 4);
    assert.equal(state.status, 'POPULATED');
  });

  it('filters by single facet (Subject)', () => {
    const bank = createQuestionBankScreen(SAMPLE_QUESTIONS);
    bank.setFilter({ subject: 'MATH' });

    const state = bank.getViewState();
    assert.equal(state.totalMatchingCount, 2);
    assert.ok(state.pageItems.every((q) => q.subjectCode === 'MATH'));
  });

  it('filters by multiple facet intersection (Subject + Difficulty)', () => {
    const bank = createQuestionBankScreen(SAMPLE_QUESTIONS);
    bank.setFilter({ subject: 'PHYS', difficulty: 'INTERMEDIATE' });

    const state = bank.getViewState();
    assert.equal(state.totalMatchingCount, 1);
    assert.equal(state.pageItems[0].id, 'Q-PHYS-02');
  });

  it('filters by text search query', () => {
    const bank = createQuestionBankScreen(SAMPLE_QUESTIONS);
    bank.setFilter({ query: 'induction' });

    const state = bank.getViewState();
    assert.equal(state.totalMatchingCount, 1);
    assert.equal(state.pageItems[0].id, 'Q-MATH-02');
  });

  it('enters ZERO_RESULTS when facet intersection matches no questions', () => {
    const bank = createQuestionBankScreen(SAMPLE_QUESTIONS);
    bank.setFilter({ subject: 'MATH', topic: 'NONEXISTENT' });

    const state = bank.getViewState();
    assert.equal(state.status, 'ZERO_RESULTS');
    assert.equal(state.totalMatchingCount, 0);
    assert.equal(state.pageItems.length, 0);

    // Clearing filters recovers to POPULATED
    bank.clearFilters();
    assert.equal(bank.getViewState().status, 'POPULATED');
    assert.equal(bank.getViewState().totalMatchingCount, 4);
  });

  it('includes withdrawn questions only when explicitly enabled', () => {
    const bank = createQuestionBankScreen(SAMPLE_QUESTIONS);
    bank.setFilter({ subject: 'PHYS', includeWithdrawn: true });

    const state = bank.getViewState();
    // 2 released + 1 withdrawn in PHYS = 3 matching
    assert.equal(state.totalMatchingCount, 3);
    assert.ok(state.pageItems.some((q) => q.status === 'WITHDRAWN'));
  });
});

// ---------------------------------------------------------------------------
// Stable Pagination
// ---------------------------------------------------------------------------

describe('Question Bank Screen — Deterministic Pagination', () => {
  it('slices pages stably and handles boundary clamping', () => {
    const bank = createQuestionBankScreen(SAMPLE_QUESTIONS);
    bank.setPageSize(2);

    let state = bank.getViewState();
    assert.equal(state.totalPages, 2); // 4 released items / 2 per page = 2 pages
    assert.equal(state.currentPage, 1);
    assert.equal(state.pageItems.length, 2);
    assert.equal(state.pageItems[0].id, 'Q-MATH-01');
    assert.equal(state.pageItems[1].id, 'Q-MATH-02');

    // Advance to page 2
    bank.setPage(2);
    state = bank.getViewState();
    assert.equal(state.currentPage, 2);
    assert.equal(state.pageItems.length, 2);
    assert.equal(state.pageItems[0].id, 'Q-PHYS-01');
    assert.equal(state.pageItems[1].id, 'Q-PHYS-02');

    // Page overflow clamped to totalPages
    bank.setPage(999);
    assert.equal(bank.getViewState().currentPage, 2);

    // Negative page clamped to 1
    bank.setPage(-5);
    assert.equal(bank.getViewState().currentPage, 1);
  });
});

// ---------------------------------------------------------------------------
// URL Synchronization Roundtrip
// ---------------------------------------------------------------------------

describe('Question Bank Screen — URL Synchronization', () => {
  it('syncs to URL search params and restores on reload', () => {
    const bank = createQuestionBankScreen(SAMPLE_QUESTIONS);
    bank.setPageSize(2);
    bank.setFilter({ subject: 'PHYS', difficulty: 'INTERMEDIATE' });
    bank.setPage(1);

    const params = bank.syncToUrlParams();
    assert.equal(params.get('subject'), 'PHYS');
    assert.equal(params.get('difficulty'), 'INTERMEDIATE');

    // Fresh instance loads from params
    const restoredBank = createQuestionBankScreen(SAMPLE_QUESTIONS);
    restoredBank.loadFromUrlParams(params);

    const restoredState = restoredBank.getViewState();
    assert.equal(restoredState.filter.subject, 'PHYS');
    assert.equal(restoredState.filter.difficulty, 'INTERMEDIATE');
    assert.equal(restoredState.totalMatchingCount, 1);
    assert.equal(restoredState.pageItems[0].id, 'Q-PHYS-02');
  });
});

it('unrecognized status cannot become a released route',()=>{const c=createQuestionCard({id:'que:unknown',stem:'private'});assert.equal(c.isAttemptable(),false);assert.equal(c.getSummary().status,'HOLD');assert.equal(c.getSummary().stemPreview,'');});

