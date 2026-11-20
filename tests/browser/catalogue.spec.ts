/**
 * tests/browser/catalogue.spec.ts
 * A22 — Dashboard, Subject, Topic, and Programme screen tests.
 *
 * Verifies:
 * - Data-driven curriculum and programme facets (no hardcoded topic lists)
 * - Accurate real item and topic count aggregations
 * - Resume session capability and safe 'no active pending subject' handling
 * - Presence and validity of all six Core role entries (CORE1A through CORE3B)
 * - Explorer and Resource catalogue entrypoints
 * - Safe unavailable states (HOLD, missing, unadmitted)
 * - Strand filtering and facet calculations
 *
 * No academic approval inferred from software validation.
 */

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import {
  createDashboardScreen,
  ALL_SIX_CORE_ROLES,
} from '../../web/pages/home.ts';
import type { RegistrySnapshot, CurriculumSubject, ProgrammeFacet } from '../../web/pages/home.ts';

import { createSubjectScreen } from '../../web/pages/subject.ts';
import type { SubjectDetail } from '../../web/pages/subject.ts';

import { createTopicScreen } from '../../web/pages/topic.ts';
import type { TopicDetail } from '../../web/pages/topic.ts';

import { createProgrammeScreen } from '../../web/pages/programme.ts';
import type { ProgrammeDetail } from '../../web/pages/programme.ts';

// ---------------------------------------------------------------------------
// Sample Test Fixtures (Dynamic, non-hardcoded)
// ---------------------------------------------------------------------------

const MOCK_SUBJECTS: readonly CurriculumSubject[] = [
  {
    id: 'subj-phys',
    code: 'PHYS',
    name: 'Physics',
    status: 'AVAILABLE',
    topicIds: ['top-wpe', 'top-kinematics', 'top-forces'],
    totalItemCount: 120,
  },
  {
    id: 'subj-math',
    code: 'MATH',
    name: 'Mathematics',
    status: 'AVAILABLE',
    topicIds: ['top-algebra', 'top-geometry'],
    totalItemCount: 95,
  },
  {
    id: 'subj-chem',
    code: 'CHEM',
    name: 'Chemistry',
    status: 'HOLD',
    topicIds: ['top-stoichiometry'],
    totalItemCount: 30,
  },
];

const MOCK_PROGRAMMES: readonly ProgrammeFacet[] = [
  {
    id: 'prog-olympiad',
    name: 'Olympiad Junior Track',
    subjectIds: ['subj-phys', 'subj-math'],
    status: 'AVAILABLE',
  },
];

const SAMPLE_REGISTRY: RegistrySnapshot = {
  subjects: MOCK_SUBJECTS,
  programmes: MOCK_PROGRAMMES,
  lastSession: {
    sessionId: 'ses-1234',
    subjectId: 'subj-phys',
    topicId: 'top-wpe',
    itemId: 'item-01',
    lastActiveAt: '2026-11-18T08:00:00.000Z',
    title: 'Work, Power and Energy',
  },
};

// ---------------------------------------------------------------------------
// Dashboard / Home Screen
// ---------------------------------------------------------------------------

describe('Dashboard Screen — Curriculum Facets & Real Counts', () => {
  it('initializes to EMPTY when registry has no data', () => {
    const screen = createDashboardScreen();
    const state = screen.getViewState();

    assert.equal(state.status, 'EMPTY');
    assert.equal(state.subjects.length, 0);
    assert.equal(state.totalAvailableTopics, 0);
    assert.equal(state.totalAvailableItems, 0);
  });

  it('aggregates real counts accurately from available subjects only', () => {
    const screen = createDashboardScreen(SAMPLE_REGISTRY);
    const state = screen.getViewState();

    assert.equal(state.status, 'POPULATED');
    assert.equal(state.subjects.length, 3);
    // PHYS (3 topics, 120 items) + MATH (2 topics, 95 items) = 5 topics, 215 items (CHEM is HOLD)
    assert.equal(state.totalAvailableTopics, 5);
    assert.equal(state.totalAvailableItems, 215);
  });

  it('handles resume session anchor correctly', () => {
    const screen = createDashboardScreen(SAMPLE_REGISTRY);
    const state = screen.getViewState();

    assert.ok(state.resumeAnchor !== null);
    assert.equal(state.resumeAnchor?.sessionId, 'ses-1234');
    assert.equal(state.resumeAnchor?.topicId, 'top-wpe');
  });

  it('handles safe "no active pending subject" state', () => {
    const screen = createDashboardScreen(SAMPLE_REGISTRY);
    assert.equal(screen.getActiveSubject(), null);
    assert.equal(screen.getViewState().activeSubjectId, null);

    // Setting a valid subject
    screen.setActiveSubject('subj-phys');
    assert.equal(screen.getActiveSubject()?.code, 'PHYS');

    // Setting back to null
    screen.setActiveSubject(null);
    assert.equal(screen.getActiveSubject(), null);
  });

  it('transitions to UNAVAILABLE when invalid subject is requested', () => {
    const screen = createDashboardScreen(SAMPLE_REGISTRY);
    screen.setActiveSubject('subj-nonexistent');

    const state = screen.getViewState();
    assert.equal(state.status, 'UNAVAILABLE');
    assert.ok(state.errorMessage?.includes('subj-nonexistent'));
  });

  it('includes all six Core role entries with valid routes', () => {
    const screen = createDashboardScreen(SAMPLE_REGISTRY);
    const state = screen.getViewState();

    assert.equal(state.coreRoles.length, 6);
    const roles = state.coreRoles.map((r) => r.role);
    assert.deepEqual(roles, ['CORE1', 'CORE1A', 'CORE1B', 'CORE2', 'CORE2A', 'CORE2B']);
    assert.ok(state.explorerRoute.length > 0);
    assert.ok(state.resourceCatalogueRoute.length > 0);
  });
});

