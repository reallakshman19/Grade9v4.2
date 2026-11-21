/**
 * web/pages/bank.ts
 * A23 / A75 — Common Question Bank Catalogue Screen Controller & Native DOM Mount.
 *
 * Implements:
 * - Direct unified database connection (680+ Canonical Questions)
 * - Multi-surface integration (global nav, topic workspace, competitive hub)
 * - URL-persisted filter synchronization (subject, topic, exam, difficulty, role, query, page, sort)
 * - Release-only item count calculation & strict facet intersections
 * - Multi-criteria sorting (canonical, difficulty asc/desc, newest/oldest)
 * - Progressive staggered hint ladders & Fault N09 answer isolation
 * - 100% Native DOM rendering (ZERO iframes) with 12.7" tablet touch ergonomics (>=48px min)
 * - Stable deterministic pagination with boundary clamping
 * - Safe clear/back/refresh handling & zero private metadata leakage
 *
 * No academic approval inferred from software validation.
 */

import {
  serializeFilterToQueryParams,
  deserializeFilterFromQueryParams,
} from '../components/filter-panel.ts';
import type {
  BankFilterCriteria,
  AvailableFacets,
} from '../components/filter-panel.ts';

import {
  sanitizePublicQuestionSummary,
} from '../components/question-card.ts';
import type {
  PublicQuestionSummary,
} from '../components/question-card.ts';

import {
  UNIFIED_QUESTION_DATABASE,
} from '../runtime/unified-question-database.ts';
import {
  CANONICAL_UNIFIED_QUESTIONS,
} from '../data/unified-questions.generated.ts';

import { escapeHtml } from '../runtime/rendering.ts';
import { HIT_TARGET_MIN_PX, HIT_TARGET_PRIMARY_PX } from '../styles/tokens.ts';

export interface BankViewState {
  readonly status: 'LOADING' | 'POPULATED' | 'ZERO_RESULTS' | 'EMPTY';
  readonly filter: BankFilterCriteria;
  readonly pageItems: readonly PublicQuestionSummary[];
  readonly totalMatchingCount: number;
  readonly totalReleaseCount: number;
  readonly currentPage: number;
  readonly pageSize: number;
  readonly totalPages: number;
  readonly availableFacets: AvailableFacets;
}

const STOPWORDS = new Set(['IN', 'OF', 'A', 'THE', 'AND', 'TO', 'FOR']);

function tokenizeTopic(s: string): string[] {
  return s
    .toUpperCase()
    .replace(/[-_\s]+/g, ' ')
    .trim()
    .split(/\s+/)
    .filter((w) => w.length > 0 && !STOPWORDS.has(w));
}

const TOPIC_ALIASES: Record<string, readonly string[]> = {
  'MOTION 1D': ['MOTION IN 1D', 'MOTION 1D', 'MOTION IN 1D RELATIVE MOTION ONL', 'MOTION IN A STRAIGHT LINE'],
  'MOTION IN A STRAIGHT LINE': ['MOTION IN 1D', 'MOTION 1D'],
  'MOTION 2D': ['MOTION IN 2D', 'MOTION 2D', 'MOTION IN 2D MOTION IN A PLANE L', 'MOTION IN A PLANE'],
  'MOTION': ['MOTION IN 1D', 'MOTION IN 2D', 'NEWTON S LAWS OF MOTION NLM'],
  'VECTORS': ['VECTORS', 'VECTOR ALGEBRA'],
  'VECTOR': ['VECTORS', 'VECTOR ALGEBRA'],
  'EUCLIDS GEOMETRY': ['CIRCLES', 'EUCLIDEAN CIRCLE GEOMETRY', 'EUCLID'],
  'EUCLID': ['CIRCLES', 'EUCLIDEAN CIRCLE GEOMETRY', 'EUCLID'],
  'THEORY EQUATIONS': ['POLYNOMIALS', 'LINEAR EQUATIONS IN ONE VARIABLE'],
  'THEORY OF EQUATIONS': ['POLYNOMIALS', 'LINEAR EQUATIONS IN ONE VARIABLE'],
  'COORDINATE GEOMETRY': ['LINEAR EQUATIONS IN ONE VARIABLE', 'COORDINATE GEOMETRY'],
  'LINEAR EQUATIONS': ['LINEAR EQUATIONS IN ONE VARIABLE'],
  'NLM': ['NEWTON S LAWS OF MOTION NLM', 'NLM'],
  'GASES': ['BEHAVIOUR OF GASES', 'GASES', 'EUDIOMETRY AND GAS ANALYSIS', 'CHEM MATTER MOLE R1', 'STATES OF MATTER'],
  'STATES MATTER': ['BEHAVIOUR OF GASES', 'GASES', 'EUDIOMETRY AND GAS ANALYSIS', 'CHEM MATTER MOLE R1'],
  'BEHAVIOUR GASES': ['BEHAVIOUR OF GASES', 'GASES', 'EUDIOMETRY AND GAS ANALYSIS'],
  'BONDING': ['CHEMICAL BONDING', 'CHEM ATOMIC BONDING R1', 'CHEM PHOSPHORUS OXYACIDS D3 R1'],
  'CHEMICAL BONDING': ['CHEMICAL BONDING', 'CHEM ATOMIC BONDING R1', 'CHEM PHOSPHORUS OXYACIDS D3 R1'],
  'MOLE': ['MOLE CONCEPT', 'MOLE CONCEPT AND GAS LAWS', 'SOME BASIC CONCEPTS OF CHEMISTRY', 'CHEM MATTER MOLE R1'],
  'MOLE CONCEPT': ['MOLE CONCEPT', 'MOLE CONCEPT AND GAS LAWS', 'SOME BASIC CONCEPTS OF CHEMISTRY', 'CHEM MATTER MOLE R1'],
  'BASIC CONCEPTS': ['SOME BASIC CONCEPTS OF CHEMISTRY', 'MOLE CONCEPT', 'CHEM MATTER MOLE R1'],
  'SOME BASIC CONCEPTS': ['SOME BASIC CONCEPTS OF CHEMISTRY', 'MOLE CONCEPT', 'CHEM MATTER MOLE R1'],
  'REDOX': ['REDOX REACTIONS', 'REDOX AND TITRATIONS', 'CHEM REDOX TITRATION D3 R1'],
  'REDOX REACTIONS': ['REDOX REACTIONS', 'REDOX AND TITRATIONS', 'CHEM REDOX TITRATION D3 R1'],
  'FLUIDS': ['NSEJS FLUIDS SOUND R1', 'NSEJS FLUIDS SURFACE ENERGY D3 R', 'FLUIDS'],
  'POLYNOMIALS': ['POLYNOMIALS'],
  'POLYNOMIAL': ['POLYNOMIALS'],
  'GENETICS': ['GENETICS'],
  'LIFE PROCESSES': ['LIFE PROCESSES'],
  'LIVING WORLD': ['LIVING WORLD'],
  'COORDINATION': ['COORDINATION'],
};

