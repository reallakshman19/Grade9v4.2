/**
 * web/pages/bank.ts
 * A23 — Question bank catalogue screen controller.
 *
 * Implements:
 * - URL-persisted filter synchronization
 * - Release-only item count calculation
 * - Strict facet intersections
 * - Stable deterministic pagination
 * - ZERO_RESULTS, POPULATED, and EMPTY screen states
 * - Safe clear/back/refresh handling
 * - Zero private metadata leakage
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

export class QuestionBankScreenController {
  private allQuestions: PublicQuestionSummary[] = [];
  private filter: BankFilterCriteria = {};
  private currentPage: number = 1;
  private pageSize: number = 10;
  private state: BankViewState;

  constructor(initialQuestions: readonly any[] = [], initialFilter: BankFilterCriteria = {}) {
    this.allQuestions = initialQuestions.map(sanitizePublicQuestionSummary);
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

  clearFilters(): void {
    this.filter = {};
    this.currentPage = 1;
    this.state = this.computeViewState();
  }

  setPage(page: number): void {
    this.currentPage = page;
    this.state = this.computeViewState();
  }

  setPageSize(size: number): void {
    if (size > 0) {
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
        availableFacets: { subjects: [], topics: [], difficulties: [], roles: [] },
      };
    }

    const releasedQuestions = this.allQuestions.filter((q) => q.status === 'RELEASED');
    const totalReleaseCount = releasedQuestions.length;

    // Filter matching
    const matching = this.allQuestions.filter((q) => {
      // Withdrawn handling: exclude withdrawn unless explicitly requested
      if (!this.filter.includeWithdrawn && q.status === 'WITHDRAWN') {
        return false;
      }
      if (this.filter.subject && q.subjectCode !== this.filter.subject) {
        return false;
      }
      if (this.filter.topic && q.topicCode !== this.filter.topic) {
        return false;
      }
      if (this.filter.difficulty && q.difficulty !== this.filter.difficulty) {
        return false;
      }
      if (this.filter.role && q.role !== this.filter.role) {
        return false;
      }
      if (this.filter.query) {
        const qLower = this.filter.query.toLowerCase();
        const matchesStem = q.stemPreview.toLowerCase().includes(qLower);
        const matchesCode = q.code.toLowerCase().includes(qLower);
        if (!matchesStem && !matchesCode) {
          return false;
        }
      }
      return true;
    });

    const totalMatchingCount = matching.length;
    const totalPages = Math.max(1, Math.ceil(totalMatchingCount / this.pageSize));
    const clampedPage = Math.min(Math.max(1, this.currentPage), totalPages);
    this.currentPage = clampedPage;

    const startIndex = (clampedPage - 1) * this.pageSize;
    const pageItems = matching.slice(startIndex, startIndex + this.pageSize);

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

    for (const q of pool) {
      subjectsMap.set(q.subjectCode, (subjectsMap.get(q.subjectCode) || 0) + 1);
      topicsMap.set(q.topicCode, (topicsMap.get(q.topicCode) || 0) + 1);
      difficultiesMap.set(q.difficulty, (difficultiesMap.get(q.difficulty) || 0) + 1);
      rolesMap.set(q.role, (rolesMap.get(q.role) || 0) + 1);
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
    };
  }
}

export function createQuestionBankScreen(
  questions?: readonly any[],
  filter?: BankFilterCriteria
): QuestionBankScreenController {
  return new QuestionBankScreenController(questions, filter);
}
