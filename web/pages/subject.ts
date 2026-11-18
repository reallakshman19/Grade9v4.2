/**
 * web/pages/subject.ts
 * A22 — Subject screen controller.
 *
 * Implements:
 * - Dynamic subject curriculum facets with real topic and item counts
 * - Safe unavailable states (missing subject, HOLD subject)
 * - Six Core role entrypoints scoped to the subject
 * - Explorer and Resource catalogue links
 * - No hardcoded topics
 *
 * No academic approval inferred from software validation.
 */

import { ALL_SIX_CORE_ROLES } from './home.ts';
import type { CoreRoleEntry } from './home.ts';

export interface SubjectTopicDescriptor {
  readonly id: string;
  readonly code: string;
  readonly title: string;
  readonly strand?: string;
  readonly itemCount: number;
  readonly status: 'AVAILABLE' | 'HOLD';
}

export interface SubjectDetail {
  readonly id: string;
  readonly code: string;
  readonly name: string;
  readonly description?: string;
  readonly status: 'AVAILABLE' | 'HOLD' | 'SPEC_PENDING';
  readonly topics: readonly SubjectTopicDescriptor[];
}

export interface SubjectViewState {
  readonly status: 'LOADING' | 'POPULATED' | 'UNAVAILABLE' | 'EMPTY';
  readonly subject: SubjectDetail | null;
  readonly visibleTopics: readonly SubjectTopicDescriptor[];
  readonly totalItemCount: number;
  readonly coreRoles: readonly CoreRoleEntry[];
  readonly activeStrandFilter: string | null;
  readonly explorerRoute: string;
  readonly resourceCatalogueRoute: string;
  readonly reason?: string;
}

export class SubjectScreenController {
  private subject: SubjectDetail | null = null;
  private activeStrandFilter: string | null = null;
  private state: SubjectViewState;

  constructor(initialSubject?: SubjectDetail) {
    if (initialSubject) {
      this.loadSubject(initialSubject);
    } else {
      this.state = {
        status: 'LOADING',
        subject: null,
        visibleTopics: [],
        totalItemCount: 0,
        coreRoles: ALL_SIX_CORE_ROLES,
        activeStrandFilter: null,
        explorerRoute: '/explorer',
        resourceCatalogueRoute: '/resources',
      };
    }
  }

  loadSubject(subject: SubjectDetail): void {
    this.subject = subject;
    this.activeStrandFilter = null;
    this.updateState();
  }

  setUnavailable(reason: string): void {
    this.subject = null;
    this.state = {
      status: 'UNAVAILABLE',
      subject: null,
      visibleTopics: [],
      totalItemCount: 0,
      coreRoles: ALL_SIX_CORE_ROLES,
      activeStrandFilter: null,
      explorerRoute: '/explorer',
      resourceCatalogueRoute: '/resources',
      reason,
    };
  }

  setStrandFilter(strand: string | null): void {
    this.activeStrandFilter = strand;
    this.updateState();
  }

  getViewState(): SubjectViewState {
    return this.state;
  }

  private updateState(): void {
    if (!this.subject) {
      this.state = {
        status: 'UNAVAILABLE',
        subject: null,
        visibleTopics: [],
        totalItemCount: 0,
        coreRoles: ALL_SIX_CORE_ROLES,
        activeStrandFilter: null,
        explorerRoute: '/explorer',
        resourceCatalogueRoute: '/resources',
        reason: 'No subject loaded.',
      };
      return;
    }

    if (this.subject.status === 'HOLD') {
      this.state = {
        status: 'UNAVAILABLE',
        subject: this.subject,
        visibleTopics: [],
        totalItemCount: 0,
        coreRoles: ALL_SIX_CORE_ROLES,
        activeStrandFilter: null,
        explorerRoute: '/explorer',
        resourceCatalogueRoute: '/resources',
        reason: `Subject '${this.subject.name}' is on HOLD pending academic qualification.`,
      };
      return;
    }

    const allTopics = this.subject.topics || [];
    const visibleTopics = this.activeStrandFilter
      ? allTopics.filter((t) => t.strand === this.activeStrandFilter)
      : allTopics;

    const totalItemCount = allTopics.reduce((sum, t) => sum + t.itemCount, 0);

    this.state = {
      status: allTopics.length === 0 ? 'EMPTY' : 'POPULATED',
      subject: this.subject,
      visibleTopics,
      totalItemCount,
      coreRoles: ALL_SIX_CORE_ROLES.map((r) => ({
        ...r,
        path: `/subject/${this.subject?.code.toLowerCase()}/${r.role.toLowerCase()}`,
      })),
      activeStrandFilter: this.activeStrandFilter,
      explorerRoute: `/explorer?subject=${this.subject.code.toLowerCase()}`,
      resourceCatalogueRoute: `/resources?subject=${this.subject.code.toLowerCase()}`,
    };
  }
}

export function createSubjectScreen(subject?: SubjectDetail): SubjectScreenController {
  return new SubjectScreenController(subject);
}