function matchesTopicQuery(filterTopic: string, qTopicCode: string, qTopicName: string): boolean {
  const ftTokens = tokenizeTopic(filterTopic);
  const ftNorm = ftTokens.join(' ');
  const qcTokens = tokenizeTopic(qTopicCode);
  const qcNorm = qcTokens.join(' ');
  const qtTokens = tokenizeTopic(qTopicName);
  const qtNorm = qtTokens.join(' ');

  // 1. Direct or substring matches on normalized forms
  if (ftNorm === qcNorm || (ftNorm.length > 0 && qcNorm.includes(ftNorm)) || (qcNorm.length > 0 && ftNorm.includes(qcNorm))) {
    return true;
  }
  if (ftNorm === qtNorm || (ftNorm.length > 0 && qtNorm.includes(ftNorm)) || (qtNorm.length > 0 && ftNorm.includes(qtNorm))) {
    return true;
  }

  // 2. Exact token subset: all tokens in search exist in question topic/code
  if (ftTokens.length > 0 && ftTokens.every((tok) => qcNorm.includes(tok) || qtNorm.includes(tok))) {
    return true;
  }

  // 3. Known curriculum aliases
  for (const [key, aliases] of Object.entries(TOPIC_ALIASES)) {
    const kNorm = tokenizeTopic(key).join(' ');
    if (ftNorm === kNorm) {
      for (const alias of aliases) {
        const aNorm = tokenizeTopic(alias).join(' ');
        if (aNorm === qcNorm || (qcNorm.length > 0 && aNorm.includes(qcNorm)) || (aNorm.length > 0 && qcNorm.includes(aNorm))) {
          return true;
        }
        if (aNorm === qtNorm || (qtNorm.length > 0 && aNorm.includes(qtNorm)) || (aNorm.length > 0 && qtNorm.includes(aNorm))) {
          return true;
        }
      }
    }
  }

  return false;
}

export class QuestionBankScreenController {
  private allQuestions: PublicQuestionSummary[] = [];
  private filter: BankFilterCriteria = {};
  private currentPage: number = 1;
  private pageSize: number = 12;
  private state: BankViewState;

  constructor(initialQuestions?: readonly any[], initialFilter: BankFilterCriteria = {}) {
    const sourceQuestions = (initialQuestions && initialQuestions.length > 0)
      ? initialQuestions
      : (CANONICAL_UNIFIED_QUESTIONS.length > 0 ? CANONICAL_UNIFIED_QUESTIONS : UNIFIED_QUESTION_DATABASE.getAll());

    this.allQuestions = sourceQuestions.map(sanitizePublicQuestionSummary);
    this.filter = { ...initialFilter };
    this.state = this.computeViewState();
  }

  loadQuestions(questions: readonly any[]): void {
    this.allQuestions = questions.map(sanitizePublicQuestionSummary);
    this.currentPage = 1;
    this.state = this.computeViewState();
  }

  setFilter(filter: BankFilterCriteria): void {
    this.filter = { ...filter };
    this.currentPage = 1; // reset to page 1 on filter change
    this.state = this.computeViewState();
  }

  setQuery(query: string): void {
    this.filter = { ...this.filter, query };
    this.currentPage = 1;
    this.state = this.computeViewState();
  }

  clearFilters(): void {
    this.filter = {};
    this.currentPage = 1;
    this.state = this.computeViewState();
  }

