/**
 * web/pages/home.ts
 * A22 — Home and Dashboard screen controller.
 *
 * Implements:
 * - Data-driven curriculum and programme facets
 * - Real item/topic counts from registry (no fake data or hardcoded topics)
 * - Resume capability with last-active session state
 * - Safe handling of 'no active pending subject'
 * - Six Core role navigation entries (CORE1A, CORE1B, CORE2A, CORE2B, CORE3A, CORE3B)
 * - Explorer and Resource catalogue entrypoints
 * - Safe unavailable states
 *
 * No academic approval inferred from software validation.
 */

export interface CurriculumSubject {
  readonly id: string;
  readonly code: string;
  readonly name: string;
  readonly status: 'AVAILABLE' | 'HOLD' | 'SPEC_PENDING';
  readonly topicIds: readonly string[];
  readonly totalItemCount: number;
}

export interface ProgrammeFacet {
  readonly id: string;
  readonly name: string;
  readonly subjectIds: readonly string[];
  readonly status: 'AVAILABLE' | 'HOLD';
}

export interface ResumeSessionAnchor {
  readonly sessionId: string;
  readonly subjectId: string;
  readonly topicId: string;
  readonly itemId?: string;
  readonly lastActiveAt: string;
  readonly title: string;
}

export type CoreRoleCode =
  | 'CORE1A'
  | 'CORE1B'
  | 'CORE2A'
  | 'CORE2B'
  | 'CORE3A'
  | 'CORE3B';

export interface CoreRoleEntry {
  readonly role: CoreRoleCode;
  readonly label: string;
  readonly path: string;
  readonly available: boolean;
}

export const ALL_SIX_CORE_ROLES: readonly CoreRoleEntry[] = [
  { role: 'CORE1A', label: 'Core 1A — Teaching & Concept Anchor', path: '/learning/core1a', available: true },
  { role: 'CORE1B', label: 'Core 1B — Fresh Transfer Journey', path: '/learning/core1b', available: true },
  { role: 'CORE2A', label: 'Core 2A — Supported Application', path: '/learning/core2a', available: true },
  { role: 'CORE2B', label: 'Core 2B — Changed-Demand Transfer', path: '/learning/core2b', available: true },
  { role: 'CORE3A', label: 'Core 3A — Reconstruction & Diagnosis', path: '/learning/core3a', available: true },
  { role: 'CORE3B', label: 'Core 3B — Independent Exam Paper', path: '/learning/core3b', available: true },
];

export interface DashboardViewState {
  readonly status: 'LOADING' | 'POPULATED' | 'EMPTY' | 'UNAVAILABLE' | 'ERROR';
  readonly subjects: readonly CurriculumSubject[];
  readonly programmes: readonly ProgrammeFacet[];
  readonly resumeAnchor: ResumeSessionAnchor | null;
  readonly activeSubjectId: string | null;
  readonly coreRoles: readonly CoreRoleEntry[];
  readonly explorerRoute: string;
  readonly resourceCatalogueRoute: string;
  readonly totalAvailableTopics: number;
  readonly totalAvailableItems: number;
  readonly errorMessage?: string;
}

export interface RegistrySnapshot {
  readonly subjects: readonly CurriculumSubject[];
  readonly programmes: readonly ProgrammeFacet[];
  readonly lastSession?: ResumeSessionAnchor;
}

export class DashboardScreenController {
  private registry: RegistrySnapshot;
  private activeSubjectId: string | null = null;
  private state: DashboardViewState;

  constructor(initialRegistry?: RegistrySnapshot) {
    this.registry = initialRegistry || { subjects: [], programmes: [] };
    this.state = this.computeViewState();
  }

  loadRegistry(snapshot: RegistrySnapshot): void {
    this.registry = snapshot;
    this.state = this.computeViewState();
  }

  setActiveSubject(subjectId: string | null): void {
    if (subjectId !== null) {
      const found = this.registry.subjects.find((s) => s.id === subjectId);
      if (!found) {
        this.activeSubjectId = null;
        this.state = {
          ...this.computeViewState(),
          status: 'UNAVAILABLE',
          errorMessage: `Subject '${subjectId}' is unavailable or not registered.`,
        };
        return;
      }
    }
    this.activeSubjectId = subjectId;
    this.state = this.computeViewState();
  }

  getActiveSubject(): CurriculumSubject | null {
    if (!this.activeSubjectId) return null;
    return this.registry.subjects.find((s) => s.id === this.activeSubjectId) || null;
  }

  getViewState(): DashboardViewState {
    return this.state;
  }

  private computeViewState(): DashboardViewState {
    const subjects = this.registry.subjects || [];
    const programmes = this.registry.programmes || [];
    const resumeAnchor = this.registry.lastSession || null;

    if (subjects.length === 0 && programmes.length === 0) {
      return {
        status: 'EMPTY',
        subjects: [],
        programmes: [],
        resumeAnchor: null,
        activeSubjectId: null,
        coreRoles: ALL_SIX_CORE_ROLES,
        explorerRoute: '/explorer',
        resourceCatalogueRoute: '/resources',
        totalAvailableTopics: 0,
        totalAvailableItems: 0,
      };
    }

    const availableSubjects = subjects.filter((s) => s.status === 'AVAILABLE');
    const totalAvailableTopics = availableSubjects.reduce((sum, s) => sum + s.topicIds.length, 0);
    const totalAvailableItems = availableSubjects.reduce((sum, s) => sum + s.totalItemCount, 0);

    return {
      status: 'POPULATED',
      subjects,
      programmes,
      resumeAnchor,
      activeSubjectId: this.activeSubjectId,
      coreRoles: ALL_SIX_CORE_ROLES,
      explorerRoute: '/explorer',
      resourceCatalogueRoute: '/resources',
      totalAvailableTopics,
      totalAvailableItems,
    };
  }
}

export function createDashboardScreen(registry?: RegistrySnapshot): DashboardScreenController {
  return new DashboardScreenController(registry);
}