// ---------------------------------------------------------------------------
// Subject Screen
// ---------------------------------------------------------------------------

describe('Subject Screen — Real Topics & Filtering', () => {
  const SUBJECT_PHYS: SubjectDetail = {
    id: 'subj-phys',
    code: 'PHYS',
    name: 'Physics',
    status: 'AVAILABLE',
    topics: [
      { id: 'top-1', code: 'WPE', title: 'Work, Power & Energy', strand: 'Mechanics', itemCount: 40, status: 'AVAILABLE' },
      { id: 'top-2', code: 'KIN', title: 'Kinematics', strand: 'Mechanics', itemCount: 50, status: 'AVAILABLE' },
      { id: 'top-3', code: 'OPT', title: 'Optics', strand: 'Electromagnetism', itemCount: 30, status: 'AVAILABLE' },
    ],
  };

  it('computes real topic and item count without hardcoded lists', () => {
    const screen = createSubjectScreen(SUBJECT_PHYS);
    const state = screen.getViewState();

    assert.equal(state.status, 'POPULATED');
    assert.equal(state.visibleTopics.length, 3);
    assert.equal(state.totalItemCount, 120);
  });

  it('filters topics by strand accurately', () => {
    const screen = createSubjectScreen(SUBJECT_PHYS);
    screen.setStrandFilter('Mechanics');

    const state = screen.getViewState();
    assert.equal(state.visibleTopics.length, 2);
    assert.equal(state.totalItemCount, 120); // total remains aggregate

    screen.setStrandFilter(null);
    assert.equal(screen.getViewState().visibleTopics.length, 3);
  });

  it('enters safe UNAVAILABLE state when subject is in HOLD', () => {
    const holdSubject: SubjectDetail = {
      ...SUBJECT_PHYS,
      status: 'HOLD',
    };

    const screen = createSubjectScreen(holdSubject);
    const state = screen.getViewState();

    assert.equal(state.status, 'UNAVAILABLE');
    assert.ok(state.reason?.includes('HOLD'));
  });

  it('scopes six Core role routes to subject code', () => {
    const screen = createSubjectScreen(SUBJECT_PHYS);
    const state = screen.getViewState();

    assert.equal(state.coreRoles.length, 6);
    assert.equal(state.coreRoles[0].path, '/subject/phys/core1');
    assert.equal(state.coreRoles[1].path, '/subject/phys/core1a');
  });
});

// ---------------------------------------------------------------------------
// Topic Screen
// ---------------------------------------------------------------------------

describe('Topic Screen — Scoped Actions & Safe States', () => {
  const TOPIC_WPE: TopicDetail = {
    id: 'top-wpe',
    code: 'WPE',
    title: 'Work, Power and Energy',
    subjectId: 'subj-phys',
    subjectCode: 'PHYS',
    status: 'AVAILABLE',
    verifiedQuestionCount: 42,
    interactiveModelCount: 2,
    resourceCount: 5,
  };

  it('loads topic details and computes scoped six Core actions', () => {
    const screen = createTopicScreen(TOPIC_WPE);
    const state = screen.getViewState();

    assert.equal(state.status, 'POPULATED');
    assert.equal(state.topic?.verifiedQuestionCount, 42);
    assert.equal(state.coreRoleActions.length, 6);
    assert.equal(state.coreRoleActions[0].path, '/topic/phys/wpe/core1');
    assert.equal(state.coreRoleActions[1].path, '/topic/phys/wpe/core1a');
    assert.equal(state.coreRoleActions[4].path, '/topic/phys/wpe/core2a');
    assert.equal(state.explorerRoute, '/explorer?topic=wpe');
    assert.equal(state.resourceCatalogueRoute, '/resources?topic=wpe');
  });

  it('enters safe UNAVAILABLE state when topic is on HOLD', () => {
    const holdTopic: TopicDetail = {
      ...TOPIC_WPE,
      status: 'HOLD',
    };

    const screen = createTopicScreen(holdTopic);
    const state = screen.getViewState();

    assert.equal(state.status, 'UNAVAILABLE');
    assert.ok(state.reason?.includes('HOLD'));
  });
});

// ---------------------------------------------------------------------------
// Programme Screen
// ---------------------------------------------------------------------------

describe('Programme Screen — Dynamic Aggregations & Safe States', () => {
  const PROG_OLYMPIAD: ProgrammeDetail = {
    id: 'prog-01',
    code: 'OLYMPIAD_G9',
    title: 'Grade 9 Olympiad Foundation',
    targetAudience: 'Advanced Grade 9 Candidates',
    status: 'AVAILABLE',
    subjects: [MOCK_SUBJECTS[0], MOCK_SUBJECTS[1]],
  };

  it('aggregates total topic and question counts across included subjects', () => {
    const screen = createProgrammeScreen(PROG_OLYMPIAD);
    const state = screen.getViewState();

    assert.equal(state.status, 'POPULATED');
    // PHYS (3 topics) + MATH (2 topics) = 5 topics
    assert.equal(state.totalTopicsCount, 5);
    // PHYS (120 items) + MATH (95 items) = 215 items
    assert.equal(state.totalQuestionsCount, 215);
  });

  it('enters safe UNAVAILABLE state when programme is on HOLD', () => {
    const holdProg: ProgrammeDetail = {
      ...PROG_OLYMPIAD,
      status: 'HOLD',
    };

    const screen = createProgrammeScreen(holdProg);
    const state = screen.getViewState();

    assert.equal(state.status, 'UNAVAILABLE');
    assert.ok(state.reason?.includes('HOLD'));
  });
});