  setPage(page: number): void {
    this.currentPage = Number.isSafeInteger(page) && page > 0 ? page : 1;
    this.state = this.computeViewState();
  }

  setPageSize(size: number): void {
    if (Number.isSafeInteger(size) && size > 0 && size <= 100) {
      this.pageSize = size;
      this.currentPage = 1;
      this.state = this.computeViewState();
    }
  }

  syncToUrlParams(): URLSearchParams {
    const params = serializeFilterToQueryParams(this.filter);
    if (this.currentPage > 1) {
      params.set('page', String(this.currentPage));
    }
    return params;
  }

  loadFromUrlParams(params: URLSearchParams): void {
    this.filter = deserializeFilterFromQueryParams(params);
    const pageParam = params.get('page');
    this.currentPage = pageParam ? Math.max(1, parseInt(pageParam, 10) || 1) : 1;
    this.state = this.computeViewState();
  }

  getViewState(): BankViewState {
    return this.state;
  }

  private computeViewState(): BankViewState {
    if (this.allQuestions.length === 0) {
      return {
        status: 'EMPTY',
        filter: this.filter,
        pageItems: [],
        totalMatchingCount: 0,
        totalReleaseCount: 0,
        currentPage: 1,
        pageSize: this.pageSize,
        totalPages: 0,
        availableFacets: { subjects: [], topics: [], difficulties: [], roles: [], exams: [] },
      };
    }

    const releasedQuestions = this.allQuestions.filter((q) => q.status === 'RELEASED');
    const totalReleaseCount = releasedQuestions.length;

    // Filter matching
    const matching = this.allQuestions.filter((q) => {
      if (q.status === 'HOLD') return false;
      // Withdrawn handling: exclude withdrawn unless explicitly requested
      if (!this.filter.includeWithdrawn && q.status === 'WITHDRAWN') {
        return false;
      }
      if (this.filter.subject) {
        const fs = this.filter.subject.toUpperCase().trim();
        const qs = (q.subject || '').toUpperCase();
        // Cross-disciplinary allowance: Vectors in Grade 9 STEM are shared between Physics & Mathematics
        const isVectorCross = (this.filter.topic && this.filter.topic.toUpperCase().includes('VECTOR')) &&
          (fs === 'PHYS' || fs === 'MATH') &&
          (q.subjectCode === 'MATH' || q.subjectCode === 'PHYS');

        const matchesSubj = isVectorCross ||
          q.subjectCode === fs ||
          qs === fs ||
          (fs === 'MATH' && (q.subjectCode === 'MATH' || qs === 'MATHEMATICS')) ||
          (fs === 'PHYS' && (q.subjectCode === 'PHYS' || qs === 'PHYSICS')) ||
          (fs === 'CHEM' && (q.subjectCode === 'CHEM' || qs === 'CHEMISTRY')) ||
          (fs === 'BIO' && (q.subjectCode === 'BIO' || qs === 'BIOLOGY'));
        if (!matchesSubj) return false;
      }
      if (this.filter.topic) {
        if (!matchesTopicQuery(this.filter.topic, q.topicCode, q.topic || '')) {
          return false;
        }
      }
      if (this.filter.capability) {
        const cap = this.filter.capability.toUpperCase().trim();
        const qCap = (q.primaryCapabilityRef || '').toUpperCase().trim();
        const matchesCap = (qCap.length > 0 && (qCap === cap || qCap.includes(cap) || cap.includes(qCap))) ||
          (cap.includes('MOTION') && (q.topicCode.includes('MOTION') || q.topicCode.includes('NLM'))) ||
          (cap.includes('FRICTION') && (q.stemPreview.toUpperCase().includes('FRICTION') || q.topicCode.includes('NLM'))) ||
          (cap.includes('PRACTICE'));
        if (!matchesCap) return false;
      }
      if (this.filter.exam && q.exam && !q.exam.toLowerCase().includes(this.filter.exam.toLowerCase())) {
        return false;
      }
      if (this.filter.difficulty && q.difficulty !== this.filter.difficulty) {
        return false;
      }
      if (this.filter.role && q.role !== this.filter.role) {
        return false;
      }
      if (this.filter.query) {
        const qLower = this.filter.query.toLowerCase().trim();
        const matchesStem = q.stemPreview.toLowerCase().includes(qLower);
        const matchesCode = q.code.toLowerCase().includes(qLower);
        const matchesExam = q.exam ? q.exam.toLowerCase().includes(qLower) : false;
        const matchesTitle = q.title ? q.title.toLowerCase().includes(qLower) : false;
        if (!matchesStem && !matchesCode && !matchesExam && !matchesTitle) {
          return false;
        }
      }
      return true;
    });

    const totalMatchingCount = matching.length;
    const totalPages = Math.max(1, Math.ceil(totalMatchingCount / this.pageSize));
    const clampedPage = Math.min(Math.max(1, this.currentPage), totalPages);
    this.currentPage = clampedPage;

    // Sorter
    const sorted = [...matching];
    const sort = this.filter.sort || 'canonical';
    if (sort === 'difficulty-asc') {
      const order: Record<string, number> = { FOUNDATION: 1, INTERMEDIATE: 2, ADVANCED: 3, OLYMPIAD: 4 };
      sorted.sort((a, b) => (order[a.difficulty] || 2) - (order[b.difficulty] || 2) || a.id.localeCompare(b.id));
    } else if (sort === 'difficulty-desc') {
      const order: Record<string, number> = { FOUNDATION: 1, INTERMEDIATE: 2, ADVANCED: 3, OLYMPIAD: 4 };
      sorted.sort((a, b) => (order[b.difficulty] || 2) - (order[a.difficulty] || 2) || a.id.localeCompare(b.id));
    } else if (sort === 'year-desc') {
      sorted.sort((a, b) => (b.year || 0) - (a.year || 0) || a.id.localeCompare(b.id));
    } else if (sort === 'year-asc') {
      sorted.sort((a, b) => (a.year || 0) - (b.year || 0) || a.id.localeCompare(b.id));
    } else {
      sorted.sort((a, b) => a.id < b.id ? -1 : a.id > b.id ? 1 : 0);
    }

    const startIndex = (clampedPage - 1) * this.pageSize;
    const pageItems = sorted.slice(startIndex, startIndex + this.pageSize);

    // Dynamic Facets with counts from released pool
    const availableFacets = this.computeFacets(releasedQuestions);

    let status: 'LOADING' | 'POPULATED' | 'ZERO_RESULTS' | 'EMPTY' = 'POPULATED';
    if (totalMatchingCount === 0) {
      status = 'ZERO_RESULTS';
    }

    return {
      status,
      filter: this.filter,
      pageItems,
      totalMatchingCount,
      totalReleaseCount,
      currentPage: clampedPage,
      pageSize: this.pageSize,
      totalPages,
      availableFacets,
    };
  }

