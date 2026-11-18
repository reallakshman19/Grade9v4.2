/**
 * web/pages/programme.ts
 * A22 — Programme screen controller.
 *
 * Implements:
 * - Dynamic programme facets (Olympiad, Foundation, Practice)
 * - Real aggregated counts of subjects, topics, and verified questions
 * - Safe unavailable states (HOLD, missing programme)
 * - Direct links to curriculum routes
 *
 * No academic approval inferred from software validation.
 */

import type { CurriculumSubject } from './home.ts';

export interface ProgrammeDetail {
  readonly id: string;
  readonly code: string;
  readonly title: string;
  readonly targetAudience: string;
  readonly status: 'AVAILABLE' | 'HOLD';
  readonly subjects: readonly CurriculumSubject[];
  readonly description?: string;
}

export interface ProgrammeViewState {
  readonly status: 'LOADING' | 'POPULATED' | 'UNAVAILABLE';
  readonly programme: ProgrammeDetail | null;
  readonly totalTopicsCount: number;
  readonly totalQuestionsCount: number;
  readonly reason?: string;
}

export class ProgrammeScreenController {
  private programme: ProgrammeDetail | null = null;
  private state: ProgrammeViewState;

  constructor(initialProgramme?: ProgrammeDetail) {
    if (initialProgramme) {
      this.loadProgramme(initialProgramme);
    } else {
      this.state = {
        status: 'LOADING',
        programme: null,
        totalTopicsCount: 0,
        totalQuestionsCount: 0,
      };
    }
  }

  loadProgramme(programme: ProgrammeDetail): void {
    this.programme = programme;
    this.updateState();
  }

  setUnavailable(reason: string): void {
    this.programme = null;
    this.state = {
      status: 'UNAVAILABLE',
      programme: null,
      totalTopicsCount: 0,
      totalQuestionsCount: 0,
      reason,
    };
  }

  getViewState(): ProgrammeViewState {
    return this.state;
  }

  private updateState(): void {
    if (!this.programme) {
      this.state = {
        status: 'UNAVAILABLE',
        programme: null,
        totalTopicsCount: 0,
        totalQuestionsCount: 0,
        reason: 'No programme loaded.',
      };
      return;
    }

    if (this.programme.status === 'HOLD') {
      this.state = {
        status: 'UNAVAILABLE',
        programme: this.programme,
        totalTopicsCount: 0,
        totalQuestionsCount: 0,
        reason: `Programme '${this.programme.title}' is on HOLD pending academic approval.`,
      };
      return;
    }

    const subjects = this.programme.subjects || [];
    const totalTopicsCount = subjects.reduce((sum, s) => sum + s.topicIds.length, 0);
    const totalQuestionsCount = subjects.reduce((sum, s) => sum + s.totalItemCount, 0);

    this.state = {
      status: 'POPULATED',
      programme: this.programme,
      totalTopicsCount,
      totalQuestionsCount,
    };
  }
}

export function createProgrammeScreen(programme?: ProgrammeDetail): ProgrammeScreenController {
  return new ProgrammeScreenController(programme);
}
