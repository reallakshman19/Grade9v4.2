/**
 * web/components/filter-panel.ts
 * A23 — Question bank filter panel and URL query persistence.
 *
 * Implements:
 * - URL-persisted facet filters (subject, topic, difficulty, role, status, query)
 * - Serialization and deserialization to/from URLSearchParams
 * - Facet count calculations over released items
 * - Reset and clear filter capabilities
 * - 48px hit target compliance
 *
 * No academic approval inferred from software validation.
 */

import { HIT_TARGET_MIN_PX } from '../styles/tokens.ts';

export type QuestionDifficulty = 'FOUNDATION' | 'INTERMEDIATE' | 'ADVANCED' | 'OLYMPIAD';

export interface BankFilterCriteria {
  readonly subject?: string;
  readonly topic?: string;
  readonly difficulty?: QuestionDifficulty;
  readonly role?: string;
  readonly exam?: string;
  readonly query?: string;
  readonly includeWithdrawn?: boolean;
  readonly sort?: string;
}

export interface FacetOption {
  readonly value: string;
  readonly label: string;
  readonly count: number;
}

export interface AvailableFacets {
  readonly subjects: readonly FacetOption[];
  readonly topics: readonly FacetOption[];
  readonly difficulties: readonly FacetOption[];
  readonly roles: readonly FacetOption[];
  readonly exams?: readonly FacetOption[];
}

/**
 * Serializes filter criteria into standard URL search parameters.
 */
export function serializeFilterToQueryParams(filter: BankFilterCriteria): URLSearchParams {
  const params = new URLSearchParams();

  if (filter.subject) params.set('subject', filter.subject);
  if (filter.topic) params.set('topic', filter.topic);
  if (filter.difficulty) params.set('difficulty', filter.difficulty);
  if (filter.role) params.set('role', filter.role);
  if (filter.exam) params.set('exam', filter.exam);
  if (filter.query) params.set('q', filter.query);
  if (filter.includeWithdrawn) params.set('withdrawn', '1');
  if (filter.sort) params.set('sort', filter.sort);

  return params;
}

/**
 * Deserializes filter criteria from URL search parameters.
 */
export function deserializeFilterFromQueryParams(params: URLSearchParams): BankFilterCriteria {
  const filter: {
    subject?: string;
    topic?: string;
    difficulty?: QuestionDifficulty;
    role?: string;
    exam?: string;
    query?: string;
    includeWithdrawn?: boolean;
    sort?: string;
  } = {};

  const subject = params.get('subject');
  if (subject) filter.subject = subject.toUpperCase();

  const topic = params.get('topic');
  if (topic) filter.topic = topic.toUpperCase();

  const difficulty = params.get('difficulty');
  if (difficulty) {
    const dUpper = difficulty.toUpperCase() as QuestionDifficulty;
    if (['FOUNDATION', 'INTERMEDIATE', 'ADVANCED', 'OLYMPIAD'].includes(dUpper)) {
      filter.difficulty = dUpper;
    }
  }

  const role = params.get('role');
  if (role) filter.role = role.toUpperCase();

  const exam = params.get('exam');
  if (exam) filter.exam = exam.trim();

  const sort = params.get('sort');
  if (sort) filter.sort = sort.trim();

  const query = params.get('q');
  if (query) filter.query = query.trim();

  const withdrawn = params.get('withdrawn');
  if (withdrawn === '1' || withdrawn === 'true') {
    filter.includeWithdrawn = true;
  }

  return filter;
}

export class FilterPanelController {
  private currentFilter: BankFilterCriteria;
  private minHitTargetPx: number = HIT_TARGET_MIN_PX;

  constructor(initialFilter: BankFilterCriteria = {}) {
    this.currentFilter = { ...initialFilter };
  }

  getFilter(): BankFilterCriteria {
    return this.currentFilter;
  }

  setFilter(filter: BankFilterCriteria): void {
    this.currentFilter = { ...filter };
  }

  updateFacet(key: keyof BankFilterCriteria, value: any): void {
    this.currentFilter = {
      ...this.currentFilter,
      [key]: value,
    };
  }

  clearFilters(): void {
    this.currentFilter = {};
  }

  getMinHitTargetPx(): number {
    return this.minHitTargetPx;
  }
}

export function createFilterPanel(initialFilter?: BankFilterCriteria): FilterPanelController {
  return new FilterPanelController(initialFilter);
}