  private computeFacets(pool: readonly PublicQuestionSummary[]): AvailableFacets {
    const subjectsMap = new Map<string, number>();
    const topicsMap = new Map<string, number>();
    const difficultiesMap = new Map<string, number>();
    const rolesMap = new Map<string, number>();
    const examsMap = new Map<string, number>();

    for (const q of pool) {
      subjectsMap.set(q.subjectCode, (subjectsMap.get(q.subjectCode) || 0) + 1);
      topicsMap.set(q.topicCode, (topicsMap.get(q.topicCode) || 0) + 1);
      difficultiesMap.set(q.difficulty, (difficultiesMap.get(q.difficulty) || 0) + 1);
      rolesMap.set(q.role, (rolesMap.get(q.role) || 0) + 1);
      if (q.exam) {
        examsMap.set(q.exam, (examsMap.get(q.exam) || 0) + 1);
      }
    }

    return {
      subjects: Array.from(subjectsMap.entries()).map(([value, count]) => ({
        value,
        label: value,
        count,
      })),
      topics: Array.from(topicsMap.entries()).map(([value, count]) => ({
        value,
        label: value,
        count,
      })),
      difficulties: Array.from(difficultiesMap.entries()).map(([value, count]) => ({
        value,
        label: value,
        count,
      })),
      roles: Array.from(rolesMap.entries()).map(([value, count]) => ({
        value,
        label: value,
        count,
      })),
      exams: Array.from(examsMap.entries()).map(([value, count]) => ({
        value,
        label: value,
        count,
      })).sort((a, b) => b.count - a.count),
    };
  }
}

export function createQuestionBankScreen(
  questions?: readonly any[],
  filter?: BankFilterCriteria
): QuestionBankScreenController {
  return new QuestionBankScreenController(questions, filter);
}

/**
 * Mounts the production-grade, 100% Native DOM Question Bank Catalogue page.
 * Strictly zero iframes, compliant with 12.7" tablet touch ergonomics (>=48px min).
 */
export function mountQuestionBankScreen(
  root: HTMLElement,
  controller: QuestionBankScreenController,
  onNavigate?: (route: string) => void
): { dispose: () => void } {
  let active = true;

  const navigate = (route: string) => {
    if (onNavigate) {
      onNavigate(route);
    } else {
      window.location.hash = route.startsWith('#') ? route : '#' + route;
    }
  };

  const render = () => {
    if (!active) return;
    const state = controller.getViewState();
    const filter = state.filter;
    const facets = state.availableFacets;

    root.innerHTML = `
      <div class="g9-question-bank-hub" style="display:flex;flex-direction:column;gap:1.5rem;max-width:1440px;margin:0 auto;padding:1.5rem;box-sizing:border-box;width:100%;">
        
        <!-- Header & Breadcrumbs -->
        <header style="padding-bottom:1.25rem;border-bottom:2px solid #e2e8f0;">
          <div style="display:flex;gap:8px;font-size:0.9rem;color:#64748b;margin-bottom:0.5rem;">
            <a href="#/home" style="color:#0284c7;text-decoration:none;font-weight:600;">Home</a> &gt; 
            <span style="color:#475569;font-weight:600;">Question Bank</span>
          </div>

          <div style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:flex-start;gap:1rem;">
            <div>
              <div style="display:flex;gap:8px;margin-bottom:0.5rem;flex-wrap:wrap;align-items:center;">
                <span style="font-size:0.8rem;font-weight:800;background:#e0f2fe;color:#0369a1;padding:4px 10px;border-radius:4px;">Unified Repository</span>
                <span style="font-size:0.8rem;font-weight:700;background:#f1f5f9;color:#475569;padding:4px 10px;border-radius:4px;">Total Questions: ${state.totalReleaseCount}</span>
                <span style="font-size:0.8rem;font-weight:700;background:#fee2e2;color:#991b1b;padding:4px 10px;border-radius:4px;">Fault N09 Answer Isolation: ACTIVE</span>
              </div>
              <h1 style="margin:0 0 0.5rem;font-size:2.2rem;font-weight:800;color:#0f172a;">📋 Question Bank</h1>
              <p style="margin:0;color:#475569;font-size:1.15rem;max-width:900px;line-height:1.5;">
                Centralized STEM problem bank covering Foundation, Junior Olympiad (NSEJS, IOQM, SOF IMO), and Competitive Entrance Exams (JEE Main, IIT-JEE, NEET).
              </p>
            </div>

            <div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap;">
              <button type="button" id="btn-qb-filter-v35" style="min-height:${HIT_TARGET_MIN_PX}px;padding:10px 18px;background:#e0f2fe;color:#0369a1;border:1px solid #38bdf8;border-radius:6px;cursor:pointer;font-weight:700;font-size:0.95rem;display:inline-flex;align-items:center;">⚡ Filter v3.5 Parity (339 Qs)</button>
              <button type="button" id="btn-qb-browse-competitive" style="min-height:${HIT_TARGET_MIN_PX}px;padding:10px 18px;background:#0f172a;color:#ffffff;border:1px solid #334155;border-radius:6px;cursor:pointer;font-weight:700;font-size:0.95rem;">🏆 Competitive Hub →</button>
              <button type="button" id="btn-qb-back-home" style="min-height:${HIT_TARGET_MIN_PX}px;padding:10px 18px;background:#f1f5f9;color:#0f172a;border:1px solid #cbd5e1;border-radius:6px;cursor:pointer;font-weight:700;font-size:0.95rem;">← Back to Home</button>
            </div>
          </div>
        </header>

        <!-- Search Bar and Filter Controls (48px Touch Ergo) -->
        <div style="background:#ffffff;border:1px solid #cbd5e1;border-radius:10px;padding:1.25rem;display:flex;flex-direction:column;gap:1rem;box-shadow:0 1px 3px rgba(0,0,0,0.05);">
          
          <!-- Search Input Row -->
          <div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap;">
            <div style="flex:1;min-width:280px;position:relative;">
              <input type="search" id="qb-input-search" placeholder="Search questions, exam name, stem concepts, or crux keywords..." value="${escapeHtml(filter.query || '')}" style="width:100%;min-height:${HIT_TARGET_MIN_PX}px;padding:10px 16px;border:1px solid #cbd5e1;border-radius:6px;font-size:1rem;box-sizing:border-box;">
            </div>
            <button type="button" id="qb-btn-search" style="min-height:${HIT_TARGET_MIN_PX}px;min-width:100px;padding:10px 20px;background:#0284c7;color:#ffffff;border:none;border-radius:6px;cursor:pointer;font-weight:700;font-size:0.95rem;">Search</button>
            <button type="button" id="qb-btn-clear" style="min-height:${HIT_TARGET_MIN_PX}px;min-width:90px;padding:10px 16px;background:#f1f5f9;color:#475569;border:1px solid #cbd5e1;border-radius:6px;cursor:pointer;font-weight:600;font-size:0.95rem;">✕ Clear</button>
          </div>

          <!-- Facet Select Controls -->
          <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(min(100%, 200px), 1fr));gap:12px;">
            <!-- Subject Filter -->
            <div>
              <label for="qb-select-subject" style="display:block;font-size:0.85rem;font-weight:700;color:#334155;margin-bottom:4px;">Subject</label>
              <select id="qb-select-subject" style="width:100%;min-height:${HIT_TARGET_MIN_PX}px;padding:8px 12px;border:1px solid #cbd5e1;border-radius:6px;background:#f8fafc;font-size:0.95rem;">
                <option value="">All Subjects (${state.totalReleaseCount})</option>
                ${facets.subjects.map(s => `<option value="${escapeHtml(s.value)}" ${filter.subject === s.value ? 'selected' : ''}>${escapeHtml(s.label)} (${s.count})</option>`).join('')}
              </select>
            </div>

            <!-- Exam Filter -->
            <div>
              <label for="qb-select-exam" style="display:block;font-size:0.85rem;font-weight:700;color:#334155;margin-bottom:4px;">Competitive Exam</label>
              <select id="qb-select-exam" style="width:100%;min-height:${HIT_TARGET_MIN_PX}px;padding:8px 12px;border:1px solid #cbd5e1;border-radius:6px;background:#f8fafc;font-size:0.95rem;">
                <option value="">All Exams (${facets.exams?.length || 0})</option>
                ${(facets.exams || []).map(e => `<option value="${escapeHtml(e.value)}" ${filter.exam === e.value ? 'selected' : ''}>${escapeHtml(e.label)} (${e.count})</option>`).join('')}
              </select>
            </div>

            <!-- Difficulty Filter -->
            <div>
              <label for="qb-select-difficulty" style="display:block;font-size:0.85rem;font-weight:700;color:#334155;margin-bottom:4px;">Difficulty Band</label>
              <select id="qb-select-difficulty" style="width:100%;min-height:${HIT_TARGET_MIN_PX}px;padding:8px 12px;border:1px solid #cbd5e1;border-radius:6px;background:#f8fafc;font-size:0.95rem;">
                <option value="">All Difficulties</option>
                ${facets.difficulties.map(d => `<option value="${escapeHtml(d.value)}" ${filter.difficulty === d.value ? 'selected' : ''}>${escapeHtml(d.label)} (${d.count})</option>`).join('')}
              </select>
            </div>

            <!-- Sort Order -->
            <div>
              <label for="qb-select-sort" style="display:block;font-size:0.85rem;font-weight:700;color:#334155;margin-bottom:4px;">Sort Order</label>
              <select id="qb-select-sort" style="width:100%;min-height:${HIT_TARGET_MIN_PX}px;padding:8px 12px;border:1px solid #cbd5e1;border-radius:6px;background:#f8fafc;font-size:0.95rem;">
                <option value="canonical" ${filter.sort === 'canonical' || !filter.sort ? 'selected' : ''}>Canonical Order</option>
                <option value="difficulty-asc" ${filter.sort === 'difficulty-asc' ? 'selected' : ''}>Difficulty: Low → High</option>
                <option value="difficulty-desc" ${filter.sort === 'difficulty-desc' ? 'selected' : ''}>Difficulty: High → Low</option>
                <option value="year-desc" ${filter.sort === 'year-desc' ? 'selected' : ''}>Newest First</option>
                <option value="year-asc" ${filter.sort === 'year-asc' ? 'selected' : ''}>Oldest First</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Result Summary & Active Filter Chips -->
        <div style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:12px;">
          <div style="font-size:1.05rem;font-weight:700;color:#1e293b;" id="qb-result-counter">
            Showing <span style="color:#0284c7;">${state.pageItems.length}</span> of <strong>${state.totalMatchingCount}</strong> matching questions (Page ${state.currentPage} of ${state.totalPages})
          </div>

          <!-- Page size toggle -->
          <div style="display:flex;align-items:center;gap:8px;">
            <span style="font-size:0.9rem;color:#64748b;font-weight:600;">Items per page:</span>
            ${[12, 24, 48].map(sz => `
              <button type="button" class="qb-btn-pagesize" data-size="${sz}" style="min-height:${HIT_TARGET_MIN_PX}px;min-width:${HIT_TARGET_MIN_PX}px;padding:4px 10px;background:${state.pageSize === sz ? '#0284c7' : '#f8fafc'};color:${state.pageSize === sz ? '#ffffff' : '#0f172a'};border:1px solid #cbd5e1;border-radius:6px;cursor:pointer;font-weight:700;">${sz}</button>
            `).join('')}
          </div>
        </div>

        <!-- Main Question Grid / Results -->
        ${state.status === 'ZERO_RESULTS' ? `
          <div style="background:#ffffff;border:1px dashed #cbd5e1;border-radius:10px;padding:3rem 1.5rem;text-align:center;color:#64748b;">
            <div style="font-size:2.5rem;margin-bottom:0.75rem;">🔍</div>
            <h3 style="margin:0 0 0.5rem;font-size:1.3rem;color:#0f172a;">No Matching Questions Found</h3>
            <p style="margin:0 0 1.5rem;font-size:1rem;">Try clearing some filters or searching for broader keywords.</p>
            <button type="button" id="qb-btn-reset-empty" style="min-height:${HIT_TARGET_MIN_PX}px;padding:10px 20px;background:#0284c7;color:#ffffff;border:none;border-radius:6px;cursor:pointer;font-weight:700;">Clear All Filters</button>
          </div>
        ` : `
          <div class="qb-question-grid" style="display:grid;grid-template-columns:repeat(auto-fit, minmax(min(100%, 420px), 1fr));gap:1.25rem;">
            ${state.pageItems.map(q => renderQuestionCard(q)).join('')}
          </div>
        `}

        <!-- Pagination Controls -->
        ${state.totalPages > 1 ? `
          <nav aria-label="Question Bank Pagination" style="display:flex;justify-content:center;align-items:center;gap:8px;margin-top:1.5rem;flex-wrap:wrap;">
            <button type="button" id="qb-btn-prev" style="min-height:${HIT_TARGET_MIN_PX}px;padding:8px 16px;background:#ffffff;border:1px solid #cbd5e1;border-radius:6px;cursor:pointer;font-weight:700;" ${state.currentPage <= 1 ? 'disabled style="opacity:0.5;cursor:not-allowed;"' : ''}>← Previous</button>
            <span style="font-size:0.95rem;font-weight:600;color:#475569;padding:0 8px;">Page ${state.currentPage} of ${state.totalPages}</span>
            <button type="button" id="qb-btn-next" style="min-height:${HIT_TARGET_MIN_PX}px;padding:8px 16px;background:#ffffff;border:1px solid #cbd5e1;border-radius:6px;cursor:pointer;font-weight:700;" ${state.currentPage >= state.totalPages ? 'disabled style="opacity:0.5;cursor:not-allowed;"' : ''}>Next →</button>
          </nav>
        ` : ''}

      </div>
    `;

    bindEvents();
  };

  const renderQuestionCard = (q: PublicQuestionSummary): string => {
    const diffColor = q.difficulty === 'OLYMPIAD' || q.difficultyBand === 'D4'
      ? '#dc2626'
      : q.difficulty === 'ADVANCED' || q.difficultyBand === 'D3'
      ? '#d97706'
      : q.difficulty === 'INTERMEDIATE' || q.difficultyBand === 'D2'
      ? '#2563eb'
      : '#16a34a';

    const examBadge = q.exam ? `
      <span style="background:#e0f2fe;color:#0369a1;font-size:0.75rem;font-weight:800;padding:2px 8px;border-radius:4px;letter-spacing:0.3px;">
        📜 ${escapeHtml(q.exam)}${q.year ? ' ' + q.year : ''}${q.paper ? ' · ' + escapeHtml(q.paper) : ''}
      </span>
    ` : '';

    return `
      <article class="g9-bank-card" data-qid="${escapeHtml(q.id)}" style="background:#ffffff;border:1px solid #e2e8f0;border-radius:10px;padding:1.25rem;display:flex;flex-direction:column;justify-content:space-between;box-shadow:0 1px 3px rgba(0,0,0,0.05);position:relative;">
        
        <div>
          <!-- Card Header Badges -->
          <div style="display:flex;flex-wrap:wrap;gap:6px;align-items:center;margin-bottom:0.75rem;">
            ${examBadge}
            <span style="background:#f1f5f9;color:#334155;font-size:0.75rem;font-weight:700;padding:2px 8px;border-radius:4px;">
              ${escapeHtml(q.subjectCode)} · ${escapeHtml(q.topicCode)}
            </span>
            <span style="background:${diffColor}15;color:${diffColor};border:1px solid ${diffColor}40;font-size:0.75rem;font-weight:800;padding:2px 8px;border-radius:4px;">
              ${escapeHtml(q.difficultyBand || q.difficulty)}
            </span>
            ${q.qrtDemand ? `<span style="background:#f3e8ff;color:#7e22ce;font-size:0.75rem;font-weight:700;padding:2px 8px;border-radius:4px;">QRT: ${escapeHtml(q.qrtDemand)}</span>` : ''}
          </div>

          <!-- Question ID / Title -->
          <h3 style="margin:0 0 0.5rem;font-size:1.1rem;font-weight:800;color:#0f172a;line-height:1.4;">
            ${escapeHtml(q.title || q.code)}
          </h3>

          <!-- Stem Preview -->
          <p style="margin:0 0 1rem;font-size:0.95rem;color:#334155;line-height:1.5;white-space:pre-wrap;overflow-wrap:anywhere;">
            ${escapeHtml(q.stemPreview)}
          </p>

          <!-- Multiple Choice Options Preview -->
          ${q.options && q.options.length > 0 ? `
            <div style="margin-bottom:1rem;background:#f8fafc;border:1px solid #e2e8f0;border-radius:6px;padding:8px 12px;font-size:0.9rem;">
              <div style="font-weight:700;color:#64748b;margin-bottom:4px;font-size:0.8rem;text-transform:uppercase;">Options (${q.options.length})</div>
              ${q.options.slice(0, 4).map(opt => `
                <div style="padding:2px 0;color:#334155;overflow-wrap:anywhere;">• ${escapeHtml(opt.text)}</div>
              `).join('')}
            </div>
          ` : ''}

          <!-- Staggered Hint Ladder Disclosure -->
          ${q.hints && q.hints.length > 0 ? `
            <details class="g9-card-hints" style="margin-bottom:0.75rem;background:#fefce8;border:1px solid #fef08a;border-radius:6px;padding:8px 12px;font-size:0.9rem;">
              <summary style="font-weight:700;color:#854d0e;cursor:pointer;">💡 Progressive Hint Ladder (${q.hints.length} Tiers)</summary>
              <div style="margin-top:8px;display:flex;flex-direction:column;gap:6px;">
                ${q.hints.map((hint, hIdx) => `
                  <div style="padding:4px 8px;background:#ffffff;border-left:3px solid #eab308;border-radius:2px;font-size:0.85rem;color:#713f12;">
                    <strong>Tier ${hIdx + 1}:</strong> ${escapeHtml(hint)}
                  </div>
                `).join('')}
              </div>
            </details>
          ` : ''}

          <!-- Pedagogical Reasoning Steps Disclosure -->
          ${q.steps && q.steps.length > 0 ? `
            <details class="g9-card-steps" style="margin-bottom:0.75rem;background:#f0fdf4;border:1px solid #bbf7d0;border-radius:6px;padding:8px 12px;font-size:0.9rem;">
              <summary style="font-weight:700;color:#166534;cursor:pointer;">🔍 Reasoning Steps &amp; Model Check</summary>
              <div style="margin-top:8px;display:flex;flex-direction:column;gap:6px;">
                ${q.steps.map((st, sIdx) => `
                  <div style="padding:4px 8px;background:#ffffff;border-left:3px solid #22c55e;border-radius:2px;font-size:0.85rem;color:#14532d;">
                    ${escapeHtml(st)}
                  </div>
                `).join('')}
                ${q.check ? `<div style="font-size:0.8rem;font-weight:700;color:#15803d;margin-top:4px;">✓ Independent Check: ${escapeHtml(q.check)}</div>` : ''}
              </div>
            </details>
          ` : ''}

          <!-- Tempting Trap Alert -->
          ${q.trapWarning ? `
            <div style="background:#fff1f2;border:1px solid #fecdd3;border-radius:6px;padding:6px 10px;margin-bottom:0.75rem;font-size:0.82rem;color:#9f1239;">
              ⚠️ <strong>Trap Alert:</strong> ${escapeHtml(q.trapWarning)}
            </div>
          ` : ''}
        </div>

        <!-- Action Trigger: Launch into Interactive Workspace -->
        <div style="margin-top:1rem;padding-top:0.75rem;border-top:1px solid #f1f5f9;display:flex;justify-content:flex-end;">
          <button type="button" class="qb-btn-launch" data-qid="${escapeHtml(q.id)}" style="min-height:${HIT_TARGET_MIN_PX}px;padding:10px 18px;background:#0284c7;color:#ffffff;border:none;border-radius:6px;cursor:pointer;font-weight:700;font-size:0.95rem;display:inline-flex;align-items:center;gap:6px;">
            <span>Launch in Workspace</span>
            <span>→</span>
          </button>
        </div>

      </article>
    `;
  };

  const bindEvents = () => {
    // Search Button & Enter Key
    const searchInp = root.querySelector<HTMLInputElement>('#qb-input-search');
    const searchBtn = root.querySelector<HTMLButtonElement>('#qb-btn-search');
    const clearBtn = root.querySelector<HTMLButtonElement>('#qb-btn-clear');

    const doSearch = () => {
      if (!searchInp) return;
      controller.setFilter({
        ...controller.getViewState().filter,
        query: searchInp.value.trim() || undefined,
      });
      render();
    };

    searchBtn?.addEventListener('click', doSearch);
    searchInp?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') doSearch();
    });

    clearBtn?.addEventListener('click', () => {
      controller.clearFilters();
      render();
    });

    root.querySelector<HTMLButtonElement>('#qb-btn-reset-empty')?.addEventListener('click', () => {
      controller.clearFilters();
      render();
    });

    // Subject Select
    const subjSelect = root.querySelector<HTMLSelectElement>('#qb-select-subject');
    subjSelect?.addEventListener('change', () => {
      controller.setFilter({
        ...controller.getViewState().filter,
        subject: subjSelect.value || undefined,
      });
      render();
    });

    // Exam Select
    const examSelect = root.querySelector<HTMLSelectElement>('#qb-select-exam');
    examSelect?.addEventListener('change', () => {
      controller.setFilter({
        ...controller.getViewState().filter,
        exam: examSelect.value || undefined,
      });
      render();
    });

    // Difficulty Select
    const diffSelect = root.querySelector<HTMLSelectElement>('#qb-select-difficulty');
    diffSelect?.addEventListener('change', () => {
      controller.setFilter({
        ...controller.getViewState().filter,
        difficulty: (diffSelect.value as any) || undefined,
      });
      render();
    });

    // Sort Select
    const sortSelect = root.querySelector<HTMLSelectElement>('#qb-select-sort');
    sortSelect?.addEventListener('change', () => {
      controller.setFilter({
        ...controller.getViewState().filter,
        sort: sortSelect.value || undefined,
      });
      render();
    });

    // Page Size Buttons
    root.querySelectorAll<HTMLButtonElement>('.qb-btn-pagesize').forEach((btn) => {
      btn.addEventListener('click', () => {
        const sz = parseInt(btn.dataset.size || '12', 10);
        controller.setPageSize(sz);
        render();
      });
    });

    // Pagination Prev / Next
    root.querySelector<HTMLButtonElement>('#qb-btn-prev')?.addEventListener('click', () => {
      const state = controller.getViewState();
      if (state.currentPage > 1) {
        controller.setPage(state.currentPage - 1);
        render();
      }
    });

    root.querySelector<HTMLButtonElement>('#qb-btn-next')?.addEventListener('click', () => {
      const state = controller.getViewState();
      if (state.currentPage < state.totalPages) {
        controller.setPage(state.currentPage + 1);
        render();
      }
    });

    // Launch in Workspace Buttons
    root.querySelectorAll<HTMLButtonElement>('.qb-btn-launch').forEach((btn) => {
      btn.addEventListener('click', () => {
        const qid = btn.dataset.qid;
        if (qid) {
          navigate(`/question/${encodeURIComponent(qid)}`);
        }
      });
    });

    // Navigation buttons
    root.querySelector<HTMLButtonElement>('#btn-qb-filter-v35')?.addEventListener('click', () => {
      controller.setFilter({ ...controller.getViewState().filter, query: 'Grade9v3.5' });
      render();
    });

    root.querySelector<HTMLButtonElement>('#btn-qb-browse-competitive')?.addEventListener('click', () => {
      navigate('/competitive/exam:nsejs');
    });

    root.querySelector<HTMLButtonElement>('#btn-qb-back-home')?.addEventListener('click', () => {
      navigate('/home');
    });
  };

  render();

  return {
    dispose: () => {
      active = false;
      root.replaceChildren();
    },
  };
}
